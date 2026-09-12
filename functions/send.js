import { connect } from "cloudflare:sockets";

function toBase64Utf8(str) {
  const bytes = new TextEncoder().encode(str);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function chunkBase64(b64Str, chunkSize = 76) {
  const chunks = [];
  for (let i = 0; i < b64Str.length; i += chunkSize) {
    chunks.push(b64Str.slice(i, i + chunkSize));
  }
  return chunks.join("\r\n");
}

/**
 * تنسيق الرقم للصيغة الدولية المناسبة لواتساب wa.me
 */
function formatWhatsAppNumber(phone) {
  if (!phone) return "";
  // إزالة أي مسافات، شرطات، أقواس، أو رموز غير رقمية
  let cleaned = phone.replace(/[^0-9]/g, "");

  // إزالة الأصفار الدولية المزدوجة في البداية مثل 0020 أو 00966
  if (cleaned.startsWith("00")) {
    cleaned = cleaned.substring(2);
  }

  // إذا كان رقماً مصرياً محلياً يبدأ بـ 01 (11 رقماً: 010, 011, 012, 015)
  if (cleaned.startsWith("01") && cleaned.length === 11) {
    return "2" + cleaned; // ينتج: 201xxxxxxxxx
  }

  // إذا كان رقماً سعودياً محلياً يبدأ بـ 05 (10 أرقام)
  if (cleaned.startsWith("05") && cleaned.length === 10) {
    return "966" + cleaned.substring(1); // ينتج: 9665xxxxxxxx
  }

  // إذا كان يبدأ بصفر مفرد عام، إزالة الصفر الافتتاحي
  if (cleaned.startsWith("0") && cleaned.length > 9) {
    cleaned = cleaned.substring(1);
  }

  return cleaned;
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400",
    },
  });
}

export async function onRequestPost(context) {
  const corsHeaders = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };

  let socket = null;
  let reader = null;
  let writer = null;

  try {
    const request = context.request;
    let data;
    try {
      data = await request.json();
    } catch (e) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid JSON payload" }),
        { status: 400, headers: corsHeaders }
      );
    }

    const {
      fullName,
      name,
      phone,
      email,
      projectAddress,
      projectLocation,
      message,
      source = "Website Contact Form",
    } = data;

    const clientName = (fullName || name || "").trim();
    const clientPhone = (phone || "").trim();
    const clientEmail = (email || "").trim();
    const clientAddress = (projectAddress || "").trim();
    const clientLocation = (projectLocation || "").trim();
    const clientMessage = (message || "").trim();

    if (!clientName || !clientPhone) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "الاسم ورقم التواصل مطلوبان (Name and phone number are required)",
        }),
        { status: 400, headers: corsHeaders }
      );
    }

    const env = context.env || {};
    let rawHost = (env.SMTP_HOST || "").trim();
    rawHost = rawHost.replace(/^(ssl:\/\/|tls:\/\/|smtp:\/\/|smtps:\/\/|https?:\/\/)/i, "");
    if (rawHost.includes(":")) {
      rawHost = rawHost.split(":")[0];
    }
    const smtpHost = rawHost;
    const smtpPort = parseInt(String(env.SMTP_PORT || "465").trim(), 10);
    const smtpUser = (env.SMTP_USER || "").trim();
    const smtpPass = (env.SMTP_PASS || "").trim();
    const destEmail = (env.DESTINATION_EMAIL || smtpUser).trim();

    if (!smtpHost || !smtpUser || !smtpPass) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Server configuration error: SMTP credentials are not configured.",
        }),
        { status: 500, headers: corsHeaders }
      );
    }

    socket = connect(
      { hostname: smtpHost, port: smtpPort },
      { secureTransport: "on" }
    );

    reader = socket.readable.getReader();
    writer = socket.writable.getWriter();
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    let buffer = "";

    async function readLine() {
      while (true) {
        const lineEnd = buffer.indexOf("\n");
        if (lineEnd !== -1) {
          const line = buffer.substring(0, lineEnd).replace(/\r$/, "");
          buffer = buffer.substring(lineEnd + 1);
          return line;
        }

        const { value, done } = await reader.read();
        if (done) {
          if (buffer.length > 0) {
            const line = buffer.replace(/\r$/, "");
            buffer = "";
            return line;
          }
          throw new Error("Connection closed unexpectedly by SMTP server");
        }
        buffer += decoder.decode(value, { stream: true });
      }
    }

    async function readResponse() {
      let fullResponse = [];
      while (true) {
        const line = await readLine();
        fullResponse.push(line);
        if (/^\d{3}\s/.test(line) || /^\d{3}$/.test(line)) {
          const code = parseInt(line.substring(0, 3), 10);
          return { code, text: fullResponse.join("\n") };
        }
      }
    }

    async function sendCommand(cmd) {
      if (cmd !== null) {
        await writer.write(encoder.encode(cmd + "\r\n"));
      }
      return await readResponse();
    }

    // 1. استقبال رسالة الترحيب من السيرفر
    const greeting = await readResponse();
    if (greeting.code !== 220) {
      throw new Error(`SMTP Greeting failed (${greeting.code}): ${greeting.text}`);
    }

    // 2. أمر التحية EHLO
    const ehlo = await sendCommand(`EHLO ${smtpHost}`);
    if (ehlo.code !== 250) {
      throw new Error(`EHLO failed (${ehlo.code}): ${ehlo.text}`);
    }

    // 3. تسجيل الدخول AUTH LOGIN
    const auth = await sendCommand("AUTH LOGIN");
    if (auth.code !== 334) {
      throw new Error(`AUTH failed (${auth.code}): ${auth.text}`);
    }

    const userRes = await sendCommand(toBase64Utf8(smtpUser));
    if (userRes.code !== 334) {
      throw new Error(`Username rejected (${userRes.code}): ${userRes.text}`);
    }

    const passRes = await sendCommand(toBase64Utf8(smtpPass));
    if (passRes.code !== 235) {
      throw new Error(`Authentication failed (${passRes.code}): ${passRes.text}`);
    }

    // 4. تحديد الراسل والمستلم
    const mailFrom = await sendCommand(`MAIL FROM:<${smtpUser}>`);
    if (mailFrom.code !== 250) {
      throw new Error(`MAIL FROM failed (${mailFrom.code}): ${mailFrom.text}`);
    }

    const rcptTo = await sendCommand(`RCPT TO:<${destEmail}>`);
    if (rcptTo.code !== 250) {
      throw new Error(`RCPT TO failed (${rcptTo.code}): ${rcptTo.text}`);
    }

    // 5. محتوى الرسالة DATA
    const dataCmd = await sendCommand("DATA");
    if (dataCmd.code !== 354) {
      throw new Error(`DATA initiation failed (${dataCmd.code}): ${dataCmd.text}`);
    }

    const nowRiyadh = new Date().toLocaleString("ar-SA", {
      timeZone: "Asia/Riyadh",
      dateStyle: "full",
      timeStyle: "medium",
    });

    const emailSubjectRaw = `طلب استفسار جديد من الموقع: ${clientName}`;
    const encodedSubject = `=?UTF-8?B?${toBase64Utf8(emailSubjectRaw)}?=`;
    const encodedSenderName = `=?UTF-8?B?${toBase64Utf8("موقع مصنع نور للألمنيوم")}?=`;

    // معالجة الرقم ليناسب رابط واتساب الدولي بدقة
    const waNumber = formatWhatsAppNumber(clientPhone);

    const htmlBody = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>إشعار استفسار جديد</title>
</head>
<body style="margin:0;padding:24px 12px;background-color:#f1f5f9;font-family:'Segoe UI',Tahoma,Arial,sans-serif;direction:rtl;text-align:right;">
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;margin:0 auto;background-color:#ffffff;border-radius:12px;border:1px solid #e2e8f0;overflow:hidden;box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);">
    <tr>
      <td style="background:#0f172a;padding:28px 24px;text-align:center;">
        <h2 style="margin:0 0 6px 0;color:#f8fafc;font-size:20px;font-weight:700;">طلب تواصل واستفسار جديد</h2>
        <span style="color:#94a3b8;font-size:13px;">موقع مصنع نور للألمنيوم</span>
      </td>
    </tr>
    <tr>
      <td style="padding:28px 24px;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;margin-bottom:24px;">
          <tr>
            <td style="padding:10px 14px;background-color:#f8fafc;color:#64748b;font-weight:bold;font-size:14px;border-bottom:1px solid #edf2f7;width:32%;border-radius:6px 0 0 6px;">الاسم الكريم</td>
            <td style="padding:10px 14px;color:#1e293b;font-size:14px;font-weight:600;border-bottom:1px solid #edf2f7;">${clientName}</td>
          </tr>
          <tr>
            <td style="padding:10px 14px;background-color:#f8fafc;color:#64748b;font-weight:bold;font-size:14px;border-bottom:1px solid #edf2f7;border-radius:6px 0 0 6px;">رقم الهاتف</td>
            <td style="padding:10px 14px;color:#1e293b;font-size:14px;border-bottom:1px solid #edf2f7;direction:ltr;text-align:right;">
              <a href="tel:${clientPhone}" style="color:#0284c7;text-decoration:none;font-weight:600;">${clientPhone}</a>
            </td>
          </tr>
          ${clientEmail ? `
          <tr>
            <td style="padding:10px 14px;background-color:#f8fafc;color:#64748b;font-weight:bold;font-size:14px;border-bottom:1px solid #edf2f7;border-radius:6px 0 0 6px;">البريد الإلكتروني</td>
            <td style="padding:10px 14px;color:#1e293b;font-size:14px;border-bottom:1px solid #edf2f7;direction:ltr;text-align:right;">
              <a href="mailto:${clientEmail}" style="color:#0284c7;text-decoration:none;">${clientEmail}</a>
            </td>
          </tr>` : ""}
          ${clientAddress ? `
          <tr>
            <td style="padding:10px 14px;background-color:#f8fafc;color:#64748b;font-weight:bold;font-size:14px;border-bottom:1px solid #edf2f7;border-radius:6px 0 0 6px;">عنوان المشروع</td>
            <td style="padding:10px 14px;color:#1e293b;font-size:14px;border-bottom:1px solid #edf2f7;">${clientAddress}</td>
          </tr>` : ""}
          ${clientLocation ? `
          <tr>
            <td style="padding:10px 14px;background-color:#f8fafc;color:#64748b;font-weight:bold;font-size:14px;border-bottom:1px solid #edf2f7;border-radius:6px 0 0 6px;">موقع المشروع</td>
            <td style="padding:10px 14px;color:#1e293b;font-size:14px;border-bottom:1px solid #edf2f7;">
              <a href="${clientLocation}" target="_blank" rel="noopener noreferrer" style="color:#0284c7;text-decoration:none;font-weight:600;">عرض على خرائط Google &larr;</a>
            </td>
          </tr>` : ""}
        </table>

        <div style="font-size:13px;font-weight:bold;color:#475569;margin-bottom:8px;">تفاصيل الطلب:</div>
        <div style="background-color:#f8fafc;border-right:4px solid #0284c7;padding:16px;border-radius:6px;color:#334155;font-size:14px;line-height:1.7;white-space:pre-wrap;margin-bottom:28px;">${clientMessage || "لم يتم تقديم تفاصيل إضافية."}</div>

        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td align="center">
              <a href="tel:${clientPhone}" style="display:inline-block;padding:11px 22px;margin:4px 6px;background-color:#0284c7;color:#ffffff;text-decoration:none;border-radius:8px;font-size:14px;font-weight:bold;">اتصال مباشر</a>
              ${waNumber ? `<a href="https://wa.me/${waNumber}" target="_blank" rel="noopener noreferrer" style="display:inline-block;padding:11px 22px;margin:4px 6px;background-color:#16a34a;color:#ffffff;text-decoration:none;border-radius:8px;font-size:14px;font-weight:bold;">مراسلة واتساب</a>` : ""}
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="background-color:#f8fafc;padding:16px 24px;border-top:1px solid #e2e8f0;text-align:center;font-size:12px;color:#94a3b8;line-height:1.6;">
        مصدر الطلب: ${source}<br>
        وقت الإرسال: ${nowRiyadh}
      </td>
    </tr>
  </table>
</body>
</html>`;

    const bodyBase64 = chunkBase64(toBase64Utf8(htmlBody));
    const replyToHeader = clientEmail ? `Reply-To: <${clientEmail}>\r\n` : "";

    const fullEmail = [
      `From: ${encodedSenderName} <${smtpUser}>`,
      `To: <${destEmail}>`,
      replyToHeader ? replyToHeader.trim() : null,
      `Subject: ${encodedSubject}`,
      "MIME-Version: 1.0",
      "Content-Type: text/html; charset=UTF-8",
      "Content-Transfer-Encoding: base64",
      `Date: ${new Date().toUTCString()}`,
      "",
      bodyBase64,
      ".",
    ]
      .filter((line) => line !== null)
      .join("\r\n");

    const finishData = await sendCommand(fullEmail);
    if (finishData.code !== 250) {
      throw new Error(`Email delivery failed (${finishData.code}): ${finishData.text}`);
    }

    try {
      await sendCommand("QUIT");
    } catch (_) { }

    return new Response(
      JSON.stringify({
        success: true,
        message: "تم إرسال رسالتك بنجاح.",
      }),
      { status: 200, headers: corsHeaders }
    );
  } catch (err) {
    console.error("SMTP Error:", err);
    return new Response(
      JSON.stringify({
        success: false,
        error: err.message || "An unexpected error occurred",
      }),
      { status: 500, headers: corsHeaders }
    );
  } finally {
    if (reader) {
      try { reader.releaseLock(); } catch (_) { }
    }
    if (writer) {
      try { writer.releaseLock(); } catch (_) { }
    }
    if (socket) {
      try { await socket.close(); } catch (_) { }
    }
  }
}
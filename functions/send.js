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

function sanitizeHeader(val) {
  if (!val) return "";
  return String(val).replace(/[\r\n]/g, " ").trim();
}

function sanitizeText(val, maxLen = 2000) {
  if (!val) return "";
  return String(val).slice(0, maxLen).trim();
}

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatWhatsAppNumber(phone) {
  if (!phone) return "";
  let cleaned = phone.replace(/[^0-9]/g, "");
  if (cleaned.startsWith("00")) {
    cleaned = cleaned.substring(2);
  }
  if (cleaned.startsWith("05") && cleaned.length === 10) {
    return "966" + cleaned.substring(1);
  }
  if (cleaned.startsWith("0") && cleaned.length > 9) {
    cleaned = cleaned.substring(1);
  }
  return cleaned;
}

function getCorsHeaders(request) {
  const origin = request.headers.get("Origin") || "";
  const allowedOrigins = [
    "https://mishal-lawfirm.com",
    "https://www.mishal-lawfirm.com"
  ];

  const isAllowed =
    allowedOrigins.includes(origin) ||
    origin.includes("localhost") ||
    origin.includes("127.0.0.1") ||
    origin.endsWith(".pages.dev");

  return {
    "Content-Type": "application/json; charset=UTF-8",
    "Access-Control-Allow-Origin": isAllowed && origin ? origin : "https://mishal-lawfirm.com",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  };
}

export async function onRequestOptions(context) {
  const corsHeaders = getCorsHeaders(context.request);
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function onRequestPost(context) {
  const request = context.request;
  const corsHeaders = getCorsHeaders(request);

  // Maximum payload size limitation (< 20 KB)
  const contentLength = parseInt(request.headers.get("content-length") || "0", 10);
  if (contentLength > 20480) {
    return new Response(
      JSON.stringify({ success: false, message: "حجم الطلب كبير جداً" }),
      { status: 413, headers: corsHeaders }
    );
  }

  let data;
  try {
    data = await request.json();
  } catch (e) {
    return new Response(
      JSON.stringify({ success: false, message: "صيغة البيانات غير صحيحة" }),
      { status: 400, headers: corsHeaders }
    );
  }

  // Handle both standard contact form and custom service requests
  const rawName = data.name || data.fullName || data.client_name || "";
  const rawPhone = data.phone || data.mobile || data.tel || "";
  const rawEmail = data.email || "";
  const rawMessage = data.message || data.description || data.notes || "";
  const rawServiceName = data.service_name || data.service || "";
  const rawExpectedCost = data.expected_cost || "";

  const name = sanitizeHeader(sanitizeText(rawName, 100));
  const phone = sanitizeHeader(sanitizeText(rawPhone, 30));
  const email = sanitizeHeader(sanitizeText(rawEmail, 100));
  const message = sanitizeText(rawMessage, 3000);
  const serviceName = sanitizeHeader(sanitizeText(rawServiceName, 150));
  const expectedCost = sanitizeHeader(sanitizeText(rawExpectedCost, 100));

  // Validation
  const isCustomService = Boolean(serviceName && expectedCost);

  if (isCustomService) {
    if (serviceName.length < 2 || descriptionCheck(message) < 5) {
      return new Response(
        JSON.stringify({ success: false, message: "يرجى تعبئة كافة حقول تفاصيل الخدمة والتكلفة المتوقعة." }),
        { status: 422, headers: corsHeaders }
      );
    }
  } else {
    if (name.length < 2) {
      return new Response(
        JSON.stringify({ success: false, message: "الاسم مطلوب ويجب أن يكون حرفين على الأقل." }),
        { status: 422, headers: corsHeaders }
      );
    }
    if (phone.length < 7) {
      return new Response(
        JSON.stringify({ success: false, message: "رقم الجوال مطلوب ويجب أن يكون صالحاً." }),
        { status: 422, headers: corsHeaders }
      );
    }
    if (message.length < 5) {
      return new Response(
        JSON.stringify({ success: false, message: "تفاصيل الرسالة مطلوبة (5 أحرف على الأقل)." }),
        { status: 422, headers: corsHeaders }
      );
    }
  }

  function descriptionCheck(txt) {
    return txt ? txt.trim().length : 0;
  }

  // Retrieve Cloudflare Environment Variables
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
  const destEmail = (env.DESTINATION_EMAIL || "info@mishal-lawfirm.com").trim();

  if (!smtpHost || !smtpUser || !smtpPass) {
    console.error("Missing SMTP Environment Variables on Cloudflare Pages");
    return new Response(
      JSON.stringify({
        success: false,
        message: "تعذر إرسال الرسالة حالياً، يرجى التواصل معنا مباشرة عبر الواتساب.",
      }),
      { status: 500, headers: corsHeaders }
    );
  }

  let socket = null;
  let reader = null;
  let writer = null;

  try {
    socket = connect(
      { hostname: smtpHost, port: smtpPort },
      { secureTransport: smtpPort === 465 ? "on" : "starttls" }
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

    // 1. Receive Greeting
    const greeting = await readResponse();
    if (greeting.code !== 220) {
      throw new Error(`SMTP Greeting failed (${greeting.code})`);
    }

    // 2. EHLO
    const ehlo = await sendCommand(`EHLO ${smtpHost}`);
    if (ehlo.code !== 250) {
      throw new Error(`EHLO failed (${ehlo.code})`);
    }

    // 3. AUTH LOGIN
    const auth = await sendCommand("AUTH LOGIN");
    if (auth.code !== 334) {
      throw new Error(`AUTH failed (${auth.code})`);
    }

    const userRes = await sendCommand(toBase64Utf8(smtpUser));
    if (userRes.code !== 334) {
      throw new Error(`Username rejected (${userRes.code})`);
    }

    const passRes = await sendCommand(toBase64Utf8(smtpPass));
    if (passRes.code !== 235) {
      throw new Error(`Authentication failed (${passRes.code})`);
    }

    // 4. MAIL FROM & RCPT TO
    const mailFrom = await sendCommand(`MAIL FROM:<${smtpUser}>`);
    if (mailFrom.code !== 250) {
      throw new Error(`MAIL FROM failed (${mailFrom.code})`);
    }

    const rcptTo = await sendCommand(`RCPT TO:<${destEmail}>`);
    if (rcptTo.code !== 250) {
      throw new Error(`RCPT TO failed (${rcptTo.code})`);
    }

    // 5. DATA
    const dataCmd = await sendCommand("DATA");
    if (dataCmd.code !== 354) {
      throw new Error(`DATA initiation failed (${dataCmd.code})`);
    }

    const nowRiyadh = new Date().toLocaleString("ar-SA", {
      timeZone: "Asia/Riyadh",
      dateStyle: "full",
      timeStyle: "medium",
    });

    const subjectRaw = isCustomService
      ? `⭐ طلب خدمة مخصصة: ${serviceName} | شركة مشعل بادغيش`
      : `📩 طلب استشارة / تواصل جديد من ${name} | شركة مشعل بادغيش`;

    const encodedSubject = `=?UTF-8?B?${toBase64Utf8(subjectRaw)}?=`;
    const encodedSenderName = `=?UTF-8?B?${toBase64Utf8("شركة مشعل بادغيش للمحاماة")}=?=`;

    const waNumber = formatWhatsAppNumber(phone);

    const safeName = escapeHtml(name);
    const safePhone = escapeHtml(phone);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message);
    const safeServiceName = escapeHtml(serviceName);
    const safeExpectedCost = escapeHtml(expectedCost);

    const htmlBody = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>${isCustomService ? "طلب خدمة مخصصة" : "طلب استشارة جديد"}</title>
</head>
<body style="margin:0;padding:24px 12px;background-color:#0F172A;font-family:'Segoe UI',Tahoma,Arial,sans-serif;direction:rtl;text-align:right;">
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:620px;margin:0 auto;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 10px 25px rgba(0,0,0,0.3);">
    <tr>
      <td style="background:#0F172A;padding:32px 24px;text-align:center;border-bottom:3px solid #B89544;">
        <h2 style="margin:0 0 8px 0;color:#ffffff;font-size:22px;font-weight:700;">شركة مشعل بادغيش للمحاماة</h2>
        <span style="color:#B89544;font-size:14px;font-weight:600;">${isCustomService ? "⭐ طلب خدمة قانونية مخصصة" : "⚖️ طلب تواصل واستشارة قانونية"}</span>
      </td>
    </tr>
    <tr>
      <td style="padding:32px 28px;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;margin-bottom:24px;">
          ${isCustomService ? `
          <tr>
            <td style="padding:12px 14px;background-color:#f8fafc;color:#64748b;font-weight:bold;font-size:14px;border-bottom:1px solid #edf2f7;width:35%;">اسم الخدمة</td>
            <td style="padding:12px 14px;color:#0F172A;font-size:15px;font-weight:700;border-bottom:1px solid #edf2f7;">${safeServiceName}</td>
          </tr>
          <tr>
            <td style="padding:12px 14px;background-color:#f8fafc;color:#64748b;font-weight:bold;font-size:14px;border-bottom:1px solid #edf2f7;">الميزانية / التكلفة</td>
            <td style="padding:12px 14px;color:#B89544;font-size:15px;font-weight:700;border-bottom:1px solid #edf2f7;">${safeExpectedCost}</td>
          </tr>
          ` : `
          <tr>
            <td style="padding:12px 14px;background-color:#f8fafc;color:#64748b;font-weight:bold;font-size:14px;border-bottom:1px solid #edf2f7;width:35%;">اسم العميل</td>
            <td style="padding:12px 14px;color:#0F172A;font-size:15px;font-weight:700;border-bottom:1px solid #edf2f7;">${safeName}</td>
          </tr>
          <tr>
            <td style="padding:12px 14px;background-color:#f8fafc;color:#64748b;font-weight:bold;font-size:14px;border-bottom:1px solid #edf2f7;">رقم الجوال</td>
            <td style="padding:12px 14px;color:#0F172A;font-size:15px;border-bottom:1px solid #edf2f7;direction:ltr;text-align:right;">
              <a href="tel:${safePhone}" style="color:#B89544;text-decoration:none;font-weight:700;">${safePhone}</a>
            </td>
          </tr>
          `}
          ${safeEmail ? `
          <tr>
            <td style="padding:12px 14px;background-color:#f8fafc;color:#64748b;font-weight:bold;font-size:14px;border-bottom:1px solid #edf2f7;">البريد الإلكتروني</td>
            <td style="padding:12px 14px;color:#0F172A;font-size:14px;border-bottom:1px solid #edf2f7;direction:ltr;text-align:right;">
              <a href="mailto:${safeEmail}" style="color:#0284c7;text-decoration:none;">${safeEmail}</a>
            </td>
          </tr>` : ""}
        </table>

        <div style="font-size:14px;font-weight:bold;color:#0F172A;margin-bottom:8px;">تفاصيل الاستشارة / الموضوع:</div>
        <div style="background-color:#f8fafc;border-right:4px solid #B89544;padding:18px;border-radius:8px;color:#334155;font-size:14px;line-height:1.8;white-space:pre-wrap;margin-bottom:28px;">${safeMessage || "لم يتم تقديم تفاصيل إضافية."}</div>

        ${waNumber ? `
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td align="center">
              <a href="tel:${safePhone}" style="display:inline-block;padding:12px 24px;margin:4px 6px;background-color:#0F172A;color:#ffffff;text-decoration:none;border-radius:10px;font-size:14px;font-weight:bold;">اتصال هاتفي</a>
              <a href="https://wa.me/${waNumber}" target="_blank" rel="noopener noreferrer" style="display:inline-block;padding:12px 24px;margin:4px 6px;background-color:#25D366;color:#ffffff;text-decoration:none;border-radius:10px;font-size:14px;font-weight:bold;">محادثة واتساب</a>
            </td>
          </tr>
        </table>
        ` : ""}
      </td>
    </tr>
    <tr>
      <td style="background-color:#f8fafc;padding:18px 24px;border-top:1px solid #e2e8f0;text-align:center;font-size:12px;color:#94a3b8;line-height:1.6;">
        تم الإرسال عبر البوابة الإلكترونية لشركة مشعل بادغيش للمحاماة<br>
        التوقيت: ${nowRiyadh}
      </td>
    </tr>
  </table>
</body>
</html>`;

    const bodyBase64 = chunkBase64(toBase64Utf8(htmlBody));
    const replyToHeader = safeEmail && safeEmail.includes("@") ? `Reply-To: <${safeEmail}>\r\n` : "";

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
      throw new Error(`Email delivery failed (${finishData.code})`);
    }

    try {
      await sendCommand("QUIT");
    } catch (_) {}

    return new Response(
      JSON.stringify({
        success: true,
        message: "تم إرسال رسالتك بنجاح! سنتواصل معك في أقرب وقت ممكن.",
      }),
      { status: 200, headers: corsHeaders }
    );
  } catch (err) {
    console.error("SMTP Error during send:", err && err.message ? err.message : err);
    return new Response(
      JSON.stringify({
        success: false,
        message: "حدث خطأ أثناء إرسال الرسالة، يرجى التواصل معنا مباشرة عبر الواتساب.",
      }),
      { status: 500, headers: corsHeaders }
    );
  } finally {
    if (reader) {
      try { reader.releaseLock(); } catch (_) {}
    }
    if (writer) {
      try { writer.releaseLock(); } catch (_) {}
    }
    if (socket) {
      try { await socket.close(); } catch (_) {}
    }
  }
}
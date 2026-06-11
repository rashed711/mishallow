<?php
/**
 * =====================================================
 * مكتب مشعل بادغيش - مُرسِل الإيميلات عبر SMTP
 * Mailer - Sends emails via SMTP using PHP streams
 * No external dependencies required (no PHPMailer)
 * =====================================================
 */

defined('SECURE_BACKEND') or define('SECURE_BACKEND', true);
require_once __DIR__ . '/config.php';

class Mailer
{
    private string $host;
    private int    $port;
    private string $secure;
    private string $username;
    private string $password;
    private string $fromName;
    private string $fromAddress;

    public function __construct()
    {
        $this->host        = SMTP_HOST;
        $this->port        = SMTP_PORT;
        $this->secure      = SMTP_SECURE;
        $this->username    = SMTP_USERNAME;
        $this->password    = SMTP_PASSWORD;
        $this->fromName    = MAIL_FROM_NAME;
        $this->fromAddress = MAIL_FROM_ADDRESS;
    }

    /**
     * إرسال إيميل لمستلم واحد
     */
    public function send(
        string $toAddress,
        string $toName,
        string $subject,
        string $bodyHtml,
        string $bodyText = ''
    ): bool {
        try {
            $socket = $this->createSocket();
            $this->authenticate($socket);

            $boundary = '----=_Part_' . md5(uniqid('', true));
            $raw = $this->buildRaw(
                $toAddress, $toName,
                $subject,
                $bodyHtml, $bodyText ?: strip_tags($bodyHtml),
                $boundary
            );

            $this->smtpCommand($socket, "MAIL FROM:<{$this->fromAddress}>", '250');
            $this->smtpCommand($socket, "RCPT TO:<{$toAddress}>", '250');
            $this->smtpCommand($socket, "DATA", '354');

            fwrite($socket, $raw . "\r\n.\r\n");
            $response = $this->readResponse($socket);

            if (!str_starts_with($response, '250')) {
                throw new \RuntimeException("DATA error: {$response}");
            }

            $this->smtpCommand($socket, "QUIT", '221');
            fclose($socket);

            return true;

        } catch (\Throwable $e) {
            Security::log('ERROR', 'SMTP send failed: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * إرسال إيميل لجميع المستلمين المُعرَّفين في MAIL_RECIPIENTS
     * يفتح اتصال SMTP مستقل لكل مستلم لضمان التسليم حتى لو فشل أحدهم
     *
     * @return bool true إذا نجح الإرسال لجميع المستلمين، false إذا فشل أحدهم
     */
    public function sendToAll(
        string $subject,
        string $bodyHtml,
        string $bodyText = ''
    ): bool {
        $recipients = MAIL_RECIPIENTS;

        if (empty($recipients)) {
            Security::log('WARN', 'sendToAll: MAIL_RECIPIENTS is empty');
            return false;
        }

        $allSent = true;

        foreach ($recipients as $recipient) {
            $address = $recipient['address'] ?? '';
            $name    = $recipient['name']    ?? $address;

            if (empty($address)) {
                continue;
            }

            $sent = $this->send($address, $name, $subject, $bodyHtml, $bodyText);

            if (!$sent) {
                $allSent = false;
                Security::log('ERROR', "sendToAll: failed to send to {$address}");
            } else {
                Security::log('INFO', "sendToAll: sent to {$address}");
            }
        }

        return $allSent;
    }

    // ─── SMTP Internals ───────────────────────────────────────────────────────

    private function createSocket()
    {
        $host    = ($this->secure === 'ssl') ? "ssl://{$this->host}" : $this->host;
        $context = stream_context_create([
            'ssl' => [
                'verify_peer'       => true,
                'verify_peer_name'  => true,
                'allow_self_signed' => false,
            ],
        ]);

        $socket = @stream_socket_client(
            "{$host}:{$this->port}",
            $errno, $errstr,
            SMTP_TIMEOUT,
            STREAM_CLIENT_CONNECT,
            $context
        );

        if (!$socket) {
            throw new \RuntimeException("Cannot connect to SMTP: {$errstr} ({$errno})");
        }

        stream_set_timeout($socket, SMTP_TIMEOUT);

        // قراءة رسالة الترحيب
        $banner = $this->readResponse($socket);
        if (!str_starts_with($banner, '220')) {
            throw new \RuntimeException("Unexpected banner: {$banner}");
        }

        // EHLO
        $this->smtpCommand($socket, "EHLO " . gethostname(), '250');

        // إذا كان STARTTLS
        if ($this->secure === 'tls') {
            $this->smtpCommand($socket, "STARTTLS", '220');
            stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT);
            $this->smtpCommand($socket, "EHLO " . gethostname(), '250');
        }

        return $socket;
    }

    private function authenticate($socket): void
    {
        $this->smtpCommand($socket, "AUTH LOGIN", '334');
        $this->smtpCommand($socket, base64_encode($this->username), '334');
        $this->smtpCommand($socket, base64_encode($this->password), '235');
    }

    private function smtpCommand($socket, string $command, string $expectedCode): string
    {
        fwrite($socket, $command . "\r\n");
        $response = $this->readResponse($socket);

        if (!str_starts_with($response, $expectedCode)) {
            throw new \RuntimeException("SMTP error after '{$command}': {$response}");
        }

        return $response;
    }

    private function readResponse($socket): string
    {
        $response = '';
        while ($line = fgets($socket, 512)) {
            $response .= $line;
            // السطر الأخير لا يحتوي على شرطة بعد الكود
            if (strlen($line) >= 4 && $line[3] === ' ') {
                break;
            }
        }
        return trim($response);
    }

    private function buildRaw(
        string $to, string $toName,
        string $subject,
        string $html, string $text,
        string $boundary
    ): string {
        $date    = date('r');
        $msgId   = '<' . uniqid('', true) . '@' . gethostname() . '>';
        $encName = $this->encodeHeader($this->fromName);
        $encTo   = $this->encodeHeader($toName);
        $encSubj = $this->encodeHeader($subject);

        $raw  = "Date: {$date}\r\n";
        $raw .= "From: {$encName} <{$this->fromAddress}>\r\n";
        $raw .= "To: {$encTo} <{$to}>\r\n";
        $raw .= "Reply-To: {$encName} <{$this->fromAddress}>\r\n";
        $raw .= "Subject: {$encSubj}\r\n";
        $raw .= "Message-ID: {$msgId}\r\n";
        $raw .= "MIME-Version: 1.0\r\n";
        $raw .= "Content-Type: multipart/alternative; boundary=\"{$boundary}\"\r\n";
        $raw .= "X-Mailer: MishalLF-Mailer/1.0\r\n";
        $raw .= "\r\n";

        // النص العادي
        $raw .= "--{$boundary}\r\n";
        $raw .= "Content-Type: text/plain; charset=UTF-8\r\n";
        $raw .= "Content-Transfer-Encoding: base64\r\n";
        $raw .= "\r\n";
        $raw .= chunk_split(base64_encode($text)) . "\r\n";

        // النص HTML
        $raw .= "--{$boundary}\r\n";
        $raw .= "Content-Type: text/html; charset=UTF-8\r\n";
        $raw .= "Content-Transfer-Encoding: base64\r\n";
        $raw .= "\r\n";
        $raw .= chunk_split(base64_encode($html)) . "\r\n";

        $raw .= "--{$boundary}--";

        return $raw;
    }

    private function encodeHeader(string $value): string
    {
        return '=?UTF-8?B?' . base64_encode($value) . '?=';
    }

    // ─── HTML Templates ────────────────────────────────────────────────────────

    /**
     * قالب HTML للإيميل - مع تصميم احترافي
     */
    public static function buildHtmlTemplate(string $title, string $bodyHtml): string
    {
        return <<<HTML
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{$title}</title>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { font-family: 'Segoe UI', Arial, sans-serif; background:#f1f5f9; direction:rtl; }
    .wrapper { max-width:620px; margin:30px auto; background:#fff; border-radius:16px; overflow:hidden; box-shadow:0 4px 24px rgba(0,0,0,.08); }
    .header  { background:#0F172A; padding:32px 40px; text-align:center; }
    .header h1 { color:#B89544; font-size:22px; font-weight:900; letter-spacing:.05em; }
    .header p  { color:#94a3b8; font-size:13px; margin-top:6px; }
    .body    { padding:36px 40px; }
    .field   { margin-bottom:20px; }
    .label   { font-size:11px; font-weight:700; color:#94a3b8; text-transform:uppercase; letter-spacing:.1em; margin-bottom:6px; }
    .value   { font-size:15px; color:#0F172A; font-weight:500; line-height:1.6; background:#f8fafc; padding:12px 16px; border-radius:8px; border-right:3px solid #B89544; }
    .divider { height:1px; background:#e2e8f0; margin:28px 0; }
    .footer  { background:#0F172A; padding:20px 40px; text-align:center; }
    .footer p { color:#475569; font-size:12px; }
    .footer a { color:#B89544; text-decoration:none; }
    .badge   { display:inline-block; background:#B89544; color:#0F172A; font-size:11px; font-weight:700; padding:4px 12px; border-radius:20px; margin-bottom:16px; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>⚖️ مكتب مشعل بادغيش للمحاماة</h1>
      <p>{$title}</p>
    </div>
    <div class="body">
      {$bodyHtml}
    </div>
    <div class="footer">
      <p>📍 شارع عبدالله بن عباس، مكة المكرمة &nbsp;|&nbsp; 📞 <a href="tel:+966568000085">0568000085</a></p>
      <p style="margin-top:8px">هذا البريد أُرسل تلقائياً من موقع <a href="https://mishal-lawfirm.com">mishal-lawfirm.com</a></p>
    </div>
  </div>
</body>
</html>
HTML;
    }
}

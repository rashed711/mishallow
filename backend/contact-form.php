<?php
/**
 * =====================================================
 * مكتب مشعل بادغيش - API: نموذج التواصل العام
 * Contact Form Handler - contact-form.php
 * =====================================================
 * الحقول المطلوبة: name, phone, message
 * Endpoint: /backend/contact-form.php (POST)
 */

define('SECURE_BACKEND', true);
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/Security.php';
require_once __DIR__ . '/Mailer.php';

// ─── 1. التحقق من الأصل والطريقة ─────────────────────────────────────────────
Security::validateOrigin();
Security::requireMethod('POST');

// ─── 2. Rate Limiting ─────────────────────────────────────────────────────────
Security::checkRateLimit('contact');

// ─── 3. قراءة البيانات ───────────────────────────────────────────────────────
$input = json_decode(file_get_contents('php://input'), true);

if (!is_array($input)) {
    // محاولة قراءة form-data
    $input = $_POST;
}

$name    = Security::sanitize($input['name']    ?? '', MAX_NAME_LENGTH);
$phone   = Security::sanitize($input['phone']   ?? '', MAX_PHONE_LENGTH);
$message = Security::sanitize($input['message'] ?? '', MAX_MESSAGE_LENGTH);

// ─── 4. التحقق من صحة البيانات ───────────────────────────────────────────────
$errors = [];

if (empty($name) || mb_strlen($name) < 2) {
    $errors[] = 'الاسم مطلوب ويجب أن يكون حرفين على الأقل';
}

if (empty($phone)) {
    $errors[] = 'رقم الجوال مطلوب';
} elseif (!Security::validatePhone($phone)) {
    $errors[] = 'رقم الهاتف غير صحيح، يرجى إدخال رقم صالح (7-15 رقمًا)';
}

if (empty($message) || mb_strlen($message) < 10) {
    $errors[] = 'الرسالة مطلوبة ويجب أن تكون 10 أحرف على الأقل';
}

if (!empty($errors)) {
    Security::log('WARN', 'Contact form validation failed', ['errors' => $errors]);
    Security::jsonResponse(false, implode(' | ', $errors), 422);
}

// ─── 5. بناء محتوى الإيميل ───────────────────────────────────────────────────
$bodyHtml = <<<HTML
<div class="badge">طلب تواصل جديد</div>
<div class="field">
  <div class="label">الاسم الكامل</div>
  <div class="value">{$name}</div>
</div>
<div class="field">
  <div class="label">رقم الجوال</div>
  <div class="value" style="direction:ltr;text-align:right">{$phone}</div>
</div>
<div class="divider"></div>
<div class="field">
  <div class="label">تفاصيل الاستشارة القانونية</div>
  <div class="value">{$message}</div>
</div>
<div class="divider"></div>
<p style="font-size:13px;color:#64748b;text-align:center">
  📅 أُرسل في: <strong style="color:#0F172A">{$timestamp}</strong>
</p>
HTML;

$timestamp = date('Y-m-d H:i:s', time() + 10800); // UTC+3
$bodyHtml  = str_replace('{$timestamp}', $timestamp, $bodyHtml); // تصحيح الطابع الزمني

$html    = Mailer::buildHtmlTemplate('رسالة تواصل جديدة من الموقع', $bodyHtml);
$subject = "📩 رسالة جديدة من {$name} | مكتب مشعل بادغيش";

// ─── 6. إرسال الإيميل لجميع المستلمين ─────────────────────────────────────────────────────────
$mailer = new Mailer();
$sent   = $mailer->sendToAll($subject, $html);

if ($sent) {
    Security::log('INFO', 'Contact form sent successfully', ['name' => $name, 'phone' => $phone]);
    Security::jsonResponse(true, 'تم إرسال رسالتك بنجاح! سنتواصل معك في أقرب وقت ممكن.');
} else {
    Security::log('ERROR', 'Contact form send failed', ['name' => $name]);
    Security::jsonResponse(false, 'حدث خطأ أثناء إرسال الرسالة، يرجى التواصل معنا مباشرة عبر الواتساب', 500);
}

<?php
/**
 * =====================================================
 * مكتب مشعل بادغيش - API: نموذج الخدمات المخصصة
 * Custom Service Request Handler - custom-service.php
 * =====================================================
 * الحقول المطلوبة: service_name, expected_cost, description
 * Endpoint: /backend/custom-service.php (POST)
 */

define('SECURE_BACKEND', true);
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/Security.php';
require_once __DIR__ . '/Mailer.php';

// ─── 1. التحقق من الأصل والطريقة ─────────────────────────────────────────────
Security::validateOrigin();
Security::requireMethod('POST');

// ─── 2. Rate Limiting ─────────────────────────────────────────────────────────
Security::checkRateLimit('custom_service');

// ─── 3. قراءة البيانات ───────────────────────────────────────────────────────
$input = json_decode(file_get_contents('php://input'), true);

if (!is_array($input)) {
    $input = $_POST;
}

$serviceName  = Security::sanitize($input['service_name']   ?? '', MAX_SUBJECT_LENGTH);
$expectedCost = Security::sanitize($input['expected_cost']  ?? '', MAX_PHONE_LENGTH);
$description  = Security::sanitize($input['description']    ?? '', MAX_MESSAGE_LENGTH);

// ─── 4. التحقق من صحة البيانات ───────────────────────────────────────────────
$errors = [];

if (empty($serviceName) || mb_strlen($serviceName) < 3) {
    $errors[] = 'اسم الخدمة مطلوب ويجب أن يكون 3 أحرف على الأقل';
}

if (empty($expectedCost)) {
    $errors[] = 'التكلفة المتوقعة مطلوبة';
}

if (empty($description) || mb_strlen($description) < 10) {
    $errors[] = 'وصف الخدمة مطلوب ويجب أن يكون 10 أحرف على الأقل';
}

if (!empty($errors)) {
    Security::log('WARN', 'Custom service validation failed', ['errors' => $errors]);
    Security::jsonResponse(false, implode(' | ', $errors), 422);
}

// ─── 5. بناء محتوى الإيميل ───────────────────────────────────────────────────
$timestamp = date('Y-m-d H:i:s', time() + 10800); // UTC+3

$bodyHtml = <<<HTML
<div class="badge">⭐ طلب خدمة مخصصة جديد</div>
<div class="field">
  <div class="label">اسم الخدمة المطلوبة</div>
  <div class="value">{$serviceName}</div>
</div>
<div class="field">
  <div class="label">التكلفة المتوقعة أو المناسبة</div>
  <div class="value">{$expectedCost}</div>
</div>
<div class="divider"></div>
<div class="field">
  <div class="label">وصف الخدمة وتفاصيلها</div>
  <div class="value">{$description}</div>
</div>
<div class="divider"></div>
<p style="font-size:13px;color:#64748b;text-align:center">
  📅 أُرسل في: <strong style="color:#0F172A">{$timestamp}</strong>
</p>
HTML;

$html    = Mailer::buildHtmlTemplate('طلب خدمة مخصصة جديد من الموقع', $bodyHtml);
$subject = "⭐ طلب خدمة مخصصة: {$serviceName} | مكتب مشعل بادغيش";

// ─── 6. إرسال الإيميل لجميع المستلمين ─────────────────────────────────────────
$mailer = new Mailer();
$sent   = $mailer->sendToAll($subject, $html);

if ($sent) {
    Security::log('INFO', 'Custom service request sent', ['service' => $serviceName]);
    Security::jsonResponse(true, 'تم إرسال طلبك بنجاح! سيقوم فريقنا بمراجعته والتواصل معك في أقرب وقت.');
} else {
    Security::log('ERROR', 'Custom service request send failed', ['service' => $serviceName]);
    Security::jsonResponse(false, 'حدث خطأ أثناء إرسال الطلب، يرجى المحاولة مجدداً أو التواصل عبر الواتساب', 500);
}

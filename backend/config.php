<?php
/**
 * =====================================================
 * شركة مشعل بادغيش - إعدادات الباك إند
 * Backend Configuration - Mishal Badghish Law Firm
 * =====================================================
 * تحذير أمني: لا تشارك هذا الملف أبدًا ولا ترفعه علنياً
 * SECURITY WARNING: Never expose this file publicly
 */

// ─── منع الوصول المباشر للملف ───────────────────────────────────────────────
if (!defined('SECURE_BACKEND')) {
    http_response_code(403);
    die(json_encode(['success' => false, 'message' => 'Forbidden']));
}

// ─── إعدادات البيئة ──────────────────────────────────────────────────────────
define('APP_ENV', 'production'); // production | development

// ─── إعدادات SMTP ────────────────────────────────────────────────────────────
define('SMTP_HOST',     'mail.mishal-lawfirm.com');
define('SMTP_PORT',     465);
define('SMTP_SECURE',   'ssl');          // ssl | tls
define('SMTP_AUTH',     true);
define('SMTP_USERNAME', 'noreply@mishal-lawfirm.com');
define('SMTP_PASSWORD', 'Aa@01028855');
define('SMTP_CHARSET',  'UTF-8');
define('SMTP_TIMEOUT',  15);

// ─── إعدادات الإيميل ─────────────────────────────────────────────────────────
define('MAIL_FROM_NAME',    'شركة مشعل بادغيش للمحاماة');
define('MAIL_FROM_ADDRESS', 'noreply@mishal-lawfirm.com');

// ─── قائمة المستلمين ─────────────────────────────────────────────────────────
// لإضافة مستلم جديد: أضف سطراً جديداً بنفس الصيغة
// لإزالة مستلم:      احذف سطره أو ضع // في بدايته
define('MAIL_RECIPIENTS', [
    ['address' => 'rashed1711@gmail.com',       'name' => 'راشد'],
    ['address' => 'info@mishal-lawfirm.com',    'name' => 'شركة مشعل بادغيش'],
    // ['address' => 'another@example.com',     'name' => 'مستلم آخر'], // مثال لإضافة مستلم ثالث
]);

// ─── إعدادات الأمان ──────────────────────────────────────────────────────────
// النطاقات المسموح بها لإرسال الطلبات (CORS)
define('ALLOWED_ORIGINS', [
    'https://mishal-lawfirm.com',
    'https://www.mishal-lawfirm.com',
    'https://mishallow.vercel.app',
]);

// الحد الأقصى لعدد الطلبات في الدقيقة لكل IP (Rate Limiting)
define('RATE_LIMIT_MAX_REQUESTS', 5);
define('RATE_LIMIT_WINDOW',       60); // seconds

// حد أقصى لطول الرسائل
define('MAX_NAME_LENGTH',    100);
define('MAX_PHONE_LENGTH',   20);
define('MAX_MESSAGE_LENGTH', 2000);
define('MAX_SUBJECT_LENGTH', 200);

// ─── إعدادات السجلات (Logging) ───────────────────────────────────────────────
define('LOG_ENABLED',  true);
define('LOG_FILE',     __DIR__ . '/logs/mail.log');
define('LOG_MAX_SIZE', 1048576); // 1MB - يتم تدوير الملف عند تجاوز الحد

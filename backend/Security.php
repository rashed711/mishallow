<?php
/**
 * =====================================================
 * مكتب مشعل بادغيش - طبقة الأمان المشتركة
 * Shared Security Layer
 * =====================================================
 */

defined('SECURE_BACKEND') or define('SECURE_BACKEND', true);
require_once __DIR__ . '/config.php';

class Security
{
    /**
     * التحقق من CORS والسماح فقط للنطاقات المعتمدة
     */
    public static function validateOrigin(): void
    {
        $origin = $_SERVER['HTTP_ORIGIN'] ?? '';

        // في بيئة التطوير اسمح بـ localhost
        if (APP_ENV === 'development' && (
            str_starts_with($origin, 'http://localhost') ||
            str_starts_with($origin, 'http://127.0.0.1')
        )) {
            self::setCorsHeaders($origin);
            return;
        }

        if (!in_array($origin, ALLOWED_ORIGINS, true)) {
            self::jsonResponse(false, 'غير مسموح بالوصول', 403);
        }

        self::setCorsHeaders($origin);
    }

    /**
     * التحقق من طريقة الطلب
     */
    public static function requireMethod(string $method): void
    {
        if ($_SERVER['REQUEST_METHOD'] !== strtoupper($method)) {
            self::setCorsHeaders($_SERVER['HTTP_ORIGIN'] ?? '');
            if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
                http_response_code(200);
                exit();
            }
            self::jsonResponse(false, 'طريقة الطلب غير مدعومة', 405);
        }
    }

    /**
     * Rate Limiting - تقييد عدد الطلبات عبر ملفات مؤقتة
     */
    public static function checkRateLimit(string $identifier = ''): void
    {
        $ip  = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? 'unknown';
        $key = md5($ip . $identifier);
        $cacheDir = sys_get_temp_dir() . '/mishal_rl/';

        if (!is_dir($cacheDir)) {
            mkdir($cacheDir, 0700, true);
        }

        $file   = $cacheDir . $key . '.json';
        $now    = time();
        $window = RATE_LIMIT_WINDOW;
        $max    = RATE_LIMIT_MAX_REQUESTS;

        $data = ['count' => 0, 'window_start' => $now];

        if (file_exists($file)) {
            $stored = json_decode(file_get_contents($file), true);
            if ($stored && ($now - $stored['window_start']) < $window) {
                $data = $stored;
                if ($data['count'] >= $max) {
                    self::jsonResponse(false, 'تم تجاوز الحد المسموح به من الطلبات، يرجى الانتظار قليلاً', 429);
                }
            }
        }

        $data['count']++;
        file_put_contents($file, json_encode($data), LOCK_EX);
    }

    /**
     * تنظيف وتعقيم المدخلات
     */
    public static function sanitize(string $input, int $maxLength = 500): string
    {
        $input = trim($input);
        $input = strip_tags($input);
        $input = htmlspecialchars($input, ENT_QUOTES | ENT_HTML5, 'UTF-8');
        $input = substr($input, 0, $maxLength);
        // إزالة أحرف التحكم غير المرئية
        $input = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/', '', $input);
        return $input;
    }

    /**
     * التحقق من رقم الهاتف السعودي/العربي
     */
    public static function validatePhone(string $phone): bool
    {
        // قبول أرقام مثل: 05xxxxxxxx, +9665xxxxxxxx, 009665xxxxxxxx
        $cleaned = preg_replace('/[\s\-\(\)\.]+/', '', $phone);
        return (bool) preg_match('/^(\+966|00966|0)5[0-9]{8}$/', $cleaned);
    }

    /**
     * التحقق من الإيميل
     */
    public static function validateEmail(string $email): bool
    {
        return filter_var($email, FILTER_VALIDATE_EMAIL) !== false
            && strlen($email) <= 254;
    }

    /**
     * الرد بـ JSON وإيقاف التنفيذ
     */
    public static function jsonResponse(bool $success, string $message, int $httpCode = 200, array $extra = []): never
    {
        http_response_code($httpCode);
        header('Content-Type: application/json; charset=UTF-8');
        echo json_encode(
            array_merge(['success' => $success, 'message' => $message], $extra),
            JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT
        );
        exit();
    }

    /**
     * تعيين رؤوس CORS
     */
    private static function setCorsHeaders(string $origin): void
    {
        header('Access-Control-Allow-Origin: ' . $origin);
        header('Access-Control-Allow-Methods: POST, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, X-Requested-With');
        header('Access-Control-Max-Age: 86400');
        header('X-Content-Type-Options: nosniff');
        header('X-Frame-Options: DENY');
        header('X-XSS-Protection: 1; mode=block');
        header('Referrer-Policy: strict-origin-when-cross-origin');
    }

    /**
     * تسجيل الأحداث في ملف السجل
     */
    public static function log(string $level, string $message, array $context = []): void
    {
        if (!LOG_ENABLED) return;

        $logDir = dirname(LOG_FILE);
        if (!is_dir($logDir)) {
            mkdir($logDir, 0700, true);
        }

        // تدوير الملف إذا تجاوز الحجم الأقصى
        if (file_exists(LOG_FILE) && filesize(LOG_FILE) > LOG_MAX_SIZE) {
            rename(LOG_FILE, LOG_FILE . '.' . date('Y-m-d-H-i-s') . '.old');
        }

        $ip      = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? 'unknown';
        $date    = date('Y-m-d H:i:s');
        $ctx     = !empty($context) ? ' | ' . json_encode($context, JSON_UNESCAPED_UNICODE) : '';
        $entry   = "[{$date}] [{$level}] [IP:{$ip}] {$message}{$ctx}\n";

        file_put_contents(LOG_FILE, $entry, FILE_APPEND | LOCK_EX);
    }
}

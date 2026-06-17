<?php
/**
 * =====================================================
 * شركة مشعل بادغيش - API: رفع الصور والملفات
 * File Upload API - upload.php
 * =====================================================
 */

define('SECURE_BACKEND', true);
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/Security.php';


// 1. التحقق من CORS والطريقة
Security::validateOrigin();

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

Security::requireMethod('POST');

// 2. التحقق من الصلاحيات (يجب أن يكون مسؤولاً مسجلاً دخوله)
if (!isset($_SESSION['logged_in']) || $_SESSION['logged_in'] !== true) {
    Security::jsonResponse(false, 'غير مصرح بالوصول - يرجى تسجيل الدخول أولاً', 401);
}

// 3. التحقق من وجود الملف
if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
    Security::jsonResponse(false, 'لم يتم اختيار ملف أو حدث خطأ أثناء الرفع', 400);
}

$file = $_FILES['image'];

// 4. التحقق من الحجم (الحد الأقصى 3 ميجابايت)
$maxSize = 3 * 1024 * 1024;
if ($file['size'] > $maxSize) {
    Security::jsonResponse(false, 'حجم الملف كبير جداً، الحد الأقصى المسموح به هو 3 ميجابايت', 400);
}

// 5. التحقق من نوع الملف (الامتداد ونوع الـ MIME)
$allowedTypes = [
    'image/jpeg' => 'jpg',
    'image/png'  => 'png',
    'image/gif'  => 'gif',
    'image/webp' => 'webp'
];

$fileMimeType = mime_content_type($file['tmp_name']);
if (!array_key_exists($fileMimeType, $allowedTypes)) {
    Security::jsonResponse(false, 'نوع الملف غير مدعوم، يرجى رفع صورة بصيغة JPG, PNG, WEBP, GIF فقط', 400);
}

$extension = $allowedTypes[$fileMimeType];

// 6. تحديد مسار الحفظ (مجلد uploads في جذر المشروع)
$uploadsDir = __DIR__ . '/../uploads';
if (!is_dir($uploadsDir)) {
    mkdir($uploadsDir, 0755, true);
}

// إنشاء اسم ملف فريد وآمن لمنع رفع ملفات خبيثة أو استبدال ملفات قائمة
$fileName = md5(uniqid(rand(), true)) . '.' . $extension;
$destination = $uploadsDir . '/' . $fileName;

if (move_uploaded_file($file['tmp_name'], $destination)) {
    Security::log('INFO', "File uploaded successfully: {$fileName} by user: {$_SESSION['username']}");
    // إرجاع المسار النسبي الذي يمكن للموقع عرضه مباشرة
    Security::jsonResponse(true, 'تم رفع الصورة بنجاح', 200, [
        'url' => '/uploads/' . $fileName
    ]);
} else {
    Security::log('ERROR', "Failed to move uploaded file to destination: {$destination}");
    Security::jsonResponse(false, 'فشل نقل الملف المرفوع إلى خادم الاستضافة', 500);
}

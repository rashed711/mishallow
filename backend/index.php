<?php
/**
 * =====================================================
 * حماية المجلد - منع الوصول المباشر
 * Directory Protection
 * =====================================================
 * ضع هذا الملف في مجلد /backend/ وسيمنع استعراض المجلد
 */

define('SECURE_BACKEND', true);
http_response_code(403);
header('Content-Type: application/json; charset=UTF-8');
die(json_encode([
    'success' => false,
    'message' => 'Access Denied - 403 Forbidden'
]));

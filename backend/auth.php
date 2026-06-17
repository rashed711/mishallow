<?php
/**
 * =====================================================
 * شركة مشعل بادغيش - API: مصادقة المستخدمين وجلسات العمل
 * Authentication API - auth.php
 * =====================================================
 */

define('SECURE_BACKEND', true);
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/Security.php';
require_once __DIR__ . '/db.php';


// 1. التحقق من CORS والطريقة
Security::validateOrigin();

// معالجة طلب OPTIONS للـ CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];
$db = DB::connect();

// قراءة بيانات الطلب (JSON)
$input = json_decode(file_get_contents('php://input'), true) ?? [];

if ($method === 'POST') {
    $action = Security::sanitize($input['action'] ?? $_POST['action'] ?? '', 20);

    // تسجيل الدخول
    if ($action === 'login') {
        Security::checkRateLimit('login');
        
        $username = Security::sanitize($input['username'] ?? $_POST['username'] ?? '', 50);
        $password = $input['password'] ?? $_POST['password'] ?? '';

        if (empty($username) || empty($password)) {
            Security::jsonResponse(false, 'الرجاء إدخال اسم المستخدم وكلمة المرور', 400);
        }

        $stmt = $db->prepare("SELECT * FROM users WHERE username = ?");
        $stmt->execute([$username]);
        $user = $stmt->fetch();

        if ($user && password_verify($password, $user['password_hash'])) {
            // تجديد معرف الجلسة لمنع هجمات Session Fixation
            session_regenerate_id(true);
            
            $_SESSION['logged_in'] = true;
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username'];
            $_SESSION['role'] = $user['role'];

            Security::log('INFO', "Successful login for user: {$username}");
            Security::jsonResponse(true, 'تم تسجيل الدخول بنجاح', 200, [
                'user' => [
                    'username' => $user['username'],
                    'role' => $user['role']
                ]
            ]);
        } else {
            Security::log('WARN', "Failed login attempt for user: {$username}");
            Security::jsonResponse(false, 'اسم المستخدم أو كلمة المرور غير صحيحة', 401);
        }
    }

    // تسجيل الخروج
    if ($action === 'logout') {
        $_SESSION = [];
        if (ini_get("session.use_cookies")) {
            $params = session_get_cookie_params();
            setcookie(session_name(), '', time() - 42000,
                $params["path"], $params["domain"],
                $params["secure"], $params["httponly"]
            );
        }
        session_destroy();
        Security::jsonResponse(true, 'تم تسجيل الخروج بنجاح');
    }
}

if ($method === 'GET') {
    // التحقق من حالة تسجيل الدخول
    if (isset($_SESSION['logged_in']) && $_SESSION['logged_in'] === true) {
        Security::jsonResponse(true, 'المستخدم متصل', 200, [
            'user' => [
                'username' => $_SESSION['username'],
                'role' => $_SESSION['role']
            ]
        ]);
    } else {
        Security::jsonResponse(false, 'المستخدم غير متصل', 401);
    }
}

Security::jsonResponse(false, 'طلب غير صالح', 400);

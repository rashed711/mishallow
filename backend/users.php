<?php
/**
 * =====================================================
 * شركة مشعل بادغيش - API: إدارة المستخدمين والمدراء
 * Users API - users.php
 * =====================================================
 */

define('SECURE_BACKEND', true);
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/Security.php';
require_once __DIR__ . '/db.php';

// 1. التحقق من CORS
Security::validateOrigin();

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// التحقق من صلاحيات المدير المسجل دخوله
if (!isset($_SESSION['logged_in']) || $_SESSION['logged_in'] !== true) {
    Security::jsonResponse(false, 'غير مصرح بالوصول - يرجى تسجيل الدخول أولاً', 401);
}

$method = $_SERVER['REQUEST_METHOD'];
$db = DB::connect();
$input = json_decode(file_get_contents('php://input'), true) ?? [];

switch ($method) {
    case 'GET':
        // جلب قائمة المستخدمين
        $users = $db->query("SELECT id, username, role, created_at FROM users ORDER BY created_at DESC")->fetchAll();
        Security::jsonResponse(true, 'تم جلب المستخدمين بنجاح', 200, ['users' => $users]);
        break;

    case 'POST':
        $username = Security::sanitize($input['username'] ?? '', 50);
        $password = $input['password'] ?? '';
        $role = Security::sanitize($input['role'] ?? 'editor', 20);

        if (empty($username) || empty($password)) {
            Security::jsonResponse(false, 'اسم المستخدم وكلمة المرور مطلوبان', 400);
        }

        if (strlen($password) < 6) {
            Security::jsonResponse(false, 'يجب ألا تقل كلمة المرور عن 6 أحرف', 400);
        }

        $passwordHash = password_hash($password, PASSWORD_DEFAULT);

        try {
            $stmt = $db->prepare("INSERT INTO users (username, password_hash, role) VALUES (?, ?, ?)");
            $stmt->execute([$username, $passwordHash, $role]);
            Security::jsonResponse(true, 'تم إضافة المستخدم بنجاح', 201);
        } catch (PDOException $e) {
            if ($e->getCode() == 23000) {
                Security::jsonResponse(false, 'اسم المستخدم هذا مسجل بالفعل', 400);
            }
            Security::jsonResponse(false, 'حدث خطأ أثناء إضافة المستخدم', 500);
        }
        break;

    case 'PUT':
        $id = intval($input['id'] ?? 0);
        $role = Security::sanitize($input['role'] ?? '', 20);
        $password = $input['password'] ?? '';

        if (empty($id)) {
            Security::jsonResponse(false, 'معرف المستخدم مطلوب للتعديل', 400);
        }

        try {
            if (!empty($password)) {
                if (strlen($password) < 6) {
                    Security::jsonResponse(false, 'يجب ألا تقل كلمة المرور عن 6 أحرف', 400);
                }
                $passwordHash = password_hash($password, PASSWORD_DEFAULT);
                $stmt = $db->prepare("UPDATE users SET role = ?, password_hash = ? WHERE id = ?");
                $stmt->execute([$role, $passwordHash, $id]);
            } else {
                $stmt = $db->prepare("UPDATE users SET role = ? WHERE id = ?");
                $stmt->execute([$role, $id]);
            }
            Security::jsonResponse(true, 'تم تحديث بيانات المستخدم بنجاح');
        } catch (PDOException $e) {
            Security::jsonResponse(false, 'حدث خطأ أثناء التحديث: ' . $e->getMessage(), 500);
        }
        break;

    case 'DELETE':
        $id = intval($_GET['id'] ?? 0);

        if (empty($id)) {
            Security::jsonResponse(false, 'معرف المستخدم مطلوب لحذفه', 400);
        }

        // منع المستخدم من حذف حسابه الفعال لمنع قفل النظام
        if ($id === intval($_SESSION['user_id'])) {
            Security::jsonResponse(false, 'لا يمكنك حذف حسابك الشخصي الذي تستخدمه حالياً', 400);
        }

        $stmt = $db->prepare("DELETE FROM users WHERE id = ?");
        $stmt->execute([$id]);

        if ($stmt->rowCount() > 0) {
            Security::jsonResponse(true, 'تم حذف المستخدم بنجاح');
        } else {
            Security::jsonResponse(false, 'المستخدم غير موجود', 404);
        }
        break;

    default:
        Security::jsonResponse(false, 'طريقة الطلب غير مدعومة', 405);
}

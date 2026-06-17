<?php
/**
 * =====================================================
 * شركة مشعل بادغيش - API: تصنيفات الخدمات السريعة
 * Quick Categories API - quick-categories.php
 * =====================================================
 */

define('SECURE_BACKEND', true);
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/Security.php';
require_once __DIR__ . '/db.php';

Security::validateOrigin();

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];
$db = DB::connect();

// وظيفة التحقق من تسجيل الدخول للمشرفين
function requireAuth(): void
{
    if (!isset($_SESSION['logged_in']) || $_SESSION['logged_in'] !== true) {
        Security::jsonResponse(false, 'غير مصرح بالوصول - يرجى تسجيل الدخول أولاً', 401);
    }
}

$input = json_decode(file_get_contents('php://input'), true) ?? [];

switch ($method) {
    case 'GET':
        $categories = $db->query("SELECT * FROM quick_service_categories ORDER BY id ASC")->fetchAll();
        Security::jsonResponse(true, 'تم جلب التصنيفات بنجاح', 200, ['categories' => $categories]);
        break;

    case 'POST':
        requireAuth();
        $id = Security::sanitize($input['id'] ?? '', 50);
        $name = Security::sanitize($input['name'] ?? '', 100);

        if (empty($id) || empty($name)) {
            Security::jsonResponse(false, 'المعرف والاسم مطلوبان', 400);
        }

        try {
            $stmt = $db->prepare("INSERT INTO quick_service_categories (id, name) VALUES (?, ?)");
            $stmt->execute([$id, $name]);
            Security::jsonResponse(true, 'تم إضافة التصنيف بنجاح', 201);
        } catch (PDOException $e) {
            if ($e->getCode() == 23000) {
                Security::jsonResponse(false, 'معرف التصنيف مستخدم بالفعل', 400);
            }
            Security::jsonResponse(false, 'حدث خطأ أثناء حفظ التصنيف: ' . $e->getMessage(), 500);
        }
        break;

    case 'PUT':
        requireAuth();
        $id = Security::sanitize($input['id'] ?? '', 50);
        $name = Security::sanitize($input['name'] ?? '', 100);

        if (empty($id) || empty($name)) {
            Security::jsonResponse(false, 'المعرف والاسم مطلوبان', 400);
        }

        try {
            $stmt = $db->prepare("UPDATE quick_service_categories SET name = ? WHERE id = ?");
            $stmt->execute([$name, $id]);
            Security::jsonResponse(true, 'تم تحديث التصنيف بنجاح');
        } catch (PDOException $e) {
            Security::jsonResponse(false, 'حدث خطأ أثناء التحديث: ' . $e->getMessage(), 500);
        }
        break;

    case 'DELETE':
        requireAuth();
        $id = Security::sanitize($_GET['id'] ?? '', 50);

        if (empty($id)) {
            Security::jsonResponse(false, 'المعرف مطلوب لحذف التصنيف', 400);
        }

        try {
            $stmt = $db->prepare("DELETE FROM quick_service_categories WHERE id = ?");
            $stmt->execute([$id]);
            if ($stmt->rowCount() > 0) {
                Security::jsonResponse(true, 'تم حذف التصنيف بنجاح (سيتم حذف الخدمات المرتبطة به تلقائياً)');
            } else {
                Security::jsonResponse(false, 'التصنيف غير موجود', 404);
            }
        } catch (PDOException $e) {
            Security::jsonResponse(false, 'حدث خطأ أثناء الحذف: ' . $e->getMessage(), 500);
        }
        break;

    default:
        Security::jsonResponse(false, 'طريقة الطلب غير مدعومة', 405);
}

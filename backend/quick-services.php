<?php
/**
 * =====================================================
 * شركة مشعل بادغيش - API: إدارة الخدمات السريعة
 * Quick Services API - quick-services.php
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
        $slug = Security::sanitize($_GET['slug'] ?? '', 100);
        $flat = intval($_GET['flat'] ?? 0);

        if ($slug) {
            // جلب خدمة فردية بالـ slug
            $stmt = $db->prepare("SELECT * FROM quick_services WHERE slug = ?");
            $stmt->execute([$slug]);
            $service = $stmt->fetch();
            if ($service) {
                $service['features'] = json_decode($service['features'], true);
                Security::jsonResponse(true, 'تم جلب الخدمة السريعة بنجاح', 200, ['service' => $service]);
            } else {
                Security::jsonResponse(false, 'الخدمة السريعة غير موجودة', 404);
            }
        } elseif ($flat) {
            // جلب قائمة مسطحة لجميع الخدمات السريعة (مناسب للوحة التحكم)
            $services = $db->query("SELECT qs.*, cat.name as category_name FROM quick_services qs JOIN quick_service_categories cat ON qs.category_id = cat.id ORDER BY qs.created_at DESC")->fetchAll();
            foreach ($services as &$srv) {
                $srv['features'] = json_decode($srv['features'], true);
            }
            Security::jsonResponse(true, 'تم جلب الخدمات السريعة بنجاح', 200, ['services' => $services]);
        } else {
            // جلب الخدمات مجمعة في تصنيفاتها (مناسب للموقع العام)
            $categories = $db->query("SELECT * FROM quick_service_categories ORDER BY id ASC")->fetchAll();
            $result = [];
            foreach ($categories as $cat) {
                $stmt = $db->prepare("SELECT * FROM quick_services WHERE category_id = ? ORDER BY created_at ASC");
                $stmt->execute([$cat['id']]);
                $services = $stmt->fetchAll();
                
                foreach ($services as &$srv) {
                    $srv['features'] = json_decode($srv['features'], true);
                }
                
                $result[] = [
                    'id' => $cat['id'],
                    'name' => $cat['name'],
                    'services' => $services
                ];
            }
            Security::jsonResponse(true, 'تم جلب الخدمات السريعة بنجاح', 200, ['quickServices' => $result]);
        }
        break;

    case 'POST':
        requireAuth();
        $id = Security::sanitize($input['id'] ?? '', 50);
        $categoryId = Security::sanitize($input['category_id'] ?? '', 50);
        $slug = Security::sanitize($input['slug'] ?? '', 100);
        $title = Security::sanitize($input['title'] ?? '', 200);
        $description = Security::sanitize($input['description'] ?? '', 1000);
        $priceRange = Security::sanitize($input['priceRange'] ?? '', 100);
        $features = json_encode($input['features'] ?? [], JSON_UNESCAPED_UNICODE);

        if (empty($id) || empty($categoryId) || empty($slug) || empty($title)) {
            Security::jsonResponse(false, 'الرجاء إدخال الحقول الإجبارية (المعرف، التصنيف، الرابط، العنوان)', 400);
        }

        try {
            $stmt = $db->prepare("INSERT INTO quick_services (id, category_id, slug, title, description, features, priceRange) VALUES (?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([$id, $categoryId, $slug, $title, $description, $features, $priceRange]);
            Security::jsonResponse(true, 'تم إضافة الخدمة السريعة بنجاح', 201);
        } catch (PDOException $e) {
            if ($e->getCode() == 23000) {
                Security::jsonResponse(false, 'المعرف أو الرابط (slug) مستخدم بالفعل', 400);
            }
            Security::jsonResponse(false, 'حدث خطأ أثناء الإضافة: ' . $e->getMessage(), 500);
        }
        break;

    case 'PUT':
        requireAuth();
        $id = Security::sanitize($input['id'] ?? '', 50);
        $categoryId = Security::sanitize($input['category_id'] ?? '', 50);
        $slug = Security::sanitize($input['slug'] ?? '', 100);
        $title = Security::sanitize($input['title'] ?? '', 200);
        $description = Security::sanitize($input['description'] ?? '', 1000);
        $priceRange = Security::sanitize($input['priceRange'] ?? '', 100);
        $features = json_encode($input['features'] ?? [], JSON_UNESCAPED_UNICODE);

        if (empty($id) || empty($categoryId) || empty($slug) || empty($title)) {
            Security::jsonResponse(false, 'الرجاء إدخال الحقول الإجبارية (المعرف، التصنيف، الرابط، العنوان)', 400);
        }

        try {
            $stmt = $db->prepare("UPDATE quick_services SET category_id = ?, slug = ?, title = ?, description = ?, features = ?, priceRange = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?");
            $stmt->execute([$categoryId, $slug, $title, $description, $features, $priceRange, $id]);
            Security::jsonResponse(true, 'تم تحديث الخدمة السريعة بنجاح');
        } catch (PDOException $e) {
            Security::jsonResponse(false, 'حدث خطأ أثناء التحديث: ' . $e->getMessage(), 500);
        }
        break;

    case 'DELETE':
        requireAuth();
        $id = Security::sanitize($_GET['id'] ?? '', 50);

        if (empty($id)) {
            Security::jsonResponse(false, 'معرف الخدمة مطلوب لحذفها', 400);
        }

        $stmt = $db->prepare("DELETE FROM quick_services WHERE id = ?");
        $stmt->execute([$id]);

        if ($stmt->rowCount() > 0) {
            Security::jsonResponse(true, 'تم حذف الخدمة السريعة بنجاح');
        } else {
            Security::jsonResponse(false, 'الخدمة السريعة غير موجودة', 404);
        }
        break;

    default:
        Security::jsonResponse(false, 'طريقة الطلب غير مدعومة', 405);
}

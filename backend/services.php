<?php
/**
 * =====================================================
 * شركة مشعل بادغيش - API: إدارة الخدمات
 * Services API - services.php
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

$method = $_SERVER['REQUEST_METHOD'];
$db = DB::connect();

// وظيفة التحقق من تسجيل الدخول
function requireAuth(): void
{
    if (!isset($_SESSION['logged_in']) || $_SESSION['logged_in'] !== true) {
        Security::jsonResponse(false, 'غير مصرح بالوصول - يرجى تسجيل الدخول أولاً', 401);
    }
}

// قراءة بيانات الطلب (JSON)
$input = json_decode(file_get_contents('php://input'), true) ?? [];

switch ($method) {
    case 'GET':
        // جلب جميع الخدمات أو خدمة محددة بالـ slug
        $slug = Security::sanitize($_GET['slug'] ?? '', 100);
        if ($slug) {
            $stmt = $db->prepare("SELECT * FROM services WHERE slug = ?");
            $stmt->execute([$slug]);
            $service = $stmt->fetch();
            if ($service) {
                // فك تشفير حقول الـ JSON
                $service['fullDescription'] = json_decode($service['fullDescription'], true);
                $service['features'] = json_decode($service['features'], true);
                $service['targetAudience'] = json_decode($service['targetAudience'], true);
                $service['legalSystems'] = json_decode($service['legalSystems'], true);
                $service['faq'] = json_decode($service['faq'], true);
                Security::jsonResponse(true, 'تم جلب الخدمة بنجاح', 200, ['service' => $service]);
            } else {
                Security::jsonResponse(false, 'الخدمة غير موجودة', 404);
            }
        } else {
            $services = $db->query("SELECT * FROM services ORDER BY created_at DESC")->fetchAll();
            foreach ($services as &$service) {
                $service['fullDescription'] = json_decode($service['fullDescription'], true);
                $service['features'] = json_decode($service['features'], true);
                $service['targetAudience'] = json_decode($service['targetAudience'], true);
                $service['legalSystems'] = json_decode($service['legalSystems'], true);
                $service['faq'] = json_decode($service['faq'], true);
            }
            Security::jsonResponse(true, 'تم جلب الخدمات بنجاح', 200, ['services' => $services]);
        }
        break;

    case 'POST':
        requireAuth();
        
        $id = Security::sanitize($input['id'] ?? '', 50);
        $slug = Security::sanitize($input['slug'] ?? '', 100);
        $title = Security::sanitize($input['title'] ?? '', 200);
        $seoTitle = Security::sanitize($input['seoTitle'] ?? '', 200);
        $seoDescription = Security::sanitize($input['seoDescription'] ?? '', 500);
        $icon = Security::sanitize($input['icon'] ?? 'ScaleIcon', 50);
        $image = Security::sanitize($input['image'] ?? '', 255);
        $shortDescription = Security::sanitize($input['shortDescription'] ?? '', 500);
        
        $fullDescription = json_encode($input['fullDescription'] ?? [], JSON_UNESCAPED_UNICODE);
        $features = json_encode($input['features'] ?? [], JSON_UNESCAPED_UNICODE);
        $targetAudience = json_encode($input['targetAudience'] ?? [], JSON_UNESCAPED_UNICODE);
        $legalSystems = json_encode($input['legalSystems'] ?? [], JSON_UNESCAPED_UNICODE);
        $faq = json_encode($input['faq'] ?? [], JSON_UNESCAPED_UNICODE);

        if (empty($id) || empty($slug) || empty($title)) {
            Security::jsonResponse(false, 'الرجاء ملء الحقول الإجبارية (المعرف، الرابط، العنوان)', 400);
        }

        try {
            $stmt = $db->prepare("INSERT INTO services (id, slug, title, seoTitle, seoDescription, icon, image, shortDescription, fullDescription, features, targetAudience, legalSystems, faq) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([$id, $slug, $title, $seoTitle, $seoDescription, $icon, $image, $shortDescription, $fullDescription, $features, $targetAudience, $legalSystems, $faq]);
            Security::jsonResponse(true, 'تم إضافة الخدمة بنجاح', 201);
        } catch (PDOException $e) {
            if ($e->getCode() == 23000) {
                Security::jsonResponse(false, 'المعرف أو الرابط (slug) مستخدم بالفعل لخدمة أخرى', 400);
            }
            Security::jsonResponse(false, 'حدث خطأ أثناء حفظ الخدمة: ' . $e->getMessage(), 500);
        }
        break;

    case 'PUT':
        requireAuth();
        
        $id = Security::sanitize($input['id'] ?? '', 50);
        $slug = Security::sanitize($input['slug'] ?? '', 100);
        $title = Security::sanitize($input['title'] ?? '', 200);
        $seoTitle = Security::sanitize($input['seoTitle'] ?? '', 200);
        $seoDescription = Security::sanitize($input['seoDescription'] ?? '', 500);
        $icon = Security::sanitize($input['icon'] ?? '', 50);
        $image = Security::sanitize($input['image'] ?? '', 255);
        $shortDescription = Security::sanitize($input['shortDescription'] ?? '', 500);
        
        $fullDescription = json_encode($input['fullDescription'] ?? [], JSON_UNESCAPED_UNICODE);
        $features = json_encode($input['features'] ?? [], JSON_UNESCAPED_UNICODE);
        $targetAudience = json_encode($input['targetAudience'] ?? [], JSON_UNESCAPED_UNICODE);
        $legalSystems = json_encode($input['legalSystems'] ?? [], JSON_UNESCAPED_UNICODE);
        $faq = json_encode($input['faq'] ?? [], JSON_UNESCAPED_UNICODE);

        if (empty($id) || empty($slug) || empty($title)) {
            Security::jsonResponse(false, 'الرجاء ملء الحقول الإجبارية (المعرف، الرابط، العنوان)', 400);
        }

        try {
            $stmt = $db->prepare("UPDATE services SET slug = ?, title = ?, seoTitle = ?, seoDescription = ?, icon = ?, image = ?, shortDescription = ?, fullDescription = ?, features = ?, targetAudience = ?, legalSystems = ?, faq = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?");
            $stmt->execute([$slug, $title, $seoTitle, $seoDescription, $icon, $image, $shortDescription, $fullDescription, $features, $targetAudience, $legalSystems, $faq, $id]);
            Security::jsonResponse(true, 'تم تحديث الخدمة بنجاح');
        } catch (PDOException $e) {
            Security::jsonResponse(false, 'حدث خطأ أثناء تحديث الخدمة: ' . $e->getMessage(), 500);
        }
        break;

    case 'DELETE':
        requireAuth();
        
        $id = Security::sanitize($_GET['id'] ?? '', 50);
        if (empty($id)) {
            Security::jsonResponse(false, 'معرف الخدمة مطلوب لحذفها', 400);
        }

        $stmt = $db->prepare("DELETE FROM services WHERE id = ?");
        $stmt->execute([$id]);
        if ($stmt->rowCount() > 0) {
            Security::jsonResponse(true, 'تم حذف الخدمة بنجاح');
        } else {
            Security::jsonResponse(false, 'الخدمة غير موجودة أو تم حذفها مسبقاً', 404);
        }
        break;

    default:
        Security::jsonResponse(false, 'طريقة الطلب غير مسموح بها', 405);
}

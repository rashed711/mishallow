<?php
/**
 * =====================================================
 * شركة مشعل بادغيش - API: إدارة المقالات والأخبار
 * Articles API - articles.php
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
        $slug = Security::sanitize($_GET['slug'] ?? '', 100);
        
        // جلب مقال محدد بالـ slug أو زيادة عدد المشاهدات
        if ($slug) {
            $stmt = $db->prepare("SELECT * FROM articles WHERE slug = ?");
            $stmt->execute([$slug]);
            $article = $stmt->fetch();
            
            if ($article) {
                // زيادة عدد المشاهدات بشكل تلقائي وغير مباشر
                $db->prepare("UPDATE articles SET views = views + 1 WHERE id = ?")->execute([$article['id']]);
                $article['views']++;
                
                $article['content'] = json_decode($article['content'], true);
                Security::jsonResponse(true, 'تم جلب المقال بنجاح', 200, ['article' => $article]);
            } else {
                Security::jsonResponse(false, 'المقال غير موجود', 404);
            }
        } else {
            // جلب كل المقالات
            $articles = $db->query("SELECT * FROM articles ORDER BY rawDate DESC")->fetchAll();
            foreach ($articles as &$article) {
                $article['content'] = json_decode($article['content'], true);
            }
            Security::jsonResponse(true, 'تم جلب المقالات بنجاح', 200, ['articles' => $articles]);
        }
        break;

    case 'POST':
        requireAuth();
        
        $slug = Security::sanitize($input['slug'] ?? '', 100);
        $title = Security::sanitize($input['title'] ?? '', 200);
        $excerpt = Security::sanitize($input['excerpt'] ?? '', 300);
        $category = Security::sanitize($input['category'] ?? 'ثقافة قانونية', 50);
        $image = Security::sanitize($input['image'] ?? '', 255);
        $readTime = Security::sanitize($input['readTime'] ?? '5 دقائق', 30);
        
        $content = json_encode($input['content'] ?? [], JSON_UNESCAPED_UNICODE);
        
        $rawDate = date('Y-m-d');
        // تحويل التاريخ لصيغة عربية مقروءة مثل (17 يونيو 2026)
        $months = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
        $dateStr = date('d') . ' ' . $months[date('n') - 1] . ' ' . date('Y');

        if (empty($slug) || empty($title) || empty($content)) {
            Security::jsonResponse(false, 'الرجاء ملء الحقول الإجبارية (الرابط، العنوان، المحتوى)', 400);
        }

        try {
            $stmt = $db->prepare("INSERT INTO articles (slug, title, excerpt, content, category, date, rawDate, image, readTime, views) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0)");
            $stmt->execute([$slug, $title, $excerpt, $content, $category, $dateStr, $rawDate, $image, $readTime]);
            Security::jsonResponse(true, 'تم نشر المقال بنجاح', 201);
        } catch (PDOException $e) {
            if ($e->getCode() == 23000) {
                Security::jsonResponse(false, 'الرابط (slug) مستخدم بالفعل لمقال آخر', 400);
            }
            Security::jsonResponse(false, 'حدث خطأ أثناء نشر المقال: ' . $e->getMessage(), 500);
        }
        break;

    case 'PUT':
        requireAuth();
        
        $id = intval($input['id'] ?? 0);
        $slug = Security::sanitize($input['slug'] ?? '', 100);
        $title = Security::sanitize($input['title'] ?? '', 200);
        $excerpt = Security::sanitize($input['excerpt'] ?? '', 300);
        $category = Security::sanitize($input['category'] ?? '', 50);
        $image = Security::sanitize($input['image'] ?? '', 255);
        $readTime = Security::sanitize($input['readTime'] ?? '', 30);
        
        $content = json_encode($input['content'] ?? [], JSON_UNESCAPED_UNICODE);

        if (empty($id) || empty($slug) || empty($title)) {
            Security::jsonResponse(false, 'بيانات التعديل غير مكتملة', 400);
        }

        try {
            // جلب الصورة القديمة لمقارنتها وحذفها إذا تم استبدالها
            $oldStmt = $db->prepare("SELECT image FROM articles WHERE id = ?");
            $oldStmt->execute([$id]);
            $oldArticle = $oldStmt->fetch();
            if ($oldArticle && !empty($oldArticle['image']) && $oldArticle['image'] !== $image) {
                Security::deleteImage($oldArticle['image']);
            }

            $stmt = $db->prepare("UPDATE articles SET slug = ?, title = ?, excerpt = ?, content = ?, category = ?, image = ?, readTime = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?");
            $stmt->execute([$slug, $title, $excerpt, $content, $category, $image, $readTime, $id]);
            Security::jsonResponse(true, 'تم تحديث المقال بنجاح');
        } catch (PDOException $e) {
            Security::jsonResponse(false, 'حدث خطأ أثناء تحديث المقال: ' . $e->getMessage(), 500);
        }
        break;

    case 'DELETE':
        requireAuth();
        
        $id = intval($_GET['id'] ?? 0);
        if (empty($id)) {
            Security::jsonResponse(false, 'معرف المقال مطلوب لحذفه', 400);
        }

        // جلب الصورة القديمة لحذفها من المجلد
        $oldStmt = $db->prepare("SELECT image FROM articles WHERE id = ?");
        $oldStmt->execute([$id]);
        $oldArticle = $oldStmt->fetch();
        if ($oldArticle && !empty($oldArticle['image'])) {
            Security::deleteImage($oldArticle['image']);
        }

        $stmt = $db->prepare("DELETE FROM articles WHERE id = ?");
        $stmt->execute([$id]);
        if ($stmt->rowCount() > 0) {
            Security::jsonResponse(true, 'تم حذف المقال بنجاح');
        } else {
            Security::jsonResponse(false, 'المقال غير موجود أو تم حذفه مسبقاً', 404);
        }
        break;

    default:
        Security::jsonResponse(false, 'طريقة الطلب غير مسموح بها', 405);
}

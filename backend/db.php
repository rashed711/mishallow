<?php
/**
 * =====================================================
 * شركة مشعل بادغيش - إدارة قاعدة البيانات SQLite
 * Database Manager - SQLite Connection and Initialization
 * =====================================================
 */

defined('SECURE_BACKEND') or define('SECURE_BACKEND', true);
require_once __DIR__ . '/config.php';

class DB
{
    private static ?PDO $pdo = null;

    /**
     * الحصول على اتصال قاعدة البيانات
     */
    public static function connect(): PDO
    {
        if (self::$pdo !== null) {
            return self::$pdo;
        }

        $dbDir = __DIR__ . '/database';
        if (!is_dir($dbDir)) {
            mkdir($dbDir, 0700, true);
        }

        $dbFile = $dbDir . '/mishal.db';
        $dbExists = file_exists($dbFile);

        try {
            self::$pdo = new PDO('sqlite:' . $dbFile);
            self::$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            self::$pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

            // تفعيل حماية البيانات الأجنبية للـ SQLite
            self::$pdo->exec('PRAGMA foreign_keys = ON;');

            self::initializeDatabase();
        } catch (PDOException $e) {
            error_log('Database Connection Error: ' . $e->getMessage());
            die(json_encode(['success' => false, 'message' => 'Database Connection Failed: ' . $e->getMessage()]));
        }

        return self::$pdo;
    }

    /**
     * إنشاء الجداول الأساسية
     */
    private static function initializeDatabase(): void
    {
        $db = self::$pdo;

        // 1. جدول المستخدمين (المدراء)
        $db->exec("CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            role TEXT DEFAULT 'admin',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )");

        // 2. جدول الخدمات
        $db->exec("CREATE TABLE IF NOT EXISTS services (
            id TEXT PRIMARY KEY,
            slug TEXT UNIQUE NOT NULL,
            title TEXT NOT NULL,
            seoTitle TEXT,
            seoDescription TEXT,
            icon TEXT,
            image TEXT,
            shortDescription TEXT,
            fullDescription TEXT, -- JSON Array
            features TEXT,        -- JSON Array
            targetAudience TEXT,  -- JSON Array
            legalSystems TEXT,    -- JSON Array of {name, link}
            faq TEXT,             -- JSON Array of {question, answer}
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )");

        // 3. جدول المقالات
        $db->exec("CREATE TABLE IF NOT EXISTS articles (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            slug TEXT UNIQUE NOT NULL,
            title TEXT NOT NULL,
            excerpt TEXT,
            content TEXT,         -- JSON Array of paragraphs
            category TEXT,
            date TEXT,
            rawDate TEXT,
            image TEXT,
            readTime TEXT,
            views INTEGER DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )");

        // 4. جدول تصنيفات الخدمات السريعة
        $db->exec("CREATE TABLE IF NOT EXISTS quick_service_categories (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL
        )");

        // 5. جدول الخدمات السريعة
        $db->exec("CREATE TABLE IF NOT EXISTS quick_services (
            id TEXT PRIMARY KEY,
            category_id TEXT,
            slug TEXT UNIQUE NOT NULL,
            title TEXT NOT NULL,
            description TEXT,
            features TEXT,        -- JSON Array
            priceRange TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (category_id) REFERENCES quick_service_categories(id) ON DELETE CASCADE
        )");

        // إضافة مستخدم مسؤول افتراضي (admin / admin123)
        $defaultUser = 'admin';
        $defaultPass = password_hash('admin123', PASSWORD_DEFAULT);
        $stmt = $db->prepare("INSERT OR IGNORE INTO users (username, password_hash) VALUES (?, ?)");
        $stmt->execute([$defaultUser, $defaultPass]);

        // تلقيم تصنيفات الخدمات السريعة
        $catCount = $db->query("SELECT COUNT(*) FROM quick_service_categories")->fetchColumn();
        if ($catCount == 0) {
            $categories = [
                ['id' => 'consultations', 'name' => 'الاستشارات القانونية المتخصصة'],
                ['id' => 'drafting', 'name' => 'صياغة ومراجعة العقود واللوائح'],
                ['id' => 'litigation', 'name' => 'التمثيل القضائي ومتابعة التنفيذ']
            ];
            $cStmt = $db->prepare("INSERT INTO quick_service_categories (id, name) VALUES (?, ?)");
            foreach ($categories as $cat) {
                $cStmt->execute([$cat['id'], $cat['name']]);
            }

            $qServices = [
                // الاستشارات
                [
                    'id' => 'c1', 'category_id' => 'consultations', 'slug' => 'commercial-consultation',
                    'title' => 'استشارة قانونية في نظام الشركات والمعاملات المدنية',
                    'description' => "نعم، تجاهل نظام الشركات الجديد يهدد أصولك بمخاطر التجميد بوزارة العدل. لكن مواءمة أعمالك بالامتثال النظامي تضمن حماية منشأتك بمنصة ناجز والمركز السعودي.\n\nالقرار الآن يحمي نمو استثمارك ويؤمن حقوقك النظامية.\n\nاحجز استشارتك الآن لتأمين موقفك القانوني.",
                    'features' => json_encode(['حلل موقفك بوزارة العدل لتأمين نفاذ حقوقك بمنصة ناجز والأنظمة.', 'احمِ ميزانيتك بوزارة التجارة عبر تقييم مخاطر الامتثال في المركز السعودي.', 'ثبت نجاحك بمنصة ناجز بتوصيات تضمن توافقك مع أنظمة وزارة العدل.', 'أمن استثماراتك بوزارة العدل بتوجيه يستبق المخاطر بمنصة ناجز والأنظمة.'], JSON_UNESCAPED_UNICODE),
                    'priceRange' => '200 - 500 ريال'
                ],
                [
                    'id' => 'c2', 'category_id' => 'consultations', 'slug' => 'labor-consultation',
                    'title' => 'استشارة في منازعات العمل والامتثال العمالي',
                    'description' => "نعم، فوات مواعيد وزارة الموارد البشرية يهدد حقوقك المالية بالسقوط النظامي. لكن توثيق مطالبتك بمنصة قوى يمنحك الفرصة لاستعادة مستحقاتك بوزارة العدل ومنصة ناجز.\n\nالتحرك الآن يضمن استرداد مستحقاتك وحماية حقوقك الوظيفية.\n\nاطلب مراجعة قانونية الآن لتأمين حقك العمالي.",
                    'features' => json_encode(['راجع عقدك بوزارة الموارد البشرية لضمان المستحقات بمنصة قوى.', 'استخلص مكافأة الخدمة بوزارة العدل بإجراءات تضمن حقوقك بمنصة ناجز.', 'قلل مخاطر الامتثال بوزارة الموارد البشرية بضبط السياسات في المركز السعودي.', 'احسم النزاع بوزارة الموارد البشرية لاستعادة الحقوق بوزارة العدل.'], JSON_UNESCAPED_UNICODE),
                    'priceRange' => '0 - 500 ريال'
                ],
                [
                    'id' => 'c3', 'category_id' => 'consultations', 'slug' => 'family-consultation',
                    'title' => 'استشارة في نظام الأحوال الشخصية والتركات',
                    'description' => "نعم، غياب التوثيق بوزارة العدل يهدد الأنصبة الشرعية بالمخاطر. لكن نظام الأحوال الشخصية الجديد يؤمن حقوق ورثتك بوزارة العدل ومنصة ناجز وتراضي.\n\nالتوثيق النظامي هو مسارك الآمن لحماية عائلتك وضمان حقوقها.\n\nابدأ بتقييم موقفك الآن لتأمين حقوق عائلتك.",
                    'features' => json_encode(['وثق حقوقك بوزارة العدل لمنع النزاعات بمنصة ناجز وتراضي والأنظمة.', 'أمن تصفية التركة بإجراءات تضمن نفاذ الأنصبة بوزارة العدل والأنظمة.', 'احمِ مستقبل الأبناء بتوثيق النفقة والحضانة بوزارة العدل ومنصة ناجز.', 'ثبت الملكية بوزارة العدل بتوثيق القسمة بمنصة تراضي وناجز والأنظمة.'], JSON_UNESCAPED_UNICODE),
                    'priceRange' => '300 - 600 ريال'
                ],
                // صياغة العقود
                [
                    'id' => 'd1', 'category_id' => 'drafting', 'slug' => 'contract-drafting',
                    'title' => 'صياغة العقود التجارية والمدنية والوكالات',
                    'description' => "نعم، التوقيع على عقد معيب بوزارة العدل يهدد سيولتك بمخاطر النزاعات. لكن الصياغة المتوافقة مع نظام المعاملات المدنية تضمن نفاذ حقوقك بمنصة ناجز.\n\nالصياغة المحكمة تدرأ عنك مخاطر البطلان وتؤمن التزاماتك.\n\nاطلب صياغة عقدك الآن لتأمين تعاملاتك.",
                    'features' => json_encode(['أمن تعاملاتك بصياغة تلتزم بنظام المعاملات المدنية بوزارة العدل وناجز.', 'حصن حقوقك ببنود وقائية تمنع الثغرات بمنصة ناجز والمركز السعودي.', 'ثبت نفاذ الالتزامات بوزارة العدل عبر صياغة احترافية تضمن حقوقك والأنظمة.', 'احمِ استثماراتك بوزارة التجارة بصياغة وكالات تضمن سيطرتك بوزارة العدل.'], JSON_UNESCAPED_UNICODE),
                    'priceRange' => '500 - 1500 ريال'
                ],
                [
                    'id' => 'd2', 'category_id' => 'drafting', 'slug' => 'internal-regulations',
                    'title' => 'صياغة لوائح العمل وسياسات الامتثال',
                    'description' => "نعم، غياب اللوائح بوزارة الموارد البشرية يعرض منشأتك لمخاطر الغرامات. لكن اعتماد السياسات بمنصة قوى يمنحك الحماية اللازمة بوزارة العدل وناجز.\n\nالضبط النظامي يغلق ثغرات النزاعات ويؤمن استقرار منشأتك.\n\nابدأ تأمين حقوقك الآن بضبط لوائح منشأتك.",
                    'features' => json_encode(['أمن منشأتك بوزارة الموارد البشرية بصياغة لوائح تمنع الغرامات بمنصة قوى.', 'حصن أعمالك بوزارة العدل بسياسات امتثال تضمن استقرارك بمنصة ناجز.', 'ثبت حقوق المنشأة بوزارة الموارد البشرية بضبط علاقات العمل بمنصة قوى.', 'احمِ ميزانيتك بوزارة الموارد البشرية بامتثال يدرأ العقوبات بوزارة العدل.'], JSON_UNESCAPED_UNICODE),
                    'priceRange' => '1000 - 3000 ريال'
                ],
                // التمثيل القضائي
                [
                    'id' => 'l1', 'category_id' => 'litigation', 'slug' => 'lawsuit-filing',
                    'title' => 'قيد الدعاوى القضائية والاعتراضات والاستئناف',
                    'description' => "نعم، انتهاء مواعيد التقادم بوزارة العدل يهدد حقك في المطالبة بالسقوط. لكن قيد الدعوى الاحترافي يضمن استرداد حقوقك بمنصة ناجز والأنظمة.\n\nالتحرك السريع يحصن حقك في المرافعة ويؤمن مطالبتك بوزارة العدل.\n\nابدأ بتقييم موقفك الآن لقيد دعواك باحترافية.",
                    'features' => json_encode(['أمن قبول دعواك بوزارة العدل بقيد يلتزم بالمدد النظامية بمنصة ناجز.', 'حصن حقك بالاعتراض بوزارة العدل بمذكرات تضمن نفاذ طلبك بمنصة ناجز.', 'ثبت براءتك بوزارة العدل بتمثيل يستبق الإدانات بمنصة النيابة وناجز والأنظمة.', 'احمِ حقوقك بوزارة العدل بصياغة مذكرات ترافع تنهي المماطلة بمنصة ناجز.'], JSON_UNESCAPED_UNICODE),
                    'priceRange' => '1500 - 5000 ريال'
                ],
                [
                    'id' => 'l2', 'category_id' => 'litigation', 'slug' => 'execution-requests',
                    'title' => 'قيد طلبات التنفيذ ومتابعة الحجز الجبري',
                    'description' => "نعم، تأخير التنفيذ بوزارة العدل يهدد سيولتك بمخاطر تهريب الأصول. لكن تفعيل الحجز الجبري يضمن استرداد أموالك بمنصة ناجز والأنظمة.\n\nتفعيل قرار 46 ينهي مماطلة المدين ويؤمن تحصيل مبالغك بوزارة العدل.\n\nاحجز استشارتك الآن لتفعيل سلطة التنفيذ.",
                    'features' => json_encode(['استرد أموالك بوزارة العدل بتفعيل الحجز الجبري بمنصة ناجز والأنظمة.', 'حصن سيولتك بوزارة العدل بتتبع أموال المدينين بمنصة ناجز والمركز السعودي.', 'ثبت حقك بوزارة العدل بقرارات تنفيذ تنهي المماطلة بمنصة ناجز والأنظمة.', 'احمِ مبالغك بوزارة العدل بمتابعة جادة تضمن التحصيل المباشر بمنصة ناجز.'], JSON_UNESCAPED_UNICODE),
                    'priceRange' => '1000 - 2500 ريال'
                ]
            ];

            $qsStmt = $db->prepare("INSERT INTO quick_services (id, category_id, slug, title, description, features, priceRange) VALUES (?, ?, ?, ?, ?, ?, ?)");
            foreach ($qServices as $qs) {
                $qsStmt->execute([$qs['id'], $qs['category_id'], $qs['slug'], $qs['title'], $qs['description'], $qs['features'], $qs['priceRange']]);
            }
        }
    }
}

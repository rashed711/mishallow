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

            if (!$dbExists || filesize($dbFile) === 0) {
                self::initializeDatabase();
            }
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

        // إضافة مستخدم مسؤول افتراضي (admin / admin123)
        $defaultUser = 'admin';
        $defaultPass = password_hash('admin123', PASSWORD_DEFAULT);
        $stmt = $db->prepare("INSERT OR IGNORE INTO users (username, password_hash) VALUES (?, ?)");
        $stmt->execute([$defaultUser, $defaultPass]);
    }
}

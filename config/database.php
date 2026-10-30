<?php
// config/database.php
require_once __DIR__ . '/../vendor/autoload.php';

use Dotenv\Dotenv;

// Load variabel lingkungan dari .env
$dotenv = Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->safeLoad();

class Database {
    private static $instance = null;
    private $pdo;

    private function __construct() {
        $host = $_ENV['DB_HOST'] ?? '127.0.0.1';
        $db   = $_ENV['DB_NAME'] ?? 'absensiqr_db';
        $user = $_ENV['DB_USER'] ?? 'root';
        $pass = $_ENV['DB_PASS'] ?? '';
        $port = $_ENV['DB_PORT'] ?? '3306';

        $dsn = "mysql:host=$host;dbname=$db;port=$port;charset=utf8mb4";
        $options = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ];

        try {
            $this->pdo = new PDO($dsn, $user, $pass, $options);
        } catch (PDOException $e) {
            die(json_encode(["error" => "Koneksi database gagal: " . $e->getMessage()]));
        }
    }

    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new Database();
        }
        return self::$instance->pdo;
    }
}
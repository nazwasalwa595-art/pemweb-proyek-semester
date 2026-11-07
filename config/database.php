<?php
// config/database.php

function db(): PDO {
    static $pdo = null;

    if ($pdo === null) {
        $host = '127.0.0.1';
        $dbname = 'absensiqr_db';
        $username = 'root';
        $password = '';

        try {
            $pdo = new PDO("mysql:host={$host};dbname={$dbname};charset=utf8mb4", $username, $password, [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false
            ]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'Koneksi Database Gagal: ' . $e->getMessage()]);
            exit;
        }
    }

    return $pdo;
}
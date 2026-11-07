<?php
// models/User.php
require_once __DIR__ . '/../config/database.php';

class User {
    private PDO $db;

    public function __construct() {
        $this->db = db();
    }

    /**
     * Registrasi Akun Baru ke Database MySQL
     */
    public function register(string $username, string $nama, string $email, string $password, string $peran): bool {
        // Enkripsi / Hash Password secara aman
        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

        $sql = "INSERT INTO users (username, nama, email, password, peran) VALUES (:username, :nama, :email, :password, :peran)";
        $stmt = $this->db->prepare($sql);

        return $stmt->execute([
            ':username' => $username,
            ':nama'     => $nama,
            ':email'    => $email,
            ':password' => $hashedPassword,
            ':peran'    => $peran
        ]);
    }

    /**
     * Cari User dari Database berdasarkan Username (NIP/NIM)
     */
    public function findByUsername(string $username): array|false {
        $sql = "SELECT * FROM users WHERE username = :username LIMIT 1";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([':username' => $username]);
        return $stmt->fetch();
    }
}
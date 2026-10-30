<?php
// models/User.php
require_once __DIR__ . '/../config/database.php';

class User {
    /**
     * @var PDO
     */
    private PDO $db;

    public function __construct() {
        $this->db = Database::getInstance();
    }

    /**
     * Registrasi Pengguna Baru (Prepared Statement)
     */
    public function register(
        string $username, 
        string $nama, 
        string $email, 
        string $password, 
        string $peran
    ): bool {
        $sql = "INSERT INTO users (username, nama, email, password, peran) 
                VALUES (:username, :nama, :email, :password, :peran)";
        $stmt = $this->db->prepare($sql);
        
        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

        return $stmt->execute([
            ':username' => $username,
            ':nama'     => $nama,
            ':email'    => $email,
            ':password' => $hashedPassword,
            ':peran'    => $peran
        ]);
    }

    /**
     * Cari User Berdasarkan Username / NIM / NIP (Prepared Statement)
     */
    public function findByUsername(string $username): array|false {
        $sql = "SELECT * FROM users WHERE username = :username LIMIT 1";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([':username' => $username]);
        return $stmt->fetch();
    }
}
<?php
// api/test_db.php - File Pengujian Eksekusi Database
header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/../models/User.php';

try {
    $userModel = new User();
    
    // 1. Eksekusi Registrasi Data Dummy (Prepared Statement INSERT)
    $usernameDummy = "2440304" . rand(100, 999); // Username angka acak
    $registerSuccess = $userModel->register(
        $usernameDummy, 
        "Mahasiswa Uji Coba", 
        "uji@domain.com", 
        "password123", 
        "Siswa/Mahasiswa"
    );

    // 2. Eksekusi Pencarian Data (Prepared Statement SELECT)
    $userData = $userModel->findByUsername($usernameDummy);

    echo json_encode([
        "status" => "success",
        "message" => "Koneksi PDO & Prepared Statement Berhasil Dieksekusi!",
        "data_tersimpan" => $userData
    ], JSON_PRETTY_PRINT);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Gagal mengeksekusi query: " . $e->getMessage()
    ], JSON_PRETTY_PRINT);
}
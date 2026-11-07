<?php
declare(strict_types=1);

require_once dirname(__DIR__) . '/config/database.php';
require_once dirname(__DIR__) . '/models/User.php';

header('Content-Type: application/json; charset=utf-8');

try {
    $userModel = new User();
    $action = $_GET['action'] ?? '';
    $input = json_decode(file_get_contents('php://input'), true) ?? [];

    // ==========================================
    // ACTION 1: REGISTER AKUN BARU KE DB
    // ==========================================
    if ($action === 'register') {
        $username = trim((string)($input['username'] ?? ''));
        $nama     = trim((string)($input['nama'] ?? ''));
        $email    = trim((string)($input['email'] ?? ''));
        $password = (string)($input['password'] ?? '');
        $peran    = trim((string)($input['peran'] ?? 'Siswa/Mahasiswa'));

        if ($username === '' || $nama === '' || $email === '' || $password === '') {
            http_response_code(422);
            echo json_encode(['success' => false, 'message' => 'Semua kolom pendaftaran wajib diisi'], JSON_UNESCAPED_UNICODE);
            exit;
        }

        // Cek duplikasi username
        if ($userModel->findByUsername($username)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Username (NIP/NIM) sudah terdaftar!'], JSON_UNESCAPED_UNICODE);
            exit;
        }

        // Simpan ke MySQL via PDO Prepared Statement
        $userModel->register($username, $nama, $email, $password, $peran);

        http_response_code(201);
        echo json_encode(['success' => true, 'message' => 'Pendaftaran akun berhasil! Silakan login.'], JSON_UNESCAPED_UNICODE);
        exit;
    }

    // ==========================================
    // ACTION 2: LOGIN VIA DATABASE
    // ==========================================
    if ($action === 'login') {
        $username = trim((string)($input['username'] ?? ''));
        $password = (string)($input['password'] ?? '');

        if ($username === '' || $password === '') {
            http_response_code(422);
            echo json_encode(['success' => false, 'message' => 'Username dan kata sandi wajib diisi'], JSON_UNESCAPED_UNICODE);
            exit;
        }

        // Cari user di database
        $user = $userModel->findByUsername($username);

        if (!$user) {
            http_response_code(404);
            echo json_encode(['success' => false, 'message' => 'Username (NIP/NIM) tidak ditemukan di database!'], JSON_UNESCAPED_UNICODE);
            exit;
        }

        // Verifikasi Hashed Password
        if (!password_verify($password, $user['password'])) {
            http_response_code(401);
            echo json_encode(['success' => false, 'message' => 'Kata sandi salah!'], JSON_UNESCAPED_UNICODE);
            exit;
        }

        // Sukses Login: Tentukan Peran
        $roleStr = strtolower($user['peran']);
        $role = (str_contains($roleStr, 'guru') || str_contains($roleStr, 'dosen')) ? 'guru' : 'siswa';

        http_response_code(200);
        echo json_encode([
            'success' => true,
            'message' => 'Login berhasil',
            'data' => [
                'username' => $user['username'],
                'nama'     => $user['nama'],
                'peran'    => $user['peran'],
                'role'     => $role
            ]
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Aksi autentikasi tidak valid'], JSON_UNESCAPED_UNICODE);

} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Terjadi kesalahan server saat autentikasi'], JSON_UNESCAPED_UNICODE);
}
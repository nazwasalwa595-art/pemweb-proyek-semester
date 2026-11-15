<?php
declare(strict_types=1);

require_once dirname(__DIR__) . '/config/database.php';
require_once dirname(__DIR__) . '/models/User.php';
require_once dirname(__DIR__) . '/helpers/auth.php';

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
        $rawPeran = trim((string)($input['peran'] ?? 'Siswa/Mahasiswa'));

        if ($username === '' || $nama === '' || $email === '' || $password === '') {
            http_response_code(422);
            echo json_encode(['success' => false, 'message' => 'Semua kolom pendaftaran wajib diisi'], JSON_UNESCAPED_UNICODE);
            exit;
        }

        $roleLower = strtolower($rawPeran);
        $peran = (str_contains($roleLower, 'guru') || str_contains($roleLower, 'dosen')) ? 'Guru/Dosen' : 'Siswa/Mahasiswa';

        if ($userModel->findByUsername($username)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Username (NIP/NIM) sudah terdaftar!'], JSON_UNESCAPED_UNICODE);
            exit;
        }

        $userModel->register($username, $nama, $email, $password, $peran);

        http_response_code(201);
        echo json_encode(['success' => true, 'message' => 'Pendaftaran akun berhasil! Silakan login.'], JSON_UNESCAPED_UNICODE);
        exit;
    }

    // ==========================================
    // ACTION 2: LOGIN VIA DATABASE + SECURE SESSION
    // ==========================================
    if ($action === 'login') {
        $username = trim((string)($input['username'] ?? ''));
        $password = (string)($input['password'] ?? '');

        if ($username === '' || $password === '') {
            http_response_code(422);
            echo json_encode(['success' => false, 'message' => 'Username dan kata sandi wajib diisi'], JSON_UNESCAPED_UNICODE);
            exit;
        }

        $user = $userModel->findByUsername($username);

        if (!$user || !password_verify($password, $user['password'])) {
            http_response_code(401);
            echo json_encode(['success' => false, 'message' => 'Username atau kata sandi salah!'], JSON_UNESCAPED_UNICODE);
            exit;
        }

        $roleStr = strtolower($user['peran']);
        $role = (str_contains($roleStr, 'guru') || str_contains($roleStr, 'dosen')) ? 'guru' : 'siswa';

        // Bentuk Session Aman di Server
        startSecureSession();
        session_regenerate_id(true);
        $_SESSION['user_id']  = (int)$user['id'];
        $_SESSION['username'] = $user['username'];
        $_SESSION['role']     = $role;

        http_response_code(200);
        echo json_encode([
            'success' => true,
            'message' => 'Login berhasil',
            'data' => [
                'id'       => $user['id'],
                'username' => $user['username'],
                'nama'     => $user['nama'],
                'peran'    => $user['peran'],
                'role'     => $role
            ]
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    // ==========================================
    // ACTION 3: LOGOUT VIA POST (HAPUS SESSION & COOKIE)
    // ==========================================
    if ($action === 'logout') {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            http_response_code(405);
            echo json_encode(['success' => false, 'message' => 'Method logout harus POST'], JSON_UNESCAPED_UNICODE);
            exit;
        }

        startSecureSession();
        $_SESSION = [];

        if (ini_get('session.use_cookies')) {
            $params = session_get_cookie_params();
            setcookie(session_name(), '', [
                'expires'  => time() - 42000,
                'path'     => $params['path'],
                'domain'   => $params['domain'] ?? '',
                'secure'   => $params['secure'],
                'httponly' => $params['httponly'],
                'samesite' => $params['samesite'] ?? 'Lax',
            ]);
        }

        session_destroy();

        http_response_code(200);
        echo json_encode(['success' => true, 'message' => 'Logout berhasil'], JSON_UNESCAPED_UNICODE);
        exit;
    }

    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Aksi autentikasi tidak valid'], JSON_UNESCAPED_UNICODE);

} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Terjadi kesalahan server saat autentikasi'], JSON_UNESCAPED_UNICODE);
}
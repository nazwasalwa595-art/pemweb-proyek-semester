<?php
declare(strict_types=1);

function startSecureSession(): void {
    if (session_status() === PHP_SESSION_NONE) {
        $isHttps = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off');
        session_set_cookie_params([
            'lifetime' => 0,
            'path'     => '/',
            'domain'   => '',
            'secure'   => $isHttps,
            'httponly' => true,
            'samesite' => 'Lax',
        ]);
        session_start();
    }
}

function requireLogin(): void {
    startSecureSession();
    if (empty($_SESSION['user_id'])) {
        http_response_code(401);
        echo json_encode([
            'success' => false,
            'message' => 'Unauthorized: Silakan login terlebih dahulu'
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }
}

function requireRole(array $allowedRoles): void {
    requireLogin();
    $userRole = $_SESSION['role'] ?? '';
    if (!in_array($userRole, $allowedRoles, true)) {
        http_response_code(403);
        echo json_encode([
            'success' => false,
            'message' => 'Forbidden: Akses ditolak, hanya Guru/Dosen yang diizinkan'
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }
}
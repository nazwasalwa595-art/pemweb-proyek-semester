<?php
declare(strict_types=1);

// Middleware Header JSON & CORS
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$jsonFile = __DIR__ . '/../data/users.json';

// 1. GET Method - Mengambil Daftar Saran/Masukan AbsensiQR
if ($method === 'GET') {
    $data = [];
    if (file_exists($jsonFile)) {
        $fileContent = file_get_contents($jsonFile);
        $data = json_decode($fileContent, true) ?? [];
    }

    http_response_code(200); // 200 OK
    echo json_encode([
        'success' => true,
        'message' => 'Data saran AbsensiQR berhasil dimuat',
        'total' => count($data),
        'data' => $data
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// 2. POST Method - Menerima & Memvalidasi Saran Baru
if ($method === 'POST') {
    try {
        $payload = json_decode(
            file_get_contents('php://input'),
            true,
            512,
            JSON_THROW_ON_ERROR
        );
    } catch (JsonException $e) {
        // Status 400 Bad Request (Format JSON Rusak/Invalid)
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'error' => 'Format payload JSON tidak valid'
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    if (!is_array($payload)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'error' => 'Body request JSON harus berupa object'
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    // Normalisasi Input
    $nama  = trim((string)($payload['nama'] ?? ''));
    $email = trim((string)($payload['email'] ?? ''));
    $saran = trim((string)($payload['saran'] ?? ''));

    // Validasi Business Rules (Minimal karakter & format email)
    if (strlen($nama) < 3 || strlen($nama) > 100) {
        http_response_code(422); // 422 Unprocessable Content
        echo json_encode([
            'success' => false,
            'error' => 'Nama wajib diisi minimal 3 karakter dan maksimal 100 karakter'
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(422);
        echo json_encode([
            'success' => false,
            'error' => 'Format email tidak valid'
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    if (strlen($saran) < 10) {
        http_response_code(422);
        echo json_encode([
            'success' => false,
            'error' => 'Saran terlalu pendek, minimal tuliskan 10 karakter'
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    // Ambil Data Lama & Simpan Baru
    $currentData = [];
    if (file_exists($jsonFile)) {
        $currentData = json_decode(file_get_contents($jsonFile), true) ?? [];
    }

    $newItem = [
        'id' => count($currentData) > 0 ? end($currentData)['id'] + 1 : 1,
        'nama' => $nama,
        'email' => $email,
        'saran' => $saran,
        'created_at' => date('Y-m-d H:i:s')
    ];

    $currentData[] = $newItem;
    file_put_contents($jsonFile, json_encode($currentData, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

    // Response 201 Created
    http_response_code(201);
    echo json_encode([
        'success' => true,
        'message' => 'Saran Anda berhasil tersimpan di server AbsensiQR!',
        'data' => $newItem
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// Method Tidak Didukung (Contoh: PUT/DELETE)
header('Allow: GET, POST');
http_response_code(405); // 405 Method Not Allowed
echo json_encode([
    'success' => false,
    'error' => 'Method tidak diizinkan untuk endpoint saran'
], JSON_UNESCAPED_UNICODE);
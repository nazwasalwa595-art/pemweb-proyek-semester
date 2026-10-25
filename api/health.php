<?php
declare(strict_types=1);

// Middleware Header JSON Respons
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    header('Allow: GET');
    http_response_code(405); // 405 Method Not Allowed
    echo json_encode([
        'status' => 'error',
        'message' => 'Method tidak diizinkan'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

http_response_code(200); // 200 OK
echo json_encode([
    'status' => 'ok',
    'app' => 'AbsensiQR REST API Service',
    'version' => '1.0.0',
    'timestamp' => date(DATE_ATOM)
], JSON_UNESCAPED_UNICODE);
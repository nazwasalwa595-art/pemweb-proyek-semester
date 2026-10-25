<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

http_response_code(200);
echo json_encode([
    'app' => 'AbsensiQR Backend API',
    'status' => 'active',
    'endpoints' => [
        'health' => '/api/health.php',
        'saran'  => '/api/saran.php'
    ]
], JSON_UNESCAPED_UNICODE);
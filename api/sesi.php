<?php
declare(strict_types=1);

require_once dirname(__DIR__) . '/config/database.php';
require_once dirname(__DIR__) . '/helpers/auth.php';

header('Content-Type: application/json; charset=utf-8');

try {
    $method = $_SERVER['REQUEST_METHOD'];
    $id = isset($_GET['id']) ? filter_var($_GET['id'], FILTER_VALIDATE_INT) : null;

    // ==========================================
    // PROTEKSI SERVER-SIDE (TUGAS 12 - AUTHZ)
    // Hanya Guru/Dosen yang boleh Create/Update/Delete Sesi
    // ==========================================
    if (in_array($method, ['POST', 'PUT', 'DELETE'], true)) {
        requireRole(['guru']);
    }

    // ==========================================
    // 1. READ (GET ALL / SEARCH FITUR)
    // ==========================================
    if ($method === 'GET') {
        $search = isset($_GET['q']) ? trim((string)$_GET['q']) : '';

        if ($search !== '') {
            $sql = 'SELECT * FROM sesi_qr WHERE nama_sesi LIKE :s1 OR kode_qr LIKE :s2 OR kategori LIKE :s3 ORDER BY id DESC';
            $stmt = db()->prepare($sql);
            $param = "%{$search}%";
            $stmt->execute([
                's1' => $param,
                's2' => $param,
                's3' => $param
            ]);
        } else {
            $sql = 'SELECT * FROM sesi_qr ORDER BY id DESC';
            $stmt = db()->prepare($sql);
            $stmt->execute();
        }

        $data = $stmt->fetchAll();

        http_response_code(200);
        echo json_encode([
            'success' => true,
            'count'   => count($data),
            'data'    => $data
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    // ==========================================
    // 2. CREATE (POST - KHUSUS GURU)
    // ==========================================
    if ($method === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true) ?? [];
        $namaSesi = trim((string)($input['nama_sesi'] ?? ''));
        $kodeQr = trim((string)($input['kode_qr'] ?? ''));
        $kategori = trim((string)($input['kategori'] ?? ''));
        $berlakuSampai = trim((string)($input['berlaku_sampai'] ?? ''));

        if ($namaSesi === '' || $kodeQr === '' || $kategori === '' || $berlakuSampai === '') {
            http_response_code(422);
            echo json_encode(['success' => false, 'message' => 'Semua kolom wajib diisi!'], JSON_UNESCAPED_UNICODE);
            exit;
        }

        $stmt = db()->prepare('INSERT INTO sesi_qr (nama_sesi, kode_qr, kategori, berlaku_sampai) VALUES (:nama_sesi, :kode_qr, :kategori, :berlaku_sampai)');
        $stmt->execute([
            'nama_sesi' => $namaSesi,
            'kode_qr' => $kodeQr,
            'kategori' => $kategori,
            'berlaku_sampai' => $berlakuSampai
        ]);

        http_response_code(201);
        echo json_encode(['success' => true, 'message' => 'Sesi mata kuliah berhasil ditambahkan!'], JSON_UNESCAPED_UNICODE);
        exit;
    }

    // ==========================================
    // 3. UPDATE (PUT - KHUSUS GURU)
    // ==========================================
    if ($method === 'PUT') {
        if ($id === null || $id === false) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'ID Sesi wajib disertakan!'], JSON_UNESCAPED_UNICODE);
            exit;
        }

        $input = json_decode(file_get_contents('php://input'), true) ?? [];
        $namaSesi = trim((string)($input['nama_sesi'] ?? ''));
        $kodeQr = trim((string)($input['kode_qr'] ?? ''));
        $kategori = trim((string)($input['kategori'] ?? ''));
        $berlakuSampai = trim((string)($input['berlaku_sampai'] ?? ''));

        $stmt = db()->prepare('UPDATE sesi_qr SET nama_sesi = :nama_sesi, kode_qr = :kode_qr, kategori = :kategori, berlaku_sampai = :berlaku_sampai WHERE id = :id');
        $stmt->execute([
            'id' => $id,
            'nama_sesi' => $namaSesi,
            'kode_qr' => $kodeQr,
            'kategori' => $kategori,
            'berlaku_sampai' => $berlakuSampai
        ]);

        http_response_code(200);
        echo json_encode(['success' => true, 'message' => 'Sesi mata kuliah berhasil diperbarui!'], JSON_UNESCAPED_UNICODE);
        exit;
    }

    // ==========================================
    // 4. DELETE (DELETE - KHUSUS GURU)
    // ==========================================
    if ($method === 'DELETE') {
        if ($id === null || $id === false) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'ID Sesi wajib disertakan!'], JSON_UNESCAPED_UNICODE);
            exit;
        }

        $stmt = db()->prepare('DELETE FROM sesi_qr WHERE id = :id');
        $stmt->execute(['id' => $id]);

        http_response_code(200);
        echo json_encode(['success' => true, 'message' => 'Sesi mata kuliah berhasil dihapus!'], JSON_UNESCAPED_UNICODE);
        exit;
    }

    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method tidak diizinkan'], JSON_UNESCAPED_UNICODE);

} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Terjadi kesalahan internal pada server'], JSON_UNESCAPED_UNICODE);
}
# Tugas2
Nama Mahasiswa: Nazwa Salwa Adellia
NPM : 2440304021
Lokal : A1
Angkatan : 2024

# Pemrograman Web
Praktikum Pemrograman Web (OBE)

# AbsensiQR - Sistem Absensi Digital Modern

AbsensiQR adalah platform web sistem absensi modern yang aman, praktis, dan responsif. Platform ini dibangun menggunakan struktur semantik HTML5, CSS3 kustom, JavaScript ES6 Modular, serta terintegrasi dengan REST API.

---

## 📌 Identitas & Lingkungan Pengembangan

* **Mata Kuliah:** Pemrograman Web (OBE)
* **Studi Kasus Proyek:** Platform Absensi QR Code untuk Sekolah/Perguruan Tinggi
* **Teknologi:** HTML5 (Semantik), CSS3 (Flexbox & Grid), JavaScript ES6 (Fetch API, Async/Await, ES Modules)
* **Server Lokal:** Laragon (Apache & PHP)
* **URL Lokal:** `http://localhost/pemweb-proyek-semester/`
* **Repository GitHub:** `nazwasalwa595-art/pemweb-proyek-semester`

---

## Modul 09 - PHP 8.4 Backend & REST API (AbsensiQR)

### Spesifikasi Endpoint Backend
- **PHP Version:** 8.4 (Laragon 5)
- **Base URL:** `http://localhost/pemweb-proyek-semester/api/`

#### 1. GET /api/health.php
- **Fungsi:** Memeriksa kesiapan dan status kesehatan server API AbsensiQR
- **Response (200 OK):**
  ```json
  {
    "status": "ok",
    "app": "AbsensiQR REST API Service",
    "version": "1.0.0",
    "timestamp": "2026-10-24T20:00:00+08:00"
  }

## 💻 Cara Menjalankan Proyek di Server Lokal (Laragon)

1. Pastikan aplikasi **Laragon** sudah berjalan (`Start All`)[cite: 36, 41].
2. Letakkan folder proyek ini di dalam direktori `C:\laragon\www\pemweb-proyek-semester`[cite: 36, 41].
3. Buka peramban (*browser*) dan akses URL berikut[cite: 36, 41]:
   ```text
   http://localhost/pemweb-proyek-semester/
# Tugas12
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

## Tugas 12 - Authentication & Authorization (AbsensiQR)

### 1. Desain Level Akses & Role Matrix
Aplikasi **AbsensiQR** membagi hak akses menjadi dua level peran terautentikasi (**Siswa/Mahasiswa** dan **Guru/Dosen**) serta pengguna publik (**Anonymous**):

| Endpoint / Fitur | Method | Anonymous (Belum Login) | Siswa/Mahasiswa (`role: siswa`) | Guru/Dosen (`role: guru`) |
| :--- | :---: | :---: | :---: | :---: |
| `/api/auth.php?action=register` | `POST` | ✅ `201 Created` | ✅ `201 Created` | ✅ `201 Created` |
| `/api/auth.php?action=login` | `POST` | ✅ `200 OK` | ✅ `200 OK` | ✅ `200 OK` |
| `/api/auth.php?action=logout` | `POST` | ✅ `200 OK` | ✅ `200 OK` | ✅ `200 OK` |
| `/api/sesi.php` (Lihat & Cari Sesi) | `GET` | ✅ `200 OK` | ✅ `200 OK` | ✅ `200 OK` |
| `/api/sesi.php` (Tambah Sesi QR) | `POST` | ❌ `401 Unauthorized` | ❌ `403 Forbidden` | ✅ `201 Created` |
| `/api/sesi.php?id=...` (Edit Sesi QR) | `PUT` | ❌ `401 Unauthorized` | ❌ `403 Forbidden` | ✅ `200 OK` |
| `/api/sesi.php?id=...` (Hapus Sesi QR) | `DELETE` | ❌ `401 Unauthorized` | ❌ `403 Forbidden` | ✅ `200 OK` |

### 2. Keamanan Sesi & Password
- **Password Hashing:** Menggunakan `password_hash(..., PASSWORD_BCRYPT)` saat registrasi dan `password_verify()` saat login.
- **Session Security:** Menggunakan PHP Session dengan cookie `HttpOnly`, `SameSite=Lax`, serta `session_regenerate_id(true)` saat login untuk mencegah *Session Fixation*.
- **Server-Side Authorization:** Validasi peran ditegakkan melalui helper `requireRole(['guru'])` di backend sebelum operasi penulisan database dieksekusi.

## 💻 Cara Menjalankan Proyek di Server Lokal (Laragon)

1. Pastikan aplikasi **Laragon** sudah berjalan (`Start All`)[cite: 36, 41].
2. Letakkan folder proyek ini di dalam direktori `C:\laragon\www\pemweb-proyek-semester`[cite: 36, 41].
3. Buka peramban (*browser*) dan akses URL berikut[cite: 36, 41]:
   ```text
   http://localhost/pemweb-proyek-semester/
   
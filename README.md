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

## 🗄️ Tugas 10 - Basis Data, ERD, dan Prepared Statement (Proyek AbsensiQR)

### 1. ERD (Entity Relationship Diagram) Ringkas
Struktur basis data `absensiqr_db` terdiri dari 3 tabel relasional utama:

```mermaid
erDiagram
    USERS ||--o{ KELAS : mengajar
    USERS ||--o{ PRESENSI : melakukan
    KELAS ||--o{ PRESENSI : memiliki

    USERS {
        int id PK
        string username UK "NIM / NIP (Numeric Only)"
        string nama
        string email
        string password
        enum peran "Siswa/Mahasiswa, Guru/Dosen"
        timestamp created_at
    }
    KELAS {
        int id PK
        string kode_kelas UK
        string nama_kelas
        int dosen_id FK
    }
    PRESENSI {
        int id PK
        int user_id FK
        int kelas_id FK
        timestamp waktu_absen
        enum status "Hadir, Izin, Alpa"
    }
  ```

  ### 🔒 Koneksi PDO & Prepared Statement

- **Koneksi PDO Singleton (`config/database.php`):**
  Menggunakan driver `PDO` MySQL dengan opsi `PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION` dan `PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC` untuk memastikan setiap kegagalan query melempar *exception* yang terstruktur.

- **Query Aman (*Parameterized Query* di `models/User.php`):**
  Seluruh operasi manipulasi data (seperti `register` dan `findByUsername`) menggunakan metode `$pdo->prepare()` dan `$stmt->execute()` dengan parameter binding (misalnya `:username`). Hal ini menjamin bahwa input pengguna diperlakukan murni sebagai data, bukan sebagai sintaksis kode SQL, sehingga kebal dari serangan *SQL Injection*[

## 💻 Cara Menjalankan Proyek di Server Lokal (Laragon)

1. Pastikan aplikasi **Laragon** sudah berjalan (`Start All`)[cite: 36, 41].
2. Letakkan folder proyek ini di dalam direktori `C:\laragon\www\pemweb-proyek-semester`[cite: 36, 41].
3. Buka peramban (*browser*) dan akses URL berikut[cite: 36, 41]:
   ```text
   http://localhost/pemweb-proyek-semester/
   
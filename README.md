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

## 🚀 Dokumentasi REST API

Integrasi REST API pada proyek ini digunakan untuk memproses dan menampilkan konfirmasi data kiriman saran pengguna secara dinamis[cite: 21, 24].

### Tabel Spesifikasi Endpoint
| Attribute | Detail |
| --- | --- |
| **Endpoint URL** | `./data/users.json` (Local Simulated Endpoint / Mock REST API) |
| **HTTP Method** | `GET` / `POST` |
| **Content-Type** | `application/json` |
| **Status Code Sukses** | `200 OK` |
| **Status Code Gagal** | `404 Not Found` / `500 Internal Server Error` |

### Contoh Respon JSON (`200 OK`)
```json
[
  {
    "id": 1,
    "nama": "nazwa salwa adellia",
    "email": "nazwasalwa595@gmail.com",
    "pesan": "Saran berhasil terkirim ke server REST API",
    "status": "HTTP 200 OK (Terhubung)"
  }
]

## 💻 Cara Menjalankan Proyek di Server Lokal (Laragon)

1. Pastikan aplikasi **Laragon** sudah berjalan (`Start All`)[cite: 36, 41].
2. Letakkan folder proyek ini di dalam direktori `C:\laragon\www\pemweb-proyek-semester`[cite: 36, 41].
3. Buka peramban (*browser*) dan akses URL berikut[cite: 36, 41]:
   ```text
   http://localhost/pemweb-proyek-semester/
<<<<<<< HEAD
# Tugas 1 - Analisis Request-Response dan Setup Repository

**Nama Situs yang Dianalisis:** Komdigi (https://www.komdigi.go.id)

---

## 1. Analisis Request Network

Berikut adalah hasil pengamatan lima request dengan jenis resource berbeda pada tab Network DevTools:

| No | Nama / URL Request | Method | Status | Content Type | Ukuran (Size) | Fungsi Request |
|---|---|---|---|---|---|---|
| 1 | `https://www.komdigi.go.id/` | GET | 200 | `text/html; charset=utf-8` | 18.1 kB | Mengambil dokumen/skrip HTML utama yang berfungsi sebagai kerangka dasar dari struktur seluruh konten halaman web. |
| 2 | `https://www.komdigi.go.id/css/hearme-translator.css` | GET | 304 | `text/css; charset=UTF-8` | 0.2 kB | Memuat lembar gaya (stylesheet) untuk mengatur tampilan visual dan tata letak fitur penerjemah (*hearme translator*). |
| 3 | `https://www.komdigi.go.id/js/jquery-3.7.0.min.js` | GET | 304 | `application/javascript; charset=UTF-8` | 0.2 kB | Memuat pustaka jQuery 3.7.0 untuk menjalankan fungsi interaktif dan animasi di halaman web. |
| 4 | `https://www.komdigi.go.id/home/bg-trans.digital-slide-mobile.png` | GET | 304 | `image/png` | 0.2 kB | Memuat aset gambar latar belakang transparan (PNG) untuk tampilan slider di layar perangkat *mobile*. |
| 5 | `https://web.komdigi.go.id/resource/dXBsb2Fkcy8yMDI2...` | GET | 200 | `image/jpeg` | (memory cache) | Memuat gambar/foto utama berformat JPEG yang merupakan bagian dari banner/berita situs. |

### Ringkasan Analisis
Berdasarkan hasil pengamatan pada tab Network DevTools saat mengakses situs Komdigi, proses pemuatan halaman web melibatkan berbagai jenis request yang memiliki peran masing-masing. Dokumen utama berupa HTML dimuat pertama kali dengan respon `200 OK` sebagai kerangka awal halaman. Selanjutnya, browser mengunduh berkas pendukung seperti CSS untuk tata letak visual dan JavaScript (jQuery) untuk fungsionalitas interaktif, di mana keduanya mengembalikan kode `304 Not Modified` karena data sudah tersimpan pada *cache* lokal. Sementara itu, elemen media berupa gambar (PNG dan JPEG) dimuat untuk melengkapi aset visual antarmuka dan konten berita, baik dari jaringan maupun *memory cache*. Pengujian ini dilakukan murni untuk analisis lalu lintas data tanpa mengubah atau mengganggu sistem yang ada.

---

## 2. Refleksi (HTTP, Git, dan Etika AI)

HTTP itu adalah protokol pertukaran pesan atau komunikasi data antara client (seperti browser kita) dan server. Sedangkan HTTPS adalah HTTP yang dilindungi TLS, jadi selama data transit dienkripsi, lebih aman dari penyadapan, dan identitas server dapet diverifikasi demi keamanan data.

Untuk pengelolaan kode, Git menyimpan riwayat perubahan sehingga pekerjaan dapat dilacak, dikembalikan ke versi sebelumnya, dan dikolaborasikan bersama tim. Unit dasar Git adalah commit. Repository remote seperti GitHub/GitLab berfungsi sebagai tempat sinkronisasi dan kolaborasi antar pengembang.

Terkait etika AI, AI boleh aja membantu menjelaskan konsep, mencari alternatif, membuat contoh kecil, atau membantu debugging saat nemu error. Tapi mahasiswa wajib memverifikasi output-nya kembali, benar-benar memahami kode yang dihasilkan, tidak memasukkan data sensitif, serta mencatat penggunaan AI pada AI usage log sebagai bentuk transparansi dan tanggung jawab akademik.
=======
# Praktikum 1
Nama Mahasiswa: Nazwa Salwa Adellia
NPM : 2440304021
Lokal : A1
Angkatan : 2024

# Pemrograman Web - Modul 1
Praktikum Pemrograman Web (OBE)

## Deskripsi Proyek
Proyek awal untuk praktikum Pemrograman Web, berisi konfigurasi dasar lingkungan pengembangan lokal dan struktur file HTML sederhana.

## Studi Kasus Proyek
Sistem Informasi Daftar Kehadiran

## Teknologi yang Digunakan
- PHP 8.4
- Apache (via Laragon)
- HTML5
- Git & GitHub

## Cara Menjalankan Proyek (Laragon)
1. Pastikan aplikasi **Laragon** sudah dibuka dan status server aktif (**Start All**).
2. Letakkan folder proyek ini di dalam direktori `C:\laragon\www\pemweb-obe`.
3. Buka browser dan akses URL lokal di bawah ini.

## URL Lokal
http://localhost/pemweb-obe/
>>>>>>> b99b11275a0d8eb5d873d3d4360c339409727465


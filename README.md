# Tugas2
Nama Mahasiswa: Nazwa Salwa Adellia
NPM : 2440304021
Lokal : A1
Angkatan : 2024

# Pemrograman Web
Praktikum Pemrograman Web (OBE)


# AbsensiQR - Sistem Absensi Berbasis QR Code

AbsensiQR adalah aplikasi web sistem absensi modern yang aman, praktis, dan responsif. Sistem ini dirancang untuk memudahkan guru, dosen, siswa, dan mahasiswa dalam melakukan serta mengelola pencatatan kehadiran secara real-time.

---

## Fitur & Struktur Halaman Utama

Halaman utama (`index.html`) dibangun dengan struktur HTML5 semantik dan memuat elemen-elemen berikut:

- **Navigasi Utama (`<nav>`):** Akses cepat ke bagian Beranda, Login, dan Daftar.
- **Hero Section (`<section id="beranda">`):** Memuat ringkasan singkat platform dan tombol aksi utama.
- **Section Keunggulan (`<section id="keunggulan">`):** Menjelaskan 3 poin utama (Berbasis QR Code, Aman, dan Mudah Digunakan).
- **Section Cara Kerja (`<section id="cara-kerja">`):** Langkah-langkah penggunaan sistem mulai dari pembuatan akun hingga pencatatan absensi.
- **Formulir Saran (`<section id="kontak">`):** Form interaktif bagi pengguna untuk mengirimkan masukan atau pesan.
- **Footer (`<footer>`):** Informasi kontak dan hak cipta platform.

---

## Aksesibilitas Dasar (Accessibility)

Halaman ini telah menerapkan beberapa standar aksesibilitas web dasar:
- Penggunaan atribut `lang="id"` pada tag HTML.
- Atribut `alt` yang deskriptif pada semua gambar (`<img>` dan `<figure>`).
- Pasangan elemen `<label for="...">` dan `id` yang sesuai pada form masukan.
- Landasan navigasi yang jelas dengan `aria-label` serta tombol *skip link* ("Lewati ke konten utama").
- Hirarki heading yang terstruktur dan logis (`<h1>` hingga `<h3>`).

---

## Cara Menjalankan Proyek Secara Lokal

1. Pastikan server lokal seperti **Laragon** atau **XAMPP** sudah berjalan.
2. Simpan folder proyek ini di dalam direktori server`C:/laragon/www/pemweb-proyek-semester`.
3. Buka browser dan akses melalui URL:
   ```text
   [http://localhost/pemweb-proyek-semester/](http://localhost/pemweb-proyek-semester/)
   
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

## Bukti Pengujian Aksesibilitas & Responsivitas

### 1. Hasil Lighthouse Audit (Skor Sempurna 100/100)
Pengujian dilakukan menggunakan Google Chrome DevTools (Lighthouse) pada mode Mobile untuk memastikan kualitas teknis dan aksesibilitas situs.

| Kategori | Skor | Status |
| :--- | :---: | :--- |
| **Performance** | 100 | Sangat Cepat / Optimal |
| **Accessibility** | 100 | Sangat Ramah Aksesibilitas |
| **Best Practices** | 100 | Memenuhi Standar Modern Web |
| **SEO** | 100 | Teroptimasi untuk Mesin Pencari |

*(Lampiran Bukti Screenshot: Terdapat dalam file Pdf)*

---

### 2. Catatan Keputusan Desain (Design Decision Log)

* **Penggunaan HTML Semantik Murni**: Seluruh struktur halaman dibangun tanpa menggunakan tag `<div>`, melainkan memanfaatkan tag semantik HTML5 seperti `<header>`, `<nav>`, `<main>`, `<article>`, `<figure>`, dan `<footer>`. Keputusan ini diambil untuk memaksimalkan skor **Accessibility** dan memudahkan *screen reader* membaca navigasi serta isi dokumen.
* **Layout Kartu Berbasis Grid & Flexbox**: Menggunakan pola desain *card-based surface* (`var(--surface)`) dengan batas tipis dan bayangan halus untuk menciptakan batas visual yang tegas dan rapi antar-seksi.
* **Respon Layout Dinamis (2-Kolom)**: 
  * Pada tampilan mobile, form kontak dan hero section tersusun secara vertikal demi kenyamanan sentuhan jari.
  * Pada layar desktop (`min-width: 48rem`), form kontak dan section beranda bertransformasi menjadi 2 kolom menyamping (`display: grid`) untuk menghemat ruang vertikal dan menjaga simetri tampilan.
* **Aksen Warna & Kontras Tinggi**: Menerapkan warna latar belakang terang dengan teks gelap (`var(--text-dark)`) guna menjaga kontras bacaan yang nyaman. Penggunaan warna aksen biru (`var(--primary)`) difokuskan pada tombol aksi (*Call to Action*) serta teks penjelas dalam tag `<span>` untuk menarik perhatian pengguna secara intuitif.

[http://localhost/pemweb-proyek-semester/](http://localhost/pemweb-proyek-semester/)
   
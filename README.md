# Tugas2
Nama Mahasiswa: Nazwa Salwa Adellia
NPM : 2440304021
Lokal : A1
Angkatan : 2024

# Pemrograman Web
Praktikum Pemrograman Web (OBE)


# AbsensiQR - Sistem Absensi Digital Modern

AbsensiQR adalah aplikasi web sistem absensi modern yang aman, praktis, dan responsif. Platform ini dirancang menggunakan struktur semantik HTML5 murni tanpa menggunakan tag `<div>`, serta mematuhi standar aksesibilitas web (WCAG dasar).

---

##  Identitas & Lingkungan Pengembangan

* **Mata Kuliah:** Pemrograman Web (OBE)
* **Studi Kasus Proyek:** Platform Absensi QR Code untuk Sekolah/Perguruan Tinggi
* **Teknologi:** HTML5 (Semantik), CSS3 (Flexbox, Grid, Data Attribute), JavaScript ES6 (Modules, DOM, Event Delegation)
* **Server Lokal:** Laragon 5 (Apache & PHP 8.4)
* **URL Lokal:** `http://localhost/pemweb-proyek-semester/`
* **Repository GitHub:** `nazwasalwa595-art/pemweb-proyek-semester`

---

## Fitur Utama & Struktur Halaman

Halaman utama (`index.html`) dibangun secara terstruktur dan memuat komponen-komponen berikut:

1. **Header & Navigasi (`<header>`, `<nav>`):** Akses cepat ke halaman Beranda, Keunggulan, Inventaris, dan Kontak. Memuat tombol pemicu ganti tema (*Dark Mode/Light Mode*).
2. **Hero Section (`<section id="beranda">`):** Memuat teks pengenalan platform dan tombol pemicu utama.
3. **Keunggulan Layanan (`<section id="keunggulan">`):** Menjelaskan 3 poin utama (Berbasis QR Code, Aman, dan Mudah Digunakan).
4. **Cara Kerja (`<section id="cara-kerja">`):** Langkah-langkah penggunaan sistem dari registrasi hingga pencatatan kehadiran.
5. **Daftar Inventaris Alat (`<section id="inventaris-section">`):** Area dinamis berbasis DOM Manipulation yang menampilkan kartu alat, input pencarian real-time, filter kondisi, serta counter data.
6. **Formulir Saran (`<section id="kontak">`):** Form interaktif bagi pengguna untuk mengirimkan masukan.
7. **Footer (`<footer>`):** Informasi hak cipta dan tautan repositori proyek.

---

## Modul 5: Interaktivitas DOM, Event Handling, & Web Storage

Pada pengembangan Modul 5, sistem diintegrasikan dengan fitur interaktif berbasis JavaScript murni (`js/app.js` dan `js/utils.js`):

### 1. Tiga Interaksi Utama (DOM & Event)
- **Filter Kondisi Alat (`click` event):** Menyaring kartu inventaris berdasarkan kondisi barang ("Semua", "Baik", "Perlu Cek").
- **Pencarian Nama Real-Time (`input` event):** Menyaring kartu inventaris secara otomatis saat pengguna mengetik nama alat pada input pencarian.
- **Event Delegation Detail (`click` event pada `#daftar-alat`):** Menggunakan teknik *event delegation* pada container utama untuk merespons klik tombol `.btn-detail` dari kartu dinamis.

### 2. Penggunaan Web Storage (Data Non-Sensitif)
- **`theme`**: Menyimpan preferensi tema warna (`dark` / `light`) pada `localStorage` agar tema terpilih tetap bertahan saat halaman di-refresh.
- **`absensi_filter_kondisi`**: Menyimpan status filter kondisi terakhir yang dipilih pengguna ke dalam `localStorage`.

### 3. Bagan Alur Event & State
```text
[Pengguna Melakukan Aksi]
       │
       ├──► Klik Tombol Filter / Ketik Search / Klik Detail Card
       │
[Event Handler Dipicu] (click / input)
       │
       ├──► State Diperbarui (filterKondisiSekarang, kataKunciCari)
       │
[Web Storage Diperbarui] (localStorage.setItem)
       │
[DOM Render Ulang] (terapkanFilterDanRender -> replaceChildren)
       │
[Tampilan Browser Berubah Dinamis Tanpa Reload]
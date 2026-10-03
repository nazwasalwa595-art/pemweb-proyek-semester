# AI Usage Log (Catatan Penggunaan AI)

**Nama Proyek:** AbsensiQR - Sistem Absensi Digital  
**Repository:** `pemweb-proyek-semester`  
**Asisten AI:** Gemini  

---

## Tabel Ringkasan Interaksi AI

| Tanggal | Alat AI | Prompt / Pertanyaan Utama | Hasil / Keputusan yang Diambil |
| :---: | :---: | :--- | :--- |
| **03/10/2026** | Gemini | "memindahkan kotak hijau hasil submit saran agar muncul di sisi kiri di bawah gambar" | Mengubah struktur HTML pada `<section id="kontak">` dengan memindahkan `#preview-container` ke dalam `<article class="saran-info">` agar berada di kolom kiri. |
| **03/10/2026** | Gemini | "mungkin bisa aturkan bagian cssnya saja agar lebar presisinya disamakan sama yang lain" | Memperbarui atribut `max-width: 72rem;` dan `margin-inline: auto;` pada `#kontak` serta menyelaraskan `@media (min-width: 48rem)` untuk tampilan desktop. |
| **03/10/2026** | Gemini | "tampilan berandanya untuk tulisan QR nya di bagian bawah saja" | Membungkus frasa "QR Code" di dalam tag `<span>` pada elemen `<h2>` di `#beranda` dan menambahkan CSS `display: block;` agar kata tersebut berpindah ke baris bawahnya. |
| **03/10/2026** | Gemini | "mana untuk nama hanya boleh huruf, spasi, titik (.), dan petik (')" | Menambahkan ekspresi reguler (*Regex*) `/^[a-zA-Z\s.']+$/` pada fungsi `validateFormSaran()` di `js/utils.js` untuk memvalidasi penulisan nama yang benar. |
---

## Refleksi Penggunaan AI
Penggunaan AI (Gemini) pada pengerjaan Tugas 6 berfungsi sebagai penasihat perancangan struktur HTML5 semantik tanpa tag `<div>`, membantu merajut aturan validasi bisnis berbasis *JavaScript Regular Expression*, serta membantu pemecahan masalah (*troubleshooting*) tata letak responsif CSS Grid. Setiap solusi yang diberikan telah diverifikasi dan diuji secara mandiri melalui browser[cite: 38, 41].
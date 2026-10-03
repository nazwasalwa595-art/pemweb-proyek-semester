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

## Fitur & Implementasi Teknis (Tugas 6)

### 1. Form Aksesibel & Semantik
* **HTML5 Semantik Murni:** Dibangun menggunakan elemen `<section>`, `<article>`, `<figure>`, dan `<p>` tanpa menggunakan elemen `<div>`[cite: 34, 36].
* **Integrasi Aksesibilitas:**
  * Penggunaan `<label for="...">` yang terhubung presisi dengan `id="..."` pada setiap bidang *input*[cite: 34, 36].
  * Atribut `aria-describedby` menghubungkan *input* dengan pesan *error* terkait[cite: 34, 36].
  * Atribut `aria-live="polite"` dipasang pada *error summary* (`#form-summary`) dan pesan *error* agar terbaca oleh *screen reader* saat terjadi kegagalan[cite: 34, 36].
  * Fitur *auto-focus* mengarahkan kursor secara otomatis ke elemen *input error* pertama[cite: 34].

### 2. Aturan Validasi Bisnis JavaScript (`js/utils.js`)
* **Nama Lengkap:** Wajib diisi, minimal 3 karakter, dan hanya boleh memuat huruf, spasi, titik (`.`), dan tanda petik (`'`) via Regex `/^[a-zA-Z\s.']+$/`[cite: 35].
* **Email:** Wajib diisi dan harus memenuhi format alamat email valid (Regex)[cite: 35].
* **Saran / Pesan:** Wajib diisi dengan panjang minimal 10 karakter[cite: 35].
* **Normalisasi Data:** Data diolah dengan `.trim()` dan `.toLowerCase()` sebelum diperiksa[cite: 34, 35].

---

##  Catatan Peer / Code Review & Hasil Perbaikan

* **Temuan Review (Penyempurnaan Validasi Input Nama):**
  * **Temuan:** Kolom *Nama* sebelumnya masih menerima masukan berupa angka dan karakter simbol khusus (seperti "Nazwa123" atau "Salwa@"), sehingga data kurang rapi.
  * **Perbaikan:** Menambahkan aturan validasi *Regex* `/^[a-zA-Z\s.']+$/` pada fungsi `validateFormSaran()` di `js/utils.js`. Dengan aturan ini, gelar atau nama khusus (seperti `Dr. Salwa` atau `D'Angelo`) tetap diizinkan, sedangkan angka dan simbol lain akan ditolak[cite: 35].

---

##  Refleksi: Client-Side vs Server-Side Validation

* **Client-Side Validation (Validasi Sisi Klien):**
  Berfungsi utama untuk meningkatkan **User Experience (UX)**[cite: 34]. Validasi ini memberikan umpan balik (*feedback*) secara langsung dan cepat kepada pengguna tanpa harus melakukan *reload* atau mengirim *request* ke server[cite: 34]. Namun, validasi sisi klien tidak bisa diandalkan dari segi keamanan karena kodenya berada di browser dan dapat dimatikan atau dimanipulasi oleh pengguna[cite: 34].

* **Server-Side Validation (Validasi Sisi Server):**
  Berfungsi sebagai **Garda Utama Keamanan (Security Gate)**[cite: 34]. Server wajib memeriksa ulang seluruh data yang masuk untuk mencegah serangan siber (seperti *SQL Injection* atau *XSS*) dan memastikan integritas data tetap terjaga sebelum disimpan ke database[cite: 34]. 

**Kesimpulan:** *Client-side validation* digunakan untuk **UX dan kenyamanan pengguna**, sedangkan *server-side validation* digunakan untuk **keamanan sistem yang bersifat mutlak**[cite: 34].

---

## 💻 Cara Menjalankan Proyek di Server Lokal (Laragon)

1. Pastikan aplikasi **Laragon** sudah berjalan (`Start All`)[cite: 36, 41].
2. Letakkan folder proyek ini di dalam direktori `C:\laragon\www\pemweb-proyek-semester`[cite: 36, 41].
3. Buka peramban (*browser*) dan akses URL berikut[cite: 36, 41]:
   ```text
   http://localhost/pemweb-proyek-semester/
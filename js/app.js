/* js/app.js - Logika Interaktivitas DOM, Event Handling, & Web Storage */

// 1. Data Inventaris Alat Utama
const inventaris = [
  { id: 1, nama: 'Scanner QR Code', kategori: 'Perangkat', jumlah: 5, kondisi: 'Baik', lokasi: 'Lab Komputer 1' },
  { id: 2, nama: 'Webcam HD Absensi', kategori: 'Kamera', jumlah: 3, kondisi: 'Baik', lokasi: 'Ruang Kelas 3A' },
  { id: 3, nama: 'Tablet Presensi', kategori: 'Perangkat', jumlah: 2, kondisi: 'Perlu Cek', lokasi: 'Lab Komputer 1' },
  { id: 4, nama: 'Kabel LAN UTP', kategori: 'Jaringan', jumlah: 10, kondisi: 'Perlu Cek', lokasi: 'Lab Komputer 1' }
];

// Key Web Storage
const KEY_STORAGE_FILTER = 'absensi_filter_kondisi';
const KEY_STORAGE_THEME = 'theme';

let filterKondisiSekarang = localStorage.getItem(KEY_STORAGE_FILTER) ?? 'Semua';
let kataKunciCari = '';

// Fungsi Utama Inisialisasi DOM
function inisialisasiDaftarAlat() {
  const containerDaftar = document.querySelector('#daftar-alat');
  const tombolFilter = document.querySelectorAll('[data-filter]');
  const inputCari = document.querySelector('#input-cari');
  const elemJumlahTampil = document.querySelector('#jumlah-tampil');
  const elemJumlahTotal = document.querySelector('#jumlah-total');

  // Jika container elemen tempat kartu tidak ditemukan di HTML, hentikan
  if (!containerDaftar) return;

  function renderItems(items) {
    // Bersihkan isi container sebelumnya
    containerDaftar.replaceChildren();

    // Update Counter Informasi
    if (elemJumlahTampil) elemJumlahTampil.textContent = items.length;
    if (elemJumlahTotal) elemJumlahTotal.textContent = inventaris.length;

    if (items.length === 0) {
      const pesanKosong = document.createElement('p');
      pesanKosong.textContent = 'Tidak ada data inventaris yang ditemukan.';
      containerDaftar.append(pesanKosong);
      return;
    }

    // Generate Kartu <article> Dinamis
    for (const item of items) {
      const article = document.createElement('article');
      article.className = 'card';

      const title = document.createElement('h3');
      title.textContent = item.nama;

      const info = document.createElement('p');
      info.textContent = `${item.kategori} - ${item.jumlah} unit - Kondisi: ${item.kondisi}`;

      // Tombol Detail untuk Event Delegation
      const btnDetail = document.createElement('button');
      btnDetail.type = 'button';
      btnDetail.className = 'btn-detail';
      btnDetail.dataset.id = item.id;
      btnDetail.textContent = 'Lihat Detail';

      article.append(title, info, btnDetail);
      containerDaftar.append(article);
    }
  }

  function terapkanFilterDanRender() {
    const hasil = inventaris.filter((item) => {
      const cocokKondisi = filterKondisiSekarang === 'Semua' || item.kondisi === filterKondisiSekarang;
      const cocokNama = item.nama.toLowerCase().includes(kataKunciCari.toLowerCase());
      return cocokKondisi && cocokNama;
    });

    renderItems(hasil);
  }

  // 1. Event Listener Input Search Real-time
  if (inputCari) {
    inputCari.addEventListener('input', (e) => {
      kataKunciCari = e.target.value;
      terapkanFilterDanRender();
    });
  }

  // 2. Event Listener Tombol Filter Kondisi
  tombolFilter.forEach((button) => {
    button.addEventListener('click', () => {
      filterKondisiSekarang = button.dataset.filter;
      localStorage.setItem(KEY_STORAGE_FILTER, filterKondisiSekarang);

      tombolFilter.forEach((b) => b.classList.remove('active'));
      button.classList.add('active');

      terapkanFilterDanRender();
    });
  });

  // 3. Event Delegation Tombol Detail
  containerDaftar.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-detail')) {
      const idAlat = parseInt(event.target.dataset.id, 10);
      const detail = inventaris.find((item) => item.id === idAlat);

      if (detail) {
        alert(`--- DETAIL INVENTARIS ---
Nama Alat: ${detail.nama}
Kategori: ${detail.kategori}
Jumlah: ${detail.jumlah} unit
Kondisi: ${detail.kondisi}
Lokasi Penyimpanan: ${detail.lokasi}`);
      }
    }
  });

  // Terapkan class active pada tombol filter sesuai LocalStorage
  const btnAktif = document.querySelector(`[data-filter="${filterKondisiSekarang}"]`);
  if (btnAktif) btnAktif.classList.add('active');

  // Jalankan render awal
  terapkanFilterDanRender();
}

// Inisialisasi Fitur Preferensi Tema (localStorage)
function inisialisasiFiturTema() {
  const header = document.querySelector('header');
  if (!header) return;

  const themeButton = document.createElement('button');
  themeButton.id = 'theme-button';
  themeButton.type = 'button';
  themeButton.textContent = 'Ganti Tema';
  header.appendChild(themeButton);

  const savedTheme = localStorage.getItem(KEY_STORAGE_THEME) ?? 'light';
  document.documentElement.dataset.theme = savedTheme;

  themeButton.addEventListener('click', () => {
    const currentTheme = document.documentElement.dataset.theme;
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem(KEY_STORAGE_THEME, nextTheme);
  });
}

// Jalankan saat dokumen DOM siap
document.addEventListener('DOMContentLoaded', () => {
  inisialisasiDaftarAlat();
  inisialisasiFiturTema();
});
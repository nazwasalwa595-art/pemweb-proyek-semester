/* Skrip utama eksekusi logika JavaScript proyek AbsensiQR */

import { 
  ringkasAbsensi, 
  cariSesuaiLokasi, 
  cariPesertaDenganId, 
  buatStringRingkasan 
} from './utils.js';

const dataAbsensi = [
  { id: 1, nama: 'Budi Santoso', peran: 'Siswa', hadir: 14, status: 'Hadir', lokasi: 'Lab Komputer 1' },
  { id: 2, nama: 'Siti Aminah', peran: 'Mahasiswa', hadir: 15, status: 'Hadir', lokasi: 'Ruang Kelas 3A' },
  { id: 3, nama: 'Ahmad Dahlan', peran: 'Siswa', hadir: 8, status: 'Perlu Cek', lokasi: 'Lab Komputer 1' }
];

console.log('=== APLIKASI ABSENSI QR - PENGOLAHAN DATA MODERN ===');

try {
  const daftarNama = dataAbsensi.map(({ nama }) => nama);
  console.log('\n--- 1. DAFTAR NAMA PESERTA (MAP) ---');
  console.log(daftarNama);

  const pesertaLab1 = cariSesuaiLokasi(dataAbsensi, 'Lab Komputer 1');
  console.log('\n--- 2. PESERTA DI LAB KOMPUTER 1 (FILTER) ---');
  console.table(pesertaLab1);

  const pesertaId2 = cariPesertaDenganId(dataAbsensi, 2);
  console.log('\n--- 3. PENCARIAN PESERTA ID = 2 (FIND) ---');
  console.log(pesertaId2);

  console.log('\n--- 4. RINGKASAN DATA INDIVIDUAL ---');
  dataAbsensi.forEach(item => {
    console.log(buatStringRingkasan(item));
  });

  const statistik = ringkasAbsensi(dataAbsensi);
  console.log('\n--- 5. STATISTIK ABSENSI KESELURUHAN (REDUCE) ---');
  console.log(statistik);

  // Uji Coba Error Handling
  cariPesertaDenganId(dataAbsensi, 99);

} catch (error) {
  console.error('[ERROR TERDETEKSI]:', error.message);
}
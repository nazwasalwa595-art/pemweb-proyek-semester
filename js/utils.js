/* js/utils.js - Modul Validasi Form Saran & Helper Proyek Semester */

/**
 * Validasi Bisnis Form Kirim Saran (Tugas 6)
 * @param {Object} data - Object data ter-normalize (.trim(), .toLowerCase())
 * @returns {Object} errors - Object berisi daftar pesan error per field
 */
export function validateFormSaran(data) {
  const errors = {};

  // Regex: Hanya membolehkan Huruf, Spasi, Tanda Titik (.), dan Tanda Petik Tunggal (')
  const namaRegex = /^[a-zA-Z\s.']+$/;

  // 1. Validasi Nama Lengkap (Wajib, Minimal 3 Karakter, Bebas Angka & Karakter Khusus)
  if (!data.nama) {
    errors.nama = 'Nama lengkap wajib diisi.';
  } else if (data.nama.length < 3) {
    errors.nama = 'Format nama tidak valid: minimal harus 3 karakter.';
  } else if (!namaRegex.test(data.nama)) {
    errors.nama = 'Nama hanya boleh berisi huruf, spasi, titik (.), dan tanda petik (\'). Angka atau simbol lain tidak diperbolehkan.';
  }

  // 2. Validasi Email (Wajib & Format Regex Email Valid)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email) {
    errors.email = 'Alamat email wajib diisi.';
  } else if (!emailRegex.test(data.email)) {
    errors.email = 'Format email tidak valid (contoh: nama@domain.com).';
  }

  // 3. Validasi Saran / Pesan (Wajib & Minimal 10 Karakter)
  if (!data.saran) {
    errors.saran = 'Saran/pesan wajib diisi.';
  } else if (data.saran.length < 10) {
    errors.saran = 'Saran terlalu pendek: minimal tuliskan 10 karakter.';
  }

  return errors;
}
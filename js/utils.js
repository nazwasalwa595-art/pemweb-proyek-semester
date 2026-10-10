/* js/utils.js - Modul Validasi Form Saran & Helper Proyek Semester */

/**
 * Validasi Bisnis Form Kirim Saran (Tugas 6)
 * @param {Object} data - Object data ter-normalize (.trim(), .toLowerCase())
 * @returns {Object} errors - Object berisi daftar pesan error per field
 */

/* js/utils.js - Modul Validasi Form Saran & Helper Proyek Semester */

export function validateFormSaran(data) {
  const errors = {};

  // Regex hanya membolehkan huruf, spasi, titik, dan petik
  const namaRegex = /^[a-zA-Z\s.']+$/;

  if (!data.nama) {
    errors.nama = 'Nama lengkap wajib diisi.';
  } else if (data.nama.length < 3) {
    errors.nama = 'Format nama tidak valid: minimal harus 3 karakter.';
  } else if (!namaRegex.test(data.nama)) {
    errors.nama = 'Nama hanya boleh berisi huruf, spasi, titik (.), dan tanda petik (\').';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email) {
    errors.email = 'Alamat email wajib diisi.';
  } else if (!emailRegex.test(data.email)) {
    errors.email = 'Format email tidak valid (contoh: nama@domain.com).';
  }

  if (!data.saran) {
    errors.saran = 'Saran/pesan wajib diisi.';
  } else if (data.saran.length < 10) {
    errors.saran = 'Saran terlalu pendek: minimal tuliskan 10 karakter.';
  }

  return errors;
}
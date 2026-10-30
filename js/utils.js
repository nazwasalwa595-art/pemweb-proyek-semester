/* js/utils.js - Aturan Validasi Form Login & Register */

/**
 * Validasi Registrasi Akun
 * @param {Object} data 
 * @returns {Object} errors
 */
export function validateRegisterForm(data) {
  const errors = {};

  // 1. Validasi Peran
  if (!data.peran) {
    errors.peran = 'Silakan pilih peran Anda (Siswa/Mahasiswa atau Guru/Dosen).';
  }

  // 2. Validasi Username (Wajib Angka Saja, 8 - 18 Digit)
  const numericRegex = /^[0-9]+$/;
  if (!data.username) {
    errors.username = 'Username wajib diisi.';
  } else if (!numericRegex.test(data.username)) {
    errors.username = 'Username hanya boleh berupa angka (tanpa huruf, spasi, atau simbol).';
  } else if (data.username.length < 8 || data.username.length > 18) {
    errors.username = 'Username berupa angka harus berpanjang antara 8 hingga 18 digit.';
  }

  // 3. Validasi Nama Lengkap
  const namaRegex = /^[a-zA-Z\s.']+$/;
  if (!data.nama) {
    errors.nama = 'Nama lengkap wajib diisi.';
  } else if (data.nama.length < 3) {
    errors.nama = 'Nama lengkap minimal 3 karakter.';
  } else if (!namaRegex.test(data.nama)) {
    errors.nama = 'Nama hanya boleh berupa huruf, spasi, titik (.), atau petik (\').';
  }

  // 4. Validasi Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email) {
    errors.email = 'Alamat email wajib diisi.';
  } else if (!emailRegex.test(data.email)) {
    errors.email = 'Format email tidak valid (contoh: user@domain.com).';
  }

  // 5. Validasi Kata Sandi
  if (!data.password) {
    errors.password = 'Kata sandi wajib diisi.';
  } else if (data.password.length < 6) {
    errors.password = 'Kata sandi minimal harus 6 karakter.';
  }

  // 6. Validasi Konfirmasi Kata Sandi
  if (!data.confirmPassword) {
    errors.confirmPassword = 'Konfirmasi kata sandi wajib diisi.';
  } else if (data.confirmPassword !== data.password) {
    errors.confirmPassword = 'Konfirmasi kata sandi tidak cocok dengan kata sandi.';
  }

  return errors;
}

/**
 * Validasi Login Akun
 * @param {Object} data 
 * @returns {Object} errors
 */
export function validateLoginForm(data) {
  const errors = {};
  const numericRegex = /^[0-9]+$/;

  if (!data.username) {
    errors.username = 'Username wajib diisi.';
  } else if (!numericRegex.test(data.username)) {
    errors.username = 'Username hanya boleh berupa angka.';
  }

  if (!data.password) {
    errors.password = 'Kata sandi wajib diisi.';
  }

  return errors;
}
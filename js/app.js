/* js/app.js - Inisialisasi Fitur Landing Page & Form Validasi Proyek Semester */

import { validateFormSaran } from './utils.js';

// Key Storage
const KEY_STORAGE_THEME = 'theme';

// 1. Inisialisasi Fitur Preferensi Tema (Dark Mode)
function inisialisasiFiturTema() {
  const headerNav = document.querySelector('header nav');
  if (!headerNav) return;

  // Cek apakah tombol ganti tema sudah ada, jika belum buatkan
  let themeButton = document.querySelector('#theme-button');
  if (!themeButton) {
    themeButton = document.createElement('button');
    themeButton.id = 'theme-button';
    themeButton.type = 'button';
    themeButton.textContent = 'Ganti Tema';
    headerNav.appendChild(themeButton);
  }

  const savedTheme = localStorage.getItem(KEY_STORAGE_THEME) ?? 'light';
  document.documentElement.dataset.theme = savedTheme;

  themeButton.addEventListener('click', () => {
    const currentTheme = document.documentElement.dataset.theme;
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem(KEY_STORAGE_THEME, nextTheme);
  });
}

// 2. Inisialisasi Handler Submit Form Saran
function inisialisasiFormSaran() {
  const formSaran = document.querySelector('#form-saran');
  const formSummary = document.querySelector('#form-summary');
  const previewContainer = document.querySelector('#preview-container');
  const previewContent = document.querySelector('#preview-content');

  if (!formSaran) return;

  formSaran.addEventListener('submit', (event) => {
    event.preventDefault(); // Mencegah reload halaman

    // Reset status error visual
    formSaran.querySelectorAll('.error-msg').forEach((span) => (span.textContent = ''));
    formSaran.querySelectorAll('input, textarea').forEach((input) => input.removeAttribute('aria-invalid'));
    if (formSummary) formSummary.textContent = '';
    if (previewContainer) previewContainer.hidden = true;

    // Normalisasi & Clean Data Input
    const rawData = new FormData(formSaran);
    const formData = {
      nama: rawData.get('nama')?.trim() || '',
      email: rawData.get('email')?.trim().toLowerCase() || '',
      saran: rawData.get('saran')?.trim() || ''
    };

    // Jalankan Fungsi Validasi
    const errors = validateFormSaran(formData);
    const errorKeys = Object.keys(errors);

    // Jika Ada Error
    if (errorKeys.length > 0) {
      if (formSummary) {
        formSummary.textContent = `Terdapat ${errorKeys.length} kesalahan pada form. Silakan periksa pesan di bawah.`;
        formSummary.style.color = '#dc2626';
      }

      let firstErrorField = null;

      errorKeys.forEach((key) => {
        const inputField = formSaran.querySelector(`[name="${key}"]`);
        const errSpan = document.querySelector(`#err-${key}`);

        if (inputField) {
          inputField.setAttribute('aria-invalid', 'true');
          if (!firstErrorField) firstErrorField = inputField;
        }

        if (errSpan) {
          errSpan.textContent = errors[key];
        }
      });

      // Fokuskan kursor ke field error pertama (Aksesibilitas)
      if (firstErrorField) {
        firstErrorField.focus();
      }

      return;
    }

    // Jika Valid: Tampilkan Preview Data
    if (previewContainer && previewContent) {
      previewContent.innerHTML = `
        <strong>Nama:</strong> ${formData.nama}<br>
        <strong>Email:</strong> ${formData.email}<br>
        <strong>Saran/Pesan:</strong> ${formData.saran}
      `;
      previewContainer.hidden = false;

      if (formSummary) {
        formSummary.textContent = 'Terima kasih! Saran Anda berhasil dikirim.';
        formSummary.style.color = '#166534';
      }

      formSaran.reset();
    }
  });
}

// Jalankan fungsi saat DOM siap
document.addEventListener('DOMContentLoaded', () => {
  inisialisasiFiturTema();
  inisialisasiFormSaran();
});
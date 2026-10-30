/* js/app.js - Pengatur Fitur Utama, Ganti Tema & REST API */

import { validateFormSaran } from './utils.js';

// 1. Inisialisasi Fitur Toggle Tema (Dark/Light Mode)
function inisialisasiFiturTema() {
  const themeToggleBtn = document.querySelector('#theme-toggle');
  if (!themeToggleBtn) return;

  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  themeToggleBtn.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeToggleBtn.textContent = newTheme === 'dark' ? '☀️' : '🌙';
  });
}

// 2. Hubungkan Endpoint REST API
const endpoint = './api/saran.php';

async function kirimSaranKeAPI(formData) {
  const formSummary = document.querySelector('#form-summary');
  const previewContainer = document.querySelector('#preview-container');
  const previewContent = document.querySelector('#preview-content');

  if (formSummary) {
    formSummary.innerHTML = '<span>Mengirim saran ke REST API PHP...</span>';
    formSummary.style.color = '#1e293b';
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify(formData)
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || `HTTP Error Status: ${response.status}`);
    }

    if (formSummary) {
      formSummary.textContent = result.message || 'Terima kasih! Saran Anda berhasil terkirim.';
      formSummary.style.color = '#166534';
    }

    if (previewContainer && previewContent) {
      previewContent.innerHTML = `
        <strong>Nama:</strong> ${formData.nama}<br>
        <strong>Email:</strong> ${formData.email}<br>
        <strong>Saran/Pesan:</strong> ${formData.saran}<br>
        <small style="color: #047857; margin-top: 4px; display: inline-block;">Status API: HTTP ${response.status} (Backend PHP 8.4)</small>
      `;
      previewContainer.hidden = false;
    }

  } catch (error) {
    console.error('REST API Error:', error);

    if (formSummary) {
      formSummary.innerHTML = `
        <span style="color: #dc2626;">Gagal: ${error.message} </span>
        <button type="button" id="btn-retry-saran" style="margin-left: 8px; padding: 4px 10px; cursor: pointer; border-radius: 4px; background: #2563eb; color: #fff; border: none;">
          Coba Lagi (Retry)
        </button>
      `;

      const btnRetry = document.querySelector('#btn-retry-saran');
      if (btnRetry) {
        btnRetry.addEventListener('click', () => kirimSaranKeAPI(formData));
      }
    }
  }
}

// 3. Jalankan Script Saat DOM Siap
document.addEventListener('DOMContentLoaded', () => {
  inisialisasiFiturTema();

  const formSaran = document.querySelector('#form-saran');
  if (formSaran) {
    formSaran.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = {
        nama: document.querySelector('#nama')?.value.trim() || '',
        email: document.querySelector('#email')?.value.trim() || '',
        saran: document.querySelector('#saran')?.value.trim() || ''
      };

      const errors = validateFormSaran(formData);
      
      // Bersihkan error message lama
      document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');

      if (Object.keys(errors).length > 0) {
        for (const [key, msg] of Object.entries(errors)) {
          const errElement = document.querySelector(`#err-${key}`);
          if (errElement) errElement.textContent = msg;
        }
        return;
      }

      kirimSaranKeAPI(formData);
    });
  }
});
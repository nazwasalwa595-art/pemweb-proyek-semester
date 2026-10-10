/* js/app.js - Inisialisasi Landing Page & REST API Kirim Saran (Modul 7) */

import { validateFormSaran } from './utils.js';

// Configuration Endpoint (Set USE_LOCAL_DATA = true jika lab offline)
const USE_LOCAL_DATA = true;
const endpoint = USE_LOCAL_DATA
  ? './data/users.json'
  : 'https://jsonplaceholder.typicode.com/posts';

// 
// MODUL 7: Integrasi REST API Menggunakan Async/Await & Fetch
// 
async function kirimSaranKeAPI(formData) {
  const formSummary = document.querySelector('#form-summary');
  const previewContainer = document.querySelector('#preview-container');
  const previewContent = document.querySelector('#preview-content');

  // 1. LOADING STATE
  if (formSummary) {
    formSummary.innerHTML = '<span>Mengirim saran ke REST API...</span>';
    formSummary.style.color = '#1e293b';
  }

  try {
    // 2. HTTP Request via Fetch API
    const response = await fetch(endpoint, {
      method: USE_LOCAL_DATA ? 'GET' : 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: USE_LOCAL_DATA ? null : JSON.stringify(formData)
    });

    // 3. Pengecekan HTTP Response
    if (!response.ok) {
      throw new Error(`HTTP Error Status: ${response.status}`);
    }

    const result = await response.json();

    // 4. SUCCESS STATE
    if (formSummary) {
      formSummary.textContent = 'Terima kasih! Saran Anda berhasil terkirim ke server REST API.';
      formSummary.style.color = '#166534';
    }

    if (previewContainer && previewContent) {
      previewContent.innerHTML = `
        <strong>Nama:</strong> ${formData.nama}<br>
        <strong>Email:</strong> ${formData.email}<br>
        <strong>Saran/Pesan:</strong> ${formData.saran}<br>
        <small style="color: #047857; margin-top: 4px; display: inline-block;">Status API: HTTP 200 OK (Terhubung)</small>
      `;
      previewContainer.hidden = false;
    }

  } catch (error) {
    console.error('REST API Error:', error);

    // 5. ERROR STATE & TOMBOL RETRY
    if (formSummary) {
      formSummary.innerHTML = `
        <span style="color: #dc2626;">Gagal menghubungkan ke server API. </span>
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

// 
// HANDLER SUBMIT FORM SARAN (MODUL 6 + MODUL 7)
// 
function inisialisasiFormSaran() {
  const formSaran = document.querySelector('#form-saran');
  const formSummary = document.querySelector('#form-summary');
  const previewContainer = document.querySelector('#preview-container');

  if (!formSaran) return;

  formSaran.addEventListener('submit', (event) => {
    event.preventDefault();

    // Reset error visual
    formSaran.querySelectorAll('.error-msg').forEach((span) => (span.textContent = ''));
    formSaran.querySelectorAll('input, textarea').forEach((input) => input.removeAttribute('aria-invalid'));
    if (formSummary) formSummary.textContent = '';
    if (previewContainer) previewContainer.hidden = true;

    // Normalisasi Data Input
    const rawData = new FormData(formSaran);
    const formData = {
      nama: rawData.get('nama')?.trim() || '',
      email: rawData.get('email')?.trim().toLowerCase() || '',
      saran: rawData.get('saran')?.trim() || ''
    };

    // Validasi Input
    const errors = validateFormSaran(formData);
    const errorKeys = Object.keys(errors);

    if (errorKeys.length > 0) {
      if (formSummary) {
        formSummary.textContent = `Terdapat ${errorKeys.length} kesalahan pada form. Silakan periksa pesan di bawah.`;
        formSummary.style.color = '#dc2626';
      }

      errorKeys.forEach((key) => {
        const inputField = formSaran.querySelector(`[name="${key}"]`);
        const errSpan = document.querySelector(`#err-${key}`);
        if (inputField) inputField.setAttribute('aria-invalid', 'true');
        if (errSpan) errSpan.textContent = errors[key];
      });
      return;
    }

    // Jika Valid -> Jalankan Fetch REST API
    kirimSaranKeAPI(formData);
    formSaran.reset();
  });
}

// 
// PREFERENSI TEMA (DARK MODE)
// 
function inisialisasiFiturTema() {
  const headerNav = document.querySelector('header nav');
  if (!headerNav) return;

  let themeButton = document.querySelector('#theme-button');
  if (!themeButton) {
    themeButton = document.createElement('button');
    themeButton.id = 'theme-button';
    themeButton.type = 'button';
    themeButton.textContent = 'Ganti Tema';
    headerNav.appendChild(themeButton);
  }

  const savedTheme = localStorage.getItem('theme') ?? 'light';
  document.documentElement.dataset.theme = savedTheme;

  themeButton.addEventListener('click', () => {
    const currentTheme = document.documentElement.dataset.theme;
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem('theme', nextTheme);
  });
}

// Inisialisasi DOM Siap
document.addEventListener('DOMContentLoaded', () => {
  inisialisasiFiturTema();
  inisialisasiFormSaran();
});
/* js/app.js - Diperbarui untuk terhubung ke Backend PHP 8.4 (Modul 9) */

import { validateFormSaran } from './utils.js';

// Hubungkan Endpoint ke Backend PHP 8.4 Lokal
const endpoint = './api/saran.php';

async function kirimSaranKeAPI(formData) {
  const formSummary = document.querySelector('#form-summary');
  const previewContainer = document.querySelector('#preview-container');
  const previewContent = document.querySelector('#preview-content');

  // 1. LOADING STATE
  if (formSummary) {
    formSummary.innerHTML = '<span>Mengirim saran ke REST API PHP...</span>';
    formSummary.style.color = '#1e293b';
  }

  try {
    // 2. HTTP Request POST ke Backend PHP
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

    // 3. SUCCESS STATE
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

    // 4. ERROR STATE & TOMBOL RETRY
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
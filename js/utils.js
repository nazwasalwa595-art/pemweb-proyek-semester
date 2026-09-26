/* js/utils.js Modul fungsi pembantu (utility) untuk pengolahan & pencarian data AbsensiQR */

export function ringkasAbsensi(data) {
  if (!Array.isArray(data)) {
    throw new TypeError('Data harus berupa array');
  }

  return {
    totalPeserta: data.length,
    totalHadir: data.reduce((sum, item) => sum + item.hadir, 0),
    perluEvaluasi: data.filter(item => item.status !== 'Hadir').length
  };
}

export function cariAbsensiSesuaiLokasi(data, lokasiCari) {
  return data.filter(item => item.lokasi === lokasiCari);
}

export function cariPesertaDenganId(data, idCari) {
  return data.find(item => item.id === idCari);
}

export function buatStringRingkasan(item) {
  const { nama, peran, hadir, status, lokasi } = item;
  return `Peserta [${nama}] (${peran}) telah hadir ${hadir} sesi dengan status ${status}, berlokasi di ${lokasi}.`;
}
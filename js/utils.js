/* Modul logika pengolahan data absensi modern untuk proyek AbsensiQR */

export function ringkasAbsensi(data) {
  if (!Array.isArray(data)) {
    throw new TypeError('Data absensi harus berupa Array!');
  }

  return {
    totalPeserta: data.length,
    totalHadir: data.reduce((sum, item) => sum + item.hadir, 0),
    perluEvaluasi: data.filter(item => item.status !== 'Hadir').length
  };
}

export const cariSesuaiLokasi = (data, lokasiCari) => {
  if (!Array.isArray(data)) throw new TypeError('Data harus berupa Array!');
  return data.filter(item => item.lokasi === lokasiCari);
};

export const cariPesertaDenganId = (data, idCari) => {
  if (!Array.isArray(data)) throw new TypeError('Data harus berupa Array!');
  const hasil = data.find(item => item.id === idCari);
  if (!hasil) {
    throw new Error(`Data peserta dengan ID ${idCari} tidak ditemukan.`);
  }
  return hasil;
};

export function buatStringRingkasan(item) {
  const { nama, peran, hadir, status, lokasi } = item;
  return `Peserta [${nama}] (${peran}) | Kehadiran: ${hadir} sesi | Status: ${status} | Lokasi: ${lokasi}`;
}

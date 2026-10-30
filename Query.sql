-- Skrip Pembuatan Tabel Relasional AbsensiQR
USE `absensiqr_db`;

-- 1. Tabel Users (Menyimpan data pengguna)
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(20) NOT NULL UNIQUE,
  `nama` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `peran` ENUM('Siswa/Mahasiswa', 'Guru/Dosen') NOT NULL DEFAULT 'Siswa/Mahasiswa',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Tabel Kelas (Menyimpan data kelas)
CREATE TABLE IF NOT EXISTS `kelas` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `kode_kelas` VARCHAR(20) NOT NULL UNIQUE,
  `nama_kelas` VARCHAR(100) NOT NULL,
  `dosen_id` INT NOT NULL,
  FOREIGN KEY (`dosen_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Tabel Presensi (Menyimpan data riwayat absensi)
CREATE TABLE IF NOT EXISTS `presensi` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  `kelas_id` INT NOT NULL,
  `waktu_absen` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `status` ENUM('Hadir', 'Izin', 'Alpa') NOT NULL DEFAULT 'Hadir',
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`kelas_id`) REFERENCES `kelas`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
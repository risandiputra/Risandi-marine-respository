PANDUAN INTEGRASI GOOGLE DRIVE - PORTOFOLIO KINERJA DOSEN
===========================================================

Folder Google Drive tujuan:
https://drive.google.com/drive/folders/1vip7Umt05FHs7W9imowff_joqUNXGAmI?hl=ID

Fitur V4:
- Menu Portofolio Kinerja bisa diklik per kategori.
- Ada checklist dokumen dan status: Sudah diupload / Belum diupload.
- Ada form upload dokumen.
- Folder Google Drive dibuat otomatis berdasarkan kategori dan tahun.
- File disimpan ke Google Drive melalui Google Apps Script.

CATATAN PENTING
---------------
Website Netlify adalah website statis. Agar file bisa masuk langsung ke Google Drive,
diperlukan Google Apps Script Web App sebagai backend ringan.

LANGKAH SETUP APPS SCRIPT
-------------------------
1. Buka https://script.google.com/
2. Klik New project.
3. Buka file apps-script/Code.gs dari paket website ini.
4. Copy semua isi Code.gs, lalu paste ke editor Apps Script.
5. Di Code.gs, ubah:
   const UPLOAD_PIN = 'GANTI_PIN_RAHASIA';
   menjadi kode akses pribadi, misalnya:
   const UPLOAD_PIN = 'RISANDI-2026-PORTOFOLIO';
6. Klik Save.
7. Klik Deploy > New deployment.
8. Pilih Type: Web app.
9. Execute as: Me.
10. Who has access: Anyone with the link.
11. Klik Deploy.
12. Berikan authorization ke akun Google Anda.
13. Copy Web App URL.
14. Buka file script.js.
15. Cari baris:
    const GOOGLE_DRIVE_WEB_APP_URL = '';
16. Paste URL Apps Script di antara tanda kutip:
    const GOOGLE_DRIVE_WEB_APP_URL = 'https://script.google.com/macros/s/XXXXX/exec';
17. Simpan file.
18. Upload ulang folder website ke Netlify.

STRUKTUR FOLDER OTOMATIS
------------------------
Apps Script akan membuat folder berikut di dalam folder Drive utama:
01 Pendidikan dan Pengajaran
02 Penelitian dan Publikasi
03 Pengabdian kepada Masyarakat
04 Penunjang Akademik
05 Rekognisi dan Prestasi
06 HKI Buku dan Luaran Tambahan
07 Dokumen Pendukung

Setiap upload akan masuk ke subfolder tahun, misalnya:
01 Pendidikan dan Pengajaran / 2026 /
02 Penelitian dan Publikasi / 2026 /

KEAMANAN
--------
- Jangan tampilkan kode akses upload di website publik.
- Ganti UPLOAD_PIN secara berkala.
- Jangan upload dokumen sangat sensitif jika folder Drive belum benar-benar privat.
- Apps Script diset "Execute as Me", jadi file akan masuk sebagai pemilik akun Google Anda.
- Website hanya menampilkan status dan metadata ringkas. Hak akses file tetap mengikuti setelan Google Drive Anda.

BATASAN
-------
- Upload via Apps Script disarankan maksimal sekitar 10-12 MB per file.
- Untuk file besar, upload langsung ke Google Drive secara manual.
- Jika upload berhasil tetapi status belum berubah, klik tombol Refresh Status.

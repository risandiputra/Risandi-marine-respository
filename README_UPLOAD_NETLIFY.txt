RISANDI DWIRAMA PUTRA - MARINE SCIENCE WEBSITE V2
====================================================

Versi ini sudah di-enhance menjadi website akademik dan science communication dengan:

1. Tema visual marine science / oceanography yang lebih profesional.
2. Foto scientific dari Unsplash untuk mengganti ilustrasi/sketch utama.
3. Menu baru: Portofolio Kinerja.
4. Menu Berita Riset untuk ringkasan jurnal dalam gaya populer-ilmiah.
5. Contact form menggunakan Netlify Forms.
6. Halaman terima-kasih.html setelah form dikirim.
7. Desain responsive untuk desktop, tablet, dan mobile.

MENU WEBSITE
------------
- Beranda
- Tentang
- Keahlian
- Fokus Riset
- Publikasi
- Berita Riset
- Portofolio Kinerja
- Kontak

CATATAN GAMBAR
--------------
Gambar utama menggunakan remote image dari Unsplash melalui URL images.unsplash.com.
Jika ingin loading lebih stabil dan lebih cepat, gambar bisa diunduh manual dari Unsplash,
disimpan ke folder assets/images/, lalu URL pada index.html dan styles.css diganti ke file lokal.

CARA UPLOAD KE NETLIFY
----------------------
1. Extract ZIP ini.
2. Pastikan file index.html berada langsung di dalam folder utama hasil extract.
3. Masuk ke dashboard Netlify.
4. Buka Production deploys.
5. Drag-and-drop folder hasil extract ke area deploy.
6. Tunggu status menjadi Published.
7. Buka link website publik.

FORM KONTAK
-----------
Form sudah disiapkan untuk Netlify Forms dengan nama: kontak-riset.
Setelah ada pesan masuk, cek dashboard Netlify > Forms.

PORTOFOLIO KINERJA
------------------
Bagian Portofolio Kinerja dibuat sebagai ruang ringkasan bukti akademik.
Untuk keamanan, dokumen sensitif seperti SK, surat tugas, sertifikat, dan dokumen pangkat
sebaiknya tidak dibuka publik. Tampilkan ringkasan saja, file lengkap disimpan di arsip pribadi
atau cloud folder terbatas.


UPDATE V3:
- Menambahkan section Portofolio Kinerja lengkap untuk bukti akademik/BKD/SISTER/SINTA.
- Mengganti visual sketch pada card riset dan berita riset menjadi foto Unsplash yang lebih scientific.
- Menambahkan opsi Portofolio Kinerja pada form kontak.
- Dokumen sensitif tetap direkomendasikan disimpan di arsip pribadi/cloud terbatas.

UPDATE V4 - PORTOFOLIO KINERJA + GOOGLE DRIVE
---------------------------------------------
Versi ini menambahkan dashboard Portofolio Kinerja dengan checklist dokumen, status upload, form upload, dan integrasi Google Drive melalui Google Apps Script.

Untuk mengaktifkan upload otomatis ke Google Drive, baca file:
README_GOOGLE_DRIVE_INTEGRATION.txt

Tanpa setup Apps Script, website tetap bisa berjalan, tetapi fitur upload otomatis ke Google Drive belum aktif.

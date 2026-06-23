/**
 * Google Apps Script Web App untuk Arsip Kinerja Akademik & Bukti Portofolio Dosen.
 * Versi ini mengirim respons upload kembali ke website melalui postMessage,
 * sehingga checklist website bisa berubah otomatis setelah upload berhasil.
 */

const ROOT_FOLDER_ID = '1vip7Umt05FHs7W9imowff_joqUNXGAmI';
const UPLOAD_PIN = 'KeenanKenzie';

const CATEGORY_FOLDERS = {
  pendidikan: '01 Pendidikan dan Pengajaran',
  penelitian: '02 Penelitian dan Publikasi',
  pengabdian: '03 Pengabdian kepada Masyarakat',
  penunjang: '04 Penunjang Akademik',
  rekognisi: '05 Rekognisi dan Prestasi',
  hki: '06 HKI Buku dan Luaran Tambahan',
  pendukung: '07 Dokumen Pendukung'
};

function doGet(e) {
  const action = (e && e.parameter && e.parameter.action) || 'status';
  const callback = e && e.parameter && e.parameter.callback;
  let payload;

  try {
    ensureMainFolders_();

    if (action === 'list') {
      payload = {
        success: true,
        rootFolderId: ROOT_FOLDER_ID,
        files: listPortfolioFiles_()
      };
    } else {
      payload = {
        success: true,
        message: 'Google Drive Portfolio Web App aktif.',
        rootFolderId: ROOT_FOLDER_ID
      };
    }
  } catch (error) {
    payload = {
      success: false,
      message: error.message
    };
  }

  return output_(payload, callback);
}

function doPost(e) {
  let payload;
  let requestId = '';

  try {
    const p = e.parameter || {};
    requestId = p.requestId || '';

    if (!p.accessCode || p.accessCode !== UPLOAD_PIN) {
      throw new Error('Kode akses tidak valid. Upload ditolak.');
    }

    if (!p.fileBase64 || !p.fileName) {
      throw new Error('File tidak ditemukan dalam payload.');
    }

    ensureMainFolders_();

    const category = p.category || 'pendukung';
    const categoryFolderName = CATEGORY_FOLDERS[category] || sanitizeText_(p.folderName || '07 Dokumen Pendukung');
    const year = sanitizeText_(p.year || Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy'));

    const root = DriveApp.getFolderById(ROOT_FOLDER_ID);
    const categoryFolder = getOrCreateFolder_(root, categoryFolderName);
    const yearFolder = getOrCreateFolder_(categoryFolder, year);

    const safeTitle = sanitizeText_(p.documentTitle || 'Dokumen Portofolio');
    const safeFileName = sanitizeFileName_(p.fileName || 'dokumen.pdf');
    const timestamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyyMMdd_HHmmss');
    const finalName = `${year}_${safeTitle}_${timestamp}_${safeFileName}`;

    const decoded = Utilities.base64Decode(p.fileBase64);
    const blob = Utilities.newBlob(decoded, p.mimeType || 'application/octet-stream', finalName);
    const file = yearFolder.createFile(blob);

    const metadata = {
      itemKey: p.itemKey || '',
      category: category,
      categoryLabel: p.categoryLabel || categoryFolderName,
      folderName: categoryFolderName,
      documentTitle: p.documentTitle || '',
      documentStatus: p.documentStatus || '',
      year: year,
      role: p.role || '',
      output: p.output || '',
      uploadedAt: new Date().toISOString(),
      source: 'Risandi Portfolio Website'
    };

    file.setDescription(JSON.stringify(metadata));

    payload = {
      success: true,
      message: 'File berhasil diunggah ke Google Drive.',
      fileId: file.getId(),
      fileName: file.getName(),
      url: file.getUrl(),
      metadata: metadata
    };
  } catch (error) {
    payload = {
      success: false,
      message: error.message
    };
  }

  return uploadOutput_(payload, requestId);
}

function output_(payload, callback) {
  const text = callback
    ? `${callback}(${JSON.stringify(payload)});`
    : JSON.stringify(payload);

  return ContentService
    .createTextOutput(text)
    .setMimeType(callback ? ContentService.MimeType.JAVASCRIPT : ContentService.MimeType.JSON);
}

function uploadOutput_(payload, requestId) {
  const message = {
    source: 'risandi-drive-upload',
    requestId: requestId || '',
    payload: payload
  };

  const html = `<!doctype html><html><body>
    <script>
      window.parent.postMessage(${JSON.stringify(message)}, '*');
    </script>
    <pre>${escapeHtml_(JSON.stringify(payload, null, 2))}</pre>
  </body></html>`;

  return HtmlService.createHtmlOutput(html)
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function ensureMainFolders_() {
  const root = DriveApp.getFolderById(ROOT_FOLDER_ID);

  Object.keys(CATEGORY_FOLDERS).forEach(function(key) {
    getOrCreateFolder_(root, CATEGORY_FOLDERS[key]);
  });
}

function getOrCreateFolder_(parent, name) {
  const folders = parent.getFoldersByName(name);

  if (folders.hasNext()) {
    return folders.next();
  }

  return parent.createFolder(name);
}

function listPortfolioFiles_() {
  const root = DriveApp.getFolderById(ROOT_FOLDER_ID);
  const files = [];

  scanFolder_(root, files, []);

  return files;
}

function scanFolder_(folder, files, path) {
  const folderPath = path.concat(folder.getName());
  const fileIterator = folder.getFiles();

  while (fileIterator.hasNext()) {
    const file = fileIterator.next();
    let meta = {};

    try {
      const desc = file.getDescription();
      if (desc) {
        meta = JSON.parse(desc);
      }
    } catch (error) {
      meta = {};
    }

    files.push({
      id: file.getId(),
      name: file.getName(),
      url: file.getUrl(),
      mimeType: file.getMimeType(),
      size: file.getSize(),
      updatedAt: file.getLastUpdated() ? file.getLastUpdated().toISOString() : '',
      path: folderPath.join(' / '),
      itemKey: meta.itemKey || '',
      category: meta.category || '',
      categoryLabel: meta.categoryLabel || '',
      documentTitle: meta.documentTitle || '',
      documentStatus: meta.documentStatus || '',
      year: meta.year || '',
      role: meta.role || '',
      output: meta.output || '',
      uploadedAt: meta.uploadedAt || ''
    });
  }

  const folderIterator = folder.getFolders();

  while (folderIterator.hasNext()) {
    scanFolder_(folderIterator.next(), files, folderPath);
  }
}

function sanitizeText_(value) {
  return String(value || '')
    .replace(/[\\/:*?"<>|#{}%~&]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 120) || 'Dokumen';
}

function sanitizeFileName_(value) {
  return String(value || 'dokumen')
    .replace(/[\\/:*?"<>|#{}%~&]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 140) || 'dokumen';
}

function escapeHtml_(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function testSetup() {
  ensureMainFolders_();
  Logger.log('OK: Folder Google Drive berhasil diakses dan folder kategori siap.');
}

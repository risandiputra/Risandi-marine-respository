const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('#nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');

navToggle?.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

const sections = [...document.querySelectorAll('main section[id]')];
const linkMap = new Map([...navLinks].map(link => [link.getAttribute('href')?.replace('#', ''), link]));

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('active'));
      linkMap.get(entry.target.id)?.classList.add('active');
    }
  });
}, { rootMargin: '-35% 0px -55% 0px', threshold: 0.1 });
sections.forEach(section => sectionObserver.observe(section));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const counters = document.querySelectorAll('[data-counter]');
let countersStarted = false;
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !countersStarted) {
      countersStarted = true;
      counters.forEach(counter => {
        const target = Number(counter.dataset.counter || 0);
        const duration = 1200;
        const start = performance.now();
        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const value = Math.floor(progress * target);
          counter.textContent = value.toLocaleString('id-ID');
          if (progress < 1) requestAnimationFrame(tick);
          else counter.textContent = target.toLocaleString('id-ID');
        };
        requestAnimationFrame(tick);
      });
    }
  });
}, { threshold: 0.25 });
const metricsBand = document.querySelector('.metrics-band');
if (metricsBand) counterObserver.observe(metricsBand);

const newsItems = [
  {
    category: 'Oseanografi',
    title: 'Arus Permukaan di Estuari Kawal Menunjukkan Variasi Musiman yang Penting bagi Ekosistem Pesisir',
    body: 'Kajian hidrodinamika di Estuari Kawal, Bintan, membantu menjelaskan bagaimana pola arus permukaan berubah mengikuti musim. Informasi seperti ini penting untuk memahami pergerakan massa air, potensi sebaran material terlarut, dan dinamika lingkungan yang memengaruhi ekosistem pesisir. Ringkasan ini dapat dikembangkan menjadi berita riset yang menjembatani hasil pemodelan ilmiah dengan kebutuhan pengelolaan pesisir.'
  },
  {
    category: 'Terumbu Karang',
    title: 'Tutupan Karang Hidup Berperan Penting terhadap Kelimpahan Ikan Kepe-kepe di Pulau Weh',
    body: 'Famili Chaetodontidae atau ikan kepe-kepe sering digunakan sebagai salah satu indikator ekologi pada ekosistem terumbu karang. Ringkasan ini menyoroti bagaimana tutupan karang hidup berkaitan dengan keanekaragaman dan kelimpahan ikan tersebut di Pulau Weh, Sabang. Pesan utamanya adalah bahwa kondisi habitat bentik berperan penting dalam mendukung komunitas ikan karang.'
  },
  {
    category: 'Ikan Karang',
    title: 'Hubungan Ikan Karang, Karang, dan Turf Algae Menggambarkan Dinamika Ekosistem Terumbu di Biak',
    body: 'Ekosistem terumbu karang tidak hanya ditentukan oleh karang hidup, tetapi juga oleh komponen lain seperti turf algae dan komunitas ikan karang. Ringkasan riset ini memperkenalkan cara membaca hubungan antar-komponen ekosistem di Pulau Biak, Papua, sehingga pembaca dapat memahami dinamika habitat dan komunitas ikan dalam konteks kesehatan terumbu.'
  },
  {
    category: 'Resiliensi Ekosistem',
    title: 'Terumbu Karang dan Ikan Karang di Kepulauan Nias Menunjukkan Ketahanan Pasca Gempa Besar',
    body: 'Bencana gempa dapat mengubah struktur habitat laut dan memengaruhi komunitas ikan karang. Ringkasan populer ini menjelaskan bagaimana penelitian di Kepulauan Nias menilai resiliensi ikan karang setelah gempa signifikan. Tema ini penting karena menunjukkan bahwa pemantauan pascabencana perlu mencakup respons biologis dan kondisi habitat secara bersamaan.'
  },
  {
    category: 'Rekrutmen Karang',
    title: 'Sebaran Karang Muda di Pesisir dan Pulau-Pulau Kecil Sumatra Mengungkap Potensi Pemulihan Terumbu',
    body: 'Karang muda atau juvenile coral merupakan indikator penting untuk memahami proses regenerasi terumbu. Ringkasan ini membahas bagaimana pola sebaran spasial juvenile coral di pesisir dan pulau-pulau kecil Sumatra dapat memberikan gambaran awal tentang potensi pemulihan ekosistem terumbu karang setelah tekanan lingkungan.'
  },
  {
    category: 'Kesehatan Terumbu',
    title: 'Indeks Kesehatan Terumbu Karang Pengudang Menjadi Dasar Penting Pengelolaan Ekosistem Bintan',
    body: 'Coral Reef Health Index membantu menyederhanakan informasi ekologi yang kompleks menjadi indikator yang lebih mudah dipakai dalam pemantauan dan pengelolaan. Ringkasan ini menyoroti pentingnya indeks kesehatan terumbu di kawasan Pengudang, Bintan, sebagai dasar komunikasi ilmiah untuk konservasi, pemantauan, dan kebijakan pesisir.'
  }
];

const modal = document.querySelector('#news-modal');
const modalCategory = document.querySelector('#modal-category');
const modalTitle = document.querySelector('#modal-title');
const modalBody = document.querySelector('#modal-body');
let lastFocusedElement = null;

function openModal(index) {
  const item = newsItems[index];
  if (!item || !modal) return;
  lastFocusedElement = document.activeElement;
  modalCategory.textContent = item.category;
  modalTitle.textContent = item.title;
  modalBody.textContent = item.body;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  modal.querySelector('.modal-close')?.focus();
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  lastFocusedElement?.focus?.();
}

document.querySelectorAll('.news-card').forEach(card => {
  card.addEventListener('click', () => openModal(Number(card.dataset.news)));
  card.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openModal(Number(card.dataset.news));
    }
  });
  card.setAttribute('tabindex', '0');
  card.setAttribute('role', 'button');
});

document.querySelectorAll('[data-close-modal]').forEach(el => el.addEventListener('click', closeModal));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && modal?.classList.contains('open')) closeModal();
});

// ===== Enhancement v4: Google Drive Evidence Vault =====
// Setelah Google Apps Script Web App dibuat, paste URL Web App di sini.
const GOOGLE_DRIVE_WEB_APP_URL = 'https://script.google.com/a/macros/umrah.ac.id/s/AKfycbyz7hHqhPYniC74prZEuroG9we6HuDMb-uD4XimmtQwl23tjAF9CaGdNKxQ645EnuXr/exec';
const GOOGLE_DRIVE_ROOT_FOLDER_ID = '1vip7Umt05FHs7W9imowff_joqUNXGAmI';

const evidenceCategories = {
  pendidikan: { label: 'Pendidikan & Pengajaran', icon: '🎓', folder: '01 Pendidikan dan Pengajaran' },
  penelitian: { label: 'Penelitian & Publikasi', icon: '🔬', folder: '02 Penelitian dan Publikasi' },
  pengabdian: { label: 'Pengabdian kepada Masyarakat', icon: '🤝', folder: '03 Pengabdian kepada Masyarakat' },
  penunjang: { label: 'Penunjang Akademik', icon: '📌', folder: '04 Penunjang Akademik' },
  rekognisi: { label: 'Rekognisi & Prestasi', icon: '🏅', folder: '05 Rekognisi dan Prestasi' },
  hki: { label: 'HKI, Buku & Luaran Tambahan', icon: '📚', folder: '06 HKI Buku dan Luaran Tambahan' },
  pendukung: { label: 'Dokumen Pendukung', icon: '🗂️', folder: '07 Dokumen Pendukung' }
};

const evidenceChecklist = [
  { key: 'pendidikan-sk-mengajar', category: 'pendidikan', title: 'SK Mengajar / Surat Tugas Mengajar', year: '2026', meta: 'Dokumen dasar pelaksanaan pendidikan dan pengajaran.' },
  { key: 'pendidikan-rps', category: 'pendidikan', title: 'RPS / Rencana Pembelajaran Semester', year: '2026', meta: 'Rencana pembelajaran, CPMK, materi, metode, dan evaluasi.' },
  { key: 'pendidikan-bahan-ajar', category: 'pendidikan', title: 'Bahan Ajar / Modul / Slide Kuliah', year: '2026', meta: 'Materi pembelajaran yang digunakan pada mata kuliah.' },
  { key: 'pendidikan-pembimbingan', category: 'pendidikan', title: 'Bukti Pembimbingan Mahasiswa', year: '2026', meta: 'Pembimbing skripsi, tugas akhir, kerja praktik, atau riset mahasiswa.' },
  { key: 'pendidikan-penguji', category: 'pendidikan', title: 'Bukti Penguji / Seminar Akademik', year: '2026', meta: 'Berita acara, surat tugas, undangan, atau sertifikat penguji.' },
  { key: 'pendidikan-inovasi', category: 'pendidikan', title: 'Inovasi Pembelajaran / Praktikum', year: '2026', meta: 'Pengembangan metode, praktikum, instrumen, atau rubrik.' },

  { key: 'penelitian-artikel-jurnal', category: 'penelitian', title: 'Artikel Jurnal Ilmiah', year: '2026', meta: 'Artikel SINTA, Scopus, WoS, nasional, atau internasional.' },
  { key: 'penelitian-prosiding', category: 'penelitian', title: 'Prosiding Seminar / Konferensi', year: '2026', meta: 'Makalah konferensi, prosiding, sertifikat presenter.' },
  { key: 'penelitian-hibah', category: 'penelitian', title: 'SK / Kontrak Hibah Penelitian', year: '2026', meta: 'Dokumen hibah, kontrak, surat keputusan, atau penugasan.' },
  { key: 'penelitian-laporan', category: 'penelitian', title: 'Laporan Penelitian', year: '2026', meta: 'Laporan akhir, laporan kemajuan, logbook, atau data pendukung.' },
  { key: 'penelitian-dataset', category: 'penelitian', title: 'Dataset / Kode Analisis / Output Model', year: '2026', meta: 'Dataset riset, script, peta, model, atau visualisasi ilmiah.' },
  { key: 'penelitian-kolaborasi', category: 'penelitian', title: 'Bukti Kolaborasi Riset', year: '2026', meta: 'MoU, surat undangan, email resmi, atau dokumen kerja sama.' },

  { key: 'pengabdian-sk', category: 'pengabdian', title: 'SK / Surat Tugas Pengabdian', year: '2026', meta: 'Bukti penugasan kegiatan pengabdian kepada masyarakat.' },
  { key: 'pengabdian-laporan', category: 'pengabdian', title: 'Laporan Pengabdian kepada Masyarakat', year: '2026', meta: 'Laporan kegiatan, capaian, sasaran, dan luaran pengabdian.' },
  { key: 'pengabdian-dokumentasi', category: 'pengabdian', title: 'Dokumentasi Kegiatan Pengabdian', year: '2026', meta: 'Foto, daftar hadir, berita acara, dan dokumentasi lapangan.' },
  { key: 'pengabdian-sertifikat', category: 'pengabdian', title: 'Sertifikat / Surat Keterangan Pengabdian', year: '2026', meta: 'Sertifikat narasumber, pendamping, atau pelaksana kegiatan.' },
  { key: 'pengabdian-luaran', category: 'pengabdian', title: 'Luaran Pengabdian / Media / Modul', year: '2026', meta: 'Modul, artikel populer, media coverage, atau policy brief.' },

  { key: 'penunjang-seminar', category: 'penunjang', title: 'Sertifikat Seminar / Workshop / Pelatihan', year: '2026', meta: 'Sertifikat sebagai peserta, pembicara, moderator, atau panitia.' },
  { key: 'penunjang-reviewer', category: 'penunjang', title: 'Reviewer Jurnal / Editor / Dewan Redaksi', year: '2026', meta: 'Bukti reviewer, editor, editorial board, atau peer-review.' },
  { key: 'penunjang-narasumber', category: 'penunjang', title: 'Narasumber / Moderator / Fasilitator', year: '2026', meta: 'Surat undangan, sertifikat, atau surat tugas kegiatan.' },
  { key: 'penunjang-organisasi', category: 'penunjang', title: 'Organisasi Profesi / Kepanitiaan Akademik', year: '2026', meta: 'SK organisasi, kepanitiaan, atau kontribusi institusional.' },
  { key: 'penunjang-surat-tugas', category: 'penunjang', title: 'Surat Tugas Penunjang Akademik', year: '2026', meta: 'Penugasan internal/eksternal yang mendukung kinerja dosen.' },

  { key: 'rekognisi-penghargaan', category: 'rekognisi', title: 'Penghargaan / Prestasi Akademik', year: '2026', meta: 'Penghargaan, rekognisi, atau capaian profesional.' },
  { key: 'rekognisi-invited-speaker', category: 'rekognisi', title: 'Invited Speaker / Keynote / Visiting Lecturer', year: '2026', meta: 'Undangan dan bukti kontribusi pada forum akademik.' },
  { key: 'rekognisi-sitasi', category: 'rekognisi', title: 'Bukti Sitasi / H-Index / Metrik Akademik', year: '2026', meta: 'Tangkapan layar atau rekap metrik Scholar, SINTA, Scopus.' },
  { key: 'rekognisi-media', category: 'rekognisi', title: 'Media Coverage / Publikasi Populer', year: '2026', meta: 'Liputan media, artikel populer, podcast, atau wawancara.' },

  { key: 'hki-hak-cipta', category: 'hki', title: 'Hak Cipta / HKI', year: '2026', meta: 'Sertifikat hak cipta, paten, atau kekayaan intelektual.' },
  { key: 'hki-buku', category: 'hki', title: 'Buku / Monograf / Book Chapter', year: '2026', meta: 'Buku ajar, referensi, monograf, atau chapter akademik.' },
  { key: 'hki-panduan', category: 'hki', title: 'Panduan Teknis / Policy Brief / Produk Riset', year: '2026', meta: 'Luaran tambahan berbasis riset dan diseminasi ilmiah.' },
  { key: 'hki-software', category: 'hki', title: 'Software / Model / Perangkat Analisis', year: '2026', meta: 'Aplikasi, model, script, atau alat bantu analisis data.' },

  { key: 'pendukung-cv', category: 'pendukung', title: 'CV Akademik Terbaru', year: '2026', meta: 'Curriculum vitae akademik untuk kebutuhan portofolio.' },
  { key: 'pendukung-sk-jabatan', category: 'pendukung', title: 'SK Jabatan Akademik / SK Pangkat', year: '2026', meta: 'Dokumen pendukung karier dan jabatan akademik.' },
  { key: 'pendukung-sertifikat-pendidik', category: 'pendukung', title: 'Sertifikat Pendidik / Dokumen Profesional', year: '2026', meta: 'Sertifikat pendidik atau dokumen profesi terkait.' },
  { key: 'pendukung-bkd', category: 'pendukung', title: 'BKD / LKD / Rekap Kinerja Dosen', year: '2026', meta: 'Rekap beban kerja dosen dan laporan kinerja.' },
  { key: 'pendukung-sister', category: 'pendukung', title: 'SISTER / SINTA / Scopus Supporting Evidence', year: '2026', meta: 'Tangkapan layar, rekap data, dan bukti pendukung database.' }
];

const evidenceState = {
  activeCategory: 'all',
  query: '',
  year: 'all',
  uploaded: new Map()
};

function getLocalUploadedEvidence() {
  try {
    const raw = localStorage.getItem('risandiEvidenceUploaded') || '{}';
    return JSON.parse(raw);
  } catch (_) {
    return {};
  }
}

function saveLocalUploadedEvidence(data) {
  localStorage.setItem('risandiEvidenceUploaded', JSON.stringify(data));
}

function hydrateUploadedMap() {
  evidenceState.uploaded.clear();
  const local = getLocalUploadedEvidence();
  Object.entries(local).forEach(([key, value]) => evidenceState.uploaded.set(key, value));
}

function setUploadMessage(message, type = '') {
  const el = document.querySelector('#upload-message');
  if (!el) return;
  el.textContent = message;
  el.classList.remove('error', 'success');
  if (type) el.classList.add(type);
}

function renderEvidenceTable() {
  const tbody = document.querySelector('#evidence-table-body');
  if (!tbody) return;

  const filtered = evidenceChecklist.filter(item => {
    const categoryMatch = evidenceState.activeCategory === 'all' || item.category === evidenceState.activeCategory;
    const yearMatch = evidenceState.year === 'all' || item.year === evidenceState.year;
    const q = evidenceState.query.toLowerCase().trim();
    const text = `${item.title} ${item.meta} ${evidenceCategories[item.category]?.label || ''}`.toLowerCase();
    return categoryMatch && yearMatch && (!q || text.includes(q));
  });

  if (!filtered.length) {
    tbody.innerHTML = '<tr><td colspan="5">Tidak ada dokumen yang cocok dengan filter.</td></tr>';
    updateEvidenceCounters();
    return;
  }

  tbody.innerHTML = filtered.map(item => {
    const cat = evidenceCategories[item.category];
    const uploaded = evidenceState.uploaded.get(item.key);
    const status = uploaded
      ? '<span class="status-pill uploaded">✓ Sudah diupload</span>'
      : '<span class="status-pill pending">○ Belum diupload</span>';
    const driveLink = uploaded?.url
      ? `<a href="${uploaded.url}" target="_blank" rel="noopener">Buka Drive</a>`
      : '';
    return `
      <tr>
        <td><span class="category-chip">${cat.icon} ${cat.label}</span></td>
        <td><span class="doc-title">${item.title}</span><span class="doc-meta">${item.meta}${uploaded?.fileName ? `<br>File: ${uploaded.fileName}` : ''}</span></td>
        <td>${uploaded?.year || item.year}</td>
        <td>${status}</td>
        <td><div class="row-actions"><button type="button" data-upload-for="${item.key}">Upload</button>${driveLink}</div></td>
      </tr>`;
  }).join('');

  document.querySelectorAll('[data-upload-for]').forEach(btn => {
    btn.addEventListener('click', () => prefillUploadForm(btn.dataset.uploadFor));
  });

  updateEvidenceCounters();
}

function updateEvidenceCounters() {
  const total = evidenceChecklist.length;
  const uploadedCount = evidenceChecklist.filter(item => evidenceState.uploaded.has(item.key)).length;
  const pending = total - uploadedCount;
  const totalEl = document.querySelector('#evidence-total');
  const uploadedEl = document.querySelector('#evidence-uploaded');
  const pendingEl = document.querySelector('#evidence-pending');
  const statusEl = document.querySelector('#drive-status');
  if (totalEl) totalEl.textContent = total;
  if (uploadedEl) uploadedEl.textContent = uploadedCount;
  if (pendingEl) pendingEl.textContent = pending;
  if (statusEl) statusEl.textContent = GOOGLE_DRIVE_WEB_APP_URL ? 'Aktif' : 'Setup';
}

function prefillUploadForm(itemKey) {
  const item = evidenceChecklist.find(row => row.key === itemKey);
  const form = document.querySelector('#drive-upload-form');
  if (!item || !form) return;
  form.category.value = item.category;
  form.documentTitle.value = item.title;
  form.year.value = item.year;
  form.itemKey.value = item.key;
  form.output.value = item.title.split('/')[0].trim();
  document.querySelector('#upload-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  form.evidenceFile?.focus?.();
  setUploadMessage(`Siap upload untuk: ${item.title}`, 'success');
}

function initEvidenceVault() {
  hydrateUploadedMap();
  renderEvidenceTable();

  document.querySelectorAll('.vault-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.vault-tab').forEach(el => el.classList.remove('active'));
      tab.classList.add('active');
      evidenceState.activeCategory = tab.dataset.category || 'all';
      renderEvidenceTable();
    });
  });

  document.querySelector('#evidence-search')?.addEventListener('input', event => {
    evidenceState.query = event.target.value || '';
    renderEvidenceTable();
  });

  document.querySelector('#evidence-year-filter')?.addEventListener('change', event => {
    evidenceState.year = event.target.value || 'all';
    renderEvidenceTable();
  });

  document.querySelector('[data-open-upload]')?.addEventListener('click', () => {
    document.querySelector('#upload-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  document.querySelector('[data-refresh-drive]')?.addEventListener('click', () => refreshDriveStatus());

  document.querySelector('[data-copy-folder-id]')?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(GOOGLE_DRIVE_ROOT_FOLDER_ID);
      setUploadMessage('Folder ID Google Drive berhasil disalin.', 'success');
    } catch (_) {
      setUploadMessage(`Folder ID: ${GOOGLE_DRIVE_ROOT_FOLDER_ID}`, 'success');
    }
  });

  document.querySelector('#drive-upload-form')?.addEventListener('submit', handleDriveUpload);

  if (GOOGLE_DRIVE_WEB_APP_URL) refreshDriveStatus();
}

async function handleDriveUpload(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const file = form.evidenceFile?.files?.[0];
  if (!file) {
    setUploadMessage('Pilih file dokumen terlebih dahulu.', 'error');
    return;
  }
  if (file.size > 12 * 1024 * 1024) {
    setUploadMessage('Ukuran file disarankan maksimal 12 MB untuk upload via Apps Script. Kompres PDF/ZIP jika perlu.', 'error');
    return;
  }
  if (!GOOGLE_DRIVE_WEB_APP_URL) {
    setUploadMessage('Integrasi belum aktif. Buat Google Apps Script Web App, lalu paste URL-nya di script.js pada variabel GOOGLE_DRIVE_WEB_APP_URL.', 'error');
    return;
  }

  const itemKey = form.itemKey.value || makeEvidenceKey(form.category.value, form.documentTitle.value);
  setUploadMessage('Membaca file dan mengirim ke Google Drive...', 'success');

  try {
    const base64 = await readFileAsBase64(file);
    postToAppsScript({
      accessCode: form.accessCode.value,
      category: form.category.value,
      categoryLabel: evidenceCategories[form.category.value]?.label || form.category.value,
      folderName: evidenceCategories[form.category.value]?.folder || form.category.value,
      itemKey,
      documentTitle: form.documentTitle.value,
      year: form.year.value,
      documentStatus: form.documentStatus.value,
      role: form.role.value,
      output: form.output.value,
      fileName: file.name,
      mimeType: file.type || 'application/octet-stream',
      fileBase64: base64
    });

    const local = getLocalUploadedEvidence();
    local[itemKey] = {
      fileName: file.name,
      year: form.year.value,
      category: form.category.value,
      uploadedAt: new Date().toISOString(),
      url: ''
    };
    saveLocalUploadedEvidence(local);
    hydrateUploadedMap();
    renderEvidenceTable();
    setUploadMessage('Permintaan upload dikirim. Tunggu beberapa detik, lalu klik Refresh Status untuk sinkronisasi Google Drive.', 'success');
    form.reset();
    form.year.value = new Date().getFullYear();
  } catch (error) {
    setUploadMessage(`Upload gagal diproses: ${error.message}`, 'error');
  }
}

function readFileAsBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(',')[1] || '');
    reader.onerror = () => reject(new Error('File tidak bisa dibaca.'));
    reader.readAsDataURL(file);
  });
}

function postToAppsScript(payload) {
  const iframeName = 'drive-upload-frame';
  let iframe = document.querySelector(`iframe[name="${iframeName}"]`);
  if (!iframe) {
    iframe = document.createElement('iframe');
    iframe.name = iframeName;
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
  }

  const form = document.createElement('form');
  form.method = 'POST';
  form.action = GOOGLE_DRIVE_WEB_APP_URL;
  form.target = iframeName;
  form.style.display = 'none';

  Object.entries(payload).forEach(([key, value]) => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = key;
    input.value = value ?? '';
    form.appendChild(input);
  });

  document.body.appendChild(form);
  form.submit();
  setTimeout(() => form.remove(), 1000);
}

function refreshDriveStatus() {
  if (!GOOGLE_DRIVE_WEB_APP_URL) {
    setUploadMessage('Status lokal ditampilkan. Integrasi Google Drive belum aktif karena URL Apps Script belum diisi.', 'error');
    hydrateUploadedMap();
    renderEvidenceTable();
    return;
  }

  const callbackName = `drivePortfolioCallback_${Date.now()}`;
  window[callbackName] = (response) => {
    try {
      if (response?.success && Array.isArray(response.files)) {
        const local = getLocalUploadedEvidence();
        response.files.forEach(file => {
          if (file.itemKey) {
            local[file.itemKey] = {
              fileName: file.name,
              year: file.year || '',
              category: file.category || '',
              uploadedAt: file.uploadedAt || file.updatedAt || '',
              url: file.url || ''
            };
          }
        });
        saveLocalUploadedEvidence(local);
        hydrateUploadedMap();
        renderEvidenceTable();
        setUploadMessage('Status Google Drive berhasil diperbarui.', 'success');
      } else {
        setUploadMessage('Belum bisa membaca status dari Google Drive. Cek deployment Apps Script dan kode folder.', 'error');
      }
    } finally {
      delete window[callbackName];
      document.querySelector(`#${callbackName}`)?.remove();
    }
  };

  const url = new URL(GOOGLE_DRIVE_WEB_APP_URL);
  url.searchParams.set('action', 'list');
  url.searchParams.set('callback', callbackName);
  const script = document.createElement('script');
  script.id = callbackName;
  script.src = url.toString();
  script.onerror = () => {
    setUploadMessage('Gagal memanggil Apps Script. Pastikan Web App dapat diakses oleh Anyone with the link.', 'error');
    delete window[callbackName];
    script.remove();
  };
  document.body.appendChild(script);
}

function makeEvidenceKey(category, title) {
  const slug = String(title || 'dokumen')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 70);
  return `${category}-${slug || Date.now()}`;
}

initEvidenceVault();

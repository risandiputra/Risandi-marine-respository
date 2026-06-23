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


// ===== Enhancement v11: Infografis Science filters only =====
document.querySelectorAll('.science-filter').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.science-filter').forEach(el => el.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.scienceFilter || 'all';
    document.querySelectorAll('.infographic-card').forEach(card => {
      const categories = card.dataset.scienceCategory || '';
      const visible = filter === 'all' || categories.includes(filter);
      card.style.display = visible ? '' : 'none';
    });
  });
});


// ===== V12: Simple Google Drive Upload Menu =====
const DRIVE_UPLOAD_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbwdEPJtxSNQSys0MuIeVjAwSKMGyRRrCGfpmUxIQ3C5kjbwJtr-Hq4deMWlTV445YOQ/exec';
const DRIVE_ROOT_FOLDER_ID = '1vip7Umt05FHs7W9imowff_joqUNXGAmI';
const DRIVE_CATEGORY_LABELS = {
  pendidikan: 'Pendidikan & Pengajaran',
  penelitian: 'Penelitian & Publikasi',
  pengabdian: 'Pengabdian kepada Masyarakat',
  penunjang: 'Penunjang Akademik',
  rekognisi: 'Rekognisi & Prestasi',
  hki: 'HKI, Buku & Luaran Tambahan',
  pendukung: 'Dokumen Pendukung'
};
const DRIVE_CATEGORY_FOLDERS = {
  pendidikan: '01 Pendidikan dan Pengajaran',
  penelitian: '02 Penelitian dan Publikasi',
  pengabdian: '03 Pengabdian kepada Masyarakat',
  penunjang: '04 Penunjang Akademik',
  rekognisi: '05 Rekognisi dan Prestasi',
  hki: '06 HKI Buku dan Luaran Tambahan',
  pendukung: '07 Dokumen Pendukung'
};

function setDriveUploadMessage(message, type = 'success') {
  const el = document.querySelector('#upload-message');
  if (!el) return;
  el.textContent = message;
  el.classList.remove('success', 'error');
  el.classList.add(type);
}

function readDriveFileAsBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(',')[1] || '');
    reader.onerror = () => reject(new Error('File tidak bisa dibaca.'));
    reader.readAsDataURL(file);
  });
}

function makeDriveItemKey(category, title) {
  const slug = String(title || 'dokumen')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 70);
  return `${category}-${slug || Date.now()}`;
}

async function handleSimpleDriveUpload(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const file = form.elements.evidenceFile?.files?.[0];

  if (!DRIVE_UPLOAD_WEB_APP_URL) {
    setDriveUploadMessage('Integrasi Google Drive belum aktif. URL Apps Script belum dipasang.', 'error');
    return;
  }
  if (!file) {
    setDriveUploadMessage('Pilih file dokumen terlebih dahulu.', 'error');
    return;
  }
  if (file.size > 12 * 1024 * 1024) {
    setDriveUploadMessage('Ukuran file disarankan maksimal 12 MB. Kompres PDF/ZIP jika file terlalu besar.', 'error');
    return;
  }

  const category = form.elements.category.value;
  const documentTitle = form.elements.documentTitle.value;
  const year = String(form.elements.year.value || new Date().getFullYear());

  setDriveUploadMessage('Membaca file dan mengirim ke Google Drive. Mohon tunggu...', 'success');

  try {
    const fileBase64 = await readDriveFileAsBase64(file);
    await submitDrivePayloadSilently({
      accessCode: form.elements.accessCode.value,
      category,
      categoryLabel: DRIVE_CATEGORY_LABELS[category] || category,
      folderName: DRIVE_CATEGORY_FOLDERS[category] || category,
      itemKey: form.elements.itemKey.value || makeDriveItemKey(category, documentTitle),
      documentTitle,
      year,
      documentStatus: form.elements.documentStatus.value,
      role: form.elements.role.value,
      output: form.elements.output.value,
      fileName: file.name,
      mimeType: file.type || 'application/octet-stream',
      fileBase64
    });

    setDriveUploadMessage('Upload sudah dikirim ke Google Drive. Silakan cek folder Drive; file biasanya muncul dalam beberapa detik.', 'success');
    form.reset();
    form.elements.year.value = new Date().getFullYear();
  } catch (error) {
    setDriveUploadMessage(`Upload gagal: ${error.message}`, 'error');
  }
}

function submitDrivePayloadSilently(payload) {
  return new Promise((resolve, reject) => {
    const iframeName = `drive-upload-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const iframe = document.createElement('iframe');
    iframe.name = iframeName;
    iframe.style.display = 'none';
    document.body.appendChild(iframe);

    const uploadForm = document.createElement('form');
    uploadForm.method = 'POST';
    uploadForm.action = DRIVE_UPLOAD_WEB_APP_URL;
    uploadForm.target = iframeName;
    uploadForm.style.display = 'none';

    Object.entries(payload).forEach(([key, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = value ?? '';
      uploadForm.appendChild(input);
    });

    let done = false;
    const cleanup = () => {
      setTimeout(() => {
        uploadForm.remove();
        iframe.remove();
      }, 900);
    };

    iframe.addEventListener('load', () => {
      if (done) return;
      done = true;
      cleanup();
      resolve({ success: true });
    });

    document.body.appendChild(uploadForm);
    uploadForm.submit();

    setTimeout(() => {
      if (done) return;
      done = true;
      cleanup();
      resolve({ success: true });
    }, 10000);
  });
}

document.querySelector('#drive-upload-form')?.addEventListener('submit', handleSimpleDriveUpload);
document.querySelector('[data-open-upload]')?.addEventListener('click', () => {
  document.querySelector('#upload-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
});
document.querySelector('[data-copy-folder-id]')?.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(DRIVE_ROOT_FOLDER_ID);
    setDriveUploadMessage('Folder ID Google Drive berhasil disalin.', 'success');
  } catch (_) {
    setDriveUploadMessage(`Folder ID: ${DRIVE_ROOT_FOLDER_ID}`, 'success');
  }
});

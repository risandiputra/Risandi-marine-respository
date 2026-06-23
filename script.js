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
    "category": "Terumbu Karang",
    "title": "Rahasia Ikan Kepe-Kepe di Ujung Timur Nusantara: Cerita dari Pulau Liki, Bepondi, dan Miossu",
    "body": "Di jantung Coral Triangle, wilayah yang dikenal sebagai pusat keanekaragaman hayati laut dunia, terdapat pulau-pulau terluar Papua yang menyimpan kekayaan tersembunyi. Penelitian terbaru mengungkap bahwa Pulau Liki, Bepondi, dan Miossu menjadi rumah bagi 30 spesies ikan Kepe-kepe (Chaetodontidae). Ikan yang berwarna-warni ini bukan sekadar penghias terumbu, melainkan indikator penting kesehatan karang. Menariknya, para peneliti menemukan bahwa kelimpahan ikan di tiap pulau tidaklah sama. Pulau Liki dan Miossu memiliki jumlah ikan jauh lebih banyak dibandingkan Pulau Bepondi. Rahasianya terletak pada bentuk pulau; Liki dan Miossu adalah \"Pulau Tinggi\" yang memiliki lereng terumbu yang curam dan kompleks, sehingga menyediakan lebih banyak \"kamar\" atau ceruk bagi ikan untuk tinggal. Sebaliknya, Bepondi yang cenderung datar memiliki variasi habitat yang lebih terbatas. Selain faktor alam, kearifan lokal seperti Sasi—sistem adat yang mengatur waktu penangkapan ikan—terbukti ampuh menjaga populasi ikan ini tetap lestari di tengah ancaman perubahan iklim\n\nSumber publikasi: Butterflyfish (Chaetodontidae) Species in Three Small Outer Islands of Papua, Indonesia (Liki, Bepondi and Miossu)."
  },
  {
    "category": "Ikan Karang",
    "title": "Alarm Ekosistem di Pulau Biak: Saat Alga Mulai Mengambil Alih Rumah Karang",
    "body": "Ekosistem terumbu karang di Pulau Biak, Papua, sedang menghadapi tantangan besar. Berdasarkan survei di 14 titik pengamatan, ditemukan fenomena yang mengkhawatirkan: alga turf (alga pendek yang menutupi karang mati) kini lebih mendominasi dibandingkan karang keras. Rata-rata tutupan alga mencapai 42,1%, sementara karang keras hanya tersisa 26,1%. Kondisi ini ibarat \"rumput liar\" yang mengambil alih kebun; semakin sedikit karang yang hidup, semakin luas alga turf menyebar. Dampaknya sangat serius karena alga ini memerangkap sedimen dan menghalangi bayi-bayi karang untuk menempel dan tumbuh. Dalam kondisi ini, ikan herbivora (pemakan alga) menjadi pahlawan yang sangat krusial. Mereka berperan sebagai \"tukang kebun\" yang memangkas alga agar karang memiliki ruang untuk bernapas dan pulih kembali. Perlindungan terhadap ikan-ikan pemakan alga ini menjadi kunci utama jika kita ingin melihat terumbu karang Biak kembali sehat\n\nSumber publikasi: The Relationship Between Reef Fish and Coverage of Coral and Turf Algae in Coral Reef Ecosystems of Biak Island, Papua."
  },
  {
    "category": "Resiliensi Ekosistem",
    "title": "Ketangguhan Ikan Karang Nias: Bertahan di Tengah Bencana Gempa Hebat",
    "body": "Gempa bumi dahsyat yang mengguncang Kepulauan Nias pada tahun 2005 tidak hanya mengubah peta geologi, tetapi juga mengangkat dasar laut setinggi 1 hingga 2 meter. Akibatnya, banyak terumbu karang yang terangkat ke permukaan dan mati seketika; tutupan karang hidup pun anjlok drastis dari 48,45% menjadi hanya 20,45%. Namun, ada kabar mengejutkan dari dunia bawah laut: kelimpahan ikan terumbu karang ternyata tidak menunjukkan penurunan yang signifikan secara statistik. Meski rumah mereka rusak berat, komunitas ikan menunjukkan tingkat resiliensi atau ketangguhan yang luar biasa. Kelompok ikan herbivora segera mengambil peran penting pasca-bencana dengan membersihkan karang-karang mati dari lumut, sehingga membantu proses pemulihan ekosistem secara alami. Fenomena di Nias ini mengajarkan kita bahwa alam memiliki mekanisme pemulihan yang kuat, asalkan populasi ikan fungsionalnya tetap dijaga dari tekanan manusia\n\nSumber publikasi: Reef fish resilience following a significant earthquake disaster in the Nias Islands, Indonesia."
  },
  {
    "category": "Urban Reef Ecology",
    "title": "\"Ecological Decoupling\" di Kepulauan Seribu: Mengapa Dekat Jakarta Ikannya Berbeda?",
    "body": "Sebuah studi mendalam di Kepulauan Seribu mengungkap fenomena unik yang disebut \"Ecological Decoupling\" atau ketidaksinkronan ekologis. Umumnya, kita berpikir bahwa semakin banyak karang, semakin banyak pula ikan yang ada. Namun, di pulau-pulau yang dekat dengan Jakarta, asumsi ini tidak sepenuhnya berlaku. Meskipun beberapa lokasi dekat Jakarta memiliki tutupan karang yang cukup tinggi (didominasi jenis Acropora yang tumbuh cepat), mereka gagal mendukung kelimpahan ikan spesialis seperti ikan korallivora (pemakan karang). Hal ini terjadi karena tekanan polusi dan sedimentasi yang kronis dari megacity Jakarta mengganggu keseimbangan alami. Sebaliknya, semakin jauh jarak pulau dari Teluk Jakarta, jumlah ikan korallivora meningkat secara signifikan karena lingkungan yang lebih bersih dan stabil. Penelitian ini menekankan bahwa untuk menyelamatkan Kepulauan Seribu, kita tidak bisa hanya fokus pada penanaman karang, tetapi juga harus secara serius mengatasi polusi dari daratan.\n\nSumber publikasi: Spatial variation in coral reef condition and reef fish assemblages along a proximity to Jakarta Bay, Indonesia."
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


// ===== V13: Science News + Infografis content update =====
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

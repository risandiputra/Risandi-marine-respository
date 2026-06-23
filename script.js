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

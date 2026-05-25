const categories = [
  { label:'Hajat', randomIcon:'✦', icon:`<svg viewBox="0 0 64 64" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 45c-4-4-5-11-3-17 1-4 4-6 7-6 4 0 6 3 7 8l1 7 1-7c1-5 3-8 7-8 3 0 6 2 7 6 2 6 1 13-3 17"/><path d="M23 46c3 4 6 6 9 6s7-2 10-6"/><path d="M32 15V7M24 17l-3-6M40 17l3-6M17 25l-7-2M47 25l7-2M18 34l-6 4M46 34l6 4"/></g></svg>` },
  { label:'Hukum Mahkamah', randomIcon:'☬', icon:`<svg viewBox="0 0 64 64" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M32 9v38M21 15h22M17 23l11-7M47 23l-11-7"/><path d="M17 23L8 37h18zM47 23l-9 14h18z"/><path d="M22 53h20M26 47h12"/></g></svg>` },
  { label:'Kehamilan', randomIcon:'❁', icon:`<svg viewBox="0 0 64 64" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="28" cy="12" r="5"/><path d="M24 21c5-3 12-2 16 3 4 5 5 10 2 16-2 4-1 8 1 12"/><path d="M24 23c-6 4-9 11-7 18 2 7 7 11 14 12"/><path d="M29 30c8-2 15 4 15 11 0 6-5 10-13 10-7 0-12-4-12-10 0-6 4-10 10-11z"/><path d="M22 50l-4 7M38 52l2 6"/></g></svg>` },
  { label:'Kehilangan', randomIcon:'◈', icon:`<svg viewBox="0 0 64 64" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="25" cy="25" r="12"/><path d="M34 34l10 10"/><path d="M43 38h8l3 5-2 11H40l-2-11 5-5z"/><path d="M44 38c0-2 2-4 3-4s3 2 3 4"/></g></svg>` },
  { label:'Kekuasaan', randomIcon:'♕', icon:`<svg viewBox="0 0 64 64" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 44l4-18 10 8 6-15 6 15 10-8 4 18z"/><path d="M16 44h32M20 51h24"/><circle cx="16" cy="26" r="2.5"/><circle cx="32" cy="19" r="2.5"/><circle cx="48" cy="26" r="2.5"/></g></svg>` },
  { label:'Pernikahan', randomIcon:'❦', icon:`<svg viewBox="0 0 64 64" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="25" cy="36" r="11"/><circle cx="39" cy="36" r="11"/><path d="M32 17c0-4 3-7 7-7 3 0 5 2 5 5 0 5-5 8-12 14-7-6-12-9-12-14 0-3 2-5 5-5 4 0 7 3 7 7z"/></g></svg>` },
  { label:'Rumah', randomIcon:'⌂', icon:`<svg viewBox="0 0 64 64" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M10 29l22-16 22 16"/><path d="M16 27v25h32V27"/><path d="M27 52V38h10v14"/><path d="M22 31h8v6h-8zM34 31h8v6h-8z"/></g></svg>` },
  { label:'Sakit', randomIcon:'✤', icon:`<svg viewBox="0 0 64 64" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M18 40c2 8 8 14 14 14s12-6 14-14c-8-3-20-3-28 0z"/><path d="M26 22h12M32 16v12"/><path d="M20 40h24"/></g></svg>` }
];

const fibonacciPool = ['1','2','3','5','8','13','21','34','55','89','144','233','377','610','987','1597','2584','4181','6765'];
const fibonacciMap = fibonacciPool.reduce((map, value, index) => {
  map[value] = (index + 1) % 2 === 1 ? '1' : '2';
  return map;
}, {});

const state = {
  urutanAktif: 0,
  interval: null,
  resetDisplayTimeout: null,
  randomValue: '1',
  nilai: Array(16).fill('')
};

function byId(id) {
  return document.getElementById(id);
}

function setText(id, text) {
  const el = byId(id);
  if (el) el.textContent = text;
}

function setDisabled(id, value) {
  const el = byId(id);
  if (el) el.disabled = value;
}

function displayRandomValue(value) {
  return value === '1' ? 'ا' : value;
}

function setRandomDisplay(value, showRawNumber = false) {
  const el = byId('randomDisplay');
  if (!el) return;
  el.textContent = showRawNumber ? value : displayRandomValue(value);
  el.classList.toggle('alif-symbol', !showRawNumber && value === '1');
}

function setRitualInstruction(type) {
  const el = byId('ritualInstruction');
  if (!el) return;
  const isShalawat = type === 'shalawat';
  el.classList.toggle('active-shalawat', isShalawat);
  el.innerHTML = isShalawat
    ? '<span class="ritual-arabic">اَللَّهُمَّ صَلِّ عَلٰى مُحَمَّدٍ وَعَلٰى آلِ مُحَمَّدٍ</span>'
    : '<span class="ritual-arabic">بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</span>';
}

function clearTimers() {
  clearInterval(state.interval);
  clearTimeout(state.resetDisplayTimeout);
  state.interval = null;
  state.resetDisplayTimeout = null;
  byId('randomDisplay')?.classList.remove('is-spinning');
}

function resetDisplayToAlifAfterDelay() {
  clearTimeout(state.resetDisplayTimeout);
  state.resetDisplayTimeout = setTimeout(() => {
    const randomScreen = byId('screenRandom');
    if (randomScreen?.classList.contains('active') && !state.interval) {
      setRandomDisplay('1');
    }
  }, 3000);
}

function showScreen(id) {
  document.querySelectorAll('.screen').forEach((screen) => {
    screen.classList.toggle('active', screen.id === id);
  });
}

function masukAplikasi() {
  showScreen('screenKategori');
}

function kembaliKeKategori() {
  clearTimers();
  showScreen('screenKategori');
}

function pilihKategori(label, icon) {
  setText('randomName', label);
  setText('randomIcon', icon);
  setText('resultCategoryName', label);
  ulangiKategori();
}

function updateRandomStatus() {
  const current = state.urutanAktif < 16 ? String(state.urutanAktif + 1) : '16';
  setText('currentOrderNumber', current);
  setText(
    'randomProgress',
    state.urutanAktif < 16
      ? `Mencari input urutan ${state.urutanAktif + 1}`
      : 'Semua urutan sudah terisi'
  );
}

function renderInputSummary() {
  const box = byId('resultInputSummary');
  if (!box) return;

  box.innerHTML = state.nilai.map((v, i) => {
    const symbol = v === '1'
      ? '<span class="syakal-dots" aria-label="nilai 1"><span class="syakal-dot"></span></span>'
      : v === '2'
        ? '<span class="syakal-dots" aria-label="nilai 2"><span class="syakal-dot"></span><span class="syakal-dot"></span></span>'
        : '-';

    return `
      <div class="input-pill">
        <span class="order">${i + 1}</span>
        <span class="value">${symbol}</span>
      </div>
    `;
  }).join('');
}

function renderHasil() {
  const container = byId('hasilContainer');
  if (!container) return;

  const jawaban = [
    'Hajat tercapai dengan susah payah',
    'Sempurna urusan tersebut',
    'Berhasil hajat atas orang tersebut'
  ];

  container.innerHTML = jawaban
    .map((text) => `<div class="result-card">${text}</div>`)
    .join('');
}

function ulangiKategori() {
  clearTimers();
  byId('randomDisplay')?.classList.remove('is-spinning');
  state.urutanAktif = 0;
  state.randomValue = '1';
  state.nilai.fill('');
  setRandomDisplay('1');
  setRitualInstruction('basmalah');
  setDisabled('btnMulai', false);
  setDisabled('btnStop', true);
  updateRandomStatus();
  renderInputSummary();
  showScreen('screenRandom');
}

function mulaiRandom() {
  if (state.urutanAktif >= 16) return;

  clearInterval(state.interval);
  clearTimeout(state.resetDisplayTimeout);
  state.resetDisplayTimeout = null;
  byId('randomDisplay')?.classList.add('is-spinning');

  setDisabled('btnMulai', true);
  setDisabled('btnStop', false);
  setRitualInstruction('shalawat');

  state.interval = setInterval(() => {
    state.randomValue = fibonacciPool[Math.floor(Math.random() * fibonacciPool.length)];
    setRandomDisplay(state.randomValue);
  }, 70);
}

function stopRandom() {
  if (!state.interval) return;

  clearInterval(state.interval);
  state.interval = null;

  byId('randomDisplay')?.classList.remove('is-spinning');
  setRandomDisplay(state.randomValue, true);
  const nilaiInput = fibonacciMap[state.randomValue] || '1';
  state.nilai[state.urutanAktif] = nilaiInput;
  state.urutanAktif += 1;

  setDisabled('btnMulai', state.urutanAktif >= 16);
  setDisabled('btnStop', true);
  updateRandomStatus();
  setRitualInstruction('basmalah');

  if (state.urutanAktif >= 16) {
    clearTimeout(state.resetDisplayTimeout);
    state.resetDisplayTimeout = null;
    renderHasil();
    renderInputSummary();
    showScreen('screenHasil');
  } else {
    resetDisplayToAlifAfterDelay();
  }
}

function printHasil() {
  if (document.querySelector('.screen.active')?.id !== 'screenHasil') {
    showScreen('screenHasil');
  }
  renderHasil();
  renderInputSummary();
  setTimeout(() => window.print(), 100);
}

function renderKategori() {
  const grid = byId('categoryGrid');
  if (!grid) return;

  grid.innerHTML = categories.map(({ label, icon, randomIcon }) => {
    const safeLabel = JSON.stringify(label);
    const safeIcon = JSON.stringify(randomIcon);
    return `
      <button class="category-card" type="button" onclick='pilihKategori(${safeLabel}, ${safeIcon})'>
        <div class="category-icon svg-icon">${icon}</div>
        <div class="category-label">${label}</div>
      </button>
    `;
  }).join('');
}

function attachGlobals() {
  window.masukAplikasi = masukAplikasi;
  window.kembaliKeKategori = kembaliKeKategori;
  window.pilihKategori = pilihKategori;
  window.ulangiKategori = ulangiKategori;
  window.mulaiRandom = mulaiRandom;
  window.stopRandom = stopRandom;
  window.printHasil = printHasil;
}

function runPreviewTests() {
  console.assert(typeof window.masukAplikasi === 'function', 'Test gagal: masukAplikasi harus tersedia secara global');
  console.assert(typeof window.mulaiRandom === 'function', 'Test gagal: mulaiRandom harus tersedia secara global');
  console.assert(byId('categoryGrid'), 'Test gagal: #categoryGrid harus ada');
  console.assert(byId('currentOrderNumber'), 'Test gagal: #currentOrderNumber harus ada');
  console.assert(byId('randomDisplay'), 'Test gagal: #randomDisplay harus ada');
  console.assert(byId('resultInputSummary'), 'Test gagal: #resultInputSummary harus ada');
  console.assert(fibonacciMap['21'] === '1', 'Test gagal: 21 harus memetakan nilai input 1');
  console.assert(fibonacciMap['5'] === '2', 'Test gagal: 5 harus memetakan nilai input 2');
  console.assert(displayRandomValue('1') === 'ا', 'Test gagal: angka random 1 harus tampil sebagai huruf Alif');

  const splash = byId('screenSplash');
  const kategori = byId('screenKategori');
  if (splash && kategori) {
    showScreen('screenSplash');
    masukAplikasi();
    console.assert(kategori.classList.contains('active'), 'Test gagal: klik splash harus membuka screenKategori');
    console.assert(!splash.classList.contains('active'), 'Test gagal: screenSplash harus nonaktif setelah masukAplikasi');
    showScreen('screenSplash');
  }

  state.nilai.fill('');
  state.nilai[0] = '1';
  state.nilai[1] = '2';
  renderInputSummary();
  const summary = byId('resultInputSummary');
  if (summary) {
    console.assert(summary.querySelectorAll('.syakal-dot').length >= 3, 'Test gagal: ringkasan nilai 1 dan 2 harus menampilkan total minimal 3 titik');
  }
}

document.addEventListener('DOMContentLoaded', () => {
attachGlobals();
  renderKategori();
  updateRandomStatus();
  renderInputSummary();
  renderHasil();
  runPreviewTests();
  showScreen('screenSplash');
});

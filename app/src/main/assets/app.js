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

let urutanAktif = 0;
let interval = null;
let resetDisplayTimeout = null;
let randomValue = '1';

const nilai = Array(16).fill('');

const fibonacciPool = ['1','2','3','5','8','13','21'];
const fibonacciMap = { '1':'1', '2':'2', '3':'1', '5':'2', '8':'1', '13':'2', '21':'1' };

function byId(id){
  return document.getElementById(id);
}

function setText(id, text){
  const el = byId(id);
  if (el) el.textContent = text;
}

function setDisabled(id, value){
  const el = byId(id);
  if (el) el.disabled = value;
}

function displayRandomValue(value){
  return value === '1' ? 'ا' : value;
}

function setRandomDisplay(value, showRawNumber = false){
  const el = byId('randomDisplay');
  if (!el) return;
  el.textContent = showRawNumber ? value : displayRandomValue(value);
  el.classList.toggle('alif-symbol', !showRawNumber && value === '1');
}

function setRitualInstruction(type){
  const el = byId('ritualInstruction');
  if (!el) return;
  const isShalawat = type === 'shalawat';
  el.classList.toggle('active-shalawat', isShalawat);
  el.innerHTML = isShalawat
    ? `<span class="ritual-arabic">اَللَّهُمَّ صَلِّ عَلٰى مُحَمَّدٍ وَعَلٰى آلِ مُحَمَّدٍ</span>`
    : `<span class="ritual-arabic">بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</span>`;
}

function resetDisplayToAlifAfterDelay(){
  clearTimeout(resetDisplayTimeout);
  resetDisplayTimeout = setTimeout(() => {
    if (byId('screenRandom')?.classList.contains('active') && !interval) setRandomDisplay('1');
  }, 3000);
}

function showScreen(id){
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.toggle('active', screen.id === id);
  });
}

function masukAplikasi(){
  showScreen('screenKategori');
}

function kembaliKeKategori(){
  clearInterval(interval);
  clearTimeout(resetDisplayTimeout);
  interval = null;
  resetDisplayTimeout = null;
  showScreen('screenKategori');
}

function pilihKategori(label, icon){
  setText('randomName', label);
  setText('randomIcon', icon);
  setText('resultCategoryName', label);
  ulangiKategori();
}

function jumlahTerisi(){
  return nilai.filter(v => v === '1' || v === '2').length;
}

function inputLengkap(){
  return jumlahTerisi() === 16;
}

function updateRandomStatus(){
  const terisi = jumlahTerisi();
  const nextIndex = nilai.findIndex(v => v !== '1' && v !== '2');

  setText('currentOrderNumber', nextIndex >= 0 ? String(nextIndex + 1) : '16');

  if (terisi === 0) {
    setText('randomProgress', 'Belum ada urutan yang diisi');
  } else if (terisi < 16) {
    setText('randomProgress', `Urutan terisi ${terisi} dari 16`);
  } else {
    setText('randomProgress', 'Semua 16 urutan sudah terisi');
  }

  setDisabled('btnProses', !inputLengkap());

  const filledCount = byId('filledCount');
  if (filledCount) filledCount.textContent = String(terisi);

  const progressFill = byId('progressFill');
  if (progressFill) progressFill.style.width = `${(terisi / 16) * 100}%`;
}

function renderInputSummary(){
  const box = byId('resultInputSummary');
  if (!box) return;

  box.innerHTML = nilai.map((v, i) => {
    const symbol = v === '1'
      ? '<span class="syakal-dot" aria-label="nilai 1"></span>'
      : v === '2'
        ? '<span class="syakal-line" aria-label="nilai 2"></span>'
        : '-';

    return `
      <div class="input-pill">
        <span class="order">${i + 1}</span>
        <span class="value">${symbol}</span>
      </div>
    `;
  }).join('');
}

/* OUTPUT LAMA, TAPI SETIAP JAWABAN DIBUAT CARD SENDIRI */
function renderHasil(){
  const container = byId('hasilContainer');
  if (!container) return;

  const jawaban = [
    'Hajat tercapai dengan susah payah',
    'Sempurna urusan tersebut',
    'Berhasil hajat atas orang tersebut'
  ];

  container.innerHTML = `
    <div class="result-card-list">
      ${jawaban.map((text, index) => `
        <div class="result-card result-answer-card">
          <div class="answer-card-number">Jawaban ${index + 1}</div>
          <div class="answer-card-text">${text}</div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderManualInputGrid(){
  const grid = byId('manualInputGrid');
  if (!grid) return;

  grid.innerHTML = nilai.map((v, i) => {
    const symbol = v === '1'
      ? '<span class="syakal-dot" aria-label="nilai 1"></span>'
      : v === '2'
        ? '<span class="syakal-line" aria-label="nilai 2"></span>'
        : '<span class="empty-symbol">-</span>';

    return `
      <div class="choice-card ${v ? 'is-filled' : ''}">
        <div class="choice-order">${i + 1}</div>
        <div class="choice-symbol">${symbol}</div>
        <div class="choice-buttons">
          <button
            class="choice-btn ${v === '1' ? 'active' : ''}"
            type="button"
            onclick="pilihNilaiUrutan(${i}, '1')">
            1
          </button>
          <button
            class="choice-btn ${v === '2' ? 'active' : ''}"
            type="button"
            onclick="pilihNilaiUrutan(${i}, '2')">
            2
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function pilihNilaiUrutan(index, value){
  nilai[index] = value;
  renderManualInputGrid();
  renderInputSummary();
  updateRandomStatus();
}

function resetInputManual(){
  nilai.fill('');
  urutanAktif = 0;
  randomValue = '1';

  renderManualInputGrid();
  renderInputSummary();
  updateRandomStatus();
  setRandomDisplay('1');
  setRitualInstruction('basmalah');
}

function ulangiKategori(){
  clearInterval(interval);
  clearTimeout(resetDisplayTimeout);

  interval = null;
  resetDisplayTimeout = null;
  urutanAktif = 0;
  randomValue = '1';

  nilai.fill('');

  setRandomDisplay('1');
  setRitualInstruction('basmalah');

  setDisabled('btnMulai', false);
  setDisabled('btnStop', true);

  renderManualInputGrid();
  updateRandomStatus();
  renderInputSummary();

  showScreen('screenRandom');
}

function mulaiRandom(){
  if (urutanAktif >= 16) return;

  clearInterval(interval);
  clearTimeout(resetDisplayTimeout);
  resetDisplayTimeout = null;

  setDisabled('btnMulai', true);
  setDisabled('btnStop', false);
  setRitualInstruction('shalawat');

  interval = setInterval(() => {
    randomValue = fibonacciPool[Math.floor(Math.random() * fibonacciPool.length)];
    setRandomDisplay(randomValue);
  }, 70);
}

function stopRandom(){
  if (!interval) return;

  clearInterval(interval);
  interval = null;

  setRandomDisplay(randomValue, true);

  const nilaiInput = fibonacciMap[randomValue] || '1';
  nilai[urutanAktif] = nilaiInput;
  urutanAktif += 1;

  setDisabled('btnMulai', urutanAktif >= 16);
  setDisabled('btnStop', true);

  updateRandomStatus();
  renderManualInputGrid();
  renderInputSummary();
  setRitualInstruction('basmalah');

  if (urutanAktif >= 16){
    clearTimeout(resetDisplayTimeout);
    resetDisplayTimeout = null;
    renderHasil();
    renderInputSummary();
    showScreen('screenHasil');
  } else {
    resetDisplayToAlifAfterDelay();
  }
}

function prosesInput(){
  if (!inputLengkap()) {
    updateRandomStatus();
    alert('Lengkapi semua 16 urutan terlebih dahulu.');
    return;
  }

  renderHasil();
  renderInputSummary();
  showScreen('screenHasil');
}

function printHasil(){
  if (document.querySelector('.screen.active')?.id !== 'screenHasil') {
    showScreen('screenHasil');
  }

  renderHasil();
  renderInputSummary();

  setTimeout(() => window.print(), 100);
}

function renderKategori(){
  const grid = byId('categoryGrid');
  if (!grid) return;

  grid.innerHTML = categories.map(({label, icon, randomIcon}) => `
    <button class="category-card" type="button" onclick="pilihKategori('${label}','${randomIcon}')">
      <div class="category-icon svg-icon">${icon}</div>
      <div class="category-label">${label}</div>
    </button>
  `).join('');
}

function runPreviewTests(){
  console.assert(byId('categoryGrid'), 'Test gagal: #categoryGrid harus ada');
  console.assert(byId('currentOrderNumber') || byId('manualInputGrid'), 'Test gagal: elemen input harus ada');
  console.assert(byId('resultInputSummary'), 'Test gagal: #resultInputSummary harus ada');
}

document.addEventListener('DOMContentLoaded', () => {
  renderKategori();
  renderManualInputGrid();
  updateRandomStatus();
  renderInputSummary();
  renderHasil();
  runPreviewTests();
});

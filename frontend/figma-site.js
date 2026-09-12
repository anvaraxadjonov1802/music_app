// Public website + Smart Monitor cover based on the approved Figma file.
// Authenticated product routes are still handed to the existing app.js so backend behavior stays intact.

const main = document.querySelector('#main');
const API_BASE = (window.__SOLFEDJIO_CONFIG__ && window.__SOLFEDJIO_CONFIG__.apiBaseUrl) || '';
const TOKEN_KEY = 'solfedjio.refreshToken.v1';
let legacyLoaded = false;

const ASSETS = {
  hero: 'https://www.figma.com/api/mcp/asset/15f1eedf-e447-4625-9c61-1252d61b7a6b.png',
  cover: 'https://www.figma.com/api/mcp/asset/b95cac7c-6cd9-4bb1-bfa8-9da6ca084acc.png',
  teacher1: 'https://www.figma.com/api/mcp/asset/d8b479de-0358-4eb1-96a6-15e1cefc6967.png',
  teacher2: 'https://www.figma.com/api/mcp/asset/372d96bb-cc6e-4636-864f-000024b7a2f4.png',
  teacher3: 'https://www.figma.com/api/mcp/asset/968d2c44-5a1c-4ad5-8baa-48cbbde8defc.png',
  teacher4: 'https://www.figma.com/api/mcp/asset/6cf8584e-6947-45ef-9cfa-29d6a67a87a3.png',
};

const notes = ['do', 're', 'mi', 'fa', 'sol', 'lya', 'si'];
const noteStrip = (compact = false) => `
  <div class="${compact ? 'fs-cover-note-strip' : 'fs-note-strip'}">
    <div class="fs-note-strip-inner">
      <div class="fs-note-label">🎼 NOTALAR BILAN DO‘STLASHING:</div>
      ${notes.map((note) => `<span class="fs-note ${note}">♫ ${note}</span>`).join('')}
    </div>
  </div>`;

const waveBars = () => `
  <div class="fs-bars" aria-hidden="true">
    ${[12,20,9,25,17,8,22,13,18].map((h) => `<i style="height:${h}px"></i>`).join('')}
  </div>`;

function nav({ cover = false } = {}) {
  return `
    <header class="fs-nav">
      <a class="fs-brand" href="#/home" aria-label="Solfedjio bosh sahifa">
        <span class="fs-logo">♫</span><span>Solfedjio</span>
      </a>
      <nav class="fs-navlinks" aria-label="Asosiy menyu">
        <button class="active" data-go-home>Bosh sahifa</button>
        ${cover
          ? `<button data-cover-lesson="1">1-Dars</button><button data-cover-lesson="2">2-Dars</button><button data-cover-lesson="3">3-Dars</button>`
          : `<button data-scroll="lessons">Darslar</button><button data-scroll="teachers">O‘qituvchilar</button><button data-scroll="pricing">Narxlar</button><button data-scroll="contact">Bog‘lanish</button>`}
      </nav>
      <div class="fs-navcta">
        <button class="fs-link-btn" data-login>Kirish</button>
        <button class="fs-btn fs-btn-primary fs-btn-small" data-login>Ro‘yxatdan o‘tish</button>
      </div>
    </header>`;
}

function landingHtml() {
  return `
  <div class="fs-page" data-screen="figma-landing">
    ${nav()}
    <section class="fs-hero">
      <div class="fs-hero-copy">
        <span class="fs-pill fs-pill-blue">🎵 YANGI INTERAKTIV PLATFORMA</span>
        <h1>Musiqa nazariyasini<br>o‘ynab <span>o‘rganing!</span></h1>
        <p class="fs-lead">Bolalar musiqa va san’at maktablari o‘quvchilari uchun qiziqarli o‘yinlar, vizual notalar va interaktiv topshiriqlar orqali solfedjio darslari.</p>
        <div class="fs-actions">
          <a class="fs-btn fs-btn-primary" href="#/cover">🚀 Bepul darsni boshlang</a>
          <button class="fs-btn fs-btn-blue" data-scroll="features">Dastur bilan tanishish</button>
        </div>
        <div class="fs-stats" aria-label="Platforma imkoniyatlari">
          <div class="fs-stat"><strong>17+</strong><span>Tayyor darslar</span></div>
          <div class="fs-stat"><strong>69</strong><span>Manba slaydlar</span></div>
          <div class="fs-stat"><strong>200+</strong><span>Media materiallar</span></div>
        </div>
      </div>
      <div class="fs-media-card">
        <img src="${ASSETS.hero}" alt="Solfedjio o‘rganayotgan bolalar" loading="eager">
        <div class="fs-wave-card">
          <button class="fs-play" type="button" aria-label="Ritm mashqini ko‘rish">▶</button>
          <div class="fs-wave-text"><strong>Ritm mashqi</strong>${waveBars()}</div>
        </div>
      </div>
    </section>
    ${noteStrip()}

    <section class="fs-section fs-section-pink" id="features">
      <div class="fs-inner">
        <div class="fs-section-head">
          <span class="fs-pill fs-pill-pink">NIMA UCHUN SOLFEDJIO?</span>
          <h2>Zamonaviy musiqa ta’limining kaliti</h2>
          <p>Darslar bolalar musiqa maktablari dasturi asosida interaktiv formatga moslashtirilgan.</p>
        </div>
        <div class="fs-grid fs-grid-4">
          <article class="fs-feature"><div class="fs-iconbox">🎮</div><h3>Interaktiv darslar</h3><p>O‘yinlar va qisqa topshiriqlar orqali nazariyani zerikmasdan o‘rganish.</p></article>
          <article class="fs-feature"><div class="fs-iconbox">🎼</div><h3>Nota o‘qish</h3><p>Nota yo‘li, kalitlar, gamma va tovush qatorini vizual mashqlar bilan o‘rganish.</p></article>
          <article class="fs-feature"><div class="fs-iconbox">🔊</div><h3>Quloq mashqlari</h3><p>Manbadagi audio misollar bilan tinglash va musiqiy eshitishni rivojlantirish.</p></article>
          <article class="fs-feature"><div class="fs-iconbox">👏</div><h3>Ritm mashqlari</h3><p>O‘lchovlar, takt va cho‘zimlarni sodda, bolaga tushunarli topshiriqlarda mashq qilish.</p></article>
        </div>
      </div>
    </section>

    <section class="fs-section fs-section-blue" id="lessons">
      <div class="fs-inner">
        <div class="fs-section-head">
          <span class="fs-pill" style="color:#fff;background:linear-gradient(105deg,#2bb1ff,#4fc3f7)">SINF DARSLIKLARI</span>
          <h2>Mashg‘ulotlar dasturi</h2>
          <p>Hozirgi demo 1-sinf materiallariga tayangan. Keyingi sinflar shu dizayn tizimida qo‘shib boriladi.</p>
        </div>
        <div class="fs-grid fs-grid-4">
          <article class="fs-course-card">
            <div class="fs-card-top"><span class="fs-pill fs-pill-pink">1-SINF</span><small>17+ dars</small></div>
            <h3>Nota savodi va dastlabki ritm</h3><p class="fs-course-sub">Daraja: Boshlang‘ich</p><div class="fs-staff-mini"></div>
            <div class="fs-card-foot"><a href="#/cover">Darsni boshlash →</a><span>⭐ Darslik</span></div>
          </article>
          <article class="fs-course-card">
            <div class="fs-card-top"><span class="fs-pill" style="color:#fff;background:linear-gradient(105deg,#2bb1ff,#4fc3f7)">2-SINF</span><small>tez orada</small></div>
            <h3>Tonallik va oddiy intervallar</h3><p class="fs-course-sub">Daraja: Boshlang‘ich+</p><div class="fs-staff-mini"></div>
            <div class="fs-card-foot"><span>Rejada →</span><span>⭐ Darslik</span></div>
          </article>
          <article class="fs-course-card">
            <div class="fs-card-top"><span class="fs-pill fs-pill-orange">MASHQLAR</span><small>interaktiv</small></div>
            <h3>Ritm va eshitish topshiriqlari</h3><p class="fs-course-sub">Qisqa va bolaga mos</p><div class="fs-staff-mini"></div>
            <div class="fs-card-foot"><a href="#/cover">Ko‘rib chiqish →</a><span>🎮 O‘yin</span></div>
          </article>
          <article class="fs-course-card">
            <div class="fs-card-top"><span class="fs-pill fs-pill-green">SMART MONITOR</span><small>fullscreen</small></div>
            <h3>Sinfda katta ekranda dars</h3><p class="fs-course-sub">1440 × 1024 uchun mos</p><div class="fs-staff-mini"></div>
            <div class="fs-card-foot"><a href="#/cover">Ochish →</a><span>🖥️ Ekran</span></div>
          </article>
        </div>
      </div>
    </section>

    <section class="fs-section fs-section-orange" id="teachers">
      <div class="fs-inner">
        <div class="fs-section-head"><span class="fs-pill fs-pill-orange">MUTAXASSIS PEDAGOGLAR</span><h2>Bizning o‘qituvchilar</h2><p>Figma maketidagi pedagoglar bloki dizayn tizimi saqlandi.</p></div>
        <div class="fs-grid fs-grid-4">
          <article class="fs-teacher"><div class="fs-teacher-img"><img src="${ASSETS.teacher1}" alt="Solfedjio o‘qituvchisi" loading="lazy"></div><h3>Malika Axmedova</h3><strong>Solfedjio o‘qituvchisi</strong><p>Bolalar musiqa va san’at maktabi</p></article>
          <article class="fs-teacher"><div class="fs-teacher-img"><img src="${ASSETS.teacher2}" alt="Musiqa nazariyotchisi" loading="lazy"></div><h3>Sardor Rustamov</h3><strong>Kompozitor, nazariyotchi</strong><p>Musiqa ta’limi mutaxassisi</p></article>
          <article class="fs-teacher"><div class="fs-teacher-img"><img src="${ASSETS.teacher3}" alt="Musiqa pedagogi" loading="lazy"></div><h3>Nigora Umarova</h3><strong>Musiqa pedagogi</strong><p>Bolalar bilan ishlash bo‘yicha mutaxassis</p></article>
          <article class="fs-teacher"><div class="fs-teacher-img"><img src="${ASSETS.teacher4}" alt="Ritmika mutaxassisi" loading="lazy"></div><h3>Javohir To‘rayev</h3><strong>Ritmika va xor mutaxassisi</strong><p>Musiqiy ritm bo‘yicha pedagog</p></article>
        </div>
      </div>
    </section>

    <section class="fs-section fs-section-pink" id="pricing">
      <div class="fs-inner">
        <div class="fs-section-head"><span class="fs-pill fs-pill-pink">QULAY REJALAR</span><h2>O‘quv rejalari</h2><p>Demo bosqichida tariflar yakuniy emas. Blok Figma ko‘rinishini tekshirish uchun saqlangan.</p></div>
        <div class="fs-grid fs-grid-3">
          <article class="fs-price"><div><h3>Bepul sinov</h3><p>Dastlabki tanishuv uchun</p></div><div class="amount">0 UZS</div><ul><li>Demo dars</li><li>Asosiy nota savodxonligi</li><li>Smart Monitor ko‘rinishi</li></ul><a class="fs-btn" href="#/cover">Boshlash</a></article>
          <article class="fs-price popular"><span class="fs-popular">DEMO 🔥</span><div><h3>Standart</h3><p style="color:#9b7ea6">To‘liq darslar uchun rejalashtirilgan</p></div><div class="amount">Tayyorlanmoqda</div><ul><li>Barcha mavjud 1-sinf darslari</li><li>Audio va interaktiv mashqlar</li><li>Yulduzli natijalar tizimi</li></ul><a class="fs-btn fs-btn-primary" href="#/login">Kirish</a></article>
          <article class="fs-price"><div><h3>Maktab uchun</h3><p>Sinf va Smart Monitor rejimi</p></div><div class="amount" style="color:#34d399">Kontakt</div><ul><li>Katta ekran uchun interfeys</li><li>O‘qituvchi bilan boshqarish</li><li>Maktabga moslashtirish</li></ul><button class="fs-btn" data-scroll="contact">Bog‘lanish</button></article>
        </div>
      </div>
    </section>

    <section class="fs-section fs-section-green">
      <div class="fs-inner">
        <div class="fs-section-head"><span class="fs-pill fs-pill-green">QULAY VA QIZIQARLI</span><h2>Platforma taassuroti</h2><p>Figma maketidagi sharhlar kompozitsiyasi demo ko‘rinishida saqlandi.</p></div>
        <div class="fs-grid fs-grid-3">
          <article class="fs-quote"><p>“Darslar katta ekranda ham tushunarli, ranglar bolani chalg‘itmaydi va har bir mavzu alohida ko‘rinadi.”</p><div class="fs-person"><div class="fs-avatar">👩</div><div><strong>Ota-ona</strong><small>Demo fikr</small></div></div></article>
          <article class="fs-quote"><p>“Nazariyani rasm, audio va kichik mashqlarga ajratish sinfda tushuntirishni ancha yengillashtiradi.”</p><div class="fs-person"><div class="fs-avatar">👨‍🏫</div><div><strong>Pedagog</strong><small style="color:#2bb1ff">Demo fikr</small></div></div></article>
          <article class="fs-quote"><p>“Yulduz yig‘ish va rangli notalar darsni oddiy prezentatsiyadan ko‘ra qiziqarliroq qiladi.”</p><div class="fs-person"><div class="fs-avatar">🧒</div><div><strong>O‘quvchi</strong><small style="color:#34d399">Demo fikr</small></div></div></article>
        </div>
      </div>
    </section>

    <footer class="fs-footer" id="contact">
      <div class="fs-footer-inner">
        <div><a class="fs-brand" href="#/home"><span class="fs-logo">♫</span><span>Solfedjio</span></a><p style="margin-top:20px;max-width:390px">Bolalar musiqa va san’at maktablari uchun interaktiv solfedjio ta’lim platformasi.</p></div>
        <div><h3>Platforma</h3><div class="fs-footer-links"><a href="#/cover">Darsliklar</a><a href="#/cover">Mashqlar</a><a href="#/login">Kirish</a></div></div>
        <div><h3>Yordam</h3><div class="fs-footer-links"><span>Qo‘llanma</span><span>Texnik ko‘mak</span><span>Xavfsizlik</span></div></div>
        <div><h3>Bog‘lanish</h3><div class="fs-footer-links"><p>Demo loyiha</p><p>Toshkent, O‘zbekiston</p></div></div>
      </div>
      <div class="fs-footer-bottom"><span>Solfedjio © 2026</span><span>Figma dizayni asosidagi demo web interfeys</span></div>
    </footer>
  </div>`;
}

function coverHtml() {
  return `
  <div class="fs-page fs-cover" data-screen="figma-cover">
    ${nav({ cover: true })}
    <section class="fs-cover-main">
      <div class="fs-cover-copy">
        <div class="fs-cover-badges"><span class="fs-pill fs-pill-pink">🎵 1-SINF DARSLIGI</span><span class="fs-pill fs-pill-blue">Musiqa va san’at maktablari uchun</span></div>
        <div><h1>Solfedjio fani <span>olamiga marhamat!</span></h1></div>
        <p class="fs-lead">1-sinf o‘quvchilari uchun qiziqarli, zamonaviy va interaktiv ta’lim. Notalarni qo‘shiq, rasm va o‘yinlar orqali oson o‘rganing!</p>
        <div class="fs-actions"><a class="fs-btn fs-btn-primary" href="#/login">🚀 Darsni boshlash</a><button class="fs-btn fs-btn-blue" data-go-home>Dastur haqida</button></div>
        <div class="fs-cover-tags"><span class="fs-soft-tag green">✓ Interaktiv mashqlar</span><span class="fs-soft-tag blue">♫ Vizual notalar</span><span class="fs-soft-tag orange">🏅 Manba asosida</span></div>
      </div>
      <div class="fs-cover-media">
        <img src="${ASSETS.cover}" alt="Solfedjio darsi uchun rangli vizual" loading="eager">
        <div class="fs-wave-card"><button class="fs-play" aria-label="Gamma mashqi">▶</button><div class="fs-wave-text"><strong>Gammani to‘g‘ri tinglang</strong><span style="display:block;color:#9b7ea6;font-size:12px;margin-top:2px">Solfedjio 1-sinf mashg‘uloti</span>${waveBars()}</div></div>
      </div>
    </section>
    ${noteStrip(true)}
  </div>`;
}

function loginHtml() {
  return `
  <div class="fs-page fs-login" data-screen="figma-login">
    <section class="fs-login-art">
      <a class="fs-brand" href="#/home"><span class="fs-logo">♫</span><span>Solfedjio</span></a>
      <h1>Musiqani o‘ynab <span>o‘rganing.</span></h1>
      <p class="fs-lead">Darslaringiz, media mashqlaringiz va natijalaringizga kirish uchun hisobingiz bilan davom eting.</p>
      <div><a class="fs-btn fs-btn-blue" href="#/home">← Bosh sahifaga</a></div>
    </section>
    <section class="fs-login-panel">
      <h2>Kirish</h2><p>Solfedjio hisobingizni kiriting.</p>
      <form class="fs-form" id="figma-login-form" novalidate>
        <div class="fs-field"><label for="figma-email">Email</label><input id="figma-email" name="email" type="email" autocomplete="username" required placeholder="student@example.com"></div>
        <div class="fs-field"><label for="figma-password">Parol</label><input id="figma-password" name="password" type="password" autocomplete="current-password" required placeholder="••••••••"></div>
        <div class="fs-login-error" id="figma-login-error" role="alert"></div>
        <button class="fs-btn fs-btn-primary" type="submit">Kirish →</button>
      </form>
      <div class="fs-demo">Demo: <code>student@example.com</code> / <code>student12345</code></div>
    </section>
  </div>`;
}

function enablePublicMode() {
  document.body.classList.add('figma-public');
  const topbar = document.querySelector('#topbar');
  if (topbar) topbar.hidden = true;
}

function wirePublic() {
  document.querySelectorAll('[data-login]').forEach((el) => el.addEventListener('click', () => { location.hash = '#/login'; }));
  document.querySelectorAll('[data-go-home]').forEach((el) => el.addEventListener('click', () => { location.hash = '#/home'; }));
  document.querySelectorAll('[data-scroll]').forEach((el) => el.addEventListener('click', () => document.getElementById(el.dataset.scroll)?.scrollIntoView({ behavior: 'smooth', block: 'start' })));
  document.querySelectorAll('[data-cover-lesson]').forEach((el) => el.addEventListener('click', () => { location.hash = '#/login'; }));

  const form = document.querySelector('#figma-login-form');
  if (form) {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const button = form.querySelector('button[type="submit"]');
      const error = document.querySelector('#figma-login-error');
      const email = document.querySelector('#figma-email').value.trim();
      const password = document.querySelector('#figma-password').value;
      error.textContent = '';
      button.disabled = true;
      button.textContent = 'Kirilmoqda…';
      try {
        const response = await fetch(`${API_BASE}/api/auth/login`, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        const data = await response.json().catch(() => null);
        if (!response.ok) throw new Error(data?.error?.message || 'Email yoki parol noto‘g‘ri');
        localStorage.setItem(TOKEN_KEY, data.refreshToken);
        location.hash = '#/course';
        location.reload();
      } catch (err) {
        error.textContent = err.message || 'Kirishda xatolik yuz berdi';
        button.disabled = false;
        button.textContent = 'Kirish →';
      }
    });
  }
}

function renderPublic(kind) {
  enablePublicMode();
  main.className = '';
  main.innerHTML = kind === 'cover' ? coverHtml() : kind === 'login' ? loginHtml() : landingHtml();
  wirePublic();
  window.scrollTo({ top: 0, behavior: 'instant' });
}

async function loadProductApp() {
  if (legacyLoaded) return;
  legacyLoaded = true;
  document.body.classList.remove('figma-public');
  main.innerHTML = '<div class="state"><div class="spinner"></div>Darslar yuklanmoqda…</div>';
  await import('./app.js');
}

function publicRoute() {
  if (legacyLoaded) return;
  const hash = location.hash || '#/home';
  if (hash === '#/' || hash === '#/home' || hash === '') renderPublic('landing');
  else if (hash === '#/cover') renderPublic('cover');
  else if (hash === '#/login') renderPublic('login');
  else loadProductApp();
}

window.addEventListener('hashchange', publicRoute);
publicRoute();

if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js').catch(() => {});

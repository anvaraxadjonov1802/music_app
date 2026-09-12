const API_BASE = (window.__SOLFEDJIO_CONFIG__ && window.__SOLFEDJIO_CONFIG__.apiBaseUrl) || '';

function buildPiano() {
  const piano = document.querySelector('#registr-piano');
  if (!piano) return;

  const groups = ['low', 'mid', 'high'];
  for (const group of groups) {
    for (let i = 0; i < 7; i += 1) {
      const key = document.createElement('div');
      key.className = `fs-white-key ${group}`;
      piano.appendChild(key);
    }
  }

  // Seven-note white-key pattern repeated across three registers.
  const blackAfter = [0, 1, 3, 4, 5];
  const totalWhite = 21;
  for (let octave = 0; octave < 3; octave += 1) {
    blackAfter.forEach((step) => {
      const whiteIndex = octave * 7 + step;
      if (whiteIndex >= totalWhite - 1) return;
      const key = document.createElement('div');
      key.className = 'fs-black-key';
      key.style.left = `calc(${((whiteIndex + 1) / totalWhite) * 100}% - 16px)`;
      piano.appendChild(key);
    });
  }
}

let audioSourcesPromise = null;
let activeAudio = null;

async function fetchLessonTwoAudio() {
  const loginResponse = await fetch(`${API_BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email: 'student@example.com', password: 'student12345' }),
  });
  const login = await loginResponse.json().catch(() => null);
  if (!loginResponse.ok || !login?.accessToken) throw new Error('Demo audio uchun kirib bo‘lmadi');

  const courseResponse = await fetch(`${API_BASE}/api/course`, {
    headers: { authorization: `Bearer ${login.accessToken}` },
  });
  const course = await courseResponse.json().catch(() => null);
  if (!courseResponse.ok) throw new Error('Kurs ma’lumoti yuklanmadi');

  const lesson = (course?.lessons ?? []).find((item) => Number(item.declaredNumber) === 2);
  const blockId = lesson?.blocks?.[0]?.id;
  if (!blockId) throw new Error('2-dars bloki topilmadi');

  const detailResponse = await fetch(`${API_BASE}/api/blocks/${blockId}`, {
    headers: { authorization: `Bearer ${login.accessToken}` },
  });
  const detail = await detailResponse.json().catch(() => null);
  if (!detailResponse.ok) throw new Error('2-dars audio ma’lumoti yuklanmadi');

  const wanted = ['audio1.wav', 'audio2.wav', 'audio3.wav'];
  const assets = detail?.assets ?? [];
  return wanted.map((file) => assets.find((asset) => asset.kind === 'audio' && asset.file === file)?.url ?? null);
}

function getAudioSources() {
  if (!audioSourcesPromise) audioSourcesPromise = fetchLessonTwoAudio();
  return audioSourcesPromise;
}

async function playRegister(button, index) {
  const original = button.textContent;
  button.classList.add('is-loading');
  button.textContent = 'Yuklanmoqda…';

  try {
    const sources = await getAudioSources();
    const src = sources[index];
    if (!src) throw new Error('Audio topilmadi');

    if (activeAudio) {
      activeAudio.pause();
      activeAudio.currentTime = 0;
      document.querySelectorAll('[data-register-audio]').forEach((item) => item.classList.remove('is-playing'));
    }

    activeAudio = new Audio(src);
    activeAudio.preload = 'auto';
    activeAudio.addEventListener('ended', () => {
      button.classList.remove('is-playing');
      button.textContent = original;
    }, { once: true });
    await activeAudio.play();
    button.classList.add('is-playing');
    button.textContent = '❚❚ Tinglanmoqda';
  } catch (error) {
    console.error('[lesson-two] audio:', error);
    button.textContent = 'Qayta urinish';
    audioSourcesPromise = null;
  } finally {
    button.classList.remove('is-loading');
  }
}

buildPiano();

document.querySelectorAll('[data-register-audio]').forEach((button) => {
  button.addEventListener('click', () => playRegister(button, Number(button.dataset.registerAudio)));
});

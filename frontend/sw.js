// Online-first service worker: faqat ilova shell fayllarini kesh qilamiz.
// Himoyalangan media va API javoblari kesh qilinmaydi.
const CACHE = 'solfedjio-shell-v5';
const SHELL = [
  '/',
  '/index.html',
  '/styles.css',
  '/figma-ui.css',
  '/figma-site.js',
  '/lesson-routing.js',
  '/lesson-one.html',
  '/lesson-one.css',
  '/lesson-two.html',
  '/lesson-two.css',
  '/lesson-two.js',
  '/app.js',
  '/config.js',
  '/manifest.webmanifest',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET') return;
  if (url.pathname.startsWith('/api/')) return;

  e.respondWith(
    fetch(e.request)
      .then((res) => {
        if (SHELL.includes(url.pathname)) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(e.request, copy));
        }
        return res;
      })
      .catch(() => caches.match(e.request).then((r) => r ?? caches.match('/index.html'))),
  );
});

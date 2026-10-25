
const CACHE = 'jeyson-v4';

const ARCHIVOS = [
  './',
  './index.html',
  './manifest.json',
  './data/config.js',
  './data/preguntas.js',
  './js/anim.js',
  './js/juego.js',
  './js/app.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(ARCHIVOS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key => key !== CACHE)
          .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  if (url.origin !== self.location.origin) return;

  event.respondWith(
    fetch(event.request)
      .then(response => {
        if (response.ok) {
          const copia = response.clone();
          caches.open(CACHE).then(cache => {
            cache.put(event.request, copia);
          });
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});

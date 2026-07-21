const CACHE_NAME = 'cmb-tools-v1';
const ASSETS = [
  './',
  './index.html',
  './clients.html',
  './manifest.json',
  './css/gstr1-app.css',
  './css/clients-app.css',
  './js/gstr1-app.js',
  './js/clients-app.js',
  './assets/app-logo.svg',
  './assets/app-splash.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))));
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  event.respondWith(fetch(request).catch(() => caches.match(request).then((cached) => cached || caches.match('./index.html'))));
});

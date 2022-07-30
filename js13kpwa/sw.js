self.importScripts('data/games.js');

// Files to cache
const cacheName = 'js13kPWA-v1';
const appShellFiles = [
  '/index.html',
  '/app.js',
  '/style.css',
  '/fonts/graduate.eot',
  '/fonts/graduate.ttf',
  '/fonts/graduate.woff',
  '/favicon.ico',
  '/img/js13kgames.png',
  '/img/bg.png',
  'img/icons/icon-32.png',
  'img/icons/icon-64.png',
  'img/icons/icon-96.png',
  'img/icons/icon-128.png',
  'img/icons/icon-168.png',
  'img/icons/icon-192.png',
  'img/icons/icon-256.png',
  'img/icons/icon-512.png',
];
const gamesImages = [];
for (let i = 0; i < games.length; i++) {
  gamesImages.push(`data/img/${games[i].slug}.jpg`);
}
const contentToCache = appShellFiles.concat(gamesImages);

// Installing Service Worker
self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install');
  e.waitUntil((async () => {
    const cache = await caches.open(cacheName);
    console.log('[Service Worker] Caching all: app shell and content');
    await cache.addAll(contentToCache);
  })());
});

// Fetching content using Service Worker
self.addEventListener('fetch', (e) => {
  e.respondWith((async () => {
    const r = await caches.match(e.request);
    console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
    if (r) return r;
    const response = await fetch(e.request);
    const cache = await caches.open(cacheName);
    console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
    cache.put(e.request, response.clone());
    return response;
  })());
});

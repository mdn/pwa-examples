self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('video-store').then(function(cache) {
     return cache.addAll([
       '/pwa-examples/a2hs/',
       '/pwa-examples/a2hs/index.html',
       '/pwa-examples/a2hs/index.js',
       '/pwa-examples/a2hs/style.css',
       '/pwa-examples/a2hs/images/fox1.jpg',
       '/pwa-examples/a2hs/images/fox2.jpg',
       '/pwa-examples/a2hs/images/fox3.jpg',
       '/pwa-examples/a2hs/images/fox4.jpg'
     ]);
   })
 );
});

self.addEventListener('fetch', function(e) {
  console.log(e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});

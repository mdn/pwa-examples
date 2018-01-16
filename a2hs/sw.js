self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('video-store').then(function(cache) {
     return cache.addAll([
       '/pwa-examples/a2hs/',
       '/pwa-examples/a2hs/index.html',
       '/pwa-examples/a2hs/index.js',
       '/pwa-examples/a2hs/style.css',
       '/pwa-examples/a2hs/images/pic1.jpg',
       '/pwa-examples/a2hs/images/pic2.jpg',
       '/pwa-examples/a2hs/images/pic3.jpg',
       '/pwa-examples/a2hs/images/pic4.jpg'
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

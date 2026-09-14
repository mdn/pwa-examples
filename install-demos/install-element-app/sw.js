self.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .open("fox-store")
      .then((cache) =>
        cache.addAll([
          "/pwa-examples/install-demos/install-elem-app/",
          "/pwa-examples/install-demos/install-elem-app/index.html",
          "/pwa-examples/install-demos/install-elem-app/index.js",
          "/pwa-examples/install-demos/install-elem-app/style.css",
          "/pwa-examples/install-demos/install-elem-app/images/fox1.jpg",
          "/pwa-examples/install-demos/install-elem-app/images/fox2.jpg",
          "/pwa-examples/install-demos/install-elem-app/images/fox3.jpg",
          "/pwa-examples/install-demos/install-elem-app/images/fox4.jpg",
        ]),
      ),
  );
});

self.addEventListener("fetch", (e) => {
  console.log(e.request.url);
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request)),
  );
});

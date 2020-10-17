const cacheName = 'my-cache';
const dataCacheName = 'my-data-cache';
const filestoCache = [
    "/",
    "/idb.js",
    "/index.js",
    "/manifest.json",
    "/styles.css",
    "/icons/icon-192x192.png",
    "/icons/icon-512x512.png"
];

self.addEventListener('activate', e => self.clients.claim());

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(cacheName)
        .then(cache => cache.addAll(filesToCache))
    );
});

self.addEventListener("fetch", function(event) {
    if (event.request.url.includes("/api/")) {
      event.respondWith(
        caches.open(DATA_CACHE_NAME).then(cache => {
          return fetch(event.request)
            .then(response => {
              if (response.status === 200) {
                cache.put(event.request.url, response.clone());
              }
  
              return response;
            })
            .catch(err => {
              return cache.match(event.request);
            });
        }).catch(err => console.log(err))
      );
  
      return;
    }
  
    event.respondWith(
      fetch(event.request).catch(function() {
        return caches.match(event.request).then(function(response) {
          if (response) {
            return response;
          } else if (event.request.headers.get("accept").includes("text/html")) {
            return caches.match("/");
          }
        });
      })
    );
  });
  
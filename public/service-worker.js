if ('serviceWorker' in navigator) {
    let registration;

    const registerServiceWorker = async () => {
        registration = await navigator.serviceWorker.register('./service-worker.js');
    };

    registerServiceWorker();
}

const cacheName = 'my-cache';
const filestoCache = [
    "/",
    "/db.js",
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

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request)
        .then(response => response ? response : fetch(e.request))
    )
});
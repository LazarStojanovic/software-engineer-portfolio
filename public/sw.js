// Service Worker for caching static assets with proper cache busting
const CACHE_NAME = 'blogotara-v1.1.0'; // Bumped version to force cache refresh
const STATIC_CACHE = 'blogotara-static-v1.1.0';
const DYNAMIC_CACHE = 'blogotara-dynamic-v1.1.0';

// Static assets that rarely change
const staticAssets = [
  '/',
  '/favicon.svg',
  '/logo.svg',
  '/tara-cv-no-background.png',
  '/robots.txt',
  '/sitemap.xml',
];

// Install Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then(cache => cache.addAll(staticAssets))
      .then(() => self.skipWaiting()) // Force activation of new SW
  );
});

// Activate Service Worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches
      .keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            // Delete old caches
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim()) // Take control of all pages
  );
});

// Fetch event handler with better caching strategy
self.addEventListener('fetch', event => {
  const { request } = event;

  // Only handle GET requests
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Handle different types of requests
  if (url.pathname.startsWith('/assets/')) {
    // For hashed assets (JS/CSS), use cache-first with network fallback
    event.respondWith(
      caches.open(DYNAMIC_CACHE).then(cache => {
        return cache.match(request).then(response => {
          if (response) {
            // Check if cached version is stale (older than 1 hour)
            const cachedTime = response.headers.get('sw-cached-time');
            if (cachedTime && Date.now() - parseInt(cachedTime) < 3600000) {
              return response;
            }
          }

          // Fetch from network and update cache
          return fetch(request)
            .then(networkResponse => {
              if (networkResponse.ok) {
                const responseClone = networkResponse.clone();
                // Add timestamp to cached response
                const headers = new Headers(responseClone.headers);
                headers.set('sw-cached-time', Date.now().toString());

                const modifiedResponse = new Response(responseClone.body, {
                  status: responseClone.status,
                  statusText: responseClone.statusText,
                  headers: headers,
                });

                cache.put(request, modifiedResponse);
              }
              return networkResponse;
            })
            .catch(() => response || new Response('Asset not found', { status: 404 }));
        });
      })
    );
  } else if (staticAssets.includes(url.pathname)) {
    // For static assets, use cache-first
    event.respondWith(
      caches.match(request).then(response => {
        return response || fetch(request);
      })
    );
  } else {
    // For HTML pages, use network-first with cache fallback
    event.respondWith(
      fetch(request)
        .then(response => {
          if (response.ok) {
            const responseClone = response.clone();
            caches.open(DYNAMIC_CACHE).then(cache => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          return caches.match(request).then(response => {
            return response || caches.match('/');
          });
        })
    );
  }
});

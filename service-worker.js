const CACHE_NAME = 'portfolio-rafi-v9';

self.addEventListener('install', (event) => {
  console.log('[SW] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Trying to cache offline.html');
        return cache.add('./offline.html');
      })
      .then(() => {
        console.log('[SW] SUCCESS - offline.html cached');
        return self.skipWaiting();
      })
      .catch((err) => {
        console.error('[SW] FAILED to cache:', err);
      })
  );
});

self.addEventListener('activate', (event) => {
  console.log('[SW] Activating...');
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    }).then(() => {
      console.log('[SW] Activated and claimed');
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', (event) => {
  console.log('[SW] Fetch:', event.request.url);
  
  event.respondWith(
    fetch(event.request)
      .catch((error) => {
        console.log('[SW] Fetch FAILED, looking for offline page');
        
        return caches.open(CACHE_NAME).then((cache) => {
          return cache.match('./offline.html').then((response) => {
            if (response) {
              console.log('[SW] Found offline page, returning it');
              return response;
            }
            console.log('[SW] ERROR: offline page not in cache!');
            return new Response('Offline page not available', {
              status: 503,
              statusText: 'Service Unavailable'
            });
          });
        });
      })
  );
});

console.log('[SW] Service Worker loaded');
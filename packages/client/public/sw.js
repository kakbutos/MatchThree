const CACHE_VERSION = 1;
const CACHE_NAME = `match3-cosmo-${CACHE_VERSION}`;

const STATIC_ASSETS = [
  '/',
  '/login',
  '/game',
  '/planet.svg',
  '/profile/:id',
  '/leaderboard',
  '/forum/topic/:id',
  '/forum',
  '/reg',
  '/not_found',
];

let CACHE_ASSETS = [...STATIC_ASSETS, ...JSON.parse('%HASHURLS%')];

CACHE_ASSETS = new Set(CACHE_ASSETS);

const URLS = Array.from(CACHE_ASSETS);

// список урлов, ответы по которым необходимо сохранять в cache
const NETWORK_FIRST_URLS = new Set([
  'https://ya-praktikum.tech/api/v2/auth/user'
]);

this.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(URLS);
      })
      .catch(err => {
        console.log(err);
        throw err;
      })
  );
});

this.addEventListener('fetch', event => {
  if (NETWORK_FIRST_URLS.has(event.request.url)) {
    fetchFirstStrategy(event);
  } else {
    cacheFirstStrategy(event);
  }
});

this.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => {
            console.log('Deleting out of date cache:', name);
            caches.delete(name);
          })
      );
    })
  );
});

function cacheFirstStrategy(event) {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }

        const fetchRequest = event.request.clone();
        return fetch(fetchRequest)
          .then(response => {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            return response;
          })
          .catch(err => {
            console.log(err);
            throw err;
          });
      })
  );
}

function fetchFirstStrategy(event) {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        if (!response || response.status !== 200) {
          return response;
        }

        const responseToCache = response.clone();
        caches.open(CACHE_NAME)
          .then(cache => {
            cache.put(event.request, responseToCache);
          });
        return response;
      })
      .catch(() => {
        return caches.match(event.request);
      })
  );
}


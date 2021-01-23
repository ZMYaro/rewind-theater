var CACHE_NAME = 'cache-2021-01-23';

self.addEventListener('install', function (ev) {
	// Add files to cache.
	ev.waitUntil(
		caches.open(CACHE_NAME).then(function (cache) {
			console.log('Updated service worker cache \u201c' + CACHE_NAME + '\u201d');
			return cache.addAll([
				'/',
				'/index.html',
				'/styles.css',
				'/annotate.js',
				'/keyboard.js',
				'/video.js',
				'/manifest.webapp',
				'/images/favicon.ico',
				'/images/favicon128.png',
				'/images/favicon256.png',
				'/images/favicon256_maskable.png',
				'/images/icons/caret_down.svg',
				'/images/icons/circle.svg',
				'/images/icons/clear.svg',
				'/images/icons/fast_forward.svg',
				'/images/icons/pause.svg',
				'/images/icons/play.svg',
				'/images/icons/rect.svg',
				'/images/icons/rewind.svg',
			]);
		}).catch(function () {
			console.warn('Service worker failed to cache \u201c' + CACHE_NAME + '\u201d');
		}));
});

self.addEventListener('activate', function (ev) {
	// Delete old caches.
	ev.waitUntil(
		caches.keys().then(function (cacheNames) {
			var cacheDeletionPromises = cacheNames.map(function (cacheName) {
				if (cacheName !== CACHE_NAME) {
					return caches.delete(cacheName);
				}
			});
			return Promise.all(cacheDeletionPromises);
		}));
});

self.addEventListener('fetch', function (ev) {
	// Serve from cache where possible.
	ev.respondWith(
		caches.match(ev.request).then(function (response) {
				if (response) {
					return response;
				}
				return fetch(ev.request);
		}));
});

const CACHE_NAME = "version-1";
const urlsToCache = [
  "/",              
  "/nvr",
  "/cameras",
  "/hardware",
  "/cabling",
  "/labor_rate",
  "/add_to_cart",
  "/poe-switch",
  "/pdf", 
  "/special",
  "/assets/images/Categories",
  "index.html"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // If the request is cached, return the cached response
      if (cachedResponse) {
        return cachedResponse;
      }

      // If the request is not cached, try to fetch it from the network
      return fetch(event.request)
        .then((response) => {
          // Check if we received a valid response from the network
          if (!response || response.status !== 200 || response.type !== "basic") {
            // If not, return a fallback response (e.g., a custom offline page)
            return caches.match("offline.html"); // You can customize this
          }

          // If we received a valid response, cache it for future use
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          // Return the network response
          return response;
        })
        .catch(() => {
          // If there's a network error, return a fallback response
          return caches.match("offline.html"); // You can customize this
        });
    })
  );
});

self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});



// part 2



// //STORAGE OF BROWSER
// const CACHE_NAME = "version-1";
// // const urlsToCache = ["index.html", "offline.html"];
// const urlsToCache = [
//   "/",              
//   "/nvr",
//   "/cameras",
//   "/hardware",
//   "/cabling",
//   "/labor_rate",
//   "/add_to_cart",
//   "/poe-switch",
//   "/pdf", 
//   "/special",
//   "/assets/images/Categories",
//   "index.html"
// ];
// const self = this;

// //installation
// self.addEventListener("install", (event) => {
//   event.waitUntil(
//     caches.open(CACHE_NAME).then((cache) => {
//       console.log("Opened cache");

//       return cache.addAll(urlsToCache);
//     })
//   );
// });

// // listen for request
// self.addEventListener("fetch", (event) => {
//   event.respondWith(
//     caches.match(event.request).then((res) => {
//       return fetch(event.request).catch(() => caches.match("offline.html"));
//     })
//   );
// });

// // actitivate the service worker
// self.addEventListener("activate", (event) => {
//     const cacheWhitelist = [];
//     cacheWhitelist.push(CACHE_NAME);
//     event.waitUntil(
//         caches.keys().then((cacheNames) => Promise.all(
//             cacheNames.map((cacheName) => {
//                 if(!cacheWhitelist.includes(cacheName)){
//                     return caches.delete(cacheName);
//                 }
//             })
//         ))
//     )
// });
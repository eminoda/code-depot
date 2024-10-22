console.log("sw");

const addResourcesToCache = async (resources) => {
  const cache = await caches.open("v1");
  await cache.addAll(resources);
};

const cacheFirst = async (request) => {
  const match = await caches.match(request);
  if (match) {
    console.log("从缓存获取", request.url);
    return match;
  } else {
    return fetch(request);
  }
};

self.addEventListener("install", (event) => {
  console.log("sw install");
  event.waitUntil(addResourcesToCache(["/vite.svg"]));
});

self.addEventListener("activate", (event) => {
  console.log("sw activate");
});

self.addEventListener("fetch", (event) => {
  event.respondWith(cacheFirst(event.request));
});

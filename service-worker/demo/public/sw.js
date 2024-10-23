console.log("[sw] loading");
const start = Date.now();
while (Date.now() - start < 500);

const cacheResources = ["/vite.svg"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async function () {
      console.log("[sw install] 存储资源列表");
      const cache = await caches.open("v1");
      await cache.addAll(cacheResources);
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async function () {
      if (self.registration.navigationPreload) {
        // https://web.developers.google.cn/blog/navigation-preload?hl=zh-tw#header
        console.log("[sw activate] 开启 fetch preload 能力");
        await self.registration.navigationPreload.enable();
      }
    })()
  );
});

addEventListener("fetch", (event) => {
  // const url = new URL(event.request.url);
  // if (cacheResources.includes(url.pathname)) {
  event.respondWith(
    (async function () {
      const cachedResponse = await caches.match(event.request);
      if (cachedResponse) {
        console.log("[sw fetch]", "从 cache 提取资源", event.request.url);
        return cachedResponse;
      }
      const response = await event.preloadResponse;
      if (response) {
        console.log("[sw fetch]", "preload 提取资源", event.request.url);
        return response;
      }

      // console.log("[sw fetch]", "network 提取资源", event.request.url);
      return fetch(event.request);
    })()
  );
});

/* Service Worker — Tarjetas de Redes
   Estrategia:
   - HTML y data.js: "network-first" (siempre intenta traer lo último; si no hay
     internet, usa la copia guardada). Así nunca ves tarjetas viejas estando online.
   - Íconos/manifest: "cache-first" (carga instantánea).
   Al cambiar el contenido, subí el número de versión (CACHE) para forzar refresco. */
const CACHE = "redes-v2";
const ASSETS = [
  "./", "./index.html", "./study.html", "./data.js",
  "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./icon-180.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  const isFresh = req.mode === "navigate" || url.pathname.endsWith(".html") || url.pathname.endsWith(".js");

  if (isFresh) {
    // network-first; offline → cache (ignorando el ?deck=... para que matchee study.html)
    e.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req, { ignoreSearch: true })
          .then((m) => m || caches.match(req.mode === "navigate" ? "./study.html" : req))
          .then((m) => m || caches.match("./index.html")))
    );
  } else {
    // cache-first
    e.respondWith(
      caches.match(req, { ignoreSearch: true }).then((m) => m || fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy));
        return res;
      }))
    );
  }
});

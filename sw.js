// Service Worker der Vorschau: legt alle Dateien ab, damit die installierte App auch ohne Netz startet.
const SPEICHER = "ps-vorschau-2026-11-11-mwc2j8f6";
const DATEIEN = ["./","index.html","handy.html","ipad.html","display.html","index.webmanifest","handy.webmanifest","ipad.webmanifest","display.webmanifest","icons/android-hdpi.png","icons/android-mdpi.png","icons/android-vordergrund.png","icons/android-xhdpi.png","icons/android-xxhdpi.png","icons/android-xxxhdpi.png","icons/apple-touch-icon.png","icons/favicon-64.png","icons/icon-192.png","icons/icon-512.png","icons/icon-maskable-512.png"];
self.addEventListener("install", (e) => { e.waitUntil(caches.open(SPEICHER).then((c) => c.addAll(DATEIEN)).then(() => self.skipWaiting())); });
self.addEventListener("activate", (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== SPEICHER).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then((r) => r || fetch(e.request)));
});

const CACHE_NAME = "imperio-personal-pwa-v1";
const APP_SHELL = ["./", "./index.html", "./manifest.json", "./icons/icon-192.png", "./icons/icon-512.png"];
self.addEventListener("install", event => { event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL))); self.skipWaiting(); });
self.addEventListener("activate", event => { event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))); self.clients.claim(); });
self.addEventListener("fetch", event => {
 const req=event.request; if(req.method!=="GET" || new URL(req.url).origin!==self.location.origin) return;
 event.respondWith(caches.match(req).then(cached=>{if(cached)return cached;return fetch(req).then(res=>{if(res&&res.status===200&&(res.type==="basic"||res.type==="default")){const copy=res.clone();caches.open(CACHE_NAME).then(cache=>cache.put(req,copy));}return res;}).catch(()=>caches.match("./index.html"));}));
});

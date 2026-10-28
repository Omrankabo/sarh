const CACHE='sarh-app-v8-course-artwork';
function validAsset(url,response){
 if(!response.ok)return false;
 const pathname=new URL(url,self.location.origin).pathname,type=response.headers.get('content-type')||'';
 if(pathname.startsWith('/illustrations/')&&pathname.endsWith('.webp'))return /image\/webp/i.test(type);
 if(pathname.startsWith('/_next/static/')&&pathname.endsWith('.css'))return /text\/css/i.test(type);
 if(pathname.startsWith('/_next/static/')&&pathname.endsWith('.js'))return /(?:java|ecma)script/i.test(type);
 return true;
}
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil((async()=>{for(const key of await caches.keys())if(key==='sarh-materials-v1'||(key.startsWith('sarh-app-v')&&key!==CACHE))await caches.delete(key);await self.clients.claim();})()));
self.addEventListener('message',e=>{if(e.data?.type==='CACHE')e.waitUntil((async()=>{const cache=await caches.open(CACHE);let failed=0;for(const url of [...new Set(e.data.urls)])try{const r=await fetch(url);if(validAsset(url,r))await cache.put(new Request(url),r);else failed++;}catch{failed++;}if(!failed)e.source?.postMessage({type:'CACHED'});})());});
self.addEventListener('fetch',e=>{
 const u=new URL(e.request.url);
 if(e.request.method!=='GET'||u.origin!==self.location.origin||u.pathname.includes('/api/')||u.pathname.startsWith('/__'))return;
 if(u.pathname.startsWith('/materials/')||u.pathname.endsWith('.pdf')){e.respondWith(new Response('Not available',{status:404}));return;}
 if(e.request.headers.get('RSC')==='1')return;
 const key=e.request.mode==='navigate'?new Request(u.origin+u.pathname):e.request;
 e.respondWith((async()=>{
  try{
   const response=await fetch(e.request);
   if(!validAsset(u.href,response)){
    const cached=await caches.match(key);
    if(cached&&validAsset(u.href,cached))return cached;
    if(response.ok&&u.pathname.startsWith('/_next/static/'))return new Response('Sarh asset unavailable. Restart Start-Sarh.cmd and refresh.',{status:502,headers:{'Content-Type':'text/plain'}});
    return response;
   }
   const cache=await caches.open(CACHE);await cache.put(key,response.clone());return response;
  }catch{
   const response=await caches.match(key);
   return response&&validAsset(u.href,response)?response:new Response('صَرح: open this page once while connected to save it offline.',{status:503,headers:{'Content-Type':'text/plain; charset=utf-8'}});
  }
 })());
});

const BUILD='v1-1-public-build-1';
const STALE_SHELL_PREFIXES=[
  'duaondevice-neural-pwa-spike-',
  'duaondevice-smart-search-b4-',
  'duaondevice-smart-search-b4r',
  'duaondevice-smart-search-b5-',
  'duaondevice-smart-search-b6-',
  'duaondevice-v1-0-public-build-'
];
function loadClassic(src){return new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=src;s.async=false;s.onload=resolve;s.onerror=()=>reject(new Error(`Script failed to load: ${src}`));document.body.appendChild(s)})}
function showError(e){console.error(e);if(typeof window.__dodShowBootError==='function')window.__dodShowBootError(e);else{const app=document.getElementById('app');if(app)app.textContent='DuaOnDevice could not start.'}}
async function purgeStaleShellCaches(){if(!('caches' in window))return;try{const keys=await caches.keys();await Promise.all(keys.filter(k=>STALE_SHELL_PREFIXES.some(p=>k.startsWith(p))).map(k=>caches.delete(k)))}catch(e){console.warn('Stale shell cache cleanup skipped',e)}}
(async()=>{await purgeStaleShellCaches();await loadClassic(`./neural-search.js?v=${BUILD}`);await loadClassic(`./app.js?v=${BUILD}`);if('serviceWorker' in navigator){navigator.serviceWorker.register(`./sw.js?v=${BUILD}`,{scope:'./'}).catch(e=>console.warn('Service worker unavailable',e))}})().catch(showError);

(()=>{
'use strict';

const ENABLED_KEY='dua-neural-e5-enabled';
const LEGACY_ACTIVE_KEY='dua-neural-model-active';
const WORKER_VERSION='b6-focused-e5-1';
const CORPUS_SHA='1debdccd9ba2c758a97cde4417f47264c8dbff574afc0c59b502c160cf583caa';
const MODEL={key:'e5',name:'Multilingual E5 Small',shortName:'E5 Small',id:'Xenova/multilingual-e5-small',approxMB:118,license:'MIT'};
let enabled=localStorage.getItem(ENABLED_KEY)==='1'||localStorage.getItem(LEGACY_ACTIVE_KEY)==='e5';
if(enabled)localStorage.setItem(ENABLED_KEY,'1');
let runtimeState={status:'idle',error:'',modelCached:false,vectorCached:false,enabled};
let worker=null,seq=0,preparePromise=null;
const pending=new Map();
function abortError(message='Local AI preparation canceled.'){const e=new Error(message);e.name='AbortError';e.code='DOD_ABORTED';return e}
function makeWorker(){
  const w=new Worker(`./neural-worker.js?v=${WORKER_VERSION}`);
  w.onmessage=e=>{
    const m=e.data||{},p=pending.get(m.requestId);if(!p)return;
    if(m.kind==='progress'){try{p.onProgress?.(m.progress)}catch{};return}
    if(m.kind==='response'){pending.delete(m.requestId);if(m.ok)p.resolve(m.result);else{const err=new Error(m.error?.message||'Local AI worker failed');err.name=m.error?.name||'Error';err.stack=m.error?.stack||err.stack;p.reject(err)}}
  };
  w.onerror=e=>{const err=new Error(e?.message||'Local AI worker crashed');for(const [,p] of pending){try{p.reject(err)}catch{}}pending.clear();try{w.terminate()}catch{}if(worker===w)worker=null};
  return w;
}
function ensureWorker(){if(!worker)worker=makeWorker();return worker}
function rpc(type,payload={},onProgress=null){const requestId=++seq,w=ensureWorker();return new Promise((resolve,reject)=>{pending.set(requestId,{resolve,reject,onProgress});w.postMessage({requestId,type,payload})})}
function terminateWorker(reason='Local AI worker restarted.'){
  if(worker){try{worker.terminate()}catch{}worker=null}
  const err=abortError(reason);for(const [,p] of pending){try{p.reject(err)}catch{}}pending.clear();
}
async function inspect(){
  const info=await rpc('inspect');
  enabled=localStorage.getItem(ENABLED_KEY)==='1'||localStorage.getItem(LEGACY_ACTIVE_KEY)==='e5';
  if(enabled)localStorage.setItem(ENABLED_KEY,'1');
  runtimeState={...runtimeState,modelCached:!!info.modelCached,vectorCached:!!info.vectorCached,staticIndex:!!info.staticIndex,enabled};
  return {...runtimeState};
}
async function prepare(records,{onProgress}={}){
  if(preparePromise)return preparePromise;
  enabled=true;localStorage.setItem(ENABLED_KEY,'1');
  runtimeState={...runtimeState,status:'preparing',error:'',enabled:true};
  preparePromise=(async()=>{
    try{
      const out=await rpc('prepare',{records},onProgress);
      runtimeState={status:'ready',error:'',modelCached:true,vectorCached:true,enabled:true,staticIndex:!!out.staticIndex,indexSource:out.indexSource||''};
      return {...runtimeState,...out};
    }catch(e){
      if(e?.name==='AbortError'||e?.code==='DOD_ABORTED'){runtimeState={...runtimeState,status:'idle',error:'',enabled};throw e}
      runtimeState={...runtimeState,status:'failed',error:e?.message||String(e),enabled};throw e;
    }finally{preparePromise=null}
  })();
  return preparePromise;
}
async function search(query,limit=8){return rpc('search',{query,limit})}
async function clear(){terminateWorker('Clearing local AI.');const out=await rpc('clear');localStorage.removeItem(ENABLED_KEY);localStorage.removeItem(LEGACY_ACTIVE_KEY);enabled=false;runtimeState={status:'idle',error:'',modelCached:false,vectorCached:false,enabled:false,staticIndex:false};return out}
function cancelPrepare(){if(!preparePromise)return false;terminateWorker('Local AI preparation canceled.');runtimeState={...runtimeState,status:'idle',error:'',enabled};return true}
async function exportIndex(){return rpc('exportIndex')}
function getState(){return{...runtimeState,enabled,model:MODEL.name,modelId:MODEL.id}}
function getModel(){return{...MODEL}}
window.addEventListener('pagehide',()=>{try{worker?.terminate()}catch{}});
window.DODNeural={prepare,search,inspect,clear,cancelPrepare,exportIndex,getState,getModel,MODEL,CORPUS_SHA};
})();

import {firebaseRepository,type DeviceTimer} from './firebase';
import {mergeNotebooks,type ScopedRepository} from './repository';
export type SyncStatus='local'|'syncing'|'synced'|'offline'|'error';
/** The durable local notebook is the outbox. It is never cleared on failed uploads. */
export function startAccountSync(uid:string,local:ScopedRepository,onStatus:(status:SyncStatus)=>void,onTimers:(timers:DeviceTimer[])=>void=()=>{}){
 let deviceId:string;try{deviceId=localStorage.getItem('sarh-device-id')||crypto.randomUUID();localStorage.setItem('sarh-device-id',deviceId)}catch{deviceId=crypto.randomUUID()}
 const cloud=firebaseRepository(uid,deviceId);let lastSuccess=false,stopped=false,applying=false,running:Promise<void>|null=null,again=false,timeout:ReturnType<typeof setTimeout>|undefined;
 const run=async()=>{
  if(stopped)return;if(!navigator.onLine){lastSuccess=false;onStatus('offline');return}if(running){again=true;return running}
  running=(async()=>{lastSuccess=false;onStatus('syncing');try{
   const remote=await cloud.load();if(stopped)return;
   const current=await local.load(),merged=mergeNotebooks(current,remote);merged.timer=current.timer;
   await cloud.save(merged);if(stopped)return;
   const confirmed=await cloud.load();if(stopped)return;
   const latest=await local.load(),next=mergeNotebooks(latest,confirmed);next.timer=latest.timer;
   if(JSON.stringify(next)!==JSON.stringify(latest)){applying=true;try{await local.save(next)}finally{applying=false}}
   onTimers(cloud.deviceTimers());lastSuccess=true;onStatus('synced');
  }catch{if(!stopped)onStatus(typeof navigator!=='undefined'&&!navigator.onLine?'offline':'error')}
  finally{running=null;if(again&&!stopped){again=false;schedule()}}})();return running;
 };
 const schedule=()=>{if(stopped)return;clearTimeout(timeout);timeout=setTimeout(()=>void run(),700)};
 const unsubscribe=local.subscribe(()=>{if(!applying)schedule()});
 const online=()=>void run(),offline=()=>onStatus('offline');window.addEventListener('online',online);window.addEventListener('offline',offline);window.addEventListener('focus',online);
 const unsubscribeCloud=cloud.subscribe(schedule,()=>onStatus('error'));void run();
 return{async flush(){await run();if(stopped)return false;if(again){again=false;await run()}return !stopped&&lastSuccess},stop(){stopped=true;clearTimeout(timeout);unsubscribeCloud();unsubscribe();window.removeEventListener('online',online);window.removeEventListener('offline',offline);window.removeEventListener('focus',online)}};
}

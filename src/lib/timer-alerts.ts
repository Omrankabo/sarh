import {openDB} from 'idb';
import type {Timer} from './types';
import {timerElapsed} from './study';

export function timerHasExpired(timer:Timer|null,now:number){
 return !!timer&&timer.status==='running'&&timer.mode!=='stopwatch'&&timerElapsed(timer,now)>=timer.duration;
}

/** An atomic, separate ledger survives reloads without modifying study history. */
export async function claimTimerAlert(id:string,at=Date.now()){
 const db=await openDB('sarh-alerts-v1',1,{upgrade(db){db.createObjectStore('delivered')}});
 try{
  const tx=db.transaction('delivered','readwrite');
  if(await tx.store.get(id)!==undefined){await tx.done;return false}
  await tx.store.put(at,id);await tx.done;return true;
 }finally{db.close()}
}

let audio:AudioContext|undefined;
export async function unlockTimerAudio(){
 try{audio??=new AudioContext();if(audio.state==='suspended')await audio.resume();return audio.state==='running'}catch{return false}
}
export async function playTimerChime(){
 if(!audio||audio.state!=='running')return false;
 const start=audio.currentTime;
 [523.25,659.25,783.99].forEach((frequency,index)=>{
  const oscillator=audio!.createOscillator(),gain=audio!.createGain(),at=start+index*.2;
  oscillator.type='sine';oscillator.frequency.value=frequency;
  gain.gain.setValueAtTime(0,at);gain.gain.linearRampToValueAtTime(.12,at+.025);gain.gain.exponentialRampToValueAtTime(.001,at+.7);
  oscillator.connect(gain);gain.connect(audio!.destination);oscillator.start(at);oscillator.stop(at+.75);
 });
 return true;
}

export async function showTimerNotification(body:string,id:string,ar:boolean){
 if(!('Notification'in window)||Notification.permission!=='granted')return;
 const options:NotificationOptions={body,tag:'sarh-timer-'+id,icon:'/icon.svg',dir:ar?'rtl':'ltr',lang:ar?'ar':'en',silent:true};
 try{
  const registration=await navigator.serviceWorker?.getRegistration();
  if(registration)await registration.showNotification('صَرح',options);
  else new Notification('صَرح',options);
 }catch{/* The in-app alert remains available if the operating system blocks notifications. */}
}

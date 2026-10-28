import {initializeApp,getApps} from 'firebase/app';
import {getAuth,connectAuthEmulator} from 'firebase/auth';
import {getFirestore,connectFirestoreEmulator,doc,getDocsFromServer,collection,runTransaction,onSnapshot} from 'firebase/firestore';
import type {StudyRepository} from './repository';
import type {Notebook,Timer} from './types';
import {freshNotebook,freshProgress,validNotebook} from './study';
import {emptyRecall,mergeRecall,projectRecall} from './recall';
import {notebookFields} from './repository';
let initialized=false;
export function firebaseServices(){
 const mode=process.env.NEXT_PUBLIC_FIREBASE_MODE;if(!mode||mode==='local')return null;
 const config={apiKey:process.env.NEXT_PUBLIC_FIREBASE_API_KEY||'demo-api-key',authDomain:process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN||'demo-sarh.firebaseapp.com',projectId:process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID||'demo-sarh',appId:process.env.NEXT_PUBLIC_FIREBASE_APP_ID||'demo-sarh'};
 if(mode==='cloud'&&Object.values(config).some(v=>v.startsWith('demo-')))throw Error('Firebase cloud configuration is incomplete');
 const app=getApps()[0]||initializeApp(config),auth=getAuth(app),db=getFirestore(app);
 if(mode==='emulator'&&!initialized){connectAuthEmulator(auth,'http://127.0.0.1:9099',{disableWarnings:true});connectFirestoreEmulator(db,'127.0.0.1',8089);initialized=true;}
 return{auth,db};
}
type RecordValue={key:string;value:any;at:number};
const kinds=['settings','progress','attempts','sessions','recallCards','recallEvents','recallMeta','imports','devices'] as const;
function clean<T>(value:T):T{return JSON.parse(JSON.stringify(value))}
export type DeviceTimer={device:string;timer:Timer|null;at:number};
export function cloudRecords(book:Notebook,deviceId?:string){
 const records:Record<string,RecordValue>={};
 const put=(kind:string,key:string,value:unknown,at=book.updatedAt)=>{records[`${kind}/${encodeURIComponent(key)}`]=clean({key,value,at})};
 for(const [key,value]of Object.entries(notebookFields(book)))put(key.startsWith('settings/')?'settings':'progress',key,value,book.fieldTimes?.[key]??book.updatedAt);
 for(const a of book.attempts)put('attempts',a.id,a,a.at);
 for(const s of book.sessions)put('sessions',s.id,s,s.end);
 for(const receipt of book.imports)put('imports',receipt,true,0);
 if(book.recall){
  for(const [key,value]of Object.entries(book.recall.cards))put('recallCards',key,value,value.memory?.last_review??value.enrolledAt);
  for(const e of book.recall.events)put('recallEvents',e.id,e,e.at);
  for(const [key,value]of Object.entries(book.recall.priorities))put('recallMeta',`priority/${key}`,value,value.at);
  for(const key of book.recall.dismissed)put('recallMeta',`dismissed/${key}`,true,0);
 }
 if(deviceId)put('devices',deviceId,{device:deviceId,timer:book.timer,at:book.updatedAt});
 return records;
}
export function mergeCloudRecord(old:RecordValue|undefined,next:RecordValue):RecordValue{
 if(!old)return next;
 if(next.key.endsWith('/completed'))return{...next,at:Math.max(old.at,next.at),value:[...new Set([...old.value,...next.value])]};
 if(next.key.endsWith('/errors'))return{...next,at:Math.max(old.at,next.at),value:[...new Map([...old.value,...next.value].map((v:any)=>[v.id,v])).values()]};
 return next.at>old.at||(next.at===old.at&&JSON.stringify(next.value)>JSON.stringify(old.value))?next:old;
}
export function firebaseRepository(userId:string,deviceId?:string):StudyRepository&{deviceTimers:()=>DeviceTimer[];subscribe(listener:()=>void,onError:()=>void):()=>void}{
 const services=firebaseServices();if(!services)throw Error('Cloud storage is disabled in local mode');const{auth,db}=services;
 const requireOwner=()=>{if(auth.currentUser?.uid!==userId||!auth.currentUser.emailVerified)throw Error('Verify your email before syncing this account');};
 let timers:DeviceTimer[]=[];
 const known=new Map<string,string>();
 let listening=false,ready:Promise<void>|null=null;
 const snapshots=new Map<string,{docs:{id:string;data:()=>unknown}[]}>();
 return{deviceTimers:()=>timers.filter(t=>t.device!==deviceId),async load(){
  requireOwner();const result=freshNotebook();result.updatedAt=0;result.fieldTimes={};result.recall=emptyRecall();
  const loaded=listening?(await ready,kinds.map(kind=>snapshots.get(kind)!)):await Promise.all(kinds.map(kind=>getDocsFromServer(collection(db,'users',userId,kind))));requireOwner();
  timers=[];loaded.forEach((snapshot,index)=>{const kind=kinds[index];for(const row of snapshot.docs){const r=row.data() as RecordValue;known.set(`${kind}/${encodeURIComponent(r.key)}`,JSON.stringify(r));result.updatedAt=Math.max(result.updatedAt,r.at);
   if(kind==='settings'||kind==='progress'){const parts=r.key.split('/');if(kind==='progress'&&parts[0]==='topics'&&parts[1])result.topics[parts[1]]??=freshProgress();if(parts.some(k=>['__proto__','constructor','prototype'].includes(k)))throw Error('Invalid progress key');let target:any=result;for(const key of parts.slice(0,-1))target=target[key]??={};target[parts.at(-1)!]=r.value;result.fieldTimes![r.key]=r.at;}
   else if(kind==='devices')timers.push(r.value);
   else if(kind==='attempts')result.attempts.push(r.value);
   else if(kind==='sessions')result.sessions.push(r.value);
   else if(kind==='imports')result.imports.push(r.key);
   else if(kind==='recallCards')result.recall!.cards[r.key]=r.value;
   else if(kind==='recallEvents')result.recall!.events.push(r.value);
   else if(r.key.startsWith('priority/'))result.recall!.priorities[r.key.slice(9)]=r.value;
   else if(r.key.startsWith('dismissed/'))result.recall!.dismissed.push(r.key.slice(10));
  }});
  result.recall=mergeRecall(emptyRecall(),result.recall);projectRecall(result);
  if(!validNotebook(result))throw Error('Cloud progress could not be validated. Local progress has been preserved.');return result;
 },async save(book){
  requireOwner();const records=Object.entries(cloudRecords(book,deviceId)).filter(([key,value])=>known.get(key)!==JSON.stringify(value));
  for(let start=0;start<records.length;start+=100){const chunk=records.slice(start,start+100);requireOwner();
   await runTransaction(db,async tx=>{requireOwner();const refs=await Promise.all(chunk.map(async([key])=>{const [kind,id]=key.split('/');const safe=id.length<900?id:Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(id)))).map(b=>b.toString(16).padStart(2,'0')).join('');return doc(db,'users',userId,kind,safe)}));const snapshots=await Promise.all(refs.map(ref=>tx.get(ref)));requireOwner();chunk.forEach(([,value],i)=>{const merged=mergeCloudRecord(snapshots[i].exists()?snapshots[i].data() as RecordValue:undefined,value);tx.set(refs[i],merged)});});
  }
 },subscribe(listener,onError){
  requireOwner();listening=true;let done=false,resolve!:()=>void,reject!:(e:unknown)=>void;
  ready=new Promise<void>((yes,no)=>{resolve=yes;reject=no});ready.catch(()=>{});
  const stops=kinds.map(kind=>onSnapshot(collection(db,'users',userId,kind),{includeMetadataChanges:true},snapshot=>{
   if(done||snapshot.metadata.fromCache||snapshot.metadata.hasPendingWrites)return;
   snapshots.set(kind,snapshot);if(snapshots.size===kinds.length){resolve();listener()}
  },error=>{reject(error);onError()}));
  return()=>{done=true;listening=false;stops.forEach(stop=>stop());reject(Error('Account sync stopped'))};
 }};
}

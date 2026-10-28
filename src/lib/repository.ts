import {openDB} from 'idb';
import {freshNotebook,validNotebook,freshProgress} from './study';
import {applyRating,mergeRecall,projectRecall,type RateCommand} from './recall';
import type {Notebook} from './types';
export interface StudyRepository{load():Promise<Notebook>;save(book:Notebook,replace?:boolean):Promise<void>}
export type ScopedRepository=StudyRepository&{scope:string;rate(command:RateCommand):Promise<{book:Notebook;accepted:boolean}>;clear():Promise<void>;subscribe(listener:()=>void):()=>void};
const database=()=>openDB('sarh-study-v1',1,{upgrade(db){db.createObjectStore('notebook');}});
export function notebookFields(book:Notebook){
 const fields:Record<string,unknown>={};
 for(const [key,value]of Object.entries(book.settings))fields[`settings/${key}`]=value;
 for(const [id,p]of Object.entries(book.topics))for(const [key,value]of Object.entries(p)){
  if(['answers','prereqs','predictions','cards'].includes(key))for(const [item,v]of Object.entries(value))fields[`topics/${id}/${key}/${item}`]=v;
  else fields[`topics/${id}/${key}`]=value;
 }
 return fields;
}
export function markNotebookChanges(old:Notebook|undefined,book:Notebook){
 const fields=notebookFields(book),before=old?notebookFields(old):{};
 book.fieldTimes={...old?.fieldTimes,...book.fieldTimes};
 for(const [key,v]of Object.entries(fields))if(JSON.stringify(v)!==JSON.stringify(before[key]))book.fieldTimes[key]=Math.max(book.updatedAt,book.fieldTimes[key]??0);
}
export function mergeNotebooks(old:Notebook,book:Notebook){
 const newer=old.updatedAt>book.updatedAt?old:book,older=newer===book?old:book;
 const unique=<T extends {id:string}>(a:T[],b:T[])=>[...new Map([...a,...b].map(x=>[x.id,x])).values()];
 const topics={...structuredClone(older.topics),...structuredClone(newer.topics)};
 for(const id of Object.keys(topics)){
  const a=older.topics[id]??freshProgress(),b=newer.topics[id]??freshProgress();
  topics[id]={...a,...b,completed:[...new Set([...a.completed,...b.completed])],answers:{...a.answers,...b.answers},cards:{...a.cards,...b.cards},prereqs:{...a.prereqs,...b.prereqs},predictions:{...a.predictions,...b.predictions},errors:unique(a.errors,b.errors)};
 }
 const result={...structuredClone(newer),topics,imports:[...new Set([...old.imports,...book.imports])],recall:mergeRecall(old.recall,book.recall),attempts:unique(old.attempts,book.attempts),sessions:unique(old.sessions,book.sessions)};
 const af=notebookFields(old),bf=notebookFields(book);result.fieldTimes={};
 for(const key of new Set([...Object.keys(af),...Object.keys(bf)])){
  const at=old.fieldTimes?.[key]??old.updatedAt,bt=book.fieldTimes?.[key]??book.updatedAt;
  const useB=af[key]===undefined||(bf[key]!==undefined&&(bt>at||(bt===at&&JSON.stringify(bf[key])>=JSON.stringify(af[key]))));
  result.fieldTimes[key]=useB?bt:at;
  if(key.endsWith('/completed')||key.endsWith('/errors'))continue;
  const parts=key.split('/');let target:any=result;
  for(const part of parts.slice(0,-1))target=target[part]??={};
  target[parts.at(-1)!]=structuredClone(useB?bf[key]:af[key]);
 }
 return projectRecall(result);
}
const listeners=new Map<string,Set<()=>void>>();
export function scopedRepository(scope='guest'):ScopedRepository{
 const key=scope==='guest'?'personal':`account:${scope}`;
 const notify=()=>listeners.get(scope)?.forEach(fn=>fn());
 return{scope,
 async load(){const db=await database();try{const b=await db.get('notebook',key);if(b!==undefined&&!validNotebook(b))throw Error('Saved progress could not be read. It has not been replaced.');const result:Notebook=b??freshNotebook();if(b===undefined&&scope!=='guest')result.updatedAt=0;result.fieldTimes??={};for(const field of Object.keys(notebookFields(result)))result.fieldTimes[field]??=result.updatedAt;return result;}finally{db.close()}},
 async save(book,replace=false){const db=await database();try{if(!validNotebook(book))throw Error('Invalid progress: saved records have not been replaced.');const tx=db.transaction('notebook','readwrite');const old=await tx.store.get(key) as Notebook|undefined;if(old&&!validNotebook(old)){tx.abort();throw Error('Saved progress needs recovery');}book.fieldTimes??={};for(const field of Object.keys(notebookFields(book)))book.fieldTimes[field]??=book.updatedAt;if(!replace&&old)book=mergeNotebooks(old,book);await tx.store.put(book,key);await tx.done;}finally{db.close()}notify()},
 async rate(command){const db=await database();try{const tx=db.transaction('notebook','readwrite');const saved=await tx.store.get(key);if(saved!==undefined&&!validNotebook(saved)){tx.abort();throw Error('Saved progress needs recovery');}const book:Notebook=saved??freshNotebook();const accepted=applyRating(book,command);if(accepted){book.updatedAt=Math.max(Date.now(),book.updatedAt+1);await tx.store.put(book,key);}await tx.done;if(accepted)notify();return{book,accepted};}finally{db.close()}}
,async clear(){const db=await database();try{await db.delete('notebook',key)}finally{db.close()}notify()},
 subscribe(listener){const set=listeners.get(scope)??new Set<()=>void>();set.add(listener);listeners.set(scope,set);return()=>{set.delete(listener)}}
 };}
export const localRepository=scopedRepository();
export async function guestImport(account:ScopedRepository){
 const guest=await localRepository.load(),current=await account.load(),receipt=`guest-v1:${guest.updatedAt}`;
 if(current.imports.includes(receipt))return false;
 const imported=structuredClone(guest);imported.timer=null;
 const merged=mergeNotebooks(imported,current);merged.imports.push(receipt);merged.updatedAt=Math.max(Date.now(),current.updatedAt+1);await account.save(merged);return true;
}

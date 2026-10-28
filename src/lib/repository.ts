import {openDB} from 'idb';
import {freshNotebook,validNotebook} from './study';
import {applyRating,mergeRecall,projectRecall,type RateCommand} from './recall';
import type {Notebook} from './types';
export interface StudyRepository{load():Promise<Notebook>;save(book:Notebook,replace?:boolean):Promise<void>}
const database=()=>openDB('sarh-study-v1',1,{upgrade(db){db.createObjectStore('notebook');}});
export function mergeNotebooks(old:Notebook,book:Notebook){
 const newer=old.updatedAt>book.updatedAt?old:book;
 const unique=<T extends {id:string}>(a:T[],b:T[])=>[...new Map([...a,...b].map(x=>[x.id,x])).values()];
 return projectRecall({...structuredClone(newer),recall:mergeRecall(old.recall,book.recall),attempts:unique(old.attempts,book.attempts),sessions:unique(old.sessions,book.sessions)});
}
export const localRepository:StudyRepository&{rate(command:RateCommand):Promise<{book:Notebook;accepted:boolean}>}={
 async load(){const db=await database();try{const b=await db.get('notebook','personal');if(b!==undefined&&!validNotebook(b))throw Error('Saved progress could not be read. It has not been replaced.');return b??freshNotebook();}finally{db.close()}},
 async save(book,replace=false){const db=await database();try{const tx=db.transaction('notebook','readwrite');const old=await tx.store.get('personal') as Notebook|undefined;if(old&&!validNotebook(old)){tx.abort();throw Error('Saved progress needs recovery');}if(!replace&&old)book=mergeNotebooks(old,book);await tx.store.put(book,'personal');await tx.done;}finally{db.close()}},
 async rate(command){const db=await database();try{const tx=db.transaction('notebook','readwrite');const saved=await tx.store.get('personal');if(saved!==undefined&&!validNotebook(saved)){tx.abort();throw Error('Saved progress needs recovery');}const book:Notebook=saved??freshNotebook();const accepted=applyRating(book,command);if(accepted){book.updatedAt=Math.max(Date.now(),book.updatedAt+1);await tx.store.put(book,'personal');}await tx.done;return{book,accepted};}finally{db.close()}}
};

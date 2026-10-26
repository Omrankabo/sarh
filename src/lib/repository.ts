import {openDB} from 'idb';
import {freshNotebook,validNotebook} from './study';
import type {Notebook} from './types';
export interface StudyRepository{load():Promise<Notebook>;save(book:Notebook,replace?:boolean):Promise<void>}
const database=()=>openDB('sarh-study-v1',1,{upgrade(db){db.createObjectStore('notebook');}});
export const localRepository:StudyRepository={async load(){const db=await database();const b=await db.get('notebook','personal');return validNotebook(b)?b:freshNotebook();},async save(book,replace=false){const db=await database();const tx=db.transaction('notebook','readwrite');const old=await tx.store.get('personal') as Notebook|undefined;if(!replace&&old){const newer=old.updatedAt>book.updatedAt?old:book;const unique=<T extends {id:string}>(a:T[],b:T[])=>[...new Map([...a,...b].map(x=>[x.id,x])).values()];book={...newer,attempts:unique(old.attempts,book.attempts),sessions:unique(old.sessions,book.sessions)};}await tx.store.put(book,'personal');await tx.done;}};

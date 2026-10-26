import {initializeApp,getApps} from 'firebase/app';
import {getAuth,connectAuthEmulator} from 'firebase/auth';
import {getFirestore,connectFirestoreEmulator,doc,getDoc,getDocs,collection,writeBatch} from 'firebase/firestore';
import type {StudyRepository} from './repository';
import type {Notebook,Progress,Attempt,FocusSession} from './types';
import {freshNotebook} from './study';
let initialized=false;
export function firebaseServices(){
 const mode=process.env.NEXT_PUBLIC_FIREBASE_MODE;if(!mode||mode==='local')return null;
 const config={apiKey:process.env.NEXT_PUBLIC_FIREBASE_API_KEY||'demo-api-key',authDomain:process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN||'demo-sarh.firebaseapp.com',projectId:process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID||'demo-sarh',appId:process.env.NEXT_PUBLIC_FIREBASE_APP_ID||'demo-sarh'};
 if(mode==='cloud'&&(!process.env.NEXT_PUBLIC_FIREBASE_API_KEY||!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID))throw Error('Firebase cloud configuration is incomplete');
 const app=getApps()[0]||initializeApp(config),auth=getAuth(app),db=getFirestore(app);
 if(mode==='emulator'&&!initialized){connectAuthEmulator(auth,'http://127.0.0.1:9099',{disableWarnings:true});connectFirestoreEmulator(db,'127.0.0.1',8089);initialized=true;}
 return{auth,db};
}
export function firebaseRepository(userId:string):StudyRepository{
 const services=firebaseServices();if(!services)throw Error('Cloud storage is disabled in local mode');const{auth,db}=services;
 const requireOwner=()=>{if(auth.currentUser?.uid!==userId)throw Error('Sign in as the owner before accessing the cloud notebook');};
 return{async load(){requireOwner();const result=freshNotebook();const [meta,topics,attempts,sessions]=await Promise.all([getDoc(doc(db,'users',userId,'meta','notebook')),getDocs(collection(db,'users',userId,'topics')),getDocs(collection(db,'users',userId,'attempts')),getDocs(collection(db,'users',userId,'sessions'))]);if(meta.exists())Object.assign(result,meta.data());result.topics=Object.fromEntries(topics.docs.map(d=>[d.id,d.data() as Progress]));result.attempts=attempts.docs.map(d=>d.data() as Attempt);result.sessions=sessions.docs.map(d=>d.data() as FocusSession);return result;},async save(book:Notebook){requireOwner();const{topics,attempts,sessions,...meta}=book;const writes:[string,string,object][]=[['meta','notebook',meta],...Object.entries(topics).map(([id,p])=>['topics',id,p] as [string,string,object]),...attempts.map(a=>['attempts',a.id,a] as [string,string,object]),...sessions.map(s=>['sessions',s.id,s] as [string,string,object])];for(let i=0;i<writes.length;i+=400){const batch=writeBatch(db);for(const [kind,id,value]of writes.slice(i,i+400))batch.set(doc(db,'users',userId,kind,id),value);await batch.commit();}}};
}

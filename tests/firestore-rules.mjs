import fs from 'node:fs';
import {initializeTestEnvironment,assertSucceeds,assertFails} from '@firebase/rules-unit-testing';
import {doc,setDoc,getDoc} from 'firebase/firestore';
const env=await initializeTestEnvironment({projectId:'demo-sarh',firestore:{host:'127.0.0.1',port:8089,rules:fs.readFileSync('firestore.rules','utf8')}});
try{
 const own=env.authenticatedContext('owner',{email_verified:true}).firestore(),other=env.authenticatedContext('other',{email_verified:true}).firestore(),unverified=env.authenticatedContext('owner',{email_verified:false}).firestore(),guest=env.unauthenticatedContext().firestore();
 const path='users/owner/settings/language',record={key:'settings/language',value:'ar',at:1};
 await assertSucceeds(setDoc(doc(own,path),record));await assertSucceeds(getDoc(doc(own,path)));
 for(const db of [other,unverified,guest]){await assertFails(getDoc(doc(db,path)));await assertFails(setDoc(doc(db,path),record))}
 await assertFails(setDoc(doc(own,'users/other/settings/language'),record));
 await assertFails(setDoc(doc(own,'users/owner/settings/bad'),{secret:'wrong'}));
 await assertFails(setDoc(doc(own,'users/owner/admin/permissions'),record));
 await assertFails(setDoc(doc(own,'course/private'),record));
 console.log('PASS: verified owner only; other accounts, guests, unverified users, unsupported collections and invalid records denied.');
}finally{await env.cleanup()}

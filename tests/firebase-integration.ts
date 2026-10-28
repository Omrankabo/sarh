import 'fake-indexeddb/auto';
import assert from 'node:assert/strict';
import {createUserWithEmailAndPassword,sendEmailVerification,applyActionCode,signOut,signInWithEmailAndPassword,sendPasswordResetEmail,confirmPasswordReset,GoogleAuthProvider,signInWithCredential,linkWithCredential,EmailAuthProvider} from 'firebase/auth';
import {initializeApp,deleteApp} from 'firebase/app';
import {getFirestore,connectFirestoreEmulator,doc,getDoc,terminate} from 'firebase/firestore';
async function main(){
process.env.NEXT_PUBLIC_FIREBASE_MODE='emulator';
const {firebaseServices,firebaseRepository}=await import('../src/lib/firebase');
const {freshNotebook,freshProgress}=await import('../src/lib/study');
const {mergeNotebooks}=await import('../src/lib/repository');
const {auth,db}=firebaseServices()!;
const password='Emulator-only-'+crypto.randomUUID();
async function codes(){return (await (await fetch('http://127.0.0.1:9099/emulator/v1/projects/demo-sarh/oobCodes')).json()).oobCodes}
async function verified(email:string){const result=await createUserWithEmailAndPassword(auth,email,password);await sendEmailVerification(result.user);const entries=await codes(),code=entries.findLast((c:any)=>c.email===email&&c.requestType==='VERIFY_EMAIL');assert(code);await applyActionCode(auth,code.oobCode);await result.user.reload();await result.user.getIdToken(true);assert(result.user.emailVerified);return result.user}
const suffix=crypto.randomUUID(),emailA=`a-${suffix}@sarh.example`,emailB=`b-${suffix}@sarh.example`;
try{
 const a=await verified(emailA),repoA=firebaseRepository(a.uid),book=freshNotebook();book.topics.x=freshProgress();book.topics.x.completed=['first'];book.updatedAt=100;await repoA.save(book);const returned=await repoA.load();assert.deepEqual(returned.topics.x.completed,['first']);
 const tablet=structuredClone(returned);tablet.topics.x.completed.push('second');tablet.updatedAt=200;await firebaseRepository(a.uid).save(tablet);assert.equal((await repoA.load()).topics.x.completed.length,2);
 await signOut(auth);await assert.rejects(()=>repoA.load());
 const unverified=await createUserWithEmailAndPassword(auth,emailB,password);await assert.rejects(()=>firebaseRepository(unverified.user.uid).save(freshNotebook()));await sendEmailVerification(unverified.user);const code=(await codes()).findLast((c:any)=>c.email===emailB&&c.requestType==='VERIFY_EMAIL');await applyActionCode(auth,code.oobCode);await unverified.user.reload();await unverified.user.getIdToken(true);
 const repoB=firebaseRepository(unverified.user.uid);assert.equal(Object.keys((await repoB.load()).topics).length,0);await assert.rejects(()=>repoA.load());
 const otherApp=initializeApp({apiKey:'demo-api-key',projectId:'demo-sarh'},'anonymous-probe'),otherDB=getFirestore(otherApp);connectFirestoreEmulator(otherDB,'127.0.0.1',8089);await assert.rejects(()=>getDoc(doc(otherDB,'users',a.uid,'settings','settings%2Flanguage')));await terminate(otherDB);await deleteApp(otherApp);
 await signOut(auth);await sendPasswordResetEmail(auth,emailA);const reset=(await codes()).findLast((c:any)=>c.email===emailA&&c.requestType==='PASSWORD_RESET');assert(reset);const replacement='New-emulator-only-'+crypto.randomUUID();await confirmPasswordReset(auth,reset.oobCode,replacement);await signInWithEmailAndPassword(auth,emailA,replacement);assert.equal(auth.currentUser!.uid,a.uid);assert.equal((await repoA.load()).topics.x.completed.length,2);
 await signOut(auth);
 const googleEmail=`g-${suffix}@sarh.example`,credential=GoogleAuthProvider.credential(JSON.stringify({sub:'google-'+suffix,email:googleEmail,email_verified:true}));
 const google=await signInWithCredential(auth,credential);assert(google.user.emailVerified);assert.notEqual(google.user.uid,a.uid);
 await signOut(auth);await signInWithEmailAndPassword(auth,emailA,replacement);
 const linked=GoogleAuthProvider.credential(JSON.stringify({sub:'linked-google-'+suffix,email:emailA,email_verified:true}));await linkWithCredential(auth.currentUser!,linked);
 await signOut(auth);await signInWithCredential(auth,linked);assert.equal(auth.currentUser!.uid,a.uid);
 console.log('PASS: Google emulation, password-to-Google linking, email registration, verification, cloud round-trip, two-device completion union, account isolation, sign-out, denied anonymous access, password reset and re-login.');
}finally{await signOut(auth);await terminate(db);await deleteApp(auth.app)}

}
main().catch(error=>{console.error(error);process.exitCode=1});

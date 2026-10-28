import 'fake-indexeddb/auto';
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {scopedRepository,localRepository,guestImport,mergeNotebooks} from '../src/lib/repository';
import {freshNotebook,freshProgress,report} from '../src/lib/study';
import {applyRating,emptyRecall,mergeRecall} from '../src/lib/recall';
import {cloudRecords,mergeCloudRecord} from '../src/lib/firebase';

test('account notebooks and review writes cannot leak into another user or the legacy guest',async()=>{
 const a=scopedRepository('account-a'),b=scopedRepository('account-b');await a.clear();await b.clear();
 const book=freshNotebook();book.topics.x=freshProgress();book.topics.x.step=3;await a.save(book);
 assert.equal((await b.load()).topics.x,undefined);
 await a.rate({id:'only-a',topic:'x',card:'c',at:1000,rating:3,revision:0});assert.equal((await a.load()).attempts.length,1);assert.equal((await b.load()).attempts.length,0);
 await a.clear();assert.equal((await a.load()).attempts.length,0);
});
test('guest migration is explicit, repeat-safe, keeps the guest copy and never transfers a running timer',async()=>{
 const guest=freshNotebook();guest.updatedAt=1;guest.attempts=[{id:'guest-question',at:1000,topic:'x',item:'q',correct:true,assisted:false,kind:'question'}];guest.timer={id:'guest-timer',topic:'x',mode:'focus',status:'running',duration:1500000,accumulated:0,startedAt:1000,segments:[]};await localRepository.save(guest,true);
 const account=scopedRepository('import-user');await account.clear();assert.equal((await account.load()).attempts.length,0);assert.equal(await guestImport(account),true);assert.equal(await guestImport(account),false);
 assert.equal((await account.load()).attempts.length,1);assert.equal((await account.load()).timer,null);assert.equal((await localRepository.load()).attempts.length,1);
});
test('per-field merges retain work on separate topics and answer items',()=>{
 const a=freshNotebook(),b=freshNotebook();a.updatedAt=50;b.updatedAt=100;a.topics.x=freshProgress();b.topics.x=freshProgress();a.topics.x.answers.q={draft:'new answer',choice:1,hints:0,revealed:false};b.topics.x.answers.q={draft:'stale answer',choice:null,hints:0,revealed:false};a.fieldTimes={'topics/x/answers/q':200};b.fieldTimes={'topics/x/answers/q':10};b.topics.x.completed=['b'];a.topics.x.completed=['a'];
 const result=mergeNotebooks(a,b);assert.equal(result.topics.x.answers.q.draft,'new answer');assert.deepEqual(new Set(result.topics.x.completed),new Set(['a','b']));
});
test('concurrent offline recalls replay consistently in either merge order without discarding events',()=>{
 const a=freshNotebook(),b=freshNotebook();a.recall=emptyRecall();b.recall=emptyRecall();applyRating(a,{id:'a',topic:'x',card:'c',at:1000,rating:3,revision:0});applyRating(b,{id:'b',topic:'x',card:'c',at:2000,rating:1,revision:0});
 const ab=mergeRecall(a.recall,b.recall)!,ba=mergeRecall(b.recall,a.recall)!;
 assert.equal(ab.events.length,2);assert.deepEqual(ab.cards,ba.cards);assert.equal(ab.cards['x::c'].revision,2);assert.equal(ab.cards['x::c'].rating,1);
});
test('overlapping devices and duplicate sessions cannot inflate weekly focus minutes',()=>{
 const book=freshNotebook(),start=Date.parse('2026-10-28T10:00:00+03:00');book.sessions=[{id:'a',topic:'x',start,end:start+1200000,milliseconds:1200000},{id:'b',topic:'y',start:start+600000,end:start+1800000,milliseconds:1200000}];assert.equal(report(book,start).minutes,30);
});
test('cloud records omit active timers and keep attempts, sessions and reviews separate',()=>{
 const b=freshNotebook();b.timer={id:'t',mode:'focus',status:'running',topic:'x',duration:1000,accumulated:0,startedAt:1000,segments:[]};applyRating(b,{id:'review',topic:'x',card:'c',at:2000,rating:3,revision:0});const records=cloudRecords(b);assert(!JSON.stringify(records).includes('"startedAt"'));assert(records['attempts/review']);assert(records['recallEvents/review']);
});
test('cloud field conflict resolution and completion unions are deterministic',()=>{
 const old={key:'topics/x/completed',value:['a'],at:20},next={key:'topics/x/completed',value:['b'],at:10};assert.deepEqual(new Set(mergeCloudRecord(old,next).value),new Set(['a','b']));assert.equal(mergeCloudRecord({key:'settings/language',value:'ar',at:20},{key:'settings/language',value:'en',at:10}).value,'ar');
});

test('a fresh account cache does not replace cloud preferences on a new device',async()=>{
 const account=scopedRepository('brand-new-device');await account.clear();const local=await account.load(),remote=freshNotebook();remote.updatedAt=100;remote.settings.language='en';remote.settings.focus=40;remote.fieldTimes={'settings/language':100,'settings/focus':100};
 const result=mergeNotebooks(local,remote);assert.equal(result.settings.language,'en');assert.equal(result.settings.focus,40);
});

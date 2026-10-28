import test from 'node:test';
import assert from 'node:assert/strict';
import 'fake-indexeddb/auto';
import {freshNotebook,freshProgress,validNotebook,report,day} from '../src/lib/study';
import {applyRating,enroll,previews,quickQueue,recallItems,recallKey,sessionRemaining,type RateCommand} from '../src/lib/recall';
import {localRepository,mergeNotebooks} from '../src/lib/repository';
import {mainArea} from '../src/lib/visit';
import type {Topic} from '../src/lib/types';
const now=Date.parse('2026-10-27T10:00:00+03:00');
const topic={id:'beam',steps:[{id:'rotation',concepts:['stiffness']}],concepts:[{id:'stiffness',title:{en:'Stiffness',ar:'صلابة'}}],cards:[{id:'c1',concept:'stiffness'},{id:'c2',concept:'stiffness'},{id:'c3',concept:'loads'}]} as Topic;
const cmd=(patch:Partial<RateCommand>={}):RateCommand=>({id:'rating-1',topic:'beam',card:'c1',at:now,rating:3,revision:0,...patch});
test('understood concepts enroll once; unread cards remain excluded and first recalls are never overdue',()=>{
 const b=freshNotebook();b.topics.beam=freshProgress();enroll(b,[topic],now);assert.equal(recallItems([topic],b,now).length,0);
 b.topics.beam.completed=['rotation'];enroll(b,[topic],now);enroll(b,[topic],now+86400000);
 assert.equal(Object.keys(b.recall!.cards).length,2);assert.equal(b.recall!.cards[recallKey('beam','c1')].enrolledAt,now);
 assert(recallItems([topic],b,now+90*86400000).every(i=>i.group==='new'));assert.equal(b.attempts.length,0);assert(validNotebook(b));
});
test('all four ratings schedule future reviews, with correct effort distinct from forgetting',()=>{
 const options=previews(undefined,now);assert.equal(options.length,4);assert(options.every(o=>o.memory.due>now));assert(options[0].memory.due<options[3].memory.due);
 for(const rating of [1,2,3,4] as const){const b=freshNotebook();assert(applyRating(b,cmd({rating})));assert.equal(b.attempts[0].correct,rating!==1);assert.equal(b.attempts[0].selfAssessed,true);assert(validNotebook(b));assert.equal(report(b,now).independent,0);}
});
test('successful, late and early reviews use the actual review timestamp',()=>{
 const b=freshNotebook();applyRating(b,cmd());const first=b.recall!.cards['beam::c1'].memory!;
 const late=first.due+10*86400000;assert(applyRating(b,cmd({id:'late',at:late,revision:1,rating:3})));const second=b.recall!.cards['beam::c1'].memory!;
 assert.equal(second.last_review,late);assert(second.due>late);assert(applyRating(b,cmd({id:'early',at:late+86400000,revision:2,rating:2})));assert.equal(b.recall!.events.length,3);
});
test('existing card due dates survive enrollment; no historic ratings are invented',()=>{
 const b=freshNotebook();b.topics.beam=freshProgress();b.topics.beam.cards.c1={due:now-86400000,interval:7};enroll(b,[topic],now);
 assert.equal(b.topics.beam.cards.c1.due,now-86400000);assert.equal(b.recall!.cards['beam::c1'].memory,undefined);assert.equal(b.recall!.events.length,0);
 assert.equal(recallItems([topic],b,now)[0].group,'overdue');applyRating(b,cmd());assert(b.topics.beam.cards.c1.due>now);
});
test('double submission and stale concurrent ratings cannot advance one card twice',()=>{
 const b=freshNotebook();assert(applyRating(b,cmd()));assert.equal(applyRating(b,cmd()),false);assert.equal(applyRating(b,cmd({id:'other-tab'})),false);assert.equal(b.attempts.length,1);
});
test('snapshot merges retain independently reviewed cards and preserve the newer schedule',()=>{
 const initial=freshNotebook(),a=structuredClone(initial),b=structuredClone(initial);applyRating(a,cmd());applyRating(b,cmd({id:'second',card:'c2',rating:1}));b.updatedAt=a.updatedAt+1;
 const merged=mergeNotebooks(a,b);assert.equal(merged.attempts.length,2);assert(merged.topics.beam.cards.c1);assert(merged.topics.beam.cards.c2);
 const stale=structuredClone(merged);applyRating(merged,cmd({id:'again',revision:1,at:now+86400000}));assert.equal(mergeNotebooks(merged,stale).recall!.cards['beam::c1'].revision,2);
});
test('IndexedDB serializes two competing ratings and retains both separate-card ratings',async()=>{
 await localRepository.save(freshNotebook(),true);
 const results=await Promise.all([localRepository.rate(cmd()),localRepository.rate(cmd({id:'racing'}))]);assert.equal(results.filter(r=>r.accepted).length,1);
 await localRepository.rate(cmd({id:'second',card:'c2'}));const saved=await localRepository.load();assert.equal(saved.recall!.events.length,2);assert.equal(saved.attempts.length,2);
});
test('Riyadh midnight changes today to overdue and dismissal only covers its own date',()=>{
 const b=freshNotebook();b.topics.beam=freshProgress();b.topics.beam.cards.c1={due:Date.parse('2026-10-27T23:00:00+03:00'),interval:1};enroll(b,[topic],now);
 const before=Date.parse('2026-10-27T23:59:59+03:00'),after=before+1000;assert.equal(recallItems([topic],b,before)[0].group,'today');assert.equal(recallItems([topic],b,after)[0].group,'overdue');b.recall!.dismissed.push(day(before));assert(!b.recall!.dismissed.includes(day(after)));
});
test('ranked review queue excludes future cards and respects priority within an urgency group',()=>{
 const t2={...topic,id:'soil'},b=freshNotebook();for(const t of [topic,t2]){b.topics[t.id]=freshProgress();b.topics[t.id].completed=['rotation'];b.topics[t.id].cards.c1={due:now-86400000,interval:3};}enroll(b,[topic,t2],now);b.recall!.priorities.soil={value:3,at:now};b.topics.beam.cards.c3={due:now+86400000,interval:1};
 const items=recallItems([topic,t2],b,now);assert.equal(items[0].topic.id,'soil');assert(!quickQueue(items).includes('beam::c3'));assert(quickQueue(items).length<=10);
});
test('review session survives serialization and advances once by event, never by array index',()=>{
 const b=freshNotebook();enroll(b,[topic],now);b.recall!.session={id:'s',keys:['beam::c1','beam::c2'],revealed:'beam::c1',startedAt:now,updatedAt:now};b.recall!.sessionUpdatedAt=now;
 applyRating(b,cmd({session:'s'}));const restored=JSON.parse(JSON.stringify(b));assert(validNotebook(restored));assert.deepEqual(sessionRemaining(restored.recall!),['beam::c2']);assert.equal(restored.recall!.session!.revealed,null);
});
test('language switches and topic subpaths share one main navigation area',()=>{
 assert.equal(mainArea('/en/topics/slope-beams'),mainArea('/ar/subjects'));assert.equal(mainArea('/en'),'home');assert.equal(mainArea('/ar/review'),'review');assert.equal(mainArea('/en/materials/structures-ii'),'materials');
});
test('concept variety never promotes new cards ahead of due work; sessions cap at ten',()=>{
 const t={...topic,cards:Array.from({length:14},(_,i)=>({id:'c'+i,concept:i===13?'loads':'stiffness'}))} as Topic,b=freshNotebook();b.topics.beam=freshProgress();b.topics.beam.completed=['rotation'];
 for(let i=0;i<12;i++)b.topics.beam.cards['c'+i]={due:now-86400000,interval:3};enroll(b,[t],now);
 const items=recallItems([t],b,now),keys=quickQueue(items);assert.equal(keys.length,10);assert(keys.every(k=>items.find(i=>i.key===k)?.group==='overdue'));
});
test('the visit tracker accepts each main area once, across translated paths',async()=>{
 const {claimEntrance}=await import('../src/lib/visit');assert.equal(claimEntrance('/en'),true);assert.equal(claimEntrance('/ar'),false);assert.equal(claimEntrance('/en/subjects'),true);assert.equal(claimEntrance('/ar/topics/slope-beams'),false);assert.equal(claimEntrance('/en/review'),true);assert.equal(claimEntrance('/ar/review'),false);
});

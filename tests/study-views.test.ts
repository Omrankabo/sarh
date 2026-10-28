import {test} from 'node:test';
import assert from 'node:assert/strict';
import {cardQueues,nextStudy,reviewSummary} from '../src/lib/study-views';
import {freshNotebook,freshProgress} from '../src/lib/study';
import type {Card,Topic} from '../src/lib/types';

const cards=['new','due','future'].map(id=>({id})) as Card[];
const topic={id:'beam',cards,steps:[{id:'first'},{id:'second'}]} as Topic;
test('new cards are separate from due reviews, including the exact due boundary',()=>{
 const p=freshProgress();p.cards={due:{due:100,interval:1},future:{due:101,interval:3}};
 assert.deepEqual(cardQueues(cards,p,100).due.map(c=>c.id),['due']);
 assert.deepEqual(cardQueues(cards,p,100).unseen.map(c=>c.id),['new']);
 const b=freshNotebook();b.topics.beam=p;
 assert.deepEqual(reviewSummary([topic],b,100),{due:1,unseen:1});
 assert.deepEqual(reviewSummary([topic],freshNotebook(),100),{due:0,unseen:3});
});
test('new learner starts with understanding; saved location resumes without changing progress',()=>{
 const b=freshNotebook();assert.equal(nextStudy([topic],b).tab,'start');assert.equal(nextStudy([topic],b).active,false);
 b.topics.beam={...freshProgress(),step:1,tab:'practice'};
 const before=JSON.stringify(b),next=nextStudy([topic],b);
 assert.equal(next.tab,'practice');assert.equal(next.step,1);assert.equal(next.active,true);assert.equal(JSON.stringify(b),before);
});
test('recent activity in a removed topic cannot select a broken destination',()=>{
 const b=freshNotebook();b.attempts=[{id:'x',at:1,item:'q',topic:'removed',kind:'question',correct:true,assisted:false}];
 assert.equal(nextStudy([topic],b).topic.id,'beam');assert.equal(nextStudy([topic],b).active,false);
});

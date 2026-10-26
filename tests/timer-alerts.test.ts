import 'fake-indexeddb/auto';
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {claimTimerAlert,timerHasExpired} from '../src/lib/timer-alerts';
import type {Timer} from '../src/lib/types';

const timer:Timer={id:'alarm-test',mode:'focus',status:'running',topic:'test',duration:60000,accumulated:10000,startedAt:1000,segments:[]};
test('only a running countdown at its deadline triggers a completion alert',()=>{
 assert.equal(timerHasExpired(timer,50999),false);
 assert.equal(timerHasExpired(timer,51000),true);
 assert.equal(timerHasExpired({...timer,mode:'break'},51000),true);
 for(const status of ['paused','finished'] as const)assert.equal(timerHasExpired({...timer,status},100000),false);
 assert.equal(timerHasExpired({...timer,mode:'stopwatch'},100000),false);
 assert.equal(timerHasExpired(null,100000),false);
});
test('concurrent tabs claim one alert, and the claim survives reopening the database',async()=>{
 const results=await Promise.all([claimTimerAlert('shared',1),claimTimerAlert('shared',2),claimTimerAlert('shared',3)]);
 assert.equal(results.filter(Boolean).length,1);
 assert.equal(await claimTimerAlert('shared',4),false);
 assert.equal(await claimTimerAlert('new-session',5),true);
});

import 'fake-indexeddb/auto';
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {localRepository} from '../src/lib/repository';
import {freshNotebook,report} from '../src/lib/study';
test('concurrent tab saves union attempts and count a shared focus segment only once',async()=>{
 const start=Date.parse('2026-10-25T10:00:00+03:00'),base=freshNotebook();base.updatedAt=1;await localRepository.save(base,true);
 const a=freshNotebook(),b=freshNotebook();a.updatedAt=2;b.updatedAt=3;
 a.attempts=[{id:'from-tab-a',at:start,topic:'x',item:'q1',correct:true,assisted:false,kind:'question'}];b.attempts=[{id:'from-tab-b',at:start,topic:'x',item:'q2',correct:false,assisted:false,kind:'question'}];
 const session={id:'shared-session:0',topic:'x',start,end:start+1200000,milliseconds:1200000};a.sessions=[session];b.sessions=[session];
 await Promise.all([localRepository.save(a),localRepository.save(b)]);
 const result=await localRepository.load();assert.equal(result.attempts.length,2);assert.equal(result.sessions.length,1);assert.equal(report(result,start).minutes,20);
 const stale=freshNotebook();stale.updatedAt=0;await localRepository.save(stale);assert.equal((await localRepository.load()).attempts.length,2);
 const clean=freshNotebook();await localRepository.save(clean,true);assert.equal((await localRepository.load()).attempts.length,0);
});

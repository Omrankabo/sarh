import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {verticalStress,saturatedUnitWeight} from '../src/lib/soil';
import {subjects} from '../src/lib/subjects';
const near=(a:number,b:number)=>assert.ok(Math.abs(a-b)<1e-7,`${a} != ${b}`);
test('tutorial Q1 checks all boundary ordinates and independent submerged route',()=>{
 const layers=[{thickness:3,unitWeight:17},{thickness:2,unitWeight:20},{thickness:4,unitWeight:19}];
 for(const [z,total,pore,effective]of [[0,0,0,0],[3,51,0,51],[5,91,19.62,71.38],[9,167,58.86,108.14]]){const r=verticalStress(layers,z,3);near(r.total,total);near(r.pore,pore);near(r.effective,effective);near(r.total,r.pore+r.effective);}
 near(verticalStress(layers,9,3).effective,3*17+2*(20-9.81)+4*(19-9.81));
});
test('lecture lake solution and water blanket invariance use the inspected midpoint',()=>{
 const layers=[{thickness:7.92,unitWeight:19.62},{thickness:3.66,unitWeight:18.36}],a=verticalStress(layers,9.75,0,0,3.05),b=verticalStress(layers,9.75,0,0,5.05);
 near(a.total,218.9097);near(a.pore,125.568);near(a.effective,93.3417);near(a.effective,b.effective);near(b.pore,145.188);
});
test('tutorial Q2 recovers saturated clay and distinguishes moist/saturated sand',()=>{
 const gamma=saturatedUnitWeight(.56,2.75),r=verticalStress([{thickness:2,unitWeight:18.68},{thickness:4,unitWeight:20.31},{thickness:8,unitWeight:gamma}],10,2);
 near(gamma,16.568858267716536);near(r.effective,106.39543307086614);near(r.pore,78.48);near(r.total,184.87543307086615);
});
test('new course assessment and recall cover each taught concept without fake finished courses',()=>{
 const t=JSON.parse(fs.readFileSync('content/published/soil-mechanics-ii/soil-effective-stress/topic.json','utf8'));
 assert.equal(t.steps.length,7);assert.equal(t.questions.length,21);assert.equal(t.cards.length,28);
 for(const c of t.concepts){assert(t.steps.some((s:any)=>s.concepts.includes(c.id)));assert(t.questions.some((q:any)=>q.concept===c.id));assert(t.cards.some((k:any)=>k.concept===c.id));}
 assert.equal(subjects.length,6);assert.equal(subjects.filter(s=>s.publication==='planned').length,0);assert.equal(subjects.filter(s=>s.publication==='building').length,4);assert(subjects.filter(s=>s.publication==='building').every(s=>s.topicIds.length>=2));
});
test('instructional water table response accounts for changing unit weights',()=>{
 const bottom=(water:number)=>verticalStress([{thickness:water,unitWeight:17},{thickness:5-water,unitWeight:20},{thickness:4,unitWeight:19}].filter(l=>l.thickness>0),9,water).effective;
 near(bottom(3),108.14);assert(bottom(1)<bottom(3));assert(bottom(5)>bottom(3));
});
test('all fourteen numerical and mixed answers agree with independent arithmetic',()=>{
 const t=JSON.parse(fs.readFileSync('content/published/soil-mechanics-ii/soil-effective-stress/topic.json','utf8'));
 const expected:Record<string,number>={SN01:180/3,SN02:150-55,SN03:10+2*18+3*20,SN04:(10-2)*9.81,SN05:20-9.81,SN06:60-15,SN07:7.92*(19.62-9.81)+1.83*(18.36-9.81),SM01:180/6,SM02:150-85,SM03:3*18+2*19,SM04:100-4*9.81,SM05:(20-9.81)*5,SM06:25,SM07:(3.05+7.92+3.66/2+2)*9.81};
 const numerical=t.questions.filter((q:any)=>q.expected!==undefined);assert.equal(numerical.length,14);for(const q of numerical)near(q.expected,expected[q.id]);
});

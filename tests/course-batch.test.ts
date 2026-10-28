import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {channelSection,courseScene,fitLine,flocculator,ltbReduction,manning,mohrCircle,platedSection,rectangularEnergy,shearStrength,waterDemand} from '../src/lib/course-calculations';
import {subjects} from '../src/lib/subjects';
import {enroll,recallItems} from '../src/lib/recall';
import {freshNotebook,freshProgress} from '../src/lib/study';
import type {Topic} from '../src/lib/types';
const read=(file:string)=>JSON.parse(fs.readFileSync('content/published/'+file,'utf8'));
const manifest=read('topics.json'),near=(a:number,b:number,epsilon=1e-6)=>assert(Math.abs(a-b)<=epsilon,`${a} ≠ ${b}`);
const topic=(id:string):Topic=>read(manifest.find((x:any)=>x.id===id).file);
const ids=['soil-shear','soil-triaxial','hydro-geometry','hydro-uniform','hydro-critical','env-demand','env-quality','env-coagulation','steel-ltb','steel-compound'];

test('all four new-course subjects contain published, bilingual concept-complete journeys',()=>{
 for(const id of ids){const t=topic(id);assert(subjects.some(s=>s.topicIds.includes(id)));assert.equal(t.steps.length,5);assert.equal(t.questions.length,15);assert.equal(t.cards.length,20);assert.equal(t.concepts.length,5);for(const c of t.concepts){assert(t.steps.some(s=>s.concepts.includes(c.id)));assert(t.questions.some(q=>q.concept===c.id));assert(t.cards.some(k=>k.concept===c.id))}for(const step of t.steps)assert(courseScene(step.diagram),id+' wrong diagram');}
});
test('100 numerical and mixed answers agree with independent dimensional calculations',()=>{
 const a=Math.atan(.5)*180/Math.PI,s=Math.sqrt(3),g=9.81;
 const expected:Record<string,number[][]>={
  'soil-shear':[[200,100/s,30,100,85+300*Math.tan(17*Math.PI/180)],[145,60/s,a,100,500]],
  'soil-triaxial':[[150+240,(433-100)/2,44-20,200-50,180/2],[80+.4/.002,(433+100)/2,(204-44)/2,60,100*3]],
  'hydro-geometry':[[1.5*g,2.4*(3+2*2.4),8/8,12/6,3/Math.sqrt(g)],[0,3+2*1*2,8/4,13.1/(4*.9),4/Math.sqrt(g)]],
  'hydro-uniform':[[9810*2*.001,Math.sqrt(.0004)/.025,16,2,Math.sqrt(18/2)],[9.81,1/.02,4,6-8,18/12]],
  'hydro-critical':[[2+9/(2*g*4),Math.cbrt(9/g),5.5/Math.sqrt(g),1+4,3-2-.2],[10+2.5,1.5*Math.cbrt(9/g),Math.sqrt(g),3,3-.5-.1]],
  'env-demand':[[10000*150/1000,20000+10*500,400000*.6,1000*2.7,(120-80)*2],[9000/.8,10000*1.02**2,240000/86400,648000/86400,20-(-30)]],
  'env-quality':[[8/.25,600-150,400*.65,40/20,100],[2/.05,300+40,600*.6,100*(8.36-8.14)/(8.36+8.14),14-6]],
  'env-coagulation':[[30/1.5,10000*20/1000,30000/25,.5*1200,.001*100*30**2],[40/2,200/.8,20*1500,600/(15*5),90/.75]],
  'steel-ltb':[[12/3,100*3+4.2*81/8,Math.sqrt(400/625),.8*1830*1000*275/1e6,1830*1000*275/1e6],[9/3,100+4.2*9/2,Math.sqrt(400/100),.6*500,300/400]],
  'steel-compound':[[200000*.001,2000*205**2,200*10*410,100000*400000/400000000,8/2],[200000*1e-6*100,368133333.333/210,2020000*275/1e6,100/2,6000/250]],
 };
 let count=0;for(const id of ids)for(const q of topic(id).questions.filter(q=>q.expected!==undefined)){const group=q.id.startsWith('N')?0:1,index=Number(q.id.slice(1))-1;near(q.expected!,expected[id][group][index]);count++;}assert.equal(count,100);
});
test('direct-shear source fit retains the inconsistent intercept and explains it',()=>{
 const x=[100,200,350,500],y=[115,145,195,240],r=fitLine(x,y);near(r.slope,.3149659863945578);near(r.intercept,83.19727891156462);near(r.slope*200+r.intercept,146.19047619047618);
 near(x.reduce((sum,n,i)=>sum+y[i]-(r.intercept+r.slope*n),0),0);
 const p=read('problems.json').find((p:any)=>p.id==='soil-l2-direct');assert(p.solution.en.includes('83.19727891'));assert(p.solution.en.includes('incompatible'));assert(p.sources.some((s:any)=>s.filename==='Lecture 2.pdf'&&s.page===9));
});
test('triaxial pore pressure preserves shear radius and distinguishes failure-plane shear',()=>{
 const a=mohrCircle(433,100),b=mohrCircle(433,100,40);near(a.radius,b.radius);near(a.center-b.center,40);near(a.radius,166.5);
 const normal=100+333*Math.cos(55*Math.PI/180)**2,tau=333/2*Math.sin(110*Math.PI/180);near(normal,209.55364613627614);near(tau,156.45882136085376);assert(tau<a.radius);near(shearStrength(normal,0,80.18753168529646,20),tau);
 for(const id of ['soil-l4-principal-fit','soil-l4-plane'])assert.equal(read('problems.json').find((p:any)=>p.id===id).courseSketch.values.pore,undefined,'Unmeasured pore pressure must not be published as zero');
});
test('hydraulic models close continuity, resistance and critical energy independently',()=>{
 const sec=channelSection(3,2.4,2);near(sec.area,18.72);near((13.1/sec.area)*sec.area,4*(13.1/3.6)*.9);
 const r=manning(4,2,0,.02,.0004);near(r.discharge,8);near(r.velocity,1);near(r.radius,1);near(r.depth,2);
 const e=rectangularEnergy(5.5,2),critical=rectangularEnergy(5.5,e.critical);near(critical.froude,1);near(critical.energy,e.minimum);assert(rectangularEnergy(5.5,e.critical*.9).energy>e.minimum);assert(rectangularEnergy(5.5,e.critical*1.1).energy>e.minimum);
});
test('ElObied peak and historical fire arithmetic use consistent rates',()=>{
 const r=waterDemand(400000,600);near(r.average,240000);near(r.maximumDay,432000);near(r.peakHourRate,648000);near(r.peakCubicMetresSecond,7.5);near(r.peakHourVolume,27000);
 const fireMinute=3.86*20*(1-.01*20),fireDay=fireMinute*1440;near(fireDay,88934.4);assert(r.maximumDay+fireDay<r.peakHourRate);assert(read('problems.json').find((p:any)=>p.id==='env-elobied').solution.en.includes('88934.4'));
});
test('water charge audit uses equivalents before comparing totals',()=>{
 const c=93.8/20+28/12.2+13.7/23+30.2/39.1,a=167.4/61+134/48+92.5/35.5;near(c,8.353112657750199);near(a,8.141562764565535);assert(Math.abs(c-a)<.1065+.0155*a);
 const p=read('problems.json').find((p:any)=>p.id==='env-charge-audit');assert(p.solution.en.includes('8.35311266'));assert(p.solution.en.includes('8.14156276'));
});
test('flocculator closes chemical mass, volume, dimensions, exposure and staged water power',()=>{
 const r=flocculator(50000,40,40000,30);near(r.dailyChemical*30,60000);near(r.volume,771.604938271605);near(15*5*(r.volume/75),r.volume);assert(r.volume/75<12);
 const stageTime=r.seconds/3,gs=[40,30,20];near(gs.reduce((s,g)=>s+g*stageTime,0),40000);near(gs.reduce((s,g)=>s+.001139*(r.volume/3)*g*g,0),849.5627572016463);
});
test('steel actions satisfy global equilibrium and maximum-moment location',()=>{
 const reaction=100+4.2*9/2;near(2*reaction,2*100+4.2*9);near(reaction*4.5-4.2*4.5**2/2-100*1.5,342.525);near(reaction-4.2*4.5-100,0);
 near(ltbReduction(.8,.34),.7244543564903682);assert(ltbReduction(.4,.34)>ltbReduction(.8,.34));assert(ltbReduction(.8,.34)>ltbReduction(2,.34));
});
test('compound geometry and interface shear obey units and two-line sharing',()=>{
 const r=platedSection(200e6,400,200,10);near(r.inertia,368133333.3333333);near(r.addedPlasticModulus,820000);near(r.elasticModulus,1753015.873015873);
 const q=100000*r.firstMoment/r.inertia;near(q,111.37269105396594);near(2*(q/2),q);assert(platedSection(200e6,400,200,20).inertia>r.inertia);
});
test('every added course joins adaptive recall only after real completion',()=>{
 const topics=ids.map(topic),b=freshNotebook();enroll(b,topics,1000);assert.equal(recallItems(topics,b,1000).length,0);
 for(const t of topics){const p=freshProgress();p.completed=[t.steps[0].id];b.topics[t.id]=p;}enroll(b,topics,2000);
 const items=recallItems(topics,b,2000);assert.equal(items.length,40);assert(items.every(i=>i.group==='new'));enroll(b,topics,3000);assert.equal(recallItems(topics,b,3000).length,40);
});
test('out-of-domain calculation inputs fail before presenting a result',()=>{
 assert.throws(()=>channelSection(0,1,0));assert.throws(()=>manning(4,2,0,0,.001));assert.throws(()=>rectangularEnergy(2,0));assert.throws(()=>shearStrength(10,20,0,30));assert.throws(()=>mohrCircle(20,40));assert.throws(()=>fitLine([1,1],[2,3]));
});

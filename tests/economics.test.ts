import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {subjects,subjectForTopic} from '../src/lib/subjects';
import {presentWorth,uniformPresent,capitalRecovery,effectiveRate,continuousPresent,depreciationBook,bracketIrr} from '../src/lib/economics';
const read=(file:string)=>JSON.parse(fs.readFileSync('content/published/'+file,'utf8'));
const manifest=read('topics.json');
const topics=manifest.filter((t:{id:string})=>t.id.startsWith('ee-')).map((m:{file:string})=>read(m.file));
const close=(actual:number,expected:number,label='')=>assert(Math.abs(actual-expected)<=Math.max(1e-7,Math.abs(expected)*1e-10),`${label}: ${actual} ≠ ${expected}`);
const sum=(n:number,fn:(t:number)=>number)=>Array.from({length:n},(_,k)=>fn(k+1)).reduce((a,b)=>a+b,0);

test('all fifteen economics journeys belong to one subject and have teaching/practice/recall coverage',()=>{
 const subject=subjects.find(s=>s.id==='engineering-economics')!;assert(subject);assert.equal(topics.length,15);
 assert.deepEqual(new Set(subject.topicIds),new Set(topics.map((t:{id:string})=>t.id)));
 for(const t of topics){
  assert.equal(subjectForTopic(t.id)?.id,subject.id);assert.equal(t.steps.length,5);assert.equal(t.questions.length,15);assert.equal(t.cards.length,15);
  for(const c of t.concepts){assert(t.steps.some((s:{concepts:string[]})=>s.concepts.includes(c.id)));assert(t.questions.some((q:{concept:string})=>q.concept===c.id));assert(t.cards.some((k:{concept:string})=>k.concept===c.id))}
 }
 assert.equal(read('problems.json').filter((p:{topic:string})=>p.topic.startsWith('ee-')).length,51);
});

test('all 75 numerical practice answers agree with independent direct calculations',()=>{
 const expected:Record<string,number[]>={
  'ee-foundations':[4500,50,12,245,7],
  'ee-markets':[40,.5,8000,276,600],
  'ee-interest-context':[5,15,1,600,70],
  'ee-single-payments':[675,2880,2000*1.06**4,5000/1.08**5,Math.log(1.5)/Math.log(1.05)],
  'ee-uniform-series':[8,200*sum(4,t=>1.05**(4-t)),300*sum(5,t=>1.08**-t),9900,100+100*sum(3,t=>1.1**-t)],
  'ee-gradients':[1400,175,sum(4,t=>1000*1.05**(t-1)/1.1**t),69/3.1,30720],
  'ee-rates':[1.5,(1.025**4-1)*100,10,2000*Math.exp(.24),1000*1.08**2*1.06],
  'ee-continuous-flows':[3600,9000*Math.expm1(.073*9.7)/.073,500*(Math.exp(.2)+Math.exp(.1)+1),1200*(1-1.1**-2)/Math.log(1.1),500*(Math.exp(-.1)-Math.exp(-.3))/.1],
  'ee-equivalence':[1000,11,8,100*sum(4,t=>1.01**(-3*t)),410],
  'ee-depreciation':[7500,7000,10500+34500*2/110,2560,2250-1750/3],
  'ee-worth':[-1000+600/1.1+600/1.1**2,2500*1.08**4,1400,15,700],
  'ee-irr-payback':[200,10,11.2,3,2.6],
  'ee-capitalized-prospective':[100000,2000/.21,10000/1.1**2,80,266.2],
  'ee-fe-pe':[(1.08/1.03-1)*100,1.2,5000,10400,(1.5**.2-1)*100],
  'ee-risk-inventory':[5000,250,1000,300,1000],
 };
 for(const t of topics){const numerical=t.questions.filter((q:{type:string})=>q.type==='numerical');assert.equal(numerical.length,5);numerical.forEach((q:{id:string;expected:number},i:number)=>close(q.expected,expected[t.id][i],q.id))}
});

test('uniform and continuous factors agree with cash-by-cash and numerical integration checks',()=>{
 for(const rate of [0,.01,.08,.2])for(const n of [1,3,10]){
  close(uniformPresent(400,rate,n),sum(n,t=>400/(1+rate)**t));
  close(uniformPresent(capitalRecovery(1000,rate,n),rate,n),1000);
 }
 close(effectiveRate(.12,12,4),1.01**3-1);
 const n=20000,dt=3/n;
 const midpoint=sum(n,t=>1000*Math.exp(-.1*(2+(t-.5)*dt))*dt);
 assert(Math.abs(continuousPresent(1000,.1,2,5)-midpoint)<.000001);
 close(continuousPresent(1200,0,1,3),2400);
});

test('source corrections preserve literal timing, multiple roots and course-specific depreciation conventions',()=>{
 const quarterly=1.05**.25-1;
 const correct=capitalRecovery(1500*1.05**2.75,quarterly,20);
 const source=capitalRecovery(1500*1.05**3,quarterly,20);
 assert(correct<source);close(sum(20,k=>correct/1.05**(3+(k-1)/4)),1500);
 const multiple=[-1000,4700,-7200,3600].map((amount,year)=>({year,amount}));
 for(const rate of [.2,.5,1])close(presentWorth(multiple,rate),0);
 close(depreciationBook(8000,2000,4,2,'syd'),3800);
 close(depreciationBook(5000,1000,5,3,'db',.2),2560);
 const conventional=[{year:0,amount:-55000},...Array.from({length:10},(_,k)=>({year:k+1,amount:10000}))];
 const root=bracketIrr(conventional,.12,.13);assert(root>.12&&root<.13);assert(Math.abs(presentWorth(conventional,root))<1e-6);
});

test('checked source calculation fixtures agree with independently summed cash flows and balances',()=>{
 const fixtures=JSON.parse(fs.readFileSync('tests/fixtures/economics-calculation-checks.json','utf8'));
 for(const c of fixtures){
  const p=c.params as any[];let answer:number|number[];
  const flows=(c.flows||[]).map(([year,amount]:number[])=>({year,amount}));
  switch(c.model){
   case'efficiency':answer=p[2]/(p[0]*p[1]);break;
   case'worker':answer=(p[0]+p[1])/p[2]*p[3]-p[1];break;
   case'elasticity':answer=(p[0]/p[1])/(p[2]/p[3]);break;
   case'crew':answer=p[1].map((hours:number,k:number)=>p[0]*(k+1)*hours);break;
   case'pw':answer=presentWorth(flows,c.rate,!!c.continuous);break;
   case'sinking':answer=p[0]/sum(p[2],k=>(1+p[1])**(p[2]-k));break;
   case'rate':answer=Math.expm1(Math.log(p[1]/p[0])/p[2]);break;
   case'gradient-target':{
    const base=sum(p[3],k=>p[1]*(1+p[2])**(p[3]-k));
    const unit=sum(p[3],k=>(k-1)*(1+p[2])**(p[3]-k));answer=(p[0]-base)/unit;break;
   }
   case'annual':answer=presentWorth(flows,c.rate)/sum(c.life,k=>(1+c.rate)**-k);break;
   case'irr':answer=bracketIrr(flows,0,1);break;
   case'roots':answer=c.rates.map((rate:number)=>presentWorth(flows,rate));break;
   case'switch':{const switchBook=p[0]*(1-p[3])**p[4];answer=switchBook-(p[5]-p[4])*(switchBook-p[1])/(p[2]-p[4]);break;}
   case'break-even':answer=p[0]/(p[1]-p[2]);break;
   case'dam':answer=p[0]/sum(p[1],k=>(1+p[2])**-k)+p[3]*p[4];break;
   case'eoq':answer=Math.sqrt(2*p[0]*p[1]/p[2]);break;
   case'deferred':{const quarterly=Math.expm1(Math.log1p(p[1])/p[3]);answer=p[0]/sum(p[4],k=>(1+p[1])**(-(p[2]+k/p[3])));assert(quarterly>0);break;}
   case'balance':{let balance=p[0];for(let k=0;k<p[3];k++)balance=balance*(1+p[1])-p[2];answer=balance;break;}
   case'capitalized-road':answer=p[0]+p[1]/p[4]+sum(1000,k=>p[2]*(1+p[4])**(-p[3]*k));break;
   default:throw new Error('Unknown fixture model '+c.model);
  }
  if(Array.isArray(answer))answer.forEach((a,k)=>close(a,c.answer[k],c.problem));else close(answer,c.answer,c.problem);
 }
});

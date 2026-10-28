import type {Attempt,FocusSession,Notebook,Progress,Timer} from './types';
import {validRecall} from './recall';
export const uid=()=>globalThis.crypto.randomUUID();
export const freshProgress=():Progress=>({step:0,tab:'start',completed:[],answers:{},cards:{},prereqs:{},predictions:{},errors:[]});
export const freshNotebook=():Notebook=>({version:1,topics:{},attempts:[],sessions:[],timer:null,settings:{language:'ar',focus:25,break:5},imports:[],updatedAt:Date.now()});
const dayFormatter=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Riyadh',year:'numeric',month:'2-digit',day:'2-digit'});
export const day=(at:number)=>dayFormatter.format(at);
export function dates(now:number,count:number,offset=0){const today=new Date(day(now)+'T12:00:00+03:00');return Array.from({length:count},(_,i)=>day(today.getTime()-(count-1-i+offset)*86400000));}
export function splitSession(s:FocusSession){const chunks:Record<string,number>={};let cursor=s.start;const total=Math.max(0,s.end-s.start);if(!total)return chunks;while(cursor<s.end){const d=day(cursor),midnight=Date.parse(d+'T00:00:00+03:00')+86400000,end=Math.min(s.end,midnight);chunks[d]=(chunks[d]||0)+(end-cursor)*s.milliseconds/total;cursor=end;}return chunks;}
export function nonOverlappingFocus(sessions:FocusSession[]):FocusSession[]{
 const events=sessions.filter(s=>s.end>s.start&&s.milliseconds>0).flatMap((s,index)=>[{at:s.start,index,rate:s.milliseconds/(s.end-s.start)},{at:s.end,index,rate:0}]).sort((a,b)=>a.at-b.at);
 const active=new Map<number,number>(),out:FocusSession[]=[];let previous=events[0]?.at??0;
 for(const event of events){if(event.at>previous&&active.size){const rate=Math.max(...active.values());out.push({id:`union:${previous}`,topic:'general',start:previous,end:event.at,milliseconds:(event.at-previous)*rate})}if(event.rate)active.set(event.index,event.rate);else active.delete(event.index);previous=event.at;}
 return out;
}
export function report(book:Notebook,now=Date.now()){
 const ms:Record<string,number>={},attempts:Record<string,Attempt[]>={};for(const s of nonOverlappingFocus(book.sessions))for(const [d,n]of Object.entries(splitSession(s)))ms[d]=(ms[d]||0)+n;
 for(const a of book.attempts)(attempts[day(a.at)]??=[]).push(a);
 const all=[...new Set([...Object.keys(ms),...Object.keys(attempts)])].sort();const qualified=all.filter(d=>(ms[d]||0)>=1200000&&(attempts[d]||[]).some(a=>a.kind==='question'||a.kind==='review'));
 const q=new Set(qualified);let longest=0,run=0,previous='';for(const d of qualified){run=previous&&Date.parse(d)-Date.parse(previous)===86400000?run+1:1;longest=Math.max(longest,run);previous=d;}
 let streak=0,cursor=Date.parse(day(now)+'T12:00:00+03:00');if(!q.has(day(cursor)))cursor-=86400000;while(q.has(day(cursor))){streak++;cursor-=86400000;}
 const week=(offset:number)=>dates(now,7,offset).map(d=>{const eligible=[...first.values()].filter(a=>!a.assisted&&day(a.at)===d);return{date:d,minutes:(ms[d]||0)/60000,attempts:(attempts[d]||[]).filter(a=>a.kind==='question').length,reviews:(attempts[d]||[]).filter(a=>a.kind==='review').length,steps:(attempts[d]||[]).filter(a=>a.kind==='step').length,accuracy:eligible.length?eligible.filter(a=>a.correct).length/eligible.length:null,committed:q.has(d)}});
 const first=new Map<string,Attempt>();for(const a of [...book.attempts].sort((a,b)=>a.at-b.at))if(a.kind==='question'&&!a.selfAssessed&&!first.has(a.topic+':'+a.item))first.set(a.topic+':'+a.item,a);
 const currentDates=new Set(dates(now,7));const independent=[...first.values()].filter(a=>!a.assisted&&currentDates.has(day(a.at)));const accuracy=independent.length?independent.filter(a=>a.correct).length/independent.length:null;
 const current=week(0),previousWeek=week(7);return{streak,longest,qualified,days:current,previous:previousWeek,minutes:current.reduce((s,d)=>s+d.minutes,0),previousMinutes:previousWeek.reduce((s,d)=>s+d.minutes,0),accuracy,independent:independent.length,questions:current.reduce((s,d)=>s+d.attempts,0),reviews:current.reduce((s,d)=>s+d.reviews,0),steps:current.reduce((s,d)=>s+d.steps,0)};
}
export function timerElapsed(t:Timer,now=Date.now()){const n=t.accumulated+(t.status==='running'?Math.max(0,now-t.startedAt):0);return t.mode==='stopwatch'?n:Math.min(t.duration,n);}
export function closeSegment(t:Timer,now=Date.now()):Timer{if(t.status!=='running')return t;const allowance=t.mode==='stopwatch'?Infinity:Math.max(0,t.duration-t.accumulated),end=t.startedAt+Math.min(Math.max(0,now-t.startedAt),allowance);return {...t,accumulated:t.accumulated+end-t.startedAt,startedAt:now,segments:[...t.segments,{start:t.startedAt,end}],status:'paused'};}
export function settleTimer(book:Notebook,now=Date.now()):Notebook{if(!book.timer||book.timer.status==='finished')return book;const t=closeSegment(book.timer,now);if(t.mode!=='break'){const existing=new Set(book.sessions.map(s=>s.id));for(let i=0;i<t.segments.length;i++){const segment=t.segments[i],id=t.id+':'+i;if(!existing.has(id)&&segment.end>segment.start)book.sessions.push({id,topic:t.topic,start:segment.start,end:segment.end,milliseconds:segment.end-segment.start});}}
 return {...book,timer:{...t,status:'finished'}};
}
export function validNotebook(x:unknown):x is Notebook{
 const record=(v:unknown):v is Record<string,any>=>!!v&&typeof v==='object'&&!Array.isArray(v)&&Object.keys(v).every(k=>!['__proto__','constructor','prototype'].includes(k));
 if(!record(x))return false;const b=x as unknown as Notebook;
 if(b.fieldTimes!==undefined&&(!record(b.fieldTimes)||!Object.values(b.fieldTimes).every(v=>Number.isFinite(v)&&v>=0)))return false;
 if(b.recall!==undefined&&!validRecall(b.recall))return false;
 if(b.version!==1||!record(b.topics)||!record(b.settings)||!Array.isArray(b.attempts)||!Array.isArray(b.sessions)||!Array.isArray(b.imports)||!Number.isFinite(b.updatedAt))return false;
 if(!['ar','en'].includes(b.settings.language)||!Number.isFinite(b.settings.focus)||b.settings.focus<1||b.settings.focus>180||!Number.isFinite(b.settings.break)||b.settings.break<1||b.settings.break>60)return false;
 if((b.settings.sound!==undefined&&typeof b.settings.sound!=='boolean')||(b.settings.desktopAlerts!==undefined&&typeof b.settings.desktopAlerts!=='boolean'))return false;
 if(b.attempts.length>100000||b.sessions.length>100000||b.imports.some(k=>typeof k!=='string'))return false;
 if(!b.attempts.every(a=>record(a)&&typeof a.id==='string'&&typeof a.topic==='string'&&typeof a.item==='string'&&Number.isFinite(a.at)&&typeof a.correct==='boolean'&&typeof a.assisted==='boolean'&&['question','review','prediction','readiness','step'].includes(a.kind)))return false;
 if(!b.sessions.every(s=>record(s)&&typeof s.id==='string'&&typeof s.topic==='string'&&Number.isFinite(s.start)&&Number.isFinite(s.end)&&s.end>=s.start&&Number.isFinite(s.milliseconds)&&s.milliseconds>=0&&s.milliseconds<=s.end-s.start))return false;
 for(const p of Object.values(b.topics)){if(p?.introBlock!==undefined&&!['scene','idea','first-step','ready'].includes(p.introBlock))return false;if(!record(p)||!Number.isInteger(p.step)||p.step<0||!['start','prerequisites','story','practice','flashcards'].includes(p.tab)||!Array.isArray(p.completed)||!p.completed.every(k=>typeof k==='string')||!record(p.answers)||!record(p.cards)||!record(p.prereqs)||!record(p.predictions)||!Array.isArray(p.errors))return false;
  if(!Object.values(p.cards).every(c=>record(c)&&Number.isFinite(c.due)&&Number.isFinite(c.interval)&&c.interval>=0))return false;
  if(!Object.values(p.answers).every(r=>record(r)&&typeof r.draft==='string'&&r.draft.length<=10000&&(r.choice===null||Number.isInteger(r.choice))&&Number.isInteger(r.hints)&&r.hints>=0&&typeof r.revealed==='boolean'))return false;
  if(!Object.values(p.prereqs).every(v=>typeof v==='boolean')||!Object.values(p.predictions).every(Number.isInteger)||!p.errors.every(e=>record(e)&&(['id','problem','wrong','rule','retest'] as const).every(k=>typeof e[k]==='string')&&Number.isFinite(e.at)))return false;
 }
 const t=b.timer;if(t!==null&&(!record(t)||typeof t.id!=='string'||typeof t.topic!=='string'||!['focus','stopwatch','break'].includes(t.mode)||!['running','paused','finished'].includes(t.status)||!Number.isFinite(t.duration)||t.duration<0||!Number.isFinite(t.accumulated)||t.accumulated<0||!Number.isFinite(t.startedAt)||!Array.isArray(t.segments)||!t.segments.every(s=>record(s)&&Number.isFinite(s.start)&&Number.isFinite(s.end)&&s.end>=s.start)))return false;
 return true;
}
export function importPilot(book:Notebook,p:any):Notebook{
 if(p?.version!==2||p.topic!=='slope-deflection-beams'||!Array.isArray(p.attempts)||!p.ui||!p.practice||!p.cards)throw Error('Invalid pilot notebook');
 const id='slope-beams',key='pilot:'+JSON.stringify(p.attempts)+JSON.stringify(p.cards);if(book.imports.includes(key))return book;
 const ids=['another-support','supports-continuity','rotation-stiffness','load-effects','join-spans','read-results','moving-supports','independent-mission'];
 const progress=book.topics[id]??freshProgress();progress.step=Math.min(7,Math.max(0,p.ui.step||0));progress.tab=p.ui.tab||'start';
 for(const [k,c]of Object.entries(p.cards)as [string,any][]){if(!c||!Number.isFinite(c.due)||!Number.isFinite(c.interval))throw Error('Invalid card schedule');progress.cards[k]={due:c.due,interval:c.interval};}
 for(const [k,r]of Object.entries(p.prereqs||{})as [string,any][])progress.prereqs[k]=typeof r==='boolean'?r:!!r?.correct;
 for(const [k,r]of Object.entries(p.practice)as [string,any][])progress.answers[k]={draft:String(r.draft||''),choice:r.choice??null,hints:r.hints||0,revealed:!!r.revealed};
 progress.completed=[...new Set([...progress.completed,...Object.keys(p.complete||{}).filter(k=>p.complete[k]).map(k=>ids[+k]||k)])];
 for(const [k,r]of Object.entries(p.responses||{})as [string,any][])if(typeof r?.prediction?.choice==='number')progress.predictions[ids[+k]||k]=r.prediction.choice;
 for(const [i,a]of p.attempts.entries()){if(!Number.isFinite(a.at)||typeof a.result!=='boolean')throw Error('Invalid attempt');const aid=`pilot:${a.item}:${a.at}:${i}`;if(!book.attempts.some(x=>x.id===aid))book.attempts.push({id:aid,topic:id,item:String(a.item).replace(/^challenge:/,''),at:a.at,correct:a.result,assisted:!!a.assisted,kind:String(a.item).startsWith('challenge:')?'question':String(a.item).startsWith('prereq:')?'readiness':'prediction'});}
 for(const [i,e]of(p.errors||[]).entries())if(!progress.errors.some(x=>x.id==='pilot:'+i))progress.errors.push({id:'pilot:'+i,problem:e.problem||'',wrong:e.wrong||'',rule:e.rule||'',retest:e.retest||'',at:0});
 book.topics[id]=progress;book.imports.push(key);return book;
}

import {createEmptyCard,fsrs,type Card as MemoryCard,type Grade} from 'ts-fsrs';
import type {Notebook,Topic,Card} from './types';
import {day,freshProgress} from './study';

export type Rating=1|2|3|4;
export type StoredMemory=Omit<MemoryCard,'due'|'last_review'>&{due:number;last_review?:number};
export type RecallCard={topic:string;card:string;enrolledAt:number;revision:number;memory?:StoredMemory;rating?:Rating};
export type ReviewEvent={id:string;key:string;at:number;rating:Rating;revision:number;due:number;session?:string};
export type RecallSession={id:string;keys:string[];revealed:string|null;updatedAt:number;startedAt:number};
export type RecallState={version:1;cards:Record<string,RecallCard>;events:ReviewEvent[];priorities:Record<string,{value:1|2|3;at:number}>;dismissed:string[];session:RecallSession|null;sessionUpdatedAt:number};
export type RateCommand={id:string;topic:string;card:string;at:number;rating:Rating;revision:number;session?:string};
export const recallKey=(topic:string,card:string)=>topic+'::'+card;
export const emptyRecall=():RecallState=>({version:1,cards:{},events:[],priorities:{},dismissed:[],session:null,sessionUpdatedAt:0});
const scheduler=fsrs({request_retention:.9,maximum_interval:365,enable_fuzz:false});
const memory=(stored?:StoredMemory,at=Date.now()):MemoryCard=>stored?{...stored,due:new Date(stored.due),last_review:stored.last_review===undefined?undefined:new Date(stored.last_review)}:createEmptyCard(new Date(at));
const serialize=(c:MemoryCard):StoredMemory=>({...c,due:c.due.getTime(),last_review:c.last_review?.getTime()});
export function previews(card:RecallCard|undefined,at:number){const result=scheduler.repeat(memory(card?.memory,at),new Date(at));return ([1,2,3,4] as Rating[]).map(rating=>({rating,memory:serialize(result[rating as Grade].card)}));}

/** Enrollment is separate from a rated review: no invented success or overdue history. */
export function enroll(book:Notebook,topics:Topic[],at=Date.now()){
 const r=book.recall??=emptyRecall();
 for(const t of topics){const p=book.topics[t.id];if(!p)continue;const concepts=new Set(t.steps.filter(s=>p.completed.includes(s.id)).flatMap(s=>s.concepts));
  for(const c of t.cards)if(concepts.has(c.concept)||p.cards[c.id]){const key=recallKey(t.id,c.id);r.cards[key]??={topic:t.id,card:c.id,enrolledAt:at,revision:0};}
 }
 return book;
}
export function applyRating(book:Notebook,command:RateCommand){
 const r=book.recall??=emptyRecall(),key=recallKey(command.topic,command.card);
 if(r.events.some(e=>e.id===command.id))return false;
 const previous=r.cards[key];if((previous?.revision||0)!==command.revision)return false;
 if(previous?.memory?.last_review!==undefined&&command.at<previous.memory.last_review)return false;
 const outcome=previews(previous,command.at).find(p=>p.rating===command.rating)!;
 const next:RecallCard={topic:command.topic,card:command.card,enrolledAt:previous?.enrolledAt??command.at,revision:command.revision+1,memory:outcome.memory,rating:command.rating};
 r.cards[key]=next;r.events.push({id:command.id,key,at:command.at,rating:command.rating,revision:next.revision,due:outcome.memory.due,session:command.session});
 const p=book.topics[command.topic]??=freshProgress();p.cards[command.card]={due:outcome.memory.due,interval:outcome.memory.scheduled_days};
 book.attempts.push({id:command.id,at:command.at,topic:command.topic,item:command.card,kind:'review',correct:command.rating!==1,assisted:false,selfAssessed:true});
 if(command.session&&r.session?.id===command.session){const at=Math.max(command.at,r.sessionUpdatedAt+1);r.session.revealed=null;r.session.updatedAt=at;r.sessionUpdatedAt=at;}
 return true;
}
export function mergeRecall(a:RecallState|undefined,b:RecallState|undefined):RecallState|undefined{
 if(!a)return b;if(!b)return a;
 const cards={...a.cards};for(const [k,v]of Object.entries(b.cards)){const old=cards[k];if(!old||v.revision>old.revision)cards[k]=v;}
 const priorities={...a.priorities};for(const [k,v]of Object.entries(b.priorities))if(!priorities[k]||v.at>=priorities[k].at)priorities[k]=v;
 const session=b.sessionUpdatedAt>=a.sessionUpdatedAt?b:a;
 const events=[...new Map([...a.events,...b.events].map(e=>[e.id,e])).values()].sort((x,y)=>x.at-y.at||x.id.localeCompare(y.id));
 // Replay complete event histories, including concurrent offline reviews of the same revision.
 // Legacy schedules without a first review retain their imported memory state.
 for(const [key,card]of Object.entries(cards)){
  const history=events.filter(e=>e.key===key);if(!history.some(e=>e.revision===1))continue;
  let next:RecallCard={topic:card.topic,card:card.card,enrolledAt:Math.min(card.enrolledAt,a.cards[key]?.enrolledAt??Infinity,b.cards[key]?.enrolledAt??Infinity),revision:0};
  for(const e of history){const outcome=previews(next,e.at).find(p=>p.rating===e.rating)!;next={...next,revision:next.revision+1,memory:outcome.memory,rating:e.rating};}
  cards[key]=next;
 }
 return {version:1,cards,priorities,events,dismissed:[...new Set([...a.dismissed,...b.dismissed])],session:session.session,sessionUpdatedAt:session.sessionUpdatedAt};
}
export function projectRecall(book:Notebook){for(const c of Object.values(book.recall?.cards||{}))if(c.memory){const p=book.topics[c.topic]??=freshProgress();p.cards[c.card]={due:c.memory.due,interval:c.memory.scheduled_days};}return book;}
export type RecallItem={key:string;topic:Topic;card:Card;record?:RecallCard;due:number|null;group:'overdue'|'today'|'new'|'upcoming';priority:number;weakness:number};
export function recallItems(topics:Topic[],book:Notebook,now:number):RecallItem[]{
 const items:RecallItem[]=[];for(const t of topics){const p=book.topics[t.id],concepts=new Set(t.steps.filter(s=>p?.completed.includes(s.id)).flatMap(s=>s.concepts));for(const card of t.cards){const key=recallKey(t.id,card.id),record=book.recall?.cards[key],legacy=p?.cards[card.id];if(!record&&!legacy&&!concepts.has(card.concept))continue;const due=record?.memory?.due??legacy?.due??null;
  items.push({key,topic:t,card,record,due,group:due===null?'new':due<=now?(day(due)<day(now)?'overdue':'today'):'upcoming',priority:book.recall?.priorities[t.id]?.value??2,weakness:record?.rating===1?3:record?.rating===2?2:record?.memory?.lapses?1:0});
 }}
 const order={overdue:0,today:1,new:2,upcoming:3};return items.sort((a,b)=>order[a.group]-order[b.group]||(a.group==='upcoming'?(a.due||0)-(b.due||0):0)||b.priority-a.priority||b.weakness-a.weakness||(a.due??0)-(b.due??0)||a.key.localeCompare(b.key));
}
export function quickQueue(items:RecallItem[],limit=10){const result:RecallItem[]=[];for(const group of ['overdue','today','new']){const chosen:RecallItem[]=[],deferred:RecallItem[]=[],seen=new Set<string>();for(const i of items.filter(i=>i.group===group)){const concept=i.topic.id+'::'+i.card.concept;if(seen.has(concept))deferred.push(i);else{chosen.push(i);seen.add(concept)}}result.push(...chosen,...deferred);}return result.slice(0,limit).map(i=>i.key);}
export function sessionRemaining(r:RecallState){if(!r.session)return [];const done=new Set(r.events.filter(e=>e.session===r.session!.id).map(e=>e.key));return r.session.keys.filter(k=>!done.has(k));}
export function validRecall(x:unknown):x is RecallState{
 if(!x||typeof x!=='object')return false;const r=x as RecallState;
 if(r.version!==1||!r.cards||!r.priorities||!Array.isArray(r.events)||!Array.isArray(r.dismissed)||!r.dismissed.every(d=>typeof d==='string')||!Number.isFinite(r.sessionUpdatedAt))return false;
 if(!Object.values(r.cards).every(c=>c&&typeof c.topic==='string'&&typeof c.card==='string'&&Number.isFinite(c.enrolledAt)&&Number.isInteger(c.revision)&&c.revision>=0&&(!c.memory||(['due','stability','difficulty','elapsed_days','scheduled_days','learning_steps','reps','lapses','state'] as const).every(k=>Number.isFinite(c.memory![k])))))return false;
 if(!r.events.every(e=>e&&typeof e.id==='string'&&typeof e.key==='string'&&Number.isFinite(e.at)&&Number.isFinite(e.due)&&Number.isInteger(e.revision)&&[1,2,3,4].includes(e.rating)))return false;
 if(!Object.values(r.priorities).every(p=>p&&[1,2,3].includes(p.value)&&Number.isFinite(p.at)))return false;
 return r.session===null||!!r.session&&typeof r.session.id==='string'&&Array.isArray(r.session.keys)&&r.session.keys.every(k=>typeof k==='string')&&(r.session.revealed===null||typeof r.session.revealed==='string')&&Number.isFinite(r.session.updatedAt)&&Number.isFinite(r.session.startedAt);
}

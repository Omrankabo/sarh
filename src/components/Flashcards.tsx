'use client';
import {useState} from 'react';
import {useSearchParams,useRouter} from 'next/navigation';
import {Check} from 'lucide-react';
import {text} from '@/lib/types';
import type {Lang,Notebook,Progress,Topic} from '@/lib/types';
import {cardQueues} from '@/lib/study-views';
import RecallCard,{reviewDate,type RateCard} from './RecallCard';
import {RecallStatus} from './ReviewCenter';
type Updater=(fn:(p:Progress,b:Notebook)=>void)=>void;
export default function Flashcards({topic,lang,progress,now,ready,update,book,onRate}:{topic:Topic;lang:Lang;progress:Progress;now:number;ready:boolean;update:Updater;book:Notebook;onRate:RateCard}){
 const ar=lang==='ar',say=(en:string,arabic:string)=>ar?arabic:en,params=useSearchParams(),router=useRouter();
 const queues=cardQueues(topic.cards,progress,now),[last,setLast]=useState<string|null>(null);
 const mode=params.get('cards')|| (queues.due.length?'due':'new'),cards=mode==='all'?topic.cards:mode==='new'?queues.unseen:queues.due;
 const card=cards.find(c=>c.id===params.get('card'))||cards[0];
 function choose(id:string,collection=mode){const url=new URL(location.href);url.searchParams.set('cards',collection);if(id)url.searchParams.set('card',id);else url.searchParams.delete('card');router.replace(url.pathname+url.search,{scroll:false});}
 return <><div className="section-heading"><div><p className="eyebrow">{say('MAKE IT STICK','الفهم الذي يبقى')}</p><h2>{say('Recall the idea, not the sentence.','استرجع الفكرة، لا شكل الجملة.')}</h2><RecallStatus topics={[topic]} book={book} now={now} lang={lang}/></div></div>
 <div className="filter-pills card-filters">{[['due',say('Due now','المستحقة'),queues.due.length],['new',say('New cards','بطاقات جديدة'),queues.unseen.length],['all',say('All cards','جميع البطاقات'),topic.cards.length]].map(([id,label,count])=><button key={id} aria-pressed={mode===id} className={mode===id?'selected':''} onClick={()=>choose('',String(id))}>{label}<span className="filter-count">{count}</span></button>)}</div>
 {last&&progress.cards[last]&&<p className="recall-saved" role="status">{say('Saved. Next review: ','حُفظت. المراجعة التالية: ')}{reviewDate(progress.cards[last].due,lang)}</p>}
 {ready&&card?<><label className="recall-card-picker">{say('Card','البطاقة')}<select value={card.id} onChange={e=>choose(e.target.value)}>{cards.map((c,i)=><option key={c.id} value={c.id}>{i+1}. {text(c.q,lang).slice(0,85)}</option>)}</select></label><RecallCard key={card.id} topic={topic} card={card} lang={lang} book={book} now={now} revealed={!!progress.answers['recall:'+card.id]?.revealed} onReveal={()=>update(p=>{p.answers['recall:'+card.id]={draft:'',choice:null,hints:0,revealed:true}})} onRate={onRate} onDone={()=>{setLast(card.id);update(p=>{p.answers['recall:'+card.id]={draft:'',choice:null,hints:0,revealed:false}});const next=cards[(cards.indexOf(card)+1)%cards.length];choose(next?.id||'',mode);}}/></>:<div className="empty-state"><Check size={36}/><h3>{say('No cards in this collection right now.','لا توجد بطاقات في هذه المجموعة الآن.')}</h3><p>{say('Your scheduled reviews will return when they are due. You can explore new cards at any time.','ستعود مراجعاتك في موعدها. ويمكنك استكشاف بطاقات جديدة متى أردت.')}</p></div>}
 <details className="surface utility"><summary>{say('Essential-concept coverage map','خريطة تغطية الأفكار الأساسية')}</summary><table><thead><tr>{(ar?['الفكرة','القصة','أسئلة','بطاقات']:['Concept','Story','Questions','Cards']).map(t=><th key={t}>{t}</th>)}</tr></thead><tbody>{topic.concepts.map(c=><tr key={c.id}><td>{text(c.title,lang)}</td><td>{topic.steps.filter(s=>s.concepts.includes(c.id)).map(s=>topic.steps.indexOf(s)+1).join(', ')}</td><td>{topic.questions.filter(q=>q.concept===c.id).length}</td><td>{topic.cards.filter(k=>k.concept===c.id).length}</td></tr>)}</tbody></table></details></>;
}

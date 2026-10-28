'use client';
import {useEffect,useRef,useState} from 'react';
import Link from 'next/link';
import type {Lang,Notebook,Topic,Card} from '@/lib/types';
import {text} from '@/lib/types';
import {previews,recallKey,type Rating,type RateCommand} from '@/lib/recall';
import {uid} from '@/lib/study';
import StudyMarkdown from './StudyMarkdown';

export type RateCard=(command:RateCommand)=>Promise<boolean>;
export function nextInterval(due:number,now:number,lang:Lang){const minutes=Math.max(1,Math.round((due-now)/60000));return new Intl.NumberFormat(lang).format(minutes<60?minutes:minutes<1440?Math.round(minutes/60):Math.round(minutes/1440))+' '+(minutes<60?(lang==='ar'?'دقيقة':'min'):minutes<1440?(lang==='ar'?'ساعة':'h'):(lang==='ar'?'يوم':'days'));}
export function reviewDate(at:number,lang:Lang){return new Intl.DateTimeFormat(lang==='ar'?'ar-SA':'en-GB',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit',timeZone:'Asia/Riyadh',calendar:'gregory'}).format(at);}
export default function RecallCard({topic,card,lang,book,now,revealed,onReveal,onRate,session,onDone}:{topic:Topic;card:Card;lang:Lang;book:Notebook;now:number;revealed:boolean;onReveal:()=>void;onRate:RateCard;session?:string;onDone?:()=>void}){
 const ar=lang==='ar',say=(en:string,arabic:string)=>ar?arabic:en;
 const [busy,setBusy]=useState(false),[error,setError]=useState(''),[stale,setStale]=useState(false);const question=useRef<HTMLDivElement>(null);
 useEffect(()=>{question.current?.focus({preventScroll:true})},[card.id]);
 const record=book.recall?.cards[recallKey(topic.id,card.id)],outcomes=previews(record,now),step=topic.steps.findIndex(s=>s.concepts.includes(card.concept));
 async function rate(rating:Rating){if(busy||!revealed)return;setBusy(true);setError('');try{const accepted=await onRate({id:uid(),topic:topic.id,card:card.id,at:Date.now(),rating,revision:record?.revision||0,session});if(accepted)onDone?.();else {setStale(true);setError(say('This card changed in another tab. Its latest schedule is loaded; reveal it again before reviewing.','تغيّرت البطاقة في تبويب آخر. حُمّل جدولها الجديد؛ اكشفها مجددًا قبل المراجعة.'));}}catch{setError(say('Your rating could not be saved. Please try again.','تعذّر حفظ التقييم. حاول مجددًا.'));}finally{setBusy(false)}}
 return <article className="recall-card surface"><div className="recall-card-label"><span className="pill neutral">{text(topic.concepts.find(c=>c.id===card.concept)?.title,lang)}</span><span>{say('Recall → compare → rate','استرجع ← قارن ← قيّم')}</span></div>
  <div className="recall-question" role="heading" aria-level={2} tabIndex={-1} ref={question}><StudyMarkdown>{text(card.q,lang)}</StudyMarkdown></div>
  <div className="recall-answer">{revealed&&!stale?<StudyMarkdown>{text(card.a,lang)}</StudyMarkdown>:<p>{say('Explain aloud, sketch the behaviour or calculate on paper. Then compare your answer.','اشرح بصوتك، أو ارسم الاستجابة، أو احسب على الورق. ثم قارن إجابتك.')}</p>}</div>
  {(!revealed||stale)&&<button className="primary" onClick={()=>{setStale(false);onReveal()}}>{say('Reveal answer','اكشف الإجابة')}</button>}
  <div className="recall-ratings" aria-label={say('Rate your recall','قيّم استرجاعك')}>{outcomes.map((o,i)=><button key={o.rating} disabled={!revealed||stale||busy} onClick={()=>rate(o.rating)} className={'recall-rating rating-'+o.rating}><strong>{(ar?['مجددًا','بصعوبة','جيد','سهل']:['Again','Hard','Good','Easy'])[i]}</strong><span>{nextInterval(o.memory.due,now,lang)}</span></button>)}</div>
  <p className="small muted">{say('Again = incorrect or forgotten. Hard = correct with effort. These ratings are self-assessed.','مجددًا = إجابة خاطئة أو منسية. بصعوبة = إجابة صحيحة بجهد. هذه تقييمات ذاتية.')}</p>
  {error&&<p role="alert" className="feedback error">{error}</p>}
  {step>=0&&<Link className="text-link" href={`/${lang}/topics/${topic.id}?tab=story&step=${step}`}>{say('Revisit this idea in the story','ارجع إلى شرح هذه الفكرة')}</Link>}
 </article>;
}

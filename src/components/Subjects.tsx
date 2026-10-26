import Link from 'next/link';
import {ArrowUpRight,BookOpen} from 'lucide-react';
import {subjects} from '@/lib/subjects';
import {text} from '@/lib/types';
import type {Lang,Notebook,Topic} from '@/lib/types';

export default function Subjects({lang,topics,book,destination='subjects'}:{lang:Lang;topics:Topic[];book:Notebook;destination?:'subjects'|'materials'}){
 const ar=lang==='ar';
 return <>
  <div className="page-heading"><div><p className="eyebrow">{ar?'مساحتك الدراسية':'YOUR STUDY SPACE'}</p><h1>{destination==='materials'?(ar?'مكتبة الدراسة':'Study library'):(ar?'المواد الدراسية':'Subjects')}</h1><p className="muted">{destination==='materials'?(ar?'اختر المادة للوصول إلى شروحها ومعادلاتها ومسائلها.':'Choose a subject to find its explanations, formulas and worked problems.'):(ar?'اختر المادة، ثم انطلق في موضوع واحد كل مرة.':'Choose a subject, then explore one topic at a time.')}</p></div></div>
  <div className="subject-grid">{subjects.map(subject=>{
   const journeys=topics.filter(t=>subject.topicIds.includes(t.id));
   const steps=journeys.reduce((n,t)=>n+t.steps.length,0);
   const completed=journeys.reduce((n,t)=>n+t.steps.filter(s=>book.topics[t.id]?.completed.includes(s.id)).length,0);
   const percent=steps?Math.round(completed/steps*100):0;
   return <article className="subject-card dashboard-panel" key={subject.id}>
    <div className="subject-art" aria-hidden="true">{subject.id==='engineering-economics'?<svg viewBox="0 0 480 160" fill="none"><path d="M45 85H435M65 85V135M150 85V55M235 85V40M320 85V25M405 85V12" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/><path d="M56 124l9 12 9-12M141 66l9-12 9 12M226 51l9-12 9 12M311 36l9-12 9 12M396 23l9-12 9 12" stroke="#a25e33" strokeWidth="3"/><path d="M140 135Q260 135 410 105" stroke="#587b5a" strokeWidth="2" strokeDasharray="5 6"/></svg>:<svg viewBox="0 0 480 160" fill="none"><path d="M40 82H440M40 86H440" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/><path d="M55 86L41 110H69L55 86ZM240 86L226 110H254L240 86ZM425 86L411 110H439L425 86Z" stroke="currentColor" strokeWidth="2"/><path d="M82 54V76M152 54V76M222 54V76M292 54V76M362 54V76M410 54V76M78 70L82 77L86 70M148 70L152 77L156 70M218 70L222 77L226 70M288 70L292 77L296 70M358 70L362 77L366 70M406 70L410 77L414 70" stroke="#a25e33" strokeWidth="2" strokeLinecap="round"/><path d="M55 122Q140 152 240 122Q335 148 425 122" stroke="#587b5a" strokeWidth="2" strokeDasharray="5 6"/></svg>}</div>
    <div className="row between"><span className="pill neutral">{ar?'الفصل الدراسي':'SEMESTER'} {subject.semester}</span><BookOpen size={20}/></div>
    <h2><Link href={`/${lang}/${destination}/${subject.id}`}>{text(subject.title,lang)}</Link></h2><p className="muted">{text(subject.description,lang)}</p>
    <div className="subject-meta"><span>{journeys.length} {ar?'موضوعًا':'topics'}</span><span>{completed} / {steps} {ar?'خطوة مكتملة':'steps complete'}</span></div>
    <div className="progress-track" role="progressbar" aria-label={ar?'تقدّم المادة':'Subject progress'} aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent}><span style={{width:`${percent}%`}}/></div>
    <Link className="button primary" href={`/${lang}/${destination}/${subject.id}`}>{destination==='materials'?(ar?'افتح مكتبة المادة':'Open subject library'):(ar?'افتح المادة':'Explore subject')}<ArrowUpRight size={17}/></Link>
   </article>;
  })}</div>
 </>;
}

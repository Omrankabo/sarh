import Link from 'next/link';
import StudyArtwork from './StudyArtwork';
import {RecallStatus} from './ReviewCenter';
import {ArrowUpRight,BookOpen} from 'lucide-react';
import {subjects} from '@/lib/subjects';
import {text} from '@/lib/types';
import type {Lang,Notebook,TopicIndex} from '@/lib/types';

export default function Subjects({lang,topics,book,destination='subjects'}:{lang:Lang;topics:TopicIndex[];book:Notebook;destination?:'subjects'|'materials'}){
 const ar=lang==='ar';
 return <>
  <div className="page-heading"><div><p className="eyebrow">{ar?'مساحتك الدراسية':'YOUR STUDY SPACE'}</p><h1>{destination==='materials'?(ar?'مكتبة الدراسة':'Study library'):(ar?'المقررات':'Courses')}</h1><p className="muted">{destination==='materials'?(ar?'اختر المادة للوصول إلى شروحها ومعادلاتها ومسائلها.':'Choose a course to find its explanations, formulas and worked problems.'):(ar?'اختر المادة، ثم انطلق في موضوع واحد كل مرة.':'Choose a course, then explore one topic at a time.')}</p></div></div>
  {[...new Set(subjects.map(s=>s.semester))].sort((a,b)=>a-b).map(semester=><section className="semester-group" id={`semester-${semester}`} key={semester} aria-labelledby={`semester-title-${semester}`}>
  <div className="semester-heading"><h2 id={`semester-title-${semester}`}>{ar?'الفصل الدراسي':'Semester'} {semester.toLocaleString(ar?'ar':'en')}</h2><span className="muted">{subjects.filter(s=>s.semester===semester).length} {ar?'مقررات':'courses'}</span></div>
  <div className="subject-grid">{subjects.filter(s=>s.semester===semester).map(subject=>{
   const journeys=topics.filter(t=>subject.topicIds.includes(t.id));
   const steps=journeys.reduce((n,t)=>n+t.steps.length,0);
   const completed=journeys.reduce((n,t)=>n+t.steps.filter(s=>book.topics[t.id]?.completed.includes(s.id)).length,0);
   const percent=steps?Math.round(completed/steps*100):0;
   const begun=journeys.some(t=>{const p=book.topics[t.id];return p&&(p.step>0||p.completed.length>0||Object.keys(p.answers).length>0||Object.keys(p.cards).length>0)});
   const state=!steps?'planned':completed===steps?'complete':begun?'active':'new';
   return <article className="subject-card dashboard-panel" data-subject={subject.id} key={subject.id}>
    <div className="subject-art"><StudyArtwork id={subject.id} kind="course" lang={lang} variant="card"/></div>
    <div className="row between"><span className="pill neutral">{ar?'الفصل الدراسي':'SEMESTER'} {subject.semester}</span><span className={'study-status '+state}>{state==='planned'?(ar?'خطة الإعداد':'Build planned'):state==='complete'?(ar?'مكتمل':'Complete'):state==='active'?(ar?'قيد التعلّم':'In progress'):(ar?'بداية جديدة':'New journey')}</span></div>
    <h2><Link href={`/${lang}/${destination}/${subject.id}`}>{text(subject.title,lang)}</Link></h2><p className="muted">{text(subject.description,lang)}</p>
    {!!journeys.length&&<RecallStatus topics={journeys} book={book} now={Date.now()} lang={lang}/>}
    <div className="subject-meta"><span>{journeys.length} {ar?'موضوع منشور':'published topics'}</span><span>{steps?`${completed} / ${steps} ${ar?'خطوة مكتملة':'steps complete'}`:(ar?'خريطة المقرر جاهزة':'Course map ready')}</span></div>
    <div className="progress-track" role="progressbar" aria-label={ar?'تقدّم المادة':'Course progress'} aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent}><span style={{width:`${percent}%`}}/></div>
    <Link className="button primary" href={`/${lang}/${destination}/${subject.id}`}>{!journeys.length?(ar?'اطّلع على خطة المادة':'View course plan'):destination==='materials'?(ar?'افتح مكتبة المادة':'Open course library'):(ar?'افتح المادة':'Explore course')}<ArrowUpRight size={17}/></Link>
   </article>;
  })}</div></section>)}
 </>;
}

'use client';
import {useState} from 'react';
import Link from 'next/link';
import {useSearchParams} from 'next/navigation';
import type {Subject} from '@/lib/subjects';
import type {Lang,Topic,Video,WorkedProblem} from '@/lib/types';
import {text} from '@/lib/types';
import WorkedSolutions from './WorkedSolutions';
import StudyMarkdown from './StudyMarkdown';
import VideoHelp from './VideoHelp';
import {topicFamilies} from '@/lib/subjects';
import CourseRoadmap from './CourseRoadmap';
import StudyArtwork from './StudyArtwork';

export default function StudyLibrary({subject,topics,problems,videos,lang}:{subject:Subject;topics:Topic[];problems:WorkedProblem[];videos:Video[];lang:Lang}){
 const ar=lang==='ar',params=useSearchParams(),[search,setSearch]=useState('');
 const topic=topics.find(t=>t.id===params.get('topic')),family=params.get('family'),view=params.get('view')||'summary';
 const families=topicFamilies.filter(f=>topics.some(t=>t.family===f.id));
 const base=`/${lang}/materials/${subject.id}`,needle=search.trim().toLocaleLowerCase();
 const matches=(value:string)=>!needle||value.toLocaleLowerCase().includes(needle);
 const selectedProblems=problems.filter(p=>(!topic||p.topic===topic.id)&&matches(text(p.title,lang)+' '+text(p.givens,lang)));
 if(!topics.length)return <><div className="page-heading"><div><p className="eyebrow">{ar?'خطة مكتبة المادة':'SUBJECT LIBRARY PLAN'}</p><h1>{text(subject.title,lang)}</h1></div></div><CourseRoadmap subject={subject} lang={lang}/></>;
 return <><nav className="subject-breadcrumb" aria-label={ar?'مسار المكتبة':'Library breadcrumb'}><Link href={`/${lang}/materials`}>{ar?'مكتبة الدراسة':'Study library'}</Link><span>/</span><Link href={base}>{text(subject.title,lang)}</Link>{topic&&<><span>/</span><span aria-current="page">{text(topic.title,lang)}</span></>}</nav>
  <div className="page-heading"><div><p className="eyebrow">{ar?'مكتبة المادة':'SUBJECT LIBRARY'}</p><h1>{topic?text(topic.title,lang):text(subject.title,lang)}</h1><p className="muted">{ar?'الفكرة والمعادلة والمسألة في مكانها الصحيح.':'The explanation, equation and problem in the right place.'}</p></div></div>
  {!topic&&<><StudyArtwork id={subject.id} kind="course" lang={lang} variant="banner"/><div className="filter-toolbar"><input value={search} onChange={e=>setSearch(e.target.value)} placeholder={ar?'ابحث في موضوعات ومسائل المادة…':'Search this subject’s topics and problems…'} aria-label={ar?'ابحث في مكتبة المادة':'Search subject library'}/></div>
   {!needle&&!family?<div className="library-families">{families.map(f=><Link className="dashboard-panel" key={f.id} href={`${base}?family=${f.id}`}><StudyArtwork id={topics.find(t=>t.family===f.id)!.id} lang={lang} variant="card"/><h2>{ar?f.ar:f.en}</h2><p>{topics.filter(t=>t.family===f.id).length} {ar?'موضوعًا':'topics'}</p><span className="text-link">{ar?'افتح المجموعة':'Explore this group'} →</span></Link>)}</div>:<><Link className="text-link" href={base}>{ar?'كل المجموعات':'All groups'}</Link><div className="library-topic-list">{topics.filter(t=>(!family||t.family===family)&&matches(text(t.title,lang)+' '+text(t.summary,lang))).map(t=><Link className="dashboard-panel" key={t.id} href={`${base}?topic=${t.id}`}><StudyArtwork id={t.id} lang={lang} variant="card"/><h2>{text(t.title,lang)}</h2><p className="muted">{text(t.summary,lang)}</p><span className="text-link">{ar?'الشرح والمعادلات والحلول':'Explanation, formulas and solutions'} →</span></Link>)}</div></>}
   {needle&&<><h2>{ar?'مسائل تطابق البحث':'Matching problems'}</h2><WorkedSolutions problems={selectedProblems} lang={lang} videos={videos}/></>}
  </>}
  {topic&&<><div className="topic-tabs" role="group" aria-label={ar?'محتوى الموضوع':'Topic resources'}>{['summary','formulas','solutions'].map((id,i)=><Link key={id} aria-current={view===id?'page':undefined} className={view===id?'selected':''} href={`${base}?topic=${topic.id}&view=${id}`}>{(ar?['الفكرة كاملة','المعادلات','الحلول التطبيقية']:['Full explanation','Formulas','Worked solutions'])[i]}</Link>)}</div>
   {view==='summary'&&<section className="surface chapter"><StudyArtwork id={topic.id} lang={lang}/><StudyMarkdown>{text(topic.chapter,lang)}</StudyMarkdown><VideoHelp videos={videos.filter(v=>topic.videoIds.includes(v.id))} lang={lang}/><Link className="button primary" href={`/${lang}/topics/${topic.id}?tab=story`}>{ar?'طبّق في خريطة الفهم':'Apply it in the story map'}</Link></section>}
   {view==='formulas'&&<div className="problem-register">{topic.steps.map((s,i)=><details key={s.id}><summary>{text(s.title,lang)}</summary><p>{text(s.explain,lang)}</p><div className="formula-box" dir="ltr">{s.formula}</div><p>{text(s.symbols,lang)}</p><p>{text(s.assumptions,lang)}</p><p className="callout">{text(s.interpret,lang)}</p><Link className="text-link" href={`/${lang}/topics/${topic.id}?tab=story&step=${i}`}>{ar?'طبّق هذه الخطوة':'Apply this step'}</Link></details>)}</div>}
   {view==='solutions'&&<><input aria-label={ar?'ابحث في مسائل الموضوع':'Search topic problems'} value={search} onChange={e=>setSearch(e.target.value)} placeholder={ar?'ابحث عن مسألة…':'Find a problem…'}/><WorkedSolutions problems={selectedProblems} videos={videos} lang={lang} selectedId={params.get('problem')}/></>}
  </>}
 </>;
}

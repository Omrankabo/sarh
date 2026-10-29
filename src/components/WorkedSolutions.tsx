import ReportIssue from './ReportIssue';
import Link from 'next/link';
import {Check} from 'lucide-react';
import type {Lang,Video,WorkedProblem} from '@/lib/types';
import {text} from '@/lib/types';
import ProblemSketch from './ProblemSketch';
import VideoHelp from './VideoHelp';
import {subjectForTopic} from '@/lib/subjects';
import CashFlowSketch from './CashFlowSketch';
import SoilSketch from './SoilSketch';
import CourseSketch from './CourseSketch';

export default function WorkedSolutions({problems,videos,lang,selectedId}:{problems:WorkedProblem[];videos:Video[];lang:Lang;selectedId?:string|null}){
 const ar=lang==='ar';
 return <div className="problem-register">{problems.map(p=><details key={p.id} id={'problem-'+p.id} open={selectedId===p.id?true:undefined}><summary><span className="badge verified"><Check size={13}/>{p.origin==='authored'?(ar?'تطبيق إضافي متحقق':'Checked transfer exercise'):(ar?'حل متحقق مع مراجع':'Checked · source referenced')}</span>{text(p.title,lang)}</summary>
  {p.courseSketch?<CourseSketch data={p.courseSketch} lang={lang}/>:p.soilProfile?<SoilSketch data={p.soilProfile} lang={lang}/>:p.cashflow?<CashFlowSketch data={p.cashflow} lang={lang}/>:p.sketch?<ProblemSketch sketch={p.sketch} lang={lang}/>:<div className="diagram-fallback"><strong>{ar?'مرجع الرسم الأصلي':'Original diagram reference'}</strong><p>{ar?'ارجع إلى الملف والصفحة للتحقق من المعطيات الأصلية. معطيات المسألة وحلها مكتوبان أدناه.':'Consult the filename and page for the original statement. The problem data and solution appear below.'}</p>{p.sources.map((s,i)=><p key={i}><bdi>{s.filename}</bdi> · {ar?'صفحة PDF':'PDF page'} {s.page}</p>)}</div>}
  <h3>{ar?'المعطيات والمطلوب':'Given and required'}</h3><p>{text(p.givens,lang)}</p>
  <details className="worked-reveal"><summary>{ar?'حاول أولًا، ثم افتح الحل والتفسير':'Try first, then reveal the solution and reasoning'}</summary><div className="calculation">{text(p.solution,lang)}</div></details>
  <VideoHelp videos={videos.filter(v=>p.videoIds.includes(v.id))} lang={lang} context={ar?'أمثلة مرتبطة بالطريقة؛ ليست تسجيلًا لحل المسألة نفسها.':'Related method examples; these are not recordings of this exact problem.'}/>
  <div className="source-links">{p.sources.map((s,i)=><span key={i}><bdi>{s.filename}</bdi> · {ar?'صفحة PDF':'PDF page'} {s.page}</span>)}</div>
  <Link className="text-link" href={`/${lang}/materials/${subjectForTopic(p.topic)?.id||'structures-ii'}?topic=${p.topic}&view=solutions&problem=${p.id}`}>{ar?'رابط هذه المسألة':'Link to this problem'}</Link>
 <ReportIssue topic={p.topic} item={p.id} lang={lang} kind="solution"/>
 </details>)}{!problems.length&&<p className="muted">{ar?'لا توجد مسائل مطابقة لهذا البحث.':'No problems match this search.'}</p>}</div>;
}

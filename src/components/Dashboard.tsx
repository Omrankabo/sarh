'use client';
import Link from 'next/link';
import {ArrowUpRight,BookOpen,Clock3,Flame,Layers3,Target,TrendingUp} from 'lucide-react';
import type {Lang,Notebook,TopicIndex} from '@/lib/types';
import {text} from '@/lib/types';
import type {report} from '@/lib/study';
import {subjects} from '@/lib/subjects';
import Poetry from './Poetry';
import StudyArtwork from './StudyArtwork';
import {subjectForTopic} from '@/lib/subjects';
import {RecallWidget} from './ReviewCenter';
import AnimatedNumber from './AnimatedNumber';
import {reviewSummary,nextStudy} from '@/lib/study-views';

type Stats=ReturnType<typeof report>;
export default function Dashboard({lang,topics,book,stats,now,timer}:{lang:Lang;topics:TopicIndex[];book:Notebook;stats:Stats;now:number;timer:React.ReactNode}){
 const ar=lang==='ar',say=(en:string,arabic:string)=>ar?arabic:en;
 const {topic:next,step,completed,tab,active}=nextStudy(topics,book);
 const {due}=reviewSummary(topics,book,now);
 const metrics=[
  {icon:Flame,label:say('Streak','التزام'),value:stats.streak,unit:say('days','أيام'),color:'warm'},
  {icon:Clock3,label:say('Focus','تركيز'),value:Math.round(stats.minutes),unit:say('min','دقيقة'),color:'sage'},
  {icon:Target,label:say('Accuracy','الدقة'),value:stats.accuracy===null?'—':Math.round(stats.accuracy*100),suffix:'%',unit:'',color:'sage'},
  {icon:BookOpen,label:say('Review','للمراجعة'),value:due,unit:say('cards','بطاقة'),color:'sand'},
 ];

 return <div className="dashboard">
  <div className="dashboard-heading"><div><p>{say('Your study space','مساحتك الدراسية')}</p><h1>{say('Your study desk','مكتب دراستك')}</h1></div><time>{now?new Intl.DateTimeFormat(ar?'ar-SA':'en-GB',{weekday:'long',day:'numeric',month:'long',timeZone:'Asia/Riyadh',calendar:'gregory'}).format(now):''}</time></div>
  <div className="desk-actions">
   <section className="continue-panel dashboard-panel"><div className="panel-title"><h2><BookOpen size={19}/>{say(active?'Continue studying':'Start with one idea',active?'متابعة الدراسة':'ابدأ بفكرة واحدة')}</h2><span>{completed} / {next.steps.length} {say('steps','خطوات')}</span></div><div className="continue-content"><div><p className="eyebrow">{text(subjectForTopic(next.id)!.title,lang)}</p><h2 className="continue-topic">{text(next.title,lang)}</h2><p className="continue-step">{step+1}. {text(next.steps[step]?.title,lang)}</p><Link className="button primary" href={`/${lang}/topics/${next.id}?tab=${tab}&step=${step}`}>{say(active?'Continue understanding':'Begin understanding',active?'تابع الفهم':'ابدأ الفهم')}<ArrowUpRight size={17}/></Link></div><StudyArtwork id={next.id} lang={lang} variant="card"/></div></section>
   <RecallWidget topics={topics} book={book} now={now} lang={lang}/>
  </div>
  <Poetry lang={lang}/>
  <section className="metric-grid" aria-label={say('Study summary · last 7 days','ملخص الدراسة · آخر ٧ أيام')}>
   {metrics.map(m=><article className="metric-row" key={m.label}><span className={'metric-icon '+m.color}><m.icon size={19}/></span><span className="metric-label">{m.label}</span><strong dir="ltr">{typeof m.value==='number'?<AnimatedNumber value={m.value} suffix={m.suffix}/>:m.value}</strong>{m.unit&&<span className="metric-unit">{m.unit}</span>}</article>)}
  </section>

  <div className="dashboard-columns">
   <section className="dashboard-chart dashboard-panel"><div className="panel-title"><h2><TrendingUp size={19}/>{say('Focus activity','نشاط التركيز')}</h2><span>{say('Last 7 days','آخر ٧ أيام')}</span></div><div className="chart-total"><strong><AnimatedNumber value={Math.round(stats.minutes)}/></strong><span>{say('minutes','دقيقة')}</span></div><FocusChart stats={stats} lang={lang}/><details className="chart-details"><summary>{say('Daily details','تفاصيل الأيام')}</summary><table><thead><tr><th>{say('Date','التاريخ')}</th><th>{say('Minutes','دقائق')}</th><th>{say('Questions','محاولات')}</th><th>{say('Reviews','مراجعات')}</th></tr></thead><tbody>{stats.days.map(d=><tr key={d.date}><td>{d.date}</td><td>{d.minutes.toFixed(1)}</td><td>{d.attempts}</td><td>{d.reviews}</td></tr>)}</tbody></table><p>{say('Streak: 20 focus minutes and a question attempt or card review per Riyadh day. Accuracy: first independent attempts in these seven days.','الالتزام: ٢٠ دقيقة تركيز ومحاولة سؤال أو مراجعة بطاقة في اليوم بتوقيت الرياض. الدقة: المحاولات الأولى المستقلة خلال الأيام السبعة.')}</p></details></section>
   {timer}
  </div>
  <section className="dashboard-topics"><div className="panel-title"><h2><Layers3 size={19}/>{say('Courses','المقررات')}</h2><Link className="text-link" href={`/${lang}/subjects`}>{say('Browse courses','تصفّح المقررات')}<ArrowUpRight size={15}/></Link></div><div className="journey-rows subject-rows">{subjects.map(s=><Link href={`/${lang}/subjects/${s.id}`} className="journey-row" key={s.id}><BookOpen size={18}/><span>{text(s.title,lang)}</span><span className="journey-count">{s.publication==='planned'?say('Course plan','خطة الإعداد'):`${topics.filter(t=>s.topicIds.includes(t.id)).length} ${say('topics','موضوعًا')}`}</span><ArrowUpRight size={16}/></Link>)}</div></section>
 </div>;
}

function FocusChart({stats,lang}:{stats:Stats;lang:Lang}){
 const ar=lang==='ar',width=700,height=218,left=43,right=18,top=16,bottom=37;
 const max=Math.max(30,Math.ceil(Math.max(...stats.days.map(d=>d.minutes))/30)*30);
 const x=(i:number)=>left+i*(width-left-right)/6,y=(value:number)=>height-bottom-value/max*(height-top-bottom);
 const points=stats.days.map((d,i)=>`${x(i)},${y(d.minutes)}`).join(' ');
 return <div className="focus-line-chart" dir="ltr"><svg viewBox={`0 0 ${width} ${height}`} role="img" aria-labelledby="focus-chart-title focus-chart-description"><title id="focus-chart-title">{ar?'دقائق التركيز خلال آخر سبعة أيام':'Focus minutes over the last seven days'}</title><desc id="focus-chart-description">{stats.days.map(d=>`${d.date}: ${d.minutes.toFixed(1)}`).join('; ')}</desc>
  {[0,1,2,3].map(i=>{const value=max*i/3;return <g key={i}><line x1={left} x2={width-right} y1={y(value)} y2={y(value)} className="chart-gridline"/><text x={left-12} y={y(value)+4} textAnchor="end" className="chart-label">{Math.round(value)}</text></g>})}
  <polyline points={points} pathLength="1" className="focus-line"/>
  {stats.days.map((d,i)=><g key={d.date}><circle cx={x(i)} cy={y(d.minutes)} r="4.5" className={'focus-point '+(d.committed?'committed':'')}><title>{`${d.date}: ${d.minutes.toFixed(1)} ${ar?'دقيقة':'min'}`}</title></circle><text x={x(i)} y={height-9} textAnchor="middle" className="chart-label">{new Intl.DateTimeFormat(ar?'ar-SA':'en',{weekday:'short'}).format(new Date(d.date+'T12:00:00+03:00'))}</text></g>)}
 </svg></div>;
}

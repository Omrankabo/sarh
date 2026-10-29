import Link from 'next/link';
import type {Lang,Topic,TopicIndex} from '@/lib/types';
import {text} from '@/lib/types';
/** Public, account-free HTML while the interactive notebook initializes. */
export default function PublicStudyShell({lang,topic,topics}:{lang:Lang;topic?:Topic;topics:TopicIndex[]}){
 const ar=lang==='ar';
 return <div className="public-study-shell" dir={ar?'rtl':'ltr'}><header><Link href={`/${lang}`} className="wordmark">صَرح</Link><nav aria-label={ar?'التنقل':'Navigation'}><Link href={`/${lang}/subjects`}>{ar?'المواد':'Subjects'}</Link><Link href={`/${lang}/review`}>{ar?'المراجعة':'Review'}</Link><Link href={`/${lang}/materials`}>{ar?'المكتبة':'Library'}</Link></nav></header><main><p className="eyebrow">{ar?'افهم. طبّق. استرجع.':'UNDERSTAND. APPLY. RECALL.'}</p><h1>{topic?text(topic.title,lang):ar?'ابنِ فهمك، خطوة بخطوة.':'Build understanding, one step at a time.'}</h1><p>{topic?text(topic.introduction?.scene||topic.summary,lang):ar?'رحلات قصيرة تجمع الفكرة والمثال والتدريب. اختر موضوعًا لتبدأ.':'Short journeys connect the idea, a worked example and practice. Choose a topic to begin.'}</p>{!topic&&<ul>{topics.slice(0,4).map(t=><li key={t.id}><Link href={`/${lang}/topics/${t.id}`}>{text(t.title,lang)}</Link></li>)}</ul>}<p className="muted" role="status">{ar?'نجهّز دفتر الدراسة التفاعلي…':'Preparing your interactive study notebook…'}</p></main></div>;
}

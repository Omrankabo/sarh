import {ArrowUpRight,Play} from 'lucide-react';
import type {Lang,Video} from '@/lib/types';
import {text} from '@/lib/types';

export default function VideoHelp({videos,lang,context}:{videos:Video[];lang:Lang;context?:string}){
 const ar=lang==='ar';
 return <details className="video-help"><summary><Play size={16}/>{ar?'شاهد شرحًا أو مثالًا محلولًا':'Watch an explanation or worked example'}</summary>
  {context&&<p className="small muted">{context}</p>}
  {videos.length? videos.map(v=><a className="video-help-link" key={v.id} href={`https://www.youtube.com/watch?v=${v.id}`} target="_blank" rel="noreferrer"><Play size={17}/><span><strong>{v.title}</strong><small>{v.author} · {v.language} · {ar?({worked:'مثال مشابه',concept:'شرح الفكرة',foundation:'أساس مرتبط'})[v.kind]:({worked:'Similar worked example',concept:'Concept explanation',foundation:'Related foundation'})[v.kind]}</small><span>{text(v.purpose,lang)}</span></span><ArrowUpRight size={16}/></a>):<p>{ar?'لم نتحقق من فيديو مناسب لهذا التفصيل بعد. الشرح المكتوب يتيح لك متابعة الحل.':'A suitable video for this detail has not been reviewed yet. The written explanation lets you continue.'}</p>}
  <p className="small muted">{ar?'روابط اختيارية تتطلب الإنترنت. قارن المعطيات والوحدات والفرضيات؛ وفي التصميم تحقق من الكود وإصداره قبل نقل أي معادلة أو معامل من الفيديو.':'Optional external links need internet. Compare data, units and assumptions; in design, check the code and edition before transferring any video formula or factor.'}</p>
 </details>;
}

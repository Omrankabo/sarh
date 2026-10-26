import type {Lang,Topic,Video} from '@/lib/types';
import {text} from '@/lib/types';
import StudyMarkdown from './StudyMarkdown';
import VideoHelp from './VideoHelp';

export default function TopicChapter({topic,lang,videos,resume,onStory,onPrerequisites}:{topic:Topic;lang:Lang;videos:Video[];resume:boolean;onStory:()=>void;onPrerequisites:()=>void}){
 const ar=lang==='ar';
 return <article className="chapter surface">
  <div className="chapter-intro"><p className="eyebrow">{ar?'الفكرة كاملة، قبل التطبيق':'THE WHOLE IDEA, BEFORE APPLICATION'}</p><h2>{ar?'افهم ما يحدث، ثم تعلّم كيف تحسبه.':'Understand what happens. Then learn to calculate it.'}</h2><p>{text(topic.summary,lang)}</p><div className="actions"><button onClick={onPrerequisites}>{ar?'راجع ما تحتاجه أولًا':'Check the foundations'}</button><a className="text-link" href="#chapter-to-story">{ar?'إلى خطوات التطبيق':'Go to the guided application'}</a></div></div>
  <details className="chapter-contents"><summary>{ar?'ماذا ستفهم في هذا الفصل؟':'What will you understand in this chapter?'}</summary><ol>{topic.concepts.map(c=><li key={c.id}>{text(c.title,lang)}</li>)}</ol></details>
  <StudyMarkdown>{text(topic.chapter,lang)}</StudyMarkdown>
  <VideoHelp videos={videos} lang={lang}/>
  <div id="chapter-to-story" className="chapter-next"><h3>{ar?'حوّل الفهم إلى خطوات تحلها بنفسك.':'Turn understanding into steps you can solve.'}</h3><p>{ar?'احتفظ بتوقعك للشكل والاستجابة. ستختبره الآن خطوة بخطوة.':'Keep your prediction of the shape and response. Now test it one step at a time.'}</p><button className="primary" onClick={onStory}>{resume?(ar?'استأنف خريطة الفهم':'Resume the story map'):(ar?'ابدأ خريطة الفهم':'Begin the story map')}</button></div>
 </article>;
}

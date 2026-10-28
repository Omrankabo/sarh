import type {Subject} from '@/lib/subjects';
import type {Lang} from '@/lib/types';
import {text} from '@/lib/types';
export default function CourseRoadmap({subject,lang}:{subject:Subject;lang:Lang}){
 if(!subject.curriculum)return null;
 const ar=lang==='ar';
 return <details className="course-roadmap surface"><summary>{ar?'خريطة المادة وخطة الدراسة':'Course map & study plan'} · {subject.topicIds.length} {ar?'موضوعات منشورة':'published topics'}</summary><p className="muted">{ar?'الموضوعات المنشورة أدناه جاهزة للدراسة. تعرض هذه الخريطة أيضًا ما تبقى من نطاق المقرر؛ لا تعني حل جميع مسائل الأرشيف.':'Published journeys below are ready to study. This map also shows the remaining course scope; it does not mean every archive problem has been solved.'}</p><ol>{subject.curriculum.map((t,i)=><li key={i}>{text(t,lang)}</li>)}</ol>{subject.studyPlan&&<p>{text(subject.studyPlan,lang)}</p>}</details>;
}

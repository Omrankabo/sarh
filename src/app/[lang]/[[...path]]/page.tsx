import {notFound} from 'next/navigation';
import StudyApp from '@/components/StudyApp';
import {subjects} from '@/lib/subjects';
import {loadStudyContent} from '@/lib/content';
export default async function Page({params}:{params:Promise<{lang:string;path?:string[]}>}){
 const p=await params;if(!['ar','en'].includes(p.lang))notFound();
 const {topics,prerequisites,videos,problems}=loadStudyContent();
 const parts=p.path||[];
 if(parts.length>2)notFound();
 if(parts[0]==='subjects'){if(parts[1]&&!subjects.some(s=>s.id===parts[1]))notFound();}
 else if(parts[0]==='topics'){if(parts[1]&&!topics.some(t=>t.id===parts[1]))notFound();}
 else if(parts[0]==='materials'){if(parts[1]&&!subjects.some(s=>s.id===parts[1]))notFound();}
 else if(parts.length)notFound();
 return <StudyApp lang={p.lang as 'ar'|'en'} topics={topics} prerequisites={prerequisites} videos={videos} problems={problems}/>;
}

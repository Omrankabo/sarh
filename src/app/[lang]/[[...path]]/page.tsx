import {Suspense} from 'react';
import {notFound} from 'next/navigation';
import PublicStudyShell from '@/components/PublicStudyShell';
import StudyApp from '@/components/StudyApp';
import {subjects} from '@/lib/subjects';
import {loadStudyContent,studyPaths} from '@/lib/content';
import {text,type Lang} from '@/lib/types';
type Props={params:Promise<{lang:string;path?:string[]}>};
export const dynamicParams=false;
export function generateStaticParams(){return ['ar','en'].flatMap(lang=>studyPaths().map(path=>({lang,path})));}
function valid(lang:string,path:string[]){return ['ar','en'].includes(lang)&&studyPaths().some(p=>p.join('/')===path.join('/'));}
export async function generateMetadata({params}:Props){
 const {lang,path=[]}=await params;if(!valid(lang,path))return {};
 const data=loadStudyContent(path,lang as Lang),topic=data.topics.find(t=>path[0]==='topics'&&t.id===path[1]),subject=subjects.find(s=>s.id===path[1]);
 const titles=lang==='ar'?{home:'لوحة الدراسة',subjects:'المواد الدراسية',topics:'رحلات التعلم',review:'المراجعة',materials:'مكتبة الدراسة'}:{home:'Dashboard',subjects:'Subjects',topics:'Learning journeys',review:'Review',materials:'Study library'};
 const title=topic?text(topic.title,lang as Lang):subject?text(subject.title,lang as Lang):titles[(path[0]||'home') as keyof typeof titles];
 const description=topic?text(topic.summary,lang as Lang):lang==='ar'?'افهم الفكرة، طبّقها، ثم استرجعها. مساحة دراسة مرئية لطلاب الهندسة.':'Understand, apply, then recall. A visual study space for engineering students.';
 const suffix=path.length?'/'+path.join('/'):'';
 return {title:`${title} | صَرح`,description,alternates:{canonical:`/${lang}${suffix}`,languages:{ar:`/ar${suffix}`,en:`/en${suffix}`}},openGraph:{title:`${title} | صَرح`,description,url:`/${lang}${suffix}`,images:['/sarh-hero.webp']}};
}
export default async function Page({params}:Props){
 const {lang,path=[]}=await params;if(!valid(lang,path))notFound();
 const data=loadStudyContent(path,lang as Lang);
 return <Suspense fallback={<PublicStudyShell lang={lang as Lang} topics={data.topics} topic={path[0]==='topics'?data.lessons[0]:undefined}/>}><StudyApp lang={lang as Lang} {...data}/></Suspense>;
}

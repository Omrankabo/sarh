import 'server-only';
import fs from 'node:fs';
import path from 'node:path';
import type {Prerequisite,Topic,TopicIndex,Video,WorkedProblem,Introduction,Lang} from './types';
import {subjects} from './subjects';

const published=path.join(process.cwd(),'content','published');
const read=<T,>(name:string):T=>JSON.parse(fs.readFileSync(path.join(published,name),'utf8'));
export const topicManifest=()=>read<{id:string;file:string}[]>('topics.json');
export function studyPaths(){return [[],['subjects'],['topics'],['materials'],['review'],...subjects.flatMap(s=>[['subjects',s.id],['materials',s.id]]),...topicManifest().map(t=>['topics',t.id])];}
/** URLs select the language; the other translation is fetched only when switching language. */
function localized<T>(value:T,lang?:Lang):T{
 if(!lang)return value;
 return JSON.parse(JSON.stringify(value,(_key,v)=>v&&typeof v==='object'&&typeof v.ar==='string'&&typeof v.en==='string'?{ar:lang==='ar'?v.ar:'',en:lang==='en'?v.en:''}:v));
}
export function loadStudyContent(parts:string[]=[],lang?:Lang){
 const introductions=read<Record<string,Introduction>>('introductions.json');
 const manifest=topicManifest();
 const selected=parts[0]==='topics'?[parts[1]]:parts[0]==='materials'?subjects.find(s=>s.id===parts[1])?.topicIds||[]:[];
 const raw=manifest.map(entry=>({entry,topic:read<Topic>(entry.file)}));
 const topics:TopicIndex[]=raw.map(({topic:t})=>({id:t.id,family:t.family,title:t.title,summary:t.summary,concepts:t.concepts,cards:t.cards,steps:t.steps.map(({id,title,concepts})=>({id,title,concepts})),questions:t.questions.map(({id})=>({id}))}));
 const lessons=raw.filter(({topic})=>selected.includes(topic.id)).map(({entry,topic})=>{
  const folder=path.dirname(entry.file);
  return {...topic,introduction:introductions[topic.id],chapter:{ar:fs.readFileSync(path.join(published,folder,'understand.ar.md'),'utf8'),en:fs.readFileSync(path.join(published,folder,'understand.en.md'),'utf8')}};
 });
 const prereqIds=new Set(lessons.flatMap(t=>t.prereqIds));
 const problems=read<WorkedProblem[]>('problems.json').filter(p=>selected.includes(p.topic));
 const videoIds=new Set([...lessons.flatMap(t=>t.videoIds),...problems.flatMap(p=>p.videoIds)]);
 return localized({topics,lessons,prerequisites:read<Prerequisite[]>('prerequisites.json').filter(p=>prereqIds.has(p.id)),videos:read<Video[]>('videos.json').filter(v=>videoIds.has(v.id)||v.introTopics?.some(t=>selected.includes(t))),problems},lang);
}

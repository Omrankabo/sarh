import 'server-only';
import fs from 'node:fs';
import path from 'node:path';
import type {Prerequisite,Topic,Video,WorkedProblem} from './types';

const published=path.join(process.cwd(),'content','published');
const read=<T,>(name:string):T=>JSON.parse(fs.readFileSync(path.join(published,name),'utf8'));
export function loadStudyContent(){
 const manifest=read<{id:string;file:string}[]>('topics.json');
 const topics=manifest.map(entry=>{
  const topic=read<Topic>(entry.file),folder=path.dirname(entry.file);
  return {...topic,chapter:{ar:fs.readFileSync(path.join(published,folder,'understand.ar.md'),'utf8'),en:fs.readFileSync(path.join(published,folder,'understand.en.md'),'utf8')}};
 });
 return {topics,prerequisites:read<Prerequisite[]>('prerequisites.json'),videos:read<Video[]>('videos.json'),problems:read<WorkedProblem[]>('problems.json')};
}

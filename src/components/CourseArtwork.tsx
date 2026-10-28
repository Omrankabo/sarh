import type {Lang} from '@/lib/types';
import StudyArtwork from './StudyArtwork';
export default function CourseArtwork({topic,lang,compact=false}:{topic:string;lang:Lang;compact?:boolean}){return <StudyArtwork id={topic} lang={lang} variant={compact?'card':'intro'}/>;}

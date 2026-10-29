import type {Lang} from '@/lib/types';
/** Opens a draft only. Never sends study history or account information. */
export default function ReportIssue({topic,item,lang,kind}:{topic:string;item:string;lang:Lang;kind:'question'|'card'|'solution'}){
 const body=`Topic: ${topic}\nItem: ${item}\nType: ${kind}\nLanguage: ${lang}\n\nWhat seems wrong?\n\nWhat did you expect?\n\nPlease do not include your email, password or private study history.`;
 const url='https://github.com/Omrankabo/sarh/issues/new?'+new URLSearchParams({title:`Content review: ${topic} / ${item}`,body});
 return <a className="report-issue" href={url} target="_blank" rel="noreferrer">{lang==='ar'?'لاحظت مشكلة؟ افتح بلاغًا في GitHub ↗':'Something looks wrong? Report on GitHub ↗'}</a>;
}

import {freshNotebook,freshProgress,validNotebook} from './study';
import {emptyRecall,validRecall} from './recall';
export type CloudRecord={key:string;value:any;at:number};
const forbidden=new Set(['__proto__','constructor','prototype']);
const segment=(s:string)=>!!s&&!forbidden.has(s)&&!/[\/\u0000-\u001f]/.test(s);
function safeTree(value:unknown,depth=0):boolean{
 if(depth>24)return false;
 if(value===null||typeof value==='string'||typeof value==='boolean')return true;
 if(typeof value==='number')return Number.isFinite(value);
 if(Array.isArray(value))return value.every(v=>safeTree(v,depth+1));
 return !!value&&typeof value==='object'&&Object.entries(value).every(([key,v])=>!forbidden.has(key)&&safeTree(v,depth+1));
}
/** Validate before any record key is used to traverse a notebook object. */
export function validCloudRecord(kind:string,input:unknown):input is CloudRecord{
 if(!input||typeof input!=='object'||!safeTree(input))return false;
 const r=input as CloudRecord;if(typeof r.key!=='string'||!Number.isFinite(r.at)||r.at<0||!Object.hasOwn(r,'value'))return false;
 const b=freshNotebook(),parts=r.key.split('/');
 if(kind==='settings'){
  if(parts.length!==2||parts[0]!=='settings'||!['language','focus','break','sound','desktopAlerts'].includes(parts[1]))return false;
  Object.assign(b.settings,{[parts[1]]:r.value});return validNotebook(b);
 }
 if(kind==='progress'){
  if(parts[0]!=='topics'||!parts.every(segment))return false;
  const field=parts[2],p=freshProgress();
  if(['answers','cards','prereqs','predictions'].includes(field)){
   if(parts.length!==4)return false;
   (p[field as 'answers'] as Record<string,unknown>)[parts[3]]=r.value;
  }else{
   if(parts.length!==3||!['introBlock','introPrediction','step','tab','completed','errors'].includes(field))return false;
   Object.assign(p,{[field]:r.value});
  }
  b.topics[parts[1]]=p;return validNotebook(b);
 }
 if(kind==='imports')return r.value===true; // Old pilot receipts deliberately contain serialized history.
 if(kind==='recallMeta')return parts.length===2&&segment(parts[1])&&(parts[0]==='dismissed'?r.value===true:parts[0]==='priority'&&[1,2,3].includes(r.value?.value)&&Number.isFinite(r.value?.at));
 if(!segment(r.key))return false;
 if(kind==='attempts'){b.attempts=[r.value];return r.value?.id===r.key&&validNotebook(b);}
 if(kind==='sessions'){b.sessions=[r.value];return r.value?.id===r.key&&validNotebook(b);}
 if(kind==='devices'){b.timer=r.value?.timer;return r.value?.device===r.key&&Number.isFinite(r.value?.at)&&validNotebook(b);}
 if(kind==='recallCards')return !!r.value&&segment(r.value.topic||'')&&segment(r.value.card||'')&&r.key===r.value.topic+'::'+r.value.card&&validRecall({...emptyRecall(),cards:{[r.key]:r.value}});
 if(kind==='recallEvents')return r.value?.id===r.key&&typeof r.value.key==='string'&&segment(r.value.key)&&validRecall({...emptyRecall(),events:[r.value]});
 return false;
}

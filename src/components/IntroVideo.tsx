'use client';
import {useState} from 'react';
import type {Lang,Video} from '@/lib/types';
import {text} from '@/lib/types';
export function qualifiesAsIntroduction(video:Video){const start=video.startSeconds??0,end=video.endSeconds??video.durationSeconds;return /^[A-Za-z0-9_-]{11}$/.test(video.id)&&Number.isFinite(start)&&Number.isFinite(end)&&Number.isFinite(video.durationSeconds)&&!!video.embedVerifiedAt&&!!video.watchFor&&!!video.durationSeconds&&end!==undefined&&start>=0&&end>start&&end<=video.durationSeconds&&end-start<600;}
export default function IntroVideo({videos,topic,lang}:{videos:Video[];topic:string;lang:Lang}){
 const [loaded,setLoaded]=useState(false),ar=lang==='ar';
 const v=[...videos].filter(v=>v.introTopics?.includes(topic)&&qualifiesAsIntroduction(v)).sort((a,b)=>Number(b.language==='Arabic')-Number(a.language==='Arabic'))[0];
 if(!v)return <div className="intro-video"><strong>{ar?'ابدأ بالمشهد المكتوب أدناه':'Start with the scene below'}</strong><p className="small muted">{ar?'لم نُكمل التحقق من فيديو قصير مناسب لهذا الموضوع. يمكنك فهم الفكرة كاملة هنا، والفيديو اختياري.':'A suitable short introduction has not finished review yet. The written lesson teaches the idea completely; video is optional.'}</p></div>;
 const start=v.startSeconds??0,end=v.endSeconds??v.durationSeconds!,length=end-start,stamp=(n:number)=>`${Math.floor(n/60)}:${String(n%60).padStart(2,'0')}`;
 const src=`https://www.youtube-nocookie.com/embed/${v.id}?autoplay=0&playsinline=1&start=${start}&end=${end}&cc_load_policy=1&cc_lang_pref=${lang}`;
 return <section className="intro-video" aria-label={ar?'تمهيد بالفيديو':'Video introduction'}><h3>{ar?'شاهد الفكرة أولًا':'See the idea first'}</h3><p>{v.title}</p><small>{v.author} · {v.language} · {stamp(length)}{(start>0||end!==v.durationSeconds)&&` · ${stamp(start)}–${stamp(end)}`}</small><p><strong>{ar?'راقب هذا: ':'Watch for this: '}</strong>{text(v.watchFor,lang)}</p>{loaded?<iframe src={src} title={v.title} allow="encrypted-media; picture-in-picture; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin"/>:<button onClick={()=>setLoaded(true)}>{ar?'افتح الفيديو':'Load video'}</button>}<p className="small"><a href={`https://www.youtube.com/watch?v=${v.id}&t=${start}s`} target="_blank" rel="noreferrer">{ar?'شاهد على YouTube':'Watch on YouTube'}</a> · {ar?'الفيديو يحتاج اتصالًا بالإنترنت. يمكنك متابعة القراءة مباشرة.':'Video needs internet. You can continue reading immediately.'}</p></section>;
}

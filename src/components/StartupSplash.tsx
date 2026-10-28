'use client';
import {useEffect,useRef,useState} from 'react';
import {usePathname} from 'next/navigation';
import LoadingArtwork from './LoadingArtwork';
import {claimEntrance,mainArea} from '@/lib/visit';
export default function StartupSplash(){
 const path=usePathname(),area=mainArea(path),active=useRef<string|null>(null);
 const [state,setState]=useState({visible:true,playing:false,progress:0,error:false});
 useEffect(()=>{
  if(active.current!==area&&!claimEntrance(path)){setState(s=>({...s,visible:false}));return;}
  active.current=area;let live=true,started=false;const complete=new Set<string>();let end:ReturnType<typeof setTimeout>;
  setState({visible:true,playing:false,progress:0,error:false});
  const ready=(task:string)=>{if(!live)return;complete.add(task);setState(s=>({...s,progress:complete.size*25}));if(complete.size===4&&!started){started=true;setState(s=>({...s,playing:true}));end=setTimeout(()=>{if(!live)return;active.current=null;setState(s=>({...s,visible:false}));window.dispatchEvent(new Event('sarh:intro-complete'));},300)}};
  const check=()=>{const main=document.getElementById('main');if(main&&mainArea(main.dataset.route||'')===area){ready('page');if(main.getAttribute('aria-busy')==='false')ready('progress')}};
  const observer=new MutationObserver(check);observer.observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['data-route','aria-busy']});check();
  const image=new Image();image.src='/sarh-hero.png';image.decode().then(()=>ready('art'),()=>ready('art'));
  document.fonts.ready.then(()=>ready('fonts'));
  const timeout=setTimeout(()=>{if(live&&!started){active.current=null;setState(s=>({...s,visible:false,error:true}));}},8000);
  return()=>{live=false;observer.disconnect();clearTimeout(end);clearTimeout(timeout)};
 },[area]);
 useEffect(()=>{if(!state.visible)return;const before=document.body.style.overflow;document.body.style.overflow='hidden';return()=>{document.body.style.overflow=before}},[state.visible]);
 return state.visible?<LoadingArtwork label={path.startsWith('/en')?'Preparing your study space':'نجهّز مساحتك الدراسية'} animate={state.playing} progress={state.progress}/>:state.error?<div className="loading-recovery" role="status">{path.startsWith('/en')?'Loading took longer than expected. Refresh if content is unavailable.':'استغرق التحميل وقتًا أطول. حدّث الصفحة إذا لم يظهر المحتوى.'}<button onClick={()=>setState(s=>({...s,error:false}))}>×</button></div>:null;
}

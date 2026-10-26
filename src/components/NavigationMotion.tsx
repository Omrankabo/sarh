'use client';
import {useEffect,useRef,useState} from 'react';
import {usePathname} from 'next/navigation';

const withoutLanguage=(path:string)=>path.replace(/^\/(ar|en)(?=\/|$)/,'')||'/';
export default function NavigationMotion(){
 const pathname=usePathname(),previous=useRef(pathname),[phase,setPhase]=useState<'idle'|'pending'|'arrived'>('idle');
 const end=useRef<ReturnType<typeof setTimeout>|undefined>(undefined);
 useEffect(()=>{
  const click=(event:MouseEvent)=>{
   if(event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
   const anchor=(event.target as Element)?.closest<HTMLAnchorElement>('a[href]');
   if(!anchor||anchor.target==='_blank'||anchor.hasAttribute('download'))return;
   const url=new URL(anchor.href,location.href);
   if(url.origin!==location.origin||withoutLanguage(url.pathname)===withoutLanguage(location.pathname))return;
   clearTimeout(end.current);setPhase('pending');
   // A canceled or failed navigation must not leave a permanent busy cue.
   end.current=setTimeout(()=>setPhase('idle'),10000);
  };
  document.addEventListener('click',click,true);
  return()=>{document.removeEventListener('click',click,true);clearTimeout(end.current)};
 },[]);
 useEffect(()=>{
  const changed=withoutLanguage(previous.current)!==withoutLanguage(pathname);
  previous.current=pathname;
  if(!changed)return;
  clearTimeout(end.current);
  let frame=0,arrived=false;
  const reveal=()=>{
   const main=document.getElementById('main');
   if(arrived||main?.dataset.route!==pathname)return;
   arrived=true;observer.disconnect();clearTimeout(end.current);setPhase('arrived');
   const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
   frame=requestAnimationFrame(()=>main.animate([{opacity:.25,transform:reduced?'none':'translateY(10px)'},{opacity:1,transform:'none'}],{duration:reduced?180:520,easing:'cubic-bezier(.16,1,.3,1)'}));
   end.current=setTimeout(()=>setPhase('idle'),650);
  };
  // Streaming can change the URL before the destination's content has mounted.
  const observer=new MutationObserver(reveal);
  observer.observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['data-route']});reveal();
  end.current=setTimeout(()=>setPhase('idle'),arrived?650:10000);
  return()=>{observer.disconnect();cancelAnimationFrame(frame)};
 },[pathname]);
 return phase==='idle'?null:<div className={'navigation-feedback '+phase} role="status" aria-label={phase==='pending'?(pathname.startsWith('/ar')?'جارٍ الانتقال':'Opening page'):(pathname.startsWith('/ar')?'الصفحة جاهزة':'Page ready')}><span/><i/><i/><i/></div>;
}

'use client';
import {useLayoutEffect,useRef} from 'react';
import type {Lang} from '@/lib/types';

const ids=['start','prerequisites','story','practice','flashcards'];
export default function TopicTabs({lang,active,onChange}:{lang:Lang;active:string;onChange:(id:string)=>void}){
 const ar=lang==='ar',list=useRef<HTMLDivElement>(null);
 useLayoutEffect(()=>{
  const el=list.current;if(!el)return;
  const measure=()=>{const button=el.querySelector<HTMLElement>('[aria-selected="true"]');if(!button)return;const b=button.getBoundingClientRect(),bounds=el.getBoundingClientRect();if(b.left<bounds.left+4)el.scrollBy({left:b.left-bounds.left-4});else if(b.right>bounds.right-4)el.scrollBy({left:b.right-bounds.right+4});};
  measure();const observer=new ResizeObserver(measure);observer.observe(el);el.querySelectorAll('button').forEach(b=>observer.observe(b));return()=>observer.disconnect();
 },[active,lang]);
 function select(index:number){onChange(ids[index]);document.getElementById('tab-'+ids[index])?.focus();}
 return <div ref={list} className="topic-tabs sliding-tabs" role="tablist" aria-label={ar?'أقسام الموضوع':'Topic sections'} onKeyDown={e=>{
  const n=ids.indexOf(active);let index=n;
  if(e.key==='ArrowRight')index=(n+(ar?-1:1)+5)%5;
  else if(e.key==='ArrowLeft')index=(n+(ar?1:-1)+5)%5;
  else if(e.key==='Home')index=0;else if(e.key==='End')index=4;else return;
  e.preventDefault();select(index);
 }}>{ids.map((id,i)=><button key={id} id={'tab-'+id} role="tab" aria-selected={active===id} aria-controls={'panel-'+id} tabIndex={active===id?0:-1} onClick={()=>onChange(id)}>{(ar?['افهم الموضوع','المتطلبات','خريطة الفهم','التدريب','البطاقات']:['Understand','Prerequisites','Story map','Practice','Flashcards'])[i]}</button>)}</div>;
}

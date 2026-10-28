'use client';
import {useLayoutEffect,type RefObject} from 'react';

/** Measure the actual translated header rows instead of guessing sticky offsets. */
export default function useStickyOffsets(root:RefObject<HTMLDivElement|null>,route:string){
 useLayoutEffect(()=>{
  const shell=root.current;if(!shell)return;
  const rows=[['.minimal-header','--header-height'],['.learning-context','--learning-context-height'],['.topic-tabs','--topic-tabs-height']] as const;
  const measure=()=>{for(const [selector,variable]of rows){const el=shell.querySelector<HTMLElement>(selector);shell.style.setProperty(variable,`${el?.getBoundingClientRect().height||0}px`);}};
  const observer=new ResizeObserver(measure);
  for(const [selector]of rows){const el=shell.querySelector(selector);if(el)observer.observe(el);}
  measure();return()=>observer.disconnect();
 },[root,route]);
}

'use client';
import {useEffect,useState,type ReactNode} from 'react';
/** Mobile disclosures keep the current task visible; desktop keeps the outline alongside it. */
export default function LearningOutline({label,children}:{label:string;children:ReactNode}){
 const [open,setOpen]=useState(false);
 useEffect(()=>{const media=matchMedia('(min-width: 901px)'),update=()=>setOpen(media.matches);update();media.addEventListener('change',update);return()=>media.removeEventListener('change',update)},[]);
 return <details className="learning-outline" open={open} onToggle={event=>setOpen(event.currentTarget.open)} onClick={event=>{if((event.target as Element).closest('nav button')&&!matchMedia('(min-width: 901px)').matches)setOpen(false)}}><summary>{label}</summary>{children}</details>;
}

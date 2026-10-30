'use client';
import {useEffect,useRef,useState} from 'react';

/** The accessible value is final; only the decorative display counts up. */
export default function AnimatedNumber({value,suffix=''}:{value:number;suffix?:string}){
 const [display,setDisplay]=useState(value),previous=useRef(0);
 useEffect(()=>{
  let frame=0,disposed=false;
  const play=()=>{
   if(disposed)return;
   const from=previous.current;previous.current=value;
   if(matchMedia('(prefers-reduced-motion: reduce)').matches){setDisplay(value);return;}
   const start=performance.now();
   const tick=(at:number)=>{const p=Math.min(1,(at-start)/240);setDisplay(Math.round(from+(value-from)*(1-Math.pow(1-p,3))));if(p<1)frame=requestAnimationFrame(tick)};
   frame=requestAnimationFrame(tick);
  };
  let waiting=false;
  try{waiting=!sessionStorage.getItem('sarh-splash-v1')}catch{}
  if(waiting){window.addEventListener('sarh:intro-complete',play,{once:true})}else play();
  return()=>{disposed=true;cancelAnimationFrame(frame);window.removeEventListener('sarh:intro-complete',play)};
 },[value]);
 return <span className="animated-number"><span className="sr-only">{value}{suffix}</span><span aria-hidden="true">{display}{suffix}</span></span>;
}

export function TimerDigits({value}:{value:string}){
 return <span className="timer-digit-group" aria-label={value}>{value.split('').map((digit,index)=><span className="timer-digit-slot" aria-hidden="true" key={index}><span className={digit===':'?'timer-colon':'timer-digit'} key={digit}>{digit}</span></span>)}</span>;
}

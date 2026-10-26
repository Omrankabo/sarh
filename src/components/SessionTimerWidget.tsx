'use client';
import {Check,Clock3,Pause,Play} from 'lucide-react';
import type {Lang,Timer} from '@/lib/types';
import {TimerDigits} from './AnimatedNumber';

/** Uses the shared notebook timer; navigation never creates a second session. */
export default function SessionTimerWidget({lang,timer,elapsed,clock,mode,ready,onStart,onPause,onResume,onFinish}:{
 lang:Lang;timer:Timer|null;elapsed:number;clock:string;mode:Timer['mode'];ready:boolean;
 onStart:()=>void;onPause:()=>void;onResume:()=>void;onFinish:()=>void;
}){
 const ar=lang==='ar',say=(en:string,arabic:string)=>ar?arabic:en;
 const active=!!timer&&timer.status!=='finished',running=active&&timer.status==='running';
 const currentMode=active?timer.mode:mode;
 const label=currentMode==='break'?say('Break','استراحة'):currentMode==='stopwatch'?say('Stopwatch','ساعة توقيت'):say('Focus','تركيز');
 const state=!ready?say('Loading','جارٍ التحميل'):running?say('Running','جارية'):active?say('Paused','متوقفة'):say('Ready','جاهز');
 const percentage=active&&timer.mode!=='stopwatch'&&timer.duration>0?Math.min(100,Math.max(0,elapsed/timer.duration*100)):null;
 const action=running?say('Pause timer','أوقف المؤقت مؤقتًا'):active?say('Resume timer','استأنف المؤقت'):say('Start timer','ابدأ المؤقت');
 return <section className={'session-widget '+(running?'is-running':active?'is-paused':'is-ready')} aria-label={say('Session timer widget','المؤقت المصغر للجلسة')} aria-busy={!ready} dir="ltr">
  {percentage!==null?<div className="session-widget-ring" role="progressbar" aria-label={say('Session completed','المكتمل من الجلسة')} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.floor(percentage)}>
   <svg viewBox="0 0 36 36" aria-hidden="true"><circle className="ring-track" cx="18" cy="18" r="15"/><circle className="ring-value" cx="18" cy="18" r="15" pathLength="100" strokeDasharray="100" strokeDashoffset={100-percentage}/></svg><span aria-hidden="true">{Math.floor(percentage)}%</span>
  </div>:<Clock3 className="session-widget-icon" size={28} aria-hidden="true"/>}
  <div className="session-widget-readout"><div className="session-widget-caption" dir={ar?'rtl':'ltr'}>{label}<span aria-hidden="true"> · </span>{state}</div><div className="session-widget-clock" role="timer" aria-live="off" aria-label={currentMode==='stopwatch'?say('Elapsed time','الوقت المنقضي'):say('Time remaining','الوقت المتبقي')}><TimerDigits value={clock}/></div></div>
  <div className="session-widget-actions"><button className="session-widget-toggle" disabled={!ready} onClick={running?onPause:active?onResume:onStart} aria-label={action} title={action}>{running?<Pause size={17}/>:<Play size={17}/>}</button>{active&&<button disabled={!ready} onClick={onFinish} aria-label={say('Finish session','أنهِ الجلسة')} title={say('Finish session','أنهِ الجلسة')}><Check size={17}/></button>}</div>
 </section>;
}

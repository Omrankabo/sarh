import {useId} from 'react';
import type {CashFlow,Lang} from '@/lib/types';
import {text} from '@/lib/types';

export default function CashFlowSketch({data,lang}:{data:CashFlow;lang:Lang}){
 const id=useId().replaceAll(':',''),ar=lang==='ar';
 const first=Math.min(0,...data.flows.map(f=>f.year)),last=Math.max(1,...data.flows.map(f=>f.year));
 const ticks=[...new Set([first,...data.flows.map(f=>f.year),last])];
 const width=Math.max(700,ticks.length*56+70),max=Math.max(1,...data.flows.map(f=>Math.abs(f.amount))),x=(year:number)=>55+(year-first)/(last-first)*(width-110);
 return <figure className="cashflow-sketch diagram-box" dir="ltr"><svg viewBox={`0 0 ${width} 285`} style={{minWidth:width}} role="img" aria-label={ar?'مخطط التدفق النقدي؛ الإيصالات لأعلى والمدفوعات لأسفل':'Cash-flow timeline; receipts upward, disbursements downward'}>
  <defs><marker id={id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10Z" fill="context-stroke"/></marker></defs>
  <path d={`M40 140H${width-40}`} stroke="#6b7b73" strokeWidth="2"/>
  {ticks.map(year=><g key={year}><path d={`M${x(year)} 135v10`} stroke="#6b7b73"/><text x={x(year)} y="162" textAnchor="middle" fontSize="12">{year}</text></g>)}
  {data.flows.map((f,index)=>{const height=f.amount===0?0:24+Math.abs(f.amount)/max*65,y=140-(f.amount>=0?height:-height);return <g key={index}><path d={`M${x(f.year)} 140V${y}`} stroke={f.amount>=0?'#497553':'#a55933'} strokeWidth="2.5" markerEnd={`url(#${id})`}/><text x={x(f.year)} y={f.amount>=0?y-12:y+18} textAnchor="middle" fontSize={data.flows.length>10?'10':'12'}>{f.amount>0?'+':''}{Number(f.amount.toFixed(2)).toLocaleString('en-US')}</text></g>})}
  <text x={width/2} y="268" textAnchor="middle" fontSize="13">t = {data.timeUnit==='month'?'month':'year'} · {ar?'التدفقات بوحدة':'cash flows in'} {data.unit}</text>
 </svg><figcaption dir={ar?'rtl':'ltr'}>{text(data.note,lang)}</figcaption></figure>;
}

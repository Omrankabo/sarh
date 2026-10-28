import type {Lang,SoilProfile} from '@/lib/types';
import {text} from '@/lib/types';
import {verticalStress} from '@/lib/soil';

export default function SoilSketch({data,lang}:{data:SoilProfile;lang:Lang}){
 const ar=lang==='ar',above=data.waterAbove||0,totalDepth=data.layers.reduce((n,l)=>n+l.thickness,0),scale=270/(totalDepth+above),y=(z:number)=>42+(z+above)*scale;
 const boundaries=[0,...data.layers.map((_,i)=>data.layers.slice(0,i+1).reduce((n,l)=>n+l.thickness,0)),data.waterDepth,...data.points.map(p=>p.depth)].filter((z,i,a)=>z<=totalDepth&&a.indexOf(z)===i).sort((a,b)=>a-b);
 const values=boundaries.map(z=>verticalStress(data.layers,z,data.waterDepth,0,above));
 const max=Math.max(30,...values.map(v=>v.total)),x=(v:number)=>360+v/max*200,waterY=above?42:y(data.waterDepth);
 let depth=0;
 return <figure className="soil-sketch" dir="ltr"><svg viewBox="0 0 660 390" role="img" aria-label={ar?'قطاع التربة ومنحنيات الإجهاد مع العمق؛ الوحدات متر وكيلوباسكال':'Soil profile and stress versus depth; units metres and kPa'}>
 <text x="48" y="20">{ar?'قطاع التربة':'Soil profile'} · m</text><text x="360" y="20">σ, u, σ′ (kPa) →</text>
 {above>0&&<><rect x="48" y="42" width="250" height={above*scale} fill="#dcecf9"/><text x="64" y={42+above*scale/2}>H₂O · {above} m</text></>}
 {data.layers.map((l,i)=>{const top=depth;depth+=l.thickness;return <g key={i}><rect x="48" y={y(top)} width="250" height={l.thickness*scale} fill={i%2?'#e8dcca':'#eee7d6'} stroke="#adb3a3"/><text x="58" y={y(top)+Math.min(22,l.thickness*scale/2+4)} fontSize="12">{text(l.name,lang)} · {l.thickness} m</text>{l.thickness*scale>=46&&<text x="58" y={y(top)+39} fontSize="11">γ = {l.unitWeight.toFixed(2)} kN/m³</text>}</g>})}
 <path d={`M35 ${waterY}H310`} stroke="#0066aa" strokeDasharray="5 4"/><text x="306" y={waterY+12} fontSize="11">WT</text>
 <path d={`M360 42V${y(totalDepth)}H575`} fill="none" stroke="#68746a"/>
 {boundaries.map((z,i)=><g key={z}><line x1="350" x2="570" y1={y(z)} y2={y(z)} stroke="#65716a" opacity=".12"/><text x="343" y={y(z)+4} textAnchor="end" fontSize="11">{z.toFixed(2)}</text></g>)}
 {(['total','pore','effective'] as const).map((key,i)=><polyline key={key} points={values.map((v,j)=>`${x(v[key])},${y(boundaries[j])}`).join(' ')} fill="none" stroke={['#263c35','#0066aa','#aa4c25'][i]} strokeWidth="2.4" strokeDasharray={key==='pore'?'5 4':undefined}/>)}
 {data.points.map(p=><g key={p.name}><circle cx="285" cy={y(p.depth)} r="4" fill="#263c35"/><text x="265" y={y(p.depth)-8} textAnchor="end" fontSize="12">{p.name}</text></g>)}
 <text x="48" y="344" fill="#263c35">━ σ {ar?'الكلي':'total'}</text><text x="245" y="344" fill="#0066aa">┄ u {ar?'الماء':'water'}</text><text x="435" y="344" fill="#aa4c25">━ σ′ {ar?'الفعّال':'effective'}</text><text x="48" y="373" fontSize="11">{ar?'الرسم من المعطيات المكتوبة؛ الإجهاد موجب ضغطًا.':'Drawn from stated inputs; compression positive. Depth z starts at soil surface.'}</text>
 </svg><figcaption dir={ar?'rtl':'ltr'}>{text(data.note,lang)}</figcaption></figure>;
}

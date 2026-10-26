'use client';
import {useEffect,useState} from 'react';
import type {Lang} from '@/lib/types';

const poems=[
 {lines:['عَلَى قَدْرِ أَهْلِ العَزْمِ تَأْتِي العَزَائِمُ','وَتَأْتِي عَلَى قَدْرِ الكِرَامِ المَكَارِمُ'],poet:'أبو الطيب المتنبي',en:'Great resolve calls forth great deeds.'},
 {lines:['وَمَنْ يَتَهَيَّبْ صُعُودَ الجِبَالِ','يَعِشْ أَبَدَ الدَّهْرِ بَيْنَ الحُفَرْ'],poet:'أبو القاسم الشابي',en:'Those who fear the climb remain below. A small step today is still a climb.'},
 {lines:['إِذَا غَامَرْتَ فِي شَرَفٍ مَرُومِ','فَلَا تَقْنَعْ بِمَا دُونَ النُّجُومِ'],poet:'أبو الطيب المتنبي',en:'When you pursue a noble ambition, aim high.'},
 {lines:['بِقَدْرِ الكَدِّ تُكْتَسَبُ المَعَالِي','وَمَنْ طَلَبَ العُلَا سَهِرَ اللَّيَالِي'],poet:'منسوب إلى الإمام الشافعي',en:'Achievement asks for effort and patient work. Attributed to al-Shafi‘i.'},
 {lines:['لَوْلَا المَشَقَّةُ سَادَ النَّاسُ كُلُّهُمُ','الجُودُ يُفْقِرُ وَالإِقْدَامُ قَتَّالُ'],poet:'أبو الطيب المتنبي',en:'Distinction carries a cost; worthwhile pursuits ask something of us.'},
];
let visitPoem:number|undefined;
export default function Poetry({lang}:{lang:Lang}){
 const [chosen,setChosen]=useState<number|null>(null);
 useEffect(()=>{if(visitPoem===undefined){let last=-1;try{last=Number(localStorage.getItem('sarh-poem-last')??-1)}catch{}const options=poems.map((_,i)=>i).filter(i=>i!==last);visitPoem=options[Math.floor(Math.random()*options.length)];try{localStorage.setItem('sarh-poem-last',String(visitPoem))}catch{}}setChosen(visitPoem)},[]);
 const poem=chosen===null?null:poems[chosen];
 return <aside className="poetry-panel dashboard-panel" aria-label={lang==='ar'?'وقفة شعرية':'A moment of poetry'}><div className="poetry-mark" aria-hidden="true">❧</div><div>{poem?<><blockquote lang="ar" dir="rtl">{poem.lines.map(line=><span key={line}>{line}</span>)}</blockquote><p className="poetry-author" lang="ar" dir="rtl">{poem.poet}</p>{lang==='en'&&<p className="poetry-meaning">{poem.en}</p>}</>:<p>{lang==='ar'?'خطوة صغيرة، وفهم أعمق.':'A small step. A deeper understanding.'}</p>}</div></aside>;
}

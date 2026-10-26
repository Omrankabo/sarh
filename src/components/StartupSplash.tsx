'use client';
import {useEffect,useState} from 'react';
import LoadingArtwork from './LoadingArtwork';

export default function StartupSplash(){
 const [visible,setVisible]=useState(false),[playing,setPlaying]=useState(false),[label,setLabel]=useState('جارٍ التحميل');
 useEffect(()=>{
  let live=true,timer:ReturnType<typeof setTimeout>|undefined;
  try{if(sessionStorage.getItem('sarh-splash-v1'))return;}catch{}
  setLabel(location.pathname.startsWith('/en')?'Building understanding…':'نبني الفهم خطوة بخطوة…');setVisible(true);
  const image=new Image();image.src='/sarh-hero.png';
  const play=()=>{if(!live)return;setPlaying(true);timer=setTimeout(()=>{try{sessionStorage.setItem('sarh-splash-v1','seen')}catch{}setVisible(false);window.dispatchEvent(new Event('sarh:intro-complete'))},3200)};
  image.decode().then(play,play);
  return()=>{live=false;if(timer)clearTimeout(timer)};
 },[]);
 useEffect(()=>{if(!visible)return;const before=document.body.style.overflow;document.body.style.overflow='hidden';return()=>{document.body.style.overflow=before}},[visible]);
 return visible?<LoadingArtwork label={label} animate={playing}/>:null;
}

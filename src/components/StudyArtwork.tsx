import Image from 'next/image';
import artwork from '../../content/published/artwork.json';
import {text} from '@/lib/types';
import type {Lang,T} from '@/lib/types';

type Asset={src:string;thumbnail:string;width:number;height:number;alt:T};
const catalog=artwork as {courses:Record<string,Asset>;topics:Record<string,Asset>};

/** Introductory artwork stays separate from the dimensioned calculation SVGs. */
export default function StudyArtwork({id,kind='topic',lang,variant='intro'}:{id:string;kind?:'topic'|'course';lang:Lang;variant?:'card'|'intro'|'banner'}){
 const asset=(kind==='course'?catalog.courses:catalog.topics)[id];
 if(!asset)return null;
 const compact=variant==='card';
 const picture=<Image unoptimized src={compact?asset.thumbnail:asset.src} width={asset.width} height={asset.height} alt={compact?'':text(asset.alt,lang)} loading="lazy" decoding="async" className="study-art-image"/>;
 if(compact)return <div className="study-art study-art-card" aria-hidden="true">{picture}</div>;
 return <figure className={`study-art study-art-${variant}`} data-artwork={id}>{picture}{variant==='intro'&&<figcaption>{lang==='ar'?'رسم تمهيدي للفكرة؛ الرسوم المُعنونة في خطوات التطبيق توضّح النموذج الحسابي.':'An introduction to the idea. The labeled diagrams in the guided steps define the calculation model.'}</figcaption>}</figure>;
}

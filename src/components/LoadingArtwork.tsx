import ColorSplash from './ColorSplash';
export default function LoadingArtwork({label='جارٍ التحميل',animate=true,progress=0}:{label?:string;animate?:boolean;progress?:number}){
 return <div className={'loading-screen recall-entrance '+(animate?'entrance-reveal':'')} aria-label={label}>
  <ColorSplash/>
  <div className="entrance-image"><img src="/sarh-hero.png" alt=""/></div>
  <div className="entrance-progress" role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}><strong dir="ltr">{progress}<small>%</small></strong><span>{label}</span></div>
 </div>;
}

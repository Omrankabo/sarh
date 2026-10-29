import ColorSplash from './ColorSplash';
export default function LoadingArtwork({label='جارٍ التحميل',animate=true,progress=0,onSkip}:{label?:string;animate?:boolean;progress?:number;onSkip?:()=>void}){
 return <div className={'loading-screen recall-entrance '+(animate?'entrance-reveal':'')} aria-label={label}>
  <ColorSplash/>
  {onSkip&&<button className="splash-skip" onClick={onSkip}>Skip · تخطّ</button>}
  <div className="entrance-image"><img src="/sarh-hero.webp" alt=""/></div>
  <div className="entrance-progress" role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}><strong dir="ltr">{progress}<small>%</small></strong><span>{label}</span></div>
 </div>;
}

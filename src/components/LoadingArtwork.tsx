export default function LoadingArtwork({label='جارٍ التحميل',animate=true}:{label?:string;animate?:boolean}) {
 return <div className="loading-screen" role="status" aria-live="polite">
  <div className={'loading-art '+(animate?'splash-playing':'splash-waiting')} aria-hidden="true">
   <img src="/sarh-hero.png" alt="" className="loading-pencil"/>
   <img src="/sarh-hero.png" alt="" className="loading-color"/>
  </div>
  <span className="loading-label">{label}<i/><i/><i/></span>
 </div>;
}

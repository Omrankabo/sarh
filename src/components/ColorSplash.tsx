/** Shared color field. The building illustration is deliberately a separate layer. */
export default function ColorSplash({settled=false}:{settled?:boolean}){
 return <div className={`edge-colors${settled?' edge-colors-settled':''}`} aria-hidden="true"><i/><i/><i/><i/></div>;
}

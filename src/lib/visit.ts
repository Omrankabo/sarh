/** Language and topic sub-tabs never create an entrance. A document is a visit. */
export const mainArea=(path:string)=>{const area=path.replace(/^\/(ar|en)(?=\/|$)/,'').split('/').filter(Boolean)[0]||'home';return area==='topics'?'subjects':area;};
const seen=new Set<string>();
let initialized=false;
export function claimEntrance(path:string){if(!initialized){initialized=true;try{sessionStorage.setItem('sarh-visit-v2',JSON.stringify({startedAt:Date.now(),areas:[]}))}catch{}}
 const area=mainArea(path);if(seen.has(area))return false;seen.add(area);try{sessionStorage.setItem('sarh-visit-v2',JSON.stringify({areas:[...seen]}))}catch{}return true;
}

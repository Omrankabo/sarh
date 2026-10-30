'use client';
import {createContext,useContext,useEffect,useLayoutEffect,useState,type ReactNode} from 'react';
import {applyAppearance,appearanceKey,browserAppearanceStorage,defaultAppearance,readAppearance,saveAppearance,validateAppearance,type Appearance} from '@/lib/appearance';
const Context=createContext<{appearance:Appearance;change:(patch:Partial<Appearance>)=>void;saved:boolean}|null>(null);
export function AppearanceProvider({children}:{children:ReactNode}){
 const [appearance,setAppearance]=useState(defaultAppearance),[saved,setSaved]=useState(true);
 useLayoutEffect(()=>{const value=readAppearance(browserAppearanceStorage);setAppearance(value);applyAppearance(document.documentElement,value)},[]);
 useEffect(()=>{const receive=(event:StorageEvent)=>{if(event.key===appearanceKey||event.key===null){const value=readAppearance(browserAppearanceStorage);setAppearance(value);applyAppearance(document.documentElement,value)}};window.addEventListener('storage',receive);return()=>window.removeEventListener('storage',receive)},[]);
 function change(patch:Partial<Appearance>){const next=validateAppearance({...appearance,...patch});setAppearance(next);applyAppearance(document.documentElement,next);setSaved(saveAppearance(browserAppearanceStorage,next))}
 return <Context.Provider value={{appearance,change,saved}}>{children}</Context.Provider>;
}
export function useAppearance(){const value=useContext(Context);if(!value)throw Error('Appearance provider missing');return value}
export default function AppearanceControls({ar}:{ar:boolean}){
 const {appearance,change,saved}=useAppearance(),say=(en:string,arabic:string)=>ar?arabic:en;
 return <section className="appearance-settings" aria-labelledby="appearance-title"><h3 id="appearance-title">{say('Appearance','المظهر')}</h3>
 <fieldset><legend>{say('Theme','الألوان')}</legend><div className="setting-options">{(['mint','burgundy'] as const).map(theme=><button key={theme} aria-pressed={appearance.theme===theme} onClick={()=>change({theme})}><span aria-hidden="true" className={'theme-swatch '+theme}/>{theme==='mint'?say('Mint','نعناع'):say('Burgundy','عنابي')}</button>)}</div></fieldset>
 <fieldset><legend>{say('Surface','السطح')}</legend><div className="setting-options">{(['solid','glass'] as const).map(finish=><button key={finish} aria-pressed={appearance.finish===finish} onClick={()=>change({finish})}>{finish==='solid'?say('Solid','سادة'):say('Glass','زجاجي')}</button>)}</div></fieldset>
 <fieldset><legend>{say('Typography','الخطوط')}</legend><div className="setting-options"><button aria-pressed={appearance.typography==='default'} onClick={()=>change({typography:'default'})}>{say('Default · IBM Plex','الافتراضي · IBM Plex')}</button><button aria-pressed={appearance.typography==='proxima-sailors'} disabled title={say('Available after licensed webfonts are supplied','يتاح بعد توفير خطوط الويب المرخّصة')}>Proxima Nova + Sailors</button></div><p className="small muted">{say('Custom fonts await licensed webfont kits. Bundled fonts remain available offline.','الخطوط المخصصة تنتظر ملفات ويب مرخّصة. الخطوط الافتراضية متاحة دون إنترنت.')}</p></fieldset>
 <div className="appearance-sample"><span className="eyebrow">{say('LIVE PREVIEW','معاينة مباشرة')}</span><h4>{say('One idea. One useful step.','فكرة واحدة. خطوة مفيدة.')}</h4><p>{say('Predict the movement, then use the equation to explain it.','توقّع الحركة، ثم استخدم المعادلة لتفسيرها.')}</p><span className="pill selected">{say('Current step','الخطوة الحالية')}</span><span className="feedback success">✓ {say('Understood','فهمت الفكرة')}</span></div>
 {!saved&&<p role="status">{say('Applied for now. This browser could not save the preference.','تم التطبيق الآن، لكن تعذّر حفظ الاختيار في المتصفح.')}</p>}</section>;
}

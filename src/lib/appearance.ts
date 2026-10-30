/** Appearance belongs to this browser, never to a learner's notebook. */
export type Appearance = {theme:'mint'|'burgundy';finish:'solid'|'glass';typography:'default'|'proxima-sailors'};
export const defaultAppearance:Appearance={theme:'mint',finish:'solid',typography:'default'};
export const appearanceKey='sarh-appearance-v1';
type StorageAdapter=Pick<Storage,'getItem'|'setItem'>;
export const browserAppearanceStorage:StorageAdapter={getItem:key=>window.localStorage.getItem(key),setItem:(key,value)=>window.localStorage.setItem(key,value)};
export function validateAppearance(value:unknown):Appearance{
 const v=value&&typeof value==='object'?value as Record<string,unknown>:{};
 return {theme:v.theme==='burgundy'?'burgundy':'mint',finish:v.finish==='glass'?'glass':'solid',typography:v.typography==='proxima-sailors'?'proxima-sailors':'default'};
}
export function readAppearance(storage:StorageAdapter):Appearance{
 try{const saved=storage.getItem(appearanceKey);if(saved){try{return validateAppearance(JSON.parse(saved))}catch{/* Recover explicit legacy preferences below. */}}
 return validateAppearance({theme:storage.getItem('sarh-theme-v1'),finish:storage.getItem('sarh-finish-v1'),typography:storage.getItem('sarh-typography-v1')});
 }catch{return {...defaultAppearance}}
}
export function saveAppearance(storage:StorageAdapter,value:Appearance){try{storage.setItem(appearanceKey,JSON.stringify(validateAppearance(value)));return true}catch{return false}}
export function applyAppearance(target:Pick<HTMLElement,'dataset'>,value:Appearance){Object.assign(target.dataset,validateAppearance(value))}
/** Standalone startup code: never stringify bundled functions, whose names can be minified. */
export const appearanceBootstrap=`(()=>{let value={},parsed=false;try{const stored=localStorage.getItem(${JSON.stringify(appearanceKey)});if(stored){try{value=JSON.parse(stored);parsed=true}catch{}}if(!parsed){value={theme:localStorage.getItem('sarh-theme-v1'),finish:localStorage.getItem('sarh-finish-v1'),typography:localStorage.getItem('sarh-typography-v1')}}}catch{}value=value&&typeof value==='object'?value:{};Object.assign(document.documentElement.dataset,{theme:value.theme==='burgundy'?'burgundy':'mint',finish:value.finish==='glass'?'glass':'solid',typography:value.typography==='proxima-sailors'?'proxima-sailors':'default'});})()`;

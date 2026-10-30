import {test} from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {appearanceBootstrap,appearanceKey,defaultAppearance,readAppearance,saveAppearance,validateAppearance} from '../src/lib/appearance';
function storage(initial:Record<string,string>={}){const records={...initial};return {getItem:(key:string)=>records[key]??null,setItem:(key:string,value:string)=>{records[key]=value},records}}
test('unset appearance is solid mint without writing defaults',()=>{const s=storage();assert.deepEqual(readAppearance(s),defaultAppearance);assert.deepEqual(s.records,{})});
test('legacy explicit appearance survives migration and reading does not touch notebooks',()=>{const s=storage({'sarh-theme-v1':'burgundy','sarh-finish-v1':'glass','sarh-notebook':'private'});assert.deepEqual(readAppearance(s),{...defaultAppearance,theme:'burgundy',finish:'glass'});saveAppearance(s,readAppearance(s));assert.equal(s.records['sarh-notebook'],'private');assert.ok(s.records[appearanceKey])});
test('invalid values and blocked storage recover safely',()=>{assert.deepEqual(validateAppearance({theme:'red',finish:'blur',typography:'comic'}),defaultAppearance);assert.deepEqual(readAppearance(storage({[appearanceKey]:'broken','sarh-theme-v1':'burgundy'})),{...defaultAppearance,theme:'burgundy'});const blocked={getItem(){throw Error('blocked')},setItem(){throw Error('blocked')}};assert.deepEqual(readAppearance(blocked),defaultAppearance);assert.equal(saveAppearance(blocked,defaultAppearance),false)});
test('startup bootstrap applies the same saved preferences without writing',()=>{const s=storage({[appearanceKey]:JSON.stringify({theme:'burgundy',finish:'solid',typography:'default'})}),document={documentElement:{dataset:{}}};vm.runInNewContext(appearanceBootstrap,{localStorage:s,document});assert.equal((document.documentElement.dataset as any).theme,'burgundy');assert.equal((document.documentElement.dataset as any).finish,'solid');assert.equal(Object.keys(s.records).length,1)});

test('bootstrap and repository reader agree on every legacy/new/invalid combination',()=>{
 const fixtures:Record<string,string>[]=[{},{'sarh-theme-v1':'burgundy','sarh-finish-v1':'glass'},{[appearanceKey]:'bad','sarh-theme-v1':'burgundy'},{[appearanceKey]:'null','sarh-theme-v1':'burgundy'},...[null,{},[],{theme:'burgundy',finish:'glass',typography:'proxima-sailors'},{theme:'unknown',finish:'transparent'}].map(v=>({[appearanceKey]:JSON.stringify(v)}))];
 for(const record of fixtures){
  const s=storage(record),document={documentElement:{dataset:{}}};vm.runInNewContext(appearanceBootstrap,{localStorage:s,document});assert.deepEqual(JSON.parse(JSON.stringify(document.documentElement.dataset)),readAppearance(s));
 }
 const document={documentElement:{dataset:{}}},context={document};Object.defineProperty(context,'localStorage',{get(){throw Error('storage unavailable')}});vm.runInNewContext(appearanceBootstrap,context);assert.deepEqual(JSON.parse(JSON.stringify(document.documentElement.dataset)),defaultAppearance);
});

test('theme text, selection and semantic feedback meet normal-text contrast',async()=>{
 const {readFileSync}=await import('node:fs');const css=readFileSync('src/app/tokens.css','utf8');
 const declarations=(block:string)=>Object.fromEntries([...block.matchAll(/--([\w-]+):\s*(#[\da-f]+)/gi)].map(m=>[m[1],m[2]]));
 const base=declarations(css.match(/:root\{([^}]+)/)![1]);
 const burgundy={...base,...declarations(css.match(/html\[data-theme=burgundy\]\{([^}]+)/)![1])};
 const light=(hex:string)=>{const rgb=hex.slice(1).length===3?hex.slice(1).split('').map(c=>c+c).join(''):hex.slice(1);return [0,1,2].map(i=>parseInt(rgb.slice(i*2,i*2+2),16)/255).map(c=>c<=.04045?c/12.92:((c+.055)/1.055)**2.4).reduce((v,c,i)=>v+c*[.2126,.7152,.0722][i],0)};
 for(const theme of [base,burgundy])for(const [fg,bg] of [['ink','background'],['muted','background'],['primary','surface'],['selection-ink','selection-bg'],['success-ink','success-bg'],['error-ink','error-bg'],['attention-ink','attention-bg']]){const a=light(theme[fg]),b=light(theme[bg]);assert((Math.max(a,b)+.05)/(Math.min(a,b)+.05)>=4.5,fg+' / '+bg)}
});

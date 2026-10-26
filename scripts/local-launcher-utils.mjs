import fs from 'node:fs';
import path from 'node:path';

export function isProjectServer(command, nextPath) {
 const tokens=Array.from(command.matchAll(/"([^"]+)"|'([^']+)'|(\S+)/g),m=>m[1]||m[2]||m[3]);
 const normalized=value=>path.win32.normalize(value).replaceAll('\\','/').toLowerCase();
 const index=tokens.findIndex(token=>normalized(token)===normalized(nextPath));
 return index>=0&&['start','dev'].includes(tokens[index+1]);
}
export function publishedAssets(html) {
 const attributes=tag=>Object.fromEntries(Array.from(tag.matchAll(/([\w-]+)=["']([^"']*)["']/g),m=>[m[1].toLowerCase(),m[2].replaceAll('&amp;','&')]));
 const styles=Array.from(html.matchAll(/<link\b[^>]*>/gi),m=>attributes(m[0])).filter(a=>a.rel==='stylesheet'&&a.href).map(a=>({url:a.href,type:'style'}));
 const scripts=Array.from(html.matchAll(/<script\b[^>]*>/gi),m=>attributes(m[0])).filter(a=>a.src).map(a=>({url:a.src,type:'script'}));
 return [...new Map([...styles,...scripts].map(a=>[a.url,a])).values()];
}
export async function verifyPageAssets(html, origin, request=fetch) {
 const assets=publishedAssets(html);
 if(!assets.some(a=>a.type==='style')||!assets.some(a=>a.type==='script'))throw Error('The page is missing its style or script links.');
 for(const asset of assets){
  const url=new URL(asset.url,origin);
  if(url.origin!==origin)throw Error('Unexpected external app asset.');
  const response=await request(url,{cache:'no-store',signal:AbortSignal.timeout(5000)});
  const type=response.headers.get('content-type')||'';
  const correct=asset.type==='style'?/text\/css/i.test(type):/(?:java|ecma)script/i.test(type);
  if(!response.ok||!correct)throw Error(`The ${asset.type} file is unavailable: ${url.pathname} (${response.status}, ${type}).`);
  const body=await response.text();
  if(!body.trim()||/^\s*(?:<!doctype|<html)/i.test(body))throw Error(`The ${asset.type} file returned a page instead of an asset: ${url.pathname}.`);
 }
 return assets.length;
}
export function completeBuild(root) {
 try{
  if(!fs.readFileSync(path.join(root,'.next/BUILD_ID'),'utf8').trim())return false;
  const assets=JSON.parse(fs.readFileSync(path.join(root,'public/offline-assets.json'),'utf8'));
  return Array.isArray(assets)&&assets.some(a=>typeof a==='string'&&a.endsWith('.css'))&&assets.some(a=>typeof a==='string'&&a.endsWith('.js'))&&assets.every(asset=>{
   if(typeof asset!=='string'||!asset.startsWith('/_next/static/'))return false;
   const file=path.resolve(root,'.next',asset.slice('/_next/'.length));
   const relative=path.relative(path.join(root,'.next/static'),file);
   return relative!==''&&!relative.startsWith('..')&&!path.isAbsolute(relative)&&fs.existsSync(file)&&fs.statSync(file).size>0;
  });
 }catch{return false;}
}

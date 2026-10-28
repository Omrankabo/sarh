import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {completeBuild,isProjectServer,publishedAssets,verifyPageAssets} from '../scripts/local-launcher-utils.mjs';

test('launcher only restarts the exact project Next server, including Windows paths with spaces',()=>{
 const next='C:\\Study Folder\\sarh\\node_modules\\next\\dist\\bin\\next';
 assert(isProjectServer(`"C:\\Program Files\\nodejs\\node.exe" "${next}" start --hostname 127.0.0.1`,next));
 assert(isProjectServer(`node "C:/Study Folder/sarh/node_modules/.bin/../next/dist/bin/next" dev`,next));
 assert(!isProjectServer('node "C:/Other/sarh/node_modules/next/dist/bin/next" start',next));
 assert(!isProjectServer(`node "${next}" build`,next));
 assert(!isProjectServer(`node "${next}-other" start`,next));
});
const html='<link href="/_next/static/a.css" rel="stylesheet"><link rel="preload" href="/font.ttf"><script src="/_next/static/a.js" async></script>';
test('launcher rejects an HTML fallback masquerading as a stylesheet or script',async()=>{
 assert.equal(publishedAssets(html).length,2);
 const good:typeof fetch=async(input)=>{const url=new URL(typeof input==='string'?input:input instanceof URL?input.href:input.url);return new Response(url.pathname.endsWith('.css')?'body{color:green}':'console.log(1)',{headers:{'Content-Type':url.pathname.endsWith('.css')?'text/css; charset=utf-8':'application/javascript'}});};
 assert.equal(await verifyPageAssets(html,'http://127.0.0.1:3000',good),2);
 await assert.rejects(verifyPageAssets(html,'http://127.0.0.1:3000',async()=>new Response('<!DOCTYPE html><html></html>',{headers:{'Content-Type':'text/html'}})),/style file is unavailable/);
 await assert.rejects(verifyPageAssets(html,'http://127.0.0.1:3000',async()=>new Response('<html></html>',{headers:{'Content-Type':'text/css'}})),/returned a page/);
 await assert.rejects(verifyPageAssets(html,'http://127.0.0.1:3000',async()=>new Response('missing',{status:404})),/style file is unavailable/);
});
test('launcher detects incomplete assets even when the build timestamp looks current',()=>{
 const parent=os.tmpdir(),root=fs.mkdtempSync(path.join(parent,'sarh-launcher-'));
 try{
  fs.mkdirSync(path.join(root,'.next/static/chunks'),{recursive:true});fs.mkdirSync(path.join(root,'public'));
  fs.writeFileSync(path.join(root,'.next/BUILD_ID'),'current');
  fs.writeFileSync(path.join(root,'public/offline-assets.json'),JSON.stringify(['/_next/static/chunks/a.css','/_next/static/chunks/a.js']));
  assert(!completeBuild(root));
  fs.writeFileSync(path.join(root,'.next/static/chunks/a.css'),'body{}');fs.writeFileSync(path.join(root,'.next/static/chunks/a.js'),'void 0');assert(completeBuild(root));
  const art='/illustrations/v1/topics/slope-beams-card.webp';
  const code=['/_next/static/chunks/a.css','/_next/static/chunks/a.js'];
  fs.writeFileSync(path.join(root,'public/offline-assets.json'),JSON.stringify([...code,art]));assert(!completeBuild(root));
  fs.mkdirSync(path.join(root,'public/illustrations/v1/topics'),{recursive:true});fs.writeFileSync(path.join(root,'public'+art),'webp');assert(completeBuild(root));
  for(const forbidden of ['/materials/source.pdf','/illustrations/v1/topics/../../secret.webp','/illustrations/v1/topics/test.png']){fs.writeFileSync(path.join(root,'public/offline-assets.json'),JSON.stringify([...code,forbidden]));assert(!completeBuild(root));}
  fs.writeFileSync(path.join(root,'public/offline-assets.json'),JSON.stringify([...code,art]));
  fs.writeFileSync(path.join(root,'.next/static/chunks/a.css'),'');assert(!completeBuild(root));
 }finally{assert.equal(path.dirname(root),parent);assert(path.basename(root).startsWith('sarh-launcher-'));fs.rmSync(root,{recursive:true,force:true});}
});

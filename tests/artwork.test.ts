import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import vm from 'node:vm';
import sharp from 'sharp';
import {subjects} from '../src/lib/subjects';
const catalog=JSON.parse(fs.readFileSync('content/published/artwork.json','utf8'));
const topics=JSON.parse(fs.readFileSync('content/published/topics.json','utf8'));
const assets=[...Object.values(catalog.courses),...Object.values(catalog.topics)] as {src:string;thumbnail:string;width:number;height:number;alt:{en:string;ar:string};sha256:string}[];

test('every published course and topic has its own bilingual illustration',()=>{
 assert.deepEqual(Object.keys(catalog.courses).sort(),subjects.map(s=>s.id).sort());
 assert.deepEqual(Object.keys(catalog.topics).sort(),topics.map((t:{id:string})=>t.id).sort());
 assert.equal(new Set(assets.map(a=>a.sha256)).size,assets.length,'Do not reuse a generic picture for distinct topics.');
 for(const asset of assets){assert(asset.alt.en.trim().length>15);assert(/[\u0600-\u06ff]/.test(asset.alt.ar));}
});
test('all local originals and card versions decode, retain aspect ratio and stay within the image budget',async()=>{
 let total=0;
 for(const asset of assets){
  for(const key of ['src','thumbnail'] as const){
   assert.match(asset[key],/^\/illustrations\/v1\/(courses|topics)\/[a-z0-9-]+(?:-card)?\.webp$/);
   const file='public'+asset[key],bytes=fs.readFileSync(file),meta=await sharp(bytes).metadata();
   assert.equal(meta.format,'webp');assert(Math.abs(meta.width!/meta.height!-asset.width/asset.height)<.01);
   if(key==='src'){assert.equal(meta.width,asset.width);assert.equal(meta.height,asset.height);assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),asset.sha256);}
   assert(bytes.length<(key==='src'?600000:160000),file+' exceeds image budget');total+=bytes.length;
  }
 }
 assert(total<12*1024*1024,'Illustrations should remain a practical offline download.');
});
test('offline cache accepts real WebP illustrations and rejects page fallbacks and missing files',()=>{
 const context={URL,Response,self:{location:{origin:'https://sarh.test'},addEventListener(){}}};
 vm.createContext(context);vm.runInContext(fs.readFileSync('public/sw.js','utf8'),context);
 const valid=(mime:string,status=200)=>vm.runInContext(`validAsset('/illustrations/v1/topics/slope-beams.webp',new Response('body',{status:${status},headers:{'Content-Type':${JSON.stringify(mime)}}}))`,context);
 assert.equal(valid('image/webp'),true);assert.equal(valid('text/html'),false);assert.equal(valid('image/webp',404),false);
});

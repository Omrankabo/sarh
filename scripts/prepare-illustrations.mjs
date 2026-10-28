import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import sharp from 'sharp';

// Re-encode selected generated masters for local, offline-friendly delivery.
// No cropping, compositing, retouching or changes to the illustration itself.
const input=process.argv[2];
if(!input)throw new Error('Pass a local generation record JSON file.');
const records=JSON.parse(fs.readFileSync(input,'utf8'));
const selected=[...new Map(records.map(r=>[r.kind+':'+r.id,r])).values()];
const catalog={version:1,courses:{},topics:{}};
const prompts=[];
const masterRoot=path.resolve('../study-work/artwork-masters-v1');
fs.mkdirSync(masterRoot,{recursive:true});
for(const r of selected){
 if(!/^[a-z0-9-]+$/.test(r.id)||!['course','topic'].includes(r.kind))throw new Error('Invalid asset identifier.');
 const match=r.hint.match(/ as ([A-Z]:\\[^\r\n]+\.png) by default/);
 if(!match)throw new Error('Missing generated master path for '+r.id);
 const original=match[1],folder=r.kind==='course'?'courses':'topics';
 const base=`/illustrations/v1/${folder}/${r.id}`;
 fs.mkdirSync('public'+path.posix.dirname(base),{recursive:true});
 const master=path.join(masterRoot,r.kind+'-'+r.id+'-'+path.basename(original));
 if(!fs.existsSync(master))fs.copyFileSync(original,master);
 await sharp(original).resize({width:1200,withoutEnlargement:true}).webp({quality:83,effort:5}).toFile('public'+base+'.webp');
 await sharp(original).resize({width:600,withoutEnlargement:true}).webp({quality:78,effort:5}).toFile('public'+base+'-card.webp');
 const meta=await sharp('public'+base+'.webp').metadata();
 const bytes=fs.statSync('public'+base+'.webp').size,thumbnailBytes=fs.statSync('public'+base+'-card.webp').size;
 const asset={src:base+'.webp',thumbnail:base+'-card.webp',width:meta.width,height:meta.height,alt:r.alt??{en:'Concept illustration: '+r.en,ar:'رسم تمهيدي: '+r.ar},bytes,thumbnailBytes,sha256:crypto.createHash('sha256').update(fs.readFileSync('public'+base+'.webp')).digest('hex')};
 catalog[folder][r.id]=asset;
 prompts.push({id:r.id,kind:r.kind,asset:asset.src,mode:'built-in image_gen',useCase:'illustration-story',prompt:r.prompt});
}
fs.writeFileSync('content/published/artwork.json',JSON.stringify(catalog,null,2)+'\n');
fs.writeFileSync('docs/illustration-prompts.json',JSON.stringify(prompts,null,2)+'\n');
const assets=Object.values(catalog.courses).concat(Object.values(catalog.topics));
console.log(JSON.stringify({courses:Object.keys(catalog.courses).length,topics:Object.keys(catalog.topics).length,webpFiles:assets.length*2,totalMiB:+(assets.reduce((n,a)=>n+a.bytes+a.thumbnailBytes,0)/1024/1024).toFixed(2),masters:masterRoot}));

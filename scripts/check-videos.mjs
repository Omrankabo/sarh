import fs from 'node:fs';
const videos=JSON.parse(fs.readFileSync('content/published/videos.json','utf8'));
const results=[];
for(let i=0;i<videos.length;i+=4){await Promise.all(videos.slice(i,i+4).map(async v=>{try{const r=await fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent('https://www.youtube.com/watch?v='+v.id)}&format=json`,{signal:AbortSignal.timeout(12000)});const d=r.ok?await r.json():{};results.push({id:v.id,status:r.status,title:d.title,author:d.author_name,identityMatches:r.ok&&d.author_name.toLowerCase()===v.author.toLowerCase()});}catch(e){results.push({id:v.id,error:e.message,identityMatches:false})}}));}
fs.mkdirSync('reports',{recursive:true});fs.writeFileSync('reports/video-links.json',JSON.stringify({checkedAt:new Date().toISOString(),scope:'Live identity/availability metadata plus publisher descriptions. Not a regional playback guarantee or full narration audit.',results},null,2));
console.log(JSON.stringify(results.map(r=>({id:r.id,ok:r.identityMatches,status:r.status,error:r.error})),null,2));

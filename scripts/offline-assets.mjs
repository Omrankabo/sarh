import fs from 'node:fs';
import path from 'node:path';
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);}
const code=walk('.next/static').filter(f=>/\.(?:js|css|woff2?|ttf)$/.test(f)).map(f=>'/'+f.replaceAll('\\','/').replace(/^\.next\//,'_next/'));
const illustrations=walk('public/illustrations').filter(f=>/\.webp$/.test(f)).map(f=>'/'+f.replaceAll('\\','/').replace(/^public\//,''));
const assets=[...new Set([...code,...illustrations])];
fs.writeFileSync('public/offline-assets.json',JSON.stringify(assets));console.log(`Offline asset manifest: ${assets.length} files.`);

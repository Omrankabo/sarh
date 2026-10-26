import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);}
const manifests=walk('.next/server').filter(f=>f.endsWith('.nft.json'));
for(const file of manifests){const data=JSON.parse(fs.readFileSync(file,'utf8'));for(const name of data.files||[])assert(!/\.pdf$|private-study-archive|audit-renders|review-round2|source-problems\.json|qa-notebook/i.test(name),'Private source referenced by deployment trace: '+name);}
console.log(`PASS: ${manifests.length} server deployment traces exclude private source files.`);

import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);}
const files=['src','content','public','scripts'].flatMap(walk);
const forbidden=files.filter(f=>/\.pdf$|(?:^|[\\/])(?:private-study-archive|audit-renders|review-round2|extracted-text)(?:[\\/])|source-problems\.json$|qa-notebook/i.test(f));
for(const dir of ['reports/audit-renders','reports/review-round2'])if(fs.existsSync(dir))forbidden.push(dir);
assert.equal(forbidden.length,0,'Private source files in app: '+forbidden.join(', '));
assert(!fs.existsSync('content/materials.json'),'Raw source inventory must stay outside the app');
for(const file of walk('src'))assert(!/read\(['"]source-problems|content\/source-problems|reports\/audit-renders|private-study-archive/.test(fs.readFileSync(file,'utf8')),'Runtime uses private data: '+file);
for(const file of ['.gitignore','.vercelignore']){const text=fs.readFileSync(file,'utf8');assert(text.includes('*.pdf')&&text.includes('reports/'),file+' missing exclusions');}
const firebase=JSON.parse(fs.readFileSync('firebase.apphosting.example.json','utf8'));assert(firebase.apphosting[0].ignore.includes('**/*.pdf')&&firebase.apphosting[0].ignore.includes('reports'),'Firebase deployment example missing exclusions');
console.log('PASS: no original PDFs, rendered source pages, raw archive or learner exports in publishable app inputs.');

import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const root='content/published',read=f=>JSON.parse(fs.readFileSync(path.join(root,f),'utf8'));
const manifest=read('topics.json'),topics=manifest.map(m=>read(m.file)),refs=read('references.json'),prereqs=read('prerequisites.json'),videos=read('videos.json'),problems=read('problems.json');
const bilingual=(t,where)=>{assert(t?.en?.trim()&&t?.ar?.trim(),where+' needs both languages');assert(!/TODO|PLACEHOLDER|coming soon/i.test(t.en),where+' unfinished');};
const reference=(r,where)=>{const m=refs.find(m=>m.id===r.doc);assert(m&&r.filename===m.filename&&Number.isInteger(r.page)&&r.page>=1&&r.page<=m.pages,where+' invalid filename/page');};
assert.equal(topics.filter(t=>!t.id.startsWith('ee-')).length,12,'Structures II journeys preserved');
assert.equal(topics.filter(t=>t.id.startsWith('ee-')).length,15,'Engineering Economics journeys complete');
assert.equal(new Set(topics.map(t=>t.id)).size,topics.length);
for(const [i,t] of topics.entries()){
 bilingual(t.title,t.id);bilingual(t.summary,t.id);
 for(const lang of ['ar','en']){const chapter=fs.readFileSync(path.join(root,path.dirname(manifest[i].file),`understand.${lang}.md`),'utf8').replaceAll('\r\n','\n');assert(chapter.length>2500,t.id+' chapter too short');assert(chapter.includes('```text'),t.id+' formulas missing');for(const step of t.steps)assert(chapter.includes(step.explain[lang]),t.id+' missing teaching bridge');}
 assert(t.steps.length>=5&&t.questions.length>=12&&t.cards.length>=12);
 assert.equal(new Set(t.questions.map(q=>q.id)).size,t.questions.length);assert.equal(new Set(t.cards.map(c=>c.id)).size,t.cards.length);
 assert(t.videoIds.length&&t.videoIds.every(id=>videos.some(v=>v.id===id)));
 for(const s of t.steps){for(const k of ['title','predict','observe','explain','symbols','assumptions','example','calculation','interpret'])bilingual(s[k],t.id+'/'+s.id+'/'+k);s.options.forEach(o=>bilingual(o,s.id));assert(s.correct>=0&&s.correct<s.options.length);bilingual(s.check.prompt,s.id);bilingual(s.check.answer,s.id);assert(s.formula.trim());s.sources.forEach(r=>reference(r,s.id));}
 for(const q of t.questions){bilingual(q.prompt,q.id);bilingual(q.solution,q.id);assert(q.hints.length>=2);q.hints.forEach(h=>bilingual(h,q.id));if(q.options){q.options.forEach(o=>bilingual(o,q.id));assert(q.correct>=0&&q.correct<q.options.length)}if(q.expected!==undefined)assert(Number.isFinite(q.expected)&&q.tolerance>=0);assert(q.options||q.expected!==undefined);q.sources.forEach(r=>reference(r,q.id));}
 for(const c of t.cards){bilingual(c.q,c.id);bilingual(c.a,c.id)}
 for(const c of t.concepts){assert(t.steps.some(s=>s.concepts.includes(c.id)),t.id+'/'+c.id+' missing story');assert(t.questions.some(q=>q.concept===c.id),t.id+'/'+c.id+' missing practice');assert(t.cards.some(k=>k.concept===c.id),t.id+'/'+c.id+' missing recall');}
 t.sources.forEach(r=>reference(r,t.id));t.prereqIds.forEach(id=>assert(prereqs.some(p=>p.id===id)));
}
for(const p of prereqs){for(const k of ['title','why','refresher','example','question','answer'])bilingual(p[k],p.id);assert(p.videos.every(v=>v.id.length===11&&v.language));}
for(const v of videos){assert(v.id.length===11&&v.author&&v.language&&v.reviewedAt);bilingual(v.purpose,v.id)}
for(const p of problems){assert.equal(p.status,'verified');assert(topics.some(t=>t.id===p.topic));bilingual(p.title,p.id);bilingual(p.solution,p.id);p.sources.forEach(r=>reference(r,p.id));assert(p.sources.length,'Missing diagram fallback');assert(p.videoIds.every(id=>videos.some(v=>v.id===id)));if(p.sketch){const s=p.sketch;assert(s.nodes.length>=2);assert.equal(new Set(s.nodes.map(n=>n.id)).size,s.nodes.length);s.members.forEach(m=>assert(s.nodes.some(n=>n.id===m.from)&&s.nodes.some(n=>n.id===m.to)));s.loads.forEach(l=>{assert(l.node?s.nodes.some(n=>n.id===l.node):s.members[l.member]);if(l.at!==undefined)assert(l.at>=0&&l.at<=1);if(l.end!==undefined)assert(l.end>=0&&l.end<=1)});}}
for(const p of problems.filter(p=>p.cashflow)){assert(p.cashflow.flows.length);assert(p.cashflow.flows.every(f=>Number.isFinite(f.year)&&Number.isFinite(f.amount)));bilingual(p.cashflow.note,p.id);}
const result={checkedAt:new Date().toISOString(),totals:{journeys:topics.length,bilingualChapters:topics.length,steps:topics.reduce((n,t)=>n+t.steps.length,0),questions:topics.reduce((n,t)=>n+t.questions.length,0),cards:topics.reduce((n,t)=>n+t.cards.length,0),checkedSolutions:problems.length,checkedSketches:problems.filter(p=>p.sketch).length,checkedTimelines:problems.filter(p=>p.cashflow).length,filenamePageFallbacks:problems.filter(p=>!p.sketch&&!p.cashflow).length,videoResources:videos.length},chapterCoverage:true,teachingPracticeRecallCoverage:true,archiveComplete:false};
fs.mkdirSync('reports',{recursive:true});fs.writeFileSync('reports/content-coverage.json',JSON.stringify(result,null,2));console.log(JSON.stringify(result.totals,null,2));console.log('PASS: published content builds independently of the private source archive.');

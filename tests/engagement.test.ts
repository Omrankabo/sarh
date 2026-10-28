import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import TopicChapter from '../src/components/TopicChapter';
import {qualifiesAsIntroduction} from '../src/components/IntroVideo';
import type {Topic,Video} from '../src/lib/types';
const intro=JSON.parse(fs.readFileSync('content/published/introductions.json','utf8'));
const manifest=JSON.parse(fs.readFileSync('content/published/topics.json','utf8'));
function topic(id:string):Topic{const entry=manifest.find((t:any)=>t.id===id),t=JSON.parse(fs.readFileSync(path.join('content/published',entry.file),'utf8'));return {...t,introduction:intro[id],chapter:{en:'Detailed reference chapter.',ar:'شرح تفصيلي للرجوع إليه.'}}}
test('every published topic has an individually authored bilingual everyday opening',()=>{
 assert.equal(Object.keys(intro).length,manifest.length);for(const entry of manifest)for(const field of ['question','scene','meaning'])for(const lang of ['ar','en'])assert(intro[entry.id][field][lang].length>20,`${entry.id}/${field}/${lang}`);
 assert.equal(new Set(Object.values(intro).map((i:any)=>i.scene.ar)).size,manifest.length);
});
test('the introduction renders only the selected small step and keeps the reference collapsed',()=>{
 const props={topic:topic('slope-beams'),lang:'en' as const,videos:[],resume:false,onStory(){},onPrerequisites(){},onBlock(){}};
 const scene=renderToStaticMarkup(React.createElement(TopicChapter,{...props,block:'scene'}));assert(scene.includes('Does a third support'));assert(scene.includes('Rest a ruler'));assert(!scene.includes('See what happens'));assert(scene.includes('<details class="intro-full">'));
 const idea=renderToStaticMarkup(React.createElement(TopicChapter,{...props,block:'idea'}));assert(idea.includes('See what happens'));assert(!idea.includes('Rest a ruler'));assert(idea.includes('disabled=""'));assert(!idea.includes('<iframe'));
});
test('intro videos require verification, a relevant prompt and less than ten minutes',()=>{
 const v={id:'pJlbSEc-shg',durationSeconds:700,startSeconds:60,endSeconds:590,embedVerifiedAt:'2026-10-28',watchFor:{en:'Why do the joints turn?',ar:'لماذا تدور العقد؟'}} as Video;
 assert(qualifiesAsIntroduction(v));assert(!qualifiesAsIntroduction({...v,embedVerifiedAt:undefined}));assert(!qualifiesAsIntroduction({...v,endSeconds:660}));assert(!qualifiesAsIntroduction({...v,startSeconds:600,endSeconds:590}));assert(!qualifiesAsIntroduction({...v,endSeconds:701}));
});

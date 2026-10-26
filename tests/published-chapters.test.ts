import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import StudyMarkdown from '../src/components/StudyMarkdown';

test('all bilingual chapters render their teaching sections after equations without swallowed Markdown',()=>{
 const root=path.resolve('content/published');
 const manifest=JSON.parse(fs.readFileSync(path.join(root,'topics.json'),'utf8'));
 for(const entry of manifest){
  const topic=JSON.parse(fs.readFileSync(path.join(root,entry.file),'utf8'));
  for(const lang of ['ar','en']){
   const chapter=fs.readFileSync(path.join(root,path.dirname(entry.file),`understand.${lang}.md`),'utf8');
   const html=renderToStaticMarkup(createElement(StudyMarkdown,{children:chapter}));
   assert.equal((html.match(/<h3>/g)||[]).length,topic.steps.length,entry.id+'/'+lang+' lost its step sections');
   assert((html.match(/<pre /g)||[]).length>=topic.steps.length,entry.id+'/'+lang+' lost its formula blocks');
   assert(!html.includes('katex-error'),entry.id+'/'+lang+' contains an invalid equation');
   assert(!html.includes('$$'),entry.id+'/'+lang+' leaked math delimiters');
  }
 }
});

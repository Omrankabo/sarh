import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {validCloudRecord} from '../src/lib/cloud-validation';
import {cloudRecords} from '../src/lib/firebase';
import {freshNotebook,freshProgress} from '../src/lib/study';
import {applyRating} from '../src/lib/recall';

test('all normal synced fields and legacy import receipts survive strict boundary checks',()=>{
 const b=freshNotebook();b.topics['slope-beams']=freshProgress();b.topics['slope-beams'].answers['recall:C01']={draft:'',choice:null,hints:0,revealed:false};b.imports=['pilot:'+JSON.stringify({path:'old/file',cards:['C01']})];applyRating(b,{id:'review-1',topic:'slope-beams',card:'C01',at:1000,rating:3,revision:0});
 for(const [path,record]of Object.entries(cloudRecords(b,'device-1')))assert(validCloudRecord(path.split('/')[0],record),path);
});
test('hostile cloud keys cannot traverse outside the allowed account fields',()=>{
 for(const [kind,key]of [['progress','topics/__proto__/step'],['progress','settings/focus'],['settings','topics/x/step'],['progress','topics/x/answers/q/escape'],['recallCards','__proto__'],['recallMeta','priority/constructor']])assert.equal(validCloudRecord(kind,{key,value:1,at:100}),false);
 assert.equal(validCloudRecord('progress',JSON.parse('{"key":"topics/x/answers/q","value":{"__proto__":{"polluted":true}},"at":1}')),false);
 assert.equal(validCloudRecord('settings',{key:'settings/focus',value:-1,at:1}),false);
 assert.equal(validCloudRecord('sessions',{key:'bad',value:{},at:1}),false);
 assert.equal(({} as any).polluted,undefined);
});
test('offline precache excludes other origins, account endpoints, PDFs and RSC query payloads',async()=>{
 const handlers:Record<string,(e:any)=>void>={},fetched:string[]=[];
 const context={URL,Request,Response,Set,self:{location:{origin:'https://sarh.example'},addEventListener:(key:string,fn:any)=>{handlers[key]=fn}},fetch:async(url:string)=>{fetched.push(url);return new Response('page',{headers:{'content-type':'text/html'}})},caches:{open:async()=>({put:async()=>{}})}};
 vm.runInNewContext(fs.readFileSync('public/sw.js','utf8'),context);
 let work:Promise<void>|undefined;handlers.message({data:{type:'CACHE',urls:['https://evil.example/en','/__/auth/handler','/api/private','/materials/course.pdf','/en?_rsc=1','/en','/ar/topics/slope-beams']},waitUntil:(p:Promise<void>)=>{work=p},source:{postMessage(){}}});await work;
 assert.deepEqual(fetched,['/en','/ar/topics/slope-beams']);
});

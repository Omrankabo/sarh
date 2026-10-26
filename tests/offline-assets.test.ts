import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

test('offline worker rejects HTML for a stylesheet and can recover with a valid cached stylesheet',async()=>{
 const handlers:Record<string,(event:any)=>void>={},stored:Response[]=[];
 let cached:Response|undefined;
 const context={URL,Request,Response,Set,self:{location:{origin:'http://127.0.0.1:3000'},addEventListener:(type:string,fn:(event:any)=>void)=>{handlers[type]=fn;}},
  fetch:async()=>new Response('<html>stale app page</html>',{headers:{'content-type':'text/html'}}),
  caches:{match:async()=>cached,open:async()=>({put:async(_key:unknown,response:Response)=>{stored.push(response);}})}};
 vm.runInNewContext(fs.readFileSync('public/sw.js','utf8'),context);
 const request=new Request('http://127.0.0.1:3000/_next/static/a.css');
 const load=async()=>{let result:Promise<Response>|undefined;handlers.fetch({request,respondWith:(value:Promise<Response>)=>{result=value;}});assert(result);return result;};
 assert.equal((await load()).status,502);assert.equal(stored.length,0);
 cached=new Response('body{color:green}',{headers:{'content-type':'text/css'}});
 const recovered=await load();assert.equal(await recovered.text(),'body{color:green}');assert.equal(stored.length,0);
});

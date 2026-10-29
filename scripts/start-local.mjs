import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawn, spawnSync} from 'node:child_process';
import {completeBuild,isProjectServer,verifyPageAssets} from './local-launcher-utils.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
process.chdir(root);
const next = path.join(root, 'node_modules/next/dist/bin/next');
const port=Number(process.env.SARH_PORT||3000),origin=`http://127.0.0.1:${port}`;
if(!Number.isInteger(port)||port<1024||port>65535)throw Error('Invalid local port.');
const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
function windowsOwners(){
  if(process.platform!=='win32')return [];
  const script=`[Console]::OutputEncoding=[System.Text.UTF8Encoding]::new(); $ErrorActionPreference='Stop'; $listeners=@(Get-NetTCPConnection -LocalPort $env:SARH_BOOT_PORT -State Listen -ErrorAction SilentlyContinue); $owners=@(foreach($item in $listeners){$owner=Get-CimInstance Win32_Process -Filter ('ProcessId='+$item.OwningProcess); [PSCustomObject]@{pid=$item.OwningProcess;command=$owner.CommandLine}}); ConvertTo-Json -Compress -InputObject $owners`;
  const result=spawnSync('powershell.exe',['-NoProfile','-NonInteractive','-Command',script],{encoding:'utf8',timeout:20000,windowsHide:true,env:{...process.env,SARH_BOOT_PORT:String(port)}});
  if(result.status!==0)throw Error('Could not check the existing local server. Close its terminal and try again.');
  return JSON.parse(result.stdout.trim()||'[]');
}
const lock=path.join(root,'.runtime/startup.lock');
let locked=false,server;
function releaseLock(){
  if(!locked)return;
  try{if(JSON.parse(fs.readFileSync(lock,'utf8')).pid===process.pid)fs.unlinkSync(lock);}catch{}
  locked=false;
}
function acquireLock(){
  fs.mkdirSync(path.dirname(lock),{recursive:true});
  for(let attempt=0;attempt<2;attempt++){
    try{const fd=fs.openSync(lock,'wx');fs.writeFileSync(fd,JSON.stringify({pid:process.pid}));fs.closeSync(fd);locked=true;return;}
    catch(error){
      if(error.code!=='EEXIST')throw error;
      let alive=false;
      try{const record=JSON.parse(fs.readFileSync(lock,'utf8'));if(Number.isInteger(record.pid)&&record.pid>0){try{process.kill(record.pid,0);alive=true;}catch(e){alive=e.code==='EPERM';}}}catch{try{alive=Date.now()-fs.statSync(lock).mtimeMs<30000;}catch{}}
      if(alive)throw Error('Sarh is already preparing to start. Wait for that window to finish.');
      fs.unlinkSync(lock);
    }
  }
  throw Error('Could not acquire the local startup lock.');
}
process.on('exit',releaseLock);
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>{server?.kill();releaseLock();process.exit(0);});
function newest(directory) {
  return fs.readdirSync(directory, {withFileTypes:true}).reduce((latest, entry) => {
    const file = path.join(directory, entry.name);
    if (entry.name === 'offline-assets.json') return latest;
    return Math.max(latest, entry.isDirectory() ? newest(file) : fs.statSync(file).mtimeMs);
  }, 0);
}
try{
  if(!fs.existsSync(next))throw Error('Dependencies are missing. Run npm install in the sarh folder first.');
  acquireLock();
  const owners=windowsOwners();
  // A live Next process can retain HTML naming chunks removed by a new build.
  if(owners.some(owner=>!isProjectServer(owner.command||'',next)))throw Error(`Another app uses port ${port}. Close it before starting Sarh; it has been left running.`);
  if(owners.length){
    console.log('Restarting the existing Sarh app safely…');
    for(const pid of new Set(owners.map(owner=>owner.pid)))process.kill(pid);
    const deadline=Date.now()+10000;
    while(windowsOwners().length){if(Date.now()>deadline)throw Error('The previous Sarh server has not stopped. Close its terminal and try again.');await wait(200);}
  }
  const stamp=path.join(root,'.next/BUILD_ID');
  const built=fs.existsSync(stamp)?fs.statSync(stamp).mtimeMs:0;
  const inputs=Math.max(...['src','content','public'].map(newest),...['next.config.ts','package.json','package-lock.json','scripts/offline-assets.mjs'].map(file=>fs.statSync(file).mtimeMs));
  if(inputs>built||!completeBuild(root)){
    console.log('Updating Sarh with your latest app and study content…');
    for(const args of [['scripts/check-published.mjs'],['scripts/check-release.mjs'],[next,'build'],['scripts/offline-assets.mjs'],['scripts/check-traces.mjs']]){
      const result=spawnSync(process.execPath,args,{stdio:'inherit'});
      if(result.status!==0)throw Error('The update did not finish. Review the message above and run Start-Sarh.cmd again.');
    }
  }
  if(!completeBuild(root))throw Error('The saved app is missing assets. Run npm run build and try again.');
  server=spawn(process.execPath,[next,'start','--hostname','127.0.0.1','--port',String(port)],{stdio:'inherit'});
  let ended=false,spawnError;
  const completion=new Promise(resolve=>{server.on('error',error=>{spawnError=error;ended=true;resolve(1);});server.on('exit',code=>{ended=true;resolve(code||0);});});
  const deadline=Date.now()+30000;
  let healthy=false,lastError;
  while(Date.now()<deadline&&!ended){
    try{
      const response=await fetch(origin+'/en',{cache:'no-store',signal:AbortSignal.timeout(5000)});
      if(!response.ok)throw Error(`App returned ${response.status}.`);
      const count=await verifyPageAssets(await response.text(),origin);
      console.log(`Sarh is ready. Styles and scripts checked (${count} files).`);healthy=true;break;
    }catch(error){lastError=error;await wait(300);}
  }
  if(!healthy)throw spawnError||lastError||Error('Sarh could not start.');
  releaseLock();
  console.log(`Open ${origin}/en — refresh any already-open Sarh tabs. Keep this window open while studying.`);
  process.exitCode=await completion;
}catch(error){server?.kill();releaseLock();console.error(`Sarh could not start: ${error.message}`);process.exitCode=1;}

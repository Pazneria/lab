import fs from 'node:fs';import path from 'node:path';import http from 'node:http';import os from 'node:os';import {gzipSync} from 'node:zlib';import {pathToFileURL} from 'node:url';
if(!process.env.CI)throw Error('Hosted diagnostic only; never owner-machine testing.');
const {chromium}=await import(pathToFileURL(process.env.STUDIO_PLAYWRIGHT).href),root=process.cwd(),out=path.join(root,'studio-clock-evidence');fs.mkdirSync(out,{recursive:true});
const result={sha:process.env.STUDIO_REVIEW_SHA,attemptsPerCase:1,order:['no-graphics','bare-worker-webgl','candidate'],ownerBrowserTested:false,securityFlagsAdded:[],cases:[],classification:'unresolved'};
const save=()=>fs.writeFileSync(path.join(out,'result.json'),JSON.stringify(result,null,2));
const mime={'.html':'text/html','.mjs':'text/javascript','.js':'text/javascript','.css':'text/css','.json':'application/json','.glb':'model/gltf-binary'};
const server=http.createServer((req,res)=>{try{const name=decodeURIComponent(new URL(req.url,'http://localhost').pathname);if(name==='/diagnostic/'){res.setHeader('Content-Type','text/html');res.end('<!doctype html><meta charset="utf-8"><title>Independent clock control</title><button id="probe" autofocus>Native input control</button>');return;}let file=path.resolve(root,'.'+name);if(!file.startsWith(root+path.sep))throw Error('outside');if(fs.statSync(file).isDirectory())file=path.join(file,'index.html');res.setHeader('Content-Type',mime[path.extname(file)]||'application/octet-stream');fs.createReadStream(file).pipe(res);}catch{res.writeHead(404).end();}});await new Promise(r=>server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+server.address().port;
const stamp=()=>({epoch:Date.now(),origin:performance.timeOrigin,now:performance.now(),hrUs:Number(process.hrtime.bigint()/1000n)});
function proc(file){try{return fs.readFileSync(file,'utf8');}catch{return null;}}
const watchdog=setTimeout(()=>{result.error='150-second total diagnostic budget exceeded';save();process.exit(1);},150000);
for(const name of result.order){
 const data={name,nodeStarted:stamp(),nodeHeartbeats:[],pressure:[],sync:[],inputs:[],errors:[],traceComplete:false};result.cases.push(data);save();let browser,cdp,nodeTimer,pressureTimer,stream;
 let last=performance.now();nodeTimer=setInterval(()=>{const now=performance.now();data.nodeHeartbeats.push({...stamp(),drift:now-last-100});last=now;},100);pressureTimer=setInterval(()=>data.pressure.push({...stamp(),cpuPressure:proc('/proc/pressure/cpu'),procStat:proc('/proc/stat')?.split('\n')[0],loadavg:os.loadavg()}),250);
 try{
  browser=await chromium.launch({channel:'chrome',headless:false,chromiumSandbox:true});data.browserVersion=browser.version();const context=await browser.newContext({viewport:{width:1280,height:720}}),page=await context.newPage(),pageCDP=await context.newCDPSession(page);cdp=await browser.newBrowserCDPSession();
  await pageCDP.send('Runtime.enable');await pageCDP.send('Runtime.addBinding',{name:'__clockSignal'});
  const nativeInput=async phase=>{const entry={phase,before:stamp()};data.inputs.push(entry);try{await pageCDP.send('Input.dispatchKeyEvent',{type:'rawKeyDown',key:'Tab',code:'Tab',windowsVirtualKeyCode:9,nativeVirtualKeyCode:9});await pageCDP.send('Input.dispatchKeyEvent',{type:'keyUp',key:'Tab',code:'Tab',windowsVirtualKeyCode:9,nativeVirtualKeyCode:9});entry.after=stamp();}catch(e){entry.error=String(e);}};
  let inputPromise;
  pageCDP.on('Runtime.bindingCalled',event=>{if(event.name==='__clockSignal'){data.graphicsSignal={payload:JSON.parse(event.payload),received:stamp()};inputPromise=new Promise(resolve=>setTimeout(()=>nativeInput('graphics-start').then(resolve),50));}});
  await context.addInitScript(({clockURL})=>{
   const stamp=()=>({origin:performance.timeOrigin,now:performance.now(),epoch:Date.now()});
   const d=window.__clockDiagnostic={start:stamp(),document:[],worker:[],inputs:[],longTasks:[],graphicsRequests:[]};
   let last=performance.now();d.document.push({type:'start',...stamp()});setInterval(()=>{const now=performance.now();d.document.push({...stamp(),drift:now-last-100,hidden:document.hidden});last=now;},100);
   new PerformanceObserver(list=>d.longTasks.push(...list.getEntries().map(e=>({start:e.startTime,duration:e.duration})))).observe({type:'longtask',buffered:true});
   for(const type of ['keydown','keyup','click'])document.addEventListener(type,e=>d.inputs.push({type,key:e.key,target:e.target?.id||e.target?.tagName,trusted:e.isTrusted,eventTime:e.timeStamp,handled:stamp()}),true);
   const NativeWorker=Worker;const clock=new NativeWorker(clockURL,{type:'module'});clock.onmessage=({data})=>d.worker.push({...data,received:stamp()});
   window.Worker=class extends NativeWorker{constructor(url,options){if(/graphics-worker\.mjs|studio-graphics-control\.mjs/.test(String(url))){const info={url:String(url),...stamp()};d.graphicsRequests.push(info);performance.mark('studio-diagnostic-graphics-start');window.__clockSignal(JSON.stringify(info));}super(url,options);}};
  },{clockURL:base+'/scripts/studio-clock-worker.mjs'});
  page.on('pageerror',e=>data.errors.push(e.message));
  await cdp.send('Tracing.start',{categories:'toplevel,devtools.timeline,blink.user_timing,renderer.scheduler,sequence_manager,gpu,cc,disabled-by-default-ipc.flow',transferMode:'ReturnAsStream',options:'record-as-much-as-possible'});
  async function sync(label){const id=name+'-'+label;const before=stamp();await cdp.send('Tracing.recordClockSyncMarker',{syncId:id});data.sync.push({id,before,after:stamp()});}
  await sync('start');data.navigationStart=stamp();
  await page.goto(name==='candidate'?base+'/animation-studio/rebuild.html':base+'/diagnostic/',{waitUntil:'domcontentloaded',timeout:20000});data.domReady=stamp();
  if(name==='no-graphics'){await new Promise(r=>setTimeout(r,500));await nativeInput('baseline');await new Promise(r=>setTimeout(r,1000));}
  else if(name==='bare-worker-webgl'){
   await new Promise(r=>setTimeout(r,500));await page.evaluate(url=>{const w=new Worker(url,{type:'module'});w.onmessage=({data})=>{if(data.done)window.__clockDiagnostic.graphicsResult={...data,received:{origin:performance.timeOrigin,now:performance.now(),epoch:Date.now()}};};w.postMessage({});},base+'/scripts/studio-graphics-control.mjs');
   await page.waitForFunction(()=>window.__clockDiagnostic.graphicsResult,null,{timeout:15000});if(inputPromise)await inputPromise;await new Promise(r=>setTimeout(r,1100));
  }else{
   await page.waitForFunction(()=>{const s=window.minimalStudioDiagnostics?.snapshot();return s?.viewerReady||s?.graphics?.state==='unavailable';},null,{timeout:20000});if(inputPromise)await inputPromise;await new Promise(r=>setTimeout(r,1100));data.candidate=await page.evaluate(()=>window.minimalStudioDiagnostics.snapshot());
  }
  data.clock=await page.evaluate(()=>window.__clockDiagnostic);data.measurementEnd=stamp();await sync('end');
  const complete=new Promise(r=>cdp.once('Tracing.tracingComplete',r));await cdp.send('Tracing.end');stream=(await complete).stream;
  const chunks=[];let bytes=0;for(;;){const part=await cdp.send('IO.read',{handle:stream,size:1024*1024});const chunk=Buffer.from(part.data,part.base64Encoded?'base64':'utf8');chunks.push(chunk);bytes+=chunk.length;if(bytes>32*1024*1024)throw Error('Trace exceeds 32 MiB bounded budget');if(part.eof)break;}await cdp.send('IO.close',{handle:stream});stream=null;
  const trace=Buffer.concat(chunks);fs.writeFileSync(path.join(out,name+'.trace.json.gz'),gzipSync(trace,{level:1}));data.traceBytes=trace.length;data.traceComplete=true;
  const events=JSON.parse(trace).traceEvents;data.traceSummary={metadata:events.filter(e=>e.ph==='M'&&['process_name','thread_name'].includes(e.name)),clockSync:events.filter(e=>e.name==='clock_sync'),longest:events.filter(e=>e.ph==='X'&&e.dur>=50000).sort((a,b)=>b.dur-a.dur).slice(0,60).map(({name,cat,pid,tid,ts,dur,args})=>({name,cat,pid,tid,ts,dur,args}))};
 }catch(error){data.error=String(error);}
 finally{clearInterval(nodeTimer);clearInterval(pressureTimer);try{if(stream)await cdp.send('IO.close',{handle:stream});}catch{}await browser?.close();data.nodeEnded=stamp();save();}
}
clearTimeout(watchdog);await new Promise(r=>server.close(r));result.measurementComplete=result.cases.every(c=>c.traceComplete&&!c.error);save();process.exitCode=result.measurementComplete?0:1;

// Optional bounded smoke test using an existing Playwright + browser install.
// No installs, desktop interaction, public vote writes, or hardware GPU use.
import assert from 'node:assert/strict';
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {resolve,extname,sep} from 'node:path';
import {createServer} from 'node:http';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
const require=createRequire(import.meta.url),{chromium}=require(process.env.LAB_PLAYWRIGHT_MODULE||'playwright');
const root=resolve(fileURLToPath(new URL('../../',import.meta.url)));
const output=resolve(process.env.CHARACTERBENCH_EVIDENCE||'characterbench-browser-evidence');mkdirSync(output,{recursive:true});
const catalog=JSON.parse(readFileSync(resolve(root,'character-bench/data/admission.json')));
const all=catalog.entries.filter(e=>e.id.startsWith('entry-20261029-'));
const sample=[false,true].map(textured=>all.filter(e=>!!e.provenance.hostEvidence.result.decodedImages.length===textured).sort((a,b)=>a.asset.byteLength-b.asset.byteLength)[0]);
const types={'.html':'text/html','.mjs':'text/javascript','.js':'text/javascript','.css':'text/css','.json':'application/json','.glb':'model/gltf-binary','.svg':'image/svg+xml'};
const server=createServer((req,res)=>{try{let path=resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!path.startsWith(root+sep)&&path!==root)throw Error('outside root');if(req.url.split('?')[0].endsWith('/'))path=resolve(path,'index.html');const bytes=readFileSync(path);res.writeHead(200,{'Content-Type':types[extname(path)]||'application/octet-stream','Content-Length':bytes.length});res.end(bytes);}catch{res.writeHead(404);res.end('Not found');}});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));const origin='http://127.0.0.1:'+server.address().port;
let browser;const report={hardwareGpu:false,externalRequests:[],errors:[],samples:[]};
try{
 browser=await chromium.launch({headless:true,executablePath:process.env.LAB_BROWSER_EXECUTABLE,args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--disable-gpu-vsync','--renderer-process-limit=1']});
 const context=await browser.newContext({viewport:{width:1400,height:1000}}),page=await context.newPage();
 await context.route('**/*',route=>{const url=route.request().url();if(url.startsWith(origin)||url.startsWith('data:')||url.startsWith('blob:'))return route.continue();report.externalRequests.push(url);return route.abort();});
 page.on('pageerror',e=>report.errors.push(e.message));
 assert.equal((await page.goto(origin+'/character-bench/results.html')).status(),200);await page.locator('.attempt-card').last().waitFor();assert.equal(await page.locator('.attempt-card').count(),75);assert.equal(await page.locator('a[href^="inspect.html?"]').count(),73);
 await page.screenshot({path:resolve(output,'archive-desktop.png')});
 await page.locator('#search').fill('Dalia');assert.equal(await page.locator('.attempt-card').count(),4);await page.setViewportSize({width:390,height:844});
 assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));await page.screenshot({path:resolve(output,'archive-mobile.png')});
 await page.setViewportSize({width:1000,height:850});
 for(const e of sample){
  await page.goto(origin+'/character-bench/inspect.html?attempt='+e.id);await page.locator('#load:not([disabled])').waitFor();assert.equal(await page.locator('canvas').count(),0);
  await page.locator('#load').click();await page.waitForFunction(()=>document.querySelector('#status').textContent==='Ready to inspect',null,{timeout:45000});
  const renderer=await page.evaluate(()=>{const gl=document.querySelector('canvas').getContext('webgl2'),ext=gl.getExtension('WEBGL_debug_renderer_info');return gl.getParameter(ext.UNMASKED_RENDERER_WEBGL);});assert.match(renderer,/SwiftShader/i);
  await page.locator('[data-view="side"]').click();await page.locator('#mode').selectOption('clay');await page.screenshot({path:resolve(output,e.id+'.png')});
  await page.locator('#load').click();await page.waitForFunction(()=>document.querySelector('#status').textContent==='Ready to inspect');assert.equal(await page.locator('#mode').inputValue(),'clay');
  report.samples.push({id:e.id,assetSha256:e.asset.sha256,bytes:e.asset.byteLength,decodedImages:e.provenance.hostEvidence.result.decodedImages.length,renderer,status:'loaded/reloaded; controls exercised'});
 }
 assert.deepEqual(report.externalRequests,[]);assert.deepEqual(report.errors,[]);report.passed=true;
}finally{await browser?.close();await new Promise(resolve=>server.close(resolve));writeFileSync(resolve(output,'archive-browser.json'),JSON.stringify(report,null,2)+'\n');}
console.log(JSON.stringify(report,null,2));

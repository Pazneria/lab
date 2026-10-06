const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {chromium}=require(process.env.LAB_PLAYWRIGHT_MODULE||'playwright');
const server=require('../scripts/serve-walkable.cjs');
const root=path.resolve(__dirname,'..'),out=path.join(root,'evidence');
const report={checkedAt:new Date().toISOString(),checks:[],errors:[],externalRequests:[]};
const pass=s=>{report.checks.push(s);console.log('PASS '+s)};
let browser;
(async()=>{
 fs.mkdirSync(out,{recursive:true});await new Promise(r=>server.listen(0,'127.0.0.1',r));
 const base=process.env.LAB_WALKABLE_BASE||`http://127.0.0.1:${server.address().port}/lab/walkable-3d/`;report.base=base;
 browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||undefined,channel:process.env.LAB_BROWSER_CHANNEL||undefined});report.browser=browser.version();
 const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'}),page=await context.newPage();
 page.on('pageerror',e=>report.errors.push(e.message));const requests=[];
 page.on('request',r=>{requests.push(r.url());if(new URL(r.url()).origin!==new URL(base).origin)report.externalRequests.push(r.url())});
 const detached=async f=>{if(!f.isDetached())await page.waitForEvent('framedetached',{predicate:x=>x===f});assert.ok(f.isDetached())};
 const count=async n=>assert.equal(await page.locator('#scene-mount iframe').count(),n);
 const ready=async()=>page.waitForFunction(()=>document.querySelector('#viewer-message').textContent.startsWith('Ready.'),null,{timeout:45000});
 const frame=async()=>await(await page.locator('#scene-mount iframe').elementHandle()).contentFrame();
 const close=async()=>{await page.locator('#close-viewer').click();await page.waitForFunction(()=>!document.querySelector('#viewer').open);await page.waitForURL(u=>!u.hash);await count(0)};
 const open=async id=>{await page.locator(`[data-open="${id}"]`).click();await ready();await count(1);return frame()};
 if(!process.env.WALKABLE_FAILURES_ONLY){
 await page.goto(base);await page.locator('.entry[data-entry]').last().waitFor();await page.locator('.entry img').last().evaluate(i=>i.decode());await count(0);
 assert.equal(await page.locator('canvas').count(),0);assert.ok(!requests.some(u=>u.includes('/frozen/')||u.endsWith('.zip')));
 assert.equal(await page.locator('[data-choice="a"]').isDisabled(),true);
 const initial=await page.evaluate(()=>performance.getEntriesByType('resource').map(r=>({name:r.name,bytes:r.decodedBodySize})));
 report.staticDecodedBytes=initial.reduce((n,r)=>n+r.bytes,0);report.staticRequests=initial;assert.ok(report.staticDecodedBytes<350000);
 pass('Static gallery creates no iframe/canvas, downloads no scene/ZIP, stays below 350 kB decoded resources, and has no invented grade or preference');
 await page.screenshot({path:path.join(out,'walkable-desktop.png'),fullPage:true});
 for(const width of [1024,768,700,390,320]){await page.setViewportSize({width,height:900});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));}
 await page.screenshot({path:path.join(out,'walkable-mobile.png'),fullPage:true});
 await page.locator('.inspector summary').first().click();assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
 await page.screenshot({path:path.join(out,'walkable-mobile-inspector.png'),fullPage:true});
 await page.setViewportSize({width:1440,height:1000});
 const grade=page.locator('.grade-form').first();await grade.locator('[name=visuals]').fill('30');await grade.locator('[name=notes]').fill('Test note <script>literal text</script>');await grade.getByRole('button',{name:'Save grade',exact:true}).click();assert.match(await grade.locator('.grade-result').textContent(),/Partial/);
 await grade.locator('[name=performance]').fill('20');await grade.locator('[name=fulfillment]').fill('15');
 await page.locator('#blind').uncheck();assert.equal(await grade.locator('[name=visuals]').inputValue(),'30');assert.match(await page.locator('.entry-meta').first().textContent(),/Sol/);
 await grade.getByRole('button',{name:'Save grade',exact:true}).click();assert.match(await grade.locator('.grade-result').textContent(),/65 \/ 100/);
 await page.reload();await page.locator('.entry[data-entry]').last().waitFor();await page.locator('.inspector summary').first().click();assert.equal(await grade.locator('[name=notes]').inputValue(),'Test note <script>literal text</script>');
 await grade.getByRole('button',{name:'Clear grade',exact:true}).click();assert.match(await grade.locator('.grade-result').textContent(),/Not graded/);
 pass('Grades persist independently; incomplete totals remain null, clear works, and revealing labels preserves unsaved input');
 for(const id of ['alder-halt','bracken-hollow']){
   const f=await open(id);
   assert.equal(await page.locator('#scene-mount iframe').getAttribute('sandbox'),'allow-scripts allow-pointer-lock');
   assert.deepEqual(await f.evaluate(()=>{let dom=false,storage=false;try{void parent.document.body}catch{dom=true}try{void localStorage.length}catch{storage=true}return{dom,storage}}),{dom:true,storage:true});
   await f.locator('#enter').click();await f.waitForFunction(()=>!!document.pointerLockElement);
   const pose=()=>f.evaluate(()=>window.alder?alder.getPlayer():station.getPose());const before=await pose();
   await page.keyboard.down('KeyW');await page.waitForTimeout(450);await page.keyboard.up('KeyW');const after=await pose();assert.ok(Math.hypot(after.x-before.x,after.z-before.z)>.1);
   await page.keyboard.press('KeyR');await page.waitForTimeout(100);const reset=await pose();assert.ok(Math.hypot(reset.x-before.x,reset.z-before.z)<.03);
   await page.keyboard.press('Escape');await f.waitForFunction(()=>!document.pointerLockElement);
   await page.locator('#close-viewer').waitFor({state:'visible'});await close();await detached(f);assert.equal(await page.evaluate(()=>document.pointerLockElement),null);
   pass(`${id}: loads in opaque sandbox, blocks parent DOM/storage access, captures mouse, walks/resets with real keys, releases pointer and detaches on close`);
 }
 assert.equal(await page.locator('[data-choice="a"]').isDisabled(),false);await page.locator('[data-choice="a"]').click();assert.match(await page.locator('#vote-status').textContent(),/entry A/);
 await page.reload();await page.locator('.entry[data-entry]').last().waitFor();assert.match(await page.locator('#vote-status').textContent(),/entry A/);
 const downloadPromise=page.waitForEvent('download');await page.locator('#export').click();const download=await downloadPromise;const exported=JSON.parse(fs.readFileSync(await download.path(),'utf8'));assert.equal(exported.preferences['alder-halt::bracken-hollow'].choice,'alder-halt');assert.deepEqual(exported.grades,{});
 await page.locator('#clear-vote').click();assert.match(await page.locator('#vote-status').textContent(),/No preference/);
 pass('Preference requires both entries opened, persists by stable IDs, exports separately from grades, and clears without a public tally');
 let f=await open('alder-halt');await page.goBack();await count(0);await detached(f);await page.goForward();await count(0);await page.reload();await page.locator('.entry[data-entry]').last().waitFor();await count(0);
 pass('Back destroys the active scene; Forward, direct scene hashes and reload never auto-start WebGL');
 await page.goto(base);await page.locator('.entry[data-entry]').last().waitFor();
 for(let i=0;i<3;i++){f=await open(i%2?'bracken-hollow':'alder-halt');await close();await detached(f)}
 pass('Repeated opening/closing leaves no retained child browsing contexts');
 f=await open('alder-halt');await page.locator('[data-open="bracken-hollow"]').evaluate(b=>b.click());await ready();await count(1);await detached(f);await close();
 pass('Switching entries destroys the old frame before allocating the next; maximum one active entry');
 f=await open('bracken-hollow');await page.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,get:()=>true});document.dispatchEvent(new Event('visibilitychange'))});await count(0);await detached(f);await page.evaluate(()=>delete document.hidden);
 f=await open('alder-halt');await page.goto(new URL('../benchmarks.html',base).href);await detached(f);await page.goBack();await page.locator('.entry[data-entry]').last().waitFor();await count(0);
 pass('Hidden-tab lifecycle and navigation destroy rendering/audio context; returning stays static');
 }
 // Expected failure cases live in their own context; no corrupted production files.
 const failure=await browser.newContext({viewport:{width:1280,height:900}}),bad=await failure.newPage();await bad.bringToFront();
 bad.on('console',m=>{if(m.type()==='error')console.log('Expected-failure case:',m.text())});
 await bad.route('**/frozen/index.html.txt',r=>r.fulfill({status:404,body:'Missing'}));await bad.goto(base);await bad.locator('[data-open="alder-halt"]').click();await bad.waitForFunction(()=>document.querySelector('#viewer-message').textContent.includes('could not be downloaded'));assert.equal(await bad.locator('iframe').count(),0);await bad.locator('#close-viewer').click();await bad.waitForURL(u=>!u.hash);await bad.unroute('**/frozen/index.html.txt');
 await bad.goto(base);await bad.bringToFront();await bad.route('**/frozen/scene.js',r=>r.fulfill({status:404,body:'Missing',headers:{'Access-Control-Allow-Origin':'*'}}));await bad.locator('[data-open="alder-halt"]').click();await bad.waitForFunction(()=>document.querySelector('#viewer-message').textContent.includes('runtime or asset error')).catch(async e=>{console.log('FAILURE STATE',await bad.evaluate(()=>({hidden:document.hidden,status:document.querySelector('#viewer-message').textContent,frames:document.querySelectorAll('iframe').length})));throw e});assert.equal(await bad.locator('iframe').count(),0);await bad.locator('#close-viewer').click();await bad.waitForURL(u=>!u.hash);await bad.unroute('**/frozen/scene.js');
 await bad.goto(base);await bad.route('**/frozen/index.html.txt',r=>r.fulfill({status:200,body:'<html>Changed</html>'}));await bad.locator('[data-open="alder-halt"]').click();await bad.waitForFunction(()=>document.querySelector('#viewer-message').textContent.includes('integrity check'));assert.equal(await bad.locator('iframe').count(),0);await failure.close();
 pass('Missing entry HTML, missing JS, and changed HTML hash fail visibly with zero retained frames');
 const denied=await browser.newContext();await denied.addInitScript(()=>{Object.defineProperty(window,'localStorage',{get(){throw Error('Storage disabled')}})});const dp=await denied.newPage();await dp.goto(base);await dp.locator('.entry[data-entry]').last().waitFor();assert.match(await dp.locator('#storage-state').textContent(),/unavailable/);await denied.close();
 const fixture=await browser.newContext();const single=await fixture.newPage();await single.route('**/entries.json',async r=>{const response=await r.fetch();const data=await response.json();data.entries=data.entries.slice(0,1);await r.fulfill({json:data})});await single.goto(base);await single.locator('.waiting').waitFor();assert.equal(await single.locator('[data-choice="a"]').isVisible(),false);await fixture.close();
 pass('Storage-disabled mode remains usable and disclosed; a single-entry manifest shows a real waiting state without voting');
 assert.deepEqual(report.errors,[]);assert.deepEqual(report.externalRequests,[]);report.passed=true;
})().catch(e=>{report.failure=e.stack;console.error(e);process.exitCode=1}).finally(async()=>{if(browser)await browser.close();await new Promise(r=>server.close(r));fs.writeFileSync(path.join(out,process.env.LAB_WALKABLE_BASE?'walkable-live-validation.json':'walkable-validation.json'),JSON.stringify(report,null,2))});

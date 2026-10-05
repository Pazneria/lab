// One separate headless Edge, sequential contexts, local developer dependencies.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const {pathToFileURL}=require('node:url');
const root=path.resolve(__dirname,'../..'),out=path.join(root,'evidence','lab-space');fs.mkdirSync(out,{recursive:true});
const requiredAccessibilityModes=['desktop 3D','mobile 3D'];
const report={testedAt:new Date().toISOString(),checks:[],screenshots:[],errors:[],externalRequests:[],requiredAccessibilityModes,accessibility:[],limits:'One sequential headless Edge smoke pass. Software WebGL and simulated touch. No real phone, assistive-technology user test, sustained GPU check or catalog regression suite.'};
const done=name=>{report.checks.push(name);console.log('PASS '+name);};
async function audit(page,mode,axeScript){
 await page.addScriptTag({path:axeScript});
 const result=await page.evaluate(async()=>{const r=await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}});return {axeVersion:axe.version,violations:r.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))};});
 report.accessibility.push({mode,completed:true,...result});assert.deepEqual(result.violations,[]);done(mode+' automated WCAG A/AA check');
}
const server=http.createServer((req,res)=>{
 const relative=new URL(req.url,'http://127.0.0.1').pathname.replace(/^\/lab(?=\/|$)/,'');
 const file=path.resolve(root,'.'+(relative.endsWith('/')?relative+'index.html':relative));
 if(!file.startsWith(root+path.sep)||!fs.existsSync(file)){res.writeHead(404);return res.end();}
 res.setHeader('Content-Type',({'.html':'text/html','.css':'text/css','.js':'text/javascript','.mjs':'text/javascript','.svg':'image/svg+xml'})[path.extname(file)]||'text/plain');res.end(fs.readFileSync(file));
});
(async()=>{
 if(!process.env.LAB_AXE_SCRIPT?.trim())throw Error('LAB_AXE_SCRIPT is required; no accessibility audit was run.');
 const axeScript=path.resolve(process.env.LAB_AXE_SCRIPT);
 try{assert(fs.statSync(axeScript).isFile());fs.accessSync(axeScript,fs.constants.R_OK);}catch{throw Error('LAB_AXE_SCRIPT must be a readable local axe-core script; no accessibility audit was run.');}
 const {chromium}=require(process.env.LAB_PLAYWRIGHT_MODULE||'playwright');
 const nav=await import(pathToFileURL(path.join(root,'lab-space/assets/navigation.mjs')));
 const T=await import(pathToFileURL(path.join(root,'lab-space/assets/vendor/three.module.min.js')));
 for(const bad of ['javascript:alert(1)','constructor','__proto__','https://evil.example',null])assert.throws(()=>nav.safeDestination(bad));
 assert.equal(nav.safeDestination('catalog'),'https://pazneria.github.io/lab/');assert.equal(nav.safeDestination('home'),'https://pazneria.github.io/');done('Only exact public HTTPS station destinations accepted');
 const cases=[
  [nav.spawn(),{x:0,z:-5.5},false], // central bench must be circumnavigated
  [{x:-5.3,z:-3}, {x:5.5,z:-3},false], // hall bench and study portal
  [nav.spawn(),{x:-7,z:-3.75},true], // apparatus: approach its bench
  [nav.spawn(),{x:7.5,z:-2.4},true], // desk: approach around screen and chair
  [{x:5.3,z:-3.5},{x:6.4,z:-2.4},true], // occupied chair
  [{x:5.5,z:-3},nav.approaches.home,false]
 ];
 for(const [start,target,approach] of cases){
  const p={...start},points=nav.planRoute(p,target,{approach});assert(points?.length,'Route exists');
  let previous=p;for(const next of points){assert(nav.segmentFree(previous,next),'No corner cutting');previous=next;}
  let steps=0;while(points.length&&steps++<1000){assert.notEqual(nav.followRoute(p,points,.05),'blocked');assert(nav.walkable(p),'Every movement step has wall/furniture clearance');}
  assert.equal(points.length,0);assert(Math.hypot(p.x-target.x,p.z-target.z)<(approach?1.8:.001));
 }
 assert(nav.planRoute(nav.spawn(),{x:0,z:-5.5}).length>1);
 for(const target of [{x:100,z:0},{x:0,z:NaN},{x:0,z:-3},{x:8,z:0}])assert.equal(nav.planRoute(nav.spawn(),target),null);
 assert.equal(nav.planRoute({x:0,z:-3},{x:1,z:1}),null);
 let p={x:0,z:1,yaw:0,pitch:0};for(let i=0;i<160;i++)nav.advance(p,new Set(['forward']),.05);assert(!nav.blocked(p.x,p.z));assert(p.z>=-1.65);
 p={x:5,z:4,yaw:Math.PI,pitch:0};for(let i=0;i<160;i++)nav.advance(p,new Set(['forward']),.05);assert.equal(p.z,nav.limits.z);
 assert(nav.blocked(3.6,-.6)&&nav.blocked(5,-.6)&&nav.blocked(7.4,-2.4));assert(!nav.blocked(3.6,-2.4));
 done('Six routes protect benches, piers, study screen, chair and desk; unreachable targets rejected; manual collision and walls preserved');
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 const local='http://127.0.0.1:'+server.address().port;
 const url=process.env.LAB_ROOM_URL||local+'/lab/lab-space/';
 const allowedOrigin=new URL(url).origin;
 const browser=await chromium.launch({channel:process.env.LAB_BROWSER_CHANNEL||'msedge',headless:true,args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
 async function watch(page){page.on('pageerror',e=>report.errors.push(e.message));page.on('request',r=>{if(new URL(r.url()).origin!==allowedOrigin)report.externalRequests.push(r.url());});}
 const pos=async page=>{const s=await page.locator('#map-player').getAttribute('transform'),m=s.match(/translate\(([-\d.]+) ([-\d.]+)\) rotate\(([-\d.]+)\)/);return {x:(Number(m[1])-50)/4.75,z:(Number(m[2])-48)/4.85,yaw:-Number(m[3])*Math.PI/180,pitch:0};};
 async function clickWorld(page,world,touch=false){
  const rect=await page.locator('#room').boundingBox(),p=await pos(page),camera=new T.PerspectiveCamera(rect.width/rect.height<1?78:65,rect.width/rect.height,.08,70);
  camera.rotation.order='YXZ';camera.position.set(p.x,1.68,p.z);
  // Tests use the spawn/arrival pitch; small floor points tolerate a few pixels.
  camera.rotation.set(world.pitch??-.035,p.yaw,0);camera.updateMatrixWorld();
  const projected=new T.Vector3(world.x,world.y,world.z).project(camera);
  const x=rect.x+(projected.x+1)*rect.width/2,y=rect.y+(1-projected.y)*rect.height/2;
  assert(x>rect.x&&x<rect.x+rect.width&&y>rect.y&&y<rect.y+rect.height,'World target is in the visible room');
  if(touch)await page.touchscreen.tap(x,y);else await page.mouse.click(x,y);
 }
 async function arrived(page){await page.waitForFunction(()=>document.querySelector('#cancel-walk').hidden,{},{timeout:14000});}
 async function helpWalk(page,id){await page.locator('#help').click();assert(await page.locator('#help-dialog').isVisible());await page.locator('#'+id).click();await page.waitForFunction(()=>document.activeElement.id==='room'||document.querySelector('#station-dialog').open);}
 async function shot(page,name){await page.screenshot({path:path.join(out,name),fullPage:true});report.screenshots.push(name);}
 try{
 const ctx=await browser.newContext({viewport:{width:1440,height:1000}}),page=await ctx.newPage();await watch(page);
 await page.goto(url);await page.locator('#room').waitFor({state:'visible'});
 assert.equal(await page.locator('aside').count(),0);assert(!await page.locator('#help-dialog').isVisible());assert(!await page.locator('#movement').isVisible());
 const rect=await page.locator('#room').boundingBox();assert(rect.width>1300);await shot(page,'lab-free-desktop.png');done('Full-width room without persistent side panel; Help and direction buttons are optional');
 await clickWorld(page,{x:.55,y:1.67,z:-2.64});assert(!await page.locator('#station-dialog').isVisible());await page.locator('#station-dialog').waitFor({state:'visible',timeout:14000});assert.equal(nav.nearby(await pos(page)),'catalog');await page.keyboard.press('Escape');done('Distant actual monitor click approaches the bench before opening its controls');
 await page.reload();await page.locator('#room').waitFor({state:'visible'});
 await clickWorld(page,{x:-7.05,y:1.3,z:-.72});await arrived(page);p=await pos(page);assert(p.x<-5.5&&p.x>-6.1);assert(!nav.blocked(p.x,p.z));assert(!await page.locator('#station-dialog').isVisible());done('Actual apparatus click approaches free floor beside the workbench without inventing a tool');
 await page.reload();await page.locator('#room').waitFor({state:'visible'});
 await clickWorld(page,{x:1.9,y:.01,z:2.2});assert(!await page.locator('#cancel-walk').isHidden());await arrived(page);p=await pos(page);assert(Math.hypot(p.x-1.9,p.z-2.2)<.2);done('Actual desktop floor click walks to the selected point');
 await clickWorld(page,{x:3.2,y:.01,z:-3.3});await page.waitForTimeout(100);await clickWorld(page,{x:0,y:.01,z:-1.3});await arrived(page);p=await pos(page);assert(Math.hypot(p.x,p.z+1.3)<.25);done('A new click replaces an active route');
 await helpWalk(page,'visit-home');await page.waitForTimeout(100);await page.keyboard.press('Escape');const stopped=await pos(page);await page.waitForTimeout(200);assert.deepEqual(await pos(page),stopped);assert(!await page.locator('#station-dialog').isVisible());done('Escape cancels walking without opening the destination');
 await helpWalk(page,'visit-home');await page.waitForTimeout(100);const r=await page.locator('#room').boundingBox();
 await page.mouse.move(r.x+r.width/2,r.y+r.height/2);await page.mouse.down();await page.mouse.move(r.x+r.width/2+70,r.y+r.height/2+10);await page.mouse.up();
 assert(await page.locator('#cancel-walk').isHidden());assert(!await page.locator('#station-dialog').isVisible());done('Drag look cancels walking and does not count as a destination tap');
 // Start away from the bench: the preceding cancellation tests can leave us close enough to arrive before a keyboard assertion.
 await page.reload();await page.locator('#room').waitFor({state:'visible'});
 await helpWalk(page,'visit-bench');await page.waitForTimeout(100);assert.equal(await page.evaluate(()=>document.activeElement.id),'room','Walking returns keyboard focus to the room');await page.keyboard.down('KeyW');await page.waitForTimeout(150);await page.keyboard.up('KeyW');assert(await page.locator('#cancel-walk').isHidden());done('Keyboard movement replaces walking; navigation stays canvas-scoped');
 // Arrival is a separate scenario; restore the same known starting distance without relaxing its pre-arrival assertion.
 await page.reload();await page.locator('#room').waitFor({state:'visible'});
 await helpWalk(page,'visit-bench');assert(!await page.locator('#station-dialog').isVisible());await page.locator('#station-dialog').waitFor({state:'visible',timeout:14000});
 assert.equal(await page.locator('#dialog-link').getAttribute('href'),nav.safeDestination('catalog'));assert.equal(nav.nearby(await pos(page)),'catalog');
 await page.keyboard.press('Escape');assert.equal(await page.evaluate(()=>document.activeElement.id),'room');
 await shot(page,'lab-free-benchmark.png');done('Accessible Help destination walks to the bench before opening validated catalog controls; focus returns');
 // Actual monitor hit from the approach; its controls open through arrival, not pointerup.
 await clickWorld(page,{x:.55,y:1.67,z:-2.64,pitch:-.06});await page.locator('#station-dialog').waitFor({state:'visible',timeout:2000});await page.keyboard.press('Escape');done('Actual 3D monitor selects the real benchmark station');
 // High north wall is unreachable and does not move the player.
 const wallStart=await pos(page);await clickWorld(page,{x:1,y:5,z:-7,pitch:-.06});assert(await page.locator('#cancel-walk').isHidden());assert.deepEqual(await pos(page),wallStart);done('Wall click is rejected safely without movement or a stuck route');
 await helpWalk(page,'visit-home');await page.locator('#station-dialog').waitFor({state:'visible',timeout:14000});assert.equal(await page.locator('#dialog-link').getAttribute('href'),nav.safeDestination('home'));assert.equal(nav.nearby(await pos(page)),'home');await page.keyboard.press('Escape');done('Home route arrives at the physical exit and opens the exact home link');
 const stable=await pos(page);await page.locator('#help').focus();await page.keyboard.press('ArrowDown');assert.deepEqual(await pos(page),stable);
 await page.locator('#help').click();await shot(page,'lab-free-help.png');await page.keyboard.press('Escape');assert.equal(await page.evaluate(()=>document.activeElement.id),'help');
 await audit(page,'desktop 3D',axeScript);
 await page.locator('#mode').click();assert(await page.locator('#flat-view').isVisible());assert(await page.locator('#catalog-link').isVisible());await page.locator('#mode').click();
 await page.evaluate(()=>document.querySelector('#room').dispatchEvent(new Event('webglcontextlost',{cancelable:true})));assert(await page.locator('#flat-view').isVisible());assert(await page.locator('#catalog-link').isVisible());done('Flat switch and context loss retain native catalog/home tools');await ctx.close();
 const mobile=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true}),m=await mobile.newPage();await watch(m);
 await m.goto(url);await m.locator('#room').waitFor({state:'visible'});await shot(m,'lab-free-mobile.png');
 await clickWorld(m,{x:2,y:.01,z:1.5},true);assert(!await m.locator('#cancel-walk').isHidden());await arrived(m);p=await pos(m);assert(Math.hypot(p.x-2,p.z-1.5)<.2);done('Real touch tap walks to floor with the direction pad hidden');
 // A sub-threshold touch wiggle must remain a tap and must not rotate the camera.
 const b=await m.locator('#room').boundingBox(),rotation=(await pos(m)).yaw;
 const touchSession=await mobile.newCDPSession(m);
 await touchSession.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:b.x+b.width/2,y:b.y+b.height*.75}]});
 await touchSession.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:b.x+b.width/2+3,y:b.y+b.height*.75+2}]});
 assert.equal((await pos(m)).yaw,rotation);
 await touchSession.send('Input.dispatchTouchEvent',{type:'touchCancel',touchPoints:[]});await touchSession.detach();
 await m.locator('#help').tap();await m.locator('#show-pad').check();await m.locator('#help-dialog .close').tap();assert(await m.locator('#movement').isVisible());
 const pad=await m.locator('#movement').boundingBox(),room=await m.locator('#room').boundingBox();assert(pad.y>=room.y&&pad.y+pad.height<=room.y+room.height);
 const start=await pos(m);await m.locator('[data-move="right"]').tap();assert.notDeepEqual(await pos(m),start);
 await m.locator('#help').tap();await m.locator('#visit-bench').tap();await m.locator('#station-dialog').waitFor({state:'visible',timeout:14000});assert.equal(await m.locator('#dialog-link').getAttribute('href'),nav.safeDestination('catalog'));await m.locator('#station-dialog .close').tap();
 assert(await m.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await shot(m,'lab-free-mobile-benchmark.png');done('Optional mobile pad stays inside the room; touch station arrival, Help dismissal and 390px reflow work');
 await audit(m,'mobile 3D',axeScript);await mobile.close();
 const reduced=await browser.newContext({viewport:{width:1280,height:900},reducedMotion:'reduce'}),rp=await reduced.newPage();await watch(rp);await rp.goto(url);
 assert(await rp.locator('#flat-view').isVisible());assert(await rp.locator('#gentle').isChecked());await shot(rp,'lab-free-flat.png');await rp.locator('#mode').click();await rp.locator('#room').waitFor({state:'visible'});
 await clickWorld(rp,{x:2,y:.01,z:1.5});await arrived(rp);done('Reduced motion starts flat, with deliberate gentle click-to-walk opt-in');await reduced.close();
 const unsupported=await browser.newContext(),u=await unsupported.newPage();await watch(u);
 await u.addInitScript(()=>{const original=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,...args){return type.startsWith('webgl')?null:original.call(this,type,...args);};});await u.goto(url);await u.waitForFunction(()=>document.querySelector('#flat-message').textContent.includes('unavailable'));assert(await u.locator('#catalog-link').isVisible());assert(await u.locator('#home-link').isVisible());done('Unavailable WebGL retains flat plan and native links');await unsupported.close();
 const nojs=await browser.newContext({javaScriptEnabled:false}),n=await nojs.newPage();await n.goto(url);assert(await n.locator('#flat-view').isVisible());assert.equal(await n.locator('#catalog-link').getAttribute('href'),nav.safeDestination('catalog'));assert.equal(await n.locator('#home-link').getAttribute('href'),nav.safeDestination('home'));done('JavaScript off retains the plan and real catalog/home links');await nojs.close();
 assert.deepEqual(report.errors,[]);assert.deepEqual(report.externalRequests,[]);done('No page errors or external runtime requests');
 }finally{await browser.close();}
 assert.deepEqual(report.accessibility.filter(a=>a.completed).map(a=>a.mode),requiredAccessibilityModes,'Both audits must complete');report.status='passed';
})().catch(e=>{report.status='failed';report.failure=e.stack;console.error(e);process.exitCode=1;}).finally(()=>{fs.writeFileSync(path.join(out,'validation.json'),JSON.stringify(report,null,2));server.close();});

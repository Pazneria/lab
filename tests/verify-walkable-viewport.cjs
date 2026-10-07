// Lightweight layout only: WebGL disabled, room renderer replaced with a stub,
// vendor/entrant requests forbidden. Does not exercise any 3D scene or performance.
const assert=require('node:assert/strict'),fs=require('node:fs');
const {chromium}=require(process.env.LAB_PLAYWRIGHT_MODULE||'playwright');
const server=require('../scripts/serve-walkable.cjs');
const evidence={startedAt:new Date().toISOString(),scope:'CSS/DOM layout only. WebGL disabled; stub room renderer; no entrants.',checks:[],errors:[],forbiddenRequests:[]};
const file=process.env.LAB_LAYOUT_EVIDENCE||'lab-viewport-layout-evidence.json';
const save=()=>fs.writeFileSync(file,JSON.stringify(evidence,null,2)+'\n');
let service,browser;
(async()=>{
 try{
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));evidence.port=server.address().port;
  service=await chromium.launchServer({headless:true,executablePath:process.env.CHROME_PATH,args:['--disable-webgl','--disable-gpu']});
  evidence.browserPid=service.process().pid;evidence.launcherPid=process.pid;save();console.log('Layout browser started: '+evidence.browserPid);
  browser=await chromium.connect(service.wsEndpoint());
  const context=await browser.newContext({viewport:{width:1440,height:900}}),page=await context.newPage();
  page.on('pageerror',error=>evidence.errors.push(error.message));
  await context.route('**/*',route=>{
   const url=new URL(route.request().url());
   if(url.pathname.endsWith('/room.mjs'))return route.fulfill({contentType:'text/javascript',body:'export function createRoom(){window.layoutStub=true;return {draw(){window.stubDraws=(window.stubDraws||0)+1;},comparison(){},pick(){window.stubPicks=(window.stubPicks||0)+1;return null;},target(){},dispose(){}}}'});
   if(url.pathname.includes('/frozen/')||url.pathname.includes('/vendor/')){evidence.forbiddenRequests.push(url.href);return route.abort();}
   if(url.hostname!=='127.0.0.1')return route.fulfill({contentType:'application/json',body:'{"rows":[],"counts":{"votes":0},"rubric":{"rows":[]}}'});
   return route.continue();
  });
  const base=`http://127.0.0.1:${evidence.port}/lab/lab-space/`;
  await page.goto(base);await page.locator('#room').waitFor({state:'visible'});await page.waitForFunction(()=>window.layoutStub);
  async function checkBounds(width,height){
   await page.setViewportSize({width,height});await page.waitForTimeout(60);
   const box=await page.locator('#room').boundingBox();assert.deepEqual(box,{x:0,y:0,width,height});
   const overflow=await page.evaluate(()=>({w:document.documentElement.scrollWidth,h:document.documentElement.scrollHeight}));assert.ok(overflow.w<=width&&overflow.h<=height,JSON.stringify(overflow));
   for(const selector of ['.masthead','#visit-screen','#screen-controls','#help','#orientation']){
    const b=await page.locator(selector).boundingBox();assert.ok(b.x>=0&&b.y>=0&&b.x+b.width<=width+.1&&b.y+b.height<=height+.1,selector+JSON.stringify(b));
   }
   const head=await page.locator('.masthead').boundingBox(),actions=await page.locator('.view-top').boundingBox();
   assert.ok(head.x+head.width<=actions.x||actions.x+actions.width<=head.x||head.y+head.height<=actions.y||actions.y+actions.height<=head.y,'Header/actions overlap');
   await page.locator('#navigation-toggle').click();const menu=await page.locator('#tools').boundingBox();assert.ok(menu.x>=0&&menu.y>=0&&menu.x+menu.width<=width&&menu.y+menu.height<=height,'Menu outside viewport');
   await page.keyboard.press('Escape');assert.equal(await page.locator('#room-menu').getAttribute('open'),null);assert.equal(await page.evaluate(()=>document.activeElement.id),'navigation-toggle');
   evidence.checks.push(`${width}x${height}: full canvas, no overflow, visible overlays, bounded menu, Escape focus`);
  }
  for(const size of [[1440,900],[2560,1440],[1024,768],[850,600],[700,500],[667,375],[640,700],[390,844],[320,568]])await checkBounds(...size);
  await page.locator('#navigation-toggle').click();const picks=await page.evaluate(()=>window.stubPicks||0);
  // At 320x568 the open menu covers (160,250). Verify the dismissal point
  // reaches the canvas before clicking, so overlay changes fail explicitly.
  const outside={x:280,y:350};
  assert.equal(await page.evaluate(point=>document.elementFromPoint(point.x,point.y)?.id,outside),'room');
  await page.locator('#room').click({position:outside});assert.equal(await page.locator('#room-menu').getAttribute('open'),null);assert.equal(await page.evaluate(()=>window.stubPicks||0),picks);
  evidence.checks.push('Canvas gesture dismisses open navigation without activating room target');
  await page.locator('#screen-controls').click();await page.locator('#comparison-dialog').waitFor({state:'visible'});assert.equal(await page.locator('iframe').count(),0);assert.equal(await page.locator('[data-screen-choice="a"]').isDisabled(),true);await page.keyboard.press('Escape');assert.equal(await page.evaluate(()=>document.activeElement.id),'screen-controls');
  evidence.checks.push('Native comparison dialog opens/closes without entrant, vote remains gated, focus returns');
  await page.locator('#help').click();await page.locator('#show-pad').check();await page.keyboard.press('Escape');const pad=await page.locator('#movement').boundingBox();assert.ok(pad.x>=0&&pad.y>=0&&pad.x+pad.width<=320&&pad.y+pad.height<=568);
  evidence.checks.push('Direction controls remain inside narrow viewport');
  await page.emulateMedia({reducedMotion:'reduce'});await page.locator('#room-access').waitFor({state:'visible'});assert.equal(await page.locator('#enter-room').isVisible(),true);assert.equal(await page.locator('#access-worlds').isVisible(),true);
  await page.setViewportSize({width:667,height:320});const access=await page.locator('#room-access').boundingBox();assert.deepEqual(access,{x:0,y:0,width:667,height:320});
  evidence.checks.push('Reduced-motion fallback retains direct links and fits short viewport with internal scrolling');
  assert.deepEqual(evidence.forbiddenRequests,[]);assert.deepEqual(evidence.errors,[]);
  await context.close();
 }finally{
  if(browser)await browser.close();if(service)await service.close();await new Promise(resolve=>server.close(resolve));
  evidence.browserClosed=true;evidence.serverClosed=true;evidence.finishedAt=new Date().toISOString();save();
 }
 console.log('PASS: '+evidence.checks.length+' layout checks; no renderer, WebGL, vendor or entrant execution.');
})().catch(error=>{evidence.failure=error.stack;save();console.error(error.stack);process.exitCode=1;});

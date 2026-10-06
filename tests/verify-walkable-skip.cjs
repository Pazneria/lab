// Cross-page regression: preserve a saved Skip preference when rendering the room texture.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {chromium}=require(process.env.LAB_PLAYWRIGHT_MODULE||'playwright');
const server=require('../scripts/serve-walkable.cjs');
let browser;
const report={checks:[],errors:[]};
(async()=>{
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const base=`http://127.0.0.1:${server.address().port}/lab/`;
  browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
  const context=await browser.newContext({reducedMotion:'reduce'});
  const notebook=await context.newPage();
  notebook.on('pageerror',error=>report.errors.push(error.message));
  await notebook.goto(base+'walkable-3d/');
  await notebook.locator('.entry[data-entry]').last().waitFor();
  const seed={version:1,grades:{'alder-halt':{visuals:30,performance:null,fulfillment:null,total:null,notes:'Existing personal note',savedAt:'2026-10-01T00:00:00Z'}},preferences:{'bracken-hollow::bracken-hollow-opus':{entries:['bracken-hollow','bracken-hollow-opus'],choice:'tie',savedAt:'2026-10-01T00:00:00Z'}},opened:{'alder-halt':'test fixture','bracken-hollow':'test fixture'}};
  await notebook.evaluate(record=>localStorage.setItem('lab.walkable3d.judgments.v1',JSON.stringify(record)),seed);
  await notebook.reload();
  await notebook.locator('[data-choice="skip"]:enabled').waitFor();
  const room=await context.newPage();
  room.on('pageerror',error=>report.errors.push(error.message));
  await room.addInitScript(()=>{
    const original=CanvasRenderingContext2D.prototype.fillText;
    CanvasRenderingContext2D.prototype.fillText=function(text,...args){
      if(this.canvas.width===1280&&this.canvas.height===600&&String(text).startsWith('PAIR '))window.comparisonTextureHeading=text;
      return original.call(this,text,...args);
    };
  });
  await room.goto(base+'lab-space/');
  await room.waitForFunction(()=>window.comparisonTextureHeading?.startsWith('PAIR 1 /'));
  const readRecord=page=>page.evaluate(()=>JSON.parse(localStorage.getItem('lab.walkable3d.judgments.v1')));
  for(const [choice,label,stored] of [['a','YOUR CHOICE: A','alder-halt'],['b','YOUR CHOICE: B','bracken-hollow'],['tie','YOUR CHOICE: TIE','tie'],['skip','SKIPPED','skip']]){
    await notebook.bringToFront();
    await notebook.locator(`[data-choice="${choice}"]`).click();
    const saved=await readRecord(notebook);
    assert.equal(saved.preferences['alder-halt::bracken-hollow'].choice,stored);
    await room.bringToFront();
    await room.locator('#screen-controls').click();
    const heading=await room.evaluate(()=>window.comparisonTextureHeading);
    assert.ok(heading.endsWith(label),`Expected ${label} in actual texture heading; got ${heading}`);
    if(choice==='skip'){
      assert.equal(await room.locator('#screen-vote').textContent(),'This pair is skipped.');
      assert.ok(!heading.includes('YOUR CHOICE: B'));
    }
    assert.deepEqual(await readRecord(room),saved,'Rendering the room must not rewrite saved data');
    assert.deepEqual(saved.grades,seed.grades);
    assert.deepEqual(saved.preferences['bracken-hollow::bracken-hollow-opus'],seed.preferences['bracken-hollow::bracken-hollow-opus']);
    await room.locator('[aria-label="Return to room"]').click();
    report.checks.push(`Standalone ${choice} renders as ${label}; saved records preserved`);
  }
  const saved=await readRecord(room);
  await room.reload();
  await room.waitForFunction(()=>window.comparisonTextureHeading?.endsWith('SKIPPED'));
  assert.deepEqual(await readRecord(room),saved);
  assert.equal(await room.locator('iframe').count(),0);
  assert.deepEqual(report.errors,[]);
  report.checks.push('Skipped pair survives room reload without allocating any scene');
  report.passed=true;
  console.log('PASS: cross-page A/B/Tie/Skip texture labels, skipped dialog state, unchanged grades/other votes, reload preservation; no scene launched.');
})().catch(error=>{report.failure=error.message;console.error(error);process.exitCode=1;}).finally(async()=>{
  await browser?.close();await new Promise(resolve=>server.close(resolve));
  const out=path.join(__dirname,'../evidence');fs.mkdirSync(out,{recursive:true});
  fs.writeFileSync(path.join(out,'walkable-skip-validation.json'),JSON.stringify(report,null,2));
});

// CPU-only. Default: read-only deployed API. Optional local service catalog for prepublication checks.
const fs=require('node:fs'),crypto=require('node:crypto'),assert=require('node:assert/strict'),cp=require('node:child_process');
async function main(){
  const bytes=cp.execFileSync('git',['show','HEAD:walkable-3d/entries.json'],{cwd:require('node:path').resolve(__dirname,'..')});
  const host=JSON.parse(bytes),hash=crypto.createHash('sha256').update(bytes).digest('hex');
  const local=process.argv[2];
  if(local){
    const catalog=JSON.parse(fs.readFileSync(local));
    const fields=['id','title','promptId','comparisonModel','requestedConfiguration','availability','completionStatus'];
    const entries=host.entries.map(e=>Object.fromEntries(fields.filter(k=>e[k]!==undefined).map(k=>[k,e[k]])));
    assert.deepEqual(catalog.entries,entries,'Service entries differ from host');
    assert.equal(catalog.sourceSha256,hash,'Service manifest fingerprint differs');
  }else{
    const response=await fetch('https://walkable-worlds-voting.pazneria.chatgpt.site/api/v1/leaderboard',{signal:AbortSignal.timeout(30000)});
    assert.equal(response.status,200);
    assert.equal((await response.json()).catalog,hash,'Published service catalog drift: sync and publish service before completing host import');
  }
  console.log(`Voting catalog parity passed: ${host.entries.length} records, ${hash}`);
}
main().catch(e=>{console.error(e.message);process.exitCode=1;});

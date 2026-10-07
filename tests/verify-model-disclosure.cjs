// CPU-only regression: public names stay plain, detailed configuration retains effort/provenance.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{pathToFileURL}=require('node:url');
const root=path.resolve(__dirname,'..');
(async()=>{
 const {modelName}=await import(pathToFileURL(path.join(root,'walkable-3d/assets/comparisons.js')));
 const entries=JSON.parse(fs.readFileSync(path.join(root,'walkable-3d/entries.json'),'utf8')).entries;
 const opus=entries.filter(e=>e.comparisonModel==='opus');
 for(const entry of opus)assert.equal(modelName(entry),'Claude Opus 5.5');
 assert(opus.some(e=>/medium/.test(e.requestedConfiguration)),'Known medium effort retained');
 assert(opus.some(e=>/40/.test(e.requestedConfiguration)),'Known effort40 retained');
 assert(opus.some(e=>/unknown/.test(e.requestedConfiguration)),'Unknown effort retained');
 const source=fs.readFileSync(path.join(root,'walkable-3d/assets/benchmark.js'),'utf8');
 assert.match(source,/definitions\[0\]\.textContent=visible\?entry\.requestedConfiguration:/,'Reveal uses full recorded configuration');
 assert.match(source,/addDefinition\(dl, 'Model \/ effort',[^\n]+: entry\.requestedConfiguration\);/,'Initial inspector uses full recorded configuration');
 assert.match(source,/entry-meta span'\)\.textContent=visible\?modelName\(entry\)/,'Public badge uses plain name');
 console.log(`PASS ${opus.length} plain Claude labels; known medium/40 and unknown effort preserved in inspector.`);
})().catch(e=>{console.error(e);process.exitCode=1});

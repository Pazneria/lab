// Extract only frozen PR76 inputs. No source refresh or approval changes.
const fs=require('node:fs'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const dir='animation-studio',legacy=dir+'/index.html';
const original=fs.readFileSync(fs.existsSync(legacy)?legacy:dir+'/index.html');
const bundle=JSON.parse(original.toString().match(/<script id="bundle-data" type="application\/json">([\s\S]*?)<\/script>/)[1]);
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');

fs.mkdirSync(dir+'/minimal/assets',{recursive:true});
const inventory=JSON.parse(fs.readFileSync(dir+'/minimal/pinned-inventory.json','utf8'));
const records=bundle.records.map(r=>{
 const bytes=Buffer.from(r.data,'base64');assert.equal(hash(bytes),r.sha256);
 const pinned=inventory.find(i=>i.id===r.id);assert.ok(pinned,r.id);assert.equal(pinned.sha256,r.sha256);
 const file='assets/'+r.id+'.glb';fs.writeFileSync(dir+'/minimal/'+file,bytes);
 return {id:r.id,label:r.label,stableId:r.stableId,family:r.family,role:r.role,file,bytes:bytes.length,sha256:r.sha256,activeBindingAllowed:r.activeBindingAllowed,requiresReviewOptIn:r.requiresReviewOptIn,readiness:r.readiness,limits:r.limits,rigProductionAcceptance:r.rigProductionAcceptance,rigReview:r.rigReview,staticPoses:r.staticPoses};
});
fs.writeFileSync(dir+'/minimal/catalog.json',JSON.stringify({schema:1,sourceRevision:'cc4e8ada47cdd6ae34ca6697596bdb0bf63bde8d',legacySha256:hash(original),records},null,2)+'\n');
console.log(JSON.stringify({models:records.length,eligible:records.filter(r=>r.activeBindingAllowed&&!r.requiresReviewOptIn).length,legacyBytes:original.length,legacySha256:hash(original),catalogBytes:fs.statSync(dir+'/minimal/catalog.json').size}));

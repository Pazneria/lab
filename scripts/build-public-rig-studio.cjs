// CPU-only public derivative; reuse the reviewed payload, never refresh source assets.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..'),studio=path.join(root,'animation-studio'),source=path.join(studio,'rig-review/source');
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const input=process.argv[2]?path.resolve(process.argv[2]):path.join(studio,'index.html');
const bytes=fs.readFileSync(input),html=bytes.toString('utf8');
if(process.argv[2])assert.equal(sha(bytes),'5bdaca96df0f1fbbf0b6078af17ccd9de24798d5823c2eab991f2ca60a79d569','Use the tested private checkpoint only');
const block=(text,id)=>JSON.parse(text.match(new RegExp('<script id="'+id+'" type="application/json">([\\s\\S]*?)</script>'))[1]);
const encode=o=>JSON.stringify(o).replaceAll('<','\\u003c');
function publicMetadata(v){
 if(Array.isArray(v))return v.map(publicMetadata);
 if(v&&typeof v==='object')return Object.fromEntries(Object.entries(v).map(([k,x])=>[k,publicMetadata(x)]));
 if(typeof v==='string'&&/^[A-Z]:[\\/]/i.test(v))return v.split(/[\\/]/).at(-1);
 return v;
}
const raw=block(html,'bundle-data'),bundle=publicMetadata(raw),motion=block(html,'motion-editor-data');
delete bundle.studioIntake;delete bundle.ownerReceipt;
for(const r of [...bundle.records,bundle.candidate,bundle.motion])assert.equal(sha(Buffer.from(r.data,'base64')),r.sha256,r.id||'motion');
const child=block(motion.html,'bundle-data');motion.html=motion.html.replace(/(<script id="bundle-data" type="application\/json">)[\s\S]*?(<\/script>)/,(_,a,b)=>a+encode(publicMetadata(child))+b);
motion.html=motion.html.replaceAll('Private local study','Local motion study');
let scripts=['core.mjs','renderer.mjs','inspection.mjs','family.mjs','app.mjs','host.mjs'].map(n=>fs.readFileSync(path.join(source,n),'utf8').replace(/^import .*?;\s*$/gm,'').replace(/\bexport (?=(?:const|function|class)\b)/g,''));
scripts.splice(scripts.length-1,0,...['navigation.mjs','modes.mjs'].map(n=>fs.readFileSync(path.join(studio,n),'utf8').replace(/^export /gm,'')));
const script=scripts.join('\n');assert.ok(!script.toLowerCase().includes('</script'));
const output=fs.readFileSync(path.join(source,'index.template.html'),'utf8').replace('__BUNDLE__',encode(bundle)).replace('__MOTION_EDITOR__',encode(motion)).replace('__APP__',script);
assert.ok(!/__BUNDLE__|__MOTION_EDITOR__|__APP__/.test(output));assert.ok(!/[A-Z]:\\\\Users\\\\|libfile_[a-z0-9]+/i.test(output));
fs.writeFileSync(path.join(studio,'index.html'),output);
console.log(JSON.stringify({htmlBytes:Buffer.byteLength(output),sha256:sha(output),pinnedModels:bundle.records.length+1,assetBytesChanged:false,graphics:false}));

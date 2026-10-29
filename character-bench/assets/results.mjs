import {validateManifest,safeAssetPath} from './contracts.mjs';
const $=id=>document.getElementById(id);
function node(tag,text,className){const n=document.createElement(tag);n.textContent=text;if(className)n.className=className;return n;}
export function entrySearchText(entry,prompt){return [prompt?.title,entry.id,entry.provenance?.modelLabel,entry.provenance?.requestedModel].filter(Boolean).join(' ').toLowerCase();}
// Historical records remain byte-for-byte intact; omit local paths from display.
export function publicReceipt(text){return String(text).replace(/[A-Za-z]:[\\/][^\s\x22\x27\x60<>]+/g,'[local path omitted]');}
export function archiveStatus(entry){if(entry.admission.status!=='verified')return entry.admission.reason||entry.admission.status;if(entry.comparisonEligible===false)return 'Available for inspection; excluded from public comparison pending prompt mapping.';return 'CPU compatibility checked; visual quality unscored.';}
function render(catalog){
 const query=$('search').value.trim().toLowerCase(),model=$('model').value;
 const entries=catalog.entries.filter(e=>{const p=catalog.prompts.find(p=>p.id===e.promptId);return (!model||e.provenance?.modelLabel===model)&&entrySearchText(e,p).includes(query);}).sort((a,b)=>Number(!!b.provenance?.batchAttemptId)-Number(!!a.provenance?.batchAttemptId));
 $('attempts').replaceChildren();
 for(const e of entries){
  const p=e.provenance||{},prompt=catalog.prompts.find(p=>p.id===e.promptId),card=node('article','', 'attempt-card');card.id=e.id;
  card.append(node('p',p.batchAttemptId?'OCTOBER 29 / '+p.batchAttemptId:'HISTORICAL ATTEMPT','eyebrow'),node('h2',prompt.title),node('p',p.modelLabel||'Model not recorded','attempt-model'),node('p',archiveStatus(e),'attempt-status'));
  if(safeAssetPath(e.asset?.path)){
   const inspect=node('a','Inspect in 3D');inspect.href='inspect.html?attempt='+encodeURIComponent(e.id);card.append(inspect,node('span',' / '));
   const a=node('a','Download original GLB · '+(e.asset.byteLength/1048576).toFixed(2)+' MiB');a.href=e.asset.path;a.download='';card.append(a);
   card.append(node('p','SHA-256 '+e.asset.sha256,'asset-hash'));
  }
  if(e.votingAvailable===false)card.append(node('p',e.votingUnavailableReason,'attempt-status'));
  const details=node('details','');details.append(node('summary','Timing, evidence and limitations'));
  for(const [label,value]of [['Attempt',e.id],['Requested model',p.requestedModel],['Requested reasoning',p.requestedReasoning],['Requested routing',p.requestedServiceTier||p.routingRequested],['Serving identity',p.verifiedModel||'Not independently exposed'],['Source timing',p.timingDisclosure],['Prompt evidence',p.sourcePromptEvidence],['Producer checks',p.producerChecks],['Host checks',p.hostChecks],['Limitations',Array.isArray(p.limitations)?p.limitations.join('\n'):p.limitations]]){
   if(value){details.append(node('h3',label),node('p',publicReceipt(value)));}
  }
  const brief=node('details','');brief.append(node('summary','Exact canonical prompt'),node('p',prompt.sha256,'asset-hash'),node('pre',prompt.text));details.append(brief);
  if(p.sourceHandoff){const receipt=node('details','');receipt.append(node('summary','Producer handoff (local paths omitted)'),node('pre',publicReceipt(p.sourceHandoff)));details.append(receipt);}
  if(p.timing){const timing=node('details','');timing.append(node('summary','Source timing and normalized UTC'),node('pre',JSON.stringify(p.timing,null,2)));details.append(timing);}
  if(p.batchAttemptId){for(const [name,path]of [['Batch source evidence','data/source-evidence.json'],['Independent audit corrections','data/audit-corrections-20261029.json']]){const a=node('a',name);a.href=path;details.append(a,node('span',' '));}}
  card.append(details);$('attempts').append(card);
 }
 $('status').textContent=entries.length+' of '+catalog.entries.length+' recorded attempts. Files are downloaded only when selected.';
}
async function boot(){
 try{const response=await fetch('data/admission.json',{cache:'no-cache',redirect:'error'});if(!response.ok)throw Error('Could not load attempt records');const catalog=validateManifest(await response.json());
  for(const name of [...new Set(catalog.entries.map(e=>e.provenance?.modelLabel).filter(Boolean))].sort()){const option=node('option',name);option.value=name;$('model').append(option);}
  $('search').addEventListener('input',()=>render(catalog));$('model').addEventListener('change',()=>render(catalog));render(catalog);
  const selected=new URL(location.href).searchParams.get('attempt');if(selected)document.getElementById(selected)?.scrollIntoView();
 }catch(error){$('status').textContent=error.message+'. The admission manifest remains available.';}
}
if(typeof document!=='undefined')boot();

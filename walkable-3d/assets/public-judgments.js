import {PUBLIC_VOTING_ORIGIN} from './public-config.js';
const storageKey='lab.walkable3d.public.v1';
const listeners=new Set();
let local={token:null,expiresAt:0,receipts:{},pending:{},sequence:{}},sessionRequest=null,queue=Promise.resolve(),snapshot=null,loading=null,lastError='';
try{const value=JSON.parse(localStorage.getItem(storageKey)||'null');if(value&&typeof value==='object')local={...local,...value};}catch{}
const refreshLocal=()=>{try{const value=JSON.parse(localStorage.getItem(storageKey)||'null');if(value&&typeof value==='object')local={...local,...value};}catch{}};
const persist=()=>{try{localStorage.setItem(storageKey,JSON.stringify(local));return true;}catch{return false;}};
export const publicVotingEnabled=Boolean(PUBLIC_VOTING_ORIGIN);
const pairKey=entries=>[...entries].sort().join('::');
const notify=()=>listeners.forEach(fn=>fn());
export function subscribePublicJudgments(fn){listeners.add(fn);return()=>listeners.delete(fn);}
export function publicRubricUrl(entry){return publicVotingEnabled?new URL('/rubric/'+encodeURIComponent(entry.id),PUBLIC_VOTING_ORIGIN).href:null;}
async function request(path,body,token){
  const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),15000);
  try{
    const headers=body?{'Content-Type':'application/json'}:{};if(token)headers.Authorization='Bearer '+token;
    const response=await fetch(new URL('/api/v1/'+path,PUBLIC_VOTING_ORIGIN),{method:body?'POST':'GET',headers,body:body?JSON.stringify(body):undefined,credentials:'omit',signal:controller.signal});
    const result=await response.json();
    if(!response.ok)throw Object.assign(new Error(result.error||'Public service unavailable'),{status:response.status});
    return result;
  }finally{clearTimeout(timer);}
}
async function browserToken(){
  const obtain=async()=>{
    try{const shared=JSON.parse(localStorage.getItem(storageKey)||'null');if(shared?.token){local.token=shared.token;local.expiresAt=shared.expiresAt;}}catch{}
    if(local.token){if(local.expiresAt<=Date.now())throw new Error('Your anonymous browser credential has expired; it has not been silently replaced.');return local.token;}
    if(!persist())throw new Error('Browser storage is required for public duplicate protection. Your private session still works.');
    const result=await request('session',{});local.token=result.token;local.expiresAt=result.expiresAt;
    if(!persist())throw new Error('The anonymous credential could not be saved. No public vote was submitted.');
    return result.token;
  };
  if(!sessionRequest)sessionRequest=(navigator.locks?navigator.locks.request('lab-public-voter',obtain):obtain()).finally(()=>{sessionRequest=null;});
  return sessionRequest;
}
export function loadPublicLeaderboard(force=false){
  if(!publicVotingEnabled)return Promise.resolve(null);
  if(loading)return force?loading.then(()=>loadPublicLeaderboard(true)):loading;
  if(snapshot&&!force)return Promise.resolve(snapshot);
  loading=request('leaderboard').then(data=>{snapshot=data;lastError='';notify();return data;}).catch(error=>{lastError=error.message;notify();return null;}).finally(()=>{loading=null;});
  return loading;
}
export function submitPublicVote(entries,choice,reportedBlind){
  if(!publicVotingEnabled)return Promise.resolve(null);
  const ids=entries.map(entry=>typeof entry==='string'?entry:entry.id),key=pairKey(ids);
  const send=async()=>{
    refreshLocal();
    // This path is called only by a new explicit vote/withdrawal action. It never
    // iterates, migrates or uploads the private legacy preference/grade record.
    const old=local.pending[key],body=old&&old.choice===choice?old:{entries:ids,choice,reportedBlind,requestId:crypto.randomUUID(),intent:Math.max(local.sequence[key]||0,old?.intent||0,local.receipts[key]?.intent||0)+1};
    local.pending[key]=body;local.sequence[key]=body.intent;
    if(!persist())throw new Error('Browser storage is required to retry public votes safely. Your private choice is unchanged.');
    try{
      const receipt=await request('vote',body,await browserToken());
      if(receipt.status==='superseded'){
        local.sequence[key]=Math.max(local.sequence[key],receipt.currentIntent||body.intent);delete local.pending[key];persist();
        throw new Error('A newer preference for this pair is already recorded. Choose again to submit your current preference.');
      }
      local.receipts[key]=receipt;delete local.pending[key];persist();
      await loadPublicLeaderboard(true);return receipt;
    }catch(error){
      // Do not silently mint a fresh identity when a stored token is rejected.
      // That could multiply a person's already-counted votes.
      lastError=error.message;notify();throw error;
    }
  };
  const serialized=()=>navigator.locks?navigator.locks.request('lab-public-vote-write',send):send();
  const task=queue.then(serialized,serialized);queue=task.catch(()=>{});return task;
}
export function hasPublicVote(entries){if(!publicVotingEnabled)return false;refreshLocal();const key=pairKey(entries.map(e=>e.id));return Boolean(local.receipts[key]?.status==='saved'||local.pending[key]);}
function node(tag,text,className){const el=document.createElement(tag);if(text!==undefined)el.textContent=text;if(className)el.className=className;return el;}
function table(caption,headings,rows){
  const wrap=node('div',undefined,'leaderboard-scroll');wrap.tabIndex=0;wrap.setAttribute('role','region');wrap.setAttribute('aria-label',caption);
  const result=node('table');result.append(node('caption',caption));const header=node('tr');
  headings.forEach(label=>{const th=node('th',label);th.scope='col';header.append(th);});const thead=node('thead');thead.append(header);result.append(thead);
  const body=node('tbody');rows.forEach(values=>{const tr=node('tr');values.forEach((value,i)=>{const td=node(i?'td':'th',String(value));if(!i)td.scope='row';tr.append(td);});body.append(tr);});result.append(body);wrap.append(result);return wrap;
}
export function renderPublicLeaderboard(target){
  if(!target)return;target.hidden=!publicVotingEnabled;if(!publicVotingEnabled)return;
  const heading=node('h3','Public model leaderboard'),scope=node('p','Shared anonymous A/B preferences · rubric scores are separate','leaderboard-scope');
  target.replaceChildren(heading,scope);
  const refresh=node('button','Refresh public leaderboard');refresh.type='button';refresh.addEventListener('click',()=>{refresh.disabled=true;loadPublicLeaderboard(true).finally(()=>{refresh.disabled=false;});});target.append(refresh);
  if(!snapshot){target.append(node('p',lastError?'Public leaderboard unavailable. '+lastError:'Loading public judgments. No private records are uploaded.','small'));return;}
  const counts=snapshot.counts||{},rows=snapshot.rows||[];
  target.append(node('p',`${counts.votes||0} current public pairwise judgments from ${counts.browsers||0} anonymous browser credentials. A credential is not a verified person. Latest preference per browser/pair only; retries add no matches.`,'small'));
  if(!Number(counts.votes))target.append(node('p','No public votes yet. Existing private votes have not been imported.'));
  target.append(table('Elo-style preference ratings',['Model','Rating','Wins','Ties','Losses','Matches','Voting browsers','Prompts','Status'],rows.map(r=>[r.model==='opus'?'Claude Opus 5.5':r.model,r.rating??'—',r.wins,r.ties,r.losses,r.matches,r.votingBrowsers,r.prompts,r.matches?(r.provisional?'Provisional':'Sample threshold met'):'Unranked'])));
  const grades=snapshot.rubric?.rows||[];
  target.append(table('Separate public rubric averages · signed-in submissions',['Model','Submitted grades','Accounts','Visuals /45','Performance /35','Fulfillment /20','Total /100'],grades.map(r=>[r.model==='opus'?'Claude Opus 5.5':r.model,r.grades,r.accounts,...['visuals','performance','fulfillment','total'].map(key=>Number(r[key]).toFixed(1))])));
  if(!grades.length)target.append(node('p','No public rubric submissions yet. Your private notebook scores are unchanged.','small'));
  const details=node('details'),summary=node('summary','Rating method, coverage and privacy');details.append(summary);
  for(const text of snapshot.disclosures||[])details.append(node('p',text,'small muted'));
  details.append(node('p',`Method ${snapshot.settings?.version}; baseline ${snapshot.settings?.baseline}; Elo scale ${snapshot.settings?.scale}; prior precision ${snapshot.settings?.priorPrecision}. Updated ${snapshot.updatedAt}.`,'small'));
  target.append(details);if(lastError)target.append(node('p','Showing the last received public snapshot. '+lastError,'small'));
}

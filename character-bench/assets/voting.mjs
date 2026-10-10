// Shared judgments live in D1. Browser storage holds only this credential and a
// retry ledger; it is never the public vote authority or leaderboard.
export const VOTING_ORIGIN='https://walkable-worlds-voting.pazneria.chatgpt.site';
export const STORAGE_KEY='lab.characterbench.public.v1';
export function createVotingClient({fetcher=globalThis.fetch,storage=globalThis.localStorage,crypto=globalThis.crypto,locks=globalThis.navigator?.locks,origin=VOTING_ORIGIN}={}) {
  let queue=Promise.resolve();
  const read=()=>{try {const raw=storage.getItem(STORAGE_KEY),data=raw===null?{}:JSON.parse(raw);if(!data||typeof data!=='object'||Array.isArray(data))throw Error('Invalid record');return {...data,receipts:data.receipts||{},pending:data.pending||{}};}catch{throw Object.assign(Error('The browser voting record could not be read. No replacement credential has been created.'),{blocked:true});}};
  const save=data=>{try{storage.setItem(STORAGE_KEY,JSON.stringify(data));}catch{throw Error('Browser storage is required to protect retries. No new vote was sent.');}};
  const keyOf=pair=>pair.map(e=>typeof e==='string'?e:e.id).sort().join('::');
  async function request(path,body,token) {
    const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),15000);
    try {
      const response=await fetcher(new URL('/api/character/v1/'+path,origin),{method:body?'POST':'GET',headers:{...(body?{'Content-Type':'application/json'}:{}),...(token?{Authorization:'Bearer '+token}:{})},body:body?JSON.stringify(body):undefined,credentials:'omit',redirect:'error',signal:controller.signal});
      const value=await response.json();
      if(!response.ok)throw Object.assign(Error(response.status===401?'The browser credential expired or was rejected. It has not been replaced.':response.status===429?'Voting is temporarily rate limited. Retry later.':response.status===409?'The vote or catalog changed. Reload and try again.':'The vote service is unavailable. Retry this request.'),{status:response.status});
      return value;
    }catch(error){if(error.name==='AbortError')throw Error('Vote confirmation timed out. Retry the same request.');throw error;}
    finally{clearTimeout(timer);}
  }
  async function token(data) {
    if(data.token){if(!/^[a-f0-9]{64}$/.test(data.token)||data.expiresAt<=Date.now())throw Error('The browser credential expired. It has not been replaced.');return data.token;}
    save(data);
    const result=await request('session',{});
    if(!/^[a-f0-9]{64}$/.test(result.token)||!Number.isFinite(result.expiresAt)||result.expiresAt<=Date.now())throw Error('The service returned an invalid browser credential. No vote was sent.');
    data.token=result.token;data.expiresAt=result.expiresAt;save(data);return data.token;
  }
  function validateReceipt(receipt,ids,body=null) {
    if(receipt?.scope!=='character-public-anonymous'||!Array.isArray(receipt.entries)||receipt.entries.join('::')!==[...ids].sort().join('::')||!Number.isSafeInteger(receipt.intent)||receipt.intent<0||!['saved','withdrawn','empty','superseded'].includes(receipt.status))throw Error('The service did not confirm this pair. Retry safely.');
    if(body&&(receipt.requestId!==body.requestId||receipt.intent!==body.intent||receipt.choice!==body.choice||!['saved','withdrawn','superseded'].includes(receipt.status)))throw Error('The service did not confirm this request. Retry safely.');
    if(receipt.status==='saved'&&!['tie',...ids].includes(receipt.choice))throw Error('The service returned an invalid preference. Retry safely.');
    if(body&&receipt.status!== 'superseded'&&receipt.status!==(body.choice==='withdraw'?'withdrawn':'saved'))throw Error('The service did not confirm the requested action. Retry safely.');
    return receipt;
  }
  async function current(pair,data=read()) {
    const ids=pair.map(e=>typeof e==='string'?e:e.id);
    if(!data.token)return {entries:[...ids].sort(),status:'empty',intent:0,scope:'character-public-anonymous'};
    return validateReceipt(await request('vote?'+ids.map(id=>'entry='+encodeURIComponent(id)).join('&'),undefined,await token(data)),ids);
  }
  const serialized=fn=>locks.request('lab-characterbench-vote-write',fn);
  function submit(pair,choice,catalogSha256,{reportedBlind=true,retryOnly=false}={}) {
    if(!locks?.request)return Promise.reject(Object.assign(Error('Safe voting requires Web Locks in this browser. Use a browser with Web Locks enabled; no vote or replacement credential was created.'),{blocked:true}));
    const send=async()=>{
      const data=read(),key=keyOf(pair),ids=pair.map(e=>e.id),old=data.pending[key];
      if(retryOnly&&!old)throw Error('There is no pending request for this pair.');
      let body=old;
      if(old&&(!retryOnly&&old.choice!==choice))throw Error('Retry the pending request before changing this pair.');
      if(!body){
        const bearer=await token(data),previous=await current(pair,data);
        body={entries:ids,assetSha256:pair.map(e=>e.asset.sha256),promptId:pair[0].promptId,promptSha256:pair[0].promptSha256,catalogSha256,choice,reportedBlind:reportedBlind&&previous.status!=='saved',requestId:crypto.randomUUID(),intent:previous.intent+1};
        data.pending[key]=body;save(data);
        data.token=bearer;
      }
      let receipt;
      try{receipt=validateReceipt(await request('vote',body,await token(data)),body.entries,body);}
      catch(error){
        if([400,403,404,409,413,415].includes(error.status)){
          // A definite rejection is different from an unknown transport result.
          // Reconcile current server intent before releasing this pending request.
          const authoritative=await current(pair,data);
          data.receipts[key]=authoritative;delete data.pending[key];save(data);error.terminal=true;
        }
        throw error;
      }
      if(receipt.status==='superseded'){
        delete data.pending[key];save(data);throw Error('A newer preference is already stored. Reload to see it.');
      }
      data.receipts[key]=receipt;delete data.pending[key];data.lastPair={promptId:pair[0].promptId,ids:body.entries};
      // Server acceptance is authoritative even if local receipt storage fails.
      let storageWarning='';try{save(data);}catch{storageWarning='The vote is saved on the server; browser storage could not be updated. Reload checks the server before voting again.';}
      return {...receipt,storageWarning};
    };
    const task=queue.then(()=>serialized(send),()=>serialized(send));queue=task.catch(()=>{});return task;
  }
  return {submit,current,keyOf,pending:pair=>{try{return read().pending[keyOf(pair)]||null;}catch{return null;}},
    remember(pair){try{const data=read();data.lastPair={promptId:pair[0].promptId,ids:pair.map(e=>e.id)};save(data);}catch{};},
    remembered(promptId){try{const p=read().lastPair;return (promptId===undefined||p?.promptId===promptId)&&Array.isArray(p?.ids)&&p.ids.length===2?p.ids:null;}catch{return null;}},
    async leaderboard(promptId=null){const result=await request('leaderboard'+(promptId?'?prompt='+encodeURIComponent(promptId):''));if(result.scope!=='CharacterBench public anonymous A/B preferences'||!Array.isArray(result.rows)||!Number.isSafeInteger(result.counts?.votes)||result.counts.votes<0)throw Error('Invalid leaderboard response');return result;}
  };
}

export function renderLeaderboard(target,data,document=globalThis.document) {
  const node=(tag,text)=>{const el=document.createElement(tag);el.textContent=String(text);return el;};
  target.replaceChildren(node('p',`${data.counts.votes} judgments from ${data.counts.browsers||0} anonymous browser credentials.`));
  if(!data.counts.votes)target.append(node('p','No public votes yet.'));
  const table=document.createElement('table');table.append(node('caption','CharacterBench preference ratings'));
  const head=document.createElement('tr');for(const label of ['Model / evidence','Rating','Wins','Ties','Losses','Matches','Browsers','Prompts','Status']){const th=node('th',label);th.scope='col';head.append(th);}const thead=document.createElement('thead');thead.append(head);table.append(thead);
  const body=document.createElement('tbody');for(const row of data.rows){const tr=document.createElement('tr');[row.model,row.rating??'—',row.wins,row.ties,row.losses,row.matches,row.votingBrowsers,row.prompts,row.matches?(row.provisional?'Provisional':'Sample threshold met'):'Unranked'].forEach((value,i)=>{const cell=node(i?'td':'th',value);if(!i)cell.scope='row';tr.append(cell);});body.append(tr);}table.append(body);target.append(table);
  const details=document.createElement('details');details.append(node('summary','Rating method'));
  for(const text of data.disclosures||[])details.append(node('p',text));
  details.append(node('p',`Method ${data.settings?.version}. Updated ${data.updatedAt}.`));target.append(details);
}

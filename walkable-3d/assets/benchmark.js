import {modelName} from './comparisons.js';
import {createViewer} from './viewer.js';
import {createGradeForm,renderLeaderboard} from './judgments.js';
import {comparisonKey,randomComparison,hasRandomComparison,isOpenable,unavailableLabel,unavailableSummary} from './comparisons.js';
import {publicVotingEnabled,submitPublicVote,hasPublicVote,loadPublicLeaderboard,renderPublicLeaderboard,subscribePublicJudgments} from './public-judgments.js';
/* The Lab host owns this file. Frozen entrant programs are never evaluated here. */
(() => {
  'use strict';
  const $ = (s) => document.querySelector(s);
  const key = 'lab.walkable3d.judgments.v1';
  const blank = () => ({ version: 1, grades: {}, preferences: {}, opened: {} });
  let record = blank(), persistent = true, entries = [], failedEntries = [], allEntries = [], prompts = [], versions = [], promptId = '01', promptRequest = 0, pairs = [], pairIndex = 0;
  const openedThisComparison=new Set();
  const publicStatus=new Map();
  let canShuffle=false,revealed=false,labelsSeenThisComparison=false;
  const viewer=createViewer({gradeForm,gradeLabelFor:entry=>`${selected()[0]?.id===entry.id?'A':selected()[1]?.id===entry.id?'B':'Scene'} / ${entry.title} — ${modelVisible(entry)?modelName(entry):'Model hidden until reveal'}`,onReady(entry){if(entry.availability==='failed')return;if(selected().some(e=>e.id===entry.id))openedThisComparison.add(entry.id);refresh();record.opened[entry.id]=new Date().toISOString();save();},onClose:updateVote});
  const open=(...args)=>viewer.open(...args),close=(...args)=>viewer.close(...args);
  try {
    const saved = JSON.parse(localStorage.getItem(key) || 'null');
    if (saved?.version === 1) for (const field of ['grades', 'preferences', 'opened']) {
      if (saved[field] && typeof saved[field] === 'object' && !Array.isArray(saved[field])) record[field] = saved[field];
    }
    localStorage.setItem(key, JSON.stringify(record));
  } catch { persistent = false; }
  function storageState() {
    $('#storage-state').textContent = persistent ? 'Saved on this device in this browser only. Clearing browser data removes these records.' : 'Browser storage is unavailable. Judgments last for this page session only; export them before leaving.';
  }
  function save() {
    try { localStorage.setItem(key, JSON.stringify(record)); } catch { persistent = false; }
    storageState(); updateLeaderboard();
  }
  function refresh() {
    if(!persistent)return;
    try {const saved=JSON.parse(localStorage.getItem(key));if(saved?.version===1)for(const field of ['grades','preferences','opened'])if(saved[field]&&typeof saved[field]==='object'&&!Array.isArray(saved[field]))record[field]=saved[field];}catch{persistent=false;}
  }
  addEventListener('storage',event=>{if(event.key===key){refresh();updateVote();storageState();updateLeaderboard();}});
  function el(tag, text, className) {
    const node = document.createElement(tag);
    if (text !== undefined) node.textContent = text;
    if (className) node.className = className;
    return node;
  }
  const selected = () => pairs[pairIndex] || entries.slice(0, 1);
  const pairKey = () => comparisonKey(selected());
  const hasOpenedBoth = () => selected().length===2&&selected().every(e=>openedThisComparison.has(e.id));
  const titleFor = (entry) => entry.title;
  function link(label, href) {
    const a = el('a', label); a.href = href; return a;
  }
  function addDefinition(dl, label, value) {
    dl.append(el('dt', label), el('dd', value));
  }
  function gradeForm(entry) {
    return createGradeForm(entry,{getRecord:()=>record,refresh,save,isPersistent:()=>persistent,onChange:updateLeaderboard});
  }
  function updateLeaderboard(){renderLeaderboard($('#model-leaderboard'),allEntries,record,persistent);}
  const modelVisible=entry=>!$('#blind').checked||(revealed&&selected().some(e=>e.id===entry.id));
  function updateLabels(){
    const choice=record.preferences[pairKey()]?.choice;
    for(const entry of [...selected(),...failedEntries]){
      const article=document.querySelector(`[data-entry="${entry.id}"]`);if(!article)continue;
      const visible=modelVisible(entry);
      article.querySelector('.entry-meta span').textContent=visible?modelName(entry):'Model label hidden';
      const definitions=article.querySelectorAll('dd');
      definitions[0].textContent=visible?entry.requestedConfiguration:'Model labels hidden until voting or an explicit reveal.';
      definitions[1].textContent=visible?entry.modelDisclosure:'Reveal labels to see the recorded configuration and model/effort disclosure.';
      article.dataset.preferred=String(revealed&&choice===entry.id);
      article.dataset.tied=String(revealed&&choice==='tie'&&selected().some(e=>e.id===entry.id));
    }
  }
  function inspector(entry) {
    const details = el('details', undefined, 'inspector');
    details.append(el('summary', 'Inspect build & add your grade'));
    const dl = el('dl');
    addDefinition(dl, 'Model / effort', $('#blind').checked ? 'Model labels hidden. Uncheck “Hide model labels” to reveal the requested configuration.' : entry.requestedConfiguration);
    addDefinition(dl, 'Disclosure', $('#blind').checked ? 'The exact serving model and effort were not exposed to the producer. Reveal labels to see the parent-requested configuration and full disclosure.' : entry.modelDisclosure);
    if(entry.runtimeVerification)addDefinition(dl,'Host runtime QA',entry.runtimeVerification+'; opening this viewer is not an independent test pass.');
    addDefinition(dl, 'Build window', entry.buildWindow);
    addDefinition(dl, 'Interruptions', entry.interruptions);
    addDefinition(dl, 'Controls', entry.controls);
    addDefinition(dl, 'Producer checks', entry.producerChecks);
    addDefinition(dl, 'Frame evidence', entry.performanceEvidence);
    if (entry.archiveKind) addDefinition(dl, 'Preservation record', entry.archiveKind);
    addDefinition(dl, 'Archive SHA-256', entry.archiveSha256);
    const version=versions.find(v=>v.id===entry.promptVersion);
    if(version){addDefinition(dl,'Prompt version',version.id);addDefinition(dl,'Prompt SHA-256',version.sha256);}
    if(entry.promptDisclosure) addDefinition(dl,'Submitted prompt disclosure',entry.promptDisclosure);
    details.append(dl, el('p', 'Producer diagnostics use different runs and settings. These are not final grades or a controlled performance comparison.', 'small muted'));
    const list = el('ul'); entry.limitations.forEach(item => list.append(el('li', item))); details.append(list);
    const links = el('div', undefined, 'source-links');
    entry.documents.forEach(doc => links.append(link(doc.label, `entries/${entry.id}/${doc.path}`)));
    if(version) links.append(link('View submitted prompt', `?prompt=${entry.promptId}&version=${version.id}#full-prompt`));
    links.append(link('Source hashes', `entries/${entry.id}/provenance.json`)); details.append(links);
    details.append(el('p', 'Opening source documents may reveal model information. Original archives and raw captures are retained outside this site; their hashes and retention locations remain in provenance.', 'blind-note'), gradeForm(entry));
    return details;
  }
  function card(entry, index) {
    const article = el('article', undefined, 'entry'); article.dataset.entry = entry.id;
    const top = el('div', undefined, 'entry-top');
    top.append(el('span', `ENTRY ${String.fromCharCode(65 + index)}`, 'slot'), el('span', entry.completionStatus==='partial'?'Partial handoff · runtime unverified':entry.availability==='unverified'?'Frozen build · runtime unverified':'Frozen build · ready', 'ready')); article.append(top);
    const preview = el('button', undefined, 'preview'); preview.type = 'button'; preview.dataset.open = entry.id; preview.setAttribute('aria-label', `Open ${entry.title}`);
    if(entry.previewAvailable===false){
      preview.classList.add('no-preview');
      preview.append(el('strong','Preview not captured'),el('span','Open the frozen build to inspect it. No scene runs until you choose to open it.','preview-note'));
    }else{
      const img = el('img'); img.src = `entries/${entry.id}/preview.jpg`; img.width = 960; img.height = 600; img.alt = entry.previewAlt; img.decoding = 'async';
      img.addEventListener('error', () => { img.hidden = true; preview.prepend(el('span', 'Preview unavailable. You can still open the scene.', 'image-error')); }, { once: true });
      preview.append(img);
    }
    preview.append(el('span', '↗ Open walkable scene', 'open-label'));
    preview.addEventListener('click', () => open(entry, preview)); article.append(preview);
    const body = el('div', undefined, 'entry-body'); body.append(el('h3', titleFor(entry)), el('p', entry.description));
    const meta = el('div', undefined, 'entry-meta'); meta.append(el('span', $('#blind').checked ? 'Model label hidden' : modelName(entry)), el('span', `Desktop · ${entry.webgl || 'WebGL 2'}`)); body.append(meta);
    article.append(body, inspector(entry)); return article;
  }
  function failedCard(entry) {
    const article=el('article',undefined,'entry failed-entry');article.dataset.entry=entry.id;
    const top=el('div',undefined,'entry-top');top.append(el('span','FROZEN RESULT','slot'),el('span',unavailableLabel(entry)));article.append(top);
    const body=el('div',undefined,'entry-body');body.append(el('h3',entry.title),el('p',entry.failureSummary));
    const meta=el('div',undefined,'entry-meta');meta.append(el('span',$('#blind').checked?'Model label hidden':modelName(entry)));body.append(meta);
    body.append(el('p','No successful scene preview or walkthrough was captured. This result is excluded from working pairs. No automatic grade is assigned.','small muted'));
    if(!entry.admissionWithheld){const attempt=el('button','Attempt frozen build','quiet');attempt.type='button';attempt.dataset.open=entry.id;attempt.addEventListener('click',()=>open(entry,attempt));body.append(attempt);}
    article.append(body,inspector(entry));return article;
  }
  function render() {
    $('#entries').replaceChildren(...selected().map(card));
    $('#failed-results').hidden=failedEntries.length===0;
    $('#failed-entries').replaceChildren(...failedEntries.map(failedCard));
    if (entries.length === 1) {
      const waiting = el('article', undefined, 'entry waiting'), top = el('div', undefined, 'entry-top');
      top.append(el('span', 'NEXT ENTRY', 'slot'), el('span', 'Awaiting a finished build')); waiting.append(top);
      const art = el('div', undefined, 'waiting-art'); art.append(el('span', '+', 'waiting-symbol')); waiting.append(art);
      const body = el('div', undefined, 'entry-body'); body.append(el('h3', 'One world so far.'), el('p', 'Explore the completed entry now. A real comparison opens when a second frozen submission is admitted.')); waiting.append(body); $('#entries').append(waiting);
    }
    const unverified=entries.filter(e=>e.availability==='unverified').length;
    const partial=entries.filter(e=>e.completionStatus==='partial').length;
    $('#entry-count').textContent=`${entries.length+failedEntries.length} saved ${entries.length+failedEntries.length===1?'result':'results'}`+(unverified?` · ${unverified} runtime unverified`:'')+(partial?` · includes ${partial} partial handoff`:'')+(failedEntries.length?` · ${unavailableSummary(failedEntries)}`:'');
    $('#next-pair').hidden = !canShuffle; updateVote(); updateLeaderboard();
  }
  function updateVote() {
    const pair = selected(), ready = pair.length === 2;
    $('#public-vote-status').textContent=publicStatus.get(pairKey())||'';
    $('#vote-buttons').hidden = !ready;
    const bothOpened = hasOpenedBoth();
    $('#vote-instruction').textContent = !ready ? 'Waiting for a second finished entry before comparison opens.' : revealed ? 'Models revealed. Your comparison stays here until you choose Next comparison.' : bothOpened ? 'You have opened both worlds in this comparison. Which do you prefer?' : 'Open both scenes in this comparison, then return to vote. Next skips without recording a vote.';
    for (const button of document.querySelectorAll('[data-choice]')) button.disabled = button.dataset.choice==='skip'?!canShuffle:!bothOpened;
    const saved = record.preferences[pairKey()];
    $('#clear-vote').disabled = !bothOpened || (!saved&&!hasPublicVote(pair));
    const choice = saved?.choice;
    $('#vote-status').textContent = !saved ? 'No preference recorded.' : choice === 'tie' ? 'Your preference: tie.' : choice === 'skip' ? 'This pair is skipped.' : `Your preference: entry ${pair.findIndex(e => e.id === choice) === 0 ? 'A' : 'B'}.`;
    $('#vote-reveal').hidden=!revealed;$('#reveal-next').hidden=!revealed;$('#reveal-next').disabled=!canShuffle;
    $('#next-pair').textContent=revealed?'Next comparison':'Next random pair';
    document.querySelector('[data-choice="skip"]').hidden=revealed;
    if(revealed){
      const result=el('strong',choice==='tie'?'Your choice: tie':pair.some(e=>e.id===choice)?`Your choice: ${choice===pair[0].id?'A':'B'}`:'Choice cleared. Models remain revealed.');
      $('#vote-reveal').replaceChildren(result,...pair.map((entry,index)=>el('p',`${index?'B':'A'} — ${modelName(entry)}`)),el('p','The previews and sides above are unchanged. Choose Next comparison when ready.','small'));
    }
    updateLabels();
  }
  document.querySelectorAll('[data-choice]').forEach(button => button.addEventListener('click', async () => {
    if(button.dataset.choice==='skip'){nextComparison();return;}
    refresh();
    const pair = selected(); if (!hasOpenedBoth() || !['a','b','tie'].includes(button.dataset.choice)) return;
    const previous=pairKey(),reportedBlind=$('#blind').checked&&!revealed&&!labelsSeenThisComparison&&!record.preferences[pairKey()];
    record.preferences[previous] = { entries: pair.map(e => e.id), choice: button.dataset.choice === 'a' ? pair[0].id : button.dataset.choice === 'b' ? pair[1].id : button.dataset.choice, savedAt: new Date().toISOString() };
    revealed=true;save();updateVote();$('#notice').textContent='Preference saved. Both models are revealed; this comparison stays in place.';
    if(publicVotingEnabled){
      publicStatus.set(previous,'Sending your anonymous public preference…');updateVote();
      try{await submitPublicVote(pair,record.preferences[previous].choice,reportedBlind);publicStatus.set(previous,'Public preference saved. Repeating this pair replaces your browser’s earlier choice; it adds no extra match.');}
      catch(error){publicStatus.set(previous,'Saved privately; public submission was not confirmed. '+error.message+' Choose your preference again to retry.');}
      if(pairKey()===previous)updateVote();
    }
  }));
  $('#clear-vote').addEventListener('click', async () => {
    if(!hasOpenedBoth())return;const pair=selected(),previous=pairKey(),published=hasPublicVote(pair);refresh();delete record.preferences[previous];save();updateVote();
    if(publicVotingEnabled&&published){
      publicStatus.set(previous,'Withdrawing this browser’s public preference…');updateVote();
      try{await submitPublicVote(pair,'withdraw',false);publicStatus.set(previous,'Public preference withdrawn.');}
      catch(error){publicStatus.set(previous,'Private choice cleared; public withdrawal was not confirmed. '+error.message);}
      if(pairKey()===previous)updateVote();
    }
  });
  $('#public-voting-copy').textContent=publicVotingEnabled?'New A/B choices are submitted anonymously to the shared leaderboard. Existing private votes and rubric notes are not uploaded.':'Preferences stay in this browser. No public tally. This is separate from Jordan’s rubric.';
  subscribePublicJudgments(()=>renderPublicLeaderboard($('#public-leaderboard')));
  renderPublicLeaderboard($('#public-leaderboard'));loadPublicLeaderboard();
  $('#blind').checked = true;
  $('#blind').addEventListener('change',()=>{if(!$('#blind').checked)labelsSeenThisComparison=true;updateLabels();});
  function nextComparison(){
    const message=revealed?'Next comparison ready. Your saved preference is unchanged.':'Skipped without recording a vote. A random prompt and model pair are ready.';
    const next=randomComparison(prompts,allEntries,pairKey());if(!next){updateVote();return;}
    if(viewer.isOpen)close(false);
    selectPrompt(next.promptId,undefined,next.entries);const url=new URL(location.href);url.search='?prompt='+promptId;url.hash='';history.replaceState(history.state,'',url);$('#notice').textContent=message;
  }
  $('#next-pair').addEventListener('click', () => nextComparison());
  $('#reveal-next').addEventListener('click', () => nextComparison());
  $('#export').addEventListener('click', () => {
    refresh();
    const blob = new Blob([JSON.stringify({ ...record, exportedAt: new Date().toISOString(), benchmark: 'Jordan walkable 3D', promptVersions: versions.map(({id,sha256})=>({id,sha256})), storageScope: 'personal browser-local judgments', rubric: { visuals: 45, performance: 35, fulfillment: 20 } }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob), a = link('', url); a.download = 'walkable-3d-judgments.json'; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  });

  function selectPrompt(id,entryId,chosenPair=null){
    openedThisComparison.clear();revealed=false;labelsSeenThisComparison=false;
    const prompt=prompts.find(p=>p.id===id)||prompts[0];promptId=prompt.id;promptRequest++;
    entries=allEntries.filter(e=>e.promptId===promptId&&isOpenable(e));failedEntries=allEntries.filter(e=>e.promptId===promptId&&e.availability==='failed');pairs=[];pairIndex=0;
    for(let i=0;i<entries.length;i++)for(let j=i+1;j<entries.length;j++)pairs.push([entries[i],entries[j]]);
    if(entryId)pairIndex=Math.max(0,pairs.findIndex(pair=>pair.some(e=>e.id===entryId)));
    if(chosenPair){pairIndex=Math.max(0,pairs.findIndex(pair=>comparisonKey(pair)===comparisonKey(chosenPair)));if(pairs[pairIndex])pairs[pairIndex]=chosenPair.slice();}
    $('#prompt-select').value=promptId;$('#prompt-label').textContent=`Prompt ${prompt.id} / ${prompt.title}`;$('#prompt-title').textContent=prompt.brief;
    $('#prompt-version').replaceChildren(...versions.filter(v=>v.promptId===promptId).map(v=>{const o=el('option',v.label);o.value=v.id;return o;}));
    $('#prompt-text').textContent='Open this section to load the exact submitted text.';$('#prompt-disclosure').textContent='';$('#prompt-hash').textContent='';
    $('#prompt-download').href=versions.find(v=>v.id===$('#prompt-version').value)?.path||'#';
    render();if($('#full-prompt').open)loadPrompt();
  }
  async function loadPrompt(){
    const version=versions.find(v=>v.id===$('#prompt-version').value);if(!version)return;
    const request=++promptRequest;$('#prompt-text').textContent='Loading the exact prompt record…';
    $('#prompt-disclosure').textContent=version.source+' '+version.note;$('#prompt-hash').textContent=`Version ${version.id} / SHA-256 ${version.sha256}`;
    $('#prompt-download').href=version.path;
    try{const response=await fetch(version.path,{credentials:'omit'});if(!response.ok)throw Error();const bytes=await response.arrayBuffer();const hash=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes)),b=>b.toString(16).padStart(2,'0')).join('');if(hash!==version.sha256)throw Error();if(request!==promptRequest)return;$('#prompt-text').textContent=new TextDecoder().decode(bytes);}
    catch{if(request===promptRequest)$('#prompt-text').textContent='The prompt could not be loaded or its source hash did not match. No reconstructed text is shown.';}
  }
  $('#prompt-select').addEventListener('change',()=>{selectPrompt($('#prompt-select').value);const u=new URL(location.href);u.search='?prompt='+promptId;u.hash='';history.replaceState(history.state,'',u);});
  $('#prompt-version').addEventListener('change',loadPrompt);
  $('#full-prompt').addEventListener('toggle',()=>{if($('#full-prompt').open)loadPrompt();});
  addEventListener('hashchange',()=>{if(location.hash==='#full-prompt'){$('#full-prompt').open=true;loadPrompt();$('#full-prompt').scrollIntoView();}});

  storageState();
  fetch('entries.json', { credentials: 'omit' }).then(r => { if (!r.ok) throw Error(); return r.json(); }).then(data => {
    if (!Array.isArray(data.entries) || !data.entries.length) throw Error();
    allEntries = data.entries;
    if (allEntries.some(e => !/^[a-z0-9-]+$/.test(e.id) || !/^[a-f0-9]{64}$/.test(e.htmlSha256))) throw Error();
    prompts=data.prompts; versions=data.promptVersions;canShuffle=hasRandomComparison(prompts,allEntries);
    $('#prompt-select').replaceChildren(...prompts.map(p=>{const o=el('option',`${p.id} / ${p.title}`);o.value=p.id;return o;}));
    const params=new URLSearchParams(location.search),requestedEntry=allEntries.find(e=>e.id===params.get('entry'));
    selectPrompt(requestedEntry?.promptId||params.get('prompt')||'01',requestedEntry?.id);
    if(params.has('version') && [...$('#prompt-version').options].some(o=>o.value===params.get('version'))) $('#prompt-version').value=params.get('version');
    if(location.hash==='#full-prompt'){$('#full-prompt').open=true;loadPrompt();$('#full-prompt').scrollIntoView();}
    render();
    if(requestedEntry?.availability==='failed'){const article=document.querySelector(`[data-entry="${requestedEntry.id}"]`);article.querySelector('details').open=true;article.scrollIntoView();}
    if (location.hash.startsWith('#scene=')) $('#notice').textContent = 'Scene link received. Choose Open walkable scene when you are ready; no scene starts automatically.';
  }).catch(() => {
    $('#entry-count').textContent = 'Entries unavailable';
    $('#entries').append(el('p', 'The entry index could not be loaded. Reload this page to try again. No scene is running.', 'load-error'));
    $('#vote-instruction').textContent = 'Comparison is unavailable until the entry index loads.';
  });
})();

// Claude identity is owner-confirmed; this display override does not assert backend evidence.
// Recorded provenance remains unchanged.
export const modelName = entry => entry.comparisonModel === 'opus' ? 'Claude Opus 5.5' : (entry.requestedConfiguration || entry.comparisonModel || 'Unknown model').split(/\s*(?:\/|\(|;|·)\s*/)[0].trim();
// Host metadata groups requested models; it does not assert serving-backend identity.
export const comparisonKey = pair => pair.map(entry => entry.id).sort().join('::');
// Unverified means admitted for manual inspection, not independently runtime-tested.
export const isOpenable = entry => entry.availability === undefined || ['ready', 'unverified'].includes(entry.availability);

export const unavailableLabel = entry => entry.failureCategory === 'static-dependency' ? 'Static dependency incomplete' : entry.failureCategory === 'host-policy' ? 'Withheld: host policy compatibility' : 'Startup failed';
export function unavailableSummary(entries) {
  const withheld = entries.filter(entry => entry.admissionWithheld === true).length;
  const startup = entries.length - withheld;
  return [startup ? `${startup} startup failed` : '', withheld ? `${withheld} withheld after static review` : ''].filter(Boolean).join(' · ');
}

function comparisonOptions(prompts, entries) {
  return prompts.map(prompt => {
    const models = new Map();
    for (const entry of entries) {
      if (entry.promptId !== prompt.id || !entry.comparisonModel || !isOpenable(entry)) continue;
      if (!models.has(entry.comparisonModel)) models.set(entry.comparisonModel, []);
      models.get(entry.comparisonModel).push(entry);
    }
    const groups = [...models.values()], modelPairs = [];
    for (let a = 0; a < groups.length; a++) for (let b = a + 1; b < groups.length; b++) {
      modelPairs.push(groups[a].flatMap(left => groups[b].map(right => [left, right])));
    }
    return {promptId: prompt.id, modelPairs};
  }).filter(prompt => prompt.modelPairs.length);
}

export const hasRandomComparison = (prompts, entries) => comparisonOptions(prompts, entries).length > 0;

export function sortEntriesByVotes(entries, counts){
  if(!counts||entries.some(entry=>!Number.isSafeInteger(counts.get(entry.id))||counts.get(entry.id)<0))return entries.slice();
  return entries.slice().sort((a,b)=>counts.get(a.id)-counts.get(b.id));
}
export function comparePairVotes(a,b,counts){
  if(!counts||[...a,...b].some(entry=>!Number.isSafeInteger(counts.get(entry.id))||counts.get(entry.id)<0))return 0;
  const left=a.map(entry=>counts.get(entry.id)).sort((a,b)=>a-b),right=b.map(entry=>counts.get(entry.id)).sort((a,b)=>a-b);
  return left[0]-right[0]||left[1]-right[1];
}
export function comparisonPairs(entries,counts){
  const pairs=[];
  for(let a=0;a<entries.length;a++)for(let b=a+1;b<entries.length;b++){
    const left=entries[a],right=entries[b];
    if(isOpenable(left)&&isOpenable(right)&&left.promptId===right.promptId&&left.comparisonModel!==right.comparisonModel)pairs.push([left,right]);
  }
  if(counts&&entries.some(entry=>!Number.isSafeInteger(counts.get(entry.id))||counts.get(entry.id)<0))counts=null;
  return pairs.sort((a,b)=>comparePairVotes(a,b,counts));
}
export function randomComparison(prompts, entries, previousKey, counts=null) {
  const choose = options => options[Math.floor(Math.random() * options.length)];
  let options = comparisonOptions(prompts, entries);
  const candidates=options.flatMap(prompt=>prompt.modelPairs.flat());
  if(counts&&candidates.length&&candidates.every(pair=>pair.every(entry=>Number.isSafeInteger(counts.get(entry.id))&&counts.get(entry.id)>=0))){
    const best=candidates.reduce((best,pair)=>comparePairVotes(pair,best,counts)<0?pair:best);
    options=options.map(prompt=>({...prompt,modelPairs:prompt.modelPairs.map(pairs=>pairs.filter(pair=>comparePairVotes(pair,best,counts)===0)).filter(pairs=>pairs.length)})).filter(prompt=>prompt.modelPairs.length);
  }

  // Exclude the previous unordered entry pair globally when any alternative exists.
  const alternatives = options.map(prompt => ({
    promptId: prompt.promptId,
    modelPairs: prompt.modelPairs.map(pairs => pairs.filter(pair => comparisonKey(pair) !== previousKey)).filter(pairs => pairs.length)
  })).filter(prompt => prompt.modelPairs.length);
  const eligible = alternatives.length ? alternatives : options;
  if (!eligible.length) return null;

  // Prompt first, then two distinct models, then their entries and left/right order.
  const prompt = choose(eligible), pair = choose(choose(prompt.modelPairs));
  return {promptId: prompt.promptId, entries: Math.random() < .5 ? pair : [pair[1], pair[0]]};
}

export function initialComparison(prompts, entries, pendingEntryPairs = [], counts=null) {
  for (const ids of pendingEntryPairs) {
    if (!Array.isArray(ids) || ids.length !== 2 || ids[0] === ids[1]) continue;
    const pair = ids.map(id => entries.find(entry => entry.id === id));
    if (pair.some(entry => !entry || !isOpenable(entry) || !entry.comparisonModel) ||
        pair[0].promptId !== pair[1].promptId || pair[0].comparisonModel === pair[1].comparisonModel ||
        !prompts.some(prompt => prompt.id === pair[0].promptId)) continue;
    // Resume a pending request's original A/B presentation without changing its ledger.
    return {promptId: pair[0].promptId, entries: pair};
  }
  return randomComparison(prompts, entries, undefined, counts);
}

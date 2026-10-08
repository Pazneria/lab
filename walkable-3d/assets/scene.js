import {createViewer} from './viewer.js';
import {createSceneNavigation} from './scene-navigation.js';
import {createGradeForm} from './judgments.js';
import {isOpenable} from './comparisons.js';

// A scene-only host document: no Lab renderer or voting controls are mounted.
const $ = id => document.getElementById(id), navigation = createSceneNavigation(new URL('../', import.meta.url));
const visit = navigation.current(), key = 'lab.walkable3d.judgments.v1';
let entry = null, persistent = true, record = {version:1,grades:{},preferences:{},opened:{}};
function refresh() {
  try {
    const saved = JSON.parse(localStorage.getItem(key));
    if (saved?.version === 1) for (const field of ['grades','preferences','opened']) {
      if (saved[field] && typeof saved[field] === 'object' && !Array.isArray(saved[field])) record[field] = saved[field];
    }
  } catch { persistent = false; }
}
function save() { try { localStorage.setItem(key, JSON.stringify(record)); } catch { persistent = false; } }
const returnUrl = navigation.returnUrl(visit);
$('return-comparison').href = returnUrl;
let cameFromLab = false;
try {
  const referrer = new URL(document.referrer), lab = new URL('../../lab-space/', import.meta.url);
  cameFromLab = referrer.origin === lab.origin && referrer.pathname === lab.pathname;
} catch { /* A direct link may have no referrer. */ }
function returnToComparison() { if ((visit || cameFromLab) && history.length > 1) history.back(); else location.assign(returnUrl); }
$('return-comparison').addEventListener('click', event => { event.preventDefault(); viewer.destroy(); returnToComparison(); });
const viewer = createViewer({
  gradeForm: entry => createGradeForm(entry, {getRecord:()=>record,refresh,save,isPersistent:()=>persistent}),
  gradeLabelFor: entry => `${visit?.pair[0] === entry.id ? 'A' : visit ? 'B' : 'Scene'} / ${entry.title} - ${visit?.modelLabel || 'Model hidden until reveal'}`,
  onReady() { navigation.ready(visit); },
  // Only an explicit exit navigates. Hiding/reloading leaves an unloaded scene page.
  onExit: returnToComparison
});
function open() { if (entry && !viewer.isOpen) viewer.open(entry, $('open-scene'), false); }
$('open-scene').addEventListener('click', open);
refresh();
fetch(new URL('../entries.json', import.meta.url), {credentials:'omit'}).then(response => {
  if (!response.ok) throw Error();
  return response.json();
}).then(data => {
  const id = new URLSearchParams(location.search).get('entry');
  entry = data.entries?.find(candidate => candidate.id === id && /^[a-z0-9-]+$/.test(candidate.id) && /^[a-f0-9]{64}$/.test(candidate.htmlSha256) && isOpenable(candidate));
  if (!entry) { $('notice').textContent = 'This scene is unavailable. Return to the comparison to choose another entry.'; return; }
  document.title = `${entry.title} - Walkable scene`;
  $('scene-title').textContent = entry.title; $('open-scene').disabled = false;
  if (navigation.start(visit)) open();
  else $('notice').textContent = 'Choose Open scene when ready. Return to the comparison to continue voting.';
}).catch(() => { $('notice').textContent = 'The entry index could not load. Reload or return to the comparison.'; });

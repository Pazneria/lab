import {comparisonKey} from './comparisons.js';
import {publicRubricUrl} from './public-judgments.js';

const dimensions = [['visuals', 'Visuals', 45], ['performance', 'Performance', 35], ['fulfillment', 'Fulfillment', 20]];
const el = (tag, text, className) => {
  const node = document.createElement(tag);
  if (text !== undefined) node.textContent = text;
  if (className) node.className = className;
  return node;
};
const validPoint = (value, max) => Number.isFinite(value) && value >= 0 && value <= max;

// Both hosts use the same rubric and existing browser-local record format.
export function createGradeForm(entry, {getRecord, refresh, save, isPersistent, onChange = () => {}}) {
  refresh();
  const form = el('form', undefined, 'grade-form rubric-surface');
  let dirty = false;
  form.addEventListener('input', () => { dirty = true; });
  form.append(el('h4', 'Your scene grade'), el('p', 'A considered score, at your pace. Saved privately in this browser. Blank fields stay ungraded.', 'rubric-intro'));
  const fields = el('div', undefined, 'grade-fields'), old = getRecord().grades[entry.id] || {};
  const controls = [];
  const descriptions = {visuals:'Composition, atmosphere and visual craft.',performance:'Smooth movement and stability while exploring.',fulfillment:'How fully the scene delivers the prompt.'};
  for (const [name, labelText, max] of dimensions) {
    const row = el('div', undefined, 'score-row'), label = el('label', labelText, 'score-label'), input = el('input');
    input.type = 'number'; input.name = name; input.min = '0'; input.max = String(max); input.step = '.5';
    input.placeholder = '—'; input.setAttribute('aria-label', `${labelText}, 0 to ${max} points`);
    input.value = validPoint(old[name], max) ? old[name] : '';
    const value = el('span', undefined, 'score-value'); value.append(input,el('span', `/ ${max}`)); label.append(value);
    const slider = el('input'); slider.type = 'range'; slider.min = '0'; slider.max = String(max); slider.step = '.5';
    slider.setAttribute('aria-label', `${labelText} score slider, 0 to ${max} points`);
    const hint = el('p', descriptions[name], 'score-description');
    const sync = () => {const blank=input.value===''; row.dataset.ungraded=String(blank);slider.value=blank?'0':input.value;slider.setAttribute('aria-valuetext',blank?'Unscored':`${input.value} of ${max} points`);input.setAttribute('aria-invalid',String(!blank&&!input.validity.valid));};
    input.addEventListener('input',sync); slider.addEventListener('input',()=>{input.value=slider.value;input.dispatchEvent(new Event('input',{bubbles:true}));});
    row.append(label,hint,slider);fields.append(row);controls.push(sync);sync();
  }
  form.append(fields);
  const summary = el('div', undefined, 'rubric-total');summary.setAttribute('aria-live','polite');form.append(summary);
  const updateTotal=()=>{const complete=dimensions.every(([name,,max])=>form.elements[name].value!==''&&validPoint(Number(form.elements[name].value),max));summary.textContent=complete?`${dimensions.reduce((sum,[name])=>sum+Number(form.elements[name].value),0)} / 100 · Total score`:'45 / 35 / 20 · Enter all three scores for a total';};
  form.addEventListener('input',updateTotal);
  const noteLabel = el('label', 'Notes · optional', 'rubric-notes'), notes = el('textarea');
  notes.name = 'notes'; notes.maxLength = 8000; notes.placeholder = 'What held up while walking? What did you notice?';
  notes.value = typeof old.notes === 'string' ? old.notes : ''; noteLabel.append(notes); form.append(noteLabel);
  const actions = el('div', undefined, 'actions'), submit = el('button', 'Save private grade'), clear = el('button', 'Clear grade', 'quiet');
  submit.type = 'submit'; clear.type = 'button'; actions.append(submit, clear); form.append(actions);
  const publicUrl=publicRubricUrl(entry);
  if(publicUrl){const publicSection=el('div',undefined,'rubric-public');const publicLink=el('a','Grade publicly ↗');publicLink.href=publicUrl;publicLink.target='_blank';publicLink.rel='noopener';publicSection.append(publicLink,el('p','A separate signed-in submission. Your private points and notes stay here. Public rubric scores are separate from A/B Elo.','small muted'));form.append(publicSection);}
  const result = el('p', undefined, 'grade-result'); result.setAttribute('role', 'status'); form.append(result);
  const updateResult = () => {
    const g = getRecord().grades[entry.id], complete = g && dimensions.every(([name,, max]) => validPoint(g[name], max));
    result.dataset.state = g ? 'saved' : 'blank'; submit.textContent = 'Save private grade';
    result.textContent = (g ? complete ? `Your grade: ${dimensions.reduce((sum, [name]) => sum + g[name], 0)} / 100. ` : 'Partial grade or notes saved. ' : 'Not graded. ') + (isPersistent() ? 'Saved in this browser only.' : 'Session only; browser storage is unavailable.');
  };
  form.addEventListener('input', () => {result.dataset.state='editing';result.textContent='Unsaved changes. Save when you are ready.';submit.textContent='Save changes';});
  updateResult();updateTotal();
  form.refreshGrade = () => {
    if (dirty) return; // Preserve an in-progress edit in either copy of the sheet.
    const saved = getRecord().grades[entry.id] || {};
    for (const [name,, max] of dimensions) form.elements[name].value = validPoint(saved[name], max) ? saved[name] : '';
    notes.value = typeof saved.notes === 'string' ? saved.notes : '';
    controls.forEach(sync=>sync());updateTotal();updateResult();
  };
  form.addEventListener('submit', event => {
    event.preventDefault(); if (!form.reportValidity()) return;
    const g = {notes: notes.value, savedAt: new Date().toISOString()};
    for (const [name] of dimensions) g[name] = form.elements[name].value === '' ? null : Number(form.elements[name].value);
    g.total = dimensions.every(([name,, max]) => validPoint(g[name], max)) ? dimensions.reduce((sum, [name]) => sum + g[name], 0) : null;
    refresh(); getRecord().grades[entry.id] = g; dirty = false; save(); updateResult(); onChange();
  });
  clear.addEventListener('click', () => {
    refresh(); delete getRecord().grades[entry.id];
    for (const input of form.querySelectorAll('input,textarea')) input.value = '';
    dirty = false; controls.forEach(sync=>sync());updateTotal();save(); updateResult(); onChange();
  });
  return form;
}

export function renderLeaderboard(target, entries, record, persistent) {
  for (const form of document.querySelectorAll('.grade-form')) form.refreshGrade?.();
  if (!entries.length) {
    target.replaceChildren(el('h3', 'Model leaderboard'), el('p', 'Your votes/grades on this browser', 'leaderboard-scope'), el('p', 'Load the entry index to see your recorded model results. No records have been changed.', 'small'));
    return;
  }
  const models = new Map(), byId = new Map(entries.map(entry => [entry.id, entry]));
  for (const entry of entries) if (entry.comparisonModel && !models.has(entry.comparisonModel)) {
    models.set(entry.comparisonModel, {model: entry.comparisonModel, matches: 0, wins: 0, ties: 0, losses: 0, complete: 0, partial: 0, visuals: 0, performance: 0, fulfillment: 0});
  }
  let votes = 0;
  for (const [key, vote] of Object.entries(record.preferences)) {
    if (!vote || !Array.isArray(vote.entries) || vote.entries.length !== 2 || vote.entries[0] === vote.entries[1]) continue;
    const pair = vote.entries.map(id => byId.get(id));
    if (pair.some(entry => !entry?.comparisonModel) || comparisonKey(pair) !== key || pair[0].promptId !== pair[1].promptId || pair[0].comparisonModel === pair[1].comparisonModel) continue;
    if (vote.choice !== 'tie' && !vote.entries.includes(vote.choice)) continue;
    votes++;
    for (const entry of pair) {
      const row = models.get(entry.comparisonModel); row.matches++;
      if (vote.choice === 'tie') row.ties++;
      else if (vote.choice === entry.id) row.wins++;
      else row.losses++;
    }
  }
  for (const [id, grade] of Object.entries(record.grades)) {
    const row = models.get(byId.get(id)?.comparisonModel); if (!row || !grade || typeof grade !== 'object') continue;
    if (dimensions.every(([name,, max]) => validPoint(grade[name], max))) {
      row.complete++;
      for (const [name] of dimensions) row[name] += grade[name];
    } else if (dimensions.some(([name,, max]) => validPoint(grade[name], max)) || (typeof grade.notes === 'string' && grade.notes.trim())) row.partial++;
  }
  const rows = [...models.values()].sort((a, b) => (b.matches ? b.wins / b.matches : -1) - (a.matches ? a.wins / a.matches : -1) || b.matches - a.matches || a.model.localeCompare(b.model));
  const heading = el('h3', 'Model leaderboard'), scope = el('p', 'Your votes/grades on this browser', 'leaderboard-scope');
  const note = el('p', `${votes} saved pairwise ${votes === 1 ? 'judgment' : 'judgments'} across all prompts. Latest choice per pair only; revising a vote replaces it. Win rate = wins / matches; ties count as matches, not wins. Skips do not count. Sorted by raw win rate, then sample count.`, 'small');
  const disclosure = el('p', 'Personal samples can be small and uneven. Model groups use the recorded requested labels; effort and serving-model disclosures remain in inspectors. No public consensus or inferred rating.', 'small muted');
  const table = (captionText, headings, values) => {
    const wrapper = el('div', undefined, 'leaderboard-scroll'), table = el('table');
    wrapper.tabIndex = 0; wrapper.setAttribute('role', 'region'); wrapper.setAttribute('aria-label', captionText);
    table.append(el('caption', captionText));
    const head = el('thead'), headingRow = el('tr');
    for (const text of headings) { const cell = el('th', text); cell.scope = 'col'; headingRow.append(cell); }
    head.append(headingRow); table.append(head);
    const body = el('tbody');
    for (const valuesRow of values) {
      const tr = el('tr'); valuesRow.forEach((text, index) => { const cell = el(index ? 'td' : 'th', String(text)); if (!index) cell.scope = 'row'; tr.append(cell); }); body.append(tr);
    }
    table.append(body); wrapper.append(table); return wrapper;
  };
  const votesTable = table('Pairwise preferences', ['Model', 'Wins', 'Ties', 'Losses', 'Matches', 'Win rate'], rows.map(r => [r.model==='opus'?'Claude Opus 5.5':r.model, r.wins, r.ties, r.losses, r.matches, r.matches ? `${(100 * r.wins / r.matches).toFixed(1)}%` : '—']));
  const gradesTable = table('Separate rubric averages · complete scene grades only', ['Model', 'Graded scenes', 'Partial / notes', 'Visuals /45', 'Performance /35', 'Fulfillment /20', 'Total /100'], rows.map(r => [r.model==='opus'?'Claude Opus 5.5':r.model, r.complete, r.partial, ...dimensions.map(([name]) => r.complete ? (r[name] / r.complete).toFixed(1) : '—'), r.complete ? ((r.visuals + r.performance + r.fulfillment) / r.complete).toFixed(1) : '—']));
  const gradeNote = el('p', 'One latest grade per scene. Partial sheets and notes are counted separately and excluded from averages. No entered grade means no score.', 'small muted');
  target.replaceChildren(heading, scope, note, disclosure, votesTable, gradesTable, gradeNote);
  if (!persistent) target.append(el('p', 'Browser storage is unavailable. This table contains this page session’s judgments only; export from the notebook before leaving.', 'small'));
}

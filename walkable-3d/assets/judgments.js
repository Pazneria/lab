import {comparisonKey} from './comparisons.js';

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
  const form = el('form', undefined, 'grade-form');
  let dirty = false;
  form.addEventListener('input', () => { dirty = true; });
  form.append(el('h4', "Jordan's rubric"), el('p', 'Your points and notes. Independent of pairwise votes. Blank fields stay ungraded.', 'small muted'));
  const fields = el('div', undefined, 'grade-fields'), old = getRecord().grades[entry.id] || {};
  for (const [name, labelText, max] of dimensions) {
    const label = el('label', `${labelText} / ${max}`), input = el('input');
    input.type = 'number'; input.name = name; input.min = '0'; input.max = String(max); input.step = '.5';
    input.value = validPoint(old[name], max) ? old[name] : '';
    label.append(input); fields.append(label);
  }
  form.append(fields);
  const noteLabel = el('label', 'Inspection notes', 'small'), notes = el('textarea');
  notes.name = 'notes'; notes.maxLength = 8000; notes.placeholder = 'What held up while walking? What did you notice?';
  notes.value = typeof old.notes === 'string' ? old.notes : ''; noteLabel.append(notes); form.append(noteLabel);
  const actions = el('div', undefined, 'actions'), submit = el('button', 'Save grade'), clear = el('button', 'Clear grade', 'quiet');
  submit.type = 'submit'; clear.type = 'button'; actions.append(submit, clear); form.append(actions);
  const result = el('p', undefined, 'grade-result'); result.setAttribute('role', 'status'); form.append(result);
  const updateResult = () => {
    const g = getRecord().grades[entry.id], complete = g && dimensions.every(([name,, max]) => validPoint(g[name], max));
    result.textContent = (g ? complete ? `Your grade: ${dimensions.reduce((sum, [name]) => sum + g[name], 0)} / 100. ` : 'Partial grade or notes saved. ' : 'Not graded. ') + (isPersistent() ? 'Saved in this browser only.' : 'Session only; browser storage is unavailable.');
  };
  updateResult();
  form.refreshGrade = () => {
    if (dirty) return; // Preserve an in-progress edit in either copy of the sheet.
    const saved = getRecord().grades[entry.id] || {};
    for (const [name,, max] of dimensions) form.elements[name].value = validPoint(saved[name], max) ? saved[name] : '';
    notes.value = typeof saved.notes === 'string' ? saved.notes : '';
    updateResult();
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
    dirty = false; save(); updateResult(); onChange();
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
  const votesTable = table('Pairwise preferences', ['Model', 'Wins', 'Ties', 'Losses', 'Matches', 'Win rate'], rows.map(r => [r.model, r.wins, r.ties, r.losses, r.matches, r.matches ? `${(100 * r.wins / r.matches).toFixed(1)}%` : '—']));
  const gradesTable = table('Separate rubric averages · complete scene grades only', ['Model', 'Graded scenes', 'Partial / notes', 'Visuals /45', 'Performance /35', 'Fulfillment /20', 'Total /100'], rows.map(r => [r.model, r.complete, r.partial, ...dimensions.map(([name]) => r.complete ? (r[name] / r.complete).toFixed(1) : '—'), r.complete ? ((r.visuals + r.performance + r.fulfillment) / r.complete).toFixed(1) : '—']));
  const gradeNote = el('p', 'One latest grade per scene. Partial sheets and notes are counted separately and excluded from averages. No entered grade means no score.', 'small muted');
  target.replaceChildren(heading, scope, note, disclosure, votesTable, gradesTable, gradeNote);
  if (!persistent) target.append(el('p', 'Browser storage is unavailable. This table contains this page session’s judgments only; export from the notebook before leaving.', 'small'));
}

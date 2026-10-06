/* The Lab host owns this file. Frozen entrant programs are never evaluated here. */
(() => {
  'use strict';
  const $ = (s) => document.querySelector(s);
  const key = 'lab.walkable3d.judgments.v1';
  const blank = () => ({ version: 1, grades: {}, preferences: {}, opened: {} });
  let record = blank(), persistent = true, entries = [], pairs = [], pairIndex = 0;
  let active = null, lastButton = null, sequence = 0;
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
    storageState();
  }
  function el(tag, text, className) {
    const node = document.createElement(tag);
    if (text !== undefined) node.textContent = text;
    if (className) node.className = className;
    return node;
  }
  const selected = () => pairs[pairIndex] || entries.slice(0, 1);
  const pairKey = () => selected().map(e => e.id).sort().join('::');
  const titleFor = (entry) => entry.title;
  function link(label, href) {
    const a = el('a', label); a.href = href; return a;
  }
  function addDefinition(dl, label, value) {
    dl.append(el('dt', label), el('dd', value));
  }
  function gradeForm(entry) {
    const form = el('form', undefined, 'grade-form');
    form.append(el('h4', "Jordan's rubric"), el('p', 'Your own points and notes. Saved only in this browser.', 'small muted'));
    const fields = el('div', undefined, 'grade-fields');
    const old = record.grades[entry.id] || {};
    for (const [name, max] of [['Visuals', 45], ['Performance', 35], ['Fulfillment', 20]]) {
      const label = el('label', `${name} / ${max}`), input = el('input');
      input.type = 'number'; input.name = name.toLowerCase(); input.min = '0'; input.max = String(max); input.step = '.5';
      input.value = typeof old[input.name] === 'number' ? old[input.name] : '';
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
      const g = record.grades[entry.id];
      result.textContent = g ? (Number.isFinite(g.total) ? `Your grade: ${g.total} / 100. ` : 'Partial grade saved. ') + (persistent ? 'Browser-local.' : 'Session only.') : 'Not graded.';
    };
    updateResult();
    form.addEventListener('submit', event => {
      event.preventDefault(); if (!form.reportValidity()) return;
      const g = { notes: notes.value, savedAt: new Date().toISOString() };
      for (const name of ['visuals', 'performance', 'fulfillment']) g[name] = form.elements[name].value === '' ? null : Number(form.elements[name].value);
      g.total = ['visuals', 'performance', 'fulfillment'].every(n => Number.isFinite(g[n])) ? g.visuals + g.performance + g.fulfillment : null;
      record.grades[entry.id] = g; save(); updateResult();
    });
    clear.addEventListener('click', () => { delete record.grades[entry.id]; for (const input of form.querySelectorAll('input,textarea')) input.value = ''; save(); updateResult(); });
    return form;
  }
  function inspector(entry) {
    const details = el('details', undefined, 'inspector');
    details.append(el('summary', 'Inspect build & add your grade'));
    const dl = el('dl');
    addDefinition(dl, 'Model / effort', $('#blind').checked ? 'Model labels hidden. Uncheck “Hide model labels” to reveal the requested configuration.' : entry.requestedConfiguration);
    addDefinition(dl, 'Disclosure', $('#blind').checked ? 'The exact serving model and effort were not exposed to the producer. Reveal labels to see the parent-requested configuration and full disclosure.' : entry.modelDisclosure);
    addDefinition(dl, 'Build window', entry.buildWindow);
    addDefinition(dl, 'Interruptions', entry.interruptions);
    addDefinition(dl, 'Controls', entry.controls);
    addDefinition(dl, 'Producer checks', entry.producerChecks);
    addDefinition(dl, 'Frame evidence', entry.performanceEvidence);
    addDefinition(dl, 'Original SHA-256', entry.archiveSha256);
    details.append(dl, el('p', 'Producer diagnostics use different runs and settings. These are not final grades or a controlled performance comparison.', 'small muted'));
    const list = el('ul'); entry.limitations.forEach(item => list.append(el('li', item))); details.append(list);
    const links = el('div', undefined, 'source-links');
    entry.documents.forEach(doc => links.append(link(doc.label, `entries/${entry.id}/${doc.path}`)));
    links.append(link('Source hashes', `entries/${entry.id}/provenance.json`)); details.append(links);
    details.append(el('p', 'Opening source documents may reveal model information. Original archives and raw captures are retained in the repository, outside this site; their hashes remain in provenance.', 'blind-note'), gradeForm(entry));
    return details;
  }
  function card(entry, index) {
    const article = el('article', undefined, 'entry'); article.dataset.entry = entry.id;
    const top = el('div', undefined, 'entry-top');
    top.append(el('span', `ENTRY ${String.fromCharCode(65 + index)}`, 'slot'), el('span', 'Frozen build · ready', 'ready')); article.append(top);
    const preview = el('button', undefined, 'preview'); preview.type = 'button'; preview.dataset.open = entry.id; preview.setAttribute('aria-label', `Open ${entry.title}`);
    const img = el('img'); img.src = `entries/${entry.id}/preview.jpg`; img.width = 960; img.height = 600; img.alt = entry.previewAlt; img.decoding = 'async';
    img.addEventListener('error', () => { img.hidden = true; preview.prepend(el('span', 'Preview unavailable. You can still open the scene.', 'image-error')); }, { once: true });
    preview.append(img, el('span', '↗ Open walkable scene', 'open-label'));
    preview.addEventListener('click', () => open(entry, preview)); article.append(preview);
    const body = el('div', undefined, 'entry-body'); body.append(el('h3', titleFor(entry)), el('p', entry.description));
    const meta = el('div', undefined, 'entry-meta'); meta.append(el('span', $('#blind').checked ? 'Model label hidden' : entry.requestedConfiguration), el('span', 'Desktop · WebGL 2')); body.append(meta);
    article.append(body, inspector(entry)); return article;
  }
  function render() {
    $('#entries').replaceChildren(...selected().map(card));
    if (entries.length === 1) {
      const waiting = el('article', undefined, 'entry waiting'), top = el('div', undefined, 'entry-top');
      top.append(el('span', 'NEXT ENTRY', 'slot'), el('span', 'Awaiting a finished build')); waiting.append(top);
      const art = el('div', undefined, 'waiting-art'); art.append(el('span', '+', 'waiting-symbol')); waiting.append(art);
      const body = el('div', undefined, 'entry-body'); body.append(el('h3', 'One world so far.'), el('p', 'Explore the completed entry now. A real comparison opens when a second frozen submission is admitted.')); waiting.append(body); $('#entries').append(waiting);
    }
    $('#entry-count').textContent = `${entries.length} finished ${entries.length === 1 ? 'entry' : 'entries'}`;
    $('#next-pair').hidden = pairs.length < 2; updateVote();
  }
  function updateVote() {
    const pair = selected(), ready = pair.length === 2;
    $('#vote-buttons').hidden = !ready;
    const bothOpened = ready && pair.every(e => record.opened[e.id]);
    $('#vote-instruction').textContent = !ready ? 'Waiting for a second finished entry before comparison opens.' : bothOpened ? 'You have opened both worlds. Which do you prefer?' : 'Open both scenes, then return here to choose your preference.';
    for (const button of document.querySelectorAll('[data-choice]')) button.disabled = !bothOpened;
    const saved = record.preferences[pairKey()];
    $('#clear-vote').disabled = !saved;
    const choice = saved?.choice;
    $('#vote-status').textContent = !saved ? 'No preference recorded.' : choice === 'tie' ? 'Your preference: tie.' : choice === 'skip' ? 'This pair is skipped.' : `Your preference: entry ${pair.findIndex(e => e.id === choice) === 0 ? 'A' : 'B'}.`;
  }
  document.querySelectorAll('[data-choice]').forEach(button => button.addEventListener('click', () => {
    const pair = selected(); if (pair.length !== 2 || !pair.every(e => record.opened[e.id])) return;
    record.preferences[pairKey()] = { entries: pair.map(e => e.id), choice: button.dataset.choice === 'a' ? pair[0].id : button.dataset.choice === 'b' ? pair[1].id : button.dataset.choice, savedAt: new Date().toISOString() };
    save(); updateVote();
  }));
  $('#clear-vote').addEventListener('click', () => { delete record.preferences[pairKey()]; save(); updateVote(); });
  $('#blind').checked = true;
  $('#blind').addEventListener('change', () => {
    // Preserve unsaved grading input and details state when revealing model labels.
    for (const entry of selected()) {
      const article = document.querySelector(`[data-entry="${entry.id}"]`);
      article.querySelector('.entry-meta span').textContent = $('#blind').checked ? 'Model label hidden' : entry.requestedConfiguration;
      article.querySelector('dd').textContent = $('#blind').checked ? 'Model labels hidden. Uncheck “Hide model labels” to reveal the requested configuration.' : entry.requestedConfiguration;
      article.querySelectorAll('dd')[1].textContent = $('#blind').checked ? 'The exact serving model and effort were not exposed to the producer. Reveal labels to see the parent-requested configuration and full disclosure.' : entry.modelDisclosure;
    }
  });
  $('#next-pair').addEventListener('click', () => { close(false); pairIndex = (pairIndex + 1) % pairs.length; render(); });
  $('#export').addEventListener('click', () => {
    const blob = new Blob([JSON.stringify({ ...record, exportedAt: new Date().toISOString(), benchmark: 'Jordan walkable 3D / prompt 01', storageScope: 'personal browser-local judgments', rubric: { visuals: 45, performance: 35, fulfillment: 20 } }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob), a = link('', url); a.download = 'walkable-3d-judgments.json'; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  });

  // Only a click can allocate the child browsing context. History never starts a scene.
  function destroy() {
    sequence++;
    if (active) { active.controller.abort(); clearTimeout(active.timeout); }
    const frame = $('#scene-mount iframe');
    if (frame) {
      // Removing its browsing context ends JS/RAF/audio and releases WebGL resources.
      frame.removeAttribute('srcdoc'); frame.src = 'about:blank'; frame.remove();
    }
    active = null;
  }
  function close(back = true) {
    destroy();
    if ($('#viewer').open) $('#viewer').close();
    if (back && history.state?.walkableScene) history.back();
    lastButton?.focus({ preventScroll: true }); updateVote();
  }
  function fail(message) {
    const entry = active?.entry;
    destroy(); $('#viewer-message').textContent = message;
    $('#retry-viewer').hidden = !entry; $('#retry-viewer').onclick = () => open(entry, lastButton, false);
    $('#return-focus').disabled = true;
  }
  function escapeAttribute(text) { return text.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;'); }
  function shellDocument(entry, source, folder, token) {
    // Only admitted, documented path substitutions. No rebuilding or scene changes.
    for (const [from, to] of entry.hostPathReplacements || []) source = source.split(from).join(to);
    const csp = `default-src 'none'; script-src 'unsafe-inline' ${folder}; style-src 'unsafe-inline' ${folder}; img-src data: blob: ${folder}; font-src 'none'; connect-src 'none'; media-src 'none'; worker-src 'none'; frame-src 'none'; object-src 'none'; form-action 'none'; base-uri ${folder}`;
    const bridge = `(() => {
      const send = type => parent.postMessage({channel:'lab-walkable-viewer',token:${JSON.stringify(token)},type}, '*');
      addEventListener('error', () => send('failed'), true);
      addEventListener('unhandledrejection', () => send('failed'));
      document.addEventListener('securitypolicyviolation', () => send('failed'));
      document.addEventListener('webglcontextlost', () => send('failed'), true);
      document.addEventListener('pointerlockerror', () => send('pointer-error'));
      document.addEventListener('keydown', e => { if(e.key === 'Escape') send('released'); });
      document.addEventListener('pointerlockchange', () => { if (!document.pointerLockElement) send('released'); });
      const timer = setInterval(() => { if (document.querySelector(${JSON.stringify(entry.readySelector)})) { clearInterval(timer); send('ready'); } }, 150);
    })();`;
    return source.replace(/<head([^>]*)>/i, `<head$1><meta http-equiv="Content-Security-Policy" content="${escapeAttribute(csp)}"><base href="${escapeAttribute(folder)}"><script>${bridge}<\/script>`);
  }
  async function open(entry, button, push = true) {
    destroy(); lastButton = button;
    if (push) {
      const u = new URL(location.href), replace = !!history.state?.walkableScene;
      u.hash = `scene=${entry.id}`;
      history[replace ? 'replaceState' : 'pushState']({ walkableScene: entry.id }, '', u);
    }
    $('#viewer-title').textContent = titleFor(entry); $('#viewer-message').textContent = 'Loading the frozen build. Nothing else is running in this viewer.';
    $('#retry-viewer').hidden = true; $('#return-focus').disabled = true;
    if (!$('#viewer').open) $('#viewer').showModal(); $('#close-viewer').focus();
    const controller = new AbortController(), token = crypto.randomUUID(), current = sequence;
    active = { entry, controller, token, timeout: setTimeout(() => { if (active?.token === token) fail('The scene did not become ready. It has been unloaded. Check WebGL 2 support or try again.'); }, 45000) };
    try {
      const folder = new URL(`entries/${entry.id}/frozen/`, location.href).href;
      const response = await fetch(folder + 'index.html.txt', { signal: controller.signal, credentials: 'omit', cache: 'no-cache' });
      if (!response.ok) throw Error('The entry document could not be downloaded.');
      const bytes = await response.arrayBuffer();
      const digest = Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', bytes)), b => b.toString(16).padStart(2, '0')).join('');
      if (digest !== entry.htmlSha256) throw Error('The frozen entry failed its integrity check.');
      if (current !== sequence || controller.signal.aborted || document.hidden) return;
      const frame = el('iframe'); frame.title = `${entry.title} — isolated walkable scene`;
      frame.setAttribute('sandbox', 'allow-scripts allow-pointer-lock');
      frame.setAttribute('allow', "camera 'none'; microphone 'none'; geolocation 'none'; payment 'none'; usb 'none'; fullscreen 'none'");
      frame.referrerPolicy = 'no-referrer'; frame.setAttribute('credentialless', '');
      frame.srcdoc = shellDocument(entry, new TextDecoder().decode(bytes), folder, token);
      $('#scene-mount').append(frame);
    } catch (error) {
      if (!controller.signal.aborted && current === sequence) fail(`${error.message} The scene has been unloaded. You can retry or close this viewer.`);
    }
  }
  addEventListener('message', event => {
    const frame = $('#scene-mount iframe');
    if (!active || !frame || event.source !== frame.contentWindow || event.origin !== 'null' || event.data?.channel !== 'lab-walkable-viewer' || event.data.token !== active.token) return;
    if (event.data.type === 'ready') {
      clearTimeout(active.timeout); record.opened[active.entry.id] = new Date().toISOString(); save();
      $('#viewer-message').textContent = 'Ready. Click “Enter the station” inside the scene. Press Esc to release the mouse, then close to return.';
      $('#return-focus').disabled = false;
    } else if (event.data.type === 'failed') fail('A runtime or asset error prevented this scene from continuing. It has been unloaded. Try again or close the viewer.');
    else if (event.data.type === 'released') { $('#viewer-message').textContent = 'Mouse released. Continue inside the scene, or close to return and judge.'; $('#close-viewer').focus(); }
    else if (event.data.type === 'pointer-error') $('#viewer-message').textContent = 'Mouse capture was denied. Click inside and try again, or close the scene. Some entries provide drag-to-look controls.';
  });
  $('#return-focus').addEventListener('click', () => $('#scene-mount iframe')?.focus());
  $('#close-viewer').addEventListener('click', () => close());
  $('#viewer').addEventListener('cancel', event => { event.preventDefault(); close(); });
  addEventListener('popstate', () => { close(false); $('#notice').textContent = location.hash.startsWith('#scene=') ? 'The previous scene is unloaded. Choose Open walkable scene to start it again.' : ''; });
  addEventListener('pagehide', destroy);
  addEventListener('pageshow', event => { if (event.persisted) { close(false); $('#notice').textContent = 'Scenes were unloaded when you left. Open an entry to resume.'; } });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && (active || $('#viewer').open)) {
      close(false); const url = new URL(location.href); url.hash = ''; history.replaceState(null, '', url);
      $('#notice').textContent = 'The scene was unloaded when this tab became hidden. Open it again when you are ready.';
    }
  });
  storageState();
  fetch('entries.json', { credentials: 'omit' }).then(r => { if (!r.ok) throw Error(); return r.json(); }).then(data => {
    if (!Array.isArray(data.entries) || !data.entries.length) throw Error();
    entries = data.entries;
    if (entries.some(e => !/^[a-z0-9-]+$/.test(e.id) || !/^[a-f0-9]{64}$/.test(e.htmlSha256))) throw Error();
    for (let i = 0; i < entries.length; i++) for (let j = i + 1; j < entries.length; j++) pairs.push([entries[i], entries[j]]);
    if (data.prompt?.verbatim) { $('#prompt-text').textContent = data.prompt.verbatim; $('#prompt-disclosure').textContent = 'Original prompt, preserved verbatim.'; }
    render();
    if (location.hash.startsWith('#scene=')) $('#notice').textContent = 'Scene link received. Choose Open walkable scene when you are ready; no scene starts automatically.';
  }).catch(() => {
    $('#entry-count').textContent = 'Entries unavailable';
    $('#entries').append(el('p', 'The entry index could not be loaded. Reload this page to try again. No scene is running.', 'load-error'));
    $('#vote-instruction').textContent = 'Comparison is unavailable until the entry index loads.';
  });
})();

// Shared host boundary; entrant source is never evaluated in the Lab page.
export function createViewer({base=new URL('../',import.meta.url),titleFor=entry=>entry.title,gradeLabelFor=titleFor,gradeForm=null,onOpen=()=>{},onReady=()=>{},onClose=()=>{}}={}) {
  const $=s=>document.querySelector(s),el=tag=>document.createElement(tag);
  let active=null,lastButton=null,sequence=0;
  // Only a click can allocate the child browsing context. History never starts a scene.
  function destroy() {
    sequence++;
    if (active) { active.controller.abort(); clearTimeout(active.timeout); clearTimeout(active.gradeTimeout); }
    if ($('#scene-grade-dialog').open) $('#scene-grade-dialog').close();
    $('#scene-grade-content').replaceChildren(); $('#grade-scene').disabled = true;
    const frame = $('#scene-mount iframe');
    if (frame) {
      // Removing its browsing context ends JS/RAF/audio and releases WebGL resources.
      frame.removeAttribute('srcdoc'); frame.src = 'about:blank'; frame.remove();
    }
    active = null;
  }
  function sendCommand(type) {
    const frame = $('#scene-mount iframe');
    if (active && frame) frame.contentWindow.postMessage({channel:'lab-walkable-host',token:active.token,type}, '*');
  }
  function showGrade() {
    if (!active?.ready || !gradeForm || active.grading) return;
    active.grading = true; $('#grade-scene').disabled = true;
    // Wait for the host bridge to release child pointer lock before showing the sheet.
    sendCommand('grade-pause');
    active.gradeTimeout = setTimeout(() => {
      if (!active?.grading || $('#scene-grade-dialog').open) return;
      active.grading = false; sendCommand('grade-resume'); $('#grade-scene').disabled = false;
      $('#viewer-message').textContent = 'Scene input did not release in time. Press Esc, then choose Grade this scene again.';
    }, 2000);
  }
  function resumeGrade() {
    if (!active?.grading) return;
    clearTimeout(active.gradeTimeout); active.grading = false;
    $('#scene-grade-dialog').close(); sendCommand('grade-resume');
    $('#grade-scene').disabled = false;
    $('#viewer-message').textContent = 'Same scene, still open. Click its own control to resume mouse capture when ready.';
    // This function runs only from the sheet's explicit Resume button or Escape.
    // It never requests pointer lock; capture still needs a click inside the entrant.
    $('#scene-mount iframe')?.focus();
  }
  function close(back = true) {
    destroy();
    if ($('#viewer').open) $('#viewer').close();
    if (back && history.state?.walkableScene) history.back();
    lastButton?.focus({ preventScroll: true }); onClose();
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
    // Only an explicitly admitted entry can retain its audited data: stylesheet.
    const dataStyles = entry.allowDataStyles === true ? 'data: ' : '';
    const csp = `default-src 'none'; script-src 'unsafe-inline' ${folder}; style-src 'unsafe-inline' ${dataStyles}${folder}; img-src data: blob: ${folder}; font-src 'none'; connect-src 'none'; media-src 'none'; worker-src 'none'; frame-src 'none'; object-src 'none'; form-action 'none'; base-uri ${folder}`;
    const bridge = `(() => {
      const send = type => parent.postMessage({channel:'lab-walkable-viewer',token:${JSON.stringify(token)},type}, '*');
      let grading = false, wasInert = false, pauseAcknowledged = false;
      const held = new Map(), pointers = new Map();
      addEventListener('keydown', e => { if (!grading) held.set(e.code || e.key, {key:e.key,code:e.code,keyCode:e.keyCode,which:e.which}); }, true);
      addEventListener('keyup', e => held.delete(e.code || e.key), true);
      addEventListener('pointerdown', e => { if (!grading) pointers.set(e.pointerId, {target:e.target,id:e.pointerId,type:e.pointerType}); }, true);
      for (const type of ['pointerup','pointercancel']) addEventListener(type, e => pointers.delete(e.pointerId), true);
      // Host input isolation only. No scene state, render loop or clock is rewritten.
      for (const type of ['keydown','keyup','pointerdown','pointerup','pointermove','mousedown','mouseup','mousemove','click','dblclick','wheel','touchstart','touchmove','touchend']) {
        addEventListener(type, e => { if (grading) { e.preventDefault(); e.stopImmediatePropagation(); } }, {capture:true,passive:false});
      }
      const acknowledgePause = () => {
        if (grading && !document.pointerLockElement && !pauseAcknowledged) { pauseAcknowledged = true; send('grade-paused'); }
      };
      addEventListener('message', e => {
        if (e.source !== parent || e.data?.channel !== 'lab-walkable-host' || e.data.token !== ${JSON.stringify(token)}) return;
        if (e.data.type === 'grade-pause' && !grading) {
          const target = document.activeElement || document;
          for (const key of [...held.values()]) target.dispatchEvent(new KeyboardEvent('keyup', {...key,bubbles:true}));
          for (const pointer of [...pointers.values()]) {
            pointer.target.dispatchEvent(new PointerEvent('pointerup', {pointerId:pointer.id,pointerType:pointer.type,bubbles:true}));
            if (pointer.target.hasPointerCapture?.(pointer.id)) pointer.target.releasePointerCapture(pointer.id);
          }
          pointers.clear();
          held.clear(); target.dispatchEvent(new MouseEvent('mouseup', {bubbles:true}));
          dispatchEvent(new Event('blur'));
          grading = true; pauseAcknowledged = false;
          wasInert = document.body.inert; document.body.inert = true;
          document.activeElement?.blur?.(); document.exitPointerLock?.(); acknowledgePause();
        } else if (e.data.type === 'grade-resume' && grading) {
          grading = false; document.body.inert = wasInert;
          // Never recapture the pointer here. The user chooses the scene's own control.
        }
      });
      addEventListener('error', () => send('failed'), true);
      addEventListener('unhandledrejection', () => send('failed'));
      document.addEventListener('securitypolicyviolation', () => send('failed'));
      document.addEventListener('webglcontextlost', () => send('failed'), true);
      document.addEventListener('pointerlockerror', () => send('pointer-error'));
      document.addEventListener('keydown', e => { if(e.key === 'Escape') { document.exitPointerLock?.(); send('released'); } });
      document.addEventListener('pointerlockchange', () => { if (grading) { if (document.pointerLockElement) document.exitPointerLock?.(); else acknowledgePause(); } else if (!document.pointerLockElement) send('released'); });
      const prefix = ${JSON.stringify(entry.readyTextPrefix || '')};
      const timer = setInterval(() => { const node = document.querySelector(${JSON.stringify(entry.readySelector)}); if (node && (!prefix || node.textContent.trim().startsWith(prefix))) { clearInterval(timer); send('ready'); } }, 150);
    })();`;
    return source.replace(/<head([^>]*)>/i, `<head$1><meta http-equiv="Content-Security-Policy" content="${escapeAttribute(csp)}"><base href="${escapeAttribute(folder)}"><script>${bridge}<\/script>`);
  }
  async function open(entry, button, push = true) {
    destroy(); lastButton = button; onOpen(entry);
    if (push) {
      const u = new URL(location.href), replace = !!history.state?.walkableScene;
      u.hash = `scene=${entry.id}`;
      history[replace ? 'replaceState' : 'pushState']({ ...history.state, walkableScene: entry.id }, '', u);
    }
    $('#viewer-title').textContent = titleFor(entry); document.querySelector('.viewer-foot span').textContent = `Desktop keyboard + mouse - ${entry.webgl || 'WebGL 2'} required`; $('#viewer-message').textContent = 'Loading the frozen build. Nothing else is running in this viewer.';
    $('#retry-viewer').hidden = true; $('#return-focus').disabled = true; $('#grade-scene').disabled = true;
    if (!$('#viewer').open) $('#viewer').showModal(); $('#close-viewer').focus();
    const controller = new AbortController(), token = crypto.randomUUID(), current = sequence;
    active = { entry, controller, token, timeout: setTimeout(() => { if (active?.token === token) fail('The scene did not become ready. It has been unloaded. Check WebGL 2 support or try again.'); }, 45000) };
    try {
      const folder = new URL(`entries/${entry.id}/frozen/`, base).href;
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
      if (active.ready) return;
      active.ready = true; clearTimeout(active.timeout); onReady(active.entry);
      $('#viewer-message').textContent = 'Ready. Click the entry control inside the scene. Press Esc to release the mouse, then choose Grade this scene or close to vote.';
      $('#return-focus').disabled = false; $('#grade-scene').disabled = !gradeForm;
    } else if (event.data.type === 'grade-paused' && active.grading) {
      clearTimeout(active.gradeTimeout);
      if (!active.gradeForm) active.gradeForm = gradeForm(active.entry);
      $('#scene-grade-label').textContent = gradeLabelFor(active.entry);
      $('#scene-grade-content').replaceChildren(active.gradeForm);
      if (!$('#scene-grade-dialog').open) $('#scene-grade-dialog').showModal();
      $('#scene-grade-content input')?.focus();
    } else if (event.data.type === 'failed') fail('A runtime or asset error prevented this scene from continuing. It has been unloaded. Try again or close the viewer.');
    else if (event.data.type === 'released' && !active.grading) { $('#viewer-message').textContent = 'Mouse released. Grade this scene, continue exploring, or close to return and vote.'; $('#grade-scene').focus(); }
    else if (event.data.type === 'pointer-error') $('#viewer-message').textContent = 'Mouse capture was denied. Click inside and try again, or close the scene. Some entries provide drag-to-look controls.';
  });
  $('#return-focus').addEventListener('click', () => $('#scene-mount iframe')?.focus());
  $('#grade-scene').addEventListener('click', showGrade);
  $('#resume-grade').addEventListener('click', resumeGrade);
  $('#grade-close-scene').addEventListener('click', () => close());
  $('#scene-grade-dialog').addEventListener('cancel', event => { event.preventDefault(); resumeGrade(); });
  $('#close-viewer').addEventListener('click', () => close());
  $('#viewer').addEventListener('cancel', event => { event.preventDefault(); close(); });
  addEventListener('popstate', () => { close(false); $('#notice').textContent = location.hash.startsWith('#scene=') ? 'The previous scene is unloaded. Choose Open walkable scene to start it again.' : ''; });
  addEventListener('pagehide', destroy);
  addEventListener('pageshow', event => { if (event.persisted) { close(false); $('#notice').textContent = 'Scenes were unloaded when you left. Open an entry to resume.'; } });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && (active || $('#viewer').open)) {
      close(false); const url = new URL(location.href); url.hash = '';
      const state = {...history.state}; delete state.walkableScene; history.replaceState(state, '', url);
      $('#notice').textContent = 'The scene was unloaded when this tab became hidden. Open it again when you are ready.';
    }
  });
  return {open,close,destroy,get isOpen(){return $('#viewer').open;}};
}

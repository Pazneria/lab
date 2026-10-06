// Shared host boundary; entrant source is never evaluated in the Lab page.
export function createViewer({base=new URL('../',import.meta.url),titleFor=entry=>entry.title,onOpen=()=>{},onReady=()=>{},onClose=()=>{}}={}) {
  const $=s=>document.querySelector(s),el=tag=>document.createElement(tag);
  let active=null,lastButton=null,sequence=0;
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
      addEventListener('error', () => send('failed'), true);
      addEventListener('unhandledrejection', () => send('failed'));
      document.addEventListener('securitypolicyviolation', () => send('failed'));
      document.addEventListener('webglcontextlost', () => send('failed'), true);
      document.addEventListener('pointerlockerror', () => send('pointer-error'));
      document.addEventListener('keydown', e => { if(e.key === 'Escape') { document.exitPointerLock?.(); send('released'); } });
      document.addEventListener('pointerlockchange', () => { if (!document.pointerLockElement) send('released'); });
      const timer = setInterval(() => { if (document.querySelector(${JSON.stringify(entry.readySelector)})) { clearInterval(timer); send('ready'); } }, 150);
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
    $('#retry-viewer').hidden = true; $('#return-focus').disabled = true;
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
      clearTimeout(active.timeout); onReady(active.entry);
      $('#viewer-message').textContent = 'Ready. Click the entry control inside the scene. Press Esc to release the mouse, then exit to return.';
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
      close(false); const url = new URL(location.href); url.hash = '';
      const state = {...history.state}; delete state.walkableScene; history.replaceState(state, '', url);
      $('#notice').textContent = 'The scene was unloaded when this tab became hidden. Open it again when you are ready.';
    }
  });
  return {open,close,destroy,get isOpen(){return $('#viewer').open;}};
}

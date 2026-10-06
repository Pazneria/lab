import { LIMITS } from './glb-policy.js';
import { calibrationFile } from './calibration.js';
import { BUNDLED_DEMO, loadBundledDemo } from './bundled-demo.js';

const $ = id => document.getElementById(id);
const collection = [];
const settings = { lighting: 'neutral', exposure: 0, background: 'slate', surface: 'original', grid: true };
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let viewer, viewerModule, activeId = null, pendingId = null, sequence = 0, nextId = 1, job = null;
let serialLoad = Promise.resolve(), disposed = false, dragDepth = 0;
const format = new Intl.NumberFormat('en', { maximumFractionDigits: 0 });
function status(text) { $('status').textContent = text; }
function error(text = '') { $('error').textContent = text; $('error').hidden = !text; }
function sizeLabel(size) { return `${(size / 1024 ** 2).toFixed(size < 1024 ** 2 ? 2 : 1)} MiB`; }
function nameLabel(file) { return file.name.replace(/\.glb$/i, '').slice(0, 180); }
function spinState(value) { $('spin-button').setAttribute('aria-pressed', String(value)); $('spin-button').textContent = value ? 'Stop spin' : 'Spin'; }
function controlsState() {
  const enabled = Boolean(viewer?.active && !viewer.contextLost);
  for (const element of document.querySelectorAll('.camera-bar button')) element.disabled = !enabled;
  $('spin-button').disabled = !enabled || reducedMotion.matches;
  $('motion-note').textContent = reducedMotion.matches ? 'Reduced motion: automatic spin is disabled. Manual camera controls remain available.' : 'Spin is opt-in. The viewport rests when idle.';
}
function renderCollection() {
  $('asset-count').textContent = collection.length;
  $('collection-empty').hidden = collection.length > 0;
  const fragment = document.createDocumentFragment();
  for (const [index, asset] of collection.entries()) {
    const row = document.createElement('li'); row.className = 'asset-row'; row.classList.toggle('active', asset.id === activeId);
    const select = document.createElement('button'); select.className = 'asset-select'; select.setAttribute('aria-pressed', String(asset.id === activeId)); select.title = asset.file.name; select.dataset.asset = asset.id;
    const number = document.createElement('span'); number.className = 'asset-number'; number.textContent = String(index + 1).padStart(2, '0');
    const info = document.createElement('span'), title = document.createElement('strong'), detail = document.createElement('small');
    title.textContent = nameLabel(asset.file); detail.textContent = `${asset.id === pendingId ? 'Loading · ' : ''}${asset.demo === 'robot' ? 'DEMO ASSET · ' : asset.demo === 'calibration' ? 'TEST FIXTURE · ' : ''}${sizeLabel(asset.file.size)}`;
    info.append(title, detail); select.append(number, info); select.addEventListener('click', () => selectAsset(asset.id));
    const remove = document.createElement('button'); remove.className = 'remove-asset'; remove.textContent = '×'; remove.dataset.removeAsset = asset.id; remove.setAttribute('aria-label', `Remove ${nameLabel(asset.file)}`); remove.addEventListener('click', () => removeAsset(asset.id));
    row.append(select, remove); fragment.append(row);
  }
  // Preserve focused collection controls when status or selection changes.
  const focused = document.activeElement?.dataset.asset, focusedRemove = document.activeElement?.dataset.removeAsset;
  $('asset-list').replaceChildren(fragment);
  if (focused) $('asset-list').querySelector(`[data-asset="${focused}"]`)?.focus({ preventScroll: true });
  else if (focusedRemove) $('asset-list').querySelector(`[data-remove-asset="${focusedRemove}"]`)?.focus({ preventScroll: true });
}
function cancelLoad(announce = true) {
  sequence++; job?.controller.abort(); job = null; pendingId = null;
  $('cancel-load').hidden = true; $('viewport').removeAttribute('aria-busy'); renderCollection();
  if (announce) status(activeId ? 'Load cancelled. The previous character remains in view.' : 'Load cancelled. Choose another GLB when ready.');
}
function preflight(buffer, signal) {
  return new Promise((resolve, reject) => {
    if (signal.aborted) { reject(new DOMException('Load cancelled', 'AbortError')); return; }
    let worker, settled = false;
    try { worker = new Worker(new URL('./preflight-worker.js', import.meta.url), { type: 'module' }); }
    catch { reject(new Error('The validation worker could not start. Serve this studio over HTTP(S), and use a browser with module worker support.')); return; }
    const clean = () => { settled = true; clearTimeout(timeout); signal.removeEventListener('abort', abort); worker.terminate(); };
    const abort = () => { if (settled) return; clean(); reject(new DOMException('Load cancelled', 'AbortError')); };
    const timeout = setTimeout(() => { clean(); reject(new Error('Validation/texture decoding exceeded 30 seconds and was stopped. Try a smaller or re-exported GLB.')); }, 30000);
    signal.addEventListener('abort', abort, { once: true });
    worker.onmessage = ({ data }) => { if (settled) { for (const bitmap of data.bitmaps ?? []) bitmap.close(); return; } clean(); if (data.ok) resolve(data); else reject(new Error(data.error)); };
    worker.onerror = event => { event.preventDefault(); clean(); reject(new Error('The local validation worker failed. Check browser support or re-export the GLB.')); };
    worker.onmessageerror = () => { clean(); reject(new Error('The browser could not transfer the decoded asset. Try a current browser.')); };
    try { worker.postMessage(buffer, [buffer]); } catch { clean(); reject(new Error('The file buffer could not be sent to the local validator.')); }
  });
}
async function getViewer() {
  if (viewer?.contextLost) throw new Error('The graphics context is unavailable. Reload this page and reopen your files.');
  if (!viewer) {
    viewerModule ??= import('./viewer.js').catch(() => { viewerModule = null; throw new Error('The local viewer modules could not load. Serve the complete character-studio folder over HTTP(S).'); });
    const { StudioViewer } = await viewerModule;
    if (disposed) throw new DOMException('Studio closed', 'AbortError');
    try { viewer = new StudioViewer($('canvas-host'), { onFault: message => { error(message); controlsState(); }, onSpinChange: spinState }); }
    catch { throw new Error('The graphics viewer could not start. WebGL 2 and hardware acceleration must be available in your browser. No file was uploaded.'); }
    viewer.configure(settings);
  }
  return viewer;
}
function selectAsset(id) {
  const asset = collection.find(item => item.id === id); if (!asset || (id === activeId && !pendingId)) return;
  cancelLoad(false); viewer?.setSpin(false); error();
  const token = sequence, controller = new AbortController(); job = { controller }; pendingId = id;
  $('cancel-load').hidden = false; $('viewport').setAttribute('aria-busy', 'true');
  status(asset.demo === 'robot' ? 'Loading bundled demo asset…' : `Checking ${nameLabel(asset.file)} locally…`); renderCollection();
  // Serial ownership also prevents overlapping GPU allocations during rapid selection changes.
  serialLoad = serialLoad.catch(() => {}).then(async () => {
    let decoded, prepared, owner;
    const stale = () => token !== sequence || controller.signal.aborted || disposed;
    try {
      if (stale()) return;
      const buffer = asset.demo === 'robot' ? await loadBundledDemo(controller.signal) : await asset.file.arrayBuffer(); if (stale()) return;
      if (asset.demo === 'robot') status('Checking the bundled demo with the shared GLB validator…');
      decoded = await preflight(buffer, controller.signal); if (stale()) return;
      status(`Preparing ${nameLabel(asset.file)} for inspection…`);
      owner = await getViewer(); if (stale()) return;
      prepared = await owner.prepare(decoded, controller.signal);
      // Ownership of bitmaps moved into the prepared asset (or was closed on prepare failure).
      decoded.bitmaps = [];
      if (stale()) return;
      const preserveView = activeId !== null;
      owner.show(prepared, preserveView); prepared = null;
      activeId = id; asset.stats = decoded.stats;
      $('active-name').textContent = nameLabel(asset.file); $('asset-kind').textContent = asset.demo === 'robot' ? 'DEMO ASSET · NOT JUDGED' : asset.demo === 'calibration' ? 'CALIBRATION · NOT AN ENTRANT' : 'LOCAL GLB';
      $('stage-index').textContent = String(collection.indexOf(asset) + 1).padStart(2, '0');
      $('stage-mode').textContent = 'View scale normalized · static pose';
      $('empty-stage').hidden = true;
      metadata(asset, owner.active);
      status(`${nameLabel(asset.file)} ready. ${preserveView ? 'Shared camera and lighting retained.' : 'Framed for inspection.'}${asset.demo === 'robot' ? ' This is a demo asset, not a judged entrant.' : asset.demo === 'calibration' ? ' This is a test fixture, not an entrant.' : ''}`);
    } catch (problem) {
      if (!stale() && problem.name !== 'AbortError') { error(problem.message || 'Could not open this asset. Re-export a self-contained GLB.'); status(activeId ? 'Import failed. The previous character is still available.' : 'Import failed. Choose another GLB to continue.'); }
    } finally {
      if (prepared) owner.release(prepared);
      for (const bitmap of decoded?.bitmaps ?? []) bitmap.close();
      if (token === sequence) { job = null; pendingId = null; $('cancel-load').hidden = true; $('viewport').removeAttribute('aria-busy'); renderCollection(); controlsState(); }
    }
  });
}
function addFiles(files, demo = null) {
  const issues = []; let added;
  for (const file of files) {
    if (!/\.glb$/i.test(file.name)) { issues.push(`${file.name.slice(0, 90)}: use a .glb file.`); continue; }
    if (file.size > LIMITS.fileBytes || file.size < 28) { issues.push(`${file.name.slice(0, 90)}: file must be between 28 bytes and 64 MiB.`); continue; }
    if (collection.some(item => item.file.name === file.name && item.file.size === file.size && item.file.lastModified === file.lastModified)) { issues.push(`${file.name.slice(0, 90)} is already in this collection.`); continue; }
    if (collection.length >= LIMITS.files || collection.reduce((total, item) => total + item.file.size, 0) + file.size > LIMITS.collectionBytes) { issues.push('Collection limit reached: 12 files / 192 MiB. Remove a file before adding more.'); break; }
    const asset = { id: String(nextId++), file, demo }; collection.push(asset); added ??= asset;
  }
  renderCollection();
  if (added) selectAsset(added.id);
  if (issues.length) error(issues.join(' '));
  else if (!added) status('No new GLB files were added.');
}
function openBundledDemo() {
  if (disposed) return;
  const existing = collection.find(item => item.demo === 'robot');
  if (existing) { selectAsset(existing.id); return; }
  if (collection.length >= LIMITS.files || collection.reduce((total, item) => total + item.file.size, 0) + BUNDLED_DEMO.bytes > LIMITS.collectionBytes) {
    error('Remove a file from the collection before adding the bundled demo.'); return;
  }
  // Metadata is available immediately; the pinned bytes are fetched inside the same
  // cancellable, serialized selection job as local files, then use the same preflight.
  const asset = { id: String(nextId++), file: { name: BUNDLED_DEMO.name, size: BUNDLED_DEMO.bytes, lastModified: 0 }, demo: 'robot' };
  collection.push(asset); selectAsset(asset.id);
}
function removeAsset(id) {
  const index = collection.findIndex(item => item.id === id); if (index < 0) return;
  if (pendingId === id) cancelLoad(false);
  const wasActive = activeId === id; collection.splice(index, 1);
  if (wasActive) {
    viewer?.clear(); activeId = null; $('empty-stage').hidden = false; $('active-name').textContent = 'No character selected'; $('asset-kind').textContent = 'STATIC INSPECTION'; $('stage-index').textContent = '—'; $('stage-mode').textContent = 'Choose a character to inspect';
    $('metadata').replaceChildren(); $('asset-notes').replaceChildren();
  } else if (activeId) $('stage-index').textContent = String(collection.findIndex(item => item.id === activeId) + 1).padStart(2, '0');
  renderCollection(); controlsState(); status('File removed from this tab’s collection.');
  if (wasActive && collection.length && !pendingId) selectAsset(collection[Math.min(index, collection.length - 1)].id);
  const next = $('asset-list').querySelector('.asset-select'); (next ?? $('demo-button')).focus({ preventScroll: true });
}
function metadata(asset, displayed) {
  const stats = asset.stats, dimensions = displayed.size.map(value => new Intl.NumberFormat('en', { maximumSignificantDigits: 4 }).format(value)).join(' × ');
  const rows = [['File size', sizeLabel(asset.file.size)], ['Triangles', format.format(stats.triangles)], ['Vertex references', format.format(stats.vertices)], ['Mesh nodes / primitives', `${stats.meshNodes} / ${stats.primitives}`], ['Materials in file', stats.materials], ['Textures / images', `${stats.textures} / ${stats.images}`], ['Texture pixels', `${(stats.imagePixels / 1e6).toFixed(2)} MP`], ['Dimensions (X × Y × Z)', `${dimensions} m`], ['Skins / joints', `${stats.skins} / ${stats.joints}`], ['Animation clips', `${stats.animations} · ignored`]];
  const fragment = document.createDocumentFragment();
  for (const [label, value] of rows) { const row = document.createElement('div'), dt = document.createElement('dt'), dd = document.createElement('dd'); dt.textContent = label; dd.textContent = value; row.append(dt, dd); fragment.append(row); }
  $('metadata').replaceChildren(fragment);
  const notes = [...stats.notes];
  if (asset.demo === 'robot') notes.unshift('Demo asset: RobotExpressive by Tomás Laulhé (Quaternius), modified by Don McCurdy. CC0 1.0. Not a submitted character or benchmark result. Its exported static pose is shown.');
  if (asset.demo === 'calibration') notes.unshift('Calibration fixture only: nine boxes, 108 displayed triangles. Not a submitted character or benchmark result.');
  if (!stats.skins) notes.push('No skin data. A skeleton is optional for static inspection.');
  notes.push('Dimensions assume the glTF meter convention. Original geometry is unchanged; only its display frame is normalized.');
  if (Math.abs(displayed.originalMin[1]) > .01) notes.push(`Original lowest Y: ${displayed.originalMin[1].toPrecision(4)} m. The preview is grounded for inspection; this is not a pass/fail judgment.`);
  if (stats.extensions.length) notes.push(`Extensions: ${stats.extensions.join(', ')}.`);
  if (settings.surface !== 'original') notes.push('Diagnostic surface mode replaces material appearance and shows both sides. Return to Original materials to judge the asset.');
  $('asset-notes').replaceChildren(...notes.map(note => { const li = document.createElement('li'); li.textContent = note; return li; }));
}
function applySettings() { viewer?.configure(settings); const asset = collection.find(item => item.id === activeId); if (asset && viewer?.active) metadata(asset, viewer.active); }
$('file-input').addEventListener('change', event => { addFiles([...event.target.files]); event.target.value = ''; });
$('empty-import').addEventListener('click', () => $('file-input').click());
$('demo-button').addEventListener('click', openBundledDemo);
$('calibration-button').addEventListener('click', () => { const existing = collection.find(item => item.demo === 'calibration'); if (existing) selectAsset(existing.id); else addFiles([calibrationFile()], 'calibration'); });
$('cancel-load').addEventListener('click', () => cancelLoad());
$('frame-button').addEventListener('click', () => viewer?.frame()); $('reset-button').addEventListener('click', () => viewer?.reset());
for (const button of document.querySelectorAll('[data-view]')) button.addEventListener('click', () => viewer?.view(button.dataset.view));
$('zoom-in').addEventListener('click', () => viewer?.zoom(.8)); $('zoom-out').addEventListener('click', () => viewer?.zoom(1.25));
$('spin-button').addEventListener('click', () => { if (!reducedMotion.matches) viewer?.setSpin(!viewer.spinning); });
for (const radio of document.querySelectorAll('[name=lighting]')) radio.addEventListener('change', () => { settings.lighting = radio.value; applySettings(); });
$('exposure').addEventListener('input', event => { settings.exposure = Number(event.target.value); $('exposure-value').textContent = `${settings.exposure > 0 ? '+' : ''}${settings.exposure.toFixed(1)} EV`; applySettings(); });
for (const key of ['background', 'surface']) $(key).addEventListener('change', event => { settings[key] = event.target.value; applySettings(); });
$('grid').addEventListener('change', event => { settings.grid = event.target.checked; applySettings(); });
reducedMotion.addEventListener('change', () => { if (reducedMotion.matches) viewer?.setSpin(false); controlsState(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') { viewer?.setSpin(false); if (pendingId) cancelLoad(); } });
function isFileDrag(event) { return [...(event.dataTransfer?.types ?? [])].includes('Files'); }
document.addEventListener('dragenter', event => { if (isFileDrag(event)) { event.preventDefault(); dragDepth++; $('drop-cue').hidden = false; } });
document.addEventListener('dragover', event => { if (isFileDrag(event)) { event.preventDefault(); event.dataTransfer.dropEffect = 'copy'; } });
document.addEventListener('dragleave', event => { if (isFileDrag(event) && --dragDepth <= 0) { dragDepth = 0; $('drop-cue').hidden = true; } });
document.addEventListener('drop', event => { if (isFileDrag(event)) { event.preventDefault(); dragDepth = 0; $('drop-cue').hidden = true; addFiles([...event.dataTransfer.files]); } });
window.addEventListener('blur', () => { dragDepth = 0; $('drop-cue').hidden = true; viewer?.setSpin(false); });
window.addEventListener('pagehide', () => { disposed = true; cancelLoad(false); viewer?.dispose(); viewer = null; collection.length = 0; });
window.addEventListener('pageshow', event => { if (event.persisted) { disposed = false; activeId = null; pendingId = null; $('empty-stage').hidden = false; $('active-name').textContent = 'No character selected'; $('metadata').replaceChildren(); $('asset-notes').replaceChildren(); $('stage-index').textContent = '—'; $('asset-kind').textContent = 'STATIC INSPECTION'; renderCollection(); controlsState(); status('Studio restored. Reopen your files to resume inspection.'); openBundledDemo(); } });
if (location.protocol === 'file:') error('Open this studio through an HTTP(S) static host. Browser module and worker restrictions prevent file:// operation.');
controlsState();
if (location.protocol === 'https:' || location.protocol === 'http:') openBundledDemo();

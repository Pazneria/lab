// Fixed first-party runtime asset. User imports never use this network path.
export const BUNDLED_DEMO = Object.freeze({
  name: 'RobotExpressive.glb',
  bytes: 463988,
  sha256: '047f5e5fb3bb6d378bd1df16ca6137f2a596c99b3a1b5690b4020c05aaf6f319',
});

export async function loadBundledDemo(signal) {
  const controller = new AbortController();
  const abort = () => controller.abort();
  if (signal.aborted) throw new DOMException('Load cancelled', 'AbortError');
  signal.addEventListener('abort', abort, { once: true });
  let timedOut = false;
  const timeout = setTimeout(() => { timedOut = true; controller.abort(); }, 30000);
  let reader;
  try {
    const url = new URL('./assets/demo/RobotExpressive.glb', import.meta.url);
    if (url.origin !== location.origin) throw new Error('The bundled demo must come from the studio’s own origin.');
    // Version the fixed URL so a deployment update cannot reuse stale demo bytes.
    url.searchParams.set('v', BUNDLED_DEMO.sha256.slice(0, 12));
    const response = await fetch(url, { signal: controller.signal, mode: 'same-origin', credentials: 'omit', redirect: 'error' });
    if (!response.ok || !response.body) throw new Error('The bundled demo could not be downloaded. You can still add your own GLB or use the calibration dummy.');
    const bytes = new Uint8Array(BUNDLED_DEMO.bytes);
    reader = response.body.getReader();
    let offset = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (offset + value.byteLength > bytes.length) throw new Error('The bundled demo exceeds its pinned file size.');
      bytes.set(value, offset); offset += value.byteLength;
    }
    if (offset !== bytes.length) throw new Error('The bundled demo is incomplete or has changed.');
    if (!globalThis.crypto?.subtle) throw new Error('Demo integrity checking requires HTTPS or localhost. Local GLB import remains available.');
    const digest = await crypto.subtle.digest('SHA-256', bytes);
    const hash = [...new Uint8Array(digest)].map(byte => byte.toString(16).padStart(2, '0')).join('');
    if (signal.aborted) throw new DOMException('Load cancelled', 'AbortError');
    if (hash !== BUNDLED_DEMO.sha256) throw new Error('The bundled demo failed its integrity check. Import your own GLB or try the calibration dummy.');
    return bytes.buffer;
  } catch (error) {
    if (timedOut) throw new Error('The bundled demo download timed out. Retry Load demo asset, import your own GLB, or use the calibration dummy.');
    if (signal.aborted) throw new DOMException('Load cancelled', 'AbortError');
    if (error instanceof TypeError) throw new Error('The bundled demo could not be fetched from this studio. Retry or add a local GLB.');
    throw error;
  } finally {
    clearTimeout(timeout); signal.removeEventListener('abort', abort);
    controller.abort(); reader?.releaseLock();
  }
}

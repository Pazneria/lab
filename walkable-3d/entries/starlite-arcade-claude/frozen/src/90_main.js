
// ---------------------------------------------------------------------------
// Environment (for reflections on glass, chrome and glossy paint)
// ---------------------------------------------------------------------------
function buildEnvironment() {
  const env = new THREE.Scene();
  const room = new THREE.Mesh(new THREE.BoxGeometry(8, 3.2, 12), new THREE.MeshBasicMaterial({ color: 0x07060c, side: THREE.BackSide }));
  env.add(room);
  const strip = (color, k, w, h, d, x, y, z) => { const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), new THREE.MeshBasicMaterial({ color: new THREE.Color(color).multiplyScalar(k) })); m.position.set(x, y, z); env.add(m); };
  strip(0xff3fa4, 3, 0.05, 0.05, 10, -3.9, 1.2, 0);
  strip(0x33d6ff, 3, 0.05, 0.05, 10, 3.9, 1.2, 0);
  strip(0xffe0c0, 1.6, 0.8, 0.02, 0.4, -1.2, 1.55, -2); strip(0xffe0c0, 1.6, 0.8, 0.02, 0.4, 1.2, 1.55, 2);
  strip(0xffc860, 2.0, 1.2, 0.5, 0.05, 0, 0.6, -5.9);
  strip(0x6fb8ff, 1.5, 1.6, 0.8, 0.05, 2.0, 0.2, 5.9);
  strip(0xff8a3a, 1.2, 0.05, 0.6, 0.6, -3.9, 0.3, 3);
  const pm = new THREE.PMREMGenerator(renderer);
  const rt = pm.fromScene(env, 0.03);
  pm.dispose();
  return rt.texture;
}

// ---------------------------------------------------------------------------
// Build the arcade
// ---------------------------------------------------------------------------
const statusEl = document.getElementById('status');
let feature, cabinets = [], screenLights = [];
function build() {
  initMaterials();
  scene.environment = buildEnvironment();
  scene.environmentIntensity = 0.55;
  scene.add(new THREE.HemisphereLight(0x9098d0, 0x302038, 0.9));
  buildRoom();
  // Bank A (left wall, facing +x): Volt-Tek classics
  const a1 = buildVoltTek('crater', 0.0, ['yellow', 'orange', 'red'], 'red');
  const a2 = buildVoltTek('nomads', 5.3, ['pink', 'purple', 'teal'], 'black');
  [[a1, -4.0], [a2, -4.68]].forEach(([c, z]) => { c.position.set(ROOM.x0 + 0.03 + c.userData.D / 2, 0, z); c.rotation.y = Math.PI / 2; staticRoot.add(c); cabinets.push(c); });
  // Bank B (right wall, facing -x): Wavecrest curves
  const b1 = buildWavecrest('tide', 2.1, ['teal', 'pink', 'yellow', 'white'], ['teal', 'pink', 'yellow', 'white']);
  const b2 = buildWavecrest('kite', 8.7, ['red', 'yellow', 'orange', 'white'], ['blue', 'white', 'teal', 'purple']);
  [[b1, -6.5], [b2, -7.28]].forEach(([c, z]) => { c.position.set(ROOM.x1 - 0.03 - c.userData.D / 2, 0, z); c.rotation.y = -Math.PI / 2; staticRoot.add(c); cabinets.push(c); });
  // feature cabinet at the far end, on axis with the entrance
  feature = buildLighthouse(3.7);
  feature.position.set(0, 0, -9.25); staticRoot.add(feature);
  // colliders for cabinets
  for (const c of cabinets) addLocalCollider(c, -c.userData.W / 2 - 0.01, -c.userData.D / 2, c.userData.W / 2 + 0.01, c.userData.D / 2 + c.userData.cpOver + 0.02);
  const [dw, dz0, dz1] = feature.userData.dais;
  addLocalCollider(feature, -dw / 2, dz0, dw / 2, dz1);
  for (const c of [...cabinets, feature]) if (c.userData.light) screenLights.push([c.userData.light, c.userData.light.intensity, Math.random() * 10]);
  // one shared screen-glow light per bank (keeps the per-pixel light count low)
  for (const [col, x, z] of [[0xe07ab8, ROOM.x0 + 1.25, -4.34], [0x7ad8d0, ROOM.x1 - 1.3, -6.89]]) {
    const l = new THREE.PointLight(col, 3.2, 3.6, 2); l.position.set(x, 1.3, z); scene.add(l);
    screenLights.push([l, l.intensity, Math.random() * 10]);
  }
  // keep the animated parts out of the merge
  feature.userData.keep = false;
  const calls = mergeStatic(staticRoot);
  return calls;
}

// ---------------------------------------------------------------------------
// Player, input, collision
// ---------------------------------------------------------------------------
const START = { x: 0, z: -0.95, yaw: 0, pitch: -0.04 };
const player = { x: START.x, z: START.z, vx: 0, vz: 0, yaw: START.yaw, pitch: START.pitch, eye: 1.62, crouch: false, bob: 0 };
const RADIUS = 0.27;
const keys = new Set();
function resetPlayer() { Object.assign(player, { x: START.x, z: START.z, vx: 0, vz: 0, yaw: START.yaw, pitch: START.pitch, crouch: false }); }
function collide() {
  for (let it = 0; it < 3; it++) {
    let moved = false;
    for (const c of colliders) {
      const cx = Math.max(c.x0, Math.min(player.x, c.x1)), cz = Math.max(c.z0, Math.min(player.z, c.z1));
      let dx = player.x - cx, dz = player.z - cz; const d2 = dx * dx + dz * dz;
      if (d2 >= RADIUS * RADIUS) continue;
      if (d2 > 1e-10) { const d = Math.sqrt(d2), p = (RADIUS - d) / d; player.x += dx * p; player.z += dz * p; }
      else { // centre inside the box: push out along the shallowest axis
        const l = player.x - c.x0, r = c.x1 - player.x, b = player.z - c.z0, f = c.z1 - player.z, m = Math.min(l, r, b, f);
        if (m === l) player.x = c.x0 - RADIUS; else if (m === r) player.x = c.x1 + RADIUS; else if (m === b) player.z = c.z0 - RADIUS; else player.z = c.z1 + RADIUS;
      }
      moved = true;
    }
    if (!moved) break;
  }
}
const overlay = document.getElementById('overlay'), hud = document.getElementById('hud');
let locked = false, ready = false, dragging = false, showHud = false;
const canvas = renderer.domElement;
overlay.addEventListener('click', () => {
  if (!ready) return;
  overlay.classList.add('hidden');
  const p = canvas.requestPointerLock ? canvas.requestPointerLock() : null;
  if (p && p.catch) p.catch(() => {});
});
document.addEventListener('pointerlockchange', () => {
  locked = document.pointerLockElement === canvas;
  if (!locked) { overlay.classList.remove('hidden'); keys.clear(); }
});
canvas.addEventListener('mousedown', () => { if (!locked) dragging = true; if (!locked && ready && overlay.classList.contains('hidden')) { const p = canvas.requestPointerLock(); if (p && p.catch) p.catch(() => {}); } });
window.addEventListener('mouseup', () => { dragging = false; });
document.addEventListener('mousemove', (e) => {
  if (!locked && !dragging) return;
  const mx = Math.max(-250, Math.min(250, e.movementX || 0)), my = Math.max(-250, Math.min(250, e.movementY || 0));
  const s = 0.0021 * (camera.fov / 70);
  player.yaw -= mx * s; player.pitch -= my * s;
  player.pitch = Math.max(-1.45, Math.min(1.45, player.pitch));
});
window.addEventListener('keydown', (e) => {
  if (e.code === 'KeyR') resetPlayer();
  else if (e.code === 'KeyF') { showHud = !showHud; hud.style.display = showHud ? 'block' : 'none'; }
  else if (e.code === 'KeyQ') {
    // cycle: auto -> 0.75 -> 1.0 -> 1.5 -> 2.0 -> auto
    const seq = ['auto', 0.75, 1.0, 1.5, 2.0];
    const cur = auto.on ? 'auto' : RENDER_SCALES[renderScaleIdx];
    const next = seq[(seq.indexOf(cur) + 1) % seq.length];
    if (next === 'auto') { auto.on = true; auto.ceiling = 7; setAutoLevel(7); }
    else { auto.on = false; renderScaleIdx = RENDER_SCALES.indexOf(next); applyPixelRatio(); }
  }
  else if (e.code === 'KeyC' || e.code === 'ControlLeft') player.crouch = !player.crouch;
  keys.add(e.code);
  if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) e.preventDefault();
});
window.addEventListener('keyup', (e) => keys.delete(e.code));
window.addEventListener('blur', () => keys.clear());
window.addEventListener('resize', () => { camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix(); if (auto.on) setAutoLevel(auto.level); else applyPixelRatio(); });

function updatePlayer(dt) {
  let f = 0, s = 0;
  if (keys.has('KeyW') || keys.has('ArrowUp')) f += 1;
  if (keys.has('KeyS') || keys.has('ArrowDown')) f -= 1;
  if (keys.has('KeyD') || keys.has('ArrowRight')) s += 1;
  if (keys.has('KeyA') || keys.has('ArrowLeft')) s -= 1;
  const run = keys.has('ShiftLeft') || keys.has('ShiftRight');
  const speed = (player.crouch ? 1.1 : (run ? 3.4 : 1.9));
  const len = Math.hypot(f, s) || 1;
  const sy = Math.sin(player.yaw), cy = Math.cos(player.yaw);
  const tx = ((-sy) * f + cy * s) / len * speed, tz = ((-cy) * f + (-sy) * s) / len * speed;
  const k = 1 - Math.exp(-dt * ((f || s) ? 11 : 14));
  player.vx += (tx - player.vx) * k; player.vz += (tz - player.vz) * k;
  player.x += player.vx * dt; player.z += player.vz * dt;
  collide();
  const sp = Math.hypot(player.vx, player.vz);
  player.bob += dt * sp * 5.2;
  const targetEye = player.crouch ? 1.12 : 1.62;
  player.eye += (targetEye - player.eye) * (1 - Math.exp(-dt * 10));
  camera.position.set(player.x, player.eye + Math.sin(player.bob) * 0.012 * Math.min(1, sp / 1.9), player.z);
  camera.rotation.set(player.pitch, player.yaw, 0, 'YXZ');
}

// ---------------------------------------------------------------------------
// Animation + frame loop
// ---------------------------------------------------------------------------
const clock = new THREE.Clock();
const frameTimes = new Float32Array(240); let ftIdx = 0, hudTimer = 0;
const _bc = new THREE.Color(), _v1 = new THREE.Vector3(), _v2 = new THREE.Vector3();
function animate(t, dt) {
  uTime.value = t;
  const fu = feature.userData;
  fu.beams.rotation.y = t * 0.75;
  // lantern halo brightens when a beam swings toward the viewer
  fu.halo.getWorldPosition(_v1); _v2.copy(camera.position).sub(_v1).setY(0).normalize();
  const bx = Math.cos(fu.beams.rotation.y), bz = -Math.sin(fu.beams.rotation.y);
  const facing = Math.abs(bx * _v2.x + bz * _v2.z);
  fu.halo.material.opacity = 0.25 + 0.6 * Math.pow(facing, 8);
  fu.halo.quaternion.copy(camera.quaternion);
  // chase lights
  const n = fu.nBulbs;
  for (let i = 0; i < n; i++) {
    const ph = ((i - t * 7) % 4 + 4) % 4;
    const on = ph < 1.2 ? 1 : 0.18;
    _bc.setRGB(2.6 * on + 0.1, 1.9 * on + 0.05, 0.8 * on);
    fu.bulbs.setColorAt(i, _bc);
  }
  fu.bulbs.instanceColor.needsUpdate = true;
  M.beamDome.emissiveIntensity = 0.7 + 0.6 * (0.5 + 0.5 * Math.sin(t * 2.6));
  for (const [l, base, ph] of screenLights) l.intensity = base * (0.92 + 0.08 * Math.sin(t * 0.9 + ph));
}
// Adaptive render scale: drop resolution when frames run long, never climb back above a level that was too slow.
const AUTO_LEVELS = [0.6, 0.7, 0.8, 0.9, 1.0, 1.15, 1.3, 1.5];
const auto = { on: true, level: 4, ceiling: 7, acc: 0, n: 0, good: 0, spikes: 0 };
function setAutoLevel(l) {
  auto.level = l;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, AUTO_LEVELS[l]) * Math.min(1, (window.devicePixelRatio || 1) >= AUTO_LEVELS[l] ? 1 : 1));
  renderer.setSize(window.innerWidth, window.innerHeight);
}
function autoScale(rawDt) {
  if (!auto.on || document.hidden || !overlay.classList.contains('hidden')) { auto.acc = auto.n = 0; return; }
  if (rawDt > 0.1) { auto.acc = auto.n = 0; return; }
  auto.acc += rawDt; auto.n++;
  if (auto.acc < 1.0) return;
  const avg = auto.acc / auto.n * 1000; auto.acc = auto.n = 0;
  const maxUseful = AUTO_LEVELS.findIndex(v => v >= (window.devicePixelRatio || 1));
  const cap = Math.min(auto.ceiling, maxUseful < 0 ? AUTO_LEVELS.length - 1 : maxUseful);
  if (avg > 18.6 && auto.level > 0) { auto.ceiling = auto.level - 1; setAutoLevel(auto.level - 1); auto.good = 0; }
  else if (avg < 17.4) { if (++auto.good >= 3 && auto.level < cap) { setAutoLevel(auto.level + 1); auto.good = 0; } }
  else auto.good = 0;
}
function frame() {
  const rawDt = clock.getDelta();
  autoScale(rawDt);
  const dt = Math.min(rawDt, 0.05);
  const t = clock.elapsedTime;
  updatePlayer(dt);
  animate(t, dt);
  renderer.render(scene, camera);
  frameTimes[ftIdx++ % frameTimes.length] = dt * 1000;
  if (showHud && (hudTimer += dt) > 0.25) {
    hudTimer = 0;
    const N = Math.min(ftIdx, frameTimes.length), arr = Array.from(frameTimes.slice(0, N)).sort((a, b) => a - b);
    const avg = arr.reduce((a, b) => a + b, 0) / N, p95 = arr[Math.floor(N * 0.95)], mx = arr[N - 1];
    const info = renderer.info.render;
    hud.textContent = `frame ${avg.toFixed(2)} ms (${(1000 / avg).toFixed(0)} fps)\np95 ${p95.toFixed(2)} ms  max ${mx.toFixed(2)} ms\ndraw calls ${info.calls}  tris ${(info.triangles / 1000).toFixed(0)}k\nrender scale ${auto.on ? 'auto ' + AUTO_LEVELS[auto.level] : RENDER_SCALES[renderScaleIdx]} (px ratio ${renderer.getPixelRatio().toFixed(2)})\npos ${player.x.toFixed(2)}, ${player.z.toFixed(2)}`;
  }
}

// kick off: let the overlay paint, then build, precompile, and start
requestAnimationFrame(() => setTimeout(() => {
  try {
    const t0 = performance.now();
    const calls = build();
    setAutoLevel(7);
    resetPlayer(); updatePlayer(0);
    for (const t of allTextures) renderer.initTexture(t);
    renderer.compile(scene, camera);
    renderer.render(scene, camera);
    ready = true;
    statusEl.textContent = `Ready · built in ${((performance.now() - t0) / 1000).toFixed(1)} s`;
    document.getElementById('go').textContent = 'CLICK TO ENTER';
    clock.start();
    renderer.setAnimationLoop(frame);
    window.__arcade = { renderer, scene, camera, player, colliders, calls };
  } catch (err) {
    statusEl.textContent = 'Error: ' + err.message;
    console.error(err);
  }
}, 30));

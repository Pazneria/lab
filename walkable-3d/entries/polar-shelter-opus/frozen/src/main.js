import * as THREE from 'three';
import { makeSky, makeStars, buildTerrain, buildMountains, MOON_DIR, SUN_DIR } from './world.js';
import { buildShelter } from './shelter.js';
import { snowDetail } from './textures.js';

const status = document.getElementById('status');
const setStatus = t => { if (status) status.textContent = t; };

const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
const PR_MAX = Math.min(window.devicePixelRatio || 1, 1.25);
let pixelRatio = Math.min(PR_MAX, 1.0), adaptive = true;
renderer.setPixelRatio(pixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.15;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.shadowMap.autoUpdate = false;     // static scene: shadows rendered once
renderer.autoClear = false;
renderer.info.autoReset = false;
document.getElementById('app').appendChild(renderer.domElement);

const scene = new THREE.Scene();          // exterior pass
const iscene = new THREE.Scene();         // interior pass (own warm lights, no fog)
const tscene = new THREE.Scene();         // exterior transparents (glass, ice, glows) drawn last
scene.fog = new THREE.FogExp2(0x324a78, 0.0016);
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.04, 3000);

// ---------- sky + environment maps ----------
const sky = makeSky(1);
scene.add(sky);
scene.add(makeStars());
const pmrem = new THREE.PMREMGenerator(renderer);
{
  const envScene = new THREE.Scene();
  const s2 = makeSky(0); s2.scale.setScalar(50); envScene.add(s2);
  // treat env cube camera at origin: sky shader uses direction only
  scene.environment = pmrem.fromScene(envScene, 0.02, 0.1, 1000).texture;
}
// warm interior environment for interior materials (no blue sky leaking indoors)
let warmEnv;
{
  const es = new THREE.Scene();
  const g = new THREE.SphereGeometry(5, 32, 16);
  const m = new THREE.ShaderMaterial({ side: THREE.BackSide, vertexShader: 'varying vec3 vP; void main(){ vP = position; gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0);} ',
    fragmentShader: 'varying vec3 vP; void main(){ float h = normalize(vP).y; vec3 c = mix(vec3(0.16,0.09,0.05), vec3(0.42,0.28,0.17), smoothstep(-0.6,0.9,h)); c += vec3(0.6,0.42,0.25)*smoothstep(0.85,1.0,h); gl_FragColor = vec4(c,1.0);} ' });
  es.add(new THREE.Mesh(g, m));
  warmEnv = pmrem.fromScene(es, 0.04).texture;
}

// ---------- lights ----------
const moon = new THREE.DirectionalLight(0xa9c2ff, 0.55);
moon.position.copy(MOON_DIR).multiplyScalar(60).add(new THREE.Vector3(0, 0, -3));
moon.target.position.set(0, 0, -3);
moon.castShadow = true;
moon.shadow.mapSize.set(2048, 2048);
const sc = moon.shadow.camera; sc.left = -26; sc.right = 26; sc.top = 26; sc.bottom = -26; sc.near = 1; sc.far = 140;
moon.shadow.bias = -0.0006; moon.shadow.normalBias = 0.03; moon.shadow.radius = 2.5;
scene.add(moon, moon.target);
// faint horizon-glow fill from the sunset direction (no shadow)
const glowFill = new THREE.DirectionalLight(0xffa070, 0.12);
glowFill.position.copy(SUN_DIR).setY(0.15).multiplyScalar(50);
// (kept out of the scene for performance; sky env map already carries the glow)

// ---------- world ----------
setStatus('Shaping wind-blown snow…');
const terrain = buildTerrain(snowDetail());
scene.add(terrain);
const mountains = buildMountains();
scene.add(mountains);
setStatus('Building the shelter…');
const shelter = buildShelter(scene, iscene, warmEnv);
// move exterior transparents into their own final pass
{
  const move = [];
  scene.traverse(o => { if (o === sky) return; if ((o.isMesh || o.isSprite || o.isPoints) && o.material && o.material.transparent) move.push(o); });
  for (const o of move) { o.updateWorldMatrix(true, false); const m = o.matrixWorld.clone(); o.removeFromParent(); m.decompose(o.position, o.quaternion, o.scale); tscene.add(o); }
  tscene.fog = scene.fog; tscene.environment = scene.environment;
  const m2 = new THREE.DirectionalLight(0xa9c2ff, 0.55); m2.position.copy(moon.position); m2.target = moon.target; tscene.add(m2);
}
sky.renderOrder = 1000;   // draw sky after opaque geometry so it only shades uncovered pixels
terrain.renderOrder = 5; mountains.renderOrder = 6;   // building first: it hides most terrain nearby
renderer.shadowMap.needsUpdate = true;

// ---------- controls ----------
const START = { x: 1.4, z: 9.5, yaw: 0.12, pitch: 0.02 };
const player = { x: START.x, z: START.z, y: 0, eyeY: 0, yaw: START.yaw, pitch: START.pitch, vx: 0, vz: 0 };
const EYE = 1.62, CROUCH = 1.05, RADIUS = 0.24, BOUND = 30;
let crouch = 0;
const keys = new Set();
const overlay = document.getElementById('overlay');
const hud = document.getElementById('hud');
const stats = document.getElementById('stats');
let locked = false, statsOn = false;

function reset() {
  Object.assign(player, { x: START.x, z: START.z, yaw: START.yaw, pitch: START.pitch, vx: 0, vz: 0 });
  player.y = shelter.floorAt(player.x, player.z); player.eyeY = player.y;
}
reset();

overlay.addEventListener('click', () => renderer.domElement.requestPointerLock());
renderer.domElement.addEventListener('click', () => { if (!locked) renderer.domElement.requestPointerLock(); });
document.addEventListener('pointerlockchange', () => {
  locked = document.pointerLockElement === renderer.domElement;
  overlay.style.display = locked ? 'none' : 'flex';
  hud.style.opacity = locked ? '0.85' : '0';
  if (!locked) keys.clear();
});
document.addEventListener('mousemove', e => {
  if (!locked) return;
  const s = 0.0022;
  player.yaw -= e.movementX * s;
  player.pitch = Math.max(-1.45, Math.min(1.45, player.pitch - e.movementY * s));
});
addEventListener('keydown', e => {
  keys.add(e.code);
  if (e.code === 'KeyR') reset();
  if (e.code === 'KeyF') { statsOn = !statsOn; stats.style.display = statsOn ? 'block' : 'none'; }
  if (e.code === 'KeyP') { adaptive = !adaptive; if (!adaptive) { pixelRatio = PR_MAX; renderer.setPixelRatio(pixelRatio); } }
  if (['Space', 'ArrowUp', 'ArrowDown'].includes(e.code)) e.preventDefault();
});
addEventListener('keyup', e => keys.delete(e.code));
addEventListener('blur', () => keys.clear());
addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});

const cols = shelter.colliders;
function collide(p) {
  for (let it = 0; it < 3; it++) {
    let hit = false;
    for (const c of cols) {
      const cx = Math.max(c.x0, Math.min(p.x, c.x1)), cz = Math.max(c.z0, Math.min(p.z, c.z1));
      const dx = p.x - cx, dz = p.z - cz; const d2 = dx * dx + dz * dz;
      if (d2 < RADIUS * RADIUS) {
        hit = true;
        if (d2 > 1e-9) { const d = Math.sqrt(d2); const push = (RADIUS - d) / d; p.x += dx * push; p.z += dz * push; }
        else { // inside box: push out along shortest axis
          const l = p.x - c.x0, r = c.x1 - p.x, b = p.z - c.z0, f = c.z1 - p.z; const m = Math.min(l, r, b, f);
          if (m === l) p.x = c.x0 - RADIUS; else if (m === r) p.x = c.x1 + RADIUS; else if (m === b) p.z = c.z0 - RADIUS; else p.z = c.z1 + RADIUS;
        }
      }
    }
    if (!hit) break;
  }
  const dx = p.x, dz = p.z + 3; const d = Math.hypot(dx, dz);
  if (d > BOUND) { p.x = dx / d * BOUND; p.z = dz / d * BOUND - 3; }
}

function update(dt) {
  const run = keys.has('ShiftLeft') || keys.has('ShiftRight');
  const wantCrouch = keys.has('KeyC') || keys.has('ControlLeft');
  crouch += ((wantCrouch ? 1 : 0) - crouch) * Math.min(1, dt * 10);
  let fx = 0, fz = 0;
  if (keys.has('KeyW') || keys.has('ArrowUp')) fz -= 1;
  if (keys.has('KeyS') || keys.has('ArrowDown')) fz += 1;
  if (keys.has('KeyA') || keys.has('ArrowLeft')) fx -= 1;
  if (keys.has('KeyD') || keys.has('ArrowRight')) fx += 1;
  const len = Math.hypot(fx, fz) || 1;
  const speed = (run ? 4.2 : 2.1) * (wantCrouch ? 0.5 : 1);
  const s = Math.sin(player.yaw), c = Math.cos(player.yaw);
  const tx = (fx * c + fz * s) / len * speed, tz = (-fx * s + fz * c) / len * speed;
  const k = Math.min(1, dt * 12);
  player.vx += (tx - player.vx) * k; player.vz += (tz - player.vz) * k;
  // sub-step for robust collision
  const steps = Math.max(1, Math.ceil(Math.hypot(player.vx, player.vz) * dt / 0.08));
  for (let i = 0; i < steps; i++) {
    player.x += player.vx * dt / steps; player.z += player.vz * dt / steps;
    collide(player);
  }
  const fy = shelter.floorAt(player.x, player.z);
  // smooth floor following (steps/thresholds feel natural, no snapping)
  const rate = fy > player.y ? 14 : 10;
  player.y += (fy - player.y) * Math.min(1, dt * rate);
  const moving = Math.hypot(player.vx, player.vz);
  bob += moving * dt * 3.2;
  const eye = EYE - (EYE - CROUCH) * crouch + Math.sin(bob * 2) * 0.012 * Math.min(1, moving / 2);
  camera.position.set(player.x, player.y + eye, player.z);
  camera.rotation.set(player.pitch, player.yaw, 0, 'YXZ');
  const inside = player.z < 0.05 && Math.abs(player.x) < 3.4 && player.z > -7.2;
  hud.dataset.zone = inside ? (player.z > -2.3 ? 'Vestibule' : 'Main room') : 'Outside';
}
let bob = 0;

// ---------- rendering: exterior opaque, interior, exterior transparent ----------
let shadowFrames = 2;
function draw() {
  renderer.info.reset(); renderer.clear();
  if (shadowFrames > 0) { renderer.shadowMap.needsUpdate = true; shadowFrames--; }
  // whichever side the viewer is on is drawn first so the other side is mostly depth-rejected
  const p = camera.position;
  const inside = p.x > -3.4 && p.x < 3.4 && p.z > -7.2 && p.z < 0.0 && p.y > 0.6;
  if (inside) { renderer.render(iscene, camera); renderer.render(scene, camera); }
  else { renderer.render(scene, camera); renderer.render(iscene, camera); }
  renderer.render(tscene, camera);    // glass, icicles, glows
}
// gentle dynamic resolution: keeps frame time steady on weaker GPUs
let aT = 0, aN = 0, aGood = 0, aUps = 0, aWarm = 3;
function adapt(dt) {
  if (!adaptive || dt > 0.25) return;
  aT += dt; aN++;
  if (aT < 1.0) return;
  const avg = aT / aN * 1000; aT = 0; aN = 0;
  if (aWarm > 0) { aWarm--; return; }          // ignore start-up seconds
  let next = pixelRatio;
  if (avg > 19.5 && pixelRatio > 0.5) { next = Math.max(0.5, pixelRatio - 0.1); aGood = 0; }
  else if (avg < 17.6 && aUps < 4) { if (++aGood >= 4 && pixelRatio < PR_MAX) { next = Math.min(PR_MAX, pixelRatio + 0.05); aGood = 0; aUps++; } }
  else aGood = 0;
  if (next !== pixelRatio) { pixelRatio = +next.toFixed(2); renderer.setPixelRatio(pixelRatio); }
}

// ---------- frame stats ----------
const ft = new Float32Array(240); let fi = 0, fcount = 0;
let last = performance.now(), statT = 0;
function loop(now) {
  const rawDt = (now - last) / 1000; last = now;
  const dt = Math.min(rawDt, 0.05);
  ft[fi] = rawDt * 1000; fi = (fi + 1) % ft.length; fcount = Math.min(fcount + 1, ft.length);
  update(dt);
  draw();
  adapt(rawDt);
  statT += rawDt;
  if (statsOn && statT > 0.25) {
    statT = 0;
    const arr = Array.from(ft.slice(0, fcount)).sort((a, b) => a - b);
    const avg = arr.reduce((a, b) => a + b, 0) / arr.length;
    const p99 = arr[Math.floor(arr.length * 0.99)] || 0;
    const info = renderer.info.render;
    stats.textContent = `${(1000 / avg).toFixed(0)} fps  avg ${avg.toFixed(2)} ms  p99 ${p99.toFixed(1)} ms  max ${arr[arr.length - 1].toFixed(1)} ms\ncalls ${info.calls}  tris ${(info.triangles / 1000).toFixed(0)}k  res ${pixelRatio.toFixed(2)}${adaptive ? ' auto' : ' fixed'}  ${hud.dataset.zone}`;
  }
  requestAnimationFrame(loop);
}

// compile shaders up front (avoids hitches when first looking through the door)
setStatus('Compiling shaders…');
await new Promise(r => setTimeout(r, 0));
renderer.compile(scene, camera); renderer.compile(iscene, camera); renderer.compile(tscene, camera);
draw();
setStatus('');
document.getElementById('start').textContent = 'Click to enter';
requestAnimationFrame(t => { last = t; loop(t); });

// debug/test hook
window.__view = (x, z, yaw, pitch = 0) => { player.x = x; player.z = z; player.yaw = yaw; player.pitch = pitch; player.y = shelter.floorAt(x, z); player.vx = player.vz = 0; };
window.__bench = (n = 30, w = 0, h = 0) => {
  const gl = renderer.getContext(); const px = new Uint8Array(4);
  if (w) { renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); }
  update(0); draw(); gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, px);
  const t = [];
  for (let i = 0; i < n; i++) { const t0 = performance.now(); update(1 / 60); draw(); gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, px); t.push(performance.now() - t0); }
  t.sort((a, b) => a - b);
  return { median: +t[n >> 1].toFixed(2), max: +t[n - 1].toFixed(2), calls: renderer.info.render.calls, tris: renderer.info.render.triangles, px: renderer.domElement.width + 'x' + renderer.domElement.height };
};
window.__player = player; window.__keys = keys; window.__scene = scene; window.__iscene = iscene; window.__tscene = tscene; window.__renderer = renderer; window.__shelter = shelter;
window.__stats = () => { const arr = Array.from(ft.slice(0, fcount)).sort((a, b) => a - b); return { avg: arr.reduce((a, b) => a + b, 0) / arr.length, p99: arr[Math.floor(arr.length * 0.99)], max: arr[arr.length - 1], calls: renderer.info.render.calls, tris: renderer.info.render.triangles }; };

import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { buildBay } from './bay.js';
import { solids, circles, surfaces } from './geo.js';

const $ = (id) => document.getElementById(id);
const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
let pixelCap = 1.5;
renderer.setPixelRatio(Math.min(devicePixelRatio, pixelCap));
renderer.setSize(innerWidth, innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.shadowMap.autoUpdate = false;
document.body.prepend(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);
const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
scene.environmentIntensity = 0.22;

const camera = new THREE.PerspectiveCamera(70, innerWidth / innerHeight, 0.05, 900);
camera.rotation.order = 'YXZ';

const bay = buildBay(scene, renderer);
renderer.shadowMap.needsUpdate = true;

// ------------------------------------------------------------------ player
const RADIUS = 0.28, HEIGHT = 1.75, STEP = 0.36, EYE = 1.62, CROUCH_EYE = 1.05;
const START = { x: 5.6, y: 0, z: 4.9, yaw: Math.atan2(5.6, 4.9) + 0.1, pitch: -0.02 };
const P = { x: 0, y: 0, z: 0, vx: 0, vz: 0, vy: 0, yaw: 0, pitch: 0, eye: EYE, camY: 0, grounded: true };
function reset() { Object.assign(P, { x: START.x, y: START.y, z: START.z, vx: 0, vz: 0, vy: 0, yaw: START.yaw, pitch: START.pitch, eye: EYE }); P.camY = P.y + EYE; }
reset();

function blocked(x, z, feet, height) {
  const lo = feet + STEP, hi = feet + height, r2 = RADIUS * RADIUS;
  for (const b of solids) {
    if (b.maxY <= lo || b.minY >= hi) continue;
    const cx = x < b.minX ? b.minX : x > b.maxX ? b.maxX : x, cz = z < b.minZ ? b.minZ : z > b.maxZ ? b.maxZ : z;
    const dx = x - cx, dz = z - cz;
    if (dx * dx + dz * dz < r2) return true;
  }
  for (const c of circles) {
    if (c.maxY <= lo || c.minY >= hi) continue;
    const dx = x - c.x, dz = z - c.z, rr = c.r + RADIUS;
    if (dx * dx + dz * dz < rr * rr) return true;
  }
  for (const s of surfaces) {
    if (x < s.minX - RADIUS || x > s.maxX + RADIUS || z < s.minZ - RADIUS || z > s.maxZ + RADIUS) continue;
    const cx = Math.min(s.maxX, Math.max(s.minX, x)), cz = Math.min(s.maxZ, Math.max(s.minZ, z));
    const dx = x - cx, dz = z - cz;
    if (dx * dx + dz * dz >= r2) continue;
    const h = s.h(cx, cz);
    if (h > lo && h - s.thick < hi) return true;
  }
  return false;
}
function groundAt(x, z, feet) {
  let g = -Infinity;
  for (const s of surfaces) {
    if (x < s.minX || x > s.maxX || z < s.minZ || z > s.maxZ) continue;
    const h = s.h(x, z);
    if (h <= feet + STEP + 1e-3 && h > g) g = h;
  }
  return g;
}

const keys = new Set();
let locked = false;
addEventListener('keydown', (e) => {
  keys.add(e.code);
  if (e.code === 'KeyR') reset();
  if (e.code === 'KeyF') $('stats').classList.toggle('hidden');
  if (e.code === 'KeyH') $('help').classList.toggle('hidden');
  if (e.code === 'KeyP') { pixelCap = pixelCap >= 1.5 ? 1 : pixelCap >= 1.25 ? 1.5 : 1.25; renderer.setPixelRatio(Math.min(devicePixelRatio, pixelCap)); renderer.setSize(innerWidth, innerHeight); }
  if (e.code.startsWith('Arrow') || e.code === 'Space') e.preventDefault();
});
addEventListener('keyup', (e) => keys.delete(e.code));
addEventListener('blur', () => keys.clear());
const canvas = renderer.domElement;
const lock = () => canvas.requestPointerLock?.();
$('start').addEventListener('click', lock);
canvas.addEventListener('click', () => { if (!locked) lock(); });
$('resetBtn').addEventListener('click', (e) => { e.stopPropagation(); reset(); });
document.addEventListener('pointerlockchange', () => {
  locked = document.pointerLockElement === canvas;
  $('overlay').classList.toggle('hidden', locked);
});
addEventListener('mousemove', (e) => {
  if (!locked) return;
  const mx = Math.max(-250, Math.min(250, e.movementX)), my = Math.max(-250, Math.min(250, e.movementY));
  P.yaw -= mx * 0.0021; P.pitch -= my * 0.0021;
  P.pitch = Math.max(-1.5, Math.min(1.5, P.pitch));
});
addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});

function stepPlayer(dt) {
  const k = (c) => keys.has(c);
  let f = (k('KeyW') || k('ArrowUp') ? 1 : 0) - (k('KeyS') || k('ArrowDown') ? 1 : 0);
  let s = (k('KeyD') || k('ArrowRight') ? 1 : 0) - (k('KeyA') || k('ArrowLeft') ? 1 : 0);
  const crouch = k('KeyC') || k('ControlLeft');
  const speed = crouch ? 1.2 : (k('ShiftLeft') || k('ShiftRight') ? 4.6 : 2.5);
  const len = Math.hypot(f, s) || 1; f /= len; s /= len;
  const sin = Math.sin(P.yaw), cos = Math.cos(P.yaw);
  const tx = (-sin * f + cos * s) * speed, tz = (-cos * f - sin * s) * speed;
  const a = 1 - Math.exp(-dt * ((f || s) ? 12 : 9));
  P.vx += (tx - P.vx) * a; P.vz += (tz - P.vz) * a;
  const h = crouch ? 1.2 : HEIGHT;
  const nx = P.x + P.vx * dt; if (!blocked(nx, P.z, P.y, h)) P.x = nx; else P.vx = 0;
  const nz = P.z + P.vz * dt; if (!blocked(P.x, nz, P.y, h)) P.z = nz; else P.vz = 0;
  const g = groundAt(P.x, P.z, P.y);
  if (g > -Infinity && (P.y - g) < (P.grounded ? STEP : 0.02)) { P.y = g; P.vy = 0; P.grounded = true; }
  else { P.vy -= 9.8 * dt; P.y += P.vy * dt; P.grounded = false; if (g > -Infinity && P.y < g) { P.y = g; P.vy = 0; P.grounded = true; } }
  if (P.y < -5) reset();
  P.eye += ((crouch ? CROUCH_EYE : EYE) - P.eye) * (1 - Math.exp(-dt * 10));
  const target = P.y + P.eye;
  P.camY += (target - P.camY) * (1 - Math.exp(-dt * 16));
  if (Math.abs(target - P.camY) > 0.6) P.camY = target;
}

// ------------------------------------------------------------------ stats (frame-time measurement)
const ft = new Float32Array(240); let fi = 0, fc = 0, lastStat = 0;
const statsEl = $('stats');
function stats(now, dtms) {
  ft[fi] = dtms; fi = (fi + 1) % ft.length; fc = Math.min(fc + 1, ft.length);
  if (now - lastStat < 250) return;
  lastStat = now;
  const arr = Array.from(ft.subarray(0, fc)).sort((a, b) => a - b);
  const avg = arr.reduce((a, b) => a + b, 0) / arr.length, p99 = arr[Math.floor(arr.length * 0.99) - 1] || arr[arr.length - 1];
  const info = renderer.info.render;
  window.__bayStats = { avg, p99, max: arr[arr.length - 1], fps: 1000 / avg, calls: info.calls, tris: info.triangles };
  statsEl.textContent = `${(1000 / avg).toFixed(0)} fps · avg ${avg.toFixed(2)} ms · p99 ${p99.toFixed(2)} ms · max ${arr[arr.length - 1].toFixed(1)} ms\n${info.calls} draws · ${(info.triangles / 1000).toFixed(0)}k tris · pos ${P.x.toFixed(1)}, ${P.y.toFixed(2)}, ${P.z.toFixed(1)}`;
}

// ------------------------------------------------------------------ loop
let last = performance.now(), t = 0, frames = 0;
function frame(now) {
  const dtms = now - last; last = now;
  const dt = Math.min(0.05, dtms / 1000);
  t += dt;
  const n = dt > 1 / 90 ? 2 : 1;
  for (let i = 0; i < n; i++) stepPlayer(dt / n);
  camera.position.set(P.x, P.camY, P.z);
  camera.rotation.set(P.pitch, P.yaw, 0);
  bay.update(t, dt);
  if (frames++ < 3) renderer.shadowMap.needsUpdate = true;
  renderer.render(scene, camera);
  stats(now, dtms);
  maybeRecalibrate(now);
  requestAnimationFrame(frame);
}
// compile shaders before revealing to avoid first-look hitches
renderer.compile(scene, camera);
// one-time render-scale calibration (no resizes once exploring): pick the highest scale that renders in budget
const scaleParam = new URLSearchParams(location.search).get('scale');
function calibrate() {
  const gl = renderer.getContext(), px = new Uint8Array(4);
  const time = (pr) => {
    renderer.setPixelRatio(Math.min(devicePixelRatio, pr)); renderer.setSize(innerWidth, innerHeight);
    camera.position.set(START.x, EYE, START.z); camera.rotation.set(START.pitch, START.yaw, 0); camera.updateMatrixWorld();
    renderer.shadowMap.needsUpdate = true;
    for (let i = 0; i < 16; i++) { camera.rotation.y = START.yaw - i * 0.03; renderer.render(scene, camera); }
    gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, px);
    const t0 = performance.now();
    for (let i = 0; i < 16; i++) { camera.rotation.y = START.yaw + i * 0.03; renderer.render(scene, camera); }
    gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, px);
    return (performance.now() - t0) / 16;
  };
  if (scaleParam) { pixelCap = +scaleParam; } else {
    pixelCap = 1.0;
    for (const pr of [1.5, 1.25]) { if (devicePixelRatio < pr - 0.01 && pr !== 1.25) continue; const ms = time(pr); window.__calib = (window.__calib || []).concat([[pr, +ms.toFixed(2)]]); if (ms < 7.5) { pixelCap = pr; break; } }
  }
  renderer.setPixelRatio(Math.min(devicePixelRatio, pixelCap)); renderer.setSize(innerWidth, innerHeight);
  renderer.shadowMap.needsUpdate = true;
}
calibrate();
// second, warm-GPU probe ~2 s after load, only while the start overlay is still up (never during exploration)
let recalibrated = !!scaleParam;
function maybeRecalibrate(now) {
  if (recalibrated || locked || now - window.__readyAt < 2000) return;
  recalibrated = true; window.__calib = [];
  calibrate();
}
window.__readyAt = performance.now();
$('loading').classList.add('hidden');
$('start').disabled = false;
requestAnimationFrame((n) => { last = n; frame(n); });
window.__bay = { P, reset, renderer, camera, scene, keys, stepPlayer, get pixelCap() { return pixelCap; } };

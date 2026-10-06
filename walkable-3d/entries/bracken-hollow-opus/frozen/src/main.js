import * as THREE from 'three';
import { buildWorld, groundH, colliders, isInside, isCanopy, U, BLD } from './world.js';

const canvas = document.getElementById('c');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
const baseDPR = Math.min(window.devicePixelRatio || 1, 1.25);
let quality = 1.0;
renderer.setPixelRatio(baseDPR * quality);
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.shadowMap.autoUpdate = false;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, innerWidth / innerHeight, 0.05, 700);
scene.add(camera);

const bar = document.getElementById('bar'), msg = document.getElementById('loadmsg');
const progress = (p, m) => { bar.style.width = (p * 100).toFixed(0) + '%'; msg.textContent = m; };

const START = { x: -3.75, z: 25.5, yaw: 0, pitch: -0.04 };
const VIEWS = [
  START,
  { x: -3.4, z: 11.6, yaw: 0.25, pitch: -0.05 },
  { x: -7.5, z: 5.3, yaw: Math.PI * 0.62, pitch: 0.02 },
  { x: 23.8, z: 3.2, yaw: 0, pitch: -0.1 },
  { x: -4.2, z: -25.4, yaw: Math.PI, pitch: -0.08 },
];
const P = { x: START.x, z: START.z, feet: 0, vy: 0, yaw: START.yaw, pitch: START.pitch, vx: 0, vz: 0, eye: 0, bob: 0 };
const EYE = 1.62, RAD = 0.28, STEP = 0.42;

function teleport(v) { P.x = v.x; P.z = v.z; P.yaw = v.yaw; P.pitch = v.pitch; P.vx = P.vz = P.vy = 0; P.feet = groundH(P.x, P.z); P.eye = P.feet + EYE; }

const keys = {};
addEventListener('keydown', (e) => {
  keys[e.code] = true;
  if (e.code === 'KeyR') teleport(START);
  if (e.code === 'KeyH') document.getElementById('help').classList.toggle('hidden');
  if (e.code === 'KeyP') document.getElementById('perf').classList.toggle('hidden');
  if (e.code === 'BracketLeft') setQuality(quality - 0.1);
  if (e.code === 'BracketRight') setQuality(quality + 0.1);
  if (/^Digit[1-5]$/.test(e.code)) teleport(VIEWS[+e.code.slice(5) - 1]);
  if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) e.preventDefault();
});
addEventListener('keyup', (e) => { keys[e.code] = false; });
addEventListener('blur', () => { for (const k in keys) keys[k] = false; });

// mouse look: pointer lock, with drag-to-look fallback
const overlay = document.getElementById('overlay');
let locked = false, dragging = false;
overlay.addEventListener('click', () => { canvas.requestPointerLock?.(); overlay.classList.add('hidden'); });
document.addEventListener('pointerlockchange', () => { locked = document.pointerLockElement === canvas; if (!locked) overlay.classList.remove('hidden'); });
canvas.addEventListener('mousedown', () => { if (!locked) dragging = true; });
addEventListener('mouseup', () => { dragging = false; });
addEventListener('mousemove', (e) => {
  if (!locked && !dragging) return;
  const s = 0.0022;
  P.yaw -= e.movementX * s; P.pitch -= e.movementY * s;
  P.pitch = Math.max(-1.45, Math.min(1.45, P.pitch));
});

function setQuality(q) { quality = Math.max(0.5, Math.min(1.0, Math.round(q * 10) / 10)); renderer.setPixelRatio(baseDPR * quality); renderer.setSize(innerWidth, innerHeight); }
addEventListener('resize', () => { camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); renderer.setSize(innerWidth, innerHeight); });

// collision
function resolve(x, z, feet) {
  for (let it = 0; it < 2; it++) {
    for (const c of colliders) {
      if (c.y1 < feet + STEP || c.y0 > feet + 1.75) continue;
      if (c.t === 1) {
        const dx = x - c.x, dz = z - c.z, d2 = dx * dx + dz * dz, rr = c.r + RAD;
        if (d2 < rr * rr) { const d = Math.sqrt(d2) || 1e-4; x = c.x + dx / d * rr; z = c.z + dz / d * rr; }
      } else {
        const dx = x - c.cx, dz = z - c.cz;
        const lx = dx * c.c - dz * c.s, lz = dx * c.s + dz * c.c;
        if (Math.abs(lx) > c.hx + RAD || Math.abs(lz) > c.hz + RAD) continue;
        const qx = Math.max(-c.hx, Math.min(c.hx, lx)), qz = Math.max(-c.hz, Math.min(c.hz, lz));
        let ex = lx - qx, ez = lz - qz, d = Math.hypot(ex, ez), px = 0, pz = 0;
        if (d > 1e-5) { if (d >= RAD) continue; px = ex / d * (RAD - d); pz = ez / d * (RAD - d); }
        else { const ox = c.hx - Math.abs(lx) + RAD, oz = c.hz - Math.abs(lz) + RAD; if (ox < oz) px = Math.sign(lx || 1) * ox; else pz = Math.sign(lz || 1) * oz; }
        x += px * c.c + pz * c.s; z += -px * c.s + pz * c.c;
      }
    }
  }
  x = Math.max(-44, Math.min(44, x)); z = Math.max(-40, Math.min(36, z));
  return [x, z];
}
function tryMove(nx, nz) {
  const [rx, rz] = resolve(nx, nz, P.feet);
  const g = groundH(rx, rz);
  if (g > P.feet + STEP) return false;
  P.x = rx; P.z = rz; return true;
}
function update(dt) {
  const f = (keys.KeyW || keys.ArrowUp ? 1 : 0) - (keys.KeyS || keys.ArrowDown ? 1 : 0);
  const s = (keys.KeyD || keys.ArrowRight ? 1 : 0) - (keys.KeyA || keys.ArrowLeft ? 1 : 0);
  const run = keys.ShiftLeft || keys.ShiftRight;
  const speed = run ? 4.2 : 2.0;
  let ix = 0, iz = 0;
  if (f || s) { const l = Math.hypot(f, s); const fx = -Math.sin(P.yaw), fz = -Math.cos(P.yaw); ix = (fx * f + Math.cos(P.yaw) * s) / l * speed; iz = (fz * f - Math.sin(P.yaw) * s) / l * speed; }
  const k = 1 - Math.exp(-dt * 9);
  P.vx += (ix - P.vx) * k; P.vz += (iz - P.vz) * k;
  const dist = Math.hypot(P.vx, P.vz) * dt, steps = Math.max(1, Math.ceil(dist / 0.12));
  for (let i = 0; i < steps; i++) {
    const dx = P.vx * dt / steps, dz = P.vz * dt / steps;
    if (!tryMove(P.x + dx, P.z + dz)) { if (!tryMove(P.x + dx, P.z)) tryMove(P.x, P.z + dz); }
  }
  const g = groundH(P.x, P.z);
  if (P.feet - g > 0.3 || P.vy > 0) { P.vy -= 9.8 * dt; P.feet += P.vy * dt; if (P.feet <= g) { P.feet = g; P.vy = 0; } }
  else { P.feet = g; P.vy = 0; }
  const moving = Math.hypot(P.vx, P.vz);
  P.bob += moving * dt * (run ? 2.3 : 2.6);
  const bob = Math.sin(P.bob * Math.PI) * 0.022 * Math.min(1, moving / 2);
  const target = P.feet + EYE + bob;
  P.eye += (target - P.eye) * (1 - Math.exp(-dt * (P.eye < target ? 14 : 22)));
  if (Math.abs(P.eye - target) > 1.0) P.eye = target;
  camera.position.set(P.x, P.eye, P.z);
  camera.rotation.set(P.pitch, P.yaw, 0, 'YXZ');
  // eye adaptation between interior and exterior
  const targetExp = isInside(P.x, P.z) ? 1.8 : isCanopy(P.x, P.z) ? 1.25 : 1.08;
  renderer.toneMappingExposure += (targetExp - renderer.toneMappingExposure) * (1 - Math.exp(-dt * 1.6));
}

// falling leaves
let leafFall = null;
function makeLeafFall(tex) {
  const g = new THREE.PlaneGeometry(0.11, 0.11);
  const uv = g.attributes.uv; for (let i = 0; i < uv.count; i++) uv.setXY(i, 0.25 + uv.getX(i) * 0.25, 0.5 + uv.getY(i) * 0.25);
  const m = new THREE.MeshLambertMaterial({ map: tex, alphaTest: 0.5, side: THREE.DoubleSide });
  const n = 140, mesh = new THREE.InstancedMesh(g, m, n);
  mesh.frustumCulled = false;
  const data = [];
  const col = new THREE.Color();
  for (let i = 0; i < n; i++) { data.push({ x: Math.random() * 30 - 15, y: Math.random() * 12, z: Math.random() * 30 - 15, sp: 0.5 + Math.random() * 0.6, ph: Math.random() * 6, rs: 1 + Math.random() * 2 }); col.setHSL(0.03 + Math.random() * 0.09, 0.7, 0.35 + Math.random() * 0.2); mesh.setColorAt(i, col); }
  scene.add(mesh);
  const o = new THREE.Object3D();
  return { update(dt, t) {
    for (let i = 0; i < n; i++) {
      const d = data[i];
      d.y -= d.sp * dt; d.x += Math.sin(t * 0.7 + d.ph) * 0.4 * dt + 0.25 * dt; d.z += Math.cos(t * 0.5 + d.ph) * 0.3 * dt;
      let wx = camera.position.x + ((d.x - camera.position.x + 15) % 30 + 30) % 30 - 15;
      let wz = camera.position.z + ((d.z - camera.position.z + 15) % 30 + 30) % 30 - 15;
      const gy = groundH(wx, wz);
      if (d.y < gy - 0.05 || d.y < camera.position.y - 6) { d.y = camera.position.y + 4 + Math.random() * 6; d.x = wx; d.z = wz; }
      if (isInside(wx, wz)) { o.position.set(0, -100, 0); } else o.position.set(wx, d.y, wz);
      o.rotation.set(t * d.rs + d.ph, t * d.rs * 0.7, Math.sin(t + d.ph));
      o.updateMatrix(); mesh.setMatrixAt(i, o.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  } };
}

// perf overlay
const perfEl = document.getElementById('perf'), graph = document.getElementById('graph'), gctx = graph.getContext('2d');
const ft = new Float32Array(240); let fi = 0, acc = 0, frames = 0, slow = 0;
function perf(dtms, now) {
  ft[fi = (fi + 1) % ft.length] = dtms; acc += dtms; frames++;
  if (dtms > 22 && dtms < 120 && document.visibilityState === "visible") slow++;
  if (acc > 1000) {
    let mx = 0; for (let i = 0; i < 60; i++) mx = Math.max(mx, ft[(fi - i + ft.length) % ft.length]);
    const info = renderer.info.render;
    document.getElementById('perftext').textContent = `${(frames * 1000 / acc).toFixed(0)} fps  avg ${(acc / frames).toFixed(1)} ms  max ${mx.toFixed(1)} ms\ncalls ${info.calls}  tris ${(info.triangles / 1000).toFixed(0)}k  res ${(baseDPR * quality).toFixed(2)}x`;
    // auto quality: step down only if consistently slow
    if (autoQ && slow > frames * 0.2 && quality > 0.6) setQuality(quality - 0.1);
    acc = 0; frames = 0; slow = 0;
  }
  if (!perfEl.classList.contains('hidden')) {
    gctx.clearRect(0, 0, 240, 60); gctx.strokeStyle = '#555'; gctx.beginPath(); gctx.moveTo(0, 60 - 16.7 * 1.5); gctx.lineTo(240, 60 - 16.7 * 1.5); gctx.stroke();
    gctx.fillStyle = '#9fd28a';
    for (let i = 0; i < 240; i++) { const v = ft[(fi + 1 + i) % 240]; gctx.fillStyle = v > 25 ? '#e0705a' : '#9fd28a'; gctx.fillRect(i, 60 - Math.min(60, v * 1.5), 1, Math.min(60, v * 1.5)); }
  }
}
let autoQ = true;

// boot
const clock = new THREE.Clock();
(async () => {
  const world = await buildWorld(scene, renderer, progress);
  leafFall = makeLeafFall(world.textures.groundLeaf);
  teleport(START);
  update(0.016);
  renderer.shadowMap.needsUpdate = true;
  // warm-up: compile shaders and upload textures from several directions
  renderer.compile(scene, camera);
  for (const v of VIEWS) { teleport(v); update(0.016); for (let a = 0; a < 4; a++) { camera.rotation.y = v.yaw + a * Math.PI / 2; renderer.render(scene, camera); } await new Promise((r) => setTimeout(r, 0)); }
  teleport(START); update(0.016);
  renderer.toneMappingExposure = 1.0;
  progress(1, 'Ready');
  document.getElementById('loading').classList.add('hidden');
  overlay.classList.remove('hidden');
  clock.start();
  let last = performance.now();
  renderer.setAnimationLoop(() => {
    const now = performance.now(), dtms = now - last; last = now;
    const dt = Math.min(0.05, dtms / 1000);
    U.time.value += dt;
    update(dt);
    leafFall.update(dt, U.time.value);
    renderer.render(scene, camera);
    perf(dtms, now);
  });
  window.__station = { size: (w, h) => renderer.setSize(w, h, false), bench(n = 30) { const gl = renderer.getContext(), px = new Uint8Array(4); renderer.render(scene, camera); gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, px); const t0 = performance.now(); for (let i = 0; i < n; i++) { update(0.016); renderer.render(scene, camera); gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, px); } return (performance.now() - t0) / n; }, teleport: (i) => teleport(VIEWS[i]), view: (x, z, yaw, pitch) => teleport({ x, z, yaw, pitch }), info: () => renderer.info.render, P, setAuto: (v) => { autoQ = v; } };
})().catch((e) => { msg.textContent = 'Error: ' + e.message; console.error(e); });

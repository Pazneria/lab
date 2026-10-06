import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { mergeGeometries, mergeVertices } from 'three/addons/utils/BufferGeometryUtils.js';
import * as TX from './textures.js';

// ---------------------------------------------------------------- layout constants (metres)
const HALL_FLOOR = -0.9;
const G_CEIL = 4.2, G_ROOF = 5.1, G_UP = 6.1;
const H_CEIL = 8.6, H_ROOF = 9.6, H_UP = 10.8;
const T = 0.8;
const GX0 = -9, GX1 = 11, GZ0 = 0, GZ1 = 14;
const HZ0 = 15, HZ1 = 35;
const RAMP_X0 = 5.4, RAMP_Z0 = 16, RAMP_Z1 = 28, PAR_X0 = 5.0;
const EYE = 1.62, PR = 0.34;

function floorAt(x, z) {
  if (z < HZ0) return 0;
  if (x > PAR_X0 + 0.2) {
    if (z <= RAMP_Z0) return 0;
    if (z >= RAMP_Z1) return HALL_FLOOR;
    return HALL_FLOOR * (z - RAMP_Z0) / (RAMP_Z1 - RAMP_Z0);
  }
  return HALL_FLOOR;
}
const rampTop = (z) => (z <= RAMP_Z0 ? 0 : z >= RAMP_Z1 ? HALL_FLOOR : HALL_FLOOR * (z - RAMP_Z0) / (RAMP_Z1 - RAMP_Z0));

// sun direction (towards the sun): from the south-west, ~57 degrees elevation
const L = new THREE.Vector3(-0.3, 0.84, -0.46).normalize();

// ---------------------------------------------------------------- renderer
// The physical transmission pass (resin sculpture) renders the whole opaque scene again at full
// resolution with 4x MSAA every frame. Render it at half resolution without MSAA instead: the
// refraction lookup uses NDC coordinates, so only its sharpness changes, not its alignment.
const TRANSMISSION_SCALE = 0.5;
{
  const setSize0 = THREE.RenderTarget.prototype.setSize;
  THREE.RenderTarget.prototype.setSize = function (w, h, d) {
    if (this._isTx === undefined) this._isTx = this.samples === 4 && this.resolveDepthBuffer === false && this.texture.generateMipmaps === true;
    if (this._isTx) { this.samples = 0; w = Math.max(1, Math.round(w * TRANSMISSION_SCALE)); h = Math.max(1, Math.round(h * TRANSMISSION_SCALE)); }
    return setSize0.call(this, w, h, d);
  };
}
const statusEl = document.getElementById('status');
const goEl = document.getElementById('go');
const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
const DPR_HIGH = Math.min(window.devicePixelRatio || 1, 1.25);
let dprMode = 0;
renderer.setPixelRatio(DPR_HIGH);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.shadowMap.autoUpdate = false;
document.body.appendChild(renderer.domElement);
TX.setAniso(Math.min(8, renderer.capabilities.getMaxAnisotropy()));

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x9fb6cf);
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.05, 260);

const tick = () => new Promise((r) => setTimeout(r, 16));
const say = async (s) => { statusEl.textContent = s; await tick(); };

// ---------------------------------------------------------------- materials
const UVS = { wall: [7.2, 3.6], board: [2.4, 2.4], floor: [6, 6], precast: [6, 6] };
const MATS = {};
let detailTex;

function concreteMaterial(maps, opts) {
  const m = new THREE.MeshStandardMaterial({
    map: maps.map, normalMap: maps.normalMap, roughnessMap: maps.roughnessMap,
    roughness: opts.roughness ?? 1, metalness: 0, color: opts.color ?? 0xffffff,
    normalScale: new THREE.Vector2(opts.ns ?? 1, opts.ns ?? 1),
    envMapIntensity: opts.env ?? 1,
  });
  m.shadowSide = THREE.FrontSide; // avoids light leaks at wall/soffit junctions
  const wear = opts.wear ?? 1, ao = opts.ao ?? 1;
  m.onBeforeCompile = (sh) => {
    sh.uniforms.uDetail = { value: detailTex };
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vWPos; varying vec3 vWN;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvWPos = (modelMatrix * vec4(transformed,1.0)).xyz; vWN = normalize(mat3(modelMatrix) * objectNormal);');
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', `#include <common>
varying vec3 vWPos; varying vec3 vWN; uniform sampler2D uDetail;
float floorAtW(vec2 p){ if(p.y < 14.5) return 0.0; if(p.x > 5.2){ return ${HALL_FLOOR.toFixed(2)} * clamp((p.y-16.0)/12.0,0.0,1.0);} return ${HALL_FLOOR.toFixed(2)}; }
float ceilAtW(vec2 p){ return p.y < 14.5 ? ${G_CEIL.toFixed(2)} : ${H_CEIL.toFixed(2)}; }
float gEdge; float gDet;`)
      .replace('#include <map_fragment>', `#include <map_fragment>
{
  vec3 an = abs(vWN);
  vec2 pp = an.y > 0.6 ? vWPos.xz : (an.x > an.z ? vWPos.zy : vWPos.xy);
  float macro = texture2D(uDetail, pp * 0.037 + vec2(0.13, 0.71)).r;
  float macro2 = texture2D(uDetail, pp * 0.011 + vec2(0.5, 0.2)).r;
  gDet = texture2D(uDetail, pp * 0.9).g;
  float spk = texture2D(uDetail, pp * 3.1).b;
  diffuseColor.rgb *= mix(0.84, 1.13, macro) * mix(0.9, 1.08, macro2) * mix(0.94, 1.05, gDet);
  gEdge = clamp((1.0 - max(max(an.x, an.y), an.z)) * 3.6, 0.0, 1.0) * ${wear.toFixed(2)};
  float chip = smoothstep(0.35, 0.75, gDet + spk * 0.25);
  diffuseColor.rgb = mix(diffuseColor.rgb, diffuseColor.rgb * 1.22 + 0.025, gEdge * chip);
  diffuseColor.rgb *= 1.0 - gEdge * (1.0 - chip) * 0.25;
  float vert = 1.0 - smoothstep(0.5, 0.9, an.y);
  float fy = vWPos.y - floorAtW(vWPos.xz);
  float cy = ceilAtW(vWPos.xz) - vWPos.y;
  float occ = 1.0 - vert * (0.42 * exp(-max(fy, 0.0) * 2.6) + 0.22 * exp(-max(cy, 0.0) * 1.6));
  vec2 rz = vWPos.z < 14.5 ? vec2(0.0, 14.0) : vec2(15.0, 35.0);
  float dzw = min(abs(vWPos.z - rz.x), abs(vWPos.z - rz.y));
  float dxw = min(abs(vWPos.x + 9.0), abs(vWPos.x - 11.0));
  float inside = step(-9.05, vWPos.x) * step(vWPos.x, 11.05) * step(-0.05, vWPos.z) * step(vWPos.z, 35.05);
  float dc = an.x > an.z ? dzw : dxw;
  occ *= 1.0 - inside * (vert * 0.32 * exp(-dc * 2.2) + (1.0 - vert) * 0.3 * exp(-min(dzw, dxw) * 2.4));
  diffuseColor.rgb *= mix(1.0, occ, ${ao.toFixed(2)});
}`)
      .replace('#include <roughnessmap_fragment>', `#include <roughnessmap_fragment>
roughnessFactor = clamp(roughnessFactor + (gDet - 0.5) * 0.16 + gEdge * 0.12, 0.04, 1.0);`);
  };
  return m;
}

// ---------------------------------------------------------------- geometry builder
function worldUV(g, scale, off) {
  const p = g.attributes.position, n = g.attributes.normal;
  const uv = new Float32Array(p.count * 2);
  const [su, sv] = scale; const ou = off ? off[0] : 0, ov = off ? off[1] : 0;
  for (let i = 0; i < p.count; i++) {
    const ax = Math.abs(n.getX(i)), ay = Math.abs(n.getY(i)), az = Math.abs(n.getZ(i));
    const x = p.getX(i), y = p.getY(i), z = p.getZ(i);
    let u, v;
    if (ay >= ax && ay >= az) { u = x / su; v = z / sv; }
    else if (ax >= az) { u = z / su; v = y / sv; }
    else { u = x / su; v = y / sv; }
    uv[i * 2] = u + ou; uv[i * 2 + 1] = v + ov;
  }
  g.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
  return g;
}

function clean(g) {
  for (const k of Object.keys(g.attributes)) if (!['position', 'normal', 'uv'].includes(k)) g.deleteAttribute(k);
  g.clearGroups();
  return g;
}

const groups = {};
const colliders = [];   // AABBs {x0,x1,z0,z1,y0,y1}
const circles = [];     // {x,z,r,y0,y1}
function push(g, mat, off) {
  if (g.index) g = g.toNonIndexed();
  clean(g);
  if (UVS[mat]) worldUV(g, UVS[mat], off);
  (groups[mat] ||= []).push(g);
}
function box(x0, y0, z0, x1, y1, z1, mat, o = {}) {
  const w = x1 - x0, h = y1 - y0, d = z1 - z0;
  if (w <= 0.001 || h <= 0.001 || d <= 0.001) return;
  const r = o.r ?? 0.03;
  let g;
  if (r > 0) g = new RoundedBoxGeometry(w, h, d, 2, Math.min(r, w / 2 - 0.002, h / 2 - 0.002, d / 2 - 0.002));
  else g = new THREE.BoxGeometry(w, h, d);
  g.translate((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2);
  push(g, mat, o.uvOff);
  if (o.collide !== false) colliders.push({ x0, x1, z0, z1, y0, y1 });
}
// box whose top surface follows topFn(z) (linear segments only)
function slopedBox(x0, x1, z0, z1, yb, topFn, mat) {
  const g = new THREE.BoxGeometry(x1 - x0, 1, z1 - z0, 1, 1, 1).toNonIndexed();
  g.translate((x0 + x1) / 2, 0.5, (z0 + z1) / 2);
  const p = g.attributes.position;
  for (let i = 0; i < p.count; i++) p.setY(i, p.getY(i) > 0.5 ? topFn(p.getZ(i)) : (typeof yb === 'function' ? yb(p.getZ(i)) : yb));
  g.computeVertexNormals();
  push(g, mat);
}

function rectMinusHoles(u0, u1, v0, v1, holes) {
  const us = new Set([u0, u1]), vs = new Set([v0, v1]);
  for (const h of holes) {
    us.add(Math.min(u1, Math.max(u0, h[0]))); us.add(Math.min(u1, Math.max(u0, h[1])));
    vs.add(Math.min(v1, Math.max(v0, h[2]))); vs.add(Math.min(v1, Math.max(v0, h[3])));
  }
  const U = [...us].sort((a, b) => a - b), V = [...vs].sort((a, b) => a - b);
  let rows = [];
  for (let j = 0; j < V.length - 1; j++) {
    const vc = (V[j] + V[j + 1]) / 2; let run = null; const row = [];
    for (let i = 0; i < U.length - 1; i++) {
      const uc = (U[i] + U[i + 1]) / 2;
      const solid = !holes.some((h) => uc > h[0] && uc < h[1] && vc > h[2] && vc < h[3]);
      if (solid) { if (run && run[1] === U[i]) run[1] = U[i + 1]; else { run = [U[i], U[i + 1], V[j], V[j + 1]]; row.push(run); } }
      else run = null;
    }
    rows.push(row);
  }
  // merge vertically
  const out = [];
  let open = [];
  for (const row of rows) {
    const next = [];
    for (const r of row) {
      const m = open.find((o) => o[0] === r[0] && o[1] === r[1] && o[3] === r[2]);
      if (m) { m[3] = r[3]; next.push(m); open = open.filter((o) => o !== m); }
      else next.push(r);
    }
    out.push(...open); open = next;
  }
  out.push(...open);
  return out;
}
// wall running along X (thickness in Z); openings [x0,x1,y0,y1]
function wallX(x0, x1, z0, z1, y0, y1, openings = [], mat = 'wall') {
  for (const r of rectMinusHoles(x0, x1, y0, y1, openings)) box(r[0], r[2], z0, r[1], r[3], z1, mat);
}
function wallZ(z0, z1, x0, x1, y0, y1, openings = [], mat = 'wall') {
  for (const r of rectMinusHoles(z0, z1, y0, y1, openings)) box(x0, r[2], r[0], x1, r[3], r[1], mat);
}
function slab(x0, x1, z0, z1, y0, y1, holes, mat = 'board') {
  for (const r of rectMinusHoles(x0, x1, z0, z1, holes)) box(r[0], y0, r[2], r[1], y1, r[3], mat, { collide: false });
}
function upstand(h, y0, y1, t = 0.35) {
  box(h[0] - t, y0, h[2] - t, h[1] + t, y1, h[2], 'board', { collide: false });
  box(h[0] - t, y0, h[3], h[1] + t, y1, h[3] + t, 'board', { collide: false });
  box(h[0] - t, y0, h[2], h[0], y1, h[3], 'board', { collide: false });
  box(h[1], y0, h[2], h[1] + t, y1, h[3], 'board', { collide: false });
}
// skylight hole aimed so the sun beam reaches `target` through a shaft from yb to yt
function aimHole(tx, ty, tz, yb, yt, size) {
  const tb = (yb - ty) / L.y, tt = (yt - ty) / L.y;
  const cx = tx + L.x * (tb + tt) / 2, cz = tz + L.z * (tb + tt) / 2;
  const sx = size + Math.abs(L.x * (tt - tb)) * 0.6, sz = size + Math.abs(L.z * (tt - tb)) * 0.6;
  return [cx - sx / 2, cx + sx / 2, cz - sz / 2, cz + sz / 2];
}
const overlaps = (a, x0, x1, z0, z1) => a[0] < x1 && a[1] > x0 && a[2] < z1 && a[3] > z0;

// ---------------------------------------------------------------- architecture
const EXH = {
  steel: { x: -3.6, z: 8.6, y: 0 },
  stone: { x: 4.2, z: 5.8, y: 0 },
  resin: { x: -1.6, z: 25.2, y: HALL_FLOOR },
};
const skylights = []; // {hole, yb, room}

function buildArchitecture() {
  // --- floors
  box(GX0, -0.5, GZ0, GX1, 0, GZ1, 'floor', { r: 0, collide: false });
  box(5.6, -0.5, GZ1, 10.8, 0, HZ0, 'floor', { r: 0, collide: false });
  box(GX0, HALL_FLOOR - 0.5, HZ0, GX1, HALL_FLOOR, HZ1, 'floor', { r: 0, collide: false });
  box(RAMP_X0, HALL_FLOOR - 0.4, HZ0, GX1, 0, RAMP_Z0, 'floor', { r: 0, collide: false });
  slopedBox(RAMP_X0, GX1, RAMP_Z0, RAMP_Z1, HALL_FLOOR - 0.4, rampTop, 'floor');
  // parapet / ramp cheek wall: guard height above the ramp
  slopedBox(PAR_X0, RAMP_X0, HZ0, RAMP_Z1, HALL_FLOOR - 0.3, (z) => rampTop(z) + 1.05, 'wall');
  colliders.push({ x0: PAR_X0, x1: RAMP_X0, z0: HZ0, z1: RAMP_Z1, y0: -1.3, y1: 1.05 });
  // parapet cap (precast, slightly proud)
  slopedBox(PAR_X0 - 0.03, RAMP_X0 + 0.03, HZ0, RAMP_Z1 + 0.03, (z) => rampTop(z) + 1.01, (z) => rampTop(z) + 1.1, 'precast');

  // --- gallery walls (to G_CEIL)
  wallX(GX0 - T, GX1 + T, GZ0 - T, GZ0, -0.3, G_CEIL, [[-7.2, -3.8, -0.3, 3.1]]);
  wallZ(GZ0, GZ1, GX0 - T, GX0, -0.3, G_CEIL, []);
  wallZ(GZ0, GZ1, GX1, GX1 + T, -0.3, G_CEIL, [[2.2, 9.8, 2.6, 3.0]]);
  // --- shared wall between gallery and hall: door to ramp (offset east), viewing slot (offset west), clerestory
  wallX(GX0 - T, GX1 + T, GZ1, HZ0, HALL_FLOOR - 0.3, H_CEIL, [
    [5.6, 10.8, 0, 3.4],
    [-7.2, -0.6, 1.0, 2.35],
    [-8.0, 3.6, 5.9, 7.9],
  ]);
  // --- hall walls (to H_CEIL)
  wallZ(HZ0, HZ1, GX0 - T, GX0, HALL_FLOOR - 0.3, H_CEIL, [[27.7, 28.25, HALL_FLOOR, 7.4]]);
  wallZ(HZ0, HZ1, GX1, GX1 + T, HALL_FLOOR - 0.3, H_CEIL, []);
  wallX(GX0 - T, GX1 + T, HZ1, HZ1 + T, HALL_FLOOR - 0.3, H_CEIL, [[0.4, 6.6, 0.25, 2.55]]);

  // --- gallery roof with deep skylights
  const gHoles = [
    aimHole(EXH.steel.x, 1.1, EXH.steel.z, G_CEIL, G_UP, 1.9),
    aimHole(EXH.stone.x, 1.0, EXH.stone.z, G_CEIL, G_UP, 1.9),
    aimHole(-0.4, 0.0, 12.2, G_CEIL, G_UP, 1.7),
  ];
  slab(GX0 - T, GX1 + T, GZ0 - T, GZ1, G_CEIL, G_ROOF, gHoles);
  for (const h of gHoles) { upstand(h, G_ROOF, G_UP); skylights.push({ hole: h, yb: G_CEIL, room: 'g' }); }
  for (const xc of [-7.4, -1.1, 0.9, 6.0]) {
    if (gHoles.some((h) => overlaps(h, xc - 0.5, xc + 0.5, GZ0, GZ1))) continue;
    box(xc - 0.24, G_CEIL - 0.62, GZ0, xc + 0.24, G_CEIL, GZ1, 'board', { collide: false });
  }

  // --- hall roof: big aimed light-well over the main sculpture, linear slot over the ramp, small well north
  const mainHole = aimHole(EXH.resin.x, 1.1, EXH.resin.z, H_CEIL, H_UP, 3.6);
  const rampSlot = [8.5, GX1, 16.2, 29.5];
  const northHole = aimHole(-2.0, HALL_FLOOR, 34.0, H_CEIL, H_UP, 1.6);
  const hHoles = [mainHole, rampSlot, northHole];
  slab(GX0 - T, GX1 + T, GZ1, HZ1 + T, H_CEIL, H_ROOF, hHoles);
  upstand(mainHole, H_ROOF, H_UP); upstand(northHole, H_ROOF, H_UP, 0.3);
  box(rampSlot[0] - 0.35, H_ROOF, rampSlot[2] - 0.35, rampSlot[0], H_UP - 0.4, rampSlot[3] + 0.35, 'board', { collide: false });
  box(rampSlot[0], H_ROOF, rampSlot[2] - 0.35, GX1 + T, H_UP - 0.4, rampSlot[2], 'board', { collide: false });
  box(rampSlot[0], H_ROOF, rampSlot[3], GX1 + T, H_UP - 0.4, rampSlot[3] + 0.35, 'board', { collide: false });
  box(GX1, H_ROOF, rampSlot[2], GX1 + T, H_UP - 0.4, rampSlot[3], 'board', { collide: false });
  skylights.push({ hole: mainHole, yb: H_CEIL, room: 'h' }, { hole: northHole, yb: H_CEIL, room: 'h' });
  for (const zc of [17.0, 24.9, 30.1, 33.6]) {
    if (overlaps(mainHole, GX0, GX1, zc - 0.45, zc + 0.45) || overlaps(northHole, GX0, GX1, zc - 0.45, zc + 0.45)) continue;
    box(GX0, H_CEIL - 1.35, zc - 0.3, GX1, H_CEIL, zc + 0.3, 'board', { collide: false });
  }

  // --- exterior: plaza and canopy at entrance
  const PY0 = -0.4, PY1 = -0.02;
  box(-70, PY0, -70, 70, PY1, GZ0 - T, 'floor', { r: 0, collide: false });
  box(-70, PY0, HZ1 + T, 70, PY1, 70, 'floor', { r: 0, collide: false });
  box(-70, PY0, GZ0 - T, GX0 - T, PY1, HZ1 + T, 'floor', { r: 0, collide: false });
  box(GX1 + T, PY0, GZ0 - T, 70, PY1, HZ1 + T, 'floor', { r: 0, collide: false });
  box(-8.4, 3.3, -4.2, -2.6, 3.85, GZ0 - T, 'board', { collide: false });
  box(-2.95, -0.02, -4.2, -2.6, 3.3, -3.85, 'wall', { collide: false });
  // freestanding screen walls across the entry court give the view out a measured edge
  box(-15, -0.05, -10.4, 1.5, 2.7, -9.8, 'wall', { collide: false });
  box(4.5, -0.05, -14.4, 18, 3.6, -13.8, 'wall', { collide: false });
  box(-24, -0.05, -6, -23.4, 2.7, 30, 'wall', { collide: false });
  // invisible boundary at the doors and the slit / window
  colliders.push({ x0: -7.3, x1: -3.7, z0: -0.6, z1: -0.2, y0: -1, y1: 4 });
}

// ---------------------------------------------------------------- sculptures
function foldedSteel() {
  // a zig-zag folded plate along a gentle arc, top edge rising to a crest, twisted slightly
  const N = 11, t = 0.022;
  const P = [];
  for (let i = 0; i < N; i++) {
    const s = i / (N - 1);
    const x = -1.25 + 2.5 * s;
    const z = (i % 2 ? 0.27 : -0.27) * (0.7 + 0.5 * Math.sin(s * Math.PI)) + 0.22 * (1 - (2 * s - 1) ** 2) - 0.1;
    const h = 0.75 + 1.65 * Math.pow(Math.sin(Math.PI * Math.pow(s, 0.8)), 1.3) + (i % 2 ? 0.12 : -0.05);
    P.push({ x, z, h });
  }
  const tw = (x, z, y) => { const a = y * 0.11; return [x * Math.cos(a) - z * Math.sin(a), z * Math.cos(a) + x * Math.sin(a)]; };
  const nrm = P.map((p, i) => {
    const a = P[Math.max(0, i - 1)], b = P[Math.min(N - 1, i + 1)];
    const dx = b.x - a.x, dz = b.z - a.z, l = Math.hypot(dx, dz);
    return [-dz / l, dx / l];
  });
  const pos = [], uv = [];
  let acc = [0];
  for (let i = 1; i < N; i++) acc.push(acc[i - 1] + Math.hypot(P[i].x - P[i - 1].x, P[i].z - P[i - 1].z));
  const V = (i, top, inner) => {
    const p = P[i], n = nrm[i];
    const off = inner ? t : 0;
    const y = top ? p.h : 0;
    const [x, z] = tw(p.x - n[0] * off, p.z - n[1] * off, y);
    return [x, y, z, acc[i] / 2.2 + (inner ? 0.01 : 0), y / 2.2];
  };
  const tri = (a, b, c) => { for (const v of [a, b, c]) { pos.push(v[0], v[1], v[2]); uv.push(v[3], v[4]); } };
  const quad = (a, b, c, d) => { tri(a, b, c); tri(a, c, d); };
  for (let i = 0; i < N - 1; i++) {
    const ob0 = V(i, 0, 0), ob1 = V(i + 1, 0, 0), ot0 = V(i, 1, 0), ot1 = V(i + 1, 1, 0);
    const ib0 = V(i, 0, 1), ib1 = V(i + 1, 0, 1), it0 = V(i, 1, 1), it1 = V(i + 1, 1, 1);
    quad(ob0, ob1, ot1, ot0);
    quad(ib1, ib0, it0, it1);
    quad(ot0, ot1, it1, it0);
    quad(ib0, ib1, ob1, ob0);
  }
  { const a = V(0, 0, 0), b = V(0, 1, 0), c = V(0, 1, 1), d = V(0, 0, 1); quad(a, b, c, d); }
  { const a = V(N - 1, 0, 0), b = V(N - 1, 1, 0), c = V(N - 1, 1, 1), d = V(N - 1, 0, 1); quad(d, c, b, a); }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.computeVertexNormals();
  // make sure outward faces point the right way: flip if normals mostly face -z on the first panel
  return g;
}

function stoneSculpture() {
  // pierced monolith with a soft carved profile, plus a reclining ovoid at its foot
  const s = new THREE.Shape();
  const W = 0.52, H = 0.95, n = 3.2;
  for (let i = 0; i <= 96; i++) {
    const a = i / 96 * Math.PI * 2;
    const c = Math.cos(a), sn = Math.sin(a);
    const x = W * Math.sign(c) * Math.pow(Math.abs(c), 2 / n) * (1 - 0.13 * (sn * 0.5 + 0.5));
    const y = H * Math.sign(sn) * Math.pow(Math.abs(sn), 2 / n);
    if (i === 0) s.moveTo(x, y); else s.lineTo(x, y);
  }
  const hole = new THREE.Path();
  for (let i = 0; i <= 64; i++) {
    const a = -i / 64 * Math.PI * 2;
    const x = 0.07 + Math.cos(a) * 0.2, y = 0.3 + Math.sin(a) * 0.27;
    if (i === 0) hole.moveTo(x, y); else hole.lineTo(x, y);
  }
  s.holes.push(hole);
  let g = new THREE.ExtrudeGeometry(s, { depth: 0.2, bevelEnabled: true, bevelThickness: 0.14, bevelSize: 0.11, bevelSegments: 7, curveSegments: 64, steps: 1 });
  g.translate(0, 0, -0.1);
  // gentle twist + lean + hand-carved irregularity
  const p = g.attributes.position;
  for (let i = 0; i < p.count; i++) {
    let x = p.getX(i), y = p.getY(i), z = p.getZ(i);
    const a = (y + 1) * 0.16;
    const nx = x * Math.cos(a) - z * Math.sin(a), nz = z * Math.cos(a) + x * Math.sin(a);
    const wob = Math.sin(x * 9 + y * 5) * 0.006 + Math.sin(y * 13 - z * 7) * 0.004;
    p.setXYZ(i, nx * (1 + wob), y + 0.98, nz * (1 + wob) + (y + 1) * 0.03);
  }
  clean(g); g.deleteAttribute('normal'); g.deleteAttribute('uv'); g = mergeVertices(g, 1e-4); g.computeVertexNormals();
  const peb = new THREE.SphereGeometry(1, 48, 28);
  const pp = peb.attributes.position;
  for (let i = 0; i < pp.count; i++) {
    let x = pp.getX(i), y = pp.getY(i), z = pp.getZ(i);
    y = y < 0 ? y * 0.55 : y; // flattened underside
    pp.setXYZ(i, x * 0.46 + 0.42, y * 0.24 + 0.2, z * 0.34 + 0.32);
  }
  peb.computeVertexNormals();
  peb.deleteAttribute('uv');
  const out = mergeGeometries([g, peb]);
  worldUV(out, [0.9, 0.9]);
  return out;
}

function resinSculpture() {
  // twisted stack of rounded-triangular slabs
  const parts = [];
  const N = 15, sh = 0.205;
  for (let i = 0; i < N; i++) {
    const f = i / (N - 1);
    const R = 0.5 + 0.34 * Math.sin(Math.PI * (0.18 + 0.75 * f)) - 0.12 * f;
    const s = new THREE.Shape();
    for (let k = 0; k <= 90; k++) {
      const a = k / 90 * Math.PI * 2;
      const r = R * (0.84 + 0.16 * Math.cos(3 * a)) ;
      const x = Math.cos(a) * r * 1.08, y = Math.sin(a) * r;
      if (k === 0) s.moveTo(x, y); else s.lineTo(x, y);
    }
    const g = new THREE.ExtrudeGeometry(s, { depth: sh - 0.07, bevelEnabled: true, bevelThickness: 0.035, bevelSize: 0.035, bevelSegments: 3, curveSegments: 90 });
    g.rotateX(-Math.PI / 2);
    g.rotateY(i * 0.15 + Math.sin(i * 0.7) * 0.05);
    g.translate(Math.sin(f * 3.1) * 0.08, 0.035 + i * sh, Math.cos(f * 2.3) * 0.05);
    clean(g); g.deleteAttribute('normal'); g.deleteAttribute('uv');
    parts.push(mergeVertices(g, 1e-4));
  }
  const out = mergeGeometries(parts);
  out.computeVertexNormals();
  return out;
}

// ---------------------------------------------------------------- props
function bench(x, z, y, alongZ, oak, steelMat, blobMat, root) {
  const L2 = 1.25, D = 0.24;
  const [hx, hz] = alongZ ? [D, L2] : [L2, D];
  for (const s of [-0.85, 0.85]) {
    const bx = alongZ ? x : x + s, bz = alongZ ? z + s : z;
    box(bx - (alongZ ? 0.19 : 0.13), y - 0.02, bz - (alongZ ? 0.13 : 0.19), bx + (alongZ ? 0.19 : 0.13), y + 0.39, bz + (alongZ ? 0.13 : 0.19), 'precast', { r: 0.02, collide: false, uvOff: [0.25 - bx / 6, 0.25 - y / 6] });
  }
  const top = new RoundedBoxGeometry(hx * 2, 0.065, hz * 2, 2, 0.012);
  const m = new THREE.Mesh(top, oak);
  m.position.set(x, y + 0.425, z);
  if (alongZ) {
    const uv = top.attributes.uv; // rotate grain along z
    for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getY(i) * 1.0, uv.getX(i) * 0.25);
  }
  m.castShadow = m.receiveShadow = true; root.add(m);
  colliders.push({ x0: x - hx, x1: x + hx, z0: z - hz, z1: z + hz, y0: y, y1: y + 0.46 });
  blob(x, y, z, hx * 2 + 0.7, hz * 2 + 0.7, blobMat, root);
}

function blob(x, y, z, sx, sz, mat, root) {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(sx, sz), mat);
  m.rotation.x = -Math.PI / 2; m.position.set(x, y + 0.004, z); m.renderOrder = 1;
  root.add(m);
}

function labelStand(x, z, y, yaw, tex, steelMat, root) {
  const grp = new THREE.Group();
  const post = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.92, 0.05), steelMat);
  post.position.y = 0.46; grp.add(post);
  const foot = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.012, 0.26), steelMat); foot.position.y = 0.006; grp.add(foot);
  const head = new THREE.Group(); head.position.set(0, 0.95, 0); head.rotation.x = -0.62; grp.add(head);
  const plate = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.24, 0.012), steelMat); head.add(plate);
  const face = new THREE.Mesh(new THREE.PlaneGeometry(0.34, 0.212), new THREE.MeshStandardMaterial({ map: tex, roughness: 0.75 }));
  face.position.z = 0.0065; head.add(face);
  grp.position.set(x, y, z); grp.rotation.y = yaw;
  grp.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
  root.add(grp);
  circles.push({ x, z, r: 0.16, y0: y, y1: y + 1.1 });
}

function wallPlaque(x, y, z, yaw, w, h, tex, root) {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshStandardMaterial({ map: tex, roughness: 0.8 }));
  m.position.set(x, y, z); m.rotation.y = yaw; m.receiveShadow = true;
  root.add(m);
}

// ---------------------------------------------------------------- build everything
async function build() {
  await say('Casting concrete (formwork panels)…');
  const wallMaps = TX.genWallConcrete();
  await say('Casting concrete (board-formed soffits)…');
  const boardMaps = TX.genBoardConcrete();
  await say('Grinding the floors…');
  const floorMaps = TX.genFloorConcrete();
  await say('Weathering steel, dressing stone…');
  detailTex = TX.genDetailNoise();
  const rustMaps = TX.genRust();
  const stoneMaps = TX.genStone();
  const oakMaps = TX.genOak();

  MATS.wall = concreteMaterial(wallMaps, { ns: 1.0, env: 0.9 });
  MATS.board = concreteMaterial(boardMaps, { ns: 0.9, env: 0.8, color: 0xf2f0ec });
  MATS.floor = concreteMaterial(floorMaps, { ns: 0.5, env: 1.0, wear: 0.6, ao: 0.8 });
  MATS.precast = concreteMaterial(floorMaps, { ns: 0.35, env: 0.9, color: 0xdedad2, wear: 1.2 });

  await say('Building the gallery and hall…');
  buildArchitecture();

  const root = new THREE.Group(); scene.add(root);
  const blobMat = new THREE.MeshBasicMaterial({ map: TX.blobTexture(), transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 });
  const steelMat = new THREE.MeshStandardMaterial({ color: 0x2a2826, metalness: 0.85, roughness: 0.38 });
  const oak = new THREE.MeshStandardMaterial({ ...oakMaps, roughness: 1 });

  // --- plinths
  const sp = EXH.steel, st = EXH.stone, rs = EXH.resin;
  box(sp.x - 1.5, -0.02, sp.z - 0.68, sp.x + 1.5, 0.16, sp.z + 0.68, 'precast', { r: 0.02, uvOff: [0.25 - sp.x / 6, 0.25 - sp.z / 6] });
  box(st.x - 0.72, -0.02, st.z - 0.55, st.x + 0.72, 0.42, st.z + 0.55, 'precast', { r: 0.025, uvOff: [0.25 - st.x / 6, 0.25 - st.z / 6] });
  {
    const g = new THREE.CylinderGeometry(1.55, 1.58, 0.28, 72, 1);
    g.translate(rs.x, rs.y + 0.12, rs.z);
    push(g, 'precast', [0.25 - rs.x / 6, 0.25 - rs.z / 6]);
    circles.push({ x: rs.x, z: rs.z, r: 1.58, y0: rs.y, y1: rs.y + 3.5 });
    const g2 = new THREE.CylinderGeometry(1.62, 1.62, 0.03, 72, 1); // bronze-dark shadow reveal ring
    const ring = new THREE.Mesh(g2, steelMat); ring.position.set(rs.x, rs.y + 0.0, rs.z); root.add(ring);
  }

  // --- folded weathering steel (gallery, west)
  const rust = new THREE.MeshStandardMaterial({ ...rustMaps, metalness: 0.45, roughness: 1, side: THREE.DoubleSide, envMapIntensity: 0.9 });
  const fold = new THREE.Mesh(foldedSteel(), rust);
  fold.position.set(sp.x, 0.16, sp.z); fold.rotation.y = 0.32;
  fold.castShadow = fold.receiveShadow = true; root.add(fold);

  // --- pale limestone (gallery, east)
  const stoneMat = new THREE.MeshStandardMaterial({ ...stoneMaps, roughness: 1, color: 0xffffff, envMapIntensity: 0.9 });
  stoneMat.onBeforeCompile = (sh) => {
    // soft light wrap to suggest the subsurface glow of limestone
    sh.fragmentShader = sh.fragmentShader.replace('#include <lights_fragment_end>', '#include <lights_fragment_end>\nreflectedLight.indirectDiffuse += diffuseColor.rgb * 0.035;');
  };
  const stone = new THREE.Mesh(stoneSculpture(), stoneMat);
  stone.position.set(st.x, 0.42, st.z); stone.rotation.y = 1.05;
  stone.castShadow = stone.receiveShadow = true; root.add(stone);

  // --- translucent resin (hall, main)
  const resinMat = new THREE.MeshPhysicalMaterial({
    color: 0xf4fcfa, roughness: 0.07, metalness: 0, transmission: 1.0, thickness: 0.75, ior: 1.52,
    attenuationColor: new THREE.Color(0x8ad6cc), attenuationDistance: 2.2, specularIntensity: 0.8,
    emissive: new THREE.Color(0x0a2b27), emissiveIntensity: 1.0,
  });
  const resin = new THREE.Mesh(resinSculpture(), resinMat);
  resin.position.set(rs.x, rs.y + 0.26, rs.z);
  resin.castShadow = true; resin.receiveShadow = false; root.add(resin);

  colliders.push({ x0: sp.x - 1.5, x1: sp.x + 1.5, z0: sp.z - 0.68, z1: sp.z + 0.68, y0: 0, y1: 2.6 });
  colliders.push({ x0: st.x - 0.72, x1: st.x + 0.72, z0: st.z - 0.55, z1: st.z + 0.55, y0: 0, y1: 2.6 });

  // --- contact shadows
  blob(sp.x, 0, sp.z, 3.8, 2.1, blobMat, root);
  blob(st.x, 0, st.z, 2.3, 1.9, blobMat, root);
  blob(rs.x, rs.y, rs.z, 4.2, 4.2, blobMat, root);

  // --- benches
  bench(-7.55, 8.6, 0, true, oak, steelMat, blobMat, root);
  bench(-7.1, 25.2, HALL_FLOOR, true, oak, steelMat, blobMat, root);
  bench(1.6, 32.9, HALL_FLOOR, false, oak, steelMat, blobMat, root);

  // --- labels
  const lab = (title, artist, mat, year) => TX.labelTexture([
    { text: artist, font: '500 34px "Segoe UI", Helvetica, Arial', gap: 52 },
    { text: title, font: 'italic 300 40px Georgia, "Times New Roman", serif', gap: 56 },
    { text: mat, font: '300 27px "Segoe UI", Helvetica, Arial', gap: 38, color: '#4b4840' },
    { text: year, font: '300 27px "Segoe UI", Helvetica, Arial', gap: 38, color: '#4b4840' },
  ], 640, 400, { top: 82, left: 46 });
  labelStand(sp.x + 0.2, sp.z - 1.45, 0, 0.32 + Math.PI, lab('Fold Sequence IV', 'Ines Varga-Holm', 'Weathering steel, 22 mm plate', '2024'), steelMat, root);
  labelStand(st.x - 0.55, st.z - 1.25, 0, Math.PI - 0.45, lab('Hollow Weight', 'Teodor Askeland', 'Pale limestone, hand carved', '2022'), steelMat, root);
  wallPlaque(GX0 + 0.012, HALL_FLOOR + 1.45, 22.4, Math.PI / 2, 0.36, 0.225, lab('Glacial Index', 'Mara Okafor-Lind', 'Cast aqua resin, fifteen layers', '2025'), root);
  const intro = TX.labelTexture([
    { text: 'MASS / LIGHT', font: '300 64px "Segoe UI", Helvetica, Arial', gap: 70 },
    { text: 'Three sculptures in concrete rooms', font: '300 30px "Segoe UI", Helvetica, Arial', gap: 64, color: '#5b574e' },
    { text: 'Gallery I — steel and stone', font: '400 26px "Segoe UI", Helvetica, Arial', gap: 38 },
    { text: 'Ramp to Hall II — resin, under the light well', font: '400 26px "Segoe UI", Helvetica, Arial', gap: 38 },
  ], 900, 380, { top: 96, left: 56, bg: '#dcd8cf' });
  wallPlaque(GX0 + 0.012, 1.7, 3.6, Math.PI / 2, 1.5, 0.633, intro, root);
  const sign = TX.labelTexture([{ text: 'HALL II  →', font: '400 46px "Segoe UI", Helvetica, Arial' }], 360, 90, { top: 62, left: 40, bg: '#d6d2c9' });
  wallPlaque(5.25, 2.3, GZ1 - 0.012, Math.PI, 0.6, 0.15, sign, root);

  // --- entrance doors: frame + glass
  const glass = new THREE.MeshPhysicalMaterial({ color: 0xcfe0e4, roughness: 0.04, metalness: 0, transparent: true, opacity: 0.16, envMapIntensity: 1.2, depthWrite: false });
  const mkFrame = (x0, y0, z0, x1, y1, z1) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(x1 - x0, y1 - y0, z1 - z0), steelMat);
    m.position.set((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2); m.castShadow = true; root.add(m);
  };
  const gz = -0.4;
  for (const x of [-7.2, -5.5, -3.8]) mkFrame(x - 0.035, 0, gz - 0.05, x + 0.035, 3.1, gz + 0.05);
  mkFrame(-7.2, 2.35, gz - 0.05, -3.8, 2.43, gz + 0.05);
  mkFrame(-7.2, 3.02, gz - 0.05, -3.8, 3.1, gz + 0.05);
  mkFrame(-7.2, 0, gz - 0.05, -3.8, 0.05, gz + 0.05);
  const gl = new THREE.Mesh(new THREE.PlaneGeometry(3.4, 3.1), glass); gl.position.set(-5.5, 1.55, gz); root.add(gl);
  // glazing in the hall slit and north window
  const gl2 = new THREE.Mesh(new THREE.PlaneGeometry(0.55, 8.3), glass); gl2.rotation.y = Math.PI / 2; gl2.position.set(GX0 - 0.4, HALL_FLOOR + 4.15, 27.975); root.add(gl2);
  const gl3 = new THREE.Mesh(new THREE.PlaneGeometry(6.2, 2.3), glass); gl3.position.set(3.5, 1.4, HZ1 + 0.4); root.add(gl3);
  for (const x of [0.4, 2.47, 4.53, 6.6]) mkFrame(x - 0.03, 0.25, HZ1 + 0.35, x + 0.03, 2.55, HZ1 + 0.45);
  // handrail along the ramp's east wall
  {
    const a = new THREE.Vector3(GX1 - 0.09, rampTop(HZ0) + 0.9, HZ0 + 0.3), b = new THREE.Vector3(GX1 - 0.09, rampTop(RAMP_Z1 + 0.6) + 0.9, RAMP_Z1 + 0.6);
    const pts = [a, new THREE.Vector3(a.x, 0.9, RAMP_Z0), new THREE.Vector3(a.x, HALL_FLOOR + 0.9, RAMP_Z1), b];
    const curve = new THREE.CatmullRomCurve3(pts, false, 'catmullrom', 0.05);
    const rail = new THREE.Mesh(new THREE.TubeGeometry(curve, 80, 0.022, 10), steelMat); rail.castShadow = true; root.add(rail);
    for (let z = HZ0 + 0.8; z < RAMP_Z1 + 0.5; z += 1.6) {
      const br = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.02, 0.02), steelMat);
      br.position.set(GX1 - 0.045, rampTop(z) + 0.9 - 0.03, z); root.add(br);
    }
  }

  // --- merge architecture
  for (const k of Object.keys(groups)) {
    const geo = mergeGeometries(groups[k]);
    const mesh = new THREE.Mesh(geo, MATS[k]);
    mesh.castShadow = true; mesh.receiveShadow = true;
    mesh.matrixAutoUpdate = false; mesh.updateMatrix();
    scene.add(mesh);
  }
  root.traverse((o) => { if (o.isMesh) { o.matrixAutoUpdate = false; o.updateMatrix(); } });
  root.updateMatrixWorld(true);

  // --- sky
  const sky = new THREE.Mesh(new THREE.SphereGeometry(200, 32, 16), new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false,
    uniforms: { uSun: { value: L }, uSunVis: { value: 0 }, uGain: { value: 0.9 } },
    vertexShader: 'varying vec3 vD; void main(){ vD = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); gl_Position.z = gl_Position.w; }',
    fragmentShader: `varying vec3 vD; uniform vec3 uSun; uniform float uSunVis; uniform float uGain;
      void main(){ float h = clamp(vD.y, 0.0, 1.0);
        vec3 c = mix(vec3(0.86,0.9,0.93), vec3(0.36,0.55,0.82), pow(h, 0.55));
        float s = max(dot(normalize(vD), uSun), 0.0);
        c += vec3(1.0,0.9,0.7) * (pow(s, 600.0) * 6.0 + pow(s, 12.0) * 0.25) * uSunVis;
        if (vD.y < 0.0) c = vec3(0.55,0.54,0.5);
        gl_FragColor = vec4(c * 1.6 * uGain, 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
  }));
  sky.frustumCulled = false; sky.renderOrder = -10;
  scene.add(sky);

  // --- lights
  const sun = new THREE.DirectionalLight(0xfff0dc, 6.5);
  const center = new THREE.Vector3(1, 3, 17);
  sun.position.copy(center).addScaledVector(L, 50);
  sun.target.position.copy(center);
  scene.add(sun, sun.target);
  sun.castShadow = true;
  sun.shadow.mapSize.set(4096, 4096);
  sun.shadow.bias = -0.0006;
  sun.shadow.normalBias = 0.035;
  sun.shadow.radius = 2.5;
  {
    sun.updateMatrixWorld(); sun.target.updateMatrixWorld();
    const cam = sun.shadow.camera;
    cam.position.copy(sun.position); cam.lookAt(sun.target.position); cam.updateMatrixWorld();
    const inv = cam.matrixWorldInverse;
    let mnx = 1e9, mxx = -1e9, mny = 1e9, mxy = -1e9, mnz = 1e9, mxz = -1e9;
    for (const x of [-11, 13]) for (const y of [-1.5, 11.5]) for (const z of [-5, 37]) {
      const v = new THREE.Vector3(x, y, z).applyMatrix4(inv);
      mnx = Math.min(mnx, v.x); mxx = Math.max(mxx, v.x); mny = Math.min(mny, v.y); mxy = Math.max(mxy, v.y); mnz = Math.min(mnz, v.z); mxz = Math.max(mxz, v.z);
    }
    cam.left = mnx; cam.right = mxx; cam.bottom = mny; cam.top = mxy; cam.near = -mxz - 2; cam.far = -mnz + 2;
    cam.updateProjectionMatrix();
  }
  const hemi = new THREE.HemisphereLight(0xd0dae6, 0x6d6c69, 0.55);
  scene.add(hemi);
  // diffuse skylight fill under each light well (no shadows; cheap)
  for (const s of skylights) {
    const h = s.hole; const cx = (h[0] + h[1]) / 2, cz = (h[2] + h[3]) / 2;
    const room = s.room === 'g';
    const top = room ? G_UP : H_UP;
    const ap = Math.min(h[1] - h[0], h[3] - h[2]) / 2;
    const ang = Math.min(1.0, Math.atan(ap / (top - s.yb)) * 1.15);
    const sl = new THREE.SpotLight(0xdde7f4, room ? 120 : 280, 0, ang, 0.85, 2);
    sl.position.set(cx, top - 0.1, cz);
    sl.target.position.set(cx, room ? 0 : HALL_FLOOR, cz);
    scene.add(sl, sl.target);
  }
  // ramp slot wash
  for (const z of [20.6, 27.4]) {
    const sl = new THREE.SpotLight(0xe2eaf4, 110, 0, 0.55, 0.9, 2);
    sl.position.set(9.75, H_UP - 0.6, z); sl.target.position.set(10.2, HALL_FLOOR, z + 0.5);
    scene.add(sl, sl.target);
  }
  // clerestory bounce (soft, warm) and entrance daylight spill
  const bounce = new THREE.PointLight(0xffe2c4, 18, 0, 2); bounce.position.set(-2.5, 1.5, 19.5); scene.add(bounce);
  const spill = new THREE.SpotLight(0xf3efe6, 55, 0, 1.2, 1, 2); spill.position.set(-5.5, 3.0, -0.9); spill.target.position.set(-4.5, 0, 5); scene.add(spill, spill.target);

  // --- faint sun shafts: skewed prisms from each sunlit aperture down to the floor (additive, no sorting)
  const shaftMat = (yb, yf, amt) => new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
    uniforms: { uTop: { value: yb }, uBot: { value: yf }, uAmt: { value: amt } },
    vertexShader: 'varying vec3 vW; varying vec3 vN; void main(){ vec4 w = modelMatrix * vec4(position,1.0); vW = w.xyz; vN = normal; gl_Position = projectionMatrix * viewMatrix * w; }',
    fragmentShader: `varying vec3 vW; varying vec3 vN; uniform float uTop; uniform float uBot; uniform float uAmt;
      void main(){ vec3 V = normalize(cameraPosition - vW); float f = abs(dot(normalize(vN), V));
        float h = clamp((vW.y - uBot) / (uTop - uBot), 0.0, 1.0);
        float near = smoothstep(0.4, 2.5, length(cameraPosition - vW));
        float a = uAmt * f * (0.2 + 0.8 * h) * near;
        gl_FragColor = vec4(vec3(1.0, 0.93, 0.82) * a, 1.0); }`,
  });
  const shaft = (x0, x1, z0, z1, yb, yf, amt) => {
    const t = (yb - yf) / L.y, dx = -L.x * t, dz = -L.z * t;
    const P = [[x0, yb, z0], [x1, yb, z0], [x1, yb, z1], [x0, yb, z1], [x0 + dx, yf, z0 + dz], [x1 + dx, yf, z0 + dz], [x1 + dx, yf, z1 + dz], [x0 + dx, yf, z1 + dz]];
    const F = [[0, 1, 5, 4], [1, 2, 6, 5], [2, 3, 7, 6], [3, 0, 4, 7]];
    const pos = [];
    for (const f of F) for (const i of [f[0], f[1], f[2], f[0], f[2], f[3]]) pos.push(...P[i]);
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.computeVertexNormals();
    const m = new THREE.Mesh(g, shaftMat(yb, yf, amt)); m.renderOrder = 2; m.matrixAutoUpdate = false; scene.add(m);
  };
  for (const sk of skylights) {
    const h = sk.hole, g = sk.room === 'g', inset = 0.25;
    shaft(h[0] + inset, h[1] - inset, h[2] + inset, h[3] - inset, sk.yb, g ? 0 : HALL_FLOOR, g ? 0.09 : 0.075);
  }
  shaft(8.7, 10.9, 16.6, 29.2, H_CEIL, HALL_FLOOR, 0.05);
  shaft(-7.8, 3.4, 14.0, 14.9, 7.85, HALL_FLOOR, 0.05);

  // --- first render: shadow map once, then capture environment from inside the rooms
  await say('Letting the daylight in…');
  renderer.shadowMap.needsUpdate = true;
  camera.position.set(0, 1.6, 6); camera.lookAt(0, 1.6, 20);
  renderer.compile(scene, camera);
  renderer.render(scene, camera);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const capture = (x, y, z) => {
    const rt = new THREE.WebGLCubeRenderTarget(256, { type: THREE.HalfFloatType });
    const cc = new THREE.CubeCamera(0.1, 250, rt);
    cc.position.set(x, y, z); scene.add(cc); cc.update(renderer, scene); scene.remove(cc);
    const env = pmrem.fromCubemap(rt.texture).texture; rt.dispose();
    return env;
  };
  resin.visible = false;
  const envHall = capture(-1.0, 2.2, 22.0);
  const envGal = capture(0.5, 1.8, 7.0);
  resin.visible = true;
  sky.material.uniforms.uSunVis.value = 1; sky.material.uniforms.uGain.value = 0.82;
  scene.environment = envHall;
  scene.environmentIntensity = 0.85;
  rust.envMap = envGal; stoneMat.envMap = envGal; steelMat.envMap = envGal; oak.envMap = envGal;
  resinMat.envMap = envHall; resinMat.envMapIntensity = 1.2;
  hemi.intensity = 0.2;
  pmrem.dispose();
  renderer.compile(scene, camera);
  // warm-up: render each viewpoint in several directions so programs, textures and the
  // transmission target are all resident before the visitor enters (no first-look hitches)
  await say('Warming up…');
  for (const [x, y, z] of [[-5.5, 1.6, 1.6], [8.2, 1.6, 15.4], [3.2, 0.7, 30.6], [-3.8, 0.7, 33.4], [-1.6, 0.7, 20]]) {
    camera.position.set(x, y, z);
    for (let a = 0; a < 4; a++) { camera.rotation.set(0, a * Math.PI / 2, 0, 'YXZ'); camera.updateMatrixWorld(); renderer.render(scene, camera); }
  }
}

// ---------------------------------------------------------------- controls
const keys = {};
let yaw = Math.PI, pitch = 0;
const pos = new THREE.Vector3();
const vel = new THREE.Vector2();
let feet = 0;
const VIEWS = [
  { x: -5.5, z: 1.6, yaw: Math.PI + 0.5, pitch: -0.02 },
  { x: 8.2, z: 15.4, yaw: Math.PI + 0.12, pitch: 0.05 },
  { x: 3.2, z: 30.6, yaw: Math.atan2(-(EXH.resin.x - 3.2), -(EXH.resin.z - 30.6)), pitch: 0.08 },
  { x: -3.8, z: 33.4, yaw: Math.atan2(-(4 - -3.8), -(14 - 33.4)) , pitch: 0.06 },
];
function setView(i) {
  const v = VIEWS[i]; pos.set(v.x, 0, v.z); yaw = v.yaw; pitch = v.pitch; vel.set(0, 0);
  feet = floorAt(v.x, v.z);
}
setView(0);

const overlay = document.getElementById('overlay');
let locked = false, ready = false, dragging = false;
overlay.addEventListener('click', () => {
  if (!ready) return;
  const el = renderer.domElement;
  const quiet = (r) => { if (r && r.catch) r.catch(() => { /* drag-to-look still works */ }); };
  try {
    const p = el.requestPointerLock && el.requestPointerLock({ unadjustedMovement: true });
    if (p && p.catch) p.catch(() => { try { quiet(el.requestPointerLock()); } catch (e) { /* ignore */ } });
  } catch (e) { /* ignore */ }
  overlay.style.display = 'none';
});
document.addEventListener('pointerlockchange', () => {
  locked = document.pointerLockElement === renderer.domElement;
  if (!locked) overlay.style.display = 'flex';
});
renderer.domElement.addEventListener('mousedown', () => { if (!locked) dragging = true; });
window.addEventListener('mouseup', () => { dragging = false; });
document.addEventListener('mousemove', (e) => {
  if (!locked && !dragging) return;
  yaw -= e.movementX * 0.0021; pitch -= e.movementY * 0.0021;
  pitch = Math.max(-1.45, Math.min(1.45, pitch));
});
window.addEventListener('keydown', (e) => {
  keys[e.code] = true;
  if (e.code === 'KeyR') setView(0);
  if (e.code === 'Digit1') setView(0);
  if (e.code === 'Digit2') setView(1);
  if (e.code === 'Digit3') setView(2);
  if (e.code === 'Digit4') setView(3);
  if (e.code === 'KeyF') perfEl.style.display = perfEl.style.display === 'block' ? 'none' : 'block';
  if (e.code === 'KeyQ') { dprMode = 1 - dprMode; renderer.setPixelRatio(dprMode ? Math.min(1, DPR_HIGH) * 0.8 : DPR_HIGH); }
  if (e.code.startsWith('Arrow') || e.code === 'Space') e.preventDefault();
});
window.addEventListener('keyup', (e) => { keys[e.code] = false; });
window.addEventListener('blur', () => { for (const k in keys) keys[k] = false; });
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function collide(px, pz) {
  for (let it = 0; it < 3; it++) {
    let moved = false;
    for (const c of colliders) {
      if (c.y1 <= feet + 0.38 || c.y0 >= feet + 1.8) continue;
      const qx = Math.max(c.x0, Math.min(px, c.x1)), qz = Math.max(c.z0, Math.min(pz, c.z1));
      const dx = px - qx, dz = pz - qz, d2 = dx * dx + dz * dz;
      if (d2 < PR * PR) {
        if (d2 > 1e-10) { const d = Math.sqrt(d2), k = (PR - d) / d; px += dx * k; pz += dz * k; }
        else { // centre inside box: push out along smallest axis
          const l = px - c.x0, r = c.x1 - px, b = pz - c.z0, f = c.z1 - pz, m = Math.min(l, r, b, f);
          if (m === l) px = c.x0 - PR; else if (m === r) px = c.x1 + PR; else if (m === b) pz = c.z0 - PR; else pz = c.z1 + PR;
        }
        moved = true;
      }
    }
    for (const c of circles) {
      if (c.y1 <= feet + 0.38 || c.y0 >= feet + 1.8) continue;
      const dx = px - c.x, dz = pz - c.z, d = Math.hypot(dx, dz), R = c.r + PR;
      if (d < R && d > 1e-6) { px = c.x + dx / d * R; pz = c.z + dz / d * R; moved = true; }
    }
    if (!moved) break;
  }
  return [px, pz];
}

function update(dt) {
  const fw = (keys.KeyW || keys.ArrowUp ? 1 : 0) - (keys.KeyS || keys.ArrowDown ? 1 : 0);
  const st = (keys.KeyD || keys.ArrowRight ? 1 : 0) - (keys.KeyA || keys.ArrowLeft ? 1 : 0);
  const speed = keys.ShiftLeft || keys.ShiftRight ? 4.6 : 2.4;
  const sx = -Math.sin(yaw), sz = -Math.cos(yaw);
  let tx = sx * fw + Math.cos(yaw) * st, tz = sz * fw - Math.sin(yaw) * st;
  const tl = Math.hypot(tx, tz); if (tl > 0) { tx = tx / tl * speed; tz = tz / tl * speed; }
  const k = 1 - Math.exp(-dt * (tl > 0 ? 9 : 12));
  vel.x += (tx - vel.x) * k; vel.y += (tz - vel.y) * k;
  // sub-step for robust collision
  const steps = Math.max(1, Math.ceil(Math.hypot(vel.x, vel.y) * dt / 0.08));
  for (let i = 0; i < steps; i++) {
    let nx = pos.x + vel.x * dt / steps, nz = pos.z + vel.y * dt / steps;
    [nx, nz] = collide(nx, nz);
    pos.x = nx; pos.z = nz;
    const target = floorAt(pos.x, pos.z);
    feet += (target - feet) * Math.min(1, (1 - Math.exp(-dt / steps * 25)));
    if (Math.abs(target - feet) < 0.002) feet = target;
  }
  camera.position.set(pos.x, feet + EYE, pos.z);
  camera.rotation.set(pitch, yaw, 0, 'YXZ');
}

// ---------------------------------------------------------------- perf overlay
const perfEl = document.getElementById('perf');
const ft = new Float32Array(240); let fti = 0, ftn = 0, lastPerf = 0;
function perf(dtms, now) {
  ft[fti] = dtms; fti = (fti + 1) % ft.length; ftn = Math.min(ftn + 1, ft.length);
  if (perfEl.style.display !== 'block' || now - lastPerf < 250) return;
  lastPerf = now;
  const arr = Array.from(ft.slice(0, ftn)).sort((a, b) => a - b);
  const avg = arr.reduce((a, b) => a + b, 0) / arr.length;
  const p99 = arr[Math.floor(arr.length * 0.99) - 1] || 0;
  const info = renderer.info.render;
  perfEl.textContent = `fps   ${(1000 / avg).toFixed(0)}\navg   ${avg.toFixed(2)} ms\np99   ${p99.toFixed(2)} ms\nmax   ${arr[arr.length - 1].toFixed(2)} ms\ncalls ${info.calls}  tris ${(info.triangles / 1000).toFixed(0)}k\ndpr   ${renderer.getPixelRatio().toFixed(2)}`;
}

let aqStart = 0, aqN = 0, aqSlow = 0, aqDone = false;
function autoQuality(dtms, now) {
  if (aqDone || !locked || document.hidden) return;
  if (!aqStart) aqStart = now;
  if (now - aqStart < 1500) return; // skip warm-up
  aqN++; if (dtms > 22) aqSlow++;
  if (aqN >= 240) {
    aqDone = true;
    if (aqSlow / aqN > 0.4 && dprMode === 0) { dprMode = 1; renderer.setPixelRatio(Math.min(1, DPR_HIGH) * 0.8); }
  }
}

// ---------------------------------------------------------------- go
let last = performance.now();
window.__museum = { update, setView, pos, get yaw() { return yaw; }, set yaw(v) { yaw = v; }, get pitch() { return pitch; }, set pitch(v) { pitch = v; }, keys, ft, renderer, camera, scene, floorAt };
build().then(() => {
  ready = true;
  goEl.textContent = 'CLICK TO ENTER';
  statusEl.textContent = 'Ready.';
  last = performance.now();
  renderer.setAnimationLoop(() => {
    const now = performance.now();
    const dtms = now - last; last = now;
    const dt = Math.min(dtms / 1000, 0.05);
    update(dt);
    renderer.render(scene, camera);
    perf(dtms, now);
    autoQuality(dtms, now);
  });
}).catch((e) => { console.error(e); statusEl.textContent = 'Error: ' + e.message; });

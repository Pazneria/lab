import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import * as T from './textures.js';
import { vessel, randomVessel, paint, lump, rng, GLAZES } from './pottery.js';

// ---------------------------------------------------------------- renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
let hiQ = true;
const setPR = () => renderer.setPixelRatio(hiQ ? Math.min(window.devicePixelRatio, 1.5) : Math.min(window.devicePixelRatio, 1) * 0.75);
setPR();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.shadowMap.autoUpdate = false;
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.03, 160);
camera.rotation.order = 'YXZ';

const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
scene.environmentIntensity = 0.32;

// ---------------------------------------------------------------- materials
function M(tex, ws, p = {}) {
  const { bump, ...rest } = p;
  const m = new THREE.MeshStandardMaterial(Object.assign({ roughness: 0.85, metalness: 0 }, rest));
  if (tex) { m.map = tex.map; m.bumpMap = tex.bump; m.bumpScale = bump ?? 1.2; }
  m.userData.ws = Array.isArray(ws) ? ws : [ws, ws];
  return m;
}
const mats = {};
mats.plaster = M(T.plasterTex(), 2.5, { roughness: 0.95, bump: 0.8 });
mats.concrete = M(T.concreteTex(), 5, { roughness: 0.9, bump: 0.8 });
mats.wood = M(T.woodTex(1, [0.5, 0.36, 0.23]), 1.2, { roughness: 0.78, bump: 0.6 });
mats.darkWood = M(T.woodTex(2, [0.36, 0.25, 0.17], 0.12), 1.2, { roughness: 0.8, bump: 0.6 });
mats.shelfWood = M(T.woodTex(3, [0.6, 0.47, 0.33], 0.5), 1.2, { roughness: 0.88, bump: 0.5 });
mats.bench = M(T.benchTopTex(), [2.6, 1.3], { roughness: 0.86, bump: 1.0 });
mats.brick = M(T.brickTex({ palette: [[0.62, 0.3, 0.2], [0.7, 0.36, 0.24], [0.55, 0.27, 0.19], [0.66, 0.4, 0.3], [0.5, 0.3, 0.24]], seed: 3 }), [1.2, 0.6], { roughness: 0.9, bump: 1.6 });
mats.kilnBrick = M(T.brickTex({ palette: [[0.58, 0.32, 0.22], [0.66, 0.4, 0.28], [0.5, 0.28, 0.2], [0.72, 0.5, 0.36]], seed: 9, soot: 0.45, mortarCol: [0.55, 0.52, 0.48] }), [1.2, 0.6], { roughness: 0.92, bump: 1.6 });
mats.fireBrick = M(T.brickTex({ palette: [[0.86, 0.78, 0.62], [0.8, 0.7, 0.54], [0.9, 0.84, 0.7], [0.76, 0.66, 0.5]], seed: 5, soot: 0.6, mortar: 5, mortarCol: [0.8, 0.76, 0.68] }), [1.15, 0.52], { roughness: 0.95, bump: 1.2 });
mats.pavers = M(T.brickTex({ w: 1024, h: 1024, cols: 10, rows: 20, mortar: 6, palette: [[0.55, 0.33, 0.25], [0.48, 0.3, 0.24], [0.6, 0.4, 0.3], [0.45, 0.36, 0.3], [0.52, 0.42, 0.34]], mortarCol: [0.5, 0.47, 0.4], seed: 13 }), 2.0, { roughness: 0.92, bump: 1.4 });
mats.gravel = M(T.gravelTex(), 1.2, { roughness: 1, bump: 1.5 });
mats.roof = M(T.roofTileTex(), [1.6, 1.2], { roughness: 0.85, bump: 2.0 });
mats.corr = M(T.corrugatedTex(), [1.0, 1.0], { roughness: 0.55, metalness: 0.45, bump: 2.5 });
const steelT = T.steelTex();
mats.steel = M(steelT, 1, { roughness: 0.62, metalness: 0.6, bump: 0.6 });
mats.zinc = M(steelT, 1.5, { roughness: 0.38, metalness: 0.35, color: 0xf2f4f4, bump: 0.3 });
mats.canvas = M(T.canvasClothTex(), 0.4, { roughness: 1, bump: 0.6 });
mats.ground = M(T.groundTex(), 6, { roughness: 1, bump: 0.6 });
mats.glass = new THREE.MeshStandardMaterial({ color: 0xcfe2ea, transparent: true, opacity: 0.16, roughness: 0.04, metalness: 0, depthWrite: false });
mats.glass.userData.ws = [1, 1]; mats.glass.userData.noShadow = true;
mats.soot = new THREE.MeshBasicMaterial({ map: T.sootTex(), transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 });
mats.soot.userData.ws = [1, 1]; mats.soot.userData.noShadow = true; mats.soot.userData.local = true;
mats.label = new THREE.MeshStandardMaterial({ map: T.labelTex(), roughness: 0.9 });
mats.label.userData.ws = [1, 1]; mats.label.userData.local = true;
// architecture materials take UVs from world position so walls/floors tile continuously
for (const k of ['plaster', 'concrete', 'brick', 'kilnBrick', 'fireBrick', 'pavers', 'gravel', 'ground']) mats[k].userData.world = true;

// vertex coloured material with per-vertex glossiness (ceramics, plastics, props)
const vcMat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.9, metalness: 0 });
vcMat.onBeforeCompile = (sh) => {
  sh.vertexShader = sh.vertexShader
    .replace('#include <common>', '#include <common>\nattribute float gloss;\nvarying float vGloss;\nvarying vec3 vWP;')
    .replace('#include <begin_vertex>', '#include <begin_vertex>\nvGloss = gloss;\nvWP = (modelMatrix * vec4(transformed, 1.0)).xyz;');
  sh.fragmentShader = sh.fragmentShader
    .replace('#include <common>', `#include <common>
varying float vGloss;
varying vec3 vWP;
float h3(vec3 p) { p = fract(p * 0.3183099 + 0.1); p *= 17.0; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }
float vn3(vec3 x) { vec3 i = floor(x), f = fract(x); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(mix(h3(i), h3(i + vec3(1,0,0)), f.x), mix(h3(i + vec3(0,1,0)), h3(i + vec3(1,1,0)), f.x), f.y),
             mix(mix(h3(i + vec3(0,0,1)), h3(i + vec3(1,0,1)), f.x), mix(h3(i + vec3(0,1,1)), h3(i + vec3(1,1,1)), f.x), f.y), f.z); }`)
    .replace('#include <color_fragment>', `#include <color_fragment>
  {
    vec3 q = vWP * 160.0;
    float fade = clamp(1.6 - length(fwidth(q)) * 1.2, 0.0, 1.0);
    float n = vn3(q) * 0.65 + vn3(q * 2.7) * 0.35;
    float rawK = 1.0 - smoothstep(0.15, 0.6, vGloss);
    diffuseColor.rgb *= 1.0 + (n - 0.5) * 0.22 * fade * rawK;
  }`)
    .replace('#include <roughnessmap_fragment>', 'float roughnessFactor = mix(0.9, 0.06, vGloss);');
};
vcMat.userData.vc = true;

// ---------------------------------------------------------------- geometry buckets
const buckets = new Map();
function put(mat, geo) {
  if (!mat.userData.vc && geo.index) geo = geo.toNonIndexed();
  let a = buckets.get(mat); if (!a) { a = []; buckets.set(mat, a); } a.push(geo);
}
const _m = new THREE.Matrix4(), _q = new THREE.Quaternion(), _e = new THREE.Euler(), _p = new THREE.Vector3(), _s = new THREE.Vector3();
let PARENT = null;
function xf(g, x, y, z, ry = 0, rx = 0, rz = 0, s = 1) {
  _e.set(rx, ry, rz, 'YXZ'); _q.setFromEuler(_e); _p.set(x, y, z); _s.set(s, s, s);
  _m.compose(_p, _q, _s);
  if (PARENT) _m.premultiply(PARENT);
  g.applyMatrix4(_m); return g;
}
function worldUV(g, ws) {
  const p = g.attributes.position, n = g.attributes.normal; let uv = g.attributes.uv;
  if (!uv) { uv = new THREE.BufferAttribute(new Float32Array(p.count * 2), 2); g.setAttribute('uv', uv); }
  for (let i = 0; i < p.count; i++) {
    const ax = Math.abs(n.getX(i)), ay = Math.abs(n.getY(i)), az = Math.abs(n.getZ(i));
    let u, v;
    if (ay > ax && ay > az) { u = p.getX(i); v = p.getZ(i); }
    else if (ax > az) { u = p.getZ(i); v = p.getY(i); }
    else { u = p.getX(i); v = p.getY(i); }
    uv.setXY(i, u / ws[0], v / ws[1]);
  }
}
const FACE_AX = [['z', 'y'], ['z', 'y'], ['x', 'z'], ['x', 'z'], ['x', 'y'], ['x', 'y']];
let uvR = rng(77);
function box(mat, w, h, d, x, y, z, ry = 0, rx = 0, rz = 0) {
  const g = new THREE.BoxGeometry(w, h, d);
  const ws = mat.userData.ws || [1, 1];
  if (!mat.userData.world && !mat.userData.vc) {
    const uv = g.attributes.uv, dims = { x: w, y: h, z: d };
    const long = w >= h && w >= d ? 'x' : (h >= d ? 'y' : 'z');
    const ou = uvR() * 7, ov = uvR() * 7;
    for (let f = 0; f < 6; f++) {
      const [a, b] = FACE_AX[f]; const swap = b === long;
      for (let k = 0; k < 4; k++) {
        const i = f * 4 + k, u = uv.getX(i), v = uv.getY(i);
        if (mat.userData.local) continue;
        if (swap) uv.setXY(i, v * dims[b] / ws[0] + ou, u * dims[a] / ws[1] + ov);
        else uv.setXY(i, u * dims[a] / ws[0] + ou, v * dims[b] / ws[1] + ov);
      }
    }
  }
  xf(g, x, y, z, ry, rx, rz);
  if (mat.userData.world) worldUV(g, ws);
  put(mat, g); return g;
}
function cyl(mat, rt, rb, h, seg, x, y, z, rx = 0, rz = 0, ry = 0, open = false) {
  const g = new THREE.CylinderGeometry(rt, rb, h, seg, 1, open);
  const ws = mat.userData.ws || [1, 1];
  const uv = g.attributes.uv;
  for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * (2 * Math.PI * Math.max(rt, rb)) / ws[0], uv.getY(i) * h / ws[1]);
  xf(g, x, y, z, ry, rx, rz);
  if (mat.userData.world) worldUV(g, ws);
  put(mat, g); return g;
}
// ceramics/props are split into spatial chunks so frustum culling can skip unseen areas
const vcChunks = new Map();
const _bb = new THREE.Box3(), _bc = new THREE.Vector3();
function vput(g) {
  g.computeBoundingBox(); g.boundingBox.getCenter(_bc);
  const key = _bc.x < -1.8 ? 'w' : _bc.x < 2.5 ? 'c' : _bc.x < 5.1 ? 'e' : _bc.x < 10.8 ? (_bc.z < 0.9 ? 'g' : 'y1') : (_bc.z < 6.4 ? 'y2' : 'y3');
  const k2 = (_bc.y > 3.2 || _bc.x > 15.6 || _bc.z > 11.6 || _bc.z < -4.3 || _bc.x < -5.3) ? 'out' : key + (_bc.z < 1.5 ? 'n' : 's');
  let a = vcChunks.get(k2); if (!a) { a = []; vcChunks.set(k2, a); } a.push(g);
}
function vbox(col, gloss, w, h, d, x, y, z, ry = 0, rx = 0, rz = 0, vary = 0.06) { vput(xf(paint(new THREE.BoxGeometry(w, h, d), col, gloss, vary, (x * 100 + z * 37) | 0), x, y, z, ry, rx, rz)); }
function vcyl(col, gloss, rt, rb, h, seg, x, y, z, rx = 0, rz = 0, ry = 0) { vput(xf(paint(new THREE.CylinderGeometry(rt, rb, h, seg), col, gloss, 0.05, (x * 91 + z * 13) | 0), x, y, z, ry, rx, rz)); }
function plane(mat, w, h, x, y, z, ry = 0, rx = 0) { const g = new THREE.PlaneGeometry(w, h); xf(g, x, y, z, ry, rx); if (mat.userData.world) worldUV(g, mat.userData.ws); put(mat, g); }

// ---------------------------------------------------------------- collision
const solids = [];
function solid(x0, z0, x1, z1) { solids.push([Math.min(x0, x1), Math.min(z0, z1), Math.max(x0, x1), Math.max(z0, z1)]); }

// ---------------------------------------------------------------- pottery placement
function addVessel(o, x, y, z, ry = 0, flip = false, rx = 0) {
  for (const g of vessel(o)) {
    if (flip) { g.rotateX(Math.PI); g.translate(0, o.H + 0.004, 0); }
    if (rx) g.rotateX(rx);
    vput(xf(g, x, y, z, ry));
  }
}
// fill a shelf line; dir along the shelf, back = direction toward wall
function fillShelf(x0, z0, x1, z1, y, depth, maxH, seed, opts = {}) {
  const r = rng(seed);
  const dx = x1 - x0, dz = z1 - z0, len = Math.hypot(dx, dz), ux = dx / len, uz = dz / len;
  const bx = opts.back[0], bz = opts.back[1];
  let s = 0.04 + r() * 0.05, series = null, left = 0;
  while (s < len - 0.06) {
    if (!left) { series = randomVessel(r, Object.assign({ maxH, maxR: depth * 0.42 }, opts)); left = 1 + Math.floor(r() * 4); }
    const v = Object.assign({}, series, { seed: Math.floor(r() * 1e9), R: series.R * (0.94 + r() * 0.1), H: series.H * (0.92 + r() * 0.12) });
    left--;
    const fp = v.shape === 'plate' ? 0.06 : 2 * v.R * 1.06 + (v.handle ? v.R * 0.6 : 0);
    if (s + fp > len - 0.02) break;
    const c = s + fp / 2;
    const off = (r() - 0.5) * Math.max(0, depth - 2 * v.R - 0.04);
    let px = x0 + ux * c - bx * off, pz = z0 + uz * c - bz * off;
    const ry = r() * Math.PI * 2;
    if (v.shape === 'plate') {
      // lean plates against the back
      const back = depth / 2 - 0.05;
      px = x0 + ux * c + bx * back; pz = z0 + uz * c + bz * back;
      const yaw = Math.atan2(bx, bz);
      for (const g of vessel(v)) { g.translate(0, 0, 0); g.rotateX(-1.2); vput(xf(g, px - bx * 0.07, y + v.R * 0.9 + 0.01, pz - bz * 0.07, yaw)); }
    } else if ((v.shape === 'bowl' || v.shape === 'teabowl') && r() < 0.45 && v.H < maxH * 0.5) {
      const n = 2 + Math.floor(r() * 2);
      let yy = y;
      for (let k = 0; k < n; k++) {
        const vv = Object.assign({}, v, { seed: v.seed + k * 7, R: v.R * (1 - k * 0.07) });
        addVessel(vv, px, yy, pz, ry + k);
        yy += vv.H * 0.35;
      }
    } else {
      addVessel(v, px, y, pz, ry, opts.flip && r() < opts.flip);
    }
    s += fp + 0.012 + r() * 0.05;
  }
}

// ---------------------------------------------------------------- building helpers
function wall(axis, c0, c1, a0, a1, h, opens, mat, skinSide = 0, skinMat = null, collide = true) {
  const segs = []; opens = (opens || []).slice().sort((p, q) => p.a - q.a);
  let cur = a0;
  for (const o of opens) {
    if (o.a > cur) segs.push([cur, o.a, 0, h]);
    if (o.y0 > 0) segs.push([o.a, o.b, 0, o.y0]);
    if (o.y1 < h) segs.push([o.a, o.b, o.y1, h]);
    cur = o.b;
  }
  if (cur < a1) segs.push([cur, a1, 0, h]);
  const th = c1 - c0, cm = (c0 + c1) / 2;
  for (const [s0, s1, y0, y1] of segs) {
    const len = s1 - s0, mid = (s0 + s1) / 2, hh = y1 - y0, ym = (y0 + y1) / 2;
    if (axis === 'x') box(mat, len, hh, th, mid, ym, cm); else box(mat, th, hh, len, cm, ym, mid);
    if (skinMat) {
      const st = 0.016, sc = skinSide < 0 ? c0 - st / 2 : c1 + st / 2;
      if (axis === 'x') box(skinMat, len, hh, st, mid, ym, sc); else box(skinMat, st, hh, len, sc, ym, mid);
    }
    if (collide && y0 < 0.5) { if (axis === 'x') solid(s0, c0, s1, c1); else solid(c0, s0, c1, s1); }
  }
}
function windowFrame(axis, cm, a, b, y0, y1, th = 0.25, bars = 2) {
  const fw = 0.06, mid = (a + b) / 2, w = b - a, hh = y1 - y0;
  const B = (len, h, along, y) => axis === 'x' ? box(mats.darkWood, len, h, 0.08, along, y, cm) : box(mats.darkWood, 0.08, h, len, cm, y, along);
  B(w, fw, mid, y0 + fw / 2); B(w, fw, mid, y1 - fw / 2);
  B(fw, hh, a + fw / 2, (y0 + y1) / 2); B(fw, hh, b - fw / 2, (y0 + y1) / 2);
  for (let i = 1; i < bars; i++) B(0.035, hh, a + (w * i) / bars, (y0 + y1) / 2);
  B(w, 0.035, mid, (y0 + y1) / 2);
  if (axis === 'x') { plane(mats.glass, w, hh, mid, (y0 + y1) / 2, cm); box(mats.wood, w + 0.1, 0.04, th + 0.08, mid, y0 - 0.02, cm); }
  else { plane(mats.glass, w, hh, cm, (y0 + y1) / 2, mid, Math.PI / 2); box(mats.wood, th + 0.08, 0.04, w + 0.1, cm, y0 - 0.02, mid); }
}

// ================================================================= STUDIO
// interior x[-5,5] z[-4,6]; walls 0.25 thick outside that
box(mats.concrete, 10.5, 0.1, 10.5, 0, -0.05, 1);
const WH = 3.4;
// south wall with entrance + window
wall('x', 6, 6.25, -5.25, 5.25, WH, [{ a: -0.8, b: 0.8, y0: 0, y1: 2.3 }, { a: 1.6, b: 3.0, y0: 1.0, y1: 2.35 }, { a: -3.0, b: -1.8, y0: 1.85, y1: 2.6 }], mats.brick, -1, mats.plaster);
windowFrame('x', 6.12, 1.6, 3.0, 1.0, 2.35);
windowFrame('x', 6.12, -3.0, -1.8, 1.85, 2.6, 0.25, 1);
solid(-0.8, 6.25, 0.8, 6.45); // entrance threshold (view out, no exit)
// north wall with clerestory windows
wall('x', -4.25, -4, -5.25, 5.25, WH, [{ a: -3.8, b: -2.2, y0: 2.45, y1: 3.1 }, { a: -0.8, b: 0.8, y0: 2.45, y1: 3.1 }, { a: 2.2, b: 3.8, y0: 2.45, y1: 3.1 }], mats.brick, 1, mats.plaster);
for (const a of [-3.8, -0.8, 2.2]) windowFrame('x', -4.12, a, a + 1.6, 2.45, 3.1);
// west wall
wall('z', -5.25, -5, -4.25, 6.25, WH, [{ a: -2.6, b: -1.4, y0: 2.4, y1: 3.1 }, { a: 1.4, b: 2.6, y0: 2.4, y1: 3.1 }], mats.brick, 1, mats.plaster);
windowFrame('z', -5.12, -2.6, -1.4, 2.4, 3.1, 0.25, 1); windowFrame('z', -5.12, 1.4, 2.6, 2.4, 3.1, 0.25, 1);
// east wall: glazing opening, window, courtyard door
wall('z', 5, 5.25, -4.25, 6.25, WH, [{ a: -3.4, b: 0.0, y0: 0, y1: 2.65 }, { a: 0.9, b: 2.1, y0: 1.0, y1: 2.35 }, { a: 2.6, b: 3.8, y0: 0, y1: 2.25 }], mats.brick, -1, mats.plaster);
windowFrame('z', 5.12, 0.9, 2.1, 1.0, 2.35);
box(mats.darkWood, 0.32, 0.22, 3.7, 5.12, 2.76, -1.7); // lintel beam over glazing opening
// door frames
for (const [x0, x1, z] of [[-0.8, 0.8, 6.12]]) { box(mats.darkWood, 0.08, 2.3, 0.3, x0 + 0.04, 1.15, z); box(mats.darkWood, 0.08, 2.3, 0.3, x1 - 0.04, 1.15, z); box(mats.darkWood, x1 - x0, 0.08, 0.3, 0, 2.27, z); }
box(mats.darkWood, 0.3, 2.25, 0.08, 5.12, 1.125, 2.64); box(mats.darkWood, 0.3, 2.25, 0.08, 5.12, 1.125, 3.76); box(mats.darkWood, 0.3, 0.08, 1.2, 5.12, 2.21, 3.2);
// entrance doors swung outward, courtyard door swung against outside wall
for (const sgn of [-1, 1]) {
  const hx = sgn * 0.78;
  box(mats.wood, 0.04, 2.2, 0.78, hx + sgn * 0.05, 1.1, 6.25 + 0.4, 0);
  for (const yy of [0.3, 1.1, 1.9]) box(mats.darkWood, 0.05, 0.1, 0.74, hx + sgn * 0.08, yy, 6.65);
}
box(mats.wood, 0.04, 2.15, 1.12, 5.32, 1.08, 4.4); for (const yy of [0.35, 1.08, 1.8]) box(mats.darkWood, 0.04, 0.1, 1.08, 5.36, yy, 4.4);
vbox([0.32, 0.27, 0.2], 0.0, 1.1, 0.012, 0.65, 0, 0.006, 5.55, 0, 0, 0, 0.12);
// door steps
box(mats.concrete, 1.8, 0.08, 0.6, 0, -0.02, 6.55);
// ceiling + beams + roof
box(mats.darkWood, 10.0, 0.05, 10.0, 0, WH - 0.04, 1);
for (let z = -3.3; z <= 5.5; z += 1.45) box(mats.darkWood, 10.0, 0.24, 0.15, 0, WH - 0.18, z);
box(mats.darkWood, 0.18, 0.2, 10, -2.5, WH - 0.36, 1); box(mats.darkWood, 0.18, 0.2, 10, 2.5, WH - 0.36, 1);
{
  const rise = 1.5, half = 5.65, th = Math.atan(rise / half), L = Math.hypot(rise, half) + 0.12;
  for (const s of [-1, 1]) box(mats.roof, L, 0.1, 11.4, s * half / 2, WH + rise / 2 + 0.07, 1, 0, 0, -s * th);
  const tri = new THREE.Shape(); tri.moveTo(-5.25, 0); tri.lineTo(5.25, 0); tri.lineTo(0, rise * 5.25 / half); tri.closePath();
  for (const z of [-4.25, 6.0]) { const g = new THREE.ExtrudeGeometry(tri, { depth: 0.25, bevelEnabled: false }); xf(g, 0, WH, z); worldUV(g, mats.brick.userData.ws); put(mats.brick, g); }
  box(mats.darkWood, 0.06, 0.25, 11.4, -half - 0.02, WH + 0.02, 1); box(mats.darkWood, 0.06, 0.25, 11.4, half + 0.02, WH + 0.02, 1);
}

// lime-washed lower band on studio walls (grubby where people work)
mats.dado = M(T.plasterTex(), 2.5, { roughness: 0.95, bump: 0.8, color: 0x9fa9a6 }); mats.dado.userData.world = true;
box(mats.dado, 0.012, 1.0, 10.0, -4.975, 0.5, 1.0); box(mats.dado, 0.012, 1.0, 0.6, 4.975, 0.5, -3.7);
box(mats.dado, 0.012, 1.0, 2.2, 4.975, 0.5, 4.9); box(mats.dado, 0.012, 1.0, 2.6, 4.975, 0.5, 1.3);
box(mats.dado, 10.0, 1.0, 0.012, 0, 0.5, -3.975); box(mats.dado, 4.2, 1.0, 0.012, -2.9, 0.5, 5.975); box(mats.dado, 4.2, 1.0, 0.012, 2.9, 0.5, 5.975);
// ---- central workbench (0,1.5)
{
  const cx = 0, cz = 1.5, W = 2.6, D = 1.2, TOP = 0.92;
  box(mats.bench, W, 0.08, D, cx, TOP - 0.04, cz);
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) box(mats.darkWood, 0.1, TOP - 0.08, 0.1, cx + sx * (W / 2 - 0.12), (TOP - 0.08) / 2, cz + sz * (D / 2 - 0.12));
  for (const sz of [-1, 1]) box(mats.darkWood, W - 0.3, 0.1, 0.05, cx, 0.75, cz + sz * (D / 2 - 0.1));
  box(mats.shelfWood, W - 0.3, 0.03, D - 0.25, cx, 0.22, cz);
  solid(cx - W / 2, cz - D / 2, cx + W / 2, cz + D / 2);
  // canvas wedging/slab area
  box(mats.canvas, 0.9, 0.006, 0.7, -0.75, TOP + 0.003, cz + 0.05);
  // stages of making, left to right
  vput(xf(lump(0.11, 0.08, 0.09, [0.46, 0.38, 0.32], 0.35, 5), -0.95, TOP + 0.005, cz + 0.15)); // wedged ball
  vput(xf(lump(0.16, 0.1, 0.12, [0.48, 0.4, 0.33], 0.3, 6), -0.55, TOP + 0.005, cz - 0.15, 0.4)); // block
  // rolled slab with guide sticks + cut-out
  vbox([0.47, 0.39, 0.32], 0.35, 0.5, 0.012, 0.36, -0.7, TOP + 0.012, cz + 0.12, 0.1);
  vbox([0.6, 0.45, 0.3], 0.1, 0.6, 0.012, 0.025, -0.7, TOP + 0.012, cz + 0.33, 0.1); vbox([0.6, 0.45, 0.3], 0.1, 0.6, 0.012, 0.025, -0.68, TOP + 0.012, cz - 0.1, 0.1);
  vcyl([0.62, 0.5, 0.36], 0.15, 0.03, 0.03, 0.42, 14, -1.05, TOP + 0.04, cz - 0.38, 0, Math.PI / 2, 0.3); // rolling pin
  // freshly thrown on bat
  vcyl([0.6, 0.48, 0.32], 0.1, 0.15, 0.15, 0.015, 30, -0.15, TOP + 0.008, cz - 0.25);
  addVessel({ shape: 'cylinder', R: 0.075, H: 0.19, clay: 'buff', stage: 'wet', seed: 101, rim: 'roll' }, -0.15, TOP + 0.016, cz - 0.25);
  vcyl([0.6, 0.48, 0.32], 0.1, 0.15, 0.15, 0.015, 30, 0.22, TOP + 0.008, cz - 0.3);
  addVessel({ shape: 'bowl', R: 0.12, H: 0.075, clay: 'red', stage: 'wet', seed: 102, wave: 0.03 }, 0.22, TOP + 0.016, cz - 0.3);
  // banding wheel with leather-hard bowl upside down for trimming + trimmings
  vcyl([0.25, 0.25, 0.27], 0.35, 0.11, 0.13, 0.03, 30, 0.2, TOP + 0.015, cz + 0.2);
  vcyl([0.3, 0.3, 0.32], 0.4, 0.13, 0.13, 0.012, 30, 0.2, TOP + 0.036, cz + 0.2);
  addVessel({ shape: 'deepbowl', R: 0.1, H: 0.085, clay: 'buff', stage: 'leather', seed: 103 }, 0.2, TOP + 0.042, cz + 0.2, 0, true);
  const tr = rng(55);
  for (let i = 0; i < 26; i++) vput(xf(lump(0.008 + tr() * 0.01, 0.003, 0.004, [0.62, 0.52, 0.42], 0.1, 600 + i, 1), 0.2 + (tr() - 0.5) * 0.5, TOP, cz + 0.2 + (tr() - 0.5) * 0.4, tr() * 6));
  // mug with separate handle being attached
  addVessel({ shape: 'mug', R: 0.045, H: 0.1, clay: 'speckled', stage: 'leather', seed: 104 }, 0.55, TOP, cz + 0.05);
  vput(xf(lump(0.04, 0.008, 0.01, [0.55, 0.49, 0.42], 0.15, 105, 2), 0.66, TOP, cz + 0.2, 0.7));
  // bone dry + bisque row along back edge
  addVessel({ shape: 'jar', R: 0.08, H: 0.13, clay: 'buff', stage: 'dry', seed: 106, rim: 'roll' }, 0.75, TOP, cz - 0.38);
  addVessel({ shape: 'teabowl', R: 0.06, H: 0.08, clay: 'porcelain', stage: 'dry', seed: 107, wave: 0.05 }, 0.93, TOP, cz - 0.4);
  addVessel({ shape: 'bottle', R: 0.06, H: 0.2, clay: 'red', stage: 'bisque', seed: 108 }, 1.1, TOP, cz - 0.35);
  addVessel({ shape: 'bowl', R: 0.09, H: 0.06, clay: 'speckled', stage: 'bisque', seed: 109 }, 1.0, TOP, cz - 0.12);
  // finished glazed reference pieces
  addVessel({ shape: 'mug', R: 0.044, H: 0.105, clay: 'speckled', stage: 'glazed', glaze: 'oatmeal', glaze2: 'turq', seed: 110, handle: true }, 1.05, TOP, cz + 0.22, 2.2);
  addVessel({ shape: 'teabowl', R: 0.062, H: 0.075, clay: 'dark', stage: 'glazed', glaze: 'shino', seed: 111, wave: 0.04, drip: 0.03 }, 0.85, TOP, cz + 0.36);
  // tools: sponge, ribs, needle, wire, loop tools, water bucket, spray bottle
  vbox([0.85, 0.72, 0.3], 0.05, 0.09, 0.035, 0.06, -0.28, TOP + 0.017, cz + 0.42, 0.4);
  const rib = (x, z, a, c, metal) => { const s = new THREE.Shape(); s.absellipse(0, 0, 0.055, 0.032, 0, Math.PI * 2); const h = new THREE.Path(); if (!metal) { h.absellipse(0.018, 0, 0.012, 0.008, 0, Math.PI * 2); s.holes.push(h); } const g = new THREE.ExtrudeGeometry(s, { depth: metal ? 0.0015 : 0.005, bevelEnabled: false, curveSegments: 16 }); g.rotateX(-Math.PI / 2); vput(xf(paint(g, c, metal ? 0.8 : 0.1), x, TOP + 0.002, z, a)); };
  rib(-0.4, cz + 0.45, 0.3, [0.58, 0.42, 0.26]); rib(-0.33, cz + 0.32, 1.2, [0.7, 0.72, 0.74], true); rib(0.45, cz + 0.42, 2.5, [0.18, 0.4, 0.55]);
  vcyl([0.7, 0.7, 0.72], 0.8, 0.0012, 0.0012, 0.12, 5, 0.02, TOP + 0.005, cz + 0.48, 0, Math.PI / 2, 0.8); vcyl([0.55, 0.38, 0.22], 0.2, 0.006, 0.006, 0.07, 8, -0.04, TOP + 0.006, cz + 0.51, 0, Math.PI / 2, 0.8);
  // wire cutter with toggles
  vcyl([0.55, 0.38, 0.22], 0.2, 0.009, 0.009, 0.06, 8, -1.15, TOP + 0.009, cz + 0.5, 0, Math.PI / 2, 0);
  vcyl([0.55, 0.38, 0.22], 0.2, 0.009, 0.009, 0.06, 8, -0.8, TOP + 0.009, cz + 0.52, 0, Math.PI / 2, 0.2);
  vcyl([0.75, 0.75, 0.78], 0.8, 0.0008, 0.0008, 0.32, 4, -0.97, TOP + 0.009, cz + 0.52, 0, Math.PI / 2, 0.1);
  // tool tin with loop tools
  vcyl([0.55, 0.57, 0.6], 0.55, 0.045, 0.045, 0.12, 20, 0.95, TOP + 0.06, cz - 0.05);
  for (let i = 0; i < 6; i++) { const a = i * 1.05; vcyl([0.55 - i * 0.03, 0.38, 0.22], 0.2, 0.006, 0.006, 0.2, 6, 0.95 + Math.cos(a) * 0.02, TOP + 0.16, cz - 0.05 + Math.sin(a) * 0.02, Math.cos(a) * 0.15, Math.sin(a) * 0.15); }
  // water bucket + slip
  vput(xf(paint(new THREE.CylinderGeometry(0.1, 0.085, 0.13, 26, 1, true), [0.62, 0.64, 0.66], 0.6), 1.12, TOP + 0.065, cz + 0.4));
  vput(xf(paint(new THREE.TorusGeometry(0.1, 0.005, 6, 26), [0.66, 0.68, 0.7], 0.6), 1.12, TOP + 0.13, cz + 0.4, 0, Math.PI / 2));
  vcyl([0.6, 0.62, 0.64], 0.5, 0.085, 0.085, 0.004, 26, 1.12, TOP + 0.002, cz + 0.4);
  vcyl([0.42, 0.36, 0.3], 0.95, 0.094, 0.094, 0.003, 26, 1.12, TOP + 0.09, cz + 0.4);
  // under-shelf: bats and a covered bucket and clay bag
  for (let i = 0; i < 5; i++) vcyl([0.62, 0.5, 0.36], 0.1, 0.16, 0.16, 0.014, 26, -0.8 + (i % 2) * 0.01, 0.245 + i * 0.016, cz);
  vcyl([0.25, 0.32, 0.35], 0.4, 0.15, 0.13, 0.32, 24, 0.0, 0.4, cz + 0.1);
  vbox([0.35, 0.4, 0.42], 0.55, 0.36, 0.13, 0.25, 0.7, 0.3, cz - 0.1, 0.3);
}

// ---- pendant lamps over the bench
for (const x of [-0.7, 0.7]) {
  const g = new THREE.CylinderGeometry(0.06, 0.24, 0.18, 28, 1, true); vput(xf(paint(g, [0.18, 0.3, 0.26], 0.6), x, 2.55, 1.5));
  vcyl([0.15, 0.15, 0.15], 0.2, 0.004, 0.004, 0.66, 5, x, 2.98, 1.5);
  vput(xf(paint(new THREE.SphereGeometry(0.05, 12, 8), [1, 0.97, 0.9], 0.9), x, 2.5, 1.5));
}

// ---- west wall pottery shelves (finished ware)
for (const [zc, seed] of [[-2.1, 1], [0, 2], [2.1, 3]]) {
  const x0 = -5, d = 0.46, W = 2.0;
  for (const dz of [-W / 2 + 0.03, 0, W / 2 - 0.03]) for (const dx of [0.03, d - 0.03]) box(mats.darkWood, 0.045, 2.15, 0.045, x0 + dx, 1.075, zc + dz);
  const levels = [0.1, 0.52, 0.94, 1.36, 1.78, 2.13];
  levels.forEach((y, li) => {
    box(mats.shelfWood, d, 0.028, W, x0 + d / 2, y, zc);
    if (li < 5) {
      const opts = { back: [-1, 0], series: true };
      if (seed === 3 && li >= 3) opts.shapes = ['bowl', 'teabowl', 'plate', 'deepbowl'];
      if (seed === 1 && li === 0) opts.shapes = ['jar', 'moon', 'vase'];
      fillShelf(x0 + d / 2, zc - W / 2 + 0.06, x0 + d / 2, zc - 0.05, y + 0.014, d, li === 0 ? 0.38 : 0.36, seed * 100 + li, opts);
      fillShelf(x0 + d / 2, zc + 0.05, x0 + d / 2, zc + W / 2 - 0.06, y + 0.014, d, li === 0 ? 0.38 : 0.36, seed * 100 + li + 50, opts);
    }
  });
  solid(x0, zc - W / 2, x0 + d, zc + W / 2);
}
// ---- north wall bisque / greenware shelves
for (const [xc, seed, stage] of [[-3.6, 11, 'bisque'], [-1.95, 12, 'dry']]) {
  const z0 = -4, d = 0.42, W = 1.6;
  for (const dx of [-W / 2 + 0.03, W / 2 - 0.03]) for (const dz of [0.03, d - 0.03]) box(mats.darkWood, 0.045, 1.9, 0.045, xc + dx, 0.95, z0 + dz);
  [0.12, 0.55, 0.98, 1.41, 1.86].forEach((y, li) => {
    box(mats.shelfWood, W, 0.028, d, xc, y, z0 + d / 2);
    if (li < 4) fillShelf(xc - W / 2 + 0.05, z0 + d / 2, xc + W / 2 - 0.05, z0 + d / 2, y + 0.014, d, 0.36, seed * 100 + li, { back: [0, -1], stage: li === 3 && stage === 'dry' ? 'leather' : stage, clay: stage === 'bisque' ? undefined : 'buff', flip: 0.3 });
  });
  solid(xc - W / 2, z0, xc + W / 2, z0 + d);
}
// ---- wedging table
{
  const x = 0.75, z = -3.62;
  box(mats.darkWood, 1.5, 0.1, 0.7, x, 0.74, z); for (const sx of [-1, 1]) for (const sz of [-1, 1]) box(mats.darkWood, 0.12, 0.7, 0.12, x + sx * 0.66, 0.35, z + sz * 0.26);
  box(mats.canvas, 1.46, 0.02, 0.66, x, 0.8, z);
  box(mats.darkWood, 0.04, 0.5, 0.04, x - 0.7, 1.05, z - 0.3); box(mats.darkWood, 0.04, 0.5, 0.04, x - 0.7, 1.05, z + 0.3);
  vcyl([0.7, 0.7, 0.72], 0.8, 0.001, 0.001, 0.6, 4, x - 0.7, 1.28, z, Math.PI / 2);
  vput(xf(lump(0.15, 0.09, 0.11, [0.5, 0.42, 0.35], 0.3, 21), x + 0.2, 0.81, z + 0.02, 0.5));
  vput(xf(lump(0.1, 0.07, 0.08, [0.55, 0.32, 0.22], 0.3, 22), x - 0.25, 0.81, z - 0.05));
  solid(x - 0.75, z - 0.37, x + 0.75, z + 0.35);
}
// ---- clay bag stacks
{
  const r = rng(31);
  for (let i = 0; i < 4; i++) for (let k = 0; k < 4 - (i % 2); k++) {
    const blue = r() < 0.5;
    vbox(blue ? [0.42, 0.5, 0.58] : [0.75, 0.74, 0.7], 0.55, 0.36, 0.13, 0.26, 2.2 + i * 0.4 + (r() - 0.5) * 0.03, 0.07 + k * 0.13, -3.7 + (r() - 0.5) * 0.04, (r() - 0.5) * 0.12);
  }
  box(mats.wood, 1.7, 0.1, 0.7, 2.75, -0.0, -3.7);
  solid(1.95, -4, 3.75, -3.38);
}
// ---- potter's wheel + stool + slop bucket
{
  const x = 3.3, z = 4.3;
  vbox([0.32, 0.36, 0.4], 0.5, 0.5, 0.42, 0.62, x, 0.21, z, 0, 0, 0, 0.03);
  vput(xf(paint(new THREE.CylinderGeometry(0.34, 0.3, 0.13, 36, 1, true), [0.3, 0.33, 0.36], 0.5), x, 0.49, z));
  vput(xf(paint(new THREE.CylinderGeometry(0.3, 0.3, 0.02, 36), [0.48, 0.42, 0.37], 0.3), x, 0.43, z));
  vcyl([0.5, 0.5, 0.52], 0.75, 0.16, 0.16, 0.025, 36, x, 0.53, z);
  addVessel({ shape: 'vase', R: 0.08, H: 0.24, clay: 'red', stage: 'wet', seed: 201, wob: 0.6 }, x, 0.545, z);
  vbox([0.2, 0.2, 0.22], 0.4, 0.1, 0.03, 0.25, x + 0.15, 0.04, z + 0.5, 0.4); // pedal
  // stool
  vcyl([0.5, 0.36, 0.22], 0.3, 0.17, 0.17, 0.04, 24, x, 0.5, z + 0.62);
  for (let i = 0; i < 3; i++) { const a = i * 2.09; vcyl([0.4, 0.28, 0.18], 0.2, 0.018, 0.022, 0.5, 8, x + Math.cos(a) * 0.12, 0.24, z + 0.62 + Math.sin(a) * 0.12, Math.sin(a) * 0.2, -Math.cos(a) * 0.2); }
  vcyl([0.2, 0.3, 0.45], 0.4, 0.14, 0.12, 0.3, 24, x + 0.55, 0.15, z - 0.1);
  vcyl([0.45, 0.38, 0.32], 0.55, 0.135, 0.135, 0.01, 24, x + 0.55, 0.28, z - 0.1);
  // side tool table
  box(mats.darkWood, 0.5, 0.04, 0.4, x - 0.62, 0.6, z - 0.05); for (const sx of [-1, 1]) for (const sz of [-1, 1]) box(mats.darkWood, 0.04, 0.58, 0.04, x - 0.62 + sx * 0.21, 0.29, z - 0.05 + sz * 0.16);
  vbox([0.85, 0.72, 0.3], 0.05, 0.1, 0.04, 0.07, x - 0.6, 0.64, z);
  vcyl([0.35, 0.5, 0.6], 0.35, 0.08, 0.07, 0.12, 20, x - 0.7, 0.68, z - 0.1);
  solid(x - 0.9, z - 0.35, x + 0.72, z + 0.82);
}
// ---- signs of use: slip splashes round the wheel, broom, door-leaf collision
{
  const r = rng(707);
  for (let i = 0; i < 30; i++) { const a = r() * 6.28, d = 0.45 + r() * 0.7; vcyl([0.5 + r() * 0.08, 0.42, 0.35], 0.25, 0.01 + r() * 0.05, 0.01 + r() * 0.05, 0.0015, 10, 3.3 + Math.cos(a) * d, 0.001, 4.3 + Math.sin(a) * d * 0.8); }
  for (let i = 0; i < 14; i++) vcyl([0.62, 0.55, 0.47], 0.05, 0.02 + r() * 0.06, 0.02 + r() * 0.06, 0.0012, 10, 0.75 + (r() - 0.5) * 1.6, 0.001, -2.95 + r() * 0.4);
  vcyl([0.55, 0.4, 0.25], 0.2, 0.014, 0.014, 1.35, 8, 4.1, 0.68, -3.88, 0.18, 0, 0);
  vbox([0.55, 0.45, 0.3], 0.05, 0.3, 0.06, 0.06, 4.1, 0.05, -3.76, 0, 0.18);
  vbox([0.4, 0.3, 0.18], 0.05, 0.28, 0.1, 0.05, 4.1, 0.1, -3.76, 0, 0.18);
  solid(3.9, -4, 4.3, -3.6);
  solid(5.25, 3.8, 5.42, 4.98);
}
// ---- chalkboard firing log above wedging table, tool rail by the wheel, aprons by the door
{
  mats.chalk = new THREE.MeshStandardMaterial({ map: T.chalkTex(), roughness: 0.95 }); mats.chalk.userData.ws = [1, 1];
  box(mats.darkWood, 1.0, 0.68, 0.03, 0.75, 1.75, -3.975);
  plane(mats.chalk, 0.92, 0.6, 0.75, 1.75, -3.958);
  // tool rail on south wall east of window
  box(mats.darkWood, 1.2, 0.08, 0.03, 3.95, 1.55, 5.97);
  const tr = rng(808);
  for (let i = 0; i < 9; i++) {
    const x = 3.45 + i * 0.12;
    vcyl([0.2, 0.2, 0.2], 0.5, 0.004, 0.004, 0.05, 5, x, 1.56, 5.94, Math.PI / 2);
    const kind = i % 3;
    if (kind === 0) vbox([0.58, 0.42, 0.26], 0.1, 0.05, 0.11, 0.006, x, 1.48, 5.945, 0, 0, (tr() - 0.5) * 0.2);
    else if (kind === 1) { vcyl([0.55, 0.38, 0.22], 0.2, 0.007, 0.007, 0.13, 6, x, 1.46, 5.94); vput(xf(paint(new THREE.TorusGeometry(0.018, 0.0015, 4, 12), [0.7, 0.7, 0.72], 0.8), x, 1.37, 5.94)); }
    else vbox([0.7, 0.72, 0.74], 0.8, 0.08, 0.05, 0.002, x, 1.5, 5.945);
  }
  // aprons hanging on hooks
  for (const [x, c] of [[1.06, [0.42, 0.36, 0.3]], [1.34, [0.28, 0.32, 0.36]]]) {
    vcyl([0.2, 0.2, 0.2], 0.5, 0.006, 0.006, 0.08, 6, x, 1.75, 5.94, Math.PI / 2);
    const g = new THREE.BoxGeometry(0.34, 0.85, 0.02, 4, 8, 1);
    const p = g.attributes.position;
    for (let i = 0; i < p.count; i++) { const y = p.getY(i), xx = p.getX(i); p.setXYZ(i, xx * (0.6 + 0.4 * (0.425 - y) / 0.85), y, p.getZ(i) - 0.02 * Math.sin(xx * 12 + y * 5) - 0.03 * (0.425 - y)); }
    g.computeVertexNormals();
    const dusty = c.map((v) => v + 0.1);
    vput(xf(paint(g, dusty, 0.02, 0.15, x * 10), x, 1.33, 5.95));
  }
}
// ---- drying rack with ware boards (south wall, west of door)
{
  const x0 = -4.4, x1 = -2.2, z0 = 5.35, z1 = 5.95;
  for (const x of [x0, (x0 + x1) / 2, x1]) for (const z of [z0, z1]) box(mats.darkWood, 0.045, 1.8, 0.045, x, 0.9, z);
  const r = rng(41);
  [0.35, 0.8, 1.25, 1.7].forEach((y, li) => {
    for (const z of [z0, z1]) box(mats.darkWood, x1 - x0, 0.03, 0.03, (x0 + x1) / 2, y - 0.03, z);
    for (const half of [0, 1]) {
      const xa = x0 + 0.05 + half * (x1 - x0) / 2, xb = xa + (x1 - x0) / 2 - 0.1;
      box(mats.shelfWood, xb - xa, 0.02, 0.58, (xa + xb) / 2, y - 0.005, (z0 + z1) / 2);
      let x = xa + 0.08;
      const stage = li < 2 ? 'leather' : 'dry', clay = ['buff', 'red', 'porcelain', 'speckled'][(li + half) % 4];
      const base = randomVessel(r, { maxH: 0.3, maxR: 0.12, stage, clay, shapes: ['bowl', 'mug', 'cylinder', 'teabowl', 'jar'] });
      while (x < xb - 0.08) {
        const v = Object.assign({}, base, { seed: Math.floor(r() * 1e9) });
        if (x + v.R * 2 > xb) break;
        addVessel(v, x + v.R, y + 0.005, (z0 + z1) / 2 + (r() - 0.5) * 0.15, r() * 6, v.shape === 'bowl' && r() < 0.5);
        x += v.R * 2 + 0.03 + (v.handle ? 0.03 : 0);
      }
    }
  });
  solid(x0 - 0.05, z0 - 0.05, x1 + 0.05, z1 + 0.3);
}

// ================================================================= GLAZING AREA (x 5.25..10.5, z -4..0.8)
box(mats.concrete, 5.5, 0.1, 5.05, 8.0, -0.05, -1.725);
wall('x', -4.25, -4, 5.25, 10.75, 3.35, [], mats.brick);
wall('z', 10.5, 10.75, -4.25, 0.8, 3.35, [{ a: -1.0, b: 0.1, y0: 1.2, y1: 2.2 }], mats.brick);
windowFrame('z', 10.62, -1.0, 0.1, 1.2, 2.2, 0.25, 1);
{
  // lean-to roof
  const zN = -4.25, zS = 1.25, yN = 3.45, yS = 2.85, L = Math.hypot(zS - zN, yN - yS), ph = Math.atan((yN - yS) / (zS - zN));
  box(mats.corr, 5.7, 0.03, L, 8.0, (yN + yS) / 2 + 0.05, (zN + zS) / 2, 0, ph);
  for (let x = 5.5; x <= 10.6; x += 1.0) box(mats.wood, 0.07, 0.16, L, x, (yN + yS) / 2 - 0.06, (zN + zS) / 2, 0, ph);
  box(mats.darkWood, 5.6, 0.2, 0.15, 8.0, 2.72, 0.9);
  for (const x of [6.0, 8.2, 10.4]) { box(mats.darkWood, 0.14, 2.62, 0.14, x, 1.31, 0.9); solid(x - 0.07, 0.83, x + 0.07, 0.97); box(mats.darkWood, 0.08, 0.08, 0.7, x, 2.4, 0.62, 0, 0.8); }
}
// glazing prep bench along north wall
{
  const x0 = 5.9, x1 = 9.8, z0 = -4.0, z1 = -3.25, TOP = 0.9, cx = (x0 + x1) / 2, cz = (z0 + z1) / 2;
  box(mats.zinc, x1 - x0, 0.04, z1 - z0, cx, TOP - 0.02, cz);
  box(mats.darkWood, x1 - x0, 0.06, 0.04, cx, TOP - 0.07, z1 - 0.02);
  for (const x of [x0 + 0.06, cx, x1 - 0.06]) for (const z of [z0 + 0.06, z1 - 0.06]) box(mats.darkWood, 0.07, TOP - 0.04, 0.07, x, (TOP - 0.04) / 2, z);
  box(mats.shelfWood, x1 - x0 - 0.1, 0.025, z1 - z0 - 0.1, cx, 0.18, cz);
  solid(x0, z0, x1, z1);
  // wall shelves with material jars
  const pr = rng(51);
  const powders = [[0.93, 0.92, 0.9], [0.95, 0.94, 0.92], [0.55, 0.22, 0.12], [0.15, 0.13, 0.12], [0.2, 0.28, 0.6], [0.35, 0.5, 0.3], [0.85, 0.8, 0.6], [0.88, 0.86, 0.82], [0.62, 0.6, 0.58]];
  for (const y of [1.45, 1.85]) {
    box(mats.shelfWood, x1 - x0 - 0.2, 0.028, 0.3, cx, y, -3.85);
    for (const x of [x0 + 0.3, cx, x1 - 0.3]) box(mats.darkWood, 0.03, 0.18, 0.25, x, y - 0.1, -3.88);
    let x = x0 + 0.2;
    while (x < x1 - 0.25) {
      const rr = 0.045 + pr() * 0.03, h = 0.12 + pr() * 0.1, pc = powders[Math.floor(pr() * powders.length)];
      const fill = 0.4 + pr() * 0.5;
      vcyl(pc.map((v) => v * 0.8 + 0.08), 0.85, rr, rr, h * fill, 18, x + rr, y + 0.014 + h * fill / 2, -3.84);
      vput(xf(paint(new THREE.CylinderGeometry(rr, rr, h * (1 - fill), 18, 1, true), [0.82, 0.88, 0.88], 0.95), x + rr, y + 0.014 + h * fill + h * (1 - fill) / 2, -3.84));
      vcyl(pr() < 0.5 ? [0.85, 0.3, 0.15] : [0.2, 0.2, 0.22], 0.4, rr * 1.02, rr * 1.02, 0.025, 18, x + rr, y + 0.014 + h + 0.012, -3.84);
      x += rr * 2 + 0.03 + pr() * 0.04;
    }
  }
  plane(mats.label, 0.75, 0.375, 9.35, 2.45, -3.985);
  // on bench: scale, sieve, jug, bisque awaiting, dipped pots drying on ware board, brushes
  vbox([0.22, 0.22, 0.24], 0.4, 0.3, 0.05, 0.28, 6.3, TOP + 0.025, -3.6);
  vbox([0.75, 0.76, 0.78], 0.85, 0.26, 0.008, 0.24, 6.3, TOP + 0.054, -3.6);
  vbox([0.05, 0.15, 0.08], 0.9, 0.06, 0.02, 0.005, 6.3, TOP + 0.03, -3.45, 0, 0.3);
  vput(xf(paint(new THREE.CylinderGeometry(0.17, 0.17, 0.08, 32, 1, true), [0.62, 0.48, 0.3], 0.15), 6.9, TOP + 0.04, -3.62));
  vcyl([0.3, 0.32, 0.3], 0.3, 0.165, 0.165, 0.004, 32, 6.9, TOP + 0.03, -3.62);
  vput(xf(paint(new THREE.CylinderGeometry(0.06, 0.075, 0.18, 24, 1, true), [0.85, 0.88, 0.9], 0.6), 7.35, TOP + 0.09, -3.55));
  box(mats.shelfWood, 1.2, 0.02, 0.4, 8.3, TOP + 0.01, -3.62);
  const gr = rng(61);
  const dipped = ['celadon', 'tenmoku', 'shino', 'cobalt', 'ash', 'turq'];
  for (let i = 0; i < 6; i++) {
    const v = randomVessel(gr, { maxH: 0.22, maxR: 0.08, stage: i < 3 ? 'raw' : 'bisque', glaze: dipped[i], shapes: ['bowl', 'mug', 'cylinder', 'teabowl', 'jar'] });
    addVessel(v, 7.85 + i * 0.18, TOP + 0.02, -3.62 + (i % 2) * 0.12 - 0.05, gr() * 6);
  }
  // banding wheel with pot being glazed + brushes
  vcyl([0.25, 0.25, 0.27], 0.35, 0.11, 0.13, 0.03, 30, 9.3, TOP + 0.015, -3.55);
  addVessel({ shape: 'bottle', R: 0.07, H: 0.24, clay: 'speckled', stage: 'raw', glaze: 'copper', seed: 301 }, 9.3, TOP + 0.03, -3.55);
  vcyl([0.7, 0.6, 0.45], 0.5, 0.04, 0.04, 0.1, 16, 9.6, TOP + 0.05, -3.8);
  for (let i = 0; i < 5; i++) vcyl([0.6, 0.45, 0.28], 0.3, 0.004, 0.004, 0.22, 6, 9.6 + (i - 2) * 0.012, TOP + 0.15, -3.8, (i - 2) * 0.08, 0);
  // buckets of glaze under and in front of bench
  const glz = ['celadon', 'tenmoku', 'shino', 'white', 'cobalt', 'ash', 'turq', 'copper'];
  const bucket = (x, z, gk, open, lidSeed) => {
    vput(xf(paint(new THREE.CylinderGeometry(0.15, 0.13, 0.36, 28, 1, true), [0.88, 0.88, 0.85], 0.45, 0.04, lidSeed), x, 0.18, z));
    vcyl([0.8, 0.8, 0.78], 0.4, 0.13, 0.13, 0.01, 28, x, 0.005, z);
    vput(xf(paint(new THREE.TorusGeometry(0.15, 0.008, 6, 28), [0.86, 0.86, 0.83], 0.5), x, 0.36, z, 0, Math.PI / 2));
    if (open) {
      const c = GLAZES[gk].c.map((v) => v * 0.45 + 0.5);
      vcyl(c, 0.55, 0.145, 0.145, 0.006, 28, x, 0.31, z);
      vput(xf(paint(new THREE.TorusGeometry(0.12, 0.004, 4, 20, Math.PI), [0.45, 0.45, 0.47], 0.6), x, 0.36, z + 0.0, 0.4)); // handle
    } else {
      vcyl([0.9, 0.9, 0.88], 0.45, 0.16, 0.16, 0.025, 28, x, 0.372, z);
      vbox(GLAZES[gk].c, 0.2, 0.08, 0.03, 0.002, x, 0.2, z + 0.142);
    }
  };
  glz.slice(0, 4).forEach((g, i) => bucket(6.3 + i * 0.75, -3.62, g, false, i));
  bucket(6.4, -2.85, 'celadon', true, 9); bucket(6.82, -2.75, 'tenmoku', true, 10); bucket(7.25, -2.9, 'shino', true, 11);
  solid(6.2, -3.05, 7.45, -2.55);
  // dipping tongs resting on bucket
  vcyl([0.5, 0.5, 0.52], 0.8, 0.006, 0.006, 0.38, 6, 6.82, 0.42, -2.75, 0.3, 0.9, 0.3);
  // drip sponge stains on floor (glaze splashes)
  const sr = rng(71);
  for (let i = 0; i < 18; i++) { const g = GLAZES[glz[Math.floor(sr() * glz.length)]].c; vcyl(g.map((v) => v * 0.5 + 0.4), 0.3, 0.01 + sr() * 0.03, 0.01 + sr() * 0.03, 0.001, 10, 6.2 + sr() * 1.6, 0.001, -3.0 + sr() * 0.5); }
}
// test-tile board on east wall + material sacks + spray booth
{
  box(mats.wood, 0.03, 1.0, 2.2, 10.48, 1.65, -2.55);
  const tr = rng(81), gk = Object.keys(GLAZES);
  for (let row = 0; row < 6; row++) for (let i = 0; i < 16; i++) {
    const g = GLAZES[gk[(row * 3 + i) % gk.length]];
    const z = -3.55 + i * 0.125, y = 1.25 + row * 0.15;
    const lit = (row + i) % 3;
    vcyl([0.1, 0.1, 0.1], 0.5, 0.003, 0.003, 0.02, 4, 10.455, y + 0.05, z, 0, Math.PI / 2);
    // L-shaped tile: upper glazed, lower raw clay
    const c = g.c.map((v) => v * (0.85 + tr() * 0.3));
    const clay = [[0.82, 0.72, 0.6], [0.6, 0.33, 0.22], [0.9, 0.89, 0.86]][lit];
    vbox(c, g.m ?? 1, 0.01, 0.07, 0.05, 10.44, y + 0.02, z, 0, 0, 0, 0.1);
    vbox(clay, 0, 0.012, 0.03, 0.052, 10.44, y - 0.03, z, 0, 0, 0, 0.05);
    vbox(c.map((v) => v * 0.8), g.m ?? 1, 0.007, 0.012, 0.052, 10.437, y - 0.008, z, 0, 0, 0, 0.1);
  }
  plane(mats.label, 0.5, 0.25, 10.47, 2.35, -1.7, -Math.PI / 2);
  // sacks on pallet
  box(mats.wood, 0.8, 0.12, 0.6, 5.75, 0.06, -3.6);
  const sr = rng(91);
  for (let i = 0; i < 3; i++) vput(xf(lump(0.3, 0.09, 0.22, [0.78, 0.74, 0.66], 0.05, 900 + i, 2), 5.75 + (sr() - 0.5) * 0.06, 0.12 + i * 0.13, -3.6, sr() * 0.3));
  solid(5.3, -4, 6.2, -3.25);
  // spray booth
  vbox([0.62, 0.66, 0.66], 0.4, 0.7, 0.03, 0.9, 10.12, 0.885, -1.6, 0, 0, 0, 0.02);
  vbox([0.62, 0.66, 0.66], 0.4, 0.7, 0.03, 0.9, 10.12, 1.8, -1.6, 0, 0, 0, 0.02);
  vbox([0.55, 0.6, 0.62], 0.4, 0.03, 0.9, 0.9, 10.46, 1.35, -1.6, 0, 0, 0, 0.02);
  for (const s of [-1, 1]) vbox([0.6, 0.64, 0.64], 0.4, 0.7, 0.9, 0.03, 10.12, 1.35, -1.6 + s * 0.45);
  vbox([0.5, 0.7, 0.75], 0.2, 0.004, 0.5, 0.5, 10.44, 1.38, -1.6, 0, 0, 0, 0.3);
  vcyl([0.3, 0.3, 0.32], 0.3, 0.2, 0.2, 0.02, 28, 10.43, 1.38, -1.6, 0, Math.PI / 2);
  box(mats.darkWood, 0.7, 0.85, 0.95, 10.12, 0.43, -1.6);
  vcyl([0.42, 0.24, 0.2], 0.6, 0.15, 0.15, 0.003, 24, 10.15, 0.92, -1.6);
  solid(9.75, -2.1, 10.5, -1.1);
}

// ================================================================= COURTYARD (x 5.25..15.5, z 0.8..11.5)
box(mats.pavers, 10.25, 0.1, 10.95, 10.375, -0.05, 6.275);
plane(mats.gravel, 4.4, 4.0, 12.5, 0.004, 6.4, 0, -Math.PI / 2);
const CW = 2.4;
wall('z', 15.5, 15.75, 0.55, 11.75, CW, [], mats.brick);
wall('x', 11.5, 11.75, 5.0, 15.75, CW, [], mats.brick);
wall('z', 5.0, 5.25, 6.25, 11.5, CW, [], mats.brick);
wall('x', 0.55, 0.8, 10.75, 15.5, CW, [], mats.brick);
for (const [w, d, x, z] of [[0.36, 11.3, 15.625, 6.15], [10.85, 0.36, 10.375, 11.625], [0.36, 5.4, 5.125, 8.9], [5.1, 0.36, 13.15, 0.675]]) box(mats.concrete, w, 0.08, d, x, CW + 0.04, z);
// ---- the kiln (door faces west)
{
  const X0 = 11.1, X1 = 13.3, Z0 = 5.2, Z1 = 7.6, ZC = 6.4, BASE = 0.5, SPR = 2.0, T = 0.4;
  box(mats.concrete, 2.55, 0.15, 2.85, 12.2, 0.075, 6.4);
  box(mats.kilnBrick, X1 - X0, BASE - 0.15, Z1 - Z0, 12.2, (BASE + 0.15) / 2, ZC);
  // walls
  box(mats.kilnBrick, T, SPR - BASE, Z1 - Z0, X1 - T / 2, (SPR + BASE) / 2, ZC);
  box(mats.kilnBrick, X1 - X0 - T, SPR - BASE, T, 12.2 - T / 2 + T / 2, (SPR + BASE) / 2, Z0 + T / 2);
  box(mats.kilnBrick, X1 - X0 - T, SPR - BASE, T, 12.2, (SPR + BASE) / 2, Z1 - T / 2);
  const DZ0 = 5.95, DZ1 = 6.85, DY0 = 0.62, DY1 = 1.72;
  box(mats.kilnBrick, T, SPR - BASE, DZ0 - (Z0 + T), X0 + T / 2, (SPR + BASE) / 2, (DZ0 + Z0 + T) / 2);
  box(mats.kilnBrick, T, SPR - BASE, (Z1 - T) - DZ1, X0 + T / 2, (SPR + BASE) / 2, (DZ1 + Z1 - T) / 2);
  box(mats.kilnBrick, T, SPR - DY1, DZ1 - DZ0, X0 + T / 2, (SPR + DY1) / 2, ZC);
  box(mats.kilnBrick, T, DY0 - BASE, DZ1 - DZ0, X0 + T / 2, (DY0 + BASE) / 2, ZC);
  // firebrick interior lining
  const IX0 = X0 + T, IX1 = X1 - T, IZ0 = Z0 + T, IZ1 = Z1 - T;
  box(mats.fireBrick, IX1 - IX0, 0.02, IZ1 - IZ0, (IX0 + IX1) / 2, BASE + 0.01, ZC);
  box(mats.fireBrick, 0.02, SPR - BASE, IZ1 - IZ0, IX1 - 0.01, (SPR + BASE) / 2, ZC);
  box(mats.fireBrick, IX1 - IX0, SPR - BASE, 0.02, (IX0 + IX1) / 2, (SPR + BASE) / 2, IZ0 + 0.01);
  box(mats.fireBrick, IX1 - IX0, SPR - BASE, 0.02, (IX0 + IX1) / 2, (SPR + BASE) / 2, IZ1 - 0.01);
  // door reveal (firebrick)
  box(mats.fireBrick, T + 0.005, DY1 - DY0, 0.015, X0 + T / 2, (DY0 + DY1) / 2, DZ0 + 0.007);
  box(mats.fireBrick, T + 0.005, DY1 - DY0, 0.015, X0 + T / 2, (DY0 + DY1) / 2, DZ1 - 0.007);
  box(mats.fireBrick, T + 0.005, 0.015, DZ1 - DZ0, X0 + T / 2, DY1 - 0.007, ZC);
  // arch (barrel vault spanning z, running along x)
  const half = (Z1 - Z0) / 2, rise = 0.6, ih = half - T, irise = 0.42;
  const arch = new THREE.Shape(); arch.absellipse(0, 0, half, rise, 0, Math.PI, false);
  arch.lineTo(-ih, 0); arch.absellipse(0, 0, ih, irise, Math.PI, 0, true); arch.lineTo(half, 0);
  const ag = new THREE.ExtrudeGeometry(arch, { depth: X1 - X0, bevelEnabled: false, curveSegments: 24 });
  ag.rotateY(Math.PI / 2); xf(ag, X0, SPR, ZC); worldUV(ag, mats.kilnBrick.userData.ws); put(mats.kilnBrick, ag);
  const gable = new THREE.Shape(); gable.absellipse(0, 0, half, rise, 0, Math.PI, false); gable.lineTo(half, 0);
  for (const x of [X0, X1 - T]) { const gg = new THREE.ExtrudeGeometry(gable, { depth: T, bevelEnabled: false, curveSegments: 24 }); gg.rotateY(Math.PI / 2); xf(gg, x, SPR, ZC); worldUV(gg, mats.kilnBrick.userData.ws); put(mats.kilnBrick, gg); }
  const ia = new THREE.Shape(); ia.absellipse(0, 0, ih + 0.001, irise, 0, Math.PI, false); ia.lineTo(ih, 0);
  const iag = new THREE.ExtrudeGeometry(ia, { depth: IX1 - IX0, bevelEnabled: false, curveSegments: 20 });
  iag.scale(0.99, 0.99, 1); iag.rotateY(Math.PI / 2); xf(iag, IX0, SPR, ZC);
  { const n = iag.attributes.normal; for (let i = 0; i < n.count; i++) n.setXYZ(i, -n.getX(i), -n.getY(i), -n.getZ(i)); const idx = iag.index; if (!idx) { const p = iag.attributes.position; for (let i = 0; i < p.count; i += 3) { for (const at of ['position', 'normal', 'uv']) { const A = iag.attributes[at], s = A.itemSize; for (let c = 0; c < s; c++) { const t = A.array[(i + 1) * s + c]; A.array[(i + 1) * s + c] = A.array[(i + 2) * s + c]; A.array[(i + 2) * s + c] = t; } } } } }
  worldUV(iag, mats.fireBrick.userData.ws); put(mats.fireBrick, iag);
  // steel frame: corner angles, buckstays, tie rods, skewback angles
  const st = mats.steel;
  for (const x of [X0 - 0.02, X1 + 0.02]) for (const z of [Z0 - 0.02, Z1 + 0.02]) { box(st, 0.08, SPR + 0.25, 0.012, x, (SPR + 0.25) / 2 + 0.15, z + (z < ZC ? 0.03 : -0.03)); box(st, 0.012, SPR + 0.25, 0.08, x + (x < 12 ? 0.03 : -0.03), (SPR + 0.25) / 2 + 0.15, z); }
  for (const x of [11.75, 12.65]) for (const z of [Z0 - 0.04, Z1 + 0.04]) box(st, 0.1, 2.55, 0.05, x, 1.42, z);
  for (const z of [Z0 - 0.05, Z1 + 0.05]) { box(st, X1 - X0 + 0.1, 0.1, 0.03, 12.2, SPR + 0.02, z); box(st, X1 - X0 + 0.1, 0.08, 0.03, 12.2, 0.6, z); }
  for (const x of [X0 - 0.01, 11.75, 12.65, X1 + 0.01]) {
    const gz = new THREE.CylinderGeometry(0.011, 0.011, Z1 - Z0 + 0.4, 8); gz.rotateX(Math.PI / 2); xf(gz, x, SPR + rise + 0.18, ZC); put(st, gz);
    for (const z of [Z0 - 0.12, Z1 + 0.12]) cyl(st, 0.025, 0.025, 0.03, 6, x, SPR + rise + 0.18, z, Math.PI / 2);
  }
  for (const z of [Z0 - 0.04, Z1 + 0.04]) for (const x of [X0 - 0.01, X1 + 0.01]) box(st, 0.05, rise + 0.3, 0.04, x, SPR + (rise + 0.3) / 2, z);
  for (const z of [Z0 - 0.05, Z1 + 0.05]) for (const x of [11.75, 12.65]) box(st, 0.1, rise + 0.3, 0.05, x, SPR + (rise + 0.3) / 2, z);
  // door (open ~100deg on hinge at south jamb)
  const hinge = new THREE.Matrix4().compose(new THREE.Vector3(X0 - 0.03, 0, DZ1 + 0.12), new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 1.72, 0)), new THREE.Vector3(1, 1, 1));
  PARENT = hinge;
  const DW = 1.12, DH = 1.32, DT = 0.2, dy = (DY0 + DY1) / 2;
  box(mats.steel, DT * 0.3, DH, DW, -DT * 0.85, dy, -DW / 2);
  box(mats.fireBrick, DT * 0.72, DH - 0.24, DW - 0.24, -DT * 0.36, dy, -DW / 2);
  for (const zz of [-0.03, -DW + 0.03]) box(st, DT, DH, 0.05, -DT / 2, dy, zz);
  for (const yy of [dy - DH / 2 + 0.03, dy + DH / 2 - 0.03]) box(st, DT, 0.05, DW, -DT / 2, yy, -DW / 2);
  for (const yy of [dy - 0.35, dy + 0.35]) box(st, 0.03, 0.08, DW - 0.1, -DT - 0.02, yy, -DW / 2);
  vcyl([0.75, 0.66, 0.52], 0.05, 0.03, 0.035, 0.08, 12, -DT - 0.05, dy + 0.1, -DW / 2, 0, Math.PI / 2);
  vcyl([0.75, 0.66, 0.52], 0.05, 0.03, 0.035, 0.08, 12, -DT - 0.05, dy - 0.2, -DW / 2 - 0.2, 0, Math.PI / 2);
  box(st, 0.04, 0.05, 0.05, -DT - 0.04, dy, -DW + 0.08); cyl(st, 0.014, 0.014, 0.45, 8, -DT - 0.1, dy, -DW + 0.1, 0, 0, 0);
  box(st, 0.05, 0.03, 0.12, -DT - 0.12, dy + 0.22, -DW + 0.1);
  PARENT = null;
  for (const y of [DY0 + 0.2, DY1 - 0.2]) { cyl(st, 0.025, 0.025, 0.16, 10, X0 - 0.06, y, DZ1 + 0.12); box(st, 0.12, 0.06, 0.06, X0 - 0.01, y, DZ1 + 0.1); }
  box(st, 0.04, 0.08, 0.1, X0 - 0.02, (DY0 + DY1) / 2, DZ0 - 0.15);
  // spy-hole plugs in side walls and burner ports with gas burners
  for (const z of [Z0, Z1]) {
    const s = z === Z0 ? -1 : 1;
    for (const [x, y] of [[11.75 + 0.45, 1.65], [11.75 - 0.3, 1.1]]) vcyl([0.78, 0.7, 0.56], 0.05, 0.028, 0.032, 0.08, 12, x, y, z + s * 0.03, Math.PI / 2);
    for (const x of [11.65, 12.75]) {
      cyl(st, 0.04, 0.04, 0.42, 14, x, 0.68, z + s * 0.2, Math.PI / 2);
      cyl(st, 0.055, 0.055, 0.1, 14, x, 0.68, z + s * 0.38, Math.PI / 2);
      cyl(st, 0.012, 0.012, 0.3, 8, x, 0.53, z + s * 0.42);
      vbox([0.75, 0.12, 0.1], 0.5, 0.025, 0.012, 0.09, x + 0.04, 0.5, z + s * 0.46, 0.6);
    }
    const gp = new THREE.CylinderGeometry(0.014, 0.014, 1.5, 8); gp.rotateZ(Math.PI / 2); xf(gp, 12.2, 0.38, z + s * 0.42); put(st, gp);
  }
  // pyrometer box + thermocouple
  vbox([0.22, 0.24, 0.26], 0.35, 0.05, 0.22, 0.16, X0 - 0.03, 1.45, Z0 + 0.25);
  vcyl([0.92, 0.9, 0.85], 0.6, 0.055, 0.055, 0.01, 24, X0 - 0.058, 1.47, Z0 + 0.25, 0, Math.PI / 2);
  vbox([0.15, 0.12, 0.1], 0.3, 0.004, 0.05, 0.004, X0 - 0.064, 1.49, Z0 + 0.25, 0, 0, 0.7);
  cyl(st, 0.008, 0.008, 0.6, 6, 12.0, SPR + rise + 0.05, ZC - 0.3);
  // chimney
  const CX0 = 13.3, CX1 = 14.0, CZ0 = 6.05, CZ1 = 6.75, CH = 6.4;
  box(mats.kilnBrick, CX1 - CX0, CH - 0.15, CZ1 - CZ0, (CX0 + CX1) / 2, (CH + 0.15) / 2, (CZ0 + CZ1) / 2);
  box(mats.kilnBrick, CX1 - CX0 + 0.1, 0.15, CZ1 - CZ0 + 0.1, (CX0 + CX1) / 2, CH + 0.07, (CZ0 + CZ1) / 2);
  vbox([0.05, 0.04, 0.035], 0.1, 0.42, 0.02, 0.42, (CX0 + CX1) / 2, CH + 0.15, (CZ0 + CZ1) / 2);
  for (const y of [1.2, 2.6, 4.0, 5.4]) box(st, CX1 - CX0 + 0.03, 0.05, CZ1 - CZ0 + 0.03, (CX0 + CX1) / 2, y, (CZ0 + CZ1) / 2);
  box(st, 0.4, 0.02, 0.5, CX1 + 0.12, 1.65, (CZ0 + CZ1) / 2); box(st, 0.04, 0.12, 0.04, CX1 + 0.32, 1.65, (CZ0 + CZ1) / 2);
  // soot stains
  const soot = (w, h, x, y, z, ry) => plane(mats.soot, w, h, x, y, z, ry);
  soot(1.5, 1.0, X0 - 0.004, DY1 + 0.25, ZC, -Math.PI / 2);
  soot(1.0, 0.8, X0 - 0.004, SPR + 0.25, ZC, -Math.PI / 2);
  soot(0.7, 1.4, CX1 + 0.004, CH - 0.5, (CZ0 + CZ1) / 2, Math.PI / 2);
  soot(0.7, 1.4, (CX0 + CX1) / 2, CH - 0.5, CZ0 - 0.004, Math.PI);
  soot(0.7, 1.4, (CX0 + CX1) / 2, CH - 0.5, CZ1 + 0.004, 0);
  for (const z of [Z0 - 0.004, Z1 + 0.004]) for (const [x, y] of [[12.2, 1.65], [11.45, 1.1]]) soot(0.3, 0.35, x, y + 0.12, z, z < ZC ? Math.PI : 0);
  // kiln furniture and ware inside
  const kr = rng(171);
  for (const [lvl, y] of [[0, BASE + 0.03], [1, 0.95], [2, 1.38]]) {
    for (const zz of [IZ0 + 0.35, IZ1 - 0.35]) {
      if (lvl > 0) {
        vbox([0.36, 0.34, 0.33], 0.15, 0.62, 0.025, 0.62, (IX0 + IX1) / 2, y, zz, 0, 0, 0, 0.1);
        for (const [ox, oz] of [[-0.27, -0.27], [0.27, -0.27], [0, 0.27]]) vcyl([0.82, 0.76, 0.64], 0.05, 0.022, 0.022, 0.42, 8, (IX0 + IX1) / 2 + ox, y - 0.225, zz + oz);
      }
      const yy = y + (lvl > 0 ? 0.013 : 0);
      for (let k = 0; k < 3; k++) {
        const v = randomVessel(kr, { maxH: 0.3, maxR: 0.1, stage: lvl === 2 ? 'bisque' : 'raw', shapes: ['bowl', 'mug', 'cylinder', 'jar', 'vase', 'teabowl'] });
        addVessel(v, (IX0 + IX1) / 2 - 0.2 + k * 0.2, yy, zz + (kr() - 0.5) * 0.2, kr() * 6);
      }
    }
  }
  solid(10.9, 4.95, 14.1, 7.85);
  solid(10.0, 6.85, 11.1, 7.45); // open door
}
// ---- kiln shelves & posts stacked on pallet
{
  const x = 13.8, z = 9.9;
  box(mats.wood, 1.1, 0.12, 0.9, x, 0.06, z);
  const r = rng(181);
  for (let i = 0; i < 9; i++) vbox([0.38, 0.36, 0.35].map((v) => v + (r() - 0.5) * 0.05), 0.1, 0.6, 0.022, 0.6, x - 0.22 + (r() - 0.5) * 0.02, 0.135 + i * 0.024, z + (r() - 0.5) * 0.02, (r() - 0.5) * 0.04, 0, 0, 0.1);
  for (let i = 0; i < 14; i++) vcyl([0.84, 0.78, 0.66], 0.05, 0.025, 0.025, 0.08 + (i % 4) * 0.06, 8, x + 0.3 + (i % 4) * 0.06, 0.12 + (0.08 + (i % 4) * 0.06) / 2, z - 0.3 + Math.floor(i / 4) * 0.12);
  solid(x - 0.55, z - 0.45, x + 0.55, z + 0.45);
  // ware cart by the kiln door
  const cx = 9.6, cz = 5.0;
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) { box(mats.steel, 0.03, 1.0, 0.03, cx + sx * 0.4, 0.55, cz + sz * 0.3); vcyl([0.12, 0.12, 0.12], 0.2, 0.04, 0.04, 0.03, 12, cx + sx * 0.4, 0.04, cz + sz * 0.3, 0, Math.PI / 2); }
  const cr = rng(191);
  for (const y of [0.35, 0.72, 1.05]) {
    box(mats.shelfWood, 0.84, 0.025, 0.64, cx, y, cz);
    for (let k = 0; k < 4; k++) {
      const v = randomVessel(cr, { maxH: y > 1 ? 0.3 : 0.3, maxR: 0.09, stage: 'raw', shapes: ['bowl', 'mug', 'cylinder', 'jar', 'teabowl', 'bottle'] });
      addVessel(v, cx - 0.3 + k * 0.2, y + 0.013, cz + (cr() - 0.5) * 0.3, cr() * 6);
    }
  }
  solid(cx - 0.45, cz - 0.35, cx + 0.45, cz + 0.35);
}
// ---- wood stack under small lean-to along south wall
{
  const r = rng(201);
  for (let row = 0; row < 7; row++) for (let i = 0; i < 18; i++) {
    const rr = 0.06 + r() * 0.035, x = 6.1 + i * 0.2 + (row % 2) * 0.1 + (r() - 0.5) * 0.03, y = 0.12 + row * 0.16 + rr * 0.3;
    if (x > 9.7) continue;
    const g = new THREE.CylinderGeometry(rr, rr * 1.02, 0.55 + r() * 0.2, 9);
    g.rotateX(Math.PI / 2);
    const bark = [0.33 + r() * 0.08, 0.25 + r() * 0.05, 0.18 + r() * 0.04];
    paint(g, bark, 0.02, 0.1, i * 7 + row);
    // lighter end grain on caps
    const n = g.attributes.normal, c = g.attributes.color;
    for (let k = 0; k < n.count; k++) if (Math.abs(n.getZ(k)) > 0.9) c.setXYZ(k, Math.pow(0.66, 2.2), Math.pow(0.5, 2.2), Math.pow(0.33, 2.2));
    vput(xf(g, x, y, 11.1 + (r() - 0.5) * 0.06, (r() - 0.5) * 0.1));
  }
  for (const x of [5.9, 7.9, 9.9]) { box(mats.darkWood, 0.1, 1.9, 0.1, x, 0.95, 10.6); }
  box(mats.corr, 4.4, 0.03, 1.25, 7.9, 2.05, 11.05, 0, -0.2);
  box(mats.darkWood, 4.2, 0.12, 0.1, 7.9, 1.93, 10.6);
  solid(5.25, 10.5, 10.0, 11.5);
}
// ---- gas bottles, planters, water butt, bench, seconds crate
{
  for (const [x, z] of [[14.95, 2.0], [14.95, 2.55]]) {
    vcyl([0.86, 0.86, 0.84], 0.45, 0.16, 0.16, 1.0, 24, x, 0.55, z);
    vput(xf(paint(new THREE.SphereGeometry(0.16, 20, 10, 0, Math.PI * 2, 0, Math.PI / 2), [0.86, 0.86, 0.84], 0.45), x, 1.05, z));
    vcyl([0.3, 0.3, 0.3], 0.5, 0.07, 0.07, 0.12, 14, x, 1.22, z, 0, 0, 0);
    vcyl([0.7, 0.6, 0.15], 0.6, 0.03, 0.03, 0.06, 10, x, 1.32, z);
  }
  box(mats.steel, 0.05, 0.05, 1.2, 15.35, 1.0, 2.3);
  const hose = new THREE.TubeGeometry(new THREE.CatmullRomCurve3([new THREE.Vector3(14.95, 1.3, 2.3), new THREE.Vector3(14.6, 0.4, 3.0), new THREE.Vector3(14.0, 0.05, 4.0), new THREE.Vector3(12.9, 0.05, 4.6), new THREE.Vector3(12.2, 0.38, 4.78)]), 40, 0.013, 6);
  vput(paint(hose, [0.12, 0.12, 0.13], 0.3));
  solid(14.7, 1.75, 15.5, 2.8);
  const plant = (x, z, R, H, glaze, seed) => {
    addVessel({ shape: 'planter', R, H, clay: 'red', stage: 'glazed', glaze, seed, gLine: H * 0.3, rim: 'roll' }, x, 0, z);
    vcyl([0.25, 0.2, 0.15], 0, R * 0.9, R * 0.9, 0.01, 20, x, H - 0.05, z);
    const r = rng(seed);
    for (let i = 0; i < 7; i++) vput(xf(lump(0.18 + r() * 0.12, 0.2 + r() * 0.2, 0.18 + r() * 0.1, [0.22 + r() * 0.08, 0.36 + r() * 0.1, 0.16], 0.15, seed + i, 2), x + (r() - 0.5) * R, H - 0.05 + r() * 0.15, z + (r() - 0.5) * R, r() * 6));
    solid(x - R - 0.05, z - R - 0.05, x + R + 0.05, z + R + 0.05);
  };
  plant(5.75, 6.85, 0.27, 0.45, 'tenmoku', 501); plant(15.0, 11.0, 0.3, 0.5, 'celadon', 502); plant(15.05, 4.3, 0.22, 0.38, 'ash', 503);
  vcyl([0.15, 0.22, 0.3], 0.4, 0.3, 0.28, 0.85, 26, 14.0, 0.43, 11.0);
  vcyl([0.2, 0.25, 0.25], 0.95, 0.27, 0.27, 0.005, 26, 14.0, 0.8, 11.0);
  solid(13.65, 10.65, 14.35, 11.35);
  // timber bench along west courtyard wall
  box(mats.darkWood, 0.42, 0.06, 1.8, 5.55, 0.45, 9.0); for (const z of [8.25, 9.75]) box(mats.darkWood, 0.36, 0.42, 0.08, 5.55, 0.21, z);
  addVessel({ shape: 'mug', R: 0.045, H: 0.1, clay: 'dark', stage: 'glazed', glaze: 'shino', seed: 777, handle: true }, 5.5, 0.48, 9.4, 0.8);
  solid(5.25, 8.1, 5.8, 9.9);
  // seconds crate with cracked/runny pieces
  box(mats.wood, 0.7, 0.35, 0.5, 13.3, 0.175, 11.05);
  const cr = rng(888);
  for (let i = 0; i < 5; i++) { const v = randomVessel(cr, { maxH: 0.22, maxR: 0.1, stage: 'glazed', drip: 0.06 }); addVessel(Object.assign(v, { drip: 0.06 }), 13.1 + i * 0.1, 0.36, 11.0 + (cr() - 0.5) * 0.2, cr() * 6, false, 0.5 + cr() * 0.6); }
  solid(12.9, 10.75, 13.7, 11.35);
}
// ---- outside ground & trees beyond the walls
plane(mats.ground, 140, 140, 5, -0.03, 3, 0, -Math.PI / 2);
{
  const r = rng(301);
  for (const [x, z, s] of [[18.6, 3.0, 1.1], [19.0, 9.0, 1.3], [10.0, 15.0, 1.2], [3.0, 14.5, 0.9], [-8.5, 9.0, 1.2], [-2, -8.5, 1.3], [9, -7.5, 1.0], [-9, -2, 1.1], [16, 15, 1.0]]) {
    vcyl([0.3, 0.24, 0.19], 0.02, 0.12 * s, 0.2 * s, 4 * s, 9, x, 2 * s, z);
    for (let i = 0; i < 16; i++) {
      const a = r() * 6.28, d = r() * 1.5 * s, hgt = 3.2 * s + r() * 2.4 * s, k = 0.55 + r() * 0.45;
      vput(xf(lump((0.7 + r() * 0.4) * s, (0.55 + r() * 0.3) * s, (0.7 + r() * 0.4) * s, [(0.16 + r() * 0.06) * k + 0.04, (0.22 + r() * 0.07) * k + 0.05, (0.1 + r() * 0.04) * k + 0.03], 0.15, 400 + i + x * 10, 2), x + Math.cos(a) * d, hgt, z + Math.sin(a) * d, r() * 6));
    }
    for (let i = 0; i < 3; i++) { const a = r() * 6.28; vcyl([0.3, 0.24, 0.19], 0.02, 0.03 * s, 0.07 * s, 1.6 * s, 6, x + Math.cos(a) * 0.5 * s, 3.4 * s, z + Math.sin(a) * 0.5 * s, Math.sin(a) * 0.6, -Math.cos(a) * 0.6); }
  }
}

// ---------------------------------------------------------------- build meshes
let triCount = 0;
const allBuckets = [...buckets].concat([...vcChunks.values()].map((l) => [vcMat, l]));
for (const [mat, list] of allBuckets) {
  const g = mergeGeometries(list, false);
  if (!g) { console.warn('merge failed', mat); continue; }
  g.computeBoundingSphere();
  const mesh = new THREE.Mesh(g, mat);
  mesh.matrixAutoUpdate = false;
  mesh.castShadow = !mat.userData.noShadow; mesh.receiveShadow = !mat.userData.noShadow;
  if (mat === mats.glass) mesh.renderOrder = 2;
  if (mat === mats.soot) mesh.renderOrder = 1;
  scene.add(mesh);
  triCount += (g.index ? g.index.count : g.attributes.position.count) / 3;
}
buckets.clear(); vcChunks.clear();

// ---------------------------------------------------------------- sky
{
  const sky = new THREE.Mesh(new THREE.SphereGeometry(120, 32, 16), new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false,
    uniforms: { top: { value: new THREE.Color(0x4f86c6) }, hor: { value: new THREE.Color(0xd9e6ee) }, sun: { value: new THREE.Vector3(-9, 13, 8).normalize() } },
    vertexShader: 'varying vec3 vD; void main(){ vD = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); gl_Position.z = gl_Position.w; }',
    fragmentShader: 'uniform vec3 top; uniform vec3 hor; uniform vec3 sun; varying vec3 vD; void main(){ float h = max(vD.y,0.0); vec3 c = mix(hor, top, pow(h,0.55)); float s = max(dot(vD,sun),0.0); c += vec3(1.0,0.85,0.6)*pow(s,40.0)*0.6 + vec3(1.0,0.95,0.85)*pow(s,900.0)*4.0; if(vD.y<0.0) c = mix(hor, vec3(0.45,0.42,0.38), min(-vD.y*4.0,1.0)); gl_FragColor = vec4(c,1.0);\n#include <tonemapping_fragment>\n#include <colorspace_fragment>\n}',
  }));
  sky.frustumCulled = false; sky.renderOrder = -1;
  scene.add(sky);
}

// ---------------------------------------------------------------- lights
const hemi = new THREE.HemisphereLight(0xbcd0ee, 0x5e5448, 0.6); scene.add(hemi);
const sun = new THREE.DirectionalLight(0xffe9c8, 4.2);
sun.position.set(5 - 9, 13, 3 + 8); sun.target.position.set(5, 0, 3);
sun.castShadow = true; sun.shadow.mapSize.set(4096, 4096);
Object.assign(sun.shadow.camera, { left: -17, right: 17, top: 17, bottom: -17, near: 1, far: 60 });
sun.shadow.bias = -0.0003; sun.shadow.normalBias = 0.025; sun.shadow.radius = 3;
scene.add(sun, sun.target);
function spot(x, y, z, tx, tz, I, color, angle, shadow) {
  const s = new THREE.SpotLight(color, I, 0, angle, 0.65, 2);
  s.position.set(x, y, z); s.target.position.set(tx, 0, tz);
  if (shadow) { s.castShadow = true; s.shadow.mapSize.set(1024, 1024); s.shadow.bias = -0.0004; s.shadow.normalBias = 0.02; s.shadow.camera.near = 0.3; s.shadow.camera.far = 8; s.shadow.radius = 4; }
  scene.add(s, s.target); return s;
}
spot(0, 2.48, 1.5, 0, 1.5, 12, 0xfff1df, 1.0, true);           // pendant over bench
spot(7.85, 3.0, -2.4, 7.85, -3.6, 7, 0xeef2ff, 0.95, true);     // glazing bench
for (const [x, y, z, I] of [[-3.2, 2.9, 0.8, 12], [2.6, 2.9, 0.6, 10], [8.0, 2.6, -1.3, 3]]) {
  const p = new THREE.PointLight(0xd6e2ff, I, 11, 2); p.position.set(x, y, z); scene.add(p);
}
renderer.shadowMap.needsUpdate = true;

// ---------------------------------------------------------------- player
const START = { x: 0, z: 5.35, yaw: 0, pitch: -0.08 };
const VIEWS = [START, { x: 2.6, z: 3.3, yaw: 0.85, pitch: -0.32 }, { x: -3.3, z: 0.3, yaw: 1.5, pitch: -0.12 }, { x: 7.8, z: -1.4, yaw: 0.05, pitch: -0.22 }, { x: 8.3, z: 6.2, yaw: -1.55, pitch: 0.02 }];
const player = { x: 0, z: 0, yaw: 0, pitch: 0, vx: 0, vz: 0, eye: 1.62 };
function goTo(v) { Object.assign(player, { x: v.x, z: v.z, yaw: v.yaw, pitch: v.pitch, vx: 0, vz: 0 }); }
goTo(START);
const keys = {};
const RAD = 0.28;
function collide(p) {
  for (let it = 0; it < 3; it++) for (const s of solids) {
    const cx = Math.max(s[0], Math.min(p.x, s[2])), cz = Math.max(s[1], Math.min(p.z, s[3]));
    const dx = p.x - cx, dz = p.z - cz, d2 = dx * dx + dz * dz;
    if (d2 < RAD * RAD) {
      if (d2 > 1e-9) { const d = Math.sqrt(d2); p.x += (dx / d) * (RAD - d); p.z += (dz / d) * (RAD - d); }
      else {
        const l = p.x - s[0], r = s[2] - p.x, t = p.z - s[1], b = s[3] - p.z, m = Math.min(l, r, t, b);
        if (m === l) p.x = s[0] - RAD; else if (m === r) p.x = s[2] + RAD; else if (m === t) p.z = s[1] - RAD; else p.z = s[3] + RAD;
      }
    }
  }
  p.x = Math.max(-4.8, Math.min(15.3, p.x)); p.z = Math.max(-3.8, Math.min(11.3, p.z));
}
const overlay = document.getElementById('overlay'), statsEl = document.getElementById('stats'), zoneEl = document.getElementById('zone');
const canvas = renderer.domElement;
overlay.addEventListener('click', () => { overlay.style.display = 'none'; canvas.requestPointerLock?.(); });
canvas.addEventListener('click', () => { if (document.pointerLockElement !== canvas) canvas.requestPointerLock?.(); });
document.addEventListener('pointerlockchange', () => { if (document.pointerLockElement !== canvas) overlay.style.display = 'flex'; });
let dragging = false;
canvas.addEventListener('mousedown', () => { dragging = true; });
window.addEventListener('mouseup', () => { dragging = false; });
window.addEventListener('mousemove', (e) => {
  if (document.pointerLockElement === canvas || dragging) {
    player.yaw -= e.movementX * 0.0022; player.pitch -= e.movementY * 0.0022;
    player.pitch = Math.max(-1.45, Math.min(1.45, player.pitch));
  }
});
let showStats = true;
window.addEventListener('keydown', (e) => {
  keys[e.code] = true;
  if (e.code === 'KeyR') goTo(START);
  if (e.code >= 'Digit1' && e.code <= 'Digit5') goTo(VIEWS[+e.code.slice(5) - 1]);
  if (e.code === 'KeyF') { showStats = !showStats; statsEl.style.display = showStats ? 'block' : 'none'; }
  if (e.code === 'KeyQ') { hiQ = !hiQ; setPR(); renderer.setSize(window.innerWidth, window.innerHeight); }
  if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) e.preventDefault();
});
window.addEventListener('keyup', (e) => { keys[e.code] = false; });
window.addEventListener('blur', () => { for (const k in keys) keys[k] = false; });
window.addEventListener('resize', () => { camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix(); renderer.setSize(window.innerWidth, window.innerHeight); });

function zoneName(x, z) { return x < 5 ? 'Pottery Studio' : (z < 0.85 ? 'Glazing Shelter' : 'Kiln Courtyard'); }
let lastZone = '', zoneT = 0;
const clock = new THREE.Clock();
let acc = 0, frames = 0, worst = 0;
function frame() {
  const dt = Math.min(clock.getDelta(), 0.05);
  update(dt);
  renderer.render(scene, camera);
  frames++; acc += dt; worst = Math.max(worst, dt);
  if (acc >= 0.5) {
    if (showStats) statsEl.textContent = `${(frames / acc).toFixed(0)} fps  ${(acc / frames * 1000).toFixed(1)} ms avg  ${(worst * 1000).toFixed(1)} ms max\n${renderer.info.render.calls} draws  ${(renderer.info.render.triangles / 1000).toFixed(0)}k tris`;
    acc = 0; frames = 0; worst = 0;
  }
  requestAnimationFrame(frame);
}
function update(dt) {
  const fwd = (keys.KeyW || keys.ArrowUp ? 1 : 0) - (keys.KeyS || keys.ArrowDown ? 1 : 0);
  const str = (keys.KeyD ? 1 : 0) - (keys.KeyA ? 1 : 0);
  let turn = (keys.ArrowLeft ? 1 : 0) - (keys.ArrowRight ? 1 : 0);
  player.yaw += turn * dt * 1.8;
  const crouch = keys.KeyC;
  const speed = (keys.ShiftLeft || keys.ShiftRight ? 3.6 : 1.9) * (crouch ? 0.55 : 1);
  const sy = Math.sin(player.yaw), cy = Math.cos(player.yaw);
  let tx = -sy * fwd + cy * str, tz = -cy * fwd - sy * str;
  const tl = Math.hypot(tx, tz); if (tl > 0) { tx = tx / tl * speed; tz = tz / tl * speed; }
  const k = 1 - Math.exp(-dt * 11);
  player.vx += (tx - player.vx) * k; player.vz += (tz - player.vz) * k;
  player.x += player.vx * dt; player.z += player.vz * dt;
  collide(player);
  player.eye += ((crouch ? 1.05 : 1.62) - player.eye) * (1 - Math.exp(-dt * 10));
  camera.position.set(player.x, player.eye, player.z);
  camera.rotation.set(player.pitch, player.yaw, 0);
  const zn = zoneName(player.x, player.z);
  if (zn !== lastZone) { lastZone = zn; zoneEl.textContent = zn; zoneEl.style.opacity = 1; zoneT = 2.5; }
  if (zoneT > 0) { zoneT -= dt; if (zoneT <= 0) zoneEl.style.opacity = 0; }
}
// warm-up: upload every texture and compile every shader now, so turning around never stalls
scene.traverse((o) => {
  if (!o.material) return;
  for (const k of ['map', 'bumpMap']) if (o.material[k]) renderer.initTexture(o.material[k]);
});
renderer.compile(scene, camera);
for (const v of VIEWS) { goTo(v); update(0.016); renderer.render(scene, camera); }
goTo(START); update(0.016);
document.getElementById('loading').remove();
window.__scene = { scene, renderer, camera, player, goTo, VIEWS, triCount, keys, update };
requestAnimationFrame(frame);

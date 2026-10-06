// Scene construction: terrain, track, platform, station building, canopy, woodland.
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import * as TX from './tex.js';

export const SUN = new THREE.Vector3(-0.82, 0.32, -0.47).normalize();
export const RAIL_TOP = 0.43;
export const PLAT = { x0: -24, x1: 16, z0: 1.55, z1: 7.2, y: 1.0 };
export const BLD = { x0: -7, x1: 5, z0: 7.2, z1: 13.2, fl: 1.05, eave: 4.6, t: 0.34, ceil: 4.4 };
export const CAN = { x0: -11, x1: 9, zb: 7.2, zf: 2.3, yb: 4.15, yf: 3.65, colZ: 2.95 };
const RAMP = { x0: 16, x1: 22, z0: 1.55, z1: 5.0 };
const CROSS = { x0: 22.4, x1: 25.2, z0: -2.3, z1: 1.55 };
export const U = { time: { value: 0 }, sun: { value: SUN.clone() } };

let rnd = TX.rng(20261005);
const R = () => rnd();
const RR = (a, b) => a + (b - a) * rnd();
const smooth = (e0, e1, x) => { const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0))); return t * t * (3 - 2 * t); };
const lerp = (a, b, t) => a + (b - a) * t;
const tick = () => new Promise((r) => setTimeout(r, 0));

// ------------------------------------------------------------ geometry buckets
const buckets = new Map();
function add(key, g) { if (!buckets.has(key)) buckets.set(key, []); buckets.get(key).push(g); return g; }
const _m = new THREE.Matrix4(), _q = new THREE.Quaternion(), _e = new THREE.Euler(), _p = new THREE.Vector3(), _s = new THREE.Vector3(1, 1, 1);
function xf(g, x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0) { _e.set(rx, ry, rz, 'YXZ'); _q.setFromEuler(_e); _m.compose(_p.set(x, y, z), _q, _s); g.applyMatrix4(_m); return g; }
function boxUV(g, s = 1, s2 = s) {
  const p = g.attributes.position, n = g.attributes.normal, uv = g.attributes.uv;
  for (let i = 0; i < p.count; i++) {
    const ax = Math.abs(n.getX(i)), ay = Math.abs(n.getY(i)), az = Math.abs(n.getZ(i));
    let u, v;
    if (ax >= ay && ax >= az) { u = p.getZ(i); v = p.getY(i); } else if (ay >= az) { u = p.getX(i); v = p.getZ(i); } else { u = p.getX(i); v = p.getY(i); }
    uv.setXY(i, u / s, v / s2);
  }
  return g;
}
function tint(g, fn) {
  const p = g.attributes.position, n = g.attributes.normal, c = new Float32Array(p.count * 3);
  for (let i = 0; i < p.count; i++) { const col = fn(p.getX(i), p.getY(i), p.getZ(i), n.getX(i), n.getY(i), n.getZ(i)); c[i * 3] = col[0]; c[i * 3 + 1] = col[1]; c[i * 3 + 2] = col[2]; }
  g.setAttribute('color', new THREE.BufferAttribute(c, 3)); return g;
}
export const colliders = [];
function colBox(x0, x1, z0, z1, y0, y1) { colliders.push({ t: 0, cx: (x0 + x1) / 2, cz: (z0 + z1) / 2, hx: (x1 - x0) / 2, hz: (z1 - z0) / 2, c: 1, s: 0, y0, y1 }); }
function colOBox(cx, cz, hx, hz, rot, y0, y1) { colliders.push({ t: 0, cx, cz, hx, hz, c: Math.cos(rot), s: Math.sin(rot), y0, y1 }); }
function colCircle(x, z, r, y0, y1) { colliders.push({ t: 1, x, z, r, y0, y1 }); }

function B(key, x0, x1, y0, y1, z0, z1, o = {}) {
  const w = x1 - x0, h = y1 - y0, d = z1 - z0, sg = o.seg || 0;
  const g = new THREE.BoxGeometry(w, h, d, sg ? Math.max(1, Math.ceil(w / sg)) : 1, sg ? Math.max(1, Math.ceil(h / sg)) : 1, sg ? Math.max(1, Math.ceil(d / sg)) : 1);
  g.translate((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2);
  boxUV(g, o.uv || 1, o.uv2 || o.uv || 1);
  if (o.tint) tint(g, o.tint);
  if (o.col) colBox(x0, x1, z0, z1, y0, y1);
  return add(key, g);
}
function RB(key, w, h, d, x, y, z, rx = 0, ry = 0, rz = 0, o = {}) {
  const g = new THREE.BoxGeometry(w, h, d);
  if (o.lx !== undefined) g.translate(o.lx, o.ly || 0, o.lz || 0);
  boxUV(g, o.uv || 1);
  xf(g, x, y, z, rx, ry, rz);
  if (o.tint) tint(g, o.tint);
  return add(key, g);
}
function cyl(key, r0, r1, y0, y1, x, z, seg = 8, o = {}) {
  const g = new THREE.CylinderGeometry(r1, r0, y1 - y0, seg, 1, !!o.open);
  g.translate(x, (y0 + y1) / 2, z);
  if (o.uv) { const uv = g.attributes.uv; for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * o.uv, uv.getY(i) * (y1 - y0)); }
  return add(key, g);
}
function sloped(key, x0, x1, z0, z1, yb, yt0, yt1, o = {}) {
  const g = new THREE.BoxGeometry(x1 - x0, 1, z1 - z0, Math.ceil((x1 - x0) / 0.5), 1, Math.max(1, Math.ceil((z1 - z0) / 0.5)));
  g.translate((x0 + x1) / 2, 0.5, (z0 + z1) / 2);
  const p = g.attributes.position;
  for (let i = 0; i < p.count; i++) { const t = (p.getX(i) - x0) / (x1 - x0); p.setY(i, p.getY(i) > 0.5 ? lerp(yt0, yt1, t) : yb); }
  g.computeVertexNormals(); boxUV(g, o.uv || 1);
  if (o.tint) tint(g, o.tint);
  return add(key, g);
}
// tapered tube through points
function tube(key, pts, r0, r1, radial = 7, uvs = 1) {
  const curve = new THREE.CatmullRomCurve3(pts);
  const segs = Math.max(2, pts.length * 2);
  const frames = curve.computeFrenetFrames(segs, false);
  const pos = [], nor = [], uv = [], idx = [];
  for (let i = 0; i <= segs; i++) {
    const t = i / segs, c = curve.getPointAt(t), N = frames.normals[i], Bn = frames.binormals[i], r = lerp(r0, r1, t);
    for (let j = 0; j <= radial; j++) {
      const a = j / radial * Math.PI * 2, cs = Math.cos(a), sn = Math.sin(a);
      const nx = cs * N.x + sn * Bn.x, ny = cs * N.y + sn * Bn.y, nz = cs * N.z + sn * Bn.z;
      pos.push(c.x + nx * r, c.y + ny * r, c.z + nz * r); nor.push(nx, ny, nz); uv.push(j / radial * uvs, t * curve.getLength() / 2);
    }
  }
  for (let i = 0; i < segs; i++) for (let j = 0; j < radial; j++) { const a = i * (radial + 1) + j, b = a + radial + 1; idx.push(a, b, a + 1, b, b + 1, a + 1); }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3)); g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2)); g.setIndex(idx);
  return add(key, g);
}

// card buffers for foliage (built directly as arrays)
class Cards {
  constructor() { this.p = []; this.n = []; this.uv = []; this.c = []; this.i = []; }
  quad(c, u, v, uv0, uv1, nrm, col) { // c centre, u/v half axes
    const b = this.p.length / 3;
    const corners = [[-1, -1], [1, -1], [1, 1], [-1, 1]];
    for (let k = 0; k < 4; k++) {
      const [a, bb] = corners[k];
      const x = c.x + u.x * a + v.x * bb, y = c.y + u.y * a + v.y * bb, z = c.z + u.z * a + v.z * bb;
      this.p.push(x, y, z);
      const nn = typeof nrm === 'function' ? nrm(x, y, z) : nrm; this.n.push(nn.x, nn.y, nn.z);
      this.uv.push(a < 0 ? uv0[0] : uv1[0], bb < 0 ? uv0[1] : uv1[1]);
      this.c.push(col[0], col[1], col[2]);
    }
    this.i.push(b, b + 1, b + 2, b, b + 2, b + 3);
  }
  geo() {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(this.p, 3)); g.setAttribute('normal', new THREE.Float32BufferAttribute(this.n, 3));
    g.setAttribute('uv', new THREE.Float32BufferAttribute(this.uv, 2)); g.setAttribute('color', new THREE.Float32BufferAttribute(this.c, 3)); g.setIndex(this.i);
    g.computeBoundingSphere(); return g;
  }
}
const V = (x, y, z) => new THREE.Vector3(x, y, z);

// ------------------------------------------------------------ terrain & mask
const MN = 1024, MS = 160, MO = -80;
let maskData = null, maskCanvas = null;
function maskAt(x, z, ch) {
  const u = (x - MO) / MS * MN - 0.5, v = (z - MO) / MS * MN - 0.5;
  const ix = Math.floor(u), iz = Math.floor(v);
  if (ix < 0 || iz < 0 || ix >= MN - 1 || iz >= MN - 1) return 0;
  const fx = u - ix, fz = v - iz, d = maskData;
  const a = d[(iz * MN + ix) * 4 + ch], b = d[(iz * MN + ix + 1) * 4 + ch], c = d[((iz + 1) * MN + ix) * 4 + ch], e = d[((iz + 1) * MN + ix + 1) * 4 + ch];
  return (a + (b - a) * fx + (c - a) * fz + (a - b - c + e) * fx * fz) / 255;
}
const PATHS = {
  approach: [[-3.75, 21.0], [-4.3, 28], [-6, 36], [-9.5, 46], [-11, 62]],
  back: [[23.8, 3.8], [24.6, 9], [21, 15], [13, 19.4], [5, 20.2], [-1.5, 19.6]],
  loop: [[23.8, -2.4], [23.4, -8], [18.5, -14], [10.5, -20], [2.5, -24], [-4, -25.6], [-11, -22.5], [-13.5, -15.5], [-8.5, -9.8], [2, -7.8], [12, -6.8], [19, -5.0], [23.8, -2.4]],
};
const pathPts = {};
function drawMask(trees) {
  const c = maskCanvas || (maskCanvas = document.createElement('canvas')); c.width = c.height = MN;
  const g = c.getContext('2d');
  g.fillStyle = '#000'; g.fillRect(0, 0, MN, MN);
  const P = (x) => (x - MO) / MS * MN;
  // R: paths and gravel
  g.filter = 'blur(2px)';
  g.strokeStyle = 'rgb(255,0,0)'; g.lineCap = 'round'; g.lineJoin = 'round';
  for (const k in PATHS) {
    const pts = new THREE.CatmullRomCurve3(PATHS[k].map(([x, z]) => V(x, 0, z))).getPoints(PATHS[k].length * 12);
    pathPts[k] = pts;
    g.lineWidth = (k === 'approach' ? 2.6 : 1.7) / MS * MN;
    g.beginPath(); pts.forEach((p, i) => (i ? g.lineTo(P(p.x), P(p.z)) : g.moveTo(P(p.x), P(p.z)))); g.stroke();
  }
  g.fillStyle = 'rgb(230,0,0)';
  g.beginPath(); g.moveTo(P(-12), P(13)); g.lineTo(P(6.5), P(13)); g.lineTo(P(7.5), P(19)); g.lineTo(P(2), P(22)); g.lineTo(P(-8), P(22.5)); g.lineTo(P(-13), P(19)); g.fill();
  g.beginPath(); g.ellipse(P(23.8), P(3.6), 2.6 / MS * MN, 2.4 / MS * MN, 0, 0, 7); g.fill();
  g.beginPath(); g.ellipse(P(23.8), P(-3.6), 2.4 / MS * MN, 2.0 / MS * MN, 0, 0, 7); g.fill();
  // B: grass verges (open, sunny areas)
  g.globalCompositeOperation = 'lighter';
  g.filter = 'blur(6px)';
  g.fillStyle = 'rgb(0,0,150)';
  g.fillRect(P(-100), P(-5.5), MN, (3.0) / MS * MN);
  g.fillRect(P(-100), P(2.4), MN, (1.2) / MS * MN);
  for (let i = 0; i < 60; i++) { g.beginPath(); g.arc(P(RR(-40, 40)), P(RR(14, 26)), RR(1, 3) / MS * MN, 0, 7); g.fill(); }
  // G: darkness under trees
  if (trees) {
    g.filter = 'blur(4px)';
    for (const t of trees) { g.fillStyle = `rgb(0,${t.type === 'spruce' ? 120 : 70},0)`; g.beginPath(); g.arc(P(t.x), P(t.z), (t.type === 'spruce' ? 3.2 : 2.2) / MS * MN, 0, 7); g.fill(); }
  }
  g.globalCompositeOperation = 'source-over'; g.filter = 'none';
  maskData = g.getImageData(0, 0, MN, MN).data;
}
const TG = { n: 201, o: -100 };
let TH = null;
function terrainH(x, z) {
  const n1 = TX.N(x / 97 + 0.13, z / 97 + 0.71) - 0.5, n2 = TX.N(x / 23 + 0.4, z / 23 + 0.2) - 0.5;
  let h;
  const edge = Math.max(0, Math.abs(x) - 42) * 0.12;
  if (z >= 0) {
    const t = smooth(2.4, 7.0, z);
    const flat = smooth(16, 32, Math.hypot((x + 2) * 0.75, z - 14));
    const far = 1.0 + (n1 * 4 + n2 * 0.9) * flat + Math.max(0, z - 26) * 0.14 + edge;
    h = t * far;
  } else {
    const t = smooth(2.6, 10, -z);
    const knoll = 3.1 * Math.exp(-((x + 3.5) ** 2 + (z + 25.5) ** 2) / 80);
    const far = 0.45 + n1 * 3.5 + n2 * 0.9 + knoll + Math.max(0, -z - 31) * 0.16 + edge;
    h = t * Math.max(far, 0.25);
  }
  const sr = (v, a, b, m) => smooth(a - m, a, v) * (1 - smooth(b, b + m, v));
  const wl = sr(x, 20.5, 27.5, 1.5) * sr(z, 1.3, 5.2, 1.2);
  h = lerp(h, RAIL_TOP - 0.02, wl);
  const wf = sr(x, 21, 27, 1.5) * sr(z, -6.5, -2.45, 0.6);
  h = lerp(h, 0.38, wf);
  if (x > PLAT.x0 - 0.6 && x < PLAT.x1 + 0.4 && z > 1.4 && z < 7.25) h = Math.min(h, 0.9);
  if (x > RAMP.x0 && x < RAMP.x1 + 0.3 && z > 1.4 && z < RAMP.z1 + 0.3) h = Math.min(h, lerp(PLAT.y, RAIL_TOP, (x - RAMP.x0) / (RAMP.x1 - RAMP.x0)) - 0.08);
  if (maskData) h -= maskAt(x, z, 0) * 0.07;
  return h;
}
export function terrainAt(x, z) {
  const fx = x - TG.o, fz = z - TG.o, n = TG.n;
  const ix = Math.min(n - 2, Math.max(0, Math.floor(fx))), iz = Math.min(n - 2, Math.max(0, Math.floor(fz)));
  const tx = fx - ix, tz = fz - iz;
  const a = TH[iz * n + ix], b = TH[iz * n + ix + 1], c = TH[(iz + 1) * n + ix], d = TH[(iz + 1) * n + ix + 1];
  return a + (b - a) * tx + (c - a) * tz + (a - b - c + d) * tx * tz;
}
export function groundH(x, z) {
  let h = terrainAt(x, z);
  const az = Math.abs(z);
  if (az < 2.4) h = Math.max(h, az < 1.8 ? 0.2 : 0.2 * (2.4 - az) / 0.6);
  if (x >= PLAT.x0 && x <= PLAT.x1 && z >= PLAT.z0 - 0.08 && z <= PLAT.z1) h = Math.max(h, PLAT.y);
  if (x > RAMP.x0 && x <= RAMP.x1 && z >= RAMP.z0 - 0.08 && z <= RAMP.z1) h = Math.max(h, lerp(PLAT.y, RAIL_TOP, (x - RAMP.x0) / (RAMP.x1 - RAMP.x0)));
  if (x >= CROSS.x0 && x <= CROSS.x1 && z >= CROSS.z0 && z <= CROSS.z1) h = Math.max(h, RAIL_TOP);
  if (x >= BLD.x0 && x <= BLD.x1 && z >= BLD.z0 && z <= BLD.z1) h = Math.max(h, BLD.fl);
  return h;
}
export function isInside(x, z) { return x > BLD.x0 + BLD.t && x < -0.62 && z > BLD.z0 + BLD.t && z < BLD.z1 - BLD.t; }
export function isCanopy(x, z) { return x > CAN.x0 && x < CAN.x1 && z > CAN.zf && z < CAN.zb; }

function buildTerrain(mats) {
  const n = TG.n; TH = new Float32Array(n * n);
  for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) TH[j * n + i] = terrainH(TG.o + i, TG.o + j);
  const pos = new Float32Array(n * n * 3), uv = new Float32Array(n * n * 2), idx = [];
  for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) {
    const k = j * n + i, x = TG.o + i, z = TG.o + j;
    pos[k * 3] = x; pos[k * 3 + 1] = TH[k]; pos[k * 3 + 2] = z; uv[k * 2] = x / 4; uv[k * 2 + 1] = z / 4;
  }
  for (let j = 0; j < n - 1; j++) for (let i = 0; i < n - 1; i++) { const a = j * n + i, b = a + 1, c = a + n, d = c + 1; idx.push(a, c, b, b, c, d); }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3)); g.setAttribute('uv', new THREE.BufferAttribute(uv, 2)); g.setIndex(idx); g.computeVertexNormals();
  const m = new THREE.Mesh(g, mats.terrain); m.receiveShadow = true; m.castShadow = true;
  return m;
}

// ------------------------------------------------------------ materials
function std(o) { return new THREE.MeshStandardMaterial(Object.assign({ roughness: 0.9, metalness: 0, vertexColors: true }, o)); }
function foliage(map, o = {}) {
  const m = new THREE.MeshLambertMaterial({ map, alphaTest: o.alphaTest ?? 0.45, side: THREE.DoubleSide, vertexColors: true, alphaToCoverage: true });
  const wind = o.wind ?? 1, glow = o.glow ?? 1.2;
  m.onBeforeCompile = (sh) => {
    sh.uniforms.uTime = U.time; sh.uniforms.uSun = U.sun;
    sh.vertexShader = 'uniform float uTime;\nvarying vec3 vWP;\n' + sh.vertexShader
      .replace('#include <begin_vertex>', `#include <begin_vertex>
        float sw = sin(uTime*1.6 + transformed.x*0.35 + transformed.z*0.27)*0.6 + sin(uTime*2.7 + transformed.y*0.9 + transformed.x*0.5)*0.4;
        transformed.xz += vec2(0.03, 0.022) * sw * ${wind.toFixed(2)} * clamp(transformed.y*0.12, 0.0, 1.0);`)
      .replace('#include <worldpos_vertex>', '#include <worldpos_vertex>\nvWP = (modelMatrix * vec4(transformed, 1.0)).xyz;');
    sh.fragmentShader = 'uniform vec3 uSun;\nvarying vec3 vWP;\n' + sh.fragmentShader
      .replace('#include <normal_fragment_begin>', THREE.ShaderChunk.normal_fragment_begin.replace(/normal \*= faceDirection;/g, '').replace(/bitangent = bitangent \* faceDirection;/g, ''))
      .replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
        vec3 vdir = normalize(vWP - cameraPosition);
        float tr = pow(max(dot(vdir, uSun), 0.0), 5.0);
        totalEmissiveRadiance += diffuseColor.rgb * vec3(1.0, 0.72, 0.42) * tr * ${glow.toFixed(2)};`);
  };
  return m;
}
function makeMaterials(T) {
  const dark = TX.aoTex(105);
  const M = {};
  M.brick = std({ map: T.brick.map, normalMap: T.brick.normalMap, normalScale: new THREE.Vector2(1.3, 1.3) });
  M.brickIn = std({ map: T.brick.map, normalMap: T.brick.normalMap, aoMap: dark, color: 0xb8b0a8 });
  M.slate = std({ map: T.slate.map, normalMap: T.slate.normalMap, roughness: 0.7 });
  M.woodRaw = std({ map: T.wood.map, normalMap: T.wood.normalMap });
  M.sleeper = std({ map: T.woodDark.map, normalMap: T.woodDark.normalMap, roughness: 0.95 });
  M.woodDark = std({ map: T.woodDark.map, normalMap: T.woodDark.normalMap });
  M.floor = std({ map: T.floor.map, normalMap: T.floor.normalMap, aoMap: dark, aoMapIntensity: 0.85 });
  M.paintGreen = std({ map: T.green.map, normalMap: T.green.normalMap });
  M.paintCream = std({ map: T.cream.map, normalMap: T.cream.normalMap });
  M.dado = std({ map: T.green.map, normalMap: T.green.normalMap, aoMap: dark });
  M.ceiling = std({ map: T.cream.map, normalMap: T.cream.normalMap, aoMap: dark });
  M.plaster = std({ map: T.plaster.map, normalMap: T.plaster.normalMap, alphaTest: 0.5, aoMap: dark });
  M.rail = std({ map: T.rust.map, normalMap: T.rust.normalMap, roughness: 0.7, metalness: 0.35 });
  M.iron = std({ map: T.rust.map, normalMap: T.rust.normalMap, roughness: 0.75, metalness: 0.3, color: 0x8a8a8a });
  M.ironGreen = std({ map: T.ironGreen.map, normalMap: T.ironGreen.normalMap, roughness: 0.7, metalness: 0.2 });
  M.corr = std({ map: T.corr.map, normalMap: T.corr.normalMap, roughness: 0.72, metalness: 0.3, side: THREE.DoubleSide });
  M.flag = std({ map: T.flag.map, normalMap: T.flag.normalMap, roughness: 0.92 });
  M.stone = std({ map: T.flag.map, normalMap: T.flag.normalMap, roughness: 0.9, color: 0xd8d2c4 });
  M.ballast = std({ map: T.ballast.map, normalMap: T.ballast.normalMap, roughness: 0.95 });
  M.bark = std({ map: T.bark.map, normalMap: T.bark.normalMap, roughness: 0.95, vertexColors: false });
  M.barkBeech = std({ map: T.barkBeech.map, normalMap: T.barkBeech.normalMap, roughness: 0.9, vertexColors: false });
  M.barkBirch = std({ map: T.barkBirch.map, normalMap: T.barkBirch.normalMap, roughness: 0.85, vertexColors: false });
  M.litter = std({ map: T.litter.map, normalMap: T.litter.normalMap, roughness: 0.95 });
  M.soot = std({ color: 0x0c0a09, roughness: 1, vertexColors: false });
  M.pot = std({ color: 0x8a4c34, roughness: 0.85, map: T.rust.map, vertexColors: false });
  M.ceramic = std({ color: 0xd9d4c8, roughness: 0.4, vertexColors: false });
  M.glass = new THREE.MeshStandardMaterial({ map: T.glass, transparent: true, roughness: 0.15, metalness: 0.1, depthWrite: false, side: THREE.DoubleSide });
  M.glassBroken = new THREE.MeshStandardMaterial({ map: T.glassBroken, transparent: true, roughness: 0.15, metalness: 0.1, depthWrite: false, side: THREE.DoubleSide, alphaTest: 0.02 });
  M.glass.userData.cast = false; M.glassBroken.userData.cast = false;
  M.leaves = foliage(T.leafAtlas, { glow: 1.3 });
  M.spruce = foliage(T.spruce, { glow: 0.4, wind: 0.6 });
  M.fern = foliage(T.fern, { glow: 0.8, wind: 0.5 });
  M.grass = foliage(T.grass, { glow: 0.8, wind: 1.6, alphaTest: 0.4 });
  M.decal = foliage(T.groundLeaf, { glow: 0.3, wind: 0, alphaTest: 0.5 });
  M.ivy = foliage(T.ivy, { glow: 1.0, wind: 0.2 });
  M.impostor = foliage(T.impostor, { glow: 0.6, wind: 0.3 });
  const terrain = new THREE.MeshStandardMaterial({ map: T.litter.map, normalMap: T.litter.normalMap, roughness: 0.96 });
  const maskTex = new THREE.CanvasTexture(maskCanvas); maskTex.flipY = false; maskTex.wrapS = maskTex.wrapT = THREE.ClampToEdgeWrapping;
  terrain.onBeforeCompile = (sh) => {
    sh.uniforms.tDirt = { value: T.dirt.map }; sh.uniforms.tMask = { value: maskTex };
    sh.vertexShader = 'varying vec3 vWP;\n' + sh.vertexShader.replace('#include <worldpos_vertex>', '#include <worldpos_vertex>\nvWP = (modelMatrix * vec4(transformed, 1.0)).xyz;');
    sh.fragmentShader = 'uniform sampler2D tDirt;\nuniform sampler2D tMask;\nvarying vec3 vWP;\n' + sh.fragmentShader.replace('#include <map_fragment>', `
      vec4 mk = texture2D(tMask, (vWP.xz + 80.0) / 160.0);
      vec4 lit = texture2D(map, vMapUv);
      vec4 drt = texture2D(tDirt, vMapUv * 1.7);
      vec4 lit2 = texture2D(map, vWP.xz * 0.043 + 0.37);
      lit = mix(lit, lit2, 0.35);
      float pm = smoothstep(0.42, 0.62, mk.r + (lit.r - 0.22) * 0.7);
      vec4 col = mix(lit, drt, pm);
      col.rgb = mix(col.rgb, col.rgb * vec3(0.9, 1.08, 0.55) + vec3(0.015, 0.03, 0.0), mk.b * (1.0 - pm) * 0.9);
      col.rgb *= 1.0 - mk.g * 0.5;
      diffuseColor *= col;`);
  };
  M.terrain = terrain;
  return M;
}

// ------------------------------------------------------------ station building
function station() {
  const { x0, x1, z0, z1, fl, eave, t, ceil } = BLD;
  const IN = { x0: x0 + t, x1: x1 - t, z0: z0 + t, z1: z1 - t };
  const px0 = -0.62, px1 = -0.38;
  const brickTint = (x, y, z, nx, ny, nz) => {
    const k = 0.9 + (TX.N(x * 0.07 + z * 0.05 + 0.3, y * 0.11 + 0.2) - 0.5) * 0.5;
    let r = k, g = k, b = k;
    const damp = smooth(fl + 1.0, fl - 0.4, y); r *= 1 - 0.45 * damp; g *= 1 - 0.36 * damp; b *= 1 - 0.5 * damp;
    const ed = smooth(eave - 1.1, eave, y); r *= 1 - 0.28 * ed; g *= 1 - 0.28 * ed; b *= 1 - 0.25 * ed;
    const qx = x + nx * 0.12, qz = z + nz * 0.12;
    if (qx > IN.x0 - 0.02 && qx < IN.x1 + 0.02 && qz > IN.z0 - 0.02 && qz < IN.z1 + 0.02 && y < ceil + 0.05) { r *= 0.6; g *= 0.62; b *= 0.68; }
    return [r, g, b];
  };
  const wall = (axis, key, a0, a1, c0, c1, ya, yb, ops, tf, col) => {
    const cuts = [a0, a1]; for (const o of ops) cuts.push(o.a0, o.a1); cuts.sort((a, b) => a - b);
    for (let i = 0; i < cuts.length - 1; i++) {
      const ca = Math.max(a0, cuts[i]), cb = Math.min(a1, cuts[i + 1]); if (cb - ca < 0.004) continue;
      const mid = (ca + cb) / 2, o = ops.find((o) => mid > o.a0 && mid < o.a1);
      const pieces = o ? [[ya, Math.min(o.b0, yb)], [Math.max(o.b1, ya), yb]] : [[ya, yb]];
      for (const [p0, p1] of pieces) {
        if (p1 - p0 < 0.004) continue;
        const opt = { seg: 0.6, tint: tf, col, uv: key === 'plaster' ? 2.2 : key.startsWith('brick') ? 1.8 : 1 };
        if (axis === 'x') B(key, ca, cb, p0, p1, c0, c1, opt); else B(key, c0, c1, p0, p1, ca, cb, opt);
      }
    }
  };
  const O = (a0, a1, b0, b1) => ({ a0, a1, b0, b1 });
  const sill = fl + 0.9, top = fl + 2.65, dtop = fl + 2.3;
  const north = [O(-6.3, -5.1, sill, top), O(-4.3, -3.2, fl, dtop), O(-2.3, -1.1, sill, top), O(1.0, 2.2, sill, top), O(3.2, 4.4, sill, top)];
  const south = [O(-6.3, -5.1, sill, top), O(-4.3, -3.2, fl, dtop), O(-2.3, -1.1, sill, top), O(1.4, 2.6, sill, top), O(3.2, 4.2, fl, dtop)];
  const west = [O(9.5, 10.9, sill, top + 0.15)], east = [O(9.6, 10.8, sill, top)];
  wall('x', 'brick', x0, x1, z1 - t, z1, 0.1, eave, north, brickTint, true);
  wall('x', 'brick', x0, x1, z0, z0 + t, 0.1, eave, south, brickTint, true);
  wall('z', 'brick', IN.z0, IN.z1, x0, x0 + t, 0.1, eave, west, brickTint, true);
  wall('z', 'brick', IN.z0, IN.z1, x1 - t, x1, 0.1, eave, east, brickTint, true);
  const part = [O(7.9, 8.9, fl + 0.95, fl + 1.8), O(11.6, 12.5, fl, fl + 2.2)];
  wall('z', 'brickIn', IN.z0, IN.z1, px0, px1, fl, ceil, part, null, true);
  colBox(px0, px1, 11.6, 12.5, fl, fl + 2.2);
  // plinth course
  const plT = (x, y, z) => [0.55, 0.5, 0.48];
  B('brick', x0 - 0.04, x1 + 0.04, 0.1, fl + 0.18, z1, z1 + 0.04, { tint: plT });
  B('brick', x0 - 0.04, x0, 0.1, fl + 0.18, z0 - 0.04, z1 + 0.04, { tint: plT });
  B('brick', x1, x1 + 0.04, 0.1, fl + 0.18, z0 - 0.04, z1 + 0.04, { tint: plT });
  // string course under eaves
  B('stone', x0 - 0.05, x1 + 0.05, eave - 0.22, eave - 0.12, z1, z1 + 0.05, { uv: 0.7 });
  // interior finishes (waiting room)
  const dTop = fl + 1.15;
  const wn = north.filter((o) => o.a1 < px0), ws = south.filter((o) => o.a1 < px0);
  wall('x', 'dado', IN.x0, px0, IN.z1 - 0.03, IN.z1 - 0.004, fl, dTop, wn, null, false);
  wall('x', 'dado', IN.x0, px0, IN.z0 + 0.004, IN.z0 + 0.03, fl, dTop, ws, null, false);
  wall('z', 'dado', IN.z0 + 0.03, IN.z1 - 0.03, IN.x0 + 0.004, IN.x0 + 0.03, fl, dTop, west, null, false);
  wall('z', 'dado', IN.z0 + 0.03, IN.z1 - 0.03, px0 - 0.03, px0 - 0.004, fl, dTop, part, null, false);
  wall('x', 'plaster', IN.x0, px0, IN.z1 - 0.018, IN.z1 - 0.006, dTop, ceil, wn, null, false);
  wall('x', 'plaster', IN.x0, px0, IN.z0 + 0.006, IN.z0 + 0.018, dTop, ceil, ws, null, false);
  wall('z', 'plaster', IN.z0 + 0.02, IN.z1 - 0.02, IN.x0 + 0.006, IN.x0 + 0.018, dTop, ceil, west, null, false);
  wall('z', 'plaster', IN.z0 + 0.02, IN.z1 - 0.02, px0 - 0.018, px0 - 0.006, dTop, ceil, part, null, false);
  // dado rail
  wall('x', 'woodDark', IN.x0, px0, IN.z1 - 0.06, IN.z1 - 0.02, dTop - 0.03, dTop + 0.03, wn, null, false);
  wall('x', 'woodDark', IN.x0, px0, IN.z0 + 0.02, IN.z0 + 0.06, dTop - 0.03, dTop + 0.03, ws, null, false);
  wall('z', 'woodDark', IN.z0 + 0.06, IN.z1 - 0.06, IN.x0 + 0.02, IN.x0 + 0.06, dTop - 0.03, dTop + 0.03, west, null, false);
  // floor & ceiling
  B('floor', IN.x0, IN.x1, fl - 0.08, fl, IN.z0, IN.z1, { uv: 2.5 });
  B('ceiling', IN.x0, IN.x1, ceil, ceil + 0.05, IN.z0, 10.9, { uv: 2 });
  B('ceiling', -4.4, IN.x1, ceil, ceil + 0.05, 10.9, IN.z1, { uv: 2 });
  for (let i = 0; i < 7; i++) RB('woodRaw', 0.04, 0.012, RR(0.6, 1.4), RR(-6.4, -4.6), ceil - RR(0.1, 0.5), RR(11.0, 12.6), RR(0.4, 1.2) * (R() < 0.5 ? 1 : -1), RR(-1, 1), RR(-0.4, 0.4), { uv: 1 });
  // debris pile under the collapse
  for (let i = 0; i < 26; i++) RB(R() < 0.5 ? 'woodRaw' : 'stone', RR(0.05, 0.3), RR(0.015, 0.05), RR(0.1, 0.6), RR(-6.4, -4.7), fl + RR(0.02, 0.15), RR(11.1, 12.7), RR(-0.3, 0.3), R() * 3, RR(-0.3, 0.3), { uv: 0.5 });
  const pile = new THREE.SphereGeometry(1, 10, 5, 0, Math.PI * 2, 0, Math.PI / 2); pile.scale(1.1, 0.18, 0.8); pile.translate(-5.7, fl, 12.0); boxUV(pile, 1.5); add('litter', pile);
  // roof
  const th = 38 * Math.PI / 180, tn = Math.tan(th), zc = (z0 + z1) / 2, ridge = eave + (zc - z0) * tn;
  const Lx = x1 - x0 + 0.6, xm = (x0 + x1) / 2, Ls = (zc - (z0 - 0.45)) / Math.cos(th);
  const slope = (side, holes) => {
    const zm = side < 0 ? (z0 - 0.45 + zc) / 2 : (zc + z1 + 0.45) / 2;
    const ym = eave + (side < 0 ? zm - z0 : z1 - zm) * tn;
    const nY = Math.cos(th) * 0.06, nZ = side * Math.sin(th) * 0.06;
    let pieces = [[-Lx / 2, Lx / 2, -Ls / 2, Ls / 2]];
    for (const h of holes) {
      const np = [];
      for (const p of pieces) {
        if (h[0] >= p[1] || h[1] <= p[0] || h[2] >= p[3] || h[3] <= p[2]) { np.push(p); continue; }
        if (h[0] > p[0]) np.push([p[0], h[0], p[2], p[3]]);
        if (h[1] < p[1]) np.push([h[1], p[1], p[2], p[3]]);
        if (h[2] > p[2]) np.push([Math.max(p[0], h[0]), Math.min(p[1], h[1]), p[2], h[2]]);
        if (h[3] < p[3]) np.push([Math.max(p[0], h[0]), Math.min(p[1], h[1]), h[3], p[3]]);
      }
      pieces = np;
    }
    for (const [u0, u1, v0, v1] of pieces) {
      const g = new THREE.BoxGeometry(u1 - u0, 0.12, v1 - v0); g.translate((u0 + u1) / 2, 0, (v0 + v1) / 2); boxUV(g, 2);
      xf(g, xm, ym + nY, zm + nZ, side < 0 ? -th : th, 0, 0); add('slate', g);
    }
    return { zm, ym };
  };
  slope(-1, []);
  const ns = slope(1, [[-5.2, -4.0, -0.8, 0.6]]);
  // loose slates & battens around the hole
  for (let i = 0; i < 6; i++) { const g = new THREE.BoxGeometry(0.3, 0.012, 0.45); g.translate(RR(-5.5, -3.8), 0.08, RR(-1.1, 0.9)); g.rotateY(RR(-0.4, 0.4)); boxUV(g, 2); xf(g, xm, ns.ym + 0.05, ns.zm + 0.04, th + RR(-0.15, 0.1), 0, 0); add('slate', g); }
  for (let i = 0; i < 4; i++) { const g = new THREE.BoxGeometry(i === 2 ? 0.6 : 1.4, 0.025, 0.05); g.translate(-4.6 - (i === 2 ? 0.4 : 0), -0.08, -0.6 + i * 0.4); xf(g, xm, ns.ym, ns.zm, th, 0, 0); add('woodRaw', g); }
  for (let i = 0; i < 7; i++) { const g = new THREE.BoxGeometry(0.06, 0.12, Ls); g.translate(-6.5 + i * 0.45 - xm, -0.14, 0); xf(g, xm, ns.ym, ns.zm, th, 0, 0); add('woodDark', g); }
  // gables
  for (const gx of [x0 + t, x1]) {
    const sh = new THREE.Shape(); sh.moveTo(z0, eave); sh.lineTo(z1, eave); sh.lineTo(zc, ridge); sh.closePath();
    const g = new THREE.ExtrudeGeometry(sh, { depth: t, bevelEnabled: false }); g.rotateY(-Math.PI / 2); g.translate(gx, 0, 0);
    g.computeVertexNormals(); boxUV(g, 1.8); tint(g, brickTint); add('brick', g);
    for (const sd of [-1, 1]) {
      const bx = gx === x1 ? x1 + 0.3 : x0 - 0.3;
      const L = Ls + 0.05, zmid = sd < 0 ? (z0 - 0.45 + zc) / 2 : (zc + z1 + 0.45) / 2;
      RB('paintCream', 0.04, 0.24, L, bx, eave + (sd < 0 ? zmid - z0 : z1 - zmid) * tn - 0.02, zmid, sd < 0 ? -th : th, 0, 0, { uv: 1 });
    }
  }
  const ridgeG = new THREE.CylinderGeometry(0.11, 0.11, Lx, 8, 1); ridgeG.rotateZ(Math.PI / 2); ridgeG.translate(xm, ridge + 0.1, zc); add('pot', ridgeG);
  // chimney
  B('brick', -1.1, 0.1, ridge - 1.2, ridge + 1.15, 9.7, 10.7, { seg: 0.6, uv: 1.8, tint: () => [0.75, 0.72, 0.7] });
  B('stone', -1.2, 0.2, ridge + 1.15, ridge + 1.27, 9.6, 10.8, { uv: 0.8 });
  cyl('pot', 0.13, 0.11, ridge + 1.27, ridge + 1.8, -0.75, 10.2, 10); cyl('pot', 0.13, 0.12, ridge + 1.27, ridge + 1.5, -0.25, 10.2, 10);
  // gutters & downpipes (north side)
  const gut = new THREE.CylinderGeometry(0.07, 0.07, Lx - 0.2, 8, 1, true, 0, Math.PI); gut.rotateZ(Math.PI / 2); gut.rotateX(Math.PI); gut.translate(xm, eave - 0.32, z1 + 0.5); add('iron', gut);
  cyl('iron', 0.045, 0.045, 0.3, eave - 0.3, x1 - 0.2, z1 + 0.1, 8);
  cyl('iron', 0.045, 0.045, 2.4, eave - 0.3, x0 + 0.2, z1 + 0.1, 8);
  RB('iron', 0.09, 1.6, 0.09, x0 + 0.9, 1.08, z1 + 0.9, Math.PI / 2 - 0.1, 0.7, 0);

  // windows
  const frame = (side) => (key, u0, u1, y0, y1, w0, w1, o = {}) => {
    if (side === 'N') return B(key, u0, u1, y0, y1, z1 - w1, z1 - w0, o);
    if (side === 'S') return B(key, u0, u1, y0, y1, z0 + w0, z0 + w1, o);
    if (side === 'W') return B(key, x0 + w0, x0 + w1, y0, y1, u0, u1, o);
    return B(key, x1 - w1, x1 - w0, y0, y1, u0, u1, o);
  };
  const windowUnit = (side, o, state) => {
    const L = frame(side), { a0, a1, b0, b1 } = o, fw = 0.07, f0 = 0.08, f1 = 0.17;
    L('stone', a0 - 0.08, a1 + 0.08, b0 - 0.08, b0, -0.07, 0.12, { uv: 2.5 });
    L('stone', a0 - 0.12, a1 + 0.12, b1, b1 + 0.2, -0.015, 0.1, { uv: 2.5 });
    if (state === 'hole') return;
    L('paintCream', a0, a1, b0, b0 + fw, f0, f1); L('paintCream', a0, a1, b1 - fw, b1, f0, f1);
    L('paintCream', a0, a0 + fw, b0, b1, f0, f1); L('paintCream', a1 - fw, a1, b0, b1, f0, f1);
    const ym = (b0 + b1) / 2, um = (a0 + a1) / 2;
    L('paintCream', a0, a1, ym - 0.03, ym + 0.03, f0 + 0.01, f1 - 0.01);
    L('paintCream', um - 0.02, um + 0.02, b0, b1, f0 + 0.02, f1 - 0.02);
    const panes = [[a0 + fw, um - 0.02, b0 + fw, ym - 0.03], [um + 0.02, a1 - fw, b0 + fw, ym - 0.03], [a0 + fw, um - 0.02, ym + 0.03, b1 - fw], [um + 0.02, a1 - fw, ym + 0.03, b1 - fw]];
    for (const p of panes) {
      const r = R();
      if (state === 'broken' && r < 0.4) continue;
      L(state === 'broken' && r < 0.85 ? 'glassBroken' : 'glass', p[0], p[1], p[2], p[3], 0.124, 0.13, { uv: 0.55 });
    }
    if (state === 'boarded') {
      for (let i = 0; i < 4; i++) {
        const yc = b0 + 0.2 + i * (b1 - b0 - 0.4) / 3, len = a1 - a0 + RR(0.1, 0.35), uc = (a0 + a1) / 2 + RR(-0.08, 0.08), rot = RR(-0.12, 0.12);
        if (side === 'N' || side === 'S') RB('woodRaw', len, 0.17, 0.025, uc, yc, side === 'N' ? z1 + 0.02 : z0 - 0.02, 0, 0, rot);
        else RB('woodRaw', 0.025, 0.17, len, side === 'W' ? x0 - 0.02 : x1 + 0.02, yc, uc, rot, 0, 0);
      }
    }
  };
  windowUnit('N', north[0], 'broken'); windowUnit('N', north[2], 'glass'); windowUnit('N', north[3], 'boarded'); windowUnit('N', north[4], 'boarded');
  windowUnit('S', south[0], 'broken'); windowUnit('S', south[2], 'broken'); windowUnit('S', south[3], 'boarded');
  windowUnit('W', west[0], 'hole'); windowUnit('E', east[0], 'boarded');
  // west window: shattered frame remnants
  const LW = frame('W');
  LW('paintCream', 9.5, 10.9, sill, sill + 0.07, 0.08, 0.17); LW('paintCream', 9.5, 9.57, sill, top + 0.15, 0.08, 0.17); LW('paintCream', 10.83, 10.9, sill, top + 0.15, 0.08, 0.17);
  LW('paintCream', 9.5, 10.9, top + 0.08, top + 0.15, 0.08, 0.17);
  RB('paintCream', 0.05, 0.05, 1.0, x0 + 0.12, sill + 0.9, 10.1, 0.6, 0, 0);
  // doors & frames
  const doorFrame = (side, a0, a1) => { const L = frame(side); L('paintGreen', a0, a0 + 0.07, fl, dtop, 0.03, 0.22); L('paintGreen', a1 - 0.07, a1, fl, dtop, 0.03, 0.22); L('paintGreen', a0, a1, dtop - 0.07, dtop, 0.03, 0.22); L('stone', a0, a1, fl - 0.05, fl + 0.012, -0.15, t, { uv: 2.5 }); };
  doorFrame('N', -4.3, -3.2); doorFrame('S', -4.3, -3.2); doorFrame('S', 3.2, 4.2);
  const leaf = (key, hx, hy, hz, ry, rx = 0, w = 0.96, h = 2.2) => {
    const parts = [new THREE.BoxGeometry(w, h, 0.045).translate(w / 2, h / 2, 0)];
    for (const [px, py, pw, ph] of [[0.1, 0.12, 0.33, 0.85], [0.53, 0.12, 0.33, 0.85], [0.1, 1.15, 0.33, 0.9], [0.53, 1.15, 0.33, 0.9]])
      for (const sd of [-1, 1]) parts.push(new THREE.BoxGeometry(pw * w / 0.96, ph, 0.016).translate((px + pw / 2) * w / 0.96, py + ph / 2, sd * 0.028));
    for (const p of parts) { boxUV(p, 1); xf(p, hx, hy, hz, rx, ry, 0); add(key, p); }
  };
  leaf('paintGreen', -4.23, fl, IN.z1 + 0.02, 1.67);
  colOBox(-4.23 + Math.cos(1.67) * 0.48, IN.z1 + 0.02 - Math.sin(1.67) * 0.48, 0.48, 0.05, 1.67, fl, fl + 2.2);
  leaf('paintCream', -0.5, fl, 11.62, -Math.PI / 2, 0, 0.86);
  leaf('paintGreen', 3.27, fl, z0 + 0.12, 0, 0, 0.86);
  colBox(3.2, 4.2, z0 - 0.1, z0 + t, fl, dtop);
  for (let i = 0; i < 3; i++) RB('woodRaw', 1.25, 0.16, 0.025, 3.7, fl + 0.5 + i * 0.6, z0 - 0.03, 0, 0, RR(-0.2, 0.2));
  leaf('paintGreen', -5.4, fl + 0.06, 10.5, 0.25, -Math.PI / 2 + 0.05);
  // ticket hatch
  B('woodRaw', px0 - 0.28, px0, fl + 0.93, fl + 0.97, 7.85, 8.95, { uv: 1 });
  B('paintGreen', px0 - 0.05, px0, fl + 1.8, fl + 1.88, 7.85, 8.95);
  B('glassBroken', -0.51, -0.49, fl + 0.97, fl + 1.8, 7.9, 8.9, { uv: 0.8 });
  // fireplace
  B('brickIn', -1.05, px0, fl, ceil, 9.3, 11.1, { seg: 0.6, col: true, uv: 1.8 });
  B('soot', -1.065, -0.9, fl, fl + 0.85, 9.8, 10.6);
  B('iron', -1.12, -1.05, fl, fl + 1.05, 9.62, 9.8); B('iron', -1.12, -1.05, fl, fl + 1.05, 10.6, 10.78); B('iron', -1.12, -1.05, fl + 0.85, fl + 1.05, 9.62, 10.78);
  for (let i = 0; i < 5; i++) B('iron', -1.2, -1.0, fl + 0.12 + i * 0.07, fl + 0.14 + i * 0.07, 9.9, 10.5);
  B('stone', -1.55, -1.05, fl, fl + 0.04, 9.45, 10.95, { uv: 0.8 });
  B('woodDark', -1.28, -1.0, fl + 1.24, fl + 1.3, 9.2, 11.2);
  // benches inside
  bench(-6.3, 10.2, Math.PI / 2, 2.4, true); colBox(-6.66, -5.95, 9.0, 11.4, fl, fl + 1);
  bench(-5.45, 12.45, Math.PI, 1.7, true); colBox(-6.3, -4.6, 12.1, 12.86, fl, fl + 1);
  // overturned chair & bucket
  RB('woodDark', 0.42, 0.04, 0.42, -2.3, fl + 0.22, 9.4, 1.4, 0.5, 0);
  for (const [dx, dz] of [[-0.18, -0.18], [0.18, -0.18], [-0.18, 0.18], [0.18, 0.18]]) RB('woodDark', 0.035, 0.035, 0.45, -2.3 + dx, fl + 0.22 + dz * 0.3, 9.4 + dz * 0.6 + 0.2, 0.2, 0.5, 0);
  cyl('iron', 0.12, 0.15, fl, fl + 0.28, -1.6, 12.4, 10);
  // glass shards on floor under broken windows
  for (let i = 0; i < 30; i++) RB('glass', RR(0.03, 0.12), 0.004, RR(0.03, 0.1), RR(-6.2, -5.2), fl + 0.004, RR(7.6, 8.2), 0, R() * 3, 0, { uv: 0.3 });
  for (let i = 0; i < 20; i++) RB('glass', RR(0.03, 0.12), 0.004, RR(0.03, 0.1), RR(-6.5, -5.6), fl + 0.004, RR(9.4, 11.0), 0, R() * 3, 0, { uv: 0.3 });
  // ticket office contents (visible through hatch)
  B('woodDark', -0.36, 0.6, fl, fl + 0.9, 7.6, 9.2); B('woodDark', 0.9, 1.2, fl, fl + 1.9, 10.2, 12.8);
  B('paintGreen', 3.3, 4.3, fl, fl + 1.1, 12.2, 12.85);
  for (let i = 0; i < 4; i++) B('woodRaw', 0.9, 1.2, fl + 0.4 + i * 0.4, fl + 0.43 + i * 0.4, 10.2, 12.8);
  // signs on facades
  return { ridge, zc };
}
function bench(x, z, ry, len, inside = false) {
  const y0 = inside ? BLD.fl : groundH(x, z);
  const parts = [];
  const slat = (w, h, d, px, py, pz, rx = 0) => parts.push(['woodRaw', new THREE.BoxGeometry(w, h, d).translate(0, 0, 0), px, py, pz, rx]);
  for (let i = 0; i < 3; i++) if (!(len < 2 && i === 1 && !inside)) slat(len, 0.03, 0.09, 0, 0.45, -0.1 + i * 0.105);
  for (let i = 0; i < 2; i++) slat(len, 0.09, 0.03, 0, 0.62 + i * 0.16, -0.22 - i * 0.03, -0.2);
  const ends = len > 2 ? [-len / 2 + 0.12, 0, len / 2 - 0.12] : [-len / 2 + 0.12, len / 2 - 0.12];
  for (const ex of ends) {
    parts.push(['ironGreen', new THREE.BoxGeometry(0.04, 0.45, 0.05), ex, 0.225, 0.12, 0]);
    parts.push(['ironGreen', new THREE.BoxGeometry(0.04, 0.85, 0.05), ex, 0.42, -0.2, -0.2]);
    parts.push(['ironGreen', new THREE.BoxGeometry(0.04, 0.05, 0.42), ex, 0.43, -0.03, 0]);
  }
  for (const [key, g, px, py, pz, rx] of parts) {
    xf(g, px, py, pz, rx, 0, 0); boxUV(g, 1); xf(g, x, y0, z, 0, ry, 0); add(key, g);
  }
}

// ------------------------------------------------------------ platform & canopy
function platformAndCanopy() {
  const { x0, x1, z0, z1, y } = PLAT;
  const pt = (x, yy, z) => { const k = 0.85 + (TX.N(x * 0.05, yy * 0.2 + z * 0.05) - 0.5) * 0.4; const d = smooth(0.5, -0.1, yy); return [k * (1 - 0.35 * d), k * (1 - 0.25 * d), k * (1 - 0.4 * d)]; };
  B('brick', x0, x1, -0.1, y - 0.08, z0, z0 + 0.4, { seg: 0.6, tint: pt, uv: 1.8 });
  B('brick', x0 - 0.35, x0, -0.1, y, z0, z1, { seg: 0.6, tint: pt, uv: 1.8 });
  const surfT = (x, yy, z) => {
    let k = 0.95 + (TX.N(x * 0.11 + 0.3, z * 0.11) - 0.5) * 0.35;
    if (x > CAN.x0 - 0.6 && x < CAN.x1 + 0.6) k *= 1 - 0.35 * smooth(CAN.zf - 0.8, CAN.zf + 1.2, z);
    k *= 1 - 0.18 * smooth(6.0, 7.2, z);
    return [k, k, k * 0.97];
  };
  B('flag', x0, x1, y - 0.3, y, z0 + 0.52, z1, { seg: 0.5, uv: 3, tint: surfT });
  // coping stones
  for (let x = x0; x < x1 - 0.01; x += 0.92) {
    const w = Math.min(0.9, x1 - x), cx = x + w / 2;
    const near = Math.abs(cx + 19.5) < 2.2;
    if (near && Math.abs(cx + 19.9) < 0.46) { RB('stone', w, 0.08, 0.6, cx, 0.32, 0.9, 0.5, 0.4, 0.2, { uv: 0.9 }); continue; }
    const lift = near ? RR(0.03, 0.09) : RR(0, 0.008);
    RB('stone', w - 0.015, 0.08, 0.6, cx, y - 0.04 + lift, z0 + 0.22, near ? RR(-0.12, 0.08) : RR(-0.01, 0.01), near ? RR(-0.1, 0.1) : RR(-0.008, 0.008), near ? RR(-0.1, 0.1) : 0, { uv: 0.9 });
  }
  // faded edge line
  B('paintCream', x0, x1, y + 0.001, y + 0.004, z0 + 0.44, z0 + 0.5, { uv: 0.5 });
  // ramp
  sloped('flag', RAMP.x0, RAMP.x1, z0 + 0.52, RAMP.z1, 0, y, RAIL_TOP, { uv: 3 });
  sloped('brick', RAMP.x0, RAMP.x1, z0, z0 + 0.4, -0.1, y - 0.08, RAIL_TOP - 0.08, { uv: 1.8 });
  sloped('stone', RAMP.x0, RAMP.x1, z0 - 0.08, z0 + 0.52, 0, y, RAIL_TOP, { uv: 0.9 });
  sloped('brick', RAMP.x0, RAMP.x1, RAMP.z1, RAMP.z1 + 0.3, -0.1, y + 0.05, RAIL_TOP + 0.05, { uv: 1.8 });
  for (let i = 0; i <= 3; i++) { const x = RAMP.x0 + i * 2, yy = lerp(y, RAIL_TOP, i / 3) + 0.05; cyl('iron', 0.025, 0.025, yy, yy + 0.95, x, RAMP.z1 + 0.15, 6); }
  const hr = new THREE.CylinderGeometry(0.025, 0.025, Math.hypot(6, y - RAIL_TOP), 6); hr.rotateZ(Math.PI / 2 + Math.atan2(y - RAIL_TOP, 6)); hr.translate(RAMP.x0 + 3, (y + RAIL_TOP) / 2 + 1.0, RAMP.z1 + 0.15); add('iron', hr);
  colBox(RAMP.x0, RAMP.x1, RAMP.z1, RAMP.z1 + 0.3, 0, 2.2);
  // root tree on platform: roots and heaved slabs
  const tx = -19.5, tz = 4.6;
  for (let k = 0; k < 8; k++) {
    const a = k / 8 * Math.PI * 2 + RR(-0.3, 0.3), len = RR(1.4, 2.8);
    const pts = []; for (let i = 0; i <= 4; i++) { const f = i / 4; pts.push(V(tx + Math.cos(a) * (0.2 + len * f) + RR(-0.1, 0.1), y + 0.1 - f * 0.1 + RR(0, 0.03), tz + Math.sin(a) * (0.2 + len * f) + RR(-0.1, 0.1))); }
    tube('bark', pts, 0.13, 0.03, 6, 1);
  }
  tube('bark', [V(tx - 0.2, y + 0.08, tz - 0.3), V(tx - 0.5, y + 0.06, tz - 1.6), V(tx - 0.6, y + 0.05, tz - 2.9), V(tx - 0.7, y - 0.05, z0 - 0.05), V(tx - 0.75, 0.55, z0 - 0.1)], 0.12, 0.04, 6, 1);
  for (let i = 0; i < 7; i++) { const a = i / 7 * 6.28 + 0.3, r = RR(0.8, 1.4); RB('flag', RR(0.5, 0.8), 0.08, RR(0.45, 0.6), tx + Math.cos(a) * r, y + RR(0.02, 0.08), tz + Math.sin(a) * r, RR(-0.18, 0.18), R() * 3, RR(-0.18, 0.18), { uv: 3 }); }
  // canopy
  const { x0: cx0, x1: cx1, zb, zf, yb, yf, colZ } = CAN;
  const yAt = (z) => yf + (z - zf) * (yb - yf) / (zb - zf);
  const ang = Math.atan2(yb - yf, zb - zf), sl = Math.hypot(zb - zf, yb - yf);
  for (const cx of [-10, -6, -2, 2, 6]) {
    const top = yAt(colZ) - 0.2;
    cyl('ironGreen', 0.085, 0.07, y, top, cx, colZ, 10);
    cyl('ironGreen', 0.15, 0.13, y, y + 0.4, cx, colZ, 10);
    cyl('ironGreen', 0.09, 0.15, top - 0.28, top, cx, colZ, 10);
    colCircle(cx, colZ, 0.2, y, top);
    for (const d of [-1, 1]) {
      const pts = []; for (let i = 0; i <= 6; i++) { const a = i / 6 * Math.PI / 2; pts.push(V(cx + d * (0.7 - 0.7 * Math.cos(a)), top - 0.7 + 0.7 * Math.sin(a) + 0.02, colZ)); }
      tube('ironGreen', pts, 0.03, 0.03, 5, 1);
    }
    const pts2 = []; for (let i = 0; i <= 6; i++) { const a = i / 6 * Math.PI / 2; pts2.push(V(cx, top - 0.8 + 0.8 * Math.sin(a), colZ + (0.8 - 0.8 * Math.cos(a)))); }
    tube('ironGreen', pts2, 0.03, 0.03, 5, 1);
  }
  B('ironGreen', cx0, cx1, yAt(colZ) - 0.2, yAt(colZ) - 0.04, colZ - 0.06, colZ + 0.06, { uv: 1 });
  B('woodDark', cx0, cx1, yb - 0.2, yb, zb - 0.12, zb, { uv: 1 });
  for (let x = cx0; x <= cx1 + 0.01; x += 1.0) RB('woodDark', 0.07, 0.14, sl + 0.1, x, (yb + yf) / 2 - 0.08, (zb + zf) / 2 - 0.05, -ang, 0, 0);
  const missing = new Set([3, 4, 9, 15, 16]);
  for (let i = 0; i < 20; i++) {
    const x = cx0 + 0.5 + i;
    if (missing.has(i)) continue;
    const sag = i === 10 ? 0.12 : 0;
    RB('corr', 1.02, 0.012, sl + 0.25, x, (yb + yf) / 2 + 0.005 - sag, (zb + zf) / 2 - 0.12, -ang + (i === 10 ? 0.08 : 0), 0, i === 10 ? 0.05 : 0, { uv: 1 });
  }
  RB('corr', 1.0, 0.012, sl * 0.6, cx0 + 4.4, 1.25, 4.6, 0.25, 0.3, 0.12, { uv: 1 });
  // valance (dagger boards)
  const vb = new THREE.Shape(); vb.moveTo(-0.065, 0); vb.lineTo(0.065, 0); vb.lineTo(0.065, -0.42); vb.lineTo(0, -0.54); vb.lineTo(-0.065, -0.42); vb.closePath();
  const vg = new THREE.ExtrudeGeometry(vb, { depth: 0.022, bevelEnabled: false });
  for (let x = cx0 + 0.07; x < cx1; x += 0.14) {
    if (R() < 0.07) continue;
    const g = vg.clone(); if (R() < 0.08) g.scale(1, 0.6, 1);
    g.translate(x, yf + 0.02, zf - 0.1); boxUV(g, 1); add('paintCream', g);
  }
  for (let z = zf; z < zb; z += 0.14) {
    if (R() < 0.1) continue;
    const g = vg.clone(); g.rotateY(Math.PI / 2); g.translate(cx0 - 0.05, yAt(z) + 0.02, z + 0.07); boxUV(g, 1); add('paintCream', g);
  }
  const gut = new THREE.CylinderGeometry(0.06, 0.06, cx1 - cx0 - 3, 8, 1, true, 0, Math.PI); gut.rotateZ(Math.PI / 2); gut.rotateX(Math.PI); gut.translate((cx0 + cx1) / 2 - 1.5, yf + 0.05, zf - 0.2); add('iron', gut);
  const gb = new THREE.CylinderGeometry(0.06, 0.06, 3, 8, 1, true, 0, Math.PI); gb.rotateZ(Math.PI / 2 - 0.5); gb.translate(cx1 - 1.3, yf - 0.68, zf - 0.2); add('iron', gb);
  return { yAt, missing };
}

// ------------------------------------------------------------ track & crossing
function trackAndCrossing() {
  const sh = new THREE.Shape(); sh.moveTo(-2.4, 0); sh.lineTo(-1.8, 0.2); sh.lineTo(1.8, 0.2); sh.lineTo(2.4, 0); sh.closePath();
  const bg = new THREE.ExtrudeGeometry(sh, { depth: 200, steps: 50, bevelEnabled: false }); bg.rotateY(Math.PI / 2); bg.translate(-100, 0, 0);
  bg.computeVertexNormals(); boxUV(bg, 1);
  tint(bg, (x, y, z) => { const k = 0.85 + (TX.N(x * 0.05, z * 0.3) - 0.5) * 0.5; const rr = Math.abs(Math.abs(z) - 0.72) < 0.25 ? 0.82 : 1; return [k * rr * 1.04, k * rr * 0.95, k * rr * 0.88]; });
  add('ballast', bg);
  for (const zr of [-0.7175, 0.7175]) {
    B('rail', -100, 100, 0.28, 0.295, zr - 0.07, zr + 0.07, { uv: 1 });
    B('rail', -100, 100, 0.295, 0.385, zr - 0.009, zr + 0.009, { uv: 1 });
    B('rail', -100, 100, 0.385, RAIL_TOP, zr - 0.036, zr + 0.036, { uv: 1 });
  }
  for (let x = -99.5; x < 100; x += 0.7) {
    if (R() < 0.04) continue;
    const rot = R() < 0.1;
    const k = rot ? 0.6 : 0.85 + R() * 0.3;
    RB('sleeper', 0.25, 0.14, 2.6, x + RR(-0.04, 0.04), 0.21, RR(-0.04, 0.04), 0, RR(-0.04, 0.04), rot ? RR(-0.06, 0.06) : 0, { tint: () => [k, k * 0.96, k * 0.92] });
    for (const zr of [-0.7175, 0.7175]) B('iron', x - 0.1, x + 0.1, 0.28, 0.33, zr - 0.13, zr + 0.13, { uv: 0.4 });
  }
  // crossing boards
  const zs = [];
  for (let z = -0.6; z <= 0.61; z += 0.24) zs.push(z);
  for (let z = 0.84; z < 1.5; z += 0.24) zs.push(z);
  for (let z = -0.84; z > -2.35; z -= 0.24) zs.push(z);
  for (const z of zs) RB('woodRaw', CROSS.x1 - CROSS.x0 - RR(0, 0.15), 0.15, 0.22, (CROSS.x0 + CROSS.x1) / 2 + RR(-0.05, 0.05), RAIL_TOP - 0.075 + RR(-0.01, 0.0), z, 0, RR(-0.01, 0.01), 0, { uv: 1, tint: () => { const k = RR(0.7, 1.0); return [k, k, k]; } });
}

// ------------------------------------------------------------ props
function signPost(T, map, w, h, x, y, z, ry, M, scene, postH = null, two = true) {
  const mat = new THREE.MeshStandardMaterial({ map, roughness: 0.75 });
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat); m.position.set(x, y, z); m.rotation.y = ry; m.castShadow = true; m.receiveShadow = true; scene.add(m);
  const back = new THREE.BoxGeometry(w + 0.06, h + 0.06, 0.04); back.translate(0, 0, -0.025); boxUV(back, 1); xf(back, x, y, z, 0, ry, 0); add('woodDark', back);
  if (postH) {
    const gy = groundH(x, z);
    for (const s of two ? [-1, 1] : [0]) { const ox = Math.cos(ry) * s * (w / 2 - 0.1), oz = -Math.sin(ry) * s * (w / 2 - 0.1); const g = new THREE.BoxGeometry(0.09, y - gy + h / 2, 0.09); g.translate(x + ox, gy + (y - gy + h / 2) / 2, z + oz - Math.cos(ry) * 0.06); boxUV(g, 1); add('paintGreen', g); colCircle(x + ox, z + oz, 0.12, gy, y); }
  }
  return m;
}
function lampPost(x, z, lean = 0) {
  const y = groundH(x, z);
  const g = new THREE.CylinderGeometry(0.05, 0.09, 3.3, 8); g.translate(0, 1.65, 0); xf(g, x, y, z, lean, 0.4, lean * 0.5); add('ironGreen', g);
  const top = V(0, 3.4, 0).applyEuler(new THREE.Euler(lean, 0.4, lean * 0.5, 'YXZ')).add(V(x, y, z));
  B('ironGreen', top.x - 0.2, top.x + 0.2, top.y, top.y + 0.04, top.z - 0.2, top.z + 0.2);
  B('ironGreen', top.x - 0.14, top.x + 0.14, top.y + 0.45, top.y + 0.5, top.z - 0.14, top.z + 0.14);
  for (const [dx, dz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) B('ironGreen', top.x + dx * 0.16 - 0.015, top.x + dx * 0.16 + 0.015, top.y, top.y + 0.47, top.z + dz * 0.16 - 0.015, top.z + dz * 0.16 + 0.015);
  B('glassBroken', top.x - 0.15, top.x + 0.15, top.y + 0.05, top.y + 0.44, top.z - 0.155, top.z - 0.15, { uv: 0.4 });
  B('glass', top.x - 0.155, top.x - 0.15, top.y + 0.05, top.y + 0.44, top.z - 0.15, top.z + 0.15, { uv: 0.4 });
  cyl('ironGreen', 0.1, 0.0, top.y + 0.5, top.y + 0.7, top.x, top.z, 8);
  colCircle(x, z, 0.14, y, y + 3);
}
function props(T, scene) {
  // timetable case under canopy
  const tz = BLD.z0;
  B('woodDark', -0.4, 0.9, 1.85, 3.15, tz - 0.08, tz - 0.005, { uv: 1 });
  const poster = new THREE.Mesh(new THREE.PlaneGeometry(1.12, 1.16), new THREE.MeshStandardMaterial({ map: T.timetable, roughness: 0.95 }));
  poster.position.set(0.25, 2.5, tz - 0.085); poster.rotation.y = Math.PI; poster.rotation.z = 0.01; poster.receiveShadow = true; scene.add(poster);
  B('paintGreen', -0.4, 0.9, 1.85, 1.92, tz - 0.16, tz - 0.08); B('paintGreen', -0.4, 0.9, 3.08, 3.15, tz - 0.16, tz - 0.08);
  B('paintGreen', -0.4, -0.33, 1.85, 3.15, tz - 0.16, tz - 0.08); B('paintGreen', 0.83, 0.9, 1.85, 3.15, tz - 0.16, tz - 0.08);
  // case door hanging open with broken glass
  const dg = []; const dw = 1.24, dh = 1.26;
  dg.push(['paintGreen', new THREE.BoxGeometry(dw, 0.06, 0.04).translate(dw / 2, 0.03, 0)], ['paintGreen', new THREE.BoxGeometry(dw, 0.06, 0.04).translate(dw / 2, dh - 0.03, 0)]);
  dg.push(['paintGreen', new THREE.BoxGeometry(0.06, dh, 0.04).translate(0.03, dh / 2, 0)], ['paintGreen', new THREE.BoxGeometry(0.06, dh, 0.04).translate(dw - 0.03, dh / 2, 0)]);
  dg.push(['glassBroken', new THREE.BoxGeometry(dw - 0.1, dh - 0.1, 0.005).translate(dw / 2, dh / 2, 0)]);
  for (const [k, g] of dg) { boxUV(g, 0.9); xf(g, -0.4, 1.86, tz - 0.18, 0, Math.PI + 0.95, -0.05); add(k, g); }
  for (let i = 0; i < 25; i++) RB('glass', RR(0.03, 0.14), 0.004, RR(0.03, 0.12), RR(-0.6, 1.2), PLAT.y + 0.004, RR(tz - 1.0, tz - 0.15), 0, R() * 3, 0, { uv: 0.3 });
  bench(0.25, 6.65, 0, 1.6); colBox(-0.6, 1.1, 6.35, 7.0, PLAT.y, PLAT.y + 1);
  bench(-15, 6.55, 0, 1.9); colBox(-16, -14, 6.25, 6.9, PLAT.y, PLAT.y + 1);
  // fire buckets
  B('paintCream', -6.95, -6.4, 2.25, 2.33, tz - 0.08, tz);
  for (let i = 0; i < 3; i++) { const g = new THREE.CylinderGeometry(0.13, 0.06, 0.3, 10, 1); g.translate(-6.86 + i * 0.0, 0, 0); xf(g, -6.84 + i * 0.0 + (i - 1) * 0.0, 2.05, tz - 0.16, 0, 0, 0); }
  for (let i = 0; i < 2; i++) { const g = new THREE.CylinderGeometry(0.12, 0.06, 0.28, 10, 1); g.translate(-6.85 + i * 0.32 - (i ? 0 : 0), 2.08, tz - 0.17); add('fireRed', g); }
  // lamps, name boards, signs
  lampPost(-17, 6.6, 0.12); lampPost(12.5, 6.7, 0); lampPost(3.2, 19.5, -0.05);
  signPost(T, T.nameBoard, 3.0, 0.56, 9.2 + 2.6, 2.4, 6.75, Math.PI, null, scene, true);
  signPost(T, T.nameBoard, 3.0, 0.56, -21.5, 2.3, 6.9, Math.PI, null, scene, true);
  signPost(T, T.nameBoard, 2.6, 0.48, -3.75, 3.95, BLD.z1 + 0.04, 0, null, scene, null);
  signPost(T, T.waiting, 0.95, 0.18, -3.75, 3.58, BLD.z0 - 0.03, Math.PI, null, scene, null);
  signPost(T, T.enamel, 0.5, 0.75, -2.75, 2.45, BLD.z0 - 0.03, Math.PI + 0.0, null, scene, null);
  signPost(T, T.crossing, 0.6, 0.6, 21.9, 1.75, 2.35, 0, null, scene, true, false);
  signPost(T, T.crossing, 0.6, 0.6, 25.7, 1.65, -2.9, Math.PI, null, scene, true, false);
  signPost(T, T.footpath, 0.9, 0.22, 26.2, 1.65, -4.4, Math.PI / 2 + 0.3, null, scene, true, false);
  // clock inside above entrance door
  const clk = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.07, 24), [new THREE.MeshStandardMaterial({ color: 0x2d2a26, roughness: 0.5 }), new THREE.MeshStandardMaterial({ map: T.clock, roughness: 0.6 }), new THREE.MeshStandardMaterial({ color: 0x2d2a26 })]);
  clk.rotation.x = -Math.PI / 2; clk.rotation.z = Math.PI; clk.position.set(-3.75, BLD.fl + 2.75, BLD.z1 - BLD.t - 0.06); clk.rotation.order = 'XYZ'; scene.add(clk);
  // luggage trolley & churns
  RB('woodRaw', 1.6, 0.06, 0.8, 7.8, PLAT.y + 0.32, 5.6, 0, 0.3, 0.06, { uv: 1 });
  for (const [dx, dz] of [[-0.6, -0.3], [0.6, -0.3], [-0.6, 0.3]]) { const w = new THREE.CylinderGeometry(0.17, 0.17, 0.05, 12); w.rotateX(Math.PI / 2); xf(w, 7.8 + dx * Math.cos(0.3) + dz * Math.sin(0.3), PLAT.y + 0.17, 5.6 - dx * Math.sin(0.3) + dz * Math.cos(0.3) + Math.sign(dz) * 0.06, 0, 0.3, 0); add('iron', w); }
  RB('iron', 0.05, 0.9, 0.05, 7.05, PLAT.y + 0.7, 5.85, 0, 0.3, 0.5);
  colOBox(7.8, 5.6, 0.85, 0.45, 0.3, PLAT.y, PLAT.y + 0.5);
  for (const [cx, cz, tilt] of [[9.6, 6.6, 0], [10.05, 6.75, 0], [9.2, 5.9, Math.PI / 2]]) {
    const g = new THREE.CylinderGeometry(0.2, 0.22, 0.75, 12); g.translate(0, 0.375, 0); if (tilt) { g.rotateZ(tilt); g.translate(0, -0.18, 0); } xf(g, cx, PLAT.y + (tilt ? 0.2 : 0), cz, 0, R(), 0); add('iron', g);
    colCircle(cx, cz, 0.25, PLAT.y, PLAT.y + 0.8);
  }
  // forecourt gate piers & fallen gate
  for (const gx of [-6.4, -1.1]) { B('brick', gx - 0.25, gx + 0.25, 0.8, 2.3, 21.25, 21.75, { col: true, tint: () => [0.8, 0.78, 0.76] }); B('stone', gx - 0.3, gx + 0.3, 2.3, 2.42, 21.2, 21.8, { uv: 2.5 }); }
  for (let i = 0; i < 5; i++) RB('paintCream', 2.2, 0.1, 0.04, -8.3, groundH(-8.3, 22.5) + 0.05 + i * 0.01, 22.3 + i * 0.25, -Math.PI / 2 + 0.05, 0.4, 0, { uv: 1 });
  for (const dx of [-1, 0, 1]) RB('paintCream', 0.08, 0.04, 1.1, -8.3 + dx * 1.0 * Math.cos(0.4), groundH(-8.3, 22.8) + 0.1, 22.8 - dx * Math.sin(0.4), 0, 0.4, 0, { uv: 1 });
  // fences behind platform (post and rail, broken in places)
  const fence = (xa, xb, z) => { for (let x = xa; x <= xb; x += 2.0) { const gy = groundH(x, z); if (R() < 0.12) continue; const lean = RR(-0.1, 0.1); RB('woodRaw', 0.1, 1.15, 0.1, x, gy + 0.55, z, lean, 0, RR(-0.05, 0.05)); if (x + 2 <= xb && R() > 0.18) { RB('woodRaw', 2.05, 0.09, 0.04, x + 1, gy + 0.85 + RR(-0.03, 0.03), z + 0.07, 0, 0, RR(-0.03, 0.03)); if (R() > 0.3) RB('woodRaw', 2.05, 0.09, 0.04, x + 1, gy + 0.45, z + 0.07, 0, 0, RR(-0.05, 0.05)); colBox(x, x + 2, z - 0.05, z + 0.1, gy, gy + 1.1); } } };
  fence(-24, -9, 7.35); fence(7, 15, 7.35);
  // telegraph poles with wires
  const tops = [];
  for (const x of [-85, -60, -35, -10, 15, 40, 65, 90]) {
    const z = -4.9, gy = groundH(x, z) - 0.2, lean = RR(-0.04, 0.04);
    const g = new THREE.CylinderGeometry(0.1, 0.14, 7.6, 8); g.translate(0, 3.8, 0); xf(g, x, gy, z, lean, 0, 0); add('woodDark', g);
    RB('woodDark', 0.1, 0.12, 1.5, x, gy + 7.1, z + lean * 7, 0, 0, 0);
    for (const dz of [-0.6, -0.2, 0.2, 0.6]) { cyl('ceramic', 0.035, 0.035, gy + 7.16, gy + 7.3, x, z + lean * 7 + dz, 6); }
    tops.push([x, gy + 7.3, z + lean * 7]);
    if (Math.abs(x) < 45) colCircle(x, z, 0.2, gy, gy + 8);
  }
  const wp = [];
  for (let i = 0; i < tops.length - 1; i++) for (const dz of [-0.6, -0.2, 0.2, 0.6]) {
    if (i === 4 && dz > 0.1) { // broken wire hanging down
      const a = tops[i]; for (let k = 0; k < 10; k++) { wp.push(a[0] + k * 0.5, a[1] - k * 0.6 + (k * k) * 0.02, a[2] + dz, a[0] + (k + 1) * 0.5, a[1] - (k + 1) * 0.6 + (k + 1) * (k + 1) * 0.02, a[2] + dz); } continue;
    }
    const a = tops[i], b = tops[i + 1];
    for (let k = 0; k < 16; k++) {
      const t0 = k / 16, t1 = (k + 1) / 16, s0 = Math.sin(t0 * Math.PI) * 0.7, s1 = Math.sin(t1 * Math.PI) * 0.7;
      wp.push(lerp(a[0], b[0], t0), lerp(a[1], b[1], t0) - s0, lerp(a[2], b[2], t0) + dz, lerp(a[0], b[0], t1), lerp(a[1], b[1], t1) - s1, lerp(a[2], b[2], t1) + dz);
    }
  }
  const wg = new THREE.BufferGeometry(); wg.setAttribute('position', new THREE.Float32BufferAttribute(wp, 3));
  scene.add(new THREE.LineSegments(wg, new THREE.LineBasicMaterial({ color: 0x1c1a18 })));
  // semaphore signal (west, far side)
  const sx = -36, sz = -3.0, sgy = groundH(sx, sz);
  B('woodDark', sx - 0.12, sx + 0.12, sgy, sgy + 6.5, sz - 0.12, sz + 0.12, { uv: 1, col: true });
  cyl('iron', 0.06, 0.0, sgy + 6.5, sgy + 6.9, sx, sz, 6);
  RB('signalArm', 1.3, 0.24, 0.03, sx + 0.55, sgy + 5.6, sz - 0.16, 0, 0, -0.65, { lx: 0.55 });
  for (let i = 0; i < 18; i++) B('iron', sx + 0.2, sx + 0.5, sgy + 0.3 + i * 0.33, sgy + 0.33 + i * 0.33, sz + 0.14, sz + 0.17);
  B('iron', sx + 0.18, sx + 0.21, sgy, sgy + 6.1, sz + 0.12, sz + 0.2); B('iron', sx + 0.49, sx + 0.52, sgy, sgy + 6.1, sz + 0.12, sz + 0.2);
  // fallen log by woodland path + rustic bench at viewpoint
  const lx = 6, lz = -21.5, lgy = groundH(lx, lz);
  tube('bark', [V(lx - 3.5, lgy + 0.25, lz - 1.5), V(lx, lgy + 0.3, lz - 2.2), V(lx + 3.8, groundH(lx + 3.8, lz - 3.4) + 0.22, lz - 3.4)], 0.33, 0.2, 9, 2);
  colOBox(lx, lz - 2.3, 3.8, 0.35, Math.atan2(1.9, 7.3), lgy, lgy + 0.6);
  bench(-4.6, -24.4, Math.PI, 1.8);
  return {};
}

// ------------------------------------------------------------ vegetation
function trees(list, cards, sprC) {
  for (const t of list) {
    const s = t.s, x = t.x, z = t.z, y0 = groundH(x, z) - 0.2;
    const r = TX.rng(Math.floor(x * 1000 + z * 7919) >>> 0);
    const rr = (a, b) => a + (b - a) * r();
    if (t.type === 'spruce') {
      const H = rr(11, 16) * s, R0 = rr(2.2, 3.0) * s;
      tube('bark', [V(x, y0, z), V(x, y0 + H * 0.5, z), V(x, y0 + H, z)], 0.25 * s, 0.03, 7, 1);
      colCircle(x, z, 0.3 * s, y0, y0 + 3);
      for (let h = 1.4; h < H - 0.3; h += 0.65) {
        const rad = (1 - h / H) * R0 + 0.25, n = 6;
        for (let k = 0; k < n; k++) {
          const a = k / n * Math.PI * 2 + rr(0, 1);
          const v = V(Math.cos(a), -0.28 - rr(0, 0.15), Math.sin(a)).normalize().multiplyScalar(rad / 2);
          const u = V(-Math.sin(a), 0, Math.cos(a)).multiplyScalar(0.45 * s + rad * 0.12);
          const c = V(x, y0 + h, z).add(v);
          const sh = 0.6 + 0.4 * (h / H);
          const nrm = V(Math.cos(a) * 0.7, 0.7, Math.sin(a) * 0.7).normalize();
          sprC.quad(c, u, v, [0, 0], [1, 1], nrm, [sh, sh, sh]);
          const u2 = V().crossVectors(v, u).normalize().multiplyScalar(u.length() * 0.8);
          sprC.quad(c, u2, v, [0, 0], [1, 1], nrm, [sh * 0.9, sh * 0.9, sh * 0.9]);
        }
      }
      continue;
    }
    const P = {
      maple: { H: 8.5, r0: 0.27, cy: 3.0, cr: 3.6, ch: 5.2, cell: 0, bark: 'bark', n: 120, cs: 1.45 },
      beech: { H: 10.5, r0: 0.3, cy: 3.4, cr: 4.0, ch: 6.2, cell: 1, bark: 'barkBeech', n: 135, cs: 1.55 },
      birch: { H: 11.5, r0: 0.15, cy: 4.2, cr: 2.3, ch: 6.5, cell: 2, bark: 'barkBirch', n: 85, cs: 1.1 },
      oak: { H: 9.5, r0: 0.4, cy: 2.8, cr: 4.6, ch: 5.2, cell: 3, bark: 'bark', n: 150, cs: 1.6 },
      dead: { H: 8, r0: 0.25, cy: 2.5, cr: 3, ch: 4, cell: 0, bark: 'bark', n: 0, cs: 1 },
      sycamore: { H: 8, r0: 0.26, cy: 3.0, cr: 3.4, ch: 4.6, cell: 1, bark: 'barkBeech', n: 110, cs: 1.4 },
    }[t.type];
    const H = P.H * s * rr(0.85, 1.15), lean = V(rr(-0.5, 0.5), 0, rr(-0.5, 0.5)).multiplyScalar(s);
    const tp = [V(x, y0, z), V(x + lean.x * 0.3 + rr(-0.15, 0.15), y0 + H * 0.35, z + lean.z * 0.3), V(x + lean.x * 0.7, y0 + H * 0.7, z + lean.z * 0.7), V(x + lean.x, y0 + H, z + lean.z)];
    tube(P.bark, tp, P.r0 * s * 1.25, P.r0 * s * 0.2, s > 0.6 ? 8 : 5, 2);
    if (s > 0.5) colCircle(x, z, P.r0 * s + 0.12, y0, y0 + 4);
    // root flare
    if (s > 0.8) for (let k = 0; k < 3; k++) { const a = k * 2.1 + rr(0, 1); tube(P.bark, [V(x, y0 + 0.6 * s, z), V(x + Math.cos(a) * 0.5 * s, y0 + 0.2, z + Math.sin(a) * 0.5 * s), V(x + Math.cos(a) * 1.0 * s, y0 + 0.1, z + Math.sin(a) * 1.0 * s)], P.r0 * s * 0.6, 0.03, 5, 1); }
    const curve = new THREE.CatmullRomCurve3(tp);
    const C = V(x + lean.x * 0.8, y0 + (P.cy + P.ch * 0.5) * s * (H / (P.H * s)), z + lean.z * 0.8);
    const cr = P.cr * s, ch = P.ch * s;
    const nb = t.type === 'dead' ? 9 : 6 + Math.floor(r() * 3);
    const ends = [];
    for (let b = 0; b < nb; b++) {
      const f = 0.35 + 0.6 * (b / nb) + rr(-0.05, 0.05), base = curve.getPointAt(Math.min(0.97, f));
      const az = rr(0, 6.28), el = rr(0.35, 0.95), len = cr * rr(0.6, 1.0) * (1.1 - f * 0.4);
      const dir = V(Math.cos(az) * Math.cos(el), Math.sin(el), Math.sin(az) * Math.cos(el));
      const end = base.clone().addScaledVector(dir, len);
      const mid = base.clone().lerp(end, 0.5).add(V(rr(-0.3, 0.3), rr(-0.2, 0.3), rr(-0.3, 0.3)));
      tube(P.bark, [base, mid, end], P.r0 * s * 0.5 * (1.1 - f * 0.6), 0.025, 4, 1);
      ends.push(end);
      if (t.type === 'dead' || s > 0.8) { const e2 = mid.clone().add(V(rr(-1, 1), rr(0.2, 1.2), rr(-1, 1)).multiplyScalar(s)); tube(P.bark, [mid, mid.clone().lerp(e2, 0.5), e2], P.r0 * s * 0.18, 0.015, 3, 1); ends.push(e2); }
    }
    if (!P.n) continue;
    const cell = t.cell ?? P.cell, cu = (cell % 2) * 0.5, cvv = cell < 2 ? 0.5 : 0;
    const n = Math.round(P.n * Math.min(1.3, s));
    for (let i = 0; i < n; i++) {
      let p;
      if (i < ends.length * 6) { const e = ends[i % ends.length]; p = e.clone().add(V(rr(-1, 1), rr(-0.6, 1), rr(-1, 1)).multiplyScalar(0.9 * s)); }
      else { const d = V(rr(-1, 1), rr(-1, 1), rr(-1, 1)); if (d.lengthSq() > 1) { i--; continue; } d.normalize(); const k = 0.55 + 0.45 * Math.sqrt(r()); p = V(C.x + d.x * cr * k, C.y + d.y * ch * 0.5 * k, C.z + d.z * cr * k); }
      const out = p.clone().sub(C); out.y *= 0.6; out.normalize();
      const vdir = out.clone().add(V(rr(-0.6, 0.6), rr(0, 0.8), rr(-0.6, 0.6))).normalize();
      const udir = V().crossVectors(vdir, V(rr(-1, 1), rr(-1, 1), rr(-1, 1))).normalize();
      const sz = P.cs * s * rr(0.75, 1.15) * 0.5;
      const dd = p.distanceTo(C) / Math.max(cr, ch * 0.5);
      const sh = (0.5 + 0.5 * Math.min(1, dd)) * (0.8 + 0.25 * Math.min(1, Math.max(0, (p.y - C.y) / ch + 0.5)));
      const tr = rr(0.9, 1.1);
      cards.quad(p, udir.multiplyScalar(sz), vdir.multiplyScalar(sz), [cu, cvv], [cu + 0.5, cvv + 0.5],
        (vx, vy, vz) => { const q = V(vx - C.x, (vy - C.y) * 0.8, vz - C.z).normalize(); q.y += 0.25; return q.normalize(); },
        [sh * tr, sh, sh * (2 - tr)]);
    }
  }
}
function scatterUndergrowth(treeList, C) {
  const ok = (x, z) => maskAt(x, z, 0) < 0.25 && !(x > -28 && x < 22.5 && z > 1.2 && z < 13.5) && Math.abs(z) > 2.5;
  // ferns
  for (let i = 0; i < 900; i++) {
    const x = RR(-48, 48), z = RR(-42, 38); if (!ok(x, z) || Math.abs(z) < 5.5 || (z > 12 && z < 23 && x > -14 && x < 9)) continue;
    const y = groundH(x, z), n = 4 + Math.floor(R() * 3), s = RR(0.6, 1.15), base = R() * 6;
    const tnt = RR(0.75, 1.1);
    for (let k = 0; k < n; k++) {
      const a = base + k / n * Math.PI * 2 + RR(-0.3, 0.3), out = V(Math.cos(a), 0, Math.sin(a));
      const el = RR(0.5, 0.9), v = V(out.x * Math.cos(el), Math.sin(el), out.z * Math.cos(el)).multiplyScalar(s * 0.5);
      const u = V(-out.z, 0, out.x).multiplyScalar(s * 0.24);
      C.fern.quad(V(x, y, z).add(v), u, v, [0, 0], [1, 1], V(0, 1, 0), [tnt, tnt * 0.95, tnt * 0.9]);
    }
  }
  // grass tufts
  const tuft = (x, z, s, k = 1) => {
    const y = groundH(x, z) - 0.02, a = R() * 3;
    for (let j = 0; j < 2; j++) { const aa = a + j * 1.57, u = V(Math.cos(aa), 0, Math.sin(aa)).multiplyScalar(0.3 * s), v = V(0, 0.25 * s, 0); C.grass.quad(V(x, y, z).add(v), u, v, [0, 0], [1, 1], V(0, 1, 0), [k, k, k]); }
  };
  for (let i = 0; i < 2600; i++) {
    const x = RR(-60, 60), z = RR(-12, 28);
    const verge = (Math.abs(z) > 1.85 && Math.abs(z) < 4.8) || (z > 13 && z < 26);
    if (!verge) continue;
    if (x > PLAT.x0 - 0.3 && x < RAMP.x1 + 0.4 && z > 1.4 && z < 7.4) continue;
    if (x > BLD.x0 - 0.2 && x < BLD.x1 + 0.2 && z > 7 && z < 13.4) continue;
    if (x > CROSS.x0 - 0.2 && x < CROSS.x1 + 0.2 && Math.abs(z) < 2.4) continue;
    if (maskAt(x, z, 0) > 0.55 && R() < 0.85) continue;
    tuft(x, z, RR(0.7, 1.4), RR(0.8, 1.1));
  }
  for (let i = 0; i < 500; i++) { const x = RR(-100, 100); if (x > CROSS.x0 - 0.5 && x < CROSS.x1 + 0.5) continue; tuft(x, RR(-1.6, 1.6), RR(0.5, 1.0) * (Math.abs(x) > 40 ? 1.4 : 0.8), 0.9); }
  for (let i = 0; i < 160; i++) { const x = RR(PLAT.x0, PLAT.x1), z = R() < 0.5 ? RR(2.05, 2.25) : RR(5.5, 7.1); if (isCanopy(x, z) && R() < 0.7) continue; const y = PLAT.y; const a = R() * 3, s = RR(0.35, 0.7); for (let j = 0; j < 2; j++) { const aa = a + j * 1.57; C.grass.quad(V(x, y + 0.12 * s, z), V(Math.cos(aa), 0, Math.sin(aa)).multiplyScalar(0.25 * s), V(0, 0.12 * s, 0), [0, 0], [1, 1], V(0, 1, 0), [0.9, 0.95, 0.8]); } }
  // path edges
  for (const k in pathPts) for (const p of pathPts[k]) { for (const sd of [-1, 1]) if (R() < 0.6) { const x = p.x + sd * RR(0.9, 1.5) + RR(-0.3, 0.3), z = p.z + RR(-0.4, 0.4); if (Math.abs(z) > 2.5 && !(x > PLAT.x0 && x < RAMP.x1 && z > 1 && z < 7.4)) tuft(x, z, RR(0.6, 1.1)); } }
}
function leafDecals(C) {
  const put = (x, z, y = null, s = 1) => {
    const yy = (y ?? groundH(x, z)) + 0.006 + R() * 0.012;
    const cell = Math.floor(R() * 16), cu = (cell % 4) * 0.25, cv = 0.75 - Math.floor(cell / 4) * 0.25;
    const a = R() * 6.28, sz = RR(0.06, 0.1) * s;
    const u = V(Math.cos(a), RR(-0.15, 0.15), Math.sin(a)).multiplyScalar(sz), v = V(-Math.sin(a), RR(-0.15, 0.15), Math.cos(a)).multiplyScalar(sz);
    const k = RR(0.6, 1.05);
    C.decal.quad(V(x, yy, z), u, v, [cu, cv], [cu + 0.25, cv + 0.25], V(0, 1, 0), [k, k * RR(0.85, 1), k * RR(0.8, 1)]);
  };
  const drift = (x0, x1, z0, z1, n, yFixed = null, bias = null) => { for (let i = 0; i < n; i++) { let x = RR(x0, x1), z = RR(z0, z1); if (bias) { const t = Math.pow(R(), 2.2); if (bias === 'z1') z = z1 - t * (z1 - z0); if (bias === 'z0') z = z0 + t * (z1 - z0); if (bias === 'x0') x = x0 + t * (x1 - x0); if (bias === 'x1') x = x1 - t * (x1 - x0); } put(x, z, yFixed); } };
  const fl = BLD.fl, IN = { x0: BLD.x0 + BLD.t, z0: BLD.z0 + BLD.t, z1: BLD.z1 - BLD.t };
  // inside: by doors, along west wall, NW corner
  drift(-4.6, -2.9, IN.z1 - 2.2, IN.z1, 350, fl, 'z1');
  drift(IN.x0, IN.x0 + 1.6, IN.z0, IN.z1, 450, fl, 'x0');
  drift(-6.6, -4.4, 10.8, IN.z1, 500, fl);
  drift(-4.5, -3.0, IN.z0, IN.z0 + 1.6, 260, fl, 'z0');
  drift(IN.x0, -0.65, IN.z0, IN.z0 + 0.4, 120, fl);
  drift(-1.0, -0.65, IN.z0, IN.z1, 120, fl, 'x1');
  // platform: against building facade under canopy, column bases, fence, edges
  drift(CAN.x0, CAN.x1, 6.2, 7.15, 1400, PLAT.y, 'z1');
  drift(PLAT.x0, CAN.x0, 5.8, 7.2, 700, PLAT.y, 'z1');
  drift(CAN.x1, PLAT.x1, 5.8, 7.2, 500, PLAT.y, 'z1');
  for (const cx of [-10, -6, -2, 2, 6]) for (let i = 0; i < 40; i++) { const a = R() * 6.28, r = 0.16 + Math.pow(R(), 2) * 0.5; put(cx + Math.cos(a) * r, CAN.colZ + Math.sin(a) * r, PLAT.y); }
  drift(PLAT.x0, PLAT.x1, 2.1, 6.0, 900, PLAT.y);
  drift(-22, -17, 2.1, 7.0, 500, PLAT.y);
  drift(-0.6, 1.1, 6.3, 7.0, 120, PLAT.y);
  // forecourt drifts against north facade & gate piers
  drift(BLD.x0 - 0.5, BLD.x1 + 0.5, BLD.z1 + 0.05, BLD.z1 + 1.4, 900, null, 'z0');
  drift(-12, 6, 13.5, 22, 900);
  // track: between rails & on crossing
  for (let i = 0; i < 1800; i++) { const x = RR(-45, 45), z = RR(-1.7, 1.7); if (x > CROSS.x0 && x < CROSS.x1) continue; put(x, z, Math.abs(Math.abs(z) - 0.72) < 0.08 ? null : 0.2 + (Math.abs(Math.round((x + 99.5) / 0.7) * 0.7 - 99.5 - x) < 0.13 ? 0.08 : 0)); }
  for (let i = 0; i < 500; i++) { const x = RR(CROSS.x0, CROSS.x1), z = RR(CROSS.z0, CROSS.z1); put(x, z, RAIL_TOP); }
  // ramp
  for (let i = 0; i < 300; i++) { const x = RR(RAMP.x0, RAMP.x1), z = RR(2.1, RAMP.z1), t = (x - RAMP.x0) / (RAMP.x1 - RAMP.x0); put(x, z, lerp(PLAT.y, RAIL_TOP, t)); }
}
function leafMounds() {
  const m = (x, z, rx, rz, h, y = null) => { const g = new THREE.SphereGeometry(1, 12, 5, 0, Math.PI * 2, 0, Math.PI / 2); g.scale(rx, h, rz); g.translate(x, (y ?? groundH(x, z)) - 0.01, z); boxUV(g, 1.2); tint(g, () => [0.95, 0.85, 0.75]); add('litter', g); };
  m(-6.2, 12.4, 0.5, 0.35, 0.09, BLD.fl); m(-6.3, 8.0, 0.4, 0.4, 0.07, BLD.fl); m(-4.0, 12.6, 0.45, 0.25, 0.06, BLD.fl);
  m(-9.5, 6.95, 0.9, 0.3, 0.12, PLAT.y); m(3.0, 7.0, 0.8, 0.25, 0.1, PLAT.y); m(-6.6, 7.0, 0.5, 0.22, 0.09, PLAT.y); m(8.5, 7.0, 0.7, 0.3, 0.1, PLAT.y);
  m(-20.5, 5.0, 0.8, 0.6, 0.1, PLAT.y); m(-23.6, 6.6, 0.4, 0.6, 0.12, PLAT.y);
  m(-5.0, 13.6, 1.2, 0.4, 0.15); m(3.0, 13.5, 0.8, 0.3, 0.12); m(-6.4, 21.0, 0.6, 0.5, 0.14); m(-1.1, 21.0, 0.6, 0.5, 0.14);
}
function ivy(C) {
  // Virginia creeper on west gable wall and north facade
  const wall = (x0, x1, y0, y1, plane, coord, dir, n) => {
    for (let i = 0; i < n; i++) {
      const a = RR(x0, x1), b = y0 + Math.pow(R(), 1.4) * (y1 - y0);
      if (plane === 'x' && a > 9.2 && a < 11.2 && b > 1.75 && b < 4.1) continue;
      const s = RR(0.35, 0.6), rot = RR(-0.5, 0.5);
      const off = coord + dir * RR(0.02, 0.07);
      let c, u, v, nrm;
      if (plane === 'x') { c = V(off, b, a); u = V(0, Math.sin(rot), Math.cos(rot)).multiplyScalar(s); v = V(0, Math.cos(rot), -Math.sin(rot)).multiplyScalar(s); nrm = V(dir, 0.3, 0).normalize(); }
      else { c = V(a, b, off); u = V(Math.cos(rot), Math.sin(rot), 0).multiplyScalar(s); v = V(-Math.sin(rot), Math.cos(rot), 0).multiplyScalar(s); nrm = V(0, 0.3, dir).normalize(); }
      const k = RR(0.75, 1.1);
      C.ivy.quad(c, u, v, [0, 0], [1, 1], nrm, [k, k, k]);
    }
  };
  wall(7.4, 12.9, 0.4, 3.0, 'x', BLD.x0, -1, 70);
  wall(7.4, 9.4, 3.0, 5.2, 'x', BLD.x0, -1, 18);
  wall(11.0, 13.0, 3.0, 4.6, 'x', BLD.x0, -1, 14);
  wall(-7.1, -6.4, 0.5, 4.4, 'z', BLD.z1, 1, 26);
  wall(3.0, 5.1, 0.5, 2.0, 'z', BLD.z1, 1, 16);
}
function impostors(C, avoid) {
  for (let i = 0; i < 520; i++) {
    const a = R() * 6.28, d = RR(46, 92);
    let x = Math.cos(a) * d * 1.05, z = Math.sin(a) * d * 0.95;
    if (Math.abs(z) < 4 && Math.abs(x) < 75) continue;
    if (Math.abs(z) < 3) continue;
    const y = groundH(x, z) - 0.3, cell = Math.floor(R() * 4), w = RR(6, 9.5), h = w * RR(1.6, 2.0);
    const k = RR(0.75, 1.05), r0 = R() * 3;
    for (let j = 0; j < 2; j++) {
      const aa = r0 + j * 1.57, u = V(Math.cos(aa), 0, Math.sin(aa)).multiplyScalar(w / 2), v = V(0, h / 2, 0);
      C.impostor.quad(V(x, y + h / 2, z), u, v, [cell * 0.25, 0], [cell * 0.25 + 0.25, 1], (vx, vy, vz) => V(vx - x, (vy - y - h * 0.6) * 0.5 + h * 0.3, vz - z).normalize(), [k, k, k]);
    }
  }
}

// ------------------------------------------------------------ light shafts
function shaftMesh(corners, dir, len, strength) {
  const pos = [], uv = [];
  const far = corners.map((c) => c.clone().addScaledVector(dir, len));
  for (let i = 0; i < 4; i++) {
    const a = corners[i], b = corners[(i + 1) % 4], c = far[(i + 1) % 4], d = far[i];
    pos.push(a.x, a.y, a.z, b.x, b.y, b.z, c.x, c.y, c.z, a.x, a.y, a.z, c.x, c.y, c.z, d.x, d.y, d.z);
    uv.push(0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1);
  }
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  const m = new THREE.ShaderMaterial({
    uniforms: { uS: { value: strength }, uTime: U.time },
    vertexShader: 'varying vec2 vUv; varying vec3 vP; void main(){ vUv=uv; vP=position; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }',
    fragmentShader: 'uniform float uS; uniform float uTime; varying vec2 vUv; varying vec3 vP; void main(){ float e = sin(3.14159*vUv.x); float f = pow(1.0-vUv.y, 1.4) * smoothstep(0.0, 0.08, vUv.y); float n = 0.75 + 0.25*sin(vP.x*3.1+vP.y*2.3+vP.z*2.7+uTime*0.4); gl_FragColor = vec4(vec3(1.0,0.78,0.5)*uS*e*e*f*n, 1.0); }',
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(g, m); mesh.renderOrder = 5; return mesh;
}

// ------------------------------------------------------------ main build
export async function buildWorld(scene, renderer, progress) {
  TX.setAniso(Math.min(8, renderer.capabilities.getMaxAnisotropy()));
  progress(0.05, 'Firing bricks');
  await tick();
  const T = {};
  T.brick = TX.brick(); progress(0.12, 'Splitting slates'); await tick();
  T.slate = TX.slate(); T.wood = TX.wood('raw'); T.woodDark = TX.wood('dark'); T.floor = TX.wood('floor');
  progress(0.2, 'Peeling paint'); await tick();
  T.green = TX.paintedWood([0.2, 0.32, 0.22], 4, 0.46); T.cream = TX.paintedWood([0.8, 0.75, 0.6], 4, 0.5);
  T.rust = TX.rust(null); T.ironGreen = TX.rust([0.17, 0.27, 0.19]); T.corr = TX.corrugated();
  progress(0.32, 'Laying flagstones'); await tick();
  T.flag = TX.flagstone(); T.ballast = TX.ballast(); T.plaster = TX.plaster();
  T.bark = TX.bark('oak'); T.barkBeech = TX.bark('beech'); T.barkBirch = TX.bark('birch');
  progress(0.45, 'Raking leaves'); await tick();
  T.litter = TX.litter(); T.dirt = TX.dirt();
  T.leafAtlas = TX.leafAtlas(); T.spruce = TX.spruceTex(); T.fern = TX.fernTex(); T.grass = TX.grassTex(); T.groundLeaf = TX.groundLeafAtlas(); T.ivy = TX.ivyTex(); T.impostor = TX.impostorAtlas();
  T.glass = TX.dirtyGlassTex(); T.glass.wrapS = T.glass.wrapT = THREE.RepeatWrapping; T.glassBroken = TX.brokenGlassTex(); T.glassBroken.wrapS = T.glassBroken.wrapT = THREE.RepeatWrapping;
  T.nameBoard = TX.nameBoard(); T.waiting = TX.waitingSign(); T.crossing = TX.crossingSign(); T.timetable = TX.timetableTex(); T.enamel = TX.enamelTex(); T.clock = TX.clockTex(); T.footpath = TX.footpathSign();
  progress(0.6, 'Shaping the ground'); await tick();

  // tree layout
  drawMask(null);
  const treeList = [];
  const types = ['maple', 'beech', 'birch', 'oak', 'maple', 'beech', 'birch', 'spruce', 'oak', 'dead'];
  const clear = (x, z) => {
    if (Math.abs(z) < 5.2) return false;
    if (x > -30 && x < 24 && z > 0 && z < 24) return false;
    if (maskAt(x, z, 0) > 0.05) return false;
    // keep sightline from knoll viewpoint toward the station
    const vx = -4, vz = -25.6, dx = -1 - vx, dz = 10 - vz, L = Math.hypot(dx, dz), t = ((x - vx) * dx + (z - vz) * dz) / (L * L);
    if (t > 0.05 && t < 1) { const px = vx + dx * t, pz = vz + dz * t; if (Math.hypot(x - px, z - pz) < 2.0 + t * 7) return false; }
    return true;
  };
  for (let i = 0; i < 4000 && treeList.length < 120; i++) {
    const x = RR(-46, 46), z = RR(-42, 40);
    if (!clear(x, z)) continue;
    const d = Math.hypot(x, z * 1.2);
    const minD = d < 25 ? 4.6 : 5.6;
    if (treeList.some((t) => Math.hypot(t.x - x, t.z - z) < minD)) continue;
    treeList.push({ x, z, type: types[Math.floor(R() * types.length)], s: RR(0.85, 1.2) });
  }
  // feature trees near the station
  treeList.push({ x: -19.5, z: 4.6, type: 'sycamore', s: 0.85, cell: 2 });
  treeList.push({ x: -27, z: 10, type: 'maple', s: 1.15 }, { x: 10.5, z: 15.5, type: 'maple', s: 1.0 }, { x: -15, z: 18, type: 'beech', s: 1.1 }, { x: 15.5, z: 22, type: 'oak', s: 1.1 });
  treeList.push({ x: -22, z: 23, type: 'birch', s: 1.0 }, { x: 8.5, z: 25, type: 'birch', s: 0.9 }, { x: 19, z: 9.5, type: 'birch', s: 0.8 }, { x: -12.5, z: 14.5, type: 'birch', s: 0.75 });
  // saplings on platform and overgrown trackbed
  treeList.push({ x: -22.6, z: 6.4, type: 'birch', s: 0.32 }, { x: 14.5, z: 6.6, type: 'birch', s: 0.28 }, { x: -8.4, z: 6.9, type: 'sycamore', s: 0.22 });
  for (let i = 0; i < 26; i++) { const sx = (R() < 0.5 ? -1 : 1) * RR(48, 95), sz = RR(-2.2, 2.2); treeList.push({ x: sx, z: sz, type: R() < 0.5 ? 'birch' : 'maple', s: RR(0.35, 0.8) }); }
  drawMask(treeList);
  const M = makeMaterials(T);
  const terrain = buildTerrain(M); scene.add(terrain);
  progress(0.7, 'Building the station'); await tick();

  station();
  platformAndCanopy();
  trackAndCrossing();
  props(T, scene);
  progress(0.8, 'Growing the woods'); await tick();
  const C = { leaves: new Cards(), spruce: new Cards(), fern: new Cards(), grass: new Cards(), decal: new Cards(), ivy: new Cards(), impostor: new Cards() };
  trees(treeList, C.leaves, C.spruce);
  scatterUndergrowth(treeList, C);
  leafDecals(C);
  leafMounds();
  ivy(C);
  impostors(C);
  // mushrooms
  const mt = new THREE.MeshStandardMaterial({ map: TX.mushroomTex(), roughness: 0.6 });
  M.mush = mt; M.mush.vertexColors = false;
  for (let i = 0; i < 18; i++) {
    const base = i < 8 ? V(6 + RR(-3, 3), 0, -21.5 - 2.2 + RR(-0.6, 0.6)) : V(treeList[i].x + RR(-1.5, 1.5), 0, treeList[i].z + RR(-1.5, 1.5));
    const y = groundH(base.x, base.z), s = RR(0.6, 1.2);
    cyl('ceramic', 0.018 * s, 0.014 * s, y, y + 0.09 * s, base.x, base.z, 6);
    const cap = new THREE.SphereGeometry(0.06 * s, 10, 6, 0, Math.PI * 2, 0, Math.PI / 2); cap.scale(1, 0.6, 1); cap.translate(base.x, y + 0.085 * s, base.z); add('mush', cap);
  }
  M.fireRed = std({ color: 0x8a1e14, roughness: 0.6, map: T.rust.map, vertexColors: false });
  const armTex = TX.signTex(256, 48, (g, w, h) => { g.fillStyle = '#9b2018'; g.fillRect(0, 0, w, h); g.fillStyle = '#e8e0cc'; g.fillRect(w * 0.7, 0, 18, h); }, 1, 30);
  M.signalArm = std({ map: armTex, vertexColors: false });

  progress(0.9, 'Merging geometry'); await tick();
  for (const [key, list] of buckets) {
    const mat = M[key]; if (!mat) { console.warn('missing material', key); continue; }
    const geos = list.map((g) => {
      let q = g.index ? g.toNonIndexed() : g;
      if (!q.attributes.normal) q.computeVertexNormals();
      if (!q.attributes.color) q.setAttribute('color', new THREE.BufferAttribute(new Float32Array(q.attributes.position.count * 3).fill(1), 3));
      if (!q.attributes.uv) q.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(q.attributes.position.count * 2), 2));
      for (const k of Object.keys(q.attributes)) if (!['position', 'normal', 'uv', 'color'].includes(k)) q.deleteAttribute(k);
      return q;
    });
    const merged = mergeGeometries(geos, false);
    const mesh = new THREE.Mesh(merged, mat);
    mesh.castShadow = mat.userData.cast !== false; mesh.receiveShadow = true;
    if (key === 'glass' || key === 'glassBroken') mesh.renderOrder = 2;
    scene.add(mesh);
  }
  for (const k in C) {
    if (!C[k].p.length) continue;
    const mesh = new THREE.Mesh(C[k].geo(), M[k]);
    mesh.castShadow = k === 'leaves' || k === 'spruce' || k === 'ivy';
    mesh.receiveShadow = k !== 'impostor';
    scene.add(mesh);
  }
  // light shafts through the west window and canopy holes
  const d = SUN.clone().negate();
  const wx = BLD.x0 + 0.05;
  scene.add(shaftMesh([V(wx, BLD.fl + 0.9, 9.5), V(wx, BLD.fl + 0.9, 10.9), V(wx, BLD.fl + 2.8, 10.9), V(wx, BLD.fl + 2.8, 9.5)], d, 7.5, 0.26));
  // drifting dust motes in the waiting room
  const dn = 420, dp = new Float32Array(dn * 3);
  for (let i = 0; i < dn; i++) { dp[i * 3] = RR(-6.5, -0.8); dp[i * 3 + 1] = RR(1.15, 4.2); dp[i * 3 + 2] = RR(7.7, 12.7); }
  const dgeo = new THREE.BufferGeometry(); dgeo.setAttribute('position', new THREE.BufferAttribute(dp, 3));
  const dust = new THREE.Points(dgeo, new THREE.ShaderMaterial({
    uniforms: { uTime: U.time }, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    vertexShader: 'uniform float uTime; varying float vA; void main(){ vec3 p = position; float s = fract(sin(dot(p.xz, vec2(12.9898, 78.233))) * 43758.5453); p += vec3(sin(uTime * 0.13 + s * 20.0), sin(uTime * 0.07 + s * 11.0) * 0.5, cos(uTime * 0.11 + s * 17.0)) * 0.25; vec4 mv = modelViewMatrix * vec4(p, 1.0); gl_Position = projectionMatrix * mv; gl_PointSize = clamp(16.0 / -mv.z, 1.0, 3.5); vA = 0.35 + 0.65 * s; }',
    fragmentShader: 'varying float vA; void main(){ vec2 c = gl_PointCoord - 0.5; float d = dot(c, c); if (d > 0.25) discard; gl_FragColor = vec4(vec3(1.0, 0.86, 0.66) * vA * 0.3 * (1.0 - d * 4.0), 1.0); }',
  }));
  dust.frustumCulled = false; scene.add(dust);

  // lights
  const sun = new THREE.DirectionalLight(0xffd2a0, 3.4);
  sun.position.copy(SUN).multiplyScalar(150).add(V(0, 0, -2)); sun.target.position.set(0, 0, -2);
  sun.castShadow = true; sun.shadow.mapSize.set(4096, 4096);
  const sc = sun.shadow.camera; sc.left = -50; sc.right = 50; sc.top = 27; sc.bottom = -27; sc.near = 40; sc.far = 300;
  sun.shadow.bias = -0.0004; sun.shadow.normalBias = 0.035; sun.shadow.radius = 1.6;
  scene.add(sun, sun.target);
  const hemi = new THREE.HemisphereLight(0xa8bfdc, 0x6a5236, 1.7); scene.add(hemi);
  // interior light comes from occluded sky (aoMap) plus eye adaptation; no extra per-pixel lights for performance


  // sky dome
  const sky = new THREE.Mesh(new THREE.SphereGeometry(450, 32, 16), new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false, fog: false,
    uniforms: { uSun: U.sun },
    vertexShader: 'varying vec3 vD; void main(){ vD = normalize(position); vec4 p = projectionMatrix*modelViewMatrix*vec4(position,1.0); gl_Position = p.xyww; }',
    fragmentShader: `uniform vec3 uSun; varying vec3 vD; void main(){ vec3 d = normalize(vD); float h = max(d.y, 0.0);
      vec3 zen = vec3(0.32,0.47,0.72), hor = vec3(0.86,0.78,0.64);
      vec3 c = mix(hor, zen, pow(h, 0.55));
      float s = max(dot(d, uSun), 0.0);
      c += vec3(1.0,0.72,0.4) * pow(s, 8.0) * 0.55 + vec3(1.0,0.85,0.6) * pow(s, 600.0) * 6.0;
      c = mix(c, vec3(0.42,0.36,0.3), smoothstep(0.0, -0.2, d.y));
      gl_FragColor = vec4(c, 1.0); }`,
  }));
  sky.renderOrder = -1; sky.frustumCulled = false; scene.add(sky);
  scene.fog = new THREE.FogExp2(0xb9ab92, 0.0125);
  scene.background = new THREE.Color(0xb9ab92);
  progress(0.97, 'Warming up');
  return { sun, sky, textures: T, materials: M };
}

import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

// =====================================================================
//  Renderer / scene
// =====================================================================
const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
let hiRes = true;
let autoLevel = 0; // automatic step-down if frames are consistently slow
const AUTO_PIX = [2.3e6, 1.65e6, 1.15e6];
function applyPixelRatio() {
  const dpr = window.devicePixelRatio || 1;
  let pr = hiRes ? Math.min(dpr, 1.25) : Math.min(dpr, 1.0) * 0.75;
  const maxPix = hiRes ? AUTO_PIX[autoLevel] : 1.0e6; // cap total rendered pixels
  const px = innerWidth * innerHeight * pr * pr;
  if (px > maxPix) pr = Math.sqrt(maxPix / (innerWidth * innerHeight));
  renderer.setPixelRatio(pr);
  renderer.setSize(innerWidth, innerHeight);
}
applyPixelRatio();
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.shadowMap.autoUpdate = false;
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const SKY_TOP = new THREE.Color(0x707d8a);
const FOG_COL = new THREE.Color(0x96a1aa);
scene.background = SKY_TOP;
scene.fog = new THREE.FogExp2(FOG_COL, 0.0165);
const camera = new THREE.PerspectiveCamera(72, innerWidth / innerHeight, 0.05, 2000);

// =====================================================================
//  Procedural textures
// =====================================================================
function hash(x, y, s) {
  let h = (Math.imul(x | 0, 374761393) + Math.imul(y | 0, 668265263) + Math.imul(s | 0, 982451653)) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h = h ^ (h >>> 16);
  return (h >>> 0) / 4294967295;
}
function vnoise(x, y, s, period) {
  const xi = Math.floor(x), yi = Math.floor(y);
  const xf = x - xi, yf = y - yi;
  const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
  const P = period;
  const x0 = ((xi % P) + P) % P, x1 = (x0 + 1) % P, y0 = ((yi % P) + P) % P, y1 = (y0 + 1) % P;
  const a = hash(x0, y0, s), b = hash(x1, y0, s), c = hash(x0, y1, s), d = hash(x1, y1, s);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}
function fbm(x, y, s, period, oct = 4) {
  let sum = 0, amp = 0.5, f = 1, norm = 0;
  for (let i = 0; i < oct; i++) { sum += amp * vnoise(x * f, y * f, s + i * 31, period * f); norm += amp; amp *= 0.5; f *= 2; }
  return sum / norm;
}
const smooth = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
let rngSeed = 12345;
const rnd = () => { rngSeed = (Math.imul(rngSeed, 1664525) + 1013904223) | 0; return (rngSeed >>> 0) / 4294967296; };

function canvas(w, h) { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; }
function toTex(c, srgb = true) {
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

// generic per-pixel generator: fn(u,v) -> [r,g,b, rough]
function genPair(size, fn) {
  const cc = canvas(size, size), rc = canvas(size, size);
  const cx = cc.getContext('2d'), rx = rc.getContext('2d');
  const ci = cx.createImageData(size, size), ri = rx.createImageData(size, size);
  const out = [0, 0, 0, 0];
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    fn(x, y, out);
    const i = (y * size + x) * 4;
    ci.data[i] = out[0]; ci.data[i + 1] = out[1]; ci.data[i + 2] = out[2]; ci.data[i + 3] = 255;
    const r = Math.max(0, Math.min(255, out[3] * 255));
    ri.data[i] = r; ri.data[i + 1] = r; ri.data[i + 2] = r; ri.data[i + 3] = 255;
  }
  cx.putImageData(ci, 0, 0); rx.putImageData(ri, 0, 0);
  return { cc, rc, cx, rx };
}

// tangent-space normal map derived from a texture's luminance (Sobel)
function normalFrom(tex, strength) {
  const src = tex.image, w = src.width, h = src.height;
  const d = src.getContext('2d').getImageData(0, 0, w, h).data;
  const L = new Float32Array(w * h);
  for (let i = 0; i < w * h; i++) L[i] = (d[i * 4] * 0.3 + d[i * 4 + 1] * 0.59 + d[i * 4 + 2] * 0.11) / 255;
  const c = canvas(w, h), x = c.getContext('2d'), img = x.createImageData(w, h);
  const at = (xx, yy) => L[((yy + h) % h) * w + ((xx + w) % w)];
  for (let yy = 0; yy < h; yy++) for (let xx = 0; xx < w; xx++) {
    const dx = (at(xx + 1, yy - 1) + 2 * at(xx + 1, yy) + at(xx + 1, yy + 1)) - (at(xx - 1, yy - 1) + 2 * at(xx - 1, yy) + at(xx - 1, yy + 1));
    const dy = (at(xx - 1, yy + 1) + 2 * at(xx, yy + 1) + at(xx + 1, yy + 1)) - (at(xx - 1, yy - 1) + 2 * at(xx, yy - 1) + at(xx + 1, yy - 1));
    let nx = -dx * strength, ny = dy * strength, nz = 1;
    const l = Math.hypot(nx, ny, nz); nx /= l; ny /= l; nz /= l;
    const i = (yy * w + xx) * 4;
    img.data[i] = (nx * 0.5 + 0.5) * 255; img.data[i + 1] = (ny * 0.5 + 0.5) * 255; img.data[i + 2] = (nz * 0.5 + 0.5) * 255; img.data[i + 3] = 255;
  }
  x.putImageData(img, 0, 0);
  return toTex(c, false);
}

function genConcreteFloor(seed, wet, wear) {
  const S = 512;
  const { cc, rc, cx, rx } = genPair(S, (x, y, o) => {
    const u = x / S, v = y / S;
    const n = fbm(u * 8, v * 8, seed, 8, 5);
    const g = hash(x, y, seed + 7);
    const big = fbm(u * 2, v * 2, seed + 3, 2, 3);
    const pud = fbm(u * 3, v * 3, seed + 11, 3, 4);
    let base = 118 + (n - 0.5) * 60 + (g - 0.5) * 16 + (big - 0.5) * 30;
    let rough = 0.72 - (n - 0.5) * 0.25 + (g - 0.5) * 0.1;
    // worn polished path (centre band along v)
    if (wear > 0) {
      const band = 1 - smooth(0.18, 0.42, Math.abs(u - 0.5));
      base += band * wear * 14; rough -= band * wear * 0.28;
    }
    // wet patches / puddles
    const w = smooth(0.62 - wet * 0.22, 0.66 - wet * 0.2, pud);
    const damp = smooth(0.45 - wet * 0.3, 0.7, pud) * wet;
    base *= 1 - damp * 0.28 - w * 0.25;
    rough = rough * (1 - damp * 0.55);
    rough = rough * (1 - w) + 0.04 * w;
    // joints
    const j = Math.min(x, y, S - 1 - x, S - 1 - y);
    if (j < 2) { base *= 0.55; rough = 0.95; }
    o[0] = base * 0.98; o[1] = base; o[2] = base * 1.03; o[3] = rough;
  });
  // cracks + stains
  rngSeed = seed * 77;
  for (const ctx of [cx]) {
    ctx.strokeStyle = 'rgba(40,40,40,0.45)'; ctx.lineWidth = 1;
    for (let k = 0; k < 7; k++) {
      let px = rnd() * S, py = rnd() * S; ctx.beginPath(); ctx.moveTo(px, py);
      let ang = rnd() * 6.28;
      for (let s = 0; s < 18; s++) { ang += (rnd() - 0.5) * 1.1; px += Math.cos(ang) * 7; py += Math.sin(ang) * 7; ctx.lineTo(px, py); }
      ctx.stroke();
    }
    for (let k = 0; k < 14; k++) {
      const gx = rnd() * S, gy = rnd() * S, r = 10 + rnd() * 40;
      const gr = ctx.createRadialGradient(gx, gy, 0, gx, gy, r);
      gr.addColorStop(0, `rgba(${50 + rnd() * 30},${45 + rnd() * 20},${35},0.22)`); gr.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = gr; ctx.fillRect(gx - r, gy - r, r * 2, r * 2);
    }
  }
  const map = toTex(cc), rough = toTex(rc, false);
  return { map, rough };
}

function genConcreteWall(seed, streakAmt) {
  const S = 512;
  const { cc, rc, cx } = genPair(S, (x, y, o) => {
    const u = x / S, v = y / S;
    const n = fbm(u * 6, v * 6, seed, 6, 5);
    const g = hash(x, y, seed + 2);
    const st = fbm(u * 40, v * 1.5, seed + 9, 40, 3);
    const streak = smooth(0.5, 0.75, st) * streakAmt * (0.6 + 0.4 * (1 - v));
    let base = 132 + (n - 0.5) * 50 + (g - 0.5) * 14;
    base *= 1 - streak * 0.35;
    let rough = 0.8 - streak * 0.4 - (n - 0.5) * 0.2;
    // formwork board joints
    if (y % 128 < 2) { base *= 0.82; }
    o[0] = base * 0.97; o[1] = base * 0.99; o[2] = base * 1.02; o[3] = rough;
  });
  // tie holes
  cx.fillStyle = 'rgba(55,55,58,0.8)';
  for (let yy = 64; yy < S; yy += 128) for (let xx = 64; xx < S; xx += 256) { cx.beginPath(); cx.arc(xx, yy, 4, 0, 6.28); cx.fill(); }
  return { map: toTex(cc), rough: toTex(rc, false) };
}

function genTimber(seed, r0, g0, b0, wet) {
  const S = 512, planks = 6, ph = S / planks;
  return (() => {
    const { cc, rc } = genPair(S, (x, y, o) => {
      const p = Math.floor(y / ph);
      const ly = (y % ph) / ph;
      const pv = hash(p, 3, seed);
      const off = hash(p, 5, seed) * 500;
      const warp = fbm((x + off) / S * 3, ly * 2 + p, seed + 4, 3, 3);
      const grain = Math.sin(((x + off) / S) * 18 + warp * 14 + ly * 3) * 0.5 + 0.5;
      const fine = fbm((x + off) / S * 60, ly * 4 + p * 7, seed + 8, 60, 2);
      let k = 0.7 + 0.18 * grain + 0.25 * (pv - 0.5) + 0.18 * (fine - 0.5);
      const dampn = fbm(x / S * 4, y / S * 4, seed + 12, 4, 3);
      const damp = smooth(0.45, 0.7, dampn) * wet;
      k *= 1 - damp * 0.3;
      let rough = 0.62 - 0.15 * grain - damp * 0.35 - wet * 0.1;
      if (ly < 0.035 || ly > 0.965) { k *= 0.35; rough = 0.9; }
      // butt joints
      const bx = (x + Math.floor(hash(p, 9, seed) * S)) % S;
      if (bx < 2) { k *= 0.4; }
      o[0] = r0 * k; o[1] = g0 * k; o[2] = b0 * k; o[3] = rough;
    });
    return { map: toTex(cc), rough: toTex(rc, false) };
  })();
}

function genGrime(seed, rust) {
  const S = 256;
  const { cc, rc } = genPair(S, (x, y, o) => {
    const u = x / S, v = y / S;
    const n = fbm(u * 5, v * 5, seed, 5, 4);
    const st = fbm(u * 24, v * 1.2, seed + 5, 24, 3);
    const streak = smooth(0.55, 0.8, st) * (0.4 + 0.6 * (1 - v));
    const g = hash(x, y, seed);
    let k = 0.92 - (n - 0.5) * 0.25 - (g - 0.5) * 0.04;
    let r = k, gg = k, b = k;
    const rs = streak * rust;
    r = r * (1 - rs) + 0.55 * rs; gg = gg * (1 - rs) + 0.36 * rs; b = b * (1 - rs) + 0.25 * rs;
    const grime = smooth(0.55, 0.85, n) * 0.3;
    r *= 1 - grime; gg *= 1 - grime; b *= 1 - grime;
    const rough = 0.42 + (n - 0.5) * 0.3 - streak * 0.18 + grime * 0.3;
    o[0] = r * 255; o[1] = gg * 255; o[2] = b * 255; o[3] = rough;
  });
  return { map: toTex(cc), rough: toTex(rc, false) };
}

function genRainGlass() {
  const S = 512, c = canvas(S, S), x = c.getContext('2d');
  x.fillStyle = 'rgba(200,214,224,0.10)'; x.fillRect(0, 0, S, S);
  rngSeed = 999;
  // trails
  for (let i = 0; i < 70; i++) {
    let px = rnd() * S, py = rnd() * S * 0.6; const len = 60 + rnd() * 300;
    x.strokeStyle = `rgba(235,242,248,${0.07 + rnd() * 0.14})`; x.lineWidth = 0.8 + rnd() * 1.8;
    x.beginPath(); x.moveTo(px, py);
    for (let s = 0; s < len; s += 6) { px += (rnd() - 0.5) * 2.2; py += 6; x.lineTo(px, py % S); if (py >= S) { py -= S; x.moveTo(px, py); } }
    x.stroke();
    const r = 2 + rnd() * 3; x.fillStyle = 'rgba(240,246,250,0.5)'; x.beginPath(); x.ellipse(px, py % S, r * 0.8, r, 0, 0, 6.28); x.fill();
  }
  // droplets
  for (let i = 0; i < 1100; i++) {
    const px = rnd() * S, py = rnd() * S, r = 0.6 + Math.pow(rnd(), 3) * 4.5;
    const g = x.createRadialGradient(px - r * 0.3, py - r * 0.3, 0, px, py, r);
    g.addColorStop(0, 'rgba(255,255,255,0.6)'); g.addColorStop(0.6, 'rgba(210,222,232,0.25)'); g.addColorStop(1, 'rgba(110,125,140,0.22)');
    x.fillStyle = g; x.beginPath(); x.arc(px, py, r, 0, 6.28); x.fill();
  }
  // lower sill grime band
  const gr = x.createLinearGradient(0, S * 0.8, 0, S);
  gr.addColorStop(0, 'rgba(160,165,160,0)'); gr.addColorStop(1, 'rgba(150,152,145,0.18)');
  x.fillStyle = gr; x.fillRect(0, S * 0.8, S, S * 0.2);
  return toTex(c);
}

function genChainLink() {
  const S = 128, c = canvas(S, S), x = c.getContext('2d');
  x.strokeStyle = '#fff'; x.lineWidth = 5;
  x.beginPath(); x.moveTo(0, 0); x.lineTo(S, S); x.moveTo(S, 0); x.lineTo(0, S);
  x.moveTo(-S / 2, S / 2); x.lineTo(S / 2, S * 1.5); x.moveTo(S / 2, -S / 2); x.lineTo(S * 1.5, S / 2);
  x.moveTo(S / 2, -S / 2); x.lineTo(-S / 2, S / 2); x.moveTo(S * 1.5, S / 2); x.lineTo(S / 2, S * 1.5);
  x.stroke();
  const t = toTex(c); return t;
}

function genRope() {
  const c = canvas(64, 64), x = c.getContext('2d');
  x.fillStyle = '#5d6166'; x.fillRect(0, 0, 64, 64);
  for (let i = -64; i < 128; i += 11) {
    const g = x.createLinearGradient(i, 0, i + 11, 0);
    x.strokeStyle = '#2b2e31'; x.lineWidth = 2.5;
    x.beginPath(); x.moveTo(i, 0); x.lineTo(i + 64, 64); x.stroke();
    x.strokeStyle = 'rgba(200,205,210,0.5)'; x.lineWidth = 1.5;
    x.beginPath(); x.moveTo(i + 5, 0); x.lineTo(i + 69, 64); x.stroke();
  }
  return toTex(c);
}

function genTactile() {
  const S = 128, c = canvas(S, S), x = c.getContext('2d');
  x.fillStyle = '#d6a91c'; x.fillRect(0, 0, S, S);
  for (let yy = 8; yy < S; yy += 16) for (let xx = 8; xx < S; xx += 16) {
    x.fillStyle = '#efc63a'; x.beginPath(); x.arc(xx, yy, 5, 0, 6.28); x.fill();
    x.fillStyle = 'rgba(0,0,0,0.25)'; x.beginPath(); x.arc(xx + 1, yy + 1.5, 5, 0, 3.14); x.fill();
  }
  x.fillStyle = 'rgba(60,50,30,0.15)';
  for (let i = 0; i < 300; i++) x.fillRect(Math.random() * S, Math.random() * S, 2, 2);
  return toTex(c);
}

function genStripes() {
  const c = canvas(128, 128), x = c.getContext('2d');
  x.fillStyle = '#e8b520'; x.fillRect(0, 0, 128, 128);
  x.fillStyle = '#1b1b1b';
  for (let i = -128; i < 256; i += 64) { x.beginPath(); x.moveTo(i, 0); x.lineTo(i + 32, 0); x.lineTo(i + 160, 128); x.lineTo(i + 128, 128); x.fill(); }
  return toTex(c);
}

function genGrating() {
  const c = canvas(64, 64), x = c.getContext('2d');
  x.fillStyle = '#121416'; x.fillRect(0, 0, 64, 64);
  x.fillStyle = '#6c7178';
  for (let i = 0; i < 64; i += 8) x.fillRect(i, 0, 3, 64);
  for (let i = 0; i < 64; i += 32) x.fillRect(0, i, 64, 2);
  return toTex(c);
}

function textTex(w, h, draw) {
  const c = canvas(w, h), x = c.getContext('2d');
  draw(x, w, h);
  const t = toTex(c); t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping; return t;
}

// =====================================================================
//  Materials
// =====================================================================
const T = {};
T.floorInt = genConcreteFloor(3, 0.25, 1.0);
T.floorExt = genConcreteFloor(8, 1.0, 0.3);
T.wall = genConcreteWall(5, 0.5);
T.wallExt = genConcreteWall(6, 1.0);
T.timber = genTimber(4, 168, 120, 78, 0.0);
T.timberWet = genTimber(9, 118, 84, 58, 1.0);
T.grime = genGrime(2, 0.45);
T.grimeHeavy = genGrime(7, 1.0);
T.floorInt.normal = normalFrom(T.floorInt.map, 1.6);
T.floorExt.normal = normalFrom(T.floorExt.map, 1.6);
T.wall.normal = normalFrom(T.wall.map, 2.2);
T.wallExt.normal = normalFrom(T.wallExt.map, 2.6);
T.timber.normal = normalFrom(T.timber.map, 3.0);
T.timberWet.normal = normalFrom(T.timberWet.map, 3.0);
const rainGlassTex = genRainGlass();
const chainTex = genChainLink();
const ropeTex = genRope();

function std(params, tile = 1) {
  const m = new THREE.MeshStandardMaterial(params);
  m.userData.tile = tile;
  return m;
}
const M = {
  floorInt: std({ map: T.floorInt.map, roughnessMap: T.floorInt.rough, normalMap: T.floorInt.normal, normalScale: new THREE.Vector2(0.5, 0.5), color: 0xd8d6d0, roughness: 1 }, 4),
  floorExt: std({ map: T.floorExt.map, roughnessMap: T.floorExt.rough, normalMap: T.floorExt.normal, normalScale: new THREE.Vector2(0.5, 0.5), color: 0xbab9b4, roughness: 1, envMapIntensity: 1.3 }, 4),
  wall: std({ map: T.wall.map, roughnessMap: T.wall.rough, normalMap: T.wall.normal, normalScale: new THREE.Vector2(0.7, 0.7), color: 0xd9d6cf, roughness: 1 }, 4),
  wallExt: std({ map: T.wallExt.map, roughnessMap: T.wallExt.rough, normalMap: T.wallExt.normal, normalScale: new THREE.Vector2(0.8, 0.8), color: 0xa9a8a3, roughness: 1, envMapIntensity: 1.2 }, 4),
  concreteDark: std({ map: T.wall.map, roughnessMap: T.wall.rough, color: 0x8f8d88, roughness: 1 }, 3),
  timber: std({ map: T.timber.map, roughnessMap: T.timber.rough, normalMap: T.timber.normal, normalScale: new THREE.Vector2(0.6, 0.6), color: 0xffffff, roughness: 1 }, 3),
  timberBeam: std({ map: T.timber.map, roughnessMap: T.timber.rough, color: 0xd9b48a, roughness: 1 }, 4),
  timberWet: std({ map: T.timberWet.map, roughnessMap: T.timberWet.rough, normalMap: T.timberWet.normal, normalScale: new THREE.Vector2(0.6, 0.6), color: 0xffffff, roughness: 1, envMapIntensity: 1.4 }, 2.4),
  steelGrey: std({ map: T.grime.map, roughnessMap: T.grime.rough, color: 0x56606a, metalness: 0.55, roughness: 1 }, 2),
  steelBlue: std({ map: T.grime.map, roughnessMap: T.grime.rough, color: 0x2f4f6e, metalness: 0.5, roughness: 1 }, 2),
  steelYellow: std({ map: T.grime.map, roughnessMap: T.grime.rough, color: 0xd9a21c, metalness: 0.35, roughness: 1 }, 2),
  steelWetDark: std({ map: T.grimeHeavy.map, roughnessMap: T.grimeHeavy.rough, color: 0x4a4f55, metalness: 0.65, roughness: 0.8, envMapIntensity: 1.4 }, 2),
  cabinRed: std({ map: T.grime.map, roughnessMap: T.grime.rough, color: 0xa3201c, metalness: 0.45, roughness: 0.7, envMapIntensity: 1.4 }, 2),
  cream: std({ map: T.grime.map, roughnessMap: T.grime.rough, color: 0xe6dfcf, metalness: 0.3, roughness: 0.8, envMapIntensity: 1.2 }, 2),
  steelBare: std({ color: 0xa8adb2, metalness: 1.0, roughness: 0.3, roughnessMap: T.grime.rough }, 1),
  galv: std({ map: T.grime.map, roughnessMap: T.grime.rough, color: 0xb4b9bd, metalness: 0.85, roughness: 0.9, envMapIntensity: 1.3 }, 1.5),
  chrome: std({ color: 0xd6dade, metalness: 1, roughness: 0.18 }),
  rubber: std({ color: 0x18191a, roughness: 0.6, metalness: 0 }),
  rope: std({ map: ropeTex, color: 0xffffff, metalness: 0.85, roughness: 0.42, envMapIntensity: 1.3 }),
  dark: std({ color: 0x232629, roughness: 0.7, metalness: 0.3 }),
  cabinFloor: std({ color: 0x3a3d40, roughness: 0.85 }),
  seat: std({ color: 0x6b4a32, roughness: 0.55, map: T.timber.map }, 1),
  lampWarm: new THREE.MeshStandardMaterial({ color: 0x000000, emissive: 0xffc27a, emissiveIntensity: 3.0 }),
  lampCool: new THREE.MeshStandardMaterial({ color: 0x000000, emissive: 0xe8f0ff, emissiveIntensity: 2.2 }),
  screen: new THREE.MeshStandardMaterial({ color: 0x000000, emissive: 0x4fb0c9, emissiveIntensity: 1.3 }),
  ledGreen: new THREE.MeshStandardMaterial({ color: 0x000000, emissive: 0x38ff6a, emissiveIntensity: 2 }),
  ledRed: new THREE.MeshStandardMaterial({ color: 0x000000, emissive: 0xff3a2a, emissiveIntensity: 2 }),
  tactile: std({ map: genTactile(), color: 0xffffff, roughness: 0.55 }, 0.5),
  stripes: std({ map: genStripes(), color: 0xffffff, roughness: 0.5, metalness: 0.2 }, 0.5),
  grating: std({ map: genGrating(), color: 0xffffff, roughness: 0.6, metalness: 0.6 }, 0.4),
  paintLine: std({ color: 0xc99a22, roughness: 0.6 }),
  rock: std({ map: T.wallExt.map, roughnessMap: T.wallExt.rough, normalMap: T.wallExt.normal, color: 0x6d6a66, roughness: 1, envMapIntensity: 1.2 }, 6),
  roofMetal: std({ map: T.grimeHeavy.map, roughnessMap: T.grimeHeavy.rough, color: 0x3d4248, metalness: 0.7, roughness: 0.6 }, 3),
};
M.glass = new THREE.MeshStandardMaterial({ map: rainGlassTex, color: 0xffffff, transparent: true, roughness: 0.06, metalness: 0.0, depthWrite: false, side: THREE.DoubleSide, envMapIntensity: 1.6 });
M.glass.userData.tile = 1.6;
M.glass.onBeforeCompile = (sh) => {
  sh.fragmentShader = sh.fragmentShader.replace('#include <opaque_fragment>',
    `float specL = dot(reflectedLight.indirectSpecular + reflectedLight.directSpecular, vec3(0.333));
     diffuseColor.a = clamp(diffuseColor.a + specL * 0.9, 0.0, 0.85);
     #include <opaque_fragment>`);
};
M.glassClean = M.glass.clone(); // shared shader tweak via onBeforeCompile clone
M.glassClean.onBeforeCompile = M.glass.onBeforeCompile;
M.glassClean.opacity = 0.7;
M.mesh = new THREE.MeshStandardMaterial({ map: chainTex, alphaMap: chainTex, color: 0x9ea4a9, alphaTest: 0.45, side: THREE.DoubleSide, metalness: 0.8, roughness: 0.45 });
M.mesh.userData.tile = 0.12;

// =====================================================================
//  Geometry builder (merged by material)
// =====================================================================
const buckets = new Map();
const noShadow = new Set([M.glass, M.glassClean, M.mesh, M.lampWarm, M.lampCool, M.screen, M.ledGreen, M.ledRed]);
const V = (x, y, z) => new THREE.Vector3(x, y, z);
const _m = new THREE.Matrix4(), _q = new THREE.Quaternion(), _e = new THREE.Euler(), _s = new THREE.Vector3(1, 1, 1), _p = new THREE.Vector3();
const _o = new THREE.Object3D();

function addM(geo, mat, m) {
  let g = geo.index ? geo.toNonIndexed() : geo.clone();
  g.applyMatrix4(m);
  for (const k of Object.keys(g.attributes)) if (k !== 'position' && k !== 'normal' && k !== 'uv') g.deleteAttribute(k);
  if (!g.attributes.uv) g.setAttribute('uv', new THREE.Float32BufferAttribute(new Float32Array(g.attributes.position.count * 2), 2));
  g.clearGroups();
  let b = buckets.get(mat); if (!b) { b = []; buckets.set(mat, b); }
  b.push(g);
}
function add(geo, mat, x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0) {
  _e.set(rx, ry, rz); _q.setFromEuler(_e); _p.set(x, y, z); _m.compose(_p, _q, _s);
  addM(geo, mat, _m);
}
function boxGeo(w, h, d, tile = 1) {
  const g = new THREE.BoxGeometry(w, h, d);
  const uv = g.attributes.uv;
  const dims = [[d, h], [d, h], [w, d], [w, d], [w, h], [w, h]];
  for (let f = 0; f < 6; f++) for (let i = 0; i < 4; i++) {
    const idx = f * 4 + i; uv.setXY(idx, uv.getX(idx) * dims[f][0] / tile, uv.getY(idx) * dims[f][1] / tile);
  }
  return g;
}
// box by min/max corners
function boxMM(x0, y0, z0, x1, y1, z1, mat) {
  const t = mat.userData.tile || 1;
  add(boxGeo(x1 - x0, y1 - y0, z1 - z0, t), mat, (x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2);
}
function box(w, h, d, mat, x, y, z, rx = 0, ry = 0, rz = 0) {
  add(boxGeo(w, h, d, mat.userData.tile || 1), mat, x, y, z, rx, ry, rz);
}
function cylGeo(r0, r1, h, seg = 16, open = false, mat) {
  const g = new THREE.CylinderGeometry(r0, r1, h, seg, 1, open);
  const t = (mat && mat.userData.tile) || 1;
  const uv = g.attributes.uv;
  const circ = 2 * Math.PI * Math.max(r0, r1);
  for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * circ / t, uv.getY(i) * h / t);
  return g;
}
function cyl(r, h, mat, x, y, z, rx = 0, ry = 0, rz = 0, seg = 16) { add(cylGeo(r, r, h, seg, false, mat), mat, x, y, z, rx, ry, rz); }
function between(geoAlongZ, a, b, mat) {
  _o.position.copy(a).add(b).multiplyScalar(0.5);
  const dir = _p.subVectors(b, a).normalize();
  _o.up.set(0, 1, 0); if (Math.abs(dir.y) > 0.995) _o.up.set(1, 0, 0);
  _o.lookAt(b); _o.updateMatrix();
  addM(geoAlongZ, mat, _o.matrix);
}
function bar(a, b, w, h, mat) { between(boxGeo(w, h, a.distanceTo(b), mat.userData.tile || 1), a, b, mat); }
function rod(a, b, r, mat, seg = 8) {
  const L = a.distanceTo(b);
  const g = cylGeo(r, r, L, seg, false, mat); g.rotateX(Math.PI / 2);
  between(g, a, b, mat);
}
function ropeSeg(a, b, r = 0.026) {
  const L = a.distanceTo(b);
  const g = new THREE.CylinderGeometry(r, r, L, 8, 1, true);
  const uv = g.attributes.uv; for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i), uv.getY(i) * L / 0.09);
  g.rotateX(Math.PI / 2); between(g, a, b, M.rope);
}
function ibeam(a, b, h, w, mat) {
  const L = a.distanceTo(b), tf = h * 0.09, tw = w * 0.1, t = mat.userData.tile || 1;
  const f1 = boxGeo(w, tf, L, t); f1.translate(0, h / 2 - tf / 2, 0);
  const f2 = boxGeo(w, tf, L, t); f2.translate(0, -h / 2 + tf / 2, 0);
  const wb = boxGeo(tw, h - 2 * tf, L, t);
  const g = mergeGeometries([f1.toNonIndexed(), f2.toNonIndexed(), wb.toNonIndexed()]);
  between(g, a, b, mat);
}
function curveRope(points, r = 0.03, segs = 80) {
  const curve = new THREE.CatmullRomCurve3(points);
  const g = new THREE.TubeGeometry(curve, segs, r, 6, false);
  const L = curve.getLength(); const uv = g.attributes.uv;
  for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * L / 0.09, uv.getY(i));
  addM(g, M.rope, new THREE.Matrix4());
}

// =====================================================================
//  Collision model (2D, eye-level walker)
// =====================================================================
const walk = [];       // allowed regions for player centre [x0,z0,x1,z1]
const blocks = [];     // obstacles [x0,z0,x1,z1]
const PR = 0.3;
function walkRect(x0, z0, x1, z1) { walk.push([x0, z0, x1, z1]); }
function block(x0, z0, x1, z1) { blocks.push([Math.min(x0, x1) - PR, Math.min(z0, z1) - PR, Math.max(x0, x1) + PR, Math.max(z0, z1) + PR]); }
function canStand(x, z) {
  let ok = false;
  for (const r of walk) if (x >= r[0] && x <= r[2] && z >= r[1] && z <= r[3]) { ok = true; break; }
  if (!ok) return false;
  for (const b of blocks) if (x > b[0] && x < b[2] && z > b[1] && z < b[3]) return false;
  return true;
}

// =====================================================================
//  Layout constants
// =====================================================================
const H_ROOF = 8.8;          // underside of roof deck
const WX = -4.2, WY = 4.2, WZ = -7.0, WR = 2.5; // drive wheel
const CX = -4.2, CZ = -18.5, CL = 4.8, CW = 2.5; // cabin
const TRACK_Y = 7.4, HAUL_Y = WY + WR;           // rope heights
const TRX = [CX - 0.55, CX + 0.55];

// ---------------------------------------------------------------------
//  Wall helper with rectangular openings (glazed unless door)
// ---------------------------------------------------------------------
function wall(axis, c, t, u0, u1, h, openings, mat, glassMat = M.glass) {
  const cuts = new Set([u0, u1]);
  for (const o of openings) { cuts.add(o.u0); cuts.add(o.u1); }
  const us = [...cuts].sort((a, b) => a - b);
  for (let i = 0; i < us.length - 1; i++) {
    const a = us[i], b = us[i + 1], m = (a + b) / 2;
    const ops = openings.filter(o => m > o.u0 && m < o.u1).sort((p, q) => p.y0 - q.y0);
    let cur = 0;
    const seg = (y0, y1) => {
      if (y1 - y0 < 0.001) return;
      if (axis === 'x') boxMM(a, y0, c - t / 2, b, y1, c + t / 2, mat);
      else boxMM(c - t / 2, y0, a, c + t / 2, y1, b, mat);
    };
    for (const o of ops) { seg(cur, o.y0); cur = o.y1; }
    seg(cur, h);
  }
  for (const o of openings) {
    if (o.door) continue;
    const n = o.n || Math.max(1, Math.round((o.u1 - o.u0) / 1.6));
    const fw = 0.07, uw = o.u1 - o.u0, mh = o.y1 - o.y0;
    // glass
    if (axis === 'x') {
      add(new THREE.PlaneGeometry(uw, mh).scale(1, 1, 1), glassMat, (o.u0 + o.u1) / 2, (o.y0 + o.y1) / 2, c);
    } else {
      add(new THREE.PlaneGeometry(uw, mh), glassMat, c, (o.y0 + o.y1) / 2, (o.u0 + o.u1) / 2, 0, Math.PI / 2, 0);
    }
    // frames + mullions + transom
    const fr = M.steelGrey;
    const put = (u, y, wu, hy) => {
      if (axis === 'x') box(wu, hy, 0.12, fr, u, y, c); else box(0.12, hy, wu, fr, c, y, u);
    };
    put((o.u0 + o.u1) / 2, o.y0 + fw / 2, uw, fw);
    put((o.u0 + o.u1) / 2, o.y1 - fw / 2, uw, fw);
    for (let k = 0; k <= n; k++) put(o.u0 + uw * k / n, (o.y0 + o.y1) / 2, fw, mh);
    if (mh > 2.2) put((o.u0 + o.u1) / 2, o.y0 + mh * 0.62, uw, fw * 0.8);
    // sill (wet, outside)
    if (axis === 'x') box(uw + 0.1, 0.06, t + 0.12, M.galv, (o.u0 + o.u1) / 2, o.y0 - 0.03, c);
    else box(t + 0.12, 0.06, uw + 0.1, M.galv, c, o.y0 - 0.03, (o.u0 + o.u1) / 2);
  }
}

// =====================================================================
//  Build: floors, foundations
// =====================================================================
function buildShell() {
  // hall floor slab
  boxMM(-8.3, -0.4, -13.0, 6.3, 0, 0.3, M.floorInt);
  // platform slab (east of berth)
  boxMM(-2.8, -1.4, -25.2, 6.3, 0, -13.0, M.floorExt);
  // berth pit floor
  boxMM(-8.4, -1.8, -25.6, -2.8, -1.4, -13.0, M.concreteDark);
  // foundations down to the rock
  boxMM(-8.6, -7, -25.8, 6.5, -1.8, 0.5, M.wallExt);
  boxMM(-8.6, -1.8, -13.0, -8.3, -0.4, 0.5, M.wallExt);
  // entrance apron + canopy
  boxMM(-0.6, -0.4, 0.3, 4.6, 0, 4.0, M.floorExt);
  boxMM(-0.8, -4, 0.3, 4.8, -0.4, 4.2, M.wallExt);
  // drainage grate at entrance + platform north edge
  boxMM(0.4, 0.001, 0.35, 3.1, 0.012, 0.95, M.grating);
  boxMM(-2.3, 0.001, -25.1, 0.2, 0.012, -24.75, M.grating);

  // ---- hall walls ----
  const hWin = 1.0, hTop = 3.6;
  // south wall (z=0..-0.3 -> centre -0.15) along x
  wall('x', -0.15, 0.3, -8.3, 6.3, H_ROOF + 0.2, [
    { u0: 0.5, u1: 3.0, y0: 0, y1: 2.7, door: true },
    { u0: 0.5, u1: 3.0, y0: 2.95, y1: 6.2, n: 2 },
    { u0: 3.6, u1: 5.6, y0: hWin, y1: hTop, n: 1 },
    { u0: -7.2, u1: -1.2, y0: 4.6, y1: 7.6, n: 4 },
  ], M.wall);
  // exterior skin of south wall: timber cladding band above canopy
  boxMM(-8.35, 3.4, 0.0, 0.3, H_ROOF + 0.2, 0.06, M.timberWet);
  boxMM(3.2, 3.4, 0.0, 6.35, H_ROOF + 0.2, 0.06, M.timberWet);
  // east wall x=6..6.3
  wall('z', 6.15, 0.3, -13.0, 0.0, H_ROOF + 0.2, [
    { u0: -11.6, u1: -1.4, y0: hWin, y1: hTop, n: 6 },
    { u0: -11.6, u1: -1.4, y0: 5.4, y1: 7.6, n: 6 },
  ], M.wall);
  // west wall x=-8.3..-8
  wall('z', -8.15, 0.3, -13.0, 0.0, H_ROOF + 0.2, [
    { u0: -11.8, u1: -1.2, y0: 5.0, y1: 7.7, n: 6 },
  ], M.wall);
  // hall/platform partition (z=-13) from x=-0.9..6, door x=0..4
  wall('x', -13.0, 0.3, -0.9, 6.0, H_ROOF, [{ u0: 0.0, u1: 4.0, y0: 0, y1: 3.2, door: true }], M.wall);
  // timber slat lining on partition (hall side) above door
  for (let x = -0.85; x < 6; x += 0.16) box(0.08, 4.6, 0.05, M.timber, x, 6.0, -12.82);
  // header steel truss over equipment opening
  ibeam(V(-8.0, 8.2, -13.0), V(-0.9, 8.2, -13.0), 0.5, 0.3, M.steelGrey);

  // ---- platform east glazed wall (x=6) z -13..-25 ----
  wall('z', 6.15, 0.25, -25.2, -13.0, H_ROOF + 0.2, [
    { u0: -24.6, u1: -13.4, y0: 0.6, y1: 6.8, n: 7 },
  ], M.wall);

  // ---- roof (hall + platform continuous) ----
  boxMM(-8.6, H_ROOF, -25.8, 6.6, H_ROOF + 0.08, 0.6, M.timber);           // plank soffit
  boxMM(-8.8, H_ROOF + 0.08, -26.0, 6.8, H_ROOF + 0.45, 0.8, M.roofMetal); // roof build-up
  // fascia
  boxMM(-8.85, H_ROOF - 0.1, -26.05, 6.85, H_ROOF + 0.5, -25.95, M.timberWet);
  boxMM(-8.85, H_ROOF - 0.1, -26.05, -8.75, H_ROOF + 0.5, 0.8, M.timberWet);
  // glulam beams across x
  for (const z of [-1.4, -4.6, -7.8, -11.0, -14.6, -18.0, -21.4, -24.8]) {
    boxMM(-8.3, H_ROOF - 0.62, z - 0.11, 6.3, H_ROOF, z + 0.11, M.timberBeam);
  }
  // purlins along z
  for (let x = -7.4; x < 6; x += 1.6) boxMM(x - 0.06, H_ROOF - 0.16, -25.6, x + 0.06, H_ROOF, 0.0, M.timberBeam);

  // ---- platform columns ----
  for (const z of [-14.6, -18.0, -21.4, -24.8]) {
    ibeam(V(-8.0, -1.4, z), V(-8.0, H_ROOF - 0.6, z), 0.3, 0.3, M.steelGrey);
    box(0.5, 0.05, 0.5, M.galv, -8.0, -1.37, z);
  }
  // west berth railing & wind bracing
  for (const [za, zb] of [[-13.2, -14.6], [-14.6, -18.0], [-18.0, -21.4], [-21.4, -24.8]]) {
    rod(V(-8.0, 6.5, za), V(-8.0, 1.0, zb), 0.025, M.galv);
  }
  boxMM(-8.1, -1.4, -25.4, -7.9, -0.3, -13.0, M.wallExt); // pit upstand west
  railing([V(-8.0, -0.3, -13.1), V(-8.0, -0.3, -25.4)], M.galv, true);
  railing([V(-8.0, -0.3, -25.4), V(-2.9, -0.3, -25.4)], M.galv, true);

  // entrance canopy (timber, on steel posts)
  boxMM(-0.9, 3.25, 0.0, 4.9, 3.35, 4.3, M.timber);
  boxMM(-1.0, 3.35, -0.05, 5.0, 3.55, 4.4, M.roofMetal);
  for (const x of [-0.7, 4.7]) { ibeam(V(x, 0, 4.0), V(x, 3.25, 4.0), 0.18, 0.18, M.steelGrey); }
  boxMM(-0.9, 3.0, 3.95, 4.9, 3.25, 4.15, M.timberBeam);
  // apron railings (sides + south with closed gate)
  railing([V(-0.5, 0, 0.3), V(-0.5, 0, 3.95)], M.galv, true);
  railing([V(4.5, 0, 0.3), V(4.5, 0, 3.95)], M.galv, true);
  railing([V(-0.5, 0, 3.95), V(1.0, 0, 3.95)], M.galv, true);
  railing([V(3.0, 0, 3.95), V(4.5, 0, 3.95)], M.galv, true);
  box(2.0, 1.0, 0.05, M.stripes, 2.0, 0.6, 3.95);
  box(0.06, 1.15, 0.06, M.galv, 1.0, 0.575, 3.95); box(0.06, 1.15, 0.06, M.galv, 3.0, 0.575, 3.95);

  // entrance door frames (sliding doors parked open)
  for (const x of [0.5, 3.0]) box(0.12, 2.75, 0.34, M.steelGrey, x, 1.375, -0.15);
  box(2.62, 0.25, 0.34, M.steelGrey, 1.75, 2.82, -0.15);
  boxMM(-0.4, 0.05, -0.36, 0.5, 2.65, -0.3, M.steelGrey);
  boxMM(-0.38, 0.12, -0.38, 0.48, 2.58, -0.37, M.glassClean);
  boxMM(3.0, 0.05, -0.36, 3.9, 2.65, -0.3, M.steelGrey);
  boxMM(3.02, 0.12, -0.38, 3.88, 2.58, -0.37, M.glassClean);
  // door mat
  boxMM(0.6, 0, -2.2, 2.9, 0.015, -0.4, M.rubber);
}

// ---------------------------------------------------------------------
//  Railing: posts + rails + chain-link infill (pts on floor level)
// ---------------------------------------------------------------------
function railing(pts, mat = M.galv, infill = true, h = 1.1) {
  for (let i = 0; i < pts.length - 1; i++) {
    const a = pts[i], b = pts[i + 1];
    const L = a.distanceTo(b);
    const n = Math.max(1, Math.round(L / 1.6));
    for (let k = 0; k <= n; k++) {
      const p = a.clone().lerp(b, k / n);
      box(0.06, h, 0.06, mat, p.x, p.y + h / 2, p.z);
    }
    const up = (y) => [a.clone().setY(a.y + y), b.clone().setY(b.y + y)];
    rod(...up(h), 0.03, mat);
    rod(...up(0.55), 0.015, mat);
    rod(...up(0.1), 0.015, mat);
    if (infill) {
      const g = new THREE.PlaneGeometry(L, h - 0.2);
      const uv = g.attributes.uv; for (let j = 0; j < uv.count; j++) uv.setXY(j, uv.getX(j) * L / 0.12, uv.getY(j) * (h - 0.2) / 0.12);
      _o.position.set((a.x + b.x) / 2, a.y + 0.1 + (h - 0.2) / 2, (a.z + b.z) / 2);
      _o.rotation.set(0, Math.atan2(-(b.z - a.z), b.x - a.x), 0); _o.updateMatrix();
      addM(g, M.mesh, _o.matrix);
    }
  }
}

// =====================================================================
//  Drive wheel + machinery
// =====================================================================
function buildWheel() {
  // concrete plinth and drive pier
  boxMM(WX - 2.0, 0, WZ - 2.3, WX + 2.0, 0.6, WZ + 1.8, M.concreteDark);
  boxMM(-7.9, 0, WZ - 1.3, -5.9, 3.0, WZ + 1.5, M.concreteDark);
  // safety paint edge on plinth
  boxMM(WX - 2.01, 0.5, WZ - 2.31, WX + 2.01, 0.608, WZ - 2.24, M.stripes);
  boxMM(WX + 1.94, 0.5, WZ - 2.31, WX + 2.01, 0.608, WZ + 1.81, M.stripes);

  const rimMat = M.steelBlue;
  // rim: web band + flanges + rope liner
  const band = cylGeo(WR - 0.1, WR - 0.1, 0.24, 96, true, rimMat); band.rotateZ(Math.PI / 2);
  add(band, M.steelBlue, WX, WY, WZ);
  const band2 = cylGeo(WR - 0.16, WR - 0.16, 0.3, 96, true, rimMat); band2.rotateZ(Math.PI / 2);
  add(band2, M.steelBlue, WX, WY, WZ);
  for (const dx of [-0.13, 0.13]) {
    const t = new THREE.TorusGeometry(WR - 0.02, 0.05, 8, 120); t.rotateY(Math.PI / 2);
    add(t, M.steelBlue, WX + dx, WY, WZ);
  }
  const liner = new THREE.TorusGeometry(WR - 0.07, 0.075, 8, 120); liner.rotateY(Math.PI / 2);
  add(liner, M.rubber, WX, WY, WZ);
  // inner ring stiffener
  const t2 = new THREE.TorusGeometry(WR * 0.55, 0.06, 6, 80); t2.rotateY(Math.PI / 2);
  add(t2, M.steelBlue, WX - 0.1, WY, WZ); add(t2, M.steelBlue, WX + 0.1, WY, WZ);
  // spokes (double plane, converging at rim)
  const NS = 12;
  for (let i = 0; i < NS; i++) {
    const a = (i / NS) * Math.PI * 2 + 0.13;
    const ca = Math.cos(a), sa = Math.sin(a);
    for (const s of [-1, 1]) {
      const p0 = V(WX + s * 0.3, WY + sa * 0.52, WZ + ca * 0.52);
      const p1 = V(WX + s * 0.1, WY + sa * (WR - 0.17), WZ + ca * (WR - 0.17));
      ibeam(p0, p1, 0.16, 0.1, M.steelBlue);
    }
    // gusset plate at rim
    const pg = V(WX, WY + sa * (WR - 0.2), WZ + ca * (WR - 0.2));
    box(0.24, 0.02, 0.28, M.steelBlue, pg.x, pg.y, pg.z, a, 0, 0);
  }
  // hub
  cyl(0.58, 0.72, M.steelBlue, WX, WY, WZ, 0, 0, Math.PI / 2, 28);
  cyl(0.42, 0.8, M.steelGrey, WX, WY, WZ, 0, 0, Math.PI / 2, 24);
  for (let i = 0; i < 12; i++) {
    const a = i / 12 * Math.PI * 2;
    for (const s of [-1, 1]) cyl(0.035, 0.08, M.steelBare, WX + s * 0.4, WY + Math.sin(a) * 0.5, WZ + Math.cos(a) * 0.5, 0, 0, Math.PI / 2, 6);
  }
  // axle
  cyl(0.15, 3.4, M.steelBare, WX - 0.2, WY, WZ, 0, 0, Math.PI / 2, 18);
  // brake disc + caliper
  cyl(1.0, 0.05, M.steelWetDark, WX + 0.78, WY, WZ, 0, 0, Math.PI / 2, 48);
  { const fr = new THREE.TorusGeometry(0.9, 0.09, 4, 64); fr.rotateY(Math.PI / 2); fr.scale(0.35, 1, 1); add(fr, M.steelBare, WX + 0.78, WY, WZ); }
  cyl(0.5, 0.12, M.steelGrey, WX + 0.78, WY, WZ, 0, 0, Math.PI / 2, 24);
  for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; cyl(0.04, 0.14, M.steelBare, WX + 0.78, WY + Math.sin(a) * 0.36, WZ + Math.cos(a) * 0.36, 0, 0, Math.PI / 2, 6); }
  box(0.34, 0.5, 0.42, M.steelYellow, WX + 0.78, WY - 0.95, WZ - 0.55, 0.5, 0, 0);
  box(0.18, 1.7, 0.18, M.steelGrey, WX + 0.78, 1.45, WZ - 0.95);
  box(0.42, 0.3, 0.32, M.steelYellow, WX + 0.78, 2.4, WZ - 0.85);
  // A-frames + bearing blocks
  for (const sx of [-1.2, 1.2]) {
    const x = WX + sx;
    const top = V(x, WY - 0.42, WZ);
    ibeam(V(x, 0.6, WZ - 1.9), top.clone().add(V(0, 0, -0.25)), 0.3, 0.22, M.steelGrey);
    ibeam(V(x, 0.6, WZ + 1.5), top.clone().add(V(0, 0, 0.25)), 0.3, 0.22, M.steelGrey);
    ibeam(V(x, 2.0, WZ - 1.18), V(x, 2.0, WZ + 0.86), 0.24, 0.16, M.steelGrey);
    rod(V(x, 0.7, WZ - 1.6), V(x, 1.9, WZ + 0.8), 0.04, M.steelGrey);
    box(0.5, 0.06, 0.5, M.steelGrey, x, 0.63, WZ - 1.9); box(0.5, 0.06, 0.5, M.steelGrey, x, 0.63, WZ + 1.5);
    for (const dz of [-0.18, 0.18]) for (const zz of [WZ - 1.9, WZ + 1.5]) cyl(0.03, 0.1, M.steelBare, x + 0.18, 0.69, zz + dz, 0, 0, 0, 6);
    // bearing housing
    box(0.55, 0.16, 0.95, M.steelGrey, x, WY - 0.36, WZ);
    box(0.45, 0.42, 0.62, M.steelBlue, x, WY - 0.1, WZ);
    cyl(0.3, 0.5, M.steelBlue, x, WY, WZ, 0, 0, Math.PI / 2, 22);
    cyl(0.2, 0.56, M.steelGrey, x, WY, WZ, 0, 0, Math.PI / 2, 18);
    cyl(0.03, 0.12, M.ledGreen, x, WY + 0.32, WZ + 0.25, 0, 0, 0, 6); // sensor
  }
  // drive train on pier: gearbox + coupling + motor
  const gx = -6.9;
  boxMM(gx - 0.8, 3.0, WZ - 1.0, gx + 0.8, 4.9, WZ + 0.9, M.steelBlue);
  boxMM(gx - 0.85, 3.6, WZ - 1.05, gx + 0.85, 3.7, WZ + 0.95, M.steelBlue); // flange split line
  for (let k = -0.8; k <= 0.85; k += 0.32) boxMM(gx - 0.86, 3.05, WZ + k - 0.03, gx + 0.86, 4.85, WZ + k + 0.03, M.steelBlue); // ribs
  cyl(0.38, 0.25, M.steelBlue, gx + 0.9, WY, WZ, 0, 0, Math.PI / 2, 24);
  cyl(0.24, 0.9, M.steelBare, WX - 1.95, WY, WZ, 0, 0, Math.PI / 2, 18); // coupling
  cyl(0.32, 0.18, M.steelYellow, WX - 1.65, WY, WZ, 0, 0, Math.PI / 2, 20); // coupling guard
  box(0.6, 0.2, 0.25, M.steelGrey, gx, 5.0, WZ + 0.3); // breather/inspection
  cyl(0.06, 0.4, M.steelBare, gx + 0.4, 5.1, WZ - 0.4);
  // motor
  const mz = WZ + 1.2 + 0.0;
  const my = 3.55;
  cyl(0.48, 1.4, M.steelGrey, gx, my, mz + 0.2, Math.PI / 2, 0, 0, 28);
  for (let i = 0; i < 18; i++) {
    const a = i / 18 * Math.PI * 2;
    box(0.035, 0.12, 1.3, M.steelGrey, gx + Math.cos(a) * 0.52, my + Math.sin(a) * 0.52, mz + 0.2, 0, 0, a + Math.PI / 2);
  }
  cyl(0.5, 0.3, M.steelGrey, gx, my, mz + 1.0, Math.PI / 2, 0, 0, 28); // fan cowl
  cyl(0.3, 0.32, M.steelBare, gx, my, mz + 1.16, Math.PI / 2, 0, 0, 20);
  box(0.36, 0.3, 0.4, M.steelGrey, gx + 0.5, my + 0.35, mz + 0.1); // terminal box
  rod(V(gx + 0.6, my + 0.3, mz + 0.1), V(-7.95, 2.5, mz + 0.1), 0.04, M.rubber);
  // motor feet
  box(1.1, 0.1, 1.2, M.steelGrey, gx, 3.05, mz + 0.2);

  // control cabinet on the pier side + conduit
  boxMM(-7.95, 0, -2.2, -7.25, 2.1, -0.9, M.steelGrey);
  box(0.02, 0.25, 0.35, M.screen, -7.24, 1.55, -1.55);
  for (let i = 0; i < 4; i++) cyl(0.025, 0.02, i % 2 ? M.ledGreen : M.ledRed, -7.24, 1.2, -1.85 + i * 0.12, 0, 0, Math.PI / 2, 8);
  boxMM(-7.95, 2.1, -2.1, -7.75, 6.5, -1.95, M.galv); // cable tray riser
  boxMM(-7.95, 6.4, -12.6, -7.65, 6.5, -1.9, M.galv); // cable tray along wall
  for (let z = -12.4; z < -2; z += 1.5) box(0.3, 0.03, 0.04, M.galv, -7.8, 6.36, z);
  for (let i = 0; i < 3; i++) rod(V(-7.84 + i * 0.07, 6.53, -12.6), V(-7.84 + i * 0.07, 6.53, -2.0), 0.022, M.rubber, 6);

  // maintenance corner: spare rope reel, oil drums, tool cabinet, spare rollers
  cyl(0.75, 0.9, M.timberBeam, -6.4, 0.75, -1.4, 0, 0, Math.PI / 2, 24);
  cyl(0.55, 0.92, M.rope, -6.4, 0.75, -1.4, 0, 0, Math.PI / 2, 24);
  for (const [x, z, c] of [[-5.3, -1.0, M.steelBlue], [-4.6, -1.05, M.cabinRed], [-5.0, -1.7, M.steelBlue]]) {
    cyl(0.29, 0.88, c, x, 0.44, z, 0, 0, 0, 18);
    for (const y of [0.25, 0.62]) { const r = new THREE.TorusGeometry(0.29, 0.015, 4, 24); r.rotateX(Math.PI / 2); add(r, c, x, y, z); }
  }
  boxMM(-3.6, 0, -0.95, -2.2, 1.9, -0.45, M.cabinRed);
  boxMM(-3.58, 1.0, -0.47, -2.92, 1.02, -0.43, M.galv);
  box(0.02, 0.2, 0.02, M.chrome, -2.95, 1.2, -0.42);
  boxMM(-1.9, 0, -2.4, -1.2, 0.12, -1.0, M.timberBeam); // pallet
  for (let i = 0; i < 3; i++) cyl(0.2, 0.14, M.steelBare, -1.55, 0.2 + i * 0.14, -1.4 - (i % 2) * 0.5, 0, 0, 0, 16);
  // ---- ropes ----
  // haul rope: groove arc over the top/rear quarter, down to counterweight; and out to carriage
  const arc = new THREE.TorusGeometry(WR - 0.05, 0.028, 6, 40, Math.PI / 2); arc.rotateY(-Math.PI / 2);
  add(arc, M.rope, WX, WY, WZ);
  ropeSeg(V(WX, WY, WZ + WR - 0.05), V(WX, 2.45, WZ + WR - 0.05), 0.028);
  // counterweight in guide cage over a pit
  const cwZ = WZ + WR - 0.05;
  boxMM(WX - 0.9, -0.6, cwZ - 0.55, WX + 0.9, 0.008, cwZ + 0.55, M.dark);
  boxMM(WX - 0.62, 1.0, cwZ - 0.38, WX + 0.62, 2.3, cwZ + 0.38, M.concreteDark);
  boxMM(WX - 0.66, 2.3, cwZ - 0.4, WX + 0.66, 2.38, cwZ + 0.4, M.steelYellow);
  box(0.12, 0.18, 0.05, M.steelBare, WX, 2.48, cwZ);
  for (const sx of [-0.85, 0.85]) for (const sz of [-0.5, 0.5]) box(0.08, 3.6, 0.08, M.steelYellow, WX + sx, 1.8, cwZ + sz);
  for (const y of [0.9, 2.0, 3.3]) {
    boxMM(WX - 0.9, y, cwZ - 0.54, WX + 0.9, y + 0.06, cwZ - 0.46, M.steelYellow);
    boxMM(WX - 0.9, y, cwZ + 0.46, WX + 0.9, y + 0.06, cwZ + 0.54, M.steelYellow);
  }
  boxMM(WX - 0.9, 0.0, cwZ + 0.47, WX + 0.9, 3.3, cwZ + 0.5, M.mesh);
  boxMM(WX + 0.82, 0.0, cwZ - 0.5, WX + 0.85, 3.3, cwZ + 0.5, M.mesh);

  // haul rope out of the station to carriage
  ropeSeg(V(WX, HAUL_Y - 0.05, WZ), V(CX, HAUL_Y - 0.05, CZ + 1.6), 0.028);

  // track-rope anchor block with drums
  boxMM(-5.7, 0, -12.7, -2.7, 1.2, -10.3, M.concreteDark);
  for (const tx of TRX) {
    cyl(0.45, 0.5, M.steelYellow, tx, 1.75, -11.5, 0, 0, Math.PI / 2, 24);
    for (const d of [-0.28, 0.28]) cyl(0.55, 0.06, M.steelYellow, tx + d, 1.75, -11.5, 0, 0, Math.PI / 2, 24);
    box(0.7, 0.6, 0.8, M.steelGrey, tx, 1.35, -11.5);
    // rope turns on drum
    for (let k = -2; k <= 2; k++) { const t = new THREE.TorusGeometry(0.475, 0.03, 6, 28); t.rotateY(Math.PI / 2); add(t, M.rope, tx + k * 0.065, 1.75, -11.5); }
    ropeSeg(V(tx, 2.2, -11.55), V(tx, TRACK_Y, -12.75), 0.034);
  }
  // saddle portal at z=-12.75 (in hall)
  const pz = -12.75;
  ibeam(V(-6.6, 0, pz), V(-6.6, 6.3, pz), 0.34, 0.3, M.steelGrey);
  ibeam(V(-1.9, 0, pz), V(-1.9, 6.3, pz), 0.34, 0.3, M.steelGrey);
  ibeam(V(-6.75, 6.45, pz), V(-1.75, 6.45, pz), 0.34, 0.3, M.steelGrey);
  for (const tx of TRX) {
    box(0.22, 0.95, 0.3, M.steelGrey, tx, 6.95, pz);
    box(0.3, 0.12, 0.9, M.steelBare, tx, TRACK_Y - 0.09, pz); // saddle shoe
  }
  // haul rope guide sheave
  cyl(0.22, 0.12, M.steelYellow, CX, HAUL_Y - 0.3, pz, 0, 0, Math.PI / 2, 20);
  box(0.06, 0.4, 0.3, M.steelGrey, CX - 0.1, HAUL_Y - 0.45, pz); box(0.06, 0.4, 0.3, M.steelGrey, CX + 0.1, HAUL_Y - 0.45, pz);
  // track ropes inside the station
  for (const tx of TRX) ropeSeg(V(tx, TRACK_Y, pz), V(tx, TRACK_Y, -25.6), 0.034);
  // saddle portal at north end
  const nz = -25.5;
  ibeam(V(-7.4, -1.4, nz), V(-7.4, 6.3, nz), 0.34, 0.3, M.steelGrey);
  ibeam(V(-1.0, -1.4, nz), V(-1.0, 6.3, nz), 0.34, 0.3, M.steelGrey);
  ibeam(V(-7.55, 6.45, nz), V(-0.85, 6.45, nz), 0.34, 0.3, M.steelGrey);
  for (const tx of TRX) { box(0.22, 0.95, 0.3, M.steelGrey, tx, 6.95, nz); box(0.3, 0.12, 1.2, M.steelBare, tx, TRACK_Y - 0.09, nz - 0.2, 0.06, 0, 0); }
  cyl(0.22, 0.12, M.steelYellow, CX, HAUL_Y - 0.3, nz, 0, 0, Math.PI / 2, 20);

  // ropes leaving to the valley, over a misty lattice tower
  const tz = -118, ty = -14;
  for (const tx of TRX) curveRope([V(tx, TRACK_Y, nz), V(tx, TRACK_Y - 3.0, nz - 12), V(tx, (TRACK_Y + ty) / 2 - 2.5, (nz + tz) / 2), V(tx, ty + 0.5, tz), V(tx, ty - 30, tz - 120), V(tx, ty - 140, tz - 520)], 0.036, 140);
  curveRope([V(CX, HAUL_Y - 0.05, CZ - 1.6), V(CX, HAUL_Y - 0.1, nz), V(CX, HAUL_Y - 3.3, nz - 12), V(CX, (HAUL_Y + ty) / 2 - 3.2, (nz + tz) / 2), V(CX, ty - 0.2, tz), V(CX, ty - 31, tz - 120), V(CX, ty - 141, tz - 520)], 0.028, 140);
  // lattice tower
  const baseY = -62, topY = ty - 0.4;
  const legs = [[-4, -3], [4, -3], [4, 3], [-4, 3]];
  const topH = [[-1.6, -1.2], [1.6, -1.2], [1.6, 1.2], [-1.6, 1.2]];
  const lv = (i, f) => V(CX + legs[i][0] * (1 - f) + topH[i][0] * f, baseY + (topY - 1.2 - baseY) * f, tz + legs[i][1] * (1 - f) + topH[i][1] * f);
  const NSEG = 8;
  for (let i = 0; i < 4; i++) {
    for (let s = 0; s < NSEG; s++) {
      const f0 = s / NSEG, f1 = (s + 1) / NSEG, j = (i + 1) % 4;
      rod(lv(i, f0), lv(i, f1), 0.18, M.steelWetDark, 6);
      rod(lv(i, f0), lv(j, f1), 0.07, M.steelWetDark, 4);
      rod(lv(j, f0), lv(i, f1), 0.07, M.steelWetDark, 4);
      rod(lv(i, f1), lv(j, f1), 0.08, M.steelWetDark, 4);
    }
  }
  boxMM(CX - 2.6, topY - 1.2, tz - 1.6, CX + 2.6, topY - 0.6, tz + 1.6, M.steelWetDark);
  for (const tx of TRX) box(0.3, 0.6, 3.2, M.steelWetDark, tx, ty, tz);
}

// =====================================================================
//  Cabin + carriage + hanger
// =====================================================================
function buildCabin() {
  const x0 = CX - CW / 2, x1 = CX + CW / 2, z0 = CZ - CL / 2, z1 = CZ + CL / 2;
  const yF = 0.05, yW0 = 1.0, yW1 = 2.2, yB = 2.45, t = 0.05;
  // underframe + bumper
  boxMM(x0 + 0.05, -0.32, z0 + 0.05, x1 - 0.05, 0.0, z1 - 0.05, M.dark);
  boxMM(x0 - 0.03, -0.02, z0 - 0.03, x1 + 0.03, 0.08, z1 + 0.03, M.rubber);
  // guide shoes
  for (const z of [z0 + 0.4, z1 - 0.4]) { box(0.3, 0.2, 0.25, M.steelGrey, x0 - 0.1, -0.15, z); box(0.3, 0.2, 0.25, M.steelGrey, x1 + 0.08, -0.18, z); }
  // floor
  boxMM(x0 + t, 0.0, z0 + t, x1 - t, yF + 0.04, z1 - t, M.cabinFloor);
  // lower body panels
  boxMM(x0, 0.08, z0, x0 + t, yW0, z1, M.cabinRed);                // west
  boxMM(x0, 0.08, z0, x1, yW0, z0 + t, M.cabinRed);                // north end
  boxMM(x0, 0.08, z1 - t, x1, yW0, z1, M.cabinRed);                // south end
  const dz0 = CZ - 0.82, dz1 = CZ + 0.82;                           // door opening (east)
  boxMM(x1 - t, 0.08, z0, x1, yW0, dz0, M.cabinRed);
  boxMM(x1 - t, 0.08, dz1, x1, yW0, z1, M.cabinRed);
  // belt rail + skirt line
  for (const [a, b, c, d] of [[x0 - 0.02, z0, x0 + 0.01, z1], [x1 - 0.01, z0, x1 + 0.02, dz0], [x1 - 0.01, dz1, x1 + 0.02, z1]]) {
    boxMM(a, yW0 - 0.05, b, c, yW0 + 0.02, d, M.cream);
    boxMM(a, 0.32, b, c, 0.36, d, M.cream);
  }
  boxMM(x0, yW0 - 0.05, z0 - 0.02, x1, yW0 + 0.02, z0 + 0.01, M.cream);
  boxMM(x0, yW0 - 0.05, z1 - 0.01, x1, yW0 + 0.02, z1 + 0.02, M.cream);
  // frieze band
  boxMM(x0, yW1, z0, x1, yB, z1, M.cream);
  // corner posts (rounded)
  for (const [x, z] of [[x0, z0], [x1, z0], [x0, z1], [x1, z1]]) cyl(0.07, yB - 0.08, M.cabinRed, x, (yB + 0.08) / 2, z, 0, 0, 0, 12);
  // window band: glass + mullions
  const glassPane = (axis, c, u0, u1) => {
    if (axis === 'z') add(new THREE.PlaneGeometry(u1 - u0, yW1 - yW0), M.glass, c, (yW0 + yW1) / 2, (u0 + u1) / 2, 0, Math.PI / 2, 0);
    else add(new THREE.PlaneGeometry(u1 - u0, yW1 - yW0), M.glass, (u0 + u1) / 2, (yW0 + yW1) / 2, c);
  };
  const mullion = (x, z) => box(0.08, yW1 - yW0, 0.08, M.cabinRed, x, (yW0 + yW1) / 2, z);
  // west side 3 panes
  const wz = [z0 + 0.07, CZ - 0.8, CZ + 0.8, z1 - 0.07];
  for (let i = 0; i < 3; i++) glassPane('z', x0 + 0.02, wz[i], wz[i + 1]);
  mullion(x0 + 0.02, CZ - 0.8); mullion(x0 + 0.02, CZ + 0.8);
  // east side: panes either side of door
  glassPane('z', x1 - 0.02, z0 + 0.07, dz0 - 0.05); glassPane('z', x1 - 0.02, dz1 + 0.05, z1 - 0.07);
  mullion(x1 - 0.02, dz0 - 0.04); mullion(x1 - 0.02, dz1 + 0.04);
  // ends
  for (const z of [z0 + 0.02, z1 - 0.02]) { glassPane('x', z, x0 + 0.07, CX); glassPane('x', z, CX, x1 - 0.07); mullion(CX, z); }
  // window rubber gaskets (top/bottom)
  for (const [a, b] of [[yW0, yW0 + 0.03], [yW1 - 0.03, yW1]]) {
    boxMM(x0 - 0.005, a, z0, x0 + 0.06, b, z1, M.rubber);
    boxMM(x1 - 0.06, a, z0, x1 + 0.005, b, dz0, M.rubber); boxMM(x1 - 0.06, a, dz1, x1 + 0.005, b, z1, M.rubber);
  }
  // door leaves (closed) + track + handles
  for (const [za, zb] of [[dz0, CZ - 0.01], [CZ + 0.01, dz1]]) {
    const xx = x1 + 0.025;
    boxMM(xx - 0.03, yF, za, xx + 0.01, 1.05, zb, M.cabinRed);
    boxMM(xx - 0.03, 1.95, za, xx + 0.01, 2.17, zb, M.cabinRed);
    boxMM(xx - 0.03, 1.05, za, xx + 0.01, 1.95, za + 0.07, M.cabinRed);
    boxMM(xx - 0.03, 1.05, zb - 0.07, xx + 0.01, 1.95, zb, M.cabinRed);
    add(new THREE.PlaneGeometry(zb - za - 0.14, 0.9), M.glass, xx - 0.01, 1.5, (za + zb) / 2, 0, Math.PI / 2, 0);
    boxMM(xx + 0.01, 0.32, za, xx + 0.02, 0.36, zb, M.cream);
    const hz = za < CZ ? zb - 0.12 : za + 0.12;
    rod(V(xx + 0.07, 0.95, hz), V(xx + 0.07, 1.25, hz), 0.016, M.chrome);
    box(0.05, 0.03, 0.03, M.chrome, xx + 0.045, 0.95, hz); box(0.05, 0.03, 0.03, M.chrome, xx + 0.045, 1.25, hz);
  }
  boxMM(x1 + 0.01, 0.04, CZ - 0.012, x1 + 0.045, 2.15, CZ + 0.012, M.rubber); // centre seal
  boxMM(x1, 2.19, dz0 - 0.15, x1 + 0.09, 2.3, dz1 + 0.15, M.galv);          // door track
  boxMM(x1 - 0.02, 0.0, dz0 - 0.05, x1 + 0.12, 0.04, dz1 + 0.05, M.galv);   // threshold plate
  // frieze lettering both sides
  const nameTex = textTex(1024, 96, (x, w, h) => {
    x.fillStyle = '#e6dfcf'; x.fillRect(0, 0, w, h);
    x.fillStyle = '#7a1714'; x.font = 'bold 58px Segoe UI, Arial, sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle';
    x.fillText('GRAUHORNBAHN  ·  KABINE 2', w / 2, h / 2 + 3);
  });
  const nameMat = new THREE.MeshStandardMaterial({ map: nameTex, roughness: 0.6, metalness: 0.2 });
  add(new THREE.PlaneGeometry(3.4, 0.22), nameMat, x1 + 0.006, (yW1 + yB) / 2, CZ, 0, Math.PI / 2, 0);
  add(new THREE.PlaneGeometry(3.4, 0.22), nameMat, x0 - 0.006, (yW1 + yB) / 2, CZ, 0, -Math.PI / 2, 0);
  // roof
  boxMM(x0 - 0.06, yB, z0 - 0.06, x1 + 0.06, yB + 0.08, z1 + 0.06, M.cream);
  boxMM(x0 + 0.18, yB + 0.08, z0 + 0.25, x1 - 0.18, yB + 0.22, z1 - 0.25, M.cream);
  boxMM(x0 - 0.08, yB + 0.06, z0 - 0.08, x0 - 0.04, yB + 0.12, z1 + 0.08, M.galv); // gutters
  boxMM(x1 + 0.04, yB + 0.06, z0 - 0.08, x1 + 0.08, yB + 0.12, z1 + 0.08, M.galv);
  // roof maintenance rail
  for (const x of [x0 + 0.08, x1 - 0.08]) {
    for (const z of [z0 + 0.1, CZ, z1 - 0.1]) box(0.03, 0.42, 0.03, M.steelYellow, x, yB + 0.29, z);
    rod(V(x, yB + 0.5, z0 + 0.1), V(x, yB + 0.5, z1 - 0.1), 0.018, M.steelYellow);
  }
  // headlights / marker lights at ends
  for (const z of [z0 - 0.01, z1 + 0.01]) for (const dx of [-0.85, 0.85]) cyl(0.07, 0.04, z < CZ ? M.lampWarm : M.ledRed, CX + dx, 0.62, z, Math.PI / 2, 0, 0, 12);

  // ---- interior ----
  boxMM(x0 + t, yB - 0.1, z0 + t, x1 - t, yB - 0.04, z1 - t, M.cream);           // ceiling
  boxMM(CX - 0.6, yB - 0.13, z0 + 0.5, CX - 0.4, yB - 0.1, z1 - 0.5, M.lampWarm);  // light strips
  boxMM(CX + 0.4, yB - 0.13, z0 + 0.5, CX + 0.6, yB - 0.1, z1 - 0.5, M.lampWarm);
  for (const z of [z0 + 0.32, z1 - 0.32]) {           // end benches
    boxMM(x0 + 0.1, 0.42, z - 0.22, x1 - 0.1, 0.48, z + 0.22, M.seat);
    boxMM(x0 + 0.1, 0.05, z - 0.18, x1 - 0.1, 0.42, z + 0.18, M.dark);
  }
  for (const z of [CZ - 0.9, CZ + 0.9]) rod(V(CX - 0.35, 0.09, z), V(CX - 0.35, yB - 0.1, z), 0.022, M.chrome);
  rod(V(x0 + 0.12, 1.15, z0 + 0.2), V(x0 + 0.12, 1.15, z1 - 0.2), 0.018, M.chrome);
  rod(V(x0 + 0.2, 2.15, z0 + 0.6), V(x0 + 0.2, 2.15, z1 - 0.6), 0.016, M.chrome);
  // operator console north-east corner
  boxMM(x1 - 0.65, 0.05, z0 + 0.06, x1 - 0.07, 0.95, z0 + 0.5, M.dark);
  box(0.56, 0.02, 0.36, M.steelGrey, x1 - 0.36, 0.98, z0 + 0.3, -0.35, 0, 0);
  box(0.2, 0.01, 0.14, M.screen, x1 - 0.45, 0.995, z0 + 0.3, -0.35, 0, 0);
  for (let i = 0; i < 4; i++) cyl(0.018, 0.02, i % 2 ? M.ledGreen : M.ledRed, x1 - 0.22, 1.0, z0 + 0.2 + i * 0.06, 0, 0, 0, 8);

  // ---- hanger + carriage ----
  const yY = yB + 0.22;
  boxMM(CX - 0.18, yY, CZ - 1.25, CX + 0.18, yY + 0.25, CZ + 1.25, M.steelGrey);       // roof yoke
  for (const z of [CZ - 1.15, CZ + 1.15]) boxMM(CX - 0.6, yY - 0.02, z - 0.12, CX + 0.6, yY + 0.06, z + 0.12, M.steelGrey);
  const pivotY = 6.55;
  // two tubular arms (inverted V seen from platform) + stiffener
  for (const s of [-1, 1]) {
    rod(V(CX, yY + 0.2, CZ + s * 1.05), V(CX, pivotY - 0.2, CZ + s * 0.18), 0.085, M.steelGrey, 14);
    rod(V(CX, yY + 0.2, CZ + s * 1.05), V(CX, yY + 0.22, CZ + s * 1.05), 0.12, M.steelGrey, 14);
  }
  rod(V(CX, 4.0, CZ - 0.78), V(CX, 4.0, CZ + 0.78), 0.06, M.steelGrey, 10);
  rod(V(CX, 5.3, CZ - 0.42), V(CX, 5.3, CZ + 0.42), 0.05, M.steelGrey, 10);
  box(0.3, 0.45, 0.55, M.steelGrey, CX, pivotY - 0.05, CZ);                              // pivot head
  cyl(0.09, 0.5, M.steelBare, CX, pivotY + 0.08, CZ, 0, 0, Math.PI / 2, 12);           // pivot pin
  // carriage frame
  const cz0 = CZ - 1.5, cz1 = CZ + 1.5;
  boxMM(TRX[0] - 0.2, 6.7, cz0, TRX[1] + 0.2, 6.92, cz1, M.steelYellow);                // crossframe under ropes
  for (const tx of TRX) {
    for (const s of [-1, 1]) boxMM(tx + s * 0.11 - 0.02, 6.85, cz0 - 0.05, tx + s * 0.11 + 0.02, TRACK_Y + 0.42, cz1 + 0.05, M.steelYellow);
    for (let k = 0; k < 4; k++) {
      const z = cz0 + 0.42 + k * 0.72;
      cyl(0.17, 0.12, M.steelBare, tx, TRACK_Y + 0.034 + 0.17, z, 0, 0, Math.PI / 2, 18);
      cyl(0.06, 0.28, M.steelGrey, tx, TRACK_Y + 0.2, z, 0, 0, Math.PI / 2, 8);
    }
    boxMM(tx - 0.13, TRACK_Y + 0.42, cz0 - 0.05, tx + 0.13, TRACK_Y + 0.46, cz1 + 0.05, M.steelYellow);
  }
  // haul-rope sockets at both ends
  for (const s of [-1, 1]) {
    const z = s < 0 ? cz0 : cz1;
    box(0.26, 0.26, 0.4, M.steelGrey, CX, HAUL_Y - 0.05, z + s * 0.1);
    add(cylGeo(0.06, 0.13, 0.4, 12, false, M.steelBare).rotateX(s * Math.PI / 2), M.steelBare, CX, HAUL_Y - 0.05, z + s * 0.45);
    box(0.08, 0.3, 0.3, M.steelYellow, CX, 6.82, z + s * 0.12);
  }
  // cabin interior light
  const cl = new THREE.PointLight(0xffc98a, 2.2, 6, 2); cl.position.set(CX, 2.1, CZ); scene.add(cl);

  // collision-free; cabin is beyond platform edge
}

// =====================================================================
//  Platform: edge, railings, gate, furniture, signage
// =====================================================================
function signMat(w, h, draw, emissive = false) {
  const t = textTex(w, h, draw);
  return emissive ? new THREE.MeshStandardMaterial({ map: t, emissiveMap: t, emissive: 0xffffff, emissiveIntensity: 0.9, roughness: 0.4 })
    : new THREE.MeshStandardMaterial({ map: t, roughness: 0.5, metalness: 0.1 });
}
function signText(x, w, h, bg, fg, lines, size) {
  x.fillStyle = bg; x.fillRect(0, 0, w, h);
  x.fillStyle = fg; x.textAlign = 'center'; x.textBaseline = 'middle';
  lines.forEach((l, i) => { x.font = `${i === 0 ? 'bold ' : ''}${size[i] || size[0]}px Segoe UI, Arial, sans-serif`; x.fillText(l, w / 2, h * (i + 1) / (lines.length + 1)); });
}

function buildPlatform() {
  // edge coping & tactile strip
  boxMM(-2.85, -1.4, -25.2, -2.78, 0.0, -13.0, M.concreteDark);
  boxMM(-2.8, 0.0, -25.0, -2.35, 0.012, -13.2, M.tactile);
  boxMM(-2.25, 0.0, -25.0, -2.18, 0.01, -13.2, M.paintLine);
  // edge railing with closed boarding gate at the cabin door
  railing([V(-2.72, 0, -13.2), V(-2.72, 0, CZ + 1.05)]);
  railing([V(-2.72, 0, CZ - 1.05), V(-2.72, 0, -24.95)]);
  // sliding gate (closed)
  boxMM(-2.75, 0.08, CZ - 1.0, -2.69, 1.1, CZ + 1.0, M.steelGrey);
  boxMM(-2.76, 0.6, CZ - 0.98, -2.68, 1.05, CZ + 0.98, M.stripes);
  boxMM(-2.74, 0.12, CZ - 0.98, -2.7, 0.58, CZ + 0.98, M.mesh);
  box(0.12, 1.25, 0.12, M.steelGrey, -2.72, 0.625, CZ - 1.08); box(0.12, 1.25, 0.12, M.steelGrey, -2.72, 0.625, CZ + 1.08);
  cyl(0.04, 0.03, M.ledRed, -2.65, 1.2, CZ - 1.08, 0, 0, Math.PI / 2, 8);
  // waiting markings on the floor
  for (const [a, b, c, d] of [[-2.15, CZ - 0.9, -1.4, CZ - 0.85], [-2.15, CZ + 0.85, -1.4, CZ + 0.9], [-1.45, CZ - 0.85, -1.4, CZ + 0.85]]) boxMM(a, 0.0, b, c, 0.008, d, M.paintLine);
  // railing between platform and equipment bay
  railing([V(-2.72, 0, -13.2), V(-0.95, 0, -13.2)]);
  // equipment bay railing in hall (x=-0.9)
  railing([V(-0.95, 0, -0.5), V(-0.95, 0, -13.0)], M.steelYellow, true);
  boxMM(-1.05, 0.0, -13.0, -0.85, 0.15, -0.5, M.steelYellow); // kick plate
  boxMM(-0.75, 0.0, -12.9, -0.62, 0.008, -0.6, M.paintLine); // walkway line
  // north railing of platform (west of lookout)
  railing([V(-2.72, 0, -24.95), V(0.2, 0, -24.95)]);

  // benches along east glass
  for (const z of [-15.5, -21.5]) {
    boxMM(5.0, 0.42, z - 1.0, 5.55, 0.48, z + 1.0, M.timber);
    boxMM(5.5, 0.48, z - 1.0, 5.6, 0.95, z + 1.0, M.timber);
    for (const dz of [-0.85, 0.85]) boxMM(5.1, 0, z + dz - 0.04, 5.5, 0.42, z + dz + 0.04, M.steelGrey);
    block(5.0, z - 1.0, 6.0, z + 1.0);
  }
  // departure board hanging
  const depMat = signMat(512, 192, (x, w, h) => {
    x.fillStyle = '#0d1114'; x.fillRect(0, 0, w, h);
    x.fillStyle = '#ffb347'; x.font = 'bold 34px Consolas, monospace'; x.textAlign = 'left';
    x.fillText('NÄCHSTE FAHRT  NEXT', 22, 48);
    x.fillStyle = '#f2f2f2'; x.font = '30px Consolas, monospace';
    x.fillText('KABINE 2  → TAL / VALLEY', 22, 100);
    x.fillStyle = '#ff6a4a'; x.fillText('BETRIEB UNTERBROCHEN', 22, 150);
  }, true);
  box(2.2, 0.85, 0.12, M.dark, 1.6, 3.3, -16.0);
  add(new THREE.PlaneGeometry(2.05, 0.75), depMat, 1.6, 3.3, -16.07, 0, Math.PI, 0);
  add(new THREE.PlaneGeometry(2.05, 0.75), depMat, 1.6, 3.3, -15.93, 0, 0, 0);
  for (const dx of [-0.9, 0.9]) rod(V(1.6 + dx, 3.7, -16.0), V(1.6 + dx, H_ROOF - 0.62, -16.0), 0.012, M.galv, 4);
  // platform sign
  const platMat = signMat(512, 128, (x, w, h) => signText(x, w, h, '#1f3b57', '#ffffff', ['Bahnsteig 1 · Platform 1'], [44]));
  box(2.4, 0.6, 0.06, M.steelGrey, 3.5, 4.2, -24.85);
  add(new THREE.PlaneGeometry(2.3, 0.55), platMat, 3.5, 4.2, -24.81);
  // lookout sign on east wall
  const lookMat = signMat(512, 160, (x, w, h) => signText(x, w, h, '#24412b', '#ffffff', ['Aussicht · Lookout  ↑', 'Achtung nass · Caution wet'], [44, 30]));
  add(new THREE.PlaneGeometry(1.6, 0.5), lookMat, 5.98, 2.3, -22.8, 0, -Math.PI / 2, 0);
  // clock on column
  const clockMat = signMat(256, 256, (x, w, h) => {
    x.fillStyle = '#1b1d1f'; x.fillRect(0, 0, w, h);
    x.fillStyle = '#f4f4f0'; x.beginPath(); x.arc(128, 128, 118, 0, 6.28); x.fill();
    x.strokeStyle = '#111'; for (let i = 0; i < 60; i++) { const a = i / 60 * 6.28; x.lineWidth = i % 5 ? 2 : 7; const r0 = i % 5 ? 104 : 88; x.beginPath(); x.moveTo(128 + Math.cos(a) * r0, 128 + Math.sin(a) * r0); x.lineTo(128 + Math.cos(a) * 112, 128 + Math.sin(a) * 112); x.stroke(); }
    x.lineWidth = 9; x.beginPath(); x.moveTo(128, 128); x.lineTo(128 + 50 * Math.cos(-2.2), 128 + 50 * Math.sin(-2.2)); x.stroke();
    x.lineWidth = 6; x.beginPath(); x.moveTo(128, 128); x.lineTo(128 + 92 * Math.cos(0.9), 128 + 92 * Math.sin(0.9)); x.stroke();
    x.strokeStyle = '#c4161c'; x.lineWidth = 3; x.beginPath(); x.moveTo(128, 128); x.lineTo(128 + 98 * Math.cos(2.6), 128 + 98 * Math.sin(2.6)); x.stroke();
  });
  cyl(0.4, 0.1, M.dark, 1.6, 4.5, -13.25, Math.PI / 2, 0, 0, 32);
  add(new THREE.CircleGeometry(0.36, 32), clockMat, 1.6, 4.5, -13.31, 0, Math.PI, 0);

  // fire extinguisher + emergency stop on east wall
  cyl(0.09, 0.5, M.cabinRed, 5.85, 0.55, -13.9, 0, 0, 0, 14);
  box(0.12, 0.2, 0.2, M.steelYellow, 5.94, 1.4, -14.6); cyl(0.05, 0.05, M.ledRed, 5.86, 1.4, -14.6, 0, 0, Math.PI / 2, 12);

  // platform lamps (pendant industrial)
  for (const z of [-16.4, -22.6]) {
    rod(V(1.2, 6.3, z), V(1.2, H_ROOF - 0.6, z), 0.01, M.dark, 4);
    add(cylGeo(0.12, 0.42, 0.32, 20, true, M.dark), M.dark, 1.2, 6.15, z);
    add(new THREE.CircleGeometry(0.4, 20), M.lampWarm, 1.2, 6.0, z, Math.PI / 2, 0, 0);
  }

  // control room (booth) in hall NE corner
  const bx0 = 3.7, bz0 = -12.85, bx1 = 6.0, bz1 = -8.8;
  boxMM(bx0, 0, bz1 - 0.1, bx1, 1.05, bz1, M.timber);
  boxMM(bx0, 0, bz0, bx0 + 0.1, 1.05, bz1, M.timber);
  boxMM(bx0 - 0.05, 2.65, bz0, bx1, 2.8, bz1 + 0.05, M.steelGrey);
  boxMM(bx0, 2.8, bz0, bx1, 2.85, bz1, M.timber);
  boxMM(bx0, 1.02, bz1 - 0.12, bx1, 1.08, bz1 + 0.02, M.steelGrey);
  boxMM(bx0 - 0.02, 1.02, bz0, bx0 + 0.12, 1.08, bz1, M.steelGrey);
  add(new THREE.PlaneGeometry(bx1 - bx0, 1.57), M.glassClean, (bx0 + bx1) / 2, 1.865, bz1 - 0.05);
  add(new THREE.PlaneGeometry(bz1 - bz0, 1.57), M.glassClean, bx0 + 0.05, 1.865, (bz0 + bz1) / 2, 0, Math.PI / 2, 0);
  for (const z of [bz0 + 1.3, bz0 + 2.6]) box(0.06, 1.6, 0.06, M.steelGrey, bx0 + 0.05, 1.85, z);
  box(0.06, 1.6, 0.06, M.steelGrey, bx0 + 1.15, 1.85, bz1 - 0.05);
  // desk + screens + chair inside
  boxMM(bx0 + 0.15, 0.75, bz0 + 0.2, bx0 + 0.85, 0.8, bz1 - 0.3, M.timber);
  boxMM(bx0 + 0.2, 0, bz0 + 0.25, bx0 + 0.8, 0.75, bz0 + 0.8, M.steelGrey);
  for (let i = 0; i < 3; i++) {
    const z = bz0 + 0.9 + i * 0.75;
    box(0.05, 0.42, 0.62, M.dark, bx0 + 0.55, 1.08, z, 0, 0, 0.12);
    box(0.01, 0.36, 0.56, M.screen, bx0 + 0.52, 1.08, z, 0, 0, 0.12);
  }
  box(0.45, 0.08, 0.45, M.dark, bx0 + 1.3, 0.5, bz0 + 1.6); cyl(0.04, 0.45, M.chrome, bx0 + 1.3, 0.25, bz0 + 1.6);
  box(0.45, 0.5, 0.06, M.dark, bx0 + 1.52, 0.8, bz0 + 1.6, 0, Math.PI / 2, 0);
  block(bx0 - 0.05, bz0, bx1, bz1 + 0.05);
  const ctrlMat = signMat(512, 96, (x, w, h) => signText(x, w, h, '#2b2f33', '#f0f0f0', ['STEUERSTAND · CONTROL'], [40]));
  add(new THREE.PlaneGeometry(1.8, 0.33), ctrlMat, (bx0 + bx1) / 2, 3.05, bz1 + 0.06);

  // hall: station sign over platform door (backlit)
  const nameMat = signMat(1024, 160, (x, w, h) => signText(x, w, h, '#14202b', '#f5f1e6', ['GRAUHORN  ·  BERGSTATION  2481 m'], [58]), true);
  box(5.2, 0.85, 0.12, M.dark, 2.0, 4.1, -12.78);
  add(new THREE.PlaneGeometry(5.0, 0.75), nameMat, 2.0, 4.1, -12.71);
  const platArrow = signMat(512, 128, (x, w, h) => signText(x, w, h, '#1f3b57', '#ffffff', ['↑  Bahnsteig · Platform'], [44]));
  add(new THREE.PlaneGeometry(1.8, 0.45), platArrow, 2.0, 3.45, -12.71);
  const dangerMat = signMat(512, 256, (x, w, h) => {
    x.fillStyle = '#f2c230'; x.fillRect(0, 0, w, h); x.fillStyle = '#111'; x.fillRect(10, 10, w - 20, h - 20); x.fillStyle = '#f2c230'; x.fillRect(18, 18, w - 36, h - 36);
    x.fillStyle = '#111'; x.textAlign = 'center'; x.font = 'bold 52px Arial'; x.fillText('⚠ ACHTUNG', w / 2, 90);
    x.font = 'bold 34px Arial'; x.fillText('Bewegte Maschinenteile', w / 2, 150); x.fillText('Moving machinery', w / 2, 200);
  });
  for (const z of [-4.0, -9.5]) add(new THREE.PlaneGeometry(0.7, 0.35), dangerMat, -0.92, 0.82, z, 0, Math.PI / 2, 0);

  // turnstile line at z=-3.6
  for (const x of [-0.2, 1.75, 3.7]) {
    boxMM(x - 0.14, 0, -4.1, x + 0.14, 1.0, -3.1, M.galv);
    box(0.29, 0.03, 1.02, M.dark, x, 1.01, -3.6);
    cyl(0.04, 0.012, M.ledGreen, x, 1.03, -3.3, 0, 0, 0, 8);
    block(x - 0.14, -4.1, x + 0.14, -3.1);
  }
  for (const x of [0.45, 2.4]) { box(0.02, 0.6, 0.35, M.glassClean, x - 0.25, 0.75, -3.6); box(0.02, 0.6, 0.35, M.glassClean, x + 1.05, 0.75, -3.6); }
  railing([V(3.85, 0, -3.6), V(5.98, 0, -3.6)], M.galv, false, 1.0);
  block(3.85, -3.65, 6.0, -3.55);

  // hall pendant lamps
  for (const z of [-2.6, -7.4]) {
    rod(V(2.2, 3.4, z), V(2.2, H_ROOF - 0.6, z), 0.008, M.dark, 4);
    add(cylGeo(0.08, 0.36, 0.3, 20, true, M.steelBlue), M.steelBlue, 2.2, 3.28, z);
    add(new THREE.CircleGeometry(0.34, 20), M.lampWarm, 2.2, 3.14, z, Math.PI / 2, 0, 0);
  }
  // high-bay lamps over machinery
  for (const z of [-4.6, -9.6]) {
    add(cylGeo(0.2, 0.5, 0.35, 20, true, M.dark), M.dark, -3.0, 7.7, z);
    add(new THREE.CircleGeometry(0.48, 20), M.lampCool, -3.0, 7.53, z, Math.PI / 2, 0, 0);
    rod(V(-3.0, 7.85, z), V(-3.0, H_ROOF - 0.6, z), 0.01, M.dark, 4);
  }
  // hall benches + info board
  boxMM(5.15, 0.42, -2.6, 5.7, 0.48, -0.9, M.timber);
  for (const z of [-2.4, -1.1]) boxMM(5.2, 0, z - 0.04, 5.6, 0.42, z + 0.04, M.steelGrey);
  block(5.1, -2.6, 6, -0.9);
  const infoMat = signMat(512, 512, (x, w, h) => {
    x.fillStyle = '#ece8de'; x.fillRect(0, 0, w, h);
    x.fillStyle = '#1f3b57'; x.fillRect(0, 0, w, 90);
    x.fillStyle = '#fff'; x.font = 'bold 44px Arial'; x.textAlign = 'center'; x.fillText('GRAUHORNBAHN', w / 2, 60);
    x.fillStyle = '#222'; x.font = '28px Arial'; x.textAlign = 'left';
    ['Pendelbahn · Aerial tramway', 'Bergstation 2481 m', 'Talstation 1204 m', 'Länge 3.4 km · 1 Stütze', 'Fahrzeit 7 min', '', 'Betrieb bei Sturm', 'eingestellt.'].forEach((l, i) => x.fillText(l, 30, 140 + i * 42));
    x.strokeStyle = '#c4161c'; x.lineWidth = 5; x.beginPath(); x.moveTo(40, 480); x.lineTo(470, 400); x.stroke();
  });
  add(new THREE.PlaneGeometry(1.2, 1.2), infoMat, 5.98, 1.9, -0.95 - 0.05, 0, -Math.PI / 2, 0);
}

// =====================================================================
//  Lookout
// =====================================================================
function buildLookout() {
  const x0 = 0.2, x1 = 5.8, z0 = -31.0, z1 = -25.2;
  // deck structure
  boxMM(x0, -0.35, z0, x1, -0.05, z1, M.steelWetDark);
  boxMM(x0, -0.05, z0, x1, 0.0, z1, M.timberWet);
  for (const x of [x0 + 0.3, x1 - 0.3]) {
    ibeam(V(x, -0.3, z0 + 0.2), V(x, -5.5, z1 - 1.0), 0.25, 0.2, M.steelWetDark);
    ibeam(V(x, -0.35, z0 + 0.1), V(x, -0.35, z1), 0.3, 0.2, M.steelWetDark);
  }
  boxMM(x0 - 0.04, -0.2, z0 - 0.04, x1 + 0.04, 0.08, z0, M.timberWet); // edge board
  // roof (mono-pitch timber)
  const posts = [[x0 + 0.15, z0 + 0.15], [x1 - 0.15, z0 + 0.15], [x0 + 0.15, z1 + 0.15], [x1 - 0.15, z1 + 0.15]];
  for (const [x, z] of posts) {
    boxMM(x - 0.1, 0, z - 0.1, x + 0.1, 3.5, z + 0.1, M.timberBeam);
    box(0.28, 0.04, 0.28, M.galv, x, 0.02, z);
    block(x - 0.1, z - 0.1, x + 0.1, z + 0.1);
  }
  for (const x of [x0 + 0.15, x1 - 0.15]) boxMM(x - 0.1, 3.3, z0 - 0.6, x + 0.1, 3.62, z1 + 0.15, M.timberBeam);
  for (let x = x0 - 0.3; x <= x1 + 0.35; x += 0.9) boxMM(x - 0.04, 3.62, z0 - 0.6, x + 0.04, 3.74, z1 + 0.1, M.timberBeam);
  add(boxGeo(x1 - x0 + 0.9, 0.04, z1 - z0 + 0.8, 3), M.timber, (x0 + x1) / 2, 3.78, (z0 + z1) / 2 - 0.25, -0.05, 0, 0);
  add(boxGeo(x1 - x0 + 1.0, 0.1, z1 - z0 + 0.85, 3), M.roofMetal, (x0 + x1) / 2, 3.86, (z0 + z1) / 2 - 0.25, -0.05, 0, 0);
  boxMM(x0 - 0.5, 3.5, z0 - 0.75, x1 + 0.5, 3.75, z0 - 0.62, M.timberWet); // front fascia
  boxMM(x0 - 0.52, 3.42, z0 - 0.8, x1 + 0.52, 3.48, z0 - 0.7, M.galv);      // gutter
  rod(V(x1 + 0.45, 3.42, z0 - 0.75), V(x1 + 0.45, 0.1, z0 - 0.75), 0.04, M.galv, 8); // downpipe
  // railings: steel posts + cable infill + timber handrail
  const rail = (a, b) => {
    const L = a.distanceTo(b), n = Math.max(1, Math.round(L / 1.4));
    for (let k = 0; k <= n; k++) { const p = a.clone().lerp(b, k / n); box(0.07, 1.05, 0.07, M.steelWetDark, p.x, 0.525, p.z); }
    for (let i = 0; i < 7; i++) rod(a.clone().setY(0.14 + i * 0.13), b.clone().setY(0.14 + i * 0.13), 0.006, M.chrome, 4);
    bar(a.clone().setY(1.1), b.clone().setY(1.1), 0.14, 0.06, M.timberWet);
  };
  rail(V(x0 + 0.05, 0, z1 - 0.1), V(x0 + 0.05, 0, z0 + 0.05));
  rail(V(x0 + 0.05, 0, z0 + 0.05), V(x1 - 0.05, 0, z0 + 0.05));
  rail(V(x1 - 0.05, 0, z0 + 0.05), V(x1 - 0.05, 0, z1 - 0.1));
  // binocular viewer
  const bvx = 2.0, bvz = z0 + 0.55;
  cyl(0.12, 1.0, M.steelBlue, bvx, 0.5, bvz, 0, 0, 0, 14);
  cyl(0.2, 0.05, M.steelBlue, bvx, 0.03, bvz, 0, 0, 0, 16);
  box(0.42, 0.28, 0.32, M.steelBlue, bvx, 1.18, bvz, 0.15, 0, 0);
  for (const dx of [-0.11, 0.11]) cyl(0.07, 0.36, M.dark, bvx + dx, 1.22, bvz - 0.2, Math.PI / 2 + 0.15, 0, 0, 12);
  box(0.5, 0.06, 0.24, M.dark, bvx, 1.3, bvz + 0.22, 0.15, 0, 0);
  block(bvx - 0.25, bvz - 0.3, bvx + 0.25, bvz + 0.3);
  // orientation table
  const panoMat = signMat(512, 256, (x, w, h) => {
    x.fillStyle = '#d9d3c2'; x.fillRect(0, 0, w, h);
    x.fillStyle = '#5c6b78'; x.beginPath(); x.moveTo(0, 200);
    for (let i = 0; i <= 512; i += 16) x.lineTo(i, 150 - Math.abs(Math.sin(i * 0.021) * 70) - Math.sin(i * 0.07) * 15);
    x.lineTo(512, 256); x.lineTo(0, 256); x.fill();
    x.fillStyle = '#222'; x.font = 'bold 13px Arial'; x.textAlign = 'center';
    [['Schwarzhorn 3104', 80], ['Wildgrat 2970', 210], ['Talstation 1204', 330], ['Firnstock 3352', 440]].forEach(([t, px]) => { x.fillText(t, px, 40); x.fillRect(px - 1, 48, 2, 40); });
    x.font = '14px Arial'; x.fillText('Grauhorn 2481 m · Panorama Nord', w / 2, 245);
  });
  const ox = 4.1, oz = z0 + 0.5;
  box(0.25, 0.9, 0.25, M.wallExt, ox, 0.45, oz);
  box(0.9, 0.05, 0.5, M.steelWetDark, ox, 0.98, oz, 0.45, 0, 0);
  add(new THREE.PlaneGeometry(0.84, 0.44), panoMat, ox, 1.012, oz + 0.008, -Math.PI / 2 + 0.45, 0, 0);
  block(ox - 0.45, oz - 0.3, ox + 0.45, oz + 0.3);
  // lookout lamp
  add(cylGeo(0.1, 0.25, 0.2, 16, true, M.dark), M.dark, 3.0, 3.45, -28.2);
  add(new THREE.CircleGeometry(0.24, 16), M.lampWarm, 3.0, 3.35, -28.2, Math.PI / 2, 0, 0);
  // bench against east side
  boxMM(5.1, 0.42, -29.6, 5.6, 0.48, -27.0, M.timberWet);
  for (const z of [-29.3, -27.3]) boxMM(5.2, 0, z - 0.05, 5.5, 0.42, z + 0.05, M.steelWetDark);
  block(5.1, -29.6, 5.8, -27.0);
}

// =====================================================================
//  Terrain, rocks, backdrop
// =====================================================================
function terrainH(x, z) {
  const dx = Math.max(-10 - x, 0, x - 8);
  const dzN = Math.max(0, -33 - z);
  const dzS = Math.max(0, z - 5);
  const n = fbm(x * 0.02 + 50, z * 0.02 + 50, 77, 4096, 5);
  const n2 = fbm(x * 0.08 + 9, z * 0.08 + 9, 78, 4096, 3);
  const out = Math.hypot(dx, dzN, dzS);
  let h = -4.5 - dzN * 0.6 - dx * 0.5 + dzS * 0.75;
  h += (n - 0.5) * 14 * smooth(0, 25, out) + (n2 - 0.5) * 2.5;
  // keep ridge rising to the south-west summit
  h += Math.max(0, z - 20) * 0.25 + Math.max(0, -x - 30) * 0.1 * smooth(0, 30, z);
  if (out < 1.5) h = Math.min(h, -2.0);
  return h;
}
function buildTerrain() {
  const S = 700, N = 180;
  const g = new THREE.PlaneGeometry(S, S, N, N); g.rotateX(-Math.PI / 2);
  const pos = g.attributes.position;
  for (let i = 0; i < pos.count; i++) pos.setY(i, terrainH(pos.getX(i), pos.getZ(i) - 60));
  g.translate(0, 0, -60);
  g.computeVertexNormals();
  const uv = g.attributes.uv; for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * S / 9, uv.getY(i) * S / 9);
  // vertex colors: grass-ish low, rock high/steep
  const col = new Float32Array(pos.count * 3);
  const nrm = g.attributes.normal;
  for (let i = 0; i < pos.count; i++) {
    const steep = 1 - nrm.getY(i);
    const y = pos.getY(i);
    const grass = smooth(-20, -60, y) * (1 - smooth(0.25, 0.5, steep));
    const snow = smooth(25, 60, y) * (1 - smooth(0.3, 0.5, steep));
    let r = 0.62, gg = 0.6, b = 0.58;
    r = r * (1 - grass) + 0.36 * grass; gg = gg * (1 - grass) + 0.42 * grass; b = b * (1 - grass) + 0.3 * grass;
    r = r * (1 - snow) + 1.25 * snow; gg = gg * (1 - snow) + 1.28 * snow; b = b * (1 - snow) + 1.3 * snow;
    col[i * 3] = r; col[i * 3 + 1] = gg; col[i * 3 + 2] = b;
  }
  g.setAttribute('color', new THREE.BufferAttribute(col, 3));
  const mat = new THREE.MeshStandardMaterial({ map: T.wallExt.map, roughnessMap: T.wallExt.rough, vertexColors: true, color: 0x8a8782, roughness: 1, envMapIntensity: 0.8 });
  const mesh = new THREE.Mesh(g, mat); mesh.receiveShadow = true; scene.add(mesh);

  // rocks (instanced)
  const rg = new THREE.IcosahedronGeometry(1, 1);
  const rp = rg.attributes.position;
  for (let i = 0; i < rp.count; i++) { const v = V(rp.getX(i), rp.getY(i), rp.getZ(i)); const k = 0.75 + 0.5 * hash(Math.round(v.x * 10), Math.round(v.y * 10 + v.z * 7), 3); rp.setXYZ(i, v.x * k, v.y * k * 0.7, v.z * k); }
  rg.computeVertexNormals();
  const rocks = new THREE.InstancedMesh(rg, M.rock, 160);
  rngSeed = 4242; let n = 0; const dm = new THREE.Object3D();
  while (n < 160) {
    const a = rnd() * Math.PI * 2, d = 14 + Math.pow(rnd(), 1.5) * 140;
    const x = Math.cos(a) * d - 1, z = Math.sin(a) * d - 12;
    if (x > -12 && x < 10 && z > -36 && z < 7) continue;
    const s = 0.6 + Math.pow(rnd(), 2) * 4;
    dm.position.set(x, terrainH(x, z) + s * 0.15, z); dm.rotation.set(rnd(), rnd() * 6, rnd() * 0.5); dm.scale.set(s, s * (0.6 + rnd() * 0.6), s * (0.8 + rnd() * 0.5));
    dm.updateMatrix(); rocks.setMatrixAt(n++, dm.matrix);
  }
  rocks.castShadow = rocks.receiveShadow = true; scene.add(rocks);
  // close boulders hugging the foundations
  for (const [x, z, s] of [[-10.5, -4, 2.2], [-11, -16, 3], [8.6, -6, 2.0], [9.5, -20, 2.6], [-6, -29, 2.4], [7.8, -30, 1.8], [-1, 6.5, 1.6], [6.5, 4.5, 1.8]]) {
    dm.position.set(x, terrainH(x, z) + 0.2, z); dm.rotation.set(0.3, x, 0.2); dm.scale.set(s, s * 0.8, s * 1.1); dm.updateMatrix();
    addM(rg, M.rock, dm.matrix);
  }

  // conifers in the lower valley (instanced)
  const tg = mergeGeometries([
    new THREE.CylinderGeometry(0.15, 0.22, 2, 5).translate(0, 1, 0).toNonIndexed(),
    new THREE.ConeGeometry(1.6, 3.2, 7).translate(0, 3.0, 0).toNonIndexed(),
    new THREE.ConeGeometry(1.25, 2.8, 7).translate(0, 4.6, 0).toNonIndexed(),
    new THREE.ConeGeometry(0.85, 2.4, 7).translate(0, 6.0, 0).toNonIndexed(),
  ]);
  const trees = new THREE.InstancedMesh(tg, new THREE.MeshStandardMaterial({ color: 0x2c3b30, roughness: 0.9 }), 260);
  rngSeed = 777; n = 0; let guard = 0;
  while (n < 260 && guard++ < 5000) {
    const x = (rnd() - 0.5) * 500, z = -60 - rnd() * 260;
    const y = terrainH(x, z);
    if (y > -45) continue;
    const s = 1.0 + rnd() * 1.4;
    dm.position.set(x, y - 0.3, z); dm.rotation.set(0, rnd() * 6, 0); dm.scale.set(s, s * (0.9 + rnd() * 0.4), s); dm.updateMatrix();
    trees.setMatrixAt(n++, dm.matrix);
  }
  trees.count = n; scene.add(trees);
}

function buildCloudLayers() {
  const S = 512, c = canvas(S, S), x = c.getContext('2d');
  const img = x.createImageData(S, S);
  for (let yy = 0; yy < S; yy++) for (let xx = 0; xx < S; xx++) {
    const n = fbm(xx / S * 4, yy / S * 4, 61, 4, 5);
    const a = smooth(0.42, 0.75, n);
    const i = (yy * S + xx) * 4; img.data[i] = 205; img.data[i + 1] = 212; img.data[i + 2] = 218; img.data[i + 3] = a * 200;
  }
  x.putImageData(img, 0, 0);
  const tex = toTex(c);
  const mats = [];
  [[-18, 0.0, 1.0], [-34, 0.4, 0.8], [-55, 0.7, 0.9]].forEach(([y, off, a], k) => {
    const t = tex.clone(); t.needsUpdate = true; t.repeat.set(3, 3); t.offset.set(off, off * 0.5);
    const m = new THREE.MeshBasicMaterial({ map: t, transparent: true, opacity: a, depthWrite: false, fog: true, color: 0xdfe5ea });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(900, 900), m);
    mesh.rotation.x = -Math.PI / 2; mesh.position.set(0, y, -200); mesh.renderOrder = 1;
    scene.add(mesh); mats.push(t);
  });
  return mats;
}

function buildBackdrop() {
  const W = 4096, H = 1024, c = canvas(W, H), x = c.getContext('2d');
  const mPerPx = 1000 / H, hor = H * 0.5; // cylinder height 1000 m, horizon at centre
  const sky = x.createLinearGradient(0, 0, 0, hor);
  sky.addColorStop(0, '#707d8a'); sky.addColorStop(0.55, '#8c98a3'); sky.addColorStop(1, '#a9b3ba');
  x.fillStyle = sky; x.fillRect(0, 0, W, hor + 2);
  const low = x.createLinearGradient(0, hor, 0, H);
  low.addColorStop(0, '#9aa5ae'); low.addColorStop(1, '#8a959e');
  x.fillStyle = low; x.fillRect(0, hor, W, H - hor);
  // cloud bands
  rngSeed = 31;
  for (let i = 0; i < 90; i++) {
    const cx = rnd() * W, cy = hor * (0.1 + rnd() * 0.7), rw = 200 + rnd() * 600, rh = 20 + rnd() * 60;
    const gr = x.createRadialGradient(cx, cy, 0, cx, cy, rw);
    const shade = rnd() < 0.5 ? '96,106,118' : '170,178,186';
    gr.addColorStop(0, `rgba(${shade},0.18)`); gr.addColorStop(1, `rgba(${shade},0)`);
    x.save(); x.translate(cx, cy); x.scale(1, rh / rw); x.translate(-cx, -cy); x.fillStyle = gr; x.fillRect(cx - rw, cy - rw, rw * 2, rw * 2); x.restore();
  }
  const layers = [
    { seed: 11, base: 30, amp: 150, freq: 7, col: '#6f7a85', snow: 1.0, haze: 0.38, rough: 1.0 },
    { seed: 12, base: 5, amp: 105, freq: 11, col: '#56616b', snow: 0.6, haze: 0.28, rough: 0.9 },
    { seed: 13, base: -25, amp: 70, freq: 16, col: '#434d56', snow: 0.0, haze: 0.18, rough: 0.8 },
    { seed: 14, base: -70, amp: 50, freq: 23, col: '#36403b', snow: 0.0, haze: 0.12, rough: 0.6 },
  ];
  for (const L of layers) {
    const lc = canvas(W, H), lx = lc.getContext('2d');
    const ridge = new Float32Array(W + 1);
    for (let i = 0; i <= W; i++) {
      const u = i / W;
      let n = fbm(u * L.freq, 0.5, L.seed, L.freq, 6);
      n = 1 - Math.abs(n * 2 - 1);
      const m = fbm(u * 3, 0.3, L.seed + 5, 3, 2);
      ridge[i] = hor - (L.base + L.amp * Math.pow(n, 1.6) * (0.4 + m)) / mPerPx;
    }
    lx.fillStyle = L.col; lx.beginPath(); lx.moveTo(0, H);
    for (let i = 0; i <= W; i += 2) lx.lineTo(i, ridge[i]); lx.lineTo(W, H); lx.closePath(); lx.fill();
    lx.globalCompositeOperation = 'source-atop';
    // rock gullies
    for (let i = 0; i < W; i += 3) {
      const g = fbm(i / W * L.freq * 6, 1.3, L.seed + 9, L.freq * 6, 3);
      lx.fillStyle = `rgba(20,24,28,${(g - 0.4) * 0.3})`;
      lx.fillRect(i, ridge[i], 3, 160 * (0.4 + g));
    }
    if (L.snow > 0) {
      for (let i = 0; i < W; i += 2) {
        const sn = fbm(i / W * L.freq * 10, 2.1, L.seed + 3, L.freq * 10, 3);
        const sn2 = fbm(i / W * L.freq * 40, 5.3, L.seed + 13, L.freq * 40, 2);
        const snowY = hor - (L.base + L.amp * (0.4 + 0.25 * (1 - L.snow)) + (sn - 0.5) * 90 + (sn2 - 0.5) * 50) / mPerPx;
        if (ridge[i] < snowY) {
          const gr = lx.createLinearGradient(0, ridge[i], 0, snowY + 20);
          gr.addColorStop(0, `rgba(228,232,236,${0.75 + sn * 0.2})`); gr.addColorStop(0.75, `rgba(214,220,226,${0.55 + sn * 0.2})`); gr.addColorStop(1, 'rgba(210,216,222,0)');
          lx.fillStyle = gr; lx.fillRect(i, ridge[i] - 1, 2, snowY - ridge[i] + 21);
          // dark rock ribs through the snow
          if (sn2 > 0.62) { lx.fillStyle = 'rgba(60,68,76,0.35)'; lx.fillRect(i, ridge[i] + 6, 2, (snowY - ridge[i]) * (sn2 - 0.5)); }
        }
      }
    }
    // haze from bottom
    const hz = lx.createLinearGradient(0, hor - 300, 0, hor + 80);
    hz.addColorStop(0, `rgba(160,170,178,${L.haze * 0.6})`); hz.addColorStop(1, `rgba(160,170,178,${Math.min(1, L.haze + 0.55)})`);
    lx.fillStyle = hz; lx.fillRect(0, 0, W, H);
    x.drawImage(lc, 0, 0);
    // mist band between layers
    const mb = x.createLinearGradient(0, hor - 60, 0, hor + 40);
    mb.addColorStop(0, 'rgba(160,170,178,0)'); mb.addColorStop(0.6, 'rgba(160,170,178,0.35)'); mb.addColorStop(1, 'rgba(154,165,174,0.6)');
    x.fillStyle = mb; x.fillRect(0, hor - 60, W, 100);
  }
  // valley fog below horizon
  const vf = x.createLinearGradient(0, hor, 0, H);
  vf.addColorStop(0, 'rgba(154,165,174,0.75)'); vf.addColorStop(0.3, 'rgba(150,161,170,0.95)'); vf.addColorStop(1, 'rgba(140,151,160,1)');
  x.fillStyle = vf; x.fillRect(0, hor + 20, W, H - hor);
  const tex = toTex(c); tex.wrapT = THREE.ClampToEdgeWrapping;
  const geo = new THREE.CylinderGeometry(800, 800, 1000, 96, 1, true);
  const mat = new THREE.MeshBasicMaterial({ map: tex, side: THREE.BackSide, fog: false, depthWrite: false });
  const mesh = new THREE.Mesh(geo, mat); mesh.renderOrder = -10; mesh.frustumCulled = false;
  // sky dome behind the panorama band so there is no visible top/bottom edge
  const dome = new THREE.Mesh(new THREE.SphereGeometry(780, 32, 16), new THREE.MeshBasicMaterial({ color: 0x707d8a, side: THREE.BackSide, fog: false, depthWrite: false }));
  const dc = dome.geometry.attributes.position; const cols = new Float32Array(dc.count * 3);
  const top = new THREE.Color(0x66727f), mid = new THREE.Color(0x707d8a), bot = new THREE.Color(0x8a959e);
  for (let i = 0; i < dc.count; i++) { const h = dc.getY(i) / 780; const c = h > 0 ? mid.clone().lerp(top, Math.min(1, (h - 0.5) * 2)) : bot; if (h > 0 && h < 0.5) c.copy(mid); cols.set([c.r, c.g, c.b], i * 3); }
  dome.geometry.setAttribute('color', new THREE.BufferAttribute(cols, 3)); dome.material.vertexColors = true; dome.material.color.set(0xffffff);
  dome.renderOrder = -11; dome.frustumCulled = false; mesh.add(dome);
  scene.add(mesh);
  return mesh;
}

// =====================================================================
//  Rain (GPU line streaks, masked under roofs)
// =====================================================================
function buildRain() {
  const N = 7000;
  const pos = new Float32Array(N * 2 * 3), rand = new Float32Array(N * 2 * 3), end = new Float32Array(N * 2);
  rngSeed = 5;
  for (let i = 0; i < N; i++) {
    const r = [rnd(), rnd(), rnd()];
    for (let k = 0; k < 2; k++) { rand.set(r, (i * 2 + k) * 3); end[i * 2 + k] = k; }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  g.setAttribute('aRand', new THREE.BufferAttribute(rand, 3));
  g.setAttribute('aEnd', new THREE.BufferAttribute(end, 1));
  const masks = [
    new THREE.Vector4(-8.9, -26.1, 6.9, 0.85),
    new THREE.Vector4(-1.05, 0.0, 5.05, 4.45),
    new THREE.Vector4(-0.35, -31.85, 6.35, -25.0),
  ];
  const mat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false,
    uniforms: { uTime: { value: 0 }, uCam: { value: new THREE.Vector3() }, uMasks: { value: masks }, uColor: { value: new THREE.Color(0xc8d2da) } },
    vertexShader: `
      attribute vec3 aRand; attribute float aEnd;
      uniform float uTime; uniform vec3 uCam; uniform vec4 uMasks[3];
      varying float vA;
      void main(){
        vec3 box = vec3(36.0, 22.0, 36.0);
        float spd = 8.5 + aRand.x * 3.0;
        vec3 p = aRand * box;
        p.y -= uTime * spd;
        p.x += uTime * 1.2;
        vec3 org = uCam - box * 0.5;
        p = org + mod(p - org, box);
        float len = 0.38 + aRand.z * 0.25;
        p += vec3(0.05, 1.0, 0.0) * len * aEnd;
        float a = 1.0;
        for (int i = 0; i < 3; i++) { vec4 m = uMasks[i]; if (p.x > m.x && p.x < m.z && p.z > m.y && p.z < m.w && p.y > -2.0) a = 0.0; }
        float d = length(p - uCam);
        a *= smoothstep(0.6, 2.5, d) * (1.0 - smoothstep(10.0, 18.0, d));
        vA = a * mix(0.22, 0.55, aEnd);
        gl_Position = projectionMatrix * viewMatrix * vec4(p, 1.0);
      }`,
    fragmentShader: `
      uniform vec3 uColor; varying float vA;
      void main(){ if (vA < 0.003) discard; gl_FragColor = vec4(uColor, vA); }`,
  });
  const lines = new THREE.LineSegments(g, mat); lines.frustumCulled = false; lines.renderOrder = 5;
  scene.add(lines);
  return mat;
}

// drips running off the eaves (sheltered -> wet transition)
function buildDrips() {
  // eave lines: [x0,z0,x1,z1, yTop, yBottom]
  const eaves = [
    [-0.45, -31.82, 6.45, -31.82, 3.45, -0.05],   // lookout front gutter edge
    [-0.5, -31.7, -0.5, -25.4, 3.75, -0.05],      // lookout west edge
    [6.5, -31.7, 6.5, -25.4, 3.75, -0.05],        // lookout east edge
    [-8.8, -26.0, -0.6, -26.0, H_ROOF, -1.6],     // platform roof north edge
    [-8.85, -26.0, -8.85, 0.7, H_ROOF, -1.5],     // west roof edge
    [-1.0, 4.4, 5.0, 4.4, 3.4, 0.0],              // entrance canopy
  ];
  const per = [70, 40, 40, 90, 130, 60];
  const N = per.reduce((a, b) => a + b, 0);
  const base = new Float32Array(N * 2 * 4), rr = new Float32Array(N * 2 * 2), end = new Float32Array(N * 2);
  rngSeed = 88; let n = 0;
  eaves.forEach((e, ei) => {
    for (let i = 0; i < per[ei]; i++) {
      const f = rnd();
      const x = e[0] + (e[2] - e[0]) * f, z = e[1] + (e[3] - e[1]) * f;
      const r1 = rnd(), r2 = rnd();
      for (let k = 0; k < 2; k++) {
        base.set([x, e[4], z, e[4] - e[5]], (n * 2 + k) * 4); rr.set([r1, r2], (n * 2 + k) * 2); end[n * 2 + k] = k;
      }
      n++;
    }
  });
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(N * 2 * 3), 3));
  g.setAttribute('aBase', new THREE.BufferAttribute(base, 4));
  g.setAttribute('aR', new THREE.BufferAttribute(rr, 2));
  g.setAttribute('aEnd', new THREE.BufferAttribute(end, 1));
  const mat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, fog: false,
    uniforms: { uTime: { value: 0 }, uCam: { value: new THREE.Vector3() } },
    vertexShader: `
      attribute vec4 aBase; attribute vec2 aR; attribute float aEnd;
      uniform float uTime; uniform vec3 uCam; varying float vA;
      void main(){
        float H = aBase.w;
        float fall = mod(uTime * (5.5 + aR.y * 2.5) + aR.x * H, H);
        vec3 p = vec3(aBase.x, aBase.y - fall, aBase.z);
        p.y += aEnd * (0.18 + aR.y * 0.2);
        float d = length(p - uCam);
        vA = (1.0 - smoothstep(14.0, 26.0, d)) * smoothstep(0.4, 1.5, d) * mix(0.25, 0.6, aEnd);
        gl_Position = projectionMatrix * viewMatrix * vec4(p, 1.0);
      }`,
    fragmentShader: `varying float vA; void main(){ if (vA < 0.003) discard; gl_FragColor = vec4(0.83, 0.87, 0.9, vA); }`,
  });
  const lines = new THREE.LineSegments(g, mat); lines.frustumCulled = false; lines.renderOrder = 5;
  scene.add(lines);
  return mat;
}

// =====================================================================
//  Lighting + environment
// =====================================================================
function buildLights() {
  // IBL from a soft overcast sky
  const pm = new THREE.PMREMGenerator(renderer);
  const envScene = new THREE.Scene();
  const skyGeo = new THREE.SphereGeometry(10, 32, 16);
  const skyMat = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    uniforms: {},
    vertexShader: 'varying vec3 vP; void main(){ vP = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
    fragmentShader: `varying vec3 vP; void main(){ float h = normalize(vP).y;
      vec3 top = vec3(0.50,0.55,0.62); vec3 hor = vec3(0.78,0.82,0.86); vec3 gnd = vec3(0.16,0.17,0.18);
      vec3 c = h > 0.0 ? mix(hor, top, pow(h, 0.6)) : mix(hor*0.6, gnd, pow(-h, 0.4));
      gl_FragColor = vec4(c, 1.0); }`,
  });
  envScene.add(new THREE.Mesh(skyGeo, skyMat));
  // a couple of soft bright panels (fake window reflections)
  const panel = new THREE.Mesh(new THREE.PlaneGeometry(6, 2), new THREE.MeshBasicMaterial({ color: 0xffffff }));
  panel.position.set(0, 2, -8); envScene.add(panel);
  const panel2 = panel.clone(); panel2.position.set(8, 1.5, 0); panel2.lookAt(0, 0, 0); envScene.add(panel2);
  const envRT = pm.fromScene(envScene, 0.035);
  scene.environment = envRT.texture;
  scene.environmentIntensity = 0.55;

  const hemi = new THREE.HemisphereLight(0xb9c6d3, 0x3a3631, 0.55); scene.add(hemi);
  const sun = new THREE.DirectionalLight(0xdfe7f0, 1.2);
  sun.position.set(14, 30, 10); sun.target.position.set(-1, 0, -13);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  const sc = sun.shadow.camera; sc.left = -26; sc.right = 26; sc.top = 26; sc.bottom = -26; sc.near = 5; sc.far = 80;
  sun.shadow.bias = -0.0004; sun.shadow.normalBias = 0.03; sun.shadow.radius = 4;
  scene.add(sun, sun.target);

  const warm = 0xffc286;
  const pl = (x, y, z, i, d, c = warm) => { const l = new THREE.PointLight(c, i, d, 2); l.position.set(x, y, z); scene.add(l); return l; };
  pl(2.4, 3.0, -5.0, 16, 13);         // hall pendants (combined)
  pl(-3.0, 7.2, -7.0, 40, 16, 0xffe2c0); // machinery high-bay
  pl(1.0, 5.6, -19.5, 34, 17);        // platform lamps (combined)
  pl(3.0, 3.1, -28.2, 6, 8);          // lookout
}

// =====================================================================
//  Finalise merged meshes
// =====================================================================
function finalize() {
  let calls = 0;
  for (const [mat, geos] of buckets) {
    const g = mergeGeometries(geos, false);
    if (!g) { console.warn('merge failed', mat); continue; }
    g.computeBoundingSphere();
    const mesh = new THREE.Mesh(g, mat);
    const transparent = mat.transparent;
    mesh.castShadow = !noShadow.has(mat) && !transparent;
    mesh.receiveShadow = !transparent;
    if (transparent) mesh.renderOrder = 2;
    scene.add(mesh); calls++;
  }
  buckets.clear();
  return calls;
}

// =====================================================================
//  Build everything
// =====================================================================
buildShell();
buildWheel();
buildCabin();
buildPlatform();
buildLookout();
buildTerrain();
const backdrop = buildBackdrop();
const rainMat = buildRain();
const dripMat = buildDrips();
const cloudTex = buildCloudLayers();
buildLights();
const mergedCalls = finalize();

// walkable regions (player centre)
walkRect(-0.2, 0.0, 4.2, 3.65);     // entrance apron
walkRect(0.8, -0.75, 2.7, 0.35);    // doorway
walkRect(-0.6, -12.7, 5.7, -0.6);   // hall
walkRect(0.3, -13.5, 3.7, -12.4);   // platform door
walkRect(-2.42, -24.65, 5.7, -13.5); // platform
walkRect(0.55, -30.65, 5.45, -24.3); // lookout

// =====================================================================
//  Controls
// =====================================================================
const VIEWS = {
  1: { p: [2.75, -0.9], yaw: 0.5, pitch: 0.1 },           // entrance (just inside the doors)
  2: { p: [-0.35, -2.6], yaw: 1.2, pitch: 0.22 },         // wheel
  3: { p: [-1.6, -15.0], yaw: 0.9, pitch: 0.02 },         // platform by cabin
  4: { p: [3.8, -29.4], yaw: 0.38, pitch: -0.04 },        // lookout
  5: { p: [3.2, -30.2], yaw: Math.PI + 0.25, pitch: 0.08 } // return view
};
const player = { x: 0, z: 0, yaw: 0, pitch: 0, eye: 1.65, bob: 0 };
function setView(k) {
  const v = VIEWS[k]; player.x = v.p[0]; player.z = v.p[1]; player.yaw = v.yaw; player.pitch = v.pitch;
}
setView(1);

const keys = new Set();
const overlay = document.getElementById('overlay');
const statsEl = document.getElementById('stats');
let locked = false;
function lockPointer() {
  try { const r = renderer.domElement.requestPointerLock?.(); if (r && r.catch) r.catch(() => {}); } catch (e) { /* drag-look fallback */ }
}
overlay.addEventListener('click', () => { lockPointer(); overlay.style.display = 'none'; });
renderer.domElement.addEventListener('click', () => { if (!locked) lockPointer(); });
document.addEventListener('pointerlockchange', () => {
  locked = document.pointerLockElement === renderer.domElement;
  if (!locked) { overlay.style.display = 'flex'; keys.clear(); } else overlay.style.display = 'none';
});
document.addEventListener('pointerlockerror', () => { overlay.style.display = 'none'; });
let dragging = false, lastX = 0, lastY = 0;
renderer.domElement.addEventListener('mousedown', (e) => { dragging = true; lastX = e.clientX; lastY = e.clientY; });
window.addEventListener('mouseup', () => { dragging = false; });
window.addEventListener('mousemove', (e) => {
  let dx = 0, dy = 0;
  if (locked) { dx = e.movementX; dy = e.movementY; }
  else if (dragging) { dx = e.clientX - lastX; dy = e.clientY - lastY; lastX = e.clientX; lastY = e.clientY; }
  else return;
  if (Math.abs(dx) > 300 || Math.abs(dy) > 300) return; // ignore spurious jumps
  player.yaw -= dx * 0.0022; player.pitch -= dy * 0.0022;
  player.pitch = Math.max(-1.45, Math.min(1.45, player.pitch));
});
window.addEventListener('keydown', (e) => {
  const k = e.key.toLowerCase();
  if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'shift'].includes(k)) { keys.add(k); e.preventDefault(); }
  if (k === 'r') setView(1);
  if (VIEWS[k]) setView(+k);
  if (k === 'f') { statsEl.style.display = statsEl.style.display === 'block' ? 'none' : 'block'; }
  if (k === 'q') { hiRes = !hiRes; autoLevel = 0; slowSince = t; applyPixelRatio(); }
  if (k === 'h') overlay.style.display = overlay.style.display === 'none' ? 'flex' : 'none';
});
window.addEventListener('keyup', (e) => keys.delete(e.key.toLowerCase()));
window.addEventListener('blur', () => keys.clear());
window.addEventListener('resize', () => { camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); applyPixelRatio(); });

const vel = new THREE.Vector2();
function updatePlayer(dt) {
  let f = 0, s = 0;
  if (keys.has('w') || keys.has('arrowup')) f += 1;
  if (keys.has('s') || keys.has('arrowdown')) f -= 1;
  if (keys.has('d') || keys.has('arrowright')) s += 1;
  if (keys.has('a') || keys.has('arrowleft')) s -= 1;
  const speed = keys.has('shift') ? 4.0 : 2.2;
  const len = Math.hypot(f, s) || 1;
  const sy = Math.sin(player.yaw), cy = Math.cos(player.yaw);
  const tx = ((-sy) * f + cy * s) / len * speed, tz = ((-cy) * f - sy * s) / len * speed;
  const k = 1 - Math.exp(-dt * 12);
  vel.x += (tx - vel.x) * k; vel.y += (tz - vel.y) * k;
  // sub-step for safety
  const steps = Math.ceil(Math.max(Math.abs(vel.x), Math.abs(vel.y)) * dt / 0.1) || 1;
  for (let i = 0; i < steps; i++) {
    const nx = player.x + vel.x * dt / steps;
    if (canStand(nx, player.z)) player.x = nx; else vel.x *= 0.3;
    const nz = player.z + vel.y * dt / steps;
    if (canStand(player.x, nz)) player.z = nz; else vel.y *= 0.3;
  }
  const sp = Math.hypot(vel.x, vel.y);
  player.bob += dt * sp * 4.2;
  const bobY = Math.sin(player.bob) * 0.018 * Math.min(1, sp / 1.8);
  camera.position.set(player.x, player.eye + bobY, player.z);
  camera.rotation.set(player.pitch, player.yaw, 0, 'YXZ');
}

// =====================================================================
//  Loop + frame stats
// =====================================================================
const clock = new THREE.Clock();
const ft = []; let lastStat = 0, t = 0, slowSince = 0;
renderer.shadowMap.needsUpdate = true;
document.getElementById('loading').remove();
console.log('draw buckets', mergedCalls);

function frame() {
  const dt = Math.min(clock.getDelta(), 0.05);
  t += dt;
  updatePlayer(dt);
  backdrop.position.set(camera.position.x, camera.position.y, camera.position.z);
  rainMat.uniforms.uTime.value = t;
  rainMat.uniforms.uCam.value.copy(camera.position);
  dripMat.uniforms.uTime.value = t;
  dripMat.uniforms.uCam.value.copy(camera.position);
  rainGlassTex.offset.y = -t * 0.004;
  cloudTex.forEach((c, i) => { c.offset.x += dt * (0.0012 + i * 0.0004); });
  renderer.render(scene, camera);
  ft.push(dt * 1000); if (ft.length > 240) ft.shift();
  // adaptive resolution: step down (never up) when the last ~2 s average is clearly below 45 fps
  if (hiRes && autoLevel < AUTO_PIX.length - 1 && t - slowSince > 4 && ft.length >= 120 && document.visibilityState === 'visible') {
    let sum = 0; for (let i = ft.length - 120; i < ft.length; i++) sum += ft[i];
    if (sum / 120 > 22) { autoLevel++; applyPixelRatio(); slowSince = t; ft.length = 0; }
  }
  if (statsEl.style.display === 'block' && t - lastStat > 0.25) {
    lastStat = t;
    const s = [...ft].sort((a, b) => a - b);
    const avg = ft.reduce((a, b) => a + b, 0) / ft.length;
    const p99 = s[Math.floor(s.length * 0.99) - 1] || 0;
    const info = renderer.info.render;
    statsEl.textContent = `fps ${(1000 / avg).toFixed(0)}  avg ${avg.toFixed(2)} ms\np99 ${p99.toFixed(2)} ms  max ${s[s.length - 1].toFixed(1)}\ndraws ${info.calls}  tris ${(info.triangles / 1000).toFixed(0)}k\npos ${player.x.toFixed(1)}, ${player.z.toFixed(1)}  res ${hiRes ? 'high L' + autoLevel : 'perf'} ${renderer.domElement.width}x${renderer.domElement.height}`;
  }
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
window.__station = { camera, renderer, scene, player, setView, canStand, keys, step: updatePlayer };

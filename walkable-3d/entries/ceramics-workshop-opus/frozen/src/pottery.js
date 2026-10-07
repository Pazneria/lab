// Handmade vessel generator: lathe profiles with wall thickness, rims, wobble,
// throwing rings, glaze lines with drips, raw feet, speckle. Output geometries
// carry position/normal/color/gloss so all ceramics merge into one draw call.
import * as THREE from 'three';
import { mergeVertices } from 'three/addons/utils/BufferGeometryUtils.js';

export function rng(a) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const sm = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
const lin = (c) => Math.pow(c, 2.2);

export const SHAPES = {
  bowl: [[0.46, 0], [0.74, 0.24], [0.92, 0.6], [1, 1]],
  deepbowl: [[0.42, 0], [0.8, 0.32], [0.97, 0.72], [1, 1]],
  teabowl: [[0.55, 0], [0.87, 0.3], [0.98, 0.72], [0.94, 1]],
  cylinder: [[0.88, 0], [0.97, 0.12], [1, 0.5], [0.96, 0.88], [0.99, 1]],
  mug: [[0.84, 0], [0.96, 0.12], [1, 0.48], [0.95, 0.86], [0.99, 1]],
  jar: [[0.55, 0], [0.88, 0.18], [1, 0.45], [0.86, 0.78], [0.56, 0.93], [0.6, 1]],
  moon: [[0.42, 0], [0.86, 0.16], [1, 0.46], [0.84, 0.8], [0.44, 0.95], [0.5, 1]],
  bottle: [[0.58, 0], [0.93, 0.16], [1, 0.34], [0.62, 0.6], [0.27, 0.78], [0.24, 0.9], [0.34, 1]],
  vase: [[0.5, 0], [0.64, 0.3], [0.52, 0.62], [0.7, 0.88], [1, 1]],
  pitcher: [[0.74, 0], [0.95, 0.25], [1, 0.45], [0.82, 0.8], [0.9, 1]],
  plate: [[0.5, 0], [0.56, 0.2], [0.86, 0.6], [1, 1]],
  planter: [[0.74, 0], [0.84, 0.2], [0.96, 0.84], [1, 0.92], [1.04, 1]],
  bucketpot: [[0.8, 0], [0.86, 0.3], [0.94, 0.8], [1, 1]],
};

export const GLAZES = {
  celadon: { c: [0.56, 0.69, 0.6], b: [0.78, 0.82, 0.72] },
  tenmoku: { c: [0.11, 0.055, 0.03], b: [0.58, 0.3, 0.1] },
  shino: { c: [0.9, 0.79, 0.67], b: [0.86, 0.48, 0.28] },
  cobalt: { c: [0.1, 0.17, 0.46], b: [0.36, 0.46, 0.72] },
  copper: { c: [0.52, 0.06, 0.07], b: [0.8, 0.74, 0.64] },
  white: { c: [0.91, 0.9, 0.85], b: [0.76, 0.68, 0.58] },
  ash: { c: [0.52, 0.5, 0.25], b: [0.68, 0.56, 0.3] },
  turq: { c: [0.24, 0.58, 0.58], b: [0.62, 0.76, 0.66] },
  amber: { c: [0.56, 0.33, 0.08], b: [0.8, 0.6, 0.28] },
  black: { c: [0.08, 0.075, 0.07], b: [0.3, 0.24, 0.2], m: 0.5 },
  oatmeal: { c: [0.8, 0.74, 0.62], b: [0.62, 0.5, 0.38], m: 0.45, sp: 1 },
  rutile: { c: [0.42, 0.5, 0.62], b: [0.74, 0.58, 0.36] },
  chun: { c: [0.55, 0.64, 0.78], b: [0.82, 0.84, 0.86] },
};
export const CLAYS = {
  buff: { raw: [0.72, 0.64, 0.53], bis: [0.88, 0.76, 0.64], fired: [0.8, 0.68, 0.54] },
  red: { raw: [0.6, 0.36, 0.24], bis: [0.78, 0.45, 0.3], fired: [0.56, 0.29, 0.18] },
  porcelain: { raw: [0.82, 0.82, 0.8], bis: [0.94, 0.93, 0.91], fired: [0.93, 0.92, 0.89] },
  dark: { raw: [0.4, 0.34, 0.3], bis: [0.62, 0.48, 0.4], fired: [0.32, 0.26, 0.23] },
  speckled: { raw: [0.7, 0.65, 0.57], bis: [0.86, 0.79, 0.7], fired: [0.78, 0.7, 0.58], sp: 1 },
};
const CLAY_KEYS = Object.keys(CLAYS);
const GLAZE_KEYS = Object.keys(GLAZES);

// stage: wet | leather | dry | bisque | raw (unfired glaze) | glazed
function stageColor(clay, stage) {
  const C = CLAYS[clay];
  if (stage === 'wet') return [C.raw[0] * 0.62, C.raw[1] * 0.6, C.raw[2] * 0.58];
  if (stage === 'leather') return [C.raw[0] * 0.8, C.raw[1] * 0.78, C.raw[2] * 0.76];
  if (stage === 'dry') return C.raw.map((v) => v + (0.95 - v) * 0.22);
  if (stage === 'bisque') return C.bis;
  return C.fired;
}
const stageGloss = { wet: 0.42, leather: 0.12, dry: 0, bisque: 0, raw: 0, glazed: 1 };

export function randomVessel(r, opts = {}) {
  const shapes = opts.shapes || Object.keys(SHAPES).filter((s) => s !== 'planter' && s !== 'bucketpot');
  const shape = shapes[Math.floor(r() * shapes.length)];
  const maxH = opts.maxH || 0.35, maxR = opts.maxR || 0.16;
  let R, H;
  switch (shape) {
    case 'plate': R = 0.1 + r() * 0.06; H = 0.025 + r() * 0.015; break;
    case 'bowl': R = 0.07 + r() * 0.08; H = R * (0.45 + r() * 0.25); break;
    case 'deepbowl': R = 0.06 + r() * 0.06; H = R * (0.7 + r() * 0.3); break;
    case 'teabowl': R = 0.055 + r() * 0.015; H = 0.07 + r() * 0.02; break;
    case 'mug': R = 0.04 + r() * 0.012; H = 0.09 + r() * 0.03; break;
    case 'cylinder': R = 0.04 + r() * 0.04; H = R * (1.6 + r() * 1.4); break;
    case 'jar': R = 0.06 + r() * 0.06; H = R * (1.3 + r() * 0.6); break;
    case 'moon': R = 0.07 + r() * 0.06; H = R * (1.6 + r() * 0.4); break;
    case 'bottle': R = 0.05 + r() * 0.04; H = R * (2.6 + r() * 1.0); break;
    case 'vase': R = 0.045 + r() * 0.04; H = R * (2.6 + r() * 1.2); break;
    case 'pitcher': R = 0.055 + r() * 0.03; H = R * (2.1 + r() * 0.5); break;
  }
  if (H > maxH) { const k = maxH / H; H *= k; R *= Math.max(k, 0.7); }
  R = Math.min(R, maxR);
  const stage = opts.stage || 'glazed';
  const clay = opts.clay || CLAY_KEYS[Math.floor(r() * CLAY_KEYS.length)];
  const g = opts.glaze || GLAZE_KEYS[Math.floor(r() * GLAZE_KEYS.length)];
  const rims = ['round', 'round', 'roll', 'flare', 'cut', 'round'];
  return {
    shape, R, H, clay, stage, glaze: g,
    glaze2: r() < 0.28 ? GLAZE_KEYS[Math.floor(r() * GLAZE_KEYS.length)] : null,
    rim: shape === 'plate' ? 'round' : rims[Math.floor(r() * rims.length)],
    wave: (shape === 'teabowl' || shape === 'bowl' || shape === 'vase') && r() < 0.35 ? 0.03 + r() * 0.04 : 0,
    handle: shape === 'mug' || shape === 'pitcher' || (shape === 'cylinder' && r() < 0.2),
    spout: shape === 'pitcher',
    seed: Math.floor(r() * 1e9),
  };
}

export function vessel(o) {
  const r = rng(o.seed || 1);
  const R = o.R, H = o.H;
  const shp = SHAPES[o.shape];
  const cps = shp.map(([pr, py], i) => new THREE.Vector2(
    R * pr * (i ? 1 + (r() - 0.5) * 0.1 : 1),
    H * py * (i && i < shp.length - 1 ? 1 + (r() - 0.5) * 0.08 : 1)));
  const curve = new THREE.SplineCurve(cps);
  const NO = Math.max(8, Math.min(20, Math.round(H / 0.015) + 5));
  const outer = curve.getPoints(NO);
  const t = o.t || Math.min(0.011, Math.max(0.0042, R * 0.075));
  if (o.rim === 'flare') { const p = outer[NO]; p.x += t * 1.3; p.y -= t * 0.3; }
  const prof = [];
  const rf = outer[0].x;
  const footH = Math.min(0.008, H * 0.08);
  prof.push({ r: 0, y: footH * 0.7, s: 3 });
  prof.push({ r: rf * 0.78, y: footH * 0.7, s: 3 });
  prof.push({ r: rf * 0.85, y: 0, s: 3 });
  prof.push({ r: rf * 0.97, y: 0, s: 3 });
  prof.push({ r: rf, y: footH, s: 0 });
  for (let k = 1; k <= NO; k++) { const p = outer[k]; if (p.y <= footH * 1.2) continue; prof.push({ r: p.x, y: p.y, s: 0 }); }
  const top = outer[NO], prev = outer[NO - 1];
  let dx = top.x - prev.x, dy = top.y - prev.y; const L = Math.hypot(dx, dy) || 1; dx /= L; dy /= L;
  const nx = dy, ny = -dx;
  const roll = o.rim === 'roll';
  const rr = roll ? t * 0.85 : t * 0.5;
  const cx = top.x - nx * t * 0.5 + (roll ? nx * t * 0.3 : 0), cy = top.y - ny * t * 0.5;
  const a0 = Math.atan2(ny, nx);
  const flat = o.rim === 'cut' ? 0.45 : 1;
  for (let k = 1; k <= 7; k++) { const a = a0 + Math.PI * k / 8; prof.push({ r: cx + Math.cos(a) * rr, y: cy + Math.sin(a) * rr * flat, s: 1 }); }
  const floorY = Math.max(footH + t * 1.1, 0.007);
  let lastR = 0;
  for (let k = NO - 1; k >= 1; k -= (k > NO - 3 ? 1 : 2)) {
    const p = outer[k], q = outer[Math.min(NO, k + 1)], w = outer[k - 1];
    let tx = q.x - w.x, ty = q.y - w.y; const l = Math.hypot(tx, ty) || 1; tx /= l; ty /= l;
    const ix = p.x - ty * t, iy = p.y + tx * t;
    if (iy < floorY + t * 0.5) break;
    if (ix <= 0.002) continue;
    prof.push({ r: ix, y: iy, s: 2 }); lastR = ix;
  }
  prof.push({ r: Math.max(0.002, lastR * 0.75), y: floorY, s: 2 });
  prof.push({ r: lastR * 0.35, y: floorY, s: 2 });
  prof.push({ r: 0, y: floorY, s: 2 });

  const N = Math.max(14, Math.min(34, Math.round(2 * Math.PI * R / 0.016)));
  const P = prof.length;
  const pos = new Float32Array(N * P * 3), col = new Float32Array(N * P * 3), gl = new Float32Array(N * P);
  const wobK = o.wob ?? 1;
  const A1 = (0.006 + r() * 0.014) * wobK, A2 = (0.004 + r() * 0.01) * wobK, A3 = 0.006 * r() * wobK;
  const p1 = r() * 6.28, p2 = r() * 6.28, p3 = r() * 6.28, tw = (r() - 0.5) * 3;
  const ringA = (0.0004 + r() * 0.0009) * wobK, ringF = (2 * Math.PI) / (0.03 + r() * 0.02), p4 = r() * 6.28;
  const tiltX = (r() - 0.5) * 0.06 * wobK, tiltZ = (r() - 0.5) * 0.06 * wobK;
  const ex = 1 + (r() - 0.5) * 0.05 * wobK;
  const waveK = 3 + Math.floor(r() * 4), p5 = r() * 6.28;
  const stage = o.stage || 'glazed';
  const base = stageColor(o.clay, stage);
  const clayDef = CLAYS[o.clay];
  const G = GLAZES[o.glaze] || GLAZES.white;
  const G2 = o.glaze2 ? GLAZES[o.glaze2] : null;
  const liner = o.liner ? GLAZES[o.liner] : G;
  const isGl = stage === 'glazed' || stage === 'raw';
  const gLine = (o.gLine ?? (0.012 + r() * 0.035)) + footH;
  const dk = 3 + Math.floor(r() * 5), dph = r() * 6.28, dLen = (o.drip ?? (0.004 + r() * 0.02)) * (stage === 'raw' ? 0.3 : 1);
  const g2Line = 0.45 + r() * 0.4, p6 = r() * 6.28, p7 = r() * 6.28;
  const speck = clayDef.sp || (G.sp && stage === 'glazed');
  const gg = stage === 'raw' ? 0 : (G.m ?? 1);
  const tmp = [0, 0, 0];
  for (let i = 0; i < N; i++) {
    const a = (i / N) * Math.PI * 2, ca = Math.cos(a), sa = Math.sin(a);
    const drip = dLen * Math.pow(Math.max(0, Math.sin(a * dk + dph)), 10) + 0.003 * Math.sin(a * 5 + dph);
    const g2y = H * g2Line + 0.015 * Math.sin(a * 2 + p6) + 0.008 * Math.sin(a * 7 + p7);
    for (let j = 0; j < P; j++) {
      const pp = prof[j];
      let rad = pp.r, y = pp.y;
      const yn = y / H;
      rad *= 1 + A1 * Math.sin(a + p1 + yn * tw) + A2 * Math.sin(2 * a + p2) * yn + A3 * Math.sin(3 * a + p3) * yn * yn;
      const ring = Math.sin(y * ringF + p4);
      if (pp.s !== 3 && yn > 0.1) rad += ringA * ring * (pp.s === 2 ? 1.5 : 1);
      if (o.wave) y += o.wave * H * Math.sin(a * waveK + p5) * sm(0.7, 1, yn) * (pp.s === 3 ? 0 : 1);
      if (o.spout && pp.s !== 3) {
        let da = a; if (da > Math.PI) da -= Math.PI * 2;
        const g = Math.exp(-da * da / 0.06), s = sm(0.72, 1, yn);
        rad += g * s * R * 0.32; y += g * s * s * H * 0.05;
      }
      const k = (i * P + j);
      pos[k * 3] = rad * ca * ex + tiltX * y;
      pos[k * 3 + 1] = y;
      pos[k * 3 + 2] = rad * sa / ex + tiltZ * y;
      // ---- colour
      let c = base, gloss = stageGloss[stage] ?? 0;
      const nn = 0.5 + 0.25 * (Math.sin(a * 3 + y * 37 + p6) + Math.sin(a * 5 - y * 61 + p7));
      let glazed = false;
      if (isGl) {
        if (pp.s === 2 || pp.s === 1) glazed = true;
        else if (pp.s === 0 && y > gLine - drip) glazed = true;
      }
      if (glazed) {
        let gc = pp.s === 2 ? liner.c : G.c;
        if (G2 && pp.s !== 2 && y > g2y) gc = G2.c;
        let brk = 0;
        if (pp.s !== 2) brk = sm(H - 0.016, H, y) * 0.65 + (ring > 0.75 ? 0.18 : 0);
        if (G2 && pp.s !== 2 && Math.abs(y - g2y) < 0.012) brk += 0.25;
        tmp[0] = gc[0] + (G.b[0] - gc[0]) * brk; tmp[1] = gc[1] + (G.b[1] - gc[1]) * brk; tmp[2] = gc[2] + (G.b[2] - gc[2]) * brk;
        let thick = 1;
        if (pp.s === 0 && y < gLine - drip + 0.008) thick = 0.78;
        if (pp.s === 2 && y < floorY + 0.02) thick = 0.72;
        const v = (0.9 + 0.2 * nn) * thick;
        tmp[0] *= v; tmp[1] *= v; tmp[2] *= v;
        if (stage === 'raw') { tmp[0] = tmp[0] * 0.45 + 0.5; tmp[1] = tmp[1] * 0.45 + 0.49; tmp[2] = tmp[2] * 0.45 + 0.46; }
        c = tmp; gloss = gg;
      } else {
        const v = 0.94 + 0.12 * nn;
        tmp[0] = c[0] * v; tmp[1] = c[1] * v; tmp[2] = c[2] * v; c = tmp;
        if (stage === 'glazed' || stage === 'raw') gloss = 0.05;
        if (stage === 'wet' && pp.s !== 3) gloss = 0.3 + 0.2 * nn;
      }
      if (speck && r() < 0.05) { const d = 0.45 + r() * 0.2; c = [c[0] * d, c[1] * d * 0.95, c[2] * d * 0.9]; }
      col[k * 3] = lin(Math.min(1, c[0])); col[k * 3 + 1] = lin(Math.min(1, c[1])); col[k * 3 + 2] = lin(Math.min(1, c[2]));
      gl[k] = gloss;
    }
  }
  const idx = [];
  for (let i = 0; i < N; i++) {
    const i2 = (i + 1) % N;
    for (let j = 0; j < P - 1; j++) {
      const a = i * P + j, b = i2 * P + j, c = b + 1, d = a + 1;
      idx.push(a, d, b, b, d, c);
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  geo.setAttribute('gloss', new THREE.BufferAttribute(gl, 1));
  geo.setIndex(idx);
  geo.computeVertexNormals();
  const parts = [geo];
  if (o.handle) {
    // sample outer radius at height
    const rAt = (yy) => { let best = outer[0]; for (const p of outer) if (Math.abs(p.y - yy) < Math.abs(best.y - yy)) best = p; return best.x; };
    const ha = Math.PI; // opposite spout
    const yT = H * 0.78, yB = H * 0.3, rT = rAt(yT) + 0.001, rB = rAt(yB) + 0.001;
    const out = Math.max(0.028, R * 0.55);
    const pts = [
      new THREE.Vector3(rT - 0.004, yT, 0), new THREE.Vector3(rT + out * 0.7, yT + 0.008, 0),
      new THREE.Vector3(rT + out, (yT + yB) / 2 + 0.006, 0), new THREE.Vector3(rB + out * 0.55, yB + 0.004, 0), new THREE.Vector3(rB - 0.004, yB, 0)];
    const hc = new THREE.CatmullRomCurve3(pts);
    const tube = new THREE.TubeGeometry(hc, 16, Math.max(0.0055, R * 0.085), 7, false);
    tube.scale(1, 1, 1.6);
    tube.rotateY(-ha);
    tube.deleteAttribute('uv');
    const n = tube.attributes.position.count;
    const hcol = new Float32Array(n * 3), hgl = new Float32Array(n);
    const hcSrc = isGl ? (stage === 'raw' ? G.c.map((v) => v * 0.45 + 0.5) : G.c) : base;
    for (let i = 0; i < n; i++) {
      const ty = tube.attributes.position.getY(i);
      const gTop = G2 && ty > H * g2Line ? G2.c : hcSrc;
      const v = 0.92 + 0.12 * Math.sin(ty * 90 + i);
      hcol[i * 3] = lin(gTop[0] * v); hcol[i * 3 + 1] = lin(gTop[1] * v); hcol[i * 3 + 2] = lin(gTop[2] * v);
      hgl[i] = isGl ? gg : (stageGloss[stage] ?? 0);
    }
    tube.setAttribute('color', new THREE.BufferAttribute(hcol, 3));
    tube.setAttribute('gloss', new THREE.BufferAttribute(hgl, 1));
    parts.push(tube);
  }
  return parts;
}

// colour/gloss any geometry (drops uv, ensures index)
export function paint(geo, color, gloss = 0, vary = 0, seed = 1) {
  if (geo.attributes.uv) geo.deleteAttribute('uv');
  if (!geo.index) { geo.deleteAttribute('normal'); geo = mergeVertices(geo); geo.computeVertexNormals(); }
  const n = geo.attributes.position.count;
  const c = new Float32Array(n * 3), g = new Float32Array(n);
  const r = rng(seed);
  for (let i = 0; i < n; i++) {
    const v = 1 + (r() - 0.5) * vary;
    c[i * 3] = lin(Math.min(1, color[0] * v)); c[i * 3 + 1] = lin(Math.min(1, color[1] * v)); c[i * 3 + 2] = lin(Math.min(1, color[2] * v));
    g[i] = gloss;
  }
  geo.setAttribute('color', new THREE.BufferAttribute(c, 3));
  geo.setAttribute('gloss', new THREE.BufferAttribute(g, 1));
  return geo;
}

// lumpy clay mass
export function lump(rx, ry, rz, color, gloss, seed, detail = 3) {
  let g = new THREE.IcosahedronGeometry(1, detail);
  g.deleteAttribute('uv'); g.deleteAttribute('normal');
  g = mergeVertices(g);
  const r = rng(seed);
  const ph = [r() * 6, r() * 6, r() * 6, r() * 6];
  const p = g.attributes.position;
  for (let i = 0; i < p.count; i++) {
    let x = p.getX(i), y = p.getY(i), z = p.getZ(i);
    const d = 1 + 0.08 * Math.sin(x * 3 + ph[0]) * Math.sin(z * 4 + ph[1]) + 0.05 * Math.sin(y * 7 + ph[2] + x * 3) + 0.03 * Math.sin(z * 11 + ph[3]);
    x *= d * rx; y *= d * ry; z *= d * rz;
    if (y < -ry * 0.55) y = -ry * 0.55 - (y + ry * 0.55) * 0.08;
    p.setXYZ(i, x, y + ry * 0.55, z);
  }
  g.computeVertexNormals();
  return paint(g, color, gloss, 0.08, seed);
}

import * as THREE from 'three';

// ---------------------------------------------------------------------------
// Utilities: seeded random, value noise
// ---------------------------------------------------------------------------
function mulberry32(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
const rand = mulberry32(1337);
const PERM = new Uint8Array(768);
{ const p = [...Array(256).keys()]; for (let i = 255; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [p[i], p[j]] = [p[j], p[i]]; } for (let i = 0; i < 768; i++) PERM[i] = p[i & 255]; }
const clamp = (v, a, b) => v < a ? a : v > b ? b : v;
const lerp = (a, b, t) => a + (b - a) * t;
const smoothstep = (a, b, x) => { const t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
function noise3(x, y, z) {
  const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
  const xf = x - xi, yf = y - yi, zf = z - zi;
  const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf), w = zf * zf * (3 - 2 * zf);
  const X = xi & 255, Y = yi & 255, Z = zi & 255;
  const a = PERM[X] + Y, b = PERM[X + 1] + Y;
  const aa = PERM[a] + Z, ab = PERM[a + 1] + Z, ba = PERM[b] + Z, bb = PERM[b + 1] + Z;
  const x1 = lerp(PERM[aa], PERM[ba], u), x2 = lerp(PERM[ab], PERM[bb], u);
  const x3 = lerp(PERM[aa + 1], PERM[ba + 1], u), x4 = lerp(PERM[ab + 1], PERM[bb + 1], u);
  return lerp(lerp(x1, x2, v), lerp(x3, x4, v), w) / 127.5 - 1;
}
const hash1 = (i) => PERM[(i & 255)] / 255;

// ---------------------------------------------------------------------------
// Cave definition (signed distance; air shapes negative inside)
// ---------------------------------------------------------------------------
const WATER_Y = -0.2;
const POOL = { cx: 0.5, cz: -0.3, rx: 6.2, rz: 4.2 };
const SHAFT_A = [1.5, 7.5, -0.5], SHAFT_B = [2.7, 15.5, -3.7];
const SHAFT_DIR = new THREE.Vector3(SHAFT_B[0] - SHAFT_A[0], SHAFT_B[1] - SHAFT_A[1], SHAFT_B[2] - SHAFT_A[2]).normalize();

function smin(a, b, k) { const h = Math.max(k - Math.abs(a - b), 0) / k; return Math.min(a, b) - h * h * k * 0.25; }
function smax(a, b, k) { return -smin(-a, -b, k); }
function sdEll(x, y, z, rx, ry, rz) {
  const k0 = Math.sqrt((x / rx) ** 2 + (y / ry) ** 2 + (z / rz) ** 2);
  const k1 = Math.sqrt((x / (rx * rx)) ** 2 + (y / (ry * ry)) ** 2 + (z / (rz * rz)) ** 2);
  return k0 * (k0 - 1) / (k1 + 1e-9);
}
// tapered capsule (approximate), optional y squash
function sdTaper(px, py, pz, ax, ay, az, bx, by, bz, r1, r2) {
  const bax = bx - ax, bay = by - ay, baz = bz - az;
  const pax = px - ax, pay = py - ay, paz = pz - az;
  const t = clamp((pax * bax + pay * bay + paz * baz) / (bax * bax + bay * bay + baz * baz), 0, 1);
  const dx = pax - bax * t, dy = pay - bay * t, dz = paz - baz * t;
  return Math.sqrt(dx * dx + dy * dy + dz * dz) - lerp(r1, r2, t);
}

function poolR(x, z) {
  const px = (x - POOL.cx) / POOL.rx, pz = (z - POOL.cz) / POOL.rz;
  return Math.sqrt(px * px + pz * pz) + 0.09 * noise3(x * 0.45, 3.1, z * 0.45);
}
function floorH(x, z) {
  let h = 0.7 * smoothstep(-8, -12.5, x);
  const r = smoothstep(12.2, 16.8, x);
  const s6 = r * 6, fi = Math.floor(s6), rs = (fi + smoothstep(0.6, 1.0, s6 - fi)) / 6;
  h += 1.8 * lerp(r, Math.min(rs, 1), 0.6);
  const pr = poolR(x, z);
  h -= 0.75 * smoothstep(1.0, 0.42, pr);
  h -= 0.18 * smoothstep(1.7, 0.95, pr);
  h += 0.07 * noise3(x * 0.8, 0.5, z * 0.8) + 0.025 * noise3(x * 2.6, 7.7, z * 2.6);
  return h;
}

// rock formations [type, params, bounding center xyz, bounding radius]
const FORMS = [];
function stalagmite(x, z, base, height, r1, r2, lean = [0, 0]) { FORMS.push({ k: 'T', a: [x, base - 0.6, z], b: [x + lean[0], base + height, z + lean[1]], r1, r2 }); }
function stalactite(x, z, tip, r1, r2, top = 13) { FORMS.push({ k: 'T', a: [x + 0.2, top, z - 0.1], b: [x, tip, z], r1, r2 }); }
// column
FORMS.push({ k: 'T', a: [-7.6, -0.5, 6.3], b: [-7.4, 4.4, 6.0], r1: 1.35, r2: 0.48 });
FORMS.push({ k: 'T', a: [-7.4, 3.9, 6.0], b: [-7.0, 10.5, 5.5], r1: 0.5, r2: 1.7 });
stalagmite(7.8, 5.7, 0, 2.9, 1.05, 0.22, [0.15, -0.1]);
stalagmite(10.9, -3.6, 0, 2.3, 0.85, 0.2);
stalagmite(-2.5, -7.3, 0, 1.9, 0.8, 0.18);
stalagmite(-1.4, -7.9, 0, 1.15, 0.55, 0.14);
stalagmite(-3.5, -8.0, 0, 0.95, 0.5, 0.14);
stalagmite(-1.8, 0.7, -0.95, 1.85, 0.6, 0.14);  // rising from the pool
stalagmite(22.6, -2.8, 1.8, 1.55, 0.7, 0.16);
stalagmite(23.5, -1.6, 1.8, 0.85, 0.45, 0.13);
stalagmite(-17.8, -1.6, 0.7, 1.2, 0.6, 0.15);
stalactite(-4.0, 1.6, 5.6, 1.3, 0.16);
stalactite(-2.6, 2.6, 6.8, 0.9, 0.14);
stalactite(6.0, -3.2, 5.8, 1.2, 0.16);
stalactite(4.6, -2.0, 7.0, 0.8, 0.14);
stalactite(8.6, 2.2, 5.0, 1.1, 0.15);
stalactite(-10.6, 0.9, 3.9, 0.9, 0.15, 9);
stalactite(19.5, 2.4, 4.6, 0.7, 0.13, 9);
stalactite(-6.4, -4.0, 6.2, 1.0, 0.15);
FORMS.push({ k: 'T', a: [2.6, 10.5, -1.0], b: [2.0, 8.1, -0.3], r1: 0.5, r2: 0.12 }); // fang at the skylight lip
// flowstone & ledges
FORMS.push({ k: 'F', c: [3.6, 1.0, 9.2], r: [2.4, 3.4, 0.8] });
FORMS.push({ k: 'F', c: [1.6, 1.4, 9.0], r: [1.0, 2.6, 0.7] });
FORMS.push({ k: 'F', c: [24.9, 3.0, 0.6], r: [1.3, 2.6, 2.6] });
FORMS.push({ k: 'F', c: [-7.5, 1.6, -8.6], r: [2.4, 2.8, 1.2] });
FORMS.push({ k: 'B', c: [6.6, 2.5, -8.3], h: [2.4, 0.2, 1.1] });
FORMS.push({ k: 'B', c: [-3.0, 3.4, 9.0], h: [2.8, 0.22, 1.0] });
for (const f of FORMS) {
  if (f.k === 'T') { f.bc = [(f.a[0] + f.b[0]) / 2, (f.a[1] + f.b[1]) / 2, (f.a[2] + f.b[2]) / 2]; f.br = Math.hypot(f.b[0] - f.a[0], f.b[1] - f.a[1], f.b[2] - f.a[2]) / 2 + Math.max(f.r1, f.r2) + 1; }
  else if (f.k === 'F') { f.bc = f.c; f.br = Math.max(...f.r) + 1; }
  else { f.bc = f.c; f.br = Math.hypot(...f.h) + 1; }
}
function formSd(x, y, z) {
  let d = 1e9;
  for (let i = 0; i < FORMS.length; i++) {
    const f = FORMS[i];
    const dx = x - f.bc[0], dy = y - f.bc[1], dz = z - f.bc[2];
    if (dx * dx + dy * dy + dz * dz > f.br * f.br) continue;
    let s;
    if (f.k === 'T') s = sdTaper(x, y, z, f.a[0], f.a[1], f.a[2], f.b[0], f.b[1], f.b[2], f.r1, f.r2) + 0.06 * Math.sin(Math.atan2(dz, dx) * 7 + y * 1.3);
    else if (f.k === 'F') s = sdEll(dx, dy, dz, f.r[0], f.r[1], f.r[2]) + 0.45 * noise3(x * 0.8, y * 0.5, z * 0.8) + 0.15 * noise3(x * 2.0, y * 1.2, z * 2.0) + 0.08 * Math.sin(x * 3.2 + z * 2.0 + 2.0 * noise3(x * 0.5, y * 0.2, z * 0.5)) * smoothstep(f.c[1] + 2.5, f.c[1] - 1, y) + 0.15 * smoothstep(f.c[1] - 0.5, f.c[1] - f.r[1], y);
    else { const qx = Math.abs(dx) - f.h[0], qy = Math.abs(dy) - f.h[1], qz = Math.abs(dz) - f.h[2]; s = Math.hypot(Math.max(qx, 0), Math.max(qy, 0), Math.max(qz, 0)) + Math.min(Math.max(qx, qy, qz), 0) - 0.12 + 0.3 * noise3(x * 0.9, y * 2, z * 0.9) + 0.15 * noise3(x * 2.1, y * 3, z * 2.1); }
    d = Math.min(d, s);
  }
  return d;
}

function airShapes(x, y, z) {
  let A = sdEll(x, y - 2.5, z, 12.5, 7.2, 9.0);
  A = smin(A, sdEll(x + 5.5, y - 2.2, z + 6.6, 4.5, 3.2, 3.4), 2.0);
  A = smin(A, sdEll(x - 5.2, y - 2.0, z - 6.4, 4.5, 3.3, 3.1), 2.0);
  A = smin(A, sdEll(x + 16, y - 2.3, z - 1, 4.2, 2.5, 3.4), 1.5);
  A = smin(A, sdTaper(x, (y - 2.4) * 1.12 + 2.4, z, -15, 2.4, 1, -8.5, 2.6, 0, 2.6, 2.8), 1.6);
  A = smin(A, sdTaper(x, y, z, -18.5, 1.7, 1.6, -23.5, 2.5, 2.7, 1.1, 0.95), 0.9);
  A = smin(A, sdTaper(x, (y - 2.8) * 1.3 + 2.8, z, 8.0, 2.6, 0, 16.5, 3.2, 0.3, 4.1, 3.3), 1.6);
  A = smin(A, sdEll(x - 20.2, y - 3.2, z - 0.3, 5.3, 3.5, 4.8), 1.6);
  A = smin(A, sdTaper(x, y, z, SHAFT_A[0], SHAFT_A[1], SHAFT_A[2], SHAFT_B[0], SHAFT_B[1], SHAFT_B[2], 1.05, 0.85), 1.0);
  return A;
}
// clearance: positive in air, negative in rock
function caveSd(x, y, z) {
  let A = airShapes(x, y, z);
  if (A < 3 && A > -3.5) {
    const sh = Math.max(0, 1 - Math.hypot(x - 2, z + 1.5) / 3) * smoothstep(6, 9, y);
    let n = 0.6 * noise3(x * 0.21, y * 0.24, z * 0.21) + 0.3 * noise3(x * 0.52, y * 0.62, z * 0.52) + 0.12 * noise3(x * 1.35, y * 1.5, z * 1.35);
    n -= 0.07 * Math.abs(noise3(x * 1.7, y * 1.1, z * 1.7));
    A += n * (1 - 0.4 * sh);
    // bedding planes: recessed soft beds & protruding hard beds
    const tilt = y + 0.05 * x - 0.03 * z + 0.25 * noise3(x * 0.15, 0, z * 0.15);
    const t = tilt / 0.82, fi = Math.floor(t), f = t - fi;
    const amp = (0.08 + 0.22 * hash1(fi + 40)) * (0.55 + 0.45 * noise3(x * 0.33, fi * 1.7, z * 0.33));
    const prof = smoothstep(0.5, 0.7, f) * (1 - smoothstep(0.86, 0.99, f));
    A -= amp * prof * (1 - sh);
  }
  const F = floorH(x, z) - y;
  let air = smax(A, F, 1.1);
  const R = formSd(x, y, z);
  if (R < 2) air = smax(air, -R, 0.7);
  return -air;
}

// ---------------------------------------------------------------------------
// Grid & surface nets
// ---------------------------------------------------------------------------
const STEP = 0.2;
const GX0 = -21, GY0 = -1.6, GZ0 = -12.2;
const NX = Math.round((26.4 - GX0) / STEP) + 1, NY = Math.round((14.2 - GY0) / STEP) + 1, NZ = Math.round((12.2 - GZ0) / STEP) + 1;
let grid;

function buildGrid() {
  grid = new Float32Array(NX * NY * NZ);
  for (let k = 0; k < NZ; k++) {
    const z = GZ0 + k * STEP;
    for (let j = 0; j < NY; j++) {
      const y = GY0 + j * STEP;
      let o = (k * NY + j) * NX;
      for (let i = 0; i < NX; i++) grid[o++] = caveSd(GX0 + i * STEP, y, z);
    }
  }
}
function sampleD(x, y, z) {
  const fx = (x - GX0) / STEP, fy = (y - GY0) / STEP, fz = (z - GZ0) / STEP;
  if (fx < 0 || fy < 0 || fz < 0 || fx >= NX - 1 || fy >= NY - 1 || fz >= NZ - 1) return fy >= NY - 1 ? 1 : -1;
  const i = fx | 0, j = fy | 0, k = fz | 0, u = fx - i, v = fy - j, w = fz - k;
  const o = (k * NY + j) * NX + i, sy = NX, sz = NX * NY;
  const c00 = lerp(grid[o], grid[o + 1], u), c10 = lerp(grid[o + sy], grid[o + sy + 1], u);
  const c01 = lerp(grid[o + sz], grid[o + sz + 1], u), c11 = lerp(grid[o + sz + sy], grid[o + sz + sy + 1], u);
  return lerp(lerp(c00, c10, v), lerp(c01, c11, v), w);
}
function gradD(x, y, z, out) {
  const e = 0.12;
  out.set(sampleD(x + e, y, z) - sampleD(x - e, y, z), sampleD(x, y + e, z) - sampleD(x, y - e, z), sampleD(x, y, z + e) - sampleD(x, y, z - e));
  const l = out.length(); if (l > 1e-6) out.multiplyScalar(1 / l); return out;
}

function surfaceNets() {
  const cellIdx = new Int32Array(NX * NY * NZ).fill(-1);
  const pos = [], idx = [];
  const corner = new Float32Array(8);
  const EDGES = [[0, 1], [2, 3], [4, 5], [6, 7], [0, 2], [1, 3], [4, 6], [5, 7], [0, 4], [1, 5], [2, 6], [3, 7]];
  const CO = [[0, 0, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0], [0, 0, 1], [1, 0, 1], [0, 1, 1], [1, 1, 1]];
  const sy = NX, sz = NX * NY;
  for (let k = 0; k < NZ - 1; k++) for (let j = 0; j < NY - 1; j++) for (let i = 0; i < NX - 1; i++) {
    const o = (k * NY + j) * NX + i;
    let mask = 0;
    for (let c = 0; c < 8; c++) { const v = grid[o + CO[c][0] + CO[c][1] * sy + CO[c][2] * sz]; corner[c] = v; if (v > 0) mask |= 1 << c; }
    if (mask === 0 || mask === 255) continue;
    let ax = 0, ay = 0, az = 0, n = 0;
    for (const [e0, e1] of EDGES) {
      const v0 = corner[e0], v1 = corner[e1];
      if ((v0 > 0) === (v1 > 0)) continue;
      const t = v0 / (v0 - v1);
      ax += CO[e0][0] + (CO[e1][0] - CO[e0][0]) * t; ay += CO[e0][1] + (CO[e1][1] - CO[e0][1]) * t; az += CO[e0][2] + (CO[e1][2] - CO[e0][2]) * t; n++;
    }
    cellIdx[o] = pos.length / 3;
    pos.push(GX0 + (i + ax / n) * STEP, GY0 + (j + ay / n) * STEP, GZ0 + (k + az / n) * STEP);
    const air0 = corner[0] > 0;
    // edges from corner 0 along x, y, z
    if (j > 0 && k > 0 && air0 !== (corner[1] > 0)) {
      const a = cellIdx[o], b = cellIdx[o - sy], c = cellIdx[o - sy - sz], d = cellIdx[o - sz];
      if (air0) idx.push(a, b, c, a, c, d); else idx.push(a, c, b, a, d, c);
    }
    if (i > 0 && k > 0 && air0 !== (corner[2] > 0)) {
      const a = cellIdx[o], b = cellIdx[o - sz], c = cellIdx[o - 1 - sz], d = cellIdx[o - 1];
      if (air0) idx.push(a, b, c, a, c, d); else idx.push(a, c, b, a, d, c);
    }
    if (i > 0 && j > 0 && air0 !== (corner[4] > 0)) {
      const a = cellIdx[o], b = cellIdx[o - 1], c = cellIdx[o - 1 - sy], d = cellIdx[o - sy];
      if (air0) idx.push(a, b, c, a, c, d); else idx.push(a, c, b, a, d, c);
    }
  }
  return { pos: new Float32Array(pos), idx: new Uint32Array(idx) };
}

// ---------------------------------------------------------------------------
// Baked lighting helpers
// ---------------------------------------------------------------------------
const SUN_PATCH = new THREE.Vector3(0.1, 0.35, 3.1);
const SHAFT_OPEN = new THREE.Vector3(1.7, 8.4, -0.9);
const BAKED = [
  { p: SHAFT_OPEN, c: [0.62, 0.72, 0.86], i: 0.7, f: 0.028, r: 0.6 },
  { p: new THREE.Vector3(0.1, 1.2, 3.0), c: [1.0, 0.8, 0.55], i: 0.75, f: 0.08, r: 0.3 },
  { p: new THREE.Vector3(-19.9, 1.9, 1.9), c: [0.78, 0.8, 0.82], i: 0.34, f: 0.1, r: 0.4 },
  { p: new THREE.Vector3(21.2, 2.15, 1.3), c: [1.0, 0.66, 0.36], i: 0.7, f: 0.13, r: 0.25 },
];
function visTo(px, py, pz, L, maxT) {
  const dx = L.x - px, dy = L.y - py, dz = L.z - pz; const dist = Math.hypot(dx, dy, dz);
  const ux = dx / dist, uy = dy / dist, uz = dz / dist;
  let t = 0.3, res = 1; const end = dist - maxT;
  for (let s = 0; s < 70 && t < end; s++) {
    const d = sampleD(px + ux * t, py + uy * t, pz + uz * t);
    if (d < -0.15) return 0;
    res = Math.min(res, 0.3 + 2 * d / t);
    t += Math.max(d * 0.8, 0.12);
  }
  return clamp(res, 0, 1);
}
function bakeBounce(px, py, pz, nx, ny, nz, out) {
  out[0] = out[1] = out[2] = 0;
  for (const b of BAKED) {
    const dx = b.p.x - px, dy = b.p.y - py, dz = b.p.z - pz; const d2 = dx * dx + dy * dy + dz * dz; const d = Math.sqrt(d2);
    const fall = b.i / (1 + d2 * b.f); if (fall < 0.02) continue;
    const lam = (nx * dx + ny * dy + nz * dz) / d; if (lam <= 0) continue;
    const v = visTo(px + nx * 0.3, py + ny * 0.3, pz + nz * 0.3, b.p, b.r); if (v <= 0) continue;
    const s = fall * (0.25 + 0.75 * lam) * v;
    out[0] += b.c[0] * s; out[1] += b.c[1] * s; out[2] += b.c[2] * s;
  }
}
function bakeAO(px, py, pz, nx, ny, nz) {
  let occ = 0;
  const T = [0.2, 0.5, 1.0, 2.0, 3.6], W = [0.5, 0.45, 0.35, 0.22, 0.15];
  for (let i = 0; i < 5; i++) { const t = T[i]; const d = sampleD(px + nx * t, py + ny * t, pz + nz * t); occ += W[i] * clamp((t - d) / t, 0, 1); }
  return clamp(1 - occ * 0.75, 0.12, 1);
}

// ---------------------------------------------------------------------------
// Procedural tiling detail texture (normal xyz + height alpha)
// ---------------------------------------------------------------------------
function makeDetailTexture(N = 256) {
  const H = new Float32Array(N * N);
  const per = (x, y, p) => { // periodic value noise
    const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi;
    const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
    const h = (a, b) => PERM[(PERM[((a % p) + p) % p & 255] + (((b % p) + p) % p)) & 511] / 255;
    return lerp(lerp(h(xi, yi), h(xi + 1, yi), u), lerp(h(xi, yi + 1), h(xi + 1, yi + 1), u), v);
  };
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
    let h = 0, a = 0.5, f = 4;
    for (let o = 0; o < 5; o++) { h += a * per(x / N * f, y / N * f, f); a *= 0.5; f *= 2; }
    const r = per(x / N * 16 + 3, y / N * 16 + 7, 16); h += 0.18 * Math.abs(r - 0.5); // pitting/ridges
    H[y * N + x] = h;
  }
  let mn = 1e9, mx = -1e9; for (const v of H) { mn = Math.min(mn, v); mx = Math.max(mx, v); }
  const data = new Uint8Array(N * N * 4);
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
    const g = (xx, yy) => (H[((yy + N) % N) * N + ((xx + N) % N)] - mn) / (mx - mn);
    const dx = (g(x + 1, y) - g(x - 1, y)) * 3.2, dy = (g(x, y + 1) - g(x, y - 1)) * 3.2;
    const l = Math.hypot(dx, dy, 1);
    const o = (y * N + x) * 4;
    data[o] = (-dx / l * 0.5 + 0.5) * 255; data[o + 1] = (-dy / l * 0.5 + 0.5) * 255; data[o + 2] = (1 / l * 0.5 + 0.5) * 255; data[o + 3] = g(x, y) * 255;
  }
  const tex = new THREE.DataTexture(data, N, N, THREE.RGBAFormat);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping; tex.magFilter = THREE.LinearFilter; tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.generateMipmaps = true; tex.anisotropy = 4; tex.needsUpdate = true;
  return tex;
}

// ---------------------------------------------------------------------------
// Renderer & scene
// ---------------------------------------------------------------------------
const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));
renderer.setSize(innerWidth, innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.shadowMap.autoUpdate = false;
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xcfe0f2);
scene.fog = new THREE.FogExp2(0x0d0c0a, 0.018);
const camera = new THREE.PerspectiveCamera(72, innerWidth / innerHeight, 0.04, 140);
camera.rotation.order = 'YXZ';

const U = { uTime: { value: 0 }, uDetail: { value: null }, uWaterY: { value: WATER_Y }, uSun: { value: SUN_PATCH } };

function rockMaterial() {
  const m = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.9, metalness: 0 });
  m.onBeforeCompile = (sh) => {
    Object.assign(sh.uniforms, U);
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', `#include <common>
        attribute float aAO; attribute float aWet; attribute vec3 aBounce;
        varying float vAO; varying float vWet; varying vec3 vBounce; varying vec3 vWP; varying vec3 vWN;`)
      .replace('#include <beginnormal_vertex>', `#include <beginnormal_vertex>
        vec3 wn0 = objectNormal;
        #ifdef USE_INSTANCING
          mat3 imx = mat3(instanceMatrix);
          wn0 /= vec3(dot(imx[0], imx[0]), dot(imx[1], imx[1]), dot(imx[2], imx[2]));
          wn0 = imx * wn0;
        #endif
        vWN = normalize(mat3(modelMatrix) * wn0);`)
      .replace('#include <begin_vertex>', `#include <begin_vertex>
        vec4 wp4 = vec4(transformed, 1.0);
        #ifdef USE_INSTANCING
          wp4 = instanceMatrix * wp4;
        #endif
        vWP = (modelMatrix * wp4).xyz; vAO = aAO; vWet = aWet; vBounce = aBounce;`);
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', `#include <common>
        uniform float uTime; uniform sampler2D uDetail; uniform float uWaterY; uniform vec3 uSun;
        varying float vAO; varying float vWet; varying vec3 vBounce; varying vec3 vWP; varying vec3 vWN;
        vec4 tx1, ty1, tz1, tx2, ty2, tz2; vec3 tbw;
        float caust(vec2 p){ float a = texture2D(uDetail, p + vec2(uTime*0.021, uTime*0.013)).a; float b = texture2D(uDetail, p*1.31 - vec2(uTime*0.017, -uTime*0.024)).a; return pow(clamp(1.0 - abs(a-b)*3.0, 0.0, 1.0), 3.0); }`)
      .replace('#include <color_fragment>', `#include <color_fragment>
        vec3 wn = normalize(vWN);
        tbw = pow(abs(wn), vec3(4.0)); tbw /= (tbw.x + tbw.y + tbw.z);
        tx1 = texture2D(uDetail, vWP.zy * 0.55); ty1 = texture2D(uDetail, vWP.xz * 0.55); tz1 = texture2D(uDetail, vWP.xy * 0.55);
        tx2 = texture2D(uDetail, vWP.zy * 2.1); ty2 = texture2D(uDetail, vWP.xz * 2.1); tz2 = texture2D(uDetail, vWP.xy * 2.1);
        float hgt = dot(vec3(tx1.a, ty1.a, tz1.a), tbw) * 0.35 + dot(vec3(tx2.a, ty2.a, tz2.a), tbw) * 0.65;
        diffuseColor.rgb *= mix(0.8, 1.12, hgt) * mix(1.0, 0.9, vWet * (1.0 - hgt));
        float uw = uWaterY - vWP.y;
        if (uw > 0.0) diffuseColor.rgb *= mix(vec3(1.0), vec3(0.36, 0.62, 0.62), clamp(uw * 1.8 + 0.3, 0.0, 1.0));`)
      .replace('#include <roughnessmap_fragment>', `#include <roughnessmap_fragment>
        roughnessFactor = mix(0.93, 0.22, vWet) + 0.08 * hgt;`)
      .replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
        {
          float ns = mix(0.9, 0.55, vWet);
          vec3 tnX = vec3((tx1.xy*2.0-1.0)*ns + (tx2.xy*2.0-1.0)*0.55*ns, 1.0);
          vec3 tnY = vec3((ty1.xy*2.0-1.0)*ns + (ty2.xy*2.0-1.0)*0.55*ns, 1.0);
          vec3 tnZ = vec3((tz1.xy*2.0-1.0)*ns + (tz2.xy*2.0-1.0)*0.55*ns, 1.0);
          tnX = vec3(tnX.xy + wn.zy, abs(tnX.z) * wn.x);
          tnY = vec3(tnY.xy + wn.xz, abs(tnY.z) * wn.y);
          tnZ = vec3(tnZ.xy + wn.xy, abs(tnZ.z) * wn.z);
          vec3 pN = normalize(tnX.zyx * tbw.x + tnY.xzy * tbw.y + tnZ.xyz * tbw.z);
          normal = normalize((viewMatrix * vec4(pN, 0.0)).xyz);
        }`)
      .replace('#include <aomap_fragment>', `reflectedLight.indirectDiffuse *= vAO; reflectedLight.indirectSpecular *= vAO;`)
      .replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
        totalEmissiveRadiance += vBounce * diffuseColor.rgb * mix(0.55, 1.0, vAO);
        {
          float sd = length(vWP.xz - uSun.xz);
          if (uw > 0.0) totalEmissiveRadiance += diffuseColor.rgb * caust(vWP.xz * 0.23) * (0.04 + 0.7 * exp(-sd*sd*0.35)) * clamp(uw*4.0, 0.0, 1.0);
          float pd = length((vWP.xz - vec2(0.5, -0.3)) / vec2(6.6, 4.6));
          float down = clamp(-wn.y, 0.0, 1.0);
          if (pd < 1.6 && vWP.y > 1.0) totalEmissiveRadiance += vec3(0.55, 0.8, 0.78) * caust(vWP.xz * 0.16 + 3.0) * down * (1.0 - smoothstep(0.4, 1.3, pd)) * 0.06 * vAO;
        }`);
  };
  return m;
}

// ---------------------------------------------------------------------------
// Build
// ---------------------------------------------------------------------------
const statusEl = document.getElementById('status');
const tick = () => new Promise(r => setTimeout(r, 0));
const timings = {};

async function build() {
  let t0 = performance.now();
  statusEl.textContent = 'Carving limestone…'; await tick();
  buildGrid(); timings.grid = performance.now() - t0; t0 = performance.now();
  statusEl.textContent = 'Meshing…'; await tick();
  const { pos, idx } = surfaceNets(); timings.mesh = performance.now() - t0; t0 = performance.now();

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setIndex(new THREE.BufferAttribute(idx, 1));
  geo.computeVertexNormals();
  // check winding against field gradient; flip if needed
  {
    const nrm = geo.attributes.normal.array; const g = new THREE.Vector3(); let agree = 0;
    for (let v = 0; v < pos.length / 3; v += 97) { gradD(pos[v * 3], pos[v * 3 + 1], pos[v * 3 + 2], g); agree += Math.sign(g.x * nrm[v * 3] + g.y * nrm[v * 3 + 1] + g.z * nrm[v * 3 + 2]); }
    if (agree < 0) { for (let t = 0; t < idx.length; t += 3) { const a = idx[t + 1]; idx[t + 1] = idx[t + 2]; idx[t + 2] = a; } geo.index.needsUpdate = true; geo.computeVertexNormals(); }
  }
  statusEl.textContent = 'Baking light…'; await tick();
  const nv = pos.length / 3, nrm = geo.attributes.normal.array;
  const col = new Float32Array(nv * 3), ao = new Float32Array(nv), wet = new Float32Array(nv), bounce = new Float32Array(nv * 3);
  const b = [0, 0, 0];
  for (let v = 0; v < nv; v++) {
    const x = pos[v * 3], y = pos[v * 3 + 1], z = pos[v * 3 + 2];
    const nx = nrm[v * 3], ny = nrm[v * 3 + 1], nz = nrm[v * 3 + 2];
    const a = bakeAO(x, y, z, nx, ny, nz); ao[v] = a;
    bakeBounce(x, y, z, nx, ny, nz, b);
    bounce[v * 3] = b[0] + 0.028; bounce[v * 3 + 1] = b[1] + 0.027; bounce[v * 3 + 2] = b[2] + 0.03;
    // albedo
    const tilt = y + 0.05 * x - 0.03 * z + 0.25 * noise3(x * 0.15, 0, z * 0.15);
    const band = hash1(Math.floor(tilt / 0.82) + 40);
    let r = 0.80, g = 0.76, bl = 0.68;
    if (band < 0.33) { r = 0.72; g = 0.70; bl = 0.66; } else if (band > 0.75) { r = 0.84; g = 0.76; bl = 0.60; }
    const nn = noise3(x * 0.6, y * 0.6, z * 0.6);
    r += 0.04 * nn; g += 0.04 * nn; bl += 0.035 * nn;
    // iron / organic streaks running down walls
    const st = noise3(x * 2.2 + z * 0.3, y * 0.18, z * 2.2 - x * 0.3);
    const sk = smoothstep(0.35, 0.65, st) * (1 - Math.abs(ny)) * 0.45;
    r = lerp(r, 0.62, sk); g = lerp(g, 0.46, sk); bl = lerp(bl, 0.32, sk);
    const fh = floorH(x, z);
    // sediment floor
    const flo = smoothstep(0.6, 0.85, ny) * smoothstep(fh + 0.9, fh + 0.2, y);
    const sn = noise3(x * 1.1, 0, z * 1.1);
    r = lerp(r, 0.56 + 0.05 * sn, flo); g = lerp(g, 0.48 + 0.04 * sn, flo); bl = lerp(bl, 0.39 + 0.03 * sn, flo);
    // mud line at wall base
    const ml = lerp(0.82, 1, smoothstep(fh + 0.05, fh + 0.7, y)); r *= ml; g *= ml; bl *= ml;
    // white calcite on formations
    const fd = formSd(x, y, z); const fw = smoothstep(0.3, 0.0, fd) * 0.55;
    r = lerp(r, 0.9, fw); g = lerp(g, 0.88, fw); bl = lerp(bl, 0.82, fw);
    // wetness near the pool, under the shaft drips and on flowstone
    const pr = poolR(x, z);
    let w = smoothstep(1.55, 1.0, pr) * smoothstep(1.6, -0.1, y - WATER_Y);
    const sdist = Math.hypot(x - SUN_PATCH.x, z - SUN_PATCH.z); w = Math.max(w, smoothstep(2.6, 0.8, sdist) * smoothstep(1.0, 0.0, y - fh));
    w = Math.max(w, smoothstep(2.4, 0.6, Math.hypot(x - 1.9, z + 1.2)) * smoothstep(6.5, 9, y));
    w = Math.max(w, smoothstep(0.4, 0.0, fd) * smoothstep(0.3, 0.7, noise3(x * 0.5, y * 0.4, z * 0.5) + 0.5) * 0.85);
    w += 0.25 * smoothstep(0.2, 0.6, st) * (1 - Math.abs(ny)) * smoothstep(5, 1, Math.abs(pr - 1) * 4);
    if (y < WATER_Y + 0.02) w = 1;
    w = clamp(w, 0, 1); wet[v] = w;
    const dk = lerp(1, 0.42, w);
    r *= dk; g *= dk * 1.01; bl *= dk * 0.98;
    if (y < WATER_Y) { r = lerp(r, 0.56, 0.6); g = lerp(g, 0.58, 0.6); bl = lerp(bl, 0.52, 0.6); }
    col[v * 3] = r; col[v * 3 + 1] = g; col[v * 3 + 2] = bl;
  }
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  geo.setAttribute('aAO', new THREE.BufferAttribute(ao, 1));
  geo.setAttribute('aWet', new THREE.BufferAttribute(wet, 1));
  geo.setAttribute('aBounce', new THREE.BufferAttribute(bounce, 3));
  geo.computeBoundingSphere();
  timings.bake = performance.now() - t0;
  const rockMat = rockMaterial();
  const cave = new THREE.Mesh(geo, rockMat);
  cave.castShadow = cave.receiveShadow = true;
  scene.add(cave);
  timings.tris = idx.length / 3;

  statusEl.textContent = 'Placing details…'; await tick();
  addStalactites(rockMat);
  addBoulders(rockMat);
  addWater();
  addLights();
  const before = new Set(scene.children);
  addProps();
  bakePropLight(scene.children.filter(o => !before.has(o)));
  renderer.shadowMap.needsUpdate = true;
  renderer.compile(scene, camera);
  statusEl.textContent = 'Ready — click to explore';
  ready = true;
}

// ---------------------------------------------------------------------------
// Ground queries
// ---------------------------------------------------------------------------
function groundY(x, z, yTop, yBot) {
  if (sampleD(x, yTop, z) <= 0) return null;
  for (let y = yTop - 0.1; y >= yBot; y -= 0.1) {
    if (sampleD(x, y, z) <= 0) {
      let lo = y, hi = y + 0.1;
      for (let i = 0; i < 7; i++) { const m = (lo + hi) / 2; if (sampleD(x, m, z) > 0) hi = m; else lo = m; }
      return hi;
    }
  }
  return -Infinity;
}
const groundAt = (x, z, from = 8) => { const g = groundY(x, z, from, -2); return g === null || g === -Infinity ? floorH(x, z) : g; };

// ---------------------------------------------------------------------------
// Stalactite straws (instanced)
// ---------------------------------------------------------------------------
function addStalactites(mat) {
  const g = new THREE.CylinderGeometry(1, 0.1, 1, 7, 4, true);
  g.translate(0, -0.5, 0);
  const p = g.attributes.position;
  for (let i = 0; i < p.count; i++) { const y = p.getY(i); const s = 1 + 0.18 * noise3(p.getX(i) * 3, y * 4, p.getZ(i) * 3); p.setX(i, p.getX(i) * s); p.setZ(i, p.getZ(i) * s); }
  g.computeVertexNormals();
  const n = p.count, col = new Float32Array(n * 3), ao = new Float32Array(n), wet = new Float32Array(n);
  for (let i = 0; i < n; i++) { const t = -p.getY(i); col[i * 3] = 0.86 - 0.1 * t; col[i * 3 + 1] = 0.83 - 0.1 * t; col[i * 3 + 2] = 0.76 - 0.08 * t; ao[i] = lerp(0.55, 1, t); wet[i] = smoothstep(0.4, 1, t); }
  g.setAttribute('color', new THREE.BufferAttribute(col, 3)); g.setAttribute('aAO', new THREE.BufferAttribute(ao, 1)); g.setAttribute('aWet', new THREE.BufferAttribute(wet, 1));
  const COUNT = 320; const bAttr = new Float32Array(COUNT * 3);
  const mesh = new THREE.InstancedMesh(g, mat, COUNT);
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), s = new THREE.Vector3(), pp = new THREE.Vector3(), gr = new THREE.Vector3(), bb = [0, 0, 0];
  let placed = 0, tries = 0;
  while (placed < COUNT && tries < 20000) {
    tries++;
    const x = GX0 + 1 + rand() * (NX * STEP - 2), z = GZ0 + 1 + rand() * (NZ * STEP - 2);
    const f = floorH(x, z) + 2.6;
    if (sampleD(x, f, z) <= 0.3) continue;
    let y = f; while (y < 14 && sampleD(x, y, z) > 0) y += 0.06;
    if (y >= 13.5) continue;
    gradD(x, y - 0.1, z, gr); if (gr.y > -0.55) continue;
    // cluster: prefer near pool / arch / landing
    const cl = Math.max(smoothstep(9, 3, Math.hypot(x - 0.5, z)), smoothstep(5, 1, Math.hypot(x - 12, z)), smoothstep(5, 1, Math.hypot(x - 20, z - 1)), 0.25);
    if (rand() > cl) continue;
    const len = 0.12 + Math.pow(rand(), 2.2) * 0.85, rad = 0.025 + len * 0.07 + rand() * 0.02;
    pp.set(x, y + 0.06, z); q.setFromAxisAngle(new THREE.Vector3(rand() - 0.5, 0, rand() - 0.5).normalize(), (rand() - 0.5) * 0.12);
    s.set(rad, len, rad); m.compose(pp, q, s); mesh.setMatrixAt(placed, m);
    bakeBounce(x, y - len * 0.5, z, 0, -1, 0, bb); bAttr[placed * 3] = bb[0] + 0.05; bAttr[placed * 3 + 1] = bb[1] + 0.05; bAttr[placed * 3 + 2] = bb[2] + 0.05;
    placed++;
  }
  mesh.count = placed;
  g.setAttribute('aBounce', new THREE.InstancedBufferAttribute(bAttr, 3));
  mesh.castShadow = true; mesh.receiveShadow = true; mesh.frustumCulled = false;
  scene.add(mesh);
}

function addBoulders(mat) {
  const g = new THREE.IcosahedronGeometry(1, 2);
  const p = g.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), y = p.getY(i), z = p.getZ(i);
    let s = 1 + 0.28 * noise3(x * 1.3 + 5, y * 1.3, z * 1.3) + 0.1 * noise3(x * 3, y * 3 + 9, z * 3);
    // flatten into slab-like breakdown blocks along bedding
    p.setXYZ(i, x * s, Math.max(y * s * 0.62, -0.25), z * s * 0.9);
  }
  g.computeVertexNormals();
  const n = p.count, col = new Float32Array(n * 3), ao = new Float32Array(n), wet = new Float32Array(n);
  for (let i = 0; i < n; i++) { const y = p.getY(i); const t = smoothstep(-0.3, 0.5, y); col[i * 3] = lerp(0.5, 0.74, t); col[i * 3 + 1] = lerp(0.44, 0.7, t); col[i * 3 + 2] = lerp(0.36, 0.62, t); ao[i] = lerp(0.35, 1, t); wet[i] = 0; }
  g.setAttribute('color', new THREE.BufferAttribute(col, 3)); g.setAttribute('aAO', new THREE.BufferAttribute(ao, 1)); g.setAttribute('aWet', new THREE.BufferAttribute(wet, 1));
  const COUNT = 90, bAttr = new Float32Array(COUNT * 3), bb = [0, 0, 0];
  const mesh = new THREE.InstancedMesh(g, mat, COUNT);
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), sc = new THREE.Vector3(), pp = new THREE.Vector3(), e = new THREE.Euler();
  let placed = 0, tries = 0;
  while (placed < COUNT && tries < 30000) {
    tries++;
    const x = -18.5 + rand() * 43, z = -10 + rand() * 20;
    const gy = groundY(x, z, floorH(x, z) + 1.0, floorH(x, z) - 1.5); if (gy === null || gy === -Infinity) continue;
    if (gy < WATER_Y + 0.05) continue;
    const cl = sampleD(x, gy + 0.9, z); if (cl < 0.2 || cl > 1.25) continue; // hug the walls
    if (Math.abs(x - 14) < 4.2 && Math.abs(z) < 3.0) continue;            // keep arch & ramp clear
    if (x > -16 && x < -7.5) continue;                                        // keep entrance passage clear
    if (x > -9 && x < 10.5 && poolR(x, z) < 1.9) continue;                   // keep the pool-side path clear
    if (Math.hypot(x - 19.6, z - 0.2) < 3.0) continue;                      // keep landing centre clear
    const sz = 0.15 + Math.pow(rand(), 2.5) * 0.6;
    if (cl < sz * 0.5) continue;
    pp.set(x, gy + sz * 0.08, z); e.set((rand() - 0.5) * 0.3, rand() * 6.28, (rand() - 0.5) * 0.3); q.setFromEuler(e); sc.set(sz, sz, sz * (0.7 + rand() * 0.5));
    m.compose(pp, q, sc); mesh.setMatrixAt(placed, m);
    bakeBounce(x, gy + sz * 0.7, z, 0, 1, 0, bb); bAttr[placed * 3] = bb[0] * 0.55 + 0.025; bAttr[placed * 3 + 1] = bb[1] * 0.55 + 0.025; bAttr[placed * 3 + 2] = bb[2] * 0.55 + 0.027;
    if (sz > 0.3) colliders.push({ x, z, r: sz * 0.7 });
    placed++;
  }
  mesh.count = placed; timings.boulders = placed;
  g.setAttribute('aBounce', new THREE.InstancedBufferAttribute(bAttr, 3));
  mesh.castShadow = mesh.receiveShadow = true;
  scene.add(mesh);
}

// ---------------------------------------------------------------------------
// Water
// ---------------------------------------------------------------------------
function addWater() {
  const W = 96, H = 72, x0 = POOL.cx - 7.6, z0 = POOL.cz - 5.6, sx = 15.2 / (W - 1), sz = 11.2 / (H - 1);
  const d = new Uint8Array(W * H);
  for (let j = 0; j < H; j++) for (let i = 0; i < W; i++) {
    const x = x0 + i * sx, z = z0 + j * sz; const g = groundY(x, z, 1.2, -1.6);
    const depth = g === null ? 0 : (g === -Infinity ? 1 : WATER_Y - g);
    d[j * W + i] = clamp(depth / 1.0, 0, 1) * 255;
  }
  const dt = new THREE.DataTexture(d, W, H, THREE.RedFormat); dt.magFilter = dt.minFilter = THREE.LinearFilter; dt.needsUpdate = true;
  const geo = new THREE.PlaneGeometry(15.2, 11.2, 1, 1); geo.rotateX(-Math.PI / 2); geo.translate(POOL.cx, WATER_Y, POOL.cz);
  const mat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, fog: true,
    uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.fog, { uTime: { value: 0 }, uDepth: { value: dt }, uDetail: { value: null }, uBox: { value: new THREE.Vector4(x0, z0, 15.2, 11.2) }, uOpen: { value: SHAFT_OPEN }, uSun: { value: SUN_PATCH } }]),
    vertexShader: `varying vec3 vWP; #include <fog_pars_vertex>
      void main(){ vec4 wp = modelMatrix*vec4(position,1.0); vWP = wp.xyz; vec4 mvPosition = viewMatrix*wp; gl_Position = projectionMatrix*mvPosition; #include <fog_vertex> }`.replace(/#include <(\w+)>/g, '\n#include <$1>\n'),
    fragmentShader: `uniform float uTime; uniform sampler2D uDepth; uniform sampler2D uDetail; uniform vec4 uBox; uniform vec3 uOpen; uniform vec3 uSun; varying vec3 vWP;
      #include <fog_pars_fragment>
      float ring(vec2 p, vec2 c, float t0){ float t = fract(uTime*0.28 + t0); float r = length(p-c); float w = r - t*2.2; return sin(w*26.0) * exp(-w*w*40.0) * (1.0-t) * smoothstep(0.0, 0.15, t); }
      void main(){
        vec2 uv = (vWP.xz - uBox.xy) / uBox.zw;
        float depth = texture2D(uDepth, uv).r;
        if (depth < 0.004) discard;
        vec2 p = vWP.xz;
        vec2 n2 = (texture2D(uDetail, p*0.22 + vec2(uTime*0.006, uTime*0.004)).xy - 0.5) * 0.10 + (texture2D(uDetail, p*0.6 - vec2(uTime*0.009, -uTime*0.005)).xy - 0.5) * 0.05;
        float rg = ring(p, vec2(1.9,-1.2), 0.0) + ring(p, vec2(0.6,1.4), 0.43) + ring(p, vec2(3.4,-2.6), 0.71);
        vec2 rgrad = vec2(dFdx(rg), dFdy(rg));
        vec3 N = normalize(vec3(n2.x + rg*0.03, 1.0, n2.y + rg*0.03));
        vec3 V = normalize(cameraPosition - vWP);
        float fres = 0.02 + 0.98 * pow(1.0 - max(dot(N, V), 0.0), 5.0);
        vec3 R = reflect(-V, N);
        // fake reflected environment: dim warm cave, bright skylight opening, sunlit patch glow
        vec3 env = mix(vec3(0.035,0.034,0.03), vec3(0.11,0.1,0.085), clamp(R.y*1.5,0.0,1.0));
        vec3 toOpen = normalize(uOpen - vWP);
        env += vec3(1.6,1.8,2.1) * pow(max(dot(R, toOpen),0.0), 900.0) * 6.0;
        env += vec3(0.5,0.55,0.6) * pow(max(dot(R, toOpen),0.0), 30.0) * 0.4;
        float sd = length(vWP.xz - uSun.xz);
        vec3 deep = vec3(0.02, 0.07, 0.075);
        float dd = clamp(depth * 1.6, 0.0, 1.0);
        float alpha = mix(0.12, 0.58, dd) ;
        vec3 col = deep * dd;
        col = mix(col, env, fres);
        col += vec3(1.0,0.92,0.75) * exp(-sd*sd*0.6) * 0.08 * (1.0 - dd*0.5);
        alpha = clamp(alpha + fres * 0.7, 0.0, 0.95) * smoothstep(0.0, 0.035, depth);
        // shoreline meniscus glint
        col += vec3(0.25,0.28,0.26) * smoothstep(0.06, 0.0, depth) * 0.6;
        gl_FragColor = vec4(col, alpha);
        #include <fog_fragment>
      }`,
  });
  mat.uniforms.uDetail = U.uDetail;
  mat.uniforms.uTime = U.uTime;
  const water = new THREE.Mesh(geo, mat); water.renderOrder = 2;
  scene.add(water);
}

// ---------------------------------------------------------------------------
// Lights, light shaft, dust
// ---------------------------------------------------------------------------
let headlamp;
function addLights() {
  const sunPos = new THREE.Vector3(...SHAFT_A).addScaledVector(SHAFT_DIR, 26);
  const sun = new THREE.SpotLight(0xfff1dc, 1.9, 0, 0.2, 0.3, 0);
  sun.position.copy(sunPos);
  sun.target.position.set(...SHAFT_A).addScaledVector(SHAFT_DIR, -9.0);
  sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048); sun.shadow.camera.near = 12; sun.shadow.camera.far = 45;
  sun.shadow.bias = -0.0004; sun.shadow.normalBias = 0.03;
  scene.add(sun, sun.target);
  const hemi = new THREE.HemisphereLight(0x8899aa, 0x3a3026, 0.06); scene.add(hemi);
  const glint = new THREE.PointLight(0xfff0d8, 0.7, 9, 2); glint.position.set(0.6, 3.2, 2.0); scene.add(glint);
  headlamp = new THREE.SpotLight(0xffe8c8, 0, 22, 0.55, 0.6, 1.4);
  headlamp.position.set(0.1, -0.1, 0); headlamp.target.position.set(0, 0, -1);
  camera.add(headlamp, headlamp.target); scene.add(camera);

  // light shaft volume
  const top = new THREE.Vector3(...SHAFT_A).addScaledVector(SHAFT_DIR, 3.0);
  const bot = new THREE.Vector3(...SHAFT_A).addScaledVector(SHAFT_DIR, -8.6);
  const len = top.distanceTo(bot);
  const cg = new THREE.CylinderGeometry(0.75, 1.15, len, 24, 1, true);
  const beam = new THREE.Mesh(cg, new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
    uniforms: { uTime: U.uTime },
    vertexShader: `varying vec3 vN; varying vec3 vV; varying float vY; void main(){ vY = uv.y; vec4 wp = modelMatrix*vec4(position,1.0); vN = normalize(mat3(modelMatrix)*normal); vV = normalize(cameraPosition - wp.xyz); gl_Position = projectionMatrix*viewMatrix*wp; }`,
    fragmentShader: `uniform float uTime; varying vec3 vN; varying vec3 vV; varying float vY; void main(){ float e = abs(dot(normalize(vN), normalize(vV))); float a = pow(e, 2.2) * 0.075 * smoothstep(0.0, 0.25, vY) * smoothstep(1.0, 0.72, vY); a *= 0.85 + 0.15*sin(vY*20.0 + uTime*0.3); gl_FragColor = vec4(vec3(1.0,0.95,0.84)*a, 1.0); }`,
  }));
  beam.position.copy(top).add(bot).multiplyScalar(0.5);
  beam.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), SHAFT_DIR);
  beam.renderOrder = 3; scene.add(beam);
  // daylight glare at the end of the entrance crawl
  const glare = new THREE.Mesh(new THREE.CircleGeometry(2.2, 32), new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, fog: false,
    vertexShader: `varying vec2 vU; void main(){ vU = uv; gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
    fragmentShader: `varying vec2 vU; void main(){ float d = length(vU-0.5)*2.0; vec3 c = mix(vec3(1.0,0.99,0.95), vec3(0.75,0.82,0.9), smoothstep(0.0,0.8,d)); gl_FragColor = vec4(c, 1.0); }`,
  }));
  glare.position.set(-20.85, 2.2, 2.3); glare.rotation.y = Math.PI / 2; scene.add(glare);
  // dust motes
  const N = 450, dp = new Float32Array(N * 3), seeds = new Float32Array(N);
  for (let i = 0; i < N; i++) { const t = rand(); const a = rand() * 6.283, r = Math.sqrt(rand()) * lerp(1.1, 0.7, t); dp[i * 3] = Math.cos(a) * r; dp[i * 3 + 1] = (t - 0.5) * len; dp[i * 3 + 2] = Math.sin(a) * r; seeds[i] = rand(); }
  const dg = new THREE.BufferGeometry(); dg.setAttribute('position', new THREE.BufferAttribute(dp, 3)); dg.setAttribute('seed', new THREE.BufferAttribute(seeds, 1));
  const dust = new THREE.Points(dg, new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, uniforms: { uTime: U.uTime, uLen: { value: len } },
    vertexShader: `attribute float seed; uniform float uTime; uniform float uLen; varying float vA; void main(){ vec3 p = position; float t = uTime*0.05*(0.4+seed); p.y = mod(p.y + uLen*0.5 - t*1.5, uLen) - uLen*0.5; p.x += sin(t*3.0+seed*40.0)*0.15; p.z += cos(t*2.3+seed*20.0)*0.15; vec4 mv = modelViewMatrix*vec4(p,1.0); gl_Position = projectionMatrix*mv; gl_PointSize = min((0.8 + seed*1.4) * 9.0 / -mv.z, 5.0); vA = smoothstep(-uLen*0.5, -uLen*0.3, p.y) * smoothstep(uLen*0.5, uLen*0.2, p.y) * (0.5+0.5*sin(uTime*0.7+seed*30.0)); }`,
    fragmentShader: `varying float vA; void main(){ float d = length(gl_PointCoord-0.5); gl_FragColor = vec4(vec3(1.0,0.95,0.85)*smoothstep(0.5,0.1,d)*vA*0.55, 1.0); }`,
  }));
  dust.position.copy(beam.position); dust.quaternion.copy(beam.quaternion); dust.renderOrder = 4; dust.frustumCulled = false;
  scene.add(dust);
}

// ---------------------------------------------------------------------------
// Props: rope handrail, survey station, work lamp, crate, markers
// ---------------------------------------------------------------------------
const colliders = []; // 2D circles {x,z,r}
function canvasTex(w, h, draw) { const c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d'), w, h); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; return t; }
function addProps() {
  const iron = new THREE.MeshStandardMaterial({ color: 0x3b2c22, roughness: 0.75, metalness: 0.6 });
  const rope = new THREE.MeshStandardMaterial({ color: 0xb59a6a, roughness: 0.95 });
  const wood = new THREE.MeshStandardMaterial({ color: 0x6b4f33, roughness: 0.85 });
  const orange = new THREE.MeshStandardMaterial({ color: 0xff6a1a, roughness: 0.6, emissive: 0x2a0d00 });
  const postGeo = new THREE.CylinderGeometry(0.018, 0.022, 1.0, 8); postGeo.translate(0, 0.5, 0);
  const eyeGeo = new THREE.TorusGeometry(0.035, 0.008, 6, 12);

  function ropeLine(points) {
    const posts = [];
    for (const [x, z] of points) {
      const y = groundAt(x, z, 3.5);
      posts.push(new THREE.Vector3(x, y, z));
      const p = new THREE.Mesh(postGeo, iron); p.position.set(x, y - 0.12, z); p.rotation.z = (rand() - 0.5) * 0.06; p.castShadow = true; scene.add(p);
      const e = new THREE.Mesh(eyeGeo, iron); e.position.set(x, y + 0.86, z); e.rotation.y = rand() * 3; scene.add(e);
    }
    for (let i = 0; i < posts.length - 1; i++) {
      const a = posts[i].clone(), b = posts[i + 1].clone(); a.y += 0.86; b.y += 0.86;
      const pts = []; for (let s = 0; s <= 12; s++) { const t = s / 12; const p = a.clone().lerp(b, t); p.y -= Math.sin(t * Math.PI) * 0.09 * a.distanceTo(b) / 2; pts.push(p); }
      const tg = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 16, 0.011, 5, false);
      const m = new THREE.Mesh(tg, rope); m.castShadow = true; scene.add(m);
    }
  }
  // north shore handrail (runs through the sunlit patch) – keep posts on dry ground
  const shore = [];
  for (let a = 0.18 * Math.PI; a <= 0.88 * Math.PI; a += 0.095 * Math.PI) {
    let k = 1.1, x, z;
    for (let it = 0; it < 12; it++) { x = POOL.cx + POOL.rx * k * Math.cos(a); z = POOL.cz + POOL.rz * k * Math.sin(a); if (groundAt(x, z, 3) > WATER_Y + 0.08) break; k += 0.03; }
    shore.push([x, z]);
  }
  ropeLine(shore);
  // ramp handrail through the arch up to the landing
  const ramp = []; for (let x = 11.8; x <= 18.2; x += 1.6) ramp.push([x, -2.3 + 0.15 * Math.sin(x)]);
  ropeLine(ramp);
  // landing edge rope
  ropeLine([[17.6, 2.6], [18.9, 3.4], [20.3, 3.6]]);

  // survey station on the landing: tripod + instrument + brass benchmark disc
  const sx = 19.4, sz = -0.9, sy = groundAt(sx, sz, 4);
  const tri = new THREE.Group(); tri.position.set(sx, sy, sz);
  const legGeo = new THREE.CylinderGeometry(0.016, 0.022, 1.45, 6); legGeo.translate(0, -0.72, 0);
  for (let i = 0; i < 3; i++) { const l = new THREE.Mesh(legGeo, wood); const a = i * 2.094 + 0.4; l.position.set(0, 1.38, 0); l.rotation.set(Math.cos(a) * 0.32, 0, Math.sin(a) * -0.32); l.rotation.order = 'YXZ'; l.rotation.y = a; l.rotation.x = 0.33; l.castShadow = true; tri.add(l); }
  const headM = new THREE.MeshStandardMaterial({ color: 0xcaa33a, roughness: 0.45, metalness: 0.3 });
  const plate = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.03, 16), iron); plate.position.y = 1.39; tri.add(plate);
  const box = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.17, 0.12), headM); box.position.y = 1.5; tri.add(box);
  const scope = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.032, 0.24, 12), iron); scope.rotation.x = Math.PI / 2 - 0.12; scope.position.set(0, 1.62, 0.02); tri.add(scope);
  tri.rotation.y = 2.2; scene.add(tri); colliders.push({ x: sx, z: sz, r: 0.55 });
  const discTex = canvasTex(128, 128, (c, w, h) => { const g = c.createRadialGradient(64, 64, 10, 64, 64, 64); g.addColorStop(0, '#d8b45c'); g.addColorStop(1, '#8a6a2a'); c.fillStyle = g; c.beginPath(); c.arc(64, 64, 63, 0, 7); c.fill(); c.strokeStyle = '#5a4214'; c.lineWidth = 4; c.beginPath(); c.arc(64, 64, 52, 0, 7); c.stroke(); c.fillStyle = '#3c2a0c'; c.font = 'bold 22px monospace'; c.textAlign = 'center'; c.fillText('SURVEY', 64, 50); c.fillText('STN 7', 64, 78); c.beginPath(); c.moveTo(64, 86); c.lineTo(58, 100); c.lineTo(70, 100); c.fill(); });
  const disc = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.065, 0.015, 24), [new THREE.MeshStandardMaterial({ color: 0x8a6a2a, metalness: 0.8, roughness: 0.4 }), new THREE.MeshStandardMaterial({ map: discTex, metalness: 0.7, roughness: 0.35 }), iron]);
  const dX = 18.3, dZ = 0.4; disc.position.set(dX, groundAt(dX, dZ, 4) + 0.004, dZ); scene.add(disc);
  // red painted station mark on the wall near the arch & a painted arrow at the recess
  const paint = (text, x, y, z, ry, s = 0.5) => { const t = canvasTex(256, 128, (c) => { c.fillStyle = 'rgba(0,0,0,0)'; c.clearRect(0, 0, 256, 128); c.fillStyle = 'rgba(160,30,20,0.85)'; c.font = 'bold 54px sans-serif'; c.fillText(text, 14, 82); }); const m = new THREE.Mesh(new THREE.PlaneGeometry(s, s / 2), new THREE.MeshStandardMaterial({ map: t, transparent: true, roughness: 0.9, polygonOffset: true, polygonOffsetFactor: -2 })); m.position.set(x, y, z); m.rotation.y = ry; scene.add(m); return m; };
  placeOnWall('S6 ▲', 11.3, 1.55, 2.6, 0.55, paint);
  placeOnWall('→ 7', -13.2, 1.9, -2.0, 0.5, paint);

  // battery work lamp left on the landing (its light is baked into the rock)
  const lx = 21.2, lz = 1.3, ly = groundAt(lx, lz, 4);
  const lamp = new THREE.Group(); lamp.position.set(lx, ly, lz); lamp.rotation.y = -1.9;
  const body = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.2, 0.16), new THREE.MeshStandardMaterial({ color: 0x2f4a32, roughness: 0.7 })); body.position.y = 0.1; lamp.add(body);
  const lens = new THREE.Mesh(new THREE.CircleGeometry(0.07, 20), new THREE.MeshStandardMaterial({ color: 0x000000, emissive: 0xffc27a, emissiveIntensity: 6 })); lens.position.set(0, 0.11, 0.081); lamp.add(lens);
  const handle = new THREE.Mesh(new THREE.TorusGeometry(0.07, 0.012, 6, 14, Math.PI), iron); handle.position.y = 0.2; lamp.add(handle);
  scene.add(lamp);
  // coiled rope on the landing
  const coil = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.035, 8, 24), rope); const cx = 20.6, cz = -2.2; coil.position.set(cx, groundAt(cx, cz, 4) + 0.03, cz); coil.rotation.x = Math.PI / 2; coil.scale.z = 0.6; scene.add(coil);
  const coil2 = coil.clone(); coil2.position.y += 0.06; coil2.scale.set(0.85, 0.85, 0.6); scene.add(coil2);

  // supply crate in the entrance recess
  const crateTex = canvasTex(256, 256, (c, w, h) => { c.fillStyle = '#7a5a3a'; c.fillRect(0, 0, w, h); for (let i = 0; i < 4; i++) { c.fillStyle = i % 2 ? '#6e5032' : '#82603e'; c.fillRect(0, i * 64 + 2, w, 60); c.fillStyle = 'rgba(0,0,0,0.25)'; c.fillRect(0, i * 64, w, 3); } c.strokeStyle = '#3d2a18'; c.lineWidth = 10; c.strokeRect(5, 5, w - 10, h - 10); c.fillStyle = 'rgba(25,20,15,0.75)'; c.font = 'bold 30px monospace'; c.fillText('CAVE SURVEY', 22, 120); c.fillText('KEEP DRY', 52, 160); });
  const crate = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.48, 0.5), new THREE.MeshStandardMaterial({ map: crateTex, roughness: 0.85 }));
  const kx = -16.9, kz = 2.6; crate.position.set(kx, groundAt(kx, kz, 4) + 0.22, kz); crate.rotation.y = 0.35; crate.castShadow = true; scene.add(crate); colliders.push({ x: kx, z: kz, r: 0.5 });
  const helmet = new THREE.Mesh(new THREE.SphereGeometry(0.13, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshStandardMaterial({ color: 0xd8a21a, roughness: 0.45 })); helmet.position.set(kx + 0.1, crate.position.y + 0.24, kz - 0.05); helmet.scale.y = 0.85; scene.add(helmet);

  // flagging stakes along the route
  const stake = new THREE.CylinderGeometry(0.012, 0.012, 0.45, 6); stake.translate(0, 0.22, 0);
  const tape = new THREE.PlaneGeometry(0.035, 0.22); tape.translate(0.02, -0.11, 0);
  for (const [x, z] of [[-11.5, -1.6], [-7.6, -3.4], [-4, -5.4], [2.5, -5.6], [7.6, -3.4], [9.6, 1.8], [-6.8, 3.0]]) {
    const y = groundAt(x, z, 4); const s = new THREE.Mesh(stake, wood); s.position.set(x, y, z); scene.add(s);
    const t = new THREE.Mesh(tape, orange); t.position.set(x, y + 0.44, z); t.rotation.set(0, rand() * 6, 0.25); t.material.side = THREE.DoubleSide; scene.add(t);
  }
}
function bakePropLight(objs) {
  const b = [0, 0, 0], wp = new THREE.Vector3();
  for (const root of objs) root.traverse((o) => {
    if (!o.isMesh || o.material.emissiveIntensity > 1) return;
    o.getWorldPosition(wp);
    // omni-directional sample: average of a few normals
    let r = 0, g = 0, bl = 0;
    for (const [nx, ny, nz] of [[0, 1, 0], [1, 0, 0], [-1, 0, 0], [0, 0, 1], [0, 0, -1]]) { bakeBounce(wp.x, wp.y + 0.3, wp.z, nx, ny, nz, b); r += b[0]; g += b[1]; bl += b[2]; }
    const mats = Array.isArray(o.material) ? o.material : [o.material];
    o.material = mats.map((m) => {
      const c = m.clone(); const base = m.map ? new THREE.Color(0.75, 0.75, 0.75) : m.color;
      c.emissive = new THREE.Color(base.r * (r / 5 + 0.03) * 1.6, base.g * (g / 5 + 0.03) * 1.6, base.b * (bl / 5 + 0.03) * 1.6);
      if (m.map) c.emissiveMap = m.map;
      return c;
    });
    if (o.material.length === 1) o.material = o.material[0];
  });
}
function placeOnWall(text, x, y, z, s, paint) {
  // march horizontally toward the nearest wall using the gradient and stick a decal there
  const g = new THREE.Vector3();
  let px = x, pz = z;
  for (let i = 0; i < 40; i++) { const d = sampleD(px, y, pz); if (d < 0.02) break; gradD(px, y, pz, g); px -= g.x * Math.max(d, 0.02); pz -= g.z * Math.max(d, 0.02); }
  gradD(px, y, pz, g);
  const m = paint(text, px + g.x * 0.03, y, pz + g.z * 0.03, Math.atan2(g.x, g.z), s);
  return m;
}

// ---------------------------------------------------------------------------
// Player controller
// ---------------------------------------------------------------------------
const EYE = 1.62, RAD = 0.3;
const player = { x: 0, y: 0, z: 0, vy: 0, vx: 0, vz: 0, yaw: 0, pitch: 0, eyeY: 0 };
const VIEWS = [
  { x: -16.6, z: 0.6, yaw: -Math.PI / 2 - 0.05, pitch: -0.04 },   // recess, facing chamber
  { x: -8.9, z: -0.8, yaw: -Math.PI / 2 + 0.05, pitch: -0.12 },   // west shore
  { x: -0.9, z: 5.7, yaw: -0.15, pitch: -0.25 },          // north shore in the sun patch
  { x: 1.5, z: -5.9, yaw: Math.PI + 0.2, pitch: -0.2 },                       // south shore
  { x: 12.3, z: 0.3, yaw: Math.PI / 2, pitch: 0.05 },              // beneath the arch, looking back
  { x: 19.2, z: 0.6, yaw: Math.PI / 2 - 0.05, pitch: -0.12 },      // landing, look back
];
function teleport(i) {
  const v = VIEWS[i]; player.x = v.x; player.z = v.z; player.y = groundAt(v.x, v.z, floorH(v.x, v.z) + 2.0);
  player.eyeY = player.y + EYE; player.vy = player.vx = player.vz = 0; player.yaw = v.yaw; player.pitch = v.pitch;
}
const keys = new Set();
addEventListener('keydown', (e) => {
  keys.add(e.code);
  if (e.code === 'KeyR') teleport(0);
  if (e.code === 'KeyF') headlamp.intensity = headlamp.intensity > 0 ? 0 : 14;
  if (e.code === 'KeyH') { hudOn = !hudOn; hud.style.display = hudOn ? '' : 'none'; }
  const n = parseInt(e.key); if (n >= 1 && n <= 6) teleport(n - 1);
  if (e.code.startsWith('Arrow') || e.code === 'Space') e.preventDefault();
});
addEventListener('keyup', (e) => keys.delete(e.code));
addEventListener('blur', () => keys.clear());
const overlay = document.getElementById('overlay');
overlay.addEventListener('click', () => { if (ready) renderer.domElement.requestPointerLock(); });
renderer.domElement.addEventListener('click', () => { if (ready) renderer.domElement.requestPointerLock(); });
document.addEventListener('pointerlockchange', () => { overlay.style.display = document.pointerLockElement ? 'none' : 'flex'; });
addEventListener('mousemove', (e) => {
  if (document.pointerLockElement !== renderer.domElement) return;
  player.yaw -= e.movementX * 0.0022; player.pitch = clamp(player.pitch - e.movementY * 0.0022, -1.45, 1.45);
});

const tmpG = new THREE.Vector3();
function bodyClear(x, feet, z) {
  for (const h of [0.55, 1.05, 1.55]) if (sampleD(x, feet + h, z) < RAD) return false;
  for (const c of colliders) if (Math.hypot(x - c.x, z - c.z) < c.r + RAD) return false;
  return true;
}
function tryMove(dx, dz) {
  const nx = player.x + dx, nz = player.z + dz;
  if (nx < -19.3) return false; // daylight crawl is too low to enter
  const g = groundY(nx, nz, player.y + 0.5, player.y - 2.5);
  if (g === null || g === -Infinity) return false;
  if (g > player.y + 0.42) return false;
  if (g < WATER_Y + 0.07) return false; // water edge is a boundary: stay dry
  if (!bodyClear(nx, Math.max(g, player.y), nz)) return false;
  player.x = nx; player.z = nz;
  if (g >= player.y) { player.y = g; player.vy = 0; }
  return true;
}
function updatePlayer(dt) {
  let f = 0, s = 0;
  if (keys.has('KeyW')) f += 1; if (keys.has('KeyS')) f -= 1; if (keys.has('KeyD')) s += 1; if (keys.has('KeyA')) s -= 1;
  if (keys.has('ArrowLeft')) player.yaw += 1.8 * dt; if (keys.has('ArrowRight')) player.yaw -= 1.8 * dt;
  if (keys.has('ArrowUp')) player.pitch = clamp(player.pitch + 1.2 * dt, -1.45, 1.45); if (keys.has('ArrowDown')) player.pitch = clamp(player.pitch - 1.2 * dt, -1.45, 1.45);
  const speed = keys.has('ShiftLeft') || keys.has('ShiftRight') ? 4.2 : 2.1;
  const l = Math.hypot(f, s) || 1;
  const sy = Math.sin(player.yaw), cy = Math.cos(player.yaw);
  const tx = (-sy * f + cy * s) / l * speed, tz = (-cy * f - sy * s) / l * speed;
  const k = 1 - Math.exp(-dt * 12);
  player.vx += (tx - player.vx) * k; player.vz += (tz - player.vz) * k;
  const steps = Math.max(1, Math.ceil(Math.hypot(player.vx, player.vz) * dt / 0.12));
  for (let i = 0; i < steps; i++) {
    const dx = player.vx * dt / steps, dz = player.vz * dt / steps;
    if (dx === 0 && dz === 0) break;
    if (tryMove(dx, dz)) continue;
    // slide along the wall
    gradD(player.x + dx, player.y + 1.0, player.z + dz, tmpG); const hn = Math.hypot(tmpG.x, tmpG.z);
    if (hn > 0.1) { const nx = tmpG.x / hn, nz = tmpG.z / hn; const dot = dx * nx + dz * nz; if (dot < 0 && tryMove(dx - nx * dot, dz - nz * dot)) continue; }
    if (!tryMove(dx, 0)) tryMove(0, dz);
  }
  // gravity / ground follow
  const g = groundY(player.x, player.z, player.y + 0.4, player.y - 3);
  if (g !== null && g !== -Infinity) {
    if (g < player.y - 0.01) { player.vy -= 9.8 * dt; player.y = Math.max(g, player.y + player.vy * dt); if (player.y === g) player.vy = 0; }
    else { player.y = g; player.vy = 0; }
  } else if (g === -Infinity) { player.vy -= 9.8 * dt; player.y += player.vy * dt; }
  if (player.y < -5) teleport(0);
  const target = player.y + EYE;
  player.eyeY += (target - player.eyeY) * (1 - Math.exp(-dt * (target > player.eyeY ? 14 : 20)));
  camera.position.set(player.x, player.eyeY, player.z);
  camera.rotation.set(player.pitch, player.yaw, 0);
}

// ---------------------------------------------------------------------------
// Loop + HUD
// ---------------------------------------------------------------------------
const hud = document.getElementById('hud'); let hudOn = true; let ready = false;
const frameTimes = []; let last = performance.now(), hudT = 0;
function frame() {
  const now = performance.now(); const rawDt = (now - last) / 1000; last = now;
  const dt = Math.min(rawDt, 0.05);
  if (ready) {
    U.uTime.value += dt;
    updatePlayer(dt);
    renderer.render(scene, camera);
    frameTimes.push(rawDt * 1000); if (frameTimes.length > 240) frameTimes.shift();
    hudT += rawDt;
    if (hudOn && hudT > 0.25) {
      hudT = 0; const ft = [...frameTimes].sort((a, b) => a - b); const avg = ft.reduce((a, b) => a + b, 0) / ft.length;
      const p95 = ft[Math.floor(ft.length * 0.95)], mx = ft[ft.length - 1];
      hud.textContent = `${(1000 / avg).toFixed(0)} fps  avg ${avg.toFixed(1)} ms  p95 ${p95.toFixed(1)}  max ${mx.toFixed(1)}\n` +
        `pos ${player.x.toFixed(1)} ${player.y.toFixed(2)} ${player.z.toFixed(1)}  tris ${(renderer.info.render.triangles / 1000).toFixed(0)}k  calls ${renderer.info.render.calls}\n` +
        `build: field ${timings.grid.toFixed(0)}ms mesh ${timings.mesh.toFixed(0)}ms bake ${timings.bake.toFixed(0)}ms`;
    }
  }
}
addEventListener('resize', () => { camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); renderer.setSize(innerWidth, innerHeight); });

U.uDetail.value = makeDetailTexture();
build().then(() => { teleport(0); renderer.setAnimationLoop(frame); window.__cave = { player, teleport, timings, renderer, camera, scene, updatePlayer, keys }; }).catch((e) => { statusEl.textContent = 'Error: ' + e.message; console.error(e); });

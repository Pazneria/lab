// Procedural texture generation (all original, generated at load time).
import * as THREE from 'three';

export function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6D2B79F5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Periodic (tileable) fractal value noise, values ~0..1
export function fbm(w, h, cx, cy, oct, seed, gain = 0.5) {
  const out = new Float32Array(w * h);
  const r = rng(seed);
  let amp = 1, total = 0;
  for (let o = 0; o < oct; o++) {
    const gx = cx << o, gy = cy << o;
    const grid = new Float32Array(gx * gy);
    for (let i = 0; i < grid.length; i++) grid[i] = r();
    const sxs = new Float32Array(w), x0s = new Int32Array(w), x1s = new Int32Array(w);
    for (let x = 0; x < w; x++) {
      const fx = x / w * gx, ix = Math.floor(fx), tx = fx - ix;
      sxs[x] = tx * tx * (3 - 2 * tx); x0s[x] = ix % gx; x1s[x] = (ix + 1) % gx;
    }
    for (let y = 0; y < h; y++) {
      const fy = y / h * gy, iy = Math.floor(fy), ty = fy - iy, sy = ty * ty * (3 - 2 * ty);
      const r0 = (iy % gy) * gx, r1 = ((iy + 1) % gy) * gx;
      const row = y * w;
      for (let x = 0; x < w; x++) {
        const sx = sxs[x], a = grid[r0 + x0s[x]], b = grid[r0 + x1s[x]], c = grid[r1 + x0s[x]], d = grid[r1 + x1s[x]];
        const top = a + (b - a) * sx, bot = c + (d - c) * sx;
        out[row + x] += amp * (top + (bot - top) * sy);
      }
    }
    total += amp; amp *= gain;
  }
  for (let i = 0; i < out.length; i++) out[i] /= total;
  return out;
}

let maxAniso = 8;
export function setAniso(a) { maxAniso = a; }

export function dataTex(data, w, h, srgb) {
  const t = new THREE.DataTexture(data, w, h, THREE.RGBAFormat);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.magFilter = THREE.LinearFilter;
  t.minFilter = THREE.LinearMipmapLinearFilter;
  t.generateMipmaps = true;
  t.anisotropy = maxAniso;
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  t.needsUpdate = true;
  return t;
}

function normalFromHeight(hgt, w, h, strength) {
  const d = new Uint8Array(w * h * 4);
  for (let y = 0; y < h; y++) {
    const yu = ((y + 1) % h) * w, yd = ((y - 1 + h) % h) * w, row = y * w;
    for (let x = 0; x < w; x++) {
      const xr = (x + 1) % w, xl = (x - 1 + w) % w;
      const dx = hgt[row + xr] - hgt[row + xl];
      const dy = hgt[yu + x] - hgt[yd + x];
      let nx = -dx * strength, ny = -dy * strength, nz = 1;
      const l = Math.hypot(nx, ny, nz);
      const i = (row + x) * 4;
      d[i] = (nx / l * 0.5 + 0.5) * 255;
      d[i + 1] = (ny / l * 0.5 + 0.5) * 255;
      d[i + 2] = (nz / l * 0.5 + 0.5) * 255;
      d[i + 3] = 255;
    }
  }
  return d;
}

function pack(w, h, base, alb, tint) {
  const d = new Uint8Array(w * h * 4);
  for (let i = 0, n = w * h; i < n; i++) {
    const a = alb[i];
    const t = tint ? tint[i] : 0;
    d[i * 4] = Math.max(0, Math.min(255, (base[0] + t * 0.02) * a * 255));
    d[i * 4 + 1] = Math.max(0, Math.min(255, base[1] * a * 255));
    d[i * 4 + 2] = Math.max(0, Math.min(255, (base[2] - t * 0.02) * a * 255));
    d[i * 4 + 3] = 255;
  }
  return d;
}

function packRough(w, h, rough) {
  const d = new Uint8Array(w * h * 4);
  for (let i = 0, n = w * h; i < n; i++) {
    const v = Math.max(0, Math.min(255, rough[i] * 255));
    d[i * 4] = 255; d[i * 4 + 1] = v; d[i * 4 + 2] = 0; d[i * 4 + 3] = 255;
  }
  return d;
}

function stampHole(hgt, alb, w, h, cx, cy, rad, depth, dark) {
  const R = Math.ceil(rad + 3);
  for (let dy = -R; dy <= R; dy++) for (let dx = -R; dx <= R; dx++) {
    const x = (cx + dx + w) % w, y = (cy + dy + h) % h;
    const dd = Math.hypot(dx, dy);
    const i = y * w + x;
    if (dd < rad) {
      const k = 1 - dd / rad;
      hgt[i] -= depth * Math.sqrt(k);
      alb[i] *= 1 - dark * (0.5 + 0.5 * k);
    } else if (dd < rad + 2) {
      hgt[i] += depth * 0.08;
    }
  }
}

// Wall concrete: plywood-formed panels (1.8 x 0.9 m) with tie holes. Tile = 7.2 x 3.6 m.
export function genWallConcrete() {
  const W = 2048, H = 1024, PW = 512, PH = 256;
  const big = fbm(W, H, 6, 3, 5, 11);
  const mid = fbm(W, H, 48, 24, 3, 12);
  const tint = fbm(W, H, 4, 2, 3, 13);
  const r = rng(5);
  const hgt = new Float32Array(W * H), alb = new Float32Array(W * H), rough = new Float32Array(W * H);
  const tones = [], grads = [];
  for (let i = 0; i < 16; i++) { tones.push((r() - 0.5) * 0.11); grads.push((r() - 0.3) * 0.08); }
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const i = y * W + x;
      const pi = Math.floor(y / PH) * 4 + Math.floor(x / PW);
      const lx = x % PW, ly = y % PH;
      const m = mid[i];
      let a = 1 + tones[pi] + (big[i] - 0.5) * 0.26 + (m - 0.5) * 0.12 + (r() - 0.5) * 0.07;
      a += (ly / PH - 0.5) * grads[pi];
      let hh = (m - 0.5) * 0.5 + (r() - 0.5) * 0.25;
      const e = Math.min(lx, PW - 1 - lx, ly, PH - 1 - ly);
      let ro = 0.84 + (m - 0.5) * 0.18 + (big[i] - 0.5) * 0.1;
      if (e < 2) { hh -= 1.6 * (1 - e / 2.5); a *= 0.84; ro = 0.93; }
      else if (e < 5) { hh += 0.25; a *= 1.02; }
      alb[i] = a; hgt[i] = hh; rough[i] = ro;
    }
  }
  // tie holes + rust/water streaks below them
  for (let py = 0; py < 4; py++) for (let px = 0; px < 4; px++) {
    for (const fx of [0.12, 0.5, 0.88]) for (const fy of [0.2, 0.8]) {
      const cx = Math.round(px * PW + fx * PW), cy = Math.round(py * PH + fy * PH);
      stampHole(hgt, alb, W, H, cx, cy, 6.5, 3.0, 0.5);
      const L = 30 + r() * 140, sw = 3 + r() * 5, amt = 0.03 + r() * 0.07;
      for (let s = 0; s < L; s++) {
        const y = (cy - 9 - s + H) % H;
        const wob = Math.sin(s * 0.11 + cx) * 1.5;
        for (let dx = -Math.ceil(sw); dx <= Math.ceil(sw); dx++) {
          const x = (cx + dx + Math.round(wob) + W) % W;
          const f = (1 - Math.abs(dx) / (sw + 1)) * (1 - s / L);
          if (f > 0) alb[y * W + x] *= 1 - amt * f;
        }
      }
    }
  }
  // bug holes (air voids)
  for (let k = 0; k < 1300; k++) {
    const cx = Math.floor(r() * W), cy = Math.floor(r() * H);
    stampHole(hgt, alb, W, H, cx, cy, 0.7 + r() * r() * 2.6, 1.3, 0.22);
  }
  return {
    map: dataTex(pack(W, H, [0.615, 0.61, 0.595], alb, tint), W, H, true),
    normalMap: dataTex(normalFromHeight(hgt, W, H, 0.55), W, H, false),
    roughnessMap: dataTex(packRough(W, H, rough), W, H, false),
  };
}

// Board-formed concrete for soffits, beams and skylight shafts. Tile = 2.4 x 2.4 m, boards 0.15 m.
export function genBoardConcrete() {
  const W = 1024, H = 1024, BH = 64;
  const grain = fbm(W, H, 3, 96, 4, 31, 0.55);
  const big = fbm(W, H, 4, 4, 4, 32);
  const r = rng(33);
  const hgt = new Float32Array(W * H), alb = new Float32Array(W * H), rough = new Float32Array(W * H);
  const nb = H / BH;
  const tones = [], offs = [], joints = [];
  for (let i = 0; i < nb; i++) { tones.push((r() - 0.5) * 0.07); offs.push((r() - 0.5) * 0.6); joints.push(Math.floor(r() * W)); }
  for (let y = 0; y < H; y++) {
    const b = Math.floor(y / BH), ly = y % BH;
    const e = Math.min(ly, BH - 1 - ly);
    for (let x = 0; x < W; x++) {
      const i = y * W + x;
      const g = grain[(y * W + ((x + b * 97) % W))];
      let a = 1 + tones[b] + (big[i] - 0.5) * 0.2 + (g - 0.5) * 0.07 + (r() - 0.5) * 0.06;
      let hh = (g - 0.5) * 1.6 + offs[b] + (r() - 0.5) * 0.2;
      if (e < 2) { hh -= 1.4; a *= 0.93; }
      const jd = Math.abs(x - joints[b]);
      if (jd < 2) { hh -= 1.0; a *= 0.9; }
      alb[i] = a; hgt[i] = hh; rough[i] = 0.86 + (g - 0.5) * 0.12;
    }
  }
  for (let k = 0; k < 900; k++) stampHole(hgt, alb, W, H, Math.floor(r() * W), Math.floor(r() * H), 0.8 + r() * 2, 1.2, 0.3);
  return {
    map: dataTex(pack(W, H, [0.6, 0.6, 0.59], alb, null), W, H, true),
    normalMap: dataTex(normalFromHeight(hgt, W, H, 0.45), W, H, false),
    roughnessMap: dataTex(packRough(W, H, rough), W, H, false),
  };
}

// Polished concrete floor with saw-cut joints every 3 m. Tile = 6 x 6 m.
export function genFloorConcrete() {
  const W = 2048, H = 2048, B = 1024;
  const cloud = fbm(W, H, 6, 6, 5, 21);
  const swirl = fbm(W, H, 40, 40, 3, 22);
  const r = rng(23);
  const hgt = new Float32Array(W * H), alb = new Float32Array(W * H), rough = new Float32Array(W * H);
  const bt = [(r() - 0.5) * 0.08, (r() - 0.5) * 0.08, (r() - 0.5) * 0.08, (r() - 0.5) * 0.08];
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const i = y * W + x;
    const bay = (y >= B ? 2 : 0) + (x >= B ? 1 : 0);
    const c = cloud[i], s = swirl[i];
    let a = 1 + bt[bay] + (c - 0.5) * 0.28 + (s - 0.5) * 0.07 + (r() - 0.5) * 0.05;
    let hh = (s - 0.5) * 0.2;
    let ro = 0.4 + (c - 0.5) * 0.3 + (s - 0.5) * 0.08;
    const e = Math.min(x % B, B - 1 - (x % B), y % B, B - 1 - (y % B));
    if (e < 2) { a *= 0.72; hh -= 2; ro = 0.9; } else if (e < 3) { a *= 0.95; ro += 0.08; }
    alb[i] = a; hgt[i] = hh; rough[i] = ro;
  }
  // exposed aggregate chips
  for (let k = 0; k < 26000; k++) {
    const cx = Math.floor(r() * W), cy = Math.floor(r() * H);
    const rad = 0.7 + r() * r() * 3.5, tone = r() < 0.6 ? 1.12 + r() * 0.12 : 0.72 + r() * 0.12;
    const R = Math.ceil(rad);
    for (let dy = -R; dy <= R; dy++) for (let dx = -R; dx <= R; dx++) {
      if (dx * dx + dy * dy > rad * rad) continue;
      const i = ((cy + dy + H) % H) * W + ((cx + dx + W) % W);
      alb[i] *= tone;
    }
  }
  // scuffs
  for (let k = 0; k < 160; k++) {
    let x = r() * W, y = r() * H; const ang = r() * Math.PI, len = 40 + r() * 200;
    for (let s = 0; s < len; s++) {
      x += Math.cos(ang + Math.sin(s * 0.02) * 0.3); y += Math.sin(ang);
      const i = ((Math.floor(y) % H + H) % H) * W + ((Math.floor(x) % W + W) % W);
      alb[i] *= 0.94; rough[i] = Math.min(1, rough[i] + 0.12);
    }
  }
  return {
    map: dataTex(pack(W, H, [0.5, 0.49, 0.47], alb, null), W, H, true),
    normalMap: dataTex(normalFromHeight(hgt, W, H, 0.6), W, H, false),
    roughnessMap: dataTex(packRough(W, H, rough), W, H, false),
  };
}

// Small tileable detail noise: R = low freq, G = high freq, B = speckle (linear data)
export function genDetailNoise() {
  const N = 512;
  const lo = fbm(N, N, 4, 4, 5, 41);
  const hi = fbm(N, N, 32, 32, 3, 42);
  const r = rng(43);
  const d = new Uint8Array(N * N * 4);
  for (let i = 0; i < N * N; i++) {
    d[i * 4] = lo[i] * 255; d[i * 4 + 1] = Math.min(255, (hi[i] * 0.85 + r() * 0.15) * 255);
    d[i * 4 + 2] = r() * 255; d[i * 4 + 3] = 255;
  }
  return dataTex(d, N, N, false);
}

// Weathering steel
export function genRust() {
  const N = 1024;
  const a1 = fbm(N, N, 6, 6, 6, 51), a2 = fbm(N, N, 24, 24, 4, 52), streak = fbm(N, N, 64, 3, 3, 53);
  const r = rng(54);
  const d = new Uint8Array(N * N * 4), hgt = new Float32Array(N * N), rough = new Float32Array(N * N);
  for (let i = 0; i < N * N; i++) {
    const p = a1[i], q = a2[i], s = streak[i];
    let cr = 0.36, cg = 0.17, cb = 0.085;
    const t = Math.max(0, Math.min(1, (p - 0.42) * 3));
    cr += t * 0.16; cg += t * 0.09; cb += t * 0.035;
    const dark = Math.max(0, (q - 0.6) * 2.2);
    cr *= 1 - dark * 0.45; cg *= 1 - dark * 0.5; cb *= 1 - dark * 0.4;
    const sp = r();
    const k = (0.92 + (s - 0.5) * 0.14) * (0.9 + sp * 0.2);
    d[i * 4] = Math.min(255, cr * k * 255 * 1.25);
    d[i * 4 + 1] = Math.min(255, cg * k * 255 * 1.25);
    d[i * 4 + 2] = Math.min(255, cb * k * 255 * 1.25);
    d[i * 4 + 3] = 255;
    hgt[i] = q * 1.2 + sp * 0.5 + p * 0.6;
    rough[i] = 0.62 + q * 0.3 - t * 0.08;
  }
  return {
    map: dataTex(d, N, N, true),
    normalMap: dataTex(normalFromHeight(hgt, N, N, 1.6), N, N, false),
    roughnessMap: dataTex(packRough(N, N, rough), N, N, false),
  };
}

// Pale limestone
export function genStone() {
  const N = 1024;
  const a = fbm(N, N, 5, 5, 6, 61), band = fbm(N, N, 2, 40, 3, 62), fine = fbm(N, N, 64, 64, 2, 63);
  const r = rng(64);
  const alb = new Float32Array(N * N), hgt = new Float32Array(N * N), rough = new Float32Array(N * N), tint = new Float32Array(N * N);
  for (let i = 0; i < N * N; i++) {
    alb[i] = 1 + (a[i] - 0.5) * 0.09 + (band[i] - 0.5) * 0.07 + (fine[i] - 0.5) * 0.04 + (r() - 0.5) * 0.025;
    hgt[i] = fine[i] * 0.4 + (r() - 0.5) * 0.15;
    rough[i] = 0.62 + (a[i] - 0.5) * 0.15;
    tint[i] = (band[i] - 0.5) * 2;
  }
  for (let k = 0; k < 2200; k++) stampHole(hgt, alb, N, N, Math.floor(r() * N), Math.floor(r() * N), 0.6 + r() * r() * 2.6, 1.4, 0.18);
  return {
    map: dataTex(pack(N, N, [0.86, 0.835, 0.775], alb, tint), N, N, true),
    normalMap: dataTex(normalFromHeight(hgt, N, N, 0.9), N, N, false),
    roughnessMap: dataTex(packRough(N, N, rough), N, N, false),
  };
}

// Oak for bench tops, grain along U. Tile = 2.4 x 0.6 m
export function genOak() {
  const W = 1024, H = 256;
  const g = fbm(W, H, 2, 48, 5, 71, 0.6), f = fbm(W, H, 16, 8, 3, 72);
  const r = rng(73);
  const d = new Uint8Array(W * H * 4), hgt = new Float32Array(W * H), rough = new Float32Array(W * H);
  for (let i = 0; i < W * H; i++) {
    const ring = Math.sin(g[i] * 40 + f[i] * 6) * 0.5 + 0.5;
    const k = 0.8 + ring * 0.22 + (r() - 0.5) * 0.05;
    d[i * 4] = 0.62 * k * 255; d[i * 4 + 1] = 0.45 * k * 255; d[i * 4 + 2] = 0.29 * k * 255; d[i * 4 + 3] = 255;
    hgt[i] = ring * 0.4; rough[i] = 0.5 + ring * 0.15;
  }
  return {
    map: dataTex(d, W, H, true),
    normalMap: dataTex(normalFromHeight(hgt, W, H, 0.6), W, H, false),
    roughnessMap: dataTex(packRough(W, H, rough), W, H, false),
  };
}

export function blobTexture() {
  const c = document.createElement('canvas'); c.width = c.height = 128;
  const g = c.getContext('2d');
  const grd = g.createRadialGradient(64, 64, 4, 64, 64, 64);
  grd.addColorStop(0, 'rgba(0,0,0,0.62)'); grd.addColorStop(0.45, 'rgba(0,0,0,0.32)'); grd.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = grd; g.fillRect(0, 0, 128, 128);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}

export function labelTexture(lines, w = 640, h = 400, opts = {}) {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  const g = c.getContext('2d');
  g.fillStyle = opts.bg || '#ece9e2'; g.fillRect(0, 0, w, h);
  g.fillStyle = opts.fg || '#26241f';
  let y = opts.top || 70;
  for (const ln of lines) {
    g.font = ln.font; g.fillStyle = ln.color || opts.fg || '#26241f';
    g.fillText(ln.text, opts.left || 48, y);
    y += ln.gap || 40;
  }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = maxAniso;
  return t;
}

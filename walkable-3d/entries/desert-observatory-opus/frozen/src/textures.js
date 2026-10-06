// Procedural, tileable surface textures (color + normal + roughness/metalness).
import * as THREE from 'three';

export function hash2(x, y, s) {
  let h = Math.imul(x | 0, 374761393) ^ Math.imul(y | 0, 668265263) ^ Math.imul(s | 0, 1442695041);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
}

export function vnoise(x, y, period, seed) {
  const xi = Math.floor(x), yi = Math.floor(y);
  const xf = x - xi, yf = y - yi;
  const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
  let x0 = xi, x1 = xi + 1, y0 = yi, y1 = yi + 1;
  if (period) {
    x0 = ((x0 % period) + period) % period; x1 = ((x1 % period) + period) % period;
    y0 = ((y0 % period) + period) % period; y1 = ((y1 % period) + period) % period;
  }
  const a = hash2(x0, y0, seed), b = hash2(x1, y0, seed), c = hash2(x0, y1, seed), d = hash2(x1, y1, seed);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}

// tileable fbm: freq must be an integer for tiling over [0,1)
export function fbm(u, v, freq, oct, seed) {
  let s = 0, a = 0.5, n = 0, f = freq;
  for (let i = 0; i < oct; i++) {
    s += a * vnoise(u * f, v * f, f, seed + i * 31);
    n += a; a *= 0.5; f *= 2;
  }
  return s / n;
}

const clamp01 = (x) => (x < 0 ? 0 : x > 1 ? 1 : x);
const smooth = (a, b, x) => { const t = clamp01((x - a) / (b - a)); return t * t * (3 - 2 * t); };

function finishTex(data, size, srgb, aniso) {
  const t = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.generateMipmaps = true;
  t.minFilter = THREE.LinearMipmapLinearFilter;
  t.magFilter = THREE.LinearFilter;
  t.anisotropy = aniso;
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  t.needsUpdate = true;
  return t;
}

// fn(u, v, out) fills out.r,g,b (0..1), out.h (height), out.rough, out.metal
export function genTexture(size, fn, { normalStrength = 2.0, aniso = 8, meters = 1 } = {}) {
  const N = size * size;
  const col = new Uint8Array(N * 4), rm = new Uint8Array(N * 4), nor = new Uint8Array(N * 4);
  const hgt = new Float32Array(N);
  const o = { r: 0, g: 0, b: 0, h: 0, rough: 0.8, metal: 0 };
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      o.rough = 0.8; o.metal = 0; o.h = 0;
      fn(x / size, y / size, o);
      const i = y * size + x, j = i * 4;
      col[j] = clamp01(o.r) * 255; col[j + 1] = clamp01(o.g) * 255; col[j + 2] = clamp01(o.b) * 255; col[j + 3] = 255;
      rm[j] = 255; rm[j + 1] = clamp01(o.rough) * 255; rm[j + 2] = clamp01(o.metal) * 255; rm[j + 3] = 255;
      hgt[i] = o.h;
    }
  }
  const k = normalStrength * size / 256;
  for (let y = 0; y < size; y++) {
    const ym = ((y - 1 + size) % size) * size, yp = ((y + 1) % size) * size, yc = y * size;
    for (let x = 0; x < size; x++) {
      const xm = (x - 1 + size) % size, xp = (x + 1) % size;
      const dx = (hgt[yc + xp] - hgt[yc + xm]) * k;
      const dy = (hgt[yp + x] - hgt[ym + x]) * k;
      const l = Math.hypot(dx, dy, 1);
      const j = (yc + x) * 4;
      nor[j] = (-dx / l * 0.5 + 0.5) * 255;
      nor[j + 1] = (-dy / l * 0.5 + 0.5) * 255;
      nor[j + 2] = (1 / l * 0.5 + 0.5) * 255;
      nor[j + 3] = 255;
    }
  }
  const map = finishTex(col, size, true, aniso);
  const normalMap = finishTex(nor, size, false, aniso);
  const rmMap = finishTex(rm, size, false, aniso);
  for (const t of [map, normalMap, rmMap]) t.repeat.set(1 / meters, 1 / meters);
  return { map, normalMap, rmMap };
}

// ---------------- specific surfaces ----------------

export function plasterTex(aniso) {
  return genTexture(1024, (u, v, o) => {
    const mott = fbm(u, v, 3, 5, 11);
    const grain = fbm(u, v, 64, 2, 23);
    const trowel = fbm(u + 0.15 * fbm(u, v, 4, 2, 5), v, 5, 4, 37);
    const pit = vnoise(u * 180, v * 180, 180, 41);
    const pits = smooth(0.88, 0.97, pit);
    const ridge = 1 - Math.abs(fbm(u, v, 6, 4, 53) * 2 - 1);
    const crack = smooth(0.985, 0.998, ridge) * smooth(0.6, 0.75, fbm(u, v, 2, 2, 61));
    const stain = smooth(0.55, 0.8, fbm(u, v, 2, 4, 71));
    const base = 0.86 + 0.14 * (mott - 0.5) + 0.06 * (grain - 0.5) + 0.05 * (trowel - 0.5);
    let r = base * 0.985, g = base * 0.925, b = base * 0.83;
    r -= stain * 0.03; g -= stain * 0.04; b -= stain * 0.05;
    const dark = 1 - pits * 0.12 - crack * 0.18;
    o.r = r * dark; o.g = g * dark; o.b = b * dark;
    o.h = trowel * 0.9 + mott * 0.4 + grain * 0.35 - pits * 0.5 - crack * 0.35;
    o.rough = 0.88 + 0.08 * grain;
  }, { normalStrength: 2.6, aniso, meters: 2.5 });
}

export function stoneTex(aniso) {
  // dressed sandstone, no joints (steps, caps, lintels)
  return genTexture(512, (u, v, o) => {
    const layer = fbm(u * 0.3, v, 6, 4, 101);
    const mott = fbm(u, v, 4, 5, 103);
    const grain = vnoise(u * 256, v * 256, 256, 107);
    const chisel = Math.sin((u * 1.0 + v * 0.6) * Math.PI * 2 * 20 + fbm(u, v, 8, 2, 109) * 6) * 0.5 + 0.5;
    const pore = smooth(0.9, 0.98, vnoise(u * 90, v * 90, 90, 113));
    const c = 0.72 + 0.12 * (mott - 0.5) + 0.08 * (layer - 0.5) + 0.06 * (grain - 0.5);
    o.r = c * 1.02; o.g = c * 0.86; o.b = c * 0.68;
    const d = 1 - pore * 0.3;
    o.r *= d; o.g *= d; o.b *= d;
    o.h = mott * 0.6 + chisel * 0.04 + grain * 0.25 - pore * 0.5 + layer * 0.3;
    o.rough = 0.82 + 0.1 * grain;
  }, { normalStrength: 2.2, aniso, meters: 1.6 });
}

// coursed masonry with mortar joints
export function masonryTex(aniso, { rows = 6, seed = 200, tint = [1.0, 0.86, 0.7], meters = 2.4, light = 0.7 } = {}) {
  return genTexture(1024, (u, v, o) => {
    const row = Math.floor(v * rows);
    const fv = v * rows - row;
    const nb = 3 + Math.floor(hash2(row, 1, seed) * 2);
    const off = hash2(row, 2, seed);
    let uu = u + off; uu -= Math.floor(uu);
    const bi = Math.floor(uu * nb);
    const fu = uu * nb - bi;
    const jw = 0.022 * nb, jh = 0.022 * rows;
    const ex = Math.min(fu, 1 - fu) / jw, ey = Math.min(fv, 1 - fv) / jh;
    const nEdge = fbm(u, v, 16, 2, seed + 3) * 0.6;
    const e = Math.min(ex, ey) - nEdge;
    const mortar = 1 - smooth(0.6, 1.1, e);
    const bh = hash2(bi + row * 7, 3, seed);
    const mott = fbm(u, v, 6, 4, seed + 5);
    const grain = vnoise(u * 300, v * 300, 300, seed + 7);
    const c = light + 0.12 * (bh - 0.5) + 0.1 * (mott - 0.5) + 0.05 * (grain - 0.5);
    const mc = 0.58 + 0.06 * grain;
    const sc = [c * tint[0], c * tint[1], c * tint[2]];
    o.r = sc[0] * (1 - mortar) + mc * 0.95 * mortar;
    o.g = sc[1] * (1 - mortar) + mc * 0.85 * mortar;
    o.b = sc[2] * (1 - mortar) + mc * 0.72 * mortar;
    const bulge = smooth(0.0, 3.0, Math.min(ex, ey));
    o.h = bulge * 0.9 + mott * 0.4 + grain * 0.2 - mortar * 0.4;
    o.rough = 0.85 + 0.1 * mortar;
  }, { normalStrength: 2.4, aniso, meters });
}

export function rockTex(aniso) {
  return genTexture(1024, (u, v, o) => {
    const strata = fbm(u * 0.25, v, 8, 4, 301);
    const big = fbm(u, v, 3, 5, 303);
    const grain = vnoise(u * 400, v * 400, 400, 307);
    const ridge = 1 - Math.abs(fbm(u, v, 5, 4, 311) * 2 - 1);
    const crack = smooth(0.965, 0.995, ridge);
    const lich = smooth(0.7, 0.8, fbm(u, v, 9, 3, 313));
    const c = 0.78 + 0.16 * (big - 0.5) + 0.1 * (strata - 0.5) + 0.08 * (grain - 0.5);
    o.r = c; o.g = c * 0.95; o.b = c * 0.9;
    o.r *= 1 - crack * 0.12; o.g *= 1 - crack * 0.14; o.b *= 1 - crack * 0.14;
    o.r -= lich * 0.1; o.g -= lich * 0.12; o.b -= lich * 0.14;
    o.h = big * 1.2 + strata * 0.5 + grain * 0.3 - crack * 0.4;
    o.rough = 0.9;
  }, { normalStrength: 3.0, aniso, meters: 5 });
}

export function sandTex(aniso) {
  return genTexture(512, (u, v, o) => {
    const warp = fbm(u, v, 3, 3, 401);
    const rip = Math.sin((v * 22 + warp * 4 + u * 3) * Math.PI * 2) * 0.5 + 0.5;
    const grain = vnoise(u * 512, v * 512, 512, 403);
    const grain2 = vnoise(u * 160, v * 160, 160, 405);
    const mott = fbm(u, v, 4, 3, 407);
    const c = 0.84 + 0.05 * (mott - 0.5) + 0.1 * (grain - 0.5) + 0.04 * (rip - 0.5);
    o.r = c * 1.0; o.g = c * 0.85; o.b = c * 0.64;
    const dk = smooth(0.85, 0.98, grain2) * 0.25;
    o.r -= dk * 0.6; o.g -= dk * 0.7; o.b -= dk * 0.7;
    o.h = rip * 0.6 + grain * 0.25 + grain2 * 0.2;
    o.rough = 0.95;
  }, { normalStrength: 1.6, aniso, meters: 2.0 });
}

export function bronzeTex(aniso) {
  return genTexture(512, (u, v, o) => {
    const n = fbm(u, v, 4, 5, 501);
    const n2 = fbm(u, v, 16, 3, 503);
    const pat = smooth(0.56, 0.7, fbm(u, v, 3, 5, 507));
    const streak = fbm(u * 4, v * 0.5, 4, 3, 509);
    const scratch = smooth(0.92, 0.99, Math.abs(Math.sin((u * 1.3 + v * 0.2) * 260 + n * 20)));
    let r = 0.62 + 0.14 * (n - 0.5), g = 0.43 + 0.1 * (n - 0.5), b = 0.24 + 0.06 * (n - 0.5);
    const ox = smooth(0.4, 0.75, streak) * 0.45;
    r *= 1 - ox; g *= 1 - ox * 0.95; b *= 1 - ox * 0.9;
    r = r * (1 - pat) + 0.33 * pat; g = g * (1 - pat) + 0.55 * pat; b = b * (1 - pat) + 0.47 * pat;
    r += scratch * 0.12; g += scratch * 0.08; b += scratch * 0.05;
    o.r = r; o.g = g; o.b = b;
    o.metal = 1 - pat * 0.9;
    o.rough = 0.32 + 0.25 * n2 + pat * 0.45 + ox * 0.3 - scratch * 0.12;
    o.h = n2 * 0.3 + pat * 0.5 - scratch * 0.2;
  }, { normalStrength: 1.2, aniso, meters: 1 });
}

export function tileTex(aniso) {
  // 8x8 glazed tiles; cobalt / turquoise / white motifs, a few chipped
  const T = 8;
  return genTexture(512, (u, v, o) => {
    const tx = Math.floor(u * T), ty = Math.floor(v * T);
    const fx = u * T - tx, fy = v * T - ty;
    const g = 0.055;
    const edge = Math.min(fx, 1 - fx, fy, 1 - fy);
    const grout = 1 - smooth(g * 0.6, g, edge);
    const h = hash2(tx, ty, 601);
    const cx = fx - 0.5, cy = fy - 0.5;
    const dia = Math.abs(cx) + Math.abs(cy);
    const checker = (tx + ty) & 1;
    let r, gg, b;
    if (checker === 0) { r = 0.06; gg = 0.2; b = 0.52; } else { r = 0.12; gg = 0.5; b = 0.52; }
    const shade = 0.88 + 0.2 * (h - 0.5) + 0.08 * (fbm(u, v, 32, 2, 603) - 0.5);
    r *= shade; gg *= shade; b *= shade;
    // white motif: diamond ring on cobalt, small star on turquoise
    const motif = checker === 0
      ? (smooth(0.03, 0.0, Math.abs(dia - 0.3)) + smooth(0.1, 0.06, dia))
      : smooth(0.05, 0.0, Math.min(Math.abs(cx), Math.abs(cy))) * smooth(0.36, 0.3, Math.hypot(cx, cy));
    const m = clamp01(motif);
    r = r * (1 - m) + 0.88 * m; gg = gg * (1 - m) + 0.88 * m; b = b * (1 - m) + 0.82 * m;
    // chips exposing terracotta at corners
    const chipOn = h > 0.86;
    const ccx = h > 0.93 ? fx : 1 - fx, ccy = h > 0.9 ? fy : 1 - fy;
    const chip = chipOn ? smooth(0.2, 0.14, ccx + ccy + 0.08 * vnoise(u * 200, v * 200, 200, 607)) : 0;
    const glazeN = vnoise(u * 90, v * 90, 90, 609);
    r = r * (1 - chip) + 0.66 * chip; gg = gg * (1 - chip) + 0.36 * chip; b = b * (1 - chip) + 0.24 * chip;
    const gc = 0.66 + 0.05 * glazeN;
    o.r = r * (1 - grout) + gc * grout; o.g = gg * (1 - grout) + gc * 0.95 * grout; o.b = b * (1 - grout) + gc * 0.86 * grout;
    o.h = smooth(0.0, 0.14, edge) * 0.9 - chip * 0.5 + glazeN * 0.05;
    o.rough = 0.12 + 0.08 * glazeN + grout * 0.75 + chip * 0.7;
  }, { normalStrength: 2.5, aniso, meters: 1.2 });
}

export function woodTex(aniso) {
  return genTexture(512, (u, v, o) => {
    const ring = fbm(u * 1, v * 0.05, 24, 3, 701);
    const grain = Math.sin((u * 30 + ring * 8) * Math.PI * 2) * 0.5 + 0.5;
    const fine = vnoise(u * 256, v * 16, 256, 703);
    const crack = smooth(0.95, 0.99, vnoise(u * 60, v * 3, 60, 705)) ;
    const weather = fbm(u, v, 4, 4, 707);
    const c = 0.48 + 0.1 * (grain - 0.5) + 0.06 * (fine - 0.5) + 0.12 * (weather - 0.5);
    o.r = c * 0.95; o.g = c * 0.82; o.b = c * 0.68;
    o.r *= 1 - crack * 0.6; o.g *= 1 - crack * 0.6; o.b *= 1 - crack * 0.6;
    o.h = grain * 0.5 + fine * 0.3 - crack * 1.0;
    o.rough = 0.85;
  }, { normalStrength: 2.0, aniso, meters: 1 });
}

// Engraved brass dial (canvas) for setting circles / sundial
export function dialTexture(kind, aniso) {
  const S = 1024;
  const cv = document.createElement('canvas');
  cv.width = cv.height = S;
  const g = cv.getContext('2d');
  const grd = g.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2);
  grd.addColorStop(0, '#b58a4a'); grd.addColorStop(0.8, '#9c7136'); grd.addColorStop(1, '#6e4b22');
  g.fillStyle = grd; g.fillRect(0, 0, S, S);
  // patina blotches
  for (let i = 0; i < 70; i++) {
    const x = Math.random() * S, y = Math.random() * S, r = 10 + Math.random() * 60;
    const pg = g.createRadialGradient(x, y, 0, x, y, r);
    pg.addColorStop(0, 'rgba(70,120,100,0.35)'); pg.addColorStop(1, 'rgba(70,120,100,0)');
    g.fillStyle = pg; g.fillRect(x - r, y - r, 2 * r, 2 * r);
  }
  g.translate(S / 2, S / 2);
  g.strokeStyle = '#2c1a0a'; g.fillStyle = '#2c1a0a';
  if (kind === 'circle') {
    g.lineWidth = 3;
    g.beginPath(); g.arc(0, 0, S * 0.47, 0, Math.PI * 2); g.stroke();
    g.beginPath(); g.arc(0, 0, S * 0.36, 0, Math.PI * 2); g.stroke();
    for (let i = 0; i < 360; i++) {
      const a = i / 360 * Math.PI * 2;
      const len = i % 10 === 0 ? 0.075 : i % 5 === 0 ? 0.05 : 0.03;
      g.lineWidth = i % 10 === 0 ? 3 : 1.6;
      g.beginPath();
      g.moveTo(Math.cos(a) * S * 0.47, Math.sin(a) * S * 0.47);
      g.lineTo(Math.cos(a) * S * (0.47 - len), Math.sin(a) * S * (0.47 - len));
      g.stroke();
    }
    g.font = 'bold 30px Georgia, serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
    for (let i = 0; i < 36; i++) {
      const a = i / 36 * Math.PI * 2;
      g.save(); g.rotate(a + Math.PI / 2); g.translate(0, -S * 0.385);
      g.fillText(String(i * 10), 0, 0); g.restore();
    }
    g.lineWidth = 2;
    for (let k = 0; k < 8; k++) { const a = k / 8 * Math.PI * 2; g.beginPath(); g.moveTo(Math.cos(a) * S * 0.1, Math.sin(a) * S * 0.1); g.lineTo(Math.cos(a) * S * 0.3, Math.sin(a) * S * 0.3); g.stroke(); }
    g.beginPath(); g.arc(0, 0, S * 0.1, 0, Math.PI * 2); g.stroke();
  } else {
    // horizontal sundial: hour lines for latitude ~32 deg
    const lat = 32 * Math.PI / 180;
    g.lineWidth = 4;
    g.beginPath(); g.arc(0, 0, S * 0.46, 0, Math.PI * 2); g.stroke();
    g.lineWidth = 2;
    g.beginPath(); g.arc(0, 0, S * 0.4, 0, Math.PI * 2); g.stroke();
    const roman = ['VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'I', 'II', 'III', 'IV', 'V', 'VI'];
    g.font = 'bold 40px Georgia, serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
    for (let h = -6; h <= 6; h++) {
      const ha = h * 15 * Math.PI / 180;
      const ang = Math.atan(Math.sin(lat) * Math.tan(ha));
      const a = (Math.abs(h) === 6 ? Math.sign(h) * Math.PI / 2 : ang) - Math.PI / 2;
      g.lineWidth = 3;
      g.beginPath(); g.moveTo(0, 0); g.lineTo(Math.cos(a) * S * 0.4, Math.sin(a) * S * 0.4); g.stroke();
      g.save(); g.translate(Math.cos(a) * S * 0.43, Math.sin(a) * S * 0.43); g.rotate(a + Math.PI / 2);
      g.fillText(roman[h + 6], 0, 0); g.restore();
      for (let q = 1; q < 4 && h < 6; q++) {
        const hb = (h + q / 4) * 15 * Math.PI / 180;
        const ab = Math.atan(Math.sin(lat) * Math.tan(hb)) - Math.PI / 2;
        g.lineWidth = 1.5;
        g.beginPath(); g.moveTo(Math.cos(ab) * S * 0.36, Math.sin(ab) * S * 0.36); g.lineTo(Math.cos(ab) * S * 0.4, Math.sin(ab) * S * 0.4); g.stroke();
      }
    }
    g.font = 'italic 30px Georgia, serif';
    g.fillText('SOL OMNIBUS LUCET', 0, S * 0.2);
  }
  const t = new THREE.CanvasTexture(cv);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = aniso;
  return t;
}

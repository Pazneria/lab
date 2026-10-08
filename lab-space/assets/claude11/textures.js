// Procedural, tileable surface textures (colour, roughness, normal) generated at load.
import * as THREE from 'three';

export function rng(seed) {
  let s = seed >>> 0;
  return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
}

// Tileable value noise with separate cell counts per axis.
function valueNoise(size, cx, cy, seed) {
  const r = rng(seed);
  const g = new Float32Array(cx * cy);
  for (let i = 0; i < g.length; i++) g[i] = r();
  const out = new Float32Array(size * size);
  for (let y = 0; y < size; y++) {
    const fy = (y / size) * cy, y0 = Math.floor(fy), ty = fy - y0, sy = ty * ty * (3 - 2 * ty);
    const r0 = (y0 % cy) * cx, r1 = ((y0 + 1) % cy) * cx;
    for (let x = 0; x < size; x++) {
      const fx = (x / size) * cx, x0 = Math.floor(fx), tx = fx - x0, sx = tx * tx * (3 - 2 * tx);
      const a = x0 % cx, b = (x0 + 1) % cx;
      const top = g[r0 + a] + (g[r0 + b] - g[r0 + a]) * sx;
      const bot = g[r1 + a] + (g[r1 + b] - g[r1 + a]) * sx;
      out[y * size + x] = top + (bot - top) * sy;
    }
  }
  return out;
}

function fbm(size, cells, octaves, seed, aniso = 1) {
  const out = new Float32Array(size * size);
  let amp = 1, total = 0, c = cells;
  for (let o = 0; o < octaves; o++) {
    const n = valueNoise(size, Math.max(1, Math.round(c / aniso)), Math.min(size, c), seed + o * 101);
    for (let i = 0; i < out.length; i++) out[i] += (n[i] - 0.5) * amp;
    total += amp; amp *= 0.5; c *= 2;
  }
  for (let i = 0; i < out.length; i++) out[i] /= total;
  return out; // roughly -0.5..0.5
}

function canvas(size) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  return c;
}

function greyCanvas(size, fn, tint = [1, 1, 1]) {
  const c = canvas(size), ctx = c.getContext('2d');
  const img = ctx.createImageData(size, size);
  for (let i = 0; i < size * size; i++) {
    const v = Math.max(0, Math.min(1, fn(i)));
    img.data[i * 4] = v * 255 * tint[0];
    img.data[i * 4 + 1] = v * 255 * tint[1];
    img.data[i * 4 + 2] = v * 255 * tint[2];
    img.data[i * 4 + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
  return c;
}

function normalCanvas(size, h, strength) {
  const c = canvas(size), ctx = c.getContext('2d');
  const img = ctx.createImageData(size, size);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const l = h[y * size + ((x - 1 + size) % size)], r = h[y * size + ((x + 1) % size)];
      const u = h[((y - 1 + size) % size) * size + x], d = h[((y + 1) % size) * size + x];
      let nx = (l - r) * strength, ny = (d - u) * strength, nz = 1;
      const len = Math.hypot(nx, ny, nz);
      const i = (y * size + x) * 4;
      img.data[i] = (nx / len * 0.5 + 0.5) * 255;
      img.data[i + 1] = (ny / len * 0.5 + 0.5) * 255;
      img.data[i + 2] = (nz / len * 0.5 + 0.5) * 255;
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return c;
}

function tex(c, srgb, anisotropy) {
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
  t.anisotropy = anisotropy;
  t.generateMipmaps = true;
  t.minFilter = THREE.LinearMipmapLinearFilter;
  return t;
}

// Draw faint scratches / scuffs onto a canvas.
function scratches(c, count, seed, color, alpha, maxLen) {
  const ctx = c.getContext('2d'), r = rng(seed), s = c.width;
  ctx.lineCap = 'round';
  for (let i = 0; i < count; i++) {
    const x = r() * s, y = r() * s, a = r() * Math.PI * 2, len = (0.1 + r()) * maxLen;
    ctx.strokeStyle = color; ctx.globalAlpha = alpha * (0.3 + r() * 0.7); ctx.lineWidth = 0.5 + r() * 1.2;
    ctx.beginPath(); ctx.moveTo(x, y);
    ctx.quadraticCurveTo(x + Math.cos(a + 0.2) * len * 0.5, y + Math.sin(a + 0.2) * len * 0.5, x + Math.cos(a) * len, y + Math.sin(a) * len);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
}

export function makeTextures(anisotropy) {
  const T = {};
  const set = (name, size, metres, colorC, roughC, normalC) => {
    const rep = 1 / metres;
    const m = { map: tex(colorC, true, anisotropy) };
    if (roughC) m.roughnessMap = tex(roughC, false, anisotropy);
    if (normalC) m.normalMap = tex(normalC, false, anisotropy);
    for (const k in m) m[k].repeat.set(rep, rep);
    T[name] = m;
  };

  // Polished concrete hall floor with 1.2 m saw-cut joints (texture spans 2.4 m).
  {
    const S = 1024, low = fbm(S, 4, 4, 11), fine = fbm(S, 128, 2, 12), r = rng(5);
    const h = new Float32Array(S * S);
    const seam = (i) => { const x = i % S, y = (i / S) | 0; const dx = Math.min(x % 512, 512 - (x % 512)), dy = Math.min(y % 512, 512 - (y % 512)); return Math.min(dx, dy); };
    const col = greyCanvas(S, (i) => {
      const sd = seam(i);
      let v = 0.56 + low[i] * 0.16 + fine[i] * 0.05 + (r() < 0.01 ? (r() - 0.5) * 0.18 : 0);
      if (sd < 2) v *= 0.55; else if (sd < 4) v *= 0.85;
      h[i] = sd < 3 ? -1 : 0;
      return v;
    }, [1, 0.995, 0.975]);
    scratches(col, 90, 7, '#2a2a2a', 0.08, 120);
    const rough = greyCanvas(S, (i) => 0.42 + low[i] * 0.25 + fine[i] * 0.1 + (seam(i) < 3 ? 0.3 : 0));
    set('floor', S, 2.4, col, rough, normalCanvas(S, h, 1.5));
  }
  // Static-dissipative vinyl tiles (perception alcove), 0.6 m tiles, texture spans 1.2 m.
  {
    const S = 512, low = fbm(S, 6, 3, 21), fine = fbm(S, 128, 2, 22), r = rng(9);
    const h = new Float32Array(S * S);
    const col = greyCanvas(S, (i) => {
      const x = i % S, y = (i / S) | 0, sd = Math.min(x % 256, 256 - (x % 256), y % 256, 256 - (y % 256));
      const tileShift = (((x / 256) | 0) + ((y / 256) | 0)) % 2 ? 0.02 : 0;
      let v = 0.66 + tileShift + low[i] * 0.06 + fine[i] * 0.05;
      if (r() < 0.035) v -= 0.12 + r() * 0.2; // conductive chips
      if (sd < 1) { v *= 0.7; h[i] = -1; }
      return v;
    }, [0.97, 0.99, 1]);
    set('vinyl', S, 1.2, col, greyCanvas(S, (i) => 0.55 + low[i] * 0.2), normalCanvas(S, h, 1.2));
  }
  // Ribbed rubber floor (motion alcove).
  {
    const S = 256, fine = fbm(S, 64, 2, 31);
    const h = new Float32Array(S * S);
    const col = greyCanvas(S, (i) => {
      const y = (i / S) | 0; const rib = Math.sin((y / S) * Math.PI * 2 * 16);
      h[i] = rib; return 0.17 + rib * 0.015 + fine[i] * 0.05;
    }, [1, 1, 1.04]);
    set('ribRubber', S, 0.5, col, greyCanvas(S, (i) => 0.8 + fine[i] * 0.2), normalCanvas(S, h, 0.6));
  }
  // Painted wall, 1.2 m panels with vertical joints.
  {
    const S = 512, low = fbm(S, 4, 3, 41), fine = fbm(S, 128, 2, 42);
    const h = new Float32Array(S * S);
    const col = greyCanvas(S, (i) => {
      const x = i % S; const sd = Math.min(x, S - x);
      h[i] = sd < 2 ? -1 : fine[i] * 0.15;
      return (0.9 + low[i] * 0.04 + fine[i] * 0.015) * (sd < 2 ? 0.8 : 1);
    });
    set('wall', S, 1.2, col, null, normalCanvas(S, h, 1.4));
  }
  // Acoustic ceiling tiles on a 0.6 m grid.
  {
    const S = 256, r = rng(51);
    const col = greyCanvas(S, (i) => {
      const x = i % S, y = (i / S) | 0, sd = Math.min(x, S - x, y, S - y);
      if (sd < 4) return 0.8;
      return 0.86 - (r() < 0.06 ? 0.12 * r() : 0);
    });
    set('ceiling', S, 0.6, col, null, null);
  }
  // Satin painted housing (orange-peel), neutral white; tinted per material.
  {
    const S = 256, low = fbm(S, 4, 3, 61), fine = fbm(S, 64, 2, 62);
    const h = new Float32Array(S * S);
    for (let i = 0; i < h.length; i++) h[i] = fine[i];
    const col = greyCanvas(S, (i) => 0.95 + low[i] * 0.05 + fine[i] * 0.02);
    scratches(col, 14, 63, '#777', 0.12, 40);
    set('paint', S, 0.4, col, greyCanvas(S, (i) => 0.5 + low[i] * 0.2 + fine[i] * 0.1), normalCanvas(S, h, 0.5));
  }
  // Brushed metal: streaks along U.
  {
    const S = 512, streak = fbm(S, 256, 3, 71, 64), low = fbm(S, 4, 2, 72);
    const h = new Float32Array(S * S);
    for (let i = 0; i < h.length; i++) h[i] = streak[i];
    const col = greyCanvas(S, (i) => 0.82 + streak[i] * 0.22 + low[i] * 0.06);
    scratches(col, 20, 73, '#555', 0.15, 60);
    set('brushed', S, 0.35, col, greyCanvas(S, (i) => 0.3 + streak[i] * 0.25 + low[i] * 0.12), normalCanvas(S, h, 0.8));
  }
  // Phenolic work surface with restrained wear.
  {
    const S = 1024, low = fbm(S, 5, 4, 81), fine = fbm(S, 256, 2, 82);
    const col = greyCanvas(S, (i) => 0.26 + low[i] * 0.06 + fine[i] * 0.02, [1, 1, 1.03]);
    scratches(col, 260, 83, '#9aa0a6', 0.12, 60);
    const ctx = col.getContext('2d');
    ctx.globalAlpha = 0.07; ctx.strokeStyle = '#d8d0c0'; ctx.lineWidth = 5;
    ctx.beginPath(); ctx.arc(300, 640, 34, 0.3, 5.6); ctx.stroke();
    ctx.globalAlpha = 0.05; ctx.beginPath(); ctx.arc(760, 220, 33, 1.2, 6.0); ctx.stroke();
    ctx.globalAlpha = 1;
    const rough = greyCanvas(S, (i) => 0.55 + low[i] * 0.2 + fine[i] * 0.08);
    scratches(rough, 200, 83, '#555', 0.3, 60);
    set('worktop', S, 1.2, col, rough, null);
  }
  // Light laminate worktop (motion console desk).
  {
    const S = 512, low = fbm(S, 5, 3, 91), fine = fbm(S, 128, 2, 92);
    const col = greyCanvas(S, (i) => 0.78 + low[i] * 0.05 + fine[i] * 0.02, [1, 0.985, 0.95]);
    scratches(col, 60, 93, '#666', 0.07, 40);
    set('laminate', S, 0.8, col, greyCanvas(S, (i) => 0.5 + low[i] * 0.2), null);
  }
  // Rubber / cable sheath.
  {
    const S = 256, fine = fbm(S, 64, 3, 101);
    const h = new Float32Array(S * S);
    for (let i = 0; i < h.length; i++) h[i] = fine[i];
    set('rubber', S, 0.2, greyCanvas(S, (i) => 0.9 + fine[i] * 0.15), greyCanvas(S, (i) => 0.75 + fine[i] * 0.2), normalCanvas(S, h, 0.6));
  }
  // Hazard tape stripes.
  {
    const S = 256, c = canvas(S), ctx = c.getContext('2d');
    ctx.fillStyle = '#e2b21c'; ctx.fillRect(0, 0, S, S);
    ctx.fillStyle = '#1c1c1c';
    for (let k = -2; k < 4; k++) {
      ctx.beginPath();
      ctx.moveTo(k * 128, 0); ctx.lineTo(k * 128 + 64, 0); ctx.lineTo(k * 128 + 64 + S, S); ctx.lineTo(k * 128 + S, S); ctx.closePath(); ctx.fill();
    }
    scratches(c, 80, 111, '#777', 0.25, 30);
    set('hazard', S, 0.25, c, null, null);
  }
  // Perforated steel (vent panels, rack doors).
  {
    const S = 256, c = canvas(S), ctx = c.getContext('2d');
    ctx.fillStyle = '#c9cdd1'; ctx.fillRect(0, 0, S, S);
    const h = new Float32Array(S * S);
    ctx.fillStyle = '#16181a';
    for (let y = 0; y < 16; y++) for (let x = 0; x < 16; x++) {
      const cx = x * 16 + 8 + (y % 2) * 8, cy = y * 16 + 8;
      ctx.beginPath(); ctx.arc(cx % S, cy, 4.2, 0, Math.PI * 2); ctx.fill();
    }
    const d = ctx.getImageData(0, 0, S, S).data;
    for (let i = 0; i < S * S; i++) h[i] = d[i * 4] / 255;
    set('perf', S, 0.12, c, null, normalCanvas(S, h, 3));
  }
  return T;
}

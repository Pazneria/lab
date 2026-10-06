// Procedural canvas textures: wet setts, fabric, wood, metal, tiles, facades, signs.
import * as THREE from 'three';

let seed = 1337;
export function rand() { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }
export function setSeed(s) { seed = s; }
function hash2(x, y) { let h = (x * 374761393 + y * 668265263) | 0; h = (h ^ (h >>> 13)) * 1274126177; return ((h ^ (h >>> 16)) >>> 0) / 4294967295; }

// Tileable value noise
function vnoise(x, y, period) {
  const xi = Math.floor(x), yi = Math.floor(y);
  const xf = x - xi, yf = y - yi;
  const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
  const p = period;
  const a = hash2(((xi % p) + p) % p, ((yi % p) + p) % p);
  const b = hash2((((xi + 1) % p) + p) % p, ((yi % p) + p) % p);
  const c = hash2(((xi % p) + p) % p, (((yi + 1) % p) + p) % p);
  const d = hash2((((xi + 1) % p) + p) % p, (((yi + 1) % p) + p) % p);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}
function fbm(x, y, period, oct = 4) {
  let s = 0, amp = 0.5, f = 1, n = 0;
  for (let i = 0; i < oct; i++) { s += vnoise(x * f, y * f, period * f) * amp; n += amp; amp *= 0.5; f *= 2; }
  return s / n;
}

function canvas(w, h) { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; }

function tex(c, { srgb = true, repeat = null, aniso = 8 } = {}) {
  const t = new THREE.CanvasTexture(c);
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  if (repeat) { t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(repeat[0], repeat[1]); }
  t.anisotropy = aniso;
  t.generateMipmaps = true;
  t.minFilter = THREE.LinearMipmapLinearFilter;
  return t;
}

function heightToNormal(hgt, w, h, strength) {
  const c = canvas(w, h), ctx = c.getContext('2d');
  const img = ctx.createImageData(w, h), d = img.data;
  for (let y = 0; y < h; y++) {
    const ym = ((y - 1 + h) % h) * w, yp = ((y + 1) % h) * w, y0 = y * w;
    for (let x = 0; x < w; x++) {
      const xm = (x - 1 + w) % w, xp = (x + 1) % w;
      const dx = (hgt[y0 + xp] - hgt[y0 + xm]) * strength;
      const dy = (hgt[yp + x] - hgt[ym + x]) * strength;
      const l = Math.hypot(dx, dy, 1);
      const i = (y0 + x) * 4;
      d[i] = (-dx / l * 0.5 + 0.5) * 255; d[i + 1] = (dy / l * 0.5 + 0.5) * 255; d[i + 2] = (1 / l * 0.5 + 0.5) * 255; d[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return c;
}

// ---------- Wet granite setts ----------
export function pavingTextures() {
  const S = 1024, TW = 128, TH = 64, G = 4;
  const col = canvas(S, S), rough = canvas(S, S);
  const cctx = col.getContext('2d'), rctx = rough.getContext('2d');
  const ci = cctx.createImageData(S, S), ri = rctx.createImageData(S, S);
  const hgt = new Float32Array(S * S);
  for (let y = 0; y < S; y++) {
    const row = Math.floor(y / TH), ly = y - row * TH;
    const off = (row % 2) * (TW / 2);
    for (let x = 0; x < S; x++) {
      const xx = (x + off) % S, cIdx = Math.floor(xx / TW), lx = xx - cIdx * TW;
      const h1 = hash2(cIdx + 11, row + 7), h2 = hash2(cIdx + 91, row + 3), h3 = hash2(cIdx * 3 + 5, row * 7 + 1);
      // irregular sett edges
      const wob = (vnoise(x / 9, y / 9, S / 9) - 0.5) * 5;
      const dEdge = Math.min(lx, TW - lx, ly, TH - ly) - G + wob;
      const n = fbm(x / 22, y / 22, S / 22, 4), fine = hash2(x, y);
      const i = (y * S + x) * 4;
      let r, g, b, h, ro;
      if (dEdge < 0) {
        const gn = 0.6 + 0.4 * fine;
        r = 30 * gn; g = 31 * gn; b = 30 * gn; h = 0.05 * fine; ro = 0.62;
      } else {
        const bev = Math.min(1, dEdge / 9);
        const tone = 0.62 + 0.38 * h1;
        // granite base: blue-grey to warm-grey, darker because wet
        r = (78 + 26 * h2) * tone; g = (80 + 18 * h2) * tone; b = (84 + 6 * h3) * tone;
        const sp = fine > 0.93 ? 1.35 : fine < 0.06 ? 0.65 : 1;
        const m = (0.8 + 0.4 * n) * sp;
        r *= m; g *= m; b *= m;
        // worn, polished centre vs dusty edges
        const edgeDark = 0.82 + 0.18 * bev;
        r *= edgeDark; g *= edgeDark; b *= edgeDark;
        h = 0.35 + 0.55 * Math.sqrt(bev) + (n - 0.5) * 0.18 + (h3 - 0.5) * 0.12 + (fine - 0.5) * 0.04;
        ro = 0.30 + 0.25 * (1 - bev) + 0.22 * n + 0.1 * h2;
      }
      ci.data[i] = r; ci.data[i + 1] = g; ci.data[i + 2] = b; ci.data[i + 3] = 255;
      const rv = Math.max(0, Math.min(1, ro)) * 255;
      ri.data[i] = rv; ri.data[i + 1] = rv; ri.data[i + 2] = rv; ri.data[i + 3] = 255;
      hgt[y * S + x] = h;
    }
  }
  cctx.putImageData(ci, 0, 0); rctx.putImageData(ri, 0, 0);
  const nrm = heightToNormal(hgt, S, S, 5.0);
  return {
    map: tex(col, { repeat: [1, 1] }),
    roughnessMap: tex(rough, { srgb: false, repeat: [1, 1] }),
    normalMap: tex(nrm, { srgb: false, repeat: [1, 1] }),
  };
}

// Non-repeating puddle mask (world-space over the whole site)
export function puddleMask(pools) {
  const S = 512, c = canvas(S, S), ctx = c.getContext('2d');
  const img = ctx.createImageData(S, S), d = img.data;
  for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) {
    let v = 0;
    for (const p of pools) {
      const dx = (x / S - p[0]) / p[2], dy = (y / S - p[1]) / p[3];
      v += Math.exp(-(dx * dx + dy * dy) * 2.2) * p[4];
    }
    const n = fbm(x / 18, y / 18, 1e6, 4);
    v = v * (0.55 + 0.9 * n) - 0.28 + 0.18 * n;
    v = Math.max(0, Math.min(1, v * 2.4));
    const i = (y * S + x) * 4;
    d[i] = d[i + 1] = d[i + 2] = v * 255; d[i + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
  const t = tex(c, { srgb: false });
  t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
  return t;
}

// Animated-looking ripple normal (tileable), scrolled in shader
export function rippleNormal() {
  const S = 256, hgt = new Float32Array(S * S);
  const drops = [];
  for (let i = 0; i < 26; i++) drops.push([rand() * S, rand() * S, 8 + rand() * 26]);
  for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) {
    let h = 0;
    for (const [cx, cy, r] of drops) {
      for (let ox = -1; ox <= 1; ox++) for (let oy = -1; oy <= 1; oy++) {
        const dx = x - cx + ox * S, dy = y - cy + oy * S;
        const dd = Math.sqrt(dx * dx + dy * dy);
        if (dd < r) h += Math.sin(dd * 0.9) * (1 - dd / r) * 0.5;
      }
    }
    hgt[y * S + x] = h + (fbm(x / 16, y / 16, S / 16, 3) - 0.5) * 0.6;
  }
  const t = tex(heightToNormal(hgt, S, S, 1.2), { srgb: false, repeat: [1, 1] });
  return t;
}

// ---------- Fabric ----------
export function fabricTexture(cA, cB, stripes = 8, opts = {}) {
  const S = 512, c = canvas(S, S), ctx = c.getContext('2d');
  const sw = S / stripes;
  for (let i = 0; i < stripes; i++) { ctx.fillStyle = i % 2 ? cB : cA; ctx.fillRect(i * sw, 0, sw + 1, S); }
  if (opts.solid) { ctx.fillStyle = cA; ctx.fillRect(0, 0, S, S); }
  const img = ctx.getImageData(0, 0, S, S), d = img.data;
  for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) {
    const i = (y * S + x) * 4;
    const weave = ((x >> 1) + (y >> 1)) % 2 ? 0.94 : 1.04;
    const n = 0.86 + 0.24 * fbm(x / 40, y / 40, S / 40, 3);
    // damp sag: darker along the bottom edge (v=1) where water collects
    const wet = 1 - 0.28 * Math.pow(y / S, 3);
    const f = weave * n * wet * (0.96 + 0.08 * hash2(x, y));
    d[i] *= f; d[i + 1] *= f; d[i + 2] *= f;
  }
  ctx.putImageData(img, 0, 0);
  // stitched hem lines
  ctx.strokeStyle = 'rgba(0,0,0,0.25)'; ctx.lineWidth = 2; ctx.setLineDash([6, 5]);
  ctx.beginPath(); ctx.moveTo(0, S - 14); ctx.lineTo(S, S - 14); ctx.moveTo(0, 12); ctx.lineTo(S, 12); ctx.stroke();
  return tex(c);
}

// ---------- Wood ----------
export function woodTexture(base = [120, 82, 50], planks = 4, weathered = 0.5) {
  const S = 512, c = canvas(S, S), ctx = c.getContext('2d');
  const img = ctx.createImageData(S, S), d = img.data;
  const ph = S / planks;
  for (let y = 0; y < S; y++) {
    const p = Math.floor(y / ph), ly = y - p * ph;
    const pt = 0.8 + 0.35 * hash2(p, 3);
    for (let x = 0; x < S; x++) {
      const grain = Math.sin((x / S) * 40 + fbm(x / 60, y / 8 + p * 13, 1e6, 3) * 12) * 0.5 + 0.5;
      const n = fbm(x / 30, y / 30, 1e6, 3);
      let f = pt * (0.78 + 0.22 * grain) * (0.85 + 0.3 * n);
      if (ly < 3 || ly > ph - 3) f *= 0.35;
      f *= 1 - weathered * 0.25 * hash2(x >> 2, y >> 2);
      const i = (y * S + x) * 4;
      d[i] = base[0] * f; d[i + 1] = base[1] * f; d[i + 2] = base[2] * f; d[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return tex(c);
}

// ---------- Brushed metal ----------
export function brushedTexture() {
  const S = 256, c = canvas(S, S), ctx = c.getContext('2d');
  const img = ctx.createImageData(S, S), d = img.data;
  for (let y = 0; y < S; y++) {
    const line = hash2(7, y);
    for (let x = 0; x < S; x++) {
      const v = 0.45 + 0.25 * line + 0.2 * fbm(x / 64, y / 3, 1e6, 2) + 0.1 * hash2(x, y);
      const i = (y * S + x) * 4;
      d[i] = d[i + 1] = d[i + 2] = Math.min(255, v * 255); d[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return tex(c, { srgb: false, repeat: [2, 2] });
}

// ---------- Ceramic tiles (passage walls) ----------
export function tileTextures(color = [168, 190, 178]) {
  const S = 512, N = 8, ts = S / N;
  const c = canvas(S, S), ctx = c.getContext('2d');
  const img = ctx.createImageData(S, S), d = img.data;
  const hgt = new Float32Array(S * S);
  for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) {
    const tx = Math.floor(x / ts), ty = Math.floor(y / ts), lx = x % ts, ly = y % ts;
    const e = Math.min(lx, ts - lx, ly, ts - ly);
    const i = (y * S + x) * 4;
    const tv = 0.85 + 0.2 * hash2(tx, ty);
    const grime = 1 - 0.35 * Math.pow(1 - y / S, 0.5) * fbm(x / 50, y / 90, 1e6, 3) * 0;
    if (e < 2) { d[i] = 70; d[i + 1] = 72; d[i + 2] = 66; hgt[y * S + x] = 0; }
    else {
      const f = tv * grime * (0.95 + 0.05 * hash2(x, y));
      d[i] = color[0] * f; d[i + 1] = color[1] * f; d[i + 2] = color[2] * f;
      hgt[y * S + x] = Math.min(1, e / 5);
    }
    d[i + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
  return { map: tex(c, { repeat: [1, 1] }), normalMap: tex(heightToNormal(hgt, S, S, 2.5), { srgb: false, repeat: [1, 1] }) };
}

// ---------- Brick (ground-floor band) ----------
export function brickTextures() {
  const S = 512, BW = 64, BH = 24, c = canvas(S, S), ctx = c.getContext('2d');
  const img = ctx.createImageData(S, S), d = img.data;
  const hgt = new Float32Array(S * S);
  for (let y = 0; y < S; y++) {
    const row = Math.floor(y / BH), ly = y - row * BH, off = (row % 2) * BW / 2;
    for (let x = 0; x < S; x++) {
      const xx = (x + off) % S, bi = Math.floor(xx / BW), lx = xx - bi * BW;
      const e = Math.min(lx, BW - lx, ly, BH - ly);
      const i = (y * S + x) * 4, n = fbm(x / 14, y / 14, S / 14, 3);
      if (e < 2.5) { const g = 70 + 30 * n; d[i] = g; d[i + 1] = g * 0.97; d[i + 2] = g * 0.92; hgt[y * S + x] = 0.1 * n; }
      else {
        const h1 = hash2(bi, row), t = 0.7 + 0.45 * h1;
        const f = t * (0.8 + 0.35 * n) * (0.93 + 0.1 * hash2(x, y));
        d[i] = 104 * f; d[i + 1] = 62 * f; d[i + 2] = 50 * f;
        hgt[y * S + x] = 0.5 + 0.5 * Math.min(1, e / 6) + (n - 0.5) * 0.2;
      }
      d[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return { map: tex(c, { repeat: [1, 1] }), normalMap: tex(heightToNormal(hgt, S, S, 3), { srgb: false, repeat: [1, 1] }) };
}

// ---------- Upper facade with windows (+ emissive for lit windows) ----------
export function facadeTextures(widthM, heightM, opts = {}) {
  const PPM = 56, W = Math.min(2048, Math.round(widthM * PPM)), H = Math.min(2048, Math.round(heightM * PPM));
  const sx = W / widthM, sy = H / heightM;
  const c = canvas(W, H), ctx = c.getContext('2d');
  const e = canvas(W, H), ectx = e.getContext('2d');
  const base = opts.base || [150, 138, 120];
  const img = ctx.createImageData(W, H), d = img.data;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const n = fbm(x / 70, y / 70, 1e6, 4);
    // rain streaks running down from sills/top
    const streak = fbm(x / 3.5, y / 140, 1e6, 2);
    const f = (0.72 + 0.4 * n) * (1 - 0.32 * Math.max(0, streak - 0.45) * 2) * (0.96 + 0.06 * hash2(x, y));
    const i = (y * W + x) * 4;
    d[i] = base[0] * f; d[i + 1] = base[1] * f; d[i + 2] = base[2] * f; d[i + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
  ectx.fillStyle = '#000'; ectx.fillRect(0, 0, W, H);
  // floor bands
  const floorH = opts.floorH || 3.0;
  ctx.fillStyle = 'rgba(40,34,30,0.35)';
  for (let f = 1; f * floorH < heightM; f++) ctx.fillRect(0, H - f * floorH * sy - 4, W, 8);
  const cols = opts.cols || Math.floor(widthM / 2.6);
  const ww = 1.15, wh = 1.55;
  const winLit = opts.lit ?? 0.3;
  for (let f = 0; (f + 1) * floorH <= heightM + 0.1; f++) {
    for (let k = 0; k < cols; k++) {
      if (opts.skip && opts.skip(f, k)) continue;
      const cx = (k + 0.5) * widthM / cols, cy = heightM - (f * floorH + 1.0 + wh / 2);
      const x0 = (cx - ww / 2) * sx, y0 = (cy - wh / 2) * sy, w = ww * sx, h = wh * sy;
      // frame + recess shadow
      ctx.fillStyle = '#2a2420'; ctx.fillRect(x0 - 5, y0 - 5, w + 10, h + 10);
      const lit = rand() < winLit;
      if (lit) {
        const warm = rand() < 0.75;
        const g = ctx.createLinearGradient(0, y0, 0, y0 + h);
        g.addColorStop(0, warm ? '#f3c27c' : '#a9c4d8'); g.addColorStop(1, warm ? '#b9762f' : '#5f7d93');
        ctx.fillStyle = g; ctx.fillRect(x0, y0, w, h);
        ectx.fillStyle = g; ectx.fillRect(x0, y0, w, h);
        // curtains / silhouettes
        ctx.fillStyle = 'rgba(60,30,20,0.55)'; ectx.fillStyle = 'rgba(0,0,0,0.6)';
        const cw = w * (0.2 + rand() * 0.25);
        ctx.fillRect(x0, y0, cw, h); ectx.fillRect(x0, y0, cw, h);
        if (rand() < 0.5) { ctx.fillRect(x0 + w - cw * 0.8, y0, cw * 0.8, h); ectx.fillRect(x0 + w - cw * 0.8, y0, cw * 0.8, h); }
      } else {
        const g = ctx.createLinearGradient(0, y0, 0, y0 + h);
        g.addColorStop(0, '#1d2630'); g.addColorStop(1, '#0c1016');
        ctx.fillStyle = g; ctx.fillRect(x0, y0, w, h);
        ctx.fillStyle = 'rgba(120,150,180,0.12)'; ctx.fillRect(x0 + w * 0.1, y0 + h * 0.05, w * 0.25, h * 0.9);
      }
      // mullions
      ctx.fillStyle = '#3b332c';
      ctx.fillRect(x0 + w / 2 - 3, y0, 6, h); ctx.fillRect(x0, y0 + h * 0.36, w, 5);
      ectx.fillStyle = '#000'; ectx.fillRect(x0 + w / 2 - 3, y0, 6, h); ectx.fillRect(x0, y0 + h * 0.36, w, 5);
      // sill + streak below
      ctx.fillStyle = '#8d8578'; ctx.fillRect(x0 - 10, y0 + h + 4, w + 20, 7);
      const sg = ctx.createLinearGradient(0, y0 + h + 10, 0, y0 + h + 110);
      sg.addColorStop(0, 'rgba(30,26,22,0.45)'); sg.addColorStop(1, 'rgba(30,26,22,0)');
      ctx.fillStyle = sg; ctx.fillRect(x0 - 6, y0 + h + 10, w + 12, 100);
    }
  }
  return { map: tex(c), emissiveMap: tex(e) };
}

// ---------- Rolling shutter ----------
export function shutterTextures() {
  const S = 256, c = canvas(S, S), ctx = c.getContext('2d');
  const img = ctx.createImageData(S, S), d = img.data, hgt = new Float32Array(S * S);
  for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) {
    const ly = y % 16, i = (y * S + x) * 4;
    const rib = Math.sin(ly / 16 * Math.PI);
    const n = fbm(x / 20, y / 40, 1e6, 3);
    const rust = Math.max(0, n - 0.62) * 3;
    const g = 95 + 50 * rib;
    d[i] = g * (1 - rust * 0.2) + rust * 60; d[i + 1] = g * (1 - rust * 0.4) + rust * 20; d[i + 2] = g * (1 - rust * 0.6); d[i + 3] = 255;
    hgt[y * S + x] = rib;
  }
  ctx.putImageData(img, 0, 0);
  ctx.globalAlpha = 0.6; ctx.fillStyle = '#c84a3a'; ctx.font = 'bold 34px Impact, sans-serif';
  ctx.save(); ctx.translate(40, 170); ctx.rotate(-0.08); ctx.fillText('NO 7', 0, 0); ctx.restore();
  return { map: tex(c, { repeat: [1, 1] }), normalMap: tex(heightToNormal(hgt, S, S, 2), { srgb: false, repeat: [1, 1] }) };
}

// ---------- Painted signs ----------
export function paintedSign(w, h, { bg = '#7a1f1a', fg = '#f4dfb0', title = '', sub = '', titleFont = 'bold 120px "Microsoft YaHei", "SimHei", serif', subFont = '600 40px Georgia, serif', border = '#d9b56a', vertical = false } = {}) {
  const c = canvas(w, h), ctx = c.getContext('2d');
  ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h);
  // brush texture / wood grain under paint
  const img = ctx.getImageData(0, 0, w, h), d = img.data;
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const i = (y * w + x) * 4;
    const g = 0.86 + 0.18 * fbm(x / 90, y / 6, 1e6, 3) + 0.05 * hash2(x, y);
    d[i] *= g; d[i + 1] *= g; d[i + 2] *= g;
  }
  ctx.putImageData(img, 0, 0);
  ctx.strokeStyle = border; ctx.lineWidth = Math.max(6, w * 0.012);
  ctx.strokeRect(ctx.lineWidth * 1.5, ctx.lineWidth * 1.5, w - ctx.lineWidth * 3, h - ctx.lineWidth * 3);
  ctx.fillStyle = fg; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.shadowColor = 'rgba(0,0,0,0.35)'; ctx.shadowOffsetX = 3; ctx.shadowOffsetY = 3;
  if (vertical) {
    ctx.font = titleFont;
    const chars = [...title], step = h / (chars.length + 1);
    chars.forEach((ch, k) => ctx.fillText(ch, w / 2, step * (k + 1)));
  } else {
    ctx.font = titleFont; ctx.fillText(title, w / 2, sub ? h * 0.42 : h / 2);
    if (sub) { ctx.font = subFont; ctx.fillText(sub, w / 2, h * 0.78); }
  }
  ctx.shadowColor = 'transparent';
  // chipped paint
  for (let k = 0; k < 60; k++) {
    ctx.fillStyle = `rgba(30,20,12,${0.15 + rand() * 0.3})`;
    ctx.beginPath(); ctx.ellipse(rand() * w, rand() * h, 1 + rand() * 5, 1 + rand() * 3, rand() * 3, 0, 7); ctx.fill();
  }
  return tex(c);
}

// Neon-style sign: returns colour map (tube on dark backing) and emissive map
export function neonSign(w, h, text, color, font = 'bold 150px "Microsoft YaHei", "SimHei", sans-serif', sub = '') {
  const c = canvas(w, h), ctx = c.getContext('2d');
  const e = canvas(w, h), ectx = e.getContext('2d');
  ctx.fillStyle = '#121214'; ctx.fillRect(0, 0, w, h);
  ectx.fillStyle = '#000'; ectx.fillRect(0, 0, w, h);
  for (const [cx, alpha] of [[ctx, 1], [ectx, 1]]) {
    cx.textAlign = 'center'; cx.textBaseline = 'middle'; cx.font = font;
    cx.lineJoin = 'round';
    cx.shadowColor = color; cx.shadowBlur = 30;
    cx.strokeStyle = color; cx.lineWidth = 10; cx.globalAlpha = alpha;
    cx.strokeText(text, w / 2, sub ? h * 0.42 : h / 2);
    cx.shadowBlur = 0; cx.lineWidth = 4; cx.strokeStyle = '#fff8f0';
    cx.strokeText(text, w / 2, sub ? h * 0.42 : h / 2);
    if (sub) { cx.font = '600 46px "Segoe UI", sans-serif'; cx.fillStyle = color; cx.fillText(sub, w / 2, h * 0.82); }
  }
  ctx.strokeStyle = '#333'; ctx.lineWidth = 8; ctx.strokeRect(4, 4, w - 8, h - 8);
  return { map: tex(c), emissiveMap: tex(e) };
}

// Paper poster for passage walls
export function posterTexture(w, h, bg, fg, title, lines) {
  const c = canvas(w, h), ctx = c.getContext('2d');
  ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = fg; ctx.textAlign = 'center';
  ctx.font = 'bold 64px "Microsoft YaHei", sans-serif'; ctx.fillText(title, w / 2, 90);
  ctx.font = '24px "Segoe UI", sans-serif';
  lines.forEach((l, k) => ctx.fillText(l, w / 2, 150 + k * 34));
  ctx.fillStyle = fg; ctx.globalAlpha = 0.6; ctx.fillRect(30, h - 70, w - 60, 6);
  // weathering & tears
  ctx.globalAlpha = 1;
  const img = ctx.getImageData(0, 0, w, h), d = img.data;
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const i = (y * w + x) * 4, n = fbm(x / 40, y / 40, 1e6, 3);
    const f = 0.75 + 0.3 * n - (y / h) * 0.15;
    d[i] *= f; d[i + 1] *= f; d[i + 2] *= f * 0.95;
  }
  ctx.putImageData(img, 0, 0);
  return tex(c);
}

// Soft radial blob for contact shadows / glows
export function radialTexture(inner = 'rgba(0,0,0,1)', outer = 'rgba(0,0,0,0)', size = 128) {
  const c = canvas(size, size), ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, inner); g.addColorStop(1, outer);
  ctx.fillStyle = g; ctx.fillRect(0, 0, size, size);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

// Paper lantern texture (ribs + characters)
export function lanternTexture(color = '#c8261c', ch = '福') {
  const W = 256, H = 256, c = canvas(W, H), ctx = c.getContext('2d');
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, color); g.addColorStop(0.5, '#ff6a3a'); g.addColorStop(1, color);
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = 'rgba(80,10,5,0.45)'; ctx.lineWidth = 2;
  for (let y = 8; y < H; y += 16) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
  ctx.fillStyle = 'rgba(40,6,0,0.75)'; ctx.font = 'bold 90px "Microsoft YaHei", serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText(ch, W * 0.25, H / 2); ctx.fillText(ch, W * 0.75, H / 2);
  return tex(c);
}

// Bamboo steamer weave
export function bambooTexture() {
  const S = 256, c = canvas(S, S), ctx = c.getContext('2d');
  const img = ctx.createImageData(S, S), d = img.data;
  for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) {
    const i = (y * S + x) * 4;
    const strand = Math.sin(y / S * Math.PI * 24) * 0.5 + 0.5;
    const f = (0.75 + 0.25 * strand) * (0.85 + 0.25 * fbm(x / 20, y / 5, 1e6, 2));
    d[i] = 196 * f; d[i + 1] = 160 * f; d[i + 2] = 98 * f; d[i + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
  return tex(c, { repeat: [3, 1] });
}

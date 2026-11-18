import * as T from '../vendor/three.module.min.js';

export function random(seed) {
  let state = seed >>> 0;
  return () => {
    state += 0x6d2b79f5;
    let n = Math.imul(state ^ state >>> 15, state | 1);
    n ^= n + Math.imul(n ^ n >>> 7, n | 61);
    return ((n ^ n >>> 14) >>> 0) / 4294967296;
  };
}

export function canvas(w, h, draw) {
  const surface = document.createElement('canvas');
  surface.width = w;
  surface.height = h;
  draw(surface.getContext('2d'), w, h);
  return surface;
}

export function texture(surface, { wrap = false, linear = false } = {}) {
  const map = new T.CanvasTexture(surface);
  if (!linear) map.colorSpace = T.SRGBColorSpace;
  if (wrap) map.wrapS = map.wrapT = T.RepeatWrapping;
  map.anisotropy = 4;
  return map;
}

export function mat(color, options = {}) {
  return new T.MeshStandardMaterial({ color, roughness: 0.82, ...options });
}

function hash(x, y, k) {
  let n = Math.imul(x + 31, 374761393) ^ Math.imul(y + 61, 668265263) ^ Math.imul(k + 15, 1274126177);
  n = Math.imul(n ^ n >>> 13, 2246822519);
  return ((n ^ n >>> 16) >>> 0) / 4294967295;
}

function noise(u, v, nx, ny, key) {
  const x = Math.floor(u * nx), y = Math.floor(v * ny);
  const a = u * nx - x, b = v * ny - y;
  const s = a * a * (3 - 2 * a), t = b * b * (3 - 2 * b);
  const left = (x % nx + nx) % nx, top = (y % ny + ny) % ny;
  const right = (left + 1) % nx, bottom = (top + 1) % ny;
  const r1 = hash(left, top, key) * (1 - s) + hash(right, top, key) * s;
  const r2 = hash(left, bottom, key) * (1 - s) + hash(right, bottom, key) * s;
  return r1 * (1 - t) + r2 * t;
}

function pixels(size, paint, overpaint) {
  return canvas(size, size, (g, w, h) => {
    const image = g.createImageData(w, h);
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      const c = paint(x / w, y / h, hash(x, y, 19) - 0.5, x, y);
      const i = (y * w + x) * 4;
      image.data[i] = c[0]; image.data[i + 1] = c[1]; image.data[i + 2] = c[2]; image.data[i + 3] = 255;
    }
    g.putImageData(image, 0, 0);
    if (overpaint) overpaint(g, w, h);
  });
}

function plaster() {
  return pixels(512, (u, v, r) => {
    const wash = noise(u, v, 5, 5, 3) - 0.5;
    const sand = noise(u, v, 112, 115, 6) - 0.5;
    const trowel = noise(u + v * .08, v, 7, 21, 4) - 0.5;
    const faint = Math.max(0, noise(u, v, 17, 13, 10) - .65);
    const l = 26 * wash + 9 * trowel + 17 * sand + 10 * r - 27 * faint;
    return [218 + l, 201 + l * .98, 175 + l * .89];
  }, (g, w) => {
    const rng = random(693);
    for (let patch = 0; patch < 9; patch++) {
      const x = rng() * w, y = rng() * w;
      const rx = 20 + rng() * 84, ry = 8 + rng() * 33;
      g.save();
      g.translate(x, y);
      g.rotate(rng() - .5);
      g.scale(rx, ry);
      const wash = g.createRadialGradient(0, 0, .08, 0, 0, 1);
      wash.addColorStop(0, patch % 3 ? '#fef2ce60' : '#85533031');
      wash.addColorStop(.58, patch % 3 ? '#fef2ce2c' : '#85533015');
      wash.addColorStop(1, '#b17b3700');
      g.fillStyle = wash;
      g.fillRect(-1, -1, 2, 2);
      g.restore();
    }
    for (let i = 0; i < 6; i++) {
      let x = rng() * 470 + 17, y = rng() * 465 + 17;
      let sign = rng() > .5 ? 1 : -1;
      g.beginPath();
      g.moveTo(x, y);
      for (let j = 0; j < 6; j++) {
        x += (2 + rng() * 7) * sign;
        y += (rng() - .25) * 8;
        g.lineTo(x, y);
      }
      g.strokeStyle = '#76503956';
      g.lineWidth = .85;
      g.stroke();
    }
  });
}

function grain() {
  return pixels(512, (u, v, r) => {
    const warp = (noise(u, v, 3, 4, 3) - .5) * .055;
    const t = v + warp + Math.sin(u * Math.PI * 2) * .005;
    const lines = noise(u, t, 5, 92, 8);
    const broad = noise(u, t, 3, 18, 5) - .5;
    const fibers = noise(u, t, 7, 175, 11) - .5;
    const ring = Math.pow(Math.abs(Math.sin((t * 21 + broad * .13) * Math.PI * 2)), 16);
    const l = (lines - .5) * 22 + broad * 56 + fibers * 20 + r * 10 - ring * 15;
    return [188 + l, 157 + l * .95, 124 + l * .83];
  }, (g, w) => {
    const rng = random(613);
    for (let i = 0; i < 190; i++) {
      const x = rng() * w, y = rng() * w, len = 7 + rng() * 118;
      g.beginPath();
      g.moveTo(x, y);
      g.bezierCurveTo(x + len * .25, y + rng() * 6 - 3, x + len * .7, y + rng() * 5 - 2, x + len, y + rng() * 3);
      g.strokeStyle = i % 3 === 0 ? '#f8d4a72f' : '#60391535';
      g.lineWidth = .45 + rng() * 1.55;
      g.stroke();
    }
    for (const [x, y, n] of [[130, 139, 15], [380, 258, 11], [243, 431, 8]]) {
      for (let k = 0; k < n; k++) {
        g.beginPath();
        g.ellipse(x - 1.4 * k, y + .06 * k, 3 + 3.9 * k, .75 + .82 * k, -.07, 0, Math.PI * 2);
        g.strokeStyle = k % 4 ? '#60401b35' : '#fee1b946';
        g.lineWidth = k % 4 ? 1.2 : .7;
        g.stroke();
      }
    }
  });
}

function textile() {
  return pixels(256, (u, v, r, x, y) => {
    const warp = Math.cos(x * Math.PI) * (y % 4 === 0 ? 2 : 7);
    const weft = Math.cos(y * Math.PI / 2 + x % 2 * Math.PI) * 12;
    const uneven = (noise(u, v, 25, 26, 8) - .5) * 16 + (noise(u, v, 3, 5, 21) - .5) * 17;
    const l = 214 + warp + weft + uneven + r * 20;
    return [l, l * .986, l * .956];
  }, (g, w) => {
    const rng = random(4839);
    for (let i = 0; i < 1200; i++) {
      const x = rng() * w, y = rng() * w;
      g.beginPath();
      g.moveTo(x, y);
      g.quadraticCurveTo(x + 2, y - 2, x + 3 + rng() * 4, y);
      g.lineWidth = .55;
      g.strokeStyle = i % 2 ? '#fff6de54' : '#38221337';
      g.stroke();
    }
  });
}

function hide() {
  return pixels(256, (u, v, r) => {
    const knuckle = noise(u, v, 75, 72, 12);
    const pores = Math.pow(Math.max(0, knuckle - .45) * 1.75, 1.65) * 32;
    const age = (noise(u, v, 7, 9, 8) - .5) * 63 + (noise(u, v, 19, 21, 5) - .5) * 20;
    const l = 197 + age + pores + r * 12;
    return [l + 12, l, l - 14];
  }, (g, w) => {
    const rng = random(125);
    for (let i = 0; i < 45; i++) {
      const x = rng() * w, y = rng() * w, l = rng() * 22;
      g.beginPath();
      g.moveTo(x, y);
      g.quadraticCurveTo(x + l, y + 4, x + l * 1.15, y + 1);
      g.strokeStyle = i % 2 ? '#f7dbab47' : '#452b193a';
      g.lineWidth = .55;
      g.stroke();
    }
  });
}

function patina() {
  return pixels(256, (u, v, r) => {
    const cloud = noise(u, v, 7, 7, 13);
    const pits = noise(u, v, 67, 62, 6);
    const p = Math.max(0, .53 - cloud) * 2.3 + Math.max(0, .34 - pits);
    const l = 216 + (pits - .5) * 57 + r * 37 - p * 109;
    return [l * (1 - .33 * p), l * (.94 + .02 * p), l * (.8 + .18 * p)];
  }, (g, w) => {
    const rng = random(5132);
    for (let i = 0; i < 100; i++) {
      const x = rng() * w, y = rng() * w;
      g.strokeStyle = i % 2 ? '#fdedcb44' : '#392b1c45';
      g.lineWidth = .55;
      g.beginPath();
      g.moveTo(x, y);
      g.lineTo(x + rng() * 28, y + rng() * 12 - 4);
      g.stroke();
    }
  });
}

function stone() {
  return pixels(256, (u, v, r) => {
    const mica = (noise(u, v, 44, 35, 4) - .5) * 54;
    const swath = (noise(u, v, 7, 6, 4) - .5) * 49;
    const l = 203 + mica + swath + r * 36;
    return [l + 6, l, l - 4];
  });
}

function flatMap(surface, color, bumpScale, roughness = .86, settings = {}) {
  const map = texture(surface, { wrap: true });
  const bumpMap = texture(surface, { wrap: true, linear: true });
  return mat(color, { map, bumpMap, bumpScale, roughness, ...settings });
}

export function materials() {
  const oakMap = grain();
  const cloth = textile();
  const leatherMap = hide();
  const metal = patina();
  const plasterMap = plaster();
  const stoneMap = stone();
  const woodOptions = flatMap(oakMap, '#ffffff', .025);
  const woolOptions = flatMap(cloth, '#ffffff', .012, .98);
  const skinOptions = flatMap(leatherMap, '#ffffff', .012, .73);
  const stoneOptions = flatMap(stoneMap, '#ffffff', .028, .96);
  const metalOptions = flatMap(metal, '#ffffff', .016, .47, { metalness: .49 });
  const wallOptions = flatMap(plasterMap, '#ffffff', .014, .96);
  const variants = (base, colors) => {
    base.vertexColors = true;
    return Object.fromEntries(Object.entries(colors).map(([name, color]) => {
      const copy = base.clone();
      copy.color.set(color);
      copy.userData.batchSurface = base;
      return [name, copy];
    }));
  };
  return {
    ...variants(woodOptions, {
      timber: '#794b31', beam: '#67412e', trim: '#986343', wornEdge: '#c19364', honey: '#b9824f',
      boardA: '#b78158', boardB: '#a16e48', boardC: '#9a6243', boardD: '#bb8b64',
      painted: '#557077', weather: '#9a8069', stave: '#a77847',
    }),
    ...variants(woolOptions, {
      linen: '#f0ddbd', stitch: '#dcbb91', blanket: '#85884d', duck: '#365a57', ruby: '#913e36',
      quilt: '#a96d48', pale: '#f3e4c9', terracotta: '#b75d3a', inkCloth: '#4b5353', fadedBlue: '#677d83',
    }),
    ...variants(skinOptions, {
      leather: '#9d522e', leatherDark: '#603c2e', satchel: '#826040', booksage: '#5d6852',
      bookbrick: '#923e36', booksienna: '#ae733f', bookblue: '#435b5e',
    }),
    ...variants(stoneOptions, {
      stone: '#978879', stonePale: '#b09a82', stoneDark: '#5d564f', mortar: '#776a59',
      clay: '#ad634c', kiln: '#fa9c59', crock: '#e9d6ac', roof: '#745345', exteriorStone: '#ad8a75',
    }),
    ...variants(metalOptions, {
      bronze: '#d7a35d', brass: '#ebbc76', iron: '#777d7f', blackIron: '#4c4a48', pewter: '#84948a',
    }),
    ...variants(wallOptions, {
      wall: '#f2dec1', westWall: '#e5ccae', mapWall: '#dac5a5', outside: '#e6c9a2',
    }),
    paper: mat('#e9d3af'),
    wax: mat('#9c402e', { roughness: .5 }),
    waxCream: mat('#f3d6a6'),
    cord: mat('#a78a58'),
    soil: mat('#504336'),
    leaf: mat('#5e794b', { roughness: .88, side: T.DoubleSide }),
    leafPale: mat('#829452', { roughness: .84, side: T.DoubleSide }),
    leafDark: mat('#3e5a42', { roughness: .9, side: T.DoubleSide }),
    violet: mat('#aa7b9f', { side: T.DoubleSide }),
    petals: mat('#e0b46b', { side: T.DoubleSide }),
    ember: new T.MeshBasicMaterial({ color: '#ff6a21' }),
    fire: new T.MeshBasicMaterial({ color: '#ffc04c' }),
    flame: new T.MeshBasicMaterial({ color: '#ffe0a2' }),
    hearthVoid: new T.MeshBasicMaterial({ color: '#231610' }),
  };
}

function rosette(g, x, y, r, center, petal, rotation = 0) {
  g.save();
  g.translate(x, y);
  g.rotate(rotation);
  for (let a = 0; a < Math.PI * 2 - .01; a += Math.PI / 4) {
    g.save();
    g.rotate(a);
    g.fillStyle = petal;
    g.beginPath();
    g.moveTo(0, 1);
    g.quadraticCurveTo(r * .24, -r * .43, 0, -r);
    g.quadraticCurveTo(-r * .24, -r * .43, 0, 1);
    g.fill();
    g.restore();
  }
  g.fillStyle = center;
  g.beginPath();
  g.arc(0, 0, r * .22, 0, Math.PI * 2);
  g.fill();
  g.restore();
}

const rugs = new Map();

export function rugMaterial(sunRug = false) {
  if (rugs.has(sunRug)) return rugs.get(sunRug);
  const rng = random(sunRug ? 483 : 1441);
  const surface = canvas(512, 768, (g, w, h) => {
    const cx = w / 2, cy = h / 2;
    g.fillStyle = sunRug ? '#6e6848' : '#673832';
    g.fillRect(0, 0, w, h);
    for (const [d, c, width] of [[8, '#bb9867', 7], [19, '#c8ac81', 3], [30, '#352c29', 17], [45, '#bb9867', 5], [53, '#a4543e', 3], [61, '#ce9f6e', 2], [67, '#c89a65', 2]]) {
      g.strokeStyle = c;
      g.lineWidth = width;
      g.strokeRect(d, d, w - d * 2, h - d * 2);
    }
    for (let j = 43; j < h - 30; j += 23) for (const x of [30, w - 30]) rosette(g, x, j, 7, '#f4cea0', '#a36343', j % 2 * Math.PI / 8);
    for (let j = 53; j < w - 39; j += 23) for (const y of [30, h - 30]) rosette(g, j, y, 7, '#f4cea0', '#a36343');
    g.fillStyle = sunRug ? '#777650' : '#844e37';
    g.fillRect(69, 69, w - 138, h - 138);
    for (let y = 90; y < h - 80; y += 22) for (let x = 90; x < w - 80; x += 22) {
      g.fillStyle = (x + y) % 4 ? '#c0946452' : '#3d282838';
      g.fillRect(x - 1, y - 1, 2, 2);
    }
    for (const [sx, sy] of [[1, 1], [1, -1], [-1, 1], [-1, -1]]) {
      g.save();
      g.translate(sx > 0 ? 73 : w - 73, sy > 0 ? 73 : h - 73);
      g.scale(sx, sy);
      g.fillStyle = '#b27b51';
      g.beginPath();
      g.moveTo(0, 0); g.lineTo(101, 0); g.lineTo(0, 118); g.closePath(); g.fill();
      g.strokeStyle = '#ebc691'; g.lineWidth = 3;
      g.beginPath(); g.moveTo(3, 106); g.lineTo(90, 4); g.stroke();
      rosette(g, 26, 31, 20, '#eac78d', '#4f514a');
      g.restore();
    }
    for (const [r, color] of [[173, '#483d34'], [160, '#c18c57'], [151, '#814b37'], [135, '#c59d6b'], [127, '#4c5050'], [104, '#a77d52']]) {
      g.fillStyle = color;
      g.beginPath();
      for (let i = 0; i <= 32; i++) {
        const a = (i / 32) * Math.PI * 2;
        const m = r * (1 + .105 * Math.cos(a * 8));
        g.lineTo(cx + Math.cos(a) * m * .86, cy + Math.sin(a) * m * 1.28);
      }
      g.closePath(); g.fill();
    }
    rosette(g, cx, cy, 91, '#dfb578', '#603a34', Math.PI / 8);
    rosette(g, cx, cy, 34, '#f1d0a0', '#e2b47a');
    for (const y of [122, h - 122]) rosette(g, cx, y, 28, '#ead09c', '#cac098');
    for (let i = 0; i < 52000; i++) {
      const x = rng() * w, y = rng() * h, a = rng() * .27;
      g.fillStyle = i % 2 ? 'rgba(255,231,179,' + a + ')' : 'rgba(44,31,26,' + a + ')';
      g.fillRect(x, y, 1 + rng() * 2, .6 + rng());
    }
  });
  const map = texture(surface);
  const material = mat('#eee2cb', { map, roughness: .98 });
  rugs.set(sunRug, material);
  return material;
}

export function softShadowMaterial() {
  const map = texture(canvas(96, 96, (g) => {
    const grad = g.createRadialGradient(48, 48, 3, 48, 48, 47);
    grad.addColorStop(0, '#29160bdb');
    grad.addColorStop(.37, '#2b180dac');
    grad.addColorStop(.7, '#35201a50');
    grad.addColorStop(1, '#35201a00');
    g.fillStyle = grad;
    g.fillRect(0, 0, 96, 96);
  }));
  return new T.MeshBasicMaterial({ map, opacity: .62, transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -1 });
}

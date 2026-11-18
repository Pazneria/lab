import * as T from './vendor/three.module.min.js';
import { between, clamp, mix, pick, seeded, smooth } from './layout.js';

export function canvas(width, height = width) {
  const image = document.createElement('canvas');
  image.width = width;
  image.height = height;
  return image;
}

export function texture(image, color = true, repeat = true) {
  const result = new T.CanvasTexture(image);
  if (color) result.colorSpace = T.SRGBColorSpace;
  if (repeat) result.wrapS = result.wrapT = T.RepeatWrapping;
  result.anisotropy = 4;
  return result;
}

function noise(seed, size) {
  const random = seeded(seed);
  const samples = Float32Array.from({ length: size * size }, random);
  const wrap = n => ((n % size) + size) % size;
  return (u, v) => {
    const px = u * size, py = v * size;
    const ix = Math.floor(px), iy = Math.floor(py);
    const fx = px - ix, fy = py - iy;
    const x = fx * fx * (3 - 2 * fx), y = fy * fy * (3 - 2 * fy);
    const ax = wrap(ix), bx = wrap(ix + 1), ay = wrap(iy) * size, by = wrap(iy + 1) * size;
    return mix(mix(samples[ay + ax], samples[ay + bx], x), mix(samples[by + ax], samples[by + bx], x), y);
  };
}

function noiseLayers(seed) {
  return [5, 16, 42, 96].map((size, index) => noise(seed + index * 19, size));
}

function paintedPair(size, shader) {
  const diffuse = canvas(size);
  const relief = canvas(size);
  const ctx = diffuse.getContext('2d');
  const btx = relief.getContext('2d');
  const color = ctx.createImageData(size, size);
  const bump = btx.createImageData(size, size);
  const random = seeded(8023);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const i = (y * size + x) * 4;
      const p = shader(x / size, y / size, random() - 0.5);
      color.data[i] = p[0];
      color.data[i + 1] = p[1];
      color.data[i + 2] = p[2];
      color.data[i + 3] = 255;
      bump.data[i] = bump.data[i + 1] = bump.data[i + 2] = p[3];
      bump.data[i + 3] = 255;
    }
  }
  ctx.putImageData(color, 0, 0);
  btx.putImageData(bump, 0, 0);
  return { diffuse, relief };
}

function masonry(isBrick) {
  const [broad, cloud, grit, fine] = noiseLayers(isBrick ? 502 : 988);
  const cols = isBrick ? 12 : 4;
  const rows = isBrick ? 12 : 5;
  const colors = isBrick
    ? [[138, 79, 61], [153, 88, 65], [121, 70, 57], [154, 105, 81], [128, 78, 65], [162, 99, 77],
      [100, 66, 59], [169, 113, 87], [146, 83, 65], [118, 73, 61], [151, 98, 79]]
    : [[119, 118, 109], [110, 108, 99], [139, 134, 118], [97, 101, 95],
      [134, 128, 113], [122, 121, 115]];
  const mortar = isBrick ? [122, 112, 96] : [88, 87, 78];
  const palette = Array.from({ length: cols * rows }, () => null);
  const random = seeded(isBrick ? 1746 : 8031);
  for (let i = 0; i < palette.length; i++) palette[i] = pick(random, colors);

  return paintedPair(isBrick ? 768 : 512, (u, v, dust) => {
    const undulate = (cloud(u, v) - 0.5) * 0.078 + (fine(u, v) - 0.5) * 0.036;
    const p = v * rows;
    const row = Math.floor(p);
    const q = u * cols + 0.5 * (row % 2);
    const col = Math.floor(q) % cols;
    const bx = q - Math.floor(q);
    const by = p - row;
    const margin = Math.min(Math.min(bx, 1 - bx) * 2.15, by, 1 - by);
    const face = smooth(0.042, 0.091, margin + undulate);
    const bevel = (face - smooth(0.09, 0.19, margin + undulate)) * (by < 0.4 ? 17 : -14);
    const color = palette[row * cols + col];
    const grain = (cloud(u, v) - 0.5) * 20 + (grit(u, v) - 0.5) * 26 + dust * 19;
    const lime = smooth(0.55, 0.88, broad(u, v) * .68 + fine(u, v) * .32) * 25;
    const pits = smooth(0.5, 0.11, fine(u, v)) * 12;
    return [
      mix(mortar[0] + grain * .5, color[0] + grain + lime + bevel - pits, face),
      mix(mortar[1] + grain * .5, color[1] + grain + lime + bevel - pits, face),
      mix(mortar[2] + grain * .5, color[2] + grain + lime + bevel - pits, face),
      62 + face * 105 + grain * 1.05 - pits
    ];
  });
}

function timber(seed, bare, paint, peel, vertical) {
  const [broad, cloud, grit, fine] = noiseLayers(seed);
  const knots = [[0.24, 0.38], [0.73, 0.72], [0.85, 0.15]];
  return paintedPair(384, (u, v, dust) => {
    const a = vertical ? v : u;
    const b = vertical ? u : v;
    let wave = b + (cloud(a, b) - 0.5) * 0.038 + 0.006 * Math.sin(a * Math.PI * 4);
    let knot = 0;
    for (const [x, y] of knots) {
      const dist = ((x - a) * 4.7) ** 2 + ((y - b) * 13) ** 2;
      wave += Math.exp(-dist * 2.2) * 0.055;
      knot += Math.exp(-dist * 18) * 27;
    }
    const ribbons = (cloud(a * 0.72, wave * 4.0) - 0.5) * 30;
    const grooves = Math.pow(Math.max(0, Math.sin(wave * Math.PI * 156 + cloud(a, b))), 7) * 21;
    const grain = ribbons - grooves - knot + (fine(a * 0.47, b * 1.15) - 0.5) * 15 + dust * 7;
    const flaky = broad(a, b) * 0.36 + cloud(a * 0.81, b * 1.6) * 0.32 +
      grit(a * 0.44, b * 1.7) * 0.24 + fine(a * 0.88, b) * 0.08;
    const painted = paint ? smooth(peel - .055, peel + .014, flaky) : 0;
    const rim = paint ? smooth(peel - .062, peel - .025, flaky) - painted : 0;
    const discolor = (broad(a, b) - 0.5) * 39;
    return [
      mix(bare[0] + grain, paint ? paint[0] + grain * 0.34 : 0, painted) + discolor + rim * 15,
      mix(bare[1] + grain, paint ? paint[1] + grain * 0.34 : 0, painted) + discolor + rim * 14,
      mix(bare[2] + grain, paint ? paint[2] + grain * 0.34 : 0, painted) + discolor + rim * 11,
      135 + grain * 1.3 + painted * 15
    ];
  });
}

function slate() {
  const [broad, cloud, grit, fine] = noiseLayers(2251);
  const data = [...Array(56)].map((_, i) => ((i * 131 + i * i * 73) % 49) - 23);
  return paintedPair(512, (u, v, dust) => {
    const r = Math.floor(v * 7);
    const c = (u * 8 + r * 0.5) % 8;
    const fy = v * 7 - r;
    const fx = c - Math.floor(c);
    const chipping = (fine(u, v) - 0.5) * .024;
    const edge = smooth(0.04, 0.018, Math.min(fx, 1 - fx) + chipping);
    const overlap = smooth(0.988, 0.875, fy + chipping);
    const incline = Math.sin(u * 278 + v * 314 + grit(u, v) * 9) * 2;
    const gray = 93 + data[r * 8 + Math.floor(c)] + (broad(u, v) - .5) * 32 +
      (cloud(u, v) - .5) * 14 + dust * 9 + incline - edge * 20 - (1 - overlap) * 39;
    return [gray * .86, gray * .94, gray, 130 + gray * .26 - edge * 24 - (1 - overlap) * 46];
  });
}

function plaster() {
  const [cloud, patch, grit, fine] = noiseLayers(5658);
  return paintedPair(512, (u, v, dust) => {
    const scars = patch(u, v) * 0.66 + grit(u, v) * 0.29 + fine(u, v) * 0.05;
    const broken = smooth(.694, .738, scars);
    const blotch = cloud(u, v) * 54 + patch(u, v) * 17 + dust * 11;
    const cracked = smooth(.032, .004, Math.abs(grit(u, v) - .49)) * smooth(.61, .82, patch(u, v)) * 25;
    return [170 + blotch - broken * 59 - cracked, 164 + blotch - broken * 61 - cracked,
      145 + blotch - broken * 61 - cracked, 155 - broken * 73 - cracked + dust * 17];
  });
}

function iron() {
  const [broad, cloud, grit, fine] = noiseLayers(434);
  return paintedPair(256, (u, v, dust) => {
    const ore = broad(u, v) * .27 + cloud(u, v) * .42 + grit(u, v) * .23 + fine(u, v) * .08;
    const oxidized = smooth(.39, .65, ore);
    const spots = (fine(u, v) - .5) * 24 + dust * 12;
    return [mix(46, 129, oxidized) + spots, mix(47, 72, oxidized) + spots * .65,
      mix(41, 40, oxidized) + spots * .52, 100 + oxidized * 47 + spots];
  });
}

function steelHead() {
  const [broad, cloud, grit, fine] = noiseLayers(61451);
  return paintedPair(256, (u, v, dust) => {
    const line = (grit(u * .43, v * 2.5) - .45) * 29 + (fine(u * .42, v * 3.7) - .5) * 16;
    const pitting = smooth(.44, .72, broad(u, v) * .43 + cloud(u, v) * .57);
    const gray = 112 + line + dust * 7 - pitting * 46;
    return [gray + pitting * 12, gray + pitting * 4, gray * 1.02 - pitting * 11, gray * .64 + 73];
  });
}
function bark(birch) {
  const [broad, cloud, grit, fine] = noiseLayers(birch ? 42564 : 7426);
  return paintedPair(384, (u, v, dust) => {
    if (birch) {
      const scar = smooth(.66, .83, cloud(u * .56, v * 4.8)) * smooth(.45, .64, fine(u, v));
      const slit = smooth(.65, .87, grit(u * .51, v * 2.35)) * smooth(.1, .32, broad(u, v));
      const bands = Math.sin(v * 92 + cloud(u, v) * 5) * 11;
      const tone = 171 + bands - scar * 105 - slit * 74 + dust * 9 + broad(u, v) * 20;
      return [tone * 1.05, tone * 1.02, tone * .93, 140 + bands - scar * 44];
    }
    const weave = Math.sin((u + cloud(u * 2, v * .55) * .046) * Math.PI * 62);
    const ridges = (weave * 0.5 + 0.5) ** 4;
    const gray = 54 + broad(u, v) * 32 + grit(u * 2.7, v * .85) * 23 - ridges * 26 + dust * 9;
    return [gray * 1.12 + 6, gray * 1.01 + 5, gray * .85, 144 + gray * .34 - ridges * 39];
  });
}

function groundTile(kind) {
  const colors = {
    forest: [66, 56, 37],
    path: [109, 92, 66],
    ballast: [71, 66, 61],
    moss: [73, 79, 44]
  };
  const base = colors[kind];
  const [cloud, patch, grit, fine] = noiseLayers(kind.length * 339 + kind.charCodeAt(0));
  const pair = paintedPair(512, (u, v, dust) => {
    const fineGrain = (grit(u, v) - .5) * 26 + (fine(u, v) - .5) * 26 + dust * 25;
    const earth = (cloud(u, v) - .41) * 29 + (patch(u, v) - .48) * 22 + fineGrain;
    const green = kind === 'forest' ? smooth(.51, .8, cloud(u, v)) * 17 : 0;
    return [base[0] + earth - green * .15, base[1] + earth + green, base[2] + earth * .72 - green * .04,
      138 + fineGrain * .8];
  });

  const ctx = pair.diffuse.getContext('2d');
  const relief = pair.relief.getContext('2d');
  const random = seeded(4456 + kind.length);
  const leaf = ['#a96b36', '#aa8244', '#8e602c', '#55462b', '#745137', '#735d36', '#bb8a46'];
  const gravel = ['#837565', '#938a7f', '#655b51', '#514b45', '#3f3d39', '#7f8078'];
  const count = { forest: 1200, path: 865, ballast: 2200, moss: 680 }[kind];
  for (let i = 0; i < count; i++) {
    const x = random() * 512;
    const y = random() * 512;
    const length = between(random, 1.9, kind === 'forest' ? 12 : 7);
    const width = length * between(random, 0.38, 0.92);
    const angle = random() * Math.PI;
    for (const target of [ctx, relief]) {
      target.save();
      target.translate(x, y);
      target.rotate(angle);
      target.beginPath();
      target.moveTo(-length * .49, width * .01);
      target.lineTo(-length * .17, -width * .45);
      target.lineTo(length * .20, -width * .51);
      target.lineTo(length * .51, -width * .17);
      target.lineTo(length * .31, width * .47);
      target.lineTo(-length * .27, width * .38);
      target.closePath();
      target.fillStyle = target === relief ? pick(random, ['#b2b2b2', '#adadad', '#909090']) :
        pick(random, kind !== 'forest' ? gravel : leaf);
      target.fill();
      target.restore();
    }
  }
  return pair;
}

function drawLeaf(ctx, length, width, lobed, colors) {
  ctx.fillStyle = colors[0];
  ctx.beginPath();
  ctx.moveTo(0, length * 0.43);
  ctx.lineTo(-width * .31, length * .30);
  ctx.lineTo(-width * .46, length * .11);
  ctx.lineTo(-width * (lobed ? .31 : .5), length * .04);
  ctx.lineTo(-width * .52, -length * .13);
  ctx.lineTo(-width * .39, -length * .18);
  ctx.lineTo(-width * .30, -length * .32);
  ctx.lineTo(0, -length * .53);
  ctx.lineTo(width * .16, -length * .35);
  ctx.lineTo(width * (lobed ? .4 : .34), -length * .26);
  ctx.lineTo(width * .3, -length * .15);
  ctx.lineTo(width * .49, -length * .06);
  ctx.lineTo(width * .42, length * .19);
  ctx.lineTo(width * .21, length * .36);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = colors[1];
  ctx.lineWidth = Math.max(.48, length * .032);
  ctx.beginPath();
  ctx.moveTo(width * .034, -length * .43);
  ctx.quadraticCurveTo(-width * .11, length * .10, 0, length * .59);
  ctx.moveTo(-width * .03, length * .18);
  ctx.lineTo(-width * .34, length * .04);
  ctx.moveTo(-width * .05, length * .025);
  ctx.lineTo(width * .27, -length * .14);
  ctx.stroke();
}

function foliageAtlas() {
  const image = canvas(512);
  const ctx = image.getContext('2d');
  const random = seeded(54468);
  const palettes = [
    ['#f8dda5', '#a29163'], ['#f5e7bc', '#aaa079'], ['#d2bd86', '#827e55'],
    ['#daca9e', '#90754f'], ['#eecc94', '#9d7747'], ['#f8ebc9', '#a89052']
  ];
  for (let tile = 0; tile < 4; tile++) {
    const ox = (tile % 2) * 256;
    const oy = Math.floor(tile / 2) * 256;
    ctx.save();
    ctx.translate(ox + 128, oy + 128);
    const hand = tile % 2 ? -1 : 1;
    for (let branch = 0; branch < 6; branch++) {
      const angle = branch / 6 * Math.PI * 2 + tile * .73;
      const dx = Math.sin(angle), dy = Math.cos(angle);
      const extent = between(random, 77, 108);
      ctx.strokeStyle = '#90754e';
      ctx.lineWidth = between(random, 1.05, 2.2);
      ctx.beginPath();
      ctx.moveTo(0, 30 * hand);
      ctx.quadraticCurveTo(dx * extent * 0.50 + 9 * hand, dy * extent * .54, dx * extent, dy * extent);
      ctx.stroke();
      for (let j = 0; j < 11; j++) {
        const t = between(random, .12, 1.04);
        const width = (1.05 - t) * 51;
        const off = between(random, -width, width);
        const x = dx * extent * t + dy * off;
        const y = dy * extent * t - dx * off + (1 - t) * 18 * hand;
        const length = between(random, 14, 29);
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle + between(random, -1.32, 1.32) + Math.PI);
        drawLeaf(ctx, length, length * between(random, .48, .72), tile < 2, pick(random, palettes));
        ctx.restore();
      }
    }
    ctx.restore();
  }
  return texture(image, true, false);
}

function litterAtlas() {
  const image = canvas(256);
  const ctx = image.getContext('2d');
  const shades = [['#d2a966', '#8a642e'], ['#af8449', '#5f4425'], ['#e6c574', '#9a7337'], ['#bd9864', '#6c5129']];
  for (let i = 0; i < 4; i++) {
    ctx.save();
    ctx.translate(i % 2 * 128 + 64, Math.floor(i / 2) * 128 + 59);
    ctx.rotate([.18, -.23, .44, -.09][i]);
    drawLeaf(ctx, 114, [84, 78, 80, 68][i], i % 2 === 0, shades[i]);
    ctx.restore();
  }
  return texture(image, true, false);
}

function material(pair, scale, options = {}) {
  const { bump = .025, roughness = .88, metalness = 0, color = 0xffffff, ...rest } = options;
  const result = new T.MeshStandardMaterial({
    map: texture(pair.diffuse), bumpMap: bump ? texture(pair.relief, false) : null, bumpScale: bump,
    roughness, metalness, color, vertexColors: true, ...rest
  });
  result.userData.scale = scale;
  return result;
}

export function solid(color, options = {}) {
  const result = new T.MeshStandardMaterial({ color, roughness: .83, vertexColors: true, ...options });
  result.userData.scale = [1, 1];
  return result;
}

export function makeMaterials() {
  const brick = masonry(true);
  const stone = masonry(false);
  const wood = timber(106, [105, 84, 61], null, 0, false);
  const fadedGreen = timber(566, [94, 79, 57], [104, 115, 91], .485, true);
  const cream = timber(6625, [103, 86, 61], [181, 178, 145], .455, true);
  const enamel = timber(650, [99, 81, 57], [51, 72, 65], .404, false);
  const rust = iron();
  const groundPairs = Object.fromEntries(['forest', 'path', 'ballast', 'moss'].map(name => [name, groundTile(name)]));
  const rail = material(rust, [1.8, .18], { bump: .019, roughness: .69, metalness: .26 });
  const railTop = material(steelHead(), [1.85, .12], {
    bump: .009, color: '#b9b8ab', roughness: .46, metalness: .38
  });
  const m = {
    brick: material(brick, [2.712, .924], { bump: .029 }),
    stone: material(stone, [1.95, .93], { bump: .036 }),
    plaster: material(plaster(), [2.9, 2.35], { bump: .019, side: T.DoubleSide }),
    wood: material(wood, [1.6, .57], { bump: .024 }),
    green: material(fadedGreen, [.79, 1.78], { bump: .020 }),
    cream: material(cream, [.78, 1.7], { bump: .018 }),
    enamel: material(enamel, [1.42, .65], { bump: .018 }),
    slate: material(slate(), [2.51, 1.68], { bump: .033 }),
    iron: material(rust, [1.45, .67], { bump: .029, metalness: .22, roughness: .79 }),
    rail, railTop,
    forest: material(groundPairs.forest, [3.4, 3.4], { bump: .013 }),
    path: material(groundPairs.path, [3.4, 3.4], { bump: .012 }),
    ballast: material(groundPairs.ballast, [2.4, 2.4], { bump: .023 }),
    moss: material(groundPairs.moss, [2.3, 2.3], { bump: .018 }),
    bark: material(bark(false), [1, 2.5], { bump: .054 }),
    birch: material(bark(true), [.9, 1.8], { bump: .033 }),
    cut: material(timber(8309, [117, 87, 60], null, 0, false), [.65, .65], { bump: .018 }),
    dark: solid('#333027'), steel: solid('#787b72', { metalness: .33, roughness: .41 }),
    glass: solid('#97a9a3', { side: T.DoubleSide, transparent: true, forceSinglePass: true, depthWrite: false, opacity: .22, roughness: .38 }),
    glassEdge: solid('#b3c7b8', { side: T.DoubleSide, transparent: true, forceSinglePass: true, depthWrite: false, opacity: .53 }),
    tag: solid('#9f916e'),
    grass: solid('#ae9d67', { side: T.DoubleSide }),
    foliage: new T.MeshStandardMaterial({
      map: foliageAtlas(), vertexColors: true, alphaTest: .39, alphaToCoverage: true, side: T.DoubleSide,
      roughness: 1, emissive: '#6b4316', emissiveIntensity: .18
    }),
    litter: new T.MeshStandardMaterial({
      map: litterAtlas(), vertexColors: true, alphaTest: .42, alphaToCoverage: true, side: T.DoubleSide, roughness: .97
    })
  };
  m.barkFar = m.bark.clone();
  m.barkFar.bumpMap = null;
  m.birchFar = m.birch.clone();
  m.birchFar.bumpMap = null;
  return m;
}

export function label(image, { surface = true, transparent = false } = {}) {
  const map = texture(image, true, false);
  const result = surface
    ? new T.MeshStandardMaterial({ map, roughness: .85, side: T.DoubleSide, vertexColors: true, transparent, forceSinglePass: transparent, depthWrite: !transparent })
    : new T.MeshBasicMaterial({ map, side: T.DoubleSide, vertexColors: true, transparent, forceSinglePass: transparent, depthWrite: !transparent });
  result.userData.scale = [1, 1];
  return result;
}

export function agePaper(ctx, width, height, seed, density = 1) {
  const random = seeded(seed);
  for (let i = 0; i < 2200 * density; i++) {
    const x = random() * width;
    const y = random() * height;
    const edge = Math.min(x, y, width - x, height - y);
    const alpha = (edge < 18 ? .18 : .09) * random();
    ctx.fillStyle = random() > .34 ? 'rgba(61,39,20,' + alpha + ')' : 'rgba(250,232,182,' + alpha + ')';
    ctx.fillRect(x, y, between(random, .6, 7.5), between(random, .5, 4.5));
  }
  for (let i = 0; i < 19 * density; i++) {
    const x = random() * width;
    const y = random() * height;
    ctx.strokeStyle = 'rgba(55,43,22,' + between(random, .03, .15) + ')';
    ctx.lineWidth = between(random, .8, 4);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + between(random, -4, 4), y + between(random, 2, height * .19));
    ctx.stroke();
  }
}

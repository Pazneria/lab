import * as T from '../vendor/three.module.min.js';

export function random(seed) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = (t + Math.imul(t ^ t >>> 7, 61 | t)) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

export function between(rng, a, b) {
  return a + (b - a) * rng();
}

function surface(w, h, draw, linear = false) {
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const c = canvas.getContext('2d');
  draw(c, w, h);
  const tex = new T.CanvasTexture(canvas);
  tex.colorSpace = linear ? T.NoColorSpace : T.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

function texture(type) {
  const size = type === 'wood' ? 512 : 384;
  const rng = random(type.length * 301);
  return surface(size, size, (c, w, h) => {
    const data = c.createImageData(w, h);
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const u = x / w;
        const v = y / h;
        let tone = 228 + (rng() - .5) * 25;
        if (type === 'wood') {
          const warp = v + .010 * Math.sin(u * 11 + v * 10) + .006 * Math.sin(u * 24 - v * 17);
          const fibers = Math.sin(warp * 242) + .65 * Math.sin(warp * 589) + .44 * Math.cos(warp * 1103);
          tone = 225 + 9 * Math.sin(warp * 52) + 10 * fibers + (rng() - .5) * 13;
        } else if (type === 'stone') {
          tone += 8 * Math.sin(u * 13 + Math.sin(v * 12)) + 7 * Math.cos(v * 16 - u * 10)
            + 6 * Math.sin((u + v) * 29) + 7 * Math.cos(u * 82 + v * 91);
        } else if (type === 'plaster') {
          tone += 5 * Math.sin(u * 9 + v * 8) + 8 * Math.cos(u * 16 - Math.cos(v * 12))
            + 4 * Math.sin(v * 38 + u * 22);
        } else if (type === 'fabric') {
          tone = 206 + ((x & 1) ? 17 : -10) + ((y & 1) ? 10 : -4) + rng() * 16;
        }
        const i = (y * w + x) * 4;
        data.data[i] = tone;
        data.data[i + 1] = tone * .988;
        data.data[i + 2] = tone * .969;
        data.data[i + 3] = 255;
      }
    }
    c.putImageData(data, 0, 0);
    if (type === 'wood') {
      for (let i = 0; i < 125; i++) {
        const x = rng() * w;
        const y = rng() * h;
        const len = between(rng, 12, 180);
        c.strokeStyle = rng() < .68 ? '#45342126' : '#fff8ce45';
        c.lineWidth = between(rng, .35, 1.4);
        c.beginPath();
        c.moveTo(x, y);
        c.bezierCurveTo(x + len * .42, y - 2, x + len * .64, y + 3, x + len, y + 1);
        c.stroke();
      }
      for (let i = 0; i < 4; i++) {
        const x = rng() * w;
        const y = rng() * h;
        c.strokeStyle = '#55433043';
        for (let j = 1; j < 7; j++) {
          c.lineWidth = 1.3 - j * .12;
          c.beginPath();
          c.ellipse(x, y, 4 + j * 5, 1 + j * 1.7, -.065, 0, Math.PI * 2);
          c.stroke();
        }
      }
    } else if (type === 'stone' || type === 'plaster') {
      for (let i = 0; i < 2300; i++) {
        const r = between(rng, .2, 1.8);
        const x = rng() * w;
        const y = rng() * h;
        c.fillStyle = rng() > .54 ? '#fff7e52a' : '#5243332d';
        c.fillRect(x, y, r * 1.2, r);
      }
      if (type === 'stone') {
        c.strokeStyle = '#faf0d046';
        c.lineWidth = 1.2;
        for (let i = 0; i < 18; i++) {
          const x = rng() * w, y = rng() * h;
          c.beginPath();
          c.moveTo(x, y);
          c.lineTo(x + 20, y + 16);
          c.lineTo(x + 49, y + 25);
          c.stroke();
        }
      }
    }
  });
}

function rugTexture() {
  return surface(384, 640, (c, w, h) => {
    const rng = random(392);
    c.fillStyle = '#3f4f44';
    c.fillRect(0, 0, w, h);
    c.fillStyle = '#a7785a';
    c.fillRect(13, 18, w - 26, h - 36);
    c.fillStyle = '#534638';
    c.fillRect(26, 29, w - 52, h - 58);
    c.fillStyle = '#56685a';
    c.fillRect(43, 45, w - 86, h - 90);
    c.strokeStyle = '#bcad79';
    c.lineWidth = 2;
    c.strokeRect(49, 51, w - 98, h - 102);
    c.strokeRect(36, 38, w - 72, h - 76);
    const diamond = (x, y, a, b, color) => {
      c.fillStyle = color;
      c.beginPath();
      c.moveTo(x, y - b);
      c.lineTo(x + a, y);
      c.lineTo(x, y + b);
      c.lineTo(x - a, y);
      c.fill();
    };
    for (let y = 113; y < h - 50; y += 83) {
      for (let x = 100; x < w - 48; x += 92) {
        const off = ((y - 113) / 83) % 2 ? 28 : 0;
        if (x + off > w - 77) continue;
        diamond(x + off, y, 27, 38, '#a28560');
        diamond(x + off, y, 20, 31, '#69694f');
        diamond(x + off, y, 9, 19, '#c6b184');
      }
    }
    for (let y = 0; y < h; y += 2) {
      c.fillStyle = (y & 2) ? '#1b241b24' : '#e5cb9225';
      c.fillRect(0, y, w, 1);
    }
    for (let i = 0; i < 5200; i++) {
      c.fillStyle = rng() < .5 ? '#e4d4ae47' : '#25272149';
      c.fillRect(rng() * w, rng() * h, between(rng, .4, 3), 1);
    }
  });
}

const printNames = [
  'tea', 'flour', 'salt', 'pear', 'moon', 'iron', 'wake', 'ash',
  'mint', 'fern', 'orb', 'mallow', 'recipe', 'ledger', 'house', 'glasshouse',
];

function makePrints(enabled) {
  const texture = enabled ? surface(1024, 1024, c => {
    const names = {
      tea: ['NETTLE', 'MORNING TEA'], flour: ['OAT FLOUR', 'CUPBOARD'],
      salt: ['SEA SALT', 'COARSE'], pear: ['PEAR', 'OCTOBER'],
      moon: ['MOON SALT', 'SEALED'], iron: ['IRON INK', 'No. 04'],
      wake: ['STAY AWAKE', 'THREE DROPS'], ash: ['COLD ASH', 'HEARTH'],
      mint: ['APPLE MINT', 'pinch the tips'], fern: ['HART’S TONGUE', 'likes the shade'],
      orb: ['LANTERN VINE', 'turn weekly'], mallow: ['PENNY MALLOW', 'water sparingly'],
      house: ['BRAMBLE & KETTLE', 'PLEASE MIND THE CAT'],
      glasshouse: ['THE GLASSHOUSE', 'BOOT SCRAPER BELOW'],
    };
    printNames.forEach((key, i) => {
      const x = (i % 4) * 256;
      const y = Math.floor(i / 4) * 256;
      c.save();
      c.translate(x, y);
      if (key === 'recipe' || key === 'ledger') {
        c.fillStyle = key === 'recipe' ? '#dfcba0' : '#e4d6b1';
        c.fillRect(0, 0, 256, 256);
        c.strokeStyle = '#9e79545a';
        c.lineWidth = 2;
        c.strokeRect(11, 10, 234, 235);
        c.strokeStyle = '#956b4370';
        c.beginPath(); c.moveTo(128, 7); c.lineTo(128, 248); c.stroke();
        c.fillStyle = '#4e3227';
        c.font = 'italic 16px Georgia';
        c.fillText(key === 'recipe' ? 'Pear & thyme' : 'Salts & tinctures', 24, 34);
        const rng = random(i * 32);
        for (let row = 0; row < 12; row++) {
          const pos = 49 + row * 14;
          c.strokeStyle = row % 5 === 0 ? '#80513dbb' : '#5d514471';
          c.beginPath(); c.moveTo(23 + rng() * 8, pos);
          for (let j = 1; j <= 19; j++) c.lineTo(23 + j * 4.6, pos + between(rng, -3, 3));
          c.stroke();
        }
        c.strokeStyle = '#5b6448';
        c.lineWidth = 2.5;
        c.beginPath(); c.moveTo(167, 193); c.bezierCurveTo(179, 163, 221, 117, 214, 60); c.stroke();
        for (let b = 0; b < 9; b++) {
          c.save();
          c.translate(174 + b * 4.6, 176 - b * 12.5);
          c.rotate(b % 2 ? .8 : -.7);
          c.beginPath(); c.ellipse(0, -9, 5, 16 - b * .55, 0, 0, Math.PI * 2); c.stroke();
          c.restore();
        }
        c.font = 'italic 13px Georgia';
        c.fillText('from the north bed', 148, 226);
      } else {
        const dark = key === 'house' || key === 'glasshouse';
        const stake = i >= 8 && i <= 11;
        c.fillStyle = dark ? '#31453f' : stake ? '#a1a064' : '#d5b482';
        c.fillRect(0, 0, 256, 256);
        c.strokeStyle = dark ? '#e2bd82' : '#725337';
        c.lineWidth = 3;
        c.strokeRect(10, 15, 236, 226);
        c.lineWidth = 1.4;
        c.strokeRect(17, 22, 222, 212);
        c.fillStyle = dark ? '#f2dfaf' : '#342d24';
        c.textAlign = 'center';
        c.font = 'bold ' + (dark || stake ? 21 : 29) + 'px Georgia';
        c.fillText(names[key][0], 128, 110);
        c.font = 'italic 18px Georgia';
        c.fillText(names[key][1], 128, 158);
        c.beginPath(); c.moveTo(91, 127); c.lineTo(164, 127); c.stroke();
      }
      c.restore();
    });
  }) : null;
  const material = new T.MeshStandardMaterial({ color: enabled ? 0xffffff : 0xdccd9d,
    map: texture, roughness: .92, vertexColors: true });
  return { material, printNames };
}

export function makePalette(enabled) {
  const wood = enabled ? texture('wood') : null;
  const stone = enabled ? texture('stone') : null;
  const plaster = enabled ? texture('plaster') : null;
  const fabric = enabled ? texture('fabric') : null;
  const print = makePrints(enabled);
  function mat(color, roughness = .78, map = null, extra = {}) {
    return new T.MeshStandardMaterial({ color, roughness, map, vertexColors: true, ...extra });
  }
  const glazed = (color, emissive = 0x000000) => mat(color, .28, null, { emissive, metalness: .025 });
  const paneMap = enabled ? surface(256, 256, (c, w, h) => {
    const rng = random(440);
    c.fillStyle = '#bbddd50c'; c.fillRect(0, 0, w, h);
    const g = c.createLinearGradient(0, h, w * .63, 0);
    g.addColorStop(0, '#c9eae279'); g.addColorStop(.28, '#d6e8d132');
    g.addColorStop(.56, '#a1d5c505'); g.addColorStop(.82, '#f0faf418');
    g.addColorStop(1, '#d9eee95d');
    c.fillStyle = g; c.fillRect(0, 0, w, h);
    c.lineWidth = 1.25; c.strokeStyle = '#e9f2e975'; c.strokeRect(2, 3, w-4, h-6);
    c.strokeStyle = '#e5efed35'; c.strokeRect(6, 7, w-12, h-14);
    c.globalAlpha = .52;
    for (let i = 0; i < 82; i++) {
      const x = rng() * w, y = rng() * h;
      if (x > 25 && x < w - 25 && y < h - 48) continue;
      c.fillStyle = '#e5f2e766';
      c.beginPath(); c.ellipse(x, y, .25 + rng() * .65, .7 + rng() * 4, .08, 0, 6.3); c.fill();
    }
  }) : null;
  const aoMap = enabled ? surface(64, 64, (c, w, h) => {
    const g = c.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, 31);
    g.addColorStop(0, '#221b16c5'); g.addColorStop(.46, '#231b1685');
    g.addColorStop(.75, '#211b1539'); g.addColorStop(1, '#251b1400');
    c.fillStyle = g; c.fillRect(0, 0, w, h);
  }) : null;
  const sheenMap = enabled ? surface(64, 64, (c, w, h) => {
    const g = c.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, 31);
    g.addColorStop(0, '#95e5ce6f'); g.addColorStop(.45, '#70dabb30');
    g.addColorStop(1, '#8ce5cb00');
    c.fillStyle = g; c.fillRect(0, 0, w, h);
  }) : null;
  const m = {
    print: print.material,
    contrast: mat(0x2b2520, .97, wood),
    oak: mat(0x956543, .77, wood, { bumpMap: wood, bumpScale: .025 }),
    honey: mat(0xaf8055, .71, wood, { bumpMap: wood, bumpScale: .019 }),
    walnut: mat(0x52352a, .77, wood, { bumpMap: wood, bumpScale: .025 }),
    darkOak: mat(0x674536, .86, wood),
    rafter: mat(0x674735, .88, wood),
    ceiling: mat(0xa08768, .95, wood),
    painted: mat(0x59684c, .83, wood, { bumpMap: wood, bumpScale: .015 }),
    paintedLite: mat(0x7b8260, .79, wood),
    greenWood: mat(0x424e46, .92, wood),
    greenhouseFrame: mat(0x46675e, .52, wood, { metalness: .27 }),
    greenhouseTrim: mat(0x7d9884, .58, wood, { metalness: .11 }),
    plaster: mat(0xd1bc94, .96, plaster, { bumpMap: plaster, bumpScale: .034 }),
    workPlaster: mat(0x9a8a6c, .98, plaster, { bumpMap: plaster, bumpScale: .035 }),
    mortar: mat(0x746348, .99, stone),
    mortarCold: mat(0x696e5f, .98, stone),
    roofSlate: mat(0x505d58, .87, stone, { bumpMap: stone, bumpScale: .034 }),
    limestone: mat(0xb4a286, .86, stone, { bumpMap: stone, bumpScale: .03 }),
    foundation: mat(0x978b75, .91, stone, { bumpMap: stone, bumpScale: .042 }),
    brick: mat(0x98735d, .91, stone, { bumpMap: stone, bumpScale: .027 }),
    soapstone: mat(0x494f46, .6, stone, { bumpMap: stone, bumpScale: .02 }),
    slate: mat(0x626d67, .83, stone, { bumpMap: stone, bumpScale: .026 }),
    porcelain: glazed(0xf1dfb8),
    blueCeramic: glazed(0x446f76),
    celadon: glazed(0x8a9e77),
    ochreGlaze: glazed(0xc49551),
    berryGlaze: glazed(0x8e5044),
    porcelainShadow: mat(0xa99575, .47),
    iron: mat(0x303733, .51, null, { metalness: .51 }),
    forged: mat(0x504840, .54, null, { metalness: .49 }),
    brass: mat(0xa57d43, .36, null, { metalness: .55 }),
    tin: mat(0x9aa8a0, .38, null, { metalness: .52 }),
    copper: mat(0xaf653b, .39, null, { metalness: .53 }),
    terracotta: mat(0xb16e49, .84, stone),
    terracottaDark: mat(0x98654e, .88, stone),
    dirt: mat(0x4d4135, 1, stone, { bumpMap: stone, bumpScale: .07 }),
    rope: mat(0xbba279, .93, fabric),
    linen: mat(0xd2c199, .96, fabric, { side: T.DoubleSide }),
    stripedLinen: mat(0x8f6451, .93, fabric, { side: T.DoubleSide }),
    leaf: mat(0x638052, .78, null, { side: T.DoubleSide }),
    darkLeaf: mat(0x355f48, .78, null, { side: T.DoubleSide }),
    limeLeaf: mat(0x90a369, .75, null, { side: T.DoubleSide }),
    silverLeaf: mat(0x8ca79b, .72, null, { side: T.DoubleSide }),
    burgundyLeaf: mat(0x764b54, .76, null, { side: T.DoubleSide }),
    dryLeaf: mat(0x87805a, .84, null, { side: T.DoubleSide }),
    moss: mat(0x4b593f, 1, stone),
    soilOutside: mat(0x5f6952, .99, stone),
    stem: mat(0x536846, .89),
    root: mat(0x746044, .93),
    petal: mat(0xdbaa85, .78, null, { side: T.DoubleSide }),
    creamPetal: mat(0xe8d8a1, .65, null, { side: T.DoubleSide }),
    lilacPetal: mat(0xa78aab, .72, null, { side: T.DoubleSide }),
    fruit: glazed(0xbd9b47),
    fruitGreen: mat(0x929b47, .59, plaster),
    fruitCut: mat(0xe9d39d, .77),
    ginger: mat(0x9b7958, .86, stone),
    wax: mat(0xe1c58c, .61),
    wick: mat(0x402b20, .83),
    ember: mat(0x593929, .92, stone, { emissive: 0xdb3b0a, emissiveIntensity: .67 }),
    hot: mat(0xffb062, .73, null, { emissive: 0xff650f, emissiveIntensity: 1.4 }),
    lightWarm: mat(0xffdb99, .34, null, { emissive: 0xffac52, emissiveIntensity: 1.55 }),
    pearl: mat(0xc4e9c2, .34, null, { emissive: 0x8fd9a8, emissiveIntensity: .38 }),
    magic: mat(0x9fe3ca, .30, null, { emissive: 0x65eac9, emissiveIntensity: .96 }),
    shell: mat(0xcb9b83, .62),
    parchment: mat(0xd7bc8d, .95, fabric),
    redBook: mat(0x714337, .87, fabric),
    blueBook: mat(0x46636a, .89, fabric),
    greenBook: mat(0x535c46, .92, fabric),
    barkBook: mat(0x674a38, .88, fabric),
    rug: mat(0xffffff, 1, enabled ? rugTexture() : null, { bumpMap: fabric, bumpScale: .026 }),
    panes: new T.MeshBasicMaterial({ color: 0xe1f3ec, vertexColors: true,
      transparent: true, opacity: enabled ? .67 : .13, map: paneMap, depthWrite: false,
      side: T.DoubleSide, forceSinglePass: true }),
    shade: new T.MeshBasicMaterial({ color: 0xffffff, map: aoMap, vertexColors: true,
      transparent: true, opacity: enabled ? .57 : 0, depthWrite: false, polygonOffset: true,
      polygonOffsetFactor: -1, side: T.DoubleSide, forceSinglePass: true }),
    halo: new T.MeshBasicMaterial({ color: 0xffffff, map: sheenMap, vertexColors: true,
      transparent: true, opacity: enabled ? .72 : 0, depthWrite: false, side: T.DoubleSide,
      forceSinglePass: true, blending: T.AdditiveBlending }),
  };
  for (const [name, color, opacity] of [
    ['glassAmber', 0x9c6741, .45], ['glassOlive', 0x708152, .47],
    ['glassBlue', 0x75b0b4, .43], ['glassClear', 0xb7d3bc, .31],
    ['glassJam', 0x9a6756, .45],
  ]) {
    m[name] = mat(color, .21, null, { transparent: true, opacity: opacity,
      metalness: .18, depthWrite: false, side: T.FrontSide });
    m[name].emissive.set(color).multiplyScalar(.12);
  }
  for (const [name, color] of [
    ['infusion', 0x655728], ['jam', 0x56292c], ['syrup', 0x77562a], ['ink', 0x293c45],
    ['water', 0x557c73], ['teaLiquid', 0x955a32], ['powder', 0xb1a68f],
  ]) m[name] = mat(color, .37, null, { metalness: .05 });
  for (const [name, material] of Object.entries(m)) material.name = name;
  return { m, printNames: print.printNames };
}

import * as THREE from './vendor/three.module.min.js';

export function randomSequence(seed) {
  let state = seed >>> 0;
  return () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

export function canvas2d(width, height = width) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return [canvas, canvas.getContext('2d')];
}

export function colorTexture(canvas, repeat = true) {
  const map = new THREE.CanvasTexture(canvas);
  map.colorSpace = THREE.SRGBColorSpace;
  if (repeat) map.wrapS = map.wrapT = THREE.RepeatWrapping;
  map.anisotropy = 4;
  return map;
}

function surfaceNoise(ctx, width, height, color, variance, seed) {
  const rng = randomSequence(seed);
  const image = ctx.createImageData(width, height);
  for (let i = 0; i < image.data.length; i += 4) {
    const shade = (rng() - 0.5) * variance;
    image.data[i] = color[0] + shade;
    image.data[i + 1] = color[1] + shade;
    image.data[i + 2] = color[2] + shade;
    image.data[i + 3] = 255;
  }
  ctx.putImageData(image, 0, 0);
  return rng;
}

function wornPaint() {
  const [canvas, c] = canvas2d(256);
  const rng = surfaceNoise(c, 256, 256, [236, 235, 230], 15, 98230);
  for (let i = 0; i < 75; i++) {
    const x = rng() * 256;
    const y = rng() * 256;
    const size = 4 + rng() * 29;
    const gradient = c.createRadialGradient(x, y, 0, x, y, size);
    gradient.addColorStop(0, 'rgba(58,46,33,' + (rng() * 0.11) + ')');
    gradient.addColorStop(1, 'rgba(58,46,33,0)');
    c.fillStyle = gradient;
    c.fillRect(x - size, y - size, size * 2, size * 2);
  }
  c.lineWidth = 0.7;
  for (let i = 0; i < 38; i++) {
    const x = rng() * 255;
    const y = rng() * 256;
    c.strokeStyle = i % 3 ? 'rgba(30,32,30,0.13)' : 'rgba(255,255,241,0.52)';
    c.beginPath();
    c.moveTo(x, y);
    c.lineTo(x + 1 + rng() * 13, y + 1 + rng() * 5);
    c.stroke();
  }
  return colorTexture(canvas);
}

function brushMap() {
  const [canvas, c] = canvas2d(256, 128);
  const rng = surfaceNoise(c, 256, 128, [216, 216, 211], 23, 512124);
  for (let y = 0; y < 128; y++) {
    c.fillStyle = rng() < 0.5 ? 'rgba(27,30,31,0.19)' : 'rgba(255,255,250,0.32)';
    c.fillRect(rng() * 31 - 12, y, 210 + rng() * 60, 1);
  }
  return colorTexture(canvas);
}

function deckPlate() {
  const [canvas, c] = canvas2d(512);
  const rng = surfaceNoise(c, 512, 512, [177, 174, 163], 20, 2418);
  const panel = c.createLinearGradient(0, 0, 480, 430);
  panel.addColorStop(0, 'rgba(219,210,185,.23)');
  panel.addColorStop(0.42, 'rgba(163,151,125,.04)');
  panel.addColorStop(1, 'rgba(43,44,40,.23)');
  c.fillStyle = panel;
  c.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 91; i++) {
    const x = rng() * 512;
    const y = rng() * 512;
    const r = 8 + rng() * 68;
    const stain = c.createRadialGradient(x, y, 1, x, y, r);
    stain.addColorStop(0, 'rgba(46,44,36,' + (0.025 + 0.11 * rng()) + ')');
    stain.addColorStop(1, 'rgba(46,44,36,0)');
    c.fillStyle = stain;
    c.fillRect(x - r, y - r, r * 2, r * 2);
  }
  c.lineWidth = 1;
  for (let i = 0; i < 125; i++) {
    const x = 12 + rng() * 488;
    const y = 12 + rng() * 488;
    c.strokeStyle = i % 4 ? 'rgba(45,45,41,.23)' : 'rgba(252,242,211,.51)';
    c.beginPath();
    c.moveTo(x, y);
    c.lineTo(x + (rng() - 0.5) * 42, y + 2 + rng() * 18);
    c.stroke();
  }
  c.lineWidth = 8;
  c.strokeStyle = '#595b55';
  c.strokeRect(4, 4, 504, 504);
  c.lineWidth = 2;
  c.strokeStyle = '#bfb9a9';
  c.strokeRect(10, 10, 492, 492);
  c.strokeStyle = 'rgba(68,75,66,.63)';
  c.strokeRect(17, 17, 478, 478);
  for (const x of [24, 488]) {
    for (const y of [24, 488]) {
      c.fillStyle = '#5b5b54';
      c.beginPath();
      c.arc(x, y, 5, 0, Math.PI * 2);
      c.fill();
      c.strokeStyle = '#c5bdab';
      c.stroke();
      c.beginPath();
      c.moveTo(x - 2, y + 2);
      c.lineTo(x + 2, y - 2);
      c.stroke();
    }
  }
  return colorTexture(canvas, false);
}

function gripMap() {
  const [canvas, c] = canvas2d(256);
  const rng = surfaceNoise(c, 256, 256, [157, 163, 158], 19, 1005);
  for (let row = -1; row < 17; row++) {
    for (let col = -1; col < 17; col++) {
      c.save();
      c.translate(col * 16 + (row % 2 ? 8 : 0), row * 16);
      c.rotate(Math.PI * (rng() > 0.95 ? 0.26 : 0.25));
      c.fillStyle = '#737b77';
      c.fillRect(-4, -1, 10, 4);
      c.fillStyle = '#cbd0c2';
      c.fillRect(-4, -2, 9, 2);
      c.restore();
    }
  }
  return colorTexture(canvas);
}

function stripedMap() {
  const [canvas, c] = canvas2d(128, 64);
  const rng = surfaceNoise(c, 128, 64, [213, 175, 95], 21, 7659);
  c.strokeStyle = '#282c28';
  c.lineWidth = 27;
  for (let x = -64; x < 200; x += 64) {
    c.beginPath();
    c.moveTo(x, 64);
    c.lineTo(x + 64, 0);
    c.stroke();
  }
  for (let i = 0; i < 140; i++) {
    c.fillStyle = i % 2 ? '#71807576' : '#d5c49778';
    c.fillRect(rng() * 128, rng() * 64, 0.4 + rng() * 2.2, 0.5 + rng() * 1.3);
  }
  return colorTexture(canvas);
}

function shadowMap() {
  const [canvas, c] = canvas2d(128);
  const gradient = c.createRadialGradient(64, 64, 0, 64, 64, 63);
  gradient.addColorStop(0, 'rgba(15,18,15,0.89)');
  gradient.addColorStop(0.42, 'rgba(15,18,15,0.65)');
  gradient.addColorStop(0.76, 'rgba(15,18,15,0.22)');
  gradient.addColorStop(1, 'rgba(15,18,15,0)');
  c.fillStyle = gradient;
  c.fillRect(0, 0, 128, 128);
  return colorTexture(canvas, false);
}

export function makePalette() {
  const paintMap = wornPaint();
  const brushed = brushMap();
  const standard = (name, roughness, metalness, map = null) =>
    new THREE.MeshStandardMaterial({ name, roughness, metalness, map, vertexColors: true });
  const powderCoat = standard('Powder-coated alloy', 0.67, 0.23, paintMap);
  const enamelCoat = standard('Painted equipment enamel', 0.56, 0.27, paintMap);
  const bareSteel = standard('Brushed steel', 0.39, 0.74, brushed);
  const machined = standard('Machined alloy', 0.23, 0.83, brushed);
  const satinMetal = standard('Satin metal', 0.49, 0.66, brushed);
  const elastomer = standard('Rubber and seals', 0.86, 0.03);
  const deck = standard('Worn deck panels', 0.87, 0.19, deckPlate());
  const floorMark = standard('Painted markings', 0.87, 0.05, paintMap);
  const lens = new THREE.MeshBasicMaterial({ name: 'Task light lenses', vertexColors: true });
  const surface = (material, dye = '#ffffff') => ({ material, pigment: new THREE.Color(dye) });
  const glass = (name, opacity, color) => new THREE.MeshPhysicalMaterial({
    name, color, transparent: true, opacity, roughness: 0.18, metalness: 0.16, clearcoat: 0.57,
    side: THREE.DoubleSide, forceSinglePass: true, depthWrite: false, vertexColors: true,
  });
  return {
    hull: surface(powderCoat, '#747c76'),
    hullLight: surface(powderCoat, '#9aa099'),
    hullWarm: surface(powderCoat, '#8f9184'),
    hullDark: surface(powderCoat, '#505e5c'),
    enamel: surface(enamelCoat, '#a1ac9f'),
    ivory: surface(powderCoat, '#d0cec0'),
    teal: surface(enamelCoat, '#517979'),
    tealPale: surface(powderCoat, '#789190'),
    oxide: surface(powderCoat, '#945945'),
    maroon: surface(powderCoat, '#663b32'),
    amber: surface(enamelCoat, '#bd8646'),
    cream: surface(powderCoat, '#d0b279'),
    graphite: surface(powderCoat, '#384543'),
    dark: surface(powderCoat, '#283433'),
    black: surface(elastomer, '#171f20'),
    rubber: surface(elastomer, '#272b2a'),
    hose: surface(elastomer, '#313739'),
    gasket: surface(elastomer, '#444d48'),
    steel: surface(bareSteel, '#89958e'),
    steelDull: surface(satinMetal, '#697774'),
    tool: surface(machined, '#aeb9b0'),
    polished: surface(machined, '#c9d1c8'),
    darkSteel: surface(bareSteel, '#4d5c58'),
    copper: surface(satinMetal, '#b27b58'),
    brass: surface(satinMetal, '#b9a064'),
    floor: surface(deck, '#797b73'),
    floorDark: surface(deck, '#575d58'),
    grip: surface(standard('Rolled grip plate', 0.68, 0.43, gripMap()), '#7a8580'),
    stripe: surface(standard('Striped safety coating', 0.73, 0.23, stripedMap()), '#e0d1ac'),
    line: surface(floorMark, '#ccad71'),
    lineGrey: surface(floorMark, '#adb5a6'),
    neutralLamp: surface(lens, '#fff3db'),
    cyanLamp: surface(lens, '#8ee1e4'),
    amberLamp: surface(lens, '#ffbc70'),
    greenLamp: surface(lens, '#abdda1'),
    offLamp: surface(lens, '#394242'),
    glass: surface(glass('Machine safety glass', 0.15, '#9ec3bb')),
    viewportGlass: surface(glass('Viewport laminate', 0.085, '#8db0b6')),
    glassMark: surface(new THREE.MeshBasicMaterial({
      name: 'Glazing marks', color: '#c3ded0', opacity: 0.26, transparent: true, depthWrite: false, vertexColors: true,
    })),
    shadow: surface(new THREE.MeshBasicMaterial({
      name: 'Contact shading', map: shadowMap(), transparent: true, opacity: 0.61, depthWrite: false, vertexColors: true,
      polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -1,
    })),
  };
}

export function drawPlacards(signs) {
  const width = 512;
  const height = 144;
  const columns = 4;
  const rows = Math.ceil(signs.length / columns);
  const [canvas, c] = canvas2d(width * columns, 2 ** Math.ceil(Math.log2(height * rows)));
  const schemes = {
    light: ['#ccd0c4', '#222d2c', '#6e7f70'],
    dark: ['#253331', '#e0e4d6', '#a3a894'],
    amber: ['#d5ad69', '#272e28', '#675d46'],
    teal: ['#365d5a', '#deede3', '#b0c9b8'],
    oxide: ['#7a4d3f', '#f2e4d4', '#cf9980'],
  };
  const rng = randomSequence(9001);
  signs.forEach((sign, i) => {
    const x = i % columns * width;
    const y = Math.floor(i / columns) * height;
    const [background, ink, rule] = schemes[sign.scheme] ?? schemes.dark;
    c.fillStyle = background;
    c.fillRect(x, y, width, height);
    c.fillStyle = rule;
    c.fillRect(x + 11, y + 13, 7, height - 26);
    c.fillRect(x + 27, y + 103, width - 53, 2);
    c.fillStyle = ink;
    c.textBaseline = 'middle';
    c.font = 'bold 52px Arial, sans-serif';
    c.fillText(sign.title, x + 27, y + 60, width - 52);
    c.font = 'bold 22px Consolas, monospace';
    c.fillText(sign.subtitle, x + 28, y + 122, width - 53);
    for (let mark = 0; mark < 58; mark++) {
      c.fillStyle = mark % 2 ? '#f1e4c92d' : '#23291f39';
      c.fillRect(x + 1 + rng() * (width - 4), y + 1 + rng() * (height - 4), 0.6 + rng() * 2.2, 1);
    }
    const inset = 1.5;
    sign.uv = [
      (x + inset) / canvas.width, 1 - (y + height - inset) / canvas.height,
      (x + width - inset) / canvas.width, 1 - (y + inset) / canvas.height,
    ];
  });
  return new THREE.MeshBasicMaterial({ map: colorTexture(canvas, false), vertexColors: true, toneMapped: false });
}

export function reflectionEnvironment() {
  const [canvas, c] = canvas2d(384, 192);
  const ambient = c.createLinearGradient(0, 0, 0, 192);
  ambient.addColorStop(0, '#b3bbc0');
  ambient.addColorStop(0.25, '#899494');
  ambient.addColorStop(0.52, '#4e5c58');
  ambient.addColorStop(0.78, '#3b3d38');
  ambient.addColorStop(1, '#242a29');
  c.fillStyle = ambient;
  c.fillRect(0, 0, 384, 192);
  c.fillStyle = '#eee9d9';
  for (const x of [31, 113, 208, 302]) c.fillRect(x, 45, 51, 13);
  c.fillStyle = '#f2f7f0';
  c.fillRect(168, 7, 29, 64);
  c.fillStyle = '#c2d9dd';
  c.fillRect(28, 74, 68, 22);
  const map = colorTexture(canvas, false);
  map.mapping = THREE.EquirectangularReflectionMapping;
  return map;
}

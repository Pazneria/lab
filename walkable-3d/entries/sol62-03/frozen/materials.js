import * as THREE from './vendor/three.module.min.js';
import { random, mix } from './geometry.js';

function makeCanvas(width, height = width) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return [canvas, canvas.getContext('2d')];
}

function lattice(size, rng) {
  const samples = new Float32Array(size * size);
  for (let i = 0; i < samples.length; i += 1) samples[i] = rng();
  return (u, v) => {
    const x = u * size;
    const y = v * size;
    const i = Math.floor(x);
    const j = Math.floor(y);
    const u0 = x - i;
    const v0 = y - j;
    const sx = u0 * u0 * (3 - 2 * u0);
    const sy = v0 * v0 * (3 - 2 * v0);
    const x0 = (i % size + size) % size;
    const y0 = (j % size + size) % size;
    const x1 = (x0 + 1) % size;
    const y1 = (y0 + 1) % size;
    return mix(mix(samples[y0 * size + x0], samples[y0 * size + x1], sx),
      mix(samples[y1 * size + x0], samples[y1 * size + x1], sx), sy);
  };
}

function texture(canvas, color = true, repeat = true) {
  const map = new THREE.CanvasTexture(canvas);
  if (color) map.colorSpace = THREE.SRGBColorSpace;
  if (repeat) map.wrapS = map.wrapT = THREE.RepeatWrapping;
  map.anisotropy = 4;
  return map;
}

function surface(seed, base, style, withBump = true) {
  const size = 256;
  const [canvas, ctx] = makeCanvas(size);
  const image = ctx.createImageData(size, size);
  const bumpCanvas = withBump ? makeCanvas(size) : null;
  const bumpImage = bumpCanvas?.[1].createImageData(size, size);
  const rng = random(seed);
  const swells = lattice(5, rng);
  const patches = lattice(14, rng);
  const aggregate = lattice(32, rng);
  const grit = lattice(64, rng);
  const fibers = lattice(23, rng);
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const u = x / size;
      const v = y / size;
      const slow = swells(u, v) - 0.5;
      const mid = patches(u, v) - 0.5;
      const small = aggregate(u, v) - 0.5;
      const tiny = grit(u, v) - 0.5;
      const pixel = rng() - 0.5;
      let value = slow * 17 + mid * 11 + small * 10 + tiny * 8 + pixel * 9;
      let relief = 141 + mid * 18 + small * 14 + tiny * 21 + pixel * 14;
      let hue = 0;
      if (style === 'plaster') {
        const pores = Math.min(0, tiny + pixel * 0.38 + 0.32);
        const sweep = Math.sin(6.28318 * (v * 3 + u + swells(u, v) * 0.11));
        value += pores * 96 + sweep * 1.8;
        relief += pores * 135;
        hue = slow * 3.5 + (mid < -0.21 ? -3 : 0);
      } else if (style === 'sandstone') {
        const vein = Math.sin((v * 12 + u * 2 + swells(u, v) * 0.57) * Math.PI * 2);
        const narrow = Math.pow(Math.max(vein, 0), 12);
        value += vein * 2.7 - narrow * (4 + mid * 6) + pixel * 6;
        relief += vein * 5 + pixel * 10;
        hue = narrow * 4 + mid * 4;
      } else if (style === 'bronze') {
        const pits = Math.max(0, swells(u, v) + small * 0.38 + tiny * 0.25 - 0.53);
        value += 7 - pits * 39 + pixel * 7;
        hue = 4 - 33 * pits;
        relief -= pits * 47;
      } else if (style === 'tile') {
        value = slow * 12 + mid * 6 + tiny * 3 + pixel * 2;
        const pool = Math.max(0, mid + small * 0.42 + 0.08);
        hue = -pool * 13;
        relief = 158 + slow * 8 + mid * 7;
      } else if (style === 'wood') {
        const line = (u * 31 + fibers(u, v * 0.052) * 2.6 + Math.sin(v * Math.PI * 2) * 0.16) * Math.PI * 2;
        const grain = Math.sin(line) + Math.sin(line * 3.0) * 0.32;
        const opening = Math.pow(Math.max(0, grain * 0.8), 5);
        value = slow * 13 + small * 9 + grain * 6 - opening * 11 + pixel * 7;
        relief = 150 + small * 10 + grain * 14 - opening * 22;
        hue = grain * 4;
      } else if (style === 'sand') {
        value = slow * 11 + mid * 6 + small * 11 + tiny * 15 + pixel * 21;
        relief = 143 + tiny * 24 + pixel * 31;
      }
      const i = (y * size + x) * 4;
      image.data[i] = base[0] + value + hue;
      image.data[i + 1] = base[1] + value;
      image.data[i + 2] = base[2] + value - hue;
      image.data[i + 3] = 255;
      if (bumpImage) {
        bumpImage.data[i] = bumpImage.data[i + 1] = bumpImage.data[i + 2] = relief;
        bumpImage.data[i + 3] = 255;
      }
    }
  }
  ctx.putImageData(image, 0, 0);
  if (bumpImage) bumpCanvas[1].putImageData(bumpImage, 0, 0);
  return { map: texture(canvas), bumpMap: bumpCanvas ? texture(bumpCanvas[0], false) : null };
}

function driftTexture() {
  const width = 128;
  const [canvas, context] = makeCanvas(width);
  const image = context.createImageData(width, width);
  const rng = random(385);
  const lumps = lattice(8, rng);
  const wave = lattice(19, rng);
  for (let y = 0; y < width; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const u = (x / (width - 1) - 0.5) * 2;
      const v = (y / (width - 1) - 0.5) * 2;
      const factor = Math.hypot(u, v) + (lumps(x / width, y / width) - 0.5) * 0.18;
      const flicker = rng();
      const grain = (flicker - 0.5) * 34;
      const ridge = Math.sin((v * 9 + wave(x / width, y / width) * 0.8) * Math.PI) * 3.7;
      const i = (y * width + x) * 4;
      image.data[i] = 199 + grain + ridge;
      image.data[i + 1] = 163 + grain + ridge;
      image.data[i + 2] = 117 + grain + ridge;
      image.data[i + 3] = Math.min(1, Math.max(0, 1.10 - factor * 1.24)) *
        (228 + flicker * 27) * (Math.abs(u) > 0.94 || Math.abs(v) > 0.94 ? 0 : 1);
    }
  }
  context.putImageData(image, 0, 0);
  return texture(canvas, true, false);
}

function standard(name, options) {
  const material = new THREE.MeshStandardMaterial({ vertexColors: true, ...options });
  material.name = name;
  return material;
}

function reflectedChamber() {
  const width = 256;
  const height = 128;
  const pixels = new Uint16Array(width * height * 4);
  const toHalf = THREE.DataUtils.toHalfFloat;
  for (let y = 0; y < height; y += 1) {
    const elevation = ((y + 0.5) / height - 0.5) * Math.PI;
    const up = Math.sin(elevation);
    const across = Math.cos(elevation);
    for (let x = 0; x < width; x += 1) {
      const azimuth = ((x + 0.5) / width - 0.5) * Math.PI * 2;
      const dx = across * Math.cos(azimuth);
      const dz = across * Math.sin(azimuth);
      const wall = 0.11 + Math.max(0, -up) * 0.14 + dx * dx * 0.064;
      const entry = Math.pow(Math.max(0, dz), 50) * Math.exp(-((up - 0.08) ** 2) * 21);
      const terrace = Math.pow(Math.max(0, dx), 51) * Math.exp(-((up - 0.018) ** 2) * 20);
      const slot = Math.pow(Math.max(0, -dx * 0.87 + dz * 0.47), 20) *
        Math.min(1, Math.max(0, up * 6 - 0.9));
      const sky = Math.max(0, up) ** 3 * 0.18;
      const i = (y * width + x) * 4;
      pixels[i] = toHalf(wall + entry * 0.73 + terrace * 0.89 + slot * 1.11 + sky * 0.42);
      pixels[i + 1] = toHalf(wall * 0.79 + entry * 0.48 + terrace * 0.78 + slot * 1.26 + sky * 0.71);
      pixels[i + 2] = toHalf(wall * 0.57 + entry * 0.25 + terrace * 0.73 + slot * 1.34 + sky);
      pixels[i + 3] = toHalf(1);
    }
  }
  const map = new THREE.DataTexture(pixels, width, height, THREE.RGBAFormat, THREE.HalfFloatType);
  map.mapping = THREE.EquirectangularReflectionMapping;
  map.colorSpace = THREE.LinearSRGBColorSpace;
  map.minFilter = map.magFilter = THREE.LinearFilter;
  map.needsUpdate = true;
  return map;
}

export function createMaterials(useReflections = false) {
  const reflections = useReflections ? reflectedChamber() : null;
  const reflecting = intensity => ({ envMap: reflections, envMapIntensity: intensity });
  const plaster = surface(71, [235, 222, 193], 'plaster');
  const limestone = surface(94, [220, 199, 164], 'sandstone');
  const cliff = surface(19, [223, 193, 155], 'sandstone');
  const bronze = surface(134, [176, 151, 95], 'bronze');
  const ceramic = surface(675, [165, 184, 169], 'tile');
  const wood = surface(32, [138, 103, 75], 'wood');
  const sand = surface(91, [219, 188, 147], 'sand', false);
  return {
    plaster: standard('lime plaster', { ...plaster, bumpScale: 0.035, roughness: 0.94 }),
    innerPlaster: standard('interior lime plaster', { ...plaster, color: 0xf0e6cf, bumpScale: 0.03, roughness: 0.96 }),
    stone: standard('cut limestone', { ...limestone, bumpScale: 0.034, roughness: 0.93 }),
    paving: standard('worn paving', { ...limestone, color: 0xe9ddc6, bumpScale: 0.024, roughness: 0.88 }),
    grout: standard('mortar and joints', { color: 0x887762, roughness: 1 }),
    rock: standard('sandstone strata', { ...cliff, bumpScale: 0.039, roughness: 1 }),
    earth: standard('plateau sand', { ...sand, roughness: 1 }),
    distance: standard('distant terrain', { color: 0xf1bf8c, roughness: 1 }),
    dome: standard('fired dome tiles', { ...plaster, color: 0xe6caa3, bumpScale: 0.027, roughness: 0.83 }),
    domeInside: standard('dome lining', { ...limestone, color: 0xa48266, bumpScale: 0.02, roughness: 0.94 }),
    bronze: standard('worn bronze', { ...bronze, bumpScale: 0.013, color: 0xf0d7a4, metalness: 0.49, roughness: 0.47, ...reflecting(0.84) }),
    brass: standard('brass and polished edges', { ...bronze, bumpScale: 0.007, color: 0xffde9f, metalness: 0.43, roughness: 0.33, ...reflecting(1.05) }),
    patina: standard('verdigris and oxidized bronze', { ...bronze, color: 0x86a7a1, metalness: 0.37, roughness: 0.62, bumpScale: 0.011, ...reflecting(0.74) }),
    darkMetal: standard('blackened metal', { color: 0x424b47, metalness: 0.49, roughness: 0.55, ...reflecting(0.63) }),
    black: standard('recesses', { color: 0x151c19, roughness: 0.92 }),
    tile: standard('cool glazed ceramic', { ...ceramic, bumpScale: 0.013, metalness: 0.12, roughness: 0.29, ...reflecting(0.44) }),
    wood: standard('cedar grain', { ...wood, bumpScale: 0.021, roughness: 0.85 }),
    glass: new THREE.MeshPhysicalMaterial({
      name: 'blue-green optical glass', color: 0x186874, roughness: 0.17,
      metalness: 0.42, clearcoat: 0.76, clearcoatRoughness: 0.12,
      emissive: 0x0c2224, emissiveIntensity: 0.7, ...reflecting(1.18),
    }),
    glare: new THREE.MeshBasicMaterial({ name: 'small sky glints', color: 0x92d2c9 }),
    paper: standard('vellum edges', { color: 0xd4c79c, roughness: 0.97 }),
    dryPlant: standard('desert grasses', { color: 0xc3ad74, roughness: 0.97, side: THREE.DoubleSide }),
    sandDrift: standard('windblown sand fringe', {
      map: driftTexture(), roughness: 1, transparent: true, depthWrite: false, alphaTest: 0.021, polygonOffset: true,
      polygonOffsetFactor: -1, polygonOffsetUnits: -1,
    }),
  };
}

export function illustrations() {
  const [panel, ctx] = makeCanvas(512, 192);
  ctx.fillStyle = '#bca36c';
  ctx.fillRect(0, 0, 512, 192);
  const border = ctx.createLinearGradient(0, 0, 512, 192);
  border.addColorStop(0, '#513c28');
  border.addColorStop(0.35, '#c9ac70');
  border.addColorStop(1, '#553a26');
  ctx.strokeStyle = border;
  ctx.lineWidth = 8;
  ctx.strokeRect(4, 4, 504, 184);
  ctx.fillStyle = '#343026';
  ctx.textAlign = 'center';
  ctx.font = '24px Georgia';
  ctx.fillText('M E R I D I A N', 256, 60);
  ctx.font = '48px Georgia';
  ctx.fillText('TRANSIT', 256, 117);
  ctx.font = '21px Georgia';
  ctx.fillText('A Z I M U T H   •   A L T I T U D E', 256, 155);

  const [chart, c] = makeCanvas(512, 320);
  c.fillStyle = '#d7c690';
  c.fillRect(0, 0, 512, 320);
  const stain = c.createRadialGradient(250, 140, 50, 250, 140, 290);
  stain.addColorStop(0, '#f4e6b8');
  stain.addColorStop(1, '#a98e58');
  c.fillStyle = stain;
  c.fillRect(0, 0, 512, 320);
  c.strokeStyle = '#5b6a64';
  c.lineWidth = 2;
  c.strokeRect(14, 14, 484, 292);
  c.fillStyle = '#314748';
  c.font = '21px Georgia';
  c.fillText('Plate of the Evening Sky', 40, 47);
  const skyX = 157;
  const skyY = 173;
  const r = 99;
  c.save();
  c.beginPath();
  c.arc(skyX, skyY, r, 0, Math.PI * 2);
  c.clip();
  c.strokeStyle = '#778277';
  for (let i = 0; i <= 8; i += 1) {
    c.beginPath();
    c.ellipse(skyX, skyY, i * r / 8, r, 0, 0, Math.PI * 2);
    c.stroke();
  }
  for (let i = -3; i <= 3; i += 1) {
    c.beginPath();
    c.moveTo(50, skyY + 26 * i);
    c.lineTo(268, skyY + 26 * i);
    c.stroke();
  }
  const rng = random(74);
  for (let group = 0; group < 7; group += 1) {
    const startX = skyX + (rng() - 0.5) * 155;
    const startY = skyY + (rng() - 0.5) * 155;
    c.beginPath();
    c.moveTo(startX, startY);
    for (let i = 0; i < 6; i += 1) {
      const x = startX + (rng() - 0.5) * 55;
      const y = startY + (rng() - 0.5) * 55;
      c.lineTo(x, y);
      c.fillRect(x - 1, y - 1, 3, 3);
    }
    c.strokeStyle = '#36545b';
    c.stroke();
  }
  c.restore();
  c.beginPath();
  c.arc(skyX, skyY, r, 0, Math.PI * 2);
  c.stroke();
  c.font = '17px Georgia';
  c.fillText('Altitude', 288, 103);
  c.fillText('Azimuth', 288, 170);
  c.fillText('Local transit', 288, 236);
  c.font = 'italic 14px Georgia';
  c.fillText('at the western rim', 290, 271);
  c.strokeStyle = '#a1845f';
  for (const y of [113, 138, 180, 205, 246]) {
    c.beginPath();
    c.moveTo(289, y);
    c.lineTo(466, y);
    c.stroke();
  }

  const [sign, s] = makeCanvas(512, 200);
  s.fillStyle = '#386561';
  s.fillRect(0, 0, 512, 200);
  s.strokeStyle = '#d6c191';
  s.lineWidth = 4;
  s.strokeRect(12, 12, 488, 176);
  s.strokeStyle = '#d4ceb0';
  s.lineWidth = 1.5;
  s.strokeRect(22, 22, 468, 156);
  s.fillStyle = '#e8dcb8';
  s.textAlign = 'center';
  s.font = '49px Georgia';
  s.fillText('MERIDIAN', 256, 92);
  s.font = '26px Georgia';
  s.fillText('O B S E R V A T O R Y', 256, 140);

  const [way, w] = makeCanvas(360, 104);
  w.fillStyle = '#b6a177';
  w.fillRect(0, 0, 360, 104);
  w.strokeStyle = '#544c38';
  w.lineWidth = 3;
  w.strokeRect(6, 6, 348, 92);
  w.font = '26px Georgia';
  w.textAlign = 'center';
  w.fillStyle = '#344441';
  w.fillText('VIEWING TERRACE  →', 180, 62);

  const art = (name, image, roughness) => standard(name, { map: texture(image, true, false), roughness });
  return {
    maker: art('instrument maker plate', panel, 0.55),
    chart: art('evening sky chart', chart, 0.94),
    sign: art('enameled entrance plaque', sign, 0.41),
    way: art('terrace direction plate', way, 0.77),
  };
}

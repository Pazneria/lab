import * as T from 'three';
import { seeded } from './kit.js';

const byte = value => Math.max(0, Math.min(255, value));

function dataTexture(width, height, getPixel, srgb = false) {
  const bytes = new Uint8Array(width * height * 4);
  let i = 0;
  for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
    const sample = getPixel(x, y);
    if (typeof sample === 'number') {
      bytes[i++] = byte(sample); bytes[i++] = byte(sample); bytes[i++] = byte(sample); bytes[i++] = 255;
    } else {
      bytes[i++] = byte(sample[0]); bytes[i++] = byte(sample[1]); bytes[i++] = byte(sample[2]); bytes[i++] = sample[3] ?? 255;
    }
  }
  const texture = new T.DataTexture(bytes, width, height);
  if (srgb) texture.colorSpace = T.SRGBColorSpace;
  texture.wrapS = texture.wrapT = T.RepeatWrapping;
  texture.magFilter = T.LinearFilter;
  texture.minFilter = T.LinearMipmapLinearFilter;
  texture.generateMipmaps = true;
  texture.needsUpdate = true;
  return texture;
}

function surfaceTextures() {
  const rng = seeded(7017);
  const grain = [];
  for (let y = 0; y < 128; y++) grain.push(rng() - 0.5);
  const plaster = dataTexture(128, 128, (x, y) =>
    232 + 7 * Math.sin(x * 0.34) * Math.sin(y * 0.54) + 12 * rng(), true);
  const grit = dataTexture(128, 128, (x, y) =>
    200 + 34 * rng() + 6 * Math.cos(x * 0.19 + Math.sin(y * 0.33)), true);
  const brush = dataTexture(128, 128, (x, y) =>
    220 + 21 * grain[y] + 10 * rng() + 12 * Math.cos(y * 0.79) * Math.cos(x * 0.05), true);
  const weave = dataTexture(128, 128, (x, y) => {
    const thread = Math.cos(x * Math.PI * 0.5) * (Math.floor(y / 2) % 2 ? 1 : -1)
      + Math.cos(y * Math.PI * 0.5) * (Math.floor(x / 2) % 2 ? -1 : 1);
    return 218 + 15 * thread + 9 * rng();
  }, true);
  const paper = dataTexture(128, 128, (x, y) => 235 + 9 * rng() + 5 * Math.cos(x * 0.21 + y * 0.66), true);
  const wood = dataTexture(256, 128, (x, y) => {
    const front = y + 1.7 * Math.sin(x * 0.046 + y * 0.055) + 0.7 * Math.sin(x * 0.13 + y * 0.095);
    const grain = 8 * Math.sin(front * 0.76) + 5 * Math.cos(front * 1.61) + 9 * Math.cos(front * 0.23);
    const fiber = 5 * Math.sin((y + Math.sin(x * 0.035)) * 2.52) + 5 * rng();
    return [231 + grain + fiber, 222 + grain * 1.25 + fiber, 209 + grain * 1.27 + fiber];
  }, true);
  const ao = dataTexture(64, 64, (x, y) => {
    const dx = Math.abs((x + 0.5) / 32 - 1), dy = Math.abs((y + 0.5) / 32 - 1);
    const radius = Math.pow(dx ** 3.5 + dy ** 3.5, 1 / 3.5);
    const alpha = Math.max(0, 1 - radius * radius) ** 2.2;
    return [255, 255, 255, 255 * alpha];
  });
  ao.wrapS = ao.wrapT = T.ClampToEdgeWrapping;
  return { plaster, grit, brush, weave, paper, wood, ao };
}

export function environmentMap() {
  const width = 256, height = 128;
  const texture = dataTexture(width, height, (x, y) => {
    const u = x / width, v = y / height;
    const lobe = (a, b, w, h) => Math.exp(-((u - a) ** 2 / w + (v - b) ** 2 / h));
    const neutral = lobe(0.19, 0.25, 0.024, 0.027);
    const warm = lobe(0.73, 0.33, 0.018, 0.028);
    const cool = lobe(0.49, 0.45, 0.010, 0.026);
    return [54 + 112 * neutral + 101 * warm + 39 * cool,
      57 + 116 * neutral + 80 * warm + 75 * cool,
      63 + 122 * neutral + 54 * warm + 109 * cool];
  }, true);
  texture.wrapT = T.ClampToEdgeWrapping;
  texture.mapping = T.EquirectangularReflectionMapping;
  return texture;
}

export function materials() {
  const t = surfaceTextures();

  function standard(name, color, roughness, metalness = 0, map = null, uvRate = null, bumpScale = 0) {
    const material = new T.MeshStandardMaterial({ color, roughness, metalness, map });
    material.name = name;
    material.userData.uvRate = uvRate;
    if (map && bumpScale) {
      material.bumpMap = map;
      material.bumpScale = bumpScale;
    }
    return material;
  }

  function paint(name, color, roughness = 0.75) {
    return standard(name, color, roughness, 0.06, t.plaster, [2.1, 2.1], 0.002);
  }

  function fabric(name, color, rate = 3.5) {
    return standard(name, color, 0.96, 0, t.weave, [rate, rate], 0.009);
  }

  function metal(name, color, roughness = 0.41, metallic = 0.7) {
    return standard(name, color, roughness, metallic, t.brush, [0.9, 3.1], 0.0014);
  }

  function lamp(name, color, intensity) {
    const material = new T.MeshStandardMaterial({
      color, roughness: 0.45, emissive: color, emissiveIntensity: intensity
    });
    material.name = name;
    return material;
  }

  function occlusion(name, color, opacity) {
    const material = new T.MeshBasicMaterial({
      color, map: t.ao, transparent: true, opacity, depthWrite: false, toneMapped: false,
      polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -1
    });
    material.name = name;
    return material;
  }

  return {
    substrate: paint('Hull infill', '#454f54'),
    chalk: paint('Warm composite', '#c4bfaa', 0.67),
    ivory: paint('Enamel faceplates', '#ded6bc', 0.67),
    greige: paint('Putty composite', '#a7a28f'),
    mushroom: paint('Grey composite', '#8b8d81'),
    lining: paint('Storm-blue composite', '#475963'),
    blue: paint('Deep blue-green enamel', '#25454f', 0.64),
    graphite: paint('Graphite powder coat', '#303e44'),
    ink: paint('Soft-black resin', '#17242a'),
    oxblood: paint('Oxblood enamel', '#6d3434'),
    orange: paint('Ochre markings', '#a97a42'),
    green: paint('Grey sage composite', '#6f8273'),
    gasket: standard('Rubber gaskets', '#151e21', 0.98),
    deck: standard('Fine aggregate deck', '#50585a', 0.9, 0.03, t.grit, [2.4, 2.4], 0.004),
    runway: standard('Nonslip walk strip', '#535f60', 0.9, 0.03, t.grit, [3.4, 3.4], 0.008),
    deckDark: standard('Charcoal deck', '#303d43', 0.89, 0.05, t.grit, [2.4, 2.4], 0.007),
    steel: metal('Satin titanium', '#a7aca5', 0.44),
    nickel: metal('Smoked nickel', '#667780', 0.46),
    darkMetal: metal('Gunmetal anodizing', '#3d4b50', 0.47),
    bronze: metal('Brushed bronze', '#9e7253', 0.47, 0.64),
    ash: standard('Oiled ash veneer', '#aa7650', 0.58, 0, t.wood, [0.90, 1.15], 0.005),
    darkWood: standard('Dark end grain', '#754a34', 0.64, 0, t.wood, [1.0, 1.7], 0.004),
    wovenWall: fabric('Woven acoustic backing', '#57635d', 5.2),
    pillow: fabric('Flax pillow ticking', '#d4bb96', 4.8),
    pillowEdge: fabric('Pillow welt', '#dfc7a3', 6),
    rustPillow: fabric('Russet lambswool', '#a76e4d', 5),
    sheet: fabric('Warm-white percale', '#ddcfb2', 4.5),
    duvet: fabric('Petrol linen quilt', '#627e7e', 4.2),
    seam: fabric('Quilt cotton stitching', '#90a7a0', 7),
    throw: fabric('Oxide wool blanket', '#96534b', 5),
    throwEdge: fabric('Wool jacquard accent', '#c58e71', 6),
    rug: fabric('Coarse flax mat', '#997d60', 5.8),
    rugEdge: fabric('Mat binding', '#6b5546', 5),
    leather: fabric('Tawny upholstery', '#9c684d', 5.8),
    darkLeather: fabric('Blue seat upholstery', '#405e66', 5.6),
    seatEdge: fabric('Seat piping', '#587a83', 6.8),
    book: fabric('Umber bookcloth', '#715447', 6),
    binder: fabric('Document binder canvas', '#434e56', 5),
    pages: standard('Uncoated paper', '#cbbda1', 0.93, 0, t.paper, [2, 2], 0.001),
    ceramic: standard('Glazed green ceramic', '#73897b', 0.29),
    porcelain: standard('Bone porcelain', '#d0c1a0', 0.31),
    tea: standard('Tea', '#412c21', 0.21),
    soil: standard('Potting soil', '#3b2e28', 1, 0, t.grit, [3, 3], 0.02),
    foliage0: standard('Sage leaves', '#718859', 0.85),
    foliage1: standard('Bright leaves', '#8b995f', 0.88),
    foliage2: standard('Deep leaves', '#4a693f', 0.86),
    greenLine: lamp('Status diode mint', '#a2cdb0', 0.64),
    yellowLine: lamp('Status diode amber', '#d1a368', 0.72),
    warmLight: lamp('Warm opal lens', '#ffe1af', 2.0),
    whiteLight: lamp('Neutral opal lens', '#fff3d8', 1.78),
    coolLight: lamp('Cool opal lens', '#bfdfeb', 1.28),
    ambientShadow: occlusion('Furniture contact shadows', '#151b1e', 0.64),
    softShadow: occlusion('Soft recess shadows', '#131c1f', 0.37)
  };
}

export function canvasMaterial(name, width, height, draw, options = {}) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  draw(canvas.getContext('2d'), width, height);
  const map = new T.CanvasTexture(canvas);
  map.colorSpace = T.SRGBColorSpace;
  map.anisotropy = 4;
  const transparent = Boolean(options.transparent);
  const material = options.basic
    ? new T.MeshBasicMaterial({ map, transparent, depthWrite: !transparent })
    : new T.MeshStandardMaterial({ map, roughness: options.roughness ?? 0.85, transparent, depthWrite: !transparent });
  material.name = name;
  return material;
}

import * as THREE from '../vendor/three.module.js';
import { random } from './layout.js';

export function canvasTexture(width, height, painter, { data = false, repeat = 1 } = {}) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');
  painter(context, width, height);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = data ? THREE.NoColorSpace : THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  if (repeat !== 1) {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.setScalar(repeat);
  }
  return texture;
}

export function graphic(name, width, height, painter, options = {}) {
  const map = canvasTexture(width, height, painter);
  if (options.lit) {
    return new THREE.MeshStandardMaterial({
      name, map, roughness: 0.81, emissive: options.glow || 0x000000,
      emissiveMap: options.glow ? map : null, emissiveIntensity: options.glow ? 0.62 : 0,
    });
  }
  return new THREE.MeshBasicMaterial({
    name, map, toneMapped: options.toneMapped ?? true,
    transparent: options.transparent ?? false, opacity: options.opacity ?? 1,
    depthWrite: !options.transparent, side: options.doubleSided ? THREE.DoubleSide : THREE.FrontSide,
  });
}

function grain(kind) {
  const rng = random({ enamel: 710, ply: 301, rubber: 2003, weave: 5351, powder: 22 }[kind]);
  const size = kind === 'powder' ? 384 : 224;
  return canvasTexture(size, size, (c, w, h) => {
    const image = c.createImageData(w, h);
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const i = (x + y * w) * 4;
        let base = 235 + rng() * 19;
        if (kind === 'powder') {
          const p = y / h * Math.PI * 2;
          const q = x / w * Math.PI * 2;
          base = 229 + Math.sin(p * 8 + q * 2 + Math.sin(q * 2) * 0.35) * 6
            + Math.cos(p * 3 + q - Math.sin(q * 2)) * 5
            + Math.sin(p * 21 + q * 5) * 3 + rng() * 12;
        }
        if (kind === 'ply') {
          const ripple = Math.sin(x * 0.095 + Math.sin(y * 0.04) * 0.96 + Math.cos(y * 0.015) * 1.70);
          const fine = Math.sin(x * 0.62 + Math.sin(y * 0.05) * 0.34);
          base = 226 + ripple * 9 + fine * 7 + rng() * 12;
        }
        if (kind === 'weave') base = 214 + (x % 4 > 1 ? 14 : 0) + (y % 4 > 1 ? 15 : 0) + rng() * 13;
        if (kind === 'rubber') {
          const row = (y + 7) % 22;
          const column = (x + (Math.floor((y + 7) / 22) % 2) * 12) % 24;
          const raised = column > 3 && column < 19 && row > 5 && row < 15;
          base = 219 + (raised ? 14 : 0) + rng() * 12;
        }
        image.data[i] = base;
        image.data[i + 1] = base;
        image.data[i + 2] = base;
        image.data[i + 3] = 255;
      }
    }
    c.putImageData(image, 0, 0);
    if (kind !== 'enamel') return;
    for (let i = 0; i < 205; i++) {
      const x = rng() * w;
      const y = rng() * h;
      const length = 1 + rng() ** 3 * 25;
      c.strokeStyle = i % 3 === 0 ? 'rgba(95,84,73,.12)' : 'rgba(255,255,255,.35)';
      c.lineWidth = 0.76;
      c.beginPath();
      c.moveTo(x, y);
      c.lineTo(x + length * 0.17, y + length);
      c.stroke();
    }
  }, { repeat: kind === 'powder' ? 2 : 1 });
}

export function materials() {
  const enamel = grain('enamel');
  const rubber = grain('rubber');
  const ply = grain('ply');
  const weave = grain('weave');
  const powder = grain('powder');
  const all = {};
  const standard = (name, color, roughness = 0.75, metalness = 0, map = null) => {
    all[name] = new THREE.MeshStandardMaterial({ name, color, roughness, metalness, map });
  };
  standard('ember', '#ae512c', 0.67, 0.21, enamel);
  standard('ochre', '#bf6037', 0.70, 0.16, enamel);
  standard('oxide', '#934223', 0.75, 0.18, enamel);
  standard('cladding', '#5e392b', 0.80, 0.09, enamel);
  standard('burgundy', '#5d2823', 0.71, 0.20, enamel);
  standard('ink', '#202d38', 0.73, 0.15, enamel);
  standard('roof', '#46576a', 0.74, 0.32, enamel);
  standard('roofDark', '#324352', 0.78, 0.22, enamel);
  standard('roofLight', '#596675', 0.73, 0.28, enamel);
  standard('zinc', '#919ca4', 0.59, 0.52, enamel);
  standard('steel', '#607481', 0.58, 0.54, enamel);
  standard('silver', '#bdc8cc', 0.41, 0.52);
  standard('boltDark', '#382f2d', 0.68, 0.29);
  standard('frost', '#b9d4e6', 0.94);
  standard('snow', '#d8e9f5', 0.92, 0, powder);
  standard('snowDirty', '#97b7d0', 0.89);
  standard('ice', '#82b3d1', 0.24, 0.11);
  standard('iceDeep', '#4f7994', 0.29, 0.12);
  standard('coal', '#253135', 0.91, 0.02, rubber);
  standard('tread', '#4a5356', 0.86, 0.17, rubber);
  standard('seam', '#535c57', 0.94);
  standard('trim', '#b2b9a9', 0.68, 0.22, enamel);
  standard('panel', '#c5c5af', 0.84, 0.03, enamel);
  standard('panelAlt', '#babfac', 0.85, 0.03, enamel);
  standard('ceiling', '#d4d6c5', 0.81, 0.02, enamel);
  standard('baseboard', '#64776c', 0.73, 0.18, enamel);
  standard('lino', '#678075', 0.87, 0.03, rubber);
  standard('linoAlt', '#61796f', 0.88, 0.03, rubber);
  standard('ply', '#aa845b', 0.77, 0.02, ply);
  standard('plyEdge', '#796042', 0.86, 0.03, ply);
  standard('paper', '#e0d5b5', 0.92);
  standard('ochrePaint', '#cc9e3f', 0.72, 0.06, enamel);
  standard('luggage', '#5e6d55', 0.80, 0.10, enamel);
  standard('blueCase', '#4b6e7a', 0.74, 0.16, enamel);
  standard('petrol', '#3e6968', 0.78, 0.13, enamel);
  standard('patina', '#607875', 0.83, 0.06, enamel);
  standard('red', '#a94d37', 0.77, 0.12, enamel);
  standard('appliance', '#cecdb5', 0.67, 0.17, enamel);
  standard('black', '#192326', 0.79, 0.12, rubber);
  standard('felt', '#546068', 0.95, 0, weave);
  standard('canvas', '#777e61', 0.95, 0, weave);
  standard('linen', '#cdc0a7', 0.95, 0, weave);
  standard('mustard', '#ad8140', 0.96, 0, weave);
  standard('quilt', '#396a6a', 0.94, 0, weave);
  standard('quiltSeam', '#628384', 0.94, 0, weave);
  standard('plaid', '#824b40', 0.96, 0, weave);
  standard('pewter', '#92949b', 0.42, 0.45, enamel);
  standard('rockLight', '#979b90', 0.83, 0.02);
  standard('rocker', '#626e71', 0.73, 0.06);
  standard('blueLens', '#1d505f', 0.29, 0.31);
  standard('darkLens', '#253845', 0.33, 0.27);

  const emission = (name, color, emissive, emissiveIntensity) => {
    all[name] = new THREE.MeshStandardMaterial({
      name, color, roughness: 0.52, metalness: 0, emissive, emissiveIntensity,
    });
  };
  emission('warmTube', '#ffd5a3', '#ffb770', 3.55);
  emission('warmOpal', '#fff0bf', '#ffc483', 2.1);
  emission('status', '#93caa6', '#73db9b', 1.55);
  emission('warning', '#c56b35', '#ff6623', 2.2);
  all.window = windowFrost();
  all.floorShadow = softDecal('floor contact', '19,24,25', 0.52, false);
  all.lampGlow = softDecal('soft amber spill', '255,160,80', 0.34, true, 6);
  all.footprint = footprint();
  return all;
}

function softDecal(name, rgb, alpha, additive, order = 2) {
  const material = graphic(name, 80, 80, (c) => {
    const g = c.createRadialGradient(40, 40, 1, 40, 40, 39);
    for (const [at, amount] of [[0, 1], [0.34, 0.83], [0.62, 0.43], [0.8, 0.18], [1, 0]]) {
      g.addColorStop(at, 'rgba(' + rgb + ',' + amount * alpha + ')');
    }
    c.fillStyle = g;
    c.fillRect(0, 0, 80, 80);
  }, { transparent: true });
  material.userData.renderOrder = order;
  if (additive) material.blending = THREE.AdditiveBlending;
  return material;
}

function windowFrost() {
  const rng = random(3928);
  const material = graphic('glazing with frost', 384, 208, (c, w, h) => {
    c.fillStyle = 'rgba(100,167,210,.065)';
    c.fillRect(0, 0, w, h);
    const frost = c.createLinearGradient(0, h, 0, h - 58);
    frost.addColorStop(0, 'rgba(198,227,247,.72)');
    frost.addColorStop(0.35, 'rgba(179,213,235,.16)');
    frost.addColorStop(1, 'rgba(186,214,243,0)');
    c.fillStyle = frost;
    c.fillRect(0, h - 58, w, 58);

    for (let i = 0; i < 2400; i++) {
      const edge = Math.floor(rng() * 4);
      if (edge === 3 && rng() < 0.65) continue;
      const across = rng();
      const deep = rng() ** 3 * (edge === 0 ? 31 : 17);
      const x = edge === 1 ? deep : edge === 2 ? w - deep : across * w;
      const y = edge === 0 ? h - deep : edge === 3 ? deep : across * h;
      c.fillStyle = 'rgba(228,242,255,' + (0.10 + rng() * 0.48) + ')';
      c.fillRect(x, y, rng() * 1.9 + 0.3, rng() * 2.1 + 0.3);
    }
    for (let i = 0; i < 45; i++) {
      const x = rng() * w;
      const y = h - rng() ** 2 * 10;
      const length = 2 + rng() ** 2 * 23;
      const dx = rng() * 9 - 4.5;
      c.strokeStyle = 'rgba(225,238,250,.31)';
      c.lineWidth = 0.74;
      c.beginPath();
      c.moveTo(x, y);
      c.lineTo(x + dx, y - length);
      for (let j = 0.22; j < 0.9; j += 0.22) {
        c.moveTo(x + dx * j, y - length * j);
        c.lineTo(x - 2 + dx * j, y - length * j - 3);
        c.moveTo(x + dx * j, y - length * j);
        c.lineTo(x + 3 + dx * j, y - length * j - 2);
      }
      c.stroke();
    }
    c.fillStyle = 'rgba(209,231,246,.059)';
    c.beginPath();
    c.moveTo(0, 44);
    c.lineTo(w, 11);
    c.lineTo(w, 27);
    c.lineTo(0, 72);
    c.fill();
  }, { transparent: true, doubleSided: true });
  material.userData.renderOrder = 9;
  material.forceSinglePass = true;
  material.onBeforeCompile = shader => {
    const varyings = 'varying vec3 glassView; varying vec3 glassNormal;\n';
    shader.vertexShader = varyings + shader.vertexShader.replace(
      '#include <project_vertex>',
      '#include <project_vertex>\nglassView = -mvPosition.xyz;\nglassNormal = normalMatrix * normal;',
    );
    shader.fragmentShader = varyings + shader.fragmentShader.replace(
      '#include <map_fragment>',
      [
        '#include <map_fragment>',
        'float incidence = abs(dot(normalize(glassView), normalize(glassNormal)));',
        'float incidenceFade = pow(1.0 - clamp(incidence, 0.0, 1.0), 2.35);',
        'diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.15, 0.29, 0.51), incidenceFade * 0.52);',
        'diffuseColor.a += (1.0 - diffuseColor.a) * incidenceFade * 0.35;',
      ].join('\n'),
    );
  };
  return material;
}

function footprint() {
  return graphic('heel and sole impressions', 80, 128, (c) => {
    const fades = [
      [40, 65, 46, '103,140,172', 0.27],
      [39, 70, 31, '76,104,138', 0.40],
    ];
    for (const [x, y, r, color, opacity] of fades) {
      const g = c.createRadialGradient(x, y, 4, x, y, r);
      g.addColorStop(0, 'rgba(' + color + ',' + opacity + ')');
      g.addColorStop(1, 'rgba(' + color + ',0)');
      c.save();
      c.scale(0.75, 1);
      c.fillStyle = g;
      c.fillRect(0, 0, 107, 128);
      c.restore();
    }
    c.strokeStyle = 'rgba(170,195,216,.73)';
    c.lineWidth = 2;
    c.beginPath();
    c.ellipse(42, 64, 18, 47, -0.07, 1.38, 3.9);
    c.stroke();
    for (let i = 0; i < 9; i++) {
      if (i === 5) continue;
      const y = 28 + i * 8;
      c.strokeStyle = i % 2 ? 'rgba(70,96,125,.48)' : 'rgba(93,123,151,.48)';
      c.lineWidth = 3.0;
      c.beginPath();
      c.moveTo(28 + i * 0.6, y + 2);
      c.lineTo(41, y - 2);
      c.lineTo(53 - i * 0.3, y + 3);
      c.stroke();
    }
  }, { transparent: true, opacity: 0.92 });
}

export function plate(name, heading, detail, options = {}) {
  return graphic(name, 384, 128, (c, w, h) => {
    c.fillStyle = options.background || '#25343b';
    c.fillRect(0, 0, w, h);
    c.strokeStyle = options.border || '#97aba6';
    c.lineWidth = 3;
    c.strokeRect(6, 6, w - 12, h - 12);
    c.fillStyle = options.ink || '#e5e6cc';
    c.font = (options.fontSize || 42) + 'px monospace';
    c.fillText(heading, 21, detail ? 61 : 79, w - 42);
    if (detail) {
      c.font = '21px monospace';
      c.fillText(detail, 22, 97, w - 42);
    }
    const rng = random(97);
    for (let i = 0; i < 185; i++) {
      const x = rng() * w;
      const y = rng() * h;
      c.fillStyle = i % 2 ? '#dec8a921' : '#1115152c';
      c.fillRect(x, y, 1 + rng() * 5, 0.7);
    }
  }, { lit: true });
}

export function fieldChart() {
  return graphic('topographic station survey', 768, 512, (c, w, h) => {
    c.fillStyle = '#c9bea3';
    c.fillRect(0, 0, w, h);
    c.fillStyle = '#e5dac1';
    c.fillRect(11, 10, w - 25, h - 23);
    c.save();
    c.beginPath();
    c.rect(28, 69, 590, 411);
    c.clip();
    c.fillStyle = '#aebcb5';
    c.fillRect(28, 69, 590, 411);
    c.fillStyle = '#c8c4a4';
    c.beginPath();
    c.moveTo(27, 70);
    c.lineTo(624, 70);
    c.lineTo(624, 388);
    for (let i = 0; i <= 20; i++) {
      c.lineTo(618 - i * 31, 367 + Math.sin(i * 0.43) * 65 + Math.cos(i * 0.8) * 21);
    }
    c.closePath();
    c.fill();
    c.strokeStyle = '#6374667a';
    c.lineWidth = 1.5;
    for (let row = 0; row < 32; row++) {
      c.beginPath();
      for (let x = 0; x <= 660; x += 6) {
        const shift = row * 10 + x * 0.31;
        const y = 48 + row * 10.7 + Math.sin(shift * 0.029) * (34 + row * 0.36)
          + Math.sin(x * 0.047 + row * 0.082) * 12 + Math.sin(x * 0.019 - row * 0.05) * 17;
        if (x === 0) c.moveTo(x, y);
        else c.lineTo(x, y);
      }
      c.stroke();
    }
    c.strokeStyle = '#7497a36c';
    for (let x = 29; x < 626; x += 48) {
      c.beginPath();
      c.moveTo(x, 69);
      c.lineTo(x, 480);
      c.stroke();
    }
    for (let y = 69; y < 480; y += 45) {
      c.beginPath();
      c.moveTo(28, y);
      c.lineTo(618, y);
      c.stroke();
    }
    c.strokeStyle = '#97523b';
    c.lineWidth = 3.4;
    c.setLineDash([10, 7]);
    c.beginPath();
    c.moveTo(312, 303);
    c.lineTo(280, 278);
    c.lineTo(291, 230);
    c.lineTo(329, 197);
    c.lineTo(348, 142);
    c.stroke();
    c.setLineDash([]);
    c.fillStyle = '#a14937';
    c.fillRect(304, 295, 14, 14);
    c.font = 'bold 18px monospace';
    c.fillText('P-04', 326, 311);
    c.restore();
    c.strokeStyle = '#586150';
    c.strokeRect(28, 69, 590, 411);
    c.fillStyle = '#394d45';
    c.font = 'bold 29px monospace';
    c.fillText('LARK GLACIER / WEST TRANSECT', 28, 50);
    c.font = '17px monospace';
    c.fillText('N', 678, 111);
    c.beginPath();
    c.moveTo(683, 121);
    c.lineTo(670, 163);
    c.lineTo(683, 155);
    c.lineTo(694, 163);
    c.closePath();
    c.fill();
    for (const [i, label] of ['1:25,000', 'Grid west', 'Contour', '2.5 m', 'FIELD', 'SHEET 04'].entries()) {
      c.fillText(label, 638, 224 + i * 30);
    }
    c.strokeRect(639, 448, 86, 8);
    c.fillRect(639, 448, 44, 8);
  }, { lit: true });
}

export function scheduleSheet() {
  return graphic('field log page', 384, 512, (c, w, h) => {
    c.fillStyle = '#ded5b8';
    c.fillRect(0, 0, w, h);
    c.fillStyle = '#48554e';
    c.font = 'bold 26px monospace';
    c.fillText('CORE REGISTER', 26, 50);
    c.font = '15px monospace';
    c.fillText('WEST TRANSECT   /   LOG 04', 26, 82);
    for (let y = 116; y < 480; y += 32) {
      c.strokeStyle = '#867a6355';
      c.beginPath();
      c.moveTo(25, y);
      c.lineTo(357, y);
      c.stroke();
    }
    c.strokeStyle = '#a35e50a0';
    c.beginPath();
    c.moveTo(96, 103);
    c.lineTo(96, 469);
    c.stroke();
    c.fillStyle = '#465b65';
    c.font = 'italic 21px cursive';
    const notes = ['08  /  upper firn', '09  /  blue band', '10  /  fractured', '11  /  keep cold', '12  /  bag at site'];
    notes.forEach((line, i) => c.fillText(line, 28, 143 + i * 32));
    c.beginPath();
    c.arc(299, 310, 31, 0, 6.28);
    c.stroke();
    c.fillText('P-04', 279, 316);
  }, { lit: true });
}

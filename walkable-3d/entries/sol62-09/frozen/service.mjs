import * as THREE from './vendor/three.module.min.js';
import { WEST, EAST, FRONT, TOP } from './build.mjs';
import { ALCOVE, ROOM } from './navigation.mjs';
import { randomSequence } from './materials.mjs';

const nc = { cast: false };
const TAU = 2 * Math.PI;

function alcoveShell(b) {
  b.region('alcove-structure');
  const x = ALCOVE.left;
  b.box('hullWarm', [x - 0.073, ALCOVE.ceiling / 2, 0.10], [0.153, ALCOVE.ceiling, 7.01], nc);
  b.box('hull', [-10.69, ALCOVE.ceiling / 2, ALCOVE.back - 0.075], [3.80, ALCOVE.ceiling, 0.153], nc);
  b.box('hull', [-10.69, ALCOVE.ceiling / 2, ALCOVE.front + 0.075], [3.80, ALCOVE.ceiling, 0.153], nc);
  b.box('hullDark', [-10.69, 3.915, 0.10], [3.84, 0.14, 7.02], nc);
  for (const z of [-2.33, 0.1, 2.51]) {
    b.bevel('hullLight', [x + 0.033, 2.00, z], [2.27, 3.75, 0.115], 0.047, { rotation: WEST, cast: false });
    b.box('graphite', [-10.66, 3.74, z - 1.19], [3.74, 0.16, 0.131], nc);
    b.box('hullDark', [x + 0.12, 1.84, z - 1.19], [0.20, 3.70, 0.156], nc);
  }
  b.box('hullDark', [x + 0.126, 0.19, 0.1], [0.24, 0.35, 6.86], nc);
  b.box('darkSteel', [-11.86, 3.205, 0.11], [0.32, 0.12, 6.5], nc);
  for (const [dx, r, mat] of [[-0.096, 0.065, 'hose'], [0.065, 0.038, 'copper'], [0.115, 0.026, 'steel']]) {
    b.rod(mat, [-11.86 + dx, 3.29, -3.20], [-11.86 + dx, 3.29, 3.38], r, 10, nc);
  }
  for (let i = 0; i < 11; i++) b.box('steelDull', [-11.86, 3.325, -3.17 + i * 0.645], [0.376, 0.087, 0.045], nc);
  for (const z of [-1.72, 1.86]) {
    b.bevel('graphite', [-10.40, 3.706, z], [0.27, 0.13, 1.63], 0.031, nc);
    b.box('neutralLamp', [-10.40, 3.627, z], [0.188, 0.026, 1.471], nc);
    for (const dz of [-0.73, 0.73]) b.box('steel', [-10.40, 3.608, z + dz], [0.243, 0.021, 0.042], nc);
  }
  b.shade([-11.97, 0.009, 0.15], [1.51, 6.43], TOP, 0.95);
}

function drawerFace(b, x, y, z, w, h, mat) {
  b.bevel('graphite', [x, y, z], [w + 0.020, h + 0.043, 0.071], 0.009, { rotation: WEST });
  b.bevel(mat, [x + 0.044, y, z], [w, h, 0.042], 0.013, { rotation: WEST });
  b.rod('steel', [x + 0.084, y + 0.061, z - w * 0.205], [x + 0.084, y + 0.061, z + w * 0.205], 0.014, 10, nc);
  for (const dz of [-w * 0.205, w * 0.205]) b.rod('darkSteel',
    [x + 0.053, y + 0.061, z + dz], [x + 0.089, y + 0.061, z + dz], 0.020, 8, nc);
}

function bench(b) {
  b.region('workbench-and-fixtures');
  b.bevel('graphite', [-12.069, 0.90, -0.01], [0.93, 0.139, 5.67], 0.034);
  b.bevel('steelDull', [-12.068, 0.982, -0.01], [0.926, 0.066, 5.64], 0.018, { uv: [1.8, 4.0] });
  b.box('steel', [-11.592, 0.983, -0.01], [0.031, 0.04, 5.60], nc);
  for (const z of [-2.7, -0.88, 0.97, 2.70]) {
    for (const x of [-12.425, -11.701]) {
      b.box('graphite', [x, 0.449, z], [0.086, 0.892, 0.085]);
      b.box('steelDull', [x, 0.039, z], [0.15, 0.076, 0.166], nc);
      b.bolt([x + 0.053, 0.083, z + 0.047], 0.019, 'y', 'steel', false);
    }
    b.box('graphite', [-12.058, 0.295, z], [0.73, 0.064, 0.076]);
  }
  for (const z of [-1.87, 1.92]) {
    b.bevel('teal', [-12.078, 0.516, z], [0.74, 0.722, 1.39], 0.036);
    for (const [i, y] of [0.253, 0.464, 0.674].entries()) {
      drawerFace(b, -11.706, y, z, 1.305, 0.165, i === 1 ? 'tealPale' : 'teal');
    }
    b.box('darkSteel', [-12.067, 0.122, z], [0.70, 0.125, 1.34]);
  }
  b.bevel('graphite', [-12.069, 0.24, 0.018], [0.71, 0.066, 1.49], 0.020);
  b.bevel('oxide', [-12.049, 0.398, 0.28], [0.49, 0.25, 0.73], 0.039);
  b.bevel('maroon', [-12.041, 0.526, 0.28], [0.49, 0.058, 0.71], 0.022);
  b.beam('steel', [-11.952, 0.606, 0.119], [-11.952, 0.606, 0.404], 0.031, 0.029, nc);
  for (const z of [0.119, 0.404]) b.rod('steelDull', [-11.952, 0.538, z], [-11.952, 0.606, z], 0.019, 8);
  b.sign('02 / SOCKETS', 'VERIFY TOOL COUNT', [-11.787, 0.429, 0.278], [0.330, 0.108], WEST, 'dark');

  // Parts mat, extracted bearings and split shaft in a pair of bench cradles.
  b.bevel('rubber', [-12.006, 1.027, 0.455], [0.681, 0.020, 1.83], 0.006);
  b.box('hullDark', [-11.668, 1.041, 0.47], [0.015, 0.015, 1.79], nc);
  b.ring('tool', [-11.89, 1.055, 0.892], 0.061, 0.128, 0.049, 'y', 36);
  b.ring('darkSteel', [-11.89, 1.078, 0.892], 0.070, 0.103, 0.013, 'y', 36);
  b.ring('steel', [-12.19, 1.047, 0.65], 0.096, 0.164, 0.034, 'y', 36);
  b.ring('brass', [-12.177, 1.047, 1.012], 0.052, 0.078, 0.009, 'y', 30);
  const rng = randomSequence(481120);
  for (let i = 0; i < 7; i++) b.bolt([-12.253 + rng() * 0.43, 1.054, 0.36 + rng() * 0.25], 0.024, 'y', 'tool', false);
  for (const z of [-0.32, 0.24]) {
    b.bevel('oxide', [-12.045, 1.071, z], [0.388, 0.083, 0.194], 0.014);
    for (const d of [-1, 1]) b.bevel('darkSteel', [-12.045 + 0.100 * d, 1.13, z],
      [0.066, 0.125, 0.14], 0.012, { rotation: [0, 0, -d * 0.33] });
  }
  b.cylinder('polished', [-12.045, 1.203, -0.02], 0.057, 0.78, 'z', 28);
  b.cylinder('steel', [-12.045, 1.203, -0.179], 0.078, 0.284, 'z', 26);
  for (const z of [-0.41, 0.25, 0.37]) b.ring('darkSteel', [-12.045, 1.203, z], 0.049, 0.066, 0.023, 'z', 30);

  // Bolted front bench vise and its exposed lead screw.
  const p = (x, y, z) => [-11.837 + x, 1.018 + y, -2.24 + z];
  b.cylinder('graphite', p(0, 0.043, 0), 0.186, 0.087, 'y', 26);
  b.bevel('oxide', p(-0.045, 0.153, 0), [0.34, 0.177, 0.243], 0.034);
  b.rod('polished', p(-0.05, 0.166, 0), p(0.278, 0.166, 0), 0.030, 18);
  for (const x of [-0.111, 0.189]) {
    b.bevel('oxide', p(x, 0.247, 0), [0.096, 0.138, 0.251], 0.025);
    b.bevel('tool', p(x + (x < 0 ? 0.049 : -0.048), 0.267, 0), [0.025, 0.063, 0.257], 0.008);
    for (let i = 0; i < 9; i++) b.box('darkSteel', p(x + (x < 0 ? 0.064 : -0.063), 0.279, (i - 4) * 0.0235),
      [0.008, 0.047, 0.006], nc);
  }
  b.cylinder('darkSteel', p(0.290, 0.169, 0), 0.044, 0.075, 'x', 15);
  b.rod('steel', p(0.329, 0.043, -0.078), p(0.329, 0.274, 0.096), 0.015, 10);
  for (const [y, z] of [[0.043, -0.078], [0.274, 0.096]]) b.cylinder('tool', p(0.329, y, z), 0.025, 0.039, 'y', 12);
  for (const d of [-1, 1]) b.bolt(p(d * 0.115, 0.098, d * 0.088), 0.026, 'y', 'polished');
}

function spanner(b, pos, scale, rotation) {
  const geometry = b.cached('tools/spanner', () => {
    const s = new THREE.Shape();
    const polygon = [
      [-0.018, -0.143], [-0.037, -0.127], [-0.043, -0.105], [-0.038, -0.081],
      [-0.016, -0.062], [-0.014, 0.078], [-0.039, 0.105], [-0.049, 0.129],
      [-0.044, 0.155], [-0.026, 0.174], [-0.018, 0.171], [-0.020, 0.134],
      [0.011, 0.123], [0.030, 0.156], [0.039, 0.149], [0.049, 0.13],
      [0.044, 0.109], [0.033, 0.093], [0.016, 0.079], [0.018, -0.064],
      [0.039, -0.081], [0.043, -0.104], [0.038, -0.126], [0.017, -0.144],
    ];
    s.moveTo(...polygon[0]);
    for (const v of polygon.slice(1)) s.lineTo(...v);
    s.closePath();
    const hole = new THREE.Path();
    hole.absarc(0, -0.105, 0.024, 0, TAU, false);
    s.holes.push(hole);
    return new THREE.ExtrudeGeometry(s, { depth: 0.011, bevelEnabled: true, bevelThickness: 0.003,
      bevelSize: 0.003, bevelSegments: 1, curveSegments: 6 });
  });
  b.add('tool', geometry, pos, [scale, scale, 1], { rotation });
}

function screwdriver(b, gripStart, bladeEnd, headColor = 'oxide') {
  const p = new THREE.Vector3(...gripStart), q = new THREE.Vector3(...bladeEnd);
  const join = p.clone().lerp(q, 0.48);
  b.rod(headColor, gripStart, join.toArray(), 0.026, 10);
  b.rod('polished', join.toArray(), bladeEnd, 0.009, 10, nc);
  b.rod('graphite', p.clone().lerp(q, 0.051).toArray(), p.clone().lerp(q, 0.110).toArray(), 0.028, 10, nc);
}

function toolWall(b) {
  b.region('toolboard-and-spares');
  const board = -12.326;
  b.bevel('graphite', [board - 0.067, 1.722, 0.16], [3.08, 1.19, 0.103], 0.050, { rotation: WEST });
  b.bevel('hullDark', [board - 0.003, 1.722, 0.16], [2.98, 1.095, 0.067], 0.026, { rotation: WEST });
  for (let row = 0; row < 11; row++) for (let col = 0; col < 29; col++) {
    const y = 1.23 + row * 0.096, z = -1.15 + col * 0.095;
    b.cylinder('black', [board + 0.032, y, z], 0.010, 0.0052, 'x', 7, nc);
  }
  for (const z of [-1.198, -0.85, -0.514, -0.181, 0.48, 0.955, 1.292]) {
    b.rod('steelDull', [board + 0.028, 1.957, z], [board + 0.122, 1.957, z], 0.014, 8, nc);
  }
  for (const [i, z] of [-1.19, -0.847, -0.509, -0.181].entries()) {
    spanner(b, [board + 0.091, 1.736 + i * 0.035, z], 1.29 - i * 0.135, [0, Math.PI / 2, 0.09 * (i % 2 ? 1 : -1)]);
  }
  for (const [i, z] of [0.48, 0.653, 0.818].entries()) {
    screwdriver(b, [board + 0.127, 1.996, z], [board + 0.131, 1.671 - i * 0.029, z + 0.016], i === 0 ? 'cream' : 'oxide');
  }
  spanner(b, [-11.842, 1.05, -0.612], 1.07, [-Math.PI / 2, 0, 0.81]);
  screwdriver(b, [-11.827, 1.062, 1.35], [-12.163, 1.041, 1.49], 'cream');
  b.bevel('darkSteel', [board + 0.07, 1.566, 1.172], [0.51, 0.12, 0.17], 0.027, { rotation: WEST });
  for (let i = 0; i < 7; i++) {
    b.cylinder('polished', [board + 0.092, 1.663, 0.966 + i * 0.066], 0.023 + i * 0.0013, 0.081 - i * 0.005, 'y', 12);
  }

  b.bevel('graphite', [-12.099, 2.445, 0.20], [0.627, 0.102, 3.36], 0.026);
  b.box('steelDull', [-11.779, 2.463, 0.20], [0.035, 0.069, 3.33], nc);
  b.bevel('graphite', [-11.841, 2.341, 0.12], [0.243, 0.115, 1.63], 0.024);
  b.box('steelDull', [-11.817, 2.274, 0.12], [0.177, 0.027, 1.55], nc);
  b.box('cyanLamp', [-11.817, 2.259, 0.12], [0.123, 0.018, 1.481], nc);
  for (const z of [-0.608, 0.849]) b.box('steelDull', [-11.819, 2.248, z], [0.174, 0.025, 0.043], nc);
  for (const [i, z] of [-0.91, -0.248, 0.436, 1.19].entries()) {
    b.bevel(i % 3 ? 'hullWarm' : 'teal', [-12.088, 2.624, z], [0.474, 0.27, 0.568], 0.038);
    b.bevel('darkSteel', [-11.848, 2.729, z], [0.050, 0.072, 0.492], 0.009);
    b.box('steelDull', [-11.817, 2.581, z], [0.032, 0.062, 0.201], nc);
  }
  b.sign('TOOL CONTROL', 'RETURN TO OUTLINE AFTER USE', [-12.347, 2.860, -0.53], [1.040, 0.244], WEST, 'teal');
}

function hoseReel(b) {
  b.region('service-reel');
  const pos = [-12.215, 1.885, 2.239];
  b.bevel('darkSteel', [-12.419, pos[1], pos[2]], [0.172, 0.56, 0.56], 0.044);
  b.cylinder('teal', pos, 0.269, 0.250, 'x', 32);
  for (let i = 0; i < 7; i++) b.torus('hose', [pos[0] - 0.095 + i * 0.031, pos[1], pos[2]],
    0.258, 0.020, 'x', 28, nc);
  b.cylinder('steelDull', [pos[0] + 0.155, pos[1], pos[2]], 0.297, 0.043, 'x', 36);
  b.ring('graphite', [pos[0] + 0.181, pos[1], pos[2]], 0.206, 0.291, 0.014, 'x', 36);
  b.cylinder('steel', [pos[0] + 0.182, pos[1], pos[2]], 0.111, 0.059, 'x', 22);
  for (let i = 0; i < 6; i++) {
    const a = i * TAU / 6;
    b.bolt([pos[0] + 0.202, pos[1] + Math.sin(a) * 0.170, pos[2] + Math.cos(a) * 0.170], 0.025, 'x', 'tool', false);
  }
  b.tube('rubber', [[-12.281, 1.659, 2.384], [-12.141, 1.425, 2.523], [-11.961, 1.254, 2.556],
    [-11.781, 1.265, 2.458], [-11.743, 1.155, 2.431], [-11.725, 1.036, 2.484]],
    0.023, 23, 8);
  b.cylinder('brass', [-11.725, 1.052, 2.484], 0.034, 0.082, 'y', 10);
  b.sign('SHOP AIR', 'RETRACT AFTER USE', [-12.341, 2.288, 2.257], [0.678, 0.200], WEST, 'dark');
}

function utilityCart(b) {
  b.region('service-cart');
  const X = -10.05, Z = -2.54;
  const at = (x, y, z) => [X + x, y, Z + z];
  b.shade(at(0, 0.008, 0), [1.55, 1.03]);
  for (const y of [0.24, 0.77]) {
    b.bevel('teal', at(0, y, 0), [1.06, 0.065, 0.65], 0.021);
    for (const x of [-0.512, 0.512]) b.box('darkSteel', at(x, y + 0.033, 0), [0.038, 0.079, 0.645]);
    for (const z of [-0.307, 0.307]) b.box('tealPale', at(0, y + 0.026, z), [1.02, 0.055, 0.043]);
  }
  for (const x of [-0.443, 0.443]) for (const z of [-0.236, 0.236]) {
    b.rod('darkSteel', at(x, 0.146, z), at(x, 0.751, z), 0.031, 10);
    b.cylinder('rubber', at(x, 0.073, z), 0.067, 0.057, 'z', 16);
    b.cylinder('steelDull', at(x, 0.073, z), 0.031, 0.069, 'z', 12);
  }
  b.tube('steel', [at(0.445, 0.759, -0.22), at(0.505, 0.947, -0.208), at(0.511, 0.991, 0.00),
    at(0.505, 0.947, 0.209), at(0.445, 0.759, 0.219)], 0.027, 17, 9);
  for (let i = 0; i < 6; i++) b.torus(i % 2 ? 'rubber' : 'hose', at(-0.18, 0.818 + i * 0.020, -0.028),
    0.177 - i * 0.011, 0.016, 'y', 34, nc);
  b.bevel('oxide', at(0.157, 0.871, 0.016), [0.192, 0.105, 0.15], 0.018);
  b.rod('brass', at(0.159, 0.92, 0.016), at(0.21, 1.037, -0.014), 0.014, 9);
  b.bevel('hullWarm', at(0.0, 0.334, 0.034), [0.57, 0.141, 0.399], 0.027);
}

function wallStore(b, x, z, width, h, dir, title, subtitle) {
  const rot = dir === 1 ? WEST : EAST;
  const parts = { rotation: rot };
  b.bevel('darkSteel', [x, h / 2, z], [width, h, 0.74], 0.066, parts);
  b.bevel('hullWarm', [x + dir * 0.355, h * 0.49, z], [width - 0.12, h * 0.866, 0.145], 0.048, parts);
  b.box('graphite', [x + dir * 0.442, h * 0.22, z], [0.041, h * 0.265, width - 0.20], nc);
  for (let i = 0; i < 6; i++) b.box('darkSteel', [x + dir * 0.472, h * 0.096 + i * h * 0.047, z],
    [0.036, 0.032, width - 0.33], nc);
  b.sign(title, subtitle, [x + dir * 0.441, h * 0.694, z], [Math.min(width - 0.22, 1.10), 0.253], rot, 'teal');
  for (const dz of [-width / 2 + 0.151, width / 2 - 0.151]) {
    b.rod('steelDull', [x + dir * 0.50, h * 0.457, z + dz], [x + dir * 0.50, h * 0.610, z + dz], 0.020, 10);
    for (const y of [h * 0.12, h * 0.88]) b.bolt([x + dir * 0.435, y, z + dz], 0.025, 'x', 'tool', false);
  }
}

function perimeterStores(b) {
  b.region('perimeter-service-equipment');
  wallStore(b, -8.40, 5.57, 2.53, 2.30, 1, 'FILTER BANK', 'INTAKE SERVICE / A-4');
  wallStore(b, 8.37, -3.08, 1.88, 1.934, -1, 'AUXILIARY PUMP', 'PRESSURE REGULATOR');
  b.bevel('graphite', [-8.412, 1.35, -5.57], [0.682, 2.68, 2.66], 0.059);
  b.box('black', [-8.059, 1.39, -5.56], [0.035, 2.38, 2.47], nc);
  for (const y of [0.15, 0.76, 1.42, 2.086, 2.665]) {
    b.bevel('steelDull', [-8.404, y, -5.57], [0.77, 0.086, 2.68], 0.013);
    b.box('graphite', [-8.022, y, -5.57], [0.066, 0.103, 2.63], nc);
  }
  for (const [y, z, mat, w, h] of [[0.37, -6.16, 'teal', 1.05, 0.35], [0.38, -5.04, 'graphite', 0.84, 0.37],
    [0.999, -6.14, 'hullWarm', 0.83, 0.40], [0.94, -5.19, 'hullDark', 0.57, 0.27],
    [1.73, -5.78, 'oxide', 1.72, 0.49], [2.324, -6.02, 'teal', 0.75, 0.37], [2.26, -5.11, 'hullWarm', 0.60, 0.29]]) {
    b.bevel(mat, [-8.381, y, z], [0.546, h, w], 0.049);
    b.box('darkSteel', [-8.092, y + h * 0.22, z], [0.039, 0.076, w * 0.57], nc);
    for (const d of [-1, 1]) b.box('steelDull', [-8.091, y - h * 0.15, z + d * w * 0.36], [0.025, 0.06, 0.048], nc);
  }
  b.sign('SPARE BEARINGS', 'BAY 09  /  RETURN TAGGED PARTS', [-8.017, 2.602, -5.51], [1.16, 0.197], WEST, 'dark');
  b.bevel('teal', [-4.23, 0.435, -6.962], [1.90, 0.799, 0.828], 0.062);
  b.bevel('steelDull', [-4.23, 0.862, -6.971], [1.96, 0.066, 0.883], 0.023);
  for (const dx of [-0.435, 0.435]) {
    b.bevel('hullDark', [-4.23 + dx, 0.443, -6.528], [0.784, 0.65, 0.09], 0.033);
    b.rod('tool', [-4.39 + dx, 0.628, -6.46], [-4.07 + dx, 0.628, -6.46], 0.014, 9);
  }
  b.bevel('graphite', [-4.79, 1.010, -6.967], [0.54, 0.245, 0.408], 0.035);
  b.bevel('oxide', [-3.97, 0.961, -7.11], [0.48, 0.142, 0.33], 0.026);
  b.sign('OPTICS KIT', 'PORT MAINTENANCE', [-4.79, 1.016, -6.754], [0.405, 0.120], [0, 0, 0], 'light');
}

export function makeService(b) {
  alcoveShell(b);
  bench(b);
  toolWall(b);
  hoseReel(b);
  utilityCart(b);
  perimeterStores(b);
}

import * as THREE from './vendor/three.module.min.js';
import { EAST, FRONT, TOP, WEST } from './build.mjs';
import { MACHINE } from './navigation.mjs';
import { randomSequence } from './materials.mjs';

const nc = { cast: false };
const TWO_PI = Math.PI * 2;
const px = MACHINE.x;
const pz = MACHINE.z;
const cy = MACHINE.y;
const at = (x, y, z) => [px + x, y, pz + z];
const radial = (r, a, z) => at(Math.cos(a) * r, cy + Math.sin(a) * r, z);

function foundation(b) {
  b.region('rotor-foundation');
  b.shade(at(0, 0.089, 0.04), [4.29, 4.80]);
  for (const d of [-1, 1]) {
    b.bevel('darkSteel', at(d * 1.16, 0.252, -0.14), [0.47, 0.29, 4.41], 0.052);
    b.box('steel', at(d * 1.16, 0.414, -0.14), [0.33, 0.048, 4.29]);
    b.box('graphite', at(d * 1.16, 0.456, -0.13), [0.165, 0.064, 4.20]);
    for (const end of [-1.64, 0.19, 1.42]) {
      b.bevel('graphite', at(d * 1.16, 0.146, end), [0.92, 0.116, 0.74], 0.029);
      b.bevel('steelDull', at(d * 1.158, 0.215, end), [0.57, 0.084, 0.54], 0.019);
      for (const x of [-0.36, 0.36]) {
        b.bolt(at(d * 1.16 + x, 0.214, end - 0.24), 0.044, 'y', 'tool');
        b.bolt(at(d * 1.16 + x, 0.214, end + 0.24), 0.044, 'y', 'tool');
      }
    }
    for (const z of [-1.24, 1.13]) {
      b.bevel('oxide', at(d * 1.00, 0.585, z), [0.55, 0.28, 0.58], 0.055);
      b.beam('oxide', at(d * 1.17, 0.57, z), at(d * 0.76, 1.22, z), 0.25, 0.43);
      b.beam('steelDull', at(d * 1.25, 0.56, z + 0.219), at(d * 0.87, 1.13, z + 0.219), 0.077, 0.037, nc);
      for (const shift of [-1, 1]) b.bolt(at(d * 1.01 + shift * 0.17, 0.758, z + 0.173), 0.044, 'y', 'tool');
    }
    b.box('stripe', at(d * 1.16, 0.319, 2.080), [0.38, 0.17, 0.020], { uv: [2.3, 0.85], cast: false });
  }
  for (const z of [-1.38, 0.04, 1.33]) {
    b.bevel('graphite', at(0, 0.344, z), [2.99, 0.20, 0.32], 0.032);
    b.box('darkSteel', at(0, 0.447, z), [2.89, 0.036, 0.19], nc);
  }
  b.bevel('hullDark', at(0, 0.493, 1.93), [1.77, 0.198, 0.32], 0.025);
  b.sign('ROTOR R-09', 'TRIM AND BEARING TEST STAND', at(0, 0.508, 2.095), [1.19, 0.197], [0, 0, 0], 'teal');
}

function stator(b) {
  b.region('rotor-jacket');
  b.cylinder('graphite', at(0, cy, 0.14), 1.038, 3.31, 'z', 56);
  b.cylinder('hullDark', at(0, cy, 0.095), 1.074, 2.79, 'z', 56, { uv: [6, 2.0] });
  for (const z of [-1.37, 1.34]) {
    b.turned('oxide', at(0, cy, z), [
      [1.00, -0.181], [1.17, -0.181], [1.229, -0.135], [1.252, -0.071], [1.252, 0.067],
      [1.225, 0.137], [1.16, 0.181], [1.00, 0.181], [1.00, -0.181],
    ], 'z', 56);
    b.ring('steelDull', at(0, cy, z - 0.193), 1.105, 1.22, 0.044, 'z', 56);
    b.ring('steel', at(0, cy, z + 0.193), 1.109, 1.223, 0.056, 'z', 56);
    for (let i = 0; i < 12; i++) {
      const a = TWO_PI * i / 12 + Math.PI / 12;
      b.bevel('oxide', radial(1.207, a, z), [0.216, 0.132, 0.344], 0.021,
        { rotation: [0, 0, a - Math.PI / 2] });
      for (const v of [-1, 1]) b.bolt(radial(1.169, a, z + v * 0.236), 0.040, 'z', 'tool');
    }
  }
  // Cast cooling jacket fins sit below the two external shear bands.
  for (let i = 0; i < 30; i++) {
    const a = TWO_PI * i / 30;
    if (Math.sin(a) < -0.83 || (a > 1.24 && a < 1.90)) continue;
    b.bevel(i % 3 === 0 ? 'steelDull' : 'darkSteel', radial(1.086, a, -0.025),
      [0.079, i % 3 === 0 ? 0.167 : 0.13, 2.30], 0.021,
      { rotation: [0, 0, a - Math.PI / 2], tone: 0.91 + (i % 7) * 0.035 });
  }
  for (const z of [-0.70, 0.07, 0.83]) b.ring('hullDark', at(0, cy, z), 1.045, 1.160, 0.068, 'z', 48);
  for (const side of [-1, 1]) {
    b.bevel('tealPale', at(side * 1.10, 1.69, -0.35), [0.30, 0.45, 1.31], 0.059);
    b.bevel('hullDark', at(side * 1.259, 1.67, -0.35), [0.065, 0.31, 1.18], 0.013);
    for (const z of [-0.894, 0.196]) {
      for (const y of [1.52, 1.84]) b.bolt(at(side * 1.303, y, z), 0.034, 'x', 'polished', false);
    }
    if (side > 0) {
      b.sign('INDUCTION ROTOR', 'MASS TRIM   /   1600 KG SWL', at(1.295, 1.672, -0.35), [0.94, 0.245], WEST, 'light');
    } else {
      b.sign('COOLANT RETURN', 'CLOSE VALVE BEFORE DISCONNECT', at(-1.299, 1.672, -0.35), [0.94, 0.245], EAST, 'light');
    }
    b.rod('steel', at(side * 1.268, 1.072, -1.362), at(side * 1.268, 1.072, 1.345), 0.037, 12);
    for (const z of [-1.33, -0.57, 0.61, 1.32]) {
      b.cylinder('graphite', at(side * 1.268, 1.072, z), 0.072, 0.095, 'z', 14);
      b.box('oxide', at(side * 1.14, 1.072, z), [0.26, 0.136, 0.125]);
    }
  }
}

function frontFace(b) {
  b.region('bearing-head');
  const C = (z) => at(0, cy, z);
  b.cylinder('darkSteel', C(1.56), 1.03, 0.46, 'z', 56);
  b.ring('graphite', C(1.775), 0.86, 1.27, 0.27, 'z', 56);
  b.ring('steelDull', C(1.913), 0.878, 1.382, 0.171, 'z', 72);
  b.ring('steel', C(2.049), 0.97, 1.33, 0.102, 'z', 72);
  b.ring('polished', C(2.117), 1.240, 1.337, 0.043, 'z', 72);
  b.ring('darkSteel', C(2.131), 1.075, 1.226, 0.023, 'z', 72);
  b.ring('tool', C(2.143), 1.006, 1.082, 0.034, 'z', 72);
  b.ring('copper', C(2.093), 0.939, 0.989, 0.031, 'z', 72);
  b.ring('black', C(1.945), 0.793, 0.953, 0.22, 'z', 64);
  b.ring('steelDull', C(1.858), 0.364, 0.883, 0.056, 'z', 56);
  b.cylinder('black', C(1.847), 0.74, 0.099, 'z', 48);
  for (let i = 0; i < 20; i++) {
    const a = TWO_PI * i / 20;
    b.bolt(radial(1.156, a, 2.17), 0.051, 'z', 'tool');
    b.bolt(radial(0.928, a + 0.088, 2.119), 0.023, 'z', 'steelDull', false);
    b.bevel(i % 4 === 0 ? 'steel' : 'darkSteel', radial(0.647, a, 1.990),
      [0.125, 0.412, 0.143], 0.024, { rotation: [0, 0, a - Math.PI / 2 + 0.21] });
  }
  b.ring('steel', C(2.045), 0.36, 0.564, 0.114, 'z', 56);
  b.ring('darkSteel', C(2.107), 0.345, 0.516, 0.028, 'z', 56);
  b.ring('tool', C(2.129), 0.311, 0.407, 0.059, 'z', 48);
  b.turned('polished', C(2.193), [
    [0.006, -0.114], [0.34, -0.114], [0.34, -0.083], [0.289, -0.056], [0.289, 0.076],
    [0.246, 0.115], [0.213, 0.122], [0.160, 0.122], [0.132, 0.087], [0.132, 0.037], [0.006, 0.037],
  ], 'z', 56);
  b.cylinder('black', C(2.232), 0.134, 0.017, 'z', 32, nc);
  b.ring('darkSteel', C(2.252), 0.27, 0.29, 0.011, 'z', 56, nc);
  b.ring('darkSteel', C(2.274), 0.25, 0.27, 0.012, 'z', 56, nc);
  for (let i = 0; i < 8; i++) b.bolt(radial(0.464, TWO_PI * i / 8, 2.133), 0.035, 'z', 'steel', false);
  for (let i = 0; i < 36; i++) {
    const a = TWO_PI * i / 36;
    b.box(i % 3 === 0 ? 'cream' : 'graphite', radial(1.283, a, 2.143),
      [i % 3 === 0 ? 0.016 : 0.009, i % 3 === 0 ? 0.067 : 0.037, 0.006],
      { rotation: [0, 0, a - Math.PI / 2], cast: false, tone: i % 3 === 0 ? 1 : 0.8 });
  }
  for (const d of [-1, 1]) {
    const x = d * 1.29;
    b.bevel('oxide', at(x, 1.00, 1.86), [0.30, 0.44, 0.365], 0.052);
    b.bolt(at(x, 1.061, 2.056), 0.060, 'z', 'polished');
    b.beam('graphite', at(x, 0.43, 1.64), at(x, 0.874, 1.90), 0.135, 0.151);
  }
}

function driveEnd(b) {
  b.region('drive-end');
  const C = (z) => at(0, cy, z);
  b.turned('steelDull', C(-1.62), [
    [0.03, -0.19], [0.69, -0.19], [0.84, -0.16], [0.98, -0.056], [0.98, 0.11], [0.90, 0.16], [0.03, 0.16],
  ], 'z', 48);
  b.cylinder('teal', C(-1.98), 0.697, 0.62, 'z', 48, { uv: [4, 1] });
  for (let i = 0; i < 22; i++) {
    const a = TWO_PI * i / 22;
    b.bevel(i % 4 === 0 ? 'tealPale' : 'teal', radial(0.698, a, -2.00),
      [0.071, 0.14, 0.49], 0.017, { rotation: [0, 0, a - Math.PI / 2] });
  }
  b.ring('steel', C(-2.316), 0.49, 0.729, 0.083, 'z', 56);
  b.ring('darkSteel', C(-2.36), 0.476, 0.638, 0.069, 'z', 56);
  b.cylinder('black', C(-2.355), 0.486, 0.041, 'z', 48);
  for (let i = 0; i < 9; i++) {
    const a = TWO_PI * i / 9;
    b.bolt(radial(0.674, a, -2.366), 0.037, 'z', 'polished');
    b.bevel('steelDull', radial(0.316, a, -2.382), [0.097, 0.33, 0.039], 0.010,
      { rotation: [0, 0, a - Math.PI / 2 + 0.43], cast: false });
  }
  b.ring('steel', C(-2.419), 0.412, 0.472, 0.023, 'z', 52, nc);
  b.ring('steelDull', C(-2.411), 0.125, 0.192, 0.031, 'z', 28, nc);
  b.ring('graphite', C(-2.43), 0.445, 0.481, 0.034, 'z', 52, nc);
  b.cylinder('steel', C(-2.432), 0.166, 0.052, 'z', 32);
  for (let i = 0; i < 8; i++) {
    const a = TWO_PI * i / 8;
    b.beam('graphite', radial(0.154, a, -2.438), radial(0.478, a, -2.438), 0.017, 0.024, nc);
  }
  b.bevel('hullLight', at(0.34, 2.18, -1.98), [0.62, 0.27, 0.43], 0.041);
  b.bevel('graphite', at(0.34, 2.341, -1.98), [0.574, 0.064, 0.374], 0.014);
  for (const x of [0.117, 0.563]) b.bolt(at(x, 2.379, -2.103), 0.030, 'y');
  b.sign('DRIVE END', 'COUPLING GUARD FITTED', at(0.0, 0.756, -2.235), [0.94, 0.22], FRONT, 'dark');
  b.bevel('graphite', at(0, 0.742, -2.188), [1.08, 0.277, 0.09], 0.021);
}

function flexibleHose(b, points, r, segments, ribs, cuffs = true) {
  const path = b.tube('rubber', points, r, segments, 10);
  for (let i = 2; i < ribs - 1; i++) {
    const t = i / ribs;
    const xyz = path.getPoint(t);
    const orientation = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), path.getTangent(t));
    b.cylinder(i % 5 === 0 ? 'hose' : 'rubber', xyz.toArray(), r * 1.10, r * 0.23, 'y', 10, { quaternion: orientation, cast: false });
  }
  if (cuffs) {
    for (const t of [0.015, 0.978]) {
      const p = path.getPoint(t);
      const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), path.getTangent(t));
      b.cylinder('steelDull', p.toArray(), r * 1.36, r * 1.76, 'y', 12, { quaternion });
      b.cylinder('tool', p.toArray(), r * 1.46, r * 0.39, 'y', 12, { quaternion, cast: false });
    }
  }
}

function cooling(b) {
  b.region('rotor-fluid-lines');
  for (const d of [-1, 1]) {
    const x = (value) => d * value;
    b.bevel('teal', at(x(0.68), 2.637, -0.63), [0.40, 0.256, 1.14], 0.046);
    b.bevel('steelDull', at(x(0.68), 2.783, -0.63), [0.355, 0.074, 1.04], 0.018);
    for (const z of [-1.039, -0.244]) {
      for (const dx of [-0.118, 0.118]) b.bolt(at(x(0.68) + dx, 2.828, z), 0.030, 'y', 'polished');
      b.cylinder('brass', at(x(0.694), 2.842, z), 0.080, 0.091, 'y', 12);
    }
    for (const [i, mat] of [[0, 'copper'], [1, 'steel']]) {
      const z = -1.047 + i * 0.79;
      b.tube(mat, [at(x(0.692), 2.869, z), at(x(0.692), 3.006, z), at(x(0.814), 3.033, z),
        at(x(1.132), 2.933, z), at(x(1.372), 2.634, z), at(x(1.395), 2.305, z), at(x(1.264), 2.226, z)],
        0.043, 24, 10);
      b.cylinder('steel', at(x(1.270), 2.227, z), 0.077, 0.106, 'x', 12);
      b.cylinder('brass', at(x(1.318), 2.227, z), 0.089, 0.060, 'x', 8);
    }
    b.bevel('graphite', at(x(0.95), 0.48, -1.950), [0.38, 0.25, 0.436], 0.046);
    flexibleHose(b, [
      at(x(1.305), 2.241, -1.07), at(x(1.493), 2.232, -1.24), at(x(1.614), 1.895, -1.482),
      at(x(1.521), 1.17, -1.727), at(x(1.264), 0.584, -1.952), at(x(0.973), 0.621, -1.950),
    ], 0.057, 28, 51);
    flexibleHose(b, [
      at(x(0.597), 2.304, -2.126), at(x(0.842), 2.394, -2.333), at(x(1.289), 2.17, -2.204),
      at(x(1.436), 1.36, -2.108), at(x(1.211), 0.705, -2.183), at(x(0.860), 0.591, -2.001),
    ], 0.039, 25, 43);
  }
  b.bevel('oxide', at(0, 2.852, 0.49), [0.55, 0.257, 0.94], 0.044);
  b.bevel('amber', at(0, 3.005, 0.49), [0.50, 0.073, 0.891], 0.023);
  b.bevel('graphite', at(0, 3.101, 0.54), [0.277, 0.13, 0.35], 0.028);
  b.ring('amber', at(0, 3.26, 0.539), 0.071, 0.150, 0.084, 'x', 24);
  b.bolt(at(0.049, 3.149, 0.552), 0.043, 'x', 'steel');
  b.sign('LIFT', 'EYE ONLY', at(0, 3.048, 0.828), [0.292, 0.165], TOP, 'dark');
  for (const z of [0.142, 0.863]) for (const x of [-0.173, 0.173]) b.bolt(at(x, 3.049, z), 0.035, 'y', 'polished');
}

function safetyGlass(b) {
  const rng = randomSequence(54631);
  for (const d of [-1, 1]) {
    b.region(d > 0 ? 'east-rotor-guard' : 'west-rotor-guard');
    const yaw = d * 1.03;
    const c = Math.cos(yaw), s = Math.sin(yaw);
    const cp = at(d * 1.47, 1.21, 1.49);
    const point = (u, v, n) => [cp[0] + u * c + n * s, cp[1] + v, cp[2] - u * s + n * c];
    const rot = [0, yaw, 0];
    for (const p of [-1, 1]) {
      b.bevel('graphite', point(p * 0.319, 0, 0), [0.053, 0.913, 0.054], 0.012, { rotation: rot });
      b.bevel(p > 0 ? 'steelDull' : 'oxide', point(0, p * 0.43, 0), [0.665, 0.065, 0.057], 0.013, { rotation: rot });
      b.rod('steelDull', point(p * 0.276, -0.79, 0), point(p * 0.276, -0.423, 0), 0.036, 10);
      for (const y of [-0.366, 0.365]) b.cylinder('tool', point(p * 0.318, y, 0.033), 0.021, 0.022, 'z', 8, { cast: false });
    }
    b.plane('glass', point(0, 0, 0), [0.628, 0.843], rot, { order: 2 });
    b.plane('glassMark', point(-0.090, 0.342, 0.004), [0.341, 0.012], rot, { order: 3 });
    b.plane('glassMark', point(0.186, 0.199, 0.006), [0.009, 0.203], rot, { order: 3 });
    b.sign('GUARD', 'KEEP FITTED', point(0.134, -0.341, 0.012), [0.259, 0.091], rot, 'dark');
    for (let i = 0; i < 11; i++) {
      b.box('darkSteel', point((rng() - 0.5) * 0.58, (i % 2 ? -1 : 1) * 0.44, 0.032),
        [0.006 + rng() * 0.018, 0.009, 0.0025], { rotation: rot, cast: false });
    }
  }
}

function localControls(b) {
  b.region('local-rotor-controls');
  const x = 1.18;
  const z = 1.94;
  b.shade(at(x + 1.0, 0.005, z), [1.46, 1.37]);
  b.bevel('graphite', at(x + 0.99, 0.128, z), [0.92, 0.16, 0.75], 0.052);
  b.bevel('darkSteel', at(x + 0.99, 0.61, z - 0.046), [0.19, 0.91, 0.24], 0.028);
  b.bevel('teal', at(x + 0.99, 1.13, z), [0.83, 0.33, 0.53], 0.051);
  b.bevel('graphite', at(x + 0.99, 1.151, z + 0.265), [0.737, 0.246, 0.063], 0.019);
  b.sign('JOG CONTROL', 'ROTOR STATION R-09', at(x + 0.91, 1.176, z + 0.301), [0.476, 0.139], [0, 0, 0], 'light');
  b.cylinder('steel', at(x + 1.243, 1.171, z + 0.310), 0.073, 0.046, 'z', 20);
  b.cylinder('oxide', at(x + 1.243, 1.171, z + 0.345), 0.051, 0.042, 'z', 20);
  for (const [i, mat] of [[0, 'greenLamp'], [1, 'offLamp'], [2, 'amberLamp']]) {
    b.cylinder('darkSteel', at(x + 0.74 + i * 0.109, 1.31, z + 0.026), 0.032, 0.028, 'y', 10, nc);
    b.cylinder(mat, at(x + 0.74 + i * 0.109, 1.331, z + 0.026), 0.021, 0.017, 'y', 12, nc);
  }
  b.tube('hose', [at(x + 0.69, 0.22, z - 0.176), at(x + 0.576, 0.146, z - 0.317),
    at(x + 0.20, 0.124, z - 0.667), at(x - 0.09, 0.157, z - 1.128), at(x - 0.094, 0.43, z - 1.169)], 0.032, 22);
}

export function makeMachine(b) {
  foundation(b);
  stator(b);
  frontFace(b);
  driveEnd(b);
  cooling(b);
  safetyGlass(b);
  localControls(b);
}

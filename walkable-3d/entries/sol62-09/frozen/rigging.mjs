import * as THREE from './vendor/three.module.min.js';
import { TOP, EAST, WEST } from './build.mjs';
import { randomSequence } from './materials.mjs';
import { DECK, ROOM, STAIR } from './navigation.mjs';

const nc = { cast: false };

function shoe(b, x, y, z, material = 'steelDull') {
  b.bevel('graphite', [x, y + 0.017, z], [0.208, 0.034, 0.197], 0.009, nc);
  b.rod(material, [x, y + 0.033, z], [x, y + 0.99, z], 0.035, 12);
  for (const dx of [-0.068, 0.068]) b.bolt([x + dx, y + 0.040, z], 0.019, 'y', 'polished', false);
}

function stairChase(b) {
  const { left, right, front, top } = STAIR;
  const length = front - top;
  const shape = new THREE.Shape();
  shape.moveTo(0.10, 0);
  shape.lineTo(0.10, 0.065);
  shape.lineTo(length + 0.006, DECK.height - 0.257);
  shape.lineTo(length + 0.006, 0);
  shape.closePath();
  const geometry = b.cached('stair-service-chase', () =>
    new THREE.ExtrudeGeometry(shape, { depth: right - left - 0.25, bevelEnabled: false, steps: 1 }));
  const panel = left + 0.114;
  b.add('hullDark', geometry, [panel, 0.021, front], undefined, { rotation: WEST, uv: [0.40, 0.61] });
  for (const [z, height] of [[1.32, 1.51], [2.71, 1.02], [4.01, 0.49]]) {
    b.bevel('graphite', [panel - 0.022, height / 2 + 0.155, z], [1.14, height, 0.059], 0.019,
      { rotation: EAST, cast: false });
    b.bevel('hullWarm', [panel - 0.055, height / 2 + 0.155, z], [1.071, height - 0.071, 0.043], 0.017,
      { rotation: EAST, cast: false });
    for (const dx of [-0.491, 0.491]) for (const y of [0.23, height + 0.081]) b.bolt([panel - 0.082, y, z + dx],
      0.021, 'x', 'steelDull', false);
  }
  b.sign('CABLE CHASE', 'INSPECTION STAIRS   /   J-11', [panel - 0.080, 1.095, 1.32], [0.625, 0.203], EAST, 'dark');
  b.bevel('black', [panel - 0.078, 0.604, 1.32], [0.626, 0.262, 0.021], 0.007, { rotation: EAST });
  for (let i = 0; i < 5; i++) b.box('steelDull', [panel - 0.094, 0.511 + i * 0.047, 1.32], [0.028, 0.021, 0.574], nc);
  b.box('graphite', [right - 0.158, 0.037, 2.89], [0.19, 0.064, 5.28], nc);
  b.box('steelDull', [panel - 0.007, 0.036, 2.89], [0.134, 0.058, 5.20], nc);
  for (const x of [(left + right) / 2 - 0.58, (left + right) / 2 + 0.58]) {
    b.box('darkSteel', [x, 1.63, top - 0.014], [0.89, 0.78, 0.039], nc);
    b.box('black', [x, 1.63, top - 0.038], [0.711, 0.59, 0.023], nc);
    for (let i = 0; i < 9; i++) b.box('steelDull', [x, 1.375 + i * 0.064, top - 0.052], [0.658, 0.028, 0.019], nc);
  }
}

function treads(b) {
  b.region('stairs-and-stringers');
  const { left, right, front, run, rise, count, top } = STAIR;
  const center = (left + right) / 2;
  const width = right - left;
  const wear = randomSequence(28074);
  stairChase(b);
  for (const x of [left + 0.025, right - 0.025, center]) {
    b.beam('graphite', [x, rise * 0.57, front + 0.02], [x, DECK.height - 0.146, top - 0.13],
      x === center ? 0.16 : 0.18, 0.265);
    if (x !== center) {
      const dir = x < center ? -1 : 1;
      b.beam('steelDull', [x + dir * 0.096, 0.109, front + 0.008], [x + dir * 0.096, DECK.height - 0.125, top - 0.14],
        0.028, 0.109, nc);
    }
  }
  for (let i = 0; i < count; i++) {
    const y = (i + 1) * rise;
    const z = front - (i + 0.5) * run;
    b.box('grip', [center, y - 0.023, z], [width - 0.18, 0.046, run - 0.012], { uv: [3.7, 0.83] });
    b.box('darkSteel', [center, y - 0.082, z + run * 0.43], [width - 0.19, rise - 0.021, 0.037], nc);
    b.box('steelDull', [center, y - 0.019, z + run * 0.475], [width - 0.158, 0.045, 0.026], nc);
    b.plane(i === 0 || i === count - 1 ? 'stripe' : 'line', [center, y + 0.002, z + run * 0.397],
      [width - 0.205, 0.042], TOP, { uv: [7.4, 0.37], tone: i % 4 === 0 ? 0.91 : 0.74 });
    for (let j = 0; j < 4; j++) {
      const x = center + (wear() - 0.5) * 1.83;
      b.plane(j % 3 ? 'darkSteel' : 'steel', [x, y + 0.003, z + run * 0.396],
        [0.012 + wear() * 0.055, 0.007 + wear() * 0.012], TOP, { tone: 0.84 });
    }
    for (const x of [left + 0.205, right - 0.205]) {
      b.bolt([x, y + 0.009, z + run * 0.20], 0.018, 'y', 'steelDull', false);
    }
    for (const x of [left - 0.073, right + 0.073]) {
      b.bolt([x, y - 0.11, z], 0.029, 'x', 'steel', false);
    }
  }
  for (const side of [left + 0.055, right - 0.055]) {
    const capY = 1.045;
    b.rod('amber', [side, rise + capY, front - 0.123], [side, DECK.height + capY, top - 0.006], 0.044, 12);
    b.rod('steelDull', [side, rise + 0.51, front - 0.124], [side, DECK.height + 0.51, top - 0.006], 0.023, 10);
    for (const mark of [0, 3, 6, 9, 12, 15]) shoe(b, side, rise * (mark + 1), front - (mark + 0.52) * run);
    b.tube('amber', [[side, rise + capY - 0.130, front + 0.054],
      [side, rise + capY - 0.027, front + 0.020], [side, rise + capY, front - 0.123]], 0.044, 8);
  }
  for (const x of [left + 0.12, right - 0.12]) {
    b.box('graphite', [x, 0.74, 2.05], [0.15, 1.48, 0.16]);
    b.box('steel', [x, 0.026, 2.05], [0.38, 0.052, 0.38], nc);
    b.beam('darkSteel', [x, 0.15, 2.01], [x, 1.79, 1.14], 0.10, 0.10);
  }
  b.shade([center, 0.010, 2.55], [3.99, 6.04], TOP, 0.83);
}

function inspectionDeck(b) {
  b.region('inspection-walkway');
  const { left, right, back, front, height } = DECK;
  const center = (left + right) / 2;
  const w = right - left;
  const d = front - back;
  const z = (back + front) / 2;
  b.box('graphite', [center, height - 0.165, z], [w + 0.07, 0.23, d], { uv: [3, 2] });
  b.box('darkSteel', [left + 0.026, height - 0.123, z], [0.143, 0.239, d + 0.027], nc);
  b.box('steelDull', [left - 0.047, height - 0.105, z], [0.018, 0.058, d - 0.06], nc);
  for (let i = 0; i < 6; i++) {
    const z0 = back + (i + 0.5) * d / 6;
    b.box('grip', [center, height - 0.028, z0], [w - 0.054, 0.054, d / 6 - 0.015],
      { uv: [4, 2], tone: i % 2 === 0 ? 1.01 : 0.87 });
    for (const x of [left + 0.19, right - 0.24]) b.bolt([x, height + 0.01, z0 - 0.31], 0.021, 'y', 'steelDull', false);
  }
  b.box('cream', [left + 0.112, height + 0.042, z], [0.074, 0.09, d - 0.04], nc);
  b.plane('stripe', [center, height + 0.003, front - 0.123], [w - 0.185, 0.104], TOP, { uv: [7.67, 0.65] });
  b.plane('line', [left + 0.375, height + 0.004, z], [0.045, d - 0.46], TOP, { tone: 0.76 });
  for (const where of [back + 0.18, back + 1.69, back + 3.28, back + 4.91, front - 0.016]) {
    shoe(b, left + 0.051, height, where);
  }
  for (const where of [left + 1.49, right - 0.26]) shoe(b, where, height, back + 0.059);
  for (const [y, r, mat] of [[height + 1.045, 0.044, 'amber'], [height + 0.51, 0.023, 'steelDull']]) {
    b.rod(mat, [left + 0.055, y, front], [left + 0.055, y, back + 0.135], r, 12);
    b.tube(mat, [[left + 0.055, y, back + 0.137], [left + 0.08, y, back + 0.081], [left + 0.139, y, back + 0.056]],
      r, 8, 10);
    b.rod(mat, [left + 0.139, y, back + 0.056], [right - 0.21, y, back + 0.056], r, 12);
  }
  for (const z0 of [-5.49, -3.44, -1.37, 0.40]) {
    b.beam('hullDark', [left + 0.018, height - 0.142, z0], [right + 0.176, height - 0.165, z0], 0.154, 0.263);
    b.beam('steelDull', [left + 0.17, height - 0.326, z0], [right - 0.10, height - 0.339, z0], 0.090, 0.085, nc);
    b.beam('graphite', [right - 0.20, 1.01, z0], [right - 1.46, height - 0.385, z0], 0.12, 0.165);
    b.box('hullDark', [right - 0.071, 1.19, z0], [0.11, 0.60, 0.29]);
    b.box('darkSteel', [left - 0.04, height - 0.109, z0], [0.048, 0.298, 0.225], nc);
    for (const dz of [-0.065, 0.065]) b.bolt([left - 0.069, height - 0.128, z0 + dz], 0.030, 'x');
  }
  for (const [x, mat, r] of [[left + 0.433, 'hose', 0.033], [left + 0.547, 'copper', 0.027], [left + 0.625, 'steelDull', 0.021]]) {
    b.rod(mat, [x, height - 0.366, back + 0.23], [x, height - 0.366, front - 0.19], r, 8, nc);
  }
  b.sign('L1', 'LOOKOUT', [left - 0.067, height - 0.124, -2.98], [0.66, 0.20], EAST, 'teal');
  b.shade([center + 0.52, 0.007, z], [3.64, d + 0.42], TOP, 0.83);
}

function ceiling(b) {
  b.region('ceiling-ribs');
  const w = ROOM.right - ROOM.left;
  const length = ROOM.front - ROOM.back;
  b.box('graphite', [0, ROOM.ceiling + 0.067, -0.05], [w + 0.11, 0.14, length + 0.14], nc);
  for (const x of [-5.52, -1.84, 1.84, 5.52]) {
    for (const z of [-5.63, -1.93, 1.77, 5.47]) b.box('hullDark', [x, 6.68, z], [3.60, 0.077, 3.62],
      { uv: [2, 2], tone: Math.abs(x) < 2 ? 0.92 : 1.06, cast: false });
  }
  for (const z of [-6.86, -3.58, -0.32, 3.75, 6.89]) {
    b.beam('hullLight', [-7.24, 6.29, z], [7.24, 6.29, z], 0.23, 0.285, nc);
    b.box('darkSteel', [0, 6.172, z], [14.44, 0.063, 0.155], nc);
    for (const dir of [-1, 1]) {
      const x = dir * 8.54;
      const bottom = dir < 0 && z > -3.36 && z < 3.60 ? 4.37 : 0.12;
      b.beam('hullDark', [x, bottom, z], [x, 4.94, z], 0.292, 0.334, nc);
      b.beam('hullLight', [x, 4.83, z], [dir * 7.24, 6.33, z], 0.271, 0.362, nc);
      b.beam('darkSteel', [x - dir * 0.071, 4.78, z + 0.189], [dir * 7.22, 6.28, z + 0.189], 0.088, 0.056, nc);
      b.box('steelDull', [x - dir * 0.151, bottom / 2 + 2.47, z], [0.037, 4.88 - bottom, 0.146], nc);
      for (const yy of bottom > 2 ? [4.48, 4.80] : [0.32, 1.35, 2.63, 3.83, 4.72]) {
        for (const dz of [-0.095, 0.095]) b.bolt([x - dir * 0.179, yy, z + dz], 0.032, 'x');
      }
      b.bevel('steelDull', [dir * 7.18, 6.205, z], [0.32, 0.21, 0.352], 0.029, nc);
    }
  }

  b.region('overhead-services');
  for (const x of [-5.61, 5.61]) {
    for (const dx of [-0.28, 0.28]) b.box('darkSteel', [x + dx, 6.057, -0.02], [0.076, 0.12, 14.19], nc);
    for (let i = 0; i < 34; i++) {
      const z = -6.93 + i * 0.418;
      b.box('steelDull', [x, 6.015, z], [0.53, 0.044, 0.051], nc);
      if (i % 5 === 0) {
        b.box('graphite', [x - 0.28, 6.29, z], [0.107, 0.41, 0.09], nc);
        b.box('graphite', [x + 0.28, 6.29, z], [0.107, 0.41, 0.09], nc);
      }
    }
    for (const [dx, mat, r] of [[-0.16, 'hose', 0.054], [-0.018, 'rubber', 0.067], [0.137, 'copper', 0.035]]) {
      b.rod(mat, [x + dx, 6.104, -7.23], [x + dx, 6.104, 7.18], r, 10, nc);
    }
  }
  for (const x of [-3.84, 3.84]) {
    for (const z of [-5.01, -1.75, 1.76, 5.0]) {
      b.bevel('graphite', [x, 6.158, z], [0.466, 0.17, 2.18], 0.035, nc);
      b.box('steelDull', [x, 6.057, z], [0.401, 0.046, 2.01], nc);
      for (const dx of [-0.077, 0.077]) b.box('neutralLamp', [x + dx, 6.030, z], [0.10, 0.018, 1.91], nc);
      for (const dz of [-0.92, 0, 0.92]) b.box('steelDull', [x, 6.021, z + dz], [0.382, 0.022, 0.027], nc);
      for (const dz of [-0.77, 0.77]) b.box('darkSteel', [x, 6.37, z + dz], [0.17, 0.34, 0.14], nc);
    }
  }
}

function overheadHoist(b) {
  b.region('rotor-hoist');
  const z = -0.55;
  for (const x of [-3.24, 3.24]) {
    b.beam('darkSteel', [x, 5.14, z], [x, 6.52, z], 0.197, 0.261, nc);
    b.beam('graphite', [x, 5.15, z], [x, 6.43, z + 0.94], 0.105, 0.146, nc);
    b.box('steelDull', [x, 6.47, z], [0.48, 0.072, 0.46], nc);
    b.box('darkSteel', [x, 5.15, z], [0.42, 0.54, 0.41], nc);
  }
  b.box('amber', [0, 5.38, z], [6.73, 0.116, 0.385]);
  b.box('amber', [0, 5.215, z], [6.65, 0.264, 0.083]);
  b.box('amber', [0, 5.051, z], [6.73, 0.096, 0.388]);
  for (const x of [-3.09, 3.09]) {
    b.box('stripe', [x, 5.188, z + 0.213], [0.399, 0.295, 0.023], { uv: [2.48, 1], cast: false });
    for (const y of [5.04, 5.38]) b.bolt([x, y, z + 0.206], 0.037);
  }
  b.sign('SERVICE HOIST', 'SAFE WORKING LOAD   1.6 T', [0.20, 5.223, z + 0.049], [1.40, 0.235], [0, 0, 0], 'dark');
  b.bevel('graphite', [-0.91, 4.86, z], [0.57, 0.34, 0.50], 0.051);
  for (const x of [-1.083, -0.733]) b.cylinder('tool', [x, 4.98, z + 0.258], 0.075, 0.066, 'z', 18);
  b.cylinder('black', [-0.91, 4.66, z], 0.111, 0.175, 'y', 18);
  b.rod('steelDull', [-0.91, 4.58, z], [-0.91, 4.06, z], 0.024, 10, nc);
  b.tube('steel', [[-0.91, 4.085, z], [-0.91, 3.975, z], [-0.863, 3.916, z], [-0.792, 3.930, z], [-0.763, 4.016, z]],
    0.030, 12, 9);
}

export function makeRigging(b) {
  treads(b);
  inspectionDeck(b);
  ceiling(b);
  overheadHoist(b);
}

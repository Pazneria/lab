import { TOP, CEILING, FRONT, WEST, EAST } from './build.mjs';
import { ALCOVE, MACHINE, ROOM, STAIR, DECK } from './navigation.mjs';
import { randomSequence } from './materials.mjs';

const noCast = { cast: false };
const windowSpec = { halfWidth: 5.19, sill: 1.95, top: 5.22, outerZ: -7.72 };
const X = ROOM.right;
const Z = ROOM.back;
const Y = ROOM.ceiling;
const trench = { left: 0.185, right: 0.68, back: -7.10, front: MACHINE.pad.back };

function floorGrate(b, x, z, w, d, y = 0) {
  b.box('darkSteel', [x, y + 0.001, z], [w, 0.025, d], noCast);
  b.plane('black', [x, y + 0.016, z], [w - 0.08, d - 0.085]);
  const count = Math.ceil(d / 0.11);
  for (let i = 0; i < count; i++) {
    const slat = z + (i + 0.5) * (d - 0.1) / count - (d - 0.1) / 2;
    b.box('steelDull', [x, y + 0.021, slat], [w - 0.10, 0.016, 0.042], noCast);
  }
  for (const edge of [-1, 1]) b.box('steel', [x + edge * (w / 2 - 0.024), y + 0.023, z], [0.035, 0.016, d - 0.027], noCast);
}

function floorTile(b, left, right, back, front, tone, flip) {
  const w = right - left, d = front - back;
  const cutsX = [left, ...[trench.left, trench.right].filter(v => v > left && v < right), right];
  const cutsZ = [back, ...[trench.back, trench.front].filter(v => v > back && v < front), front];
  for (let i = 0; i < cutsX.length - 1; i++) {
    for (let j = 0; j < cutsZ.length - 1; j++) {
      const a = cutsX[i], c = cutsX[i + 1], p = cutsZ[j], q = cutsZ[j + 1];
      const x = (a + c) / 2, z = (p + q) / 2;
      if (x > trench.left && x < trench.right && z > trench.back && z < trench.front) continue;
      const uv = [(a - left) / w, (front - q) / d, (c - left) / w, (front - p) / d];
      b.plane('floor', [x, 0, z], [c - a, q - p], TOP, {
        tone, crop: flip ? uv.map(coordinate => 1 - coordinate) : uv,
      });
    }
  }
}

function cableTrench(b) {
  b.region('rotor-cable-trench');
  const { left, right, back, front } = trench;
  const x = (left + right) / 2, z = (back + front) / 2, width = right - left, length = front - back;
  b.box('rubber', [x, -0.105, z], [width, 0.065, length], noCast);
  for (const edge of [left, right]) {
    b.box('steelDull', [edge, -0.043, z], [0.042, 0.091, length + 0.029], noCast);
    b.box('darkSteel', [edge, 0.002, z], [0.067, 0.016, length + 0.047], noCast);
  }
  for (const [offset, material, r] of [[-0.108, 'copper', 0.025], [-0.001, 'hose', 0.032], [0.113, 'steel', 0.022]]) {
    b.tube(material, [[x + offset, 0.455, -7.266], [x + offset, 0.060, -7.241], [x + offset, -0.048, -7.12],
      [x + offset, -0.048, -6.89], [x + offset, -0.048, -3.49], [x + offset, -0.048, front + 0.03], [x + offset, 0.016, front + 0.204]],
      r, 24, 10, noCast);
    b.cylinder('brass', [x + offset, 0.433, -7.263], r * 1.38, 0.082, 'y', 10, noCast);
  }
  for (let i = 0; i < 28; i++) {
    const zz = back + (i + 0.47) * length / 28;
    b.box(i % 5 === 0 ? 'steel' : 'darkSteel', [x, -0.008, zz], [width - 0.042, 0.030, i % 5 === 0 ? 0.076 : 0.050], noCast);
    if (i % 4 === 0) for (const edge of [left, right]) b.bolt([edge, 0.015, zz], 0.017, 'y', 'tool', false);
  }
  b.bevel('graphite', [x, 0.057, front - 0.036], [0.621, 0.103, 0.250], 0.023, noCast);
  b.bevel('darkSteel', [x, 0.115, front + 0.109], [0.519, 0.075, 0.280], 0.023, noCast);
  for (const dx of [-0.191, 0.191]) b.bolt([x + dx, 0.150, front + 0.143], 0.025, 'y', 'steel');
}

function floor(b) {
  b.region('work-floor');
  const rng = randomSequence(4736);
  const dw = (ROOM.right - ROOM.left) / 9;
  const dd = (ROOM.front - ROOM.back) / 8;
  b.box('graphite', [0, -0.239, -0.05], [17.65, 0.245, 14.84], noCast);
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 8; j++) {
      const left = ROOM.left + i * dw;
      const back = ROOM.back + j * dd;
      floorTile(b, left, left + dw, back, back + dd, 0.81 + rng() * 0.28, (i + j) % 2);
    }
  }
  b.box('graphite', [-10.69, -0.12, 0.1], [3.78, 0.22, 6.9], noCast);
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 4; j++) b.plane('floorDark',
      [-12.58 + (i + 0.5) * 1.89, 0.001, -3.35 + (j + 0.5) * 1.725],
      [1.891, 1.727], TOP, { tone: 0.92 + rng() * 0.24 });
  }
  b.box('steelDull', [-8.812, 0.013, 0.10], [0.24, 0.025, 6.56], noCast);
  for (let i = 0; i < 31; i++) {
    b.box('steel', [-8.81, 0.030, 0.10 + (i - 15) * 0.202], [0.193, 0.014, 0.048], noCast);
  }

  // Isolated rotor foundation, with its seam and replaceable wear plates.
  const { left, right, back, front, height } = MACHINE.pad;
  const w = right - left, d = front - back;
  const x = (left + right) / 2, z = (back + front) / 2;
  b.shade([x, 0.013, z], [w + 1.24, d + 1.18]);
  b.bevel('darkSteel', [x, height * 0.49, z], [w, height, d], 0.021, noCast);
  for (const shift of [-1, 1]) {
    b.plane('grip', [x + shift * (w / 4 - 0.016), height + 0.001, z],
      [w / 2 - 0.043, d - 0.118], TOP, { uv: [2.65, 6.1], tone: shift < 0 ? 1.08 : 0.86 });
    b.plane('stripe', [x + shift * (w / 2 - 0.115), height + 0.004, z],
      [d - 0.18, 0.143], [-Math.PI / 2, 0, Math.PI / 2], { uv: [11.7, 0.73] });
    b.plane('stripe', [x, height + 0.004, z + shift * (d / 2 - 0.117)],
      [w - 0.195, 0.144], TOP, { uv: [10.35, 0.73] });
    for (const fore of [-1, 1]) {
      b.box('steel', [x + shift * (w / 2 - 0.23), height + 0.012, z + fore * (d / 2 - 0.27)],
        [0.26, 0.026, 0.26], noCast);
      for (const dx of [-0.078, 0.078]) b.bolt([x + shift * (w / 2 - 0.23) + dx, height + 0.032,
        z + fore * (d / 2 - 0.27)], 0.023, 'y');
    }
  }
  for (const [x0, z0] of [[-6.76, -5.48], [-6.76, -3.43], [-6.76, 3.87], [-6.76, 5.85],
    [7.97, -5.55], [7.97, -1.25], [5.48, -6.82], [4.61, 6.48]]) {
    floorGrate(b, x0, z0, 0.50, 1.12);
  }
  for (let j = 0; j < 11; j++) {
    const z0 = -5.68 + j * 1.05;
    b.plane('line', [4.44, 0.004, z0], [0.055, 0.55], TOP, { tone: 0.8 + rng() * 0.21 });
  }
  for (const z0 of [-3.77, 3.73]) {
    b.plane('lineGrey', [-6.41, 0.006, z0], [4.18, 0.043], TOP, { tone: 0.80 });
    b.plane('lineGrey', [-4.36, 0.006, z0 * 0.94], [0.044, 0.45], TOP, { tone: 0.80 });
  }
  b.sign('L1   ', 'INSPECTION', [6.90, 0.008, 6.55], [1.04, 0.32], TOP, 'amber');
  b.sign('SERVICE', 'MANUAL HANDLING', [-6.78, 0.007, 2.94], [1.41, 0.40], TOP, 'dark');
}

function surface(x, y, z, direction) {
  if (direction === 'west') return { rot: WEST, axis: 'x', at: (u, v, t) => [x + t, y + v, z - u] };
  if (direction === 'east') return { rot: EAST, axis: 'x', at: (u, v, t) => [x - t, y + v, z + u] };
  if (direction === 'front') return { rot: FRONT, axis: 'z', at: (u, v, t) => [x - u, y + v, z - t] };
  return { rot: [0, 0, 0], axis: 'z', at: (u, v, t) => [x + u, y + v, z + t] };
}

function wallCassette(b, loc, dir, w, h, style, label) {
  const { at, rot, axis } = surface(...loc, dir);
  const rotPart = { rotation: rot, cast: false };
  b.bevel('black', at(0, 0, 0.017), [w + 0.08, h + 0.08, 0.11], 0.03, rotPart);
  b.bevel('hullDark', at(0, 0, 0.088), [w + 0.035, h + 0.035, 0.14], 0.039, rotPart);
  b.bevel(style, at(-0.004, 0.005, 0.160), [w - 0.080, h - 0.075, 0.09], 0.026, rotPart);
  b.box('darkSteel', at(0, -h / 2 + 0.075, 0.215), [w - 0.13, 0.046, 0.054], rotPart);
  for (const dx of [-1, 1]) {
    for (const dy of [-1, 1]) b.bolt(at(dx * (w / 2 - 0.093), dy * (h / 2 - 0.085), 0.213), 0.026, axis);
    b.box('steelDull', at(dx * (w / 2 - 0.144), -h * 0.14, 0.217), [0.082, 0.165, 0.045], rotPart);
  }
  if (label) b.sign(label[0], label[1], at(0, h * 0.26, 0.209), [Math.min(w - 0.2, 0.88), 0.24], rot);
}

function louver(b, loc, dir, w, h, slats = 8) {
  const { at, rot, axis } = surface(...loc, dir);
  const rotPart = { rotation: rot, cast: false };
  b.bevel('hullDark', at(0, 0, 0.045), [w, h, 0.165], 0.052, rotPart);
  b.bevel('black', at(0, 0, 0.138), [w - 0.11, h - 0.10, 0.044], 0.011, rotPart);
  for (let i = 0; i < slats; i++) {
    const y = ((i + 0.5) / slats - 0.5) * (h - 0.11);
    b.bevel('darkSteel', at(0, y, 0.168), [w - 0.165, Math.min(0.085, h / slats * 0.55), 0.049], 0.012, rotPart);
    b.box('steelDull', at(0, y + 0.022, 0.194), [w - 0.23, 0.018, 0.009], rotPart);
  }
  for (const dx of [-1, 1]) for (const dy of [-1, 1]) {
    b.bolt(at(dx * (w / 2 - 0.037), dy * (h / 2 - 0.042), 0.141), 0.019, axis);
  }
}

function planetWindow(b) {
  b.region('observation-port');
  const { halfWidth, sill, top, outerZ } = windowSpec;
  const span = 2 * halfWidth;
  const h = top - sill;
  const y = (top + sill) / 2;
  b.box('hullDark', [0, sill / 2, Z - 0.10], [2 * X + 0.38, sill, 0.22], noCast);
  b.box('hull', [0, (Y + top) / 2, Z - 0.10], [2 * X + 0.38, Y - top, 0.22], noCast);

  for (const dir of [-1, 1]) {
    const wing = X - halfWidth;
    b.box('hull', [dir * (halfWidth + wing / 2), y, Z - 0.10], [wing + 0.025, h + 0.08, 0.22], noCast);
    b.bevel('hullLight', [dir * (halfWidth + 1.06), 3.85, Z + 0.04], [1.50, 2.33, 0.27], 0.104, noCast);
    b.bevel('graphite', [dir * halfWidth, y, Z + 0.057], [0.36, h + 0.58, 0.43], 0.095, noCast);
    b.box('steel', [dir * (halfWidth - 0.146), y, Z + 0.188], [0.032, h + 0.20, 0.06], noCast);
    b.box('gasket', [dir * (halfWidth - 0.188), y, Z - 0.113], [0.084, h, 0.23], noCast);
    for (const side of [-1, 1]) {
      const yy = y + side * h / 2;
      b.beam('graphite', [dir * (halfWidth - 0.67), yy, Z + 0.053],
        [dir * halfWidth, yy - side * 0.62, Z + 0.053], 0.26, 0.47, noCast);
      b.beam('steelDull', [dir * (halfWidth - 0.67), yy, Z + 0.311],
        [dir * halfWidth, yy - side * 0.62, Z + 0.311], 0.067, 0.031, noCast);
    }
  }
  for (const yy of [sill + 0.021, top - 0.021]) {
    b.bevel('graphite', [0, yy, Z + 0.035], [span + 0.33, 0.37, 0.58], 0.086, noCast);
    b.bevel('hullLight', [0, yy, Z + 0.344], [span - 0.394, 0.12, 0.078], 0.020, noCast);
    b.box('gasket', [0, yy, Z - 0.196], [span, 0.27, 0.22], noCast);
  }
  for (const mx of [-1.73, 1.73]) {
    b.bevel('graphite', [mx, y, Z - 0.03], [0.185, h - 0.13, 0.42], 0.052, noCast);
    b.box('steelDull', [mx + 0.051, y, Z + 0.192], [0.025, h - 0.27, 0.058], noCast);
    for (const yy of [sill + 0.28, top - 0.27]) b.bolt([mx, yy, Z + 0.208], 0.036);
  }
  b.plane('viewportGlass', [0, y, outerZ], [span - 0.01, h], [0, 0, 0], { order: 1 });
  for (const pane of [-3.41, 0, 3.41]) {
    b.plane('glassMark', [pane, top - 0.29, outerZ + 0.002], [3.00, 0.013], [0, 0, 0], { order: 2 });
    b.plane('glassMark', [pane - 0.51, top - 0.36, outerZ + 0.003], [1.53, 0.009], [0, 0, 0], { order: 2 });
    b.plane('glassMark', [pane + 1.39, sill + 0.37, outerZ + 0.003], [0.016, 0.28], [0, 0, 0], { order: 2 });
  }
  for (let i = 0; i <= 22; i++) {
    const x = -4.99 + i * (9.98 / 22);
    b.bolt([x, sill + 0.107, Z + 0.33], 0.038, 'z', 'steel', true);
    b.bolt([x, top - 0.111, Z + 0.33], 0.033, 'z', 'steel', true);
  }
  b.sign('OBSERVATION PORT', 'LAMINATED SHIELD   /   OP-09', [0, top + 0.42, Z + 0.035], [2.21, 0.40], [0, 0, 0], 'dark');
  wallCassette(b, [2.84, 0.98, Z + 0.024], 'back', 1.92, 0.98, 'tealPale', ['PRESSURE LOOP', 'ISOLATOR  B-3']);
  wallCassette(b, [0.42, 0.83, Z + 0.024], 'back', 1.96, 0.82, 'hullWarm');
  louver(b, [-6.55, 3.88, Z + 0.19], 'back', 0.87, 1.27, 11);
}

function entryWall(b) {
  b.region('airlock-wall');
  const z = ROOM.front + 0.07;
  b.box('hull', [0, Y / 2, z], [17.84, Y, 0.14], noCast);
  const x = -4.47;
  const at = (dx, y, depth) => [x + dx, y, z - depth];
  b.bevel('black', at(0, 1.45, 0.09), [3.04, 2.96, 0.39], 0.16, noCast);
  b.bevel('hullDark', at(0, 1.51, 0.28), [2.86, 2.89, 0.28], 0.15, noCast);
  for (const side of [-1, 1]) {
    b.bevel('hullLight', at(side * 0.552, 1.39, 0.44), [1.073, 2.56, 0.194], 0.081, noCast);
    b.bevel('hullWarm', at(side * 0.543, 0.79, 0.558), [0.63, 0.84, 0.062], 0.029, noCast);
    b.bevel('dark', at(side * 0.574, 1.91, 0.567), [0.48, 0.22, 0.084], 0.018, noCast);
    b.box('teal', at(side * 0.574, 1.91, 0.618), [0.397, 0.149, 0.032], noCast);
    b.box('amberLamp', at(side * 1.321, 2.42, 0.454), [0.125, 0.061, 0.050], noCast);
    b.box('darkSteel', at(side * 1.315, 1.51, 0.455), [0.108, 1.68, 0.059], noCast);
    for (const y of [0.19, 1.04, 1.56, 2.63]) b.bolt(at(side * 1.32, y, 0.478), 0.033);
  }
  b.box('stripe', at(0, 0.214, 0.585), [2.15, 0.17, 0.032], { uv: [6.0, 1], cast: false });
  b.sign('TRANSFER LOCK', 'A-09  /  PRESSURE SEALED', at(0, 3.12, 0.244), [1.65, 0.36], FRONT, 'dark');
  wallCassette(b, [1.56, 1.43, ROOM.front], 'front', 2.23, 1.99, 'tealPale', ['RETURN AIR', 'ACCESS ONLY WHEN ISOLATED']);
  louver(b, [4.30, 3.27, ROOM.front], 'front', 2.20, 0.72, 6);
  for (const x0 of [-7.10, -1.08, 3.45, 6.90]) {
    b.box('graphite', [x0, 3.02, z - 0.115], [0.14, 5.84, 0.172], noCast);
    b.box('steelDull', [x0 + 0.042, 3.08, z - 0.211], [0.039, 5.70, 0.023], noCast);
  }
  b.box('graphite', [0.62, 4.24, z - 0.151], [15.76, 0.34, 0.30], noCast);
  for (const y of [4.15, 4.27, 4.34]) b.rod('darkSteel', [-7.11, y, z - 0.36], [8.32, y, z - 0.36], 0.029, 8, noCast);
}

function sideWall(b) {
  b.region('east-bulkhead');
  b.box('hullWarm', [X + 0.095, Y / 2, -0.05], [0.19, Y, 14.93], noCast);
  for (let i = 0; i < 7; i++) {
    const z = -6.57 + i * 2.17;
    b.bevel(i % 2 ? 'hull' : 'hullLight', [X - 0.025, 4.72, z], [1.93, 2.27, 0.15], 0.075,
      { rotation: EAST, cast: false, tone: i % 3 === 1 ? 1.08 : 0.97 });
    b.box('hullDark', [X - 0.06, 0.53, z], [0.135, 1.06, 1.91], noCast);
  }
  b.box('graphite', [X - 0.15, 2.55, -0.05], [0.27, 0.18, 14.65], noCast);
  b.box('steelDull', [X - 0.303, 2.576, -0.05], [0.053, 0.048, 14.65], noCast);
  b.box('graphite', [X - 0.12, 5.98, -0.05], [0.20, 0.28, 14.65], noCast);
  wallCassette(b, [X - 0.085, 3.69, -3.96], 'east', 1.58, 1.25, 'teal', ['SENSOR PATCH', 'R-02  /  UPPER DECK']);
  wallCassette(b, [X - 0.085, 3.73, -1.66], 'east', 1.54, 1.25, 'hullWarm');
  louver(b, [X - 0.11, 4.30, -6.25], 'east', 0.95, 0.82, 7);
  louver(b, [X - 0.11, 4.32, 1.37], 'east', 1.07, 0.78, 7);
  b.sign('INSPECTION DECK', 'L1  /  ROTOR SIGHTLINE', [X - 0.146, 4.23, -0.18], [1.58, 0.40], EAST, 'teal');
  b.sign('STAIR ACCESS', 'KEEP TREADS CLEAR', [X - 0.153, 2.31, 4.95], [1.39, 0.37], EAST, 'dark');

  b.region('west-bulkhead');
  const west = ROOM.left;
  b.box('hull', [west - 0.09, Y / 2, (-7.45 + ALCOVE.back) / 2], [0.18, Y, 4.10], noCast);
  b.box('hull', [west - 0.09, Y / 2, (7.35 + ALCOVE.front) / 2], [0.18, Y, 3.80], noCast);
  b.box('hullWarm', [west - 0.09, (Y + ALCOVE.ceiling) / 2, 0.1], [0.18, Y - ALCOVE.ceiling, 6.90], noCast);
  b.box('graphite', [west + 0.07, 4.21, 0.1], [0.31, 0.58, 7.42], noCast);
  b.bevel('hullLight', [west + 0.245, 4.21, 0.10], [6.86, 0.42, 0.20], 0.061,
    { rotation: WEST, cast: false });
  b.sign('SERVICE ALCOVE', 'BENCH S-09  /  TOOL CONTROL', [west + 0.360, 4.21, 0.10], [2.42, 0.39], WEST, 'teal');
  for (const z of [ALCOVE.back - 0.13, ALCOVE.front + 0.13]) {
    b.bevel('hullDark', [west + 0.10, 1.96, z], [0.47, 3.92, 0.32], 0.073, noCast);
    b.bevel('steel', [west + 0.36, 1.96, z], [0.075, 3.67, 0.20], 0.026, noCast);
    b.plane('stripe', [west + 0.399, 0.57, z], [0.161, 0.841], WEST, { uv: [1, 3.14] });
    for (const y of [0.14, 1.30, 2.55, 3.62]) b.bolt([west + 0.408, y, z], 0.026, 'x');
  }
  b.box('darkSteel', [west + 0.09, 5.28, -0.048], [0.22, 0.26, 14.81], noCast);
  for (const y of [5.37, 5.27, 5.17]) {
    b.rod(y > 5.32 ? 'copper' : 'hose', [west + 0.217, y, -7.29], [west + 0.217, y, 7.20], 0.030, 8, noCast);
  }
  wallCassette(b, [west + 0.021, 1.22, -5.74], 'west', 2.48, 1.88, 'tealPale', ['COOLANT FEED', 'BAY ISOLATION  /  MANIFOLD']);
  louver(b, [west + 0.026, 3.59, -5.75], 'west', 2.08, 0.73, 6);
  wallCassette(b, [west + 0.022, 2.86, 5.78], 'west', 2.68, 1.02, 'hullWarm', ['STATION SERVICES', 'AUXILIARY  /  48 V']);
}

export function makeShell(b) {
  floor(b);
  cableTrench(b);
  planetWindow(b);
  entryWall(b);
  sideWall(b);
}

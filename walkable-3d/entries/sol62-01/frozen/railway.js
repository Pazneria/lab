import { bench, contactShadow, enamelSign, freestandingSign, stainMaterial } from './details.js';
import {
  between, CROSSING as c, mix, PLATFORM as p, seeded, STATION as s, terrainHeight, trackCenter
} from './layout.js';

const GAUGE = 1.435;
const RAILS = [-GAUGE / 2, GAUGE / 2];

function platform(batch, m) {
  const random = seeded(6617);
  const base = (a, b, z1, z2) => {
    batch.box([m.stone, m.stone, m.stone, m.stone, m.stone, m.brick],
      (a + b) * .5, p.top * .5 - .032, (z1 + z2) * .5, b - a, p.top + .064, z2 - z1,
      { tint: '#d3c8ae' });
  };
  base(p.left, c.x - c.half, p.track, c.start);
  base(c.x + c.half, p.right, p.track, c.start);
  base(p.left, p.right, c.start, p.inside);
  batch.box(m.stone, (s.apronLeft + s.apronRight) * .5, .203, (s.front + s.apronFront) * .5,
    s.apronRight - s.apronLeft, .486, s.apronFront - s.front, { tint: '#d7c9ae' });
  for (const [a, b] of [[s.apronLeft, s.left - .137], [s.right + .138, s.apronRight]]) {
    batch.box(m.stone, (a + b) * .5, .2, (s.front + p.inside) * .5, b - a, .492, s.front - p.inside,
      { tint: '#d2c3a9' });
  }
  batch.box(m.stone, s.door, .061, 6.428, 2.14, .174, .744, { tint: '#d0c4a8' });
  batch.box(m.stone, s.door, .213, 6.244, 2.14, .158, .373, { tint: '#d7caaf' });
  batch.box(m.stone, 14.705, .073, -1.995, .91, .162, 1.67, { tint: '#d6cbb5' });
  batch.box(m.stone, 14.47, .227, -1.995, .44, .162, 1.67, { tint: '#d5c7ae' });

  for (const [a, b] of [[p.left, c.x - c.half], [c.x + c.half, p.right]]) {
    const count = Math.ceil((b - a) / .91);
    const w = (b - a) / count;
    for (let i = 0; i < count; i++) {
      const x = a + (i + .5) * w;
      const ragged = x < -10.5 && x > -12.2;
      batch.box(m.stone, x, p.top - .025 + (ragged ? .014 * Math.sin(i * 4.09) : 0),
        p.track + .181, w - .009, .088, .429, {
          tint: i % 3 === 0 ? '#ded3b3' : '#cfc6af',
          rx: ragged ? between(random, -.03, .065) : 0,
          rz: ragged ? between(random, -.032, .038) : 0,
          uvOffset: [random(), random()]
        });
    }
  }
  const moss = stainMaterial('moss');
  for (const [x, z, w, d] of [[-4.18, -2.08, 10.9, .65], [3.98, -1.07, 5.72, .55],
    [8.25, -2.96, 2.28, .76], [-10.38, -1.08, 3.5, .95], [11.42, -.56, 4.05, .51]]) {
    const tint = ['#989d72', '#b0a580', '#94886d'];
    batch.plane(moss, [x, p.top + .002, z], [1, 0, 0], [0, 0, -1], w, d,
      { shadow: false, tint: tint[Math.floor(random() * tint.length)] });
  }
  for (const x of [-10.12, -5.54, 4.8, 7.58, 12.06]) {
    const z = -1.2 + Math.sin(x * 3.1) * .68;
    const points = [[x - .21, p.top + .001, z - .15], [x + .15, p.top + .001, z - .20],
      [x + .31, p.top + .001, z + .087], [x -.22, p.top + .001, z + .18]];
    batch.polygon(m.moss, points.reverse(), { tint: '#9b9376', shadow: false });
  }

  const woodRoot = m.bark;
  batch.tube(woodRoot, [[-12.8, .03, -4.19], [-12.52, .145, -3.95], [-12.15, .35, -3.87],
    [-11.95, .474, -3.70], [-11.52, .491, -3.415], [-11.18, .475, -3.26]],
  [.113, .093, .075, .054, .031, .014], { segments: 7, tint: '#a29271', irregular: .12 });
  batch.tube(woodRoot, [[-12.10, .375, -3.87], [-11.84, .462, -3.82], [-11.67, .492, -3.781],
    [-11.49, .474, -3.707]], [.057, .047, .027, .011], { segments: 6, tint: '#afa082' });
}

function canopy(batch, m) {
  const left = -7.89, right = 6.43;
  const z0 = .049, z1 = -3.312;
  const slope = -.153;
  const roofY = z => 3.180 + (z - z0) * .152;
  const length = Math.hypot(z0 - z1, roofY(z0) - roofY(z1));
  const center = (z0 + z1) * .5;
  const random = seeded(36685);
  const sheets = 17;
  for (let i = 0; i < sheets; i++) {
    const w = (right - left) / sheets;
    const x = left + (i + .5) * w;
    const shortened = i === 0 ? .47 : i === 1 ? .085 : 0;
    const mid = center + shortened * .50;
    batch.box(m.iron, x, roofY(mid), mid, w + .024, .061, length - shortened,
      { rx: slope, uvOffset: [random(), random()], tint: i % 4 === 0 ? '#bbad96' : '#e1dacf' });
    for (let rib = 0; rib < 6; rib++) {
      batch.box(m.iron, x - w * .5 + (rib + .28) * w / 6, roofY(mid) + .041, mid,
        .024, .036, length - shortened + .025, { rx: slope, tint: rib % 4 ? '#c6c6b2' : '#ddd3b5', uvOffset: [i * .11, 0] });
    }
  }
  batch.box(m.wood, (left + right) * .5, 3.003, -.198, right - left + .015, .155, .209);
  batch.box(m.wood, (left + right) * .5, roofY(-2.87) - .062, -2.87, right - left + .06, .172, .205);
  batch.box(m.green, (left + right) * .5 + .14, 2.603, z1, right - left - .28, .173, .104);
  const count = 64;
  for (let i = 0; i < count; i++) {
    if (i === 2 || i === 3 || i === count - 6) continue;
    const w = (right - left) / count;
    const x = left + (i + .5) * w;
    const h = between(random, .172, .209);
    batch.box(m.cream, x, 2.514, z1 + .049, w - .008, h, .046,
      { rz: between(random, -.024, .024), tint: i % 5 === 0 ? '#bdac92' : '#dddcc5' });
    const face = [[x - w * .47, 2.514 - h * .48, z1 + .026], [x + w * .48, 2.514 - h * .48, z1 + .026],
      [x + w * .23, 2.381 - h * .09, z1 + .026], [x - w * .19, 2.369 - h * .05, z1 + .026]];
    batch.polygon(m.cream, face, { uv: [[0, .67], [.21, .67], [.21, .48], [0, .48]], tint: '#dcd5b6' });
    batch.polygon(m.green, [...face].reverse().map(([x, y, z]) => [x, y, z + .029]),
      { uv: [[0, .48], [.21, .48], [.21, .67], [0, .67]], tint: '#c9bea4' });
  }
  batch.box(m.iron, (left + right) * .5 + .26, 2.671, z1 - .092, right - left - .45, .072, .105);
  batch.box(m.iron, left + .27, 2.606, z1 + .19, .55, .086, .112, { rz: .23, ry: .16 });
  for (let i = 0; i <= 16; i++) {
    const x = left + .34 + i * .84;
    batch.box(m.wood, x, roofY(center) - .099, center + .066, .087, .131, length - .14,
      { rx: slope, uvOffset: [i * .20, .18], tint: '#beb298' });
  }

  for (const x of [-7.34, -3.06, 1.29, 5.68]) {
    const z = -2.87;
    batch.box(m.stone, x, p.top + .052, z, .345, .112, .345, { tint: '#b9b09a' });
    batch.tube(m.iron, [[x, p.top + .089, z], [x, p.top + .207, z], [x, p.top + .29, z],
      [x, p.top + .481, z], [x, 2.421, z], [x, 2.530, z], [x, 2.581, z]],
    [.116, .099, .072, .061, .061, .092, .116], { segments: 12, minU: .6 });
    batch.box(m.iron, x, 2.572, z, .258, .092, .252);
    for (const sign of [-1, 1]) {
      batch.tube(m.iron, [[x, 2.204, z], [x + sign * .129, 2.312, z], [x + sign * .306, 2.427, z],
        [x + sign * .54, 2.486, z]], [.034, .025, .024, .034], { segments: 7 });
      batch.tube(m.iron, [[x + sign * .133, 2.325, z], [x + sign * .190, 2.512, z],
        [x + sign * .313, 2.544, z], [x + sign * .405, 2.512, z]], [.018, .017, .017, .019], { segments: 6 });
    }
    batch.tube(m.iron, [[x, 2.167, z], [x, 2.294, z + .26], [x, 2.54, z + .56], [x, 2.685, z + .79]],
      [.029, .027, .024, .025], { segments: 7 });
  }
  for (const x of [-5.23, 3.63]) {
    batch.box(m.iron, x, 2.842, -1.70, .175, .052, .166);
    batch.tube(m.iron, [[x, 2.831, -1.70], [x - .02, 2.655, -1.69], [x - .018, 2.578, -1.683]],
      [.014, .014, .024], { segments: 7 });
    batch.tube(m.iron, [[x - .018, 2.583, -1.683], [x - .018, 2.527, -1.683], [x - .018, 2.461, -1.683]],
      [.067, .125, .196], { segments: 10, tint: '#acb2a1' });
    batch.box(m.glassEdge, x - .018, 2.444, -1.683, .072, .035, .075, { shadow: false });
  }
}

const railProfile = [
  [-.071, .113], [.071, .113], [.071, .136], [.019, .148],
  [.016, .195], [.036, .205], [.032, .242], [-.032, .242],
  [-.036, .205], [-.016, .195], [-.019, .148], [-.071, .136]
];

function bed(batch, m) {
  const edgeOffsets = [-1.74, -1.54, -1.21, -.72, 0, .72, 1.21, 1.54, 1.74];
  const heights = [.002, .023, .092, .106, .103, .107, .091, .023, .002];
  function shoulder(x, step) {
    const z = trackCenter(x) + edgeOffsets[step] + Math.sin(x * .75) * .054 * (Math.abs(edgeOffsets[step]) > 1.5 ? 1 : 0);
    return [x, terrainHeight(x, z) + heights[step], z];
  }
  const extent = 54;
  for (let x = -extent; x < extent; x += 1.2) {
    const next = Math.min(x + 1.2, extent);
    for (let i = 0; i < edgeOffsets.length - 1; i++) {
      const vertices = [shoulder(x, i + 1), shoulder(next, i + 1), shoulder(next, i), shoulder(x, i)];
      batch.polygon(m.ballast, vertices, { shadow: false, uv: vertices.map(v => [v[0] / 2.4, -v[2] / 2.4]),
        tint: i === 0 || i === 7 ? '#a4997d' : '#c0b7a8' });
    }
  }
}

function rails(batch, m) {
  const joint = [-19.3, -4.95, 18.9, 34.4];
  function point(x, offset, item) {
    const z = trackCenter(x);
    const delta = (trackCenter(x + .02) - trackCenter(x - .02)) / .04;
    const change = (offset + item[0]) / Math.hypot(delta, 1);
    return [x - change * delta, item[1], z + change];
  }
  const steps = Array.from({ length: 70 }, (_, i) => -55.2 + i * 1.6).concat(joint).sort((a, b) => a - b);
  for (let i = 0; i < steps.length - 1; i++) {
    const x0 = steps[i] + (joint.includes(steps[i]) ? .010 : 0);
    const x1 = steps[i + 1] - (joint.includes(steps[i + 1]) ? .010 : 0);
    for (const offset of RAILS) {
      for (let j = 0; j < railProfile.length; j++) {
        const a = railProfile[j], b = railProfile[(j + 1) % railProfile.length];
        const use = j === 6 ? m.railTop : m.rail;
        const quad = [point(x0, offset, a), point(x1, offset, a), point(x1, offset, b), point(x0, offset, b)];
        batch.polygon(use, quad, { uv: [[x0 / 1.8, j * .23], [x1 / 1.8, j * .23],
          [x1 / 1.8, j * .23 + .14], [x0 / 1.8, j * .23 + .14]],
        tint: j === 6 ? (i % 4 === 0 ? '#aab3ad' : '#d9d9ca') : '#e3d7b9' });
      }
    }
  }
  for (const x of joint) {
    for (const offset of RAILS) {
      const z = trackCenter(x) + offset;
      for (const side of [-1, 1]) {
        batch.box(m.iron, x, .167, z + side * .024, .382, .068, .031, { shadow: false });
        for (const d of [-.128, -.042, .042, .128]) batch.box(m.iron, x + d, .17, z + side * .047, .033, .037, .025,
          { ry: d * .5, shadow: false, tint: '#dac8af' });
      }
    }
  }
}

function sleepers(batch, m) {
  const random = seeded(3851);
  for (let x = -53.25; x <= 54; x += between(random, .57, .665)) {
    const z = trackCenter(x);
    const delta = (trackCenter(x + .02) - trackCenter(x - .02)) / .04;
    const ry = -Math.atan(delta) + between(random, -.017, .017);
    const cover = x > c.x - c.half && x < c.x + c.half;
    batch.box(m.wood, x, .096, z + between(random, -.039, .039), between(random, .198, .239), .113,
      between(random, 2.34, 2.58), { ry, uvScale: [.45, 1.52], uvOffset: [random(), random()], tint: '#8e7d68', shadow: Math.abs(x) < 22 });
    if (cover || Math.abs(x) > 27) continue;
    for (const offset of RAILS) {
      batch.box(m.iron, x, .151, z + offset, .192, .027, .196, { ry, tint: '#b2a090' });
      for (const side of [-1, 1]) {
        batch.box(m.iron, x - side * .051, .175, z + offset + side * .081, .038, .030, .039,
          { ry: ry + side * .17, tint: '#c7ad8c' });
      }
    }
  }
}

function crossing(batch, m) {
  const random = seeded(6475);
  const windows = [c.foot, c.far, trackCenter(c.x) + RAILS[0] - .044, trackCenter(c.x) + RAILS[0] + .044,
    trackCenter(c.x) + RAILS[1] - .044, trackCenter(c.x) + RAILS[1] + .044, c.near, c.start];
  function deck(z) {
    if (z < c.far) return mix(terrainHeight(c.x, z) + .008, c.top, (z - c.foot) / (c.far - c.foot));
    if (z > c.near) return mix(c.top, p.top, (z - c.near) / (c.start - c.near));
    return c.top;
  }
  for (let part = 0; part < windows.length - 1; part++) {
    if (part === 2 || part === 4) continue;
    const a = windows[part], b = windows[part + 1];
    const count = Math.ceil((b - a) / .178);
    const size = (b - a) / count;
    for (let i = 0; i < count; i++) {
      const z = a + (i + .5) * size;
      const rx = -Math.atan2(deck(z + size * .5) - deck(z - size * .5), size);
      batch.box(m.wood, c.x, deck(z) - .038, z, c.half * 2 - random() * .018, .076,
        size * (1.001 / Math.cos(rx)) - .0055, {
          rx, uvScale: [2.35, .29], uvOffset: [random(), random()],
          tint: i % 3 === 0 ? '#e0c9a5' : '#bcb29b'
        });
      for (const side of [-1, 1]) {
        batch.box(m.iron, c.x + side * (c.half - .105), deck(z) + .004, z, .022, .009, .026,
          { rx, ry: random() * .4, shadow: false });
      }
    }
  }
  for (const side of [-1, 1]) {
    const x = c.x + side * 1.27;
    for (const [a, b] of [[c.start + .06, -4.10], [c.far - .028, c.foot - .127]]) {
      const yA = deck(Math.min(c.start, Math.max(c.foot, a)));
      const yB = deck(Math.min(c.start, Math.max(c.foot, b)));
      batch.box(m.iron, x, yA + .44, a, .106, .88, .108);
      batch.box(m.iron, x, yB + .44, b, .102, .88, .106);
      batch.beam(m.iron, [x, yA + .852, a], [x, yB + .852, b], .065, .068);
      batch.beam(m.iron, [x, yA + .473, a], [x, yB + .473, b], .038, .046);
    }
  }
}

function fittings(batch, m) {
  bench(batch, m, -7.55, -.68, p.top, Math.PI, 1.61);
  bench(batch, m, 2.77, -.56, p.top, Math.PI, 1.63);
  const shade = contactShadow();
  for (const [x, z, w, d] of [[-7.55, -.68, 2.19, .90], [2.77, -.56, 2.07, .80], [8.10, -.55, 2.07, .89],
    [-7.34, -2.87, .67, .62], [-3.06, -2.87, .67, .62], [1.29, -2.87, .67, .62], [5.68, -2.87, .67, .62]]) {
    batch.plane(shade, [x, p.top + .0035, z], [1, 0, 0], [0, 0, -1], w, d, { shadow: false, receive: false });
  }
  const boxY = p.top + .38;
  batch.box(m.green, 8.10, boxY, -.55, 1.41, .73, .51, { ry: .04, tint: '#958e72' });
  batch.box(m.wood, 8.11, p.top + .757, -.54, 1.48, .088, .575, { ry: .04, rx: -.047 });
  for (const x of [7.50, 8.71]) batch.box(m.iron, x, boxY, -.825, .055, .715, .031, { ry: .041 });
  batch.box(m.iron, 8.24, p.top + .56, -.825, .046, .106, .030, { rz: .213 });
  const art = enamelSign('SAND', '', { small: true, cream: true });
  batch.plane(art, [8.06, p.top + .42, -.827], [-1, 0, .04], [0, 1, 0], .292, .101, { shadow: false });
  for (const z of [-1.18, -.33, .43]) {
    batch.box(m.green, 13.45, terrainHeight(13.45, z) + .604, z, .137, 1.27, .141, { rx: -.065 });
  }
  batch.beam(m.wood, [13.45, .714, -1.18], [13.45, .685, .47], .066, .086);
  batch.beam(m.wood, [13.45, 1.137, -1.18], [13.45, 1.105, .47], .072, .096);
  batch.beam(m.wood, [13.45, .564, -1.18], [13.45, 1.089, -.65], .050, .064);

  freestandingSign(batch, m, enamelSign('ALDER HALT', 'WREN VALLEY RAILWAY'), 11.04, .50, .018,
    2.42, .506, Math.PI, { iron: true });
  freestandingSign(batch, m, enamelSign('ALDER HALT', 'STATION ENTRANCE', { small: true, arrow: '↖' }), 4.65, 11.37,
    terrainHeight(4.65, 11.37), 1.13, .468, .19);
  freestandingSign(batch, m, enamelSign('PUBLIC FOOTPATH', 'STATION CROSSING', { small: true, arrow: '→' }), 11.90, -8.55,
    terrainHeight(11.90, -8.55), 1.26, .445, 2.89);
}

function woodlandBoundary(batch, m) {
  const points = [[16.02, -10.85], [17.21, -10.58], [18.08, -10.27]];
  const height = points.map(([x, z]) => terrainHeight(x, z));
  points.forEach(([x, z], i) => {
    batch.box(m.wood, x, height[i] + .39, z, .146, .825, .158,
      { rz: [-.10, .06, -.09][i], rx: .07, tint: '#a99f85' });
    batch.box(m.iron, x - .025, height[i] + .631, z + .078, .024, .033, .021);
  });
  for (let i = 0; i < 2; i++) {
    const [x, z] = points[i], [xx, zz] = points[i + 1];
    batch.beam(m.enamel, [x, height[i] + .677, z + .071], [xx, height[i + 1] + .662 - i * .025, zz + .071],
      .079, .107, { tint: '#a5a991' });
    const stop = i ? .72 : 1;
    batch.beam(m.wood, [x, height[i] + .288, z + .059],
      [mix(x, xx, stop), mix(height[i], height[i + 1], stop) + .26, mix(z, zz, stop) + .07],
      .069, .114, { tint: '#b4a489' });
  }

  const x = 7.35, z = -7.52;
  const y = terrainHeight(x, z);
  batch.box(m.stone, x, y + .34, z, .191, .728, .204, { rz: -.063, tint: '#d3c8a7' });
  batch.box(m.iron, x + .019, y + .648, z + .109, .283, .227, .038, { rz: -.047 });
  batch.plane(enamelSign('14½', '', { small: true, cream: true }), [x + .02, y + .647, z + .130], [1, 0, 0], [0, 1, 0],
    .259, .194, { shadow: false, tint: '#ddd4b3' });
}
export function buildRailway(batch, m) {
  platform(batch, m);
  bed(batch, m);
  sleepers(batch, m);
  rails(batch, m);
  crossing(batch, m);
  canopy(batch, m);
  fittings(batch, m);
  woodlandBoundary(batch, m);
}

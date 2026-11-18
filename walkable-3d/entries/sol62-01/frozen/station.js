import { bench, clockDial, contactShadow, crackedGlass, enamelSign, printedNotice, stainMaterial } from './details.js';
import { between, seeded, STATION as s } from './layout.js';

const back = [
  { at: -4.80, width: 1.15, bottom: 1.11, top: 2.48, type: 'boarded' },
  { at: s.door, width: s.doorWidth, bottom: s.floor, top: 2.65, type: 'door' },
  { at: 2.25, width: 1.24, bottom: 1.11, top: 2.48, type: 'window' }
];
const front = [
  { at: -4.80, width: 1.15, bottom: 1.11, top: 2.48, type: 'boarded' },
  { at: s.door, width: s.doorWidth, bottom: s.floor, top: 2.65, type: 'door' },
  { at: 2.25, width: 1.24, bottom: 1.11, top: 2.48, type: 'window' }
];

function frameAxes(axis, fixed, center, y, side) {
  const yaw = axis === 'x' ? 0 : -Math.PI / 2;
  const point = (along, height, distance = 0) => axis === 'x'
    ? [center + along, y + height, fixed + distance * side]
    : [fixed + distance * side, y + height, center + along];
  return { yaw, point };
}

function makeWall(batch, m, axis, base, start, end, side, openings) {
  const t = s.wall;
  const trim = frameAxes(axis, base, 0, 0, side);
  const faces = [m.brick, m.brick, m.brick, m.brick, m.brick, m.brick];
  const inside = axis === 'x' ? (side > 0 ? 5 : 4) : (side > 0 ? 1 : 0);
  faces[inside] = m.plaster;
  function piece(a, b, lo, hi) {
    if (b - a < .0001 || hi - lo < .0001) return;
    const dims = axis === 'x' ? [b - a, hi - lo, t] : [t, hi - lo, b - a];
    batch.box(faces, ...trim.point((a + b) * .5, (hi + lo) * .5), ...dims);
  }
  function plinth(a, b) {
    const dims = axis === 'x' ? [b - a, .36, .052] : [.052, .36, b - a];
    batch.box(m.stone, ...trim.point((a + b) * .5, .29, t * .50 + .017), ...dims);
    const lip = axis === 'x' ? [b - a, .052, .085] : [.085, .052, b - a];
    batch.box(m.stone, ...trim.point((a + b) * .5, .489, t * .50 + .025), ...lip, { tint: '#b9b3a1' });
  }

  let cursor = start;
  for (const open of openings) {
    const a = open.at - open.width * .5;
    const b = open.at + open.width * .5;
    piece(cursor, a, .105, s.eaves);
    piece(a, b, .105, open.bottom);
    piece(a, b, open.top, s.eaves);
    cursor = b;
  }
  piece(cursor, end, .105, s.eaves);
  cursor = start;
  for (const door of openings.filter(o => o.type === 'door')) {
    plinth(cursor, door.at - door.width * .5);
    cursor = door.at + door.width * .5;
  }
  plinth(cursor, end);

  for (const open of openings) inset(batch, m, axis, base, side, open);
}

function inset(batch, m, axis, fixed, side, open) {
  const { at, width: w, bottom: lo, top: hi, type } = open;
  const y = (lo + hi) * .5;
  const h = hi - lo;
  const t = s.wall;
  const { point, yaw } = frameAxes(axis, fixed, at, y, side);
  const box = (mat, u, v, d, width, height, depth, opts = {}) =>
    batch.box(mat, ...point(u, v, d), width, height, depth, { ry: yaw, ...opts });
  const door = type === 'door';
  const casing = door ? m.green : m.cream;
  const outer = t * .5 + .032;
  for (const sign of [-1, 1]) {
    box(casing, sign * (w * .5 - .015), 0, 0, .062, h + .039, t + .095,
      { uvOffset: [.27 * sign, .1] });
    box(door ? m.cream : m.green, sign * (w * .5 - .057), 0, .027, .028, h, .054);
  }
  box(casing, 0, h * .5 - .012, 0, w, .074, t + .098);
  box(m.stone, 0, -h * .5 + .011, .035, w + (door ? .032 : .19), .065, t + .134,
    { tint: door ? '#b8ad92' : '#d0c6af' });
  for (let i = -4; i <= 4; i++) {
    box(m.brick, i * (w + .17) / 9, h * .5 + .073 + .011 * (4 - Math.abs(i)), t * .5 + .009,
      (w + .17) / 9 - .006, .145, .042, { rz: i * -.040, tint: i % 3 === 0 ? '#cfc0ac' : '#f4e8d9' });
  }

  if (door) {
    box(m.cream, 0, h * .5 - .301, .021, w - .08, .048, .094);
    box(m.green, 0, h * .5 - .149, .025, .038, .275, .073);
    for (const j of [-1, 1]) {
      crackedGlass(batch, m, (u, v, d) => point(u + j * .26, v + h * .5 - .16, d + .022), .48, .235, j + 1);
    }
    for (const yRel of [-.66, .50]) {
      box(m.iron, w * .5 - .086, yRel, outer - .016, .054, .109, .025);
      box(m.iron, -w * .5 + .064, yRel, outer - .016, .026, .051, .022);
    }
    return;
  }

  for (const u of [-w * .5 + .084, w * .5 - .084]) box(m.green, u, 0, .02, .036, h - .115, .071);
  box(m.green, 0, 0, .02, .041, h - .115, .067);
  for (const v of [-h * .5 + .086, -.215, .203, h * .5 - .079]) {
    box(m.cream, 0, v, .025, w - .165, .038, .071);
  }
  if (type === 'boarded') {
    for (let j = 0; j < 5; j++) {
      if (j === 3 && side > 0) continue;
      box(j % 2 ? m.wood : m.green, -.42 + j * .205, -.014 + j * .012, outer + .012, .191, h - .026 * j, .029,
        { rz: (j - 2) * .014, uvOffset: [.17 * j, .19 * j], tint: j === 2 ? '#9e9277' : '#c8bea0' });
      for (const v of [-h * .30, h * .36]) box(m.iron, -.42 + j * .205, v, outer + .032, .014, .019, .008);
    }
    box(m.wood, 0, -.18, outer + .043, w + .11, .105, .031, { rz: side * .161 });
  } else {
    const paneWidth = w * .5 - .115;
    const glassTypes = side > 0 ? [1, 0, 3, 2, 1, 0] : [2, 1, 3, 1, 0, 2];
    for (let i = 0; i < 6; i++) {
      const u = (i % 2 ? 1 : -1) * (w * .25 - .027);
      const v = -.411 + Math.floor(i / 2) * .414;
      crackedGlass(batch, m, (a, b, d) => point(a + u, b + v, d + .027), paneWidth, .379, glassTypes[i]);
    }
  }
}

function roof(batch, m) {
  const mid = (s.front + s.back) / 2;
  const eavesZ = s.front + .46;
  const eavesY = s.eaves - .112;
  const rise = s.ridge - eavesY + .007;
  const pitch = Math.atan2(rise, eavesZ - mid);
  const slope = Math.hypot(rise, eavesZ - mid);
  const x = (s.left + s.right) / 2;
  const width = s.right - s.left + .85;
  for (const sign of [-1, 1]) {
    const z = mid + (eavesZ - mid) * sign * .50;
    const y = eavesY + rise * .5;
    batch.box(m.slate, x, y, z, width, .142, slope + .033, { rx: pitch * sign, uvOffset: [sign * .31, .275] });
    batch.box(m.enamel, x, eavesY - .045, mid + sign * (eavesZ - mid), width + .09, .185, .107);
    batch.box(m.iron, x, eavesY - .005, mid + sign * (eavesZ - mid + .086), width + .12, .105, .105);
    const random = seeded(2965 + sign);
    for (let i = 0; i < 39; i++) {
      const cx = x - width * .5 + .155 + i * .308;
      if (random() < .08) continue;
      batch.box(m.slate, cx, eavesY + .074, mid + sign * (eavesZ - mid - .12), between(random, .277, .315), .027, .294,
        { rx: sign * pitch, rz: between(random, -.021, .021), uvOffset: [random(), random()] });
    }
    for (const cx of [s.left - .36, s.right + .36]) {
      batch.box(m.green, cx, y - .105, z, .105, .182, slope + .24, { rx: sign * pitch });
      batch.box(m.cream, cx + .01 * sign, y - .162, z, .128, .048, slope + .23, { rx: sign * pitch });
    }
    for (let i = 0; i <= 11; i++) {
      const cx = s.left + .37 + i * .93;
      batch.box(m.wood, cx, eavesY - .099, mid + sign * (eavesZ - mid - .142), .10, .15, .35,
        { rx: sign * pitch, uvOffset: [i * .17, 0] });
    }
  }
  batch.tube(m.slate, [[x - width * .515, s.ridge + .041, mid], [x + width * .515, s.ridge + .041, mid]],
    [.112, .112], { segments: 8, minU: 1 });
  for (let i = 0; i < 19; i++) {
    const cx = x - width * .50 + i * width / 19 + .065;
    batch.box(m.iron, cx, s.ridge + .116, mid, .027, .024, .15, { tint: '#b9a688' });
  }
  for (const sign of [-1, 1]) {
    const cx = sign < 0 ? s.left - .139 : s.right + .139;
    const tri = [[cx, s.eaves - .012, s.back - .14], [cx, s.ridge - .071, mid], [cx, s.eaves - .012, s.front + .14]];
    if (sign < 0) tri.reverse();
    batch.polygon(m.brick, tri, { uv: tri.map(p => [p[2] / 2.712, p[1] / .924]) });
    batch.box(m.stone, cx, s.eaves + .015, mid, .076, .072, s.front - s.back + .29);
    batch.box(m.wood, cx + sign * .022, s.eaves + .738, mid, .082, .362, .49);
    for (let i = 0; i < 5; i++) {
      batch.box(m.green, cx + sign * .069, s.eaves + .606 + i * .060, mid, .042, .028, .456, { rz: -.18 * sign });
    }
  }
  const chimney = -5.14;
  batch.box(m.iron, chimney, 4.385, 2.18, 1.18, .13, .90, { rx: -.41 });
  batch.box(m.brick, chimney, 4.84, 2.18, .93, 1.08, .66, { tint: '#e0c5b1' });
  batch.box(m.stone, chimney, 5.401, 2.18, 1.04, .13, .76);
  batch.box(m.brick, chimney, 5.493, 2.18, .88, .088, .63);
  for (const offset of [-.23, .23]) {
    batch.tube(m.brick, [[chimney + offset, 5.49, 2.18], [chimney + offset, 5.59, 2.18],
      [chimney + offset + .008, 5.78, 2.18], [chimney + offset + .008, 5.822, 2.18]], [.15, .124, .104, .132],
    { segments: 10, minU: .4, tint: '#eab49a' });
    batch.box(m.dark, chimney + offset, 5.79, 2.18, .151, .025, .15);
  }
}

function room(batch, m) {
  const boardRandom = seeded(5712);
  const floorA = s.left + .085, floorB = s.right - .086;
  const z0 = s.back + .093, z1 = s.front - .087;
  batch.box(m.dark, (floorA + floorB) * .5, s.floor - .065, (z0 + z1) * .5,
    floorB - floorA, .082, z1 - z0);
  const woodShades = ['#d2c4a9', '#bda991', '#decdb4', '#b4a58c', '#d4c7b1', '#cbbba0', '#bfb09b'];
  for (let z = z0; z < z1 - .02;) {
    const width = Math.min(z1 - z, between(boardRandom, .127, .175));
    for (let x = floorA; x < floorB - .014;) {
      const length = Math.min(floorB - x, x === floorA ? between(boardRandom, .79, 2.82) : between(boardRandom, 1.74, 3.09));
      const shade = woodShades[Math.floor(boardRandom() * woodShades.length)];
      const age = between(boardRandom, -.004, .0035);
      batch.box(m.wood, x + length * .5, s.floor - .022 + age, z + width * .5, length - .004, .044, width - .004,
        { tint: shade, uvScale: [2.79, .37], uvOffset: [boardRandom(), boardRandom()] });
      if (x !== floorA && length > .12) {
        for (const dz of [-.29, .29]) {
          batch.box(m.iron, x + .042, s.floor + age + .0008, z + width * (.5 + dz),
            .007, .003, .009, { shadow: false, tint: '#b7a68d' });
        }
      }
      x += length;
    }
    z += width;
  }
  batch.box(m.wood, -1.18, 3.242, 2.77, 11.29, .091, 5.44, { tint: '#b7b3a0' });
  const random = seeded(8893);
  for (let i = 0; i <= 15; i++) {
    const x = s.left + .34 + .705 * i;
    batch.box(m.wood, x, 3.146, 2.77, .107, .16, 5.40, { uvOffset: [random(), random()], tint: '#aa9d83' });
  }
  const partition = s.partition;
  const partitionParts = [[s.back + .10, 1.45, .446, 3.20], [3.34, s.front - .12, .446, 3.20],
    [1.45, 3.34, .446, 1.42], [1.45, 3.34, 2.42, 3.20]];
  for (const [a, b, lo, hi] of partitionParts) {
    batch.box(m.plaster, partition, (lo + hi) * .5, (a + b) * .5, .148, hi - lo, b - a,
      { tint: '#d5d4bf' });
  }
  for (const z of [1.42, 3.36]) batch.box(m.green, partition, 1.91, z, .232, 1.05, .081);
  batch.box(m.wood, partition + .04, 1.42, 2.396, .403, .091, 2.04);
  batch.box(m.green, partition, 2.401, 2.396, .248, .084, 1.94);
  batch.box(m.dark, partition - .053, 2.13, 2.40, .032, .58, 1.87, { shadow: false, tint: '#908269' });
  batch.box(m.iron, partition + .055, 2.24, 2.40, .034, .039, 1.87);
  for (let i = 0; i < 17; i++) {
    if (i === 6 || i === 7 || i === 11) continue;
    const z = 1.53 + i * .107;
    batch.beam(m.iron, [partition + .056, 1.82 + (i === 8 ? .16 : 0), z + ((i % 4) * .01)],
      [partition + .058, 2.36, z], .016, .016);
  }
  batch.plane(enamelSign('TICKETS', '', { small: true }), [partition + .086, 2.718, 2.39], [0, 0, -1], [0, 1, 0],
    1.08, .237, { shadow: false });
  batch.plane(printedNotice('ticket'), [partition + .079, 1.63, 4.09], [0, 0, -1], [0, 1, 0],
    .43, .53, { shadow: false });

  function dado(axis, fixed, a, b, tint) {
    const rows = Math.ceil((b - a) / .151);
    const segment = (b - a) / rows;
    for (let i = 0; i < rows; i++) {
      const mid = a + segment * (i + .5);
      batch.box(m.green, axis === 'x' ? mid : fixed, .75, axis === 'x' ? fixed : mid,
        axis === 'x' ? segment - .004 : .048, .592, axis === 'x' ? .048 : segment - .004,
        { uvOffset: [random(), random() * .24], tint: random() < .1 ? '#b0a68b' : tint });
    }
    for (const [y, h] of [[.497, .094], [1.051, .06]]) {
      batch.box(y > .8 ? m.wood : m.enamel, axis === 'x' ? (a + b) * .5 : fixed, y,
        axis === 'x' ? fixed : (a + b) * .5, axis === 'x' ? b - a : .079,
        h, axis === 'x' ? .079 : b - a);
    }
  }
  for (const z of [s.back + .149, s.front - .149]) {
    dado('x', z, s.left + .15, s.door - .632, '#d5d4bd');
    dado('x', z, s.door + .632, s.right - .15, '#dddbca');
  }
  dado('z', s.right - .149, s.back + .14, s.front - .14, '#e0dcce');
  dado('z', partition + .075, s.back + .14, s.front - .14, '#cbccbb');

  bench(batch, m, 3.74, 2.67, s.floor, -Math.PI / 2, 1.78, true);
  const shadow = contactShadow();
  batch.plane(shadow, [3.71, s.floor + .006, 2.66], [1, 0, 0], [0, 0, -1], .97, 2.49,
    { shadow: false, receive: false });
  const clock = [4.20, 2.62, 3.91];
  batch.tube(m.iron, [[4.308, clock[1], clock[2]], [4.26, clock[1], clock[2]],
    [4.228, clock[1], clock[2]], [4.211, clock[1], clock[2]]], [.221, .231, .229, .208],
  { segments: 24, tint: '#b0ada3' });
  batch.plane(clockDial(), clock, [0, 0, 1], [0, 1, 0], .416, .416, { shadow: false });
  batch.box(m.wood, .981, 1.743, 5.344, 1.049, .122, .052, { tint: '#bbae96' });
  for (const x of [.546, .738, .931, 1.109, 1.401]) {
    batch.box(m.iron, x, 1.747, 5.31, .036, .067, .022);
    batch.tube(m.iron, [[x, 1.723, 5.308], [x, 1.71, 5.273], [x, 1.727, 5.25], [x, 1.769, 5.253]],
    [.009, .010, .009, .011], { segments: 5 });
  }
  batch.box(m.wood, -4.85, 1.24, 1.58, 1.55, .099, .68);
  for (const x of [-5.49, -4.20]) batch.box(m.wood, x, .84, 1.58, .085, .79, .56);
  for (const z of [3.90, 4.50]) {
    batch.box(m.wood, -5.85, 1.78, z, 1.49, .074, .345);
    batch.box(m.green, -5.23, 1.36, z, .22, .79, .33);
  }
  batch.box(m.dark, -4.73, 1.343, 1.61, .25, .11, .221, { ry: -.20 });
  batch.box(m.iron, -4.73, 1.398, 1.61, .13, .05, .13, { ry: -.20 });

  batch.box(m.wood, .73, 3.09, 2.81, .17, .054, .17);
  batch.tube(m.iron, [[.73, 3.10, 2.81], [.75, 2.77, 2.826], [.749, 2.66, 2.815]], [.017, .013, .017],
    { segments: 7 });
  batch.tube(m.enamel, [[.749, 2.697, 2.815], [.749, 2.652, 2.815], [.749, 2.573, 2.815]],
    [.060, .129, .218], { segments: 12 });
  batch.box(m.glassEdge, .749, 2.557, 2.815, .081, .035, .081, { shadow: false });
  batch.box(m.iron, 2.52, .72, 5.24, 1.02, .404, .123);
  for (let i = 0; i < 14; i++) batch.box(m.iron, 2.05 + i * .073, .724, 5.147, .035, .376, .111);
  batch.tube(m.iron, [[3.06, .68, 5.18], [3.23, .68, 5.18], [3.25, .67, 5.21], [3.25, .49, 5.24]],
    [.018, .018, .018, .017], { segments: 7 });

  const damp = stainMaterial('damp');
  batch.plane(damp, [4.304, 1.83, 2.73], [0, 0, 1], [0, 1, 0], 3.16, 1.66, { shadow: false });
  batch.plane(damp, [1.65, 2.296, 5.373], [1, 0, 0], [0, 1, 0], 2.95, 1.75, { shadow: false });
  batch.plane(damp, [-1.83, 2.40, .168], [1, 0, 0], [0, 1, 0], 1.24, 1.63, { shadow: false });
  batch.plane(printedNotice('closure'), [4.302, 1.921, .923], [0, 0, 1], [0, 1, 0], .51, .638, { shadow: false });
  for (const [x, z, a, b, angle] of [[1.1, 3.85, .19, .26, .33], [3.46, 4.38, .21, .11, -.22],
    [.42, .73, .22, .28, -.65], [3.06, 4.32, .16, .10, 1.26], [-2.73, 3.48, .28, .143, .13]]) {
    batch.box(m.tag, x, s.floor + .005, z, a, .009, b, { ry: angle, tint: '#b6a080', shadow: false });
  }
  for (let i = 0; i < 21; i++) {
    batch.box(m.plaster, between(random, 3.51, 4.19), s.floor + .016, between(random, .66, 4.88),
      between(random, .014, .067), between(random, .007, .034), between(random, .014, .079),
      { ry: random() * 6.2, shadow: false, tint: '#b7ad96' });
  }
}

function exteriorDetails(batch, m) {
  function sign(title, x, y, wall, side, width, height) {
    const art = enamelSign(title, '', { small: title !== 'ALDER HALT' });
    batch.box(m.wood, x, y, wall + side * .183, width + .045, height + .047, .073);
    batch.plane(art, [x, y, wall + side * .224], [side, 0, 0], [0, 1, 0], width, height,
      { shadow: false });
  }
  sign('ALDER HALT', s.door, 2.936, s.front, 1, 2.44, .443);
  sign('WAITING ROOM', s.door, 2.863, s.back, -1, 1.30, .228);
  sign('STAFF ONLY', -4.81, 2.812, s.back, -1, .83, .195);

  batch.box(m.green, .744, 1.464, s.front + .247, .94, 1.965, .064, { ry: .16, rz: -.024, uvOffset: [.32, .13] });
  batch.box(m.wood, .74, 1.013, s.front + .289, .88, .132, .044, { ry: .16, rz: -.024 });
  batch.box(m.wood, .76, 1.964, s.front + .29, .88, .12, .044, { ry: .16, rz: -.024 });
  batch.box(m.iron, 1.049, 1.512, s.front + .318, .043, .115, .02);
  batch.box(m.iron, 1.024, 1.521, s.front + .332, .09, .023, .033);
  batch.box(m.wood, -1.543, 2.661, s.front + .177, .104, .357, .081);
  batch.beam(m.iron, [-1.543, 2.72, s.front + .18], [-1.543, 2.71, s.front + .47], .030);
  batch.tube(m.iron, [[-1.543, 2.72, s.front + .45], [-1.543, 2.65, s.front + .46],
    [-1.543, 2.629, s.front + .46]], [.038, .071, .13], { segments: 9 });
  batch.tube(m.glass, [[-1.543, 2.62, s.front + .46], [-1.543, 2.53, s.front + .46], [-1.543, 2.495, s.front + .46]],
    [.106, .075, .059], { segments: 8, shadow: false });

  const caseX = 3.776, caseY = 1.91, caseZ = -.194;
  batch.box(m.wood, caseX, caseY, caseZ, .925, 1.095, .122);
  batch.plane(printedNotice('timetable'), [caseX - .023, caseY - .018, caseZ - .062], [-1, 0, 0], [0, 1, 0],
    .715, .895, { shadow: false, tint: '#e8dbc1' });
  for (const i of [-1, 1]) {
    batch.box(m.green, caseX + i * .437, caseY, caseZ - .101, .062, 1.123, .102);
    batch.box(m.green, caseX, caseY + i * .53, caseZ - .103, .921, .074, .102);
  }
  crackedGlass(batch, m, (u, v, d) => [caseX + u, caseY + v, caseZ - .137 - d], .807, 1.011, 1);
  batch.box(m.wood, caseX + .412, caseY - .061, caseZ - .185, .051, .964, .037, { rz: .039, ry: -.13 });
  for (const y of [1.56, 2.26]) batch.box(m.iron, caseX - .415, y, caseZ - .163, .071, .068, .020);
  batch.box(m.iron, caseX + .397, caseY, caseZ - .201, .027, .06, .016);

  batch.tube(m.iron, [[4.22, 3.22, s.front + .52], [4.26, 3.06, s.front + .45],
    [4.281, 2.90, s.front + .23], [4.281, .478, s.front + .231], [4.33, .343, s.front + .32]],
  [.051, .050, .049, .048, .049], { segments: 9 });
  for (const y of [.68, 1.87, 2.53]) batch.box(m.iron, 4.281, y, s.front + .193, .154, .027, .14);
  batch.tube(m.iron, [[s.left + .21, 3.21, -.38], [s.left + .19, 3.07, -.30], [s.left + .19, 2.90, -.206],
    [s.left + .19, 1.35, -.213]], [.049, .048, .048, .042], { segments: 8 });
  for (const y of [1.51, 2.62]) batch.box(m.iron, s.left + .19, y, -.181, .137, .027, .121);

  const moss = stainMaterial('moss');
  const damp = stainMaterial('damp');
  for (const side of [-1, 1]) {
    const z = side === 1 ? s.front + .196 : s.back - .196;
    for (const [x, width] of [[-5.75, 1.93], [-2.43, 1.20], [1.14, 1.23], [3.54, 1.78]]) {
      batch.plane(moss, [x, .794, z], [1, 0, 0], [0, 1, 0], width, .67, { shadow: false });
    }
    batch.plane(damp, [-4.86, 1.126, z], [1, 0, 0], [0, 1, 0], 1.44, 1.47, { shadow: false });
    batch.plane(damp, [4.03, 1.66, z], [1, 0, 0], [0, 1, 0], 1.38, 2.60, { shadow: false });
  }
  for (const x of [s.left - .191, s.right + .191]) {
    batch.plane(moss, [x, .78, 2.41], [0, 0, 1], [0, 1, 0], 4.39, .73, { shadow: false });
  }
}

export function buildStation(batch, m) {
  makeWall(batch, m, 'x', s.back, s.left - .14, s.right + .14, -1, back);
  makeWall(batch, m, 'x', s.front, s.left - .14, s.right + .14, 1, front);
  makeWall(batch, m, 'z', s.left, s.back + .14, s.front - .14, -1, []);
  makeWall(batch, m, 'z', s.right, s.back + .14, s.front - .14, 1,
    [{ at: 2.78, width: 1.20, bottom: 1.11, top: 2.48, type: 'window' }]);
  roof(batch, m);
  room(batch, m);
  exteriorDetails(batch, m);
}

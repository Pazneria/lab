import { Draft, band, flatPolygon, mix, polar, random, tau } from './geometry.js';
import { blocks, terrace } from './layout.js';

const slabTints = [0xf0dec1, 0xd9c2a3, 0xe5ceac, 0xf6e5c9, 0xe8d8bd, 0xd3c2ad, 0xf2dcb8];
const x0 = terrace.start;
const x1 = terrace.end;
const side = terrace.side;
const chamfer = terrace.chamfer;

const corners = [
  [x0, -side], [x0, side], [x1 - chamfer, side], [x1, side - chamfer],
  [x1, -side + chamfer], [x1 - chamfer, -side],
];

function slab(build, m, points, bottom, top, palette, options = {}) {
  const section = new Draft();
  const first = points[0];
  for (let i = 1; i < points.length - 1; i += 1) {
    const triangle = [first, points[i], points[i + 1]];
    section.tri(...triangle.map(([x, z]) => [x, top, z]), { uv: triangle });
  }
  for (let i = 0; i < points.length; i += 1) {
    const [ax, az] = points[i];
    const [bx, bz] = points[(i + 1) % points.length];
    const u = Math.hypot(bx - ax, bz - az);
    section.quad([ax, bottom, az], [bx, bottom, bz], [bx, top, bz], [ax, top, az],
      { uv: [[0, bottom], [u, bottom], [u, top], [0, top]] });
  }
  build.add(section.finish(), m, { tint: palette, ...options });
}

function clip(poly, distance) {
  const result = [];
  for (let i = 0; i < poly.length; i += 1) {
    const a = poly[i];
    const b = poly[(i + 1) % poly.length];
    const da = distance(...a);
    const db = distance(...b);
    if (da >= 0) result.push(a);
    if ((da < 0 && db > 0) || (da > 0 && db < 0)) {
      const t = da / (da - db);
      result.push([mix(a[0], b[0], t), mix(a[1], b[1], t)]);
    }
  }
  return result;
}

function walkSlabs(build, m) {
  const rng = random(198);
  slab(build, m.stone, corners, -0.51, -0.079, 0xcab08d);
  const foundation = corners.map(([x, z]) => [x + (x - 8.2) * 0.02, z * 1.016]);
  slab(build, m.stone, foundation, -1.068, -0.49, 0xbda485);
  slab(build, m.stone, corners, -0.096, -0.045, 0xe0ccaa);
  build.add(flatPolygon(corners, -0.041), m.grout, { cast: false, tint: 0xe6d8c1 });

  for (let row = 0; row < 10; row += 1) {
    const z = -side + row * 0.70;
    const shift = (row % 2) * 0.49;
    for (let col = -1; col < 8; col += 1) {
      const x = x0 + col * 0.94 + shift;
      let block = [[x + 0.008, z + 0.009], [x + 0.008, z + 0.692],
        [x + 0.929, z + 0.692], [x + 0.929, z + 0.009]];
      for (const constraint of [
        (x, z) => x - x0,
        (x, z) => x1 - x,
        (x, z) => side - Math.abs(z),
        (x, z) => x1 + side - chamfer - x - z,
        (x, z) => x1 + side - chamfer - x + z,
      ]) {
        block = clip(block, constraint);
        if (block.length < 3) break;
      }
      if (block.length < 3) continue;
      slab(build, m.paving, block, -0.04, -0.004 + rng() * 0.007,
        slabTints[Math.floor(rng() * slabTints.length)],
        { cast: false, uvOffset: [rng(), rng()] });
    }
  }
}

function parapet(build, m, a, b, offset, rng) {
  const dx = b[0] - a[0];
  const dz = b[1] - a[1];
  const length = Math.hypot(dx, dz);
  const turn = Math.atan2(-dz, dx);
  const point = (t, y, inset = 0) => [mix(a[0], b[0], t) - dz / length * (offset + inset),
    y, mix(a[1], b[1], t) + dx / length * (offset + inset)];
  const courses = [[0.067, 0.133, 0.44], [0.223, 0.17, 0.287],
    [0.401, 0.170, 0.294], [0.577, 0.169, 0.297], [0.700, 0.085, 0.392], [0.758, 0.034, 0.431]];
  build.box(m.grout, point(0.5, 0.36), [length, 0.68, 0.278], { rotation: [0, turn, 0] });
  for (const [row, [y, h, width]] of courses.entries()) {
    const count = Math.ceil(length / [0.73, 0.62, 0.49, 0.68, 0.82, 0.82][row]);
    for (let i = 0; i < count; i += 1) {
      const midpoint = (i + 0.5) / count;
      const hue = slabTints[Math.floor(rng() * slabTints.length)];
      build.box(m.stone, point(midpoint, y), [length / count - 0.014, h, width], {
        rotation: [0, turn, 0], tint: hue, uvOffset: [rng(), rng()],
      });
    }
  }
  const tileCount = Math.floor(length / 0.157);
  for (let i = 0; i < tileCount; i += 1) {
    const t = (i + 0.5) / tileCount;
    build.box(m.tile, point(t, 0.006, -0.298), [length / tileCount - 0.013, 0.014, 0.096], {
      rotation: [0, turn, 0], tint: [0x5a8580, 0x789f9a, 0x436c73, 0xc1b897][i % 4], cast: false,
    });
  }
}

function pavingCompass(build, m) {
  const center = [7.99, 0, 0.31];
  for (const [radius, width, material, tint] of [
    [0.805, 0.043, m.tile, 0x488b85], [0.850, 0.015, m.bronze, 0xe4c492],
    [0.692, 0.012, m.patina, 0x9ea38b], [0.157, 0.021, m.tile, 0x498c89],
  ]) {
    build.add(band(radius - width / 2, radius + width / 2, 0, tau, 0.002, 0.010, 64), material,
      { at: center, tint, cast: false });
  }
  for (let i = 0; i < 8; i += 1) {
    const angle = i * tau / 8;
    const length = i % 2 === 0 ? 0.68 : 0.48;
    const tip = polar(angle, length, 0.012);
    const mid = polar(angle, 0.050, 0.012);
    const a = polar(angle - 0.34, 0.275, 0.012);
    const b = polar(angle + 0.34, 0.275, 0.012);
    const star = new Draft();
    star.tri(mid, tip, b, { uv: [[0, 0], [0.60, 0.4], [0.3, 0.4]] });
    star.tri(mid, a, tip, { uv: [[0, 0], [0.3, 0.4], [0.6, 0.4]] });
    build.add(star.finish(), m.tile, { at: center, tint: i % 2 ? 0xafb09a : 0x468880, cast: false });
  }
  for (let i = 0; i < 24; i += 1) {
    const angle = i * tau / 24;
    const point = polar(angle, 0.91, 0.009);
    point[0] += center[0];
    point[2] += center[2];
    build.box(m.bronze, point, [0.014, 0.010, i % 3 ? 0.036 : 0.068],
      { rotation: [0, angle, 0], tint: 0xc5b084, cast: false });
  }
}

function furnishings(build, m) {
  const bench = blocks[2];
  for (const side of [-1, 1]) {
    build.box(m.stone, [bench.x + side * 0.73, 0.193, bench.z], [0.25, 0.386, 0.48], { tint: 0xe0caab });
    build.box(m.stone, [bench.x + side * 0.73, 0.046, bench.z], [0.31, 0.092, 0.54], { tint: 0xd2bb9f });
  }
  build.box(m.stone, [bench.x, 0.43, bench.z], [2.02, 0.125, 0.60], { tint: 0xf1dbb8 });
  build.box(m.stone, [bench.x, 0.494, bench.z], [1.98, 0.022, 0.56], { tint: 0xf2dfc0 });

  const marker = blocks[3];
  const at = (x, y, z) => [marker.x + x, y, marker.z + z];
  build.box(m.stone, at(0, 0.07, 0), [0.646, 0.14, 0.516], { tint: 0xd5b58c });
  build.box(m.stone, at(0, 0.414, 0), [0.46, 0.64, 0.39], { tint: 0xe2caa6 });
  build.box(m.stone, at(0, 0.771, 0), [0.63, 0.094, 0.50], { tint: 0xf1ddbd });
  build.cylinder(m.bronze, at(0, 0.837, 0), 0.204, 0.224, 0.04, { segments: 36, tint: 0xcabc98 });
  build.cylinder(m.patina, at(0, 0.862, 0), 0.176, 0.176, 0.026, { tint: 0xb1b298 });
  build.box(m.brass, at(0, 0.955, 0), [0.043, 0.176, 0.19], { rotation: [0, 0.32, -0.29] });
  for (let i = 0; i < 20; i += 1) {
    const a = i * tau / 20;
    build.box(m.brass, at(Math.sin(a) * 0.147, 0.881, Math.cos(a) * 0.147),
      [0.008, 0.012, i % 5 === 0 ? 0.04 : 0.024], { rotation: [0, a, 0], cast: false });
  }
}

export function makeTerrace(build, m) {
  build.section('Viewing terrace / flagstones');
  walkSlabs(build, m);
  pavingCompass(build, m);
  build.section('Viewing terrace / cut stone parapet');
  const rng = random(344);
  for (let i = 1; i < corners.length; i += 1) {
    parapet(build, m, corners[i], corners[(i + 1) % corners.length], -0.13, rng);
  }
  for (const sign of [-1, 1]) {
    const a = [x0, sign * 1.53];
    const b = [x0, sign * side];
    parapet(build, m, ...(sign === 1 ? [a, b] : [b, a]), -0.13, rng);
  }
  for (const [x, z] of corners) {
    const adjustX = x === x0 ? 0.13 : x === x1 ? -0.13 : -0.044;
    const adjustZ = -Math.sign(z) * 0.11;
    build.box(m.stone, [x + adjustX, 0.384, z + adjustZ], [0.327, 0.768, 0.323], { tint: 0xe1c8a3 });
    build.box(m.stone, [x + adjustX, 0.80, z + adjustZ], [0.445, 0.065, 0.429], { tint: 0xebd7b1 });
  }
  build.section('Viewing terrace / sighting station');
  furnishings(build, m);
}

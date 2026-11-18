import { Draft, band, frameAt, mix, polar, random, tau, tint } from './geometry.js';
import { angleDifference, doorways, porch, room, stairTreads } from './layout.js';

const stoneTints = [0xf2e6cd, 0xe1d3ba, 0xfdf0d8, 0xe9d9bd, 0xd2bd9e, 0xecdcc2];
const jadeTints = [0x49938c, 0x78aaa1, 0x2d6468, 0x3e7e80, 0xd8c59b];
const slabTints = [0xe2ccb3, 0xf5e5cb, 0xe9dfca, 0xccc3b1, 0xe9d2b4, 0xf9eed7, 0xe4d6bd];

export const archTop = (halfWidth, spring, rise, side) =>
  spring + rise * Math.sqrt(Math.max(0, 1 - (side / halfWidth) ** 2));

function openingHalf(door) {
  return Math.asin(door.halfWidth / room.radius);
}

function wallAngles() {
  const cuts = [0, tau];
  for (const door of doorways) {
    const half = openingHalf(door);
    for (const cut of [door.angle - half, door.angle + half]) cuts.push((cut + tau) % tau);
  }
  return cuts.sort((a, b) => a - b).slice(0, -1).map((start, i, cutsWithoutEnd) => {
    const end = cutsWithoutEnd[i + 1] ?? tau;
    const door = doorways.find(door => Math.abs(angleDifference((start + end) / 2, door.angle)) < openingHalf(door));
    return { start, end, door };
  });
}

function wallFace(draft, a, b, radius, l, m, h, n, inside) {
  const points = [polar(a, radius, l), polar(b, radius, m), polar(b, radius, n), polar(a, radius, h)];
  const u0 = a * radius;
  const u1 = b * radius;
  const uv = [[u0, l], [u1, m], [u1, n], [u0, h]];
  const sign = inside ? -1 : 1;
  const normals = [a, b, b, a].map(angle => [Math.sin(angle) * sign, 0, Math.cos(angle) * sign]);
  if (inside) {
    points.reverse();
    uv.reverse();
    normals.reverse();
  }
  const shadowA = 0.96 + 0.032 * Math.sin(a * 3.0 + 0.4);
  const shadowB = 0.96 + 0.032 * Math.sin(b * 3.0 + 0.4);
  const bottom = (y, factor) => tint(0xffffff, factor * (0.83 + 0.17 * Math.min(y / 1.2, 1)));
  const color = [bottom(l, shadowA), bottom(m, shadowB), tint(0xffffff, shadowB), tint(0xffffff, shadowA)];
  if (inside) color.reverse();
  draft.face(points, { uv, normal: normals, color });
}

export function voussoirs(build, material, map, {
  half, spring, rise, border, thickness, count = 11, colors = stoneTints, seam = 0.012,
}) {
  for (let i = 0; i < count; i += 1) {
    const draft = new Draft();
    const a = i * Math.PI / count + seam;
    const b = (i + 1) * Math.PI / count - seam;
    const key = i === Math.floor(count / 2) ? 0.05 : 0;
    const local = (angle, outer, depth) => {
      const offset = outer ? border + key : 0;
      return map(Math.cos(angle) * (half + offset), spring + Math.sin(angle) * (rise + offset), depth);
    };
    const steps = count > 6 ? 3 : 2;
    const face = (...points) => draft.face(thickness < 0 ? points.reverse() : points);
    for (let j = 0; j < steps; j += 1) {
      const t0 = mix(a, b, j / steps);
      const t1 = mix(a, b, (j + 1) / steps);
      const fa = local(t0, false, 0);
      const fb = local(t1, false, 0);
      const fc = local(t1, true, 0);
      const fd = local(t0, true, 0);
      const ba = local(t0, false, thickness);
      const bb = local(t1, false, thickness);
      const bc = local(t1, true, thickness);
      const bd = local(t0, true, thickness);
      face(fa, fd, fc, fb);
      face(bb, bc, bd, ba);
      face(fb, bb, ba, fa);
      face(fd, bd, bc, fc);
      if (j === 0) face(fa, ba, bd, fd);
      if (j === steps - 1) face(fb, fc, bc, bb);
    }
    build.add(draft.finish(), material, {
      tint: colors[(i * 5 + 2) % colors.length],
      uvScale: [0.32, 0.34],
      uvOffset: [i * 0.416, i * 0.327],
    });
  }
}

function circularTrim(build, m, door, inside) {
  const facing = inside ? -1 : 1;
  const surface = inside ? room.radius - 0.039 : room.outer + 0.072;
  const half = door.halfWidth * (inside ? 1 : room.outer / room.radius);
  const large = door.sill === 0;
  const border = large ? 0.23 : 0.14;
  const thickness = inside ? -0.116 : 0.157;
  const map = (side, y, depth) => frameAt(door.angle, Math.sqrt((surface - depth) ** 2 - side ** 2), side, y);
  // The stone forms both front faces and the returns against the actual circular opening.
  voussoirs(build, m.stone, map, { half, spring: door.spring, rise: door.rise, border, thickness,
    count: large ? 11 : 7, seam: large ? 0.007 : 0.012 });
  const courses = large ? 5 : 3;
  for (const sideSign of [-1, 1]) {
    for (let i = 0; i < courses; i += 1) {
      const y = mix(door.sill, door.spring, (i + 0.5) / courses);
      const side = (half + border * 0.43) * sideSign;
      const base = map(side, y, thickness * 0.36);
      const depth = large ? 0.16 : 0.13;
      build.box(m.stone, base, [border + 0.032, (door.spring - door.sill) / courses - 0.012, depth], {
        tint: stoneTints[(i + courses + sideSign) % stoneTints.length],
        rotation: [0, door.angle + facing * sideSign * 0.075, 0],
        uvOffset: [0.31 * i, 0.25],
      });
    }
    if (large) {
      build.box(m.stone, map((half + border * 0.45) * sideSign, door.spring - 0.025, 0),
        [border + 0.10, 0.118, 0.185], { rotation: [0, door.angle, 0], tint: 0xe4d4b4 });
    }
  }
  if (!large) {
    build.box(m.stone, map(0, door.sill - 0.004, 0.065), [half * 2 + border * 2 + 0.06, 0.122, 0.33],
      { rotation: [0, door.angle, 0], tint: 0xf3e0bb });
  }
}

function chamberWalls(build, m) {
  build.section('Circular chamber / walls');
  const outside = new Draft();
  const inside = new Draft();
  const reveals = new Draft();

  for (const { start, end, door } of wallAngles()) {
    const steps = Math.max(3, Math.ceil((end - start) / (door ? 0.017 : 0.075)));
    const cut = angle => archTop(door.halfWidth, door.spring, door.rise,
      Math.sin(angleDifference(angle, door.angle)) * room.radius);
    for (let step = 0; step < steps; step += 1) {
      const a = mix(start, end, step / steps);
      const b = mix(start, end, (step + 1) / steps);
      const ha = door ? cut(a) : -0.29;
      const hb = door ? cut(b) : -0.29;
      for (const [mesh, radius, interior] of [[outside, room.outer, false], [inside, room.radius, true]]) {
        wallFace(mesh, a, b, radius, ha, hb, room.height, room.height, interior);
        if (door) wallFace(mesh, a, b, radius, -0.29, -0.29, door.sill, door.sill, interior);
      }
      if (!door) continue;
      const reveal = (yA, yB, up) => {
        const points = [
          polar(a, room.radius, yA), polar(b, room.radius, yB),
          polar(b, room.outer, yB), polar(a, room.outer, yA),
        ];
        if (up) points.reverse();
        const sa = a * room.radius;
        const sb = b * room.radius;
        const uv = [[sa, 0], [sb, 0], [sb, 0.68], [sa, 0.68]];
        if (up) uv.reverse();
        reveals.face(points, { uv });
      };
      reveal(ha, hb, false);
      if (door.sill) reveal(door.sill, door.sill, true);
    }
  }
  for (const door of doorways) {
    const half = openingHalf(door);
    for (const side of [-1, 1]) {
      const a = door.angle + side * half;
      const face = [
        polar(a, room.radius, door.sill), polar(a, room.outer, door.sill),
        polar(a, room.outer, door.spring), polar(a, room.radius, door.spring),
      ];
      if (side < 0) face.reverse();
      reveals.face(face, { uv: [[0, 0], [0.68, 0], [0.68, 2], [0, 2]] });
    }
    circularTrim(build, m, door, false);
    circularTrim(build, m, door, true);
  }
  build.add(outside.finish(), m.plaster);
  build.add(inside.finish(), m.innerPlaster);
  build.add(reveals.finish(), m.stone, { tint: 0xe3d6bc });

  const zones = wallAngles();
  const rng = random(160);
  for (const { start, end, door } of zones) {
    if (door && door.sill === 0) continue;
    build.add(band(4.49, 4.61, start, end, 0, 0.23, Math.max(3, Math.ceil((end - start) * 16))),
      m.stone, { tint: 0xded5c1 });
    build.add(band(4.44, 4.62, start, end, 0.21, 0.265, Math.max(3, Math.ceil((end - start) * 16))),
      m.stone, { tint: 0xf1dfbe });
    build.add(band(5.27, 5.46, start, end, -0.31, -0.01, Math.max(3, Math.ceil((end - start) * 16))),
      m.stone, { tint: 0xd4b691 });
    build.add(band(5.25, 5.39, start, end, -0.025, 0.074, Math.max(3, Math.ceil((end - start) * 16))),
      m.stone, { tint: 0xe8cc9d });
    const pieces = Math.max(1, Math.ceil((end - start) * 31));
    for (let i = 0; i < pieces; i += 1) {
      const a = mix(start, end, i / pieces) + 0.0011;
      const b = mix(start, end, (i + 1) / pieces) - 0.0011;
      if (b <= a) continue;
      build.add(band(4.563, 4.61, a, b, 0.294, 0.392, 2), m.tile, {
        tint: jadeTints[Math.floor(rng() * jadeTints.length)],
        uvOffset: [rng(), rng()],
      });
    }
  }
  build.add(band(4.48, 5.39, 0, tau, 3.39, 3.51, 100), m.stone, { tint: 0xd3bc94 });
  build.add(band(4.50, 5.44, 0, tau, 3.57, 3.76, 100), m.stone, { tint: 0xf4dfb6 });
  build.add(band(4.62, 5.52, 0, tau, 3.75, 3.83, 100), m.stone, { tint: 0xe3c79e });
  build.add(band(5.265, 5.354, 0, tau, 3.48, 3.545, 100), m.tile, { tint: 0x64938e });
  build.add(band(4.52, 4.67, 0, tau, 3.62, 3.67, 100), m.patina, { tint: 0xe2ddba });
  for (let i = 0; i < 36; i += 1) {
    const a = i * tau / 36;
    build.box(m.stone, polar(a, 5.32, 3.34), [0.22, 0.14, 0.20], {
      rotation: [0, a, 0], tint: stoneTints[i % stoneTints.length],
    });
  }
}

function curvedPaver(a, b, r0, r1, y, shade) {
  const draft = new Draft();
  const steps = Math.max(2, Math.ceil((b - a) / 0.085));
  for (let i = 0; i < steps; i += 1) {
    const aa = mix(a, b, i / steps);
    const bb = mix(a, b, (i + 1) / steps);
    const p0 = polar(aa, r0, y);
    const p1 = polar(aa, r1, y);
    const p2 = polar(bb, r1, y);
    const p3 = polar(bb, r0, y);
    draft.quad(p0, p1, p2, p3, { uv: [p0, p1, p2, p3].map(p => [p[0], p[2]]) });
    const high = y - 0.009;
    draft.quad(p1, polar(aa, r1 + 0.007, high), polar(bb, r1 + 0.007, high), p2, { color: shade });
    draft.quad(p3, polar(bb, r0 - 0.007, high), polar(aa, r0 - 0.007, high), p0, { color: shade });
  }
  return draft.finish();
}

function interiorFloor(build, m) {
  build.section('Circular chamber / paving');
  build.cylinder(m.stone, [0, -0.573, 0], 5.29, 5.40, 1.016, { segments: 108, tint: 0xd3ae83 });
  build.cylinder(m.grout, [0, -0.056, 0], 4.642, 4.642, 0.082, { segments: 108 });
  const rng = random(70);
  const courses = [0.95, 1.53, 2.15, 2.78, 3.38, 4.00, 4.62];
  for (let row = 0; row < courses.length - 1; row += 1) {
    const r = courses[row];
    const t = courses[row + 1];
    const count = 12 + row * 4;
    for (let i = 0; i < count; i += 1) {
      const a = (i + (row % 2) * 0.5) * tau / count;
      const b = a + tau / count;
      const gap = 0.006 / r;
      const shade = tint(0xffffff, 0.81 + rng() * 0.13);
      build.add(curvedPaver(a + gap, b - gap, r + 0.008, t - 0.008, -0.004 + rng() * 0.006, shade),
        m.paving, { cast: false, tint: slabTints[Math.floor(rng() * slabTints.length)], uvOffset: [rng(), rng()] });
    }
  }
  build.cylinder(m.stone, [0, -0.065, 0], 0.966, 0.966, 0.127, { tint: 0xd7c5a7, cast: false });
  for (const [r, width, material] of [[1.54, 0.012, m.brass], [2.148, 0.026, m.tile], [2.183, 0.011, m.brass]]) {
    build.add(band(r - width / 2, r + width / 2, 0, tau, -0.003, 0.006, 120), material,
      { tint: 0x82a398, cast: false });
  }
  for (let i = 0; i < 48; i += 1) {
    const a = i * tau / 48;
    const long = i % 6 === 0;
    build.box(long ? m.tile : m.bronze, polar(a, 2.235 + (long ? 0.031 : 0), 0.004),
      [long ? 0.027 : 0.013, 0.006, long ? 0.118 : 0.055],
      { rotation: [0, a, 0], tint: long ? 0x4b9d97 : 0xbda27b, cast: false });
  }
  for (const [x, z, angle] of [[0, 4.91, 0], [4.93, 0, Math.PI / 2]]) {
    build.box(m.stone, [x, -0.115, z], [2.67, 0.226, 1.38], { tint: 0xe2cdab, rotation: [0, angle, 0] });
    for (const side of [-1, 1]) {
      const at = frameAt(angle, Math.hypot(x, z), side * 1.22, 0.007);
      build.box(m.tile, at, [0.06, 0.016, 1.20], { tint: 0x78a6a0, rotation: [0, angle, 0], cast: false });
    }
  }
}

function passageSide(build, m, side) {
  const x = side * 1.79;
  const breaks = [[4.71, 6.53], [6.53, 6.91], [6.91, 8.87], [8.87, 9.21], [9.21, 10.73]];
  const createCourse = (back, front, bottom, top, tone) => {
    build.box(m.plaster, [x, (top + bottom) / 2, (back + front) / 2], [0.66, top - bottom, front - back], {
      tint: tone, uvOffset: [side * 0.17, back * 0.31],
    });
  };
  for (const [i, [back, front]] of breaks.entries()) {
    if (i % 2 === 0) {
      createCourse(back, front, -0.30, 3.16, 0xf2e1c4);
    } else {
      createCourse(back, front, -0.30, 1.99, 0xf2e1c4);
      createCourse(back, front, 2.48, 3.16, 0xf2e1c4);
      for (const y of [1.995, 2.478]) {
        build.box(m.stone, [side * 1.82, y, (back + front) / 2], [0.80, 0.065, front - back + 0.15], {
          tint: 0xf1d9ae,
        });
      }
      for (const z of [back - 0.029, front + 0.029]) {
        build.box(m.stone, [side * 2.106, 2.237, z], [0.10, 0.46, 0.075], { tint: 0xdec091 });
      }
      build.bar(m.darkMetal, [side * 1.85, 1.99, (back + front) / 2], [side * 1.85, 2.48, (back + front) / 2], 0.014);
    }
  }
  for (const [y, width, height, material] of [[0.11, 0.75, 0.22, m.stone], [0.235, 0.78, 0.058, m.stone]]) {
    build.box(material, [x, y, 7.71], [width, height, 5.98], { tint: 0xd9c19c });
  }
  for (const z of [5.57, 7.80, 10.15]) {
    for (let course = 0; course < 4; course += 1) {
      build.box(m.stone, [side * 1.477, 0.326 + course * 0.395, z],
        [0.23, 0.381, 0.235], { tint: stoneTints[(course + 4) % stoneTints.length] });
    }
    build.box(m.stone, [side * 1.47, 1.94, z], [0.26, 0.46, 0.26], { tint: 0xf0debb });
    build.box(m.stone, [side * 1.466, 2.17, z], [0.28, 0.071, 0.322], { tint: 0xcab18b });
  }
}

function barrelVault(build, m) {
  const draft = new Draft();
  const rows = 34;
  const z0 = 4.69;
  const z1 = 10.77;
  const inner = side => archTop(1.464, 2.18, 0.97, side);
  for (let i = 0; i < rows; i += 1) {
    const a = mix(-1.464, 1.464, i / rows);
    const b = mix(-1.464, 1.464, (i + 1) / rows);
    const y0 = inner(a);
    const y1 = inner(b);
    draft.quad([a, y0, z0], [b, y1, z0], [b, y1, z1], [a, y0, z1],
      { uv: [[a, z0], [b, z0], [b, z1], [a, z1]] });
  }
  build.add(draft.finish(), m.innerPlaster, { tint: 0xdec7a0 });
  for (const z of [5.57, 7.80, 10.15]) {
    voussoirs(build, m.stone, (x, y, d) => [x, y, z + 0.115 - d],
      { half: 1.366, spring: 2.162, rise: 0.90, border: 0.16, thickness: 0.23, count: 13, seam: 0.005 });
  }
  const roof = [[3.254, 0.163, 4.30], [3.363, 0.087, 4.48], [3.443, 0.076, 4.32]];
  for (const [y, height, width] of roof) {
    build.box(m.stone, [0, y, 7.71], [width, height, 6.11], { tint: 0xe9d0a7 });
  }
  for (const side of [-1, 1]) {
    build.box(m.plaster, [side * 2.045, 3.58, 7.71], [0.36, 0.30, 6.17], { tint: 0xf6e0ba });
    build.box(m.stone, [side * 2.048, 3.763, 7.71], [0.43, 0.079, 6.24], { tint: 0xe4c79b });
    for (const z of [5.76, 8.0, 10.22]) {
      build.box(m.stone, [side * 2.14, 3.465, z], [0.22, 0.16, 0.32], { tint: 0xe1cca8 });
    }
  }
}

function portalFace(build, m, art) {
  const draft = new Draft();
  const z = 10.845;
  const bottomAt = x => archTop(1.423, 2.17, 0.97, x);
  for (let i = 0; i < 32; i += 1) {
    const a = mix(-1.423, 1.423, i / 32);
    const b = mix(-1.423, 1.423, (i + 1) / 32);
    const ay = bottomAt(a);
    const by = bottomAt(b);
    draft.quad([a, ay, z], [b, by, z], [b, 3.72, z], [a, 3.72, z], { uv: [[a, ay], [b, by], [b, 3.72], [a, 3.72]] });
    draft.quad([b, by, z], [a, ay, z], [a, ay, z - 0.28], [b, by, z - 0.28], {
      uv: [[b, 0], [a, 0], [a, 0.28], [b, 0.28]],
    });
    draft.quad([b, by, z - 0.28], [a, ay, z - 0.28], [a, 3.72, z - 0.28], [b, 3.72, z - 0.28]);
  }
  build.add(draft.finish(), m.plaster);
  for (const side of [-1, 1]) {
    build.box(m.plaster, [side * 1.856, 1.67, 10.62], [0.869, 4.10, 0.45], { tint: 0xf8eacd });
    build.box(m.stone, [side * 2.106, -0.11, 10.69], [0.53, 0.42, 0.60], { tint: 0xceb086 });
    for (let j = 0; j < 6; j += 1) {
      build.box(m.stone, [side * 1.535, (j + 0.5) * 2.17 / 6, 10.841],
        [0.255, 2.17 / 6 - 0.012, 0.26], { tint: stoneTints[(j + 3) % stoneTints.length] });
    }
    build.box(m.stone, [side * 1.555, 2.16, 10.862], [0.32, 0.106, 0.31], { tint: 0xd7bf97 });
    build.box(m.stone, [side * 1.967, 1.70, 10.866], [0.283, 2.25, 0.106], { tint: 0xf5e2bb });
    for (let i = 0; i < 20; i += 1) {
      const y = 0.657 + i * 0.109;
      const tileTint = jadeTints[(i * 2 + 1) % jadeTints.length];
      build.box(m.tile, [side * 1.967, y, 10.924], [0.171, 0.101, 0.024],
        { tint: tileTint, uvOffset: [i * 0.324, 0.32] });
      build.box(m.tile, [side * 1.967, y, 10.940], [0.045, 0.045, 0.008],
        { tint: i % 2 ? 0xb7c2a2 : 0x315f64, rotation: [0, 0, Math.PI / 4], cast: false });
    }
    const doorX = side * 1.431;
    for (let i = 0; i < 5; i += 1) {
      build.box(m.wood, [doorX - side * 0.013, 1.04, 10.33 - i * 0.146], [0.075, 2.06, 0.14], {
        tint: [0xc9b095, 0xd5bd9e, 0xa89175][i % 3], uvOffset: [i * 0.47, 0.11],
      });
    }
    for (const y of [0.28, 0.98, 1.78]) {
      build.box(m.darkMetal, [doorX - side * 0.058, y, 10.038], [0.031, 0.090, 0.72], { tint: 0xe1cbab });
      for (const dz of [-0.28, 0, 0.28]) {
        build.rock(m.bronze, [doorX - side * 0.079, y, 10.041 + dz], [0.018, 0.019, 0.019]);
      }
    }
    build.ring(m.bronze, [doorX - side * 0.103, 1.05, 9.79], 0.066, 0.012,
      { rotation: [0, Math.PI / 2, 0], segments: 21 });
  }
  voussoirs(build, m.stone, (x, y, d) => [x, y, 10.997 - d],
    { half: 1.425, spring: 2.169, rise: 0.978, border: 0.252, thickness: 0.265, count: 13, seam: 0.008 });
  build.box(m.stone, [0, 3.705, 10.73], [4.71, 0.176, 0.69], { tint: 0xebcb9d });
  build.box(m.stone, [0, 3.823, 10.74], [4.84, 0.075, 0.78], { tint: 0xf3dcaf });
  build.box(m.grout, [0, 3.524, 10.881], [0.90, 0.329, 0.087]);
  build.plane(art.sign, [0, 3.524, 10.93], 0.855, 0.32);
}

function stepsAndCourt(build, m) {
  build.section('Approach / steps and apron');
  const rng = random(738);
  build.box(m.grout, [0, -0.851, 13.56], [8.51, 0.336, 2.91], { cast: false });
  for (let j = 0; j < 4; j += 1) {
    const z = 12.465 + j * 0.716;
    for (let i = 0; i < 10; i += 1) {
      const x = (i - 4.5 + (j % 2) * 0.11) * 0.845;
      build.box(m.paving, [x, -0.703, z], [0.829, 0.043, 0.700], {
        tint: slabTints[Math.floor(rng() * slabTints.length)], rotation: [0, (rng() - 0.5) * 0.007, 0],
        uvOffset: [rng(), rng()], cast: false,
      });
    }
  }
  let back = 10.51;
  for (const [index, tread] of stairTreads.entries()) {
    const length = tread.front - back;
    const foundationTop = tread.height - 0.092;
    const foundationBottom = -1.065;
    build.box(m.stone, [0, (foundationTop + foundationBottom) / 2, (back + tread.front) / 2],
      [4.49, foundationTop - foundationBottom, length], { tint: 0xcbb18f, uvOffset: [index * 0.46, 0.24] });
    build.box(m.grout, [0, tread.height - 0.08, (back + tread.front) / 2],
      [4.48, 0.14, length], { tint: 0xe0d3bc });
    for (let i = 0; i < 6; i += 1) {
      const x = (i - 2.5) * 0.742;
      build.box(m.stone, [x, tread.height - 0.053, (back + tread.front) / 2],
        [0.728, 0.106, length + 0.038],
        { tint: stoneTints[(i + index * 2) % stoneTints.length], uvOffset: [rng(), rng()] });
      build.box(m.stone, [x, tread.height - 0.029, tread.front + 0.009],
        [0.728, 0.054, 0.049], { tint: stoneTints[(i + index + 2) % stoneTints.length] });
    }
    back = tread.front;
  }
  for (const side of [-1, 1]) {
    const x = side * 2.37;
    for (let i = 0; i < 4; i += 1) {
      const y = -0.195 - i * 0.128;
      build.box(m.stone, [x, y, 11.016 + i * 0.392], [0.33, 0.60 - i * 0.095, 0.401],
        { tint: 0xe0c9a5 });
      build.box(m.stone, [x, y + 0.311 - i * 0.0475, 11.016 + i * 0.392], [0.40, 0.078, 0.406],
        { tint: 0xe7d3ab });
    }
  }
}

export function makeChamber(build, m, art) {
  chamberWalls(build, m);
  interiorFloor(build, m);
  build.section('Circular chamber / terrace sign');
  build.box(m.darkMetal, [4.302, 2.83, -1.57], [0.030, 0.282, 0.80], { rotation: [0, 0.30, 0] });
  build.plane(art.way, [4.282, 2.831, -1.575], 0.76, 0.222, { rotation: [0, -1.27, 0] });
}

export function makePassage(build, m, art) {
  build.section('Entrance passage / masonry');
  build.box(m.stone, [0, -0.652, 7.73], [4.31, 0.81, 6.12], { tint: 0xcbb18d });
  build.box(m.stone, [0, -0.241, 7.73], [4.39, 0.117, 6.14], { tint: 0xe7d0ab });
  for (const side of [-1, 1]) {
    for (let i = 0; i < 9; i += 1) {
      build.box(m.stone, [side * 2.129, -0.435, 4.93 + i * 0.692], [0.172, 0.283, 0.678],
        { tint: stoneTints[(i + 1) % stoneTints.length], uvOffset: [i * 0.31, 0.62] });
    }
  }
  passageSide(build, m, -1);
  passageSide(build, m, 1);
  barrelVault(build, m);
  portalFace(build, m, art);

  build.section('Entrance passage / paving');
  build.box(m.grout, [0, -0.125, 7.76], [3.58, 0.24, 5.89], { cast: false });
  const rng = random(887);
  for (let z = 0; z < 10; z += 1) {
    const offset = z % 2 === 0 ? 0.044 : -0.062;
    for (let x = 0; x < 4; x += 1) {
      build.box(m.paving, [(x - 1.5) * 0.737 + offset, -0.029, 5.32 + z * 0.558], [0.722, 0.056, 0.543],
        { tint: slabTints[Math.floor(rng() * slabTints.length)], uvOffset: [rng(), rng()], cast: false });
    }
  }
  for (const side of [-1, 1]) {
    build.box(m.stone, [side * 1.398, -0.034, 8.03], [0.19, 0.064, 5.5], { tint: 0xcab499, cast: false });
  }
  stepsAndCourt(build, m);
}

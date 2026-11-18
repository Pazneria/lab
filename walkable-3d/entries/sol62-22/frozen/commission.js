import * as THREE from 'three';
import { clamp, grid, lerp, material, PI, rng, sampleLine, TAU } from './geometry.js';
import { frame } from './furnishings.js';
import { placard } from './materials.js';

export const FORM = Object.freeze({ x: -.88, z: -8.82, yaw: -.11 });

const sections = [
  [1.145, .187, .140, .140, -.012],
  [1.255, .212, .155, .153, -.016],
  [1.388, .190, .138, .130, -.019],
  [1.505, .171, .137, .120, -.013],
  [1.634, .198, .157, .132, -.004],
  [1.773, .245, .181, .149, -.005],
  [1.871, .254, .157, .158, -.012],
  [1.948, .240, .124, .134, -.012],
  [1.995, .196, .104, .117, -.014],
  [2.061, .089, .086, .094, -.014],
  [2.134, .072, .074, .079, -.013],
];

function torso(angle, y, amount = 0) {
  let i = 1;
  while (i < sections.length - 1 && sections[i][0] < y) i++;
  const first = sections[i - 1], last = sections[i];
  const t = clamp((y - first[0]) / (last[0] - first[0]), 0, 1);
  const co = Math.cos(angle), si = Math.sin(angle);
  const width = lerp(first[1], last[1], t);
  const front = lerp(first[2], last[2], t);
  const back = lerp(first[3], last[3], t);
  const mid = lerp(first[4], last[4], t);
  return [si * (width + amount), y, mid + co * ((co > 0 ? front : back) + amount)];
}

function seam(f, point, radius, mat, segments = 30) {
  f.tube(sampleLine(point, Math.max(11, Math.ceil(segments / 2))), radius, mat, false, segments);
}

function stitches(f, point, count, mat, rad = .0016, ratio = .58) {
  for (let i = 0; i < count; i++) {
    f.link(point((i + .11) / count), point((i + .11 + ratio) / count), rad, mat, 5);
  }
}

function shifted(point, dx, dy, dz) {
  return [point[0] + dx, point[1] + dy, point[2] + dz];
}

function dressForm(f, p) {
  const linen = p.cloth('flax', 'linen');
  f.put(grid(48, 36, (u, t) => torso(u * TAU, lerp(1.145, 2.134, t)),
    (u, t) => [u * 1.8, t * 1.66]), linen, 0, 0, 0, { cast: true });
  f.cylinder(0, 1.145, -.015, .137, .137, .037, p.darkOak, { sx: 1.37 }, 26);
  f.cylinder(0, .708, -.011, .023, .026, .902, p.brassDark, { cast: true }, 15);
  f.cylinder(0, .711, -.011, .031, .031, .105, p.brass, {}, 16);
  f.cylinder(0, .249, -.011, .092, .146, .082, p.darkOak, { cast: true });
  f.cylinder(0, .296, -.011, .056, .078, .030, p.walnut, { cast: true });
  f.torus(0, .331, -.011, .040, .010, p.brass, { rx: -PI / 2 }, TAU, 23);
  f.sphere(0, 1.135, .043, .038, .035, .038, p.walnut);
  f.cylinder(0, 2.143, -.014, .074, .090, .053, p.darkOak, { cast: true }, 26);
  f.cylinder(0, 2.172, -.014, .068, .087, .025, p.walnut, { cast: true }, 26);
  f.sphere(0, 2.217, -.014, .048, .050, .049, p.walnut, { cast: true }, 20);
  f.cylinder(0, 2.260, -.014, .014, .026, .027, p.brass, {}, 18);
  f.torus(0, 2.150, -.014, .082, .005, p.brass, { rx: -PI / 2 });
  stitches(f, t => torso(0, lerp(1.245, 2.131, t), .0009), 29, p.kraft, .0013);
  seam(f, t => torso(PI, lerp(1.19, 2.132, t), .002), .0027, p.kraft);
  for (const side of [-1, 1]) {
    f.sphere(side * .237, 1.855, -.009, .106, .146, .121, linen, { rz: side * .19, cast: true }, 22);
  }
  f.put(grid(25, 20, (s, t) => {
    const a = TAU * s, radius = lerp(.103, .083, t);
    return [.285 + .106 * t + Math.sin(a) * radius, 1.879 - .314 * t,
      .031 + .052 * t + Math.cos(a) * radius];
  }, undefined, true), linen, 0, 0, 0, { cast: true });
  f.sphere(.391, 1.565, .083, .082, .041, .083, linen, { cast: true });
  seam(f, u => [.391 + Math.sin(TAU * u) * .081, 1.57 + .004 * Math.sin(TAU * u), .083 + Math.cos(TAU * u) * .081],
    .0026, p.kraft, 36);
}

const edges = {
  front: y => lerp(.20, .77, clamp((y - 1.54) / .50, 0, 1)) + .035 * Math.sin((y - 1.27) * 12),
  opposite: y => TAU - lerp(.09, .61, clamp((y - 1.56) / .49, 0, 1)),
};

function jacket(f, p) {
  const main = p.cloth('ink', 'velvet'), side = p.cloth('peacock', 'linen');
  const facing = p.cloth('peacock', 'brocade'), underFacing = p.cloth('garnet', 'silk');
  const panels = [
    [edges.front, .99, p.cloth('navy', 'velvet')],
    [.99, 2.03, side], [2.03, PI, main], [PI, 4.27, main],
    [4.27, 5.27, side], [5.27, edges.opposite, main],
  ];
  const yAt = (t, a) => lerp(1.285 - Math.cos(a) * .014, 2.056, t);
  for (const [begin, end, mat] of panels) {
    const point = (s, t, shift = 0) => {
      const y = lerp(1.27, 2.056, t);
      const start = typeof begin === 'function' ? begin(y) : begin, stop = typeof end === 'function' ? end(y) : end;
      const angle = lerp(start, stop, s);
      const loose = Math.sin(s * PI) ** 2 * .004 + .002 * Math.sin(t * 12 + s * 3) * Math.sin(s * PI);
      return torso(angle, yAt(t, angle), .023 + loose + shift);
    };
    f.put(grid(22, 33, point, (s, t) => [s * .9, t * 1.20]), mat, 0, 0, 0, { cast: true });
    seam(f, t => point(0, t, .0008), .0028, p.cloth('navy', 'silk'), 32);
    if (begin === .99 || begin === 4.27) stitches(f, t => point(.039, t, .0016), 29, p.stitch, .00155, .40);
  }

  const leftLapel = (s, t, shift = 0) => {
    const y = lerp(1.46, 2.04, t) + .015 * Math.sin(s * PI) * Math.sin(t * PI);
    const from = edges.opposite(y) + .049 + .15 * Math.sin(t * PI);
    const to = from - (.13 + .59 * Math.sin(t * PI * .76));
    const a = lerp(from, to, s);
    return torso(a, y, .028 + (.047 * Math.sin(s * PI) + .028 * (1 - s)) * Math.sin(t * PI) + shift);
  };
  f.put(grid(15, 28, leftLapel, (s, t) => [s * .52, t * 1.2]), facing, 0, 0, 0, { cast: true });
  seam(f, t => leftLapel(.02, t, .003), .0045, p.gold);
  seam(f, t => leftLapel(.94, t, .002), .0023, p.brass);

  const provisional = (s, t, shift = 0) => {
    const y = lerp(1.43, 2.012, t);
    const cart = torso(edges.front(y) + .18, y, .025);
    const span = Math.sin(t * PI * .99) ** .69;
    return [cart[0] - s * (.040 + .119 * span) + .137 * s ** 2 * Math.sin(t * PI),
      y + s * .018 * Math.sin(t * TAU + .3),
      cart[2] + (.022 + .100 * span) * s + .033 * Math.sin(s * PI) * span + shift];
  };
  f.put(grid(15, 30, provisional, (s, t) => [s * .54, t * .99]), underFacing, 0, 0, 0, { cast: true });
  f.put(grid(15, 30, (s, t) => provisional(s, t, -.0046), (s, t) => [s * .54, t * .99]), facing);
  seam(f, t => provisional(1, t, .001), .0033, p.raw);
  stitches(f, t => provisional(.91, t, .0027), 20, p.stitch, .0019, .51);
  const random = rng(713);
  for (let i = 0; i < 20; i++) {
    const t = (i + .47) / 21, a = provisional(1, t, .001);
    const b = shifted(a, -.009 - random() * .012, (random() - .5) * .014, -.004 + random() * .014);
    f.link(a, b, .0009, i % 3 ? p.raw : p.stitch, 4);
  }
  for (let i = 0; i < 7; i++) {
    const t = .10 + i * .107, a = provisional(.80 + (i % 2) * .10, t, .003);
    const b = shifted(a, -.024 + .002 * i, .015, .009 + .006 * Math.sin(i));
    f.link(a, b, .0016, p.steel, 5);
    f.sphere(...b, .0052, .006, .0054, i % 2 ? p.pinHead : p.raw, {}, 10);
  }
  for (const [x, y, z] of [provisional(1, .21), provisional(1, .58), provisional(.94, .82)]) {
    f.tube([[x, y, z], [x - .017, y - .017, z + .011],
      [x - .013, y - .050, z + .020], [x - .032, y - .076, z + .018]], .0015, p.stitch, false, 13);
  }

  for (let i = 0; i < 5; i++) {
    const y = 1.410 + i * .064, a = edges.opposite(y) - .138;
    const [u, h, v] = torso(a, y, .035);
    f.cylinder(u, h, v, .0137, .012, .007, p.brassDark, { rx: PI / 2, ry: -.28 }, 16);
    f.sphere(u, h, v + .006, .0126, .0125, .0043, p.gold, {}, 13);
    f.torus(u, h, v + .009, .0072, .0013, p.brassDark, {}, TAU, 16);
  }
  for (const y of [1.544, 1.615]) {
    const x = -.155, z = .206;
    const loop = sampleLine(t => {
      const xx = x + t * .24;
      return [xx, y - Math.sin(t * PI) * (.065 + (y - 1.54) * .38), z + .033 * Math.sin(t * PI)];
    }, 14);
    f.tube(loop, .0042, p.brass, false, 24);
    for (let i = 2; i < 13; i += 2) f.sphere(...loop[i], .0073, .0061, .0061, p.brightGold, {}, 9);
  }
}

const tails = [
  { a: .31, b: 1.48, endA: .66, endB: 1.58, frontY: .78, backY: .47, set: 0 },
  { a: 1.48, b: 3.12, endA: 1.592, endB: 3.055, frontY: .47, backY: .32, set: 1 },
  { a: 3.15, b: 4.72, endA: 3.225, endB: 4.70, frontY: .33, backY: .52, set: 2 },
  { a: 4.72, b: 6.16, endA: 4.712, endB: 5.88, frontY: .52, backY: .82, set: 3 },
];

function tailPoint(tail, s, t, off = 0) {
  const base = lerp(tail.a, tail.b, s);
  const amount = t ** 1.64;
  const turn = lerp(tail.endA, tail.endB, s);
  const a = lerp(base, turn, amount) + .065 * Math.sin(s * PI) * Math.sin(t * PI * 1.6);
  const pleatPhase = s * TAU * (tail.set === 0 ? 1.35 : 2.03) + t * 1.3 + tail.set * 1.01;
  const pleat = (.019 * t + .032 * t ** 2) * Math.sin(pleatPhase) * Math.sin(s * PI) ** .54;
  const drape = lerp(.180, .463 + .035 * Math.sin(tail.set * 1.7), amount) + off + pleat;
  const reach = lerp(.145, .398, amount) + off + pleat;
  const hem = lerp(tail.frontY, tail.backY, s);
  const y = lerp(1.385 + .016 * Math.sin(base), hem, t) + (.021 * Math.sin(s * PI * 2.22) + .014 * Math.sin(s * PI * 6)) * t ** 5;
  return [Math.sin(a) * drape + .065 * t ** 2 * Math.cos(base * .8), y,
    -.014 + Math.cos(a) * reach + .062 * t ** 2 * Math.sin(tail.set * 2.07 + .81)];
}

function ornament(f, surface, center, size, p, variant = 0) {
  const [u0, t0] = center, [du, dt] = size;
  const point = (u, t, lift = .0035) => surface(clamp(u0 + u * du, .008, .992), clamp(t0 + t * dt, .009, .991), lift);
  for (const [scale, color] of [[1, p.brass], [.82, p.brightGold]]) {
    seam(f, t => point(Math.sin(t * TAU) * scale, Math.cos(t * TAU) * scale), .0019, color, 38);
  }
  for (let arm = 0; arm < 8; arm++) {
    const a = TAU * arm / 8;
    const end = arm % 2 ? .32 : .58, ax = Math.sin(a), ay = Math.cos(a);
    seam(f, t => point(ax * end * t + ay * Math.sin(t * PI) * .079,
      ay * end * t - ax * Math.sin(t * PI) * .079, .0048), .0029, p.brightGold, 11);
    f.sphere(...point(ax * end, ay * end, .005), .0040, .0043, .0040, p.gold, {}, 8);
  }
  f.sphere(...point(0, 0, .005), .012, .0115, .0104, variant ? p.moonGlass : p.gold, {}, 12);
}

function tailPanels(f, p) {
  const shell = [p.cloth('ink', 'velvet'), p.cloth('ink', 'brocade'),
    p.cloth('navy', 'brocade'), p.cloth('peacock', 'velvet')];
  const lining = [p.cloth('salmon', 'silk'), p.cloth('paprika', 'moire'),
    p.cloth('wine', 'silk'), p.cloth('garnet', 'silk')];

  for (let i = 0; i < tails.length; i++) {
    const tail = tails[i];
    const fn = (s, t, off = 0) => tailPoint(tail, s, t, off);
    f.put(grid(27, 32, fn, (s, t) => [s * 1.36, t * 2.14], true), shell[i], 0, 0, 0, { cast: true });
    f.put(grid(25, 31, (s, t) => fn(s, t, -.008), (s, t) => [s * 1.35, t * 1.55]),
      lining[i]);
    for (const t of [.956, .984]) {
      seam(f, s => fn(s, t, .0019), i === 0 ? .0022 : .0035, i === 0 ? p.raw : p.gold, 40);
    }
    for (const s of [.008, .989]) {
      seam(f, t => fn(s, t, .001), .0047, i === 0 ? p.raw : p.brassDark, 34);
    }
    if (i === 0) {
      stitches(f, s => fn(s, .933, .004), 23, p.stitch, .0020, .46);
      stitches(f, t => fn(.035, t, .0035), 31, p.stitch, .00175, .49);
      for (let k = 0; k < 26; k++) {
        const [u, h, v] = fn((k + .5) / 26, .998, .0002);
        f.link([u, h, v], [u + .005 * Math.sin(k * 1.1), h - .009 - .008 * Math.sin(k * .32) ** 2,
          v - .003 * Math.cos(k * 1.4)], .00085, k % 3 ? p.raw : p.stitch, 4);
      }

      const openFlare = (s, t) => {
        const pt = fn(.024 + (.100 + .24 * t) * s, .45 + .55 * t, -.005);
        return shifted(pt, -.084 * (1 - s) ** 1.6 * t, .036 * (1 - s) * t,
          .091 * (1 - s) * Math.sin(t * PI * .66));
      };
      f.put(grid(15, 25, openFlare, (s, t) => [s * .84, t * .86], true), lining[i], 0, 0, 0, { cast: true });
      seam(f, t => openFlare(0, t), .0037, p.raw, 30);
      seam(f, s => openFlare(s, 1), .0037, p.raw, 21);
      stitches(f, t => openFlare(.09, t), 16, p.stitch, .0017);
    } else {
      ornament(f, fn, [.50, .742], [.306, .150], p, i === 2);
      for (const k of [.175, .825]) {
        const [u, h, v] = fn(k, .878, .003);
        f.sphere(u, h, v, .0052, .0052, .0052, p.brightGold, {}, 8);
      }
    }
  }

  const belt = (s, t) => torso(lerp(.31, TAU - .104, s), lerp(1.362, 1.429, t), .034);
  f.put(grid(48, 7, belt, (s, t) => [s * 3.5, t * .4]), p.cloth('navy', 'brocade'));
  for (const t of [.12, .86]) seam(f, s => belt(s, t), .0028, p.brass, 49);
  const u = -.076, h = 1.399, v = .180;
  f.torus(u, h, v, .030, .004, p.gold, { rz: PI / 4 }, TAU, 26);
  f.shape([[0, .033], [-.009, .009], [-.030, 0], [-.009, -.009], [0, -.033],
    [.008, -.009], [.030, 0], [.008, .009]], u, h, v, .006, p.brass);
  f.sphere(u, h, v + .009, .011, .012, .009, p.moonGlass, {}, 12);
}

function sleeves(f, p) {
  const left = (s, t, off = 0) => {
    const a = s * TAU;
    const arm = Math.sin(t * PI * .94);
    const radius = lerp(.107, .066, t) + .014 * Math.sin(t * PI) +
      (.003 + .005 * t) * Math.sin(a * 3.5 - t * 5) * Math.sin(t * PI);
    return [lerp(-.257, -.468, t) + .110 * t ** 5 + Math.sin(a) * (radius + off),
      1.933 - .756 * t + (Math.sin(a) * .06 * (1 - t) + .021 * Math.cos(a) * t),
      lerp(-.024, .232, t) - .034 * arm + Math.cos(a) * (radius + off)];
  };
  f.put(grid(32, 32, left, (s, t) => [s * 1.55, t * 1.25], true), p.cloth('ink', 'velvet'),
    0, 0, 0, { cast: true });
  f.put(grid(29, 10, (s, t) => left(s, lerp(.853, 1.017, t), .0055),
    (s, t) => [s * 1.35, t * .44], true), p.cloth('peacock', 'brocade'), 0, 0, 0, { cast: true });
  f.put(grid(29, 6, (s, t) => left(s, lerp(.916, 1.016, t), -.0055),
    (s, t) => [s * 1.35, t * .33]), p.cloth('salmon', 'silk'));
  for (const t of [.08, .85, .963, 1.01]) seam(f, s => left(s, t, .006), .0039, p.gold, 35);
  for (const s of [.43, .51]) seam(f, t => left(s, t, .0016), .0022, p.brassDark, 33);
  for (let i = 0; i < 4; i++) {
    const [u, h, v] = left(.236 + i * .134, .918, .008);
    f.sphere(u, h, v, .008, .0074, .0074, p.gold, {}, 10);
  }
  f.sphere(-.357, 1.177, .234, .052, .024, .056, p.cloth('flax', 'linen'), { cast: true });

  const right = (s, t, off = 0) => {
    const a = lerp(-.27, TAU - .28, s);
    const y = lerp(1.931 + .065 * Math.sin(a), 1.68 + .054 * Math.sin(a + .67), t);
    const r = lerp(.114, .107 + .014 * Math.cos(a * 2.5), t);
    return [lerp(.266, .375, t) + Math.sin(a) * (r + off), y + off * .15,
      lerp(-.014, .075, t) + Math.cos(a) * (r + off)];
  };
  f.put(grid(29, 20, right, (s, t) => [s * 1.24, t * .66], true), p.cloth('lapis', 'brocade'),
    0, 0, 0, { cast: true });
  f.put(grid(28, 8, (s, t) => right(s, lerp(.87, 1.112, t), -.006),
    (s, t) => [s * 1.04, t * .56]), p.cloth('salmon', 'silk'));
  seam(f, s => right(s, 1.101, -.002), .0035, p.raw, 36);
  stitches(f, s => right(s, .959, .003), 29, p.stitch, .0017, .54);
  for (let i = 0; i < 6; i++) {
    const a = right(.045 + i * .158, .988, .005);
    const b = shifted(a, (i % 3 - 1) * .014, -.023, .015);
    f.link(a, b, .00145, p.steel);
    f.sphere(...b, .0050, .0050, .0050, p.pinHead, {}, 8);
  }
}

function mantle(f, p) {
  const base = (s, t, off = 0) => {
    const a = lerp(.94, 5.24, s) + .078 * Math.sin(t * PI) * Math.sin(s * TAU);
    const width = lerp(.113, .506 + .052 * Math.sin(s * PI), Math.sin(t * PI * .63)) + off;
    const depth = lerp(.109, .371, t ** .69) + off;
    const pleat = Math.sin(s * TAU * 3 + t * 1.44) * .028 * t * Math.sin(s * PI) ** .32;
    const drop = .341 + .632 * Math.sin(s * PI) ** .70 + .032 * Math.sin(s * PI * 2.41);
    const y = 2.075 - drop * t ** 1.33 + .027 * t ** 4 * Math.sin(s * TAU * 4.5);
    return [Math.sin(a) * (width + pleat) - .047 * t ** 1.9, y,
      -.036 + Math.cos(a) * (depth + pleat) - .070 * t ** 1.3];
  };
  const shell = p.cloth('lapis', 'brocade'), lining = p.cloth('paprika', 'silk');
  f.put(grid(46, 29, base, (s, t) => [s * 3.1, t * 1.55], true), shell, 0, 0, 0, { cast: true });
  f.put(grid(44, 28, (s, t) => base(s, t, -.008), (s, t) => [s * 2.35, t * 1.15]), lining);
  for (const t of [.926, .973, .993]) {
    seam(f, s => base(s, t, .003), t === .973 ? .0040 : .00235, t === .973 ? p.gold : p.brass, 60);
  }
  for (const s of [.003, .997]) seam(f, t => base(s, t, .003), .0040, s > .5 ? p.gold : p.raw, 29);
  stitches(f, t => base(.027, t, .004), 23, p.stitch, .00175, .48);

  for (const s of [.207, .498, .788]) {
    ornament(f, base, [s, s < .3 ? .74 : .714], [s === .498 ? .125 : .077, .174], p, s === .498);
  }
  for (let i = 0; i < 8; i++) {
    const s = lerp(.072, .935, i / 7);
    const rod = (q, off = .0048) => base(s + .018 * Math.sin(q * PI), lerp(.10, .51, q), off);
    seam(f, q => rod(q), .0022, p.gold, 21);
    f.sphere(...rod(1, .009), .0076, .0076, .0076, p.gold, {}, 9);
  }
  const shoulder = base(.934, .386, .019);
  f.sphere(...shoulder, .055, .054, .025, p.brassDark, { ry: -.36, cast: true }, 18);
  f.torus(...shifted(shoulder, -.007, 0, .020), .043, .0063, p.gold, { ry: -.31 }, TAU, 29);
  f.sphere(...shifted(shoulder, -.008, 0, .029), .025, .027, .014, p.moonGlass, {}, 15);
}

function collar(f, p) {
  const depth = material('#254151', .68, { metalness: .015, side: THREE.DoubleSide });
  const fan = (s, t, off = 0) => {
    const a = lerp(.68, TAU - .68, s);
    const wave = .014 * Math.cos(s * TAU * 7) * t ** 4;
    const reach = .084 + .147 * t ** 1.34 + .024 * t * Math.sin(s * PI) + off;
    return [Math.sin(a) * reach, 2.058 + t * (.141 + .199 * Math.sin(s * PI) ** .84) + wave,
      -.019 + Math.cos(a) * (reach * .91 + off) - .013 * t];
  };
  const red = p.cloth('paprika', 'moire');
  f.put(grid(43, 16, fan, (s, t) => [s * 1.75, t * .72]), p.cloth('navy', 'brocade'), 0, 0, 0, { cast: true });
  f.put(grid(43, 16, (s, t) => fan(s, t, -.0078), (s, t) => [s * 1.7, t * .61], true), red);
  for (const t of [.076, .91, .998]) seam(f, s => fan(s, t, .0017), t === .998 ? .0042 : .0024, p.gold, 53);
  for (const s of [0, 1]) seam(f, t => fan(s, t), .004, p.gold, 15);
  for (let i = 0; i < 10; i++) {
    const s = (i + .22) / 9.52, end = (i % 2 ? .93 : 1.01);
    seam(f, t => fan(s + .014 * Math.sin(t * PI), t * end, .003), .0027, p.gold, 19);
    f.sphere(...fan(s, end, .003), .0073, .0082, .0073, p.gold, {}, 10);
  }

  const orbit = (a, radius, tilt, shift = 0) => {
    const px = radius * Math.cos(a), py = radius * Math.sin(a) * .66;
    return [px * Math.cos(tilt) - py * Math.sin(tilt),
      2.261 + px * Math.sin(tilt) + py * Math.cos(tilt),
      -.195 - .045 * Math.cos(a) + .043 * Math.sin(a) * Math.sign(tilt) + shift];
  };
  for (const [radius, tilt, wire] of [[.315, -.32, .0068], [.279, .38, .0043], [.233, -.34, .0029]]) {
    seam(f, s => orbit(lerp(-2.77, 2.87, s), radius, tilt), wire,
      wire > .005 ? p.brass : p.gold, 48);
  }
  for (const [i, a, r] of [[0, 1.03, .315], [1, 1.71, .315], [2, 2.24, .315], [3, .42, .279], [4, 2.81, .279]]) {
    const pt = orbit(a, r, i < 3 ? -.32 : .38);
    const size = i === 1 ? .029 : .017;
    f.sphere(...pt, size, size, size * .83, p.brass, {}, 13);
    f.sphere(...shifted(pt, 0, .002, .007), size * .77, size * .76, size * .78,
      i % 2 ? p.sunGlass : p.moonGlass, {}, 13);
  }
  for (const side of [-1, 1]) {
    f.tube([[side * .080, 2.067, -.083], [side * .213, 2.075, -.207], [side * .283, 2.173, -.214]],
      .007, p.brassDark, false, 16);
    f.shape([[0, .055], [-.014, 0], [0, -.012], [.014, 0]], side * .278, 2.263, -.202,
      .009, p.gold, { rz: side * -.58 });
  }
  f.cylinder(0, 2.073, -.017, .084, .090, .049, depth, {}, 25);
}

function plinth(world, f, p) {
  f.cylinder(0, .034, 0, .804, .846, .063, p.darkOak, { sx: 1.11, sz: .89, cast: true }, 56);
  f.cylinder(0, .099, 0, .791, .813, .081, p.panelInset, { sx: 1.11, sz: .89, cast: true }, 56);
  f.cylinder(0, .157, 0, .798, .800, .049, p.walnut, { sx: 1.11, sz: .89, cast: true }, 56);
  f.cylinder(0, .187, 0, .780, .787, .021, p.oak, { sx: 1.11, sz: .89, cast: true }, 56);
  const ellipse = (s, y, widen = 0) => {
    const a = s * TAU;
    return [Math.sin(a) * (.851 + widen), y, Math.cos(a) * (.678 + widen)];
  };
  f.tube(sampleLine(s => ellipse(s, .198), 64, 0, .985), .006, p.brass, true, 84);
  f.tube(sampleLine(s => ellipse(s, .126, .025), 62, 0, .984), .004, p.brassDark, true, 80);
  for (let i = 0; i < 22; i++) f.sphere(...ellipse(i / 22, .097, .047), .016, .012, .015, p.brassDark, {}, 8);
  f.box(0, .112, .731, .566, .140, .029, p.brassDark, { rx: -.12 });
  f.plane(0, .114, .751, .542, .124,
    placard(p.renderer, 'The Winter Meridian', 'STATE COAT   /   SECOND FITTING', 'tan'), { rx: -.12 });
  world.blockCircle(FORM.x, FORM.z, .84);
}

export function buildCommission(world, p) {
  world.zone = 'commission-base';
  const f = frame(world, FORM.x, 0, FORM.z, FORM.yaw);
  plinth(world, f, p);
  world.zone = 'commission-garment';
  dressForm(f, p);
  tailPanels(f, p);
  jacket(f, p);
  sleeves(f, p);
  mantle(f, p);
  collar(f, p);
}


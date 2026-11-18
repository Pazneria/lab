import { grid, lerp, PI, rng, sampleLine, TAU } from './geometry.js';
import { book, foldedCloth, frame, pendant } from './furnishings.js';
import { carpet, placard, print } from './materials.js';

const collections = [
  [
    { name: 'Indigos', sub: 'WOOL  /  DUSK', colors: ['navy', 'indigo', 'slate'], pattern: 'check' },
    { name: 'Verdigris', sub: 'CUT VELVET', colors: ['peacock', 'ink', 'turquoise'], pattern: 'brocade' },
    { name: 'Pearl', sub: 'LINEN  /  SILK', colors: ['fog', 'cream', 'flax'], pattern: 'stripe' },
    { name: 'Lake dyes', sub: 'DYED  /  WATERED', colors: ['lapis', 'ink', 'slate'], pattern: 'moire' },
  ],
  [
    { name: 'Madder', sub: 'WOOL  /  TWILL', colors: ['garnet', 'wine', 'paprika'], pattern: 'check' },
    { name: 'Marigold', sub: 'BROCADE  /  SILK', colors: ['ochre', 'lichen', 'flax'], pattern: 'brocade' },
    { name: 'Rosewood', sub: 'FAILLE  /  SATIN', colors: ['salmon', 'paprika', 'wine'], pattern: 'moire' },
    { name: 'Nut dyes', sub: 'LINEN  /  STRIPE', colors: ['brown', 'flax', 'cream'], pattern: 'stripe' },
  ],
];

function bolt(f, p, x, y, z, rad, length, name, style, seed, peel = false) {
  const position = (u, t) => {
    const a = TAU * u;
    const softness = rad * (1 + .028 * Math.sin(a * 3 + seed) + .014 * Math.cos(a * 6 + t * 3));
    return [x + Math.cos(a) * softness, y + Math.sin(a) * softness, z + (t - .5) * length +
      .009 * Math.sin(a * 2 + seed) * (t * 2 - 1) ** 2];
  };
  const end = z + length / 2;
  const cloth = p.cloth(name, style);
  f.put(grid(24, 6, position, (u, t) => [t * .94, u * 1.26]), cloth, 0, 0, 0, { cast: true });
  f.cylinder(x, y, z, rad * .971, rad * .965, length - .014, cloth, { rx: PI / 2 }, 26);
  f.cylinder(x, y, end - .001, rad * .225, rad * .226, .021, p.kraft, { rx: PI / 2 }, 15);
  f.cylinder(x, y, end + .010, rad * .139, rad * .139, .004, p.dark, { rx: PI / 2 }, 15);
  f.tube(sampleLine(t => {
    const a = TAU * 2.65 * t + seed;
    const r = rad * lerp(.24, .985, t) * (1 + .017 * Math.sin(a * 2 + seed));
    return [x + Math.cos(a) * r, y + Math.sin(a) * r, end + .002 + .0065 * Math.sin(a * 2 + seed)];
  }, 34), .0022, p.cloth(name, 'silk'), false, 36);
  if (peel) {
    f.put(grid(11, 12, (u, t) => {
      const px = x + (.19 - t * .51) * rad - t ** 2 * .046;
      return [px + Math.sin(u * TAU * 1.4) * .006 * t,
        y - rad * .96 + .012 * Math.sin(t * PI) + .009 * t * Math.cos(u * TAU * 3 + seed),
        z + length * lerp(-.41, .48, u) + .042 * t * Math.sin(u * PI * 1.45)];
    }, (u, t) => [u, t * .66]), cloth);
  }
}

function carton(f, p, x, y, z, width, depth, height, natural = false) {
  const primary = natural ? p.kraft : p.darkOak;
  f.box(x, y + height * .48, z, width, height * .96, depth, primary, { cast: true });
  f.box(x, y + height - .025, z, width + .028, .056, depth + .025, natural ? p.paper : p.walnut);
  f.box(x, y + height * .57, z + depth / 2 + .006, width * .40, .080, .011, p.brassDark);
  f.box(x, y + height * .57, z + depth / 2 + .0125, width * .33, .060, .006, p.paper);
  f.box(x, y + height * .57, z + depth / 2 + .0165, width * .18, .004, .002, p.ink);
  if (natural) {
    for (const d of [-1, 1]) {
      f.box(x + d * width * .33, y + height - .013, z, .017, .004, depth + .026, p.kraft);
      f.box(x + d * width * .33, y + height * .52, z + depth / 2 + .008, .017, height * .97, .009, p.kraft);
    }
  }
}

function collectionBank(world, p, sign, shelves) {
  const x = sign * 4.77, z = -1.69;
  const f = frame(world, x, 0, z, -sign * PI / 2);
  const top = 2.60, width = 5.16, depth = .85, bayW = width / 4;
  const heights = [.237, .79, 1.325, 1.91, 2.54];
  f.box(0, 1.36, -.368, width, 2.53, .088, p.darkOak);
  f.box(0, .112, .01, width + .105, .215, depth + .07, p.rail, { cast: true });
  for (const y of heights) {
    f.box(0, y, .015, width, .067, depth, p.walnut, { cast: true });
    f.box(0, y + .008, .447, width + .025, .049, .04, p.waxedOak);
  }
  for (let i = 0; i < 5; i++) {
    const u = (i - 2) * bayW;
    f.box(u, 1.392, .002, .095, 2.49, depth + .044, p.darkOak, { cast: true });
    f.box(u, 1.453, .46, .108, 2.18, .054, p.oak);
    for (const y of [.28, .76, 1.31, 1.88, 2.56]) {
      f.sphere(u, y, .492, .013, .016, .011, p.brass);
    }
  }
  f.box(0, top + .035, 0, width + .14, .109, depth + .113, p.darkOak, { cast: true });
  f.box(0, top + .103, 0, width + .20, .046, depth + .18, p.rail, { cast: true });
  for (let i = 0; i < shelves.length; i++) {
    const group = shelves[i], center = (i - 1.5) * bayW;
    const random = rng(9101 + i * 21 + sign * 14);
    f.box(center, 1.932, .476, .38, .127, .027, p.brassDark);
    f.plane(center, 1.932, .492, .367, .114, placard(p.renderer, group.name, group.sub, 'tan'));

    for (let column = 0; column < 3; column++) {
      const name = group.colors[column];
      const rad = .111 + random() * .037, offset = (column - 1) * .332;
      bolt(f, p, center + offset, heights[1] + .038 + rad, -.026 + (random() - .5) * .09,
        rad, .58 + random() * .16, name, column ? group.pattern : 'linen', 5 * random(), column === 2);
      if (column === 1 && i % 2 === 0) {
        bolt(f, p, center + offset + .151, heights[1] + .045 + rad * 2.08, -.071,
          .093, .540, group.colors[0], 'silk', 3 * i, false);
      }
    }

    for (const [row, side, count] of [[2, -.283, 3 + (i % 2)], [2, .281, 2 + ((i + 1) % 2)],
      [3, -.282, 2 + (i % 2)]]) {
      let base = heights[row] + .037;
      for (let layer = 0; layer < count; layer++) {
        const name = group.colors[(layer + Number(side > 0)) % group.colors.length];
        const isLight = (layer + i + row) % 3 === 0;
        const thickness = isLight ? .020 + random() * .017 : .056 + random() * .047;
        foldedCloth(f, p, center + side + (random() - .5) * .054, base, -.003 + (random() - .5) * .056,
          .455 + random() * .06, .54 + random() * .15, thickness, name,
          isLight ? 'silk' : layer % 2 ? group.pattern : 'linen', layer * 2 + i);
        base += thickness;
      }
    }

    if ((i + sign) % 2) {
      carton(f, p, center + .282, heights[3] + .035, -.079, .426, .531, .258, i % 2 === 0);
      carton(f, p, center - .284, heights[0] + .036, .020, .48, .644, .320, i % 2 === 1);
      carton(f, p, center + .275, heights[0] + .036, -.004, .49, .614, .277, false);
    } else {
      for (let k = 0; k < 2; k++) {
        const rad = .151 - k * .018;
        bolt(f, p, center + .07 + k * .394 - .41, heights[0] + .034 + rad, -.032, rad,
          .70 - k * .05, group.colors[k], group.pattern, k * 4 + i, true);
      }
      carton(f, p, center + .36, heights[0] + .035, -.052, .38, .546, .225, true);
      const u = center + .344;
      f.box(u, heights[3] + .039, .02, .391, .008, .47, p.paper);
      book(f, p, u, heights[3] + .042, .017, .32, .041, .41, p.cloth(group.colors[1], 'linen'), .24);
      book(f, p, u - .03, heights[3] + .083, -.008, .29, .054, .36, p.cloth(group.colors[2], 'linen'), -.10);
    }

    if (i === 0 || i === 3) {
      carton(f, p, center, 2.73, -.084, .57, .44, .162, true);
    }
  }
  world.block(x, z, .99, 5.30);
}

function sample(f, p, x, y, z, w, d, droop, amplitude, color, pattern, angle = 0) {
  const c = Math.cos(angle), s = Math.sin(angle);
  const fn = (u, t) => {
    const across = lerp(-w / 2, w / 2, u);
    const length = t * d;
    const hang = Math.max(0, (t - .61) / .39);
    const wiggle = Math.cos(u * TAU * 2.1 + t * 1.8) * amplitude * (.22 + .78 * hang);
    return [
      x + across * c + length * s + .021 * Math.sin(t * PI) * Math.cos(u * PI),
      y + amplitude * .45 * Math.sin(t * PI) + wiggle * (hang + .14) - droop * hang ** 1.68,
      z - across * s + length * c - droop * .36 * hang ** 2,
    ];
  };
  f.put(grid(20, 24, fn, (u, t) => [u * .65, t * 1.02], true), p.cloth(color, pattern), 0, 0, 0, { cast: true });
  f.tube(sampleLine(u => fn(u, 1), 17), pattern === 'silk' ? .0024 : .0049, p.cloth(color, 'silk'), false, 23);
  for (let i = 0; i < 21; i++) {
    const [u, h, v] = fn((i + .5) / 21, 1);
    f.link([u, h, v], [u + (i % 3 - 1) * .005, h - .011 - (i % 4) * .002, v + .003],
      .0009, p.cloth(color, 'silk'), 4);
  }
}

function sampleTable(world, p) {
  const x = -2.0, z = -1.00;
  const f = frame(world, x, 0, z);
  for (const u of [-.79, .79]) {
    for (const v of [-.36, .36]) {
      f.box(u, .456, v, .091, .889, .096, p.darkOak, { cast: true });
      f.box(u, .071, v, .101, .09, .103, p.brassDark);
    }
  }
  f.box(0, .777, 0, 1.69, .22, .794, p.rail, { cast: true });
  f.box(0, .898, 0, 1.89, .065, .96, p.waxedOak, { cast: true });
  f.box(0, .938, 0, 1.831, .022, .902, p.oak, { cast: true });
  f.box(0, .208, 0, 1.682, .05, .76, p.darkOak, { cast: true });
  f.box(.00, .738, .409, .457, .113, .039, p.brassDark);
  f.plane(0, .74, .430, .434, .107, placard(p.renderer, 'The dye table', 'HAND SAMPLES', 'tan'));
  for (const [u, w, z, droop, amp, name, type, label] of [
    [-.614, .422, -.327, .183, .020, 'ink', 'brocade', 'CUT BROCADE'],
    [-.110, .475, -.345, .288, .041, 'salmon', 'silk', 'SHOT SILK'],
    [.452, .446, -.300, .118, .016, 'cream', 'stripe', 'CURED LINEN'],
  ]) {
    sample(f, p, u, .954, z, w, 1.15, droop, amp, name, type, .021);
    f.box(u, .977, z + .057, w + .016, .033, .048, p.brassDark, { rz: .002 });
    const tag = print(p.renderer, '#524033', 224, 96, (ctx, width) => {
      ctx.font = '700 18px Georgia';
      ctx.fillText(label, 14, 36, width - 28);
      ctx.font = '14px Georgia';
      ctx.fillText('Meridian stock  •  Wardrobe', 14, 63, width - 28);
      ctx.strokeRect(6, 6, width - 12, 84);
    }, '#d5b68d');
    f.plane(u + .008, .980, z + .236, .23, .103, tag, { rx: -PI / 2, rz: -.08 });
    f.sphere(u - .086, .985, z + .199, .010, .007, .010, p.brass);
  }
  carton(f, p, -.518, .235, -.006, .47, .592, .285, false);
  book(f, p, .462, .234, .003, .52, .061, .49, p.cloth('lichen', 'linen'), .13);
  book(f, p, .422, .296, -.021, .43, .064, .41, p.cloth('wine', 'linen'), -.04);
  world.block(x, z, 1.90, 1.08);
}

export function buildArchive(world, p) {
  world.zone = 'archive-ink';
  collectionBank(world, p, -1, collections[0]);
  world.zone = 'archive-madder';
  collectionBank(world, p, 1, collections[1]);
  world.zone = 'archive-samples';
  sampleTable(world, p);
  world.plane(.55, .015, -1.64, 1.73, 4.88, carpet(p.renderer, true), { rx: -PI / 2 });
  pendant(world, p, 1.00, -1.60, 3.31, .9, 4);
}


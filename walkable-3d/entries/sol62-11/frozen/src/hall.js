import { canvasMap, frame, seeded, standard } from './build.js';
import { directory, fascia, floorSign, hallMural, littlePlaque } from './graphics.js';

const F = frame();
const FLOOR = [-Math.PI / 2, 0, 0];
const TURN = [0, Math.PI, 0];
const BOLT_FACE = [Math.PI / 2, 0, 0];

function slabs(b, m, x1, x2, z1, z2, nx, nz, alt) {
  const dx = (x2 - x1) / nx;
  const dz = (z2 - z1) / nz;
  b.box(F, x2 - x1, .15, z2 - z1, (x1 + x2) / 2, -.078, (z1 + z2) / 2, m.joint);
  for (let j = 0; j < nz; ++j) {
    for (let i = 0; i < nx; ++i) {
      b.plane(F, dx - .012, dz - .012, x1 + dx * (i + .5), .003, z1 + dz * (j + .5), (i + 2 * j) % 7 === 3 || alt ? m.slabWing : m.slab, FLOOR);
    }
  }
}

function wall(b, m, f, width, color = m.wall, divisions = 4) {
  b.box(f, width, 4.22, .18, 0, 2.10, -.09, color);
  b.box(f, width, .12, .055, 0, .06, .022, m.sageDark);
  b.plane(f, width - .017, .59, 0, .0055, .296, m.edgeShadow, FLOOR);
  b.box(f, width, .075, .045, 0, 1.08, .04, m.sage);
  b.box(f, width, .10, .055, 0, 3.96, .029, m.darkBeam);
  const step = width / divisions;
  for (let i = 0; i < divisions; ++i) {
    const x = step * (i + .5) - width / 2;
    b.box(f, step - .010, .94, .020, x, .58, .019, i % 3 === 1 ? m.sage : m.wallPanel);
    b.box(f, step - .013, .036, .013, x, 2.83, .012, m.wallPanel);
  }
  for (let i = 1; i < divisions; ++i) {
    b.box(f, .014, 1.72, .012, step * i - width / 2, 1.97, .005, m.wallPanel);
  }
}

function softFrost() {
  return canvasMap(350, 510, (ctx, w, h) => {
    const shade = ctx.createLinearGradient(0, 0, w * .3, h);
    shade.addColorStop(0, '#c7d4cb');
    shade.addColorStop(.52, '#90a7a0');
    shade.addColorStop(.56, '#acbdb0');
    shade.addColorStop(1, '#65776e');
    ctx.fillStyle = shade;
    ctx.fillRect(0, 0, w, h);
    const random = seeded(320);
    for (let i = 0; i < 1480; ++i) {
      ctx.fillStyle = i % 2 ? '#f4f7da29' : '#283b4229';
      ctx.fillRect(random() * w, random() * h, 1, random() * 2 + 1);
    }
    ctx.fillStyle = '#e0e7d59c';
    ctx.fillRect(0, 219, w, 38);
    ctx.fillStyle = '#e0e7d549';
    ctx.fillRect(0, 268, w, 8);
  });
}

function observationWindow(b, m, f) {
  const z = .035;
  b.rounded(f, 3.48, 1.36, .128, .046, .050, 2.19, z, m.sageDark);
  b.box(f, 3.36, 1.23, .073, .050, 2.19, z + .067, m.graphite);
  const pane = standard(0xb2c2b6, .32, .20, { map: softFrost(), envMapIntensity: 1.2 });
  for (const [i, x] of [-1.039, .050, 1.139].entries()) {
    b.plane(f, 1.036, 1.139, x, 2.19, z + .111, pane);
    b.box(f, .029, 1.15, .029, x - .522, 2.19, z + .110, m.dullSteel);
    if (i === 2) b.box(f, .029, 1.15, .029, x + .522, 2.19, z + .110, m.dullSteel);
  }
  b.box(f, 3.39, .060, .207, .050, 1.555, z + .089, m.dullSteel);
  b.box(f, 3.31, .021, .155, .050, 1.587, z + .079, m.steel);
  b.box(f, 3.43, .055, .101, .050, 2.838, z + .082, m.grey);
  b.decal(f, .661, .084, -1.204, 2.984, z + .012,
    littlePlaque('OBSERVATION WINDOW', null, { ratio: 7.87, size: 53, dark: false }));
  b.box(f, .215, .106, .046, 1.35, 1.713, z + .124, m.graphite);
  for (let i = 0; i < 6; ++i) b.box(f, .125, .0048, .006, 1.316, 1.687 + i * .009, z + .150, m.grey);
  b.cylinder(f, .008, .008, .013, 1.427, 1.718, z + .148, m.lightGreen, BOLT_FACE, 12);
}

function servicePanel(b, m, f) {
  const x = .43;
  b.rounded(f, 1.468, 1.003, .068, .034, x, 1.95, .043, m.sage);
  b.rounded(f, 1.377, .911, .031, .024, x, 1.950, .086, m.wallPanel);
  b.box(f, .041, .815, .034, x + .650, 1.950, .110, m.dullSteel);
  for (const y of [1.585, 2.313]) b.box(f, .076, .050, .033, x + .66, y, .125, m.sageDark);
  b.decal(f, .90, .162, x, 2.198, .109,
    littlePlaque('Gallery services', 'PF–G1   /   UTILITY PANEL', { ratio: 5.55, size: 50, small: 25 }));
  b.box(f, .88, .378, .026, x, 1.825, .112, m.sageDark);
  for (const offset of [-.267, 0, .267]) {
    const bx = x + offset;
    b.rounded(f, .204, .246, .029, .017, bx, 1.825, .135, m.graphite);
    b.box(f, .135, .036, .026, bx, 1.879, .163, offset === 0 ? m.orange : m.cream);
    for (let i = 0; i < 4; ++i) b.box(f, .087, .004, .004, bx, 1.770 + i * .011, .155, m.grey);
  }
  for (const xOffset of [.27, .38]) {
    const conduit = x + xOffset;
    b.rod(f, [conduit, 2.452, .051], [conduit, 3.915, .051], .021, m.dullSteel);
    for (const y of [2.478, 2.995, 3.629]) b.box(f, .066, .048, .053, conduit, y, .044, m.sageDark);
  }
}

function fixture(b, m, x, z, width, depth, rotation = 0) {
  const f = frame(x, 0, z, [0, rotation, 0]);
  for (const side of [-1, 1]) {
    for (const zz of [-.32, .32]) {
      b.rod(f, [side * (width / 2 - .28), 3.87, zz * depth], [side * (width / 2 - .28), 4.18, zz * depth], .012, m.dullSteel, 8);
    }
  }
  b.rounded(f, width + .07, .095, depth + .08, .035, 0, 3.866, 0, m.lightHousing);
  b.box(f, width - .075, .029, depth - .07, 0, 3.803, 0, m.ink);
  for (const t of [-1, 0, 1]) {
    b.box(f, width - .12, .021, (depth - .15) / 3, 0, 3.78, t * depth / 3, m.lamp);
  }
  b.cable(f, [[width / 2 - .2, 3.9, .17], [width / 2 - .2, 3.99, .23], [width / 2 - .17, 4.09, .26], [width / 2 - .11, 4.18, .28]], .011, m.rubber, 8);
}

function hatch(b, m, f, width, height, x, y, z, style = m.sageDark) {
  b.rounded(f, width, height, .058, .022, x, y, z, style);
  b.box(f, width - .040, height - .04, .010, x, y, z + .034, m.ink);
  b.box(f, width - .058, height - .058, .016, x, y, z + .040, style);
  for (const dx of [-1, 1]) {
    for (const dy of [-1, 1]) {
      b.cylinder(f, .009, .009, .005, x + dx * (width / 2 - .039), y + dy * (height / 2 - .04), z + .05, m.bolt, BOLT_FACE, 8);
    }
  }
}

function utilityCabinet(b, m, f, width, height) {
  b.plane(f, width + 1.0, 1.54, 0, .009, .08, m.contactShadow, FLOOR);
  b.box(f, width - .10, .07, .52, 0, .05, 0, m.rubber);
  b.rounded(f, width, height, .58, .05, 0, height / 2 + .071, 0, m.sageDark);
  b.box(f, width + .036, .055, .62, 0, height + .093, 0, m.cream);
  for (const x of [-width / 4, width / 4]) {
    b.rounded(f, width / 2 - .025, height - .048, .035, .02, x, height / 2 + .07, .30, m.sage);
    b.rod(f, [x + .16, height - .145, .357], [x + .16, height - .302, .357], .013, m.steel);
    for (const y of [height - .149, height - .298]) b.box(f, .029, .037, .038, x + .16, y, .343, m.dullSteel);
  }
  b.decal(f, .30, .065, -.34 * width, height - .075, .322, littlePlaque('LAB STORES', null, { size: 50 }));
}

function entrance(b, m) {
  const f = frame(0, 0, 6.20, TURN);
  b.zone('Entrance');
  wall(b, m, f, 9.2, m.wallCream, 5);
  b.box(f, 2.60, 2.62, .115, 0, 1.30, .073, m.sageDark);
  b.box(f, 2.39, 2.44, .125, 0, 1.24, .101, m.ink);
  const window = standard(0xaeb9a9, .34, .22, { map: softFrost(), envMapIntensity: 1.2 });
  for (const x of [-.59, .59]) {
    b.rounded(f, 1.15, 2.38, .087, .025, x, 1.22, .180, m.dullSteel);
    b.box(f, .99, 2.18, .044, x, 1.24, .230, m.sageDark);
    b.plane(f, .94, 2.10, x, 1.25, .257, window);
    b.box(f, 1.08, .068, .032, x, .093, .253, m.steel);
    b.box(f, 1.08, .044, .028, x, 1.18, .252, m.dullSteel);
    const grip = x - Math.sign(x) * .29;
    b.rod(f, [grip, .91, .323], [grip, 1.22, .323], .022, m.steel, 16);
    b.rod(f, [grip, .92, .249], [grip, .92, .323], .019, m.steel);
    b.rod(f, [grip, 1.21, .249], [grip, 1.21, .323], .019, m.steel);
  }
  b.rounded(f, 1.34, .20, .09, .028, 0, 2.79, .116, m.ink);
  b.decal(f, 1.25, .15, 0, 2.79, .165, fascia('00', 'Entrance', '#cbd8ac'));
  b.box(f, 1.85, 1.13, .033, -2.70, 1.72, .034, m.ink);
  b.decal(f, 1.80, 1.08, -2.70, 1.72, .054, directory());

  const bench = frame(2.56, 0, .37, [0, 0, 0], f);
  b.plane(bench, 2.25, .92, 0, .008, .045, m.smallShadow, FLOOR);
  for (const x of [-.66, .66]) {
    for (const z of [-.17, .17]) b.box(bench, .05, .43, .056, x, .23, z, m.sageDark);
    b.box(bench, .06, .049, .51, x, .42, 0, m.sageDark);
  }
  for (const z of [-.17, -.057, .057, .17]) b.rounded(bench, 1.75, .044, .104, .014, 0, .47, z, m.bench);
  b.rod(bench, [-.62, .21, -.07], [.62, .21, -.07], .016, m.sageDark);

  for (const x of [-4.11, 4.11]) {
    b.box(f, .39, 1.04, .065, x, 1.64, .068, m.sageDark);
    b.box(f, .27, .81, .021, x, 1.65, .108, m.wallPanel);
    for (let i = 0; i < 17; ++i) b.box(f, .25, .011, .015, x, 1.27 + i * .046, .122, m.dullSteel);
  }
}

function backWall(b, m) {
  b.zone('Rear wall');
  const f = frame(0, 0, -7.1);
  wall(b, m, f, 9.2, m.wall, 6);
  b.box(f, 6.36, 2.34, .055, 0, 2.40, .039, m.ink);
  b.decal(f, 6.24, 2.243, 0, 2.41, .070, hallMural());
  b.box(f, 6.4, .051, .16, 0, 1.20, .081, m.sageDark);
  b.box(f, 6.4, .046, .12, 0, 3.60, .068, m.dullSteel);
  for (const x of [-3.96, 3.96]) {
    b.box(f, .52, 2.63, .052, x, 2.08, .040, m.wallPanel);
    for (let i = 0; i < 7; ++i) {
      b.rounded(f, .036, 2.53, .035, .012, x - .194 + i * .064, 2.08, .074, i % 3 === 0 ? m.plywood : m.bench);
    }
  }
  utilityCabinet(b, m, frame(-2.64, 0, -6.74), 1.50, .69);
  utilityCabinet(b, m, frame(2.64, 0, -6.74), 1.50, .69);
  b.box(f, 1.17, .090, .080, 0, .563, .064, m.sageDark);
  b.decal(f, 1.12, .133, 0, .72, .026, littlePlaque('← PERCEPTION        MOTION →', null, { ratio: 8.4, size: 60, dark: false }));
}

function workshopShell(b, m, side) {
  const west = side < 0;
  b.zone(west ? 'West alcove architecture' : 'East alcove architecture');
  const stripe = west ? m.perceptionStripe : m.motionStripe;
  slabs(b, m, west ? -8.82 : 4.60, west ? -4.60 : 8.82, -5.38, 1.38, 3, 5, true);
  b.box(F, 4.22, .18, 6.76, side * 6.71, 4.24, -2.00, m.ceiling);
  const long = frame(8.82 * side, 0, -2, [0, west ? Math.PI / 2 : -Math.PI / 2, 0]);
  wall(b, m, long, 6.76, m.wallCream, 5);
  b.box(long, 6.72, .12, .022, 0, 1.22, .031, stripe);
  b.box(long, 5.27, .79, .05, 0, 1.81, .049, m.wallPanel);
  for (let i = 0; i < 17; ++i) b.box(long, 5.22, .008, .005, 0, 1.45 + i * .045, .077, m.sage);
  for (const z of [-5.38, 1.38]) {
    const end = frame(6.71 * side, 0, z, z > 0 ? TURN : [0, 0, 0]);
    wall(b, m, end, 4.22, m.wall, 3);
    b.box(end, 4.19, .12, .022, 0, 1.22, .031, stripe);
    b.rod(end, [-1.89, 3.42, .105], [1.86, 3.42, .105], .018, m.dullSteel);
    for (const x of [-1.62, -.54, .54, 1.62]) b.box(end, .049, .078, .046, x, 3.42, .088, m.sageDark);
  }
  for (const z of [-4.7, -1.04, .67]) {
    b.box(F, 4.25, .14, .13, 6.71 * side, 4.093, z, m.darkBeam);
  }
  fixture(b, m, side * 6.58, -.64, 2.70, .64, Math.PI / 2);
  fixture(b, m, side * 6.58, -3.68, 2.54, .64, Math.PI / 2);

  const threshold = frame(4.57 * side, 0, -2.00);
  b.box(threshold, .26, .20, 6.83, 0, 4.0, 0, m.sageDark);
  b.box(threshold, .17, .034, 6.82, 0, 3.891, 0, stripe);
  for (const z of [-5.38, 1.38]) {
    b.box(threshold, .25, 4.05, .25, 0, 2.024, z, m.sageDark);
    b.box(threshold, .29, .16, .29, 0, .08, z, m.ink);
    b.box(threshold, .27, .075, .27, 0, 1.21, z, stripe);
  }
  const choice = west ? 'Perception' : 'Motion testing';
  const id = west ? '02' : '03';
  const color = west ? '#a8d2c8' : '#e5b188';
  const label = fascia(id, choice, color);
  const gate = frame(4.57 * side, 0, -2.10, [0, west ? Math.PI / 2 : -Math.PI / 2, 0]);
  b.rounded(gate, 1.73, .290, .078, .027, 0, 3.363, 0, m.ink);
  b.decal(gate, 1.61, .261, 0, 3.363, .042, label);
  b.decal(gate, 1.61, .261, 0, 3.363, -.042, fascia('01', 'Main gallery', '#c2d0ae'), TURN);
  for (const x of [-.67, .67]) b.rod(gate, [x, 3.499, 0], [x, 3.887, 0], .014, m.dullSteel, 8);

  const viewX = side * 5.48;
  b.rounded(F, 1.61, .277, .075, .027, viewX, 3.30, -4.78, m.ink);
  b.decal(F, 1.52, .246, viewX, 3.30, -4.740, label);
  for (const off of [-.63, .63]) b.rod(F, [viewX + off, 3.43, -4.78], [viewX + off, 4.17, -4.78], .014, m.dullSteel, 8);
  b.rod(long, [-3.19, 3.44, .11], [3.19, 3.44, .11], .020, m.dullSteel, 12);
  b.rod(long, [-3.19, 3.36, .112], [3.19, 3.36, .112], .015, m.cableBlue, 10);
  for (const x of [-2.64, -1.32, 0, 1.32, 2.64]) b.box(long, .058, .13, .041, x, 3.396, .091, m.sageDark);
  b.cable(long, [[2.4, 3.36, .10], [2.57, 3.35, .11], [2.69, 3.26, .11], [2.71, 3.11, .11], [2.71, .48, .11]], .016, m.cableBlue, 18);
  hatch(b, m, long, .22, .30, 2.71, .38, .051);
}

function floorInlays(b, m) {
  b.zone('Hall');
  const tickets = [
    [-3.62, -.39, 'PERCEPTION', '←', 'perception'],
    [3.62, -.39, 'MOTION CELL', '→', 'motion'],
    [0, 3.45, 'SPECTRAL ARRAY', '↑', 'neutral'],
    [0, 5.22, 'ENTRANCE', '↓', 'neutral']
  ];
  for (const [x, z, title, arrow, palette] of tickets) {
    b.decal(F, palette === 'neutral' ? 1.68 : 1.54, .36, x, .009, z, floorSign(title, arrow, palette), FLOOR);
  }

  for (const x of [-1.67, 1.67]) {
    b.box(F, .027, .002, 3.09, x, .005, -.56, m.maskCream);
    b.box(F, .018, .002, 2.94, x + Math.sign(x) * .058, .005, -.56, m.maskDark);
  }
  for (const z of [-2.105, .985]) {
    b.box(F, 3.34, .002, .027, 0, .005, z, m.maskCream);
    b.box(F, 3.17, .002, .018, 0, .005, z + Math.sign(z + .56) * .058, m.maskDark);
    for (const x of [-1.57, 1.57]) b.box(F, .16, .002, .05, x, .005, z - Math.sign(z + .56) * .094, m.maskCream);
  }
  for (const side of [-1, 1]) {
    const stripe = side < 0 ? m.perceptionStripe : m.motionStripe;
    for (const z of [-4.99, 1.01]) {
      b.box(F, 3.90, .002, .029, 6.57 * side, .005, z, stripe);
      b.box(F, .42, .002, .045, 4.76 * side, .005, z + .035, stripe);
    }
    for (const z of [-5.11, 1.11]) {
      for (let i = 0; i < 5; ++i) b.box(F, .035, .002, .12, side * (4.27 + i * .076), .005, z, m.maskCream, [0, .52, 0]);
    }
  }

  for (let i = 0; i < 34; ++i) {
    const random = seeded(i * 17 + 21);
    const x = -4.32 + random() * 8.64;
    const z = -6.38 + random() * 12.42;
    const w = .075 * random() + .015;
    const d = .016 * random() + .002;
    b.plane(F, w, d, x, .006, z, m.smallShadow, [-Math.PI / 2, 0, random() * Math.PI]);
  }
}

export function buildHall(b, m) {
  b.zone('Hall');
  slabs(b, m, -4.60, 4.60, -7.10, 6.20, 6, 9, false);
  b.box(F, 9.2, .18, 13.3, 0, 4.24, -.45, m.ceiling);
  for (const side of [-1, 1]) {
    const rotation = [0, side < 0 ? Math.PI / 2 : -Math.PI / 2, 0];
    wall(b, m, frame(side * 4.60, 0, -6.24, rotation), 1.72, m.wall, 2);
    const near = frame(side * 4.60, 0, 3.79, rotation);
    wall(b, m, near, 4.82, m.wall, 4);
    if (side < 0) observationWindow(b, m, near);
    else servicePanel(b, m, near);
    b.box(F, .20, .185, 13.31, side * 4.37, 4.05, -.45, m.darkBeam);
    b.rod(F, [side * 4.31, 3.88, -6.98], [side * 4.31, 3.88, 6.09], .031, m.sageDark);
    b.rod(F, [side * 4.21, 3.90, -6.98], [side * 4.21, 3.90, 6.09], .022, m.dullSteel);
    for (let i = 0; i < 9; ++i) b.box(F, .155, .068, .045, side * 4.26, 3.902, -6.39 + i * 1.48, m.sageDark);
  }
  for (const z of [-6.17, -3.43, -.62, 2.12, 4.88]) {
    b.box(F, 8.76, .18, .17, 0, 4.083, z, m.darkBeam);
    for (const x of [-3.84, -2.16, 2.16, 3.84]) b.box(F, .068, .024, .26, x, 3.986, z, m.dullSteel);
  }
  fixture(b, m, 0, 4.16, 4.10, .67);
  fixture(b, m, 0, 1.45, 4.63, .70);
  fixture(b, m, 0, -2.73, 4.63, .70);
  fixture(b, m, 0, -5.33, 3.49, .61);
  floorInlays(b, m);
  entrance(b, m);
  backWall(b, m);
  workshopShell(b, m, -1);
  workshopShell(b, m, 1);
}

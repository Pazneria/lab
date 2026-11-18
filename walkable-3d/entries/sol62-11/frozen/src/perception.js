import * as THREE from '../vendor/three.module.min.js';
import { frame } from './build.js';
import { littlePlaque, perceptionScreen, sampleCard, sheetMap, stationBoard } from './graphics.js';
import { FLOOR, FORWARD, bolt, handle, lamp, lensFace, monitor, railBench } from './apparatus.js';

const F = frame(-7.55, 0, -2.06, [0, Math.PI / 2, 0]);
const TAU = 2 * Math.PI;
const TOP = .970;

function walls(b, m) {
  b.box(F, 3.91, 1.555, .052, 0, 2.762, -1.203, m.ink);
  b.decal(F, 3.85, 1.52, 0, 2.762, -1.174, stationBoard('perception'));
  b.box(F, 3.92, .045, .091, 0, 1.977, -1.185, m.dullSteel);
  for (const x of [-1.872, 1.872]) {
    for (const y of [2.027, 3.492]) bolt(b, m, F, x, y, -1.164, .012);
  }
  b.box(F, 3.26, .071, .16, 0, 1.869, -1.064, m.ink);
  b.box(F, 3.14, .022, .082, 0, 1.822, -1.048, m.lamp);
  for (const x of [-1.56, 1.56]) b.box(F, .044, .155, .166, x, 1.848, -1.139, m.dullSteel);

  for (const x of [-1.57, .15, 1.60]) {
    b.rounded(F, .213, .102, .053, x === .15 ? .018 : .013, x, 1.151, -1.171, m.cream);
    for (const d of [-.044, .044]) {
      b.box(F, .061, .064, .012, x + d, 1.151, -1.138, m.sageDark);
      b.box(F, .013, .029, .004, x + d, 1.156, -1.13, m.ink);
    }
  }
  b.rounded(F, 3.61, .087, .092, .014, 0, .967, -1.198, m.sageDark);
  b.box(F, .137, .305, .087, 1.76, .783, -1.197, m.sageDark);
  b.cable(F, [[1.556, 1.149, -1.115], [1.548, 1.025, -1.097], [1.599, .885, -.98], [1.612, .829, -.697], [1.619, .835, -.440]], .011, m.rubber);
  b.cable(F, [[-.11, .914, -.513], [-.07, .837, -.689], [.018, .824, -.924], [.078, .925, -1.074], [.105, 1.15, -1.132]], .012, m.cableBlue);
}

function benchStorage(b, m) {
  railBench(b, m, F, 4.29, TOP, 1.049, m.sageDark);
  b.rounded(F, .63, .629, .793, .031, -1.548, .517, -.038, m.sageDark);
  b.box(F, .598, .589, .035, -1.548, .518, .376, m.ink);
  for (let j = 0; j < 3; ++j) {
    const y = .333 + j * .183;
    b.rounded(F, .575, .171, .044, .018, -1.548, y, .391, j === 0 ? m.sageDark : m.sage);
    handle(b, m, F, -1.55, y + .022, .424, .207);
    b.box(F, .092, .021, .008, -1.337, y - .040, .419, m.cream);
  }
  b.rounded(F, 1.25, .035, .627, .014, 1.29, .294, -.046, m.sageDark);
  for (const x of [.707, 1.866]) b.box(F, .046, .057, .592, x, .263, -.043, m.graphite);
  b.rounded(F, .640, .251, .464, .035, 1.333, .442, -.112, m.cableBlue);
  b.box(F, .607, .184, .015, 1.333, .455, .125, m.ink);
  for (let i = 0; i < 19; ++i) b.box(F, .011, .104, .005, 1.048 + i * .022, .445, .138, m.dullSteel);
  lamp(b, m, F, 1.556, .458, .144, m.lightGreen, .011);
  b.decal(F, .138, .047, 1.532, .394, .140, littlePlaque('SYNC', null, { ratio: 2.94, size: 65 }));
  b.cable(F, [[1.598, .516, -.354], [1.637, .495, -.423], [1.657, .386, -.442], [1.715, .341, -.409], [1.811, .371, -.371], [1.897, .585, -.385], [1.892, .83, -.44]], .016, m.rubber, 28);
  b.rounded(F, .360, .062, .37, .014, .841, .343, -.042, m.plywood);
  b.box(F, .326, .011, .338, .840, .379, -.039, m.cream);
  b.rounded(F, .355, .031, .369, .012, .840, .402, -.043, m.ink, [0, .072, 0]);
  b.decal(F, .468, .080, -.602, .879, .496, littlePlaque('OPTICS BENCH', 'REFERENCE SET / 04', { ratio: 5.85, size: 45 }));
}

function camera(b, m) {
  const base = frame(-1.33, TOP, -.125, [0, 0, 0], F);
  b.plane(base, .93, .76, 0, .025, 0, m.smallShadow, FLOOR);
  b.rounded(base, .753, .033, .620, .018, 0, .026, 0, m.graphite);
  b.rounded(base, .715, .018, .586, .010, 0, .052, 0, m.dullSteel);
  for (let ix = 0; ix < 10; ++ix) {
    for (let iz = 0; iz < 8; ++iz) {
      b.cylinder(base, .0055, .0055, .003, -.289 + ix * .064, .062, -.224 + iz * .064, m.ink, undefined, 7);
    }
  }
  for (const x of [-.320, .320]) for (const z of [-.265, .265]) {
    bolt(b, m, base, x, .064, z, .012, [0, 0, 0]);
  }

  b.cylinder(base, .101, .111, .045, 0, .087, 0, m.graphite, undefined, 20);
  b.cylinder(base, .073, .080, .044, 0, .119, 0, m.steel, undefined, 20);
  b.cylinder(base, .034, .034, .248, 0, .242, 0, m.chrome, undefined, 24);
  b.cylinder(base, .054, .052, .061, 0, .343, 0, m.slate, undefined, 20);
  b.rod(base, [0, .314, 0], [-.135, .314, .014], .015, m.steel);
  b.sphere(base, -.140, .316, .014, .030, .026, .024, m.rubber);
  b.rounded(base, .182, .036, .162, .015, 0, .381, 0, m.slate);

  const pivot = frame(.009, .496, -.035, [0, 1.157, 0], base);
  const body = frame(0, 0, 0, [.446, 0, .005], pivot);
  for (const side of [-1, 1]) {
    b.rod(pivot, [side * .113, -.09, -.063], [side * .113, -.022, -.039], .016, m.steel);
    b.rod(pivot, [side * .100, -.022, -.039], [side * .144, -.022, -.039], .031, m.graphite);
  }
  b.rounded(body, .273, .209, .279, .030, 0, 0, 0, m.cableBlue);
  b.rounded(body, .283, .151, .251, .026, 0, -.017, -.005, m.slate);
  b.rounded(body, .217, .195, .055, .028, 0, -.001, .148, m.enamel);
  b.rounded(body, .212, .184, .032, .026, 0, 0, -.150, m.graphite);
  b.cylinder(body, .094, .094, .058, 0, .003, .184, m.dullSteel, FORWARD, 24);
  b.cylinder(body, .085, .089, .144, 0, .003, .274, m.ink, FORWARD, 36);
  b.cylinder(body, .090, .091, .041, 0, .003, .328, m.graphite, FORWARD, 36);
  b.cylinder(body, .071, .077, .018, 0, .003, .35, m.steel, FORWARD, 36);
  b.cylinder(body, .066, .067, .009, 0, .003, .359, m.lens, FORWARD, 36);
  lensFace(b, m, body, .063, 0, .003, .365, [0, 0, 0]);
  for (let j = 0; j < 24; ++j) {
    const a = j * TAU / 24;
    b.box(body, .006, .010, .036, Math.cos(a) * .091, .003 + Math.sin(a) * .091, .329, m.grey, [0, 0, a + Math.PI / 2]);
  }
  for (let i = 0; i < 8; ++i) b.box(body, .084, .008, .019, 0, .106, -.103 + .025 * i, m.slate);
  for (const x of [-.092, .092]) {
    for (const y of [-.069, .070]) bolt(b, m, body, x, y, .178, .009);
  }
  b.rounded(body, .090, .026, .033, 0.010, -.14, -.024, .020, m.ink, [0, -Math.PI / 2, 0]);
  b.decal(body, .148, .041, -.147, .036, .007,
    littlePlaque('PF CAM 02', null, { ratio: 3.61, size: 53 }), [0, -Math.PI / 2, 0]);
  lamp(b, m, body, .077, .067, -.171, m.lightGreen, .010);
  b.cylinder(body, .025, .027, .054, -.049, -.027, -.176, m.dullSteel, FORWARD, 16);
  b.cylinder(body, .021, .021, .055, -.049, -.027, -.207, m.rubber, FORWARD, 16);
  b.cable(body, [[-.049, -.027, -.224], [-.045, -.004, -.297], [-.044, -.058, -.337], [-.039, -.179, -.364], [-.067, -.364, -.365], [-.106, -.436, -.333]], .016, m.rubber);
  b.cable(base, [[-.32, .056, -.19], [-.35, .037, -.23], [-.22, .034, -.321], [.12, .036, -.344], [.31, .031, -.34], [.60, .035, -.356]], .012, m.rubber, 26);
  for (const x of [-.18, .20, .55]) b.box(base, .036, .025, .042, x, .031, -.348, m.dullSteel);
}

function targets(b, m) {
  const t = frame(-.198, TOP, .132, [0, -.062, 0], F);
  b.plane(t, 1.46, .65, -.020, .019, .01, m.smallShadow, FLOOR);
  b.rounded(t, 1.315, .032, .536, .017, 0, .021, 0, m.slate);
  b.rounded(t, 1.27, .024, .492, .014, 0, .039, 0, m.paletteDark);
  for (const x of [-.492, -.166, .171, .505]) {
    b.cylinder(t, .108, .112, .017, x, .054, -.016, m.rubber, undefined, 24);
    b.ring(t, .101, .003, x, .062, -.016, m.dullSteel, FLOOR, 28);
  }
  b.rounded(t, .183, .191, .175, .016, -.493, .154, -.018, m.orange, [0, .30, 0]);
  const target = frame(-.493, .154, -.018, [0, .30, 0], t);
  for (let iy = 0; iy < 5; ++iy) {
    for (let ix = 0; ix < 5; ++ix) {
      if ((iy + ix) % 2 === 0) b.box(target, .022, .022, .0013, -.045 + ix * .0225, -.043 + iy * .0225, .0887, m.maskCream);
    }
  }

  const facet = new THREE.DodecahedronGeometry(.118, 0);
  b.part(t, facet, -.166, .169, -.014, m.enamel, [.46, .21, .127]);
  b.cylinder(t, .054, .085, .175, .168, .153, -.017, m.blue, undefined, 32);
  b.cylinder(t, .049, .054, .012, .168, .244, -.017, m.dullSteel, undefined, 32);
  for (let i = 0; i < 5; ++i) b.ring(t, .080 - i * .0059, .004, .168, .10 + i * .028, -.017, m.graphite, FLOOR, 32);
  b.profile(t, [[-.092, .067], [.092, .067], [.091, .166], [.019, .209], [-.087, .133]], .172, .009, .502, 0, -.018, m.dullSteel, [0, -.15, 0]);
  b.box(t, .078, .012, .124, .52, .155, -.018, m.ochre, [0, -.15, .52]);
  ['A1', 'A2', 'A3', 'A4'].forEach((id, i) =>
    b.decal(t, .100, .042, -.49 + i * .334, .055, .142, littlePlaque(id, null, { ratio: 2.38, size: 63 }), FLOOR));

  const card = frame(.08, 1.19, -.33, [-.19, -.32, 0], F);
  b.rounded(card, .55, .255, .042, .021, 0, 0, 0, m.graphite);
  b.decal(card, .512, .224, 0, 0, .024, sampleCard());
  for (const x of [-.22, .22]) {
    b.rod(card, [x, -.093, -.014], [x, -.199, -.108], .011, m.steel);
    b.rod(card, [x, -.093, -.016], [x, -.205, .083], .011, m.steel);
  }
}

function accessories(b, m) {
  monitor(b, m, F, 1.38, 1.435, -.310, .955, .557, perceptionScreen(), -.082);
  b.cable(F, [[1.48, 1.294, -.369], [1.49, 1.222, -.406], [1.60, 1.109, -.506], [1.62, 1.032, -.625], [1.62, 1.007, -.794], [1.57, 1.15, -1.11]], .011, m.rubber, 24);

  const keyboard = frame(1.388, TOP + .022, .036, [.071, -.042, 0], F);
  b.rounded(keyboard, .623, .025, .211, .014, 0, 0, 0, m.ink);
  const nKeys = [13, 13, 12, 12, 10];
  nKeys.forEach((n, row) => {
    for (let i = 0; i < n; ++i) {
      const x = -.275 + i * .044;
      b.box(keyboard, .036, .008, .028, x, .017, -.075 + row * .035, (i + row * 3) % 11 === 0 ? m.bluePale : m.grey);
      b.box(keyboard, .009, .001, .003, x - .005, .0215, -.077 + row * .035, m.wallPanel);
    }
  });
  b.box(keyboard, .116, .008, .028, .23, .017, .065, m.bluePale);
  b.rounded(F, .080, .042, .135, .019, 1.858, TOP + .026, .079, m.graphite, [0, .14, 0]);
  b.box(F, .009, .004, .025, 1.854, TOP + .049, .064, m.grey);

  const clip = frame(.910, TOP + .022, .322, [0, -.17, 0], F);
  b.rounded(clip, .252, .017, .340, .012, 0, 0, 0, m.plywood);
  b.decal(clip, .215, .289, 0, .011, .001, sheetMap('perception'), FLOOR);
  b.rounded(clip, .095, .019, .032, .008, 0, .019, -.145, m.steel);
  b.rod(clip, [.127, .016, -.003], [.114, .016, .149], .008, m.cableBlue);
  b.rod(clip, [.114, .016, .149], [.112, .016, .164], .005, m.steel);
}

export function buildPerception(b, m) {
  b.zone('Perception Bench');
  walls(b, m);
  benchStorage(b, m);
  camera(b, m);
  targets(b, m);
  accessories(b, m);
}

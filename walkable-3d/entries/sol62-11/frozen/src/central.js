import { frame } from './build.js';
import { arrayScreen, littlePlaque } from './graphics.js';
import { BACK, FLOOR, FORWARD, bolt, handle, lamp, lensFace, monitor } from './apparatus.js';

const TWO_PI = Math.PI * 2;
const Y = 1.94;
const F = frame(0, 0, -.56, [0, -.095, 0]);

function chassis(b, m) {
  b.plane(F, 3.81, 3.66, .02, .013, .035, m.contactShadow, FLOOR);
  for (const x of [-1.05, 1.05]) {
    for (const z of [-.82, .82]) {
      b.cylinder(F, .103, .125, .051, x, .036, z, m.rubber, undefined, 18);
      b.cylinder(F, .067, .073, .043, x, .083, z, m.steel, undefined, 18);
      b.box(F, .31, .084, .32, x, .125, z, m.graphite);
    }
  }
  b.rounded(F, 2.74, .161, 2.25, .064, 0, .166, 0, m.graphite);
  b.rounded(F, 2.65, .389, 2.15, .075, 0, .368, 0, m.cream);
  b.rounded(F, 2.68, .085, 2.18, .037, 0, .565, 0, m.enamel);
  b.rounded(F, 2.57, .029, 2.06, .012, 0, .621, 0, m.dullSteel);
  b.box(F, 2.38, .022, 2.00, 0, .374, 0, m.ink);
  const fr = frame(0, 0, 1.087, [0, 0, 0], F);
  b.rounded(fr, 1.45, .267, .037, .034, -.183, .376, .008, m.ink);
  b.decal(fr, 1.31, .201, -.182, .374, .027,
    littlePlaque('Spectral Array', 'PF–01   /   OPTICAL INSTRUMENT', { ratio: 6.52, size: 61, small: 27, accent: '#b6d3c2', stripe: true }));
  for (const x of [-1.22, 1.22]) {
    for (const y of [.285, .475]) bolt(b, m, fr, x, y, .012, .013);
  }
  b.rounded(fr, .44, .139, .035, .019, .903, .387, .007, m.slate);
  [[.78, m.lightGreen], [.888, m.lightCyan], [.996, m.lightAmber]].forEach(([x, color]) => lamp(b, m, fr, x, .395, .031, color, .017));
  for (const x of [.78, .888, .996]) b.box(fr, .026, .004, .002, x, .356, .026, m.cream);

  const rear = frame(0, 0, -1.087, BACK, F);
  b.rounded(rear, 1.26, .29, .038, .024, .220, .373, .006, m.slate);
  b.decal(rear, .67, .128, -.231, .443, .029, littlePlaque('SPECTRAL ARRAY', 'PF–01 / SERVICE', { ratio: 5.2, size: 40 }));
  b.rounded(rear, .45, .162, .035, .017, .505, .365, .028, m.ink);
  for (let i = 0; i < 12; ++i) b.box(rear, .014, .12, .003, .320 + i * .033, .367, .048, m.dullSteel);
  b.rounded(rear, .41, .236, .035, .017, -.83, .372, .003, m.graphite);
  b.cylinder(rear, .033, .033, .026, -.94, .38, .046, m.steel, FORWARD, 18);
  b.cylinder(rear, .025, .025, .037, -.94, .38, .061, m.rubber, FORWARD, 16);
  b.cylinder(rear, .033, .033, .026, -.724, .38, .046, m.steel, FORWARD, 18);
  b.cylinder(rear, .024, .024, .038, -.724, .38, .059, m.cableBlue, FORWARD, 16);
  for (const x of [-1.16, 1.16]) {
    for (const y of [.263, .493]) bolt(b, m, rear, x, y, .019, .011);
  }

  for (const side of [-1, 1]) {
    const wall = frame(1.323 * side, 0, 0, [0, side * Math.PI / 2, 0], F);
    b.rounded(wall, 1.66, .257, .042, .026, 0, .362, .017, m.grey);
    b.rounded(wall, 1.56, .216, .021, .019, 0, .364, .043, m.cream);
    b.rounded(wall, .622, .155, .013, .014, -.36, .363, .059, m.ink);
    for (let i = 0; i < 18; ++i) b.box(wall, .020, .116, .006, -.626 + i * .0315, .363, .069, m.dullSteel);
    handle(b, m, wall, .399, .398, .067, .303);
    for (const xx of [-.733, .733]) {
      for (const yy of [.278, .447]) bolt(b, m, wall, xx, yy, .060, .010);
    }
    b.decal(wall, .367, .060, .396, .320, .056, littlePlaque('ACCESS PANEL', null, { ratio: 6.12, size: 43, dark: false }));
  }
}

function yokes(b, m) {
  for (const side of [-1, 1]) {
    const outline = [
      [.59, .64], [1.25, .64], [1.29, .77], [1.16, 1.59], [1.10, 1.86],
      [.98, 1.92], [.87, 1.86], [.92, 1.67], [.88, 1.32]
    ].map(([x, y]) => [x * side, y]);
    for (const z of [-.48, .55]) {
      b.plane(F, .71, .53, .963 * side, .638, z, m.smallShadow, FLOOR);
      b.profile(F, outline, .165, .033, 0, 0, z, m.enamel);
      const cut = [[.776, .73], [1.125, .73], [1.155, .85], [1.045, 1.47], [.988, 1.56], [.969, 1.37]];
      b.profile(F, cut.map(([x, y]) => [x * side, y]), .027, .006, 0, 0, z + Math.sign(z) * .094, m.slate);
      b.box(F, .53, .06, .308, .959 * side, .673, z, m.steel);
      for (const x of [.746, 1.17]) {
        for (const dz of [-.106, .106]) bolt(b, m, F, x * side, .711, z + dz, .018, [0, 0, 0]);
      }
      b.cylinder(F, .151, .151, .219, 1.025 * side, 1.758, z, m.dullSteel, FORWARD, 24);
      b.cylinder(F, .106, .106, .232, 1.025 * side, 1.758, z, m.graphite, FORWARD, 24);
      const front = z + .126 * Math.sign(z);
      b.cylinder(F, .073, .073, .034, 1.025 * side, 1.758, front, m.steel, FORWARD, 24);
      if (z > 0) bolt(b, m, F, 1.025 * side, 1.758, front + .024, .025);
    }
    b.rod(F, [1.106 * side, 1.40, -.49], [1.106 * side, 1.40, .55], .037, m.steel);
    b.rod(F, [1.176 * side, .911, -.47], [1.176 * side, .911, .53], .031, m.sageDark);
    b.cable(F, [
      [1.137 * side, .626, -.60], [1.232 * side, .79, -.62],
      [1.194 * side, 1.245, -.64], [1.137 * side, 1.58, -.63], [1.097 * side, 1.86, -.55]
    ], .023, m.rubber);
    b.cable(F, [
      [1.092 * side, .626, -.592], [1.190 * side, .79, -.618],
      [1.148 * side, 1.245, -.664], [1.089 * side, 1.58, -.675], [1.056 * side, 1.88, -.56]
    ], .014, m.cableBlue);
    for (const [x, y, z] of [[1.217, .862, -.62], [1.164, 1.265, -.645], [1.111, 1.58, -.648]]) {
      b.box(F, .077, .031, .071, x * side, y, z, m.graphite, [0, 0, side * -.12]);
    }
  }
}

function opticalBarrel(b, m, angle, index) {
  const radius = 1.065;
  const x = Math.cos(angle) * radius;
  const y = Y + Math.sin(angle) * radius;
  const outward = Math.atan2(y - 1.51, x) - Math.PI / 2;
  const mount = frame(x, y, .103, [0, 0, outward], F);
  const f = frame(0, 0, 0, [.117, 0, 0], mount);
  const radial = frame(x, y, .071, [0, 0, angle - Math.PI / 2], F);
  b.rounded(radial, .258, .077, .285, .018, 0, .079, -.017, m.dullSteel);
  const major = index === 3;
  const large = major ? 1.34 : index % 3 === 0 ? 1.06 : .88;
  b.rounded(f, .284, .109, .370, .022, 0, .028, -.015, index % 2 ? m.slate : m.graphite);
  b.box(f, .322, .053, .331, 0, .083, -.025, m.dullSteel);
  b.cylinder(f, .087 * large, .101 * large, .169 * large, 0, -.081 * large, .009, m.steel, undefined, 24);
  b.cylinder(f, .113 * large, .117 * large, .077 * large, 0, -.147 * large, .009, m.graphite, undefined, 32);
  b.cylinder(f, .104 * large, .112 * large, .029, 0, -.196 * large, .009, m.dullSteel, undefined, 32);
  b.cylinder(f, .095 * large, .095 * large, .018, 0, -.214 * large, .009, m.lens, undefined, 32);
  lensFace(b, m, f, .091 * large, 0, -.224 * large, .009, FORWARD);
  b.ring(f, .094 * large, .0045, 0, -.222 * large, .009, m.steel, FORWARD, 36);
  b.ring(f, .108 * large, .006, 0, -.173 * large, .009, m.rubber, FORWARD, 36);
  for (let i = 0; i < 16; ++i) {
    const a = TWO_PI * i / 16;
    const r = .116 * large;
    b.box(f, .010, .049 * large, .013, Math.cos(a) * r, -.149 * large, .009 + Math.sin(a) * r, m.dullSteel, [0, Math.PI / 2 - a, 0]);
  }
  for (const x of [-.114, .114]) bolt(b, m, f, x, .025, .177, .012);
  lamp(b, m, f, 0, .027, .181, major ? m.lightAmber : m.lightCyan, .010);
  b.cable(f, [[.004, .064, -.203], [.008, .049, -.275], [.019, -.023, -.350], [.046, -.015, -.438], [.067, .066, -.465]], .015, m.rubber, 14);
  b.cylinder(f, .023, .023, .038, 0, .065, -.198, m.graphite, FORWARD, 12);
  b.cylinder(f, .021, .023, .045, .064, .075, -.465, m.chrome, undefined, 12);
}

function arrayRing(b, m) {
  b.ring(F, 1.143, .024, 0, Y, .289, m.graphite, undefined, 96);
  b.ring(F, 1.129, .017, 0, Y, -.387, m.graphite, undefined, 96);
  b.ring(F, 1.034, .023, 0, Y, -.442, m.steel, undefined, 96);
  const count = 12;
  for (let i = 0; i < count; ++i) {
    const a = i * TWO_PI / count;
    const length = TWO_PI / count - .025;
    const frontColor = [m.blue, m.blue, m.enamel, m.enamel, m.blue, m.blue, m.blue, m.enamel, m.enamel, m.enamel, m.blue, m.blue][i];
    b.arc(F, 1.229, .989, .243, a + .006, length, 0, Y, .360, m.slate, .014);
    b.arc(F, 1.231, 1.038, .058, a + .009, length - .006, 0, Y, .491, frontColor, .012);
    b.arc(F, 1.244, 1.203, .075, a + .028, length - .039, 0, Y, .479, m.dullSteel, .006);
    b.arc(F, 1.043, 1.003, .046, a + .030, length - .047, 0, Y, .493, m.steel, .005);
    b.arc(F, 1.192, 1.003, .118, a + .020, length - .017, 0, Y, -.402, i % 3 === 1 ? m.blue : m.dullSteel, .010);
    for (const d of [.105, length - .10]) {
      const t = a + d;
      bolt(b, m, F, Math.cos(t) * 1.147, Y + Math.sin(t) * 1.147, .526, .015);
      const reverse = frame(0, Y, -.468, BACK, F);
      bolt(b, m, reverse, -Math.cos(t) * 1.126, Math.sin(t) * 1.126, .008, .014);
    }
    const t = a + length * .47;
    const x = Math.cos(t) * 1.11;
    const y = Math.sin(t) * 1.11 + Y;
    b.rod(F, [x, y, -.34], [x, y, .269], .031, i % 3 === 0 ? m.chrome : m.steel, 14);
    for (const z of [-.285, .239]) {
      b.cylinder(F, .052, .052, .063, x, y, z, m.graphite, FORWARD, 14);
    }
    if (i % 3 !== 1) {
      const z = -.10;
      b.box(F, .098, .072, .311, 1.113 * Math.cos(t), Y + 1.113 * Math.sin(t), z, m.slate, [0, 0, t - Math.PI / 2]);
    }
  }
  const angles = [12, 38, 65, 90, 115, 144, 167];
  angles.forEach((angle, i) => opticalBarrel(b, m, angle * Math.PI / 180, i));
  for (const angle of [202, 230, 260, 291, 322, 341]) {
    const a = angle * Math.PI / 180;
    const back = frame(1.118 * Math.cos(a), Y + 1.118 * Math.sin(a), -.116, [0, 0, a - Math.PI / 2], F);
    b.rounded(back, .155, .105, .132, .023, 0, -.052, -.176, m.graphite);
    b.cylinder(back, .032, .044, .082, 0, -.134, -.176, m.steel, undefined, 18);
    lensFace(b, m, back, .027, 0, -.177, -.176, FORWARD);
  }
  for (const lane of [-.317, -.246]) {
    const points = [];
    for (let i = 0; i <= 23; ++i) {
      const t = .055 + i * 3.04 / 23;
      const radius = 1.11 + Math.sin(i * .79) * .022;
      points.push([radius * Math.cos(t), Y + radius * Math.sin(t), lane + Math.sin(i * .70) * .021]);
    }
    b.cable(F, points, lane < -.30 ? .016 : .012, lane < -.30 ? m.rubber : m.cableBlue, 48);
  }

  const badge = frame(0, Y + 1.171, .522, [0, 0, 0], F);
  b.rounded(badge, .264, .077, .027, .014, 0, 0, 0, m.ink);
  b.decal(badge, .233, .053, 0, 0, .016, littlePlaque('OPTICAL ARRAY', null, { ratio: 4.4, size: 49 }));
}

function sampleStage(b, m) {
  b.plane(F, 1.63, 1.20, -.026, .639, 0, m.smallShadow, FLOOR);
  b.cylinder(F, .462, .525, .090, 0, .691, -.045, m.graphite, undefined, 48);
  b.cylinder(F, .392, .485, .100, 0, .758, -.045, m.dullSteel, undefined, 48);
  b.cylinder(F, .203, .284, .365, 0, .958, -.045, m.graphite, undefined, 32);
  b.cylinder(F, .258, .274, .067, 0, .833, -.045, m.slate, undefined, 32);
  b.cylinder(F, .218, .223, .021, 0, 1.04, -.045, m.steel, undefined, 32);
  const upper = frame(0, .12, 0, [0, 0, 0], F);
  b.cylinder(upper, .335, .251, .130, 0, 1.075, -.045, m.steel, undefined, 40);
  b.cylinder(upper, .367, .367, .041, 0, 1.145, -.045, m.ink, undefined, 48);
  b.cylinder(upper, .345, .358, .034, 0, 1.170, -.045, m.lightCyan, undefined, 48);
  b.cylinder(upper, .335, .344, .042, 0, 1.198, -.045, m.enamel, undefined, 48);
  b.cylinder(upper, .267, .267, .013, 0, 1.224, -.045, m.paletteDark, undefined, 48);
  b.cylinder(upper, .197, .197, .013, 0, 1.233, -.045, m.lightCyan, undefined, 48);
  b.cylinder(upper, .159, .159, .016, 0, 1.238, -.045, m.paletteLight, undefined, 32);
  b.ring(upper, .305, .003, 0, 1.221, -.045, m.ink, FLOOR, 60);
  for (let i = 0; i < 24; ++i) {
    const a = i * TWO_PI / 24;
    b.box(upper, .005, .002, i % 3 === 0 ? .033 : .021, .302 * Math.sin(a), 1.222, -.045 + .301 * Math.cos(a), m.ink, [0, a, 0]);
  }
  const specimen = frame(0, 1.252, -.045, [0, .25, 0], upper);
  b.cylinder(specimen, .118, .128, .032, 0, .016, 0, m.graphite, undefined, 12);
  b.profile(specimen, [[-.087, .034], [.087, .034], [.087, .176], [.047, .221], [-.084, .178]], .133, .009, 0, 0, 0, m.ochre);
  b.profile(specimen, [[-.068, .040], [.061, .040], [.061, .156], [.033, .185], [-.068, .155]], .007, .002, 0, 0, .073, m.steel);
  for (let j = 0; j < 7; ++j) b.box(specimen, .102 - (j === 6 ? .025 : 0), .0037, .0022, -.003, .064 + j * .015, .078, j % 2 ? m.ink : m.slate);
  b.box(specimen, .027, .082, .011, .066, .105, -.073, m.lightCyan);
  for (const x of [-.317, .317]) {
    b.rounded(upper, .090, .116, .332, .017, x, 1.204, -.153, m.graphite);
    b.rounded(upper, .015, .234, .313, .009, x, 1.348, -.156, m.polycarbonate, [0, -Math.sign(x) * .035, 0]);
    b.rod(upper, [x, 1.455, -.313], [x, 1.455, -.001], .006, m.lensBlue);
    for (const z of [-.28, -.028]) b.cylinder(upper, .021, .025, .023, x, 1.27, z, m.steel, undefined, 12);
  }
  b.decal(upper, .30, .063, -.004, 1.077, .275, littlePlaque('SAMPLE STAGE', null, { size: 46 }));
}

function controls(b, m) {
  const uf = frame(.83, 0, .724, [0, -.17, 0], F);
  b.rounded(uf, .317, .076, .218, .023, 0, .663, -.020, m.graphite);
  b.box(uf, .086, .397, .082, 0, .845, -.062, m.steel, [-.18, 0, 0]);
  b.box(uf, .11, .264, .066, 0, .793, -.066, m.slate, [-.18, 0, 0]);
  monitor(b, m, uf, 0, 1.310, .004, .579, .360, arrayScreen(), -.22);
  b.rounded(uf, .569, .114, .201, .038, 0, 1.015, .078, m.slate, [.22, 0, 0]);
  const p = frame(0, 1.076, .087, [0, 0, 0], uf);
  for (const x of [-.197, -.104, -.010]) {
    b.cylinder(p, .025, .031, .023, x, 0, .034, m.graphite, undefined, 16);
    b.cylinder(p, .018, .020, .013, x, .016, .034, x > -.06 ? m.lightAmber : m.lightGreen, undefined, 16);
  }
  b.cylinder(p, .048, .048, .036, .177, .0, .021, m.graphite, undefined, 18);
  b.cylinder(p, .033, .038, .044, .177, .022, .021, m.cream, undefined, 20);
  b.box(p, .005, .002, .023, .172, .045, .019, m.ink, [0, -.38, 0]);
  b.cable(uf, [[.118, 1.285, -.048], [.151, 1.212, -.143], [.108, 1.111, -.181], [.074, .897, -.101], [.066, .677, -.131]], .011, m.rubber, 20);
  b.rounded(F, .322, .145, .422, .028, -.85, .690, .480, m.sageDark);
  b.box(F, .237, .051, .407, -.85, .771, .480, m.slate);
  b.decal(F, .254, .055, -.85, .690, .694, littlePlaque('PULSE DRIVER', null, { ratio: 4.62, size: 47 }));
  b.cable(F, [[-.855, .709, .264], [-.854, .707, .150], [-.734, .645, .021], [-.655, .644, -.272], [-.686, .704, -.603]], .014, m.rubber, 20);
}

export function buildCentral(b, m) {
  b.zone('Spectral Array');
  chassis(b, m);
  yokes(b, m);
  arrayRing(b, m);
  sampleStage(b, m);
  controls(b, m);
}

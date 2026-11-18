import { frame } from './build.js';
import { littlePlaque, motionScreen, sheetMap, stationBoard } from './graphics.js';
import { BACK, CROSS, FLOOR, FORWARD, bolt, handle, lamp, monitor, railBench } from './apparatus.js';

const F = frame(7.53, 0, -2.03, [0, -Math.PI / 2, 0]);
const TOP = 1.004;

function walls(b, m) {
  b.box(F, 4.11, 1.635, .051, 0, 2.731, -1.217, m.ink);
  b.decal(F, 4.051, 1.600, 0, 2.728, -1.188, stationBoard('motion'));
  b.box(F, 4.11, .043, .080, 0, 1.908, -1.194, m.dullSteel);
  for (const x of [-1.982, 1.982]) {
    for (const y of [1.985, 3.485]) bolt(b, m, F, x, y, -1.179, .012);
  }
  b.rod(F, [-2.164, 1.526, -1.205], [2.114, 1.526, -1.205], .016, m.dullSteel);
  for (const x of [-2.078, -.93, .34, 1.48, 2.023]) b.box(F, .051, .082, .048, x, 1.527, -1.231, m.sageDark);
  b.rounded(F, .20, .159, .096, .013, 1.99, 1.118, -1.206, m.cream);
  b.rounded(F, .100, .068, .013, .013, 1.99, 1.109, -1.152, m.graphite);
  lamp(b, m, F, 2.05, 1.16, -1.151, m.lightGreen, .009);
  b.cable(F, [[1.993, 1.529, -1.20], [2.106, 1.485, -1.199], [2.13, 1.392, -1.193], [2.126, 1.202, -1.196], [2.062, 1.128, -1.179]], .011, m.rubber, 16);
  b.cable(F, [[1.971, 1.100, -1.141], [1.948, .977, -1.083], [1.952, .906, -.926], [1.953, .942, -.665], [1.906, .977, -.498]], .017, m.rubber, 20);
}

function benchBase(b, m) {
  railBench(b, m, F, 4.58, TOP, 1.191, m.graphite);
  b.rounded(F, .782, .473, .737, .033, .966, .328, -.118, m.sageDark);
  b.box(F, .738, .427, .030, .966, .327, .265, m.ink);
  b.rounded(F, .709, .402, .034, .019, .966, .326, .283, m.sage);
  handle(b, m, F, .980, .466, .310, .25);
  b.decal(F, .366, .071, .948, .356, .304, littlePlaque('TOOLS / JIGS', null, { ratio: 5.15, size: 56, dark: false }));

  b.rounded(F, .699, .290, .545, .033, -1.56, .733, -.089, m.slate);
  b.rounded(F, .645, .238, .038, .018, -1.56, .736, .197, m.graphite);
  for (let i = 0; i < 7; ++i) {
    b.box(F, .187, .011, .003, -1.731, .671 + i * .021, .223, m.grey);
    b.box(F, .162, .011, .003, -1.529, .671 + i * .021, .224, m.grey);
  }
  lamp(b, m, F, -1.32, .762, .222, m.lightAmber, .010);
  b.decal(F, .169, .047, -1.34, .669, .219, littlePlaque('DRIVE', null, { ratio: 3.61, size: 49 }));
  b.cable(F, [[-1.57, .802, -.369], [-1.57, .804, -.450], [-1.62, .846, -.471], [-1.76, .988, -.486], [-1.91, 1.113, -.438]], .014, m.rubber, 22);
  b.box(F, 3.60, .061, .089, -.045, .891, -.493, m.ink);
  b.cable(F, [[.66, .883, -.493], [1.026, .883, -.492], [1.462, .883, -.485], [1.764, .891, -.456], [1.843, 1.083, -.439]], .014, m.cableBlue, 18);
  for (const x of [-1.8, -.95, .35, 1.58]) b.box(F, .034, .081, .095, x, .893, -.493, m.dullSteel);
  b.decal(F, .55, .086, -.598, .902, .562, littlePlaque('LINEAR ACTUATOR', 'PF–03   /   480 MM STROKE', { ratio: 6.39, size: 46, accent: '#e4b492' }));
}

function track(b, m) {
  const f = frame(-.58, TOP, -.031, [0, 0, 0], F);
  b.plane(f, 2.99, 1.011, 0, .020, .035, m.smallShadow, FLOOR);

  for (const x of [-1.125, -.31, .43, 1.16]) {
    b.rounded(f, .137, .064, .754, .017, x, .047, 0, m.graphite);
    for (const z of [-.322, .322]) bolt(b, m, f, x, .084, z, .015, [0, 0, 0]);
  }
  b.rounded(f, 2.73, .128, .636, .025, 0, .132, 0, m.dullSteel);
  b.box(f, 2.64, .039, .644, 0, .127, 0, m.graphite);
  b.box(f, 2.64, .011, .648, 0, .106, 0, m.steel);
  b.box(f, 2.57, .013, .442, 0, .201, 0, m.graphite);

  for (const z of [-.198, .198]) {
    b.box(f, 2.44, .048, .103, 0, .212, z, m.ink);
    b.box(f, 2.42, .023, .055, 0, .245, z, m.steel);
    b.rod(f, [-1.235, .281, z], [1.235, .281, z], .022, m.chrome, 20);
    for (let i = 0; i < 14; ++i) bolt(b, m, f, -1.119 + i * .173, .247, z + .039, .0065, [0, 0, 0]);
  }
  b.rod(f, [-1.222, .267, 0], [1.218, .267, 0], .017, m.chrome, 18);
  for (let i = 0; i < 64; ++i) {
    const x = -1.185 + i * .0376;
    b.ring(f, .0178, .0039, x, .267, 0, m.grey, [0, Math.PI / 2, .25], 12);
  }

  for (const x of [-1.255, 1.258]) {
    b.rounded(f, .197, .182, .599, .036, x, .242, 0, m.orange);
    b.rounded(f, .167, .082, .102, .015, x, .341, .229, m.graphite);
    b.rounded(f, .135, .028, .079, .011, x, .387, .228, m.red);
    b.rod(f, [x, .364, -.208], [x, .364, .154], .013, m.steel);
    for (const z of [-.217, .217]) bolt(b, m, f, x, .336, z, .016, [0, 0, 0]);
  }
  b.rounded(f, .283, .219, .231, .018, -1.452, .256, -.008, m.graphite);
  b.rounded(f, .050, .226, .233, .015, -1.559, .256, -.008, m.slate);
  for (let i = 0; i < 6; ++i) b.box(f, .015, .232, .236, -1.533 + i * .035, .257, -.008, m.dullSteel);
  b.cylinder(f, .057, .057, .067, -1.592, .259, -.004, m.ink, CROSS, 24);

  b.box(f, 2.45, .076, .009, 0, .141, .326, m.ink);
  for (let i = 0; i <= 48; ++i) {
    const x = (i - 24) * .0488;
    b.box(f, i % 5 === 0 ? .0048 : .0028, i % 5 === 0 ? .042 : .022, .0012, x, .145, .332, m.maskCream);
  }
  b.decal(f, .239, .063, 1.015, .143, .333, littlePlaque('480 MM', null, { ratio: 3.79, size: 57 }));
  b.decal(f, .143, .063, -1.122, .142, .333, littlePlaque('0', null, { ratio: 2.27, size: 60 }));
  lamp(b, m, f, -1.225, .252, .318, m.lightGreen, .010);
  lamp(b, m, f, 1.241, .251, .318, m.lightAmber, .010);

  const cableZ = -.285;
  const chain = [
    [-1.34, .227, cableZ], [-.90, .233, cableZ], [-.54, .233, cableZ],
    [-.40, .247, cableZ], [-.32, .295, cableZ], [-.35, .363, cableZ],
    [-.55, .400, cableZ], [-.76, .405, cableZ]
  ];
  b.cable(f, chain, .022, m.rubber, 22);
  for (let i = 0; i < 19; ++i) {
    const t = i / 18;
    const x = -1.304 + 1.04 * t;
    const y = .232 + .065 * Math.pow(t, 10);
    b.rounded(f, .052, .052, .062, .016, x, y, cableZ, m.graphite, [0, 0, Math.pow(t, 8) * .79]);
    b.box(f, .028, .010, .004, x, y, cableZ -.034, m.grey);
  }
  for (let i = 0; i < 8; ++i) {
    b.rounded(f, .048, .052, .062, .014, -.34 - .055 * i, .360 + (.044 * Math.min(1, i / 4)), cableZ, m.graphite, [0, 0, -.53 * (1 - i / 8)]);
  }

  for (const x of [-1.015, .969]) {
    b.rounded(f, .072, .064, .059, .015, x, .225, -.303, m.orange);
    b.rounded(f, .009, .188, .370, .013, x, .324, -.092, m.polycarbonate);
    b.rod(f, [x, .413, -.27], [x, .413, .085], .006, m.lensBlue);
  }

  return f;
}

function joint(b, m, f, x, y, z, radius, depth) {
  b.cylinder(f, radius, radius, depth, x, y, z, m.graphite, FORWARD, 24);
  b.cylinder(f, radius * .88, radius * .88, .024, x, y, z + depth / 2 + .008, m.dullSteel, FORWARD, 24);
  b.cylinder(f, radius * .65, radius * .69, .030, x, y, z + depth / 2 + .025, m.steel, FORWARD, 24);
  b.cylinder(f, radius * .39, radius * .44, .025, x, y, z + depth / 2 + .047, m.slate, FORWARD, 16);
  bolt(b, m, f, x, y, z + depth / 2 + .062, radius * .19);
  for (const s of [-1, 1]) bolt(b, m, f, x + s * radius * .74, y, z + depth / 2 + .021, radius * .11);
  b.cylinder(f, radius * .68, radius * .72, .025, x, y, z - depth / 2 - .008, m.dullSteel, FORWARD, 24);
}

function link(b, m, f, a, c, width, depth, color) {
  const dx = c[0] - a[0];
  const dy = c[1] - a[1];
  const len = Math.hypot(dx, dy);
  const arm = frame(a[0], a[1], a[2], [0, 0, Math.atan2(dy, dx) - Math.PI / 2], f);
  b.profile(arm, [[-width * .45, .012], [width * .45, .012], [width * .53, len * .23],
    [width * .41, len * .84], [width * .31, len - .008], [-width * .31, len - .008], [-width * .43, len * .82], [-width * .53, len * .20]],
  depth, .015, 0, 0, 0, color);
  b.rounded(arm, width * .45, len * .49, .018, .016, 0, len * .52, depth / 2 + .008, m.graphite);
  b.box(arm, width * .22, len * .37, .003, 0, len * .52, depth / 2 + .018, m.grey);
  return arm;
}

function carriage(b, m, f) {
  const p = frame(-.39, 0, 0, [0, 0, 0], f);
  for (const z of [-.193, .194]) {
    for (const x of [-.198, .198]) {
      b.rounded(p, .148, .097, .128, .017, x, .308, z, m.slate);
      b.rounded(p, .114, .054, .013, .012, x + .075, .284, z, m.graphite, [0, Math.PI / 2, 0]);
    }
  }
  b.rounded(p, .558, .069, .520, .026, 0, .381, 0, m.steel);
  b.rounded(p, .495, .025, .464, .013, 0, .429, 0, m.graphite);
  for (const x of [-.201, .201]) {
    for (const z of [-.180, .180]) bolt(b, m, p, x, .446, z, .016, [0, 0, 0]);
  }
  b.cylinder(p, .175, .191, .050, 0, .465, .014, m.ink, undefined, 26);
  b.cylinder(p, .146, .166, .045, 0, .508, .014, m.orange, undefined, 28);
  b.box(p, .116, .067, .196, -.03, .541, .016, m.slate);

  for (const z of [-.082, .109]) {
    b.profile(p, [[-.143, .518], [.154, .518], [.108, .678], [.071, .729], [-.071, .726], [-.130, .648]], .049, .014, 0, 0, z, m.orange);
  }
  joint(b, m, p, .008, .669, .012, .098, .217);
  const shoulder = [.014, .667, .014];
  const elbow = [.423, 1.005, .014];
  const tip = [.836, .806, .014];
  link(b, m, p, shoulder, elbow, .153, .133, m.orange);
  link(b, m, p, elbow, tip, .126, .100, m.enamel);
  joint(b, m, p, elbow[0], elbow[1], .014, .080, .152);
  joint(b, m, p, tip[0], tip[1], .014, .064, .120);
  const claw = frame(.843, .733, .024, [0, 0, .07], p);
  b.rounded(claw, .153, .067, .119, .018, 0, 0, 0, m.slate);
  b.cylinder(claw, .040, .034, .066, 0, -.056, 0, m.steel, undefined, 16);
  for (const side of [-1, 1]) {
    b.profile(claw, [[.030 * side, -.043], [.074 * side, -.055], [.073 * side, -.141],
      [.047 * side, -.169], [.035 * side, -.157], [.047 * side, -.122]], .046, .005, 0, 0, 0, m.graphite);
    b.box(claw, .009, .043, .042, side * .047, -.122, 0, m.rubber, [0, 0, side * .13]);
  }
  b.cable(p, [[-.105, .489, -.191], [-.095, .590, -.197], [.027, .755, -.138], [.183, .850, -.105],
    [.397, 1.079, -.096], [.538, 1.025, -.108], [.775, .905, -.081], [.872, .783, -.059]], .014, m.rubber, 34);
  for (const [x, y, z] of [[.141, .83, -.098], [.360, 1.047, -.092], [.570, 1.001, -.103], [.754, .912, -.081]]) {
    b.box(p, .033, .026, .033, x, y, z, m.dullSteel, [0, 0, -.65]);
  }
  b.rounded(f, .27, .063, .230, .013, .435, .246, .014, m.graphite);
  b.cylinder(f, .032, .041, .109, .435, .32, .015, m.ochre, undefined, 16);
  for (const x of [.345, .526]) bolt(b, m, f, x, .280, .049, .011, [0, 0, 0]);
}

function controlConsole(b, m) {
  const cf = frame(1.500, TOP, .018, [0, -.092, 0], F);
  b.plane(cf, 1.02, .99, .012, .019, .04, m.smallShadow, FLOOR);
  b.rounded(cf, .936, .110, .448, .041, 0, .075, .122, m.slate);
  b.rounded(cf, .893, .101, .427, .026, 0, .132, .113, m.graphite, [.23, 0, 0]);
  b.rounded(cf, .856, .018, .364, .019, 0, .187, .122, m.sageDark, [.23, 0, 0]);
  monitor(b, m, cf, .020, .595, -.211, .793, .468, motionScreen(), -.20);
  b.cable(cf, [[.234, .494, -.254], [.267, .398, -.279], [.338, .248, -.327], [.406, .171, -.259], [.395, .123, -.108]], .013, m.rubber, 18);

  const p = frame(0, .204, .125, [.23, 0, 0], cf);
  b.cylinder(p, .067, .067, .018, -.295, -.003, .046, m.ochre, undefined, 24);
  b.cylinder(p, .039, .043, .033, -.295, .019, .046, m.graphite, undefined, 20);
  b.cylinder(p, .051, .047, .029, -.295, .043, .046, m.red, undefined, 24);
  b.cylinder(p, .046, .051, .013, -.295, .061, .046, m.red, undefined, 24);
  b.box(p, .025, .002, .004, -.295, .069, .047, m.cream);
  b.decal(p, .139, .042, -.295, .013, -.069, littlePlaque('E-STOP', null, { ratio: 3.31, size: 60, accent: '#f8d59f' }), FLOOR);

  [[-.124, 'ZERO', m.lightGreen], [.006, 'STEP', m.lightAmber], [.134, 'HOLD', m.cream]].forEach(([x, name, color]) => {
    b.cylinder(p, .030, .032, .019, x, .006, .054, m.graphite, undefined, 16);
    b.cylinder(p, .023, .024, .014, x, .019, .054, color, undefined, 16);
    b.decal(p, .096, .038, x, .010, -.025, littlePlaque(name, null, { ratio: 2.5, size: 57 }), FLOOR);
  });
  b.cylinder(p, .056, .058, .018, .303, .003, .043, m.dullSteel, undefined, 24);
  b.cylinder(p, .042, .047, .036, .303, .028, .043, m.graphite, undefined, 24);
  b.box(p, .006, .002, .026, .296, .047, .034, m.cream, [0, .38, 0]);
  b.decal(p, .118, .036, .303, .013, -.038, littlePlaque('JOG', null, { ratio: 3.27, size: 62 }), FLOOR);
  b.decal(cf, .394, .063, .022, .126, .357, littlePlaque('AXIS CONTROL', 'LOCAL / STATIC DISPLAY', { ratio: 6.24, size: 45, accent: '#dfbf9e' }));

  const clip = frame(1.145, TOP + .029, .397, [0, .13, 0], F);
  b.rounded(clip, .207, .021, .267, .013, 0, 0, 0, m.ink);
  b.decal(clip, .181, .244, 0, .012, .004, sheetMap('motion'), FLOOR);
  b.rounded(clip, .098, .018, .024, .008, 0, .021, -.122, m.steel);
}

export function buildMotion(b, m) {
  b.zone('Motion Test Cell');
  walls(b, m);
  benchBase(b, m);
  const rails = track(b, m);
  carriage(b, m, rails);
  controlConsole(b, m);
}

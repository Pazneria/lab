import { books, cup, framed, grip, ledge, planter, screw, vent } from './props.js';

const halfPi = Math.PI / 2;
const up = { rx: -halfPi };

function keyboard(k, m, x, y, z) {
  k.group(x, y, z, .033, () => {
    k.box(m.gasket, 0, .010, 0, .568, .026, .191, .011);
    k.box(m.nickel, 0, .023, 0, .557, .012, .181, .007);
    for (let row = 0; row < 4; row++) {
      const width = row === 3 ? 12 : 14;
      for (let col = 0; col < width; col++) {
        const material = col === 0 || col === width - 1 ? m.green : (row === 0 ? m.greige : m.chalk);
        if (row === 3 && col >= 4 && col <= 7) continue;
        k.box(material, (col - (width - 1) * .5) * .035, .033, (row - 1.5) * .033, .029, .012, .027, .002);
      }
    }
    k.box(m.chalk, 0, .033, .0495, .134, .012, .028, .003);
    k.box(m.greenLine, .255, .031, -.073, .014, .003, .009, .001);
  });
}

function clipboard(k, m, g, x, z) {
  k.group(x, .871, z, -.17, () => {
    k.box(m.darkWood, 0, .009, 0, .327, .018, .411, .011);
    k.box(m.pages, .004, .022, .012, .294, .012, .371, .004);
    k.plane(g.manifest, .004, .0286, .012, .285, .364, up);
    k.box(m.darkMetal, .001, .033, -.174, .161, .019, .041, .007);
    k.strut(m.steel, [-.055, .046, -.157], [.057, .046, -.157], .0045);
    k.box(m.oxblood, .105, .037, .114, .172, .011, .010, .004, { ry: -.28 });
    k.box(m.bronze, .184, .037, .136, .029, .011, .010, .004, { ry: -.28 });
  });
}

function binder(k, m, x, y, z, yaw, material = m.binder) {
  k.group(x, y, z, yaw, () => {
    k.box(m.pages, 0, .024, 0, .294, .031, .225, .009);
    k.box(material, 0, .005, 0, .317, .011, .250, .006);
    k.box(material, 0, .039, 0, .317, .011, .249, .007);
    k.box(material, -.149, .022, 0, .026, .043, .25, .006);
    k.box(m.orange, -.123, .046, 0, .033, .003, .243, .002);
    k.box(m.pages, .062, .046, -.057, .122, .002, .051, .001);
    for (let i = 0; i < 3; i++) {
      k.box(m.greige, .044 + i * .007, .048, -.071 + i * .012, .064 - i * .010, .001, .001);
    }
  });
}

function watchDisplay(k, m, g) {
  k.box(m.graphite, .098, .884, .407, .341, .058, .249, .032);
  k.box(m.darkMetal, .098, .915, .407, .299, .018, .203, .016);
  k.strut(m.darkMetal, [.098, .924, .397], [.098, 1.043, .306], .033, 13);
  k.strut(m.darkMetal, [.098, 1.043, .306], [.098, 1.302, .247], .028, 13);
  k.cylinder(m.bronze, .098, 1.052, .306, .043, .076, .043, 17, { rz: halfPi });
  k.tube(m.gasket, [[.139, 1.285, .255], [.184, 1.124, .217],
    [.193, .937, .217], [.229, .867, .159]], .0065, 15, 6);
  k.cylinder(m.darkMetal, .229, .862, .159, .026, .019, .026, 15);
  const tilt = -.103;
  const z = .300;
  const y = 1.383;
  k.box(m.darkMetal, .098, y, z, 1.055, .621, .072, .030, { rx: tilt });
  k.box(m.gasket, .098, y + .004, z + .037, 1.009, .576, .024, .017, { rx: tilt });
  k.plane(g.nav, .098, y + .014, z + .050, .949, .527, { rx: tilt });
  k.box(m.greenLine, .563, 1.106, .325, .022, .005, .006, .002, { rx: tilt });
  k.box(m.bronze, .098, 1.098, .324, .110, .008, .004, .002);
  keyboard(k, m, .106, .860, .726);
  k.box(m.darkLeather, .558, .863, .705, .197, .007, .211, .012, { ry: -.09 });
  k.box(m.graphite, .573, .886, .687, .085, .045, .108, .021, { soft: true, ry: -.09 });
  k.box(m.nickel, .577, .909, .659, .013, .009, .030, .003);
}

function station(k, m, g) {
  k.group(-2.818, 0, -.74, halfPi, () => {
    k.shadow(m.ambientShadow, 0, .604, 3.84, 1.51, .011);
    k.box(m.graphite, 0, 1.399, .040, 3.75, 2.036, .091, .03);
    k.box(m.lining, 0, 1.414, .099, 3.65, 1.949, .061, .014);
    for (let i = 0; i < 4; i++) {
      const x = (i - 1.5) * .905;
      k.box(i % 3 === 0 ? m.blue : m.wovenWall, x, 1.404, .139, .888, 1.018, .027, .012);
    }
    k.box(m.darkMetal, 0, .916, .150, 3.63, .104, .039, .008);
    k.box(m.bronze, 0, 1.868, .152, 3.61, .024, .034, .007);
    k.box(m.ash, 0, 1.921, .287, 3.70, .069, .373, .018);
    k.box(m.graphite, 0, 1.873, .296, 3.32, .046, .095, .008);
    k.box(m.whiteLight, -.166, 1.847, .306, 1.96, .014, .033, .004);
    k.box(m.ash, 0, 2.357, .291, 3.72, .096, .396, .023);
    for (const x of [-1.821, -.594, .606, 1.821]) {
      k.box(m.ash, x, 2.126, .281, .071, .412, .387, .013);
    }
    k.box(m.graphite, -1.210, 2.128, .177, 1.166, .382, .174, .013);
    k.box(m.mushroom, -1.210, 2.145, .469, 1.157, .342, .060, .017);
    k.box(m.greige, -1.211, 2.174, .507, 1.122, .248, .022, .010);
    grip(k, m, -1.215, 2.024, .524, .175);
    for (const x of [-1.67, -.749]) screw(k, m, x, 2.252, .523, { size: .009 });
    books(k, m, -.463, 1.963, .350, 96, 8);
    k.box(m.blue, .239, 2.061, .325, .31, .184, .192, .019);
    k.box(m.binder, .239, 2.151, .325, .323, .026, .206, .006);
    k.box(m.pages, .239, 2.079, .425, .108, .034, .005, .002);
    for (const x of [.846, 1.348]) {
      k.box(m.greige, x, 2.061, .324, .447, .181, .226, .023);
      k.box(m.lining, x, 2.147, .324, .461, .032, .233, .008);
      k.box(m.gasket, x, 2.077, .441, .153, .051, .018, .006);
      k.box(m.pages, x, 2.080, .452, .109, .023, .004, .001);
    }

    for (const side of [-1, 1]) {
      const x = side * 1.410;
      k.box(m.graphite, x, .420, .500, .738, .771, .742, .036);
      k.box(m.gasket, x, .108, .52, .663, .139, .691, .018);
      k.box(m.lining, x, .387, .864, .684, .549, .073, .018);
      for (let i = 0; i < 3; i++) {
        const y = .261 + i * .182;
        k.box(i === 2 ? m.mushroom : m.greige, x, y, .899, .658, .166, .047, .012);
        grip(k, m, x, y + .008, .929, .161);
      }
      vent(k, m, x, .151, .875, .382, .047, 9);
    }
    k.box(m.darkMetal, 0, .365, .189, 2.22, .620, .056, .018);
    k.box(m.graphite, 0, .130, .457, 2.495, .090, .108, .022);
    k.box(m.darkMetal, 0, .165, .457, 2.482, .022, .088, .006);
    k.box(m.darkWood, 0, .786, .514, 3.66, .063, .947, .035);
    k.box(m.ash, 0, .827, .519, 3.724, .061, .978, .031);
    k.box(m.bronze, 0, .804, 1.011, 3.53, .011, .007, .002);
    k.box(m.gasket, .10, .860, .658, 1.004, .009, .570, .014);
    k.box(m.darkLeather, .10, .867, .658, .990, .006, .553, .013);
    k.block('study desk', 0, .524, 3.73, 1.00);

    watchDisplay(k, m, g);
    clipboard(k, m, g, -.732, .719);
    binder(k, m, -1.368, .858, .583, .096);
    binder(k, m, -1.404, .901, .581, -.153, m.oxblood);
    cup(k, m, -.365, .86, .344);
    k.box(m.oxblood, -.933, 1.327, .168, .565, .473, .048, .017);
    k.plane(g.littleMap, -.933, 1.327, .195, .519, .293, { rz: .026 });
    k.cylinder(m.bronze, -.782, 1.477, .207, .008, .015, .008, 8, { rx: halfPi });
    k.cylinder(m.bronze, -1.104, 1.468, .207, .008, .015, .008, 8, { rx: halfPi });
    k.box(m.pages, -1.234, 1.187, .198, .143, .101, .004, .002, { rz: -.148 });
    k.box(m.oxblood, -1.240, 1.238, .202, .051, .009, .002, 0, { rz: -.148 });
    ledge(k, m, 1.279, 1.194, .262, .846, .250, m.darkMetal);
    for (let i = 0; i < 3; i++) {
      k.box(i === 1 ? m.greige : m.blue, 1.284, 1.228 + i * .030, .262, .574, .020, .183, .005);
      k.box(m.pages, 1.365, 1.229 + i * .030, .356, .18, .009, .003);
    }

    k.box(m.nickel, 1.517, .909, .680, .490, .011, .024, .004, { ry: .24 });
    k.strut(m.gasket, [1.592, .861, .877], [1.595, .912, .748], .009);
    k.strut(m.gasket, [1.660, .862, .861], [1.595, .912, .748], .009);
    k.group(1.415, .904, .658, .241, () => {
      k.cylinder(m.pages, 0, 0, 0, .048, .495, .048, 24, { rz: halfPi });
      k.cylinder(m.gasket, .248, 0, 0, .037, .004, .037, 20, { rz: halfPi });
      k.cylinder(m.pages, .252, 0, 0, .028, .006, .028, 19, { rz: halfPi });
      k.cylinder(m.oxblood, -.103, 0, 0, .050, .028, .050, 21, { rz: halfPi });
      k.cylinder(m.oxblood, .114, 0, 0, .050, .029, .050, 21, { rz: halfPi });
    });

    const holder = [[.001, 0], [.044, 0], [.053, .009], [.061, .143], [.059, .147],
      [.053, .147], [.051, .141], [.045, .012], [.001, .010]];
    k.lathe(m.porcelain, holder, 1.677, .86, .344, 20);
    for (let i = 0; i < 6; i++) {
      const a = i / 6 * Math.PI * 2;
      const x = 1.677 + .024 * Math.cos(a), z = .344 + .019 * Math.sin(a);
      k.strut([m.nickel, m.bronze, m.oxblood][i % 3], [x, .921, z],
        [x + .022 * Math.cos(a), 1.038 + .021 * i, z + .024 * Math.sin(a)], .0047, 5);
    }
  });
}

function chair(k, m) {
  k.group(-1.455, 0, -.684, halfPi + .19, () => {
    k.shadow(m.softShadow, 0, 0, 1.09, 1.02, .012);
    k.cylinder(m.nickel, 0, .278, 0, .037, .272, .048, 13);
    k.cylinder(m.graphite, 0, .199, 0, .064, .177, .069, 14);
    k.cylinder(m.darkMetal, 0, .112, 0, .083, .072, .086, 17);
    for (let i = 0; i < 5; i++) {
      const a = i * 2 * Math.PI / 5;
      const x = .344 * Math.cos(a), z = .344 * Math.sin(a);
      k.strut(m.darkMetal, [0, .117, 0], [x, .083, z], .022, 8);
      k.strut(m.nickel, [x * .18, .136, z * .18], [x * .96, .104, z * .96], .010, 7);
      k.cylinder(m.graphite, x, .047, z, .037, .043, .037, 13, { rx: halfPi, ry: -a });
      k.cylinder(m.nickel, x, .047, z + .020, .015, .010, .015, 9, { rx: halfPi, ry: -a });
    }
    k.box(m.graphite, 0, .442, -.017, .517, .090, .513, .043, { soft: true });
    k.box(m.leather, 0, .509, -.030, .527, .112, .525, .057, { soft: true });
    k.tube(m.throwEdge, [[-.232, .529, -.248], [0, .536, -.278], [.232, .529, -.248]], .0048, 12, 5);
    for (const x of [-.180, .180]) {
      k.strut(m.darkMetal, [x, .454, .190], [x, .610, .303], .019);
      k.strut(m.darkMetal, [x, .610, .303], [x, .967, .342], .018);
      k.strut(m.bronze, [x, .669, .318], [x * .94, .925, .367], .008);
    }
    k.box(m.graphite, 0, .819, .292, .518, .460, .099, .051, { rx: .147, soft: true });
    k.box(m.leather, 0, .827, .247, .484, .414, .084, .042, { rx: .147, soft: true });
    k.box(m.darkWood, 0, .820, .347, .374, .299, .019, .008, { rx: .147 });
    k.box(m.bronze, 0, .855, .361, .130, .011, .005, .002, { rx: .147 });
    for (const x of [-.273, .273]) {
      k.strut(m.darkMetal, [x * .83, .442, .099], [x, .681, .059], .018);
      k.box(m.graphite, x, .695, .007, .081, .049, .273, .019);
      k.box(m.leather, x, .718, .007, .073, .016, .232, .007);
    }
    k.block('swivel task chair', 0, .058, .758, .745);
  });
}

function brassInstrument(k, m, x, y, z) {
  k.group(x, y, z, -.17, () => {
    k.box(m.darkWood, 0, .012, 0, .316, .025, .170, .012);
    k.box(m.bronze, 0, .026, .062, .123, .004, .020, .002);
    for (const nx of [-.11, .11]) {
      k.strut(m.darkMetal, [nx, .025, 0], [nx, .092, -.023], .009);
    }
    const arc = [];
    for (let i = 0; i <= 16; i++) {
      const a = -.20 + i * .104;
      arc.push([Math.cos(a) * .127 - .071, Math.sin(a) * .127 + .096, -.021]);
    }
    k.tube(m.bronze, arc, .009, 18, 8);
    k.strut(m.bronze, [-.071, .096, -.021], arc[0], .008);
    k.strut(m.bronze, [-.071, .096, -.021], arc[16], .009);
    k.strut(m.darkMetal, [-.071, .096, -.014], arc[9], .006);
    k.cylinder(m.nickel, -.071, .096, -.006, .016, .012, .016, 12, { rx: halfPi });
    k.cylinder(m.graphite, -.049, .223, -.018, .018, .058, .018, 14, { rz: .12 });
  });
}

function credenza(k, m, g) {
  k.group(2.825, 0, -.803, -halfPi, () => {
    k.shadow(m.ambientShadow, 0, .327, 2.94, .855, .011);
    k.box(m.gasket, 0, .121, .233, 2.61, .189, .478, .022);
    k.box(m.graphite, 0, .407, .275, 2.76, .651, .548, .034);
    k.box(m.ash, 0, .765, .298, 2.806, .091, .566, .028);
    for (let i = 0; i < 3; i++) {
      const x = (i - 1) * .899;
      k.box(i === 1 ? m.blue : m.greige, x, .477, .565, .872, .475, .057, .020);
      k.box(i === 1 ? m.lining : m.mushroom, x, .470, .600, .835, .371, .022, .011);
      grip(k, m, x, .573, .615, .153);
    }
    k.block('study credenza', 0, .297, 2.83, .63);
    k.box(m.graphite, 0, 1.599, .080, 2.77, 1.272, .118, .029);
    k.box(m.ash, 0, 1.600, .144, 2.68, 1.179, .062, .019);
    k.box(m.wovenWall, 0, 1.603, .180, 2.565, 1.067, .039, .017);
    k.box(m.darkWood, 0, 2.125, .253, 2.72, .069, .239, .011);
    k.box(m.warmLight, -.345, 2.087, .296, 1.55, .019, .024, .004);
    framed(k, m, g.littleMap, -.192, 1.582, .212, 1.422, .766, m.darkMetal);
    framed(k, m, g.coast, .838, 1.467, .210, .412, .318, m.darkWood);
    brassInstrument(k, m, .648, .813, .378);
    planter(k, m, -1.022, .809, .345, 1.18, 102);
    binder(k, m, .066, .811, .326, -.113, m.book);
    k.cylinder(m.porcelain, -.461, .823, .331, .071, .017, .069, 19);
    k.cylinder(m.bronze, -.461, .834, .331, .053, .008, .053, 16);
  });
}

export function study(k, m, g) {
  station(k, m, g);
  chair(k, m);
  credenza(k, m, g);
}

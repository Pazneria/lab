import * as T from 'three';
import { seeded } from './kit.js';
import { books, cup, framed, grip, ledge, planter, screw, vent } from './props.js';

const halfPi = Math.PI / 2;
const topDown = { rx: -halfPi };

function clothSurface(k, material, sample, nu, nv, width, depth) {
  const position = [], uv = [], index = [];
  for (let j = 0; j <= nv; j++) for (let i = 0; i <= nu; i++) {
    const u = i / nu, v = j / nv;
    position.push(...sample(u, v));
    uv.push(u * width * 4.7, v * depth * 4.7);
    if (i < nu && j < nv) {
      const a = j * (nu + 1) + i, b = a + 1, c = a + nu + 1;
      index.push(a, c, b, b, c, c + 1);
    }
  }
  const geometry = new T.BufferGeometry();
  geometry.setAttribute('position', new T.Float32BufferAttribute(position, 3));
  geometry.setAttribute('uv', new T.Float32BufferAttribute(uv, 2));
  geometry.setIndex(index);
  geometry.computeVertexNormals();
  k.geo(material, geometry);
}

const clamp01 = value => Math.max(0, Math.min(1, value));

function quiltPoint(u, v) {
  const side = (u - .5) * 2;
  const foot = clamp01((v - .89) / .11);
  const hem = clamp01((Math.abs(side) - .79) / .21);
  const top = .747 + .010 * Math.cos(u * Math.PI) + .006 * Math.sin(40 * u + v * 6.4);
  const folds = .006 * Math.cos(52 * v + u * 7.0) * (.32 + .68 * hem)
    + .004 * Math.sin(u * 83 + v * 13) * hem;
  const x = .948 * side * (1 - .04 * foot * (Math.abs(side) ** 4));
  const z = .64 + v * 1.936 + .017 * Math.sin(6.0 * u + .5) * foot - .026 * Math.abs(side) ** 3;
  const y = top + folds - Math.pow(hem, 1.66) * (.141 + .025 * Math.sin(13.2 * v + u * 4.5)) - .19 * foot ** 2.0;
  return [x, y, z];
}

function tracedSeam(k, material, sampler, from, to, r, samples = 17) {
  const points = [];
  for (let i = 0; i < samples; i++) {
    const t = i / (samples - 1);
    const p = sampler(T.MathUtils.lerp(from[0], to[0], t), T.MathUtils.lerp(from[1], to[1], t));
    p[1] += .0029;
    points.push(p);
  }
  k.tube(material, points, r, samples - 1, 5);
}

function textiles(k, m) {
  clothSurface(k, m.duvet, quiltPoint, 38, 43, 1.88, 1.94);
  tracedSeam(k, m.seam, quiltPoint, [0.017, .005], [0.017, .985], .0047, 30);
  tracedSeam(k, m.seam, quiltPoint, [.983, .005], [.983, .985], .0047, 30);
  tracedSeam(k, m.seam, quiltPoint, [.017, .984], [.983, .984], .0041, 31);
  tracedSeam(k, m.seam, quiltPoint, [.018, .022], [.982, .022], .0048, 25);
  for (let i = 1; i < 10; i++) {
    const v = i * .091 + .038;
    tracedSeam(k, m.seam, quiltPoint, [.067, v], [.934, v], .00175, 23);
  }
  for (const u of [.18, .50, .82]) {
    tracedSeam(k, m.duvet, quiltPoint, [u, .04], [u, .95], .0020, 20);
  }
  k.box(m.sheet, 0, .731, .676, 1.598, .037, .126, .017, { soft: true });

  const blanketPoint = (u, v) => {
    const surface = quiltPoint(u * .936 + .012, .606 + v * .208);
    const sway = Math.sin(u * 24 + v * 3.8);
    surface[0] -= .025 + .020 * Math.sin(v * 3);
    surface[1] += .014 + .011 * sway - .105 * clamp01((.12 - u) / .12) ** 1.6;
    surface[2] += .012 * Math.sin(u * 8.0 + 1.9);
    return surface;
  };
  clothSurface(k, m.throw, blanketPoint, 34, 15, 1.85, .42);
  for (const v of [.048, .115, .846, .931]) tracedSeam(k, m.throwEdge, blanketPoint, [0, v], [1, v], .0042, 34);
  tracedSeam(k, m.throwEdge, blanketPoint, [.009, .01], [.009, .984], .0033, 14);
  tracedSeam(k, m.throw, blanketPoint, [.985, 0], [.985, 1], .0045, 15);
  const rng = seeded(8400);
  for (let i = 0; i < 32; i++) {
    for (const edge of [0, 1]) {
      const p = blanketPoint(i / 32, edge);
      const q = [p[0] - .003 + .006 * rng(), p[1] - .011 - .011 * rng(), p[2] + (edge ? .016 : -.015)];
      k.strut(i % 4 === 0 ? m.throwEdge : m.throw, p, q, .00175, 4);
    }
  }
}

function pillow(k, m, x, y, z, w, d, r, material, edge) {
  k.group(x, y, z, r, () => {
    k.box(material, 0, 0, 0, w, .150, d, .072, { soft: true });
    const a = w * .5 - .020, b = d * .5 - .024, c = .054;
    k.tube(edge, [
      [-a + c, .013, -b], [a - c, .014, -b], [a, .007, -b + c],
      [a, .012, b - c], [a - c, .010, b], [-a + c, .006, b],
      [-a, .011, b - c], [-a, .013, -b + c]
    ], .0045, 28, 5, true);
  });
}

function berthFurniture(k, m, g) {
  k.group(-2.846, 0, 4.60, halfPi, () => {
    k.box(m.graphite, 0, 1.318, .048, 3.166, 2.27, .088, .032);
    k.box(m.darkWood, 0, 1.426, .101, 3.035, 1.846, .063, .024);
    for (let i = 0; i < 5; i++) {
      k.box(i % 2 ? m.wovenWall : m.blue, (i - 2) * .379, 1.326, .143, .369, 1.34, .053, .017);
    }
    for (const x of [-1.484, 1.484]) {
      k.box(m.ash, x, 1.286, .157, .062, 1.52, .09, .016);
      k.box(m.bronze, x, 1.292, .209, .018, 1.44, .017, .005);
    }
    k.box(m.ash, 0, 1.912, .289, 2.99, .128, .448, .045);
    k.box(m.graphite, 0, 2.168, .280, 3.03, .446, .451, .043);
    for (let i = 0; i < 3; i++) {
      const x = (i - 1) * .976;
      k.box(i === 1 ? m.chalk : m.greige, x, 2.181, .522, .965, .374, .092, .026);
      k.box(m.mushroom, x, 2.192, .572, .939, .262, .018, .013);
      grip(k, m, x, 2.067, .572, .183);
      screw(k, m, x - .414, 2.282, .583, { size: .006 });
      screw(k, m, x + .414, 2.282, .583, { size: .006 });
    }
    k.box(m.gasket, 0, 1.845, .299, 2.70, .028, .095, .007);
    k.box(m.warmLight, 0, 1.829, .299, 2.42, .015, .052, .005);
    k.box(m.darkLeather, 0, .826, .205, 1.669, .443, .139, .074, { soft: true });
    for (const x of [-.54, 0, .54]) {
      k.box(m.darkLeather, x, .839, .275, .513, .377, .033, .016);
    }
    k.box(m.ash, 0, .597, .224, 1.724, .064, .15, .013);

    k.shadow(m.ambientShadow, 0, 1.35, 2.18, 2.91, .010);
    k.box(m.gasket, 0, .133, 1.366, 1.476, .245, 2.16, .038);
    k.box(m.graphite, 0, .323, 1.351, 1.742, .307, 2.40, .076);
    k.box(m.ash, 0, .436, 1.364, 1.752, .128, 2.409, .046);
    k.box(m.darkWood, 0, .484, 1.356, 1.759, .032, 2.412, .012);
    k.box(m.pillow, 0, .586, 1.348, 1.706, .237, 2.291, .091, { soft: true });
    k.box(m.sheet, 0, .660, 1.334, 1.711, .112, 2.269, .046, { soft: true });
    k.box(m.pillowEdge, 0, .537, 1.345, 1.704, .013, 2.274, .006);
    for (const x of [-.432, .432]) {
      k.box(m.lining, x, .284, 2.549, .820, .218, .052, .029);
      k.box(m.mushroom, x, .284, 2.580, .768, .149, .020, .010);
      grip(k, m, x, .285, 2.592, .138, m.bronze);
    }
    for (const z of [.75, 1.89]) {
      k.box(m.graphite, -.88, .283, z, .028, .202, 1.107, .012);
      k.box(m.nickel, -.897, .283, z + .12, .023, .018, .23, .006);
    }
    pillow(k, m, -.418, .777, .460, .745, .440, -.075, m.pillow, m.pillowEdge);
    pillow(k, m, .387, .790, .457, .694, .463, .116, m.pillow, m.pillowEdge);
    pillow(k, m, .334, .855, .561, .415, .287, -.177, m.rustPillow, m.throwEdge);
    textiles(k, m);
    k.block('berth platform', 0, 1.356, 1.824, 2.405);

    k.box(m.rugEdge, 0, .012, 2.865, 1.98, .018, .725, .007);
    k.box(m.rug, 0, .022, 2.865, 1.927, .011, .676, .005);
    for (const z of [2.576, 2.603, 3.124, 3.151]) {
      k.box(z > 3.13 || z < 2.59 ? m.rugEdge : m.throwEdge, 0, .028, z, 1.898, .002, .009);
    }
    for (let i = 0; i < 35; i++) {
      const x = -.938 + .0545 * i;
      k.strut(m.rug, [x, .016, 3.206], [x + .003, .012, 3.230 + .009 * Math.cos(i * 1.78)], .0026, 4);
    }

    for (const side of [-1, 1]) {
      const x = side * 1.157;
      k.box(m.graphite, x, .41, .358, .620, .586, .629, .044);
      k.box(m.greige, x, .450, .687, .569, .402, .057, .019);
      k.box(m.ink, x, .164, .680, .515, .11, .039, .012);
      grip(k, m, x, .558, .723, .149);
      ledge(k, m, x, .706, .384, .632, .68);
      k.block('bedside cabinet', x, .38, .635, .715);
      k.box(m.graphite, x, 1.297, .182, .180, .189, .066, .018);
      k.box(m.nickel, x, 1.303, .220, .141, .151, .025, .013);
      k.strut(m.bronze, [x, 1.307, .229], [x, 1.303, .369], .017);
      k.strut(m.bronze, [x, 1.303, .369], [x - side * .077, 1.237, .467], .015);
      k.cylinder(m.bronze, x - side * .087, 1.184, .469, .058, .076, .089, 15, { rz: side * .19 });
      k.cylinder(m.warmLight, x - side * .083, 1.145, .469, .074, .010, .074, 15, { rz: side * .19 });
      k.box(m.gasket, x + side * .135, .984, .174, .135, .094, .037, .012);
      k.box(m.yellowLine, x + side * .159, .998, .197, .019, .011, .004, .002);
    }

    k.group(-1.145, .73, .43, -.13, () => {
      k.box(m.book, 0, .019, .006, .210, .038, .153, .007);
      k.box(m.pages, .006, .023, .008, .178, .024, .146, .003);
      k.box(m.darkWood, -.012, .043, .006, .212, .011, .157, .003);
      k.plane(g.notebook, -.012, .049, .006, .193, .142, topDown);
      k.box(m.bronze, .131, .059, -.019, .119, .013, .012, .005, { ry: -.26 });
    });
    cup(k, m, -.962, .73, .245, m.porcelain, true);
    k.group(1.159, .73, .37, .13, () => {
      k.box(m.graphite, 0, .050, 0, .235, .099, .107, .019);
      k.box(m.gasket, 0, .053, .056, .193, .063, .012, .010);
      for (let i = 0; i < 13; i++) {
        k.box(i < 7 ? m.yellowLine : m.bronze, (i - 6) * .012, .052, .064, .004, .023 + .011 * Math.cos(i * 1.5), .002);
      }
      k.cylinder(m.nickel, .06, .104, -.005, .022, .012, .022, 10);
    });
    framed(k, m, g.coast, -.310, 1.435, .191, .570, .401);
    framed(k, m, g.hills, .284, 1.478, .183, .421, .328, m.darkMetal);
    k.box(m.pages, .587, 1.265, .183, .118, .088, .004, .002, { rz: .12 });
    k.plane(g.coast, .587, 1.265, .186, .104, .072, { rz: .12 });
    k.cylinder(m.bronze, .581, 1.316, .194, .009, .014, .009, 8, { rx: halfPi });
  });
}

function wardrobe(k, m, g) {
  k.group(2.827, 0, 5.08, -halfPi, () => {
    k.shadow(m.ambientShadow, .05, .36, 3.03, 1.04, .012);
    k.box(m.graphite, 0, 1.257, .173, 2.904, 2.424, .382, .030);
    k.box(m.ash, 0, 2.433, .310, 2.913, .124, .560, .028);
    k.box(m.ash, 0, .196, .275, 2.896, .111, .493, .022);
    k.box(m.gasket, 0, .106, .204, 2.818, .197, .395, .013);
    k.box(m.darkWood, -.769, 1.335, .307, 1.256, 2.074, .084, .014);
    k.box(m.ash, -.154, 1.327, .400, .049, 2.157, .328, .014);
    k.box(m.ash, -1.414, 1.327, .397, .080, 2.171, .324, .016);
    ledge(k, m, -.786, 1.842, .420, 1.202, .335);
    ledge(k, m, -.786, .736, .447, 1.198, .405);
    ledge(k, m, -.786, .379, .447, 1.202, .405);
    k.box(m.gasket, -.789, 1.803, .455, 1.119, .027, .060, .008);
    k.box(m.warmLight, -.789, 1.787, .455, .997, .011, .028, .003);

    for (let i = 0; i < 2; i++) {
      const x = .247 + i * .745;
      k.box(m.chalk, x, 1.516, .551, .722, 1.652, .092, .027);
      k.box(i ? m.greige : m.mushroom, x, 1.544, .604, .672, 1.373, .018, .012);
      k.box(m.lining, x, .879, .606, .671, .159, .025, .011);
      k.box(m.lining, x, 2.159, .606, .671, .151, .025, .011);
      grip(k, m, x, 1.257, .619, .196);
      screw(k, m, x + .281, 2.194, .622, { size: .007 });
      screw(k, m, x - .281, 2.194, .622, { size: .007 });
      for (const y of [.351, .590]) {
        k.box(m.blue, x, y, .540, .725, .217, .10, .014);
        k.box(m.lining, x, y, .600, .675, .168, .021, .011);
        grip(k, m, x, y, .619, .182);
      }
    }
    vent(k, m, .646, 2.365, .576, 1.14, .067, 23);
    k.strut(m.nickel, [-1.366, 1.709, .417], [-.184, 1.709, .417], .016, 11);
    k.group(-.843, 1.053, .456, -.095, () => {
      const coat = m.binder;
      k.tube(m.bronze, [[0, .644, .012], [.057, .631, .006], [.053, .591, .004], [.011, .567, 0]], .0066, 10, 6);
      k.strut(m.ash, [-.242, .470, .006], [0, .583, .007], .014);
      k.strut(m.ash, [0, .583, .007], [.241, .470, .007], .014);
      k.box(coat, 0, .265, 0, .393, .556, .092, .044, { soft: true });
      for (const d of [-1, 1]) {
        k.box(coat, d * .233, .275, -.003, .137, .490, .086, .035, { rz: d * .185, soft: true });
        k.box(m.darkLeather, d * .267, .056, .002, .124, .057, .081, .015, { rz: d * .185 });
        k.box(m.lining, d * .084, .481, .052, .129, .146, .021, .01, { rz: d * .53 });
        k.box(m.lining, d * .103, .184, .049, .125, .110, .023, .012);
        k.box(m.nickel, d * .101, .224, .065, .084, .007, .004);
      }
      k.box(m.graphite, .012, .268, .049, .012, .491, .008, .003);
      for (let i = 0; i < 5; i++) k.sphere(m.bronze, .031, .098 + i * .076, .054, .006);
      k.box(m.throw, .178, .482, .062, .075, .211, .019, .010, { rz: -.088 });
      k.box(m.throwEdge, .181, .394, .075, .071, .008, .004, 0, { rz: -.088 });
    });

    k.box(m.graphite, -.776, .568, .495, .824, .289, .290, .04);
    k.box(m.blue, -.776, .568, .653, .755, .242, .025, .014);
    grip(k, m, -.776, .589, .666, .18);
    for (const x of [-1.029, -.524]) k.box(m.bronze, x, .621, .667, .055, .082, .017, .005);
    books(k, m, -.721, 1.865, .424, 34, 7);
    framed(k, m, g.snapshot, -1.063, 2.042, .421, .358, .279, m.ash, .08);
    k.block('wardrobe', 0, .317, 2.91, .687);
  });

  k.group(2.577, 0, 3.01, -halfPi, () => {
    k.shadow(m.ambientShadow, 0, .045, .96, .77);
    k.box(m.graphite, 0, .20, .07, .842, .365, .533, .057);
    k.box(m.ash, 0, .375, .10, .858, .083, .565, .035);
    k.box(m.leather, 0, .443, .101, .799, .097, .53, .043, { soft: true });
    grip(k, m, 0, .202, .358, .173);
    k.block('dressing seat', 0, .088, .860, .59);
  });

  k.group(2.800, 0, 6.929, -halfPi, () => {
    ledge(k, m, 0, 1.002, .207, .565, .420);
    planter(k, m, -.042, 1.022, .227, .92, 34);
    k.block('plant shelf', 0, .180, .565, .405);
  });
}

export function bedroom(k, m, g) {
  berthFurniture(k, m, g);
  wardrobe(k, m, g);
}

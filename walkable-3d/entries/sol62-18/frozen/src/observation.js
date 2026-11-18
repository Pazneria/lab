import * as T from 'three';
import { clipped } from './shell.js';
import { cup, framed, grip, ledge, plate, screw, vent } from './props.js';

function paneMaterial() {
  const material = new T.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    vertexShader: `
      varying vec3 vWorld;
      void main() {
        vec4 world = modelMatrix * vec4(position, 1.0);
        vWorld = world.xyz;
        gl_Position = projectionMatrix * viewMatrix * world;
      }`,
    fragmentShader: `
      varying vec3 vWorld;
      void main() {
        vec3 direction = normalize(cameraPosition - vWorld);
        float bevel = smoothstep(1.88, 2.30, abs(vWorld.x));
        bevel = max(bevel, smoothstep(.62, .89, abs(vWorld.y - 1.59)));
        float angle = pow(1.0 - clamp(direction.z, 0.0, 1.0), 2.1);
        float diagonal = vWorld.y - (2.35 + .16 * vWorld.x + .18 * direction.x);
        float reflected = exp(-diagonal * diagonal * 170.0) * .085;
        float glint = exp(-abs(diagonal + .052) * 76.0) * .045;
        float opacity = .025 + bevel * .075 + angle * .21 + reflected + glint;
        vec3 tint = mix(vec3(.052, .12, .155), vec3(.31, .43, .48), clamp(reflected * 8.0 + angle, 0.0, 1.0));
        gl_FragColor = vec4(tint, opacity);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`
  });
  material.name = 'Laminated viewport glazing';
  return material;
}

function viewport(k, m, g) {
  const wall = clipped(5.91, -.052, 2.881, .012);
  const carrier = clipped(5.49, .346, 2.706, .348, .282);
  const facing = clipped(5.217, .503, 2.600, .326, .267);
  const trim = clipped(4.970, .662, 2.532, .305, .250);
  const setback = clipped(4.822, .715, 2.497, .305, .252);
  const seal = clipped(4.686, .767, 2.459, .295, .250);
  const pressureGlazing = clipped(4.614, .786, 2.447, .283, .235);
  k.profile(m.lining, wall, carrier, -8.112, -7.85);
  k.profile(m.mushroom, carrier, facing, -7.850, -7.706);
  k.profile(m.nickel, facing, trim, -7.706, -7.737);
  k.profile(m.darkMetal, trim, setback, -7.737, -7.833);
  k.profile(m.gasket, setback, seal, -7.833, -8.065);
  k.profile(m.steel, seal, pressureGlazing, -8.065, -8.116);
  k.polygon(paneMaterial(), pressureGlazing, -8.112);

  for (const x of [-1.575, 1.586]) {
    const lean = Math.sign(x) * -.069;
    const y0 = .764, y1 = 2.474;
    const points = [[x + .060, y0], [x + lean + .049, y1],
      [x + lean - .049, y1], [x - .060, y0]];
    k.polygon(m.darkMetal, points, -8.048);
    k.strut(m.gasket, [x - .061, y0, -8.062], [x + lean - .050, y1, -8.062], .010, 7);
    k.strut(m.gasket, [x + .061, y0, -8.062], [x + lean + .050, y1, -8.062], .010, 7);
    k.strut(m.nickel, [x, y0, -8.045], [x + lean, y1, -8.045], .028, 8);
    for (const y of [.816, 2.402]) screw(k, m, x + lean * ((y - y0) / (y1 - y0)), y, -8.012, { size: .009 });
  }

  k.box(m.graphite, 0, .228, -7.925, 5.68, .443, .255, .048);
  k.box(m.darkMetal, 0, .582, -7.744, 4.82, .246, .334, .038);
  k.box(m.lining, 0, .526, -7.601, 4.74, .128, .047, .020);
  k.box(m.steel, 0, .700, -7.748, 4.681, .052, .311, .016);
  k.box(m.gasket, 0, .728, -7.766, 4.535, .012, .268, .005);
  k.box(m.coolLight, 0, .534, -7.578, 3.03, .011, .009, .003);
  k.box(m.gasket, 0, 2.571, -7.782, 3.48, .044, .070, .008);
  k.box(m.coolLight, 0, 2.554, -7.780, 3.24, .014, .024, .004);
  plate(k, m, g.glazing, .177, .425, -7.775, .772, .099);
  for (const side of [-1, 1]) {
    const x = side * 2.61;
    for (const y of [.735, 1.02, 1.41, 1.82, 2.22]) {
      screw(k, m, x - side * (y > 2.0 ? .026 : 0), y, -7.781, { size: .012, angle: side * 1.01 });
    }
    for (const dx of [.63, 1.94]) {
      screw(k, m, side * dx, 2.621, -7.788, { size: .011 });
    }
    k.box(m.graphite, side * 2.548, .266, -7.713, .456, .295, .072, .019);
    vent(k, m, side * 2.545, .260, -7.674, .345, .121, 8);
    k.box(m.bronze, side * 2.386, .622, -7.650, .026, .092, .008, .003);
  }
  for (const x of [.89, 1.53, 2.17]) {
    k.cylinder(m.graphite, x, .847, -7.757, .031, .036, .035, 13, { rx: Math.PI / 2 });
    k.strut(m.nickel, [x, .843, -7.751], [x, .824, -7.626], .0155, 10);
  }
  k.strut(m.steel, [.845, .824, -7.623], [2.213, .824, -7.623], .021, 13);
  k.sphere(m.darkMetal, .834, .824, -7.623, .019);
  k.sphere(m.darkMetal, 2.224, .824, -7.623, .019);
  k.block('window ledge', 0, -7.731, 4.83, .327);
}

function piping(k, m, x, y, z, width, depth) {
  const w = width * .5 - .020, d = depth * .5 - .021, r = .054;
  k.tube(m.seatEdge, [
    [x - w + r, y, z - d], [x + w - r, y, z - d],
    [x + w, y, z - d + r], [x + w, y, z + d - r],
    [x + w - r, y, z + d], [x - w + r, y, z + d],
    [x - w, y, z + d - r], [x - w, y, z - d + r]
  ], .0042, 28, 5, true);
}

function settee(k, m, g) {
  k.group(-2.819, 0, -6.310, Math.PI / 2, () => {
    k.shadow(m.ambientShadow, 0, .49, 3.12, 1.13, .010);
    k.box(m.graphite, 0, .178, .399, 2.63, .344, .741, .045);
    k.box(m.ash, 0, .378, .409, 2.760, .092, .824, .037);
    k.box(m.darkWood, 0, .445, .405, 2.756, .052, .781, .023);
    k.box(m.gasket, 0, .823, .116, 2.762, .732, .168, .065);
    k.box(m.ash, 0, 1.142, .130, 2.807, .077, .209, .025);
    for (let i = 0; i < 3; i++) {
      const x = (i - 1) * .881;
      k.box(m.darkLeather, x, .498, .474, .868, .135, .688, .061, { soft: true });
      piping(k, m, x, .500, .474, .865, .685);
      k.box(m.darkLeather, x, .821, .231, .870, .582, .191, .085, { rx: .154, soft: true });
      k.box(m.lining, x, .224, .779, .826, .215, .035, .017);
      grip(k, m, x, .242, .805, .173, m.darkMetal);
    }
    for (const x of [-1.354, 1.359]) {
      k.box(m.graphite, x, .642, .421, .069, .440, .744, .036);
      k.box(m.ash, x, .866, .429, .093, .059, .756, .024);
    }
    k.group(.841, .667, .482, .14, () => {
      k.box(m.rustPillow, 0, 0, 0, .386, .342, .165, .073, { rx: -.402, rz: .192, soft: true });
      k.box(m.throwEdge, .079, -.025, .086, .014, .238, .006, .002, { rx: -.402, rz: .192 });
    });
    k.block('observation settee', 0, .445, 2.79, .822);
    k.box(m.blue, -.650, 1.609, .080, 1.296, .652, .057, .020);
    framed(k, m, g.ephemeris, -.644, 1.612, .113, 1.182, .566, m.darkWood);
    k.box(m.gasket, -.633, 2.025, .119, 1.247, .051, .117, .009);
    k.box(m.coolLight, -.633, 1.998, .132, .904, .012, .038, .003);
    k.strut(m.bronze, [.235, 1.388, .108], [1.168, 1.388, .108], .013, 11);
    for (const x of [.23, 1.173]) k.strut(m.graphite, [x, 1.389, .058], [x, 1.389, .118], .020);
  });
  k.group(-2.746, 0, -4.708, Math.PI / 2, () => {
    k.shadow(m.softShadow, 0, .344, .633, .655);
    k.box(m.graphite, 0, .450, .228, .376, .634, .115, .019, { rx: .28 });
    ledge(k, m, 0, .727, .358, .574, .544);
    k.cylinder(m.ash, .016, .754, .464, .082, .014, .082, 18);
    cup(k, m, -.068, .762, .468, m.ceramic);
    k.box(m.binder, .131, .762, .284, .185, .021, .138, .007, { ry: -.188 });
    k.block('observation side table', 0, .350, .582, .560);
  });
}

function chartShelf(k, m, g) {
  k.group(2.830, 0, -6.092, -Math.PI / 2, () => {
    k.shadow(m.softShadow, .046, .258, 2.235, .726);
    k.box(m.graphite, 0, 1.247, .045, 2.078, 1.702, .086, .034);
    k.box(m.lining, 0, 1.274, .099, 1.975, 1.610, .048, .019);
    k.box(m.wovenWall, .018, 1.487, .129, 1.830, .970, .026, .014);
    k.box(m.nickel, 0, 2.026, .147, 1.895, .026, .044, .007);
    k.box(m.gasket, .038, 1.903, .208, 1.797, .054, .15, .008);
    k.box(m.coolLight, .038, 1.875, .225, 1.490, .014, .028, .004);
    framed(k, m, g.coast, -.390, 1.495, .182, .702, .503, m.ash);
    k.box(m.blue, .448, 1.405, .175, .655, .370, .032, .015);
    k.plane(g.littleMap, .448, 1.405, .194, .627, .346);
    for (const x of [.180, .717]) screw(k, m, x, 1.546, .195, { size: .007 });
    k.box(m.graphite, .015, .455, .196, 1.961, .698, .385, .032);
    k.box(m.ash, .015, .827, .218, 2.013, .054, .434, .025);
    k.box(m.gasket, .012, .834, .412, 1.939, .022, .024, .005);
    for (const x of [-.469, .484]) {
      k.box(m.greige, x, .465, .416, .918, .486, .056, .023);
      k.box(m.lining, x, .494, .447, .874, .311, .024, .015);
      grip(k, m, x, .574, .464, .147);
    }
    k.block('observation chart cabinet', 0, .234, 2.034, .483);
    k.box(m.pages, .341, .867, .277, .251, .011, .173, .002, { ry: -.21 });
    k.plane(g.hills, .341, .873, .277, .224, .146, { rx: -Math.PI / 2, ry: -.21 });
    k.box(m.bronze, .572, .871, .186, .136, .011, .009, .003, { ry: .416 });
    k.cylinder(m.ceramic, -.506, .865, .234, .108, .019, .102, 24);
    k.cylinder(m.porcelain, -.506, .875, .234, .090, .013, .09, 24);
  });
}

export function observation(k, m, g) {
  settee(k, m, g);
  chartShelf(k, m, g);
  viewport(k, m, g);
}

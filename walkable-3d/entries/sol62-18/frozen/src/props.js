import { seeded } from './kit.js';

const quarter = Math.PI / 2;

export function screw(k, m, x, y, z, spec = {}) {
  const material = spec.material ?? m.nickel;
  const size = spec.size ?? 0.011;
  k.cylinder(material, x, y, z, size, 0.007, size, 8, { rx: quarter });
  k.box(m.gasket, x, y, z + 0.004, size * 0.94, 0.0025, 0.0017, 0, { rz: spec.angle ?? 0.43 });
}

export function plate(k, m, face, x, y, z, width, height) {
  k.box(m.darkMetal, x, y, z, width + 0.016, height + 0.014, 0.016, 0.006);
  k.plane(face, x, y, z + 0.0088, width, height);
}

export function framed(k, m, picture, x, y, z, width, height, material = m.darkWood, tilt = 0) {
  const frame = 0.018;
  const mat = 0.026;
  const rx = -tilt;
  k.box(material, x, y, z, width, height, 0.032, 0.007, { rx });
  k.box(m.pages, x, y - 0.017 * Math.sin(rx), z + 0.017 * Math.cos(rx),
    width - frame * 2, height - frame * 2, 0.004, 0, { rx });
  k.plane(picture, x, y - 0.020 * Math.sin(rx), z + 0.020 * Math.cos(rx),
    width - (frame + mat) * 2, height - (frame + mat) * 2, { rx });
}

export function ledge(k, m, x, y, z, width, depth, material = m.ash) {
  k.box(m.gasket, x, y + 0.008, z - 0.034, width + 0.011, 0.041, depth, 0.01);
  k.box(material, x, y, z, width, 0.039, depth, 0.011);
  k.box(m.darkMetal, x, y - 0.012, z + depth * 0.49, width - 0.035, 0.012, 0.012, 0.003);
}

export function vent(k, m, x, y, z, width, height, slots = 8) {
  k.box(m.ink, x, y, z, width, height, 0.017, 0.010);
  const stride = (width - 0.05) / slots;
  for (let i = 0; i < slots; i++) {
    k.box(m.nickel, x + (i + 0.5 - slots * 0.5) * stride, y, z + 0.009,
      0.007, height - 0.022, 0.008, 0.0013, { rz: -0.15 });
  }
}

export function grip(k, m, x, y, z, width, material = m.nickel) {
  k.box(m.gasket, x, y, z, width + 0.022, 0.047, 0.018, 0.009);
  k.box(material, x, y + 0.010, z + 0.012, width, 0.014, 0.026, 0.005);
}

export function cup(k, m, x, y, z, ceramic = m.ceramic, hasTea = true) {
  const profile = [[0.002, 0], [0.039, 0], [0.043, .008], [0.047, .023], [0.05, .09],
    [0.049, .095], [0.044, .095], [0.043, .087], [0.039, .024], [0.035, .013], [.001, .013]];
  k.lathe(ceramic, profile, x, y, z, 20);
  if (hasTea) k.cylinder(m.tea, x, y + 0.076, z, 0.042, 0.004, 0.042, 22);
  k.tube(ceramic, [[x + .044, y + .074, z], [x + .068, y + .081, z],
    [x + .079, y + .066, z], [x + .073, y + .040, z], [x + .045, y + .026, z]], .007, 12, 7);
}

export function books(k, m, x, y, z, seed, count = 5) {
  const rng = seeded(seed);
  let u = x;
  for (let i = 0; i < count; i++) {
    const w = 0.034 + rng() * 0.034, h = 0.136 + rng() * 0.098, d = 0.106 + rng() * .036;
    const cover = [m.book, m.binder, m.oxblood, m.green, m.ash][i % 5];
    k.box(m.pages, u + w * .5, y + h * .5, z, w - .007, h - .009, d - .011, .003);
    for (const edge of [-1, 1]) {
      k.box(cover, u + w * .5 + edge * (w * .5 - .0015), y + h * .5, z, .003, h, d, .001);
    }
    k.box(cover, u + w * .5, y + h * .5, z + d * .5 - .004, w, h, .012, .004);
    k.box(i % 2 ? m.greige : m.bronze, u + w * .5, y + h * .71, z + d * .5 + .0025, w - .009, .009, .0012);
    u += w + .003;
  }
}

export function planter(k, m, x, y, z, scale = 1, seed = 752) {
  const rng = seeded(seed);
  const s = scale;
  const rot = rng();
  const profile = [[.001, 0], [.075 * s, 0], [.087 * s, .018 * s], [.103 * s, .133 * s],
    [.099 * s, .142 * s], [.090 * s, .142 * s], [.087 * s, .131 * s], [.079 * s, .056 * s], [.002, .054 * s]];
  k.lathe(m.ceramic, profile, x, y, z, 24);
  k.cylinder(m.soil, x, y + .117 * s, z, .089 * s, .007, .089 * s, 19);
  for (let i = 0; i < 13; i++) {
    const a = i / 13 * 2 * Math.PI + rot + (rng() - .5) * .4;
    const length = (.13 + rng() * .16) * s, height = (.25 + rng() * .19) * s;
    const end = [x + Math.cos(a) * length, y + height, z + Math.sin(a) * length];
    const center = [x + Math.cos(a) * length * .54, y + height * .84, z + Math.sin(a) * length * .54];
    k.tube(m.foliage2, [[x + Math.cos(a) * .016, y + .13 * s, z + Math.sin(a) * .016], center, end], .0032 * s, 6, 5);
    for (let leaf = 0; leaf < 3; leaf++) {
      const sign = leaf % 2 ? -1 : 1;
      const t = 0.53 + 0.18 * leaf;
      const theta = a + sign * (.38 + rng() * .46);
      const px = x + Math.cos(a) * length * t;
      const pz = z + Math.sin(a) * length * t;
      const py = y + .11 * s + (height - .1 * s) * (1 - (1 - t) ** 2);
      const l = s * (.044 + rng() * .042);
      const ux = Math.cos(theta) * l, uz = Math.sin(theta) * l;
      const vx = Math.sin(theta) * l * .36, vz = -Math.cos(theta) * l * .36;
      const outline = [[px, py, pz], [px + ux * .46 + vx, py + .01, pz + uz * .46 + vz],
        [px + ux, py + .008, pz + uz], [px + ux * .49 - vx, py + .015, pz + uz * .49 - vz]];
      const material = m['foliage' + ((leaf + i) % 3)];
      k.quad(material, outline);
      k.quad(material, outline, true);
    }
  }
}

export function fixture(k, m, x, y, z, width, depth, source, material = m.graphite) {
  k.box(material, x, y + .021, z, width + .052, .050, depth + .052, .012);
  k.box(m.gasket, x, y + .002, z, width + .019, .032, depth + .015, .006);
  k.box(source, x, y - .012, z, width, .012, depth, .004);
}

import * as THREE from 'three';
import { grid, lerp, material, PI, rng, sampleLine, TAU, texture } from './geometry.js';
import { carpet, placard, print, star } from './materials.js';

export function frame(world, x, y, z, yaw = 0) {
  const c = Math.cos(yaw), s = Math.sin(yaw);
  const at = (u, h, v) => [x + c * u + s * v, y + h, z - s * u + c * v];
  return {
    at,
    box: (u, h, v, w, dh, d, mat, options = {}) =>
      world.box(...at(u, h, v), w, dh, d, mat, { ...options, ry: (options.ry || 0) + yaw }),
    plane: (u, h, v, w, dh, mat, options = {}) =>
      world.plane(...at(u, h, v), w, dh, mat, { ...options, ry: (options.ry || 0) + yaw }),
    shape: (points, u, h, v, thickness, mat, options = {}) =>
      world.shape(points, ...at(u, h, v), thickness, mat, { ...options, ry: (options.ry || 0) + yaw }),
    sphere: (u, h, v, a, b, d, mat, options = {}, segments = 16) =>
      world.sphere(...at(u, h, v), a, b, d, mat, { ...options, ry: (options.ry || 0) + yaw }, segments),
    cylinder: (u, h, v, a, b, height, mat, options = {}, segments = 18) =>
      world.cyl(...at(u, h, v), a, b, height, mat, { ...options, ry: (options.ry || 0) + yaw }, segments),
    torus: (u, h, v, a, b, mat, options = {}, length = TAU, segments = 32) =>
      world.torus(...at(u, h, v), a, b, mat, { ...options, ry: (options.ry || 0) + yaw }, length, segments),
    tube: (points, radius, mat, closed = false, segments = undefined, cast = false) =>
      world.tube(points.map(point => at(...point)), radius, mat, closed, segments, cast),
    link: (a, b, radius, mat, segments = 6, cast = false) =>
      world.link(at(...a), at(...b), radius, mat, segments, cast),
    put: (geo, mat, u = 0, h = 0, v = 0, options = {}) =>
      world.put(geo, mat, ...at(u, h, v), { ...options, ry: (options.ry || 0) + yaw }),
  };
}

export function drawer(f, p, x, y, z, width, height) {
  f.box(x, y, z, width, height, .042, p.oak);
  f.box(x, y, z + .024, width - .066, height - .061, .023, p.walnut);
  f.box(x, y + .022, z + .039, .153, .057, .022, p.brassDark);
  f.torus(x, y + .003, z + .057, .042, .007, p.brass, { rz: PI }, PI, 16);
  for (const sign of [-1, 1]) f.sphere(x + sign * .055, y + .022, z + .054, .011, .011, .008, p.gold);
}

export function book(f, p, x, y, z, width, height, depth, cover, tilt = 0) {
  f.box(x, y + height / 2, z, width, height - .014, depth, p.paper, { ry: tilt });
  f.box(x, y + .006, z, width + .022, .012, depth + .018, cover, { ry: tilt });
  f.box(x, y + height - .006, z, width + .022, .012, depth + .018, cover, { ry: tilt });
  f.box(x - width / 2, y + height / 2, z, .018, height, depth + .013, cover, { ry: tilt });
}

export function sewingSpool(f, p, x, y, z, radius, height, name, tilt = null) {
  const sf = tilt ? tilt : f;
  sf.cylinder(x, y + height * .5, z, radius * .78, radius * .79, height * .79, p.cloth(name, 'silk'), {}, 14);
  sf.cylinder(x, y + .007, z, radius, radius, .014, p.birch, {}, 16);
  sf.cylinder(x, y + height - .007, z, radius, radius, .014, p.birch, {}, 16);
  sf.cylinder(x, y + height + .0003, z, radius * .27, radius * .27, .0016, p.dark, {}, 10);
  for (let i = 1; i <= 4; i++) {
    sf.torus(x, y + height * i / 5, z, radius * .782, .0014, p.cloth(name, 'silk'), { rx: -PI / 2 }, TAU, 12);
  }
}

export function foldedCloth(f, p, x, y, z, width, depth, height, color, type, phase = 0) {
  const half = width * .5, slab = p.cloth(color, type);
  const position = (u, t) => {
    const theta = TAU * t + PI / 2;
    const wave = Math.sin(u * TAU * 2.4 + phase) * .010 + Math.cos(u * TAU * 1.1) * .009;
    const edge = Math.sin(theta) * (1 + Math.abs(Math.cos(theta)) * .19);
    const reach = Math.sign(edge) * Math.abs(edge) ** .37;
    const up = Math.sign(Math.cos(theta)) * Math.abs(Math.cos(theta)) ** .74;
    return [
      x + lerp(-half, half, u) + .014 * Math.sin(u * PI) * Math.cos(theta),
      y + height * .52 + up * height * .45 + wave * Math.sin(theta) * .54,
      z + depth * .5 * reach + wave * Math.sin(theta) ** 4,
    ];
  };
  const main = grid(17, 22, position, (u, t) => [u * 1.03, t * 1.24]);
  f.put(main, slab, 0, 0, 0, { cast: true });
  for (const col of [0, 1]) {
    f.put(grid(1, 22, (s, t) => {
      const [px, py, pz] = position(col, t);
      return [px, lerp(y + height / 2, py, s), lerp(z, pz, s)];
    }), slab);
  }
  if (height > .043) {
    for (const t of [.035, .978]) {
      f.tube(sampleLine(u => position(u, t), 12), .00235, p.cloth(color, 'silk'), false, 16);
    }
  }
}

function clipped(w, d, notch = .17) {
  const x = w / 2, y = d / 2;
  return [[-x + notch, -y], [x - notch, -y], [x, -y + notch], [x, y - notch],
    [x - notch, y], [-x + notch, y], [-x, y - notch], [-x, -y + notch]];
}

function designRug(world, p, x, z, w, d, long = false, yaw = 0) {
  world.box(x, .007, z, w - .017, .014, d - .012, p.rail, { ry: yaw });
  world.plane(x, .0151, z, w, d, carpet(p.renderer, long), { rx: -PI / 2, rz: yaw });
  const f = frame(world, x, .011, z, yaw);
  for (const edge of [-1, 1]) {
    for (let i = 0; i <= Math.floor(w / .032); i++) {
      const xx = -.5 * w + i * .032;
      f.link([xx, 0, edge * (d / 2 - .003)], [xx + .006, -.002, edge * (d / 2 + .038 + .012 * Math.sin(i * 2.9))],
        .003, i % 4 ? p.brassDark : p.kraft, 4);
    }
  }
}

export function fittingDais(world, p, x, z) {
  designRug(world, p, x + .22, z + .18, 4.21, 3.37);
  for (const [y, w, d, depth, mat] of [
    [.022, 2.67, 2.16, .031, p.dark],
    [.052, 2.58, 2.06, .055, p.walnut],
    [.106, 2.53, 2.01, .044, p.oak],
  ]) {
    world.shape(clipped(w, d), x, y, z, depth, mat, { rx: -PI / 2, cast: true });
  }
  const rim = clipped(2.40, 1.889, .14).map(([u, v]) => [x + u, .153, z - v]);
  for (let i = 0; i < rim.length; i++) world.link(rim[i], rim[(i + 1) % rim.length], .006, p.brass, 5);

  for (let k = -3; k <= 3; k++) {
    const xx = x + k * .285 + .142;
    world.link([xx, .1511, z - .93], [xx, .1511, z + .93], .0028, p.darkOak, 4);
  }
  const med = frame(world, x, .151, z);
  med.torus(0, .002, 0, .30, .0055, p.brass, { rx: -PI / 2 }, TAU, 48);
  med.torus(0, .002, 0, .36, .004, p.brassDark, { rx: -PI / 2 }, TAU, 46);
  for (let i = 0; i < 8; i++) {
    med.shape([[0, .32], [-.030, .076], [0, .015], [.030, .076]], 0, .001, 0, .002,
      i % 2 ? p.brassDark : p.brass, { rx: -PI / 2, rz: i * PI / 4 });
  }
  world.step(x, z, 2.56, 2.04, .15);
}

function mirror(world, p, x, z, yaw) {
  const f = frame(world, x, 0, z, yaw);
  const silhouette = [[-.54, .31], [.54, .31], [.60, 1.11], [.58, 2.08], [.45, 2.35],
    [.24, 2.51], [0, 2.55], [-.24, 2.51], [-.45, 2.35], [-.58, 2.08], [-.60, 1.11]];
  f.shape(silhouette, 0, 0, -.055, .10, p.walnut, { cast: true });
  const bezel = silhouette.map(([u, v]) => [u * .935, 1.42 + (v - 1.42) * .952]);
  f.shape(bezel, 0, 0, .046, .026, p.brass);
  const surface = silhouette.map(([u, v]) => [u * .862, 1.42 + (v - 1.42) * .917]);
  f.shape(surface, 0, 0, .074, .01, p.mirror);
  const map = texture(256, 512, (ctx, w, h) => {
    const gradient = ctx.createLinearGradient(0, 0, w, h);
    gradient.addColorStop(0, '#bacac3');
    gradient.addColorStop(.55, '#758e86');
    gradient.addColorStop(1, '#536d63');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#e1e9cb59';
    ctx.beginPath();
    ctx.moveTo(31, 0);
    ctx.lineTo(88, 0);
    ctx.lineTo(w, h * .62);
    ctx.lineTo(w, h * .79);
    ctx.fill();
    ctx.fillStyle = '#e4eee18d';
    ctx.beginPath();
    ctx.moveTo(71, 0);
    ctx.lineTo(86, 0);
    ctx.lineTo(w, h * .64);
    ctx.lineTo(w, h * .68);
    ctx.fill();
  }, p.renderer);
  const reflective = material('#ffffff', .4, { map, metalness: .11 });
  const dat = new THREE.Shape();
  surface.forEach(([u, v], i) => i === 0 ? dat.moveTo(u, v) : dat.lineTo(u, v));
  const glass = new THREE.ShapeGeometry(dat);
  const pos = glass.getAttribute('position'), uv = glass.getAttribute('uv');
  for (let i = 0; i < uv.count; i++) uv.setXY(i, (pos.getX(i) + .52) / 1.04, (pos.getY(i) - .37) / 2.13);
  f.put(glass, reflective, 0, 0, .087);
  for (const sign of [-1, 1]) {
    f.box(sign * .56, .158, -.071, .094, .29, .14, p.darkOak, { cast: true });
    f.box(sign * .56, .057, -.07, .155, .11, .52, p.walnut, { cast: true });
    f.link([sign * .47, .16, -.35], [sign * .48, 1.4, -.07], .031, p.darkOak, 8, true);
    f.sphere(sign * .52, 1.23, .070, .037, .037, .014, p.brass);
  }
  f.torus(0, 2.677, .009, .08, .012, p.brass);
  f.sphere(0, 2.59, .023, .048, .07, .038, p.brass);
  world.blockCircle(x, z - .03, .51);
}

function settee(world, p, x, z) {
  const f = frame(world, x, 0, z, -PI / 2);
  const velvet = p.cloth('wine', 'velvet'), piping = p.cloth('ochre', 'silk');
  for (const u of [-1.00, 1.00]) {
    for (const v of [-.28, .27]) {
      f.cylinder(u, .18, v, .069, .041, .33, p.darkOak, { cast: true }, 12);
      f.cylinder(u, .038, v, .046, .044, .048, p.brassDark, {}, 12);
    }
  }
  f.box(0, .32, -.01, 2.40, .17, .74, p.walnut, { cast: true });
  f.box(0, .405, -.01, 2.42, .054, .79, p.darkOak, { cast: true });
  f.shape([[-1.21, .38], [1.21, .38], [1.17, .88], [.95, 1.06], [.53, 1.095],
    [0, 1.17], [-.53, 1.095], [-.95, 1.06], [-1.17, .88]], 0, 0, -.35, .115, p.walnut, { cast: true });
  f.put(grid(35, 12, (u, t) => {
    const v = u * 2 - 1, high = 1.12 - .25 * Math.abs(v) ** 6;
    const tuft = Math.sin(u * PI * 9) ** 2 * Math.sin(t * PI * 3) ** 2;
    return [v * 1.16, lerp(.449, high, t), -.232 + Math.sin(t * PI) * (.075 + tuft * .026)];
  }, (u, t) => [u * 2.2, t * .8]), velvet, 0, 0, 0, { cast: true });
  f.tube(sampleLine(u => [(u * 2 - 1) * 1.16, 1.12 - .25 * Math.abs(u * 2 - 1) ** 6, -.229], 22), .009,
    piping, false, 28);
  for (let i = 0; i < 3; i++) {
    const u = (i - 1) * .748;
    f.sphere(u, .467, .012, .41, .112, .398, velvet, { cast: true }, 24);
    f.torus(u, .468, .012, .375, .008, piping, { rx: -PI / 2, sy: .99 }, TAU, 42);
  }
  for (const side of [-1, 1]) {
    f.tube([[side * 1.11, .83, -.24], [side * 1.16, .83, -.05],
      [side * 1.18, .75, .15], [side * 1.15, .66, .30], [side * 1.13, .44, .27]], .055, p.walnut);
    f.sphere(side * 1.14, .709, .274, .067, .068, .073, p.oak);
    f.sphere(side * .90, .581, -.135, .22, .109, .232, p.cloth('paprika', 'brocade'), { rz: side * .3 });
  }
  for (let i = 1; i < 8; i++) f.sphere(lerp(-1.18, 1.18, i / 8), .737, -.111, .013, .016, .011, p.brass);
  world.block(x, z, .93, 2.48);
}

function fittingConsole(world, p) {
  const x = 3.66, z = 2.02, f = frame(world, x, 0, z);
  for (const u of [-.92, .92]) {
    for (const v of [-.24, .24]) f.box(u, .28, v, .084, .55, .084, p.darkOak, { cast: true });
  }
  f.box(0, .68, 0, 1.98, .35, .59, p.walnut, { cast: true });
  drawer(f, p, -.477, .68, .308, .93, .273);
  drawer(f, p, .477, .68, .308, .93, .273);
  f.box(0, .86, 0, 2.12, .076, .70, p.waxedOak, { cast: true });
  f.box(0, .814, 0, 2.01, .027, .63, p.darkOak);
  f.box(0, .185, 0, 1.98, .047, .56, p.oak);
  book(f, p, .54, .902, -.068, .38, .056, .34, p.cloth('navy', 'linen'), .17);
  book(f, p, .56, .958, -.057, .32, .043, .29, p.cloth('garnet', 'linen'), -.05);
  foldedCloth(f, p, -.62, .90, -.03, .48, .42, .059, 'flax', 'stripe', 1.3);
  foldedCloth(f, p, -.60, .961, -.04, .44, .37, .054, 'peacock', 'silk', 1.1);
  f.put(grid(10, 6, (u, v) => [lerp(-.23, .23, u), .904 + .016 * Math.cos(u * PI) * (1 - v), lerp(-.13, .19, v)], undefined, true),
    print(p.renderer, '#68483a', 256, 192, (ctx, w) => {
      ctx.font = '22px Georgia';
      ctx.fillText('First fitting', 24, 39);
      ctx.font = '13px Georgia';
      ctx.fillText('Winter audience · coat and mantle', 24, 67, w - 44);
      for (let i = 0; i < 4; i++) ctx.fillRect(22, 90 + i * 18, 210 - i * 17, 1);
    }));
  f.link([-.22, .922, .18], [.20, .923, .13], .005, p.kraft, 8);
  world.block(x, z, 2.14, .72);
}

function clothesStand(world, p, x, z) {
  const f = frame(world, x, 0, z);
  for (let i = 0; i < 3; i++) {
    const a = i * TAU / 3;
    f.tube([[0, .22, 0], [Math.sin(a) * .23, .10, Math.cos(a) * .23],
      [Math.sin(a) * .32, .035, Math.cos(a) * .32]], .034, p.walnut, false, 12, true);
  }
  f.cylinder(0, 1.06, 0, .041, .060, 1.85, p.darkOak, { cast: true });
  f.cylinder(0, 1.76, 0, .066, .067, .08, p.walnut);
  f.sphere(0, 2.013, 0, .065, .085, .065, p.brass);
  for (let i = 0; i < 5; i++) {
    const a = i * TAU / 5;
    const u = .20 * Math.sin(a), v = .20 * Math.cos(a);
    f.tube([[0, 1.73, 0], [u * .64, 1.67, v * .64], [u, 1.77, v], [u, 1.84, v]], .017, p.brassDark);
    f.sphere(u, 1.844, v, .024, .024, .024, p.brass);
  }
  world.blockCircle(x, z, .24);
}

export function pendant(world, p, x, z, bottom, size = 1, arms = 4) {
  const f = frame(world, x, bottom, z);
  f.cylinder(0, 4.045 - bottom, 0, .137, .105, .064, p.brassDark);
  f.cylinder(0, (4.045 - bottom + .25) * .5, 0, .013, .013, 4.045 - bottom - .25, p.brassDark);
  f.cylinder(0, .13, 0, .059, .089, .25, p.brassDark);
  f.sphere(0, .0, 0, .072, .071, .072, p.brass);
  for (let i = 0; i < arms; i++) {
    const a = TAU * i / arms + PI / 4, reach = .36 * size;
    const u = Math.sin(a) * reach, v = Math.cos(a) * reach;
    f.tube([[0, .056, 0], [u * .43, -.04, v * .43], [u, .01, v], [u, .138, v]], .018, p.brassDark, false, 14);
    f.cylinder(u, .116, v, .080 * size, .048 * size, .063, p.brass);
    f.cylinder(u, .201, v, .050 * size, .067 * size, .136, p.lamp, {}, 12);
    f.torus(u, .27, v, .050 * size, .007, p.brass, { rx: -PI / 2 }, TAU, 20);
    f.sphere(u, .275, v, .024, .019, .024, p.wax);
  }
}


function courtBanner(world, p) {
  const f = frame(world, -3.66, 0, 1.52);
  const map = texture(384, 576, (ctx, w, h) => {
    const thread = rng(383);
    ctx.fillStyle = '#263e49';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#795047';
    ctx.fillRect(19, 0, w - 38, 103);
    ctx.fillRect(19, 449, w - 38, 127);
    ctx.strokeStyle = '#b78955';
    ctx.lineWidth = 3;
    ctx.strokeRect(18, 18, w - 36, h - 39);
    ctx.strokeRect(28, 27, w - 56, h - 58);
    ctx.strokeStyle = '#ddbc81';
    ctx.lineWidth = 2;
    ctx.strokeRect(24, 23, w - 48, h - 50);
    ctx.fillStyle = '#d2aa6c';
    for (let i = 0; i < 6; i++) {
      const x = 62 + i * 52;
      star(ctx, x, 65, i % 2 ? 16 : 10, 4, .28);
      ctx.fill();
      star(ctx, x, 491, i % 2 ? 10 : 17, 4, .29);
      ctx.fill();
    }

    const center = [w / 2, 268];
    ctx.strokeStyle = '#c29a58';
    ctx.lineWidth = 4;
    for (const [a, b, rot] of [[116, 97, .28], [118, 48, -.39], [118, 48, .39]]) {
      ctx.beginPath();
      ctx.ellipse(...center, a, b, rot, 0, TAU);
      ctx.stroke();
    }
    ctx.fillStyle = '#e4c086';
    star(ctx, ...center, 62, 8, .25);
    ctx.fill();
    ctx.fillStyle = '#89664c';
    star(ctx, ...center, 31, 4, .18);
    ctx.fill();
    for (const [x, y, r] of [[111, 194, 8], [276, 350, 10], [285, 212, 7], [100, 333, 7]]) {
      ctx.fillStyle = '#e7c986';
      ctx.beginPath();
      ctx.arc(x, y, r, 0, TAU);
      ctx.fill();
      ctx.fillStyle = '#f1dcb1';
      star(ctx, x, y, r * 2.0, 4, .19);
      ctx.fill();
    }
    ctx.fillStyle = '#e2c387';
    ctx.font = '700 17px Georgia';
    ctx.textAlign = 'center';
    ctx.fillText('WARDROBE OF THE COURT', w / 2, 416);
    for (let y = 0; y < h; y += 3) {
      ctx.fillStyle = '#f7d6a218';
      ctx.fillRect(0, y, w, 1);
    }
    for (let i = 0; i < 6800; i++) {
      ctx.fillStyle = i % 2 ? '#fff3cf19' : '#100d211d';
      ctx.fillRect(thread() * w, thread() * h, 2, 1);
    }
  }, p.renderer);
  const cloth = material('#ffffff', .91, { map, side: THREE.DoubleSide });
  const point = (s, t) => {
    const edge = 2 * Math.abs(s - .5);
    return [lerp(-.528, .528, s) * (1 - .055 * t), 3.371 - 1.60 * t + .24 * edge * t ** 7,
      .080 + .021 * Math.sin(s * TAU * 2.1 + t) * Math.sin(t * PI * .89) + .014 * t * Math.cos(s * TAU)];
  };
  f.put(grid(28, 27, point, (s, t) => [s, 1 - t]), cloth, 0, 0, 0, { cast: true });
  f.link([-.67, 3.383, .068], [.67, 3.383, .068], .018, p.brassDark, 12);
  f.tube(sampleLine(s => point(s, 1), 23), .0032, p.brass, false, 28);
  for (const side of [-1, 1]) f.sphere(side * .676, 3.383, .068, .032, .045, .040, p.brass);
  for (let i = 1; i < 8; i++) {
    f.torus((i - 4) * .133, 3.376, .068, .024, .0037, p.brass, { ry: PI / 2 }, TAU, 16);
  }
}

export function buildFittingRoom(world, p) {
  world.zone = 'fitting-center';
  fittingDais(world, p, -2.30, 4.74);
  mirror(world, p, -4.40, 3.05, .92);
  courtBanner(world, p);
  pendant(world, p, -.41, 5.36, 3.26, 1.22, 5);

  world.zone = 'fitting-furniture';
  settee(world, p, 4.48, 5.60);
  fittingConsole(world, p);
  clothesStand(world, p, 4.77, 3.53);

  const f = frame(world, 2.46, 0, 6.58, .35);
  f.cylinder(0, .445, 0, .077, .106, .64, p.walnut, { cast: true });
  f.cylinder(0, .092, 0, .245, .296, .12, p.darkOak, { cast: true });
  f.cylinder(0, .789, 0, .342, .315, .059, p.birch, { cast: true }, 37);
  f.cylinder(0, .747, 0, .306, .310, .045, p.darkOak, {}, 33);
  book(f, p, -.018, .820, -.024, .35, .046, .25, p.cloth('ink', 'brocade'), .22);
  book(f, p, -.039, .866, -.009, .29, .032, .213, p.cloth('brown', 'linen'), -.18);
  f.cylinder(.13, .892, .045, .044, .048, .082, p.bronze);
  f.torus(.173, .902, .045, .023, .006, p.bronze, {}, TAU, 16);
  world.blockCircle(2.46, 6.58, .35);
}


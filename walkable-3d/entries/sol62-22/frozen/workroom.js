import * as THREE from 'three';
import { grid, lerp, material, PI, rng, sampleLine, TAU, texture } from './geometry.js';
import { book, drawer, foldedCloth, frame, sewingSpool } from './furnishings.js';
import { FORM } from './commission.js';
import { placard, print, star } from './materials.js';

function drafting(ctx, w, h) {
  ctx.globalAlpha = .24;
  for (let x = 15; x < w; x += 18) ctx.fillRect(x, 11, 1, h - 23);
  for (let y = 11; y < h; y += 18) ctx.fillRect(15, y, w - 31, 1);
  ctx.globalAlpha = 1;
  ctx.strokeRect(12, 10, w - 24, h - 20);
}

function garmentStudy(p) {
  return print(p.renderer, '#59413b', 480, 552, (ctx, w, h) => {
    drafting(ctx, w, h);
    ctx.font = '30px Georgia';
    ctx.fillText('Winter audience', 36, 57);
    ctx.font = '15px Georgia';
    ctx.fillText('STATE COAT  •  FRONT AND BACK STUDY', 35, 79);
    const person = (x, y, reverse) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.beginPath();
      ctx.moveTo(-18, 22);
      ctx.lineTo(-16, -1);
      ctx.quadraticCurveTo(-35, 4, -62, 25);
      ctx.lineTo(-76, 122);
      ctx.lineTo(-60, 164);
      ctx.lineTo(-38, 158);
      ctx.quadraticCurveTo(-42, 101, -33, 73);
      ctx.lineTo(-23, 117);
      ctx.quadraticCurveTo(-34, 196, -53, 283);
      ctx.quadraticCurveTo(0, 305, 53, 283);
      ctx.quadraticCurveTo(34, 196, 23, 117);
      ctx.lineTo(33, 73);
      ctx.quadraticCurveTo(42, 101, 38, 158);
      ctx.lineTo(60, 164);
      ctx.lineTo(76, 122);
      ctx.lineTo(62, 25);
      ctx.quadraticCurveTo(35, 4, 16, -1);
      ctx.lineTo(18, 22);
      ctx.closePath();
      ctx.fillStyle = reverse ? '#536b6b55' : '#325b605e';
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      if (reverse) {
        ctx.moveTo(-61, 26);
        ctx.quadraticCurveTo(-66, 144, 0, 198);
        ctx.quadraticCurveTo(68, 143, 61, 27);
        ctx.moveTo(-15, 2);
        ctx.bezierCurveTo(-24, -38, 49, -42, 21, 7);
      } else {
        ctx.moveTo(-17, 6);
        ctx.quadraticCurveTo(-32, 36, 3, 105);
        ctx.moveTo(16, 6);
        ctx.quadraticCurveTo(34, 36, 2, 105);
        ctx.moveTo(3, 104);
        ctx.quadraticCurveTo(-12, 193, -17, 291);
        ctx.moveTo(6, 116);
        ctx.quadraticCurveTo(12, 197, 20, 292);
      }
      ctx.stroke();
      ctx.fillStyle = '#986a41';
      for (const [px, py, r] of [[-22, 223, 9], [20, 223, 8], [0, 155, reverse ? 14 : 4]]) {
        star(ctx, px, py, r);
        ctx.fill();
      }
      ctx.restore();
    };
    ctx.lineWidth = 2;
    person(130, 158, false);
    person(346, 158, true);
    ctx.font = '16px Georgia';
    ctx.fillText('Baste the right lapel in silk', 33, 487);
    ctx.fillText('Reduce sweep at the centre back', 33, 512);
    ctx.font = 'italic 16px Georgia';
    ctx.fillText('Wardrobe of the Meridian Court', w - 241, 532);
  }, '#dac39d');
}

function laidPattern(f, p, outline, u, y, v, yaw, title, width, depth, tint = '#d8b991') {
  const shape = new THREE.Shape();
  outline.forEach(([x, y], i) => i === 0 ? shape.moveTo(x, y) : shape.lineTo(x, y));
  shape.closePath();
  const geo = new THREE.ShapeGeometry(shape);
  const position = geo.getAttribute('position'), uv = geo.getAttribute('uv');
  for (let i = 0; i < position.count; i++) {
    const x = position.getX(i), z = position.getY(i);
    position.setZ(i, .0054 * Math.sin(x * 13 + z * 9) + .007 * Math.cos(z * 11) * Math.abs(x / width));
    uv.setXY(i, x / width + .5, z / depth + .5);
  }
  geo.computeVertexNormals();
  const mat = print(p.renderer, '#6d4a3c', 384, 384, (ctx, w, h) => {
    drafting(ctx, w, h);
    ctx.font = 'bold 27px Georgia';
    ctx.fillText(title, 58, 192, w - 95);
    ctx.font = '17px Georgia';
    ctx.fillText('LEFT SIDE • SEAM ALLOWANCE', 54, 219, w - 95);
    ctx.setLineDash([7, 4]);
    ctx.beginPath();
    ctx.moveTo(36, 258);
    ctx.quadraticCurveTo(w * .54, 303, w - 35, 242);
    ctx.moveTo(w * .50, 47);
    ctx.lineTo(w * .47, h - 38);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(w * .46, 71);
    ctx.lineTo(w * .50, 45);
    ctx.lineTo(w * .52, 69);
    ctx.stroke();
  }, tint);
  f.put(geo, mat, u, y, v, { rx: -PI / 2, rz: yaw });
}

function shears(world, f, p, at, yaw) {
  const s = frame(world, ...f.at(...at), yaw);
  for (const side of [-1, 1]) {
    const blade = [[side * -.009, -.047], [side * .024, -.002], [side * .059, .201],
      [side * .037, .199], [side * .014, .096], [side * -.009, .026]];
    s.shape(blade, 0, side * .0025, 0, .0045, p.steel, { rx: -PI / 2 });
    s.link([side * .035, .0066, -.19], [side * -.002, .0066, -.016], .0022, p.darkSteel, 5);
    s.torus(side * .055, .008, .088, .044, .0081, p.darkSteel, { rx: -PI / 2, sx: .78, sy: 1.11 },
      TAU, 28);
    s.tube([[side * .015, .005, -.006], [side * .024, .007, .035], [side * .039, .008, .070]],
      .010, p.darkSteel, false, 13);
  }
  s.cylinder(0, .0096, .0006, .0115, .013, .008, p.brass, {}, 18);
  s.box(0, .0141, .001, .013, .0017, .0034, p.brassDark, { ry: -.32 });
}

function chalkSet(f, p, rngSeed) {
  const random = rng(rngSeed);
  f.shape([[-.039, -.027], [.041, -.026], [.020, .034], [-.016, .044]], .518, .968, .300, .012,
    p.chalk, { rx: -PI / 2, rz: .31 });
  for (let i = 0; i < 28; i++) {
    f.sphere(.526 + (random() - .5) * .138, .965, .318 + (random() - .5) * .131,
      .001 + random() * .002, .0016, .0022, p.chalk, {}, 7);
  }
  f.shape([[-.024, -.015], [.028, -.015], [.013, .018], [-.012, .024]], .620, .967, .348, .008,
    p.blueInk, { rx: -PI / 2, rz: -.13 });
}

function tapeMeasure(f, p) {
  const ink = texture(1024, 64, (ctx, w, h) => {
    ctx.fillStyle = '#dab173';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#5a3c35';
    ctx.fillRect(0, 4, w, 2);
    ctx.fillRect(0, h - 6, w, 2);
    ctx.font = '700 18px Georgia';
    for (let i = 0; i < 62; i++) {
      const x = i * w / 62;
      ctx.fillRect(x, 7, i % 5 ? 1 : 2, i % 5 ? 12 : 22);
      if (i % 5 === 0) ctx.fillText(String(i + 21), x - 5, 50);
    }
  }, p.renderer);
  const mat = material('#ffffff', .78, { map: ink, side: THREE.DoubleSide });
  const path = (s, t) => {
    const end = Math.max(0, (s - .82) / .18), a = s * TAU * 1.84 + 1.13;
    const r = .034 + .145 * s;
    return [-.885 + r * Math.cos(a) + end * .247 +
      .015 * (t - .5) * Math.sin(a), .966 + Math.max(0, (.88 - s) * .056) +
      .008 * Math.sin(s * TAU * 1.35) - .105 * end ** 2 + (t - .5) * .021 * (1 - end * .82),
      .360 + r * Math.sin(a) + end * .153 + .024 * (t - .5) * Math.cos(a)];
  };
  f.put(grid(80, 3, path, (s, t) => [s, t]), mat, 0, 0, 0, { cast: true });
  for (const t of [.02, .98]) f.tube(sampleLine(s => path(s, t), 42), .0011, p.brassDark, false, 54);
  const [x, y, z] = path(1, .5);
  f.box(x, y, z, .021, .013, .011, p.brass);
}

function pinTray(f, p) {
  const x = .940, y = .968, z = -.370;
  f.cylinder(x, y + .022, z, .126, .102, .046, p.bronze, {}, 25);
  f.cylinder(x, y + .044, z, .107, .109, .003, p.darkOak, {}, 25);
  f.torus(x, y + .050, z, .115, .009, p.brass, { rx: -PI / 2 }, TAU, 29);
  const random = rng(97);
  for (let i = 0; i < 18; i++) {
    const a = random() * TAU, r = random() * .082;
    const u = x + Math.sin(a) * r, v = z + Math.cos(a) * r, size = .007 + random() * .008;
    f.cylinder(u, y + .049 + .004 * (i % 3), v, size, size * .94, .005,
      i % 3 ? p.brass : p.darkSteel, { rz: a * .1 }, 12);
    f.cylinder(u, y + .053 + .004 * (i % 3), v, size * .21, size * .21, .002,
      p.ink, { rz: a * .1 }, 8);
  }
  f.cylinder(x - .25, .984, z + .075, .063, .067, .031, p.walnut, {}, 24);
  f.sphere(x - .25, 1.004, z + .075, .061, .040, .060, p.cloth('garnet', 'velvet'), { cast: true }, 22);
  for (let i = 0; i < 13; i++) {
    const a = i * 2.11, rad = .020 + .025 * random();
    const u = x - .25 + Math.sin(a) * rad, v = z + .075 + Math.cos(a) * rad;
    const b = [u + .022 * Math.sin(a), 1.055 + random() * .030, v + .021 * Math.cos(a)];
    f.link([u, 1.020, v], b, .0015, p.steel);
    f.sphere(...b, .0060, .0064, .0060, i % 3 ? p.pinHead : p.moonGlass, {}, 10);
  }
}

function taskLamp(f, p) {
  const x = -1.19, z = -.487;
  f.cylinder(x, .984, z, .122, .139, .050, p.brassDark, { cast: true }, 26);
  f.cylinder(x, 1.015, z, .108, .111, .019, p.brass, {}, 24);
  f.cylinder(x, 1.068, z, .033, .042, .106, p.bronze);
  f.tube([[x, 1.091, z], [x - .011, 1.270, z - .037], [x + .04, 1.488, z - .046],
    [x + .24, 1.594, z + .009], [x + .365, 1.548, z + .052]],
  .020, p.brassDark, false, 27, true);
  for (const [u, h, v] of [[x + .04, 1.488, z - .046], [x + .24, 1.594, z + .009]]) {
    f.sphere(u, h, v, .031, .034, .031, p.brass, {}, 16);
    f.cylinder(u, h, v + .034, .013, .013, .016, p.gold, { rx: PI / 2 }, 13);
  }
  const u = x + .386, v = z + .090;
  f.cylinder(u, 1.489, v, .054, .154, .110, p.rail, { rz: .12, cast: true }, 31);
  f.cylinder(u + .006, 1.430, v, .140, .142, .010, p.lamp, { rz: .12 }, 32);
  f.torus(u + .006, 1.426, v, .151, .006, p.brass, { rx: -PI / 2, ry: -.12 }, TAU, 32);
  return f.at(u + .015, 1.410, v + .014);
}

function tabletop(world, f, p) {
  const backing = p.cloth('navy', 'linen');
  f.put(grid(19, 11, (s, t) => {
    const u = lerp(-.68, .655, s), v = lerp(-.52, .42, t);
    return [u + .017 * Math.sin(t * PI) * Math.cos(s * TAU), .969 + .006 * Math.sin(s * TAU * 1.33) ** 2 * Math.sin(t * PI),
      v + .024 * Math.sin(s * PI * 1.8) * t ** 4];
  }, (s, t) => [s * 2.8, t * 2], true), backing, 0, 0, 0, { cast: true });
  const parts = [
    [[-.32, -.28], [-.24, -.42], [.23, -.41], [.27, -.10], [.213, .145],
      [.030, .29], [-.151, .33], [-.18, .20], [-.31, .07]],
    [[-.206, -.21], [-.212, .061], [-.170, .170], [-.087, .223], [.023, .211],
      [.071, .145], [.214, .082], [.238, -.163], [.175, -.227]],
  ];
  laidPattern(f, p, parts[0], -.195, .985, -.071, -.10, 'Front skirt', .69, .89);
  laidPattern(f, p, parts[1], .208, .996, -.202, .39, 'Collar stay', .51, .56, '#b89f7e');

  const cloth = p.cloth('paprika', 'silk');
  const drop = (s, t) => {
    const hang = Math.max(0, (t - .57) / .43);
    return [lerp(.729, 1.410, s) + .060 * Math.sin(t * PI) * s,
      .975 + .047 * Math.sin(s * TAU * 2.09 + t * 2.4) * (.26 + hang * .58) - .438 * hang ** 1.58,
      .016 + .925 * t - .186 * hang ** 2 + .056 * Math.sin(s * TAU * 1.31) * t ** 2];
  };
  f.put(grid(27, 28, drop, (u, t) => [u * 1.2, t * 1.52], true), cloth, 0, 0, 0, { cast: true });
  f.tube(sampleLine(s => drop(s, 1), 23), .0034, p.raw, false, 33);
  f.tube(sampleLine(t => drop(.04, t), 20), .003, p.cloth('ochre', 'silk'), false, 29);
  const cutoff = (s, t) => [lerp(.63, 1.090, s) + .050 * t,
    .984 + .014 * Math.sin(s * TAU + t * 1.3) * Math.sin(t * PI), -.27 + .35 * t - .104 * s];
  f.put(grid(16, 10, cutoff, undefined, true), p.cloth('ink', 'brocade'), 0, 0, 0, { cast: true });
  foldedCloth(f, p, 1.253, .977, -.323, .346, .31, .065, 'indigo', 'brocade', 2.4);

  shears(world, f, p, [.22, 1.014, .171], -PI / 2 + .27);
  chalkSet(f, p, 81);
  tapeMeasure(f, p);
  pinTray(f, p);
  for (const [u, z, rad, h, name] of [
    [-.75, -.37, .053, .098, 'salmon'], [-.63, -.436, .036, .083, 'lichen'],
    [-.89, -.271, .043, .105, 'ink'], [-.708, -.236, .038, .065, 'flax'],
  ]) sewingSpool(f, p, u, .963, z, rad, h, name);


  f.tube([[-.75, 1.052, -.37], [-.73, 1.021, -.311], [-.667, .974, -.262],
    [-.586, .974, -.263], [-.531, .974, -.200], [-.550, .974, -.171]], .00145, p.raw, false, 27);
  for (let ring = 0; ring < 3; ring++) {
    const wire = sampleLine(t => {
      const a = lerp(-.88, 5.78, t) + ring * .28, r = .068 + ring * .011;
      return [1.288 + Math.sin(a) * r, .970 + .006 * ring + t * .006, .487 + Math.cos(a) * r];
    }, 28);
    f.tube(wire, .0029, ring === 1 ? p.gold : p.brass, false, 33);
  }
  f.cylinder(-.999, .996, -.204, .019, .023, .055, p.brass, {}, 16);
  for (let row = 0; row < 5; row++) {
    for (let i = 0; i < 9; i++) {
      const a = TAU * (i + .5 * (row % 2)) / 9;
      const u = -.999 + Math.sin(a) * .0217, v = -.204 + Math.cos(a) * .0217;
      f.sphere(u, .977 + row * .008, v, .00165, .0018, .0016, p.brassDark, {}, 7);
    }
  }
  f.box(-.04, .974, .452, 1.05, .012, .049, p.birch, { ry: -.061 });
  for (let i = 0; i < 51; i++) {
    const u = -.55 + i * .020;
    f.box(u, .9804, .445 + (i - 25) * .00118, .0009, .001, i % 5 === 0 ? .026 : .014, p.ink, { ry: -.061 });
  }
  f.sphere(-.517, .982, .438, .021, .008, .019, p.brassDark);
  f.sphere(.474, .982, .478, .021, .008, .019, p.brass);
  f.link([-1.334, .967, .329], [-1.247, 1.098, .321], .0055, p.darkSteel, 8);
  f.link([-1.334, .967, .329], [-1.170, .966, .410], .0055, p.darkSteel, 8);
  f.sphere(-1.334, .972, .329, .017, .010, .017, p.brass);
  return taskLamp(f, p);
}

function bench(world, p) {
  const x = 3.25, z = -9.23;
  const f = frame(world, x, 0, z, -PI / 2);
  const width = 3.10, depth = 1.25;
  for (const u of [-1.344, 1.344]) {
    for (const v of [-.468, .468]) {
      f.box(u, .471, v, .156, .91, .158, p.walnut, { cast: true });
      f.box(u, .083, v, .164, .122, .166, p.darkOak);
      f.box(u, .684, v, .164, .190, .166, p.darkOak);
      f.sphere(u, .681, v + .082, .022, .022, .011, p.brassDark);
    }
    f.box(u, .25, 0, .085, .085, 1.02, p.darkOak, { cast: true });
  }
  for (const v of [-.469, .469]) {
    f.box(0, .733, v, 2.70, .223, .109, p.walnut, { cast: true });
    f.box(0, .209, v, 2.70, .078, .11, p.darkOak, { cast: true });
  }
  f.box(0, .872, 0, width - .058, .116, depth - .058, p.darkOak, { cast: true });
  for (let board = 0; board < 5; board++) {
    f.box(0, .927, (board - 2) * depth / 5, width, .071, depth / 5 - .003,
      board % 3 ? p.waxedOak : p.birch, { cast: true });
  }
  for (const u of [-.911, 0, .911]) drawer(f, p, u, .765, .544, .86, .174);
  f.box(0, .258, -.018, 2.63, .055, .985, p.oak, { cast: true });
  foldedCloth(f, p, -.918, .286, .081, .580, .61, .111, 'garnet', 'linen', 2.34);
  foldedCloth(f, p, -.911, .397, .076, .537, .598, .085, 'fog', 'stripe', 1.37);
  book(f, p, .055, .285, -.014, .549, .063, .641, p.cloth('brown', 'linen'), -.08);
  book(f, p, .035, .348, .008, .489, .073, .579, p.cloth('lichen', 'linen'), .12);
  f.box(.913, .402, -.063, .567, .223, .581, p.darkOak, { cast: true });
  f.box(.913, .523, -.063, .597, .050, .612, p.walnut);
  f.torus(.910, .423, .238, .053, .008, p.brass, {}, PI, 20);
  world.block(x, z, 1.36, 3.12);
  return tabletop(world, f, p);
}

function wallPatterns(world, p) {
  const x = 0, z = -13.52, f = frame(world, x, 0, z);
  f.box(0, 2.29, .00, 2.306, 1.57, .129, p.darkOak, { cast: true });
  f.box(0, 2.29, .077, 2.207, 1.46, .041, p.kraft);
  f.box(0, 3.106, .041, 2.331, .075, .183, p.walnut, { cast: true });
  f.box(0, 1.49, .041, 2.331, .070, .183, p.walnut, { cast: true });
  f.plane(-.395, 2.284, .104, .973, 1.188, garmentStudy(p), { rz: -.024 });
  for (const [u, y] of [[-.830, 2.85], [.038, 2.82], [-.824, 1.74], [.052, 1.745]]) {
    f.sphere(u, y, .114, .012, .012, .007, p.brass, {}, 9);
  }
  const small = print(p.renderer, '#685043', 272, 336, (ctx, w, h) => {
    drafting(ctx, w, h);
    ctx.font = '21px Georgia';
    ctx.fillText('Collar ribs', 27, 37);
    for (const arc of [70, 88, 104]) {
      ctx.beginPath();
      ctx.ellipse(w * .5, h * .61, arc, arc * 1.18, 0, PI, TAU);
      ctx.stroke();
    }
    for (let i = 0; i < 8; i++) {
      const a = PI + i * PI / 7, x = w * .5 + Math.cos(a) * 98, y = h * .61 + Math.sin(a) * 120;
      ctx.beginPath();
      ctx.moveTo(w * .5, h * .62);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
    ctx.font = '13px Georgia';
    ctx.fillText('Gold wire over cotton stays', 27, h - 39);
  }, '#c7aa88');
  f.plane(.656, 2.462, .107, .552, .714, small, { rz: .068 });
  f.sphere(.633, 2.807, .114, .013, .013, .009, p.brass, {}, 10);
  f.sphere(.687, 2.139, .114, .012, .012, .008, p.brass, {}, 10);
  f.plane(.684, 1.875, .103, .48, .30,
    placard(p.renderer, 'Workshop folio', 'MERIDIAN WARDROBE  •  WINTER', 'tan'), { rz: -.045 });

  f.box(0, .519, .331, 2.27, .922, .713, p.darkOak, { cast: true });
  f.box(0, .985, .329, 2.44, .106, .794, p.walnut, { cast: true });
  f.box(0, 1.044, .327, 2.38, .018, .778, p.waxedOak);
  f.box(0, .096, .318, 2.31, .176, .719, p.rail, { cast: true });
  for (let k = 0; k < 4; k++) drawer(f, p, 0, .220 + k * .194, .704, 2.141, .158);
  book(f, p, .74, 1.053, .368, .527, .084, .42, p.cloth('navy', 'linen'), .11);
  book(f, p, .77, 1.145, .365, .456, .065, .395, p.cloth('flax', 'linen'), -.065);
  foldedCloth(f, p, -.730, 1.057, .373, .51, .51, .090, 'peacock', 'brocade', .66);
  f.box(-.097, 1.069, .43, .41, .027, .42, p.paper, { ry: .204 });
  f.box(-.063, 1.083, .45, .31, .003, .42, p.kraft, { ry: -.095 });
  world.block(x, z + .328, 2.45, .82);
}

function workshopStool(world, p) {
  const x = 3.28, z = -6.32;
  const f = frame(world, x, 0, z);
  for (let i = 0; i < 3; i++) {
    const a = i * TAU / 3 + .21;
    f.link([Math.sin(a) * .246, .045, Math.cos(a) * .246],
      [Math.sin(a) * .152, .561, Math.cos(a) * .152], .039, p.walnut, 14, true);
    f.sphere(Math.sin(a) * .248, .045, Math.cos(a) * .248, .042, .041, .042, p.darkOak);
  }
  f.torus(0, .226, 0, .207, .021, p.darkOak, { rx: -PI / 2 }, TAU, 28);
  f.cylinder(0, .565, 0, .281, .258, .072, p.walnut, { cast: true }, 32);
  f.sphere(0, .607, 0, .263, .070, .263, p.cloth('wine', 'velvet'), { cast: true }, 31);
  f.torus(0, .610, 0, .261, .0055, p.brass, { rx: -PI / 2 }, TAU, 34);
  world.blockCircle(x, z, .29);
}

function offcuts(world, p) {
  const x = -4.52, z = -11.68;
  const f = frame(world, x, 0, z, PI / 2);
  for (const u of [-.77, .77]) {
    f.cylinder(u, .706, 0, .043, .053, 1.372, p.darkOak, { cast: true });
    f.box(u, .059, 0, .125, .11, .55, p.walnut, { cast: true });
    f.sphere(u, 1.409, 0, .054, .057, .054, p.brass);
  }
  f.link([-.80, 1.343, 0], [.80, 1.343, 0], .028, p.birch, 15, true);
  f.link([-.80, .284, 0], [.80, .284, 0], .028, p.walnut, 12, true);
  for (const [i, col, mat, left, len] of [
    [0, 'cream', 'linen', -.637, .85], [1, 'ink', 'brocade', -.198, .93], [2, 'salmon', 'silk', .316, .58],
  ]) {
    const fn = (s, t) => [left + .445 * s + .026 * Math.sin(t * PI) * Math.sin(s * PI),
      1.357 - len * t + (.013 + t * .055) * Math.sin(s * TAU * 1.31 + i) * t ** 2,
      .028 + .039 * Math.cos(s * TAU * (i ? 2.7 : 1.7) - t * 1.58) * Math.sin(t * PI * .97) +
      .089 * Math.sin(t * PI * .9)];
    f.put(grid(18, 24, fn, (s, t) => [s, t * 1.31]), p.cloth(col, mat), 0, 0, 0, { cast: true });
    f.tube(sampleLine(s => fn(s, 1), 14), .0024, p.cloth(col, 'silk'), false, 21);
  }
  world.block(x, z, .59, 1.75);
}

function workPendant(world, p) {
  const f = frame(world, FORM.x - .30, 0, FORM.z + .12);
  f.cylinder(0, 4.032, 0, .106, .100, .098, p.brassDark);
  f.cylinder(0, 3.742, 0, .015, .015, .53, p.brassDark);
  f.cylinder(0, 3.456, 0, .091, .05, .076, p.brass);
  f.cylinder(0, 3.306, 0, .094, .278, .251, p.rail, { cast: true }, 38);
  f.cylinder(0, 3.181, 0, .275, .275, .017, p.brass, {}, 38);
  f.cylinder(0, 3.167, 0, .245, .245, .011, p.lamp, {}, 34);
  f.sphere(0, 3.158, 0, .103, .021, .103, p.wax, {}, 20);
  return f.at(0, 3.12, 0);
}

export function buildWorkroom(world, p) {
  world.zone = 'work-bench';
  const benchLight = bench(world, p);
  workshopStool(world, p);
  world.zone = 'work-storage';
  wallPatterns(world, p);
  offcuts(world, p);
  world.zone = 'work-overhead';
  const outfitLight = workPendant(world, p);
  return { benchLight, outfitLight };
}


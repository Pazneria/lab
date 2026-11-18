import * as T from 'three';
import { decalMaterial, nail, rng } from './model.js';
import { bottle, clothRoll, crate, lantern, mug, printedLabel, spool, tin } from './goods.js';
import { hatch } from './wagon.js';

function canopy(b, p, c, contact) {
  const awning = decalMaterial(1024, 512, (ctx, w, h) => {
    const stripes = ['#c59971', '#a75943', '#e6d0a1', '#a45b48', '#e7d1a4', '#a15846',
      '#e6cf9d', '#a55a46', '#e5d1a6', '#a75945', '#c99a74'];
    for (let i = 0; i < stripes.length; i++) {
      const x = i * w / stripes.length;
      const cw = w / stripes.length;
      ctx.fillStyle = stripes[i];
      ctx.fillRect(x, 0, cw + 1, h);
      const gl = ctx.createLinearGradient(x, 0, x + cw, 0);
      gl.addColorStop(0, '#53371f28');
      gl.addColorStop(.18, '#fff9d80a');
      gl.addColorStop(.58, '#fff9d815');
      gl.addColorStop(.89, '#fff9c600');
      gl.addColorStop(1, '#643b2930');
      ctx.fillStyle = gl;
      ctx.fillRect(x, 0, cw, h);
      ctx.strokeStyle = '#f9e5ac78';
      ctx.lineWidth = 1.4;
      ctx.setLineDash([3, 5]);
      ctx.beginPath(); ctx.moveTo(x + 2, 0); ctx.lineTo(x + 2, h); ctx.stroke();
    }
    ctx.setLineDash([]);
    const rand = rng(87381);
    for (let i = 0; i < 16000; i++) {
      ctx.fillStyle = i % 3 ? '#251d1a17' : '#fff2d42d';
      ctx.fillRect(rand() * w, rand() * h, 1 + rand() * 4, 1);
    }
  });
  awning.side = T.DoubleSide;
  const lo = .20, hi = 3.02, width = hi - lo;
  const shape = (u, v) => [
    lo + u * width,
    3.323 - v * .424 - Math.sin(Math.PI * v) * .042 - v * .021 * Math.sin(u * Math.PI * 11) ** 2,
    1.471 + v * 1.74,
  ];
  b.grid(awning, 44, 16, shape);
  b.grid(awning, 66, 5, (u, v) => {
    const [x, y, z] = shape(u, 1);
    const scallop = Math.sin((u * 11 % 1) * Math.PI) ** .70;
    return [x, y - v * (.093 + .081 * scallop), z + v * .025 - .013 * Math.sin(u * 17 * Math.PI) * v];
  });
  const edging = Array.from({length: 67}, (_, i) => {
    const u = i / 66;
    const [x, y, z] = shape(u, 1);
    return [x, y - .093 - .081 * Math.sin((u * 11 % 1) * Math.PI) ** .70, z + .025 - .013 * Math.sin(u * 17 * Math.PI)];
  });
  b.curvedRod(p.flax, edging, .013, true, false);
  b.box(p.spruce, 1.606, 3.225, 1.468, 2.79, .091, .12);
  b.box(p.iron, 1.606, 3.323, 1.482, 2.78, .032, .055);
  b.rod(p.timber, [.225, 2.874, 3.204], [2.992, 2.874, 3.204], .065, .050);
  for (const x of [.295, 1.13, 2.078, 2.922]) {
    const u = (x - lo) / width;
    const pts = Array.from({length: 11}, (_, i) => {
      const [xx, yy, zz] = shape(u, i / 10);
      return [xx, yy - .031, zz];
    });
    b.curvedRod(p.ochre, pts, .047, false);
    b.cylinder(p.brassDark, x, 3.266, 1.552, .024, .024, .090, 'x', 12);
    b.box(p.blackIron, x, 3.237, 1.499, .102, .065, .024);
    nail(b, p, x, 3.244, 1.518, .012);
  }
  for (const x of [.295, 2.922]) {
    b.box(p.darkWood, x, .038, 3.197, .23, .079, .245, .04);
    b.cylinder(p.iron, x, .096, 3.197, .06, .06, .100, 'y', 10);
    b.box(p.timber, x, 1.350, 3.197, .079, 2.524, .085);
    b.box(p.timberLight, x, 2.635, 3.197, .063, .452, .066);
    b.box(p.blackIron, x, 2.377, 3.199, .091, .103, .10);
    b.cylinder(p.brass, x, 2.395, 3.265, .016, .016, .036, 'z', 10);
    b.box(p.iron, x, 2.778, 3.198, .100, .062, .103);
    b.rod(p.timber, [x, 2.397, 3.197], [x, 2.951, 2.552], .052, .052);
    b.rod(p.iron, [x, 2.875, 1.499], [x, 3.176, 2.059], .024, .035);
    for (const [y, z] of [[2.397, 3.197], [2.951, 2.552], [2.875, 1.499], [3.176, 2.059]]) {
      b.cylinder(p.brassDark, x, y, z, .025, .025, .068, 'x', 10);
    }
    b.plane(contact, x, .013, 3.197, .52, .45, -Math.PI / 2);
    c.rect(x - .071, x + .071, 3.121, 3.271, 0, 2.89);
  }
  b.rod(p.iron, [.308, 2.804, 3.197], [.481, 2.736, 3.152], .024, .024, true);
  b.torus(p.blackIron, .493, 2.685, 3.150, .046, .006, 'z', 16);
  lantern(b, p, .494, 2.434, 3.148, .95, true);
}

function counter(b, p, c, contact) {
  const [lo, hi] = [hatch.lo, hatch.hi];
  const x = (lo + hi) / 2;
  const w = hi - lo;
  const z = 1.96, y = 1.479;
  for (const at of [lo - .027, hi + .027]) {
    b.box(p.trim, at, 2.350, 1.435, .086, 1.729, .185);
    b.box(p.timber, at, 2.344, 1.308, .065, 1.729, .112);
    b.box(p.spruce, at, 2.350, 1.537, .025, 1.641, .016);
    for (const yy of [1.59, 3.108]) nail(b, p, at, yy, 1.55, .013);
  }
  b.box(p.trim, x, 3.192, 1.433, w + .09, .083, .181);
  b.box(p.darkWood, x, y - .057, z, w + .11, .099, 1);
  for (let i = 0; i < 6; i++) b.box(i % 3 === 0 ? p.warmPly : p.honey, x, y - .012,
    1.481 + (i + .5) * .974 / 6, w + .06, .052, .974 / 6 - .004);
  for (const edge of [lo - .028, hi + .028]) b.box(p.endgrain, edge, y - .020, z, .055, .092, .999);
  b.box(p.ochre, x, y - .057, 2.46, w + .09, .106, .059);
  b.box(p.tealDeep, x, y - .107, 2.443, w + .057, .074, .057);
  b.box(p.trim, x, y - .104, 2.477, w + .044, .013, .012);
  for (const xx of [lo + .37, hi - .37]) {
    b.box(p.iron, xx, y + .020, 1.553, .157, .016, .234);
    b.box(p.iron, xx, y - .074, 1.422, .157, .157, .023);
    b.cylinder(p.brassDark, xx, y + .012, 1.448, .027, .026, .198, 'x', 12);
    for (const zz of [1.505, 1.617]) nail(b, p, xx, y + .036, zz, .012, 'y');
    b.box(p.iron, xx, .801, 1.473, .131, .12, .061);
    b.rod(p.timber, [xx, .804, 1.485], [xx, 1.375, 2.339], .079, .081);
    b.rod(p.ironLight, [xx, .828, 1.478], [xx, .988, 1.725], .028, .093);
    b.box(p.iron, xx, 1.371, 2.337, .148, .073, .106);
    b.cylinder(p.brassDark, xx, 1.366, 2.338, .028, .027, .184, 'x');
  }
  for (const xx of [lo + .128, hi - .145]) {
    b.rod(p.endgrain, [xx, .047, 2.423], [xx, 1.397, 2.363], .073, .081);
    b.box(p.blackIron, xx, .085, 2.421, .090, .13, .096);
    b.box(p.timberLight, xx, .035, 2.42, .165, .069, .176);
    b.cylinder(p.iron, xx, 1.336, 2.369, .024, .024, .099, 'x', 10);
    b.plane(contact, xx, .010, 2.42, .39, .41, -Math.PI / 2);
  }
  c.rect(lo - .055, hi + .055, 1.48, 2.486, .073, y + .035);

  b.box(p.timber, 2.479, 1.881, 1.105, .794, .045, .416);
  for (const xx of [2.173, 2.803]) b.rod(p.spruce, [xx, 1.862, .963], [xx, 1.465, 1.270], .056);
  c.rect(2.063, 2.886, .888, 1.32, 1.46, 1.92);
  mug(b, p, 2.834, 1.904, 1.157, .87);
}

function stallWares(b, p) {
  const y = 1.494;
  const trayX = .804, trayZ = 2.157;
  b.box(p.darkWood, trayX, y + .013, trayZ, .745, .029, .342);
  for (const dz of [-.178, .178]) b.box(p.timberLight, trayX, y + .048, trayZ + dz, .756, .071, .031);
  for (const dx of [-.369, -.117, .127, .369]) b.box(p.honey, trayX + dx, y + .047, trayZ, .028, .073, .332);
  b.plane(printedLabel('Thread', 'Linen · cotton'), trayX, y + .051, trayZ + .195, .210, .058);
  for (const [dx, dz, s, i] of [[-.28, .039, 1.26, 0], [-.201, -.073, .88, 3], [-.036, .088, 1.09, 1],
    [.050, -.027, 1.20, 2], [.228, .036, 1.43, 4], [.278, -.071, .83, 3]]) {
    spool(b, p, trayX + dx, y + .029, trayZ + dz, s, p.cloth[i]);
  }
  const balanceX = 1.592, balanceZ = 1.958;
  b.box(p.wine, balanceX, y + .044, balanceZ, .39, .088, .239);
  b.box(p.honey, balanceX, y + .09, balanceZ, .416, .039, .262);
  b.cylinder(p.brassDark, balanceX, y + .143, balanceZ, .031, .055, .081);
  b.cylinder(p.brass, balanceX, y + .244, balanceZ, .015, .028, .18);
  b.rod(p.brass, [balanceX - .206, y + .293, balanceZ], [balanceX + .205, y + .338, balanceZ], .018, .019, true);
  b.oval(p.brass, balanceX, y + .335, balanceZ, .024, .018, .020);
  for (const sign of [-1, 1]) {
    const xx = balanceX + .185 * sign;
    const yTop = y + .315 + .021 * sign;
    const panY = yTop - .137;
    b.cylinder(p.brassDark, xx, panY, balanceZ, .098, .068, .018, 'y', 20);
    b.torus(p.brass, xx, panY + .011, balanceZ, .092, .0056, 'y', 20);
    for (let i = 0; i < 3; i++) {
      const a = i * 2 * Math.PI / 3;
      b.rod(p.ironLight, [xx, yTop, balanceZ], [xx + Math.sin(a) * .085, panY + .01, balanceZ + Math.cos(a) * .085],
        .0048, .0048, true, false);
    }
  }
  b.cylinder(p.blackIron, balanceX + .201, y + .212, balanceZ, .027, .030, .027, 'y', 8);
  b.cylinder(p.brassDark, 1.433, y + .015, 2.188, .021, .025, .028, 'y', 8);
  b.cylinder(p.blackIron, 1.498, y + .021, 2.245, .024, .029, .041, 'y', 8);
  tin(b, p, 2.138, y, 2.199, .084, .209, p.red);
  tin(b, p, 2.348, y, 2.177, .077, .172, p.tealDeep);
  tin(b, p, 2.205, y, 1.978, .082, .123, p.ochre);
  bottle(b, p, 2.734, y, 1.942, 1.22, p.glassBrown);
  clothRoll(b, p, 2.619, y + .001, 2.288, .421, .069, p.cloth[2]);
  crate(b, p, 2.544, y, 1.661, .437, .139, .245);
  for (const [x, color] of [[2.432, p.glassGreen], [2.555, p.glassBrown], [2.660, p.glassBlue]]) bottle(b, p, x, y + .029, 1.667, .80, color);
  const label = printedLabel('Tea & tin', 'NELL FINCH');
  b.box(p.timber, 2.568, y + .089, 2.39, .24, .148, .027, .035, 0, -.15);
  b.plane(label, 2.569, y + .09, 2.406, .216, .126, -.15, .035);
}

export function shopfront(b, p, c, contact) {
  b.section = 'awnings and braces';
  canopy(b, p, c, contact);
  b.section = 'serving counter';
  counter(b, p, c, contact);
  stallWares(b, p);
}

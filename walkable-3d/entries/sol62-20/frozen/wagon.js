import * as T from 'three';
import { decalMaterial, nail, rng } from './model.js';
import { FLOOR, STAIR_X, STAIR_Y, STAIR_Z } from './layout.js';

const length = 6.34;
const half = length / 2;
const wallTop = 3.31;
const eave = 1.515;
const frontWindow = {lo: -2.68, hi: -1.52, bottom: 2.14, top: 3.01};
const rearWindow = {lo: -2.76, hi: -1.74, bottom: 2.28, top: 3.02};
const workWindow = {lo: .41, hi: 1.39, bottom: 2.66, top: 3.13};
export const hatch = {lo: .30, hi: 2.87, bottom: 1.50, top: 3.18};

function sidewall(b, p, side, holes) {
  const z = side * 1.365;
  const edges = [1.085, 1.27, 1.50, 1.72, 1.93, 2.14, 2.32, 2.53, 2.73, 2.94, 3.13, wallTop];
  for (const h of holes) edges.push(h.bottom, h.top);
  const levels = [...new Set(edges)].sort((a, v) => a - v);
  for (let j = 1; j < levels.length; j++) {
    const y0 = levels[j - 1];
    const y1 = levels[j];
    if (y1 - y0 < .009) continue;
    const mid = (y0 + y1) / 2;
    let start = -half;
    const active = holes.filter(h => mid > h.bottom && mid < h.top);
    for (const {lo, hi} of [...active, {lo: half, hi: half}]) {
      const w = lo - start;
      if (w > .025) {
        const x = (start + lo) / 2;
        b.box(p.teal[j % p.teal.length], x, mid, z + side * .039, w, y1 - y0 - .0025, .095);
        b.box(p.inside[j % p.inside.length], x, mid, z - side * .035, w, y1 - y0 - .0015, .072);
      }
      start = hi;
    }
  }
  for (const x of [-3.12, 3.12]) {
    b.box(p.spruce, x, 2.22, z + side * .063, .119, 2.25, .082);
    b.box(p.ochre, x, 2.22, z + side * .111, .035, 2.22, .016);
    for (const y of [1.28, 1.77, 2.50, 3.15]) nail(b, p, x, y, z + side * .121);
  }
  b.box(p.spruce, 0, 1.196, z + .076 * side, 6.49, .159, .11);
  b.box(p.trim, 0, 1.242, z + .14 * side, 6.37, .023, .017);
  b.box(p.spruce, 0, 3.27, z + .057 * side, 6.48, .117, .115);
  b.box(p.chalk, 0, 3.293, z + .123 * side, 6.43, .025, .014);
}

function endwall(b, p, side, lo, hi, bottom, top) {
  const x = half * side;
  const sections = [-1.36, lo, hi, 1.36];
  for (let j = 0; j < 3; j++) {
    const a = sections[j], c = sections[j + 1];
    if (c - a < .01) continue;
    const z = (a + c) / 2;
    const span = c - a;
    const strips = j !== 1 ? [[FLOOR, wallTop]] : [[FLOOR, bottom], [top, wallTop]];
    for (const [start, end] of strips) {
      if (end <= start) continue;
      const boards = Math.ceil(span / .16);
      for (let n = 0; n < boards; n++) {
        const width = span / boards;
        const center = a + width * (n + .5);
        b.box(p.teal[(j + n) % 5], x + .024 * side, (start + end) / 2, center,
          .096, end - start, width - .0025);
        b.box(p.inside[n % 4], x - .047 * side, (start + end) / 2, center,
          .07, end - start, width - .0015);
      }
    }
  }
  for (const z of [-1.35, 1.35]) b.box(p.spruce, x + .032 * side, 2.204, z, .19, 2.30, .138);
  if (side > 0) {
    b.box(p.trim, x + .084, 1.38, 0, .03, .024, 2.59);
    b.box(p.trim, x + .084, 3.175, 0, .03, .026, 2.59);
  }
}

function sideWindow(b, p, o, side, shutters = false) {
  const x = (o.lo + o.hi) / 2, y = (o.bottom + o.top) / 2;
  const w = o.hi - o.lo, h = o.top - o.bottom;
  const z = 1.422 * side;
  for (const end of [-1, 1]) {
    b.box(p.timberLight, x + end * (w / 2 + .019), y, z, .078, h + .11, .185);
    b.box(p.trim, x + end * (w / 2 + .026), y, z + .104 * side, .039, h + .14, .021);
    b.box(p.darkWood, x + end * (w / 2 - .015), y, z - .015 * side, .039, h, .08);
    b.box(p.trim, x, y + end * (h / 2 + .028), z, w + .17, .084, .19);
  }
  b.box(p.honey, x, o.bottom - .049, z, w + .24, .055, .266);
  b.box(p.darkWood, x, y, z - .055 * side, .046, h, .05);
  b.box(p.darkWood, x, y + .059, z - .055 * side, w, .038, .05);
  for (const n of [-1, 1]) {
    b.box(p.brassDark, x + n * .068, y + .02, z - .085 * side, .037, .067, .022);
  }
  if (!shutters) return;
  for (const wing of [-1, 1]) {
    const dx = x + wing * (w / 2 + .33);
    b.box(p.tealDeep, dx, y, z + .092, .522, h + .04, .067, -.06 * wing);
    for (let i = -2; i <= 2; i++) b.box(p.faded, dx + .104 * i, y, z + .128 + .006 * i * wing,
      .072, h - .035, .019, -.06 * wing);
    for (const at of [-1, 1]) {
      b.box(p.spruce, dx, y + at * .23, z + .158, .525, .061, .031, -.06 * wing);
      b.box(p.blackIron, x + wing * (w / 2 + .12), y + at * .23, z + .177, .17, .027, .019);
      nail(b, p, x + wing * (w / 2 + .18), y + at * .23, z + .193, .011);
    }
  }
}

function roofY(z) {
  return 3.32 + .545 * Math.max(0, 1 - (z / eave) ** 2) ** .75;
}

function roof(b, p) {
  const edges = Array.from({length: 15}, (_, i) => -3.37 + i * 6.74 / 14);
  for (let i = 1; i < edges.length; i++) {
    const a = edges[i - 1], c = edges[i];
    b.grid(p.roof, 1, 22, (u, v) => {
      const z = eave * (1 - v * 2);
      return [T.MathUtils.lerp(a, c, u), roofY(z), z];
    });
    b.grid(p.inside[i % 4], 1, 18, (u, v) => {
      const z = eave * (v * 2 - 1);
      return [T.MathUtils.lerp(a, c, u), roofY(z) - .065, z];
    });
  }
  for (const [i, x] of edges.entries()) {
    const last = i === 0 || i === edges.length - 1;
    const points = Array.from({length: 23}, (_, j) => {
      const z = eave * (j / 11 - 1);
      return [x, roofY(z) + .008, z];
    });
    b.curvedRod(last ? p.brassDark : p.roofLight, points, last ? .042 : .021, true);
  }
  for (const side of [-1, 1]) {
    const end = side * half;
    b.grid(p.tealDeep, 22, 1, (u, v) => {
      const z = eave * .92 * (1 - u * 2) * side;
      return [end + side * .034, 3.23 + (roofY(z) - 3.26) * v, z];
    });
    b.grid(p.honey, 22, 1, (u, v) => {
      const z = eave * .92 * (u * 2 - 1) * side;
      return [end - side * .09, 3.21 + (roofY(z) - 3.26) * v, z];
    });
    const outline = Array.from({length: 23}, (_, j) => {
      const z = eave * (j / 11 - 1);
      return [end + side * .085, roofY(z) - .031, z];
    });
    b.curvedRod(p.spruce, outline, .108, false);
    b.curvedRod(p.ochre, outline.map(([x, y, z]) => [x + .06 * side, y + .009, z]), .026, true);
    b.box(p.roofLight, 0, 3.317, 1.51 * side, 6.74, .043, .041);
    b.box(p.darkWood, 0, 3.26, 1.43 * side, 6.73, .047, .064);
  }
  for (const x of [-2.94, -1.87, -.72, .55, 1.69, 2.95]) {
    const ribs = Array.from({length: 21}, (_, j) => {
      const z = 1.43 * (j / 10 - 1);
      return [x, roofY(z) - .092, z];
    });
    b.curvedRod(p.timberLight, ribs, .076, false);
    for (const z of [-1.36, 1.36]) b.box(p.darkWood, x, 3.29, z, .142, .093, .12);
  }
}

function wheelBand(b, mat, x, y, z, outer, inner, width) {
  const rimPoint = (u, radius, offset) => {
    const a = u * Math.PI * 2;
    return [x + Math.cos(a) * radius, y + Math.sin(a) * radius, z + offset];
  };
  for (const s of [-1, 1]) {
    b.grid(mat, 48, 1, (u, v) => rimPoint(u * s, T.MathUtils.lerp(outer, inner, v), s * width / 2));
  }
  b.grid(mat, 48, 1, (u, v) => rimPoint(u, outer, (v - .5) * width));
  b.grid(mat, 48, 1, (u, v) => rimPoint(-u, inner, (v - .5) * width));
}

function keeperBox(b, p, c) {
  const x = .44, z = -1.572;
  b.box(p.timber, x, .865, z, 1.137, .312, .351);
  b.box(p.ochre, x, 1.029, z, 1.179, .059, .365);
  b.box(p.tealDeep, x, .866, z - .183, 1.151, .259, .044);
  for (const xx of [x - .382, x + .382]) {
    b.box(p.blackIron, xx, .864, z - .209, .053, .259, .017);
    b.box(p.blackIron, xx, 1.064, z, .055, .022, .371);
    b.rod(p.ironLight, [xx, .695, z - .128], [xx, .510, -1.344], .034, .049);
    for (const y of [.758, .957]) nail(b, p, xx, y, z - .224, .012);
  }
  b.box(p.brassDark, x, .902, z - .213, .105, .079, .035);
  b.box(p.brass, x, .921, z - .233, .045, .049, .013);
  b.oval(p.darkWood, x, .910, z - .245, .008, .015, .005);
  c.rect(x - .59, x + .59, z - .24, z + .174, .51, 1.08);
}

function undercarriage(b, p, c, contact) {
  b.box(p.darkWood, 0, .996, 0, 6.58, .17, 2.76);
  for (const z of [-.98, .98]) {
    b.box(p.timber, 0, .83, z, 6.67, .22, .23);
    b.box(p.iron, 0, .723, z, 6.57, .038, .106);
  }
  for (const x of [-2.96, -2.07, -.86, .77, 2.05, 2.96]) {
    b.box(p.darkWood, x, .79, 0, .20, .19, 2.69);
  }
  for (const z of [-1.44, 1.44]) {
    b.box(p.tealDeep, 0, .987, z, 6.66, .23, .12);
    b.box(p.ochre, 0, .932, z + Math.sign(z) * .066, 6.52, .034, .019);
    for (let i = 0; i < 11; i++) nail(b, p, -2.92 + i * .584, 1.004, z + Math.sign(z) * .066, .018);
  }
  for (const [x, r] of [[-2.19, .68], [2.17, .71]]) {
    const y = r + .008;
    b.cylinder(p.blackIron, x, y, 0, .053, .053, 3.56, 'z');
    for (const z of [-1.62, 1.62]) {
      const side = Math.sign(z);
      wheelBand(b, p.endgrain, x, y, z, r - .015, r - .136, .138);
      wheelBand(b, p.blackIron, x, y, z, r + .008, r - .025, .148);
      for (const dz of [-.075, .075]) b.torus(p.ironLight, x, y, z + dz, r - .025, .005, 'z', 48);
      for (let j = 0; j < 6; j++) {
        const a = j * Math.PI / 3;
        b.rod(p.darkWood,
          [x + (r - .132) * Math.cos(a), y + (r - .132) * Math.sin(a), z + side * .071],
          [x + (r - .036) * Math.cos(a), y + (r - .036) * Math.sin(a), z + side * .071],
          .004, .004, false, false);
      }
      for (let i = 0; i < 12; i++) {
        const a = i * Math.PI / 6 + .11;
        const lx = Math.cos(a), ly = Math.sin(a);
        b.rod(i % 3 === 0 ? p.ochre : p.timberLight,
          [x + lx * .113, y + ly * .113, z + side * .028],
          [x + lx * (r - .083), y + ly * (r - .083), z - side * .018], .054, .071);
        const k = r - .084;
        nail(b, p, x + lx * k, y + ly * k, z + side * .07, .011);
      }
      b.cylinder(p.darkWood, x, y, z, .162, .162, .22, 'z', 20);
      b.cylinder(p.iron, x, y, z + side * .119, .116, .116, .059, 'z', 16);
      b.cylinder(p.brass, x, y, z + side * .155, .064, .064, .028, 'z');
      b.cylinder(p.blackIron, x, y, z + side * .179, .033, .033, .025, 'z', 6);
      b.plane(contact, x, .009, z, 1.05, .60, -Math.PI / 2);
      c.rect(x - r + .05, x + r - .05, z - .111, z + .111, .025, y + r);
      for (const offset of [-.13, .13]) {
        const arc = Array.from({length: 8}, (_, i) => {
          const t = i / 7;
          return [x + t * .56 - .28, y + .092 + .035 * Math.sin(Math.PI * t), side * (1.02 + offset)];
        });
        b.curvedRod(p.blackIron, arc, .033, false);
      }
    }
  }
  for (const z of [-.54, .54]) {
    b.rod(p.darkWood, [2.83, .75, z], [4.19, .37, z * .74], .136, .111);
    b.rod(p.iron, [3.65, .52, z * .84], [4.16, .38, z * .75], .034, .117);
  }
  b.box(p.timberLight, 3.78, .493, 0, .125, .106, 1.04);
  b.torus(p.blackIron, 4.16, .37, -.4, .092, .024, 'z', 24);
  b.torus(p.blackIron, 4.16, .37, .4, .092, .024, 'z', 24);
  c.rect(3.13, 4.21, -.60, .60, .30, .83);
  b.plane(contact, -.04, .008, 0, 8.25, 4.0, -Math.PI / 2);
  const chock = -.72 - 2.19;
  b.box(p.timberLight, chock, .055, 1.616, .29, .11, .204, .065);
  b.box(p.timber, chock + .016, .124, 1.614, .23, .074, .20, .065, -.315);
  b.torus(p.iron, chock - .133, .073, 1.617, .043, .007, 'x', 16);
  b.plane(contact, chock, .009, 1.616, .49, .34, -Math.PI / 2);
  keeperBox(b, p, c);
}

function stairsAndDoor(b, p, c, contact) {
  const [z0, z1] = STAIR_Z;
  const z = (z0 + z1) / 2;
  for (let i = 0; i < STAIR_Y.length; i++) {
    const [x0, x1] = STAIR_X.slice(i, i + 2);
    const y = STAIR_Y[i];
    b.box(p.darkWood, (x0 + x1) / 2, y / 2 - .006, z, x1 - x0, y, z1 - z0 - .025);
    b.box(p.timberLight, (x0 + x1) / 2 - .009, y - .034, z, x1 - x0 + .022, .068, z1 - z0 + .044);
    b.box(p.endgrain, x0 - .014, y - .042, z, .038, .048, z1 - z0 + .045);
    for (const zz of [z0 + .075, z1 - .076]) nail(b, p, x0 + .057, y + .001, zz, .015, 'y');
  }
  for (const zz of [z0 - .054, z1 + .057]) {
    b.rod(p.timber, [-4.80, .114, zz], [-3.275, 1.027, zz], .128, .113);
    for (const xx of [-4.56, -3.93, -3.34]) nail(b, p, xx, .10 + (xx + 4.8) * .60, zz, .02);
    c.rect(-4.78, -3.33, zz - .034, zz + .034, .22, 1.10);
  }
  const handrail = z0 - .107;
  for (const [x, y] of [[-4.55, .20], [-3.95, .61], [-3.40, 1.00]]) {
    b.box(p.spruce, x, y + .407, handrail, .086, .87, .082);
    b.box(p.brassDark, x, y + .075, handrail, .1, .1, .093);
  }
  b.rod(p.timberLight, [-4.61, 1.09, handrail], [-3.37, 1.91, handrail], .075, .091);
  c.rect(-4.63, -3.36, handrail - .038, handrail + .038, .95, 1.94);
  b.plane(contact, -3.99, .012, z, 2.11, 1.64, -Math.PI / 2);

  for (const zz of [z0 - .044, z1 + .039]) {
    b.box(p.darkWood, -3.198, 2.17, zz, .197, 2.16, .087);
    b.box(p.trim, -3.305, 2.17, zz, .045, 2.16, .11);
  }
  b.box(p.trim, -3.218, 3.244, z, .236, .105, 1.26);
  b.box(p.honey, -3.274, 1.069, z, .192, .062, 1.15);
  const ang = 2.18;
  const leaf = (dist, y, offset, w, h, d, mat) => {
    const x = -3.274 + Math.cos(ang) * dist + Math.sin(ang) * offset;
    const zz = z0 - .026 - Math.sin(ang) * dist + Math.cos(ang) * offset;
    b.box(mat, x, y, zz, w, h, d, ang);
  };
  leaf(.491, 2.167, 0, .983, 2.057, .064, p.tealDeep);
  for (const a of [-1, 1]) {
    for (const q of [.056, .923]) leaf(q, 2.17, a * .041, .111, 2.064, .031, a > 0 ? p.trim : p.timberLight);
    for (const y of [1.19, 2.13, 3.15]) leaf(.491, y, .039 * a, .97, .088, .035, a > 0 ? p.trim : p.timberLight);
    for (const y of [1.63, 2.65]) leaf(.49, y, .036 * a, .703, .716, .026, a > 0 ? p.teal[2] : p.honey);
    leaf(.81, 2.052, a * .072, .047, .116, .04, p.brassDark);
    leaf(.81, 2.06, a * .10, .11, .033, .035, p.brass);
  }
  for (const y of [1.36, 2.84]) {
    leaf(.123, y, .062, .24, .054, .03, p.blackIron);
    b.cylinder(p.iron, -3.28, y, z0 - .021, .033, .033, .11);
  }
  c.rect(-3.3, -3.14, -1.46, z0, 1.08, 3.37);
  c.rect(-3.30, -3.14, z1, 1.46, 1.08, 3.37);
  c.rect(-3.86, -3.36, -1.10, -.48, 1.11, 3.22);
}

function rearPlaque(b, p) {
  const plaque = decalMaterial(320, 320, (ctx, w, h) => {
    ctx.fillStyle = '#294d46';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = '#d4ad70';
    ctx.lineWidth = 3;
    ctx.strokeRect(15, 15, 290, 290);
    ctx.lineWidth = 1;
    ctx.strokeRect(23, 23, 274, 274);
    ctx.fillStyle = '#e7ca89';
    ctx.beginPath(); ctx.moveTo(53, 196);
    ctx.bezierCurveTo(88, 168, 100, 119, 160, 127);
    ctx.bezierCurveTo(173, 95, 198, 91, 224, 105);
    ctx.lineTo(262, 102); ctx.lineTo(228, 122);
    ctx.bezierCurveTo(218, 165, 153, 199, 120, 192);
    ctx.lineTo(70, 208); ctx.lineTo(85, 187); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#334c42';
    ctx.beginPath(); ctx.ellipse(153, 161, 36, 12, -.48, 0, 7); ctx.fill();
    ctx.beginPath(); ctx.arc(209, 109, 4, 0, 7); ctx.fill();
    ctx.fillStyle = '#e7ca89';
    ctx.textAlign = 'center'; ctx.font = 'bold 23px Georgia';
    ctx.fillText('N E L L   F I N C H', w / 2, 260);
  });
  b.box(p.tealDeep, -3.279, 2.465, 1.06, .055, .395, .389);
  b.plane(plaque, -3.307, 2.465, 1.06, .369, .377, 0, -Math.PI / 2);
  for (const y of [2.293, 2.637]) {
    for (const z of [.895, 1.225]) nail(b, p, -3.315, y, z, .010, 'x');
  }
}

function lettering(b, p) {
  const panel = decalMaterial(896, 224, (ctx, w, h) => {
    ctx.fillStyle = '#2e5a52';
    ctx.fillRect(0, 0, w, h);
    const rand = rng(872);
    ctx.lineWidth = 1;
    for (let i = 0; i < 450; i++) {
      const y = rand() * h, x = rand() * w;
      ctx.strokeStyle = rand() < .5 ? '#1d403247' : '#dcdda62c';
      ctx.beginPath();
      ctx.moveTo(x, y); ctx.lineTo(x + 6 + rand() * 82, y + .8); ctx.stroke();
    }
    ctx.strokeStyle = '#d2ae71';
    ctx.lineWidth = 3;
    ctx.strokeRect(18, 19, w - 36, h - 38);
    ctx.lineWidth = 1;
    ctx.strokeRect(28, 29, w - 56, h - 58);
    ctx.textAlign = 'center';
    ctx.fillStyle = '#f5d698';
    ctx.font = 'bold 91px Georgia';
    ctx.fillText('Lark & Latch', w / 2, 118);
    ctx.fillStyle = '#dfbc80';
    ctx.font = 'bold 22px Georgia';
    ctx.fillText('N E L L   F I N C H     ·     T I N ,  T E A   &   T H R E A D', w / 2, 169);
    for (const x of [65, w - 65]) {
      ctx.beginPath(); ctx.moveTo(x, 111); ctx.lineTo(x + 13, 123);
      ctx.lineTo(x, 135); ctx.lineTo(x - 13, 123); ctx.fill();
    }
  });
  b.box(p.spruce, -1.60, 1.759, 1.464, 2.96, .644, .07);
  b.plane(panel, -1.60, 1.759, 1.5005, 2.86, .620);
  for (const [x, y] of [[-3.02, 1.47], [-3.02, 2.05], [-.18, 1.47], [-.18, 2.05]]) nail(b, p, x, y, 1.508, .014);
  for (const z of [-1.48, 1.48]) {
    const sign = Math.sign(z);
    const x = .06;
    b.box(p.spruce, x, 2.814, z, .096, 1.003, .061);
    b.box(p.trim, x, 2.814, z + sign * .036, .020, .846, .016);
    for (const y of [2.41, 3.223]) b.box(p.brass, x, y, z + sign * .045, .047, .047, .014, 0, Math.PI / 4);
  }
}

export function wagon(b, p, c, contact) {
  b.section = 'chassis';
  undercarriage(b, p, c, contact);
  stairsAndDoor(b, p, c, contact);
  b.section = 'wagon skin';
  sidewall(b, p, 1, [frontWindow, hatch]);
  sidewall(b, p, -1, [rearWindow, workWindow]);
  endwall(b, p, -1, STAIR_Z[0], STAIR_Z[1], FLOOR, 3.19);
  endwall(b, p, 1, .48, .99, 2.39, 3.02);
  sideWindow(b, p, frontWindow, 1, true);
  sideWindow(b, p, rearWindow, -1);
  sideWindow(b, p, workWindow, -1);
  for (const z of [.463, 1.007]) b.box(p.trim, 3.23, 2.71, z, .188, .742, .076);
  for (const y of [2.367, 3.045]) b.box(p.trim, 3.23, y, .735, .188, .072, .661);
  b.box(p.darkWood, 3.17, 2.72, .735, .06, .66, .045);
  b.box(p.darkWood, 3.17, 2.77, .735, .06, .035, .512);
  b.section = 'roof';
  roof(b, p);
  b.section = 'floor and fascia';
  for (let i = 0; i < 17; i++) {
    const z = -1.292 + (i + .5) * 2.584 / 17;
    const split = -.35 + .34 * Math.sin(i * 9.7);
    for (const [lo, hi, k] of [[-3.23, split, i], [split, 3.16, i + 2]]) {
      b.box(p.floor[k % p.floor.length], (lo + hi) / 2, FLOOR - .038, z, hi - lo - .003, .076, .149);
    }
  }
  for (const z of [-1.28, 1.28]) b.box(p.honey, 0, 1.145, z, 6.33, .083, .059);
  lettering(b, p);
  rearPlaque(b, p);
  c.rect(-3.22, 3.22, -1.48, -1.31, 1.02, 3.42);
  c.rect(-3.22, 3.22, 1.31, 1.48, 1.02, 3.42);
  c.rect(3.085, 3.26, -1.46, 1.46, 1.02, 3.42);
}

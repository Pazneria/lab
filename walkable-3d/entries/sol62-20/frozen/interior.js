import * as T from 'three';
import { decalMaterial, nail, rng, surfaceMaterial } from './model.js';
import { book, bottle, clothRoll, crate, cushion, lantern, leatherPull, mug, printedLabel, scissors, spool, tin, wovenBasket } from './goods.js';

function textileRug(b, x, z, w, d, angle = 0, colors = ['#a45c45', '#dfba7d', '#4e685b']) {
  const mat = decalMaterial(512, 256, (ctx, W, H) => {
    const [rust, cream, teal] = colors;
    ctx.fillStyle = rust;
    ctx.fillRect(0, 0, W, H);
    const tile = (cx, cy, rx, ry, color) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(cx - rx, cy);
      ctx.lineTo(cx, cy - ry);
      ctx.lineTo(cx + rx, cy);
      ctx.lineTo(cx, cy + ry);
      ctx.closePath(); ctx.fill();
    };
    for (let i = 0; i < 17; i++) {
      const xx = (i - .5) * 32;
      for (const sy of [37, H - 37]) {
        tile(xx, sy, 17, 12, teal);
        tile(xx, sy, 10, 6, cream);
      }
    }
    ctx.strokeStyle = cream;
    ctx.lineWidth = 3;
    for (const p of [12, 19, 50]) ctx.strokeRect(p, p, W - p * 2, H - p * 2);
    for (let i = 0; i < 5; i++) {
      const xx = 84 + i * 86;
      tile(xx, H / 2, 42, 60, teal);
      tile(xx, H / 2, 29, 42, cream);
      tile(xx, H / 2, 20, 31, rust);
      tile(xx, H / 2, 10, 14, teal);
    }
    const rand = rng(339);
    for (let j = 0; j < 9000; j++) {
      ctx.fillStyle = j % 2 === 0 ? '#170f1526' : '#fff6d62b';
      ctx.fillRect(rand() * W, rand() * H, 1 + rand() * 4, 1);
    }
  });
  b.plane(mat, x, 1.106, z, w, d, -Math.PI / 2, 0, angle);
}

function bunk(b, p, c) {
  const min = -3.03, max = -.84, z = -.898;
  const center = (min + max) / 2;
  b.box(p.darkWood, center, 1.391, z, max - min, .128, .885);
  b.box(p.honey, center, 1.299, -.914, max - min, .375, .799);
  b.box(p.timber, center, 1.434, -.461, max - min + .027, .048, .075);
  for (const x of [min + .047, max - .047]) {
    b.box(p.timberLight, x, 1.30, -.459, .085, .40, .077);
    b.box(p.brassDark, x, 1.138, -.443, .094, .069, .105);
  }
  for (let i = 0; i < 3; i++) {
    const x = min + .43 + i * .685;
    const open = i === 2 ? .119 : 0;
    b.box(p.darkWood, x, 1.26, -.46, .636, .223, .037);
    b.box(p.timberLight, x, 1.256, -.432 + open, .61, .20, .065);
    b.box(p.warmPly, x, 1.257, -.396 + open, .561, .141, .016);
    if (open) {
      for (const xx of [x - .283, x + .283]) b.box(p.honey, xx, 1.267, -.498 + open / 2, .026, .164, .234);
      cushion(b, p.cloth[0], x - .088, 1.312, -.448, .24, .056, .19);
      cushion(b, p.cloth[3], x + .158, 1.31, -.472, .16, .065, .16);
    }
    leatherPull(b, p, x, 1.263, -.380 + open, .136);
  }
  cushion(b, p.cream, center, 1.531, z, max - min - .047, .171, .851);
  b.box(p.honey, min + .005, 1.624, z, .047, .283, .86);
  b.box(p.timber, min + .001, 1.768, z, .061, .032, .865);
  cushion(b, p.flax, -2.755, 1.655, -.946, .449, .126, .526, -.067);

  const quiltMat = decalMaterial(768, 512, (ctx, w, h) => {
    const colors = ['#6e8a7e', '#567f76', '#618782', '#9c6b51', '#87998a', '#c49b64', '#676f63'];
    const rand = rng(524);
    const cols = 9, rows = 6;
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        const cw = w / cols, ch = h / rows;
        const x = i * cw, y = j * ch;
        ctx.fillStyle = colors[(i * 8 + j * 4 + (i + j) % 3) % colors.length];
        ctx.fillRect(x, y, cw + .3, ch + .3);
        ctx.lineWidth = 1.6;
        ctx.strokeStyle = '#ece3b99c';
        ctx.setLineDash([4, 4]);
        ctx.strokeRect(x + 3, y + 3, cw - 6, ch - 6);
        ctx.beginPath();
        ctx.moveTo(x + 6, y + 6);
        ctx.lineTo(x + cw - 6, y + ch - 6);
        ctx.stroke();
      }
    }
    ctx.setLineDash([]);
    for (let n = 0; n < 7800; n++) {
      ctx.fillStyle = n % 2 ? '#3d3f3636' : '#fff1cc44';
      ctx.fillRect(rand() * w, rand() * h, rand() * 4 + 1, 1);
    }
  });
  quiltMat.side = T.DoubleSide;
  b.grid(quiltMat, 25, 18, (u, v) => {
    const x = -2.50 + u * 1.586;
    const zStart = -.362 - .014 * Math.sin(u * 34);
    const fold = .26 * Math.max(0, 1 - v / .32) ** 2;
    return [x, 1.630 + .013 * Math.sin(u * 16 + v * 5) * (1 - v * .7) - fold,
      zStart - .896 * v];
  });
  const edge = Array.from({length: 19}, (_, i) => [-2.50 + i / 18 * 1.586,
    1.371 + .012 * Math.sin(i / 18 * 16), -.364 - .014 * Math.sin(i / 18 * 34)]);
  b.curvedRod(p.threadDark, edge, .016, true, false);
  clothRoll(b, p, -1.04, 1.633, -.995, .25, .071, p.cloth[3]);
  c.rect(min, max, -1.32, -.36, 1.10, 1.74);
}

function homeWindow(b, p) {
  const ox = -2.25;
  b.rod(p.brassDark, [ox - .61, 3.109, -1.239], [ox + .61, 3.109, -1.239], .022, .022, true);
  for (const x of [ox - .63, ox + .63]) b.oval(p.brass, x, 3.109, -1.239, .028, .026, .026);
  const curtain = surfaceMaterial('#ebcf95', {map: p.cream.map, side: T.DoubleSide});
  for (const sign of [-1, 1]) {
    const x = ox + .467 * sign;
    b.grid(curtain, 20, 14, (u, v) => {
      const gather = 1 - .65 * Math.exp(-((v - .61) ** 2) * 29);
      const xx = x + (u - .5) * (.25 + .12 * Math.sin(v * Math.PI)) * gather;
      const yy = 3.097 - v * .745 - .022 * Math.cos(u * 14);
      const zz = -1.205 + .028 * Math.sin(u * Math.PI * 9 + v * .3) * gather + v * .02;
      return [xx, yy, zz];
    });
    b.torus(p.leatherLight, x, 2.645, -1.184, .057, .008, 'y', 20);
    b.rod(p.leatherLight, [x, 2.633, -1.126], [x + sign * .04, 2.545, -1.129], .009, .009, true);
    for (let i = -2; i <= 2; i++) b.torus(p.darkWood, x + i * .042, 3.097, -1.239, .017, .003, 'x', 12);
  }
}

function personalCorner(b, p, c) {
  const x = -1.73, z = 1.041, y = 1.928;
  b.box(p.timberLight, x, y, z, .88, .064, .527);
  b.box(p.honey, x, y + .036, z, .86, .021, .515);
  b.box(p.endgrain, x, y - .029, .777, .87, .049, .042);
  b.box(p.darkWood, x, y - .048, 1.259, .88, .091, .062);
  b.rod(p.spruce, [x - .08, y - .04, .851], [x - .08, y - .37, 1.265], .067, .052);
  b.rod(p.iron, [x - .08, y - .049, .870], [x - .08, y - .34, 1.21], .013, .035);
  for (const dx of [-.31, .31]) {
    b.box(p.iron, x + dx, y + .049, 1.238, .115, .013, .102);
    for (const ez of [-.032, .033]) nail(b, p, x + dx, y + .056, 1.238 + ez, .011, 'y');
  }
  book(b, p, -1.907, y + .046, 1.022, .314, .043, .210, p.bookRed, -.09);
  const journal = printedLabel('Daybook', 'N. FINCH');
  b.plane(journal, -1.907, y + .090, 1.022, .186, .096, -Math.PI / 2, 0, -.09);
  mug(b, p, -1.43, y + .047, 1.044, 1.05, p.darkCeramic);
  b.rod(p.corkDark, [-1.63, 1.982, 1.13], [-1.53, 1.982, 1.20], .015, .015, true, false);
  b.rod(p.soot, [-1.53, 1.982, 1.20], [-1.519, 1.982, 1.208], .009, .009, true, false);
  c.rect(x - .44, x + .44, .78, 1.32, y - .445, y + .138);

  const fx = -.982, fz = 1.242;
  b.box(p.darkWood, fx, 2.612, fz, .303, .395, .041);
  const bird = decalMaterial(256, 332, (ctx, w, h) => {
    ctx.fillStyle = '#e2c694'; ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#c3a47440'; ctx.fillRect(11, 11, w - 22, h - 22);
    ctx.strokeStyle = '#6a5840'; ctx.lineWidth = 2; ctx.strokeRect(15, 15, w - 30, h - 30);
    ctx.fillStyle = '#314d44';
    ctx.beginPath(); ctx.moveTo(41, 215); ctx.quadraticCurveTo(85, 210, 109, 174);
    ctx.bezierCurveTo(108, 140, 121, 106, 164, 111); ctx.quadraticCurveTo(184, 105, 197, 118);
    ctx.lineTo(224, 121); ctx.lineTo(201, 134); ctx.bezierCurveTo(198, 188, 153, 214, 125, 217);
    ctx.lineTo(57, 239); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#ba7a48'; ctx.beginPath(); ctx.ellipse(154, 163, 32, 18, -.82, 0, 7); ctx.fill();
    ctx.fillStyle = '#ead7a8'; ctx.beginPath(); ctx.arc(186, 124, 3, 0, 7); ctx.fill();
    ctx.strokeStyle = '#554733'; ctx.beginPath(); ctx.moveTo(67, 253); ctx.lineTo(197, 230); ctx.stroke();
    ctx.font = 'italic 22px Georgia'; ctx.textAlign = 'center'; ctx.fillStyle = '#554733';
    ctx.fillText('From the hedge', w / 2, 290);
  });
  b.plane(bird, fx, 2.612, fz - .022, .266, .359, 0, Math.PI);
  b.rod(p.rope, [fx - .072, 2.805, fz - .02], [fx, 2.919, fz - .028], .006, .006, true, false);
  b.rod(p.rope, [fx + .072, 2.805, fz - .02], [fx, 2.919, fz - .028], .006, .006, true, false);
  nail(b, p, fx, 2.919, fz - .027, .012);
  b.box(p.timberLight, -.97, 2.23, 1.162, .34, .043, .223);
  b.box(p.brassDark, -.97, 2.193, 1.243, .105, .072, .039);
  lantern(b, p, -.965, 2.27, 1.129, .88);
  const light = new T.PointLight('#ffbb71', 3.2, 2.45, 2);
  light.position.set(-.99, 2.42, 1.008);
  b.scene.add(light);

  const x2 = -1.68, low = 1.10, z2 = 1.077;
  cushion(b, p.quilt, x2, low + .397, z2, .37, .054, .34, .085);
  for (const s of [-1, 1]) {
    b.rod(p.timber, [x2 + s * .124, low + .037, z2 - .139], [x2 + s * .113, low + .366, z2 + .113], .036);
    b.rod(p.timberLight, [x2 + s * .126, low + .030, z2 + .136], [x2 + s * .118, low + .365, z2 - .113], .038);
  }
  b.rod(p.blackIron, [x2 - .145, low + .197, z2], [x2 + .145, low + .197, z2], .016, .016, true);
  c.rect(x2 - .182, x2 + .184, .91, 1.25, low, low + .43);
}

function trunkAndPegs(b, p, c) {
  const x = -.562, z = -1.018;
  crate(b, p, x, 1.102, z, .427, .40, .556, true);
  for (const dx of [-.124, .124]) {
    b.box(p.leather, x + dx, 1.536, z, .054, .013, .556);
    b.box(p.leather, x + dx, 1.39, z + .287, .053, .291, .015);
  }
  b.box(p.brassDark, x + .125, 1.393, z + .296, .063, .066, .019);
  b.box(p.brass, x + .125, 1.393, z + .307, .035, .037, .012);
  c.rect(x - .23, x + .23, z - .31, z + .30, 1.10, 1.56);

  b.box(p.darkWood, -.786, 2.58, -1.217, .77, .091, .058);
  for (const dx of [-.28, -.09, .07, .27]) {
    const xx = -.786 + dx;
    b.rod(p.brass, [xx, 2.573, -1.183], [xx, 2.62, -1.104], .027, .027, true);
    b.oval(p.brass, xx, 2.628, -1.100, .022, .020, .022, [0, 0, 0], false);
  }
  const apron = surfaceMaterial('#94644b', {map: p.cream.map, side: T.DoubleSide});
  b.grid(apron, 12, 12, (u, v) => [-.48 + (u - .5) * (.325 + .17 * v),
    2.46 - v * .53 + .016 * Math.cos(u * 17),
    -1.13 + .03 * Math.sin(u * 17 + v * 2) + v * .041]);
  b.curvedRod(p.leather, [[-.58, 2.475, -1.137], [-.56, 2.553, -1.098], [-.515, 2.626, -1.09],
    [-.47, 2.552, -1.096], [-.414, 2.470, -1.136]], .018);
  b.box(p.leatherLight, -.5, 2.161, -1.066, .16, .103, .013);
  b.box(p.honey, -1.145, 2.835, -1.205, .657, .036, .238);
  book(b, p, -1.209, 2.856, -1.174, .258, .048, .161, p.book);
  book(b, p, -1.133, 2.905, -1.163, .212, .038, .132, p.bookBlue, .12);
  bottle(b, p, -.918, 2.858, -1.196, .68, p.glassBrown);
}

function drawerRun(b, p, c) {
  const benchZ = -.945, benchY = 1.985;
  b.box(p.darkWood, 1.42, benchY - .065, benchZ, 3.03, .14, .729);
  for (let i = 0; i < 4; i++) b.box(i % 2 ? p.honey : p.warmPly, 1.42, benchY + .016,
    -.629 - i * .190, 3.055, .043, .184);
  b.box(p.timberLight, 1.42, benchY - .022, -.534, 3.067, .085, .046);
  for (const x of [-.04, .963, 2.925]) {
    b.box(p.darkWood, x, 1.506, -.602, .073, .831, .074);
    b.box(p.timber, x, 1.506, -1.249, .077, .831, .074);
    for (const y of [1.21, 1.85]) b.box(p.timberLight, x, y, -.923, .075, .079, .647);
    nail(b, p, x, 1.897, -.555, .014);
  }
  for (const [x, title] of [[.214, 'LATCHES'], [.69, 'HINGES']]) {
    for (let i = 0; i < 3; i++) {
      const y = 1.26 + i * .211;
      b.box(p.darkWood, x, y, -.892, .437, .184, .587);
      b.box(i % 2 === 0 ? p.spruce : p.tealDeep, x, y, -.577, .432, .178, .064);
      leatherPull(b, p, x + .060, y, -.537);
      if (i === 2) b.plane(printedLabel(title, 'No. ' + (x < .5 ? '3' : '4')), x - .095, y, -.544, .141, .073);
      else {
        b.box(p.brassDark, x - .093, y, -.539, .103, .046, .011);
        b.box(p.paper, x - .093, y, -.532, .084, .031, .004);
      }
    }
  }
  b.box(p.darkWood, 1.982, 1.233, -.948, 1.85, .076, .667);
  crate(b, p, 1.383, 1.273, -.923, .632, .379, .57);
  clothRoll(b, p, 1.389, 1.62, -.86, .44, .081, p.cloth[4]);
  crate(b, p, 2.128, 1.273, -.941, .695, .425, .57, true);
  wovenBasket(b, p, 2.678, 1.274, -.935, .202, .246);
  b.box(p.flax, 2.658, 1.529, -.922, .191, .033, .169, .3);
  c.rect(-.11, 2.96, -1.32, -.50, 1.10, 2.05);
}

function wallStorage(b, p, c) {
  const x0 = 1.51, x1 = 2.98, back = -1.16;
  b.box(p.darkWood, (x0 + x1) / 2, 2.575, -1.285, 1.496, 1.13, .053);
  for (const x of [x0, 2.10, 2.55, x1]) b.box(p.timber, x, 2.585, back, .068, 1.142, .32);
  for (const y of [2.131, 2.462, 2.817, 3.142]) {
    b.box(p.honey, (x0 + x1) / 2, y, back, 1.542, .058, .335);
    b.box(p.timberLight, (x0 + x1) / 2, y + .006, back + .182, 1.546, .042, .032);
    for (const x of [x0 + .028, x1 - .026]) nail(b, p, x, y + .005, back + .202, .014);
  }
  for (const [x, s, mat] of [[1.67, .89, p.glassGreen], [1.83, 1.22, p.glassBrown], [1.97, .74, p.glassBlue],
    [2.66, .68, p.glassBrown], [2.81, 1.24, p.glassGreen]]) bottle(b, p, x, 2.492, -1.165, s, mat);
  for (const [x, h, r, mat] of [[1.679, .173, .078, p.wine], [1.875, .145, .069, p.tealDeep],
    [2.001, .108, .055, p.ochre], [2.715, .156, .067, p.spruce], [2.886, .202, .070, p.red]]) tin(b, p, x, 2.847, -1.151, r, h, mat);
  for (const [x, s, mat] of [[2.18, 1.07, p.cloth[0]], [2.295, 1.17, p.cloth[2]], [2.42, 1.23, p.cloth[1]]]) {
    spool(b, p, x, 2.493, -1.148, s, mat);
    spool(b, p, x + .013, 2.847, -1.15, s * .84, p.cloth[3]);
  }
  clothRoll(b, p, 1.823, 2.161, -1.135, .454, .087, p.cloth[2]);
  clothRoll(b, p, 2.321, 2.161, -1.133, .352, .084, p.cloth[0]);
  book(b, p, 2.766, 2.16, -1.138, .295, .052, .228, p.bookBlue, -.025);
  book(b, p, 2.776, 2.214, -1.128, .267, .043, .223, p.bookRed, .06);

  const x = 2.89, z = -.012;
  b.box(p.darkWood, x, 1.665, z, .45, 1.105, .728);
  b.box(p.honey, x - .018, 2.224, z, .483, .069, .758);
  for (let i = 0; i < 4; i++) {
    const y = 1.25 + .25 * i;
    b.box(i % 2 ? p.tealDeep : p.spruce, x, y, z + .367, .413, .228, .064);
    leatherPull(b, p, x, y, z + .405, .122);
  }
  crate(b, p, x + .011, 2.255, -.028, .383, .215, .483, false);
  const items = [p.cloth[1], p.cloth[0], p.cloth[2]];
  for (let i = 0; i < 3; i++) cushion(b, items[i], x + .005, 2.45 + i * .052, -.049, .312, .07, .303, .05 * (i - 1));
  c.rect(2.638, 3.12, -.399, .39, 1.10, 2.65);
}

function benchDetails(b, p) {
  const x = .157;
  b.box(p.warmPly, x, 2.542, -1.246, .42, .91, .033);
  b.box(p.darkWood, x, 2.828, -1.221, .431, .051, .041);
  const pegRows = [2.231, 2.361, 2.491, 2.621, 2.75];
  for (const y of pegRows) {
    for (const dx of [-.151, -.078, 0, .076, .15]) b.cylinder(p.darkWood, x + dx, y, -1.225, .008, .008, .007, 'z', 8, false);
  }
  for (const [xx, y, len, metal] of [[.04, 2.578, .21, p.tinDark], [.244, 2.728, .32, p.iron], [.136, 2.466, .235, p.tin]]) {
    b.rod(p.timber, [xx, y * 1.0, -1.166], [xx - .028, y - len, -1.166], .025, .025, true);
    b.box(metal, xx, y, -1.172, .075, .033, .044, 0, -.10);
    b.rod(p.brassDark, [xx, y + .022, -1.228], [xx, y + .024, -1.159], .012, .012, true);
  }

  const paper = decalMaterial(320, 240, (ctx, w, h) => {
    ctx.fillStyle = '#ded0a0'; ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = '#6c7c714b'; ctx.lineWidth = 1;
    for (let x = 13; x < w; x += 14) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
    for (let y = 13; y < h; y += 14) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
    ctx.fillStyle = '#564631'; ctx.font = 'italic 22px Georgia'; ctx.fillText('Drill pattern for catch plate', 21, 35);
    ctx.strokeStyle = '#5c4831'; ctx.lineWidth = 2;
    ctx.strokeRect(51, 93, 212, 76);
    ctx.strokeRect(106, 116, 104, 26);
    for (const x of [72, 241]) { ctx.beginPath(); ctx.arc(x, 130, 8, 0, 7); ctx.stroke(); }
    ctx.font = 'italic 15px Georgia'; ctx.fillText('No. 4 · brass', 213, 213);
  });
  b.box(p.endgrain, 1.19, 2.017, -.853, .469, .012, .375, .053);
  b.plane(paper, 1.19, 2.024, -.853, .451, .347, -Math.PI / 2, 0, .053);
  scissors(b, p, .746, 2.032, -.815, 1.21);
  const latchX = 1.583;
  b.box(p.brassDark, latchX, 2.023, -.819, .19, .010, .079, -.119);
  b.box(p.brass, latchX, 2.039, -.819, .122, .022, .035, -.119);
  for (const x of [latchX - .068, latchX + .067]) b.cylinder(p.darkWood, x, 2.030, -.818, .010, .010, .003, 'y', 8, false);
  b.rod(p.chalk, [1.347, 2.029, -.699], [1.487, 2.03, -.658], .014, .014, true, false);
  b.box(p.ochre, .526, 2.028, -1.147, .31, .024, .136, -.044);
  for (let i = 0; i < 12; i++) b.box(p.endgrain, .396 + i * .025, 2.041, -1.113, .003, .002, i % 3 ? .015 : .036, -.044, 0, 0, false);

  const press = 2.34;
  b.box(p.iron, press, 2.044, -.912, .292, .064, .242);
  b.box(p.blackIron, press - .071, 2.194, -.974, .107, .283, .112);
  b.box(p.iron, press - .018, 2.322, -.943, .212, .087, .116);
  b.cylinder(p.tinDark, press + .035, 2.222, -.919, .022, .019, .148);
  b.cylinder(p.brassDark, press + .035, 2.132, -.919, .044, .032, .033);
  b.rod(p.blackIron, [press - .037, 2.333, -.924], [press + .27, 2.473, -.873], .033, .033, true);
  b.oval(p.timberLight, press + .277, 2.481, -.873, .058, .032, .034);
  lantern(b, p, 1.354, 2.052, -1.18, .90);
  const light = new T.PointLight('#ffd2a2', 2.9, 2.8, 2);
  light.position.set(1.341, 2.271, -1.086);
  b.scene.add(light);
}

export function interior(b, p, c, contact) {
  b.section = 'berth';
  b.plane(contact, -1.931, 1.103, -.873, 2.62, 1.20, -Math.PI / 2);
  b.plane(contact, -1.68, 1.103, 1.077, .67, .63, -Math.PI / 2);
  bunk(b, p, c);
  homeWindow(b, p);
  textileRug(b, -1.95, .256, 1.61, .707, -.013);
  personalCorner(b, p, c);
  trunkAndPegs(b, p, c);
  b.section = 'workroom';
  b.plane(contact, 1.411, 1.103, -.928, 3.42, 1.17, -Math.PI / 2);
  b.plane(contact, 2.89, 1.103, -.02, .76, 1.03, -Math.PI / 2);
  drawerRun(b, p, c);
  wallStorage(b, p, c);
  benchDetails(b, p);
}

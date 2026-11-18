import * as T from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { decalMaterial, nail, rng } from './model.js';

export function cushion(b, m, x, y, z, w, h, d, ry = 0) {
  const geom = b.geometry('rounded box', () => new RoundedBoxGeometry(1, 1, 1, 2, .16));
  b.part(geom, m, [x, y, z], [w, h, d], [0, ry, 0]);
}

export function crate(b, p, x, y, z, w, h, d, closed = false) {
  const side = .035;
  b.box(p.darkWood, x, y + .022, z, w - .026, .044, d - .026);
  for (const s of [-1, 1]) {
    for (let i = 0; i < 3; i++) {
      const cy = y + (i + .5) * h / 3;
      b.box(i % 2 === 0 ? p.timberLight : p.timber, x, cy, z + s * (d / 2 - side / 2), w, h / 3 - .006, side);
      b.box(i % 2 === 0 ? p.honey : p.timberLight, x + s * (w / 2 - side / 2), cy, z, side, h / 3 - .006, d - .06);
    }
    for (const t of [-1, 1]) {
      b.box(p.endgrain, x + s * (w / 2 - .049), y + h / 2, z + t * (d / 2 + .012), .070, h + .018, .025);
      for (const yy of [y + .057, y + h - .065]) nail(b, p, x + s * (w / 2 - .049), yy, z + t * (d / 2 + .026), .011);
    }
  }
  if (closed) {
    for (let i = 0; i < 4; i++) b.box(p.honey, x, y + h + .008, z - d * (i / 4 - .375), w + .03, .044, d / 4 - .003);
    for (const s of [-1, 1]) b.box(p.timber, x + s * w * .27, y + h + .032, z, .076, .025, d + .043);
  } else {
    b.box(p.darkWood, x, y + h * .721, z + d / 2 + .0005, w * .28, .045, .004);
  }
}

export function leatherPull(b, p, x, y, z, w = .094) {
  const arc = Array.from({length: 6}, (_, i) => {
    const t = i / 5;
    return [x + (t - .5) * w, y - .016 * Math.sin(Math.PI * t), z + .031 * Math.sin(Math.PI * t)];
  });
  b.curvedRod(p.leather, arc, .029, false);
  for (const s of [-1, 1]) b.cylinder(p.brassDark, x + s * w / 2, y, z + .008, .012, .012, .012, 'z', 8, false);
}

export function book(b, p, x, y, z, w, h, d, color = p.book, yaw = 0) {
  b.box(p.paper, x, y + h / 2, z, w - .007, h - .012, d - .009, yaw);
  for (const s of [-1, 1]) b.box(color, x, y + h / 2 + s * (h / 2 - .006), z, w, .012, d, yaw);
  b.box(color, x + Math.sin(yaw) * (d / 2 - .004), y + h / 2, z + Math.cos(yaw) * (d / 2 - .004), w, h, .013, yaw);
  for (const s of [-1, 1]) {
    const k = w * .38 * s;
    b.box(p.brassDark, x + Math.cos(yaw) * k + Math.sin(yaw) * (d / 2 + .003),
      y + h / 2, z + Math.cos(yaw) * (d / 2 + .003) - Math.sin(yaw) * k, .008, h * .77, .007, yaw);
  }
}

export function mug(b, p, x, y, z, size = 1, color = p.ceramic) {
  const r = .042 * size;
  const h = .085 * size;
  b.cylinder(color, x, y + h / 2, z, r, r * .84, h);
  b.cylinder(p.darkWood, x, y + h, z, r * .80, r * .80, .001, 'y', 14, false);
  b.torus(color, x, y + h - .001, z, r * .92, .0044 * size, 'y', 16);
  b.torus(color, x + r * .99, y + h * .55, z, r * .57, .0060 * size, 'z', 16);
}

export function bottle(b, p, x, y, z, size, color, kind = 0) {
  const r = .045 * size;
  const body = .112 * size;
  const shoulder = .029 * size;
  const lip = .018 * size;
  const neck = kind === 1 ? .040 * size : .029 * size;
  b.cylinder(color, x, y + body / 2, z, r, r * .96, body, 'y', 12);
  b.cylinder(color, x, y + body + shoulder / 2, z, r * .45, r, shoulder, 'y', 12);
  b.cylinder(color, x, y + body + shoulder + neck / 2, z, r * .45, r * .45, neck, 'y', 12);
  b.cylinder(color, x, y + body + shoulder + neck, z, r * .59, r * .60, lip, 'y', 12);
  b.cylinder(p.cork, x, y + body + shoulder + neck + lip * .67, z, r * .44, r * .40, lip, 'y', 10);
  if (kind >= 0) {
    b.box(p.paper, x, y + body * .56, z + r * .95, r * 1.14, body * .57, .006);
    b.box(p.brassDark, x, y + body * .65, z + r * 1.03, r * .71, body * .068, .0016, 0, 0, 0, false);
    b.box(p.brassDark, x, y + body * .49, z + r * 1.03, r * .55, body * .041, .0016, 0, 0, 0, false);
  }
}

export function tin(b, p, x, y, z, r, h, color = p.red) {
  b.cylinder(color, x, y + h / 2, z, r, r * .98, h, 'y', 16);
  b.cylinder(p.tin, x, y + h - .004, z, r * 1.044, r * 1.044, .018, 'y', 18);
  b.torus(p.tinDark, x, y + h + .005, z, r * .797, .0025, 'y', 20, false);
  b.torus(p.tinDark, x, y + .009, z, r * .987, .005, 'y', 16, false);
  b.box(p.paper, x, y + h * .51, z + r * .925, r * 1.09, h * .43, .011);
  b.box(p.wine, x, y + h * .54, z + r * .93 + .0066, r * .73, h * .062, .002, 0, 0, 0, false);
}

export function spool(b, p, x, y, z, size, color) {
  const r = .035 * size;
  const h = .070 * size;
  b.cylinder(color, x, y + h * .5, z, r * .80, r * .82, h * .81, 'y', 12);
  for (const at of [.006 * size, h - .006 * size]) b.cylinder(p.honey, x, y + at, z, r, r, .013 * size, 'y', 12);
  for (const at of [.24, .37, .50, .63, .74]) b.torus(color, x, y + h * at, z, r * .81, .0016 * size, 'y', 12, false);
  b.cylinder(p.darkWood, x, y + h + .0008, z, r * .30, r * .30, .003, 'y', 8, false);
}

export function clothRoll(b, p, x, y, z, span, radius, color) {
  b.cylinder(color, x, y + radius, z, radius, radius, span, 'x', 16);
  for (const s of [-1, 1]) {
    b.cylinder(p.flax, x + s * span / 2, y + radius, z, radius * .86, radius * .86, .002, 'x', 16);
    for (const rad of [.73, .51, .26]) b.torus(color, x + s * (span / 2 + .002), y + radius, z,
      radius * rad, .003, 'x', 16, false);
  }
  for (const s of [-.31, .32]) b.cylinder(p.leather, x + s * span, y + radius, z, radius * 1.035, radius * 1.035, .023, 'x', 16);
  b.box(p.paper, x + span * .31, y + radius * 1.75, z + radius * .67, .079, .035, .008, 0, 0, -.57);
}

export function lantern(b, p, x, y, z, size = 1, lit = true) {
  const rr = .079 * size;
  b.cylinder(p.brassDark, x, y, z, rr, rr, .03 * size);
  b.cylinder(p.brass, x, y + .020 * size, z, rr * .80, rr * .93, .017 * size);
  for (let i = 0; i < 5; i++) {
    const a = i * Math.PI * .4 + .28;
    const dx = Math.cos(a), dz = Math.sin(a);
    b.rod(p.brassDark, [x + rr * .85 * dx, y, z + rr * .85 * dz],
      [x + rr * .75 * dx, y + .14 * size, z + rr * .75 * dz], .013 * size);
  }
  b.cylinder(p.brass, x, y + .145 * size, z, rr * .72, rr * .90, .019 * size);
  b.cylinder(p.brassDark, x, y + .166 * size, z, rr * .35, rr * .73, .034 * size);
  b.cylinder(p.blackIron, x, y + .191 * size, z, rr * .36, rr * .36, .016 * size);
  b.torus(p.blackIron, x, y + .229 * size, z, .033 * size, .0056 * size, 'z', 18);
  if (lit) {
    b.oval(p.lamp, x, y + .071 * size, z, .036 * size, .047 * size, .036 * size);
    b.cylinder(p.copper, x, y + .026 * size, z, rr * .53, rr * .51, .018 * size);
  } else {
    b.cylinder(p.soot, x, y + .032 * size, z, rr * .49, rr * .49, .036 * size);
  }
}

export function scissors(b, p, x, y, z, s = 1) {
  for (const side of [-1, 1]) {
    b.torus(p.brassDark, x + side * .032 * s, y, z + .058 * s, .022 * s, .0059 * s, 'y', 14);
    b.rod(p.ironLight, [x + side * .024 * s, y, z + .047 * s],
      [x - side * .029 * s, y, z - .10 * s], .010 * s, .008 * s);
  }
  b.cylinder(p.brass, x, y + .003, z - .011 * s, .008 * s, .008 * s, .011 * s, 'y', 10);
}

export function wovenBasket(b, p, x, y, z, r, h) {
  b.cylinder(p.endgrain, x, y + h / 2, z, r * .901, r * .70, h, 'y', 18);
  for (let j = 0; j < 7; j++) {
    const k = j / 6;
    b.torus(j % 3 === 0 ? p.rope : p.cork, x, y + k * h, z, (k * .20 + .71) * r,
      j === 6 ? .016 : .008, 'y', 22);
  }
  for (let i = 0; i < 12; i++) {
    const a = i / 6 * Math.PI;
    const dx = Math.cos(a), dz = Math.sin(a);
    b.rod(p.flax, [x + dx * r * .72, y, z + dz * r * .72],
      [x + dx * r * .91, y + h, z + dz * r * .91], .013);
  }
  b.cylinder(p.darkWood, x, y + h + .004, z, r * .857, r * .857, .008, 'y', 18);
}

export function printedLabel(title, caption) {
  return decalMaterial(256, 128, (ctx, w, h) => {
    ctx.fillStyle = '#d9bd85';
    ctx.fillRect(0, 0, w, h);
    const rand = rng(718);
    for (let i = 0; i < 330; i++) {
      ctx.fillStyle = i % 2 ? '#5d3a221a' : '#fff8d92e';
      ctx.fillRect(rand() * w, rand() * h, rand() * 4 + 1, rand() * 2 + 1);
    }
    ctx.strokeStyle = '#82664a';
    ctx.lineWidth = 2;
    ctx.strokeRect(10, 10, w - 20, h - 20);
    ctx.fillStyle = '#372e25';
    ctx.font = 'bold 33px Georgia';
    ctx.textAlign = 'center';
    ctx.fillText(title, w / 2, 58);
    ctx.font = '18px Georgia';
    ctx.fillText(caption, w / 2, 96);
  });
}

import * as THREE from '../vendor/three.module.min.js';
import { frame } from './build.js';

export const FLOOR = [-Math.PI / 2, 0, 0];
export const FORWARD = [Math.PI / 2, 0, 0];
export const CROSS = [0, 0, Math.PI / 2];
export const BACK = [0, Math.PI, 0];
const lensDisc = new THREE.CircleGeometry(1, 32);
const lensScale = new THREE.Vector3();

export function bolt(b, m, f, x, y, z, r = .016, direction = FORWARD) {
  b.cylinder(f, r * 1.18, r * 1.18, .006, x, y, z, m.dullSteel, direction, 12);
  b.cylinder(f, r, r, .010, x, y, z + (direction === FORWARD ? .008 : 0), m.bolt, direction, 6);
  if (direction === FORWARD && r > .013) {
    b.box(f, r * .70, .0035, .0013, x, y, z + .0135, m.graphite, [0, 0, (x + y) * 9]);
  }
}

export function lamp(b, m, f, x, y, z, material, r = .015, rotation = FORWARD) {
  b.cylinder(f, r * 1.37, r * 1.37, .015, x, y, z, m.graphite, rotation, 12);
  b.cylinder(f, r, r, .018, x, y, z, material, rotation, 12);
}

export function lensFace(b, m, f, radius, x, y, z, rotation) {
  lensScale.set(radius, radius, 1);
  b.part(f, lensDisc, x, y, z, m.lensPrint, rotation, lensScale);
}

export function monitor(b, m, f, x, y, z, w, h, image, lean = -.11) {
  const standY = y - h / 2 - .089;
  b.rounded(f, w * .47, .031, .218, .012, x, standY - .078, z -.06, m.graphite);
  b.box(f, .061, .20, .045, x, standY + .02, z -.095, m.steel);
  b.box(f, .168, .115, .055, x, y - .07, z -.065, m.graphite);
  const sf = frame(x, y, z, [lean, 0, 0], f);
  b.rounded(sf, w, h, .060, .029, 0, 0, 0, m.graphite);
  b.rounded(sf, w - .031, h - .031, .015, .017, 0, .003, .034, m.ink);
  b.decal(sf, w - .065, h - .068, 0, .012, .043, image);
  lamp(b, m, sf, w / 2 - .038, -h / 2 + .023, .043, m.lightGreen, .006);
  for (const x of [-w * .27, w * .27]) {
    b.box(sf, .13, .095, .020, x, -.049, -.034, m.ink);
    for (let i = 0; i < 6; ++i) b.box(sf, .099, .004, .003, x, -.086 + i * .013, -.045, m.dullSteel);
  }
}

export function handle(b, m, f, x, y, z, length = .21) {
  b.rod(f, [x - length / 2, y, z + .021], [x + length / 2, y, z + .021], .010, m.steel, 12);
  for (const side of [-1, 1]) b.rod(f, [x + side * length / 2, y, z - .005], [x + side * length / 2, y, z + .021], .012, m.steel, 12);
}

export function railBench(b, m, f, width, height, depth, frameMaterial) {
  const foot = .055;
  b.plane(f, width + .70, depth + .73, 0, .010, .10, m.contactShadow, FLOOR);
  for (const x of [-width / 2 + .13, width / 2 - .13]) {
    for (const z of [-depth / 2 + .10, depth / 2 - .10]) {
      b.rounded(f, .076, height - .16, .077, .013, x, (height - .16) / 2 + foot, z, frameMaterial);
      b.cylinder(f, .046, .058, .030, x, .026, z, m.rubber, undefined, 16);
      b.cylinder(f, .026, .026, .025, x, .051, z, m.steel, undefined, 16);
    }
    b.box(f, .055, .055, depth - .10, x, .23, 0, frameMaterial);
    b.box(f, .065, .068, depth - .08, x, height - .10, 0, frameMaterial);
  }
  b.box(f, width - .16, .078, .063, 0, height - .104, depth / 2 - .076, frameMaterial);
  b.box(f, width - .16, .071, .073, 0, height - .111, -depth / 2 + .067, frameMaterial);
  b.box(f, width - .20, .081, .068, 0, .24, -depth / 2 + .105, frameMaterial);
  b.rounded(f, width, .070, depth, .021, 0, height - .032, 0, m.plywood);
  b.rounded(f, width + .024, .024, depth + .017, .012, 0, height + .006, 0, m.bench);
  for (let i = 0; i < 3; ++i) b.box(f, width - .07, .0028, .0028, 0, height - .053 + .013 * i, depth / 2 + .001, i % 2 ? m.cream : m.bench);
}

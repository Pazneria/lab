import * as THREE from '../vendor/three.module.js';
import { clamp, hut, lerp, random, rampHeight, snowHeight, windows } from './layout.js';
import { plate } from './textures.js';

const wallTop = 3.24;
const base = 0.21;
const half = hut.wall / 2;
const door = {
  start: hut.doorX - hut.doorWidth / 2,
  end: hut.doorX + hut.doorWidth / 2,
  low: 0.32,
  high: hut.doorTop,
};
const localDoor = { ...door, start: -hut.doorWidth / 2, end: hut.doorWidth / 2 };
const mainZ = (hut.back + hut.front) / 2;
const mainHalfZ = (hut.front - hut.back) / 2;
const vesZ = (hut.front + hut.vestibuleFront) / 2;
const vesHalfZ = (hut.vestibuleFront - hut.front) / 2;

function remap(hole, coordinate) {
  return { ...hole, start: Math.min(coordinate(hole.start), coordinate(hole.end)),
    end: Math.max(coordinate(hole.start), coordinate(hole.end)) };
}

export function makeShelter(scene, mesh, m) {
  const outside = mesh.at('outer shell');
  const inside = mesh.at('inner shell');
  const west = mesh.at('west shell', hut.left, 0, mainZ, -Math.PI / 2);
  const east = mesh.at('east shell', hut.right, 0, mainZ, Math.PI / 2);
  const back = mesh.at('rear shell', 0, 0, hut.back, Math.PI);
  const front = mesh.at('front shell', 0, 0, hut.front);
  const vestibuleDoor = mesh.at('vestibule shell', hut.doorX, 0, hut.vestibuleFront);
  const vestibuleEast = mesh.at('vestibule shell', hut.doorX + hut.vestibuleHalf, 0, vesZ, Math.PI / 2);
  const vestibuleWest = mesh.at('vestibule shell', hut.doorX - hut.vestibuleHalf, 0, vesZ, -Math.PI / 2);
  const eastWindow = remap(windows.east, z => mainZ - z);
  const westWindow = remap(windows.west, z => z - mainZ);
  const sideWindow = remap(windows.vestibule, z => vesZ - z);
  const exposed = [[hut.left, hut.doorX - hut.vestibuleHalf], [hut.doorX + hut.vestibuleHalf, hut.right]];
  wall(front, m, hut.left, hut.right, wallTop, [door, windows.front], { exposed });
  wall(back, m, hut.left, hut.right, wallTop, []);
  wall(east, m, -mainHalfZ, mainHalfZ, wallTop, [eastWindow]);
  wall(west, m, -mainHalfZ, mainHalfZ, wallTop, [westWindow]);
  wall(vestibuleDoor, m, -hut.vestibuleHalf, hut.vestibuleHalf, 2.89, [localDoor], { vest: true });
  wall(vestibuleWest, m, -vesHalfZ, vesHalfZ, 2.90, [], { vest: true });
  wall(vestibuleEast, m, -vesHalfZ, vesHalfZ, 2.90, [sideWindow], { vest: true });

  windowFrame(front, m, windows.front, 'living room window', 3, 192);
  windowFrame(east, m, eastWindow, 'galley window', 2, 5313);
  windowFrame(west, m, westWindow, 'storage window', 1, 2851);
  windowFrame(vestibuleEast, m, sideWindow, 'vestibule window', 1, 5223);
  doorFrame(front.at(hut.doorX, 0, 0), m, false);
  doorFrame(vestibuleDoor, m, true);
  foundation(outside, m);
  makeFloors(outside, inside, m);
  roof(scene, mesh, m);
  deck(mesh, m);
  signage(front, vestibuleDoor, back, m);
  exteriorEquipment(mesh, m);
}

function openingPieces(start, end, low, high, holes, callback) {
  const edges = [start, end];
  for (const h of holes) {
    if (h.start > start && h.start < end) edges.push(h.start);
    if (h.end > start && h.end < end) edges.push(h.end);
  }
  edges.sort((a, b) => a - b);
  for (let i = 1; i < edges.length; i++) {
    const l = edges[i - 1];
    const r = edges[i];
    if (r - l < 0.003) continue;
    const mid = (l + r) / 2;
    const h = holes.find(hole => mid > hole.start && mid < hole.end);
    if (!h || high <= h.low || low >= h.high) callback(l, r, low, high);
    else {
      if (low < h.low) callback(l, r, low, Math.min(high, h.low));
      if (high > h.high) callback(l, r, Math.max(low, h.high), high);
    }
  }
}

function wall(p, m, start, end, top, holes, options = {}) {
  const rng = random(2783 + Math.floor((top + end) * 100));
  const vest = options.vest;
  const skin = vest ? m.oxide : m.ember;
  openingPieces(start, end, base, top, holes, (a, b, y0, y1) => {
    p.box(m.cladding, (a + b) / 2, (y0 + y1) / 2, 0, b - a, y1 - y0, hut.wall, 0, 0, 0, 1);
  });

  for (const [from, to] of options.exposed ?? [[start, end]]) {
    const count = Math.ceil((to - from) / (vest ? 0.275 : 0.38));
    const spacing = (to - from) / count;
    for (let i = 0; i < count; i++) {
      const x = from + spacing * (i + 0.5);
      const face = i % 7 === 5 ? m.ochre : i % 6 === 2 ? m.oxide : skin;
      openingPieces(x - spacing / 2 + 0.0035, x + spacing / 2 - 0.0035, 0.37, top - 0.08, holes, (a, b, y0, y1) => {
        if (y1 - y0 > 0.025) p.box(face, (a + b) / 2, (y0 + y1) / 2, half + 0.012, b - a, y1 - y0, 0.034);
      });
      const ridgeX = x - spacing / 2 + 0.041;
      openingPieces(ridgeX - 0.018, ridgeX + 0.018, 0.39, top - 0.11, holes, (a, b, y0, y1) => {
        if (y1 - y0 < 0.035) return;
        p.box(skin, (a + b) / 2, (y0 + y1) / 2, half + 0.034, b - a, y1 - y0, 0.036);
        for (const y of [y0 + 0.082, y1 - 0.086]) {
          if (y < y0 + 0.02 || y > y1 - 0.02) continue;
          screw(p, m, ridgeX, y, half + 0.056, 0.009, 1);
        }
      });
    }
    for (const [y, height, material] of [[0.345, 0.142, m.ink], [top - 0.053, 0.115, skin]]) {
      openingPieces(from, to, y - height / 2, y + height / 2, holes, (a, b, y0, y1) => {
        p.box(material, (a + b) / 2, (y0 + y1) / 2, half + 0.033, b - a, y1 - y0, 0.060);
      });
    }
    for (let i = 0; i < (to - from) * 23; i++) {
      const x = lerp(from + 0.025, to - 0.025, rng());
      const low = rng() < 0.80;
      const y = low ? 0.402 + rng() ** 3 * 0.28 : top - 0.090 - rng() ** 2 * 0.051;
      if (holes.some(g => x > g.start - 0.029 && x < g.end + 0.029 && y > g.low && y < g.high)) continue;
      p.box(rng() < 0.40 ? m.snowDirty : m.frost, x, y, half + 0.063 + rng() * 0.01,
        0.013 + rng() ** 2 * 0.088, 0.004 + rng() ** 2 * 0.019, 0.0025 + rng() * 0.008, 0, 0, (rng() - 0.5) * 0.7);
    }
  }

  const count = Math.ceil((end - start) / (vest ? 0.62 : 1.01));
  const spacing = (end - start) / count;
  const ceiling = vest ? hut.vestibuleCeiling : hut.ceiling;
  for (let i = 0; i < count; i++) {
    const x = start + spacing * i;
    openingPieces(x + 0.008, x + spacing - 0.008, 0.53, ceiling, holes, (a, b, y0, y1) => {
      if (y1 - y0 < 0.014) return;
      p.box((i % 4 === 1 || (vest && i % 4 === 0)) ? m.panelAlt : m.panel,
        (a + b) / 2, (y0 + y1) / 2, -half - 0.013, b - a, y1 - y0, 0.028);
    });
    const joint = x + spacing;
    if (i < count - 1) {
      openingPieces(joint - 0.011, joint + 0.011, 0.52, ceiling, holes, (a, b, y0, y1) => {
        p.box(m.seam, (a + b) / 2, (y0 + y1) / 2, -half - 0.005, b - a, y1 - y0, 0.019);
      });
    }
    for (const y of [0.62, ceiling - 0.13]) {
      for (const offset of [0.051, spacing - 0.051]) {
        if (holes.some(h => x + offset > h.start - 0.015 && x + offset < h.end + 0.015 && y > h.low && y < h.high)) continue;
        screw(p, m, x + offset, y, -half - 0.032, 0.008, -1);
      }
    }
  }
  for (const [low, high, material] of [[0.389, 0.54, m.baseboard], [ceiling - 0.065, ceiling + 0.016, m.trim]]) {
    openingPieces(start, end, low, high, holes, (a, b, y0, y1) => {
      p.box(material, (a + b) / 2, (y0 + y1) / 2, -half - 0.034, b - a, y1 - y0, 0.036);
    });
  }
}

function screw(p, m, x, y, z, radius, out) {
  p.cyl(m.boltDark, x, y, z, radius * 1.24, 0.0042, 8, Math.PI / 2);
  p.cyl(m.zinc, x, y, z + out * 0.004, radius, 0.005, 6, Math.PI / 2);
  p.box(m.boltDark, x, y, z + out * 0.007, radius * 1.09, radius * 0.23, 0.0017, 0, 0, 0.39);
}

function windowFrame(p, m, hole, name, count, seed) {
  const w = hole.end - hole.start;
  const h = hole.high - hole.low;
  const x = (hole.start + hole.end) / 2;
  const y = (hole.low + hole.high) / 2;
  const core = 0.053;
  const slot = w / count;
  for (const side of [-1, 1]) {
    const z = side * (half + 0.063);
    const trim = side > 0 ? m.roofDark : m.trim;
    for (const j of [-1, 1]) {
      p.box(trim, x + j * w / 2, y, z, 0.098, h + 0.119, 0.092);
      p.box(trim, x, y + j * h / 2, z, w + 0.186, 0.078, 0.096);
      for (const yy of [y - h / 2 + 0.068, y, y + h / 2 - 0.068]) {
        screw(p, m, x + j * w / 2, yy, z + side * 0.051, 0.011, side);
      }
    }
    for (let i = 1; i < count; i++) {
      p.box(trim, hole.start + i * slot, y, z - side * 0.022, 0.058, h, 0.080);
      p.box(m.coal, hole.start + i * slot, y, z - side * 0.065, core + 0.018, h, 0.043);
    }
    p.box(side === 1 ? m.zinc : m.trim, x, hole.low - 0.047, side * (half + 0.088), w + 0.23, 0.033, 0.191, side * 0.05);
  }
  for (let i = 0; i < count; i++) {
    const sx = hole.start + (i + 0.5) * slot;
    p.plane(m.window, sx, y, 0.028, slot - 0.036, h - 0.025);
  }
  for (const d of [-1, 1]) {
    p.box(m.coal, x + d * (w / 2 - core / 2), y, 0.019, core, h + 0.032, 0.196);
    p.box(m.coal, x, y + d * h / 2, 0.019, w, core, 0.196);
  }
  const rng = random(seed);
  for (let i = 0; i < Math.floor(w * 48); i++) {
    const xx = x + (rng() - 0.5) * w * 1.043;
    const yy = hole.low - 0.021 + rng() ** 3 * 0.034;
    const zz = 0.205 + rng() * 0.061;
    p.box(rng() > 0.3 ? m.frost : m.ice, xx, yy, zz,
      0.014 + rng() ** 2 * 0.068, 0.003 + rng() * 0.009, 0.014 + rng() ** 2 * 0.075, 0, rng(), 0);
  }
  const latchX = hole.start + slot * 0.68;
  p.box(m.zinc, latchX, hole.low + 0.119, -0.166, 0.059, 0.129, 0.028);
  p.rod(m.ink, [latchX, hole.low + 0.098, -0.192], [latchX + 0.092, hole.low + 0.098, -0.212], 0.016);
}

function doorFrame(p, m, outer) {
  const w = hut.doorWidth;
  const bottom = hut.floor;
  const top = hut.doorTop;
  const y = (top + bottom) / 2;
  const h = top - bottom;
  const frame = outer ? m.roofDark : m.baseboard;
  for (const side of [-1, 1]) {
    p.box(frame, side * (w / 2 + 0.008), y, 0, 0.098, h + 0.1, 0.34, 0, 0, 0, 1);
    p.box(m.coal, side * (w / 2 - 0.037), y, 0.012, 0.024, h, 0.198);
    p.box(m.zinc, side * (w / 2 - 0.008), y, 0.18, 0.042, h + 0.045, 0.041);
    for (const dy of [0.105, 0.41, 1.07, 1.68, 1.99]) {
      screw(p, m, side * (w / 2 + 0.007), bottom + dy, 0.207, 0.011, 1);
    }
  }
  p.box(frame, 0, top + 0.022, 0, w + 0.178, 0.112, 0.329, 0, 0, 0, 1);
  p.box(m.coal, 0, top - 0.029, 0.017, w - 0.064, 0.023, 0.195);
  p.box(m.zinc, 0, bottom + 0.009, 0, w + 0.037, 0.017, 0.245);
  for (let i = -4; i <= 4; i++) {
    p.box(m.roofDark, i * 0.118, bottom + 0.019, 0, 0.074, 0.006, 0.129);
  }

  const hinge = p.at(-w / 2 + (outer ? -0.038 : 0.012), 0, 0.12, -Math.PI / 2 + (outer ? -0.046 : 0.027));
  const leaf = outer ? 1.01 : 0.86;
  const yMid = bottom + 1.032;
  const glassY = bottom + 1.49;
  const port = [{ start: leaf / 2 - 0.146, end: leaf / 2 + 0.146,
    low: glassY - 0.205, high: glassY + 0.205 }];
  for (const [offset, height, thickness, material, shadow] of [
    [0, 2.026, 0.097, m.coal, 1], [0.023, 1.968, 0.113, outer ? m.ember : m.panelAlt, 0],
  ]) {
    openingPieces(offset, leaf - offset, yMid - height / 2, yMid + height / 2, port, (a, b, y0, y1) => {
      hinge.box(material, (a + b) / 2, (y0 + y1) / 2, 0, b - a, y1 - y0, thickness, 0, 0, 0, shadow);
    });
  }
  hinge.box(outer ? m.oxide : m.trim, leaf / 2, bottom + 0.106, -0.062, leaf - 0.072, 0.163, 0.018);
  hinge.plane(m.window, leaf / 2, glassY, 0, 0.298, 0.425);
  for (const side of [-1, 1]) {
    const z = side * 0.068;
    for (const edge of [-1, 1]) {
      hinge.box(m.roofDark, leaf / 2 + edge * 0.168, glassY, z, 0.046, 0.474, 0.035);
      hinge.box(m.roofDark, leaf / 2, glassY + edge * 0.217, z, 0.357, 0.041, 0.037);
    }
    hinge.box(m.zinc, leaf - 0.10, bottom + 0.98, z, 0.096, 0.200, 0.028);
    hinge.rod(m.coal, [leaf - 0.10, bottom + 1.03, z + side * 0.027],
      [leaf - 0.26, bottom + 1.03, z + side * 0.091], 0.021, 10);
  }
  for (const yy of [bottom + 0.26, bottom + 1.00, bottom + 1.81]) {
    hinge.cyl(m.zinc, 0.014, yy, -0.065, 0.031, 0.155, 9);
    hinge.cyl(m.silver, 0.014, yy + 0.084, -0.065, 0.023, 0.015, 8);
  }
  if (outer) {
    p.box(m.ink, 0, 2.689, 0.188, 0.59, 0.109, 0.16);
    p.box(m.warmOpal, 0, 2.661, 0.242, 0.493, 0.068, 0.087);
    p.box(m.roofDark, 0, 2.729, 0.282, 0.64, 0.036, 0.244, 0.19);
    for (const x of [-0.187, -0.093, 0, 0.093, 0.187]) {
      p.rod(m.zinc, [x, 2.612, 0.282], [x, 2.696, 0.298], 0.0049, 6);
    }
  }
}

function foundation(p, m) {
  const length = hut.front - hut.back;
  const center = (hut.front + hut.back) / 2;
  p.box(m.roofDark, 0, 0.242, center, 8.61, 0.217, length + 0.11, 0, 0, 0, 1);
  p.box(m.ink, hut.doorX, 0.25, vesZ, hut.vestibuleHalf * 2 + 0.23, 0.217, 2.32, 0, 0, 0, 1);
  for (const z of [hut.back + 0.49, -2.2, 0.94]) {
    p.box(m.steel, 0, 0.161, z, 8.75, 0.15, 0.163, 0, 0, 0, 1);
    for (const x of [-3.83, 3.83]) {
      p.box(m.roofDark, x, -0.121, z, 0.24, 0.48, 0.24);
      p.box(m.zinc, x, 0.118, z, 0.41, 0.035, 0.34);
      p.box(m.roofDark, x, -0.29, z, 0.52, 0.10, 0.45);
    }
  }
  for (const x of [hut.left, hut.right]) {
    for (const z of [hut.back, hut.front]) {
      p.box(m.burgundy, x, 1.741, z, 0.255, 2.93, 0.255, 0, 0, 0, 1);
      for (const y of [0.47, 0.74, 1.48, 2.22, 2.94, 3.08]) {
        p.cyl(m.zinc, x + Math.sign(x) * 0.135, y, z, 0.022, 0.012, 6, 0, 0, Math.PI / 2);
        p.cyl(m.zinc, x, y, z + (z === hut.front ? 0.135 : -0.135), 0.022, 0.012, 6, Math.PI / 2);
      }
    }
  }
}

function makeFloors(outside, inner, m) {
  const width = hut.right - hut.left;
  const length = hut.front - hut.back;
  const y = hut.floor;
  inner.box(m.seam, 0, y - 0.028, mainZ, width, 0.054, length, 0, 0, 0, 1);
  const rows = 8;
  const columns = 9;
  for (let i = 0; i < rows; i++) {
    const z = hut.back + (i + 0.5) * length / rows;
    for (let j = 0; j < columns; j++) {
      const x = hut.left + (j + 0.5) * width / columns;
      inner.box((i + j * 3) % 7 === 0 ? m.linoAlt : m.lino,
        x, y - 0.008, z, width / columns - 0.004, 0.017, length / rows - 0.004);
    }
  }
  inner.box(m.coal, hut.doorX, y - 0.04, vesZ, hut.vestibuleHalf * 2 + 0.08, 0.08, vesHalfZ * 2, 0, 0, 0, 1);
  for (let i = 0; i < 7; i++) {
    inner.box(m.tread, hut.doorX, y - 0.005, hut.front + (i + 0.5) * vesHalfZ * 2 / 7,
      2.00, 0.014, vesHalfZ * 2 / 7 - 0.008);
  }

  for (let i = 0; i < 8; i++) {
    inner.box(m.ceiling, hut.left + (i + 0.5) * width / 8, hut.ceiling + 0.03, mainZ,
      width / 8 - 0.01, 0.075, length, 0, 0, 0, 1);
  }
  for (const x of [-3.9, -2.11, 0.03, 2.12, 3.91]) {
    inner.box(m.trim, x, hut.ceiling - 0.013, mainZ, 0.068, 0.050, length - 0.22);
    for (const z of [-4.05, -2.72, -1.35, 0.00, 1.15]) {
      inner.cyl(m.steel, x, hut.ceiling - 0.042, z, 0.012, 0.009, 6);
    }
  }
  inner.box(m.panelAlt, hut.doorX, hut.vestibuleCeiling + 0.039, vesZ,
    hut.vestibuleHalf * 2 + 0.13, 0.078, vesHalfZ * 2 + 0.04, 0, 0, 0, 1);
  for (const z of [1.83, 2.50, 3.37]) {
    inner.box(m.trim, hut.doorX, hut.vestibuleCeiling - 0.024, z, 2.00, 0.059, 0.079);
  }
}

function roofY(x) {
  return x <= 0.22 ? 3.30 + (x + 4.55) * 0.082 : 3.691 - (x - 0.22) * 0.088;
}

function roof(scene, mesh, m) {
  const p = mesh.at('roof');
  const left = -4.55;
  const right = 4.55;
  const gable = 0.22;
  const z0 = hut.back - 0.30;
  const z1 = hut.front + 0.30;
  const zMid = (z0 + z1) / 2;
  const length = z1 - z0;
  for (const [a, b] of [[left, gable], [gable, right]]) {
    const angle = Math.atan2(roofY(b) - roofY(a), b - a);
    p.box(m.roofDark, (a + b) / 2, (roofY(a) + roofY(b)) / 2 - 0.025, zMid,
      (b - a) / Math.cos(angle), 0.142, length, 0, 0, angle, 1);
    const plates = 11;
    for (let i = 0; i < plates; i++) {
      const x = lerp(a, b, (i + 0.5) / plates);
      const edge = lerp(a, b, i / plates) + 0.023;
      p.box(i % 5 === 1 ? m.roofLight : m.roof, x, roofY(x) + 0.053, zMid,
        (b - a) / plates / Math.cos(angle) - 0.007, 0.060, length + 0.03, 0, 0, angle);
      p.box(m.roofDark, edge, roofY(edge) + 0.096, zMid, 0.031, 0.054, length + 0.058);
      for (const z of [z0 + 0.053, z1 - 0.06]) {
        p.cyl(m.zinc, edge + 0.080, roofY(edge + 0.08) + 0.092, z, 0.019, 0.012, 6);
      }
    }
    for (const z of [z0 + 0.016, z1 - 0.016]) {
      p.box(m.roofDark, (a + b) / 2, (roofY(a) + roofY(b)) / 2 - 0.055, z,
        (b - a + 0.036) / Math.cos(angle), 0.188, 0.078, 0, 0, angle);
      const count = 20;
      for (let i = 0; i < count; i++) {
        const x = lerp(a, b, (i + 0.5) / count);
        const y = roofY(x) - 0.076;
        const wallZ = z > 0 ? hut.front : hut.back;
        p.box(m.oxide, x, (wallTop + y) / 2 - 0.022, wallZ,
          (b - a) / count + 0.001, Math.max(0.035, y - wallTop + 0.052), 0.22);
        p.cyl(m.zinc, x, roofY(x) - 0.041, z + (z > 0 ? 0.047 : -0.047), 0.010, 0.011, 6, Math.PI / 2);
      }
    }
  }
  p.box(m.roofLight, gable, roofY(gable) + 0.11, zMid, 0.24, 0.07, length + 0.047);
  for (const x of [left, right]) {
    p.box(m.roofDark, x, roofY(x) - 0.013, zMid, 0.112, 0.167, length + 0.035);
    p.box(m.steel, x + Math.sign(x) * 0.035, roofY(x) + 0.042, zMid, 0.099, 0.033, length + 0.12);
  }

  const start = hut.front + 0.02;
  const end = hut.vestibuleFront + 0.32;
  const lengthVest = end - start;
  const slope = 0.079;
  const vesRoofY = z => 3.073 - (z - start) * slope;
  p.box(m.roofDark, hut.doorX, vesRoofY((start + end) / 2), (start + end) / 2,
    2.65, 0.133, lengthVest / Math.cos(slope), slope, 0, 0, 1);
  const plateCount = 6;
  for (let i = 0; i < plateCount; i++) {
    const x = hut.doorX - 1.321 + (i + 0.5) * 2.642 / plateCount;
    p.box(i % 3 === 2 ? m.roofLight : m.roof, x, vesRoofY((start + end) / 2) + 0.073,
      (start + end) / 2, 2.642 / plateCount - 0.011, 0.037, lengthVest, slope);
    p.box(m.zinc, x - 0.21, vesRoofY((start + end) / 2) + 0.089, (start + end) / 2,
      0.030, 0.045, lengthVest + 0.044, slope);
  }
  for (let i = 0; i < 14; i++) {
    const z = lerp(start + 0.04, hut.vestibuleFront - 0.028, i / 13);
    const y = vesRoofY(z) - 0.061;
    if (y <= 2.893) continue;
    for (const side of [-1, 1]) {
      p.box(m.oxide, hut.doorX + side * hut.vestibuleHalf, (2.88 + y) / 2, z,
        0.217, y - 2.88, 0.170);
    }
  }
  p.box(m.roofDark, hut.doorX, vesRoofY(end) + 0.011, end, 2.73, 0.154, 0.107, 0, 0, 0, 1);
  p.box(m.zinc, hut.doorX, vesRoofY(end) + 0.080, end + 0.039, 2.73, 0.039, 0.067);

  const rng = random(46610);
  for (const [width, xpos, zpos, height] of [
    [2.55, hut.doorX, end + 0.061, vesRoofY(end) + 0.10], [8.85, 0, z1 + 0.03, null],
    [8.85, 0, z0 - 0.026, null],
  ]) {
    for (let i = 0; i < width * 16; i++) {
      const x = xpos + (rng() - 0.5) * width;
      const y = height ?? (roofY(x) + 0.016);
      if (Math.sin(x * 3.9 + zpos) * 0.42 + Math.sin(x * 8.1) * 0.21 + rng() < 0.45) continue;
      p.box(rng() > 0.20 ? m.frost : m.ice, x, y + rng() * 0.019, zpos,
        0.018 + rng() ** 2 * 0.108, 0.007 + rng() ** 2 * 0.033, 0.019 + rng() ** 2 * 0.069,
        0, rng() * 0.9, (rng() - 0.5) * 0.4);
      if (rng() < 0.081 && (height || x > 2)) {
        const depth = 0.045 + rng() ** 3 * 0.151;
        p.rod(m.ice, [x, y - 0.073, zpos + 0.018],
          [x + 0.012, y - 0.075 - depth, zpos + 0.024], 0.012 + depth * 0.019, 6, 0.075);
      }
    }
  }
  const roofSnow = m.snow.clone();
  roofSnow.name = 'roof snow crust';
  roofSnow.map = null;
  for (const [x, z, spreadX, spreadZ, height] of [
    [-2.83, -3.71, 1.58, 1.13, 0.09], [2.84, -4.18, 1.54, 0.69, 0.081],
    [3.82, -0.10, 0.62, 1.60, 0.056], [-2.63, 3.65, 0.67, 0.22, 0.049],
  ]) {
    const surface = z > 2 ? (x, z) => vesRoofY(z) + 0.101 : (x, z) => roofY(x) + 0.101;
    roofPatch(scene, roofSnow, x, z, spreadX, spreadZ, height, surface);
  }
  exhaust(p, m, -2.99, -2.57, roofY(-2.99) + 0.09);
}

function roofPatch(scene, material, x, z, dx, dz, height, surface) {
  const vertices = [];
  const indices = [];
  const span = 50;
  const rings = 7;
  for (let j = 0; j <= rings; j++) {
    const f = (j + 0.04) / (rings + 0.04);
    for (let i = 0; i <= span; i++) {
      const t = i / span * Math.PI * 2;
      const ripple = 1 + (Math.sin(t * 7) * 0.079 + Math.cos(t * 13 - 0.4) * 0.089) * f;
      const xx = x + Math.cos(t) * dx * f * ripple;
      const zz = z + Math.sin(t) * dz * f * ripple;
      vertices.push(xx, surface(xx, zz) + height * (1 - f * f) ** 1.72, zz);
      if (j === rings || i === span) continue;
      const a = j * (span + 1) + i;
      indices.push(a, a + 1, a + span + 1, a + 1, a + span + 2, a + span + 1);
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  const snow = new THREE.Mesh(geometry, material);
  snow.receiveShadow = true;
  scene.add(snow);
}

function exhaust(p, m, x, z, y) {
  p.box(m.steel, x, y + 0.011, z, 0.471, 0.064, 0.433, 0, 0.12, 0.074);
  p.cyl(m.ink, x, y + 0.315, z, 0.091, 0.63, 16);
  p.cyl(m.zinc, x, y + 0.209, z, 0.121, 0.054, 14);
  p.cyl(m.zinc, x, y + 0.454, z, 0.11, 0.046, 14);
  for (let i = 0; i < 4; i++) {
    const a = i * Math.PI / 2 + 0.5;
    p.rod(m.steel, [x + Math.cos(a) * 0.078, y + 0.623, z + Math.sin(a) * 0.078],
      [x + Math.cos(a) * 0.126, y + 0.753, z + Math.sin(a) * 0.126], 0.012);
  }
  p.cyl(m.roofDark, x, y + 0.774, z, 0.171, 0.042, 16, 0, 0, 0, 0.76);
  p.cyl(m.frost, x - 0.03, y + 0.804, z + 0.014, 0.11, 0.019, 14, 0, 0, 0, 0.49);
}

function deck(mesh, m) {
  const p = mesh.at('entrance deck', hut.doorX);
  const y = hut.floor;
  const a = hut.vestibuleFront;
  const b = hut.porchEnd;
  const c = hut.rampEnd;
  p.box(m.steel, 0, y - 0.069, (a + b) / 2, 1.96, 0.133, b - a, 0, 0, 0, 1);
  for (let i = 0; i < 11; i++) {
    const z = lerp(a + 0.040, b - 0.043, i / 10);
    p.box(i % 6 === 0 ? m.steel : m.tread, 0, y - 0.003, z, 1.94, 0.019, 0.076);
    for (const x of [-0.90, 0.9]) p.cyl(m.zinc, x, y + 0.011, z, 0.015, 0.013, 6);
  }
  const rise = y - rampHeight(c);
  const slope = Math.atan2(rise, c - b);
  p.box(m.roofDark, 0, (y + rampHeight(c)) / 2 - 0.032, (b + c) / 2,
    hut.rampHalf * 2, 0.072, (c - b) / Math.cos(slope), slope, 0, 0, 1);
  const rng = random(762);
  for (let i = 0; i < 21; i++) {
    const z = lerp(b + 0.028, c - 0.030, i / 20);
    const yy = rampHeight(z);
    p.box(i === 0 ? m.ochrePaint : m.tread, 0, yy + 0.003, z, 1.550, 0.020, 0.050, slope);
    if (i % 6 === 2) p.box(m.ice, (rng() - 0.5) * 1.27, yy + 0.014, z, 0.14, 0.006, 0.022, slope);
  }
  for (const x of [-0.785, 0.785]) {
    p.rod(m.zinc, [x, y + 0.014, b], [x, rampHeight(c) + 0.014, c], 0.015, 6);
    p.box(m.zinc, x, y - 0.141, b - 0.093, 0.13, 0.20, 0.11);
    p.box(m.steel, x, y - 0.26, b - 0.093, 0.24, 0.034, 0.18);
  }
  p.box(m.steel, -1.115, 0.104, 4.185, 0.355, 0.144, 0.745, 0, 0, 0, 1);
  p.box(m.tread, -1.115, 0.183, 4.185, 0.354, 0.02, 0.744);
  const r = 0.915;
  for (const z of [3.85, 4.55, 5.35]) {
    const height = z > b ? rampHeight(z) : y;
    const railX = z > b ? 0.75 : r;
    p.box(m.steel, railX, height + 0.375, z, 0.044, 0.924, 0.044, 0, 0, 0, 1);
    p.box(m.ink, railX, height - 0.073, z, 0.098, 0.032, 0.105);
    p.cyl(m.zinc, railX + 0.035, height - 0.051, z, 0.011, 0.018, 6);
  }
  const high = y + 0.822;
  const mid = y + 0.40;
  p.line(m.zinc, [[r, high, 3.79], [r, high, 4.50], [0.75, high - 0.07, 4.79], [0.75, rampHeight(5.41) + 0.829, 5.41]], 0.025, 10);
  p.line(m.steel, [[r, mid, 3.79], [r, mid, 4.51], [0.75, mid - 0.07, 4.79], [0.75, rampHeight(5.38) + 0.40, 5.38]], 0.016, 8);
  for (let i = 0; i < 30; i++) {
    const z = lerp(3.69, 5.53, rng());
    const x = (rng() > 0.72 ? 1 : -1) * lerp(0.59, z < b ? 0.93 : 0.75, rng());
    p.box(i % 4 ? m.frost : m.snowDirty, x, (z < b ? y : rampHeight(z)) + 0.015, z,
      0.018 + rng() ** 2 * 0.073, 0.004 + rng() * 0.009, 0.012 + rng() * 0.080, z < b ? 0 : slope, rng());
  }
}

function signage(front, ves, back, m) {
  const main = plate('station nameplate', 'LARK  /  P-04', 'GLACIER FIELD STATION', {
    background: '#263e4b', border: '#809e9e', ink: '#ecdfbf', fontSize: 48,
  });
  front.box(m.ink, 2.25, 2.802, 0.174, 2.09, 0.391, 0.065, 0, 0, 0, 1);
  front.plane(main, 2.25, 2.802, 0.208, 2.052, 0.367);
  for (const x of [1.274, 3.221]) {
    for (const y of [2.642, 2.97]) screw(front, m, x, y, 0.21, 0.011, 1);
  }
  const entrance = plate('reflective entry marker', '04', 'ENTRY', {
    background: '#bf8b53', ink: '#1d2b30', border: '#4a4036', fontSize: 60,
  });
  ves.box(m.roofDark, 0.864, 2.093, 0.171, 0.277, 0.245, 0.04);
  ves.plane(entrance, 0.864, 2.093, 0.193, 0.263, 0.225);
  const service = plate('rear service designation', 'SERVICE', 'POWER / TELEMETRY', {
    background: '#2c3d40', ink: '#e5d5ae', border: '#ac956e',
  });
  back.plane(service, 1.02, 1.93, 0.205, 0.69, 0.228);
}

function exteriorEquipment(mesh, m) {
  const mast = mesh.at('weather mast', -5.95, snowHeight(-5.95, -0.47), -0.47);
  mast.box(m.roofDark, 0, 0.105, 0, 0.49, 0.245, 0.48, 0, 0.16, 0, 1);
  mast.cyl(m.steel, 0, 1.76, 0, 0.041, 3.49, 10, 0, 0, 0, 1);
  mast.cyl(m.zinc, 0, 3.94, 0, 0.026, 1.13, 10, 0, 0, 0, 1);
  for (const y of [0.24, 1.37, 2.28, 3.39]) {
    mast.cyl(m.zinc, 0, y, 0, 0.063, 0.102, 10);
    mast.box(m.ink, 0.071, y, 0, 0.084, 0.071, 0.089);
  }
  mast.rod(m.steel, [-0.53, 4.16, 0], [0.51, 4.16, 0], 0.025, 9);
  mast.cyl(m.zinc, -0.43, 4.28, 0, 0.063, 0.267, 10);
  mast.cyl(m.steel, -0.43, 4.53, 0, 0.019, 0.31, 8);
  for (let i = 0; i < 3; i++) {
    const a = i / 3 * Math.PI * 2 + 0.21;
    const x = -0.43 + Math.cos(a) * 0.175;
    const z = Math.sin(a) * 0.175;
    mast.rod(m.ink, [-0.43, 4.658, 0], [x, 4.658, z], 0.011, 7);
    mast.ball(m.ink, x, 4.658, z, 0.07, 0.045, 0.045, 0, -a);
  }
  mast.cyl(m.steel, 0.396, 4.12, 0, 0.024, 0.31, 8);
  for (let i = 0; i < 7; i++) {
    mast.cyl(i === 0 ? m.zinc : m.appliance, 0.396, 4.02 - i * 0.064, 0, 0.118, 0.029, 12, 0, 0, 0, 0.83);
  }
  mast.box(m.blueCase, -0.109, 1.07, -0.002, 0.124, 0.302, 0.233);
  mast.box(m.status, -0.176, 1.151, 0.059, 0.008, 0.013, 0.016);
  mast.line(m.ink, [[-0.138, 0.964, -0.08], [-0.139, 0.907, -0.145], [-0.010, 0.82, -0.059], [-0.019, 0.36, -0.055]], 0.009);
  mast.rod(m.steel, [0, 3.18, 0], [-1.18, 0.025, -0.88], 0.0065, 7);
  mast.rod(m.steel, [0, 3.18, 0], [0.33, 0.029, -1.85], 0.0065, 7);

  const rear = mesh.at('outdoor service', 0, 0, hut.back, Math.PI);
  for (const [x, y, w, h] of [[-1.77, 1.47, 1.26, 0.83], [-3.03, 2.29, 0.62, 0.41]]) {
    rear.box(m.ink, x, y, 0.21, w + 0.051, h + 0.064, 0.199, 0, 0, 0, 1);
    rear.box(m.roof, x, y, 0.325, w, h, 0.062);
    for (let i = 0; i < Math.floor(h * 14); i++) {
      const yy = y - h * 0.42 + i * 0.057;
      rear.box(m.steel, x, yy, 0.365, w - 0.102, 0.028, 0.059, -0.41);
      rear.box(m.ink, x, yy - 0.018, 0.367, w - 0.11, 0.009, 0.022, -0.41);
    }
    for (const dx of [-1, 1]) {
      rear.box(m.zinc, x + dx * (w / 2 - 0.034), y, 0.363, 0.058, h, 0.045);
      for (const dy of [-1, 1]) screw(rear, m, x + dx * (w / 2 - 0.035), y + dy * (h / 2 - 0.05), 0.39, 0.014, 1);
    }
  }
  rear.line(m.coal, [[-1.77, 1.05, 0.266], [-1.77, 0.67, 0.272], [-1.70, 0.59, 0.272], [-0.71, 0.59, 0.169], [-0.61, 0.68, 0.171], [-0.61, 1.15, 0.168]], 0.031);
  rear.box(m.zinc, -0.61, 1.28, 0.204, 0.211, 0.244, 0.177);
  rear.plane(plate('telemetry box tag', 'DC 24 V', '', { background: '#b9bcb2', ink: '#424848', border: '#777874' }),
    -0.61, 1.299, 0.293, 0.155, 0.061);

  const crate = mesh.at('outside crate', 3.59, snowHeight(3.59, 2.32), 2.32, 0.07);
  crate.box(m.ink, 0, 0.052, 0, 0.87, 0.113, 0.58);
  crate.box(m.blueCase, 0, 0.265, 0, 0.78, 0.41, 0.54, 0, 0, 0, 1);
  crate.box(m.blueCase, 0, 0.505, 0, 0.823, 0.092, 0.578);
  for (const x of [-0.308, 0.308]) {
    crate.box(m.roofDark, x, 0.27, 0.280, 0.064, 0.424, 0.031);
    crate.box(m.zinc, x, 0.447, 0.307, 0.082, 0.096, 0.035);
    crate.box(m.ink, x, 0.437, 0.329, 0.064, 0.023, 0.020);
  }
  crate.plane(plate('survey case label', 'P-04 / WEST', 'STAKE KIT', {
    background: '#5d736f', ink: '#e2deca', border: '#abb095',
  }), 0, 0.331, 0.272, 0.44, 0.137);

  const marker = mesh.at('route markers');
  for (const [x, z, h, lean] of [[-7.81, 11.5, 0.94, 0.08], [-4.61, 8.25, 0.67, -0.13], [1.12, 6.23, 0.61, -0.12]]) {
    const y = snowHeight(x, z);
    marker.rod(m.ochre, [x, y - 0.02, z], [x + lean, y + h, z - 0.04], 0.025, 8);
    marker.rod(m.frost, [x + lean * 0.78, y + h * 0.78, z - 0.031], [x + lean * 0.93, y + h * 0.93, z - 0.038], 0.030, 8);
    marker.box(m.ochrePaint, x + lean * 0.55, y + h - 0.10, z, 0.16, 0.082, 0.032, 0, lean * 2.5, lean * -1.8);
  }
}

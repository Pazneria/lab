import * as THREE from '../vendor/three.module.min.js';
import { carpetTexture, glassFilm, label, paint, tile } from './art.mjs';
import { boothHeader, borderPlate, entryMatArt, openArt, poster, rearMural, transomArt } from './graphics.mjs';
import { room } from './layout.mjs';
import { group } from './mesh.mjs';

const pi = Math.PI;
const booth = room.booth;
const roomWidth = room.right - room.left;
const roomDepth = room.front - room.back;
const roomMiddle = (room.front + room.back) / 2;

function roomParts(kit) {
  return {
    backing: kit.material('#302e3d', { gloss: 5 }),
    plaster: kit.material('#565264', { finish: 'plaster', gloss: 3, shine: '#181a25' }),
    teal: kit.material('#3f5257', { finish: 'plaster', gloss: 3, shine: '#19252d' }),
    boothWall: kit.material('#745968', { finish: 'plaster', gloss: 3, shine: '#201a25' }),
    base: kit.material('#32343e', { finish: 'paint', gloss: 14 }),
    tealBase: kit.material('#39454b', { finish: 'paint', gloss: 14 }),
    plumBase: kit.material('#4a3947', { finish: 'paint', gloss: 15 }),
    trim: kit.material('#604d56', { finish: 'wood', gloss: 21, shine: '#4a3e45' }),
    walnut: kit.material('#624a4b', { finish: 'wood', gloss: 14, shine: '#464042' }),
    gold: kit.material('#ae8e70', { finish: 'metal', gloss: 60, shine: '#8a7567' }),
    oxide: kit.material('#3a343d', { finish: 'metal', gloss: 47, shine: '#665d68' }),
    black: kit.material('#27262f', { finish: 'paint', gloss: 19 }),
    seam: kit.material('#29303a', { gloss: 8 }),
    paper: kit.material('#cfc2ae', { finish: 'paint', gloss: 12 }),
    ceiling: kit.material('#39363f', { map: tile(paint(96, 96, (ctx, w, h) => {
      ctx.fillStyle = '#d7d1c9';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#42415341';
      for (let x = 5; x < w; x += 8) for (let y = 4; y < h; y += 7) {
        ctx.fillRect(x + Math.sin(x + y) * 2, y + Math.cos(x - y) * 2, 1.2, 2.2);
      }
    }), 18, 23), gloss: 6, emission: '#1c1924' }),
  };
}

function faceFloor(kit, world, fromX, toX, fromZ, toZ, material) {
  const width = toX - fromX;
  const length = toZ - fromZ;
  const floor = kit.plane(world, material, (fromX + toX) * 0.5, 0, (fromZ + toZ) * 0.5,
    width, length, Math.ceil(width * 2.3), Math.ceil(length * 2.3));
  floor.rotation.x = -pi / 2;
}

function floor(kit, world, parts) {
  const repeat = 2.80;
  const carpet = carpetTexture();
  tile(carpet, roomWidth / repeat, roomDepth / repeat);
  carpet.anisotropy = 8;
  const extension = carpet.clone();
  extension.repeat.set((booth.right - room.right) / repeat, (booth.front - booth.back) / repeat);
  extension.offset.set(roomWidth / repeat, (room.front - booth.front) / repeat);
  extension.needsUpdate = true;
  faceFloor(kit, world, room.left, room.right, room.back, room.front,
    kit.material('#ffffff', { map: carpet, gloss: 2, shine: '#10101a' }));
  faceFloor(kit, world, room.right, booth.right, booth.back, booth.front,
    kit.material('#f3dde7', { map: extension, gloss: 2, shine: '#10101a' }));

  kit.box(world, parts.black, 0, 0.006, 4.68, 2.95, 0.011, 1.41, 0.004);
  const mat = kit.plane(world, kit.material('#ffffff', { map: entryMatArt(), gloss: 2, shine: '#131019' }),
    0, 0.012, 4.68, 2.88, 1.36, 6, 4);
  mat.rotation.set(-pi / 2, 0, pi);
  kit.box(world, parts.gold, 0, 0.010, 5.491, 2.66, 0.019, 0.088, 0.006);
}

function wall(kit, parts, parent, x, z, yaw, width, color, low) {
  const piece = group(parent, x, 0, z, 0, yaw);
  kit.box(piece, parts.backing, 0, room.ceiling * 0.5, -0.081, width + 0.006, room.ceiling, 0.16);
  kit.plane(piece, color, 0, room.ceiling * 0.50, 0.004, width, room.ceiling,
    Math.max(1, Math.ceil(width * 2.8)), 8);

  kit.box(piece, low, 0, 0.521, 0.020, width, 1.041, 0.043);
  kit.box(piece, parts.black, 0, 0.065, 0.042, width, 0.127, 0.045, 0.007);
  kit.box(piece, parts.trim, 0, 1.064, 0.043, width, 0.075, 0.058, 0.009);
  kit.box(piece, parts.gold, 0, 1.099, 0.046, width, 0.010, 0.045, 0.003);
  kit.box(piece, parts.trim, 0, 0.130, 0.046, width, 0.023, 0.031, 0.006);
  const div = Math.max(1, Math.round(width / 0.58));
  for (let n = 1; n < div; n += 1) {
    const localX = width * (n / div - 0.5);
    kit.box(piece, parts.seam, localX, 0.585, 0.044, 0.009, 0.891, 0.008, 0.001);
  }
  return piece;
}

function pilaster(kit, parts, parent, x, heights, width) {
  const [bottom, top] = heights;
  kit.box(parent, parts.black, x, (top + bottom) * 0.5, 0.035, width + 0.021, top - bottom, 0.122, 0.008);
  kit.box(parent, parts.walnut, x, (top + bottom) * 0.5, 0.098, width, top - bottom, 0.060, 0.008);
  for (const offset of [-width * 0.345, width * 0.345]) {
    kit.box(parent, parts.gold, x + offset, (top + bottom) * 0.5, 0.127, 0.009, top - bottom, 0.011, 0.002);
  }
}

function frame(kit, parts, parent, x, y, z, w, h, texture) {
  kit.box(parent, parts.black, x, y, z, w + 0.055, h + 0.055, 0.059, 0.011);
  kit.box(parent, parts.walnut, x, y, z + 0.030, w + 0.040, h + 0.040, 0.028, 0.007);
  kit.box(parent, parts.gold, x, y, z + 0.044, w + 0.017, h + 0.017, 0.015, 0.005);
  kit.plane(parent, kit.material('#fff6e6', { map: texture, gloss: 31, shine: '#554951' }),
    x, y, z + 0.053, w, h);
}

function cove(kit, parts, parent, x, y, z, width, light) {
  kit.box(parent, parts.black, x, y, z, width + 0.085, 0.098, 0.167, 0.017);
  kit.box(parent, parts.oxide, x, y + 0.003, z + 0.053, width + 0.055, 0.061, 0.096, 0.013);
  kit.box(parent, kit.material(light, { flat: true }), x, y - 0.021, z + 0.098,
    width, 0.023, 0.026, 0.010);
  for (const side of [-1, 1]) {
    kit.box(parent, parts.gold, x + side * (width / 2 + 0.014), y + 0.001, z + 0.052,
      0.027, 0.072, 0.096, 0.009);
  }
}

function wallLight(kit, parts, parent, x, y, glass, length = 0.52) {
  const lite = kit.material(glass, { flat: true });
  kit.box(parent, parts.black, x, y, 0.020, 0.126, length + 0.072, 0.059, 0.011);
  kit.box(parent, parts.oxide, x, y, 0.056, 0.098, length + 0.041, 0.057, 0.013);
  kit.box(parent, lite, x, y + 0.009, 0.089, 0.065, length, 0.089, 0.028);
  for (const b of [-1, 1]) {
    kit.box(parent, parts.gold, x, y + b * (length / 2 - 0.010), 0.091, 0.102, 0.043, 0.108, 0.011);
    kit.box(parent, parts.oxide, x, y + b * 0.063, 0.137, 0.070, 0.010, 0.009, 0.003);
  }
}

function rearWall(kit, world, parts) {
  const rear = wall(kit, parts, world, 0, room.back, 0, roomWidth, parts.teal, parts.tealBase);
  kit.box(rear, parts.black, 0.15, 1.731, 0.062, 6.47, 2.98, 0.114, 0.025);
  kit.box(rear, parts.walnut, 0.15, 1.731, 0.120, 6.40, 2.93, 0.062, 0.015);
  kit.box(rear, parts.black, 0.15, 1.756, 0.156, 5.16, 2.66, 0.038, 0.022);
  kit.box(rear, parts.gold, 0.15, 1.756, 0.177, 5.100, 2.611, 0.017, 0.007);
  kit.plane(rear, kit.material('#ffffff', { map: rearMural(), gloss: 9, shine: '#343b43' }),
    0.15, 1.756, 0.190, 5.072, 2.581, 16, 8);
  for (const side of [-1, 1]) {
    for (let i = 0; i < 7; i += 1) {
      const x = 0.15 + side * (2.641 + i * 0.074);
      kit.box(rear, i % 2 === 0 ? parts.walnut : parts.trim, x, 1.745, 0.171, 0.037, 2.825, 0.047, 0.008);
    }
    wallLight(kit, parts, rear, 0.15 + side * 3.41, 2.371, '#f1ba92', 0.59);
    kit.addAccent(0.15 + side * 3.41, 2.36, room.back + 0.31, 2.97, '#ffc496', 2.78);
  }
  frame(kit, parts, rear, -4.12, 1.808, 0.031, 0.728, 0.97, poster('scores'));
  frame(kit, parts, rear, 4.14, 1.745, 0.033, 0.58, 0.77, poster('rules'));
  cove(kit, parts, rear, 0.15, 3.299, 0.06, 6.05, '#e4b894');
  kit.addAccent(0.15, 3.24, room.back + 0.35, 4.9, '#f2ba8f', 1.0);
}

function sideWalls(kit, world, parts) {
  const west = wall(kit, parts, world, room.left, roomMiddle, pi / 2, roomDepth, parts.plaster, parts.plumBase);
  for (const z of [-6.69, -3.32, 2.86, 4.80]) pilaster(kit, parts, west, roomMiddle - z, [0.14, 3.48], 0.11);
  cove(kit, parts, west, roomMiddle - 1.003, 3.30, 0.063, 5.08, '#efa987');
  cove(kit, parts, west, roomMiddle + 5.245, 3.30, 0.056, 2.73, '#e5ab82');
  frame(kit, parts, west, roomMiddle - 1.203, 1.799, 0.037, 0.843, 1.106, poster('orbit'));
  frame(kit, parts, west, roomMiddle - -1.405, 1.798, 0.037, 0.62, 0.824, poster('scores'));
  wallLight(kit, parts, west, roomMiddle - 3.81, 2.40, '#f2b990');
  wallLight(kit, parts, west, roomMiddle + 3.84, 2.44, '#e8b094');
  kit.addAccent(room.left + 0.34, 2.61, 0.84, 4.3, '#f4a97e', 2.0);
  kit.addAccent(room.left + 0.36, 2.23, -3.82, 3.8, '#e3a093', 1.55);

  const eastFront = (room.front + booth.front) / 2;
  const east = wall(kit, parts, world, room.right, eastFront, -pi / 2, room.front - booth.front, parts.teal, parts.tealBase);
  cove(kit, parts, east, -0.48, 3.30, 0.061, 6.02, '#96c9c0');
  for (const z of [-1.85, 2.53, 4.88]) pilaster(kit, parts, east, z - eastFront, [0.14, 3.48], 0.105);
  frame(kit, parts, east, 0.79 - eastFront, 1.79, 0.036, 0.72, 0.95, poster('relay'));
  frame(kit, parts, east, 3.64 - eastFront, 1.79, 0.036, 0.58, 0.77, poster('rules'));
  wallLight(kit, parts, east, 2.85 - eastFront, 2.37, '#b0d8c5', 0.56);
  kit.addAccent(room.right - 0.39, 2.57, 0.90, 4.3, '#91dfc5', 2.2);
  kit.addAccent(room.right - 0.32, 1.84, 3.28, 3.5, '#b0a8eb', 1.4);

  wall(kit, parts, world, room.right, (room.back + booth.back) * 0.5, -pi / 2,
    booth.back - room.back, parts.teal, parts.tealBase);
  wall(kit, parts, world, booth.right, (booth.front + booth.back) * 0.5, -pi / 2,
    booth.front - booth.back, parts.boothWall, parts.plumBase);
  wall(kit, parts, world, (room.right + booth.right) * 0.5, booth.back, 0,
    booth.right - room.right + 0.09, parts.boothWall, parts.plumBase);
  wall(kit, parts, world, (room.right + booth.right) * 0.5, booth.front, pi,
    booth.right - room.right + 0.09, parts.boothWall, parts.plumBase);

  const opening = group(world, room.right - 0.015, 0, (booth.front + booth.back) * 0.5, 0, -pi / 2);
  const width = booth.front - booth.back;
  for (const side of [-1, 1]) {
    const outerX = side * (width / 2 + 0.014);
    pilaster(kit, parts, opening, outerX, [0.09, 3.472], 0.163);
    kit.box(opening, parts.black, outerX, 0.086, 0.033, 0.195, 0.171, 0.143, 0.017);
  }
  kit.box(opening, parts.black, 0, 3.137, -0.041, width + 0.205, 0.687, 0.188, 0.012);
  kit.box(opening, parts.walnut, 0, 3.130, 0.062, width + 0.184, 0.629, 0.065, 0.010);
  kit.box(opening, parts.trim, 0, 2.803, 0.063, width + 0.198, 0.101, 0.102, 0.014);
  kit.box(opening, parts.gold, 0, 2.756, 0.084, width + 0.204, 0.012, 0.090, 0.005);
  frame(kit, parts, opening, 0, 3.082, 0.110, 2.447, 0.506, boothHeader());
  const mark = kit.material('#efb788', { flat: true });
  for (const side of [-1, 1]) {
    kit.box(opening, mark, side * 1.59, 3.08, 0.112, 0.13, 0.010, 0.009, 0.003);
    kit.box(opening, parts.gold, side * 1.59, 3.113, 0.112, 0.21, 0.012, 0.009, 0.003);
    kit.box(opening, parts.gold, side * 1.59, 3.048, 0.112, 0.21, 0.012, 0.009, 0.003);
  }
}

function signage(kit, world, parts) {
  const west = group(world, room.left + 0.065, 0, 0.72, 0, pi / 2);
  const east = group(world, room.right - 0.065, 0, 0.62, 0, -pi / 2);
  frame(kit, parts, west, 0, 2.755, 0.002, 2.225, 0.348, borderPlate(1100, 174, {
    top: 'ORBIT CLUB', bottom: 'PILOT STATIONS 01 & 02',
    background: '#4a3745', ink: '#efc7a0', accent: '#d49776',
  }));
  frame(kit, parts, east, 0, 2.775, 0.002, 2.258, 0.348, borderPlate(1100, 174, {
    top: 'RELAY SYSTEMS', bottom: 'FIELD UNITS 03 & 04',
    background: '#30464e', ink: '#c8e3d2', accent: '#82b1ac',
  }));
}

function doorLeaf(kit, parts, parent, glass, x, center) {
  const uprightWidth = 0.039;
  const doorWidth = 1.270;
  const face = group(parent, x, 0, 0.019);
  for (const side of [-1, 1]) {
    kit.box(face, parts.oxide, side * (doorWidth / 2 - uprightWidth / 2), 1.287, 0,
      uprightWidth, 2.497, 0.095, 0.006);
    kit.box(face, parts.gold, side * (doorWidth / 2 - uprightWidth / 2), 1.287, 0.052,
      0.012, 2.488, 0.013, 0.003);
  }
  for (const y of [0.095, 0.52, 2.515]) kit.box(face, parts.oxide, 0, y, 0, doorWidth, 0.069, 0.091, 0.010);
  kit.box(face, parts.black, 0, 0.305, -0.010, doorWidth - 0.062, 0.390, 0.069, 0.012);
  kit.box(face, parts.oxide, 0, 0.305, 0.030, doorWidth - 0.077, 0.358, 0.027, 0.011);
  kit.box(face, parts.gold, 0, 0.459, 0.046, doorWidth - 0.094, 0.012, 0.012, 0.004);
  const pane = kit.plane(face, glass, 0, 1.515, 0.022, doorWidth - 0.074, 1.923);
  pane.renderOrder = 4;

  const xPull = center * 0.420;
  kit.box(face, parts.oxide, xPull, 1.122, 0.053, 0.125, 0.404, 0.024, 0.015);
  const path = [[xPull, 0.984, 0.056], [xPull, 1.010, 0.127], [xPull, 1.229, 0.127], [xPull, 1.250, 0.058]];
  kit.path(face, parts.gold, path, 0.016, 12);
  for (const y of [0.354, 2.27]) {
    kit.cylinder(face, parts.gold, -center * 0.615, y, 0.050, 0.012, 0.085, 0.012, 12);
  }
}

function frontWall(kit, world, parts) {
  const frontWallSection = (x1, x2) =>
    wall(kit, parts, world, (x1 + x2) * 0.5, room.front, pi, x2 - x1, parts.plaster, parts.plumBase);
  const left = frontWallSection(-5.15, -1.43);
  frontWallSection(1.43, 2.22);
  frontWallSection(4.56, 5.15);
  frame(kit, parts, left, -0.15, 1.82, 0.041, 0.74, 0.985, poster('rules'));
  wallLight(kit, parts, left, -1.12, 2.29, '#ecc19c', 0.44);

  const front = group(world, 0, 0, room.front, 0, pi);
  const glass = kit.material('#e0e8ee', {
    map: glassFilm(), flat: true, blend: true, alpha: 0.69, side: THREE.DoubleSide,
  });
  kit.box(front, parts.backing, 0, 3.177, -0.065, 2.907, 0.606, 0.166);
  kit.box(front, parts.walnut, 0, 2.808, 0.023, 2.890, 0.434, 0.160, 0.023);
  kit.box(front, parts.oxide, 0, 2.802, 0.105, 2.754, 0.380, 0.062, 0.012);
  kit.plane(front, kit.litSign(transomArt()), 0, 2.804, 0.138, 2.690, 0.342);
  for (const side of [-1, 1]) {
    kit.box(front, parts.walnut, side * 1.390, 1.29, 0.013, 0.129, 2.59, 0.154, 0.012);
    kit.box(front, parts.gold, side * 1.342, 1.30, 0.097, 0.019, 2.568, 0.025, 0.005);
    const leaf = side * 0.643;
    doorLeaf(kit, parts, front, glass, leaf, -side);
  }

  const exit = paint(256, 88, (ctx, w, h) => {
    ctx.fillStyle = '#7b3e48';
    ctx.fillRect(0, 0, w, h);
    label(ctx, 'EXIT', w / 2, h / 2, 57, '#ffc5aa', { align: 'center' });
  });
  kit.box(front, parts.oxide, 0, 3.152, 0.069, 0.415, 0.15, 0.101, 0.015);
  kit.plane(front, kit.litSign(exit), 0, 3.151, 0.122, 0.377, 0.125);

  const paneX = -3.39;
  kit.box(front, parts.backing, paneX, 0.456, -0.073, 2.340, 0.912, 0.158);
  kit.box(front, parts.plumBase, paneX, 0.450, 0.025, 2.348, 0.90, 0.044, 0.006);
  kit.box(front, parts.backing, paneX, 3.101, -0.073, 2.340, 0.758, 0.156);
  kit.box(front, parts.trim, paneX, 0.968, 0.084, 2.407, 0.134, 0.224, 0.022);
  kit.box(front, parts.walnut, paneX, 2.746, 0.052, 2.407, 0.120, 0.172, 0.012);
  for (const side of [-1, 0, 1]) {
    kit.box(front, parts.oxide, paneX + side * 1.152, 1.856, 0.052,
      side === 0 ? 0.043 : 0.068, 1.782, 0.108, 0.006);
  }
  const pane = kit.plane(front, glass, paneX, 1.859, 0.016, 2.297, 1.754);
  pane.renderOrder = 4;
  for (let i = 0; i < 9; i += 1) {
    const blind = kit.box(front, parts.trim, paneX, 2.667 - i * 0.044, 0.081, 2.248, 0.026, 0.042, 0.002);
    blind.rotation.x = 0.64;
  }
  for (const off of [-0.326, 0.326]) {
    kit.rod(front, parts.gold, [paneX + off, 2.298, 0.180], [paneX + off, 2.661, 0.105], 0.0035);
  }
  kit.box(front, parts.black, paneX, 2.091, 0.178, 0.918, 0.411, 0.055, 0.018);
  kit.plane(front, kit.litSign(openArt()), paneX, 2.091, 0.208, 0.899, 0.402);
  kit.addAccent(3.39, 2.07, room.front - 0.43, 3.03, '#e4a38c', 1.65);
  kit.addAccent(0.24, 2.63, room.front - 0.39, 3.21, '#f4bb87', 1.44);
}

function lightPendant(kit, parts, world, x, z, warm) {
  const shade = kit.material(warm ? '#6a5260' : '#4b6363', { finish: 'metal', gloss: 74, shine: '#afa0a5' });
  const white = kit.material(warm ? '#f1c597' : '#dfe0ce', { flat: true });
  kit.cylinder(world, parts.black, x, 3.433, z, 0.110, 0.093, 0.110, 24);
  kit.cylinder(world, parts.gold, x, 3.362, z, 0.026, 0.135, 0.026, 12);
  kit.lathe(world, shade, x, 3.154, z, [
    [0.144, 0.145], [0.163, 0.115], [0.190, 0.087], [0.239, 0.044],
    [0.299, 0.012], [0.296, 0.0], [0.276, 0.003], [0.225, 0.038], [0.157, 0.100],
  ], 34);
  kit.cylinder(world, parts.gold, x, 3.158, z, 0.298, 0.025, 0.291, 34);
  kit.cylinder(world, white, x, 3.142, z, 0.266, 0.015, 0.257, 34);
  kit.addAccent(x, 3.02, z, 4.45, warm ? '#ffca9a' : '#dce1cc', 1.83);
}

function ceiling(kit, world, parts) {
  kit.plane(world, parts.ceiling, 0, room.ceiling, roomMiddle, roomWidth, roomDepth, 23, 29).rotation.x = pi / 2;
  kit.plane(world, parts.ceiling, (room.right + booth.right) / 2, room.ceiling,
    (booth.front + booth.back) / 2, booth.right - room.right, booth.front - booth.back, 7, 12).rotation.x = pi / 2;
  for (let x = -4.70; x < 5.1; x += 0.94) kit.box(world, parts.seam, x, 3.454, roomMiddle, 0.018, 0.028, roomDepth);
  for (let z = -7.31; z < 5.58; z += 0.91) kit.box(world, parts.seam, 0, 3.454, z, roomWidth, 0.028, 0.018);
  for (const z of [3.28, -0.06, -3.31]) lightPendant(kit, parts, world, 0.03, z, z !== -0.06);

  for (const side of [-1, 1]) {
    const x = side * 2.91;
    kit.box(world, parts.black, x, 3.383, 0.85, 0.385, 0.154, 4.61, 0.036);
    kit.box(world, parts.oxide, x, 3.321, 0.85, 0.257, 0.060, 4.45, 0.022);
    const bulb = kit.material(side === -1 ? '#ebbd9d' : '#add1ca', { flat: true });
    for (const z of [-0.32, 1.99]) {
      kit.box(world, bulb, x, 3.286, z, 0.116, 0.029, 2.019, 0.012);
    }
    kit.addAccent(x, 3.16, 0.80, 4.3, side === -1 ? '#f8c4a0' : '#a7e0d5', 2.75);
  }

  kit.box(world, parts.black, 6.59, 3.402, -4.58, 0.42, 0.169, 3.39, 0.044);
  kit.box(world, parts.gold, 6.59, 3.319, -4.58, 0.338, 0.045, 3.31, 0.016);
  kit.box(world, kit.material('#e9c49d', { flat: true }), 6.59, 3.288, -4.58, 0.261, 0.028, 3.21, 0.010);
  kit.addAccent(6.40, 2.97, -4.6, 4.69, '#ffd3a4', 3.45);
}

function exterior(kit, world) {
  const dark = color => kit.material(color, { flat: true });
  const walk = dark('#39363d');
  const edge = dark('#5e5158');
  const asphalt = dark('#212634');
  const border = dark('#252736');
  const frame = dark('#393845');
  const glow = dark('#be8a64');
  const blockDark = dark('#242c3c');
  const block = dark('#353846');
  const sign = dark('#6e525a');
  const branches = dark('#28303d');

  kit.box(world, walk, 0, -0.119, 6.52, 18.2, 0.210, 1.78);
  kit.box(world, edge, 0, -0.101, 7.40, 18.2, 0.127, 0.12, 0.011);
  kit.box(world, asphalt, 0, -0.175, 9.62, 25.0, 0.117, 4.33);
  kit.box(world, walk, 0, -0.129, 11.98, 22, 0.214, 0.92);
  for (let i = -8; i <= 8; i += 1) {
    kit.box(world, border, i * 1.30, -0.012, 6.52, 0.010, 0.004, 1.72);
    kit.box(world, dark('#58515c'), i * 1.47, -0.115, 9.62, 0.74, 0.005, 0.035);
  }

  for (let i = -3; i <= 3; i += 1) {
    const x = i * 3.36;
    const buildingHeight = 3.65 + (i % 3 + 1) * 0.31;
    kit.box(world, i % 2 ? block : blockDark, x, buildingHeight * 0.5, 12.76, 3.30, buildingHeight, 1.11);
    kit.box(world, border, x, buildingHeight, 12.73, 3.39, 0.16, 1.23);
    kit.box(world, border, x, 2.24, 12.09, 3.30, 0.18, 0.275);
    kit.box(world, frame, x, 1.525, 12.178, 2.75, 1.09, 0.098);
    kit.box(world, i === 0 || i === 2 ? sign : border, x, 1.52, 12.116, 2.66, 0.99, 0.024);
    for (const off of [-0.88, -0.24, 0.63]) {
      kit.box(world, frame, x + off, 3.02, 12.173, 0.43, 0.74, 0.061);
      const lit = i % 2 && off !== -0.24;
      kit.box(world, lit ? glow : border, x + off, 3.02, 12.137, 0.34, 0.64, 0.018);
      kit.box(world, frame, x + off, 3.02, 12.125, 0.022, 0.67, 0.016);
      kit.box(world, frame, x + off, 3.02, 12.125, 0.35, 0.024, 0.016);
    }
    for (const off of [-0.42, 0.52]) kit.box(world, frame, x + off, 0.564, 12.110, 0.042, 2.033, 0.099);
  }
  for (const [x, z] of [[-2.52, 11.79], [4.87, 10.94]]) {
    kit.cylinder(world, border, x, 1.601, z, 0.040, 3.22, 0.052, 10);
    kit.rod(world, border, [x, 3.16, z], [x + 0.48, 3.16, z], 0.034, 8);
    kit.box(world, frame, x + 0.50, 3.123, z, 0.34, 0.104, 0.18, 0.020);
    kit.box(world, glow, x + 0.50, 3.065, z, 0.25, 0.028, 0.118, 0.008);
    kit.floorEffect(world, x + 0.50, z - 0.75, 3.3, 2.8, '#ab7a5d', 0.14, 0, -0.005);
  }
  const treeX = 1.62;
  kit.rod(world, branches, [treeX, -0.03, 11.61], [treeX + 0.21, 4.3, 11.69], 0.071, 9);
  for (const [dx, h] of [[-0.84, 3.15], [0.93, 3.78], [-0.64, 4.10], [0.65, 4.54]]) {
    kit.rod(world, branches, [treeX + 0.10, h - 1.22, 11.66], [treeX + dx, h, 11.68], 0.029, 7);
  }
}

export function buildRoom(kit, world) {
  const parts = roomParts(kit);
  floor(kit, world, parts);
  rearWall(kit, world, parts);
  sideWalls(kit, world, parts);
  signage(kit, world, parts);
  frontWall(kit, world, parts);
  ceiling(kit, world, parts);
  exterior(kit, world);
}

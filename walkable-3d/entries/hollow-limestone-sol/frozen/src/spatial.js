import { noise, fbm, smooth } from './noise.js';
export const SPAWN = { x: 4.3, z: 16.8, yaw: 0.14 };
export const POOL = { x: -2.1, z: 2.0, rx: 5.75, rz: 7.65, y: -.22 };
export const ARCH = { x: 3.6, z: -10.15, rx: 3.32, ry: 4.05, thickness: 2.55 };
export const FORMATIONS = [
  { x: -8.55, z: 3.8, rx: 1.35, rz: 1.2, h: 10.5, kind: 'column' },
  { x: -6.8, z: -6.4, rx: 1.5, rz: 1.12, h: 3.2, kind: 'flowstone' },
  { x: 8.15, z: 3.0, rx: 1.05, rz: 1.4, h: 2.6, kind: 'flowstone' },
  { x: -5.9, z: 11.55, rx: 1.5, rz: 1.15, h: 1.9, kind: 'boulder' },
  { x: .1, z: -16.8, rx: .9, rz: .7, h: 1.8, kind: 'flowstone' }
];
export function poolRadius(theta) {
  return 1 + .047 * Math.sin(3 * theta + .6) + .026 * Math.sin(7 * theta + 1.8) + .022 * Math.cos(5 * theta);
}
export function poolMetric(x, z) {
  const nx = (x - POOL.x) / POOL.rx, nz = (z - POOL.z) / POOL.rz;
  return Math.hypot(nx, nz) / poolRadius(Math.atan2(nz, nx));
}
export function chamberRadius(theta, y = 0) {
  const fold = .21 * Math.sin(theta * 7.0 + y * .25) + .15 * Math.cos(theta * 11 - y * .2);
  const broad = .88 * Math.sin(theta * 3 + .8) + .32 * Math.cos(theta * 5);
  const shelves = .35 * Math.sin(y * 2.25 + .2 * Math.sin(theta * 4)) + .14 * Math.sin(y * 4.6);
  const lowerErosion = -.44 * Math.exp(-Math.pow((y - 1.8) / 1.2, 2));
  const ledges = -.31 * Math.exp(-Math.pow((y - 3.4 - .10 * Math.sin(theta * 3)) / .22, 2))
    - .27 * Math.exp(-Math.pow((y - 5.65 - .14 * Math.cos(theta * 4)) / .24, 2));
  const scallop = .38 * Math.sin(theta * 2.0 - .3) * Math.sin(y * .48 + .35);
  return broad + fold + shelves + lowerErosion + ledges + scallop;
}
export function mainMetric(x, z, padding = 0) {
  const theta = Math.atan2((x + 1) / 11.2, (z - 2) / 13.2);
  const offset = chamberRadius(theta, .1);
  return Math.hypot((x + 1) / (11.2 + offset - padding), (z - 2) / (13.2 + offset - padding));
}
export function inEntrance(x, z, padding = 0) {
  return x > 1.05 + padding && x < 7.35 - padding && z > 11.65 && z < 19.1 - padding;
}
export function landingMetric(x, z, padding = 0) {
  const theta = Math.atan2((x - 3.6) / 5.1, (z + 14.55) / 4.7);
  const mod = .18 * Math.sin(theta * 5) + .13 * Math.sin(theta * 9 + 1);
  return Math.hypot((x - 3.6) / (5.1 + mod - padding), (z + 14.55) / (4.7 + mod - padding));
}
export function inPassage(x, z, padding = 0) {
  return x > .33 + padding && x < 6.87 - padding && z < -7.8 && z > -14.6;
}
export function inCave(x, z, padding = 0) {
  return mainMetric(x, z, padding) < 1 || inEntrance(x, z, padding) || landingMetric(x, z, padding) < 1 || inPassage(x, z, padding);
}
export function dryFloorHeight(x, z) {
  const floorNoise = (fbm(x * .34, z * .34, 11.2) - .5) * .075;
  const landingRise = .94 * smooth(-7.65, -14.2, z);
  const entranceRise = .13 * smooth(12.2, 16.5, z);
  return floorNoise + landingRise + entranceRise;
}
export function floorHeight(x, z) {
  const r = poolMetric(x, z);
  const depth = -.82 + (noise(x * .55, z * .55, 6) - .5) * .14;
  return dryFloorHeight(x, z) * smooth(.92, 1.1, r) + depth * (1 - smooth(.56, 1.1, r));
}
export function mainCeilingHeight(x, z) {
  const r = Math.hypot((x + 1) / 11.4, (z - 2) / 13.5);
  return 7.85 + 3.45 * Math.sqrt(Math.max(0, 1 - r * r)) + (fbm(x * .5, 12, z * .5) - .5) * .9;
}
export function landingCeilingHeight(x, z) {
  const r = Math.hypot((x - 3.6) / 5.3, (z + 14.55) / 4.9);
  return 6.55 + 1.7 * Math.sqrt(Math.max(0, 1 - r * r)) + (noise(x * .7, 8, z * .7) - .5) * .46;
}
export function entranceCeilingHeight(x, z) {
  const recess = 6.1 + .35 * Math.sin((x-.7)/7*Math.PI) + (noise(x, 19, z)-.5)*.22;
  return mainCeilingHeight(x,z)*(1-smooth(12.7,16.3,z))+recess*smooth(12.7,16.3,z);
}
export function isWalkable(x, z, radius = .28) {
  if (!inCave(x, z, radius + .55)) return false;
  if (poolMetric(x, z) < 1.10 + radius / POOL.rx) return false;
  if (z > ARCH.z - 1.65 - radius && z < ARCH.z + 1.55 + radius &&
      (x < ARCH.x - ARCH.rx + radius + .12 || x > ARCH.x + ARCH.rx - radius - .12)) return false;
  for (const f of FORMATIONS) {
    if (Math.hypot((x - f.x) / (f.rx + radius), (z - f.z) / (f.rz + radius)) < 1) return false;
  }
  // Survey equipment is outside the main route, but still occupies real space.
  if (Math.hypot(x - 6.5, z + 16.2) < .49 + radius) return false;
  if (Math.abs(x - 7.35) < .42 + radius && Math.abs(z + 14.65) < .30 + radius) return false;
  return true;
}
export function moveWithCollision(position, dx, dz) {
  if (isWalkable(position.x + dx, position.z + dz)) {
    position.x += dx; position.z += dz; return;
  }
  if (isWalkable(position.x + dx, position.z)) position.x += dx;
  if (isWalkable(position.x, position.z + dz)) position.z += dz;
}
export function regionLabel(x, z) {
  if (z > 12.5) return 'Entrance recess';
  if (z < -12.8) return 'Survey landing';
  if (z < -8.3 && x > 0) return 'Natural arch';
  return 'Pool chamber';
}
export const INSPECTION_ROUTE = [
  [4.3, 16.8], [4.5, 12.3], [5.0, 8.4], [5.2, 4.5], [5.0, .5],
  [4.6, -3.4], [4.7, -6.5], [4.5, -9.0], [4.2, -11.4], [3.8, -14.6]
];

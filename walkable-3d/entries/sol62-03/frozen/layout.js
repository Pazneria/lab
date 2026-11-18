export const room = Object.freeze({
  radius: 4.60,
  outer: 5.28,
  height: 3.74,
  centerClearance: 1.31,
});
export const porch = Object.freeze({
  halfWidth: 1.46,
  front: 10.73,
  back: 4.05,
  stairHalfWidth: 2.24,
});
export const terrace = Object.freeze({
  start: 5.27,
  end: 11.58,
  side: 3.48,
  chamfer: 0.75,
});
export const eyeHeight = 1.65;
export const playerRadius = 0.24;
export const spawn = Object.freeze({ x: -2.62, z: 14.01, yaw: -0.238, pitch: 0.115 });
export const stairTreads = Object.freeze([
  { front: 11.02, height: 0 },
  { front: 11.40, height: -0.17 },
  { front: 11.78, height: -0.34 },
  { front: 12.16, height: -0.51 },
]);
export const approachHeight = -0.68;
export const sunDirection = Object.freeze({ x: -0.81, y: 0.45, z: 0.43 });
export const roofSlot = Object.freeze({ angle: Math.atan2(sunDirection.x, sunDirection.z), half: 0.48 });

export const doorways = Object.freeze([
  { angle: 0, halfWidth: 1.35, sill: 0, spring: 2.15, rise: 1.06, name: 'entry' },
  { angle: Math.PI / 2, halfWidth: 1.31, sill: 0, spring: 2.14, rise: 1.02, name: 'terrace' },
  { angle: Math.PI * 0.89, halfWidth: 0.22, sill: 1.47, spring: 2.40, rise: 0.19, name: 'north-slit' },
  { angle: Math.PI * 1.44, halfWidth: 0.23, sill: 1.47, spring: 2.40, rise: 0.19, name: 'west-slit' },
]);

export const blocks = Object.freeze([
  { x: -2.82, z: -2.20, width: 1.55, depth: 0.66, angle: -0.58 },
  { x: 1.78, z: -3.32, width: 1.32, depth: 0.48, angle: 0.37 },
  { x: 8.02, z: -2.78, width: 2.02, depth: 0.60, angle: 0 },
  { x: 10.40, z: 2.46, width: 0.65, depth: 0.52, angle: 0 },
]);

export function angleDifference(a, b) {
  return Math.atan2(Math.sin(a - b), Math.cos(a - b));
}

export function thresholdHeight(x, z) {
  if (z < 10.75) return 0;
  if (Math.abs(x) > porch.stairHalfWidth + 0.03) return approachHeight;
  return stairTreads.find(tread => z <= tread.front)?.height ?? approachHeight;
}

export function inBlock(x, z, block) {
  const dx = x - block.x;
  const dz = z - block.z;
  const cosine = Math.cos(block.angle);
  const sine = Math.sin(block.angle);
  const localX = cosine * dx - sine * dz;
  const localZ = sine * dx + cosine * dz;
  const outsideX = Math.max(Math.abs(localX) - block.width / 2, 0);
  const outsideZ = Math.max(Math.abs(localZ) - block.depth / 2, 0);
  return outsideX * outsideX + outsideZ * outsideZ < playerRadius * playerRadius;
}

export function canStand(x, z) {
  const az = Math.abs(z);
  const ax = Math.abs(x);
  const entry = z >= 3.95 && z <= 10.80 && ax <= 1.19;
  const topStair = z >= 11.19 && z <= 12.48 && ax <= 1.99;
  const portal = z >= 10.47 && z <= 11.24 && ax <= 1.19;
  const court = z >= 12.24 && z <= 14.82 && ax <= 4.05;
  const chamber = x * x + z * z <= (room.radius - playerRadius) ** 2;
  const entryArch = z >= 4.03 && z <= 5.60 && ax <= 1.08;
  const eastArch = x >= 4.02 && x <= 5.84 && az <= 1.04;
  const rim = terrace.end - playerRadius - 0.26;
  const deck = x >= 5.75 && x <= rim &&
    az <= terrace.side - playerRadius - 0.26 &&
    x + az <= terrace.end + terrace.side - terrace.chamfer - 0.64;
  if (!(entry || topStair || portal || court || chamber || entryArch || eastArch || deck)) return false;
  if (x * x + z * z < room.centerClearance ** 2) return false;
  return !blocks.some(block => inBlock(x, z, block));
}

export function locationName(x, z) {
  if (x > 5.37) return 'Viewing terrace';
  if (Math.hypot(x, z) < 5.40) return 'Instrument chamber';
  if (z < 10.85) return 'Entrance passage';
  return 'Approach';
}

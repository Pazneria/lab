export const ROOM = { left: -8.8, right: 8.8, back: -7.45, front: 7.35, ceiling: 6.72 };
export const ALCOVE = { left: -12.58, back: -3.35, front: 3.55, ceiling: 3.85 };
export const STAIR = { left: 5.42, right: 8.43, front: 5.61, run: 0.3175, rise: 0.155, count: 16 };
STAIR.top = STAIR.front - STAIR.count * STAIR.run;
export const DECK = { left: STAIR.left, right: 8.77, back: -6.18, front: STAIR.top, height: STAIR.rise * STAIR.count };
export const MACHINE = { x: -0.50, z: -0.40, y: 1.67, pad: { left: -2.95, right: 1.95, back: -3.16, front: 2.36, height: 0.085 } };
export const START = { x: -5.27, z: 5.18, y: 0, yaw: -0.61, pitch: 0.045 };
export const EYE_HEIGHT = 1.64;

const RADIUS = 0.23;
const HEAD_HEIGHT = 1.83;
const MAX_STEP = 0.24;
const MAX_INCREMENT = 0.056;
const obstacles = [
  // Permanent footprints and the raised guard rails, with bottom and top elevations.
  [-2.23, 1.23, -2.71, 1.89, 0.085, 2.96],
  [-2.08, 1.08, 1.89, 2.23, 0.38, 2.93],
  [1.10, 2.13, 1.15, 1.96, 0.085, 1.52],
  [-12.55, -11.67, -2.96, 2.91, 0, 2.75],
  [-10.61, -9.52, -2.90, -2.18, 0, 1.01],
  [-8.72, -7.99, 4.16, 6.92, 0, 2.37],
  [-8.72, -8.05, -6.96, -4.22, 0, 2.75],
  [-5.21, -3.23, -7.39, -6.50, 0, 1.24],
  [7.91, 8.77, -4.14, -2.03, 0, 2.03],
  [8.43, 8.79, -4.85, -3.07, 3.01, 4.36],
  [8.43, 8.79, -2.55, -0.81, 3.05, 4.41],
  ...[-5.49, -3.44, -1.37, 0.40].map(z => [7.48, 8.79, z - 0.092, z + 0.092, 0.96, 2.13]),
  [5.34, 5.52, STAIR.top - 0.11, STAIR.front + 0.10, 0, DECK.height + 1.22],
  [8.35, 8.51, STAIR.top - 0.11, STAIR.front + 0.10, 0, DECK.height + 1.22],
  [DECK.left - 0.03, DECK.left + 0.14, DECK.back, DECK.front - 0.03, DECK.height - 0.04, DECK.height + 1.11],
  [DECK.left, DECK.right, DECK.back - 0.035, DECK.back + 0.16, DECK.height - 0.04, DECK.height + 1.11],
];

const clamp = (x, low, high) => Math.max(low, Math.min(high, x));

function withinBoundary(x, z) {
  if (z < ROOM.back + RADIUS || z > ROOM.front - RADIUS || x > ROOM.right - RADIUS) return false;
  if (x >= ROOM.left + RADIUS) return true;
  return x >= ALCOVE.left + RADIUS && z >= ALCOVE.back + RADIUS && z <= ALCOVE.front - RADIUS;
}

function support(x, z, previousY) {
  if (x > STAIR.left && x < STAIR.right && z >= STAIR.top && z <= STAIR.front) {
    return clamp(((STAIR.front - z) / STAIR.run + 0.5) * STAIR.rise, 0, DECK.height);
  }
  if (previousY > DECK.height - MAX_STEP && x >= DECK.left && x < DECK.right &&
      z >= DECK.back && z < DECK.front) return DECK.height;
  const pad = MACHINE.pad;
  if (x >= pad.left && x <= pad.right && z >= pad.back && z <= pad.front) return pad.height;
  return 0;
}

function blocked(x, z, feet) {
  const head = feet + HEAD_HEIGHT;
  for (const [left, right, back, front, bottom, top] of obstacles) {
    if (head <= bottom || feet >= top || x + RADIUS <= left || x - RADIUS >= right ||
        z + RADIUS <= back || z - RADIUS >= front) continue;
    const dx = x - clamp(x, left, right);
    const dz = z - clamp(z, back, front);
    if (dx * dx + dz * dz < RADIUS * RADIUS) return true;
  }
  return false;
}

function step(pose, dx, dz) {
  const x = pose.x + dx;
  const z = pose.z + dz;
  if (!withinBoundary(x, z)) return false;
  const y = support(x, z, pose.y);
  if (Math.abs(y - pose.y) > MAX_STEP || blocked(x, z, y)) return false;
  pose.x = x;
  pose.z = z;
  pose.y = y;
  return true;
}

export function move(pose, dx, dz) {
  const n = Math.max(1, Math.ceil(Math.hypot(dx, dz) / MAX_INCREMENT));
  const x = dx / n;
  const z = dz / n;
  for (let i = 0; i < n; i++) {
    if (step(pose, x, z)) continue;
    if (x) step(pose, x, 0);
    if (z) step(pose, 0, z);
  }
}

export function locationOf({ x, z, y }) {
  if (x < ROOM.left + 0.05) return 'SERVICE ALCOVE';
  if (y > 0.14 && z >= STAIR.top) return 'ACCESS STAIRS';
  if (y > 2.3) return 'INSPECTION DECK';
  return 'MAIN WORK FLOOR';
}

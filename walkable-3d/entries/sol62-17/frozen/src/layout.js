// Coordinates are in metres. North is negative Z.
export const start = { x: -3.04, z: -2.85, yaw: -2.50, pitch: -0.045 };
export const eye = 1.66;
export const radius = 0.23;
export const floors = [
  [-4.08, 4.10, -3.48, 3.43],
  [4.10, 6.90, -3.48, 0.38],
  [-3.76, 3.76, 3.43, 5.42],
];

const walls = [
  [-4.26, -4.03, -3.66, 3.58],
  [-4.26, 7.06, -3.66, -3.42],
  [4.02, 4.21, -3.48, -2.75],
  [4.02, 4.21, -0.65, 3.53],
  [6.85, 7.08, -3.48, 0.49],
  [4.09, 7.08, 0.28, 0.49],
  [-4.20, -1.05, 3.34, 3.56],
  [1.05, 4.19, 3.34, 3.56],
  [-3.85, -3.63, 3.45, 5.43],
  [3.63, 3.85, 3.45, 5.43],
  [-3.85, 3.85, 5.28, 5.49],
];

export const furniture = {
  bed: [-0.13, 1.57, -3.38, -1.10],
  footChest: [0.08, 1.33, -1.03, -0.61],
  hearth: [-4.05, -3.30, -1.06, 0.66],
  windowSeat: [-3.71, -1.87, 2.75, 3.34],
  sideboard: [3.31, 3.99, 1.00, 2.30],
  washstand: [2.05, 3.30, 2.80, 3.37],
  entryRack: [-4.04, -3.58, -2.55, -1.30],
  bedside: [1.71, 2.32, -3.36, -2.78],
  desk: [4.55, 6.73, -3.38, -2.51],
  stool: [5.57, 6.02, -2.35, -1.89],
  storage: [6.43, 6.85, -2.45, 0.11],
  basket: [6.03, 6.42, -0.22, 0.20],
  bench: [1.82, 3.32, 4.84, 5.25],
};

const blocks = [...walls, ...Object.values(furniture)];
const roundFurniture = [[-1.84, .55, .528], [-3.62, 2.29, .218], [-3.37, 4.59, .199]];
const seat = { x: -2.75, z: 1.615, sin: Math.sin(2.23), cos: Math.cos(2.23) };

export function canStand(x, z, clearance = radius) {
  if (!floors.some(([x0, x1, z0, z1]) => x >= x0 && x <= x1 && z >= z0 && z <= z1)) return false;
  for (const rect of blocks) if (touchesBox(x, z, rect, clearance)) return false;
  for (const [cx, cz, r] of roundFurniture) {
    if ((x - cx) ** 2 + (z - cz) ** 2 < (clearance + r) ** 2) return false;
  }
  const dx = x - seat.x, dz = z - seat.z;
  const localX = dx * seat.cos - dz * seat.sin;
  const localZ = dx * seat.sin + dz * seat.cos;
  return !touchesBox(localX, localZ, [-.49, .49, -.43, .42], clearance);
}

function touchesBox(x, z, [x0, x1, z0, z1], r) {
  const dx = x - Math.max(x0, Math.min(x1, x));
  const dz = z - Math.max(z0, Math.min(z1, z));
  return dx * dx + dz * dz < r * r;
}

export function move(position, dx, dz) {
  const steps = Math.max(1, Math.ceil(Math.hypot(dx, dz) / 0.10));
  const stepX = dx / steps;
  const stepZ = dz / steps;
  for (let i = 0; i < steps; i++) {
    if (canStand(position.x + stepX, position.z + stepZ)) {
      position.x += stepX;
      position.z += stepZ;
      continue;
    }
    if (canStand(position.x + stepX, position.z)) position.x += stepX;
    if (canStand(position.x, position.z + stepZ)) position.z += stepZ;
  }
  return position;
}

export function area(x, z) {
  if (z > 3.48) return 'The covered balcony';
  if (x > 4.15) return 'The map room';
  return 'The upstairs room';
}

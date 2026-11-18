export const house = {
  halfWidth: 4.75,
  halfLength: 8.4,
  eaves: 3.38,
  peak: 5.48,
  doorHalfWidth: 1.13,
  foundation: .64,
  westPlant: -3.86,
  eastPlant: 3.85,
};

export const bed = { left: -1.58, right: 1.58, back: -5.72, front: 5.45, top: .39 };
export const alcove = { left: -.83, right: 2.32, back: -8.26, front: -7.59 };
export const spawn = { x: -.50, z: 10.56, yaw: -.12, pitch: .126 };
export const eyeHeight = 1.66;
export const crouchHeight = 1.13;
export const bodyRadius = .25;

const obstacles = [
  [bed.left, bed.right, bed.back, bed.front],
  [-4.75, house.westPlant, -7.06, 7.59],
  [house.eastPlant, 4.75, -6.77, 7.59],
  [alcove.left, alcove.right, alcove.back, alcove.front],
  [2.72, 3.35, -8.14, -7.51],
  [-2.96, -2.46, -8.19, -7.63],
  [-4.79, -house.doorHalfWidth, 8.32, 8.48],
  [house.doorHalfWidth, 4.79, 8.32, 8.48],
  [-1.23, -.99, 8.40, 9.35],
  [1.04, 1.27, 8.40, 9.35],
];

export function canStand(x, z, radius = bodyRadius) {
  if (x < -house.halfWidth + radius || x > house.halfWidth - radius ||
      z < -house.halfLength + radius || z > 11.36 - radius) return false;
  if (z > 8.35 && (x < -3.24 + radius || x > 3.29 - radius)) return false;
  for (const [left, right, back, front] of obstacles) {
    const dx = x - Math.max(left, Math.min(right, x));
    const dz = z - Math.max(back, Math.min(front, z));
    if (dx * dx + dz * dz < radius * radius) return false;
  }
  return true;
}

export function slide(position, dx, dz) {
  // Small increments prevent passing through rails when resuming after a frame stall.
  const count = Math.max(1, Math.ceil(Math.hypot(dx, dz) / .11));
  const stepX = dx / count, stepZ = dz / count;
  for (let i = 0; i < count; i++) {
    if (canStand(position.x + stepX, position.z)) position.x += stepX;
    if (canStand(position.x, position.z + stepZ)) position.z += stepZ;
  }
}

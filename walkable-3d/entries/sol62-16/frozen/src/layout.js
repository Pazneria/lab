export const start = Object.freeze({ x: -1.78, z: 3.97, yaw: 0.223, pitch: -0.064 });
export const eyeHeight = 1.64;
export const bodyRadius = 0.235;

export const plan = Object.freeze({
  west: -4.63, east: 0.98, north: -6.08, south: 4.56,
  divider: -1.17, hallLeft: -3.30, hallRight: -1.19,
  greenhouseEast: 5.36, greenhouseNorth: -6.08, greenhouseSouth: -1.49,
  gable: -3.785, greenhouseDoorNorth: -4.88, greenhouseDoorSouth: -3.16,
});

const p = plan;

export const obstacles = [
  [-6, p.west + 0.12, p.north - 0.8, p.south + 0.8],
  [p.west - 0.4, p.greenhouseEast + 0.5, -7, p.north + 0.12],
  [p.west - 0.4, p.east + 0.4, p.south - 0.12, p.south + 1],
  [p.east - 0.12, p.east + 0.12, p.north, p.greenhouseDoorNorth],
  [p.east - 0.12, p.east + 0.12, p.greenhouseDoorSouth, p.south],
  [p.west, p.hallLeft, p.divider - 0.12, p.divider + 0.12],
  [p.hallRight, p.east, p.divider - 0.12, p.divider + 0.12],
  [p.greenhouseEast - 0.12, p.greenhouseEast + 0.8, p.greenhouseNorth, p.greenhouseSouth + 0.7],
  [p.east, p.greenhouseEast + 0.1, p.greenhouseSouth - 0.12, p.greenhouseSouth + 0.6],
  [-4.54, -3.70, 0.36, 3.74],  // Kitchen cabinetry.
  [-4.52, -4.09, 3.93, 4.40],  // Entrance storage crate.
  [-4.52, -3.59, -0.86, 0.36], // Range and hearth.
  [-0.84, 0.65, 0.92, 2.05],   // Dining table.
  [-0.57, 0.13, 2.04, 2.73],   // Chair toward entrance.
  [-0.57, 0.15, 0.25, 0.94],   // Chair toward hall.
  [0.44, 0.91, -0.91, 0.08],   // Kitchen sideboard.
  [-4.53, -3.20, -4.96, -1.72], // Magical workbench.
  [-4.55, 0.67, -5.99, -5.48],  // Library wall.
  [0.37, 0.84, -2.94, -1.49],   // Workroom cabinet.
  [1.25, 4.73, -5.97, -5.06],   // North planting bench.
  [1.30, 4.74, -2.76, -1.60],   // South planting bench.
  [4.76, 5.25, -4.48, -3.22],   // Floor pots at far gable.
];

function withinRooms(x, z) {
  return (x >= p.west && x <= p.east && z >= p.north && z <= p.south)
    || (x >= p.east && x <= p.greenhouseEast && z >= p.greenhouseNorth && z <= p.greenhouseSouth);
}

export function canStand(x, z, radius = bodyRadius) {
  if (!withinRooms(x, z)) return false;
  for (const [left, right, north, south] of obstacles) {
    const dx = x - Math.max(left, Math.min(right, x));
    const dz = z - Math.max(north, Math.min(south, z));
    if (dx * dx + dz * dz < radius * radius) return false;
  }
  return true;
}

export function move(body, dx, dz) {
  const steps = Math.max(1, Math.ceil(Math.hypot(dx, dz) / 0.11));
  dx /= steps;
  dz /= steps;
  for (let step = 0; step < steps; step++) {
    if (canStand(body.x + dx, body.z)) body.x += dx;
    if (canStand(body.x, body.z + dz)) body.z += dz;
  }
}

export function roomAt(x, z) {
  if (x > p.east + 0.13) return 'Greenhouse';
  return z < p.divider ? 'Workroom' : 'Kitchen';
}

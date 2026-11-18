export const room = {
  left: -5.15,
  right: 5.15,
  back: -7.72,
  front: 5.58,
  ceiling: 3.48,
  booth: { right: 7.72, back: -6.72, front: -2.24 },
};

export const spawn = { x: -0.18, z: 4.91, yaw: -0.018, pitch: -0.026 };
export const eyeHeight = 1.64;
export const bodyRadius = 0.235;

export const games = [
  {
    id: 'ember', family: 'orbit', name: 'EMBER ORBIT', split: ['EMBER', 'ORBIT'],
    tagline: 'PILOT THE PERIHELION', station: '01', x: -3.47, z: 1.95, yaw: 1.28, width: 0.96,
    ink: '#231d2d', shade: '#532b39', body: '#923c42', bright: '#f6ac62', pale: '#ffe4ac',
    second: '#d86351', screen: '#291629', controls: 'joystick',
  },
  {
    id: 'comet', family: 'orbit', name: 'COMET POST', split: ['COMET', 'POST'],
    tagline: 'EXPRESS THROUGH THE BELT', station: '02', x: -3.50, z: 0.21, yaw: 1.28, width: 0.96,
    ink: '#222539', shade: '#38324b', body: '#8c6836', bright: '#ffce72', pale: '#fbe9ba',
    second: '#6b7994', screen: '#241f3d', controls: 'trackball',
  },
  {
    id: 'moss', family: 'relay', name: 'MOSS RELAY', split: ['MOSS', 'RELAY'],
    tagline: 'FIND THE FOREST SIGNAL', station: '03', x: 3.48, z: 1.59, yaw: -1.24, width: 0.85,
    ink: '#123238', shade: '#1a5050', body: '#2e7770', bright: '#ace9ac', pale: '#e3f9cb',
    second: '#4fad92', screen: '#102d30', controls: 'lever',
  },
  {
    id: 'glass', family: 'relay', name: 'GLASS HARBOR', split: ['GLASS', 'HARBOR'],
    tagline: 'KEEP THE BEACONS ALIGHT', station: '04', x: 3.48, z: -0.17, yaw: -1.24, width: 0.85,
    ink: '#23243d', shade: '#443f68', body: '#5b567f', bright: '#cbbefb', pale: '#fae3e7',
    second: '#789cbd', screen: '#191d3c', controls: 'dials',
  },
];

export const feature = {
  id: 'current', family: 'feature', name: 'NIGHT CURRENT', split: ['NIGHT', 'CURRENT'],
  tagline: 'FOLLOW THE BIOLUMINESCENT TIDE', station: '05', x: 0.18, z: -4.90, yaw: 0, width: 1.65,
  ink: '#132833', shade: '#214c53', body: '#2a6164', bright: '#ffd78d', pale: '#fff2ce',
  second: '#66c8be', screen: '#101f30',
};

export const counter = { x: 6.91, z: -4.60, w: 0.88, d: 3.67 };
export const stool = { x: 5.95, z: -3.03, radius: 0.27 };
export const changer = { x: -4.70, z: 3.63, w: 0.59, d: 0.49 };
export const rack = { x: -4.75, z: -5.47, w: 0.56, d: 1.10 };

function box(x, z, w, d, yaw = 0, offsetZ = 0) {
  return {
    x: x + Math.sin(yaw) * offsetZ,
    z: z + Math.cos(yaw) * offsetZ,
    hx: w * 0.5, hz: d * 0.5,
    c: Math.cos(yaw), s: Math.sin(yaw),
  };
}

const obstacles = [
  box(0.15, room.back + 0.095, 6.47, 0.190),
  ...games.flatMap(game => [
    box(game.x, game.z, game.width + 0.045, 1.03, game.yaw, -0.025),
    box(game.x, game.z, game.width - 0.05, 0.34, game.yaw, 0.50),
  ]),
  box(feature.x, feature.z, 1.79, 1.33, 0, 0.005),
  box(feature.x, feature.z, 2.33, 0.93, 0, -0.105),
  box(feature.x, feature.z, 1.64, 0.62, 0, 0.607),
  box(counter.x - 0.020, counter.z, counter.w + 0.040, counter.d),
  box(changer.x, changer.z, changer.w, changer.d),
  box(rack.x, rack.z, rack.w, rack.d),
];

export function canStand(x, z, radius = bodyRadius) {
  if (x < room.left + radius || z < room.back + radius || z > room.front - radius) return false;
  if (x > room.right - radius) {
    if (z < room.booth.back + radius || z > room.booth.front - radius ||
        x > room.booth.right - radius) return false;
  }
  if ((x - stool.x) ** 2 + (z - stool.z) ** 2 < (stool.radius + radius) ** 2) return false;
  for (const item of obstacles) {
    const dx = x - item.x;
    const dz = z - item.z;
    const localX = item.c * dx - item.s * dz;
    const localZ = item.s * dx + item.c * dz;
    const edgeX = Math.max(0, Math.abs(localX) - item.hx);
    const edgeZ = Math.max(0, Math.abs(localZ) - item.hz);
    if (edgeX * edgeX + edgeZ * edgeZ < radius * radius) return false;
  }
  return true;
}

export function moveWithCollision(pose, dx, dz) {
  const parts = Math.max(1, Math.ceil(Math.hypot(dx, dz) / 0.075));
  const stepX = dx / parts;
  const stepZ = dz / parts;
  for (let step = 0; step < parts; step += 1) {
    if (canStand(pose.x + stepX, pose.z)) pose.x += stepX;
    if (canStand(pose.x, pose.z + stepZ)) pose.z += stepZ;
  }
}

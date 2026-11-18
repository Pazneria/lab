export const FLOOR = 1.10;
export const STAIR_Z = [-.25, .79];
export const STAIR_X = [-4.78, -4.49, -4.20, -3.91, -3.62, -3.32];
export const STAIR_Y = [.22, .44, .66, .88, FLOOR];
export const HOME_LIMIT = -.22;
export const SPAWN = {x: -5.85, z: 6.05, yaw: -.74, pitch: -.046};

export function elevation(x, z) {
  if (x >= -3.32 && x <= 3.17 && z >= -1.31 && z <= 1.31) return FLOOR;
  if (x >= STAIR_X[0] && x < STAIR_X.at(-1) && z > STAIR_Z[0] - .055 && z < STAIR_Z[1] + .055) {
    return STAIR_Y[Math.min(4, Math.floor((x - STAIR_X[0] + .00001) / .29))];
  }
  return 0;
}

export class Footprint {
  constructor() {
    this.rects = [];
    this.circles = [];
  }

  rect(x0, x1, z0, z1, y0 = 0, y1 = 4) {
    this.rects.push({x0, x1, z0, z1, y0, y1});
  }

  circle(x, z, radius, y0 = 0, y1 = 4) {
    this.circles.push({x, z, radius, y0, y1});
  }

  hits(x, y, z, radius = .215) {
    for (const r of this.rects) {
      if (r.y1 <= y + .065 || r.y0 >= y + 1.70) continue;
      const dx = x - Math.max(r.x0, Math.min(r.x1, x));
      const dz = z - Math.max(r.z0, Math.min(r.z1, z));
      if (dx * dx + dz * dz < radius * radius) return true;
    }
    for (const c of this.circles) {
      if (c.y1 <= y + .065 || c.y0 >= y + 1.70) continue;
      const r = radius + c.radius;
      if ((x - c.x) ** 2 + (z - c.z) ** 2 < r * r) return true;
    }
    return false;
  }

  advance(position, dx, dz) {
    const pieces = Math.max(1, Math.ceil(Math.hypot(dx, dz) / .055));
    for (let i = 0; i < pieces; i++) {
      this.tryStep(position, dx / pieces, 0);
      this.tryStep(position, 0, dz / pieces);
    }
  }

  tryStep(position, dx, dz) {
    const x = position.x + dx;
    const z = position.z + dz;
    const y = elevation(x, z);
    if ((x / 12) ** 2 + ((z - .45) / 10) ** 2 > 1) return;
    if (Math.abs(y - position.y) > .245 || this.hits(x, y, z)) return;
    position.x = x;
    position.z = z;
    position.y = y;
  }
}

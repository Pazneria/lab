export const SPAWN = Object.freeze({ x: 0, y: 1.64, z: 4.78, yaw: 0, pitch: -.033 });
export const PLAYER_RADIUS = .27;

const halfHall = 4.60;
const halfWings = 8.82;
const front = 6.20;
const back = -7.10;
const wingFront = 1.38;
const wingBack = -5.38;
const obstacles = [
  { name: 'Spectral Array', minX: -1.46, maxX: 1.46, minZ: -1.83, maxZ: .72 },
  { name: 'Perception bench', minX: -8.11, maxX: -7.01, minZ: -4.24, maxZ: .12 },
  { name: 'Motion bench', minX: 6.90, maxX: 8.16, minZ: -4.34, maxZ: .28 },
  { name: 'Entry seat', minX: -3.46, maxX: -1.67, minZ: 5.58, maxZ: 6.10 },
  { name: 'Entry doors', minX: -1.35, maxX: 1.35, minZ: 5.88, maxZ: 6.20 },
  { name: 'West rear cabinet', minX: -3.43, maxX: -1.85, minZ: -7.10, maxZ: -6.40 },
  { name: 'East rear cabinet', minX: 1.85, maxX: 3.43, minZ: -7.10, maxZ: -6.40 }
];
const walls = [[-halfHall, back, halfHall, back], [-halfHall, front, halfHall, front]];
for (const side of [-1, 1]) {
  const hallX = side * halfHall;
  const wingX = side * halfWings;
  walls.push(
    [hallX, back, hallX, wingBack], [hallX, wingFront, hallX, front],
    [hallX, wingBack, wingX, wingBack], [hallX, wingFront, wingX, wingFront],
    [wingX, wingBack, wingX, wingFront]
  );
  for (const z of [wingBack, wingFront]) {
    obstacles.push({ name: 'Alcove corner post', minX: hallX - .17, maxX: hallX + .17, minZ: z - .15, maxZ: z + .15 });
  }
}

function distanceToBoxSquared(x, z, x1, z1, x2, z2) {
  const dx = Math.max(Math.min(x1, x2) - x, 0, x - Math.max(x1, x2));
  const dz = Math.max(Math.min(z1, z2) - z, 0, z - Math.max(z1, z2));
  return dx * dx + dz * dz;
}

export function canOccupy(x, z, radius = PLAYER_RADIUS) {
  const insideMain = Math.abs(x) <= halfHall && z >= back && z <= front;
  const insideWing = Math.abs(x) > halfHall && Math.abs(x) <= halfWings && z >= wingBack && z <= wingFront;
  if (!insideMain && !insideWing) return false;

  const radiusSquared = radius * radius;
  for (const [x1, z1, x2, z2] of walls) {
    if (distanceToBoxSquared(x, z, x1, z1, x2, z2) < radiusSquared) return false;
  }
  for (const block of obstacles) {
    if (distanceToBoxSquared(x, z, block.minX, block.minZ, block.maxX, block.maxZ) < radiusSquared) return false;
  }
  return true;
}

export function travel(position, dx, dz) {
  const count = Math.max(1, Math.ceil(Math.hypot(dx, dz) / .075));
  const stepX = dx / count;
  const stepZ = dz / count;
  for (let i = 0; i < count; ++i) {
    if (canOccupy(position.x + stepX, position.z)) position.x += stepX;
    if (canOccupy(position.x, position.z + stepZ)) position.z += stepZ;
  }
}

const keysToUse = new Set([
  'KeyW', 'KeyA', 'KeyS', 'KeyD', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight',
  'PageUp', 'PageDown', 'ShiftLeft', 'ShiftRight'
]);
const startKeys = new Set(['KeyW', 'KeyA', 'KeyS', 'KeyD', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']);
const pitchLimit = Math.PI * .483;

export class WalkController {
  constructor(canvas, onChange) {
    this.canvas = canvas;
    this.onChange = onChange;
    this.position = { x: SPAWN.x, z: SPAWN.z };
    this.velocity = { x: 0, z: 0 };
    this.yaw = SPAWN.yaw;
    this.pitch = SPAWN.pitch;
    this.keys = new Set();
    this.mode = 'idle';
    this.drag = null;
    this.waitingForLock = false;

    document.addEventListener('pointerlockchange', () => {
      this.waitingForLock = false;
      if (document.pointerLockElement === canvas) this.setMode('locked');
      else if (this.mode === 'locked') this.pause();
    });
    document.addEventListener('pointerlockerror', () => {
      if (this.waitingForLock) this.setMode('drag');
      this.waitingForLock = false;
    });
    window.addEventListener('blur', () => this.clearInput());

    document.addEventListener('keydown', (event) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (event.code === 'Escape') {
        if (this.mode !== 'idle') this.pause();
        return;
      }
      if (event.code === 'KeyR') {
        this.reset();
        return;
      }
      if (!keysToUse.has(event.code)) return;
      event.preventDefault();
      if (this.mode === 'idle' && startKeys.has(event.code)) this.setMode('drag');
      if (this.mode !== 'idle') this.keys.add(event.code);
    });
    document.addEventListener('keyup', (event) => this.keys.delete(event.code));

    document.addEventListener('mousemove', (event) => {
      if (this.mode === 'locked') this.look(event.movementX, event.movementY);
    });
    canvas.addEventListener('pointerdown', (event) => {
      if (this.mode !== 'drag' || event.button !== 0) return;
      this.drag = { id: event.pointerId, x: event.clientX, y: event.clientY };
      canvas.setPointerCapture(event.pointerId);
      event.preventDefault();
    });
    canvas.addEventListener('pointermove', (event) => {
      if (this.drag?.id !== event.pointerId || this.mode !== 'drag') return;
      this.look(event.clientX - this.drag.x, event.clientY - this.drag.y);
      this.drag.x = event.clientX;
      this.drag.y = event.clientY;
    });
    for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) {
      canvas.addEventListener(type, (event) => {
        if (this.drag?.id === event.pointerId) this.drag = null;
      });
    }
  }

  activate() {
    if (this.mode !== 'idle' || this.waitingForLock) return;
    if (!this.canvas.requestPointerLock) {
      this.setMode('drag');
      return;
    }
    this.waitingForLock = true;
    const fallback = () => {
      if (this.waitingForLock) this.setMode('drag');
      this.waitingForLock = false;
    };
    try {
      this.canvas.requestPointerLock()?.catch(fallback);
    } catch {
      fallback();
    }
  }

  clearInput() {
    this.keys.clear();
    this.velocity.x = 0;
    this.velocity.z = 0;
    this.drag = null;
  }

  setMode(mode) {
    this.clearInput();
    this.mode = mode;
    this.onChange();
  }

  pause() {
    this.waitingForLock = false;
    if (document.pointerLockElement === this.canvas) document.exitPointerLock();
    this.setMode('idle');
  }

  reset() {
    this.clearInput();
    this.position.x = SPAWN.x;
    this.position.z = SPAWN.z;
    this.yaw = SPAWN.yaw;
    this.pitch = SPAWN.pitch;
    this.onChange();
  }

  look(dx, dy) {
    const scale = this.mode === 'drag' ? .0041 : .00215;
    this.yaw -= dx * scale;
    this.pitch = Math.max(-pitchLimit, Math.min(pitchLimit, this.pitch - dy * scale));
    this.onChange();
  }

  update(dt) {
    if (this.mode === 'idle') return false;
    const keys = this.keys;
    const forward = Number(keys.has('KeyW') || keys.has('ArrowUp')) - Number(keys.has('KeyS') || keys.has('ArrowDown'));
    const right = Number(keys.has('KeyD')) - Number(keys.has('KeyA'));
    const turn = Number(keys.has('ArrowLeft')) - Number(keys.has('ArrowRight'));
    const tilt = Number(keys.has('PageUp')) - Number(keys.has('PageDown'));
    this.yaw += turn * dt * 1.72;
    this.pitch = Math.max(-pitchLimit, Math.min(pitchLimit, this.pitch + tilt * dt * 1.35));
    const norm = Math.max(1, Math.hypot(forward, right));
    const speed = (keys.has('ShiftLeft') || keys.has('ShiftRight') ? 3.85 : 2.42) / norm;
    const sin = Math.sin(this.yaw);
    const cos = Math.cos(this.yaw);
    const targetX = (right * cos - forward * sin) * speed;
    const targetZ = (-right * sin - forward * cos) * speed;
    const damping = 1 - Math.exp(-dt * 17);
    const v = this.velocity;
    v.x += (targetX - v.x) * damping;
    v.z += (targetZ - v.z) * damping;
    if (Math.abs(v.x) < .001) v.x = 0;
    if (Math.abs(v.z) < .001) v.z = 0;
    if (v.x || v.z) {
      const oldX = this.position.x;
      const oldZ = this.position.z;
      travel(this.position, v.x * dt, v.z * dt);
      return turn !== 0 || tilt !== 0 || oldX !== this.position.x || oldZ !== this.position.z;
    }
    return turn !== 0 || tilt !== 0;
  }
}

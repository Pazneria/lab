import { canStand, eyeHeight, locationName, spawn, thresholdHeight } from './layout.js';

const walkingKeys = new Set([
  'KeyW', 'KeyS', 'KeyA', 'KeyD', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight',
  'ShiftLeft', 'ShiftRight',
]);

export function moveOnFloor(position, dx, dz) {
  const count = Math.max(1, Math.ceil(Math.hypot(dx, dz) / 0.055));
  const stepX = dx / count;
  const stepZ = dz / count;
  for (let i = 0; i < count; i += 1) {
    const x = position.x + stepX;
    const z = position.z + stepZ;
    if (canStand(x, z)) {
      position.x = x;
      position.z = z;
      continue;
    }
    if (canStand(x, position.z)) position.x = x;
    if (canStand(position.x, z)) position.z = z;
  }
  return position;
}

export function createWalker(camera, canvas, ui) {
  const keys = new Set();
  const eye = { x: spawn.x, z: spawn.z };
  let cameraY = 0;
  let yaw = spawn.yaw;
  let pitch = spawn.pitch;
  let velocityX = 0;
  let velocityZ = 0;
  let mode = 'idle';
  let entered = false;
  let dragging = false;
  let dragPointer = null;
  let pointerX = 0;
  let pointerY = 0;
  let triedLock = 0;
  let lastLocation = '';
  let needsRender = true;

  const setMode = next => {
    mode = next;
    keys.clear();
    velocityX = 0;
    velocityZ = 0;
    dragging = false;
    dragPointer = null;
    ui.intro.hidden = mode !== 'idle';
    ui.controls.hidden = mode === 'idle';
    ui.reticle.hidden = mode !== 'locked';
    ui.lookLabel.innerHTML = mode === 'drag' ? '<kbd>Drag</kbd> Look' : '<kbd>Mouse</kbd> Look';
    if (entered && mode === 'idle') {
      ui.headline.textContent = 'Exploration paused';
      ui.description.textContent = 'Pick up where you left off.';
      ui.enter.textContent = 'Resume exploring';
      ui.hint.textContent = 'WASD or arrow keys to walk. Press R to return to the approach.';
    }
  };

  const reset = () => {
    eye.x = spawn.x;
    eye.z = spawn.z;
    yaw = spawn.yaw;
    pitch = spawn.pitch;
    cameraY = thresholdHeight(eye.x, eye.z) + eyeHeight;
    velocityX = 0;
    velocityZ = 0;
    keys.clear();
    needsRender = true;
  };

  const turn = (deltaX, deltaY) => {
    if (!Number.isFinite(deltaX) || !Number.isFinite(deltaY)) return;
    yaw -= deltaX * 0.00205;
    pitch = Math.max(-1.48, Math.min(1.48, pitch - deltaY * 0.00205));
    needsRender = true;
  };

  const useDrag = () => {
    if (document.pointerLockElement === canvas || mode === 'locked') return;
    entered = true;
    setMode('drag');
    canvas.focus();
  };

  ui.enter.addEventListener('click', () => {
    entered = true;
    if (!canvas.requestPointerLock) {
      useDrag();
      return;
    }
    const attempt = ++triedLock;
    try {
      const request = canvas.requestPointerLock();
      if (request?.catch) request.catch(() => { if (attempt === triedLock) useDrag(); });
      else window.setTimeout(() => { if (attempt === triedLock && mode === 'idle') useDrag(); }, 850);
    } catch {
      useDrag();
    }
  });
  document.addEventListener('pointerlockchange', () => {
    triedLock += 1;
    if (document.pointerLockElement === canvas) setMode('locked');
    else if (mode === 'locked') setMode('idle');
  });
  document.addEventListener('pointerlockerror', useDrag);
  document.addEventListener('mousemove', event => {
    if (mode === 'locked') turn(event.movementX, event.movementY);
  });
  canvas.addEventListener('pointerdown', event => {
    if (mode !== 'drag' || event.button !== 0) return;
    dragging = true;
    dragPointer = event.pointerId;
    pointerX = event.clientX;
    pointerY = event.clientY;
    canvas.setPointerCapture(event.pointerId);
  });
  canvas.addEventListener('pointermove', event => {
    if (!dragging || event.pointerId !== dragPointer) return;
    turn(event.clientX - pointerX, event.clientY - pointerY);
    pointerX = event.clientX;
    pointerY = event.clientY;
  });
  for (const eventName of ['pointerup', 'pointercancel', 'lostpointercapture']) {
    canvas.addEventListener(eventName, event => {
      if (event.pointerId === dragPointer) dragging = false;
    });
  }
  window.addEventListener('keydown', event => {
    if (event.code === 'KeyR' && !event.repeat && !event.ctrlKey && !event.metaKey) reset();
    if (event.code === 'Escape' && mode === 'drag') setMode('idle');
    if (mode === 'idle' || !walkingKeys.has(event.code) || event.ctrlKey || event.metaKey) return;
    keys.add(event.code);
    event.preventDefault();
  });
  window.addEventListener('keyup', event => keys.delete(event.code));
  window.addEventListener('blur', () => {
    keys.clear();
    velocityX = 0;
    velocityZ = 0;
    dragging = false;
    if (mode === 'drag') setMode('idle');
  });
  ui.reset.addEventListener('click', reset);

  reset();
  camera.rotation.order = 'YXZ';

  return {
    update(dt) {
      const forward = Number(keys.has('KeyW') || keys.has('ArrowUp')) -
        Number(keys.has('KeyS') || keys.has('ArrowDown'));
      const strafe = Number(keys.has('KeyD') || keys.has('ArrowRight')) -
        Number(keys.has('KeyA') || keys.has('ArrowLeft'));
      const speed = keys.has('ShiftLeft') || keys.has('ShiftRight') ? 3.5 : 2.28;
      const scale = speed / (Math.hypot(forward, strafe) || 1);
      const goalX = (strafe * Math.cos(yaw) - forward * Math.sin(yaw)) * scale;
      const goalZ = (-strafe * Math.sin(yaw) - forward * Math.cos(yaw)) * scale;
      const blend = 1 - Math.exp(-dt * (forward || strafe ? 16 : 22));
      velocityX += (goalX - velocityX) * blend;
      velocityZ += (goalZ - velocityZ) * blend;
      const previousX = eye.x;
      const previousZ = eye.z;
      if (Math.abs(velocityX) + Math.abs(velocityZ) > 0.008) {
        moveOnFloor(eye, velocityX * dt, velocityZ * dt);
      }
      const goalY = thresholdHeight(eye.x, eye.z) + eyeHeight;
      const rising = Math.abs(goalY - cameraY) > 0.001;
      cameraY = rising ? cameraY + (goalY - cameraY) * (1 - Math.exp(-dt * 13)) : goalY;
      const changed = needsRender || rising || eye.x !== previousX || eye.z !== previousZ;
      if (changed) {
        camera.position.set(eye.x, cameraY, eye.z);
        camera.rotation.set(pitch, yaw, 0, 'YXZ');
        const location = locationName(eye.x, eye.z);
        if (location !== lastLocation) {
          ui.location.textContent = location;
          lastLocation = location;
        }
        needsRender = false;
      }
      return changed;
    },
  };
}

import { clamp } from './layout.js';

const moveKeys = new Set([
  'KeyW', 'KeyA', 'KeyS', 'KeyD', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ShiftLeft', 'ShiftRight',
]);
const instructions = {
  paused: 'The shelter is still here. Resume to keep exploring.',

  touch: 'Walk with the left stick and drag anywhere on the scene to look around.',
};

export function connectInput(elements, walker, { started, stopped, dirty }) {
  const { view, canvas, overlay, go, intro } = elements;
  const touch = view.querySelector('.touch');
  const stick = view.querySelector('#stick');
  const knob = view.querySelector('#knob');
  const keys = new Set();
  const coarse = matchMedia('(pointer: coarse)');
  let mode = null;
  let awaitingLock = false;
  let entered = false;
  let lookPointer = null;
  let stickPointer = null;
  let previousX = 0;
  let previousY = 0;
  let side = 0;
  let forward = 0;

  go.textContent = 'Enter scene';
  go.disabled = false;
  if (coarse.matches) intro.textContent = instructions.touch;

  go.addEventListener('click', event => {
    if (awaitingLock) return;
    if (event.pointerType === 'touch' || coarse.matches) {
      enable('touch');
      return;
    }
    if (typeof canvas.requestPointerLock !== 'function') {
      enable('drag');
      return;
    }
    awaitingLock = true;
    try {
      const attempt = canvas.requestPointerLock();
      attempt?.catch(fallback);
    } catch {
      fallback();
    }
  });

  function fallback() {
    if (!awaitingLock) return;
    awaitingLock = false;
    enable('drag');

  }

  document.addEventListener('pointerlockchange', () => {
    if (document.pointerLockElement === canvas) enable('lock');
    else if (mode === 'lock') pause();
  });
  document.addEventListener('pointerlockerror', fallback);

  function enable(kind) {
    awaitingLock = false;
    mode = kind;
    entered = true;
    overlay.hidden = true;
    touch.hidden = kind !== 'touch';
    view.classList.add('playing');
    view.classList.toggle('touch-mode', kind === 'touch');
    elements.help.innerHTML = kind === 'drag'
      ? '<kbd>Drag</kbd> Look <kbd>W A S D</kbd> Move <kbd>R</kbd> Reset <kbd>Esc</kbd> Pause'
      : '<kbd>W A S D</kbd> Move <kbd>R</kbd> Reset <kbd>Esc</kbd> Pause';
    started();
  }

  function clear() {
    keys.clear();
    walker.stop();
    lookPointer = null;
    stickPointer = null;
    side = 0;
    forward = 0;
    knob.style.transform = '';
  }

  function pause() {
    if (!mode) return;
    mode = null;
    clear();
    overlay.hidden = false;
    touch.hidden = true;
    view.classList.remove('playing');
    if (entered) {
      go.textContent = 'Resume exploring';
      intro.textContent = coarse.matches ? instructions.touch : instructions.paused;
    }
    stopped();
    go.focus({ preventScroll: true });
  }

  function requestPause() {
    if (document.pointerLockElement === canvas) document.exitPointerLock();
    else pause();
  }

  window.addEventListener('keydown', event => {
    if (!mode || event.altKey || event.ctrlKey || event.metaKey) return;
    if (moveKeys.has(event.code)) {
      event.preventDefault();
      keys.add(event.code);
    } else if (event.code === 'KeyR' && !event.repeat) {
      walker.reset();
      dirty();
    } else if (event.code === 'Escape') {
      requestPause();
    }
  });

  window.addEventListener('keyup', event => keys.delete(event.code));
  window.addEventListener('blur', clear);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) requestPause();
  });

  document.addEventListener('mousemove', event => {
    if (mode === 'lock' && document.pointerLockElement === canvas) {
      walker.look(event.movementX, event.movementY, 0.00215);
    }
  });

  view.addEventListener('pointerdown', event => {
    if ((mode !== 'drag' && mode !== 'touch') || event.target.closest('.touch, .overlay')
      || lookPointer !== null || (event.pointerType === 'mouse' && event.button !== 0)) return;
    view.setPointerCapture(event.pointerId);
    lookPointer = event.pointerId;
    previousX = event.clientX;
    previousY = event.clientY;
  });
  view.addEventListener('pointermove', event => {
    if (event.pointerId !== lookPointer) return;
    walker.look(event.clientX - previousX, event.clientY - previousY, mode === 'touch' ? 0.0046 : 0.0032);
    previousX = event.clientX;
    previousY = event.clientY;
  });
  for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) {
    view.addEventListener(type, event => {
      if (event.pointerId === lookPointer) lookPointer = null;
    });
    stick.addEventListener(type, event => {
      if (event.pointerId !== stickPointer) return;
      stickPointer = null;
      side = 0;
      forward = 0;
      knob.style.transform = '';
    });
  }
  stick.addEventListener('pointerdown', event => {
    if (stickPointer !== null || mode !== 'touch') return;
    stickPointer = event.pointerId;
    stick.setPointerCapture(event.pointerId);
    positionStick(event);
  });
  stick.addEventListener('pointermove', event => {
    if (event.pointerId === stickPointer) positionStick(event);
  });

  function positionStick(event) {
    const bounds = stick.getBoundingClientRect();
    const reach = bounds.width * 0.36;
    const x = (event.clientX - bounds.left - bounds.width / 2) / reach;
    const y = (event.clientY - bounds.top - bounds.height / 2) / reach;
    const length = Math.max(1, Math.hypot(x, y));
    side = x / length;
    forward = -y / length;
    knob.style.transform = 'translate(' + side * reach + 'px,' + -forward * reach + 'px)';
  }

  view.querySelector('#touch-reset').addEventListener('click', () => {
    walker.reset();
    dirty();
  });
  view.querySelector('#touch-pause').addEventListener('click', requestPause);

  return {
    step(dt) {
      const h = Number(keys.has('KeyD') || keys.has('ArrowRight')) - Number(keys.has('KeyA') || keys.has('ArrowLeft'));
      const v = Number(keys.has('KeyW') || keys.has('ArrowUp')) - Number(keys.has('KeyS') || keys.has('ArrowDown'));
      walker.update(dt, clamp(h + side, -1, 1), clamp(v + forward, -1, 1),
        keys.has('ShiftLeft') || keys.has('ShiftRight'));
    },
    suspend: requestPause,
  };
}

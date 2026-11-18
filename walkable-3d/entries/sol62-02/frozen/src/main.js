import * as T from "three";
import { createMarket } from "./market.js";
import { move, SPAWN, areaName } from "./navigation.js";

const viewport = document.querySelector("#viewport");
const welcome = document.querySelector("#welcome");
const enter = document.querySelector("#enter");
const controls = document.querySelector("#show-controls");
const reset = document.querySelector("#reset");
const area = document.querySelector("#area");
const status = document.querySelector("#status");
const dragHint = document.querySelector("#drag-hint");
const keys = new Set();
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");

const walkKeys = new Set([
  "KeyW", "KeyA", "KeyS", "KeyD", "ShiftLeft", "ShiftRight",
  "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"
]);

function start() {
  const renderer = new T.WebGLRenderer({
    alpha: false, antialias: true, powerPreference: "high-performance", stencil: false
  });
  renderer.outputColorSpace = T.SRGBColorSpace;
  renderer.toneMapping = T.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.19;
  renderer.setClearColor(0x242d3a);
  renderer.domElement.tabIndex = 0;
  renderer.domElement.setAttribute("aria-label", "Night market. Mouse or arrow keys look around. W A S D moves.");
  viewport.append(renderer.domElement);
  const canvas = renderer.domElement;
  const { scene, colliders, updatePavement } = createMarket();
  const camera = new T.PerspectiveCamera(67, 1, .055, 78);
  const position = { x: SPAWN.x, z: SPAWN.z };
  const velocity = { x: 0, z: 0 };
  let yaw = SPAWN.yaw, pitch = SPAWN.pitch, stride = 0, bob = 0;
  let playing = false, wasLocked = false, drag = null, dirty = true, playable = true, loading = true;
  let raf = 0, oldTime = 0, firstFrame = true;
  let zone = areaName(position.z);
  const locked = () => document.pointerLockElement === canvas;

  function wake() {
    dirty = true;
    if (!raf && !document.hidden && playable && !loading) raf = requestAnimationFrame(draw);
  }

  function dragState() {
    dragHint.hidden = !playing || locked();
  }

  function resetView() {
    position.x = SPAWN.x;
    position.z = SPAWN.z;
    yaw = SPAWN.yaw;
    pitch = SPAWN.pitch;
    stride = bob = 0;
    velocity.x = velocity.z = 0;
    keys.clear();
    wake();
  }

  function pause() {
    playing = false;
    velocity.x = velocity.z = 0;
    keys.clear();
    drag = null;
    if (locked()) document.exitPointerLock();
    document.body.classList.remove("playing");
    welcome.hidden = false;
    controls.setAttribute("aria-expanded", "true");
    dragState();
    wake();
  }

  function resume() {
    if (!playable || firstFrame) return;
    playing = true;
    welcome.hidden = true;
    controls.setAttribute("aria-expanded", "false");
    document.body.classList.add("playing");
    enter.textContent = "Return to market";
    canvas.focus({ preventScroll: true });
    try {
      const request = canvas.requestPointerLock?.();
      request?.catch(dragState);
    } catch {
      dragState();
    }
    dragState();
    wake();
  }

  function resize() {
    const width = Math.max(1, viewport.clientWidth);
    const height = Math.max(1, viewport.clientHeight);
    const ratio = Math.min(devicePixelRatio || 1, 1.55, Math.sqrt(2650000 / (width * height)));
    renderer.setPixelRatio(ratio);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.fov = camera.aspect < 1 ? 75 : 67;
    camera.updateProjectionMatrix();
    wake();
  }

  function look(dx, dy, sensitivity = .0022) {
    yaw -= dx * sensitivity;
    pitch = Math.max(-1.44, Math.min(1.44, pitch - dy * sensitivity));
    wake();
  }

  function draw(now) {
    raf = 0;
    const dt = oldTime ? Math.min((now - oldTime) / 1000, .053) : 0;
    oldTime = now;
    let keepActive = false;
    if (playing) {
      const steerX = Number(keys.has("ArrowRight")) - Number(keys.has("ArrowLeft"));
      const steerY = Number(keys.has("ArrowDown")) - Number(keys.has("ArrowUp"));
      if (steerX || steerY) {
        yaw -= steerX * 1.78 * dt;
        pitch = Math.max(-1.44, Math.min(1.44, pitch - steerY * 1.42 * dt));
        keepActive = true;
      }

      const forward = Number(keys.has("KeyW")) - Number(keys.has("KeyS"));
      const right = Number(keys.has("KeyD")) - Number(keys.has("KeyA"));
      const speed = keys.has("ShiftLeft") || keys.has("ShiftRight") ? 3.53 : 2.37;
      const norm = speed / Math.max(1, Math.hypot(forward,right));
      const desiredX = (right * Math.cos(yaw) - forward * Math.sin(yaw)) * norm;
      const desiredZ = (-right * Math.sin(yaw) - forward * Math.cos(yaw)) * norm;
      const response = 1 - Math.exp(-dt * 23);
      velocity.x += (desiredX - velocity.x) * response;
      velocity.z += (desiredZ - velocity.z) * response;
      if (forward || right || Math.hypot(velocity.x,velocity.z) > .009) {
        const x = position.x, z = position.z;
        move(position, velocity.x * dt, velocity.z * dt, colliders);
        const travel = Math.hypot(position.x - x, position.z - z);
        const gait = Math.min(1, travel / Math.max(.001, dt * 2.1));
        stride += travel * 9.8;
        bob += (gait - bob) * response;
        keepActive = true;
      } else {
        velocity.x = velocity.z = 0;
        if (bob > .005) {
          bob *= Math.exp(-dt * 12);
          keepActive = true;
        } else bob = 0;
      }
    }

    if (dirty || keepActive) {
      dirty = false;
      const headMotion = reducedMotion.matches ? 0 : bob * Math.sin(stride) * .016;
      camera.position.set(position.x, 1.67 + headMotion, position.z);
      camera.rotation.set(pitch,yaw,0,"YXZ");
      updatePavement(camera.position);
      renderer.render(scene, camera);
      if (firstFrame) {
        firstFrame = false;
        enter.textContent = "Enter the market";
        enter.disabled = false;
      }
      const newZone = areaName(position.z);
      if (newZone !== zone) {
        zone = newZone;
        area.textContent = zone;
      }
    }
    if (keepActive) raf = requestAnimationFrame(draw);
    else oldTime = 0;
  }

  window.addEventListener("resize", resize);
  window.addEventListener("blur", () => { keys.clear(); drag = null; });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      keys.clear();
      oldTime = 0;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    } else wake();
  });

  document.addEventListener("pointerlockchange", () => {
    if (!locked() && wasLocked && playing) pause();
    wasLocked = locked();
    dragState();
  });

  document.addEventListener("pointerlockerror", dragState);
  window.addEventListener("mousemove", (event) => {
    if (playing && locked()) look(event.movementX, event.movementY);
  });
  canvas.addEventListener("pointerdown", (event) => {
    if (!playing || locked() || event.button !== 0) return;
    drag = { id: event.pointerId, x: event.clientX, y: event.clientY };
    canvas.setPointerCapture(event.pointerId);
  });
  canvas.addEventListener("pointermove", (event) => {
    if (!playing || locked() || event.pointerId !== drag?.id) return;
    look(event.clientX - drag.x, event.clientY - drag.y, .0034);
    drag.x = event.clientX;
    drag.y = event.clientY;
  });
  for (const end of ["lostpointercapture", "pointerup", "pointercancel"]) {
    canvas.addEventListener(end, () => { drag = null; });
  }
  window.addEventListener("keydown", (event) => {
    if (event.ctrlKey || event.altKey || event.metaKey) return;
    if (event.code === "KeyR" && !event.repeat) {
      resetView();
      return;
    }
    if (playing && event.code === "Escape" && !locked()) {
      pause();
      return;
    }
    if (!playing || !walkKeys.has(event.code)) return;
    event.preventDefault();
    keys.add(event.code);
    if (!raf) oldTime = performance.now();
    wake();
  });
  window.addEventListener("keyup", (event) => { keys.delete(event.code); });
  canvas.addEventListener("webglcontextlost", (event) => {
    event.preventDefault();
    playable = false;
    pause();
    status.textContent = "The browser paused the 3D graphics context. Reload the page to reopen the market.";
    enter.disabled = true;
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
  });
  enter.addEventListener("click", resume);
  controls.addEventListener("click", () => playing ? pause() : resume());
  reset.addEventListener("click", resetView);
  resize();
  renderer.compileAsync(scene,camera).then(() => {
    loading = false;
    wake();
  }).catch(reportStartupError);
}

function reportStartupError(error) {
  console.error(error);
  status.textContent = "The 3D scene could not start. Open the local launch address in a browser with WebGL 2 enabled.";
  enter.textContent = "Market unavailable";
}

try {
  start();
} catch (error) {
  reportStartupError(error);
}

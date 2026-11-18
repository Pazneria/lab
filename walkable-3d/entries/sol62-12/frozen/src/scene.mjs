import * as THREE from '../vendor/three.module.min.js';
import { buildCabinets } from './cabinets.mjs';
import { batchStatic, createKit } from './mesh.mjs';
import { buildProps } from './props.mjs';
import { buildRoom } from './room.mjs';

export function createArcade() {
  const scene = new THREE.Scene();
  scene.name = 'Lantern Arcade';
  scene.background = new THREE.Color('#141925');
  scene.fog = new THREE.FogExp2('#181a27', 0.0305);

  const kit = createKit();
  const original = new THREE.Group();
  buildRoom(kit, original);
  buildCabinets(kit, original);
  buildProps(kit, original);
  scene.add(batchStatic(original, kit.accentLights));

  const atmosphere = new THREE.HemisphereLight('#eee1ea', '#6a637f', 1.94);
  const key = new THREE.DirectionalLight('#ffdfbd', 2.49);
  key.position.set(2.75, 7.25, 4.34);
  const fill = new THREE.DirectionalLight('#bbdadd', 0.82);
  fill.position.set(-4.45, 4.46, -5.79);
  scene.add(atmosphere, key, fill);
  return scene;
}

import * as THREE from './vendor/three.module.min.js';
import { BayBuilder } from './build.mjs';
import { makeExterior } from './exterior.mjs';
import { makeMachine } from './machine.mjs';
import { reflectionEnvironment } from './materials.mjs';
import { makeRigging } from './rigging.mjs';
import { makeService } from './service.mjs';
import { makeShell } from './shell.mjs';

function spot(scene, color, intensity, position, target, range, angle) {
  const lamp = new THREE.SpotLight(color, intensity, range, angle, 0.78, 2);
  lamp.position.set(...position);
  lamp.target.position.set(...target);
  scene.add(lamp, lamp.target);
}

function installLights(scene, b) {
  const ceiling = new THREE.HemisphereLight('#e2ebeb', '#70685a', 1.17);
  const key = new THREE.DirectionalLight('#fff5e4', 2.07);
  key.position.set(-4.6, 8.9, 5.85);
  key.target.position.set(-0.55, 0.85, -0.56);
  key.castShadow = true;
  const shadow = key.shadow;
  shadow.mapSize.set(1024, 1024);
  Object.assign(shadow.camera, { left: -13, right: 13, top: 10, bottom: -10, near: 0.2, far: 28 });
  shadow.camera.updateProjectionMatrix();
  shadow.normalBias = 0.029;
  shadow.bias = -0.00016;
  shadow.radius = 2.2;
  shadow.intensity = 0.72;
  const fill = new THREE.DirectionalLight('#e2eff3', 0.92);
  fill.position.set(4.94, 4.29, -5.93);
  scene.add(ceiling, key, key.target, fill);

  const benchFill = new THREE.PointLight('#f9f4e9', 14.0, 6.8, 2);
  benchFill.position.set(-10.17, 3.16, 0.48);
  scene.add(benchFill);
  spot(scene, '#a9dce1', 6.7, [-11.818, 2.225, 0.12], [-11.87, 1.022, 0.23], 3.45, 0.78);

  b.region('bearing-task-lamp');
  const pivot = [-1.79, 4.99, -0.39];
  const knuckle = [-1.43, 4.81, 0.72];
  const head = [-0.99, 4.46, 1.39];
  b.bevel('graphite', pivot, [0.31, 0.20, 0.25], 0.029);
  b.beam('darkSteel', pivot, knuckle, 0.068, 0.083);
  b.beam('steelDull', knuckle, head, 0.058, 0.073);
  b.cylinder('amber', knuckle, 0.092, 0.121, 'x', 16);
  b.bevel('graphite', head, [0.45, 0.125, 0.22], 0.033);
  b.box('amberLamp', [head[0], head[1] - 0.077, head[2]], [0.328, 0.028, 0.120], { cast: false });
  b.tube('rubber', [pivot, [-1.59, 4.998, 0.13], [-1.40, 4.866, 0.70], [-1.214, 4.722, 1.102], head],
    0.016, 19, 7, { cast: false });
  spot(scene, '#ffcf95', 19.8, [head[0], head[1] - 0.095, head[2]], [-0.47, 1.57, 1.64], 6.4, 0.64);
}

export function createBay() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#0c1318');
  scene.environment = reflectionEnvironment();
  scene.environmentIntensity = 0.79;
  const builder = new BayBuilder(scene);
  makeShell(builder);
  makeRigging(builder);
  makeMachine(builder);
  makeService(builder);
  installLights(scene, builder);
  builder.finish();
  makeExterior(scene);
  return scene;
}

import * as T from '../vendor/three.module.min.js';
import { Builder } from './build-kit.js';
import { WalkMap } from './layout.js';
import { createMaterials, signMaterial } from './materials.js';
import { addSky, addWater, buildLandscape, FOG_COLOR, SUN } from './landscape.js';
import { buildDock } from './dock.js';
import { buildBoathouse } from './boathouse.js';
import { buildWorkshop } from './workshop.js';
import { buildDinghy } from './dinghy.js';

function lightInlet(scene) {
  const ambient = new T.HemisphereLight(0xe4eced,0xa29476,1.67);
  scene.add(ambient);
  const sun = new T.DirectionalLight(0xffdec0,2.55);
  sun.target.position.set(.0,1.1,3.3);
  sun.position.copy(SUN).multiplyScalar(43).add(sun.target.position);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048,2048);
  sun.shadow.camera.left = -20;
  sun.shadow.camera.right = 20;
  sun.shadow.camera.top = 20;
  sun.shadow.camera.bottom = -20;
  sun.shadow.camera.near = 13;
  sun.shadow.camera.far = 79;
  sun.shadow.bias = -.00021;
  sun.shadow.normalBias = .026;
  scene.add(sun, sun.target);
}

export function createInlet() {
  const scene = new T.Scene();
  scene.fog = new T.FogExp2(FOG_COLOR,.015);
  const walk = new WalkMap();
  const m = createMaterials();
  m.crateMark = signMaterial({
    background:'#837357',ink:'#d4c59d',border:'#a39670',w:328,h:104,
    lines:[{text:'T I D E W A Y',y:.51,font:'700 37px serif'}],seed:53
  });
  const b = new Builder(scene);
  addSky(scene);
  const waterTime = addWater(scene);
  buildLandscape(b,m,walk);
  buildDock(b,m,walk);
  b.group='boathouse structure';
  buildBoathouse(b,m,walk);
  b.group='workshop fittings';
  buildWorkshop(scene,b,m,walk);
  b.group='dinghy and berth';
  buildDinghy(b,m,walk);
  const geometry = b.finish();
  lightInlet(scene);
  return { scene, walk, waterTime, geometry };
}

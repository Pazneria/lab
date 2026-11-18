import * as T from 'three';
import { bedroom } from './bedroom.js';
import { graphics } from './graphics.js';
import { Kit } from './kit.js';
import { environmentMap, materials } from './materials.js';
import { observation } from './observation.js';
import { entrance, hall, hull, portal, shellRoom } from './shell.js';
import { study } from './study.js';

export const spawn = Object.freeze({ x: .54, z: 6.91, yaw: .100, pitch: -.043 });

const names = ['Captain’s quarters', 'Private study', 'Observation nook'];

function roomAt(z) {
  if (z > hall.study.z) return 0;
  return z > hall.observation.z ? 1 : 2;
}

export function locationAt(z) {
  return names[roomAt(z)];
}

function lighting(scene) {
  scene.background = new T.Color('#10171d');
  scene.environment = environmentMap();
  scene.environmentIntensity = .78;

  const sky = new T.HemisphereLight('#d7e2df', '#807369', .91);
  sky.name = 'Soft hull bounce';
  scene.add(sky);

  const fill = new T.DirectionalLight('#dce3e4', .37);
  fill.position.set(1.75, 3.7, 1.69);
  fill.name = 'Reflected neutral fill';
  scene.add(fill);

  const fixtures = [
    ['Entrance and walk strip', '#ffe9ca', 8.4, 5.0, .82, 2.620, 5.56],
    ['Berth strip and lamps', '#ffcc9c', 4.35, 3.5, -1.96, 1.780, 4.56],
    ['Study ceiling recess', '#fff0d9', 10.7, 5.3, -.02, 2.570, -.29],
    ['Study work lamp', '#ffe3b7', 2.52, 3.05, -2.07, 1.750, -.94],
    ['Observation light', '#c1e2f9', 12.3, 5.5, .56, 2.532, -6.42]
  ];
  for (const [name, color, intensity, distance, x, y, z] of fixtures) {
    const light = new T.PointLight(color, intensity, distance, 2);
    light.name = name;
    light.position.set(x, y, z);
    scene.add(light);
  }
}

export function quarters(scene, world) {
  const m = materials();
  const g = graphics();
  const k = new Kit(scene, (name, x, z, width, depth) => world.add(name, x, z, width, depth));

  hull(k, m);
  shellRoom(k, m, hall.study.z + .129, hall.start, 'bedroom');
  entrance(k, m, g);
  bedroom(k, m, g);
  const berthRoom = k.finish('Bedroom fittings');

  const studyBulkhead = portal(k, m, hall.study, g.study, g.berth, 'Bedroom–study bulkhead');
  shellRoom(k, m, hall.observation.z + .129, hall.study.z - .129, 'study');
  study(k, m, g);
  const studyRoom = k.finish('Private study fittings');

  const observationBulkhead = portal(k, m, hall.observation, g.observation, g.study, 'Study–observation bulkhead');
  shellRoom(k, m, hall.end, hall.observation.z - .129, 'observation');
  observation(k, m, g);
  const observationRoom = k.finish('Observation hull and fittings');

  lighting(scene);
  const sections = [berthRoom, studyBulkhead, studyRoom, observationBulkhead, observationRoom];
  return z => {
    const current = roomAt(z) * 2;
    for (let i = 0; i < sections.length; i++) sections[i].renderOrder = Math.abs(current - i);
  };
}

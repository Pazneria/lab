import * as T from './vendor/three.module.min.js';
import {Builder} from './geometry.js';
import {makeMaterials,PrintShop} from './materials.js';
import {buildRooms} from './rooms.js';
import {buildFitting} from './fitting.js';
import {buildArchive} from './archive.js';
import {buildMantle} from './mantle.js';
import {buildWorkshop} from './workshop.js';
import {buildFixtures} from './lighting.js';

export function buildAtelier(cpu=false){
  const scene=new T.Scene(),materials=makeMaterials(cpu),b=new Builder(materials);
  b.print=new PrintShop(materials.print,cpu);
  buildRooms(b,cpu);buildFixtures(b);buildFitting(b,cpu);buildArchive(b);buildWorkshop(b);buildMantle(b);
  b.finish(scene);
  return {scene,blocks:b.blocks,printCount:b.print.cache.size,atlasUsed:b.print.y+b.print.row};
}


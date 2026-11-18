import { buildCentral } from './central.js';
import { buildMotion } from './motion.js';
import { buildPerception } from './perception.js';

export function buildExhibits(builder, materials) {
  buildCentral(builder, materials);
  buildPerception(builder, materials);
  buildMotion(builder, materials);
}

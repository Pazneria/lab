// The authoring and compatibility path for constructing all static geometry.
import {Workshop} from './workshop.js';
import {architecture} from './architecture.js';
import {shelves} from './stacks.js';
import {furnishings} from './objects.js';
import {collectedDetails} from './curios.js';
import {landscape} from './landscape.js';
import {joinery} from './joinery.js';

export function assemble(scene,materials){
  const W=new Workshop(materials);
  architecture(W);shelves(W);furnishings(W);collectedDetails(W);joinery(W);landscape(W);
  const stats=W.finish(scene);
  return {solids:W.solids,stats};
}

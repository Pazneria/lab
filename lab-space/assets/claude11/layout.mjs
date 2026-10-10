// One source for physical host stations, approaches and renderer placement.
import {workbenchLayout} from './workbench.mjs';
const worldsX=-9.3,worldsY=1.6,worldsZ=3.245,worldsApproachZ=.9;
export const exhibits=Object.freeze({
  animation:workbenchLayout,
  worlds:Object.freeze({x:worldsX,y:worldsY,z:worldsZ,width:3.2,height:1.8,yaw:Math.PI,
    approach:Object.freeze({x:worldsX,z:worldsApproachZ,yaw:Math.PI,pitch:Math.atan2(worldsY-1.62,worldsZ-worldsApproachZ)})}),
  character:Object.freeze({x:0,z:-.6,radius:1.5,stageY:.66,maxHeight:1.35,maxWidth:1.6,maxDepth:1.3,
    approach:Object.freeze({x:2.3,z:3.05,yaw:0,pitch:-.57})}),
  catalog:Object.freeze({x:-3,y:1.8,z:-6.85,width:1.2,height:.6,
    approach:Object.freeze({x:-3,z:-5.8,yaw:0,pitch:.17})}),
  home:Object.freeze({x:0,y:1.3,z:8.5,width:2.4,height:2.4,
    approach:Object.freeze({x:0,z:7.3,yaw:Math.PI,pitch:0})}),
});

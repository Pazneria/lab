import test from 'node:test';
import assert from 'node:assert/strict';
import {roomViewport} from '../lab-space/assets/viewport.mjs';
import {canvasPointer} from '../lab-space/assets/interaction.mjs';
test('full viewport uses CSS aspect while drawing density remains capped',()=>{
  for(const [width,height] of [[320,568],[390,844],[667,375],[1440,900],[2560,1440],[3840,2160]]){
    for(const density of [.8,1,1.25,2,3]){
      const view=roomViewport(width,height,density);
      assert.equal(view.aspect,width/height);assert.equal(view.pixelRatio,Math.min(density,1.25));
      assert.equal(view.fov,width<height?78:65);
      assert.deepEqual(canvasPointer(width/2,height/2,{left:0,top:0,width,height}),{x:0,y:0});
    }
  }
});
test('hidden or invalid canvas cannot produce invalid camera dimensions',()=>{
  for(const [width,height] of [[0,900],[1440,0],[-1,900],[NaN,900],[Infinity,900]])assert.equal(roomViewport(width,height,2),null);
  for(const density of [0,-1,NaN,Infinity])assert.equal(roomViewport(1440,900,density).pixelRatio,1);
});

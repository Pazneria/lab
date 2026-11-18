import * as T from '../vendor/three.module.min.js';
import {makeMaterials,skyTexture} from './materials.js';
import {rng} from './workshop.js';
import {unpackScene,loadGeometry} from './packed.js';
import {navigationSolids} from './navigation.js';
import {controls} from './controls.js';

const canvas=document.getElementById('view');
function fail(title,detail){
  document.body.classList.remove('loading');document.body.classList.add('failed');
  document.getElementById('load-text').textContent=title;document.getElementById('load-detail').textContent=detail;
}
function lights(scene){
  scene.add(new T.HemisphereLight(0xe9edf0,0xc4a784,1.28));
  const sun=new T.DirectionalLight(0xffdaa0,3.52);
  sun.target.position.set(-.65,2.10,-.60);
  sun.position.copy(sun.target.position).add(new T.Vector3(-19.6,15.2,-28.7));
  sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);
  Object.assign(sun.shadow.camera,{left:-13.1,right:13.1,bottom:-11.8,top:11.8,near:9,far:61});
  sun.shadow.camera.updateProjectionMatrix();sun.shadow.normalBias=.018;sun.shadow.bias=-.000105;
  scene.add(sun,sun.target);
  const bounce=new T.DirectionalLight(0xd2dfe0,.49);bounce.position.set(-4,7,-8);scene.add(bounce);
  for(const [x,y,z,intensity,distance,col] of [
    [-2.04,1.30,-.17,4.4,4.4,0xffcf90],[6.63,1.61,-4.66,10.2,5.4,0xffc989],
    [6.60,4.56,3.34,7.4,4.7,0xffce95],[-.16,2.69,7.74,7.6,5.7,0xffc98b]
  ]){
    const bulb=new T.PointLight(col,intensity,distance,2);bulb.position.set(x,y,z);scene.add(bulb);
  }
}
function dust(scene){
  const r=rng(21809),p=[];
  for(let i=0;i<210;i++){
    const x=[-4.95,-1.55,1.90][i%3]+(r()-.5)*2.39,y=1.43+r()*4.29,dist=.6+r()*8.6;
    const yy=y-dist*.5296;if(yy<.24)continue;
    p.push(x+dist*.683,yy,-10.1+dist);
  }
  const c=document.createElement('canvas');c.height=c.width=32;const a=c.getContext('2d'),g=a.createRadialGradient(16,16,0,16,16,15);
  g.addColorStop(0,'rgba(255,255,255,.9)');g.addColorStop(.28,'rgba(255,255,255,.58)');g.addColorStop(1,'rgba(255,255,255,0)');a.fillStyle=g;a.fillRect(0,0,32,32);
  const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(p,3));
  const m=new T.PointsMaterial({color:0xffdaa8,size:.017,map:new T.CanvasTexture(c),opacity:.36,transparent:true,depthWrite:false,blending:T.AdditiveBlending});
  const motes=new T.Points(geo,m);motes.name='sunlit dust';scene.add(motes);return motes;
}
async function init(){
  let renderer;
  try{renderer=new T.WebGLRenderer({canvas,antialias:true,alpha:false,powerPreference:'high-performance'});}
  catch{fail('WebGL 2 is required','Enable hardware acceleration in a WebGL 2 capable browser, then reload this address.');return;}
  renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.04;
  renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;
  renderer.shadowMap.autoUpdate=false;renderer.shadowMap.needsUpdate=true;
  const scene=new T.Scene(),camera=new T.PerspectiveCamera(66,1,.05,255);
  function size(){
    const w=Math.max(1,canvas.clientWidth),h=Math.max(1,canvas.clientHeight);
    renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.65,Math.sqrt(2480000/(w*h))));
    renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();
  }
  size();window.addEventListener('resize',size);
  scene.fog=new T.Fog(0xd8cebb,32,215);
  scene.background=skyTexture();scene.environment=scene.background;scene.environmentIntensity=.41;
  lights(scene);
  const [mats,packed]=await Promise.all([makeMaterials(renderer),loadGeometry().catch(()=>null)]);
  let solids;
  if(packed){
    const result=unpackScene(packed,mats);scene.add(result.group);solids=result.solids;
  }else{
    const {assemble}=await import('./assemble.js');solids=assemble(scene,mats).solids;
  }
  const world=navigationSolids(solids),input=controls(camera,canvas,world),motes=dust(scene);
  let frame=0,last=0,elapsed=0,stopped=false;
  function render(time){
    if(stopped)return;
    const dt=last===0?0:Math.min(.055,Math.max(0,(time-last)/1000));last=time;elapsed+=dt;
    input.update(dt);motes.position.y=.016*Math.sin(elapsed*.19);motes.position.x=.011*Math.sin(elapsed*.137);
    renderer.render(scene,camera);frame=requestAnimationFrame(render);
  }
  canvas.addEventListener('webglcontextlost',event=>{
    event.preventDefault();stopped=true;cancelAnimationFrame(frame);
    fail('Graphics context interrupted','Reload the page to reopen the library.');
  });
  document.addEventListener('visibilitychange',()=>{
    cancelAnimationFrame(frame);last=0;if(!document.hidden&&!stopped)frame=requestAnimationFrame(render);
  });
  // Prepare the materials before entry so turning toward an unvisited collection
  // does not introduce its program for the first time during the walk.
  await renderer.compileAsync(scene,camera);
  const warmup=[];
  scene.traverse(object=>{if(object.isMesh&&object.frustumCulled){warmup.push(object);object.frustumCulled=false;}});
  renderer.render(scene,camera);
  for(const object of warmup)object.frustumCulled=true;
  document.body.classList.remove('loading');
  frame=requestAnimationFrame(render);
}
init().catch(error=>{
  console.error(error);
  fail('The library could not open','Serve this folder over localhost and reload. '+(error?.message||'An asset failed to load.'));
});

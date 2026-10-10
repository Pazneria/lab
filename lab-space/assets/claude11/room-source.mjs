// Host-owned derivative of the frozen Applied Sensing Lab. Original benchmark
// assets/provenance remain untouched. The host owns controls, routes and one RAF.
import * as T from 'three';
import {RoomEnvironment} from 'three/examples/jsm/environments/RoomEnvironment.js';
import {Builder,Atlas} from './builder.js';
import {makeTextures} from './textures.js';
import {makeMaterials} from './mats.js';
import {buildHall,IC} from './hall.js';
import {buildInstrument} from './instrument.js';
import {buildPerception} from './perception.js';
import {buildMotion} from './motion.js';
import {DRAWERS} from './screens.js';
import {createWorkbenchFigurine,FIGURINE_SOURCE} from './workbench.mjs';
import {canvasPointer,firstVisibleHit} from '../interaction.mjs';
import {exhibits} from './layout.mjs';
import {colliders as expectedColliders} from './colliders.mjs';
import {batchStaticCharacter,fitCharacter,disposeGraph} from './character.mjs';
import {createLabCamera,poseLabCamera} from './camera.mjs';
import {createExitDoors} from './exit-doors.mjs';
export {exhibits} from './layout.mjs';

export function createRoom(canvas,onLost,options={}){
  const renderer=new T.WebGLRenderer({canvas,antialias:true,powerPreference:'high-performance',stencil:false});
  renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05;
  renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFShadowMap;
  renderer.shadowMap.autoUpdate=false;renderer.shadowMap.needsUpdate=true;
  const scene=new T.Scene();scene.background=new T.Color(0x1a1d21);
  const camera=createLabCamera(T.PerspectiveCamera);
  const pmrem=new T.PMREMGenerator(renderer),environmentRoom=new RoomEnvironment();
  const environment=pmrem.fromScene(environmentRoom,.04);
  scene.environment=environment.texture;scene.environmentIntensity=.42;
  environmentRoom.dispose();pmrem.dispose();
  scene.add(new T.HemisphereLight(0xf3f6f9,0x7d766c,.85));
  const sun=new T.DirectionalLight(0xfff6ea,1.9);sun.position.set(3.5,14,5.5);sun.target.position.set(0,0,-.5);
  sun.castShadow=true;sun.shadow.mapSize.set(4096,4096);
  Object.assign(sun.shadow.camera,{left:-13,right:13,top:10.5,bottom:-10.5,near:2,far:30});
  sun.shadow.bias=-.0003;sun.shadow.normalBias=.025;sun.shadow.radius=2.5;scene.add(sun,sun.target);
  function spot(color,intensity,pos,target,angle,penumbra=.7){const light=new T.SpotLight(color,intensity,0,angle,penumbra,2);light.position.set(...pos);light.target.position.set(...target);scene.add(light,light.target);}
  spot(0xfff3e2,38,[IC.x,4.3,IC.z+.4],[IC.x,.8,IC.z],.52);
  spot(0xf2f6ff,20,[-9.6,3.25,.3],[-11.5,.9,.2],.75);
  spot(0xfff2e4,20,[9.4,3.25,-.6],[10.7,.8,-.2],.8);

  const anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());
  const textures=makeTextures(anisotropy),atlas=new Atlas(4096),atlasTexture=atlas.texture(anisotropy);
  const materials=makeMaterials(textures,atlasTexture),builder=new Builder(),screens=[];
  const comparisonSource=document.createElement('canvas');comparisonSource.width=1280;comparisonSource.height=720;
  const comparisonContext=comparisonSource.getContext('2d');
  comparisonContext.fillStyle='#10151c';comparisonContext.fillRect(0,0,1280,720);
  comparisonContext.fillStyle='#e8eff3';comparisonContext.font='600 40px system-ui';comparisonContext.fillText('Compare Worlds',48,80);
  comparisonContext.font='26px system-ui';comparisonContext.fillText('Choose two worlds to compare',48,140);
  const comparisonTexture=new T.CanvasTexture(comparisonSource);comparisonTexture.colorSpace=T.SRGBColorSpace;
  comparisonTexture.minFilter=T.LinearFilter;comparisonTexture.generateMipmaps=false;
  let board=null;
  const ctx={b:builder,M:materials,A:atlas,screen(id,w,h,pw,ph,pos,rot){
    const source=id==='datawall'?comparisonSource:document.createElement('canvas');
    if(id!=='datawall'){source.width=pw;source.height=ph;}
    const texture=id==='datawall'?comparisonTexture:new T.CanvasTexture(source);
    texture.colorSpace=T.SRGBColorSpace;texture.anisotropy=anisotropy;texture.minFilter=T.LinearFilter;texture.generateMipmaps=false;
    const material=new T.MeshBasicMaterial({map:texture,color:id==='datawall'?0xffffff:0xd8d8d8,toneMapped:false});
    const mesh=new T.Mesh(new T.PlaneGeometry(w,h),material);
    const local=new T.Matrix4().compose(new T.Vector3(...pos),new T.Quaternion().setFromEuler(new T.Euler(...rot)),new T.Vector3(1,1,1));
    mesh.matrixAutoUpdate=false;mesh.matrix.copy(builder.top).multiply(local);mesh.matrixWorldNeedsUpdate=true;scene.add(mesh);
    if(id==='datawall'){board=mesh;mesh.userData.comparison=true;return;}
    const entry={id,source,context:source.getContext('2d'),texture,mesh,draw:DRAWERS[id],position:new T.Vector3().setFromMatrixPosition(mesh.matrix),normal:new T.Vector3(0,0,1).transformDirection(mesh.matrix),lastUpdate:-Infinity};
    entry.draw(entry.context,pw,ph,0);texture.needsUpdate=true;screens.push(entry);
  }};
  builder.region='hall';buildHall(ctx);builder.region='core';buildInstrument(ctx);
  builder.region='west';buildPerception(ctx);builder.region='east';buildMotion(ctx);
  atlasTexture.needsUpdate=true;
  const staticTriangles=builder.build(scene);
  if(JSON.stringify(builder.colliders)!==JSON.stringify(expectedColliders))throw new Error('Production collision layout differs from procedural geometry');
  const exitDoors=createExitDoors(T,materials);scene.add(exitDoors.group);

  function panel(lines,width,height,position,rotation=[0,0,0],destination){
    const source=document.createElement('canvas');source.width=1024;source.height=Math.round(1024*height/width);
    const c=source.getContext('2d');c.fillStyle='#162a33';c.fillRect(0,0,source.width,source.height);
    c.strokeStyle='#5b918e';c.lineWidth=8;c.strokeRect(4,4,source.width-8,source.height-8);
    c.fillStyle='#eef4f1';c.textAlign='center';c.textBaseline='middle';
    lines.forEach((line,i)=>{c.font=`${i?'500':'700'} ${Math.min(i?45:65,source.height/(lines.length+1.2))}px system-ui`;c.fillText(line,512,source.height*(i+1)/(lines.length+1),960);});
    const texture=new T.CanvasTexture(source);texture.colorSpace=T.SRGBColorSpace;
    const mesh=new T.Mesh(new T.PlaneGeometry(width,height),new T.MeshBasicMaterial({map:texture,toneMapped:false}));
    mesh.position.set(...position);mesh.rotation.set(...rotation);if(destination)mesh.userData.destination=destination;scene.add(mesh);return mesh;
  }
  // Readable native station labels; authored overlay/HUD elements are not used.
  panel(['Catalog','AI benchmark results'],exhibits.catalog.width,exhibits.catalog.height,[exhibits.catalog.x,exhibits.catalog.y,exhibits.catalog.z],[0,0,0],'catalog');
  panel(['Home'],.7,.24,[1.85,1.7,8.45],[0,Math.PI,0],'home');
  // The lectern's existing physical top becomes the CharacterBench shortcut.
  const lecternFrame=new T.Group();lecternFrame.position.set(2.3,1,2.1);lecternFrame.rotation.y=-.4;
  const lecternTilt=new T.Group();lecternTilt.rotation.x=.45;lecternFrame.add(lecternTilt);
  const lecternPanel=panel(['CharacterBench','Ivo Renn','Open character comparison'],.58,.4,[0,.018,0],[-Math.PI/2,0,0],'character');
  scene.remove(lecternPanel);lecternTilt.add(lecternPanel);scene.add(lecternFrame);
  const shortcutMaterial=new T.MeshBasicMaterial({transparent:true,opacity:0,depthWrite:false,colorWrite:false});
  const drumTarget=new T.Mesh(new T.CylinderGeometry(.551,.581,.502,48),shortcutMaterial);
  drumTarget.position.set(IC.x,.375,IC.z);drumTarget.userData.destination='character';scene.add(drumTarget);
  const drumCapTarget=new T.Mesh(new T.CylinderGeometry(.571,.571,.037,48),shortcutMaterial);
  drumCapTarget.position.set(IC.x,.64,IC.z);drumCapTarget.userData.destination='character';scene.add(drumCapTarget);
  const doorTarget=new T.Mesh(new T.PlaneGeometry(2.4,2.4),new T.MeshBasicMaterial({transparent:true,opacity:0,depthWrite:false,colorWrite:false}));
  doorTarget.position.set(0,1.25,8.48);doorTarget.rotation.y=Math.PI;doorTarget.userData.destination='home';scene.add(doorTarget);
  const marker=new T.Mesh(new T.RingGeometry(.17,.22,32),new T.MeshBasicMaterial({color:'#6bd2cc',side:T.DoubleSide,depthWrite:false}));
  marker.rotation.x=-Math.PI/2;marker.position.y=.04;marker.visible=false;scene.add(marker);

  const raycaster=new T.Raycaster(),pointer=new T.Vector2(),frustum=new T.Frustum(),projectionView=new T.Matrix4(),toCamera=new T.Vector3();
  let disposed=false,running=true,lastViewport=null,screenIndex=0,screenBudget=0,screenAnimation=false,characterStarted=false,characterState='unloaded',characterBatch=null;
  let renderedFrames=0,textureUpdates=0,pendingCharacter=null,figurineStarted=false,figurineState='unloaded',figurine=null,pendingFigurine=null;
  raycaster.layers.enable(1);
  const controller=new AbortController();
  const changed=()=>{if(!disposed){options.changed?.();canvas.dispatchEvent(new Event('roomchange'));}};
  const lost=event=>{event.preventDefault();running=false;onLost?.();};canvas.addEventListener('webglcontextlost',lost);
  function screenVisible(screen){return screen.position.distanceToSquared(camera.position)<=16*16&&frustum.intersectsObject(screen.mesh)&&toCamera.copy(camera.position).sub(screen.position).dot(screen.normal)>.05;}
  function updateScreens(dt,time){
    projectionView.multiplyMatrices(camera.projectionMatrix,camera.matrixWorldInverse);frustum.setFromProjectionMatrix(projectionView);
    screenAnimation=screens.some(screenVisible);screenBudget+=Math.max(0,Math.min(.1,dt));
    if(screenBudget<1/30||!screenAnimation)return;screenBudget%=1/30;
    for(let i=0;i<screens.length;i++){
      const screen=screens[screenIndex];screenIndex=(screenIndex+1)%screens.length;
      if(time-screen.lastUpdate<1/12||!screenVisible(screen))continue;
      screen.draw(screen.context,screen.source.width,screen.source.height,time);screen.texture.needsUpdate=true;screen.lastUpdate=time;textureUpdates++;break;
    }
  }
  async function loadCharacter(){
    if(characterStarted||disposed)return;characterStarted=true;characterState='loading';
    try{
      const {GLTFLoader}=await import('three/examples/jsm/loaders/GLTFLoader.js');
      const url=options.characterURL||new URL('../characters/ivo-renn-sol.glb',import.meta.url);
      const response=await fetch(url,{signal:controller.signal,credentials:'omit'});if(!response.ok)throw new Error(`Character asset HTTP ${response.status}`);
      const data=await response.arrayBuffer();if(disposed)return;
      const gltf=await new GLTFLoader().parseAsync(data,new URL('.',url).href);
      if(disposed){disposeGraph(gltf.scene);return;}
      if(gltf.animations.length){disposeGraph(gltf.scene);throw new Error('The display asset unexpectedly contains animations');}
      const character=batchStaticCharacter(gltf.scene),fit=fitCharacter(character,exhibits.character);
      pendingCharacter=character;
      characterBatch={...character.userData.batch,scale:fit.scale,bounds:{min:fit.displayBounds.min.toArray(),max:fit.displayBounds.max.toArray()}};
      // Warm the actual character shader variants before revealing it on a frame.
      await renderer.compileAsync(character,camera,scene);if(disposed){if(pendingCharacter){disposeGraph(pendingCharacter);pendingCharacter=null;}return;}
      scene.add(character);pendingCharacter=null;scene.updateMatrixWorld(true);renderer.shadowMap.needsUpdate=true;
      characterState='ready';changed();
    }catch(error){if(pendingCharacter){disposeGraph(pendingCharacter);pendingCharacter=null;}if(disposed||error.name==='AbortError')return;characterState='failed';console.error('Character display could not load:',error);changed();}
  }
  async function loadFigurine(){
    if(figurineStarted||disposed)return;figurineStarted=true;figurineState='loading';
    try{
      const url=options.figurineURL||new URL('../figurines/crypt-warden/skeleton.glb',import.meta.url);
      const response=await fetch(url,{signal:controller.signal,credentials:'omit'});if(!response.ok)throw Error(`Figurine asset HTTP ${response.status}`);
      const data=await response.arrayBuffer();if(disposed)return;
      if(data.byteLength!==FIGURINE_SOURCE.bytes)throw Error('Figurine asset size differs from its source manifest');
      const digest=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',data)),value=>value.toString(16).padStart(2,'0')).join('');
      if(digest!==FIGURINE_SOURCE.sha256)throw Error('Figurine asset hash differs from its source manifest');
      const {GLTFLoader}=await import('three/examples/jsm/loaders/GLTFLoader.js');
      const gltf=await new GLTFLoader().parseAsync(data,new URL('.',url).href);
      if(disposed){disposeGraph(gltf.scene);return;}
      if(gltf.animations.length!==FIGURINE_SOURCE.diagnosticClips){disposeGraph(gltf.scene);throw Error('Figurine diagnostic clip contract differs');}
      pendingFigurine=createWorkbenchFigurine(T,gltf.scene);
      await renderer.compileAsync(pendingFigurine.root,camera,scene);
      if(disposed){if(pendingFigurine){disposeGraph(pendingFigurine.root);pendingFigurine=null;}return;}
      figurine=pendingFigurine;pendingFigurine=null;scene.add(figurine.root);scene.updateMatrixWorld(true);renderer.shadowMap.needsUpdate=true;
      figurineState='ready';changed();
    }catch(error){if(pendingFigurine){disposeGraph(pendingFigurine.root);pendingFigurine=null;}if(disposed||error.name==='AbortError')return;figurineState='failed';console.error('Skeleton figurine could not load:',error);changed();}
  }
  // Upload shared material textures once; avoid duplicate preparation per batch.
  scene.updateMatrixWorld(true);scene.matrixWorldAutoUpdate=false;
  const prepared=new Set();scene.traverse(object=>{for(const material of [].concat(object.material||[]))for(const value of Object.values(material))if(value?.isTexture&&!prepared.has(value)){prepared.add(value);renderer.initTexture(value);}});
  renderer.compile(scene,camera);
  return {
    pose(position){if(!disposed)poseLabCamera(camera,position);},
    exit(doors){if(disposed)return false;const moved=exitDoors.setProgress(doors);if(moved)renderer.shadowMap.needsUpdate=true;return moved;},
    comparison(source){if(disposed)return;comparisonContext.fillStyle='#10151c';comparisonContext.fillRect(0,0,1280,720);comparisonContext.drawImage(source,0,60,1280,600);comparisonTexture.needsUpdate=true;changed();},
    draw(position,{dt=0,time=0,interactive=true}={}){
      if(disposed||!running)return false;
      const width=canvas.clientWidth,height=canvas.clientHeight;if(!(width>0&&height>0))return false;
      const pixelRatio=Math.min(window.devicePixelRatio||1,1.25);
      if(!lastViewport||lastViewport.width!==width||lastViewport.height!==height||lastViewport.pixelRatio!==pixelRatio){
        renderer.setPixelRatio(pixelRatio);renderer.setSize(width,height,false);camera.aspect=width/height;camera.updateProjectionMatrix();lastViewport={width,height,pixelRatio};
      }
      poseLabCamera(camera,position);
      updateScreens(dt,time);loadCharacter();loadFigurine();
      renderer.render(scene,camera);renderedFrames++;return true;
    },
    pick(clientX,clientY){
      if(disposed)return null;const point=canvasPointer(clientX,clientY,canvas.getBoundingClientRect());if(!point)return null;
      camera.updateMatrixWorld(true);pointer.set(point.x,point.y);raycaster.setFromCamera(pointer,camera);
      const first=firstVisibleHit(raycaster.intersectObjects(scene.children,true),marker);if(!first||first.distance>24)return null;
      if(first.object.userData.comparison&&first.uv){const y=(1-first.uv.y)*720-60;return y>=0&&y<600?{comparison:{x:first.uv.x*1280,y}}:{point:{x:exhibits.worlds.approach.x,z:exhibits.worlds.approach.z},screen:true};}
      if(first.object.userData.destination)return {destination:first.object.userData.destination};
      const {x,y,z}=first.point;if(y<=.05)return {point:{x,z},approach:false};
      // Solid architecture does not redirect visitors to an unrelated floor point.
      if(y>2.6)return null;return {point:{x,z},approach:true};
    },
    hover(clientX,clientY){if(disposed||!figurine)return false;return figurine.setHovered(this.pick(clientX,clientY)?.destination==='animation');},
    target(point){if(disposed)return;marker.visible=!!point;if(point){marker.position.set(point.x,.04,point.z);marker.updateMatrixWorld(true);}},
    start(){if(!disposed)running=true;},stop(){running=false;screenAnimation=false;},
    get needsAnimation(){return !disposed&&running&&screenAnimation;},
    get colliders(){return expectedColliders;},
    get diagnostics(){return {threeRevision:T.REVISION,viewport:lastViewport,renderedFrames,textureUpdates,staticTriangles,drawCalls:renderer.info.render.calls,triangles:renderer.info.render.triangles,geometryCount:renderer.info.memory.geometries,textureCount:renderer.info.memory.textures,characterState,characterBatch,figurineState,figurine:figurine?{sourceSha256:FIGURINE_SOURCE.sha256,triangles:FIGURINE_SOURCE.triangles,scale:figurine.scale,height:figurine.height,hovered:figurine.hovered}:null,shadowSize:4096};},
    dispose(){if(disposed)return;disposed=true;running=false;controller.abort();canvas.removeEventListener('webglcontextlost',lost);if(pendingFigurine){disposeGraph(pendingFigurine.root);pendingFigurine=null;}if(pendingCharacter){disposeGraph(pendingCharacter);pendingCharacter=null;}exitDoors.dispose();disposeGraph(scene);sun.shadow.dispose();environment.dispose();renderer.renderLists.dispose();renderer.dispose();},
  };
}

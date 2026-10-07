export const PLAYER_RADIUS=.23;
export const EYE_HEIGHT=1.64;
export const START={x:0,z:4.48,yaw:0,pitch:-.035};

export function wallColliders(r){return [
 {minX:r.minX-.5,maxX:r.minX,minZ:r.minZ-.5,maxZ:r.maxZ+.5,name:'west wall'},
 {minX:r.minX-.5,maxX:r.maxX+.2,minZ:r.minZ-.5,maxZ:r.minZ,name:'rear wall'},
 {minX:r.minX-.5,maxX:r.maxX+.5,minZ:r.maxZ,maxZ:r.maxZ+.5,name:'storefront'},
 {minX:r.maxX,maxX:r.maxX+.4,minZ:r.minZ,maxZ:r.alcoveMinZ,name:'east wall north'},
 {minX:r.maxX,maxX:r.maxX+.4,minZ:r.alcoveMaxZ,maxZ:r.maxZ,name:'east wall south'},
 {minX:r.maxX,maxX:r.alcoveMaxX+.4,minZ:r.alcoveMinZ-.3,maxZ:r.alcoveMinZ,name:'counter north wall'},
 {minX:r.maxX,maxX:r.alcoveMaxX+.4,minZ:r.alcoveMaxZ,maxZ:r.alcoveMaxZ+.3,name:'counter south wall'},
 {minX:r.alcoveMaxX,maxX:r.alcoveMaxX+.4,minZ:r.alcoveMinZ,maxZ:r.alcoveMaxZ,name:'counter back wall'}
];}
export function isWalkable(x,z,colliders,r=PLAYER_RADIUS){return colliders.every(b=>{const dx=x-Math.max(b.minX,Math.min(b.maxX,x)),dz=z-Math.max(b.minZ,Math.min(b.maxZ,z));return dx*dx+dz*dz>=r*r-1e-8;});}
export function moveWithCollision(position,dx,dz,colliders,r=PLAYER_RADIUS){
 // Small bounded substeps prevent tunneling even after a delayed animation frame.
 const steps=Math.max(1,Math.ceil(Math.hypot(dx,dz)/.075));
 for(let step=0;step<steps;step++){
  position.x+=dx/steps;position.z+=dz/steps;
  for(let pass=0;pass<3;pass++)for(const b of colliders){
   const cx=Math.max(b.minX,Math.min(b.maxX,position.x));const cz=Math.max(b.minZ,Math.min(b.maxZ,position.z));
   const px=position.x-cx,pz=position.z-cz,d2=px*px+pz*pz;
   if(d2>=r*r)continue;
   if(d2>1e-12){const d=Math.sqrt(d2),push=r-d+1e-6;position.x+=px/d*push;position.z+=pz/d*push;}
   else{const edges=[{d:position.x-b.minX,x:b.minX-r,z:position.z},{d:b.maxX-position.x,x:b.maxX+r,z:position.z},{d:position.z-b.minZ,x:position.x,z:b.minZ-r},{d:b.maxZ-position.z,x:position.x,z:b.maxZ+r}];edges.sort((a,b)=>a.d-b.d);position.x=edges[0].x;position.z=edges[0].z;}
  }
 }
 return position;
}

export function createMovement(camera,canvas,colliders,{onPause,onLookMode}){
 const keys=new Set();const position={x:START.x,z:START.z};let yaw=START.yaw,pitch=START.pitch,vx=0,vz=0,active=false,dragging=false,wasLocked=false;
 camera.rotation.order='YXZ';
 const updateCamera=()=>{camera.position.set(position.x,EYE_HEIGHT,position.z);camera.rotation.set(pitch,yaw,0,'YXZ');};
 function reset(){position.x=START.x;position.z=START.z;yaw=START.yaw;pitch=START.pitch;vx=vz=0;keys.clear();updateCamera();}
 function pause(){active=false;dragging=false;keys.clear();vx=vz=0;onPause();}
 async function capture(){active=true;keys.clear();try{if(canvas.requestPointerLock){await canvas.requestPointerLock();}else{onLookMode('drag');}}catch{onLookMode('drag');}}
 document.addEventListener('pointerlockchange',()=>{const locked=document.pointerLockElement===canvas;if(locked){active=true;wasLocked=true;onLookMode('locked');}else if(wasLocked){wasLocked=false;pause();}});
 document.addEventListener('pointerlockerror',()=>onLookMode('drag'));
 document.addEventListener('keydown',e=>{if(e.code==='Escape'&&active&&document.pointerLockElement!==canvas)pause();if(!active)return;if(['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','ShiftLeft','ShiftRight'].includes(e.code)){keys.add(e.code);e.preventDefault();}});
 document.addEventListener('keyup',e=>keys.delete(e.code));
 document.addEventListener('mousemove',e=>{if(!active)return;if(document.pointerLockElement!==canvas&&!dragging)return;yaw-=e.movementX*.00205;pitch=Math.max(-1.36,Math.min(1.36,pitch-e.movementY*.00205));updateCamera();});
 canvas.addEventListener('mousedown',e=>{if(active&&e.button===0&&document.pointerLockElement!==canvas){dragging=true;e.preventDefault();}});
 document.addEventListener('mouseup',()=>dragging=false);
 window.addEventListener('blur',()=>{keys.clear();dragging=false;vx=vz=0;if(active){if(document.pointerLockElement===canvas)document.exitPointerLock();else pause();}});
 document.addEventListener('visibilitychange',()=>{if(document.hidden){keys.clear();vx=vz=0;}});
 function tick(dt){if(!active)return false;const f=Number(keys.has('KeyW')||keys.has('ArrowUp'))-Number(keys.has('KeyS')||keys.has('ArrowDown'));const s=Number(keys.has('KeyD')||keys.has('ArrowRight'))-Number(keys.has('KeyA')||keys.has('ArrowLeft'));const len=Math.hypot(f,s)||1;const speed=keys.has('ShiftLeft')||keys.has('ShiftRight')?2.65:1.65;const targetX=(s*Math.cos(yaw)-f*Math.sin(yaw))/len*speed,targetZ=(-f*Math.cos(yaw)-s*Math.sin(yaw))/len*speed;const response=1-Math.exp(-dt*17);vx+=(targetX-vx)*response;vz+=(targetZ-vz)*response;moveWithCollision(position,vx*dt,vz*dt,colliders);updateCamera();return Math.abs(vx)+Math.abs(vz)>.001;}
 reset();return {tick,reset,capture,get active(){return active;},get position(){return position;}};
}

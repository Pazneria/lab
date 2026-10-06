import {START,WATER,PIER,RAMP,DECK,WORKSHOP,inside,surfaceAt,routeArea} from './layout.js';

export const BODY_RADIUS=.22;
export const EYE_HEIGHT=1.66;
export function intersectsObstacle(x,z,o,radius=BODY_RADIUS){
 const dx=x-o.x,dz=z-o.z,c=Math.cos(o.angle||0),s=Math.sin(o.angle||0);
 const lx=dx*c-dz*s,lz=dx*s+dz*c;
 const nearX=Math.max(-o.hx,Math.min(o.hx,lx)),nearZ=Math.max(-o.hz,Math.min(o.hz,lz));
 return (lx-nearX)**2+(lz-nearZ)**2<radius*radius;
}
export function canMoveTo(x,z,fromX,fromZ,colliders){
 if(x< -14.45||x>14.45||z< -12.6||z>18.0-BODY_RADIUS)return false;
 const from=surfaceAt(fromX,fromZ),next=surfaceAt(x,z);
 if(next.y<WATER+.025)return false;
 // Do not step off raised edges or climb onto a raised floor from below.
 if(Math.abs(next.y-from.y)>.23)return false;
 if(inside(PIER,x,z)&&z>3.7&&(x<PIER.x0+.20||x>PIER.x1-.20||z>PIER.z1-.20))return false;
 if(inside(RAMP,x,z)&&z>3.74&&z<8.48&&(x<RAMP.x0+.19||x>RAMP.x1-.19))return false;
 // Raised apron edge protections match the visual railings.
 if(inside(DECK,x,z)){
  if(x<DECK.x0+.18||x>DECK.x1-.18)return false;
  if(z>3.39&&Math.abs(x)>1.11&&x<4.85)return false;
 }
 for(const obstacle of colliders)if(intersectsObstacle(x,z,obstacle))return false;
 return true;
}
export class Walker{
 constructor(camera,element,colliders,onArea,onLock,onToast){
  this.camera=camera;this.element=element;this.colliders=colliders;this.onArea=onArea;this.onLock=onLock;this.onToast=onToast;
  this.keys=new Set();this.velocity={x:0,z:0};this.enabled=false;this.dragging=false;this.dragDistance=0;this.lastDragTime=0;this.sensitivity=1;this.lastArea='';this.bob=0;this.eyeY=0;this.reset();
  document.addEventListener('pointerlockchange',()=>{this.dragging=false;this.onLock(document.pointerLockElement===element);this.keys.clear();});
  document.addEventListener('pointerlockerror',()=>this.onToast('Mouse capture is unavailable. Drag in the scene to look.'));
  document.addEventListener('mousemove',e=>{if(this.enabled&&(document.pointerLockElement===element||this.dragging)){this.yaw-=e.movementX*.002*this.sensitivity;this.pitch-=e.movementY*.002*this.sensitivity;this.pitch=Math.max(-1.38,Math.min(1.38,this.pitch));if(this.dragging)this.dragDistance+=Math.abs(e.movementX)+Math.abs(e.movementY);}});
  element.addEventListener('mousedown',e=>{if(this.enabled&&e.button===0&&document.pointerLockElement!==element){this.dragging=true;this.dragDistance=0;}});
  window.addEventListener('mouseup',()=>{if(this.dragging&&this.dragDistance>3)this.lastDragTime=performance.now();this.dragging=false;});
  window.addEventListener('blur',()=>{this.keys.clear();this.dragging=false;});
  document.addEventListener('visibilitychange',()=>{this.keys.clear();this.velocity.x=this.velocity.z=0;});
  window.addEventListener('keydown',e=>{
   if(/INPUT|SELECT|TEXTAREA/.test(document.activeElement?.tagName))return;
   if(['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','ShiftLeft','ShiftRight'].includes(e.code)){if(this.enabled){e.preventDefault();this.keys.add(e.code);}}
   if(e.code==='KeyR'&&!e.repeat){this.reset();this.onToast('Returned to the workshop.');}
  });
  window.addEventListener('keyup',e=>this.keys.delete(e.code));
 }
 async capture(){
  this.enabled=true;
  if(this.element.requestPointerLock){try{await this.element.requestPointerLock();}catch{this.onToast('Drag to look; use W A S D to walk.');}}
 }
 reset(){this.x=START.x;this.z=START.z;this.yaw=START.yaw;this.pitch=START.pitch;this.velocity.x=this.velocity.z=0;this.eyeY=surfaceAt(this.x,this.z).y+EYE_HEIGHT;this.bob=0;this.updateCamera(0);}
 updateCamera(dt){
  const targetY=surfaceAt(this.x,this.z).y+EYE_HEIGHT;
  this.eyeY+=(targetY-this.eyeY)*(1-Math.exp(-dt*20));
  this.camera.position.set(this.x,this.eyeY,this.z);this.camera.rotation.set(this.pitch,this.yaw,0,'YXZ');
 }
 update(dt){
  dt=Math.min(dt,.05);
  let strafe=0,forward=0;
  if(this.enabled){forward=(this.keys.has('KeyW')||this.keys.has('ArrowUp')?1:0)-(this.keys.has('KeyS')||this.keys.has('ArrowDown')?1:0);strafe=(this.keys.has('KeyD')||this.keys.has('ArrowRight')?1:0)-(this.keys.has('KeyA')||this.keys.has('ArrowLeft')?1:0);}
  const length=Math.hypot(strafe,forward);if(length>1){strafe/=length;forward/=length;}
  const speed=this.keys.has('ShiftLeft')||this.keys.has('ShiftRight')?3.2:2.0;
  const targetX=(strafe*Math.cos(this.yaw)-forward*Math.sin(this.yaw))*speed;
  const targetZ=(-strafe*Math.sin(this.yaw)-forward*Math.cos(this.yaw))*speed;
  const accel=1-Math.exp(-dt*(length?15:22));
  this.velocity.x+=(targetX-this.velocity.x)*accel;this.velocity.z+=(targetZ-this.velocity.z)*accel;
  // Short movement substeps keep thin walls solid during a slow frame.
  const dx=this.velocity.x*dt,dz=this.velocity.z*dt,steps=Math.max(1,Math.ceil(Math.hypot(dx,dz)/.055));
  for(let i=0;i<steps;i++){
   const nx=this.x+dx/steps;if(canMoveTo(nx,this.z,this.x,this.z,this.colliders))this.x=nx;else this.velocity.x=0;
   const nz=this.z+dz/steps;if(canMoveTo(this.x,nz,this.x,this.z,this.colliders))this.z=nz;else this.velocity.z=0;
  }
  this.updateCamera(dt);
  const area=routeArea(this.x,this.z);if(area[1]!==this.lastArea){this.lastArea=area[1];this.onArea(area);}
 }
}

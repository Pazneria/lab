import {clamp} from './geometry.js';
import {platformHeight} from './fitting.js';
import {dress} from './mantle.js';

export const start={x:.84,z:8.12,yaw:.32,pitch:-.056};
export const eyeLevel=1.635,bodyRadius=.206;
export function canStand(x,z,blocks){
  if(x< -4.47||x>4.47||z< -15.70||z>8.57)return false;
  for(const q of blocks){
    const dx=Math.max(0,Math.abs(x-q.x)-q.w*.5),dz=Math.max(0,Math.abs(z-q.z)-q.d*.5);
    if(dx*dx+dz*dz<bodyRadius*bodyRadius)return false;
  }
  const dx=x-dress.x,dz=z-dress.z+.13;
  if((dx/1.13)**2+(dz/1.40)**2<1)return false;
  return true;
}
export function floorAt(x,z){
  if(Math.hypot(x-dress.x,z-dress.z)<1.30)return .19;
  return platformHeight(x,z);
}
export function slide(pos,dx,dz,blocks){
  const n=Math.max(1,Math.ceil(Math.hypot(dx,dz)/.083));
  for(let i=0;i<n;i++){
    if(canStand(pos.x+dx/n,pos.z,blocks))pos.x+=dx/n;
    if(canStand(pos.x,pos.z+dz/n,blocks))pos.z+=dz/n;
  }
}
export class Walk {
  constructor(canvas,camera,blocks,ui){
    this.canvas=canvas;this.camera=camera;this.blocks=blocks;this.ui=ui;
    this.keys=new Set();this.fingers=new Map();this.dragging=false;this.locked=false;
    this.drive=[0,0];this.vel=[0,0];this.active=false;this.lowered=false;this.inspect=false;
    this.reset();this.bind();
  }
  reset(){
    Object.assign(this,start);this.y=eyeLevel;this.vel=[0,0];this.drive=[0,0];this.lowered=false;this.inspect=false;
    this.keys.clear();this.fingers.clear();this.dragging=false;
    this.camera.fov=65;this.camera.updateProjectionMatrix();this.apply();
    this.ui.room(this.z);this.ui.status('Returned to the entrance.');
  }
  apply(){this.camera.position.set(this.x,this.y,this.z);this.camera.rotation.set(this.pitch,this.yaw,0,'YXZ');}
  look(dx,dy){const k=this.inspect?.00107:.00205;this.yaw-=dx*k;this.pitch=clamp(this.pitch-dy*k,-1.40,1.40);this.apply();}
  clear(){this.keys.clear();this.drive=[0,0];this.fingers.clear();this.dragging=false;this.vel=[0,0];this.inspect=false;this.lowered=false;}
  bind(){
    const c=this.canvas;
    const codes=new Set(['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','ShiftLeft','ShiftRight','KeyC','KeyF','PageUp','PageDown','KeyR','KeyH','Slash']);
    const clickExplore=()=>{
      c.focus({preventScroll:true});
      this.ui.closeHelp();
      if(!this.active){this.active=true;this.ui.exploring(true);}
    };
    c.addEventListener('pointerdown',e=>{
      if(e.button!==0)return;clickExplore();
      if(e.pointerType==='touch'){
        c.setPointerCapture(e.pointerId);
        this.fingers.set(e.pointerId,{x:e.clientX,y:e.clientY,lastX:e.clientX,lastY:e.clientY,move:e.clientX<innerWidth*.45});
        return;
      }
      this.dragging=true;this.lastX=e.clientX;this.lastY=e.clientY;
      if(!this.locked&&c.requestPointerLock){
        try{const p=c.requestPointerLock();if(p?.catch)p.catch(()=>this.ui.status('Drag to look around.'));}catch{this.ui.status('Drag to look around.');}
      }
    });
    document.addEventListener('mousemove',e=>{
      if(this.locked)this.look(e.movementX,e.movementY);
    });
    document.addEventListener('pointermove',e=>{
      if(this.locked)return;
      const f=this.fingers.get(e.pointerId);
      if(f){
        if(f.move)this.drive=[clamp((e.clientX-f.x)/62,-1,1),clamp((f.y-e.clientY)/62,-1,1)];
        else this.look((e.clientX-f.lastX)*1.56,(e.clientY-f.lastY)*1.56);
        f.lastX=e.clientX;f.lastY=e.clientY;
      }else if(this.dragging){this.look(e.clientX-this.lastX,e.clientY-this.lastY);this.lastX=e.clientX;this.lastY=e.clientY;}
    });
    const release=e=>{if(this.fingers.get(e.pointerId)?.move)this.drive=[0,0];this.fingers.delete(e.pointerId);if(e.pointerType!=='touch')this.dragging=false;};
    document.addEventListener('pointerup',release);document.addEventListener('pointercancel',release);
    document.addEventListener('pointerlockchange',()=>{
      const previous=this.locked;this.locked=document.pointerLockElement===c;
      if(previous&&!this.locked){this.clear();this.ui.exploring(false);this.active=false;}
    });
    document.addEventListener('pointerlockerror',()=>this.ui.status('Drag to look around.'));
    window.addEventListener('keydown',e=>{
      if(!codes.has(e.code)||e.metaKey||e.ctrlKey||e.altKey)return;
      const target=e.target;if(target?.matches?.('input,textarea,select'))return;
      e.preventDefault();
      if(e.code==='KeyH'||e.code==='Slash'){if(!e.repeat)this.ui.toggleHelp();return;}
      if(this.ui.helpOpen())return;
      if(e.code==='KeyR'){if(!e.repeat)this.reset();return;}
      this.keys.add(e.code);
      if(!this.active){this.active=true;this.ui.exploring(true);}
    });
    window.addEventListener('keyup',e=>this.keys.delete(e.code));
    window.addEventListener('blur',()=>this.clear());
    document.addEventListener('visibilitychange',()=>{if(document.hidden)this.clear();});
  }
  tick(dt){
    if(this.ui.helpOpen())return;
    const k=this.keys;
    this.inspect=k.has('KeyF');this.lowered=k.has('KeyC');
    const targetFov=this.inspect?39:65;
    if(Math.abs(this.camera.fov-targetFov)>.02){this.camera.fov+=(targetFov-this.camera.fov)*(1-Math.exp(-dt*15));this.camera.updateProjectionMatrix();}
    if(k.has('ArrowLeft'))this.yaw+=dt*1.52;if(k.has('ArrowRight'))this.yaw-=dt*1.52;
    if(k.has('PageUp'))this.pitch=clamp(this.pitch+dt*1.1,-1.40,1.40);
    if(k.has('PageDown'))this.pitch=clamp(this.pitch-dt*1.1,-1.40,1.40);
    let x=(k.has('KeyD')?1:0)-(k.has('KeyA')?1:0)+this.drive[0];
    let forward=(k.has('KeyW')||k.has('ArrowUp')?1:0)-(k.has('KeyS')||k.has('ArrowDown')?1:0)+this.drive[1];
    const l=Math.hypot(x,forward);if(l>1){x/=l;forward/=l;}
    const speed=this.lowered?1.04:(k.has('ShiftLeft')||k.has('ShiftRight'))?3.32:1.93;
    const s=Math.sin(this.yaw),c=Math.cos(this.yaw),vx=(c*x-s*forward)*speed,vz=(-s*x-c*forward)*speed;
    const f=1-Math.exp(-dt*(l>0?17:24));this.vel[0]+=(vx-this.vel[0])*f;this.vel[1]+=(vz-this.vel[1])*f;
    if(Math.abs(this.vel[0])+Math.abs(this.vel[1])>.001)slide(this,this.vel[0]*dt,this.vel[1]*dt,this.blocks);
    const targetY=floorAt(this.x,this.z)+(this.lowered?1.09:eyeLevel);
    this.y+=(targetY-this.y)*(1-Math.exp(-dt*12));this.apply();this.ui.room(this.z);
  }
}


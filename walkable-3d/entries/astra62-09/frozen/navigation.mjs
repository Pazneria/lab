import {room as R,alcove as A,gallery as G,stairs as S,initial} from './layout.mjs';

export const person={radius:.255,eye:1.635,body:1.77,step:.205};
const clamp=(v,lo,hi)=>Math.min(hi,Math.max(lo,v));
export function createWalker(solids){
  const w={x:initial.x,z:initial.z,feet:0,eye:person.eye,yaw:initial.yaw,pitch:initial.pitch};
  function reset(){Object.assign(w,{x:initial.x,z:initial.z,feet:0,eye:person.eye,yaw:initial.yaw,pitch:initial.pitch})}
  function clearance(x,z,feet){
    const r=person.radius;
    if(x<R.left+.145+r||x>A.right-.18-r||z<R.back+(feet>2?.405:.17)+r||z>R.front-.18-r)return false;
    if(x>R.right-.145-r&&(z<A.back+.155+r||z>A.front-.155-r))return false;
    for(const b of solids){
      if(feet+person.body<=b.y1+.003||feet>=b.y2-.003)continue;
      const dx=x-clamp(x,b.x1,b.x2),dz=z-clamp(z,b.z1,b.z2);
      if(dx*dx+dz*dz<r*r-1e-7)return false;
    }
    return true;
  }
  function surface(x,z,previous){
    let h=0,thick=0;
    if(x>=S.left&&x<=S.right&&z<=S.bottom&&z>S.top){
      const j=Math.min(S.count-1,Math.max(0,Math.floor((S.bottom-z)/(S.bottom-S.top)*S.count)));
      h=(j+1)*S.height/S.count;thick=.17;
    }else if(x>=G.left&&x<=G.right&&z>=G.back&&z<=G.front){
      h=G.level;thick=.282;
    }
    if(h-previous<=person.step&&h-previous>=-person.step)return h;
    if(previous<.01&&h-thick>person.body+.075)return 0;
    return null;
  }
  function axisMove(x,z){
    const feet=surface(x,z,w.feet);
    if(feet===null||!clearance(x,z,feet))return false;
    w.x=x;w.z=z;w.feet=feet;return true;
  }
  function move(dx,dz){
    const count=Math.max(1,Math.ceil(Math.hypot(dx,dz)/.066));let moved=false;
    for(let i=0;i<count;i++){
      if(dx)moved=axisMove(w.x+dx/count,w.z)||moved;
      if(dz)moved=axisMove(w.x,w.z+dz/count)||moved;
    }
    return moved;
  }
  function area(){
    if(w.feet>2.41&&w.z<=G.front+.04)return 'Inspection gallery';
    if(w.feet>.1)return 'Gallery stairs';
    if(w.x>R.right-.20)return 'Service alcove';
    return 'Main work floor';
  }
  return {state:w,reset,move,clearance,surface,area};
}

export function controls(canvas,walker,{onLock,onHelp,onReset,onArea,blocked}){
  const w=walker.state,keys=new Set();
  const codes=new Set(['KeyW','KeyA','KeyS','KeyD','KeyR','KeyH','ShiftLeft','ShiftRight','ArrowLeft','ArrowRight','ArrowUp','ArrowDown','PageUp','PageDown']);
  let dragging=false,px=0,py=0,pointerId=null,velocityX=0,velocityZ=0,dirty=true,area='';
  const locked=()=>document.pointerLockElement===canvas;
  const clear=()=>{keys.clear();velocityX=velocityZ=0;dragging=false;pointerId=null};
  function reset(){clear();walker.reset();dirty=true;onReset()}
  function turn(dx,dy){w.yaw-=dx*.00208;w.pitch=clamp(w.pitch-dy*.00208,-1.42,1.42);dirty=true}
  function engage(){
    if(blocked())return;
    canvas.focus({preventScroll:true});
    try{const result=canvas.requestPointerLock?.();if(result?.catch)result.catch(()=>onLock(false,true));}
    catch{onLock(false,true)}
  }
  canvas.addEventListener('pointerdown',e=>{
    if(blocked()||e.button!==0)return;
    canvas.focus({preventScroll:true});dragging=true;px=e.clientX;py=e.clientY;pointerId=e.pointerId;
    if(e.pointerType==='mouse'&&!locked())engage();
    if(!locked())try{canvas.setPointerCapture(e.pointerId)}catch{}
  });
  canvas.addEventListener('pointermove',e=>{
    if(dragging&&!locked()&&!blocked()&&e.pointerId===pointerId){turn(e.clientX-px,e.clientY-py);px=e.clientX;py=e.clientY}
  });
  function release(e){if(e.pointerId===pointerId){dragging=false;pointerId=null}}
  window.addEventListener('pointerup',release);window.addEventListener('pointercancel',release);
  document.addEventListener('mousemove',e=>{if(locked()&&!blocked())turn(e.movementX,e.movementY)});
  document.addEventListener('pointerlockchange',()=>{clear();onLock(locked(),false);dirty=true});
  document.addEventListener('pointerlockerror',()=>{onLock(false,true)});
  window.addEventListener('keydown',e=>{
    if(e.altKey||e.ctrlKey||e.metaKey||!codes.has(e.code))return;
    if(e.code==='KeyH'){e.preventDefault();if(!e.repeat){clear();onHelp()}return}
    if(blocked())return;
    e.preventDefault();
    if(e.code==='KeyR'){if(!e.repeat)reset();return}
    keys.add(e.code);
  });
  window.addEventListener('keyup',e=>keys.delete(e.code));
  window.addEventListener('blur',clear);document.addEventListener('visibilitychange',()=>{if(document.hidden)clear()});
  function tick(dt){
    let change=dirty;dirty=false;
    if(blocked())return change;
    const turnDir=Number(keys.has('ArrowLeft'))-Number(keys.has('ArrowRight'));
    const pitchDir=Number(keys.has('PageUp'))-Number(keys.has('PageDown'));
    if(turnDir||pitchDir){w.yaw+=turnDir*1.54*dt;w.pitch=clamp(w.pitch+pitchDir*1.08*dt,-1.42,1.42);change=true}
    const forward=Number(keys.has('KeyW')||keys.has('ArrowUp'))-Number(keys.has('KeyS')||keys.has('ArrowDown'));
    const right=Number(keys.has('KeyD'))-Number(keys.has('KeyA'));
    const speed=keys.has('ShiftLeft')||keys.has('ShiftRight')?3.90:2.42;
    const gain=speed/Math.max(1,Math.hypot(forward,right)),cos=Math.cos(w.yaw),sin=Math.sin(w.yaw);
    const targetX=(right*cos-forward*sin)*gain,targetZ=(-right*sin-forward*cos)*gain;
    const alpha=1-Math.exp(-dt*(forward||right?19:28));
    velocityX+=(targetX-velocityX)*alpha;velocityZ+=(targetZ-velocityZ)*alpha;
    if(Math.abs(velocityX)+Math.abs(velocityZ)>.004)change=walker.move(velocityX*dt,velocityZ*dt)||change;
    const targetEye=w.feet+person.eye;
    if(Math.abs(targetEye-w.eye)>.00017){w.eye+=(targetEye-w.eye)*(1-Math.exp(-dt*15));change=true}else w.eye=targetEye;
    const current=walker.area();if(current!==area){onArea(current);area=current}
    return change;
  }
  return {tick,engage,reset,clear,invalidate:()=>{dirty=true}};
}


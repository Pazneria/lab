import {SPAWN,walk,locationName} from './navigation.js';

export function controls(camera,canvas,world){
  const p={...SPAWN},keys=new Set(),body=document.body;
  const byId=id=>document.getElementById(id),enter=byId('enter'),help=byId('help'),helpButton=byId('help-button'),resetButton=byId('reset');
  const zone=byId('zone'),floor=byId('floor'),pad=byId('walk-pad'),knob=byId('walk-knob');
  let locked=false,engaged=false,everEntered=false,lookId=null,padId=null,lastX=0,lastY=0,joyX=0,joyY=0,vx=0,vz=0,eye=p.y+1.65;
  let wasPaused=false,prevName='';
  const touch=matchMedia('(pointer: coarse)').matches;
  body.classList.toggle('touch',touch);
  function showLocation(){
    const n=locationName(p);
    if(n!==prevName){prevName=n;zone.textContent=n;floor.textContent=p.y>3.34?'Upper floor':p.y>.14?'Staircase':'Ground floor';}
  }
  function sync(){
    body.classList.toggle('walking',engaged);body.classList.toggle('locked',locked);
    enter.textContent=everEntered?'Resume exploring':'Enter library';
    byId('prompt-hint').textContent=touch?'Drag to look · Use the pad to walk':'WASD to walk · Mouse to look';
  }
  function orient(){camera.rotation.set(p.pitch,p.yaw,0,'YXZ');camera.position.set(p.x,eye,p.z);}
  function reset(){
    Object.assign(p,SPAWN);vx=0;vz=0;eye=p.y+1.65;keys.clear();orient();showLocation();
    byId('announcement').textContent='Returned to the reading room entrance.';
  }
  function release(){if(document.pointerLockElement===canvas)document.exitPointerLock();}
  function closeHelp(){help.hidden=true;helpButton.setAttribute('aria-expanded','false');}
  function start(requestLock=true){
    closeHelp();engaged=true;everEntered=true;body.classList.remove('quiet');canvas.focus({preventScroll:true});sync();
    if(requestLock&&!touch&&canvas.requestPointerLock&&document.pointerLockElement!==canvas){
      try{
        const result=canvas.requestPointerLock();
        if(result?.catch)result.catch(()=>{byId('announcement').textContent='Drag to look. Use WASD to walk.';});
      }catch{byId('announcement').textContent='Drag to look. Use WASD to walk.';}
    }
  }
  function toggleHelp(){
    if(!help.hidden){closeHelp();engaged=wasPaused?false:engaged;sync();return;}
    wasPaused=!engaged;release();engaged=false;keys.clear();vx=vz=0;help.hidden=false;body.classList.remove('quiet');
    helpButton.setAttribute('aria-expanded','true');sync();
  }
  function pause(){engaged=false;keys.clear();vx=vz=0;lookId=null;padId=null;joyX=joyY=0;knob.style.transform='';sync();}
  function turn(dx,dy){p.yaw-=dx*.0021;p.pitch=Math.max(-1.45,Math.min(1.45,p.pitch-dy*.0020));}
  enter.addEventListener('click',()=>start());
  resetButton.addEventListener('click',()=>{closeHelp();reset();resetButton.blur();});
  helpButton.addEventListener('click',toggleHelp);byId('close-help').addEventListener('click',()=>{closeHelp();helpButton.focus();});
  document.addEventListener('pointerlockchange',()=>{
    locked=document.pointerLockElement===canvas;
    if(locked){engaged=true;everEntered=true;sync();}else pause();
  });
  document.addEventListener('mousemove',e=>{if(locked)turn(e.movementX||0,e.movementY||0);});
  canvas.addEventListener('pointerdown',e=>{
    if(e.button!==0)return;
    if(!engaged)start(e.pointerType!=='touch');else if(!locked&&!touch)start(true);
    lookId=e.pointerId;lastX=e.clientX;lastY=e.clientY;
    if(!locked&&canvas.setPointerCapture)try{canvas.setPointerCapture(e.pointerId);}catch{}
  });
  canvas.addEventListener('pointermove',e=>{
    if(locked||lookId!==e.pointerId||!engaged)return;
    turn(e.clientX-lastX,e.clientY-lastY);lastX=e.clientX;lastY=e.clientY;
  });
  const clearLook=e=>{if(e.pointerId===lookId)lookId=null;};
  canvas.addEventListener('pointerup',clearLook);canvas.addEventListener('pointercancel',clearLook);
  pad.addEventListener('pointerdown',e=>{
    if(padId!==null)return;start(false);padId=e.pointerId;pad.setPointerCapture(e.pointerId);e.preventDefault();padMove(e);
  });
  function padMove(e){
    if(e.pointerId!==padId)return;
    const r=pad.getBoundingClientRect(),x=(e.clientX-r.left-r.width/2)/(r.width*.35),y=(e.clientY-r.top-r.height/2)/(r.height*.35),len=Math.max(1,Math.hypot(x,y));
    joyX=x/len;joyY=y/len;knob.style.transform='translate('+joyX*22+'px,'+joyY*22+'px)';
  }
  pad.addEventListener('pointermove',padMove);
  const clearPad=e=>{if(e.pointerId===padId){padId=null;joyX=joyY=0;knob.style.transform='';}};
  pad.addEventListener('pointerup',clearPad);pad.addEventListener('pointercancel',clearPad);
  const motion=['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','ShiftLeft','ShiftRight'];
  document.addEventListener('keydown',e=>{
    if(e.ctrlKey||e.metaKey||e.altKey)return;
    if(e.code==='KeyR'){if(!e.repeat){reset();closeHelp();}return;}
    if(e.key==='?'||e.code==='F1'){e.preventDefault();if(!e.repeat)toggleHelp();return;}
    if(e.code==='KeyH'){if(!e.repeat)body.classList.toggle('quiet');return;}
    if(e.code==='Escape'){closeHelp();pause();return;}
    if(!motion.includes(e.code)||!help.hidden)return;
    e.preventDefault();if(!engaged)start(false);keys.add(e.code);
  });
  document.addEventListener('keyup',e=>keys.delete(e.code));
  window.addEventListener('blur',()=>{keys.clear();vx=vz=0;});
  document.addEventListener('visibilitychange',()=>{if(document.hidden){keys.clear();vx=vz=0;}});
  function update(dt){
    if(engaged){
      const on=k=>keys.has(k)?1:0;
      p.yaw+=(on('ArrowLeft')-on('ArrowRight'))*1.51*dt;
      let right=on('KeyD')-on('KeyA')+joyX,forward=Math.max(on('KeyW'),on('ArrowUp'))-Math.max(on('KeyS'),on('ArrowDown'))-joyY;
      const len=Math.max(1,Math.hypot(right,forward)),speed=keys.has('ShiftLeft')||keys.has('ShiftRight')?3.43:2.14;
      right=right/len*speed;forward=forward/len*speed;
      const s=Math.sin(p.yaw),c=Math.cos(p.yaw),alpha=1-Math.exp(-19*dt);
      vx+=((c*right-s*forward)-vx)*alpha;vz+=((-s*right-c*forward)-vz)*alpha;
      if(Math.abs(vx)+Math.abs(vz)>.001)walk(p,vx*dt,vz*dt,world);
    }
    eye+=(p.y+1.65-eye)*(1-Math.exp(-24*dt));orient();showLocation();
  }
  reset();sync();return {update,reset,position:p};
}

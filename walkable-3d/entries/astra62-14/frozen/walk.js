'use strict';
const MarlWalk=(()=>{
  const entrance=Object.freeze({x:1.14,z:4.96,yaw:-.267,pitch:-.123});
  const radius=.218,eye=1.61,limitPitch=Math.PI*.464;
  function blocked(x,z,blocks){
    if(x<-5.105+radius||x>5.105-radius||z< -9.685+radius||z>6.57-radius)return true;
    for(const [x0,z0,x1,z1] of blocks){
      const dx=Math.max(x0-x,0,x-x1),dz=Math.max(z0-z,0,z-z1);
      if(dx*dx+dz*dz<radius*radius)return true;
    }
    return false;
  }
  function move(c,dx,dz,blocks){
    // Small swept steps plus independent-axis sliding keep corners stable on slow frames.
    const count=Math.max(1,Math.ceil(Math.hypot(dx,dz)/.055)),sx=dx/count,sz=dz/count;
    for(let i=0;i<count;i++){
      if(!blocked(c.x+sx,c.z+sz,blocks)){c.x+=sx;c.z+=sz;}
      else{
        if(!blocked(c.x+sx,c.z,blocks))c.x+=sx;
        if(!blocked(c.x,c.z+sz,blocks))c.z+=sz;
      }
    }
  }
  function place(x,z){
    if(z>=-3.54)return ['01','Throwing room'];
    if(x>.54)return ['02','Glaze room'];
    return ['03','Kiln yard'];
  }
  async function start(){
    const by=id=>document.getElementById(id),canvas=by('view'),enter=by('enter'),entryText=by('entryText'),guide=by('guide'),help=by('help'),crosshair=by('cross'),error=by('error');
    const touch=window.matchMedia('(pointer:coarse)').matches;
    let engine,request=0,last=0,dirty=true,locked=false,drag=null,touchWalk=null,zone='',failed=false;
    const camera={...entrance},keys=new Set(),stick=[0,0];
    const fail=e=>{failed=true;error.hidden=false;error.textContent='The workshop could not open. '+(e.message||e);enter.hidden=true;};
    try{engine=await MarlRender.create(canvas);}catch(e){fail(e);return;}
    const blocks=MARL_PACK.blocks;
    function hint(s){entryText.textContent=s||(touch?'Left drag to walk · right drag to look':'Click to explore  ·  WASD to walk');}
    function syncPlace(){const [n,s]=place(camera.x,camera.z);if(s!==zone){zone=s;by('zoneNo').textContent=n;by('zone').textContent=s;}}
    function frame(now){
      request=0;if(failed||document.hidden)return;
      const dt=last?Math.min(.055,Math.max(0,(now-last)/1000)):.016;last=now;
      let forward=(keys.has('KeyW')?1:0)-(keys.has('KeyS')?1:0)+stick[1],side=(keys.has('KeyD')?1:0)-(keys.has('KeyA')?1:0)+stick[0];
      const turn=(keys.has('ArrowRight')?1:0)-(keys.has('ArrowLeft')?1:0),tilt=(keys.has('ArrowUp')?1:0)-(keys.has('ArrowDown')?1:0);
      if(turn||tilt){camera.yaw+=turn*dt*1.48;camera.pitch=Math.max(-limitPitch,Math.min(limitPitch,camera.pitch+tilt*dt*1.15));dirty=true;}
      if(forward||side){
        const d=Math.max(1,Math.hypot(forward,side)),speed=(keys.has('ShiftLeft')||keys.has('ShiftRight')?2.85:1.71)*dt/d;
        const sy=Math.sin(camera.yaw),cy=Math.cos(camera.yaw);
        move(camera,(sy*forward+cy*side)*speed,(-cy*forward+sy*side)*speed,blocks);
        dirty=true;
      }
      if(dirty){engine.render([camera.x,eye,camera.z],camera.yaw,camera.pitch);syncPlace();dirty=false;}
      if(keys.size||stick[0]||stick[1])wake(false);else last=0;
    }
    function wake(redraw=true){if(redraw)dirty=true;if(!request&&!failed&&!document.hidden)request=requestAnimationFrame(frame);}
    function turn(dx,dy){
      camera.yaw+=dx*.00205;camera.yaw=((camera.yaw+Math.PI)%(2*Math.PI)+2*Math.PI)%(2*Math.PI)-Math.PI;
      camera.pitch=Math.max(-limitPitch,Math.min(limitPitch,camera.pitch-dy*.00205));wake();
    }
    function clear(){keys.clear();stick[0]=stick[1]=0;drag=null;touchWalk=null;last=0;}
    function reset(){clear();Object.assign(camera,entrance);wake();canvas.focus({preventScroll:true});}
    function showHelp(on){guide.hidden=!on;help.setAttribute('aria-expanded',String(on));}
    function acquire(){
      if(failed)return;canvas.focus({preventScroll:true});showHelp(false);
      if(touch){hint();return;}
      if(!canvas.requestPointerLock){hint('Drag to look  ·  WASD to walk');return;}
      try{const p=canvas.requestPointerLock();if(p&&p.catch)p.catch(()=>hint('Drag to look  ·  WASD to walk'));}
      catch{hint('Drag to look  ·  WASD to walk');}
    }
    document.addEventListener('pointerlockchange',()=>{
      locked=document.pointerLockElement===canvas;clear();crosshair.hidden=!locked;enter.hidden=locked;
      if(locked){showHelp(false);canvas.focus({preventScroll:true});}else hint();wake();
    });
    document.addEventListener('pointerlockerror',()=>hint('Drag to look  ·  WASD to walk'));
    document.addEventListener('mousemove',e=>{if(locked)turn(e.movementX,e.movementY);});
    canvas.addEventListener('pointerdown',e=>{
      if(locked||e.button!==0)return;canvas.focus({preventScroll:true});showHelp(false);
      if(e.pointerType==='touch'&&e.clientX<canvas.clientWidth*.44){
        touchWalk={id:e.pointerId,x:e.clientX,y:e.clientY};canvas.setPointerCapture(e.pointerId);return;
      }
      drag={id:e.pointerId,x:e.clientX,y:e.clientY,sx:e.clientX,sy:e.clientY,moved:false};canvas.setPointerCapture(e.pointerId);
    });
    canvas.addEventListener('pointermove',e=>{
      if(locked)return;
      if(touchWalk&&touchWalk.id===e.pointerId){stick[0]=Math.max(-1,Math.min(1,(e.clientX-touchWalk.x)/58));stick[1]=Math.max(-1,Math.min(1,(touchWalk.y-e.clientY)/58));wake(false);return;}
      if(!drag||drag.id!==e.pointerId)return;
      if(!drag.moved&&Math.hypot(e.clientX-drag.sx,e.clientY-drag.sy)>3)drag.moved=true;
      if(drag.moved)turn(e.clientX-drag.x,e.clientY-drag.y);
      drag.x=e.clientX;drag.y=e.clientY;
    });
    function release(e){
      if(touchWalk&&e.pointerId===touchWalk.id){touchWalk=null;stick[0]=stick[1]=0;wake(false);return;}
      if(!drag||drag.id!==e.pointerId)return;
      const clicked=!drag.moved&&e.pointerType!=='touch'&&e.type==='pointerup';drag=null;if(clicked)acquire();
    }
    canvas.addEventListener('pointerup',release);canvas.addEventListener('pointercancel',release);canvas.addEventListener('lostpointercapture',release);
    canvas.addEventListener('contextmenu',e=>e.preventDefault());
    const movement=new Set(['KeyW','KeyA','KeyS','KeyD','ArrowLeft','ArrowRight','ArrowUp','ArrowDown','ShiftLeft','ShiftRight']);
    window.addEventListener('keydown',e=>{
      if(e.altKey||e.metaKey||e.ctrlKey)return;
      if(movement.has(e.code)){e.preventDefault();keys.add(e.code);wake(false);return;}
      if(e.repeat)return;
      if(e.code==='KeyR'){e.preventDefault();reset();}
      if(e.code==='KeyH'){e.preventDefault();toggleHelp();}
      if(e.code==='Escape'&&!guide.hidden)showHelp(false);
    });
    window.addEventListener('keyup',e=>{keys.delete(e.code);});
    function toggleHelp(){if(locked)document.exitPointerLock();showHelp(guide.hidden);}
    enter.addEventListener('click',acquire);by('reset').addEventListener('click',reset);help.addEventListener('click',toggleHelp);
    window.addEventListener('resize',()=>wake());window.addEventListener('blur',clear);
    document.addEventListener('visibilitychange',()=>{clear();if(document.hidden&&request){cancelAnimationFrame(request);request=0;}else wake();});
    canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();clear();failed=true;if(request)cancelAnimationFrame(request);request=0;error.hidden=false;error.textContent='Graphics paused while the device restores the workshop.';});
    canvas.addEventListener('webglcontextrestored',async()=>{try{engine=await MarlRender.create(canvas);failed=false;error.hidden=true;wake();}catch(e){fail(e);}});
    if(touch){guide.querySelector('p').textContent='Drag on the left to walk. Drag on the right to look around.';}
    hint();wake();
  }
  return {start,move,blocked,entrance,place,radius};
})();
if(typeof document!=='undefined')MarlWalk.start();

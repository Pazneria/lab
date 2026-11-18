'use strict';

(() => {
  const canvas=document.getElementById('scene'), menu=document.getElementById('menu');
  const enter=document.getElementById('enter'), guide=document.getElementById('guide');
  const reset=document.getElementById('reset'), status=document.getElementById('status');
  const object=document.getElementById('object'), where=document.getElementById('location');
  const keys=document.getElementById('keys');
  const {spawn,create,walkable,within,location}=Quarters;
  const {clamp,dot,sub,add,mul}=Ward;
  const camera={...spawn,position:spawn.position.slice()};
  const last={x:NaN,z:NaN,yaw:NaN,pitch:NaN};
  const held=new Set();
  let vx=0,vz=0,scene,renderer,dragLook=false,active=false,dirty=true,dragId=null,dragX=0,dragY=0;
  let entered=false,pending=false;
  let time=0, zone, aimed;
  const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const movementCodes=new Set(['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowDown','ArrowLeft','ArrowRight',
    'ShiftLeft','ShiftRight']);
  const buttonTitle=()=>entered?'Resume exploring':'Enter the quarters';
  function rename(text) {
    enter.firstChild.textContent=text+' ';
  }
  function clearMovement() {
    held.clear();
    vx=vz=0;
    dragId=null;
  }
  function setActive(on) {
    active=on;
    document.body.classList.toggle('playing',on);
    document.body.classList.toggle('entered',entered);
    menu.inert=on;
    if (!on) {
      clearMovement();
      rename(buttonTitle());
    }
    if (on) {
      canvas.focus({preventScroll:true});
      enter.blur();
    }
    object.classList.remove('visible');
    aimed=undefined;
    dirty=true;
  }
  function lockFailed() {
    if (!pending) return;
    pending=false;
    dragLook=true;
    document.body.classList.add('begin-drag');
    entered=true;
    keys.innerHTML='<b>W A S D</b> Walk <i></i> <b>Drag</b> Look <i></i> <b>R</b> Reset <i></i> <b>Esc</b> Pause';
    status.textContent='Mouse capture is unavailable here. Drag the view to look around.';
    setActive(true);
  }
  function start() {
    if (!renderer || active || pending) return;
    if (dragLook || typeof canvas.requestPointerLock!=='function') {
      pending=true;
      lockFailed();
      return;
    }
    pending=true;
    try {
      const request=canvas.requestPointerLock();
      if (request && typeof request.catch==='function') request.catch(lockFailed);
      window.setTimeout(()=>{ if (pending && document.pointerLockElement!==canvas) lockFailed(); },1100);
    } catch (_) {
      lockFailed();
    }
  }
  function pause() {
    pending=false;
    if (document.pointerLockElement===canvas) document.exitPointerLock();
    setActive(false);
    if (!dragLook) status.textContent='';
    enter.focus({preventScroll:true});
  }
  function resetView() {
    camera.position=spawn.position.slice();
    camera.yaw=spawn.yaw;
    camera.pitch=spawn.pitch;
    clearMovement();
    dirty=true;
  }
  function look(dx,dy) {
    const sensitivity=.00235;
    camera.yaw=(camera.yaw+dx*sensitivity)%Ward.TAU;
    camera.pitch=clamp(camera.pitch-dy*sensitivity,-1.52,1.52);
  }
  canvas.tabIndex=-1;
  enter.addEventListener('click',start);
  reset.addEventListener('click',resetView);
  guide.addEventListener('click',()=>{
    pause();
    status.textContent=dragLook?'Drag the view to look around. Arrow keys also move.':'Arrow keys also move. Hold Shift to walk faster.';
  });
  document.addEventListener('pointerlockchange',()=>{
    const locked=document.pointerLockElement===canvas;
    if (locked) {
      pending=false;
      dragLook=false;
      document.body.classList.remove('begin-drag');
      entered=true;
      status.textContent='';
      setActive(true);
    } else if (!dragLook) {
      pause();
    }
  });
  document.addEventListener('pointerlockerror',lockFailed);
  document.addEventListener('mousemove',e=>{
    if (active && !dragLook && document.pointerLockElement===canvas) look(e.movementX,e.movementY);
  });
  canvas.addEventListener('pointerdown',e=>{
    if (!active || !dragLook) return;
    canvas.setPointerCapture(e.pointerId);
    dragId=e.pointerId;
    dragX=e.clientX;
    dragY=e.clientY;
    document.body.classList.remove('begin-drag');
  });
  canvas.addEventListener('pointermove',e=>{
    if (e.pointerId!==dragId) return;
    look(e.clientX-dragX,e.clientY-dragY);
    dragX=e.clientX;
    dragY=e.clientY;
  });
  for (const event of ['pointerup','pointercancel','lostpointercapture']) {
    canvas.addEventListener(event,e=>{ if (e.pointerId===dragId) dragId=null; });
  }
  document.addEventListener('keydown',e=>{
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.code==='Escape' && active) { pause(); return; }
    if (e.code==='KeyR') {
      if (active || entered) { e.preventDefault(); resetView(); }
      return;
    }
    if (!active || !movementCodes.has(e.code)) return;
    held.add(e.code);
    e.preventDefault();
  });
  document.addEventListener('keyup',e=>{ held.delete(e.code); });
  document.addEventListener('visibilitychange',()=>{ if (document.hidden) clearMovement(); });
  window.addEventListener('blur',clearMovement);
  window.addEventListener('resize',()=>{ dirty=true; });
  canvas.addEventListener('webglcontextlost',e=>{
    e.preventDefault();
    pause();
    renderer=null;
    enter.disabled=true;
    status.textContent='The graphics context was interrupted.';
  });
  canvas.addEventListener('webglcontextrestored',()=>{
    if (boot()) status.textContent='Graphics restored. You can resume exploring.';
  });

  function move(dt) {
    const has=(a,b)=>held.has(a)||held.has(b);
    const advance=Number(has('KeyW','ArrowUp'))-Number(has('KeyS','ArrowDown'));
    const side=Number(has('KeyD','ArrowRight'))-Number(has('KeyA','ArrowLeft'));
    const norm=Math.hypot(advance,side)||1;
    const speed=has('ShiftLeft','ShiftRight')?3.82:2.80;
    const c=Math.cos(camera.yaw),s=Math.sin(camera.yaw);
    const damp=reducedMotion?1:1-Math.exp(-dt*21);
    vx+=(speed*(advance*s+side*c)/norm-vx)*damp;
    vz+=(speed*(-advance*c+side*s)/norm-vz)*damp;
    if (Math.abs(vx)+Math.abs(vz)<.002) { vx=vz=0; return; }
    const p=camera.position;
    const steps=Math.max(1,Math.ceil(Math.hypot(vx*dt,vz*dt)/.066));
    let dx=vx*dt/steps,dz=vz*dt/steps;
    for (let i=0;i<steps;i++) {
      if (dx && walkable(scene,p[0]+dx,p[2])) p[0]+=dx;
      else if (dx) vx=dx=0;
      if (dz && walkable(scene,p[0],p[2]+dz)) p[2]+=dz;
      else if (dz) vz=dz=0;
    }
  }
  function showLocation() {
    const next=location(camera.position[2]);
    if (next!==zone) {
      zone=next;
      where.lastChild.textContent=' '+next;
    }
  }
  function inspect() {
    const p=camera.position, cp=Math.cos(camera.pitch);
    const view=[Math.sin(camera.yaw)*cp,Math.sin(camera.pitch),-Math.cos(camera.yaw)*cp];
    let candidate, best=1;
    for (const item of scene.labels) {
      const offset=sub(item.position,p), along=dot(offset,view);
      if (along<.13 || along>item.range) continue;
      const rr=Math.max(0,dot(offset,offset)-along*along);
      const cone=Math.min(item.reach,along*.22+.025);
      if (rr>cone*cone) continue;
      const score=rr/(cone*cone)*.6+along/item.range*.4;
      if (score>=best) continue;
      let blocked=false;
      for (let a=.27;a<along-.29;a+=.20) {
        const q=add(p,mul(view,a));
        if (!within(q[0],q[2])) { blocked=true; break; }
      }
      if (!blocked) {
        candidate=item.text;
        best=score;
      }
    }
    if (candidate!==aimed) {
      aimed=candidate;
      object.textContent=candidate||'';
      object.classList.toggle('visible',!!candidate);
    }
  }
  function tick(now) {
    const dt=time ? clamp((now-time)*.001,0,.045):0;
    time=now;
    if (renderer) {
      if (active) move(dt);
      const p=camera.position;
      const changed=p[0]!==last.x||p[2]!==last.z||camera.yaw!==last.yaw||camera.pitch!==last.pitch;
      if (dirty || changed) {
        renderer.render(camera);
        last.x=p[0]; last.z=p[2]; last.yaw=camera.yaw; last.pitch=camera.pitch;
        dirty=false;
        showLocation();
        if (active) inspect();
      }
    }
    requestAnimationFrame(tick);
  }
  function boot() {
    try {
      scene=create();
      renderer=Ward.createRenderer(canvas,scene);
      dirty=true;
      enter.disabled=false;
      status.textContent='';
      return true;
    } catch (err) {
      console.error(err);
      enter.disabled=true;
      status.textContent='The scene needs a desktop browser with WebGL 2 enabled.';
      return false;
    }
  }
  if (boot()) requestAnimationFrame(tick);
})();


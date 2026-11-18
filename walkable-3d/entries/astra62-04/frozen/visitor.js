"use strict";
(()=>{
  const $=id=>document.getElementById(id),canvas=$('scene'),loading=$('loading'),status=$('load-text'),exhibit=$('exhibit'),enter=$('enter'),plan=$('plan'),planToggle=$('plan-toggle');
  let renderer=null,walk=null,dirty=true,locked=false,dragMode=false,drag=null,lastTime=0,raf=0,zone='';
  const keys=new Set(),coarse=matchMedia('(pointer:coarse)').matches;
  const inputKeys=new Set(['KeyW','KeyA','KeyS','KeyD','KeyC','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','ShiftLeft','ShiftRight']);
  function signal(text){$('notice').textContent=text;}
  function paintMap(){
    if(plan.hidden||!walk)return;
    const map=$('map'),g=map.getContext('2d'),s=19.15,cx=192,z0=209;
    const xp=x=>cx+x*s,zp=z=>z0+z*s;
    const path=(pts,close=false)=>{g.beginPath();pts.forEach(([x,z],i)=>i?g.lineTo(xp(x),zp(z)):g.moveTo(xp(x),zp(z)));if(close)g.closePath();};
    g.clearRect(0,0,map.width,map.height);g.fillStyle='#ececdd';g.fillRect(xp(-4.15),zp(-9.2),8.3*s,18.4*s);
    g.strokeStyle='#788978';g.lineWidth=2.5;path([[-1.24,9.2],[-4.15,9.2],[-4.15,-9.2],[4.15,-9.2],[4.15,9.2],[1.24,9.2]]);g.stroke();
    g.strokeStyle='#b1b8a3';g.lineWidth=1;path([[-2.38,9.2],[-2.38,12.02],[2.38,12.02],[2.38,9.2]]);g.stroke();
    for(let i=0;i<=8;i++){const z=-9.2+i*2.30;for(const side of [-1,1]){g.fillStyle='#788978';g.fillRect(xp(4.15*side)-3.8,zp(z)-2.3,7.6,4.6);}}
    path([[.98,6.56],[1.38,6.11],[1.38,-6.09],[.94,-6.55],[-.94,-6.55],[-1.38,-6.09],[-1.38,6.11],[-.98,6.56]],true);
    g.fillStyle='#bdc6a6';g.fill();g.strokeStyle='#819171';g.lineWidth=1.7;g.stroke();
    g.save();g.clip();g.strokeStyle='#a2b18e';g.lineWidth=1;
    for(let z=-7;z<7;z+=.36){path([[-1.9,z-.42],[1.8,z+.41]]);g.stroke();}
    g.restore();
    g.fillStyle='#aaa58c';g.fillRect(xp(-2.16),zp(-9.10),4.04*s,.87*s);
    g.fillStyle='#546b58';g.textAlign='center';g.font='italic 15px Georgia,serif';g.fillText('Potting bay',cx,zp(-9.24)-13);
    g.fillText('Threshold',cx,zp(12.01)+23);
    g.save();g.translate(xp(5.22),zp(.15));g.rotate(-Math.PI/2);g.fillStyle='#778570';g.font='13px Georgia,serif';g.fillText('East aisle',0,0);g.restore();
    g.save();g.translate(xp(-5.06),zp(.15));g.rotate(-Math.PI/2);g.fillStyle='#778570';g.font='13px Georgia,serif';g.fillText('West aisle',0,0);g.restore();
    const p=walk.state;g.save();g.translate(xp(p.x),zp(p.z));g.rotate(p.yaw);
    g.fillStyle='#b4744555';g.beginPath();g.moveTo(0,0);g.arc(0,0,19,-Math.PI/2-.58,-Math.PI/2+.58);g.closePath();g.fill();
    g.beginPath();g.arc(0,0,4.9,0,Math.PI*2);g.fillStyle='#a55c35';g.fill();g.lineWidth=1.7;g.strokeStyle='#fff8df';g.stroke();g.restore();
  }
  function togglePlan(open=plan.hidden){
    plan.hidden=!open;planToggle.setAttribute('aria-expanded',String(open));
    if(open)paintMap();
  }
  function draw(){
    if(!walk||!renderer)return;
    const p=walk.state;renderer.draw([p.x,p.y,p.z],p.yaw,p.pitch);
    const next=walk.location();if(next!==zone){zone=next;$('location').textContent=zone;$('map-location').textContent=zone;}
    paintMap();dirty=false;
  }
  function tick(t){
    raf=0;if(document.hidden)return;
    const dt=lastTime===0?0:(t-lastTime)/1000;lastTime=t;
    if(walk&&walk.step(keys,dt))dirty=true;
    if(dirty)draw();
    if(keys.size>0||walk&&Math.abs(walk.state.y-(keys.has('KeyC')?.83:1.61))>.0001)schedule();
    else lastTime=0;
  }
  function schedule(){if(!raf&&!document.hidden)raf=requestAnimationFrame(tick);}
  function invalidate(){dirty=true;schedule();}
  function reset(){
    if(!walk)return;
    keys.clear();walk.reset();lastTime=0;invalidate();signal('Returned to the threshold.');
  }
  function controls(){
    exhibit.classList.toggle('locked',locked);exhibit.classList.toggle('engaged',locked||dragMode);
    $('look-text').textContent=dragMode||coarse?'Drag to look':'Look';
  }
  function fallback(){
    if(locked)return;
    dragMode=true;controls();canvas.focus({preventScroll:true});signal('Drag on the scene to look. Use W A S D to walk and Escape to release.');
  }
  function engage(){
    if(!walk)return;canvas.focus({preventScroll:true});
    if(locked||dragMode)return;
    if(coarse||typeof canvas.requestPointerLock!=='function'){fallback();return;}
    try{
      const request=canvas.requestPointerLock();
      if(request&&typeof request.catch==='function')request.catch(fallback);
    }catch{fallback();}
  }
  document.addEventListener('pointerlockchange',()=>{
    const was=locked;locked=document.pointerLockElement===canvas;
    if(locked){dragMode=false;drag=null;signal('Mouse look active. Escape releases the pointer.');}
    else if(was){keys.clear();dragMode=false;signal('Pointer released.');}
    controls();invalidate();
  });
  document.addEventListener('pointerlockerror',fallback);
  document.addEventListener('mousemove',e=>{
    if(locked&&walk){walk.rotate(e.movementX*.0020,-e.movementY*.0020);invalidate();}
  });
  canvas.addEventListener('pointerdown',e=>{
    if(!walk||e.button!==0||locked)return;
    canvas.focus({preventScroll:true});
    if(!dragMode&&!coarse)engage();else if(coarse&&!dragMode)fallback();
    drag={id:e.pointerId,x:e.clientX,y:e.clientY};
    try{canvas.setPointerCapture(e.pointerId);}catch{}
    e.preventDefault();
  });
  canvas.addEventListener('pointermove',e=>{
    if(!walk||locked||!drag||e.pointerId!==drag.id)return;
    const scale=e.pointerType==='touch'?.0040:.0030;
    walk.rotate((e.clientX-drag.x)*scale,-(e.clientY-drag.y)*scale);
    drag.x=e.clientX;drag.y=e.clientY;invalidate();
  });
  function endDrag(e){if(drag&&drag.id===e.pointerId)drag=null;}
  canvas.addEventListener('pointerup',endDrag);canvas.addEventListener('pointercancel',endDrag);
  enter.addEventListener('click',engage);$('reset').addEventListener('click',reset);
  planToggle.addEventListener('click',()=>togglePlan());$('close-plan').addEventListener('click',()=>togglePlan(false));
  document.addEventListener('keydown',e=>{
    if(!walk||e.metaKey||e.ctrlKey||e.altKey)return;
    if(inputKeys.has(e.code)){e.preventDefault();keys.add(e.code);schedule();return;}
    if(e.repeat)return;
    if(e.code==='KeyR'){e.preventDefault();reset();}
    else if(e.code==='KeyM'){e.preventDefault();togglePlan();}
    else if(e.code==='Escape'){keys.clear();dragMode=false;drag=null;togglePlan(false);controls();schedule();}
  });
  document.addEventListener('keyup',e=>{if(keys.delete(e.code))schedule();});
  for(const button of document.querySelectorAll('#touch-pad button')){
    button.addEventListener('pointerdown',e=>{e.preventDefault();button.setPointerCapture(e.pointerId);keys.add(button.dataset.key);schedule();});
    for(const evt of ['pointerup','pointercancel','lostpointercapture'])button.addEventListener(evt,()=>{keys.delete(button.dataset.key);schedule();});
  }
  window.addEventListener('blur',()=>{keys.clear();drag=null;lastTime=0;schedule();});
  document.addEventListener('visibilitychange',()=>{keys.clear();lastTime=0;if(!document.hidden)invalidate();});
  window.addEventListener('resize',invalidate);
  new ResizeObserver(invalidate).observe(canvas);
  canvas.addEventListener('webglcontextlost',e=>{
    e.preventDefault();renderer=null;keys.clear();loading.hidden=false;status.textContent='Graphics paused. Waiting for the display to recover…';
  });
  canvas.addEventListener('webglcontextrestored',()=>location.reload());
  async function open(){
    try{
      renderer=await HouseRenderer.create(canvas,t=>status.textContent=t);walk=HouseWalk.create(renderer.obstacles);
      draw();loading.hidden=true;enter.disabled=false;controls();
      signal('Greenhouse ready. Select Explore or use W A S D and the arrow keys.');
    }catch(error){
      loading.classList.add('failed');status.textContent=location.protocol==='file:'?'Launch the local server from the entry folder, then open the localhost address in the readme.':('The greenhouse could not open. '+(error.message||String(error)));
      console.error(error);
    }
  }
  open();
})();
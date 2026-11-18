"use strict";
const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
const START_POSE={x:.34,y:1.605,z:8.54,yaw:-.045,pitch:-.035};
const BODY_RADIUS=.215,EYE=START_POSE.y;
function resolveBody(x,z,obstacles){
  for(let iteration=0;iteration<4;iteration++){
    let touched=false;
    for(const b of obstacles){
      if(b.base>1.73||b.top<.12)continue;
      const dx=x-b.x,dz=z-b.z;
      const lx=dx*b.ax+dz*b.az,lz=-dx*b.az+dz*b.ax;
      if(Math.abs(lx)>b.hx+BODY_RADIUS||Math.abs(lz)>b.hz+BODY_RADIUS)continue;
      const ex=lx-clamp(lx,-b.hx,b.hx),ez=lz-clamp(lz,-b.hz,b.hz),ds=ex*ex+ez*ez;
      if(ds>=BODY_RADIUS*BODY_RADIUS)continue;
      let px=0,pz=0;
      if(ds>1e-12){const d=Math.sqrt(ds),push=(BODY_RADIUS-d+.00012)/d;px=ex*push;pz=ez*push;}
      else if(b.hx-Math.abs(lx)<b.hz-Math.abs(lz))px=(lx<0?-1:1)*(b.hx-Math.abs(lx)+BODY_RADIUS+.00012);
      else pz=(lz<0?-1:1)*(b.hz-Math.abs(lz)+BODY_RADIUS+.00012);
      x+=b.ax*px-b.az*pz;z+=b.az*px+b.ax*pz;touched=true;
    }
    if(!touched)break;
  }return [x,z];
}
function moveBody(cam,dx,dz,world){
  const n=Math.max(1,Math.ceil(Math.hypot(dx,dz)/.082)),c=world.court;
  for(let i=0;i<n;i++){
    const [x,z]=resolveBody(cam.x+dx/n,cam.z+dz/n,world.colliders);
    cam.x=clamp(x,c.left+BODY_RADIUS,c.right-BODY_RADIUS);
    cam.z=clamp(z,c.endZ+BODY_RADIUS,10.73-BODY_RADIUS);
  }
}
function locationTitle(cam,world){
  if(cam.z<world.court.turnZ+.035)return "Yoi · Tea room";
  if(cam.z<world.court.back+.20)return "Covered passage";
  if(cam.z>7.0)return "Courtyard entrance";
  let label="Market courtyard",nearest=2.73**2;
  for(const [name,x,z] of world.places){const d=(cam.x-x)**2+(cam.z-z)**2;if(d<nearest){label=name;nearest=d;}}
  return label;
}
function boot(){
  const $=id=>document.getElementById(id),canvas=$("view"),welcome=$("welcome"),enter=$("enter"),intro=$("intro"),arrive=$("arrive"),status=$("where"),guide=$("guide"),help=$("help"),reset=$("reset");
  const coarse=window.matchMedia("(pointer: coarse)").matches;
  const cam={...START_POSE},keys=new Set(),stick={x:0,y:0};
  let world=null,mesh=null,art=null,gl=null,draw=null,lost=false,active=false,drag=null,stickId=null,raf=0;
  let last=0,lastDraw=0,dxSpeed=0,dzSpeed=0,dirty=true,lockTime=0;
  function setGuide(v){guide.hidden=!v;help.setAttribute("aria-expanded",String(v));if(v)welcome.hidden=true;else if(!active)welcome.hidden=false;}
  function resetPose(){Object.assign(cam,START_POSE);dxSpeed=dzSpeed=0;keys.clear();stick.x=stick.y=0;$("stick").style.transform="";dirty=true;displayLocation();}
  function displayLocation(){if(world){const t=locationTitle(cam,world);if(t!==status.textContent)status.textContent=t;}}
  function startWalk(){if(!draw||lost)return;active=true;document.body.classList.add("exploring");welcome.hidden=true;status.hidden=false;guide.hidden=true;help.setAttribute("aria-expanded","false");canvas.focus({preventScroll:true});dirty=true;}
  function capture(){
    if(coarse||!canvas.requestPointerLock||document.pointerLockElement===canvas)return;
    if(performance.now()-lockTime<260)return;
    lockTime=performance.now();
    try{const pending=canvas.requestPointerLock();if(pending&&typeof pending.catch==="function")pending.catch(()=>{});}catch(e){/* Drag and keyboard look stay available. */}
  }
  function look(x,y,sensitivity=.00205){
    cam.yaw+=x*sensitivity;cam.pitch=clamp(cam.pitch-y*sensitivity,-1.40,1.43);dirty=true;
  }
  enter.addEventListener("click",()=>{startWalk();capture();});
  help.addEventListener("click",()=>setGuide(guide.hidden));
  reset.addEventListener("click",()=>{resetPose();if(active)canvas.focus({preventScroll:true});});
  document.addEventListener("pointerlockchange",()=>{
    if(document.pointerLockElement===canvas){drag=null;startWalk();}
    else{keys.clear();dxSpeed=dzSpeed=0;dirty=true;}
  });
  document.addEventListener("mousemove",e=>{if(document.pointerLockElement===canvas&&draw&&!lost)look(e.movementX,e.movementY);});
  canvas.addEventListener("pointerdown",e=>{
    if(e.button!==0||lost||!draw||document.pointerLockElement===canvas)return;
    startWalk();drag={id:e.pointerId,x:e.clientX,y:e.clientY,total:0};
    try{canvas.setPointerCapture(e.pointerId);}catch(err){}
    e.preventDefault();
  });
  canvas.addEventListener("pointermove",e=>{
    if(!drag||drag.id!==e.pointerId||document.pointerLockElement===canvas)return;
    const x=e.clientX-drag.x,y=e.clientY-drag.y;drag.x=e.clientX;drag.y=e.clientY;drag.total+=Math.abs(x)+Math.abs(y);look(x,y,e.pointerType==="touch"?.004:.0033);
  });
  function endDrag(e){
    if(!drag||drag.id!==e.pointerId)return;const click=drag.total<4&&e.type==="pointerup"&&e.pointerType==="mouse";
    drag=null;if(canvas.hasPointerCapture(e.pointerId))canvas.releasePointerCapture(e.pointerId);if(click)capture();
  }
  canvas.addEventListener("pointerup",endDrag);canvas.addEventListener("pointercancel",endDrag);canvas.addEventListener("lostpointercapture",e=>{if(drag&&drag.id===e.pointerId)drag=null;});
  const pad=$("touchpad"),knob=$("stick");
  function padMove(e){
    const b=pad.getBoundingClientRect();let x=(e.clientX-b.left-b.width*.5)/31,y=(e.clientY-b.top-b.height*.5)/31;
    const m=Math.max(1,Math.hypot(x,y));stick.x=x/m;stick.y=y/m;knob.style.transform="translate("+stick.x*28+"px,"+stick.y*28+"px)";
  }
  pad.addEventListener("pointerdown",e=>{stickId=e.pointerId;pad.setPointerCapture(e.pointerId);padMove(e);e.preventDefault();});
  pad.addEventListener("pointermove",e=>{if(e.pointerId===stickId)padMove(e);});
  function stopPad(e){if(e.pointerId===stickId){stickId=null;stick.x=stick.y=0;knob.style.transform="";}}
  pad.addEventListener("pointerup",stopPad);pad.addEventListener("pointercancel",stopPad);pad.addEventListener("lostpointercapture",stopPad);
  const motionKeys=new Set(["KeyW","KeyA","KeyS","KeyD","ArrowUp","ArrowDown","ArrowLeft","ArrowRight","ShiftLeft","ShiftRight"]);
  document.addEventListener("keydown",e=>{
    if(!draw||lost||e.altKey||e.metaKey||e.ctrlKey)return;
    if(e.code==="KeyH"&&!e.repeat){e.preventDefault();setGuide(guide.hidden);return;}
    if(e.code==="KeyR"&&!e.repeat){e.preventDefault();resetPose();return;}
    if(motionKeys.has(e.code)){e.preventDefault();if(!active)startWalk();keys.add(e.code);}
  });
  document.addEventListener("keyup",e=>keys.delete(e.code));
  function clearInput(){keys.clear();dxSpeed=dzSpeed=0;drag=null;stick.x=stick.y=0;knob.style.transform="";last=0;}
  window.addEventListener("blur",clearInput);
  document.addEventListener("visibilitychange",()=>{
    if(document.hidden){clearInput();cancelAnimationFrame(raf);raf=0;}else if(draw&&!lost&&!raf){dirty=true;raf=requestAnimationFrame(frame);}
  });
  window.addEventListener("resize",()=>{dirty=true;});
  function frame(now){
    raf=0;if(document.hidden||lost||!draw)return;
    const dt=last?Math.min(.07,(now-last)/1000):.016;last=now;
    const down=key=>keys.has(key)?1:0;
    let right=down("KeyD")-down("KeyA")+stick.x,fwd=down("KeyW")+down("ArrowUp")-down("KeyS")-down("ArrowDown")-stick.y;
    const turn=down("ArrowRight")-down("ArrowLeft");
    if(turn){cam.yaw+=turn*dt*1.62;dirty=true;}
    const len=Math.max(1,Math.hypot(right,fwd));fwd/=len;right/=len;
    const speed=(down("ShiftLeft")||down("ShiftRight"))?2.97:1.91;
    const sx=Math.sin(cam.yaw),cx=Math.cos(cam.yaw),tx=(right*cx+fwd*sx)*speed,tz=(right*sx-fwd*cx)*speed;
    const gain=1-Math.exp(-dt*(fwd||right?19:26));dxSpeed+=(tx-dxSpeed)*gain;dzSpeed+=(tz-dzSpeed)*gain;
    if(Math.abs(dxSpeed)+Math.abs(dzSpeed)>.003){moveBody(cam,dxSpeed*dt,dzSpeed*dt,world);displayLocation();dirty=true;}else{dxSpeed=0;dzSpeed=0;}
    if(active||dirty||now-lastDraw>=32){draw(cam,now*.001);lastDraw=now;dirty=false;}
    raf=requestAnimationFrame(frame);
  }
  function showProblem(title,detail){welcome.hidden=false;guide.hidden=true;arrive.textContent=title;intro.textContent=detail;enter.hidden=true;status.hidden=true;}
  function buildGraphics(){draw=makeRenderer(gl,canvas,mesh,art);}
  function ready(){
    arrive.textContent="Rain Court";intro.textContent=coarse?"Drag to look. Use the thumbstick to walk.":"WASD to walk · Mouse or drag to look";
    enter.hidden=false;welcome.hidden=active;status.hidden=!active;help.disabled=reset.disabled=false;
    dirty=true;last=0;if(!document.hidden&&!raf)raf=requestAnimationFrame(frame);
  }
  canvas.addEventListener("webglcontextlost",e=>{e.preventDefault();lost=true;draw=null;cancelAnimationFrame(raf);raf=0;clearInput();showProblem("Graphics paused","Restoring the courtyard when the graphics context returns…");});
  canvas.addEventListener("webglcontextrestored",()=>{if(!mesh)return;try{lost=false;buildGraphics();ready();}catch(e){showProblem("Unable to restore the courtyard",e.message);}});
  async function init(){
    reset.disabled=help.disabled=true;
    if(location.protocol==="file:"){showProblem("Open the local launch address","Serve this folder with the command in README.txt, then open the suggested localhost address.");return;}
    gl=canvas.getContext("webgl2",{alpha:false,antialias:true,depth:true,stencil:false,premultipliedAlpha:false,preserveDrawingBuffer:false,powerPreference:"high-performance"});
    if(!gl){showProblem("WebGL 2 is required","Enable hardware acceleration in a WebGL 2 browser and reload the courtyard.");return;}
    art=new Image();art.src="market-atlas.png";
    const [buffer]=await Promise.all([fetch("courtyard.mesh").then(r=>{if(!r.ok)throw Error("Could not load courtyard.mesh ("+r.status+").");return r.arrayBuffer();}),art.decode()]);
    mesh=parseWorld(buffer);world=mesh.meta;intro.textContent="Hanging the lanterns…";
    await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
    if(lost)return;buildGraphics();ready();
  }
  init().catch(e=>showProblem("Unable to open the courtyard",e.message));
}
boot();
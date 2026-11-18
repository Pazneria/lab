"use strict";
const START={x:1.02,z:8.69,yaw:-.485,pitch:-.116},PLAYER_RADIUS=.235,EYE_HEIGHT=1.64;
function walkable(x,z,r=PLAYER_RADIUS){
 if(!Number.isFinite(x+z)||z>9.282-r||z< -19.965+r)return false;
 const portal=(center,half)=>Math.abs(x-center)<half-r;
 if(z>2.76-.26-r && z<2.77+.22+r && !portal(.56,.864))return false;
 if(z> -5.51-.27-r && z< -5.19+.23+r && !portal(.56,.988))return false;
 if(z>=2.70){if(x< -3.459+r||x>3.459-r)return false;}
 else if(z>=-5.34){if(x< -1.687+r||x>2.827-r)return false;}
 else if(x< -8.384+r||x>8.384-r)return false;
 for(const o of obstacles){
  const dx=x-o.x,dz=z-o.z,lx=o.c*dx-o.s*dz,lz=o.s*dx+o.c*dz;
  const ax=Math.max(0,Math.abs(lx)-o.hx),az=Math.max(0,Math.abs(lz)-o.hz);
  if(ax*ax+az*az<r*r)return false;
 }
 return true;
}
function slide(body,dx,dz){
 const steps=Math.max(1,Math.ceil(Math.max(Math.abs(dx),Math.abs(dz))/.075));
 for(let j=0;j<steps;j++){const x=body.x+dx/steps,z=body.z+dz/steps;
  if(walkable(x,body.z))body.x=x;if(walkable(body.x,z))body.z=z;
 }
}
function buildScene(){
 bedroomShell();passageShell();roostShell();bedroomObjects();passageGear();roostObjects();finalDetails();heatingDucts();
}
async function readPackedScene(){
 if(typeof BAKED_SCENE==="undefined"||typeof DecompressionStream==="undefined")return null;
 const data=BAKED_SCENE,bin=atob(data.blob),zip=new Uint8Array(bin.length);
 for(let i=0;i<zip.length;i++)zip[i]=bin.charCodeAt(i);
 const bytes=await new Response(new Blob([zip]).stream().pipeThrough(new DecompressionStream("gzip"))).arrayBuffer();
 if(bytes.byteLength!==data.bytes)throw Error("Incomplete local mesh packet.");
 const offset=data.vertexCount*data.stride;
 return {v:new Uint8Array(bytes,0,offset),i:new Uint32Array(bytes,offset,data.indexCount),ranges:data.ranges};
}
async function enterWorld(){
 const canvas=document.getElementById("world"),welcome=document.getElementById("welcome"),enter=document.getElementById("enter"),help=document.getElementById("help"),toast=document.getElementById("toast"),error=document.getElementById("error"),reset=document.getElementById("reset"),intro=document.getElementById("intro"),zone=document.getElementById("zone"),zoneName=document.getElementById("zoneName"),aim=document.getElementById("aim");
 const player={...START},keys=new Set();let active=false,ready=false,held=false,hadLock=false,needsDraw=true,zoneId="",vx=0,vz=0,toastUntil=0,px=0,py=0;
 enter.disabled=true;enter.textContent="Preparing quarters…";
 function announce(s,ms=3200){toast.textContent=s;toast.classList.add("on");toastUntil=performance.now()+ms;}
 function identify(){
  const room=player.z>2.72?"Keeper’s quarters":player.z> -5.34?"Service passage":"Mallow’s roost";
  if(zoneId!==room){zoneId=room;zoneName.textContent=room;}
 }
 function returnHome(){Object.assign(player,START);vx=vz=0;keys.clear();needsDraw=true;identify();announce("Returned to the entrance");}
 function showMenu(){
  active=false;held=false;vx=vz=0;keys.clear();welcome.hidden=false;help.hidden=true;zone.hidden=true;aim.hidden=true;reset.hidden=false;
  document.getElementById("more-controls").hidden=false;
  intro.textContent=zoneId||"The dragon keeper’s quarters";enter.innerHTML='Resume exploring <span aria-hidden="true">↗</span>';
  if(document.pointerLockElement===canvas)document.exitPointerLock();
 }
 function look(dx,dy){player.yaw+=dx*.00208;player.pitch=clamp(player.pitch-dy*.00208,-1.43,1.43);needsDraw=true;}
 function start(){
  if(!ready||active)return;
  active=true;welcome.hidden=true;help.hidden=false;zone.hidden=false;aim.hidden=false;keys.clear();canvas.focus({preventScroll:true});
  identify();needsDraw=true;
  if(canvas.requestPointerLock){try{const p=canvas.requestPointerLock();if(p&&p.catch)p.catch(()=>{if(active)announce("Drag to look · Arrow keys also turn");});}catch{announce("Drag to look · Arrow keys also turn");}}
  else announce("Drag to look · Arrow keys also turn");
 }
 document.addEventListener("pointerlockchange",()=>{
  if(document.pointerLockElement===canvas){hadLock=true;held=false;}
  else if(hadLock){hadLock=false;if(active)showMenu();}
 });
 document.addEventListener("pointerlockerror",()=>{if(active)announce("Drag to look · Arrow keys also turn");});
 document.addEventListener("mousemove",e=>{
  if(!active)return;
  if(document.pointerLockElement===canvas)look(e.movementX,e.movementY);
  else if(held){look(e.clientX-px,e.clientY-py);px=e.clientX;py=e.clientY;}
 });
 canvas.addEventListener("pointerdown",e=>{
  if(e.button!==0)return;if(!active){start();return;}
  if(document.pointerLockElement!==canvas){held=true;px=e.clientX;py=e.clientY;canvas.setPointerCapture?.(e.pointerId);}
 });
 for(const t of ["pointerup","pointercancel","lostpointercapture"])canvas.addEventListener(t,()=>{held=false;});
 window.addEventListener("blur",()=>{keys.clear();vx=vz=0;held=false;});
 document.addEventListener("visibilitychange",()=>{if(document.hidden&&active)showMenu();});
 const controls=new Set(["KeyW","KeyA","KeyS","KeyD","ArrowUp","ArrowDown","ArrowLeft","ArrowRight","PageUp","PageDown","ShiftLeft","ShiftRight","KeyR","KeyH","Escape"]);
 window.addEventListener("keydown",e=>{
  if(!ready||e.altKey||e.metaKey||e.ctrlKey)return;
  if(e.code==="Enter"&&!active&&e.target!==reset){e.preventDefault();start();return;}
  if(!controls.has(e.code))return;e.preventDefault();
  if(e.code==="KeyR"&&!e.repeat){returnHome();return;}
  if(e.code==="KeyH"&&!e.repeat){if(active)showMenu();else start();return;}
  if(e.code==="Escape"){if(active)showMenu();return;}
  if(active)keys.add(e.code);
 });
 window.addEventListener("keyup",e=>keys.delete(e.code));
 enter.addEventListener("click",start);help.addEventListener("click",showMenu);reset.addEventListener("click",returnHome);
 window.addEventListener("resize",()=>{needsDraw=true;});
 canvas.addEventListener("webglcontextlost",e=>{e.preventDefault();ready=false;showMenu();error.hidden=false;error.textContent="The graphics context was interrupted. Reload this page to return to the entrance.";});
 try{
  const gl=canvas.getContext("webgl2",{alpha:false,antialias:true,depth:true,stencil:false,preserveDrawingBuffer:false,powerPreference:"high-performance"});
  if(!gl)throw Error("This scene needs WebGL 2. Enable hardware acceleration in a desktop browser and reload the page.");
  const [texture,packed]=await Promise.all([materialAtlas(gl),readPackedScene().catch(()=>null)]);
  if(packed){obstacles.push(...BAKED_SCENE.obstacles);lightSources.length=0;lightSources.push(...BAKED_SCENE.lights);}
  else buildScene();
  const draw=renderer(canvas,gl,[...groupsByName.values()],texture,packed);groupsByName.clear();
  function render(){const cp=Math.cos(player.pitch);draw([player.x,EYE_HEIGHT,player.z],[Math.sin(player.yaw)*cp,Math.sin(player.pitch),-Math.cos(player.yaw)*cp]);}
  identify();render();ready=true;enter.disabled=false;enter.innerHTML='Enter quarters <span aria-hidden="true">↗</span>';
  let prev=performance.now();
  function frameTick(now){
   const dt=Math.min(.05,Math.max(0,(now-prev)*.001));prev=now;
   if(active&&ready){
    const amount=(key)=>keys.has(key)?1:0;
    const turn=amount("ArrowRight")-amount("ArrowLeft"),tilt=amount("PageUp")-amount("PageDown");
    player.yaw+=turn*1.55*dt;player.pitch=clamp(player.pitch+tilt*1.2*dt,-1.43,1.43);
    const f=Math.max(amount("KeyW"),amount("ArrowUp"))-Math.max(amount("KeyS"),amount("ArrowDown")),s=amount("KeyD")-amount("KeyA");
    const l=Math.max(1,Math.hypot(f,s)),speed=keys.has("ShiftLeft")||keys.has("ShiftRight")?3.48:2.20;
    const tx=(Math.sin(player.yaw)*f+Math.cos(player.yaw)*s)*speed/l,tz=(-Math.cos(player.yaw)*f+Math.sin(player.yaw)*s)*speed/l;
    const k=1-Math.exp(-dt*(f||s?19:27));vx+=(tx-vx)*k;vz+=(tz-vz)*k;
    if(Math.abs(vx)+Math.abs(vz)>.002){slide(player,vx*dt,vz*dt);needsDraw=true;}
    if(turn||tilt)needsDraw=true;identify();
   }
   if(ready&&needsDraw&&!document.hidden){render();needsDraw=false;}
   if(toastUntil&&now>toastUntil){toast.classList.remove("on");toastUntil=0;}
   requestAnimationFrame(frameTick);
  }
  requestAnimationFrame(frameTick);
 }catch(e){console.error(e);welcome.hidden=true;error.hidden=false;error.textContent="Ashwick Roost could not open. "+e.message;}
}
if(typeof document!=="undefined")enterWorld();


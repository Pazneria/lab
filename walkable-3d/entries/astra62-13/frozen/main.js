'use strict';
(async function openStation(){
 const canvas=document.getElementById('view'),status=document.getElementById('status'),enter=document.getElementById('enter'),reset=document.getElementById('reset'),hud=document.getElementById('hud');
 const gl=canvas.getContext('webgl2',{alpha:false,antialias:true,depth:true,stencil:false,preserveDrawingBuffer:false,powerPreference:'high-performance'});
 const error=msg=>{status.hidden=false;status.textContent=msg};
 if(!gl){error('Nordgrat needs WebGL 2. Enable hardware acceleration and reopen the scene.');return}
 try{
 gl.pixelStorei(gl.UNPACK_COLORSPACE_CONVERSION_WEBGL,gl.NONE);
 const decode=src=>new Promise((resolve,reject)=>{const image=new Image();image.onload=()=>resolve(image);image.onerror=()=>reject(Error('A baked station texture could not be decoded.'));image.src='data:image/png;base64,'+src});
 const [images,weather]=await Promise.all([Promise.all(MATERIAL_PNG.map(decode)),decode(FLOOR_WEATHER_PNG)]);
 const atlas=Signs.build();
 Station.build();Machinery.build();Cabin.build();Landscape.build();
 const render=Graphics.renderer(gl,atlas,images,weather);
 const player={...Navigation.spawn},keys=new Set();
 let dragging=false,locked=false,vx=0,vz=0,previous=0,raf=0,needsDraw=true,rainTime=0,lastX=0,lastY=0,requested=false;
 function wake(){needsDraw=true;if(!raf&&!document.hidden)raf=requestAnimationFrame(frame)}
 function resize(){const w=canvas.clientWidth,h=canvas.clientHeight;const r=Math.min(window.devicePixelRatio||1,1.45,Math.sqrt(1920*1080/Math.max(1,w*h)));const width=Math.max(2,Math.round(w*r)),height=Math.max(2,Math.round(h*r));if(width!==canvas.width||height!==canvas.height){canvas.width=width;canvas.height=height}wake()}
 function frame(now){raf=0;if(document.hidden)return;const dt=previous?Math.min((now-previous)*.001,.075):0;previous=now;const has=k=>keys.has(k),turn=(has('ArrowRight')?1:0)-(has('ArrowLeft')?1:0);if(turn)player.yaw+=turn*dt*1.72;
 const look=(has('PageUp')?1:0)-(has('PageDown')?1:0);if(look)player.pitch=Math.max(-1.42,Math.min(1.42,player.pitch+look*dt*1.2));
 const fwd=(has('KeyW')||has('ArrowUp')?1:0)-(has('KeyS')||has('ArrowDown')?1:0),side=(has('KeyD')?1:0)-(has('KeyA')?1:0);const scale=(has('ShiftLeft')||has('ShiftRight')?3.3:2.15)/Math.max(1,Math.hypot(fwd,side));const sy=Math.sin(player.yaw),cy=Math.cos(player.yaw),tx=(fwd*sy+side*cy)*scale,tz=(-fwd*cy+side*sy)*scale;
 const k=1-Math.exp(-dt*(fwd||side?18:26));vx+=(tx-vx)*k;vz+=(tz-vz)*k;if(!fwd&&!side&&Math.abs(vx)+Math.abs(vz)<.008){vx=vz=0}
 if(vx||vz)Navigation.move(player,vx*dt,vz*dt);
 rainTime=(rainTime+dt)%4096;
 const cp=Math.cos(player.pitch);
 render([player.x,1.657,player.z],[sy*cp,Math.sin(player.pitch),-cy*cp],canvas.width,canvas.height,rainTime);
 if(needsDraw){status.hidden=true;needsDraw=false}
 if(locked||dragging||keys.size||vx||vz)raf=requestAnimationFrame(frame);else previous=0
 }
 function resetPosition(){Object.assign(player,Navigation.spawn);vx=vz=0;keys.clear();previous=0;wake()}
 function changeLook(dx,dy){if(!Number.isFinite(dx)||!Number.isFinite(dy))return;player.yaw+=Math.max(-350,Math.min(350,dx))*.00205;player.pitch=Math.max(-1.42,Math.min(1.42,player.pitch-Math.max(-300,Math.min(300,dy))*.00205));wake()}
 function fallback(){requested=false;enter.textContent='Mouse look';hud.querySelector('.keys').innerHTML='<b>Drag</b> look &nbsp; <b>WASD</b> walk &nbsp; <b>← →</b> turn &nbsp; <b>R</b> reset';canvas.focus({preventScroll:true});wake()}
 function engage(){canvas.focus({preventScroll:true});if(locked||requested)return;if(typeof canvas.requestPointerLock!=='function'){fallback();return}requested=true;try{const p=canvas.requestPointerLock();if(p&&p.catch)p.catch(fallback)}catch(e){fallback()}}
 document.addEventListener('pointerlockchange',()=>{locked=document.pointerLockElement===canvas;requested=false;dragging=false;keys.clear();vx=vz=0;document.body.classList.toggle('play',locked);enter.textContent=locked?'Exploring':'Resume';previous=0;wake()});
 document.addEventListener('pointerlockerror',fallback);
 document.addEventListener('mousemove',e=>{if(locked)changeLook(e.movementX,e.movementY)});
 canvas.addEventListener('pointerdown',e=>{if(e.button!==0)return;canvas.focus({preventScroll:true});if(!locked){dragging=true;lastX=e.clientX;lastY=e.clientY;try{canvas.setPointerCapture(e.pointerId)}catch(_){}if(e.pointerType==='mouse')engage();wake()}});
 canvas.addEventListener('pointermove',e=>{if(dragging&&!locked){changeLook(e.clientX-lastX,e.clientY-lastY);lastX=e.clientX;lastY=e.clientY}});
 const endDrag=()=>{dragging=false};canvas.addEventListener('pointerup',endDrag);canvas.addEventListener('pointercancel',endDrag);
 const accepted=new Set(['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','PageUp','PageDown','ShiftLeft','ShiftRight']);
 window.addEventListener('keydown',e=>{if(e.ctrlKey||e.metaKey||e.altKey)return;if(e.code==='KeyR'){e.preventDefault();resetPosition();return}if(accepted.has(e.code)){e.preventDefault();keys.add(e.code);wake()}});
 window.addEventListener('keyup',e=>{keys.delete(e.code);wake()});
 function clearInput(){keys.clear();vx=vz=0;dragging=false;previous=0}
 window.addEventListener('blur',clearInput);
 document.addEventListener('visibilitychange',()=>{clearInput();if(document.hidden){cancelAnimationFrame(raf);raf=0}else wake()});
 enter.addEventListener('click',engage);reset.addEventListener('click',resetPosition);
 window.addEventListener('resize',resize);canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();clearInput();cancelAnimationFrame(raf);raf=0;error('Graphics context interrupted. Restoring Nordgrat…')});canvas.addEventListener('webglcontextrestored',()=>location.reload());
 resize();
 }catch(e){console.error(e);error('Unable to open Nordgrat: '+(e.message||e))}
})();

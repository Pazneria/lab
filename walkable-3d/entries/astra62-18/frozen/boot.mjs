import {printedAtlas} from './printwork.js';
import {roomVertex,roomFragment,skyVertex,skyFragment,glassFragment} from './shaders.js';
import {prepareColliders,walk,cameraFrame,zone,frustumPlanes,inFrustum} from './walk.mjs';
const $=id=>document.getElementById(id),canvas=$('port');
const coarse=matchMedia('(pointer:coarse)').matches;
let gl,def,obstacles,resources,paused=false,started=false,drag=null,raf=0,lastTime=0,noticeTimer;
const state={x:0,y:1.62,z:0,yaw:0,pitch:0};
const keys=new Set(),touchKeys=new Set();
const controlKeys=new Set(['KeyW','KeyA','KeyS','KeyD','KeyR','KeyH','ShiftLeft','ShiftRight','ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Slash']);
function fail(message){$('loading').hidden=false;$('loadText').textContent=message;$('intro').hidden=true;$('tools').hidden=true;}
function notice(message){$('notice').textContent=message;$('notice').hidden=false;clearTimeout(noticeTimer);noticeTimer=setTimeout(()=>{$('notice').hidden=true;},2200);}
async function fetchOK(name){const response=await fetch('./'+name);if(!response.ok)throw Error('Could not load '+name+' ('+response.status+')');return response;}
function readImage(name){return new Promise((resolve,reject)=>{const im=new Image();im.onload=()=>resolve(im);im.onerror=()=>reject(Error('Could not load '+name));im.src='./'+name;});}
function shader(type,source){const sh=gl.createShader(type);gl.shaderSource(sh,source);gl.compileShader(sh);return sh;}
function program(vs,fs){
 const v=shader(gl.VERTEX_SHADER,vs),f=shader(gl.FRAGMENT_SHADER,fs),p=gl.createProgram();
 gl.attachShader(p,v);gl.attachShader(p,f);gl.linkProgram(p);
 if(!gl.getProgramParameter(p,gl.LINK_STATUS)){const e=gl.getProgramInfoLog(p)+' '+gl.getShaderInfoLog(v)+' '+gl.getShaderInfoLog(f);gl.deleteShader(v);gl.deleteShader(f);gl.deleteProgram(p);throw Error('Shader linking failed. '+e);}
 gl.deleteShader(v);gl.deleteShader(f);return p;
}
const uniforms=(p,names)=>Object.fromEntries(names.map(n=>[n,gl.getUniformLocation(p,n)]));
function loadResources(data,bytes,materials,stars,clouds){
 const room=program(roomVertex,roomFragment),sky=program(skyVertex,skyFragment),glass=program(roomVertex,glassFragment);
 const ru=uniforms(room,['camera','eye','prints','surfaces']),su=uniforms(sky,['forwardDir','rightDir','upDir','lens','firmament','atmosphere']),gu=uniforms(glass,['camera','eye']);
 gl.pixelStorei(gl.UNPACK_ALIGNMENT,1);
 gl.pixelStorei(gl.UNPACK_COLORSPACE_CONVERSION_WEBGL,gl.NONE);
 gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,false);
 const aniso=gl.getExtension('EXT_texture_filter_anisotropic');
 function params(target,repeat,quality){
  gl.texParameteri(target,gl.TEXTURE_MIN_FILTER,gl.LINEAR_MIPMAP_LINEAR);gl.texParameteri(target,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
  gl.texParameteri(target,gl.TEXTURE_WRAP_S,repeat?gl.REPEAT:gl.CLAMP_TO_EDGE);gl.texParameteri(target,gl.TEXTURE_WRAP_T,repeat?gl.REPEAT:gl.CLAMP_TO_EDGE);
  if(aniso&&quality)gl.texParameterf(target,aniso.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(4,gl.getParameter(aniso.MAX_TEXTURE_MAX_ANISOTROPY_EXT)));
  gl.generateMipmap(target);
 }
 function texture2D(unit,img,repeat,quality){
  gl.activeTexture(gl.TEXTURE0+unit);const t=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,t);
  gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA8,gl.RGBA,gl.UNSIGNED_BYTE,img);params(gl.TEXTURE_2D,repeat,quality);return t;
 }
 // Explicit slice upload works with image and canvas backends on integrated GPUs.
 const sw=materials.width,sh=materials.height,slices=sh/sw;
 if(slices!==12)throw Error('Invalid surface array dimensions');
 const tmp=document.createElement('canvas');tmp.width=sw;tmp.height=sh;const ctx=tmp.getContext('2d',{willReadFrequently:true});
 ctx.drawImage(materials,0,0);const pixels=ctx.getImageData(0,0,sw,sh).data;
 gl.activeTexture(gl.TEXTURE0);const arr=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D_ARRAY,arr);
 gl.texImage3D(gl.TEXTURE_2D_ARRAY,0,gl.RGBA8,sw,sw,slices,0,gl.RGBA,gl.UNSIGNED_BYTE,new Uint8Array(pixels.buffer));params(gl.TEXTURE_2D_ARRAY,true,true);
 tmp.width=tmp.height=1;
 const paper=printedAtlas();texture2D(1,paper,false,true);paper.width=paper.height=1;
 texture2D(2,stars,true,false);texture2D(3,clouds,true,false);
 gl.useProgram(room);gl.uniform1i(ru.surfaces,0);gl.uniform1i(ru.prints,1);gl.useProgram(sky);gl.uniform1i(su.firmament,2);gl.uniform1i(su.atmosphere,3);
 const vb=gl.createBuffer(),ib=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,vb);gl.bufferData(gl.ARRAY_BUFFER,new Uint8Array(bytes,0,data.vertexBytes),gl.STATIC_DRAW);
 gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,ib);gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint8Array(bytes,data.vertexBytes),gl.STATIC_DRAW);
 const groups=data.groups.map(desc=>{
  const vao=gl.createVertexArray();gl.bindVertexArray(vao);gl.bindBuffer(gl.ARRAY_BUFFER,vb);gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,ib);
  const attr=(i,size,type,normalized,offset)=>{gl.enableVertexAttribArray(i);gl.vertexAttribPointer(i,size,type,normalized,data.stride,desc.vo+offset);};
  attr(0,3,gl.SHORT,false,0);attr(1,2,gl.UNSIGNED_SHORT,false,6);attr(2,3,gl.BYTE,true,10);attr(3,1,gl.UNSIGNED_BYTE,false,13);
  attr(4,3,gl.UNSIGNED_BYTE,true,14);attr(5,3,gl.UNSIGNED_BYTE,true,17);attr(6,1,gl.UNSIGNED_BYTE,true,20);
  return {...desc,vao};
 });
 const skyVao=gl.createVertexArray();gl.bindVertexArray(null);
 gl.enable(gl.DEPTH_TEST);gl.disable(gl.CULL_FACE);gl.clearColor(.039,.070,.082,1);
 gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);
 return {room,sky,glass,ru,su,gu,opaque:groups.filter(g=>!g.glass&&!g.two),two:groups.filter(g=>g.two),windows:groups.filter(g=>g.glass),skyVao};
}
function reset(announce=true){
 if(!def)return;
 [state.x,state.y,state.z]=def.spawn;state.yaw=def.yaw;state.pitch=def.pitch;
 keys.clear();touchKeys.clear();lastTime=0;updateZone();if(announce)notice('Returned to the entrance');
}
function updateZone(){const next=zone(state.z);if($('zone').textContent!==next)$('zone').textContent=next;}
function begin(){
 if(!resources)return;
 started=true;$('intro').hidden=true;$('location').hidden=false;$('dpad').hidden=!coarse;
 $('help').hidden=true;$('helpButton').setAttribute('aria-expanded','false');
}
function lock(){
 begin();canvas.focus({preventScroll:true});
 if(coarse||document.pointerLockElement===canvas)return;
 try{const result=canvas.requestPointerLock?.();if(result?.catch)result.catch(()=>notice('Drag to look · WASD to move'));}catch{notice('Drag to look · WASD to move');}
}
function toggleHelp(show=$('help').hidden){
 if(!resources)return;$('help').hidden=!show;$('helpButton').setAttribute('aria-expanded',String(show));keys.clear();
 if(show&&document.pointerLockElement===canvas)document.exitPointerLock();
 if(!show)canvas.focus({preventScroll:true});
}
function look(dx,dy){state.yaw+=dx;state.pitch=Math.max(-1.43,Math.min(1.43,state.pitch+dy));}
function bindInput(){
 $('enter').addEventListener('click',lock);$('resume').addEventListener('click',lock);$('reset').addEventListener('click',()=>{reset();canvas.focus({preventScroll:true});});
 $('helpButton').addEventListener('click',()=>toggleHelp());
 canvas.addEventListener('pointerdown',e=>{
  if(e.button!==0&&e.pointerType!=='touch')return;
  begin();canvas.focus({preventScroll:true});drag={id:e.pointerId,x:e.clientX,y:e.clientY};
  if(e.pointerType==='touch'){canvas.setPointerCapture(e.pointerId);}
  else if(document.pointerLockElement!==canvas){lock();try{canvas.setPointerCapture(e.pointerId);}catch{}}
 });
 canvas.addEventListener('pointermove',e=>{
  if(document.pointerLockElement===canvas||!drag||e.pointerId!==drag.id)return;
  const dx=e.clientX-drag.x,dy=e.clientY-drag.y;drag.x=e.clientX;drag.y=e.clientY;
  look(dx*.0032,-dy*.0032);
 });
 const release=e=>{if(drag&&drag.id===e.pointerId)drag=null;};
 window.addEventListener('pointerup',release);window.addEventListener('pointercancel',release);
 document.addEventListener('mousemove',e=>{if(document.pointerLockElement===canvas)look(e.movementX*.00205,-e.movementY*.00205);});
 document.addEventListener('pointerlockchange',()=>{drag=null;keys.clear();if(document.pointerLockElement===canvas)begin();});
 document.addEventListener('pointerlockerror',()=>{if(started)notice('Drag to look · WASD to move');});
 window.addEventListener('keydown',e=>{
  if(e.altKey||e.metaKey||e.ctrlKey||!controlKeys.has(e.code)||!resources)return;
  e.preventDefault();
  if(e.code==='KeyR'){if(!e.repeat)reset();return;}
  if(e.code==='KeyH'||e.code==='Slash'){if(!e.repeat)toggleHelp();return;}
  if(!$('help').hidden)return;begin();keys.add(e.code);
 });
 window.addEventListener('keyup',e=>keys.delete(e.code));
 window.addEventListener('blur',()=>{keys.clear();touchKeys.clear();drag=null;});
 for(const b of $('dpad').querySelectorAll('button')){
  b.addEventListener('pointerdown',e=>{e.preventDefault();begin();touchKeys.add(b.dataset.key);b.setPointerCapture(e.pointerId);});
  const up=()=>touchKeys.delete(b.dataset.key);b.addEventListener('pointerup',up);b.addEventListener('lostpointercapture',up);b.addEventListener('pointercancel',up);
 }
}
let baseW=0,baseH=0,baseDPR=0;
function resize(){
 const w=canvas.clientWidth,h=canvas.clientHeight,dpr=window.devicePixelRatio||1;
 if(w===baseW&&h===baseH&&dpr===baseDPR)return;baseW=w;baseH=h;baseDPR=dpr;
 const scale=Math.min(dpr,1.45,Math.sqrt(2300000/Math.max(1,w*h)));
 canvas.width=Math.max(1,Math.floor(w*scale));canvas.height=Math.max(1,Math.floor(h*scale));gl.viewport(0,0,canvas.width,canvas.height);
}
function frame(time){
 if(paused||document.hidden||!resources){raf=0;return;}
 resize();
 const dt=lastTime?Math.min(.045,(time-lastTime)/1000):0;lastTime=time;
 const held=k=>keys.has(k)||touchKeys.has(k);
 const turn=Number(held('ArrowRight'))-Number(held('ArrowLeft')),nod=Number(held('ArrowUp'))-Number(held('ArrowDown'));
 if(turn||nod)look(turn*dt*1.55,nod*dt*1.31);
 const forward=Number(held('KeyW'))-Number(held('KeyS')),side=Number(held('KeyD'))-Number(held('KeyA'));
 if(forward||side){
  const speed=(held('ShiftLeft')||held('ShiftRight')?2.55:1.68)*dt/Math.hypot(forward,side);
  const sy=Math.sin(state.yaw),cy=Math.cos(state.yaw);
  walk(state,(sy*forward+cy*side)*speed,(-cy*forward+sy*side)*speed,obstacles,def.bounds);updateZone();
 }
 const cam=cameraFrame(state.x,state.y,state.z,state.yaw,state.pitch,canvas.width/canvas.height),planes=frustumPlanes(cam.vp);
 const {room,sky,glass,ru,su,gu,opaque,two,windows,skyVao}=resources;
 gl.depthMask(true);gl.depthFunc(gl.LESS);gl.disable(gl.BLEND);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
 gl.useProgram(room);gl.uniformMatrix4fv(ru.camera,false,cam.vp);gl.uniform3fv(ru.eye,cam.e);
 // Draw the nearest occupied regions first, so the depth buffer rejects hidden work.
 for(const g of opaque){const x=Math.max(g.lo[0]-state.x,0,state.x-g.hi[0]),z=Math.max(g.lo[2]-state.z,0,state.z-g.hi[2]);g.near=x*x+z*z;}
 opaque.sort((a,b)=>a.near-b.near);
 gl.enable(gl.CULL_FACE);gl.cullFace(gl.BACK);
 for(const g of opaque)if(inFrustum(g,planes)){gl.bindVertexArray(g.vao);gl.drawElements(gl.TRIANGLES,g.n,gl.UNSIGNED_SHORT,g.io);}
 gl.disable(gl.CULL_FACE);
 for(const g of two)if(inFrustum(g,planes)){gl.bindVertexArray(g.vao);gl.drawElements(gl.TRIANGLES,g.n,gl.UNSIGNED_SHORT,g.io);}
 // Sky shading is depth-tested after the opaque hull. Only open sky survives.
 gl.depthFunc(gl.LEQUAL);gl.depthMask(false);gl.useProgram(sky);gl.bindVertexArray(skyVao);
 gl.uniform3fv(su.forwardDir,cam.f);gl.uniform3fv(su.rightDir,cam.r);gl.uniform3fv(su.upDir,cam.u);gl.uniform2fv(su.lens,cam.lens);gl.drawArrays(gl.TRIANGLES,0,3);
 gl.useProgram(glass);gl.uniformMatrix4fv(gu.camera,false,cam.vp);gl.uniform3fv(gu.eye,cam.e);gl.enable(gl.BLEND);
 for(const g of windows)if(inFrustum(g,planes)){gl.bindVertexArray(g.vao);gl.drawElements(gl.TRIANGLES,g.n,gl.UNSIGNED_SHORT,g.io);}
 gl.disable(gl.BLEND);gl.depthMask(true);raf=requestAnimationFrame(frame);
}
async function init(){
 if(location.protocol==='file:'){fail('Serve this folder on localhost to explore the quarters. See README.txt.');return;}
 gl=canvas.getContext('webgl2',{alpha:false,depth:true,antialias:true,stencil:false,powerPreference:'high-performance',preserveDrawingBuffer:false});
 if(!gl){fail('WebGL 2 is unavailable. Enable browser graphics acceleration to enter the quarters.');return;}
 const letters=Promise.all(['14px Barlow','14px Baskervville','14px "IBM Plex Mono"'].map(font=>document.fonts.load(font))).catch(()=>{});
 const data=await Promise.all([fetchOK('cabin.json').then(r=>r.json()),fetchOK('cabin.bin').then(r=>r.arrayBuffer()),readImage('surfaces.png'),readImage('firmament.png'),readImage('atmosphere.png')]);
 await letters;
 def=data[0];obstacles=prepareColliders(def);resources=loadResources(...data);reset(false);bindInput();
 $('loading').hidden=true;$('intro').hidden=false;$('tools').hidden=false;canvas.classList.add('ready');
 document.addEventListener('visibilitychange',()=>{keys.clear();touchKeys.clear();lastTime=0;if(!document.hidden&&!paused&&!raf)raf=requestAnimationFrame(frame);});
 canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();paused=true;cancelAnimationFrame(raf);raf=0;fail('Graphics connection interrupted. Waiting for the browser…');});
 canvas.addEventListener('webglcontextrestored',()=>location.reload());
 raf=requestAnimationFrame(frame);
}
init().catch(err=>{console.error(err);fail('Unable to open the quarters. '+err.message);});

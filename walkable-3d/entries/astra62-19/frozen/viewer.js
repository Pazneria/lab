'use strict';
(()=>{
 const canvas=document.getElementById('view'),guide=document.getElementById('guide'),notice=document.getElementById('notice');
 const entry=document.getElementById('enter'),nameLabel=document.getElementById('room-name'),title=guide.querySelector('h1');
 const W=globalThis.HabitatWalk,keys=new Set(),camera={x:.78,y:1.61,z:4.43,yaw:-.26,pitch:-.06};
 const names={living:'Living quarters',work:'Sample lab',observation:'Observation room'};
 const gl=canvas.getContext('webgl2',{alpha:false,antialias:true,depth:true,stencil:false,preserveDrawingBuffer:false,powerPreference:'high-performance'});
 let assets,program,vao,uniforms,obstacles=[],draws={},frame=0,previous=0,sceneTime=0;
 let active=false,drag=false,ready=false,lookX=0,lookY=0,walkX=0,walkZ=0,roomName='',resizePending=true;
 const viewProjection=new Float32Array(16);
 const frustum=Array.from({length:6},()=>new Float32Array(4));
 const clamp=(x,lo,hi)=>Math.min(hi,Math.max(lo,x));
 const full=[-1,-1,1,1];
 const rectUnion=(a,b)=>!a?b:!b?a:[Math.min(a[0],b[0]),Math.min(a[1],b[1]),Math.max(a[2],b[2]),Math.max(a[3],b[3])];
 function intersect(a,b){if(!a||!b)return null;const r=[Math.max(a[0],b[0]),Math.max(a[1],b[1]),Math.min(a[2],b[2]),Math.min(a[3],b[3])];return r[0]<r[2]&&r[1]<r[3]?r:null;}
 function message(s){notice.textContent=s;notice.hidden=!s;}
 function setGuide(open){
  guide.hidden=!open;document.body.classList.toggle('exploring',!open);title.textContent=names[W.room(camera.z)];
 }
 function reset(){
  if(!assets)return;
  Object.assign(camera,assets.meta.spawn,{y:1.61});lookX=0;lookY=0;walkX=0;walkZ=0;keys.clear();
  updateRoom();
 }
 function updateRoom(){
  let current=W.room(camera.z);if(current===roomName)return;
  roomName=current;nameLabel.textContent=names[current];title.textContent=names[current];
 }
 function begin(lock){
  if(!ready)return;active=true;setGuide(false);canvas.focus({preventScroll:true});
  if(lock&&document.pointerLockElement!==canvas&&canvas.requestPointerLock){
   try{let request=canvas.requestPointerLock();if(request&&typeof request.catch==='function')request.catch(()=>{});}catch{}
  }
 }
 function pause(){
  active=false;drag=false;lookX=lookY=walkX=walkZ=0;keys.clear();setGuide(true);
 }
 entry.addEventListener('click',()=>begin(true));
 document.getElementById('reset').addEventListener('click',reset);
 document.getElementById('help').addEventListener('click',()=>{if(document.pointerLockElement)document.exitPointerLock();if(guide.hidden)pause();else begin(false);});
 document.addEventListener('pointerlockchange',()=>{
  if(document.pointerLockElement===canvas){active=true;drag=false;setGuide(false);}
  else if(ready)pause();
 });
 canvas.addEventListener('pointerdown',e=>{
  if(e.button!==0||!ready)return;e.preventDefault();
  drag=true;try{canvas.setPointerCapture(e.pointerId);}catch{}
  begin(e.pointerType!=='touch');
 });
 canvas.addEventListener('pointerup',()=>{drag=false;});
 canvas.addEventListener('pointercancel',()=>{drag=false;});
 document.addEventListener('mousemove',e=>{
  if(document.pointerLockElement===canvas||drag){lookX+=clamp(e.movementX,-220,220);lookY+=clamp(e.movementY,-220,220);}
 });
 let lastTouch=null;
 canvas.addEventListener('touchstart',e=>{if(e.touches.length===1)lastTouch=[e.touches[0].clientX,e.touches[0].clientY];},{passive:true});
 canvas.addEventListener('touchmove',e=>{if(lastTouch&&e.touches.length===1){let t=e.touches[0];lookX+=(t.clientX-lastTouch[0])*1.35;lookY+=(t.clientY-lastTouch[1])*1.35;lastTouch=[t.clientX,t.clientY];}},{passive:true});
 canvas.addEventListener('touchend',()=>{lastTouch=null;},{passive:true});
 const movementKeys=new Set(['KeyW','KeyA','KeyS','KeyD','ArrowLeft','ArrowRight','ArrowUp','ArrowDown','ShiftLeft','ShiftRight']);
 window.addEventListener('keydown',e=>{
  if(e.altKey||e.ctrlKey||e.metaKey||!ready)return;
  if(e.code==='KeyR'){e.preventDefault();if(!e.repeat)reset();return;}
  if(e.code==='KeyH'){
   e.preventDefault();if(e.repeat)return;
   if(guide.hidden){if(document.pointerLockElement)document.exitPointerLock();pause();}else begin(false);
   return;
  }
  if(e.code==='Escape'){if(document.pointerLockElement)document.exitPointerLock();pause();return;}
  if(movementKeys.has(e.code)){e.preventDefault();keys.add(e.code);if(!active)begin(false);}
 });
 window.addEventListener('keyup',e=>keys.delete(e.code));
 window.addEventListener('blur',()=>{keys.clear();drag=false;walkX=walkZ=lookX=lookY=0;});
 function update(dt){
  camera.yaw+=lookX*.00215;camera.pitch-=lookY*.00215;lookX=0;lookY=0;
  const k=key=>keys.has(key)?1:0;
  camera.yaw+=(k('ArrowRight')-k('ArrowLeft'))*dt*1.39;
  camera.pitch=clamp(camera.pitch+(k('ArrowUp')-k('ArrowDown'))*dt*1.17,-1.43,1.43);
  const right=k('KeyD')-k('KeyA'),forward=k('KeyW')-k('KeyS'),s=Math.sin(camera.yaw),c=Math.cos(camera.yaw);
  const speed=(k('ShiftLeft')||k('ShiftRight')) ? .84 : 1.79,scale=speed/Math.max(1,Math.hypot(forward,right));
  const smooth=1-Math.exp(-dt*24);
  walkX+=((forward*s+right*c)*scale-walkX)*smooth;walkZ+=((-forward*c+right*s)*scale-walkZ)*smooth;
  if(Math.abs(walkX)+Math.abs(walkZ)>.0005)W.move(camera,walkX*dt,walkZ*dt,obstacles);
  updateRoom();
 }
 async function get(url,mode){
  const r=await fetch(url);if(!r.ok)throw Error('Could not load '+url+' ('+r.status+').');
  if(mode==='json')return await r.json();
  if(mode==='text')return await r.text();
  const b=await r.arrayBuffer(),sig=new Uint8Array(b,0,Math.min(2,b.byteLength));
  if(sig[0]!==31||sig[1]!==139)return b;
  if(typeof DecompressionStream==='undefined')throw Error('This build needs a browser with gzip DecompressionStream support.');
  return await new Response(new Blob([b]).stream().pipeThrough(new DecompressionStream('gzip'))).arrayBuffer();
 }
 function shader(type,source){
  const sh=gl.createShader(type);gl.shaderSource(sh,source);gl.compileShader(sh);
  if(!gl.getShaderParameter(sh,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(sh)||'Shader compilation failed.');
  return sh;
 }
 function textures(){
  const {meta,surface}=assets;
  let ext=gl.getExtension('EXT_texture_filter_anisotropic');
  function filtering(target,level){
   gl.texParameteri(target,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texParameteri(target,gl.TEXTURE_MIN_FILTER,gl.LINEAR_MIPMAP_LINEAR);
   if(ext)gl.texParameterf(target,ext.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(level,gl.getParameter(ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT)));
  }
  gl.pixelStorei(gl.UNPACK_ALIGNMENT,1);gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,false);gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,false);
  gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D_ARRAY,gl.createTexture());
  const size=meta.textureSize;
  gl.texStorage3D(gl.TEXTURE_2D_ARRAY,Math.floor(Math.log2(size))+1,gl.RGBA8,size,size,meta.textureLayers);
  gl.texSubImage3D(gl.TEXTURE_2D_ARRAY,0,0,0,0,size,size,meta.textureLayers,gl.RGBA,gl.UNSIGNED_BYTE,new Uint8Array(surface));
  gl.generateMipmap(gl.TEXTURE_2D_ARRAY);filtering(gl.TEXTURE_2D_ARRAY,4);
  const maxSize=gl.getParameter(gl.MAX_TEXTURE_SIZE);
  let art=makeHabitatAtlas();
  if(art.width>maxSize){let small=document.createElement('canvas');small.width=maxSize;small.height=Math.floor(art.height*maxSize/art.width);small.getContext('2d').drawImage(art,0,0,small.width,small.height);art=small;}
  gl.activeTexture(gl.TEXTURE1);gl.bindTexture(gl.TEXTURE_2D,gl.createTexture());
  gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,art);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
  gl.generateMipmap(gl.TEXTURE_2D);filtering(gl.TEXTURE_2D,4);
  art.width=1;art.height=1;
 }
 function initGPU(){
  const {vs,fs,mesh,meta}=assets;
  program=gl.createProgram();const vert=shader(gl.VERTEX_SHADER,vs),frag=shader(gl.FRAGMENT_SHADER,fs);
  gl.attachShader(program,vert);gl.attachShader(program,frag);gl.linkProgram(program);
  if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(program)||'Shader link failed.');
  gl.deleteShader(vert);gl.deleteShader(frag);gl.useProgram(program);
  uniforms={};for(let name of ['ViewProjection','Eye','Time','Screen','Reef','Surfaces','Art'])uniforms[name]=gl.getUniformLocation(program,'u'+name);
  gl.uniform1i(uniforms.Surfaces,0);gl.uniform1i(uniforms.Art,1);textures();
  vao=gl.createVertexArray();gl.bindVertexArray(vao);
  gl.bindBuffer(gl.ARRAY_BUFFER,gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER,new Uint8Array(mesh,0,meta.stride*meta.vertices),gl.STATIC_DRAW);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,gl.createBuffer());
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint32Array(mesh,meta.stride*meta.vertices,meta.indices),gl.STATIC_DRAW);
  const attr=(loc,count,type,normalized,offset)=>{gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,count,type,normalized,meta.stride,offset);};
  attr(0,3,gl.FLOAT,false,0);attr(1,3,gl.SHORT,true,12);attr(2,2,gl.FLOAT,false,20);attr(3,4,gl.UNSIGNED_BYTE,true,28);
  attr(4,4,gl.UNSIGNED_BYTE,true,32);attr(5,3,gl.BYTE,true,36);attr(6,1,gl.UNSIGNED_BYTE,true,39);
  gl.enable(gl.DEPTH_TEST);gl.depthFunc(gl.LEQUAL);gl.enable(gl.CULL_FACE);gl.cullFace(gl.BACK);
  gl.clearColor(.078,.147,.15,1);gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);
  resizePending=true;
 }
 function resize(){
  let r=canvas.getBoundingClientRect(),w=Math.max(1,r.width),h=Math.max(1,r.height);
  let density=Math.min(window.devicePixelRatio||1,1.5,Math.sqrt(2320000/(w*h)));
  canvas.width=Math.max(1,Math.round(w*density));canvas.height=Math.max(1,Math.round(h*density));
  gl.viewport(0,0,canvas.width,canvas.height);gl.uniform2f(uniforms.Screen,canvas.width,canvas.height);resizePending=false;
 }
 window.addEventListener('resize',()=>{resizePending=true;});
 function matrix(){
  const cy=Math.cos(camera.yaw),sy=Math.sin(camera.yaw),cp=Math.cos(camera.pitch),sp=Math.sin(camera.pitch);
  const R=[cy,0,sy],U=[-sy*sp,cp,cy*sp],F=[sy*cp,sp,-cy*cp];
  const V=[camera.x,camera.y,camera.z],d=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2];
  const aspect=canvas.width/canvas.height,fy=1/Math.tan(64*Math.PI/360),fx=fy/aspect;
  const n=.034,f=60,A=(f+n)/(f-n),B=-2*f*n/(f-n);
  for(let i=0;i<3;i++){viewProjection[i*4]=R[i]*fx;viewProjection[i*4+1]=U[i]*fy;viewProjection[i*4+2]=F[i]*A;viewProjection[i*4+3]=F[i];}
  viewProjection[12]=-d(R,V)*fx;viewProjection[13]=-d(U,V)*fy;viewProjection[14]=-d(F,V)*A+B;viewProjection[15]=-d(F,V);
  for(let axis=0;axis<3;axis++)for(let sign=0;sign<2;sign++){
   const plane=frustum[axis*2+sign],s=sign===0?1:-1;
   for(let j=0;j<4;j++)plane[j]=viewProjection[j*4+3]+s*viewProjection[j*4+axis];
  }
 }
 // Clip each opening in homogeneous coordinates. Both jambs can be behind the eye when turning in a doorway.
 function portal(cx,ymin,ymax,z,half,thickness){
  if(Math.abs(camera.z-z)<thickness)return full;
  const m=viewProjection;
  const point=(x,y)=>[m[0]*x+m[4]*y+m[8]*z+m[12],m[1]*x+m[5]*y+m[9]*z+m[13],m[3]*x+m[7]*y+m[11]*z+m[15]];
  const pts=[point(cx-half,ymin),point(cx+half,ymin),point(cx+half,ymax),point(cx-half,ymax)];
  let left=Infinity,bottom=Infinity,right=-Infinity,top=-Infinity;
  function extend(p){let x=p[0]/p[2],y=p[1]/p[2];left=Math.min(left,x);right=Math.max(right,x);bottom=Math.min(bottom,y);top=Math.max(top,y);}
  for(let i=0;i<4;i++){
   let a=pts[i],b=pts[(i+1)%4];if(a[2]>=.025)extend(a);
   if((a[2]>=.025)!==(b[2]>=.025)){let t=(.025-a[2])/(b[2]-a[2]);extend([a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t,.025]);}
  }
  return intersect(full,[left-.015,bottom-.015,right+.015,top+.015]);
 }
 function roomsVisible(){
  const p=portal(.68,-.08,2.55,-1.45,1.38,.42),q=portal(1.28,-.08,2.55,-4.75,1.17,.42);
  let living=null,work=null,observation=null;
  if(roomName==='living'){living=full;work=p;observation=intersect(p,q);}
  else if(roomName==='work'){work=full;living=p;observation=q;}
  else{observation=full;work=q;living=intersect(q,p);}
  const reef=intersect(observation,portal(0,.79,2.46,-8.522,2.55,.20));
  return {living,work,observation,hatch01:rectUnion(living,work),hatch02:rectUnion(work,observation),
    reef,observation_glass:reef,work_glass:work};
 }
 function draw(name,rect){
  const d=draws[name];if(!d||!rect)return;
  const b=d.bounds;
  for(const p of frustum){
   if(p[0]*b[p[0]>=0?3:0]+p[1]*b[p[1]>=0?4:1]+p[2]*b[p[2]>=0?5:2]+p[3]<-.001)return;
  }
  const w=canvas.width,h=canvas.height,x=Math.max(0,Math.floor((rect[0]+1)*.5*w)-1),y=Math.max(0,Math.floor((rect[1]+1)*.5*h)-1);
  gl.scissor(x,y,Math.min(w,Math.ceil((rect[2]+1)*.5*w)+1)-x,Math.min(h,Math.ceil((rect[3]+1)*.5*h)+1)-y);
  gl.uniform1i(uniforms.Reef,name==='reef'?1:0);
  gl.drawElements(gl.TRIANGLES,d.count,gl.UNSIGNED_INT,d.first*4);
 }
 function render(ts){
  if(!ready||document.hidden)return;
  if(resizePending)resize();
  const dt=previous?clamp((ts-previous)/1000,0,.05):0;previous=ts;sceneTime+=dt;
  update(dt);matrix();gl.uniformMatrix4fv(uniforms.ViewProjection,false,viewProjection);gl.uniform3f(uniforms.Eye,camera.x,camera.y,camera.z);gl.uniform1f(uniforms.Time,sceneTime%63000);
  gl.disable(gl.SCISSOR_TEST);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);gl.enable(gl.SCISSOR_TEST);
  const visible=roomsVisible();
  let order=roomName==='living'?['living','hatch01','work','hatch02','observation']:roomName==='work'?['work','hatch01','hatch02','observation','living']:['observation','hatch02','work','hatch01','living'];
  for(let n of order)draw(n,visible[n]);draw('reef',visible.reef);
  gl.enable(gl.BLEND);gl.depthMask(false);gl.disable(gl.CULL_FACE);
  draw('observation_glass',visible.observation_glass);draw('work_glass',visible.work_glass);
  gl.enable(gl.CULL_FACE);gl.depthMask(true);gl.disable(gl.BLEND);
  frame=requestAnimationFrame(render);
 }
 function start(){previous=0;cancelAnimationFrame(frame);if(!document.hidden&&ready)frame=requestAnimationFrame(render);}
 document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(frame);keys.clear();walkX=walkZ=0;}else start();});
 canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();ready=false;cancelAnimationFrame(frame);message('Graphics context interrupted. Restoring the habitat…');});
 canvas.addEventListener('webglcontextrestored',()=>{try{initGPU();ready=true;message('');start();}catch(e){message(e.message);}});
 async function boot(){
  entry.disabled=true;
  if(!gl)throw Error('A WebGL 2 graphics context is required to enter the habitat.');
  if(location.protocol==='file:')throw Error('Launch the local HTTP server from the README, then open the suggested address.');
  const [meta,mesh,surface,vs,fs]=await Promise.all([get('habitat.json','json'),get('habitat.mesh.gz'),get('surface.rgba.gz'),get('scene.vert','text'),get('scene.frag','text')]);
  if(mesh.byteLength!==meta.stride*meta.vertices+4*meta.indices||surface.byteLength!==meta.textureSize**2*meta.textureLayers*4)throw Error('Incomplete habitat asset. Reload the page to retry.');
  assets={meta,mesh,surface,vs,fs};obstacles=W.prepare(meta.collisions);draws=Object.fromEntries(meta.draws.map(d=>[d.name,d]));reset();
  initGPU();ready=true;entry.disabled=false;message('');setGuide(true);start();
 }
 boot().catch(e=>{console.error(e);message(e.message||'The habitat could not be loaded.');entry.disabled=true;});
})();


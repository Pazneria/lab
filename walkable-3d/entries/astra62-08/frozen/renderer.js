'use strict';
async function inflateLocal(base64){
 const str=atob(base64),data=new Uint8Array(str.length);
 for(let i=0;i<str.length;i++)data[i]=str.charCodeAt(i);
 const stream=new Blob([data]).stream().pipeThrough(new DecompressionStream('deflate'));
 return new Uint8Array(await new Response(stream).arrayBuffer())
}
function frustumPlanes(m){
 const out=new Float32Array(24);let j=0;
 for(let row=0;row<3;row++)for(const sign of [1,-1]){
  for(let col=0;col<4;col++)out[j++]=m[col*4+3]+sign*m[col*4+row]
 }return out
}
function visibleBox(b,p){
 for(let i=0;i<24;i+=4){
  const x=p[i]>=0?b[3]:b[0],y=p[i+1]>=0?b[4]:b[1],z=p[i+2]>=0?b[5]:b[2];
  if(x*p[i]+y*p[i+1]+z*p[i+2]+p[i+3]<-.002)return false
 }return true
}
function makeRenderer(gl,worldBytes,materialBytes){
 const canvas=gl.canvas,meta=WORLD_META;
 function compile(name,spec){
  const program=gl.createProgram();
  for(const [type,src] of [[gl.VERTEX_SHADER,spec.vs],[gl.FRAGMENT_SHADER,spec.fs]]){
   const shader=gl.createShader(type);gl.shaderSource(shader,src);gl.compileShader(shader);
   if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS))throw Error(name+' shader: '+gl.getShaderInfoLog(shader));
   gl.attachShader(program,shader);gl.deleteShader(shader)
  }
  gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error(name+' pipeline: '+gl.getProgramInfoLog(program));
  const u={};for(let i=0;i<gl.getProgramParameter(program,gl.ACTIVE_UNIFORMS);i++){
   const n=gl.getActiveUniform(program,i).name;u[n]=gl.getUniformLocation(program,n)
  }
  return {p:program,u}
 }
 const prog={};for(const [name,s] of Object.entries(SHADERS))prog[name]=compile(name,s);
 const mat4=(loc,x)=>gl.uniformMatrix4fv(loc,false,x);
 function buffer(kind,arr){const b=gl.createBuffer();gl.bindBuffer(kind,b);gl.bufferData(kind,arr,gl.STATIC_DRAW);return b}
 function attrib(idx,size,type,normalized,stride,offset){gl.enableVertexAttribArray(idx);gl.vertexAttribPointer(idx,size,type,normalized,stride,offset)}
 const empty=gl.createVertexArray();gl.bindVertexArray(empty);
 const nv=meta.vertexCount*24,ni=meta.indexCount*2,rv=meta.reflectionV*20;
 if(worldBytes.length!==nv+ni+rv+meta.reflectionI*4||materialBytes.length!==512*256*16*4)throw Error('Local scene data is incomplete.');
 const vbo=buffer(gl.ARRAY_BUFFER,worldBytes.subarray(0,nv)),ibo=buffer(gl.ELEMENT_ARRAY_BUFFER,worldBytes.subarray(nv,nv+ni));
 const chunks=meta.sections.map(sec=>{
  const vao=gl.createVertexArray();gl.bindVertexArray(vao);gl.bindBuffer(gl.ARRAY_BUFFER,vbo);gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,ibo);
  const o=sec.v*24;attrib(0,3,gl.FLOAT,false,24,o);attrib(1,3,gl.BYTE,true,24,o+12);attrib(2,2,gl.HALF_FLOAT,false,24,o+16);
  attrib(3,4,gl.UNSIGNED_BYTE,true,24,o+20);attrib(4,1,gl.UNSIGNED_BYTE,false,24,o+15);
  return {...sec,vao}
 });
 const refVA=gl.createVertexArray();gl.bindVertexArray(refVA);
 buffer(gl.ARRAY_BUFFER,worldBytes.subarray(nv+ni,nv+ni+rv));buffer(gl.ELEMENT_ARRAY_BUFFER,worldBytes.subarray(nv+ni+rv));
 attrib(0,3,gl.FLOAT,false,20,0);attrib(1,3,gl.BYTE,true,20,12);attrib(3,4,gl.UNSIGNED_BYTE,true,20,16);
 gl.bindVertexArray(empty);
 // Mipmapped texture array. Each surface sample packs albedo, two tangent slopes and its wear mask.
 const surf=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D_ARRAY,surf);
 gl.texStorage3D(gl.TEXTURE_2D_ARRAY,10,gl.RGBA8,512,256,16);
 gl.texSubImage3D(gl.TEXTURE_2D_ARRAY,0,0,0,0,512,256,16,gl.RGBA,gl.UNSIGNED_BYTE,materialBytes);gl.generateMipmap(gl.TEXTURE_2D_ARRAY);
 gl.texParameteri(gl.TEXTURE_2D_ARRAY,gl.TEXTURE_MIN_FILTER,gl.LINEAR_MIPMAP_LINEAR);gl.texParameteri(gl.TEXTURE_2D_ARRAY,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
 gl.texParameteri(gl.TEXTURE_2D_ARRAY,gl.TEXTURE_WRAP_S,gl.REPEAT);gl.texParameteri(gl.TEXTURE_2D_ARRAY,gl.TEXTURE_WRAP_T,gl.REPEAT);
 const anis=gl.getExtension('EXT_texture_filter_anisotropic');if(anis)gl.texParameterf(gl.TEXTURE_2D_ARRAY,anis.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(6,gl.getParameter(anis.MAX_TEXTURE_MAX_ANISOTROPY_EXT)));
 const noiseTex=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,noiseTex);const ns=128,noiseData=new Uint8Array(ns*ns);
 function random(i,j){let k=Math.imul(i+43,374761393)+Math.imul(j+439,668265263);k=Math.imul(k^(k>>>13),1274126177);return((k^(k>>>16))>>>0)/4294967296}
 function val(x,y,n){
  const xx=x*n/ns,yy=y*n/ns,i=Math.floor(xx),j=Math.floor(yy),a=sm(0,1,xx-i),b=sm(0,1,yy-j);
  return mix(mix(random(i,j),random((i+1)%n,j),a),mix(random(i,(j+1)%n),random((i+1)%n,(j+1)%n),a),b)
 }
 for(let j=0;j<ns;j++)for(let i=0;i<ns;i++)noiseData[i+j*ns]=255*(val(i,j,9)*.58+val(i,j,19)*.265+val(i,j,43)*.155);
 gl.texImage2D(gl.TEXTURE_2D,0,gl.R8,ns,ns,0,gl.RED,gl.UNSIGNED_BYTE,noiseData);gl.generateMipmap(gl.TEXTURE_2D);
 gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR_MIPMAP_LINEAR);
 const ink=inkAtlas(gl,meta.signs),decalVA=gl.createVertexArray();gl.bindVertexArray(decalVA);buffer(gl.ARRAY_BUFFER,ink.data);
 attrib(0,3,gl.FLOAT,false,32,0);attrib(1,2,gl.FLOAT,false,32,12);attrib(2,3,gl.FLOAT,false,32,20);
 const decalN=ink.data.length/8;
 // An indexed water sheet encodes bed height. Only the small intertidal area needs a fine grid.
 const xs=[-480,-260,-145,-85,-52,-34,-26,-22],zs=[-480,-180,-74,-40,-24,-13,-7];
 for(let i=-40;i<=42;i++)xs.push(i*.5);xs.push(24,28,36,48,68,89,140,240,480);
 for(let i=-11;i<=42;i++)zs.push(i*.5);zs.push(24,29,37,49,65,94,155,245,480);
 const wv=[],wi=[];for(let j=0;j<zs.length;j++)for(let i=0;i<xs.length;i++){
  const x=xs[i],z=zs[j],f=(Math.abs(x)>64||z>37||z< -53)?-6.1:landY(x,z),k=wv.length/4;
  wv.push(x,0,z,f);if(i&&j){const a=k-xs.length-1,b=k-1,c=k,d=k-xs.length;
   if(Math.min(wv[a*4+3],wv[b*4+3],wv[c*4+3],wv[d*4+3])<.13)wi.push(a,b,c,a,c,d)}
 }
 const waterVA=gl.createVertexArray();gl.bindVertexArray(waterVA);
 buffer(gl.ARRAY_BUFFER,new Float32Array(wv));buffer(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(wi));attrib(0,3,gl.FLOAT,false,16,0);attrib(1,1,gl.FLOAT,false,16,12);
 const waterN=wi.length;
 // A fixed light only needs one shadow pass for the entire visit.
 const shadowSize=Math.min(2048,gl.getParameter(gl.MAX_TEXTURE_SIZE)),shadow=gl.createTexture();
 gl.bindTexture(gl.TEXTURE_2D,shadow);
 gl.texImage2D(gl.TEXTURE_2D,0,gl.DEPTH_COMPONENT24,shadowSize,shadowSize,0,gl.DEPTH_COMPONENT,gl.UNSIGNED_INT,null);
 for(const t of [gl.TEXTURE_MIN_FILTER,gl.TEXTURE_MAG_FILTER])gl.texParameteri(gl.TEXTURE_2D,t,gl.LINEAR);
 for(const t of [gl.TEXTURE_WRAP_S,gl.TEXTURE_WRAP_T])gl.texParameteri(gl.TEXTURE_2D,t,gl.CLAMP_TO_EDGE);
 gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_COMPARE_MODE,gl.COMPARE_REF_TO_TEXTURE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_COMPARE_FUNC,gl.LEQUAL);
 const fbS=gl.createFramebuffer();gl.bindFramebuffer(gl.FRAMEBUFFER,fbS);gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.DEPTH_ATTACHMENT,gl.TEXTURE_2D,shadow,0);gl.drawBuffers([gl.NONE]);gl.readBuffer(gl.NONE);
 if(gl.checkFramebufferStatus(gl.FRAMEBUFFER)!==gl.FRAMEBUFFER_COMPLETE)throw Error('Shadow target unavailable.');
 const sun=norm([.634354,.493387,.594173]),target=[.1,1.6,1.7],light=multiply(ortho(-23,23,-21,21,1,94),lookAt(vadd(target,vmul(sun,44)),target));
 gl.viewport(0,0,shadowSize,shadowSize);gl.enable(gl.DEPTH_TEST);gl.depthFunc(gl.LEQUAL);gl.depthMask(true);gl.clear(gl.DEPTH_BUFFER_BIT);
 gl.useProgram(prog.shadow.p);mat4(prog.shadow.u.uVP,light);const lp=frustumPlanes(light);
 gl.enable(gl.POLYGON_OFFSET_FILL);gl.polygonOffset(1.25,1.8);
 for(const c of chunks)if(c.k!==3&&visibleBox(c.b,lp)){gl.bindVertexArray(c.vao);gl.drawElements(gl.TRIANGLES,c.n,gl.UNSIGNED_SHORT,c.i*2)}
 gl.disable(gl.POLYGON_OFFSET_FILL);gl.bindFramebuffer(gl.FRAMEBUFFER,null);gl.deleteFramebuffer(fbS);
 const mirror=gl.createTexture(),mirrorFB=gl.createFramebuffer(),mirrorD=gl.createRenderbuffer();let mw=0,mh=0;
 gl.bindTexture(gl.TEXTURE_2D,mirror);
 for(const t of [gl.TEXTURE_MIN_FILTER,gl.TEXTURE_MAG_FILTER])gl.texParameteri(gl.TEXTURE_2D,t,gl.LINEAR);
 for(const t of [gl.TEXTURE_WRAP_S,gl.TEXTURE_WRAP_T])gl.texParameteri(gl.TEXTURE_2D,t,gl.CLAMP_TO_EDGE);
 function setTex(unit,target,tex){gl.activeTexture(gl.TEXTURE0+unit);gl.bindTexture(target,tex)}
 const bindings={scene:{uSurface:0,uShadow:1},sky:{uNoise:2},decal:{uInk:3,uShadow:1},water:{uMirror:4,uNoise:2,uShadow:1}};
 for(const [name,us] of Object.entries(bindings)){
  const p=prog[name];gl.useProgram(p.p);for(const [u,tex] of Object.entries(us))gl.uniform1i(p.u[u],tex);
  if(p.u.uLight)mat4(p.u.uLight,light)
 }
 setTex(0,gl.TEXTURE_2D_ARRAY,surf);setTex(1,gl.TEXTURE_2D,shadow);setTex(2,gl.TEXTURE_2D,noiseTex);setTex(3,gl.TEXTURE_2D,ink.tex);setTex(4,gl.TEXTURE_2D,mirror);
 const sky=prog.sky,scene=prog.scene,ref=prog.reflect,dec=prog.decal,water=prog.water;
 let lastMirror=[],projection,aspect,tanV;
 const mirrorY=[1,0,0,0,0,-1,0,0,0,0,1,0,0,0,0,1];
 function sizing(){
  const cw=Math.max(1,canvas.clientWidth),ch=Math.max(1,canvas.clientHeight),dpr=Math.min(window.devicePixelRatio||1,1.5,Math.sqrt(2050000/(cw*ch)));
  const w=Math.max(2,Math.round(cw*dpr)),h=Math.max(2,Math.round(ch*dpr));
  if(canvas.width===w&&canvas.height===h&&projection)return;
  canvas.width=w;canvas.height=h;aspect=w/h;const fov=(aspect<.85?68:60)*PI/180;
  tanV=Math.tan(fov*.5);projection=perspective(fov,aspect,.046,460);
  const reduction=Math.min(.37,640/w,420/h);mw=Math.max(4,Math.round(w*reduction));mh=Math.max(4,Math.round(h*reduction));
  setTex(4,gl.TEXTURE_2D,mirror);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA8,mw,mh,0,gl.RGBA,gl.UNSIGNED_BYTE,null);
  gl.bindRenderbuffer(gl.RENDERBUFFER,mirrorD);gl.renderbufferStorage(gl.RENDERBUFFER,gl.DEPTH_COMPONENT16,mw,mh);
  gl.bindFramebuffer(gl.FRAMEBUFFER,mirrorFB);gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,mirror,0);gl.framebufferRenderbuffer(gl.FRAMEBUFFER,gl.DEPTH_ATTACHMENT,gl.RENDERBUFFER,mirrorD);
  if(gl.checkFramebufferStatus(gl.FRAMEBUFFER)!==gl.FRAMEBUFFER_COMPLETE)throw Error('Reflection target unavailable.');
  gl.bindFramebuffer(gl.FRAMEBUFFER,null);lastMirror=[]
 }
 function skyDraw(f,r,u){
  gl.depthMask(false);gl.useProgram(sky.p);gl.uniform3fv(sky.u.uForward,f);gl.uniform3fv(sky.u.uRight,r);gl.uniform3fv(sky.u.uUp,u);gl.uniform2f(sky.u.uLens,aspect*tanV,tanV);
  gl.bindVertexArray(empty);gl.drawArrays(gl.TRIANGLES,0,3);gl.depthMask(true)
 }
 function draw(p,time){
  sizing();const eye=[p.x,p.eye,p.z],sy=Math.sin(p.yaw),cy=Math.cos(p.yaw),cp=Math.cos(p.pitch),sp=Math.sin(p.pitch);
  const f=[sy*cp,sp,-cy*cp],r=[cy,0,sy],up=cross(r,f),view=lookAt(eye,vadd(eye,f)),vp=multiply(projection,view);
  if(p.x!==lastMirror[0]||p.eye!==lastMirror[1]||p.z!==lastMirror[2]||p.yaw!==lastMirror[3]||p.pitch!==lastMirror[4]){
   gl.bindFramebuffer(gl.FRAMEBUFFER,mirrorFB);gl.viewport(0,0,mw,mh);gl.depthMask(true);gl.disable(gl.BLEND);
   gl.clearColor(.80,.84,.82,1);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
   gl.useProgram(ref.p);mat4(ref.u.uVP,multiply(vp,mirrorY));gl.uniform3f(ref.u.uEye,p.x,-p.eye,p.z);
   gl.bindVertexArray(refVA);gl.drawElements(gl.TRIANGLES,meta.reflectionI,gl.UNSIGNED_INT,0);
   skyDraw([f[0],-f[1],f[2]],[r[0],-r[1],r[2]],[up[0],-up[1],up[2]]);
   lastMirror=[p.x,p.eye,p.z,p.yaw,p.pitch]
  }
  gl.bindFramebuffer(gl.FRAMEBUFFER,null);gl.viewport(0,0,canvas.width,canvas.height);gl.clearColor(.802,.838,.821,1);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
  gl.useProgram(scene.p);mat4(scene.u.uVP,vp);gl.uniform3fv(scene.u.uEye,eye);gl.uniform1i(scene.u.uGlass,0);
  const planes=frustumPlanes(vp);
  for(const c of chunks)if(c.k!==3&&visibleBox(c.b,planes)){gl.bindVertexArray(c.vao);gl.drawElements(gl.TRIANGLES,c.n,gl.UNSIGNED_SHORT,c.i*2)}
  skyDraw(f,r,up);
  gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);gl.depthMask(false);
  gl.useProgram(dec.p);mat4(dec.u.uVP,vp);gl.uniform3fv(dec.u.uEye,eye);gl.bindVertexArray(decalVA);gl.drawArrays(gl.TRIANGLES,0,decalN);
  gl.useProgram(water.p);mat4(water.u.uVP,vp);gl.uniform3fv(water.u.uEye,eye);gl.uniform1f(water.u.uTime,time);gl.uniform2f(water.u.uViewport,canvas.width,canvas.height);
  gl.bindVertexArray(waterVA);gl.drawElements(gl.TRIANGLES,waterN,gl.UNSIGNED_SHORT,0);
  gl.useProgram(scene.p);gl.uniform1i(scene.u.uGlass,1);
  for(const c of chunks)if(c.k===3&&visibleBox(c.b,planes)){gl.bindVertexArray(c.vao);gl.drawElements(gl.TRIANGLES,c.n,gl.UNSIGNED_SHORT,c.i*2)}
  gl.depthMask(true);gl.disable(gl.BLEND)
 }
 return {draw}
}

"use strict";
function parseWorld(buf){
  const data=new DataView(buf);
  if(data.byteLength<16||data.getUint32(0,false)!==0x414d4e32)throw Error("The courtyard mesh has an unsupported header.");
  const bytes=data.getUint32(4,true),meta=JSON.parse(new TextDecoder().decode(new Uint8Array(buf,16,bytes)));
  let offset=16+Math.ceil(bytes/4)*4;
  function take(count){if(offset+count>buf.byteLength)throw Error("The courtyard mesh is incomplete.");const a=new Uint8Array(buf,offset,count);offset+=count;return a;}
  if(meta.version!==2||meta.stride!==20)throw Error("The courtyard mesh has an unsupported layout.");
  const mesh={meta,vertices:take(meta.vertices*meta.stride),indices:take(meta.indices*4),reflected:take(meta.refIndices*4),ground:take(meta.ground.w*meta.ground.h*4)};
  if(offset!==buf.byteLength)throw Error("Unexpected courtyard mesh length.");
  return mesh;
}
const sceneVS=`#version 300 es
precision highp float;precision highp int;
layout(location=0) in vec3 aPosition;
layout(location=1) in vec3 aNormal;
layout(location=2) in vec2 aUV;
layout(location=3) in vec3 aLightColor;
layout(location=4) in float aSheet;
layout(location=5) in float aKind;
uniform mat4 uVP;
out vec3 vWorld;
out vec3 vNormal;
out vec2 vUV;
out vec3 vColor;
flat out float vSheet;
flat out int vKind;
void main(){
  vWorld=aPosition/1600.0; vNormal=aNormal; vUV=aUV/512.0;
  vColor=aLightColor*2.0; vSheet=aSheet; vKind=int(aKind+.5);
  gl_Position=uVP*vec4(vWorld,1.0);
}`;
const sceneFS=`#version 300 es
precision highp float;precision highp int;
precision highp sampler2DArray;
in vec3 vWorld; in vec3 vNormal; in vec2 vUV; in vec3 vColor;
flat in float vSheet; flat in int vKind;
uniform sampler2DArray uAtlas;
uniform sampler2D uGround;
uniform sampler2D uMirror;
uniform mat4 uMirrorProjection;
uniform vec4 uGroundRect;
uniform vec3 uEye;
uniform float uCloud;
uniform vec4 uLampPos[8];
uniform vec4 uLampColor[8];
out vec4 frag;
void main(){
  vec3 texel=texture(uAtlas,vec3(vUV,vSheet)).rgb;
  vec3 color=texel*vColor;
  vec3 viewVector=uEye-vWorld;
  float viewDist=length(viewVector);
  vec3 V=viewVector/max(viewDist,.001);
  vec3 N=normalize(vNormal+vec3(0.000001));
  float facing=clamp(dot(N,V),0.,1.);
  if(vKind==1){
    vec2 fieldUV=(vWorld.xz-uGroundRect.xy)/uGroundRect.zw;
    vec4 f=texture(uGround,fieldUV);
    float grain=dot(texel,vec3(.27,.48,.25));
    float film=clamp(f.g+(grain-.83)*.54,0.,1.);
    color*=mix(.56,1.,f.r)*mix(1.015,.78,film);
    vec4 q=uMirrorProjection*vec4(vWorld,1.);
    vec2 uv=q.xy/max(.001,q.w)*.5+.5;
    vec2 bend=texture(uAtlas,vec3(vWorld.xz*vec2(.14,.20),uCloud)).rg-.5;
    float micro=texture(uAtlas,vec3(vUV*1.31,vSheet)).r-.84;
    vec2 wobble=vec2(bend.x*.007+micro*.009,(f.a-.5)*.008+micro*.008);
    uv+=wobble*(.65+1.1*(1.-film))*clamp(6./max(viewDist,1.),.4,1.15);
    float lod=mix(3.6,1.25,film)+.48*clamp(viewDist/18.,0.,1.);
    vec3 reflectedColor=textureLod(uMirror,clamp(uv,0.002,0.998),lod).rgb;
    float fresnel=pow(1.-facing,2.7);
    float amount=(.045+.48*film)*(.47+.53*fresnel)*(.81+.19*f.r);
    color=mix(color,reflectedColor,amount);
    color+=vec3(.022,.029,.037)*fresnel*(1.-f.b)*(.30+.70*film);
  }else if(vKind==2||vKind==3){
    float metal=float(vKind==2);
    vec3 worldReflection=reflect(-V,N);
    float rim=pow(1.-facing,3.);
    color+=mix(vec3(.018,.015,.014),vec3(.045,.063,.081),smoothstep(-.2,.7,worldReflection.y))*(.16+rim)*mix(.70,1.36,metal);
    vec3 highlights=vec3(0.);
    for(int i=0;i<8;i++){
      vec3 delta=uLampPos[i].xyz-vWorld;
      float dsq=max(.001,dot(delta,delta)),fall=max(0.,1.-dsq*uLampColor[i].a);
      vec3 L=delta*inversesqrt(dsq),H=normalize(L+V+vec3(.000001));
      float hot=pow(max(0.,dot(N,H)),mix(61.,34.,metal));
      highlights+=uLampColor[i].rgb*hot*fall*fall*uLampPos[i].w/(1.+dsq*.55);
    }
    color+=highlights*mix(.40,.63,metal)*(.6+.4*texel.r);
  }else if(vKind==4){
    color*=.83+.17*sqrt(facing);
  }else if(vKind==6){
    vec2 wallUV=vec2(abs(N.x)>.5?vWorld.z:vWorld.x,vWorld.y);
    float stain=texture(uAtlas,vec3(wallUV*vec2(.35,.095)+.21,uCloud)).r;
    color*=.95+.09*stain-.11*(1.-smoothstep(.15,.93,vWorld.y))*(1.-stain);
  }
  float excess=max(0.,max(color.r,max(color.g,color.b))-.83);
  color=color/(1.+excess*.39);
  float mist=1.-exp(-.0072*max(0.,viewDist-4.));
  color=mix(color,vec3(.194,.218,.257),mist*.83);
  frag=vec4(color,1.);
}`;
const mirrorFS=`#version 300 es
precision highp float;precision highp int;
precision highp sampler2DArray;
in vec3 vWorld; in vec2 vUV; in vec3 vColor; flat in float vSheet;
uniform sampler2DArray uAtlas;uniform vec3 uEye;
out vec4 frag;
void main(){
  if(vWorld.y<.016)discard;
  vec3 c=texture(uAtlas,vec3(vUV,vSheet)).rgb*vColor;
  c=c/(1.+.39*max(0.,max(c.r,max(c.g,c.b))-.83));
  float f=(1.-exp(-.0068*length(vWorld-uEye)))*.76;
  frag=vec4(mix(c,vec3(.194,.218,.257),f),1.);
}`;
const shadowVS=`#version 300 es
precision highp float;precision highp int;
layout(location=0) in vec3 aCenter;layout(location=1) in vec3 aU;layout(location=2) in vec3 aV;layout(location=3) in float aPower;
uniform mat4 uVP;out vec2 vQ;out float vPower;
void main(){vQ=vec2(float(gl_VertexID&1),float((gl_VertexID>>1)&1))*2.-1.;vPower=aPower;gl_Position=uVP*vec4(aCenter+aU*vQ.x+aV*vQ.y,1.);}`;
const shadowFS=`#version 300 es
precision highp float;
in vec2 vQ;in float vPower;out vec4 frag;
void main(){float s=max(0.,1.-dot(vQ,vQ));frag=vec4(vec3(1.-vPower*s*s),1.);}`;
const skyVS=`#version 300 es
out vec2 vNdc;
void main(){vec2 a=vec2(float((gl_VertexID<<1)&2),float(gl_VertexID&2))*2.-1.;vNdc=a;gl_Position=vec4(a,.99999,1.);}`;
const skyFS=`#version 300 es
precision highp float;precision highp int;
precision highp sampler2DArray;
in vec2 vNdc;
uniform sampler2DArray uAtlas; uniform float uCloud;
uniform vec3 uF;uniform vec3 uR;uniform vec3 uU;uniform vec2 uTan;uniform float uFlip;
out vec4 frag;
void main(){
  vec3 dir=normalize(uF+uR*vNdc.x*uTan.x+uU*vNdc.y*uTan.y);dir.y*=uFlip;
  float up=max(0.,dir.y);
  vec2 st=vec2(atan(dir.z,dir.x)*.159155+.5,asin(clamp(dir.y,-1.,1.))*.31831+.5);
  float cloud=texture(uAtlas,vec3(st*vec2(2.,2.2)+vec2(.07,.18),uCloud)).r;
  vec3 low=vec3(.285,.303,.354),high=vec3(.076,.127,.202);
  vec3 color=mix(low,high,smoothstep(-.05,.86,up));
  color+=vec3(.060,.051,.050)*(cloud-.44)*1.5;
  color+=vec3(.049,.027,.013)*pow(max(0.,dot(dir,normalize(vec3(-.65,.23,.71)))),3.)*(1.-up);
  frag=vec4(color,1.);
}`;
const glowVS=`#version 300 es
precision highp float;precision highp int;
layout(location=0) in vec3 aPoint;
layout(location=1) in vec3 aColor;
layout(location=2) in vec4 aShape;
uniform mat4 uVP;uniform vec3 uRight;uniform vec3 uUp;uniform float uTime;
out vec2 vQ;out vec3 vTint;out float vAlpha;flat out float vType;
void main(){
  vec2 q=vec2(float(gl_VertexID&1),float((gl_VertexID>>1)&1))*2.-1.;
  vec3 p=aPoint;vec2 dims=aShape.xy;float alpha=1.;
  if(aShape.w>.5){
    float t=fract(uTime*.31+aShape.z);
    p.y+=aShape.y*t;
    p.x+=(sin(aShape.z*6.2+t*4.4)*.043+.049*t)*t;
    p.z+=sin(aShape.z*8.7+t*3.2)*t*.033;
    dims=vec2(aShape.x*(.48+t*.92),aShape.y*(.22+t*.27));
    alpha=sin(t*3.14159)*(.70-.20*t);
  }
  gl_Position=uVP*vec4(p+uRight*q.x*dims.x*.5+uUp*q.y*dims.y*.5,1.);
  vQ=q;vTint=aColor;vAlpha=alpha;vType=aShape.w;
}`;
const glowFS=`#version 300 es
precision highp float;precision highp int;precision highp sampler2DArray;
in vec2 vQ;in vec3 vTint;in float vAlpha;flat in float vType;
uniform sampler2DArray uAtlas;uniform float uCloud;uniform float uTime;
out vec4 frag;
void main(){
  float r=dot(vQ,vQ);if(r>=1.)discard;
  float a=(1.-r)*(1.-r)*exp(-3.6*r)*.24;
  if(vType>.5){
    float n=texture(uAtlas,vec3(vQ*vec2(.16,.22)+vec2(uTime*.010,-uTime*.035),uCloud)).r;
    a=smoothstep(.30,.73,n)*(1.-r)*(1.-r)*vAlpha*.13;
  }
  frag=vec4(vTint*a,1.);
}`;
function makeProgram(gl,vs,fs){
  const shaders=[];
  for(const [kind,src] of [[gl.VERTEX_SHADER,vs],[gl.FRAGMENT_SHADER,fs]]){
    const sh=gl.createShader(kind);gl.shaderSource(sh,src);gl.compileShader(sh);
    if(!gl.getShaderParameter(sh,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(sh)||"Shader compilation failed.");
    shaders.push(sh);
  }
  const p=gl.createProgram();for(const s of shaders)gl.attachShader(p,s);gl.linkProgram(p);
  if(!gl.getProgramParameter(p,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(p)||"Shader linking failed.");
  for(const s of shaders){gl.detachShader(p,s);gl.deleteShader(s);}
  const uniform={};
  for(let i=0;i<gl.getProgramParameter(p,gl.ACTIVE_UNIFORMS);i++){
    const info=gl.getActiveUniform(p,i);uniform[info.name.replace(/\[0\]$/,"")]=gl.getUniformLocation(p,info.name);
  }return {p,u:uniform};
}
function uploadSheets(gl,art,layers){
  const t=gl.createTexture();gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D_ARRAY,t);
  gl.pixelStorei(gl.UNPACK_COLORSPACE_CONVERSION_WEBGL,gl.NONE);
  gl.pixelStorei(gl.UNPACK_ALIGNMENT,4);
  const tile=document.createElement("canvas");tile.width=512;tile.height=256;
  const ctx=tile.getContext("2d",{alpha:false});ctx.imageSmoothingEnabled=false;
  if(art.naturalWidth!==3072||art.naturalHeight!==256*Math.ceil(layers/6))throw Error("Artwork and mesh dimensions disagree.");
  gl.texStorage3D(gl.TEXTURE_2D_ARRAY,10,gl.RGBA8,512,256,layers);
  for(let i=0;i<layers;i++){
    ctx.drawImage(art,(i%6)*512,Math.floor(i/6)*256,512,256,0,0,512,256);
    gl.texSubImage3D(gl.TEXTURE_2D_ARRAY,0,0,0,i,512,256,1,gl.RGBA,gl.UNSIGNED_BYTE,tile);
  }
  gl.generateMipmap(gl.TEXTURE_2D_ARRAY);
  gl.texParameteri(gl.TEXTURE_2D_ARRAY,gl.TEXTURE_MIN_FILTER,gl.LINEAR_MIPMAP_LINEAR);gl.texParameteri(gl.TEXTURE_2D_ARRAY,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D_ARRAY,gl.TEXTURE_WRAP_S,gl.REPEAT);gl.texParameteri(gl.TEXTURE_2D_ARRAY,gl.TEXTURE_WRAP_T,gl.REPEAT);
  const ext=gl.getExtension("EXT_texture_filter_anisotropic");
  if(ext)gl.texParameterf(gl.TEXTURE_2D_ARRAY,ext.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(4,gl.getParameter(ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT)));
  return t;
}
function uploadBuffer(gl,target,data){const b=gl.createBuffer();gl.bindBuffer(target,b);gl.bufferData(target,data,gl.STATIC_DRAW);return b;}
function geometryArrays(gl,mesh){
  const v=uploadBuffer(gl,gl.ARRAY_BUFFER,mesh.vertices);
  function vao(idx){
    const va=gl.createVertexArray();gl.bindVertexArray(va);gl.bindBuffer(gl.ARRAY_BUFFER,v);
    const layout=[[0,3,gl.SHORT,false,0],[1,3,gl.BYTE,true,6],[2,2,gl.SHORT,false,10],[3,3,gl.UNSIGNED_BYTE,true,14],[4,1,gl.UNSIGNED_BYTE,false,9],[5,1,gl.UNSIGNED_BYTE,false,17]];
    for(const [loc,num,t,norm,off] of layout){gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,num,t,norm,20,off);}
    uploadBuffer(gl,gl.ELEMENT_ARRAY_BUFFER,idx);gl.bindVertexArray(null);return va;
  }
  return {main:vao(mesh.indices),refl:vao(mesh.reflected)};
}
function mul4(a,b){
  const r=new Float32Array(16);
  for(let j=0;j<4;j++)for(let i=0;i<4;i++)r[j*4+i]=a[i]*b[j*4]+a[4+i]*b[j*4+1]+a[8+i]*b[j*4+2]+a[12+i]*b[j*4+3];
  return r;
}
function dot3(a,b){return a[0]*b[0]+a[1]*b[1]+a[2]*b[2];}
function cameraInfo(cam,aspect){
  const sx=Math.sin(cam.yaw),cx=Math.cos(cam.yaw),sp=Math.sin(cam.pitch),cp=Math.cos(cam.pitch);
  const f=[sx*cp,sp,-cx*cp],r=[cx,0,sx],u=[-sx*sp,cp,cx*sp],eye=[cam.x,cam.y,cam.z];
  const v=[r[0],u[0],-f[0],0,r[1],u[1],-f[1],0,r[2],u[2],-f[2],0,-dot3(r,eye),-dot3(u,eye),dot3(f,eye),1];
  const tan=Math.tan((aspect<1?70:63)*Math.PI/360),near=.055,far=66,pp=[1/(tan*aspect),0,0,0,0,1/tan,0,0,0,0,(far+near)/(near-far),-1,0,0,2*far*near/(near-far),0],vp=mul4(pp,v);
  return {vp,f,r,u,eye,tan:[tan*aspect,tan]};
}
function frustum(v){
  const out=[];for(let i=0;i<3;i++)for(const sign of [-1,1])out.push([v[3]+sign*v[i],v[7]+sign*v[i+4],v[11]+sign*v[i+8],v[15]+sign*v[i+12]]);
  return out;
}
function inView(group,planes){
  const a=group.lo,b=group.hi;
  for(const [x,y,z,w] of planes)if(x*(x>=0?b[0]:a[0])+y*(y>=0?b[1]:a[1])+z*(z>=0?b[2]:a[2])+w<-.04)return false;
  return true;
}
function makeRenderer(gl,canvas,mesh,art){
  const geo=geometryArrays(gl,mesh),main=makeProgram(gl,sceneVS,sceneFS),mirror=makeProgram(gl,sceneVS,mirrorFS),sky=makeProgram(gl,skyVS,skyFS),glows=makeProgram(gl,glowVS,glowFS);
  const meta=mesh.meta,atlas=uploadSheets(gl,art,meta.layers.length+1),empty=gl.createVertexArray();
  const ground=gl.createTexture();gl.activeTexture(gl.TEXTURE1);gl.bindTexture(gl.TEXTURE_2D,ground);
  gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA8,meta.ground.w,meta.ground.h,0,gl.RGBA,gl.UNSIGNED_BYTE,mesh.ground);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
  const soft=makeProgram(gl,shadowVS,shadowFS),spots=meta.spots,shadowVA=gl.createVertexArray();gl.bindVertexArray(shadowVA);
  uploadBuffer(gl,gl.ARRAY_BUFFER,new Float32Array(spots.flatMap(s=>[...s.p,...s.u,...s.v,s.power])));
  for(const [loc,size,off] of [[0,3,0],[1,3,12],[2,3,24],[3,1,36]]){gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,size,gl.FLOAT,false,40,off);gl.vertexAttribDivisor(loc,1);}
  gl.bindVertexArray(null);
  const sprites=[];
  for(const g of meta.glows)sprites.push(...g.p,...g.c,g.size,g.size,0,0);
  for(const s of meta.steam)for(let i=0;i<5;i++)sprites.push(...s.p,.76,.74,.66,s.w,s.h,s.seed+i*.2,1);
  const spr=gl.createVertexArray();gl.bindVertexArray(spr);uploadBuffer(gl,gl.ARRAY_BUFFER,new Float32Array(sprites));
  for(const [loc,size,off] of [[0,3,0],[1,3,12],[2,4,24]]){gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,size,gl.FLOAT,false,40,off);gl.vertexAttribDivisor(loc,1);}
  gl.bindVertexArray(null);
  const fbo=gl.createFramebuffer(),depth=gl.createRenderbuffer();
  let mirrorTex=null,mw=0,mh=0,lastPose=null,lastVP=null,bufferChanged=true;
  function resize(){
    const width=canvas.clientWidth||1,height=canvas.clientHeight||1;
    const dpr=Math.min(window.devicePixelRatio||1,1.65,Math.sqrt(1910000/(width*height)));
    const w=Math.max(1,Math.round(width*dpr)),h=Math.max(1,Math.round(height*dpr));
    if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;bufferChanged=true;}
    const s=Math.min(.42,556/w,368/h),rw=Math.max(16,Math.round(w*s)),rh=Math.max(16,Math.round(h*s));
    if(rw===mw&&rh===mh)return;
    mw=rw;mh=rh;bufferChanged=true;gl.activeTexture(gl.TEXTURE2);
    if(mirrorTex)gl.deleteTexture(mirrorTex);mirrorTex=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,mirrorTex);
    gl.texStorage2D(gl.TEXTURE_2D,Math.floor(Math.log2(Math.max(mw,mh)))+1,gl.RGBA8,mw,mh);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR_MIPMAP_LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
    gl.bindRenderbuffer(gl.RENDERBUFFER,depth);gl.renderbufferStorage(gl.RENDERBUFFER,gl.DEPTH_COMPONENT16,mw,mh);
    gl.bindFramebuffer(gl.FRAMEBUFFER,fbo);gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,mirrorTex,0);gl.framebufferRenderbuffer(gl.FRAMEBUFFER,gl.DEPTH_ATTACHMENT,gl.RENDERBUFFER,depth);
    if(gl.checkFramebufferStatus(gl.FRAMEBUFFER)!==gl.FRAMEBUFFER_COMPLETE)throw Error("Unable to allocate the wet-paving reflection target.");
    gl.bindFramebuffer(gl.FRAMEBUFFER,null);
  }
  const lampsPos=new Float32Array(32),lampsColor=new Float32Array(32),shiny=meta.lights.filter(l=>l.shiny);
  let lightX=1e6,lightZ=1e6;
  function specLights(c){
    if(Math.abs(c.x-lightX)+Math.abs(c.z-lightZ)<.30)return;
    lightX=c.x;lightZ=c.z;
    for(const l of shiny){const p=l.p,ds=(p[0]-c.x)**2+(p[1]-c.y)**2+(p[2]-c.z)**2;l.score=l.power/(1+ds*.44);}
    shiny.sort((a,b)=>b.score-a.score);
    for(let i=0;i<Math.min(8,shiny.length);i++){const l=shiny[i];lampsPos.set([...l.p,l.power],i*4);lampsColor.set([...l.c,1/(l.reach*l.reach)],i*4);}
  }
  for(const o of [main,mirror,sky,glows]){
    gl.useProgram(o.p);gl.uniform1i(o.u.uAtlas,0);if(o.u.uCloud)gl.uniform1f(o.u.uCloud,meta.layers.length);
  }
  gl.useProgram(main.p);gl.uniform1i(main.u.uGround,1);gl.uniform1i(main.u.uMirror,2);
  gl.uniform4f(main.u.uGroundRect,meta.ground.x,meta.ground.z,meta.ground.width,meta.ground.depth);
  gl.clearColor(.124,.155,.201,1);gl.enable(gl.DEPTH_TEST);gl.depthFunc(gl.LEQUAL);gl.disable(gl.CULL_FACE);
  function drawSky(c,flip){
    gl.depthMask(false);gl.disable(gl.DEPTH_TEST);
    gl.useProgram(sky.p);gl.uniform3fv(sky.u.uF,c.f);gl.uniform3fv(sky.u.uU,c.u);gl.uniform3fv(sky.u.uR,c.r);
    gl.uniform2fv(sky.u.uTan,c.tan);gl.uniform1f(sky.u.uFlip,flip);
    gl.bindVertexArray(empty);gl.drawArrays(gl.TRIANGLES,0,3);gl.enable(gl.DEPTH_TEST);gl.depthMask(true);
  }
  const groups=[...meta.groups.filter(g=>g.hi[1]>=.035),...meta.groups.filter(g=>g.hi[1]<.035)];
  function drawMeshes(refl,vp){
    const planes=frustum(vp);gl.bindVertexArray(refl?geo.refl:geo.main);
    let start=0,count=0;
    // Visible adjoining groups share a draw; wholly hidden facades and stalls cost no vertex work.
    for(const g of groups){const n=refl?g.rCount:g.count;if(!n)continue;
      if(!inView(g,planes))continue;
      const offset=refl?g.rStart:g.start;
      if(count&&start+count!==offset){gl.drawElements(gl.TRIANGLES,count,gl.UNSIGNED_INT,start*4);count=0;}
      if(!count)start=offset;count+=n;
    }if(count)gl.drawElements(gl.TRIANGLES,count,gl.UNSIGNED_INT,start*4);
  }
  return function draw(cam,time){
    resize();const c=cameraInfo(cam,canvas.width/canvas.height),pose=[cam.x,cam.y,cam.z,cam.yaw,cam.pitch];
    // Reproject the rough reflection between captures. Pure camera turns preserve the
    // reflected world ray, and a slightly wider capture supplies the newly visible edges.
    const dirty=bufferChanged||!lastPose||
      Math.hypot(cam.x-lastPose[0],cam.y-lastPose[1],cam.z-lastPose[2])>.042||
      Math.abs(cam.yaw-lastPose[3])>Math.min(.031,.053*c.tan[0])||Math.abs(cam.pitch-lastPose[4])>.029;
    gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D_ARRAY,atlas);
    if(dirty){
      gl.activeTexture(gl.TEXTURE2);gl.bindTexture(gl.TEXTURE_2D,null);gl.bindFramebuffer(gl.FRAMEBUFFER,fbo);gl.viewport(0,0,mw,mh);
      const guard=.89,captureVP=new Float32Array(c.vp);
      for(let col=0;col<4;col++){captureVP[4*col]*=guard;captureVP[4*col+1]*=guard;}
      const reflectVP=new Float32Array(captureVP);for(let i=4;i<=7;i++)reflectVP[i]*=-1;
      gl.depthMask(true);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);drawSky({...c,tan:[c.tan[0]/guard,c.tan[1]/guard]},-1);
      gl.useProgram(mirror.p);gl.uniformMatrix4fv(mirror.u.uVP,false,reflectVP);gl.uniform3f(mirror.u.uEye,cam.x,-cam.y,cam.z);
      drawMeshes(true,reflectVP);gl.bindFramebuffer(gl.FRAMEBUFFER,null);
      gl.activeTexture(gl.TEXTURE2);gl.bindTexture(gl.TEXTURE_2D,mirrorTex);gl.generateMipmap(gl.TEXTURE_2D);
      lastPose=pose;lastVP=captureVP;bufferChanged=false;
    }
    gl.viewport(0,0,canvas.width,canvas.height);gl.depthMask(true);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);drawSky(c,1);
    gl.activeTexture(gl.TEXTURE2);gl.bindTexture(gl.TEXTURE_2D,mirrorTex);gl.useProgram(main.p);specLights(cam);
    gl.uniformMatrix4fv(main.u.uVP,false,c.vp);gl.uniformMatrix4fv(main.u.uMirrorProjection,false,lastVP);gl.uniform3fv(main.u.uEye,c.eye);
    gl.uniform4fv(main.u.uLampPos,lampsPos);gl.uniform4fv(main.u.uLampColor,lampsColor);drawMeshes(false,c.vp);
    gl.useProgram(soft.p);gl.uniformMatrix4fv(soft.u.uVP,false,c.vp);gl.bindVertexArray(shadowVA);
    gl.enable(gl.BLEND);gl.blendFunc(gl.ZERO,gl.SRC_COLOR);gl.depthMask(false);gl.drawArraysInstanced(gl.TRIANGLE_STRIP,0,4,spots.length);
    gl.useProgram(glows.p);gl.uniformMatrix4fv(glows.u.uVP,false,c.vp);gl.uniform3fv(glows.u.uRight,c.r);gl.uniform3fv(glows.u.uUp,c.u);gl.uniform1f(glows.u.uTime,time);
    gl.enable(gl.BLEND);gl.blendFunc(gl.ONE,gl.ONE);gl.depthMask(false);gl.bindVertexArray(spr);gl.drawArraysInstanced(gl.TRIANGLE_STRIP,0,4,sprites.length/10);
    gl.depthMask(true);gl.disable(gl.BLEND);gl.bindVertexArray(null);
  };
}
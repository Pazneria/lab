"use strict";
const V = {
  add:(a,b)=>[a[0]+b[0],a[1]+b[1],a[2]+b[2]],
  sub:(a,b)=>[a[0]-b[0],a[1]-b[1],a[2]-b[2]],
  mul:(a,k)=>[a[0]*k,a[1]*k,a[2]*k],
  dot:(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2],
  cross:(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]],
  len:a=>Math.hypot(...a),
  unit(a){return this.mul(a,1/(Math.hypot(...a)||1));},
  mix:(a,b,t)=>[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t,a[2]+(b[2]-a[2])*t]
};
const UP=[0,1,0], WHITE=[1,1,1], TAU=2*Math.PI;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
function perspective(fovy,aspect,near,far){
  const s=1/Math.tan(fovy/2),d=near-far;
  return new Float32Array([s/aspect,0,0,0,0,s,0,0,0,0,(far+near)/d,-1,0,0,2*near*far/d,0]);
}
function viewMatrix(eye,target){
  const z=V.unit(V.sub(eye,target)), x=V.unit(V.cross(UP,z)), y=V.cross(z,x);
  return new Float32Array([x[0],y[0],z[0],0,x[1],y[1],z[1],0,x[2],y[2],z[2],0,-V.dot(x,eye),-V.dot(y,eye),-V.dot(z,eye),1]);
}
function mmul(a,b){
  const c=new Float32Array(16);
  for(let j=0;j<4;j++)for(let i=0;i<4;i++)c[i+4*j]=a[i]*b[4*j]+a[4+i]*b[4*j+1]+a[8+i]*b[4*j+2]+a[12+i]*b[4*j+3];
  return c;
}
function planes(m){
  const p=[];
  for(let i=0;i<3;i++)for(const s of [-1,1])p.push([m[3]+s*m[i],m[7]+s*m[i+4],m[11]+s*m[i+8],m[15]+s*m[i+12]]);
  return p;
}
function visible(bounds,ps){
  for(const [x,y,z,w] of ps)if(x*bounds[x<0?0:3]+y*bounds[y<0?1:4]+z*bounds[z<0?2:5]+w<0)return false;
  return true;
}
let randomState=0xabc52319;
function rand(a=0,b=1){randomState^=randomState<<13;randomState^=randomState>>>17;randomState^=randomState<<5;return a+(b-a)*(randomState>>>0)/4294967296;}
function hexColor(h){return [(h>>16&255)/255,(h>>8&255)/255,(h&255)/255];}

const mainVS=`#version 300 es
precision highp float;
layout(location=0) in vec3 aPos;
layout(location=1) in vec3 aNormal;
layout(location=2) in vec2 aUV;
layout(location=3) in vec3 aColor;
layout(location=4) in vec4 aFinish;
uniform mat4 uVP;
out vec3 wp;out vec3 wn;out vec2 uv;out vec3 tint;
flat out int layer;out vec3 finish;
void main(){wp=aPos;wn=aNormal;uv=aUV;tint=aColor;layer=int(aFinish.x+.5);finish=aFinish.yzw;gl_Position=uVP*vec4(wp,1.);}
`;
const mainFS=`#version 300 es
precision highp float;precision highp int;precision highp sampler2DArray;precision highp sampler2DArrayShadow;
in vec3 wp;in vec3 wn;in vec2 uv;in vec3 tint;flat in int layer;in vec3 finish;
out vec4 outColor;
uniform sampler2DArray uTiles;
uniform sampler2DArrayShadow uShadows;
uniform mat4 uLights[3];
uniform vec3 uEye;
uniform vec4 uLamp[16];uniform vec4 uColor[16];uniform int uCount;
float shadowTerm(int i,vec3 pos,float nd){
 vec4 s=uLights[i]*vec4(pos,1.0);
 vec3 q=s.xyz/s.w*.5+.5;
 if(s.w<0.0 || any(lessThan(q,vec3(.001)))||any(greaterThan(q,vec3(.999))))return .46;
 float b=.00032+.0013*(1.-nd);
 float k=.0014;
 float val=0.;
 val+=texture(uShadows,vec4(q.xy+vec2(-.75,-.30)*k,float(i),q.z-b));
 val+=texture(uShadows,vec4(q.xy+vec2(.38,-.80)*k,float(i),q.z-b));
 val+=texture(uShadows,vec4(q.xy+vec2(.80,.40)*k,float(i),q.z-b));
 val+=texture(uShadows,vec4(q.xy+vec2(-.35,.81)*k,float(i),q.z-b));
 return .20+.80*val*.25;
}
void main(){
 if(layer==50){
  float a=pow(max(0.,1.-dot(uv*2.-1.,uv*2.-1.)),2.)*finish.z;
  outColor=vec4(.075,.052,.032,a);return;
 }
 if(layer==51){
  float fringe=pow(1.-abs(uv.x*2.-1.),1.7);
  outColor=vec4(tint,fringe*(1.-uv.y)*(1.-uv.y)*finish.z);return;
 }
 vec4 texel=texture(uTiles,vec3(uv,float(min(layer,31))));
 vec3 n=normalize(wn), v=normalize(uEye-wp);
 if(!gl_FrontFacing)n=-n;
 vec3 dp1=dFdx(wp),dp2=dFdy(wp);
 vec3 r1=cross(dp2,n),r2=cross(n,dp1);
 float det=dot(dp1,r1);
 float relief=layer==0||layer==1||layer==14?.019:(layer==2||layer==3||layer==9?.010:.004);
 vec3 grad=(dFdx(texel.a)*r1+dFdy(texel.a)*r2)*sign(det)/max(abs(det),.0000001);
 n=normalize(n-clamp(grad*relief,vec3(-.40),vec3(.40)));
 vec3 albedo=pow(clamp(texel.rgb*tint,0.,1.5),vec3(2.2));
 float home=smoothstep(2.25,3.0,wp.z);
 float roost=1.-smoothstep(-5.85,-4.9,wp.z);
 float hemi=clamp(.45+.55*n.y,0.,1.);
 vec3 ambient=mix(vec3(.18,.145,.108),vec3(.42,.43,.39),hemi);
 ambient+=home*vec3(.11,.12,.115);
 ambient+=roost*mix(vec3(.145,.083,.048),vec3(.13,.145,.15),hemi);
 float nearWall=roost*max(smoothstep(6.2,8.35,abs(wp.x)),smoothstep(17.6,20.,-wp.z));
 float foot=smoothstep(-.1,1.95,wp.y);
 ambient*=.78+.22*foot-.16*nearWall*(1.-foot);
 vec3 illumination=ambient*finish.x;
 vec3 shine=vec3(0.);
 float metal=layer==5?.71:layer==6?.74:layer==12?.4:layer==11?.15:.022;
 float gloss=layer==12?44.:layer==5||layer==6?25.:15.;
 vec3 zoneWeight=vec3(smoothstep(1.55,2.80,wp.z),smoothstep(-6.65,-5.05,wp.z)*(1.-smoothstep(2.70,3.95,wp.z)),1.-smoothstep(-5.60,-4.15,wp.z));
 for(int i=0;i<16;i++){
  if(i>=uCount)break;
  float zn=uColor[i].w;
  float zone=zn<.5?zoneWeight.x:(zn<1.5?zoneWeight.y:zoneWeight.z);
  if(zone<.001)continue;
  vec3 toLight=uLamp[i].xyz-wp;float d2=dot(toLight,toLight);
  float fall=max(1.-d2/(uLamp[i].w*uLamp[i].w),0.);
  if(fall<=0.)continue;
  vec3 l=toLight*inversesqrt(max(d2,.00001));
  float nd=max(0.,dot(l,n));
  float att=fall*fall/(1.+d2*.19)*zone;
  float sh=i<3&&nd>.012?shadowTerm(i,wp,nd):1.;
  vec3 radiance=uColor[i].rgb*att;
  illumination+=radiance*(nd*sh*mix(.72,1.,finish.x)+.075*finish.x);
  shine+=radiance*sh*pow(max(dot(n,normalize(l+v)),0.),gloss)*metal*.23;
 }
 vec3 lin=albedo*illumination+shine*finish.x;
 lin+=albedo*finish.y;
 vec3 colour=clamp((lin*(2.51*lin+.03))/(lin*(2.43*lin+.59)+.14),0.,1.);
 colour=pow(colour,vec3(1./2.2));
 float distanceToEye=length(uEye-wp);
 float mist=(1.-exp(-distanceToEye*distanceToEye*.00058))*roost;
 colour=mix(colour,vec3(.47,.365,.273),mist*.56);
 if(roost>.02){
  vec3 segment=wp-uEye;
  vec3 centre=vec3(7.05,1.46,-13.05);
  float t=clamp(dot(centre-uEye,segment)/max(dot(segment,segment),.0001),0.,1.);
  vec3 delta=(uEye+t*segment-centre)*vec3(.92,1.13,.76);
  float warmth=exp(-dot(delta,delta)*.52)*.076*roost;
  colour=mix(colour,vec3(1.,.624,.296),warmth);
 }
 outColor=vec4(colour,finish.z);
}`;
const depthVS=`#version 300 es
layout(location=0) in vec3 aPos;layout(location=4) in vec4 aFinish;
uniform mat4 uVP;void main(){gl_Position=uVP*vec4(aPos,1.);if(aFinish.z>1.)gl_Position=vec4(2.,2.,2.,1.);}`;
const depthFS=`#version 300 es
precision mediump float;void main(){}`;
// First three lights have stationary, precomputed depth maps.
const lightSources=[
 {p:[-4.50,3.04,6.65],target:[1.4,.63,5.85],fov:111,r:12,c:[11.5,11.8,10.2],zone:0},
 {p:[7.89,1.65,-13.00],target:[.0,1.45,-12.7],fov:119,r:19,c:[27.0,10.9,3.50],zone:2},
 {p:[-1.3,7.35,-19.25],target:[.4,1.0,-10.5],fov:116,r:26,c:[24.0,22.3,17.0],zone:2}
];
function lamp(p,r,c,zone){lightSources.push({p,r,c,zone});}
function createProgram(gl,v,f){
 function compile(type,src){
  const s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);
  if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(s));
  return s;
 }
 const vs=compile(gl.VERTEX_SHADER,v),fs=compile(gl.FRAGMENT_SHADER,f),p=gl.createProgram();
 gl.attachShader(p,vs);gl.attachShader(p,fs);gl.linkProgram(p);gl.deleteShader(vs);gl.deleteShader(fs);
 if(!gl.getProgramParameter(p,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(p));
 return p;
}
function openingPlanes(eye,z,half,high){
 const pts=[[.56-half,-.16,z],[.56+half,-.16,z],[.56+half,high,z],[.56-half,high,z]],center=[.56,high*.49,z];
 return pts.map((p,i)=>{
  let n=V.cross(V.sub(p,eye),V.sub(pts[(i+1)%4],eye));
  if(V.dot(n,V.sub(center,eye))<0)n=V.mul(n,-1);
  return [...n,-V.dot(n,eye)];
 });
}
function renderer(canvas,gl,groups,tiles,packed){
 const main=createProgram(gl,mainVS,mainFS),depth=createProgram(gl,depthVS,depthFS);
 const loc=(p,s)=>gl.getUniformLocation(p,s);
 const drawLoc=loc(main,"uVP"),eyeLoc=loc(main,"uEye"),shadowLoc=loc(depth,"uVP");
 // All static geometry shares one VAO, index buffer, and texture array.
 let vs,idx,ranges;
 if(packed){vs=packed.v;idx=packed.i;ranges=packed.ranges;}
 else{
  let nv=0,ni=0;for(const g of groups){nv+=g.v.length;ni+=g.i.length;}
  vs=new Float32Array(nv);idx=new Uint32Array(ni);ranges=[];let vi=0,ii=0;
  for(const g of groups){
   vs.set(g.v,vi);const base=vi/15;for(let j=0;j<g.i.length;j++)idx[ii+j]=g.i[j]+base;
   ranges.push({name:g.name,start:ii*4,count:g.i.length,bounds:g.bounds,alpha:g.alpha});
   vi+=g.v.length;ii+=g.i.length;g.v.length=0;g.i.length=0;
  }
 }
 const vao=gl.createVertexArray();gl.bindVertexArray(vao);
 const vb=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,vb);gl.bufferData(gl.ARRAY_BUFFER,vs,gl.STATIC_DRAW);
 const ib=gl.createBuffer();gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,ib);gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,idx,gl.STATIC_DRAW);
 const format=packed?[[3,gl.FLOAT,false,0],[3,gl.SHORT,true,12],[2,gl.HALF_FLOAT,false,18],[3,gl.HALF_FLOAT,false,22],[4,gl.HALF_FLOAT,false,28]]:[[3,gl.FLOAT,false,0],[3,gl.FLOAT,false,12],[2,gl.FLOAT,false,24],[3,gl.FLOAT,false,32],[4,gl.FLOAT,false,44]];
 format.forEach(([n,type,normalized,offset],i)=>{gl.enableVertexAttribArray(i);gl.vertexAttribPointer(i,n,type,normalized,packed?36:60,offset);});
 const sm=gl.createTexture();gl.activeTexture(gl.TEXTURE1);gl.bindTexture(gl.TEXTURE_2D_ARRAY,sm);
 const size=1024;gl.texStorage3D(gl.TEXTURE_2D_ARRAY,1,gl.DEPTH_COMPONENT24,size,size,3);
 for(const pname of [gl.TEXTURE_MIN_FILTER,gl.TEXTURE_MAG_FILTER])gl.texParameteri(gl.TEXTURE_2D_ARRAY,pname,gl.LINEAR);
 for(const pname of [gl.TEXTURE_WRAP_S,gl.TEXTURE_WRAP_T])gl.texParameteri(gl.TEXTURE_2D_ARRAY,pname,gl.CLAMP_TO_EDGE);
 gl.texParameteri(gl.TEXTURE_2D_ARRAY,gl.TEXTURE_COMPARE_MODE,gl.COMPARE_REF_TO_TEXTURE);
 gl.texParameteri(gl.TEXTURE_2D_ARRAY,gl.TEXTURE_COMPARE_FUNC,gl.LEQUAL);
 const fb=gl.createFramebuffer();gl.bindFramebuffer(gl.FRAMEBUFFER,fb);gl.drawBuffers([gl.NONE]);gl.readBuffer(gl.NONE);
 gl.enable(gl.DEPTH_TEST);gl.depthFunc(gl.LEQUAL);gl.disable(gl.CULL_FACE);gl.viewport(0,0,size,size);gl.useProgram(depth);
 const lightMats=[];gl.enable(gl.POLYGON_OFFSET_FILL);gl.polygonOffset(1.4,1.6);
 for(let j=0;j<3;j++){
   const s=lightSources[j],m=mmul(perspective(s.fov*Math.PI/180,1,.16,38),viewMatrix(s.p,s.target));lightMats.push(...m);
   gl.framebufferTextureLayer(gl.FRAMEBUFFER,gl.DEPTH_ATTACHMENT,sm,0,j);
   if(gl.checkFramebufferStatus(gl.FRAMEBUFFER)!==gl.FRAMEBUFFER_COMPLETE)throw Error("Unable to initialize a WebGL 2 depth attachment.");
   gl.clear(gl.DEPTH_BUFFER_BIT);gl.uniformMatrix4fv(shadowLoc,false,m);const fr=planes(m);
   for(const r of ranges)if(!r.alpha&&visible(r.bounds,fr))gl.drawElements(gl.TRIANGLES,r.count,gl.UNSIGNED_INT,r.start);
 }
 gl.disable(gl.POLYGON_OFFSET_FILL);gl.bindFramebuffer(gl.FRAMEBUFFER,null);gl.deleteFramebuffer(fb);gl.useProgram(main);
 gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D_ARRAY,tiles);
 gl.uniform1i(loc(main,"uTiles"),0);gl.uniform1i(loc(main,"uShadows"),1);gl.uniformMatrix4fv(loc(main,"uLights[0]"),false,new Float32Array(lightMats));
 const ls=lightSources.slice(0,16);gl.uniform1i(loc(main,"uCount"),ls.length);
 gl.uniform4fv(loc(main,"uLamp[0]"),new Float32Array(ls.flatMap(s=>[...s.p,s.r])));
 gl.uniform4fv(loc(main,"uColor[0]"),new Float32Array(ls.flatMap(s=>[...s.c,s.zone])));
 gl.clearColor(.23,.205,.17,1);gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);
 return function draw(eye,forward){
  const scale=Math.min(window.devicePixelRatio||1,1.5,Math.sqrt(2400000/(Math.max(1,canvas.clientWidth*canvas.clientHeight))));
  const w=Math.max(1,Math.round(canvas.clientWidth*scale)),h=Math.max(1,Math.round(canvas.clientHeight*scale));
  if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;}
  gl.viewport(0,0,w,h);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
  const vp=mmul(perspective(66*Math.PI/180,w/h,.055,65),viewMatrix(eye,V.add(eye,forward)));
  const fr=planes(vp);gl.uniformMatrix4fv(drawLoc,false,vp);gl.uniform3fv(eyeLoc,eye);
  const gates=[];
  for(const [z,half,high] of [[2.70,1.06,2.55],[-5.34,1.21,2.91]]){
   if(Math.abs(eye[2]-z)>.65)gates.push({z,forward:eye[2]>z,planes:openingPlanes(eye,z,half,high)});
  }
  const pass=r=>visible(r.bounds,fr)&&gates.every(g=>{
   const beyond=g.forward?r.bounds[5]<g.z-.47:r.bounds[2]>g.z+.47;
   return !beyond||visible(r.bounds,g.planes);
  });
  for(const r of ranges)if(!r.alpha&&pass(r))gl.drawElements(gl.TRIANGLES,r.count,gl.UNSIGNED_INT,r.start);
  gl.enable(gl.BLEND);gl.depthMask(false);
  for(const r of ranges)if(r.alpha&&pass(r))gl.drawElements(gl.TRIANGLES,r.count,gl.UNSIGNED_INT,r.start);
  gl.depthMask(true);gl.disable(gl.BLEND);
 };
}


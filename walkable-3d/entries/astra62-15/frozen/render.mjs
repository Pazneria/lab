import {makeAtlas} from './artwork.mjs'
const vertexSource=`#version 300 es
precision highp float;
precision highp int;
layout(location=0) in vec3 aPos;
layout(location=1) in vec2 aOct;
layout(location=2) in vec2 aUV;
layout(location=3) in vec4 aColorMaterial;
layout(location=4) in vec2 aAmbient;
layout(location=5) in vec4 aLamps;
uniform mat4 uVP;
out vec3 vWorld;out vec3 vNormal;out vec2 vUV;out vec3 vColor;
out vec2 vAmbient;out vec4 vLamps;flat out int vMaterial;
void main(){
 vWorld=aPos*(1./4096.);vUV=aUV*(1./1024.);
 vec3 n=vec3(aOct,1.-abs(aOct.x)-abs(aOct.y));
 if(n.z<0.)n.xy=(1.-abs(n.yx))*mix(vec2(-1.),vec2(1.),step(vec2(0.),n.xy));
 vNormal=normalize(n);vColor=aColorMaterial.rgb;vMaterial=int(aColorMaterial.a*255.+.5);
 vAmbient=aAmbient;vLamps=aLamps;gl_Position=uVP*vec4(vWorld,1.);
}`
const fragmentSource=`#version 300 es
precision highp float;
precision highp int;
precision highp sampler2DArray;precision highp sampler2DShadow;
in vec3 vWorld;in vec3 vNormal;in vec2 vUV;in vec3 vColor;in vec2 vAmbient;in vec4 vLamps;flat in int vMaterial;
uniform sampler2DArray uAtlas;uniform sampler2DShadow uDepth;
uniform mat4 uSunMatrix;uniform vec3 uEye;uniform vec4 uLights[3];uniform vec3 uLightColors[3];uniform float uTexel;
out vec4 frag;
const vec3 sun=vec3(-.8079,.49355,.32437);
float visibility(vec3 N){vec3 p=(uSunMatrix*vec4(vWorld+N*.0017,1.)).xyz*.5+.5;
 if(any(lessThan(p,vec3(0.)))||any(greaterThan(p,vec3(1.))))return 0.;
 float z=p.z-(.00010+.00016*(1.-max(dot(N,sun),0.)));float r=uTexel*2.45;
 float s=texture(uDepth,vec3(p.xy+vec2(-.71,-.42)*r,z))+texture(uDepth,vec3(p.xy+vec2(.37,-.79)*r,z))
 +texture(uDepth,vec3(p.xy+vec2(.68,.16)*r,z))+texture(uDepth,vec3(p.xy+vec2(-.26,.70)*r,z));
 return s*.25;}
float beam(vec3 a,vec3 b,vec3 lo,vec3 hi,float dist){
 vec3 d=b-a,inv=1./(sign(d)*max(abs(d),vec3(.00001))+vec3(.0000001));vec3 t0=(lo-a)*inv,t1=(hi-a)*inv;
 vec3 tmin=min(t0,t1),tmax=max(t0,t1);float l=max(0.,max(tmin.x,max(tmin.y,tmin.z))),h=min(1.,min(tmax.x,min(tmax.y,tmax.z)));
 return max(0.,h-l)*dist;}
vec3 westBeam(vec3 p){float k=p.x+4.33;return vec3(k,p.y+k*.61094,p.z+k*.40149);}
vec3 southBeam(vec3 p){float k=4.035-p.z;return vec3(k,p.y+k*1.5216,p.x-k*2.4907);}
vec3 film(vec3 x){return clamp((x*(2.51*x+.03))/(x*(2.43*x+.59)+.14),0.,1.);}
void main(){
 int m=vMaterial;vec3 albedo=texture(uAtlas,vec3(vUV,float(m))).rgb;
 bool printed=m>=11&&m!=17;vec3 srgb=clamp(vColor*albedo*(printed?1.:1.085),.001,1.);
 vec3 base=pow(srgb,vec3(2.2));vec3 N=normalize(vNormal)*(gl_FrontFacing?1.:-1.);
 vec3 view=uEye-vWorld;float dist=max(.01,length(view));vec3 V=view/dist;
 float height=dot(albedo,vec3(.27,.56,.17));
 vec3 ax=dFdx(vWorld),ay=dFdy(vWorld),r1=cross(ay,N),r2=cross(N,ax);float det=dot(ax,r1);
 float relief=m==1?.0031:(m==2||m==8?.0021:(m==3||m==4||m==11||m==12||m==17||m==20||m==21?.0013:.00028));
 vec3 slope=(dFdx(height)*r1+dFdy(height)*r2)*sign(det)/max(abs(det),.000000025);
 N=normalize(N-clamp(slope*relief,vec3(-.27),vec3(.27)));
 float ao=mix(.24,1.,pow(clamp(vAmbient.x,0.,1.),.88)),up=N.y*.5+.5;
 vec3 ambient=mix(vec3(.41,.335,.261),vec3(.563,.60,.575),up)*ao;
 ambient+=vec3(.25,.15,.075)*vLamps.w*ao;
 ambient+=vec3(1.18,1.27,1.21)*vAmbient.y*1.55;
 float sunL=max(dot(N,sun),0.);float sh=sunL>.001?visibility(N):0.;
 vec3 lit=ambient+vec3(2.40,1.79,1.12)*sunL*sh;
 float metal=m==5?1.:0.,ceramic=m==10?1.:0.,leather=m==7?1.:0.;
 float gloss=.075+metal*.88+ceramic*.41+leather*.15;
 float exponent=26.+85.*metal+72.*ceramic+14.*leather;
 vec3 specColor=mix(vec3(1.),mix(vec3(.45),srgb,.8),metal);
 vec3 spec=specColor*gloss*vec3(1.46,1.16,.83)*sh*pow(max(dot(N,normalize(sun+V)),0.),exponent);
 for(int i=0;i<3;i++){if(vLamps[i]<.004)continue;vec3 delta=uLights[i].xyz-vWorld;float d2=max(.009,dot(delta,delta));vec3 L=delta*inversesqrt(d2);
 float ndl=max(dot(N,L),0.),hot=uLights[i].w*vLamps[i]/(.255+d2*1.64);
 hot*=1.-smoothstep(.02,27.,d2);vec3 lamp=uLightColors[i]*hot;
 lit+=lamp*(.045*ao+ndl);spec+=specColor*gloss*lamp*pow(max(dot(N,normalize(L+V)),0.),exponent)*.73;}
 vec3 result=base*lit+spec;
 float grazing=pow(1.-clamp(dot(N,V),0.,1.),3.);
 if(metal>.5){vec3 R=reflect(-V,N);float sky=pow(max(0.,dot(R,normalize(vec3(-.87,.32,.14)))),6.);
  result+=srgb*(.065+.19*max(R.y,0.)+.24*sky+.19*grazing)*(.55+.45*ao);}
 if(m==3||m==4||m==11||m==12||m==17||m==20||m==21)result+=srgb*.062*grazing*ao;
 if(m==16)result=base*1.19+vec3(.075,.070,.047);
 if(m==25)result=base*2.75+vec3(.15,.066,.017);
 // A short analytic ray/box intersection gives sunlight a little visible dust.
 vec3 a=westBeam(uEye),b=westBeam(vWorld);
 float haze=beam(a,b,vec3(.09,1.02,-1.28),vec3(5.0,2.65,.91),dist);
 haze+=beam(southBeam(uEye),southBeam(vWorld),vec3(.09,1.16,1.65),vec3(2.8,2.67,3.70),dist)*.76;
 result=mix(result,vec3(1.25,.98,.65),1.-exp(-haze*.012));
 vec3 mapped=pow(film(result*.93),vec3(1./2.2));frag=vec4(mapped,1.);
}`
const depthVS=`#version 300 es
layout(location=0) in vec3 aPos;uniform mat4 uM;
void main(){gl_Position=uM*vec4(aPos*(1./4096.),1.);}`
const depthFS=`#version 300 es
precision mediump float;
void main(){}`
const particleVS=`#version 300 es
precision highp float;
layout(location=0) in vec4 aDust;uniform mat4 uVP;uniform vec3 uEye;uniform float uTime;uniform float uSize;out float vA;
void main(){float k=aDust.w;vec3 p=aDust.xyz+vec3(.034*sin(uTime*.13+k),.046*sin(uTime*.18+k*1.9),.036*cos(uTime*.12+k*3.));
 gl_Position=uVP*vec4(p,1.);gl_PointSize=clamp(uSize*(.0018+.0011*fract(k*2.17))/max(.16,gl_Position.w),1.1,5.3);
 vA=(.13+.25*pow(.5+.5*cos(k+uTime*.21),3.))*smoothstep(.1,.55,length(uEye-p));}`
const particleFS=`#version 300 es
precision mediump float;in float vA;out vec4 frag;
void main(){float r=length(gl_PointCoord-.5)*2.;frag=vec4(1.,.88,.65,vA*(1.-smoothstep(.12,1.,r)));}`
const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]],dot=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2],unit=a=>{const l=Math.hypot(...a);return a.map(x=>x/l)}
function view(eye,forward){const z=unit(forward.map(x=>-x)),x=unit(cross([0,1,0],z)),y=cross(z,x)
 return [x[0],y[0],z[0],0,x[1],y[1],z[1],0,x[2],y[2],z[2],0,-dot(x,eye),-dot(y,eye),-dot(z,eye),1]}
function mm(a,b){const o=new Float32Array(16);for(let c=0;c<4;c++)for(let r=0;r<4;r++)o[c*4+r]=a[r]*b[c*4]+a[4+r]*b[c*4+1]+a[8+r]*b[c*4+2]+a[12+r]*b[c*4+3];return o}
function ortho(w,h,n,f){return [1/w,0,0,0,0,1/h,0,0,0,0,-2/(f-n),0,0,0,-(f+n)/(f-n),1]}
function perspective(fov,aspect,n=.038,f=30){const t=1/Math.tan(fov/2);return [t/aspect,0,0,0,0,t,0,0,0,0,(f+n)/(n-f),-1,0,0,2*f*n/(n-f),0]}
function program(gl,vs,fs){const shaders=[];for(const [type,src] of [[gl.VERTEX_SHADER,vs],[gl.FRAGMENT_SHADER,fs]]){const s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(s));shaders.push(s)}
 const p=gl.createProgram();for(const s of shaders)gl.attachShader(p,s);gl.linkProgram(p);if(!gl.getProgramParameter(p,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(p));for(const s of shaders)gl.deleteShader(s);return p}
async function loadMesh(){const res=await fetch('./rooms.bin.gz');if(!res.ok)throw Error('The compiled room data could not be read.')
 if(!globalThis.DecompressionStream)throw Error('This scene needs a browser with gzip decompression support.')
 const bytes=await res.arrayBuffer(),b=new Uint8Array(bytes);const raw=b[0]===31&&b[1]===139?await new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'))).arrayBuffer():bytes
 const len=new DataView(raw).getUint32(0,true),meta=JSON.parse(new TextDecoder().decode(new Uint8Array(raw,4,len))),start=4+((len+3)&~3)
 const ib=start+meta.vertices*24,sw=ib+meta.indices*4
 if(meta.version!==2||raw.byteLength!==sw+meta.swatchBytes)throw Error('The room asset and renderer versions do not match.')
 return {meta,vertices:new Uint8Array(raw,start,meta.vertices*24),indices:new Uint32Array(raw,ib,meta.indices),swatches:new Uint8Array(raw,sw,meta.swatchBytes)}}
function planes(M){const planes=[];for(let axis=0;axis<3;axis++)for(const side of [-1,1])planes.push([M[3]+side*M[axis],M[7]+side*M[4+axis],M[11]+side*M[8+axis],M[15]+side*M[12+axis]]);return planes}
function inside(planes,b){for(const p of planes){const x=p[0]>0?b.hi[0]:b.lo[0],y=p[1]>0?b.hi[1]:b.lo[1],z=p[2]>0?b.hi[2]:b.lo[2];if(x*p[0]+y*p[1]+z*p[2]+p[3]<-.008)return false}return true}
const portals=[{a:1,b:2,lo:[.49,-.05,-2.99],hi:[.81,2.59,-1.16]},{a:1,b:3,lo:[.49,-.05,1.29],hi:[.81,2.59,3.15]},{a:2,b:3,lo:[1.27,-.05,-.41],hi:[3.04,2.59,-.09]}]
function visibleRooms(eye,frustum){let mask=1<<(eye[0]<.65?1:eye[2]<-.25?2:3)
 for(let k=0;k<2;k++)for(const p of portals){const both=(1<<p.a)|(1<<p.b);if((mask&both)&&(mask&both)!==both&&inside(frustum,p))mask|=both}return mask|1}
export async function createRenderer(canvas,status){
 const gl=canvas.getContext('webgl2',{antialias:true,alpha:false,depth:true,stencil:false,preserveDrawingBuffer:false,powerPreference:'high-performance'})
 if(!gl)throw Error('WebGL 2 is required. Enable hardware acceleration and reload.')
 const scene=program(gl,vertexSource,fragmentSource),depth=program(gl,depthVS,depthFS),particles=program(gl,particleVS,particleFS)
 const {meta,vertices,indices,swatches}=await loadMesh()
 const atlas=await makeAtlas(gl,swatches,n=>status?.('Preparing rooms… '+Math.round(n/28*95)+'%'))
 const vao=gl.createVertexArray();gl.bindVertexArray(vao)
 const vb=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,vb);gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW)
 const ib=gl.createBuffer();gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,ib);gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,indices,gl.STATIC_DRAW)
 for(const [id,n,type,normalized,offset] of [[0,3,gl.SHORT,false,0],[1,2,gl.SHORT,true,6],[2,2,gl.SHORT,false,10],[3,4,gl.UNSIGNED_BYTE,true,14],[4,2,gl.UNSIGNED_BYTE,true,18],[5,4,gl.UNSIGNED_BYTE,true,20]]){gl.enableVertexAttribArray(id);gl.vertexAttribPointer(id,n,type,normalized,24,offset)}
 const sun=unit([-.807,.493,.324]),target=[-.08,1.19,.19],sunEye=target.map((v,i)=>v+sun[i]*13)
 const lightMatrix=mm(ortho(6.02,5.09,5,21),view(sunEye,sun.map(v=>-v)))
 const depthSize=Math.min(3072,gl.getParameter(gl.MAX_TEXTURE_SIZE)),shadowTex=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,shadowTex);gl.texStorage2D(gl.TEXTURE_2D,1,gl.DEPTH_COMPONENT24,depthSize,depthSize)
 for(const [p,v] of [[gl.TEXTURE_MIN_FILTER,gl.LINEAR],[gl.TEXTURE_MAG_FILTER,gl.LINEAR],[gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE],[gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE],[gl.TEXTURE_COMPARE_MODE,gl.COMPARE_REF_TO_TEXTURE],[gl.TEXTURE_COMPARE_FUNC,gl.LEQUAL]])gl.texParameteri(gl.TEXTURE_2D,p,v)
 const fb=gl.createFramebuffer();gl.bindFramebuffer(gl.FRAMEBUFFER,fb);gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.DEPTH_ATTACHMENT,gl.TEXTURE_2D,shadowTex,0);gl.drawBuffers([gl.NONE]);gl.readBuffer(gl.NONE)
 if(gl.checkFramebufferStatus(gl.FRAMEBUFFER)!==gl.FRAMEBUFFER_COMPLETE)throw Error('The daylight shadow buffer could not be created.')
 gl.viewport(0,0,depthSize,depthSize);gl.enable(gl.DEPTH_TEST);gl.clear(gl.DEPTH_BUFFER_BIT);gl.useProgram(depth);gl.uniformMatrix4fv(gl.getUniformLocation(depth,'uM'),false,lightMatrix)
 gl.enable(gl.POLYGON_OFFSET_FILL);gl.polygonOffset(1.0,1.8)
 for(const b of meta.chunks)if(b.cast)gl.drawElements(gl.TRIANGLES,b.cast,gl.UNSIGNED_INT,b.first*4)
 gl.disable(gl.POLYGON_OFFSET_FILL);gl.bindFramebuffer(gl.FRAMEBUFFER,null);gl.deleteFramebuffer(fb);gl.deleteProgram(depth)
 const uni=(p,name)=>gl.getUniformLocation(p,name),eyeLoc=uni(scene,'uEye'),vpLoc=uni(scene,'uVP')
 gl.useProgram(scene);gl.uniformMatrix4fv(uni(scene,'uSunMatrix'),false,lightMatrix);gl.uniform1f(uni(scene,'uTexel'),1/depthSize)
 gl.uniform1i(uni(scene,'uAtlas'),0);gl.uniform1i(uni(scene,'uDepth'),1);gl.uniform4fv(uni(scene,'uLights[0]'),meta.lights.flatMap(l=>[...l.p,l.power]))
 gl.uniform3fv(uni(scene,'uLightColors[0]'),meta.lights.flatMap(l=>l.c.map(c=>c**1.85)))
 gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D_ARRAY,atlas);gl.activeTexture(gl.TEXTURE1);gl.bindTexture(gl.TEXTURE_2D,shadowTex)
 const dustVAO=gl.createVertexArray();gl.bindVertexArray(dustVAO);const dust=[],frac=x=>x-Math.floor(x),r=i=>frac(Math.sin(i*125.63+5.3)*43758.5453)
 for(let i=0;i<120;i++){const k=.2+2.55*r(i*4+1),y=1.1+1.49*r(i*4+2)-k*.611,z=-1.27+2.18*r(i*4+3)-k*.4015;if(y>.28)dust.push(-4.33+k,y,z,r(i*4+4)*100)}
 gl.bindBuffer(gl.ARRAY_BUFFER,gl.createBuffer());gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(dust),gl.STATIC_DRAW);gl.enableVertexAttribArray(0);gl.vertexAttribPointer(0,4,gl.FLOAT,false,16,0)
 const pVP=uni(particles,'uVP'),pEye=uni(particles,'uEye'),pTime=uni(particles,'uTime'),pSize=uni(particles,'uSize')
 const visible=[]
 for(const b of meta.chunks)b.center=b.lo.map((x,i)=>(x+b.hi[i])*.5)
 gl.clearColor(.18,.21,.19,1);let width=0,height=0,projection=null
 function draw(eye,yaw,pitch,time){const cssW=canvas.clientWidth,cssH=canvas.clientHeight,scale=Math.min(devicePixelRatio||1,1.65,Math.sqrt(2600000/(cssW*cssH)))
  const w=Math.max(1,Math.floor(cssW*scale)),h=Math.max(1,Math.floor(cssH*scale));if(w!==width||h!==height){canvas.width=w;canvas.height=h;width=w;height=h;projection=perspective((w/h<1?68:60)*Math.PI/180,w/h)}
  const cp=Math.cos(pitch),forward=[Math.sin(yaw)*cp,Math.sin(pitch),-Math.cos(yaw)*cp],vp=mm(projection,view(eye,forward)),fr=planes(vp),rooms=visibleRooms(eye,fr)
  gl.viewport(0,0,w,h);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);gl.bindVertexArray(vao);gl.useProgram(scene);gl.uniformMatrix4fv(vpLoc,false,vp);gl.uniform3fv(eyeLoc,eye)
  visible.length=0
  for(const b of meta.chunks)if((rooms&(1<<b.room))&&inside(fr,b)){
   b.distance=(b.center[0]-eye[0])*forward[0]+(b.center[1]-eye[1])*forward[1]+(b.center[2]-eye[2])*forward[2];visible.push(b)}
  visible.sort((a,b)=>a.distance-b.distance)
  for(const b of visible)gl.drawElements(gl.TRIANGLES,b.count,gl.UNSIGNED_INT,b.first*4)
  gl.useProgram(particles);gl.bindVertexArray(dustVAO);gl.uniformMatrix4fv(pVP,false,vp);gl.uniform3fv(pEye,eye);gl.uniform1f(pTime,time);gl.uniform1f(pSize,h)
  gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);gl.depthMask(false);gl.drawArrays(gl.POINTS,0,dust.length/4);gl.depthMask(true);gl.disable(gl.BLEND)
 }
 return {draw,meta}
}

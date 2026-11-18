import {stoneVertex,stoneFragment,shadowVertex,shadowFragment,waterVertex,waterFragment,skyVertex,skyFragment} from './shaders.mjs';
import {TAU,point,poolR,floorY} from './landform.mjs';
export const dot=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2];
const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
const unit=a=>{const l=Math.hypot(...a)||1;return [a[0]/l,a[1]/l,a[2]/l];};
const m4=()=>new Float32Array(16);
function product(out,a,b){
 for(let c=0;c<4;c++)for(let r=0;r<4;r++)out[c*4+r]=a[r]*b[c*4]+a[4+r]*b[c*4+1]+a[8+r]*b[c*4+2]+a[12+r]*b[c*4+3];
 return out;
}
function perspective(fovy,aspect,near,far){
 const f=1/Math.tan(fovy*.5),z=1/(near-far);
 return new Float32Array([f/aspect,0,0,0,0,f,0,0,0,0,(far+near)*z,-1,0,0,2*far*near*z,0]);
}
function ortho(r,n,f){return new Float32Array([1/r,0,0,0,0,1/r,0,0,0,0,-2/(f-n),0,0,0,-(f+n)/(f-n),1]);}
function viewMatrix(eye,fwd,up,right=cross(fwd,up)){
 return new Float32Array([right[0],up[0],-fwd[0],0,right[1],up[1],-fwd[1],0,right[2],up[2],-fwd[2],0,-dot(right,eye),-dot(up,eye),dot(fwd,eye),1]);
}
function frame(fwd,hint){
 const forward=unit(fwd),right=unit(cross(forward,hint)),up=cross(right,forward);
 return {forward,right,up};
}
function frustum(out,m){
 for(let p=0;p<6;p++){
   const row=p>>1,s=(p&1)?-1:1;
   for(let k=0;k<4;k++)out[p*4+k]=m[k*4+3]+s*m[k*4+row];
 }
}
function visible(c,planes){
 for(let i=0;i<24;i+=4){
   const a=planes[i],b=planes[i+1],d=planes[i+2],w=planes[i+3];
   if(a*(a>0?c.hi[0]:c.lo[0])+b*(b>0?c.hi[1]:c.lo[1])+d*(d>0?c.hi[2]:c.lo[2])+w<0)return false;
 }
 return true;
}
async function getFile(name,as){
 const res=await fetch(new URL(name,import.meta.url));
 if(!res.ok)throw new Error(name+' returned HTTP '+res.status);
 return res[as]();
}
function program(gl,name,vert,frag){
 function compile(type,source){
   const shader=gl.createShader(type);gl.shaderSource(shader,source);gl.compileShader(shader);
   if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS)){const log=gl.getShaderInfoLog(shader);gl.deleteShader(shader);throw Error(name+' shader: '+log);}
   return shader;
 }
 const v=compile(gl.VERTEX_SHADER,vert),f=compile(gl.FRAGMENT_SHADER,frag),p=gl.createProgram();
 gl.attachShader(p,v);gl.attachShader(p,f);gl.linkProgram(p);
 gl.deleteShader(v);gl.deleteShader(f);
 if(!gl.getProgramParameter(p,gl.LINK_STATUS))throw Error(name+' program: '+gl.getProgramInfoLog(p));
 const loc={};
 for(let i=0;i<gl.getProgramParameter(p,gl.ACTIVE_UNIFORMS);i++){
   const u=gl.getActiveUniform(p,i);loc[u.name]=gl.getUniformLocation(p,u.name);
 }
 return {p,loc};
}
function makeBuffer(gl,target,data){
 const b=gl.createBuffer();gl.bindBuffer(target,b);gl.bufferData(target,data,gl.STATIC_DRAW);return b;
}
function texture2d(gl,unitNumber,bitmap,aniso,maxAniso){
 gl.activeTexture(gl.TEXTURE0+unitNumber);const t=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,t);
 gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA8,gl.RGBA,gl.UNSIGNED_BYTE,bitmap);
 gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR_MIPMAP_LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
 gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.REPEAT);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.REPEAT);
 gl.generateMipmap(gl.TEXTURE_2D);
 if(aniso)gl.texParameterf(gl.TEXTURE_2D,aniso.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(4,maxAniso));
 bitmap.close?.();return t;
}
async function bitmapFile(file){
 const blob=await getFile(file,'blob');
 if(typeof createImageBitmap==='function'){
   try{return await createImageBitmap(blob,{premultiplyAlpha:'none',colorSpaceConversion:'none'});}catch{/* Older browsers use the image decoder below. */}
 }
 const img=new Image(),url=URL.createObjectURL(blob);
 try{img.src=url;await img.decode();return img;}finally{URL.revokeObjectURL(url);}
}
function readyFbo(gl,label){if(gl.checkFramebufferStatus(gl.FRAMEBUFFER)!==gl.FRAMEBUFFER_COMPLETE)throw Error(label+' framebuffer is unavailable.');}
function waterGeometry(gl){
 const nu=256,nr=24,verts=[],indices=[];
 for(let j=0;j<=nr;j++)for(let i=0;i<nu;i++){
   const t=i*TAU/nu,[x,z]=point(t,(poolR(t)+.39)*j/nr);
   verts.push(x,z,Math.max(0,.012-floorY(x,z)));
   if(j<nr){const a=j*nu+i,b=j*nu+(i+1)%nu;indices.push(a,b,a+nu,b,b+nu,a+nu);}
 }
 const vao=gl.createVertexArray();gl.bindVertexArray(vao);
 makeBuffer(gl,gl.ARRAY_BUFFER,new Float32Array(verts));
 gl.enableVertexAttribArray(0);gl.vertexAttribPointer(0,3,gl.FLOAT,false,12,0);
 makeBuffer(gl,gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(indices));gl.bindVertexArray(null);
 return {vao,count:indices.length};
}
export async function makeRenderer(canvas,status) {
 const gl=canvas.getContext('webgl2',{antialias:true,alpha:false,stencil:false,powerPreference:'high-performance',preserveDrawingBuffer:false});
 if(!gl)throw Error('WebGL 2 is unavailable. Enable hardware acceleration or open this build in a WebGL 2 browser.');
 status('Opening cavern…');
 const [mesh,field,navBuffer,bedding,pavement,ripple,vData]=await Promise.all([
   getFile('cavern.mesh','arrayBuffer'),getFile('field.json','json'),getFile('clearance.bin','arrayBuffer'),
   bitmapFile('bedding.png'),bitmapFile('pavement.png'),bitmapFile('water-detail.png'),getFile('mineral.volume','arrayBuffer')
 ]);
 const header=new DataView(mesh),nv=header.getUint32(4,true),nidx=header.getUint32(8,true),stride=header.getUint32(12,true);
 if(header.getUint32(0)!==0x484d4332||stride!==28||mesh.byteLength!==16+nv*stride+nidx*4)throw Error('Cavern geometry is incomplete.');
 const opaque=program(gl,'Limestone',stoneVertex,stoneFragment),shadow=program(gl,'Sunlight',shadowVertex,shadowFragment);
 const sky=program(gl,'Sky',skyVertex,skyFragment),water=program(gl,'Pool',waterVertex,waterFragment);
 const vao=gl.createVertexArray();gl.bindVertexArray(vao);
 makeBuffer(gl,gl.ARRAY_BUFFER,new Uint8Array(mesh,16,nv*stride));
 makeBuffer(gl,gl.ELEMENT_ARRAY_BUFFER,new Uint32Array(mesh,16+nv*stride,nidx));
 for(const [n,count,type,normalized,offset] of [
   [0,3,gl.FLOAT,false,0],[1,3,gl.SHORT,true,12],[2,3,gl.UNSIGNED_BYTE,true,18],
   [3,1,gl.UNSIGNED_BYTE,false,21],[4,4,gl.UNSIGNED_BYTE,true,22],[5,2,gl.UNSIGNED_BYTE,true,26]
 ]){gl.enableVertexAttribArray(n);gl.vertexAttribPointer(n,count,type,normalized,stride,offset);}
 gl.bindVertexArray(null);
 const waterGeo=waterGeometry(gl);
 gl.pixelStorei(gl.UNPACK_COLORSPACE_CONVERSION_WEBGL,gl.NONE);
 gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,false);
 const anis=gl.getExtension('EXT_texture_filter_anisotropic'),maxA=anis?gl.getParameter(anis.MAX_TEXTURE_MAX_ANISOTROPY_EXT):1;
 texture2d(gl,0,bedding,anis,maxA);texture2d(gl,1,pavement,anis,maxA);texture2d(gl,3,ripple,anis,2);
 gl.activeTexture(gl.TEXTURE2);
 const vol=gl.createTexture();gl.bindTexture(gl.TEXTURE_3D,vol);
 gl.texImage3D(gl.TEXTURE_3D,0,gl.RGBA8,48,48,48,0,gl.RGBA,gl.UNSIGNED_BYTE,new Uint8Array(vData));
 gl.texParameteri(gl.TEXTURE_3D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_3D,gl.TEXTURE_MIN_FILTER,gl.LINEAR_MIPMAP_LINEAR);
 gl.generateMipmap(gl.TEXTURE_3D);
 const sunDir=unit([.422,.875,-.235]),sunEye=sunDir.map((v,i)=>v*36+(i===1?2:0));
 const sf=frame(sunDir.map(x=>-x),[0,1,0]),sunVP=product(m4(),ortho(23.8,.5,73),viewMatrix(sunEye,sf.forward,sf.up,sf.right));
 gl.activeTexture(gl.TEXTURE4);
 const depthTex=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,depthTex);
 const depthRes=Math.min(2048,gl.getParameter(gl.MAX_TEXTURE_SIZE));
 gl.texStorage2D(gl.TEXTURE_2D,1,gl.DEPTH_COMPONENT24,depthRes,depthRes);
 gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
 gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_COMPARE_MODE,gl.COMPARE_REF_TO_TEXTURE);
 gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_COMPARE_FUNC,gl.LEQUAL);
 gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
 const sunFbo=gl.createFramebuffer();gl.bindFramebuffer(gl.FRAMEBUFFER,sunFbo);
 gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.DEPTH_ATTACHMENT,gl.TEXTURE_2D,depthTex,0);
 gl.drawBuffers([gl.NONE]);gl.readBuffer(gl.NONE);readyFbo(gl,'Sunlight');
 gl.viewport(0,0,depthRes,depthRes);gl.enable(gl.DEPTH_TEST);gl.depthFunc(gl.LESS);gl.depthMask(true);gl.clear(gl.DEPTH_BUFFER_BIT);
 gl.enable(gl.POLYGON_OFFSET_FILL);gl.polygonOffset(1.1,2.0);gl.disable(gl.CULL_FACE);gl.disable(gl.BLEND);
 gl.useProgram(shadow.p);gl.uniformMatrix4fv(shadow.loc.uVP,false,sunVP);
 gl.bindVertexArray(vao);gl.drawElements(gl.TRIANGLES,field.primaryIndices,gl.UNSIGNED_INT,0);gl.disable(gl.POLYGON_OFFSET_FILL);
 gl.bindFramebuffer(gl.FRAMEBUFFER,null);gl.deleteFramebuffer(sunFbo);
 function sampler(program,entries){
   gl.useProgram(program.p);
   for(const [key,n] of Object.entries(entries))gl.uniform1i(program.loc[key],n);
 }
 sampler(opaque,{uBedding:0,uPavement:1,uMineral:2,uRipple:3,uShadow:4});
 gl.uniformMatrix4fv(opaque.loc.uSunVP,false,sunVP);
 sampler(water,{uRipple:3,uShadow:4,uProbe:5});gl.uniformMatrix4fv(water.loc.uSunVP,false,sunVP);
 const clip=new Float32Array(24),list=[],vp=m4(),emptyVAO=gl.createVertexArray();
 const chunks=field.chunks.map(c=>({...c,center:c.lo.map((v,i)=>(v+c.hi[i])*.5),order:0,distant:false,drawCount:c.count,drawOffset:c.first*4}));
 const drawMany=gl.getExtension('WEBGL_multi_draw');
 const counts=new Int32Array(chunks.length),offsets=new Int32Array(chunks.length);
 // Submit front-to-back so obscured fragment shading benefits from early depth rejection.
 function scenery(eye,cam,projection,spreadX,spreadY,time){
   product(vp,projection,viewMatrix(eye,cam.forward,cam.up,cam.right));
   gl.disable(gl.BLEND);gl.depthMask(true);gl.clear(gl.DEPTH_BUFFER_BIT);
   gl.disable(gl.DEPTH_TEST);gl.useProgram(sky.p);gl.bindVertexArray(emptyVAO);
   gl.uniform3fv(sky.loc.uForward,cam.forward);gl.uniform3fv(sky.loc.uRight,cam.right);gl.uniform3fv(sky.loc.uUp,cam.up);
   gl.uniform2f(sky.loc.uSpread,spreadX,spreadY);gl.drawArrays(gl.TRIANGLES,0,3);
   gl.enable(gl.DEPTH_TEST);gl.useProgram(opaque.p);gl.bindVertexArray(vao);
   gl.uniformMatrix4fv(opaque.loc.uVP,false,vp);gl.uniform3fv(opaque.loc.uEye,eye);gl.uniform1f(opaque.loc.uTime,time);
   list.length=0;frustum(clip,vp);
   for(const c of chunks){
     if(!visible(c,clip))continue;
     if(c.at){
       const dx=Math.max(0,c.lo[0]-eye[0],eye[0]-c.hi[0]),dy=Math.max(0,c.lo[1]-eye[1],eye[1]-c.hi[1]),dz=Math.max(0,c.lo[2]-eye[2],eye[2]-c.hi[2]);
       const threshold=c.at+(c.distant?-.55:.55);
       c.distant=dx*dx+dy*dy+dz*dz>threshold*threshold;
       c.drawCount=c.distant?c.farCount:c.count;c.drawOffset=4*(c.distant?c.farFirst:c.first);
     }
     c.order=dot(c.center,cam.forward);list.push(c);
   }
   list.sort((a,b)=>a.order-b.order);
   if(drawMany){
     for(let i=0;i<list.length;i++){counts[i]=list[i].drawCount;offsets[i]=list[i].drawOffset;}
     drawMany.multiDrawElementsWEBGL(gl.TRIANGLES,counts,0,gl.UNSIGNED_INT,offsets,0,list.length);
   }else{for(const c of list)gl.drawElements(gl.TRIANGLES,c.drawCount,gl.UNSIGNED_INT,c.drawOffset);}
 }
 // A single parallax-corrected probe serves all ordinary pool viewpoints.
 status('Preparing daylight…');
 const probeRes=256;
 gl.activeTexture(gl.TEXTURE5);const probe=gl.createTexture();gl.bindTexture(gl.TEXTURE_CUBE_MAP,probe);
 gl.texStorage2D(gl.TEXTURE_CUBE_MAP,9,gl.RGBA8,probeRes,probeRes);
 gl.texParameteri(gl.TEXTURE_CUBE_MAP,gl.TEXTURE_MIN_FILTER,gl.LINEAR_MIPMAP_LINEAR);gl.texParameteri(gl.TEXTURE_CUBE_MAP,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
 for(const dim of [gl.TEXTURE_WRAP_S,gl.TEXTURE_WRAP_T,gl.TEXTURE_WRAP_R])gl.texParameteri(gl.TEXTURE_CUBE_MAP,dim,gl.CLAMP_TO_EDGE);
 const cubeFbo=gl.createFramebuffer(),rb=gl.createRenderbuffer();gl.bindFramebuffer(gl.FRAMEBUFFER,cubeFbo);
 gl.bindRenderbuffer(gl.RENDERBUFFER,rb);gl.renderbufferStorage(gl.RENDERBUFFER,gl.DEPTH_COMPONENT16,probeRes,probeRes);
 gl.framebufferRenderbuffer(gl.FRAMEBUFFER,gl.DEPTH_ATTACHMENT,gl.RENDERBUFFER,rb);
 const directions=[
   [[1,0,0],[0,-1,0]],[[-1,0,0],[0,-1,0]],[[0,1,0],[0,0,1]],[[0,-1,0],[0,0,-1]],
   [[0,0,1],[0,-1,0]],[[0,0,-1],[0,-1,0]]
 ];
 const probeProj=perspective(Math.PI/2,1,.045,70);
 gl.viewport(0,0,probeRes,probeRes);
 for(let face=0;face<6;face++){
   gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_CUBE_MAP_POSITIVE_X+face,probe,0);
   if(face===0)readyFbo(gl,'Reflection');
   scenery([.45,.105,1.15],frame(...directions[face]),probeProj,1,1,0.);
 }
 gl.bindFramebuffer(gl.FRAMEBUFFER,null);gl.deleteRenderbuffer(rb);gl.deleteFramebuffer(cubeFbo);
 gl.activeTexture(gl.TEXTURE5);gl.bindTexture(gl.TEXTURE_CUBE_MAP,probe);gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
 const fov=65*Math.PI/180,spread=Math.tan(fov/2);
 let projection=null,cssW=0,cssH=0,lastDpr=0;
 function resize(){
   const w=Math.max(1,canvas.clientWidth),h=Math.max(1,canvas.clientHeight),dpr=window.devicePixelRatio||1;
   if(w===cssW&&h===cssH&&dpr===lastDpr)return;
   cssW=w;cssH=h;lastDpr=dpr;
   const ratio=Math.min(dpr,1.6,Math.sqrt(1980000/(w*h)));
   canvas.width=Math.max(1,Math.round(w*ratio));canvas.height=Math.max(1,Math.round(h*ratio));
   projection=perspective(fov,canvas.width/canvas.height,.055,75);
 }
 function draw(eye,yaw,pitch,time){
   resize();
   const cp=Math.cos(pitch),sp=Math.sin(pitch),sy=Math.sin(yaw),cy=Math.cos(yaw);
   const cam={forward:[sy*cp,sp,-cy*cp],right:[cy,0,sy],up:[-sy*sp,cp,cy*sp]};
   gl.viewport(0,0,canvas.width,canvas.height);
   scenery(eye,cam,projection,spread*canvas.width/canvas.height,spread,time);
   gl.useProgram(water.p);gl.bindVertexArray(waterGeo.vao);
   gl.uniformMatrix4fv(water.loc.uVP,false,vp);gl.uniform3fv(water.loc.uEye,eye);gl.uniform1f(water.loc.uTime,time);
   gl.depthMask(false);gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);
   gl.drawElements(gl.TRIANGLES,waterGeo.count,gl.UNSIGNED_SHORT,0);
   gl.disable(gl.BLEND);gl.depthMask(true);gl.bindVertexArray(null);
 }
 return {draw,field,clearance:new Uint8Array(navBuffer)};
}


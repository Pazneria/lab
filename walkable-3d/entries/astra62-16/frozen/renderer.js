'use strict';
const RMath={
 norm(v){const l=Math.hypot(...v);return v.map(n=>n/(l||1))},
 dot(a,b){return a[0]*b[0]+a[1]*b[1]+a[2]*b[2]},
 cross(a,b){return [a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]]},
 view(eye,forward,up=[0,1,0]){
  const z=this.norm(forward.map(n=>-n)),x=this.norm(this.cross(up,z)),y=this.cross(z,x);
  return new Float32Array([x[0],y[0],z[0],0,x[1],y[1],z[1],0,x[2],y[2],z[2],0,-this.dot(x,eye),-this.dot(y,eye),-this.dot(z,eye),1])
 },
 perspective(fov,aspect,near,far){const f=1/Math.tan(fov*.5),nf=1/(near-far);return new Float32Array([f/aspect,0,0,0,0,f,0,0,0,0,(far+near)*nf,-1,0,0,2*far*near*nf,0])},
 ortho(x,y,near,far){return new Float32Array([1/x,0,0,0,0,1/y,0,0,0,0,-2/(far-near),0,0,0,-(far+near)/(far-near),1])},
 mul(a,b){const m=new Float32Array(16);for(let c=0;c<4;c++)for(let r=0;r<4;r++)m[c*4+r]=a[r]*b[c*4]+a[4+r]*b[c*4+1]+a[8+r]*b[c*4+2]+a[12+r]*b[c*4+3];return m},
 planes(m){return [[0,1],[0,-1],[1,1],[1,-1],[2,1],[2,-1]].map(([r,s])=>[m[3]+s*m[r],m[7]+s*m[r+4],m[11]+s*m[r+8],m[15]+s*m[r+12]])},
 visible(b,planes){for(const p of planes){if(p[0]*(p[0]>0?b.max[0]:b.min[0])+p[1]*(p[1]>0?b.max[1]:b.min[1])+p[2]*(p[2]>0?b.max[2]:b.min[2])+p[3]<-.01)return false}return true}
};
class CottageRenderer{
 constructor(canvas){
  this.canvas=canvas;
  const gl=canvas.getContext('webgl2',{alpha:false,antialias:true,depth:true,stencil:false,powerPreference:'high-performance',preserveDrawingBuffer:false});
  if(!gl)throw Error('This scene needs a browser with WebGL 2 enabled.');
  this.gl=gl;this.scale=1;this.frames=0;this.interval=0;this.width=0;this.height=0;this.maxPixels=1620000;
 }
 program(vs,fs,names){
  const gl=this.gl,program=gl.createProgram();
  for(const [type,src] of [[gl.VERTEX_SHADER,vs],[gl.FRAGMENT_SHADER,fs]]){
   const shader=gl.createShader(type);gl.shaderSource(shader,src);gl.compileShader(shader);
   if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(shader)||'Shader compilation failed.');
   gl.attachShader(program,shader);gl.deleteShader(shader)
  }
  gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(program)||'Shader linking failed.');
  const p={program};for(const name of names)p[name]=gl.getUniformLocation(program,name);
  return p
 }
 async init(status){
  const gl=this.gl;status('Unpacking the cottage…');
  const [metaResponse,assetResponse]=await Promise.all([fetch('./cottage.json'),fetch('./cottage.bin.gz')]);
  if(!metaResponse.ok||!assetResponse.ok)throw Error('The cottage asset could not be loaded. Serve the complete scene folder together.');
  const meta=await metaResponse.json();let packed=await assetResponse.arrayBuffer();
  if(new Uint8Array(packed,0,2)[0]===31){
   if(!window.DecompressionStream)throw Error('Please use a current browser with gzip decompression support.');
   packed=await new Response(new Blob([packed]).stream().pipeThrough(new DecompressionStream('gzip'))).arrayBuffer()
  }
  if(packed.byteLength!==meta.bytes||meta.version!==1)throw Error('The scene bundle is incomplete.');
  this.meta=meta;this.batches=meta.batches.map(b=>({...b,center:b.min.map((v,i)=>(v+b.max[i])*.5),distance:0}));
  this.opaque=this.batches.filter(b=>!b.mode);this.glass=this.batches.filter(b=>b.mode);
  status('Lighting the stillroom…');
  this.depth=this.program(shadowVertex,shadowFragment,['uMatrix']);
  const common=['uMatrix','uEye','uSurfaces'];
  this.matte=this.program(sceneVertex,surfaceFragment,[...common,'uSun','uLamp','uAtlas','uVolume','uSunMatrix','uVolumeMin','uVolumeSize']);
  this.panes=this.program(sceneVertex,glassFragment,common);
  this.sky=this.program(skyVertex,skyFragment,['uForward','uRight','uUp','uFov']);
  const [vlen,ilen,tlen,alen]=meta.sections;this.vao=gl.createVertexArray();gl.bindVertexArray(this.vao);
  const vbo=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,vbo);gl.bufferData(gl.ARRAY_BUFFER,new Uint8Array(packed,0,vlen),gl.STATIC_DRAW);
  const ibo=gl.createBuffer();gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,ibo);gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint8Array(packed,vlen,ilen),gl.STATIC_DRAW);
  for(const [index,size,type,normalized,offset] of [[0,3,gl.SHORT,false,0],[1,3,gl.BYTE,true,6],[2,2,gl.FLOAT,false,16],[3,3,gl.UNSIGNED_BYTE,true,10],[4,1,gl.UNSIGNED_BYTE,false,9]]){
   gl.enableVertexAttribArray(index);gl.vertexAttribPointer(index,size,type,normalized,24,offset)
  }
  this.emptyVAO=gl.createVertexArray();
  const anis=gl.getExtension('EXT_texture_filter_anisotropic')||gl.getExtension('WEBKIT_EXT_texture_filter_anisotropic');
  const filter=(target,mip=true,repeat=true)=>{
   gl.texParameteri(target,gl.TEXTURE_MIN_FILTER,mip?gl.LINEAR_MIPMAP_LINEAR:gl.LINEAR);gl.texParameteri(target,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
   for(const pn of [gl.TEXTURE_WRAP_S,gl.TEXTURE_WRAP_T])gl.texParameteri(target,pn,repeat?gl.REPEAT:gl.CLAMP_TO_EDGE);
   if(anis&&mip)gl.texParameterf(target,anis.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(4,gl.getParameter(anis.MAX_TEXTURE_MAX_ANISOTROPY_EXT)))
  };
  const tex=(unit,target)=>{gl.activeTexture(gl.TEXTURE0+unit);const t=gl.createTexture();gl.bindTexture(target,t);return t};
  tex(0,gl.TEXTURE_2D_ARRAY);gl.texStorage3D(gl.TEXTURE_2D_ARRAY,9,gl.RGBA8,256,256,14);
  gl.texSubImage3D(gl.TEXTURE_2D_ARRAY,0,0,0,0,256,256,14,gl.RGBA,gl.UNSIGNED_BYTE,new Uint8Array(packed,vlen+ilen,tlen));filter(gl.TEXTURE_2D_ARRAY);gl.generateMipmap(gl.TEXTURE_2D_ARRAY);
  tex(1,gl.TEXTURE_2D);gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,makeLetterpress());gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,false);filter(gl.TEXTURE_2D,true,false);gl.generateMipmap(gl.TEXTURE_2D);
  tex(2,gl.TEXTURE_3D);const dim=meta.volume.dim;gl.texStorage3D(gl.TEXTURE_3D,1,gl.RGBA8,...dim);
  gl.texSubImage3D(gl.TEXTURE_3D,0,0,0,0,...dim,gl.RGBA,gl.UNSIGNED_BYTE,new Uint8Array(packed,vlen+ilen+tlen,alen));filter(gl.TEXTURE_3D,false,false);gl.texParameteri(gl.TEXTURE_3D,gl.TEXTURE_WRAP_R,gl.CLAMP_TO_EDGE);
  packed=null;
  const shadowTex=(unit,target,size)=>{
   const t=tex(unit,target);gl.texStorage2D(target,1,gl.DEPTH_COMPONENT24,size,size);filter(target,false,false);
   gl.texParameteri(target,gl.TEXTURE_COMPARE_MODE,gl.COMPARE_REF_TO_TEXTURE);gl.texParameteri(target,gl.TEXTURE_COMPARE_FUNC,gl.LEQUAL);return t
  };
  this.sunTexture=shadowTex(3,gl.TEXTURE_2D,2048);this.lampTexture=shadowTex(4,gl.TEXTURE_CUBE_MAP,512);
  this.shadowMaps();
  gl.useProgram(this.matte.program);for(const [i,n] of ['uSurfaces','uAtlas','uVolume','uSun','uLamp'].entries())gl.uniform1i(this.matte[n],i);
  gl.uniform3fv(this.matte.uVolumeMin,meta.volume.min);gl.uniform3fv(this.matte.uVolumeSize,dim.map(n=>n*meta.volume.pitch));
  gl.uniformMatrix4fv(this.matte.uSunMatrix,false,this.sunMatrix);
  gl.useProgram(this.panes.program);gl.uniform1i(this.panes.uSurfaces,0);
  gl.clearColor(.72,.78,.75,1);gl.enable(gl.DEPTH_TEST);gl.depthFunc(gl.LEQUAL);
  gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);
  this.resize()
 }
 shadowMaps(){
  const gl=this.gl,f=gl.createFramebuffer();gl.bindFramebuffer(gl.FRAMEBUFFER,f);gl.drawBuffers([gl.NONE]);gl.readBuffer(gl.NONE);
  gl.bindVertexArray(this.vao);gl.useProgram(this.depth.program);gl.enable(gl.DEPTH_TEST);gl.depthMask(true);
  gl.enable(gl.POLYGON_OFFSET_FILL);gl.polygonOffset(1.15,1.35);
  const draw=(matrix)=>{
   if(gl.checkFramebufferStatus(gl.FRAMEBUFFER)!==gl.FRAMEBUFFER_COMPLETE)throw Error('The graphics device could not allocate the static lighting maps.');
   gl.clear(gl.DEPTH_BUFFER_BIT);gl.uniformMatrix4fv(this.depth.uMatrix,false,matrix);const p=RMath.planes(matrix);
   for(const b of this.opaque)if(RMath.visible(b,p))gl.drawElements(gl.TRIANGLES,b.count,gl.UNSIGNED_INT,b.first*4)
  };
  const sun=RMath.norm([.61509,.69766,-.36779]),center=[1.05,1.32,.41],eye=center.map((v,i)=>v+sun[i]*19);
  this.sunMatrix=RMath.mul(RMath.ortho(8.1,7.8,.1,41),RMath.view(eye,sun.map(v=>-v)));
  gl.viewport(0,0,2048,2048);gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.DEPTH_ATTACHMENT,gl.TEXTURE_2D,this.sunTexture,0);draw(this.sunMatrix);
  gl.viewport(0,0,512,512);const lamp=[.29,2.314,2.56],proj=RMath.perspective(Math.PI*.5,1,.19,12);
  const faces=[[[1,0,0],[0,-1,0]],[[-1,0,0],[0,-1,0]],[[0,1,0],[0,0,1]],[[0,-1,0],[0,0,-1]],[[0,0,1],[0,-1,0]],[[0,0,-1],[0,-1,0]]];
  faces.forEach(([dir,up],i)=>{gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.DEPTH_ATTACHMENT,gl.TEXTURE_CUBE_MAP_POSITIVE_X+i,this.lampTexture,0);draw(RMath.mul(proj,RMath.view(lamp,dir,up)))});
  gl.disable(gl.POLYGON_OFFSET_FILL);gl.bindFramebuffer(gl.FRAMEBUFFER,null);gl.deleteFramebuffer(f)
 }
 resize(){
  const w=Math.max(1,this.canvas.clientWidth),h=Math.max(1,this.canvas.clientHeight);
  const density=Math.min(window.devicePixelRatio||1,1.55,Math.sqrt(this.maxPixels/(w*h)))*this.scale;
  const tw=Math.max(1,Math.round(w*density)),th=Math.max(1,Math.round(h*density));
  if(this.canvas.width!==tw||this.canvas.height!==th){this.canvas.width=tw;this.canvas.height=th}
  this.width=tw;this.height=th;this.gl.viewport(0,0,tw,th)
 }
 adapt(dt){
  // Resize only after a sustained change. The walk and turn rates use wall time.
  if(dt>.15||dt<.003)return;
  this.frames++;this.interval+=dt;
  if(this.interval<3.2)return;
  const avg=this.interval/this.frames,old=this.scale;
  if(avg>.024&&this.scale>.70)this.scale=Math.max(.70,this.scale-.10);
  else if(avg<.0169&&this.scale<1)this.scale=Math.min(1,this.scale+.04);
  this.interval=0;this.frames=0;if(old!==this.scale)this.resize()
 }
 draw(camera){
  const gl=this.gl,aspect=this.width/this.height;
  const eye=[camera.x,camera.eye,camera.z],cp=Math.cos(camera.pitch),sp=Math.sin(camera.pitch),cy=Math.cos(camera.yaw),sy=Math.sin(camera.yaw);
  const dir=[sy*cp,sp,-cy*cp],right=[cy,0,sy],up=RMath.cross(right,dir);
  const fov=aspect<.8?1.33:1.13,proj=RMath.perspective(fov,aspect,.037,65),matrix=RMath.mul(proj,RMath.view(eye,dir)),planes=RMath.planes(matrix);
  gl.depthMask(true);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
  gl.disable(gl.BLEND);gl.disable(gl.DEPTH_TEST);gl.useProgram(this.sky.program);gl.bindVertexArray(this.emptyVAO);
  gl.uniform3fv(this.sky.uForward,dir);gl.uniform3fv(this.sky.uRight,right);gl.uniform3fv(this.sky.uUp,up);gl.uniform2f(this.sky.uFov,Math.tan(fov/2)*aspect,Math.tan(fov/2));gl.drawArrays(gl.TRIANGLES,0,3);
  gl.enable(gl.DEPTH_TEST);gl.bindVertexArray(this.vao);
  const pass=(p,list,transparent)=>{
   gl.useProgram(p.program);gl.uniformMatrix4fv(p.uMatrix,false,matrix);gl.uniform3fv(p.uEye,eye);
   const visible=list.filter(b=>RMath.visible(b,planes));
   for(const b of visible){const c=b.center;b.distance=(c[0]-eye[0])**2+(c[1]-eye[1])**2+(c[2]-eye[2])**2}
   visible.sort(transparent?(a,b)=>b.distance-a.distance:(a,b)=>a.distance-b.distance);
   for(const b of visible)gl.drawElements(gl.TRIANGLES,b.count,gl.UNSIGNED_INT,b.first*4)
  };
  pass(this.matte,this.opaque,false);
  gl.enable(gl.BLEND);gl.depthMask(false);pass(this.panes,this.glass,true);gl.depthMask(true);gl.disable(gl.BLEND)
 }
}

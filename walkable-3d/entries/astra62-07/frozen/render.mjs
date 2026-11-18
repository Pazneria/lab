import {vertex,fragment,skyVertex,skyFragment} from './shaders.mjs';
const dot=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2];
const clamp=(x,lo,hi)=>Math.min(hi,Math.max(lo,x));
const FOV=63*Math.PI/180, SPREAD=Math.tan(FOV*.5), NEAR=.055, FAR=106;
function makeProgram(gl,vs,fs){
  const sh=(type,src)=>{
    const s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);
    if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(s)||'Shader compilation failed.');
    return s;
  };
  const v=sh(gl.VERTEX_SHADER,vs),f=sh(gl.FRAGMENT_SHADER,fs),p=gl.createProgram();
  gl.attachShader(p,v);gl.attachShader(p,f);gl.linkProgram(p);gl.deleteShader(v);gl.deleteShader(f);
  if(!gl.getProgramParameter(p,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(p)||'Shader link failed.');
  return p;
}
function locations(gl,p,keys){return Object.fromEntries(keys.map(n=>[n,gl.getUniformLocation(p,'u'+n)]));}
async function fetchFile(name,json=false){
  const r=await fetch(new URL('./assets/'+name,import.meta.url));
  if(!r.ok)throw Error('Could not load '+name+' ('+r.status+').');
  if(json)return r.json();
  const buf=await r.arrayBuffer(),tag=new Uint8Array(buf,0,Math.min(2,buf.byteLength));
  if(tag[0]===31 && tag[1]===139){
    if(!globalThis.DecompressionStream)throw Error('Use the included launch command to load compressed assets on this browser.');
    return new Response(new Blob([buf]).stream().pipeThrough(new DecompressionStream('gzip'))).arrayBuffer();
  }
  return buf;
}
function matrix(b,aspect,out){
  const {right:r,up:u,forward:f,eye:p}=b;
  const sx=1/(SPREAD*aspect),sy=1/SPREAD,A=(FAR+NEAR)/(FAR-NEAR),B=-2*FAR*NEAR/(FAR-NEAR);
  for(let k=0;k<3;k++){out[k*4]=sx*r[k];out[k*4+1]=sy*u[k];out[k*4+2]=A*f[k];out[k*4+3]=f[k];}
  out[12]=-sx*dot(r,p);out[13]=-sy*dot(u,p);out[14]=B-A*dot(f,p);out[15]=-dot(f,p);
}
function makePlanes(m,out){
  let i=0;for(let k=0;k<3;k++)for(const s of [1,-1]){
    for(let col=0;col<4;col++)out[i++]=m[col*4+3]+s*m[col*4+k];
  }
}
function visible(g,p){
  for(let j=0;j<24;j+=4){
    const x=p[j]>=0?g.hi[0]:g.lo[0],y=p[j+1]>=0?g.hi[1]:g.lo[1],z=p[j+2]>=0?g.hi[2]:g.lo[2];
    if(p[j]*x+p[j+1]*y+p[j+2]*z+p[j+3]<-.001)return false;
  }return true;
}
// An exhibit entirely behind a threshold jamb cannot contribute pixels.
// Project its conservative bounds, keeping any object that crosses a plane.
function throughDoor(g,eye,z,top){
  if((eye[2]-z)*(g.lo[2]-z)>=0 || (eye[2]-z)*(g.hi[2]-z)>=0)return true;
  let x0=Infinity,x1=-Infinity,y0=Infinity,y1=-Infinity;
  for(const depth of [g.lo[2],g.hi[2]]){
    const s=(z-eye[2])/(depth-eye[2]);
    x0=Math.min(x0,eye[0]+(g.lo[0]-eye[0])*s);x1=Math.max(x1,eye[0]+(g.hi[0]-eye[0])*s);
    y0=Math.min(y0,eye[1]+(g.lo[1]-eye[1])*s);y1=Math.max(y1,eye[1]+(g.hi[1]-eye[1])*s);
  }
  return x1>=-1.60 && x0<=6.0 && y0<=top+.05 && y1>=-.05;
}
// Only the screen rectangle needed by the refracting cast is resolved/copied.
function copyArea(g,m,w,h){
  let minX=1,minY=1,maxX=-1,maxY=-1;
  for(let i=0;i<8;i++){
    const x=i&1?g.hi[0]+.77:g.lo[0]-.77,y=i&2?g.hi[1]+.77:g.lo[1]-.77,z=i&4?g.hi[2]+.77:g.lo[2]-.77;
    const a=m[3]*x+m[7]*y+m[11]*z+m[15];if(a<=.056)return [0,0,w,h];
    const px=(m[0]*x+m[4]*y+m[8]*z+m[12])/a,py=(m[1]*x+m[5]*y+m[9]*z+m[13])/a;
    minX=Math.min(minX,px);maxX=Math.max(maxX,px);minY=Math.min(minY,py);maxY=Math.max(maxY,py);
  }
  const x=clamp(Math.floor((minX*.5+.5)*w)-2,0,w),y=clamp(Math.floor((minY*.5+.5)*h)-2,0,h);
  return [x,y,clamp(Math.ceil((maxX*.5+.5)*w)+2,0,w)-x,clamp(Math.ceil((maxY*.5+.5)*h)+2,0,h)-y];
}
export async function createRenderer(canvas){
  const gl=canvas.getContext('webgl2',{alpha:false,antialias:true,depth:true,stencil:false,powerPreference:'high-performance',preserveDrawingBuffer:false});
  if(!gl)throw Error('This museum needs WebGL 2. Enable hardware acceleration in a desktop browser.');
  const [meta,mesh,day,surface,volume,letters]=await Promise.all([
    fetchFile('museum.json',true),fetchFile('museum.bin'),fetchFile('irradiance.gz'),fetchFile('surface.gz'),fetchFile('volume.gz'),fetchFile('lettering.gz')
  ]);
  const program=makeProgram(gl,vertex,fragment),sky=makeProgram(gl,skyVertex,skyFragment);
  const u=locations(gl,program,['VP','Eye','Sun','Mat','Color','Pixels','Day','Surface','Sign','Behind','Volume']);
  const su=locations(gl,sky,['Forward','Right','Up','Sun','Spread','Volume']);
  const vao=gl.createVertexArray();gl.bindVertexArray(vao);
  gl.bindBuffer(gl.ARRAY_BUFFER,gl.createBuffer());gl.bufferData(gl.ARRAY_BUFFER,new Uint8Array(mesh,0,meta.vertexBytes),gl.STATIC_DRAW);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,gl.createBuffer());gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint8Array(mesh,meta.vertexBytes),gl.STATIC_DRAW);
  for(const [i,size,offset] of [[0,3,0],[1,3,12],[2,2,24],[3,2,32]]){
    gl.enableVertexAttribArray(i);gl.vertexAttribPointer(i,size,gl.FLOAT,false,40,offset);
  }
  gl.bindVertexArray(null);
  gl.pixelStorei(gl.UNPACK_ALIGNMENT,1);
  gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,false);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,false);
  const ext=gl.getExtension('EXT_texture_filter_anisotropic');
  const aniso=ext?Math.min(4,gl.getParameter(ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT)):1;
  function tex(unit,target,repeat,mips){
    const t=gl.createTexture();gl.activeTexture(gl.TEXTURE0+unit);gl.bindTexture(target,t);
    gl.texParameteri(target,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
    gl.texParameteri(target,gl.TEXTURE_MIN_FILTER,mips?gl.LINEAR_MIPMAP_LINEAR:gl.LINEAR);
    gl.texParameteri(target,gl.TEXTURE_WRAP_S,repeat?gl.REPEAT:gl.CLAMP_TO_EDGE);
    gl.texParameteri(target,gl.TEXTURE_WRAP_T,repeat?gl.REPEAT:gl.CLAMP_TO_EDGE);
    if(target===gl.TEXTURE_3D)gl.texParameteri(target,gl.TEXTURE_WRAP_R,gl.REPEAT);
    if(ext&&mips&&target===gl.TEXTURE_2D)gl.texParameterf(target,ext.TEXTURE_MAX_ANISOTROPY_EXT,aniso);
    return t;
  }
  const hd=new DataView(day),lw=hd.getInt32(0,true),lh=hd.getInt32(4,true);
  if(day.byteLength!==8+4*lw*lh || surface.byteLength!==4*1024**2 || volume.byteLength!==4*64**3)throw Error('A material asset is incomplete.');
  tex(0,gl.TEXTURE_2D,false,false);
  gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA8,lw,lh,0,gl.RGBA,gl.UNSIGNED_BYTE,new Uint8Array(day,8));
  tex(1,gl.TEXTURE_2D,true,true);
  gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA8,1024,1024,0,gl.RGBA,gl.UNSIGNED_BYTE,new Uint8Array(surface));
  gl.generateMipmap(gl.TEXTURE_2D);
  tex(2,gl.TEXTURE_3D,true,true);
  gl.texImage3D(gl.TEXTURE_3D,0,gl.RGBA8,64,64,64,0,gl.RGBA,gl.UNSIGNED_BYTE,new Uint8Array(volume));gl.generateMipmap(gl.TEXTURE_3D);
  tex(3,gl.TEXTURE_2D,false,true);
  if(letters.byteLength!==2048**2)throw Error('The lettering atlas is incomplete.');
  gl.texImage2D(gl.TEXTURE_2D,0,gl.R8,2048,2048,0,gl.RED,gl.UNSIGNED_BYTE,new Uint8Array(letters));gl.generateMipmap(gl.TEXTURE_2D);
  const snapshot=tex(4,gl.TEXTURE_2D,false,false);
  gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA8,1,1,0,gl.RGBA,gl.UNSIGNED_BYTE,null);
  const sunLength=Math.hypot(...meta.sun),sun=meta.sun.map(v=>v/sunLength);
  gl.useProgram(program);for(const [name,unit] of [['Day',0],['Surface',1],['Volume',2],['Sign',3],['Behind',4]])gl.uniform1i(u[name],unit);
  gl.uniform3fv(u.Sun,sun);gl.useProgram(sky);gl.uniform1i(su.Volume,2);gl.uniform3fv(su.Sun,sun);
  gl.clearColor(.72,.78,.81,1);gl.clearDepth(1);gl.enable(gl.DEPTH_TEST);gl.enable(gl.CULL_FACE);
  gl.frontFace(gl.CCW);gl.cullFace(gl.BACK);
  const opaque=meta.draw.filter(g=>g.mat!==8 && g.mat!==15 && g.mat!==16 && g.mat!==20);
  const overlays=meta.draw.filter(g=>g.mat===15 || g.mat===16 || g.mat===20);
  const resin=meta.draw.filter(g=>g.mat===8).map(g=>({...g,mid:g.lo.map((x,i)=>(x+g.hi[i])*.5)}));
  const vp=new Float32Array(16),planes=new Float32Array(24);
  function resize(){
    const width=Math.max(1,canvas.clientWidth),height=Math.max(1,canvas.clientHeight);
    const ratio=Math.min(devicePixelRatio||1,1.75,Math.sqrt(2450000/(width*height)));
    const w=Math.max(1,Math.round(width*ratio)),h=Math.max(1,Math.round(height*ratio));
    if(canvas.width===w && canvas.height===h && canvas.dataset.sized)return false;
    canvas.width=w;canvas.height=h;canvas.dataset.sized='1';
    gl.viewport(0,0,w,h);
    gl.activeTexture(gl.TEXTURE4);gl.bindTexture(gl.TEXTURE_2D,snapshot);
    gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA8,w,h,0,gl.RGBA,gl.UNSIGNED_BYTE,null);
    return true;
  }
  function drawGroup(g){
    gl.uniform1i(u.Mat,g.mat);gl.uniform3fv(u.Color,meta.albedos[g.mat]);
    gl.drawElements(gl.TRIANGLES,g.count,gl.UNSIGNED_INT,g.first*4);
  }
  function draw(b){
    const w=canvas.width,h=canvas.height;
    matrix(b,w/h,vp);makePlanes(vp,planes);
    gl.depthMask(true);gl.depthFunc(gl.LESS);gl.disable(gl.BLEND);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
    gl.useProgram(program);gl.bindVertexArray(vao);
    gl.uniformMatrix4fv(u.VP,false,vp);gl.uniform3fv(u.Eye,b.eye);gl.uniform2f(u.Pixels,w,h);
    const canSee=g=>visible(g,planes)&&throughDoor(g,b.eye,3.8,4.65)&&throughDoor(g,b.eye,-5.6,6.25);
    for(const g of opaque)if(canSee(g))drawGroup(g);
    gl.useProgram(sky);gl.bindVertexArray(null);gl.depthFunc(gl.LEQUAL);gl.depthMask(false);
    gl.uniform3fv(su.Forward,b.forward);gl.uniform3fv(su.Right,b.right);gl.uniform3fv(su.Up,b.up);
    gl.uniform2f(su.Spread,SPREAD*w/h,SPREAD);gl.drawArrays(gl.TRIANGLES,0,3);
    gl.useProgram(program);gl.bindVertexArray(vao);
    gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);
    for(const g of overlays)if(canSee(g))drawGroup(g);
    gl.disable(gl.BLEND);gl.depthMask(true);gl.depthFunc(gl.LESS);
    const lenses=resin.filter(canSee).sort((a,c)=>dot(c.mid,b.forward)-dot(a.mid,b.forward));
    gl.activeTexture(gl.TEXTURE4);gl.bindTexture(gl.TEXTURE_2D,snapshot);
    for(const g of lenses){
      const [x,y,rw,rh]=copyArea(g,vp,w,h);
      if(rw<=0||rh<=0)continue;
      gl.copyTexSubImage2D(gl.TEXTURE_2D,0,x,y,x,y,rw,rh);
      drawGroup(g);
    }
  }
  resize();return {meta,draw,resize};
}

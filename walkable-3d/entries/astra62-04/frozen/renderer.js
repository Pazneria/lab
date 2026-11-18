"use strict";
globalThis.HouseRenderer=(()=>{
  const normalize=v=>{const k=1/(Math.hypot(...v)||1);return v.map(x=>x*k);};
  const dot=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2];
  const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
  const identity=()=>new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]);
  function matrixProduct(a,b,out=new Float32Array(16)){
    for(let c=0;c<4;c++)for(let r=0;r<4;r++)out[4*c+r]=a[r]*b[4*c]+a[4+r]*b[4*c+1]+a[8+r]*b[4*c+2]+a[12+r]*b[4*c+3];
    return out;
  }
  function cameraMatrix(eye,f,r,u,out=new Float32Array(16)){
    out.set([r[0],u[0],-f[0],0,r[1],u[1],-f[1],0,r[2],u[2],-f[2],0,-dot(r,eye),-dot(u,eye),dot(f,eye),1]);return out;
  }
  function perspective(fov,aspect,near,far){
    const f=1/Math.tan(fov/2),k=1/(near-far);
    return new Float32Array([f/aspect,0,0,0,0,f,0,0,0,0,(far+near)*k,-1,0,0,2*near*far*k,0]);
  }
  function lightSpace(sun){
    const center=[0,1.7,1.05],eye=center.map((x,i)=>x+sun[i]*25),fw=sun.map(k=>-k);
    const right=normalize(cross(fw,[0,1,0])),up=cross(right,fw),view=cameraMatrix(eye,fw,right,up);
    const min=[1e3,1e3,1e3],max=[-1e3,-1e3,-1e3];
    for(const x of [-5.49,5.49])for(const y of [-.32,6.18])for(const z of [-9.68,12.31]){
      for(let i=0;i<3;i++){const q=view[i]*x+view[4+i]*y+view[8+i]*z+view[12+i];min[i]=Math.min(min[i],q);max[i]=Math.max(max[i],q);}
    }
    const l=min[0]-.13,r=max[0]+.13,b=min[1]-.13,t=max[1]+.13,n=-max[2]-.2,f=-min[2]+.2;
    const ortho=new Float32Array([2/(r-l),0,0,0,0,2/(t-b),0,0,0,0,-2/(f-n),0,-(r+l)/(r-l),-(t+b)/(t-b),-(f+n)/(f-n),1]);
    return matrixProduct(ortho,view);
  }
  async function readAsset(url){
    const response=await fetch(url);
    if(!response.ok)throw Error('Could not load '+url+' ('+response.status+').');
    const buffer=await response.arrayBuffer(),tag=new Uint8Array(buffer,0,2);
    if(tag[0]!==31||tag[1]!==139)return buffer;
    if(typeof DecompressionStream==='undefined')throw Error('This build needs a browser with gzip DecompressionStream support.');
    return new Response(new Blob([buffer]).stream().pipeThrough(new DecompressionStream('gzip'))).arrayBuffer();
  }
  function program(gl,vs,fs){
    const shaders=[];
    for(const [type,source]of [[gl.VERTEX_SHADER,vs],[gl.FRAGMENT_SHADER,fs]]){
      const shader=gl.createShader(type);gl.shaderSource(shader,source);gl.compileShader(shader);
      if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(shader)||'Shader compilation failed.');
      shaders.push(shader);
    }
    const p=gl.createProgram();for(const s of shaders)gl.attachShader(p,s);gl.linkProgram(p);
    if(!gl.getProgramParameter(p,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(p)||'Shader linking failed.');
    for(const s of shaders){gl.detachShader(p,s);gl.deleteShader(s);}
    const loc={};
    for(let i=0;i<gl.getProgramParameter(p,gl.ACTIVE_UNIFORMS);i++){const name=gl.getActiveUniform(p,i).name;loc[name]=gl.getUniformLocation(p,name);}
    gl.useProgram(p);
    for(const [id,name]of ['uAlbedo','uNormals','uLabels','uSky','uShadow'].entries())if(loc[name]!=null)gl.uniform1i(loc[name],id);
    return {p,loc};
  }
  function makeMesh(gl,vertices,indices,dynamic){
    const vao=gl.createVertexArray(),vbo=gl.createBuffer(),ebo=gl.createBuffer();
    gl.bindVertexArray(vao);gl.bindBuffer(gl.ARRAY_BUFFER,vbo);gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,ebo);gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,indices,dynamic?gl.DYNAMIC_DRAW:gl.STATIC_DRAW);
    const attrs=[[0,3,gl.SHORT,false,0],[1,3,gl.BYTE,true,6],[2,2,gl.HALF_FLOAT,false,14],[3,3,gl.UNSIGNED_BYTE,true,10],[4,1,gl.UNSIGNED_BYTE,false,9],[5,1,gl.UNSIGNED_BYTE,true,13]];
    for(const [id,n,type,normalized,offset]of attrs){gl.enableVertexAttribArray(id);gl.vertexAttribPointer(id,n,type,normalized,20,offset);}
    gl.bindVertexArray(null);
    return {vao,vbo,ebo,count:indices.length};
  }
  function importScene(gl,data){
    const v=new DataView(data),l=v.getUint32(8,true),meta=JSON.parse(new TextDecoder().decode(new Uint8Array(data,20,l)));
    if(meta.format!==1||meta.stride!==20)throw Error('Unrecognized mesh format.');
    let pos=(20+l+3)&~3;
    const take=(length,Type)=>{const a=new Type(data,pos,length);pos+=a.byteLength;return a;};
    const solid=makeMesh(gl,take(meta.opaqueVertices*20,Uint8Array),take(meta.opaqueIndices,Uint32Array),false);
    const glassV=take(meta.glassVertices*20,Uint8Array),glassI=take(meta.glassIndices,Uint32Array),glass=makeMesh(gl,glassV,glassI,true);
    if(pos!==data.byteLength)throw Error('Invalid mesh payload length.');
    return {meta,solid,glass,panes:Uint32Array.from(glassI)};
  }
  function materials(gl,data,aniso){
    const d=new DataView(data),s=d.getUint32(8,true),depth=d.getUint32(12,true),n=s*s*depth;
    if(depth!==23||data.byteLength!==16+n*5)throw Error('Invalid material atlas.');
    gl.pixelStorei(gl.UNPACK_ALIGNMENT,1);
    for(let id=0;id<2;id++){
      const tex=gl.createTexture();gl.activeTexture(gl.TEXTURE0+id);gl.bindTexture(gl.TEXTURE_2D_ARRAY,tex);
      const bytes=id===0?new Uint8Array(data,16,n*3):new Uint8Array(data,16+n*3,n*2);
      gl.texImage3D(gl.TEXTURE_2D_ARRAY,0,id===0?gl.RGB8:gl.RG8,s,s,depth,0,id===0?gl.RGB:gl.RG,gl.UNSIGNED_BYTE,bytes);
      gl.texParameteri(gl.TEXTURE_2D_ARRAY,gl.TEXTURE_MIN_FILTER,gl.LINEAR_MIPMAP_LINEAR);gl.texParameteri(gl.TEXTURE_2D_ARRAY,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D_ARRAY,gl.TEXTURE_WRAP_S,gl.REPEAT);gl.texParameteri(gl.TEXTURE_2D_ARRAY,gl.TEXTURE_WRAP_T,gl.REPEAT);
      gl.generateMipmap(gl.TEXTURE_2D_ARRAY);
      if(aniso)gl.texParameterf(gl.TEXTURE_2D_ARRAY,aniso.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(2,gl.getParameter(aniso.MAX_TEXTURE_MAX_ANISOTROPY_EXT)));
    }
    gl.pixelStorei(gl.UNPACK_ALIGNMENT,4);
  }
  function imageTexture(gl,unit,source,repeat,aniso){
    const t=gl.createTexture();gl.activeTexture(gl.TEXTURE0+unit);gl.bindTexture(gl.TEXTURE_2D,t);
    gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,source);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR_MIPMAP_LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,repeat?gl.REPEAT:gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);gl.generateMipmap(gl.TEXTURE_2D);
    if(aniso)gl.texParameterf(gl.TEXTURE_2D,aniso.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(4,gl.getParameter(aniso.MAX_TEXTURE_MAX_ANISOTROPY_EXT)));
  }
  function shadowMap(gl,prog,mesh,light){
    const target=gl.createFramebuffer(),t=gl.createTexture();gl.activeTexture(gl.TEXTURE4);gl.bindTexture(gl.TEXTURE_2D,t);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_COMPARE_MODE,gl.COMPARE_REF_TO_TEXTURE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_COMPARE_FUNC,gl.LEQUAL);
    const size=Math.min(3072,gl.getParameter(gl.MAX_TEXTURE_SIZE));
    gl.texImage2D(gl.TEXTURE_2D,0,gl.DEPTH_COMPONENT24,size,size,0,gl.DEPTH_COMPONENT,gl.UNSIGNED_INT,null);
    gl.bindFramebuffer(gl.FRAMEBUFFER,target);gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.DEPTH_ATTACHMENT,gl.TEXTURE_2D,t,0);gl.drawBuffers([gl.NONE]);gl.readBuffer(gl.NONE);
    if(gl.checkFramebufferStatus(gl.FRAMEBUFFER)!==gl.FRAMEBUFFER_COMPLETE)throw Error('The depth texture could not be allocated.');
    gl.viewport(0,0,size,size);gl.enable(gl.DEPTH_TEST);gl.depthFunc(gl.LESS);gl.depthMask(true);gl.colorMask(false,false,false,false);gl.clear(gl.DEPTH_BUFFER_BIT);
    gl.useProgram(prog.p);gl.uniformMatrix4fv(prog.loc.uLight,false,light);gl.bindVertexArray(mesh.vao);
    gl.drawElements(gl.TRIANGLES,mesh.count,gl.UNSIGNED_INT,0);
    gl.bindVertexArray(null);gl.bindFramebuffer(gl.FRAMEBUFFER,null);gl.deleteFramebuffer(target);
    gl.colorMask(true,true,true,true);return size;
  }
  function frustum(vp,planes){
    for(let axis=0;axis<3;axis++)for(let side=0;side<2;side++){
      const s=side===0?1:-1,p=planes[axis*2+side];
      for(let c=0;c<4;c++)p[c]=vp[c*4+3]+s*vp[c*4+axis];
    }
  }
  function visible(chunk,planes){
    const c=chunk.center,h=chunk.half;
    for(const p of planes)if(p[0]*c[0]+p[1]*c[1]+p[2]*c[2]+p[3]+Math.abs(p[0])*h[0]+Math.abs(p[1])*h[1]+Math.abs(p[2])*h[2]<-.015)return false;
    return true;
  }
  async function create(canvas,status){
    const gl=canvas.getContext('webgl2',{antialias:true,alpha:false,depth:true,stencil:false,preserveDrawingBuffer:false,powerPreference:'high-performance'});
    if(!gl)throw Error('WebGL 2 is unavailable. Enable hardware acceleration and reopen the scene.');
    const aniso=gl.getExtension('EXT_texture_filter_anisotropic'),S=HouseShaders;
    status('Loading the greenhouse…');
    const fontLoad=document.fonts ? Promise.all([document.fonts.load('400 28px Baskervville'),document.fonts.load('italic 28px Baskervville'),document.fonts.load('400 14px "Instrument Sans"')]).catch(()=>null) : null;
    const incoming=Promise.all([readAsset('palm-house.mesh.gz'),readAsset('surface-studies.bin.gz'),fontLoad]);
    const opaque=program(gl,S.vertex,S.fragment),panes=program(gl,S.vertex,S.glassF),depth=program(gl,S.shadowV,S.shadowF),sky=program(gl,S.screenV,S.skyF);
    const sun=normalize([-.524,.792,.313]),light=lightSpace(sun);
    const [geometryData,materialData]=await incoming,scene=importScene(gl,geometryData);
    materials(gl,materialData,aniso);imageTexture(gl,2,HouseArt.atlas(),false,aniso);imageTexture(gl,3,HouseArt.garden(),true,null);
    const ssize=shadowMap(gl,depth,scene.solid,light);gl.deleteProgram(depth.p);
    const empty=gl.createVertexArray(),planes=Array.from({length:6},()=>new Float32Array(4)),vp=identity(),view=identity();
    let w=0,h=0,proj=null,aspect=1,glassKey='',glassOrder=scene.meta.glassGroups.slice(),order=new Uint32Array(scene.panes.length);
    const fov=66*Math.PI/180,halfLens=Math.tan(fov/2),active=[];
    for(const prog of [opaque,panes,sky]){
      gl.useProgram(prog.p);
      if(prog.loc.uSun!=null)gl.uniform3fv(prog.loc.uSun,sun);
      if(prog.loc.uLight!=null)gl.uniformMatrix4fv(prog.loc.uLight,false,light);
      if(prog.loc.uShadowTexel!=null)gl.uniform1f(prog.loc.uShadowTexel,1/ssize);
    }
    const draw=(eye,yaw,pitch)=>{
      const cssW=Math.max(1,canvas.clientWidth),cssH=Math.max(1,canvas.clientHeight),dpr=Math.min(window.devicePixelRatio||1,1.5,Math.sqrt(1920000/(cssW*cssH)));
      const nw=Math.max(1,Math.round(cssW*dpr)),nh=Math.max(1,Math.round(cssH*dpr));
      if(nw!==w||nh!==h){w=nw;h=nh;canvas.width=w;canvas.height=h;aspect=w/h;proj=perspective(fov,aspect,.035,70);gl.viewport(0,0,w,h);}
      const cp=Math.cos(pitch),sp=Math.sin(pitch),cy=Math.cos(yaw),sy=Math.sin(yaw),f=[sy*cp,sp,-cy*cp],r=[cy,0,sy],u=[-sy*sp,cp,cy*sp];
      cameraMatrix(eye,f,r,u,view);matrixProduct(proj,view,vp);frustum(vp,planes);
      gl.disable(gl.BLEND);gl.enable(gl.DEPTH_TEST);gl.depthFunc(gl.LESS);gl.depthMask(true);gl.clearColor(.77,.81,.75,1);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
      gl.useProgram(opaque.p);gl.uniformMatrix4fv(opaque.loc.uVP,false,vp);gl.uniform3fv(opaque.loc.uEye,eye);gl.bindVertexArray(scene.solid.vao);
      active.length=0;for(const c of scene.meta.chunks)if(visible(c,planes)){c.depth=dot(c.center,f);active.push(c);}
      active.sort((a,b)=>a.depth-b.depth);for(const c of active)gl.drawElements(gl.TRIANGLES,c.count,gl.UNSIGNED_INT,c.offset*4);
      gl.depthMask(false);gl.depthFunc(gl.LEQUAL);gl.useProgram(sky.p);gl.bindVertexArray(empty);
      gl.uniform3fv(sky.loc.uEye,eye);gl.uniform3fv(sky.loc.uForward,f);gl.uniform3fv(sky.loc.uRight,r);gl.uniform3fv(sky.loc.uUp,u);gl.uniform2f(sky.loc.uLens,halfLens*aspect,halfLens);gl.drawArrays(gl.TRIANGLES,0,3);
      gl.useProgram(panes.p);gl.uniformMatrix4fv(panes.loc.uVP,false,vp);gl.uniform3fv(panes.loc.uEye,eye);gl.bindVertexArray(scene.glass.vao);
      const key=Math.round(yaw*24)+'/'+Math.round(pitch*18);
      if(key!==glassKey){
        glassKey=key;glassOrder.sort((a,b)=>dot(b.center,f)-dot(a.center,f));let cursor=0;
        for(const p of glassOrder){order.set(scene.panes.subarray(p.offset,p.offset+p.count),cursor);cursor+=p.count;}
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,scene.glass.ebo);gl.bufferSubData(gl.ELEMENT_ARRAY_BUFFER,0,order);
      }
      gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);gl.drawElements(gl.TRIANGLES,scene.glass.count,gl.UNSIGNED_INT,0);
      gl.disable(gl.BLEND);gl.depthMask(true);gl.bindVertexArray(null);
    };
    return {draw,obstacles:scene.meta.obstacles};
  }
  return {create,math:{normalize,dot,cross,cameraMatrix,matrixProduct,perspective,lightSpace,frustum,visible}};
})();
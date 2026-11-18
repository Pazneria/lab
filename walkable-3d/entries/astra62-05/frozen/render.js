'use strict';
(() => {
 const dot=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2];
 function view(eye,target,up){
   const z=S.unit(S.sub(eye,target)),x=S.unit(S.cross(up,z)),y=S.cross(z,x);
   return new Float32Array([x[0],y[0],z[0],0,x[1],y[1],z[1],0,x[2],y[2],z[2],0,-dot(x,eye),-dot(y,eye),-dot(z,eye),1]);
 }
 function perspective(radians,ar,n,f){
   let s=1/Math.tan(radians/2);return new Float32Array([s/ar,0,0,0,0,s,0,0,0,0,-(f+n)/(f-n),-1,0,0,-2*f*n/(f-n),0]);
 }
 function ortho(w,n,f){return new Float32Array([1/w,0,0,0,0,1/w,0,0,0,0,-2/(f-n),0,0,0,-(f+n)/(f-n),1])}
 function times(a,b){
   let m=new Float32Array(16);
   for(let c=0;c<4;c++)for(let r=0;r<4;r++)m[c*4+r]=a[r]*b[c*4]+a[r+4]*b[c*4+1]+a[r+8]*b[c*4+2]+a[r+12]*b[c*4+3];
   return m;
 }
 function noiseImage(){
   const s=256,rng=S.random(42090),a=new Uint8Array(s*s*4),tiles=[];
   for(let n of [4,8,16,32,64,128]){let v=new Float32Array(n*n);for(let i=0;i<v.length;i++)v[i]=rng();tiles.push({v,n})}
   function sample(xx,yy,t){
     let {v,n}=tiles[t],x=xx*n,y=yy*n,i=Math.floor(x),j=Math.floor(y),u=x-i,w=y-j,b=n-1;u=u*u*(3-2*u);w=w*w*(3-2*w);
     let p=v[(i&b)+(j&b)*n],q=v[((i+1)&b)+(j&b)*n],r=v[(i&b)+((j+1)&b)*n],k=v[((i+1)&b)+((j+1)&b)*n];
     return p+u*(q-p)+w*(r-p)+u*w*(p-q-r+k);
   }
   for(let j=0;j<s;j++)for(let i=0;i<s;i++){
     const x=i/s,z=j/s,k=(j*s+i)*4;
     let broad=.06*sample(x,z,0)+.40*sample(x,z,1)+.28*sample(x,z,2)+.13*sample(x,z,3)+.09*sample(x,z,4)+.04*sample(x,z,5);
     a[k]=Math.round(broad*255);a[k+1]=Math.round(rng()*255);a[k+2]=Math.round((.43*sample(x*2,z,2)+.33*sample(x*3,z,3)+.24*sample(x*4,z,4))*255);a[k+3]=255;
   }return {s,a};
 }
 function groundImage(){
   const s=1024,extent=36,a=new Uint8Array(s*s*4);
   for(let k=0;k<a.length;k+=4){a[k]=a[k+1]=255}
   function raster(x,z,rx,rz,paint){
     let l=Math.max(0,Math.floor(((x-rx)/extent+.5)*s)),r=Math.min(s-1,Math.ceil(((x+rx)/extent+.5)*s));
     let b=Math.max(0,Math.floor(((z-rz)/extent+.5)*s)),t=Math.min(s-1,Math.ceil(((z+rz)/extent+.5)*s));
     for(let j=b;j<=t;j++)for(let i=l;i<=r;i++)paint(((i+.5)/s-.5)*extent-x,((j+.5)/s-.5)*extent-z,(i+j*s)*4);
   }
   for(let c of S.contacts)raster(c.x,c.z,c.rx,c.rz,(dx,dz,k)=>{
     let d=(dx/c.rx)**2+(dz/c.rz)**2;if(d>=1)return;let ambient=1-c.p*(1-d)**1.8,j=k+(c.inside?1:0);a[j]=Math.min(a[j],Math.round(ambient*255));
   });
   for(let [x,z,angle,foot,power] of S.footprints){
     let co=Math.cos(angle),sn=Math.sin(angle);
     raster(x,z,.23,.23,(dx,dz,k)=>{
       let u=dx*co-dz*sn,v=dx*sn+dz*co;
       let shank=Math.exp(-((v+.018)**2)/.0011),width=.056-.0155*shank+.008*S.smooth(-.03,.10,v);
       let toe=(Math.abs(u)/width)**3.3+(Math.abs(v-.028)/.126)**4.1;
       let heel=(Math.abs(u)/.048)**4+(Math.abs(v+.122)/.036)**4;
       let contour=Math.min(toe,heel),p=1-S.smooth(.56,1.48,contour);
       let serration=Math.abs(Math.sin(v*135+Math.abs(u)*39+(foot?.2:0)));
       let print=p*power*(.65+.35*S.smooth(.03,.63,serration));
       a[k+2]=Math.max(a[k+2],Math.round(print*255));

     });
   }
   for(let [cx,cz,rx,rz] of S.icePools)raster(cx,cz,rx+rz,rx+rz,(dx,dz,k)=>{
     a[k+3]=Math.max(a[k+3],Math.round(255*S.iceCover(cx+dx,cz+dz)));
   });
   const workContacts=[
     [-1.012,-3.444,.41,.31,.72],[-1.62,-3.64,.18,.16,.76],[.36,-3.476,.66,.31,.92],
     [1.365,-3.358,.181,.213,.37],[2.32,-3.455,.331,.227,.84],[2.94,-3.328,.077,.074,.67],
     [3.66,-3.583,.36,.207,.83],[-.405,-3.811,.245,.126,.73],
     [3.984,-.064,.272,.339,.85],[3.898,.571,.102,.107,.75],[3.99,.808,.097,.10,.69],[4.085,1.056,.093,.095,.75]
   ];
   for(let [cx,cz,rx,rz,power] of workContacts)raster(cx,cz,rx,rz,(x,z,k)=>{
     const rr=(x/rx)**2+(z/rz)**2;
     if(rr<1)a[k+2]=Math.max(a[k+2],Math.round(255*power*(1-rr)**.72));
   });
   return {s,a};
 }
 function lighting(){
   const p0=[-.571*24,1.3+.516*24,.638*24],vec=(p,t,up,fov)=>times(perspective(fov*Math.PI/180,1,.045,21),view(p,t,up));
   return [times(ortho(16.2,.3,55),view(p0,[0,1.3,0],[0,1,0])),
     vec([-.44,2.984,-.78],[-.44,.6,-.865],[0,0,-1],151),
     vec([-1.206,2.300,-3.520],[-.999,1.53,-3.225],[0,0,-1],121),
     vec([.262,2.40,4.177],[-.21,.54,5.47],[0,1,0],151)];
 }
 function frustum(m){
   const p=[];for(let axis=0;axis<3;axis++)for(let sign of [-1,1])p.push([m[3]+sign*m[axis],m[7]+sign*m[4+axis],m[11]+sign*m[8+axis],m[15]+sign*m[12+axis]]);
   return p;
 }
 function visible(b,planes){for(let p of planes)if(p[0]*b[p[0]<0?0:3]+p[1]*b[p[1]<0?1:4]+p[2]*b[p[2]<0?2:5]+p[3]<0)return false;return true}
 // All cabin openings, expanded beyond their jambs for conservative clipping.
 const apertures=[
   [[1.31,1.60,1.70],[3.94,2.69,1.70]], [[-1.71,.62,1.70],[.13,3.02,1.70]],
   [[.45,1.91,-4.10],[2.64,2.90,-4.10]], [[-4.55,1.65,-2.45],[-4.55,2.54,-.42]],
   [[4.55,1.68,-.75],[4.55,2.76,1.0]]
 ];
 function outdoorRect(cam,m,w,h){
   if(Math.abs(cam.x)>4.32||cam.z< -3.86||cam.z>1.47)return null;
   let union=[1,1,-1,-1];
   for(let [a,b] of apertures){
     let bounds=[1,1,-1,-1],front=0;
     for(let u of [0,1])for(let v of [0,1]){
       const x=u?b[0]:a[0],y=v?b[1]:a[1],z=u?b[2]:a[2],cw=m[3]*x+m[7]*y+m[11]*z+m[15];
       if(cw<=.045)continue;
       front++;let nx=(m[0]*x+m[4]*y+m[8]*z+m[12])/cw,ny=(m[1]*x+m[5]*y+m[9]*z+m[13])/cw;
       bounds[0]=Math.min(bounds[0],nx);bounds[1]=Math.min(bounds[1],ny);bounds[2]=Math.max(bounds[2],nx);bounds[3]=Math.max(bounds[3],ny);
     }
     if(front>0&&front<4)return null;
     if(!front||bounds[0]>=1||bounds[1]>=1||bounds[2]<=-1||bounds[3]<=-1)continue;
     union[0]=Math.min(union[0],bounds[0]);union[1]=Math.min(union[1],bounds[1]);union[2]=Math.max(union[2],bounds[2]);union[3]=Math.max(union[3],bounds[3]);
   }
   if(union[0]>=union[2]||union[1]>=union[3])return [0,0,0,0];
   const l=Math.max(0,Math.floor((union[0]*.5+.5)*w)-5),r=Math.min(w,Math.ceil((union[2]*.5+.5)*w)+5);
   const b=Math.max(0,Math.floor((union[1]*.5+.5)*h)-5),t=Math.min(h,Math.ceil((union[3]*.5+.5)*h)+5);
   return [l,b,r-l,t-b];
 }
 const haloVertex=`#version 300 es
 precision highp float;
 layout(location=0) in vec4 light;layout(location=1) in vec4 dir;
 uniform mat4 uVP;uniform vec3 uEye;uniform vec3 uRight;uniform vec3 uUp;
 out vec2 vuv;out float amount;
 void main(){
  const vec2 corners[6]=vec2[6](vec2(-1.,-1.),vec2(1.,-1.),vec2(1.,1.),vec2(-1.,-1.),vec2(1.,1.),vec2(-1.,1.));
  vec2 p=corners[gl_VertexID];vuv=p;
  amount=dir.w*smoothstep(-.06,.51,dot(normalize(uEye-light.xyz),dir.xyz));
  gl_Position=uVP*vec4(light.xyz+light.w*(uRight*p.x+uUp*p.y),1.);
 }`;
 const haloFrag=`#version 300 es
 precision highp float;
 in vec2 vuv;in float amount;out vec4 frag;
 void main(){float r=dot(vuv,vuv);float f=exp(-r*5.)*(1.-smoothstep(.65,1.,r));
 frag=vec4(1.,.70,.37,f*amount);}`;
 S.renderer=function(canvas){
   const gl=canvas.getContext('webgl2',{alpha:false,antialias:true,depth:true,stencil:false,powerPreference:'high-performance'});
   if(!gl)throw Error('This station requires WebGL 2. Enable hardware acceleration and reopen the page.');
   function program(vs,fs){
     function compile(type,source){const sh=gl.createShader(type);gl.shaderSource(sh,source);gl.compileShader(sh);if(!gl.getShaderParameter(sh,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(sh));return sh}
     const v=compile(gl.VERTEX_SHADER,vs),f=compile(gl.FRAGMENT_SHADER,fs),id=gl.createProgram();
     gl.attachShader(id,v);gl.attachShader(id,f);gl.linkProgram(id);gl.deleteShader(v);gl.deleteShader(f);
     if(!gl.getProgramParameter(id,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(id));
     const uniforms=new Map();return {id,u:n=>{if(!uniforms.has(n))uniforms.set(n,gl.getUniformLocation(id,n));return uniforms.get(n)}};
   }
   const sh=S.shaders,p=program(sh.vertex,sh.solid),glass=program(sh.vertex,sh.glass),sky=program(sh.skyVertex,sh.sky),depth=program(sh.depthVertex,sh.depth),halo=program(haloVertex,haloFrag);
   const aniso=gl.getExtension('EXT_texture_filter_anisotropic');
   function texture(unit,source,repeat,levels=1){
     const t=gl.createTexture();gl.activeTexture(gl.TEXTURE0+unit);gl.bindTexture(gl.TEXTURE_2D,t);
     if(source.a)gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA8,source.s,source.s,0,gl.RGBA,gl.UNSIGNED_BYTE,source.a);
     else gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA8,gl.RGBA,gl.UNSIGNED_BYTE,source);
     gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR_MIPMAP_LINEAR);
     gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,repeat?gl.REPEAT:gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,repeat?gl.REPEAT:gl.CLAMP_TO_EDGE);
     gl.generateMipmap(gl.TEXTURE_2D);if(aniso&&levels>1)gl.texParameterf(gl.TEXTURE_2D,aniso.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(levels,gl.getParameter(aniso.MAX_TEXTURE_MAX_ANISOTROPY_EXT)));return t;
   }
   texture(0,noiseImage(),true,2);texture(1,S.makeAtlas(),false,4);
   S.landscape();S.shelter();S.interior();S.fieldgear();texture(2,groundImage(),false,2);
   const meshes={};
   for(let [name,g] of Object.entries(S.groups)){
     let b=[Infinity,Infinity,Infinity,-Infinity,-Infinity,-Infinity];for(let i=0;i<g.v.length;i+=14)for(let j=0;j<3;j++){b[j]=Math.min(b[j],g.v[i+j]);b[j+3]=Math.max(b[j+3],g.v[i+j])}
     let vao=gl.createVertexArray();gl.bindVertexArray(vao);
     const vb=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,vb);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(g.v),gl.STATIC_DRAW);
     for(const [index,count,offset] of [[0,3,0],[1,3,3],[2,3,6],[3,2,9],[4,3,11]]){gl.enableVertexAttribArray(index);gl.vertexAttribPointer(index,count,gl.FLOAT,false,56,offset*4)}
     const ib=gl.createBuffer();gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,ib);
     const small=g.v.length/14<65536;gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,small?new Uint16Array(g.i):new Uint32Array(g.i),gl.STATIC_DRAW);
     meshes[name]={vao,count:g.i.length,type:small?gl.UNSIGNED_SHORT:gl.UNSIGNED_INT,b,ranges:g.ranges||null,stride:small?2:4};
     delete S.groups[name];
   }
   function draw(name){const m=meshes[name];gl.bindVertexArray(m.vao);gl.drawElements(gl.TRIANGLES,m.count,m.type,0)}
   function drawRanges(name,planes){const m=meshes[name];gl.bindVertexArray(m.vao);for(let r of m.ranges)if(visible(r.b,planes))gl.drawElements(gl.TRIANGLES,r.count,m.type,r.start*m.stride)}
   const lightMatrices=lighting(),all=new Float32Array(64);lightMatrices.forEach((m,i)=>all.set(m,i*16));
   const shadowSize=1536,shadow=gl.createTexture();gl.activeTexture(gl.TEXTURE3);gl.bindTexture(gl.TEXTURE_2D_ARRAY,shadow);
   gl.texStorage3D(gl.TEXTURE_2D_ARRAY,1,gl.DEPTH_COMPONENT24,shadowSize,shadowSize,4);
   for(let param of [gl.TEXTURE_MIN_FILTER,gl.TEXTURE_MAG_FILTER])gl.texParameteri(gl.TEXTURE_2D_ARRAY,param,gl.LINEAR);
   for(let param of [gl.TEXTURE_WRAP_S,gl.TEXTURE_WRAP_T])gl.texParameteri(gl.TEXTURE_2D_ARRAY,param,gl.CLAMP_TO_EDGE);
   gl.texParameteri(gl.TEXTURE_2D_ARRAY,gl.TEXTURE_COMPARE_MODE,gl.COMPARE_REF_TO_TEXTURE);gl.texParameteri(gl.TEXTURE_2D_ARRAY,gl.TEXTURE_COMPARE_FUNC,gl.LEQUAL);
   const fb=gl.createFramebuffer();gl.bindFramebuffer(gl.FRAMEBUFFER,fb);gl.drawBuffers([gl.NONE]);gl.readBuffer(gl.NONE);
   gl.viewport(0,0,shadowSize,shadowSize);gl.useProgram(depth.id);gl.enable(gl.DEPTH_TEST);gl.disable(gl.CULL_FACE);gl.enable(gl.POLYGON_OFFSET_FILL);gl.polygonOffset(1.15,1.5);
   for(let i=0;i<4;i++){
     gl.framebufferTextureLayer(gl.FRAMEBUFFER,gl.DEPTH_ATTACHMENT,shadow,0,i);
     if(gl.checkFramebufferStatus(gl.FRAMEBUFFER)!==gl.FRAMEBUFFER_COMPLETE)throw Error('The graphics device could not allocate the station shadow atlas.');
     gl.clear(gl.DEPTH_BUFFER_BIT);gl.uniformMatrix4fv(depth.u('uVP'),false,lightMatrices[i]);
     const planes=frustum(lightMatrices[i]);
     for(let name of i===0?['station','interior','vestibule','snow']:['station','interior','vestibule'])if(visible(meshes[name].b,planes))draw(name);
   }
   gl.bindFramebuffer(gl.FRAMEBUFFER,null);gl.deleteFramebuffer(fb);gl.disable(gl.POLYGON_OFFSET_FILL);
   for(let pr of [p,glass,sky]){gl.useProgram(pr.id);for(let [n,unit] of [['uNoise',0],['uAtlas',1],['uGround',2],['uDepth',3]])gl.uniform1i(pr.u(n),unit);gl.uniformMatrix4fv(pr.u('uLight[0]'),false,all)}
   let hv=gl.createVertexArray();gl.bindVertexArray(hv);let hb=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,hb);
   gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([
     -.44,2.993,-.78,.40,0,-1,0,.067, 2.75,2.987,-2.86,.37,0,-1,0,.063,
     -1.203,2.294,-3.515,.202,.31,-.82,.48,.106, .262,2.4,4.173,.28,0,0,1,.127,
     -.79,2.933,2.62,.30,0,-1,0,.085, -4.123,2.216,-2.13,.185,.43,-.90,0,.093
   ]),gl.STATIC_DRAW);
   for(let i=0;i<2;i++){gl.enableVertexAttribArray(i);gl.vertexAttribPointer(i,4,gl.FLOAT,false,32,i*16);gl.vertexAttribDivisor(i,1)}
   gl.bindVertexArray(null);gl.clearColor(.45,.58,.73,1);
   let prop=1,proj=null,w=0,h=0,angle=64*Math.PI/180;
   function resize(){
     const cw=Math.max(2,canvas.clientWidth),ch=Math.max(2,canvas.clientHeight);
     const dpr=Math.min(window.devicePixelRatio||1,1.5,Math.sqrt(2419200/(cw*ch)));
     let nw=Math.max(2,Math.round(cw*dpr)),nh=Math.max(2,Math.round(ch*dpr));if(w===nw&&h===nh)return;
     canvas.width=w=nw;canvas.height=h=nh;prop=w/h;proj=perspective(angle,prop,.041,226);
   }
   function frame(camera){
     resize();const eye=[camera.x,camera.y,camera.z],cy=Math.cos(camera.yaw),sy=Math.sin(camera.yaw),ct=Math.cos(camera.pitch),st=Math.sin(camera.pitch);
     const forward=[sy*ct,st,-cy*ct],right=[cy,0,sy],up=S.cross(right,forward),vp=times(proj,view(eye,S.add(eye,forward),up)),planes=frustum(vp);
     gl.viewport(0,0,w,h);gl.depthMask(true);gl.depthFunc(gl.LESS);gl.enable(gl.CULL_FACE);gl.enable(gl.DEPTH_TEST);gl.disable(gl.BLEND);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
     gl.useProgram(p.id);gl.uniformMatrix4fv(p.u('uVP'),false,vp);gl.uniform3fv(p.u('uEye'),eye);
     for(let name of camera.z<1.65&&Math.abs(camera.x)<4.55?['interior','station','vestibule']:['station','vestibule','interior'])if(visible(meshes[name].b,planes))draw(name);
     const windowRect=outdoorRect(camera,vp,w,h);
     if(windowRect){gl.enable(gl.SCISSOR_TEST);gl.scissor(...windowRect)}
     if(!windowRect||windowRect[2]){drawRanges('snow',planes);drawRanges('horizon',planes)}
     gl.depthMask(false);gl.depthFunc(gl.LEQUAL);gl.disable(gl.CULL_FACE);
     gl.useProgram(sky.id);gl.uniform3fv(sky.u('uForward'),forward);gl.uniform3fv(sky.u('uRight'),right);gl.uniform3fv(sky.u('uUp'),up);gl.uniform2f(sky.u('uFov'),Math.tan(angle/2)*prop,Math.tan(angle/2));
     gl.bindVertexArray(null);gl.drawArrays(gl.TRIANGLES,0,3);if(windowRect)gl.disable(gl.SCISSOR_TEST);
     gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);gl.useProgram(glass.id);gl.uniformMatrix4fv(glass.u('uVP'),false,vp);gl.uniform3fv(glass.u('uEye'),eye);draw('glass');
     gl.blendFunc(gl.SRC_ALPHA,gl.ONE);gl.useProgram(halo.id);gl.uniformMatrix4fv(halo.u('uVP'),false,vp);gl.uniform3fv(halo.u('uEye'),eye);gl.uniform3fv(halo.u('uRight'),right);gl.uniform3fv(halo.u('uUp'),up);
     gl.bindVertexArray(hv);gl.drawArraysInstanced(gl.TRIANGLES,0,6,6);gl.disable(gl.BLEND);gl.depthMask(true);gl.bindVertexArray(null);
   }
   return frame;
 };
})();

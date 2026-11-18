'use strict';
const Graphics=(()=>{
 const {unit,cross,sub,dot,add,mul}=G;
 const perspective=(f,a,n,z)=>new Float32Array([1/(Math.tan(f/2)*a),0,0,0,0,1/Math.tan(f/2),0,0,0,0,(z+n)/(n-z),-1,0,0,2*z*n/(n-z),0]);
 const ortho=(w,h,n,f)=>new Float32Array([1/w,0,0,0,0,1/h,0,0,0,0,-2/(f-n),0,0,0,-(f+n)/(f-n),1]);
 function mult(a,b){const c=new Float32Array(16);for(let j=0;j<4;j++)for(let i=0;i<4;i++)for(let k=0;k<4;k++)c[4*j+i]+=a[4*k+i]*b[4*j+k];return c}
 function view(pos,dir,up=[0,1,0]){const z=mul(unit(dir),-1),x=unit(cross(up,z)),y=cross(z,x);return new Float32Array([x[0],y[0],z[0],0,x[1],y[1],z[1],0,x[2],y[2],z[2],0,-dot(x,pos),-dot(y,pos),-dot(z,pos),1])}
 const vs=`#version 300 es
 precision highp float;
 layout(location=0) in vec3 pos;layout(location=1) in vec3 normal;layout(location=2) in vec2 uv;layout(location=3) in vec3 color;layout(location=4) in float material;
 uniform mat4 vp;uniform mat4 shadowMatrix;
 out vec3 p;out vec3 n;out vec2 vUv;out vec3 tint;out vec4 lightPos;flat out int id;
 void main(){p=pos;n=normal;vUv=uv;tint=color;id=int(material+.5);lightPos=shadowMatrix*vec4(pos,1.);gl_Position=vp*vec4(pos,1.);}`;
 const shVert=`#version 300 es
 layout(location=0) in vec3 pos;uniform mat4 vp;void main(){gl_Position=vp*vec4(pos,1.);}`;
 const shFrag=`#version 300 es
 precision mediump float;void main(){}`;
 const skyCode=`
 float hash21(vec2 p){vec3 p3=fract(vec3(p.xyx)*.1031);p3+=dot(p3,p3.yzx+33.33);return fract((p3.x+p3.y)*p3.z);}
 float value(vec2 p){vec2 i=floor(p),a=fract(p);a=a*a*(3.-2.*a);return mix(mix(hash21(i),hash21(i+vec2(1.,0.)),a.x),mix(hash21(i+vec2(0.,1.)),hash21(i+1.),a.x),a.y);}
 vec3 atmosphere(vec3 d){float h=max(.035,d.y+.055);vec2 uv=d.xz/(h+.27);float f=value(uv*1.7)*.53+value(uv*4.1+13.)*.28+value(uv*11.+.4)*.13+value(uv*31.-7.)*.06;
 vec3 a=mix(vec3(.73,.79,.79),vec3(.38,.49,.54),smoothstep(-.08,.97,d.y));a+=(f-.5)*.225*smoothstep(-.1,.32,d.y);float s=max(0.,dot(d,normalize(vec3(.45,.64,-.63))));return a+vec3(.14,.12,.085)*pow(s,12.);}`;
 const skyV=`#version 300 es
 out vec2 ndc;void main(){vec2 pt=vec2((gl_VertexID<<1)&2,gl_VertexID&2);ndc=pt*2.-1.;gl_Position=vec4(ndc,1.,1.);}`;
 const skyF=`#version 300 es
 precision highp float;in vec2 ndc;uniform vec3 fw,rt,up;uniform vec2 tanHalf;out vec4 outColor;`+skyCode+`
 void main(){outColor=vec4(atmosphere(normalize(fw+ndc.x*tanHalf.x*rt+ndc.y*tanHalf.y*up)),1.);}`;
 const fs=`#version 300 es
 precision highp float;precision highp int;precision highp sampler2DArray;precision highp sampler2DShadow;precision highp sampler3D;
 in vec3 p;in vec3 n;in vec2 vUv;in vec3 tint;in vec4 lightPos;flat in int id;
 uniform vec3 eye;uniform sampler2DArray swatches;uniform sampler2D signs;uniform sampler2DShadow sunDepth;
 uniform samplerCube hallEnv,deckEnv,overlookEnv;uniform sampler3D lightField,lampField;uniform sampler2D floorWeather;uniform int probesReady;
 out vec4 outColor;
 const vec3 sun=normalize(vec3(.45,.64,-.63));
 float shadow(vec3 N){vec3 q=lightPos.xyz*.5+.5;if(any(lessThan(q,vec3(0.)))||any(greaterThan(q,vec3(1.))))return 1.;
 float bias=.00025+.0007*(1.-max(dot(N,sun),0.));q.z-=bias;vec2 o=vec2(.00048,.00021);return .25*(texture(sunDepth,q+vec3(o,0.))+texture(sunDepth,q-vec3(o,0.))+texture(sunDepth,q+vec3(-o.y,o.x,0.))+texture(sunDepth,q+vec3(o.y,-o.x,0.)));}
 vec3 projectBox(vec3 r,vec3 origin,vec3 low,vec3 high){vec3 rr=sign(r+vec3(1e-7))*max(abs(r),vec3(.0001));vec3 sides=mix(low,high,step(vec3(0.),r));vec3 t=(sides-p)/rr;return p+r*max(.01,min(t.x,min(t.y,t.z)))-origin;}
 vec3 environment(vec3 r,float rough,float hall,float deck){
 vec3 sky=mix(vec3(.20,.27,.28),vec3(.69,.77,.79),smoothstep(-.25,.18,r.y));
 if(probesReady==0)return sky;
 if(hall<.985&&deck<.985){vec3 outlook=r;if(p.z< -11.32&&p.z> -17.45&&p.x>.2&&p.x<5.9){vec3 close=projectBox(r,vec3(3.12,1.6,-14.25),vec3(.32,-.10,-17.39),vec3(5.76,3.49,-11.42));outlook=mix(r,normalize(close),smoothstep(.14,.66,r.y));}sky=textureLod(overlookEnv,outlook,rough*5.).rgb;if(max(hall,deck)<.015)return sky;}
 vec3 a=projectBox(r,vec3(1.2,1.75,6.),vec3(-6.48,-.4,.23),vec3(5.58,5.35,13.72));vec3 b=projectBox(r,vec3(1.7,1.7,-5.4),vec3(-6.45,-1.4,-11.35),vec3(5.58,5.4,.4));
 if(hall>.99)return textureLod(hallEnv,a,rough*5.).rgb;if(deck>.99&&hall<.01)return textureLod(deckEnv,b,rough*5.).rgb;vec3 ha=textureLod(hallEnv,a,rough*5.).rgb;vec3 de=textureLod(deckEnv,b,rough*5.).rgb;return mix(mix(sky,de,deck),ha,hall);}
 vec3 lamp(vec3 pos,vec3 power,vec3 N,vec3 V,float rough){vec3 v=pos-p;float d=dot(v,v)+.07;vec3 L=v*inversesqrt(d);float nl=max(0.,dot(N,L));float spec=pow(max(0.,dot(N,normalize(L+V))),mix(65.,7.,rough))*(1.-rough)*.38;return power*(nl+spec)/(.85+d);}
 vec3 fogged(vec3 col,float dist){float valley=mix(1.18,.72,smoothstep(-18.,54.,p.y));float fog=1.-exp(-max(dist-13.,0.)*.00665*valley);vec3 haze=mix(vec3(.58,.67,.69),vec3(.75,.80,.80),clamp((p.y+30.)*.010,0.,1.));return mix(col,haze,clamp(fog,0.,.94));}
 void main(){
 vec3 V=normalize(eye-p),N=normalize(n);float dist=length(eye-p);bool glass=id==12||id==22;
 if(id==19){vec2 mesh=abs(fract(vec2(vUv.x+vUv.y,vUv.x-vUv.y)*17.)-.5);float lines=min(mesh.x,mesh.y);if(lines>.074)discard;}
 if(id==11||id==16){float nl=dot(N,sun)*.5+.5;vec3 col=tint*(.66+.40*nl);
 if(id==11){float grit=texture(swatches,vec3(p.xz*.036+p.y*.019,11.)).r;float snow=smoothstep(.48,.76,min(tint.r,tint.g));float strata=.5+.5*sin(p.y*1.39+p.x*.34+p.z*.18+grit*19.);
 col*=.92+.15*grit-.075*(1.-snow)*(1.-N.y)*strata;col+=snow*vec3(-.016,.003,.027)*(1.-nl);
 }float layer=(p.y-4.-5.*sin(p.x*.036+p.z*.018))*.115;float cloud=smoothstep(52.,145.,dist)*.29*exp(-layer*layer);
 col=mix(col,vec3(.68,.74,.74),cloud);outColor=vec4(fogged(col,dist),1.);return;}
 if(id==25){outColor=vec4(tint,.22);return;}
 float hall=smoothstep(-.72,1.35,p.z)*(1.-smoothstep(13.28,14.35,p.z))*(1.-smoothstep(5.15,6.55,abs(p.x)));
 float deck=(1.-smoothstep(.35,1.8,p.z))*smoothstep(-13.,-10.1,p.z)*(1.-smoothstep(5.2,7.1,abs(p.x)));
 int k=id;if(k>14)k=0;if(glass)k=12;if(id==20)k=6;if(id==19)k=2;if(id==23)k=4;
 float scale=.66;if(k==3||k==4)scale=.57;if(k==5)scale=.37;if(k==6)scale=.31;if(k==8)scale=3.3;if(k==9)scale=1.66;if(glass)scale=.70;
 vec2 uv=vUv*scale;vec4 t=texture(swatches,vec3(uv,float(k)));
 vec3 base=tint*t.r;float rough=t.g;float pooled=0.;
 if((id==6||id==23||id==20)&&N.y>.6){
 vec3 wear=texture(floorWeather,(p.xz-vec2(-6.6,-17.7))/vec2(12.8,32.)).rgb;
 pooled=wear.r;rough=mix(id==23?.57:rough,.075,pooled*.91);
 base*=1.-.20*pooled-.28*wear.g-.54*wear.b;
 }else if(id==5){
 vec2 wallUv=vec2((abs(N.x)>.5?p.z:p.x)*.18,p.y*.042);
 float age=clamp((texture(swatches,vec3(wallUv,5.)).r-.745)*6.,0.,1.)*exp(-max(p.y,0.)*.67);
 base*=mix(vec3(1.),vec3(.80,.83,.78),age*.74);
 }
 if(id==3||id==4||id==23){float fiber=clamp((.72-t.r)*2.8,0.,.62);base*=mix(vec3(1.),vec3(.99,.81,.67),fiber);}
 if(id==2&&abs(p.x+1.324)<.069&&abs(N.x)>.85){float radius=length(p.yz-vec2(2.68,6.10));if(radius>1.73&&radius<2.116){
 float engrave=sin(radius*943.)*(1.-smoothstep(.0009,.0075,fwidth(radius)));
 base*=.98+.031*engrave;rough=clamp(rough+.047*engrave,.16,.56);}}
 if(id==14){base=texture(signs,vUv).rgb;rough=.54;}
 if(id==13){outColor=vec4(fogged(tint*1.06,dist),1.);return;}
 if(id==20){base*=.96;rough=.59;}
 if(id==0)base=tint*(.93+.07*t.r);
 vec2 bump=(t.ba*2.-1.);vec3 dp1=dFdx(p),dp2=dFdy(p);vec2 duv1=dFdx(uv),duv2=dFdy(uv);
 vec3 T=cross(dp2,N)*duv1.x+cross(N,dp1)*duv2.x,B=cross(dp2,N)*duv1.y+cross(N,dp1)*duv2.y;
 float inv=inversesqrt(max(max(dot(T,T),dot(B,B)),1e-10));
 float intensity=glass?1.26:(k==6?.48:.53);intensity*=1.-.77*pooled;if(id==14||id==19)intensity=0.;
 N=normalize(N+(T*bump.x+B*bump.y)*inv*intensity);
 if(glass&&dot(N,V)<0.)N=-N;
 float nv=clamp(dot(N,V),.001,1.);vec3 R=reflect(-V,N);
 float s=shadow(N),nl=max(0.,dot(N,sun));
 vec3 field=texture(lightField,(p+N*.21-vec3(-7.56,-2.1,-18.2))/vec3(15.04,9.28,32.96)).rgb;
 float occlusion=smoothstep(.24,.92,field.r);
 vec3 amb=mix(vec3(.55,.62,.64),vec3(.53,.56,.555),hall);
 amb*=.57+.49*occlusion;amb+=vec3(.10,.125,.135)*field.g;
 amb+=vec3(.075,.078,.075)*N.y;amb+=vec3(.045,.052,.055)*clamp(N.x-N.z,-1.,1.);
 float edgeAO=1.;
 if(p.y<.9&&p.x>.0&&p.x<5.62&&p.z>-.2){edgeAO-=.20*exp(-max(0.,5.55-p.x)*2.8)*hall;}
 if(p.y<.12&&p.z>.65&&p.z<11.8){vec2 delta=max(abs(p.xz-vec2(-1.74,6.0))-vec2(2.2,2.83),0.);edgeAO-=.21*exp(-length(delta)*2.4);}
 vec4 direct=texture(lampField,(p+N*.13-vec3(-7.56,-2.1,-18.2))/vec3(15.04,9.28,32.96));
 vec3 lampDir=direct.rgb*2.-1.;float lampNL=max(0.,dot(N,lampDir)),energy=3.*direct.a*direct.a;
 float lampSpec=pow(max(dot(N,normalize(lampDir+V+vec3(.00001))),0.),mix(86.,8.,rough))*(1.-rough);
 vec3 lampColor=vec3(1.,.684,.372);vec3 local=energy*lampColor*(.075+.925*lampNL);
 vec3 lit=base*(amb*edgeAO+vec3(.43,.43,.39)*nl*(.12+.88*s)+local);
 float spec=pow(max(dot(N,normalize(sun+V)),0.),mix(110.,8.,rough))*(1.-rough);
 lit+=vec3(.24,.23,.20)*s*spec+lampColor*energy*lampSpec*.27;
 float refl=0.;
 if(id==1||id==10)refl=.065+(1.-rough)*.09;
 if(id==2||id==8||id==9)refl=.19+(1.-rough)*.13;
 if(id==6)refl=.035+.32*pow(1.-rough,3.)+.23*pooled;if(id==23)refl=.055+.28*pooled;
 float fres=pow(1.-nv,4.);
 if(glass){vec3 env=environment(R,rough*.52,hall,deck);float drop=clamp(length(bump)*.72,0.,.57);
 vec3 glassCol=mix(base*.72,env,.58+.27*fres);glassCol+=drop*vec3(.23,.25,.25)+vec3(spec*.12);
 float alpha=(id==22?.115:.135)+.47*fres+drop*.68;outColor=vec4(fogged(glassCol,dist),min(.82,alpha));return;}
 if(refl>0.){vec3 env=environment(R,rough,hall,deck);float weight=refl*(.63+1.08*fres);lit=mix(lit,env,clamp(weight,0.,.62));}
 vec3 col=lit/(.93+max(max(lit.r,lit.g),lit.b)*.125);
 outColor=vec4(fogged(col,dist),1.);
 }`;
 const haloV=`#version 300 es
 precision highp float;uniform mat4 vp;uniform vec3 rt,up,eye;out vec2 uv;out float amount;
 const vec3 centers[5]=vec3[5](vec3(1.88,3.852,8.20),vec3(-2.3,3.662,4.),vec3(2.4,3.562,1.32),vec3(2.54,3.562,-5.9),vec3(3.45,2.915,-14.));
 void main(){vec3 c=centers[gl_InstanceID];uv=vec2(float(gl_VertexID&1),float(gl_VertexID>>1))*2.-1.;float s=gl_InstanceID==0||gl_InstanceID==3?.60:.46;
 amount=smoothstep(-.12,.58,c.y-eye.y)*smoothstep(.65,2.,length(c-eye));gl_Position=vp*vec4(c+s*(rt*uv.x+up*uv.y),1.);}`;
 const haloF=`#version 300 es
 precision highp float;in vec2 uv;in float amount;out vec4 col;
 void main(){float r=dot(uv,uv);float a=max(0.,exp(-4.8*r)-.009);col=vec4(vec3(1.,.68,.32),a*amount*.12);}`;
 const drizzleV=`#version 300 es
 precision highp float;uniform mat4 vp;uniform vec3 eye;uniform float sec;out float alpha;
 float rand(float a){return fract(sin(a*23.747+1.7)*6143.73);}
 void main(){float i=float(gl_VertexID/2),t=float(gl_VertexID%2);float fall=fract(rand(i+21.)+sec*(.63+.24*rand(i+4.)));vec3 p=vec3(-16.+rand(i)*36.,7.-fall*11.,-40.+rand(i+13.)*54.);p.x-=fall*1.3;
 bool outside=(p.z < -17.5||p.x>6.25||p.x < -6.8||(p.z< -11.7&&p.x<.25));alpha=outside?.18*clamp(1.-length(eye-p)/33.,0.,1.):0.;p+=vec3(-.026,-.19,.01)*t;gl_Position=vp*vec4(p,1.);}`;
 const drizzleF=`#version 300 es
 precision highp float;in float alpha;out vec4 frag;void main(){frag=vec4(.75,.82,.82,alpha);}`;
 function shaderProgram(gl,v,f){
 function compile(type,src){const s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(s));return s}
 const a=compile(gl.VERTEX_SHADER,v),b=compile(gl.FRAGMENT_SHADER,f),p=gl.createProgram();gl.attachShader(p,a);gl.attachShader(p,b);gl.linkProgram(p);if(!gl.getProgramParameter(p,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(p));gl.deleteShader(a);gl.deleteShader(b);const loc={};for(let i=0;i<gl.getProgramParameter(p,gl.ACTIVE_UNIFORMS);i++){const u=gl.getActiveUniform(p,i);loc[u.name]=gl.getUniformLocation(p,u.name)}return {p,l:loc}
 }
 function upload(gl,signCanvas,images,weather){
 const tex=gl.createTexture();gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D_ARRAY,tex);gl.texStorage3D(gl.TEXTURE_2D_ARRAY,Math.floor(Math.log2(MATERIAL_SIZE))+1,gl.RGBA8,MATERIAL_SIZE,MATERIAL_SIZE,images.length);
 for(let i=0;i<images.length;i++)gl.texSubImage3D(gl.TEXTURE_2D_ARRAY,0,0,0,i,MATERIAL_SIZE,MATERIAL_SIZE,1,gl.RGBA,gl.UNSIGNED_BYTE,images[i]);
 gl.texParameteri(gl.TEXTURE_2D_ARRAY,gl.TEXTURE_MIN_FILTER,gl.LINEAR_MIPMAP_LINEAR);gl.texParameteri(gl.TEXTURE_2D_ARRAY,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.generateMipmap(gl.TEXTURE_2D_ARRAY);
 const aniso=gl.getExtension('EXT_texture_filter_anisotropic');
 if(aniso)gl.texParameterf(gl.TEXTURE_2D_ARRAY,aniso.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(4,gl.getParameter(aniso.MAX_TEXTURE_MAX_ANISOTROPY_EXT)));
 gl.activeTexture(gl.TEXTURE1);const atlas=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,atlas);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA8,gl.RGBA,gl.UNSIGNED_BYTE,signCanvas);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR_MIPMAP_LINEAR);gl.generateMipmap(gl.TEXTURE_2D);if(aniso)gl.texParameterf(gl.TEXTURE_2D,aniso.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(4,gl.getParameter(aniso.MAX_TEXTURE_MAX_ANISOTROPY_EXT)));
 gl.activeTexture(gl.TEXTURE6);const volume=gl.createTexture();gl.bindTexture(gl.TEXTURE_3D,volume);
 const raw=atob(LIGHT_FIELD.bytes),bytes=new Uint8Array(raw.length);for(let i=0;i<raw.length;i++)bytes[i]=raw.charCodeAt(i);gl.pixelStorei(gl.UNPACK_ALIGNMENT,1);
 gl.texImage3D(gl.TEXTURE_3D,0,gl.RGB8,...LIGHT_FIELD.size,0,gl.RGB,gl.UNSIGNED_BYTE,bytes);gl.pixelStorei(gl.UNPACK_ALIGNMENT,4);
 gl.texParameteri(gl.TEXTURE_3D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_3D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);for(const q of [gl.TEXTURE_WRAP_S,gl.TEXTURE_WRAP_T,gl.TEXTURE_WRAP_R])gl.texParameteri(gl.TEXTURE_3D,q,gl.CLAMP_TO_EDGE);
 gl.activeTexture(gl.TEXTURE8);const lampTex=gl.createTexture();gl.bindTexture(gl.TEXTURE_3D,lampTex);
 const lightRaw=atob(LIGHT_FIELD.direct),lightBytes=new Uint8Array(lightRaw.length);for(let i=0;i<lightRaw.length;i++)lightBytes[i]=lightRaw.charCodeAt(i);
 gl.texImage3D(gl.TEXTURE_3D,0,gl.RGBA8,...LIGHT_FIELD.size,0,gl.RGBA,gl.UNSIGNED_BYTE,lightBytes);gl.texParameteri(gl.TEXTURE_3D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_3D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);for(const q of [gl.TEXTURE_WRAP_S,gl.TEXTURE_WRAP_T,gl.TEXTURE_WRAP_R])gl.texParameteri(gl.TEXTURE_3D,q,gl.CLAMP_TO_EDGE);
 gl.activeTexture(gl.TEXTURE7);const weatherTex=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,weatherTex);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGB8,gl.RGB,gl.UNSIGNED_BYTE,weather);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR_MIPMAP_LINEAR);gl.generateMipmap(gl.TEXTURE_2D);
 return {tex,atlas,volume,weatherTex}
 }
 function renderer(gl,signCanvas,images,weather){
 const main=shaderProgram(gl,vs,fs),depth=shaderProgram(gl,shVert,shFrag),sky=shaderProgram(gl,skyV,skyF),rain=shaderProgram(gl,drizzleV,drizzleF),halo=shaderProgram(gl,haloV,haloF);
 const {tex,atlas}=upload(gl,signCanvas,images,weather);
 const batches=[];
 for(const [name,g] of G.groups){if(!g.indices.length)continue;const vao=gl.createVertexArray();gl.bindVertexArray(vao);const vb=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,vb);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(g.verts),gl.STATIC_DRAW);for(const [i,num,start] of [[0,3,0],[1,3,3],[2,2,6],[3,3,8],[4,1,11]]){gl.enableVertexAttribArray(i);gl.vertexAttribPointer(i,num,gl.FLOAT,false,48,start*4)}
 const ib=gl.createBuffer();gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,ib);const wide=g.verts.length/12>65535;gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,wide?new Uint32Array(g.indices):new Uint16Array(g.indices),gl.STATIC_DRAW);
 const lo=[Infinity,Infinity,Infinity],hi=[-Infinity,-Infinity,-Infinity];for(let j=0;j<g.verts.length;j+=12)for(let k=0;k<3;k++){lo[k]=Math.min(lo[k],g.verts[j+k]);hi[k]=Math.max(hi[k],g.verts[j+k])}batches.push({name,vao,count:g.indices.length,type:wide?gl.UNSIGNED_INT:gl.UNSIGNED_SHORT,lo,hi,c:lo.map((v,i)=>(v+hi[i])/2)});g.verts=[];g.indices=[]}
 const opaque=batches.filter(b=>!b.name.startsWith('glass')),transparent=batches.filter(b=>b.name.startsWith('glass'));
 const target=[0,.9,-2],sun=unit([.45,.64,-.63]);const lightMat=mult(ortho(24,24,.3,97),view(add(target,mul(sun,46)),mul(sun,-1)));
 const shadow=gl.createTexture();gl.activeTexture(gl.TEXTURE2);gl.bindTexture(gl.TEXTURE_2D,shadow);gl.texStorage2D(gl.TEXTURE_2D,1,gl.DEPTH_COMPONENT24,2048,2048);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_COMPARE_MODE,gl.COMPARE_REF_TO_TEXTURE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_COMPARE_FUNC,gl.LEQUAL);
 const fb=gl.createFramebuffer();gl.bindFramebuffer(gl.FRAMEBUFFER,fb);gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.DEPTH_ATTACHMENT,gl.TEXTURE_2D,shadow,0);gl.drawBuffers([gl.NONE]);gl.readBuffer(gl.NONE);
 gl.viewport(0,0,2048,2048);gl.enable(gl.DEPTH_TEST);gl.depthFunc(gl.LEQUAL);gl.clear(gl.DEPTH_BUFFER_BIT);gl.useProgram(depth.p);gl.uniformMatrix4fv(depth.l.vp,false,lightMat);gl.enable(gl.POLYGON_OFFSET_FILL);gl.polygonOffset(1.2,1.4);
 function draw(b){gl.bindVertexArray(b.vao);gl.drawElements(gl.TRIANGLES,b.count,b.type,0)}
 for(const b of opaque)if(!b.name.startsWith('land')&&b.name!=='mesh')draw(b);gl.disable(gl.POLYGON_OFFSET_FILL);gl.bindFramebuffer(gl.FRAMEBUFFER,null);gl.deleteFramebuffer(fb);
 function cube(size,mips){const t=gl.createTexture();gl.bindTexture(gl.TEXTURE_CUBE_MAP,t);gl.texStorage2D(gl.TEXTURE_CUBE_MAP,mips,gl.RGBA8,size,size);gl.texParameteri(gl.TEXTURE_CUBE_MAP,gl.TEXTURE_MIN_FILTER,mips>1?gl.LINEAR_MIPMAP_LINEAR:gl.LINEAR);gl.texParameteri(gl.TEXTURE_CUBE_MAP,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_CUBE_MAP,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_CUBE_MAP,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_CUBE_MAP,gl.TEXTURE_WRAP_R,gl.CLAMP_TO_EDGE);return t}
 const dummy=cube(1,1),env=[cube(128,8),cube(128,8),cube(128,8)];gl.useProgram(main.p);for(const [key,id] of [['swatches',0],['signs',1],['sunDepth',2],['hallEnv',3],['deckEnv',4],['lightField',6],['floorWeather',7],['lampField',8],['overlookEnv',9]])gl.uniform1i(main.l[key],id);
 gl.uniformMatrix4fv(main.l.shadowMatrix,false,lightMat);
 function envBind(list){for(let i=0;i<3;i++){gl.activeTexture(i===2?gl.TEXTURE9:gl.TEXTURE3+i);gl.bindTexture(gl.TEXTURE_CUBE_MAP,list[i])}}
 function visible(b,vp){ // Reject a whole static batch when its bounds lie outside a clip plane.
 for(let axis=0;axis<3;axis++)for(const sign of [-1,1]){const x=vp[3]+sign*vp[axis],y=vp[7]+sign*vp[axis+4],z=vp[11]+sign*vp[axis+8],w=vp[15]+sign*vp[axis+12];if(x*(x>0?b.hi[0]:b.lo[0])+y*(y>0?b.hi[1]:b.lo[1])+z*(z>0?b.hi[2]:b.lo[2])+w<0)return false}return true}
 function pass(eye,dir,up,fov,aspect,probe,time){
 const right=unit(cross(dir,up)),actualUp=unit(cross(right,dir)),vp=mult(perspective(fov,aspect,.065,650),view(eye,dir,actualUp)),m=main.l;
 gl.clearColor(.65,.73,.75,1);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);gl.useProgram(main.p);gl.uniformMatrix4fv(m.vp,false,vp);gl.uniform3fv(m.eye,eye);gl.uniform1i(m.probesReady,probe?0:1);for(const b of opaque)if(visible(b,vp))draw(b);
 gl.bindVertexArray(null);gl.useProgram(sky.p);gl.uniform3fv(sky.l.fw,dir);gl.uniform3fv(sky.l.rt,right);gl.uniform3fv(sky.l.up,actualUp);const tan=Math.tan(fov/2);gl.uniform2f(sky.l.tanHalf,tan*aspect,tan);gl.drawArrays(gl.TRIANGLES,0,3);
 if(probe)return;
 gl.useProgram(main.p);gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);gl.depthMask(false);
 transparent.sort((a,b)=>dot(b.c,dir)-dot(a.c,dir));for(const b of transparent)if(visible(b,vp))draw(b);
 gl.bindVertexArray(null);gl.useProgram(rain.p);gl.uniformMatrix4fv(rain.l.vp,false,vp);gl.uniform3fv(rain.l.eye,eye);gl.uniform1f(rain.l.sec,time);gl.drawArrays(gl.LINES,0,1200);
 gl.blendFunc(gl.SRC_ALPHA,gl.ONE);gl.useProgram(halo.p);gl.uniformMatrix4fv(halo.l.vp,false,vp);gl.uniform3fv(halo.l.rt,right);gl.uniform3fv(halo.l.up,actualUp);gl.uniform3fv(halo.l.eye,eye);gl.drawArraysInstanced(gl.TRIANGLE_STRIP,0,4,5);gl.depthMask(true);gl.disable(gl.BLEND);
 }
 envBind([dummy,dummy,dummy]);const cap=gl.createFramebuffer(),rb=gl.createRenderbuffer();gl.bindRenderbuffer(gl.RENDERBUFFER,rb);gl.renderbufferStorage(gl.RENDERBUFFER,gl.DEPTH_COMPONENT16,128,128);gl.bindFramebuffer(gl.FRAMEBUFFER,cap);gl.framebufferRenderbuffer(gl.FRAMEBUFFER,gl.DEPTH_ATTACHMENT,gl.RENDERBUFFER,rb);gl.viewport(0,0,128,128);
 const ds=[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]],us=[[0,-1,0],[0,-1,0],[0,0,1],[0,0,-1],[0,-1,0],[0,-1,0]];
 for(let i=0;i<3;i++){for(let f=0;f<6;f++){gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_CUBE_MAP_POSITIVE_X+f,env[i],0);pass([[1.2,1.75,6.],[1.7,1.7,-5.4],[3.12,1.6,-14.25]][i],ds[f],us[f],Math.PI/2,1,true,0)}gl.activeTexture(gl.TEXTURE5);gl.bindTexture(gl.TEXTURE_CUBE_MAP,env[i]);gl.generateMipmap(gl.TEXTURE_CUBE_MAP)}
 gl.bindFramebuffer(gl.FRAMEBUFFER,null);gl.deleteFramebuffer(cap);gl.deleteRenderbuffer(rb);envBind(env);
 return (eye,dir,w,h,time)=>{gl.viewport(0,0,w,h);pass(eye,dir,[0,1,0],Math.PI*64/180,w/h,false,time)}
 }
 return {renderer};
})();

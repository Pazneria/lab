'use strict';
const MarlRender = (() => {
  const vertex = `#version 300 es
  precision highp float;
  layout(location=0) in vec3 aPosition;
  layout(location=1) in vec2 aUV;
  layout(location=2) in vec4 aNormalAO;
  layout(location=3) in vec4 aColorMat;
  layout(location=4) in float aPattern;
  uniform mat4 uVP;
  uniform mat4 uLight;
  out vec3 vP;
  out vec3 vN;
  out vec3 vColor;
  out vec2 vUV;
  out vec3 vShadow;
  out float vAO;
  flat out int vMat;
  flat out float vStyle;
  void main(){
    vP=aPosition/2048.;vN=aNormalAO.xyz;vAO=aNormalAO.w;
    vColor=aColorMat.rgb/255.;vMat=int(aColorMat.w+.5);vStyle=aPattern/256.;
    vUV=aUV/1024.;vShadow=(uLight*vec4(vP,1.)).xyz*.5+.5;
    gl_Position=uVP*vec4(vP,1.);
  }`;
  const fragment=`#version 300 es
  precision highp float;
  precision highp int;
  precision highp sampler2DArray;
  precision highp sampler2DShadow;
  uniform sampler2DArray uMaps;
  uniform sampler2DArray uSigns;
  uniform sampler2D uBrush;
  uniform sampler2DShadow uDepth;
  uniform vec3 uEye,uSun;
  uniform float uShadowStep;
  in vec3 vP,vN,vColor,vShadow;
  in vec2 vUV;
  in float vAO;
  flat in int vMat;
  flat in float vStyle;
  out vec4 frag;
  float hash(vec2 p){vec3 p3=fract(vec3(p.xyx)*.1031);p3+=dot(p3,p3.yzx+33.33);return fract((p3.x+p3.y)*p3.z);}
  float noise(vec2 p){
    vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
    return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1)),f.x),f.y);
  }
  float maskBox(vec2 p,vec2 a,vec2 b,float f){vec2 m=smoothstep(a-f,a+f,p)*(1.-smoothstep(b-f,b+f,p));return m.x*m.y;}
  vec3 viewLight(vec3 r,float rough,float court,float glaze){
    // Two long banks of sash windows, the roof light, and the open yard doors.
    float f=.032+rough*rough*.48;
    float tx=(-5.11-vP.x)/min(-.015,r.x);
    vec2 w=vP.zy+r.zy*tx;
    float windows=(maskBox(w,vec2(-2.36,1.19),vec2(1.49,2.96),f)+maskBox(w,vec2(2.20,1.19),vec2(5.38,2.96),f))*smoothstep(.02,.18,-r.x);
    float sash=1.-.64*(1.-smoothstep(.018,f*.98+.019,abs(w.y-2.07)));
    sash*=.52+.48*smoothstep(.012,.031+f*.51,abs(fract((w.x+.07)/.78)-.5)*.78);
    float ty=(4.20-vP.y)/max(.045,r.y);
    vec2 roof=vP.xz+r.xz*ty;
    float rooflight=maskBox(roof,vec2(-3.95,-1.86),vec2(-1.68,2.40),f*1.8)*smoothstep(.035,.18,r.y);
    float tz=(-3.49-vP.z)/min(-.018,r.z);
    vec2 doorway=vP.xy+r.xy*tz;
    float doors=(maskBox(doorway,vec2(-4.60,.02),vec2(-2.39,2.64),f)+.54*maskBox(doorway,vec2(2.15,.02),vec2(4.50,2.64),f))*smoothstep(.025,.17,-r.z);
    float sky=smoothstep(-.16,.62,r.y);
    vec3 interior=mix(vec3(.17,.123,.081),vec3(.21,.235,.215),smoothstep(-.55,.58,r.y));
    interior+=vec3(1.50,1.68,1.58)*windows*sash+vec3(1.78,1.94,1.96)*rooflight+vec3(1.17,1.27,1.15)*doors;
    vec3 exterior=mix(vec3(.25,.22,.161),vec3(1.48,1.67,1.78),sky);
    vec3 awning=mix(vec3(.21,.235,.194),exterior,smoothstep(-.13,.68,-r.x)*smoothstep(-.35,.2,r.y));
    return mix(mix(interior,awning,glaze),exterior,court);
  }
  float sunshine(vec3 n){
    if(any(lessThan(vShadow,vec3(0.)))||any(greaterThan(vShadow,vec3(1.))))return 1.;
    float bias=.00012+.00035*(1.-max(0.,dot(n,uSun)));
    vec3 p=vec3(vShadow.xy,vShadow.z-bias);
    vec2 k=vec2(uShadowStep)*.94;
    float s=texture(uDepth,p)*.20;
    s+=texture(uDepth,vec3(p.xy+vec2(-.86,-.46)*k,p.z))*.20;
    s+=texture(uDepth,vec3(p.xy+vec2(.49,-.91)*k,p.z))*.20;
    s+=texture(uDepth,vec3(p.xy+vec2(.87,.46)*k,p.z))*.20;
    s+=texture(uDepth,vec3(p.xy+vec2(-.44,.93)*k,p.z))*.20;return s;
  }
  void main(){
    int m=vMat;
    if(m==13){
      float a=length(vUV);if(a>=1.)discard;
      float v=1.-.76*vStyle*(1.-smoothstep(.02,1.,a));frag=vec4(vec3(v),1.);return;
    }
    vec3 V=normalize(uEye-vP),N=normalize(vN);
    if(length(vN)<.1)N=vec3(0,1,0);
    vec3 geom=N;
    bool art=(m>=5&&m<=7&&vStyle>=1.);
    float north=1.-smoothstep(-3.88,-3.29,vP.z);
    float court=north*(1.-smoothstep(.38,.98,vP.x));
    float glaze=north*smoothstep(.36,.98,vP.x);
    if(m==12){
      vec3 ray=-V;float p=vP.y+ray.y*5.8;
      float along=(abs(N.x)>.6?vP.z+ray.z*4.1:vP.x+ray.x*4.1);
      float hill=.8+1.56*noise(vec2(along*.23,6.1))+.31*noise(vec2(along,3.2));
      vec3 low=mix(vec3(.54,.61,.49),vec3(.72,.755,.63),noise(vec2(along*.67,p*.60)));
      vec3 sky=mix(vec3(.891,.905,.835),vec3(.727,.829,.858),smoothstep(1.5,9.,p));
      vec3 pane=mix(low,sky,smoothstep(hill-.18,hill+.30,p));
      float grain=texture(uMaps,vec3(vUV*.67,12)).r;
      pane+=(grain-.5)*.07;pane=mix(pane,vec3(.89,.89,.80),.16+.11*pow(1.-abs(dot(N,V)),3.));
      frag=vec4(pane,1.);return;
    }
    vec2 uv=vUV;
    if(m==1||m==17)uv*=vec2(.58,2.36);
    else if(m==2)uv*=.72;
    else if(m==4)uv*=vec2(2.6,3.7);
    else if(m==3)uv*=1.48;
    else if(m==9)uv*=3.3;
    else if(art)uv=vUV*vec2(2.0,1.23)+vec2(fract(vStyle),fract(vStyle)*1.73);
    else uv*=2.2;
    vec4 tex=texture(uMaps,vec3(uv,float(m)));
    vec3 base=vColor;
    float rough=.79,spec=.026,bump=.62;
    if(m==1||m==17){rough=.63;spec=.033;bump=.44;}
    if(m==3||m==4){rough=.87;bump=.75;}
    if(m==5){rough=int(vStyle)==2?.49:.85;spec=int(vStyle)==2?.047:.022;bump=.56;}
    if(m==6){rough=.365;spec=.052;bump=.38;}
    if(m==7){rough=.202;spec=.072;bump=.35;}
    if(m==8){rough=.43;spec=.1;bump=.47;}
    if(m==9){rough=.95;bump=.36;}
    if(m==10){rough=.64;spec=.023;bump=.12;}
    if(m==15){rough=.58;spec=.043;bump=.3;}
    if(m==11){
      vec4 label=texture(uSigns,vec3(vUV,floor(vStyle+.01)));if(label.a<.34)discard;
      base=label.rgb;rough=.75;spec=.02;bump=0.;
    }else{
      base*=1.+(tex.r-.5)*(art?1.09:1.26);
      if(m==1||m==17)base+=vec3(.026,.007,-.015)*(tex.r-.47);
      if(m==17)base=mix(base,vec3(.76,.71,.61),tex.a*.28);
      if(m==8)base=mix(base,vec3(.395,.326,.247),tex.a*.20);
      if(m==2||m==3||m==4){
        float mott=texture(uMaps,vec3(uv*.139+vec2(.13,.47),float(m))).r;
        base*=1.+(mott-.50)*.36;
      }
    }
    if(art){
      float y=vUV.y,angle=vUV.x*6.2831853,seed=fract(vStyle)*6.2831853;
      int design=int(vStyle);
      float wheel=sin(y*126.+.96*sin(angle+seed));
      if(m==5){base*=1.+.017*wheel;rough-=.075*tex.a;}
      else{
        float natural=.09+.013*sin(angle*3.+seed)+.011*sin(angle*7.-seed);
        natural-=.034*pow(.5+.5*cos(angle*5.+seed),12.);
        float glazeBody=smoothstep(natural-.006,natural+.005,y);
        vec3 foot=vec3(.68,.543,.415)*(1.+.36*(tex.r-.5));
        base=mix(foot,base,glazeBody);rough=mix(.88,rough,glazeBody);spec=mix(.025,spec,glazeBody);
        if(design==4||design==6){
          float flow=noise(vec2(cos(angle)*4.1+sin(angle)*6.2+seed,y*1.85));
          base*=1.+.12*(flow-.5)*glazeBody;
          base=mix(base,base*vec3(.78,.825,.80),smoothstep(.986,1.,y)*.58);
          if(design==6){float tide=.78+.031*sin(angle*3.+seed)-.081*pow(.5+.5*sin(angle*5.-seed),8.);
            base=mix(base,mix(base,vec3(.66,.67,.50),.52),smoothstep(tide-.012,tide+.016,y));}
        }
        if(design==5){
          float y0=.86+.056*sin(angle*3.+seed)+.039*sin(angle*6.-seed);
          float run=smoothstep(y0-.065,y0+.03,y);base=mix(base,vec3(.70,.46,.235)*(1.+.28*(tex.r-.5)),run*.65);
        }
        if(design==7){float patch=smoothstep(.31,.68,tex.a+sin(angle*2.+seed)*.11);
          base=mix(base,vec3(.74,.478,.32),patch*.29*glazeBody);}
        if(design==8){
          vec4 ink=texture(uBrush,vec2(vUV.x+seed*.14,1.-y));
          base=mix(base,ink.rgb,ink.a*.95*glazeBody);
        }
        if(design==9){
          float yy=y+.0043*sin(angle*3.+seed)+.0029*sin(angle*5.);
          float lines=max(1.-smoothstep(.009,.014,abs(yy-.748)),1.-smoothstep(.005,.010,abs(yy-.789)));
          lines=max(lines,1.-smoothstep(.015,.021,abs(yy-.274)));
          base=mix(base,vec3(.31,.365,.34),lines*.89);
        }
        rough+=.10*(tex.a-.52);base*=1.+.009*wheel;
      }
    }
    // Convert the height gradients from the material's two tangent directions.
    vec3 dp1=dFdx(vP),dp2=dFdy(vP);vec2 duv1=dFdx(uv),duv2=dFdy(uv);
    vec3 dp2perp=cross(dp2,N),dp1perp=cross(N,dp1);
    vec3 T=dp2perp*duv1.x+dp1perp*duv2.x,B=dp2perp*duv1.y+dp1perp*duv2.y;
    float inv=inversesqrt(max(max(dot(T,T),dot(B,B)),1e-14));
    N=normalize(N+bump*((tex.g-.5)*T+(tex.b-.5)*B)*inv);
    if(m==10&&dot(N,V)<0.)N=-N;
    float ndL=max(0.,dot(N,uSun)),nv=max(0.,dot(N,V));
    float shade=(ndL>.001||m==10)?sunshine(geom):0.;
    float up=.5+.5*N.y;
    float west=.5+.5*dot(N,normalize(vec3(-1.,.41,-.05)));
    float yard=.5+.5*dot(N,normalize(vec3(-.32,.30,-1.)));
    float windowFall=1.-smoothstep(.6,9.4,vP.x+5.1);
    vec3 amb=mix(vec3(.35,.32,.267),vec3(.60,.678,.706),up);
    amb+=vec3(.14,.19,.201)*west*(.46+.66*windowFall);
    amb+=vec3(.108,.117,.113)*yard*(.50+.5*(1.-smoothstep(-2.8,4.,vP.z)));
    amb=mix(amb,mix(vec3(.43,.385,.295),vec3(.83,.924,.955),up)+west*vec3(.098,.111,.106),glaze);
    amb=mix(amb,mix(vec3(.44,.385,.285),vec3(.89,1.01,1.09),up),court);
    float ao=mix(.18,1.,vAO);amb*=ao;
    vec3 sunlight=vec3(1.69,1.45,1.065)*shade;
    vec3 diffuse=pow(clamp(base,0.,1.),vec3(2.15))*(amb+sunlight*ndL);
    if(m==10)diffuse+=pow(base,vec3(2.15))*max(0.,-dot(N,uSun))*shade*.28;
    vec3 H=normalize(V+uSun);float power=mix(9.,259.,pow(1.-rough,2.7));
    vec3 specular=sunlight*pow(max(dot(N,H),0.),power)*spec*(1.+(1.-rough)*3.2)*smoothstep(-.05,.18,ndL);
    if(m==6||m==7||m==8||(m==5&&int(vStyle)==2)||m==15){
      float fres=spec+(1.-spec)*pow(1.-nv,5.);
      specular+=viewLight(reflect(-V,N),rough,court,glaze)*fres*(1.-.52*rough)*(.51+.49*vAO);
    }
    vec3 linear=max(vec3(0),diffuse+specular);
    // A gentle highlight shoulder preserves the differences between ash glaze and chalk.
    linear=linear*(1.+.20*linear)/(1.+.45*linear);
    vec3 result=pow(linear,vec3(1./2.18));
    float dist=length(uEye-vP);result=mix(result,vec3(.78,.802,.745),.016*smoothstep(7.,22.,dist));
    frag=vec4(result,1.);
  }`;
  const depthVert=`#version 300 es
  precision highp float;
  layout(location=0) in vec3 aPosition;uniform mat4 uLight;
  void main(){gl_Position=uLight*vec4(aPosition/2048.,1.);}`;
  const depthFrag=`#version 300 es
  precision highp float;void main(){}`;
  const skyVert=`#version 300 es
  precision highp float;out vec2 vRay;
  void main(){vec2 p=vec2((gl_VertexID<<1)&2,gl_VertexID&2)*2.-1.;vRay=p;gl_Position=vec4(p,.999999,1.);}`;
  const skyFrag=`#version 300 es
  precision highp float;in vec2 vRay;out vec4 frag;uniform vec3 uAhead,uRight,uUp,uSun;
  uniform vec2 uFov;
  float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
  float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+1.),f.x),f.y);}
  void main(){
    vec3 d=normalize(uAhead+uRight*vRay.x*uFov.x+uUp*vRay.y*uFov.y);
    vec3 color=mix(vec3(.902,.895,.801),vec3(.536,.713,.811),smoothstep(-.1,.90,d.y));
    vec2 p=d.xz/max(.085,d.y)*1.85+vec2(4.3,8.2);
    float cloud=noise(p)*.52+noise(p*2.36)*.29+noise(p*5.72)*.14+noise(p*13.3)*.05;
    color=mix(color,vec3(.943,.939,.878),smoothstep(.50,.74,cloud)*.61*smoothstep(.055,.38,d.y));
    color+=vec3(.111,.089,.045)*pow(max(dot(d,uSun),0.),18.);
    frag=vec4(color,1.);
  }`;

  const sub=(a,b)=>a.map((v,i)=>v-b[i]),dot=(a,b)=>a.reduce((v,x,i)=>v+x*b[i],0);
  const normalize=a=>{const n=Math.hypot(...a);return a.map(x=>x/(n||1));};
  const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
  function look(eye,target){const z=normalize(sub(eye,target)),x=normalize(cross([0,1,0],z)),y=cross(z,x);
    return [x[0],y[0],z[0],0,x[1],y[1],z[1],0,x[2],y[2],z[2],0,-dot(x,eye),-dot(y,eye),-dot(z,eye),1];}
  function product(a,b){const v=new Float32Array(16);for(let j=0;j<4;j++)for(let i=0;i<4;i++)v[j*4+i]=a[i]*b[j*4]+a[i+4]*b[j*4+1]+a[i+8]*b[j*4+2]+a[i+12]*b[j*4+3];return v;}
  function perspective(aspect){const f=1/Math.tan(Math.PI*61/360),n=.045,z=65;return [f/aspect,0,0,0,0,f,0,0,0,0,(z+n)/(n-z),-1,0,0,2*z*n/(n-z),0];}
  function orth(l,r,b,t,n,f){return [2/(r-l),0,0,0,0,2/(t-b),0,0,0,0,-2/(f-n),0,-(r+l)/(r-l),-(t+b)/(t-b),-(f+n)/(f-n),1];}
  function frustum(m){const planes=[];for(const k of [0,1,2])for(const s of [-1,1])planes.push([m[3]+s*m[k],m[7]+s*m[k+4],m[11]+s*m[k+8],m[15]+s*m[k+12]]);return planes;}
  function visible(b,planes){for(const p of planes){if(p[3]+p[0]*(p[0]>0?b.max[0]:b.min[0])+p[1]*(p[1]>0?b.max[1]:b.min[1])+p[2]*(p[2]>0?b.max[2]:b.min[2])<-.01)return false;}return true;}
  function throughDoor(box,eye){
    const wall=-3.51;
    if(Math.abs(eye[2]-wall)<.25)return true;
    const exterior=box.max[2]<wall-.025,interior=box.min[2]>wall+.025;
    if(!(eye[2]>wall&&exterior)&&!(eye[2]<wall&&interior))return true;
    if(box.name.includes('shell'))return true;
    let xmin=Infinity,xmax=-Infinity,ymin=Infinity,ymax=-Infinity;
    for(const z of [box.min[2],box.max[2]]){
      const t=(wall-eye[2])/(z-eye[2]);
      for(const x of [box.min[0],box.max[0]]){const u=eye[0]+t*(x-eye[0]);xmin=Math.min(xmin,u);xmax=Math.max(xmax,u);}
      for(const y of [box.min[1],box.max[1]]){const v=eye[1]+t*(y-eye[1]);ymin=Math.min(ymin,v);ymax=Math.max(ymax,v);}
    }
    return ymin<2.81&&ymax>-.16&&((xmax>-4.74&&xmin<-2.26)||(xmax>2.01&&xmin<4.65));
  }
  async function unpack(str){
    const decoded=atob(str),bytes=new Uint8Array(decoded.length);
    for(let i=0;i<bytes.length;i++)bytes[i]=decoded.charCodeAt(i);
    return await new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'))).arrayBuffer();
  }
  async function create(canvas){
    if(typeof DecompressionStream==='undefined')throw Error('This build needs a current browser with gzip decompression support.');
    const gl=canvas.getContext('webgl2',{alpha:false,antialias:true,stencil:false,preserveDrawingBuffer:false,powerPreference:'high-performance'});
    if(!gl)throw Error('WebGL 2 is unavailable. Enable hardware acceleration or open the scene in a current desktop browser.');
    const shader=(type,src)=>{const sh=gl.createShader(type);gl.shaderSource(sh,src);gl.compileShader(sh);if(!gl.getShaderParameter(sh,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(sh));return sh;};
    function program(vs,fs){
      const p=gl.createProgram(),v=shader(gl.VERTEX_SHADER,vs),f=shader(gl.FRAGMENT_SHADER,fs);
      gl.attachShader(p,v);gl.attachShader(p,f);gl.linkProgram(p);gl.deleteShader(v);gl.deleteShader(f);
      if(!gl.getProgramParameter(p,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(p));return p;
    }
    const main=program(vertex,fragment),shadow=program(depthVert,depthFrag),sky=program(skyVert,skyFrag);
    function locations(prog,list){return Object.fromEntries(list.split(' ').map(n=>[n,gl.getUniformLocation(prog,n)]));}
    const uni=locations(main,'uVP uLight uEye uSun uMaps uSigns uDepth uShadowStep uBrush'),sunUni=locations(shadow,'uLight'),skyUni=locations(sky,'uAhead uRight uUp uSun uFov');
    const [geometry,surfaces]=await Promise.all([unpack(MARL_PACK.gzip),unpack(MARL_SURFACES.gzip)]);
    const geo=new Uint8Array(geometry);
    if(geo.length!==MARL_PACK.rawSize)throw Error('The geometry pack is incomplete.');
    const batches=[];
    for(const g of MARL_PACK.groups){
      const vao=gl.createVertexArray();gl.bindVertexArray(vao);
      const vb=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,vb);gl.bufferData(gl.ARRAY_BUFFER,geo.subarray(g.vOffset,g.vOffset+g.vertices*20),gl.STATIC_DRAW);
      const attr=(loc,size,type,norm,offset)=>{gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,size,type,norm,20,offset);};
      attr(0,3,gl.SHORT,false,0);attr(1,2,gl.SHORT,false,6);attr(2,4,gl.BYTE,true,10);attr(3,4,gl.UNSIGNED_BYTE,false,14);attr(4,1,gl.UNSIGNED_SHORT,false,18);
      const eb=gl.createBuffer();gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,eb);
      const size=g.wide?4:2,farStart=g.farIndices?g.farOffset-g.iOffset:0;
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,geo.subarray(g.iOffset,g.iOffset+(g.farIndices?farStart+g.farIndices*size:g.indices*size)),gl.STATIC_DRAW);
      batches.push({...g,vao,farStart,type:g.wide?gl.UNSIGNED_INT:gl.UNSIGNED_SHORT,far:false});
    }
    gl.bindVertexArray(null);
    const aniso=gl.getExtension('EXT_texture_filter_anisotropic');
    function filter(target,wrap){
      gl.texParameteri(target,gl.TEXTURE_MIN_FILTER,gl.LINEAR_MIPMAP_LINEAR);gl.texParameteri(target,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
      gl.texParameteri(target,gl.TEXTURE_WRAP_S,wrap);gl.texParameteri(target,gl.TEXTURE_WRAP_T,wrap);
      if(aniso)gl.texParameterf(target,aniso.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(4,gl.getParameter(aniso.MAX_TEXTURE_MAX_ANISOTROPY_EXT)));
    }
    const maps=gl.createTexture();gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D_ARRAY,maps);
    const size=MARL_SURFACES.size;
    gl.texStorage3D(gl.TEXTURE_2D_ARRAY,Math.floor(Math.log2(size))+1,gl.RGBA8,size,size,MARL_SURFACES.layers);
    gl.texSubImage3D(gl.TEXTURE_2D_ARRAY,0,0,0,0,size,size,MARL_SURFACES.layers,gl.RGBA,gl.UNSIGNED_BYTE,new Uint8Array(surfaces));
    filter(gl.TEXTURE_2D_ARRAY,gl.REPEAT);gl.generateMipmap(gl.TEXTURE_2D_ARRAY);
    const labels=gl.createTexture();gl.activeTexture(gl.TEXTURE1);gl.bindTexture(gl.TEXTURE_2D_ARRAY,labels);
    gl.texStorage3D(gl.TEXTURE_2D_ARRAY,9,gl.RGBA8,384,160,MARL_PACK.signs.length);
    for(let i=0;i<MARL_PACK.signs.length;i++){
      const c=Lettering.label(MARL_PACK.signs[i]);
      gl.texSubImage3D(gl.TEXTURE_2D_ARRAY,0,0,0,i,384,160,1,gl.RGBA,gl.UNSIGNED_BYTE,c);
    }
    filter(gl.TEXTURE_2D_ARRAY,gl.CLAMP_TO_EDGE);gl.generateMipmap(gl.TEXTURE_2D_ARRAY);
    const decor=gl.createTexture();gl.activeTexture(gl.TEXTURE2);gl.bindTexture(gl.TEXTURE_2D,decor);
    gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,Lettering.brushwork());filter(gl.TEXTURE_2D,gl.REPEAT);gl.generateMipmap(gl.TEXTURE_2D);
    const shadowSize=Math.min(2048,gl.getParameter(gl.MAX_TEXTURE_SIZE)),depth=gl.createTexture();
    gl.activeTexture(gl.TEXTURE3);gl.bindTexture(gl.TEXTURE_2D,depth);
    gl.texStorage2D(gl.TEXTURE_2D,1,gl.DEPTH_COMPONENT24,shadowSize,shadowSize);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_COMPARE_MODE,gl.COMPARE_REF_TO_TEXTURE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_COMPARE_FUNC,gl.LEQUAL);
    const fb=gl.createFramebuffer();gl.bindFramebuffer(gl.FRAMEBUFFER,fb);gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.DEPTH_ATTACHMENT,gl.TEXTURE_2D,depth,0);
    gl.drawBuffers([gl.NONE]);gl.readBuffer(gl.NONE);
    if(gl.checkFramebufferStatus(gl.FRAMEBUFFER)!==gl.FRAMEBUFFER_COMPLETE)throw Error('The graphics device could not allocate the static sunlight map.');
    const sun=normalize([-.77,.96,.32]),target=[0,1.7,-1.36],sunEye=target.map((v,i)=>v+sun[i]*25);
    const sunView=look(sunEye,target),bounds=[[],[],[]];
    for(const x of [-5.55,5.55])for(const y of [-.30,5.26])for(const z of [-10.14,7.02]){
      for(let i=0;i<3;i++)bounds[i].push(sunView[i]*x+sunView[4+i]*y+sunView[8+i]*z+sunView[12+i]);
    }
    const light=product(orth(Math.min(...bounds[0])-.16,Math.max(...bounds[0])+.16,Math.min(...bounds[1])-.16,Math.max(...bounds[1])+.16,-Math.max(...bounds[2])-.40,-Math.min(...bounds[2])+.4),sunView);
    gl.viewport(0,0,shadowSize,shadowSize);gl.enable(gl.DEPTH_TEST);gl.clear(gl.DEPTH_BUFFER_BIT);
    gl.useProgram(shadow);gl.uniformMatrix4fv(sunUni.uLight,false,light);gl.enable(gl.POLYGON_OFFSET_FILL);gl.polygonOffset(.7,1.);
    function draw(b,far){gl.bindVertexArray(b.vao);gl.drawElements(gl.TRIANGLES,far&&b.farIndices?b.farIndices:b.indices,b.type,far&&b.farIndices?b.farStart:0);}
    for(const b of batches)if(b.pass==='solid')draw(b,true);
    gl.disable(gl.POLYGON_OFFSET_FILL);gl.bindFramebuffer(gl.FRAMEBUFFER,null);gl.deleteFramebuffer(fb);
    gl.useProgram(main);gl.uniformMatrix4fv(uni.uLight,false,light);gl.uniform3fv(uni.uSun,sun);
    gl.uniform1f(uni.uShadowStep,1/shadowSize);gl.uniform1i(uni.uMaps,0);gl.uniform1i(uni.uSigns,1);gl.uniform1i(uni.uBrush,2);gl.uniform1i(uni.uDepth,3);
    gl.useProgram(sky);gl.uniform3fv(skyUni.uSun,sun);
    // Empty VAO for the full-screen sky triangle.
    const skyVAO=gl.createVertexArray();
    function resize(){
      const w=Math.max(1,canvas.clientWidth),h=Math.max(1,canvas.clientHeight);
      const ratio=Math.min(window.devicePixelRatio||1,1.65,Math.sqrt(2500000/(w*h)));
      const dw=Math.max(1,Math.round(w*ratio)),dh=Math.max(1,Math.round(h*ratio));
      if(canvas.width!==dw||canvas.height!==dh){canvas.width=dw;canvas.height=dh;}
      gl.viewport(0,0,dw,dh);
    }
    function render(eye,yaw,pitch){
      resize();const aspect=canvas.width/canvas.height,cp=Math.cos(pitch),sp=Math.sin(pitch),sy=Math.sin(yaw),cy=Math.cos(yaw);
      const ahead=[sy*cp,sp,-cy*cp],right=[cy,0,sy],up=cross(right,ahead);
      const view=look(eye,eye.map((v,i)=>v+ahead[i])),vp=product(perspective(aspect),view),planes=frustum(vp);
      gl.depthMask(true);gl.disable(gl.BLEND);gl.clear(gl.DEPTH_BUFFER_BIT);
      gl.enable(gl.DEPTH_TEST);gl.depthFunc(gl.LEQUAL);gl.useProgram(main);gl.uniformMatrix4fv(uni.uVP,false,vp);gl.uniform3fv(uni.uEye,eye);
      const shown=batches.filter(b=>visible(b,planes)&&throughDoor(b,eye));
      for(const b of shown){
        if(b.pass==='shade')continue;
        let d2=0;for(let i=0;i<3;i++){const d=Math.max(b.min[i]-eye[i],0,eye[i]-b.max[i]);d2+=d*d;}
        b.far=d2>(b.far?13.69:18.49);
        // Open leaves and folded linen have intentionally two-sided faces.
        if(b.pass==='solid'&&!b.name.startsWith('yard-details'))gl.enable(gl.CULL_FACE);else gl.disable(gl.CULL_FACE);
        draw(b,b.far);
      }
      // Sky shading runs only on uncovered pixels, including when inspecting the roof.
      gl.disable(gl.CULL_FACE);gl.depthMask(false);gl.useProgram(sky);gl.bindVertexArray(skyVAO);
      gl.uniform3fv(skyUni.uAhead,ahead);gl.uniform3fv(skyUni.uRight,right);gl.uniform3fv(skyUni.uUp,up);
      const f=Math.tan(Math.PI*61/360);gl.uniform2f(skyUni.uFov,aspect*f,f);gl.drawArrays(gl.TRIANGLES,0,3);
      gl.useProgram(main);gl.enable(gl.BLEND);gl.blendFunc(gl.ZERO,gl.SRC_COLOR);
      gl.enable(gl.POLYGON_OFFSET_FILL);gl.polygonOffset(-1.,-1.);gl.depthMask(false);
      for(const b of shown)if(b.pass==='shade')draw(b,false);
      gl.depthMask(true);gl.disable(gl.POLYGON_OFFSET_FILL);gl.disable(gl.BLEND);gl.bindVertexArray(null);
    }
    return {render};
  }
  return {create};
})();

// WebGL 2 / GLSL ES 3.00. The reflection probe and sunlight projection are static.
export const stoneVertex = `#version 300 es
precision highp float;
layout(location=0) in vec3 aPosition;
layout(location=1) in vec3 aNormal;
layout(location=2) in vec3 aColor;
layout(location=3) in float aKind;
layout(location=4) in vec4 aLight;
layout(location=5) in vec2 aGeo;
uniform mat4 uVP;
uniform mat4 uSunVP;
out vec3 vWorld;
out vec3 vNormal;
out vec3 vColor;
flat out int vKind;
out vec4 vLight;
out vec3 vSun;
out vec2 vGeo;
void main(){
  vWorld=aPosition;vNormal=aNormal;vColor=aColor;vKind=int(aKind+.5);
  vLight=aLight;vGeo=aGeo;
  vSun=(uSunVP*vec4(aPosition,1.)).xyz*.5+.5;
  gl_Position=uVP*vec4(aPosition,1.);
}`;
const commonLight = `
const vec3 sunDir=vec3(.422884,.876833,-.235492);
const vec3 skyPoint=vec3(-.2,10.22,-3.05);
uniform highp sampler2DShadow uShadow;
uniform vec3 uEye;
float sunlight(vec3 proj,float ndl){
  if(proj.z>1. || proj.z<0. || any(lessThan(proj.xy,vec2(0.))) || any(greaterThan(proj.xy,vec2(1.))))return 0.;
  float depth=proj.z-(.00018+.00030*(1.-ndl));
  vec2 t=1.28/vec2(textureSize(uShadow,0));
  float s=texture(uShadow,vec3(proj.xy+t*vec2(-.77,-.49),depth));
  s+=texture(uShadow,vec3(proj.xy+t*vec2(.82,-.55),depth));
  s+=texture(uShadow,vec3(proj.xy+t*vec2(.45,.92),depth));
  s+=texture(uShadow,vec3(proj.xy+t*vec2(-.73,.65),depth));
  return .25*s;
}
vec2 shaftCoord(vec3 p){
  vec2 q=p.xz+(9.88-p.y)*sunDir.xz/sunDir.y-vec2(-.20,-3.05);
  return vec2(dot(q,vec2(.94,.342))*.192,dot(q,vec2(-.342,.94))*.761);
}
float airLight(vec3 p){
  vec2 a=shaftCoord(uEye),d=shaftCoord(p)-a;
  float d2=max(.0001,dot(d,d)),t=clamp(-dot(a,d)/d2,0.,1.);
  vec2 h=a+d*t;
  float nearBeam=exp(-1.45*dot(h,h));
  float len=length(p-uEye),thickness=min(len,1.84*len*inversesqrt(d2));
  vec3 closest=mix(uEye,p,t);
  return nearBeam*thickness*.012*smoothstep(-8.,-5.,closest.z);
}
vec3 film(vec3 linearColor){
  vec3 x=max(vec3(0.),linearColor);
  return pow(clamp(x*(2.51*x+.03)/(x*(2.43*x+.59)+.14),0.,1.),vec3(.454545));
}
`;
export const stoneFragment = `#version 300 es
precision highp float;
precision highp sampler3D;
in vec3 vWorld;
in vec3 vNormal;
in vec3 vColor;
flat in int vKind;
in vec4 vLight;
in vec3 vSun;
in vec2 vGeo;
uniform sampler2D uBedding;
uniform sampler2D uPavement;
uniform sampler3D uMineral;
uniform sampler2D uRipple;
uniform float uTime;
out vec4 fragColor;
`+commonLight+`
void main(){
  vec3 p=vWorld,n=normalize(vNormal);
  if(!gl_FrontFacing)n=-n;
  vec3 face=n,V=normalize(uEye-p),base=vColor;
  vec4 field=texture(uMineral,p*.079+vec3(.31,.17,.67));
  float wet=0.,spec=0.,power=24.;
  float tread=vGeo.y*smoothstep(.66,.94,n.y);
  if(vKind<=1){
    float b=p.y+.082*p.x-.041*p.z+.16*sin(p.x*.35+p.z*.18)+.085*sin(p.z*.69-p.x*.13);
    vec3 weights=abs(n);weights*=weights;weights*=weights;weights/=max(.001,dot(weights,vec3(1.)));
    vec2 warp=(field.bg-.5)*.078;
    vec2 uvX=vec2(p.z*.365,b*.370)+warp;
    vec2 uvZ=vec2(p.x*.365,b*.370)+warp.yx;
    vec2 uvY=vec2(p.x*.94+p.z*.342,-p.x*.342+p.z*.94)*.381+warp;
    vec4 ty=texture(uPavement,uvY),grain=ty;
    vec2 sy=ty.gb*2.-1.;
    vec3 tangentSlope=vec3(.94*sy.x-.342*sy.y,0.,.342*sy.x+.94*sy.y);
    // Broad horizontal shelves need only their pavement projection.
    vec2 dxX=dFdx(uvX),dyX=dFdy(uvX),dxZ=dFdx(uvZ),dyZ=dFdy(uvZ);
    if(weights.y<.986){
      vec4 tx=textureGrad(uBedding,uvX+vec2(.13,.27),dxX,dyX);
      vec4 tz=textureGrad(uBedding,uvZ+vec2(.49,.83),dxZ,dyZ);
      grain=tx*weights.x+ty*weights.y+tz*weights.z;
      vec2 sx=tx.gb*2.-1.,sz=tz.gb*2.-1.;
      tangentSlope=weights.x*vec3(0.,sx.y,sx.x)+weights.y*tangentSlope+weights.z*vec3(sz.x,sz.y,0.);
    }
    n=normalize(n-(tangentSlope-n*dot(n,tangentSlope))*(vKind==0?mix(1.13,.74,tread):.76));
    float bedPos=b+.13*(field.g-.5)+.043*(field.b-.5);
    float layer=sin(5.83*bedPos+.72*sin(b*2.03)+.39*sin(.87*b+.6));
    float seam=exp(-18.*abs(layer+.58))*(1.-abs(face.y))*(.25+.75*smoothstep(.18,.66,field.r));
    float rind=smoothstep(.55,.83,field.g+.18*(grain.a-.5))*(.4+.6*(1.-abs(face.y)));
    vec3 stainUVW=vec3(p.x*.151,p.y*.030,p.z*.151)+.45;
    vec3 du=dFdx(stainUVW),dv=dFdy(stainUVW);
    float wash=abs(face.y)<.82||vKind==1?textureGrad(uMineral,stainUVW,du,dv).g:field.g;
    float mineral=smoothstep(.56,.89,.53*wash+.35*grain.a+.27*field.g);
    float darkening=.962+.23*(field.r-.5)+.13*(field.b-.5)+.98*(grain.r-.52)-.098*seam;
    if(vKind==1){
      darkening=.99+.19*(field.r-.5)+.51*(grain.r-.52)+.032*sin(b*17.+field.g*5.);
      base=mix(base,vec3(.84,.79,.64),.19*wash);mineral*=.55;
    }else{
      base=mix(base,vec3(.655,.601,.480),rind*.23);
      base=mix(base,vec3(.82,.80,.72),smoothstep(.54,.83,field.r)*.17);
    }
    base*=darkening*mix(vec3(1.),vec3(1.00,.915,.755),mineral*.52);
    base=mix(base,base*vec3(1.042,1.029,.994)+vec3(.008,.007,.004),tread*.83);
    float dampHeight=.22+(field.r-.5)*.26+(field.a-.5)*.11;
    wet=vGeo.x*(1.-smoothstep(dampHeight-.07,dampHeight+.16,p.y));
    float tide=vGeo.x*exp(-abs(p.y-dampHeight-.09)*22.)*smoothstep(.16,.55,abs(face.y)*.25+field.r);
    base=mix(base,base*vec3(.53,.585,.586),wet);
    base=mix(base,vec3(.76,.76,.66),tide*.115);
    spec=.021+.26*wet+(vKind==1?.064:0.);power=mix(31.,67.,wet);
  }else if(vKind==2){
    float wood=texture(uMineral,p*vec3(1.04,.11,1.06)).a;
    float fiber=sin(219.*p.x+166.*p.z+field.r*12.+3.5*sin(9.*p.y+p.z*4.));
    base*=.79+.29*wood+.059*fiber+.077*field.g;
    spec=.027;
  }else if(vKind==3){
    float twist=sin(295.*p.x+337.*p.z+416.*p.y+field.b*3.);
    base*=.89+.087*twist+.16*field.a;
    spec=.026;
  }else if(vKind==4){
    base*=.85+.25*field.b;spec=.67;power=56.;
  }else{base*=.94+.10*field.a;spec=.086;}
  vec3 toSky=normalize(skyPoint-p);
  vec2 overhead=shaftCoord(p);
  float nl=max(0.,dot(n,sunDir));
  float direct=nl>.001&&(dot(overhead,overhead)<2.59||p.y>9.)?sunlight(vSun,nl):0.;
  float ao=mix(.19,1.,pow(vLight.r,.84));
  float hemisphere=.72+.28*(.5+.5*n.y);
  vec3 ambient=vec3(.168,.186,.208)*hemisphere*ao;
  float normalSky=clamp(1.+.42*dot(n-face,toSky),.67,1.32);
  vec3 skylight=vLight.g*vec3(.81,.966,1.095)*normalSky;
  vec3 bounce=vLight.b*vec3(.69,.614,.468)*mix(.74,1.,ao);
  bounce+=vLight.a*vec3(.012,.073,.069)*ao;
  vec3 diffuse=ambient+skylight+bounce+vec3(2.10,1.84,1.44)*(nl*direct);
  vec3 albedo=pow(clamp(base,.012,1.),vec3(2.2));
  vec3 lit=albedo*diffuse;
  float nv=max(0.,dot(n,V)),fres=.16+.84*pow(1.-nv,3.5);
  float glint=pow(max(0.,dot(n,normalize(V+sunDir))),power);
  float shine=pow(max(0.,dot(n,normalize(V+toSky))),max(6.,power*.40));
  lit+=spec*(.42+.58*fres)*(direct*glint*vec3(1.44,1.20,.86)+shine*(.08+vLight.g)*vec3(.66,.85,.95));
  if(vGeo.x>.36 && p.y<.01){
    float depth=max(0.,.012-p.y),t=uTime*.023;
    vec2 proj=p.xz+.32*p.y*sunDir.xz;
    float ca=texture(uRipple,proj*.47+vec2(.63*t,.14*t)).b;
    float cb=texture(uRipple,proj*.691+vec2(-.34*t,.31*t)).b;
    float caustic=(.56*ca+.44*cb)*(.28+1.25*direct)*smoothstep(.015,.26,depth);
    lit*=vec3(.92,1.03,1.045)*(1.+.55*caustic);
    lit*=exp(-depth*vec3(.28,.119,.087));
  }
  float range=length(uEye-p);
  lit=mix(lit,vec3(.159,.197,.202),1.-exp(-.0043*range));
  lit+=airLight(p)*vec3(.63,.588,.45);
  fragColor=vec4(film(lit),1.);
}`;
export const shadowVertex=`#version 300 es
precision highp float;
layout(location=0) in vec3 aPosition;
uniform mat4 uVP;
void main(){gl_Position=uVP*vec4(aPosition,1.);}`;
export const shadowFragment=`#version 300 es
precision mediump float;
void main(){}`;
export const skyVertex=`#version 300 es
precision highp float;
out vec2 vCorner;
void main(){
 vec2 p=vec2(float((gl_VertexID<<1)&2),float(gl_VertexID&2))*2.-1.;
 vCorner=p;gl_Position=vec4(p,1.,1.);
}`;
export const skyFragment=`#version 300 es
precision highp float;
in vec2 vCorner;
uniform vec3 uForward,uRight,uUp;
uniform vec2 uSpread;
out vec4 fragColor;
void main(){
 vec3 ray=normalize(uForward+uRight*vCorner.x*uSpread.x+uUp*vCorner.y*uSpread.y);
 float zenith=clamp(ray.y,0.,1.);
 vec3 sky=mix(vec3(.877,.913,.895),vec3(.609,.775,.859),zenith);
 vec3 sun=normalize(vec3(.422,.875,-.235));
 float halo=pow(max(0.,dot(sun,ray)),18.);
 sky=mix(sky,vec3(1.,.955,.825),.57*halo);
 fragColor=vec4(sky,1.);
}`;
export const waterVertex=`#version 300 es
precision highp float;
layout(location=0) in vec3 aWater;
uniform mat4 uVP,uSunVP;
out vec3 vWorld;
out float vDepth;
out vec3 vSun;
void main(){
 vWorld=vec3(aWater.x,.012,aWater.y);
 vDepth=aWater.z;
 vSun=(uSunVP*vec4(vWorld,1.)).xyz*.5+.5;
 gl_Position=uVP*vec4(vWorld,1.);
}`;
export const waterFragment=`#version 300 es
precision highp float;
in vec3 vWorld;
in vec3 vSun;
in float vDepth;
uniform samplerCube uProbe;
uniform sampler2D uRipple;
uniform float uTime;
out vec4 fragColor;
`+commonLight+`
vec2 drip(vec2 p,vec2 source,float t){
 vec2 q=p-source;float r=length(q),age=mod(t,5.9),front=age*.59,dr=r-front;
 float amp=exp(-14.*abs(dr))*exp(-1.20*r)*smoothstep(0.,.15,age)*(1.-smoothstep(4.2,5.6,age));
 return .025*amp*cos(dr*39.)*q/max(.004,r);
}
vec3 probeDirection(vec3 p,vec3 dir){
 // Box projection keeps the reflected ceiling joint and distant bank anchored during a walk.
 vec3 lo=vec3(-11.5,-1.4,-13.5),hi=vec3(12.0,9.52,15.3);
 vec3 t=(mix(lo,hi,step(vec3(0.),dir))-p)/(dir+vec3(.000001));
 float dst=max(0.,min(t.x,min(t.y,t.z)));
 return p+dir*dst-vec3(.45,.105,1.15);
}
void main(){
 vec3 p=vWorld,V=normalize(uEye-p);
 float t=uTime*.023,depth=max(.0,vDepth);
 vec2 r0=texture(uRipple,p.xz*.409+vec2(.69*t,.31*t)).rg*2.-1.;
 vec2 r1=texture(uRipple,vec2(p.z,-p.x)*.605+vec2(-.44*t,.37*t)).rg*2.-1.;
 vec2 slope=r0*.030+vec2(-r1.y,r1.x)*.017;
 slope+=.0048*vec2(sin(dot(p.xz,vec2(2.8,-1.96))+uTime*.63),sin(p.z*3.74+.53*uTime));
 slope+=drip(p.xz,vec2(3.94,1.62),uTime)+drip(p.xz,vec2(-1.14,-2.32),uTime+2.18);
 vec3 n=normalize(vec3(slope.x,1.,slope.y));
 vec3 R=reflect(-V,n);R.y=max(.025,R.y);
 vec3 reflection=textureLod(uProbe,probeDirection(p,R),.47+.28*clamp(length(uEye-p)*.035,0.,1.)).rgb;
 float nv=max(0.,dot(n,V)),fres=.026+.974*pow(1.-nv,5.);
 float clarity=1.-exp(-min(3.0,.08+depth/max(.36,V.y))*.41);
 float veil=clarity*.62+.021*smoothstep(.005,.055,depth);
 // Composite over the actual visible lake bed, rendered in the opaque pass.
 float alpha=fres+(1.-fres)*veil;
 vec2 beam=shaftCoord(p);
 float sun=dot(beam,beam)<2.59?sunlight(vSun,.88):0.;
 vec3 body=mix(vec3(.186,.338,.319),vec3(.261,.495,.443),sun*.65);
 vec3 layer=(reflection*fres+body*((1.-fres)*veil))/max(.001,alpha);
 float glitter=pow(max(0.,dot(R,sunDir)),1050.)*sun;
 layer+=vec3(.68,.61,.43)*glitter;
 fragColor=vec4(layer,clamp(alpha,.01,1.));
}`;


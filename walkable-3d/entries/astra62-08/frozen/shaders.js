'use strict';
const SHADERS={
scene:{vs:`#version 300 es
precision highp float;
precision highp int;
layout(location=0) in vec3 aPos;
layout(location=1) in vec3 aNormal;
layout(location=2) in vec2 aUV;
layout(location=3) in vec4 aColorAO;
layout(location=4) in float aMat;
uniform mat4 uVP;
out vec3 pos,nrm;out vec2 uv;out vec4 colorAO;flat out int mat;
void main(){
 pos=aPos;nrm=aNormal;uv=aUV;colorAO=aColorAO;mat=int(aMat+.5);
 gl_Position=uVP*vec4(aPos,1.);
}`,fs:`#version 300 es
precision highp float;
precision highp int;
precision highp sampler2DArray;
in vec3 pos,nrm;in vec2 uv;in vec4 colorAO;flat in int mat;
uniform sampler2DArray uSurface;uniform vec3 uEye;uniform int uGlass;out vec4 outColor;
const vec3 SUN=vec3(.634354,.493387,.594173);
const vec3 HAZE=vec3(.802,.838,.821);
float sat(float f){return clamp(f,0.,1.);}
float haze(float d){return 1.-exp(-pow(max(0.,d-8.)*.0061,1.28));}
vec3 horizon(vec3 ray){return mix(HAZE,vec3(.936,.865,.723),pow(max(dot(normalize(vec3(ray.x,.06,ray.z)),SUN),0.),4.)*.69);}
uniform highp sampler2DShadow uShadow;
uniform mat4 uLight;
float sunlight(vec3 p,vec3 n){
 vec4 lp=uLight*vec4(p+n*.015,1.);
 vec3 q=lp.xyz*.5+.5;
 if(any(lessThan(q,vec3(.001)))||any(greaterThan(q,vec3(.999))))return 1.;
 float bias=.00016+.00014*(1.-max(dot(n,SUN),0.));
 vec2 d=1.35/vec2(textureSize(uShadow,0));
 float z=q.z-bias;
 return .20*(texture(uShadow,vec3(q.xy,z))+texture(uShadow,vec3(q.xy+d*vec2(-.93,-.69),z))+
 texture(uShadow,vec3(q.xy+d*vec2(.71,-.97),z))+texture(uShadow,vec3(q.xy+d*vec2(.97,.71),z))+texture(uShadow,vec3(q.xy+d*vec2(-.71,.97),z)));
}
float inShop(vec3 p){
 float e=max(max(-6.45-p.x,p.x-.95),max(-6.25-p.z,p.z-.15));
 float ceiling=7.03-abs(p.x+2.75)*.473;
 return (1.-smoothstep(-.075,.22,e))*(1.-smoothstep(ceiling-.20,ceiling+.02,p.y))*smoothstep(2.35,2.55,p.y);
}
vec2 tile(int m){
 if(m<2)return vec2(.405,2.04);
 if(m==2)return vec2(1.81,2.35);
 if(m==3)return vec2(.83,1.14);
 if(m==4)return vec2(.66,1.32);
 if(m==5)return vec2(.87,1.68);
 if(m==6||m==11)return vec2(1.58,1.96);
 if(m==7)return vec2(3.55,5.90);
 if(m==8)return vec2(.46,.99);
 if(m==9)return vec2(1.95,2.92);
 return vec2(.81,1.27);
}
vec3 unit(vec3 a){return a*inversesqrt(max(1.e-17,dot(a,a)));}
void main(){
 vec3 V=normalize(uEye-pos),n=unit(nrm);
 vec2 st=uv*tile(mat);vec4 sample1=texture(uSurface,vec3(st,float(mat)));
 vec3 base=colorAO.rgb*(sample1.r*1.235);
 if(mat==1)base=mix(base,vec3(.595,.548,.443)*(sample1.r*1.21),sample1.a*.48);
 if(mat==3)base=mix(base,vec3(.625,.628,.526)*(sample1.r*1.14),sample1.a*.24);
 if(mat==4||mat==5)base=mix(base,base*vec3(1.13,1.105,1.04),sample1.a*.8);
 if(mat==6)base=mix(base,vec3(.48,.36,.26)*sample1.r,sample1.a*.28);
 if(mat==8)base=mix(base,vec3(.58,.399,.283)*sample1.r,sample1.a*.42);
 float damp=0.;
 if(mat<6){damp=(1.-smoothstep(.065,.79,pos.y+(sample1.r-.8)*.13));
  float salt=(1.-smoothstep(.025,.089,abs(pos.y-.67+(sample1.r-.8)*.10)));
  if(mat<3){base=mix(base,base*vec3(.58,.67,.56),damp*.64);base=mix(base,vec3(.60,.61,.51),salt*.085);}
  else{base*=mix(vec3(1.),vec3(.68,.72,.70),damp*.65);}
 }
 vec3 px=dFdx(pos),py=dFdy(pos);vec2 ux=dFdx(st),uy=dFdy(st);
 float det=ux.x*uy.y-ux.y*uy.x;
 vec3 T=unit((px*uy.y-py*ux.y)*sign(det)),B=unit((py*ux.x-px*uy.x)*sign(det));
 vec2 bn=sample1.gb*2.-1.;vec3 ns=unit(n+(T*bn.x+B*bn.y)*.72);
 float hemi=.5+.5*n.y,room=inShop(pos);
 float opening=exp(-.70*abs(pos.x+2.18)-.68*abs(pos.z-.11));
 float ao=colorAO.a;
 vec3 ambient=mix(vec3(.335,.331,.277),vec3(.713,.788,.843),hemi);
 ambient*=mix(1.,.64+opening*.27,room);
 ambient+=vec3(.083,.060,.032)*room;
 float ndl=max(dot(ns,SUN),0.);
 float shadow=1.;if(ndl>.004)shadow=sunlight(pos,n);
 vec3 illum=ambient*ao+vec3(1.40,1.19,.895)*ndl*shadow*mix(.86,1.,ao);
 vec3 h=normalize(SUN+V);
 float metal=(mat==6||mat==11)?1.:0.;
 float gloss=mix(.018,.18,metal)+damp*.11+(mat==14?.072:0.);
 float spec=pow(max(dot(ns,h),0.),mix(34.,85.,metal))*gloss*shadow;
 vec3 linear=base*base*illum+spec*vec3(1.,.88,.63);
 vec3 c=sqrt(max(vec3(0.),linear));
 if(mat==15)c=mix(c,vec3(.82,.83,.73),.18);
 float fog=haze(length(pos-uEye));
 c=mix(c,horizon(pos-uEye),fog);
 if(uGlass==1){
  float fres=pow(1.-abs(dot(V,ns)),3.);
  vec3 r=reflect(-V,ns);vec3 glass=mix(vec3(.63,.71,.67),vec3(.82,.87,.82),sat(r.y));
  outColor=vec4(mix(glass,c,.22),.075+.39*fres);
 }else outColor=vec4(c,1.);
}`},
shadow:{vs:`#version 300 es
precision highp float;
precision highp int;
layout(location=0) in vec3 aPos;uniform mat4 uVP;
void main(){gl_Position=uVP*vec4(aPos,1.);}`,fs:`#version 300 es
precision highp float;
precision highp int;
void main(){}`},
sky:{vs:`#version 300 es
precision highp float;
precision highp int;
out vec2 screen;
void main(){vec2 p=vec2((gl_VertexID<<1)&2,gl_VertexID&2);screen=p*2.-1.;gl_Position=vec4(screen,1.,1.);}`,fs:`#version 300 es
precision highp float;
precision highp int;
in vec2 screen;uniform vec3 uForward,uRight,uUp;uniform vec2 uLens;uniform sampler2D uNoise;out vec4 outColor;
const vec3 SUN=vec3(.634354,.493387,.594173);
const vec3 HAZE=vec3(.802,.838,.821);
float sat(float f){return clamp(f,0.,1.);}
float haze(float d){return 1.-exp(-pow(max(0.,d-8.)*.0061,1.28));}
vec3 horizon(vec3 ray){return mix(HAZE,vec3(.936,.865,.723),pow(max(dot(normalize(vec3(ray.x,.06,ray.z)),SUN),0.),4.)*.69);}
void main(){
 vec3 d=normalize(uForward+screen.x*uLens.x*uRight+screen.y*uLens.y*uUp);
 float h=max(d.y,0.);
 vec3 col=mix(horizon(d),vec3(.455,.644,.747),pow(sat(h),.54));
 vec2 plane=d.xz/max(.031,h+.018);
 vec2 q=plane*vec2(.066,.092)+vec2(.214,.431);
 float l=texture(uNoise,q).r*.56+texture(uNoise,q*2.12+vec2(.33,.14)).r*.28+texture(uNoise,q*4.15).r*.16;
 float band=smoothstep(.477,.68,l)*smoothstep(.012,.11,h);
 col=mix(col,vec3(.902,.891,.835),band*.39);
 float thin=texture(uNoise,plane*vec2(.061,.37)+.23).r;
 col+=vec3(.037,.030,.018)*smoothstep(.61,.83,thin)*smoothstep(.02,.12,h);
 float sd=max(dot(d,SUN),0.);col+=vec3(.134,.088,.034)*pow(sd,17.)+vec3(.155,.128,.067)*pow(sd,180.);
 col=mix(col,vec3(1.,.973,.833),smoothstep(.99980,.99993,sd)*.95);
 outColor=vec4(col,1.);
}`},
reflect:{vs:`#version 300 es
precision highp float;
precision highp int;
layout(location=0) in vec3 aPos;layout(location=1) in vec3 aNormal;layout(location=3) in vec4 aColor;
uniform mat4 uVP;uniform vec3 uEye;out vec3 color;out float worldY;
const vec3 SUN=vec3(.634354,.493387,.594173);
const vec3 HAZE=vec3(.802,.838,.821);
float sat(float f){return clamp(f,0.,1.);}
float haze(float d){return 1.-exp(-pow(max(0.,d-8.)*.0061,1.28));}
vec3 horizon(vec3 ray){return mix(HAZE,vec3(.936,.865,.723),pow(max(dot(normalize(vec3(ray.x,.06,ray.z)),SUN),0.),4.)*.69);}
void main(){
 vec3 n=aNormal;float sun=max(dot(n,SUN),0.);
 float indoors=step(-6.43,aPos.x)*step(aPos.x,.93)*step(-6.23,aPos.z)*step(aPos.z,.13)*step(aPos.y,5.2);
 vec3 lit=aColor.rgb*sqrt(vec3(.49,.55,.57)*(1.-indoors*.45)+sun*vec3(1.37,1.17,.88));
 vec3 ray=aPos-uEye;color=mix(lit,horizon(ray),haze(length(ray)));worldY=aPos.y;
 gl_Position=uVP*vec4(aPos,1.);
}`,fs:`#version 300 es
precision highp float;
precision highp int;
in vec3 color;in float worldY;out vec4 outColor;
void main(){if(worldY<-.025)discard;outColor=vec4(color,1.);}`},
decal:{vs:`#version 300 es
precision highp float;
precision highp int;
layout(location=0) in vec3 aPos;layout(location=1) in vec2 aUV;layout(location=2) in vec3 aNorm;
uniform mat4 uVP;out vec2 uv;out vec3 pos,nrm;
void main(){uv=aUV;pos=aPos;nrm=aNorm;gl_Position=uVP*vec4(aPos,1.);}`,fs:`#version 300 es
precision highp float;
precision highp int;
in vec2 uv;in vec3 pos,nrm;uniform sampler2D uInk;uniform vec3 uEye;out vec4 outColor;
const vec3 SUN=vec3(.634354,.493387,.594173);
const vec3 HAZE=vec3(.802,.838,.821);
float sat(float f){return clamp(f,0.,1.);}
float haze(float d){return 1.-exp(-pow(max(0.,d-8.)*.0061,1.28));}
vec3 horizon(vec3 ray){return mix(HAZE,vec3(.936,.865,.723),pow(max(dot(normalize(vec3(ray.x,.06,ray.z)),SUN),0.),4.)*.69);}
uniform highp sampler2DShadow uShadow;
uniform mat4 uLight;
float sunlight(vec3 p,vec3 n){
 vec4 lp=uLight*vec4(p+n*.015,1.);
 vec3 q=lp.xyz*.5+.5;
 if(any(lessThan(q,vec3(.001)))||any(greaterThan(q,vec3(.999))))return 1.;
 float bias=.00016+.00014*(1.-max(dot(n,SUN),0.));
 vec2 d=1.35/vec2(textureSize(uShadow,0));
 float z=q.z-bias;
 return .20*(texture(uShadow,vec3(q.xy,z))+texture(uShadow,vec3(q.xy+d*vec2(-.93,-.69),z))+
 texture(uShadow,vec3(q.xy+d*vec2(.71,-.97),z))+texture(uShadow,vec3(q.xy+d*vec2(.97,.71),z))+texture(uShadow,vec3(q.xy+d*vec2(-.71,.97),z)));
}
float inShop(vec3 p){
 float e=max(max(-6.45-p.x,p.x-.95),max(-6.25-p.z,p.z-.15));
 float ceiling=7.03-abs(p.x+2.75)*.473;
 return (1.-smoothstep(-.075,.22,e))*(1.-smoothstep(ceiling-.20,ceiling+.02,p.y))*smoothstep(2.35,2.55,p.y);
}
void main(){
 vec4 ink=texture(uInk,uv);if(ink.a<.035)discard;
 vec3 n=normalize(nrm);float r=inShop(pos);
 float nd=max(dot(n,SUN),0.);float s=nd>.01?sunlight(pos,n):1.;
 vec3 color=ink.rgb*sqrt(vec3(.564,.601,.587)*(1.-.32*r)+vec3(1.38,1.18,.9)*nd*s);
 outColor=vec4(mix(color,horizon(pos-uEye),haze(length(pos-uEye))),ink.a);
}`},
water:{vs:`#version 300 es
precision highp float;
precision highp int;
layout(location=0) in vec3 aPos;layout(location=1) in float aBed;
uniform mat4 uVP;out vec3 pos;out float bed;
void main(){pos=aPos;bed=aBed;gl_Position=uVP*vec4(aPos,1.);}`,fs:`#version 300 es
precision highp float;
precision highp int;
in vec3 pos;in float bed;uniform vec3 uEye;uniform vec2 uViewport;
uniform sampler2D uMirror,uNoise;uniform float uTime;out vec4 outColor;
const vec3 SUN=vec3(.634354,.493387,.594173);
const vec3 HAZE=vec3(.802,.838,.821);
float sat(float f){return clamp(f,0.,1.);}
float haze(float d){return 1.-exp(-pow(max(0.,d-8.)*.0061,1.28));}
vec3 horizon(vec3 ray){return mix(HAZE,vec3(.936,.865,.723),pow(max(dot(normalize(vec3(ray.x,.06,ray.z)),SUN),0.),4.)*.69);}
uniform highp sampler2DShadow uShadow;
uniform mat4 uLight;
float sunlight(vec3 p,vec3 n){
 vec4 lp=uLight*vec4(p+n*.015,1.);
 vec3 q=lp.xyz*.5+.5;
 if(any(lessThan(q,vec3(.001)))||any(greaterThan(q,vec3(.999))))return 1.;
 float bias=.00016+.00014*(1.-max(dot(n,SUN),0.));
 vec2 d=1.35/vec2(textureSize(uShadow,0));
 float z=q.z-bias;
 return .20*(texture(uShadow,vec3(q.xy,z))+texture(uShadow,vec3(q.xy+d*vec2(-.93,-.69),z))+
 texture(uShadow,vec3(q.xy+d*vec2(.71,-.97),z))+texture(uShadow,vec3(q.xy+d*vec2(.97,.71),z))+texture(uShadow,vec3(q.xy+d*vec2(-.71,.97),z)));
}
float inShop(vec3 p){
 float e=max(max(-6.45-p.x,p.x-.95),max(-6.25-p.z,p.z-.15));
 float ceiling=7.03-abs(p.x+2.75)*.473;
 return (1.-smoothstep(-.075,.22,e))*(1.-smoothstep(ceiling-.20,ceiling+.02,p.y))*smoothstep(2.35,2.55,p.y);
}
void main(){
 vec3 eye=uEye-pos;float dist=length(eye);vec3 V=eye/dist;
 vec2 w=pos.xz,tide=vec2(.037,-.018)*uTime;
 float variation=texture(uNoise,w*.029+tide*.035).r;
 float fade=1.-smoothstep(22.,107.,dist);
 float a=dot(w,vec2(.87,.49))*3.5+uTime*.53+variation*2.2;
 float b=dot(w,vec2(-.37,.929))*6.18-uTime*.58+sin(a*.31);
 float c=dot(w,vec2(.91,.42))*12.6+uTime*.88+variation*3.5;
 float d=dot(w,vec2(-.73,.64))*22.-uTime*.92+sin(b);
 vec2 slope=vec2(.87,.49)*cos(a)*.021+vec2(-.37,.929)*cos(b)*.014;
 slope+=fade*(vec2(.91,.42)*cos(c)*.011+vec2(-.73,.64)*cos(d)*.005);
 vec3 N=normalize(vec3(slope.x,1.,slope.y));
 float depth=max(.0,-bed),deep=1.-exp(-depth*.99);
 float fres=.075+.82*pow(1.-max(dot(N,V),0.),4.1);
 vec2 uv=gl_FragCoord.xy/uViewport;
 vec2 bend=slope*vec2(.218,.277)*(.48+.52*fade);
 vec3 refl=texture(uMirror,clamp(uv+bend,vec2(.001),vec2(.999))).rgb;
 float ripple=sat(.53+.26*sin(a)+.16*cos(b)+.1*sin(c));
 vec3 body=mix(vec3(.424,.563,.515),vec3(.218,.413,.443),deep);
 body+=vec3(.016,.026,.021)*(ripple-.46);
 float shadow=dist<40.?sunlight(pos,vec3(0.,1.,0.)):1.;
 body*=mix(.79,1.,shadow);
 vec3 color=mix(body,refl,sat(.22+fres*.83));
 vec3 halfV=normalize(V+SUN);
 float sunGlint=pow(max(dot(N,halfV),0.),440.)*1.3;
 color+=vec3(.86,.71,.45)*sunGlint*shadow;
 float margin=(1.-smoothstep(.013,.071,depth))*(.47+.53*smoothstep(.31,.71,variation+.09*sin(b)));
 color=mix(color,vec3(.806,.817,.721),margin*.26);
 float fog=haze(dist);color=mix(color,horizon(pos-uEye),fog);
 float alpha=sat(.125+deep*.67+fres*.33+margin*.12+sunGlint*.4);
 outColor=vec4(color,mix(alpha,1.,fog));
}`},
};

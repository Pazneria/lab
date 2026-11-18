'use strict';
S.shaders = {
  vertex: `#version 300 es
precision highp float;
layout(location=0) in vec3 aPosition;
layout(location=1) in vec3 aNormal;
layout(location=2) in vec3 aColor;
layout(location=3) in vec2 aUV;
layout(location=4) in vec3 aMeta;
uniform mat4 uVP;
uniform mat4 uLight[4];
out vec3 wp;
out vec3 wn;
out vec3 albedo;
out vec2 uv;
flat out int mat;
out float room;
out float va;
out vec4 sc0;
out vec4 sc1;
out vec4 sc2;
out vec4 sc3;
void main(){
  vec4 p=vec4(aPosition,1.);
  wp=aPosition;wn=aNormal;albedo=aColor;uv=aUV;mat=int(aMeta.x+.1);room=aMeta.y;va=aMeta.z;
  sc0=uLight[0]*p;sc1=uLight[1]*p;sc2=uLight[2]*p;sc3=uLight[3]*p;
  gl_Position=uVP*p;
}`,
  solid: `#version 300 es
precision highp float;
precision highp sampler2DArrayShadow;
in vec3 wp;
in vec3 wn;
in vec3 albedo;
in vec2 uv;
flat in int mat;
in float room;
in float va;
in vec4 sc0;
in vec4 sc1;
in vec4 sc2;
in vec4 sc3;
uniform vec3 uEye;
uniform sampler2D uNoise;
uniform sampler2D uAtlas;
uniform sampler2D uGround;
uniform sampler2DArrayShadow uDepth;
out vec4 frag;
const vec3 SUN=vec3(-.571,.516,.638);
const vec3 SKY=vec3(.38,.57,.92);
const vec3 MAIN=vec3(-.44,2.984,-.78);
const vec3 DESK=vec3(-1.206,2.300,-3.520);
const vec3 PORCH=vec3(.262,2.40,4.177);
const vec3 AIR=vec3(-.79,2.923,2.62);
float sat(float v){return clamp(v,0.,1.);}
vec3 display(vec3 x){
  x=max(x,vec3(0.));return pow(clamp(x*(2.11*x+.05)/(x*(2.13*x+.65)+.17),0.,1.),vec3(.454545));
}
vec3 normalFromHeight(vec3 n,float h){
  vec3 dx=dFdx(wp),dy=dFdy(wp),a=cross(dy,n),b=cross(n,dx);
  float det=dot(dx,a);if(abs(det)<1e-12)return n;
  return normalize(n-(a*dFdx(h)+b*dFdy(h))/det);
}
float visibility(vec4 coord,int layer,float nl,float spread){
  if(coord.w<=.0001)return layer==0?1.:0.;
  vec3 q=coord.xyz/coord.w*.5+.5;
  if(min(min(q.x,q.y),q.z)<.001||max(max(q.x,q.y),q.z)>.999)return layer==0?1.:0.;
  float bias=layer==0?.00020+.00038*(1.-nl):.000055+.00010*(1.-nl);
  float ref=q.z-bias;float k=spread/1536.;
  return .25*(texture(uDepth,vec4(q.xy+vec2(.37,.79)*k,float(layer),ref))
     +texture(uDepth,vec4(q.xy+vec2(-.85,.33)*k,float(layer),ref))
     +texture(uDepth,vec4(q.xy+vec2(-.31,-.78)*k,float(layer),ref))
     +texture(uDepth,vec4(q.xy+vec2(.81,-.38)*k,float(layer),ref)));
}
vec3 lamp(vec3 source,vec3 color,float power,vec3 n,vec3 v,float gloss,float spec,vec4 sc,int layer){
  vec3 delta=source-wp;float ds=dot(delta,delta);
  if(ds>64.)return vec3(0.);
  vec3 l=delta*inversesqrt(max(ds,.00001));float nd=max(dot(n,l),0.);
  if(nd<=.001)return vec3(0.);
  vec3 h=normalize(l+v);
  float vis=layer<0?1.:visibility(sc,layer,nd,layer==1?2.45:2.1);
  return color*(power/(.54+ds))*vis*(nd+spec*pow(max(dot(h,n),0.),gloss));
}
void main(){
  vec3 n=normalize(wn),vdir=uEye-wp;float dist=length(vdir);vec3 v=vdir/max(.001,dist);
  float ns=max(dot(n,SUN),0.);
  if(mat==14){
    vec3 lin=pow(albedo,vec3(2.18))*(vec3(.28,.40,.65)+max(n.y,0.)*vec3(.05,.10,.14)+ns*vec3(.70,.74,.84));
    vec3 outc=display(lin);float f=.17+.255*smoothstep(66.,143.,dist);
    frag=vec4(mix(outc,vec3(.582,.675,.775),f),1.);return;
  }
  vec3 base=albedo;
  vec3 reflTint=vec3(1.);
  float metal=0.,spec=.024,gloss=31.,emission=0.,frost=0.,ao=va,rough=.74;
  vec2 st=abs(n.y)>.61?wp.xz:(abs(n.z)>abs(n.x)?wp.xy:wp.zy);
  vec4 ground=texture(uGround,wp.xz/36.+.5);
  if(mat==6){
    vec2 wind=vec2(wp.x*.979-wp.z*.204,wp.z*.979+wp.x*.204);
    vec4 coarse=texture(uNoise,wind*vec2(.053,.16));
    vec4 ridges=texture(uNoise,wind*vec2(.075,.42)+coarse.rg*.14);
    vec4 grains=texture(uNoise,wind*.92);
    float ph=wind.y*18.1+wind.x*.49+coarse.r*7.2+ridges.r*2.5;
    float roll=.5+.5*sin(ph);
    float driftMask=smoothstep(.37,.69,coarse.r*.67+ridges.r*.33);
    float wave=pow(roll,3.0)*driftMask*(1.-smoothstep(.3,2.0,fwidth(ph)));
    float nearGround=1.-smoothstep(.76,1.05,wp.y);
    float boot=ground.b*nearGround,track=boot*.38;
    float glaze=ground.a*nearGround;
    float bump=(.023*wave+.011*(ridges.r-.5)+.0028*(grains.g-.5))*(1.-boot*.71)-.041*boot-.012*track;
    n=normalFromHeight(n,bump*(1.-glaze*.88));ns=max(dot(n,SUN),0.);
    base*=.935+.067*coarse.r+.044*ridges.r+.031*grains.g+.037*wave;
    base=mix(base,base*vec3(.81,.87,.92),boot*.91);
    ao*=mix(1.,ground.r,nearGround)*(1.-.11*track);
    gloss=62.;spec=.036;rough=.83;
    if(glaze>.002){
      vec4 inclusions=texture(uNoise,wind*vec2(.58,1.46)+vec2(.32,.16));
      float seam=1.-smoothstep(.010,.054,abs(inclusions.r-.568));
      vec3 glazed=mix(vec3(.444,.570,.628),vec3(.716,.802,.819),.39*inclusions.r+.26*seam);
      float cover=glaze*(.82+.17*ridges.r);
      base=mix(base,glazed,cover);metal=glaze*.51;rough=mix(.83,.21,glaze);spec+=.62*glaze;gloss+=40.*glaze;
    }
    float sheen=smoothstep(.84,.99,grains.g)*smoothstep(.91,.993,texture(uNoise,wind*2.03+v.xz*.012).g);
    base+=vec3(.10)*sheen*(1.-smoothstep(2.,8.,dist));
  }else if(mat==12||mat==15){
    vec4 print=texture(uAtlas,uv);if(print.a<.44)discard;base*=print.rgb;rough=.69;
    if(mat==15)emission=.72;
  }else if(mat==11){
    frag=vec4(mix(albedo,vec3(1.,.979,.898),.22),1.);return;
  }else{
    vec4 macro=texture(uNoise,st*.36+wp.y*.018);
    vec4 grain=texture(uNoise,st*1.73);
    float h=0.;
    if(mat==0||mat==2){
      base*=.947+.082*macro.r+.023*(grain.g-.5);
      if(room<.2){
        vec4 streak=texture(uNoise,vec2(st.x*1.28,wp.y*.066)+.3*macro.r);
        float runoff=smoothstep(.53,.77,streak.b)*(.37+.63*(1.-smoothstep(.93,2.67,wp.y)));
        base*=1.-.12*runoff;
        float salts=smoothstep(.58,.77,macro.r+.09*grain.r)*smoothstep(.0,.57,n.y+.13)*.34;
        base=mix(base,vec3(.77,.82,.82),salts);
      }
      h=.00065*(grain.r-.5);spec=.097;gloss=47.;rough=.48;
    }else if(mat==1||mat==16){
      vec4 brush=texture(uNoise,st*vec2(.72,5.52));metal=mat==16?.78:.49;
      base*=.889+.133*macro.r+.083*brush.b;rough=mat==16?.21:.42;spec=mat==16?.78:.38;gloss=mat==16?104.:57.;
      h=.00058*brush.r;
    }else if(mat==3){
      base*=.967+.048*macro.r+.014*grain.g;h=.00045*grain.r;spec=.065;rough=.63;
    }else if(mat==4){
      vec2 axis=abs(n.y)>.57?vec2(wp.x,wp.z):st;
      vec4 wood=texture(uNoise,axis*vec2(.22,1.18));float lines=sin(axis.y*255.+wood.r*22.+macro.r*9.);
      float filt=1.-smoothstep(.85,4.,fwidth(axis.y*255.));
      base*=.885+.173*wood.r+.041*lines*filt;h=.0013*wood.b;spec=.08;
    }else if(mat==5){
      vec2 a=st*1550.;float ft=1.-smoothstep(.65,4.0,max(fwidth(a.x),fwidth(a.y)));
      float twill=sin(a.x)*sin(a.y+.4*sin(a.x));base*=.945+.075*macro.r+.019*grain.g+.047*ft*twill;
      h=.0011*grain.r;spec=.011;rough=.96;
    }else if(mat==7){
      vec4 strata=texture(uNoise,st*vec2(1.1,4.3));base*=.844+.22*macro.r+.084*strata.b;h=.012*macro.r+.003*grain.r;rough=.85;
    }else if(mat==8||mat==17){
      vec4 stria=texture(uNoise,st*vec2(1.9,.45)+macro.r*.28);
      float vein=smoothstep(.47,.548,stria.r)*(1.-smoothstep(.548,.587,stria.r));
      base=mix(base,vec3(.86,.89,.86),.13*vein+.1*macro.r);h=.0019*stria.r;
      spec=mat==8?.57:.17;gloss=mat==8?88.:46.;rough=mat==8?.21:.63;metal=.15;
    }else if(mat==9){
      base*=.965+.055*grain.r;rough=.86;h=.00072*grain.r;
    }else if(mat==10){
      float fleck=smoothstep(.72,.86,grain.g)-smoothstep(.73,.90,grain.b);
      base*=.966+.052*macro.r+.083*fleck;h=.0007*grain.g;rough=.62;spec=.087;
      ao*=ground.g*(.79+.21*smoothstep(0.,.31,min(4.4-abs(wp.x),min(wp.z+3.97,1.56-wp.z))));
    }else if(mat==18){gloss=78.;spec=.37;rough=.28;
    }else if(mat==19){
      vec2 q=wp.xz*vec2(22.,36.);float t=sin(q.x*3.14159)*cos(q.y*3.14159);
      float holes=smoothstep(-.25,.38,t);base*=.64+.36*holes;h=.0032*holes;rough=.83;
    }else if(mat==20){
      vec2 q=st*vec2(48.,63.);float diamond=abs(fract(q.x+q.y*.47)-.5)*2.+abs(fract(q.y-q.x*.42)-.5)*2.;
      float tooth=1.-smoothstep(.28,.50,diamond);base*=.92+.06*tooth+.07*macro.r;h=.0019*tooth;metal=.48;rough=.36;spec=.31;
    }
    n=normalFromHeight(n,h);ns=max(dot(n,SUN),0.);
  }
  float inside=room;
  if(inside>.92&&wp.y>1.647&&wp.y<1.712&&n.y>.78)ao*=1.-.56*ground.b;
  float outdoorAO=1.;
  if(inside<.08&&mat!=6)outdoorAO=mix(ground.r,1.,smoothstep(.18,.98,wp.y));
  float hemi=sat(n.y*.5+.5);
  vec3 extAmb=mix(vec3(.18,.258,.416),vec3(.267,.414,.714),hemi);
  vec3 intAmb=mix(vec3(.235,.156,.099),vec3(.322,.239,.161),hemi);
  // Blue fill has a fixed location at each opening. Exposure stays fixed through the vestibule.
  if(inside>.001){
  float frontWindow=exp(-.51*length((wp-vec3(2.62,2.07,1.68))*vec3(1.,1.1,1.4)));
  float backWindow=exp(-.67*length((wp-vec3(1.52,2.37,-4.09))*vec3(.94,1.,1.36)));
  float doorway=exp(-.67*length((wp-vec3(-.79,1.77,3.91))*vec3(1.3,.87,.97)));
  float westWindow=exp(-.85*length(wp-vec3(-4.52,2.12,-1.44)));
  float eastWindow=exp(-.78*length(wp-vec3(4.51,2.13,.13)));
  intAmb+=vec3(.076,.145,.244)*(frontWindow+backWindow+doorway+westWindow+eastWindow);
  }
  float floorEdge=sat((wp.y-.766)*3.6);
  if(inside>.5&&wp.y>.76)ao*=.91+.09*floorEdge;
  vec3 amb=mix(extAmb*outdoorAO,intAmb,inside)*ao;
  float sunvis=ns>.002?visibility(sc0,0,ns,1.55):0.;
  vec3 irradiance=amb+vec3(.59,.677,.853)*ns*sunvis;
  vec3 hsun=normalize(SUN+v);float solar=spec*pow(max(dot(hsun,n),0.),gloss)*sunvis;
  vec3 practical=vec3(0.);
  if(inside>.01){
    practical+=lamp(MAIN,vec3(1.,.681,.396),3.32,n,v,gloss,spec,sc1,1);
    practical+=lamp(DESK,vec3(1.,.671,.345),.82,n,v,gloss,spec,sc2,2);
    practical+=lamp(vec3(2.75,2.972,-2.86),vec3(1.,.786,.535),1.39,n,v,gloss,spec,sc1,-1)*smoothstep(.42,.99,inside);
    practical+=lamp(vec3(-4.13,2.20,-2.11),vec3(1.,.593,.298),.37,n,v,gloss,spec,sc1,-1)*smoothstep(.39,.93,inside);
  }
  if(wp.z>-.71&&wp.z<11.&&abs(wp.x)<6.){
    float aperture=1.-smoothstep(.76,1.5,abs(wp.x+.79));
    float airMask=mix(aperture,1.,inside)*smoothstep(.45,1.65,wp.z);
    practical+=lamp(AIR,vec3(1.,.642,.328),1.59,n,v,gloss,spec,sc1,-1)*airMask;
    practical+=lamp(PORCH,vec3(1.,.629,.301),1.08,n,v,gloss,spec,sc3,3);
  }
  vec3 lin=pow(max(base,vec3(0.)),vec3(2.18));
  vec3 shaded=lin*(irradiance+practical)+solar*mix(vec3(.77,.86,1.),lin,metal);
  float f=pow(1.-max(0.,dot(v,n)),4.);
  vec3 reflected=reflect(-v,n);vec3 env=mix(vec3(.19,.267,.37),vec3(.48,.61,.79),sat(reflected.y+.1));
  env=mix(env,vec3(.41,.303,.189),inside);
  shaded+=env*(.014+metal*(.083+.30*f))*(1.-rough*.70)*ao;
  if(emission>.01)shaded=lin*(emission+.27*amb)+vec3(.003,.007,.006);
  vec3 outc=display(shaded);
  float fog=smoothstep(27.,130.,dist)*.46;outc=mix(outc,vec3(.589,.679,.778),fog);
  frag=vec4(outc,1.);
}`,
  glass: `#version 300 es
precision highp float;
in vec3 wp;
in vec3 wn;
in vec2 uv;
in float room;
uniform vec3 uEye;
uniform sampler2D uNoise;
out vec4 frag;
void main(){
 vec3 v=normalize(uEye-wp),n=normalize(wn);bool ext=dot(n,v)>0.;if(!ext)n=-n;
 vec3 refl=reflect(-v,n);
 vec4 nr=texture(uNoise,wp.xy*2.34+wp.zy*.84);
 float lo=min(min(uv.x,1.-uv.x)*1.7,min(uv.y,1.-uv.y));
 float edge=1.-smoothstep(.017+nr.r*.022,.051+nr.r*.039,lo);
 vec2 st=vec2(wp.x+wp.z,wp.y);
 float twig=abs(sin(st.y*281.+st.x*125.+8.*nr.r))*abs(sin(st.x*235.-st.y*160.+nr.b*8.));
 float ice=edge*(.25+.42*nr.r+.29*twig);
 float fr=.035+.55*pow(1.-abs(dot(v,n)),4.);
 vec3 sky=mix(vec3(.61,.71,.80),vec3(.22,.37,.59),clamp(refl.y*1.6,0.,1.));
 float ridge=.055+.028*sin(atan(refl.z,refl.x)*15.)+.018*sin(atan(refl.z,refl.x)*37.);
 sky=mix(vec3(.36,.47,.59),sky,smoothstep(ridge-.012,ridge+.012,refl.y));
 vec3 reflected=ext&&room<.7?sky:vec3(.56,.45,.31);
 vec3 color=mix(reflected,vec3(.75,.83,.86),ice);
 frag=vec4(color,clamp(.039+fr*.65+ice*.52,0.,.77));
}`,
  skyVertex: `#version 300 es
precision highp float;
out vec2 pos;
void main(){
 vec2 p=vec2((gl_VertexID<<1)&2,gl_VertexID&2)*2.-1.;
 pos=p;gl_Position=vec4(p,1.,1.);
}`,
  sky: `#version 300 es
precision highp float;
in vec2 pos;
uniform vec3 uForward;
uniform vec3 uRight;
uniform vec3 uUp;
uniform vec2 uFov;
uniform sampler2D uNoise;
out vec4 frag;
float rnd(vec2 p){vec3 q=fract(vec3(p.xyx)*vec3(.1031,.11369,.13787));q+=dot(q,q.yzx+19.19);return fract((q.x+q.y)*q.z);}
void main(){
 vec3 d=normalize(uForward+uRight*(pos.x*uFov.x)+uUp*(pos.y*uFov.y));float e=max(d.y,0.);
 vec3 sky=mix(vec3(.676,.757,.839),vec3(.318,.469,.675),smoothstep(-.025,.30,e));
 sky=mix(sky,vec3(.101,.187,.343),smoothstep(.16,.95,e));
 float west=pow(max(0.,dot(normalize(d.xz+vec2(.00001)),normalize(vec2(-.93,.15)))),2.);
 sky+=vec3(.131,.043,-.021)*west*exp(-pow((e-.087)*7.5,2.));
 float belt=exp(-pow((e-.117)*12.,2.));sky+=vec3(.034,.003,.022)*belt*(1.-west*.49);
 vec2 sphere=vec2(atan(d.x,-d.z),asin(clamp(d.y,-1.,1.))),p=sphere*122.,cell=floor(p);
 vec2 star=vec2(rnd(cell+11.2),rnd(cell+61.4))*.76+.12;
 vec2 local=fract(p)-star;local.x*=max(.16,cos(sphere.y));
 float a=rnd(cell+3.31),spark=(1.-smoothstep(.006,.09,length(local)))*step(.982,a)*smoothstep(.15,.55,e);
 sky+=vec3(.54,.63,.74)*spark*(.42+.58*rnd(cell+76.));
 vec3 moon=normalize(vec3(.105,.413,-.942));vec3 east=normalize(cross(moon,vec3(0.,1.,0.)));vec3 up=cross(east,moon);
 vec2 disk=vec2(dot(d,east),dot(d,up))/.0108;float rad=length(disk);
 if(dot(d,moon)>.98){
   sky+=vec3(.05,.054,.063)*exp(-rad*1.25);
   float mask=1.-smoothstep(.93,1.045,rad);
   vec3 orb=vec3(disk,sqrt(max(0.,1.-dot(disk,disk))));
   float light=.36+.64*max(dot(orb,normalize(vec3(-.53,.25,.86))),0.);
   float maria=texture(uNoise,disk*.16+vec2(.32,.73)).r;
   sky=mix(sky,vec3(.934,.944,.920)*(.73+.24*maria)*light,mask);
 }
 float dither=(rnd(gl_FragCoord.xy)-.5)/320.;
 frag=vec4(sky+dither,1.);
}`,
  depthVertex: `#version 300 es
precision highp float;
layout(location=0) in vec3 aPosition;
uniform mat4 uVP;
void main(){gl_Position=uVP*vec4(aPosition,1.);}`,
  depth: `#version 300 es
precision highp float;
void main(){}`
};


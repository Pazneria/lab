"use strict";
globalThis.HouseShaders=(()=>{
const version=`#version 300 es
precision highp float;
precision highp int;
precision highp sampler2DArray;
precision highp sampler2DShadow;
`;
const inputs=`
layout(location=0) in vec3 aPos;
layout(location=1) in vec3 aNormal;
layout(location=2) in vec2 aUV;
layout(location=3) in vec3 aColor;
layout(location=4) in float aKind;
layout(location=5) in float aAO;
`;
const vertex=version+inputs+`
uniform mat4 uVP,uLight;
out vec3 vWorld,vNormal,vColor;
out vec2 vUV;
out vec4 vShadow;
out float vAO;
flat out int vKind;
void main(){
  vWorld=aPos*(1.0/2048.0);vNormal=aNormal;vColor=aColor;vKind=int(aKind+0.5);vAO=aAO;vUV=aUV;
  vShadow=uLight*vec4(vWorld,1.0);gl_Position=uVP*vec4(vWorld,1.0);
}`;
const bladeCut=`
bool bladeCut(int kind,vec2 uv,vec3 col){
  if(kind!=13 && kind!=12)return false;
  float side=uv.x>.5?1.0:-1.0;
  float s=clamp((col.r/max(.05,col.g)-.65)*1.61,-.27,.27),w=abs(uv.x*2.-1.),t=uv.y;
  if(kind==13){
    float row=(t-.115*w+.035*w*w)*5.8+.41*side+s;
    float n=floor(row),wave=fract(row)-.5;
    float mid=.53+.09*sin(n*3.1+side+s);
    vec2 hole=vec2((w-mid)/(.12+.025*cos(n+side)),wave/.15);
    if(t>.12 && t<.89 && dot(hole,hole)<1.)return true;
    float slot=(t-.09*w)*5.51+.21*side+s;
    if(t>.17 && t<.88 && w>.71+.12*sin(floor(slot)*4.+side) && abs(fract(slot)-.5)<(.010+.095*max(0.,w-.68)))return true;
  }else if(w>.53){
    float crease=t-.067*w+.018*w*w;
    float e=min(abs(crease-(.34+.15*side+s*.16)),abs(crease-(.67+.075*side+s*.18)));
    if(e<.001+.018*max(0.,w-.62) && (w>.77 || side>0.))return true;
  }
  return false;
}`;
const skyFn=`
uniform sampler2D uSky;
const float PI=3.14159265359;
vec2 skyUV(vec3 d){return vec2(fract(.5+atan(d.z,d.x)/(2.*PI)),.5-asin(clamp(d.y,-1.,1.))/PI);}
vec3 skySample(vec3 d){return texture(uSky,skyUV(d)).rgb;}
`;
const fragment=version+`
in vec3 vWorld,vNormal,vColor;in vec2 vUV;in vec4 vShadow;in float vAO;flat in int vKind;
uniform sampler2DArray uAlbedo,uNormals;
uniform sampler2D uLabels;
uniform sampler2DShadow uShadow;
uniform vec3 uEye,uSun;
uniform float uShadowTexel;
out vec4 fragColor;
`+skyFn+bladeCut+`
float shadowVisibility(float nLight){
  vec3 p=vShadow.xyz/vShadow.w*.5+.5;
  if(p.z>1.||p.z<0.||any(lessThan(p.xy,vec2(.001)))||any(greaterThan(p.xy,vec2(.999))))return 1.;
  float b=.00017+.00032*(1.-nLight),d=p.z-b;
  vec2 t=vec2(uShadowTexel)*1.18;
  float result=texture(uShadow,vec3(p.xy,d))*.28;
  result+=.18*texture(uShadow,vec3(p.xy+t*vec2(-1.13,.62),d));
  result+=.18*texture(uShadow,vec3(p.xy+t*vec2(.56,1.21),d));
  result+=.18*texture(uShadow,vec3(p.xy+t*vec2(1.16,-.58),d));
  result+=.18*texture(uShadow,vec3(p.xy+t*vec2(-.53,-1.17),d));
  return result;
}
vec3 bumped(vec3 n,vec2 uv,vec2 xy,float strength){
  vec3 dp1=dFdx(vWorld),dp2=dFdy(vWorld);
  vec2 duv1=dFdx(uv),duv2=dFdy(uv);
  vec3 dp2p=cross(dp2,n),dp1p=cross(n,dp1);
  vec3 t=dp2p*duv1.x+dp1p*duv2.x,b=dp2p*duv1.y+dp1p*duv2.y;
  float inv=inversesqrt(max(1.e-13,max(dot(t,t),dot(b,b))));
  return normalize(n*sqrt(max(.20,1.-dot(xy,xy)))+strength*inv*(xy.x*t+xy.y*b));
}
void main(){
  int k=vKind;bool blade=(k>=12&&k<=17)||k==22;
  if(bladeCut(k,vUV,vColor))discard;
  vec3 viewDir=normalize(uEye-vWorld),geo=normalize(vNormal+vec3(.000001));
  float originalFacing=dot(geo,viewDir);
  if(originalFacing<0.)geo=-geo;
  float sc=k==3?1.58:k==8?2.72:k==4?1.95:k==6?2.49:k==5?1.41:k==0?1.94:k==10?2.51:1.46;
  vec2 uv=blade||k==18?vUV:vUV*sc;
  if(!blade && k!=18)uv+=vec2(.183,.287);
  vec3 sampleColor=texture(uAlbedo,vec3(uv,float(k))).rgb*1.65;
  vec2 xy=texture(uNormals,vec3(uv,float(k))).rg*2.-1.;
  float strength=k==8?.72:k==3?.78:k==6?.51:k==4?.75:k==0?.57:blade?.68:.60;
  vec3 n=bumped(geo,uv,xy,strength);
  vec3 base=vColor*sampleColor;
  if(k==18){base=texture(uLabels,vUV).rgb;n=geo;}
  if((k==0||k==11) && k!=18){
    float oxid=clamp((sampleColor.r-sampleColor.b)*1.4-.04,0.,.68);
    base=mix(base,vec3(.48,.34,.22)*(.8+.2*sampleColor.g),oxid*.62);
  }
  float wet=0.;
  if(k==2||k==7||k==1){
    float damp=clamp((.79-vAO)*2.2,0.,1.)*clamp(1.-vWorld.y*1.4,.0,1.);
    vec2 a=(vWorld.xz-vec2(3.50,-4.12))*vec2(1.46,.70);
    vec2 b=(vWorld.xz-vec2(-3.39,1.79))*vec2(1.75,.91);
    float pool=exp(-dot(a,a))+exp(-dot(b,b));
    float moisture=texture(uAlbedo,vec3(vWorld.xz*.43+vec2(.31,.19),19.)).r;
    wet=smoothstep(.46,.84,pool*.69+moisture*.38)*clamp(1.-4.*vWorld.y,0.,1.);
    float edge=exp(-pow(abs(abs(vWorld.x)-1.50)*5.,2.))*(1.-smoothstep(5.96,6.51,abs(vWorld.z)));
    float greenSeam=smoothstep(.48,.80,moisture)*edge;
    base*=mix(vec3(1.),vec3(.85,.91,.84),damp);
    base*=mix(vec3(1.),vec3(.73,.80,.77),wet);
    base=mix(base,vec3(.40,.44,.29)*sampleColor,greenSeam*.24);
  }
  if(blade && originalFacing<0.)base*=vec3(1.095,1.06,.94);
  vec3 alb=pow(clamp(base,0.,1.25),vec3(2.16));
  float nl=max(0.,dot(n,uSun)),ng=max(0.,dot(geo,uSun)),back=max(0.,-dot(n,uSun));
  float lit=shadowVisibility(ng);
  vec2 groundProjection=vWorld.xz-uSun.xz*(vWorld.y/uSun.y);
  float windowLight=.84+.20*texture(uAlbedo,vec3(groundProjection*.154,19.)).g;
  float hemi=.5+.5*n.y;
  vec3 ambient=mix(vec3(.324,.335,.252),vec3(.644,.705,.678),hemi);
  ambient*=.25+.75*vAO;
  vec3 sun=vec3(1.29,1.14,.875)*windowLight;
  vec3 illumination=ambient+sun*(nl*lit);
  if(blade){
    float transmitted=(.41*back+.065*(1.-abs(dot(n,uSun))))*(.13+.87*lit);
    illumination+=vec3(1.03,1.13,.64)*transmitted;
    illumination+=vec3(.028,.044,.018)*(1.-vAO);
  }
  vec3 color=alb*illumination;
  float gloss=blade?(k==12?.36:k==13?.48:k==15?.44:k==17?.065:.19):k==9?.57:k==11?.24:k==0?.17:k==6?.085:k==10?.11:k==18?.16:.034;
  float power=blade?(k==12?53.:k==13?74.:k==15?66.:38.):k==9?79.:k==11?42.:k==0?54.:24.;
  gloss+=.32*wet;power=mix(power,72.,wet);
  vec3 halfDir=normalize(uSun+viewDir);
  float spec=pow(max(dot(n,halfDir),0.),power)*smoothstep(-.12,.23,dot(n,uSun));
  color+=sun*gloss*spec*lit;
  float facing=clamp(dot(n,viewDir),0.,1.),fr=pow(1.-facing,4.);
  if(blade||k==9||k==11||k==0||k==10||wet>.03){
    vec3 refl=reflect(-viewDir,n);vec3 env=textureLod(uSky,skyUV(refl),3.1).rgb;
    float q=(.025+.39*fr)*gloss*(.30+.70*vAO);
    color+=pow(env,vec3(2.16))*q*(.54+.46*smoothstep(-.4,.8,refl.y));
  }
  color=color/(1.+.125*color);
  vec3 result=pow(max(color,vec3(0.)),vec3(1./2.16));
  float dist=length(uEye-vWorld);
  result=mix(result,vec3(.77,.805,.705),min(.093,dist*dist*.00019));
  fragColor=vec4(result,1.);
}`;
const shadowV=version+inputs+`uniform mat4 uLight;out vec2 vUV;out vec3 vColor;flat out int vKind;void main(){vUV=aUV;vColor=aColor;vKind=int(aKind+.5);gl_Position=uLight*vec4(aPos/2048.,1.);}`;
const shadowF=version+`in vec2 vUV;in vec3 vColor;flat in int vKind;`+bladeCut+`void main(){if(bladeCut(vKind,vUV,vColor))discard;}`;
const glassF=version+`
in vec3 vWorld,vNormal,vColor;in vec2 vUV;in float vAO;in vec4 vShadow;flat in int vKind;
uniform vec3 uEye,uSun;uniform sampler2DArray uAlbedo,uNormals;out vec4 fragColor;
`+skyFn+`
void main(){
  vec3 N=normalize(vNormal),V=normalize(uEye-vWorld);
  if(dot(N,V)<0.)N=-N;
  vec2 uv=vUV*vec2(1.04,.87);
  vec3 grime=texture(uAlbedo,vec3(uv,19.)).rgb;
  vec3 relief=texture(uNormals,vec3(uv*.71,19.)).rgb;
  float rightSide=step(.7,abs(N.x)),endPane=step(.71,abs(N.z));
  float upright=rightSide+endPane;
  float column=rightSide>.5?mod(vWorld.z+9.2,1.15):mod(vWorld.x+4.15,1.383);
  float sideWidth=rightSide>.5?1.15:1.383;
  float edge=1.-smoothstep(.016,.10,min(column,sideWidth-column));
  float sill=(1.-smoothstep(.009,.16,vUV.y))*(.42+.58*grime.r);
  float damp=clamp((edge*.30*upright+sill*.53)*(.60+.60*grime.r),0.,1.);
  vec3 warp=vec3((grime.g-.5)*.045,(relief.g-.5)*.064,(grime.b-.35)*.028);
  vec3 n=normalize(N+warp);
  float fr=.036+.83*pow(max(0.,1.-abs(dot(n,V))),4.15),haze=.041+.117*grime.r+.055*grime.b+.088*(1.-vColor.r);
  vec3 refl=reflect(-V,n),sky=textureLod(uSky,skyUV(refl),1.6+grime.r*2.).rgb;
  vec3 tint=mix(vec3(.76,.82,.75),vec3(.67,.70,.55),grime.r*.46+damp*.55);
  vec3 color=mix(tint,sky,clamp(.26+fr*1.6,.0,.88));
  float sheen=pow(max(dot(refl,uSun),0.),58.);
  color+=vec3(.19,.146,.070)*sheen;
  float alpha=clamp(haze+fr*.65+damp*.28+sheen*.14,.046,.72);
  fragColor=vec4(color,alpha);
}`;
const screenV=version+`out vec2 vNDC;void main(){vec2 p=vec2((gl_VertexID<<1)&2,gl_VertexID&2);vNDC=p*2.-1.;gl_Position=vec4(vNDC,.999999,1.);}`;
const skyF=version+`in vec2 vNDC;out vec4 fragColor;uniform vec3 uEye,uForward,uRight,uUp,uSun;uniform vec2 uLens;uniform sampler2DArray uAlbedo;`+skyFn+`
void main(){
  vec3 ray=normalize(uForward+vNDC.x*uLens.x*uRight+vNDC.y*uLens.y*uUp),color=skySample(ray);
  if(ray.y<-.001){
    float t=(-.178-uEye.y)/ray.y;vec3 p=uEye+t*ray;
    vec3 stone=texture(uAlbedo,vec3(p.xz*.99,7.)).rgb*1.65;
    float moss=texture(uAlbedo,vec3(p.xz*.17,19.)).r;
    vec3 ground=mix(vec3(.531,.529,.431),vec3(.442,.489,.361),moss)*stone;
    float nearHouse=1.-smoothstep(4.,10.,max(abs(p.x)-4.15,abs(p.z)-9.2));
    ground*=.90+.1*(1.-nearHouse);
    color=mix(ground,color,smoothstep(9.,42.,t));
  }
  float sun=max(0.,dot(ray,uSun));color+=vec3(.13,.098,.047)*pow(sun,54.)+vec3(.22,.18,.09)*smoothstep(.9994,.9999,sun);
  fragColor=vec4(color,1.);
}`;
return{vertex,fragment,shadowV,shadowF,glassF,screenV,skyF};
})();
export const vertex = `#version 300 es
precision highp float;
layout(location=0) in vec3 aPosition;
layout(location=1) in vec3 aNormal;
layout(location=2) in vec2 aSurface;
layout(location=3) in vec2 aLight;
uniform mat4 uVP;
out vec3 vP;
out vec3 vN;
out vec2 vUV;
out vec2 vLight;
void main(){
  vP=aPosition;vN=aNormal;vUV=aSurface;vLight=aLight;
  gl_Position=uVP*vec4(aPosition,1.);
}`;

export const fragment = `#version 300 es
precision highp float;
precision highp int;
precision highp sampler3D;
in vec3 vP;
in vec3 vN;
in vec2 vUV;
in vec2 vLight;
out vec4 outColor;
uniform int uMat;
uniform vec3 uColor,uEye,uSun;
uniform vec2 uPixels;
uniform mat4 uVP;
uniform sampler2D uDay,uSurface,uSign,uBehind;
uniform sampler3D uVolume;
const vec3 SUN=vec3(2.98,2.44,1.84);
const float PI=3.14159265;
float sat(float x){return clamp(x,0.,1.);}
float hash21(vec2 p){
  vec3 p3=fract(vec3(p.xyx)*vec3(.1031,.1030,.0973));
  p3+=dot(p3,p3.yzx+33.33);
  return fract((p3.x+p3.y)*p3.z);
}
float lum(vec3 c){return dot(c,vec3(.2126,.7152,.0722));}
vec3 displayLinear(vec3 c){
  c=max(vec3(0.),c)*1.08;
  return clamp((c*(2.31*c+.04))/(c*(2.27*c+.60)+.145),0.,1.);
}
vec3 encode(vec3 c){return pow(max(vec3(0.),c),vec3(1./2.2));}
float fill(float signedDistance,float width){return 1.-smoothstep(-width,width,signedDistance);}
float floorHeight(float z){return clamp((3.8-z)/9.4,0.,1.)*.84;}
float rectField(vec2 q,vec4 r,float blur){
  vec2 d=max(r.xy-q,q-r.zw);
  return 1.-smoothstep(-blur,blur,max(d.x,d.y));
}
// Box-projected reflections retain the positions of the roof openings as a
// visitor moves; rough materials integrate over a wider patch of the sky.
vec3 roomReflection(vec3 p,vec3 ray,float rough,float bounce){
  bool hall=p.z< -5.60,gallery=p.z>3.80;
  vec3 lo=hall?vec3(-10.15,.84,-22.):gallery?vec3(-8.1,0.,3.8):vec3(-1.55,0.,-5.6);
  vec3 hi=hall?vec3(9.05,9.25,-5.6):gallery?vec3(8.1,4.65,17.4):vec3(5.95,6.25,3.8);
  vec4 aperture=hall?vec4(-7.5,-17.9,1.85,-8.05):gallery?vec4(-6.75,6.2,-.90,13.1):vec4(-.91,-4.95,1.02,2.08);
  vec4 mouth=hall?vec4(-6.93,-17.26,1.21,-8.85):gallery?vec4(-6.5,6.53,-1.22,12.75):vec4(-.83,-4.78,.85,1.92);
  vec3 d=mix(vec3(-1.),vec3(1.),step(vec3(0.),ray))*max(abs(ray),vec3(.0001));
  vec3 t=(mix(lo,hi,step(vec3(0.),d))-clamp(p,lo+.001,hi-.001))/d;
  float travel=min(t.x,min(t.y,t.z)),blur=.014+travel*rough*rough*.72;
  vec3 q=p+ray*travel;
  float openSky=0.;
  if(t.y<=t.x && t.y<=t.z && d.y>0.){
    vec2 top=q.xz+ray.xz*(hall?1.55:gallery?1.05:.94)/d.y;
    openSky=rectField(q.xz,aperture,blur)*rectField(top,mouth,blur);
    if(hall)openSky*=1.-.72*fill(abs(top.y+14.456)-.13,blur+.006);
  }else if(t.x<=t.z && t.x<=t.y && d.x>0. && (gallery||hall)){
    vec4 slit=hall?vec4(-18.7,6.47,-9.15,7.62):vec4(5.82,3.35,11.87,4.10);
    openSky=rectField(q.zy,slit,blur);
  }
  vec3 room=mix(vec3(.118,.111,.099),vec3(.24,.23,.21),sat(ray.y*.5+.5))*(.52+min(1.6,bounce)*.8);
  return room+openSky*vec3(1.32,1.62,1.98);
}
void frame(vec3 n,out vec2 uv,out vec3 T,out vec3 B){
  vec3 a=abs(n);
  if(a.y>=max(a.x,a.z)){uv=vP.xz;T=vec3(1.,0.,0.);B=vec3(0.,0.,1.);}
  else if(a.x>a.z){uv=vec2(-vP.z,vP.y);T=vec3(0.,0.,-1.);B=vec3(0.,1.,0.);}
  else{uv=vP.xy;T=vec3(1.,0.,0.);B=vec3(0.,1.,0.);}
}
float sawLine(float x,float period,float width,float aa){
  float d=abs(fract(x/period+.5)-.5)*period;
  return fill(d-width,aa);
}
vec3 cement(vec2 uv,vec3 n,vec4 fine,vec4 cloud,bool board,bool ceiling){
  float aa=max(.0006,max(fwidth(uv.x),fwidth(uv.y))*.52);
  vec2 q=uv+(ceiling?vec2(.58,.36):vec2(.35,.006));
  vec2 size=ceiling?vec2(2.44,1.22):vec2(2.42,1.21);
  vec2 panel=floor(q/size),local=fract(q/size)*size;
  float random=hash21(panel+floor(n.xz*1.7)*23.);
  vec2 seamDist=min(local,size-local);
  float joint=fill(min(seamDist.x,seamDist.y)-.0024,aa);
  float lift=fill(min(abs(local.x-.0065),abs(local.y-.0065))-.0012,aa);
  float form=1.+(random-.5)*.098+(cloud.r-.5)*.42+(cloud.b-.50)*.15+(fine.r-.545)*.66;
  form*=1.-joint*(board?.16:.33)+lift*.085;
  if(board){
    float row=floor(q.y/.173),offset=hash21(vec2(row,3.1))*4.2;
    float grain=texture(uVolume,vec3(uv.x*.014,uv.y*.78,.41)).a;
    float longGrain=texture(uVolume,vec3(uv.x*.008,uv.y*3.50,.18)).g;
    float plank=sawLine(q.y,.173,.0019,aa),end=sawLine(q.x+offset,3.81,.002,aa);
    form*=1.+(grain-.5)*.12+(longGrain-.5)*.064+(hash21(vec2(row,floor((q.x+offset)/3.81)))-.5)*.06-plank*.21-end*.15;
  }else{
    // Slight plywood figuring, reversed on alternate panels.
    vec2 grainUV=random>.5?uv.xy:uv.yx;
    form+=(texture(uVolume,vec3(grainUV.x*.018,grainUV.y*.39,random*.54)).b-.5)*.064;
  }
  if(!ceiling){
    vec2 hole=local-vec2(local.x<size.x*.5?.333:size.x-.333,local.y<size.y*.5?.307:size.y-.307);
    float dist=length(hole),r=.017;
    float pocket=fill(dist-r,aa),plug=fill(dist-r*.67,aa);
    float lip=fill(abs(dist-r*1.14)-.0022,aa);
    float dir=dot(hole/max(dist,.0001),vec2(-.46,.89));
    float repaired=step(.76,hash21(panel*5.07+step(size*.5,local)*.61));
    form*=1.-(.60-.23*repaired)*pocket+(.26-.02*repaired)*plug+.14*lip*dir+.092*dir*pocket;
    float streak=exp(-abs(hole.x)*59.)*smoothstep(.003,.032,-hole.y)*(1.-smoothstep(.034,.23,-hole.y));
    form-=streak*.028;
    form*=.955+.045*smoothstep(.008,.24,vP.y-floorHeight(vP.z));
    float spring=vP.z>3.8?4.65:vP.z< -5.6?9.25:6.25;
    form*=1.-.20*fill(abs(vP.y-(spring-.055))-.0045,aa);
  }
  return uColor*form*mix(vec3(1.012,.996,.979),vec3(.989,1.001,1.018),cloud.r);
}
vec2 screenAt(vec3 p){
  vec4 c=uVP*vec4(p,1.);
  return .5+.5*c.xy/max(c.w,.001);
}
void resin(vec3 N,vec3 V,vec3 indirect,float visibility){
  float nv=max(.015,dot(N,V));
  vec3 refl=reflect(-V,N),trans=refract(-V,N,1./1.49);
  float depth=.188/max(.20,abs(dot(trans,N)));
  vec2 from=gl_FragCoord.xy/uPixels;
  vec2 offset=screenAt(vP+trans*depth)-screenAt(vP-V*depth);
  vec2 uv=clamp(from+offset*1.55,vec2(.001),vec2(.999));
  vec3 behind=texture(uBehind,uv).rgb;
  // Mild dispersion at the rapidly turning, polished lips.
  behind.r=texture(uBehind,clamp(uv+offset*.016,vec2(.001),vec2(.999))).r;
  behind.b=texture(uBehind,clamp(uv-offset*.014,vec2(.001),vec2(.999))).b;
  behind=pow(max(behind,vec3(.0001)),vec3(2.2));
  float fleck=texture(uVolume,vP*vec3(.13,.10,.15)).b;
  float path=(.28+.46*pow(1.-nv,1.6))*(.93+.14*fleck);
  vec3 absorption=exp(-vec3(3.95,.64,1.12)*path);
  vec3 scatter=vec3(.027,.245,.153)*(1.-absorption)*(.24+.92*lum(indirect));
  float fres=.039+.90*pow(1.-nv,5.);
  vec3 env=displayLinear(roomReflection(vP,refl,.075,lum(indirect))*1.23);
  vec3 color=mix(behind*absorption+scatter,env,fres);
  vec3 H=normalize(V+uSun);
  color+=vec3(1.,.91,.71)*visibility*pow(max(0.,dot(N,H)),460.)*.85;
  // Minute suspended air bubbles sit inside the cast, with refractive parallax.
  vec3 inner=vP+trans*depth*.52;
  vec2 s=vec2(inner.x*.921+inner.z*.39,inner.y)*15.5;
  vec2 cell=floor(s),xy=fract(s)-(.18+.64*vec2(hash21(cell+.28),hash21(cell+8.73)));
  float r=.023+.043*hash21(cell+18.2),d=length(xy),aa=max(.007,fwidth(s.y)*.55);
  float bubble=step(.87,hash21(cell+31.4))*fill(abs(d-r)-.014,aa)*(1.-smoothstep(.14,.46,aa));
  color+=bubble*(.13+.11*sat(xy.y/max(r,.001)))*vec3(.6,.92,.83);
  outColor=vec4(encode(color),1.);
}
void main(){
  vec3 N=normalize(vN),V=normalize(uEye-vP);
  if(uMat==20){
    float nv=abs(dot(N,V));
    float f=.045+.68*pow(1.-nv,5.);
    vec3 r=reflect(-V,N);
    float roof=vP.z>3.8?4.65:vP.z< -5.6?9.25:6.25;
    vec3 nightSide=roomReflection(vec3(vP.x,roof-.025,vP.z),r,.065,.40);
    float glassEdge=1.-smoothstep(.001,.009,min(min(vUV.x,vUV.y),min(1.-vUV.x,1.-vUV.y)));
    vec3 reflected=displayLinear(nightSide*vec3(.88,1.03,1.02));
    outColor=vec4(encode(reflected),min(.83,f+.082*glassEdge));return;
  }
  vec4 day=texture(uDay,vLight);
  vec3 indirect=day.rgb*day.rgb*4.;
  float vis=day.a;
  if(uMat==8){resin(N,V,indirect,vis);return;}
  vec2 uv;vec3 T,B;frame(N,uv,T,B);
  vec4 cloud=texture(uVolume,vP*.097+vec3(.07,.21,.33));
  vec4 fine=texture(uSurface,uv*.727+vec2(.19,.31));
  vec3 base=uColor;
  float rough=.73,metal=.0,relief=.27,alpha=1.;
  if(uMat==0 || uMat==1 || uMat==3){
    base=cement(uv,N,fine,cloud,uMat==1,uMat==3);
    rough=.78+(cloud.b-.5)*.12;relief=.47;
  }else if(uMat==2){
    vec2 p=vP.xz+vec2(.68,.41);
    float aa=max(.0005,max(fwidth(p.x),fwidth(p.y))*.50);
    float grout=max(sawLine(p.x,2.72,.0036,aa),sawLine(p.y,2.72,.0036,aa));
    float slabs=hash21(floor(p/2.72));
    vec4 agg=texture(uSurface,uv*1.21);
    base*=1.+(agg.a-.47)*.64+(fine.r-.55)*.18+(cloud.r-.5)*.25+(slabs-.5)*.045;
    base*=1.-grout*.48;
    rough=.43+.09*cloud.b+.18*grout;relief=.105;
  }else if(uMat==4){
    float bed=vP.y+.122*vP.x-.083*vP.z+.039*(cloud.b-.5);
    vec4 strata=texture(uVolume,vec3(vP.x*.032,bed*.66,vP.z*.049));
    float ribbon=texture(uVolume,vec3(vP.x*.047+.18,bed*1.74,vP.z*.055)).a;
    float vein=smoothstep(.61,.82,strata.b)*smoothstep(.3,.66,ribbon);
    base=mix(vec3(.71,.637,.481),vec3(.86,.793,.639),strata.r)*(.96+.08*cloud.b);
    base*=1.-.155*vein+.12*(ribbon-.5)+.25*(fine.r-.55);
    base-=vec3(.055,.044,.023)*smoothstep(.66,.87,fine.a);
    rough=.46+.12*strata.b;relief=.22;
  }else if(uMat==5 || uMat==6 || uMat==7){
    vec4 scale=texture(uVolume,vP*.39+vec3(.19,.12,.13));
    float run=texture(uVolume,vP*vec3(.58,.041,.58)).b;
    float patina=sat((cloud.r-.29)*2.7+.59*(scale.b-.50)+.25*(run-.5));
    if(uMat==5){
      base=mix(vec3(.139,.055,.027),vec3(.455,.147,.052),patina);
      base=mix(base,vec3(.117,.077,.055),smoothstep(.62,.78,scale.r)*.61);
      metal=.26;rough=.56+.10*(1.-patina);
    }else if(uMat==6){
      base=mix(vec3(.099,.065,.048),vec3(.346,.118,.052),patina*.88);
      rough=.48+.13*scale.r;metal=.38;
    }else{
      base=mix(vec3(.29,.222,.168),vec3(.52,.353,.22),patina);
      rough=.30+.13*scale.b;metal=.77;
    }
    base*=1.+.29*(fine.r-.55)+.26*(scale.g-.50);
    relief=.20;
  }else if(uMat==9 || uMat==18 || uMat==13 || uMat==19){
    float flake=texture(uSurface,uv*1.47).a;
    base*=1.+.32*(cloud.r-.5)+.45*(flake-.47)+.27*(fine.r-.55);
    rough=uMat==9?.45:uMat==18?.60:.79;relief=.20;
  }else if(uMat==10){
    bool alongX=vP.z< -18.;
    float along=alongX?vP.x+4.92:vP.z<0.?vP.z+14.08:vP.z-12.82;
    float across=alongX?vP.z+20.33:vP.z<0.?vP.x-7.46:vP.x+7.12;
    float plank=step(0.,across),grainY=vP.y-floorHeight(vP.z)-.432;
    float swing=texture(uVolume,vec3(along*.019,across*.16,.61+plank*.23)).b;
    float w=across+.09*swing+.018*sin(along*1.33);
    float rings=texture(uVolume,vec3(along*.018,w*1.68,.25)).b;
    float fiber=texture(uVolume,vec3(along*.033,w*5.7,.70)).g;
    float radial=length(vec2(across-.13+plank*.08+.025*sin(along*.85),grainY+.18-.09*plank));
    float growth=(radial+.012*swing)*113.;
    float latewood=(.5+.5*cos(growth*6.28318))*(1.-smoothstep(.16,.64,fwidth(growth)));
    base=mix(vec3(.32,.157,.068),vec3(.55,.326,.152),rings)*(.96+.13*fiber-.095*latewood);
    rough=.43+.12*rings;relief=.09;
  }else if(uMat==11 || uMat==17){
    base*=.95+.11*cloud.b+.14*(fine.r-.55);
    metal=uMat==11?.72:.49;rough=uMat==11?.31:.46;relief=.085;
  }else if(uMat==14){
    float reed=.5+.5*cos(vP.x*630.);
    vec3 glow=vec3(.69,.78,.77)*(.76+.24*reed);
    outColor=vec4(encode(displayLinear(glow+indirect*.14)),1.);return;
  }else if(uMat==15 || uMat==16){
    alpha=texture(uSign,vUV).r;
    if(alpha<.015)discard;
    relief=.0;rough=.83;
  }
  vec3 bump=T*(fine.g-.5)+B*(fine.b-.5);
  N=normalize(N+relief*(bump-N*dot(bump,N)));
  float NoL=max(0.,dot(N,uSun)),NoV=max(.012,dot(N,V));
  vec3 H=normalize(V+uSun);
  float NoH=max(0.,dot(N,H)),VoH=max(0.,dot(V,H));
  vec3 F0=mix(vec3(.036),base,metal);
  float a=rough*rough,a2=a*a,den=NoH*NoH*(a2-1.)+1.;
  float D=a2/(PI*den*den+.00001),k=(rough+1.)*(rough+1.)*.125;
  float G=NoV/(NoV*(1.-k)+k)*NoL/(NoL*(1.-k)+k);
  vec3 F=F0+(1.-F0)*pow(1.-VoH,5.);
  vec3 spec=D*G*F/max(.001,4.*NoL*NoV);
  vec3 result=base*(1.-metal*.74)*(indirect+SUN*vis*NoL)+PI*spec*SUN*vis*NoL;
  if(rough<.69){
    vec3 R=reflect(-V,N);
    vec3 env=roomReflection(vP,R,rough,lum(indirect));
    vec3 fres=F0+(max(vec3(1.-rough),F0)-F0)*pow(1.-NoV,5.);
    result+=env*fres*(1.-rough*.44);
  }else{result+=.012*indirect;}
  // A very light aerial lift connects the two volumes at longer sightlines.
  result=mix(result,vec3(.40,.405,.397),.016*smoothstep(11.,42.,length(vP-uEye)));
  outColor=vec4(encode(displayLinear(result)),alpha);
}`;

export const skyVertex=`#version 300 es
precision highp float;
out vec2 vScreen;
void main(){
  vec2 xy=vec2((gl_VertexID==1)?3.:-1.,(gl_VertexID==2)?3.:-1.);
  vScreen=xy;gl_Position=vec4(xy,1.,1.);
}`;
export const skyFragment=`#version 300 es
precision highp float;
precision highp sampler3D;
in vec2 vScreen;
out vec4 outColor;
uniform vec3 uForward,uRight,uUp,uSun;
uniform vec2 uSpread;
uniform sampler3D uVolume;
void main(){
  vec3 d=normalize(uForward+uRight*vScreen.x*uSpread.x+uUp*vScreen.y*uSpread.y);
  float h=max(0.,d.y),glow=max(0.,dot(d,uSun));
  vec3 c=mix(vec3(.841,.867,.866),vec3(.460,.642,.767),pow(h,.58));
  float cirrus=texture(uVolume,vec3(d.x*.81,d.z*2.7,d.y*.53)).b;
  c=mix(c,vec3(.89,.89,.85),smoothstep(.49,.81,cirrus)*.115);
  c+=vec3(.17,.135,.086)*pow(glow,22.)+vec3(.34,.28,.21)*smoothstep(.99991,.999986,glow);
  outColor=vec4(c,1.);
}`;

#version 300 es
precision highp float;
precision highp int;
precision highp sampler2DArray;
uniform sampler2DArray uSurfaces;
uniform sampler2D uArt;
uniform vec3 uEye;
uniform vec2 uScreen;
uniform float uTime;
uniform bool uReef;
in vec3 vWorld;
in vec3 vNormal;
in vec2 vUV;
in vec3 vColor;
in vec3 vLight;
in vec4 vKey;
flat in int vMaterial;
in float vDetail;
out vec4 fragment;
const vec3 ONE=vec3(1.0);
float sat(float x){return clamp(x,0.,1.);}
vec3 safeNorm(vec3 x){return x*inversesqrt(max(dot(x,x),1.e-9));}
vec3 finishColor(vec3 c){
  c=max(vec3(0.),c);
  c=c/(ONE+.31*c);
  vec2 q=gl_FragCoord.xy/uScreen*2.-1.;
  c*=1.-.036*min(dot(q,q),1.7);
  // Stationary sub-code-value dither keeps the deep-water gradients smooth.
  float dith=fract(52.9829189*fract(dot(gl_FragCoord.xy,vec2(.06711056,.00583715))))-.5;
  return pow(clamp(c,0.,1.),vec3(1./2.2))+dith/520.;
}
vec3 seawater(vec3 pos){
  float h=smoothstep(-4.0,10.0,pos.y);
  float sky=.5+.5*sin(pos.x*.52+pos.y*.38+.33*sin(pos.x*1.17+pos.y*.66));
  float shaft=pow(sky,5.)*(.3+.7*h);
  return mix(vec3(.0035,.0165,.023),vec3(.025,.096,.109),h)+shaft*vec3(.0016,.008,.008);
}
float lampReflection(vec3 p,vec3 ray,vec3 source,vec3 axis,vec3 halfSize){
  float denom=dot(axis,ray);
  if(abs(denom)<.001)return 0.;
  float t=dot(source-p,axis)/denom;
  if(t<=0.)return 0.;
  vec3 q=abs(p+t*ray-source);
  // A small, soft reflection of a real fixture on its mounting plane.
  vec3 test=max(q-halfSize,vec3(0.));
  return exp(-dot(test,test)*135.);
}
void main(){
  int m=vMaterial;
  vec3 V=safeNorm(uEye-vWorld);
  vec3 N=safeNorm(vNormal);
  if(m==13){fragment=vec4(finishColor(seawater(vWorld)),1.);return;}
  if(m==11||m==17){
    if(!gl_FrontFacing)N=-N;
    float f=pow(1.-abs(dot(N,V)),3.);
    vec3 ray=reflect(-V,N);
    vec3 reflected=mix(vec3(.065,.11,.10),vec3(.33,.39,.31),sat(ray.y*.57+.48));
    float glint=lampReflection(vWorld,ray,vec3(-3.01,1.70,-6.46),vec3(1,0,0),vec3(.01,.15,.084));
    glint+=lampReflection(vWorld,ray,vec3(3.01,1.75,-5.58),vec3(1,0,0),vec3(.01,.15,.084));
    if(m==17){
      glint+=lampReflection(vWorld,ray,vec3(-.72,2.8,2.47),vec3(0,1,0),vec3(.65,.01,.063));
      reflected+=vec3(.22,.29,.23)*pow(sat(dot(ray,normalize(vec3(-.3,.7,.45)))),9.);
    }
    reflected+=vec3(1.30,.88,.45)*min(1.2,glint);
    float alpha=m==11?.046+.24*f+.21*min(1.,glint):.120+.51*f+.20*min(1.,glint);
    fragment=vec4(finishColor(reflected),alpha);return;
  }
  if(m==8){
    float facing=.84+.16*abs(dot(N,V));
    fragment=vec4(finishColor(vColor*1.85*facing),1.);return;
  }
  float freq=2.0;
  if(m==3||m==19)freq=4.5;
  if(m==15)freq=2.7;
  if(m==4)freq=1.51;
  if(m==9)freq=1.12;
  if(m==1||m==16)freq=3.1;
  vec2 uv=vUV*freq;
  if(m==4)uv*=vec2(.44,1.23);
  vec4 sm=texture(uSurfaces,vec3(uv,float(m)));
  vec3 base=vColor*(.655+.68*sm.r);
  float rough=sm.a;
  if(m==12){
    int id=int(vDetail*255.+.5);
    vec2 cell=vec2(float(id%8),float(id/8));
    vec2 localUV=(clamp(vUV,0.,1.)*504.+4.)/512.;
    vec2 atlasUV=(cell+localUV)/vec2(8.,4.);
    vec4 ink=texture(uArt,atlasUV);
    if(ink.a<.44)discard;
    base=pow(ink.rgb,vec3(2.2))*vColor;
  }
  if(m==0){
    float grime=texture(uSurfaces,vec3(vWorld.xz*.39+vec2(vWorld.y*.07,0.),9.)).r;
    base*=.963+.066*grime;
    float brokenEdge=vDetail*smoothstep(.52,.70,grime)*.37;
    base=mix(base,vec3(.30,.322,.265),brokenEdge);
  }
  // Derivative tangent frame follows each face's actual texture coordinates.
  vec3 dp1=dFdx(vWorld),dp2=dFdy(vWorld);
  vec2 du1=dFdx(uv),du2=dFdy(uv);
  vec3 p2=cross(dp2,N),p1=cross(N,dp1);
  vec3 T=p2*du1.x+p1*du2.x,B=p2*du1.y+p1*du2.y;
  float inv=inversesqrt(max(max(dot(T,T),dot(B,B)),1.e-12));
  vec2 slope=sm.gb*2.-1.;
  vec3 bump=safeNorm(N+(T*slope.x+B*slope.y)*inv);
  vec3 L=safeNorm(vKey.xyz),H=safeNorm(L+V);
  float lightMod=clamp(1.+.67*(dot(bump,L)-dot(N,L)),.82,1.18);
  vec3 col=base*vLight*lightMod;
  float metal=(m==1||m==16)?1.:0.;
  float fres=pow(1.-sat(dot(V,bump)),4.);
  float highlight=pow(max(dot(bump,H),0.),mix(118.,9.,rough*rough));
  float coat=(m==4?.19:m==6?.49:m==18?.80:m==0?.34:.14);
  coat=mix(coat,.83,metal);
  vec3 keyColor=clamp(vLight/(max(max(vLight.r,vLight.g),vLight.b)+.0001),.22,1.);
  col+=keyColor*highlight*min(1.6,vKey.w)*coat*(.10+.47*(1.-rough)+.43*fres);
  vec3 refl=reflect(-V,bump);
  float sky=sat(.54+.46*refl.y);
  vec3 env=mix(vec3(.038,.047,.040),vec3(.186,.208,.170),sky);
  env+=vec3(.015,.062,.071)*max(0.,-refl.z)*smoothstep(2.,8.,-vWorld.z);
  col+=env*(.018+.14*fres+metal*.39)*(1.-rough*.62);
  if(uReef){
    float fog=1.-exp(-.064*max(0.,-vWorld.z-8.5));
    col=mix(col*vec3(.67,.93,1.),seawater(vWorld),fog*.90);
  }
  fragment=vec4(finishColor(col),1.);
}


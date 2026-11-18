export const roomVertex = `#version 300 es
precision highp float;
layout(location=0) in vec3 aPosition;
layout(location=1) in vec2 aUV;
layout(location=2) in vec3 aNormal;
layout(location=3) in float aKind;
layout(location=4) in vec3 aColor;
layout(location=5) in vec3 aIrradiance;
layout(location=6) in float aAO;
uniform mat4 camera;
out vec3 P;
out vec3 N;
out vec2 uv;
out vec3 base;
out vec3 irradiance;
out float occlusion;
flat out int kind;
void main(){
 P=aPosition/4096.0;
 N=aNormal;
 kind=int(aKind+.5);
 uv=kind==12?aUV/65535.0:(aUV-32768.0)/2048.0;
 base=aColor; irradiance=aIrradiance*aIrradiance*6.0;occlusion=aAO;
 gl_Position=camera*vec4(P,1.);
}`;

export const roomFragment = `#version 300 es
precision highp float;
precision highp sampler2DArray;
in vec3 P;
in vec3 N;
in vec2 uv;
in vec3 base;
in vec3 irradiance;
in float occlusion;
flat in int kind;
uniform sampler2DArray surfaces;
uniform sampler2D prints;
uniform vec3 eye;
out vec4 frag;
const float freq[12]=float[12](2.9,3.7,1.72,8.5,5.4,4.7,3.6,3.2,4.0,2.5,4.3,1.);
const float rough[12]=float[12](.55,.32,.54,.96,.93,.69,.78,.25,.93,.56,.30,.5);
vec3 film(vec3 c){c=max(c,vec3(0));return pow(clamp((c*(2.51*c+.03))/(c*(2.43*c+.59)+.14),0.,1.),vec3(.45455));}
vec3 specLamp(vec3 pos,vec3 color,vec3 norm,vec3 view,float sharp){
 vec3 l=pos-P;float dist=max(dot(l,l),.0001);l*=inversesqrt(dist);
 vec3 h=normalize(l+view);float response=pow(max(dot(h,norm),.0001),sharp);
 return color*(response*max(.06,dot(l,norm)))/(1.+dist*.57);
}
void main(){
 if(kind==11){frag=vec4(mix(base,vec3(1.),.23),1.);return;}
 vec3 macroN=normalize(N);if(!gl_FrontFacing)macroN=-macroN;
 vec3 n=macroN,v=normalize(eye-P);
 int layer=clamp(kind,0,11);
 vec2 st=uv*freq[layer];
 vec4 grain=texture(surfaces,vec3(st,float(layer)));
 // A tangent basis derived from the authored surface coordinates retains the
 // direction of mill marks and weave around folded cloth and bevels.
 vec3 px=dFdx(P),py=dFdy(P);
 vec2 tx=dFdx(st),ty=dFdy(st);
 vec3 perpx=cross(py,n),perpy=cross(n,px);
 vec3 t=perpx*tx.x+perpy*ty.x,b=perpx*tx.y+perpy*ty.y;
 float invLen=inversesqrt(max(max(dot(t,t),dot(b,b)),1e-11));
 vec2 bump=(grain.gb-.50196)*2.;
 if(kind!=12)n=normalize(n+(t*bump.x+b*bump.y)*invLen*.67);
 vec3 pigment=base*(.75+.5*grain.r);
 if(kind==3||kind==4)pigment=base*(.54+.92*grain.r);
 if(kind==2)pigment*=vec3(.89+.22*grain.r,.81+.38*grain.r,.75+.50*grain.r);
 if(kind==12)pigment=texture(prints,uv).rgb;
 vec3 albedo=pow(max(pigment,vec3(.001)),vec3(2.20));
 float metal=kind==1?.73:kind==10?.68:0.;
 float r=kind==12?.90:clamp(rough[layer]-(grain.a-.5)*.07,.18,.97);
 vec3 lit=albedo*irradiance*(1.-metal*.32);
 lit*=clamp(1.+dot(n-macroN,vec3(-.39,.77,-.50))*.48,.84,1.16);
 float ndv=clamp(dot(n,v),.001,1.),fresnel=pow(1.-ndv,5.);
 vec3 refl=reflect(-v,n);
 vec3 environment=mix(vec3(.051,.059,.057),vec3(.23,.24,.22),refl.y*.5+.5);
 // Soft, spatially anchored reflection of the observing port.
 float d=(-6.62-P.z)/min(-.001,refl.z);
 vec2 win=P.xy+refl.xy*d-vec2(0.,1.60);
 vec2 over=max(abs(win)-vec2(2.34,.76),vec2(0.));
 float port=refl.z<-.01&&d>0.?exp(-dot(over,over)/(r*r*2.4+.038)):0.;
 environment+=vec3(.35,.59,.83)*port;
 float highlight=(1.-r)*(1.-r);
 vec3 reflection=mix(vec3(.038),albedo,metal);
 reflection+=((1.-reflection)*fresnel)*(.58-.27*r);
 lit+=environment*reflection*(.45+.55*occlusion);
 if(r<.84){
  float sharp=mix(13.,146.,highlight);
  vec3 spec=specLamp(vec3(-2.65,1.95,2.68),vec3(1.3,.82,.44),n,v,sharp)
            +specLamp(vec3(2.76,1.59,-1.87),vec3(.92,.76,.53),n,v,sharp)
            +specLamp(vec3(.40,2.70,.13),vec3(.95,.90,.76),n,v,sharp)
            +specLamp(vec3(.0,2.20,-6.55),vec3(.64,.90,1.25),n,v,sharp);
  lit+=reflection*spec*(1.+highlight*7.)*(.4+.6*occlusion);
 }
 if(kind==3||kind==4){lit+=albedo*(.075+.12*fresnel)*occlusion;}
 frag=vec4(film(lit*1.08),1.);
}`;

export const skyVertex=`#version 300 es
precision highp float;
out vec2 ndc;
void main(){ndc=vec2(gl_VertexID==1?3.:-1.,gl_VertexID==2?3.:-1.);gl_Position=vec4(ndc,1.,1.);}`;

export const skyFragment=`#version 300 es
precision highp float;
in vec2 ndc;
uniform vec3 forwardDir,rightDir,upDir;
uniform vec2 lens;
uniform sampler2D firmament,atmosphere;
out vec4 frag;
const float PI=3.14159265359;
vec2 spherical(vec3 p){return vec2(atan(p.z,p.x)/(2.*PI)+.5,.5-asin(clamp(p.y,-1.,1.))/PI);}
void main(){
 vec3 ray=normalize(forwardDir+rightDir*ndc.x*lens.x+upDir*ndc.y*lens.y);
 vec3 col=texture(firmament,spherical(ray)).rgb;
 vec3 center=normalize(vec3(.123,-.131,-1.))*6.;
 const float radius=1.235;
 vec3 sun=normalize(vec3(-.76,.47,.43));
 float b=dot(ray,center);
 float closest=sqrt(max(0.,dot(center,center)-b*b));
 float altitude=closest-radius;
 float litSide=clamp(dot(normalize(ray*b-center+vec3(.00001)),sun)*.70+.55,0.,1.);
 if(b>0.)col+=vec3(.13,.29,.38)*exp(-max(altitude,0.)*68.)*litSide;
 float planetDistance=1e4;
 vec3 pole=normalize(vec3(-.195,.942,.276));
 if(altitude<0.&&b>0.){
  planetDistance=b-sqrt(max(0.,radius*radius-closest*closest));
  vec3 hit=ray*planetDistance,n=normalize(hit-center);
  vec3 east=normalize(cross(pole,vec3(0.,0.,1.))),north=pole,front=cross(east,north);
  vec3 p=vec3(dot(n,east),dot(n,north),dot(n,front));
  vec3 cloud=texture(atmosphere,spherical(p)).rgb;
  float cosine=dot(n,sun),light=.048+.95*pow(max(0.,cosine),.67);
  float viewCos=max(dot(n,-ray),0.);
  vec3 night=vec3(.023,.045,.064);
  col=night+cloud*light;
  float ringShadowT=-dot(hit-center,pole)/dot(sun,pole);
  vec3 shadowPos=hit+sun*ringShadowT-center;
  float ringShadow=smoothstep(1.44,1.57,length(shadowPos))*(1.-smoothstep(1.83,1.94,length(shadowPos)));
  if(ringShadowT>0.)col*=1.-.16*ringShadow;
  float rim=pow(1.-viewCos,3.8)*(.20+.80*smoothstep(-.32,.82,cosine));
  col=mix(col,vec3(.49,.76,.86),rim*.75);
 }
 float den=dot(ray,pole);
 if(abs(den)>.001){
  float t=dot(center,pole)/den;
  if(t>0.&&t<planetDistance){
   vec3 p=ray*t-center;float r=length(p);
   float band=smoothstep(1.445,1.517,r)*(1.-smoothstep(1.905,1.947,r));
   if(band>.001){
    float gap=(r-1.769)/.010;
    float div=1.-.86*exp(-gap*gap);
    float threads=.63+.18*cos(r*116.)+.075*cos(r*324.)+.062*cos(r*549.);
    float proj=dot(p,sun);float sh=proj<0.?smoothstep(radius-.05,radius+.05,length(p-sun*proj)):1.;
    vec3 dust=mix(vec3(.13,.18,.20),vec3(.71,.72,.64),sh);
    col=mix(col,dust,band*threads*div*.71);
   }
  }
 }
 frag=vec4(col,1.);
}`;

export const glassFragment=`#version 300 es
precision highp float;
in vec3 P;
uniform vec3 eye;
out vec4 frag;
void main(){
 vec3 incident=normalize(P-eye),r=reflect(incident,vec3(0,0,1));
 float grazing=pow(1.-abs(incident.z),3.);
 float t=(2.76-P.y)/max(r.y,.001);vec2 p=P.xz+r.xz*t;
 float ceiling=smoothstep(.04,.24,r.y);
 float offset=(abs(p.x)-.50)/.075;
 float rail=exp(-offset*offset);
 float segment=.5+.5*cos((p.y+.32)*1.83);
 float glint=rail*pow(segment,5.)*ceiling;
 vec3 tint=mix(vec3(.33,.50,.55),vec3(.94,.80,.61),glint);
 frag=vec4(tint,.022+.106*grazing+.093*glint);
}`;

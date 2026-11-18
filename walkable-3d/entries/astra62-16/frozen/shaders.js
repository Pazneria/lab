'use strict';
const shadowVertex=`#version 300 es
precision highp float;
layout(location=0) in vec3 aPosition;
layout(location=4) in float aMaterial;
uniform mat4 uMatrix;
void main(){gl_Position=aMaterial==8.0?vec4(8.0,8.0,8.0,1.0):uMatrix*vec4(aPosition/1024.0,1.0);}`;
const shadowFragment=`#version 300 es
precision mediump float;
void main(){}`;
const sceneVertex=`#version 300 es
precision highp float;
layout(location=0) in vec3 aPosition;
layout(location=1) in vec3 aNormal;
layout(location=2) in vec2 aUV;
layout(location=3) in vec3 aColor;
layout(location=4) in float aMaterial;
uniform mat4 uMatrix;
out vec3 vWorld;
out vec3 vNormal;
out vec3 vColor;
out vec2 vUV;
flat out int vMaterial;
void main(){vWorld=aPosition/1024.0;vNormal=aNormal;vColor=aColor;vUV=aUV;vMaterial=int(aMaterial+.1);gl_Position=uMatrix*vec4(vWorld,1.0);}`;
const skyVertex=`#version 300 es
precision highp float;
out vec2 vScreen;
void main(){vec2 p=vec2((gl_VertexID<<1)&2,gl_VertexID&2);vScreen=p*2.0-1.0;gl_Position=vec4(vScreen,1.0,1.0);}`;
const skyColor=`
vec3 sky(vec3 r){
 float u=clamp(r.y*.9+.1,0.,1.);
 float clouds=.5+.25*sin(r.x*10.+r.z*8.+r.y*13.)+.13*sin(r.z*23.-r.x*14.)+.08*cos(r.z*47.+r.y*29.);
 vec3 col=mix(vec3(.805,.834,.795),vec3(.56,.68,.72),pow(u,.6));
 return col+(.08*clouds-.035)*(1.-u*.42);
}`;
const skyFragment=`#version 300 es
precision highp float;
in vec2 vScreen;out vec4 outColor;
uniform vec3 uForward,uRight,uUp;
uniform vec2 uFov;
`+skyColor+`
void main(){vec3 ray=normalize(uForward+vScreen.x*uFov.x*uRight+vScreen.y*uFov.y*uUp);outColor=vec4(sky(ray),1.);}`;
const inputDecl=`
precision highp float;
precision highp int;
precision highp sampler2DArray;
precision highp sampler3D;
precision highp sampler2DShadow;
precision highp samplerCubeShadow;
in vec3 vWorld,vNormal,vColor;
in vec2 vUV;
flat in int vMaterial;
out vec4 outColor;
uniform vec3 uEye;
uniform sampler2DArray uSurfaces;
`;
const surfaceFragment=`#version 300 es
`+inputDecl+`
uniform highp sampler2D uAtlas;
uniform highp sampler3D uVolume;
uniform highp sampler2DShadow uSun;
uniform highp samplerCubeShadow uLamp;
uniform mat4 uSunMatrix;
uniform vec3 uVolumeMin,uVolumeSize;
const vec3 SUN=vec3(.61509,.69766,-.36779);
const vec3 LAMP=vec3(.29,2.314,2.56);
float sat(float a){return clamp(a,0.,1.);}
vec3 safeUnit(vec3 v){return v*inversesqrt(max(dot(v,v),1e-16));}
float sunVisibility(vec3 n){
 vec4 v=uSunMatrix*vec4(vWorld+n*.012,1.);
 vec3 q=v.xyz/v.w*.5+.5;
 if(any(lessThan(q,vec3(.001)))||any(greaterThan(q,vec3(.999))))return 1.;
 q.z-=.00026;vec2 s=vec2(.00095,.00061);
 return .25*(texture(uSun,vec3(q.xy+s,q.z))+texture(uSun,vec3(q.xy-s,q.z))+texture(uSun,vec3(q.xy+vec2(-s.y,s.x),q.z))+texture(uSun,vec3(q.xy+vec2(s.y,-s.x),q.z)));
}
float lampVisibility(vec3 n){
 vec3 d=vWorld+n*.023-LAMP;
 float m=max(max(abs(d.x),abs(d.y)),abs(d.z));
 if(m<.22||m>11.9)return 1.;
 float depth=12./(12.-.19)-12.*.19/((12.-.19)*m)-.0008;
 return texture(uLamp,vec4(d,depth));
}
float ambientSpace(vec3 n){
 vec3 q=(vWorld-uVolumeMin)/uVolumeSize;
 if(any(lessThan(q,vec3(0)))||any(greaterThan(q,vec3(1))))return 1.;
 vec3 stepN=n/uVolumeSize;
 float nearV=texture(uVolume,q+stepN*.090).r;
 float midV=texture(uVolume,q+stepN*.16).g;
 float farV=texture(uVolume,q+stepN*.27).b;
 return clamp(1.09-.49*nearV-.48*midV-.52*farV,.33,1.);
}
vec3 area(vec3 p,vec3 energy,float radius,vec3 n){
 vec3 v=p-vWorld;float d=dot(v,v);
 return energy*(.13+.87*sat(dot(n,safeUnit(v))))/(radius+d);
}
float gleam(vec3 lightPos,float exponent,vec3 n,vec3 view){
 vec3 delta=lightPos-vWorld;float d=dot(delta,delta);
 return pow(sat(dot(n,safeUnit(safeUnit(delta)+view))),exponent)/(1.+d*.33);
}
vec2 texCoords(int m){
 if(m==1)return vUV*vec2(.69,2.02);
 if(m==2)return vUV*1.42;
 if(m==3)return vUV*.80;
 if(m==4)return vUV*vec2(1.70,3.15);
 if(m==5)return vUV*vec2(2.71,2.42);
 if(m==7)return vUV*3.47;
 if(m==11)return vUV*5.2;
 if(m==12)return vUV*2.8;
 return vUV;
}
float halation(vec3 pos,float rad,vec3 view,float dist){
 vec3 toSource=pos-uEye;float t=dot(toSource,-view);
 vec3 off=toSource+view*t;
 return exp(-dot(off,off)/(rad*rad))*smoothstep(.0,.3,t)*smoothstep(-.035,.12,dist-t);
}
void main(){
 vec3 eyeDelta=uEye-vWorld;float dist=length(eyeDelta);vec3 view=eyeDelta/max(dist,.0001);
 vec3 n=safeUnit(vNormal);if(dot(n,view)<0.)n=-n;
 vec3 geom=n;int m=vMaterial;vec2 uv=texCoords(m);
 vec3 tex=texture(uSurfaces,vec3(uv,float(m))).rgb;
 vec3 albedo=m==10?texture(uAtlas,vUV).rgb:vColor;
 if(m!=8&&m!=10)albedo*=.75+.48*tex.r;
 vec2 s1=dFdx(uv),s2=dFdy(uv);
 vec3 q1=dFdx(vWorld),q2=dFdy(vWorld);
 vec3 tvec=q1*s2.y-q2*s1.y,bvec=q2*s1.x-q1*s2.x;
 float hand=sign(s1.x*s2.y-s1.y*s2.x);
 if(m!=8&&m!=10){n=safeUnit(n+(safeUnit(tvec)*(tex.g*2.-1.)+safeUnit(bvec)*(tex.b*2.-1.))*hand*.49);}
 float ao=ambientSpace(geom);
 float greenery=smoothstep(3.02,4.55,vWorld.x);
 vec3 hemi=mix(vec3(.41,.32,.232),vec3(.613,.656,.660),n.y*.5+.5);
 vec3 irradiance=hemi*(.84+.21*greenery)*ao;
 float sun=sunVisibility(geom);
 irradiance+=vec3(.52,.56,.52)*(.18+.82*sat(dot(n,SUN)))*sun;
 // Long glazed wall, recessed casements and small practical light sources.
 vec3 glazed=vec3(4.65,2.11,clamp(vWorld.z,-4.30,2.73));
 irradiance+=area(glazed,vec3(1.54,1.85,1.88),3.2,n)*(.43+.57*ao);
 irradiance+=area(vec3(-3.63,1.97,3.41),vec3(1.37,1.65,1.69),1.85,n)*ao;
 irradiance+=area(vec3(-1.34,2.03,-4.69),vec3(1.30,1.59,1.69),1.65,n)*ao;
 irradiance+=area(vec3(2.35,1.84,5.58),vec3(.71,.90,.96),1.80,n)*ao;
 float warmth=lampVisibility(geom);
 irradiance+=area(LAMP,vec3(4.20,2.61,1.24),1.08,n)*(.25+.75*warmth);
 irradiance+=area(vec3(-2.90,.63,1.19),vec3(3.65,1.51,.52),.80,n)*(.52+.48*ao);
 irradiance+=area(vec3(2.552,1.45,-4.36),vec3(2.36,1.47,.68),.79,n)*(.51+.49*ao);
 irradiance+=area(vec3(-.29,1.38,-4.04),vec3(.105,.34,.245),.23,n);
 vec3 lin=pow(max(albedo,vec3(.0001)),vec3(2.2))*irradiance;
 float spec=m==4?.64:m==5?.28:m==6?.095:m==1?.055:.023;
 float gloss=m==4?49.:m==5?67.:m==6?30.:20.;
 float skySpec=pow(sat(dot(reflect(-view,n),normalize(vec3(.48,.47,-.74)))),gloss*.23);
 vec3 specular=vec3(.85,.92,.9)*skySpec*(.091+.13*greenery);
 specular+=vec3(1.,.72,.39)*gleam(LAMP,gloss,n,view)*.88*warmth;
 specular+=vec3(.89,.96,1.)*gleam(vec3(-1.34,2.14,-4.67),gloss*.30,n,view)*.78;
 specular+=vec3(.86,.96,.99)*gleam(glazed,gloss*.27,n,view)*.68;
 if(m==4)specular*=mix(vec3(1.),albedo,.59);
 lin+=spec*specular*(.53+.47*ao);
 if(m==8){lin=pow(albedo,vec3(1.45))*1.40+lin*.22;}
 vec3 mapped=pow(max(vec3(0),lin/(.91+lin*.34)),vec3(1./2.2));
 float outside=max(max(-3.83-vWorld.x,vWorld.x-6.36),max(-4.91-vWorld.z,vWorld.z-5.81));
 float fog=clamp(outside*.051,0.,.76);
 mapped=mix(mapped,vec3(.76,.80,.756),fog);
 mapped+=vec3(.124,.065,.019)*halation(LAMP,.19,view,dist);
 mapped+=vec3(.088,.060,.022)*halation(vec3(2.552,1.45,-4.365),.157,view,dist);
 mapped+=vec3(.019,.051,.035)*halation(vec3(-.292,1.39,-4.060),.126,view,dist);
 outColor=vec4(clamp(mapped,0.,1.),1.);
}`;
const glassFragment=`#version 300 es
`+inputDecl+skyColor+`
void main(){
 vec3 n=normalize(vNormal),view=normalize(uEye-vWorld);if(dot(n,view)<0.)n=-n;
 vec3 rip=texture(uSurfaces,vec3(vWorld.xz*.46+vWorld.zy*.46,9.)).rgb;
 n=normalize(n+vec3(rip.g-.5,0.,rip.b-.5)*.17);
 float fr=pow(1.-clamp(dot(n,view),0.,1.),3.);
 vec3 ref=reflect(-view,n);
 float windowSpec=pow(max(dot(ref,normalize(vec3(.75,.37,-.55))),0.),18.);
 float glint=pow(max(dot(ref,normalize(vec3(-.34,.48,.81))),0.),47.);
 vec3 l=vec3(.29,2.314,2.56)-vWorld;
 float hot=pow(max(dot(n,normalize(view+normalize(l))),0.),87.)/(1.+.20*dot(l,l));
 vec3 col=mix(vColor*vec3(.87,.94,.93),sky(ref),.42+.44*fr);
 col+=windowSpec*.20+glint*.15+vec3(.9,.62,.29)*hot;
 float alpha=.055+.32*fr+.115*windowSpec+.13*glint+.54*hot;
 if(vMaterial==13){alpha=.43+.27*fr;col=mix(col,vec3(.32,.44,.38),.44);}
 outColor=vec4(min(col,vec3(1.)),min(alpha,.84));
}`;

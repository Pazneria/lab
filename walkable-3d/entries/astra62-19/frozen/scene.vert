#version 300 es
precision highp float;
layout(location=0) in vec3 aPosition;
layout(location=1) in vec3 aNormal;
layout(location=2) in vec2 aUV;
layout(location=3) in vec4 aColorMaterial;
layout(location=4) in vec4 aLightDetail;
layout(location=5) in vec3 aDominant;
layout(location=6) in float aGlossLight;
uniform mat4 uViewProjection;
uniform float uTime;
out vec3 vWorld;
out vec3 vNormal;
out vec2 vUV;
out vec3 vColor;
out vec3 vLight;
out vec4 vKey;
flat out int vMaterial;
out float vDetail;
void main(){
  vMaterial=int(aColorMaterial.w*255.0+.5);
  vec3 p=aPosition;
  if(vMaterial==14){
    p.x+=.12*sin(uTime*.18+p.z*1.7+p.y*.31);
    p.y+=.023*sin(uTime*.34+p.z*1.21+p.x*.48);
  }
  vWorld=p;
  vNormal=aNormal;
  vUV=aUV;
  vColor=pow(aColorMaterial.rgb,vec3(2.2));
  vLight=4.0*aLightDetail.rgb*aLightDetail.rgb;
  vDetail=aLightDetail.w;
  vKey=vec4(aDominant,2.5*aGlossLight*aGlossLight);
  gl_Position=uViewProjection*vec4(p,1.);
}


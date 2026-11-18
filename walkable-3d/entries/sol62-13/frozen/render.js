import { Mesh, MAT, add, sub, mul, dot, cross, norm, clamp } from './geometry.js'

const FOV = 64 * Math.PI / 180
const SHADOW_SIZE = 1536
const MAX_LIGHTS = 8
const SUN = norm([.49,.78,-.386])

const fullscreen = /* glsl */`#version 300 es
out vec2 vScreen;
void main() {
  vec2 p = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2);
  vScreen = p * 2.0 - 1.0;
  gl_Position = vec4(vScreen, 0.0, 1.0);
}
`

const common = /* glsl */`
float hash21(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * .1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}
float noise21(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f*f*(3.0-2.0*f);
  return mix(mix(hash21(i),hash21(i+vec2(1,0)),u.x),
             mix(hash21(i+vec2(0,1)),hash21(i+vec2(1,1)),u.x),u.y);
}
vec3 srgb(vec3 c) {
  c = max(c,0.0);
  return mix(12.92*c,1.055*pow(c,vec3(.416667))-.055,step(vec3(.0031308),c));
}
vec3 tonemap(vec3 c) {
  return c / (1.0 + c*.33);
}
vec3 hazeTint(vec3 ray) {
  float b = smoothstep(-.36,.28,ray.y);
  vec3 cold = mix(vec3(.191,.272,.299),vec3(.32,.399,.411),b);
  return mix(cold, vec3(.238,.319,.350), smoothstep(.10,.80,ray.y));
}
float hazeAmount(vec3 point, float dist) {
  float bulk = 1.0-exp(-pow(max(0.0,dist-11.0)/233.0,1.09));
  float low = exp(-max(0.0,point.y+21.0)*.052) *
      smoothstep(15.0,119.0,dist) * .21;
  return min(.965,bulk+low);
}
`

const skyFragment = /* glsl */`#version 300 es
precision highp float;
in vec2 vScreen;
uniform vec3 uForward;
uniform vec3 uRight;
uniform vec3 uUp;
uniform vec2 uScale;
out vec4 pixel;
${common}
void main(){
  vec3 ray = normalize(uForward + uRight * vScreen.x * uScale.x + uUp * vScreen.y * uScale.y);
  vec3 background = hazeTint(ray);
  vec2 horizon = vec2(ray.x,ray.z)/(max(ray.y,0.0)+.25);
  float clouds = noise21(horizon*.78 + vec2(3.75,.29))*.59
               + noise21(horizon*1.70+3.79)*.27
               + noise21(horizon*3.80+8.82)*.14;
  float veil = smoothstep(.32,.76,clouds) * smoothstep(-.15,.45,ray.y);
  float clearing = pow(max(0.0,dot(ray,normalize(vec3(.63,.48,-.69)))),12.0);
  background *= (1.06-veil*.42);
  background += vec3(.085,.083,.068)*clearing;
  pixel = vec4(srgb(tonemap(background)),1.0);
}
`

const surfaceVertex = /* glsl */`#version 300 es
precision highp float;
precision highp int;
layout(location=0) in vec3 aPosition;
layout(location=1) in vec3 aNormal;
layout(location=2) in vec3 aTint;
layout(location=3) in vec2 aUV;
layout(location=4) in float aMaterial;
layout(location=5) in float aDetail;
uniform mat4 uCamera;
out vec3 vPosition;
out vec3 vNormal;
out vec3 vTint;
out vec2 vUV;
flat out int vMaterial;
out float vDetail;
void main(){
  vPosition = aPosition;
  vNormal = aNormal;
  vTint = aTint;
  vUV = aUV;
  vMaterial = int(aMaterial+.5);
  vDetail = aDetail;
  gl_Position = uCamera * vec4(aPosition,1.0);
}
`

const shadowVertex = /* glsl */`#version 300 es
layout(location=0) in vec3 aPosition;
uniform mat4 uLightMatrix;
void main(){
  gl_Position = uLightMatrix * vec4(aPosition,1.0);
}
`

const shadowFragment = /* glsl */`#version 300 es
precision mediump float;
layout(location=0) out vec4 pixel;
void main() { pixel=vec4(1.0); }
`

const surfaceFragment = /* glsl */`#version 300 es
precision highp float;
precision highp int;
in vec3 vPosition;
in vec3 vNormal;
in vec3 vTint;
in vec2 vUV;
flat in int vMaterial;
in float vDetail;
uniform vec3 uEye;
uniform vec3 uSun;
uniform vec4 uLights[${MAX_LIGHTS}];
uniform mat4 uLightMatrix;
uniform sampler2D uShadow;
uniform float uHasShadow;
out vec4 pixel;
${common}

float skyShadow(vec3 pt, float normalDot) {
  if (uHasShadow < .5) return .72;
  vec4 clip = uLightMatrix * vec4(pt,1.0);
  vec3 p = clip.xyz*.5+.5;
  if (p.x<.004 || p.x>.996 || p.y<.004 || p.y>.996 || p.z<0.0 || p.z>1.0) return 1.0;
  const float dx = 1.0/${SHADOW_SIZE}.0;
  float at = p.z - (.00062 + .00110*(1.0-max(0.0,normalDot)));
  float s = step(at,texture(uShadow,p.xy+vec2( .62, 1.07)*dx).r)
          + step(at,texture(uShadow,p.xy+vec2(-1.07, .62)*dx).r)
          + step(at,texture(uShadow,p.xy+vec2(-.62,-1.07)*dx).r)
          + step(at,texture(uShadow,p.xy+vec2(1.07,-.62)*dx).r);
  return min(1.0,s*.25+.12);
}

void main() {
  vec3 world = vPosition;
  vec3 n = normalize(vNormal);
  vec3 eyeRay = world-uEye;
  float dist = length(eyeRay);
  vec3 view = -eyeRay/max(dist,.001);
  int material = vMaterial;
  float hem = clamp(n.y*.5+.5,0.0,1.0);
  float ndl = dot(n,uSun);
  vec3 haze = hazeTint(-view);
  if (material == 8) {
    float crag = noise21(world.xz*.133 + world.y*.094);
    vec3 land = vTint*(.64+.41*max(0.0,ndl)+.22*hem+crag*.19);
    if (vDetail > .6) {
      float waves = noise21(vec2(world.x*.15,world.z*.60))*.08;
      land = vTint * (.75+waves);
    }
    pixel = vec4(srgb(tonemap(mix(land,haze,hazeAmount(world,dist)))),1.0);
    return;
  }

  vec2 horizontal = world.xz;
  float up = abs(n.y);
  vec2 wall = vec2(world.x + world.z,world.y);
  vec2 grainPoint = mix(wall,horizontal,up);
  float broad = noise21(grainPoint*.69);
  float sampleSpan = max(length(dFdx(grainPoint)),length(dFdy(grainPoint)));
  float fineGate = 1.0-smoothstep(.31,1.26,sampleSpan*29.0);
  float grit = noise21(grainPoint*23.0 + world.y*.23);
  float micro = (grit-.5) * fineGate * (1.0-smoothstep(3.5,14.0,dist));
  float metre = noise21(grainPoint*4.9);
  float rough = .64;
  float spec = .18;
  vec3 base = vTint;
  vec3 wetReflection = vec3(0);
  float shelter = 1.0-smoothstep(.0,1.0,min(5.62-world.x, -world.z-9.03));
  if (world.z > -9.18 && world.x<4.99) shelter = 1.0;
  if (world.z < -22.02) shelter *= .28;
  if (material == 0) {
    base *= .90 + .18 * metre + .14 * broad + .15*micro;
    spec = .34;
    rough = .32 + .18*metre;
  } else if (material == 1 || material == 11) {
    float damp = smoothstep(.34,.65,.68*broad+.36*metre+(vDetail-.35)*.24);
    float pits = smoothstep(.20,.76,grit) * fineGate * (1.0-smoothstep(7.0,21.0,dist));
    float mineral = noise21(vec2(wall.x*10.5,wall.y*.60)) * (1.0-up);
    base *= .83 + broad*.24 + metre*.17 + .20*micro - damp*.28 + mineral*.14 - pits*.071;
    float scratch = smoothstep(.73,.86,noise21(vec2(grainPoint.x*68.0,grainPoint.y*1.02)));
    base += vec3(.013,.014,.011)*scratch*max(0.0,1.0-dist*.16);
    rough = mix(.83,.26,damp);
    spec = .11+damp*.28;
    if (n.y>.65 && world.y<.06) {
      float edge = smoothstep(.07,.64,min(abs(5.045-world.x),abs(-.85-world.x)));
      float railShadow = exp(-pow(abs(world.x-5.0)*3.2,2.0));
      float curbShadow = exp(-pow(abs(world.x+.83)*4.7,2.0)) * smoothstep(-9.3,-8.9,world.z);
      base *= (.83+.17*edge) * (1.0-.09*railShadow-.075*curbShadow);
    }
  } else if (material == 2) {
    float blend = step(.12,vDetail);
    vec2 grainUV = mix(vec2(world.x*23.0+world.z*24.0,world.y*1.09),vec2(world.x*37.0+world.y*20.0,world.z*1.24),.18+blend*.82);
    float fibers = noise21(grainUV + vec2(noise21(grainUV*.106)*2.4,0));
    float thin = sin(grainUV.x*3.35+1.15*noise21(grainUV*vec2(.17,.92)));
    float wood = .72 + fibers*.44 + thin*.035 + metre*.12 + micro*.085;
    float waterMark = noise21(vec2(wall.x*9.5,wall.y*.58))*(1.0-up);
    base *= wood - waterMark*.10;
    rough = .69;
    spec = .12;
  } else if (material == 3) {
    float erosion = smoothstep(.74,.94,grit * (.75+.30*broad));
    base = mix(base*(.89+.24*metre+.09*micro),vec3(.119,.139,.133),erosion*.43*fineGate);
    spec = .34;
    rough = .34 + metre*.20;
  } else if (material == 4) {
    base *= .92+.20*metre+.18*micro;
    rough = .89;
    spec = .06;
  } else if (material == 5) {
    float spangle = noise21(grainPoint*33.0 + vec2(noise21(grainPoint*9.7),0.0));
    base *= .69 + .26*mix(.49,spangle,fineGate) + .21*broad + .24*micro;
    spec = .47;
    rough = .28+.19*metre;
  } else if (material == 6) {
    vec3 radiance = base*2.12 + vec3(.30,.25,.16);
    pixel = vec4(srgb(tonemap(radiance)),1.0);
    return;
  } else if (material == 7) {
    float waviness = noise21(horizontal*9.0) - .5;
    n=normalize(n+vec3(waviness,0.0,-waviness)*.012);
    vec3 reflectRay = reflect(-view,n);
    float grazing=pow(1.0-max(0.0,dot(n,view)),2.0);
    float reflectedPanel = smoothstep(.05,.75,reflectRay.y);
    float rooftop = abs(horizontal.x*1.16 + reflectRay.x*2.97 - 4.2);
    float lightGap = .51 + .29 * smoothstep(.29,.75,1.0-abs(reflectRay.x+.16)) + .09*metre;
    wetReflection = hazeTint(reflectRay) * (.22+grazing*.85) * (1.0-reflectedPanel*.38) * lightGap;
    wetReflection *= 1.0 - .25 * smoothstep(.12,.22,rooftop) * shelter;
    float rings = sin((length((vUV-.5)*vec2(1,.8)) + noise21(horizontal*6.0)*.013)*127.0);
    base *= .67 + .12*metre + .09*broad;
    wetReflection += vec3(.021,.027,.025) * rings * .21;
    rough = .15;
    spec = .68;
  } else if (material == 9) {
    base *= .87+.25*metre+micro*.27;
    rough = .92;
    spec = .06;
  } else if (material == 10) {
    base *= .82+.22*broad+.14*metre+.10*micro;
    float chips = smoothstep(.65,.84,grit);
    base = mix(base,vec3(.162,.177,.163),chips*.3);
    spec = .19;
    rough = .74;
  }

  float shadow = skyShadow(world,ndl);
  float outside = max(smoothstep(-7.4,-4.8,world.x),.5) * smoothstep(9.15,15.0,-world.z);
  if (world.z > 5.14) outside = .6;
  float key = max(0.0,ndl) * shadow;
  vec3 ambient = vec3(.73,.88,1.01)*(.62+.25*hem+.17*outside);
  ambient += vec3(.16,.109,.054) * max(0.0,-n.y) * shelter;
  vec3 lit = base * (ambient + vec3(.42,.53,.58)*key);
  float shiny = max(.0,dot(n,normalize(uSun+view)));
  float edgeSpec = pow(1.0-max(0.0,dot(n,view)),3.0);
  float highlight = pow(shiny,mix(103.0,9.0,rough))*max(ndl,0.0) + edgeSpec*.09;
  lit += vec3(.36,.49,.51)*highlight*spec*(.18+.82*shadow);

  for(int i=0;i<${MAX_LIGHTS};i++){
    vec4 light = uLights[i];
    vec3 delta = light.xyz-world;
    float d2 = dot(delta,delta);
    if (d2>52.0 || light.w==0.0) continue;
    vec3 dir = delta * inversesqrt(max(d2,.001));
    float facing = clamp(.12+dot(n,dir),0.0,1.0);
    float radius = max(0.0,1.0-d2/54.0);
    float downward = mix(.15,1.0,smoothstep(-.44,.64,dir.y));
    float strength = 7.2 * abs(light.w)*radius*downward/(2.2+d2);
    vec3 tint = light.w>0.0 ? vec3(1.0,.686,.385) : vec3(.65,.88,.95);
    lit += base*tint*facing*strength*.79;
    float reflected = max(0.0,dot(n,normalize(dir+view)));
    float combined = pow(reflected,mix(91.0,7.0,rough))*spec;
    lit += tint * (combined*strength*.84);
  }

  lit += wetReflection;
  lit = mix(lit,haze,hazeAmount(world,dist));
  pixel = vec4(srgb(tonemap(lit)),1.0);
}
`

const glassFragment = /* glsl */`#version 300 es
precision highp float;
in vec3 vPosition;
in vec3 vNormal;
in vec3 vTint;
in vec2 vUV;
in float vDetail;
uniform vec3 uEye;
uniform float uTime;
out vec4 pixel;
${common}
void main() {
  vec3 view = normalize(uEye-vPosition);
  vec3 n = normalize(vNormal);
  vec2 along = normalize(vec2(n.z,-n.x));
  n *= dot(view,n)<0.0 ? -1.0 : 1.0;
  vec3 mirror = reflect(-view,n);
  float fresnel = pow(1.0-abs(dot(n,view)),2.18);
  vec2 glassUV = vec2(dot(along,vPosition.xz),vPosition.y);
  float handle = dot(vec2(-along.y,along.x),vPosition.xz);
  vec2 dropUV = vec2(glassUV.x*28.0,glassUV.y*2.2);
  float vine = floor(dropUV.x);
  float phase = hash21(vec2(vine, floor(handle*.31)));
  float rivulet = abs(fract(dropUV.x)-(.18+.66*phase));
  float pixelSpan = fwidth(dropUV.x);
  float rainGate = 1.0-smoothstep(.31,1.82,pixelSpan);
  float thin = (1.0-smoothstep(.019,.075+pixelSpan*.16,rivulet)) * rainGate;
  float heights = noise21(vec2(vine*.784,dropUV.y*.52-.023*uTime)+8.91);
  float rain = thin*smoothstep(.37,.82,heights) * smoothstep(.15,.74,phase);
  vec2 d = vec2(glassUV.x*30.8,glassUV.y*18.9);
  vec2 block = floor(d);
  vec2 local = fract(d)-vec2(.23+.48*hash21(block+41.1),.22+.57*hash21(block+7.63));
  float drop = 1.0-smoothstep(.041,.111,length(local*vec2(1.2,.69)));
  drop *= step(.82,hash21(block+.73))*rainGate;
  float smear = noise21(vec2(glassUV.x*5.92,glassUV.y*.65));
  float cabinLights = noise21(vec2(mirror.x*2.1,mirror.z*3.1));
  vec3 sky = hazeTint(mirror) * (.65+.54*max(0.0,mirror.y));
  sky *= .72 + .48 * cabinLights;
  vec3 lucid = mix(vTint*.59,sky,.31+fresnel*.51);
  float border = 1.0-smoothstep(.006,.056,min(min(vUV.x,1.0-vUV.x),min(vUV.y,1.0-vUV.y)));
  lucid += vec3(.16,.21,.20) * (rain*.64+drop*.64);
  lucid *= .92+smear*.17;
  float alpha = clamp(.091+vDetail*.30+fresnel*.43+rain*.22+drop*.27+border*.13,.0,.80);
  pixel = vec4(srgb(tonemap(lucid)),alpha);
}
`

const decalFragment = /* glsl */`#version 300 es
precision highp float;
in vec3 vPosition;
in vec3 vNormal;
in vec2 vUV;
uniform vec3 uEye;
uniform sampler2D uDecals;
out vec4 pixel;
void main() {
  if (dot(uEye-vPosition,vNormal)<0.0) discard;
  vec4 ink = texture(uDecals,vUV);
  if (ink.a<.018) discard;
  float nearWall = vPosition.z > -9.3 ? .89 : .94;
  pixel = vec4(ink.rgb * nearWall, ink.a);
}
`

function projection(aspect) {
  const near = .055
  const far = 670
  const f = 1 / Math.tan(FOV/2)
  return new Float32Array([
    f/aspect,0,0,0, 0,f,0,0, 0,0,(far+near)/(near-far),-1,
    0,0,2*far*near/(near-far),0,
  ])
}

function orthographic(left,right,bottom,top,near,far) {
  return new Float32Array([
    2/(right-left),0,0,0, 0,2/(top-bottom),0,0, 0,0,-2/(far-near),0,
    -(right+left)/(right-left),-(top+bottom)/(top-bottom),-(far+near)/(far-near),1,
  ])
}

function basis(yaw,pitch) {
  const forward = [Math.sin(yaw)*Math.cos(pitch),Math.sin(pitch),-Math.cos(yaw)*Math.cos(pitch)]
  const right = [Math.cos(yaw),0,Math.sin(yaw)]
  return {forward,right,up:cross(right,forward)}
}

function viewMatrix(eye,{forward:f,right:r,up:u}) {
  return new Float32Array([
    r[0],u[0],-f[0],0, r[1],u[1],-f[1],0, r[2],u[2],-f[2],0,
    -dot(r,eye),-dot(u,eye),dot(f,eye),1,
  ])
}

function multiply(a,b) {
  const m = new Float32Array(16)
  for(let col=0;col<4;col++) {
    for(let row=0;row<4;row++) {
      const i=col*4
      m[i+row]=a[row]*b[i]+a[4+row]*b[i+1]+a[8+row]*b[i+2]+a[12+row]*b[i+3]
    }
  }
  return m
}

function shader(gl,kind,source) {
  const object=gl.createShader(kind)
  gl.shaderSource(object,source)
  gl.compileShader(object)
  if (!gl.getShaderParameter(object,gl.COMPILE_STATUS)) {
    const log=gl.getShaderInfoLog(object)
    gl.deleteShader(object)
    throw new Error(log || 'A WebGL shader could not compile.')
  }
  return object
}

function program(gl,vertex,fragment,uniforms) {
  const vert=shader(gl,gl.VERTEX_SHADER,vertex)
  const frag=shader(gl,gl.FRAGMENT_SHADER,fragment)
  const object=gl.createProgram()
  gl.attachShader(object,vert)
  gl.attachShader(object,frag)
  gl.linkProgram(object)
  gl.deleteShader(vert)
  gl.deleteShader(frag)
  if (!gl.getProgramParameter(object,gl.LINK_STATUS)) {
    const log=gl.getProgramInfoLog(object)
    gl.deleteProgram(object)
    throw new Error(log || 'A WebGL program could not link.')
  }
  const u=Object.fromEntries(uniforms.map((key)=>[key,gl.getUniformLocation(object,key)]))
  return {object,u}
}

function upload(gl,data) {
  const vao=gl.createVertexArray()
  const buffer=gl.createBuffer()
  gl.bindVertexArray(vao)
  gl.bindBuffer(gl.ARRAY_BUFFER,buffer)
  gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(data),gl.STATIC_DRAW)
  const attributes=[3,3,3,2,1,1]
  let offset=0
  attributes.forEach((n,i)=>{
    gl.enableVertexAttribArray(i)
    gl.vertexAttribPointer(i,n,gl.FLOAT,false,13*4,offset*4)
    offset+=n
  })
  return {vao,count:data.length/13}
}

function makeGlass(gl,panes) {
  const data=[]
  const sorted=panes.map(({mesh,center},index)=>{
    const offset=data.length/13
    for(const val of mesh.data) data.push(val)
    return {center,index,offset,vertices:mesh.data.length/13,distance:0}
  })
  const batch=upload(gl,data)
  const index=gl.createBuffer()
  const order=new Uint16Array(batch.count)
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,index)
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,order.byteLength,gl.DYNAMIC_DRAW)
  let last=null
  function sort(eye) {
    if (last && last[0]===eye[0] && last[1]===eye[1] && last[2]===eye[2]) return
    last=eye.slice()
    for(const pane of sorted) {
      const d=sub(pane.center,eye)
      pane.distance=dot(d,d)
    }
    sorted.sort((a,b)=>b.distance-a.distance||a.index-b.index)
    let k=0
    for(const pane of sorted) {
      for(let i=0;i<pane.vertices;i++) order[k++]=pane.offset+i
    }
    gl.bindVertexArray(batch.vao)
    gl.bufferSubData(gl.ELEMENT_ARRAY_BUFFER,0,order)
  }
  return {...batch,sort}
}

function signPalette(style) {
  return {
    navy:['#20353a','#e8e4ce','#c3c4a9','#71877f'],
    small:['#26393a','#dcd8bf','#a9b3a5','#7f9084'],
    line:['#435747','#dbdfb9','#baba96','#657568'],
    sand:['#be995c','#2a332f','#353c30','#514b39'],
    rust:['#82433c','#f0dabc','#edc49a','#c68d71'],
    map:['#263d3e','#f0dec1','#c2c5ab','#86a092'],
    floor:[null,'#c9c5a4','#c9c5a4',null],
    sandFloor:[null,'#d4bea0','#c3b391',null],
    logo:[null,'#dedec4','#dedec4',null],
    logoSmall:[null,'#dedec4','#dedec4',null],
    cabin:[null,'#e3dfb8','#d1c6a3',null],
  }[style]
}

function drawRidge(ctx,x,y,w,h,tint) {
  ctx.save()
  ctx.translate(x,y)
  ctx.strokeStyle=tint
  ctx.lineWidth=2
  const ridges=[
    [[0,.78],[.13,.66],[.26,.47],[.45,.58],[.62,.34],[.72,.48],[.80,.39],[1,.57]],
    [[0,.61],[.15,.55],[.26,.36],[.42,.40],[.53,.27],[.63,.34],[.80,.20],[1,.36]],
    [[0,.89],[.23,.77],[.43,.89],[.71,.63],[1,.82]],
  ]
  for(const line of ridges) {
    ctx.beginPath()
    line.forEach(([u,v],i)=>i===0?ctx.moveTo(u*w,v*h):ctx.lineTo(u*w,v*h))
    ctx.stroke()
  }
  ctx.strokeStyle='#cea67b'
  ctx.beginPath()
  ctx.moveTo(0,h*.82)
  ctx.lineTo(w*.70,h*.34)
  ctx.stroke()
  for(const [u,v] of [[.04,.79],[.70,.34]]) {
    ctx.beginPath()
    ctx.arc(u*w,v*h,3,0,Math.PI*2)
    ctx.fillStyle='#e1c39a'
    ctx.fill()
  }
  ctx.restore()
}

function drawSign(ctx,sign,x,y,w,h) {
  const [paper,ink,secondary,edge] = signPalette(sign.style)
  if (paper) {
    ctx.fillStyle=paper
    ctx.fillRect(x,y,w,h)
    ctx.strokeStyle=edge
    ctx.lineWidth=1.5
    ctx.strokeRect(x+4,y+4,w-8,h-8)
    ctx.fillStyle=edge
    for(const dx of [8,w-8]) {
      for(const dy of [8,h-8]) ctx.fillRect(x+dx-1,y+dy-1,2,2)
    }
  }
  const desc=sign.subline
  const isMap=sign.style==='map'
  const isFloor=sign.style==='floor'||sign.style==='sandFloor'
  const labelArea=isMap?w*.58:w*.90
  const mainY=desc?(isMap?.32:.39):.515
  const mainFont=Math.min(h*(desc?.285:.65),sign.style==='logo'?97:57)
  const textX=x+(isMap?.073:.5)*w
  ctx.textBaseline='middle'
  ctx.textAlign=isMap?'left':'center'
  ctx.fillStyle=ink
  ctx.font=(sign.style==='logo'?'800':'700')+' '+Math.max(12,mainFont)+'px "Segoe UI", Arial, sans-serif'
  ctx.fillText(sign.title,textX,y+h*mainY,labelArea)
  if (desc) {
    const small = Math.max(11,Math.min(28,h*.155))
    ctx.fillStyle=secondary
    ctx.font=(isFloor?'700':'550')+' '+small+'px "Segoe UI", Arial, sans-serif'
    ctx.fillText(desc,textX,y+h*(isMap?.59:.70),labelArea)
  }
  if (isMap) drawRidge(ctx,x+w*.67,y+h*.16,w*.263,h*.67,edge)
}

function makeDecals(gl,labels) {
  const size=2048
  const atlas=document.createElement('canvas')
  atlas.width=size
  atlas.height=size
  const ctx=atlas.getContext('2d')
  if (!ctx) throw new Error('2D texture creation is unavailable.')
  const mesh=new Mesh()
  labels.forEach((sign,i)=>{
    const startX=(i%5)*406+4
    const startY=Math.floor(i/5)*161+4
    const aspect=sign.width/sign.height
    const w=Math.floor(Math.min(396,149*aspect))
    const h=Math.floor(Math.min(149,396/aspect))
    drawSign(ctx,sign,startX,startY,w,h)
    const u0=(startX+.35)/size, u1=(startX+w-.35)/size
    const v0=1-(startY+h-.35)/size, v1=1-(startY+.35)/size
    mesh.panel(sign.center,sign.right,sign.up,sign.width,sign.height,'#ffffff',MAT.paint,0,[[u0,v0],[u1,v0],[u1,v1],[u0,v1]])
  })
  const texture=gl.createTexture()
  gl.bindTexture(gl.TEXTURE_2D,texture)
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR_MIPMAP_LINEAR)
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE)
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true)
  gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,atlas)
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,false)
  gl.generateMipmap(gl.TEXTURE_2D)
  return {...upload(gl,mesh.data),texture}
}

function makeShadow(gl,station) {
  const viewCenter=[-1.5,-2.20,-12.10]
  const eye=add(viewCenter,mul(SUN,45))
  const forward=mul(SUN,-1)
  const right=norm(cross(forward,[0,1,0]))
  const up=cross(right,forward)
  const projection=orthographic(-23,23,-25,25,.5,95)
  const matrix=multiply(projection,viewMatrix(eye,{forward,right,up}))
  const pass=program(gl,shadowVertex,shadowFragment,['uLightMatrix'])
  const texture=gl.createTexture()
  gl.bindTexture(gl.TEXTURE_2D,texture)
  gl.texImage2D(gl.TEXTURE_2D,0,gl.DEPTH_COMPONENT24,SHADOW_SIZE,SHADOW_SIZE,0,gl.DEPTH_COMPONENT,gl.UNSIGNED_INT,null)
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.NEAREST)
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST)
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE)
  const target=gl.createFramebuffer()
  gl.bindFramebuffer(gl.FRAMEBUFFER,target)
  gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.DEPTH_ATTACHMENT,gl.TEXTURE_2D,texture,0)
  gl.drawBuffers([gl.NONE])
  gl.readBuffer(gl.NONE)
  const ready = gl.checkFramebufferStatus(gl.FRAMEBUFFER)===gl.FRAMEBUFFER_COMPLETE
  if (ready) {
    gl.viewport(0,0,SHADOW_SIZE,SHADOW_SIZE)
    gl.enable(gl.DEPTH_TEST)
    gl.depthMask(true)
    gl.clear(gl.DEPTH_BUFFER_BIT)
    gl.enable(gl.POLYGON_OFFSET_FILL)
    gl.polygonOffset(1.1,2)
    gl.useProgram(pass.object)
    gl.uniformMatrix4fv(pass.u.uLightMatrix,false,matrix)
    gl.bindVertexArray(station.vao)
    gl.drawArrays(gl.TRIANGLES,0,station.count)
    gl.disable(gl.POLYGON_OFFSET_FILL)
  }
  gl.bindFramebuffer(gl.FRAMEBUFFER,null)
  gl.deleteFramebuffer(target)
  gl.deleteProgram(pass.object)
  return {matrix,texture,ready}
}

export function makeRenderer(canvas,world) {
  const gl=canvas.getContext('webgl2',{
    alpha:false,antialias:true,depth:true,stencil:false,powerPreference:'high-performance',
  })
  if(!gl) throw new Error('WebGL 2 is unavailable. Try a desktop browser with hardware acceleration enabled.')
  const sky=program(gl,fullscreen,skyFragment,['uForward','uRight','uUp','uScale'])
  const surface=program(gl,surfaceVertex,surfaceFragment,['uCamera','uEye','uSun','uLights[0]','uLightMatrix','uShadow','uHasShadow'])
  const glass=program(gl,surfaceVertex,glassFragment,['uCamera','uEye','uTime'])
  const decals=program(gl,surfaceVertex,decalFragment,['uCamera','uEye','uDecals'])
  const empty=gl.createVertexArray()
  const station=upload(gl,world.mesh.data)
  const landscape=upload(gl,world.landscape.data)
  const panes=makeGlass(gl,world.glass)
  const lettering=makeDecals(gl,world.labels)
  const shadow=makeShadow(gl,station)
  const lights=new Float32Array(MAX_LIGHTS*4)
  world.lights.slice(0,MAX_LIGHTS).forEach(({x,y,z,power,warm},idx)=>lights.set([x,y,z,warm?power:-power],idx*4))
  let aspect=1, cameraProjection=projection(1)
  let dimensions=[0,0,0]

  function resize() {
    const w=Math.max(1,canvas.clientWidth)
    const h=Math.max(1,canvas.clientHeight)
    const ratio=Math.min(1.45,window.devicePixelRatio || 1,Math.sqrt(1650000/(w*h)))
    if(dimensions[0]===w && dimensions[1]===h && dimensions[2]===ratio) return
    dimensions=[w,h,ratio]
    canvas.width=Math.round(w*ratio)
    canvas.height=Math.round(h*ratio)
    aspect=canvas.width/canvas.height
    cameraProjection=projection(aspect)
  }

  gl.disable(gl.CULL_FACE)
  gl.depthFunc(gl.LEQUAL)
  gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA)
  gl.useProgram(surface.object)
  gl.uniformMatrix4fv(surface.u.uLightMatrix,false,shadow.matrix)
  gl.uniform3fv(surface.u.uSun,SUN)
  gl.uniform4fv(surface.u['uLights[0]'],lights)
  gl.uniform1f(surface.u.uHasShadow,shadow.ready?1:0)
  gl.uniform1i(surface.u.uShadow,0)
  gl.useProgram(decals.object)
  gl.uniform1i(decals.u.uDecals,1)

  function draw(eye,yaw,pitch,time) {
    resize()
    const axes=basis(yaw,pitch)
    const camera=multiply(cameraProjection,viewMatrix(eye,axes))
    const {forward,right,up}=axes
    const f=Math.tan(FOV/2)
    gl.viewport(0,0,canvas.width,canvas.height)
    gl.depthMask(true)
    gl.clear(gl.DEPTH_BUFFER_BIT)
    gl.disable(gl.DEPTH_TEST)
    gl.disable(gl.BLEND)

    gl.useProgram(sky.object)
    gl.uniform3fv(sky.u.uForward,forward)
    gl.uniform3fv(sky.u.uRight,right)
    gl.uniform3fv(sky.u.uUp,up)
    gl.uniform2f(sky.u.uScale,aspect*f,f)
    gl.bindVertexArray(empty)
    gl.drawArrays(gl.TRIANGLES,0,3)

    gl.enable(gl.DEPTH_TEST)
    gl.useProgram(surface.object)
    gl.uniformMatrix4fv(surface.u.uCamera,false,camera)
    gl.uniform3fv(surface.u.uEye,eye)
    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D,shadow.texture)
    gl.bindVertexArray(station.vao)
    gl.drawArrays(gl.TRIANGLES,0,station.count)
    gl.bindVertexArray(landscape.vao)
    gl.drawArrays(gl.TRIANGLES,0,landscape.count)

    gl.enable(gl.BLEND)
    gl.depthMask(false)
    gl.useProgram(decals.object)
    gl.uniformMatrix4fv(decals.u.uCamera,false,camera)
    gl.uniform3fv(decals.u.uEye,eye)
    gl.activeTexture(gl.TEXTURE1)
    gl.bindTexture(gl.TEXTURE_2D,lettering.texture)
    gl.bindVertexArray(lettering.vao)
    gl.drawArrays(gl.TRIANGLES,0,lettering.count)

    panes.sort(eye)
    gl.useProgram(glass.object)
    gl.uniformMatrix4fv(glass.u.uCamera,false,camera)
    gl.uniform3fv(glass.u.uEye,eye)
    gl.uniform1f(glass.u.uTime,time)
    gl.bindVertexArray(panes.vao)
    gl.drawElements(gl.TRIANGLES,panes.count,gl.UNSIGNED_SHORT,0)
    gl.depthMask(true)
  }

  return {draw}
}

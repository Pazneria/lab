import * as T from '../vendor/three.module.min.js';
import { indexedSurface } from './build-kit.js';
import { BOAT, coastX, shoreDistance, terrainHeight, rng, smoothstep, clamp } from './layout.js';
import { noiseTexture } from './materials.js';

export const SUN = new T.Vector3(-.50,.385,.776).normalize();
export const FOG_COLOR = 0xbcc5bc;
const ROCKS = [];

function makeRock(seed, detail) {
  const g = new T.IcosahedronGeometry(1, detail);
  const attr = g.attributes.position;
  const colors = [], uv = [];
  const rand = rng(seed);
  const sharpness = .39 + rand()*.28, shift = 17*rand();
  const hue = new T.Color();
  for (let i = 0; i < attr.count; i++) {
    const x = attr.getX(i), y = attr.getY(i), z = attr.getZ(i);
    const j = Math.sin(x*8.1 + y*4.2 + z*3.2 + shift) * Math.cos(z*7.2 - y*4.5 + x);
    const form = 1 + j*sharpness*.34 + .09*Math.sin(y*9.1+z*3-x*3+shift);
    attr.setXYZ(i, x*form + y*.08, Math.max(-.61,y)*form, z*form);
    const band = Math.sin(y*21 + z*2.5+x + shift)*.042;
    const tone = .75+.17*smoothstep(-.45,.65,y)+j*.105+band;
    hue.setRGB(tone, tone*(.96 + .06*j), tone*(.89 + .08*j));
    colors.push(hue.r,hue.g,hue.b);
    uv.push((x+z+1)*.75,(y+1)*1.22);
  }
  g.setAttribute('color',new T.Float32BufferAttribute(colors,3));
  g.setAttribute('uv',new T.Float32BufferAttribute(uv,2));
  g.computeVertexNormals();
  return g;
}

function terrain(b, m) {
  b.zone = 'tidal bank';
  const positions=[], colors=[], uvs=[], indices=[];
  function axis(bands){
    const samples=[];
    for(const [from,to,step] of bands) {
      const n=Math.ceil((to-from)/step);
      for(let i=0;i<n;i++) samples.push(from+(to-from)*i/n);
    }
    samples.push(bands.at(-1)[1]);
    return samples;
  }
  const xs=axis([[-16,-2.9,1.25],[-2.9,17,.34],[17,35,1.08]]);
  const zs=axis([[-22,-10.5,.86],[-10.5,17.5,.34],[17.5,36,1.02]]);
  const cols=xs.length, rows=zs.length;
  const submerged = new T.Color(0x99a28b);
  const damp = new T.Color(0x79705e);
  const sand = new T.Color(0xc6b391);
  const scrub = new T.Color(0x949674);
  const deep = new T.Color(0x768e80);
  const tint = new T.Color();
  for (let j=0;j<rows;j++) for (let i=0;i<cols;i++) {
    const x=xs[i], z=zs[j];
    const d=shoreDistance(x,z), y=terrainHeight(x,z);
    const local = Math.sin(x*2.13+z*.14)*Math.sin(z*1.06-x*.39)*.09
      + Math.cos(z*2.95+x*1.13)*Math.sin(z*3.11-x*.32)*.035;
    if (d < 0) tint.copy(submerged).lerp(deep,smoothstep(.3,4.6,-d));
    else tint.copy(damp).lerp(sand,smoothstep(.18,1.62,d)).lerp(scrub,smoothstep(4.4,9.3,d));
    const strand = Math.exp(-((d-.43-Math.sin(z)*.08)**2)/.026) * .18;
    const ridges = Math.sin(d*34+Math.sin(z*1.46)*1.2) * .036 * (1-smoothstep(.2,1.3,Math.abs(d)));
    tint.multiplyScalar(1 + local + ridges - strand);
    positions.push(x,y,z);
    uvs.push(x*.77,z*.77);
    colors.push(tint.r,tint.g,tint.b);
    if (i+1<cols && j+1<rows) {
      const k=j*cols+i;
      indices.push(k,k+cols,k+1,k+1,k+cols,k+cols+1);
    }
  }
  b.add(indexedSurface(positions,uvs,indices,colors),m.ground,{cast:false});
}

function placeRock(b,m,walk,rand,x,z,r,yScale,obstacle=false,wet=false) {
  const variant = Math.floor(rand()*ROCKS.length);
  const y = terrainHeight(x,z);
  const roll = (rand()-.5)*.43, yaw=rand()*Math.PI*2;
  const tall = r*yScale, long = r*(.66+rand()*.48);
  b.add(ROCKS[variant], wet ? m.wetRock : m.rock, {
    at:[x,y+tall*.18,z], scale:[r,tall,long], rotation:[roll,yaw,roll*.62], cast:r>.29,
    tone:.79+rand()*.44, color: rand()>.79 ? 0xe1d7bc : 0xeff0e7
  });
  if (obstacle) walk.ellipse(x,z,r*.90,long*.92,yaw,y-.1,y+tall*1.35);
}

function grassPatch(b, m, x, z, scale, rand, dry) {
  const pos=[], uvs=[], inds=[], colors=[];
  const footColor = new T.Color(dry ? 0x787756 : 0x686e4f);
  const tipColor = new T.Color(dry ? 0xc7b789 : 0xa3a287);
  const leafColor = new T.Color();
  const blades = 6+Math.floor(rand()*9);
  for (let n=0;n<blades;n++) {
    const bx = x +(rand()-.5)*scale, bz=z+(rand()-.5)*scale*.8;
    const by = terrainHeight(bx,bz)-.028;
    const a=rand()*6.283, vx=Math.cos(a), vz=Math.sin(a);
    const h=scale*(.35+rand()*.86), bend=scale*(.1+rand()*.33), width=scale*(.035+rand()*.043);
    const idx=pos.length/3;
    for (let j=0;j<=3;j++) {
      const t=j/3;
      const cx=bx+vx*bend*t*t, cz=bz+vz*bend*t*t;
      const oy=by+h*(t-.15*t*t);
      const side=width*(1-.98*t)*.5;
      leafColor.copy(footColor).lerp(tipColor,t).multiplyScalar(.82+rand()*.37);
      for(const sign of [-1,1]){
        pos.push(cx-vz*side*sign,oy,cz+vx*side*sign);
        colors.push(leafColor.r,leafColor.g,leafColor.b);
        uvs.push((sign+1)*.5,t);
      }
      if(j<3) inds.push(idx+j*2,idx+j*2+2,idx+j*2+1,idx+j*2+1,idx+j*2+2,idx+j*2+3);
    }
  }
  b.add(indexedSurface(pos,uvs,inds,colors),m.grass,{cast:false});
}

function wrack(b,m,x,z,r,rand) {
  const pos=[], uvs=[], inds=[], colors=[];
  const tones = [new T.Color(0x685332), new T.Color(0x777149), new T.Color(0x484e35)];
  for (let n=0;n<7;n++) {
    const angle=rand()*6.283, shear=(rand()-.5)*1.2, length = r*(.31+rand()*.7);
    const width = .013+rand()*.029;
    const ids=pos.length/3;
    const tin=tones[n%3].clone().multiplyScalar(.89+rand()*.28);
    for(let j=0;j<=5;j++){
      const t=j/5, a=angle + shear*t + .23*Math.sin(t*10+n);
      const xx=x+Math.cos(a)*length*t, zz=z+Math.sin(a)*length*t;
      const y=terrainHeight(xx,zz)+.009+.039*Math.sin(t*3.14)+.012*Math.sin(t*8.4+n);
      const w=width*Math.sin(.15+2.92*t);
      for (const s of [-1,1]){
        pos.push(xx+Math.sin(a)*w*s,y+ .003*s,zz-Math.cos(a)*w*s);
        uvs.push((s+1)*.5,t);
        colors.push(tin.r,tin.g,tin.b);
      }
      if(j<5) inds.push(ids+j*2,ids+j*2+2,ids+j*2+1,ids+j*2+1,ids+j*2+2,ids+j*2+3);
    }
  }
  b.add(indexedSurface(pos,uvs,inds,colors),m.algae,{cast:false});
}

function details(b,m,walk) {
  b.zone = 'exposed shore';
  const rand=rng(937564);
  for (let i=0;i<470;i++) {
    const z=-12+rand()*36;
    const x=coastX(z)-1.8+Math.pow(rand(),1.7)*9.6;
    if (z>.95 && z<4.4 && x<7.05) continue;
    const closeBoat=Math.hypot((x-BOAT.x)*1.25,(z-BOAT.z)*.7)<2.8;
    const waterline=shoreDistance(x,z)<.6;
    const r=.018+Math.pow(rand(),3.4)*(waterline?.37:.57);
    const circuit = z>3.55 && z<9.85 && x>6.11 && x<10.48;
    const radius = circuit || closeBoat ? Math.min(r,.139) : r;
    placeRock(b,m,walk,rand,x,z,radius,.39+rand()*.59,radius>.32,waterline);
    if (r<.055 && i%7===0 && shoreDistance(x,z)>.09 && shoreDistance(x,z)<2.1) {
      b.add(ROCKS[i%ROCKS.length],m.shell,{
        at:[x+.09,terrainHeight(x+.09,z)+.009,z],
        scale:[.019+rand()*.02,.009,.025+rand()*.035],
        rotation:[0,rand()*6.283,.13],cast:false,color:i%2?0xe9dbb5:0xaeb6a1
      });
    }
  }
  const stones = [
    [6.09, .50,.40,.71], [6.61,.67,.61,.69], [6.72,-.15,.79,.79], [7.55,.38,.64,.67],
    [7.02,-1.06,1.04,.83], [8.67,-1.04,.75,.83], [8.17,-2.08,1.18,.90],
    [10.53,-.05,.74,.82], [11.13,1.10,.49,.79], [11.16,1.87,.64,.86],
    [11.11,6.21,.62,.64], [11.56,7.56,.90,.55], [12.36,7.21,1.52,.65],
    [12.52,8.56,.98,.65], [13.92,8.59,1.31,.79], [13.36,10.26,1.13,.72],
    [10.37,11.31,.40,.64], [9.62,11.68,.34,.50], [7.77,10.41,.22,.59],
    [7.02,9.45,.21,.58], [5.89,7.84,.32,.69], [5.45,6.99,.26,.58],
    [9.62,3.18,.43,.68], [15.52,1.25,1.07,1.15], [14.46,3.4,1.35,1.19],
    [17.32,11.4,1.37,1.15], [11.83,-4.04,1.65,1.14], [9.72,-6.63,1.18,1.04]
  ];
  for (const [x,z,r,scale] of stones) {
    placeRock(b,m,walk,rand,x,z,r,scale,r>.24,shoreDistance(x,z)<.7);
  }
  for (let i=0;i<135;i++) {
    const z=-13+rand()*33;
    const x=coastX(z)+1.62+Math.pow(rand(),.76)*9.6;
    const sparse = z>1.3 && z<9.7 && x<9.5;
    if (sparse && rand()<.89) continue;
    if (z>1.24 && z<3.94 && x<7.04) continue;
    grassPatch(b,m,x,z,.18+Math.pow(rand(),.74)*.66,rand,i%3<2);
  }
  for (let i=0;i<64;i++) {
    const z=-4.5+rand()*25.1;
    const x=coastX(z)+ (i%4===0? -.58 : -.11) + rand()*1.1;
    if (z>1.5 && z<3.86) continue;
    wrack(b,m,x,z,.08+Math.pow(rand(),1.4)*.42,rand);
  }
  const logX=9.89, logZ=10.38;
  const a=[logX-.61,terrainHeight(logX-.61,logZ+.23)+.055,logZ+.23];
  const c=[logX+.61,terrainHeight(logX+.61,logZ-.24)+.106,logZ-.24];
  b.stick(m.deck,a,c,.135,.120,{tone:.87});
  b.stick(m.deck,[9.9,terrainHeight(9.9,10.38)+.14,10.38],[10.26,terrainHeight(10.26,10.65)+.18,10.65],.052,.067);
}

function ridge(b,m,{x,z,width,depth,base,scale,seed,color}) {
  const rand = rng(seed), n = Math.ceil(width / 2.2);
  const positions=[], uvs=[], index=[], colors=[];
  const tint = new T.Color(color);
  const ash = new T.Color(0xb6bdab);
  const mixed = new T.Color();
  const amplitudes = Array.from({length:6},()=>.3+rand()*.7);
  const phase = Array.from({length:6},()=>rand()*6.28);
  for(let row=0;row<5;row++) {
    const v=row/4;
    for(let i=0;i<=n;i++){
      const t=i/n;
      let bump = .52;
      for(let j=0;j<6;j++) bump += Math.sin(t*(4.8+j*2.6)+phase[j])*amplitudes[j]/(3+j*2);
      const height=base+Math.max(0,Math.sin(Math.PI*t))**.40 * scale*bump*Math.sin(v*Math.PI);
      const xx=x+(t-.5)*width, zz=z+(v-.5)*depth+Math.sin(t*9.4+seed)*2.3;
      positions.push(xx,height,zz);
      uvs.push(t,v);
      mixed.copy(tint).lerp(ash,.17+.27*v).multiplyScalar(.80+rand()*.15+.18*Math.sin(Math.PI*v));
      colors.push(mixed.r,mixed.g,mixed.b);
      if(row<4&&i<n){
        const k=row*(n+1)+i;
        index.push(k,k+n+1,k+1,k+1,k+n+1,k+n+2);
      }
    }
  }
  b.add(indexedSurface(positions,uvs,index,colors),m.distant,{cast:false,receive:false});
}

function headlands(b,m) {
  b.zone='far headlands';
  ridge(b,m,{x:-70,z:-124,width:186,depth:30,base:-.14,scale:23,seed:11,color:0x697d76});
  ridge(b,m,{x:-101,z:15,width:135,depth:43,base:-.12,scale:23,seed:58,color:0x687c70});
  ridge(b,m,{x:-45,z:-76,width:132,depth:43,base:-.15,scale:15,seed:9,color:0x77826e});
  ridge(b,m,{x:38,z:-52,width:134,depth:63,base:.07,scale:16,seed:37,color:0x6d7c60});
  ridge(b,m,{x:73,z:-2,width:91,depth:49,base:-.05,scale:13,seed:42,color:0x768166});
  ridge(b,m,{x:89,z:23,width:93,depth:34,base:-.06,scale:8,seed:34,color:0x899276});
  b.zone='near headland trees';
  const rand=rng(635);
  for(let i=0;i<95;i++) {
    const x=-15+rand()*49, z=-12.7-rand()*11.5;
    if (x>19 && rand() < .54) continue;
    const y = terrainHeight(x,z)-.04;
    const h=1.25+Math.pow(rand(),.73)*3.38, rad=h*(.18+rand()*.081);
    const color=[0x69765b,0x596d59,0x788067,0x5d6d5d][i%4];
    b.cyl(m.beam,x,y+h*.3,z,rad*.092,h*.59,{sides:5,cast:false,receive:false,tone:.88});
    for (let j=0;j<3;j++) {
      b.cyl(m.distant,x+Math.sin(i)*.095*j,y+h*(.46+.22*j),z,
        rad*(1-.29*j),h*(.59-.087*j),
        { top: .04,sides:7,rotation:[.09*Math.sin(i),rand()*6.283,.079*Math.cos(i)],tone: .85+j*.075,color,cast:false,receive:false });
    }
  }
}

export function buildLandscape(builder, materials, walk) {
  if (!ROCKS.length) for(let i=0;i<12;i++) ROCKS.push(makeRock(20+i*53,i<7?0:1));
  terrain(builder,materials);
  details(builder,materials,walk);
  headlands(builder,materials);
}

export function addSky(scene) {
  const material = new T.ShaderMaterial({
    side: T.BackSide, depthWrite: false,
    uniforms: {
      sun: {value:SUN}, noiseMap:{value:noiseTexture()},
      horizon:{value:new T.Color(FOG_COLOR)}, zenith:{value:new T.Color(0x7398aa)},
      highSky:{value:new T.Color(0xa1b6bf)}, gold:{value:new T.Color(0xf3d3a1)}
    },
    vertexShader: /* glsl */`
      varying vec3 ray;
      void main() {
        ray = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
      }
    `,
    fragmentShader: /* glsl */`
      uniform vec3 sun, horizon, zenith, highSky, gold;
      uniform sampler2D noiseMap;
      varying vec3 ray;

      void main() {
        vec3 dir=normalize(ray);
        float y=max(0.0,dir.y);
        float toward=max(0.0,dot(dir,sun));
        float key=pow(toward,7.0);
        vec3 col=mix(horizon,highSky,smoothstep(0.0,.37,y));
        col=mix(col,zenith,smoothstep(.17,1.0,y)*.85);
        col=mix(col,gold,(.30*key+.25*pow(toward,2.0))*(1.0-smoothstep(.29,.79,y)));
        vec2 p=dir.xz/(y+.35);
        float a=texture2D(noiseMap,p*vec2(.027,.091)+vec2(.14,.32)).r;
        float b=texture2D(noiseMap,p*vec2(.061,.177)+vec2(.26,.13)).r;
        float c=texture2D(noiseMap,p*vec2(.142,.31)+vec2(.42,.81)).r;
        float cloud=smoothstep(.49,.76,a*.55+b*.30+c*.15);
        cloud*=smoothstep(.025,.16,y)*(1.0-smoothstep(.49,.86,y));
        col=mix(col,mix(vec3(.82,.86,.84),gold,.46*key),cloud*.56);
        col+=vec3(1.0,.79,.51)*pow(toward,185.0)*.18;
        col+=vec3(3.4,2.63,1.56)*smoothstep(.99966,.99990,toward);
        gl_FragColor=vec4(col,1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `
  });
  const sky=new T.Mesh(new T.SphereGeometry(209, 24, 14), material);
  sky.renderOrder=-100;
  sky.frustumCulled=false;
  scene.add(sky);
  return sky;
}

export function addWater(scene) {
  const material = new T.ShaderMaterial({
    transparent: true, depthWrite: false,
    uniforms:{
      time:{value:0}, sun:{value:SUN}, nearColor:{value:new T.Color(0x788f7d)},
      farColor:{value:new T.Color(0x648892)}, haze:{value:new T.Color(FOG_COLOR)},
      sunTint:{value:new T.Color(0xffd89e)}
    },
    vertexShader: /* glsl */`
      uniform float time;
      varying vec3 world;
      void main(){
        world=(modelMatrix*vec4(position,1.0)).xyz;
        world.y+=.006*sin(world.x*2.4+world.z*1.2+time*.7)+.004*sin(world.z*2.1-world.x*.4+time*.57);
        gl_Position=projectionMatrix*viewMatrix*vec4(world,1.0);
      }
    `,
    fragmentShader: /* glsl */`
      uniform float time;
      uniform vec3 sun, nearColor, farColor, haze, sunTint;
      varying vec3 world;

      float shore(vec2 p){
        float shoreX=4.25+.163*p.y+.30*sin(p.y*.52)+.49*max(0.,p.y-8.4);
        return max((p.x-shoreX)*.94,(-p.y-9.55+.84*sin(p.x*.285))*.88);
      }

      float hitBox(vec3 p, vec3 ray, vec3 low, vec3 high){
        vec3 orientation=mix(vec3(-1.0),vec3(1.0),step(vec3(0.0),ray));
        vec3 inv=orientation/max(abs(ray),vec3(.001));
        vec3 lo=(low-p)*inv;
        vec3 hi=(high-p)*inv;
        vec3 a=min(lo,hi), b=max(lo,hi);
        float start=max(max(a.x,a.y),a.z);
        float end=min(min(b.x,b.y),b.z);
        return step(max(start,0.0),end);
      }

      void main(){
        vec2 p=world.xz;
        float d=shore(p);
        float deep=1.0-exp(min(d,0.0)*.42);
        float w1=p.x*2.4+p.y*1.2+time*.72;
        float w2=p.y*2.1-p.x*.4+time*.58;
        float w3=p.y*7.7+p.x*3.7-time*1.04+sin(w2)*.83;
        float w4=p.y*18.8-p.x*7.5+time*1.10+sin(w1)*1.17;
        float w5=p.y*.8-p.x*1.34-time*.31;
        float c1=cos(w1), c2=cos(w2), c3=cos(w3), c4=cos(w4), c5=cos(w5);
        vec3 view=normalize(cameraPosition-world);
        float textureFade=1.0-smoothstep(22.0,81.0,distance(cameraPosition,world));
        vec3 normal=normalize(vec3(-.017*c1-.008*c3*textureFade+.010*c4*textureFade+.011*c5,
          1.0,-.012*c1-.024*c2-.017*c3*textureFade-.013*c4*textureFade-.006*c5));
        float facing=max(0.0,dot(view,normal));
        float fresnel=pow(1.0-facing,4.1);
        vec3 ray=reflect(-view,normal);
        vec3 lavender=mix(haze,farColor,clamp(ray.y*2.8,0.0,1.0));
        vec3 color=mix(nearColor,farColor,deep*.80);
        color*=.96+.043*c1+.032*c2+.022*c3*textureFade+.015*c5;
        color=mix(color,lavender,.21+fresnel*.61);

        if(abs(p.x)<21.0 && abs(p.y)<29.0){
          float timber=hitBox(world,ray,vec3(-6.18,1.46,-5.95),vec3(1.85,4.28,1.30));
          float roof=hitBox(world,ray,vec3(-4.93,4.13,-6.36),vec3(.62,5.26,1.77));
          float dock=hitBox(world,ray,vec3(-2.34,1.19,3.96),vec3(.27,1.46,13.17));
          dock=max(dock,hitBox(world,ray,vec3(-6.91,1.19,1.16),vec3(3.06,1.46,4.04)));
          color=mix(color,vec3(.115,.154,.130),min(1.0,timber+roof*.42)*fresnel*.49);
          color=mix(color,vec3(.163,.132,.090),dock*fresnel*.36);
          float shade=exp(-pow(abs((p.x+1.01)*.82),4.0)) * smoothstep(3.6,5.0,p.y)*(1.0-smoothstep(12.5,13.9,p.y));
          color*=1.0-shade*.21;
          float edge=(1.0-smoothstep(.008,.075,abs(d+.032+sin(p.y*2.1)*.013)));
          color+=vec3(.063,.059,.039)*edge*(.35+.34*c2+.21*c3);
        }

        vec3 halfway=normalize(sun+view);
        float spec=pow(max(0.0,dot(halfway,normal)),318.0);
        float glow=pow(max(0.0,dot(halfway,normal)),75.0);
        color+=sunTint*(glow*.112+spec*.53);
        float distanceFog=1.0-exp(-pow(length(cameraPosition-world)*.015,2.0));
        color=mix(color,haze,distanceFog*.94);
        float alpha=min(.98,.33+.55*deep+.22*fresnel+.65*distanceFog+spec*.13);
        gl_FragColor=vec4(color,alpha);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `
  });
  const water=new T.Mesh(new T.PlaneGeometry(398,398,29,29),material);
  water.name='Tidal inlet';
  water.rotation.x=-Math.PI*.5;
  water.renderOrder=2;
  scene.add(water);
  return material.uniforms.time;
}

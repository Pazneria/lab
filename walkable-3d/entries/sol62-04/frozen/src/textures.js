import * as T from 'three';
import { color, seeded, rand, clamp, TAU } from './geometry.js';

function canvas(size, height=size) {
  const source = document.createElement('canvas');
  source.width = size;
  source.height = height;
  return source;
}

function texture(source, repeat = true, srgb = true) {
  const t = new T.CanvasTexture(source);
  if (srgb) t.colorSpace = T.SRGBColorSpace;
  if (repeat) t.wrapS = t.wrapT = T.RepeatWrapping;
  t.anisotropy = 4;
  return t;
}

function noiseGrid(size, rng) {
  const table = Float32Array.from({length:size*size},rng);
  return (x, y) => {
    x = x*size; y = y*size;
    const i = Math.floor(x), j = Math.floor(y);
    const a = x-i, b = y-j;
    const u = a*a*(3-2*a), w = b*b*(3-2*b);
    const i0 = ((i%size)+size)%size, j0 = ((j%size)+size)%size;
    const i1 = (i0+1)%size, j1 = (j0+1)%size;
    return table[j0*size+i0]*(1-u)*(1-w)+table[j0*size+i1]*u*(1-w)
      + table[j1*size+i0]*(1-u)*w+table[j1*size+i1]*u*w;
  };
}

function surfaceMap(kind, seed) {
  const size = kind === 'bark' || kind === 'stone' ? 512 : 256;
  const source = canvas(size);
  const ctx = source.getContext('2d');
  const image = ctx.createImageData(size,size);
  const rng = seeded(seed);
  const n4 = noiseGrid(4,rng), n10 = noiseGrid(10,rng);
  const n27 = noiseGrid(27,rng), n75 = noiseGrid(75,rng);
  for (let y=0; y<size; y++) for (let x=0; x<size; x++) {
    const u = x/size, w = y/size;
    const large = n4(u,w)-.5, mid = n10(u,w)-.5, grit = n27(u,w)-.5;
    const fine = n75(u,w)-.5;
    const speck = rng()-.5;
    let r, g, b;
    if (kind === 'stone') {
      const mineral = .68*large + .33*mid + .22*grit;
      const shade = 188 + 76*mineral + 14*fine + 23*speck;
      const flake = grit > .25 ? 9 : 0;
      r = shade+flake; g = shade-3; b = shade-10-flake;
    } else if (kind === 'soil') {
      const shade = 168 + 50*large + 65*mid + 66*grit + 54*fine + 52*speck;
      r=shade+9; g=shade-1; b=shade-11;
    } else if (kind === 'bark' || kind === 'wood') {
      const bark = kind === 'bark';
      const twist = n4(u,w)*(bark ? .09 : .035);
      const rib = n27(u+twist,w*(bark ? .18 : .07));
      const microRib = n75(u+twist*.8,w*.16);
      const furrow = Math.pow(rib,3) * -73;
      const shade = 208 + furrow + 32*mid + 33*microRib + 29*speck;
      r=shade+(bark?4:8); g=shade-5; b=shade-14;
    } else if (kind === 'metal') {
      const oxide = Math.max(0,mid + grit*.8 - .12) * 95;
      const shade = 202 + 21*large + 33*mid + 24*fine + 23*speck;
      r=shade+oxide*.68; g=shade-oxide*.32; b=shade-oxide*.65;
    } else if (kind === 'clay') {
      const mineral = 37*large + 17*mid + 18*grit;
      const salt = Math.max(0,large+mid*.75+fine*.4-.15)*42;
      const shade=194+mineral+19*speck+salt + Math.sin(w*TAU*37+mid)*3.1;
      r=shade+6; g=shade+salt*.4; b=shade-8+salt*.65;
    } else {
      const shade = 170 + 61*large + 36*mid + 59*grit + 45*fine + 28*speck;
      r=shade-13; g=shade+11; b=shade-26;
    }
    const i=(y*size+x)*4;
    image.data[i]=r; image.data[i+1]=g; image.data[i+2]=b; image.data[i+3]=255;
  }
  ctx.putImageData(image,0,0);
  if (kind === 'stone' || kind === 'soil' || kind === 'metal') {
    const count = kind === 'soil' ? 2600 : 620;
    for (let i=0; i<count; i++) {
      const x=rand(rng,0,size), y=rand(rng,0,size);
      const light = rng()>.57;
      ctx.fillStyle = light ? 'rgba(255,244,217,.22)' : 'rgba(45,37,25,.21)';
      ctx.beginPath();
      const r = rand(rng,.2,kind==='soil'?2.4:1.1);
      ctx.ellipse(x,y,r, r*rand(rng,.45,1), rand(rng,0,TAU),0,TAU);
      ctx.fill();
    }
  }
  return texture(source);
}

function bladeMap(style) {
  const source=canvas(192,384);
  const ctx=source.getContext('2d');
  const image=ctx.createImageData(source.width,source.height);
  const rng=seeded(7621+style*991);
  const rough=noiseGrid(24,rng), patch=noiseGrid(9,rng);
  for (let y=0; y<source.height; y++) for (let x=0; x<source.width; x++) {
    const u=x/(source.width-1), t=1-y/(source.height-1), d=Math.abs(2*u-1);
    const twist=.05*Math.sin(t*4.8)+.017*Math.sin(t*13+d*7);
    const count = style===2 ? 19 : style===1 ? 15 : 10;
    const wave=(t-.41*d*(1-.22*t) + twist)*count;
    const secondary=Math.abs(wave-Math.round(wave));
    const primary=Math.exp(-d*(style===2?54:87))*(1-.48*t);
    let ridge=Math.exp(-secondary*37) * (1-d*.48);
    if (style === 2) ridge += Math.exp(-Math.abs(2*wave-Math.round(2*wave))*54)*.32;
    const cells = 19*(rough(u+.09*t,t)-.5) + 22*(patch(u,t)-.5);
    const dryEdge = Math.max(0,d-.85)*Math.max(0,patch(u*1.8,t*3)-.35)*98;
    const tone = 222 - 22*d + cells + 4*(rng()-.5);
    const i=(y*source.width+x)*4;
    image.data[i]=tone+44*primary+16*ridge+dryEdge;
    image.data[i+1]=tone+29*primary+23*ridge-dryEdge*.3;
    image.data[i+2]=tone+22*primary+15*ridge-dryEdge*.7;
    image.data[i+3]=255;
  }
  ctx.putImageData(image,0,0);
  return texture(source,false);
}

function glassGrime() {
  const source=canvas(256);
  const ctx=source.getContext('2d');
  const image=ctx.createImageData(256,256);
  const rng=seeded(8892);
  const n6=noiseGrid(6,rng), n23=noiseGrid(23,rng), n55=noiseGrid(55,rng);
  for (let y=0; y<256; y++) for (let x=0; x<256; x++) {
    const u=x/255, w=y/255;
    const edge=Math.min(u,1-u,w,1-w);
    const deposit=clamp(.44*n6(u,w)+.27*n23(u,w)+.26*n55(u,w)+rng()*.052,0,1);
    const streak=clamp(n55(u,w*.11)-.48,0,1)*n6(u,w*.5);
    const i=(y*256+x)*4;
    image.data[i]=Math.pow(1-Math.min(1,edge*8),2)*180+deposit*80;
    image.data[i+1]=deposit*255;
    image.data[i+2]=streak*255;
    image.data[i+3]=255;
  }
  ctx.putImageData(image,0,0);
  return texture(source,false,false);
}

export function createMaterials() {
  const textures = {};
  const std = (props={}) => new T.MeshStandardMaterial({vertexColors:true, roughness:.9, ...props});
  const textured = (name, seed, bumpScale, props={}) => {
    const map = surfaceMap(name,seed);
    textures[name]=map;
    const bumpMap = map.clone();
    bumpMap.colorSpace = T.NoColorSpace;
    bumpMap.needsUpdate = true;
    return std({map,bumpMap,bumpScale,...props});
  };
  const leaf = (style, roughness) => {
    const map = bladeMap(style);
    const material=std({map, side:T.DoubleSide, roughness, emissive:0x3b4f28, emissiveIntensity:.19});
    if(style!==1){
      // The high windows reflect faintly even on leaves that sit outside the direct sun.
      material.onBeforeCompile=shader=>{
        shader.fragmentShader=shader.fragmentShader.replace('#include <opaque_fragment>',[
          'vec3 glasshouseEye = normalize(vViewPosition);',
          'vec3 glasshouseReflection = inverseTransformDirection(reflect(-glasshouseEye,normal),viewMatrix);',
          'float glasshouseSky = smoothstep(.17,.82,glasshouseReflection.y);',
          'float glasshouseEdge = 1.0 - clamp(dot(glasshouseEye,normal),0.0,1.0);',
          'float glasshouseCoat = (1.0-roughnessFactor) * glasshouseSky;',
          'outgoingLight += vec3(.58,.71,.63) * glasshouseCoat * (.016 + .055*glasshouseEdge*glasshouseEdge);',
          '#include <opaque_fragment>',
        ].join('\n'));
      };
    }
    return material;
  };
  const glass = new T.ShaderMaterial({
    transparent:true, depthWrite:false, side:T.DoubleSide, forceSinglePass:true,
    uniforms:{grime:{value:glassGrime()}},
    vertexShader:[
      'varying vec2 paneUV;',
      'varying vec3 worldPoint;',
      'varying vec3 worldNormal;',
      'varying vec3 paneData;',
      'attribute vec3 color;',
      'void main() {',
      ' paneUV = uv;',
      ' paneData = color;',
      ' worldPoint = (modelMatrix * vec4(position,1.0)).xyz;',
      ' worldNormal = normalize(mat3(modelMatrix) * normal);',
      ' gl_Position = projectionMatrix * viewMatrix * vec4(worldPoint,1.0);',
      '}',
    ].join('\n'),
    fragmentShader:[
      'uniform sampler2D grime;',
      'varying vec2 paneUV;',
      'varying vec3 worldPoint;',
      'varying vec3 worldNormal;',
      'varying vec3 paneData;',
      'void main() {',
      ' vec3 grimeUV = texture2D(grime, vec2(mix(paneUV.x,1.0-paneUV.x,paneData.b),paneUV.y)).rgb;',
      ' vec3 incident = normalize(worldPoint-cameraPosition);',
      ' vec3 reflected = reflect(incident,normalize(worldNormal));',
      ' float grazing = pow(1.0-abs(dot(incident,normalize(worldNormal))),3.1);',
      ' float deposits = (0.095*grimeUV.r + 0.21*grimeUV.g*grimeUV.g + 0.13*grimeUV.b)*paneData.r;',
      ' float reflection = smoothstep(-.45,.68,reflected.y);',
      ' vec3 neutral = mix(vec3(.24,.31,.22),vec3(.70,.79,.67),reflection);',
      ' vec3 tint = mix(neutral,vec3(.58,.58,.37), min(.8,deposits*1.8));',
      ' float alpha = .012 + .12*paneData.g + grazing*(.06 + reflection*.13) + deposits;',
      ' gl_FragColor = vec4(tint,clamp(alpha,.02,.49));',
      ' #include <tonemapping_fragment>',
      ' #include <colorspace_fragment>',
      '}',
    ].join('\n'),
  });
  return {
    stone:textured('stone',431,.017), soil:textured('soil',930,.023),
    iron:textured('metal',1255,.005,{metalness:.4,roughness:.66}),
    bark:textured('bark',321,.024,{side:T.DoubleSide}),
    wood:textured('wood',162,.012),
    clay:textured('clay',868,.007),
    moss:textured('moss',994,.016,{side:T.DoubleSide}),
    plain:std(), rubber:std({roughness:.79}),
    leaf:leaf(0,.29), fern:leaf(1,.64), banana:leaf(2,.41),
    accent:std({side:T.DoubleSide,roughness:.51}),
    glass,
    cracks:new T.MeshBasicMaterial({vertexColors:true,transparent:true,depthWrite:false,side:T.DoubleSide,opacity:.46,forceSinglePass:true}),
  };
}

export function paintedPlate(width,height,{title,subtitle,serial,style='cream'}={}) {
  const source=canvas(512,Math.round(512*height/width));
  const ctx=source.getContext('2d');
  const w=source.width,h=source.height;
  const rng=seeded(308+h+(title?.charCodeAt(1) ?? 0));
  const green=style==='green';
  ctx.fillStyle=green?'#263a32':'#d4c6a4';
  ctx.fillRect(0,0,w,h);
  for(let i=0;i<1800;i++){
    ctx.fillStyle=rng()>.63?'rgba(232,212,154,.17)':'rgba(58,43,25,.12)';
    ctx.fillRect(rand(rng,0,w),rand(rng,0,h),rand(rng,.5,4.5),rand(rng,.5,2.5));
  }
  ctx.strokeStyle=green?'#b6af85':'#6c6348';
  ctx.lineWidth=2.7;
  ctx.strokeRect(12,10,w-24,h-20);
  if (green) ctx.strokeRect(18,16,w-36,h-32);
  ctx.fillStyle=green?'#ede0b6':'#302d20';
  ctx.textAlign='center'; ctx.textBaseline='middle';
  ctx.font=(green?'600 ':'italic ') + Math.min(h*.45,(w-44)/(title.length*.47)) +'px Georgia';
  ctx.fillText(title,w/2,h*(subtitle ? .42 : .50),w-46);
  if(subtitle){
    ctx.font='600 '+(h*.15)+'px Arial';
    ctx.fillText(subtitle,w/2,h*.75,w-65);
  }
  if(serial){
    ctx.font='bold '+(h*.105)+'px Arial';
    ctx.fillText(serial,w/2,h*.20,w-60);
  }
  return new T.MeshStandardMaterial({map:texture(source,false),roughness:.78,metalness:.08,side:T.DoubleSide});
}

export const tintSet = values => values.map(color);

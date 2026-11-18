import * as T from './package/build/three.module.min.js';

export function seeded(seed) {
  return () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15,1 | seed);
    t = t + Math.imul(t ^ t >>> 7,61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
}
export const rand=seeded(1829);
const ink=seeded(702), tau=Math.PI*2;
const noise=new Float32Array(256*256);
for(let i=0;i<noise.length;i++)noise[i]=ink();
function smooth(x){return x*x*(3-2*x)}
function n(x,y,periodX,periodY) {
  const a=Math.floor(x), b=Math.floor(y), u=smooth(x-a),v=smooth(y-b);
  function get(i,j){return noise[(((j%periodY+periodY)%periodY)*251+((i%periodX+periodX)%periodX)*73)&65535]}
  return (get(a,b)*(1-u)+get(a+1,b)*u)*(1-v)+(get(a,b+1)*(1-u)+get(a+1,b+1)*u)*v;
}
export function canvas(w,h){if(globalThis.createSceneCanvas)return globalThis.createSceneCanvas(w,h);const c=document.createElement('canvas');c.width=w;c.height=h;return c;}
export function tex(c,repeat=true){
  const t=new T.CanvasTexture(c);
  t.colorSpace=T.SRGBColorSpace;
  if(repeat)t.wrapS=t.wrapT=T.RepeatWrapping;
  t.anisotropy=4; return t;
}
function grain(kind,size=256){
  const c=canvas(size,size),ctx=c.getContext('2d'),im=ctx.createImageData(size,size);
  for(let j=0;j<size;j++)for(let i=0;i<size;i++){
    let x=i/size,y=j/size,v=225,tt=ink(),rgb=[1,1,1];
    if(kind==='wood'||kind==='paint'){
      const warp=.022*Math.sin(tau*x+2*Math.cos(tau*y)) +.018*(n(x*4,y*7,4,7)-.5);
      const curl=y+warp, a=n(x*4,curl*89,4,89),b=n(x*10,curl*156,10,156);
      const dark=Math.pow((Math.cos(tau*(34*curl+1.2*n(x*3,y*6,3,6)))+1)/2,12);
      v=kind==='wood'?189+43*a+14*b-32*dark+10*tt:219+19*a+8*b-13*dark+6*tt;
      rgb=[1,.993,.978];
    }else if(kind==='cloth'){
      v=214+10*n(x*12,y*10,12,10)+13*tt+((i%4===0)?-18:5)+((j%4===0)?-13:3);
    }else if(kind==='earth'){
      const a=n(x*4,y*4,4,4),b=n(x*16,y*16,16,16);
      v=174+a*28+b*26+tt*29; if(tt>.985)v+=22; if(tt<.037)v-=30;rgb=[1,.989,.975];
    }else if(kind==='metal'){v=222+20*tt+9*n(x*22,y*8,22,8);}
    else if(kind==='leather'){v=207+19*tt+22*n(x*56,y*56,56,56);if(tt<.015)v-=21;}
    im.data.set([Math.min(255,v*rgb[0]),Math.min(255,v*rgb[1]),Math.min(255,v*rgb[2]),255],(i+j*size)*4);
  }
  ctx.putImageData(im,0,0);
  if(kind==='wood'||kind==='paint'){
    for(let i=0;i<(kind==='wood'?110:50);i++){
      const x=ink()*size,y=ink()*size,len=1+ink()**3*size*.3;
      ctx.strokeStyle=ink()>.48?'rgba(63,43,29,.18)':'rgba(255,247,210,.42)';ctx.lineWidth=.35+ink()*.8;
      ctx.beginPath();ctx.moveTo(x,y);ctx.bezierCurveTo(x+len*.3,y+.5,x+len*.7,y-.6,x+len,y);ctx.stroke();
    }
  }
  if(kind==='earth'){
    for(let i=0;i<270;i++){
      const x=ink()*size,y=ink()*size;
      ctx.fillStyle=ink()>.38?'#958f77':'#dfd5b8';ctx.beginPath();ctx.ellipse(x,y,ink()*1.9+.5,ink()*.8+.3,ink()*3,0,tau);ctx.fill();
    }
  }
  return tex(c)
}
export const materials={};
for(const [key,roughness,metalness] of [['wood',.82,0],['paint',.69,.025],['cloth',1,0],['earth',1,0],['metal',.46,.37],['leather',.79,0]]){
  materials[key]=new T.MeshStandardMaterial({map:grain(key,key==='wood'||key==='paint'?512:256),roughness,metalness,vertexColors:true,side:T.DoubleSide});
}
materials.matte=new T.MeshStandardMaterial({roughness:.92,vertexColors:true,side:T.DoubleSide});
materials.pottery=new T.MeshStandardMaterial({roughness:.29,metalness:.09,vertexColors:true,side:T.DoubleSide});
materials.lamp=new T.MeshStandardMaterial({color:0xffdea2,emissive:0xf0a84c,emissiveIntensity:.55,roughness:.36});
materials.glass=new T.MeshStandardMaterial({vertexColors:true,color:0xfaffed,roughness:.21,metalness:.08,transparent:true,opacity:.14,depthWrite:false,side:T.DoubleSide});
const atlases=[];let current=null;
function newAtlas(){
  const c=canvas(2048,2048),k='art'+atlases.length;
  const t=tex(c,false);
  materials[k]=new T.MeshStandardMaterial({map:t,roughness:.85,side:T.DoubleSide,vertexColors:true,alphaTest:.44});
  const a={c,ctx:c.getContext('2d'),key:k,x:3,y:3,row:0};atlases.push(a);return a;
}
export const cards={};
export function art(name,w,h,draw){
  let a=current||(current=newAtlas());
  if(a.x+w+3>2048){a.x=3;a.y+=a.row+6;a.row=0}
  if(a.y+h+3>2048)a=current=newAtlas();
  const c=canvas(w,h),ctx=c.getContext('2d');draw(ctx,w,h);a.ctx.drawImage(c,a.x,a.y);
  cards[name]={mat:a.key,u0:(a.x+.5)/2048,u1:(a.x+w-.5)/2048,v0:1-(a.y+h-.5)/2048,v1:1-(a.y+.5)/2048};
  a.x+=w+6;a.row=Math.max(a.row,h);materials[a.key].map.needsUpdate=true;
}
export const P={pine:'#336458',deep:'#193e36',trim:'#e2b564',red:'#854637',walnut:'#684531',chestnut:'#975e37',oak:'#b78451',maple:'#cda36c',
cream:'#e4d4a7',iron:'#343b36',brass:'#bb9554',bronze:'#876a40',canvas:'#e9d8af',stripe:'#bf7c37',blue:'#45676d',rose:'#ac6559',
sage:'#7b9179',leather:'#774931',black:'#292e2b',paper:'#dfcea5'};
export const clothColors=['#a95749','#dbab61','#54796c','#697b8c','#ded1ab','#b08186','#83724d','#56656b'];
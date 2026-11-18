// Original periodic material data. Channels stay linear throughout packing.
import fs from 'node:fs';
import {gzipSync} from 'node:zlib';
let seed=0x7137d2a1;
function random(){seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;}
const sat=x=>Math.max(0,Math.min(1,x)), byte=x=>Math.round(sat(x)*255);
const smooth=x=>x*x*(3-2*x),mix=(a,b,t)=>a+(b-a)*t;
function field(n){
  const a=Float32Array.from({length:n*n},random);
  return (u,v)=>{
    const x=u*n,y=v*n,i=Math.floor(x),j=Math.floor(y),f=smooth(x-i),g=smooth(y-j);
    const X=i&(n-1),Y=j&(n-1),U=(i+1)&(n-1),V=(j+1)&(n-1);
    return mix(mix(a[Y*n+X],a[Y*n+U],f),mix(a[V*n+X],a[V*n+U],f),g);
  };
}
function field3(n){
  const a=Float32Array.from({length:n*n*n},random),m=n-1;
  const get=(x,y,z)=>a[(((z&m)*n+(y&m))*n+(x&m))];
  return (u,v,w)=>{
    const x=u*n,y=v*n,z=w*n,i=Math.floor(x),j=Math.floor(y),k=Math.floor(z),f=smooth(x-i),g=smooth(y-j),h=smooth(z-k);
    return mix(mix(mix(get(i,j,k),get(i+1,j,k),f),mix(get(i,j+1,k),get(i+1,j+1,k),f),g),
               mix(mix(get(i,j,k+1),get(i+1,j,k+1),f),mix(get(i,j+1,k+1),get(i+1,j+1,k+1),f),g),h);
  };
}
function save(name,data){fs.writeFileSync('assets/'+name+'.gz',gzipSync(data,{level:8}));}
save('irradiance',fs.readFileSync('build/work/light.rgba'));
const size=1024,mask=size-1,L=size*size;
const gray=new Float32Array(L),height=new Float32Array(L),chips=new Float32Array(L);
const field8=field(8),field32=field(32),field128=field(128),field256=field(256);
for(let y=0;y<size;y++)for(let x=0;x<size;x++){
  const i=x+y*size,u=x/size,v=y/size;
  const coarse=field8(u,v)-.5,mid=field32(u,v)-.5,fine=field128(u,v)-.5,grit=field256(u,v)-.5;
  const dust=(random()+random()-.99);
  gray[i]=.555+coarse*.20+mid*.16+fine*.15+grit*.12+dust*.086;
  height[i]=.50+coarse*.07+mid*.09+fine*.12+grit*.16+dust*.072;
  chips[i]=.465+grit*.10+dust*.10;
}
// Pinholes and small, irregular entrained-air pockets with a shallow rim.
for(let k=0;k<7300;k++){
  const ox=random()*size,oy=random()*size,r=.36+Math.pow(random(),3)*2.75;
  const ry=r*(.56+random()*.66),strength=.09+random()*.28;
  for(let y=Math.floor(oy-ry*1.5);y<=oy+ry*1.5;y++)for(let x=Math.floor(ox-r*1.5);x<=ox+r*1.5;x++){
    const X=(x-ox)/r,Y=(y-oy)/ry,dist=Math.hypot(X,Y);
    if(dist>1.48)continue;
    const i=(y&mask)*size+(x&mask),core=1-smooth(sat((dist-.32)/.70)),rim=Math.exp(-Math.pow((dist-1.08)/.21,2));
    gray[i]-=core*strength;gray[i]+=rim*.049*(.4+Y*.6);
    height[i]-=core*(.16+strength);height[i]+=rim*.1;
  }
}
// Fractured flecks with quiet colour differences for honed aggregate.
for(let k=0;k<28200;k++){
  const ox=random()*size,oy=random()*size,r=.5+Math.pow(random(),2.15)*4.9;
  const sy=.34+random()*.77,angle=random()*6.283,ca=Math.cos(angle),sa=Math.sin(angle);
  const phase=random()*6.283,shade=.17+random()*.64;
  for(let y=Math.floor(oy-r*1.32);y<=oy+r*1.32;y++)for(let x=Math.floor(ox-r*1.32);x<=ox+r*1.32;x++){
    const x0=(x-ox)/r,y0=(y-oy)/r;
    const X=x0*ca+y0*sa,Y=(-x0*sa+y0*ca)/sy;
    const a=Math.atan2(Y,X),edge=1+.15*Math.cos(3*a+phase)+.12*Math.sin(5*a-.6*phase);
    const blend=sat((edge-Math.hypot(X,Y))*r*1.7);
    if(blend){const i=(y&mask)*size+(x&mask);chips[i]=mix(chips[i],shade+.033*X,blend);}
  }
}
const surface=Buffer.allocUnsafe(L*4);
for(let y=0;y<size;y++)for(let x=0;x<size;x++){
  const i=y*size+x,k=4*i;
  surface[k]=byte(gray[i]);
  surface[k+1]=byte(.5+(height[y*size+((x-1)&mask)]-height[y*size+((x+1)&mask)])*.97);
  surface[k+2]=byte(.5+(height[((y-1)&mask)*size+x]-height[((y+1)&mask)*size+x])*.97);
  surface[k+3]=byte(chips[i]);
}
save('surface',surface);
const sz=64,volume=Buffer.allocUnsafe(sz**3*4);
const f4=field3(4),f8=field3(8),f16=field3(16),f32=field3(32);
for(let z=0;z<sz;z++)for(let y=0;y<sz;y++)for(let x=0;x<sz;x++){
  const u=x/sz,v=y/sz,w=z/sz,i=4*(x+sz*(y+sz*z));
  volume[i]=byte(f4(u,v,w)*.42+f8(u,v,w)*.32+f16(u,v,w)*.18+f32(u,v,w)*.08);
  volume[i+1]=byte(random());
  volume[i+2]=byte(f8(u+.31,v+.17,w+.07)*.65+f16(u,v,w)*.24+f32(u,v,w)*.11);
  volume[i+3]=byte(f32(u+.23,v+.48,w+.17));
}
save('volume',volume);
console.log('Packed original daylight, aggregate, cement relief and volume textures.');

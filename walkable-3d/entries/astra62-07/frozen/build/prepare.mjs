import fs from 'node:fs';
import {patches,obstacles,portals,signs,sun,albedos,M,ramp} from '../world.mjs';

fs.mkdirSync('assets',{recursive:true});
fs.mkdirSync('build/work',{recursive:true});
const width=2048, pad=2;
const sorted=[...patches].sort((a,b)=>b.h-a.h||b.w-a.w);
let shelfX=0,shelfY=0,shelfHeight=0;
for(const p of sorted){
  if(shelfX+p.w+pad*2>width){shelfX=0;shelfY+=shelfHeight;shelfHeight=0;}
  p.x=shelfX+pad;p.y=shelfY+pad;
  shelfX+=p.w+pad*2;shelfHeight=Math.max(shelfHeight,p.h+pad*2);
}
const height=2**Math.ceil(Math.log2(shelfY+shelfHeight));
const groups=new Map();
let resinIndex=0;
for(const p of patches){
  const lo=[Infinity,Infinity,Infinity],hi=lo.map(x=>-x);
  for(const {p:v} of p.verts)for(let d=0;d<3;d++){lo[d]=Math.min(lo[d],v[d]);hi[d]=Math.max(hi[d],v[d]);}
  const zone=lo[2]>=3.05?'g':hi[2]<=-4.78?'h':'r';
  const key=p.mat===M.resin?'s'+resinIndex++:zone+'-'+p.mat;
  if(!groups.has(key))groups.set(key,{mat:p.mat,patches:[],lo:[...lo],hi:[...hi]});
  const g=groups.get(key);g.patches.push(p);
  for(let d=0;d<3;d++){g.lo[d]=Math.min(g.lo[d],lo[d]);g.hi[d]=Math.max(g.hi[d],hi[d]);}
}
const ver=[],idx=[],draw=[];
for(const g of [...groups.values()].sort((a,b)=>a.mat-b.mat)){
  const offset=idx.length;
  for(const p of g.patches){
    const base=ver.length/10;
    for(let j=0;j<=p.nv;j++)for(let i=0;i<=p.nu;i++){
      const v=p.verts[j*(p.nu+1)+i];
      ver.push(...v.p,...v.n,...v.uv,(p.x+.5+i/p.nu*(p.w-1))/width,(p.y+.5+j/p.nv*(p.h-1))/height);
    }
    for(let j=0;j<p.nv;j++)for(let i=0;i<p.nu;i++){
      const a=base+j*(p.nu+1)+i,b=a+1,d=a+p.nu+1,c=d+1;
      for(const tri of [[a,b,c],[a,c,d]]){
        const vv=tri.map(ind=>p.verts[ind-base]);
        const e=vv[1].p.map((x,k)=>x-vv[0].p[k]),f=vv[2].p.map((x,k)=>x-vv[0].p[k]);
        const face=[e[1]*f[2]-e[2]*f[1],e[2]*f[0]-e[0]*f[2],e[0]*f[1]-e[1]*f[0]];
        const alignment=face.reduce((v,a,k)=>v+a*(vv[0].n[k]+vv[1].n[k]+vv[2].n[k]),0);
        idx.push(tri[0],tri[alignment<0?2:1],tri[alignment<0?1:2]);
      }
    }
  }
  draw.push({mat:g.mat,first:offset,count:idx.length-offset,lo:g.lo,hi:g.hi});
}
if(!ver.every(Number.isFinite))throw Error('Non-finite geometry');
const vb=Buffer.from(Float32Array.from(ver).buffer),ib=Buffer.from(Uint32Array.from(idx).buffer);
fs.writeFileSync('assets/museum.bin',Buffer.concat([vb,ib]));
fs.writeFileSync('assets/museum.json',JSON.stringify({vertexBytes:vb.length,indices:idx.length,draw,obstacles,signs,sun,albedos,portals,ramp}));

// Compact build-only interchange for the offline irradiance bake.
const chunks=[];
function ints(...v){chunks.push(Buffer.from(Int32Array.from(v).buffer));}
function floats(...v){chunks.push(Buffer.from(Float32Array.from(v).buffer));}
ints(width,height,pad,patches.length,portals.length,albedos.length);
floats(...sun);
for(const rgb of albedos)floats(...rgb);
for(const q of portals)floats(...q.p,...q.u,...q.v);
for(const p of patches){
  ints(p.mat,p.occlude?1:0,p.nu,p.nv,p.x,p.y,p.w,p.h);
  const a=new Float32Array(p.verts.length*6);
  p.verts.forEach((v,i)=>{a.set(v.p,i*6);a.set(v.n,i*6+3);});
  chunks.push(Buffer.from(a.buffer));
}
fs.writeFileSync('build/work/input.bin',Buffer.concat(chunks));
console.log(JSON.stringify({patches:patches.length,vertices:ver.length/10,triangles:idx.length/3,batches:draw.length,atlas:[width,height],shadedTexels:patches.reduce((a,p)=>a+p.w*p.h,0)}));

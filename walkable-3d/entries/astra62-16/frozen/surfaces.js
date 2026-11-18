'use strict';
/* Tileable, original relief and colour maps, baked once at build time. */
function bakeSurfaces(size=256){
 const bytes=new Uint8Array(size*size*4*14);
 const cache=new Map();
 function field(nx,ny,salt=0){
  const key=nx+':'+ny+':'+salt;if(cache.has(key))return cache.get(key);
  const grid=new Float32Array(nx*ny);
  let r=(nx*110351+ny*8191+salt*99281+7519)>>>0;
  for(let i=0;i<grid.length;i++){r=(Math.imul(1664525,r)+1013904223)>>>0;grid[i]=r/4294967296}
  const vals=new Float32Array(size*size);
  for(let y=0;y<size;y++)for(let x=0;x<size;x++){
   const u=x/size*nx,v=y/size*ny,ix=Math.floor(u),iy=Math.floor(v);
   let a=u-ix,b=v-iy;a=a*a*(3-2*a);b=b*b*(3-2*b);
   const at=(i,j)=>grid[(j%ny)*nx+(i%nx)];
   vals[y*size+x]=((1-a)*at(ix,iy)+a*at(ix+1,iy))*(1-b)+((1-a)*at(ix,iy+1)+a*at(ix+1,iy+1))*b
  }
  cache.set(key,vals);return vals
 }
 const lo=field(4,4),med=field(13,16),hi=field(48,53),fuzz=field(193,197);
 const fibers=field(7,117),streak=field(3,51),warp=field(3,9),pore=field(22,121);
 const clamp=(x,a=0,b=1)=>Math.min(b,Math.max(a,x));
 for(let layer=0;layer<14;layer++){
  const H=new Float32Array(size*size),C=new Float32Array(size*size);
  for(let i=0;i<H.length;i++){
   const x=(i%size)/size,y=Math.floor(i/size)/size;
   const f=fuzz[i]-.5,l=lo[i]-.5,m=med[i]-.5,h=hi[i]-.5;
   let c=.54,relief=.02*l;
   if(layer===1){
    const dx=(x-.58)*2.6,dy=(y-.47)*6.2,knot=Math.exp(-dx*dx*5-dy*dy*4);
    const wave=y*25+.54*Math.sin(TAU*x)+1.6*warp[i]+.43*lo[i]+knot*3.2;
    const grain=Math.pow(.5+.5*Math.cos(TAU*wave),4.7),pits=Math.max(0,pore[i]-.72)*2;
    c=.57-.26*grain+.35*(fibers[i]-.5)+.27*(streak[i]-.5)+.10*f-.21*knot-.35*pits;
    relief=.20*(fibers[i]-.5)-.16*grain-.1*pits
   }else if(layer===2){
    const vein=Math.exp(-Math.abs(l+.29*m+.12*h-.07)*49);
    c=.52+.25*l+.24*m+.28*h+.17*f+.10*vein;
    relief=.2*l+.22*m+.12*h+.065*f+.035*vein
   }else if(layer===3){
    c=.55+.27*l+.18*m+.16*h+.14*f;
    relief=.2*m+.17*h+.06*f
   }else if(layer===4){c=.52+.30*l+.17*h+.16*f+.11*(fibers[i]-.5);relief=.025*h+.016*f}
   else if(layer===5){
    const dot=fuzz[i]>.8&&hi[i]>.68?.22:0;
    c=.55+.11*m+.1*l+.055*f+.042*Math.sin(y*TAU*46+warp[i]*.5)-dot;relief=.016*m+.014*Math.sin(y*TAU*46)-dot*.14
   }else if(layer===6){
    const rib=Math.exp(-Math.abs(x-.5)*86),side=Math.abs(x-.5);
    const vein=Math.pow(.5+.5*Math.cos(TAU*(y*8-side*4.8+.12*Math.cos(TAU*y))),14)*(1-Math.min(1,side*1.4));
    c=.47+.23*rib+.13*vein+.15*m+.12*l+.12*(1-side*2);relief=.13*rib+.035*vein+.035*m
   }else if(layer===7){
    const a=Math.sin(TAU*x*54),b=Math.sin(TAU*y*59),weave=.10*a+.095*b+.08*a*b;
    c=.52+weave+.16*m+.12*f;relief=weave*.47
   }else if(layer===9||layer===13){c=.5+.12*l;relief=.020*m+.013*l}
   else if(layer===11){c=.45+.36*m+.53*h+.37*f;relief=.29*h+.14*f}
   else if(layer===12){c=.57+.07*l+.13*f+.07*Math.cos(TAU*119*y);relief=.03*f}
   C[i]=clamp(c);H[i]=relief
  }
  for(let y=0;y<size;y++)for(let x=0;x<size;x++){
   const i=y*size+x,at=(a,b)=>H[((b+size)%size)*size+(a+size)%size],o=(layer*size*size+i)*4;
   bytes[o]=C[i]*255;bytes[o+1]=clamp(.5+(at(x-1,y)-at(x+1,y))*1.5)*255;
   bytes[o+2]=clamp(.5+(at(x,y-1)-at(x,y+1))*1.5)*255;bytes[o+3]=255
  }
 }
 return bytes
}

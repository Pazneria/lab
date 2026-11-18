import {M,clamp,mix} from './geometry.mjs';
// One periodic, mipmapped material library. RGBA = reflectance variation, tangent slopes, microsurface roughness.
export const textureSize=256, textureLayers=20;
const N=textureSize, TAU=2*Math.PI;
function hash(x,y,s=0){let h=(Math.imul(x,1597334677)^Math.imul(y,3812015801)^Math.imul(s+9,958282887))>>>0;h=Math.imul(h^(h>>>16),2246822519);return ((h^(h>>>15))>>>0)/4294967295;}
function periodic(x,y,fx,fy,k){
 x*=fx;y*=fy;let a=Math.floor(x),b=Math.floor(y),u=x-a,v=y-b;
 u=u*u*(3-2*u);v=v*v*(3-2*v);
 const X=(a%fx+fx)%fx,Y=(b%fy+fy)%fy;
 return mix(mix(hash(X,Y,k),hash((X+1)%fx,Y,k),u),mix(hash(X,(Y+1)%fy,k),hash((X+1)%fx,(Y+1)%fy,k),u),v);
}
export function makeMaterials(){
 let out=Buffer.alloc(N*N*textureLayers*4),heights=new Float32Array(N*N);
 for(let m=0;m<textureLayers;m++){
  let st=N*N*4*m;
  for(let j=0;j<N;j++)for(let i=0;i<N;i++){
   let idx=j*N+i,u=i/N,v=j/N,grain=hash(i,j,6)-.5,n=periodic(u,v,7,7,23)-.5,l=periodic(u,v,3,3,36)-.5,wear=periodic(u,v,36,36,9)-.5;
   let lum=.51+.12*n+.06*grain,ht=.06*grain+.04*n,rough=.68+.1*n;
   if(m===M.PAINT){
    lum=.51+.15*n+.10*l+.07*grain+.04*wear;
    ht=.083*grain+.075*wear+.037*n;rough=.49+.13*n+.09*wear;
    const speck=hash(i,j,47);if(speck>.996&&n<.08){lum-=.18;ht-=.06;}
   }else if(m===M.METAL||m===M.BRASS){
    let brush=periodic(u,v,4,118,29)-.5;lum=.51+.23*brush+.09*grain+.12*n;
    ht=.069*brush+.028*grain;rough=(m===M.BRASS?.34:.39)+.14*n+.1*brush;
   }else if(m===M.LINEN||m===M.CARPET||m===M.QUILT){
    const coarse=m===M.CARPET,wx=coarse?40:54,wy=coarse?32:49;
    let x=u*wx+.035*Math.sin(v*TAU*5)+.024*n,y=v*wy+.036*Math.sin(u*TAU*3);
    let warp=Math.cos(x*TAU),weft=Math.cos(y*TAU),over=(Math.floor(x+.5)+Math.floor(y+.5))&1;
    let ridges=over?.65*warp+.20*weft:.65*weft+.2*warp;
    lum=.51+.19*ridges+.19*grain+.12*n;ht=.14*ridges+.055*grain;rough=.96;
    if(m===M.QUILT){
     let seam=Math.min(Math.abs(Math.sin((u+v)*Math.PI*3)),Math.abs(Math.sin((u-v)*Math.PI*3)));
     let stitch=Math.exp(-seam*32);ht-=stitch*.18;lum-=stitch*.19;
     lum+=stitch*.33*Math.pow(Math.max(0,Math.cos((u*107+v*97)*TAU)),2);
    }
    if(coarse){let band=(Math.floor(v*8)%4)===0?.029:-.016;lum+=band+.10*(periodic(u,v,8,64,78)-.5);}
   }else if(m===M.WOOD){
    let swing=.078*Math.sin(u*TAU+.5)+.030*Math.sin(u*TAU*2+v*TAU*2)+.017*periodic(u,v,4,6,6);
    let rings=Math.sin(TAU*(v*13+swing*8+.52*Math.sin(v*TAU*2)));
    let fibre=periodic(u,v+swing,3,112,43)-.5;
    lum=.55+.115*rings+.21*fibre+.17*periodic(u,v+swing,4,32,14)-.085+.07*grain;
    const pore=Math.max(0,.16-periodic(u,v+swing,11,93,19));lum-=pore*.7;ht=.05*rings+.09*fibre-.13*pore;rough=.55+.12*n;
   }else if(m===M.DECK){
    const tx=(u*20)%1-.5,ty=(v*20)%1-.5;
    let stud=Math.exp(-(tx*tx+ty*ty)*20);
    lum=.506+.21*grain+.14*n+.16*wear+.054*stud;ht=.09*grain+.050*wear+.080*stud;rough=.79;
    if(hash(i,j,51)>.975)lum+=.13;
   }else if(m===M.RUBBER){lum=.46+.13*n+.11*grain;ht=.055*grain+.04*wear;rough=.87;}
   else if(m===M.CERAMIC){lum=.52+.07*l+.031*grain+.025*wear;ht=.012*grain+.016*wear;rough=.29+.09*n;}
   else if(m===M.PAPER||m===M.PRINT){lum=.515+.054*grain+.035*n;ht=.017*grain;rough=.91;}
   else if(m===M.STONE){
    let strata=Math.sin((v*8+1.6*n+.5*Math.sin(u*TAU))*TAU);lum=.51+.37*wear+.25*n+.16*grain+.07*strata;
    ht=.17*grain+.20*wear+.12*n+.055*strata;rough=.89;
   }else if(m===M.LIFE){lum=.51+.26*n+.20*wear+.14*grain;ht=.065*grain+.11*wear;rough=.70;}
   else if(m===M.DARKGLASS||m===M.JAR||m===M.GLASS){lum=.51+.023*n;ht=.007*n;rough=.15+.04*n;}
   else if(m===M.FISH){lum=.53+.16*Math.sin(u*TAU*19)*Math.sin(v*TAU*13);ht=.035*grain;rough=.40;}
   heights[idx]=ht;let k=st+4*idx;out[k]=Math.round(255*clamp(lum));out[k+3]=Math.round(255*clamp(rough));
  }
  for(let j=0;j<N;j++)for(let i=0;i<N;i++){
   let dx=heights[j*N+((i+1)%N)]-heights[j*N+((i+N-1)%N)],dy=heights[((j+1)%N)*N+i]-heights[((j+N-1)%N)*N+i];
   let k=st+4*(j*N+i);out[k+1]=Math.round(255*clamp(.5-dx*.48));out[k+2]=Math.round(255*clamp(.5-dy*.48));
  }
 }
 return out;
}


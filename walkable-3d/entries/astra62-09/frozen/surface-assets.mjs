// Offline material synthesis. Generates texture data only. No graphics context is created.
import fs from 'node:fs';
import {buildDeckWear} from './deck-wear.mjs';
import zlib from 'node:zlib';
import {T,PI,TAU,seeded} from './geometry.mjs';
const dir=new URL('./assets/',import.meta.url);
const save=(name,buf)=>fs.writeFileSync(new URL(name,dir),buf);
const clamp=(a,lo=0,hi=1)=>Math.min(hi,Math.max(lo,a));
const smooth=t=>t*t*(3-2*t);
const mix=(a,b,t)=>a+(b-a)*t;
const crc=new Uint32Array(256);
for(let i=0;i<256;i++){let n=i;for(let j=0;j<8;j++)n=(n>>>1)^((n&1)?0xedb88320:0);crc[i]=n>>>0}
function chunk(name,data){
  const dst=Buffer.alloc(12+data.length);dst.writeUInt32BE(data.length);dst.write(name,4);data.copy(dst,8);let s=0xffffffff;
  for(let j=4;j<8+data.length;j++)s=(s>>>8)^crc[(s^dst[j])&255];dst.writeUInt32BE((s^0xffffffff)>>>0,8+data.length);return dst;
}
function png(name,w,h,arr){
  const header=Buffer.alloc(13);header.writeUInt32BE(w);header.writeUInt32BE(h,4);header[8]=8;header[9]=2;
  const scan=Buffer.alloc((w*3+1)*h);
  for(let j=0;j<h;j++)Buffer.from(arr.buffer,arr.byteOffset+j*w*3,w*3).copy(scan,j*(w*3+1)+1);
  save(name,Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]),chunk('IHDR',header),chunk('IDAT',zlib.deflateSync(scan,{level:6})),chunk('IEND',Buffer.alloc(0))]));
}
function hash(x,y,z){
  let h=Math.imul(x,374761393)+Math.imul(y,668265263)+Math.imul(z,1274126177)|0;
  h=Math.imul(h^(h>>>13),1274126177);return ((h^(h>>>16))>>>0)/4294967296;
}
function noise(x,y,z){
  const i=Math.floor(x),j=Math.floor(y),k=Math.floor(z),u=smooth(x-i),v=smooth(y-j),w=smooth(z-k);
  return mix(mix(mix(hash(i,j,k),hash(i+1,j,k),u),mix(hash(i,j+1,k),hash(i+1,j+1,k),u),v),mix(mix(hash(i,j,k+1),hash(i+1,j,k+1),u),mix(hash(i,j+1,k+1),hash(i+1,j+1,k+1),u),v),w);
}
function tileNoise(x,y,n,seed){
  x=x*n;y=y*n;const i=Math.floor(x),j=Math.floor(y),u=smooth(x-i),v=smooth(y-j);
  const ax=i%n,ay=j%n,bx=(i+1)%n,by=(j+1)%n;
  return mix(mix(hash(ax,ay,seed),hash(bx,ay,seed),u),mix(hash(ax,by,seed),hash(bx,by,seed),u),v);
}
function surface(){
  const N=768,rng=seeded(9304),pixels=new Uint8Array(N*N*3),scratches=new Float32Array(N*N);
  // Long striations, short nicks and intermittent pairs. Tile edges wrap continuously.
  for(let j=0;j<1640;j++){
    let x=rng()*N,y=rng()*N;const length=1+Math.pow(rng(),4)*90;
    const angle=j%4===0?-.18+(rng()-.5)*.24:rng()*PI;
    const dx=Math.cos(angle),dy=Math.sin(angle),gain=.16+.79*rng(),bend=(rng()-.5)*.015;
    for(let i=0;i<length;i+=.56){
      const px=x+dx*i-dy*bend*i*i/length,py=y+dy*i+dx*bend*i*i/length,ix=Math.floor(px),iy=Math.floor(py);
      const frac=clamp(Math.min(i,length-i)/2,.2,1)*gain;
      for(let jy=0;jy<2;jy++)for(let jx=0;jx<2;jx++){
        const q=((iy+jy+N)%N)*N+(ix+jx+N)%N,weight=(1-Math.abs(px-ix-jx))*(1-Math.abs(py-iy-jy));
        scratches[q]=Math.min(1,scratches[q]+frac*weight*.68);
      }
    }
  }
  for(let y=0;y<N;y++)for(let x=0;x<N;x++){
    const u=x/N,v=y/N,i=y*N+x,grain=rng(),n=tileNoise(u,v,9,5)*.47+tileNoise(u,v,29,4)*.31+tileNoise(u,v,83,36)*.22;
    pixels[i*3]=Math.round(clamp(.18+grain*.31+n*.47)*255);
    pixels[i*3+1]=Math.round(clamp(scratches[i])*255);
    pixels[i*3+2]=Math.round(clamp(n*.84+grain*.16)*255);
  }
  png('finish.png',N,N,pixels);
}
function moon(){
  const W=1536,H=768,N=W*H,h=new Float32Array(N),a=new Float32Array(N),pix=new Uint8Array(N*3);
  const lonX=new Float64Array(W),lonZ=new Float64Array(W);
  for(let i=0;i<W;i++){const u=(i+.5)/W*TAU;lonX[i]=-Math.cos(u);lonZ[i]=Math.sin(u)}
  for(let j=0;j<H;j++){
    const theta=PI*(j+.5)/H,cr=Math.sin(theta),y=Math.cos(theta);
    for(let i=0;i<W;i++){
      const x=lonX[i]*cr,z=lonZ[i]*cr,idx=j*W+i;
      const warp=noise(x*3+2,y*3-5,z*3+7);
      const basin=noise(x*6.1+warp,y*6.1-warp*.6,z*6.1+warp*.83);
      const ranges=1-Math.abs(2*noise(x*14.4+warp*1.7,y*14.4+warp,z*14.4-warp)-1);
      const crag=noise(x*52,y*52+4,z*52-5),grit=noise(x*140,y*140,z*140);
      h[idx]=basin*.007+ranges*.0024+crag*.0012+grit*.00041;
      a[idx]=.26+smooth(clamp((basin-.25)/.51))*.27+ranges*.105+crag*.085+grit*.046;
    }
  }
  const rng=seeded(86129);
  for(let j=0;j<4400;j++){
    const cx=rng()*W,cy=rng()*(H-24)+12;
    const rad=j<9?23+rng()*21:j<60?10+rng()*19:j<550?3+rng()*9:1+rng()*3.7;
    const sinus=Math.max(.15,Math.sin(PI*cy/H)),rx=rad/sinus,outer=1.62;
    const strength=.50+rng()*.66,tilt=rng()*TAU,frequency=7+Math.floor(rng()*5);
    for(let yy=Math.max(0,Math.floor(cy-rad*outer));yy<Math.min(H,cy+rad*outer+1);yy++)for(let xx=Math.floor(cx-rx*outer);xx<cx+rx*outer+1;xx++){
      const u=(xx+.5-cx)/rx,v=(yy+.5-cy)/rad,theta=Math.atan2(v,u);
      const r=Math.hypot(u,v)*(1+.027*Math.sin(theta*frequency+tilt)+.017*Math.cos(theta*6-tilt));
      if(r>=outer)continue;
      const idx=yy*W+(xx+W)%W;
      const bowl=-Math.pow(Math.max(0,1-r*r),1.2)*.205;
      const rim=Math.exp(-Math.pow((r-.94)/.125,2))*.115;
      const central=rad>17?Math.exp(-r*r/.025)*.084:0;
      h[idx]+=strength*rad/H*PI*(bowl+rim+central);
      const eject=r>1?Math.pow(1-(r-1)/.62,2)*(.49+.51*Math.pow(Math.cos(theta*frequency+tilt),10)):0;
      a[idx]=clamp(a[idx]+(rim*.50+eject*.052-Math.max(0,1-r)*.045)*strength);
    }
  }
  const sun=[-.70,.58,.414],slen=Math.hypot(...sun);sun.forEach((v,i)=>sun[i]=v/slen);
  for(let j=0;j<H;j++){
    const t=(j+.5)/H*PI,s=Math.sin(t),ny=Math.cos(t);
    for(let i=0;i<W;i++){
      const idx=j*W+i,nx=lonX[i]*s,nz=lonZ[i]*s;
      const du=(h[j*W+(i+1)%W]-h[j*W+(i+W-1)%W])/(2*TAU/W*Math.max(.03,s));
      const dv=(h[Math.min(H-1,j+1)*W+i]-h[Math.max(0,j-1)*W+i])/(2*PI/H);
      const xx=nx-du*lonZ[i]-dv*lonX[i]*ny,yy=ny+dv*s,zz=nz+du*lonX[i]-dv*lonZ[i]*ny;
      const lit=Math.max(0,(xx*sun[0]+yy*sun[1]+zz*sun[2])/Math.hypot(xx,yy,zz));
      const lum=(.037+.96*lit)*a[idx],v=255*Math.pow(lum,.53),blue=.99+.048*(1-lit);
      pix[idx*3]=clamp(v*.891,0,255);pix[idx*3+1]=clamp(v*.963,0,255);pix[idx*3+2]=clamp(v*blue,0,255);
    }
  }
  png('satellite.png',W,H,pix);
}
function environment(){
  const W=256,H=128,half=new Uint16Array(W*H*4);
  // An HDR reflection probe matching the deck finish, mullions, warm shop and ceiling strips.
  for(let j=0;j<H;j++)for(let i=0;i<W;i++){
    const lat=((j+.5)/H-.5)*PI,lon=((i+.5)/W-.5)*TAU;
    const dx=Math.cos(lon)*Math.cos(lat),dy=Math.sin(lat),dz=Math.sin(lon)*Math.cos(lat);
    const tx=Math.abs(8.25/dx),ty=dy>0?4.36/dy:-1.78/dy,tz=Math.abs((dz>0?6.55:7.85)/dz);
    const d=Math.min(tx,ty,tz),x=dx*d,y=1.78+dy*d,z=.65+dz*d;
    let rgb;
    if(d===ty&&dy>0){
      const fixture=[-5.26,-1.77,1.70,5.22].some(zz=>Math.abs(zz-z)<.30)&&Math.abs(Math.abs(x)-4.22)<1.41;
      const rib=Math.abs(Math.sin((z+.05)*PI/3.49))<.11;
      const a=fixture?7.85:rib?.14:.36;rgb=[a*1.05,a*1.01,a*.93];
    }else if(d===ty){
      const seam=Math.min(Math.abs(Math.sin(x*PI/1.4)),Math.abs(Math.sin(z*PI/1.44)))<.045;
      const a=seam?.055:.13+hash(i,j,3)*.015;rgb=[a*.88,a*.98,a];
    }else{
      const port=dz<0&&d===tz&&x>-4.66&&x<3.81&&y>3.03&&y<5.33;
      const shop=d===tx&&dx>0&&z>-2.35&&z<3.75&&y<3.85;
      if(port)rgb=[.43,.64,.86];
      else if(shop&&Math.abs(y-2.75)<.16)rgb=[4.9,3.68,1.98];
      else {const a=(shop?.23:.32)*(y<.45?.52:1)*(.88+.12*Math.sin((d===tx?z:x)*5.2));rgb=[a*(shop?1.15:.97),a,a*(shop?.77:1.0)]}
    }
    for(let c=0;c<4;c++)half[(j*W+i)*4+c]=T.DataUtils.toHalfFloat(c===3?1:rgb[c]);
  }
  save('studio.f16',Buffer.from(half.buffer));
}
fs.mkdirSync(dir,{recursive:true});surface();moon();environment();
const deckWear=buildDeckWear();png('deck-use.png',deckWear.w,deckWear.h,deckWear.pixels);
console.log('Generated finish, cratered satellite and HDR reflection textures.');


import {seeded,PI} from './geometry.mjs';

// Unique deck wear follows the service cart's turning radius and the actual repair positions.
export function buildDeckWear(){
  const w=1280,h=896,f=new Float32Array(w*h*3),rng=seeded(319817);
  const px=x=>(x+8.4)/20.8*w,py=z=>(z+7.2)/14.4*h;
  function dab(x,z,a,b,angle,gain,ch,rough=.11){
    const cx=px(x),cy=py(z),ca=Math.cos(angle),sa=Math.sin(angle);
    const ex=(Math.abs(a*ca)+Math.abs(b*sa))*w/20.8,ey=(Math.abs(a*sa)+Math.abs(b*ca))*h/14.4;
    for(let j=Math.max(0,Math.floor(cy-ey-1));j<=Math.min(h-1,Math.ceil(cy+ey+1));j++)for(let i=Math.max(0,Math.floor(cx-ex-1));i<=Math.min(w-1,Math.ceil(cx+ex+1));i++){
      const dx=(i+.5-cx)*20.8/w,dz=(j+.5-cy)*14.4/h;
      const u=(dx*ca+dz*sa)/a,v=(-dx*sa+dz*ca)/b,r=u*u+v*v;
      if(r>=1)continue;
      const edge=Math.min(1,(1-r)*3),noise=.97-rough*rng();
      const idx=(j*w+i)*3+ch;f[idx]=Math.min(1,f[idx]+gain*edge*(1-.34*r)*noise);
    }
  }
  // Burnished passage on both sides of the unit with a cleaner centre to each worn swath.
  for(const [x,z,ax,bz,a] of [[.08,3.50,3.85,.73,-.025],[3.97,.56,.73,2.30,.03],[-4.15,.48,.69,2.56,-.06],[-.12,-2.31,4.25,.65,.04],[7.1,1.38,3.53,.64,-.05],[-5.98,1.38,.74,1.55,.13]]){
    dab(x,z,ax,bz,a,.56,0,.14);
  }
  for(let j=0;j<29;j++){
    const t=rng(),x=3.02+5.6*t,z=3.24-1.25*Math.sin(t*PI*.65),a=-.32+.57*t;
    for(const s of [-1,1])dab(x,z+s*.34,.057+rng()*.23,.018+rng()*.014,a,.14+rng()*.14,2,.54);
  }
  // The removed cover left two narrow interrupted caster arcs near its parking position.
  for(let j=0;j<138;j++){
    if(rng()<.18)continue;
    const a=-.92+j/138*1.73;
    for(const r of [1.62,2.30])dab(4.22+r*Math.cos(a),-2.96+r*Math.sin(a),.043,.024,a+PI/2,.07+rng()*.05,2,.51);
  }
  for(let j=0;j<230;j++){
    const x=-3.38+rng()*6.79,z=.65+(rng()>.38?1:-1)*(1.20+rng()*.74);
    if(rng()<.23)dab(x,z,.012+rng()*.034,.010+rng()*.024,rng()*PI,.48+rng()*.36,1,.23);
    else dab(x,z,.035+rng()*.17,.009+rng()*.016,rng()*.61,.15,2,.42);
  }
  for(const [x,z,ax,bz] of [[-2.79,1.82,.61,.28],[1.53,-.57,.49,.28],[6.43,-2.68,.48,.22],[10.93,1.64,.28,.16]]){
    dab(x,z,ax,bz,-.18,.37,1,.24);
    for(let j=0;j<11;j++)dab(x+(rng()-.5)*ax*1.87,z+(rng()-.5)*bz*1.7,ax*(.04+rng()*.23),bz*(.05+rng()*.25),rng()*PI,.26,1,.18);
  }
  for(let j=0;j<170;j++){
    const side=rng()>.5?1:-1,x=rng()*7.68-3.84,z=.66+side*(2.05+rng()*.85);
    dab(x,z,.017+rng()*.121,.012+rng()*.039,rng()*PI,.04+rng()*.21,2,.6);
  }
  const pixels=new Uint8Array(w*h*3);
  for(let i=0;i<f.length;i++)pixels[i]=Math.round(f[i]*255);
  return {w,h,pixels};
}


// Original geometry in metres. +Y is up; visitors travel toward -Z.
export const M = Object.freeze({
  wall: 0, board: 1, floor: 2, soffit: 3, stone: 4, rust: 5, oxide: 6,
  cut: 7, resin: 8, basalt: 9, oak: 10, bronze: 11, joint: 12, plaster: 13,
  glazing: 14, ink: 15, whiteInk: 16, bronzePlate: 17, paleBase: 18, arris: 19, roofGlass: 20
});
export const albedos = [
  [.46,.43,.38], [.35,.32,.27], [.30,.29,.265], [.42,.405,.37],
  [.75,.65,.48], [.37,.125,.057], [.175,.105,.08], [.43,.28,.18],
  [.085,.54,.43], [.13,.13,.115], [.47,.26,.10], [.19,.155,.114],
  [.062,.061,.057], [.66,.65,.60], [.30,.355,.35], [.08,.07,.06],
  [.79,.75,.63], [.155,.15,.13], [.55,.525,.46], [.448,.425,.373], [.84,.90,.89]
];
export const sun = [-.412,.831,.371];
export const add=(a,b)=>a.map((x,i)=>x+b[i]);
export const sub=(a,b)=>a.map((x,i)=>x-b[i]);
export const mul=(a,k)=>a.map(x=>x*k);
export const dot=(a,b)=>a.reduce((v,x,i)=>v+x*b[i],0);
export const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
export const len=a=>Math.hypot(...a);
export const norm=a=>mul(a,1/(len(a)||1));
export const mix=(a,b,t)=>add(mul(a,1-t),mul(b,t));
const TAU=Math.PI*2,Y=[0,1,0];
const clamp=(v,lo,hi)=>Math.max(lo,Math.min(hi,v));
export const patches=[], obstacles=[], portals=[];
const tr=(p,o,yaw)=>[o[0]+Math.cos(yaw)*p[0]+Math.sin(yaw)*p[2],o[1]+p[1],o[2]-Math.sin(yaw)*p[0]+Math.cos(yaw)*p[2]];
const rot=(p,yaw)=>tr(p,[0,0,0],yaw);
function patch(mat,nu,nv,P,N,lenU,lenV,density=8,opt={}) {
  const verts=[];
  for(let j=0;j<=nv;j++)for(let i=0;i<=nu;i++){
    const u=i/nu,v=j/nv;
    verts.push({p:P(u,v),n:norm(N(u,v)),uv:opt.uv?opt.uv(u,v):[u*lenU,v*lenV]});
  }
  patches.push({mat,nu,nv,verts,w:clamp(Math.ceil(lenU*density)+1,2,640),h:clamp(Math.ceil(lenV*density)+1,2,640),occlude:opt.occlude!==false});
}
function quad(a,b,c,d,mat,density=8,facing=null,opt={}){
  let n=norm(cross(sub(b,a),sub(d,a)));
  if(len(n)<.1)n=norm(cross(sub(b,a),sub(c,a)));
  if(facing && dot(n,facing)<0){[b,d]=[d,b];n=mul(n,-1);}
  const P=(u,v)=>mix(mix(a,b,u),mix(d,c,u),v);
  const lu=Math.max(len(sub(b,a)),len(sub(c,d))),lv=Math.max(len(sub(d,a)),len(sub(c,b)));
  patch(mat,1,1,P,()=>n,lu,lv,density,opt);
}
function grid(mat,nu,nv,P,lenU,lenV,density=10,{flip=false,wrapU=false,wrapV=false,...opt}={}){
  const pos=(u,v)=>P(flip?1-u:u,v);
  const lim=(t,loop)=>loop?(t+2)%1:clamp(t,0,1);
  const n=(u,v)=>{
    const k=wrapV?v:clamp(v,.00012,.99988);
    return norm(cross(sub(pos(lim(u+.0001,wrapU),k),pos(lim(u-.0001,wrapU),k)),sub(pos(u,lim(k+.0001,wrapV)),pos(u,lim(k-.0001,wrapV)))));
  };
  patch(mat,nu,nv,pos,n,lenU,lenV,density,opt);
}
function blocker(x,z,hx,hz,yaw=0){obstacles.push({x,z,hx,hz,yaw});}
function box(x0,y0,z0,x1,y1,z1,mat,den=8,opts={}){
  const o=opts.origin||[0,0,0],yaw=opts.yaw||0;
  const v=(x,y,z)=>tr([x,y,z],o,yaw);
  const p=[v(x0,y0,z0),v(x1,y0,z0),v(x1,y0,z1),v(x0,y0,z1),v(x0,y1,z0),v(x1,y1,z0),v(x1,y1,z1),v(x0,y1,z1)];
  const faces=[[0,1,2,3],[4,7,6,5],[0,4,5,1],[1,5,6,2],[2,6,7,3],[3,7,4,0]];
  faces.forEach((f,k)=>{
    if(opts.omit?.includes(k))return;
    quad(...f.map(i=>p[i]),Array.isArray(mat)?mat[k]:mat,Array.isArray(den)?den[k]:den);
  });
  if(opts.hit){
    const c=tr([(x0+x1)/2,0,(z0+z1)/2],o,yaw);
    blocker(c[0],c[2],(x1-x0)/2,(z1-z0)/2,yaw);
  }
}
// Eight-sided arrises keep close edges physical, including the underside.
function slab(o,sx,sy,sz,mat,yaw=0,b=.018,den=12,edgeMat=mat){
  const ax=sx/2,az=sz/2;
  const ring=(y,inset,chamfer)=>{
    const x=ax-inset,z=az-inset,k=Math.min(chamfer,x*.35,z*.35);
    return [[-x+k,-z],[x-k,-z],[x,-z+k],[x,z-k],[x-k,z],[-x+k,z],[-x,z-k],[-x,-z+k]].map(p=>tr([p[0],y,p[1]],o,yaw));
  };
  const R=[ring(0,b,.012),ring(b,0,b*1.3),ring(sy-b,0,b*1.3),ring(sy,b,.012)];
  for(let i=0;i<8;i++){
    let k=(i+1)%8;
    for(let j=0;j<3;j++)quad(R[j][i],R[j+1][i],R[j+1][k],R[j][k],j!==1||i%2?edgeMat:mat,den);
  }
  // The central rectangle and two side strips cover the octagon.
  for(const [r,n] of [[R[3],Y],[R[0],[0,-1,0]]]){
    quad(r[0],r[1],r[4],r[5],mat,den,n);
    quad(r[1],r[2],r[3],r[4],mat,den,n);
    quad(r[5],r[6],r[7],r[0],mat,den,n);
  }
}
function rod(a,b,r,mat,sides=8,den=5){
  const axis=norm(sub(b,a)),ex=norm(cross(axis,Math.abs(axis[1])>.92?[1,0,0]:Y)),ez=cross(ex,axis);
  const off=u=>add(mul(ex,r*Math.cos(u*TAU)),mul(ez,r*Math.sin(u*TAU)));
  patch(mat,sides,1,(u,v)=>add(mix(a,b,v),off(u)),u=>off(u),r*TAU,len(sub(b,a)),den);
  for(const [p,n] of [[a,mul(axis,-1)],[b,axis]]){
    const R=Array.from({length:sides},(_,i)=>add(p,off(i/sides)));
    for(let i=1;i<sides-1;i++)quad(R[0],R[i],R[i+1],R[i+1],mat,3,n);
  }
}
// Solid envelope, with the interior faces receiving the higher-resolution bake.
function W(x0,z0,x1,z1,y0,y1,mat=M.wall,hit=true){
  box(x0,y0,z0,x1,y1,z1,mat,[3,4,10,10,10,10],{hit,omit:[0]});
}
function jamb(x0,z0,x1,z1,y0,y1,mat){
  const x=(x0+x1)*.5,z=(z0+z1)*.5;
  slab([x,y0,z],x1-x0,y1-y0,z1-z0,mat,0,.021,10,M.arris);
  blocker(x,z,(x1-x0)*.5,(z1-z0)*.5);
}
function floor(x0,z0,x1,z1,y0,y1=y0,mat=M.floor){
  quad([x0,y0,z0],[x0,y1,z1],[x1,y1,z1],[x1,y0,z0],mat,19,Y);
}
function roofBlock(x0,z0,x1,z1,y,t){
  box(x0,y,z0,x1,y+t,z1,M.soffit,[10,3,6,6,6,6]);
}
function roofWithWell(x0,z0,x1,z1,y,t,opening,topOpening,crossbars=0){
  const [a,b,c,d]=opening,[A,B,C,D]=topOpening;
  // Four continuous trapezoidal soffits surround a splayed concrete well.
  const bottom=[[x0,y,z0],[x1,y,z0],[x1,y,z1],[x0,y,z1]];
  const lo=[[a,y,b],[c,y,b],[c,y,d],[a,y,d]];
  const hi=[[A,y+t,B],[C,y+t,B],[C,y+t,D],[A,y+t,D]];
  const top=bottom.map(p=>add(p,[0,t,0]));
  for(let i=0;i<4;i++){
    const j=(i+1)%4;
    quad(bottom[i],bottom[j],lo[j],lo[i],M.soffit,9,[0,-1,0]);
    const center=[(a+c+A+C)/4,y+t*.5,(b+d+B+D)/4];
    quad(lo[i],lo[j],hi[j],hi[i],M.plaster,13,sub(center,lo[i]));
    quad(top[i],top[j],hi[j],hi[i],M.soffit,2,Y);
  }
  // Stepped metal curb catches a thin line of light at the high lip.
  const h=y+t;
  box(A-.06,h-.04,B-.06,C+.06,h+.13,B,M.bronze,4);
  box(A-.06,h-.04,D,C+.06,h+.13,D+.06,M.bronze,4);
  box(A-.06,h-.04,B,A,h+.13,D,M.bronze,4);
  box(C,h-.04,B,C+.06,h+.13,D,M.bronze,4);
  // The glazed plane transmits the baked daylight. Narrow seals and the
  // structural cap bars sit at different heights on the weathering face.
  quad([A,h+.055,B],[C,h+.055,B],[C,h+.055,D],[A,h+.055,D],M.roofGlass,1,[0,-1,0],
    {occlude:false,uv:(u,v)=>[u,v]});
  if(crossbars>0){
    const count=crossbars===2?2:1;
    for(let i=1;i<=count;i++){
      const x=A+(C-A)*i/(count+1);
      box(x-.009,h+.040,B,x+.009,h+.079,D,M.joint,4);
    }
  }else{
    for(const f of [1/3,2/3]){const z=B+(D-B)*f;box(A,h+.042,z-.008,C,h+.072,z+.008,M.joint,4);}
  }
  for(let i=1;i<=crossbars;i++){
    const z=B+(D-B)*i/(crossbars+1);
    if(crossbars===2 && i===1){
      box(A-.25,h-.63,z-.125,C+.25,h+.035,z+.125,M.plaster,[13,3,9,5,9,5]);
    }
    box(A,h+.075,z-.023,C,h+.165,z+.023,M.bronze,4);
  }
  portals.push({p:[(A+C)/2,h+.19,(B+D)/2],u:[C-A,0,0],v:[0,0,D-B]});
}

// Lower gallery, 16.2 by 13.6 metres.
floor(-8.1,3.8,8.1,17.4,0);
W(-8.82,3.1,-8.1,18.12,-.22,4.66);
W(8.1,3.1,8.82,5.82,-.22,4.66);
W(8.1,11.87,8.82,18.12,-.22,4.66);
W(8.1,5.82,9.08,11.87,-.22,3.35);
W(8.1,5.82,9.08,11.87,4.10,4.66,M.wall,false);
for(const z of [7.84,9.86])box(8.96,3.35,z-.024,9.03,4.10,z+.024,M.bronze,4);
portals.push({p:[9.10,3.725,8.845],u:[0,.75,0],v:[0,0,6.05]});
W(-8.1,17.4,-2.0,18.18,-.22,4.66);
W(.70,17.4,8.1,18.18,-.22,4.66);
W(-2.0,17.4,.70,18.18,2.95,4.66,M.wall,false);
floor(-2.0,17.4,.7,18.09,0);
// Flush, darkened-bronze entry doors in a deep reveal.
box(-2,0,18.07,.70,2.95,18.16,M.joint,8,{hit:true});
for(let i=0;i<2;i++){
  let x=-1.965+1.319*i;
  box(x,.025,18.035,x+1.285,2.91,18.07,M.bronzePlate,10);
  box(x+.17,1.55,18.018,x+.305,2.69,18.036,M.glazing,6);
  const px=i?x+.15:x+1.14;
  rod([px,.89,17.938],[px,1.36,17.938],.018,M.bronze);
  for(const h of [.92,1.33])rod([px,h,17.94],[px,h,18.04],.012,M.bronze);
}
jamb(-8.1,3.08,-1.55,3.8,-.15,4.66,M.board);
jamb(5.95,3.08,8.1,3.8,-.15,4.66,M.board);
roofWithWell(-8.82,3.08,8.82,18.18,4.65,1.05,[-6.75,6.2,-.90,13.1],[-6.50,6.53,-1.22,12.75],1);
// A narrow, deep-set east clerestory sends cool light into the resin bay.

// Broad nine-metre ramp, rising 840 mm. No lip at either landing.
export const ramp={x0:-1.55,x1:5.95,z0:-5.6,z1:3.8,rise:.84};
export const floorY=z=>clamp((ramp.z1-z)/(ramp.z1-ramp.z0),0,1)*ramp.rise;
floor(-1.55,-5.6,5.95,3.8,.84,0);
W(-2.31,-4.82,-1.55,3.08,-.25,6.25,M.board);
W(5.95,-4.82,6.73,3.08,-.25,6.25,M.board);
// The upper step in the roof is visible when looking back down the ramp.
W(-2.31,3.08,6.73,3.8,4.65,6.26,M.wall,false);
roofWithWell(-2.31,-5.6,6.73,3.11,6.25,.94,[-.91,-4.95,1.02,2.08],[-.83,-4.78,.85,1.92],0);
const ra=[5.82,floorY(3.42)+.895,3.42],rb=[5.82,floorY(-5.24)+.895,-5.24];
rod(ra,rb,.029,M.bronze,12);
for(const z of [3.42,1.65,-.10,-1.85,-3.60,-5.24]){
  const h=floorY(z)+.895;
  rod([5.82,h-.025,z],[5.82,h-.108,z],.012,M.bronze);
  rod([5.82,h-.108,z],[5.96,h-.108,z],.012,M.bronze);
}
// Hall. West wall jogs at the threshold; east clerestory looks into sky.
floor(-10.15,-22,9.05,-5.6,.84);
W(-10.91,-22.78,-10.15,-4.83,.45,9.26);
W(-10.15,-22.78,9.05,-22,.45,9.26,M.board);
W(9.05,-22.78,9.88,-18.7,.45,9.26);
W(9.05,-9.15,9.88,-4.82,.45,9.26);
W(9.05,-18.7,10.22,-9.15,.45,6.47);
W(9.05,-18.7,10.22,-9.15,7.62,9.26,M.wall,false);
for(const z of [-16.30,-13.92,-11.53])box(10.04,6.47,z-.031,10.11,7.62,z+.031,M.bronze,4);
portals.push({p:[10.24,7.045,-13.925],u:[0,1.15,0],v:[0,0,9.55]});
jamb(-10.15,-5.6,-1.55,-4.82,.45,9.26,M.wall);
jamb(5.95,-5.6,9.05,-4.82,.45,9.26,M.wall);
W(-1.55,-5.6,5.95,-4.82,6.25,9.26,M.wall,false);
roofWithWell(-10.91,-22.78,9.88,-4.82,9.25,1.55,[-7.5,-17.9,1.85,-8.05],[-6.93,-17.26,1.21,-8.85],2);
// Strong, thick piers terminate the long blind wall and recess the central field.
for(const z of [-20.82,-13.50,-6.60]){
  box(-10.15,.84,z-.27,-9.84,9.25,z+.27,M.wall,9,{hit:true});
}
// Flush expansion covers mark the foot and head of the sloped slab.
for(const z of [3.772,-5.569]){
  floor(-1.544,z-.014,5.944,z+.014,floorY(z-.014)+.0025,floorY(z+.014)+.0025,M.bronze);
}
// Linear return-air grille, recessed behind a projecting concrete sill.
box(8.997,1.03,-18.45,9.051,1.181,-9.42,M.joint,6);
for(const h of [1.058,1.092,1.126,1.160])box(8.982,h,-18.45,9.00,h+.009,-9.42,M.bronzePlate,5);
for(const z of [-16.2,-13.95,-11.7])box(8.979,1.027,z-.012,9.003,1.184,z+.012,M.bronzePlate,5);

// Plinth assemblies have a dark set-back foot and chamfered stone or concrete.
function plinth(x,y,z,w,h,d,yaw,mat){
  slab([x,y+.003,z],w-.15,.063,d-.15,M.joint,yaw,.01,6);
  slab([x,y+.063,z],w,h-.063,d,mat,yaw,.018,15);
  blocker(x,z,w/2,d/2,yaw);
}
// I. Subtraction. A single carved block: irregular rounded exterior,
// slanting bore, flatter front/back fields and continuous polished reveals.
const stoneO=[-3.50,.475,9.84],stoneYaw=-.34;
plinth(stoneO[0],0,stoneO[2],3.04,.475,2.08,stoneYaw,M.paleBase);
const spow=(x,k)=>Math.sign(x)*Math.pow(Math.abs(x),k);
function stoneShape(u,v){
  const a=TAU*u,b=TAU*v,ca=Math.cos(a),sa=Math.sin(a);
  // Interpolate outer profile and its eccentrically carved core.
  const outer=[1.26*spow(ca,.71)*(1-.14*sa)+.29*sa,1.067+1.065*spow(sa,.71)];
  const inner=[.13+.61*ca+.16*sa,1.15+.48*sa+.16*ca];
  const q=(1+spow(Math.cos(b),.55))/2;
  const z=.51*spow(Math.sin(b),.59)*(1+.16*ca)+.1*sa-.08*ca;
  const height=Math.max(0,inner[1]*(1-q)+outer[1]*q+.065*z-.026);
  return tr([inner[0]*(1-q)+outer[0]*q+.12*z,height,z],stoneO,stoneYaw);
}
grid(M.stone,100,48,stoneShape,6.4,2.72,18,{wrapU:true,wrapV:true});

// II. Meniscus. Three cast sea-green waves, each a closed lens with a
// rounded lip. The sweep, height and taper change between casts.
const resinO=[4.18,.72,8.18],resinYaw=-.40;
plinth(resinO[0],0,resinO[2],2.44,.72,1.95,resinYaw,M.basalt);
for(let k=0;k<3;k++){
  const P=(u,v)=>{
    const a=u*TAU,phi=v*Math.PI-Math.PI*.5;
    const s=(Math.sin(phi)+1)*.5;
    const profile=v===0||v===1?0:Math.max(0,Math.cos(phi));
    const shoulder=Math.pow(profile,.44);
    const across=spow(Math.cos(a),.81)*(.71+.075*k)*shoulder;
    const thick=spow(Math.sin(a),.73)*(.104+.013*k)*Math.pow(profile,.51);
    const h=1.17+.34*k;
    const x=across+.19*(s-.5)+.045*k;
    const y=.006+h*s+.235*across*s+.10*Math.sin(across*3.1+k*.54)*s;
    const z=(k-1)*.446+thick+.33*across*across+.10*Math.sin(s*Math.PI*1.4+across*2.6)+.12*across*s;
    return tr([x,y,z],resinO,resinYaw);
  };
  grid(M.resin,56,35,P,3.5,2.1,10,{wrapU:true,flip:true});
  slab(tr([-.095+.045*k,.001,(k-1)*.446+.018],resinO,resinYaw),1.12,.044,.18,M.bronzePlate,resinYaw,.006,8);
}

// III. Counterfold. A thick continuous steel band folds around an
// off-centre void. Creases are mitred and the two cut edges remain visible.
const hallO=[-.88,1.055,-14.64],hallYaw=-.35;
plinth(hallO[0],.84,hallO[2],6.28,.215,5.10,hallYaw,M.basalt);
const rails=[
  [[-2.31,.035,1.19],[-.92,.035,1.87]],
  [[-2.27,1.24,.40],[-1.13,1.48,1.62]],
  [[-2.48,3.94,-.56],[-1.40,4.94,.38]],
  [[-.16,5.74,-1.65],[.35,6.23,-.01]],
  [[1.54,4.21,-1.64],[2.37,4.36,-.08]],
  [[1.18,2.77,-.15],[2.38,2.96,1.18]],
  [[-.11,1.90,.47],[1.05,1.88,1.94]],
  [[.12,.036,.21],[1.69,.036,1.13]]
].map(row=>row.map(p=>tr(p,hallO,hallYaw)));
const faces=[];
for(let j=0;j<rails.length-1;j++){
  const [a,b]=rails[j],[d,c]=rails[j+1];
  // A deliberate diagonal brake line lets broad plates change plane.
  faces.push({p:[a,b,c],idx:[2*j,2*j+1,2*j+3]},{p:[a,c,d],idx:[2*j,2*j+3,2*j+2]});
}
const vNormals=rails.flat().map(()=>[0,0,0]);
for(const f of faces){
  f.n=norm(cross(sub(f.p[1],f.p[0]),sub(f.p[2],f.p[0])));
  f.idx.forEach(i=>vNormals[i]=add(vNormals[i],f.n));
}
const raw=rails.flat(),side=(i,s)=>add(raw[i],mul(norm(vNormals[i]),s*.043));
const faceSide=(i,s)=>add(side(i,s),mul(norm(sub(raw[i^1],raw[i])),.011));
const rim=(i,s)=>add(raw[i],mul(norm(vNormals[i]),s*.033));
for(const f of faces)for(const sign of [-1,1]){
  const [a,b,c]=f.idx.map(i=>faceSide(i,sign));
  quad(a,b,c,c,sign===1?M.rust:M.oxide,18,mul(f.n,sign));
}
for(let j=0;j<rails.length-1;j++)for(const k of [0,1]){
  const i=2*j+k,h=i+2;
  const outward=norm(sub(raw[i],raw[2*j+1-k]));
  quad(rim(i,1),rim(h,1),rim(h,-1),rim(i,-1),M.cut,14,outward);
  for(const s of [-1,1])quad(faceSide(i,s),faceSide(h,s),rim(h,s),rim(i,s),M.cut,14,add(outward,mul(norm(vNormals[i]),s)));
}
for(const i of [0,raw.length-2]){
  quad(faceSide(i,-1),faceSide(i+1,-1),faceSide(i+1,1),faceSide(i,1),M.cut,10,[0,-1,0]);
  for(const j of [i,i+1])quad(faceSide(j,-1),rim(j,-1),rim(j,1),faceSide(j,1),M.cut,8,[0,-1,0]);
}
// Discreet anchoring shoes at the two bearing points.
for(const [x,z,a] of [[-1.61,1.50,-.42],[.90,.65,-.56]]){
  const p=tr([x,.002,z],hallO,hallYaw);
  slab(p,1.83,.035,.28,M.oxide,hallYaw+a,.007,10);
}

function bench(x,y,z,yaw,length){
  const o=[x,y,z];
  // A single finger joint between the two sawn oak seat planks.
  for(const dz of [-.142,.142]){
    const p=tr([0,.385,dz],o,yaw);
    slab(p,length,.098,.270,M.oak,yaw,.014,10);
  }
  for(const lx of [-length*.345,length*.345]){
    box(lx-.065,.022,-.178,lx+.065,.392,.178,M.bronzePlate,6,{origin:o,yaw});
    box(lx-.108,0,-.202,lx+.108,.027,.202,M.bronze,5,{origin:o,yaw});
  }
  blocker(x,z,length/2,.276,yaw);
}
bench(-7.12,0,12.82,Math.PI*.5,2.88);
bench(7.46,.84,-14.08,Math.PI*.5,3.88);
bench(-4.92,.84,-20.33,0,3.15);

// A single glyph atlas serves all printed surfaces. UV (0,0) is top left.
export const signs=[
  {kind:'label',num:'01',title:'Bore',sub:'Limestone',detail:'Carved and honed   /   2026'},
  {kind:'label',num:'02',title:'Meniscus',sub:'Pigmented cast resin',detail:'Three casts   /   2026'},
  {kind:'label',num:'03',title:'Counterfold',sub:'Weathering steel',detail:'Brake-formed plate   /   2026'},
  {kind:'way',num:'02',title:'Sculpture hall',sub:'UPPER LEVEL'},
  {kind:'title',title:'Mass & Interval',sub:'KERN    /    MUSEUM OF FORM',detail:'Studies in three materials'},
  {kind:'way',num:'01',title:'Gallery',sub:'ENTRANCE LEVEL'},
  {kind:'small',title:'KERN',sub:'MUSEUM OF FORM'}
];
function print(a,b,c,d,id,light=false){
  // a top left, b top right, c lower right, d lower left, viewed from the front.
  const n=norm(cross(sub(d,a),sub(b,a)));
  patch(light?M.whiteInk:M.ink,1,1,(u,v)=>mix(mix(d,c,u),mix(a,b,u),v),()=>n,len(sub(b,a)),len(sub(d,a)),6,
    {occlude:false,uv:(u,v)=>[(u*.99+.005)/2+(id%2)/2,((1-v)*.98+.01)/4+Math.floor(id/2)/4]});
}
function label(x,y,z,yaw,id){
  const o=[x,y,z],t=p=>tr(p,o,yaw);
  slab(o,.34,.032,.30,M.bronzePlate,yaw,.008,8);
  box(-.045,.025,-.031,.045,.812,.031,M.bronzePlate,7,{origin:o,yaw});
  const a=t([-.292,.913,-.154]),b=t([.292,.913,-.154]),c=t([.292,.756,.147]),d=t([-.292,.756,.147]);
  const up=norm(cross(sub(d,a),sub(b,a))),back=mul(up,-.016);
  quad(a,b,c,d,M.bronzePlate,12,up);
  const P=[a,b,c,d],B=P.map(p=>add(p,back));
  quad(...B,M.bronzePlate,8,mul(up,-1));
  for(let k=0;k<4;k++)quad(P[k],B[k],B[(k+1)%4],P[(k+1)%4],M.bronze,5);
  print(...P.map(p=>add(p,mul(up,.002))),id,true);
  blocker(x,z,.28,.13,yaw);
}
label(-1.63,0,11.27,.32,0);
label(2.79,0,9.47,-.35,1);
label(2.74,.84,-12.42,.43,2);
// Restrained wayfinding, printed directly onto the cast panels.
print([-5.85,2.51,3.807],[-3.89,2.51,3.807],[-3.89,1.50,3.807],[-5.85,1.50,3.807],3);
print([5.62,2.80,17.393],[1.96,2.80,17.393],[1.96,1.08,17.393],[5.62,1.08,17.393],4);
print([-4.05,3.33,-5.607],[-6.02,3.33,-5.607],[-6.02,2.31,-5.607],[-4.05,2.31,-5.607],5);
print([9.045,2.86,-16.72],[9.045,2.86,-14.96],[9.045,2.15,-14.96],[9.045,2.15,-16.72],6);

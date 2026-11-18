// Shared metric surface definitions for the mesh builder and first-person walker.
export const PI = Math.PI, TAU = Math.PI * 2;
export const CX = 0.45, CZ = 1.15;
export const clamp = (x, a=0, b=1) => Math.max(a, Math.min(b,x));
export function smooth(a,b,x) { const t=clamp((x-a)/(b-a)); return t*t*(3-2*t); }
export const mix = (a,b,t) => a+(b-a)*t;
export const wave = Math.sin;
export function rand32(seed) {
  return () => { seed|=0; seed=seed+0x6D2B79F5|0; let t=Math.imul(seed^seed>>>15,1|seed);
    t=t+Math.imul(t^t>>>7,61|t)^t; return ((t^t>>>14)>>>0)/4294967296; };
}
function hash(i,j,k) {
  let h=Math.imul(i,1597334677)^Math.imul(j,3812015801)^Math.imul(k,958282693);
  h=Math.imul(h^(h>>>16),2246822519); h=Math.imul(h^(h>>>13),3266489917);
  return ((h^(h>>>16))>>>0)/4294967295;
}
export function noise(x,y=0,z=0) {
  const i=Math.floor(x),j=Math.floor(y),k=Math.floor(z);
  x-=i; y-=j; z-=k; x=x*x*(3-2*x);y=y*y*(3-2*y);z=z*z*(3-2*z);
  return mix(mix(mix(hash(i,j,k),hash(i+1,j,k),x),mix(hash(i,j+1,k),hash(i+1,j+1,k),x),y),
             mix(mix(hash(i,j,k+1),hash(i+1,j,k+1),x),mix(hash(i,j+1,k+1),hash(i+1,j+1,k+1),x),y),z);
}
export function spot(x,z,a,b,sx,sz) { return Math.exp(-(((x-a)/sx)**2+((z-b)/sz)**2)); }
function polarLobe(t,center,k) { return Math.exp(k*(Math.cos(t-center)-1)); }
const ellipse = (t,rx,rz) => 1/Math.hypot(Math.cos(t)/rx,Math.sin(t)/rz);
export function poolR(t) {
  return ellipse(t,6.75,7.35)*(1+.069*wave(3*t+.53)+.037*wave(5*t+2.2)+.018*wave(9*t-.8))
       -1.13*polarLobe(t,2.73,13)+.39*polarLobe(t,-2.03,22)-1.68*polarLobe(t,-1.03,12);
}
export function roomR(t) {
  return ellipse(t,11.85,13.85)*(1+.042*wave(3*t+.14)+.047*wave(5*t+.90)+.015*wave(8*t+.5))
       +3.95*polarLobe(t,1.90,18)+2.48*polarLobe(t,-1.66,19)
       +1.25*polarLobe(t,-.23,22)+1.12*polarLobe(t,.27,36)-1.20*polarLobe(t,.98,18);
}
export function radial(x,z) {
  const dx=x-CX,dz=z-CZ,t=Math.atan2(dz,dx),r=Math.hypot(dx,dz);
  return {t,r,shore:r-poolR(t),wall:roomR(t)-r};
}
export function point(t,r) {return [CX+r*Math.cos(t),CZ+r*Math.sin(t)];}
export function ramp(x,z) {
  const lip=-10.33+.21*x-.049*(x-.4)**2+.13*Math.sin(1.32*x);
  const run=.43+3.00*smooth(2.45,.48,x);
  const landing=.52*smooth(-run,run,lip-z)*smooth(-5.4,-2.7,x)*smooth(7.1,4.8,x);
  return 1.55*smooth(4.0,13.15,-z+.115*x)+landing+.15*spot(x,z,2,-13,3.8,2.9);
}
export function floorY(x,z) {
  const p=radial(x,z),d=p.shore;
  const n=noise(x*.39,4,z*.39)-.5,m=noise(x*1.41,2,z*1.41)-.5;
  // Perched lake with a shelf of submerged marl at its rim.
  if(d<0) {
    const a=smooth(.01,2.75,-d),b=smooth(1.70,5.55,-d);
    return d*.12/(1+Math.abs(d)*.50)-.46*a-.70*b+
      (n*.20+m*.065)*smooth(.03,1.18,-d)+.24*spot(x,z,2.4,3.1,2.3,3.5)*a;
  }
  const shoreRise=.26*smooth(0,1.32,d)+.16*smooth(.9,4.6,d);
  const floorRipple=(n*.16+m*.042+.033*wave(.85*x+.45*z))*smooth(.09,1.65,d);
  const s=smooth(.05,2.3,d);
  const rim=.33*smooth(2.25,-.65,p.wall)*(.6+noise(x*1.15,1,z*1.15));
  return shoreRise+floorRipple+(ramp(x,z)+.24*spot(x,z,-4.5,15.4,3.9,3))*s+rim;
}
// Gently dipping bedding planes feed both the sculpted wall and fragment material.
export function bedY(x,y,z) {
  return y+.082*x-.041*z+.16*wave(x*.35+z*.18)+.085*wave(z*.69-x*.13);
}
export function bandProfile(b) {
  return .46*wave(b*2.31+.3*wave(b*1.4))+.27*wave(b*5.23+1.1)+.16*wave(b*8.83+1.7);
}
export function wallHeight(t) {
  return 5.85+.83*wave(2*t+.1)+.48*wave(5*t+.3)-1.4*polarLobe(t,1.84,10)
     +.81*polarLobe(t,3.11,12);
}
// Relict, asymmetric wall scallops cut across the beds in three former flow channels.
const scallops=[
 [.19,2.14,.096,.44,.41],[.30,2.27,.079,.36,.38],[.43,2.31,.113,.48,.51],
 [.56,2.42,.080,.32,.39],[.51,2.98,.12,.52,.53],[.34,3.07,.09,.38,.38],
 [2.34,1.67,.091,.36,.42],[2.47,1.82,.104,.44,.51],[2.62,1.91,.098,.39,.43],
 [2.51,2.46,.095,.44,.43],[2.68,2.59,.11,.38,.36],[2.86,2.52,.13,.51,.46],
 [4.27,3.04,.083,.38,.39],[4.38,3.15,.118,.47,.57],[4.54,3.25,.106,.38,.44],
 [4.70,3.35,.111,.44,.43],[4.48,4.02,.14,.53,.54],
 [1.73,1.63,.105,.50,.49],[1.87,1.77,.081,.37,.37],[1.99,1.84,.094,.48,.50]
];
function scallopDepth(t,y){
  t=(t+TAU)%TAU;let depth=0;
  for(const [a,e,w,h,d] of scallops){
    const s=(t-a)/w;if(Math.abs(s)>1.25)continue;
    const v=(y-e-.13*s)/h,rad=s*s*(1+.22*s)+v*v;
    if(rad<1)depth+=d*(1-rad)**1.45;
  }
  return depth;
}
export function wallAt(t,h) {
  const r=roomR(t),[x,z]=point(t,r),base=floorY(x,z),top=wallHeight(t)+base;
  const y=mix(base-.68,top,h),b=bedY(x,y,z);
  const strata=bandProfile(b), erosion=noise(x*.51,y*.29,z*.51)-.5;
  const vault=.79*wave(h*PI)-.47*h*h,undercut=.49*Math.exp(-((h-.19)**2)/.014);
  const folds=.35*wave(t*16+.75*wave(t*5)+h*1.8)+.19*wave(t*31-h*1.2);
  const toe=.34*smooth(.28,0,h);
  const wr=r+vault+undercut+strata*(.57+.32*noise(x*.15,0,z*.15))+erosion*.88+folds-toe+scallopDepth(t,y);
  const [wx,wz]=point(t,wr);
  return [wx,y,wz];
}
// Irregular slot cut along a diagonal solution joint in the ceiling.
export function rimAt(t) {
  const u=Math.cos(t),v=Math.sin(t),a=5.65*u*(1+.055*wave(5*t)),b=1.38*v*(1+.17*wave(3*t+.4));
  return [-.20+.94*a-.342*b,9.70+.48*u+.22*wave(3*t+.8),-3.05+.342*a+.94*b+.48*u*u];
}
export function roofAt(t,h) {
  const o=wallAt(t,1),i=rimAt(t),q=smooth(0,1,h);
  const x=mix(o[0],i[0],h),z=mix(o[2],i[2],h);
  const envelope=Math.sin(h*PI),fracture=(noise(x*.55,4.3,z*.55)-.5)*.56
            +.27*wave(x*.60+z*.17)+.13*wave(x*1.35-z*.36);
  const domes=1.74*spot(x,z,4.7,3.3,2.25,3.65)+1.10*spot(x,z,-6.6,-3.85,2.60,2.03);
  const y=mix(o[1],i[1],q)+envelope*(1.18+fracture+domes)
       -2.64*spot(x,z,-4.2,12.55,4.1,3.9)*envelope;
  return [x,y,z];
}
export const ARCH = {x:-1.38, z:-6.82,rx:6.38,height:4.36};
export function archAt(t,a) {
  // Vaulted stone rib, widened and skewed towards its bedrock roots.
  const s=Math.sin(t),c=Math.cos(t),rawC=Math.cos(a),rawS=Math.sin(a);
  const ca=Math.sign(rawC)*Math.abs(rawC)**(.79+.07*s),sa=Math.sign(rawS)*Math.abs(rawS)**(.79+.07*c);
  const end=Math.pow(Math.abs(c),3.25),x0=ARCH.x+ARCH.rx*c-.43*s*s;
  const z0=ARCH.z+.115*(x0-ARCH.x)+.33*wave(t*2.6+.3);
  const y0=.06+ARCH.height*Math.pow(Math.max(0,s),.76)+.21*c+.16*wave(2*t);
  const nx=c*.84,ny=s, l=Math.hypot(nx,ny)||1;
  let section=(.95+.16*wave(3*t+.78)+.60*end)*(.94+.10*wave(3*a+.9*t)+.055*wave(5*a));
  const x=x0+section*ca*nx/l,y=y0+section*ca*ny/l;
  const b=bedY(x,y,z0),strata=.31*bandProfile(b),d=noise(x*.83,y*.64,z0*.54)-.5;
  const width=1.10+.40*s+.46*end+.18*wave(4*t)+strata+.24*d;
  return [x+(d*.21+strata*.37)*nx/l,y+(d*.17+strata*.16)*ny/l,z0+sa*width+.11*wave(t*6.1)*ca];
}
export const inspectionPath=[[-4.65,14.80],[-4.53,11.64],[-5.93,8.02],[-7.49,5.01],[-7.26,1.09],[-7.25,-1.72],[-6.03,-4.42],[-4.07,-7.14],[-2.28,-9.72],[-.70,-11.84],[0,-12.0]];
export function footpath(x,z){
 let d2=1e4;
 for(let j=1;j<inspectionPath.length;j++){
   const a=inspectionPath[j-1],b=inspectionPath[j],dx=b[0]-a[0],dz=b[1]-a[1];
   const t=clamp(((x-a[0])*dx+(z-a[1])*dz)/(dx*dx+dz*dz));
   d2=Math.min(d2,(x-a[0]-t*dx)**2+(z-a[1]-t*dz)**2);
 }
 return 1-smooth(.20,1.10,Math.sqrt(d2)+.19*(noise(x*1.1,3.0,z*1.1)-.5));
}
export const spawn={x:-4.65,z:14.80,yaw:.282,pitch:-.10};
export function station(x,z) {
  if(z>11.7) return 'Entrance recess';
  if(z< -10.20) return 'Upper landing';
  if(z< -5.8 && Math.abs(x+1.4)<7.1) return 'Natural arch';
  if(x>5.6) return 'East shelf';
  return 'Pool chamber';
}


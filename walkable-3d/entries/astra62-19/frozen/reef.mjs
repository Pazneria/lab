import {M, TAU, add, mul, sub, unit, cross, mix, clamp, box, face, plane, rod, tube, torus, surface, patch, zone, place, ellipsoid, lathe, range, tint, rand} from './geometry.mjs';
const bed=(x,z)=>-1.42+.23*Math.sin(x*.75+z*.48)+.15*Math.sin(x*1.42-z*.72)+.18*Math.cos(z*.62)+.42*Math.sin(x*.32-z*.22);
function boulder(x,y,z,rx,ry,rz,c){
 const n=10+Math.floor(rand()*4),o=range(0,TAU),sx=range(-.20,.2),sz=range(-.14,.14),levels=[[-1,.57],[-.58,.94],[-.14,1],[.34,.97],[.69,.77],[.94,.41],[1,.10]];
 const ang=Array.from({length:n},(_,i)=>o+TAU*(i+range(-.22,.22))/n);
 const rough=ang.map(()=>range(.77,1.17));
 let prev;
 levels.forEach(([h,r],j)=>{
  let ring=ang.map((a,k)=>{
   let d=r*rough[k]*(1+.045*Math.sin(a*4+h*8)),v=range(-.063,.059)*(1-Math.abs(h))+.09*Math.cos(a*2+.6);
   return [x+rx*(Math.cos(a)*d+h*sx),y+ry*(h+v),z+rz*(Math.sin(a)*d+h*sz)];
  });
  if(prev)for(let i=0;i<n;i++){
   let k=(i+1)%n,blend=range(.88,1.09)*(j===3?.91:1);
   // Bisected facets expose the slanting strata instead of a spherical silhouette.
   for(let tri of [[prev[i],ring[i],ring[k]],[prev[i],ring[k],prev[k]]]){
    let nr=unit(cross(sub(tri[1],tri[0]),sub(tri[2],tri[0])));
    if(nr[0]*(tri[0][0]-x)+nr[2]*(tri[0][2]-z)<0)nr=mul(nr,-1);
    face(tri,tint(c,blend*(.97+.05*rand())),M.STONE,nr);
   }
  }
  prev=ring;
 });
 face(prev,tint(c,1.04),M.STONE,[0,1,0]);
}
function seaFan(p,h,spread,col,depth=4){
 place(p,range(-.57,.59),()=>{
  const points=[];
  function grow(o,ang,len,r,d){
   const mid=add(o,[Math.sin(ang)*len*.5,Math.cos(ang)*len*.5,range(-.030,.030)*h]);
   const to=add(mid,[Math.sin(ang+.13)*len*.5,Math.cos(ang+.13)*len*.5,range(-.030,.030)*h]);
   tube([o,mid,to],r,tint(col,range(.9,1.10)),M.LIFE,6,[r,r*.79,r*.56]);
   if(d===0){points.push(to);return;}
   grow(to,ang*.80+range(-.31,.32),len*range(.62,.81),r*.64,d-1);
   grow(mid,ang+(rand()>.5?1:-1)*range(.38,.86),len*range(.57,.77),r*.57,d-1);
  }
  for(let k=-2;k<=2;k++)grow([0,0,0],k*spread,h*range(.33,.44),h*.015,depth);
  // Fine anastomosing cross-links distinguish fans from bare twigs.
  for(let j=1;j<points.length;j+=3){
   let a=points[j],b=points[j-1],dist=Math.hypot(...sub(a,b));
   if(dist<h*.19)tube([a,mul(add(a,b),.5).map((v,i)=>v+(i===1?.017*h:0)),b],.0033*h,tint(col,.91),M.LIFE,5);
  }
 });
}
function fronds(p,size,col,count=7){
 place(p,range(-1,1),()=>{
  for(let k=0;k<count;k++){
   let a=k*2.39,h=size*range(.51,1.16),w=h*range(.033,.077),lean=range(.17,.66)*h,phase=range(0,6);
   const fn=(u,v)=>{
    let bend=lean*(v*v+.16*Math.sin(v*5+phase)*v),side=Math.sin(v*5.4+phase)*v*h*.12;
    const taper=Math.pow(Math.sin(v*Math.PI),.77)*(1+.14*Math.sin(v*16+phase));
    let width=(u-.5)*2*w*taper;
    return [Math.cos(a)*bend-Math.sin(a)*(width+side),v*h-(Math.abs(width)*.73),Math.sin(a)*bend+Math.cos(a)*(width+side)];
   };
   patch(3,11,fn,tint(col,range(.86,1.15)),M.LIFE);
   patch(3,11,fn,tint(col,.85),M.LIFE,undefined,true);
  }
 });
}
function sponges(p,sz,col){
 place(p,0,()=>{
  for(let j=0;j<7;j++){
   let a=j*2.39,d=range(.01,.118)*sz,h=range(.095,.304)*sz,r=range(.018,.043)*sz;
   place([Math.cos(a)*d,0,Math.sin(a)*d],[.18*Math.sin(a),0,.2*Math.cos(a)],()=>{
    lathe([0,0,0],[[r*.71,0],[r*1.13,h*.29],[r*.90,h*.74],[r,h*.96],[r*1.05,h],[r*.65,h*.985],[r*.53,h*.72]],col,M.LIFE,14);
    rod([0,h*.716,0],[0,h*.72,0],r*.56,'293e40',M.STONE,12);
   });
  }
 });
}
function fish(x,y,z,sz,angle,col){
 place([x,y,z],[range(-.10,.10),angle,range(-.14,.14)],()=>{
  // A fusiform silver body with translucent-looking opaque tail and fins.
  const fn=(u,v)=>{
   const a=v*TAU,tail=Math.pow(Math.max(0,Math.sin(u*Math.PI)),.74),profile=(.70+.60*u)*tail;
   return [(u-.45)*sz,Math.sin(a)*sz*.143*profile,Math.cos(a)*sz*.079*profile];
  };
  patch(11,10,fn,col,M.FISH,(u,v)=>[u,v]);
  const f=.45*sz;
  const pts=[[-f,.015*sz,0],[-.75*sz,.165*sz,.004*sz],[-.666*sz,0,.003*sz],[-.75*sz,-.151*sz,-.004*sz],[-f,-.015*sz,0]];
  for(let i=1;i+1<pts.length;i++){
   face([pts[0],pts[i],pts[i+1]],tint(col,.74),M.FISH,[0,0,1]);
   face([pts[0],pts[i],pts[i+1]],tint(col,.68),M.FISH,[0,0,-1]);
  }
  let dorsal=[[-.182*sz,.102*sz,0],[-.148*sz,.248*sz,0],[.165*sz,.116*sz,0]];
  face(dorsal,tint(col,.66),M.FISH,[0,0,1]);face(dorsal,tint(col,.62),M.FISH,[0,0,-1]);
  for(let s of [-1,1])ellipsoid([.344*sz,.035*sz,s*.057*sz],[.019*sz,.018*sz,.009*sz],'2f4447',M.FISH,8,5);
 });
}
export function buildReef(){
 zone('reef');
 plane([0,5.4,-31.3],[54,0,0],[0,30,0],'28707b',M.WATER,50);
 for(let s of [-1,1])plane([s*23,5.4,-20],[0,0,s*26],[0,30,0],'28707b',M.WATER,50);
 plane([0,14.8,-20],[48,0,0],[0,0,26],'276b75',M.WATER,50);
 patch(60,39,(u,v)=>{let x=(u-.5)*39,z=-30+v*21.65;return [x,bed(x,z),z];},'617974',M.STONE,(u,v)=>[u*39,v*21.65],true);
 // Layered outcrops: a distant ridge, a shoulder either side and a gap down the middle.
 for(let i=0;i<28;i++){
  let x=-15+i*1.12,z=-23.4+range(-1.4,1.5),h=range(1.37,3.03)-.72*Math.exp(-x*x/9);
  boulder(x,bed(x,z)+h*.45,z,range(1,2.3),h,range(.85,1.95),'536968');
 }
 for(let [x,y,z,rx,ry,rz,c] of [
  [-3.08,-.50,-10.74,2.11,1.34,1.14,'576a65'],[-3.50,.373,-11.21,1.10,.93,.88,'53655f'],
  [-1.52,-.73,-10.65,1.14,.75,.71,'69786c'],[-2.24,-.04,-12.14,1.20,.81,.92,'69796e'],
  [2.67,-.505,-11.32,1.66,1.26,.92,'5c6c68'],[3.04,.27,-12.51,1.35,1.19,1.17,'64746d'],
  [1.90,-.26,-12.06,.82,.84,.68,'686e62'],[.32,-.96,-12.14,1.23,.46,.62,'66776a'],
  [-5.17,-.08,-13.48,1.79,1.61,1.41,'596960'],[5.38,-.12,-15.25,2.4,1.83,1.5,'65746d'],
  [-2.02,-.45,-16.6,2.3,1.18,1.35,'687b73'],[.46,-.52,-18.3,2.1,1.15,1.57,'657872']])boulder(x,y,z,rx,ry,rz,c);
 for(let i=0;i<56;i++){
  let x=range(-8.1,8.1),z=range(-20,-9.05),s=range(.10,.65);
  boulder(x,bed(x,z)+s*.17,z,s*range(.9,1.65),s*.55,s*range(.61,1.31),i%3===0?'7e8977':'596d65');
 }
 seaFan([-2.16,.45,-10.93],1.68,.33,'ab705f',4);
 seaFan([2.57,.54,-11.70],1.15,.35,'a36c58',4);
 seaFan([-3.71,1.0,-12.21],.84,.28,'b99273',3);
 seaFan([.21,-.57,-12.05],.67,.34,'9e8674',3);
 seaFan([4.20,.12,-12.01],1.45,.25,'7d8173',3);
 const gardens=[[-1.67,-.17,-10.24,.74],[-3.13,.64,-10.46,.93],[1.95,.31,-11.58,.84],[3.1,.69,-12.23,1.14],[-1.82,.59,-12.04,.83],[.81,-.70,-11.79,.46],[-3.84,.35,-12.86,1.12]];
 for(let [x,y,z,s] of gardens){
  fronds([x,y,z],s,'729084',6);
  sponges([x+.20,y-.01,z-.17],s*1.17,'ae9677');
 }
 for(let i=0;i<24;i++){
  let x=range(-7,7),z=range(-19,-10.1);fronds([x,bed(x,z),z],range(.26,1.16),'527369',4);
 }
 // The shoal follows an oblique line across the central clearing.
 for(let i=0;i<21;i++){
  let t=i/20,x=-2.72+t*5.09+range(-.41,.41),z=-15.31-range(-.53,1.37),y=2.20+.58*Math.sin(t*3.9)+range(-.30,.33);
  fish(x,y,z,range(.183,.357),range(-.29,.25),'a5b7ac');
 }
 for(let i=0;i<5;i++)fish(-.97+i*.322+range(-.13,.13),1.46+range(-.17,.15),-12.86+range(-.35,.32),range(.139,.218),.34,'9aaea0');
 // Sparse pale polyps on the two nearer rocks catch the blue falloff.
 for(let [x,y,z] of [[-2.91,.76,-10.22],[2.30,.533,-11.16],[-1.94,.39,-10.95]]){
  for(let i=0;i<8;i++){
   let px=x+range(-.11,.11),pz=z+range(-.09,.09),h=range(.027,.11);
   rod([px,y,pz],[px+.01,y+h,pz],.0045,'769180',M.LIFE,6);
   ellipsoid([px+.01,y+h,pz],[.012,.008,.012],'96b8a3',M.LIFE,8,5);
  }
 }
}


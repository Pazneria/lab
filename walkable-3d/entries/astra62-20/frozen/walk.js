export const F=.90,L=3.66,W=1.39,stairZ=.15;
export const start={x:-5.60,z:6.30};
export const endStep=-4.18,tread=.29,stepStart=endStep-4*tread;
export const radius=.193,eye=1.59,height=1.75;
export const solids=[];
function rect(x,z,w,d,rot=0,minY=-1,maxY=5){solids.push({x,z,w:w/2,d:d/2,co:Math.cos(rot),si:Math.sin(rot),minY,maxY})}
function circle(x,z,r,minY=-1,maxY=5){solids.push({x,z,r,minY,maxY})}
export function makeBounds(){
  solids.length=0;
  rect(0,-W,2*L+.10,.13);
  rect(0,W,2*L+.10,.13);
  rect(L,0,.14,2*W);
  for(const [a,b] of [[-W,-.48],[.78,W]])rect(-L,(a+b)/2,.14,b-a);
  // The door is folded back outside against its hinge stop.
  rect(-4.23,-.69,1.16,.075,-.29);
  rect(-4.15,stairZ+.63,.93,.065);rect(-4.81,stairZ+.64,1.35,.065);
  // Built-in berth, personal desk, folded stool, stove and work furniture.
  rect(-2.44,-.968,2.23,.81,0,F,F+1.07);
  rect(-2.59,1.118,1.45,.49,0,F,F+1.09);
  rect(-.76,1.04,.69,.58,0,F,F+1.20);
  rect(-.65,-1.14,1.17,.37,0,F,F+1.65);
  rect(1.73,-1.05,3.30,.63,0,F,F+1.02);
  rect(2.832,1.179,1.067,.353,0,F,1.826);
  rect(3.37,.23,.46,1.58,0,F,F+1.54);
  rect(1.57,1.87,3.42,.94,0,.42,1.38);
  for(const x of [-2.59,2.63])for(const s of [-1,1])rect(x,s*1.536,1.15,.25,0,0,1.28);
  for(const x of [-.22,3.5])circle(x,3.06,.057);
  // Guy pegs and shafts have visible geometry at their actual locations.
  for(const side of [-1,1])rect(4.55,side*.78,1.80,.12,side*-.04,0,.73);
  rect(5.005,0,.274,1.82,0,0,.52);
  rect(3.814,0,.091,1.54,0,.54,.68);
  rect(2.46,3.76,.88,.53,-.13,0,.67);
  rect(3.22,3.83,.50,.44,.14,0,.54);
  circle(-.98,4.40,.23,0,.48);
  circle(4.45,-2.08,.60,0,1.5);
  rect(-3.12,-1.75,.9,.47,0,0,.7);
}
export function floorHeight(x,z){
  if(x>=-L-.07&&x<=L+.04&&Math.abs(z)<=W+.025)return F;
  if(Math.abs(z-stairZ)<=.61&&x>=stepStart-1e-7&&x< -L){
    return x>=endStep?F:.18*(1+Math.min(3,Math.floor((x-stepStart+.000001)/tread)));
  }
  return 0;
}
export function clearAt(x,z,y=floorHeight(x,z)){
  if((x/11.3)**2+(z/9.4)**2>1)return false;
  for(const s of solids){
    if(y>=s.maxY-.018||y+height<=s.minY)continue;
    const dx=x-s.x,dz=z-s.z;
    if(s.r){if(dx*dx+dz*dz<(s.r+radius)**2)return false;continue}
    const u=s.co*dx-s.si*dz,v=s.si*dx+s.co*dz;
    const a=Math.max(Math.abs(u)-s.w,0),b=Math.max(Math.abs(v)-s.d,0);
    if(a*a+b*b<radius*radius)return false;
  }
  return true;
}
export function walk(p,dx,dz){
  const count=Math.max(1,Math.ceil(Math.hypot(dx,dz)/.065));
  for(let i=0;i<count;i++){
    for(const [a,b] of [[dx/count,0],[0,dz/count]]){
      const x=p.x+a,z=p.z+b,y=floorHeight(x,z);
      if(Math.abs(y-floorHeight(p.x,p.z))<.207&&clearAt(x,z,y)){p.x=x;p.z=z}
    }
  }
}

export const FLOOR=1.25;
export const WATER=.065;
export const START={x:-.75,z:-2.9,yaw:Math.PI+.15,pitch:-.035};
export const RAMP={x0:4.65,x1:6.45,z0:3.6,z1:8.6,top:FLOOR,bottom:.22};
export const PIER={x0:-1.32,x1:1.32,z0:3.6,z1:18};
export const DECK={x0:-4.5,x1:6.45,z0:1.25,z1:3.6};
export const WORKSHOP={x0:-3.6,x1:3.6,z0:-6.0,z1:1.25};
export const BOAT={x:8.5,z:5.9,angle:-.18};
// These are shared by the rendered construction and the CPU-only route checks.
export const FIXED_OBSTACLES=[
 {x:-3.66,z:-2.4,hx:.115,hz:3.75,angle:0},
 {x:3.66,z:-2.4,hx:.115,hz:3.75,angle:0},
 {x:0,z:-6.07,hx:3.725,hz:.11,angle:0},
 {x:-2.44,z:1.29,hx:1.21,hz:.15,angle:0},
 {x:2.44,z:1.29,hx:1.21,hz:.15,angle:0},
 {x:2.74,z:-3.52,hx:.62,hz:1.74,angle:0},
 {x:-2.98,z:-4.33,hx:.525,hz:1.325,angle:0},
 {x:-.89,z:15.8,hx:.31,hz:.8,angle:0},
 {x:BOAT.x,z:BOAT.z,hx:.95,hz:2.46,angle:BOAT.angle},
 {x:4.45,z:-5.45,hx:.425,hz:.425,angle:0},
 {x:0,z:-7.65,hx:2.425,hz:.6,angle:0}
];
export const INSPECTION_ROUTE=[[-.75,-2.9],[0,-.2],[0,2.6],[0,17.15],[0,2.65],[5.55,2.65],[5.55,9.15],[7.1,9.55],[10.65,9.25],[11.35,6.35],[10.95,2.7],[7.05,2.55],[6.85,4.05],[6.85,8.85],[5.55,9.15],[5.55,2.65],[0,2.65],[0,-2.9]];
export function nearInspectionRoute(x,z,radius=.65){
 for(let i=1;i<INSPECTION_ROUTE.length;i++){
  const a=INSPECTION_ROUTE[i-1],b=INSPECTION_ROUTE[i],dx=b[0]-a[0],dz=b[1]-a[1],t=Math.max(0,Math.min(1,((x-a[0])*dx+(z-a[1])*dz)/(dx*dx+dz*dz)));
  if(Math.hypot(x-a[0]-t*dx,z-a[1]-t*dz)<radius)return true;
 }
 return false;
}
export function smooth(a,b,x){const t=Math.max(0,Math.min(1,(x-a)/(b-a)));return t*t*(3-2*t);}
export function terrainHeight(x,z){
 const base=1.12-smooth(-3,8,z)*.90-Math.max(0,z-8)*.062;
 const detail=(Math.sin(x*.7+z*.31)*.024+Math.sin(x*1.4-z*.4)*.013)*smooth(-1,6,z);
 const inland=smooth(14,36,-z)*(2.2+1.3*Math.sin(x*.083-z*.02));
 const sides=smooth(17,38,Math.abs(x))*(1-smooth(1,14,z))*(1.6+Math.sin(z*.18+x*.11)*.75);
 return base+detail+inland+sides;
}
export function inside(r,x,z,pad=0){return x>=r.x0+pad&&x<=r.x1-pad&&z>=r.z0+pad&&z<=r.z1-pad;}
export function surfaceAt(x,z){
 if(inside(WORKSHOP,x,z)||inside(DECK,x,z)||inside(PIER,x,z)) return {y:FLOOR,type:'timber'};
 if(inside(RAMP,x,z)){const t=(z-RAMP.z0)/(RAMP.z1-RAMP.z0);return{y:RAMP.top+(RAMP.bottom-RAMP.top)*t,type:'ramp'};}
 return {y:terrainHeight(x,z),type:'shore'};
}
export function routeArea(x,z){
 if(inside(WORKSHOP,x,z))return ['01','THE WORKSHOP','Tools, timber & the morning tide'];
 if(inside(PIER,x,z)&&z>4.2)return ['02','THE PIER','Quiet water · a fixed low tide'];
 if(inside(RAMP,x,z))return ['03','SHORE ACCESS','Follow the handrail to the exposed shore'];
 if(x>6.7&&z>3)return ['04','THE BOAT','Paint, oak ribs & the salt line'];
 if(z>3.6)return ['03','EXPOSED SHORE','Damp stone & shallow water'];
 return ['01','THE BOATHOUSE','Stillwater · est. 1938'];
}

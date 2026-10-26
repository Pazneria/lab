// Axis-aligned walking boundaries, kept separate so the route can be checked without WebGL.
export const obstacles = [
 [-1.42,1.42,-2.08,-.02],
 [-4.92,-3.88,-2.2,1.9],[3.86,4.92,-3.2,.45],
 [-4.8,-2.1,-5.75,-4.78],[2.9,4.2,-4.65,-3.45],[2.55,3.55,.85,1.8],
 [-4.9,-2.65,4.6,6.22],[3.86,4.92,3.55,7.15],[2.45,4.4,6.55,7.55],
 [.35,3.45,10.78,13.9],[-4.72,-2.55,11.72,13.95],[-4.7,-3.85,8.6,9.58]
];
export const radius=.21;
export function blocked(px,pz){
 if(px<-4.7||px>4.7||pz<-5.72||pz>14.7)return true;
 if(Math.abs(pz-3)<radius+.12 && Math.abs(px)>2.28)return true;
 if(Math.abs(pz-8)<radius+.12 && Math.abs(px)>2.36)return true;
 for(const [a,b,c,d] of obstacles)if(px>a-radius&&px<b+radius&&pz>c-radius&&pz<d+radius)return true;
 return false;
}
export function movement(yaw,forward,side){
 return {dx:Math.sin(yaw)*forward-Math.cos(yaw)*side,dz:Math.cos(yaw)*forward+Math.sin(yaw)*side};
}

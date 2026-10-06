import {obstacle,obstacles} from './navigation.js';

// Collision-only layout. Kept independent of Three.js so routes can be checked
// without creating, rendering, or executing the 3D scene.
export function installCollisionLayout(){
  obstacles.length=0;
  const add=obstacle;
  const shelf=(x,y,z,w,h,a=0)=>{const d=.47;add(x,z,Math.abs(Math.cos(a))*w+Math.abs(Math.sin(a))*d+.05,Math.abs(Math.sin(a))*w+Math.abs(Math.cos(a))*d+.09,y,y+h+.09);};
  for(let i=0;i<6;i++){const x=-6.6+i*2.64;shelf(x,0,-8.68,2.47,2.62);shelf(x,3.45,-8.68,2.47,2.62);}
  shelf(-7.68,0,-2.32,3.3,2.62,Math.PI/2);shelf(-7.68,0,-6.85,2.7,2.62,Math.PI/2);
  shelf(-7.68,3.45,-2.35,3.4,2.62,Math.PI/2);shelf(-7.68,3.45,-6.25,3.35,2.62,Math.PI/2);
  for(const [x,z]of [[-2.75,-1.68],[3.85,-1.78]]){shelf(x-.21,0,z,3.15,1.6,-Math.PI/2);shelf(x+.21,0,z,3.15,1.6,Math.PI/2);}
  for(const [x,y,z]of [[-.94,0,3.72],[1.35,0,1.37],[10.32,0,2.33],[10.33,0,5.79],[3.69,3.46,-7.98],[.21,3.46,-7.1]])add(x,z,1.02,1.02,y,y+1.4);
  for(const [x,y,z,w,d]of [[.2,0,2.55,3.4,1.28],[3.7,3.46,-7.04,2.45,1.08],[1.35,3.46,-6.79,.64,.66],[5.68,0,-6.65,1.6,.62]])add(x,z,w,d,y,y+.9);
  add(10.48,4.15,.94,.94,0,.7);add(9.22,5.24,.75,.58,0,.52);
  for(const [x,y,z,s]of [[11.03,0,6.45,1.2],[7.28,0,.26,.82],[7.31,3.46,-5.99,1]])add(x,z,.48*s,.48*s,y,y+.4*s);
  add(-5.4,-2.1,.8,.8,3.4,4.9);add(-2.07,8.37,1.45,1.03,0,3.2);add(-2.98,8.51,.56,.6,0,.55);add(-5.05,-7.86,.67,.76,0,2.6);
  add(0,8.84,2.05,.26,0,3.25);
  for(const x of [-7.63,-4.65,-.6,3.5,7.65])add(x,-5.38,.34,.34,0,3.15);
  for(const z of [-2.6,.17])add(-4.72,z,.33,.33,0,3.15);
  for(const z of [1.05,6.94])add(8.02,z,.42,.42,0,4.65);
  add(1.635,-5.13,12.47,.12,3.4,4.7);add(-4.54,-2.385,.12,5.61,3.4,4.7);
  for(const x of [-7.55,-4.79])add(x,3.55,.12,6.52,0,4.8);
  return obstacles;
}

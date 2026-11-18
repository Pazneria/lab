import {PI,TAU,UP,rad,radial,unit,sub,cross,mul,add,randomSource} from './geometry.js';
import {F,INNER,OUTER} from './layout.js';
import {pebble} from './landscape.js';
const rnd=randomSource(898234);
// Local +z is the sheltered wall. Height and ripple amplitude die out at
// the loose front. Individual fragments continue beyond the drift.
function drift(g,width,depth,height,seed,curved=0){
  const rand=randomSource(seed),C=23,R=9,rows=[];
  const jitter=Array.from({length:C+1},()=>rand());
  for(let j=0;j<=R;j++){
    const v=j/R,row=[];
    for(let i=0;i<=C;i++){
      const u=i/C,x=width*(u-.5),env=Math.sin(PI*u)**.62;
      const curve=curved?-(x*x)/(2*curved):0;
      const front=env*depth*(.88+.12*Math.sin(u*TAU*2+.4)+.09*Math.sin(u*TAU*4)+.08*jitter[i]);
      const z=curve-front*(1-v);
      const wav=.10*Math.sin(u*TAU*3+v*6)+.042*Math.sin(u*TAU*7.1-.7*v);
      const y=.007+env*height*v**1.36*(.88+wav)+.006*Math.sin(PI*v)*env*(jitter[i]-.5);
      row.push([x,y,z]);
    }rows.push(row);
  }
  for(let j=0;j<R;j++)for(let i=0;i<C;i++){
    const A=rows[j][i],B=rows[j][i+1],C1=rows[j+1][i+1],D=rows[j+1][i];
    const face=i===0?[A,B,C1]:(i===C-1?[A,B,D]:[A,B,C1,D]);
    g.face('sand',face,UP,{tone:.93+.035*j/R,tint:[1,.995,.96]});
  }
  for(let j=0;j<Math.ceil(width*13);j++){
    const u=.02+rand()*.96,x=(u-.5)*width,f=Math.sin(PI*u)**.61;
    const z=-(depth*f*(.82+.57*rand())+(curved?x*x/(2*curved):0));
    const r=.011+rand()**2*.038;
    pebble(g,x,.006,z,r,r*.32,r*(.61+rand()*.68),rand()*TAU,j%4?'sand':'stone',.91+rand()*.13,seed+j);
  }
}
function edgeDrifts(g){
  // Leeward and furniture-protected pockets retain sand; traffic lanes stay clear.
  for(const [a,w,d,h,s] of [[1.84,1.18,.25,.062,1],[2.62,1.31,.39,.098,79],[-.50,.83,.22,.045,112],[-2.82,1.03,.26,.056,149]]){
    g.at(0,F+.003,0,a,()=>g.at(0,0,INNER-.069,0,()=>drift(g,w,d,h,1000+s,INNER)));
  }
  for(const [x,z,a,w,d,h,s] of [[4.838,-9.17,PI/2,2.35,.62,.17,13],[-4.837,-12.06,-PI/2,1.74,.43,.13,43],
    [.95,-14.965,PI,2.38,.64,.18,68],[-1.84,-6.91,0,.60,.23,.067,100],
    [1.625,10.89,PI/2,1.49,.41,.084,133],[-1.619,8.93,-PI/2,.97,.23,.052,167],
    [-1.2,14.58,0,1.29,.43,.11,201]]){
    g.at(x,0,z,a,()=>drift(g,w,d,h,3000+s));
  }
}
// Deposits of old limewash and short drain stains hug the curved surface;
// use small facets here so the corners of decals cannot float off the wall.
function curvedPatch(g,mat,a,R,y,w,h,inward){
  const steps=Math.max(3,Math.ceil(w/.13));
  for(let j=0;j<steps;j++){
    const u=j/steps,v=(j+1)/steps,s=a+(u-.5)*w/R,t=a+(v-.5)*w/R;
    g.face(mat,[rad(s,R,y-h/2),rad(t,R,y-h/2),rad(t,R,y+h/2),rad(s,R,y+h/2)],radial((t+s)/2,inward?-1:1),
      {uv:[[u,0],[v,0],[v,1],[u,1]]});
  }
}
function wallPatina(g){
  // Patches avoid archivolts, charts, and glazed bands.
  for(const [a,y,w,h] of [[.58,1.91,.88,.44],[1.13,1.65,.42,.22],[1.80,3.49,.75,.36],[2.69,1.83,.97,.39],
    [-.56,2.51,.53,.28],[-1.22,1.74,.61,.29],[-2.65,3.09,.71,.44],[-2.89,2.23,.40,.41],[-1.96,3.73,.71,.21]]){
    curvedPatch(g,'spall',a,INNER-.008,y,w,h,true);
  }
  for(const [a,y,w,h] of [[2.59,1.03,.99,.51],[2.80,2.39,.64,.34],[-2.78,1.62,.74,.49],[-2.45,3.19,.72,.44],
    [1.96,1.50,.87,.48],[.71,1.33,.54,.28],[-.75,3.03,.48,.31],[1.13,3.36,1.14,.58]]){
    curvedPatch(g,'spall',a,OUTER+.008,y,w,h,false);
  }
  for(const a of [-2.24,2.25,-.94,.92]){
    curvedPatch(g,'soot',a,OUTER+.01,1.37,.71,.75,false);
  }
  g.at(-1.684,1.04,10.4,PI/2,()=>g.decal('spall',0,0,0,.78,.39));
  g.at(1.684,1.34,8.58,-PI/2,()=>g.decal('spall',0,0,0,.55,.26));
  for(const [x,z,a,w,h,y] of [[5.05-.193,-10.25,-PI/2,.95,.39,.45],[-5.05+.193,-8.52,PI/2,1.1,.34,.41],[1.13,-15.18+.193,0,1.23,.38,.43]])
    g.at(x,y,z,a,()=>g.decal('spall',0,0,0,w,h));
}
export function buildWeathering(g){
  g.section('sheltered edges',false,()=>edgeDrifts(g));
  g.section('limewash and runoff',false,()=>wallPatina(g));
}

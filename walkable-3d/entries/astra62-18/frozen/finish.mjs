import {twoSided,material,box,rod,path,at,roll,lathe,art,ellipsoid,quad,triangle,basis,unit,sub,add,mul,cross,clamp,curved,rectCollision} from './geometry.mjs';
export const M={
 body:material('a8ada5'),light:material('ced1c6'),cream:material('d7cbb6'),sand:material('b9b3a2'),
 dark:material('26383a'),blue:material('476363'),deep:material('2b4447'),sea:material('607d78'),sea2:material('718c82'),
 seam:material('202a2b',5),black:material('222e2e',5),pad:material('344745',5),
 steel:material('8b9c9b',1),nickel:material('b7c1b9',1),gun:material('536164',1),iron:material('334144',1),
 brass:material('c09860',10),bronze:material('92754f',10),copper:material('b68059',10),
 wood:material('ae7950',2),walnut:material('81553d',2),woodDark:material('6c4c38',2),
 linen:material('d7cbb5',3),bone:material('e1d9c6',3),pillow:material('bdc7b5',3),
 quilt:material('b65f41',4),clay:material('ae7156'),rust:material('8d4937',3),
 cord:material('414e50',3),tealWool:material('49716f',4),mintWool:material('69867a',4),
 ochre:material('c6a16a',3),stripe:material('dfbb89',3),
 deck:material('626e6b',6),deck2:material('68736d',6),carpet:material('738079',4),
 porcelain:material('c4c9ac',7),glaze:material('438a80',7),amber:material('bb7847',7),tea:material('4f3122',7),
 paper:material('dfd5bb',8),paperEdge:material('bdb197',8),stone:material('9ba6a2',9),
 leaf:material('4e7552',7),leafHi:material('819960',7),leafD:material('385843',7),
 warm:material('ffda9f',11),lamp:material('fff0cb',11),cool:material('d6ece9',11),status:material('e8ae64',11),
 glass:material('7a9a9b',15)
};
export const TAU=2*Math.PI;
export let rand=(()=>{let s=42387;return ()=>((s=(Math.imul(s,1664525)+1013904223)>>>0)/4294967296);})();
export function front(x,y,z,w,h,d,m,r=.012){box(x,y,z,w,h,d,m,r);}
export function pin(x,y,z,r=.011,m=M.gun){rod([x,y,z-.002],[x,y,z+.002],r,m,8);}
export function handle(x,y,z,w=.19,vertical=false){
 const body=()=>{for(const k of [-1,1]){box(k*(w/2-.012),0,.012,.027,.026,.032,M.gun,.003,2,false);}
 box(0,0,.035,w,.026,.024,M.nickel,.007,2,false);};
 if(vertical)roll(x,y,z,Math.PI/2,body);else at(x,y,z,0,body);
}
export function drawer(x,y,z,w,h,m=M.sea,grip=true){
 box(x,y,z,w,h,.038,m,.012,.35);if(grip){box(x,y+h*.15,z+.021,w*.30,.027,.008,M.seam,.004,1,false);box(x,y+h*.15+.009,z+.028,w*.31,.012,.017,M.brass,.003,1,false);}
}
export function sign(tile,x,y,z,w,h,back=M.gun){
 box(x,y,z,w+.024,h+.024,.015,back,.004,1,false);art(tile,[x,y,z+.009],[w,0,0],[0,h,0]);
}
export function boardFrame(tile,x,y,z,w,h){
 box(x,y,z,w+.065,h+.065,.05,M.woodDark,.012);
 box(x,y,z+.029,w+.032,h+.032,.012,M.brass,.004,1,false);
 art(tile,[x,y,z+.037],[w,0,0],[0,h,0]);}
export function book(x,y,z,w,h,d,m,angle=0,label=false){
 at(x,y,z,angle,()=>{
 box(0,h/2,0,w-.009,h-.011,d-.016,M.paperEdge,.004,2,true);
 for(const k of [0,1])box(0,.003+k*(h-.006),0,w,.006,d,m,.002,2,false);
 box(-w*.5+.004,h*.5,0,.012,h,d,m,.003,2,false);
 for(const t of [-.3,.32])box(-w*.5-.002,h*.5,t*d,.002,h*.60,.014,M.brass,0,2,false);
 if(label)art(12,[0,h+.0009,-d*.12],[w*.69,0,0],[0,0,-d*.48]);
 });}
export function standingBooks(x,y,z,n,seed=0){
 let off=0;const mats=[M.clay,M.deep,M.cream,M.woodDark,M.sea,M.dark,M.sand];
 for(let i=0;i<n;i++){
  const w=.029+rand()*.032,h=.19+rand()*.11,d=.145+rand()*.047;
  box(x+off+w/2,y+h/2,z,w,h,d,mats[(i+seed)%mats.length],.004,1,false);
  for(const yoff of [.17,.77,.82])box(x+off+w/2,y+h*yoff,z+d/2+.001,w*.69,.004,.002,M.brass,0,1,false);
  if(i%3===1)box(x+off+w/2,y+h*.57,z+d/2+.001,w*.6,.046,.002,M.paper,0,1,false);off+=w+.004;
 }
 return off;
}
export function mug(x,y,z,r=.046,m=M.glaze,ang=0){
 at(x,y,z,ang,()=>{lathe(0,0,0,[[.002,.002],[r*.72,.002],[r*.80,.009],[r*.97,.021],[r,.089],[r*.97,.095],[r*.83,.095],[r*.83,.082],[.001,.082]], [M.porcelain,M.porcelain,m,m,m,M.porcelain,M.porcelain,M.tea],28);
 const pts=[];for(let i=0;i<=12;i++){let a=-Math.PI/2+i*Math.PI/12;pts.push([r*.88+.029*Math.cos(a),.055+.026*Math.sin(a),0]);}path(pts,.0065,m,8);});
}
export function pot(x,y,z,scale=1){
 const r=.125*scale;
 lathe(x,y,z,[[.001,0],[r*.68,0],[r*.79,.015*scale],[r,.155*scale],[r,.176*scale],[r*.87,.179*scale],[r*.86,.155*scale],[0,.15*scale]], [M.sand,M.amber,M.amber,M.porcelain,M.porcelain,M.porcelain,M.woodDark],30);
 for(let i=0;i<19;i++){let a=i*2.4+rand()*.22,L=(.14+rand()*.17)*scale,W=(.029+rand()*.027)*scale,ht=(.13+rand()*.18)*scale;
 const D=[Math.cos(a),0,Math.sin(a)],side=[-D[2],0,D[0]],base=[x+D[0]*rand()*.045*scale,y+.157*scale,z+D[2]*rand()*.045*scale];
 let stem=add(base,[D[0]*L*.16,ht*.38,D[2]*L*.16]);rod(base,stem,.003*scale,M.leafD,5);
 twoSided(()=>curved(4,9,(s,t)=>{let p=add(stem,mul(D,L*(.12*t+.88*t*t)));p[1]+=ht*(1.32*t-.87*t*t);p=add(p,mul(side,(s-.5)*2*W*Math.pow(Math.max(.00002,Math.sin(Math.PI*t)),.72)));p[1]+=(1-Math.abs(s*2-1))*.014*scale*Math.sin(t*Math.PI);return p;},[M.leaf,M.leafHi,M.leafD][i%3],(s,t)=>[s*.09,t*.3],false,!!(i%2)));
 }
}
export function chamferLoop(w,h,r,cy=0){const l=-w/2,e=w/2,b=cy-h/2,t=cy+h/2;return [[l+r,b],[e-r,b],[e,b+r],[e,t-r],[e-r,t],[l+r,t],[l,t-r],[l,b+r]];}
export function ring(outer,inner,z0,z1,m,step=.25){
 for(let i=0;i<outer.length;i++){let j=(i+1)%outer.length;quad([...outer[i],z0],[...outer[j],z0],[...inner[j],z1],[...inner[i],z1],m,step);}
}
export function shapeFace(loop,z,m){const x=loop.reduce((s,p)=>s+p[0],0)/loop.length,y=loop.reduce((s,p)=>s+p[1],0)/loop.length;
 for(let i=0;i<loop.length;i++){const j=(i+1)%loop.length;triangle([x,y,z],[...loop[i],z],[...loop[j],z],m);}
}

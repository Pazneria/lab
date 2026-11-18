import {box,quad,rod,path,at,art,rectCollision,lamp,material} from './geometry.mjs';
import {M,TAU,handle,pin,sign,ring,chamferLoop,shapeFace} from './finish.mjs';
const Z0=-6.68,Z1=5.36,X=3.12,H=2.83;
export function wall(side,z,f){at(side*X,0,z,side<0?Math.PI/2:-Math.PI/2,f);}
const strip=(x,y,z,w,h,d,m)=>box(x,y,z,w,h,d,m,0,2,false);
function section(side,z0,z1,idx){
 const z=(z0+z1)/2,d=z1-z0;
 wall(side,z,()=>{
  box(0,1.11,-.056,d,2.22,.112,M.seam);
  box(0,.085,.003,d-.009,.17,.050,M.iron,.006);
  box(0,.42,.010,d-.014,.474,.056,idx%4===1?M.blue:M.deep,.009);
  strip(0,.681,.012,d-.005,.031,.021,M.gun);
  box(0,1.444,.002,d-.012,1.467,.054,idx%3===2?M.sand:M.body,.012,.26);
  for(const i of [-1,1])for(const h of [.759,2.127]){
   pin(i*(d/2-.048),h,.031,.008,M.gun);
  }
 });
 const a=side*(X-.005),b=side*2.58,lo=2.20,hi=2.824;
 const q=[[a,lo,z0+.009],[b,hi,z0+.009],[b,hi,z1-.009],[a,lo,z1-.009]];
 if(side>0)q.reverse();
 quad(...q,idx%3===1?M.sand:M.body,.23);
 const backing=q.map(([x,y,z])=>[x+side*.015,y+.018,z===z0+.009?z0:z1]);quad(...backing,M.seam);
 // A slim service gasket traces the change of plane.
 box(side*3.094,2.195,z,.069,.034,d-.004,M.iron,.006,.65);
}
function portal(z,wide,heavy){
 const outer=[[-3.14,-.04],[3.14,-.04],[3.14,2.23],[2.60,2.85],[-2.60,2.85],[-3.14,2.23]];
 const inner=[[-wide,.008],[wide,.008],[wide,2.065],[wide-.48,2.59],[-wide+.48,2.59],[-wide,2.065]];
 const lip=inner.map(([x,y])=>[x*.986,y>.02?y-.028:y]);
 const d=heavy?.21:.135;
 ring(outer,inner,z+d/2,z+d/2,M.cream);
 ring(outer.slice().reverse(),inner.slice().reverse(),z-d/2,z-d/2,M.body);
 ring(inner,inner,z+d/2,z-d/2,M.blue);
 ring(inner,lip,z+.032,z+.018,M.gun);
 ring(lip,lip,z+.018,z-.018,M.steel);
 ring(lip,inner,z-.018,z-.032,M.gun);
 for(const s of [-1,1]){
  const w=X-wide;
  rectCollision(s*(X-w/2),z,w+.045,d+.025);
  box(s*(wide+w*.53),1.30,z+d/2+.006,.026,1.55,.016,M.bronze,.003);
  for(const h of [.31,1.96])for(const x of [wide+.067,X-.061])pin(s*x,h,z+d/2+.009,.012);
  if(heavy){
   sign(7,s*(wide+w*.5),1.58,z+d/2+.011,.27,.088);
   for(let i=0;i<6;i++)strip(s*(wide+w*.52),.47+i*.043,z+d/2+.01,w*.4,.011,.015,M.iron);
  }
 }
 box(0,.005,z,wide*2,.012,d+.05,M.gun,0,1,false);
 for(const s of [-1,1])strip(0,.012,z+s*.057,wide*2,.004,.009,M.nickel);
}
function ceiling(){
 const rows=[Z0,-5.24,-3.65,-2.12,-.68,.83,2.35,3.88,Z1];
 box(0,H+.045,(Z0+Z1)/2,5.24,.09,Z1-Z0,M.seam,0,.45);
 for(let i=1;i<rows.length;i++){
  const z=(rows[i-1]+rows[i])/2,d=rows[i]-rows[i-1];
  for(const s of [-1,1]){
   box(s*1.67,H-.014,z,1.80,.036,d-.018,M.body,.012,.34);
   box(s*.371,H-.006,z,.724,.043,d-.019,M.sand,.01,.32);
   box(s*.754,H-.017,z,.026,.040,d-.05,M.iron,.004);
  }
  // Flush luminaires with dark perimeter and milled end caps.
  if([1,3,5,7].includes(i)){
   const s=i===7?-1:1,xx=i===1?0:s*.52,len=i===1?.72:1.02;
   box(xx,2.781,z,.154,.045,len+.065,M.gun,.015);
   box(xx,2.755,z,.119,.012,len,M.cream,.005,1,false);
   for(const k of [-1,1])box(xx+k*.029,2.746,z,.038,.009,len-.048,i===1?M.cool:M.lamp,.003,1,false);
   for(const k of [-1,1])strip(xx,2.744,z+k*len*.415,.109,.007,.011,M.steel);
   lamp([xx,2.70,z],i===1?[.68,.87,1]:[1,.86,.68],1.75,4.7,[0,-1,0],.30);
  }
 }
 for(const z of [-5.26,-2.13,2.35,5.25]){
  box(0,2.767,z,5.14,.091,.073,M.gun,.011,.40);
  for(const s of [-1,1]){rod([s*2.51,2.75,z],[s*3.057,2.11,z],.046,M.gun,8);box(s*3.047,1.24,z,.064,1.76,.076,M.gun,.012,.40);}
 }
}
function deck(){
 const zcuts=[Z0,-5.60,-4.61,-3.65,-2.51,-1.39,-.28,.83,1.98,3.10,4.23,Z1];
 const xcuts=[-X,-2.27,-.82,.82,2.27,X];
 quad([-X,-.023,Z1],[X,-.023,Z1],[X,-.023,Z0],[-X,-.023,Z0],M.seam,.28);
 for(let j=1;j<zcuts.length;j++)for(let i=1;i<xcuts.length;i++){
  const a=xcuts[i-1]+.004,b=xcuts[i]-.004,c=zcuts[j-1]+.004,d=zcuts[j]-.004;
  quad([a,0,d],[b,0,d],[b,0,c],[a,0,c],(i+j)%5===0?M.deck2:M.deck,.19);
  if((i===2||i===4)&&j%2===0){
   const x=i===2?a+.065:b-.065;
   box(x,.002,c+.09,.030,.004,.106,M.gun,.001,1,false);
   box(x,.005,c+.09,.012,.002,.064,M.seam,0,1,false);
  }
 }
}
function hatch(){
 // A closed pressure hatch at the entrance, with pocket-door leaves.
 at(0,0,Z1,-Math.PI,()=>{
  box(0,1.41,-.075,6.28,2.84,.15,M.body);
  for(const x of [-2.53,1.26,2.56])box(x,1.42,.026,1.14,2.63,.065,M.sand,.025);
  at(-.93,0,.04,0,()=>{
   const a=chamferLoop(1.58,2.37,.22,1.19),b=chamferLoop(1.39,2.19,.184,1.135),c=chamferLoop(1.33,2.14,.170,1.13);
   ring(a,b,.095,.105,M.gun);ring(b,c,.105,.064,M.nickel);
   shapeFace(c,.055,M.deep);
   for(const s of [-1,1]){
    box(s*.303,1.12,.068,.585,1.86,.024,M.sea,.024);
    strip(s*.307,1.71,.085,.53,.014,.010,M.brass);
   }
   sign(0,-.312,1.54,.088,.39,.178);
   handle(.095,1.005,.11,.23,true);
   for(const s of [-1,1])for(const y of [.42,1.88])pin(s*.72,y,.102,.018);
  });
  box(-1.90,1.29,.092,.145,.325,.076,M.gun,.023);
  box(-1.90,1.34,.134,.100,.154,.016,M.black,.009);
  strip(-1.90,1.375,.144,.053,.009,.005,M.status);
  for(let i=0;i<3;i++)strip(-1.93+i*.027,1.23,.138,.015,.015,.006,M.steel);
  sign(0,.41,1.58,.074,.65,.29);
  for(let k=0;k<7;k++)strip(2.46,.574+k*.047,.064,.66,.015,.015,M.iron);
 });
}
export function hull(){
 deck();ceiling();const cuts=[Z0,-5.24,-3.65,-2.13,-.67,.83,2.35,3.87,Z1];
 for(const side of [-1,1])for(let i=1;i<cuts.length;i++)section(side,cuts[i-1],cuts[i],i);
 portal(.83,2.55,false);portal(-3.65,2.41,true);hatch();
}

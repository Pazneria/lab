import * as T from './vendor/three.module.min.js';
import {PI,TAU,mix,randomSeed} from './geometry.js';
import {C} from './materials.js';
import {shadow} from './rooms.js';

export function turnedLeg(b,x,z,h,r=.057){
  const pf=[[.76,0],[.93,.034],[.9,.065],[.57,.092],[.50,.18],[.66,.235],[.58,.29],[.45,.32],[.69,.50],[.93,.69],[1,.74],[.75,.78],[1,.82],[.98,1]];
  b.lathe([x,0,z],pf.map(([rr,yy])=>[r*rr,h*yy]),'wood',C.walnut,14);
  b.cyl([x,h*.073,z],r*.70,r*.74,h*.023,'brass',C.brass,12);
}
export function pull(b,x,y,z,w=.14){
  for(const s of [-1,1]){
    b.cyl([x+s*w/2,y,z+.008],.026,.026,.018,'brass',C.bronze,12,[PI/2,0,0]);
  }
  b.curve([[x-w/2,y,z+.017],[x-w*.38,y-.022,z+.052],[x,y-.036,z+.066],[x+w*.38,y-.022,z+.052],[x+w/2,y,z+.017]],.009,'brass',C.brass,13,6);
}
export function drawer(b,x,y,z,w,h){
  b.box([x,y,z],[w,h,.06],'wood',C.dark);
  b.box([x,y,z+.033],[w-.028,h-.028,.028],'wood',C.wood);
  b.box([x,y,z+.052],[w-.10,h-.085,.021],'wood',C.walnut);
  pull(b,x,y,z+.069,Math.min(w*.23,.18));
}
export function workTable(b,w,d,h,drawers=true,col=C.oak){
  for(const x of [-1,1])for(const z of [-1,1])turnedLeg(b,x*(w/2-.10),z*(d/2-.10),h-.067,.071);
  b.box([0,h-.067,0],[w-.014,.060,d-.025],'wood',C.walnut);
  b.box([0,h-.023,0],[w,.056,d],'wood',col);
  for(const z of [-1,1])b.box([0,h-.157,z*(d/2-.087)],[w-.20,.18,.066],'wood',C.walnut);
  for(const x of [-1,1])b.box([x*(w/2-.096),h-.157,0],[.075,.18,d-.18],'wood',C.walnut);
  if(drawers){
    const count=w>2?3:2;
    for(let i=0;i<count;i++)drawer(b,w*(i+.5)/count-w/2,h-.144,d/2-.05,w/count-.12,.152);
  }
}
export function stool(b,p,h=.47,col=C.coral,rotate=0){
  shadow(b,p[0],p[2],.77,.73);
  b.local(p,[0,rotate,0],()=>{
    for(let i=0;i<4;i++){
      const a=(i+.5)*PI/2;
      b.rod([.234*Math.cos(a),0,.234*Math.sin(a)],[.143*Math.cos(a),h-.055,.143*Math.sin(a)],.028,'wood',C.walnut,12,.039);
    }
    b.torus([0,.168,0],.188,.014,'brass',C.bronze,[-PI/2,0,0],28);
    b.cyl([0,h-.056,0],.234,.219,.085,'wood',C.trim,32);
    b.oval([0,h-.018,0],[.236,.062,.236],'cloth',col,24);
    b.torus([0,h-.02,0],.23,.0055,'silk',C.flax,[-PI/2,0,0],36);
  });
}
export function spool(b,p,r,h,color,rot=[0,0,0]){
  b.local(p,rot,()=>{
    b.cyl([0,h*.5,0],r*.84,r*.85,h*.83,'silk',color,20);
    for(const y of [.06,.94]){
      b.cyl([0,h*y,0],r,r,h*.12,'wood','#cfa575',20);
      b.torus([0,h*y+h*.064,0],r*.57,.0025,'wood',C.wood,[-PI/2,0,0],18);
    }
    b.cyl([0,h*1.007,0],r*.15,r*.15,.002,'wood',C.dark,12);
    for(let j=0;j<7;j++)b.torus([0,h*(.17+.103*j),0],r*.847,.0023,'silk',color,[-PI/2,.03,0],18);
  });
}
export function cushion(b,p,r=.1){
  b.local(p,[0,0,0],()=>{
    b.cyl([0,.014,0],r*.88,r*.74,.028,'brass',C.brass,20);
    b.oval([0,r*.44,0],[r,r*.58,r*.91],'cloth','#a9483c',20);
    for(let i=0;i<6;i++){
      const a=i*TAU/6;
      const pts=Array.from({length:9},(_,j)=>{const t=j*PI/16;return [Math.cos(a)*Math.sin(t)*r,r*.44+r*.59*Math.cos(t),Math.sin(a)*Math.sin(t)*r*.92];});
      b.curve(pts,.0018,'silk','#e1ad69',10,4);
    }
    const rng=randomSeed(85);
    for(let i=0;i<12;i++){
      const a=rng()*TAU,rr=rng()*r*.76,x=Math.cos(a)*rr,z=Math.sin(a)*rr,y=r*.83;
      const tip=[x+x*.35+(rng()-.5)*.023,y+.038+rng()*.029,z+z*.3];
      b.rod([x,y,z],tip,.0016,'steel','#dfdfcf',5);
      b.oval(tip,[.0048,.0048,.0048],'silk',[C.pearl,C.gilt,C.coral][i%3],8);
    }
  });
}
export function shears(b,p,scale=1,yaw=0){
  b.local(p,[0,yaw,0],()=>{
    // Flat forged blades, bevel and one long bow for the fingers.
    for(const [s,a,len] of [[-1,-.14,.245],[1,.17,.266]]){
      b.local([0,.008+s*.001,0],[0,a,0],()=>{
        b.surface(1,1,(u,v)=>[mix(-.014,.015,v)*(1-u)+.002*s,.007+.002*v,mix(.004,len,u)],'steel','#b9c6bf');
        b.rod([.008,.010,.008],[.001,.009,len],.0024,'steel','#e2e5cf',5);
        b.rod([0,.008,.015],[s*.036,.013,-.093],.009,'brass',C.bronze,8);
        const pts=Array.from({length:21},(_,i)=>{const t=i*TAU/20;return [s*.048+.028*Math.cos(t),.013,-.13+.048*Math.sin(t)*(s<0?1.25:.88)];});
        b.curve(pts,.008,'brass',C.brass,28,7);
      });
    }
    b.cyl([0,.021,0],.012,.012,.014,'brass',C.gilt,16);
    b.box([0,.029,0],[.016,.0017,.0025],'steel',C.dark,[0,.62,0]);
  },[scale,scale,scale]);
}
export function ruler(b,p,len=.65,rot=0){
  b.local(p,[0,rot,0],()=>{
    b.box([0,.007,0],[len,.014,.050],'wood','#d9b879');
    const count=Math.round(len/.01);
    for(let i=1;i<count;i++){
      const depth=i%10===0?.032:i%5===0?.024:.012;
      b.box([-len/2+i*.01,.0148,.024-depth/2],[i%10?.0015:.0023,.0014,depth],'paint','#594f3c',[0,0,0],false);
    }
    b.cyl([len/2-.014,.015,0],.004,.004,.002,'paint',C.dark,8);
  });
}
export function fold(b,p,w,d,h,mat,col,angle=0){
  b.local(p,[0,angle,0],()=>{
    const profile=[[-d*.47,h*.12],[d*.40,h*.09],[d*.485,h*.24],[d*.50,h*.55],[d*.483,h*.80],[d*.44,h*.945],[-d*.43,h],[-d*.485,h*.87],[-d*.498,h*.53],[-d*.47,h*.12]];
    const curve=new T.CatmullRomCurve3(profile.map(([z,y])=>new T.Vector3(0,y,z)),false,'centripetal');
    const fp=(u,v)=>{const q=curve.getPoint(v),wave=.006*Math.sin(u*PI*3+.6)+.0025*Math.sin(u*PI*7);
      return [(u-.5)*w,q.y+wave*(q.y/h),q.z+.006*Math.sin(u*PI*2+.7),u*w,v*2*d];};
    b.surface(10,24,fp,mat,col);
    for(const s of [0,1]){
      b.surface(24,1,(u,v)=>{const p=fp(s,u);return [p[0],mix(h*.5,p[1],v),p[2]*v,u*d,v*h];},mat,col);
    }
    b.curve(Array.from({length:11},(_,i)=>{const u=i/10;return [(u-.5)*w,h*.35+.002*Math.sin(u*PI),d*.496+.006*Math.sin(u*PI*2+.7)];}),.0024,'cloth',col,13,4);
  });
}
export function swatch(b,p,w,h,mat,col,rot=0,variant=0){
  b.local(p,[0,rot,0],()=>{
    const point=(u,v)=>{
      const fold=.017*Math.sin(u*PI*(3+variant%3)+.45*v)+.005*Math.sin(u*PI*9);
      return [(u-.5)*w,-v*h+.013*Math.cos(u*PI*3)*v+.007*Math.cos(u*PI*24)*v**5,.012+fold*(.4+.6*v)+.031*Math.sin(v*PI-.12),u*w,v*h];
    };
    b.surface(24,10,point,mat,col);
    for(const u of [.024,.976])b.curve(Array.from({length:9},(_,j)=>point(u,j/8).slice(0,3)),.0024,'silk',C.flax,13,4);
    for(const u of [.14,.86]){
      const [x,y,z]=point(u,.065);b.oval([x,y,z+.008],[.010,.010,.006],'brass',C.gilt,9);
    }
  });
}
export function hanger(b,p,w,rot=0){
  b.local(p,[0,rot,0],()=>{
    b.curve([[0,0,0],[-.031,-.014,0],[-.026,-.055,0],[0,-.064,0],[0,-.101,0]],.005,'brass',C.brass,12,6);
    b.curve([[-w/2,-.20,0],[-w*.29,-.159,0],[0,-.106,0],[w*.30,-.159,0],[w/2,-.20,0]],.020,'wood',C.wood,15,8);
    b.rod([-w/2+.015,-.2,0],[w/2-.015,-.2,0],.008,'wood',C.trim,8);
  });
}


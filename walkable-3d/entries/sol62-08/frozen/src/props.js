import * as T from '../vendor/three.module.min.js';
import { indexedSurface } from './build-kit.js';
import { rng } from './layout.js';

export function contact(b,m,x,y,z,w,d,yaw=0) {
  b.panel(m.contact,x,y+.007,z,w,d,[-Math.PI*.5,0,-yaw],{cast:false,receive:false});
}

export function frame(x,y,z,angle=0) {
  const c=Math.cos(angle), s=Math.sin(angle);
  return (a,b,d) => [x+a*c+d*s,y+b,z-a*s+d*c];
}

export function crate(b,m,x,y,z,w,d,h,options={}) {
  const { yaw=0, filled=false, pale=false, brand=false } = options;
  const p=frame(x,y,z,yaw);
  const wood=pale?m.pine:m.cedar;
  const rails=pale?m.deck:m.beam;
  const rand=rng(Math.abs(Math.floor(x*747+z*1205+y*14)));
  const plank=.026;
  const board=(material,a,yy,zz,bw,bh,bd,tone=1)=>b.board(material,...p(a,yy,zz),bw,bh,bd,{tone,rotation:[0,yaw,0],edge:.003});
  const courses=3, gap=.013, height=(h-.034)/courses;
  for(const zsign of [-1,1]){
    const zz=zsign*(d*.5-plank*.5);
    for(let i=0;i<courses;i++) board(wood,0,.025+(i+.5)*height,zz,w,height-gap,plank,.82+rand()*.27);
    for(const a of [-1,1]){
      board(rails,a*(w*.5-.055),h*.5,zsign*(d*.5+.008),.091,h+.005,.034,.84+rand()*.24);
      for(let i=0;i<courses;i++) {
        b.cyl(m.steel,...p(a*(w*.5-.055),.024+(i+.51)*height,zsign*(d*.5+.027)),.006,.005,
          {sides:6,rotation:[Math.PI*.5,yaw,0],cast:false});
      }
    }
  }
  for(const sx of [-1,1]) for(let i=0;i<courses;i++){
    board(wood,sx*(w*.5-plank*.5),.025+(i+.5)*height,0,plank,height-gap,d-.046,.79+rand()*.26);
  }
  for(let i=0;i<5;i++) board(rails,(i-2)*w/5,.029,0,w/5-.009,.034,d-.011,.86+rand()*.23);
  if(filled){
    for(let i=0;i<5;i++) board(wood,(i-2)*w/5,h-.031,0,w/5-.007,.028,d-.036,.86+rand()*.25);
  }
  if(brand && m.crateMark){
    b.panel(m.crateMark,...p(0,h*.62,d*.5+.001),w*.38,h*.235,[0,yaw,0],{cast:false});
  }
}

const FASTENER_ROTATION=[Math.PI*.5,0,0];
export function cleat(b,m,x,y,z,yaw=0) {
  const p=frame(x,y,z,yaw);
  b.box(m.rust,...p(0,.017,0),.244,.031,.102,{edge:.010,rotation:[0,yaw,0]});
  b.box(m.steel,...p(0,.027,0),.196,.034,.081,{edge:.014,rotation:[0,yaw,0]});
  for(const sign of [-1,1]){
    b.cyl(m.zinc,...p(sign*.077,.043,0),.012,.010,{sides:6});
    b.stick(m.steel,p(sign*.045,.029,0),p(sign*.071,.092,0),.038,.035,{edge:.007});
    b.stick(m.steel,p(sign*.061,.087,0),p(sign*.153,.105,0),.032,.039,{edge:.007});
  }
  b.board(m.steel,...p(0,.087,0),.177,.035,.045,{edge:.010,rotation:[0,yaw,0]});
}

const screwHead = (() => {
  const pos=[0,.45,0,0,-.45,0], uv=[.5,.5,.5,.5], index=[];
  for(let i=0;i<6;i++){
    const angle=2*Math.PI*i/6;
    const x=Math.cos(angle), z=Math.sin(angle), next=(i+1)%6+2;
    pos.push(x,0,z);
    uv.push(x*.5+.5,z*.5+.5);
    index.push(0,next,i+2,1,i+2,next);
  }
  return indexedSurface(pos,uv,index);
})();

export function screw(b,m,x,y,z,axis='y',radius=.006,light=false) {
  const rotation=axis==='z'?FASTENER_ROTATION:axis==='x'?[0,0,Math.PI*.5]:[0,0,0];
  b.add(screwHead,light?m.zinc:m.steel,{at:[x,y,z],scale:[radius,.004,radius],rotation,cast:false});
}

export function ring(b,m,x,y,z,radius,axis='z') {
  const rotation = axis==='x' ? [0,Math.PI*.5,0] : axis==='y' ? [Math.PI*.5,0,0] : [0,0,0];
  b.add(new T.TorusGeometry(radius,radius*.13,6,17), m.steel, {at:[x,y,z],rotation});
}

export function bucket(b,m,x,y,z,r=.139,h=.24,shade=1) {
  b.cyl(m.steel,x,y+.015,z,r*.75,.025,{sides:14,tone:shade});
  const pos=[],uv=[],indices=[];
  const sides=18;
  const profile=[[.72,0],[.77,.075],[1,1],[.91,1],[.679,.075]];
  for (let layer=0;layer<profile.length;layer++) {
    const [f,v]=profile[layer];
    const rad=r*f;
    for(let i=0;i<=sides;i++){
      const a=i/sides*Math.PI*2;
      pos.push(x+Math.cos(a)*rad,y+.016+v*h,z+Math.sin(a)*rad);
      uv.push(i/sides,v);
      if(layer+1<profile.length&&i<sides) {
        const k=layer*(sides+1)+i;
        indices.push(k,k+sides+1,k+1,k+1,k+sides+1,k+sides+2);
      }
    }
  }
  b.add(indexedSurface(pos,uv,indices),m.zinc,{tone:shade});
  const points=[];
  for(let i=0;i<=12;i++){
    const a=i/12*Math.PI;
    points.push([x+Math.cos(a)*r*1.016,y+h*.81+Math.sin(a)*h*.57,z+Math.sin(a)*.022]);
  }
  b.wire(m.steel,points,.0069,{segments:18});
  b.cyl(m.rust,x,y+h*.069,z,r*.718,.013,{sides:15,tone:.89});
}



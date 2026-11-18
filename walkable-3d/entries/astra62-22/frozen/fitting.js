import * as T from './vendor/three.module.min.js';
import {C,shellMark} from './materials.js';
import {PI,TAU,mix,randomSeed} from './geometry.js';
import {shadow,frameArt,plaque} from './rooms.js';
import {turnedLeg,workTable,stool,spool,cushion,hanger,ruler} from './objects.js';

export const dais={x:-2.39,z:4.89,rx:1.39,rz:1.59};
export function platformHeight(x,z){
  const r=Math.hypot((x-dais.x)/dais.rx,(z-dais.z)/dais.rz);
  if(r<1)return .242;
  if(r<1.105)return .151;
  if(r<1.205)return .071;
  return 0;
}
function fittingCarpet(b,cpu){
  let map=null;
  if(!cpu){
    const c=document.createElement('canvas');c.width=c.height=768;
    const x=c.getContext('2d'),rng=randomSeed(286);x.fillStyle='#41665e';x.fillRect(0,0,768,768);
    x.save();x.translate(384,384);
    for(const [r,l,col] of [[366,7,'#ba9e69'],[354,2,'#cfb482'],[326,3,'#baa277'],[315,2,'#baa277'],[242,1.5,'#88a18b'],[86,3,'#baa47b'],[71,1.7,'#cab68b']]){
      x.beginPath();x.arc(0,0,r,0,TAU);x.lineWidth=l;x.strokeStyle=col;x.stroke();
    }
    for(let i=0;i<100;i++){
      x.save();x.rotate(i*TAU/100);x.fillStyle=i%5?'#a9a27c':'#d7c198';x.fillRect(-1.5,332,3,i%5?11:18);x.restore();
    }
    for(let i=0;i<12;i++){
      x.save();x.rotate(i*TAU/12);shellMark(x,0,276,.66,'#c5b086');
      x.strokeStyle='#94a78f';x.lineWidth=2;x.beginPath();x.moveTo(0,100);x.bezierCurveTo(-31,134,31,184,0,231);x.bezierCurveTo(-34,184,32,134,0,100);x.stroke();
      for(let j=0;j<5;j++){x.beginPath();x.ellipse((j%2?1:-1)*8,123+j*20,8,3,j%2?.5:-.5,0,TAU);x.fillStyle='#a6ac8e';x.fill();}
      x.restore();
    }
    shellMark(x,0,4,1.65,'#d5ba86');x.restore();
    for(let i=0;i<50000;i++){x.fillStyle=rng()>.5?'rgba(225,216,177,.11)':'rgba(19,39,35,.09)';x.fillRect(rng()*768,rng()*768,2.3,.8);}
    map=new T.CanvasTexture(c);map.colorSpace=T.SRGBColorSpace;map.anisotropy=8;
  }
  b.m.rug=new T.MeshStandardMaterial({map,roughness:.985,vertexColors:true});
}
function platform(b,cpu){
  fittingCarpet(b,cpu);shadow(b,dais.x,dais.z,4.28,4.8);
  b.local([dais.x,0,dais.z],[0,0,0],()=>{
    for(const [r,y,h,c] of [[1.205,.034,.067,C.walnut],[1.106,.110,.077,C.wood],[1.01,.191,.085,C.walnut]]){
      b.local([0,0,0],[0,0,0],()=>{
        b.cyl([0,y,0],r,r+.005,h,'wood',c,68);
        b.cyl([0,y+h/2+.002,0],r+.009,r+.009,.014,'wood',C.trim,68);
      },[dais.rx,1,dais.rz]);
    }
    const g=new T.CircleGeometry(1,84);
    b.put(g,'rug','#fff6e4',[0,.242,0],[-PI/2,0,0],[dais.rx*.96,dais.rz*.96,1],false);
    for(let i=0;i<16;i++){
      const a=i*TAU/16;
      b.oval([1.108*dais.rx*Math.sin(a),.105,1.108*dais.rz*Math.cos(a)],[.013,.011,.012],'brass',C.brass,8);
    }
  });
  // Sliding hem gauge and chalk holder, weighted to stand on the edge of the fitting dais.
  b.local([dais.x-1.03,.237,dais.z+.51],[0,-.28,0],()=>{
    b.cyl([0,.035,0],.113,.136,.07,'brass',C.bronze,20);
    b.lathe([0,.064,0],[[.09,0],[.07,.024],[.036,.043],[.029,.081]],'brass',C.brass,16);
    b.box([0,.70,0],[.037,1.18,.028],'wood',C.trim);
    for(let i=0;i<46;i++)b.box([.011,.17+i*.024,.0155],[i%5?.011:.022,.002,.002],'paint',C.dark,[0,0,0],false);
    b.box([.074,.59,0],[.192,.033,.046],'brass',C.brass);
    b.oval([.167,.59,0],[.021,.016,.029],'paper',C.chalk,10);
    b.cyl([0,1.31,0],.03,.032,.045,'brass',C.brass,14);
  });
}
function cheval(b){
  b.local([-4.56,0,4.91],[0,PI/2,0],()=>{
    for(const side of [-1,1]){
      b.box([side*.93,.155,.13],[.19,.15,.56],'wood',C.walnut);
      b.lathe([side*.93,.19,.07],[[.105,0],[.121,.07],[.085,.14],[.055,.28],[.081,.38],[.07,.53],[.061,2.30],[.09,2.37],[.072,2.45],[.036,2.50]],'wood',C.walnut,24);
      b.oval([side*.93,2.74,.07],[.071,.10,.071],'brass',C.brass,18);
    }
    const shape=new T.Shape();
    shape.moveTo(-.805,.50);shape.lineTo(.805,.50);shape.lineTo(.805,2.79);shape.bezierCurveTo(.78,3.12,.36,3.35,0,3.35);shape.bezierCurveTo(-.36,3.35,-.78,3.12,-.805,2.79);shape.closePath();
    const backing=new T.ExtrudeGeometry(shape,{depth:.074,bevelEnabled:true,bevelThickness:.02,bevelSize:.029,bevelSegments:2,curveSegments:24});
    b.put(backing,'wood',C.walnut,[0,0,0]);
    const glass=new T.ShapeGeometry(shape,24),pp=glass.attributes.position,uv=glass.attributes.uv;
    for(let i=0;i<pp.count;i++)uv.setXY(i,pp.getX(i)/1.65+.5,(pp.getY(i)-.5)/2.85);
    b.put(glass,'mirror','#e5e6d4',[0,.064,.102],[0,0,0],[.936,.96,1],false);
    const outline=shape.getPoints(32).map(p=>[p.x,p.y,.11]);
    b.curve(outline,.038,'brass',C.brass,105,7);b.curve(outline.map(([x,y,z])=>[x*.947,.045+y*.966,z+.006]),.015,'wood',C.trim,105,6);
    // The gilt crest is an open scallop carved into the cheval frame.
    for(let i=0;i<9;i++){
      const a=mix(-1.18,1.18,i/8);
      b.oval([Math.sin(a)*.135,3.32+Math.cos(a)*.16,.09],[.046,.142,.032],'brass',C.brass,14,[0,0,-a]);
    }
    for(const side of [-1,1]){
      b.curve([[side*.03,3.29,.093],[side*.27,3.37,.09],[side*.45,3.27,.09],[side*.39,3.20,.095],[side*.34,3.23,.095]],.021,'wood',C.trim,22,7);
      b.rod([side*.85,1.64,.07],[side*.99,1.64,.07],.073,'brass',C.brass,18);
    }
    b.box([0,.396,.053],[1.73,.113,.116],'wood',C.walnut);
  });
}
function curtains(b){
  b.local([-4.57,0,4.91],[0,PI/2,0],()=>{
    b.rod([-1.63,3.68,.222],[1.63,3.68,.222],.024,'brass',C.brass,14);
    for(const side of [-1,1]){
      b.oval([side*1.67,3.68,.222],[.070,.046,.046],'brass',C.brass,18);
      const panel=(u,v)=>{
        const knot=Math.exp(-((v-.59)**2)/.017);
        const width=.60-.41*knot+.021*Math.cos(v*PI*3);
        const xx=side*(1.255+.155*knot+(u-.5)*width);
        const wave=(.043-.020*knot)*Math.cos(u*PI*10+.52*Math.sin(v*PI*2))+.009*Math.cos(u*PI*18);
        return [xx,3.61-v*3.36+(.024*Math.cos(u*PI*6)-.046*Math.sin(u*PI))*v**5,.20+wave+.05*Math.sin(v*PI)**2,u*.67,v*3.4];
      };
      b.surface(34,33,panel,'damask','#985c4f');
      for(const u of [.035,.965]){
        b.curve(Array.from({length:28},(_,j)=>{const p=panel(u,j/27).slice(0,3);p[2]+=.005;return p;}),.007,'silk','#ceb17b',35,5);
      }
      for(const v of [.958,.979])b.curve(Array.from({length:35},(_,j)=>{const p=panel(j/34,v).slice(0,3);p[2]+=.006;return p;}),.006,'silk',C.gilt,38,5);
      for(let n=0;n<6;n++){
        const x=side*(.983+n*.105);
        b.torus([x,3.647,.219],.034,.006,'brass',C.brass,[0,PI/2,0],15);
      }
      const yy=3.61-3.36*.59,xx=side*1.41;
      for(const dy of [0,.02])b.curve([[xx-.12,yy+.023+dy,.223],[xx-.066,yy+dy,.283],[xx+.033,yy-.018+dy,.29],[xx+.107,yy+.014+dy,.245]],.011,'silk',C.gilt,12,6);
      b.curve([[xx,yy,.286],[xx+side*.067,yy-.097,.307],[xx+side*.047,yy-.170,.30]],.008,'silk',C.gilt,12,6);
      b.lathe([xx+side*.047,yy-.254,.30],[[.034,0],[.023,.043],[.014,.065],[.020,.074],[.012,.088]],'silk',C.gilt,13);
    }
  });
}
function settee(b){
  const x=4.06,z=4.63;shadow(b,x,z,1.36,3.04);
  b.local([x,0,z],[0,-PI/2,0],()=>{
    for(const sx of [-1,1])for(const sz of [-1,1])turnedLeg(b,sx*1.03,sz*.293,.35,.067);
    b.box([0,.36,0],[2.33,.12,.70],'wood',C.walnut);
    b.oval([0,.468,.003],[1.14,.115,.383],'cloth','#a66557',32);
    b.curve([[-1.06,.473,.147],[-.91,.473,.306],[0,.473,.372],[.91,.473,.306],[1.06,.473,.147]],.009,'silk',C.flax,36,7);
    b.oval([0,.785,-.254],[1.12,.32,.11],'damask','#a06555',32);
    b.curve([[-1.11,.60,-.27],[-1.03,.905,-.27],[-.82,1.01,-.27],[0,1.073,-.27],[.82,1.01,-.27],[1.03,.905,-.27],[1.11,.60,-.27]],.043,'wood',C.trim,41,8);
    for(let j=0;j<2;j++)for(let k=0;k<7-j;k++){
      const xx=(k-(6-j)/2)*.255;
      b.oval([xx,.738+j*.13,-.145-.032*(xx**2)],[.016,.015,.009],'silk','#c58774',10);
    }
    for(const s of [-1,1]){
      b.curve([[s*1.04,.39,.239],[s*1.09,.60,.230],[s*1.10,.69,.180],[s*1.10,.72,-.14],[s*1.04,.83,-.26]],.043,'wood',C.trim,20,8);
      b.oval([s*.88,.61,.01],[.133,.176,.273],'stripe','#e0b88c',20,[.09,0,s*.2]);
    }
  });b.block(x,z,.88,2.34);
}
function screen(b){
  const x=3.59,z=7.17;shadow(b,x,z,1.52,2.25);
  b.local([x,0,z],[0,-1.27,0],()=>{
    for(let j=-1;j<=1;j++){
      const w=.628;
      b.local([j*.595,0,-Math.abs(j)*.078],[0,j*.29,0],()=>{
        for(const s of [-1,1]){
          b.box([s*w/2,1.02,0],[.046,1.98,.049],'wood',C.walnut);
          b.oval([s*w/2,2.035,0],[.035,.054,.035],'brass',C.brass,12);
        }
        for(const y of [.19,1.82])b.box([0,y,0],[w,.060,.058],'wood',C.trim);
        b.surface(18,18,(u,v)=>[(u-.5)*(w-.041),mix(.217,1.796,v),.012*Math.sin(u*PI*5)*Math.sin(v*PI),u*.70,v*1.6],j===0?'shoal':'damask',j===0?'#e9ddbf':'#59877a');
        for(const u of [-.43,.43])b.box([u*w,1.004,.024],[.012,1.54,.008],'silk',C.brass);
        b.curve([[-.31,1.87,0],[-.20,1.95,0],[0,2.00+j*.018,0],[.20,1.95,0],[.31,1.87,0]],.022,'wood',C.trim,18,8);
        for(const s of [-1,0,1])b.rod([s*.19,1.85,0],[s*.19,1.94+.04*(1-Math.abs(s)),0],.011,'brass',C.brass,7);
        if(j<1)for(const y of [.49,1.43])b.cyl([w*.5+.008,y,.012],.011,.011,.097,'brass',C.brass,10);
      });
    }
  });b.block(x,z,.76,2.0);
}
export function buildFitting(b,cpu=false){
  b.zone='Fitting room furnishings';platform(b,cpu);cheval(b);curtains(b);settee(b);screen(b);b.block(-4.61,4.91,.46,3.17);
  const x=-3.68,z=7.57;shadow(b,x,z,1.70,1.12);
  b.local([x,0,z],[0,-.08,0],()=>{
    workTable(b,1.29,.61,.81,true,C.wood);
    cushion(b,[-.38,.816,.045],.117);
    spool(b,[.38,.814,-.12],.048,.115,C.teal);
    spool(b,[.278,.814,-.155],.037,.095,C.rust);
    ruler(b,[.061,.818,.13],.63,-.13);
  });b.block(x,z,1.34,.70);
  stool(b,[-3.37,0,2.52],.445,C.teal,.2);b.block(-3.37,2.52,.46,.46);
  frameArt(b,'crest',[4.683,2.49,2.30],.92,1.19,-PI/2);
  b.local([-2.83,0,8.70],[0,PI,0],()=>{
    b.box([0,2.05,.0],[2.50,.14,.10],'wood',C.walnut);
    for(let i=0;i<5;i++){
      const px=(i-2)*.46;
      b.curve([[px,2.06,.064],[px,2.0,.106],[px,2.06,.147]],.013,'brass',C.brass,9,6);
      if(i===1||i===3)hanger(b,[px,2.09,.144],.40,i===1?.16:-.23);
    }
  });
  plaque(b,'Cabinet d’essayage','MAISON DES MARÉES',[-4.66,1.58,6.59],.69,.17,PI/2);
}


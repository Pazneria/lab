import * as T from '../vendor/three.module.min.js';
import { DECK, DOOR, SHOP, rng } from './layout.js';
import { mixTone, signMaterial } from './materials.js';
import { frame, ring, screw } from './props.js';

const WALL_BOTTOM=DECK+.006;
const WW=SHOP.maxX-SHOP.minX;
const PITCH=(SHOP.ridge-SHOP.eaves)/(WW*.5);
const THETA=Math.atan(PITCH);
const faceZ=SHOP.front+.088;

const sides=[
  { id:'front', axis:'x', line:SHOP.front, direction:1, low:SHOP.minX, high:SHOP.maxX, openings:[
    {x:DOOR.x,w:DOOR.width,bottom:DECK,top:DECK+DOOR.height,door:true},
    {x:-4.77,w:1.43,bottom:2.51,top:3.61},
    {x:.50,w:1.24,bottom:2.65,top:3.63}
  ]},
  { id:'back', axis:'x', line:SHOP.back, direction:-1, low:SHOP.minX, high:SHOP.maxX, openings:[
    {x:.59,w:1.235,bottom:2.69,top:3.63}
  ]},
  { id:'west',axis:'z',line:SHOP.minX,direction:-1,low:SHOP.back,high:SHOP.front,openings:[
    {x:-2.40,w:1.45,bottom:2.58,top:3.67}
  ]},
  { id:'east',axis:'z',line:SHOP.maxX,direction:1,low:SHOP.back,high:SHOP.front,openings:[
    {x:-2.62,w:2.26,bottom:2.62,top:3.72}
  ]}
];

function wallFrame(b,side) {
  const { axis,line,direction }=side;
  const facing = axis==='x' ? (direction===1?0:Math.PI) : direction*Math.PI*.5;
  const p=(u,y,normal)=>axis==='x'?[u,y,line+normal*direction]:[line+normal*direction,y,u];
  const board=(material,u,y,normal,w,h,d,options={})=>{
    const size=axis==='x'?[w,h,d]:[d,h,w];
    b.board(material,...p(u,y,normal),...size,options);
  };
  return { p, board, facing, normalAxis:axis==='x'?'z':'x' };
}

function frameWindow(b,m,side,o,rand) {
  const { board, p, facing, normalAxis }=wallFrame(b,side);
  const h=o.top-o.bottom;
  const mid=(o.top+o.bottom)*.5;
  for(const normal of [.088,-.147]) {
    const trim=normal>0?m.trim:m.pine;
    for(const sx of [-1,1]){
      const u=o.x+sx*(o.w*.5+.029);
      board(trim,u,mid,normal,.113,h+.160,.060,{edge:.009,tone:mixTone(rand,.18)});
      for(const yy of [o.bottom+.115,o.top-.099]){
        screw(b,m,...p(u,yy,normal+(normal>0?.034:-.031)),normalAxis,.006,true);
      }
    }
    for(const y of [o.bottom-.035,o.top+.041]){
      board(trim,o.x,y,normal,o.w+.176,.100,.068,{edge:.009,tone:mixTone(rand,.20)});
    }
  }
  board(m.deck,o.x,o.bottom-.047,.128,o.w+.243,.073,.198,{edge:.009,tone:.86});
  board(m.beam,o.x,o.bottom-.059,-.169,o.w+.171,.055,.132,{edge:.007,tone:.95});
  const c=o.w>1.65?4:3;
  for(let i=0;i<=c;i++) board(i===0||i===c?m.green:m.trim,o.x-o.w*.5+i*o.w/c,mid,-.012,.042,h+.025,.078,
    {edge:.004,tone:mixTone(rand,.16)});
  for(let i=0;i<=2;i++) board(i===1?m.trim:m.green,o.x,o.bottom+i*h*.5,-.012,o.w+.026,.039,.080,
    {edge:.004,tone:mixTone(rand,.16)});
  for(let i=0;i<c;i++) for(let j=0;j<2;j++) {
    b.panel(m.window,...p(o.x-o.w*.5+(i+.5)*o.w/c,o.bottom+(j+.5)*h*.5,-.005),
      o.w/c-.043,h*.5-.037,[0,facing,0],{cast:false,tone:.88+rand()*.25});
  }
  board(m.beam,o.x,o.top+.112,-.155,o.w+.234,.153,.144,{tone:1.10});
}

function walls(b,m,walk,rand) {
  for(const side of sides) {
    b.zone='shop '+side.id+' wall';
    const { p, board, normalAxis } = wallFrame(b,side);
    const grid=[side.low,side.high];
    const n=Math.ceil((side.high-side.low)/.228);
    for(let i=1;i<n;i++){
      const edge=side.low+i*(side.high-side.low)/n + (rand()-.5)*.024;
      if(side.openings.every(o=>Math.abs(Math.abs(edge-o.x)-o.w*.5)>.071)) grid.push(edge);
    }
    for(const o of side.openings) grid.push(o.x-o.w*.5,o.x+o.w*.5);
    grid.sort((a,c)=>a-c);
    for(let i=0;i<grid.length-1;i++){
      const lo=grid[i], hi=grid[i+1], u=(lo+hi)*.5;
      const w=hi-lo;
      const o=side.openings.find(q=>Math.abs(u-q.x)<q.w*.5);
      const levels=o?[[WALL_BOTTOM,o.bottom],[o.top,SHOP.eaves]]:[[WALL_BOTTOM,SHOP.eaves]];
      for(const [y0,y1] of levels){
        if(y1-y0<.011) continue;
        const h=y1-y0, y=(y0+y1)*.5;
        const tint=rand()<.16?0xcdc9ac:rand()<.23?0xdcece4:0xffffff;
        const tone=mixTone(rand,.25);
        const dampness=(_x,yy)=> {
          const worldY=y+yy*h;
          return .56+.44*Math.min(1,(worldY-DECK)*1.58);
        };
        board(m.siding,u,y,.002,w-.004,h,.121,{tone,color:tint,edge:.004,grain:'y',shade:dampness});
        board(m.beam,u,y,-.069,w-.007,h,.041,{tone:mixTone(rand,.36)*1.04,edge:0,grain:'y',cast:false});
        for(const yy of [y0+.081,y1-.082]){
          if(yy>=y0+.038 && yy<y1-.029 && w>.095) {
            screw(b,m,...p(u-w*.23,yy,.063),normalAxis,.0054);
            screw(b,m,...p(u+w*.25,yy,.063),normalAxis,.0054);
          }
        }
        if(y0===WALL_BOTTOM && w>.1){
          for(let j=0;j<3;j++) {
            const sh=.042+rand()*.190;
            board(j===2?m.trim:m.wetWood,u+(rand()-.5)*w*.71,y0+sh*.55,.063,
              .006+rand()*.024,sh,.0056,{edge:0,grain:'y',tone:j===2?.81:1.0,cast:false});
          }
        }
      }
    }
    const interiorBeamY=4.145;
    board(m.beam,(side.low+side.high)*.5,interiorBeamY,-.144,side.high-side.low,.19,.154,
      {edge:.009,tone:1.09});
    for(let i=0;i<=7;i++){
      const u=side.low+.13+i*(side.high-side.low-.26)/7;
      if(side.openings.some(o=>Math.abs(u-o.x)<o.w*.5+.09)) continue;
      board(m.beam,u,2.82,-.132,.112,2.72,.132,{edge:.009,tone:mixTone(rand,.17)});
    }
    const doorway=side.openings.find(o=>o.door);
    const segments=doorway ? [[side.low,doorway.x-doorway.w*.5],[doorway.x+doorway.w*.5,side.high]]
      : [[side.low,side.high]];
    for(const [lo,hi] of segments){
      board(m.deck,(lo+hi)*.5,1.511,.073,hi-lo,.117,.095,
        {tone:.77,edge:.006,shade:(_x,y)=>.77+.24*(y+.5)});
      board(m.beam,(lo+hi)*.5,1.541,-.128,hi-lo,.169,.105,{tone:.87,edge:.007});
      if(side.axis==='x') walk.box((lo+hi)*.5,side.line,hi-lo,.169,DECK,4.34);
      else walk.box(side.line,(lo+hi)*.5,.169,hi-lo,DECK,4.34);
    }
    for(const o of side.openings) if(!o.door) frameWindow(b,m,side,o,rand);
  }
  b.zone='workshop corners';
  for(const x of [SHOP.minX,SHOP.maxX]) for(const z of [SHOP.back,SHOP.front]){
    const dx=x<SHOP.center?-1:1, dz=z<0?-1:1;
    b.board(m.trim,x-dx*.061,2.842,z+dz*.082,.176,2.774,.057,{edge:.009,tone:.89});
    b.board(m.trim,x+dx*.080,2.842,z-dz*.056,.057,2.774,.176,{edge:.009,tone:.90});
  }
}

function doors(b,m,walk,rand) {
  b.zone='open barn doors';
  const bottom=DECK+.038, height=DOOR.height-.061;
  const outerW=1.048;
  for(const sign of [-1,1]){
    const hinge=DOOR.x+sign*(DOOR.width*.5+.012);
    const angle=sign*2.56;
    const p=frame(hinge,bottom,faceZ+.043,angle);
    const leaf=(material,x,y,z,w,h,d,options={})=>
      b.board(material,...p(x,y,z),w,h,d,{rotation:[0,angle,0],...options});
    for(let j=0;j<5;j++){
      const w=outerW/5;
      leaf(m.green,-sign*(j+.5)*w,height*.5,0,w-.006,height,.068,
        {edge:.005,tone:mixTone(rand,.24),shade:(_x,y)=>.72+.30*Math.min(1,(y+.5)*3.2)});
    }
    for(const v of [.152,height-.17,height*.54]){
      leaf(m.trim,-sign*outerW*.5,v,-.044,outerW-.041,.132,.048,{tone:.87,edge:.006});
      leaf(m.steel,-sign*.166,v,-.077,.33,.064,.024,{tone:.84,edge:.005});
      leaf(m.steel,-sign*.016,v,-.077,.081,.119,.030,{tone:.85,edge:.007});
      for(const lx of [-sign*.025,-sign*.174,-sign*.30]){
        b.cyl(m.zinc,...p(lx,v,-.093),.0076,.004,{sides:6,rotation:[Math.PI*.5,angle,0],cast:false});
      }
      b.cyl(m.brass,hinge, bottom+v,faceZ+.019,.016,.116,{sides:10});
    }
    b.stick(m.trim,p(-sign*.113,.212,-.044),p(-sign*(outerW-.124),height-.224,-.044),.092,.052,
      {tone:.91,edge:.006});
    const grip= -sign*(outerW-.156);
    b.wire(m.steel,[p(grip,1.011,-.063),p(grip,.996,-.109),p(grip,.948,-.124),p(grip,.922,-.113),p(grip,.909,-.066)],
      .010,{segments:14});
    const c=p(-sign*outerW*.5,height*.5,0);
    walk.ellipse(c[0],c[2],.51,.062,angle,bottom,bottom+height);
    b.board(m.trim,hinge+sign*.022,DECK+DOOR.height*.5,faceZ-.011,.146,DOOR.height+.081,.110,
      {edge:.009,tone:.95});
    b.board(m.beam,hinge+sign*.045,DECK+DOOR.height*.5,SHOP.front-.146,.163,DOOR.height+.115,.164,
      {edge:.009,tone:1.08});
  }
  b.board(m.trim,DOOR.x,DECK+DOOR.height+.055,faceZ-.011,DOOR.width+.279,.154,.113,
    {edge:.008,tone:.94});
  b.board(m.beam,DOOR.x,DECK+DOOR.height+.11,SHOP.front-.128,DOOR.width+.44,.195,.167,
    {edge:.010,tone:.92});
  b.board(m.deck,DOOR.x,DECK-.037,1.148,DOOR.width-.016,.081,.145,
    {edge:.006,tone:.78,grain:'x'});
  b.board(m.steel,DOOR.x,DECK+.002,1.213,DOOR.width-.022,.010,.032,
    {edge:.003,tone:.79,cast:false});
}

function gables(b,m,rand) {
  const low=SHOP.eaves-.025;
  for(const z of [SHOP.back,SHOP.front]) {
    b.zone=z>0?'front gable':'back gable';
    for(let i=0;i<37;i++){
      const w=WW/37;
      const x=SHOP.minX+(i+.5)*w;
      const roofY=(a)=>SHOP.ridge-Math.abs(a-SHOP.center)*PITCH;
      const ys=[roofY(x-w*.5),roofY(x+w*.5)];
      const max=Math.max(...ys);
      const h=max-low;
      const g=new T.BoxGeometry();
      const p=g.attributes.position;
      for(let j=0;j<p.count;j++) if(p.getY(j)>0) p.setY(j,.5-(max-ys[p.getX(j)>0?1:0])/h);
      b.add(g,m.siding,{at:[x,(max+low)*.5,z],scale:[w-.004,h,.115],grain:'y',
        tone:mixTone(rand,.27),color:rand()<.16?0xe6ddc3:0xffffff});
      if(h>.2) screw(b,m,x,low+.11,z+(z>0?.061:-.061),'z',.006);
    }
    b.board(m.deck,SHOP.center,SHOP.eaves-.021,z+(z>0?.071:-.071),WW+.145,.118,.074,
      {tone:.81,edge:.008});
  }
}

function roof(b,m,rand) {
  const front=SHOP.front+.48, back=SHOP.back-.46;
  const zmid=(front+back)*.5, len=front-back;
  const run=WW*.5+.446;
  const slopeLen=run/Math.cos(THETA);
  const eaveY=SHOP.ridge-run*PITCH;
  b.zone='standing seam roof';
  for(const sign of [-1,1]){
    const x=SHOP.center+sign*run*.5, y=(SHOP.ridge+eaveY)*.5;
    const rotation=[0,0,-sign*THETA];
    const count=14;
    for(let i=0;i<count;i++){
      const z=back+(i+.5)*len/count;
      b.box(m.roof,x,y+.030,z,slopeLen,.043,len/count-.004,{
        rotation,tone:mixTone(rand,.34),color:i%6===0?0xccba99:0xe9e8d7,
        uv:[4.3,1,rand()*4,rand()*4]
      });
      b.board(m.roof,x,y+.064,z-len/count*.497,slopeLen+.019,.062,.034,{
        rotation,tone:.74+rand()*.30,edge:.004,grain:'x'
      });
      b.board(m.rust,SHOP.center+sign*(run-.031),eaveY+.047,z,.085,.029,len/count-.005,
        {rotation,tone:.56+rand()*.51,edge:.005,cast:false});

    }
    const strips=18;
    for(let i=0;i<strips;i++){
      const z=back+(i+.5)*len/strips;
      b.board(m.beam,x,y-.081,z,slopeLen-.053,.076,len/strips-.009,
        {rotation,tone:mixTone(rand,.21),edge:.003,grain:'x'});
    }
    for(const z of [back+.024,front-.026]){
      b.stick(m.deck,[SHOP.center,SHOP.ridge-.006,z],[SHOP.center+sign*(run+.041),eaveY-.032,z],
        .185,.115,{tone:.89,edge:.010});
      b.stick(m.beam,[SHOP.center,SHOP.ridge-.139,z+(z>0?-.090:.09)],
        [SHOP.center+sign*(run+.026),eaveY-.15,z+(z>0?-.09:.09)],.157,.092,{tone:.94});
    }
    for(let i=0;i<13;i++){
      const z=back+(i+.5)*len/13;
      b.box(m.roof,SHOP.center+sign*.121,SHOP.ridge+.026,z,.286,.044,len/13+.019,
        {rotation,tone:mixTone(rand,.22),edge:.004});
      screw(b,m,SHOP.center+sign*.195,SHOP.ridge-.001,z+.21,'y',.010,true);
    }
    b.board(m.deck,SHOP.center+sign*(run-.034),eaveY-.078,zmid,.123,.149,len,{tone:.84,edge:.007});
  }
  b.zone='roof framing';
  for(const z of [-5.53,-4.25,-2.72,-1.17,.51,1.076]){
    for(const sign of [-1,1]){
      const edge=SHOP.center+sign*(WW*.5+.21);
      b.stick(m.beam,[SHOP.center,SHOP.ridge-.128,z],[edge,SHOP.eaves-.191,z],.123,.123,
        {tone:mixTone(rand,.16),edge:.011});
      b.stick(m.pine,[SHOP.center+sign*2.85,4.065,z],[SHOP.center+sign*1.6,4.882,z],.091,.088,
        {tone:.74,edge:.009});
    }
    b.board(m.beam,SHOP.center,4.15,z,WW+.01,.173,.133,{edge:.009,tone:1.08});
    b.stick(m.beam,[SHOP.center,4.18,z],[SHOP.center,SHOP.ridge-.155,z],.118,.161,{tone:1.03,edge:.008});
    b.board(m.steel,SHOP.center,4.277,z+.074,.23,.34,.020,{tone:.69,edge:.004});
    for(const xx of [-.067,.067]) for(const yy of [4.18,4.34]){
      screw(b,m,SHOP.center+xx,yy,z+.086,'z',.010,true);
    }
  }
  b.board(m.beam,SHOP.center,SHOP.ridge-.16,zmid,.171,.208,len-.09,{tone:1.04,edge:.009});
  b.zone='gutter and downspout';
  const gutterX=SHOP.maxX+.432;
  b.board(m.steel,gutterX,eaveY-.085,zmid,.107,.091,len-.046,{edge:.026,tone:1.44});
  b.board(m.zinc,gutterX+.060,eaveY-.044,zmid,.024,.040,len-.041,{edge:.009,tone:.87});
  for(let i=0;i<8;i++){
    b.board(m.steel,gutterX-.05,eaveY-.067,back+.26+i*.98,.189,.041,.082,{edge:.007,tone:.89});
  }
  const drainZ=.913, drainX=SHOP.maxX+.154;
  b.wire(m.zinc,[
    [gutterX,eaveY-.095,drainZ],[gutterX,eaveY-.236,drainZ],
    [drainX+.065,eaveY-.372,drainZ],[drainX,eaveY-.531,drainZ],
    [drainX,2.27,drainZ],[drainX,1.017,drainZ],[drainX+.114,.849,drainZ],
    [drainX+.272,.784,drainZ]
  ],.042,{segments:31,sides:9,uv:[1,3,0,0]});
  for(const y of [1.83,2.81,3.46]){
    b.cyl(m.steel,drainX,y,drainZ,.053,.044,{sides:9});
    b.board(m.steel,drainX-.05,y,drainZ,.143,.032,.092,{edge:.005});
  }
}

function floor(b,m,rand) {
  b.zone='workshop floor';
  const front=1.158;
  const d=front-SHOP.back;
  const count=32;
  for(let i=0;i<count;i++){
    const w=WW/count;
    const x=SHOP.minX+(i+.5)*w;
    const y=DECK+(rand()-.5)*.006;
    const split=-2.88+Math.sin(i*1.17)*.87;
    for(const [start,end] of [[SHOP.back,split],[split+.005,front]]){
      b.board(i%8===0?m.deck:m.pine,x,y-.044,(start+end)*.5,w-.005,.088,end-start,
        {tone:mixTone(rand,.31)*.87,grain:'z',edge:.004});
      for(const z of [start+.088,end-.078]){
        screw(b,m,x-w*.21,y+.001,z,'y',.005);
        screw(b,m,x+w*.23,y+.001,z,'y',.005);
      }
    }
  }
  b.board(m.beam,SHOP.center,1.337,(SHOP.back+front)*.5,WW+.023,.141,d,{tone:.84,edge:.006});
}

function branding(b,m) {
  b.zone='boatworks sign';
  const sign = signMaterial({
    background:'#344c48',ink:'#eddbad',border:'#ac9a76',w:800,h:270,
    lines:[
      {text:'TIDEWAY',y:.40,font:'600 124px Georgia, serif'},
      {text:'B O A T W O R K S',y:.728,font:'600 44px Georgia, serif'}
    ],seed:708
  });
  b.board(m.trim,SHOP.center,4.52,faceZ-.002,2.72,.824,.088,{tone:.88,edge:.012});
  b.panel(sign,SHOP.center,4.52,faceZ+.045,2.657,.765,[0,0,0],{cast:false});
  for(const x of [SHOP.center-1.279, SHOP.center+1.279]) for(const y of [4.188,4.852]){
    screw(b,m,x,y,faceZ+.049,'z',.012,true);
  }
}

function exteriorLamp(b,m) {
  const x=-.647, z=faceZ+.016, y=3.48;
  b.cyl(m.steel,x,y+.19,z,.065,.026,{sides:12,rotation:[Math.PI*.5,0,0]});
  const points=[[x,y+.19,z],[x,y+.226,z+.09],[x,y+.254,z+.19],[x,y+.218,z+.28],[x,y+.146,z+.31]];
  b.wire(m.steel,points,.018,{segments:15,sides:8});
  b.cyl(m.green,x,y+.107,z+.311,.114,.074,{top:.44,sides:16});
  b.cyl(m.trim,x,y+.074,z+.311,.119,.019,{sides:16});
  b.cyl(m.glassGlow,x,y+.038,z+.311,.061,.066,{top:.95,sides:13});
  b.cyl(m.steel,x,y+.003,z+.311,.065,.012,{sides:13});
  for(let i=0;i<5;i++){
    const a=i*Math.PI*2/5;
    b.stick(m.steel,[x+Math.cos(a)*.067,y+.011,z+.311+Math.sin(a)*.067],
      [x+Math.cos(a)*.067,y+.071,z+.311+Math.sin(a)*.067],.008,.008,{edge:.001});
  }
  ring(b,m,1.669,2.05,faceZ+.062,.033);
}

export function buildBoathouse(b,m,walk) {
  const rand=rng(18363467);
  floor(b,m,rand);
  walls(b,m,walk,rand);
  doors(b,m,walk,rand);
  gables(b,m,rand);
  roof(b,m,rand);
  branding(b,m);
  exteriorLamp(b,m);
}

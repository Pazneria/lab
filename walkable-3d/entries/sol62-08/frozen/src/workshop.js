import * as T from '../vendor/three.module.min.js';
import { indexedSurface } from './build-kit.js';
import { DECK, SHOP, rng } from './layout.js';
import { mixTone } from './materials.js';
import { bucket, contact, crate, ring, screw } from './props.js';

const STOCK=DECK+.911;
const BENCH_X=-3.94;
const BENCH_Z=-5.08;

function toolPoly(b,material,path,x,y,z,angle=0,thickness=.007,tone=1){
  const shape=new T.Shape();
  for(let i=0;i<path.length;i++) {
    if(i===0) shape.moveTo(...path[i]);
    else shape.lineTo(...path[i]);
  }
  shape.closePath();
  b.add(new T.ExtrudeGeometry(shape,{depth:thickness,bevelEnabled:false,steps:1}),material,
    {at:[x,y,z],rotation:[0,0,angle],tone});
}

function pegTool(b,m,kind,x,y,z,angle=0) {
  const c=Math.cos(angle), s=Math.sin(angle);
  const p=(a,d,h=0)=>[x+a*c-d*s,y+a*s+d*c,z+h];
  const bar=(material,a,d,u,v,w,depth,extra={})=>b.stick(material,p(a,d),p(u,v),w,depth,extra);
  if(kind==='saw'){
    const points=[[-.17,.092],[.322,.027],[.313,-.039]];
    for(let i=0;i<26;i++) {
      const t=i/25;
      points.push([.309-.465*t,-.039-.044*t-(i%2?.012:0)]);
    }
    toolPoly(b,m.zinc,points,x,y,z,angle,.006,.94);
    b.wire(m.cedar,[p(-.133,.063,.014),p(-.24,.092,.014),p(-.315,.048,.014),p(-.288,-.066,.014),
      p(-.225,-.114,.014),p(-.146,-.052,.014),p(-.176,-.023,.014)],.024,{segments:27,sides:8});
    for(const a of [-.148,-.101]) screw(b,m,...p(a,.023,.015),'z',.008,true);
  } else if(kind==='hammer' || kind==='mallet'){
    bar(m.cedar,0,-.213,0,.104,.031,.030,{tone:.97,edge:.005});
    if(kind==='hammer'){
      bar(m.steel,-.071,.089,.065,.089,.044,.049,{edge:.009,tone:1.12});
      bar(m.steel,.058,.09,.111,.064,.033,.041,{edge:.005,tone:1.12});
      bar(m.steel,-.106,.089,-.059,.089,.052,.058,{edge:.004,tone:1.14});
    }else{
      bar(m.pine,-.078,.075,.079,.075,.077,.083,{edge:.007,tone:1.04});
      for(const i of [-1,1]) bar(m.beam,i*.067,.045,i*.067,.104,.016,.091,{edge:.003});
    }
  } else if(kind==='spanner'){
    bar(m.zinc,0,-.137,0,.094,.027,.018,{edge:.004,tone:.91});
    const end=p(0,-.126,.012);
    ring(b,m,...end,.022,'z');
    b.wire(m.zinc,[p(-.027,.122,.009),p(-.031,.102,.009),p(-.010,.085,.009),
      p(.011,.085,.009),p(.031,.102,.009),p(.027,.122,.009)],.011,{segments:14});
  } else {
    bar(kind==='driver'?m.red:m.cedar,0,-.108,0,.025,.032,.034,{edge:.007});
    bar(m.steel,0,.024,0,.145,.012,.012,{edge:.003,tone:1.25});
    if(kind==='chisel') bar(m.zinc,0,.116,0,.154,.027,.009,{edge:.002,tone:1.12});
    bar(m.brass,0,.014,0,.029,.035,.035,{edge:.003,tone:.83});
  }
  b.cyl(m.zinc,...p(0,.135,-.026),.0057,.050,{sides:6,rotation:[Math.PI*.52,0,0],cast:false});
}

function vise(b,m,x,z) {
  b.cyl(m.steel,x,STOCK+.022,z-.084,.112,.040,{sides:12,top:.90,tone:1.02});
  b.box(m.green,x,STOCK+.072,z-.071,.184,.106,.182,{edge:.023});
  b.box(m.green,x,STOCK+.094,z+.083,.169,.107,.095,{edge:.019});
  b.box(m.zinc,x,STOCK+.141,z-.002,.192,.047,.049,{edge:.004,tone:.76});
  b.box(m.zinc,x,STOCK+.141,z+.053,.191,.047,.046,{edge:.004,tone:.83});
  b.cyl(m.steel,x,STOCK+.059,z+.114,.033,.153,{sides:12,rotation:[Math.PI*.5,0,0],tone:1.12});
  const helix=[];
  for(let i=0;i<=36;i++){
    const a=i/36*Math.PI*8;
    helix.push([x+Math.cos(a)*.029,STOCK+.059+Math.sin(a)*.029,z+.074+i/36*.071]);
  }
  b.wire(m.zinc,helix,.0038,{segments:36,sides:5,cast:false});
  b.stick(m.zinc,[x-.092,STOCK+.026,z+.195],[x+.099,STOCK+.093,z+.195],.016,.016,{edge:.007});
  for(const [dx,dy] of [[-.092,.026],[.099,.093]]) {
    b.cyl(m.steel,x+dx,STOCK+dy,z+.195,.014,.025,{sides:9,rotation:[0,0,Math.PI*.60]});
  }
}

function tin(b,m,x,y,z,r,h,color) {
  b.cyl(m.zinc,x,y+h*.5,z,r,h,{sides:16,tone:.98});
  b.cyl(color,x,y+h*.5,z,r*1.009,h*.67,{sides:16,tone:1.04});
  for(const v of [.045,.965]) b.cyl(m.zinc,x,y+h*v,z,r*1.04,.014,{sides:16,tone:.92});
  b.cyl(m.steel,x,y+h+.003,z,r*.87,.009,{sides:16,tone:.93});
  b.cyl(m.zinc,x,y+h+.009,z,r*.72,.005,{sides:16,tone:.98});
}

function brush(b,m,x,y,z,angle) {
  const c=Math.cos(angle), s=Math.sin(angle);
  const p=(d,dy=.0)=>[x+d*c,y+dy,z+d*s];
  b.stick(m.cedar,p(-.104),p(.034),.019,.023,{edge:.006});
  b.stick(m.zinc,p(.014),p(.058),.027,.043,{edge:.003});
  b.stick(m.beam,p(.053),p(.103,-.003),.025,.043,{edge:.003,tone:.86});
  for(let j=0;j<7;j++){
    const d=(j-3)*.0055;
    const a=p(.064,.010), end=p(.106+Math.abs(d)*.29,.004);
    a[0]+=s*d; a[2]-=c*d; end[0]+=s*d; end[2]-=c*d;
    b.stick(m.pine,a,end,.0025,.003,{edge:0,tone:.78,cast:false});
  }
}

function rag(b,m,x,y,z) {
  const pos=[],uv=[],ind=[],color=[];
  const cloth=new T.Color(0xc4ba93);
  for(let j=0;j<=10;j++) for(let i=0;i<=13;i++){
    const u=i/13,v=j/10;
    const hang=Math.max(0,v-.67);
    const xx=x+(u-.5)*.455+Math.sin(v*7+u*3)*.023;
    const yy=y+.022+.012*Math.sin(u*31+v*4)-hang*hang*1.86;
    const zz=z+(v-.5)*.392+.014*Math.sin(u*17);
    pos.push(xx,yy,zz);
    uv.push(u,v);
    const tone=.84+.14*Math.cos(u*31+v*4);
    color.push(cloth.r*tone,cloth.g*tone,cloth.b*tone);
    if(i<13&&j<10){
      const k=j*14+i;
      ind.push(k,k+14,k+1,k+1,k+14,k+15);
    }
  }
  b.add(indexedSurface(pos,uv,ind,color),m.oilcloth);
}

function drawingMaterial() {
  const canvas=document.createElement('canvas');
  canvas.width=512;
  canvas.height=370;
  const ctx=canvas.getContext('2d');
  ctx.fillStyle='#e0d0a6';
  ctx.fillRect(0,0,512,370);
  ctx.strokeStyle='#566660';
  ctx.lineWidth=1.5;
  ctx.strokeRect(14,14,484,342);
  ctx.fillStyle='#2d4642';
  ctx.font='600 26px Georgia, serif';
  ctx.fillText('TIDEWAY BOATWORKS',28,48);
  ctx.font='14px monospace';
  ctx.fillText('DINGHY  /  TRANSOM & THWARTS',28,72);
  ctx.beginPath();
  ctx.moveTo(63,183);
  ctx.bezierCurveTo(143,75,348,99,449,145);
  ctx.lineTo(442,226);
  ctx.bezierCurveTo(349,267,151,282,63,183);
  ctx.stroke();
  for(const x of [168,244,329,406]){
    const grow=x<210?35:0;
    ctx.strokeRect(x,126+grow*.57,19,117-grow);
  }
  ctx.setLineDash([5,5]);
  ctx.beginPath();ctx.moveTo(42,185);ctx.lineTo(474,185);ctx.stroke();
  ctx.setLineDash([]);
  ctx.strokeRect(27,286,458,54);
  ctx.fillText('REPLACE AFT THWART',39,308);
  ctx.fillText('PINE / 19 MM',39,329);
  ctx.fillText('R. M.',424,323);
  const rand=rng(363);
  for(let i=0;i<2100;i++){
    ctx.fillStyle=i%4?'rgba(120,94,54,.13)':'rgba(253,234,190,.22)';
    ctx.fillRect(rand()*512,rand()*370,.8+rand()*2.5,.5+rand()*1.5);
  }
  const map=new T.CanvasTexture(canvas);
  map.colorSpace=T.SRGBColorSpace;
  map.anisotropy=6;
  return new T.MeshStandardMaterial({map,roughness:.94,vertexColors:true});
}

function bench(b,m,walk,rand) {
  b.zone='carpenter bench';
  const w=3.17,d=.94;
  for(let i=0;i<5;i++){
    b.board(i<2?m.pine:m.cedar,BENCH_X,STOCK-.055,BENCH_Z+(i-2)*d/5,w,.110,d/5-.004,
      {tone:.74+rand()*.19,edge:.008,grain:'x'});
    for (const x of [BENCH_X-w*.43,BENCH_X+w*.42]) {
      screw(b,m,x,STOCK+.002,BENCH_Z+(i-2)*d/5,'y',.008);
    }
  }
  for(const x of [BENCH_X-w*.432,BENCH_X+w*.432]){
    for(const z of [BENCH_Z-d*.366,BENCH_Z+d*.366]){
      b.board(m.beam,x,DECK+.402,z,.127,.803,.124,{edge:.011,tone:mixTone(rand,.18)});
      screw(b,m,x,STOCK-.136,z+.066,'z',.012,true);
    }
    b.board(m.beam,x,DECK+.262,BENCH_Z,.096,.104,d-.13,{tone:1.07});
  }
  b.board(m.beam,BENCH_X,STOCK-.137,BENCH_Z+d*.428,w-.10,.116,.095,{tone:.96});
  b.board(m.beam,BENCH_X,DECK+.246,BENCH_Z,w-.17,.135,.095,{tone:.87});
  for(let i=0;i<4;i++){
    b.board(m.pine,BENCH_X,DECK+.302,BENCH_Z+(i-1.5)*.174,w-.19,.051,.167,
      {tone:mixTone(rand,.19)*.80,edge:.005});
  }
  b.board(m.pine,BENCH_X-.63,STOCK-.191,BENCH_Z+.415,.817,.134,.064,{edge:.007,tone:.92});
  b.board(m.pine,BENCH_X+.34,STOCK-.191,BENCH_Z+.415,1.037,.134,.064,{edge:.007,tone:.87});
  for(const x of [BENCH_X-.63,BENCH_X+.34]){
    b.wire(m.steel,[[x-.051,STOCK-.192,BENCH_Z+.444],[x-.029,STOCK-.202,BENCH_Z+.466],
      [x+.029,STOCK-.202,BENCH_Z+.466],[x+.051,STOCK-.192,BENCH_Z+.444]],.007,{segments:12});
  }
  walk.box(BENCH_X,BENCH_Z,w,d+.086,DECK,STOCK+.18);
  contact(b,m,BENCH_X,DECK,BENCH_Z,w*1.25,d*1.6);
  const front=BENCH_Z+d*.5;
  vise(b,m,BENCH_X+1.19,front-.027);
  const mark=drawingMaterial();
  b.panel(m.paper,BENCH_X+.21,STOCK+.003,BENCH_Z+.157,.57,.344,[-Math.PI*.5,0,-.18],{cast:false});
  b.panel(mark,BENCH_X+.21,STOCK+.005,BENCH_Z+.144,.526,.38,[-Math.PI*.5,0,-.08],{cast:false});
  const pencilX=BENCH_X+.375;
  b.stick(m.red,[pencilX-.084,STOCK+.012,BENCH_Z+.237],[pencilX+.079,STOCK+.012,BENCH_Z+.264],.010,.010,{edge:.002});
  b.stick(m.cedar,[pencilX+.078,STOCK+.012,BENCH_Z+.264],[pencilX+.10,STOCK+.012,BENCH_Z+.269],.006,.006,{edge:.002});
  tin(b,m,BENCH_X+.81,STOCK,BENCH_Z-.261,.095,.184,m.red);
  tin(b,m,BENCH_X+1.17,STOCK,BENCH_Z-.255,.076,.135,m.green);
  brush(b,m,BENCH_X+.76,STOCK+.015,BENCH_Z-.043,.26);
  brush(b,m,BENCH_X-1.21,STOCK+.018,BENCH_Z-.154,-.77);
  rag(b,m,BENCH_X-.82,STOCK,BENCH_Z+.327);
  const offcuts = [[-.20,.14,.39],[-.37,-.08,.28],[-.66,-.22,.50],[-.72,-.15,.28]];
  for(const [x,z,len] of offcuts) b.board(m.cedar,BENCH_X+x,STOCK+.018,BENCH_Z+z,len,.036,.081,
    {rotation:[0,(rand()-.5)*.73,0],tone:mixTone(rand,.21),edge:.003});
  crate(b,m,BENCH_X-.86,DECK+.329,BENCH_Z,.58,.49,.30,{filled:false,pale:true,brand:true});
  crate(b,m,BENCH_X+.79,DECK+.329,BENCH_Z,.61,.52,.31,{filled:true,brand:true,yaw:-.015});
  for(let i=0;i<6;i++){
    b.board(m.cedar,BENCH_X-.12,DECK+.356+i*.025,BENCH_Z-.12+(rand()-.5)*.20,.60+rand()*.21,.026,.092,
      {rotation:[0,(rand()-.5)*.32,0],tone:mixTone(rand,.13),edge:.003});
  }
  const toolZ=-5.654;
  for(let i=0;i<6;i++){
    b.board(i%3===0?m.deck:m.pine,BENCH_X,2.63+i*.183,toolZ,3.16,.175,.067,
      {edge:.004,tone:mixTone(rand,.18)*.90,shade:(x,y)=>.87+.16*(y+.5)});
  }
  for(const x of [BENCH_X-1.56,BENCH_X+1.56]) b.board(m.beam,x,3.08,toolZ+.014,.086,1.156,.094,{tone:.90});
  for(let x=BENCH_X-1.38;x<BENCH_X+1.44;x+=.121) for(let j=0;j<8;j++){
    b.cyl(m.beam,x,2.656+j*.125,toolZ+.035,.0073,.005,{sides:6,rotation:[Math.PI*.5,0,0],tone:.68,cast:false});
  }
  const tools=[
    ['saw',-1.05,3.35,-.073], ['mallet',-.45,3.312,.08], ['hammer',-.167,3.315,-.10],
    ['driver',.18,3.338,-.025], ['chisel',.333,3.35,.028], ['chisel',.476,3.34,-.08],
    ['spanner',.79,3.31,-.165], ['spanner',1.008,3.30,.075], ['driver',1.23,3.35,-.03]
  ];
  for(const [kind,x,y,angle] of tools) pegTool(b,m,kind,BENCH_X+x,y,toolZ+.106,angle);
  b.board(m.cedar,BENCH_X,2.768,toolZ+.075,2.83,.055,.159,{tone:.94,edge:.006});
  for(const n of [-1,0,1]) tin(b,m,BENCH_X+1.14+n*.126,2.795,toolZ+.10,.047,.089,n%2?m.red:m.green);
  for(let i=0;i<5;i++){
    b.box(m.steel,BENCH_X-.13+i*.047,2.806,toolZ+.07,.028,.021,.087,{edge:.004,tone:1+rand()*.19});
  }
}

function stool(b,m,walk,x,z) {
  const h=.55;
  for(let i=0;i<4;i++){
    const a=(i+.5)*Math.PI*.5;
    b.stick(m.pine,[x+.20*Math.cos(a),DECK+.014,z+.20*Math.sin(a)],
      [x+.134*Math.cos(a),DECK+h-.061,z+.134*Math.sin(a)],.051,.054,{edge:.007,tone:.79});
    const next=a+Math.PI*.5;
    b.stick(m.pine,[x+.172*Math.cos(a),DECK+.201,z+.172*Math.sin(a)],
      [x+.172*Math.cos(next),DECK+.201,z+.172*Math.sin(next)],.036,.036,{edge:.004,tone:.89});
  }
  b.cyl(m.beam,x,DECK+h-.027,z,.211,.062,{sides:16,top:.97,tone:1.1,grain:'x'});
  b.cyl(m.pine,x,DECK+h+.006,z,.204,.015,{sides:16,top:.95,tone:.86,grain:'x'});
  walk.ellipse(x,z,.207,.207,0,DECK,DECK+h+.02);
  contact(b,m,x,DECK,z,.60,.63);
}

function oar(b,m,x,y,z,angle,length,tone) {
  const c=Math.cos(angle);
  const p=(d)=>[x-Math.sin(angle)*d,y+c*d,z-.058*d];
  b.stick(m.cedar,p(.453),p(length-.124),.042,.040,{edge:.011,tone});
  b.stick(m.pine,p(length-.22),p(length),.046,.041,{edge:.013,tone:.97});
  const shape=[[-.065,0],[-.091,.08],[-.080,.27],[-.048,.46],[-.021,.56],
    [.023,.56],[.051,.447],[.080,.25],[.091,.081],[.063,.0]];
  toolPoly(b,m.cedar,shape,x,y,z-.035,angle,.027,tone);
  const leather = p(.52*length);
  b.cyl(m.beam,...leather,.024,.101,{sides:10,rotation:[-.056,0,angle],tone:.84});
}

function rightStorage(b,m,walk,rand) {
  b.zone='paint locker and window counter';
  const x=1.265,z=-2.63,w=.72,d=2.29,h=.873;
  for(let i=0;i<6;i++) b.board(m.pine,x,DECK+h-.042,z+(i-2.5)*d/6,w,.084,d/6-.006,
    {tone:mixTone(rand,.18),edge:.006});
  for(const zz of [z-d*.412,z+d*.412]){
    for(const xx of [x-w*.392,x+w*.392]){
      b.board(m.beam,xx,DECK+h*.465,zz,.083,h*.93,.081,{tone:mixTone(rand),edge:.008});
    }
    b.board(m.beam,x,DECK+h-.119,zz,w-.038,.103,.086,{tone:.98});
  }
  b.board(m.pine,x,DECK+.255,z,w-.051,.075,d-.15,{tone:.79});
  b.board(m.beam,x-w*.425,DECK+h-.12,z,.087,.103,d-.12,{tone:1.05});
  walk.box(x,z,w,d,DECK,DECK+h+.04);
  contact(b,m,x,DECK,z,w*1.46,d*1.25);
  crate(b,m,x,DECK+.297,z-.48,.58,.71,.322,{filled:false,pale:true,yaw:.041});
  for(let i=0;i<4;i++) tin(b,m,x+(i%2)*.169-.12,DECK+.298,z+.31+Math.floor(i/2)*.27,.091,.20-i*.018,
    i%2?m.green:m.red);
  for(let i=0;i<3;i++) tin(b,m,x+.07,DECK+h,z-.87+i*.19,.077,.134+i*.014,i===1?m.green:m.red);
  brush(b,m,x+.04,DECK+h+.017,z-.18,1.21);
  brush(b,m,x-.119,DECK+h+.017,z-.03,.53);
  bucket(b,m,x+.10,DECK+h,z+.86,.137,.199,.94);
  b.coil(m.rope,x-.085,DECK+h+.017,z+.39,.129,4,{angle:1.92,pitch:.039,radius:.011});
  b.board(m.trim,x+.22,DECK+h+.007,z+.13,.25,.014,.27,{edge:.002,rotation:[0,-.25,0],tone:.83});

  const sx=.89, sz=-5.47, sw=1.20, sd=.54, sh=1.88;
  for(const dx of [-1,1]) for(const dz of [-1,1]){
    b.board(m.beam,sx+dx*sw*.466,DECK+sh*.5,sz+dz*sd*.45,.069,sh,.080,{edge:.007,tone:1.06});
  }
  for(const yy of [.293,.813,1.31,1.87]){
    b.board(m.pine,sx,DECK+yy,sz,sw,.058,sd,{tone:mixTone(rand,.22),edge:.006});
    b.board(m.beam,sx,DECK+yy-.032,sz+sd*.45,sw,.051,.075,{tone:.94});
  }
  walk.box(sx,sz,sw+.032,sd+.035,DECK,DECK+sh+.15);
  contact(b,m,sx,DECK,sz,sw*1.5,sd*1.75);
  crate(b,m,sx-.035,DECK+.325,sz,sw*.88,sd*.87,.340,{pale:true,filled:true,brand:true});
  crate(b,m,sx-.287,DECK+.842,sz,.49,sd*.83,.281,{filled:false,yaw:.014});
  for(let i=0;i<3;i++) tin(b,m,sx+.078+i*.156,DECK+.842,sz+.028,.061,.141+i*.029,i%2?m.green:m.red);
  tin(b,m,sx-.38,DECK+1.341,sz,.106,.24,m.green);
  tin(b,m,sx-.146,DECK+1.341,sz,.095,.197,m.red);
  bucket(b,m,sx+.25,DECK+1.342,sz,.13,.22,.80);
  for(const x of [-1.12,-.824,-.54]) oar(b,m,x,DECK+.03,-5.40,(x+.79)*.35,2.26+(x+1.2)*.35,.81+rand()*.20);
  b.board(m.beam,-.828,3.34,-5.603,1.042,.097,.15,{edge:.008,tone:.98});
  for(const x of [-1.13,-.837,-.55]) b.stick(m.beam,[x,3.345,-5.557],[x,3.345,-5.319],.036,.037,{edge:.006});
}

function ropeRack(b,m,walk,rand) {
  b.zone='rope and salvage shelf';
  const x=SHOP.minX+.25,z=.21;
  b.board(m.beam,x-.125,3.09,z,.117,.151,1.28,{tone:1.08});
  for(const zz of [-.23,-.77,.4]){
    b.wire(m.steel,[[x-.12,3.14,zz],[x-.068,3.143,zz],[x+.015,3.114,zz],[x+.075,3.118,zz],
      [x+.095,3.166,zz]],.011,{segments:12});
  }
  const p=[];
  for(let i=0;i<=186;i++){
    const t=i/186, a=t*2*Math.PI*5.4;
    p.push([x+.008+.064*t,2.84+Math.cos(a)*(.265+.019*t),-.21+Math.sin(a)*(.137+.019*t)+.008*Math.cos(a*2.7)]);
  }
  p.push([x+.072,2.78,-.092],[x+.11,2.59,-.12],[x+.11,2.48,-.19],[x+.08,2.421,-.201]);
  b.wire(m.rope,p,.019,{segments:175,sides:7,uv:[68,1,0,0]});
  const floorCrateZ=-.93;
  crate(b,m,x+.27,DECK,floorCrateZ,.55,.70,.373,{filled:false,pale:true,brand:true,yaw:.112});
  walk.box(x+.27,floorCrateZ,.58,.75,DECK,DECK+.39);
  contact(b,m,x+.27,DECK,floorCrateZ,.71,.88,.112);
  for(let i=0;i<4;i++) {
    b.board(m.beam,x+.27,DECK+.12+i*.041,floorCrateZ+.21-i*.129,.48,.058,.106,
      {edge:.008,tone:mixTone(rand,.32),rotation:[0,.14-i*.12,0]});
  }
}

function lights(scene,b,m) {
  b.zone='workshop practical lights';
  const x=-3.34, z=-3.98, y=3.69;
  b.wire(m.rubber,[[x,4.16,z],[x+.018,4.03,z],[x-.006,3.88,z],[x,3.785,z]],.009,{segments:12});
  b.cyl(m.green,x,y+.063,z,.227,.137,{top:.31,sides:21,tone:1.11});
  b.cyl(m.trim,x,y-.008,z,.233,.019,{top:.98,sides:21});
  b.cyl(m.glassGlow,x,y-.029,z,.093,.040,{sides:17});
  const pendant = new T.PointLight(0xffcf98, 8.7, 7.6, 2);
  pendant.position.set(x,y-.133,z);
  scene.add(pendant);
  const work = new T.PointLight(0xffd9aa,3.2,5,2);
  work.position.set(-4.7,3.03,-4.94);
  scene.add(work);
  const bx=-5.46,bz=-5.12;
  b.cyl(m.steel,bx,STOCK+.017,bz,.073,.027,{sides:13});
  b.wire(m.steel,[[bx,STOCK+.029,bz],[bx,STOCK+.184,bz],[bx+.025,STOCK+.321,bz],
    [bx+.108,STOCK+.404,bz],[bx+.223,STOCK+.393,bz],[bx+.277,STOCK+.353,bz]],.010,{segments:19});
  b.cyl(m.green,bx+.285,STOCK+.322,bz,.089,.063,{top:.43,sides:14,rotation:[0,0,.29]});
  b.cyl(m.glassGlow,bx+.285,STOCK+.286,bz,.054,.016,{sides:14,rotation:[0,0,.29]});
}

export function buildWorkshop(scene,b,m,walk) {
  const rand=rng(657753);
  bench(b,m,walk,rand);
  stool(b,m,walk,-3.39,-4.04);
  rightStorage(b,m,walk,rand);
  ropeRack(b,m,walk,rand);
  lights(scene,b,m);
}

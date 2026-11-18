import * as T from '../vendor/three.module.min.js';
import { BOARDWALK, DECK, LANDING, MAT, PIER, SHOP, STAIRS, rng, stairsHeight } from './layout.js';
import { mixTone, signMaterial } from './materials.js';
import { bucket, cleat, contact, crate, ring, screw } from './props.js';

const PIER_C = (PIER.minX + PIER.maxX) / 2;

function piling(b,m,rand,x,z,top,size,deep=-.75,cap=false) {
  const mid=.35;
  b.board(m.wetWood,x,(mid+deep)*.5,z,size,(mid-deep),size,{tone:mixTone(rand),edge:.014,grain:'y',
    shade:(_,y)=>.76+.22*(y+.5)});
  b.board(m.deck,x,(top+mid)*.5,z,size,(top-mid),size,{tone:mixTone(rand),edge:.014,grain:'y',
    shade:(_,y)=>.63+.37*Math.min(1,(y+.5)*3.2)});
  for(let j=0;j<3;j++) {
    const s=.028+rand()*.044, yy=.093+rand()*.210;
    b.board(m.wetWood,x-size*.45+rand()*.08,yy,z+size*.507,s,.19+rand()*.09,.009,
      {tone:.74+rand()*.41,grain:'y',edge:.002,cast:false});
  }
  const faces = rand() < .5 ? [-1,1] : [1];
  for(const sign of faces) for(let i=0;i<7;i++) {
    const side=rand()>.63;
    const r=.007+rand()*.016, yy=.081+rand()*.216;
    const a=(rand()-.5)*size*.86;
    b.cyl(i%4 ? m.shell : m.wetRock,x+(side?sign*(size*.5+.002):a),yy,
      z+(side?a:sign*(size*.5+.002)),r,.006+rand()*.011,
      {rotation:side?[0,0,Math.PI*.5]:[Math.PI*.5,0,0],top:.50,sides:6,color:i%2?0xacaa89:0xd5cfb7,cast:false});
  }
  if (cap) {
    b.cyl(m.steel,x,top+.013,z,size*.655,.033,{sides:10,top:.91,tone:.81});
    b.cyl(m.zinc,x,top+.031,z,size*.094,.007,{sides:6});
  }
}

function foundation(b,m,rand) {
  b.zone='workshop foundation';
  const xs=[-5.84,-3.31,-.93,1.53];
  const zs=[-5.48,-3.20,-1.18,1.02];
  for(const x of xs) for(const z of zs) {
    piling(b,m,rand,x,z,1.36,.198,-.62);
    b.board(m.beam,x,1.235,z,.35,.145,.335,{edge:.015,tone:.81});
  }
  for(const x of xs) b.board(m.beam,x,1.24,-2.2,.178,.26,7.17,{edge:.013,tone:.77});
  for(const z of zs) b.board(m.beam,SHOP.center,1.20,z,8.19,.235,.183,{edge:.010,tone:.77});
  for(const x of [xs[0],xs.at(-1)]) for(let j=0;j<zs.length-1;j++) {
    b.stick(m.wetWood,[x,.26,zs[j]],[x,1.22,zs[j+1]],.094,.105,{tone:.83});
  }
  b.board(m.deck,SHOP.center,1.37,1.085,8.23,.173,.139,{tone:.85});
}

function apron(b,m,walk,rand) {
  b.zone='workshop apron';
  const w=BOARDWALK.maxX-BOARDWALK.minX;
  const d=BOARDWALK.maxZ-BOARDWALK.minZ;
  const xmid=BOARDWALK.minX+w*.5, zmid=BOARDWALK.minZ+d*.5;
  const count=41;
  for(let i=0;i<count;i++) {
    const x=BOARDWALK.minX+(i+.5)*w/count;
    const top=DECK+(rand()-.5)*.006;
    b.board(i%7===0?m.pine:m.deck,x,top-.041,zmid,w/count-.008,.082,d,
      {grain:'z',tone:mixTone(rand,.28),edge:.005,shade:(_x,_y,z)=>.86+.19*(z+.5)});
    for(const z of [BOARDWALK.minZ+.11,BOARDWALK.maxZ-.115]){
      screw(b,m,x-w/count*.29,top+.002,z);
      screw(b,m,x+w/count*.29,top+.002,z,'y',.005);
    }
  }
  for(const z of [1.30,3.72]) b.board(m.beam,xmid,1.228,z,w,.228,.184,{tone:.88,edge:.010});
  for(const z of [1.36,3.76]) for(const x of [-6.61,-4.51,-2.09,.85,2.84]) {
    if(z===1.36 && x>-6.1 && x<1.8) continue;
    piling(b,m,rand,x,z,1.37,.19);
  }
  b.board(m.beam,xmid,1.357,3.994,w,.154,.102,{tone:.93});
  for(const x of [-6.79,-4.80,-2.43,.41,2.78]){
    const z=3.88;
    piling(b,m,rand,x,z,DECK+.89,.135,-.53,true);
    walk.box(x,z,.131,.131,DECK,DECK+.9);
  }
  for(const [a,c] of [[-6.85,-2.35],[.34,2.87]]) {
    b.board(m.deck,(a+c)*.5,DECK+.87,3.89,c-a,.103,.112,{tone:.88,edge:.012});
    b.board(m.beam,(a+c)*.5,DECK+.43,3.89,c-a,.066,.072,{tone:1.15,edge:.008});
    walk.box((a+c)*.5,3.89,c-a,.08,DECK+.38,DECK+.93);
  }
  for(const x of [-6.79,2.93]){
    const z0=x<0?1.30:1.31, z1=x<0?3.86:1.71;
    b.board(m.deck,x,DECK+.87,(z0+z1)*.5,.104,.10,z1-z0,{tone:.9,edge:.012});
    piling(b,m,rand,x,z0,DECK+.89,.121,-.54,true);
    walk.box(x,(z0+z1)*.5,.105,z1-z0,DECK+.42,DECK+.94);
  }
  crate(b,m,.78,DECK,1.60,.71,.49,.415,{filled:true,pale:true,brand:true,yaw:-.025});
  crate(b,m,1.59,DECK,1.58,.61,.40,.32,{filled:false,yaw:.083});
  b.board(m.cedar,1.54,DECK+.23,1.57,.39,.039,.14,{rotation:[0,.15,.08]});
  walk.box(.80,1.60,.74,.49,DECK,DECK+.43);
  walk.box(1.59,1.58,.62,.42,DECK,DECK+.34);
  contact(b,m,1.09,DECK,1.59,1.7,.81);
  b.coil(m.rope,-5.66,DECK+.021,2.87,.225,5,{angle:.6,radius:.017,pitch:.053});
  bucket(b,m,-5.78,DECK,1.60,.16,.255,.67);
  const sign=signMaterial({
    background:'#545d4c',ink:'#e8d7a7',border:'#96866a',w:402,h:124,
    lines:[{text:'SHORE  →',y:.51,font:'700 61px serif'}],seed:537
  });
  b.board(m.beam,2.32,DECK+.63,3.954,.68,.23,.061,{tone:1.06});
  b.panel(sign,2.32,DECK+.63,3.987,.656,.202,[0,0,0],{cast:false});
  const apronSign=signMaterial({
    background:'#545d4c',ink:'#e8d7a7',border:'#96866a',w:402,h:124,
    lines:[{text:'←  SHORE',y:.51,font:'700 61px serif'}],seed:638
  });
  b.panel(apronSign,2.32,DECK+.63,3.920,.656,.202,[0,Math.PI,0],{cast:false});
  for(const x of [2.05,2.59]) screw(b,m,x,DECK+.63,3.991,'z',.008,true);
}

function fender(b,m,x,z) {
  const middle=.89;
  const at=[x,middle,z], rotation=[0,Math.PI*.5,0];
  b.add(new T.TorusGeometry(.198,.069,8,28),m.rubber,{at,rotation,tone:.94});
  for(const dx of [-.044,.044]){
    b.add(new T.TorusGeometry(.146,.018,7,26),m.rubber,
      {at:[x+dx,middle,z],rotation,tone:dx>0?1.22:.88,cast:false});
  }
  for(let i=0;i<25;i++) {
    const a=i*Math.PI*2/25;
    b.box(m.rubber,x+.005,middle+Math.cos(a)*.258,z+Math.sin(a)*.258,.103,.017,.041,
      {rotation:[a,0,.15],tone:i%3===0?.84:.96,edge:.002,cast:false});
  }
  const rope=[
    [x-.135,DECK+.229,z+.019],[x-.011,DECK+.199,z+.034],[x+.041,1.37,z+.061],
    [x+.051,1.002,z+.045],[x-.025,1.012,z-.037],[x-.092,1.36,z+.005]
  ];
  b.wire(m.rope,rope,.011,{sides:6,segments:28,uv:[12,1,0,0]});
}

function pier(b,m,walk,rand) {
  b.zone='landing pier';
  const postZ=[4.42,6.77,9.82,11.39,12.88];
  const zCut=LANDING.minZ;
  for(const [from,to,left,right,num] of [
    [BOARDWALK.maxZ,zCut,PIER.minX,PIER.maxX,30],
    [zCut,LANDING.maxZ,LANDING.minX,LANDING.maxX,9]
  ]) {
    const len=to-from;
    const width=right-left;
    for(let i=0;i<num;i++){
      const z=from+(i+.5)*len/num;
      const top=DECK+(rand()-.5)*.007;
      b.board(i%8===0?m.pine:m.deck,(left+right)*.5,top-.043,z,width,.086,len/num-.008,
        {grain:'x',tone:mixTone(rand,.28),edge:.005});
      for(const x of [left+.19,right-.19]){
        for(const d of [-.064,.064]) screw(b,m,x,top+.002,z+d,'y',.0054);
      }
    }
    for(const x of [left+.15,right-.15]){
      b.board(m.beam,x,1.268,(from+to)*.5,.182,.252,len,{shade:(_,y)=>.90+.1*(y+.5)});
      b.board(m.deck,x+(x>PIER_C?.13:-.13),DECK+.042,(from+to)*.5,.111,.090,len,
        {tone:.88,edge:.010});
    }
  }
  const west=(z)=>z>=zCut?LANDING.minX+.124:PIER.minX+.06;
  const east=(z)=>z>=zCut?LANDING.maxX-.122:PIER.maxX-.055;
  for(const z of postZ){
    const xw=west(z), xe=east(z);
    piling(b,m,rand,xw,z,DECK+.949,.154,-.66,true);
    piling(b,m,rand,xe,z,DECK+.465,.184,-.66,false);
    b.cyl(m.rust,xe,DECK+.438,z,.131,.052,{sides:12,top:.91,tone:.84});
    b.board(m.beam,PIER_C,1.193,z,xe-xw+.30,.224,.205,{tone:.84});
    b.stick(m.wetWood,[xw,.264,z],[xe,1.158,z],.101,.091,{tone:.75});
    b.stick(m.wetWood,[xe,.241,z],[xw,1.142,z],.088,.098,{tone:.85});
    walk.box(xw,z,.138,.149,DECK,DECK+.97);
    walk.box(xe,z,.183,.183,DECK,DECK+.48);
    for(const x of [xw,xe]){
      b.cyl(m.steel,x,1.30,z+.099,.019,.009,{sides:6,rotation:[Math.PI*.5,0,0]});
      b.cyl(m.rust,x,1.30,z+.094,.033,.012,{sides:9,rotation:[Math.PI*.5,0,0]});
    }
  }
  for(let i=0;i<postZ.length-1;i++){
    const a=postZ[i], c=postZ[i+1];
    if(i===2) continue;
    for(const y of [.946,.46]){
      b.stick(y>.5?m.deck:m.beam,[west(a),DECK+y,a],[west(c),DECK+y,c],.102,y>.5?.105:.063,
        {tone:y>.5?.91:1.11,edge:.011});
    }
    walk.box(west(a),(a+c)*.5,.12,c-a,DECK+.41,DECK+1.0);
  }
  for(const z of [5.49,8.83,12.29]){
    const x=east(z)-.115;
    cleat(b,m,x,DECK,z,Math.PI*.5);
  }
  for(const [x,z,r,angle] of [[-.12,6.75,.164,2.25],[-.03,9.72,.217,2.6],[.15,12.58,.193,3.26]]){
    b.coil(m.rope,x,DECK+.024,z,r,5,{angle,radius:.015,pitch:.050});
  }
  const mooringX=east(6.77);
  fender(b,m,mooringX+.167,6.82);
  const wraps=[];
  for(let i=0;i<70;i++){
    const a=i/69*Math.PI*4.9;
    wraps.push([mooringX+Math.cos(a)*.12,DECK+.241-i*.00059,6.77+Math.sin(a)*.114]);
  }
  wraps.push([mooringX-.15,DECK+.137,6.72],[mooringX-.18,DECK+.038,6.70],[mooringX-.23,DECK+.03,6.68]);
  b.wire(m.rope,wraps,.016,{segments:82,uv:[16,1,0,0]});
  b.board(m.deck,PIER_C,DECK+.054,LANDING.maxZ-.059,LANDING.maxX-LANDING.minX,.107,.096,{tone:.83,edge:.011});
  ring(b,m,east(12.88),DECK+.306,13.008,.059,'z');

  const ladderX=-1.61;
  for(const x of [ladderX-.245,ladderX+.245]) {
    b.stick(m.steel,[x,-.24,13.49],[x,DECK+.57,13.23],.042,.042,{edge:.012});
    b.wire(m.steel,[[x,DECK+.57,13.23],[x,DECK+.66,13.14],[x,DECK+.63,13.01],[x,DECK+.51,12.94],[x,DECK+.04,12.93]],
      .022,{segments:16});
    walk.box(x,13.055,.057,.247,DECK,DECK+.68);
  }
  for(let i=0;i<7;i++){
    b.board(m.deck,ladderX,-.102+i*.245,13.465-i*.034,.49,.046,.103,{tone:.76,edge:.008});
  }
}

function stairs(b,m,walk,rand) {
  b.zone='shore stair and shore mat';
  const { minX, maxX, minZ, maxZ, count }=STAIRS;
  const d=maxZ-minZ, z=(minZ+maxZ)*.5, step=(maxX-minX)/count;
  for(let j=0;j<count;j++){
    const x=minX+(j+.5)*step, top=stairsHeight(x);
    for(const offset of [-.25,.25]){
      b.board(j%3===0?m.pine:m.deck,x+step*offset,top-.046,z,step*.5-.006,.092,d-.022,
        {tone:mixTone(rand),edge:.006,shade:(_x,y)=>.84+.16*(y+.5)});
      for(const zz of [minZ+.108,maxZ-.108]) screw(b,m,x+step*offset,top+.002,zz,'y',.007,true);
    }
    b.board(m.beam,x-.08,top-.13,z,.122,.15,d-.075,{tone:.86});
  }
  for(const zz of [minZ+.10,maxZ-.10]){
    b.stick(m.wetWood,[minX,DECK-.13,zz],[maxX,STAIRS.bottom-.132,zz],.159,.12,{edge:.01});
  }
  for(const zz of [minZ+.027,maxZ-.027]){
    for(const xx of [minX+.043,minX+step*3.47,maxX-.10]){
      const floor=stairsHeight(xx);
      piling(b,m,rand,xx,zz,floor+.872,.103,-.28,true);
      walk.box(xx,zz,.108,.105,floor-.05,floor+.98);
    }
    b.stick(m.deck,[minX+.029,DECK+.87,zz],[maxX-.091,STAIRS.bottom+.87,zz],.104,.1,{edge:.012,tone:.9});
    b.stick(m.beam,[minX+.043,DECK+.46,zz],[maxX-.092,STAIRS.bottom+.46,zz],.071,.069,{edge:.007,tone:1.0});
    walk.box((minX+maxX)*.5,zz,maxX-minX-.10,.082,STAIRS.bottom+.34,DECK+.95);
  }
  for(let j=0;j<5;j++){
    const w=(MAT.maxX-MAT.minX)/5;
    const x=MAT.minX+(j+.5)*w;
    b.board(m.wetWood,x,MAT.height-.04,z,w-.01,.080,d-.032,{tone:.92+rand()*.36,edge:.006});
    for(const zz of [minZ+.096,maxZ-.096]) screw(b,m,x,MAT.height+.001,zz,'y',.007);
  }
  for(const zz of [minZ+.10,maxZ-.10]){
    b.board(m.wetWood,(MAT.minX+MAT.maxX)*.5,MAT.height-.13,zz,MAT.maxX-MAT.minX,.150,.135,{tone:.81});
  }
}

export function buildDock(b,m,walk) {
  const rand=rng(272840);
  b.group='boathouse structure';
  foundation(b,m,rand);
  b.group='landing and stair';
  apron(b,m,walk,rand);
  stairs(b,m,walk,rand);
  b.group='landing pier';
  pier(b,m,walk,rand);
}

import * as T from '../vendor/three.module.min.js';
import { indexedSurface } from './build-kit.js';
import { BOAT, clamp, lerp, rng, smoothstep, terrainHeight } from './layout.js';
import { frame, ring, screw } from './props.js';

const TRAITS = [
  [.585,.183,.665], [.684,.102,.647], [.770,.038,.625],
  [.791,.019,.613], [.763,.024,.623], [.676,.052,.656],
  [.542,.101,.709], [.348,.186,.791], [.142,.335,.870], [.024,.447,.931]
];
const LENGTH=3.78;
const BASE=.418;
const world=frame(BOAT.x,BASE,BOAT.z,BOAT.yaw);

function shapeAt(u) {
  const s=clamp(u,0,1)*(TRAITS.length-1), i=Math.min(TRAITS.length-2,Math.floor(s)), t=s-i;
  const a=TRAITS[Math.max(i-1,0)], b=TRAITS[i], c=TRAITS[i+1], d=TRAITS[Math.min(i+2,TRAITS.length-1)];
  const values=[];
  for(let k=0;k<3;k++) {
    values.push(b[k]+.5*t*(c[k]-a[k]+t*(2*a[k]-5*b[k]+4*c[k]-d[k]
      +t*(3*(b[k]-c[k])+d[k]-a[k]))));
  }
  return values;
}

function hull(u,v,side,interior=false,offset=0) {
  const [width,keel,sheer]=shapeAt(u);
  const stem=smoothstep(.82,1,u), stern=1-smoothstep(0,.18,u);
  const radius=width*(.021+.979*Math.sin(v*Math.PI*.5)**.86);
  const x=side*Math.max(.005,radius+offset-(interior ? .024+.009*(1-v) : 0));
  const y=lerp(keel,sheer,v)+(interior?.022*(1-v):0);
  const z=(u-.5)*LENGTH+v*(.151*stem-.105*stern);
  return [x,y,z];
}

function hullSurface(b,mat,side,v0,v1,ind,{inside=false,u0=0,u1=1,cols=35,rows=3,label=false,overlap=.013}={}) {
  const positions=[], uv=[], indices=[], colors=[];
  for(let j=0;j<=rows;j++){
    const t=j/rows;
    const v=lerp(v0,v1,t);
    for(let i=0;i<=cols;i++){
      const a=i/cols;
      const u=lerp(u0,u1,a);
      const proud=overlap*((1-t)**1.8)*(.61+.39*Math.sin(u*Math.PI));
      const p=world(...hull(u,v,side,inside,inside?-proud:proud+(label?.013:0)));
      positions.push(...p);
      if (label) uv.push(side<0?a:1-a,t);
      else uv.push(t*.84+.195*ind, u*2.6+.271*ind);
      const fade=inside ? .76+.24*t : .76+.23*Math.sin(t*Math.PI*.67);
      const flecks = (Math.sin(u*47+v*11)*Math.sin(u*18-v*22))*.043
        + .057*Math.sin(u*11+v*1.3);
      const coat = label ? 1 : fade+flecks-(1-smoothstep(0,.12,u))*.048;
      colors.push(coat,coat,coat*(.97+.03*t));
      if(j<rows&&i<cols){
        const k=j*(cols+1)+i;
        const row=cols+1;
        if((side>0&&!inside)||(side<0&&inside)) indices.push(k,k+row,k+1,k+1,k+row,k+row+1);
        else indices.push(k,k+1,k+row,k+1,k+row+1,k+row);
      }
    }
  }
  b.add(indexedSurface(positions,uv,indices,colors),mat,{cast:!label});
}

function loft(b,m,rand) {
  b.zone='clinker dinghy hull';
  for(const side of [-1,1]){
    for(let j=0;j<7;j++){
      const lower=Math.max(0,j/7-.012);
      const upper=(j+1)/7;
      const outer=j===0?m.red:j===6?m.trim:m.green;
      hullSurface(b,outer,side,lower,upper,j);
      hullSurface(b,j%3===1?m.pine:m.cedar,side,lower,upper,j+6,{inside:true,overlap:.009});
      if(j>0&&j<6){
        const pts=[];
        for(let i=0;i<=30;i++){
          const u=i/30;
          pts.push(world(...hull(u,lower+.012,side,false,.013)));
        }
        b.wire(j===1?m.red:m.green,pts,.0051,{segments:35,sides:5,tone:j===1?.69:.76,cast:false,uv:[1,2.8,0,0]});
      }
    }
    const rub=[], top=[], inner=[];
    for(let i=0;i<=34;i++){
      const u=i/34;
      const lip=hull(u,.944,side,false,.023);
      const cap=hull(u,1,side);
      const inCap=hull(u,.979,side,true);
      rub.push(world(...lip));
      top.push(world(cap[0],cap[1]+.018,cap[2]));
      inner.push(world(inCap[0]-side*.011,inCap[1]+.012,inCap[2]));
    }
    b.wire(m.beam,rub,.0255,{segments:42,sides:9,tone:.89,uv:[3.7,1,0,0]});
    b.wire(m.trim,top,.031,{segments:43,sides:9,tone:.89,uv:[3.0,1,0,0]});
    b.wire(m.cedar,inner,.022,{segments:42,sides:8,tone:.92,uv:[3.9,1,0,0]});
    for(let i=0;i<56;i++){
      const u=.031+rand()*.942, v=.17+rand()*.71;
      const length=.004+Math.pow(rand(),1.6)*.039;
      const width=.003+rand()*.009;
      hullSurface(b,i%6===0?m.trim:i%4===0?m.wetWood:m.cedar,side,v,Math.min(v+width,.917),i,{
        u0:u,u1:Math.min(.996,u+length),cols:3,rows:1,overlap:.0155
      });
    }
    for(let i=0;i<17;i++){
      const u=.035+i*.0579;
      const p=hull(u,.955,side,false,.044);
      b.cyl(m.brass,...world(...p),.0047,.004,{sides:6,rotation:[0,BOAT.yaw,Math.PI*.5],cast:false,tone:.88});
    }
  }
  const keel=[];
  for(let i=0;i<=24;i++){
    const u=i/24, p=hull(u,0,1);
    keel.push(world(0,p[1]-.013,p[2]));
  }
  b.wire(m.red,keel,.036,{segments:32,sides:8,tone:.67});
  const stem=[];
  for(let i=0;i<=15;i++){
    const p=hull(1,i/15,1);
    stem.push(world(0,p[1]+.003,p[2]+.012));
  }
  b.wire(m.cedar,stem,.037,{segments:19,sides:8,tone:.9});
  b.wire(m.brass,stem.slice(7).map(([x,y,z])=>[x-.012,y+.004,z+.026]),.019,{segments:11,sides:7,tone:.81});
}

function transom(b,m) {
  for(let i=0;i<6;i++){
    const lo=i/6+.003, hi=(i+1)/6-.003;
    const position=[],uv=[],idx=[];
    for(const v of [lo,hi]) for(const sign of [-1,1]){
      const q=hull(0,v,sign,false,.006);
      position.push(...world(q[0],q[1],q[2]-.009));
      uv.push(v,(sign+1)*.78);
    }
    idx.push(0,2,1,1,2,3);
    const geometry=indexedSurface(position,uv,idx);
    b.add(geometry,i===0?m.red:i>4?m.trim:m.green,{tone:.78+i*.035});
    geometry.setIndex([0,1,2,1,3,2]);
    geometry.computeVertexNormals();
    b.add(geometry,m.cedar,{at:[Math.sin(BOAT.yaw)*.032,0,Math.cos(BOAT.yaw)*.032],tone:.87});
  }
  const p=hull(0,.996,1);
  b.board(m.trim,...world(0,p[1]+.019,p[2]-.004),p[0]*2+.052,.061,.091,
    {rotation:[0,BOAT.yaw,0],edge:.013,tone:.92});
  for(const side of [-1,1]){
    const start=hull(.02,.92,side,true);
    const end=hull(.16,.93,side,true);
    b.stick(m.cedar,world(start[0]-side*.142,start[1]-.014,start[2]+.025),
      world(end[0]-side*.043,end[1]-.036,end[2]),.089,.042,{edge:.011,tone:.93});
  }
  const pos=hull(0,.74,1);
  const center=world(0,pos[1],pos[2]-.043);
  b.board(m.zinc,...center,.134,.095,.027,{rotation:[0,BOAT.yaw,0],edge:.006,tone:.74});
  for(const x of [-.04,.04]) b.cyl(m.steel,...world(x,pos[1],pos[2]-.059),.007,.005,
    {rotation:[Math.PI*.5,BOAT.yaw,0],sides:6,cast:false});
}

function inside(b,m,rand) {
  b.zone='dinghy ribs and thwarts';
  for(let i=0;i<13;i++){
    const u=.061+i*.0685;
    for(const side of [-1,1]){
      const rib=[];
      for(let j=0;j<=9;j++){
        const q=hull(u,.09+j*.097,side,true,-.014);
        q[1]+=.014;
        rib.push(world(...q));
      }
      b.wire(i%4===0?m.beam:m.cedar,rib,.0195,{segments:13,sides:6,tone:.77+rand()*.20,uv:[1,1,0,0]});
      if(i%2===0){
        const rivet=hull(u,.797,side,true,-.009);
        b.cyl(m.brass,...world(...rivet),.0055,.009,{rotation:[0,BOAT.yaw,Math.PI*.5],sides:5,cast:false});
      }
    }
  }
  for(const side of [-1,1]){
    const rail=[];
    for(let i=0;i<28;i++){
      const u=.04+i*.034;
      const p=hull(u,.765,side,true,-.021);
      rail.push(world(...p));
    }
    b.wire(m.beam,rail,.027,{segments:35,sides:7,tone:.93,uv:[3,1,0,0]});
  }
  for(const [u,d,fresh] of [[.13,.317,false],[.415,.306,false],[.686,.262,true]]){
    const p=hull(u,.801,1,true);
    for(const j of [-1,1]){
      b.board(fresh?m.pine:m.cedar,...world(0,p[1]+.004,p[2]+j*d*.254),p[0]*2+.045,.049,d*.50-.006,
        {rotation:[0,BOAT.yaw,0],edge:.009,grain:'x',tone:fresh?1.06:.83+rand()*.12});
      for(const s of [-1,1]) screw(b,m,...world(s*(p[0]-.056),p[1]+.031,p[2]+j*d*.25),'y',.0065,true);
    }
    b.board(m.beam,...world(0,p[1]-.035,p[2]),p[0]*2-.01,.051,.075,
      {rotation:[0,BOAT.yaw,0],edge:.007,tone:.94});
  }
  for(let i=-3;i<=3;i++){
    const x=i*.088, d=2.44-Math.abs(i)*.18;
    b.board(i%3===0?m.beam:m.deck,...world(x,.197,-.19-Math.abs(i)*.022),.079,.035,d,
      {rotation:[0,BOAT.yaw,0],tone:.74+rand()*.23,edge:.005,grain:'z'});
  }
  for(const sign of [-1,1]){
    const u=.458, p=hull(u,1,sign);
    const [x,y,z]=world(p[0],p[1]+.032,p[2]);
    b.board(m.rust,x,y,z,.086,.025,.136,{rotation:[0,BOAT.yaw,0],edge:.007});
    b.cyl(m.steel,x,y+.019,z,.036,.019,{sides:12,top:.9});
    b.cyl(m.rubber,x,y+.031,z,.015,.007,{sides:10,top:.9});
  }
  const bow=hull(.954,1,1);
  b.board(m.cedar,...world(0,bow[1]+.014,bow[2]-.084),.18,.047,.221,
    {rotation:[0,BOAT.yaw,0],edge:.009,tone:.92});
  const r=hull(.983,.843,1);
  ring(b,m,...world(0,r[1],r[2]+.058),.027,'z');
}

function mark(b) {
  const canvas=document.createElement('canvas');
  canvas.width=512;
  canvas.height=142;
  const ctx=canvas.getContext('2d');
  ctx.font='600 115px Georgia, serif';
  ctx.textBaseline='middle';
  ctx.textAlign='center';
  ctx.fillStyle='#e2d7b3';
  ctx.fillText('W R E N',256,72,479);
  ctx.globalCompositeOperation='destination-out';
  const rand=rng(7532);
  for(let i=0;i<2300;i++){
    ctx.fillStyle=i%3?'rgba(0,0,0,.21)':'rgba(0,0,0,.43)';
    ctx.fillRect(rand()*512,rand()*142,.5+rand()*3.9,.4+rand()*1.7);
  }
  const tex=new T.CanvasTexture(canvas);
  tex.colorSpace=T.SRGBColorSpace;
  tex.anisotropy=5;
  const mat=new T.MeshStandardMaterial({map:tex,transparent:true,depthWrite:false,roughness:.86,vertexColors:true});
  for(const side of [-1,1]){
    hullSurface(b,mat,side,.737,.843,0,{u0:.49,u1:.677,cols:7,rows:2,label:true,overlap:.0038});
  }
}

function cradleAndPainter(b,m,walk) {
  b.zone='dinghy cradle and shore mooring';
  const pos=[], uv=[], tri=[];
  const n=11;
  for(let i=0;i<=n;i++) for(let j=0;j<=n;j++){
    const a=j/n, d=i/n;
    const [x,,z]=world((a-.5)*2.4,0,(d-.5)*4.7);
    pos.push(x,terrainHeight(x,z)+.014,z);
    uv.push(a,d);
    if(i<n && j<n){
      const k=i*(n+1)+j;
      tri.push(k,k+n+1,k+1,k+1,k+n+1,k+n+2);
    }
  }
  b.add(indexedSurface(pos,uv,tri),m.contact,{cast:false,receive:false});
  for(const z of [-.57,.64]){
    const [x,y,zz]=world(0,.019,z);
    b.board(m.wetWood,x,y-.024,zz,1.53,.091,.154,{tone:.83,rotation:[0,BOAT.yaw,.024],edge:.014});
    for(const sx of [-1,1]){
      b.board(m.beam,...world(sx*.293,.078,z),.292,.157,.135,
        {rotation:[0,BOAT.yaw,-sx*.36],edge:.013,tone:.89});
    }
  }
  const px=6.027, pz=8.505;
  const ground=terrainHeight(px,pz), tip=ground+.588;
  b.board(m.wetWood,px,ground+.118,pz,.141,.365,.138,{tone:.89,edge:.013});
  b.board(m.deck,px,ground+.382,pz,.139,.413,.139,{tone:.86,edge:.012});
  b.cyl(m.steel,px,tip+.017,pz,.097,.033,{top:.89,sides:10,tone:.87});
  walk.box(px,pz,.145,.145,ground,tip+.036);
  const bow=hull(.99,.842,1);
  const from=world(0,bow[1],bow[2]+.049);
  const toward=[px+.10,tip-.124,pz+.012];
  const rope=[from];
  for(let i=1;i<=13;i++){
    const t=i/13;
    const x=lerp(from[0],toward[0],t), z=lerp(from[2],toward[2],t);
    const y=Math.max(terrainHeight(x,z)+.036,lerp(from[1],toward[1],t)-Math.sin(t*Math.PI)*.546);
    rope.push([x,y,z]);
  }
  for(let i=0;i<=49;i++){
    const a=i/49*Math.PI*4.76;
    rope.push([px+Math.cos(a)*.10,tip-.127-i*.0011,pz+Math.sin(a)*.101]);
  }
  rope.push([px+.065,ground+.338,pz+.093],[px+.134,ground+.092,pz+.167],[px+.224,ground+.027,pz+.213]);
  b.wire(m.rope,rope,.0124,{segments:78,sides:7,uv:[24,1,0,0]});
  b.coil(m.rope,px+.34,terrainHeight(px+.34,pz+.17)+.021,pz+.17,.104,3,
    {angle:2.59,pitch:.029,radius:.012,cast:false});
}

export function buildDinghy(b,m,walk) {
  const rand=rng(67753);
  const outline=[];
  for(const side of [-1,1]){
    for(let i=0;i<=12;i++){
      const [x,,z]=world(...hull(side<0?i/12:1-i/12,.91,side,false,.014));
      outline.push([x,z]);
    }
  }
  walk.polygon(outline,BASE-.04,BASE+1.04);
  loft(b,m,rand);
  transom(b,m);
  inside(b,m,rand);
  mark(b);
  cradleAndPainter(b,m,walk);
}

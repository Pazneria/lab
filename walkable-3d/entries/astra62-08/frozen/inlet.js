'use strict';
const DECK=2.52, WX0=-6.45,WX1=.95,WZ0=-6.25,WZ1=.15;
const RAMP0=3.17,RAMP1=11.15,RZ0=.18,RZ1=2.12;
const shoreLine=x=>6.1+4.9*Math.exp(-(((x-8.2)/9)**2))+1.05*Math.sin(x*.31)+.52*Math.sin(x*.73+1);
function landY(x,z){
 const d=shoreLine(x)-z;
 const base=.101*d+.037*Math.sin(x*1.31+z*.51)+.025*Math.cos(z*1.68-x*.48);
 const bank=1.45*sm(-1,11,-z)+.23*sm(0,9,-z)*Math.sin(x*.46+z*.37);
 const pool=.29*Math.exp(-(((x-.42)/1.19)**2+((z-7.85)/.71)**2))+.19*Math.exp(-(((x-13.72)/1.02)**2+((z-7.89)/.57)**2));
 return Math.max(-6.5,base+bank-pool+sm(13,35,-z)*(1.3+.54*Math.sin(x*.23)+.72*Math.sin(z*.25+x*.13)))
}
function rampY(x){return mix(DECK,landY(RAMP1,(RZ0+RZ1)/2)+.045,sat((x-RAMP0)/(RAMP1-RAMP0)))}
const blockers=[];
function obstacle(x0,x1,z0,z1,lo=-4,hi=20){blockers.push({x0,x1,z0,z1,lo,hi})}
function obb(x,z,sx,sz,yaw=0,lo=-4,hi=20){blockers.push({x,z,sx,sz,yaw,lo,hi})}
const drift=['#988d76','#9c927e','#a79a81','#8b8373','#ad9f85','#9e937e','#a69983'];
const dockwood=['#a29983','#ac9e87','#9b917d','#b3a791','#9b9381','#aaa18c','#ab9e86'];
const iron='#475253', tar='#454b43',teal='#406b63', lightpaint='#d8cdb0';
const rockColors=['#777971','#969287','#727b79','#9b998e','#8d8b7e','#858783','#777b73','#a6a293'];
function stone(x,y,z,sx,sy,sz,col=pick(rockColors),angle=range(0,PI),hi=false){
 ellipse([x,y,z],[sx,sy,sz],col,STONE,hi?14:9,hi?7:4,angle,range(.09,.22))
}
function terrain(){
 mesh=groundMesh;
 // Regular grid shared by dry shingle, intertidal gravel and submerged inlet floor.
 const nx=197,nz=146,dx=.65,dz=.63,xmin=-64,zmin=-54;
 for(let iz=0;iz<nz;iz++)for(let ix=0;ix<nx;ix++){
  const x=xmin+ix*dx,z=zmin+iz*dz,y=landY(x,z);
  const normal=norm([-(landY(x+.04,z)-landY(x-.04,z))/.08,1,-(landY(x,z+.04)-landY(x,z-.04))/.08]);
  const wash=sm(.06,1.1,y),grass=sm(1.25,2.1,y)*sm(1,7,-z)*(1-.36*Math.sin(.74*x+z*.34));
  let color=blend('#6f7063','#b1a58b',wash);color=blend(color,'#747b51',sat(grass));
  color=tint(color,.98+.05*Math.sin(z*1.15+x*.45)+.035*Math.cos(x*2.1-z*.8));
  const idx=mesh.vertex([x,y,z],normal,[x,z],color,EARTH);
  if(ix&&iz)mesh.i.push(idx-nx-1,idx-1,idx,idx-nx-1,idx,idx-nx)
 }
 mesh=nearMesh;
 // Small polished beach stones and mussel shell fragments pass below the tide line.
 for(let i=0;i<2400;i++){
  const x=range(-18,25),z=range(-3,18),y=landY(x,z);
  if(y<-.72||y>1.35)continue;
  const patch=.5+.5*Math.sin(x*.86+z*1.37)*Math.sin(z*.59-x*.32);
  if(rand()>.28+patch*.68)continue;
  const r=range(.018,.095)*(rand()<.08?1.75:1);
  stone(x,y+.004,z,r,r*range(.29,.57),r*range(.6,1.25),tint(pick(rockColors),range(.84,1.16)),range(0,PI))
 }
 // Rock outcrops frame the accessible beach, leaving a broad route around the skiff.
 for(const [cx,cz,r,count] of [[-11,3.5,3.5,40],[16.9,6.2,2.2,24],[17.2,-1.5,2.3,35],[-9.3,10,1.5,16],[.3,9.4,1.3,12],[14.5,13.6,1.6,15]]){
  for(let i=0;i<count;i++){const a=range(0,TAU),d=r*Math.sqrt(rand()),x=cx+Math.cos(a)*d,z=cz+Math.sin(a)*d;
   const k=range(.17,.78)*(1.24-d/r*.65),h=k*range(.4,.92),y=landY(x,z);
   stone(x,y+h*.18,z,k,h,k*range(.68,1.24),pick(rockColors),range(0,PI),true);
   if(k>.42)obb(x,z,k*1.48,k*1.45,0,y-.2,y+h)
  }
 }
 // Bladderwrack follows irregular high-water ribbons and the sheltered edges of stones.
 for(let patch=0;patch<115;patch++){
  const x=range(-16,21),z=shoreLine(x)-range(.8,5.6),y=landY(x,z);
  if(Math.sin(x*.95+z*.44)>.38&&rand()<.8)continue;
  for(let j=0;j<range(3,11);j++){
   const a=range(0,TAU),len=range(.12,.62),ox=x+range(-.23,.23),oz=z+range(-.2,.2),w=range(.012,.033),color=pick(['#595137','#6d623b','#514937','#735d3a']);
   let last=null;
   for(let k=0;k<=6;k++){
    const t=k/6,bend=.045*Math.sin(t*7+j),px=ox+Math.cos(a)*len*t-Math.sin(a)*bend,pz=oz+Math.sin(a)*len*t+Math.cos(a)*bend;
    const py=landY(px,pz)+.02+.014*Math.sin(t*PI),width=w*(.3+.7*Math.sin(t*PI))*(1+.33*Math.sin(t*18));
    const pair=[[px-Math.sin(a)*width,py,pz+Math.cos(a)*width],[px+Math.sin(a)*width,py,pz-Math.cos(a)*width]];
    if(last)quad(last[0],pair[0],pair[1],last[1],color,SEAWEED,null,Y);
    last=pair
   }
  }
 }
 for(let i=0;i<215;i++){
  const x=range(-12,17),z=range(2,13),y=landY(x,z);if(y<-.2||y>1.1)continue;
  const sz=range(.016,.06),yaw=range(0,TAU);
  ellipse([x,y+.014,z],[sz,sz*.28,sz*.63],pick(['#c5bda7','#c8c2af','#a8a99f','#656d70']),STONE,7,3,yaw)
 }
 // Faded tide line atop a damp retaining wall carrying the workshop apron.
 for(let row=-2;row<4;row++){
  let xx=-7.29-(row%2)*.28;
  while(xx<3.15){const w=Math.min(range(.44,1.1),3.2-xx);
   if(w<.06)break;
   const h=.36,y=.85+row*.355,z=2.48+range(-.025,.025);
   box([xx+w/2,y,z],[w-.018,h-.022,.50],tint(pick(rockColors),.82+.06*row),STONE,range(-.016,.016),.045);
   xx+=w
  }
 }
}
function grassClump(x,z,size,quantity=12){
 const y=landY(x,z);
 for(let k=0;k<quantity;k++){
  const a=range(0,TAU),rr=range(0,.13)*size,xx=x+rr*Math.cos(a),zz=z+rr*Math.sin(a);
  const h=range(.16,.55)*size,w=range(.009,.026)*size,lean=range(.07,.22)*size;
  const px=Math.cos(a),pz=Math.sin(a),base=[xx,y-.015,zz],mid=[xx+px*lean*.4,y+h*.67,zz+pz*lean*.4],tip=[xx+px*lean,y+h,zz+pz*lean];
  const l=[-pz*w,0,px*w],col=pick(['#92915a','#8e8c58','#b2a978','#7e8352','#a29d6d','#b3aa79']);
  const b0=vsub(base,l),b1=vadd(base,l),m0=vsub(mid,vmul(l,.52)),m1=vadd(mid,vmul(l,.52)),n=norm([px,.75,pz]);
  mesh.quad([b0,b1,m1,m0],n,texRect(.033,h*.67),[tint(col,.68),tint(col,.68),rgb(col),rgb(col)],GRASS);
  triangle(m0,m1,tip,tint(col,1.04),GRASS,n)
 }
}
function upland(){
 mesh=farMesh;
 for(let i=0;i<720;i++){
  const x=range(-31,32),z=range(-17,4);
  if((x>-8&&x<4.4&&z>-8.1)||(x>2&&x<12.8&&z>-.9))continue;
  if(landY(x,z)<1||Math.sin(x*1.1+z*.9)*Math.cos(z*.35)>.61)continue;
  grassClump(x,z,range(.55,1.6),Math.floor(range(8,17)))
 }
 for(let i=0;i<140;i++){
  const x=range(-34,35),z=range(-25,-2);
  if(x>-9&&x<4&&z>-9)continue;
  const r=range(.25,1.3),y=landY(x,z);
  stone(x,y+r*.10,z,r,r*range(.38,.74),r*range(.7,1.2),pick(rockColors))
 }
 // Hills are physical, asymmetric islands with sandstone shelves at the waterline.
 function island(cx,cz,sx,sz,peak,color,phase){
  const rings=14,num=96,id=mesh.v.length/13;
  const pt=(r,a)=>{
   const coast=1+.081*Math.sin(a*3+phase)+.04*Math.sin(a*7-phase)+.019*Math.sin(a*12+2);
   const xx=cx+sx*r*Math.cos(a)*coast,zz=cz+sz*r*Math.sin(a)*coast;
   const h=peak*(1-r*r)*(.74+.20*Math.sin(xx*.051+phase)+.1*Math.cos(zz*.14))+.77*Math.sin(a*6+phase)*r*(1-r);
   return [xx,h-.75,zz]
  };
  for(let i=0;i<=rings;i++)for(let j=0;j<=num;j++){
   const r=i/rings,a=j/num*TAU,p=pt(r,a);
   const n=i?norm(cross(vsub(pt(r,a+.001),pt(r,a-.001)),vsub(pt(r+.001,a),pt(r-.001,a)))):Y;
   let c=blend('#83837a',color,sm(.2,2.9,p[1]));c=tint(c,.94+.08*Math.sin(p[0]*.58+p[2]*.24)+.045*Math.sin(p[2]*1.2));
   const k=mesh.vertex(p,n,[p[0],p[2]],c,STONE);if(i&&j)mesh.i.push(k-num-2,k-num-1,k,k-num-2,k,k-1)
  }return pt
 }
 const islands=[
  [-63,81,47,15,9,'#717c6b',.5],[56,109,60,19,14,'#798377',1.6],[2,161,117,23,20,'#798890',5.3],
  [-88,22,31,24,14,'#606f60',2.2],[97,36,49,20,11,'#768065',1.3],[29,48,11,4,2.15,'#92947b',.36]
 ];
 function pine(x,y,z,h,col,detail=false){
  const lean=range(-.055,.055)*h;
  cyl([x,y,z],[x+lean,y+h*.93,z],h*.026,'#5e5947',WOOD,6,h*.009);
  const layers=detail?8:5,steps=detail?13:8,phase=range(0,TAU);
  for(let k=0;k<layers;k++){
   const t=k/layers,by=y+h*(.16+.69*t),rad=h*(1-t*.83)*range(.15,.23),apex=y+h*(.53+.47*t)+h/layers*.6;
   const ax=x+lean*(.16+.69*t),ring=[];
   for(let j=0;j<steps;j++){const a=j/steps*TAU+phase+k*.37,f=range(.66,1.12);ring.push([ax+Math.cos(a)*rad*f,by+range(-.07,.065)*h,z+Math.sin(a)*rad*f])}
   for(let j=0;j<steps;j++){
    const p=ring[j],q=ring[(j+1)%steps],top=[x+lean*(.61+.39*t),apex,z];
    const c=tint(col,.85+.11*t+range(-.07,.085));
    triangle(q,p,top,c,GRASS,norm([p[0]-ax,rad*.42,p[2]-z]));
   }
  }
 }
 for(const isl of islands){
  const pt=island(...isl);
  for(let i=0;i<(isl[0]===29?5:115);i++){
   const r=Math.sqrt(rand())*.87,a=range(0,TAU),p=pt(r,a);if(p[1]<1.35)continue;
   pine(...p,range(1.2,3.1),pick(['#536b5f','#5f7566','#5c7164']))
  }
 }
 // Sparse wind-shaped firs on the land behind the building.
 for(let i=0;i<100;i++){
  const x=range(-43,46),z=range(-41,-12),y=landY(x,z);if(Math.sin(x*.26-z*.32)>.30)continue;
  pine(x,y,z,range(2.1,7.2),pick(['#536953','#62745b','#435f52','#6a785b']),true)
 }
 mesh=nearMesh;
}

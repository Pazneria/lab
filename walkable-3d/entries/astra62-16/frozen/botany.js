'use strict';
const leafTones=[0x526d49,0x627e50,0x7c935f,0x527355,0x73905d];
function blade(base,ang,reach,rise,width,drop,col,mode=0){
 const dir=[Math.cos(ang),0,Math.sin(ang)],side=[-dir[2],0,dir[0]],rows=mode===1?9:7,cols=4,grid=[];
 const twist=between(-.32,.32),wobble=between(-.085,.085);
 const position=(t,v)=>{
  let contour=Math.pow(Math.max(0,Math.sin(PI*Math.pow(t,mode===2?.65:.95))),mode===1?.66:.76);
  if(mode===1)contour*=1-.16*Math.pow(Math.sin(t*PI*4),2);
  const wide=width*.5*contour*v,along=reach*t+wobble*width*Math.sin(t*PI),fold=width*contour*(.12*(1-Math.abs(v))-.06*v*v);
  return [base[0]+dir[0]*along+side[0]*wide,base[1]+rise*t-drop*t*t+Math.sin(t*PI)*Math.abs(reach)*.19+fold+wide*twist*t,base[2]+dir[2]*along+side[2]*wide]
 };
 for(let j=0;j<=rows;j++){const t=.002+.996*j/rows,arr=[];for(let k=0;k<=cols;k++){
  const v=k/cols*2-1,p=position(t,v);
  const n=V.unit(V.cross(V.sub(position(t,v+.001),position(t,v-.001)),V.sub(position(t+.001,v),position(t-.001,v))));
  arr.push({p,n,uv:[k/cols,j/rows],c:tint(col,.82+.18*t+.08*(1-Math.abs(v))+.05*v)})
 }grid.push(arr)}
 uvShift=[0,0];for(let j=0;j<rows;j++)for(let k=0;k<cols;k++){const q=[grid[j][k],grid[j][k+1],grid[j+1][k+1],grid[j+1][k]];poly(q.map(v=>v.p),q.map(v=>v.c),M.leaf,q.map(v=>v.n),q.map(v=>v.uv))}
}
function lance(b,t,w,col){
 const a=V.sub(t,b),side=V.mul(V.unit(V.cross(a,[0,1,0])),w/2),c=V.mix(b,t,.46),rib=V.add(c,[0,w*.16,0]),l=V.add(c,side),r=V.sub(c,side);
 uvShift=[0,0];poly([b,l,t,rib],[tint(col,.85),col,tint(col,1.1),tint(col,1.13)],M.leaf,null,[[.5,0],[0,.5],[.5,1],[.5,.5]]);
 poly([b,rib,t,r],[tint(col,.85),tint(col,1.13),tint(col,1.1),tint(col,.92)],M.leaf,null,[[.5,0],[.5,.5],[.5,1],[1,.5]])
}
function rosette(x,y,z,s,c=0x668253,spiky=false){
 const n=spiky?19:13;
 for(let i=0;i<n;i++){
  const t=i/n,a=i*2.399+between(-.1,.1),r=(.38-.22*t)*s*between(.84,1.13),h=(.18+t*.32)*s*between(.86,1.12);
  blade([x+Math.cos(a)*.02*s,y,z+Math.sin(a)*.02*s],a,r,h,(spiky?.063:.16)*s*(1-t*.55),spiky?.025*s:(.08+.11*(1-t))*s,tint(c,between(.8,1.18)),spiky?0:1)
 }
}
function herb(x,y,z,s,col=0x839575){
 for(let k=0;k<7;k++){
  const a=k*2.4,dx=Math.cos(a)*between(.09,.22)*s,dz=Math.sin(a)*between(.09,.22)*s,h=between(.31,.53)*s;
  const a0=[x,y,z],a1=[x+dx*.30,y+h*.56,z+dz*.3],a2=[x+dx,y+h,z+dz];
  pathTube([a0,a1,a2],.005*s,0x778162,M.leaf,5);
  for(let j=0;j<4;j++){const t=.20+j*.185,b=t<.56?V.mix(a0,a1,t/.56):V.mix(a1,a2,(t-.56)/.44);
   for(const side of [-1,1]){const aa=a+side*1.13+j*.42,sz=s*(1-.11*j);
    blade(b,aa,.105*sz,.067*sz,.065*sz,.037*sz,tint(col,between(.83,1.12)),2)}}
 }
}
function fern(x,y,z,s){
 for(let k=0;k<9;k++){
  const a=k*2.4,dir=[Math.cos(a),0,Math.sin(a)],side=[-dir[2],0,dir[0]],r=between(.34,.58)*s,h=between(.32,.59)*s;
  const at=t=>[x+dir[0]*r*t,y+h*(1.6*t-1.08*t*t),z+dir[2]*r*t],points=Array.from({length:8},(_,i)=>at(i/7));
  pathTube(points,.0055*s,0x81915b,M.leaf,5);
  for(let j=1;j<=10;j++){
   const t=j/11,w=s*(.06+.10*Math.sin(t*PI))*(1-t*.58),b=at(t);
   for(const sideSign of [-1,1]){const end=V.add(V.add(V.add(b,V.mul(side,w*sideSign)),V.mul(dir,w*.44)),[0,w*.23,0]);lance(b,end,w*.34,pick(leafTones))}
  }
 }
}
function bells(x,y,z,s){
 rosette(x,y,z,s*.69,0x637a50);
 for(let j=0;j<3;j++){
  const a=j*2.41+.2,b=[x,y,z],h=(.69+j*.105)*s,dx=.109*Math.cos(a)*s,dz=.109*Math.sin(a)*s;
  const p=t=>[x+dx*t*t,y+h*t,z+dz*t*t];pathTube([b,p(.33),p(.73),p(1)],.008*s,0x647448,M.leaf,6);
  for(let k=0;k<8;k++){
   const t=.45+k*.067,aa=k*2.4+a,bp=p(t),v=(.066-.0025*k)*s,tip=V.add(bp,[v*Math.cos(aa),.006*s,v*Math.sin(aa)]);
   rod(bp,tip,.0035*s,.003*s,0x66774e,M.leaf,5);
   group(...tip,aa,()=>{latheScaled(0,-.053*s,0,[[1,0],[.972,.24],[.70,.76],[.26,1]],.027*s,.055*s,pick([0xa78b9c,0xb39daa,0x987f91,0xc2b0af]),M.pot,9,{cap:false});
    ball(0,-.039*s,0,.013*s,.009*s,.013*s,0xc5a068,M.pot,8,4)},.20)
  }
 }
}
function trail(x,y,z,s){
 for(let j=0;j<5;j++){
  const a=j*1.61,dir=[Math.cos(a),0,Math.sin(a)],at=t=>[x+dir[0]*(.21*t+.065*Math.sin(t*TAU))*s,y+s*(.14*Math.sin(t*PI)-t*.62),z+dir[2]*(.16+.26*t)*s];
  const pts=Array.from({length:10},(_,i)=>at(i/9));pathTube(pts,.0045*s,0x707b54,M.leaf,5);
  for(let i=0;i<9;i++){const b=at((i+.5)/10);blade(b,a+(i%2?1:-1)*1.3,.085*s,-.014*s,.09*s,.044*s,pick(leafTones),2)}
 }
}
function clayPlant(x,y,z,r,h,type,s,c=0x9f735b){
 vessel(x,y,z,r,h,c,'pot',true);profile(x,y+h*.91,z,[[r*.85,0],[r*.85,.006]],0x534636,M.soil,20);
 const b=[x,y+h*.93,z,s];if(type==='fern')fern(...b);else if(type==='bells')bells(...b);else if(type==='herb')herb(...b);else if(type==='trail')trail(...b);else rosette(...b,type==='aloe'?0x829c89:0x5d8059,type==='aloe')
}
function plantLabel(x,y,z,cell){
 group(x,y,z,.07,()=>{box(0,.09,0,.020,.19,.012,0x98865f);group(0,.165,0,0,()=>{box(0,0,0,.17,.067,.012,0xd1c3a1,M.pot,.004);panel(0,0,.007,.159,.059,cell)},-.16)})
}
function quince(x,y,z,r,col=0xd8b865,magical=false){
 latheScaled(x,y,z,[[.28,0],[.68,.05],[.95,.23],[1,.46],[.90,.62],[.69,.77],[.59,.95],[.31,1],[.1,.94]],r,r*1.89,col,magical?M.light:M.pot,20);
 const b=[x,y+r*1.79,z],e=[x+r*.17,y+r*2.16,z+.013];rod(b,e,r*.06,r*.038,0x725b42,M.wood,7);
 blade(V.mix(b,e,.71),.4,r*.93,r*.30,r*.44,r*.24,magical?0x66968a:0x748149)
}
function orchardTree(x,y,z,s){
 const p0=[x,y,z],p1=[x-.07*s,y+.39*s,z+.025*s],p2=[x+.075*s,y+.80*s,z-.04*s],p3=[x+.04*s,y+1.27*s,z+.10*s];
 rod(p0,p1,.053*s,.045*s,0x776a51,M.wood,12);rod(p1,p2,.045*s,.032*s,0x837056,M.wood,10);rod(p2,p3,.032*s,.013*s,0x7f7054,M.wood,9);
 for(let i=0;i<12;i++){
  const t=(i+.5)/12,b=t<.5?V.mix(p1,p2,t*2):V.mix(p2,p3,(t-.5)*2),a=i*2.3992,r=(.34+.10*Math.sin(t*PI))*s;
  const m=V.add(b,[r*.58*Math.cos(a),.115*s,r*.58*Math.sin(a)]),e=V.add(b,[r*Math.cos(a),(.28+rand()*.16)*s,r*Math.sin(a)]);
  rod(b,m,.020*s,.012*s,0x806f4e,M.wood,8);rod(m,e,.012*s,.004*s,0x7e704e,M.wood,7);
  for(const side of [-1,1]){const q=V.mix(m,e,.48),e2=V.add(q,[.17*s*Math.cos(a+side),s*.14,.17*s*Math.sin(a+side)]);rod(q,e2,.008*s,.003*s,0x807456,M.wood,6);
   for(let j=0;j<5;j++){const o=V.mix(q,e2,(j+.5)/5);blade(o,a+side*1.8+j*.85,.14*s,.060*s,.085*s,.039*s,pick(leafTones),2)}}
  for(let j=0;j<6;j++)blade(V.mix(m,e,j/6),a+j*2.399,.153*s,.065*s,.088*s,.049*s,pick(leafTones),2);
  if(i%3===0){const at=V.mix(m,e,.77);quince(at[0],at[1]-.148*s,at[2],.067*s,0xd0b469)}
 }
}
function dried(x,y,z,s=1){
 for(let j=0;j<9;j++){
  const a=j*2.4,r=.08*s*(.5+rand()*.6),b=[x+Math.cos(a)*.014*s,y,z+Math.sin(a)*.014*s],e=[x+Math.cos(a)*r,y-s*between(.27,.42),z+Math.sin(a)*r];
  rod(b,e,.0038*s,.003*s,0x99916b,M.wood,5);
  for(let k=0;k<4;k++){let v=V.mix(b,e,.54+k*.12);for(const sign of [-1,1]){const ang=a+sign*1.3;lance(v,V.add(v,[.038*s*Math.cos(ang),-.049*s,.038*s*Math.sin(ang)]),.024*s,pick([0x8b9875,0x8b8b6a,0x9b9e7a,0x788667]))}}
 }
 hoop(x,y-.035*s,z,.024*s,.006*s,0xaa956b,M.linen,12);
}

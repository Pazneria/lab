"use strict";
function brush(x,y,z,s=1,yaw=0){
 frame(x,y,z,yaw,()=>{
  // A broad backed grooming brush resting on closely packed bristles.
  for(let i=0;i<8;i++)for(let j=0;j<4;j++){
   const xx=(i-3.5)*.029*s,zz=(j-1.5)*.027*s;
   cylinder([xx*1.08,.005*s,zz*1.10],[xx,.064*s,zz],.013*s,.016*s,mat(7,(i+j)%3?0xbba172:0x987e52),6);
  }
  box(0,.085*s,0,.272*s,.055*s,.139*s,shade(OAK,1.05),.021*s);
  const p=[];for(let i=0;i<=14;i++){const t=Math.PI*i/14;p.push([.10*s*Math.cos(t),(.103+.067*Math.sin(t))*s,0]);}
  for(let i=0;i<p.length-1;i++)beam(p[i],p[i+1],.045*s,.013*s,LEATHER,.002);
  for(const xx of [-.106,.106])cylinder([xx*s,.112*s,0],[xx*s,.118*s,0],.013*s,.011*s,BRASS,9);
 });
}
function buckle(x,y,z,w,h){
 for(const s of [-1,1]){box(x+s*w/2,y,z,.022,h,.026,BRASS,.004);box(x,y+s*h/2,z,w+.013,.023,.026,BRASS,.004);}
 cylinder([x-w*.48,y,z+.009],[x+w*.48,y,z+.009],.009,.009,BRASS,7);
 beam([x,y-.009,z+.014],[x+.009,y+h*.49,z+.024],.012,.011,BRASS,.002);
}
function bandPath(pts,width,m,stitch=true,closed=false){
 // Form a thick leather ribbon in the wall plane, preserving the broad face and finished edges.
 const edge1=[],edge2=[],back1=[],back2=[],n=pts.length,t=.012;
 for(let i=0;i<n;i++){
  const a=pts[i===0?(closed?n-1:0):i-1],b=pts[i===n-1?(closed?0:i):i+1],d=V.sub(b,a),len=Math.hypot(d[0],d[1])||1;
  const u=[-d[1]/len*width/2,d[0]/len*width/2,0],v=pts[i];
  edge1.push(V.add(v,u));edge2.push(V.sub(v,u));back1.push(V.add(edge1[i],[0,0,-t]));back2.push(V.add(edge2[i],[0,0,-t]));
 }
 let length=0;
 for(let i=0;i<n-(closed?0:1);i++){
  const j=(i+1)%n,step=V.len(V.sub(pts[j],pts[i]));
  face([edge1[i],edge2[i],edge2[j],edge1[j]],m,[[length*2,0],[length*2,width*3],[(length+step)*2,width*3],[(length+step)*2,0]]);
  face([back1[i],back1[j],back2[j],back2[i]],shade(m,.75));face([edge1[i],edge1[j],back1[j],back1[i]],shade(m,.61));face([edge2[j],edge2[i],back2[i],back2[j]],shade(m,.64));
  if(stitch&&i%2===0){
   for(const side of [edge1,edge2]){
    let p=V.mix(pts[i],side[i],.77),q=V.mix(pts[j],side[j],.77);p[2]+=.0025;q[2]+=.0025;
    const v=V.sub(q,p),w=.0028,unit=V.unit([-v[1],v[0],0]),a=V.mix(p,q,.2),b=V.mix(p,q,.79);
    face([V.add(a,V.mul(unit,w)),V.add(b,V.mul(unit,w)),V.sub(b,V.mul(unit,w)),V.sub(a,V.mul(unit,w))],mat(7,0xc9b18b));
   }
  }
  length+=step;
 }
}
function leatherLoop(x,y,z,rx,ry,w,m){
 const p=[];for(let i=0;i<48;i++){const a=i*TAU/48,s=Math.sin(a);p.push([x+rx*Math.cos(a)*(1-.32*s),y+ry*s,z+.043*Math.cos(a*2)+.036*(-s)]);}
 bandPath(p,w,m,true,true);
}
function tack(x,y,z,scale=1){
 frame(x,y,z,0,()=>{const s=scale;
  nailPlate(0,.0,.00,.28*s,.30*s,BLACKIRON);
  beam([0,-.012*s,.014],[0,.052*s,.31*s],.082*s,.097*s,OAK,.015*s);
  ellipsoid(0,.045*s,.323*s,.067*s,.066*s,.052*s,BRASS,12,6);
  const yMid=-.49*s;
  leatherLoop(0,yMid,.253*s,.254*s,.54*s,.102*s,LEATHER);
  leatherLoop(.046*s,-.47*s,.184*s,.34*s,.54*s,.064*s,shade(LEATHER,.72));
  // The breast strap is backed in undyed fleece where it bears on scales.
  const broad=[];for(let i=0;i<=20;i++){const u=i/20; broad.push([(-.285+.58*u)*s,(-.72-.163*Math.sin(u*Math.PI))*s,(.284+.078*Math.sin(u*Math.PI))*s]);}
  bandPath(broad.map(p=>V.add(p,[0,-.018*s,-.022*s])),.142*s,LINEN,false);bandPath(broad,.106*s,shade(LEATHER,.88));
  for(const side of [-1,1]){
   const xx=side*.247*s;hoop([xx,-.76*s,.307*s],[.068*s,0,0],[0,.079*s,0],.013*s,BRASS,17,6);
   const lower=[];for(let j=0;j<12;j++){const t=j/11;lower.push([xx+side*.039*s*Math.sin(t*4),(-.81-.48*t)*s,(.286+.058*t)*s]);}
   bandPath(lower,.066*s,LEATHER,true);buckle(xx+side*.012*s,-1.027*s,.344*s,.108*s,.124*s);
   for(let j=0;j<3;j++)stud(xx-side*.014*s,(-1.18-.035*j)*s,.352*s,.006*s,BLACKIRON);
  }
 });
}
function balmTin(x,y,z,s){
 const m=mat(12,0x99a493),r=.113*s,h=.124*s;
 lathe(x,y,z,[[0,0],[r*.92,0],[r,.012*s],[r,h],[r*.95,h+.005*s],[0,h+.005*s]],m,18);
 lathe(x,y,z,[[r*.97,h-.014*s],[r*1.025,h-.009*s],[r*1.025,h+.010*s],[r*.96,h+.017*s],[0,h+.017*s]],shade(BRASS,.88),18);
 const N=8;for(let j=0;j<N;j++){
   const a=-.99+j*1.98/N,b=-.99+(j+1)*1.98/N;
   const p=t=>[x+(r+.001)*Math.sin(t),z+(r+.001)*Math.cos(t)];
   const A=p(a),B=p(b);
   face([[A[0],y+.018*s,A[1]],[B[0],y+.018*s,B[1]],[B[0],y+.102*s,B[1]],[A[0],y+.102*s,A[1]]],mat(BALM),[[j/N,1],[(j+1)/N,1],[(j+1)/N,0],[j/N,0]]);
 }
}
function handledJug(x,y,z,s,glaze=CELADON){
 lathe(x,y,z,[[0,0],[.088*s,0],[.117*s,.035*s],[.146*s,.147*s],[.129*s,.238*s],[.083*s,.295*s],[.073*s,.352*s],[.09*s,.367*s],[.085*s,.382*s],[.063*s,.374*s],[.059*s,.329*s],[.073*s,.292*s]],glaze,20);
 const p=[];for(let i=0;i<=13;i++){const a=i*Math.PI/13;p.push([x+(.10+.105*Math.sin(a))*s,y+(.246+.090*Math.cos(a))*s,z]);}pipe(p,.019*s,glaze,8);
}
function washBench(){
 group("wash bench");frame(-1.68,0,-.02,Math.PI/2,()=>{
  const w=2.48,top=.904,front=.835;
  shadow(0,.49,2.83,1.19,.49,.021);
  for(const xx of [-1.09,1.09])for(const zz of [.16,.734]){
   box(xx,.431,zz,.105,.86,.11,WALNUT,.012);
   box(xx,.111,zz,.125,.104,.134,BLACKIRON,.005);
  }
  for(let i=0;i<4;i++)box(0,top-.045,.126+i*.198,w,.09,.194,shade(OAK,.87+i*.028),.011);
  box(0,.767,.759,2.31,.145,.084,WALNUT,.011);box(0,.760,.15,2.31,.16,.081,OAK,.012);
  for(let i=0;i<3;i++)box(0,.249,.236+i*.188,2.35,.060,.184,OAK,.008);
  label(0,.763,.812,.48,.113,WASHLABEL);
  for(const x of [-.99,.99])for(const y of [.747,.792])stud(x,y,.806,.014,IRON);
  // A shallow tinned-copper wash bowl, warm water and a folded wiping cloth.
  const copper=mat(6,0xcd885b),x=-.60,z=.44;
  lathe(x,top,z,[[0,0],[.135,0],[.18,.022],[.252,.076],[.304,.161],[.306,.182],[.287,.186],[.279,.153],[.237,.081],[.143,.031],[0,.029]],copper,28);
  hoop([x,top+.182,z],[.306,0,0],[0,0,.306],.011,BRASS,30,6);
  lathe(x,top,z,[[.255,.112],[0,.112]],mat(12,0x84998c),26);
  for(const k of [1,2])hoop([x+.036,top+.114,z-.012],[k*.068,0,0],[0,0,k*.053],.002,mat(12,0x9bad9f),21,4);
  handledJug(-.98,top,.226,.87,mat(12,0xa78862));
  brush(.066,top,.611,1.0,-.18);brush(.395,top,.612,.79,.14);
  balmTin(.68,top,.32,1.18);balmTin(.94,top,.53,.94);bottle(.95,top,.219,.071,.225,mat(12,0x668372));
  folded(.054,top,.224,.40,.10,.26,LINEN);
  smallBasket(-.71,.279,.464,.252,.24);folded(-.70,.491,.469,.33,.077,.30,GREEN);
  bucket(.02,.279,.427,.18,.29);folded(.72,.28,.47,.52,.18,.37,LINEN);
  picture(.46,1.948,.070,.62,.83,CHART,shade(OAK,.90),.019);
  box(-.69,1.64,.105,.83,.089,.115,WALNUT,.012);
  for(const xx of [-1.01,-.80,-.58,-.36])peg(xx,1.64,.146,.128);
  hangingCloth(-.88,1.678,.207,.29,.51,mat(7,0xa2b3a1));
  hoop([-.50,1.569,.274],[.051,0,0],[0,.082,0],.008,CORD,14,5);
  bandPath([[-.50,1.51,.278],[-.49,1.43,.28],[-.52,1.32,.30]],.047,LEATHER);
  obstacle(0,.426,w,front);
 });
}
function longBrush(x,y,z,slant,size){
 const a=[x,y,z],b=[x+slant,y-1.35*size,z+.080];
 cylinder(a,b,.029*size,.032*size,OAK,12);
 hoop(a,[.045*size,0,0],[0,.073*size,0],.009*size,CORD,14,5);
 const bx=b[0],by=b[1]-.067*size,bz=b[2];
 box(bx,by,bz,.30*size,.15*size,.090*size,shade(OAK,1.02),.038*size);
 for(let j=0;j<3;j++)for(let i=0;i<9;i++){
  const xx=bx+(i-4)*.028*size,yy=by+(j-1)*.039*size;
  cylinder([xx,yy,bz+.038*size],[xx+(i-4)*.004*size,yy-.008*size,bz+.095*size],.015*size,.014*size,CORD,6);
 }
}
function passageGear(){
 washBench();group("south passage tack");
 frame(2.80,0,.90,-Math.PI/2,()=>{
  box(0,1.95,.095,2.72,.20,.163,WALNUT,.022);box(0,1.84,.102,2.64,.036,.14,shade(OAK,.83),.009);
  for(const x of [-1.14,1.14])stud(x,1.97,.183,.035,IRON);
  tack(-.63,2.05,.176,1.09);tack(.385,2.01,.172,.85);
  label(-.63,2.337,.123,.60,.152,ROSTERTAG);
  peg(1.02,1.985,.169,.165);leatherLoop(1.02,1.64,.31,.090,.37,.040,shade(LEATHER,.81));
  box(0,.145,.276,2.68,.14,.55,WALNUT,.016);
  coil(.75,.226,.292,.196,4.4,.018);
  folded(-.28,.225,.31,.65,.114,.39,mat(7,0xa6926b));
  obstacle(0,.27,2.69,.56);
 });
 group("north passage stores");
 frame(2.81,0,-2.43,-Math.PI/2,()=>{
  const w=1.96;
  for(const x of [-.925,.925]){
   box(x,1.04,.203,.107,2.08,.105,WALNUT,.010);box(x,1.04,.677,.104,2.08,.104,shade(OAK,.82),.010);
   for(const y of [.284,1.028,1.767])box(x,y-.052,.431,.118,.096,.57,WALNUT,.008);
  }
  for(const y of [.29,1.04,1.78])for(let j=0;j<3;j++)box(0,y,.209+j*.181,w,.064,.178,shade(OAK,.91+j*.019),.009);
  for(let j=0;j<2;j++){
   const xx=-.55+j*.40;jar(xx,1.813,.32,.131,.26,mat(12,j?0xa0a194:0x899d8b));
   balmTin(xx,1.813,.574,.83);
  }
  folded(.48,1.814,.42,.59,.145,.36,LINEN);
  for(let j=0;j<3;j++){
   const xx=-.61+j*.27;const r=.115;
   cylinder([xx,1.191,.23],[xx,1.191,.618],r,r,mat(7,j===0?0x928b70:j===1?0xacb097:0xc2ae88),14);
   hoop([xx,1.191,.621],[r*.64,0,0],[0,r*.64,0],.012,CORD,18,5);
   hoop([xx,1.191,.623],[r*.31,0,0],[0,r*.31,0],.008,shade(CORD,.73),14,5);
  }
  coil(.49,1.075,.419,.188,4.5,.018);
  bucket(-.51,.324,.45,.224,.376);handledJug(.02,.324,.444,1.03);
  jar(.55,.324,.42,.172,.34,mat(12,0xb2946d));
  obstacle(0,.43,w,.66);
 });
 frame(-1.68,0,-3.16,Math.PI/2,()=>{
  box(0,2.08,.105,2.22,.125,.113,OAK,.013);
  for(const x of [-.79,-.35,.12,.67])peg(x,2.09,.134);
  longBrush(-.72,2.09,.303,-.14,.96);longBrush(-.23,2.105,.30,.06,1.12);
  const p=[[.39,2.06,.27],[.41,1.93,.29],[.46,1.70,.30],[.48,1.45,.32],[.43,1.24,.34]];
  pipe(p,.037,OAK,9);box(.43,1.17,.34,.30,.113,.082,IRON,.017);
  // A long loose lead hangs beside the brushes.
  for(let i=0;i<3;i++){
   const cs=[];for(let k=0;k<32;k++){const a=k*TAU/32;cs.push([.77+(.122+.017*i)*Math.cos(a),1.62+(.478-.021*i)*Math.sin(a),.293+.025*i+.016*Math.sin(2*a)]);}
   pipe(cs,.016,CORD,7,true);
  }
  bucket(.17,.018,.44,.268,.45,true);obstacle(.17,.44,.58,.58);
 });
 group("service lamps");
 frame(-1.67,0,2.01,Math.PI/2,()=>wallLamp(0,1.71,.06,1.0));
 lamp([-1.18,2.00,2.01],6.7,[4.0,2.36,1.12],1);
 frame(2.82,0,-4.32,-Math.PI/2,()=>{wallLamp(0,1.84,.06,.98);label(0,1.47,.08,.51,.148,NAMEPLATE);});
 lamp([2.34,2.14,-4.32],7.3,[4.5,2.33,.89],1);
 // A pair of overhead iron feed pipes follows the lane and turns into the roost.
 for(const [x,r] of [[2.15,.075],[2.46,.038]]){
  cylinder([x,2.94,2.65],[x,2.94,-5.27],r,r,mat(6,0x9a8c75),13);
  for(const z of [-4.75,-2.33,.01,2.22]){
   cylinder([x,2.94,z-.029],[x,2.94,z+.029],r*1.22,r*1.22,BLACKIRON,12);
   box(x,3.12,z,.032,.30,.043,BLACKIRON,.003);
  }
 }
}


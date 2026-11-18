"use strict";
function clawSet(x,z,length,yaw=0,count=4,spacing=.17){
 frame(x,.020,z,yaw,()=>{
  for(let k=0;k<count;k++){
   const xx=(k-(count-1)/2)*spacing,off=rand(-.13,.13),len=length*rand(.67,1.05),curve=rand(.08,.17),w=rand(.015,.026);
   const p=t=>[xx+.19*t*t+.033*Math.sin(t*6+k)+curve*Math.sin(t*Math.PI),.0012+Math.sin(t*5)*.0008,off+(t-.5)*len];
   for(let i=0;i<12;i++){
    const a=i/12,b=(i+1)/12,A=p(a),B=p(b),wa=w*Math.sin(Math.PI*a)**.65,wb=w*Math.sin(Math.PI*b)**.65;
    const f=(v,d,h=0)=>[v[0]+d,v[1]+h,v[2]];
    face([f(A,-wa),f(B,-wb),f(B,wb*.55),f(A,wa*.55)],mat(1,0x858074));
    face([f(A,wa*.48,.0001),f(B,wb*.48,.0001),f(B,wb*1.35,.0004),f(A,wa*1.35,.0004)],mat(0,0xeee3c8));
   }
  }
 });
}
function scute(x,y,z,s=1,yaw=0){
 frame(x,y,z,yaw,()=>{
  const rim=mat(6,0xa29b70),boss=mat(5,0x7eaa9c);
  const outline=[[-.04,.24],[-.14,.16],[-.171,.04],[-.139,-.082],[-.071,-.160],[.012,-.208],[.106,-.106],[.157,.017],[.150,.118],[.090,.21]];
  const p=outline.map(([a,b])=>[a*s,.016*s,b*s]),q=p.map(a=>[a[0]*.89,.026*s,a[2]*.9]),center=[.006*s,.085*s,.024*s];
  for(let i=0;i<p.length;i++){const j=(i+1)%p.length;face([p[i],p[j],q[j],q[i]],rim);face([q[i],q[j],center],shade(boss,.86+.13*Math.sin(i*.84)));}
  pipe([[.011*s,.025*s,-.197*s],center,[-.038*s,.031*s,.222*s]],.005*s,rim,5);
 });
}
function makeNest(){
 const cx=.36,cz=-15.71,rx=4.22,rz=1.85,deck=1.720;
 const top=(a,r)=>{
   const shape=1+.040*Math.sin(3*a+.4)+.027*Math.sin(6*a-.7);
   const lip=Math.exp(-Math.pow((r-.82)/.205,2));
   const x=cx+rx*r*shape*Math.cos(a),z=cz+rz*r*(1+.060*Math.sin(3*a-.4))*Math.sin(a);
   const y=deck+.095+.038*Math.sin(a*3+1)*r+.46*lip*(.80+.17*Math.sin(a-.40)+.16*Math.sin(4*a))+.030*Math.sin(a*11+r*6)*r;
   return [x,y,z];
 };
 const uv=p=>[p[0]/.92,p[2]/.92];
 const slices=72,layers=10;
 for(let j=0;j<layers;j++)for(let i=0;i<slices;i++){
   const a=i*TAU/slices,b=(i+1)*TAU/slices,r=j/layers,s=(j+1)/layers;
   let pts=j?[top(a,r),top(b,r),top(b,s),top(a,s)]:[top(a,0),top(b,s),top(a,s)];
   const m=shade(STRAW,.84+.16*r+.024*Math.sin(a*4));
   face(pts,m,pts.map(uv));
 }
 for(let i=0;i<slices;i++){
   const a=i*TAU/slices,b=(i+1)*TAU/slices,A=top(a,1),B=top(b,1);
   face([A,B,[B[0]*.996,deck+.018,B[2]],[A[0]*.996,deck+.018,A[2]]],shade(STRAW,.78));
 }
 // Loose cut straw follows the coil of the bed. Opaque bent ribbons batch with the bed.
 for(let k=0;k<1850;k++){
   const a=rand(0,TAU),r=k<1420?rand(.60,1.019):Math.sqrt(rand(.02,.76)),q=top(a,r),d=rand(.067,.32),dir=a+Math.PI/2+rand(-.82,.82);
   const dx=Math.cos(dir),dz=Math.sin(dir),ww=rand(.0027,.0068),ex=dx*d*.50,ez=dz*d*.50;
   const p=[q[0]-ex,q[1]+.019,q[2]-ez],n=[q[0]+dx*.02,q[1]+rand(.026,.072),q[2]+dz*.04],e=[q[0]+ex,q[1]+rand(.003,.051),q[2]+ez];
   const m=mat(7,[rand(.70,1.01),rand(.585,.84),rand(.34,.59)]),u=[-dz*ww,ww*.42,dx*ww];
   face([p,V.add(n,u),e,V.sub(n,u)],m);
   if(k%6===0){const s=V.mix(n,e,.40);pipe([s,e],.0033,m,4);}
 }
}
function platform(){
 group("rest platform footings");
 const ends=[-4.56,.23,5.0],rows=[-13.66,-17.54];
 for(const x of ends)for(const z of rows){
  shadow(x,z,1.88,1.89,.59,.018);
  box(x,.116,z,.95,.231,.99,shade(DARKSTONE,.90),.048);
  box(x,.336,z,.83,.224,.87,shade(STONE,.80),.044);
  box(x,.491,z,.73,.115,.82,shade(DARKSTONE,1.08),.022);
  box(x,.895,z,.51,.77,.58,shade(OAK,.74),.033);
  box(x,.614,z,.524,.096,.602,BLACKIRON,.009);
  box(x,1.16,z,.575,.128,.640,IRON,.015);
  for(const s of [-1,1])stud(x+s*.136,1.169,z+.329,.033,shade(IRON,1.13));
 }
 for(const z of rows){
  box(.22,1.300,z,10.18,.425,.48,shade(OAK,.79),.034);
  for(const x of [-4.59,-2.08,.23,2.67,4.98]){
   box(x,1.300,z,.166,.444,.507,BLACKIRON,.012);
   stud(x,1.304,z+.269,.046,IRON);
  }
  for(const x of [-2.15,2.62]){
   beam([x-1.87,.56,z],[x-.02,1.253,z],.197,.189,shade(OAK,.84),.019);
   beam([x+1.87,.56,z],[x+.02,1.253,z],.197,.189,shade(OAK,.83),.019);
  }
 }
 group("rest platform carpentry");
 for(let i=0;i<12;i++){
  const x=-4.64+i*.88;box(x,1.491,-15.64,.279,.32,4.83,shade(WALNUT,.97+rand(-.08,.07)),.025);
  // Broad washers and forged pins in the ends of the joists.
  nailPlate(x,1.494,-13.218,.178,.17,BLACKIRON);stud(x,1.492,-13.189,.043,IRON);
 }
 const x0=-4.91,x1=5.39,zn=-17.99,zf=-13.226;
 for(let j=0;j<12;j++){
   const d=(zf-zn)/12,z=zn+(j+.5)*d,split=(j%3-1)*1.58+.19;
   for(const [l,r] of [[x0,split-.005],[split+.005,x1]])box((l+r)*.5,1.641,z,r-l,.157,d-.008,shade(OAK,rand(.82,1.08)),.015);
 }
 // A sacrificial oak nosing is fastened with broad, hand-cut iron straps.
 box(.24,1.605,-13.174,10.39,.249,.175,shade(OAK,1.03),.033);
 for(const x of [-4.64,-3.02,-1.21,.47,2.17,3.90,5.13]){
   box(x,1.607,-13.167,.123,.265,.197,BLACKIRON,.009);
   for(const y of [1.551,1.668])stud(x,y,-13.057,.022,BRASS);
 }
 for(let k=0;k<16;k++){
  const x=-3.65+Math.floor(k/4)*1.89+(k%4)*.111+.035*Math.sin(k),y=1.691+rand(-.015,.005),len=rand(.090,.180);
  face([[x-.016,y,-13.083],[x+.008,y,-13.082],[x+.12,y-len,-13.082],[x+.094,y-len+.031,-13.083]],shade(WALNUT,.65));
  face([[x+.009,y,-13.081],[x+.022,y,-13.081],[x+.126,y-len,-13.081]],mat(4,0xffebb6));
 }
 makeNest();
 // Padded rubbing posts protect the ends of the bed.
 for(const [xx,zz] of [[-4.73,-17.75],[5.18,-17.77],[5.18,-13.48]]){
  box(xx,2.08,zz,.30,.74,.33,shade(OAK,.86),.039);
  for(let j=0;j<5;j++)hoop([xx,1.90+j*.075,zz],[.21,0,0],[0,0,.22],.042,CORD,14,6);
  lathe(xx,2.42,zz,[[0,0],[.182,0],[.18,.049],[.12,.074],[0,.078]],BRASS,14);
 }
 // A keeper's short ladder and rolled bedding give the platform a human reference.
 frame(-3.85,0,-13.01,0,()=>{
  for(const s of [-1,1])beam([s*.265,.028,.47],[s*.265,1.94,-.285],.059,.086,shade(OAK,.94),.011);
  for(let j=0;j<6;j++){const yy=.26+j*.288,z=.47-(yy-.028)*.395;
    cylinder([-.277,yy,z],[.277,yy,z],.026,.026,shade(OAK,1.05),10);}
  obstacle(0,.109,.65,.71);
 });
 obstacle(.24,-15.60,10.47,4.89);
 group("rest platform strawfall");
 for(let k=0;k<330;k++){
  const x=rand(-4.95,5.10),z=-13.08+Math.pow(rand(),2)*1.28;
  const a=rand(0,TAU),l=rand(.058,.29),w=rand(.004,.009),h=rand(.018,.025),dx=Math.cos(a),dz=Math.sin(a);
  face([[x-dx*l*.5,h,z-dz*l*.5],[x-dz*w,h+.009,z+dx*w],[x+dx*l*.5,h+.002,z+dz*l*.5],[x+dz*w*.42,h+.007,z-dx*w*.42]],mat(7,[rand(.62,.94),rand(.54,.78),rand(.32,.54)]));
 }
 clawSet(-.86,-12.05,1.82,-.39,4,.188);clawSet(2.44,-12.30,1.19,.13,4,.146);
 clawSet(-.39,-9.17,1.11,-.38,3,.132);
}
function banner(x,y,z,w,h,at=0){
 frame(x,y,z,at,()=>{
  cylinder([-w*.65,0,0],[w*.65,0,0],w*.029,w*.029,shade(BRASS,.75),12);
  for(const s of [-1,1]){
   ellipsoid(s*w*.67,0,0,w*.047,w*.047,w*.047,BRASS,12,5);
   hoop([s*w*.42,-.030,.008],[0,.066,0],[0,0,.058],.013,IRON,14,5);
  }
  const fn=(u,v)=>[(u-.5)*w*(1-.043*v)+.052*v*v,-.079-h*v+.022*Math.sin(u*9)+h*.125*Math.pow(v,5)*(1-Math.abs(2*u-1)),.025+.092*Math.sin(u*14+v*1.6)+.057*Math.sin(u*6-v*4)*v];
  surface(27,28,fn,(u,v)=>[u*.999,v*.999],mat(BANNER));
  const cord=[];for(let j=0;j<=25;j++)cord.push(fn(j/25,.991));pipe(cord,.010,mat(7,0xc1a56c),5);
 });
}
function greatGate(){
 group("flight gate ironwork");
 frame(0,0,-19.91,0,()=>{
  for(const side of [-1,1]){
    const x=side*5.67;
    box(x,3.65,.36,.157,4.04,.152,IRON,.020);
    for(const y of [1.91,2.95,4.00,5.15]){nailPlate(x,y,.436,.40,.162,BLACKIRON);stud(x,y,.465,.042,BRASS);}
    // A folded pair of storm shutters leaves the landing open to the hills.
    for(let j=0;j<5;j++){
     const xx=side*(4.65+j*.177),hh=3.37+j*.20;
     box(xx,1.76+hh/2,.067+.058*(j%2),.193,hh,.192,shade(WALNUT,.85+j*.049),.014);
    }
    for(const y of [2.03,3.12,4.16])box(side*5.01,y,.203,1.00,.096,.050,IRON,.011);
    beam([side*4.66,1.99,.204],[side*5.39,4.46,.204],.09,.063,shade(OAK,.88),.009);
   }
   for(const y of [1.74,1.89])box(0,y,.28,10.69,.049,.068,IRON,.009);
 });
 group("roost standards");banner(-5.89,6.02,-19.35,1.32,3.02,-.13);
 banner(6.67,5.97,-19.06,1.40,3.13,.21);
 // A chain runs through a wall-mounted sheave at the flight lintel.
 for(const side of [-1,1]){
  const x=side*5.72,z=-19.28;
  nailPlate(x,5.68,z,.37,.48,BLACKIRON);
  cylinder([x,5.68,z+.06],[x,5.68,z+.24],.22,.22,IRON,16);
  hoop([x,5.68,z+.245],[.175,0,0],[0,.175,0],.022,BRASS,19,6);
  chain([x-side*.08,5.49,z+.16],[x-side*.21,3.61,z+.23],.093,.019,BLACKIRON);
 }
}

function firebox(){
 group("ember furnace");
 frame(8.34,0,-13.05,-Math.PI/2,()=>{
  shadow(0,.78,5.3,2.40,.57,.022);
  box(0,.145,.51,4.52,.29,1.50,shade(DARKSTONE,.83),.049);
  box(0,.351,.57,4.21,.184,1.34,shade(DARKSTONE,1.05),.043);
  const o={x:0,lo:.437,s:1.41,r:1.33,h:.62};
  wallFace(-2.03,2.03,.44,2.48,1.065,{m:shade(DARKSTONE,.81),holes:[o],course:.249,width:.56,depth:.71});
  arch(0,1.41,1.33,.62,.247,1.025,.32,shade(DARKSTONE,.91),true,.44,17);
  box(0,.453,.92,2.70,.123,.55,BLACKIRON,.026);
  // Soot-dark firebrick and a bed of banked coals below the iron grate.
  box(0,1.18,.124,2.82,1.55,.12,mat(SOLID,0xa6431b,1,.85));
  for(let j=0;j<6;j++)for(let i=0;i<8;i++){
   const xx=(i-3.5)*.374+(j%2?-.115:.02),yy=.59+j*.256;
   const hot=(1-j/6)*rand(.66,1);
   box(xx,yy,.221,.36,.237,.10,mat(1,[1.05+.68*hot,.55+.17*hot,.35],.93,.12+.54*hot),.012);
  }
  const red=mat(SOLID,0xff702d,1,1.8),hot=mat(SOLID,0xffbd65,1,2.4);
  for(let j=0;j<3;j++)for(let k=0;k<16;k++){
   const xx=(k-7.5)*.166+rand(-.058,.058),yy=.562+rand(-.012,.074),zz=.36+j*.193+rand(-.052,.055);
   const r=rand(.074,.16);
   ellipsoid(xx,yy,zz,r*1.43,r*.85,r,mat(1,[rand(.97,1.48),rand(.45,.70),.32],.89,rand(.31,.88)),8,4,rand(-1,1));
   const b=[xx+r*.48,yy+r*.49,zz+r*.76];face([[b[0]-r*.45,b[1],b[2]],[b[0]+r*.20,b[1]+r*.19,b[2]+.005],[b[0]+r*.51,b[1]+r*.31,b[2]],[b[0]-.021,b[1]+r*.32,b[2]-.010]],k%4?red:hot);
  }
  for(let i=-5;i<=5;i++){
   const xx=i*.229,hi=1.41+.60*Math.sqrt(Math.max(0,1-(xx/1.33)**2));
   beam([xx,.526,.949],[xx,hi,.953],.034,.066,shade(IRON,.68),.005);
  }
  for(const yy of [.609,.868,1.49]){box(0,yy,.988,2.69,.071,.069,BLACKIRON,.007);for(const xx of [-1.23,-.69,.69,1.23])stud(xx,yy,1.031,.019,IRON);}
  box(0,2.50,.55,4.33,.17,1.44,shade(DARKSTONE,1.11),.044);
  const lo=[[-2.08,2.59,-.095],[2.08,2.59,-.095],[2.08,2.59,1.20],[-2.08,2.59,1.20]],hi=[[-.59,3.72,.02],[.59,3.72,.02],[.59,3.72,.69],[-.59,3.72,.69]];
  prism(lo,hi,mat(5,0x85776a));
  for(const u of [-1,-.50,0,.50,1]){
   const a=[u*2.06,2.61,1.207],b=[u*.576,3.70,.697];beam(a,b,.035,.029,BLACKIRON,.003);
   for(let j=1;j<=3;j++){const p=V.mix(a,b,j/4);stud(...p,.017,IRON);}
  }
  cylinder([0,3.68,.36],[0,7.44,.36],.465,.451,shade(BLACKIRON,.87),18);
  for(const yy of [3.75,4.41,5.70,6.85])lathe(0,yy,.36,[[.466,0],[.49,.015],[.49,.092],[.462,.105]],IRON,18);
  // Human-sized gauge and damper beside a much larger heating appliance.
  nailPlate(1.72,1.61,1.107,.42,.68,BLACKIRON);
  cylinder([1.72,1.78,1.12],[1.72,1.78,1.205],.155,.163,BRASS,22);
  panel([1.72,1.78,1.209],[1,0,0],UP,.211,.211,mat(DIAL));
  cylinder([1.72,1.38,1.10],[1.72,1.38,1.329],.043,.043,BRASS,12);
  hoop([1.72,1.38,1.32],[.145,0,0],[0,.145,0],.018,mat(5,0xa96a55),20,7);
  for(let i=0;i<4;i++){const a=i*Math.PI/2+.31;beam([1.72,1.38,1.32],[1.72+.138*Math.cos(a),1.38+.138*Math.sin(a),1.32],.017,.021,IRON,.003);}
  obstacle(0,.61,4.55,1.45);
 });
 group("kiln fuel");
 frame(8.31,0,-9.22,-Math.PI/2,()=>{
  shadow(0,.75,3.10,1.75,.47,.020);
  for(const xx of [-.84,.84]){box(xx,.50,.65,.088,1.01,.94,WALNUT,.014);box(xx,.99,.65,.105,.097,.99,BLACKIRON,.009);}
  for(const zz of [.33,.94])box(0,.23,zz,1.81,.125,.093,TAR,.010);
  for(let j=0;j<4;j++)for(let i=0;i<5-j%2;i++){
   const x=(i-(4-j%2)*.5)*.307+rand(-.029,.029),y=.337+j*.19,r=rand(.111,.164),e=rand(.82,1.05);
   cylinder([x,y,.17],[x+.02,y+.02,e],r,r*.91,shade(WALNUT,rand(.75,1.02)),8);
   cylinder([x+.020,y+.020,e+.0005],[x+.020,y+.020,e+.012],r*.89,r*.84,ENDGRAIN,8);
   face([[x+.02,y+.025,e+.013],[x+r*.72,y+.07,e+.013],[x+.04,y+.013,e+.013]],shade(WALNUT,.62));
  }
  obstacle(0,.64,1.88,1.05);
 });
}
function waterFittings(){
 group("water trough and pipework");
 frame(-8.31,0,-10.01,Math.PI/2,()=>{
  const x=.0,z=1.07;
  shadow(x,z,3.25,2.63,.55,.022);
  box(x,.172,z,2.20,.34,1.43,shade(DARKSTONE,.88),.080);
  for(const s of [-1,1])box(s*.76,.395,z,.41,.16,1.30,STONE,.036);
  // A deep elliptical drinking pan has a rolled bronze lip and lime-stained waterline.
  const profile=[[.02,.46],[.56,.47],[.76,.56],[.98,.82],[1.04,.97],[1.055,1.015],[1.035,1.052],[.977,1.060],[.958,1.021],[.948,.966],[.853,.795],[.616,.581],[.03,.557]];
  const nr=32;
  for(let j=0;j<profile.length-1;j++){
   const [a,ay]=profile[j],[b,by]=profile[j+1];const m=j<4?mat(6,0x9b8a70):j<8?mat(6,0xc0aa86):mat(6,0x8c9e86);
   const f=(i,r,y)=>[x+1.34*r*Math.cos(i*TAU/nr),y,z+.84*r*Math.sin(i*TAU/nr)];
   for(let i=0;i<nr;i++)face([f(i,a,ay),f(i,b,by),f(i+1,b,by),f(i+1,a,ay)],m);
  }
  const water=mat(12,0x697f76),aa=.909;
  const rim=[];for(let i=nr-1;i>=0;i--){const t=i*TAU/nr;rim.push([1.34*aa*Math.cos(t),.895,z+.84*aa*Math.sin(t)]);}face(rim,water);
  for(let i=1;i<=4;i++)hoop([-.28,.897+i*.0003,z-.14],[i*.107,0,0],[0,0,i*.086],.003,mat(12,i%2?0x899d8e:0x81978a),24,5);
  for(const s of [-1,1]){cylinder([s*1.14,.79,z-.43],[s*1.14,.79,z+.34],.052,.052,IRON,9);hoop([s*1.30,.792,z],[0,0,.215],[0,.128,0],.025,IRON,18,6);}
  pipe([[-.29,3.14,.21],[-.29,1.71,.21],[-.29,1.61,.28],[-.29,1.61,.69],[-.29,1.56,.77],[-.29,1.43,.77]],.075,mat(6,0xa49472),12);
  for(const yy of [1.91,2.58,3.04]){
   lathe(-.29,yy,.21,[[.076,0],[.091,.008],[.091,.069],[.076,.073]],BRASS,14);
   box(-.29,yy+.030,.103,.19,.074,.19,IRON,.009);
  }
  nailPlate(.49,1.73,.102,.32,.57,IRON);
  cylinder([.49,1.72,.114],[.49,1.72,.43],.054,.054,BRASS,12);
  hoop([.49,1.72,.43],[.203,0,0],[0,.203,0],.024,mat(5,0xa86a55),22,7);
  for(let i=0;i<5;i++){const t=TAU*i/5;beam([.49,1.72,.43],[.49+.195*Math.cos(t),1.72+.195*Math.sin(t),.43],.025,.029,IRON,.004);}
  box(0,3.17,.19,4.05,.119,.124,mat(6,0xa8997c),.035);
  obstacle(0,1.02,2.87,1.86);
 });
}
function anchorPlate(x,y,z,size=1){
 frame(x,y,z,0,()=>{
  const s=size;
  nailPlate(0,0,.012,.68*s,.80*s,shade(IRON,.79));
  cylinder([0,.061*s,.023],[0,.061*s,.23*s],.174*s,.141*s,shade(BRASS,.76),14);
  hoop([0,-.143*s,.22*s],[.239*s,0,0],[0,.283*s,0],.047*s,IRON,23,8);
  cylinder([0,.084*s,.167*s],[0,.084*s,.31*s],.067*s,.072*s,IRON,11);
 });
}
function supplyHoist(){
 group("wall hoist");frame(-8.27,0,-15.40,Math.PI/2,()=>{
  // Wall crane with its load carried into a timber knee and two iron bearing plates.
  box(0,2.54,.24,.34,5.08,.40,WALNUT,.031);
  box(0,.22,.24,.62,.44,.65,STONE,.040);
  for(const y of [1.12,3.80,4.79]){box(0,y,.25,.36,.133,.425,BLACKIRON,.011);stud(0,y,.474,.039,IRON);}
  beam([0,4.81,.14],[0,4.81,2.57],.25,.31,shade(OAK,.84),.027);
  beam([0,3.11,.39],[0,4.64,2.19],.23,.23,OAK,.021);
  for(const e of [-1,1])box(e*.177,4.78,2.31,.042,.49,.43,BLACKIRON,.014);
  cylinder([-.21,4.67,2.33],[.21,4.67,2.33],.102,.102,BRASS,13);
  cylinder([-.128,4.61,2.33],[.129,4.61,2.33],.233,.233,IRON,20);
  chain([0,4.39,2.49],[0,2.21,2.49],.093,.020,shade(IRON,.88));
  hoop([0,2.12,2.49],[.096,0,0],[0,.13,0],.023,BRASS,15,7);
  pipe([[0,2.08,2.49],[0,1.97,2.49],[-.067,1.88,2.49],[-.049,1.79,2.49],[.053,1.757,2.49],[.124,1.821,2.49],[.139,1.918,2.49]],.035,IRON,9);
  chain([0,4.46,2.13],[0,2.77,.43],.083,.017,BLACKIRON);
  for(const x of [-.31,.31]){box(x,2.32,.44,.076,.68,.48,shade(IRON,.79),.016);}
  cylinder([-.36,2.43,.555],[.36,2.43,.555],.173,.173,shade(OAK,.84),18);
  for(let i=0;i<8;i++)hoop([-.24+i*.067,2.43,.555],[0,.181,0],[0,0,.181],.022,CORD,17,6);
  cylinder([.31,2.43,.555],[.51,2.43,.555],.049,.049,BRASS,11);
  beam([.54,2.43,.555],[.54,2.20,.71],.054,.058,IRON,.006);
  cylinder([.50,2.20,.71],[.75,2.20,.71],.042,.048,OAK,10);
  box(0,.43,.70,1.57,.14,.69,OAK,.026);
  for(const x of [-.58,.58])box(x,.205,.70,.119,.41,.58,WALNUT,.013);
  coil(-.23,.51,.70,.248,4.7,.023);folded(.45,.51,.72,.48,.128,.37,LINEN);
  obstacle(0,.64,1.62,.95);
 });
}
function entryBay(){
 group("roost doorway care station");frame(0,0,-5.51,Math.PI,()=>{
  label(-2.15,1.78,.093,.89,.278,NAMEPLATE);
  wallLamp(1.13,1.99,.089,1.03);
  anchorPlate(-3.60,1.69,.082,1.29);
  anchorPlate(4.63,1.88,.081,1.52);
  banner(-.56,6.26,.26,.99,2.53);
  // Old growth marks accumulate far above the keeper's own reach.
  box(2.18,2.40,.107,.259,4.78,.132,shade(OAK,.90),.012);
  for(let i=0;i<34;i++){
   const y=.267+i*.128,w=i%4===0?.165:.096;
   box(2.085+w*.48,y,.179,w,.012,.009,mat(7,0xd3c4a3));
   if(i%7===0)stud(2.248,y,.183,.018,BRASS);
  }
  for(const [y,w] of [[1.18,.286],[2.16,.35],[3.24,.403],[4.15,.428]]){
   nailPlate(2.18,y+.04,.183,w,.068,shade(BRASS,.82));
  }
  box(-4.67,.53,.44,1.39,.12,.691,OAK,.016);
  for(const x of [-5.20,-4.15])box(x,.254,.44,.12,.50,.52,WALNUT,.013);
  folded(-4.99,.593,.43,.48,.142,.34,GREEN);
  balmTin(-4.41,.593,.42,1.13);brush(-4.02,.593,.426,.87,-.07);
  obstacle(-4.67,.44,1.44,.77);
  stool(-5.69,.68,.95,-.08);obstacle(-5.69,.68,.47,.45);
  barrel(5.84,.02,.67,.415,1.03);obstacle(5.84,.67,.85,.87);
  bucket(5.01,.02,.56,.21,.36,true);obstacle(5.01,.56,.44,.44);
 });
 lamp([-1.13,2.30,-5.99],8.0,[5.8,3.20,1.38],2);
 group("perch inspection kit");frame(5.85,0,-16.41,-.20,()=>{
  box(0,.094,0,.76,.183,.53,shade(OAK,.81),.015);
  box(0,.269,0,.64,.170,.51,shade(OAK,.88),.014);
  for(const x of [-.25,.25])box(x,.357,0,.062,.015,.53,BLACKIRON,.005);
  lantern(0,.357,0,1.24);obstacle(0,0,.80,.58);
 });
 lamp([5.86,1.18,-16.41],7.5,[4.9,2.71,1.08],2);
 frame(-8.29,0,-17.22,Math.PI/2,()=>wallLamp(0,2.31,.05,1.45));
 lamp([-7.61,2.81,-17.22],9.1,[6.5,3.8,1.96],2);
 // Broad bounced warmth reaches the floor, underdeck and upper stones.
 lamp([3.85,3.32,-11.49],12.5,[3.34,1.78,.76],2);
 lamp([-4.36,3.76,-12.00],12.6,[4.44,3.62,2.68],2);
 lamp([.04,2.16,-18.57],11.0,[4.00,2.67,1.55],2);
 lamp([.56,1.75,-4.71],4.00,[2.34,1.45,.78],1);
}
function roostObjects(){platform();greatGate();firebox();waterFittings();supplyHoist();entryBay();}


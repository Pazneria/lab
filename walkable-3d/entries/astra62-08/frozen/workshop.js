'use strict';
const glassMesh=new Batch();
const EY=5.28, RY=7.03, RIDGE=(WX0+WX1)/2;
const cedar=['#9a927c','#a49b85','#b0a48a','#948b76','#a99e88','#a59a82','#b3a992','#9e947f','#a39983'];
const structural=['#88765b','#89795f','#938267','#9b8769','#8c795e'];
const roofY=x=>RY-Math.abs(x-RIDGE)*(RY-EY)/((WX1-WX0)/2);
function wallFace(side){
 const isZ=side==='front'||side==='back',pos=side==='front'?WZ1:side==='back'?WZ0:side==='east'?WX1:WX0;
 const dir=side==='front'||side==='east'?1:-1;
 const P=(t,y,d=0)=>isZ?[t,y,pos+d*dir]:[pos+d*dir,y,t];
 const axis=isZ?X:Z,out=isZ?[0,0,dir]:[dir,0,0];
 const D=(length,h,deep)=>isZ?[length,h,deep]:[deep,h,length];
 const outer=side==='front'?'#a69c85':'#958d77';
 function section(a,b,low,top){
  const high=t=>typeof top==='function'?top(t):top;
  const count=Math.max(1,Math.round((b-a)/.218)),w=(b-a)/count;
  for(let i=0;i<count;i++){
   const t=a+(i+.5)*w,hi=high(t),color=pick(cedar);
   if(hi-low<.014)continue;
   beam(P(t,low,0),P(t,hi,0),w-.005,.115,color,WOOD,.005,0,isZ?Z:X);
   if(i<count-1||b-a>.6){
    const bt=t+w*.5,bh=high(bt);
    if(bh>low+.02)beam(P(bt,low+.006,.068),P(bt,bh,.070),.035,.030,tint(color,range(.93,1.03)),WOOD,.004,0,isZ?Z:X)
   }
   if(isZ&&typeof top==='function'){
    const l=t-w*.5,r=t+w*.5,base=hi-.14;
    quad(P(l,base,-.019),P(r,base,-.019),P(r,high(r)+.015,-.019),P(l,high(l)+.015,-.019),outer,WOOD,null,out)
   }
  }
  // A dark overlapping lining closes fine joints, including under grazing light.
  quad(P(a,low,-.032),P(b,low,-.032),P(b,high(b),-.032),P(a,high(a),-.032),'#6e614c',WOOD,null,out)
 }
 function window(a,b,lo,hi,lights=2){
  const w=b-a,h=hi-lo,m=(a+b)*.5;
  for(const t of [a,b])beam(P(t,lo-.066,.075),P(t,hi+.066,.075),.11,.13,lightpaint,PAINT,.008,0,isZ?Z:X);
  for(const y of [lo,hi])beam(P(a-.062,y,.078),P(b+.062,y,.078),.145,.117,lightpaint,PAINT,.008);
  beam(P(a-.125,lo-.055,.104),P(b+.125,lo-.055,.104),.235,.081,'#aaac94',PAINT,.008);
  for(let j=1;j<lights;j++){
   const t=mix(a,b,j/lights);beam(P(t,lo,.032),P(t,hi,.032),.045,.059,'#b8b8a0',PAINT,.003,0,isZ?Z:X)
  }
  const split=lo+h*.58;
  beam(P(a,split,.031),P(b,split,.031),.057,.041,'#bdbca1',PAINT,.003);
  for(const t of [a-.012,b+.012])beam(P(t,lo-.07,-.086),P(t,hi+.07,-.086),.095,.073,'#b2a185',WOOD,.005,0,isZ?Z:X);
  beam(P(a-.085,lo-.057,-.11),P(b+.085,lo-.057,-.11),.18,.083,'#a99576');
  mesh=glassMesh;
  for(let j=0;j<lights;j++)for(const [y0,y1] of [[lo+.04,split-.022],[split+.022,hi-.044]]){
   const t0=mix(a,b,j/lights)+.022,t1=mix(a,b,(j+1)/lights)-.022;
   quad(P(t0,y0,.008),P(t1,y0,.008),P(t1,y1,.008),P(t0,y1,.008),'#b6d0c3',GLASS,null,out)
  }mesh=nearMesh
 }
 return {section,window,P,D,axis,out,isZ,side}
}
function workshop(){
 // Raised floor on sleepers, continuous at the doorway.
 for(let i=0;i<35;i++){
  const w=(WX1-WX0+.04)/35,x=WX0-.02+(i+.5)*w,seam=range(-4.8,-1.2);
  for(const [a,b] of [[WZ0-.06,seam-.004],[seam+.004,WZ1+.012]]){
   beam([x,DECK-.056,a],[x,DECK-.056,b],w-.004,.112,tint(pick(cedar),range(.78,.91)),WOOD,.004)
  }
  for(const z of [WZ0+.16,seam-.055,seam+.055,WZ1-.14])peg(x+.047,DECK+.001,z,.008,IRON,'#514d42')
 }
 for(const z of [WZ0+.10,-3,WZ1-.10])beam([WX0-.1,DECK-.20,z],[WX1+.1,DECK-.2,z],.24,.29,'#746952');
 const front=wallFace('front'),back=wallFace('back'),east=wallFace('east'),west=wallFace('west');
 const doorA=-3.55,doorB=-.77,doorH=4.86;
 front.section(WX0,doorA,DECK,roofY);front.section(doorA,doorB,doorH,roofY);
 const fw0=-.42,fw1=.55;
 front.section(doorB,fw0,DECK,roofY);front.section(fw0,fw1,DECK,3.64);front.section(fw0,fw1,4.58,roofY);front.section(fw1,WX1,DECK,roofY);
 front.window(fw0,fw1,3.64,4.58,2);
 obstacle(WX0-.07,doorA+.05,WZ1-.09,WZ1+.11,DECK-.16);
 obstacle(doorB-.05,WX1+.07,WZ1-.09,WZ1+.11,DECK-.16);
 function pierced(f,min,max,holes,lo,hi,top){
  let t=min;for(const [a,b,count] of holes){f.section(t,a,DECK,top);f.section(a,b,DECK,lo);f.section(a,b,hi,top);f.window(a,b,lo,hi,count);t=b}f.section(t,max,DECK,top)
 }
 pierced(back,WX0,WX1,[[-5.25,-3.42,3],[-2.53,-.42,3]],3.74,4.79,roofY);
 pierced(east,WZ0,WZ1,[[-5.27,-3.59,2],[-2.93,-1.27,2]],3.71,4.76,EY);
 pierced(west,WZ0,WZ1,[[-3.12,-1.03,3]],3.82,4.80,EY);
 obstacle(WX0-.11,WX0+.10,WZ0,WZ1+.08,DECK-.19);
 obstacle(WX1-.10,WX1+.11,WZ0,WZ1+.08,DECK-.19);
 obstacle(WX0,WX1,WZ0-.09,WZ0+.11,DECK-.19);
 for(const side of [front,back,east,west]){
  const is=side.isZ,a=is?WX0:WZ0,b=is?WX1:WZ1;
  for(const t of [a+.06,b-.06]){
   beam(side.P(t,DECK-.11,.082),side.P(t,EY+.02,.082),.143,.143,'#b5ac92',PAINT,.007,0,is?Z:X)
  }
  const seg=side===front?[[a,doorA-.06],[doorB+.06,b]]:[[a,b]];
  for(const [a0,b0] of seg){
   beam(side.P(a0,DECK+.10,.074),side.P(b0,DECK+.10,.074),.08,.203,'#888873',WOOD,.006);
   beam(side.P(a0,DECK+.12,-.074),side.P(b0,DECK+.12,-.074),.075,.24,'#82745d',WOOD,.005)
  }
 }
 for(const x of [doorA-.012,doorB+.012]){
  beam([x,DECK,WZ1+.07],[x,doorH+.10,WZ1+.07],.141,.16,'#b3aa91',PAINT,.01);
  beam([x,DECK,WZ1-.10],[x,doorH+.10,WZ1-.10],.17,.17,'#8f795f',WOOD,.01)
 }
 beam([doorA-.11,doorH+.041,WZ1+.069],[doorB+.13,doorH+.041,WZ1+.069],.17,.13,'#ada38a',PAINT,.012);
 box([(doorA+doorB)/2,DECK+.012,WZ1],[doorB-doorA+.05,.024,.24],'#a89a7d',WOOD);
 // Single ledged sliding door, its forged strap wheels parked at the left stop.
 const da=-6.38,db=-3.57,dz=WZ1+.183,dy=DECK+.046,dh=2.32;
 for(let j=0;j<14;j++){
  const w=(db-da)/14,x=da+(j+.5)*w;
  beam([x,dy,dz],[x,dy+dh,dz],w-.004,.075,tint('#64857a',range(.82,1.08)),PAINT,.004)
 }
 for(const y of [dy+.18,dy+dh-.18])beam([da+.045,y,dz+.056],[db-.045,y,dz+.056],.073,.147,'#597b71',PAINT,.006);
 beam([da+.105,dy+.26,dz+.061],[db-.105,dy+dh-.26,dz+.061],.065,.154,'#658778',PAINT,.007);
 const trackZ=dz+.026,ty=dy+dh+.13;
 beam([WX0-.02,ty,trackZ],[doorB+.20,ty,trackZ],.053,.078,'#48514d',IRON,.006);
 for(let j=0;j<6;j++){
  const x=mix(WX0+.10,doorB+.09,j/5);
  beam([x,ty+.014,WZ1+.046],[x,ty+.014,trackZ],.056,.062,'#4d5147',IRON,.003)
 }
 for(const x of [da+.32,db-.32]){
  box([x,ty-.155,dz+.103],[.064,.39,.026],'#444c46',IRON,0,.004);
  cyl([x,ty+.02,dz+.028],[x,ty+.02,dz+.131],.091,'#444d47',IRON,14);
  cyl([x,ty+.02,dz+.132],[x,ty+.02,dz+.146],.031,'#989783',IRON,8);
  for(const y of [ty-.225,ty-.285])cyl([x,y,dz+.115],[x,y,dz+.135],.017,'#949381',IRON,6)
 }
 const hx=db-.16,hy=dy+1.04;
 tube([[hx,hy-.13,dz+.048],[hx,hy-.11,dz+.128],[hx,hy+.11,dz+.128],[hx,hy+.13,dz+.048]],.018,'#525b53',IRON,9);
 // Exposed frame with through-bolted knee braces and birdsmouth rafter ends.
 for(const z of [WZ0+.15,-4.23,-2.1,WZ1-.14]){
  for(const x of [WX0+.14,WX1-.14]){
   beam([x,DECK,z],[x,EY+.01,z],.179,.18,pick(structural),WOOD,.009);
   const inward=x<RIDGE?1:-1;
   beam([x,EY-.75,z],[x+inward*.77,EY-.09,z],.125,.148,'#8f7a5e',WOOD,.007)
  }
  beam([WX0+.05,EY-.09,z],[WX1-.05,EY-.09,z],.178,.196,pick(structural),WOOD,.008);
  beam([RIDGE,EY+.01,z],[RIDGE,RY-.09,z],.116,.129,'#8b775b',WOOD,.006);
  for(const side of [-1,1]){
   beam([RIDGE+side*1.14,EY+.013,z],[RIDGE+side*.08,RY-.26,z],.081,.11,'#948067',WOOD,.006);
   const bx=RIDGE+side*3.26;
   cyl([bx,EY-.085,z-.096],[bx,EY-.085,z+.103],.029,'#5d6257',IRON,8)
  }
 }
 for(let j=0;j<12;j++){
  const z=mix(WZ0-.23,WZ1+.28,j/11);
  for(const side of [-1,1]){
   const x=RIDGE+side*((WX1-WX0)*.5+.43),end=roofY(x);
   beam([RIDGE,RY-.067,z],[x,end-.067,z],.087,.136,'#8b7962',WOOD,.006)
  }
 }
 // Underside sheathing reads from inside, and rusty folded metal reads above.
 const za=WZ0-.41,zb=WZ1+.47,over=(WX1-WX0)/2+.42;
 for(const side of [-1,1]){
  const end=RIDGE+over*side;
  for(let j=0;j<17;j++){
   const t=(j+.5)/17,x=RIDGE+side*over*t;
   beam([x,roofY(x)+.009,za],[x,roofY(x)+.009,zb],over/17*1.106-.003,.066,pick(['#82715a','#8c795e','#9b876b','#88755c']),WOOD,.003,-side*Math.atan((RY-EY)/((WX1-WX0)*.5)))
  }
  const nSheet=9,w=(zb-za)/nSheet,fac=side;
  for(let j=0;j<nSheet;j++){
   const col=pick(['#8c5348','#9f6050','#865149','#a06452','#97594d','#995c4f']);
   const steps=32,id=mesh.v.length/13;
   for(let k=0;k<=steps;k++){
    const t=k/steps,z=za+(j+t)*w,phase=t*TAU*8,off=.018*Math.cos(phase)+.104;
    const slope=-(RY-EY)/((WX1-WX0)/2)*side,nn=norm([-slope,1,.018*Math.sin(phase)*TAU*8/w]);
    for(const [i,x] of [RIDGE,end].entries()){
     mesh.vertex([x,roofY(x)+off,z],nn,[i*over*1.11,z],col,ROOF);
    }
    if(k){const m=id+k*2;mesh.i.push(m-2,m-1,m+1,m-2,m+1,m)}
   }
   for(const u of [.2,.68,.96]){
    const x=mix(RIDGE,end,u),z=za+(j+.5)*w;
    cyl([x,roofY(x)+.119,z],[x,roofY(x)+.133,z],.019,'#8b8370',IRON,7)
   }
  }
  beam([end,roofY(end)-.008,za-.012],[end,roofY(end)-.008,zb+.01],.114,.175,'#92917b',PAINT,.006);
  for(const z of [za-.021,zb+.021])beam([RIDGE,RY+.015,z],[end,roofY(end)+.015,z],.106,.18,'#c3bba0',PAINT,.008)
 }
 // Bent ridge flashing with folded edges.
 const ra=[RIDGE-.15,roofY(RIDGE-.15)+.138],rb=[RIDGE,RY+.156],rc=[RIDGE+.15,roofY(RIDGE+.15)+.138];
 for(const [p,q] of [[ra,rb],[rb,rc]])quad([p[0],p[1],za-.03],[p[0],p[1],zb+.03],[q[0],q[1],zb+.03],[q[0],q[1],za-.03],'#8c5c50',ROOF,null,norm([p===ra?-.46:.46,1,0]));
 // Hand-lettered sign in its own painted frame.
 const sc=[RIDGE,5.63,WZ1+.139],sw=3.82,sh=.76;
 box(sc,[sw,sh,.091],'#345e59',PAINT,0,.016);
 for(const yy of [-1,1])beam([sc[0]-sw/2,sc[1]+yy*(sh/2-.022),sc[2]+.054],[sc[0]+sw/2,sc[1]+yy*(sh/2-.022),sc[2]+.054],.027,.041,'#acaa88',PAINT,.003);
 sign('TERN INLET',vadd(sc,[0,.066,.050]),X,Y,3.26,.40,{ink:'#eee3c0',family:'Georgia',tracking:.11,bold:true});
 sign('B O A T W O R K S',vadd(sc,[0,-.216,.051]),X,Y,1.65,.132,{ink:'#ded4a9',bold:true});
 for(const dx of [-1,1])for(const dy of [-1,1])cyl(vadd(sc,[dx*1.81,dy*.26,.046]),vadd(sc,[dx*1.81,dy*.26,.062]),.021,'#858674',IRON,7);
 // Round louver at the gable peak, cut into a painted timber surround.
 const vc=[RIDGE,6.45,WZ1+.104];
 cyl(vadd(vc,[0,0,-.013]),vadd(vc,[0,0,.030]),.263,'#4a5047',WOOD,26);
 ringTube(vadd(vc,[0,0,.043]),X,Y,.266,.266,.035,'#bcb59a',PAINT);
 for(let i=-2;i<=2;i++){const y=i*.072,r=Math.sqrt(.234**2-y*y);
  beam([vc[0]-r,vc[1]+y,vc[2]+.043],[vc[0]+r,vc[1]+y,vc[2]+.043],.045,.035,'#929280',PAINT,.003)
 }
 lifeRing([.06,3.12,WZ1+.179],X,Z,.91);
 // Galvanized half-round gutter and downpipe feeding the rain butt.
 const gx=WX1+.432,gy=roofY(gx)-.035;
 const pts=[];for(let i=0;i<=10;i++){const a=PI+i*PI/10;pts.push([gx+.080*Math.cos(a),gy+.080*Math.sin(a)])}
 for(let j=0;j<10;j++){
  const a=pts[j],b=pts[j+1];quad([a[0],a[1],za],[a[0],a[1],zb],[b[0],b[1],zb],[b[0],b[1],za],'#83938b',IRON)
 }
 for(const z of [-5.62,-4.0,-2.1,-.34])ringTube([gx,gy,z],X,Y,.085,.085,.010,'#61746e',IRON,PI,TAU,12);
 tube([[gx,gy-.047,-.62],[gx,gy-.28,-.62],[WX1+.19,gy-.52,-.62],[WX1+.19,DECK+1.04,-.62],[WX1+.37,DECK+.91,-.62]],.054,'#899990',IRON,12);
 // Stove stack with flashing, slip joints and cowl.
 const cx=WX0+1.33,cz=WZ0+.88,stack=roofY(cx);
 box([cx,stack+.1,cz],[.57,.07,.56],'#645d53',IRON);
 cyl([cx,DECK+.88,cz],[cx,stack+.99,cz],.102,'#4f5651',IRON,14);
 for(const y of [DECK+1.86,EY-.14,stack+.2,stack+.77])cyl([cx,y-.024,cz],[cx,y+.024,cz],.115,'#686b5f',IRON,14);
 cyl([cx,stack+.94,cz],[cx,stack+1.10,cz],.196,'#61675e',IRON,15,.027);
}

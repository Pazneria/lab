'use strict';
function alembic(x,y,z){
 group(x,y,z,0,()=>{
  const copper=0xb27e54,patina=0x6f8878;
  for(let i=0;i<3;i++){let a=TAU*i/3;beam([Math.cos(a)*.238,.011,Math.sin(a)*.238],[Math.cos(a)*.183,.17,Math.sin(a)*.183],.035,.042,C.iron,M.metal)}
  hoop(0,.153,0,.195,.019,C.iron);
  profile(0,.144,0,[[.097,0],[.159,.023],[.212,.076],[.237,.163],[.229,.238],[.206,.296],[.177,.320],[.183,.337],[.19,.346],[.184,.370],[.125,.396],[.108,.421],[.108,.459]],copper,M.metal,32);
  profile(0,.59,0,[[.125,0],[.14,.025],[.148,.056],[.154,.083],[.126,.131],[.067,.164],[.038,.202],[.027,.22]],0xc19365,M.metal,28);
  for(const [h,r] of [[.20,.189],[.453,.195],[.489,.188],[.607,.134]])hoop(0,h,0,r,.010,h===.453?patina:0x94744f);
  const curve=[[-.005,.806,0],[.014,.849,0],[.060,.878,0],[.106,.884,0],[.170,.863,0],[.226,.815,0],[.291,.739,0],[.37,.65,0],[.455,.576,0],[.51,.548,0],[.552,.53,0],[.59,.497,0],[.594,.403,0]];
  pathTube(curve,.021,0xb18a61,M.metal,12);
  for(const [xx,yy] of [[.225,.816],[.290,.741],[.455,.576]])group(xx,yy,0,0,()=>rod([0,-.011,0],[0,.011,0],.029,.029,0x8d8461,M.metal,12),0,-.79);
  bottle(.592,0,0,.137,.402,0x738c7b,1,-1);
  // Fuel cup under the tripod, brass stopcock and a soldered maker's badge.
  profile(0,.003,0,[[.067,0],[.072,.03],[.068,.064],[.036,.075]],0x96805c,M.metal,16);ball(0,.10,0,.019,.029,.019,0xffce7e,M.light,10,6);
  rod([.128,.30,.15],[.218,.30,.23],.015,.017,C.brass,M.metal,10);rod([.204,.288,.219],[.204,.360,.219],.012,.012,C.brass,M.metal,8);
  rod([.171,.36,.22],[.236,.36,.22],.010,.010,0x696e57,M.metal,8);
  curvedLabel(0,.296,0,.239,.19,.094,14)
 })
}
function lunarStand(x,y,z){
 group(x,y,z,0,()=>{
  profile(0,0,0,[[.235,0],[.25,.020],[.25,.031],[.222,.047],[.208,.061],[.200,.074],[.169,.080]],0x786d53,M.metal,36);
  profile(0,.079,0,[[.163,0],[.156,.014],[.111,.027],[.091,.039],[.051,.054],[.045,.122],[.071,.14],[.097,.15]],C.brass,M.metal,28);
  hoop(0,.079,0,.186,.006,0xd1b780,M.metal,40);
  for(let i=0;i<24;i++){const a=TAU*i/24;rod([.172*Math.cos(a),.081,.172*Math.sin(a)],[.194*Math.cos(a),.081,.194*Math.sin(a)],.002,.002,0x574f3e,M.metal,5)}
  // Offset pair of calibrated arcs with a truly unsupported fruit at their focus.
  for(let j=0;j<2;j++){
   group(0,.435,0,j*.91-.42,()=>{
    pathTube(Array.from({length:33},(_,i)=>{const a=(-.28+1.53*i/32)*PI;return [.253*Math.cos(a),.318*Math.sin(a),0]}),j===0?.009:.006,0xb6a06a,M.metal,7);
    for(let i=0;i<13;i++){const a=(-.24+i*.106)*PI;rod([.248*Math.cos(a),.314*Math.sin(a),0],[.261*Math.cos(a),.326*Math.sin(a),0],.0025,.0025,C.brass,M.metal,5)}
   },j===0?.19:-.31,0)
  }
  group(.009,.349,-.003,-.27,()=>quince(0,0,0,.099,0xa9d4b1,true),.07,-.22);
  for(const s of [-1,1]){rod([s*.198,.055,0],[s*.235,.286,0],.013,.009,C.brass,M.metal,9);ball(s*.235,.29,0,.024,.024,.024,0xd6c897,M.pot,10,5)}
 })
}
function inkStation(x,y,z){
 bottle(x,y,z,.049,.105,0x383c39,2,-1);
 const b=[x+.009,y+.08,z],t=[x+.080,y+.337,z-.051];
 rod(b,t,.0033,.0019,0xaf9574,M.wood,6);
 for(let i=0;i<17;i++){const u=i/17,q=V.mix(b,t,.34+u*.61),f=Math.sin(PI*u);
  for(const s of [-1,1])lance(q,[q[0]+s*.024*f+.005,q[1]+.034,q[2]+s*.006],.0093,0xbfc0a6)}
}
function workSurface(){
 group(-1.13,0,-4.03,0,()=>{
  const top=.905;woodTable(0,0,0,3.69,.987,top,0x8b6949);
  for(let i=0;i<3;i++)drawer((i-1)*1.12,.737,.425,1.024,.161,0x785a41,true);
  box(0,.323,0,3.46,.050,.67,0x7d6147);basket(-1.23,.35,.03,.225,.235);vessel(-.70,.35,.07,.164,.268,0x849689,'jar');
  for(let i=0;i<3;i++)group(.70+i*.12,.36,0,0,()=>book(0,0,0,.111,.324+(i%2)*.045,.268,pick(bookCols)),0,0);
  closedBook(.20,.351,0,.367,.27,.065,0x6b7160);closedBook(.222,.416,.005,.320,.266,.053,0x775348);
  vessel(1.40,.351,0,.16,.28,0xab9271,'jug');
  // A replaceable heat tile under the copper still and a well-used writing mat.
  box(-1.18,top+.014,-.018,.95,.029,.69,0x69716a,M.stone,.019);alembic(-1.45,top+.030,-.055);
  group(-.14,top+.002,.116,.075,()=>{
   box(0,.006,0,.78,.011,.50,0x65786c,M.linen,.010);
   for(const s of [-1,1])box(s*.369,.013,0,.005,.002,.454,0xa29e7c,M.linen,0);
   group(-.108,.015,.011,-.12,()=>openBook(0,0,0,1.06));inkStation(.259,.014,-.097)
  });
  lunarStand(.829,top,-.03);
  group(1.47,top,-.14,-.09,()=>{closedBook(0,0,0,.375,.281,.062,0x6a5451,24);closedBook(-.024,.063,-.014,.332,.248,.047,0x727a63,26);
   bottle(.031,.111,-.005,.067,.199,0x769389,0,15)});
  scroll(1.46,top+.040,.264,.399,-.025);
  for(const [xx,zz,r,h,k,l] of [[-.88,-.28,.054,.15,1,-1],[-.700,-.31,.063,.255,0,9],[-.516,-.30,.055,.174,3,-1],[.38,-.29,.05,.163,0,-1]])bottle(xx,top,zz,r,h,pick(liquids),k,l);
  // Brass measuring dividers set beside the manuscript.
  for(const s of [-1,1])rod([.393,top+.012,.20],[.447+s*.046,top+.011,.351],.007,.002,C.brass,M.metal,6);
  ball(.392,top+.013,.198,.013,.009,.013,C.brass,M.metal,8,5);
 });
 // Bracketed botanical cards flank the north casement.
 group(-2.91,1.88,-4.60,-.022,()=>wallArt(0,0,0,.66,.71,21));
 group(.065,1.93,-4.597,0,()=>wallArt(0,0,0,.644,.44,18));
 group(-1.34,1.36,-4.55,0,()=>{box(0,0,0,1.99,.085,.272,C.oak);bottle(-.68,.045,.03,.047,.189,0x687f70,0,-1);vessel(.721,.044,0,.075,.102,0x91a296,'bowl')});
}
function shelfBooks(x,y,z,count,maxW,baseH){
 let u=x;for(let i=0;i<count;i++){const w=between(maxW*.60,maxW),h=baseH*between(.79,1.15),d=between(.154,.210);
  group(u+w/2,y,z+between(-.012,.012),0,()=>book(0,0,0,w,h,d,pick(bookCols)),0,i===count-1?-.07:0);u+=w+.007}
}
function longShelves(){
 group(-3.56,0,-2.24,PI/2,()=>{
  const w=3.29,depth=.47;box(0,1.15,.032,w,2.3,.076,0x71654f);
  for(let i=0;i<16;i++)box((i-7.5)*w/16,1.16,.085,w/16-.006,2.26,.034,tint(0x796b52,between(.92,1.05)),M.wood,.003);
  for(const s of [-1,1]){box(s*(w/2-.04),1.2,.241,.081,2.41,depth,C.oak);box(s*(w/2-.04),1.22,.475,.119,2.44,.070,0x8f6f4e)}
  const levels=[.13,.63,1.116,1.619,2.174];
  for(const yy of levels){box(0,yy,.246,w+.035,.073,.52,0x926f4d,M.wood,.010);box(0,yy-.041,.49,w+.064,.047,.036,0x795f43,M.wood,.006);
   for(let x of [-1.46,0,1.46])beam([x,yy-.178,.10],[x,yy-.039,.41],.053,.050,C.dark)}
  box(0,2.395,.207,w+.145,.114,.54,0x6b543e);box(0,2.456,.202,w+.215,.039,.59,0x947750);
  // Each bay holds a different household task. Leave air between groups.
  const on=i=>levels[i]+.037;
  basket(-1.12,on(0),.26,.208,.227);vessel(-.56,on(0),.24,.138,.311,0x83927a,'jar');
  shelfBooks(-.22,on(0),.29,5,.084,.325);
  closedBook(.634,on(0),.28,.402,.30,.069,0x7c5946);closedBook(.613,on(0)+.069,.27,.371,.273,.053,0x596e66);
  vessel(1.205,on(0),.27,.141,.264,0xb09370,'jug');
  shelfBooks(-1.46,on(1),.275,7,.090,.345);
  for(let i=0;i<4;i++)bottle(-.602+i*.258,on(1),.292,.093+(i%2)*.009,.257+((i+1)%3)*.043,liquids[i],2,6+i);
  for(let i=0;i<3;i++){let yy=on(1)+i*.055;closedBook(.696+(i%2)*.028,yy,.275,.362-i*.012,.25,.055,bookCols[i+1],22+i)}
  vessel(1.227,on(1),.258,.122,.249,0x889c96,'bowl');
  for(let i=0;i<5;i++){const xx=-1.39+i*.254;const back=i%2!==0;
   bottle(xx,on(2),back?.242:.321,.084,.25+(i%3)*.042,pick(liquids),[0,2,1,0,2][i],6+i)}
  vessel(.018,on(2),.28,.102,.245,0xb9baa0,'jar');shelfBooks(.267,on(2),.285,6,.071,.335);
  for(let i=0;i<3;i++)scroll(1.18,on(2)+.045+(i===2?.067:0),.257+(i===1?.075:0),.375,.04*i);
  vessel(-1.347,on(3),.253,.125,.295,0x7c9990,'jug');vessel(-1.028,on(3),.293,.104,.203,0xd0c3a1,'jar');
  for(let i=0;i<5;i++)bottle(-.703+i*.224,on(3),.281+(i%2)*.054,.076,.295+(i%3)*.051,liquids[7-i],i%4,11+i);
  group(.672,on(3),.264,.1,()=>{bottle(0,0,0,.126,.377,0x8d7350,1,-1)});
  clayPlant(1.219,on(3),.27,.116,.138,'trail',.62,0xac8a69);
  for(let i=0;i<3;i++)vessel(-1.11+i*.284,on(4),.25,.104,.149+(i%2)*.027,pick(ware),'bowl');
  for(let i=0;i<3;i++)scroll(.215,on(4)+.046+(i===2?.066:0),.25+(i===1?.072:0),.506,.03);
  baseMass(0,1.19,.24,w,2.38,.5,.74)
 })
}
function cabinet(){
 group(1.93,0,-4.64,0,()=>{
  const w=2.13;box(0,.077,.27,w+.12,.154,.65,C.dark);box(0,.607,.268,w,1.075,.56,0x6a7465);
  for(let j=0;j<4;j++)for(let i=0;i<5;i++)drawer((i-2)*.394,.247+j*.233,.563,.367,.203,tint(0x75836d,between(.91,1.05)),true);
  box(0,1.144,.29,w+.13,.089,.666,C.edge);
  box(0,1.675,.06,w,1.02,.073,0x786f59);for(const xx of [-1.028,.18,1.028])box(xx,1.69,.194,.068,1.12,.35,0x79654c);
  box(-.43,1.664,.20,1.20,.051,.34,C.edge);box(0,2.22,.206,w+.09,.085,.45,C.oak);box(0,2.281,.206,w+.15,.041,.49,C.edge);
  for(let i=0;i<4;i++)bottle(-.868+i*.266,1.192,.245,.080,.218+(i%2)*.048,liquids[i+2],2,13+i);
  for(let i=0;i<3;i++)vessel(-.855+i*.355,1.69,.211,.118,.233+(i%2)*.051,[0xb3b7a0,0x9c8770,0x829387][i],'jar');
  lamp(.625,1.194,.275,1.19);wallArt(.622,1.890,.110,.546,.29,5);
  basket(-.59,2.302,.20,.18,.182);vessel(.792,2.302,.2,.117,.205,0xa79575,'bowl');
  baseMass(0,.72,.28,w,1.44,.62,.67)
 })
}
function stillroom(){
 workSurface();longShelves();cabinet();
 // A moon calendar hung over the threshold, made of hammered discs and wire.
 group(.63,2.65,-.178,0,()=>{
  const path=Array.from({length:17},(_,i)=>{let t=i/16;return [-1.35+t*2.70,-.045-.245*Math.sin(t*PI),0]});pathTube(path,.005,C.brass,M.metal,6);
  for(let i=0;i<7;i++){const x=(i-3)*.337,yy=-.04-.245*Math.sin((x+1.35)/2.70*PI);rod([x,yy,0],[x,yy-.079,0],.003,.003,C.brass,M.metal,6);
   if(i===3)ball(x,yy-.151,0,.076,.076,.010,0xc7b681,M.metal,24,10);
   else{const s=i<3?-1:1,q=.049+(3-Math.abs(i-3))*.008;
    for(let k=0;k<14;k++){const a=-PI/2+k*PI/14,b=a+PI/14;const v=(t,inner)=>[x+s*Math.cos(t)*q*(inner?.43:1),yy-.131+q*Math.sin(t),.001];poly([v(a,false),v(b,false),v(b,true),v(a,true)],0xb5a072,M.metal)}}
  }
 });
 for(let i=0;i<4;i++){const x=-2.83+i*.242,y=2.36+Math.sin(i)*.046,z=-.30;rod([x,2.62,z],[x,y,z],.004,.004,C.brass,M.linen,5);dried(x,y,z,.81+i*.052)}
 // Extra peg rail, apron and a copper ladle on the kitchen face of the jamb.
 group(2.98,1.58,.131,0,()=>{box(0,0,0,.621,.087,.042,C.oak);for(let j=0;j<3;j++)rod([-.208+j*.208,0,.013],[-.208+j*.208,.024,.089],.014,.012,C.brass,M.metal,7);
  towel(-.15,-.045,.079,.225,.025,.56,0xb4a68c);dried(.19,.007,.078,.63)})
}

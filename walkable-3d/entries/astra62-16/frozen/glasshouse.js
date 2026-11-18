'use strict';
function wateringCan(x,y,z,s=1){
 group(x,y,z,-.24,()=>{
  const body=0x728d85,edge=0x8ea399;
  latheScaled(0,0,0,[[.81,0],[.97,.035],[1,.12],[.93,.76],[.80,.89],[.59,1],[.34,.98]],.158*s,.236*s,body,M.metal,24);
  hoop(0,.037*s,0,.155*s,.006*s,edge);hoop(0,.172*s,0,.146*s,.006*s,edge);
  rod([.094*s,.085*s,0],[.340*s,.271*s,0],.048*s,.015*s,body,M.metal,16);
  rod([.33*s,.262*s,0],[.372*s,.301*s,0],.014*s,.045*s,edge,M.metal,16);
  pathTube(Array.from({length:19},(_,i)=>{const a=PI*i/18;return [-s*(.100+.154*Math.sin(a)),s*(.155+.100*Math.cos(a)),0]}),.015*s,body,M.metal,8);
  pathTube(Array.from({length:19},(_,i)=>{const a=PI*i/18;return [.09*s*Math.cos(a),s*(.202+.135*Math.sin(a)),0]}),.011*s,edge,M.metal,8);
 })
}
function slattedBench(x,z,w,d,h){
 group(x,0,z,0,()=>{
  for(const s of [-1,1])for(const t of [-1,1]){const xx=s*(w/2-.053),zz=t*(d/2-.074);
   box(xx,h/2,zz,.070,h,.071,0x778777);box(xx,.048,zz,.083,.096,.084,0x7d7b67,M.metal)}
  for(const s of [-1,1]){box(s*(w/2-.037),h-.064,0,.065,.12,d,0x708171);box(s*(w/2-.052),.22,0,.050,.067,d-.08,0x748471)}
  const n=Math.ceil(d/.137);for(let i=0;i<n;i++)box(0,h-.023,(i+.5)*d/n-d/2,w,.046,d/n-.008,pick([0x9d8966,0x9d906e,0xa49876,0x918664]),M.wood,.006);
  const n2=Math.ceil(w/.18);for(let i=0;i<n2;i++)box((i+.5)*w/n2-w/2,.205,0,w/n2-.024,.038,d-.11,0x8d8568,M.wood,.005);
  baseMass(0,h/2,0,w,h,d,.41)
 })
}
function starterTray(x,y,z,w,d){
 group(x,y,z,0,()=>{
  box(0,.041,0,w,.069,d,0x8a7458);box(0,.074,0,w-.023,.013,d-.024,0x564b37,M.soil,0);
  for(const s of [-1,1]){box(s*w/2,.064,0,.02,.114,d,0x927c5a);box(0,.064,s*d/2,w+.024,.114,.022,0xa18c65)}
  for(let i=0;i<3;i++)for(let j=0;j<4;j++){
   const xx=(i-1)*w/3.5,zz=(j-1.5)*d/4.5;rod([xx,.081,zz],[xx+.004,.128,zz],.003,.002,0x819365,M.leaf,5);
   for(const s of [-1,1])blade([xx,.119,zz],s*1.45+i,.054,.024,.039,.008,0x90a26c,2)
  }
 })
}
function nightLily(x,y,z,s){
 for(let i=0;i<9;i++){const a=i*2.399;blade([x,y,z],a,between(.17,.33)*s,between(.3,.44)*s,.106*s,.13*s,pick([0x687f70,0x7b927b,0x829783]),1)}
 for(let j=0;j<2;j++){
  const a=j*2.9+.5,b=[x,y,z],p=[x+Math.cos(a)*s*.116,y+s*(.53+j*.095),z+Math.sin(a)*s*.116],e=V.add(p,[s*.046,.054*s,.023*s]);
  pathTube([b,V.mix(b,p,.48),p,e],.007*s,0x798978,M.leaf,7);
  group(...e,a,()=>{
   for(let k=0;k<7;k++){const dir=TAU*k/7,r=.094*s;const pt=(t,v)=>{
    const q=(.22+.81*t)*r,wide=.38*r*Math.sin(t*PI)*v;return [Math.cos(dir)*q-Math.sin(dir)*wide,.102*s*Math.sin(t*PI*.81)-.045*s*t+Math.abs(v)*.011*s,Math.sin(dir)*q+Math.cos(dir)*wide]};
    for(let jj=0;jj<6;jj++){const l=jj/6,u=(jj+1)/6;for(const sign of [-1,1])poly([pt(l,0),pt(u,0),pt(u,sign),pt(l,sign)],[0xbfb5bc,0xe3d4cf,0xc4b7c2,0xb5a6b4],M.pot)}
   }
   for(let k=0;k<6;k++){const aa=k*TAU/6,e=[Math.cos(aa)*.024*s,.081*s,Math.sin(aa)*.024*s];rod([0,0,0],e,.002*s,.002*s,0xbdad77,M.pot,5);ball(...e,.005*s,.011*s,.005*s,0xd3c08a,M.pot,7,4)}
  },.18)
 }
}
function glassroomContents(){
 // A narrow work aisle separates the planted benches from the old cottage wall.
 slattedBench(5.70,-1.18,.805,4.35,.76);
 const y=.76;
 clayPlant(5.72,y,-3.04,.161,.192,'bells',.93,0x9a755e);
 clayPlant(5.65,y,-2.35,.176,.192,'fern',.99,0xc0b69b);
 clayPlant(5.78,y,-1.60,.130,.171,'aloe',.87,0xa47d62);
 vessel(5.64,y,-.93,.168,.216,0x8c9b88,'pot');profile(5.64,y+.2,-.93,[[.14,0],[.14,.003]],0x5f503c,M.soil,16);nightLily(5.64,y+.2,-.93,1.04);
 clayPlant(5.76,y,-.18,.145,.188,'herb',.84,0xb08c70);starterTray(5.66,y,.579,.49,.55);
 for(const [z,cell] of [[-2.37,20],[-.87,30],[.57,31]])group(5.369,y,z,-PI/2,()=>plantLabel(0,0,0,cell));
 for(let i=0;i<4;i++){let z=-2.83+i*.24;vessel(5.66,.225,z,.103,.148,0xa97f62,'pot');if(i%2===0)vessel(5.66,.283,z,.098,.142,0xb18a69,'pot')}
 basket(5.72,.229,-1.06,.192,.154);wateringCan(5.69,.231,.13,.99);
 // North-end propagation desk with seed envelopes, scoops and a bell jar.
 group(4.73,0,-4.239,0,()=>{
  woodTable(0,0,0,2.21,.667,.872,0x96815f);
  clayPlant(-.795,.874,-.016,.137,.176,'herb',.69,0xa08366);
  box(-.03,.89,.038,.54,.034,.395,0x7a8069,M.stone,.015);
  profile(-.04,.91,.038,[[.195,0],[.191,.032],[.181,.255],[.160,.344],[.113,.404],[.062,.434],[.029,.442]],0xc9ddcf,M.glass,28,{cap:false});
  hoop(-.04,.917,.038,.195,.007,0xa89975);ball(-.04,1.386,.038,.030,.039,.030,0xa8bdae,M.glass,14,8);
  clayPlant(-.04,.908,.038,.058,.071,'aloe',.36,0xb39170);
  for(let i=0;i<3;i++)group(.562+i*.037,.875+i*.004,.16+i*.006,i*.13-.07,()=>{
   box(0,.002,0,.17,.004,.116,0xd3be94,M.paper,.001);group(0,.005,0,0,()=>panel(0,0,0,.15,.099,31),-PI/2)});
  vessel(.763,.873,-.069,.084,.151,0x7c9589,'jar');for(let i=0;i<3;i++)rod([.746+i*.014,1.0,-.069],[.718+i*.047,1.147+i*.015,-.052],.005,.005,C.edge,M.wood,7);
  group(.355,.887,.071,.62,()=>{box(0,.014,.051,.028,.025,.106,C.oak);ball(0,.013,-.047,.037,.015,.063,0x8c9489,M.metal,12,6)});
  basket(-.668,.011,0,.219,.262);vessel(.66,.009,0,.169,.316,0x9b7963,'jug')
 });
 // Dwarf quince in a coopered tub and a potting stool at the southern light.
 group(5.46,0,2.05,-.08,()=>{
  profile(0,0,0,[[.266,0],[.294,.037],[.349,.379],[.366,.458],[.367,.50],[.326,.502],[.321,.466]],0x8b7657,M.wood,20,{flat:true});
  for(const [h,r] of [[.078,.301],[.372,.349],[.483,.367]])ringBand(0,h,0,r+.003,.023,0x70786b,M.metal,20);
  profile(0,.466,0,[[.326,0],[.325,.004]],0x534939,M.soil,20);orchardTree(0,.469,0,.97);baseMass(0,.50,0,.74,1.0,.74,.51);
 });
 group(4.23,0,2.466,.18,()=>{
  woodTable(0,0,0,.65,.48,.47,0x87937c);wateringCan(-.059,.471,0,1.05);
 });
 // One trailing basket at the outer rafters; a small row of hooks below the sill.
 group(5.78,1.67,-1.88,0,()=>{
  basket(0,0,0,.144,.120,0xa2916b);trail(0,.112,0,.75);
  for(let i=0;i<3;i++){const a=TAU*i/3;rod([.14*Math.cos(a),.10,.14*Math.sin(a)],[0,.504,0],.004,.004,0x7f795c,M.linen,5)}rod([0,.50,0],[0,.75,0],.005,.005,C.iron,M.metal,6)
 });
 group(3.519,1.32,-.93,PI/2,()=>{box(0,0,0,.38,.059,.048,0x778474);for(const s of [-1,1])pathTube([[s*.117,-.007,.013],[s*.117,-.041,.044],[s*.117,-.029,.061]],.007,C.brass,M.metal,7);
  pathTube([[-.115,-.044,.05],[-.136,-.116,.073],[-.108,-.133,.074],[-.102,-.050,.056]],.003,0x82795e,M.linen,5);
  rod([-.117,-.133,.073],[-.117,-.321,.073],.020,.014,C.oak,M.wood,10);ball(-.117,-.378,.073,.045,.089,.016,0x838d81,M.metal,14,7)});
 for(const z of [-3.725,-1.81,.10,2.02])group(6.12,1.40,z,-PI/2,()=>{
  box(0,0,0,.084,.055,.021,0x929277,M.metal,.003);rod([-.015,.002,.025],[.056,.034,.033],.008,.009,C.brass,M.metal,7)
 });
}
function allGeometry(){
 surroundings();shell();glasshouse();kitchen();stillroom();glassroomContents();
 group(.44,1.50,5.364,PI,()=>wallArt(0,0,0,.57,.28,0));
 // Close the chain to the sloped ceiling above the kitchen pendant.
 rod([.29,3.416,2.56],[.29,4.27,2.56],.008,.008,C.iron,M.metal,7);
 // Two hearth tools on a rack beside the stone jamb.
 group(-3.51,0,.115,PI/2,()=>{
  box(0,1.09,.14,.28,.07,.07,0x5f5846);for(let i=0;i<2;i++){let xx=(i-.5)*.105;rod([xx,.37,.19],[xx,1.12,.19],.009,.009,C.iron,M.metal,8);
   ball(xx,1.127,.19,.017,.027,.017,C.brass,M.metal,8,5);if(i===0)ball(xx,.331,.19,.066,.081,.015,0x686759,M.metal,10,6);else rod([xx,.36,.19],[xx+.049,.319,.19],.010,.006,C.iron,M.metal,6)}
 })
}

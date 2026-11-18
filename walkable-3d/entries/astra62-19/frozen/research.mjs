import {M, TAU, add, sub, mul, mix, unit, box, solid, face, plane, rod, screw, tube, torus, beam, surface, patch, art, zone, light, obstacle, occlude, place, lathe, ellipsoid, range, tint, rand} from './geometry.mjs';
import {P} from './architecture.mjs';
import {picture, book, cushion} from './domestic.mjs';
const {blue,green,bone,hull,rubber,red,brass,iron,dark,wood,nickel,cream}=P;
function handle(x,y,z,w){
 for(let s of [-1,1])box([x+s*(w*.5-.010),y,z+.018],[.022,.029,.041],iron,M.METAL,.005);
 box([x,y,z+.041],[w,.023,.020],nickel,M.METAL,.005);
}
function microscope(p){
 place(p,.21,()=>{
  // Cast foot and rubber isolators support a separate stage and optical train.
  for(let x of [-.108,.108])for(let z of [-.110,.105])rod([x,0,z],[x,.016,z],.024,rubber,M.RUBBER,12);
  box([0,.044,0],[.305,.067,.305],'c2c8b7',M.PAINT,.030);
  occlude([0,.046,0],[.274,.052,.270]);
  box([0,.077,-.007],[.226,.017,.225],iron,M.PAINT,.007);
  rod([0,.084,.043],[0,.097,.043],.071,nickel,M.METAL,24);
  rod([0,.097,.043],[0,.102,.043],.056,'dce8d4',M.LAMP,24);
  const spine=[[0,.078,-.088],[0,.138,-.125],[0,.267,-.127],[0,.354,-.105],[0,.425,-.038],[0,.431,.028]];
  tube(spine,.043,'aab8aa',M.PAINT,16,[.06,.057,.048,.049,.05,.042]);
  beam([0,.2,-.11],[0,.201,.021],.048,.047,iron,M.METAL);
  box([0,.205,.023],[.253,.024,.187],'374747',M.PAINT,.008);
  box([0,.220,.049],[.111,.004,.050],'99bbb3',M.DARKGLASS,.002);
  ellipsoid([-.008,.223,.044],[.009,.001,.005],'986248',M.LIFE,14,6);
  for(let x of [-.07,.072])box([x,.224,.047],[.056,.005,.012],nickel,M.METAL,.002);
  rod([0,.401,.024],[0,.423,.024],.057,iron,M.METAL,24,.046);
  for(let [x,z,le] of [[0,.037,.077],[-.029,-.008,.051],[.029,-.008,.060]]){
   let a=[x,.404,.023+z],b=[x*1.37,.404-le,.023+z*1.18];
   rod(a,b,.016,'c4c6ac',M.METAL,14,.011);
   rod(mixVec(a,b,.57),mixVec(a,b,.69),.0158,red,M.PAINT,14,.014);
  }
  for(let s of [-1,1]){
   rod([s*.029,.27,-.113],[s*.082,.27,-.113],.046,rubber,M.RUBBER,18);
   rod([s*.078,.27,-.113],[s*.094,.27,-.113],.025,iron,M.METAL,16);
   const a=[s*.028,.43,.008],b=[s*.039,.515,-.049],c=[s*.042,.554,-.079];
   rod(a,b,.026,'647b72',M.PAINT,16);rod(b,c,.025,rubber,M.RUBBER,16);
   rod(c,add(c,[0,.008,-.006]),.029,iron,M.DARKGLASS,20);
  }
  occlude([0,.202,.011],[.246,.021,.181]);
 });
}
const mixVec=(a,b,t)=>a.map((v,i)=>mix(v,b[i],t));
function branchFan(p,scale,c){
 place(p,.10,()=>{
  function twig(start,angle,length,r,depth){
   const mid=add(start,[Math.sin(angle)*length*.47,Math.cos(angle)*length*.49,range(-.009,.009)*scale]);
   const end=add(mid,[Math.sin(angle+.14)*length*.53,Math.cos(angle+.14)*length*.50,range(-.010,.010)*scale]);
   tube([start,mid,end],r,c,M.LIFE,7,[r,r*.76,r*.53]);
   if(depth<=0){ellipsoid(end,[r*.8,r*1.35,r*.76],'cd9978',M.LIFE,7,4);return;}
   twig(end,angle+range(-.36,.34),length*range(.62,.79),r*.64,depth-1);
   twig(mid,angle+(depth%2===0?-1:1)*range(.52,.91),length*range(.55,.72),r*.61,depth-1);
  }
  for(let k=-1;k<=1;k++)twig([0,0,0],k*.43,.093*scale,.0082*scale,3);
 });
}
function specimenDome(p){
 place(p,0,()=>{
  occlude([0,.019,0],[.216,.032,.216]);
  lathe([0,0,0],[[0,0],[.126,0],[.139,.006],[.139,.024],[.131,.032],[.121,.036],[0,.036]],'71634b',M.WOOD,32);
  torus([0,.030,0],[0,1,0],.129,.0046,brass,M.BRASS);
  ellipsoid([0,.050,0],[.079,.029,.057],'a7a38c',M.STONE,17,9);
  branchFan([0,.063,.002],.97,'ad5c4e');
  const fn=(u,v)=>{const a=u*TAU;const rr=v<.65?.117:.117*Math.cos((v-.65)/.35*Math.PI/2);const y=v<.65?.037+v/.65*.197:.234+.101*Math.sin((v-.65)/.35*Math.PI/2);return [rr*Math.cos(a),y,rr*Math.sin(a)];};
  patch(32,18,fn,'a8cfc3',M.JAR,(u,v)=>[u,v],true);
  ellipsoid([0,.344,0],[.017,.015,.017],'9abeb4',M.DARKGLASS,16,7);
  box([0,.021,.134],[.103,.025,.005],brass,M.BRASS,.002);
 });
}
function specimenBottle(p,sz,label){
 place(p,0,()=>{
  const [r,h]=sz;
  occlude([0,h*.40,0],[r*1.42,h*.69,r*1.42]);
  const profile=[[r*.82,0],[r,.008],[r,h*.77],[r*.93,h*.83],[r*.66,h*.89],[r*.65,h]];
  lathe([0,0,0],profile,'9abdb1',M.JAR,24);
  rod([0,.012,0],[0,h*.58,0],r*.88,'7b9581',M.DARKGLASS,22);
  for(let k=0;k<2;k++)ellipsoid([r*(k===0?.15:-.28),h*.29+k*.026,r*.24],[r*.29,h*.1,r*.20],k===0?'ba9168':'d4ae82',M.LIFE,14,8);
  rod([0,h*.981,0],[0,h+.032,0],r*.75,'445650',M.RUBBER,16);
  for(let i=0;i<3;i++)torus([0,h+.002+i*.009,0],[0,1,0],r*.746,.0016,iron,M.METAL,18,5);
  box([0,h*.49,r*.975],[r*1.43,h*.299,.002],cream,M.PAPER,.002);
  art(label,[0,h*.49,r*.975+.0014],[r*1.35,0,0],[0,h*.27,0]);
 });
}
function taskLamp(p){
 place(p,0,()=>{
  box([0,.015,0],[.212,.030,.156],dark,M.PAINT,.018);
  rod([0,.026,0],[0,.105,0],.033,brass,M.BRASS,12);
  let a=[0,.106,0],b=[-.178,.418,-.018],c=[.159,.547,.016];
  for(let s of [-1,1]){
   let o=[0,0,s*.015];
   beam(add(a,o),add(b,o),.018,.011,green,M.PAINT,.003);
   beam(add(b,o),add(c,o),.018,.011,green,M.PAINT,.003);
  }
  // Counterbalance springs and exposed hinge hardware.
  let spring=[];for(let i=0;i<=55;i++){let t=i/55;spring.push([-.013-.079*t+.008*Math.cos(t*TAU*10),.141+.177*t,.035+.006*Math.sin(t*TAU*10)]);}
  tube(spring,.0024,nickel,M.METAL,5);
  for(let q of [a,b,c]){
   rod(add(q,[0,0,-.033]),add(q,[0,0,.031]),.024,iron,M.METAL,14);
   screw(add(q,[0,0,.031]),[0,0,1],.012);
  }
  place(add(c,[.006,-.028,0]),[.17,0,-.22],()=>{
   lathe([0,0,0],[[.130,-.096],[.133,-.088],[.124,-.073],[.062,.009],[.039,.026],[.028,.033]],'678476',M.PAINT,30);
   rod([0,-.088,0],[0,-.086,0],.124,'f9df9f',M.LAMP,30);
   torus([0,-.091,0],[0,1,0],.130,.004,brass,M.BRASS,30,7);
  });
  light([.165,.403,.044],[1,.78,.43],.71,2.5,.12,[.08,-1,.18]);
 });
}
function wetBench(){
 place([-1.57,0,-4.625],0,()=>{
  // Cabinet pods leave seated legroom under the center of the continuous worktop.
  for(let x of [-1.025,1.032]){
   solid([x,.405,.433],[.958,.77,.69],'648178',M.PAINT,.025);
   box([x,.106,.443],[.97,.15,.713],dark,M.PAINT,.017);
   for(let j=0;j<3;j++){
    let y=.249+j*.213;
    box([x,y,.786],[.91,.196,.038],j===2?'94a99a':'80998d',M.PAINT,.009);
    handle(x-.18,y+.035,.806,.233);
    box([x+.265,y,.811],[.151,.067,.008],iron,M.METAL,.004);
    art(14,[x+.265,y,.816],[.129,0,0],[0,.050,0]);
   }
  }
  solid([0,.854,.446],[3.19,.107,.867],iron,M.PAINT,.017);
  box([0,.913,.446],[3.22,.045,.888],'adb5a3',M.METAL,.012,.082);
  box([0,1.013,.064],[3.22,.16,.093],'9ca99a',M.METAL,.013);
  box([0,.864,.894],[3.16,.043,.012],green,M.PAINT,.003);
  // Offset mat and ruled section notebook on the clear, resident-facing bench edge.
  box([-.412,.940,.448],[.976,.010,.569],'42675c',M.RUBBER,.008,.065);
  art(19,[-.412,.947,.448],[.947,0,0],[0,0,-.545]);
  microscope([-.475,.948,.413]);
  taskLamp([-1.045,.938,.217]);
  specimenDome([.47,.937,.360]);
  specimenBottle([.872,.936,.236],[.071,.228],11);
  specimenBottle([1.046,.936,.279],[.061,.171],11);
  place([.339,.940,.712],-.18,()=>{
   book([0,0,0],.319,.021,.191,'704d38');
   box([0,.022,0],[.303,.004,.184],cream,M.PAPER,.002);
   art(10,[0,.0249,0],[.296,0,0],[0,0,-.179]);
  });
  rod([.641,.943,.753],[.801,.943,.710],.0056,red,M.PAINT,8,.0045);
  rod([.801,.943,.710],[.817,.943,.706],.0052,wood,M.WOOD,8,.0008);
  // Specimen tray with a sculpted nautilus and dissection forceps.
  box([-1.253,.950,.653],[.46,.026,.283],'d7d3b9',M.CERAMIC,.012);
  for(let s of [-1,1]){
   box([-1.253+s*.225,.963,.653],[.016,.020,.282],bone,M.CERAMIC,.006);
   box([-1.253,.963,.653+s*.133],[.444,.02,.016],bone,M.CERAMIC,.006);
  }
  shell([ -1.299,.975,.660]);
  tube([[-1.171,.974,.584],[-1.093,.974,.678],[-1.067,.979,.731]],.005,nickel,M.METAL,7);
  tube([[-1.171,.974,.584],[-1.107,.974,.684],[-1.070,.979,.736]],.0045,nickel,M.METAL,7);
  // Tool board is drilled, raised from the bulkhead and held at its corners.
  box([-.704,1.623,.041],[1.59,1.029,.067],dark,M.METAL,.015);
  box([-.704,1.623,.081],[1.55,.992,.026],'9cae9e',M.PAINT,.007);
  art(20,[-.704,1.623,.095],[1.525,0,0],[0,.969,0]);
  for(let s of [-1,1])for(let t of [-1,1])screw([-.704+s*.744,1.623+t*.461,.096],[0,0,1],.014);
  let tx=-1.236;
  for(let i=0;i<3;i++){
   const x=tx+i*.132,h=1.69+(.03*i),len=[.315,.242,.292][i];
   rod([x,h,.131],[x,h-len,.131],.008,'aeb5a5',M.METAL,10);
   box([x,h+.054,.131],[.037,.128,.040],[red,dark,wood][i],M.PAINT,.012);
   torus([x,h+.127,.133],[0,0,1],.018,.0036,nickel,M.METAL,14,5);
  }
  // Folded sampling net hangs from a hook beside the instruments.
  torus([-.634,1.631,.126],[0,0,1],.109,.008,iron,M.METAL,28,7);
  rod([-.634,1.741,.126],[-.590,1.967,.126],.010,wood,M.WOOD,12);
  for(let i=-3;i<=3;i++){let x=i*.024,h=Math.sqrt(.103*.103-x*x);
   rod([-.634+x,1.631-h,.128],[-.634+x,1.631+h,.128],.0018,'798d7d',M.LINEN,5);
   rod([-.634-h,1.631+x,.128],[-.634+h,1.631+x,.128],.0018,'798d7d',M.LINEN,5);
  }
  place([-.25,1.672,.105],[0,0,-.05],()=>{
   plane([0,0,0],[.316,0,0],[0,.431,0],cream,M.PAPER);
   art(2,[0,0,.001],[.299,0,0],[0,.410,0]);
   box([0,.204,.003],[.087,.033,.006],'c7b98e',M.PAPER,.002);
  });
  // Sample ledger graphic and a shelf of labelled archival cases.
  art(21,[.756,1.927,.029],[1.236,0,0],[0,.277,0]);
  box([.810,1.508,.159],[1.47,.041,.281],green,M.PAINT,.012);
  for(let x of [.273,1.343])beam([x,1.345,.051],[x,1.488,.271],.024,.025,nickel,M.METAL,.004);
  for(let i=0;i<3;i++){
   let x=.356+i*.366;
   box([x,1.635,.148],[.326,.207,.231],['b5b59a','a3ab91','95a693'][i],M.PAINT,.013);
   box([x,1.734,.148],[.335,.033,.24],['adb499','aeb29a','a3ac95'][i],M.PAINT,.009);
   box([x,1.632,.267],[.147,.057,.006],cream,M.PAPER,.003);
   art(11,[x,1.632,.272],[.138,0,0],[0,.052,0]);
  }
 });
}
function shell(p){
 place(p,[.16,.46,.04],()=>{
  const path=[];const rad=[];
  for(let i=0;i<=56;i++){
   const t=i/56,a=t*TAU*1.76,r=.005+.069*t*t;
   path.push([r*Math.cos(a),.042+r*.58*Math.sin(a),.002+.020*t]);rad.push(.005+.032*t*t);
  }
  tube(path,.01,'cfac7c',M.CERAMIC,14,rad);
  for(let i=24;i<56;i+=4){let dir=unit(sub(path[i+1],path[i-1]));
   torus(path[i],dir,rad[i]*.98,.0026,'916f54',M.CERAMIC,16,6);
  }
 });
}
function stool(){
 place([-1.23,0,-3.265],.23,()=>{
  for(let j=0;j<4;j++){
   let a=(j+.5)*TAU/4,x=Math.cos(a),z=Math.sin(a);
   rod([x*.277,.018,z*.277],[x*.152,.553,z*.152],.015,iron,M.METAL,10,.017);
   rod([x*.277,.009,z*.277],[x*.269,.047,z*.269],.021,rubber,M.RUBBER,10);
  }
  torus([0,.226,0],[0,1,0],.224,.012,nickel,M.METAL,30,8);
  lathe([0,.535,0],[[.19,0],[.237,.015],[.239,.043],[.226,.054],[0,.057]],'a67e55',M.WOOD,32);
  cushion([0,.601,0],[.444,.057,.444],'789184',{exp:1,piping:true,sag:.007});
  obstacle([0,.28,0],[.51,.59,.51],'ellipse');occlude([0,.579,0],[.375,.072,.375]);
 });
}
function storage(){
 place([-3.255,0,-2.507],Math.PI/2,()=>{
  solid([0,.643,.214],[1.30,1.27,.406],dark,M.PAINT,.028);
  box([0,1.292,.218],[1.34,.054,.432],green,M.PAINT,.014);
  for(let col=0;col<2;col++)for(let row=0;row<4;row++){
   let x=-.318+col*.636,y=.242+row*.286;
   box([x,y,.428],[.605,.263,.031],'8b9c8c',M.PAINT,.009);
   box([x-.141,y+.018,.447],[.164,.079,.008],brass,M.BRASS,.005);
   art(14,[x-.141,y+.018,.452],[.144,0,0],[0,.064,0]);
   handle(x+.097,y+.028,.446,.140);
  }
  picture([0,1.942,.033],0,.946,.901,2,'697b6c');
 });
 place([3.25,0,-3.03],-Math.PI/2,()=>{
  // The utility panel contains a dial, toggle guards and service legends.
  box([0,1.48,.065],[.735,.89,.131],dark,M.PAINT,.027);
  box([0,1.48,.143],[.686,.837,.04],'8ca298',M.PAINT,.013);
  for(let x of [-.307,.307])for(let y of [1.107,1.857])screw([x,y,.165],[0,0,1],.013);
  gauge(-.142,1.639,.183,.113);
  art(22,[.137,1.657,.165],[.219,0,0],[0,.126,0]);
  for(let i=0;i<3;i++){
   let x=-.195+i*.19;
   box([x,1.324,.172],[.099,.14,.021],iron,M.PAINT,.008);
   rod([x,1.346,.182],[x,1.368,.235],.010,nickel,M.METAL,10,.015);
   art(14,[x,1.204,.165],[.137,0,0],[0,.045,0]);
  }
  for(let x of [-.19,.12]){tube([[x,1.056,.081],[x,.828,.081],[x,.78,.076],[x+.052,.746,.071],[x+.052,.19,.071]],.022,green,M.PAINT,12);}
  box([0,2.175,.03],[.729,.223,.04],green,M.PAINT,.012);art(23,[0,2.175,.051],[.67,0,0],[0,.181,0]);
 });
}
function gauge(x,y,z,r){
 rod([x,y,z],[x,y,z+.027],r,iron,M.METAL,30);
 rod([x,y,z+.025],[x,y,z+.031],r*.913,cream,M.CERAMIC,30);
 torus([x,y,z+.031],[0,0,1],r*.932,.007,brass,M.BRASS,30,7);
 art(13,[x,y,z+.032],[r*1.80,0,0],[0,r*1.8,0]);
}
function observationFurniture(){
 place([-3.118,0,-5.985],Math.PI/2,()=>{
  for(let x of [-.53,.53]){
   solid([x,.221,.259],[.071,.413,.369],green,M.PAINT,.014,false);
   box([x,.039,.262],[.192,.067,.432],iron,M.PAINT,.012);
  }
  solid([0,.444,.275],[1.60,.096,.521],wood,M.WOOD,.029);
  cushion([0,.532,.27],[1.537,.113,.495],'68877a',{exp:.26});
  box([0,.795,.079],[1.54,.311,.080],wood,M.WOOD,.023);
  art(24,[0,1.415,.039],[.74,0,0],[0,.232,0]);
 });
 place([3.14,0,-6.75],-Math.PI/2,()=>{
  box([0,1.41,.034],[.652,.423,.048],green,M.PAINT,.015);
  gauge(-.13,1.435,.080,.114);
  art(22,[.152,1.435,.059],[.232,0,0],[0,.177,0]);
  for(let x of [-.45,.45])rod([x,1.0,.01],[x,1.0,.119],.035,iron,M.METAL,12);
  tube([[-.50,1.0,.076],[-.5,1.0,.121],[-.466,1.0,.154],[.466,1.0,.154],[.50,1.0,.121],[.50,1.0,.076]],.022,'a5b3a8',M.METAL,14);
 });
 // Separate grab handles mounted beside the pressure flange.
 for(let s of [-1,1]){
  let x=s*2.992,z=-7.94;
  for(let y of [1.075,1.792])box([x,y,z],[.116,.098,.074],dark,M.PAINT,.012);
  tube([[x,1.075,z+.017],[x,1.075,z+.133],[x,1.11,z+.164],[x,1.751,z+.164],[x,1.792,z+.129],[x,1.792,z+.017]],.021,brass,M.BRASS,12);
 }
}
export function buildResearch(){zone('work');wetBench();stool();storage();zone('observation');observationFurniture();}


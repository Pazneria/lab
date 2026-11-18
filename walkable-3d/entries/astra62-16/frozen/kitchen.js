'use strict';
function taperedBlock(y0,y1,z0,depth0,depth1,w0,w1,col){
 const ring=(w,y,d)=>[[-w/2,y,z0],[w/2,y,z0],[w/2,y,z0+d],[-w/2,y,z0+d]];
 const a=ring(w0,y0,depth0),b=ring(w1,y1,depth1);
 for(let i=0;i<4;i++){let j=(i+1)%4;poly([a[j],b[j],b[i],a[i]],col,M.lime)}
 poly(b.reverse(),col,M.lime)
}
function hearth(){
 group(-3.62,0,1.17,PI/2,()=>{
  const stone=[0x9c9480,0xa79a82,0x8d8776,0xa19880];
  box(0,.084,.45,2.02,.168,1.06,0x857e6d,M.stone,.036);
  for(let j=0;j<6;j++)for(let i=0;i<5;i++){const c=pick([0x5f5042,0x675545,0x6c5949,0x574c42]);box((i-2)*.297+(j%2?.018:0),.247+j*.145,.074,.284,.137,.14,tint(c,.82+j*.022),M.stone,.012)}
  for(const s of [-1,1])for(let j=0;j<4;j++)box(s*.806,.265+j*.185,.445,.353,.18,.81,pick(stone),M.stone,.018);
  // Tapered voussoirs around the soot-dark arch opening.
  for(let j=0;j<11;j++){
   const a=j*PI/11+.005,b=(j+1)*PI/11-.005;
   const p=(t,outer,z)=>[Math.cos(t)*(outer?.99:.644),.89+Math.sin(t)*(outer?.59:.365),z];
   const front=[p(a,false,.854),p(a,true,.854),p(b,true,.854),p(b,false,.854)],back=front.map(v=>[v[0],v[1],.073]);const c=pick(stone);
   poly(front,c,M.stone);for(let k=0;k<4;k++)poly([front[k],back[k],back[(k+1)%4],front[(k+1)%4]],tint(c,.90),M.stone)
  }
  taperedBlock(1.43,2.48,0,.82,.36,1.99,.89,0xbeaa8b);taperedBlock(2.47,3.27,0,.36,.33,.89,.83,0xb8a78b);
  box(0,1.485,.411,2.05,.14,.91,0x73513a,M.wood,.025);box(0,1.413,.81,2.02,.048,.094,0x866648);
  for(let s of [-1,1])beam([s*.83,1.28,.54],[s*.83,1.43,.80],.15,.14,C.oak);
  // Blackened iron crane and suspended, seasoned pot.
  rod([-.57,1.14,.19],[-.57,1.14,.66],.020,.020,C.iron,M.metal);rod([-.57,1.14,.64],[-.08,1.14,.64],.019,.019,C.iron,M.metal);
  pathTube([[-.08,1.15,.64],[-.08,1.01,.64],[-.066,.986,.64],[-.044,1.002,.64]],.009,C.iron,M.metal,8);
  profile(-.06,.40,.63,[[.10,0],[.19,.03],[.248,.14],[.254,.25],[.216,.326],[.228,.346],[.224,.365],[.197,.36],[.19,.331]],0x464840,M.metal,28);
  profile(-.06,.704,.63,[[.199,0],[.198,.004]],0x624736,M.pot,24);
  pathTube(Array.from({length:23},(_,i)=>{let a=PI*i/22;return [-.06+.225*Math.cos(a),.73+.277*Math.sin(a),.63]}),.012,0x554d3f,M.metal,8);
  for(let i=0;i<6;i++){const x=(i-2.5)*.12;rod([x-.042,.222,.35],[x+.063,.266,.87],.064,.058,0x494037,M.wood,10)}
  for(let i=0;i<27;i++){const x=between(-.43,.36),z=between(.37,.88);ball(x,between(.21,.29),z,between(.024,.055),.018,between(.022,.047),pick([0xcc7038,0xf5ab56,0xcb6338,0x8d5239]),M.light,8,4)}
  for(let i=0;i<9;i++){const x=between(-.33,.22),z=between(.41,.84),h=between(.053,.122);
   latheScaled(x,.27,z,[[1,0],[.75,.34],[.47,.69],[.035,1]],.036,h,pick([0xffbc61,0xffa84e,0xe68d46]),M.light,7)}
  for(let j=0;j<3;j++)vessel(-.73+j*.20,1.558,.39,.077,.17+j%2*.047,pick(ware),'jar');
  group(.55,1.56,.42,.07,()=>{vessel(0,0,0,.114,.193,0x829487,'jug');dried(.018,.42,0,.70)});
  wallArt(0,1.91,.653,.30,.29,19,C.oak);
  baseMass(0,.69,.40,2.01,1.38,.91,.72)
 })
}
function towel(x,y,z,w,depth,fall,c=0xd5c8a6){
 const rows=11,cols=12,at=(i,j)=>{let u=i/cols,v=j/rows,fold=Math.cos(u*PI*6+.8*Math.sin(v*3))*.010;
  if(v<.48)return [x+(u-.5)*w,y+.006+fold*.24,z-depth+depth*v/.48];
  let a=(v-.48)/.52;return [x+(u-.5)*w+.008*Math.sin(a*4+u*2),y+.004-fall*a+.012*Math.sin(u*3*PI)*a**4,z+.016+fold+.012*Math.sin(a*3)]};
 for(let j=0;j<rows;j++)for(let i=0;i<cols;i++){const q=[at(i,j),at(i,j+1),at(i+1,j+1),at(i+1,j)];poly(q,[1,3,10].includes(i)?0x747e73:c,M.linen,null,[[i/cols,j/rows], [i/cols,(j+1)/rows],[(i+1)/cols,(j+1)/rows],[(i+1)/cols,j/rows]])}
}
function loaf(x,y,z){
 ball(x,y+.067,z,.232,.106,.132,0xb27c42,M.pot,24,12);
 for(let j=0;j<4;j++){let xx=x+(j-1.5)*.074;pathTube(Array.from({length:10},(_,i)=>{let t=i/9;let u=xx+(t-.5)*.045,v=z+(t-.5)*.145,yy=y+.068+.106*Math.sqrt(Math.max(0,1-((u-x)/.232)**2-((v-z)/.132)**2));return [u,yy+.001,v]}),.009,0xd6af77,M.pot,6)}
 for(let i=0;i<22;i++){const u=x+between(-.31,.31),v=z+between(-.19,.18);if(Math.abs(u-x)>.18||Math.abs(v-z)>.10)ball(u,y+.004,v,.003+rand()*.005,.004,.004,0xc1a274,M.paper,6,3)}
}
function prepBench(){
 group(-3.62,0,3.62,PI/2,()=>{
  const w=2.81,d=.82,top=.91;
  box(0,.09,.39,w-.09,.18,.70,0x575c4d);box(0,.48,.38,w-.03,.74,.71,0x718374);
  for(const s of [-1,1])box(s*(w/2-.044),.46,.40,.082,.90,.79,C.oak);
  for(let i=0;i<3;i++){let xx=(i-1)*.89;
   box(xx,.43,.756,.845,.62,.052,0x647968);box(xx,.42,.790,.704,.48,.025,0x536d60);
   for(let k=0;k<4;k++)box(xx+(k-1.5)*.166,.42,.807,.163,.449,.015,tint(0x728675,.93+.04*(k%2)),M.wood,.003);
   box(xx+.30,.596,.824,.055,.08,.019,C.brass,M.metal);ball(xx+.30,.596,.853,.024,.024,.019,C.brass,M.metal,10,6)}
  for(let i=0;i<3;i++)box(0,top-.041,(i+.5)*d/3,w,.082,d/3-.003,tint(0x9a7651,.95+i*.025),M.wood,.012);
  box(0,.966,.041,w,.112,.068,0x927052,M.wood,.009);
  // A freestanding heavy earthenware wash basin with a pump tap.
  vessel(-.84,top,.42,.295,.133,0xc6c6ad,'bowl');profile(-.84,top+.064,.42,[[.199,0],[.199,.001]],0x829f98,M.water,32);
  profile(-.83,top,.118,[[.065,0],[.064,.023],[.04,.033],[.038,.267],[.030,.29]],0x7f816a,M.metal,16);
  pathTube([[-.83,1.16,.12],[-.83,1.214,.12],[-.83,1.235,.16],[-.83,1.238,.264],[-.83,1.2,.30]],.022,C.brass,M.metal,12);
  rod([-.82,1.124,.125],[-.678,1.160,.125],.011,.012,C.brass,M.metal,8);ball(-.675,1.158,.124,.024,.016,.018,0x6b5c40,M.wood,10,5);
  towel(-.91,top+.005,.821,.29,.22,.315,0xd9d0b4);
  group(.065,top,.48,-.11,()=>{box(0,.015,0,.68,.031,.40,0xb18c60,M.wood,.022);box(.366,.015,0,.105,.031,.088,0xad875c,M.wood,.014);
   loaf(-.055,.034,-.014);
   group(.147,.045,.103,.17,()=>{poly([[-.113,.002,-.024],[.076,.002,-.024],[.076,.002,.008],[.022,.002,.024],[-.114,.002,.016]],0xbabcb0,M.metal);
    box(.129,.007,0,.109,.021,.036,C.dark,M.wood,.006);for(const x of [.098,.146])ball(x,.020,0,.004,.002,.004,C.brass,M.metal,6,3)})});
  vessel(.913,top,.24,.113,.274,0x7d968b,'jar');for(let i=0;i<4;i++){let a=[.88+i*.019,1.13,.24],b=[.82+i*.074,1.32+(i%2)*.061,.23+Math.cos(i)*.035];rod(a,b,.010,.010,C.edge,M.wood,7);ball(...b,.027,.042,.012,0xa18660,M.wood,10,6)}
  vessel(1.10,top,.57,.116,.125,0xa78969,'mortar',false);rod([1.09,1.01,.58],[1.20,1.149,.56],.024,.029,0x978d78,M.stone,12);
  for(let i=0;i<3;i++)quince(.65+i*.052,top+.002,.58+.058*Math.sin(i*3),.042,0xc7a255);
  baseMass(0,.45,.4,w,.9,d,.70);
  clayPlant(-.83,1.18,-.006,.071,.099,'herb',.39,0x9b8064);
 })
}
function spindleChair(x,z,yaw,c){
 group(x,0,z,yaw,()=>{
  for(const s of [-1,1])for(const t of [-1,1]){rod([s*.208,.022,t*.199],[s*.17,.46,t*.16],.024,.030,c,M.wood,12)}
  box(0,.45,0,.435,.062,.409,c,M.wood,.024);box(0,.486,-.01,.386,.022,.36,0xa29771,M.linen,.013);
  for(const s of [-1,1]){beam([s*.18,.44,-.15],[s*.192,.951,-.224],.041,.040,c);rod([s*.19,.187,-.18],[s*.19,.187,.18],.014,.014,c,M.wood,8)}
  box(0,.922,-.22,.407,.105,.047,c,M.wood,.012);
  for(let i=0;i<3;i++)beam([(i-1)*.089,.47,-.157],[(i-1)*.091,.902,-.215],.024,.025,tint(c,1.08));
  rod([-.19,.182,.154],[.19,.182,.154],.014,.014,c,M.wood,8);baseMass(0,.27,-.015,.46,.55,.44,.33)
 })
}
function breakfast(){
 group(2.03,0,4.20,0,()=>{
  profile(0,0,0,[[.21,0],[.22,.042],[.16,.080],[.105,.104],[.087,.17],[.125,.25],[.116,.31],[.075,.37],[.064,.56],[.117,.63],[.134,.692]],C.oak,M.wood,24);
  for(let i=0;i<3;i++){const a=i*TAU/3;group(0,0,0,a,()=>{beam([0,.182,0],[0,.064,.357],.102,.082,C.oak);box(0,.045,.357,.113,.078,.147,C.oak)})}
  profile(0,.685,0,[[.62,0],[.67,.022],[.675,.059],[.658,.077]],0xa07c56,M.wood,48);
  const top=.764;
  plate(-.20,top,.04,.158,0xcac9ae);plate(.19,top,-.165,.125,0xd7cfb1);
  group(-.183,top+.024,.044,-.53,()=>{vessel(0,0,0,.068,.090,0x849b91,'cup');profile(0,.078,0,[[.062,0],[.062,.002]],0x725439,M.pot,18)});
  bottle(.273,top,.172,.059,.122,0x8b5847,2,10);
  group(.16,top+.023,-.163,.2,()=>{ball(0,.024,0,.085,.035,.047,0xc0a171,M.pot,16,8);ball(.002,.052,.002,.066,.012,.029,0x9b6256,M.pot,14,6)});
  group(-.06,top+.002,-.34,-.11,()=>{box(0,.008,0,.224,.014,.145,0xa9b0a0,M.linen,.005);box(-.054,.017,0,.018,.003,.145,C.blue,M.linen,0)});
  rod([-.011,top+.009,.078],[.117,top+.010,.125],.007,.006,C.brass,M.metal,8);ball(.124,top+.012,.127,.024,.006,.018,C.brass,M.metal,10,5);
  for(let i=0;i<3;i++)quince(-.33+i*.066,top,-.19+Math.sin(i*2)*.048,.046,0xd0ad64);
  baseMass(0,.38,0,1.25,.76,1.25,.40);
 });
 spindleChair(2.08,5.080,PI-.08,0x687b69);spindleChair(2.85,3.76,-1.12,0x886c4f);
 // Breakfast nook light, wall print and a shallow plate dresser near the entrance.
 group(3.325,1.76,4.20,-PI/2,()=>wallArt(0,0,0,.63,.79,1));
 group(-1.94,0,5.48,PI,()=>{
  const w=2.24;box(0,.435,.23,w,.84,.42,0x687a6c);
  for(let i=0;i<3;i++){let x=(i-1)*.705;drawer(x,.63,.46,.65,.245,0x798b79);box(x,.272,.455,.653,.388,.041,0x5d7666);box(x,.274,.479,.533,.286,.019,0x6c8470)}
  box(0,.88,.25,w+.09,.082,.56,C.edge);box(0,1.56,.041,w-.05,1.36,.056,0x657566);
  for(const s of [-1,1])box(s*(w/2-.026),1.56,.13,.067,1.36,.29,C.oak);
  for(const y of [1.31,1.76,2.24])box(0,y,.16,w+.04,.058,.32,C.oak);
  for(let j=0;j<2;j++)for(let i=0;i<4;i++){const xx=(i-1.5)*.46;group(xx,1.36+j*.45,.10,0,()=>{group(0,.160,0,0,()=>plate(0,0,0,.178,pick([0xccc8ac,0xa7b8a9,0xdacbb0])),1.27)});
   if(i%2===0)vessel(xx+.056,1.34+j*.45,.254,.062,.092,pick(ware),'cup')}
  basket(-.68,.922,.24,.152,.13);for(let i=0;i<4;i++)quince(-.74+i*.042,1.005,.23+.053*Math.sin(i*2.0),.052);
  vessel(.53,.922,.24,.13,.255,0xc7b38f,'jug');for(let i=0;i<3;i++)plate(-.08,.922+i*.026,.26,.171,0xa0ada1);
  baseMass(0,.48,.25,w,.95,.52,.53)
 });
 lamp(.29,2.08,2.56,1.05,.78);
 group(-2.85,1.64,.11,0,()=>wallArt(0,0,0,.49,.64,2));
}
function kitchen(){hearth();prepBench();breakfast()}

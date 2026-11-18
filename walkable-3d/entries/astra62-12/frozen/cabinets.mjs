import {M} from "./model.mjs";
import {machines} from "./layout.mjs";
import {rng} from "./graphics.mjs";
const ink=M("#262a2c","rubber"),graphite=M("#353638","paint"),brass=M("#bf9b61","brass"),darkBrass=M("#907953","brass"),silver=M("#b9bab1","chrome"),gun=M("#575d5d","steel"),cream=M("#e4c89b","lacquer");
const whitePrint=id=>M("#ffffff","print",id);
const nearBlack=M("#24272a","matte");
export function rounded(w,h,r,n=5){
  const pts=[];
  for(const [x,y,a] of [[w/2-r,-h/2+r,-Math.PI/2],[w/2-r,h/2-r,0],[-w/2+r,h/2-r,Math.PI/2],[-w/2+r,-h/2+r,Math.PI]]){
    for(let i=0;i<=n;i++){const t=a+i/n*Math.PI/2;pts.push([x+r*Math.cos(t),y+r*Math.sin(t)])}
  }
  return pts;
}
export function plate(b,x,y,z,w,h,d,r,front,side=front){b.at(x,y,z,0,()=>b.outline(rounded(w,h,r,4),0,d,front,side))}
function bezel(b,w,h,r,wi,hi,ri,depth,s){
  const outer=rounded(w,h,r,5),inner=rounded(wi,hi,ri,5);
  for(let i=0;i<outer.length;i++){const j=(i+1)%outer.length;b.face([...outer[i],depth],[...outer[j],depth],[...inner[j],0],[...inner[i],0],s)}
}
export function screw(b,x,y,z,r=.011,s=gun){
  b.tube([x,y,z-.002],[x,y,z+.003],r,r*.91,s,8);
  b.at(x,y,z+.0037,0,()=>b.panel(0,0,0,r*1.15,r*.17,ink),0,.54);
}
function lock(b,x,y,z){
  b.tube([x,y,z],[x,y,z+.009],.016,.015,silver,16);
  b.panel(x,y,z+.0097,.004,.017,nearBlack,0,0,.13);
}
function coinDoor(b,x,y,z,w=.33,h=.46,feature=false){
  b.at(x,y,z,0,()=>{
    plate(b,0,0,.001,w+.026,h+.027,.019,.028,ink,gun);
    plate(b,0,0,.013,w,h,.016,.021,M("#494a47","steel"),ink);
    plate(b,-w*.18,h*.205,.029,w*.43,h*.33,.014,.011,nearBlack,gun);
    const cx=-w*.18,cy=h*.205;
    b.box(cx,cy+.018,.04,w*.31,.019,.018,silver);
    b.box(cx,cy+.018,.050,w*.235,.006,.0015,nearBlack);
    b.panel(cx,cy-.014,.04,w*.32,.044,M("#ffffff","litPrint","coinFace"));
    lock(b,w*.29,h*.29,.022);
    plate(b,0,-h*.245,.03,w*.63,h*.20,.022,.014,nearBlack,gun);
    b.box(0,-h*.224,.045,w*.53,.014,.018,gun);
    b.box(0,-h*.265,.045,w*.48,.010,.016,M("#807970","steel"));
    for(const sx of [-1,1])for(const sy of [-1,1])screw(b,sx*(w/2-.02),sy*(h/2-.022),.022,.0075);
    if(feature)b.panel(w*.232,-h*.039,.023,.058,.033,whitePrint("serial"));
  });
}
function joystick(b,x,y,z,col,large=false){
  const r=large?.066:.052;
  b.tube([x,y,z],[x,y,z+.008],r*1.14,r*1.10,gun,24);
  for(let i=0;i<3;i++)b.tube([x,y,z+.007+i*.006],[x,y,z+.014+i*.006],r*(1-i*.17),r*(.91-i*.16),ink,24);
  const xx=x+.011,yy=y+.008,top=z+(large?.125:.102);
  b.tube([x,y,z+.019],[xx,yy,top],.009,.009,silver,14);
  b.ball(xx,yy,top,large?.041:.035,large?.041:.035,large?.041:.035,M(col,"plastic"));
}
function button(b,x,y,z,r,col,metal=false){
  b.tube([x,y,z],[x,y,z+.008],r*1.19,r*1.18,metal?silver:ink,20);
  b.tube([x,y,z+.007],[x,y,z+.017],r,r*.96,M(col,"plastic"),24);
  b.ball(x,y,z+.016,r*.925,r*.925,.004,M(col,"lacquer"));
}
function spinner(b,x,y,z,col){
  b.tube([x,y,z],[x,y,z+.012],.084,.080,silver,32);
  b.tube([x,y,z+.011],[x,y,z+.042],.068,.064,gun,28);
  for(let i=0;i<20;i++){const q=i*Math.PI/10,xx=x+.067*Math.cos(q),yy=y+.067*Math.sin(q);b.tube([xx,yy,z+.014],[xx,yy,z+.038],.002,.0016,silver,5)}
  b.tube([x,y,z+.04],[x,y,z+.048],.063,.061,M(col,"plastic"),32);
  b.at(x,y,z+.049,0,()=>b.panel(0,.037,0,.005,.035,cream),0,-.60);
}
function wheel(b,x,y,z){
  b.tube([x,y,z],[x,y,z+.049],.040,.030,darkBrass,24);b.tube([x,y,z+.044],[x,y,z+.065],.029,.026,brass,20);
  for(let i=0;i<4;i++){const q=i*Math.PI/2+.51;b.tube([x+Math.cos(q)*.016,y+Math.sin(q)*.016,z+.056],[x+Math.cos(q)*.10,y+Math.sin(q)*.10,z+.074],.009,.010,brass,12)}
  b.torus(x,y,z+.074,.097,.012,brass,48);
  b.tube([x+.082,y+.049,z+.074],[x+.082,y+.049,z+.103],.008,.008,silver,12);
  b.ball(x+.082,y+.049,z+.109,.018,.018,.022,M("#56392f","wood"));
}
function deck(b,w,frontY,frontZ,backY,backZ,id){
  const len=Math.hypot(backY-frontY,backZ-frontZ),rx=Math.atan2(backZ-frontZ,backY-frontY);
  b.at(0,(frontY+backY)/2,(frontZ+backZ)/2,0,()=>{
    b.panel(0,0,.004,w,len,M("#fff7ec","lacquer",id+"Deck"));
    if(id==="bell"){
      wheel(b,-.39,-.019,.008);
      b.tube([-.104,.056,.007],[-.104,.056,.024],.075,.073,darkBrass,36);
      b.disc(-.104,.056,.026,.064,whitePrint("depthDial"));b.torus(-.104,.056,.027,.066,.006,brass,40);
      joystick(b,.206,-.02,.007,"#bd5d45",true);
      button(b,.401,.026,.01,.030,"#eac385",true);button(b,.475,-.046,.01,.029,"#698e76",true);
      for(const [x,col] of [[-.04,"#f3ac68"],[.014,"#8db9a1"],[.068,"#ce7055"]]){
        b.tube([x,-.103,.006],[x,-.103,.012],.015,.014,gun,16);b.ball(x,-.103,.015,.010,.010,.007,M(col,"light"));
      }
    }else if(id==="lunar"||id==="kite"){
      if(id==="lunar"){
        b.tube([-.151,0,.006],[-.151,0,.017],.084,.078,silver,24);b.tube([-.151,0,.017],[-.151,0,.019],.068,.067,ink,28);
        b.ball(-.151,0,.008,.058,.058,.051,M("#b7e2d9","plastic"));
      }else spinner(b,-.163,0,.007,"#7bb9ac");
      button(b,.065,.019,.009,.029,id==="lunar"?"#cb8199":"#deb66e");button(b,.146,.042,.009,.029,"#83c2c3");button(b,.119,-.046,.009,.022,"#e0c2ba");
      button(b,.316,.058,.007,.015,"#b7c7af",true);
    }else{
      joystick(b,-.164,-.008,.008,id==="ember"?"#a9503d":"#df9e49");
      button(b,.091,-.015,.008,.030,"#d9aa63");button(b,.179,.024,.008,.030,id==="ember"?"#b45745":"#65a19b");
      button(b,.314,.054,.008,.013,"#e9cb96",true);
    }
  },rx);
}
function screen(b,id,y,z,rx,outerW,outerH,screenW,screenH){
  b.at(0,y,z,0,()=>{
    plate(b,0,0,.004,outerW,outerH,.010,.026,M("#24282a","rubber"));
    bezel(b,screenW+.077,screenH+.073,.034,screenW+.003,screenH+.002,.032,.025,M("#474847","rubber"));
    b.crt(0,0,.008,screenW,screenH,.026,M("#f1faf4","glass",id+"Screen"),0,.058);
  },rx);
}
function rear(b,w,z,y,h){
  b.at(0,y,z,Math.PI,()=>{
    plate(b,0,0,.002,w,h,.013,.018,whitePrint("backPanel"),graphite);
    for(const xx of [-1,1])for(const yy of [-1,1])screw(b,xx*(w/2-.022),yy*(h/2-.022),.010,.008);
    b.box(0,h*.31,.013,.096,.023,.017,ink);
  });
}
function scuffs(b,w,z,id,y=.158){
  const r=rng(id.charCodeAt(0)*123);
  for(let i=0;i<12;i++){
    const x=(r()-.5)*w*.86,yy=y+(r()-.5)*.05,len=.012+r()*.043;
    b.at(x,yy,z,0,()=>b.panel(0,0,0,len,.0012+r()*.0012,M(i%4?"#807a6a":"#a29a82","matte")),0,(r()-.5)*.43)
  }
}
function sideDecal(b,sign,x,y,z,w,h,tex,trim){
  b.at(x*sign,y,z,sign*Math.PI/2,()=>{
    plate(b,0,0,.0005,w+.017,h+.019,.005,.036,trim);
    b.at(0,0,.004,0,()=>b.outline(rounded(w,h,.027),0,.0008,whitePrint(tex),ink));
  });
}
function timberCab(b,m){
  const p=[[-.445,.068],[.305,.068],[.366,.128],[.372,.775],[.454,.823],[.454,.882],[.219,.965],[.015,1.480],[.170,1.492],[.235,1.538],[.235,1.706],[.159,1.757],[-.363,1.757],[-.445,1.652]];
  const walnut=M("#ebc9ac","wood","wood"),oak=M("#e2b789","wood","wood");
  const ed=p.map(()=>graphite);ed[0]=nearBlack;ed[2]=M("#685346","paint");ed[4]=walnut;ed[5]=ink;ed[6]=nearBlack;ed[7]=nearBlack;ed[9]=cream;ed[11]=walnut;
  b.box(0,.048,-.018,.778,.083,.784,ink);b.profile(p,m.w-.056,walnut,ed);
  for(const s of [-1,1]){
    const x=s*(m.w/2-.014);b.profile(p,.028,oak,ink,x);
    b.path([...p,p[0]].map(([z,y])=>[s*(m.w/2+.0005),y,z]),.0082,M("#bda17d","brass"),8);
    sideDecal(b,s,m.w/2+.002,.882,-.182,.475,.959,m.id+"Side",M("#947454","paint"));
    b.at(s*(m.w/2+.004),.28,-.309,s*Math.PI/2,()=>b.panel(0,0,.001,.106,.050,whitePrint("serial")));
    for(const [yy,zz] of [[.146,.258],[.148,-.35],[1.631,-.325],[1.582,.125]])b.at(s*(m.w/2+.004),yy,zz,s*Math.PI/2,()=>screw(b,0,0,0,.010,gun));
  }
  const w=m.w-.058;b.panel(0,1.622,.239,w,.155,M("#fff1d5","litPrint",m.id+"Marquee"));
  for(const y of [1.536,1.708])b.box(0,y,.237,w+.012,.016,.032,darkBrass);
  b.panel(0,1.492,.095,.46,.113,M("#b2ac9b","matte","grill",{repeat:[3,.7]}),Math.PI/2+.076);
  const pitch=Math.atan2(.015-.219,1.480-.965);
  screen(b,m.id,1.2225,.117,pitch,w-.018,.52,.604,.430);
  deck(b,w-.012,.882,.455,.965,.219,m.id);
  b.box(0,.850,.453,w,.039,.020,walnut);
  b.box(0,.868,.462,w-.012,.006,.005,brass);
  coinDoor(b,-.022,.476,.369,.305,.385);
  b.panel(.260,.635,.372,.103,.049,whitePrint("serial"));
  b.box(0,.153,.369,w-.031,.102,.021,M("#65625b","steel"));scuffs(b,w,.380,m.id);
  rear(b,w-.059,-.448,.874,1.22);
}
function blueCab(b,m){
  const p=[[-.472,.060],[.276,.060],[.368,.167],[.349,.706],[.486,.811],[.486,.896],[.420,.932],[.200,.967],[.080,1.510],[.263,1.552],[.272,1.781],[.182,1.841],[-.37,1.821],[-.468,1.686]];
  const blue=M("#405978","lacquer"),edge=M("#32455c","paint"),accent=M(m.id==="lunar"?"#8cb4bd":"#80bcae","paint");
  const ed=p.map(()=>edge);ed[2]=M("#3e526b","lacquer");ed[4]=blue;ed[7]=nearBlack;ed[8]=graphite;ed[9]=cream;ed[11]=blue;
  b.box(0,.044,-.031,.819,.077,.792,ink);b.profile(p,m.w-.063,blue,ed);
  for(const s of [-1,1]){
    b.profile(p,.031,blue,edge,s*(m.w/2-.0155));
    // Screen-printed side wing, physically inset from the continuous bright edge band.
    const wing=[[-.441,.24],[.16,.24],[.252,.34],[.247,.787],[.412,.867],[.169,.927],[.047,1.497],[.17,1.6],[.17,1.72],[-.318,1.736],[-.433,1.613]];
    b.profile(wing,.008,whitePrint(m.id+"Side"),accent,s*(m.w/2+.003));
    b.path([...p,p[0]].map(([z,y])=>[s*(m.w/2+.002),y,z]),.0075,silver,8);
    b.path([[s*(m.w/2+.013),.22,.21],[s*(m.w/2+.013),.315,.287],[s*(m.w/2+.013),.71,.282]],.007,accent,8);
    for(const [yy,zz] of [[.145,-.34],[.24,.291],[1.694,-.32],[1.697,.12]])b.at(s*(m.w/2+.012),yy,zz,s*Math.PI/2,()=>screw(b,0,0,0,.008,gun));
    b.at(s*(m.w/2+.013),.159,-.239,s*Math.PI/2,()=>b.panel(0,0,0,.14,.056,whitePrint("serial")));
  }
  const w=m.w-.078;
  b.panel(0,1.666,.274,w,.203,M("#f6eeec","litPrint",m.id+"Marquee"),.035);
  b.box(0,1.557,.268,w,.018,.043,silver);b.box(0,1.780,.273,w,.015,.037,gun);
  b.panel(0,1.534,.165,.49,.099,M("#c2c4c0","steel","grill",{repeat:[4,1]}),Math.PI/2+.2);
  screen(b,m.id,1.239,.14,Math.atan2(-.12,.543),w,.525,.613,.448);
  deck(b,w-.005,.896,.484,.967,.200,m.id);
  b.box(0,.864,.484,w+.003,.041,.018,edge);b.box(0,.872,.494,w-.012,.009,.004,accent);
  b.panel(0,.472,.361,w-.084,.462,M("#9aa8b4","matte","grill",{repeat:[4,3]}),-.033);
  coinDoor(b,0,.460,.377,.305,.37);
  b.box(0,.171,.368,w-.047,.079,.024,gun);scuffs(b,w,.382,m.id,.172);
  rear(b,w-.064,-.473,.866,1.23);
}
function feature(b,m){
  const hull=M("#40746d","lacquer"),deep=M("#2d5855","paint"),teal=M("#356964","lacquer"),rust=M("#c17755","lacquer"),warm=M("#e2c999","lacquer");
  const p=[[-.62,.094],[.392,.094],[.529,.166],[.529,.727],[.65,.797],[.65,.894],[.244,1.067],[.201,1.133],[-.48,1.133],[-.62,1.011]];
  b.box(0,.063,-.032,1.216,.117,1.16,nearBlack);
  b.profile(p,1.268,teal,[ink,gun,deep,deep,teal,ink,teal,hull,teal,deep]);
  for(const s of [-1,1]){
    b.profile(p,.052,hull,darkBrass,s*.66);
    b.path([...p,p[0]].map(([z,y])=>[s*.683,y,z]),.0104,brass,10);
  }
  // Broad cast shoulders, domed crown, and a deep, forward-projecting instrument port.
  const arch=[[-.676,1.03],[.676,1.03],[.709,1.14],[.709,1.61],[.674,1.77],[.591,1.900],[.48,1.982],[.305,2.048],[.12,2.074],[-.12,2.074],[-.305,2.048],[-.48,1.982],[-.591,1.900],[-.674,1.77],[-.709,1.61],[-.709,1.14]];
  b.outline(arch,-.156,.735,hull,deep,teal);
  b.path([...arch,arch[0]].map(([x,y])=>[x,y,.215]),.010,darkBrass,10);
  const roundCase=M("#c6a06a","brass");
  b.at(0,1.515,.207,0,()=>{
    b.tube([0,0,-.005],[0,0,.086],.510,.531,deep,72);
    b.tube([0,0,.086],[0,0,.121],.527,.512,darkBrass,72);
    b.tube([0,0,.120],[0,0,.127],.498,.495,graphite,72);
    b.torus(0,0,.120,.472,.031,roundCase,80);
    b.torus(0,0,.135,.429,.010,M("#e3c08a","brass"),72);
    b.crt(0,.010,.129,.709,.508,.035,M("#eff8ed","glass","bellScreen"),0,.18);
    for(let i=0;i<16;i++){const a=(i+.5)*Math.PI/8,x=.476*Math.cos(a),y=.476*Math.sin(a);
      b.tube([x,y,.144],[x,y,.156],.013,.012,brass,6);if(i%2===0)b.at(x,y,.157,0,()=>b.panel(0,0,0,.011,.0018,graphite),0,a);
    }
    for(const s of [-1,1]){
      b.tube([s*.497,-.071,.119],[s*.497,.071,.119],.020,.020,brass,16);
      for(const y of [-.048,.045])b.box(s*.499,y,.115,.068,.026,.026,darkBrass);
    }
    b.panel(0,-.323,.130,.188,.045,whitePrint("serial"));
  },-.068);
  // Relief grilles are visible from both side approaches.
  for(const s of [-1,1]){
    b.at(s*.712,1.508,-.169,s*Math.PI/2,()=>{
      b.tube([0,0,-.004],[0,0,.020],.193,.186,darkBrass,48);
      b.disc(0,0,.023,.172,M("#bbb8a0","matte","grill",{repeat:[2,2]}));
      b.torus(0,0,.026,.170,.011,brass,48);b.torus(0,0,.031,.124,.006,gun,44);
      for(let i=0;i<5;i++){const y=(i-2)*.050,len=Math.sqrt(.155*.155-y*y);b.tube([-len,y,.038],[len,y,.038],.0065,.0065,darkBrass,10)}
      for(let i=0;i<8;i++){const a=i*Math.PI/4;screw(b,.183*Math.cos(a),.183*Math.sin(a),.022,.007,gun)}
    });
    sideDecal(b,s,.688,.594,-.073,.439,.790,"bellSide",brass);
    // Bent copper pipe with compression fittings anchored to the rear column.
    const pipe=[[s*.643,1.085,-.522],[s*.692,1.112,-.559],[s*.702,1.151,-.565],[s*.702,1.812,-.565],[s*.691,1.874,-.548],[s*.646,1.912,-.521],[s*.579,1.916,-.503]];
    b.path(pipe,.025,darkBrass,14);
    for(const y of [1.174,1.55,1.778])b.tube([s*.702,y,-.565],[s*.702,y+.029,-.565],.034,.034,brass,8);
    // Ivory wings and coral insets frame the porthole without covering its glass.
    const wing=[[.552,1.135],[.645,1.14],[.652,1.29],[.624,1.326],[.552,1.287]].map(([x,y])=>[s*x,y]);
    if(s<0)wing.reverse();b.outline(wing,.228,.030,warm,brass);b.panel(s*.605,1.221,.246,.031,.091,rust);
  }
  // Crown marquee with a shallow arched roof, rolled brass lips and scalloped end castings.
  const sign=[[-.729,1.995],[.729,1.995],[.729,2.184],[.688,2.235],[.530,2.267],[.253,2.299],[0,2.310],[-.253,2.299],[-.530,2.267],[-.688,2.235],[-.729,2.184]];
  b.outline(sign,-.023,.431,darkBrass,hull,deep);
  const signInset=sign.map(([x,y])=>[x*.975,2.151+(y-2.151)*.902]);
  b.outline(signInset,.197,.015,M("#fff4dd","litPrint","bellMarquee"),brass);
  b.path([...sign,sign[0]].map(([x,y])=>[x,y,.200]),.009,brass,12);
  for(const s of [-1,1]){
    for(let i=0;i<3;i++)b.ball(s*(.640+i*.026),2.045,.214,.008,.008,.005,M("#ebc991","light"));
    b.at(s*.729,2.108,-.025,s*Math.PI/2,()=>{for(let i=0;i<4;i++)b.box((i-1.5)*.06,0,.005,.018,.107,.012,brass)});
  }
  b.tube([0,2.30,-.065],[0,2.328,-.065],.105,.084,darkBrass,32);
  b.ball(0,2.326,-.065,.073,.056,.073,M("#dfa977","litPrint"));b.torus(0,2.341,-.065,.069,.005,brass,32,Math.PI/2);
  deck(b,1.274,.894,.650,1.067,.244,"bell");
  b.box(0,.850,.649,1.285,.087,.028,deep);b.box(0,.871,.667,1.255,.011,.007,brass);
  for(const s of [-1,1]){
    const x=s*.557;
    b.tube([x,.891,.617],[x,.932,.647],.014,.014,darkBrass,14);
    b.tube([x,.932,.647],[x-s*.149,.932,.647],.015,.015,brass,16);
    b.tube([x-s*.149,.932,.647],[x-s*.149,.891,.617],.014,.014,darkBrass,14);
  }
  coinDoor(b,0,.469,.534,.355,.416,true);
  for(const s of [-1,1]){
    plate(b,s*.461,.457,.535,.156,.365,.015,.047,deep,darkBrass);
    for(let i=0;i<5;i++){const yy=.363+i*.045;b.box(s*.461,yy,.548,.104,.009,.011,darkBrass)}
    for(const yy of [.296,.616])screw(b,s*.461,yy,.545,.009,brass);
  }
  plate(b,0,.188,.535,1.115,.093,.012,.020,darkBrass,gun);scuffs(b,1.10,.542,"bell",.187);
  b.at(0,.665,.539,0,()=>b.panel(0,0,0,.119,.048,whitePrint("serial")));
  // Access hatch, lift handles, bolted straps, cable grommet and inspected service tag.
  rear(b,1.10,-.624,.566,.793);
  b.at(0,1.488,-.527,Math.PI,()=>{
    plate(b,0,0,.001,1.135,.662,.017,.067,deep,darkBrass);
    b.panel(0,-.019,.011,.755,.422,whitePrint("backPanel"));
    for(const s of [-1,1]){
      for(const yy of [-.232,.229])screw(b,s*.488,yy,.012,.013,brass);
      b.path([[s*.426,-.032,.014],[s*.426,-.032,.046],[s*.426,.103,.046],[s*.426,.103,.014]],.010,gun,12);
    }
  });
  b.at(0,2.123,-.243,Math.PI,()=>b.panel(0,0,0,.550,.105,whitePrint("houseplate")));
  b.box(-.073,.004,-.667,.135,.008,.093,darkBrass);
  b.box(-.069,.012,-.670,.075,.017,.057,graphite);
  b.tube([-.072,.016,-.675],[-.051,.016,-.675],.012,.012,ink,12);
  for(const x of [-.125,-.021])b.at(x,.0088,-.644,0,()=>screw(b,0,0,0,.004,brass),-Math.PI/2);
  b.tube([.413,.258,-.624],[.413,.258,-.644],.031,.027,ink,18);
  b.path([[.413,.258,-.646],[.413,.192,-.655],[.394,.087,-.664],[.359,.033,-.676],[.21,.021,-.690],[-.055,.018,-.673]],.009,ink,10);
}
export function buildCabinets(b){
  for(const m of machines)b.at(m.x,0,m.z,m.yaw,()=>{b.zone=m.id;if(m.bank==="feature")feature(b,m);else if(m.bank==="timber")timberCab(b,m);else blueCab(b,m)});
}
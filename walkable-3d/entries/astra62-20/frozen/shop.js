import {zone,box,place,rod,beam,torus,path,lathe,cylinder,ellipsoid,grid,face,print,pi,tau} from './geometry.js';
import {P,rand,clothColors} from './materials.js';
import {frame,pin,panel,strapHinge,handle,drawer,spool,basket,flask,book,lantern,pick,wear} from './joinery.js';
import {fold,trunk,shears,machine,rolled,notionTray} from './goods.js';
import {F,W} from './walk.js';
function backsplash(){
  const x0=.121,x1=3.402,z=-1.277,y0=2.11,y1=2.666;
  // The back and separate shelves enclose the recesses and put stock within reach.
  for(let i=0;i<13;i++)box(x0+(i+.5)*(x1-x0)/13,(y0+y1)/2,z,(x1-x0)/13-.002,y1-y0,.037,i%3?'#59684e':'#52654f','paint');
  for(const yy of [y0,y1]){box((x0+x1)/2,yy,-1.138,x1-x0+.05,.047,.329,P.oak);box((x0+x1)/2,yy-.008,-.971,x1-x0+.075,.046,.025,P.deep,'paint')}
  for(const xx of [x0,1.017,2.195,x1])box(xx,(y0+y1)/2,-1.129,.046,y1-y0,.315,P.oak);
  box(1.609,(y0+y1)/2,-1.129,.028,y1-y0,.302,P.oak);
  for(const [a,b,y] of [[1.034,2.18,2.39],[2.211,3.382,2.365]]){
    box((a+b)/2,y,-1.134,b-a,.027,.308,P.maple);
    box((a+b)/2,y-.002,-.978,b-a,.021,.011,P.walnut);
  }
  const jarY=y0+.025;
  for(const [i,label,co,h] of [[0,'madder','#92664c',.284],[1,'weld','#a89762',.242],[2,'woad','#597e7c',.304]]){
    const xx=.282+i*.274;
    flask(xx,jarY,-1.105,.083,h,co,label);
  }
  box(.562,2.525,-1.132,.838,.024,.290,P.maple);
  for(let i=0;i<3;i++){const xx=.281+i*.271;box(xx,2.595,-1.107,.239,.102,.164,'#a48c62','wood');box(xx,2.597,-1.018,.075,.03,.014,P.brass,'metal');pin(xx,2.595,-1.006,.012,P.iron)}
  for(let j=0;j<2;j++)for(let i=0;i<2;i++){
    const yy=j?2.407:2.135,xx=1.312+i*.594,n=(i+j)%2?3:4;
    for(let k=0;k<n;k++){
      const patterned=(j+i+k)%3!==0,id=(i+j+k)%5;
      fold(xx+(rand()-.5)*.021,yy+k*.045,-1.105+(rand()-.5)*.015,.462-rand()*.034,.245,.046,patterned?'#fff3de':clothColors[(i*2+k+j)%8],patterned?'fabric'+id:'cloth',(rand()-.5)*.036);
    }
  }
  for(let j=0;j<2;j++)for(let i=0;i<7;i++){
    const yy=j?2.38:2.135,xx=2.308+i*.162,r=.042+((i+j)%3)*.005;
    spool(xx,yy,-1.098,r,.119+((i+2*j)%3)*.025,clothColors[(i+j*3)%8]);
  }
  for(const [xx,label] of [[.558,'madder'],[1.606,'linen'],[2.789,'thread']]){
    box(xx,y0-.006,-.955,.199,.048,.012,P.brass,'metal',.002);print(label,xx,y0-.005,-.948,.178,.033);
  }
  // Shallow tools hang in the gap under the shelf.
  rod([.217,2.05,-1.172],[2.932,2.05,-1.172],.011,P.bronze);
  for(const xx of [.28,1.6,2.89])rod([xx,2.05,-1.255],[xx,2.05,-1.167],.014,P.brass);
  for(const [xx,len] of [[.401,.113],[.509,.139],[.615,.106]]){
    torus(xx,2.046,-1.169,.018,.004,P.brass,'metal',12,4);
    rod([xx,2.029,-1.164],[xx,2.008-len,-1.164],.005,'#adb1a4');
    lathe(xx,2.007-len,-1.164,[[.012,0],[.016,.014],[.013,.068],[.008,.078]],P.chestnut,'wood',10);
  }
}
function workbench(){
  const a=.080,b=3.411,top=1.766;
  box((a+b)/2,top-.039,-1.029,b-a,.078,.646,P.oak);
  for(let i=0;i<4;i++)box((a+b)/2,top+.002,-1.287+.163*i,b-a-.018,.008,.158,pick(['#bd986a','#c1a071','#b5986d']),'wood',.002);
  box((a+b)/2,top-.065,-.704,b-a+.03,.099,.046,P.walnut);
  for(const [x,w] of [[.55,.928],[2.908,.973]]){
    box(x,1.323,-1.047,w,.755,.537,P.deep,'paint');
    for(let j=0;j<3;j++)for(let i=0;i<2;i++)drawer(x+(i-.5)*w*.49,1.083+j*.247,-.769,w*.467,.226,'num'+((x>2?6:0)+j*2+i),j%2?'#537c6c':'#487060');
    box(x,.95,-1.034,w+.04,.08,.576,P.walnut);
  }
  box(1.73,1.590,-1.043,1.32,.20,.549,P.deep,'paint');
  drawer(1.712,1.594,-.756,1.29,.176,'needles','#466e5e');
  box(1.72,1.02,-1.058,1.404,.044,.487,P.chestnut);
  basket(1.48,1.045,-1.072,.192,.205);fold(1.49,1.255,-1.052,.307,.272,.048,'#d9c59e');
  for(let k=0;k<3;k++)book(1.968,1.046+k*.072,-1.016,.355,.063,.239,['#664e3b','#836753','#526d64'][k]);
  const yy=top+.009;
  machine(1.248,yy,-1.014);
  place(.470,yy,-1.025,()=>{fold(0,0,0,.333,.269,.030,'#ded1ac');fold(.014,.030,0,.313,.253,.026,'#fff5e3','fabric1',.07)},0,.08);
  spool(.817,yy,-1.194,.037,.107,'#ab6656');
  const pinX=1.775;
  ellipsoid(pinX,yy+.038,-1.010,.076,.048,.067,'#a85749','cloth',16,8);
  for(let i=0;i<7;i++){const a=i*2.4,xx=pinX+Math.cos(a)*.030,zz=-1.01+Math.sin(a)*.028;rod([xx,yy+.065,zz],[xx+Math.cos(a)*.013,yy+.109,zz+Math.sin(a)*.013],.0014,'#b5baae','metal',.0014,5);
    ellipsoid(xx+Math.cos(a)*.013,yy+.110,zz+Math.sin(a)*.013,.0045,.0045,.0045,i%2?P.cream:P.brass,'pottery',7,4)}
  shears(2.12,yy,-.958,1.1,-.47);
  place(2.852,yy,-1.045,()=>{
    box(0,.012,0,.524,.024,.351,'#875b46','leather');print('ledger',0,.025,0,.509,.335,0,-pi/2);
    for(let j=0;j<3;j++)box(.142,.029+j*.001,-.09+j*.088,.101,.003,.064,clothColors[j+1],'cloth',.0005);
  },0,-.12);
  box(1.99,yy+.005,-.746,1.144,.011,.048,P.oak);print('measure',1.99,yy+.011,-.746,1.140,.043,0,-pi/2);
  backsplash();
  // The work light hangs over the back half of the bench, clear of the aisle.
  place(1.21,2.52,-1.038,()=>{
    box(0,.803,0,.169,.052,.151,P.oak);torus(0,.756,0,.035,.007,P.iron,'metal',14,5);
    for(let i=0;i<9;i++)place(0,.723-i*.032,0,()=>torus(0,0,0,.021,.0042,P.bronze,'metal',12,5),0,pi/2*(i%2),0,.66,1,1);
    path([[-.099,.220,0],[-.090,.377,0],[-.022,.462,0],[.024,.462,0],[.09,.377,0],[.099,.220,0]],.006,P.iron,'metal',14);
    lathe(0,0,0,[[.032,.018],[.063,.030],[.067,.054],[.057,.079],[.038,.087]],P.brass,'metal',18);
    lathe(0,0,0,[[.038,.080],[.051,.107],[.055,.145],[.039,.183],[.037,.248],[.042,.253]],P.cream,'lamp',18);
    lathe(0,0,0,[[.146,.178],[.148,.188],[.128,.193],[.088,.224],[.053,.249],[.047,.261]],'#597165','pottery',24,false);
    lathe(0,0,0,[[.041,.238],[.142,.177]],'#ddcfa8','pottery',23,false);
    lathe(0,0,0,[[.042,.251],[.047,.265],[.034,.275],[.027,.301]],P.bronze,'metal',17);
  });
}
function endRack(){
  place(3.594,0,.18,()=>{
    box(0,F+.116,.209,1.632,.220,.423,P.deep,'paint');
    grid(6,1,(u,v)=>[-.80+u*1.6,F+.226,.01+v*.412],P.walnut,'wood');
    for(const d of [-1,1])box(d*.797,F+.31,.217,.050,.602,.435,P.chestnut);
    for(const yy of [F+.27,F+.49]){
      box(0,yy,.42,1.62,.093,.043,P.pine,'paint');
      for(const x of [-.757,.757])pin(x,yy,.449,.011);
    }
    for(let i=0;i<7;i++){
      const xx=-.663+i*.221;
      rolled(xx,F+.224,.202,.088+(i%2)*.01,.640+(i%3)*.137,i%5,(i%3-1)*.067);
    }
    box(0,F+.497,.449,.30,.073,.014,P.brass,'metal');print('linen',0,F+.496,.457,.273,.053);
    box(0,2.693,.196,1.84,.093,.50,P.oak);
    for(const x of [-.80,.8])beam([x,2.412,.039],[x,2.648,.393],.056,.046,P.iron,'metal');
    trunk(-.329,2.744,.174,.846,.335,.357,'#806044');
    basket(.457,2.741,.187,.189,.187,false);
    fold(.455,2.932,.188,.287,.252,.038,'#dcc9a1');
    box(.408,2.146,.015,.425,.552,.039,P.walnut);
    print('sampler',.408,2.147,.036,.385,.512);
    for(const xx of [-.56,-.291]){pin(xx,2.343,.031,.022);path([[xx,2.342,.035],[xx-.027,2.136,.046],[xx-.063,1.950,.061],[xx-.011,1.852,.071],[xx+.029,1.967,.059],[xx+.007,2.341,.035]],.009,P.cream,'cloth',19,5)}
  },0,-pi/2);
}
function counter(){
  zone('counter');
  const x=1.669,w=3.48,z0=1.421,d=.892,surface=1.305;
  // A drop panel forms the counter, with breadboard ends and hinged, locking stays.
  for(let i=0;i<6;i++)box(x,surface-.039,z0+(i+.5)*d/6,w,.078,d/6-.003,pick(['#b99a69','#b18b5b','#c3a275','#b99869']),'wood',.004);
  for(const a of [-1,1]){box(x+a*w/2,surface-.044,z0+d*.5,.063,.086,d+.022,P.walnut);box(x+a*w*.495,surface-.015,z0+d*.5,.018,.020,d+.024,P.brass,'metal')}
  box(x,surface-.060,z0+d+.004,w+.053,.109,.041,P.deep,'paint');
  box(x,surface-.040,z0+d+.03,w+.056,.012,.009,P.trim,'paint');
  for(const xx of [.080,1.692,3.226]){
    box(xx,surface-.099,1.849,.091,.07,.896,P.walnut);
    rod([xx-.114,1.286,1.423],[xx+.114,1.286,1.423],.020,P.iron,'metal');
    box(xx,1.308,1.527,.058,.009,.235,P.iron,'metal',.003);
    for(const zz of [1.488,1.602])cylinder(xx,1.314,zz,.009,.006,P.brass,'metal',8);
  }
  for(const xx of [.09,1.692,3.244]){
    box(xx,.780,1.381,.165,.267,.169,P.walnut,'wood');
    box(xx,.766,1.478,.127,.30,.036,P.iron,'metal');box(xx,1.186,2.201,.14,.045,.158,P.iron,'metal');
    beam([xx,.678,1.51],[xx,.906,1.82],.049,.038,P.iron,'metal');
    beam([xx,.900,1.814],[xx,1.191,2.216],.052,.043,P.iron,'metal');
    for(const [yy,zz] of [[.679,1.51],[.905,1.82],[1.189,2.208]])rod([xx-.039,yy,zz],[xx+.039,yy,zz],.032,P.brass,'metal',.032,12);
  }
  function label(xx,zz,what){place(xx,surface+.058,zz,()=>{box(0,0,0,.205,.09,.018,P.walnut,'wood');print(what,0,0,.010,.192,.077)},-.22)}
  // A stepped thread display stays low enough to see the bench through the opening.
  place(.612,surface+.003,1.84,()=>{
    for(let j=0;j<2;j++){
      const yy=.030+j*.082,zz=.084-j*.197;
      box(0,yy/2,zz,.917,yy,.197,P.chestnut);
      box(0,yy+.005,zz,.921,.018,.201,P.oak);
      for(let k=0;k<5;k++){
        const xx=(k-2)*.172,r=k%2?.050:.053;
        rod([xx,yy,zz],[xx,yy+.151,zz],.009,P.brass,'metal');
        spool(xx,yy+.016,zz,r,.117+(k%3)*.01,clothColors[(j*4+k)%8]);
      }
    }
  });
  label(.611,2.157,'thread');
  notionTray(1.625,surface+.002,1.940);label(1.618,2.168,'buttons');
  // Printed endcloth folds across the front rail and falls in loose waves.
  const clothP=(u,v)=>{
    const tt=Math.min(1,v/.71),drop=Math.max(0,(v-.71)/.29),xx=2.697+(u-.5)*.839;
    return [xx+.009*Math.sin(v*9+u*6),surface+.012+.006*Math.cos(u*15+v*3)-drop*.262,1.674+tt*.672+.011*Math.sin(u*18+v*4)+.018*Math.sin(drop*pi)];
  };
  grid(18,18,clothP,'#fff3e0','fabric1',[1.94,2.38]);
  grid(18,1,(u,v)=>{const p=clothP(u,.939+.019*v);p[2]+=.0028;return p},'#e4c693','cloth',[2.1,.22]);
  for(let i=0;i<36;i++){const q=clothP(i/35,1);rod(q,[q[0]+.003,q[1]-.017-rand()*.019,q[2]-.003],.002,P.cream,'cloth',.0012,4)}
  fold(2.68,surface+.024,1.937,.570,.392,.056,'#cdaa68');fold(2.704,surface+.079,1.912,.526,.366,.050,'#fff3df','fabric0',.034);
  label(2.205,2.154,'linen');
  box(1.642,surface+.006,1.538,1.21,.013,.06,P.oak);
  print('measure',1.642,surface+.0135,1.538,1.20,.051,0,-pi/2);
  lantern(3.222,surface+.001,1.73,.79);
}
function packingShelf(){
  zone('workroom');
  const x=2.832,top=1.721,z=1.179;
  box(x,top-.023,z,1.042,.046,.331,P.oak);
  box(x,top-.026,z-.170,1.067,.055,.032,P.walnut);
  for(const d of [-1,1]){
    const xx=x+d*.424;
    box(xx,1.307,1.311,.065,.783,.060,P.deep,'paint');
    beam([xx,1.375,1.287],[xx,top-.049,1.043],.032,.034,P.bronze,'metal');
    pin(xx,1.415,1.275,.014,P.brass);
  }
  place(x+.127,top+.001,z-.01,()=>{
    box(0,.048,0,.330,.096,.202,'#c5a47a','matte',.014);
    box(0,.098,0,.006,.006,.196,'#e0c7a1','cloth',.001);
    box(0,.099,0,.328,.006,.007,'#d8c49d','cloth',.001);
    for(const s of [-1,1])box(0,.049,s*.101,.005,.098,.003,'#e0c7a1','cloth',.001);
    path([[0,.105,0],[.031,.118,.012],[.040,.109,.026],[.021,.106,.021],[0,.105,0],[-.035,.111,-.018],[-.041,.123,-.003],[-.016,.110,.002],[0,.105,0]],.0035,'#d7c298','cloth',13,5);
    print('stock',.079,.100,-.038,.106,.039,-.13,-pi/2);
  },0,-.17);
  spool(x-.297,top+.002,z,.043,.092,'#beab82');
  // This buckled travel blind rolls down to meet the raised lower panel in transit.
  rod([-.043,2.908,1.286],[3.386,2.908,1.286],.053,'#c6b697','cloth',.054,18);
  for(const xx of [.013,.956,2.38,3.345]){
    place(xx,2.908,1.286,()=>torus(0,0,0,.054,.008,P.leather,'leather',17,5),0,pi/2);
    box(xx,2.880,1.241,.031,.045,.008,P.brass,'metal');
  }
}
function canopy(){
  zone('awning');
  const x0=-.306,x1=3.601,z0=1.392,z1=3.096,w=x1-x0;
  function p(u,v){
    const bow=.047*Math.abs(Math.sin(pi*2*u)),sag=.091*Math.sin(v*pi);
    return [x0+w*u,3.225-.441*v-sag-bow*(.17+.83*Math.sin(v*pi/2))+.004*Math.sin(u*42-v*3),z0+(z1-z0)*v];
  }
  const count=14;
  for(let i=0;i<count;i++){
    const co=i%2?'#e7d8b6':'#bc833d';
    grid(3,10,(u,v)=>p((i+u)/count,v),co,'cloth',[1.03,6.4],true);
    for(const a of [.10,.89])if(i%2===0)grid(1,10,(u,v)=>{const q=p((i+a+.021*u)/count,v);q[1]+=.0017;return q},'#dfb678','cloth',[.12,5],true);
    // Valance follows the dipped edge, with a hem binding on each scallop.
    const vp=(u,v)=>{const a=p((i+u)/count,1);return [a[0],a[1]-(.108+.098*Math.sin(pi*u)**.8)*v,a[2]+.017*v+.007*Math.cos(u*tau)*v]};
    grid(9,2,vp,co,'cloth',[.89,.72]);path(Array.from({length:10},(_,j)=>vp(j/9,1)),.005,'#a98452','cloth',12,5);
    if(i>0){const row=Array.from({length:10},(_,j)=>{const a=p(i/count,j/9);a[1]+=.002;return a});path(row,.0035,'#b99c6f','cloth',13,5)}
  }
  rod([x0-.04,3.218,z0],[x1+.04,3.218,z0],.043,P.oak,'wood',.043,18);
  rod([x0-.07,2.765,z1],[x1+.07,2.765,z1],.035,P.oak,'wood',.035,16);
  for(const [xx,u] of [[-.22,.022],[1.645,.50],[3.50,.973]]){
    const a=p(u,0),b=p(u,1);
    path([[xx,a[1]-.039,z0],[xx,3.015,1.92],[xx,2.881,2.565],[xx,b[1]-.032,z1]],.021,P.oak,'wood',14,8);
    for(const vv of [.02,.97]){const pp=p(u,vv);place(xx,pp[1]-.020,pp[2],()=>torus(0,0,0,.034,.005,P.cream,'cloth',14,5));}
  }
  for(const xx of [-.22,3.50]){
    const z=3.06;
    lathe(xx,.008,z,[[.061,0],[.067,.033],[.049,.067],[.042,1.01],[.049,1.065],[.047,1.128],[.036,2.587],[.053,2.64],[.049,2.729],[.029,2.753]],'#976f44','wood',14);
    lathe(xx,.008,z,[[.062,0],[.064,.055],[.049,.085],[.046,.278]],P.deep,'paint',14);
    for(const [yy,r] of [[.281,.051],[1.07,.052],[2.660,.054]])lathe(xx,yy,z,[[r,0],[r+.003,.008],[r,.031]],P.brass,'metal',14,false);
    beam([xx,2.42,z],[xx,2.857,2.691],.032,.031,P.bronze,'metal');
    const sign=xx<0?-1:1;
    rod([xx-.092,3.178,1.491],[xx+.092,3.178,1.491],.027,P.iron);
    box(xx,3.132,1.485,.112,.152,.024,P.iron,'metal');pin(xx,3.082,1.505,.016);
    const gx=xx+sign*.47,gz=3.67;
    path([[xx,2.748,z+.017],[xx+sign*.230,1.28,z+.279],[gx,.107,gz]],.0085,'#b9a179','cloth',14,6);
    beam([gx-.014*sign,.012,gz+.028],[gx+.017*sign,.17,gz-.035],.035,.039,P.walnut);
    rod([gx-.029,.122,gz-.008],[gx+.029,.122,gz-.008],.010,P.iron);
  }
  // Suspended sign on two short iron hangers fixed to the outer spar.
  for(const xx of [.722,2.57]){
    place(xx,2.748,3.122,()=>torus(0,0,0,.038,.0065,P.iron,'metal',16,6),0,pi/2);
    box(xx,2.664,3.135,.031,.155,.025,P.iron,'metal');pin(xx,2.620,3.156,.013);
  }
  box(1.644,2.456,3.135,2.503,.457,.055,P.walnut,'wood',.018);
  print('mainSign',1.644,2.456,3.164,2.481,.432);
}
export function buildShop(){zone('workroom');workbench();endRack();packingShelf();counter();canopy()}
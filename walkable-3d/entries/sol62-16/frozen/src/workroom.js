import { random, between } from './art.js';
import {
  bowl, plate, mug, crock, bottle, book, uprightBook, brassKnob, peg, herbBundle,
  cloth, candle, closedCrate, terracottaPot,
} from './vessels.js';
import { pendant } from './kitchen.js';

const PI=Math.PI;
const HALF=PI/2;
const TAU=PI*2;
const benchY=.968;

function drawer(a,x,y,z,h,w,painted = false) {
  a.soft(.040,h,w,x,y,z,painted?'greenWood':'walnut',0,a.tint(.12),true,.009);
  a.soft(.038,h-.027,w-.030,x+.020,y,z,painted?'painted':'oak',0,a.tint(.12),true,.007);
  for (const u of [-1,1]) {
    a.soft(.007,.034,.026,x+.043,y,z+u*w*.39,'forged',0,null,false,.004);
    a.ball(x+.048,y+.006,z+u*w*.393,.007,.008,.007,'brass',0,0,0,null,false);
  }
  a.tube([[x+.035,y+.014,z-.058],[x+.060,y-.005,z-.038],[x+.067,y-.010,z+.005],
    [x+.059,y-.006,z+.042],[x+.035,y+.011,z+.061]],.008,'brass',8,6,false);
}

function buildBench(a) {
  const x=-3.902, z=-3.340, w=1.264, depth=3.220;
  a.soft(w-.10,.112,depth-.14,x,.832,z,'darkOak');
  a.soft(.090,.149,depth-.109,-3.337,.826,z,'walnut');
  for (const dz of [-1.43,1.43]) {
    a.soft(w-.077,.142,.085,x,.829,z+dz,'walnut');
  }
  for(const dx of [-.507,.507]) for(const dz of [-1.413,1.413]) {
    a.soft(.133,.807,.142,x+dx,.43,z+dz,'darkOak',0,null,true,.016);
    a.soft(.157,.075,.161,x+dx,.805,z+dz,'honey');
    a.soft(.151,.064,.159,x+dx,.051,z+dz,'walnut');
    for(const yy of [.70,.787]) a.disc(.027,.013,x+dx+.069,yy,z+dz,'honey',0,0,HALF,null,false);
  }
  a.soft(.086,.107,2.877,-4.326,.218,z,'walnut');
  a.soft(.085,.101,2.7,-3.505,.195,z,'darkOak');
  for (let i=0;i<6;i++) {
    const xx=x+(i-2.5)*.209;
    a.soft(depth,.095,.207,xx,benchY-.047,z,i===5?'honey':'oak',HALF,a.tint(.16),true,.015);
    for (const dz of [-1.523,1.511]) a.disc(.008,.004,xx,benchY+.001,z+dz,'darkOak',0,0,0,null,false);
  }
  for (const zz of [-4.53,-3.79,-3.05,-2.31]) drawer(a,-3.273,.823,zz,.125,.681);
  a.soft(.440,.071,1.28,-4.098,.308,-3.86,'walnut');
  for (let i=0;i<5;i++) a.soft(.463,.032,.241,-4.088,.349,-4.343+i*.236,'oak',0,a.tint(.15),true,.008);
  closedCrate(a,-4.077,.366,-3.50,.415,.216,.474,'greenWood',-.073);
  closedCrate(a,-4.091,.366,-4.088,.420,.193,.487,'darkOak',.036);
  crock(a,-4.114,.011,-2.265,.168,.319,'terracottaDark',true,'ash',HALF);
  crock(a,-3.872,.011,-2.010,.112,.199,'ochreGlaze',true);
  a.shadow(-4.03,-4.09,1.06,1.54,.359);
}

function bell(a) {
  const x=-3.648,y=benchY,z=-2.254;
  a.shadow(x,z,.63,.63,y+.002);
  a.lathe([[0,0],[.94,0],[1,.18],[1,.34],[.91,.67],[.87,.88],[.78,1],[0,1]],
    'walnut',x,y+.007,z,.218,.058,.218,0,true,28);
  a.ring(.173,x,y+.064,z,'brass',-HALF,0,0,1,1,false);
  a.disc(.135,.011,x,y+.063,z,'soapstone',0,0,0,null,true,true);
  a.ring(.105,x,y+.070,z,'forged',-HALF,0,0,1,1,false);
  a.plane(.55,.55,x,y+.076,z,'halo',-HALF);
  const glass=[[.93,0],[1,.04],[1,.095],[.973,.110],[.968,.65],[.90,.76],
    [.81,.86],[.61,.93],[.30,.987],[0,1]];
  a.lathe(glass,'glassClear',x,y+.066,z,.178,.444,.178,0,false,30);
  a.lathe([[.27,.984],[.24,1.045],[.37,1.15],[.28,1.22],[0,1.23]],
    'glassBlue',x,y+.066,z,.15,.445,.15,0,false,22);
  a.tube([[x+.115,y+.144,z+.121],[x+.126,y+.268,z+.109],[x+.123,y+.360,z+.095],
    [x+.083,y+.451,z+.073]],.0037,'panes',11,5,false);

  const seed=[x-.002,y+.291,z+.006];
  for (let i=0;i<5;i++) {
    const phi=i*TAU/5+.25;
    a.ball(seed[0]+.022*Math.cos(phi), seed[1]+.008*Math.sin(phi*2), seed[2]+.022*Math.sin(phi),
      .031,.059,.018,i%2?'pearl':'magic',.24*Math.sin(phi),phi,.22*Math.cos(phi),null,false,true);
  }
  a.tube([[x-.008,y+.193,z+.006],[x+.021,y+.211,z+.005],
    [x-.018,y+.275,z+.007],[x+.017,y+.345,z+.002],[x-.009,y+.375,z+.008]],.0039,
  'root',12,5,false);
  for (const [xx,yy,zz,r] of [[-.081,.233,-.022,.013],[.083,.319,.019,.012],[.044,.185,.088,.009],
    [-.063,.354,.045,.009],[.091,.274,-.056,.008]]) {
    a.pebble(x+xx,y+yy,z+zz,r,r*1.26,r,'pearl',yy*19,null,false);
  }
  a.stamp('wake',.138,.061,x+.230,y+.067,z+.016,-HALF,0,1.4);
}

function mortarSet(a) {
  const x=-3.697,z=-3.324,y=benchY;
  a.soft(.623,.022,.621,x-.082,y+.013,z+.017,'soapstone',.079,null,true,.006);
  a.shadow(x,z,.49,.55,y+.027);
  const profile=[[0,0],[.66,0],[.735,.09],[.72,.17],[.81,.24],[.937,.52],[1,.87],
    [.993,1],[.84,.991],[.827,.890],[.72,.55],[.56,.34],[.35,.27],[0,.27]];
  a.lathe(profile,'slate',x,y+.025,z,.173,.121,.173,0,true,26);
  a.lathe([[.76,.19],[.80,.25],[.84,.30]],'limestone',x,y+.025,z,.174,.122,.174,0,false,26);
  a.tube([[x-.036,y+.085,z+.025],[x+.034,y+.169,z-.028],[x+.126,y+.249,z-.098]],
    .023,'limestone',11,9);
  a.ball(x-.029,y+.088,z+.023,.032,.032,.030,'slate',0,0,.05,null,true,true);
  a.ball(x+.129,y+.251,z-.101,.028,.034,.026,'slate',0,0,.05,null,true,true);
  const rng=random(2883);
  for (let i=0;i<31;i++) {
    const r=between(rng,.004,.008),ang=rng()*TAU;
    const rad=between(rng,.012,.083);
    const check = i%3===0;
    const xx=check?x+.20+between(rng,-.104,.069):x+rad*Math.cos(ang);
    const zz=check?z+.221+between(rng,-.082,.053):z+rad*Math.sin(ang);
    a.pebble(xx,y+(check?.029:.075),zz,r,r*.62,r*.82,i%4?'dryLeaf':'powder',rng()*TAU,null,false);
  }
  plate(a,-4.221,y,-3.121,.092,'blueCeramic','porcelain');
  a.ball(-4.228,y+.023,-3.123,.049,.014,.049,'powder',0,0,0,null,false);
}

function weighingScale(a,x,y,z) {
  a.shadow(x,z,.53,.5,y+.002);
  a.lathe([[0,0],[.97,0],[1,.14],[.86,.31],[.62,.44],[.45,.57],[.31,.97],[0,1]],
    'forged',x,y,z,.132,.066,.132,0,true,22);
  a.tube([[x,y+.062,z],[x,y+.122,z],[x+.017,y+.234,z],[x+.014,y+.389,z]],.018,'brass',10,8);
  a.ball(x+.014,y+.388,z,.034,.033,.030,'brass',0,0,0,null,true,true);
  a.rod([x+.020,y+.382,z-.245],[x+.019,y+.351,z+.244],.009,'brass',.009);
  a.rod([x+.033,y+.345,z],[x+.029,y+.442,z],.0038,'forged',.002,false);
  for (const side of [-1,1]) {
    const zz=z+side*.239, yy=y+(side<0?.206:.172);
    const join=[x+.020,y+(side<0?.380:.351),zz];
    a.ring(.016,...join,'brass',0,HALF,0,1,1.1,false);
    for (let i=0;i<3;i++) {
      const phi=i*TAU/3;
      a.rod(join,[x+.02+.087*Math.cos(phi),yy+.011,zz+.087*Math.sin(phi)],.0026,'brass',
        .0024,false);
    }
    a.lathe([[0,0],[.64,0],[.84,.28],[.985,.65],[1,1],[.925,1],[.8,.54],
      [.59,.38],[0,.37]],'brass',x+.02,yy,zz,.091,.018,.091,0,true,20);
    if (side<0) {
      for (let i=0;i<5;i++) {
        a.pebble(x+.008+(i%3)*.022,yy+.023,zz-.02+i*.012,.017,.015,.014,
          i%2?'powder':'pearl',i*.7,null,false);
      }
    }
  }
  for (let i=0;i<3;i++) {
    const xx=x+.14+.080*i,rr=.033-i*.006,zz=z-.11+i*.026;
    a.disc(rr,.036-i*.004,xx,y+.018,zz,'forged');
    a.disc(rr*.45,.016,xx,y+.043-i*.004,zz,'brass');
  }
}

function workSurface(a) {
  buildBench(a);
  bell(a);
  mortarSet(a);
  weighingScale(a,-3.946,benchY,-4.511);
  book(a,-3.64,benchY,-3.906,.379,.251,.051,'blueBook',HALF-.17,'ledger');
  bottle(a,-4.012,benchY,-3.826,.062,.123,'reagent','glassBlue','ink','iron',HALF);
  a.rod([-3.742,1.028,-3.773],[-3.491,1.028,-3.782],.0069,'honey',.0035,false);
  a.rod([-3.505,1.029,-3.782],[-3.473,1.029,-3.782],.0063,'tin',.0012,false);
  a.soft(.279,.012,.171,-3.547,benchY+.008,-4.199,'parchment',.12,null,true,.004);
  a.stamp('ash',.097,.055,-3.538,benchY+.015,-4.202,-HALF,0,.11);
  bottle(a,-4.302,benchY,-2.019,.080,.287,'round','glassBlue','water','moon',HALF,'wax');
  bottle(a,-4.279,benchY,-2.287,.067,.238,'reagent','glassOlive','infusion',null,1.2);
  candle(a,-3.846,benchY,-1.912,.037,.073);
  crock(a,-4.307,benchY,-3.643,.094,.161,'ochreGlaze',false);
  for(let i=0;i<5;i++) {
    const xx=-4.31+(i-2)*.021,zz=-3.645+(i%2)*.018;
    a.rod([xx,benchY+.10,zz],[xx+(i-2)*.020,benchY+.34+i*.018,zz+(i%3-1)*.042],
      .0053,i%2?'honey':'walnut',.0036,false);
  }
  cloth(a,[[-3.531,benchY+.006,-4.648],[-3.296,benchY+.004,-4.653],[-3.263,.947,-4.654],
    [-3.245,.823,-4.651],[-3.262,.727,-4.657]],.211,'stripedLinen',false);
}

function wallShelves(a) {
  const x=-4.32;
  for (const y of [1.589,2.097]) {
    a.soft(.384,.062,2.993,x,y,-3.514,'oak',0,null,true,.010);
    a.soft(.026,.023,2.986,x+.196,y-.012,-3.512,'honey',0,null,false,.006);
    for (const z of [-4.848,-2.269]) {
      a.beam([x-.15,y-.288,z],[x+.14,y-.04,z],.052,.059,'darkOak');
    }
  }
  for (const z of [-4.98,-2.03]) {
    a.soft(.093,.694,.096,-4.452,1.859,z,'walnut');
  }
  const bottleGroups = [
    [-4.83,.065,.245,'round','glassAmber','syrup','ash','ginger'],
    [-4.63,.078,.306,'round','glassOlive','infusion',null,'ginger'],
    [-4.41,.055,.199,'vial','glassBlue','water','moon','wax'],
    [-4.26,.054,.219,'reagent','glassClear','powder',null,'ginger'],
    [-4.10,.079,.271,'reagent','glassAmber','syrup','wake','ginger'],
    [-3.79,.060,.201,'vial','glassJam','jam',null,'wax'],
    [-3.61,.072,.261,'round','glassClear','infusion',null,'ginger'],
    [-3.26,.060,.300,'vial','glassOlive','ink','iron','ginger'],
    [-3.105,.052,.221,'vial','glassBlue','water',null,'ginger'],
    [-2.96,.055,.179,'vial','glassAmber','syrup',null,'ginger'],
    [-2.53,.076,.253,'reagent','glassOlive','infusion','moon','wax'],
  ];
  for (const [z,r,h,shape,glass,content,label,cap] of bottleGroups) {
    bottle(a,x,1.623,z,r,h,shape,glass,content,label,HALF+.13*Math.cos(z*4),cap);
  }
  for (const [z,r,h,mat,label] of [[-4.77,.106,.196,'porcelain','moon'],
    [-4.45,.098,.154,'blueCeramic',null],[-3.6,.126,.221,'ochreGlaze','ash'],
    [-3.28,.107,.180,'berryGlaze',null],[-2.65,.085,.179,'porcelain',null]]) {
    crock(a,x,2.132,z,r,h,mat,true,label,HALF);
  }
  for(let i=0;i<4;i++) plate(a,x,2.132+i*.018,-4.15,.115,i%2?'celadon':'porcelain','berryGlaze');
  closedCrate(a,x-.038,2.132,-2.275,.275,.199,.373,'greenWood',-.018);
  a.soft(.064,.073,1.087,x-.122,1.382,-2.729,'darkOak');
  for (const z of [-3.159,-2.905,-2.652,-2.398]) peg(a,x-.078,1.383,z,HALF);
  herbBundle(a,x+.015,1.353,-3.144,.260,-1,'silverLeaf');
  herbBundle(a,x+.015,1.349,-2.885,.215,-1,'dryLeaf');
  a.ring(.042,x+.018,1.319,-2.648,'copper',0,HALF,0,.86,1.2,false);
  a.rod([x+.017,1.29,-2.647],[x+.022,1.08,-2.654],.009,'forged',.006,false);
  wallFlowers(a);
}

function wallFlowers(a) {
  const x=-4.23,y=2.68,z=-1.66;
  a.tube([[-4.45,2.61,-1.67],[-4.321,2.662,-1.67],[-4.245,2.717,-1.69],
    [-4.185,2.664,-1.67]],.014,'forged',8,6);
  herbBundle(a,x,y-.017,z,.336,-1,'dryLeaf');
  herbBundle(a,x-.121,y-.033,z+.11,.231,-1,'burgundyLeaf');
}

const upperY=[.605,.998,1.421,1.860,2.288];

function libraryBase(a, x0, x1) {
  const center=(x0+x1)/2, w=x1-x0, z=-5.771;
  a.soft(w,.443,.525,center,.28,z,'greenWood',0,null,true,.016);
  a.soft(w+.061,.084,.563,center,.10,z+.005,'walnut');
  a.soft(w+.055,.067,.554,center,.527,z+.006,'oak');
  for (let i=0;i<2;i++) {
    const xx=x0+w*(i+.5)/2;
    a.soft(w*.46,.356,.031,xx,.313,-5.488,'paintedLite',0,a.tint(.11),true,.010);
    a.soft(w*.385,.261,.022,xx,.308,-5.467,'greenWood',0,null,true,.008);
    a.soft(.024,.043,.010,xx+(i===0?1:-1)*w*.13,.378,-5.446,'brass',0,null,false,.005);
    brassKnob(a,xx+(i===0?1:-1)*w*.13,.393,-5.441,0,.016);
  }
  for(let i=0;i<2;i++) a.soft(.082,.059,.115,x0+(i===0?.108:w-.108),.047,-5.555,'walnut');
}

function libraryFrame(a) {
  const edges=[-4.485,-3.207,-1.956,-.701,.632];
  for (let i=0;i<edges.length-1;i++) {
    const left=edges[i],right=edges[i+1],mid=(left+right)/2;
    libraryBase(a,left+.02,right-.02);
    for (let col=0;col<8;col++) {
      const w=(right-left)/8;
      a.box(w-.006,1.99,.030,left+(col+.5)*w,1.49,-5.963,'greenWood',0,a.tint(.21),false);
    }
    for (const y of upperY) {
      a.soft(right-left-.064,.061,.431,mid,y,-5.740,'oak',0,a.tint(.07),true,.012);
      a.box(right-left-.037,.017,.012,mid,y-.009,-5.519,'honey',0,null,false);
    }
  }
  for (const x of edges) {
    a.soft(.082,1.935,.466,x,1.482,-5.754,'darkOak',0,null,true,.014);
    a.soft(.045,1.913,.023,x,1.49,-5.513,'oak',0,a.tint(.12),false,.005);
    a.soft(.099,.099,.047,x,.56,-5.51,'honey');
    a.soft(.098,.072,.044,x,2.377,-5.513,'honey');
  }
  a.soft(5.210,.109,.504,-1.926,2.423,-5.751,'walnut');
  a.soft(5.246,.034,.511,-1.925,2.489,-5.754,'honey');
}

function bookCase(a, x, y, colors, index) {
  const rng=random(263+index);
  for (let i=0;i<colors.length;i++) {
    const w=between(rng,.049,.084);
    uprightBook(a,x+w/2,y,-5.728,w,between(rng,.203,.322),between(rng,.228,.310),colors[i],
      i===colors.length-1? .17 : between(rng,-.031,.035));
    x+=w+.012;
  }
}

function library(a) {
  libraryFrame(a);
  const row=upperY.map(y=>y+.031);
  const br=['redBook','blueBook','greenBook','redBook','barkBook','blueBook','greenBook','barkBook','redBook'];
  bookCase(a,-4.387,row[0],br,0);
  bookCase(a,-4.389,row[1],br.slice(2).concat('blueBook'),1);
  bookCase(a,-4.116,row[2],br.slice(3),2);
  for (let i=0;i<3;i++) book(a,-3.434,row[0]+.047*i,-5.714,.267,.225,.038,br[i],-.12+i*.16);
  for (let i=0;i<2;i++) book(a,-3.489,row[1]+.045*i,-5.708,.261,.224,.036,br[5+i],.11-i*.22);
  crock(a,-4.245,row[2],-5.711,.112,.156,'porcelain',true,'ash');
  for (const [x,w,h] of [[-4.196,.407,.213],[-3.712,.379,.167]]) {
    closedCrate(a,x,row[3],-5.735,w,h,.311,'walnut');
  }
  closedCrate(a,-3.964,2.506,-5.760,.583,.201,.379,'greenWood',.025);

  for (let j=0;j<4;j++) {
    const y=row[j];
    const xs=[-3.063,-2.838,-2.611,-2.396,-2.161];
    for (let i=0;i<xs.length;i++) {
      if ((i+j*3)%7===0) continue;
      const glass=['glassAmber','glassOlive','glassBlue','glassJam','glassClear'][(i+j*2)%5];
      const shape=['reagent','round','vial'][(i+j)%3];
      const r=(shape==='vial'?.052:.079) + .009*Math.sin(i*2.11+j);
      const content=['infusion','powder','syrup','ink','water'][(i+j)%5];
      const label=(j===2&&i%2===0)?['moon','iron','wake'][i%3]:null;
      bottle(a,xs[i],y,-5.741+.032*Math.sin(i+j),r,.219+.066*Math.sin(i*3.25-j*2.06),
        shape,glass,content,label,.14*Math.sin(i*2+j),'ginger');
    }
  }
  crock(a,-2.724,row[4],-5.755,.123,.159,'celadon',true,'moon');
  crock(a,-2.351,row[4],-5.739,.104,.127,'porcelain',true);
  bowl(a,-1.769,row[0],-5.718,.144,.102,'berryGlaze','ochreGlaze');
  bowl(a,-1.806,row[0]+.072,-5.714,.121,.070,'ochreGlaze');
  closedCrate(a,-1.109,row[0],-5.745,.469,.188,.340,'darkOak');
  crock(a,-1.672,row[1],-5.718,.112,.210,'porcelain',true,'ash');
  crock(a,-1.310,row[1],-5.722,.119,.176,'blueCeramic',true);
  crock(a,-.965,row[1],-5.721,.106,.229,'berryGlaze',true);
  for (let i=0;i<2;i++) book(a,-1.586,row[2]+i*.045,-5.732,.327,.240,.035,br[(i+4)%br.length],i*.13);
  a.ring(.057,-1.711,row[2]+.141,-5.711,'forged',.31,0,.7,.75,1.38,false);
  bottle(a,-1.080,row[2],-5.728,.089,.230,'round','glassBlue','ink','iron',0,'wax');
  herbBundle(a,-1.786,row[4]-.056,-5.595,.195,-1,'dryLeaf');
  herbBundle(a,-1.489,row[4]-.054,-5.583,.223,-1,'burgundyLeaf');
  herbBundle(a,-1.200,row[4]-.053,-5.603,.183,-1,'silverLeaf');
  const urn=terracottaPot(a,-.979,row[4],-5.723,.142,.123,'terracottaDark');
  herbBundle(a,-.976,urn,-5.72,.193,1,'dryLeaf');
  closedCrate(a,-.254,row[0],-5.742,.531,.215,.341,'darkOak');
  mug(a,.351,row[0],-5.749,.080,.124,'celadon',null,1.71);
  for (const [x,y,mat] of [[-.464,1,'blueCeramic'],[-.173,1,'ochreGlaze'],[.129,1,'porcelain'],
    [.399,1,'terra'],[-.403,2,'celadon'],[.02,2,'berryGlaze'],[.352,2,'ochreGlaze']]) {
    crock(a,x,row[y],-5.716,.094,.137+Math.abs(x)*.17,mat==='terra'?'terracotta':mat,true,
      x>.10 && y===1?'salt':null,0);
  }
  bookCase(a,-.566,row[3],br.slice(1,6),3);
  for (let i=0;i<2;i++) book(a,.347,row[3]+i*.048,-5.720,.259,.205,.040,br[i+4],i*.23);
  closedCrate(a,.108,row[4],-5.748,.511,.155,.326,'greenWood');
}

function eastCabinet(a) {
  const x=.645,z=-2.186;
  a.soft(.39,.661,1.307,x,.410,z,'greenWood');
  a.soft(.452,.079,1.366,x-.015,.778,z,'walnut');
  a.soft(.421,.091,1.293,x,.100,z,'oak');
  for (let i=0;i<4;i++) {
    const zz=z+(i-1.5)*.307;
    for(let j=0;j<3;j++) {
      const y=.221+j*.172;
      a.soft(.049,.147,.285,x-.197,y,zz,'paintedLite',0,a.tint(.18),true,.007);
      a.soft(.030,.123,.260,x-.223,y,zz,'painted',0,null,true,.006);
      brassKnob(a,x-.247,y-.013,zz,-HALF,.012);
    }
  }
  const y=.82;
  const pottery=terracottaPot(a,x-.043,y,z+.321,.139,.178,'terracotta');
  herbBundle(a,x-.043,pottery,z+.321,.286,1,'limeLeaf');
  bottle(a,x-.039,y,z-.386,.065,.234,'reagent','glassAmber','syrup',null,-HALF);
  crock(a,x-.010,y,z-.125,.092,.168,'porcelain',true,'moon',-HALF);
  a.soft(.089,.199,.682,.859,1.496,z+.068,'walnut');
  for (const zz of [z-.214,z+.356]) {
    a.rod([.867,1.496,zz],[.997,1.496,zz],.019,'forged',.019,false);
    a.ball(.808,1.496,zz,.012,.018,.018,'brass',0,0,0,null,false);
  }
  a.stamp('glasshouse',.615,.159,.807,1.506,z+.069,0,-HALF);
  a.ring(.098,.795,1.172,z-.323,'brass',0,HALF,0,.86,1.1,false);
  a.ring(.071,.795,1.181,z-.133,'forged',0,HALF,0,.96,1.1,false);
}

export function workroomFurniture(a) {
  workSurface(a);
  wallShelves(a);
  library(a);
  eastCabinet(a);
  pendant(a,-3.36,2.50,-4.00,.256,2.94);
}

import { random, between } from './art.js';
import {
  bowl, plate, mug, crock, bottle, book, brassKnob, peg, herbBundle, cloth, candle, closedCrate,
} from './vessels.js';

const PI= Math.PI;
const HALF= PI / 2;

function counterDoors(a, x, z, width) {
  const bottom=.128, top=.840, drawer=.158;
  a.soft(.069,top-bottom,width-.014,x,(bottom+top)/2,z,'paintedLite',0,null,true,.011);
  a.soft(.025,.444,width-.111,x+.037,.390,z,'painted',0,null,true,.008);
  for (const y of [.174,.604,.674,.805]) a.soft(.033,.041,width-.040,x+.047,y,z,'paintedLite',
    0,a.tint(.07),false,.006);
  for (const edge of [-1,1]) {
    a.soft(.037,.491,.045,x+.046,.389,z+edge*(width*.5-.044),'paintedLite');
    for (const y of [.267,.546]) a.soft(.010,.038,.028,x+.072,y,z+edge*(width*.5-.049),'forged',
      0,null,false,.003);
  }
  a.soft(.038,drawer,width-.074,x+.042,.743,z,'painted',0,a.tint(.08),true,.009);
  brassKnob(a,x+.068,.742,z,HALF,.020);
  brassKnob(a,x+.068,.545,z-width*.29,HALF,.018);
}

function legs(a,x,z,w,d,tableY,width,mat) {
  for (const side of [-1,1]) for (const end of [-1,1]) {
    const xx=x+side*w/2, zz=z+end*d/2;
    a.beam([xx+side*.033,.035,zz+end*.025],[xx,tableY,zz],width,width,mat);
    a.soft(width*1.17,.075,width*1.17,xx,tableY-.039,zz,'darkOak',0,null,true,.012);
  }
}

function sink(a,xStart,xEnd,zCenter,zWidth) {
  const x=(xStart+xEnd)/2;
  a.soft(xEnd-xStart+.018,.032,zWidth+.039,x,.758,zCenter,'blueCeramic');
  for (const z of [zCenter-zWidth/2,zCenter+zWidth/2]) {
    a.soft(xEnd-xStart+.048,.177,.069,x,.837,z,'blueCeramic',0,null,true,.024);
    a.soft(xEnd-xStart+.064,.036,.080,x,.909,z,'celadon',0,null,true,.013);
  }
  for (const xx of [xStart,xEnd]) {
    a.soft(.064,.174,zWidth+.048,xx,.837,zCenter,'blueCeramic',0,null,true,.022);
    a.soft(.076,.038,zWidth+.061,xx,.910,zCenter,'celadon',0,null,true,.014);
  }
  a.disc(.056,.008,x-.06,.78,zCenter,'iron',0,0,0,null,false,true);
  a.ring(.040,x-.06,.785,zCenter,'tin',-HALF,0,0,1,1,false);
  for (let i=0;i<6;i++) {
    const angle=i*PI/3;
    a.disc(.005,.005,x-.06+.026*Math.sin(angle),.785,zCenter+.026*Math.cos(angle),'contrast',
      0,0,0,null,false);
  }
  a.disc(.061,.025,xStart-.008,.935,zCenter,'copper');
  a.tube([[xStart-.008,.94,zCenter],[xStart-.005,1.119,zCenter],[xStart+.064,1.224,zCenter],
    [xStart+.205,1.227,zCenter],[xStart+.28,1.157,zCenter]],.019,'copper',18,10);
  a.disc(.031,.037,xStart+.28,1.153,zCenter,'brass');
  for (const z of [zCenter-.143,zCenter+.143]) {
    a.disc(.033,.018,xStart+.012,.936,z,'brass');
    a.rod([xStart+.012,.94,z],[xStart+.012,.989,z],.013,'copper');
    a.rod([xStart-.024,.990,z],[xStart+.051,.990,z],.010,'brass');
    a.ball(xStart+.053,.990,z,.012,.012,.012,'porcelain');
  }
  const xs=xStart+.164,zs=zCenter-.235;
  plate(a,xs,.782,zs,.099,'porcelain','ochreGlaze');
  a.ball(xs+.041,.81,zs+.018,.052,.022,.032,'linen',0,-.3);
}

function kitchenCounter(a) {
  a.soft(.709,.741,3.35,-4.107,.48,2.069,'painted',0,null,true,.019);
  a.soft(.741,.106,3.39,-4.184,.075,2.07,'darkOak');
  const ends=[.39,1.21,2.00,2.83,3.74];
  for (let i=0;i<ends.length-1;i++) counterDoors(a,-3.752,(ends[i]+ends[i+1])/2,ends[i+1]-ends[i]);
  const start=.358,end=3.741,sinkZ=2.406,sinkWidth=.751;
  for (const [a0,a1] of [[start,sinkZ-sinkWidth/2],[sinkZ+sinkWidth/2,end]]) {
    a.soft(.907,.094,a1-a0,-4.113,.903,(a0+a1)/2,'soapstone',0,a.tint(.08),true,.017);
  }
  a.soft(.157,.093,sinkWidth,-4.506,.902,sinkZ,'soapstone',0,null,true,.014);
  a.soft(.121,.088,sinkWidth,-3.722,.901,sinkZ,'soapstone',0,null,true,.012);
  a.soft(.105,.063,3.39,-4.53,.975,2.06,'limestone',0,null,true,.008);
  sink(a,-4.411,-3.811,sinkZ,sinkWidth);
  const colors=['porcelain','celadon','porcelain','porcelain','blueCeramic','celadon'];
  for (let row=0;row<3;row++) for (let col=0;col<21;col++) {
    a.soft(.021,.063,.156,-4.50,1.011+row*.068,.437+col*.157,
      colors[(col+row*2)%colors.length],0,a.tint(.12),false,.006);
  }
  a.shadow(-3.83,1.04,1.15,.84,.954);
  a.shadow(-4.02,3.21,.98,.66,.954);
  cookPrep(a);
  dryingRack(a,-4.22,.951,3.23);
}

function dryPear(a,x,y,z,r,turn=0) {
  const profile=[[0,0],[.40,0],[.76,.10],[.97,.22],[1,.34],[.91,.49],[.64,.66],
    [.43,.82],[.37,.91],[.24,.97],[0,1]];
  a.lathe(profile,'fruitGreen',x,y,z,r,r*1.65,r,turn,true,19);
  a.rod([x,y+r*1.58,z],[x+r*.15,y+r*1.95,z-r*.16],r*.067,'root',r*.034,false);
  a.ball(x+r*.20,y+r*1.64,z-r*.09,r*.21,r*.043,r*.09,'darkLeaf',.13,turn,.34,null,false);
}

function boardSlice(a,x,y,z,angle,s) {
  a.ball(x,y+.016,z,.053*s,.020,.093*s,'fruitGreen',0,angle,0,null,true,true);
  a.ball(x,y+.027,z,.049*s,.012,.089*s,'fruitCut',0,angle,0,null,true,true);
  a.ball(x-.011,y+.037,z+.009,.009*s,.004,.025*s,'ochreGlaze',0,angle,0,null,false);
  a.ball(x-.009,y+.040,z+.006,.004*s,.003,.013*s,'root',0,angle,0,null,false);
}

function knife(a,x,y,z,angle) {
  const s=Math.sin(angle),c=Math.cos(angle);
  a.soft(.048,.013,.112,x-s*.096,y+.009,z-c*.096,'walnut',angle,null,true,.006);
  a.soft(.059,.007,.149,x+s*.035,y+.006,z+c*.035,'tin',angle,null,true,.003);
  a.soft(.058,.013,.024,x-s*.041,y+.010,z-c*.041,'forged',angle,null,true,.005);
  for (const o of [-.124,-.084]) a.disc(.007,.005,x+s*o,y+.019,z+c*o,'brass',0,0,0,null,false);
}

function cookPrep(a) {
  const rng=random(266);
  const x=-3.949,y=.952,z=.916;
  a.soft(.388,.040,.504,x,y+.017,z,'honey',-.17,null,true,.019);
  a.ring(.020,x+.14,y+.041,z-.18,'walnut',-HALF,0,0,1,1,false);
  dryPear(a,x-.081,y+.038,z-.131,.054,.4);
  for (let i=0;i<4;i++) boardSlice(a,x+.022+(i&1)*.045,y+.036+(i>1?.008:0),z+.017+i*.036,-.62+i*.31,.96-i*.08);
  a.tube([[x-.159,y+.049,z+.105],[x-.104,y+.053,z+.133],[x-.059,y+.054,z+.085],
    [x-.139,y+.057,z+.025]],.007,'fruitGreen',10,6,false);
  knife(a,x+.121,y+.038,z-.032,.24);
  for (let i=0;i<12;i++) {
    a.pebble(x+between(rng,-.138,.052),y+.042,z+between(rng,-.105,.142),
      between(rng,.003,.009),.0025,between(rng,.004,.010),'fruitCut',rng()*6.3,null,false);
  }
  book(a,-4.05,.952,1.499,.336,.252,.038,'redBook',HALF-.237,'recipe');
  mug(a,-3.899,.972,1.828,.064,.105,'berryGlaze','teaLiquid',.49);
  plate(a,-3.899,.950,1.828,.113,'porcelain','berryGlaze');
  a.rod([-3.909,.977,1.956],[-3.818,.976,2.046],.009,'tin',.006,false);
  a.ball(-3.813,.978,2.051,.031,.004,.018,'tin',0,.67,0,null,false);
  crock(a,-4.387,.951,.618,.091,.134,'ochreGlaze',true,'salt',HALF);
  crock(a,-4.429,.951,1.187,.099,.167,'porcelain',true,'tea',1.35);
  bottle(a,-4.374,.955,1.623,.064,.246,'reagent','glassOlive','syrup',null,HALF);
  plate(a,-4.295,.951,1.887,.12,'celadon',null);
  for (let i=0;i<7;i++) {
    const ang=-.8+i*.27;
    const xx=-4.295+.072*Math.cos(ang),zz=1.887+.071*Math.sin(ang);
    a.rod([-4.309,.979,1.900],[xx,.983,zz],.0028,'stem',.0017,false);
    for(let j=0;j<2;j++) a.ball(xx-j*.017,.985,zz+.005+j*.012,.017,.003,.008,
      j%2?'limeLeaf':'leaf',0,ang,0,null,false);
  }
  cloth(a,[[-3.855,.954,3.405],[-3.716,.954,3.404],[-3.663,.915,3.405],
    [-3.646,.777,3.402],[-3.653,.658,3.4]],.253);
  for (let i=0;i<18;i++) {
    const zz=3.29+i*.0135;
    a.rod([-3.653,.66,zz],[-3.654,.645,zz+.004],.0025,'rope',.0018,false);
  }
}

function dryingRack(a,x,y,z) {
  a.soft(.34,.031,.435,x,y+.017,z,'darkOak',0,null,true,.01);
  for (const dx of [-.14,.14]) a.soft(.023,.039,.426,x+dx,y+.040,z,'honey');
  for (let i=0;i<7;i++) {
    const zz=z+(i-3)*.056;
    a.rod([x-.128,y+.035,zz],[x+.065,y+.172,zz],.012,'honey');
  }
  for (const [dz,mat,r] of [[-.109,'porcelain',.114],[-.047,'celadon',.095],[.014,'porcelain',.112]]) {
    a.disc(r,.015,x-.027,y+.116,z+dz,mat,1.30,.091,0,null,true,true);
    a.ring(r*.832,x-.027,y+.121,z+dz+.010,'blueCeramic',-.237,.091,0,1,1,false);
  }
  mug(a,x+.159,y+.004,z+.131,.068,.088,'blueCeramic',null,1.12);
}

function range(a) {
  const x=-4.107,z=-.257,y=.900;
  a.soft(.98,.055,1.31,x+.041,.03,z,'slate',0,null,true,.023);
  for (const dx of [-.33,.33]) for (const dz of [-.45,.45]) {
    a.soft(.098,.180,.099,x+dx,.138,z+dz,'iron');
    a.soft(.125,.035,.116,x+dx,.074,z+dz,'forged');
  }
  a.soft(.825,.676,1.127,x,.487,z,'iron',0,null,true,.046);
  a.soft(.947,.071,1.183,x+.019,y-.054,z,'forged',0,null,true,.022);
  a.soft(.960,.056,1.237,x+.018,y-.037,z,'iron',0,null,true,.015);
  const face=x+.435;
  a.soft(.051,.349,.627,face,.587,z-.188,'forged');
  a.soft(.027,.291,.573,face+.033,.583,z-.188,'iron',0,null,true,.019);
  a.soft(.028,.238,.507,face+.047,.583,z-.188,'contrast',0,null,false,.012);
  for (let i=0;i<6;i++) {
    const zz=z-.397+i*.076;
    a.pebble(face+.070,.494,zz,.026,.042,.045,i%2?'ember':'hot',i*.8);
    a.pebble(face+.055,.535,zz+.022,.014,.027,.028,'ember',i*.6,null,false);
  }
  for (let i=0;i<7;i++) {
    const zz=z-.420+i*.076;
    a.rod([face+.099,.478,zz],[face+.097,.692,zz],.010,'forged',.010,false);
  }
  a.rod([face+.116,.69,z-.35],[face+.116,.69,z-.04],.018,'brass');
  for (const zz of [z-.346,z-.047]) a.rod([face+.036,.691,zz],[face+.119,.691,zz],.013,'iron');
  a.soft(.053,.317,.313,face,.560,z+.331,'forged');
  a.soft(.032,.260,.263,face+.030,.560,z+.331,'iron');
  brassKnob(a,face+.065,.594,z+.331,HALF,.028);
  a.soft(.063,.105,.966,face,.296,z,'forged');
  a.soft(.024,.066,.847,face+.038,.295,z,'iron');
  a.rod([face+.068,.293,z-.095],[face+.068,.293,z+.095],.013,'brass');
  for (const zz of [z-.33,z+.31]) {
    a.disc(.184,.022,x+.142,y-.005,zz,'iron',0,0,0,null,true,true);
    for (const r of [.128,.171]) a.ring(r,x+.142,y+.008,zz,'forged',-HALF,0,0,1,1,false);
  }
  a.rod([x-.224,.874,z-.285],[x-.224,2.856,z-.285],.093,'iron',.087);
  a.disc(.155,.038,x-.224,1.58,z-.285,'forged');
  a.disc(.160,.044,x-.224,2.56,z-.285,'forged');
  kettle(a,x+.123,y+.004,z-.345);
  pan(a,x+.115,y+.006,z+.335);
}

function kettle(a,x,y,z) {
  a.lathe([[0,0],[.69,0],[.88,.075],[.99,.31],[1,.49],[.95,.66],[.79,.81],
    [.56,.91],[.54,1],[0,1]],'copper',x,y,z,.155,.197,.155,0,true,30);
  a.ring(.149,x,y+.059,z,'forged',-HALF,0,0,1,1,false);
  a.lathe([[0,0],[.98,0],[1,.19],[.84,.45],[.47,.63],[.24,.70],
    [.22,1],[0,1]],'copper',x,y+.192,z,.090,.035,.09,0,true,23);
  a.ball(x,y+.236,z,.019,.016,.019,'walnut');
  a.tube([[x+.105,y+.079,z-.045],[x+.187,y+.107,z-.061],[x+.211,y+.186,z-.094],
    [x+.252,y+.228,z-.126]],.024,'copper',14,10);
  a.tube([[x-.103,y+.138,z-.036],[x-.126,y+.251,z-.021],[x-.044,y+.288,z+.006],
    [x+.080,y+.274,z+.025],[x+.120,y+.139,z+.039]],.014,'forged',18,8);
  a.tube([[x-.092,y+.271,z-.012],[x-.044,y+.288,z+.006],[x+.024,y+.285,z+.019],
    [x+.067,y+.279,z+.024]],.024,'walnut',9,8);
}

function pan(a,x,y,z) {
  a.lathe([[0,0],[.52,0],[.66,.07],[.83,.28],[1,.80],[1,1],[.91,1],[.90,.88],
    [.77,.59],[.58,.41],[0,.38]],'forged',x,y,z,.138,.046,.138,0,true,25);
  a.tube([[x+.101,y+.028,z+.070],[x+.180,y+.040,z+.112],[x+.282,y+.051,z+.16]],.018,
    'walnut',9,8);
  a.ball(x+.022,y+.023,z-.018,.070,.006,.051,'teaLiquid',0,.2,0,null,false);
  for (const [dx,dz] of [[-.042,.036],[.047,.018],[.019,-.034]]) {
    a.ball(x+dx,y+.033,z+dz,.028,.009,.043,'fruitCut',0,dx*16,0,null,false);
  }
}

function kitchenShelves(a) {
  const x=-4.372;
  for (const z of [.459,1.176]) {
    a.beam([-4.49,1.98,z],[-4.24,2.10,z],.065,.063,'walnut');
  }
  a.soft(.265,.056,.845,x,2.136,.814,'oak',0,null,true,.012);
  a.soft(.255,.053,.696,x,1.655,.829,'darkOak',0,null,true,.010);
  crock(a,x,2.172,.495,.088,.176,'celadon',true,'flour',HALF);
  crock(a,x-.007,2.171,.730,.086,.124,'ochreGlaze');
  crock(a,x,2.171,.921,.078,.136,'porcelain',true,'salt',HALF);
  for (let i=0;i<5;i++) plate(a,x,1.685+i*.018,.891,.104,i%2?'celadon':'porcelain','blueCeramic');
  bottle(a,x,1.682,.592,.063,.198,'vial','glassJam','jam','pear',HALF,'wax');
  for (const z of [.58,.84,1.09]) {
    peg(a,-4.48,1.588,z,HALF);
    a.ring(.035,-4.39,1.515,z,'forged',0,HALF);
    const m=z>.9?'copper':'tin';
    a.rod([-4.382,1.506,z],[-4.388,1.313,z+.013],.009,'walnut',.006,false);
    a.ball(-4.396,1.283,z+.013,.015,.048,.033,m,0,0,0,null,false);
  }
  herbBundle(a,-4.33,2.494,-.995,.308,-1,'dryLeaf');
  herbBundle(a,-4.36,2.465,.293,.218,-1,'silverLeaf');
  a.rod([-4.50,2.438,-1.05],[-4.26,2.438,.359],.015,'forged');
  a.soft(.277,.063,.609,x,1.746,3.916,'oak');
  for (let i=0;i<3;i++) {
    const z=3.72+i*.202;
    mug(a,x,1.778,z,.060,.090,['porcelain','celadon','blueCeramic'][i],null,1.6);
    peg(a,-4.48,1.704,z,HALF);
  }
}

function chair(a,x,z,angle,rust = false) {
  const c=Math.cos(angle),s=Math.sin(angle);
  const at=(lx,lz) => [x+lx*c+lz*s,z-lx*s+lz*c];
  const box=(w,h,d,lx,y,lz,m) => {
    const [xx,zz]=at(lx,lz); a.soft(w,h,d,xx,y,zz,m,angle,null,true,.014);
  };
  box(.440,.056,.451,0,.474,0,'honey');
  for (const q of [-1,1]) {
    for (const end of [-1,1]) {
      const [xx,zz]=at(q*.163,end*.168);
      const [bx,bz]=at(q*.193,end*.195);
      a.beam([bx,.034,bz],[xx,end===1?.933:.482,zz],.048,.048,'darkOak');
    }
    box(.035,.041,.383,q*.173,.245,0,'oak');
  }
  for (const y of [.648,.755,.876]) box(.365,.044,.052,0,y,.172,'oak');
  box(.416,.097,.064,0,.934,.172,'honey');
  if (rust) {
    box(.323,.023,.314,0,.511,-.018,'stripedLinen');
    const [xx,zz]=at(.05,.17);
    cloth(a,[[xx-.103,.979,zz],[xx+.008,.985,zz],[xx+.089,.956,zz+.014],
      [xx+.104,.856,zz+.021],[xx+.108,.735,zz+.018]],.133,'stripedLinen',false);
  }
}

function diningTable(a) {
  const x=-.10,z=1.494,y=.771;
  legs(a,x,z,1.213,.860,y,.096,'darkOak');
  for (const zz of [z-.419,z+.419]) a.soft(1.284,.125,.076,x,y-.105,zz,'walnut');
  for (const xx of [x-.602,x+.602]) a.soft(.075,.125,.882,xx,y-.105,z,'walnut');
  const palette=[0xf4e7d1,0xeedbc6,0xe9d4b6,0xf2e8cd,0xe7cda9];
  for (let i=0;i<5;i++) a.soft(1.468,.057,.216,x,y,z+(i-2)*.220,'honey',0,palette[i],true,.012);
  for (let i=0;i<7;i++) {
    const zz=z+(i-3)*.156;
    a.disc(.011,.005,x-.689,y+.030,zz,'darkOak',0,0,0,null,false);
    a.disc(.011,.005,x+.689,y+.030,zz,'darkOak',0,0,0,null,false);
  }
  cloth(a,[[-.813,.678,z],[-.833,.748,z],[-.811,.800,z],[-.275,.801,z],
    [.424,.801,z],[.650,.795,z],[.659,.739,z],[.650,.692,z]],.323,'linen',true);
  const t=.803;
  plate(a,-.286,t,z+.260,.142,'porcelain','blueCeramic');
  bowl(a,-.286,t+.017,z+.260,.103,.049,'celadon','porcelain');
  mug(a,-.578,t,z+.207,.062,.090,'porcelain',null,-.67);
  a.rod([-.050,t+.013,z+.190],[-.054,t+.015,z+.355],.0065,'tin',.004,false);
  a.ball(-.050,t+.014,z+.178,.017,.005,.025,'tin',0,.11,0,null,false);
  bowl(a,.228,t,z-.083,.156,.070,'blueCeramic');
  dryPear(a,.198,t+.036,z-.121,.053);
  dryPear(a,.279,t+.033,z-.026,.052,2.2);
  for (const [xx,zz,ss] of [[.132,z-.063,.057],[.251,z-.165,.044]]) {
    a.ball(xx,t+.068,zz,ss,ss*.86,ss,'fruit',.3,.18,0,null,true,true);
    a.rod([xx,t+.106,zz],[xx-.012,t+.124,zz+.004],.004,'root',.002,false);
  }
  a.soft(.217,.028,.137,.408,t+.019,z+.225,'stripedLinen',-.19);
  candle(a,-.422,t,z-.231,.033,.094,false);
  chair(a,-.223,2.354,0,true);
  chair(a,-.212,.625,PI,false);
}

function pressedHerb(a,x,y,z) {
  a.soft(.039,.392,.299,x,y,z,'walnut',0,null,true,.016);
  a.soft(.008,.348,.254,x-.024,y,z,'parchment',0,null,false,.005);
  a.tube([[x-.031,y-.148,z+.033],[x-.031,y-.064,z+.018],
    [x-.031,y+.021,z+.010],[x-.031,y+.126,z-.028]],.003,'root',11,5,false);
  for(let i=0;i<7;i++) {
    const s=i%2?-1:1;
    const yy=y-.094+i*.032,zz=z+.024-i*.008;
    a.ball(x-.034,yy+.015,zz+s*.032,.004,.018,.037,
      i%3?'dryLeaf':'silverLeaf',s*.63,0,0,null,false);
  }
  for (const yy of [y-.185,y+.185]) a.soft(.017,.019,.283,x-.020,yy,z,'honey',0,null,false,.005);
  for (const zz of [z-.14,z+.14]) a.soft(.017,.372,.018,x-.020,y,zz,'honey',0,null,false,.005);
  a.plane(.259,.351,x-.041,y,z,'panes',0,-HALF);
}

function kitchenSide(a) {
  pressedHerb(a,.838,1.449,-.365);
  const x=.677,z=-.427;
  a.soft(.453,.605,.87,x,.416,z,'painted');
  a.soft(.508,.062,.93,x,.748,z,'oak');
  a.soft(.051,.487,.360,x-.235,.417,z-.219,'paintedLite');
  a.soft(.051,.487,.360,x-.235,.417,z+.219,'paintedLite');
  for (const dz of [-.075,.075]) brassKnob(a,x-.269,.515,z+dz,-HALF,.019);
  for (const xx of [x-.152,x+.152]) for (const zz of [z-.354,z+.354]) {
    a.soft(.056,.169,.061,xx,.095,zz,'darkOak');
  }
  crock(a,x-.014,.779,z-.225,.110,.169,'ochreGlaze',false);
  herbBundle(a,x-.03,.880,z-.225,.211,1,'leaf');
  crock(a,x+.043,.779,z+.096,.096,.181,'porcelain',true,'flour',-1.38);
  const rackX=-.58,rackZ=4.386;
  a.soft(1.15,.098,.089,rackX,1.736,rackZ,'honey');
  for (const dx of [-.39,-.14,.112,.38]) peg(a,rackX+dx,1.741,rackZ-.061,PI);
  a.tube([[rackX-.145,1.725,4.244],[rackX-.215,1.654,4.23],
    [rackX-.219,1.558,4.21],[rackX-.088,1.566,4.219],
    [rackX-.080,1.656,4.24],[rackX-.145,1.725,4.244]],.008,'rope',12,5,false);
  for (let i=0;i<7;i++) {
    const x0=rackX-.267+i*.036;
    const m=(i===1||i===5)?'stripedLinen':'linen';
    a.panel([x0,1.56,4.218],[x0+.037,1.554,4.21],[x0+.057,1.244,4.228],
      [x0-.015,1.251,4.233],m);
    a.panel([x0-.015,1.251,4.233],[x0+.057,1.244,4.228],[x0+.053,.943,4.273],
      [x0-.025,.957,4.262],m);
  }
  a.ring(.026,rackX+.379,1.691,4.229,'brass');
  a.rod([rackX+.379,1.679,4.228],[rackX+.354,1.575,4.228],.008,'brass');
  a.box(.041,.018,.012,rackX+.361,1.577,4.228,'brass',0,null,false);
  a.plane(.86,.586,-1.77,.007,3.998,'rug',-HALF,0,.018);
  for (let i=0;i<22;i++) a.rod([-2.17+i*.037,.009,3.723],[-2.17+i*.037,.008,3.671],
    .005,i%3?'rope':'stripedLinen',.005,false);
}

export function pendant(a,x,y,z,size,top=2.89) {
  a.disc(size*.23,.043,x,top-.019,z,'forged');
  a.rod([x,top-.048,z],[x,y+size*.35,z],size*.035,'forged');
  a.lathe([[0,0],[.49,0],[.72,.10],[.93,.32],[1,.52],[.93,.70],[.69,.90],[.39,1],[0,1]],
    'lightWarm',x,y-size*.41,z,size*.60,size*.82,size*.60,0,false,20);
  a.disc(size*.66,.029,x,y+size*.30,z,'forged');
  a.disc(size*.405,.023,x,y-size*.365,z,'brass');
  for (let i=0;i<6;i++) {
    const phi=i*PI/3;
    const pos=(s,h) => [x+Math.cos(phi)*size*s,y+size*h,z+Math.sin(phi)*size*s];
    a.tube([pos(.31,.356),pos(.62,.12),pos(.63,-.12),pos(.41,-.359)],
      size*.024,'forged',8,6,false);
  }
  a.ball(x,y-size*.463,z,size*.087,size*.091,size*.087,'brass');
}

export function kitchenFurniture(a) {
  kitchenCounter(a);
  range(a);
  kitchenShelves(a);
  diningTable(a);
  kitchenSide(a);
  pendant(a,-2.25,2.61,1.92,.268,2.93);
  pendant(a,-.36,2.19,.81,.241,2.93);
  closedCrate(a,-4.302,0,4.169,.398,.282,.435,'walnut',.01);
  a.soft(.307,.037,.320,-4.294,.310,4.162,'stripedLinen',.12,null,true,.018);
  a.soft(.287,.030,.309,-4.288,.338,4.159,'linen',.095,null,true,.014);
  bowl(a,-4.195,.004,3.969,.092,.037,'blueCeramic','porcelain');
}

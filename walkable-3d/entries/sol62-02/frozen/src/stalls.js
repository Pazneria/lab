import { CylinderGeometry, DoubleSide } from "three";
import { Batch, canopy, crate, bowl, paperLantern, sign } from "./geometry.js";
import { enamelSign, random } from "./materials.js";

function trestle(b,m,x,z,w,d,top,color) {
  for (const side of [-1,1]) for (const end of [-1,1]) {
    b.box(m.woodDark,x+side*(w/2-.13),top/2,z+end*(d/2-.095),.093,top,.091,0xbfa485);
  }
  b.box(m.wood,x,top-.027,z,w,.101,d,color);
  b.box(m.woodDark,x,top-.12,z+d/2-.045,w-.08,.12,.060,0xa68a70);
  for (const side of [-1,1]) {
    b.box(m.woodDark,x+side*(w/2-.106),.29,z,.083,.067,d-.08,0xb89d83);
    b.rod(m.woodDark,[x+side*(w/2-.1),.22,z+d/2-.099],[x+side*(w/2-.1),top-.17,z-d/2+.1],.026,0xa78567);
  }
  b.block(x,z,w,d);
  b.decal("shadow",x,z,w+.4,d+.56,0x171521,.47);
}

function leaf(b,m,x,y,z,length,width,turn,dy,color) {
  const c = Math.cos(turn), s = Math.sin(turn);
  b.sheet(m.foliage,(u,v)=>{
    const a = length * v;
    const side = (u-.5) * width * (Math.sin(Math.PI*v) ** .80);
    const crest = (.5-Math.abs(u-.5)) * Math.sin(v*Math.PI) * .052;
    return [x + c*a - s*side,y + Math.sin(v*1.8)*dy + crest,z + s*a + c*side];
  },4,5,color);
}

function citrus(b,m,x,y,z,r,shade,turn) {
  b.orb(m.skin,x,y+r*.79,z,r,r*.82,r*.95,shade,(turn-.5)*.25,turn);
  b.rod(m.woodDark,[x,y+r*1.52,z],[x+.009,y+r*1.68,z],.008,0x8f8154,5);
  for (let p = 0; p < 4; p++) leaf(b,m,x,y+r*1.51,z,r*.48,r*.45,p*Math.PI/2+turn,-.008,0x68784a);
}

function pear(b,m,x,y,z,s,shade) {
  const p=[[0,0],[.031,.006],[.064,.024],[.072,.052],[.058,.092],[.036,.131],[.031,.163],[.02,.179],[0,.18]];
  b.lathe(m.skin,x,y,z,p.map(([r,h])=>[r*s,h*s]),shade,11);
  b.rod(m.woodDark,[x,y+.177*s,z],[x+.019*s,y+.211*s,z+.008*s],.006,0x7f754d,5);
}

function bunch(b,m,x,y,z,turn,scale) {
  b.orb(m.skin,x,y+.03,z,.054*scale,.063*scale,.067*scale,0xb24b58,turn*.13);
  b.rod(m.skin,[x,y+.021,z],[x-.079*scale,y-.014,z-.036*scale],.006,0xd2b28e,5);
  for (let i=0;i<4;i++) {
    leaf(b,m,x,y+.069*scale,z,(.115+i*.016)*scale,.102*scale,turn+i*.81,(.07+i*.024)*scale,
      [0x456139,0x63864b,0x799452,0x3d6542][i]);
  }
}

function produce(parent,colliders,m) {
  const b = new Batch(parent,colliders,"Orchard fruit stall",-6.10,2.64,1.29);
  const rand = random(67);
  canopy(b,m,{w:4.44,back:-1.30,front:1.94,high:3.18,low:2.67,fabric:m.greenCanvas,scallop:.046});
  trestle(b,m,-.07,.05,3.61,.97,.83,0xc9a077);
  b.box(m.woodDark,-.065,.516,-.20,3.29,.044,.59,0xb79672);
  for (const [x,z,w,h,d,rot] of [[-.96,-.12,.95,.25,.62,-.06],[.16,-.10,.94,.27,.63,.06],[1.27,-.07,.83,.22,.64,-.08]]) {
    crate(b,m,x,.83,z,w,h,d,0xdfb685,rot);
  }
  for (const [x,z,w,d,base,tilt,color] of [
    [-.96,-.12,.86,.54,.941,.040,0x947758],
    [.16,-.10,.84,.54,.903,.046,0xaaa17d],
    [1.27,-.07,.73,.55,.901,.021,0x887f58]
  ]) {
    b.sheet(m.cloth,(u,v)=>[x+(u-.5)*w,base+(1-v)*tilt+.009*Math.sin(u*17+v*6),z+(v-.5)*d],11,6,color);
  }
  const oranges=[0xefa23b,0xe68236,0xee8937,0xd96b28,0xf0ad53];
  for (let row=0;row<3;row++) {
    for (let col=0;col<5;col++) {
      const x = -1.31 + col*.166 + (rand()-.5)*.06;
      const z = -.31 + row*.168 + (rand()-.5)*.067;
      const r = .073 + rand()*.024;
      citrus(b,m,x,.945 + (row===0?.035:0),z,r,oranges[(col+row*2)%5],rand()*6);
      if ((col===1 || col===3) && row===1) citrus(b,m,x+.065,1.072,z-.072,r*.93,oranges[col],rand()*6);
    }
  }
  const pears=[0xb8aa63,0xcdba6a,0xb7b673,0xa8ab63,0xcdb77b];
  for (let i=0;i<15;i++) {
    const x=-.18+(i%5)*.166+(rand()-.5)*.043,z=-.286+Math.floor(i/5)*.167+(rand()-.5)*.035;
    pear(b,m,x,.905+(i<5?.044:0),z,.86+rand()*.23,pears[i%5]);
  }
  for (let i=0;i<10;i++) {
    const x=.97+(i%4)*.155+(rand()-.5)*.055,z=-.29+Math.floor(i/4)*.172;
    bunch(b,m,x,.93,z,rand()*6.2,.78+rand()*.28);
  }
  crate(b,m,-.85,.538,-.22,.65,.24,.53,0xba936e,.07);
  crate(b,m,.02,.539,-.21,.66,.20,.54,0xbd9b7c,-.07);
  crate(b,m,1.61,0,-.77,.77,.33,.69,0x9b896c,.06);
  crate(b,m,1.63,.33,-.78,.67,.24,.59,0xbb9269,-.05);
  b.block(1.61,-.77,.77,.69,.06);
  const foldedLinen = (u,v) => [-1.73+u*.74,.463-.14*v+.014*Math.sin(u*12.6),-.51-v*.27];
  b.box(m.wood,-1.36,.354,-.668,.88,.207,.35,0xd3a87c);
  b.sheet(m.cloth,foldedLinen,12,8,0x8d9b7d);
  b.block(-1.36,-.668,.89,.37);
  const stallSign=enamelSign({name:"ORCHARD",sub:"PEARS   /   CITRUS   /   GREENS",background:"#384943",ink:"#f0deb0",line:"#b9a172",glow:.26});
  sign(b,m,stallSign,-.27,2.25,1.86,1.79,.387,0xc0a388);
  for (const x of [-.91,.36]) b.rod(m.black,[x,2.443,1.83],[x,2.64,1.82],.012,0xbaa98e);
  for (const [x,name,ink] of [[-1.22,"CITRUS","#eac191"],[.20,"PEARS","#e4d29a"],[1.28,"GREENS","#c6d29e"]]) {
    const chalk=enamelSign({name,background:"#302e2e",ink,line:"#6d6453",glow:.13});
    b.box(m.woodDark,x,.932,.295,.343,.151,.034,0xa38b73);
    b.panel(chalk,x,.941,.319,.311,.123,-.13);
  }
  paperLantern(b,m,1.36,2.379,1.37,.72);
  b.light(.84,2.115,1.19,0xffb46a,18,5.7);
  b.decal("reflection",1.20,2.48,.86,2.93,0xfaab62,.28,-.15);
  b.decal("reflection",-.25,2.95,.64,1.73,0xbbac6c,.12,.08);
  b.finish();
}

function steelCounter(b,m,w,d) {
  b.box(m.steel,0,.912,0,w,.104,d,0xcad1cd);
  b.box(m.black,0,.462,-.026,w-.14,.837,d-.17,0x929a96);
  for (const x of [-w/2+.137,w/2-.137]) for (const z of [-d/2+.101,d/2-.101]) {
    b.box(m.steel,x,.441,z,.069,.882,.069,0x959f9e);
    b.cyl(m.rubber,x,.048,z,.056,.060,.077,0xb5b8b1,9);
  }
  const front=d/2;
  b.box(m.steel,0,.63,front-.022,w-.16,.455,.032,0xaab2ab);
  b.box(m.black,0,.438,front-.001,w-.155,.027,.036,0xa6a497);
  for (const x of [-w*.255,0,w*.255]) {
    b.box(m.steel,x,.749,front,.15,.029,.044,0x91938d);
    b.box(m.black,x+w*.128,.648,front-.005,.011,.393,.021);
  }
  b.block(0,0,w,d);
  b.decal("shadow",0,-.025,w+.5,d+.58,0x13151b,.51);
}

function grill(parent,colliders,m) {
  const b = new Batch(parent,colliders,"Miso Ember charcoal grill",-6.20,-3.53,1.17);
  canopy(b,m,{w:4.27,back:-1.38,front:1.78,high:3.03,low:2.70,fabric:m.redCanvas,steel:true,scallop:.007,ridged:.06});
  steelCounter(b,m,3.49,1.12);
  const panX=.54, panZ=.08;
  b.box(m.black,panX,1.014,panZ,1.39,.108,.67,0xc0aaa2);
  b.box(m.steel,panX,1.065,panZ,1.41,.045,.688,0xc6c2b7);
  b.box(m.rubber,panX,1.089,panZ,1.288,.017,.579,0x564347);
  for (let i = 0; i < 21; i++) {
    b.rod(m.black,[panX-.624+i*.062,1.113,-.188],[panX-.624+i*.062,1.113,.353],.012,0xababa1,6);
  }
  for (const x of [-.01,.32,.63]) {
    b.rod(m.black,[panX+x-.25,.993,.461],[panX+x-.25,.993,.504],.044,0xd8d6c6,14);
    b.box(m.steel,panX+x-.25,1.011,.528,.013,.028,.008,0xbdab9b);
  }
  const rand=random(329);
  const roast=[0xc4764b,0xedaa61,0x85513c,0xb88b60,0x61814b,0xba6245];
  for (let i=0;i<7;i++) {
    const x=panX-.49+i*.143, offset=(rand()-.5)*.13;
    b.rod(m.wood,[x,1.152,-.197+offset],[x+.024,1.153,.453+offset],.008,0xe2bb8b,5);
    for (let j=0;j<4;j++) {
      const color=roast[(i+j*2)%roast.length], z=offset-.104+j*.099;
      b.box(m.skin,x+.005*j,1.165,z,.082+rand()*.027,.051+rand()*.024,.069+rand()*.027,color,rand()*.68,rand()*.39);
      if (j%2===i%2) b.box(m.skin,x+.005*j,1.199,z-.012,.072,.006,.009,0x734431,.19);
    }
  }
  const hood = new CylinderGeometry(.29,.82,1,4,1,false);
  b.add(hood,m.black,.56,2.012,-.16,1.45,.425,1.01,0,Math.PI/4,0,0x9d9f9e);
  hood.dispose();
  b.box(m.steel,.56,1.79,-.16,1.711,.072,1.212,0x747a7a);
  b.box(m.black,.56,1.741,-.16,1.51,.031,1.016,0x687170);
  b.box(m.steel,.56,1.714,.211,.849,.026,.124,0x9b937b);
  for (let i=-3;i<=3;i++) b.box(m.amberCore,.56+i*.108,1.697,.215,.054,.016,.026,0xbb864f);
  for (const x of [-.20,1.31]) b.box(m.black,x,1.355,-.652,.044,.81,.049,0x8e9893);
  b.cyl(m.steel,.56,2.983,-.16,.148,.148,1.633,0x8c8f8d,18);
  for (const y of [2.29,2.67,3.05,3.48,3.83]) b.torus(m.black,.56,y,-.16,.151,.015,"flat",0xaaa49a);
  b.cyl(m.black,.56,3.89,-.16,.257,.238,.09,0x9f9c95,18);
  b.cyl(m.black,.56,3.964,-.16,.198,.245,.067,0xa8a49a,18);
  b.tube(m.steel,[[1.14,.19,-.53],[1.14,.41,-.65],[1.14,.71,-.72],[.81,.92,-.61]],.025,0xb09a82,18);
  b.rod(m.black,[.12,.37,-.571],[1.45,.37,-.571],.030,0xb79d87);
  for(const x of [.22,.59,1.03]) b.box(m.woodDark,x,.37,-.601,.043,.08,.055,0x9f7a5f);

  b.box(m.wood,-1.036,1.005,.26,.79,.064,.38,0xc49a6e);
  for (const [x,color] of [[-1.31,0xbb7553],[-1.09,0x909369],[-.873,0xd7bb81]]) {
    b.cyl(m.enamel,x,1.112,-.24,.091,.101,.273,color,14);
    b.cyl(m.black,x,1.262,-.24,.087,.094,.037,0xb0a893,14);
    b.box(m.cloth,x,1.095,-.144,.114,.084,.009,0xdccca8);
  }
  for (const x of [-1.16,-.91]) bowl(b,m,x,1.044,.27,.103,0xd9c7a6);
  b.rod(m.steel,[-1.46,1.067,.192],[-1.18,1.07,.38],.009,0xc8b996,7);
  b.rod(m.steel,[-1.475,1.067,.22],[-1.18,1.07,.421],.009,0xc8b996,7);
  crate(b,m,-1.63,0,-.85,.74,.34,.60,0xaf8d76,-.12);
  b.block(-1.63,-.85,.74,.60,-.12);
  for (let i=0;i<11;i++) {
    b.orb(m.rubber,-1.89+(i%4)*.164,.265+(rand()-.5)*.09,-1.02+Math.floor(i/4)*.154,.106,.071,.084,0x8d827e,rand()*.6,rand()*5);
  }
  const title=enamelSign({name:"MISO EMBER",sub:"CHARCOAL SKEWERS",face:"stencil",background:"#592d2b",ink:"#efd4a1",line:"#bc8457",glow:.27});
  sign(b,m,title,-.61,2.318,1.722,1.69,.43,0xb09684);
  for (const x of [-1.23,.02]) b.rod(m.black,[x,2.53,1.68],[x,2.685,1.68],.011,0xa59487);
  paperLantern(b,m,1.24,2.42,1.15,.80);
  b.light(.50,2.11,1.18,0xffac65,24,5.85);
  b.decal("reflection",.60,2.49,.94,2.83,0xee9254,.26);
  b.decal("reflection",-.82,1.93,.65,2.20,0xb66649,.15,-.22);
  b.finish();
}

function stockpot(b,m,x,y,z,s,shade) {
  const profile=[[0,0],[.17,0],[.212,.022],[.231,.063],[.237,.267],[.239,.282],[.225,.296],
    [.213,.277],[.215,.064],[.187,.03],[0,.03]];
  b.lathe(m.steel,x,y,z,profile.map(([r,h])=>[r*s,h*s]),shade,22);
  for (const dy of [.039,.272]) b.torus(m.steel,x,y+dy*s,z,.229*s,.009*s,"flat",0xc4cac2,22);
  for (const side of [-1,1]) {
    const xx=x+side*.255*s;
    b.rod(m.steel,[x+side*.214*s,y+.197*s,z-.062*s],[xx,y+.213*s,z-.070*s],.014*s,0xbdbfb7);
    b.rod(m.steel,[x+side*.214*s,y+.197*s,z+.062*s],[xx,y+.213*s,z+.070*s],.014*s,0xbdbfb7);
    b.rod(m.black,[xx,y+.213*s,z-.071*s],[xx,y+.213*s,z+.071*s],.017*s,0xb9b4a5);
  }
}

function steamingLid(b,m,x,y,z,s) {
  b.cyl(m.steel,x,y,z,.201*s,.235*s,.052*s,0xc4c7ba,25);
  b.torus(m.steel,x,y-.023*s,z,.233*s,.008*s,"flat",0xc2c4b5);
  b.orb(m.black,x,y+.049*s,z,.043*s,.024*s,.037*s,0xabaaa0);
}

function noodles(parent,colliders,m) {
  const b = new Batch(parent,colliders,"Blue Door noodle stall",6.30,-3.29,-1.16);
  canopy(b,m,{w:4.39,back:-1.38,front:1.96,high:3.13,low:2.73,fabric:m.blueCanvas,steel:true,scallop:.014,ridged:.155,lean:.20});
  steelCounter(b,m,3.45,1.04);
  b.box(m.black,0,1.011,-.192,1.48,.139,.69,0xa3a7a4);
  b.box(m.steel,0,1.075,-.192,1.44,.036,.654,0xb5bdbb);
  for (const [x,s,shade] of [[-.36,1.16,0xc7cdca],[.37,1.35,0xb8c3c2]]) {
    b.torus(m.black,x,1.091,-.184,.224*s,.018,"flat",0xa1a6a3);
    stockpot(b,m,x,1.117,-.184,s,shade);
  }
  steamingLid(b,m,.37,1.116+.30*1.35,-.184,1.35);
  b.cyl(m.enamel,-.36,1.301,-.184,.245,.215,.013,0x826c50,20);
  const rand=random(831);
  for(let i=0;i<23;i++) {
    const x=-.36+(rand()-.5)*.34,z=-.184+(rand()-.5)*.34;
    if (Math.hypot(x+.36,z+.184)>.20) continue;
    b.rod(m.skin,[x,1.312,z],[x+rand()*.039,1.319,z+.012],.005, i%2 ? 0xc6bd86 : 0x98a682,5);
  }
  b.tube(m.steel,[[-.38,1.303,-.223],[-.52,1.376,-.33],[-.82,1.53,-.48]],.015,0xbdc4c1,12);
  b.orb(m.steel,-.41,1.315,-.243,.073,.029,.067,0xc7ccc6);

  for (const [x,z] of [[1.17,.223],[1.43,.17]]) {
    bowl(b,m,x,.97,z,.139,0xbccccc);
    b.rod(m.wood,[x-.109,1.059,z+.066],[x+.133,1.071,z-.058],.006,0xe0b881,5);
    b.rod(m.wood,[x-.095,1.061,z+.095],[x+.142,1.072,z-.032],.006,0xdeb37d,5);
  }
  for(let i=0;i<4;i++) bowl(b,m,1.28,.97+i*.032,-.235,.162,0xb6c4bc);
  for(const y of [1.002,1.089,1.17]) {
    b.cyl(m.wood,-1.20,y,-.11,.212,.208,.062,0xd5bd90,24);
    for(const dy of [-.026,.027]) b.torus(m.woodDark,-1.20,y+dy,-.11,.21,.008,"flat",0xd0b58c,24);
  }
  b.cyl(m.wood,-1.20,1.211,-.11,.182,.208,.037,0xd2af7c,22);
  b.rod(m.woodDark,[-1.27,1.241,-.11],[-1.13,1.241,-.11],.013,0xc4a882);
  b.box(m.wood,0,.957,.416,1.37,.032,.182,0xd3bda0);
  b.box(m.woodDark,-.07,1.20,-.909,3.44,.05,.24,0xb1a493);
  for(const [x,c] of [[-1.08,0xd0c7a5],[-.82,0x91b5b0],[.98,0xb1c4bb],[1.27,0xc8b19b]]) {
    b.cyl(m.enamel,x,1.292,-.903,.057,.069,.143,c,14);
    b.torus(m.enamel,x,1.367,-.903,.057,.008,"flat",0xd1d1bf,14);
  }

  const mainSign=enamelSign({name:"BLUE DOOR",sub:"NOODLES  /  BROTH",face:"sans",background:"#263b50",ink:"#d8dfc2",line:"#7fa197",glow:.38});
  sign(b,m,mainSign,-.59,2.30,1.913,1.52,.376,0xa3a2a1);
  for(const x of [-1.16,-.03]) b.rod(m.black,[x,2.488,1.86],[x,2.68,1.86],.010,0x9f9ca0);
  const blade=enamelSign({name:"SOBA",background:"#225356",ink:"#a6f1d9",line:"#64b6ae",tall:true,glow:.61});
  b.box(m.steel,1.53,2.388,1.81,.365,.707,.08,0x8eaeaa);
  b.panel(blade,1.53,2.388,1.854,.313,.646);
  b.panel(blade,1.53,2.388,1.762,.313,.646,0,Math.PI);
  b.box(m.coolCore,1.53,2.742,1.817,.30,.028,.065,0x7ddcc9);
  b.halo(1.53,2.46,1.859,.77,0x4cc8c9,.26);
  b.light(.86,2.23,1.56,0x80d6d3,16,5.6);
  b.box(m.woodDark,-.075,2.586,-.19,3.49,.041,.058,0xccb28b);
  const noren=enamelSign({name:"≈",background:"#42566c",ink:"#c6cdb8",line:"#778797", glow:.14});
  noren.side=DoubleSide;
  for(let i=0;i<3;i++) {
    const x=-.91+i*.84;
    b.sheet(i===1?noren:m.blueCanvas,(u,v)=>[
      x+(u-.5)*.807,2.568-v*.426+Math.sin(u*Math.PI)*.025*v,
      -.153+Math.sin(u*Math.PI*4+i)*.023*v+Math.sin(v*Math.PI)*.015
    ],18,10);
  }
  paperLantern(b,m,-1.63,2.403,1.21,.62);
  b.decal("reflection",1.37,2.74,1.15,3.07,0x69c7c4,.30,-.09);
  b.decal("reflection",-.37,2.36,.55,2.12,0x9abaac,.13,.16);
  b.finish();
}

function wheel(b,m,x,y,z,r) {
  b.torus(m.woodDark,x,y,z,r,.043,"side",0xbfb09b,30);
  b.torus(m.black,x+.012,y,z,r+.034,.027,"side",0xc0bbad,30);
  b.rod(m.steel,[x-.061,y,z],[x+.065,y,z],.073,0xb2ab9a,13);
  for(let i=0;i<11;i++) {
    const t=i/11*Math.PI*2;
    b.rod(m.wood,[x,y+r*.12*Math.cos(t),z+r*.12*Math.sin(t)],
      [x,y+r*.966*Math.cos(t),z+r*.966*Math.sin(t)],.020,0xcdaf87,6);
  }
}

function spiceJar(b,m,x,y,z,r,h,jar,contents,label) {
  const p=[[0,0],[r*.78,0],[r*.96,h*.08],[r,h*.20],[r,h*.69],[r*.81,h*.89],[r*.76,h*.92]];
  b.lathe(m.enamel,x,y,z,p,jar,17);
  b.cyl(m.enamel,x,y+h*.225,z,r*1.002,r*1.002,h*.24,contents,17);
  b.cyl(m.woodDark,x,y+h*.922,z,r*.80,r*.81,h*.105,0xc8ad82,17);
  b.torus(m.steel,x,y+h*.895,z,r*.801,.006,"flat",0xb2a48d,17);
  b.box(m.cloth,x,y+h*.56,z+r*.963,r*1.2,h*.24,.021,label,0,Math.sin(x*13)*.09);
  for(const i of [0,1]) b.box(m.woodDark,x+.012,y+h*(.56-i*.066),z+r*.963+.012,r*(.77-i*.123),.008,.007,0xaa7653);
}

function sack(b,m,x,y,z,r,h,side,color,goods,seed) {
  const wiggle = (u,v) => Math.sin(u*Math.PI*12+side+v*.7)*.038 + Math.cos(u*Math.PI*4)*.057;
  b.sheet(m.cloth,(u,v)=>{
    const a=u*Math.PI*2;
    const rad=r*(.71 + Math.sin((v*.84+.13)*Math.PI)*.29 + wiggle(u,v));
    return [x+rad*Math.cos(a),y+v*h + Math.sin(a*4)*.018*v**4,z+rad*Math.sin(a)];
  },28,11,color);
  b.cyl(m.skin,x,y+h*.93,z,r*.77,r*.70,.019,goods,20);
  b.torus(m.wood,x,y+h*.94,z,r*.779,.015,"flat",color,24);
  const rand=random(seed);
  for(let i=0;i<28;i++) {
    const a=rand()*Math.PI*2, d=Math.sqrt(rand())*r*.72;
    b.orb(m.skin,x+d*Math.cos(a),y+h*.94+rand()*.027,z+d*Math.sin(a),.012+rand()*.013,.009,.024,
      i%3===0?0x6b4534:goods,0,a);
  }
}

function dryGoods(parent,colliders,m) {
  const b=new Batch(parent,colliders,"Salt and Spice provisions cart",6.39,3.09,-1.36);
  canopy(b,m,{w:4.09,back:-1.31,front:1.80,high:2.97,low:2.66,fabric:m.stripeCanvas,scallop:.001,ridged:.42,lean:-.13});
  const cartZ=-.067;
  b.box(m.woodDark,0,.52,cartZ,3.02,.552,1.027,0xc6a57b);
  for (let i=0;i<13;i++) b.box(m.wood,(i/12-.5)*2.84,.511,cartZ+.519,.193,.507,.068,
    i%3===0?0x9c9675:0xa6a484);
  b.box(m.wood,0,.818,cartZ,3.27,.138,1.21,0xd6ba8f);
  for(const y of [.293,.733]) b.box(m.woodDark,0,y,cartZ+.553,3.02,.064,.073,0xcfb894);
  b.box(m.black,0,.229,cartZ,2.97,.081,1.04,0xb8aea0);
  for(const x of [-1.63,1.63]) {
    wheel(b,m,x,.492,cartZ-.117,.426);
    b.block(x,cartZ-.117,.155,.931);
  }
  for(const x of [-1.30,1.30]) {
    b.rod(m.woodDark,[x,.482,cartZ-.41],[x,.431,cartZ+.944],.038,0xc89974);
    b.rod(m.steel,[x,.432,cartZ+.857],[x,.427,cartZ+.985],.041,0x8f8a79);
  }
  b.block(0,cartZ,3.27,1.21);
  b.decal("shadow",0,cartZ,3.86,1.66,0x21202b,.48);
  b.box(m.woodDark,.18,1.491,-.614,2.28,1.18,.058,0xab9075);
  for(const x of [-.98,1.34]) b.box(m.wood,x,1.474,-.537,.064,1.17,.215,0xccaa7c);
  for(const y of [1.052,1.453,1.84]) {
    b.box(m.wood,.18,y,-.434,2.40,.064,.351,0xd2b187);
    b.box(m.woodDark,.18,y+.03,-.25,2.40,.055,.021,0xc0a17e);
  }
  const jars=[[0xa87b62,0x9e553c,0xdbca9f],[0xafa083,0xbca27d,0xe3caa1],
    [0x87968a,0x788456,0xcaab80],[0x9d896d,0x745d4b,0xe1bd8f],[0x8fa09e,0x889b94,0xd4c19e]];
  for(const [row,offset,count] of [[0,-.80,6],[1,-.66,5]]) {
    for(let i=0;i<count;i++) {
      const [jar,contents,label]=jars[(i+row*3)%jars.length];
      spiceJar(b,m,offset+i*(row?.409:.376),1.085+row*.401,-.433,.093+(i%3)*.012,
        .206+(i%4)*.025,jar,contents,label);
    }
  }
  sack(b,m,-.94,.89,.11,.269,.281,.4,0xa18c6c,0xae794c,27);
  sack(b,m,-.40,.89,.24,.212,.259,1.5,0xc0a27b,0xb85337,657);
  sack(b,m,.06,.89,.15,.209,.29,2.5,0x98876e,0xac9b6c,916);
  b.cyl(m.wood,1.045,1.02,.14,.312,.258,.26,0xc9ac84,24);
  b.cyl(m.woodDark,1.045,1.146,.14,.276,.272,.015,0x7e6c4f,24);
  for(let i=0;i<8;i++) b.torus(m.woodDark,1.045,.906+i*.031,.14,.26+i*.0068,.009,"flat",i%2?0xd8b78a:0xbda279,25);
  for(let i=0;i<6;i++) {
    b.rod(m.skin,[.90+i*.048,1.159,.006],[.92+i*.048,1.184,.28],.023,[0x876149,0x927358,0x9c7651][i%3],6);
  }
  crate(b,m,-1.78,0,-.81,.60,.34,.63,0xa8957a,-.12);
  b.block(-1.78,-.81,.60,.63,-.12);
  const title=enamelSign({name:"SALT & SPICE",sub:"DRY GOODS",face:"hand",background:"#674737",ink:"#f1d8a8",line:"#c19c6a",glow:.30});
  sign(b,m,title,.04,2.33,1.743,1.82,.418,0xbc9874);
  for(const x of [-.62,.70]) b.rod(m.black,[x,2.54,1.699],[x,2.66,1.68],.010,0xa79b86);
  const pendant=enamelSign({name:"SPICE",background:"#583f50",ink:"#e2aac1",line:"#987387",tall:true,glow:.31});
  b.box(m.woodDark,-1.83,1.595,1.147,.243,.538,.037,0xae88a2);
  b.panel(pendant,-1.83,1.595,1.168,.211,.491);
  b.block(-1.83,1.147,.25,.14);
  b.rod(m.black,[-1.93,1.87,1.145],[-1.94,2.55,1.20],.009,0xad9f90);
  b.halo(-1.83,1.60,1.171,.51,0xce84a8,.21);
  b.light(-1.71,1.67,1.29,0xc87ca5,4.2,2.7);
  paperLantern(b,m,1.38,2.38,1.05,.72);
  b.light(.78,2.084,1.13,0xffbf7d,20,5.5);
  b.decal("reflection",1.10,2.59,1.07,2.64,0xe9ab66,.24,.13);
  b.decal("reflection",-1.76,1.89,.62,1.92,0xba7792,.14,-.15);
  b.finish();
}

export function buildStalls(parent,colliders,m) {
  produce(parent,colliders,m);
  grill(parent,colliders,m);
  noodles(parent,colliders,m);
  dryGoods(parent,colliders,m);
}

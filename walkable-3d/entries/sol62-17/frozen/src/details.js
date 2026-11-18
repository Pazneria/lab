import * as T from '../vendor/three.module.min.js';
import { canvas, mat, random, texture } from './materials.js';

const PI = Math.PI;
const C = { cast: false };
const H = [-PI / 2, 0, 0];

export function book(b, m, x, y, z, w, d, h, cover, yaw = 0) {
  b.placed([x, y, z], yaw, () => {
    b.round([0, h * .5, 0], [w * .958, h * .75, d * .964], m.paper, .006, C);
    for (const py of [.010, h - .008]) b.round([0, py, 0], [w, .017, d], cover, .006, C);
    b.round([0, h / 2, d * .467], [w, h, .028], cover, .009, C);
    for (const tx of [-.34, .33]) {
      b.box([tx * w, h / 2, d * .473 + .012], [.016, h * .8, .004], m.bronze, C);
    }
    for (const py of [.32, .54, .70]) b.box([0, py * h, -d * .484], [w * .89, .0018, .002], m.stitch, C);
  });
}

export function standingBook(b, m, x, y, z, w, h, depth, cover, spine = 1, lean = 0) {
  b.placed([x, y, z], spine > 0 ? 0 : PI, () => {
    const angle = [0, 0, lean];
    const side = Math.sin(lean) * h * -.49;
    b.round([side, h * .50, 0], [w * .76, h * .941, depth * .97], m.paper, .006, { ...C, angles: angle });
    b.round([side, h * .50, depth * .46], [w + .006, h, .034], cover, .009, { ...C, angles: angle });
    for (const sign of [-1, 1]) b.box([side + sign * w * .47, h * .50, 0], [.015, h, depth], cover, { ...C, angles: angle });
    for (const vy of [.12, .78, .87]) b.box([-Math.sin(lean) * h * vy, h * vy, depth * .485 + .012], [w * .84, .007, .004], m.bronze, { ...C, angles: angle });
  });
}

export function pottery(b, m, x, y, z, r, h, clay, kind = 'jar') {
  const body = kind === 'jug' ?
    [[0, .015], [.55, .015], [.72, .045], [.95,.19], [1,.40], [.88,.63], [.58,.77], [.43,.90], [.48,.93], [.49,1], [.35,1], [.32,.92], [.35,.79], [.42,.68], [.55,.48], [.44,.20], [0,.13]] :
    [[0,.012],[.66,.012],[.81,.04],[.92,.17],[1,.45],[.89,.70],[.79,.81],[.84,.88],[.87,.96],[.81,1],[.72,.97],[.71,.87],[.69,.76],[.77,.61],[.85,.37],[.67,.12],[0,.09]];
  b.lathe([x, y, z], body.map(([a, d]) => [a * r, d * h]), clay, { ...C, segments: 24 });
  if (kind === 'jug') {
    b.tube([[x + r * .39, y + h * .88, z], [x + r * 1.03, y + h * .83, z],
      [x + r * 1.34, y + h * .62, z], [x + r * 1.14, y + h * .43, z], [x + r * .87, y + h * .34, z]],
    r * .106, clay, { ...C, segments: 13 });
  } else if (kind === 'sealed') {
    b.cylinder([x, y + h * .97, z], r * .78, r * .74, h * .15, m.honey, { ...C, segments: 16 });
  }
}

export function plate(b, m, x, y, z, r, h, clay = m.crock) {
  b.lathe([x, y, z], [[0,.02],[.56,.02],[.62,.04],[.81,.23],[.99,.74],[1,.86],[.96,1],[.89,.93],[.75,.44],[.58,.30],[0,.29]].map(([a,d]) => [a*r,d*h]), clay, { ...C, segments: 30 });
  b.torus([x, y + h * .87, z], r * .946, .0027, m.painted, { ...C, angles: H, sides: 30, segments: 5 });
}

export function tea(b, m) {
  b.placed([.198, .658, -.176], -.32, () => {
    b.lathe([0,0,0], [[0,.006],[.082,.007],[.122,.046],[.140,.116],[.124,.157],[.089,.178],[.071,.194],[.043,.192],[0,.183]], m.crock, { ...C, segments: 28 });
    b.lathe([0,0,0], [[.083,.175],[.086,.183],[.072,.195],[.047,.206],[.016,.207],[0,.195]], m.crock, C);
    b.ellipsoid([0,.223,0], [.021,.017,.021], m.painted, C);
    b.torus([0,.063,0], .128,.0042,m.painted, { ...C, angles:H });
    b.torus([0,.074,0], .135,.0028,m.painted, { ...C, angles:H });
    b.tube([[-.105,.072,0],[-.169,.087,0],[-.224,.141,0],[-.259,.203,0]], .020,m.crock, { ...C, segments: 11 });
    b.tube([[.108,.150,0],[.178,.177,0],[.206,.145,0],[.199,.093,0],[.131,.054,0]], .012, m.crock, { ...C, segments: 14 });
  });
  b.placed([-.215, .658, .10], -.27, () => {
    plate(b,m,0,0,0,.108,.025);
    b.lathe([0,.010,0], [[0,.014],[.041,.014],[.049,.025],[.058,.070],[.061,.104],[.057,.109],[.051,.105],[.050,.070],[.042,.031],[0,.027]], m.crock, C);
    b.cylinder([0,.100,0], .050,.052,.003,m.leatherDark, { ...C, segments: 20 });
    b.tube([[.050,.094,0],[.084,.093,0],[.092,.077,0],[.084,.053,0],[.055,.050,0]], .006,m.crock, { ...C, segments: 12 });
    b.torus([0,.101,0], .058,.0026,m.painted,{ ...C, angles:H });
    b.ellipsoid([.026,.103,-.017],[.011,.0010,.006],m.honey,C);
  });
  plate(b,m,.125,.657,.240,.109,.029,m.crock);
  for (const [x,z,rot] of [[.088,.199,.31],[.145,.252,-.33],[.171,.213,.09]]) {
    b.ellipsoid([x,.688,z],[.033,.011,.028],m.quilt,{...C,angles:[0,rot,0]});
    for (let i=0;i<3;i++) b.ellipsoid([x+(i-1)*.012,.696,z+(i%2)*.013],[.004,.002,.004],m.leatherDark,C);
  }
}

export function candle(b, m, x, y, z, h, r = .025) {
  b.lathe([x,y,z], [[0,0],[r*.94,0],[r,.015],[r,h-.020],[r*.93,h-.004],[r*.74,h+.003],[r*.43,h-.006],[0,h-.014]], m.waxCream, { ...C, segments: 13 });
  b.tube([[x + r * .95,y+h-.01,z],[x+r*1.04,y+h-.027,z],[x+r*.94,y+h-.049,z]],r*.13,m.waxCream,{...C,segments:8});
  b.rod([x,y+h-.010,z],[x+.002,y+h+.013,z],.003,m.blackIron,C);
  b.lathe([x+.002,y+h+.005,z], [[0,0],[.009,.005],[.011,.014],[.009,.024],[.005,.041],[0,.058]], m.fire, { ...C, segments: 9 });
  b.ellipsoid([x+.001,y+h+.021,z],[.006,.012,.006],m.flame,C);
}

export function lantern(b, m, x, y, z, scale = 1, suspend = 0) {
  b.placed([x,y,z], .14, () => {
    const s = scale;
    for (const py of [.029,.285]) {
      b.cylinder([0,py*s,0], .119*s,.119*s,.021*s,m.blackIron,{segments:8});
      b.torus([0,py*s,0], .107*s,.009*s,m.bronze,{...C,sides:8,angles:H});
    }
    b.lathe([0,.29*s,0], [[.123,0],[.121,.018],[.101,.050],[.067,.080],[.025,.089],[.020,.10],[0,.10]].map(([a,d])=>[a*s,d*s]),m.bronze,{segments:12});
    for (let i=0;i<6;i++) {
      const a=i*PI/3, xx=Math.cos(a)*.103*s, zz=Math.sin(a)*.103*s;
      b.rod([xx,.036*s,zz],[xx,.294*s,zz],.010*s,m.blackIron,C);
    }
    candle(b,m,0,.043*s,0,.12*s,.025*s);
    b.torus([0,.414*s,0],.031*s,.0075*s,m.blackIron,{...C,sides:16});
    for(let a=0;a<suspend;a++) b.torus([0,.442*s + a*.042,0],.024,.005,m.blackIron,{ ...C,sides:12,angles:[0,a%2?PI/2:0,0] });
  });
}

export function plant(b, m, x, y, z, height, seed, flowers = false) {
  const rng = random(seed);
  for (let j = 0; j < 9; j++) {
    const turn = rng() * PI * 2;
    const vx = Math.cos(turn), vz = Math.sin(turn);
    const h = height * (.48 + .52*rng());
    const length = h * (.28 + .32*rng());
    const points = [[x + vx*.024,y,z+vz*.024],[x+vx*length*.42,y+h*.44,z+vz*length*.36],[x+vx*length,y+h,z+vz*length]];
    b.tube(points,.0039,m.leafDark,{...C,segments:7,sides:5});
    for(let i=1;i<6;i++) {
      const f = i/6, side = i%2?1:-1;
      const base=[x+vx*length*f,y+h*f,z+vz*length*f];
      const span = h * (.17 + rng()*.22) * (1.1-f*.65);
      const dx= Math.cos(turn + side * 1.00) * span, dz= Math.sin(turn + side * 1.00) * span;
      const dy= span * (.22 + rng()*.70);
      const blade = rng()>.60?m.leafPale:rng()>.5?m.leaf:m.leafDark;
      b.sheet(2,4,(u,v)=>{
        const w = Math.sin(v*PI) * span*.30*(u-.5)*2;
        return [base[0]+dx*v-vz*w,base[1]+dy*v+Math.sin(v*PI)*span*.19+(u-.5)*span*.08,base[2]+dz*v+vx*w];
      },blade,C);
    }
    if(flowers && j%2===0){
      const [xx, yy, zz] = points[2];
      const rr = .023 + rng()*.012;
      for(let a=0;a<7;a++){
        const theta=a*2*PI/7;
        b.ellipsoid([xx+Math.cos(theta)*rr,yy+.001,zz+Math.sin(theta)*rr],[rr*.60,.006,rr*.285],j%4?m.violet:m.petals,{...C,angles:[.28,-theta,-.06]});
      }
      b.ellipsoid([xx,yy+.007,zz],[rr*.37,.009,rr*.37],m.kiln,C);
    }
  }
}

export function basket(b, m, x, y, z, r, h, goods = 'cloth') {
  b.placed([x,y,z], 0, () => {
    b.lathe([0,0,0], [[0,0],[r*.7,0],[r*.79,.027],[r*.89,h*.40],[r,h*.92],[r,h],[r*.89,h],[r*.84,h*.62],[r*.71,h*.27],[r*.62,.039],[0,.038]], m.stave, { ...C, segments:25 });
    for(let i=0;i<13;i++){
      const v=i/12, rad=r*(.77+.225*v);
      b.torus([0,.026+(h-.026)*v,0],rad,.0058,i%3?m.honey:m.trim,{...C,angles:H,sides:24,segments:5});
    }
    for(let i=0;i<26;i++){
      const theta=i*PI*2/26, a=Math.cos(theta), c=Math.sin(theta);
      b.rod([a*r*.765,.026,c*r*.765],[a*r*.999,h,c*r*.999],.0045,m.trim,{...C,segments:5});
    }
    b.torus([0,h,0],r,.012,m.honey,{...C,angles:H,sides:28});
    if(goods==='cloth'){
      b.round([-.047,h-.008,.029],[r*1.15,.068,r*1.18],m.linen,.023,{...C,angles:[.13,.09,.10]});
      b.round([.044,h+.018,-.041],[r*1.20,.070,r*.94],m.duck,.024,{...C,angles:[-.16,.28,-.12]});
    }
    if(goods==='wool'){
      for(const [xx,yy,zz,s,cloth] of [[-.09,.00,0,.092,m.ruby],[.074,-.020,.073,.083,m.duck],[.041,.025,-.078,.078,m.blanket]]){
        b.ellipsoid([xx,h+yy,zz],[s,s*.9,s],cloth,C);
        for(let i=0;i<5;i++) b.torus([xx,h+yy,zz],s*(.91+i*.02),.0025,m.stitch,{...C,angles:[i*.22,i*.1,.2],sides:16,segments:4});
      }
      b.rod([-.09,h*.95,-.08],[.14,h+.21,.10],.006,m.honey,C);
      b.rod([-.12,h*.98,-.07],[.105,h+.25,.073],.006,m.honey,C);
    }
  });
}

export function flask(b,m,x,y,z){
  b.lathe([x,y,z],[[0,0],[.05,0],[.06,.021],[.058,.131],[.048,.164],[.027,.179],[.022,.229],[.027,.235],[.027,.248],[.017,.248],[.016,.227],[0,.224]],m.painted,{...C,segments:15});
  b.cylinder([x,y+.249,z],.018,.016,.032,m.honey,{...C,segments:10});
  b.round([x,y+.112,z+.055],[.073,.067,.006],m.paper,.002,C);
  b.box([x-.012,y+.118,z+.059],[.040,.003,.002],m.leatherDark,C);
  b.box([x+.007,y+.106,z+.059],[.035,.003,.002],m.leatherDark,C);
}

export function letter(b, m, x, y, z, yaw = 0) {
  b.placed([x,y,z],yaw,()=>{
    b.round([0,.006,0],[.247,.012,.152],m.paper,.004,C);
    const folds = [[[-.114,.013,.065],[0,.013,-.022],[.114,.013,.065]], [[-.114,.013,-.069],[0,.013,.000],[.114,.013,-.069]]];
    for (const points of folds) {
      b.rod(points[0],points[1],.00155,m.stitch,C);
      b.rod(points[1],points[2],.00155,m.stitch,C);
    }
    b.ellipsoid([.002,.015,-.013],[.028,.009,.025],m.wax,C);
    b.torus([.002,.021,-.013],.012,.002,m.brass,{...C,angles:H,sides:12});
    b.box([.002,.021,-.013],[.010,.002,.022],m.leatherDark,{...C,angles:[0,-.63,0]});
  });
}

export function compass(b,m,x,y,z){
  b.cylinder([x,y+.022,z],.067,.066,.039,m.bronze,{...C,segments:24});
  b.cylinder([x,y+.043,z],.056,.056,.007,m.paper,{...C,segments:24});
  b.torus([x,y+.046,z],.061,.006,m.brass,{...C,angles:H,sides:24});
  for(let i=0;i<12;i++){
    const a=i*PI/6;
    b.box([x+Math.sin(a)*.046,y+.048,z+Math.cos(a)*.046],[.003,.002,.009],m.leatherDark,{...C,angles:[0,a,0]});
  }
  b.profile([[0,.038],[.009,0],[0,-.038],[-.009,0]],.001,m.painted,{pos:[x,y+.049,z],angles:[-PI/2,0,.63],cast:false});
  b.ellipsoid([x,y+.050,z],[.006,.003,.006],m.wax,C);
  b.torus([x+.07,y+.026,z+.025],.016,.004,m.bronze,{...C,angles:H,sides:12});
}

export function mapMaterial(seed = 1927) {
  const rng = random(seed);
  const s = canvas(768,548,(g,w,h)=>{
    const base = g.createRadialGradient(w*.46,h*.42,40,w*.45,h*.46,w*.57);
    base.addColorStop(0,'#e6cf9a'); base.addColorStop(.66,'#d2af77'); base.addColorStop(1,'#9b7249');
    g.fillStyle=base;g.fillRect(0,0,w,h);
    for(let i=0;i<8000;i++){
      const v=rng();g.fillStyle=v>.53?'#684a2915':'#fff5bb1c';g.fillRect(rng()*w,rng()*h,.4+rng()*4,.5+rng()*2);
    }
    g.strokeStyle='#795b408d';g.lineWidth=1.4;g.strokeRect(16,16,w-32,h-32);g.strokeRect(21,21,w-42,h-42);
    for(let i=65;i<w-45;i+=42){g.beginPath();g.moveTo(i,26);g.lineTo(i,h-26);g.strokeStyle='#8b714131';g.stroke();}
    for(let i=50;i<h-36;i+=42){g.beginPath();g.moveTo(26,i);g.lineTo(w-26,i);g.strokeStyle='#8b714131';g.stroke();}
    const coast=[[25,425],[77,396],[118,411],[162,370],[191,392],[242,420],[271,401],[324,449],[373,425],[415,468],[456,441],[479,423],[521,438],[593,381],[645,397],[691,356],[744,378]];
    g.beginPath();g.moveTo(24,h-25);coast.forEach(([x,y])=>g.lineTo(x,y));g.lineTo(w-24,h-25);g.closePath();
    g.fillStyle='#747e6a95';g.fill();g.strokeStyle='#586653';g.lineWidth=2.4;g.stroke();
    for(let i=0;i<145;i++){
      const x=25+rng()*720, y=398+rng()*112;
      if(y<455+25*Math.sin(x*.03))continue;
      g.beginPath();g.moveTo(x,y);g.quadraticCurveTo(x+9,y-4,x+17,y);g.strokeStyle='#e4d3a582';g.lineWidth=.9;g.stroke();
    }
    const range=[[116,179],[156,133],[202,148],[247,116],[290,143],[313,179],[359,152],[403,145],[447,120],[478,147],[516,127],[543,169],[586,152],[628,190],[656,162]];
    for(const [cx,cy] of range){
      for(let i=0;i<4;i++){
        const x=cx+(rng()-.5)*32,y=cy+(rng()-.5)*42,r=9+rng()*24;
        g.beginPath();g.moveTo(x-r,y+r*.62);g.lineTo(x-r*.39,y+r*.14);g.lineTo(x,y-r*.81);g.lineTo(x+r*.41,y-r*.20);g.lineTo(x+r,y+r*.64);g.strokeStyle='#665641c9';g.lineWidth=1.25;g.stroke();
        for(let j=0;j<4;j++){g.beginPath();g.moveTo(x+j*r*.12,y-r*.61+j*r*.25);g.lineTo(x+r*.26+j*r*.12,y+r*.37+j);g.strokeStyle='#6b614998';g.lineWidth=.7;g.stroke();}
      }
    }
    g.beginPath();g.moveTo(410,153);g.bezierCurveTo(377,217,425,214,401,271);g.bezierCurveTo(379,313,461,332,456,442);g.strokeStyle='#626c629f';g.lineWidth=5;g.stroke();
    g.beginPath();g.moveTo(105,316);g.bezierCurveTo(176,276,226,283,312,238);g.bezierCurveTo(389,209,454,276,487,233);g.bezierCurveTo(552,164,566,286,647,282);g.strokeStyle='#9a4f36';g.lineWidth=2.5;g.setLineDash([6,5]);g.stroke();g.setLineDash([]);
    for(const [x,y,name] of [[107,316,'Lowford'],[310,239,'Fir Pass'],[484,234,'Aster Fold'],[647,282,'Tarn Gate']]){
      g.strokeStyle='#7e4231';g.beginPath();g.arc(x,y,8,0,2*PI);g.stroke();
      g.fillStyle='#523f31';g.font='italic 18px Georgia';g.fillText(name,x+10,y+19);
    }
    g.fillStyle='#533e2d';g.font='italic 32px Georgia';g.fillText('The Slatewater Road',35,68);
    g.font='13px Georgia';g.fillText('DAYS FROM LOWFORD  ·  M. VALE',39,89);
    g.save();g.translate(673,79);
    g.strokeStyle='#604e38';g.beginPath();g.arc(0,0,24,0,2*PI);g.stroke();
    for(let i=0;i<8;i++){
      g.rotate(PI/4);g.beginPath();g.moveTo(-3,2);g.lineTo(0,i%2?-17:-29);g.lineTo(3,2);g.fillStyle=i%2?'#886b4b':'#614a35';g.fill();
    }
    g.restore();
  });
  return mat('#fff4dd',{map:texture(s),roughness:.97});
}

export function framedMap(b,m,x,y,z,art,w=1.42,h=1.015){
  b.round([x,y,z],[w+.088,h+.084,.056],m.trim,.014);
  b.box([x,y,z+.031],[w,h,.012],m.beam,C);
  b.plane([x,y,z+.039],[w-.031,h-.039],art,C);
  for(const tx of [-1,1]) for(const ty of [-1,1]){
    b.ellipsoid([x+tx*w*.473,y+ty*h*.466,z+.042],[.010,.010,.005],m.bronze,C);
  }
}

export function portraitMaterial(index) {
  const colors=[['#323e3b','#597265','#6b4b36','#be8964','#342a27','#9c683f'],['#4a302f','#805b46','#80664a','#d59d73','#543928','#243e3f'],['#384046','#657779','#6b534a','#e0ad80','#916d51','#774239']][index];
  const rng=random(801+index);
  const s=canvas(256,328,(g,w,h)=>{
    const [dark,light,shade,skin,hair,coat]=colors;
    const path=(color,fn)=>{g.fillStyle=color;g.beginPath();fn();g.closePath();g.fill();};
    const bg=g.createLinearGradient(0,h,w,0);bg.addColorStop(0,dark);bg.addColorStop(1,light);
    g.fillStyle=bg;g.fillRect(0,0,w,h);
    g.strokeStyle='#e1b88650';g.lineWidth=1.2;g.strokeRect(10,10,w-20,h-20);
    const offset=index===1?-9:9;
    g.save();g.translate(offset,0);
    path('#2b2c29',()=>{
      g.moveTo(23,328);g.bezierCurveTo(31,256,42,212,101,208);
      g.quadraticCurveTo(144,185,176,206);g.bezierCurveTo(236,230,244,277,254,328);
    });
    path(coat,()=>{g.moveTo(42,326);g.quadraticCurveTo(50,255,83,224);g.lineTo(113,215);g.lineTo(151,219);g.quadraticCurveTo(202,217,222,327);});
    path(shade,()=>{g.moveTo(101,171);g.lineTo(101,218);g.quadraticCurveTo(130,253,166,220);g.lineTo(154,176);});
    path(hair,()=>{g.moveTo(66,155);g.bezierCurveTo(50,91,68,45,114,42);g.bezierCurveTo(173,30,204,67,184,158);g.lineTo(157,199);g.lineTo(82,195);});
    const face=g.createLinearGradient(70,131,171,137);face.addColorStop(0,shade);face.addColorStop(.7,skin);
    path(face,()=>{
      g.moveTo(80,110);g.bezierCurveTo(85,75,146,62,174,97);g.lineTo(174,140);
      g.quadraticCurveTo(186,152,174,161);g.quadraticCurveTo(166,187,142,202);g.bezierCurveTo(118,212,89,188,82,164);g.lineTo(74,145);
    });
    path(hair,()=>{g.moveTo(71,115);g.quadraticCurveTo(70,55,124,53);g.quadraticCurveTo(168,52,179,97);g.quadraticCurveTo(151,95,133,78);g.lineTo(91,104);g.lineTo(82,146);});
    if(index!==2) path(hair,()=>{g.moveTo(88,162);g.quadraticCurveTo(127,186,169,159);g.quadraticCurveTo(167,194,142,207);g.quadraticCurveTo(112,212,93,189);});
    if(index===1) path(coat,()=>{g.moveTo(61,98);g.quadraticCurveTo(71,45,119,34);g.quadraticCurveTo(169,31,184,88);g.quadraticCurveTo(120,68,61,98);});
    for(const x of [109,151]){
      g.strokeStyle=hair;g.lineWidth=3;g.beginPath();g.moveTo(x-11,124);g.quadraticCurveTo(x,116,x+10,123);g.stroke();
      path('#ddbc92',()=>{g.moveTo(x-8,134);g.quadraticCurveTo(x,128,x+8,134);g.quadraticCurveTo(x,139,x-8,134);});
      g.fillStyle='#392d28';g.beginPath();g.arc(x+1,133,3,0,PI*2);g.fill();
    }
    g.strokeStyle=shade;g.lineWidth=2;g.beginPath();g.moveTo(133,128);g.quadraticCurveTo(137,148,145,151);g.quadraticCurveTo(139,157,130,153);g.stroke();
    g.strokeStyle='#954f43';g.beginPath();g.moveTo(119,170);g.quadraticCurveTo(132,176,147,168);g.stroke();
    path('#ceb07b',()=>{g.moveTo(93,220);g.lineTo(142,236);g.lineTo(165,218);g.lineTo(159,252);g.lineTo(133,264);});
    g.fillStyle='#ab8957';g.beginPath();g.arc(155,245,7,0,PI*2);g.fill();
    g.restore();
    for(let i=0;i<9500;i++){
      g.fillStyle=i%2===0?'#f8dcad18':'#1d161818';
      g.fillRect(rng()*w,rng()*h,rng()*3+.35,.6+rng()*1.1);
    }
  });
  return mat('#f1e3d0',{map:texture(s),roughness:.93});
}

export function portrait(b,m,x,y,z,w,h,art){
  b.round([x,y,z],[w+.039,h+.036,.036],m.timber,.009,C);
  b.round([x,y,z+.017],[w+.017,h+.015,.014],m.bronze,.004,C);
  b.plane([x,y,z+.026],[w,h],art,C);
}

export function shieldMaterial() {
  const rng=random(2005);
  const s=canvas(512,512,(g,w,h)=>{
    g.fillStyle='#846049';g.fillRect(0,0,w,h);
    for(let i=0;i<7;i++){
      const x=i*74;
      const grad=g.createLinearGradient(x,0,x+74,0);
      grad.addColorStop(0,'#47362b');grad.addColorStop(.09,'#946748');grad.addColorStop(.43,i%2?'#947052':'#a47c54');grad.addColorStop(1,'#795139');
      g.fillStyle=grad;g.fillRect(x,0,74,w);
      g.fillStyle='#3a2927';g.fillRect(x,0,2.5,w);
    }
    const circle=(radius,color,width)=>{g.beginPath();g.arc(256,256,radius,0,2*PI);g.lineWidth=width;g.strokeStyle=color;g.stroke();};
    circle(226,'#354340',24);
    circle(223,'#b1ae7a',2);
    circle(204,'#bea77c',3);
    for(let i=0;i<8;i++){
      g.save();g.translate(256,256);g.rotate(i*PI/4+.15);
      g.beginPath();g.moveTo(0,-181);g.lineTo(19,-120);g.lineTo(4,-133);g.lineTo(0,-107);g.lineTo(-5,-133);g.lineTo(-16,-118);g.closePath();
      g.fillStyle=i%2?'#8f493a':'#c8a471';g.fill();g.restore();
    }
    g.save();g.translate(256,256);g.rotate(-.28);
    g.fillStyle='#314844';g.beginPath();
    g.moveTo(-147,-33);g.lineTo(-50,-22);g.lineTo(-13,-62);g.lineTo(20,-77);g.lineTo(46,-57);g.lineTo(59,-51);g.lineTo(31,-43);g.lineTo(25,-18);g.lineTo(146,-55);g.lineTo(106,-12);g.lineTo(91,12);g.lineTo(21,20);g.lineTo(41,74);g.lineTo(-11,60);g.lineTo(-44,82);g.lineTo(-32,30);g.lineTo(-112,14);g.closePath();g.fill();
    g.strokeStyle='#b9a276';g.lineWidth=2;g.stroke();g.restore();
    for(let i=0;i<3800;i++){
      const x=rng()*w,y=rng()*h,len=1+rng()*12;
      g.fillStyle=i%3?'#6f52394f':'#efc88c53';
      g.fillRect(x,y, .38+rng()*2.1,len);
    }
    for(let i=0;i<16;i++){
      let x=rng()*w,y=rng()*h;
      g.beginPath();g.moveTo(x,y);g.lineTo(x+11+rng()*30,y-18-rng()*28);g.strokeStyle='#35271e80';g.lineWidth=1+rng()*2;g.stroke();
      g.beginPath();g.moveTo(x+1,y+3);g.lineTo(x+12+rng()*26,y-13-rng()*23);g.strokeStyle='#e9bc7b75';g.lineWidth=1;g.stroke();
    }
  });
  const bumpMap=texture(s,{linear:true});
  const face=mat('#fff3db',{map:texture(s),bumpMap,bumpScale:.019,roughness:.82});
  return face;
}


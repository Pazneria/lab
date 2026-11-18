import { between, random } from './art.js';

const PI = Math.PI;

function wallX(a, x, z0, z1, bottom, top, mat, thickness = .22, cast = true) {
  a.box(thickness, top - bottom, z1 - z0, x, (top + bottom) / 2, (z0 + z1) / 2,
    mat, 0, null, cast);
}

function wallZ(a, z, x0, x1, bottom, top, mat, thickness = .22, cast = true) {
  a.box(x1 - x0, top - bottom, thickness, (x0 + x1) / 2, (top + bottom) / 2, z,
    mat, 0, null, cast);
}

function flagstones(a, x0, x1, z0, z1, material, cold = false) {
  const rng = random(cold ? 438 : 491);
  a.box(x1-x0, .155, z1-z0, (x0+x1)/2, -.111, (z0+z1)/2,
    cold ? 'mortarCold' : 'mortar', 0, null, false);
  let z = z0;
  let row = 0;
  const palette = cold
    ? [0xb9c1b3, 0xb3bcad, 0xe4e5d4, 0xbcc6be, 0xc8c8b4, 0xe6dfc4, 0x98aba2]
    : [0xede3c9, 0xd5c3aa, 0xbfaa8a, 0xc0b7a4, 0xffffff, 0xe0d3bd, 0xe8d8bc];
  while (z < z1 - .08) {
    const depth = Math.min(z1 - z, between(rng, .47, .65));
    let x = x0;
    let col = 0;
    while (x < x1 - .08) {
      let width = between(rng, .55, 1.03);
      if (col === 0 && row % 2) width *= .58;
      if (x1 - x - width < .24) width = x1 - x;
      const tint = palette[Math.floor(rng() * palette.length)];
      a.soft(width - .019, .073, depth - .020, x + width / 2, -.038 + between(rng, -.005, .006),
        z + depth / 2, material, between(rng, -.009, .009), tint, false, .016);
      x += width;
      col++;
    }
    z += depth;
    row++;
  }
}

function casement(a, x, z0, z1, bottom, top, frame = 'oak', inside = 1, divisions = 3) {
  const w = z1-z0;
  const center = (z0+z1)/2;
  for (const z of [z0, z1]) a.soft(.26, top-bottom+.12, .113, x, (top+bottom)/2, z, frame);
  for (const y of [bottom, top]) a.soft(.25, .119, w+.19, x, y, center, frame);
  a.soft(.41, .063, w + .25, x + inside * .056, bottom-.064, center, 'honey');
  const heights = [bottom+.045, (bottom+top)/2, top-.045];
  a.box(.057, .035, w, x, heights[1], center, frame);
  for (let i=1; i<divisions; i++) a.box(.055, top-bottom, .036, x, (top+bottom)/2, z0+i*w/divisions, frame);
  for (let i=0; i<divisions; i++) {
    for (let j=0; j<2; j++) {
      a.plane(w/divisions-.032, heights[j+1]-heights[j]-.028,
        x, (heights[j]+heights[j+1])/2, z0+(i+.5)*w/divisions,
        'panes', 0, inside * PI / 2);
    }
  }
  a.soft(.026, .075, .042, x + inside * .041, heights[1]-.079, center+.029, 'brass');
}

function curtains(a, x, z0, z1, top, inward) {
  a.rod([x,top+.10,z0-.17], [x,top+.10,z1+.17], .021, 'forged');
  for (const end of [-1, 1]) {
    const z = end < 0 ? z0 : z1;
    a.ball(x, top+.10, z+end*.184, .037,.037,.037,'brass');
    for (let i=0; i<8; i++) {
      const wind = end * (i * .064 - .16);
      const zA = z - wind;
      const zB = zA - end * .07;
      const wave = Math.cos(i * PI) * .055;
      const nextWave = -wave;
      const tuck = end * (i - 3.5) * .035;
      a.panel([x + inward * wave, top+.028, zA],
        [x + inward * nextWave, top+.028, zB],
        [x + inward * (nextWave*.34+.045), top-.65, zB+tuck],
        [x + inward * (wave*.34+.045), top-.65, zA+tuck], 'linen');
      a.panel([x + inward * (wave*.34+.045), top-.65, zA+tuck],
        [x + inward * (nextWave*.34+.045), top-.65, zB+tuck],
        [x + inward * nextWave, top-.98-i*.009, zB+tuck*.66],
        [x + inward * wave, top-.98-i*.009, zA+tuck*.66], 'linen');
      a.ring(.036, x, top+.086, zA, 'brass', 0, 0, 0, .93, 1.18, false);
    }
    a.tube([[x-.04,top-.63,z-end*.26],[x+inward*.10,top-.65,z-end*.16],
      [x+inward*.10,top-.65,z+end*.018]], .012, 'rope', 7, 5, false);
  }
}

function plankCeiling(a, x0, x1, z0, z1, height, region) {
  const count = Math.ceil((x1-x0)/.31);
  for (let i=0; i<count; i++) {
    const w = (x1-x0)/count;
    a.box(z1-z0+.09, .105, w-.009, x0 + (i+.5)*w, height, (z0+z1)/2,
      'ceiling', PI/2, a.tint(.25), false);
  }
  const beams = region === 'kitchen' ? 5 : 4;
  for (let i=0; i<beams; i++) {
    const z = z0 + .24 + (z1-z0-.47) * i / (beams-1);
    a.soft(x1-x0+.05, .18, .145, (x1+x0)/2, height-.116, z, 'rafter', 0, a.tint(.13), false, .022);
    for (const x of [x0+.18,x1-.18]) {
      a.beam([x,height-.40,z], [x + (x < -2 ? .40 : -.40), height-.12,z], .115, .12, 'darkOak', null, false);
    }
  }
  a.box(x1-x0, .057, z1-z0, (x0+x1)/2, height+.1, (z0+z1)/2, 'contrast', 0, null, false);
}

function kitchenDoor(a, z) {
  const x = -1.76, w = 1.09;
  a.soft(w, 1.575, .112, x, .7875, z, 'painted', 0, null, true, .018);
  a.soft(w, .229, .112, x, 2.056, z, 'painted', 0, null, true, .018);
  for (const xx of [x-.397, x+.397])
    a.soft(.302, .401, .112, xx, 1.768, z, 'painted', 0, null, true, .018);
  for (const xx of [x-.59,x+.59]) a.soft(.132, 2.31, .20, xx, 1.14, z-.035, 'darkOak');
  a.soft(1.36, .151, .20, x, 2.24, z-.035, 'darkOak');
  for (const xx of [x-.425, x+.425]) a.soft(.082, 1.96,.047,xx,1.09,z-.076,'paintedLite');
  for (const yy of [.18,.98,1.50,2.04]) a.soft(.91, .080, .049,x,yy,z-.073,'paintedLite');
  a.soft(.68,.66,.028,x,.565,z-.069,'greenWood');
  a.soft(.65,.35,.026,x,1.22,z-.069,'greenWood');
  for (const xx of [x-.280,x+.280]) a.soft(.026,.413,.035,xx,1.77,z-.068,'iron');
  for (const y of [1.575,1.961]) a.soft(.589,.026,.035,x,y,z-.068,'iron');
  a.plane(.55,.36,x,1.77,z-.087,'panes',0,PI);
  a.box(.034,.397,.035,x,1.77,z-.102,'paintedLite');
  a.box(.57,.034,.035,x,1.77,z-.102,'paintedLite');
  a.disc(.036,.034,x+.388,1.017,z-.121,'brass',PI/2,0,0,null,true,true);
  a.ball(x+.388,1.017,z-.16,.035,.035,.039,'brass');
  for (const y of [.42,1.69]) {
    a.soft(.14,.043,.029,x-.456,y,z-.114,'forged');
    a.ball(x-.469,y,z-.135,.008,.008,.008,'brass');
  }
  a.stamp('house', .54, .16, x, 2.46, z-.15, 0, PI);
  a.soft(1.17,.021,.28,x,.001,z-.042,'slate');
}

function arch(a, p) {
  const z = p.divider, x0 = p.hallLeft, x1 = p.hallRight;
  const span = x1-x0;
  wallZ(a,z,p.west,x0,0,2.98,'plaster');
  wallZ(a,z,x1,p.east,0,2.98,'plaster');
  const archY = u => 2.035 + .43 * Math.sin(Math.PI*u)**.58;
  for (let i=0; i<18; i++) {
    const u = (i+.5)/18;
    const y = archY(u);
    wallZ(a,z,x0+i*span/18-.001,x0+(i+1)*span/18+.001,y,2.98,'plaster',.22,false);
  }
  for (const face of [-1,1]) {
    const dz = face*.144;
    for (const x of [x0-.018,x1+.018]) {
      a.soft(.143,2.06,.109,x,1.03,z+dz,'darkOak');
      a.soft(.175,.22,.128,x,.11,z+dz,'oak');
      a.soft(.177,.096,.127,x,1.985,z+dz,'oak');
    }
    for (let i=0; i<14; i++) {
      const u=i/14,v=(i+1)/14;
      a.beam([x0+span*u,archY(u)+.022,z+dz],[x0+span*v,archY(v)+.022,z+dz],
        .134,.103,'darkOak',a.tint(.12),false);
    }
    a.soft(.155,.196,.127,(x0+x1)/2,2.513,z+dz,'oak');
  }
  a.soft(span,.030,.29,(x0+x1)/2,.008,z,'slate');
}

export function kitchenShell(a, p) {
  const { west:w,east:e,south:s,divider:d }=p;
  flagstones(a,w,e,d,s,'limestone');
  wallZ(a,s,w,-2.305,0,2.99,'plaster');
  wallZ(a,s,-1.213,e,0,2.99,'plaster');
  wallZ(a,s,-2.31,-1.207,2.165,2.99,'plaster');
  const windows = [
    [w,1.41,3.37,1.185,2.38,1],
    [e,.33,2.99,1.135,2.36,-1],
  ];
  for (const [x,z0,z1,bottom,top,inward] of windows) {
    wallX(a,x,d,z0,0,2.99,'plaster');
    wallX(a,x,z1,s,0,2.99,'plaster');
    wallX(a,x,z0,z1,0,bottom,'plaster');
    wallX(a,x,z0,z1,top,2.99,'plaster');
    wallX(a,x+inward*.124,d,s,.025,.70,'painted',.048);
    for (let z=d+.2; z<s-.08; z+=.29) {
      a.box(.012,.62,.018,x+inward*.154,.353,z,'greenWood',0,null,false);
    }
    wallX(a,x+inward*.158,d,s,.672,.735,'paintedLite',.068,false);
    wallX(a,x+inward*.17,d,s,.03,.116,'darkOak',.075,false);
    casement(a,x,z0,z1,bottom,top,'oak',inward,3);
    if (inward < 0) curtains(a,x-.19,z0+.02,z1-.02,top,inward);
    for (const z of [d+.074,s-.07]) a.soft(.23,2.9,.215,x+inward*.078,1.45,z,'darkOak');
  }
  wallZ(a,s-.12,w,-2.37,.035,.69,'painted',.046);
  wallZ(a,s-.12,-1.14,e,.035,.69,'painted',.046);
  wallZ(a,s-.15,w,-2.37,.66,.73,'paintedLite',.074,false);
  wallZ(a,s-.15,-1.14,e,.66,.73,'paintedLite',.074,false);
  kitchenDoor(a,s-.141);
  arch(a,p);
  plankCeiling(a,w,e,d,s,2.99,'kitchen');
  const hearthX=w+.13;
  a.soft(.39,2.93,1.44,hearthX,1.48,-.27,'foundation',0,0xd3cbbb);
  for (let row=0; row<12; row++) {
    for (let col=0; col<4; col++) {
      const offset = row%2 === 0 ? .046 : -.032;
      a.soft(.075,.224,.333,hearthX+.196,.145+row*.237,-.795+col*.345+offset,'limestone',
        0,a.tint(.23),false,.015);
    }
  }
  a.soft(.48,.115,1.52,w+.235,1.65,-.26,'walnut');
  a.soft(.46,.16,1.52,w+.21,2.79,-.26,'darkOak');
  a.shadow(-3.90,-.3,1.49,1.86,.010);
  a.shadow(-4.18,2.08,1.62,3.63,.012);
  a.shadow(-.32,1.52,1.98,2.6,.014);
  a.shadow(-1.83,4.38,2.33,.99,.012);
}

function workFloor(a, p) {
  a.box(p.east-p.west,.14,p.divider-p.north,(p.east+p.west)/2,-.095,(p.north+p.divider)/2,
    'contrast',0,null,false);
  const rng=random(1596);
  let x=p.west;
  let col=0;
  while (x < p.east-.08) {
    const width=Math.min(p.east-x, between(rng,.19,.32));
    let z=p.north;
    let piece=0;
    while (z < p.divider-.07) {
      let length=between(rng,1.35,2.63);
      if (piece===0 && col%3===0) length *= .64;
      if (p.divider-z-length<.37) length=p.divider-z;
      const tint=[0xbbab96,0xc8b7a1,0xd5c2ab,0xe9d3ba,0xece2cb][Math.floor(rng()*5)];
      a.box(length-.012,.055,width-.010,x+width/2,-.029,z+length/2,'oak',PI/2,tint,false);
      for (const nail of [-1,1]) {
        a.disc(.008,.003,x+width/2+nail*width*.29,.001,z+.055,'forged',0,0,0,null,false);
        a.disc(.008,.003,x+width/2+nail*width*.29,.001,z+length-.057,'forged',0,0,0,null,false);
      }
      z+=length; piece++;
    }
    x+=width; col++;
  }
  a.plane(1.13,2.99,-1.94,.009,-3.50,'rug',-PI/2,0,.033);
  for (let i=0;i<39;i++) {
    const x=-2.48+i*.028;
    for (const z of [-5.02,-1.98]) a.rod([x,.008,z],[x+between(rng,-.012,.012),.008,z+Math.sign(z+3)*.095],
      .006,i%5===0?'rope':'stripedLinen',.006,false);
  }
}

export function workroomShell(a,p) {
  const { west:w,east:e,north:n,divider:d,greenhouseSouth:gs }=p;
  workFloor(a,p);
  wallZ(a,n,w,e,0,3.0,'workPlaster');
  wallX(a,w,n,d,0,3.0,'workPlaster');
  wallX(a,e,gs,d,0,3.0,'workPlaster');
  wallX(a,w+.14,n,d,.025,.75,'greenWood',.059);
  wallX(a,w+.154,n,d,.72,.788,'paintedLite',.076,false);
  wallZ(a,n+.14,w,e,.025,.75,'greenWood',.059);
  wallZ(a,n+.154,w,e,.72,.788,'paintedLite',.076,false);
  for (const z of [n+.09,d-.105]) {
    a.soft(.236,2.95,.212,w+.13,1.47,z,'darkOak');
  }
  plankCeiling(a,w,e,n,d,3.00,'work');
  a.shadow(-4.11,-3.36,1.89,4.04,.012);
  a.shadow(-2.44,-5.79,4.84,1.3,.006);
  a.shadow(.71,-2.25,1.37,1.9,.01);
}

function courses(a, side, seam, x0, x1) {
  const run=x1-x0;
  const wall=side==='x'?wallX:wallZ;
  wall(a,seam,x0,x1,-.12,.352,'mortarCold',.19);
  const columns=Math.ceil(run/.38);
  for (let r=0;r<3;r++) {
    const y=.025+r*.111;
    for (let col=0;col<columns+(r&1);col++) {
      const unit=run/columns;
      const start=Math.max(x0,x0+(col-(r&1)*.5)*unit);
      const end=Math.min(x1,x0+(col+1-(r&1)*.5)*unit);
      const center=(start+end)/2;
      const dx=side==='x'?.222:end-start-.011;
      const dz=side==='x'?end-start-.011:.222;
      a.soft(dx,.102,dz,side==='x'?seam:center,y,side==='x'?center:seam,'brick',
        0,a.tint(.30),false,.012);
    }
  }
  if (side==='x') a.soft(.27,.056,run+.036,seam,.366,(x0+x1)/2,'slate');
  else a.soft(run+.036,.056,.27,(x0+x1)/2,.366,seam,'slate');
}

function greenSide(a,z,x0,x1,base,top) {
  courses(a,'z',z,x0,x1);
  const segments=5;
  const w=(x1-x0)/segments;
  for (let i=0;i<=segments;i++) {
    const x=x0+w*i;
    a.soft(i===0||i===segments?.108:.068,top-base+.14,.104,x,(top+base)/2,z,'greenhouseFrame');
    if (i<segments) {
      for (const [lo,hi] of [[base+.04,1.12],[1.14,top-.04]]) {
        a.plane(w-.067,hi-lo,x+w/2,(lo+hi)/2,z,'panes',0,PI);
      }
    }
  }
  for (const y of [base,1.13,top]) a.soft(x1-x0+.12,y===1.13?.034:.090,.113,(x0+x1)/2,y,z,'greenhouseFrame');
  for (let i=0;i<segments;i++) {
    const x=x0+(i+.5)*w;
    a.ball(x,.404,z+.056,.018,.016,.009,'brass',0,0,0,null,false);
  }
}

function greenGable(a,x,p,base,top,ridge,leftSide) {
  const n=p.greenhouseNorth,s=p.greenhouseSouth,c=p.gable;
  const doorN=p.greenhouseDoorNorth,doorS=p.greenhouseDoorSouth;
  a.soft(.139,top-base+.175,.104,x,(top+base)/2,n,'greenhouseFrame');
  a.soft(.139,top-base+.175,.104,x,(top+base)/2,s,'greenhouseFrame');
  if (!leftSide) courses(a,'x',x,n,s);
  else {
    courses(a,'x',x,n,doorN);
    courses(a,'x',x,doorS,s);
  }
  const columns=leftSide?[n,doorN,-4.04,doorS,-2.34,s]:[n,-5.30,-4.53,c,-3.02,-2.25,s];
  const peak = z => top+(ridge-top)*(1-Math.abs(z-c)/(s-c));
  for (const z of columns.slice(1,-1)) {
    if (leftSide && z>-4.2 && z< -3.9) {
      a.box(.089,peak(z)-top,.053,x,(peak(z)+top)/2,z,'greenhouseFrame');
    } else {
      a.soft(.107,peak(z)-base,.08,x,(peak(z)+base)/2,z,'greenhouseFrame');
    }
  }
  for (let i=0;i<columns.length-1;i++) {
    const z0=columns[i],z1=columns[i+1];
    const door = leftSide && z0>=doorN && z1<=doorS;
    if (!door) {
      for (const [lo,hi] of [[base+.04,1.12],[1.15,top-.043]]) {
        a.plane(z1-z0-.072,hi-lo,x,(lo+hi)/2,(z0+z1)/2,'panes',0,PI/2);
      }
      a.box(.100,.037,z1-z0,x,1.13,(z0+z1)/2,'greenhouseFrame');
    }
    const segment = z0<c && z1>c ? [z0,c,z1] : [z0,z1];
    for (let j=0;j<segment.length-1;j++) {
      const l=segment[j]+.024,r=segment[j+1]-.024;
      a.panel([x,top+.036,l],[x,top+.036,r],[x,peak(r)-.027,r],[x,peak(l)-.027,l],'panes');
    }
  }
  a.soft(.135,.104,s-n+.12,x,top,(n+s)/2,'greenhouseFrame');
  for (const end of [n,s]) a.beam([x,top,end],[x,ridge,c],.118,.115,'greenhouseFrame');
  if (leftSide) {
    for (const z of [doorN,doorS]) {
      a.soft(.24,2.39,.147,x,1.20,z,'greenhouseFrame');
      a.soft(.246,.13,.165,x,.071,z,'greenhouseTrim');
    }
    a.soft(.235,.149,doorS-doorN+.16,x,2.279,(doorN+doorS)/2,'greenhouseFrame');
    a.soft(.33,.038,doorS-doorN-.06,x,.008,(doorN+doorS)/2,'slate');
    a.stamp('glasshouse',.56,.139,x-.135,2.283,(doorN+doorS)/2,0,-PI/2);
    a.soft(.38,.022,.63,x+.31,.023,doorS-.27,'iron');
    for (let i=0;i<7;i++) a.box(.332,.019,.011,x+.31,.042,doorS-.53+i*.085,'greenhouseTrim',0,null,false);
  }
}

export function greenhouseShell(a,p) {
  const x0=p.east,x1=p.greenhouseEast,n=p.greenhouseNorth,s=p.greenhouseSouth,c=p.gable;
  const base=.40,eave=2.43,ridge=3.37;
  flagstones(a,x0,x1,n,s,'slate',true);
  greenSide(a,n,x0,x1,base,eave);
  greenSide(a,s,x0,x1,base,eave);
  greenGable(a,x0,p,base,eave,ridge,true);
  greenGable(a,x1,p,base,eave,ridge,false);
  const count=5,w=(x1-x0)/count;
  for (let i=0;i<=count;i++) {
    const x=x0+i*w;
    a.beam([x,eave,n],[x,ridge,c],.090,.104,'greenhouseFrame');
    a.beam([x,eave,s],[x,ridge,c],.090,.104,'greenhouseFrame');
    if (i===1||i===3||i===5) {
      a.box(.084,.075,s-n,x,2.48,c,'greenhouseTrim');
      a.beam([x,2.48,c],[x,ridge,c],.066,.062,'greenhouseFrame');
    }
    if (i===count) break;
    for (const end of [n,s]) {
      const q=(end+c)/2,k=(eave+ridge)/2;
      const aa=x+.042,bb=x+w-.042;
      a.panel([aa,eave+.025,end],[bb,eave+.025,end],[bb,k+.018,q],[aa,k+.018,q],'panes');
      a.panel([aa,k+.018,q],[bb,k+.018,q],[bb,ridge-.034,c],[aa,ridge-.034,c],'panes');
      a.beam([x,k,q],[x+w,k,q],.044,.053,'greenhouseFrame');
    }
  }
  a.soft(x1-x0+.23,.104,.126,(x0+x1)/2,ridge,c,'greenhouseFrame');
  for (const z of [n,s]) {
    a.soft(x1-x0+.28,.063,.138,(x0+x1)/2,eave+.011,z+Math.sign(z-c)*.12,'greenhouseTrim');
    a.tube([[x1-.14,eave,z+Math.sign(z-c)*.14],[x1+.055,eave-.13,z+Math.sign(z-c)*.16],
      [x1+.10,1.33,z+Math.sign(z-c)*.16],[x1+.10,.22,z+Math.sign(z-c)*.16]],.035,'greenhouseFrame',12,8);
  }
  a.shadow(3.01,-5.69,3.95,1.30,.010);
  a.shadow(3.01,-2.09,3.95,1.38,.010);
  a.shadow(5.03,-3.79,1.28,1.35,.010);
}

function cottageRoof(a, p) {
  const z0=p.north-.25,z1=p.south+.25;
  const ridgeX=(p.west+p.east)/2;
  const edgeY=3.025, ridgeY=4.15;
  const color=[0xffffff,0xe3e6da,0xc4c7bd,0xd2dad0,0xf5e9d3];
  const rng=random(28421);
  for (const side of [-1,1]) {
    const edge=side<0?p.west-.22:p.east+.18;
    const height=x=>edgeY+(ridgeY-edgeY)*Math.abs((x-edge)/(ridgeX-edge));
    const lo=Math.min(edge,ridgeX),hi=Math.max(edge,ridgeX);
    a.panel([lo,height(lo),z0],[lo,height(lo),z1],[hi,height(hi),z1],[hi,height(hi),z0],
      'roofSlate',0xb6bdaf);
    a.panel([lo,height(lo)-.020,z0],[hi,height(hi)-.020,z0],
      [hi,height(hi)-.020,z1],[lo,height(lo)-.020,z1],'roofSlate',0xa9afa3);
    const tiles=9;
    for (let row=0;row<tiles;row++) {
      const x0=edge+(ridgeX-edge)*row/tiles;
      const x1=edge+(ridgeX-edge)*(row+1)/tiles;
      const bottom=Math.min(x0,x1),top=Math.max(x0,x1);
      let z=z0;
      while (z<z1-.015) {
        let d=Math.min(z1-z,between(rng,.41,.62));
        if (z1-z-d<.13) d=z1-z;
        const trim=.004+between(rng,0,.004);
        const clr=color[Math.floor(rng()*color.length)];
        a.panel([bottom,height(bottom)+.010,z+trim],[bottom,height(bottom)+.010,z+d-trim],
          [top,height(top)+.010,z+d-trim],[top,height(top)+.010,z+trim],'roofSlate',clr);
        z+=d;
      }
    }
    a.beam([edge,edgeY,z0],[edge,edgeY,z1],.124,.10,'darkOak',null,false);
    for (const z of [p.north-.14,p.south+.14]) {
      a.beam([edge,edgeY,z],[ridgeX,ridgeY,z],.125,.096,'darkOak',null,false);
      const n=14;
      for(let i=0;i<n;i++) {
        const x=edge+(ridgeX-edge)*(i+.5)/n;
        const y=height(x);
        a.box(Math.abs(edge-ridgeX)/n+.002,y-2.98,.08,x,(y+2.98)/2,z,
          'painted',0,a.tint(.17),false);
      }
    }
  }
  a.beam([ridgeX,ridgeY+.025,z0],[ridgeX,ridgeY+.025,z1],.127,.067,'roofSlate',null,false);
  a.soft(.458,1.59,.79,p.west+.237,3.631,-.276,'foundation',0,null,false,.024);
  a.soft(.552,.106,.906,p.west+.237,4.417,-.276,'slate',0,null,false,.017);
  a.box(.33,.025,.64,p.west+.237,4.473,-.276,'contrast',0,null,false);
}

export function landscape(a,p) {
  cottageRoof(a,p);
  const rng=random(8729);
  a.box(30,.26,29,.9,-.25,-2.4,'soilOutside',0,null,false);
  const patches = [[-6.5,2.25,6], [2.4,2.20,6], [3.25,-7.7,7], [6.8,-3.2,6], [2.95,-.19,6]];
  for (const [x,z,count] of patches) {
    for (let i=0;i<count;i++) {
      const xx=x+between(rng,-1.2,1.2),zz=z+between(rng,-1.2,1.2);
      a.pebble(xx,-.036,zz,between(rng,.55,1.15),.13,between(rng,.58,.95),
        'moss',rng()*6.3,a.tint(.35),false);
      a.pebble(xx,.028,zz-.49,between(rng,.15,.44),between(rng,.12,.43),between(rng,.13,.34),
        'foundation',rng()*6.3,a.tint(.34),false);
      for (let h=0;h<5;h++) {
        const ht=between(rng,.26,.76);
        const dx=between(rng,-.51,.51),dz=between(rng,-.51,.51);
        const burg=rng()<.22?'burgundyLeaf':rng()<.45?'limeLeaf':'darkLeaf';
        a.ball(xx+dx,ht*.47-.065,zz+dz,.079,ht*.58,.040,burg,between(rng,-.8,.8),rng()*6,
          between(rng,-.69,.69),a.tint(.24),false);
      }
    }
  }
  for (let i=0;i<12;i++) {
    const x = i<7 ? -7.5+between(rng,-3.4,-.3) : 8.9+between(rng,-.2,4.2);
    const z = -8.2+i*.78+between(rng,-1.5,1.5);
    const h=between(rng,2.3,4.3);
    a.rod([x,-.2,z],[x+.20,h,z-.125],.064,'root',.020,false);
    for (let j=0;j<4;j++) {
      a.pebble(x+between(rng,-.9,.9),h+between(rng,-.32,.68),z+between(rng,-1.1,1.1),
        between(rng,.64,1.64),between(rng,.58,1.20),between(rng,.70,1.2),
        j%3===0?'silverLeaf':'leaf',rng()*6.3,a.tint(.31),false);
    }
  }
  for (let i=0;i<10;i++) {
    const x=2.1+i*.62;
    for (let j=0;j<2;j++) {
      a.soft(.596,.166, .32,x+(j&1)*.24,.038+.164*j,-.29+.042*Math.sin(i*.8),
        'foundation',between(rng,-.09,.09),a.tint(.25),false,.037);
    }
  }
  for (let i=0;i<5;i++) a.soft(.66,.105,.45,2.15+i*.68,-.090,-.74+.16*Math.sin(i*.91),
    'slate',between(rng,-.2,.2),a.tint(.23),false,.045);
}

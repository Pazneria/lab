import * as T from '../vendor/three.module.min.js';

const PI = Math.PI;
const TAU = PI * 2;
const singleBox = new T.BoxGeometry(1,1,1);
const driedLeaf = new T.SphereGeometry(1,7,4);
const bowlProfile = [[0,0],[.44,0],[.52,.08],[.68,.18],[.84,.44],[.96,.76],
  [1,.95],[.992,1],[.925,1],[.908,.92],[.83,.62],[.70,.37],[.52,.22],[0,.20]];
const cupProfile = [[0,0],[.64,0],[.75,.08],[.84,.19],[.90,.50],[1,.94],[.995,1],
  [.87,1],[.861,.93],[.79,.51],[.70,.22],[.60,.15],[0,.15]];
const jarProfile = [[0,0],[.72,0],[.88,.05],[.98,.17],[1,.69],[.97,.83],[.75,.91],
  [.70,.96],[.72,1],[.60,1],[.59,.93],[.78,.84],[.88,.72],[.86,.19],[.68,.11],[0,.11]];
const bottleProfiles = {
  reagent: [[0,0],[.74,0],[.90,.05],[.98,.14],[.96,.53],[.83,.66],[.50,.73],
    [.34,.77],[.32,.95],[.39,.965],[.39,1],[.27,1],[.26,.96],[.245,.81]],
  round: [[0,0],[.54,0],[.74,.057],[.93,.165],[1,.36],[.97,.53],[.83,.67],
    [.45,.77],[.27,.83],[.23,.94],[.33,.965],[.33,1],[.21,1],[.205,.89]],
  vial: [[0,0],[.72,0],[.98,.055],[1,.13],[1,.82],[.88,.91],[.88,.955],
    [1,.966],[1,1],[.73,1],[.73,.93]],
};

function forward(x, z, angle, depth) {
  return [x + Math.sin(angle) * depth, z + Math.cos(angle) * depth];
}

export function bowl(a,x,y,z,r,h,material = 'porcelain', rim = null) {
  a.lathe(bowlProfile, material, x,y,z,r,h,r,0,true,24);
  if (rim) a.ring(r*.951,x,y+h*.963,z,rim,-PI/2,0,0,1,1,false);
}

export function plate(a,x,y,z,r,material = 'porcelain', mark = 'blueCeramic') {
  a.lathe([[0,0],[.53,0],[.61,.13],[.79,.32],[.98,.69],[1,1],
    [.945,1],[.88,.82],[.67,.44],[.50,.33],[0,.32]],
  material,x,y,z,r,.025,r,0,true,28);
  if (mark) a.lathe([[.73,.47],[.75,.52],[.78,.58],[.80,.59]],mark,x,y+.001,z,r,.025,r,0,false,28);
}

export function mug(a,x,y,z,r = .075,h = .103,material = 'porcelain',drink = null, angle = 0) {
  a.lathe(cupProfile,material,x,y,z,r,h,r,0,true,24);
  const [hx,hz]=forward(x,z,angle,r*1.075);
  a.ring(h*.338,hx,y+h*.55,hz,material,0,angle+PI/2,0,.72,1.12);
  if (drink) {
    a.disc(r*.82,.007,x,y+h*.70,z,drink,0,0,0,null,false,true);
    a.lathe([[.75,0],[.82,.18],[.84,0]],'ochreGlaze',x,y+h*.706,z,r,.005,r,0,false,20);
  }
}

export function crock(a,x,y,z,r,h,material, lid = true, label = null, angle = 0) {
  a.lathe(jarProfile,material,x,y,z,r,h,r,0,true,24);
  if (lid) {
    a.lathe([[0,0],[.74,0],[.82,.22],[.85,.46],[.81,.62],[.64,.78],
      [.23,.79],[.22,1],[.12,1.25],[0,1.25]],material,x,y+h*.98,z,r,h*.18,r,0,true,22);
  }
  if (label) {
    const [xx,zz]=forward(x,z,angle,r+.0015);
    a.stamp(label,r*1.03,h*.38,xx,y+h*.52,zz,0,angle);
  }
}

export function terracottaPot(a,x,y,z,r,h,material = 'terracotta') {
  const profile=[[0,0],[.62,0],[.665,.06],[.72,.14],[.92,.84],[1,.87],[1,.985],
    [.969,1],[.847,1],[.827,.89],[.77,.75],[.58,.16],[.48,.12],[0,.12]];
  a.lathe(profile,material,x,y,z,r,h,r,0,true,18);
  a.disc(r*.806,h*.045,x,y+h*.836,z,'dirt',0,0,0,null,false);
  a.lathe([[.90,.856],[.97,.869],[.991,.894]],'terracottaDark',x,y,z,r+.001,h,r+.001,0,false,18);
  return y+h*.86;
}

export function bottle(a,x,y,z,r,h,shape,glass,content = null,label = null,angle = 0,cap = 'ginger') {
  a.lathe(bottleProfiles[shape],glass,x,y,z,r,h,r,0,false,20);
  if (content) {
    if (shape==='round') {
      a.lathe([[0,0],[.51,0],[.66,.065],[.85,.17],[.91,.32],[.89,.40],[0,.40]],
        content,x,y+h*.041,z,r,h,r,0,false,20);
    } else {
      const fill=shape==='vial'?.56:.47;
      a.lathe([[0,0],[.68,0],[.90,.10],[.92,.19],[.915,fill],[0,fill]],
        content,x,y+h*.045,z,r,h,r,0,false,18);
    }
  }
  const stopper=shape==='vial'?.78:shape==='round'?.24:.28;
  if (cap) {
    a.lathe([[0,0],[stopper*.86,0],[stopper*.95,.19],[stopper*1.13,.73],
      [stopper*1.1,1],[0,1]],cap,x,y+h*.975,z,r,h*.145,r,0,true,16);
    if (cap==='wax') {
      const [dx,dz]=forward(x,z,angle,stopper*r);
      a.ball(dx,y+h,dz,.013,.029,.014,'berryGlaze',0,0,.08,null,false);
    }
  }
  const hLabel=shape==='vial'?.31:.27;
  if (label) {
    const [xx,zz]=forward(x,z,angle,r+.0017);
    a.stamp(label,r*1.18,hLabel*h,xx,y+h*.38,zz,0,angle,.027);
  }
  const side=angle-.43;
  const [xx,zz]=forward(x,z,side,r*.951);
  a.ball(xx,y+h*(shape==='vial'?.66:.49),zz,r*.075,h*.12,r*.05,'panes',-.07,side,.1,null,false);
}

export function book(a,x,y,z,w,d,h,material,angle = 0,open = null) {
  const c=Math.cos(angle),s=Math.sin(angle);
  const bx=x-s*d*.49,bz=z-c*d*.49;
  a.soft(w,h,d,x,y+h/2,z,'parchment',angle,null,true,.008);
  a.soft(w+.019,.013,d+.017,x,y+.007,z,material,angle,null,true,.005);
  a.soft(w+.019,.014,d+.016,x,y+h,z,material,angle,null,true,.005);
  a.soft(w+.02,h+.018,.020,bx,y+h/2,bz,material,angle,null,true,.008);
  for (let i=1;i<5;i++) a.box(w-.013,.002,d*.012,x+s*d*.503,y+h*i/5,z+c*d*.503,
    i%2?'ginger':'porcelainShadow',angle,null,false);
  if (open) {
    a.soft(w*.98,h*.22,d*.94,x,y+h+.007,z,'parchment',angle,null,true,.009);
    a.stamp(open,w*.962,d*.92,x,y+h+.012+h*.11,z,-PI/2,0,angle);
    a.rod([x-s*d*.437,y+h+.015,z-c*d*.437],[x+s*d*.44,y+h+.014,z+c*d*.44],.005,
      'ginger',.004,false);
    a.tube([
      [x,y+h+.025,z],[x+s*d*.38,y+h+.024,z+c*d*.38],
      [x+s*d*.54-.011,y+h+.014,z+c*d*.54],[x+s*d*.67-.02,y+h-.011,z+c*d*.65],
    ],.005,'berryGlaze',7,5,false);
  }
}

export function uprightBook(a,x,y,z,w,h,d,material,tilt = 0) {
  const center=x-Math.sin(tilt)*h/2;
  a.mesh(singleBox,'parchment',center,y+h/2,z,w*.73,h*.953,d,0,0,tilt);
  a.mesh(singleBox,material,center,y+h/2,z+d*.485,w,h,.024,0,0,tilt);
  for (const px of [-.48,.48]) a.mesh(singleBox,material,
    center+px*w,y+h/2,z,.011,h,d+.012,0,0,tilt);
  for (const f of [.34,.41,-.36]) {
    const dx=Math.sin(tilt)*h*f,dy=Math.cos(tilt)*h*f;
    a.mesh(singleBox,f===.41?'brass':'parchment',center-dx,y+h/2+dy,z+d*.499,
      w*.67,.011,.007,0,0,tilt,null,false);
  }
}

export function candle(a,x,y,z,r,h,lit = true) {
  a.disc(r*1.24,.015,x,y+.007,z,'brass',0,0,0,null,true,true);
  a.lathe([[0,0],[.91,0],[1,.10],[.91,.62],[.92,.93],[.83,1],[.48,.94],[0,.95]],
    'wax',x,y+.015,z,r,h,r,0,true,17);
  for (let i=0;i<4;i++) {
    const a0=i*TAU/4+.15;
    a.tube([[x+r*.83*Math.cos(a0),y+h*.97+.012,z+r*.83*Math.sin(a0)],
      [x+r*.95*Math.cos(a0),y+h*.82,z+r*.95*Math.sin(a0)],
      [x+r*.946*Math.cos(a0),y+h*(.51+i*.071),z+r*.946*Math.sin(a0)]],r*.12,'wax',5,5,false);
  }
  a.rod([x,y+h*.98,z],[x+.006,y+h+.031,z-.004],.003,'wick',.002,false);
  if (lit) {
    a.lathe([[0,0],[.46,.10],[.78,.32],[.53,.61],[.17,.87],[0,1]],
      'lightWarm',x+.006,y+h+.027,z-.004,r*.33,r*1.24,r*.33,0,false,10);
  }
}

export function brassKnob(a,x,y,z,angle = PI/2,wide = .024) {
  a.disc(wide*.98,.014,x,y,z,'brass',PI/2,0,0,null,true,true);
  const [xx,zz]=forward(x,z,angle,.018);
  a.ball(xx,y,zz,wide,.65*wide,wide,'brass',0,0,0,null,true,true);
}

export function peg(a,x,y,z,angle = 0) {
  const [xx,zz]=forward(x,z,angle,.087);
  a.rod([x,y,z],[xx,y+.027,zz],.014,'darkOak',.010);
  a.ball(xx,y+.029,zz,.020,.019,.020,'honey',0,0,0,null,false);
}

export function herbBundle(a,x,y,z,size,dir,material = 'dryLeaf') {
  for (let i=0;i<9;i++) {
    const phi = i * 2.399963;
    const s = size*(.57+.047*i);
    const u = Math.cos(phi), v=Math.sin(phi);
    const top=[x+.014*u,y,z+.014*v];
    const tip=[x+s*.32*u,y+dir*s,z+s*.24*v];
    a.tube([top,[x+s*.075*u,y+dir*s*.42,z+s*.06*v],tip],.0034,'root',5,5,false);
    for (let j=0;j<3;j++) {
      const t=.49+.16*j, lx=x+(tip[0]-x)*t, ly=y+dir*s*t, lz=z+(tip[2]-z)*t;
      a.mesh(driedLeaf,material,lx+.019*u,ly,lz+.016*v,.015,s*.12,.009,
        v*.6,phi,u*.72,null,false);
    }
  }
  a.ring(size*.085,x,y+dir*.028,z,'rope',-PI/2,0,0,1,1,false);
  a.ring(size*.088,x,y+dir*.037,z,'rope',-PI/2,0,0,1,1,false);
}

export function closedCrate(a,x,y,z,w,h,d,material = 'darkOak',angle = 0) {
  a.soft(w,h,d,x,y+h/2,z,material,angle,null,true,.013);
  const c=Math.cos(angle),s=Math.sin(angle);
  for (let i=0;i<4;i++) {
    const yy=y+h*(i+.5)/4;
    for (const q of [-1,1]) {
      a.box(w+.013,h*.208,.021,x+s*q*d/2,yy,z+c*q*d/2,
        i%3===0?'honey':'oak',angle,a.tint(.22),false);
      a.box(.021,h*.21,d+.016,x+c*q*w/2,yy,z-s*q*w/2,'oak',angle,a.tint(.22),false);
    }
  }
  for (const q of [-1,1]) {
    for (const side of [-1,1]) {
      a.box(.034,h+.018,.035,x+c*q*w*.41+s*side*d*.504,y+h/2,z-s*q*w*.41+c*side*d*.504,
        'darkOak',angle,null,false);
    }
  }
  a.box(w*.26,.037,.028,x+s*d*.517,y+h*.72,z+c*d*.517,'contrast',angle,null,false);
}

export function cloth(a, points, width, material = 'linen', stripes = true) {
  for (let i=1;i<points.length;i++) {
    const p=points[i-1],q=points[i];
    for (let column=0;column<10;column++) {
      const x0=(column/10-.5)*width,x1=((column+1)/10-.5)*width;
      const fold0=(1+Math.sin(column*1.83))*width*.041,fold1=(1+Math.sin((column+1)*1.83))*width*.041;
      const mat=stripes && (column===1||column===8)?'stripedLinen':material;
      a.panel([p[0],p[1]+fold0,p[2]+x0],[p[0],p[1]+fold1,p[2]+x1],
        [q[0],q[1]+fold1,q[2]+x1],[q[0],q[1]+fold0,q[2]+x0],mat);
    }
  }
}

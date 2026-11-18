import * as T from '../vendor/three.module.min.js';
import { random, between } from './art.js';
import { terracottaPot, closedCrate, plate } from './vessels.js';

const PI=Math.PI;
const HALF=PI/2;
const TAU=PI*2;
const benchY=.794;
const up=new T.Vector3(0,1,0);
const side=new T.Vector3(0,0,1);
const axis=new T.Vector3();
const right=new T.Vector3();
const normal=new T.Vector3();
const matrix=new T.Matrix4();
const rotation=new T.Quaternion();
const twist=new T.Quaternion();

function leafGeometry(type) {
  const positions=[],colors=[],uv=[],indices=[];
  const rows=type==='blade'?5:6;
  const columns=type==='blade'?3:5;
  for (let row=0;row<=rows;row++) {
    const t=row/rows;
    const hull=Math.max(.015,Math.sin(PI*t)**(type==='blade'?.67:type==='heart'?.57:.91));
    const shape=type==='heart'?(1.17-.43*t):type==='blade'?(1.2-.53*t):(1.07-.15*t);
    for (let col=0;col<columns;col++) {
      const u=2*col/(columns-1)-1,edge=Math.abs(u);
      const ripple=.018*Math.sin(row*2.21+col*1.9)*edge*hull;
      const fold=.048*Math.sin(PI*t)*(1-edge*edge)+ripple;
      const bend=type==='blade'?.205:type==='heart'?.073:.118;
      const v=t+(type==='heart'?.078*(1-edge)*Math.sin(PI*t):0);
      positions.push(u*hull*shape,t,bend*t*(1-t)*2.12+fold-.07*t**4);
      uv.push((u+1)/2,v);
      const vein=edge===0?.162:edge===1?-.088:.013;
      const lum=.89+vein+Math.sin(row*1.8+col*.9)*.064;
      colors.push(lum+vein*.07,lum+vein*.16,lum-vein*.27);
      if (col<columns-1 && row<rows) {
        const at=row*columns+col;
        indices.push(at,at+1,at+columns,at+columns,at+1,at+columns+1);
      }
    }
  }
  const geo=new T.BufferGeometry();
  geo.setAttribute('position',new T.Float32BufferAttribute(positions,3));
  geo.setAttribute('color',new T.Float32BufferAttribute(colors,3));
  geo.setAttribute('uv',new T.Float32BufferAttribute(uv,2));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

const leaves=Object.fromEntries(['blade','heart','oval'].map(key=>[key,leafGeometry(key)]));

function leaf(a,origin,delta,width,shape,material,roll=0,tint=null) {
  axis.set(...delta);
  const length=axis.length();
  if (length<.00001) return;
  axis.multiplyScalar(1/length);
  right.crossVectors(axis,Math.abs(axis.dot(up))<.952?up:side).normalize();
  normal.crossVectors(right,axis).normalize();
  matrix.makeBasis(right,axis,normal);
  rotation.setFromRotationMatrix(matrix).multiply(twist.setFromAxisAngle(up,roll));
  a.mesh(leaves[shape],material,...origin,width,length,length,0,0,0,tint,false,null,rotation);
}

function supports(a,x,z,w,d) {
  for (const xx of [x-w*.434,x+w*.434]) {
    for (const zz of [z-d*.365,z+d*.365]) {
      a.soft(.086,.719,.089,xx,.372,zz,'greenWood',0,null,true,.011);
      a.soft(.094,.039,.101,xx,.038,zz,'greenhouseFrame');
      a.disc(.015,.008,xx,.710,zz+d*.044,'tin',0,0,0,null,false);
    }
    a.soft(.09,.063,d*.875,xx,.725,z,'oak');
    a.soft(.086,.061,d*.778,xx,.247,z,'darkOak');
    a.beam([xx,.512,z-d*.334],[xx,.706,z-d*.119],.053,.066,'greenWood');
  }
  for (const zz of [z-d*.425,z+d*.425]) {
    a.soft(w-.08,.097,.054,x,.706,zz,'greenWood');
    a.soft(w-.14,.060,.063,x,.246,zz,'darkOak');
  }
  const n=7;
  for (let i=0;i<n;i++) {
    const zz=z-d/2 + (i+.5)*d/n;
    a.soft(w,.041,d/n-.014,x,.772,zz,i%4===0?'honey':'oak',0,a.tint(.25),true,.007);
    if (i%2===0) {
      a.soft(w-.173,.032,d/n-.016,x,.288,zz,'oak',0,a.tint(.22),true,.007);
      for (const xx of [x-w*.435,x+w*.435]) a.disc(.011,.006,xx,.795,zz,'forged',0,0,0,null,false);
    }
  }
}

function potLabel(a,key,x,y,z,angle) {
  const dx=Math.sin(angle),dz=Math.cos(angle);
  a.rod([x,y-.085,z],[x+dx*.034,y+.14,z+dz*.034],.009,'honey',.007,false);
  a.soft(.193,.089,.021,x+dx*.031,y+.112,z+dz*.031,'walnut',angle,null,true,.005);
  a.stamp(key,.180,.076,x+dx*.044,y+.112,z+dz*.044,0,angle);
}

function fern(a,x,y,z,size,rng) {
  for (let i=0;i<9;i++) {
    const phi=i*TAU/9+between(rng,-.14,.14);
    const dx=Math.cos(phi),dz=Math.sin(phi);
    const length=size*between(rng,.72,1.16), rise=length*between(rng,.67,.96);
    const tip=t=>[x+dx*length*t*.92,y+rise*(Math.sin(t*PI*.59)*.95-.17*t*t),
      z+dz*length*t*.92];
    a.tube([tip(0),tip(.2),tip(.5),tip(.8),tip(1)],.0035,'stem',11,5,false);
    for (let j=0;j<9;j++) {
      const t=.24+j*.079;
      const point=tip(t);
      const spread=length*(.05+.23*Math.sin(PI*t)**.76)*(1.08-.33*t);
      for (const s of [-1,1]) {
        const curl=(j%2===0?.05:.01)*length;
        const prim= j%4===0?'limeLeaf':j%3===0?'darkLeaf':'leaf';
        leaf(a,point,[(dx*.25-s*dz)*spread, (1.2-t)*spread*.15+curl, (dz*.25+s*dx)*spread],
          spread*.19,'blade',prim,s*.21+between(rng,-.16,.19),a.tint(.16));
      }
    }
    leaf(a,tip(.935),[dx*.068,-.010,dz*.068],.011,'blade','limeLeaf',.03);
  }
}

function mint(a,x,y,z,size,rng,n=8) {
  for (let i=0;i<n;i++) {
    const phi=i*2.399963+between(rng,-.2,.21),dx=Math.cos(phi),dz=Math.sin(phi);
    const h=size*between(rng,.63,1.12);
    const radi=between(rng,.022,.098);
    const top=t=>[x+dx*(radi+h*.31*t*t),y+h*t,z+dz*(radi+h*.31*t*t)];
    a.tube([top(0),top(.45),top(1)],.0045,'stem',7,5,false);
    for (let row=0;row<4;row++) {
      const t=.35+row*.165,loc=top(t);
      const angle=phi+row*1.31;
      for (const s of [-1,1]) {
        const length=size*(.36-row*.048)*between(rng,.81,1.13);
        const d=[s*Math.cos(angle)*length,.39*length,s*Math.sin(angle)*length];
        const m=(i+row)%5===0?'limeLeaf':(row%2?'leaf':'darkLeaf');
        leaf(a,loc,d,length*.39,'oval',m,between(rng,-.28,.31),a.tint(.15));
      }
    }
  }
}

function oxalis(a,x,y,z,size,rng) {
  for (let i=0;i<11;i++) {
    const phi=i*2.399963+between(rng,-.3,.3);
    const ht=size*between(rng,.46,1.14);
    const dx=Math.cos(phi),dz=Math.sin(phi);
    const joint=[x+dx*ht*.66,y+ht,z+dz*ht*.66];
    a.tube([[x+dx*.012,y,z+dz*.012],[x+dx*ht*.36,y+ht*.61,z+dz*ht*.36],joint],
      .0036,'root',6,5,false);
    for (let n=0;n<3;n++) {
      const angle=phi+n*TAU/3;
      const length=size*between(rng,.20,.32);
      leaf(a,joint,[Math.cos(angle)*length,-.19*length,Math.sin(angle)*length],
        length*.54,'heart',i%4===0?'silverLeaf':'burgundyLeaf',(n-1)*.3,a.tint(.19));
    }
  }
}

function bloom(a,x,y,z,r,petals,material,seed) {
  for (let j=0;j<petals;j++) {
    const angle=j*TAU/petals+seed;
    leaf(a,[x,y,z],[Math.cos(angle)*r,.22*r,Math.sin(angle)*r],r*.395,
      'heart',material,Math.sin(j*5)*.21);
  }
  a.ball(x,y+.006,z,r*.24,r*.19,r*.24,'ochreGlaze',0,0,0,null,false);
}

function mallow(a,x,y,z,size,rng) {
  for (let i=0;i<8;i++) {
    const phi=i*2.399963;
    const dx=Math.cos(phi),dz=Math.sin(phi),h=size*between(rng,.54,1.16);
    const tip=t=>[x+dx*h*(.10+.35*t),y+h*t,z+dz*h*(.10+.35*t)];
    a.tube([tip(0),tip(.38),tip(.71),tip(1)],.0039,'stem',7,5,false);
    for (let j=0;j<3;j++) {
      const origin=tip(.26+.19*j),ang=phi+j*1.04;
      const sz=size*(.224-j*.024);
      leaf(a,origin,[Math.cos(ang)*sz,.3*sz,Math.sin(ang)*sz],sz*.48,'heart',
        j%2?'silverLeaf':'leaf',.08+(j-1)*.21,a.tint(.09));
    }
    const mat=i%4===0?'creamPetal':i%3===0?'lilacPetal':'petal';
    bloom(a,...tip(1),between(rng,.039,.065),5,mat,phi);
    if(i%2===0) {
      const base=tip(.73),fl=tip(.867);
      fl[0]+=.103*dx; fl[2]+=.103*dz;
      a.rod(base,fl,.0027,'stem',.0018,false);
      a.ball(...fl,.012,.018,.012,'petal',0,phi,0,null,false);
    }
  }
}

function seedTray(a,x,z,w,d,rows,cols,rng) {
  const base=benchY;
  a.soft(w,.057,d,x,base+.030,z,'terracottaDark',0,null,true,.012);
  a.soft(w-.046,.010,d-.049,x,base+.065,z,'dirt',0,null,true,.007);
  for (const dz of [-d/2+.015,d/2-.015]) a.soft(w,.039,.024,x,base+.068,z+dz,'terracotta');
  for (const dx of [-w/2+.012,w/2-.012]) a.soft(.023,.039,d,x+dx,base+.067,z,'terracotta');
  for(let j=0;j<rows;j++) for(let i=0;i<cols;i++) {
    if((i+2*j)%6===4) continue;
    const xx=x+(i+.5-cols/2)*(w-.047)/cols+between(rng,-.016,.016);
    const zz=z+(j+.5-rows/2)*(d-.053)/rows+between(rng,-.012,.012);
    const h=between(rng,.046,.108);
    const tip=[xx+.012,base+.067+h,zz+.006];
    a.rod([xx,base+.070,zz],tip,.0028,'stem',.002,false);
    const phi=between(rng,0,TAU);
    for (const s of [-1,1]) {
      const d=[s*Math.sin(phi)*.052,.016,s*Math.cos(phi)*.052];
      leaf(a,tip,d,.020,'oval',(i+j)%2?'leaf':'limeLeaf',s*.35);
    }
  }
}

function wateringCan(a,x,y,z) {
  a.lathe([[0,0],[.76,0],[.91,.07],[.98,.16],[1,.79],[.89,.93],[.66,1],[.50,1],
    [.50,.86],[.71,.74],[.76,.13],[0,.13]],'tin',x,y,z,.144,.214,.144,0,true,26);
  a.ring(.140,x,y+.050,z,'greenhouseFrame',-HALF,0,0,1,1,false);
  a.ring(.110,x,y+.187,z,'greenhouseFrame',-HALF,0,0,1,1,false);
  a.tube([[x+.105,y+.072,z],[x+.196,y+.115,z+.02],
    [x+.282,y+.214,z+.052],[x+.350,y+.282,z+.065]],.021,'tin',12,8);
  a.rod([x+.333,y+.254,z+.059],[x+.377,y+.303,z+.071],.022,'tin',.046);
  a.rod([x+.376,y+.302,z+.071],[x+.386,y+.312,z+.073],.044,'brass',.047);
  for (let i=0;i<8;i++) {
    const angle=i*TAU/8;
    a.ball(x+.388+.018*Math.cos(angle),y+.316-.016*Math.cos(angle),z+.073+.028*Math.sin(angle),
      .0036,.002,.0038,'iron',0,0,0,null,false);
  }
  a.tube([[x-.042,y+.202,z],[x-.102,y+.296,z-.016],[x-.19,y+.295,z-.028],
    [x-.222,y+.194,z-.029],[x-.14,y+.125,z-.010]],.013,'greenhouseFrame',17,8);
  a.tube([[x-.092,y+.291,z-.013],[x-.141,y+.307,z-.024],[x-.186,y+.294,z-.028]],.019,
    'honey',8,8);
}

function trayTools(a) {
  wateringCan(a,1.641,benchY,-2.19);
  const x=1.608,z=-2.519,y=benchY+.010;
  a.soft(.174,.014,.067,x,y,z,'linen',-.17,null,true,.006);
  a.rod([x-.083,y+.013,z+.055],[x-.215,y+.014,z+.080],.012,'honey',.013);
  a.rod([x-.074,y+.014,z+.055],[x-.031,y+.018,z+.044],.009,'brass');
  a.ball(x+.011,y+.016,z+.035,.073,.011,.034,'tin',0,.177,.009,null,true,true);
  for (let i=0;i<9;i++) {
    const dx=between(a.rng,.019,.138),dz=between(a.rng,-.035,.066);
    a.pebble(x+dx,y-.006,z+dz,.007,.006,.005,'dirt',i*.71,null,false);
  }
}

function vine(a) {
  const x=4.50,z=-1.958;
  const y=terracottaPot(a,x,benchY,z,.186,.219,'terracottaDark');
  const points=[[x,y,z],[x+.041,y+.199,z-.033],[x-.036,y+.398,z-.017],
    [x-.081,y+.626,z-.054],[x-.015,y+.817,z-.065],[x+.083,y+.981,z-.048],
    [x+.015,y+1.188,z-.048],[x+.11,y+1.268,z-.080]];
  for (const dx of [-.172,.173]) a.rod([x+dx,y,z-.029],[x+dx,y+1.151,z-.029],.008,'honey',.006);
  for (const dy of [.327,.637,.941]) a.rod([x-.179,y+dy,z-.029],[x+.181,y+dy,z-.029],.006,
    'honey',.006,false);
  const curve=new T.CatmullRomCurve3(points.map(p=>new T.Vector3(...p)));
  a.tube(points,.0058,'stem',25,6,false);
  for(let i=0;i<15;i++) {
    const t=.08+i*.061,loc=curve.getPoint(t).toArray(),phi=i*2.399963;
    const r=.082+.06*Math.sin(PI*t)+between(a.rng,-.018,.018);
    const v=[r*Math.sin(phi),r*.17-.041*r*Math.cos(phi),r*Math.cos(phi)];
    leaf(a,loc,v,r*.43,'heart',i%4===0?'limeLeaf':'darkLeaf',Math.sin(i)*.41,a.tint(.09));
    if (i%3===1) {
      const tip=[loc[0]+v[0]*.46,loc[1]-.071,loc[2]+v[2]*.53];
      a.rod(loc,tip,.003,'stem',.002,false);
      a.lathe([[0,0],[.54,.06],[.92,.21],[1,.45],[.89,.64],[.66,.79],
        [.33,.89],[.25,1],[0,1]],'pearl',tip[0],tip[1]-.039,tip[2],.020,.051,.020,0,false,13);
      a.ring(.014,tip[0],tip[1]-.006,tip[2],'limeLeaf',-HALF,0,0,1,1,false);
    }
  }
  potLabel(a,'orb',x-.085,benchY+.091,-2.205,PI-.17);
}

function hangingPot(a,x,y,z,rng) {
  const base=terracottaPot(a,x,y,z,.163,.139,'celadon');
  const bind=[x,y+.642,z];
  a.rod(bind,[x,y+.836,z],.011,'forged',.008,false);
  a.rod([x,y+.831,z],[x-.066,y+.841,z],.013,'greenhouseFrame',.012,false);
  for(let i=0;i<3;i++) {
    const phi=i*TAU/3+.2;
    const xx=x+.143*Math.cos(phi),zz=z+.143*Math.sin(phi);
    a.tube([[xx,y+.047,zz],[xx,y+.151,zz],[x+.093*Math.cos(phi),y+.304,z+.093*Math.sin(phi)],
      bind],.005,'rope',8,5,false);
  }
  for(let i=0;i<6;i++) {
    const phi=i*TAU/6,dx=Math.cos(phi),dz=Math.sin(phi);
    const fall=between(rng,.22,.48);
    const pt=t=>[x+dx*(.086+.111*Math.sin(t*2.25)),base+.050*Math.sin(t*PI)-fall*t*t,
      z+dz*(.086+.111*Math.sin(t*2.25))];
    a.tube([pt(0),pt(.35),pt(.7),pt(1)],.003,'stem',8,5,false);
    for (let j=0;j<5;j++) {
      const t=.10+j*.174;
      const length=between(rng,.059,.084),ang=phi+(j%2?-.8:.89);
      leaf(a,pt(t),[length*Math.cos(ang),-.40*length,length*Math.sin(ang)],length*.46,'heart',
        j%2?'limeLeaf':'silverLeaf',between(rng,-.30,.30),a.tint(.10));
    }
  }
}

function citrus(a,x,z,rng) {
  const base=terracottaPot(a,x,.006,z,.274,.365,'terracottaDark');
  a.disc(.254,.026,x,.018,z,'terracotta',0,0,0,null,true,true);
  const trunk=[[x,base+.011,z],[x+.069,base+.276,z-.014],[x+.030,base+.653,z+.034],
    [x-.006,base+.890,z+.014],[x-.056,base+1.13,z-.031]];
  a.tube(trunk,.021,'root',14,8);
  for(let i=0;i<10;i++) {
    const phi=i*2.399963,dx=Math.cos(phi),dz=Math.sin(phi);
    const h=.44+i*.067+between(rng,-.091,.085);
    const s=between(rng,.178,.352)*(1.15-.041*i);
    const start=[x+.033,base+h,z-.008];
    const b=[x+dx*s*.46,base+h+.081,z+dz*s*.52];
    const tip=[x+dx*s,base+h+.155,z+dz*s];
    a.tube([start,b,tip],.0062,'root',7,6,false);
    for (let j=0;j<6;j++) {
      const t=.28+j*.136;
      const from=[start[0]+(tip[0]-start[0])*t,start[1]+.17*t,start[2]+(tip[2]-start[2])*t];
      const angle=phi + (j%2===0 ? .91:-.91);
      const l=between(rng,.083,.157);
      leaf(a,from,[Math.cos(angle)*l,l*.34,Math.sin(angle)*l],l*.38,'oval',
        (i+j)%4===0?'limeLeaf':'darkLeaf',between(rng,-.52,.47),a.tint(.16));
    }
    if(i%2===0) {
      const xx=tip[0]-.021*dx,zz=tip[2]-.022*dz,yy=tip[1]-.034;
      a.rod(tip,[xx,yy,zz],.0038,'stem',.003,false);
      a.ball(xx,yy-.038,zz,.039,.044,.041,'fruit',.18,phi,.09,null,true,true);
    }
  }
  pegStakes(a,x,z,base);
}

function pegStakes(a,x,z,y) {
  a.rod([x+.119,y,z-.056],[x+.119,y+.897,z-.056],.011,'honey',.008,false);
  a.tube([[x+.117,y+.637,z-.055],[x+.057,y+.644,z-.047],[x+.003,y+.646,z+.014],
    [x+.048,y+.645,z+.035],[x+.114,y+.639,z-.045]],.0049,'rope',11,5,false);
}

function storedPots(a) {
  closedCrate(a,2.082,.310,-5.528,.499,.208,.389,'greenWood',-.032);
  for(let i=0;i<3;i++) terracottaPot(a,3.555+i*.237,.310,-5.504,.085+i*.015,
    .118+i*.016,i%2?'terracottaDark':'terracotta');
  closedCrate(a,3.018,.31,-2.171,.588,.198,.487,'darkOak',.014);
  for(let i=0;i<4;i++) plate(a,4.054,.310+i*.020,-2.206,.124,'terracotta',null);
  a.tube([[1.354,.699,-5.213],[1.395,.678,-5.171],[1.456,.633,-5.170],[1.48,.609,-5.178]],
    .011,'forged',7,6,false);
  a.ring(.124,1.407,.549,-5.183,'rope',.07,-.09,.13,.73,1.17,false);
  a.ring(.120,1.402,.537,-5.161,'rope',-.09,.05,.09,.69,1.23,false);
  a.ring(.106,1.403,.552,-5.141,'rope',.03,-.10,.07,.81,1.19,false);
}

export function greenhousePlants(a) {
  const rng=random(51019);
  supports(a,2.980,-5.548,3.458,.904);
  supports(a,3.020,-2.171,3.434,1.092);
  storedPots(a);
  trayTools(a);
  const f1=[1.831,-5.611], f2=[2.470,-5.760];
  fern(a,f1[0],terracottaPot(a,f1[0],benchY,f1[1],.192,.189),f1[1],.58,rng);
  fern(a,f2[0],terracottaPot(a,f2[0],benchY,f2[1],.138,.143,'terracottaDark'),f2[1],.37,rng);
  potLabel(a,'fern',1.885,benchY+.085,-5.292,.04);
  const mt=[3.012,-5.639];
  mint(a,mt[0],terracottaPot(a,mt[0],benchY,mt[1],.183,.211,'celadon'),mt[1],.44,rng);
  potLabel(a,'mint',3.043,benchY+.095,-5.33,.08);
  seedTray(a,3.752,-5.387,.529,.313,3,5,rng);
  const ox=[4.369,-5.648];
  oxalis(a,ox[0],terracottaPot(a,ox[0],benchY,ox[1],.194,.171,'terracottaDark'),
    ox[1],.472,rng);
  hangingPot(a,3.674,1.831,-5.515,rng);
  seedTray(a,2.298,-2.440,.631,.325,3,6,rng);
  const ml=[2.774,-1.985];
  mallow(a,ml[0],terracottaPot(a,ml[0],benchY,ml[1],.177,.181,'terracotta'),
    ml[1],.596,rng);
  potLabel(a,'mallow',2.794,benchY+.12,-2.285,PI-.10);
  const fern3=[3.418,-2.252];
  fern(a,fern3[0],terracottaPot(a,fern3[0],benchY,fern3[1],.161,.161,'blueCeramic'),
    fern3[1],.401,rng);
  seedTray(a,3.939,-2.520,.501,.285,2,5,rng);
  vine(a);
  citrus(a,5.018,-3.915,rng);
  const pot=terracottaPot(a,5.053,.002,-3.331,.136,.169);
  oxalis(a,5.053,pot,-3.331,.236,rng);
}

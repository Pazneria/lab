import {C,PI,TAU,bolt,pipeJoint,handle,seeded} from './geometry.mjs';
import {room as R,alcove as A,gallery as G,stairs as S} from './layout.mjs';

const rnd=seeded(90817), paint='paint',metal='metal',dark='black';
const take=a=>a[Math.floor(rnd()*a.length)];
function ribs(k){
  const zset=[-6.96,-3.53,-.05,3.48,6.94];
  for(const z of zset){
    // Full portal ribs follow the pressure vessel from kick plate to overhead spine.
    for(const side of [-1,1]){
      const x=side*8.14;
      const open=side>0&&z>A.back&&z<A.front;
      const base=open?4.10:.12;
      const p=[x,4.51,z],q=[side*6.83,5.89,z];
      k.box([x,(4.55+base)/2,z],[.41,4.55-base,.225],paint,C.grey,.023);
      if(!open){
        k.box([side*7.91,.43,z],[.18,.73,.47],metal,C.dark,.042);
        k.box([side*7.95,2.41,z],[.105,3.31,.113],paint,C.panel,.014);
        for(const y of [.81,3.99])k.box([side*7.91,y,z],[.16,.26,.40],metal,C.steel,.017);
        k.solid(side<0?-8.4:7.81,z-.20,side<0?-7.81:8.4,z+.20,0,4.5);
      }
      k.bar(p,q,.40,.225,paint,C.grey);
      for(const dz of [-.152,.152]){
        k.box([x,(4.55+base)/2,z+dz],[.53,4.55-base,.077],paint,C.panel,.014);
        k.bar([x,4.48,z+dz],[side*6.78,5.88,z+dz],.51,.079,paint,C.panel);
      }
      k.box([side*7.51,5.19,z],[.70,.21,.39],metal,C.dark,.021,[0,0,-side*.79]);
      for(const xx of [7.40,7.61])bolt(k,[side*xx,5.18+(7.51-xx),z+.20],'z',.042);
    }
    k.box([0,5.89,z],[13.82,.30,.22],paint,C.grey,.019);
    for(const dz of [-.152,.152])k.box([0,5.9,z+dz],[13.87,.41,.074],paint,C.panel,.014);
    // Conduit pass-through brackets suspended from the cross beam.
    for(const x of [-3.0,3.02])k.box([x,5.59,z],[.79,.12,.29],metal,C.dark,.018);
  }
}
function luminaires(k){
  for(const z of [-5.26,-1.77,1.70,5.22]){
    for(const side of [-1,1]){
      const x=side*4.22;
      k.box([x,5.94,z],[2.96,.28,.71],metal,C.iron,.08);
      k.box([x,5.778,z],[2.82,.082,.56],paint,C.light,.032);
      k.box([x,5.725,z],[2.63,.07,.421],'lit',0xfff2d9,.035);
      for(const dx of [-.90,0,.90]) k.box([x+dx,5.68,z],[.035,.055,.49],metal,C.panel,.006);
      for(const dx of [-1.36,1.36])k.box([x+dx,5.72,z],[.11,.131,.62],metal,C.grey,.015);
    }
  }
}
function deck(k){
  k.box([0,-.15,0],[16.88,.25,14.49],'black',C.seam);
  const nx=12,nz=10,w=16.8/nx,d=14.4/nz;
  for(let row=0;row<nz;row++)for(let i=0;i<nx;i++){
    const x=-8.4+w*(i+.5),z=-7.2+d*(row+.5);
    const c=take([0x788080,0x788182,0x798384,0x7c8485,0x828888,0x768083]);
    k.box([x,-.04,z],[w-.014,.078,d-.014],'deck',c,.009);
    // Countersunk sockets, offset in alternate panel corners.
    for(const dir of [-1,1]){
      const px=x+(w/2-.063)*dir,pz=z+(d/2-.061)*dir*(row%2?1:-1);
      k.cyl([px,.002,pz],.023,.023,.006,metal,C.dark,'y',8);
      k.box([px,.007,pz],[.022,.002,.004],'metal',C.steel,0,[0,.38,0]);
    }
  }
  for(const x of [-7.45,7.45]){
    k.box([x,.006,0],[.33,.02,13.96],metal,C.dark,.008);
    for(let i=0;i<7;i++){
      const z=-6+i*2;k.box([x,.022,z],[.285,.019,1.94],metal,C.grey,.006);
      for(let j=0;j<13;j++)k.box([x,.034,z-.85+j*.14],[.194,.004,.046],dark,C.seam,.003);
    }
  }
  // Service boundary is painted onto the deck. Gaps at the centre allow a trolley across.
  const stripe=0xcda250;
  for(const z of [-1.25,2.57])for(const side of [-1,1]){
    k.box([side*2.02,.005,z],[3.22,.008,.058],'mark',stripe);
    k.box([side*3.64,.005,z+(z<0?.155:-.155)],[.062,.008,.36],'mark',stripe);
  }
  for(const x of [-3.64,3.64])for(const z of [-.56,1.88])k.box([x,.005,z],[.059,.008,.52],'mark',stripe);
  for(const x of [-3.27,3.27])for(const z of [-1.00,2.32]){
    k.box([x,.009,z],[.45,.003,.035],'mark',C.light);
    k.box([x,.009,z],[.036,.003,.45],'mark',C.light);
  }
  k.label([.02,.014,3.20],[0,1,0],[0,0,-1],2.92,.29,'ROTOR   /   KEEP CLEAR',{ink:'#c9c7ac',distress:true});
  for(const x of [-4.35,4.36])for(const z of [-2.61,4.61]){
    k.box([x,.008,z],[.76,.019,1.04],metal,C.dark,.025);
    k.box([x,.022,z],[.69,.015,.968],'deck',C.grey,.016);
    for(const dz of [-.36,.36]){
      k.box([x,.033,z+dz],[.25,.012,.070],dark,C.iron,.013);
      k.box([x,.042,z+dz],[.195,.013,.022],metal,C.steel,.005);
    }
  }
}
function panelRun(k,span,yBase,height,n){
  const w=span/n;
  for(let i=0;i<n;i++){
    const x=-span/2+w*(i+.5),y=yBase+height/2;
    k.box([x,y,.020],[w-.034,height,.075],paint,take([C.hull,0x9ca6a4,0xa4ada9,0xa0aba9]),.024);
    // Large formed panel with perimeter fold and quarter turn catches.
    k.box([x,y+.018,.070],[w-.14,height-.17,.051],paint,take([0xaab2ae,0xb3b9b3,0xaab6b0]),.045);
    for(const dir of [-1,1]){
      k.box([x+dir*(w/2-.145),y+dir*(height/2-.18),.104],[.052,.11,.016],metal,C.grey,.008);
      k.box([x+dir*(w/2-.145),y+dir*(height/2-.18),.115],[.024,.006,.006],dark,C.seam);
    }
  }
}
function sideWalls(k){
  // Local x is horizontal along the wall, local +z points into the room.
  function sideSpan(side,z1,z2){
    const len=z2-z1;
    k.frame([side*8.39,0,(z1+z2)/2],[0,-side*PI/2,0],()=>{
      k.box([0,2.99,-.12],[len,6.0,.23],dark,C.seam);
      panelRun(k,len,.42,2.02,Math.max(1,Math.round(len/2.35)));
      panelRun(k,len,2.51,1.55,Math.max(1,Math.round(len/2.35)));
      panelRun(k,len,4.17,1.70,Math.max(1,Math.round(len/2.35)));
      k.box([0,.21,.06],[len,.40,.22],paint,C.grey,.018);
      k.box([0,.39,.18],[len,.072,.085],metal,C.steel,.012);
      k.box([0,2.46,.09],[len,.049,.08],paint,C.ochre);
      // Exposed overhead pipes sit in clamped brackets with compression fittings.
      for(const [ii,r] of [.086,.058,.042].entries()){
        const y=4.31+ii*.18;
        k.rod([-len/2,y,.22],[len/2,y,.22],r,ii===1?metal:paint,ii===1?C.copper:C.panel,16);
        for(let x=-len/2+.37;x<len/2;x+=2.2){
          k.cyl([x,y,.22],r*1.27,r*1.27,.084,metal,C.dark,'x',12);
          k.box([x,y,.098],[.076,.093,.19],metal,C.dark);
        }
      }
    });
  }
  sideSpan(-1,R.back,R.front);sideSpan(1,R.back,A.back);sideSpan(1,A.front,R.front);
  k.box([8.40,5.04,(A.front+A.back)/2],[.24,2.22,A.front-A.back],paint,C.panel,.02);
  for(const z of [A.back,A.front])k.box([8.22,1.94,z],[.40,3.88,.17],paint,C.grey,.036);
  k.box([8.16,3.94,(A.front+A.back)/2],[.47,.49,A.front-A.back+.2],paint,C.grey,.048);
  k.box([7.913,3.94,.70],[.024,.359,3.22],paint,C.iron,.015);
  k.label([7.891,3.947,.70],[-1,0,0],[0,1,0],2.91,.232,'SERVICE   /   TOOL CRIB',{ink:'#e4ddc5'});
  k.frame([-8.219,0,1.72],[0,PI/2,0],()=>{
    k.box([0,2.98,.009],[2.78,1.04,.030],paint,C.panel,.02);
    k.label([-.82,3.0,.034],[0,0,1],[0,1,0],.82,.77,'09',{ink:'#354547',distress:true});
    k.label([.50,3.02,.034],[0,0,1],[0,1,0],1.52,.43,['PROPULSION','SERVICE BAY'],{ink:'#354547',distress:true});
    k.box([-.187,3.0,.04],[.024,.70,.009],paint,C.ochre);
  });
}
function rear(k){
  // The viewing port is open through the hull. Gaskets and pressure frames surround each pane.
  const L=-4.66,B=3.03,Rt=3.81,Top=5.33,z=-7.21;
  k.box([0,B/2,z-.10],[16.85,B,.27],paint,C.grey);
  k.box([0,(6.17+Top)/2,z-.10],[16.85,6.17-Top,.28],paint,C.panel);
  k.box([(-8.42+L)/2,(B+Top)/2,z-.10],[L+8.42,Top-B,.28],paint,C.panel);
  k.box([(8.42+Rt)/2,(B+Top)/2,z-.10],[8.42-Rt,Top-B,.28],paint,C.panel);
  k.frame([0,0,-7.03],[0,0,0],()=>panelRun(k,16.72,.30,2.10,8));
  k.box([0,.17,-6.99],[16.70,.33,.22],paint,C.dark,.018);
  for(const side of [-1,1]){
    const x=side<0?-6.53:6.11;
    k.box([x,4.2,-7.012],[side<0?3.41:4.31,2.00,.14],paint,C.light,.065);
  }
  k.label([6.4,4.35,-6.93],[0,0,1],[0,1,0],2.04,1.13,'09',{ink:'#697776',distress:true});
  k.label([6.4,3.58,-6.93],[0,0,1],[0,1,0],2.46,.20,'KESTREL   /   DECK  C',{ink:'#526360'});
  const w=Rt-L,cy=(B+Top)/2;
  for(const y of [B,Top]){
    k.box([(L+Rt)/2,y,-7.04],[w+.34,.31,.38],metal,C.iron,.06);
    k.box([(L+Rt)/2,y,-6.83],[w+.38,.194,.10],paint,C.light,.027);
    for(let x=L+.15;x<Rt;x+=.45)bolt(k,[x,y,-6.773],'z',.031);
  }
  for(let j=0;j<=3;j++){
    const x=L+j*w/3;
    k.box([x,cy,-7.06],[j===0||j===3?.28:.14,Top-B+.15,.46],metal,C.dark,.038);
    k.box([x,cy,-6.81],[j===0||j===3?.19:.084,Top-B+.1,.07],paint,C.panel,.016);
    for(const y of [B+.38,Top-.38])bolt(k,[x,y,-6.765],'z',.030);
    if(j<3)k.box([x+w/6,cy,-7.14],[w/3-.105,Top-B-.12,.018],'glass',0x97b7c3);
  }
  k.solid(-3.86,-7.20,3.39,-6.665,0,1.98);
  k.label([-2.35,2.857,-6.88],[0,0,1],[0,1,0],2.87,.168,'OBSERVATION   /   PRESSURE GLAZING',{ink:'#cad0c7'});
  // Recessed utility bank visible below the gallery.
  for(let i=0;i<5;i++){
    const x=-3.18+i*1.47;
    k.box([x,1.14,-6.86],[1.31,1.64,.23],paint,i%2?C.grey:C.panel,.05);
    for(let j=0;j<6;j++)k.box([x,1.30+j*.067,-6.734],[.96,.026,.016],dark,C.iron,.004);
    handle(k,[x+.47,.94,-6.727],.21,.058);
  }
}
function front(k){
  k.frame([0,0,7.19],[0,PI,0],()=>{
    k.box([0,3.04,-.12],[16.9,6.15,.26],dark,C.seam);
    panelRun(k,16.8,.36,2.44,8);panelRun(k,16.8,2.86,2.89,8);
    k.box([0,.18,.10],[16.8,.34,.19],paint,C.grey,.025);
    // Raised octagonal frame, twin sliding pressure leaves, rubber seal and manual locks.
    k.frame([1.23,0,.12],[0,0,0],()=>{
      const shape=[[-1.55,.018],[1.55,.018],[1.55,2.77],[1.18,3.18],[-1.18,3.18],[-1.55,2.77]];
      k.shape([0,0,0],shape,.22,paint,C.dark,[0,0,0],.04);
      const leaf=[[-1.33,.03],[1.33,.03],[1.33,2.63],[1.04,2.95],[-1.04,2.95],[-1.33,2.63]];
      k.shape([0,0,.25],leaf,.05,paint,C.grey);
      for(const s of [-1,1]){
        k.box([s*.641,1.32,.332],[1.235,2.48,.072],paint,C.hull,.05);
        k.box([s*.641,.49,.383],[1.02,.47,.055],metal,C.steel,.026);
        k.box([s*1.37,1.43,.351],[.095,2.53,.16],paint,C.ochre,.025);
        for(const y of [.69,2.07]){
          k.box([s*1.38,y,.43],[.33,.13,.12],metal,C.dark,.018);
          bolt(k,[s*1.38,y,.506],'z',.04);
        }
        k.box([s*.64,2.13,.383],[.69,.36,.066],metal,C.dark,.074);
        k.box([s*.64,2.13,.422],[.565,.251,.021],'steelglass',0x475e61,.046);
      }
      k.label([0,2.79,.311],[0,0,1],[0,1,0],1.71,.194,'ACCESS  /  C-2',{ink:'#d4d9cb'});
      k.box([0,3.30,.22],[1.04,.105,.18],paint,C.dark,.02);
      k.box([0,3.30,.32],[.83,.046,.02],'signal',C.mint,.009);
    });
    k.label([-2.08,2.31,.110],[0,0,1],[0,1,0],2.06,.53,['TRANSFER LOCK','C–02   /   AFT'],{ink:'#475659',distress:true});
    k.box([-.54,1.49,.23],[.34,.51,.21],paint,C.iron,.028);
    k.box([-.54,1.59,.341],[.20,.092,.018],'signal',C.mint,.01);
    k.cyl([-.54,1.42,.358],.063,.069,.057,paint,C.ochre,'z',16);
    for(const y of [3.78,4.08,4.38]){
      k.rod([-8.30,y,.23],[8.30,y,.23],.082,metal,y===4.08?C.copper:C.steel,16);
      for(let xx=-7.65;xx<8;xx+=2.48)pipeJoint(k,[xx,y,.23],'x',.084,C.dark);
    }
    for(const x of [-6.47,-4.42]){
      k.box([x,1.51,.19],[1.58,1.96,.26],paint,C.panel,.047);
      for(let j=0;j<10;j++){k.box([x,1.05+j*.100,.333],[1.22,.049,.022],dark,C.dark,.008);k.box([x,1.06+j*.100,.35],[1.22,.019,.035],metal,C.steel)}
    }
  });
  k.solid(-2.92,6.55,.43,7.2,0,3.3);
  k.solid(3.57,6.79,7.31,7.2,.48,2.55);
}
export function buildStructure(k){
  k.section('deck',()=>deck(k));k.section('pressure hull',()=>{sideWalls(k);rear(k);front(k)});
  k.section('overhead',()=>{
    k.box([0,6.19,0],[16.8,.18,14.4],paint,C.iron);
    for(let i=0;i<8;i++)for(let j=0;j<5;j++){
      const x=-7.35+i*2.1,z=-5.76+j*2.88;
      k.box([x,6.055,z],[2.06,.12,2.825],paint,take([C.panel,C.grey,0x919c99]),.037);
    }
    for(const x of [-3.15,-2.89,2.92,3.17]){
      k.rod([x,5.74,-7.15],[x,5.74,7.15],.069,metal,x===3.17||x===-3.15?C.copper:C.steel,16);
      for(const z of [-5.2,-1.74,1.78,5.24])pipeJoint(k,[x,5.74,z],'z',.069);
    }
    // Overhead maintenance monorail and stationary lifting trolley.
    k.box([.15,5.70,0],[.142,.38,13.91],metal,C.grey,.013);
    for(const y of [5.50,5.89])k.box([.15,y,0],[.45,.075,13.96],paint,C.ochre,.01);
    for(const z of [-5.50,-2.11,1.26,4.67])k.box([.15,5.96,z],[.71,.10,.61],metal,C.dark,.025);
    k.box([.15,5.34,-.88],[.63,.28,.82],paint,C.yellow,.048);
    for(const x of [-.15,.45])for(const z of [-1.13,-.66])k.cyl([x,5.48,z],.133,.133,.081,metal,C.dark,'x',20);
    k.cyl([.15,5.105,-.88],.227,.227,.48,metal,C.dark,'x');
    for(const z of [-.96,-.81])k.rod([.15,5.0,z],[.15,4.36,z],.014,metal,C.iron,8);
    k.box([.15,4.32,-.88],[.17,.20,.27],paint,C.ochre,.035);
    k.tube([[.15,4.26,-.88],[.15,4.17,-.9],[.15,4.08,-.96],[.15,4.04,-.88],[.15,4.10,-.80]],.031,metal,C.steel,18,8);
    ribs(k);luminaires(k);
  });
}

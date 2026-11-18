import * as T from './vendor/three.module.min.js';
import {C,shellMark} from './materials.js';
import {PI,TAU,mix,randomSeed} from './geometry.js';
import {plaque,shadow,frameArt} from './rooms.js';
import {workTable,fold,spool,stool,cushion,shears,ruler,swatch,pull} from './objects.js';

const paperShapes={
  front:[[.10,.01],[.24,.025],[.36,.09],[.52,.055],[.71,.008],[.80,.061],[.875,.08],[.86,.17],[.83,.245],[.85,.29],[.90,.345],[.975,.396],[.95,.51],[.89,.69],[.90,.735],[.932,.74],[.892,.766],[.913,.92],[.78,.955],[.60,.976],[.40,.95],[.28,.914],[.22,.89],[.18,.907],[.18,.875],[.125,.83],[.14,.65],[.109,.50],[.118,.47],[.079,.46],[.102,.435],[.072,.26]],
  sleeve:[[.046,.35],[.09,.26],[.14,.21],[.24,.185],[.33,.106],[.405,.058],[.50,.038],[.58,.045],[.68,.103],[.745,.201],[.83,.227],[.93,.32],[.897,.368],[.916,.375],[.885,.40],[.81,.59],[.715,.83],[.737,.85],[.703,.866],[.68,.952],[.42,.975],[.244,.944],[.18,.722],[.14,.545],[.105,.515],[.115,.491]],
  gore:[[.398,.014],[.645,.036],[.625,.208],[.672,.40],[.811,.655],[.83,.661],[.816,.685],[.967,.91],[.76,.957],[.54,.981],[.295,.976],[.059,.93],[.16,.688],[.27,.409],[.31,.401],[.29,.376],[.367,.174]]
};
function patternRect(b,type){
  return b.print.panel('tissue-'+type,238,300,(x,w,h)=>{
    x.fillStyle='#e5d7b6';x.fillRect(0,0,w,h);
    const outline=paperShapes[type];x.strokeStyle='#867e65';x.lineWidth=1.3;x.setLineDash([4,4]);x.beginPath();
    outline.forEach(([u,v],i)=>{const xx=(.5+(u-.5)*.932)*w,yy=(.5+(v-.5)*.941)*h;i?x.lineTo(xx,yy):x.moveTo(xx,yy);});x.closePath();x.stroke();x.setLineDash([]);
    x.fillStyle='#526055';x.textAlign='center';x.font='italic 20px Georgia';x.fillText({front:'Devant',gore:'Godet',sleeve:'Manche'}[type],w*.51,h*.39);
    x.font='10px Georgia';x.fillText('COMMANDE  XVII',w*.51,h*.46);x.font='13px Georgia';x.fillText({front:'IV — a',gore:'VII — b',sleeve:'II — c'}[type],w*.52,h*.53);
    x.strokeStyle='#ab6855';x.lineWidth=1.5;x.beginPath();x.moveTo(w*.49,h*.595);x.lineTo(w*.46,h*.845);x.moveTo(w*.435,h*.817);x.lineTo(w*.46,h*.845);x.lineTo(w*.489,h*.817);x.stroke();
    x.strokeStyle='#8a8067';x.beginPath();x.moveTo(w*.32,h*.94);x.lineTo(w*.37,h*.68);x.lineTo(w*.39,h*.94);x.stroke();
    x.font='italic 9px Georgia';x.fillText('droit fil',w*.61,h*.71);
    for(const [xx,yy] of [[.27,.30],[.67,.62],[.73,.80]]){x.beginPath();x.moveTo(w*xx-4,h*yy);x.lineTo(w*xx+4,h*yy);x.moveTo(w*xx,h*yy-4);x.lineTo(w*xx,h*yy+4);x.stroke();}
  });
}
function pattern(b,p,w,h,type,rotation=[-PI/2,0,0]){
  const rect=patternRect(b,type),s=new T.Shape();
  paperShapes[type].forEach(([u,v],i)=>{const xx=(u-.5)*w,yy=(.5-v)*h;i?s.lineTo(xx,yy):s.moveTo(xx,yy);});s.closePath();
  const g=new T.ShapeGeometry(s),a=g.attributes.position,uv=g.attributes.uv;
  for(let i=0;i<a.count;i++){const u=a.getX(i)/w+.5,v=a.getY(i)/h+.5;uv.setXY(i,mix(rect[0],rect[2],u),mix(rect[1],rect[3],v));a.setZ(i,.003*Math.sin(u*PI*3)+.008*(u*v)**3);}
  g.computeVertexNormals();b.put(g,'print','#fff9e6',p,rotation,[1,1,1],true);
}
function deskLamp(b,p,angle=0){
  b.local(p,[0,angle,0],()=>{
    b.lathe([0,0,0],[[0,0],[.138,.003],[.147,.021],[.14,.034],[.11,.046],[.095,.061],[.052,.073],[.034,.086]],'brass',C.bronze,32);
    b.cyl([0,.22,0],.021,.030,.29,'brass',C.brass,16);
    b.rod([0,.31,0],[-.15,.61,.046],.018,'brass',C.brass,12);
    b.rod([.044,.32,.012],[-.112,.61,.060],.011,'brass',C.bronze,10);
    b.rod([-.14,.617,.057],[-.43,.70,.153],.019,'brass',C.brass,12);
    for(const [x,y,z] of [[0,.323,0],[-.143,.615,.047],[-.43,.70,.148]]){
      b.cyl([x,y,z],.038,.038,.055,'brass',C.bronze,16,[PI/2,0,0]);
      b.oval([x,y,z+.031],[.018,.018,.011],'brass',C.gilt,12);
    }
    b.local([-.437,.707,.16],[.19,.12,-.18],()=>{
      b.lathe([0,-.174,0],[[.180,.0],[.193,.014],[.182,.035],[.145,.076],[.101,.12],[.062,.141],[.044,.167],[.030,.173]],'paint',C.deep,32);
      b.torus([0,-.16,0],.187,.008,'brass',C.brass,[-PI/2,0,0],38);
      b.cyl([0,-.154,0],.17,.17,.012,'glow','#f2cc8c',30);
      b.oval([0,-.164,0],[.055,.030,.055],'glow','#fff0b5',18);
    });
  });
}
function sadIron(b,p,ang){
  b.local(p,[0,ang,0],()=>{
    const foot=new T.Shape();foot.moveTo(-.088,-.085);foot.quadraticCurveTo(-.105,-.023,-.069,.098);foot.quadraticCurveTo(-.045,.159,0,.20);foot.quadraticCurveTo(.073,.13,.092,.02);foot.lineTo(.091,-.083);foot.quadraticCurveTo(0,-.109,-.088,-.085);
    const geo=new T.ExtrudeGeometry(foot,{depth:.052,bevelSize:.006,bevelThickness:.005,bevelSegments:2,curveSegments:10});
    for(const z of [-.065,.089])b.box([0,.012,z],[.27,.022,.022],'brass',C.bronze);
    for(const x of [-.088,.088])b.box([x,.029,.010],[.019,.016,.30],'brass',C.brass);
    b.put(geo,'steel','#454845',[0,.046,0],[-PI/2,0,0]);
    b.curve([[0,.100,-.111],[0,.160,-.100],[0,.199,-.058],[0,.198,.077],[0,.161,.109],[0,.101,.095]],.017,'steel','#41483f',16,8);
    b.rod([0,.196,-.055],[0,.196,.061],.029,'wood',C.walnut,16);
  });
}
function tape(b,y,d){
  const path=new T.CatmullRomCurve3([[.60,y,.49],[.45,y+.003,.404],[.25,y+.004,.46],[.04,y+.003,.38],[-.13,y+.004,.455],[-.21,y+.009,.60],[-.15,y-.019,d/2+.024],[-.148,y-.17,d/2+.044],[-.102,y-.30,d/2+.068]].map(a=>new T.Vector3(...a)));
  const at=(t,u)=>{
    const p=path.getPoint(t),tan=path.getTangent(t),side=new T.Vector3(-tan.z,0,tan.x);
    if(t>.74)side.lerp(new T.Vector3(1,0,0),Math.min((t-.74)*6,1));side.normalize();
    p.addScaledVector(side,(u-.5)*.029);return p.toArray();
  };
  b.surface(56,1,(t,u)=>[...at(t,u),t*1.6,u*.029],'cloth','#d7ba73');
  for(let j=1;j<63;j++){const t=j/64;const p=at(t,.06),q=at(t,j%5?.43:.83);
    if(t<.74){p[1]+=.002;q[1]+=.002;}else{p[2]+=.002;q[2]+=.002;}b.rod(p,q,.0015,'paint','#4f4f3f',4);}
}
function clothOnBench(b,h,d){
  const point=(u,v)=>{
    const x=-1.76+1.57*u+.015*Math.sin(v*PI);
    let y=h+.016,z;
    if(v<.72){z=mix(-.44,d/2-.024,v/.72);y+=.004*Math.sin(u*PI*4)*Math.sin(v*PI*.95);}
    else {
      const a=(v-.72)/.28,zfold=.039*Math.sin(u*PI*7+.5*a);
      z=d/2-.024+.059*Math.sin(Math.min(1,a*3)*PI/2)+zfold*a;
      y-=a*(.28+.11*Math.sin(u*PI)+.040*Math.cos(u*PI*3));
    }
    return [x,y,z,u*1.62,v*1.53];
  };
  b.surface(36,30,point,'damask','#36726f');
  for(const u of [.015,.033,.967,.985]){
    const pts=Array.from({length:28},(_,j)=>{const p=point(u,j/27).slice(0,3);p[1]+=.002;p[2]+=.002;return p;});
    b.curve(pts,.0036,'silk','#cfb87d',32,5);
  }
  for(let j=0;j<26;j++){
    const p=point(j/25,1);b.rod(p.slice(0,3),[p[0]+.003*Math.cos(j),p[1]-.012-.006*Math.sin(j),p[2]+.003],.0024,'cloth','#adc0a7',4);
  }
}
function weight(b,x,y,z){
  b.lathe([x,y,z],[[.039,0],[.045,.004],[.043,.026],[.032,.032],[.012,.035],[.009,.045],[.017,.05],[.013,.063],[.005,.068]],'brass',C.brass,16);
}
function chalk(b,p,rot){
  const s=new T.Shape();s.moveTo(-.032,-.018);s.quadraticCurveTo(-.039,-.031,-.021,-.035);s.lineTo(.037,-.022);s.quadraticCurveTo(.047,-.018,.033,-.002);s.lineTo(-.002,.034);s.quadraticCurveTo(-.010,.042,-.02,.022);s.closePath();
  b.put(new T.ExtrudeGeometry(s,{depth:.006,bevelSize:.003,bevelThickness:.002,bevelSegments:1}), 'paper',C.chalk,p,[-PI/2,0,rot]);
}
function commissionSlip(b,p){
  const rect=b.print.panel('work-order',375,223,(x,w,h)=>{
    x.fillStyle='#e9dbbb';x.fillRect(0,0,w,h);x.strokeStyle='#b09e79';x.lineWidth=1;x.strokeRect(8,8,w-16,h-16);
    x.fillStyle='#3e5b50';x.textAlign='left';x.font='12px Georgia';x.fillText('MAISON DES MARÉES   /   ROYAL WARDROBE',23,32);
    x.font='italic 26px Georgia';x.fillText('The Sounding Mantle',22,65);
    x.font='13px Georgia';x.fillText('For the Crown’s reader of tides',23,86);
    x.strokeStyle='#a29170';x.beginPath();x.moveTo(23,97);x.lineTo(352,97);x.stroke();
    x.font='italic 15px Georgia';x.fillText('Left fan mounted.  Balance at the fitting.',23,124);
    x.fillText('Right shoulder in toile.  Leave facing open.',23,149);
    x.font='11px Georgia';x.fillText('FITTING DOCKET   XVII',23,194);
    x.fillStyle='#985947';x.font='italic 17px Georgia';x.fillText('C. Morel',275,194);
    shellMark(x,328,59,.55,'#927954');
  });
  b.local(p,[0,-.145,0],()=>{
    b.box([0,.001,0],[.441,.003,.264],'paper','#c3b293');
    b.surface(12,7,(u,v)=>[(u-.5)*.44,.004+.009*(u*v)**4+.002*Math.sin(u*PI),(.5-v)*.262,mix(rect[0],rect[2],u),mix(rect[1],rect[3],v)],'print','#fffae9',false);
    b.rod([-.15,.014,.087],[-.068,.014,.106],.0047,'wood','#825749',7);
    b.rod([-.068,.014,.106],[-.055,.014,.109],.0047,'wood','#ccb08a',7,.0006);
  });
}
function cuttingBench(b){
  const x=2.68,z=-12.00,w=3.68,d=1.32,h=.946,yaw=-PI/2;shadow(b,x,z,2.11,4.52);
  b.local([x,0,z],[0,yaw,0],()=>{
    workTable(b,w,d,h,true,'#c29a6d');
    b.box([0,.235,0],[w-.15,.075,d-.20],'wood',C.walnut);
    for(let j=0;j<8;j++)b.box([(j-3.5)*.42,.281,0],[.405,.027,d-.22],'wood',C.wood);
    for(let j=0;j<3;j++)fold(b,[-1.13,.299+j*.094,-.022],1.02-j*.05,.77-j*.024,.098,j===1?'stripe':'cloth',[C.teal,C.flax,C.ink][j],.026*j);
    b.box([.17,.425,-.08],[.81,.285,.78],'wood',C.walnut);
    for(let i=0;i<6;i++)b.box([-.152+i*.126,.431,.322],[.119,.27,.028],'wood',i%3?C.wood:C.trim);
    pull(b,.17,.50,.35,.16);
    for(let i=0;i<3;i++){
      const xx=.94+i*.156;b.cyl([xx,.37,-.032],.080,.080,.88,'paper',['#c1a77e','#ddd0ab','#b89c75'][i],18,[PI/2,0,.04*i]);
      b.cyl([xx,.37,.416],.031,.031,.008,'wood',C.dark,14,[PI/2,0,0]);
    }
    clothOnBench(b,h,d);
    b.local([-1.08,h+.031,.06],[0,-.15,0],()=>pattern(b,[0,0,0],.76,.95,'front'));
    b.local([-.409,h+.031,-.048],[0,.19,0],()=>pattern(b,[0,0,0],.48,.73,'sleeve'));
    for(const [xx,zz] of [[-1.26,-.23],[-.9,.31],[-.49,-.21]])weight(b,xx,h+.041,zz);
    shears(b,[.245,h+.012,.149],1.24,.97);
    ruler(b,[1.10,h+.010,.421],.85,-.045);
    tape(b,h+.026,d);cushion(b,[.78,h+.009,.055],.098);chalk(b,[-.016,h+.011,.21],.36);
    for(let j=0;j<3;j++)b.box([-.038+j*.024,h+.012,.12-j*.013],[.016,.003,.005],'paper',C.chalk);
    // Shallow bobbin tray with partitions and partly unreeled thread.
    b.box([.055,h+.022,-.394],[.70,.034,.285],'wood',C.walnut);
    for(const s of [-1,1]){
      b.box([.055+s*.34,h+.059,-.394],[.021,.083,.286],'wood',C.trim);
      b.box([.055,h+.055,-.394+s*.133],[.69,.074,.018],'wood',C.trim);
    }
    for(let j=0;j<6;j++)spool(b,[-.214+j*.106,h+.04,-.412+(j%2)*.045],.039+(j%3)*.004,.085+(j%3)*.022,[C.teal,C.pearl,C.gilt,C.coral,C.blue,C.jade][j]);
    b.curve([[.112,h+.12,-.40],[.13,h+.12,-.26],[.16,h+.031,-.18],[.245,h+.02,-.13],[.29,h+.016,-.175],[.35,h+.018,-.14]],.0022,'silk',C.coral,21,4);
    sadIron(b,[1.48,h+.010,-.14],-.41);deskLamp(b,[.97,h+.010,-.459],.15);
    commissionSlip(b,[1.43,h+.009,.173]);
    // Tailor's chalk outlines just past the tissue edge on the yardage.
    for(let j=0;j<9;j++)b.rod([-1.47+.006*Math.sin(j),h+.026,-.23+j*.063],[-1.467+.006*Math.sin(j+.5),h+.026,-.201+j*.063],.0021,'paper',C.pearl,5);
  });b.block(x,z,d+.02,w+.03);
}
function sewingMachine(b){
  const xx=-3.26,zz=-14.14,w=1.56,d=.74,h=.784;shadow(b,xx,zz,2.04,1.36);
  b.local([xx,0,zz],[0,.27,0],()=>{
    const black='#283935';
    for(const s of [-1,1]){
      const cx=s*.53;
      for(const end of [-1,1]){
        b.rod([cx,0,end*.302],[cx,.73,end*.17],.035,'steel',black,9);
        b.box([cx,.024,end*.28],[.105,.048,.154],'steel',black);
      }
      b.curve([[cx,.15,-.25],[cx,.256,-.13],[cx,.3,0],[cx,.256,.13],[cx,.15,.25]],.020,'steel',black,19,7);
      b.torus([cx,.463,0],.131,.018,'steel',black,[0,PI/2,0],24);
    }
    b.rod([-.54,.255,0],[.55,.255,0],.022,'steel',black,10);
    for(let j=0;j<7;j++)b.box([-.325+j*.075,.135,.06],[.051,.022,.238],'steel',black,[-.16,0,0]);
    const wh=[.57,.402,.0];
    b.torus(wh,.225,.017,'steel',black,[0,PI/2,0],36);
    for(let i=0;i<10;i++){const a=i*TAU/10;b.rod(wh,[.57,.402+.213*Math.sin(a),.213*Math.cos(a)],.007,'steel',black,6);}
    b.box([0,h-.028,0],[w,.063,d],'wood',C.wood);
    b.box([0,h+.017,.007],[.966,.037,.366],'paint',black);
    b.box([0,h+.037,.007],[.88,.012,.316],'brass',C.bronze);
    b.box([0,h+.049,.007],[.85,.018,.303],'paint',black);
    b.oval([.255,h+.095,0],[.133,.087,.123],'paint',black,24);
    b.oval([.276,h+.205,0],[.091,.178,.090],'paint',black,24,[0,0,.09]);
    b.curve([[.279,h+.195,0],[.259,h+.311,0],[.165,h+.359,0],[-.079,h+.355,0],[-.238,h+.368,0],[-.28,h+.326,0],[-.28,h+.238,0]],.055,'paint',black,34,14);
    b.curve([[.295,h+.136,.081],[.27,h+.277,.086],[.20,h+.335,.065],[.063,h+.347,.059],[-.11,h+.348,.059],[-.244,h+.353,.051]],.004,'brass',C.brass,26,6);
    b.cyl([-.282,h+.202,0],.036,.031,.11,'steel','#949b87',16);
    b.rod([-.282,h+.150,0],[-.282,h+.063,0],.004,'steel','#d8decc',6);
    b.box([-.282,h+.064,.004],[.041,.008,.047],'steel','#a0aaa0');
    b.torus([.408,h+.318,0],.129,.015,'steel',black,[0,PI/2,0],29);
    for(let i=0;i<7;i++){const a=i*TAU/7;b.rod([.408,h+.318,0],[.408,h+.318+.124*Math.sin(a),.124*Math.cos(a)],.0065,'brass',C.bronze,6);}
    b.rod([.285,h+.318,0],[.44,h+.318,0],.025,'brass',C.bronze,14);
    b.curve([[.427,h+.322,.127],[.48,.78,.142],[.567,.41,.237],[.567,.202,.081],[.567,.19,-.084],[.56,.40,-.227],[.48,.78,-.137],[.427,h+.322,-.127]],.0042,'cloth',C.dark,42,5);
    spool(b,[.153,h+.402,0],.031,.078,C.gilt);b.rod([.153,h+.40,0],[.153,h+.508,0],.004,'steel',C.brass,7);
    b.curve([[.139,h+.46,0],[.002,h+.426,.022],[-.232,h+.428,.031],[-.315,h+.385,.039],[-.280,h+.09,.022]],.0018,'silk',C.gilt,21,4);
    b.surface(16,12,(u,v)=>[-.523+u*.35,h+.061+.005*Math.sin(u*PI*5)*v,.017+v*.21,u*.38,v*.20],'silk','#73a29a');
    b.box([-.487,h-.127,.008],[.45,.131,.55],'wood',C.walnut);pull(b,-.49,h-.12,.288,.12);
  });b.block(xx,zz,1.69,1.01);
  stool(b,[-3.05,0,-13.30],.47,C.ink);b.block(-3.05,-13.30,.46,.46);
}
function patternWall(b){
  b.local([-.33,0,-15.84],[0,0,0],()=>{
    b.box([0,2.29,0],[3.29,2.20,.092],'wood',C.walnut);
    b.box([0,2.29,.052],[3.16,2.073,.031],'cloth','#a1906b');
    for(const s of [-1,1]){
      b.box([s*1.612,2.29,.082],[.066,2.23,.055],'wood',C.trim);
      b.box([0,2.29+s*1.073,.08],[3.28,.070,.056],'wood',C.trim);
    }
    for(const [t,xx,yy,ww,hh,angle] of [['mantle',-.609,2.365,1.04,1.38,-.047],['draft',.50,2.48,.75,.99,.042]]){
      b.local([xx,yy,.083],[0,0,angle],()=>{
        b.tile([0,0,.003],ww,hh,'print',b.print.drawing(t));
        for(const s of [-1,1])b.oval([s*(ww*.45),hh*.47,.011],[.016,.017,.009],'brass',C.gilt,10);
      });
    }
    for(let i=0;i<3;i++)swatch(b,[.214+i*.38,1.93,.094],.291,.39,['shoal','silk','stripe'][i],['#f4ead2',C.coral,C.flax][i],0,i);
    b.box([0,1.178,.099],[3.45,.071,.226],'wood',C.wood);
    plaque(b,'Bureau des patrons','COMMANDE  XVII   •   LE MANTEAU DE SONDE',[0,3.655,.026],1.87,.304,0,true);
  });
}
function pegboard(b){
  b.local([4.673,0,-14.22],[0,-PI/2,0],()=>{
    b.box([0,2.05,0],[2.44,1.49,.107],'wood',C.walnut);
    b.box([0,2.05,.061],[2.32,1.38,.022],'paint','#57746a');
    for(let j=0;j<2;j++){
      b.rod([-1.10,1.72+j*.52,.15],[1.10,1.72+j*.52,.15],.016,'brass',C.brass,12);
      for(const s of [-1,1])b.rod([s*1.05,1.72+j*.52,.072],[s*1.05,1.72+j*.52,.162],.024,'brass',C.bronze,12);
    }
    for(let j=0;j<4;j++){
      const xx=-.96+j*.21,h=.29+j*.057;
      b.box([xx,2.24-h/2,.179],[.04,h,.027],'wood',C.trim,[0,0,(j-1)*.045]);
      for(let k=0;k<5;k++)b.box([xx,2.15-k*.046,.194],[.024,.003,.002],'paint',C.dark);
    }
    // Patternmaker's square and the pair of sweeping wooden French curves.
    b.box([.15,2.017,.197],[.047,.457,.026],'wood',C.oak,[0,0,-.07]);
    b.box([.278,1.805,.197],[.287,.041,.026],'wood',C.oak,[0,0,-.07]);
    for(let k=0;k<2;k++){
      const xx=.53+k*.30;
      b.curve([[xx,2.24,.193],[xx-.065,2.17,.193],[xx-.06,2.02,.193],[xx+.056,1.905,.193],[xx+.054,1.846,.193],[xx,1.862,.193]],.025,'wood',k?C.oak:C.trim,20,8);
    }
    b.box([0,1.32,.102],[2.56,.075,.29],'wood',C.wood);
    for(let i=0;i<8;i++)spool(b,[-.91+i*.258,1.363,.133],.048+(i%2)*.014,.12+(i%3)*.032,[C.teal,C.gilt,C.coral,C.flax][i%4]);
  });
}
function hangingPatterns(b){
  b.local([-4.60,0,-11.04],[0,PI/2,0],()=>{
    b.box([0,2.56,0],[2.23,.104,.10],'wood',C.walnut);
    for(let i=0;i<3;i++){
      const xx=(i-1)*.68;
      b.rod([xx,2.55,.034],[xx,2.55,.222],.014,'brass',C.brass,9);
      b.torus([xx,2.507,.201],.040,.005,'brass',C.brass,[0,0,0],17);
      pattern(b,[xx,2.024,.132],.62,1.01,['front','gore','sleeve'][i],[0,0,[-.07,.031,-.048][i]]);
      b.box([xx,2.447,.145],[.095,.036,.033],'wood',C.trim);
    }
    plaque(b,'Patrons de coupe','SÉRIE XVII',[0,2.802,.039],.83,.156);
  });
}
function materialsCart(b){
  const x=-3.66,z=-8.24;shadow(b,x,z,1.42,1.69);
  b.local([x,0,z],[0,.18,0],()=>{
    for(const s of [-1,1])for(const v of [-1,1]){
      b.cyl([s*.44,.083,v*.29],.072,.072,.036,'steel','#494e43',14,[0,0,PI/2]);
      b.rod([s*.44,.097,v*.29],[s*.44,.79,v*.29],.022,'brass',C.bronze,10);
    }
    for(const y of [.20,.63]){
      b.box([0,y,0],[.959,.054,.673],'wood',C.wood);
      for(const v of [-1,1])b.box([0,y+.054,v*.321],[.95,.098,.025],'wood',C.walnut);
    }
    for(let j=0;j<3;j++)fold(b,[-.10,.232+.083*j,-.03],.58,.447,.083,j===1?'damask':'cloth',[C.coral,C.teal,C.flax][j],.022*j);
    for(let i=0;i<4;i++)spool(b,[-.31+i*.17,.669,-.139],.063,.17,[C.gilt,C.ink,C.jade,C.coral][i]);
    fold(b,[.11,.67,.098],.48,.245,.064,'shoal','#e8d6bd',-.105);
    for(const s of [-1,1])b.curve([[s*.44,.70,-.29],[s*.44,.87,-.29],[s*.44,.91,-.23],[s*.44,.91,.22],[s*.44,.86,.29],[s*.44,.70,.29]],.014,'brass',C.brass,17,7);
  });b.block(x,z,1.12,.92);
}
export function buildWorkshop(b){
  b.zone='Cutting bench';cuttingBench(b);
  b.zone='Workshop fittings';sewingMachine(b);patternWall(b);pegboard(b);hangingPatterns(b);materialsCart(b);
  b.block(4.68,-14.22,.44,2.47);b.block(-4.63,-11.04,.41,2.12);
}


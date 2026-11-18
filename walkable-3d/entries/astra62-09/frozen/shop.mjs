import {C,PI,TAU,bolt,handle,pipeJoint} from './geometry.mjs';
import {alcove as A} from './layout.mjs';

function spanner(k,x,y,z,length,angle=0) {
  const s=length/.40;
  k.frame([x,y,z],[0,0,angle],()=>{
    const shape=[[-.018,-.125],[-.015,.103],[-.049,.137],[-.053,.168],[-.031,.194],[-.022,.154],[.009,.143],[.031,.166],[.025,.201],[.052,.184],[.063,.147],[.042,.112],[.018,.096],[.018,-.125]];
    k.shape([0,0,0],shape.map(([a,b])=>[a*s,b*s]),.012*s,'bright',C.silver,[0,0,0],.002);
    k.ring([0,-.146*s,.006*s],.035*s,.012*s,'bright',C.silver,'z',18);
    k.box([0,-.008*s,.019*s],[.014*s,.158*s,.003],'metal',C.grey,.002);
  });
}
function screwdriver(k,x,y,z,long,col=C.ochre){
  k.rod([x,y,z],[x,y+long*.65,z],.0085,'bright',C.silver,8);
  k.box([x,y+.009,z],[.026,.028,.005],'metal',C.dark,.002);
  k.cyl([x,y+long*.79,z],.025,.034,long*.30,'rubber',col,'y',8);
  k.cyl([x,y+long*.965,z],.026,.027,.024,'rubber',C.hose,'y',10);
}
function rollingCase(k,p,w,h,d){
  k.frame(p,[0,0,0],()=>{
    for(const x of [-w*.34,w*.34])for(const z of [-d*.31,d*.31]){
      k.cyl([x,.088,z],.076,.076,.064,'rubber',C.hose,'x',16);
      k.box([x,.16,z],[.079,.092,.14],'metal',C.steel,.009);
    }
    k.box([0,h/2+.17,0],[w,h,d],'paint',C.teal,.044);
    k.box([0,h+.179,0],[w+.038,.078,d+.035],'rubber',C.iron,.024);
    for(let i=0;i<3;i++){
      const y=.26+(i+.5)*(h-.14)/3;
      k.box([0,y,d/2+.014],[w-.12,(h-.18)/3,.034],'paint',C.grey,.016);
      k.box([0,y+(h-.18)/9,d/2+.047],[w-.22,.023,.05],'metal',C.steel,.007);
    }
    handle(k,[w/2+.008,h-.03,0],d*.59,.077,'x',C.dark);
    k.box([0,h+.232,0],[w-.17,.018,d-.14],'rubber',C.hose,.015);
  });
}
function bench(k){
  // Local +z faces the aisle. Tool silhouettes stand out from a dark perforated back.
  k.frame([12.18,0,.70],[0,-PI/2,0],()=>{
    k.box([0,2.0,-.067],[5.97,3.75,.19],'paint',C.panel,.026);
    for(const x of [-2.49,-1.49,-.49,.51,1.51,2.51])k.box([x,2.01,.052],[.944,3.25,.071],'paint',C.hull,.036);
    k.box([-.13,2.00,.151],[4.62,1.37,.13],'paint',C.dark,.036);
    k.box([-.13,2.00,.224],[4.48,1.227,.03],'peg',0x485354,.018);
    for(const x of [-2.21,1.97])for(const y of [1.48,2.52])bolt(k,[x,y,.252],'z',.032);
    // Folded stock workbench with steel fascia, kick rail and adjustable feet.
    k.box([-.12,1.026,.67],[5.15,.125,1.04],'metal',C.steel,.032);
    k.box([-.12,1.101,.67],[5.18,.037,1.075],'paint',C.grey,.013);
    k.box([-.12,1.127,.66],[5.02,.019,.947],'rubber',0x4a5352,.012);
    for(const x of [-2.49,-.53,2.25])for(const z of [.26,1.05]){
      k.box([x,.532,z],[.084,.86,.084],'paint',C.grey,.009);
      k.cyl([x,.08,z],.098,.10,.079,'metal',C.dark,'y',12);
      k.cyl([x,.143,z],.034,.034,.077,'bright',C.steel,'y',12);
    }
    for(const x of [-1.78,1.51]){
      k.box([x,.624,.662],[1.37,.702,.801],'paint',C.teal,.032);
      for(let i=0;i<4;i++){
        const y=.364+i*.161;k.box([x,y,1.086],[1.25,.143,.055],'paint',i%2?C.grey:C.panel,.015);
        k.box([x+.10,y+.027,1.121],[.86,.025,.036],'metal',C.silver,.005);
        k.box([x-.476,y+.021,1.120],[.128,.057,.012],'paint',C.ivory,.003);
      }
      k.box([x,.232,.66],[1.24,.087,.72],'rubber',C.dark,.01);
    }
    k.box([-.18,.27,.53],[1.45,.053,.55],'paint',C.grey,.014);
    // Wrenches, socket rail and hand drivers occupy distinct cutouts at a human reach height.
    for(let i=0;i<6;i++){
      const x=-1.94+i*.214,sz=.34+i*.05;
      spanner(k,x,2.02,.310,sz,-.045);
      k.tube([[x-.039,2.02+sz*.37,.257],[x-.039,2.02+sz*.37,.328],[x-.036,2.02+sz*.39,.348]],.009,'bright',C.steel,8,6);
    }
    for(let i=0;i<6;i++){
      const x=-.46+i*.113;
      screwdriver(k,x,1.77,.322,.402+(i%3)*.035,i%3===0?C.ochre:C.teal);
    }
    k.box([-.175,1.955,.306],[.784,.063,.135],'paint',C.dark,.009);
    k.box([1.18,1.844,.326],[1.28,.052,.198],'metal',C.steel,.007);
    for(let i=0;i<8;i++){
      const xx=.66+i*.143,r=.026+.0032*i;
      k.cyl([xx,1.923,.36],r,r,.103+.005*i,'bright',C.silver,'y',16);
      k.cyl([xx,1.977+.0025*i,.36],r*.62,r*.62,.006,'black',C.iron,'y',8);
    }
    k.label([1.21,2.299,.247],[0,0,1],[0,1,0],1.29,.160,'METRIC   /   06–22',{ink:'#c3c7b7'});
    k.box([-.17,2.81,.401],[5.21,.108,.65],'paint',C.grey,.026);
    k.box([-.17,2.731,.595],[4.86,.053,.134],'lit',0xffdfac,.014);
    for(const xx of [-2.18,-.10,1.98])k.bar([xx,2.75,.56],[xx,2.47,.17],.035,.04,'metal',C.dark);
    k.label([-.22,3.198,.108],[0,0,1],[0,1,0],3.63,.35,'COMPONENT SERVICE',{ink:'#4e5c5b',distress:true});
    // Compact bench vise with machined jaws, sliding screw, spindle and cross handle.
    k.cyl([-1.58,1.17,.83],.218,.235,.081,'paint',C.teal);
    k.box([-1.58,1.286,.83],[.373,.206,.285],'paint',C.teal,.047);
    k.box([-1.50,1.423,.86],[.138,.173,.253],'paint',C.teal,.021);
    k.box([-1.50,1.511,.86],[.142,.057,.277],'bright',C.silver,.009);
    k.box([-1.813,1.388,.86],[.122,.231,.26],'paint',C.teal,.022);
    k.box([-1.813,1.511,.86],[.128,.057,.277],'bright',C.silver,.009);
    k.cyl([-1.837,1.308,.86],.055,.055,.41,'metal',C.steel,'x',16);
    k.cyl([-2.038,1.308,.86],.069,.069,.073,'metal',C.dark,'x',16);
    k.rod([-2.073,1.12,.82],[-2.073,1.465,.897],.015,'bright',C.silver,10);
    for(const [y,z] of [[1.12,.82],[1.465,.897]])k.cyl([-2.073,y,z],.025,.025,.035,'bright',C.silver,'y',12);
    // Open parts tray with an extracted bearing and a few fasteners.
    k.box([.07,1.160,.83],[.87,.034,.492],'metal',C.steel,.019);
    for(const xx of [-.353,.493])k.box([xx,1.196,.83],[.031,.080,.497],'paint',C.ochre,.009);
    for(const zz of [.596,1.061])k.box([.07,1.196,zz],[.858,.080,.031],'paint',C.ochre,.009);
    for(const [x,z,r] of [[-.14,.80,.127],[.16,.87,.087]]){
      k.ring([x,1.206,z],r,.023,'bright',C.silver,'y',28);
      k.ring([x,1.201,z],r*.69,.014,'metal',C.copper,'y',24);
    }
    for(const [x,z] of [[.32,.72],[.35,.80],[.25,.72]])bolt(k,[x,1.193,z],'y',.027);
    k.frame([1.51,1.153,.76],[-PI/2,0,.4],()=>spanner(k,0,0,0,.47,.31));
    k.box([1.69,1.16,.86],[.44,.032,.25],'rubber',0x546e6b,.017,[0,.23,0]);
    k.contact(11.45,.70,1.97,5.91,.5);
  });
  k.solid(10.93,-1.97,12.37,3.24,0,1.16);
}
function hoseReel(k){
  k.frame([9.81,0,-2.22],[0,0,0],()=>{
    k.box([0,1.57,.19],[.68,.72,.18],'paint',C.grey,.048);
    k.cyl([0,1.65,.43],.444,.444,.35,'rubber',C.hose,'z',36);
    for(let i=0;i<6;i++)k.ring([0,1.65,.29+i*.051],.421,.033,'rubber',i%2?C.hose:C.iron,'z',36);
    for(const z of [.235,.625]){
      k.turn([0,1.65,z],[[-.022,.065],[-.022,.496],[.021,.496],[.028,.433],[.020,.238],[.058,.18],[.063,.065]],'paint',C.ochre,'z',48);
    }
    k.cyl([0,1.65,.70],.119,.119,.102,'metal',C.dark,'z',16);
    for(let j=0;j<6;j++){const a=TAU*j/6;k.box([.30*Math.cos(a),1.65+.30*Math.sin(a),.655],[.16,.059,.016],'paint',C.dark,.022,[0,0,a]);}
    k.tube([[-.39,1.47,.44],[-.48,1.12,.47],[-.46,.66,.43],[-.30,.39,.42],[-.08,.47,.45],[.076,.88,.43],[.25,1.03,.38]],.032,'rubber',C.hose,42,9);
    k.rod([.22,.99,.39],[.36,1.11,.39],.042,'metal',C.copper,8);
    k.label([0,2.49,.08],[0,0,1],[0,1,0],1.45,.16,'PNEUMATIC   /   6 BAR',{ink:'#4e605c'});
  });
  k.solid(9.21,-2.35,10.39,-1.47,.32,2.20);
}
export function buildShop(k){
  k.section('service alcove',()=>{
    const z=(A.front+A.back)/2,w=A.right-A.left,d=A.front-A.back,x=(A.right+A.left)/2;
    k.box([x,-.085,z],[w+.08,.15,d+.09],'black',C.iron);
    for(let i=0;i<3;i++)for(let j=0;j<4;j++)k.box([A.left+(i+.5)*w/3,-.034,A.back+(j+.5)*d/4],[w/3-.016,.068,d/4-.016],'deck',i%2?C.grey:0x798180,.008);
    k.box([x,3.90,z],[w+.07,.18,d+.10],'paint',C.grey,.01);
    for(const side of [-1,1]){
      const zz=side<0?A.back:A.front;
      k.box([x,1.9,zz],[w+.06,3.91,.18],'paint',C.grey,.019);
      for(let i=0;i<3;i++){
        const xx=A.left+(i+.5)*w/3;
        k.box([xx,1.84,zz-side*.125],[w/3-.05,3.35,.096],'paint',i%2?C.hull:C.light,.045);
        for(const y of [.45,3.2])k.box([xx-.45,y,zz-side*.185],[.064,.102,.016],'metal',C.grey);
      }
      k.box([x,.21,zz-side*.145],[w,.38,.18],'paint',C.grey,.022);
      for(const y of [3.22,3.47]){
        k.rod([A.left,y,zz-side*.27],[A.right-.12,y,zz-side*.27],.056,'metal',y<3.4?C.steel:C.copper,12);
        for(const xx of [9.14,10.78,11.81])pipeJoint(k,[xx,y,zz-side*.27],'x',.057,C.dark);
      }
    }
    // A recycled rubber runner under the station has raised channels and beveled edging.
    k.box([10.39,.023,.70],[1.03,.046,4.74],'rubber',C.hose,.020);
    for(let j=0;j<42;j++)k.box([10.39,.049,-1.59+j*.111],[.91,.013,.026],'rubber',0x3e4747,.005);
    for(const zz of [A.back+.24,A.front-.24]){
      k.box([8.30,.01,zz],[.54,.016,.124],'mark',C.yellow);
      k.box([8.24,1.036,zz],[.17,2.03,.17],'paint',C.ochre,.026);
      for(const yy of [.58,.788,.996])k.box([8.145,yy,zz],[.02,.091,.165],'rubber',C.dark);
    }
    bench(k);hoseReel(k);
    rollingCase(k,[9.64,0,3.08],1.09,.68,.67);
    k.solid(9.04,2.64,10.23,3.55,0,.98);k.contact(9.64,3.08,1.58,1.04,.53);
    k.box([9.64,.939,3.09],[.493,.087,.309],'rubber',C.iron,.025);
    k.label([9.62,.566,3.472],[0,0,1],[0,1,0],.59,.084,'INSTRUMENTS',{ink:'#dddcc9'});
  });
  k.section('gas manifold',()=>{
    // Twin pressure vessels, saddles, valve wheels and hard lines on the west return wall.
    k.frame([-8.13,0,5.12],[0,PI/2,0],()=>{
      k.box([0,1.20,.08],[2.24,2.18,.16],'paint',C.grey,.049);
      k.box([0,.121,.36],[2.27,.205,.71],'metal',C.dark,.026);
      for(const x of [-.48,.48]){
        k.turn([x,0,.42],[[.224,.10],[.245,.225],[.33,.271],[.48,.285],[1.75,.285],[1.88,.274],[2.00,.216],[2.08,.104],[2.11,.083]],'paint',C.ivory,'y',36);
        for(const yy of [.61,1.59]){
          k.cyl([x,yy,.42],.296,.296,.102,'metal',C.steel,'y',32);
          k.box([x,yy,.12],[.33,.09,.23],'metal',C.dark,.011);
        }
        k.cyl([x,1.83,.42],.281,.281,.082,'paint',C.teal,'y',36);
        k.cyl([x,2.14,.42],.087,.087,.106,'metal',C.copper,'y',8);
        k.cyl([x,2.242,.42],.038,.038,.118,'bright',C.silver,'y',12);
        k.ring([x,2.32,.42],.124,.018,'paint',C.red,'y',22);
        for(let i=0;i<3;i++){const a=i*TAU/3;k.rod([x,2.31,.42],[x+.117*Math.sin(a),2.31,.42+.117*Math.cos(a)],.011,'metal',C.grey,6)}
        k.tube([[x,2.17,.42],[x+.19,2.17,.42],[x+.23,2.26,.35],[x+.23,2.61,.22],[x+.23,2.78,.18]],.030,'metal',C.copper,25,8);
        k.label([x,1.18,.71],[0,0,1],[0,1,0],.32,.231,'He',{ink:'#526861'});
      }
      k.rod([-1.34,2.78,.18],[1.34,2.78,.18],.064,'metal',C.steel,16);
      for(const xx of [-1.22,-.25,.75,1.22])pipeJoint(k,[xx,2.78,.18],'x',.064);
      k.label([0,3.24,.12],[0,0,1],[0,1,0],2.23,.173,'HELIUM   /   PURGE SUPPLY',{ink:'#435553'});
    });
    k.solid(-8.40,3.94,-7.32,6.31,0,2.52);k.contact(-7.68,5.12,1.48,2.92,.48);
  });
}


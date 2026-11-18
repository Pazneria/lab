import {box,zone,place,lathe,cylinder,ellipsoid,rod,beam,path,torus,grid,face,print,pi,tau} from './geometry.js';
import {P,rand} from './materials.js';
import {frame,pin,panel,handle,drawer,strapHinge,pick,book,lantern,basket,flask} from './joinery.js';
import {F,W} from './walk.js';
export function cushion(x,y,z,w,h,d,col,mat='cloth'){
  const seg=32,Q=(a)=>Math.sign(a)*Math.abs(a)**.47;
  const pt=(a,f,yy)=>[x+w*.5*f*Q(Math.cos(a)),y+yy,z+d*.5*f*Q(Math.sin(a))];
  const pr=[[.06,.015],[.82,.015],[.98,h*.26],[1,h*.50],[.96,h*.67],[.78,h*.92],[.40,h],[.02,h*.96]];
  for(let j=1;j<pr.length;j++)for(let i=0;i<seg;i++){
    const a=tau*i/seg,b=tau*(i+1)/seg,v=[pt(a,...pr[j-1]),pt(a,...pr[j]),pt(b,...pr[j]),pt(b,...pr[j-1])];
    face(v,col,mat,v.map(q=>[(q[0]-x)*2.8,(q[2]-z)*2.8+(q[1]-y)*.4]));
  }
  const ps=Array.from({length:seg+1},(_,i)=>pt(tau*i/seg,1,h*.50));path(ps,.0045,col,'cloth',40,5);
}
function curtains(){
  rod([-3.55,2.84,-.495],[-1.29,2.84,-.495],.017,P.brass);
  for(const x of [-3.55,-1.29]){
    ellipsoid(x,2.84,-.495,.034,.034,.034,P.brass,'metal',12,6);
    rod([x,2.835,-.51],[x,2.84,-.72],.016,P.iron);
  }
  for(const d of [-1,1]){
    const x=d<0?-3.42:-1.47;
    function p(u,v){
      const wide=.16+.205*(1-Math.exp(-((v-.42)**2)/.014))+.03*v;
      const a=(u-.5)*wide,xx=x+a+d*.042*Math.exp(-((v-.42)**2)/.015);
      return [xx,1.71+1.096*v+Math.cos(u*pi*5)*.012*(1-v),-.528+.028*Math.cos(u*tau*3+.2*v)+.031*(1-v)];
    }
    grid(18,12,p,'#d7c49b','cloth',[1.4,4.3]);grid(18,1,(u,v)=>{const q=p(u,.06+.017*v);q[2]+=.002;return q},P.red,'cloth');
    for(let i=0;i<6;i++){const xx=p(i/5,1)[0];place(xx,2.833,-.495,()=>torus(0,0,0,.025,.004,P.brass,'metal',14,5),0,pi/2)}
    const yy=1.71+1.096*.42;path([[x-.104,yy,-.536],[x,yy-.013,-.48],[x+.105,yy,-.529]],.009,P.brass,'cloth',11);
    path([[x+d*.065,yy,-.486],[x+d*.114,yy-.079,-.469],[x+d*.102,yy-.16,-.476]],.006,P.trim,'cloth',10);
    lathe(x+d*.102,yy-.196,-.476,[[.018,0],[.013,.03],[.005,.039]],P.trim,'cloth',9);
  }
}
function berth(){
  const x=-2.44,z=-.967;
  box(x,1.11,z,2.23,.385,.804,P.deep,'paint');box(x,1.315,z,2.27,.086,.837,P.oak);
  for(let i=0;i<3;i++)drawer(-3.168+i*.725,1.114,-.554,.692,.314,i===0?'letters':null,['#477364','#507567','#487363'][i]);
  for(const end of [-3.557,-1.323]){
    box(end,1.314,z,.057,.776,.84,P.pine,'paint');
    box(end,1.708,z,.072,.044,.855,P.oak);
  }
  cushion(x,1.339,z,2.178,.165,.797,'#dacba9');
  place(-3.234,1.469,-.966,()=>{cushion(0,0,0,.451,.151,.655,'#eee1c0');},0,-.045);
  const point=(u,v)=>{
    const a=Math.min(1,u/.979),edge=Math.max(0,(u-.94)/.06),drop=Math.max(0,(v-.82)/.18);
    return [-3.006+1.66*a+edge*.023,1.520+.014*Math.sin(u*11+v*3)+.007*Math.sin(v*19-u*3)-.14*drop**1.4-.065*edge**1.6,-1.315+.835*Math.min(1,v/.90)+.015*drop+.012*Math.sin(u*24)*drop];
  };
  for(let j=0;j<4;j++)for(let i=0;i<7;i++){
    const k=(i*2+j*3)%8,mat=['fabric1','cloth','fabric0','cloth','fabric2','cloth','fabric3','cloth'][k],c=mat==='cloth'?['#cea86f','#a85f50','#6a8881','#d9caa3'][(i+j)%4]:'#fff8e7';
    grid(3,4,(u,v)=>point((i+u)/7,(j+v)/4),c,mat,[.75,.70]);
  }
  for(let i=0;i<8;i++){const u=i/7;path(Array.from({length:13},(_,k)=>{let q=point(u,k/12);q[1]+=.002;return q}),.0027,'#c7af84','cloth',14,4)}
  grid(3,15,(u,v)=>{const p=point(u*.056,v);p[1]+=.008;return p},'#e6d7b4','cloth',[.6,4]);
  // A scrap-cloth wren sits on the footboard, sewn from leftovers in the shop.
  place(-1.326,1.731,-1.045,()=>{
    for(const d of [-1,1]){
      rod([d*.019,.003,.015],[d*.020,.039,.006],.003,P.bronze,'metal',.003,5);
      rod([d*.019,.004,.015],[d*.031,.004,.040],.0025,P.bronze,'metal',.0018,5);
    }
    place(0,.079,0,()=>ellipsoid(0,0,0,.048,.051,.085,'#fff4df','fabric0',16,8),-.16);
    ellipsoid(0,.132,.041,.041,.042,.041,'#c7a775','cloth',15,9);
    for(const d of [-1,1]){
      place(d*.039,.079,0,()=>ellipsoid(0,0,0,.016,.030,.055,'#e0c68f','cloth',13,7),-.35);
      ellipsoid(d*.034,.139,.060,.006,.006,.006,P.black,'pottery',8,5);
    }
    rod([0,.131,.075],[0,.129,.102],.010,P.walnut,'wood',.0008,7);
    for(const d of [-1,1])rod([d*.012,.074,-.060],[d*.025,.127,-.134],.016,'#807c65','cloth',.006,7);
  },0,.58);
  curtains();
  // Leather sling and a small watch within reach of the pillow.
  place(-3.49,1.925,-.84,()=>{
    box(0,0,0,.36,.16,.055,P.leather,'leather',.015);path([[-.165,.06,.035],[-.08,.029,.045],[.08,.029,.045],[.165,.06,.035]],.007,P.oak,'leather',11);
    print('letter',0,.09,.004,.24,.149,0,0,-.07);
  },0,pi/2);
  place(-1.50,2.24,-1.297,()=>{
    path([[-.038,.18,.003],[-.06,.131,.025],[.004,.057,.032],[0,.014,.033]],.0045,P.brass,'metal',10);
    pin(0,-.038,.031,.055,P.brass);pin(0,-.038,.041,.045,P.cream);
    for(let j=0;j<12;j++){const a=j*tau/12;rod([.037*Math.sin(a),-.038+.037*Math.cos(a),.049],[.031*Math.sin(a),-.038+.031*Math.cos(a),.049],.0018,P.iron)}
    rod([0,-.038,.051],[.019,-.025,.051],.0026,P.iron);rod([0,-.038,.052],[-.006,-.014,.052],.002,P.iron);
  });
}
function flowerJar(x,y,z,sc=.8){
  place(x,y,z,()=>{
    lathe(0,0,0,[[.059,0],[.072,.02],[.082,.115],[.053,.16],[.041,.175],[.048,.19]],'#9cae91','pottery',18);
    for(let i=0;i<7;i++){
      const a=i*2.399,xx=.114*Math.cos(a),zz=.085*Math.sin(a),yy=.272+rand()*.13;
      path([[0,.158,0],[xx*.43,.24,zz*.38],[xx,yy,zz]],.003,'#68794d','matte',7,4);
      for(let k=0;k<5;k++){const b=k*tau/5;ellipsoid(xx+.014*Math.cos(b),yy+.004,zz+.014*Math.sin(b),.016,.006,.012,i%3?'#ecdfb3':'#d7a65f','matte',7,4)}
      ellipsoid(xx,yy+.008,zz,.009,.008,.009,'#b99a3d','matte',7,4);
      face([[xx*.5,.23,zz*.5],[xx*.5+.035,.255,zz*.5+.006],[xx*.5+.048,.271,zz*.5]],'#70825e','matte');
    }
  },0,0,0,sc,sc,sc);
}
function desk(){
  place(-2.58,F,1.305,()=>{
    panel(0,.503,-.012,1.40,.50,'#578071',P.deep);
    box(0,.771,.204,1.42,.056,.465,P.oak,'wood',.012);
    box(0,.763,.441,1.41,.048,.023,P.walnut);
    for(const d of [-1,1]){
      strapHinge(d*.490,.739,.017,.150);pin(d*.66,1.226,.027,.023,P.iron);
      const a=[d*.662,1.226,.031],b=[d*.662,.804,.403];
      path([a,[d*.66,1.044,.153],b],.006,P.iron,'metal',12);
      for(let k=0;k<8;k++){const t=k/8;torus(a[0],a[1]+(b[1]-a[1])*t,a[2]+(b[2]-a[2])*t,.009,.0026,P.brass,'metal',10,4)}
    }
    // Book, folded correspondence and a pencil on the drop leaf.
    place(-.115,.803,.235,()=>{box(0,.012,0,.397,.024,.264,P.leather,'leather');print('ledger',0,.027,0,.383,.249,0,-pi/2)},0,-.087);
    print('letter',.267,.802,.190,.224,.14,.10,-pi/2);
    rod([.19,.811,.338],[.405,.811,.294],.006,'#b68c46','wood',.006,6);
    rod([.405,.811,.294],[.423,.81,.290],.006,'#514e40','wood',.0005,6);
    flowerJar(.523,.801,.105,.75);
    box(0,1.925,.071,1.51,.059,.205,P.oak);
    for(const xx of [-.60,.60])beam([xx,1.76,.019],[xx,1.907,.146],.036,.034,P.bronze,'metal');
    book(-.38,1.961,.060,.31,.052,.155,'#875c48');book(-.39,2.021,.061,.27,.034,.149,'#4d6860');
    basket(.25,1.956,.055,.122,.108,false);
    // Folded stool hangs flat under the desktop.
    for(const s of [-1,1]){
      beam([-.27+s*.053,.072,.065],[.16+s*.053,.622,.125],.034,.031,P.chestnut);
      beam([.15+s*.053,.073,.065],[-.27+s*.053,.622,.125],.036,.032,P.oak);
      pin(-.052+s*.053,.342,.121,.015);
    }
    box(-.048,.606,.107,.612,.051,.154,P.red,'cloth');
  },0,pi);
}
function cupboard(){
  const x=-.683,z=-1.144;
  box(x,1.296,z,1.166,.76,.365,P.deep,'paint');
  for(let j=0;j<2;j++)for(let i=0;i<2;i++)drawer(x+(i-.5)*.551,1.127+j*.306,-.952,.528,.281,null,i===0?'#537467':'#42685a');
  box(x,1.686,z,1.21,.063,.399,P.oak);
  place(-.998,1.724,-1.117,()=>{book(0,0,0,.345,.061,.232,'#82533e');book(-.008,.067,0,.295,.044,.218,'#627169')},0,-.09);
  lantern(-.337,1.719,-1.13,.83);
  place(-.76,2.252,-1.298,()=>{box(0,0,0,.419,.53,.034,P.walnut);print('botany',0,0,.0181,.371,.479);frame(0,0,.025,.423,.535,.026,P.oak,.027)},0,0,.026);
  // Peg rail with a travel hat and the spare leather loop.
  box(-.68,2.793,-1.287,1.10,.071,.046,P.oak);
  for(const xx of [-1.115,-.84,-.56,-.285])rod([xx,2.795,-1.264],[xx,2.834,-1.163],.014,P.brass,'metal',.020,10);
  place(-.982,2.683,-1.168,()=>{
    lathe(0,0,0,[[.215,0],[.222,.014],[.133,.026],[.128,.121],[.104,.157],[.049,.160]],'#b08a58','cloth',25);
    lathe(0,0,0,[[.132,.032],[.130,.069]],P.leather,'leather',24);
  },.96,.10,.24);
  path([[-.305,2.825,-1.17],[-.353,2.63,-1.195],[-.33,2.457,-1.21],[-.273,2.478,-1.208],[-.282,2.823,-1.17]],.010,P.leather,'leather',16);
}
function stove(){
  const x=-.76,z=1.038;
  place(x,F,z,()=>{
    box(0,.018,0,.70,.036,.585,'#5e6259','matte');
    for(const xx of [-.16,.16])for(const zz of [-.16,.16])beam([xx,.03,zz],[xx*.82,.182,zz*.82],.043,.041,P.iron,'metal');
    lathe(0,0,0,[[.17,.145],[.223,.176],[.236,.25],[.222,.41],[.214,.58],[.223,.616],[.231,.632]],'#3f4c47','metal',24);
    for(const [h,r] of [[.224,.238],[.596,.223]])lathe(0,h,0,[[r,0],[r+.007,.008],[r,.019]],P.bronze,'metal',24,false);
    box(0,.384,-.203,.247,.252,.058,P.iron,'metal',.017);
    box(0,.403,-.240,.187,.171,.017,'#48524a','metal',.018);
    for(let i=0;i<4;i++)box(-.051+i*.034,.405,-.251,.012,.085,.008,'#262e28','metal');
    rod([-.108,.49,-.238],[-.108,.49,-.289],.01,P.brass);rod([-.14,.49,-.289],[-.07,.49,-.289],.012,P.brass);
    lathe(-.078,.64,.087,[[.062,0],[.066,.13],[.061,.16],[.061,2.35]],'#444d46','metal',18);
    for(const yy of [1.11,1.77,2.21])lathe(-.078,yy,.087,[[.067,0],[.067,.031]],P.bronze,'metal',17);
    const cap=3.12;lathe(-.078,cap-.23,.087,[[.076,0],[.079,.028],[.064,.068],[.066,.132],[.112,.177],[.116,.188],[.021,.223]],'#4c554a','metal',20);
    lathe(-.078,2.50,.087,[[.185,0],[.133,.037],[.085,.134]],'#5d685b','metal',19);
    // Enamel kettle, its curved spout and wrapped bail.
    lathe(.062,.64,-.068,[[.09,0],[.116,.018],[.126,.082],[.108,.142],[.077,.166],[.089,.175],[.057,.194]],'#7e9988','pottery',22);
    lathe(.062,.835,-.068,[[.018,0],[.022,.02],[.013,.03]],P.walnut,'wood',11);
    path([[.142,.713,-.112],[.187,.742,-.124],[.215,.806,-.133]],.024,'#829c8b','pottery',10,10);
    path([[-.04,.759,-.068],[-.043,.885,-.057],[.058,.945,-.057],[.166,.884,-.057],[.164,.765,-.068]],.008,P.iron,'metal',18);
    path([[-.007,.927,-.057],[.058,.945,-.057],[.113,.927,-.057]],.015,P.walnut,'wood',9);
  });
  place(x,2.012,W-.063,()=>{
    box(0,0,0,.65,1.27,.025,'#82887b','metal');
    for(const xx of [-.28,.28])for(const yy of [-.577,.577])pin(xx,yy,-.017,.010,P.iron);
  });
}
export function buildHome(){
  zone('home');berth();desk();cupboard();stove();
  print('rug',-1.936,F+.004,.137,1.952,.708,0,-pi/2);
  for(const d of [-1,1])for(let j=0;j<27;j++){
    const x=-1.936+d*.974,z=-.199+j*.026;
    face([[x,F+.004,z],[x+d*.044,F+.004,z+.002],[x+d*(.053+rand()*.017),F+.004,z+.010],[x,F+.004,z+.015]],j%3?P.cream:P.walnut,'cloth');
  }
}
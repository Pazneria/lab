import {T,P,PI,TAU,model,group,part,box,bevel,cyl,rod,beam,bolt,tube,ball,annulus,plate,contact,localObstacle} from './fabrication.js';
import {textLabel,tag,graphic,compliance,sampleScreen,rect,txt,monoTxt,line,ink,paper} from './graphics.js';

function foot(g,x,z) {
  contact(g,x,z,.5,.42);
  cyl(g,x,.049,z,.165,.094,P.rubber,'rubber',32,.157);
  cyl(g,x,.107,z,.148,.043,P.alloy,'metal',32);
  cyl(g,x,.162,z,.065,.07,P.steel,'chrome',24);
  cyl(g,x,.202,z,.106,.052,P.alloy,'metal',6);
  cyl(g,x,.241,z,.089,.043,P.ink,'rubber',24);
}
function chassis(g){
  contact(g,0,0,4.52,2.57);contact(g,0,-.04,3.59,2.05,.006);
  for(const x of [-1.34,1.34])for(const z of [-.61,.61])foot(g,x,z);
  bevel(g,0,.279,0,3.22,.105,1.58,.043,P.gun,'metal');
  bevel(g,0,.346,0,3.28,.063,1.63,.028,P.black,'rubber');
  bevel(g,0,.478,0,3.32,.244,1.65,.067,P.ceramic,'paint');
  bevel(g,0,.610,0,3.37,.050,1.70,.019,P.ink,'rubber');
  bevel(g,0,.662,0,3.41,.075,1.73,.028,P.alu,'metal');
  for(const x of [-1.42,1.42])for(const z of [-.68,.68])bolt(g,x,.703,z,.032,'y',P.gun);
  // Service face and the two removable filter cassettes are different from the operator face.
  const rear=group(g,0,0,-.833,PI);
  for(const s of [-1,1]){
    bevel(rear,s*.99,.478,.004,.85,.17,.036,.017,P.gun,'metal');
    for(let i=0;i<18;i++)box(rear,s*.99-.357+i*.042,.477,.026,.017,.108,.008,P.black,'rubber');
    for(const k of [-1,1])bolt(rear,s*.99+k*.391,.477,.029,.018);
  }
  bevel(rear,0,.477,.014,.92,.177,.034,.014,P.deep,'paint');
  for(let i=0;i<3;i++){
    const x=-.29+i*.196;
    rod(rear,[x,.472,.03],[x,.472,.071],.054,P.steel,'metal',6);
    rod(rear,[x,.472,.069],[x,.472,.126],.041,P.black,'rubber',12);
    tube(rear,[[x,.472,.12],[x,.439,.192],[x+.021,.24,.254],[x+.13,.079,.272],[x+.42,.069,.27],[.58,.042,.26]],.018+i*.002,'#313d3c','rubber',28);
  }
  bevel(rear,.57,.018,.27,.37,.033,.27,.014,P.alloy,'metal');cyl(rear,.57,.042,.27,.077,.018,P.rubber,'rubber',20);
  compliance(rear,.312,.483,.034,.214,.105,'PX-041');
  const face=group(g,0,0,.831);
  tag(face,-.835,.479,.004,1.04,.181,'FIELDWORK  /  PX SERIES','PARALLAX  ·  01','MULTI-ANGLE OPTICAL SCANNER');
  for(const x of [.42,.64,.86]) {
    box(face,x,.463,.008,.153,.022,.014,P.ink,'rubber');
    box(face,x,.465,.020,.116,.009,.010,x<.6?P.led:P.alloy,x<.6?'signal':'metal');
  }
  for(const x of [-1.46,-.245,.24,1.45])bolt(face,x,.477,.013,.019);
  for(const s of [-1,1]){
    const panel=group(g,s*1.66,0,0,s*PI/2);
    bevel(panel,0,.477,.006,1.19,.155,.036,.017,'#a5afaa','metal');
    for(let i=0;i<13;i++)box(panel,-.46+i*.06,.479,.027,.023,.077,.007,P.gun,'matte');
    for(const x of [-.55,.55])bolt(panel,x,.477,.029,.014);
    for(const z of [-.56,.56]){
      bevel(g,s*1.09,.715,z,.28,.035,.23,.009,P.gun,'metal');
      bolt(g,s*1.10,.745,z,.044,'y');
    }
  }
  localObstacle(g,0,.02,3.40,1.88);
}
function towerSide(g,s){
  const h=group(g,s*1.45,.715,0,PI/2);
  const outer=[[-.59,0],[.59,0],[.59,.086],[.255,1.37],[.15,1.52],[-.155,1.52],[-.265,1.385],[-.59,.12]];
  const inner=[[-.318,.22],[.32,.22],[.147,.83],[-.145,.83]];
  const shape=new T.Shape(outer.map(x=>new T.Vector2(...x)));
  const hole=new T.Path(inner.map(x=>new T.Vector2(...x)));shape.holes.push(hole);
  const geo=new T.ExtrudeGeometry(shape,{depth:.186,bevelEnabled:true,bevelSize:.027,bevelThickness:.027,bevelSegments:2,curveSegments:3});
  geo.translate(0,0,-.093);part(h,geo,0,0,0,P.ivory,'paint');
  bevel(h,0,.036,0,1.32,.087,.342,.027,P.alloy,'metal');
  for(const x of [-.5,.5])for(const side of [-1,1])bolt(h,x,.09,side*.12,.028,'y',P.gun);
  for(const face of [-1,1]){
    const side=group(h,0,0,face*.124,face<0?PI:0);
    for(const x of [-.45,.45])bolt(side,x,.145,0,.043);
    for(const x of [-.135,.135])bolt(side,x,1.11,.004,.028);
    const crest=plate(side,[[-.184,.934],[.185,.934],[.165,1.035],[-.163,1.035]],.009,P.sage,'paint',.005);crest.position.z=.004;
    textLabel(side,0,.99,.016,.29,.055,'TRUNNION '+(s<0?'L':'R'),{mono:true,color:'#233f38'});
  }
  const axle=group(g,s*1.45,2.067,0,s*PI/2);
  // Local +Z is the outboard end of the axle.
  function hub(z,r,len,col,surf,n=48){
    const c=cyl(axle,0,0,z,r,len,col,surf,n);c.rotation.x=PI/2;
  }
  hub(-.03,.228,.43,P.alloy,'metal');hub(.139,.207,.067,P.ink,'rubber');hub(.196,.183,.075,P.steel,'metal');
  hub(.238,.152,.033,P.gun,'metal');
  if(s>0){
    hub(.264,.124,.057,P.rubber,'rubber');
    bevel(axle,0,-.06,.344,.31,.44,.16,.047,P.orange,'paint');
    hub(.434,.105,.032,P.red,'metal');hub(.461,.06,.032,P.gun,'metal');
    for(const xx of [-1,1])bolt(axle,xx*.106,-.207,.428,.018);
    tube(axle,[[0,-.24,.341],[.066,-.34,.30],[.18,-.50,.17],[.36,-.98,.06],[.50,-1.32,.035]],.024,P.rubber,'rubber');
  }else{
    hub(.27,.156,.067,P.ceramic,'paint');hub(.316,.077,.047,P.alloy,'metal');
    for(let i=0;i<6;i++){const a=i*TAU/6;bolt(axle,Math.cos(a)*.115,Math.sin(a)*.115,.309,.019);}
    box(axle,0,.01,.345,.085,.014,.012,P.black,'rubber');
  }
}
function opticalHead(ring,a,i){
  const r=1.178,x=r*Math.cos(a),y=r*Math.sin(a);
  const socket=group(ring,x,y,0);socket.rotation.z=a-PI/2;
  bevel(socket,0,.04,0,.245,.14,.31,.024,P.gun,'metal');
  for(const s of [-1,1])bolt(socket,s*.085,.04,.164,.019);
  const h=group(socket,0,-.016,(i%2?-.041:.041));h.rotation.x=(i%2?-.19:.19);
  bevel(h,0,-.066,0,.267,.162,.257,.027,i===0||i===4?P.orange:P.ceramic,'paint');
  for(const s of [-1,1])bevel(h,s*.133,-.066,0,.027,.11,.19,.008,P.alloy,'metal');
  for(let k=0;k<3;k++)box(h,-.066+k*.052,-.055,.131,.031,.042,.005,P.gun,'matte');
  cyl(h,0,-.169,0,.116,.073,P.ink,'rubber',32);
  cyl(h,0,-.214,0,.105,.046,P.steel,'metal',32);
  cyl(h,0,-.249,0,.091,.044,P.black,'rubber',32);
  for(let k=0;k<4;k++)cyl(h,0,-.229-k*.013,0,.098,.007,P.gun,'metal',32);
  cyl(h,0,-.293,0,.101,.051,P.gun,'metal',32,.092);
  cyl(h,0,-.319,0,.088,.009,'#201f25','rubber',36);
  cyl(h,0,-.326,0,.077,.012,i%2?'#528a8d':'#756b90','optic',36);
  cyl(h,0,-.333,0,.057,.006,'#27454b','optic',32);
  const glass=ball(h,0,-.333,0,.046,i%2?'#4d777e':'#686182','optic',24);glass.scale.y*=.13;
  for(const s of [-1,1])bolt(h,s*.091,-.092,-.135,.014,'-z');
  rod(socket,[.066,0,-.12],[.066,0,-.207],.036,P.steel,'metal',6);
  const start=[x+Math.sin(a)*.065,y-Math.cos(a)*.065,-.188];
  const pol=(rr,aa,zz)=>[rr*Math.cos(aa),rr*Math.sin(aa),zz];
  tube(ring,[start,pol(1.21,a+.015,-.264),pol(1.29,a+.062,-.302),pol(1.355,a+.151,-.24),pol(1.365,a+.228,-.139)],.0155,P.rubber,'rubber',22);
  // Number plaques on each axial face identify removable sensors while servicing the head.
  for(const s of [-1,1]){
    const ff=group(socket,0,.04,s*.158,s<0?PI:0);
    textLabel(ff,0,0,.011,.105,.053,String(i+1).padStart(2,'0'),{mono:true,bg:'#25373a',color:'#d4dccc'});
  }
}
function ringAssembly(g){
  const ring=group(g,0,2.067,0);ring.rotation.x=-.182;
  annulus(ring,0,0,0,1.108,1.363,.298,P.gun,'metal',0,TAU,112);
  annulus(ring,0,0,0,1.093,1.128,.313,P.alu,'metal',0,TAU,112);
  annulus(ring,0,0,0,1.358,1.38,.152,P.black,'rubber',0,TAU,112);
  for(let sector=0;sector<8;sector++){
    const a=TAU*sector/8+.012,b=TAU*(sector+1)/8-.012,col=sector===0||sector===4?P.orange:P.ivory;
    annulus(ring,0,0,0,1.201,1.362,.321,col,'paint',a,b,15);
    annulus(ring,0,0,-.087,1.36,1.373,.021,P.alu,'metal',a,b,15);
    annulus(ring,0,0,.087,1.36,1.373,.020,P.alu,'metal',a,b,15);
    for(const face of [-1,1])for(const aa of [a+.06,b-.06]){
      bolt(ring,1.312*Math.cos(aa),1.312*Math.sin(aa),face*.164,.025,face<0?'-z':'z',P.alloy);
    }
  }
  for(const face of [-1,1]){
    annulus(ring,0,0,face*.157,1.128,1.203,.021,'#344748','metal',0,TAU,112);
    for(let j=0;j<144;j++){
      const a=TAU*j/144,major=j%6===0,len=major?.050:.022,rr=1.16+(major?.006:0);
      const t=box(ring,Math.cos(a)*rr,Math.sin(a)*rr,face*.170,.0055,len,.003,major?'#e3ddbd':'#b0c0b6','paint');
      t.rotation.z=a-PI/2;
    }
    for(let j=0;j<8;j++){
      const a=(j+.54)*TAU/8,rr=1.277,ff=group(ring,Math.cos(a)*rr,Math.sin(a)*rr,face*.164);
      ff.rotation.z=a-PI/2;
      if(face<0)ff.rotation.y=PI;
      textLabel(ff,0,0,.002,.189,.055,(j*45).toString().padStart(3,'0')+'°',{mono:true,color:j===0||j===4?'#743b28':'#495b58'});
    }
  }
  for(let i=0;i<8;i++)opticalHead(ring,(i+.5)*TAU/8,i);
  // Harness rail wraps the rear casting and terminates at a sealed junction block.
  const arc=(r,a,b,z)=>Array.from({length:25},(_,i)=>{const t=a+(b-a)*i/24;return [r*Math.cos(t),r*Math.sin(t),z];});
  tube(ring,arc(1.294,.32,PI*1.71,-.246),.019,'#79533d','rubber',86);
  tube(ring,arc(1.318,.31,PI*1.70,-.229),.017,P.rubber,'rubber',86);
  for(let j=0;j<11;j++){
    const a=.37+j*.477,cl=group(ring,1.308*Math.cos(a),1.308*Math.sin(a),-.206);
    cl.rotation.z=a-PI/2;bevel(cl,0,0,0,.052,.093,.103,.009,P.alloy,'metal');
  }
  const junc=group(ring,.52,-1.145,-.22);junc.rotation.z=.37;
  bevel(junc,0,0,0,.30,.178,.112,.016,P.deep,'metal');compliance(group(junc,0,0,-.06,PI),0,0,.003,.22,.097,'R8-063');
  for(const s of [-1,1])tube(g,[[.47+s*.041,.943,-.047],[.53+s*.045,.825,-.16],[.71+s*.04,.781,-.255],[.88+s*.03,.724,-.32]],.015,P.rubber,'rubber',16);
}
function mineral(g){
  // Three cleaved rhombohedra have flat, differently reflecting faces.
  function cleavage(x,y,z,w,h,d,leanX,leanZ,ry,palette){
    const f=group(g,x,y,z,ry);
    const vertices=[[-w/2,0,-d/2],[w/2,0,-d/2],[w/2,0,d/2],[-w/2,0,d/2],
      [-w/2+leanX,h,-d/2+leanZ],[w/2+leanX,h+.027,-d/2+leanZ],[w/2+leanX,h-.014,d/2+leanZ],[-w/2+leanX,h-.041,d/2+leanZ]];
    const faces=[[3,2,6,7],[2,1,5,6],[0,3,7,4],[1,0,4,5],[7,6,5,4],[0,1,2,3]];
    faces.forEach((indices,i)=>{
      const q=indices.map(j=>vertices[j]),ge=new T.BufferGeometry();
      ge.setAttribute('position',new T.Float32BufferAttribute([...q[0],...q[1],...q[2],...q[0],...q[2],...q[3]],3));ge.computeVertexNormals();
      part(f,ge,0,0,0,palette[i%palette.length],i===4?'chrome':'optic');
    });
  }
  cleavage(-.041,0,-.019,.165,.233,.155,.051,-.021,.28,['#deb47c','#ae793e','#bd893f','#f0c78b','#efc394']);
  cleavage(.071,0,.046,.124,.123,.101,.036,-.019,-.36,['#dfb276','#9f7043','#dc974d','#e9bf7d','#f6d59b']);
  cleavage(-.111,0,.035,.082,.093,.074,.020,-.023,.78,['#b7854f','#efc48a','#b37b42','#e9bc7a']);
}
function sampleTower(g){
  bevel(g,0,.730,.025,.88,.060,.70,.026,P.gun,'metal');
  for(const x of [-.33,.33])for(const z of [-.23,.23])bolt(g,x,.772,z,.031,'y');
  cyl(g,0,.798,0,.31,.1,P.steel,'metal',56);
  cyl(g,0,.881,0,.242,.095,P.ink,'metal',48);
  cyl(g,0,1.106,0,.174,.41,P.rubber,'rubber',40);
  for(let j=0;j<9;j++){
    cyl(g,0,.923+j*.043,0,.206,.029,P.ink,'rubber',40,.187);
    cyl(g,0,.939+j*.043,0,.186,.009,P.gun,'rubber',40,.206);
  }
  for(const s of [-1,1]){
    rod(g,[s*.218,.835,.087],[s*.218,1.344,.087],.023,P.steel,'chrome',16);
    cyl(g,s*.218,1.017,.087,.039,.176,P.alloy,'metal',20);
  }
  cyl(g,0,1.334,0,.253,.08,P.alloy,'metal',48);
  bevel(g,0,1.412,0,.61,.085,.474,.02,P.ink,'metal');
  for(const s of [-1,1])box(g,0,1.466,s*.156,.55,.032,.057,P.steel,'metal');
  bevel(g,-.019,1.502,0,.51,.062,.46,.015,P.alloy,'metal');
  for(const [a,side] of [[0,1],[PI/2,-1]]){
    const adj=group(g,-.02,1.438,0,a);
    rod(adj,[0,0,.213],[0,0,.303],.026,P.steel,'chrome',14);
    rod(adj,[0,0,.296],[0,0,.356],.048,P.ink,'rubber',18);
  }
  cyl(g,0,1.573,0,.185,.092,P.ceramic,'paint',48);
  cyl(g,0,1.648,0,.209,.071,P.gun,'metal',48);
  cyl(g,0,1.709,0,.257,.054,P.steel,'metal',48);
  cyl(g,0,1.748,0,.231,.027,'#f4e9c8','light',48);
  cyl(g,0,1.767,0,.157,.01,P.deep,'metal',40);
  bevel(g,0,1.786,0,.30,.028,.245,.013,'#92b8b1','glass');
  const specimen=group(g,0,1.802,0);mineral(specimen);
  for(let i=0;i<3;i++){
    const a=TAU*i/3+.43,x=Math.cos(a)*.128,z=Math.sin(a)*.128;
    rod(g,[x,1.755,z],[x*.8,1.827,z*.8],.009,P.steel,'chrome',10);
  }
  tag(g,-.016,1.411,.239,.315,.064,'XY–02','SPECIMEN STAGE','MICROMETER ADJUST');
}
function rearReference(g){
  // An independent, oblique reference channel gives the scanner a distinct service side.
  const p=group(g,-.61,0,-.55);
  bevel(p,0,.737,0,.37,.063,.29,.018,P.alloy,'metal');
  for(const x of [-.137,.137])for(const z of [-.099,.099])bolt(p,x,.778,z,.022,'y');
  for(const x of [-.064,.064]){
    cyl(p,x,1.102,0,.026,.659,P.steel,'chrome',20);
    cyl(p,x,1.382,0,.045,.204,P.gun,'metal',20);
  }
  bevel(p,0,1.471,0,.259,.082,.198,.014,P.ceramic,'paint');
  cyl(p,0,1.552,0,.082,.098,P.alloy,'metal',28);
  const target=new T.Vector3(.61,.243,.55).normalize();
  const head=group(p,0,1.645,0);head.quaternion.setFromUnitVectors(new T.Vector3(0,0,1),target);
  bevel(head,0,0,-.01,.235,.203,.294,.020,P.deep,'paint');
  bevel(head,0,0,-.163,.234,.196,.036,.013,P.alu,'metal');
  for(let i=0;i<4;i++)box(head,-.135+i*.065,.105,-.052,.032,.012,.147,P.alloy,'metal');
  for(const s of [-1,1])for(const v of [-1,1])bolt(head,s*.09,v*.073,-.189,.015,'-z');
  function barrel(z,r,d,c,s='metal'){
    const o=cyl(head,0,0,z,r,d,c,s,36);o.rotation.x=PI/2;
  }
  barrel(.16,.094,.058,P.alloy);barrel(.212,.089,.052,P.ink);
  for(let i=0;i<5;i++)barrel(.191+i*.011,.094,.005,P.gun);
  barrel(.255,.079,.037,P.steel);barrel(.279,.068,.015,'#385958','optic');
  const lens=ball(head,0,0,.287,.055,'#586d79','optic',24);lens.scale.z*=.14;
  const service=group(head,0,0,-.186,PI);
  tag(service,0,.038,0,.166,.052,'AXIAL REF.','REF / 09','COLLIMATOR');
  for(const s of [-1,1])rod(service,[s*.053,-.039,0],[s*.053,-.039,.071],.023,P.black,'rubber',10);
  tube(p,[[-.119,1.59,-.125],[-.191,1.555,-.165],[-.181,1.402,-.157],[-.106,1.251,-.099],[-.107,.974,-.098],[-.126,.815,-.113],[-.23,.72,-.123]],.015,P.rubber,'rubber',24);
  for(const y of [1.09,1.262])bevel(p,-.077,y,-.04,.101,.019,.144,.005,P.alloy,'metal');
  const dial=group(p,.113,1.431,.014,PI/2);
  rod(dial,[0,0,0],[0,0,.076],.029,P.steel,'chrome',18);
  rod(dial,[0,0,.068],[0,0,.110],.044,P.black,'rubber',18);
  const code=group(g,-.924,.706,-.55);code.rotation.x=-PI/2;compliance(code,0,0,0,.206,.106,'REF-09');
}
function localReadout(g){
  const deck=group(g,.919,0,.72);
  bevel(deck,0,.731,.004,.41,.056,.27,.013,P.gun,'metal');
  beam(deck,[0,.747,.03],[0,1.003,.112],.102,.13,P.alloy,'metal',.011);
  const face=group(deck,0,1.036,.12);face.rotation.x=-.64;
  bevel(face,0,0,0,.656,.38,.077,.032,P.ink,'metal');
  bevel(face,0,.014,.042,.582,.292,.019,.009,P.black,'rubber');
  sampleScreen(face,0,.018,.054,.54,.264);
  for(const x of [-.253,-.185,-.117])box(face,x,-.151,.043,.044,.012,.008,P.alloy,'metal');
  box(face,.258,-.147,.044,.028,.012,.009,P.led,'signal');
  tube(deck,[[.119,1.05,.074],[.169,.949,.021],[.135,.824,-.084],[.138,.708,-.108]],.014,P.rubber,'rubber',18);
}
export function buildScanner(){
  const g=group(model,0,0,-.25,-.21);
  chassis(g);towerSide(g,-1);towerSide(g,1);ringAssembly(g);sampleTower(g);rearReference(g);localReadout(g);
}

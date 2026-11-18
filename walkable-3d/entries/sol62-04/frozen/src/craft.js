import * as T from 'three';
import { Batch, TAU, color, curvePoints, irregularStem, mix, pick, profile, rand, seeded, v } from './geometry.js';
import { paintedPlate, tintSet } from './textures.js';
import { alcove, bed } from './world.js';

const kiln = tintSet([0xa36a4d,0xae7452,0x8b5946,0xb17854,0x956146,0xa87756,0x9c654b,0x8a624e]);
const woodTones = tintSet([0x85735a,0x968269,0x96856b,0x7c6c51,0x8d795b,0x8d7e60,0x9a8162,0x827663]);
const oldMetal = tintSet([0x747a6a,0x617064,0x69786e,0x788576,0x5c695a,0x888773,0x646c5e]);
const rubbleTints = tintSet([0x786c54,0x7e6f54,0x6e6754,0x675c48,0x7b705d,0x665d47,0x8f785a]);
const soilTints = tintSet([0x514131,0x695139,0x5b4731,0x5d4c37,0x6b5338,0x665b43]);
const bolts = color(0x675f4b);
const brass = color(0x9a8a60);
const chalk = color(0xaca17b);

function clayPot(clay, earth, x,y,z,r,h,tint,{ filled=false, saucer=false, segments=20, crock=false }={}) {
  const foot = r*(crock?.69:.62);
  const middle=r*(crock?1.08:.82);
  const lip = r*(crock?.90:1);
  const inside=lip-r*.12;
  const shell=[
    [0,0],[foot*.92,0],[foot,.022*h],[foot,.10*h],[middle,h*.63],
    [lip*.96,h*.86],[lip,h*.88],[lip*1.026,h*.94],[lip*1.015,h*.985],
    [lip*.976,h],[inside,h*.981],[inside*.985,h*.914],[inside*.951,h*.88],
    [middle*.89,h*.62],[foot*.85,h*.17],[0,h*.14],
  ];
  const lower=shell.filter((_,i)=>r>=.12 || ![2,5,7,10,13].includes(i));
  profile(clay,x,y,z,lower,tint,r<.12?Math.min(segments,16):segments);
  if(saucer){
    const sr=r*.98;
    profile(clay,x,y-.006,z,[[0,0],[sr*.88,0],[sr*.99,h*.04],[sr,h*.096],
      [sr*.95,h*.125],[sr*.86,h*.094],[sr*.80,h*.05],[0,h*.045]],tint.clone().multiplyScalar(.88),segments);
  }
  if(filled){
    profile(earth,x,y,z,[[inside*.96,h*.848],[inside*.72,h*.837],[inside*.39,h*.855],[0,h*.862]],
      color(0x57452e),segments);
  }
}

function plate(parent, w,h, pos, rotation, spec, name) {
  const material=paintedPlate(w,h,spec);
  const mesh=new T.Mesh(new T.PlaneGeometry(w,h),material);
  mesh.position.copy(pos);
  mesh.rotation.set(rotation[0],rotation[1],rotation[2],'YXZ');
  mesh.receiveShadow=true;
  mesh.name=name;
  mesh.updateMatrix();
  mesh.matrixAutoUpdate=false;
  parent.add(mesh);
  return mesh;
}

function plantTag(parent,batch,x,y,z,side,name,acc,angle=.0){
  const base=v(x,y,z), tip=v(x+side*.052,y+.278,z+.039);
  batch.beam(base,tip,.018,.011,brass);
  plate(parent,.255,.105,tip,[-.55,side*Math.PI/2+angle,-.051],
    {title:name,subtitle:acc},'Plant accession label for '+name);
}

function potting(parent,m) {
  const rng=seeded(66622);
  const wood=new Batch(m.wood,'Potting bench, plank shelf, and seed crate');
  const iron=new Batch(m.iron,'Zinc tray, tools, and watering can');
  const clay=new Batch(m.clay,'Turned terracotta and stoneware at the bench');
  const earth=new Batch(m.soil,'Soil in open pots and spilled potting grit',{cast:false});
  const paper=new Batch(m.plain,'Seed envelopes, dowels and textiles');
  const rubber=new Batch(m.rubber,'Coiled hose with worn green rubber');
  const little=new Batch(m.accent,'Fabric stitches, shell marks and worn edges',{cast:false});

  const x0=alcove.left, x1=alcove.right, back=-8.23, front=-7.61;
  const xc=(x0+x1)*.5, zc=(back+front)*.5, width=x1-x0;
  for(let i=0;i<5;i++){
    const z=back+(front-back)*(i+.50)/5;
    wood.box(xc,.942+rand(rng,-.006,.006),z,(front-back)/5-.007,.057,width,
      pick(rng,woodTones),Math.PI/2+rand(rng,-.004,.004),0,0,1,3.3);
    wood.box(xc,.271+rand(rng,-.005,.005),z,(front-back)/5-.013,.039,width-.21,
      pick(rng,woodTones).clone().multiplyScalar(.81),Math.PI/2,0,0,1,3.3);
  }
  wood.box(xc,.772,front+.009,width,.164,.077,woodTones[3],0,0,-.006,3.2,1);
  wood.box(xc,.303,front+.021,width-.15,.105,.058,woodTones[0],0,0,.003,2.9,1);
  wood.box(xc,.779,back,width,.13,.070,woodTones[3]);
  for(const x of [x0+.093,x1-.10,xc+.12]){
    for(const z of [back+.046,front-.069]){
      wood.box(x,.45,z,.092,.91,.096,pick(rng,woodTones),rand(rng,-.025,.025),.013,.006,1,2.9);
      for(const h of [.33,.826]){
        iron.rod(v(x,h,z+.048),v(x,h,z+.058),.013,bolts,6);
      }
    }
  }
  wood.beam(v(x0+.102,.326,back+.029),v(x1-.16,.75,back+.025),.044,.067,woodTones[3]);
  wood.beam(v(x0+.13,.758,back+.053),v(x1-.11,.325,back+.052),.046,.069,woodTones[0]);
  wood.beam(v(x1-.114,.32,front-.086),v(x1-.11,.72,back+.08),.043,.063,woodTones[1]);

  const metalTone=oldMetal[0];
  const tx=.021, tz=-7.93;
  iron.box(tx,.982,tz,.638,.026,.444,metalTone);
  for(const side of [-1,1]){
    iron.box(tx+side*.324,1.017,tz,.031,.071,.46,oldMetal[3],0,0,side*-.11);
    iron.box(tx,1.018,tz+side*.228,.668,.071,.028,oldMetal[4],0,side*.1);
    iron.rod(v(tx-.301,1.053,tz+side*.232),v(tx+.301,1.053,tz+side*.232),.008,oldMetal[1],6);
  }
  for(let i=0;i<105;i++){
    const x=tx+rand(rng,-.291,.30), z=tz+rand(rng,-.195,.2);
    const depth=rand(rng,.003,.016) + Math.max(0,.014-Math.hypot(x-.12,(z-tz)*2)*.08);
    earth.box(x,.997+depth*.5,z,rand(rng,.014,.053),depth,rand(rng,.012,.049),pick(rng,soilTints),rand(rng,0,TAU));
  }
  for(let i=0;i<66;i++){
    const x=rand(rng,-.08,.38), z=tz+rand(rng,.21,.296);
    earth.box(x,.973,z,rand(rng,.003,.018),rand(rng,.005,.013),rand(rng,.006,.017),pick(rng,soilTints),rand(rng,0,TAU));
  }

  clayPot(clay,earth,-.53,.971,-7.98,.148,.231,kiln[1],{filled:true,saucer:true});
  clayPot(clay,earth,.66,.97,-8.01,.103,.198,kiln[5],{filled:true});
  clayPot(clay,earth,1.76,.969,-8.02,.132,.24,kiln[6],{filled:true});
  clayPot(clay,earth,.955,.967,-8.06,.106,.194,kiln[7],{segments:24,crock:true});
  clayPot(clay,earth,1.95,.969,-7.75,.095,.137,kiln[3],{segments:18});
  clayPot(clay,earth,2.118,.967,-8.07,.103,.161,kiln[2],{segments:18});
  clayPot(clay,earth,-.65,.292,-7.91,.164,.25,kiln[2],{segments:18});
  for(let j=0;j<4;j++){
    clayPot(clay,earth,-.33+j*.205,.291,-7.85,.104+rand(rng,-.014,.017),rand(rng,.13,.177),kiln[j],{segments:16});
  }
  for(let j=0;j<5;j++) {
    const drift=j*.006;
    clayPot(clay,earth,1.93+drift,.293+j*.078,-7.93-drift,.133,.145,kiln[j+2],{segments:20});
  }
  clayPot(clay,earth,3.03,.016,-7.83,.255,.48,kiln[4],{filled:true,saucer:true,segments:24});
  clayPot(clay,earth,-2.72,.016,-7.89,.262,.51,kiln[0],{filled:true,saucer:true,segments:25});
  clayPot(clay,earth,-3.88,.022,-7.83,.15,.218,kiln[7],{segments:17});
  clayPot(clay,earth,3.64,.024,-7.99,.094,.118,kiln[5],{segments:16});
  clayPot(clay,earth,4.02,.026,-7.78,.138,.22,kiln[3],{segments:18});
  const basket=v(-3.82,2.42,-7.82);
  clayPot(clay,earth,basket.x,basket.y,basket.z,.18,.182,kiln[2],{filled:true,segments:21});
  const hang=v(-3.82,3.37,-7.87);
  for(let j=0;j<3;j++){
    const a=j*TAU/3;
    const ring=basket.clone().add(v(Math.cos(a)*.175,.15,Math.sin(a)*.175));
    const upper=hang.clone().add(v(0,-.050,0));
    iron.cord([ring,ring.clone().lerp(upper,.45).add(v(.008,-.02,.005)),upper],.0051,oldMetal[4],14,4);
  }
  iron.cord([
    hang.clone().add(v(0,-.077,0)),hang.clone().add(v(.028,-.019,0)),hang.clone().add(v(.009,.028,0)),
    hang.clone().add(v(0,.048,-.025)),
  ],.0075,oldMetal[3],14,5);
  iron.beam(v(-3.82,3.38,-8.42),v(-3.82,3.46,-7.81),.042,.051,oldMetal[1]);

  for(const [x,z,r,h,c] of [[-3.78,7.77,.135,.227,2],[3.82,7.87,.171,.302,0],[-3.03,10.92,.109,.185,7],
    [3.04,9.74,.148,.264,3],[3.13,8.68,.083,.119,5]]){
    clayPot(clay,earth,x,.018,z,r,h,kiln[c],{segments:18});
  }

  // The small propagation crate is framed by the shelf opening.
  const bx=1.33,bz=-7.88;
  wood.box(bx,.314,bz,.429,.043,.326,woodTones[3]);
  for(let j=0;j<3;j++){
    for(const s of [-1,1]){
      wood.box(bx,.357+j*.063,bz+s*.153,.439,.055,.026,woodTones[4+j],0,0,0,2,1);
      wood.box(bx+s*.215,.357+j*.063,bz,.025,.055,.296,woodTones[2+j]);
    }
  }
  for(const sx of [-1,1]) for(const sz of [-1,1]){
    wood.box(bx+sx*.195,.401,bz+sz*.131,.033,.225,.03,woodTones[0]);
  }
  for(let i=0;i<9;i++){
    const x=bx+rand(rng,-.178,.173), z=bz+rand(rng,-.111,.115);
    paper.box(x,rand(rng,.422,.492),z,.081,.009,.128,pick(rng,[chalk,woodTones[4],oldMetal[1]]),
      rand(rng,-.8,.8),rand(rng,-.27,.27),rand(rng,-.29,.29));
  }
  plate(parent,.189,.066,v(bx,.404,bz+.17),[0,0,0],{title:'SEED',style:'cream'},'Stenciled seed crate insert');

  // A galvanized watering can with a wired rose head and an open collar.
  const canX=.809, canZ=-7.88, canY=.293, canR=.154;
  profile(iron,canX,canY,canZ,[[0,0],[.132,0],[canR,.015],[canR,.205],[.145,.226],[.051,.26],
    [.052,.282],[.045,.287],[.039,.275],[.039,.24],[.122,.196],[.128,.028],[0,.022]],oldMetal[2],24);
  profile(iron,canX,canY,canZ,[[canR,.035],[canR+.007,.037],[canR+.007,.049],[canR,.051]],oldMetal[0],24);
  profile(iron,canX,canY,canZ,[[canR,.199],[canR+.006,.201],[canR+.006,.208],[canR,.211]],oldMetal[4],24);
  iron.cord([v(canX+.134,canY+.046,canZ),v(canX+.242,canY+.045,canZ),
    v(canX+.272,canY+.134,canZ),v(canX+.23,canY+.213,canZ),v(canX+.137,canY+.218,canZ)],.016,oldMetal[4],17,7);
  iron.cord([v(canX-.07,canY+.236,canZ),v(canX-.055,canY+.334,canZ),v(canX+.051,canY+.34,canZ),
    v(canX+.111,canY+.222,canZ)],.013,oldMetal[1],16,6);
  const spout=[v(canX-.12,canY+.058,canZ+.044),v(canX-.22,canY+.102,canZ+.097),
    v(canX-.28,canY+.156,canZ+.152),v(canX-.33,canY+.223,canZ+.181)];
  irregularStem(iron,spout,[.042,.030,.021,.018],oldMetal[2],rng,10);
  const rose=v(canX-.351,canY+.245,canZ+.196);
  iron.rod(spout.at(-1),rose,.041,oldMetal[0],12);
  iron.rod(rose,rose.clone().add(v(-.008,.009,.008)),.044,oldMetal[4],12);

  // A trowel with a cupped blade and a small brush.
  const frontY=.99;
  const handleA=v(1.24,frontY+.025,-7.93), handleB=v(1.46,frontY+.028,-7.77);
  wood.cord([handleA,handleA.clone().lerp(handleB,.55),handleB],.028,woodTones[1],7,9);
  iron.rod(handleA.clone().add(v(.012,0,.008)),v(1.150,frontY+.018,-7.994),.015,oldMetal[1],7);
  const center=v(1.022,frontY+.012,-8.063), l=v(1.103,frontY+.033,-8.073), r=v(1.056,frontY+.036,-7.999);
  const end=v(.940,frontY+.021,-8.117), joint=v(1.156,frontY+.014,-7.995);
  iron.surface(joint,r,center,l,oldMetal[0]);
  iron.surface(l,center,r,end,oldMetal[4]);
  iron.rod(v(1.206,frontY+.026,-7.953),v(1.223,frontY+.027,-7.941),.028,oldMetal[2],9);
  wood.box(1.75,frontY,-7.781,.255,.025,.063,woodTones[3],-.49);
  for(let i=0;i<14;i++){
    const dx=rand(rng,-.065,.061);
    little.box(1.66+dx,.978,-7.828+dx*.51,.012,.026,.028,color(0x716e4d),-.49);
  }

  // A hose on a peg by the tap. The free end lies beside the bench.
  const hoseGreen=color(0x75784c);
  const hoseFaded=color(0x8b8453);
  const cx=2.59, cy=.722, cz=-8.19;
  const coil=curvePoints(t=>{
    const angle=(t*3.36+.28)*TAU;
    const rx=.263+.029*Math.sin(angle*.57);
    return v(cx+Math.cos(angle)*rx+.020*t,cy+Math.sin(angle)*.354,cz+(t-.5)*.096);
  },98);
  rubber.cord(coil,.024,hoseGreen,117,8);
  const from=coil[0], to=coil.at(-1);
  rubber.cord([from,v(2.49,1.06,-8.17),v(2.26,1.20,-8.18),v(2.31,1.37,-8.17)],
    .023,hoseFaded,22,7);
  const free=[to,v(2.42,.508,-8.047),v(2.40,.094,-7.937),v(2.55,.035,-7.775),
    v(2.77,.036,-7.667),v(2.887,.037,-7.753)];
  rubber.cord(free,.023,hoseGreen,36,8);
  iron.rod(free.at(-1),v(2.927,.037,-7.776),.029,brass,9);
  iron.rod(v(2.927,.037,-7.776),v(2.967,.038,-7.803),.023,oldMetal[5],9);
  iron.box(cx,1.063,-8.23,.264,.062,.105,oldMetal[3]);
  iron.box(cx,.702,-8.244,.078,1.07,.073,oldMetal[1]);
  for(const h of [.31,1.11]){
    iron.box(2.927,h,-8.328,1.235,.045,.099,oldMetal[4]);
    iron.box(cx,h,-8.292,.107,.098,.052,oldMetal[2]);
  }
  iron.rod(v(2.31,.102,-8.295),v(2.31,1.546,-8.293),.032,oldMetal[4],8);
  iron.cord([v(2.31,1.53,-8.291),v(2.31,1.545,-8.20),v(2.31,1.503,-8.165),
    v(2.31,1.397,-8.161)],.036,brass,13,8);
  iron.rod(v(2.24,1.591,-8.232),v(2.38,1.591,-8.232),.018,brass,7);
  iron.rod(v(2.31,1.56,-8.232),v(2.31,1.61,-8.232),.026,bolts,7);

  wood.box(.574,1.799,-8.343,1.216,.099,.069,woodTones[3],0,0,0,2,1);
  for(const x of [.367,1.145]){
    iron.box(x,1.799,-8.293,.041,.189,.048,oldMetal[3]);
  }
  plate(parent,.95,.232,v(.76,1.80,-8.267),[.02,0,.008],
    {title:'Potting bench',subtitle:'FERNS   ·   CUTTINGS   ·   SEED',style:'green'},'Enamel potting alcove sign');
  plate(parent,.263,.081,v(-.53,1.197,-7.814),[-.39,0,.012],{title:'Asplenium',subtitle:'PROP.   06'},
    'Small propagation label');
  for(const batch of [wood,iron,clay,earth,paper,rubber,little]) batch.assemble(parent);
}

function bedDetails(parent,m) {
  const rng=seeded(990);
  const dirt=new Batch(m.soil,'Bark chips and potting mix under the foliage',{cast:false});
  const stone=new Batch(m.stone,'Gravel, broken ceramics and bed edge artifacts',{cast:false});
  const bark=new Batch(m.bark,'Fallen stems and partly buried timber');
  const clay=new Batch(m.clay,'Bed pottery and buried rims');
  const iron=new Batch(m.iron,'Label stakes and terrace boot scraper');
  for(let i=0;i<930;i++){
    const y=.313+rand(rng,-.012,.012);
    const x=rand(rng,bed.left+.13,bed.right-.12);
    const z=rand(rng,bed.back+.12,bed.front-.11);
    const piece=i%5===0?stone:dirt;
    piece.box(x,y,z,rand(rng,.012,.045),rand(rng,.007,.029),rand(rng,.016,.063),
      pick(rng,i%5===0?rubbleTints:soilTints),rand(rng,0,TAU),rand(rng,-.52,.48),rand(rng,-.23,.42));
  }
  for(let i=0;i<21;i++){
    const sx=pick(rng,[-1,1])*rand(rng,.92,1.47);
    const z=rand(rng,-5.57,5.26);
    const end=v(sx+rand(rng,-.15,.15),.333+rand(rng,0,.04),z+rand(rng,.10,.36));
    const start=v(sx,.329,z);
    irregularStem(bark,[start,start.clone().lerp(end,.6).add(v(.014,.008,.005)),end],
      [rand(rng,.012,.025),.011,.007],pick(rng,soilTints),rng,6);
  }

  clayPot(clay,dirt,-1.30,.298,3.18,.099,.137,kiln[3],{segments:16});
  clayPot(clay,dirt,1.26,.291,-1.24,.127,.157,kiln[2],{segments:17,filled:true});
  clayPot(clay,dirt,-1.30,.29,-4.96,.100,.128,kiln[6],{segments:16});
  const fragments=[
    [-1.38,.344,2.09,.19,.08],[-1.27,.327,2.17,.11,.09],
    [1.30,.368,4.82,.124,.15],[1.40,.347,4.77,.078,.08],
    [-1.13,.349,-4.93,.12,.083],[1.30,.356,-4.83,.10,.128],
  ];
  for(const [x,y,z,w,h] of fragments){
    clay.surface(v(x-w*.45,y,z-h*.45),v(x+w*.48,y+.025,z-h*.34),
      v(x+w*.15,y+.044,z+h*.48),v(x-w*.33,y+.019,z+h*.38),pick(rng,kiln));
  }

  plantTag(parent,iron,-1.44,.375,4.40,-1,'Monstera deliciosa','FERN HOUSE   ·   14',-.13);
  plantTag(parent,iron,1.46,.378,3.94,1,'Alocasia','FERN HOUSE   ·   22',.14);
  plantTag(parent,iron,-1.45,.374,-.25,-1,'Tree fern','FERN HOUSE   ·   31',.10);
  plantTag(parent,iron,1.47,.376,.88,1,'Musa','FERN HOUSE   ·   37',-.13);
  plantTag(parent,iron,-1.43,.376,-4.48,-1,'Fan palm','FERN HOUSE   ·   08',-.22);
  plantTag(parent,iron,1.43,.378,-5.29,1,'Bird’s nest fern','FERN HOUSE   ·   09',.20);
  plantTag(parent,iron,-4.01,.183,-2.56,1,'Tree fern','WEST BORDER',-.09);

  for(const z of [8.67,8.94]){
    iron.box(.03,.036,z,1.59,.028,.042,oldMetal[1]);
  }
  for(let j=0;j<28;j++){
    const x=-.73+j*.057;
    iron.box(x,.038,8.808,.021,.025,.256,oldMetal[j%oldMetal.length],rand(rng,-.012,.012));
  }
  for(let i=0;i<70;i++){
    const x=pick(rng,[-1,1])*rand(rng,3.4,3.89);
    const z=rand(rng,8.42,11.45);
    const size=rand(rng,.03,.087);
    stone.box(x,-.142,z,size,rand(rng,.030,.064),size*rand(rng,.63,1.24),
      pick(rng,rubbleTints),rand(rng,0,TAU),rand(rng,-.5,.52),rand(rng,-.31,.33));
  }

  // A section of old brick enclosure beyond the rear window.
  for(const [axis,coordinates,s] of [
    ['x',[-7.48,-10.90,7.62,-10.90],1],
    ['z',[-7.48,-10.90,-7.48,4.80],-1],
    ['z',[7.62,-10.90,7.62,5.53],1],
  ]){
    const [x0,z0,x1,z1]=coordinates;
    const length=Math.hypot(x1-x0,z1-z0);
    const n=Math.ceil(length/.55);
    const grow=axis==='z';
    for(let j=0;j<5;j++){
      for(let i=0;i<n;i++){
        const t=(i+.5+(j%2?.21:-.16))/n;
        const brickShade=pick(rng,rubbleTints).clone().lerp(color(0x777b5d),rand(rng,.34,.72));
        stone.box(mix(x0,x1,t),.008+j*.184+rand(rng,-.007,.009),mix(z0,z1,t),
          grow?.26:length/n-.017,.169,grow?length/n-.017:.26,brickShade,rand(rng,-.021,.021));
      }
    }
    stone.box((x0+x1)*.5,.876,(z0+z1)*.5,grow?.32:length,.112,grow?length:.31,
      color(s===1?0x7e8067:0x757c61));
  }
  for(const batch of [dirt,stone,bark,clay,iron]) batch.assemble(parent);
}

export function buildCraft(scene, materials) {
  const group=new T.Group();
  group.name='Signage, gardening equipment and accumulated debris';
  scene.add(group);
  potting(group,materials);
  bedDetails(group,materials);
}

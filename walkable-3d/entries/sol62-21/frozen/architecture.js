'use strict';

const Architecture = (() => {
  const {wood, endgrain, stone, mortar, iron, glass, plain, plaque, tint, blend, add, mul, rotate} = Ward;
  const {rand,pick,frame,faceRect,patch,stonePiece,wall,flags,planks,arch,nail,band,paintedBoard,
    oakColors,barnOak,brickColors,ashColors,floorColors,ironDark,ironEdge,bronze,blackOak} = Craft;

  function entranceDoor(mesh) {
    const f=frame(1.07,4.69,-1,0);
    patch(mesh,f,.055,.02,2.05,2.50,-.04,'#342a23',stone);
    for (let i=0;i<8;i++) {
      const x=.185+i*.218;
      mesh.beam(f.point(x,.026,.025),f.point(x,2.33,.025),.211,.115,pick(barnOak),wood,.012);
    }
    for (const x of [.065,1.843]) {
      mesh.beam(f.point(x,.029,.098),f.point(x,2.36,.098),.168,.19,blackOak,wood,.023);
      for (const y of [.31,2.075]) nail(mesh,f.point(x,y,.198),f.normal,.032);
    }
    for (const y of [2.39,2.53]) mesh.beam(f.point(-.09,y,.096),f.point(2.02,y,.096),.20,y===2.39?.18:.087,pick(barnOak),wood,.023);
    for (const y of [.48,1.95]) {
      band(mesh,f,.105,1.04,y,.119,.098,ironDark,4);
      mesh.cyl(f.point(.125,y-.112,.132),f.point(.125,y+.112,.132),.045,.046,ironEdge,iron,9);
    }
    const clasp=f.point(1.53,1.08,.148);
    mesh.box(f.point(1.55,1.095,.095),[.23,.31,.06],ironDark,iron);
    mesh.ring(add(clasp,[0,-.066,0]),f.normal,.070,.013,bronze,iron,13);
    nail(mesh,f.point(1.55,1.168,.155),f.normal,.028,bronze);
    nail(mesh,f.point(1.55,.988,.155),f.normal,.018,bronze);
    mesh.beam(f.point(1.00,1.355,.108),f.point(1.89,1.355,.108),.07,.094,'#6e4c32',wood,.01);
  }
  function window(mesh) {
    const f=frame(-3.52,3.43,0,-1);
    patch(mesh,f,-.08,.77,1.33,2.28,.014,'#655b52',stone);
    patch(mesh,f,.055,.94,1.205,2.17,.043,'#303437',iron);
    const paneY=[1.035,1.59], paneX=[.18,.68];
    for (let j=0;j<2;j++) for (let i=0;i<2;i++) {
      const u=paneX[i],v=paneY[j];
      faceRect(mesh,f,u,v,u+.455,v+.51,.078,i+j===1?'#91acad':'#77959d',glass,.50);
      mesh.face([f.point(u+.03,v+.10,.080),f.point(u+.07,v+.13,.080),f.point(u+.423,v+.43,.080),
        f.point(u+.407,v+.456,.080)],'#a8c6c0',glass,undefined,.3);
      for (const [pa,pb] of [
        [[u+.22,v],[u+.455,v+.26]],[[u+.455,v+.26],[u+.22,v+.51]],
        [[u+.22,v+.51],[u,v+.26]],[[u,v+.26],[u+.22,v]]
      ]) mesh.beam(f.point(...pa,.092),f.point(...pb,.092),.013,.016,'#52504a',iron,.003);
    }
    for (const u of [.127,.656,1.16]) mesh.beam(f.point(u,.99,.132),f.point(u,2.145,.132),.14,.08,'#554135',wood,.012);
    for (const y of [1.016,1.567,2.126]) mesh.beam(f.point(.085,y,.121),f.point(1.216,y,.121),.13,.072,'#604c39',wood,.012);
    mesh.beam(f.point(-.12,.89,.205),f.point(1.35,.89,.205),.45,.142,'#837362',stone,.047);
    mesh.beam(f.point(-.11,2.236,.15),f.point(1.34,2.236,.15),.22,.125,'#8d7f6c',stone,.024);
    for (const u of [.022,1.248]) {
      mesh.beam(f.point(u,.949,.151),f.point(u,2.17,.151),.132,.139,'#796756',stone,.037);
    }
  }
  function portalFrame(mesh) {
    for (const x of [.22,1.98]) {
      const color=x<1?'#624836':'#59422f';
      mesh.beam([x,.03,-.52],[x,2.31,-.52],.46,.182,color,wood,.025);
      mesh.box([x,.092,-.51],[.22,.17,.485],'#6e6456',stone);
      for (const z of [-.284,-.756]) {
        const n=[0,0,z>-.5?1:-1];
        for (const y of [.38,1.98]) nail(mesh,[x,y,z],n,.041,ironDark);
      }
    }
    mesh.beam([.01,2.27,-.53],[2.19,2.27,-.53],.55,.226,'#73513a',wood,.036);
    mesh.beam([-.10,2.423,-.53],[2.27,2.423,-.53],.55,.102,'#5b4534',wood,.021);
    mesh.beam([.239,.017,-.52],[1.96,.017,-.52],.47,.052,'#797063',stone,.022);
    for (const x of [.35,1.85]) for (const z of [-.244,-.812]) nail(mesh,[x,2.29,z],[0,0,z>-.5?1:-1],.043,'#514d45');
  }
  function bedroom(scene) {
    const shell=scene.group('room');
    wall(shell,frame(-3.45,-.38,1,0),6.9,3.15,{
      cuts:[{l:3.71,r:5.39,high:2.23}], both:true, depth:.34, row:.405, block:.83,palette:brickColors
    });
    wall(shell,frame(3.44,4.93,-1,0),6.89,3.17,{block:.89,soot:.24,palette:ashColors});
    wall(shell,frame(3.45,-.4,0,1),5.34,3.16,{block:.88,row:.394});
    wall(shell,frame(-3.45,4.94,0,-1),5.34,3.16,{
      block:.83,row:.395,cuts:[{l:1.52,r:2.74,low:.94,high:2.15}]
    });
    const floor=scene.group('room');
    planks(floor,-3.49,3.48,-.61,4.94,.012);
    const overhead=scene.group('room');
    for(let i=0;i<20;i++){
      const x=-3.37+i*.349;
      overhead.beam([x,3.137,-.77],[x,3.137,4.98],.333,.076,pick(barnOak),wood,.005);
    }
    for (const z of [-.24,1.25,2.76,4.24]) {
      overhead.beam([-3.53,2.964,z],[3.53,2.964,z],.224,.226,'#634934',wood,.027);
      for (const x of [-3.13,3.13]) for (const shift of [-.038,.038])
        nail(overhead,[x,2.845,z+shift],[0,-1,0],.032,ironDark);
    }
    for (const x of [-3.26,3.26]) {
      overhead.beam([x,2.95,-.40],[x,2.95,4.91],.202,.225,'#5c4130',wood,.023);
      overhead.beam([x,.104,-.33],[x,.104,4.88],.102,.172,'#604833',wood,.012);
    }
    entranceDoor(shell);
    window(shell);
    portalFrame(shell);
    const caseBeam='#6f523d';
    for (const [x,z] of [[-3.286,-.20],[-3.28,4.65],[3.279,-.25],[3.28,4.67]]) {
      shell.beam([x,.055,z],[x,3.006,z],.193,.201,caseBeam,wood,.027);
      shell.box([x,.105,z],[.25,.186,.25],'#7b6f61',stone);
    }
  }

  function passage(scene) {
    const shell=scene.group('tack');
    wall(shell,frame(-1.72,-.695,0,-1),4.94,3.24,{block:.83,row:.38,palette:ashColors});
    wall(shell,frame(2.52,-5.63,0,1),4.96,3.24,{block:.87,row:.38,palette:ashColors});
    flags(shell,[-1.7,2.52,-5.89,-.73],{width:.80,depth:.65,palette:floorColors,y:.009,gap:.021});
    for (let i=0;i<13;i++) {
      const x=-1.575+i*.327;
      shell.beam([x,3.21,-.68],[x,3.21,-5.67],.313,.084,pick(barnOak),wood,.006);
    }
    for (const z of [-.96,-2.15,-3.73,-5.24]) {
      shell.beam([-1.74,3.067,z],[2.56,3.067,z],.192,.196,blackOak,wood,.017);
      for (const x of [-1.52,2.30]) nail(shell,[x,2.959,z],[0,-1,0],.036,ironEdge);
    }
    for (const x of [-1.55,2.36]) {
      shell.beam([x,3.076,-.68],[x,3.076,-5.53],.16,.17,'#513f31',wood,.016);
      shell.beam([x,.103,-.72],[x,.103,-5.53],.108,.135,'#5d4837',wood,.013);
    }
    // A broad, low sill runs through the masonry aperture at the same walking level.
    shell.beam([-.90,.014,-5.83],[1.55,.014,-5.83],.77,.064,'#827468',stone,.035);
    for (const x of [-.71,-.31,.085,.48,.89,1.29])
      shell.box([x,.049,-5.84],[.012,.006,.66],'#6d6155',stone);
  }

  function support(mesh,x,z,variant) {
    const tone=x<0?'#766355':'#786b60';
    mesh.box([x,.134,z],[1.42,.269,1.47],'#65594d',stone);
    mesh.box([x,.365,z],[1.25,.21,1.30],tone,stone);
    mesh.box([x,.536,z],[1.12,.143,1.167],'#867464',stone);
    let y=.61;
    for (let i=0;i<10;i++) {
      const h=rand(.38,.44);
      const color=blend(pick(ashColors),tone,.55);
      const shifts=i%2 ? [.087,-.068] : [0,0];
      mesh.box([x+shifts[0],y+h*.5,z+shifts[1]],[.939,h-.026,.91], '#574a40',mortar);
      const fs=x<0 ? frame(x+.505,z+.445,0,-1) : frame(x-.505,z-.445,0,1);
      const front=frame(x-.462,z+.462,1,0), back=frame(x+.462,z-.462,-1,0);
      stonePiece(mesh,fs,.003,y+.011,.89,y+h-.013,.057,color);
      stonePiece(mesh,front,.007,y+.012,.916,y+h-.016,.038,tint(color,.97));
      stonePiece(mesh,back,.008,y+.012,.91,y+h-.014,.038,tint(color,.9));
      y+=h;
    }
    mesh.box([x,4.80,z],[1.133,.22,1.14],tone,stone);
    mesh.box([x,4.995,z],[1.355,.184,1.29],'#827264',stone);
    mesh.box([x,5.128,z],[1.467,.108,1.40],variant===2?'#8a7463':'#8b7d6e',stone);
  }
  function vault(scene) {
    const zList=[-6.13,-9.83,-13.53,-17.20,-19.41];
    for (let bay=0;bay<zList.length-1;bay++) {
      const cap=scene.group(bay===0?'roostNear':bay===3?'roostBack':'roostMid');
      const z0=zList[bay],z1=zList[bay+1];
      const rows=Math.ceil((z0-z1)/.62);
      for (let row=0;row<rows;row++) {
        const u=z0+(z1-z0)*row/rows, v=z0+(z1-z0)*(row+1)/rows;
        arch(cap,{spring:5.05,rx:8.26,ry:3.20,thick:.14,zFront:u,depth:u-v+.006,
          count:32+(row%2),palette:ashColors,gap:.0014,shade:.74,bevel:.007,masonry:false});
      }
    }
    const ribs=scene.group('roostMid'), footingShadows=scene.group('roostMid',true);
    [-6.61,-9.92,-13.62,-17.30,-18.81].forEach((z,i)=>{
      const m=i<2?scene.group('roostNear'):i>=3?scene.group('roostBack'):ribs;
      const depth=i===0 || i===4?.47:.59;
      const r=i===2?.59:.48;
      arch(m,{spring:5.11,rx:7.29,ry:2.52,thick:r,zFront:z+depth*.5,depth,
        count:25,palette:ashColors,gap:.004,shade:i<2?.96:.88,bevel:.045});
      for (const x of [-7.61,7.61]) {
        support(m,x,z,i);
        footingShadows.decal([x-Math.sign(x)*.26,.024,z+.07],2.52,2.14,.53,Math.sign(x)*.16);
      }
    });
  }

  function roost(scene) {
    const fore=scene.group('roostNear'), rear=scene.group('roostBack');
    wall(fore,frame(8.24,-5.99,-1,0),16.48,8.32,{
      cuts:[{l:6.75,r:9.085,spring:2.02,high:2.78}],both:true,depth:.45,
      row:.49,block:1.31,palette:ashColors,soot:.22,relief:.08
    });
    wall(rear,frame(-8.28,-19.40,1,0),16.56,8.34,
      {block:1.35,row:.50,palette:ashColors,soot:.42,relief:.082});
    for (const [a,b,zone] of [[-5.97,-10.13,'roostNear'],[-10.13,-14.49,'roostMid'],[-14.49,-19.45,'roostBack']]) {
      const sides=scene.group(zone);
      wall(sides,frame(-8.26,a,0,-1),a-b,5.20,{block:1.40,row:.505,palette:ashColors,soot:.45,relief:.095});
      wall(sides,frame(8.26,b,0,1),a-b,5.20,{block:1.45,row:.505,palette:ashColors,soot:.32,relief:.088});
      for (const x of [-8.11,8.11]) sides.beam([x,.183,a],[x,.183,b],.30,.34,
        x<0?'#645346':'#6a6055',stone,.059);
      const floor=scene.group(zone);
      if (zone === 'roostNear') {
        flags(floor,[-8.28,-.89,b,a],{width:1.28,depth:1.08,wear:.25});
        flags(floor,[-.89,2.38,b,a],{width:.94,depth:1.04,y:.013,gap:.026,
          palette:['#84766b','#786d61','#8c7c69','#7d6e63','#847a71']});
        flags(floor,[2.38,8.29,b,a],{width:1.25,depth:.95});
      } else flags(floor,[-8.29,8.29,b,a],{width:1.44,depth:1.09,wear:.18});
    }
    for (const x of [-1.01,1.658]) {
      for (let i=0;i<5;i++) {
        const w=i===0?.455:.343;
        fore.box([x,.224+i*.403,-5.87],[w,.397,.856],pick(brickColors),stone);
      }
      fore.box([x,2.026,-5.87],[.434,.158,.959],'#8c7864',stone);
      fore.box([x,.147,-6.00],[.51,.279,1.00],'#746759',stone);
    }
    arch(fore,{cx:.325,spring:2.032,rx:1.166,ry:.737,thick:.306,zFront:-5.405,depth:.885,count:13,
      palette:brickColors,gap:.008,bevel:.038});
    const roostSide=frame(0,-6.138,-1,0);
    paintedBoard(fore,roostSide,-.876,3.04,.228,3.60,.043,plaque);
    const tackSide=frame(0,-5.392,1,0);
    paintedBoard(scene.group('tack'),tackSide,-.185,2.835,.834,3.053,.021,plaque);
    vault(scene);
  }

  return {bedroom,passage,roost};
})();


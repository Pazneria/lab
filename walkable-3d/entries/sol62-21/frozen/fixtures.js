'use strict';

const Fixtures = (() => {
  const {wood,endgrain,stone,mortar,iron,glass,cloth,leather,straw,paper,plain,embers,note,chart,ledger,mug,
    chalk,TAU,clamp,mix,add,mul,rotate,unit,sub,tint,blend} = Ward;
  const {random,rand,pick,frame,faceRect,patch,slab,nail,band,chain,paintedBoard,brazierLamp,
    oakColors,barnOak,floorColors,bronze,ironDark,ironEdge,blackOak} = Craft;

  function vessel(mesh,x,y,z,profile,color,material,sides=16,em=0) {
    const vertices=profile.map(([r,h])=>
      Array.from({length:sides},(_,i)=>[x+r*Math.cos(i*TAU/sides),y+h,z-r*Math.sin(i*TAU/sides)])
    );
    for (let k=0;k<vertices.length-1;k++) for (let i=0;i<sides;i++) {
      const j=(i+1)%sides;
      const a=vertices[k],b=vertices[k+1];
      const u=i/sides,v=(i+1)/sides;
      const h0=profile[k][1], h1=profile[k+1][1];
      const scale=material===mug?1/profile.at(-1)[1]:1.6;
      const uv=[[u,h0*scale],[v,h0*scale],[v,h1*scale],[u,h1*scale]];
      const p=[a[i],a[j],b[j],b[i]];
      if (profile[k][0]<.0001) mesh.face(p.slice(1),color,material,uv.slice(1),em);
      else if (profile[k+1][0]<.0001) mesh.face(p.slice(0,3),color,material,uv.slice(0,3),em);
      else mesh.face(p,color,material,uv,em);
    }
  }
  function cup(mesh,x,y,z,scale=1) {
    const profile=[[.00,0],[.062,0],[.072,.019],[.084,.113],[.083,.127],[.073,.129],[.071,.113],[.056,.021],[0,.019]]
      .map(([r,h])=>[r*scale,h*scale]);
    vessel(mesh,x,y,z,profile,'#eee0c7',mug,18);
    mesh.ring([x+.083*scale,y+.070*scale,z],[0,0,1],.045*scale,.012*scale,'#978064',stone,14,6);
    mesh.cyl([x,y+.029*scale,z],[x,y+.031*scale,z],.050*scale,.057*scale,'#62492e',leather,14);
  }
  function jar(mesh,x,y,z,s,color,cap='#635142') {
    const p=[[0,0],[.091,0],[.11,.038],[.112,.118],[.093,.172],[.056,.195],[.054,.236],[.042,.239],[0,.222]]
      .map(([r,h])=>[r*s,h*s]);
    vessel(mesh,x,y,z,p,color,stone,12);
    mesh.cyl([x,y+.216*s,z],[x,y+.263*s,z],.044*s,.055*s,cap,endgrain,12);
    if (s>.90) {
      const f=frame(x,z+.11*s,1,0);
      faceRect(mesh,f,-.045*s,y+.049*s,.045*s,y+.123*s,.001,'#ae9876',paper);
      for (const yy of [.067,.079,.094]) faceRect(mesh,f,-.029*s,y+yy*s,.019*s,y+(yy+.004)*s,.002,'#695544',plain);
    }
  }
  function candle(mesh,x,y,z,h=.168) {
    vessel(mesh,x,y,z,[[0,0],[.13,0],[.139,.018],[.117,.027],[.071,.032],[.044,.046],[0,.046]],bronze,iron,14);
    mesh.cyl([x,y+.034,z],[x,y+.034+h,z],.039,.047,'#ddd0a8',stone,11);
    for (let i=0;i<5;i++) {
      const t=i*TAU/5;
      mesh.ellipse([x+Math.cos(t)*.042,y+.034+h-rand(.022,.068),z+Math.sin(t)*.04],
        [.009,rand(.021,.043),.011],'#e2d3ac',stone,7,4);
    }
    const top=y+.034+h;
    mesh.beam([x,top-.008,z],[x+.004,top+.031,z+.003],.007,.008,'#524234',plain,.002);
    mesh.ellipse([x+.009,top+.061,z],[.020,.052,.019],'#ffa541',embers,10,7,.83,0,3.8);
    mesh.ellipse([x+.009,top+.046,z+.004],[.012,.027,.012],'#ffe1a0',plain,9,5,.86,0,4.1);
  }
  function rug(mesh,x,z,w,l) {
    const left=x-w/2,right=x+w/2,front=z+l/2,back=z-l/2,y=.028;
    const rect=(a,b,c,d,yy,col)=>mesh.face([[a,yy,d],[c,yy,d],[c,yy,b],[a,yy,b]],col,cloth);
    rect(left,back,right,front,y,'#735243');
    rect(left+.055,back+.06,right-.055,front-.06,y+.0012,'#b18556');
    rect(left+.102,back+.12,right-.102,front-.12,y+.0025,'#584b40');
    rect(left+.14,back+.165,right-.14,front-.165,y+.0037,'#8b5d46');
    for (const dx of [left+.185,right-.185])
      rect(dx-.013,back+.19,dx+.013,front-.19,y+.0044,'#bc9568');
    for (const zz of [back+.232,front-.232])
      rect(left+.16,zz-.014,right-.16,zz+.014,y+.0044,'#be996d');
    for (let j=0;j<5;j++) for (let i=0;i<3;i++) {
      const ox=x+(i-1)*w*.235, oz=z+(j-2)*l*.148;
      const s=.101*(i===1?1.25:1), h=.155;
      mesh.face([[ox,y+.0054,oz+h],[ox+s,y+.0054,oz],[ox,y+.0054,oz-h],[ox-s,y+.0054,oz]],
        i===1?'#b99061':'#6f7564',cloth);
      mesh.face([[ox,y+.0063,oz+h*.6],[ox+s*.57,y+.0063,oz],[ox,y+.0063,oz-h*.6],[ox-s*.57,y+.0063,oz]],
        '#754d3e',cloth);
    }
    for (const side of [-1,1]) for (let i=0;i<33;i++) {
      const xx=left+.023+i*(w-.044)/32,zz=z+side*l/2;
      mesh.face([[xx-.007,y,zz-side*.012],[xx+.007,y,zz-side*.012],[xx+rand(-.015,.015),y-.005,zz+side*rand(.037,.083)]],
        pick(['#a1835e','#b59870','#8d7157']),cloth,undefined,0,[[0,1,0],[0,1,0],[0,1,0]]);
    }
  }
  function bed(mesh,shadows) {
    const x=2.37,z=1.74,l=.60,h=2.88;
    shadows.decal([x,.024,z],1.82,2.75,.75);
    for (const xx of [x-.617,x+.617]) for (const zz of [l,h]) {
      const top=zz<1?1.41:.86;
      mesh.beam([xx,.037,zz],[xx,top,zz],.136,.136,'#79573e',wood,.017);
      mesh.cyl([xx,top-.012,zz],[xx,top+.045,zz],.083,.054,'#866343',endgrain,10);
      mesh.cyl([xx,top+.037,zz],[xx,top+.073,zz],.054,.027,'#987552',wood,9);
      for (const y of [.426,.589]) nail(mesh,[xx,y,zz+(zz<1?-.075:.075)],[0,0,zz<1?-1:1],.026);
    }
    for (const xx of [x-.615,x+.615]) {
      mesh.beam([xx,.436,l],[xx,.436,h],.105,.237,'#775339',wood,.022);
      mesh.beam([xx,.548,l+.073],[xx,.548,h-.056],.105,.045,'#997453',wood,.010);
    }
    for (const zz of [l,h]) mesh.beam([x-.645,.441,zz],[x+.645,.441,zz],.139,.231,'#805b42',wood,.023);
    for (const y of [.72,1.287]) mesh.beam([x-.646,y,l],[x+.646,y,l],.122,.141,'#7d593c',wood,.019);
    for (let i=0;i<6;i++) {
      const xx=x-.493+i*.197;
      mesh.beam([xx,.562,l],[xx,1.26,l],.189,.067,pick(oakColors),wood,.015);
    }
    mesh.beam([x-.647,.690,h],[x+.647,.690,h],.115,.098,'#917053',wood,.023);
    for (let i=0;i<12;i++) {
      const zz=.73+i*.181;
      mesh.beam([x-.59,.485,zz],[x+.59,.485,zz],.117,.061,pick(oakColors),wood,.006);
    }
    mesh.ellipse([x,.626,z],[.622,.135,1.071],'#bdb09a',cloth,28,10,.32);
    mesh.ellipse([x,.782,.966],[.475,.083,.273],'#d0c2a7',cloth,28,11,.39,-.045);
    mesh.ellipse([x-.277,.829,.926],[.029,.015,.014],'#a79882',cloth,8,5);
    mesh.ellipse([x+.246,.829,.908],[.029,.015,.014],'#aa9b84',cloth,8,5);
    const uStep=24,vStep=23;
    const blanketColor='#617368', binding='#a79571';
    function drape(u,v,offset=0) {
      const slope=Math.max(0,Math.abs(u)-.85)/.15;
      const tail=Math.max(0,v-.88)/.12;
      const fuzz=Math.sin(u*13+v*7)*.009+Math.cos(u*20-v*4)*.005+Math.cos(v*29+u*4)*.006;
      return [x+u*(.653+.018*Math.sin(v*7)),.777+fuzz-.266*slope*slope-.113*tail*tail+offset,
        1.237+v*1.586+.02*Math.sin(u*8)*(v>.84 ? .9:.4)];
    }
    for (let j=0;j<vStep;j++) for (let i=0;i<uStep;i++) {
      const u0=i/uStep*2-1,u1=(i+1)/uStep*2-1,v0=j/vStep,v1=(j+1)/vStep;
      const b=j===0 || j>=vStep-2 || i===0 || i===uStep-1;
      const patchColor=i>=13&&i<=15&&j>=14&&j<=17?'#8c8269':blanketColor;
      const color=b?binding:tint(patchColor,(i%6===2 ? .89:1)*(j%5===2 ? .91:1)*rand(.95,1.055));
      mesh.face([drape(u0,v1),drape(u1,v1),drape(u1,v0),drape(u0,v0)],color,cloth,
        [[u0,v1*2],[u1,v1*2],[u1,v0*2],[u0,v0*2]]);
    }
    for (const u of [-.917,-.58,.02,.60,.917]) for (let i=0;i<39;i++) {
      const v=.028+i*.0235;
      mesh.beam(drape(u,v,.005),drape(u,v+.011,.005),.006,.004,
        u>.90||u<-.90?'#bfac86':'#8d9380',cloth,.001);
    }
    for (let i=0;i<21;i++) {
      const u=-.88+i*.084;
      const a=drape(u,.943,.007),b=drape(u+.025,.959,.007),c=drape(u+.048,.945,.007);
      mesh.cord([a,b,c],.0043,'#d3b78b',cloth,4);
    }
  }
  function chest(mesh,x,z,w,d,h,yaw=0) {
    const p=(a,b,c)=>add([x,0,z],rotate([a,b,c],yaw));
    mesh.box(p(0,h*.47,0),[w*.96,h*.86,d*.97],'#594232',wood,yaw,0,'x');
    const layers=4;
    for (let i=0;i<layers;i++) {
      const zz=-d*.48+(i+.5)*d*.96/layers;
      mesh.beam(p(-w*.51,h+.018-Math.abs(zz)*.17,zz),p(w*.51,h+.018-Math.abs(zz)*.17,zz),
        d/layers-.007,.078,pick(oakColors),wood,.016);
    }
    for (const xx of [-w*.35,w*.35]) {
      mesh.box(p(xx,h*.525,d*.493),[.092,h*.87,.028],ironDark,iron,yaw);
      mesh.box(p(xx,h+.061,0),[.092,.028,d*.99],ironDark,iron,yaw);
      for (const yy of [.092,h*.7]) nail(mesh,p(xx,yy,d*.515),rotate([0,0,1],yaw),.023,ironEdge);
      for (const zz of [-d*.30,d*.30]) nail(mesh,p(xx,h+.080,zz),[0,1,0],.021,ironEdge);
    }
    mesh.box(p(0,h*.64,d*.508),[.143,.172,.039],bronze,iron,yaw);
    nail(mesh,p(0,h*.61,d*.541),rotate([0,0,1],yaw),.022,'#40352b');
    mesh.ring(p(0,h*.73,d*.536),rotate([0,0,1],yaw),.047,.009,'#af8954',iron,12);
  }
  function stool(mesh,x,z,b=.41,s=1) {
    const c='#84664a';
    mesh.cyl([x,b-.068,z],[x,b,z],.205*s,.221*s,c,wood,13);
    mesh.cyl([x,b,z],[x,b+.018,z],.22*s,.198*s,'#967456',endgrain,13);
    for (let i=0;i<3;i++) {
      const a=i*TAU/3+.22,rx=Math.cos(a),rz=Math.sin(a);
      mesh.beam([x+rx*.191*s,.024,z+rz*.191*s],[x+rx*.127*s,b-.047,z+rz*.127*s],.048,.055,pick(oakColors),wood,.009);
    }
    mesh.ring([x,.161,z],[0,1,0],.139*s,.013,'#5a4b3d',wood,14,6);
  }
  function tabletop(mesh,x,z,y,w,d) {
    for (const zz of [z-d*.43,z+d*.43]) {
      for (const xx of [x-w*.43,x+w*.43]) {
        mesh.beam([xx,.023,zz],[xx,y-.027,zz],.107,.106,pick(oakColors),wood,.014);
        nail(mesh,[xx,y-.126,zz+(zz>z?.058:-.058)],[0,0,zz>z?1:-1],.016);
      }
      mesh.beam([x-w*.46,y-.137,zz],[x+w*.46,y-.137,zz],.086,.183,'#74553e',wood,.014);
    }
    for (const xx of [x-w*.43,x+w*.43]) {
      mesh.beam([xx,y-.135,z-d*.42],[xx,y-.135,z+d*.42],.063,.141,'#6d4e39',wood,.011);
      mesh.beam([xx,.159,z-d*.44],[xx,.159,z+d*.44],.069,.074,'#674c37',wood,.010);
    }
    for (let i=0;i<4;i++) {
      const xx=x-w*.5+(i+.5)*w/4;
      mesh.beam([xx,y-.037,z-d/2],[xx,y-.037,z+d/2],w/4-.004,.079,pick(oakColors),wood,.013);
    }
  }
  function horizontalImage(mesh,x,y,z,w,l,yaw,material) {
    const points=[[-w/2,0,l/2],[w/2,0,l/2],[w/2,0,-l/2],[-w/2,0,-l/2]].map(p=>add([x,y,z],rotate(p,yaw)));
    mesh.face(points,'#ffffff',material,[[0,0],[1,0],[1,1],[0,1]]);
  }
  function desk(mesh,shadows) {
    const x=-2.713,z=.813,y=.858;
    shadows.decal([x,.026,z],1.28,2.16,.65);
    tabletop(mesh,x,z,y,.91,1.84);
    const xx=x+.074, zz=z+.157,yaw=Math.PI/2-.12;
    mesh.box([xx,y+.026,zz],[.484,.048,.327],'#5f4231',leather,yaw);
    mesh.box([xx,y+.054,zz],[.459,.021,.306],'#c5b485',paper,yaw);
    horizontalImage(mesh,xx,y+.066,zz,.456,.305,yaw,ledger);
    candle(mesh,x-.241,y+.005,z-.515,.147);
    cup(mesh,x+.235,y+.006,z-.582,1);
    jar(mesh,x-.262,y+.003,z+.715,.47,'#514c4b','#947052');
    const ink=[x-.05,y+.005,z+.561];
    mesh.cyl(ink,add(ink,[0,.048,0]),.036,.042,'#50514b',glass,10);
    mesh.ring(add(ink,[0,.050,0]),[0,1,0],.032,.006,'#6f6c5a',iron,12);
    mesh.cyl(add(ink,[0,.046,0]),add(ink,[0,.047,0]),.022,.022,'#292c2e',glass,10);
    const quillA=[x+.15,y+.022,z+.512],quillB=[x+.373,y+.039,z+.724];
    mesh.beam(quillA,quillB,.009,.008,'#978160',wood,.003);
    mesh.face([quillA,[x+.303,y+.034,z+.655],quillB,[x+.346,y+.028,z+.559]],'#c8ba9b',cloth,undefined,0,
      [[0,1,0],[0,1,0],[0,1,0],[0,1,0]]);
    for (let i=0;i<3;i++) {
      const xx=x-.22+rand(-.038,.04),zz=z-.12+rand(-.042,.038);
      mesh.box([xx,y+.015+i*.009,zz],[.275,.008,.174],'#ba9d76',paper,rand(-.4,.4));
    }
    const token=[x-.113,y+.023,z-.281];
    mesh.ellipse(token,[.054,.017,.034],'#65776a',iron,10,6,.58,.41);
    const f=frame(-3.36,.57,0,-1);
    paintedBoard(mesh,f,-.329,1.093,.106,1.493,.051,note);
    for (const p of [[-3.21,1.84,-.13],[-3.21,1.84,1.215]]) {
      mesh.beam(add(p,[0,-.25,0]),add(p,[.36,0,0]),.044,.043,'#6f533c',wood,.006);
    }
    mesh.beam([-3.155,1.87,-.22],[-3.155,1.87,1.33],.38,.064,'#82654d',wood,.012);
    for (let i=0;i<4;i++) {
      const zz=.17+i*.13;
      mesh.box([-3.237,2.016,zz],[rand(.23,.28),rand(.24,.29),.085],
        pick(['#56453c','#785847','#4d5d5a','#796b51']),leather,rand(-.06,.06));
      mesh.box([-3.096,2.021,zz],[.01,.187,.064],'#a9916c',paper);
    }
    jar(mesh,-3.142,1.90,.98,.78,'#887460');
    jar(mesh,-3.172,1.90,1.16,.9,'#6d7667');
    brazierLamp(mesh,-2.58,2.24,-.13,.65,'#716250','#ffc979');
    mesh.beam([-3.331,2.54,-.13],[-2.58,2.54,-.13],.041,.041,ironDark,iron,.006);
    mesh.cord([[-2.58,2.54,-.13],[-2.58,2.45,-.13]],.011,ironEdge,iron);
    stool(mesh,-1.79,.89,.437);
  }
  function clothing(mesh,shadows) {
    const f=frame(3.42,.23,0,1);
    patch(mesh,f,-.08,1.635,1.12,1.80,.045,'#725540',wood);
    for (const z of [.07,.39,.79]) {
      mesh.cyl(f.point(z,1.723,.065),f.point(z,1.749,.161),.027,.031,'#9a7753',wood,9);
    }
    const u0=.35;
    function fold(u,v) {
      const sw=.11+.168*v,y=1.713-v*1.041;
      return f.point(u0+(u-.5)*2*sw+.02*Math.sin(v*8),y,.175+Math.sin(u*18+v*3)*.033+.03*v);
    }
    for (let j=0;j<13;j++) for (let i=0;i<14;i++) {
      const a=i/14,b=(i+1)/14,c=j/13,d=(j+1)/13;
      mesh.face([fold(a,d),fold(b,d),fold(b,c),fold(a,c)],
        tint(j===12?'#89806c':'#5e6c61',rand(.87,1.14)),cloth);
    }
    mesh.cord([f.point(.80,1.734,.16),f.point(.693,1.376,.202),
      f.point(.799,1.246,.231),f.point(.958,1.373,.238),f.point(.819,1.727,.16)],.015,'#8f6847',leather);
    mesh.ellipse(f.point(.818,1.171,.208),[.096,.16,.18],'#795638',leather,16,8,.45,.06);
    const satchel=frame(3.11,1.31,0,1);
    faceRect(mesh,satchel,-.19,1.173,.16,1.293,.044,'#9b7452',leather);
    nail(mesh,satchel.point(-.018,1.186,.052),satchel.normal,.019,bronze);
    const benchX=-2.824,benchZ=3.54;
    tabletop(mesh,benchX,benchZ,.445,.53,.92);
    shadows.decal([benchX,.027,benchZ],.93,1.15,.7);
    for (const z of [benchZ-.18,benchZ+.104]) {
      mesh.ellipse([benchX+.081,.18,z],[.112,.13,.087],'#584438',leather,12,7,.45);
      mesh.ellipse([benchX+.17,.065,z],[.165,.055,.09],'#634a38',leather,12,6,.49);
      mesh.ellipse([benchX+.075,.30,z],[.061,.009,.055],'#332b26',cloth,10,5);
    }
    const sack=[-2.805,.382,3.441];
    mesh.ellipse(add(sack,[0,.16,0]),[.193,.133,.278],'#8b7861',cloth,14,7,.57,.11);
    const bedSide=frame(3.42,2.56,0,1);
    const nailPos=bedSide.point(.46,1.97,.14);
    nail(mesh,nailPos,bedSide.normal,.022,ironDark);
    mesh.cord([bedSide.point(.39,1.721,.14),nailPos,bedSide.point(.54,1.719,.14)],.007,'#9a7956',leather);
    paintedBoard(mesh,bedSide,.29,1.386,.64,1.748,.14,note);
  }
  function bedroom(scene) {
    const form=scene.group('room'), stuff=scene.group('room'), shadows=scene.group('room',true);
    rug(form,-.30,2.725,1.75,2.78);
    bed(form,shadows);
    desk(stuff,shadows);
    clothing(stuff,shadows);
    chest(stuff,2.38,3.55,1.04,.56,.46,-.025);
    shadows.decal([2.38,.024,3.55],1.52,.91,.68);
    scene.hit(-.99,1.22,4.496,4.93);
    scene.hit(1.71,3.05,.49,3.87);
    scene.hit(-3.23,-2.22,-.165,1.765);
    scene.hit(-2.02,-1.56,.65,1.14);
    scene.hit(-3.17,-2.50,3.00,4.04);
    scene.label('Wool quilt and keeper’s bunk',[2.37,.817,1.94],.73,2.2);
    scene.label('Feeding ledger',[ -2.639,.939,.970],.28,1.9);
    scene.label('A note for the evening round',[-3.23,1.295,.68],.32,1.9);
  }

  function barrel(mesh,x,y,z,r,h) {
    const sides=14;
    for (let i=0;i<sides;i++) {
      const a=(i+.021)*TAU/sides,b=(i+.979)*TAU/sides;
      const p=(n,yy,t)=>[x+Math.cos(t)*r*n,y+yy*h,z-Math.sin(t)*r*n];
      const color=pick(oakColors);
      for (const [ha,hb,ra,rb] of [[0,.22,.83,.947],[.22,.66,.947,1],[.66,1,1,.853]])
        mesh.face([p(ra,ha,a),p(ra,ha,b),p(rb,hb,b),p(rb,hb,a)],color,wood,
          [[0,ha],[.22,ha],[.22,hb],[0,hb]]);
    }
    for (const [hh,rr] of [[.13,.911],[.52,1.009],[.875,.924]]) {
      vessel(mesh,x,y+h*hh,z,[[r*rr-.002,0],[r*rr+.018,.01],[r*rr+.018,.061],[r*rr-.002,.071]],
        '#53534e',iron,sides);
    }
    mesh.cyl([x,y+h-.033,z],[x,y+h-.022,z],r*.817,r*.813,'#8c694e',endgrain,sides);
    for (const dx of [-.42,.12,.49]) {
      const k=Math.sqrt(.77-dx*dx);
      mesh.beam([x+dx*r,y+h-.018,z-k*r],[x+dx*r,y+h-.018,z+k*r],.009,.005,'#564332',wood,.001);
    }
  }
  function sack(mesh,x,y,z,s,yaw,color) {
    mesh.ellipse([x,y+s*.323,z],[s*.325,s*.341,s*.258],color,cloth,16,10,.62,yaw);
    mesh.ellipse([x+s*.044,y+s*.652,z+s*.042],[s*.141,s*.094,s*.106],tint(color,.90),cloth,12,7,.69,yaw);
    mesh.ring([x+s*.043,y+s*.60,z+s*.042],[0,1,0],s*.087,s*.019,'#96754d',leather,12,5);
    for (let i=0;i<10;i++) {
      const xx=x+(i-4.5)*s*.044;
      mesh.beam([xx,y+s*.172,z+s*.241],[xx+s*.024,y+s*.188,z+s*.243],s*.010,.005,'#a89470',cloth,.002);
    }
  }
  function bucket(mesh,x,y,z,r=.252,h=.362) {
    const side=14;
    const tone='#795b43';
    vessel(mesh,x,y,z,[[.00,0],[r*.78,0],[r,h],[r-.023,h+.007],[r-.023,h-.011],[r*.72,.036],[0,.036]],
      tone,wood,side);
    for (const yy of [.086,h*.76]) {
      const rr=r*mix(.78,1,yy/h);
      vessel(mesh,x,y+yy,z,[[rr,0],[rr+.011,.008],[rr+.018,.044],[rr+.001,.050]],ironDark,iron,side);
    }
    for (let i=0;i<side;i++) {
      const t=i*TAU/side, a=Math.cos(t),b=Math.sin(t);
      mesh.beam([x+a*r*.791,y+.005,z+b*r*.791],[x+a*(r+.006),y+h-.006,z+b*(r+.006)],.009,.007,'#594537',wood,.002);
    }
    const loop=[];
    for (let i=0;i<=12;i++) {
      const t=i*Math.PI/12;
      loop.push([x+Math.cos(t)*(r+.014),y+h-.068+Math.sin(t)*r*.985,z+.029*Math.sin(t)]);
    }
    mesh.cord(loop,.011,ironEdge,iron,6);
  }
  function shelving(mesh,shadows) {
    const x=-1.204,z=-2.655;
    shadows.decal([x,.025,z],1.26,2.28,.67);
    for (const xx of [x-.375,x+.375]) for (const zz of [z-.89,z+.89])
      mesh.beam([xx,.024,zz],[xx,2.146,zz],.098,.11,'#75553e',wood,.015);
    for (const yy of [.245,.796,1.333,1.878,2.12]) {
      for (let i=0;i<4;i++) {
        const xx=x-.325+i*.218;
        mesh.beam([xx,yy,z-.963],[xx,yy,z+.963],.213,.077,pick(oakColors),wood,.011);
      }
      for (const zz of [z-.89,z+.89]) nail(mesh,[x+.433,yy-.013,zz],[1,0,0],.023,ironEdge);
    }
    for (const zz of [z-.51,z+.05,z+.58]) {
      mesh.beam([x-.416,.382,zz],[x-.416,2.057,zz],.077,.511,'#513d2e',wood,.018);
    }
    sack(mesh,x+.08,.285,z+.43,.69,.18,'#a19272');
    sack(mesh,x+.056,.287,z-.43,.64,-.25,'#8b7962');
    sack(mesh,x+.098,.840,z+.445,.61,-.21,'#a89873');
    jar(mesh,x+.167,.838,z-.482,1.18,'#87735e');
    jar(mesh,x-.148,.839,z-.450,1.05,'#63746a');
    jar(mesh,x+.14,.837,z-.189,.79,'#9c7c5c');
    jar(mesh,x+.123,1.376,z+.209,1.05,'#8c7461');
    jar(mesh,x+.133,1.376,z-.112,1.20,'#6d7767');
    jar(mesh,x-.125,1.377,z-.375,.93,'#a08a68');
    cup(mesh,x+.131,1.376,z-.615,.9);
    mesh.box([x+.052,1.396,z+.585],[.305,.055,.315],'#8d684d',leather,.08);
    for (let i=0;i<3;i++) mesh.ellipse([x+.027,1.949+i*.041,z+.395],[.244,.034,.241],
      pick(['#7c6256','#83745c','#66554d']),cloth,12,6,.39,.12*i);
    for (let i=0;i<3;i++) jar(mesh,x-.08,1.923,z-.457+i*.23,.74,pick(['#837463','#6a6d63','#906c57']));
    barrel(mesh,-1.305,.014,-1.254,.298,.713);
    bucket(mesh,-1.14,.020,-4.270,.26,.38);
    for (const y of [.155,.196]) shadows.decal([-1.2,.021,-4.29],.82,.74,.65);
  }

  function harness(mesh) {
    const f=frame(2.440,-5.41,0,1);
    patch(mesh,f,.45,1.935,4.43,2.154,.028,'#6b4d38',wood);
    patch(mesh,f,.55,.929,4.15,1.033,.015,'#5e4939',wood);
    for (const u of [.68,1.43,2.12,2.80,3.56,4.17]) {
      nail(mesh,f.point(u,2.042,.057),f.normal,.026,ironEdge);
      mesh.cord([f.point(u,2.02,.04),f.point(u,1.98,.16),f.point(u,1.99,.213),f.point(u,2.063,.224)],.023,ironEdge,iron,6);
    }
    const colors=['#78553d','#906244','#644735'];
    for (let k=0;k<3;k++) {
      const loop=[];
      const u0=3.36+k*.10;
      for (let i=0;i<=32;i++) {
        const t=i*TAU/32;
        const sin=Math.sin(t),cos=Math.cos(t);
        loop.push(f.point(u0+.357*sin*(.85+.17*cos),1.388+.633*cos, .191+k*.033+.051*Math.sin(t*2)));
      }
      mesh.cord(loop,.033-k*.003,colors[k],leather,7);
    }
    const a=f.point(3.39,1.036,.265);
    mesh.ring(a,f.normal,.095,.019,bronze,iron,16,6);
    mesh.beam(add(a,[0,-.089,0]),add(a,[0,.086,0]),.024,.018,ironEdge,iron,.004);
    mesh.ring(f.point(3.728,1.555,.304),f.normal,.081,.019,ironEdge,iron,15,6);
    mesh.cord([f.point(3.41,1.01,.268),f.point(3.47,.86,.291),f.point(3.48,.576,.272),
      f.point(3.58,.41,.235)],.030,'#855b40',leather,7);
    for (let i=0;i<5;i++) nail(mesh,f.point(3.48,.617-i*.036,.285),f.normal,.011,bronze);
    // Thick-bristled brush, scraping spatula and forged stove tools.
    const bx=2.183,bz=-3.800;
    mesh.beam([bx,.354,bz+.24],[bx,1.921,bz-.16],.056,.053,'#a18058',wood,.011);
    mesh.beam([bx,1.922,bz-.161],[bx,2.15,bz-.24],.188,.125,'#805c3e',wood,.026);
    mesh.box([bx-.084,2.035,bz-.195],[.078,.254,.206],'#8f714f',straw,.13);
    for (let i=0;i<18;i++) {
      const y=1.937+Math.floor(i/4)*.05,z=bz-.269+(i%4)*.045;
      mesh.beam([bx-.102,y,z],[bx-rand(.151,.179),y+rand(-.009,.01),z+rand(-.012,.009)],
        .012,.016,pick(['#a68a5e','#8a7050','#b09a70']),straw,.003);
    }
    for (const [u,dy] of [[1.18,0],[1.52,.08],[2.10,.02]]) {
      const dp=.212;
      mesh.beam(f.point(u+.176,.33+dy,dp),f.point(u,1.972,dp),.036,.039,u<1.4?'#947250':ironEdge,
        u<1.4?wood:iron,.006);
      mesh.ring(f.point(u,1.974,dp),f.normal,.043,.012,ironEdge,iron,12,5);
    }
    const tip=f.point(1.356,.39,.237);
    mesh.face([add(tip,[-.034,-.13,-.136]),add(tip,[-.034,-.148,.14]),add(tip,[-.034,.085,.041]),
      add(tip,[-.034,.092,-.043])],'#706b5f',iron);
    mesh.beam(f.point(1.99,.32,.226),f.point(2.44,.33,.226),.057,.074,ironDark,iron,.012);
    for (let i=0;i<6;i++) {
      const u=2.005+i*.079;
      mesh.cord([f.point(u,.344,.225),f.point(u,.25,.257),f.point(u,.174,.291)],.014,ironEdge,iron,5);
    }
    const noteFrame=frame(2.442,-4.38,0,1);
    paintedBoard(mesh,noteFrame,-.162,1.185,.415,1.739,.073,chart);
    mesh.beam(f.point(.34,.491,.01),f.point(.92,.491,.01),.31,.067,'#79593f',wood,.014);
    mesh.ellipse(f.point(.651,.541,.122),[.104,.041,.171],'#825a4b',cloth,13,7,.55);
  }
  function passage(scene) {
    const mesh=scene.group('tack'), shadows=scene.group('tack',true);
    shelving(mesh,shadows);
    harness(mesh);
    brazierLamp(mesh,-1.242,2.45,-4.26,.78,'#6a6151','#ffc275');
    mesh.beam([-1.65,2.769,-4.26],[-1.24,2.769,-4.26],.037,.038,ironEdge,iron,.005);
    mesh.cord([[-1.24,2.77,-4.26],[-1.24,2.69,-4.26]],.011,ironDark,iron);
    chest(mesh,1.989,-1.181,.79,.429,.44,Math.PI/2);
    shadows.decal([2.022,.023,-1.187],.83,1.09,.63);
    scene.hit(-1.71,-.70,-3.66,-1.68);
    scene.hit(-1.61,-.99,-1.57,-.93);
    scene.hit(-1.46,-.84,-4.57,-3.93);
    scene.hit(1.75,2.47,-1.61,-.76);
    scene.hit(2.12,2.49,-4.97,-2.03);
    scene.label('Leather flight harness',[2.13,1.39,-2.00],.56,2.25);
    scene.label('Ash’s saddle fitting chart',[2.34,1.46,-4.265],.32,1.8);
    scene.label('Feed, salve and clean wraps',[-.79,1.08,-2.66],.52,2.08);
    scene.label('Scouring brush', [2.03,1.85,-3.91],.31,1.83);
  }

  return {bedroom,passage,vessel,cup,jar,barrel,bucket,sack,chest,stool,tabletop};
})();


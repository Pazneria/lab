'use strict';

const Roost = (() => {
  const {stone,mortar,wood,endgrain,iron,cloth,leather,straw,water,embers,plain,shadow,chalk,
    TAU,add,sub,mul,unit,cross,rotate,tint,blend,clamp,mix} = Ward;
  const {rand,pick,random,frame,faceRect,patch,stonePiece,slab,arch,nail,band,chain,brazierLamp,
    ashColors,barnOak,oakColors,ironDark,ironEdge,bronze,blackOak} = Craft;

  function carvedCut(mesh,points,normal,wide,shade,edge,material) {
    const direction=unit(sub(points.at(-1),points[0]));
    const axis=unit(cross(direction,normal));
    const a=[],b=[],c=[];
    points.forEach((p,i)=>{
      const fade=i===0?.14:i===points.length-1?.11:Math.sin(Math.PI*i/(points.length-1))*.67+.32;
      const delta=wide*fade;
      a.push(add(p,mul(axis,-delta)));
      b.push(add(p,mul(axis,delta*.53)));
      c.push(add(add(p,mul(axis,delta)),mul(normal,.0011)));
    });
    for(let i=1;i<points.length;i++) {
      mesh.face([a[i-1],a[i],b[i],b[i-1]],shade,material,undefined,0,[normal,normal,normal,normal]);
      mesh.face([b[i-1],b[i],c[i],c[i-1]],edge,material,undefined,0,[normal,normal,normal,normal]);
    }
  }
  function groundScratches(mesh) {
    const dark='#4b4038',edge='#9b8873',up=[0,1,0];
    for (let i=0;i<4;i++) {
      const x=1.35+i*.193,z=-10.76-i*.118,y=.030+i*.0004;
      carvedCut(mesh,[[x,y,z],[x+.237,y,z-.145],[x+.413,y,z-.404],[x+.470,y,z-.756]],up,.024,dark,edge,stone);
    }
    for(let i=0;i<3;i++){
      const x=-4.96+i*.218,z=-16.34-i*.102,y=.021+i*.0004;
      carvedCut(mesh,[[x,y,z],[x+.285,y,z+.055],[x+.48,y,z+.188],[x+.69,y,z+.392]],up,.017,dark,'#897666',stone);
    }
  }

  function bedding(mesh, baseY, centerX, centerZ) {
    const rx=3.41,rz=1.74,turn=.049;
    const p=(angle,r,yBias=0)=>{
      const rim=.12*Math.exp(-(((r-.78)*4.4)**2));
      const tuft=.039*Math.sin(angle*7+r*19)+.026*Math.cos(angle*12-r*18);
      const f= r*(1+.036*Math.sin(angle*5)+.025*Math.cos(angle*9));
      const off=rotate([rx*f*Math.cos(angle),0,rz*f*Math.sin(angle)],turn);
      const depth=baseY+.08+rim+tuft*Math.min(r*4,1)-.064*r**5+yBias;
      return [centerX+off[0],depth,centerZ+off[2]];
    };
    const stable=p(0,0,.015);
    const shades=['#8d713d','#9c7c43','#a58449','#a98b54','#997b4d','#856b43','#b08b46','#735b36'];
    const strands=['#c7a563','#af8e4e','#927446','#d6b474','#b9955a','#e0bd78','#99794a','#a38448','#745b3e'];
    const bands=11,steps=56;
    for(let j=0;j<bands;j++) for(let i=0;i<steps;i++){
      const lo= i/steps*TAU,hi=(i+1)/steps*TAU;
      const a=j/bands,b=(j+1)/bands;
      const shade=tint(pick(shades),clamp(.80+j*.032+rand(-.10,.11),.72,1.13));
      if (j===0) mesh.face([stable,p(hi,b),p(lo,b)],shade,straw);
      else mesh.face([p(lo,a),p(hi,a),p(hi,b),p(lo,b)],shade,straw);
    }
    for(let i=0;i<860;i++){
      const a=random()*TAU, r=Math.sqrt(random())*.99, at=p(a,r,.012);
      const pooled=Math.sin(a*4.8+r*3)*.63+.44;
      const direction= a+.95+rand(-1.2,1.2)+(r<.54 ? rand(-.86,.86):0);
      const length=rand(.075,.43)*(r>.74?1.22:1);
      const wx=Math.sin(direction)*length*.51,wz=Math.cos(direction)*length*.51;
      const thickness=rand(.005,.019),offset=random()*.02;
      const a0=add(at,[-wx,offset,-wz]);
      const b=add(at,[-wz*thickness/length,.008+offset,wx*thickness/length]);
      const c=add(at,[wx,.016+offset,wz]);
      const d=add(at,[wz*thickness/length,-.005+offset,-wx*thickness/length]);
      mesh.face([a0,b,c,d],tint(pick(strands),rand(.82,1.17)*(pooled<-.14?.81:1)),straw,undefined,0,
        [[0,1,0],[0,1,0],[0,1,0],[0,1,0]]);
    }
    for(let i=0;i<104;i++){
      const z=rand(-12.48,-11.88),x=rand(-3.98,3.53);
      const y=z< -12.30?1.271:.025;
      const a=rand(-1,1),d=rand(.04,.22);
      mesh.face([[x,y,z],[x+.008,y+.007,z+.023],[x+a*d,y+.003,z+d]],pick(strands),straw,undefined,0,
        [[0,1,0],[0,1,0],[0,1,0]]);
    }
  }
  function platform(scene) {
    const mesh=scene.group('berth'), below=scene.group('berth',true), surface=scene.group('berth');
    const [xmin,xmax,zfront,zback]=[-4.20,3.31,-12.29,-16.51];
    below.decal([-.43,.026,-14.34],9.84,5.73,.85);
    for (const xx of [-3.44,-.54,2.48]) for (const zz of [-12.89,-15.87]) {
      below.decal([xx,.031,zz],1.98,1.61,.68);
      mesh.box([xx,.125,zz],[1.39,.245,1.164],'#665b51',stone);
      mesh.box([xx,.29,zz],[1.22,.135,.986],'#827164',stone);
      mesh.box([xx,.448,zz],[.956,.197,.84],'#6c6056',stone);
      mesh.box([xx,.583,zz],[.839,.092,.74],'#79685a',stone);
      mesh.beam([xx,.58,zz],[xx,1.114,zz],.55,.60,pick(barnOak),wood,.044);
      mesh.box([xx,.622,zz],[.61,.112,.637],ironDark,iron);
      mesh.box([xx,.846,zz],[.605,.114,.637],ironDark,iron);
      for (const x of [xx-.183,xx+.182]) for (const y of [.63,.845])
        nail(mesh,[x,y,zz+.326],[0,0,1],.048,ironEdge);
      if (xx!==2.48) mesh.beam([xx+.11,.607,zz],[xx+.94,1.051,zz],.273,.213,'#563e2e',wood,.029);
      if (xx!==-3.44) mesh.beam([xx-.11,.61,zz],[xx-.96,1.052,zz],.265,.209,'#604535',wood,.029);
      mesh.beam([xx,.618,zz],[xx,1.017,zz+(zz===-12.89?-.944:.986)],.217,.235,'#594332',wood,.031);
      const f=frame(xx-.66,zz+.545,1,0);
      stonePiece(mesh,f,.022,.039,1.26,.234,.052,'#746356');
    }
    for (const zz of [zfront,zback]) {
      mesh.beam([xmin,1.004,zz],[xmax,1.004,zz],.398,.433,pick(['#67503c','#654832']),wood,.069);
      mesh.beam([xmin+.035,.807,zz],[xmax-.021,.807,zz],.348,.086,'#4a382b',wood,.016);
      for (const xx of [-3.43,-.54,2.49]) {
        mesh.box([xx,1.024,zz+.177],[.164,.328,.055],ironDark,iron);
        for (const yy of [.918,1.12]) nail(mesh,[xx,yy,zz+.215],[0,0,1],.047,ironEdge);
        for (const nx of [xx-.16,xx+.17]) nail(mesh,[nx,1.037,zz+.204],[0,0,1],.032,'#78695a');
      }
    }
    for (const x of [xmin+.08, xmax-.11]) {
      mesh.beam([x,1.043,zfront+.103],[x,1.043,zback-.106],.426,.429,'#694d36',wood,.054);
      for (const z of [-13.12,-14.92,-15.95]) {
        const n=[x<0?-1:1,0,0];
        nail(mesh,[x+n[0]*.22,1.079,z],n,.057,ironEdge);
      }
    }
    for(let i=0;i<15;i++){
      const x=xmin+.24+i*.499;
      mesh.beam([x,1.179,zfront-.17],[x,1.179,zback+.14],.486,.22,
        pick(['#77573c','#6b513c','#75583e','#68513b','#826245','#725641']),wood,.025);
      for (const z of [zfront-.033,zback+.081]) nail(mesh,[x,1.293,z],[0,1,0],.031,'#594f43');
    }
    const f=frame(xmin,zfront+.207,1,0);
    for (let i=0;i<5;i++) {
      const x=4.0+i*.354,y=.92+i*.032,d=.001;
      carvedCut(mesh,[f.point(x-.30,y-.028,d),f.point(x-.066,y+.028,d),f.point(x+.18,y+.066,d),
        f.point(x+.43,y+.109,d)],[0,0,1],.018,'#392b24','#9b7451',wood);
    }
    for(let i=0;i<4;i++){
      const x=-2.72+i*.188,y=1.302,z=-12.81+i*.021;
      carvedCut(mesh,[[x,y,z],[x+.12,y,z+.17],[x+.347,y,z+.35],[x+.441,y,z+.575]],[0,1,0],.022,
        '#433126','#ad8558',wood);
    }
    bedding(surface,1.257,-.51,-14.62);
    scene.hit(-4.28,3.53,-16.74,-12.09);
    scene.label('Stacked stone footings and oak braces',[-1.84,.536,-12.63],.77,2.7);
    scene.label('Ash’s straw berth',[.3,1.46,-13.61],1.26,3.05);
    scene.label('Claw scoring in the oak',[1.39,1.064,-12.072],.32,2.15);
  }

  function hearth(scene) {
    const mesh=scene.group('hearth'), smudge=scene.group('hearth',true);
    const x=-6.71, z=-11.92, f=frame(x,z,0,-1);
    const fireback='#372d27', crust='#58483c';
    mesh.box([-7.275,.188,z],[2.03,.35,3.67],'#615346',stone);
    mesh.box([-7.06,.383,z],[1.57,.094,3.29],'#766453',stone);
    mesh.box([-8.105,1.505,z],[.151,2.26,3.08],fireback,stone);
    for (const u of [-1.62,1.62]) {
      mesh.box(f.point(u,.24,-.452),[1.43,.446,.70],'#65554a',stone);
      for(let i=0;i<5;i++){
        const y=.47+i*.337,h=.309;
        const tone=pick(['#66564c','#716051','#5e4e42','#786457','#6d594a']);
        mesh.box(f.point(u,y+h/2,-.439),[1.388,h,.59],tone,stone);
        stonePiece(mesh,f,u-.298,y,u+.299,y+h,.064,tint(tone,1.07));
      }
      mesh.box(f.point(u,2.174,-.440),[1.48,.193,.718],'#82705d',stone);
    }
    // Sideways voussoirs above the hot mouth.
    const spring=1.45,rx=1.32,ry=.91;
    const P=(theta,r,depth)=>f.point((rx+r)*Math.sin(theta),spring+(ry+r)*Math.cos(theta),depth);
    for(let i=0;i<15;i++) {
      const a=-Math.PI/2+(i+.025)*Math.PI/15,b=-Math.PI/2+(i+.975)*Math.PI/15;
      const color=blend(pick(ashColors),'#332920',rand(.33,.67));
      const aa=P(a,0,.046),bb=P(b,0,.046),cc=P(b,.306,.046),dd=P(a,.306,.046);
      const a2=P(a,0,-.979),b2=P(b,0,-.979),c2=P(b,.306,-.979),d2=P(a,.306,-.979);
      mesh.face([aa,bb,cc,dd],color,stone);
      mesh.face([bb,aa,a2,b2],tint(color,.55),stone);
      mesh.face([aa,dd,d2,a2],tint(color,.82),stone);
      mesh.face([dd,cc,c2,d2],tint(color,.79),stone);
    }
    mesh.beam(f.point(-1.97,2.555,-.292),f.point(1.97,2.555,-.292),1.20,.202,'#69564a',stone,.048);
    const courses=[
      [2.686,2.981,1.81,1.57,-.22],
      [2.993,3.259,1.59,1.25,-.31],
      [3.271,3.587,1.28,.98,-.46],
      [3.597,3.892,1.01,.69,-.61],
      [3.903,4.570,.719,.58,-.725],
      [4.579,5.294,.60,.527,-.793]
    ];
    for(const [bot,top,w0,w1,d] of courses) {
      const c=pick(['#645448','#6f645a','#6a584b','#756557']);
      const p=[f.point(-w0,bot,d+.07),f.point(w0,bot,d+.07),f.point(w1,top,d-.052),f.point(-w1,top,d-.052)];
      mesh.face(p,c,stone);
      mesh.face([p[0],p[3],f.point(-w1,top,-1.56),f.point(-w0,bot,-1.56)],tint(c,.89),stone);
      mesh.face([p[2],p[1],f.point(w0,bot,-1.56),f.point(w1,top,-1.56)],tint(c,.93),stone);
      const sections=Math.max(3,Math.ceil(w0*3));
      const pf=frame(x+d+.086,z,0,-1);
      for(let i=0;i<sections;i++){
        stonePiece(mesh,pf,-w1+(2*w1)*i/sections+.021,bot+.017,-w1+(2*w1)*(i+1)/sections-.02,top-.022,
          rand(.016,.028),blend(c,crust,rand(.15,.66)));
      }
    }
    mesh.box(f.point(0,.468,-.585),[1.11,.101,2.56],'#433630',iron);
    const emberColors=['#a93d1d','#a84020','#bf4c21','#e87930','#892d1b','#f39443','#653525'];
    for(let i=0;i<90;i++) {
      const u=rand(-1.18,1.19),d=rand(-.974,-.164),yy=rand(.51,.604);
      const color=pick(emberColors);
      mesh.ellipse(f.point(u,yy,d),[rand(.043,.108),rand(.018,.071),rand(.06,.16)],color,
        i%4===0?stone:embers,7,4,.71,rand(-1,1),i%4===0?0:rand(.95,3.0));
    }
    for(let i=0;i<13;i++){
      const u=-1.26+i*.211;
      mesh.beam(f.point(u,.43,.109),f.point(u,.835,.11),.025,.035,ironDark,iron,.005);
      mesh.beam(f.point(u,.828,.113),f.point(u,.838,-1.04),.026,.036,'#62605b',iron,.004);
      nail(mesh,f.point(u,.840,.128),f.normal,.021,'#766756');
    }
    for(const y of [.441,.824]) mesh.beam(f.point(-1.449,y,.149),f.point(1.45,y,.149),.087,.083,'#4d4a42',iron,.017);
    for(const u of [-1.384,1.383]){
      mesh.beam(f.point(u,.426,.16),f.point(u,.933,.16),.088,.099,'#535149',iron,.012);
      mesh.ring(f.point(u,.918,.199),f.normal,.071,.019,ironEdge,iron,15);
    }
    for (let i=0;i<30;i++){
      const px=rand(-6.59,-6.07),pz=rand(z-1.49,z+1.44);
      mesh.ellipse([px,.027,pz],[rand(.018,.064),rand(.010,.026),rand(.023,.065)],pick(['#43382e','#62544a','#745b48']),
        stone,6,4,.7);
    }
    smudge.decal([-6.18,.023,z],2.99,4.53,.68,.016,'#2b1e19');
    mesh.face([f.point(-1.15,.48,-.987),f.point(1.18,.48,-.987),f.point(1.16,1.75,-.987),
      f.point(-1.18,1.75,-.987)],'#644130',stone);
    scene.hit(-8.18,-6.37,z-1.96,z+1.96);
    scene.label('Iron grate and banked coals',[-6.46,.67,z],.69,2.63);
  }

  function cistern(scene) {
    const mesh=scene.group('trough'), shade=scene.group('trough',true);
    const x=5.681,z=-9.549,w=1.27,d=2.56;
    function profile(w0,d0,y,r) {
      const h=w0/2,l=d0/2;
      return [[-h+r,l],[h-r,l],[h,l-r],[h,-l+r],[h-r,-l],[-h+r,-l],[-h,-l+r],[-h,l-r]]
        .map(([a,b])=>[x+a,y,z+b]);
    }
    const profiles=[
      [w+.12,d+.10,.053,.14,'#5b5249'],
      [w+.12,d+.10,.177,.14,'#6f6254'],
      [w-.018,d-.019,.243,.14,'#75665a'],
      [w-.04,d-.092,.593,.17,'#807266'],
      [w+.091,d+.087,.642,.18,'#9c8975'],
      [w+.074,d+.069,.752,.18,'#aa9882'],
      [w-.234,d-.255,.756,.19,'#8a7966'],
      [w-.294,d-.321,.701,.19,'#6d6157'],
      [w-.395,d-.408,.419,.17,'#615248']
    ];
    const rings=profiles.map(p=>profile(...p.slice(0,4)));
    for (let k=0;k<rings.length-1;k++) for(let i=0;i<8;i++){
      const j=(i+1)%8;
      mesh.face([rings[k][i],rings[k][j],rings[k+1][j],rings[k+1][i]],tint(profiles[k][4],rand(.86,1.1)),stone);
    }
    const pool=profile(w-.328,d-.352,.617,.18);
    mesh.face(pool,'#667168',water,[[0,.95],[1,.95],[1,.85],[1,.15],[.94,0],[.06,0],[0,.15],[0,.85]]);
    for(let i=0;i<5;i++){
      const min=.12+i*.036,z0=z+.194+i*.05;
      mesh.face([[x-min,.620,z0],[x+min,.620,z0+.027],[x+min*.74,.620,z0+.042],[x-min*.54,.620,z0+.016]],
        tint('#899583',.80+i*.027),water);
    }
    mesh.ring([x+.245,.622,z+.278],[0,1,0],.139,.0038,'#7d8b78',water,24,5);
    shade.decal([x,.023,z],2.26,3.49,.78,-.08);
    const pipe='#5f6159',px=x+.881,pz=z+.277;
    mesh.cyl([px,.026,pz],[px,.106,pz],.149,.126,'#565851',iron,10);
    mesh.cyl([px,.097,pz],[px,1.172,pz],.067,.068,pipe,iron,14);
    mesh.ellipse([px,1.173,pz],[.085,.085,.088],pipe,iron,13,9);
    mesh.cyl([px,1.171,pz],[x+.306,1.172,pz],.07,.053,pipe,iron,14);
    mesh.ellipse([x+.303,1.156,pz],[.057,.066,.057],ironEdge,iron,13,8);
    mesh.cyl([x+.303,1.174,pz],[x+.303,1.064,pz],.059,.054,pipe,iron,13);
    mesh.ring([x+.303,1.062,pz],[0,-1,0],.049,.009,'#7e7461',iron,15,6);
    mesh.cyl([x+.303,1.063,pz],[x+.303,1.059,pz],.041,.041,'#35322c',iron,13);
    for(const y of [.277,.796,1.149]){
      mesh.ring([px,y,pz],[0,1,0],.078,.015,'#8b7861',iron,14,6);
    }
    const valve=[px,1.173,pz+.134];
    mesh.cyl([px,1.173,pz],[px,1.173,pz+.15],.041,.039,bronze,iron,10);
    mesh.ring(valve,[0,0,1],.118,.016,'#886751',iron,18,6);
    for (let i=0;i<5;i++) {
      const a=i*TAU/5;
      mesh.beam(valve,add(valve,[.107*Math.cos(a),.107*Math.sin(a),0]),.015,.017,bronze,iron,.004);
    }
    nail(mesh,valve,[0,0,1],.035,'#a58963');
    const drain=[4.84,.025,z-1.18];
    mesh.cyl(add(drain,[0,-.027,0]),drain,.232,.232,'#544b41',iron,20);
    mesh.ring(add(drain,[0,.003,0]),[0,1,0],.190,.015,'#726b5d',iron,20,6);
    for(let i=-3;i<=3;i++){
      const dx=i*.044,span=Math.sqrt(.031-dx*dx);
      mesh.beam([drain[0]+dx,.029,drain[2]-span],[drain[0]+dx,.029,drain[2]+span],
        .013,.004,'#2e2c26',iron,.002);
    }
    Fixtures.bucket(mesh,6.22,.018,-7.79,.257,.342);
    Fixtures.stool(mesh,6.99,-8.16,.51,1.30);
    shade.decal([6.24,.024,-7.79],.72,.71,.62);
    scene.hit(4.97,6.74,-10.90,-8.21);
    scene.hit(5.95,6.48,-8.04,-7.53);
    scene.hit(6.72,7.23,-8.42,-7.91);
    scene.label('Carved stone washing trough',[x,.716,z],.72,2.38);
    scene.label('Iron supply pipe and stop valve',valve,.264,2.14);
  }

  function gate(scene) {
    const m=scene.group('roostBack');
    const x0=-.12,z=-19.234,spring=3.75,rx=4.20,ry=2.459;
    const p=(x,y,d=0)=>[x0+x,y,z+d];
    const height=x=>spring+ry*Math.sqrt(Math.max(0,1-(x/rx)**2));
    const crown=[p(-rx,.038,-.023),p(rx,.038,-.023)];
    for(let i=0;i<=22;i++) {
      const a=Math.PI*i/22;
      crown.push(p(rx*Math.cos(a),spring+ry*Math.sin(a),-.023));
    }
    m.face(crown,'#2d2721',wood);
    for(let side=0;side<2;side++) {
      const from=side===0?-rx+.025:.023,to=side===0?-.023:rx-.025,count=14;
      for(let i=0;i<count;i++){
        const a=mix(from,to,i/count)+.008,b=mix(from,to,(i+1)/count)-.009;
        const c=tint(pick(barnOak),rand(.81,1.18));
        const bend=rand(.014,.044);
        const pts=[p(a,.051,.083),p(b,.051,.083),p(b,height(b),.083),p(a,height(a),.083)];
        m.face(pts,c,wood,[[a*1.54,0],[b*1.54,0],[b*1.54,height(b)*.72],[a*1.54,height(a)*.72]]);
        m.face([p(a,.052,.057),pts[0],pts[3],p(a,height(a),.057)],tint(c,.69),wood);
        m.face([p(b-bend,.051,.085),p(b,.051,.085),p(b,height(b),.085),p(b-bend,height(b-bend),.085)],
          tint(c,1.13),wood,[[a*1.54,0],[b*1.54,0],[b*1.54,height(b)*.72],[a*1.54,height(a)*.72]]);
      }
    }
    for (const x of [-4.412,4.412]) {
      m.box(p(x,.262,.074),[.672,.50,.64],'#75665b',stone);
      for(let i=0;i<8;i++){
        const y=.553+i*.396;
        m.box(p(x,y+.174,.061),[.501,.368,.583],pick(ashColors),stone);
        const f=frame(x0+x-.25,z+.366,1,0);
        stonePiece(m,f,.02,y+.01,.483,y+.35,.045,pick(ashColors));
      }
      m.box(p(x,spring-.04,.065),[.631,.218,.692],'#8c7a69',stone);
    }
    arch(m,{cx:x0,spring,rx,ry,thick:.492,zFront:z+.387,depth:.55,count:23,palette:ashColors,gap:.006,bevel:.037});
    for (const side of [-1,1]) {
      const position=x=>side*x;
      m.beam(p(position(.12),.20,.119),p(position(.12),6.089,.119),.262,.271,'#513b2a',wood,.041);
      for (const y of [1.142,3.34,4.44]) {
        const long=y<4?3.92:3.82;
        m.beam(p(position(.207),y,.127),p(position(long),y+.038,.127),.282,.276,
          y>4?'#634732':'#6a4d35',wood,.041);
        band(m,frame(x0,z,1,0),Math.min(position(.24),position(long)),Math.max(position(.24),position(long)),y+.02,.136,.296,
          '#494944',6);
        const tip=position(long+.077);
        m.cyl(p(tip,y-.177,.24),p(tip,y+.179,.24),.087,.087,ironEdge,iron,12);
        m.ring(p(tip,y+.186,.24),[0,1,0],.09,.016,'#837765',iron,12,5);
      }
      m.beam(p(position(.275),1.297,.133),p(position(3.905),3.215,.133),.252,.273,'#654835',wood,.041);
      m.beam(p(position(.306),3.49,.135),p(position(3.33),4.389,.135),.221,.256,'#5e4432',wood,.039);
      const handle=p(position(.687),1.90,.356);
      m.box(p(position(.687),2.051,.263),[.37,.461,.097],'#56554e',iron);
      for (const y of [1.88,2.207]) nail(m,p(position(.687),y,.319),[0,0,1],.050,ironEdge);
      m.ring(handle,[0,0,1],.170,.036,'#6c6c60',iron,18,7);
      m.ring(p(position(.687),2.080,.339),[1,0,0],.078,.022,bronze,iron,16,5);
    }
    scene.hit(-4.74,4.51,-19.39,-18.83);
    scene.label('Dragon-scale oak doors and forged hinges',[x0,2.00,z+.36],1.44,3.70);
  }

  function hardware(scene) {
    const near=scene.group('roostNear'), middle=scene.group('roostMid'), rear=scene.group('roostBack'), shade=scene.group('roostNear',true);
    // Caged lamps are held out away from the stone to make the sill and vault readable from either side.
    for (const [x,z,y,s,mesh] of [[-1.99,-6.46,2.39,.90,near],[2.28,-6.48,2.47,.97,near],
      [6.75,-13.85,3.61,1.25,middle],[3.97,-17.35,4.19,1.29,rear]]) {
      brazierLamp(mesh,x,y,z,s,'#766653','#ffb96a');
      if (mesh===rear) {
        mesh.box([x,7.24,z],[.188,.143,.234],ironDark,iron);
        mesh.cyl([x,7.23,z],[x,6.86,z],.033,.041,ironEdge,iron,10);
        chain(mesh,x,6.845,z,13,1.335,'#686458');
      } else {
        const anchor=x>5?[x+.71,y+.382,z]:[x,y+.416,z+.385];
        mesh.box(anchor,[.19,.17,.18],'#7a6e60',iron);
        mesh.cord([anchor,[x+.063,y+.393,z+.045],[x,y+.334*s,z]],.027,ironDark,iron,6);
      }
    }
    const cr=[3.86,6.91,-13.64];
    middle.box([cr[0],7.266,cr[2]],[.27,.197,.28],ironDark,iron);
    middle.cyl([cr[0],7.27,cr[2]],[cr[0],7.015,cr[2]],.071,.071,ironEdge,iron,12);
    middle.ring(cr,[0,0,1],.167,.041,ironEdge,iron,16,7);
    chain(middle,cr[0],cr[1]-.155,cr[2],16,1.51,'#67665b');
    middle.ring([cr[0],3.32,cr[2]],[1,0,0],.253,.052,'#716559',iron,20,7);
    const hook=[];
    for(let i=0;i<16;i++){
      const a=mix(.48,5.05,i/15);
      hook.push([cr[0]+.162*Math.cos(a),2.925+.171*Math.sin(a),cr[2]+.079*Math.sin(a*.6)]);
    }
    middle.cord(hook,.041,'#767367',iron,8);
    for (const [x,z,normal] of [[6.931,-13.63,[-1,0,0]],[-6.94,-17.30,[1,0,0]]]) {
      const m=x<0?rear:middle,p=[x,1.777,z];
      m.box(p,[.096,.301,.388],'#4f4d45',iron);
      for(const zz of [-.135,.135]) nail(m,[x+normal[0]*.051,1.853,z+zz],normal,.039,ironEdge);
      m.cyl(add(p,mul(normal,.031)),add(p,mul(normal,.11)),.09,.077,'#615f54',iron,12);
      m.ring([x+normal[0]*.17,1.639,z],normal,.171,.036,ironEdge,iron,19,6);
    }
    const x=-3.60,z=-7.69;
    Fixtures.tabletop(near,x,z,.815,1.32,.68);
    shade.decal([x,.021,z],1.90,1.18,.7);
    Fixtures.bucket(near,x+.39,.022,z+.56,.253,.362);
    Fixtures.jar(near,x-.348,.824,z-.155,1.12,'#846d55');
    Fixtures.jar(near,x-.09,.824,z-.175,.73,'#6d7869');
    for(let i=0;i<3;i++) near.ellipse([x+.317,.838+i*.039,z+.055],
      [.253,.030,.142],i===2?'#9d876f':'#745a4b',cloth,12,6,.46,-.12);
    near.beam([-4.117,.804,-7.41],[-4.398,2.228,-6.56],.043,.046,'#9c7854',wood,.006);
    near.beam([-4.395,2.228,-6.56],[-4.483,2.47,-6.52],.123,.105,'#6b4f34',wood,.015);
    scene.hit(-4.30,-2.90,-8.10,-7.25);
    scene.hit(-3.48,-2.96,-7.38,-6.87);
    scene.label('Perch wraps and wash kit',[-3.61,.878,-7.65],.53,2.25);
  }
  function shedScale(mesh) {
    const c=[2.24,.045,-11.17];
    const points=[[-.108,.011,.115],[.112,.008,.147],[.195,.028,-.012],
      [.074,.051,-.19],[-.025,.036,-.177],[-.143,.026,-.045]].map(p=>add(c,rotate(p,-.42)));
    const top=add(c,[.014,.061,.018]);
    for(let i=0;i<points.length;i++){
      const j=(i+1)%points.length;
      mesh.face([points[j],points[i],top],pick(['#5f6858','#79806a','#48504a','#888267','#616c62']),iron);
    }
    const line=[add(c,[-.076,.024,.096]),top,add(c,[.147,.040,-.088])];
    mesh.cord(line,.0047,'#9b9d7e',iron,4);
  }
  function build(scene) {
    const mesh=scene.group('roostNear');
    groundScratches(mesh);
    const upright=scene.group('roostMid');
    for (let i=0;i<4;i++) {
      const y=1.19+i*.146,x=-7.030+i*.0013,z=-13.978+i*.029;
      carvedCut(upright,[[x,y,z],[x,y-.116,z+.167],[x,y-.264,z+.385],[x,y-.407,z+.581]],
        [1,0,0],.021,'#493d34','#947c65',stone);
    }
    shedScale(mesh);
    scene.label('A shed scale',[2.24,.104,-11.17],.19,1.9);
    platform(scene);
    hearth(scene);
    cistern(scene);
    gate(scene);
    hardware(scene);
    for(const z of [-6.61,-9.92,-13.62,-17.30,-18.81]) for(const x of [-7.61,7.61])
      scene.hit(x-.745,x+.745,z-.764,z+.764);
  }

  return {build};
})();


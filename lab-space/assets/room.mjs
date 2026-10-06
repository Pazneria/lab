import * as T from './vendor/three.module.min.js';

// One level room in three volumes: a tall top-lit benchmark hall on the axis, a
// bright west apparatus bay with an oriel, and a low timber study alcove to the east.
// A lower south gallery compresses the entrance before the hall opens up.
export function createRoom(canvas,onLost){
  const renderer=new T.WebGLRenderer({canvas,antialias:true,powerPreference:'low-power'});
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.25));
  renderer.shadowMap.enabled=true;
  renderer.shadowMap.type=T.PCFSoftShadowMap;
  renderer.shadowMap.autoUpdate=false;
  renderer.shadowMap.needsUpdate=true;
  renderer.outputColorSpace=T.SRGBColorSpace;
  const scene=new T.Scene();scene.background=new T.Color('#e3ece8');
  const camera=new T.PerspectiveCamera(65,1,.08,70);camera.rotation.order='YXZ';
  const palette={plaster:'#ece8dc',lime:'#e0d9c6',floor:'#ddd6c4',joint:'#c8c1ad',travertine:'#d3c4a5',bayfloor:'#e9e5d8',
    sage:'#a8b8a1',green:'#3e6a57',dark:'#264e40',brass:'#bc9255',copper:'#b4703f',iron:'#4b524e',slate:'#3f4a47',
    oak:'#b48c5c',walnut:'#7b5a3c',linen:'#f3eee0',paper:'#faf7e8',distemper:'#a9b39e',metal:'#7e8c80'};
  const materials=new Map();
  const material=(c)=>{if(!materials.has(c))materials.set(c,new T.MeshLambertMaterial({color:palette[c]||c}));return materials.get(c);};
  const mesh=(geometry,c,x,y,z)=>{const m=new T.Mesh(geometry,material(c));m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;scene.add(m);return m;};
  const box=(x,y,z,w,h,d,c)=>mesh(new T.BoxGeometry(w,h,d),c,x,y,z);
  const ext=(x1,x2,y1,y2,z1,z2,c)=>box((x1+x2)/2,(y1+y2)/2,(z1+z2)/2,x2-x1,y2-y1,z2-z1,c);
  const cylinder=(x,y,z,r,h,c,top=r)=>mesh(new T.CylinderGeometry(top,r,h,24),c,x,y,z);
  const sphere=(x,y,z,r,c)=>mesh(new T.SphereGeometry(r,20,12),c,x,y,z);
  // Glass and lamp glow never cast shadows, so daylight falls through the openings.
  const glass=new T.MeshPhongMaterial({color:'#d3e6e0',transparent:true,opacity:.14,shininess:90,depthWrite:false});
  const vessel=new T.MeshPhongMaterial({color:'#bcd6cc',transparent:true,opacity:.34,shininess:80,depthWrite:false});
  const glow=new T.MeshBasicMaterial({color:'#fff1d0'});
  const plain=(geometry,mat,x,y,z)=>{const m=new T.Mesh(geometry,mat);m.position.set(x,y,z);scene.add(m);return m;};
  const pane=(x1,x2,y1,y2,z1,z2)=>plain(new T.BoxGeometry(x2-x1,y2-y1,z2-z1),glass,(x1+x2)/2,(y1+y2)/2,(z1+z2)/2);
  const text=(lines,x,y,z,w,h,color='#264e40',bg='#f3f0e4')=>{
    const source=document.createElement('canvas');source.width=1024;source.height=Math.round(1024*h/w);
    const ctx=source.getContext('2d');ctx.fillStyle=bg;ctx.fillRect(0,0,source.width,source.height);ctx.fillStyle=color;
    const size=Math.min(90,Math.round(source.height/(lines.length+1.4)));ctx.font=`${size}px Georgia`;ctx.textAlign='center';ctx.textBaseline='middle';
    lines.forEach((line,i)=>ctx.fillText(line,512,source.height*(i+1)/(lines.length+1),930));
    const texture=new T.CanvasTexture(source);texture.colorSpace=T.SRGBColorSpace;
    const m=new T.Mesh(new T.PlaneGeometry(w,h),new T.MeshBasicMaterial({map:texture}));m.position.set(x,y,z);scene.add(m);return m;
  };
  // Painted steel windows: glass, jambs, mullions, a transom and a deep stone sill.
  const winX=(x,z1,z2,y1,y2,n)=>{pane(x-.01,x+.01,y1,y2,z1,z2);
    for(let i=0;i<=n;i++){const z=z1+(z2-z1)*i/n;ext(x-.07,x+.07,y1,y2,z-.035,z+.035,'linen');}
    const t=y1+(y2-y1)*.74;for(const y of [y1+.035,t,y2-.035])ext(x-.07,x+.07,y-.035,y+.035,z1,z2,'linen');};
  const winZ=(z,x1,x2,y1,y2,n)=>{pane(x1,x2,y1,y2,z-.01,z+.01);
    for(let i=0;i<=n;i++){const x=x1+(x2-x1)*i/n;ext(x-.035,x+.035,y1,y2,z-.07,z+.07,'linen');}
    for(const y of [y1+.035,y2-.035])ext(x1,x2,y-.035,y+.035,z-.07,z+.07,'linen');};

  // Light: soft sky fill, one low western sun with a single static shadow map, a cool east fill.
  scene.add(new T.HemisphereLight('#ffffff','#d6ddc9',2.2));
  scene.add(new T.AmbientLight('#ffffff',.38));
  const sun=new T.DirectionalLight('#fff6e4',2.3);sun.position.set(-10,10,2);sun.target.position.set(1,0,-2);scene.add(sun,sun.target);
  sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);sun.shadow.camera.left=-12;sun.shadow.camera.right=12;sun.shadow.camera.top=12;sun.shadow.camera.bottom=-12;sun.shadow.normalBias=.035;sun.shadow.bias=-.0005;
  const eastFill=new T.DirectionalLight('#eef3f6',.45);eastFill.position.set(10,6,-3);scene.add(eastFill);

  // Outdoors: a painted sky drum, meadow, terrace, hedge and trees seen through real openings.
  const skySource=document.createElement('canvas');skySource.width=8;skySource.height=256;
  const sc=skySource.getContext('2d');const grad=sc.createLinearGradient(0,0,0,256);grad.addColorStop(0,'#a8cad8');grad.addColorStop(.62,'#e6efea');grad.addColorStop(1,'#eef0e2');sc.fillStyle=grad;sc.fillRect(0,0,8,256);
  const skyTexture=new T.CanvasTexture(skySource);skyTexture.colorSpace=T.SRGBColorSpace;
  plain(new T.CylinderGeometry(32,32,40,40,1,true),new T.MeshBasicMaterial({map:skyTexture,side:T.BackSide}),0,14,0);
  const ground=new T.Mesh(new T.CircleGeometry(32,48),material('#b5c2a0'));ground.rotation.x=-Math.PI/2;ground.position.y=-.03;ground.receiveShadow=true;scene.add(ground);
  ext(-13.5,-8.2,-.12,-.01,-8.5,8.5,'#d9d3c1');ext(-10.7,-10.1,0,.8,-6.4,3.2,'#7d9670');
  const tree=(x,z,s)=>{cylinder(x,1.5*s,z,.12*s,3*s,'walnut');for(const [dx,dy,dz,r] of [[0,3.3,0,1.3],[.6,2.8,.4,.9],[-.5,3.0,-.5,1]]){const c=sphere(x+dx*s,dy*s,z+dz*s,r*s,dx>0?'#879f7a':'#9cb28a');c.scale.set(1,1.15,1);}};
  for(const [x,z,s] of [[-12,-5.8,1.1],[-13.2,-1.8,1.3],[-11.6,2.2,1],[-14,5.2,1.2],[-16,-3.6,1.5],[1.6,-11.5,1.7],[-3,-13,1.3],[11,1.4,1],[12.6,-2.6,1.2],[11.2,4.6,.9]])tree(x,z,s);

  // Floor: one level slab with different finishes per volume and an axial travertine runner.
  ext(-8.2,8.2,-.3,0,-7.2,7.2,'floor');
  for(let z=-7;z<=4.41;z+=1.425)ext(-3.6,3.6,0,.004,z-.01,z+.01,'joint');
  for(const x of [-2.5,-1.3,1.3,2.5])ext(x-.01,x+.01,0,.004,-7,4.4,'joint');
  ext(-.75,.75,0,.005,-1.95,7,'travertine');for(const x of [-.75,.75])ext(x-.02,x+.02,0,.007,-1.95,7,'brass');
  ext(-8,-3.6,0,.003,-7,4.4,'bayfloor');for(let z=-6.3;z<4.4;z+=1.1)ext(-8,-3.6,0,.005,z-.008,z+.008,'joint');
  ext(3.6,8,0,.004,-7,-.6,'oak');for(let x=3.9;x<8;x+=.3)ext(x-.006,x+.006,0,.006,-7,-.6,'walnut');
  ext(-8,8,0,.006,4.25,4.55,'lime');ext(4.7,6.1,0,.008,5.7,6.95,'slate');

  // Walls. West: two tall windows flank a projecting oriel; the bay itself is 4.6 m high.
  const W=(z1,z2,y1,y2)=>ext(-8.2,-8,y1,y2,z1,z2,'plaster');
  W(-7.2,-6.5,0,4.75);W(-6.5,-5.1,0,.9);W(-6.5,-5.1,4,4.75);winX(-8.1,-6.5,-5.1,.9,4,2);W(-5.1,-4.6,0,4.75);
  W(.6,1.1,0,4.75);W(1.1,3.9,0,.9);W(1.1,3.9,4,4.75);winX(-8.1,1.1,3.9,.9,4,3);W(3.9,4.4,0,4.75);W(4.4,7.2,0,3.85);
  for(const [z1,z2] of [[-6.5,-5.1],[1.1,3.9]])ext(-8,-7.78,.84,.9,z1,z2,'lime');
  ext(-9.6,-8,-.3,0,-4.8,.8,'bayfloor');ext(-9.6,-8,4.6,4.75,-4.8,.8,'plaster');
  ext(-9.4,-8.2,0,4.75,-4.8,-4.6,'plaster');ext(-9.4,-8.2,0,4.75,.6,.8,'plaster');
  ext(-9.6,-9.4,0,.6,-4.8,.8,'lime');ext(-9.6,-9.4,4.1,4.75,-4.8,.8,'plaster');winX(-9.5,-4.6,.6,.6,4.1,5);
  ext(-9.4,-8.9,.56,.62,-4.6,.6,'lime');
  // North: bay wall, then the tall hall wall with a high slot window over the benchmark niche.
  ext(-8.2,-3.6,0,4.75,-7.2,-7,'plaster');ext(3.6,8.2,0,3.85,-7.2,-7,'plaster');
  ext(-3.6,-1.2,0,6.55,-7.2,-7,'plaster');ext(1.2,3.6,0,6.55,-7.2,-7,'plaster');ext(-1.2,1.2,0,4.3,-7.2,-7,'plaster');ext(-1.2,1.2,6.05,6.55,-7.2,-7,'plaster');
  winZ(-7.1,-1.2,1.2,4.3,6.05,3);
  // East: a small deep-set desk window in the alcove; two tall windows in the east gallery.
  const E=(z1,z2,y1,y2)=>ext(8,8.2,y1,y2,z1,z2,'plaster');
  E(-7.2,-3.2,0,3.85);E(-3.2,-2,0,1.3);E(-3.2,-2,2.4,3.85);winX(8.1,-3.2,-2,1.3,2.4,1);E(-2,.2,0,3.85);
  E(.2,1.8,0,.7);E(.2,1.8,3.2,3.85);winX(8.1,.2,1.8,.7,3.2,2);E(1.8,2.6,0,3.85);E(2.6,4.2,0,.7);E(2.6,4.2,3.2,3.85);winX(8.1,2.6,4.2,.7,3.2,2);E(4.2,7.2,0,3.85);
  ext(7.72,8,1.22,1.3,-3.3,-1.9,'oak');ext(7.72,8,2.4,2.48,-3.3,-1.9,'oak');ext(7.72,8,1.3,2.4,-3.3,-3.2,'oak');ext(7.72,8,1.3,2.4,-2,-1.9,'oak');
  ext(-8.2,8.2,0,3.85,7,7.2,'plaster');
  for(const [x1,x2,z1,z2] of [[-8,3.6,-7,-6.97],[-8,8,6.97,7],[-3.6,3.6,-7,-6.97]])ext(x1,x2,0,.13,z1,z2,'lime');

  // Ceilings: hall 6.4 m with a glazed lantern, bay 4.6 m on oak beams, gallery 3.7 m, alcove 2.9 m.
  const hc=(x1,x2,z1,z2)=>ext(x1,x2,6.4,6.55,z1,z2,'plaster');
  hc(-3.7,-1.6,-7.2,4.5);hc(1.6,3.7,-7.2,4.5);hc(-1.6,1.6,-7.2,-5.6);hc(-1.6,1.6,2.6,4.5);
  for(const x of [-1.6,1.6]){pane(x-.01,x+.01,6.55,7.3,-5.6,2.6);for(let z=-5.6;z<=2.61;z+=1.025)ext(x-.04,x+.04,6.55,7.3,z-.04,z+.04,'lime');}
  for(const z of [-5.6,2.6])pane(-1.6,1.6,6.55,7.3,z-.01,z+.01);
  for(const [x1,x2,z1,z2] of [[-1.7,1.7,-5.7,-5.5],[-1.7,1.7,2.5,2.7],[-1.7,-1.5,-5.7,2.7],[1.5,1.7,-5.7,2.7]])ext(x1,x2,7.3,7.42,z1,z2,'lime');
  const diffuser=plain(new T.PlaneGeometry(3.2,8.2),new T.MeshBasicMaterial({color:'#f6f8f0',side:T.DoubleSide}),0,7.3,-1.5);diffuser.rotation.x=Math.PI/2;
  for(let z=-5.6;z<=2.61;z+=1.37)ext(-3.6,3.6,6.12,6.4,z-.07,z+.07,'lime');
  ext(-9.6,-3.6,4.6,4.75,-7.2,4.4,'plaster');for(const z of [-5.8,-3.6,-1.4,.8,3])ext(-8,-3.6,4.36,4.6,z-.09,z+.09,'oak');
  ext(3.7,8.2,3.7,3.85,-.7,7.2,'plaster');ext(-8.2,3.7,3.7,3.85,4.4,7.2,'plaster');
  ext(3.7,8.2,2.9,3,-7.2,-.6,'oak');for(let z=-6.6;z<-.6;z+=.6)ext(3.7,8,2.84,2.9,z-.03,z+.03,'walnut');
  // Clerestory: the hall's west upper wall is glazed above the bay roof, so sun reaches the bench.
  ext(-3.75,-3.45,4.6,4.85,-7,4.4,'lime');ext(-3.75,-3.45,6.15,6.4,-7,4.4,'lime');pane(-3.61,-3.59,4.85,6.15,-7,4.4);
  for(let z=-7;z<=4.41;z+=1.425)ext(-3.7,-3.5,4.85,6.15,z-.07,z+.07,'lime');
  ext(3.5,3.7,2.9,6.55,-7.2,-.6,'plaster');ext(3.5,3.7,3.7,6.55,-.6,4.5,'plaster');ext(3.5,3.7,0,2.9,-7,-5.65,'plaster');
  ext(-3.6,3.6,3.7,6.55,4.3,4.5,'plaster');ext(-8,-3.6,3.7,4.6,4.3,4.5,'plaster');ext(-8,3.6,3.5,3.7,4.25,4.55,'lime');
  // Limestone piers set an uneven rhythm: an open colonnade west, a single low portal east.
  const pier=(x,z,h)=>{ext(x-.25,x+.25,0,h,z-.25,z+.25,'lime');ext(x-.31,x+.31,0,.16,z-.31,z+.31,'lime');ext(x-.3,x+.3,h-.14,h,z-.3,z+.3,'lime');};
  for(const z of [-5,-.6,2.8])pier(-3.6,z,4.6);pier(-3.6,4.4,3.7);pier(3.6,4.4,3.7);pier(3.6,-.6,3.7);
  ext(3.45,3.75,2.62,2.9,-5.7,-.4,'oak');

  // Hall: a niche on the axis frames the bench landmark beneath the slot window.
  ext(-2.65,-2.3,0,4.05,-7,-6.84,'lime');ext(2.3,2.65,0,4.05,-7,-6.84,'lime');ext(-2.8,2.8,4.05,4.2,-7,-6.8,'lime');
  ext(-2.2,2.2,2.45,3.95,-7,-6.92,'sage');
  text(['01 / BENCHMARK DISCOVERY'],0,3.42,-6.91,4.1,.56);
  text(['CATALOG · EVIDENCE · SOURCES'],0,2.86,-6.905,3.9,.28,'#49634e');
  ext(-2.2,2.2,0,.86,-7,-6.62,'sage');ext(-2.26,2.26,.86,.92,-7,-6.58,'linen');
  for(const [x,h,c] of [[-1.6,.34,'#c4a477'],[-1.2,.22,'linen'],[1.1,.28,'linen'],[1.5,.4,'#c4a477']])cylinder(x,.92+h/2,-6.8,.09,h,c,.07);

  // A separate comparison screen preserves the existing catalog monitor.
  const comparisonSource=document.createElement('canvas');comparisonSource.width=1280;comparisonSource.height=600;
  const comparisonTexture=new T.CanvasTexture(comparisonSource);comparisonTexture.colorSpace=T.SRGBColorSpace;
  box(0,1.90,-6.64,3.92,1.90,.12,'dark');
  const comparisonScreen=plain(new T.PlaneGeometry(3.8,1.78125),new T.MeshBasicMaterial({map:comparisonTexture}),0,1.90,-6.568);
  comparisonScreen.userData.comparison=true;
  // Benchmark workbench, same footprint; only this monitor and the exit are interactive.
  ext(-2.35,2.35,0,.12,-3.72,-2.18,'dark');
  for(const x of [-1.7,1.7]){ext(x-.7,x+.7,.12,.86,-3.78,-2.12,'sage');
    for(const [y1,y2] of [[.16,.42],[.46,.64],[.68,.84]]){ext(x-.64,x+.64,y1,y2,-2.13,-2.1,'#8fa48e');ext(x-.16,x+.16,(y1+y2)/2-.015,(y1+y2)/2+.015,-2.1,-2.07,'brass');}}
  ext(-1,1,.16,.2,-2.6,-2.5,'brass');
  ext(-2.6,2.6,.86,.96,-3.9,-2,'oak');ext(-2.5,2.5,.96,.985,-3.82,-2.08,'#cfd6c4');
  for(const x of [-2.4,2.4])ext(x-.04,x+.04,.985,1.6,-3.8,-3.72,'brass');ext(-2.44,2.44,1.56,1.6,-3.86,-3.5,'oak');
  for(const [x,w,h,c] of [[-2.1,.3,.22,'walnut'],[-1.65,.42,.14,'linen'],[1.55,.34,.26,'iron'],[2.05,.3,.18,'#c4a477']])ext(x-w/2,x+w/2,1.6,1.6+h,-3.84,-3.56,c);
  cylinder(.55,1.15,-2.65,.085,.38,'metal');box(.55,1.03,-2.65,.75,.04,.4,'metal');
  const computer=box(.55,1.67,-2.7,1.65,.99,.1,'dark');computer.userData.destination='catalog';
  const screen=text(['Benchmark','discovery'],.55,1.67,-2.637,1.48,.82,'#f7f4e8','#345a48');screen.userData.destination='catalog';
  box(.55,1.018,-2.24,1.17,.026,.27,'#61776b');
  box(-1.52,1.02,-2.76,.65,.07,.9,'brass');box(-1.5,1.07,-2.76,.59,.03,.84,'paper');
  const notebook=box(-1.5,1.09,-2.76,.56,.02,.8,'#8b9c7d');notebook.rotation.y=.12;
  cylinder(1.83,1.09,-3.2,.16,.28,'paper');cylinder(1.83,1.24,-3.2,.12,.018,'#746449');
  cylinder(-.3,.62,-3.05,.2,.05,'oak');for(const a of [0,2.1,4.2])cylinder(-.3+Math.cos(a)*.13,.3,-3.05+Math.sin(a)*.13,.02,.6,'iron');
  // Two pendants hang from the lantern ribs; their glow is static, not an animated light.
  for(const x of [-1.5,2]){cylinder(x,4.5,-2.95,.012,3.8,'brass');mesh(new T.ConeGeometry(.3,.24,24),'dark',x,2.48,-2.95);
    const lit=plain(new T.CircleGeometry(.25,24),glow,x,2.355,-2.95);lit.rotation.x=Math.PI/2;}

  // West bay apparatus bench: soapstone top on an oak frame, composed working groups.
  ext(-7.85,-6.2,.9,.98,-5.9,1.5,'slate');ext(-7.8,-6.25,.78,.9,-5.85,1.45,'oak');
  for(const z of [-5.8,-2.2,1.4])for(const x of [-7.72,-6.33])ext(x-.04,x+.04,0,.78,z-.04,z+.04,'oak');
  ext(-7.75,-6.3,.2,.25,-5.8,1.4,'oak');
  for(let z=-5.5;z<1.3;z+=.62)cylinder(-7.05,.25+.16,z,.13,.32,(Math.round(z*10)%2)?'#c4a477':'linen',.11);
  // Electromagnet on a timber plinth, with binding posts.
  ext(-7.35,-6.75,.98,1.06,-5.45,-4.75,'oak');ext(-7.15,-6.95,1.06,1.16,-5.35,-4.85,'iron');
  for(const z of [-5.25,-4.95]){cylinder(-7.05,1.42,z,.06,.55,'iron');cylinder(-7.05,1.36,z,.115,.32,'copper');cylinder(-7.05,1.71,z,.075,.04,'brass');}
  ext(-7.12,-6.98,1.76,1.81,-5.33,-4.87,'brass');for(const z of [-5.35,-4.85])cylinder(-6.82,1.1,z,.025,.08,'brass');
  // Bell jar on a brass plate beside a hand pump.
  cylinder(-7.05,1.0,-3.75,.3,.04,'brass');plain(new T.CylinderGeometry(.22,.22,.42,28,1,true),vessel,-7.05,1.23,-3.75);
  plain(new T.SphereGeometry(.22,28,10,0,Math.PI*2,0,Math.PI/2),vessel,-7.05,1.44,-3.75);sphere(-7.05,1.68,-3.75,.035,'brass');
  ext(-7.2,-6.9,.98,1.02,-3.35,-3.05,'iron');cylinder(-7.05,1.32,-3.2,.055,.6,'brass');
  const lever=box(-7.05,1.66,-3.32,.04,.04,.42,'iron');lever.rotation.x=.35;sphere(-7.05,1.73,-3.52,.035,'walnut');ext(-7.07,-7.03,1.02,1.05,-3.48,-3.25,'brass');
  // Retort stand with ring, flask and spirit burner; a rack of test tubes.
  ext(-7.3,-6.8,.98,1.01,-2.45,-2,'iron');cylinder(-7.2,1.5,-2.35,.012,1.0,'iron');
  const ring=mesh(new T.TorusGeometry(.09,.012,8,24),'iron',-7.0,1.25,-2.2);ring.rotation.x=Math.PI/2;ext(-7.2,-7.08,1.24,1.26,-2.33,-2.27,'iron');
  plain(new T.SphereGeometry(.13,20,14),vessel,-7.0,1.37,-2.2);plain(new T.CylinderGeometry(.03,.03,.2,14),vessel,-7.0,1.58,-2.2);
  cylinder(-7.0,1.05,-2.2,.05,.08,'#c4d3cc');cylinder(-7.0,1.1,-2.2,.02,.03,'brass');
  ext(-7.25,-6.85,.98,1.1,-1.85,-1.55,'oak');for(let i=0;i<5;i++)plain(new T.CylinderGeometry(.018,.018,.24,10),vessel,-7.17+i*.08,1.18,-1.7);
  // A wound coil on a frame, with a small dial instrument.
  ext(-7.35,-6.75,.98,1.03,-1.2,-.2,'oak');for(const z of [-1.1,-.3])ext(-7.1,-7,1.03,1.45,z-.03,z+.03,'oak');
  const axle=cylinder(-7.05,1.3,-.7,.012,.86,'brass');axle.rotation.x=Math.PI/2;
  for(let i=0;i<10;i++)mesh(new T.TorusGeometry(.12,.022,8,24),'copper',-7.05,1.3,-1.0+i*.066);
  cylinder(-7.05,1.03,.15,.14,.1,'walnut');const dial=plain(new T.CircleGeometry(.12,24),new T.MeshLambertMaterial({color:'#faf7e8'}),-7.05,1.081,.15);dial.rotation.x=-Math.PI/2;
  const needle=box(-7.05,1.088,.11,.01,.006,.1,'dark');needle.rotation.y=.5;
  // Balance in a glazed case.
  ext(-7.4,-6.66,.98,1.06,.6,1.35,'walnut');plain(new T.BoxGeometry(.7,.55,.7),vessel,-7.03,1.335,.975);
  for(const [x,z] of [[-7.38,.62],[-7.38,1.33],[-6.68,.62],[-6.68,1.33]])ext(x-.012,x+.012,1.06,1.61,z-.012,z+.012,'brass');
  cylinder(-7.03,1.25,.975,.015,.38,'brass');ext(-7.04,-7.02,1.43,1.45,.74,1.21,'brass');
  for(const z of [.78,1.17]){cylinder(-7.03,1.31,z,.004,.24,'brass');cylinder(-7.03,1.19,z,.07,.01,'brass');}
  // Tall glazed specimen case on the bay's north wall.
  ext(-5.9,-3.95,0,.9,-7,-6.45,'sage');ext(-5.95,-3.9,.9,.96,-7,-6.4,'linen');
  for(const x of [-5.9,-4.01])ext(x,x+.06,.96,2.9,-7,-6.6,'oak');ext(-5.9,-3.95,2.9,2.98,-7,-6.58,'oak');pane(-5.84,-4.01,.96,2.9,-6.61,-6.59);
  for(const y of [1.5,2.15]){ext(-5.84,-4.01,y,y+.04,-7,-6.64,'oak');for(let i=0;i<6;i++){const h=.2+(i%3)*.08;cylinder(-5.6+i*.3,y+.04+h/2,-6.82,.07,h,i%2?'paper':'#c4a477');cylinder(-5.6+i*.3,y+.06+h,-6.82,.074,.03,'brass');}}
  const plant=(x,z)=>{cylinder(x,.29,z,.3,.58,'#b79b78',.37);cylinder(x,.6,z,.31,.03,'#776f53');
    for(let i=0;i<13;i++){const a=i*2.4;const leaf=sphere(x+Math.cos(a)*.25,.8+i*.052,z+Math.sin(a)*.25,.18,i%2?'#729169':'#8eaa7c');leaf.scale.set(.5,1.8,.6);leaf.rotation.z=Math.cos(a)*.6;leaf.rotation.x=Math.sin(a)*.6;}};
  plant(-9,-4.15);plant(-9,.15);plant(-7,4.8);

  // East study alcove: oak floor and ceiling, distemper walls, books, a desk under its own window.
  ext(3.85,8,0,2.9,-.7,-.5,'oak');ext(3.7,8,2.9,3.7,-.7,-.5,'plaster');
  ext(3.7,8,0,1.05,-7,-6.96,'oak');ext(3.7,8,1.05,2.84,-7,-6.98,'distemper');
  ext(7.96,8,0,1.05,-7,-.7,'oak');for(const [z1,z2] of [[-7,-3.3],[-1.9,-.7]])ext(7.97,8,1.05,2.84,z1,z2,'distemper');
  ext(3.85,8,0,1.05,-.5,-.48,'walnut');
  ext(4.2,6.8,0,.008,-4.7,-1.9,'#d9c49a');ext(4.35,6.65,0,.012,-4.55,-2.05,'#9a5f45');
  let seed=7;const rnd=()=>(seed=(seed*9301+49297)%233280)/233280;const spines=['#7b4b3a','#4f6a5a','#a88c5f','#3e4f5e','#c9b998','#6d5a43','#8a6f4e'];
  ext(3.85,3.92,0,2.4,-7,-6.62,'walnut');ext(6.28,6.35,0,2.4,-7,-6.62,'walnut');ext(3.85,6.35,2.4,2.46,-7,-6.6,'walnut');
  for(const y of [.08,.56,1.04,1.52,1.98]){ext(3.92,6.28,y,y+.04,-7,-6.64,'walnut');let x=3.96;
    while(x<6.14){const w=.06+rnd()*.06,h=.26+rnd()*.13;if(rnd()<.1){x+=.14;continue;}ext(x,Math.min(x+w,6.26),y+.04,y+.04+h,-6.95,-6.7,spines[Math.floor(rnd()*spines.length)]);x+=w+.005;}}
  plant(7,-5.9);
  // Writing desk with a recording-instrument study under a brass task lamp.
  ext(7.15,7.95,.74,.79,-3.7,-1.5,'walnut');ext(7.2,7.9,0,.74,-3.65,-3.05,'walnut');for(const x of [7.2,7.86])ext(x,x+.04,0,.74,-1.58,-1.54,'walnut');
  for(const y of [.2,.45])ext(7.18,7.19,y,y+.02,-3.45,-3.25,'brass');
  ext(7.25,7.85,.79,.95,-2.75,-2.05,'slate');cylinder(7.55,.965,-2.4,.25,.015,'brass');cylinder(7.55,.98,-2.4,.24,.02,'iron');cylinder(7.55,1.0,-2.4,.012,.04,'brass');
  cylinder(7.78,.99,-2.13,.04,.06,'brass');const arm=box(7.69,1.03,-2.26,.018,.018,.32,'brass');arm.rotation.y=.6;
  ext(7.45,7.9,.79,1.25,-3.55,-2.95,'#5a5f55');for(const z of [-3.4,-3.1]){const knob=cylinder(7.435,1.06,z,.04,.03,'brass');knob.rotation.z=Math.PI/2;}
  const meter=plain(new T.PlaneGeometry(.22,.1),new T.MeshLambertMaterial({color:'#efe6cc'}),7.445,1.17,-3.25);meter.rotation.y=-Math.PI/2;
  cylinder(7.3,.81,-1.75,.1,.04,'brass');cylinder(7.3,1.07,-1.75,.012,.5,'brass');ext(7.29,7.31,1.31,1.33,-2.3,-1.75,'brass');
  mesh(new T.ConeGeometry(.15,.16,24),'green',7.3,1.27,-2.3);sphere(7.3,1.18,-2.3,.035,'#fff1d0').material=glow;
  const lamp=new T.PointLight('#ffd49a',3,4.5,1.6);lamp.position.set(7.3,1.12,-2.3);scene.add(lamp);
  ext(6.25,6.75,.42,.48,-2.7,-2.2,'walnut');ext(6.27,6.73,.48,.54,-2.68,-2.22,'green');ext(6.2,6.26,.48,1.05,-2.7,-2.2,'walnut');
  for(const [x,z] of [[6.27,-2.68],[6.27,-2.22],[6.73,-2.68],[6.73,-2.22]])ext(x-.02,x+.02,0,.42,z-.02,z+.02,'walnut');

  // East gallery: chalkboard of field-line and coil sketches (no text), and a window seat.
  const chalk=document.createElement('canvas');chalk.width=1024;chalk.height=480;const k=chalk.getContext('2d');
  k.fillStyle='#38443f';k.fillRect(0,0,1024,480);k.strokeStyle='rgba(238,234,218,.72)';k.lineWidth=4;k.lineCap='round';
  k.beginPath();k.moveTo(170,330);k.lineTo(170,210);k.arc(250,210,80,Math.PI,0);k.lineTo(330,330);k.stroke();
  for(let i=1;i<6;i++){k.beginPath();k.ellipse(250,330,80+i*26,i*30,0,Math.PI,0,true);k.stroke();}
  for(let i=0;i<9;i++){k.beginPath();k.ellipse(520+i*26,240,16,70,0,0,Math.PI*2);k.stroke();}
  k.beginPath();k.moveTo(470,240);k.lineTo(800,240);k.stroke();k.beginPath();k.arc(900,200,60,0,Math.PI*2);k.stroke();k.beginPath();k.moveTo(820,300);k.lineTo(990,110);k.stroke();
  k.fillStyle='rgba(238,234,218,.06)';k.fillRect(420,340,420,80);
  const chalkTexture=new T.CanvasTexture(chalk);chalkTexture.colorSpace=T.SRGBColorSpace;
  ext(4.3,7.5,.95,2.65,-.5,-.44,'oak');plain(new T.PlaneGeometry(3,1.5),new T.MeshLambertMaterial({map:chalkTexture}),5.9,1.8,-.435);ext(4.4,7.4,.98,1.02,-.44,-.36,'oak');
  ext(7.55,8,0,.4,.1,4.3,'lime');ext(7.5,8,.4,.46,.1,4.3,'oak');

  // South gallery: low stone seat with brass pegs; the exit door keeps its exact place.
  ext(-6.2,-1.8,0,.4,6.6,7,'lime');ext(-6.25,-1.75,.4,.46,6.55,7,'oak');for(let x=-5.8;x<-1.9;x+=.55)sphere(x,1.75,6.95,.04,'brass');
  const door=box(5.4,1.49,6.92,1.55,2.95,.055,'#749080');door.userData.destination='home';
  for(const y of [.75,2.2])ext(4.85,5.95,y-.5,y+.5,6.88,6.89,'#83a08f');
  box(4.53,1.6,6.85,.16,3.25,.18,'lime');box(6.27,1.6,6.85,.16,3.25,.18,'lime');box(5.4,3.17,6.85,1.9,.16,.18,'lime');
  box(5.96,1.15,6.84,.035,.3,.07,'brass');
  const exit=text(['EXIT / HOME'],5.4,3.45,6.83,1.7,.34,'#284b3b');exit.rotation.y=Math.PI;exit.userData.destination='home';
  const doorLabel=text(['Home ↗'],5.4,2.3,6.865,1.17,.42);doorLabel.rotation.y=Math.PI;doorLabel.userData.destination='home';

  const targetMarker=new T.Mesh(new T.RingGeometry(.17,.22,32),new T.MeshBasicMaterial({color:'#224e40',side:T.DoubleSide,depthWrite:false}));
  targetMarker.rotation.x=-Math.PI/2;targetMarker.position.y=.025;targetMarker.visible=false;scene.add(targetMarker);
  const raycaster=new T.Raycaster();const pointer=new T.Vector2();let disposed=false;
  const lost=(event)=>{event.preventDefault();onLost();};canvas.addEventListener('webglcontextlost',lost);
  return {
    comparison(source){if(disposed)return;comparisonSource.getContext('2d').drawImage(source,0,0);comparisonTexture.needsUpdate=true;},
    draw(p){if(disposed)return;const w=canvas.clientWidth,h=canvas.clientHeight;const size=renderer.getSize(new T.Vector2());if(size.x!==w||size.y!==h){renderer.setSize(w,h,false);camera.aspect=w/h;camera.fov=w/h<1?78:65;camera.updateProjectionMatrix();}camera.position.set(p.x,1.68,p.z);camera.rotation.set(p.pitch,p.yaw,0);renderer.render(scene,camera);},
    pick(clientX,clientY){
      const rect=canvas.getBoundingClientRect();pointer.set((clientX-rect.left)/rect.width*2-1,-(clientY-rect.top)/rect.height*2+1);raycaster.setFromCamera(pointer,camera);
      const first=raycaster.intersectObjects(scene.children,false).find(hit=>hit.object!==targetMarker);
      if(!first||first.distance>24)return null;
      if(first.object.userData.comparison&&first.uv)return {comparison:{x:first.uv.x*1280,y:(1-first.uv.y)*600}};
      const {x,y,z}=first.point;
      const destination=first.object.userData.destination||(x>=-2.6&&x<=2.6&&z>=-3.95&&z<=-2&&y<2.4?'catalog':x>4.6&&x<6.2&&z>6.7&&z<7&&y<3.7?'home':null);
      if(destination)return {destination};
      if(Math.abs(x)>7.95||Math.abs(z)>6.95)return null;
      if(y<=.035)return {point:{x,z},approach:false};
      const bounds=new T.Box3().setFromObject(first.object);
      if(bounds.max.y>3||y>2.6)return null; // walls, glazing, roofs and exterior scenery
      return {point:{x,z},approach:true};
    },
    target(p){targetMarker.visible=!!p;if(p)targetMarker.position.set(p.x,.025,p.z);},
    dispose(){disposed=true;canvas.removeEventListener('webglcontextlost',lost);scene.traverse(o=>{o.geometry?.dispose();if(o.material){for(const m of [].concat(o.material)){m.map?.dispose();m.dispose();}}});renderer.dispose();},
  };
}

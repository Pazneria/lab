import * as THREE from '/vendor/three.module.js';

// K-17: a human-scale field shelter at a still, clear polar dusk.
const canvas = document.querySelector('#scene');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(72, innerWidth / innerHeight, 0.06, 180);
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance', alpha: false });
renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.45));
renderer.setSize(innerWidth, innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.08;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.info.autoReset = true;

const v = (x=0,y=0,z=0) => new THREE.Vector3(x,y,z);
const mat = (color, roughness=.7, metalness=0, extra={}) => new THREE.MeshStandardMaterial({ color, roughness, metalness, ...extra });
const snowGrain = makeGrainTexture(192, 920, 2);
const clothGrain = makeGrainTexture(192, 520, 3);
const snowMat = mat(0xd6e5ef, .95, .015, { map:snowGrain, bumpMap:snowGrain, bumpScale:.035, vertexColors:true });
const roofSnowMat = mat(0xe0eaf0, .9, .015, { map:snowGrain, bumpMap:snowGrain, bumpScale:.018 });
const frostMat = mat(0xeaf5f7, .33, .16, { transparent:true, opacity:.63, depthWrite:false });
const blueGlass = mat(0x90c4e7, .13, .27, { transparent:true, opacity:.35, depthWrite:false, side:THREE.DoubleSide, emissive:0x11283e, emissiveIntensity:.1 });
const darkMetal = mat(0x273744, .42, .78);
const steel = mat(0x91a5b3, .3, .8);
const brass = mat(0xc39b68, .34, .62);
const frostSteel = mat(0xb9c9d0, .31, .68);
const gasket = mat(0x374954, .85, .12);
const outerWhite = mat(0xd4e0e5, .7, .08, { map:clothGrain, bumpMap:clothGrain, bumpScale:.012 });
const outerPanel = mat(0xb8c8d1, .65, .14, { map:clothGrain, bumpMap:clothGrain, bumpScale:.012 });
const innerPanel = mat(0xc7cbc5, .82, .025, { map:clothGrain, bumpMap:clothGrain, bumpScale:.008 });
const innerPanelAlt = mat(0xb4bcb9, .82, .025, { map:clothGrain, bumpMap:clothGrain, bumpScale:.008 });
const floorMat = mat(0x6f797a, .79, .1);
const rubber = mat(0x283237, .91, .025);
const timber = mat(0x775b46, .68, .025, { map:clothGrain, bumpMap:clothGrain, bumpScale:.012 });
const timberLight = mat(0xb18a65, .58, .04);
const warmFabric = mat(0x596959, .98, 0, { map:clothGrain, bumpMap:clothGrain, bumpScale:.025 });
const amber = new THREE.MeshStandardMaterial({ color:0xffc773, emissive:0xff9e46, emissiveIntensity:1.15, roughness:.3 });
const displayMat = new THREE.MeshStandardMaterial({ color:0xe4e8df, emissive:0x62735c, emissiveIntensity:.46, roughness:.3, metalness:.08 });

const colliders = [];
const world = new THREE.Group();
scene.add(world);
const cubeGeo = new THREE.BoxGeometry(1,1,1);
const sphereGeo = new THREE.SphereGeometry(1,16,10);
const lowSphereGeo = new THREE.SphereGeometry(1,10,7);
const cylGeo = new THREE.CylinderGeometry(1,1,1,16,1,false);
const boltGeo = new THREE.CylinderGeometry(1,1,1,12,1,false);
const coneGeo = new THREE.ConeGeometry(1,1,10,1,false);
const up = v(0,1,0);

function addBox(name, size, pos, material, opts={}) {
  const mesh = new THREE.Mesh(cubeGeo, material);
  mesh.name = name;
  mesh.scale.set(size[0],size[1],size[2]);
  mesh.position.set(pos[0],pos[1],pos[2]);
  if (opts.rot) mesh.rotation.set(opts.rot[0]||0,opts.rot[1]||0,opts.rot[2]||0);
  mesh.castShadow = opts.cast ?? true;
  mesh.receiveShadow = opts.receive ?? true;
  if (opts.parent) opts.parent.add(mesh); else world.add(mesh);
  if (opts.hit) {
    const c=Math.abs(Math.cos(mesh.rotation.y)), s=Math.abs(Math.sin(mesh.rotation.y));
    const hx=(size[0]*c+size[2]*s)/2, hz=(size[2]*c+size[0]*s)/2;
    colliders.push({minX:pos[0]-hx,maxX:pos[0]+hx,minZ:pos[2]-hz,maxZ:pos[2]+hz,minY:pos[1]-size[1]/2,maxY:pos[1]+size[1]/2});
  }
  return mesh;
}
function addCyl(name, rt, rb, h, pos, material, opts={}) {
  const geo = (Math.abs(rt-rb)<.0001 ? cylGeo : new THREE.CylinderGeometry(rt,rb,h,opts.radial||12));
  const mesh = new THREE.Mesh(geo, material);
  mesh.name=name;mesh.position.set(...pos);
  if (geo !== cylGeo) mesh.scale.set(1,1,1); else mesh.scale.set(rt,h,rt);
  if (opts.quat) mesh.quaternion.copy(opts.quat);
  if (opts.rot) mesh.rotation.set(...opts.rot);
  mesh.castShadow=opts.cast??true;mesh.receiveShadow=opts.receive??true;
  (opts.parent||world).add(mesh);
  return mesh;
}
function addSphere(name, radius, pos, material, opts={}) {
  const mesh=new THREE.Mesh(opts.geo||sphereGeo,material);mesh.name=name;mesh.position.set(...pos);mesh.scale.set(radius*(opts.sx||1),radius*(opts.sy||1),radius*(opts.sz||1));
  if(opts.rot)mesh.rotation.set(...opts.rot);mesh.castShadow=opts.cast??true;mesh.receiveShadow=opts.receive??true;(opts.parent||world).add(mesh);return mesh;
}
function addTube(name, pts, radius, material, opts={}) {
  const curve=new THREE.CatmullRomCurve3(pts.map(p=>Array.isArray(p)?v(...p):p));
  const mesh=new THREE.Mesh(new THREE.TubeGeometry(curve,Math.max(12,pts.length*8),radius,7,false),material);mesh.name=name;mesh.castShadow=true;mesh.receiveShadow=true;(opts.parent||world).add(mesh);return mesh;
}
function addPlane(name,w,h,pos,material,rotation=[0,0,0],opts={}){
  const mesh=new THREE.Mesh(new THREE.PlaneGeometry(w,h),material);mesh.name=name;mesh.position.set(...pos);mesh.rotation.set(...rotation);mesh.castShadow=opts.cast??false;mesh.receiveShadow=opts.receive??false;(opts.parent||world).add(mesh);return mesh;
}
function addLight(color,intensity,distance,pos,castShadow=false){const l=new THREE.PointLight(color,intensity,distance,2);l.position.set(...pos);l.castShadow=castShadow;if(castShadow){l.shadow.mapSize.set(512,512);l.shadow.bias=-.0005;}scene.add(l);return l;}
function wallLightFixture(x,y,z,front=true){
  addBox('weather hood', [.22,.11,.14],[x,y+.07,z],darkMetal);
  addBox('amber lens',[.145,.10,.07],[x,y,z+(front?-.08:.08)],amber);
  addLight(0xffbd77,5.8,4.3,[x,y-.1,z+(front?-.16:.16)]);
}
function orientY(normal){return new THREE.Quaternion().setFromUnitVectors(up,v(...normal).normalize());}
function fastener(pos,normal=[0,0,-1],r=.039){
  const q=orientY(normal), body=new THREE.Mesh(boltGeo,steel);body.scale.set(r*.72,.014,r*.72);
  body.position.set(...pos);body.quaternion.copy(q);body.castShadow=true;world.add(body);
  const slot=new THREE.Mesh(cubeGeo,gasket);slot.scale.set(r*.85,.005,.008);slot.position.set(...pos).add(v(...normal).normalize().multiplyScalar(.009));slot.quaternion.copy(q);world.add(slot);
}
function makeGrainTexture(size,count,seed){
  const c=document.createElement('canvas');c.width=c.height=size;const cx=c.getContext('2d');cx.fillStyle='#aaa';cx.fillRect(0,0,size,size);
  let s=seed|0;const rand=()=>{s=(s*1664525+1013904223)|0;return (s>>>0)/4294967296;};
  for(let i=0;i<count;i++){const a=rand(),x=rand()*size,y=rand()*size,r=.25+rand()*1.2;const k=Math.round(115+a*120);cx.fillStyle=`rgba(${k},${k},${k},${.07+rand()*.22})`;cx.beginPath();cx.arc(x,y,r,0,Math.PI*2);cx.fill();}
  const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(1,1);t.colorSpace=THREE.NoColorSpace;t.anisotropy=Math.min(renderer.capabilities.getMaxAnisotropy(),4);return t;
}
function labelTexture(title,sub,accent='#dbb47c',lines=[]){
  const c=document.createElement('canvas');c.width=768;c.height=320;const g=c.getContext('2d');
  g.fillStyle='#263743';g.fillRect(0,0,c.width,c.height);g.fillStyle=accent;g.fillRect(26,27,7,266);
  g.fillStyle='#dfe8e8';g.font='600 43px Arial';g.fillText(title.toUpperCase(),56,97);
  g.fillStyle='#aabac0';g.font='22px Arial';g.fillText(sub.toUpperCase(),58,137);
  g.strokeStyle='rgba(217,229,231,.24)';g.lineWidth=2;g.beginPath();g.moveTo(57,163);g.lineTo(723,163);g.stroke();
  lines.slice(0,4).forEach((t,i)=>{g.fillStyle=i===0?'#d8c3a4':'#c5d0d0';g.font=`${i===0?'600 ':''}20px Arial`;g.fillText(t,58,202+i*26);});
  const tex=new THREE.CanvasTexture(c);tex.colorSpace=THREE.SRGBColorSpace;tex.anisotropy=4;
  return new THREE.MeshBasicMaterial({map:tex,side:THREE.DoubleSide,toneMapped:false});
}
function screenTexture(){
  const c=document.createElement('canvas');c.width=768;c.height=512;const g=c.getContext('2d');
  g.fillStyle='#101d23';g.fillRect(0,0,768,512);g.fillStyle='#9bb39b';g.font='600 27px monospace';g.fillText('FIELD LOG   /   K-17',30,50);
  g.fillStyle='#899b91';g.font='19px monospace';g.fillText('ICE CORE 04  ·  SURFACE ARRAY',30,81);
  g.strokeStyle='#4c625f';g.lineWidth=2;g.strokeRect(27,110,714,245);
  for(let i=1;i<6;i++){g.beginPath();g.moveTo(28,110+i*40);g.lineTo(740,110+i*40);g.stroke();}
  for(let i=1;i<9;i++){g.beginPath();g.moveTo(28+i*79,110);g.lineTo(28+i*79,355);g.stroke();}
  g.beginPath();g.moveTo(42,308);g.lineTo(111,283);g.lineTo(170,295);g.lineTo(228,244);g.lineTo(291,258);g.lineTo(357,196);g.lineTo(428,213);g.lineTo(490,176);g.lineTo(552,191);g.lineTo(621,140);g.lineTo(717,154);g.strokeStyle='#e5b77d';g.lineWidth=5;g.stroke();
  g.fillStyle='#b9c8bd';g.font='18px monospace';g.fillText('TEMP   −31.8° C',32,399);g.fillText('WIND   04.2 m/s',285,399);g.fillText('CORE   STABLE',544,399);
  g.fillStyle='#66796f';g.fillRect(31,433,710,1);g.fillStyle='#d2bc99';g.font='18px monospace';g.fillText('LOCAL ARCHIVE  /  22:14 UTC',32,472);
  const tex=new THREE.CanvasTexture(c);tex.colorSpace=THREE.SRGBColorSpace;tex.anisotropy=4;
  return new THREE.MeshStandardMaterial({map:tex,emissiveMap:tex,emissive:0x6d927e,emissiveIntensity:.34,roughness:.4,side:THREE.DoubleSide});
}

// Cool high sky, pale horizon glow, and a small, sharp clear-sky star field.
const sky = new THREE.Mesh(new THREE.SphereGeometry(150,32,22),new THREE.ShaderMaterial({
  side:THREE.BackSide,depthWrite:false,toneMapped:false,
  vertexShader:`varying vec3 d; void main(){d=normalize((modelMatrix*vec4(position,0.0)).xyz);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
  fragmentShader:`varying vec3 d; void main(){float h=clamp(d.y,0.0,1.0);vec3 low=vec3(.50,.70,.80);vec3 middle=vec3(.115,.235,.40);vec3 high=vec3(.020,.045,.105);float a=smoothstep(.00,.30,h);float b=smoothstep(.28,.92,h);vec3 c=mix(low,middle,a);c=mix(c,high,b);float belt=exp(-pow((h-.035)/.026,2.0));c+=vec3(.115,.075,.035)*belt*.27;float haze=exp(-pow((h-.075)/.095,2.0));c+=vec3(.12,.19,.24)*haze*.23;gl_FragColor=vec4(c,1.0);}`
}));sky.position.copy(camera.position);scene.add(sky);
const starPos=[];let rng=23145;const rnd=()=>{rng=(rng*1664525+1013904223)>>>0;return rng/4294967296;};
for(let i=0;i<180;i++){const a=rnd()*Math.PI*2,y=.08+rnd()*.88,rr=1;starPos.push(Math.cos(a)*Math.sqrt(1-y*y)*rr,y,Math.sin(a)*Math.sqrt(1-y*y)*rr);}
const starGeo=new THREE.BufferGeometry();starGeo.setAttribute('position',new THREE.Float32BufferAttribute(starPos,3));
const starField=new THREE.Points(starGeo,new THREE.PointsMaterial({color:0xcbdff1,size:.72,sizeAttenuation:false,transparent:true,opacity:.58,depthWrite:false}));
starField.scale.setScalar(110);starField.position.copy(camera.position);scene.add(starField);
scene.add(new THREE.HemisphereLight(0xc8e1ff,0x25344a,.76));
const moonFill=new THREE.DirectionalLight(0x82a9d9,1.15);moonFill.position.set(-12,17,-9);moonFill.castShadow=true;moonFill.shadow.mapSize.set(2048,2048);moonFill.shadow.camera.left=-23;moonFill.shadow.camera.right=23;moonFill.shadow.camera.top=20;moonFill.shadow.camera.bottom=-20;moonFill.shadow.camera.near=1;moonFill.shadow.camera.far=55;moonFill.shadow.bias=-.00028;moonFill.shadow.normalBias=.024;scene.add(moonFill);scene.add(moonFill.target);

// Low layered ridges keep the horizon present without enlarging the walkable site.
function addMountainLayer(seed,z,color,scale=1,offset=0){
  let q=seed;const rand=()=>{q=(q*1664525+1013904223)>>>0;return q/4294967296;};
  const pts=[[-62,-4]];let x=-62;
  while(x<62){x+=4+rand()*5;const peak=5+rand()*10;pts.push([Math.min(x,62),peak]);if(rand()>.48)pts.push([Math.min(x+1.1,62),peak*.78]);}
  pts.push([62,-4]);
  const shape=new THREE.Shape();shape.moveTo(pts[0][0],pts[0][1]);for(const p of pts.slice(1))shape.lineTo(p[0],p[1]);shape.closePath();
  const geo=new THREE.ShapeGeometry(shape,1);const mountain=new THREE.Mesh(geo,mat(color,.98,0,{flatShading:true,side:THREE.DoubleSide}));mountain.position.set(offset,0,z);mountain.scale.setScalar(scale);mountain.castShadow=true;mountain.receiveShadow=true;scene.add(mountain);
  const north=mountain.clone();north.position.set(-offset,0,-z);north.scale.set(-scale,scale,scale);scene.add(north);
  const east=mountain.clone();east.position.set(Math.abs(z),0,-offset);east.rotation.y=Math.PI/2;east.scale.set(scale,scale,scale);scene.add(east);
  const west=mountain.clone();west.position.set(-Math.abs(z),0,offset);west.rotation.y=-Math.PI/2;west.scale.set(scale,scale,scale);scene.add(west);
  // A thin raised snow line catches the last cool light on the upper ridges.
  for(let i=2;i<pts.length-2;i+=2){const p=pts[i];if(p[1]>5&&rand()>.30){const cap=new THREE.Mesh(new THREE.ConeGeometry(.85,1.3,4),roofSnowMat);cap.rotation.z=(rand()-.5)*.3;cap.position.set(offset+p[0]*scale,p[1]*scale+.28,z+.24);cap.scale.set(2.2*scale,.8*scale,.28);scene.add(cap);}}
}
addMountainLayer(731,-72,0x2f4567,.88,-5);
addMountainLayer(921,-83,0x435b7c,.72,9);
addMountainLayer(501,-96,0x263957,.72,0);

// A gently rolling snow field with elongated wind combs and a soft lee bank.
function gauss(x,z,cx,cz,sx,sz){return Math.exp(-((x-cx)*(x-cx)/(sx*sx)+(z-cz)*(z-cz)/(sz*sz)));}
function snowHeight(x,z){
  const broad=.045*Math.sin(z*.56+.42*Math.sin(x*.31))+.025*Math.sin(x*.73+z*.19)+.018*Math.cos(x*.3-z*.88);
  const comb=.052*Math.sin(z*1.23+.34*Math.sin(x*.52))+.021*Math.sin(z*2.15+.19*x);
  const lee=.56*gauss(x, z, -5.0,1.4,2.2,6.9)+.64*gauss(x,z,5.0,1.8,2.0,6.8)+.48*gauss(x,z,0,7.0,7.2,3.5);
  const foreground=.31*gauss(x,z,-5.3,-9.2,2.0,3.5)+.24*gauss(x,z,5.9,-8.2,3.0,2.7);
  const t=THREE.MathUtils.clamp((z+3.4)/12.2,0,1);
  const ridgeCenter=5.4+1.35*Math.sin(Math.PI*t);
  const flank=Math.pow(Math.max(0,Math.sin(Math.PI*t)),.72);
  const windbreak=1.22*flank*Math.exp(-Math.pow((Math.abs(x)-ridgeCenter)/1.55,2));
  const y=-.06+broad+comb+lee+foreground+windbreak;
  // Settle a smooth, broad compacted threshold apron to the top of the entrance ramp.
  const apron=Math.exp(-Math.pow(x/2.1,4)-Math.pow((z+5.3)/2.25,4));
  const target=.46+Math.max(0,Math.min(1,(-z-4.7)/2.0))*(-.39);
  return THREE.MathUtils.lerp(y,target,apron*.93);
}
function makeTerrain(){
  const nx=132,nz=122,x0=-28.5,z0=-26.5,dx=.44,dz=.44;
  const pos=[],uv=[],col=[],idx=[];
  for(let j=0;j<=nz;j++)for(let i=0;i<=nx;i++){
    const x=x0+i*dx,z=z0+j*dz,y=snowHeight(x,z);pos.push(x,y,z);uv.push(x*.28,z*.28);
    const m=.965+rnd()*.055;col.push(.94*m,.972*m,1*m);
  }
  for(let j=0;j<nz;j++)for(let i=0;i<nx;i++){const a=j*(nx+1)+i,b=a+1,c=a+nx+1,d=c+1;idx.push(a,c,b,b,c,d);}
  const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));geo.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));geo.setAttribute('color',new THREE.Float32BufferAttribute(col,3));geo.setIndex(idx);geo.computeVertexNormals();
  const mesh=new THREE.Mesh(geo,snowMat);mesh.name='wind-shaped sheltered snow';mesh.receiveShadow=true;mesh.frustumCulled=false;world.add(mesh);
}
makeTerrain();
// The twin lee drifts are part of the terrain height field, so walking their shoulders stays grounded.
// Snowshoe compaction and boot hollows on the final approach.
for(let i=0;i<11;i++){
  const z=-9.0+i*.39,x=(i%2===0?-.21:.20)+(rnd()-.5)*.07,y=snowHeight(x,z)+.018;
  const print=addSphere('compressed snowshoe print',1,[x,y,z],mat(0x9caebe,.96),{sx:.115,sy:.017,sz:.23,geo:lowSphereGeo,rot:[-.04,(i%2===0?.12:-.12),.02]});
  print.castShadow=false;
}

// Foundation, modular shell and doorway portal.
const MAIN={x:7.4,zMin:-2.9,zMax:3.05,floor:.50,bottom:.50,top:3.36,thick:.22,doorHalf:.79};
const wallH=MAIN.top-MAIN.bottom, wallY=(MAIN.top+MAIN.bottom)/2;
addBox('weather sealed floor cassette',[7.65,.34,6.0],[0,.33,.075],darkMetal,{hit:true});
addBox('cabin deck',[7.44,.15,5.85],[0,.485,.075],floorMat,{hit:true});
// Foundation stanchions and anchor plates are exposed to the cold under the cabin.
for(const x of [-3.25,-1.7,1.7,3.25])for(const z of [-2.30,2.48]){
  addBox('stilt shoe',[.36,.07,.36],[x,.10,z],darkMetal);
  addBox('ice-dark anchor plate',[.27,.05,.27],[x,.15,z],steel);
  addBox('galvanized stand-off',[.20,.29,.20],[x,.28,z],frostSteel);
  for(const ox of [-.12,.12])for(const oz of [-.12,.12])fastener([x+ox,.144,z+oz],[0,-1,0],.023);
}
// Main cabin walls have real window openings; separate panel segments preserve plausible thickness.
function wallSegment(name,size,pos,inner=false,hit=true){addBox(name,size,pos,inner?innerPanel:outerWhite,{hit});}
// Front wall: wide open pressure-door bay.
wallSegment('south insulated wall · west', [2.91,wallH,.22],[-2.245,wallY,-2.90],false);
wallSegment('south insulated wall · east', [2.91,wallH,.22],[ 2.245,wallY,-2.90],false);
wallSegment('south insulated wall · lintel',[1.58,.92,.22],[0,2.90,-2.90],false);
// Rear wall, four insulated panel sections.
wallSegment('north insulated wall',[7.4,wallH,.22],[0,wallY,3.05],false);
// The side elevations are assembled around paired triple-pane observation windows.
const winZ=.48, winLen=1.18, winBottom=1.67, winTop=2.45;
for(const side of [-1,1]){
  const x=side*3.70, thick=.22;
  wallSegment('side insulated panel · forward',[thick,wallH,2.79],[x,wallY,-1.505],false);
  wallSegment('side insulated panel · aft',[thick,wallH,1.98],[x,wallY,2.06],false);
  wallSegment('side window sill',[thick,winBottom-MAIN.bottom,winLen],[x,(winBottom+MAIN.bottom)/2,winZ],false);
  wallSegment('side window header',[thick,MAIN.top-winTop,winLen],[x,(MAIN.top+winTop)/2,winZ],false);
  addBox('sealed triple glazing',[.052,winTop-winBottom-.12,winLen-.12],[side*3.71,(winBottom+winTop)/2,winZ],blueGlass,{cast:false,hit:true});
  const fx=side*3.835;
  for(const z of [winZ-winLen/2,winZ+winLen/2])addBox('anodized window mullion',[.105,winTop-winBottom+.12,.065],[fx,(winTop+winBottom)/2,z],steel);
  for(const y of [winBottom-.025,winTop+.025])addBox('window gasket rail',[.105,.075,winLen+.08],[fx,y,winZ],gasket);
  for(const z of [winZ-.37,winZ+.37])addBox('glazing divider',[.08,winTop-winBottom-.20,.027],[fx,(winBottom+winTop)/2,z],frostSteel);
  addBox('frosted window apron',[.12,.075,winLen-.13],[fx,(winBottom+MAIN.bottom)/2,winZ],frostMat,{cast:false});
  // Exterior panel beads and countersunk studs on the cold-facing side.
  const outX=side*3.817, n=side>0?[1,0,0]:[-1,0,0];
  for(const z of [-2.89,-2.02,-1.13,-.28,1.10,2.06,2.92]){
    if(Math.abs(z-winZ)<.67)continue;
    addBox('panel spline',[.018,2.67,.022],[outX,1.91,z],outerPanel);
    for(const y of [.68,3.15])fastener([side*3.835,y,z],n,.035);
  }
  // Interior reflective foil seams and service-channel covers.
  const inX=side*3.572;
  for(const z of [-2.42,-1.54,-.66,1.13,2.00,2.78]){
    if(Math.abs(z-winZ)<.67)continue;
    addBox('interior panel joint',[.018,2.50,.022],[inX,1.83,z],innerPanelAlt,{cast:false});
  }
  // Double-seal ring visible from within and outdoors.
  for(const y of [.62,3.24])for(const z of [-2.65,2.83])fastener([side*3.835,y,z],n,.035);
}
// Main pressure-door frame and its weather seals.
for(const x of [-.84,.84]){
  addBox('pressure-door jamb',[.12,1.94,.30],[x,1.48,-2.91],steel,{hit:true});
  addBox('black pressure seal',[.045,1.85,.055],[x+(x<0?.085:-.085),1.47,-2.94],gasket,{hit:true});
  for(const y of [.64,2.31])for(const z of [-3.02,-2.79])fastener([x,y,z],[0,0,-1],.035);
}
addBox('pressure-door header',[1.75,.17,.30],[0,2.47,-2.91],outerPanel,{hit:true});
addBox('warm inner portal reveal',[1.49,1.81,.045],[0,1.49,-2.775],timberLight,{cast:false});
// Interior facing walls use thick pale thermal liners, with uninterrupted head and toe rails.
for(const side of [-1,1]){
  addBox('internal wall panel forward',[.055,2.49,2.79],[side*3.574,1.88,-1.505],innerPanel,{cast:false});
  addBox('internal wall panel aft',[.055,2.49,1.98],[side*3.574,1.88,2.06],innerPanel,{cast:false});
  addBox('internal window sill',[.055,1.17,1.18],[side*3.574,1.085,winZ],innerPanel,{cast:false});
  addBox('internal window header',[.055,.78,1.18],[side*3.574,2.84,winZ],innerPanel,{cast:false});
  addBox('internal foil skirting',[.07,.14,5.54],[side*3.56,.63,.075],frostSteel,{cast:false});
  addBox('internal thermal head rail',[.07,.13,5.54],[side*3.56,3.17,.075],innerPanelAlt,{cast:false});
}
addBox('north inner insulation liner',[7.12,2.49,.055],[0,1.88,2.925],innerPanel,{cast:false});
addBox('south inner insulation · west',[2.91,2.49,.055],[-2.245,1.88,-2.778],innerPanel,{cast:false});
addBox('south inner insulation · east',[2.91,2.49,.055],[2.245,1.88,-2.778],innerPanel,{cast:false});
for(const x of [-2.4,-1.25,0,1.25,2.4])addBox('ceiling foil seam',[.023,.023,5.4],[x,3.22,.05],frostSteel,{cast:false});
addBox('interior ceiling',[7.14,.12,5.56],[0,3.23,.075],innerPanelAlt,{cast:false});
// Outside cladding: modular seams, weather straps, rivets, corner armor and frozen beads.
for(const x of [-3.30,-2.48,-1.66,-.84,.84,1.66,2.48,3.30]){
  if(Math.abs(x)<.9)continue;
  addBox('front panel seam',[.022,2.75,.025],[x,1.90,-3.023],outerPanel);
  for(const y of [.67,3.17])fastener([x,y,-3.046],[0,0,-1],.037);
}
for(const x of [-3.47,-3.14,-2.8,-2.45,-2.1,-1.75,-1.4,-1.05,-.68,-.34,0,.34,.68,1.05,1.4,1.75,2.1,2.45,2.8,3.14,3.47]){
  if(Math.abs(x)<.88)continue;
  fastener([x,.69,-3.046],[0,0,-1],.032);fastener([x,3.15,-3.046],[0,0,-1],.032);
}
// Strong external corner extrusions and matching boots.
for(const x of [-3.77,3.77]){
  addBox('external corner extrusion',[.10,2.87,.11],[x,1.925,-2.91],steel);
  addBox('corner snow boot',[.20,.37,.23],[x,.66,-2.91],darkMetal);
  for(const y of [.78,1.84,2.88])fastener([x+(x<0?-.055:.055),y,-2.91],[x<0?-1:1,0,0],.036);
}
// Rear cladding and fastener rows remain visible on an outside return.
for(const x of [-3.25,-2.45,-1.63,-.82,0,.82,1.63,2.45,3.25]){
  addBox('north wall panel seam',[.022,2.75,.023],[x,1.91,3.174],outerPanel);
  for(const y of [.68,3.15])fastener([x,y,3.189],[0,0,1],.036);
}

// Short insulated vestibule. Its outer door is held safely open for a continuous route.
const vest={x:2.12,z0:-4.99,z1:-2.90,mid:-3.945,bottom:.50,top:2.75};
addBox('airlock cassette floor',[2.18,.24,2.16],[0,.37,vest.mid],darkMetal,{hit:true});
addBox('airlock anti-slip floor',[2.08,.08,2.03],[0,.51,vest.mid],rubber,{hit:true});
for(let i=0;i<7;i++)addBox('threshold traction rib',[1.83,.026,.037],[0,.565,-4.63+i*.22],steel,{cast:false});
// Side walls are split around actual outward observation panes.
for(const side of [-1,1]){
  const x=side*1.055,H=vest.top-vest.bottom,cy=(vest.top+vest.bottom)/2;
  addBox('vestibule flank · entry',[.15,H,.49],[x,cy,-4.735],outerWhite,{hit:true});
  addBox('vestibule flank · inner',[.15,H,.50],[x,cy,-3.15],outerWhite,{hit:true});
  addBox('vestibule porthole sill',[.15,.96,.83],[x,.98,-3.92],outerPanel,{hit:true});
  addBox('vestibule porthole header',[.15,.70,.83],[x,2.40,-3.92],outerWhite,{hit:true});
  addBox('double pane airlock window',[.06,.58,.68],[side*1.06,1.73,-3.92],blueGlass,{cast:false,hit:true});
  for(const zz of [-4.36,-3.48])addBox('airlock port vertical gasket',[.12,.68,.075],[side*1.15,1.73,zz],gasket);
  for(const yy of [1.33,2.13])addBox('airlock port horiz gasket',[.12,.075,.94],[side*1.15,yy,-3.92],frostSteel);
  addBox('airlock thermal liner',[.025,1.96,1.48],[side*.968,1.57,-3.94],innerPanel,{cast:false});
  for(const zz of [-4.55,-4.25,-3.95,-3.65,-3.35])addBox('interior vestibule rib',[.025,1.87,.014],[side*.951,1.55,zz],innerPanelAlt,{cast:false});
  const n=side<0?[-1,0,0]:[1,0,0];
  for(const z of [-4.61,-3.04])for(const y of [.67,2.56])fastener([side*1.146,y,z],n,.032);
  // Sturdy exterior handholds add scale and a practical passage in blowing spindrift.
  for(const z of [-4.47,-3.42])addBox('vestibule grab rail', [.045,.05,.70],[side*1.17,1.13,z],brass);
}
// Outer opening in the vestibule: framed panels deliberately leave 1.55 m clear.
addBox('outer airlock door left cheek',[.37,2.12,.18],[-.895,1.56,-4.99],outerWhite,{hit:true});
addBox('outer airlock door right cheek',[.37,2.12,.18],[.895,1.56,-4.99],outerWhite,{hit:true});
addBox('outer airlock lintel',[1.50,.47,.19],[0,2.515,-4.99],outerPanel,{hit:true});
for(const x of [-.735,.735]){
  addBox('exterior door seal',[.06,1.87,.10],[x,1.49,-5.01],gasket,{hit:true});
  for(const y of [.68,1.05,1.79,2.28])fastener([x,y,-5.115],[0,0,-1],.032);
}
addBox('vestibule canopy fascia',[2.37,.20,.26],[0,2.79,-3.93],steel);
addBox('vestibule roof cassette',[2.23,.22,2.28],[0,2.88,-3.95],darkMetal);
addBox('snow on airlock canopy',[2.30,.15,2.30],[0,3.02,-3.96],roofSnowMat);
for(const x of [-.94,.94])for(const z of [-4.75,-3.18])fastener([x,3.105,z],[0,1,0],.037);

// Double-thickness exterior door leaves swung to the warm side of each jamb.
const outerLeaf=new THREE.Group();outerLeaf.position.set(.735,.5,-5.015);outerLeaf.rotation.y=-Math.PI/2;world.add(outerLeaf);
const leaf=addBox('open outer pressure leaf',[1.42,1.78,.11],[-.71,.89,0],outerWhite,{parent:outerLeaf,cast:true});
addBox('outer leaf internal foam face',[1.22,1.55,.025],[-.71,.89,.068],innerPanel,{parent:outerLeaf,cast:false});
addBox('door dog handle',[.13,.045,.14],[-1.16,1.09,-.075],brass,{parent:outerLeaf});
addBox('door vision slot frame',[.37,.55,.045],[-.73,1.42,-.069],gasket,{parent:outerLeaf});
addBox('door vision double glass',[.29,.46,.019],[-.73,1.42,-.095],blueGlass,{parent:outerLeaf,cast:false});
for(const x of [-1.30,-.12])for(const y of [.20,1.58])fastener([.735+x,.5+y,-5.095],[0,0,-1],.032);
// Inner bulkhead leaf parks neatly along its inside jamb, beyond the clear threshold.
const innerLeaf=new THREE.Group();innerLeaf.position.set(.735,.5,-2.87);innerLeaf.rotation.y=Math.PI/2;world.add(innerLeaf);
addBox('open inner airlock door',[1.35,1.80,.13],[-.675,.90,0],innerPanelAlt,{parent:innerLeaf});
addBox('inner door edge armor',[.06,1.75,.08],[-.10,.90,0],steel,{parent:innerLeaf});
addBox('inner door dog handle',[.14,.06,.12],[-.98,1.07,-.087],brass,{parent:innerLeaf});
for(const x of [-1.19,-.17])for(const y of [.17,1.62])fastener([.735+x,.5+y,-2.94],[0,0,-1],.029);

// Snow-ramp apron connects directly to the small raised threshold.
function rampMesh(){
  const w=3.05,zA=-4.82,zB=-7.18,nx=15,nz=26,p=[],idx=[];
  for(let j=0;j<=nz;j++)for(let i=0;i<=nx;i++){
    const x=-w/2+w*i/nx,z=zA+(zB-zA)*j/nz,u=(zA-z)/(zA-zB),y=.48-.39*u+.018*Math.sin(18*u+1.3*x)*Math.sin(8*x);
    p.push(x,y,z);
  }
  for(let j=0;j<nz;j++)for(let i=0;i<nx;i++){const a=j*(nx+1)+i,b=a+1,c=a+nx+1,d=c+1;idx.push(a,b,c,b,d,c);}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(p,3));g.setIndex(idx);g.computeVertexNormals();
  const m=new THREE.Mesh(g,roofSnowMat);m.name='compacted snow ramp';m.receiveShadow=true;world.add(m);
}
rampMesh();
// Raised steel snow stakes identify the unobstructed route without building a gate.
for(const side of [-1,1]){
  for(let i=0;i<3;i++){const z=-5.22-i*.83,x=side*1.73,y=snowHeight(x,z);
    addCyl('edge stake',.034,.038,1.0,[x,y+.50,z],brass,{radial:8});
    addSphere('amber path reflector',.073,[x,y+.82,z],amber,{geo:lowSphereGeo});
    fastener([x,y+.94,z],[0,1,0],.024);
  }
}

// Roof shell: a shallow crowned lid with a torn, wind-laid snow skin.
addBox('sealed cabin roof slab',[7.85,.19,6.27],[0,3.46,.075],darkMetal);
addBox('south fascia drip',[7.88,.15,.16],[0,3.47,-3.075],steel);
addBox('north fascia drip',[7.88,.15,.16],[0,3.47,3.22],steel);
for(const x of [-3.86,3.86])addBox('roof edge armor',[.16,.14,6.20],[x,3.48,.075],frostSteel);
function snowRoof(){
  const nx=44,nz=35,p=[],uv=[],idx=[];
  for(let j=0;j<=nz;j++)for(let i=0;i<=nx;i++){
    const x=-3.91+7.82*i/nx,z=-3.07+6.29*j/nz;
    const crown=.115*(1-Math.abs(x)/3.91),gust=.035*Math.sin(z*1.02+.32*Math.sin(x*.7))+.016*Math.sin(2.2*x-.4*z);
    const drift=.10*gauss(x,z,-2.9,.3,.8,2.2)+.07*gauss(x,z,2.0,-1.5,1.5,1.3);
    p.push(x,3.57+crown+gust+drift,z);uv.push(i/nx,j/nz);
  }
  for(let j=0;j<nz;j++)for(let i=0;i<nx;i++){const a=j*(nx+1)+i,b=a+1,c=a+nx+1,d=c+1;idx.push(a,c,b,b,c,d);}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(p,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setIndex(idx);g.computeVertexNormals();
  const mesh=new THREE.Mesh(g,roofSnowMat);mesh.name='wind-ribbed roof snow';mesh.castShadow=true;mesh.receiveShadow=true;world.add(mesh);
}
snowRoof();
for(const x of [-3.55,-2.42,-1.21,0,1.21,2.42,3.55]){
  for(const z of [-2.78,-1.39,0,1.39,2.78])fastener([x,3.48,z],[0,1,0],.034);
}
// Frost collects on the windward eave; individual tapered forms catch blue light.
for(const x of [-3.38,-2.83,-2.28,-1.73,-1.18,-.63,.02,.69,1.33,1.98,2.61,3.25]){
  const n=1+(Math.abs(Math.round(x*8))%3),z=-3.05;
  for(let k=0;k<n;k++){
    const len=.12+.07*((k+Math.round(Math.abs(x)*7))%3);
    const ice=new THREE.Mesh(new THREE.ConeGeometry(.036,len,6),frostMat);ice.position.set(x+(k-(n-1)/2)*.07,3.36-len/2,z-.01);ice.rotation.x=Math.PI;world.add(ice);
  }
}
for(const x of [-3.75,3.75])for(const z of [-2.9,-1.85,-.8,.25,1.3,2.35,3.05]){
  const ice=new THREE.Mesh(new THREE.ConeGeometry(.031,.23,6),frostMat);ice.position.set(x,3.31,z);ice.rotation.z=x>0?.13:-.13;world.add(ice);
}
// Amber address plate and a discreet low-glare entrance lamp.
const outsideSign=addPlane('station identity plate',1.42,.46,[0,2.92,-3.035],labelTexture('K—17','POLAR FIELD SHELTER · ACTIVE', '#e7b779',['SOUTH RIDGE  /  OBSERVATION SECTOR']),[0,Math.PI,0]);
addBox('identity plaque backplate',[1.56,.55,.035],[0,2.92,-3.005],darkMetal);
for(const x of [-.69,.69])for(const y of [2.72,3.12])fastener([x,y,-3.067],[0,0,-1],.025);
wallLightFixture(-1.18,2.37,-2.99,true);wallLightFixture(1.18,2.37,-2.99,true);
wallLightFixture(-.84,2.30,-4.91,true);wallLightFixture(.84,2.30,-4.91,true);
addBox('porch light shield',[.72,.075,.36],[0,2.76,-5.00],darkMetal);
addBox('porch amber diffuser',[.47,.032,.17],[0,2.713,-5.02],amber,{cast:false});
addLight(0xffc181,6,5,[0,2.55,-5.28]);
// A small angled weatherproof status marker remains legible on the outer bulkhead.
addBox('entry placard backing',[.48,.40,.035],[-.62,1.50,-5.115],darkMetal);
addPlane('entry placard',[.43,.35],[-.62,1.50,-5.14],labelTexture('AIRLOCK','OUT / IN','#dcae72',['KEEP THE DOOR LATCHED']),[0,Math.PI,0]);

// Functional exterior systems: backed, low-profile photovoltaics, radio whip and roof exhaust.
const panelBlue=mat(0x284c69,.28,.38,{emissive:0x091625,emissiveIntensity:.12});
// Array frames on the north half of the roof are folded low under polar wind.
for(const x of [-2.20,-.74,.74,2.20]){
  addBox('solar rack lower rail',[.08,.08,2.48],[x,3.88,1.80],darkMetal);
  addBox('photovoltaic laminate',[1.27,.065,2.23],[x,3.99,1.82],panelBlue,{rot:[-.13,0,0]});
  for(let j=-2;j<=2;j++)addBox('solar cell bus line',[1.18,.012,.012],[x,4.028,1.82+j*.31],frostSteel,{rot:[-.13,0,0],cast:false});
  for(const xx of [x-.34,x,x+.34])addBox('cell divider',[.014,.014,2.13],[xx,4.029,1.82],steel,{rot:[-.13,0,0],cast:false});
  for(const z of [.88,2.74])addCyl('array standoff',.045,.055,.18,[x,3.77,z],steel,{radial:8});
  fastener([x,4.03,.72],[0,1,0],.022);
}
// Cabled radio mast with crossbars, ceramic insulators and a compact reflector dish.
addBox('radio mast foot',[.58,.16,.55],[2.93,3.81,-1.70],darkMetal);
for(const x of [2.72,3.14])addCyl('mast base strut',.035,.045,.42,[x,3.92,-1.70],steel,{radial:8});
addCyl('survey antenna mast',.035,.035,2.90,[2.93,5.12,-1.70],frostSteel,{radial:10});
for(const y of [4.21,4.82,5.35,5.76]){
  addCyl('antenna collar',.074,.074,.062,[2.93,y,-1.70],darkMetal,{radial:12});
  addSphere('ceramic antenna insulator',.044,[2.93,y+.10,-1.70],mat(0xddd8c7,.25,.05),{geo:lowSphereGeo});
}
for(const z of [-2.30,-1.70,-1.10])addTube('whip antenna dipole',[[2.93,5.36,z],[2.70,5.40,z],[2.50,5.49,z]],.015,steel);
const dish=new THREE.Mesh(new THREE.SphereGeometry(.64,20,14,0,Math.PI*2,0,Math.PI/2),mat(0x647989,.32,.6,{side:THREE.DoubleSide}));
dish.position.set(2.93,4.90,-1.70);dish.rotation.z=-Math.PI/2;dish.scale.set(.72,.72,.15);world.add(dish);
addCyl('dish feed arm',.023,.028,.48,[2.57,4.89,-1.7],frostSteel,{rot:[0,0,Math.PI/2],radial:8});
addSphere('ceramic dish feed',.087,[2.35,4.90,-1.7],mat(0xe0d8c6,.25,.15),{geo:lowSphereGeo});
addTube('black iced coax',[[2.93,4.28,-1.7],[2.93,3.97,-1.56],[3.32,3.80,-1.32],[3.62,2.94,-.7],[3.80,2.44,-.7]],.022,darkMetal);
// Roof vent and louvered exhaust crown.
addCyl('insulated exhaust riser',.18,.21,.76,[-2.86,4.05,.80],steel,{radial:12});
addCyl('exhaust frost ring',.24,.24,.07,[-2.86,4.41,.80],gasket,{radial:12});
addCyl('snow-shedding vent hat',.28,.34,.13,[-2.86,4.51,.80],frostSteel,{radial:12});
for(let i=0;i<5;i++)addBox('vent louver',[.29,.025,.055],[-2.86,4.28-i*.075,.8],darkMetal,{rot:[0,0,-.18]});
for(const x of [-3.05,-2.67])fastener([x,4.46,.8],[0,1,0],.026);

// Raised utility skid, recovery canisters and insulated conduits along the lee side.
const gennyX=-5.1,gennyZ=.65,gennyY=snowHeight(gennyX,gennyZ);
addBox('backup generator skid',[1.52,.20,.95],[gennyX,gennyY+.14,gennyZ],darkMetal,{hit:true});
addBox('generator insulated casing',[1.37,.78,.78],[gennyX,gennyY+.61,gennyZ],outerPanel,{hit:true});
addBox('generator front access panel',[1.13,.54,.024],[gennyX,gennyY+.63,gennyZ-.407],outerWhite);
for(let i=0;i<11;i++)addBox('generator cooling grille fin',[.79,.022,.025],[gennyX,gennyY+.42+i*.042,gennyZ-.43],darkMetal,{cast:false});
for(const x of [gennyX-.43,gennyX+.43])for(const y of [gennyY+.40,gennyY+.85])fastener([x,y,gennyZ-.443],[0,0,-1],.028);
addBox('generator exhaust elbow',[.11,.18,.16],[gennyX+.52,gennyY+1.08,gennyZ],steel,{rot:[0,0,.32]});
addCyl('fuel cap',.12,.13,.12,[gennyX+.38,gennyY+1.05,gennyZ+.30],brass,{radial:10});
addBox('generator snow screen',[.12,1.04,.13],[gennyX-.87,gennyY+.52,gennyZ],frostSteel,{hit:true});
for(let i=0;i<5;i++)addBox('screen mesh bar',[.018,.96,.018],[gennyX-.94+i*.033,gennyY+.52,gennyZ-.08],darkMetal,{cast:false});
const tankX=5.22,tankZ=1.35,tankY=snowHeight(tankX,tankZ);
addCyl('insulated gas cylinder shell',.32,.36,1.67,[tankX,tankY+.85,tankZ],outerWhite,{radial:16});
addCyl('cylinder heel ring',.374,.36,.09,[tankX,tankY+.105,tankZ],steel,{radial:16});
addCyl('cylinder shoulder ring',.30,.30,.075,[tankX,tankY+1.56,tankZ],frostSteel,{radial:16});
addCyl('cylinder valve neck',.12,.14,.18,[tankX,tankY+1.75,tankZ],darkMetal,{radial:10});
addCyl('isolation valve handwheel',.20,.20,.035,[tankX,tankY+1.87,tankZ],brass,{radial:8});
addBox('cylinder regulator case',[.23,.24,.17],[tankX-.22,tankY+1.81,tankZ],darkMetal);
addSphere('cylinder gauge glass',.089,[tankX-.35,tankY+1.84,tankZ-.04],mat(0xe1eee9,.22,.05,{emissive:0x668075,emissiveIntensity:.18}),{geo:lowSphereGeo,sx:1,sy:1,sz:.25});
addTube('oxygen line',[[tankX-.3,tankY+1.8,tankZ],[4.7,tankY+1.8,1.35],[4.1,tankY+1.6,1.9],[3.80,2.26,2.20]],.035,rubber);
for(const y of [tankY+.44,tankY+1.24])addCyl('tank compression band',.365,.365,.047,[tankX,y,tankZ],brass,{radial:16});
for(const z of [.65,2.05])addBox('cylinder rack upright',[.085,1.85,.085],[5.65,tankY+.93,z],steel);
addBox('cylinder rack restraint',[.08,.10,1.50],[5.65,tankY+1.25,1.35],darkMetal);

// Insulated wall penetrations, storm shutters, cabled feedthrough and service conduit.
addBox('side extraction register',[.10,.47,.52],[-3.84,1.67,-1.87],darkMetal);
for(let i=0;i<6;i++)addBox('extractor louver',[.045,.035,.46],[-3.905,1.49+i*.063,-1.87],frostSteel,{cast:false});
for(const z of [-2.15,-1.59])for(const y of [1.40,1.92])fastener([-3.911,y,z],[-1,0,0],.028);
addBox('raised storm hood',[.21,.10,.67],[-3.88,2.12,-1.87],steel);
addTube('wall conduit · north',[[3.83,.93,-1.65],[3.93,.93,-.8],[3.93,.93,1.9],[3.8,1.24,2.4]],.042,darkMetal);
for(const z of [-1.40,-.35,.75,1.8])addBox('conduit saddle',[.09,.11,.12],[3.90,.93,z],steel);
addBox('external junction box',[.20,.42,.34],[3.88,1.26,2.35],outerPanel);
addBox('junction cover seam',[.02,.023,.29],[3.997,1.26,2.35],gasket,{cast:false});
for(const y of [1.1,1.4])fastener([4.00,y,2.22],[1,0,0],.024);
  addPlane('side room indicator',.61,.25,[3.535,2.97,.47],labelTexture('ROOM 01','WARM SIDE','#e9c893',['INSULATED SHELL']),[0,-Math.PI/2,0]);
// Small rimed reliefs at the footing soften the metal-to-snow contact.
for(let side of [-1,1])for(const z of [-2.4,-1.5,-.2,1.1,2.45]){
  const x=side*3.83,y=snowHeight(x,z);
  addSphere('wind-packed eave drift',1,[x,y+.10,z],roofSnowMat,{sx:.52,sy:.20,sz:.93,geo:lowSphereGeo,rot:[0,.08*side,0]});
}

// Warm room: foil-faced panel joints, three practical ceiling pools, and one open circulation spine.
const warmWood=mat(0x987555,.62,.055,{map:clothGrain,bumpMap:clothGrain,bumpScale:.012});
const enamel=mat(0x5d7172,.42,.28);
const darkGreen=mat(0x3a4d4a,.82,.02,{map:clothGrain,bumpMap:clothGrain,bumpScale:.02});
for(const x of [-2.30,0,2.30]){
  addBox('ceiling light mounting plate',[.78,.045,.38],[x,3.142,.10],darkMetal,{cast:false});
  addBox('opal practical diffuser',[.57,.055,.21],[x,3.103,.10],amber,{cast:false});
  for(const xx of [x-.31,x+.31])addBox('diffuser keeper',[.03,.036,.25],[xx,3.10,.10],steel,{cast:false});
  addLight(0xffc78f,112,8.2,[x,2.89,.18]);
}
// One low-bulkhead dome keeps the vestibule illuminated during the warm/cold transition.
addBox('vestibule luminaire base',[.39,.06,.32],[0,2.67,-3.96],darkMetal,{cast:false});
addBox('vestibule warm diffuser',[.30,.065,.18],[0,2.625,-3.96],amber,{cast:false});
addLight(0xffc58c,78,5.4,[0,2.42,-3.96]);
// Warm reflective kick panels and pale, sealed flooring on the occupied side of each wall.
for(const x of [-3.12,-2.30,-1.48,-.67,.15,.97,1.79,2.61]){
  for(const z of [-2.45,2.77]){
    if(Math.abs(x)<.9&&z<0)continue;
    addBox('ceiling cassette fastening strip',[.026,.027,.12],[x,3.145,z],frostSteel,{cast:false});
  }
}
// Scuffed, modular floor panels with rubber margins and low amber locator studs.
for(let z=-2.45;z<=2.50;z+=.59){
  for(let x=-3.18;x<=3.18;x+=.70){
    addBox('floor thermal tile',[.66,.024,.55],[x,.576,z],(Math.abs(Math.round(x*10)+Math.round(z*10))%3===0?innerPanelAlt:innerPanel),{cast:false});
    for(const xx of [x-.28,x+.28])addCyl('floor tie-down',.022,.022,.012,[xx,.593,z-.22],steel,{radial:8});
  }
}
for(const side of [-1,1])for(const z of [-2.35,-1.8,-1.25,-.7,-.15,.4,.95,1.5,2.05,2.6]){
  addBox('wall-base kick protection',[.025,.28,.42],[side*3.52,.70,z],darkMetal,{cast:false});
  for(const y of [.62,.78])fastener([side*3.54,y,z],side<0?[-1,0,0]:[1,0,0],.020);
}

// Interior archive cabinets: drawer fronts, catches, destination labels and exposed cabinet feet.
function cabinet(side,z,width=1.08,height=2.03){
  const x=side*3.12,depth=.71,y=.50+height/2,front=x-side*(depth/2+.018);
  const box=addBox('insulated archive locker',[depth,height,width],[x,y,z],(z<0?darkGreen:outerPanel),{hit:true});
  const faceRot=[0,side<0?Math.PI/2:-Math.PI/2,0];
  const faceN=side<0?[-1,0,0]:[1,0,0];
  addBox('locker face backing',[.032,height-.11,width-.10],[front,y,z],darkMetal,{cast:false});
  const face=addPlane('powder-coated locker leaf',width-.14,height-.18,[front+side*.023,y,z],(z<0?darkGreen:outerPanel),faceRot);
  for(let i=0;i<3;i++){
    const yy=.50+(i+.5)*(height/3);
    addBox('locker drawer seam',[.015,.017,width-.15],[front+side*.047,yy,z],gasket,{cast:false});
    addBox('locker pull handle',[.047,.032,.17],[front+side*.072,yy+.085,z],brass);
    addBox('cabinet latch screw',[.05,.023,.03],[front+side*.076,yy+.085,z-width*.31],steel);
    for(const dz of [-width*.36,width*.36])fastener([front+side*.055,yy-.10,z+dz],faceN,.020);
  }
  const label=addPlane('archive locator plate',.42,.17,[front+side*.059,1.94,z],labelTexture(z<0?'DRY STORE':'CORE VAULT',z<0?'COLD WEATHER KIT · A-04':'ICE SAMPLES · 12—19','#d5b27b',['SEALED  /  LOG AFTER USE']),faceRot);
  for(const zz of [z-width*.37,z+width*.37]){
    addBox('locker edge flange',[.035,height,.036],[front+side*.05,y,zz],steel);
  }
  addBox('locker top tray',[depth+.10,.06,width+.04],[x,.50+height,z],steel);
  addBox('locker toe rail',[depth+.04,.12,width+.04],[x,.57,z],darkMetal);
  return box;
}
cabinet(-1,-1.38,1.05,2.10);
cabinet(-1,-2.43,.72,1.76);
// A short, high shelf holds the heavy cloth and field binders, not the egress wall.
addBox('archive shelf bracket',[.32,.08,.82],[-2.69,2.69,-1.26],steel);
addBox('archive shelf ledger',[.75,.07,.88],[-2.99,2.72,-1.26],warmWood);
for(let i=0;i<5;i++){
  const book=addBox('field handbook',[.14,.38,.25],[-3.10+i*.15,2.95,-1.25],i%2?darkGreen:timberLight,{rot:[0,0,(i-2)*.05]});
  addBox('handbook cloth spine',[.024,.29,.26],[-3.18+i*.15,2.95,-1.25],brass,{cast:false});
}
// Open metal parts shelves: sample boxes, spare fuses, hooks and practical restraint rails.
addBox('equipment wall shelf',[.59,.07,1.32],[-2.91,2.22,.47],steel);
addBox('equipment shelf lip',[.04,.12,1.31],[-2.61,2.29,.47],brass);
for(const z of [-.05,.40,.85])addBox('shelf standard',[.055,.82,.045],[-2.91,1.95,z],darkMetal);
for(const y of [1.65,2.10,2.55]){
  for(const zz of [-.05,.40,.85])fastener([-2.876,y,zz],[-1,0,0],.023);
  addBox('adjustable shelf',[.49,.055,1.31],[-2.86,y,.47],warmWood);
}
for(let i=0;i<4;i++){
  const z=.08+i*.26;
  addBox('small reserve parts box',[.39,.24,.22],[-2.66,1.81,z],i%2?enamel:outerPanel);
  addBox('parts box identification face',[.022,.11,.15],[-2.445,1.81,z],gasket,{cast:false});
  addPlane('parts marker',.12,.06,[-2.429,1.81,z],labelTexture(i===0?'A9':'SPARE','SEALED','#ddba85',['KIT']),[0,Math.PI/2,0]);
}

// Back-wall field bench, its task-lit instrumentation, drawer units, and hardware.
const benchFrontZ=2.06,benchBackZ=2.76,benchY=.96;
addBox('north workbench top',[4.65,.14,.80],[0,benchY,2.40],timberLight,{hit:true});
addBox('worktop nosing',[4.72,.075,.055],[0,.90,1.993],brass,{cast:false});
addBox('worktop cold edge strip',[4.69,.033,.026],[0,1.045,2.00],steel,{cast:false});
for(const x of [-2.10,-1.45,1.45,2.10]){
  addBox('bench frame upright',[.075,.78,.075],[x,.51+ .39,2.66],darkMetal,{hit:true});
  addBox('adjustable bench foot',[.17,.07,.17],[x,.555,2.66],steel);
  fastener([x,.59,2.566],[0,0,-1],.026);
}
for(const x of [-1.78,1.78]){
  addBox('steel drawer carcass',[.75,.63,.58],[x,.53,2.39],darkGreen,{hit:true});
  for(let j=0;j<3;j++){
    const y=.32+j*.20;
    addBox('bench drawer front',[.70,.16,.035],[x,y,2.09],enamel,{cast:false});
    addBox('drawer bail handle',[.19,.025,.036],[x,y+.035,2.055],brass);
    for(const dx of [-.29,.29])fastener([x+dx,y,2.050],[0,0,-1],.021);
    addBox('index tab',[.17,.057,.012],[x,y-.04,2.041],gasket,{cast:false});
  }
}
addBox('rear equipment raceway',[4.20,.21,.22],[0,1.45,2.81],darkMetal);
addBox('raceway cover',[3.96,.11,.034],[0,1.46,2.688],steel,{cast:false});
for(let x=-1.7;x<1.71;x+=.34)for(const y of [1.42,1.50])fastener([x,y,2.665],[0,0,-1],.018);
addTube('raceway supply line',[[-2.3,1.57,2.73],[-2.3,1.75,2.89],[-1.4,1.75,2.90],[-.5,1.76,2.90]],.031,brass);
addTube('raceway return line',[[2.30,1.63,2.73],[2.30,1.77,2.89],[1.45,1.77,2.90],[.85,1.77,2.90]],.025,steel);
// Monitor, simple field log display, recessed cooling slots, dial and a compact keyboard.
const monitor=addBox('weatherproof terminal housing',[1.34,.88,.18],[0,1.78,2.43],darkMetal);
for(const x of [-.48,.48])addBox('monitor lower bezel',[.12,.91,.12],[x,1.78,2.303],steel);
addBox('terminal chin',[1.24,.10,.06],[0,1.32,2.294],gasket,{cast:false});
for(let i=0;i<5;i++)addBox('terminal vent slot',[.11,.015,.016],[-.5+i*.13,2.09,2.295],steel,{cast:false});
const display=addPlane('field log display',1.18,.70,[0,1.79,2.327],screenTexture(),[0,Math.PI,0]);
addBox('terminal status glow',[.07,.022,.025],[.48,1.335,2.282],amber,{cast:false});
addBox('terminal pedestal',[.32,.18,.27],[0,1.23,2.43],steel);
addBox('terminal swivel toe',[.68,.045,.42],[0,1.15,2.45],darkMetal);
addBox('compact keyboard case',[.77,.055,.29],[.05,1.063,2.02],gasket);
for(let row=0;row<4;row++)for(let col=0;col<12;col++)addBox('keycap',[.043,.014,.038],[-.30+col*.063,1.10,1.915+row*.057],row===3&&col===5?brass:innerPanelAlt,{cast:false});
addBox('trackpad',[.21,.016,.12],[.75,1.058,1.985],steel);
// Stack of insulated logging modules; each control can be identified at arm's length.
for(let i=0;i<3;i++){
  const z=2.20-i*.25,y=1.28;
  addBox('logging instrument bay',[.54,.20,.21],[-1.56,y,z],i===1?darkGreen:enamel);
  addBox('logging module fascia',[.49,.16,.024],[-1.56,y,z-.12],gasket,{cast:false});
  for(let j=0;j<4;j++){
    addSphere('channel lamp',.025,[-1.75+j*.09,y+.027,z-.14],j===2?amber:displayMat,{geo:lowSphereGeo});
    if(j<3)addCyl('instrument selector',.028,.028,.028,[-1.39,y-.035,z-.153],steel,{rot:[Math.PI/2,0,0],radial:9});
  }
}
// Field microscope: geared base, articulated arm, objective carousel, brass and glass details.
addBox('microscope weighted foot',[.50,.065,.41],[-1.17,1.075,1.92],darkMetal);
for(const x of [-1.35,-.99])addBox('microscope rubber foot',[.08,.04,.08],[x,1.02,1.93],rubber);
addBox('microscope stage',[.32,.056,.30],[-1.17,1.22,1.92],steel);
for(const x of [-1.30,-1.04])addBox('stage clip',[.026,.038,.22],[x,1.265,1.92],brass);
addTube('microscope upright',[[-1.17,1.25,1.99],[-1.16,1.53,2.08],[-1.10,1.75,2.13]],.042,steel);
addSphere('focus wheel',.12,[-1.04,1.53,2.09],brass,{sx:1,sy:1,sz:.28});
addTube('microscope ocular', [[-1.10,1.74,2.13],[-1.20,1.88,2.03],[-1.28,2.03,1.94]],.047,darkMetal);
addCyl('eyepiece rim',.062,.052,.09,[-1.28,2.03,1.94],frostSteel,{rot:[-.7,0,-.6],radial:10});
addTube('objective tube', [[-1.08,1.66,2.13],[-1.02,1.52,1.99],[-1.01,1.38,1.94]],.040,steel);
addCyl('objective lens housing',.060,.072,.10,[-1.01,1.35,1.94],darkMetal,{radial:10});
addSphere('sample coverslip',.105,[ -1.16,1.273,1.92],blueGlass,{sx:1,sy:.10,sz:1,geo:lowSphereGeo});
// Small blue core vials in a restrained metal rack beside the log terminal.
addBox('ice-core vial rack base',[.94,.055,.34],[1.44,1.073,2.27],darkMetal);
for(let i=0;i<6;i++){
  const x=1.08+i*.145;
  addBox('vial rack separator',[.032,.22,.23],[x,1.20,2.27],steel);
  addCyl('frozen core vial',.046,.05,.31,[x,1.25,2.29],mat(i%2?0xa4d3dd:0xc5dfe2,.15,.08,{transparent:true,opacity:.83}),{radial:10});
  addCyl('vial cap',.054,.054,.055,[x,1.43,2.29],amber,{radial:10});
}
addBox('specimen rack clamp',[1.02,.04,.06],[1.44,1.055,2.10],brass);
// Hands-on reference materials, taped field sheet and pencil.
addBox('survey clipboard',[.55,.06,.39],[-.32,1.068,2.31],warmWood,{rot:[-.06,.05,-.035]});
const paper=mat(0xdfd6bd,.89,.01);
addBox('log paper sheet',[.48,.008,.31],[-.32,1.104,2.31],paper,{rot:[-.06,.05,-.035],cast:false});
for(let i=0;i<5;i++)addBox('pencil survey notation',[.24,.007,.009],[-.36,1.111,2.24+i*.043],darkGreen,{rot:[0,0,-.025],cast:false});
addCyl('field pencil',.014,.014,.32,[.00,1.115,2.28],brass,{rot:[Math.PI/2,.04,0],radial:7});
// Vented task lamp bends over the notebook and adds a second warm practical pool.
addCyl('desk-lamp base',.16,.18,.055,[1.88,1.065,2.15],darkMetal,{radial:14});
addTube('desk-lamp articulated stem',[[1.88,1.09,2.15],[1.88,1.42,2.17],[1.67,1.76,2.17],[1.65,2.02,2.18]],.025,brass);
addSphere('lamp hinge',.076,[1.68,1.76,2.17],steel,{geo:lowSphereGeo});
addCyl('task lamp shade',.16,.31,.23,[1.65,2.02,2.18],darkMetal,{radial:14});
addCyl('lamp ceramic reflector',.235,.21,.033,[1.65,1.895,2.18],amber,{radial:14});
addLight(0xffa85d,43,4,[1.65,1.88,2.18]);
// Work stool and bench-side footrest are kept off the doorway line.
addCyl('rolling stool seat',.37,.39,.15,[-1.45,.73,1.20],darkGreen,{radial:16,});
addCyl('stool stem',.077,.065,.42,[-1.45,.48,1.20],steel,{radial:10});
for(const a of [0,Math.PI/2,Math.PI,Math.PI*1.5])addBox('stool splay foot',[.38,.055,.07],[-1.45+Math.sin(a)*.25,.30,1.20+Math.cos(a)*.25],darkMetal,{rot:[0,-a,0]});
colliders.push({minX:-1.85,maxX:-1.05,minZ:.82,maxZ:1.58,minY:.30,maxY:.86});

// Polar living berth along the starboard wall, with a folded quilt, pillow and restrained personal detail.
addBox('berth lower angle frame',[1.08,.11,2.18],[2.87,.78,.32],darkMetal,{hit:true});
addBox('berth head foot board',[1.07,.73,.10],[2.87,1.03,1.43],warmWood);
for(const x of [2.40,3.31])for(const z of [-.68,1.18]){
  addBox('berth bedpost',[.09,.69,.09],[x,.63,z],darkMetal,{hit:true});
  addBox('bedpost frost shoe',[.17,.08,.17],[x,.12,z],steel);
  fastener([x,.18,z],[0,-1,0],.021);
}
addBox('mattress support',[.96,.14,2.04],[2.87,.92,.27],steel);
addBox('wool mattress',[.91,.25,1.96],[2.87,1.10,.32],mat(0xb0a78f,.98,.0,{map:clothGrain,bumpMap:clothGrain,bumpScale:.03}));
addBox('sleeping pillow',[.75,.21,.50],[2.87,1.31,1.02],mat(0xd8d3c3,.97,0,{map:clothGrain,bumpMap:clothGrain,bumpScale:.04}),{rot:[-.10,0,.02]});
addBox('insulated berth quilt',[.88,.18,1.44],[2.87,1.31,-.35],warmFabric,{rot:[.04,0,-.012]});
for(let z=-.98;z<.34;z+=.31){
  addBox('quilt stitched channel',[.89,.018,.018],[2.87,1.407,z],mat(0x82907d,.9),{cast:false});
  addBox('quilt corner tie',[.045,.055,.04],[2.41,1.37,z+.06],brass);
}
for(const x of [2.50,3.24])addBox('berth safety rail',[.05,.30,1.82],[x,1.22,.20],steel);
addBox('bedside night shelf',[.48,.075,.46],[2.95,1.68,1.77],warmWood);
addCyl('bedside mug',.085,.08,.15,[2.96,1.79,1.76],mat(0xd0c2a5,.45,.1),{radial:10});
addBox('berth lamp base',[.16,.025,.16],[2.76,1.73,1.70],brass);
addTube('berth reading light arm',[[2.76,1.75,1.7],[2.72,2.03,1.64],[2.57,2.11,1.59]],.018,steel);
addCyl('berth reading shade',.09,.14,.14,[2.57,2.09,1.59],darkMetal,{radial:12});
addSphere('berth reading bulb',.055,[2.57,2.01,1.59],amber,{geo:lowSphereGeo});addLight(0xffbf77,12,2.8,[2.57,1.96,1.59]);
// Folded spare suit and soft grey storage sacks underneath the cot.
for(let i=0;i<3;i++){
  const z=-.44+i*.52;
  addBox('under-berth field crate',[.73,.35,.43],[2.86,.38,z],i===1?enamel:darkGreen,{hit:true});
  addBox('field crate lid seam',[.74,.025,.44],[2.86,.55,z],steel);
  addBox('crate inventory plate',[.28,.115,.018],[2.86,.39,z-.225],gasket,{cast:false});
  for(const x of [2.54,3.18])fastener([x,.41,z-.235],[0,0,-1],.021);
}
addBox('rolled wool bivy',[.33,.27,.82],[2.73,.68,-.89],warmFabric,{rot:[0,0,.12]});
addBox('canvas pressure hanger',[1.32,.07,.10],[2.72,2.77,-1.13],darkMetal);
for(const z of [-1.60,-1.31,-1.02,-.73])addCyl('brass clothing peg',.027,.030,.18,[2.66,2.70,z],brass,{rot:[0,0,Math.PI/2],radial:8});

// Calibrated heat exchanger; fins, valves and copper return line read clearly up close.
addBox('radiant heater body',[.28,1.20,1.38],[3.08,1.22,-1.43],enamel);
addBox('heater plinth',[.41,.15,1.49],[3.08,.64,-1.43],darkMetal);
for(let i=0;i<13;i++)addBox('heater radiator fin',[.19,.045,1.26],[2.92,.77+i*.068,-1.43],i%3===0?steel:outerPanel,{cast:false});
addBox('heater hot-spot badge',[.02,.12,.34],[2.92,1.20,-1.43],amber,{cast:false});
for(const z of [-2.08,-.78])addBox('radiator bracket',[.13,.56,.07],[3.27,1.34,z],steel);
addTube('copper heater supply',[[3.30,.72,-2.10],[3.39,.75,-2.10],[3.39,.94,-2.10],[3.39,2.35,-2.10],[3.83,2.35,-2.10]],.038,brass);
addTube('copper heater return',[[3.34,.71,-.75],[3.45,.71,-.75],[3.45,.86,-.75],[3.45,1.04,-.75]],.034,steel);
for(const y of [.92,1.58])addCyl('radiator valve handwheel',.09,.09,.035,[3.39,y,-2.10],brass,{radial:8});
addBox('heater regulator box',[.21,.28,.22],[3.27,2.46,-2.10],darkMetal);
addSphere('heater setpoint gauge',.12,[3.405,2.46,-2.10],displayMat,{geo:lowSphereGeo,sx:1,sy:1,sz:.22});
// Safety strip, first-aid pouch, face towel and hand-held radio beside the berth.
addBox('first-aid pouch',[.10,.39,.42],[3.50,2.69,-.26],mat(0x737267,.95),{hit:false});
addBox('first-aid mark',[.018,.18,.19],[3.558,2.72,-.26],mat(0xc2ba9e,.94),{cast:false});
addBox('first-aid cross vertical',[.012,.105,.036],[3.573,2.72,-.26],mat(0xb54b45,.82),{cast:false});
addBox('first-aid cross horizontal',[.012,.032,.12],[3.573,2.72,-.26],mat(0xb54b45,.82),{cast:false});
addBox('handheld marine radio',[.20,.32,.13],[2.94,.62,1.82],darkMetal);
for(let i=0;i<7;i++)addBox('radio keypad',[.023,.023,.014],[2.88+(i%3)*.048,.59-Math.floor(i/3)*.048,1.744],steel,{cast:false});
addCyl('radio rotary dial',.035,.035,.025,[2.98,.78,1.744],brass,{rot:[Math.PI/2,0,0],radial:9});

// A galley shelf, insulated kettle and camp provisions live just inside the west corner.
addBox('galley lower cabinet',[.72,.81,1.30],[-3.02,.94,-1.80],darkGreen,{hit:true});
addBox('galley worktop',[.88,.105,1.44],[-2.99,1.39,-1.80],warmWood,{hit:true});
addBox('galley aluminum drip rail',[.90,.055,.06],[-2.99,1.47,-2.50],steel);
for(const z of [-2.24,-1.80,-1.36]){
  addBox('galley drawer front',[.64,.17,.032],[-2.62,.87,z],enamel);
  addBox('galley drawer bow',[.12,.022,.038],[-2.595,.89,z-.045],brass);
  for(const y of [.81,.95])fastener([-2.575,y,z-.036],[1,0,0],.020);
}
addCyl('induction cookplate',.28,.30,.065,[-2.98,1.48,-1.98],darkMetal,{radial:16});
addCyl('induction glass top',.225,.225,.018,[-2.98,1.523,-1.98],mat(0x20323b,.22,.35),{radial:16});
addCyl('kettle base',.19,.23,.075,[-3.04,1.57,-2.06],steel,{radial:14});
addCyl('insulated camp kettle',.20,.18,.42,[-3.04,1.80,-2.06],enamel,{radial:14});
addCyl('kettle lid',.17,.20,.045,[-3.04,2.025,-2.06],brass,{radial:14});
addTube('kettle insulated handle',[[-3.23,1.98,-2.06],[-3.37,2.05,-2.06],[-3.37,1.69,-2.06],[-3.23,1.62,-2.06]],.023,darkMetal);
addCyl('kettle spout',.077,.11,.30,[-2.79,1.82,-2.06],steel,{rot:[0,0,-.65],radial:10});
addBox('provision rack',[.66,.74,.42],[-2.91,2.05,-1.05],steel);
for(const y of [1.77,2.14,2.51])addBox('provision rack ledge',[.60,.045,.37],[-2.90,y,-1.05],warmWood);
for(let i=0;i<5;i++){
  const z=-1.19+(i%3)*.125,y=1.96+Math.floor(i/3)*.37;
  addCyl('stainless ration tin',.060,.065,.20,[-2.83,y,z],i%2?frostSteel:brass,{radial:10});
  addCyl('ration tin snap lid',.068,.068,.024,[-2.83,y+.112,z],darkMetal,{radial:10});
}
addCyl('enamel cocoa mug',.078,.087,.13,[-2.56,1.53,-1.63],mat(0xd9c8a7,.43,.08),{radial:12});
addTube('mug handle',[[-2.49,1.59,-1.63],[-2.44,1.62,-1.63],[-2.43,1.52,-1.63],[-2.49,1.49,-1.63]],.018,brass);
addBox('galley hand towel',[.023,.38,.48],[-3.41,.94,-2.45],mat(0x9dada7,.94),{rot:[0,0,-.06]});
addBox('fold-out galley bench',[.55,.09,.62],[-2.88,.68,-.72],warmWood);
addBox('galley seat brace',[.07,.38,.07],[-2.88,.44,-.72],steel);

// Wall charts use subdued hand-drawn contours instead of a decorative interface wall.
function contourTexture(title,code,seed=2){
  const c=document.createElement('canvas');c.width=640;c.height=430;const g=c.getContext('2d');
  g.fillStyle='#d4d0c1';g.fillRect(0,0,640,430);g.fillStyle='#526367';g.font='600 28px Arial';g.fillText(title.toUpperCase(),28,42);
  g.fillStyle='#7a8983';g.font='16px monospace';g.fillText(code,30,69);g.strokeStyle='#9aa49a';g.lineWidth=1.5;
  let n=seed|0;const random=()=>{n=(n*1664525+1013904223)|0;return(n>>>0)/4294967296;};
  for(let j=0;j<10;j++){
    const cy=105+j*26+(random()-.5)*13,amp=15+random()*22,phase=random()*6;
    g.beginPath();for(let x=25;x<610;x+=5){const y=cy+Math.sin(x*.018+phase)*amp+Math.sin(x*.043-phase)*amp*.30;if(x===25)g.moveTo(x,y);else g.lineTo(x,y);}g.stroke();
  }
  g.fillStyle='#bd8d59';g.beginPath();g.arc(458,244,10,0,Math.PI*2);g.fill();g.strokeStyle='#465b5d';g.lineWidth=3;g.beginPath();g.moveTo(458,244);g.lineTo(523,177);g.stroke();
  g.fillStyle='#5e706f';g.font='15px monospace';g.fillText('BASE K-17',465,272);g.fillText('GLACIAL PROFILES   /   SECTOR 4',28,398);
  const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=4;return new THREE.MeshStandardMaterial({map:t,roughness:.93,side:THREE.DoubleSide});
}
function wallMap(name,w,h,pos,rot,title,code,seed){
  addBox(`${name} frame`,[w+.12,h+.12,.05],[pos[0],pos[1],pos[2]],darkMetal,{rot:rot,cast:false});
  addPlane(name,w,h,pos,contourTexture(title,code,seed),rot);
  for(const dx of [-w*.46,w*.46])for(const dy of [-h*.43,h*.43]){
    const p=[pos[0]+dx,pos[1]+dy,pos[2]-.038];fastener(p,[0,0,-1],.023);
  }
}
wallMap('surface transect chart',1.38,.83,[-2.11,2.49,2.876],[0,Math.PI,0],'Surface traverse','NORTH RIDGE   ·   JUL / DAY 084',7);
wallMap('thermal maintenance card',.88,.67,[2.07,2.54,2.875],[0,Math.PI,0],'Heat loop','WEEKLY SERVICE   ·   CHECK RETURN',12);
wallMap('ice core inventory',.86,.62,[.14,2.57,2.875],[0,Math.PI,0],'Core rack','12 / 19   ·   DRY STORAGE',30);
// Fleece parka hung on a reinforced hook, with real layered collar, cuffs and zip placket.
const coatShape=new THREE.Shape();coatShape.moveTo(-.53,.03);coatShape.lineTo(.53,.03);coatShape.lineTo(.46,.42);coatShape.lineTo(.26,.59);coatShape.lineTo(.38,1.20);coatShape.lineTo(.22,1.32);coatShape.lineTo(.07,1.13);coatShape.lineTo(0,.92);coatShape.lineTo(-.07,1.13);coatShape.lineTo(-.22,1.32);coatShape.lineTo(-.38,1.20);coatShape.lineTo(-.26,.59);coatShape.lineTo(-.46,.42);coatShape.closePath();
const coatGeo=new THREE.ExtrudeGeometry(coatShape,{depth:.11,bevelEnabled:true,bevelSegments:2,steps:1,bevelSize:.018,bevelThickness:.018});
const coat=new THREE.Mesh(coatGeo,mat(0x9d6046,.97,.01,{map:clothGrain,bumpMap:clothGrain,bumpScale:.024}));coat.position.set(-3.49,.77,-1.98);coat.rotation.y=Math.PI/2;coat.castShadow=true;coat.receiveShadow=true;world.add(coat);
addBox('parka zipper welt',[.035,1.05,.032],[-3.36,1.39,-1.98],brass,{cast:false});
addBox('parka lower cargo pocket',[.045,.34,.40],[-3.35,1.02,-1.69],mat(0x815443,.96),{cast:false});
addBox('parka chest radio pocket',[.04,.27,.28],[-3.35,1.77,-1.91],mat(0x875947,.96),{cast:false});
for(const z of [-2.42,-1.55])addBox('parka reflective cuff',[.07,.14,.20],[-3.28,.93,z],frostSteel,{rot:[0,0,-.08],cast:false});
addBox('arctic jacket hanger',[.68,.035,.027],[-3.39,2.22,-1.98],brass);
addTube('hanging loop',[[-3.39,2.23,-1.98],[-3.39,2.38,-1.98],[-3.39,2.40,-1.91]],.016,steel);
addBox('hanging glove pair',[.20,.11,.30],[-3.32,1.68,-2.61],warmFabric,{rot:[0,0,.10]});
for(let i=0;i<4;i++)addBox('glove finger rib',[.13,.021,.018],[-3.31,1.67-i*.022,-2.71+i*.055],steel,{cast:false});
// Vertical ice probe and shoulder loops stow beneath the coat without crowding the floor route.
addCyl('survey ice probe',.027,.028,1.58,[-3.34,1.52,-.83],steel,{rot:[0,0,.025],radial:8});
addCyl('ice probe locking collar',.063,.063,.062,[-3.34,1.91,-.83],brass,{radial:8});
for(const z of [-.88,-.58]){
  addTube('mounted harness loop',[[-3.42,1.72,z],[-3.35,1.90,z],[-3.30,2.13,z],[-3.42,2.24,z]],.028,darkGreen);
  fastener([-3.53,1.78,z],[-1,0,0],.021);
}

// Rime-lit sample canister alcove under the west window; glazing above remains unobstructed.
addBox('cold specimen cart frame',[.66,.07,1.04],[-2.82,.73,.82],steel,{hit:true});
for(const x of [-3.08,-2.56])for(const z of [.39,1.25]){
  addCyl('sample-cart wheel',.11,.11,.075,[x,.60,z],darkMetal,{rot:[0,0,Math.PI/2],radial:12});
  fastener([x,.60,z],[0,0,1],.022);
}
addBox('sample cart top',[.72,.075,1.08],[-2.82,.80,.82],darkGreen,{hit:true});
for(let i=0;i<5;i++){
  const z=.43+i*.18;
  addBox('frost-tag vial cradle',[.15,.12,.14],[-2.81,.91,z],steel);
  addCyl('sealed bore sample',.052,.052,.23,[-2.81,1.07,z],displayMat,{radial:10});
  addCyl('sample vial stopper',.059,.059,.042,[-2.81,1.207,z],brass,{radial:10});
  addBox('frost inventory sleeve',[.09,.08,.015],[-2.81,1.04,z-.071],innerPanelAlt,{cast:false});
}
// Frosted ice ponds and shallow trapped melt sheets break up the lee-side snow surface.
const iceSheetMat=mat(0x85b7cf,.14,.48,{transparent:true,opacity:.68,depthWrite:false,emissive:0x102638,emissiveIntensity:.12,flatShading:true});
function iceSheet(name,cx,cz,rx,rz,seed){
  let a=seed|0;const rr=()=>{a=(a*1103515245+12345)|0;return(a>>>0)/4294967296;};
  const n=13,pos=[0,0,0],uv=[.5,.5],col=[.90,.97,1],idx=[];
  for(let i=0;i<n;i++){
    const ang=i/n*Math.PI*2,scale=.72+rr()*.34,x=Math.cos(ang)*rx*scale,z=Math.sin(ang)*rz*scale;
    pos.push(x,0,z);uv.push(.5+x/(rx*2),.5+z/(rz*2));const c=.91+rr()*.11;col.push(c,.96*c,c);
    if(i>0)idx.push(0,i,i+1);
  }
  idx.push(0,n,1);const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setAttribute('color',new THREE.Float32BufferAttribute(col,3));g.setIndex(idx);g.computeVertexNormals();
  const m=new THREE.Mesh(g,iceSheetMat);m.name=name;m.rotation.x=-Math.PI/2;m.position.set(cx,snowHeight(cx,cz)+.016,cz);m.receiveShadow=true;world.add(m);
  addBox('ice ledge crease',[rx*1.6,.025,.028],[cx,snowHeight(cx,cz)+.027,cz-rz*.45],frostMat,{cast:false});
}
iceSheet('frozen brine lens',3.55,-8.15,1.48,.86,31);
iceSheet('frosted puddle',-4.20,-6.95,.82,.43,44);
iceSheet('ice in lee hollow',7.6,-.55,.90,.52,27);
for(let i=0;i<14;i++){
  const x=(rnd()-.5)*14,z=-8.8+rnd()*7.8;
  const y=snowHeight(x,z)+.015;
  addSphere('blue ice exposed in blown crust',1,[x,y,z],i%2?frostMat:iceSheetMat,{sx:.20+rnd()*.22,sy:.025+rnd()*.018,sz:.12+rnd()*.16,geo:lowSphereGeo,rot:[0,rnd()*Math.PI,0],cast:false});
}

// Batch the repeated static shell and small parts while retaining every instance transform.
function batchStaticShapes(root){
  const shared=new Set([cubeGeo,sphereGeo,lowSphereGeo,cylGeo,boltGeo]);
  const buckets=new Map();
  root.traverse(node=>{
    if(!node.isMesh||node.isInstancedMesh||!shared.has(node.geometry)||!node.parent)return;
    const key=[node.parent.uuid,node.geometry.uuid,node.material.uuid,Number(node.castShadow),Number(node.receiveShadow)].join('|');
    let bucket=buckets.get(key);if(!bucket){bucket={parent:node.parent,geometry:node.geometry,material:node.material,cast:node.castShadow,receive:node.receiveShadow,meshes:[]};buckets.set(key,bucket);}bucket.meshes.push(node);
  });
  let merged=0;
  for(const b of buckets.values())if(b.meshes.length>1){
    const inst=new THREE.InstancedMesh(b.geometry,b.material,b.meshes.length);
    inst.name=`static detail batch (${b.meshes.length})`;inst.castShadow=b.cast;inst.receiveShadow=b.receive;inst.frustumCulled=true;
    b.meshes.forEach((mesh,i)=>{mesh.updateMatrix();inst.setMatrixAt(i,mesh.matrix);mesh.parent.remove(mesh);});
    inst.instanceMatrix.needsUpdate=true;inst.computeBoundingBox();inst.computeBoundingSphere();b.parent.add(inst);merged+=b.meshes.length;
  }
  return merged;
}
const batchedMeshCount=batchStaticShapes(world);

// Collision follows the same analytic surface as the tessellated snow and the boarding ramp.
const AVATAR_H=1.78, EYE_H=1.62, BODY_R=.255;
function floorHeight(x,z){
  if(x> -3.57&&x<3.57&&z> -2.72&&z<2.93)return .50;
  if(Math.abs(x)<.965&&z> -4.91&&z< -2.72)return .50;
  if(Math.abs(x)<1.60&&z>= -7.20&&z<= -4.80){
    const u=THREE.MathUtils.clamp((-z-4.82)/(7.20-4.82),0,1);
    return .48-.39*u+.018*Math.sin(18*u+1.3*x)*Math.sin(8*x);
  }
  return snowHeight(x,z);
}
function isBlocked(x,z,feet){
  if(Math.abs(x)>22.8||Math.abs(z)>22.8)return true;
  const left=x-BODY_R,right=x+BODY_R,near=z-BODY_R,far=z+BODY_R;
  for(const c of colliders){
    if(c.maxY<=feet+.12||c.minY>=feet+AVATAR_H+.03)continue;
    if(right>c.minX&&left<c.maxX&&far>c.minZ&&near<c.maxZ)return true;
  }
  return false;
}
// A pair of ski-boot guards sit alongside the open outer slab.
colliders.push({minX:.66,maxX:.81,minZ:-5.79,maxZ:-5.03,minY:.49,maxY:2.29});
colliders.push({minX:.66,maxX:.81,minZ:-2.93,maxZ:-2.12,minY:.49,maxY:2.30});
let px=0,pz=-10.5,yaw=Math.PI,pitch=-.035,velX=0,velZ=0;
function resetPosition(){px=0;pz=-10.5;yaw=Math.PI;pitch=-.035;velX=velZ=0;syncCamera();toast('STARTING POINT   /   LEE-SIDE SNOW');}
camera.rotation.order='YXZ';
function syncCamera(){camera.position.set(px,floorHeight(px,pz)+EYE_H,pz);camera.rotation.set(pitch,yaw,0);sky.position.copy(camera.position);starField.position.copy(camera.position);}
syncCamera();

// Ceiling bounce and measured fog retain definition in the small exterior court.
scene.fog=new THREE.FogExp2(0x8aaccd,.0080);
scene.background=new THREE.Color(0x152647);

const intro=document.querySelector('#intro');
const enterButton=document.querySelector('#enter');
const resetButton=document.querySelector('#reset');
const locationText=document.querySelector('#location');
const timingText=document.querySelector('#frame');
const canvasReticle=document.querySelector('#reticle');
const toastEl=document.querySelector('#toast');
let hasStarted=false, mouseDrag=false,toastTimeout=0;
const pressed=new Set();
function toast(msg){toastEl.textContent=msg;toastEl.classList.add('show');clearTimeout(toastTimeout);toastTimeout=setTimeout(()=>toastEl.classList.remove('show'),2100);}
function begin(){
  hasStarted=true;intro.classList.add('hidden');document.body.classList.add('playing');canvas.setAttribute('tabindex','0');canvas.focus({preventScroll:true});
  try{const r=canvas.requestPointerLock({unadjustedMovement:true});if(r&&typeof r.catch==='function')r.catch(()=>canvas.requestPointerLock());}catch(e){try{canvas.requestPointerLock();}catch(_){}}
  toast('WALK THE COMPACTED TRACK   ·   WARM LIGHT AHEAD');
}
enterButton.addEventListener('click',begin);
canvas.addEventListener('click',()=>{if(hasStarted&&!document.pointerLockElement){try{canvas.requestPointerLock();}catch(_){mouseDrag=true;}}});
resetButton.addEventListener('click',resetPosition);
document.addEventListener('pointerlockchange',()=>{
  const locked=document.pointerLockElement===canvas;
  document.body.classList.toggle('locked',locked);
  if(locked){mouseDrag=false;pressed.clear();}
  else if(hasStarted)toast('CLICK TO LOOK AROUND   ·   ESC RELEASES THE MOUSE');
});
document.addEventListener('mousemove',e=>{
  if(document.pointerLockElement===canvas||mouseDrag){yaw+=e.movementX*.0020;pitch-=e.movementY*.0018;pitch=THREE.MathUtils.clamp(pitch,-1.15,1.05);}
});
canvas.addEventListener('pointerdown',e=>{if(hasStarted&&!document.pointerLockElement&&e.button===0)mouseDrag=true;});
document.addEventListener('pointerup',()=>{mouseDrag=false;});
document.addEventListener('keydown',e=>{
  if(['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','ShiftLeft','ShiftRight'].includes(e.code))e.preventDefault();
  if(e.code==='KeyR'&&!e.repeat){resetPosition();return;}
  if(e.code==='Escape'){pressed.clear();velX=velZ=0;return;}
  pressed.add(e.code);
});
document.addEventListener('keyup',e=>pressed.delete(e.code));
window.addEventListener('blur',()=>{pressed.clear();mouseDrag=false;velX=velZ=0;});
document.addEventListener('visibilitychange',()=>{if(document.hidden){pressed.clear();velX=velZ=0;}});
window.addEventListener('resize',()=>{
  camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();
  renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.45));renderer.setSize(innerWidth,innerHeight);
});
function where(){
  if(Math.abs(px)<.97&&pz> -4.86&&pz< -2.73)return 'VESTIBULE  /  AIRLOCK';
  if(Math.abs(px)<3.45&&pz> -2.68&&pz<2.86)return 'WORK ROOM  /  K—17';
  if(pz< -4.88&&pz> -7.2&&Math.abs(px)<1.65)return 'COMPACTED SNOW RAMP';
  if(Math.abs(px)<6.5&&pz< -7.2)return 'LEE-SIDE SNOW';
  if(Math.abs(px)>4.05&&Math.abs(px)<8&&pz> -4.8&&pz<5.7)return 'WEATHER-SIDE SERVICE WALK';
  if(pz>=5.6)return 'NORTH SNOWFIELD';
  return 'SHELTER COURT';
}
let lastFrame=performance.now(),lastHud=lastFrame;const frameSamples=[];let phase=.0;
const tempVector=v();
function update(dt,now,frameMs){
  if(hasStarted){
    const fw=(pressed.has('KeyW')||pressed.has('ArrowUp')?1:0)-(pressed.has('KeyS')||pressed.has('ArrowDown')?1:0);
    const st=(pressed.has('KeyD')||pressed.has('ArrowRight')?1:0)-(pressed.has('KeyA')||pressed.has('ArrowLeft')?1:0);
    const len=Math.hypot(fw,st)||1,speed=(pressed.has('ShiftLeft')||pressed.has('ShiftRight')?3.15:2.18);
    const wantX=(-Math.sin(yaw)*fw+Math.cos(yaw)*st)/len*speed;
    const wantZ=(-Math.cos(yaw)*fw-Math.sin(yaw)*st)/len*speed;
    const ease=1-Math.exp(-14*dt);velX+=(wantX-velX)*ease;velZ+=(wantZ-velZ)*ease;
    const steps=Math.max(1,Math.ceil(Math.hypot(velX,velZ)*dt/.12));const sx=velX*dt/steps,sz=velZ*dt/steps;
    for(let i=0;i<steps;i++){
      const nx=px+sx,fx=floorHeight(nx,pz);if(!isBlocked(nx,pz,fx)){px=nx;}else velX=0;
      const nz=pz+sz,fz=floorHeight(px,nz);if(!isBlocked(px,nz,fz)){pz=nz;}else velZ=0;
    }
    if((now-lastHud)>230){locationText.textContent=where();}
    camera.position.set(px,floorHeight(px,pz)+EYE_H,pz);camera.rotation.set(pitch,yaw,0);sky.position.copy(camera.position);starField.position.copy(camera.position);
  }
  const ms=Math.min(1000,Math.max(0,frameMs));frameSamples.push(ms);if(frameSamples.length>120)frameSamples.shift();
  if(now-lastHud>600){
    if(frameSamples.length>8){const a=frameSamples.slice().sort((x,y)=>x-y);timingText.textContent=`${a[Math.floor(a.length*.95)]?.toFixed(1)||'—'} ms`;}lastHud=now;
  }
}
function loop(now){
  requestAnimationFrame(loop);const frameMs=now-lastFrame,raw=frameMs/1000;lastFrame=now;const dt=Math.min(.04,Math.max(.001,raw));update(dt,now,frameMs);renderer.render(scene,camera);
}
requestAnimationFrame(loop);

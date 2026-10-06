import * as THREE from '../vendor/three.module.js';
import { noise, randomGenerator } from './noise.js';
import { POOL, poolRadius, dryFloorHeight, floorHeight, mainCeilingHeight, landingCeilingHeight } from './spatial.js';
import { buildPendant } from './stone.js';

const rand = randomGenerator(23990);
function addMesh(group, geometry, material, x, y, z, name = '') {
  const m = new THREE.Mesh(geometry, material); m.position.set(x, y, z);
  m.castShadow = true; m.receiveShadow = true; m.name = name; group.add(m); return m;
}
function cylinderBetween(group, a, b, radius, material, segments = 8) {
  const start = new THREE.Vector3(...a), end = new THREE.Vector3(...b), delta = end.clone().sub(start);
  const m = addMesh(group, new THREE.CylinderGeometry(radius, radius * 1.12, delta.length(), segments), material, ...start.clone().add(end).multiplyScalar(.5).toArray());
  m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), delta.normalize()); return m;
}
function woodTexture() {
  const c = document.createElement('canvas'); c.width = 128; c.height = 512;
  const ctx = c.getContext('2d'), d = ctx.createImageData(c.width, c.height);
  for (let y = 0; y < c.height; y++) for (let x = 0; x < c.width; x++) {
    const n = noise(x * .18, y * .008, 4), streak = Math.sin(x * .95 + Math.sin(y * .011) * 2) * .055;
    const v = 77 + (n - .5) * 50 + streak * 60 + rand() * 6, i = (x + y * c.width) * 4;
    d.data[i] = v * 1.12; d.data[i + 1] = v; d.data[i + 2] = v * .73; d.data[i + 3] = 255;
  }
  ctx.putImageData(d, 0, 0);
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  return tex;
}
function labelTexture(lines, background = '#aaa58c', color = '#303c38') {
  const c = document.createElement('canvas'); c.width = 512; c.height = 256;
  const ctx = c.getContext('2d'); ctx.fillStyle = background; ctx.fillRect(0, 0, 512, 256);
  ctx.strokeStyle = '#33463d55'; ctx.lineWidth = 3; ctx.strokeRect(17, 17, 478, 222);
  ctx.textAlign = 'center'; ctx.fillStyle = color;
  lines.forEach((line, i) => { ctx.font = i === 1 ? 'bold 62px Georgia' : '20px Arial'; ctx.fillText(line, 256, 65 + i * 62); });
  for (let i = 0; i < 400; i++) { ctx.fillStyle = `rgba(30,35,28,${rand() * .14})`; ctx.fillRect(rand() * 512, rand() * 256, rand() * 10, 1); }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}
function ropeTexture() {
  const c=document.createElement('canvas');c.width=128;c.height=128;
  const ctx=c.getContext('2d'),data=ctx.createImageData(128,128);
  for(let y=0;y<128;y++)for(let x=0;x<128;x++){
    const strand=Math.sin((x/128*8+y/128*3)*Math.PI*2),grain=rand()*13;
    const v=176+strand*15+grain,i=(x+y*128)*4;
    data.data[i]=v;data.data[i+1]=v*.94;data.data[i+2]=v*.78;data.data[i+3]=255;
  }
  ctx.putImageData(data,0,0);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(12,1);return t;
}

export function buildProps(stoneMaterials) {
  const group = new THREE.Group(); group.name = 'Survey remnants';
  const woodMap = woodTexture();
  const wood = new THREE.MeshStandardMaterial({ map: woodMap, bumpMap: woodMap, bumpScale: .027, roughness: .97, color: '#b8ac89' });
  const iron = new THREE.MeshStandardMaterial({ color: '#514a3a', metalness: .55, roughness: .76 });
  const brass = new THREE.MeshStandardMaterial({ color: '#8e7852', metalness: .72, roughness: .56 });
  const hemp = ropeTexture();
  const rope = new THREE.MeshStandardMaterial({ color: '#b7ac91', map: hemp, bumpMap: hemp, bumpScale: .003, roughness: 1 });

  const posts = [];
  for (const t of [.91, .52, .10, -.30, -.70, -1.10]) {
    const r = poolRadius(t) * 1.07;
    const x = POOL.x + POOL.rx * Math.cos(t) * r, z = POOL.z + POOL.rz * Math.sin(t) * r;
    const y = floorHeight(x, z);
    const post = addMesh(group, new THREE.CylinderGeometry(.045, .062, 1.0, 10, 4), wood, x, y + .47, z, 'Weathered handrail post');
    post.rotation.z = (rand() - .5) * .06;
    addMesh(group, new THREE.CylinderGeometry(.057, .057, .055, 12), iron, x, y + .83, z, 'Forged rope collar');
    addMesh(group, new THREE.CylinderGeometry(.074, .084, .09, 10), iron, x, y + .015, z, 'Post socket');
    posts.push(new THREE.Vector3(x, y + .86, z));
  }
  for (let i = 0; i < posts.length - 1; i++) {
    const a = posts[i], b = posts[i + 1], mid = a.clone().lerp(b, .5); mid.y -= .17;
    const curve = new THREE.CatmullRomCurve3([a, a.clone().lerp(mid, .5), mid, mid.clone().lerp(b, .5), b]);
    const m = addMesh(group, new THREE.TubeGeometry(curve, 32, .019, 6, false), rope, 0, 0, 0, 'Sagging hemp rope');
    m.castShadow = false;
    // A few tight wraps tell the scale at arm's length.
    for (let j = 0; j < 3; j++) {
      const wrap = addMesh(group, new THREE.TorusGeometry(.057, .011, 5, 12), rope, a.x, a.y - .025 * j, a.z);
      wrap.rotation.x = Math.PI / 2;
    }
  }

  // A small survey instrument on an aged three-leg stand, about chest height.
  const tx = 6.5, tz = -16.2, base = dryFloorHeight(tx, tz);
  const top = [tx, base + 1.23, tz];
  for (let i = 0; i < 3; i++) {
    const a = i / 3 * Math.PI * 2 + .3;
    const foot = [tx + Math.cos(a) * .47, base + .025, tz + Math.sin(a) * .47];
    cylinderBetween(group, foot, top, .028, wood, 10);
    cylinderBetween(group, foot, [foot[0], foot[1] + .12, foot[2]], .033, iron, 8);
  }
  addMesh(group, new THREE.CylinderGeometry(.13, .14, .055, 24), brass, tx, base + 1.26, tz, 'Survey head');
  addMesh(group, new THREE.CylinderGeometry(.05, .07, .14, 16), iron, tx, base + 1.36, tz);
  const scope = addMesh(group, new THREE.CylinderGeometry(.043, .063, .34, 16), brass, tx, base + 1.47, tz, 'Survey telescope');
  scope.rotation.x = Math.PI / 2; scope.rotation.z = -.08;
  const glass = new THREE.MeshStandardMaterial({ color: '#263e3d', metalness: .35, roughness: .12 });
  const lens = addMesh(group, new THREE.CircleGeometry(.057, 24), glass, tx, base + 1.47, tz + .171);
  const dial = addMesh(group, new THREE.TorusGeometry(.13, .014, 6, 32), brass, tx, base + 1.44, tz);
  dial.rotation.y = Math.PI / 2;
  addMesh(group, new THREE.BoxGeometry(.06, .14, .06), iron, tx, base + 1.4, tz);

  const cx = 7.35, cz = -14.65, cy = dryFloorHeight(cx, cz);
  const crate = addMesh(group, new THREE.BoxGeometry(.72, .39, .44), wood, cx, cy + .22, cz, 'Survey case');
  crate.rotation.y = -.16;
  for (const offset of [-.23, .23]) {
    const strap = addMesh(group, new THREE.BoxGeometry(.028, .415, .465), iron, cx + offset, cy + .23, cz);
    strap.rotation.y = -.16;
  }
  const handle = addMesh(group, new THREE.TorusGeometry(.085, .009, 6, 18, Math.PI), iron, cx, cy + .422, cz);
  handle.rotation.y = -.16;
  const plaque = new THREE.MeshStandardMaterial({ map: labelTexture(['GEOLOGICAL SURVEY', '07', 'HOLLOW · EAST BANK']), roughness: .75, metalness: .15 });
  const sign = addMesh(group, new THREE.BoxGeometry(.38, .19, .008), plaque, 6.75, 1.05, -8.5, 'Survey marker 07');
  sign.rotation.y = -.22; sign.rotation.z = -.04;
  cylinderBetween(group, [6.77, dryFloorHeight(6.77, -8.53), -8.53], [6.77, 1.14, -8.53], .013, iron);
  for (const dx of [-.16, .16]) addMesh(group, new THREE.SphereGeometry(.008, 8, 5), iron, 6.75 + dx, 1.05, -8.49);

  // Small rust-stained bolts and a faded height mark by the landing.
  const markMat = new THREE.MeshStandardMaterial({ map: labelTexture(['DATUM', '+ 0.94 m', 'SURVEY  /  1938'], '#a99c7e', '#555d4d'), roughness: 1 });
  const markerTheta=1.26,markerY=1.65;
  const markerMod=.18*Math.sin(markerTheta*5)+.13*Math.sin(markerTheta*9+1);
  const markerRelief=.20*Math.sin(markerY*2.5)+(noise(markerTheta*6,markerY*1.3,7)-.5)*.16;
  const markerX=3.6+(5.1+markerMod+markerRelief-.018)*Math.sin(markerTheta);
  const markerZ=-14.55+(4.7+markerMod+markerRelief-.018)*Math.cos(markerTheta);
  const marker = addMesh(group, new THREE.PlaneGeometry(.30, .15), markMat, markerX, markerY, markerZ, 'Landing datum');
  marker.rotation.y = markerTheta + Math.PI;

  // Pendants cluster at the perimeter so the crown and pool views remain open.
  const pendants = [
    [-7.9, 8.4, -2.2, .66, 2.25], [-9.2, 8.0, 6.1, .7, 1.85], [-6.4, 9.8, 6.3, .44, 1.5],
    [-4.6, 10.5, -4.5, .53, 2.2], [7.1, 8.7, .4, .68, 1.9], [6.8, 8.0, 8.7, .72, 1.6],
    [-.9, 8.2, 13.8, .44, 1.25], [5.8, 8.7, -5.8, .42, 1.4], [-8.6, 8.4, -.8, .32, 1.1],
    [2.2, 7.8, -17.9, .53, 1.65], [6.4, 7.7, -17.7, .34, 1.25]
  ];
  pendants.forEach(([x, _y, z, r, h], i) => {
    const ceiling = z < -12 ? landingCeilingHeight(x,z) : mainCeilingHeight(x,z);
    group.add(buildPendant({ x, z, rx: r, rz: r * .83, h }, ceiling+.12, stoneMaterials.dry, i + 90));
  });
  addContactShadows(group, [
    ...[[-8.55,3.8,1.6],[-6.8,-6.4,1.7],[8.15,3,1.4],[-5.9,11.55,1.7],[.1,-16.8,1.1]],
    [6.5,-16.2,.65],[7.35,-14.65,.56]
  ]);
  return batchStaticProps(group);
}

function addContactShadows(group, locations) {
  const c=document.createElement('canvas');c.width=c.height=128;const ctx=c.getContext('2d');
  const gradient=ctx.createRadialGradient(64,64,4,64,64,64);
  gradient.addColorStop(0,'rgba(15,21,18,.65)');gradient.addColorStop(.45,'rgba(15,21,18,.36)');gradient.addColorStop(1,'rgba(15,21,18,0)');
  ctx.fillStyle=gradient;ctx.fillRect(0,0,128,128);
  const material=new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(c),transparent:true,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-1,side:THREE.DoubleSide});
  for(const [x,z,r] of locations){
    const m=new THREE.Mesh(new THREE.PlaneGeometry(r*2,r*2),material);m.position.set(x,floorHeight(x,z)+.009,z);m.rotation.x=-Math.PI/2;m.name='Soft grounded contact';m.renderOrder=0;group.add(m);
  }
}

// Props are stationary; batch shared materials to avoid many tiny draw calls.
function batchStaticProps(group) {
  group.updateMatrixWorld(true);
  const batches=new Map(),originals=new Set();
  group.traverse(object=>{
    if(!object.isMesh)return;
    let g=object.geometry.clone();g.applyMatrix4(object.matrixWorld);
    if(g.index){const unindexed=g.toNonIndexed();g.dispose();g=unindexed;}
    const key=object.material;
    if(!batches.has(key))batches.set(key,{geometries:[],cast:false,receive:false,order:object.renderOrder});
    const batch=batches.get(key);batch.geometries.push(g);batch.cast||=object.castShadow;batch.receive||=object.receiveShadow;originals.add(object.geometry);
  });
  group.clear();
  for(const [material,batch] of batches){
    const g=new THREE.BufferGeometry(),names=['position','normal','uv'];
    if(material.vertexColors)names.push('color');
    for(const name of names){
      const size=name==='uv'?2:3,total=batch.geometries.reduce((sum,a)=>sum+a.attributes.position.count*size,0),values=new Float32Array(total);
      let offset=0;
      for(const a of batch.geometries){
        const attr=a.attributes[name],count=a.attributes.position.count;
        if(attr)values.set(attr.array,offset);else if(name==='color')values.fill(1,offset,offset+count*size);
        offset+=count*size;
      }
      g.setAttribute(name,new THREE.BufferAttribute(values,size));
    }
    g.computeBoundingSphere();
    const m=new THREE.Mesh(g,material);m.castShadow=batch.cast;m.receiveShadow=batch.receive;m.renderOrder=batch.order;m.name='Batched survey / calcite details';group.add(m);
    batch.geometries.forEach(a=>a.dispose());
  }
  originals.forEach(g=>g.dispose());return group;
}

export function buildAtmosphere() {
  const group = new THREE.Group(); group.name = 'Daylight and suspended dust';
  const skyCanvas = document.createElement('canvas'); skyCanvas.width = 128; skyCanvas.height = 512;
  const ctx = skyCanvas.getContext('2d'), gradient = ctx.createLinearGradient(0, 0, 0, 512);
  gradient.addColorStop(0, '#b5cbd1'); gradient.addColorStop(.6, '#e1e1cd'); gradient.addColorStop(1, '#faf2d8');
  ctx.fillStyle = gradient; ctx.fillRect(0, 0, 128, 512);
  const skyMap = new THREE.CanvasTexture(skyCanvas); skyMap.colorSpace = THREE.SRGBColorSpace;
  const sky = new THREE.Mesh(new THREE.PlaneGeometry(8, 14), new THREE.MeshBasicMaterial({ map: skyMap, side: THREE.DoubleSide, toneMapped: false }));
  sky.rotation.x = Math.PI / 2; sky.position.set(.1, 15.4, 2.3); group.add(sky);

  const beamMaterial = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, side: THREE.DoubleSide,
    vertexShader: 'varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',
    fragmentShader: `varying vec2 vUv;void main(){float edge=pow(max(0.0,1.0-abs(vUv.x-.5)*2.0),2.0);float end=sin(vUv.y*3.14159);gl_FragColor=vec4(.83,.88,.79,edge*end*.026);}`
  });
  for (let i = 0; i < 3; i++) {
    const g = new THREE.BufferGeometry();
    const a = i / 3 * Math.PI, dx = Math.cos(a), dz = Math.sin(a);
    g.setAttribute('position', new THREE.Float32BufferAttribute([
      .2-dx*.55,11.7,2-dz*2.8, .2+dx*.55,11.7,2+dz*2.8,
      -2.3-dx*2.1,-.18,1.5-dz*3.9, -2.3+dx*2.1,-.18,1.5+dz*3.9
    ],3));
    g.setAttribute('uv', new THREE.Float32BufferAttribute([0,1,1,1,0,0,1,0],2)); g.setIndex([0,2,1,1,2,3]);
    const beam = new THREE.Mesh(g,beamMaterial); beam.renderOrder = 4; group.add(beam);
  }
  const positions = [], phases = [];
  for (let i = 0; i < 110; i++) {
    const y = .8 + rand() * 9.5;
    positions.push(-2.3 + y * .21 + (rand() - .5) * 2.8, y, 1.8 + (rand() - .5) * 5.4); phases.push(rand() * 6.28);
  }
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(positions,3)); g.setAttribute('phase',new THREE.Float32BufferAttribute(phases,1));
  const mat = new THREE.ShaderMaterial({
    uniforms:{time:{value:0},pixelRatio:{value:1}},transparent:true,depthWrite:false,
    vertexShader:`uniform float time;uniform float pixelRatio;attribute float phase;varying float alpha;void main(){vec3 p=position;p.x+=sin(time*.11+phase)*.13;p.z+=cos(time*.09+phase)*.10;p.y+=sin(time*.07+phase)*.16;vec4 mv=modelViewMatrix*vec4(p,1.0);gl_Position=projectionMatrix*mv;gl_PointSize=clamp(14.0/-mv.z,1.0,2.5)*pixelRatio;alpha=.12+.13*sin(phase)*sin(phase);}`,
    fragmentShader:`varying float alpha;void main(){float r=length(gl_PointCoord-.5)*2.0;gl_FragColor=vec4(.92,.91,.74,alpha*pow(max(0.0,1.0-r),2.0));}`
  });
  group.add(new THREE.Points(g,mat));
  return { group, update:(time,ratio)=>{mat.uniforms.time.value=time;mat.uniforms.pixelRatio.value=ratio;} };
}

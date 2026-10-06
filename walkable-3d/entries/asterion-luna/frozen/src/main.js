import * as THREE from '/node_modules/three/build/three.module.js';
import { floorHeight, terrainHeight, createCollisionMap } from './collision.js';

// A small, self-contained walkable scene. The layout intentionally follows the
// inspection route: south passage, circular instrument room, east terrace.
const canvas = document.querySelector('#scene');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.7));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.03;
renderer.info.autoReset = true;

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0xc39a70, 0.00215);
const camera = new THREE.PerspectiveCamera(72, innerWidth / innerHeight, .08, 260);
camera.rotation.order = 'YXZ';
const clock = { last: performance.now(), getDelta(){const now=performance.now();const delta=(now-this.last)/1000;this.last=now;return delta;} };

const mat = (color, roughness=.84, opts={}) => new THREE.MeshStandardMaterial({ color, roughness, ...opts });
const plaster = mat('#d7bd8b', .92);
const ivory = mat('#e9d6ad', .77);
const warmStone = mat('#bd8c5b', .95);
const limestone = mat('#d2b38a', .88);
const redStone = mat('#9c6849', .91);
const shadowStone = mat('#533e32', .98);
const bronze = mat('#80613c', .39, { metalness:.72 });
const bronzeLight = mat('#bc9458', .32, { metalness:.78 });
const darkBronze = mat('#493d2e', .48, { metalness:.66 });
const blueTile = mat('#437d81', .38, { metalness:.12 });
const turquoise = mat('#77a4a0', .35, { metalness:.12 });
const paleTile = mat('#d9c6a0', .76);
const obsidian = mat('#16272a', .24, { metalness:.32 });
const glass = new THREE.MeshPhysicalMaterial({ color:'#9ebcb5', roughness:.13, metalness:.12, transmission:.35, transparent:true, opacity:.75, thickness:.3 });
const sandMats = ['#c6a06c','#d5b47e','#b88f60','#dfc18c'].map(c => mat(c,.99));
const rockMats = ['#625047','#756052','#866d59','#544941','#9a795e'].map(c => mat(c,.96));

function noiseTexture(base='#d1b98d', accent='#a88d66', size=256, seed=56) {
  let s=seed; const rnd=()=>((s=(s*1664525+1013904223)>>>0)/4294967296);
  const c=document.createElement('canvas'); c.width=c.height=size; const x=c.getContext('2d');
  x.fillStyle=base; x.fillRect(0,0,size,size);
  for(let i=0;i<1300;i++){const r=1+rnd()*7;x.globalAlpha=.025+rnd()*.12;x.fillStyle=rnd()>.48?accent:'#fff1cf';x.beginPath();x.ellipse(rnd()*size,rnd()*size,r*1.7,rnd()*r, rnd()*3.14,0,6.29);x.fill();}
  for(let i=0;i<130;i++){x.globalAlpha=.06+rnd()*.12;x.fillStyle=accent;x.fillRect(rnd()*size,rnd()*size,1+rnd()*3,1+rnd()*11);}
  x.globalAlpha=1; const t=new THREE.CanvasTexture(c); t.colorSpace=THREE.SRGBColorSpace; t.wrapS=t.wrapT=THREE.RepeatWrapping; t.anisotropy=4; return t;
}
const plasterTex=noiseTexture('#ddc79c','#aa9169',384,21); plasterTex.repeat.set(3,2);
const floorTex=noiseTexture('#bba077','#675843',256,76); floorTex.repeat.set(6,6);
const plasterTextured = new THREE.MeshStandardMaterial({ map:plasterTex, color:'#e6d3ad', roughness:.94, bumpMap:plasterTex, bumpScale:.038 });
const stoneTextured = new THREE.MeshStandardMaterial({ map:floorTex, color:'#d1b48a', roughness:.97, bumpMap:floorTex, bumpScale:.055 });

const root=new THREE.Group(); scene.add(root);
const geoBox=new THREE.BoxGeometry(1,1,1), geoCyl=new THREE.CylinderGeometry(1,1,1,24), geoSphere=new THREE.SphereGeometry(1,12,8);
function mesh(g,m,p=[0,0,0],r=[0,0,0],scale=null, parent=root, cast=true, receive=true){
  const o=new THREE.Mesh(g,m);o.position.set(...p);if(r)o.rotation.set(...r);if(scale)o.scale.set(...scale);o.castShadow=cast;o.receiveShadow=receive;parent.add(o);return o;
}
function box(m,p,s,r=[0,0,0],parent=root,cast=true){return mesh(geoBox,m,p,r,s,parent,cast,true);}
function cylinder(rt,rb,h,m,p,axis=[0,1,0],seg=32,parent=root){
  const g=new THREE.CylinderGeometry(rt,rb,h,seg,1,false);const o=mesh(g,m,p,[0,0,0],null,parent);o.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),new THREE.Vector3(...axis).normalize());return o;
}
function torus(R,t,m,p,n=[0,0,1],parent=root,segments=96){const o=mesh(new THREE.TorusGeometry(R,t,10,segments),m,p,null,null,parent);o.quaternion.setFromUnitVectors(new THREE.Vector3(0,0,1),new THREE.Vector3(...n).normalize());return o;}
function addLineSegments(positions,color='#64503b',opacity=.82,parent=root){const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));const m=new THREE.LineBasicMaterial({color,transparent:opacity<1,opacity});const l=new THREE.LineSegments(g,m);parent.add(l);return l;}
function groupAt(parent=root,p=[0,0,0],yaw=0){const g=new THREE.Group();g.position.set(...p);g.rotation.y=yaw;parent.add(g);return g;}

// Late-day sky gradient and far mesa profiles; deliberately light-weight.
{
  const skyG=new THREE.SphereGeometry(250,32,18); const pos=skyG.attributes.position;const cols=[];
  const high=new THREE.Color('#557384'),mid=new THREE.Color('#abb1a2'),low=new THREE.Color('#edc18a');
  for(let i=0;i<pos.count;i++){const h=THREE.MathUtils.clamp(pos.getY(i)/250,-1,1);const c=h>.05?mid.clone().lerp(high,THREE.MathUtils.smoothstep(h,.05,.82)):low.clone().lerp(mid,THREE.MathUtils.smoothstep(h,-.25,.12));cols.push(c.r,c.g,c.b);}
  skyG.setAttribute('color',new THREE.Float32BufferAttribute(cols,3));const sky=new THREE.Mesh(skyG,new THREE.MeshBasicMaterial({vertexColors:true,side:THREE.BackSide,depthWrite:false}));sky.frustumCulled=false;scene.add(sky);
}
function mesa(points, x, z, color, width=35){
  const shape=new THREE.Shape();shape.moveTo(...points[0]);for(const [px,py] of points.slice(1))shape.lineTo(px,py);shape.lineTo(points.at(-1)[0],0);shape.closePath();
  const g=new THREE.ShapeGeometry(shape,1);const o=mesh(g,mat(color,1,{side:THREE.DoubleSide}),[x,0,z],[0,0,0],[width,1,1],root,false,false);o.position.y=-1.8;
}
// silhouetted mesas (graphic edges, softened by distance haze)
mesa([[-.5,5],[-.34,5.3],[-.22,5.3],[-.12,7],[-.04,7.1],[.03,6.9],[.10,5.5],[.23,5.5],[.38,4.1],[.49,4.1]],-37,-92,'#927858',1);
mesa([[-.5,6],[-.32,6.5],[-.2,6.5],[-.1,8],[.02,8.1],[.12,7.6],[.18,6],[.3,6],[.5,4]],37,-105,'#a07e59',1);
mesa([[-.5,3],[-.3,3.3],[-.15,3.3],[0,5],[.12,4.8],[.23,3.4],[.38,3.4],[.5,2.5]],0,-120,'#b18b61',1);

// One warm sun, substantial ambient fill. The high light ratio makes recesses read.
scene.add(new THREE.HemisphereLight(0xd7e2d9,0x563d2b,.82));
const sun=new THREE.DirectionalLight(0xffd7a2,3.25);sun.position.set(-23,12,25);sun.target.position.set(0,1,0);sun.castShadow=true;
sun.shadow.mapSize.set(2048,2048);sun.shadow.camera.left=-24;sun.shadow.camera.right=24;sun.shadow.camera.top=24;sun.shadow.camera.bottom=-24;sun.shadow.camera.near=1;sun.shadow.camera.far=90;sun.shadow.bias=-.00024;sun.shadow.normalBias=.025;sun.shadow.radius=2;
scene.add(sun,sun.target);

// Rock shelf under the observatory. The plateau gently falls away to a striated cliff.
{
  const rings=16,radial=60,positions=[],colors=[],indices=[];const cTop=new THREE.Color('#786251'),cOuter=new THREE.Color('#695442');
  for(let j=0;j<=rings;j++)for(let i=0;i<=radial;i++){
    const a=i/radial*Math.PI*2, t=j/rings, r=.01+t*21.5;
    const wob=(Math.sin(a*9)+.43*Math.sin(a*17+1.7)+.28*Math.sin(a*31+2.1))*t;
    const rr=r+wob*.8; let y=-.62+.045*Math.sin(a*4+r*.3)+.028*Math.sin(a*9-r*.4);
    if(rr>19.5)y-=Math.pow((rr-19.5)/2,1.4)*.95;
    positions.push(Math.cos(a)*rr,y,Math.sin(a)*rr);
    const shade=.86+.1*Math.sin(a*6+j*2)+.07*Math.sin(a*13-j);const cc=cTop.clone().lerp(cOuter,THREE.MathUtils.clamp((rr-12)/10,0,1));cc.multiplyScalar(shade);colors.push(cc.r,cc.g,cc.b);
    if(i<radial&&j<rings){const n=j*(radial+1)+i;indices.push(n,n+radial+1,n+1,n+1,n+radial+1,n+radial+2);}
  }
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));g.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));g.setIndex(indices);g.computeVertexNormals();mesh(g,new THREE.MeshStandardMaterial({vertexColors:true,roughness:1,side:THREE.DoubleSide}),[0,0,0],null,null,root,true,true);
  // Layered, angular cliff face built as one colored mesh instead of hundreds
  // of tiny draw calls.
  {
    const p=[],col=[],ix=[],steps=120,layers=6;const strata=['#816953','#615345','#8a7058','#574c40','#77624e'];
    for(let k=0;k<layers;k++)for(let i=0;i<steps;i++){
      const a0=i/steps*Math.PI*2,a1=(i+1)/steps*Math.PI*2;const base=new THREE.Color(strata[k%strata.length]);
      const verts=[];
      for(const a of [a0,a1]){
        const wob=Math.sin(a*11+k*.7)*.22+Math.sin(a*27-k)*.07;
        const rt=20.55-k*.10+wob,rb=rt+.17+Math.sin(a*16+k)*.08;
        const yt=-.92-k*.86+Math.sin(a*8+k)*.12,yb=yt-.78+Math.cos(a*12-k)*.13;
        verts.push([Math.sin(a)*rt,yt,Math.cos(a)*rt],[Math.sin(a)*rb,yb,Math.cos(a)*rb]);
      }
      const n=p.length/3;p.push(...verts[0],...verts[1],...verts[2],...verts[3]);
      const shade=.83+(Math.sin(i*12.9898+k*78.233)*.5+.5)*.25;for(let q=0;q<4;q++){col.push(base.r*shade,base.g*shade,base.b*shade);}
      ix.push(n,n+1,n+2,n+2,n+1,n+3);
    }
    const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(p,3));g.setAttribute('color',new THREE.Float32BufferAttribute(col,3));g.setIndex(ix);g.computeVertexNormals();
    mesh(g,new THREE.MeshStandardMaterial({vertexColors:true,roughness:.98,side:THREE.DoubleSide}),[0,0,0],null,null,root,true,true);
  }
  // Deep desert pan below, visible beyond the shelf.
  const desert=mesh(new THREE.CircleGeometry(250,64),mat('#a57953',1),[0,-6.6,0],[-Math.PI/2,0,0],null,root,false,false);
}

// Broad, shaded building approach. Main room floor and aligned access platforms.
function annulus(rIn,rOut,y,thick,m,segments=96){
  const g=new THREE.RingGeometry(rIn,rOut,segments);g.rotateX(-Math.PI/2);const o=mesh(g,m,[0,y,0],null,null,root,false,true);
  if(thick) mesh(new THREE.CylinderGeometry(rOut,rOut,thick,segments,1,true),m,[0,y-thick/2,0],null,null,root,false,true);
  return o;
}
// slab and walkable paving; slab is clipped at passages through separate geometry.
mesh(new THREE.CylinderGeometry(5.9,6.15,.68,96),shadowStone,[0,-.34,0],null,null,root,false,true);
mesh(new THREE.CylinderGeometry(5.55,5.72,.22,96),warmStone,[0,-.12,0],null,null,root,false,true);
mesh(new THREE.CircleGeometry(5.22,96),stoneTextured,[0,.006,0],[-Math.PI/2,0,0],null,root,false,true);
// Main room's concentric dressed-stone courses and radial joints.
annulus(5.06,5.22,.024,.04,ivory,112);annulus(4.94,5.07,.03,.035,redStone,112);annulus(4.82,4.95,.033,.025,warmStone,112);
const floorJoints=[];for(let i=0;i<48;i++){const a=i*Math.PI/24;for(const [r1,r2] of [[4.2,4.82],[3.4,4.2],[2.6,3.4],[1.95,2.6]])floorJoints.push(Math.cos(a)*r1,.03,Math.sin(a)*r1,Math.cos(a)*r2,.03,Math.sin(a)*r2);}
addLineSegments(floorJoints,'#705d47',.75);
// accent tesserae at compass points
for(let i=0;i<8;i++){const a=i*Math.PI/4;const q=box(i%2?blueTile:turquoise,[Math.cos(a)*4.72,.045,Math.sin(a)*4.72],[.20,.035,.085],[0,-a,0],root,false);}

// The terrace extends directly from the east portal and is lined with a safe low parapet.
box(shadowStone,[11.25,-.34,0],[13.9,.68,11.4]);box(stoneTextured,[11.25,.015,0],[13.35,.09,10.96],null,root,false);
for(let x=5.4;x<18.0;x+=1.15){box((Math.round(x*10)%3===0)?limestone:warmStone,[x,.074,5.36],[1.08,.045,.025],null,root,false);box((Math.round(x*10)%4===0)?limestone:warmStone,[x,.074,-5.36],[1.08,.045,.025],null,root,false);}
// Low parapets, beveled coping and subtle drainage spouts.
box(warmStone,[12.35,.51,5.76],[12.1,1.02,.58]);box(warmStone,[12.35,.51,-5.76],[12.1,1.02,.58]);
box(ivory,[12.35,1.05,5.76],[12.22,.15,.72]);box(ivory,[12.35,1.05,-5.76],[12.22,.15,.72]);
box(warmStone,[18.35,.43,0],[.55,.86,11.55]);box(ivory,[18.35,.91,0],[.74,.13,11.66]);
// chipped coping stones, regularly jointed
for(let x=6.5;x<18.1;x+=1.35){box(limestone,[x,1.14,5.76],[1.27,.045,.7]);box(limestone,[x,1.14,-5.76],[1.27,.045,.7]);}
for(let z=-5;z<5.2;z+=1.35)box(limestone,[18.35,.99,z],[.74,.045,1.25]);
// a shallow stepped lookout dais at the very end
box(redStone,[15.85,.10,0],[2.2,.18,5.6]);box(warmStone,[16.65,.20,0],[1.5,.20,4.5]);

// South processional walk. The inner paving stops at the facade so all four
// shallow, worn treads remain visible down to the natural rock shelf.
box(shadowStone,[0,-.22,8.8],[3.15,.44,7.6]);box(stoneTextured,[0,.012,8.85],[2.9,.08,7.7],null,root,false);
for(let i=0;i<4;i++){
  const z=12.85+i*.67, y=.05-i*.15-.10;
  box(i===1?limestone:warmStone,[0,y,z],[3.05,.20,.67],[0,0,0]);
  box(ivory,[0,y+.103,z-.06],[3.09,.035,.58],[0,0,0],root,false);
}
// Raised stone thresholds at the arch ends.
box(redStone,[0,.10,5.25],[2.72,.20,.86]);box(limestone,[0,.21,5.19],[2.54,.055,.72],null,root,false);

// Curved chamber wall, deliberately thick and interrupted only by the south and east portals.
function wallArcGeometry(ro,ri,y0,y1,a0,a1,steps=28){
  const p=[],uv=[],idx=[];
  const push=(r,y,a)=>{p.push(Math.sin(a)*r,y,Math.cos(a)*r);uv.push(a*ro*.65,y*.55);};
  for(let j=0;j<=steps;j++){const a=a0+(a1-a0)*j/steps;push(ro,y0,a);push(ro,y1,a);push(ri,y0,a);push(ri,y1,a);}
  for(let j=0;j<steps;j++){const b=j*4,c=b+4;idx.push(b,c,b+1,b+1,c,c+1, b+2,b+3,c+2,b+3,c+3,c+2, b,b+2,c,b+2,c+2,c, b+1,c+1,b+3,b+3,c+1,c+3);}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(p,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setIndex(idx);g.computeVertexNormals();return g;
}
const innerR=5.15,outerR=5.86;
const blocked=[[-.258,.258],[Math.PI/2-.258,Math.PI/2+.258]];
let angle=-Math.PI;for(const [a,b] of blocked){if(angle<a)mesh(wallArcGeometry(outerR,innerR,.10,5.62,angle,a),plasterTextured,[0,0,0],null,null,root,true,true);angle=b;}if(angle<Math.PI)mesh(wallArcGeometry(outerR,innerR,.10,5.62,angle,Math.PI),plasterTextured,[0,0,0],null,null,root,true,true);
// course lines on the face: broad stone plinth, limewashed lift and cornice
function arcBand(radius,y0,y1,m){const g=wallArcGeometry(radius,radius-.055,y0,y1,-Math.PI,Math.PI,112);mesh(g,m,[0,0,0],null,null,root,true,true);}
// Discontinuous courses reuse the portal masks.
function course(r,y0,y1,m){let a=-Math.PI;for(const [s,e] of blocked){if(a<s)mesh(wallArcGeometry(r,r-.045,y0,y1,a,s),m);a=e;}if(a<Math.PI)mesh(wallArcGeometry(r,r-.045,y0,y1,a,Math.PI),m);}
course(outerR+.025,.24,.62,redStone);course(outerR+.035,.66,.78,limestone);course(outerR+.035,5.18,5.34,warmStone);course(outerR+.07,5.36,5.62,ivory);
course(innerR-.025,.24,.62,redStone);course(innerR-.04,.66,.78,limestone);course(innerR-.04,5.18,5.34,warmStone);course(innerR-.07,5.36,5.62,ivory);
// Exterior buttress-pilasters and softly corbelled caps.
for(let i=0;i<20;i++){
  const a=-Math.PI+(i+.5)*Math.PI*2/20;if(blocked.some(([s,e])=>a>s-.15&&a<e+.15))continue;
  const r=5.78,x=Math.sin(a)*r,z=Math.cos(a)*r;
  const q=box(warmStone,[x,2.75,z],[.42,5.15,.46],[0,a,0]);
  box(limestone,[x,5.28,z],[.62,.25,.62],[0,a,0]);box(redStone,[x,.74,z],[.60,.18,.60],[0,a,0]);
}
// Inner wall pilasters keep the ring legible and add a room-height scale cue.
for(let i=0;i<16;i++){
  const a=(i+.5)*Math.PI*2/16;if(blocked.some(([s,e])=>a>s-.15&&a<e+.15))continue;
  const x=Math.sin(a)*5.09,z=Math.cos(a)*5.09;
  box(limestone,[x,2.72,z],[.24,4.85,.26],[0,a,0]);box(ivory,[x,5.15,z],[.38,.20,.40],[0,a,0]);
}

// Portal surrounds: voussoir stones, worn jambs, deep side returns and fitted thresholds.
function portal(theta, width=2.55, spring=2.52, depth=.8, centerR=5.505){
  const pg=groupAt(root,[Math.sin(theta)*centerR,0,Math.cos(theta)*centerR],theta);
  const archInner=width/2,archOuter=archInner+.29, blocks=13;
  const archMats=[ivory,limestone,warmStone,limestone];
  for(let i=0;i<blocks;i++){
    const a0=Math.PI-i*Math.PI/blocks, a1=Math.PI-(i+1)*Math.PI/blocks;
    const shape=new THREE.Shape();const pt=(r,a)=>[r*Math.cos(a),spring+r*Math.sin(a)];const A=pt(archOuter,a0),B=pt(archOuter,a1),C=pt(archInner,a1),D=pt(archInner,a0);
    shape.moveTo(...A);shape.lineTo(...B);shape.lineTo(...C);shape.lineTo(...D);shape.closePath();
    const geom=new THREE.ExtrudeGeometry(shape,{depth,bevelEnabled:true,bevelSegments:1,steps:1,bevelSize:.018,bevelThickness:.02,curveSegments:2});geom.translate(0,0,-depth/2);
    mesh(geom,archMats[i%4],[0,0,0],[0,0,0],null,pg,true,true);
  }
  for(const sign of [-1,1]){
    const jambStep=(spring-.22)/5;
    for(let j=0;j<5;j++){
      const h=jambStep-.018, y=.22+j*jambStep+h/2;const bm=j%2===0?limestone:warmStone;
      box(bm,[sign*(archInner+.14),y,0],[.30,h,depth],[0,0,0],pg);
      box(ivory,[sign*(archInner+.155),y+h/2,0],[.34,.07,depth+.08],[0,0,0],pg,false);
    }
  }
  const thresholdHeight=centerR>6?.055:.08;
  box(limestone,[0,thresholdHeight/2,0],[width+.12,thresholdHeight,depth+.1],[0,0,0],pg,false);
  // Contrasting, cool glazed threshold strip.
  for(let i=0;i<7;i++)box(i%2?blueTile:turquoise,[-width/2+i*width/6,thresholdHeight+.014,0],[width/6-.018,.025,depth*.72],[0,0,0],pg,false);
  return pg;
}
portal(0);portal(Math.PI/2);
// Outer passage portal frames the way in and gives the tunnel a real facade.
portal(0,3.03,2.0,.56,12.52);

// Passage walls/ceiling: thick, plain outside, alternating plaster bays and dark recesses inside.
for(const side of [-1,1]){
  box(plasterTextured,[side*1.68,1.75,8.9],[.56,3.5,7.9]);
  box(warmStone,[side*1.68,.24,8.9],[.70,.46,7.95]);
  box(ivory,[side*1.68,3.46,8.9],[.69,.23,8.0]);
}
box(plasterTextured,[0,3.47,8.9],[3.84,.62,7.9]);
box(shadowStone,[0,3.12,8.9],[3.46,.09,7.5],null,root,false);
// ceiling vault ribs and small cool ceramic lights in deep niches
for(let i=0;i<5;i++){
  const z=5.65+i*1.54;
  box(limestone,[0,3.14,z],[3.34,.18,.24]);
  for(const side of [-1,1]){
    box(warmStone,[side*1.45,1.78,z],[.25,2.73,.29]);
    box(ivory,[side*1.45,3.17,z],[.38,.18,.36]);
  }
  if(i===1||i===3){
    box(shadowStone,[0,2.89,z],[.42,.035,.22],null,root,false);
    const lamp=mesh(new THREE.OctahedronGeometry(.12,1),blueTile,[0,2.78,z],[0,0,0],null,root,false,false);
    const glow=new THREE.PointLight(0x7ba6a1,.4,4,2);glow.position.set(0,2.72,z);scene.add(glow);
  }
}
// Passage inner face details: carved beam ends, grooves, shallow shelves.
for(const side of [-1,1])for(let i=0;i<6;i++){
  const z=6.1+i*1.1;
  box(i%2?redStone:limestone,[side*1.385,2.35,z],[.025,.025,.62],[0,0,0],root,false);
  if(i===2&&side===1){box(warmStone,[side*1.31,1.82,z],[.28,.10,.72]);box(blueTile,[side*1.25,2.0,z],[.20,.28,.05]);}
}

// Dome-shell geometry: three broad quarters, with a missing crown sector open to the sky.
function domePatch(theta0,theta1,inner=false){
  const rows=18,cols=Math.max(8,Math.ceil((theta1-theta0)*22)),R=5.7-(inner?.23:0),H=3.72-(inner?.17:0),pos=[],uv=[],idx=[];
  for(let j=0;j<=rows;j++){
    const p=j/rows*Math.PI/2;
    for(let i=0;i<=cols;i++){
      const a=theta0+(theta1-theta0)*i/cols,r=R*Math.cos(p),y=5.55+H*Math.sin(p);
      pos.push(Math.sin(a)*r,y,Math.cos(a)*r);uv.push(i/cols*3,j/rows*2.2);
      if(i<cols&&j<rows){const n=j*(cols+1)+i, q=n+cols+1;if(inner)idx.push(n,n+1,q,n+1,q+1,q);else idx.push(n,q,n+1,n+1,q,q+1);}
    }
  }
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setIndex(idx);g.computeVertexNormals();return g;
}
function meridianRibs(angles,R,H,tubeR,baseY){
  const steps=26,sides=6,pos=[],idx=[];
  for(const a of angles){
    const planeNormal=new THREE.Vector3(Math.cos(a),0,-Math.sin(a));
    for(let j=0;j<=steps;j++){
      const phi=j/steps*Math.PI/2,r=R*Math.cos(phi);
      const center=new THREE.Vector3(Math.sin(a)*r,baseY+H*Math.sin(phi),Math.cos(a)*r);
      const tangent=new THREE.Vector3(-Math.sin(a)*R*Math.sin(phi),H*Math.cos(phi),-Math.cos(a)*R*Math.sin(phi)).normalize();
      const binormal=tangent.clone().cross(planeNormal).normalize();
      for(let k=0;k<sides;k++){
        const t=k/sides*Math.PI*2;
        const v=center.clone().addScaledVector(planeNormal,Math.cos(t)*tubeR).addScaledVector(binormal,Math.sin(t)*tubeR);
        pos.push(v.x,v.y,v.z);
        if(j<steps){const n=(j*sides+k),next=j*sides+(k+1)%sides,up=(j+1)*sides+k,upNext=(j+1)*sides+(k+1)%sides;idx.push(n,up,next,next,up,upNext);}
      }
    }
  }
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.setIndex(idx);g.computeVertexNormals();return g;
}
const openingCenter=Math.PI/2,openingHalf=.58; // the split looks toward the eastward terrace
const domeRanges=[[-Math.PI,openingCenter-openingHalf],[openingCenter+openingHalf,Math.PI]];
for(const [a,b] of domeRanges){mesh(domePatch(a,b,false),new THREE.MeshStandardMaterial({map:plasterTex,color:'#e5d1a9',roughness:.94,side:THREE.DoubleSide,bumpMap:plasterTex,bumpScale:.025}),[0,0,0],null,null,root,true,true);mesh(domePatch(a,b,true),mat('#b59b76',.96,{side:THREE.DoubleSide}),[0,0,0],null,null,root,false,true);}
// Massive spring ring with hand-set tile divisions.
torus(5.62,.19,limestone,[0,5.57,0],[0,1,0],root,160);torus(5.40,.075,redStone,[0,5.53,0],[0,1,0],root,160);
// Raised radial ribs sweep over and inside the dome. Each rib set is merged to
// one mesh so the vaulted view does not multiply draw calls.
const ribAngles=[];for(let i=0;i<21;i++){const a=-Math.PI+(i+.5)*(Math.PI*2/21);if(Math.abs(THREE.MathUtils.euclideanModulo(a-openingCenter+Math.PI*3,Math.PI*2)-Math.PI)>=openingHalf)ribAngles.push(a);}
mesh(meridianRibs(ribAngles,5.72,3.76,.065,5.56),new THREE.MeshStandardMaterial({color:'#d8c195',roughness:.87,side:THREE.DoubleSide}),[0,0,0],null,null,root,true,true);
mesh(meridianRibs(ribAngles,5.48,3.55,.035,5.55),new THREE.MeshStandardMaterial({color:'#cfb994',roughness:.94,side:THREE.DoubleSide}),[0,0,0],null,null,root,true,true);
// Stout decorated opening edges expose the thickness of the interrupted shell.
for(const a of [openingCenter-openingHalf,openingCenter+openingHalf]){
  const pts=[];for(let j=0;j<=28;j++){const p=j/28*Math.PI/2,r=5.79*Math.cos(p),y=5.56+3.80*Math.sin(p);pts.push(new THREE.Vector3(Math.sin(a)*r,y,Math.cos(a)*r));}
  const curve=new THREE.CatmullRomCurve3(pts);mesh(new THREE.TubeGeometry(curve,30,.125,8,false),redStone,[0,0,0],null,null,root,true,true);
  const pts2=[];for(let j=0;j<=20;j++){const p=j/20*Math.PI/2,r=5.83*Math.cos(p),y=5.56+3.80*Math.sin(p);pts2.push(new THREE.Vector3(Math.sin(a)*r,y,Math.cos(a)*r));}
  mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts2),24,.035,5,false),ivory,[0,0,0],null,null,root,true,true);
}
// Bronze cap and a ring of narrow crown slots add a readable silhouette against the cut sky.
cylinder(.25,.38,.23,bronze,[0,9.12,0]);cylinder(.18,.25,.18,bronzeLight,[0,9.31,0]);
torus(.30,.045,bronzeLight,[0,9.43,0],[0,1,0]);
for(let i=0;i<12;i++){const a=i*Math.PI/6;box(darkBronze,[Math.cos(a)*.25,9.31,Math.sin(a)*.25],[.035,.16,.05],[0,-a,0]);}

// Armillary meridian, calibrated pedestal and an angled telescope with glass objective.
const ins=groupAt(root,[0,0,0]);
// marble plinth and lapis/glazed measuring course
cylinder(1.36,1.46,.20,redStone,[0,.10,0],[0,1,0],64,ins);
cylinder(1.27,1.36,.16,ivory,[0,.27,0],[0,1,0],64,ins);
torus(1.22,.065,blueTile,[0,.37,0],[0,1,0],ins,96);
cylinder(1.06,.96,.18,warmStone,[0,.43,0],[0,1,0],48,ins);
// Twelve inset glazed plates around the base collar.
for(let i=0;i<12;i++){const a=i*Math.PI/6;box(i%2?blueTile:turquoise,[Math.cos(a)*.92,.545,Math.sin(a)*.92],[.26,.09,.16],[0,-a,0],ins,false);}
cylinder(.70,.84,.23,bronze,[0,.62,0],[0,1,0],48,ins);
cylinder(.43,.56,1.15,bronze,[0,1.27,0],[0,1,0],40,ins);
for(const y of [.82,1.12,1.57,1.77])torus(y===1.12?.48:.53,.052,bronzeLight,[0,y,0],[0,1,0],ins,64);
cylinder(.58,.47,.18,darkBronze,[0,1.88,0],[0,1,0],48,ins);
cylinder(.44,.44,.12,bronzeLight,[0,1.99,0],[0,1,0],40,ins);
// Elevation semicircle pivots and north-south meridian band.
torus(1.27,.085,bronze,[0,2.25,0],[0,0,1],ins,112);
torus(1.18,.047,bronzeLight,[0,2.25,0],[-.707,.707,0],ins,112);
// 60 etched divisions around the visible vertical ring (single draw call)
{
  const a=[];for(let i=0;i<60;i++){const t=i*Math.PI*2/60,r0=i%5===0?1.255:1.29,r1=i%5===0?1.40:1.34;a.push(Math.sin(t)*r0,2.25+Math.cos(t)*r0,0,Math.sin(t)*r1,2.25+Math.cos(t)*r1,0);}
  addLineSegments(a,'#d0ad69',.92,ins);
}
// fine circular horizon wheel, supported in four quarter-braces
torus(1.52,.047,bronzeLight,[0,1.72,0],[0,1,0],ins,128);
for(let i=0;i<4;i++){const a=i*Math.PI/2;cylinder(.045,.055,.76,bronze,[Math.sin(a)*1.48,1.48,Math.cos(a)*1.48],[Math.sin(a),0,Math.cos(a)],12,ins);}
// Telescope tube points up through the open crown.
const axis=new THREE.Vector3(.707,.707,0).normalize();const mount=new THREE.Vector3(0,2.28,0);const orient=axis.toArray();
const tubeCenter=mount.clone().addScaledVector(axis,.88);
cylinder(.205,.17,2.15,darkBronze,tubeCenter.toArray(),orient,32,ins);
// long polished inlay stripe; collars and tapered objective cell.
const tdir=new THREE.Vector3(...orient);const p1=tubeCenter.clone().addScaledVector(tdir,-.12),p2=tubeCenter.clone().addScaledVector(tdir,.88);
for(const [t,R] of [[-.98,.24],[-.72,.21],[-.53,.205],[.39,.20],[.83,.245],[.99,.295],[1.08,.30]]){
  const p=tubeCenter.clone().addScaledVector(tdir,t);torus(R,.045,(t===.99||t===1.08)?bronzeLight:bronze,p.toArray(),orient,ins,48);
}
cylinder(.286,.205,.27,bronzeLight,tubeCenter.clone().addScaledVector(tdir,1.035).toArray(),orient,32,ins);
cylinder(.238,.238,.028,obsidian,tubeCenter.clone().addScaledVector(tdir,1.18).toArray(),orient,32,ins);
cylinder(.184,.184,.018,glass,tubeCenter.clone().addScaledVector(tdir,1.198).toArray(),orient,32,ins);
// Eyepiece drawtube, knurling, focuser and two brass adjustment wheels.
cylinder(.115,.13,.46,bronzeLight,tubeCenter.clone().addScaledVector(tdir,-1.12).toArray(),orient,24,ins);
cylinder(.19,.13,.15,darkBronze,tubeCenter.clone().addScaledVector(tdir,-1.38).toArray(),orient,24,ins);
cylinder(.14,.12,.12,obsidian,tubeCenter.clone().addScaledVector(tdir,-1.50).toArray(),orient,24,ins);
for(let i=0;i<10;i++){const a=i*Math.PI/5;const side=new THREE.Vector3(Math.cos(a),0,Math.sin(a)).multiplyScalar(.218);const p=tubeCenter.clone().addScaledVector(tdir,-.71).add(side);cylinder(.018,.018,.16,bronzeLight,p.toArray(),orient,8,ins);}
const focuser=mount.clone().add(new THREE.Vector3(.36,.44,0));cylinder(.09,.09,.28,bronzeLight,focuser.toArray(),[1,0,0],24,ins);
for(const s of [-1,1]){torus(.28,.045,bronze,[s*.42,1.55,0],[1,0,0],ins,36);cylinder(.035,.035,.23,bronzeLight,[s*.59,1.55,0],[1,0,0],12,ins);}
// Three pedestal feet, radial bolts, and a slow-motion worm drive.
for(let i=0;i<3;i++){const a=i*Math.PI*2/3;const q=cylinder(.10,.16,.72,bronze,[Math.cos(a)*.57,1.47,Math.sin(a)*.57],[Math.cos(a),.34,Math.sin(a)],16,ins);}
cylinder(.11,.11,.55,bronzeLight,[.61,1.13,0],[1,0,0],24,ins);
for(let i=0;i<12;i++){const a=i*Math.PI/6;const bolt=mesh(new THREE.SphereGeometry(.045,10,8),bronzeLight,[Math.cos(a)*1.28,.208,Math.sin(a)*1.28],[0,0,0],null,ins,true,false);}
// Incised azimuth notches on the inner stone calibration dial.
{
  const lines=[];for(let i=0;i<72;i++){const a=i*Math.PI/36, r=i%6===0?1.88:1.82;lines.push(Math.sin(a)*1.72,.038,Math.cos(a)*1.72,Math.sin(a)*r,.038,Math.cos(a)*r);}
  addLineSegments(lines,'#443e31',.86,ins);
}
// A small engraved maker's plate, with live canvas lettering.
function labelTexture(title,sub){const c=document.createElement('canvas');c.width=512;c.height=192;const x=c.getContext('2d');x.fillStyle='#493e2e';x.fillRect(0,0,512,192);x.strokeStyle='#c3a66a';x.lineWidth=5;x.strokeRect(10,10,492,172);x.fillStyle='#d8c393';x.font='bold 39px Georgia';x.textAlign='center';x.fillText(title,256,83);x.font='21px Georgia';x.fillText(sub,256,128);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;return t;}
const plaqueMat=new THREE.MeshStandardMaterial({map:labelTexture('ASTERION · II','MERIDIAN   /   14°42′ N'),roughness:.65,metalness:.26,side:THREE.DoubleSide});
const plaque=mesh(new THREE.PlaneGeometry(.98,.38),plaqueMat,[0,1.16,.574],[0,0,0],null,ins,false,false);plaque.rotation.x=-.08;
// Two work tables against the room's west and northwest wall, scale bars and ceramic star tiles.
for(const [x,z] of [[-3.76,.05],[2.95,-2.66]]){
  box(warmStone,[x,.88,z],[1.30,.18,.62]);box(ivory,[x,.99,z],[1.37,.08,.68],null,root,false);
  for(const dx of [-.48,.48])box(redStone,[x+dx,.48,z],[.13,.85,.46]);
  for(let i=0;i<3;i++)box(i===1?blueTile:bronze,[x-.36+i*.35,1.075,z],[.20,.065,.24],[0,i*.3,0],root,true);
}
// A stone-backed wall niche and a pair of astrolabe relief disks on the north wall.
for(const a of [-2.27,2.63]){
  const x=Math.sin(a)*4.98,z=Math.cos(a)*4.98;const g=groupAt(root,[x,0,z],a);
  box(shadowStone,[0,2.38,0],[1.02,1.75,.13],null,g,false);
  box(warmStone,[-.57,2.4,.06],[.15,1.93,.24],null,g);box(warmStone,[.57,2.4,.06],[.15,1.93,.24],null,g);
  box(limestone,[0,3.38,.06],[1.26,.18,.25],null,g);box(limestone,[0,1.49,.06],[1.22,.16,.24],null,g);
  torus(.40,.025,bronzeLight,[0,2.45,.13],[0,0,1],g,48);torus(.26,.018,blueTile,[0,2.45,.14],[0,0,1],g,48);
  cylinder(.045,.045,.035,bronzeLight,[0,2.45,.16],[0,0,1],16,g);
}

// Sheltered drifts: tucked under parapets, wall bases, and behind approach jambs only.
function sandWedge(center,a0,a1,r0,r1,y,h,m){
  const verts=[],ids=[],top=[],topIds=[],n=10;for(let i=0;i<=n;i++){
    const t=i/n,a=a0+(a1-a0)*t,rr=r0+(r1-r0)*Math.sin(t*Math.PI),inner=r0-.025;
    verts.push(center[0]+Math.sin(a)*rr,y,center[1]+Math.cos(a)*rr,center[0]+Math.sin(a)*rr,y+h,center[1]+Math.cos(a)*rr);
    top.push(center[0]+Math.sin(a)*inner,y+.008,center[1]+Math.cos(a)*inner,center[0]+Math.sin(a)*rr,y+h*.72,center[1]+Math.cos(a)*rr);
    if(i<n){let j=i*2;ids.push(j,j+2,j+1,j+1,j+2,j+3);topIds.push(j,j+1,j+2,j+1,j+3,j+2);}
  }
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(verts,3));g.setIndex(ids);g.computeVertexNormals();mesh(g,m,[0,0,0],null,null,root,false,true);
  const tg=new THREE.BufferGeometry();tg.setAttribute('position',new THREE.Float32BufferAttribute(top,3));tg.setIndex(topIds);tg.computeVertexNormals();mesh(tg,m,[0,0,0],null,null,root,false,true);
}
for(let i=0;i<10;i++){const a=-Math.PI+i*Math.PI*2/10;if(blocked.some(([s,e])=>a>s-.15&&a<e+.15))continue;sandWedge([0,0],a-.065,a+.065,5.08,5.15,.008,.045,sandMats[i%4]);}
for(const side of [-1,1])for(let i=0;i<7;i++){
  const z=6.25+i*.90;const drift=box(sandMats[(i+side+8)%4],[side*1.29,.07,z],[.48,.11,.60],[0,0,0],root,false);drift.scale.y=1+((i*7)%5)*.24;
}
for(let i=0;i<9;i++){
  const z=-4.8+i*1.15;box(sandMats[i%4],[7.2,.09,z],[1.1,.12,.32],[(i%3)*.012,(i%2)*.018,0],root,false);
}
for(let i=0;i<3;i++)box(sandMats[i],[1.5+i*.16,.045,11.55+i*.43],[.68,.07,.16],[0,0,0],root,false);

// Desert particulars: fractured sandstone outcrops and low dry brush, instanced.
const rand=(()=>{let n=17701;return()=>((n=(n*1664525+1013904223)>>>0)/4294967296);})();
const rockGeo=new THREE.DodecahedronGeometry(1,0);
const rockInstances=rockMats.map(m=>{const o=new THREE.InstancedMesh(rockGeo,m,56);o.castShadow=true;o.receiveShadow=true;root.add(o);return o;});
const rockCounts=Array(rockMats.length).fill(0);
for(let i=0;i<56;i++){
  const a=rand()*Math.PI*2,r=16+rand()*4.2,s=.35+rand()*1.1;
  const sx=s*(.7+rand()),sy=s*(.42+rand()*.25),sz=s*(.65+rand()*.5),surface=terrainHeight(Math.sin(a)*r,Math.cos(a)*r);
  const o=new THREE.Object3D();o.position.set(Math.sin(a)*r,surface+sy*.78,Math.cos(a)*r);o.scale.set(sx,sy,sz);o.rotation.set(rand()*.4,rand()*Math.PI,rand()*.26);o.updateMatrix();const bucket=i%rockMats.length;rockInstances[bucket].setMatrixAt(rockCounts[bucket]++,o.matrix);
}
rockInstances.forEach((o,i)=>{o.count=rockCounts[i];});
// Thin agave tufts in clumps, merged into a single batch of instances.
const tuftGeo=new THREE.ConeGeometry(.065,1.15,5);const tuft=new THREE.InstancedMesh(tuftGeo,mat('#7d7955',.88),210);tuft.castShadow=true;root.add(tuft);
for(let i=0;i<210;i++){
  const a=rand()*Math.PI*2,r=17.7+rand()*2.6,base=new THREE.Vector3(Math.sin(a)*r,terrainHeight(Math.sin(a)*r,Math.cos(a)*r)+.015,Math.cos(a)*r),stem=new THREE.Object3D();
  const tip=new THREE.Vector3((rand()-.5)*.65,.55+rand()*.55,(rand()-.5)*.65);stem.position.copy(base).addScaledVector(tip,.5);stem.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),tip.clone().normalize());stem.scale.set(.7+rand()*.8,.55+rand()*.8,.7+rand()*.8);stem.updateMatrix();tuft.setMatrixAt(i,stem.matrix);
}

// Collision. The annular masonry blocks everything except the two properly framed doors.
const player={x:0,y:0,z:15.4,yaw:0,pitch:-.04,eye:1.64,radius:.34,speed:3.4};
const keys=new Set();let locked=false,started=false,lastRegion='South passage';
const {collides,insideTunnel,region}=createCollisionMap();
function updateCamera(){const floor=floorHeight(player.z,player.x);camera.position.set(player.x,floor+player.eye,player.z);camera.rotation.set(player.pitch,player.yaw,0,'YXZ');}
function reset(){player.x=0;player.z=15.4;player.yaw=0;player.pitch=-.04;keys.clear();updateCamera();}
const startEl=document.querySelector('#start'),locationEl=document.querySelector('#location');
function requestLock(){canvas.focus();if(canvas.requestPointerLock)canvas.requestPointerLock();}
document.querySelector('#begin').addEventListener('click',()=>{started=true;startEl.classList.add('hide');requestLock();});
document.querySelector('#reset').addEventListener('click',e=>{e.stopPropagation();reset();if(!started){started=true;startEl.classList.add('hide');}requestLock();});
document.addEventListener('pointerlockchange',()=>{locked=document.pointerLockElement===canvas;if(locked){started=true;startEl.classList.add('hide');}else if(started)startEl.classList.remove('hide');});
document.addEventListener('mousemove',e=>{if(!locked)return;player.yaw-=e.movementX*.00215;player.pitch=THREE.MathUtils.clamp(player.pitch-e.movementY*.0019,-1.45,1.45);});
document.addEventListener('keydown',e=>{if(['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','ShiftLeft','ShiftRight','KeyR'].includes(e.code))e.preventDefault();if(e.code==='KeyR'){reset();return;}keys.add(e.code);});
document.addEventListener('keyup',e=>keys.delete(e.code));window.addEventListener('blur',()=>keys.clear());
document.addEventListener('pointerdown',e=>{if(started&&!locked&&e.target===canvas)requestLock();});
document.addEventListener('contextmenu',e=>e.preventDefault());
function move(dt){
  if(!locked||!started)return;
  let f=(keys.has('KeyW')||keys.has('ArrowUp')?1:0)-(keys.has('KeyS')||keys.has('ArrowDown')?1:0),s=(keys.has('KeyD')||keys.has('ArrowRight')?1:0)-(keys.has('KeyA')||keys.has('ArrowLeft')?1:0);
  if(!f&&!s)return;const mag=Math.hypot(f,s);f/=mag;s/=mag;const pace=player.speed*((keys.has('ShiftLeft')||keys.has('ShiftRight'))?1.48:1);
  const dx=(-Math.sin(player.yaw)*f+Math.cos(player.yaw)*s)*pace*dt,dz=(-Math.cos(player.yaw)*f-Math.sin(player.yaw)*s)*pace*dt;
  // axis-separated resolution slides smoothly along masonry and parapets
  if(!collides(player.x+dx,player.z))player.x+=dx;
  if(!collides(player.x,player.z+dz))player.z+=dz;
  // Keep the shallow approach steps traversable, stopping on a riser rather than tunnelling.
  const h=floorHeight(player.z,player.x);camera.position.y=h+player.eye;camera.position.x=player.x;camera.position.z=player.z;
}
let locTimer=0;
function updateLocation(dt){const r=region(player.x,player.z);if(r!==lastRegion){lastRegion=r;locationEl.textContent=r;locationEl.classList.add('show');locTimer=2.0;}else if(locTimer>0){locTimer-=dt;if(locTimer<=0)locationEl.classList.remove('show');}}
function resize(){renderer.setSize(innerWidth,innerHeight);camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.7));}
window.addEventListener('resize',resize);reset();
let frames=0,frameSeconds=0;
function animate(){requestAnimationFrame(animate);const dt=Math.min(clock.getDelta(),.04);move(dt);updateCamera();updateLocation(dt);renderer.render(scene,camera);frames++;frameSeconds+=dt;if(frameSeconds>3){canvas.dataset.frameEstimate=(frames/frameSeconds).toFixed(1);frames=0;frameSeconds=0;}}
animate();

// Deliberate dev hooks for quick, private verification in the browser console.
window.__ASTERION__={renderer,scene,camera,player,reset,collides,region,version:'1.0.0'};

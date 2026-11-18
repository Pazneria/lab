import { Mesh, MAT, add, sub, mul, mix, norm, cross, randomSource } from './geometry.js'
import { makeLandscape } from './landscape.js'

const UP = [0,1,0]
const X = [1,0,0]
const Z = [0,0,1]
const NZ = [0,0,-1]
const NX = [-1,0,0]
const TAU = Math.PI*2
const C = {
  concrete: '#7c8581', form: '#7b827f', lower: '#555e5c', wet: '#6c7775',
  steel: '#384748', black: '#263438', aluminum: '#778887', bright: '#a7ada4',
  timber: '#8a674d', timberLight: '#a17854', woodDark: '#5b4c3d',
  roof: '#39494d', ivory: '#c6c0a4', amber: '#c8954a', signal: '#e0b467',
  wheel: '#376565', wheelLight: '#5e8783', darkGreen: '#24484a',
  enamel: '#386a66', deep: '#254749', white: '#d9d3b8', lamp: '#ffddab',
}

function pane(scene, center, right, up, width, height, tint = '#789c9f', density = .42) {
  const mesh = new Mesh()
  mesh.panel(center,right,up,width,height,tint,MAT.steel,density)
  scene.glass.push({mesh,center})
}

function paneQuad(scene, a,b,c,d, tint = '#70918e', density = .42) {
  const mesh = new Mesh()
  mesh.quad(a,b,c,d,tint,MAT.steel,density)
  scene.glass.push({mesh,center:mul(add(add(a,b),add(c,d)),.25)})
}

function label(scene, center, right, up, width, height, title, subline = '', style = 'navy') {
  scene.labels.push({center,right,up,width,height,title,subline,style})
}

function surfaceSign(scene, p, direction, w, h, title, subline='', style='navy') {
  const right = direction === 'south' ? X : direction === 'north' ? NX : direction === 'east' ? NZ : Z
  const face = cross(right,UP)
  scene.mesh.oriented(sub(p,mul(face,.021)),right,UP,face,w+.04,h+.04,.036,C.black,MAT.steel)
  label(scene,p,right,UP,w,h,title,subline,style)
}

function floorSign(scene, x, z, width, depth, title, subline='', style='floor') {
  label(scene,[x,.012,z],X,NZ,width,depth,title,subline,style)
}

function floor(scene, x0,x1,z0,z1, color, outdoor = false) {
  const mesh = scene.mesh
  const rng = randomSource(Math.round(8000+z0*781))
  mesh.box((x0+x1)/2,-.31,(z0+z1)/2,x1-x0,.60,z1-z0,C.lower,MAT.concrete,.7)
  const nx = Math.ceil((x1-x0)/2.55), nz = Math.ceil((z1-z0)/2.52)
  const width = (x1-x0)/nx, depth = (z1-z0)/nz
  for (let i=0; i<nx; i++) {
    for (let j=0; j<nz; j++) {
      const t = rng()
      const tint = t<.24 ? (outdoor?'#707a75':'#79817b') : t>.79 ? (outdoor?'#687675':'#747e7c') : color
      mesh.box(x0+(i+.5)*width,-.022,z0+(j+.5)*depth,width-.012,.044,depth-.012,tint,MAT.concrete,outdoor?.95:.32)
    }
  }
  mesh.box(x1-.052,-.084,(z0+z1)/2,.12,.113,z1-z0,'#65736e',MAT.concrete,.5)
}

function puddle(mesh, x,z,rx,rz, seed) {
  const center = [x,.004,z]
  const rand = randomSource(seed)
  const points = Array.from({length:16},(_,i) => {
    const theta = i/16*TAU
    const r = .79+rand()*.24
    return [x+Math.cos(theta)*rx*r,.004,z+Math.sin(theta)*rz*r]
  })
  for (let i=0; i<points.length; i++) {
    const a=points[i], b=points[(i+1)%points.length]
    mesh.tri(center,a,b,'#677c7b',MAT.water,0,UP,[[.5,.5],[(a[0]-x)/rx*.5+.5,(a[2]-z)/rz*.5+.5],[(b[0]-x)/rx*.5+.5,(b[2]-z)/rz*.5+.5]])
  }
}

function trench(mesh, x,z,length) {
  mesh.box(x,.009,z,.145,.024,length,'#273738',MAT.rubber)
  mesh.box(x-.078,.012,z,.016,.025,length,'#8a9487',MAT.zinc)
  mesh.box(x+.078,.012,z,.016,.025,length,'#8a9487',MAT.zinc)
  for (let i=0; i<Math.floor(length/.135); i++) {
    mesh.box(x,.023,z-length/2+(i+.5)*.135,.15,.012,.026,'#617370',MAT.steel)
  }
}

function plinth(mesh,x,z,w,d,h=.21) {
  mesh.box(x,h/2,z,w,h,d,C.form,MAT.concrete,.7)
  mesh.box(x,h+.025,z,w*.88,.05,d*.86,C.steel)
}

function rail(mesh, a,b,{timber=false, paint=C.steel, steps=null, infill=true}={}) {
  const axis=norm(sub(b,a))
  const baseY=a[1]
  const length=Math.hypot(b[0]-a[0],b[2]-a[2])
  const columns=steps??Math.ceil(length/1.45)
  const at=(p,y)=>add(p,[0,y,0])
  const cap = timber ? C.timberLight : paint
  mesh.beam(at(a,1.12),at(b,1.12),timber?.095:.055,timber?.071:.043,cap,timber?MAT.timber:MAT.paint)
  mesh.beam(at(a,.52),at(b,.52),.035,.035,paint)
  mesh.beam(at(a,.13),at(b,.13),.053,.13,paint)
  for (let i=0; i<=columns; i++) {
    const p=mix(a,b,i/columns)
    mesh.box(p[0],baseY+.55,p[2],.068,1.10,.068,paint,MAT.paint)
    mesh.box(p[0],baseY+.014,p[2],.16,.026,.16,C.aluminum,MAT.steel)
    for (const s of [-1,1]) {
      mesh.cylinder([p[0]+s*.054,baseY+.02,p[2]+.053],[p[0]+s*.054,baseY+.032,p[2]+.053],.013,C.black,MAT.zinc,6)
    }
  }
  if (!infill) return
  const n = Math.ceil(length/.205)
  for (let i=0; i<n; i++) {
    const p=add(a,mul(axis,(i+.5)*length/n))
    mesh.box(p[0],baseY+.579,p[2],.02,1.01,.02,'#5c6d69',MAT.steel)
  }
}

function dripPan(mesh, x,z1,z2,y) {
  mesh.box(x,y,z1+(z2-z1)/2,.20,.05,Math.abs(z2-z1),'#414f51',MAT.steel)
  for (const offset of [-.1,.1]) {
    mesh.pipe([[x+offset,y,z1],[x+offset,y,z2]],.022,'#667575',MAT.zinc,8)
  }
}

function lamp(scene, x,y,z, width, direction='x', power=1, warm=true) {
  const mesh=scene.mesh
  const dx = direction === 'x' ? width : .20
  const dz = direction === 'z' ? width : .20
  mesh.box(x,y+.067,z,dx+.10,.17,dz+.105,C.black)
  mesh.box(x,y-.020,z,dx,.044,dz,warm?C.lamp:'#d1e3dd',MAT.glow)
  for (const n of [-1,1]) {
    const px=direction==='x'?x+n*width*.4:x
    const pz=direction==='z'?z+n*width*.4:z
    mesh.beam([px,y+.15,pz],[px,y+.58,pz],.022,.022,C.aluminum,MAT.zinc)
  }
  scene.lights.push({x,y:y-.12,z,power,warm})
}

function frameColumn(mesh,x,z,y,w=.20,tint=C.steel) {
  mesh.box(x,y/2,z,w,y,.24,tint,MAT.steel)
  mesh.box(x-.075,y/2,z,.039,y,.32,tint,MAT.steel)
  mesh.box(x+.075,y/2,z,.039,y,.32,tint,MAT.steel)
  mesh.box(x,.07,z,w+.16,.14,.43,C.lower,MAT.concrete)
  mesh.box(x,y-.024,z,w+.10,.047,.39,C.black)
}

function roof(scene, x0,x1, crest,z0,z1, eave,height, step, terrace=false) {
  const mesh=scene.mesh
  const yz = (x) => x<crest ? eave+(height-eave)*(x-x0)/(crest-x0) : eave+(height-eave)*(x1-x)/(x1-crest)
  const centerZ=(z0+z1)/2
  for (const [left,right] of [[x0,crest],[crest,x1]]) {
    const a=[left,yz(left),z0], b=[right,yz(right),z0], c=[right,yz(right),z1], d=[left,yz(left),z1]
    const axis=norm(sub(b,a)), normal=cross(Z,axis)
    mesh.oriented([(left+right)/2,(a[1]+b[1])/2,centerZ],axis,normal,Z,Math.hypot(right-left,b[1]-a[1]),.15,z1-z0,C.roof,MAT.steel)
    const panels = Math.ceil((right-left)/step)
    for (let i=0;i<panels;i++) {
      const t=(i+.5)/panels
      const x=left+(right-left)*t, y=yz(x)
      mesh.oriented([x,y-.108,centerZ],axis,normal,Z,Math.hypot(right-left,b[1]-a[1])/panels-.014,.065,z1-z0,
        i%4===0?C.timberLight:i%3===0?'#775a46':'#89674b',MAT.timber,.2)
    }
    for (let x=left+.11; x<right-.05; x+=.49) {
      mesh.beam([x,yz(x)+.086,z0],[x,yz(x)+.086,z1],.036,.028,'#607073',MAT.zinc)
    }
    const beamCount=Math.max(2,Math.ceil((z1-z0)/(terrace?1.35:3.42)))
    for (let i=0; i<=beamCount; i++) {
      const z=z0+.065+(z1-z0-.13)*i/beamCount
      mesh.beam([a[0],a[1]-.24,z],[b[0],b[1]-.24,z],terrace?.12:.19,terrace?.18:.29,C.woodDark,MAT.timber,.35)
    }
    for (const z of [z0+.02,z1-.02]) {
      mesh.beam([a[0],a[1]-.097,z],[b[0],b[1]-.097,z],.14,.24,C.woodDark,MAT.timber)
    }
    dripPan(mesh,left,z0,z1,yz(left)-.11)
    if (right===x1) dripPan(mesh,right,z0,z1,yz(right)-.11)
  }
  mesh.beam([crest,height+.09,z0],[crest,height+.09,z1],.14,.10,C.roof,MAT.zinc)
}

function sideWall(scene,x,z0,z1,inner) {
  const mesh=scene.mesh
  const bays=Math.ceil((z1-z0)/2.93)
  const step=(z1-z0)/bays
  const right=inner>0?NZ:Z
  mesh.box(x,.51,(z0+z1)/2,.33,1.02,z1-z0,C.form,MAT.concrete,.55)
  mesh.box(x,1.045,(z0+z1)/2,.40,.076,z1-z0,C.lower,MAT.concrete)
  mesh.box(x,5.34,(z0+z1)/2,.37,1.43,z1-z0,C.timber,MAT.timber)
  mesh.box(x,4.61,(z0+z1)/2,.39,.14,z1-z0,C.woodDark,MAT.timber)
  for (let i=0;i<=bays;i++) {
    const cz=z0+i*step
    mesh.box(x,2.81,cz,.46,3.56,.24,C.lower,MAT.concrete,.66)
    mesh.box(x+inner*.22,3.15,cz,.11,3.06,.075,C.steel)
  }

  for (let i=0;i<bays;i++) {
    const cz=z0+(i+.5)*step
    const width=step-.29
    const insideFace=x+inner*.167
    mesh.box(insideFace,.52,cz-width*.5,.012,1.00,.017,'#606a66',MAT.concrete)
    for(const y of [.27,.74]) {
      for(const dz of [-.72,.72]) {
        mesh.cylinder([insideFace,y,cz+dz],[insideFace+inner*.008,y,cz+dz],.018,'#5f6963',MAT.concrete,9)
      }
    }
    for (const off of [-.5,0,.5]) mesh.box(x,2.87,cz+width*off,.109,3.51,.068,C.steel)
    for (const y of [1.14,3.5,4.56]) mesh.box(x,y,cz,.11,.067,width,C.steel)
    for (const z of [cz-width*.25,cz+width*.25]) {
      pane(scene,[x,2.321,z],right,UP,width*.5-.079,2.29,'#799899',.35)
      pane(scene,[x,4.031,z],right,UP,width*.5-.079,.989,'#6e898f',.31)
    }
    for (let j=0;j<12;j++) {
      const f=(j+.5)/12
      mesh.box(x+.195*inner,5.34,cz+width*(f-.5),.032,1.27,.025,'#664d3c',MAT.timber)
    }
  }
}

function building(scene) {
  const mesh=scene.mesh
  floor(scene,-7.42,5.42,-9.28,5.41,C.concrete)
  floor(scene,.64,4.14,5.41,6.65,C.wet,true)
  floor(scene,-7.12,5.22,-21.85,-9.28,'#737e7b')
  floor(scene,-1.05,5.22,-27.27,-21.85,C.wet,true)
  sideWall(scene,-7.20,-9.23,5.19,1)
  sideWall(scene,5.20,-9.23,5.19,-1)
  const fronts=[[-7.42,.87],[3.87,5.42]]
  const front=5.20
  for (const [left,right] of fronts) {
    const center=(left+right)/2, width=right-left
    mesh.box(center,.60,front,width,1.20,.33,C.form,MAT.concrete,.62)
    mesh.box(center,4.87,front,width,2.52,.32,C.timber,MAT.timber,.4)
    mesh.box(center,3.58,front,width,.15,.41,C.woodDark,MAT.timber)
    const n=Math.ceil(width/1.27)
    for(let i=0;i<n;i++) {
      const x=left+width*(i+.5)/n
      const w=width/n
      mesh.box(x-w*.5,2.4,front,.079,2.40,.14,C.steel)
      pane(scene,[x,2.40,front],X,UP,w-.084,2.36,'#819fa0',.43)
    }
    mesh.box(right,2.42,front,.09,2.40,.14,C.steel)
  }
  mesh.box(2.37,4.84,front,3.04,2.58,.33,C.timber,MAT.timber)
  for (const x of [.87,3.87]) {
    frameColumn(mesh,x,front,5.91,.23)
    mesh.box(x,1.06,front+.215,.082,1.95,.046,C.steel)
  }
  for (const x of [.69,4.06]) {
    mesh.box(x,.58,5.95,.18,1.16,1.47,C.form,MAT.concrete,.7)
    mesh.box(x,1.20,5.95,.24,.082,1.49,C.timber,MAT.timber)
  }
  mesh.box(2.38,2.96,front+.12,3.00,.20,.24,C.steel)
  mesh.box(2.38,3.57,front+.035,3.05,1.10,.078,C.roof,MAT.paint)
  surfaceSign(scene,[2.38,3.60,5.39],'south',2.62,.63,'FALKEN PASS','AERIAL TRAMWAY     ·     LOWER STATION')
  surfaceSign(scene,[2.37,2.965,5.064],'north',1.29,.15,'EXIT  /  TRAILHEAD','','line')
  floorSign(scene,2.37,4.5,2.2,.38,'FALKEN PASS TRAMWAY','','floor')
  for(const x of [-6.85,4.87]) {
    mesh.pipe([[x,5.95,5.13],[x,5.64,5.35],[x,.73,5.35],[x,.52,5.66]],.058,C.aluminum,MAT.zinc)
  }

  roof(scene,-7.69,5.66,-1.26,-9.54,5.63,6.04,7.35,.27)
  for (const z of [5.26,-9.15]) {
    const xs=[-7.36,-1.26,5.32]
    for (const shift of [-.09,.09]) {
      mesh.tri([xs[0],6.06,z+shift],[xs[1],7.32,z+shift],[xs[2],6.06,z+shift],C.timber,MAT.timber,.22,shift>0?Z:NZ)
    }
    mesh.beam([-7.24,6.02,z],[-1.26,7.32,z],.12,.28,C.woodDark,MAT.timber)
    mesh.beam([-1.26,7.32,z],[5.18,6.02,z],.12,.28,C.woodDark,MAT.timber)
  }
  for(const z of [3.54,-.92,-5.20,-9.16]) {
    for(const x of [-7.02,4.94]) frameColumn(mesh,x,z,6.27,.21)
    mesh.beam([-7.10,5.42,z],[5.10,5.42,z],.22,.26,C.black)
    mesh.beam([-6.66,5.50,z],[-1.26,7.17,z],.14,.18,C.steel)
    mesh.beam([-1.26,7.17,z],[4.68,5.50,z],.14,.18,C.steel)
    for(const x of [-4.0,-1.26,1.86]){
      const y = 7.11-Math.abs(x+1.26)*.22
      mesh.beam([x,5.51,z],[x,y,z],.087,.09,C.steel)
    }
  }
  const zBack=-9.177
  mesh.box(-3.91,5.79,zBack,6.70,.54,.29,C.timber,MAT.timber)
  mesh.box(2.13,5.67,zBack,6.07,.79,.26,C.timber,MAT.timber)
  frameColumn(mesh,-.81,zBack,5.55,.19)
  mesh.beam([-.80,4.17,zBack],[4.99,4.17,zBack],.20,.20,C.steel)
  surfaceSign(scene,[1.78,3.64,zBack+.18],'south',2.72,.58,'PLATFORM 01  →','BOARDING AREA     /     COVERED LOOKOUT')
  surfaceSign(scene,[1.78,3.64,zBack-.18],'north',2.72,.58,'TERMINAL  →','TRAILHEAD     /     STATION ENTRANCE')
  for (const x of [.61,2.91]) mesh.beam([x,3.92,zBack],[x,4.18,zBack],.025,.025,C.aluminum)
  floorSign(scene,2.34,-8.49,1.62,.47,'↑  PLATFORM 01','','floor')

  trench(mesh,4.57,-3.18,12.84)
  puddle(mesh,3.26,5.95,.57,.30,4091)
  puddle(mesh,3.83,1.63,.61,.29,4946)
  puddle(mesh,3.68,-8.05,.58,.25,7938)
  surfaceSign(scene,[4.962,1.89,2.49],'west',1.74,1.10,'FALKEN PASS','LINE 01   /   UPPER RIDGE','map')
  for (const z of [-7.25,-2.45,2.52]) {
    lamp(scene,2.30,4.58,z,1.38,'z',1.05)
    mesh.pipe([[4.86,3.08,z],[4.86,2.67,z],[4.82,2.55,z]],.021,C.woodDark,MAT.steel)
    mesh.box(4.85,2.45,z,.11,.23,.28,C.black)
    mesh.box(4.784,2.45,z,.024,.151,.205,C.lamp,MAT.glow)
  }
  lamp(scene,-2.37,5.54,.77,1.25,'x',1.18)
  mesh.box(4.797,.71,-6.24,.34,1.31,1.33,'#596767',MAT.paint)
  mesh.box(4.607,.72,-6.24,.065,1.14,1.14,C.steel,MAT.paint)
  surfaceSign(scene,[4.566,1.008,-6.24],'west',.60,.13,'ELECTRICAL','','small')
  mesh.cylinder([4.56,.66,-5.89],[4.512,.66,-5.89],.045,C.bright,MAT.zinc,12)
  mesh.box(4.74,.75,-7.44,.28,1.32,.52,'#773e3c',MAT.paint)
  surfaceSign(scene,[4.59,1.05,-7.44],'west',.40,.21,'FIRE','CALL POINT','rust')
  mesh.box(4.579,.67,-7.44,.025,.46,.31,'#4b5350',MAT.paint)
  mesh.box(4.557,.66,-7.44,.018,.235,.15,'#ad5342',MAT.paint)
}


function safetyStripe(mesh, x,z, width,length, direction=1) {
  mesh.box(x,.008,z,width,.009,length,'#b59557',MAT.stripe,1)
  const count=Math.ceil(length/.30)
  for(let i=0;i<count;i++) {
    const cz=z-length/2+(i+.5)*length/count
    const a=[x-width/2,.014,cz-.081*direction], b=[x+width/2,.014,cz+.010*direction]
    const c=[x+width/2,.014,cz+.117*direction], d=[x-width/2,.014,cz+.026*direction]
    mesh.quad(a,b,c,d,'#47514a',MAT.stripe,.95,UP)
  }
}

function boltArray(mesh, center, plane, radius, count, size, tint=C.bright) {
  const axis = plane === 'east' ? X : plane === 'west' ? NX : UP
  const u = plane === 'up' ? X : UP
  const v = plane === 'up' ? Z : NZ
  for (let i=0;i<count;i++){
    const phi=(i+.15)*TAU/count
    const p=add(center,add(mul(u,Math.cos(phi)*radius),mul(v,Math.sin(phi)*radius)))
    mesh.cylinder(p,add(p,mul(axis,.035)),size,tint,MAT.zinc,6)
  }
}

function grateArea(mesh,x,z,w,d) {
  mesh.box(x,.018,z,w,.045,d,C.black,MAT.steel)
  for(let a=0;a<Math.floor(d/.12);a++) {
    mesh.box(x,.049,z-d/2+.061+a*.12,w,.02,.042,'#677571',MAT.zinc)
  }
}

function motor(mesh) {
  const z=-3.78
  plinth(mesh,-5.74,z,1.86,2.42,.24)
  mesh.box(-5.67,.419,z,1.44,.19,1.24,C.black)
  mesh.box(-5.58,1.37,z,1.09,1.77,1.27,'#3e605c',MAT.paint)
  mesh.box(-5.58,1.60,z-.663,1.03,1.11,.16,C.darkGreen,MAT.paint)
  mesh.box(-6.18,1.51,z,.14,1.04,1.16,C.wheelLight,MAT.paint)
  mesh.box(-5.53,2.29,z,.88,.17,1.05,C.black)
  mesh.cylinder([-5.79,2.36,z],[-5.79,2.53,z],.11,C.bright,MAT.zinc,10)
  mesh.cylinder([-5.01,.91,-3.37],[-5.01,2.83,-3.37],.22,C.black)
  for(const y of [.86,2.62]) {
    mesh.cylinder([-5.01,y,-3.37],[-5.01,y+.19,-3.37],.268,C.aluminum,MAT.zinc,14)
  }
  const a=[-6.82,1.02,-4.18], b=[-6.12,1.02,-4.18]
  mesh.cylinder(a,b,.44,C.darkGreen,MAT.paint,28)
  mesh.cylinder([-6.91,1.02,-4.18],[-6.79,1.02,-4.18],.39,C.steel,MAT.steel,24)
  for(let i=0;i<13;i++){
    const q=i*TAU/13
    const edge= [.0,Math.cos(q)*.447,Math.sin(q)*.447]
    mesh.beam(add(a,edge),add(b,edge),.047,.073,C.wheelLight,MAT.paint)
  }
  mesh.box(-6.42,1.50,-4.18,.32,.22,.29,C.steel)
  mesh.pipe([[-6.42,1.59,-4.18],[-6.42,1.67,-3.86],[-6.42,1.49,-3.78],[-6.42,.81,-3.78]],.043,C.amber,MAT.rubber,9)
  mesh.box(-5.48,1.84,-3.095,.34,.25,.035,'#b0b1a0',MAT.zinc)
  mesh.box(-5.48,1.841,-3.072,.265,.035,.010,C.black)
  for(const x of [-6.10,-5.18]) {
    for(const zz of [-4.68,-3.10]){
      mesh.cylinder([x,.269,zz],[x,.333,zz],.065,C.aluminum,MAT.zinc,6)
    }
  }
  for(let i=0;i<3;i++){
    const x=-6.56+i*.26
    mesh.pipe([[x,.24,-5.07],[x,.13,-5.47],[x,.13,-6.74],[x,.36,-7.14],[x,.77,-7.34]],.039,i===1?'#83734c':C.steel,MAT.steel,8)
  }
}

function machine(scene) {
  const mesh=scene.mesh
  const xc=-3.24, yc=2.90, zc=-3.20, r=2.26
  const p=(x,rad,t)=>[x,yc+Math.cos(t)*rad,zc+Math.sin(t)*rad]
  const axle=(x)=>[x,yc,zc]
  grateArea(mesh,-3.23,-3.3,2.34,5.76)
  motor(mesh)
  for(const x of [-4.48,-2.02]) {
    for(const z of [-4.49,-1.92]){
      plinth(mesh,x,z,.84,1.02,.25)
      for(const dx of [-.25,.25]) {
        for(const dz of [-.33,.33]) {
          mesh.cylinder([x+dx,.275,z+dz],[x+dx,.349,z+dz],.058,C.bright,MAT.zinc,6)
        }
      }
      mesh.beam([x,.34,z],[x,2.63,zc],.28,.40,C.wheel,MAT.paint)
      mesh.beam([x+.145,.40,z],[x+.145,2.62,zc],.075,.30,C.wheelLight,MAT.steel)
      mesh.beam([x,.56,z-.08],[x,1.27,z-.08],.32,.45,C.darkGreen,MAT.paint)
    }
    mesh.beam([x,1.04,-4.10],[x,1.04,-2.30],.21,.25,C.steel)
    mesh.box(x,2.604,zc,.65,.28,.76,C.wheelLight,MAT.paint)
    mesh.box(x,2.83,zc,.46,.39,.64,C.wheel,MAT.paint)
    for(const z of [zc-.257,zc+.257]){
      for(const s of [-1,1]){
        mesh.cylinder([x+s*.24,2.775,z],[x+s*.24,2.872,z],.060,C.black,MAT.zinc,6)
        mesh.cylinder([x+s*.24,2.865,z],[x+s*.24,2.896,z],.052,C.bright,MAT.zinc,6)
      }
    }
    mesh.cylinder([x-.21,yc,zc],[x+.22,yc,zc],.32,C.aluminum,MAT.zinc,24)
    mesh.ring([x+.221,yc,zc],[x+.240,yc,zc],.172,.302,C.black,MAT.rubber,24)
    boltArray(mesh,[x+.242,yc,zc],'east',.235,8,.023)
  }

  mesh.cylinder(axle(-5.58),axle(-1.62),.141,C.aluminum,MAT.zinc,24)
  mesh.cylinder(axle(-1.83),axle(-1.62),.216,C.darkGreen,MAT.paint,28)
  mesh.cylinder(axle(-1.621),axle(-1.596),.174,C.bright,MAT.zinc,26)
  mesh.cylinder(axle(-1.596),axle(-1.592),.107,C.black,MAT.steel,22)
  boltArray(mesh,axle(-1.596),'east',.135,7,.016)
  mesh.cylinder(axle(xc-.37),axle(xc+.37),.47,C.wheel,MAT.paint,40)
  mesh.cylinder(axle(xc-.43),axle(xc+.43),.29,C.darkGreen,MAT.steel,36)
  for(const s of [-1,1]) {
    mesh.ring(axle(xc+s*.398),axle(xc+s*.42),.263,.438,C.aluminum,MAT.zinc,40)
    boltArray(mesh,axle(xc+s*.424),s>0?'east':'west',.366,10,.033)
  }

  mesh.ring(axle(xc-.13),axle(xc+.13),r-.239,r-.023,C.darkGreen,MAT.steel,88)
  for(const s of [-1,1]) {
    const xa=xc+s*.125, xb=xc+s*.274
    mesh.ring(axle(xa),axle(xb),r-.245,r+.029,C.wheel,MAT.paint,88)
    mesh.ring(axle(xb-s*.018),axle(xb+s*.007),r-.091,r+.035,C.amber,MAT.paint,88)
    mesh.ring(axle(xb+s*.007),axle(xb+s*.015),r-.233,r-.179,C.wheelLight,MAT.zinc,88)
  }

  for(let k=0;k<10;k++) {
    const t=(k+.23)*TAU/10
    const a=p(xc,.377,t), b=p(xc,2.065,t)
    mesh.beam(a,b,.237,.254,C.wheel,MAT.paint,0,X)
    for(const s of [-1,1]) {
      const x=xc+s*.139
      mesh.beam(p(x,.435,t),p(x,2.06,t),.284,.055,C.wheelLight,MAT.paint,0,X)
      const q0=p(x+s*.038,.776,t+.068)
      const q1=p(x+s*.038,1.93,t+.029)
      const q2=p(x+s*.038,1.93,t-.029)
      const q3=p(x+s*.038,.776,t-.068)
      mesh.quad(q0,q1,q2,q3,C.wheel,MAT.paint,0,s>0?X:NX)
      for (const [rad,knot] of [[.53,0],[1.88,.032],[1.88,-.032],[2.116,-.024],[2.116,.024]]) {
        const point=p(xc+s*(rad>2?.284:.190),rad,t+knot)
        mesh.cylinder(point,add(point,[s*.044,0,0]),.035,C.bright,MAT.zinc,6)
      }
    }
  }
  const rope='#4e5150'
  const arc=Array.from({length:49},(_,i)=>p(xc,r+.010,i*Math.PI/48))
  mesh.pipe(arc,.034,rope,MAT.steel,8)
  mesh.pipe([[xc,yc-r-.01,zc],[xc,yc-r-.01,-7.25],[xc,.44,-8.29],[xc,.25,-10.42]],.036,rope,MAT.steel,10)
  mesh.box(xc,.22,-8.77,.58,.44,2.13,C.black,MAT.steel)
  mesh.box(xc,.45,-8.77,.63,.06,2.13,'#657470',MAT.zinc)
  mesh.box(xc,.489,-8.77,.365,.02,1.94,C.amber,MAT.stripe,1)
  mesh.pipe([[xc,yc+r+.01,zc],[xc,yc+r+.01,-19.86],[xc,5.04,-24.4],[xc,4.72,-36.5],[xc,4.64,-47.5],[xc,4.78,-61],[xc,5.22,-78]],.038,rope,MAT.steel,10)
  mesh.pipe([[-3.57,5.28,-8.32],[-3.57,5.28,-20.06],[-3.57,5.22,-25.1],[-3.57,4.92,-36.5],[-3.57,4.84,-47.5],[-3.57,4.97,-61],[-3.57,5.46,-78]],.049,'#697474',MAT.steel,10)
  mesh.cylinder([-3.57,5.28,-7.72],[-3.57,5.28,-8.69],.123,'#617471',MAT.zinc,14,.070)
  mesh.box(-3.57,5.39,-7.89,.56,.20,.22,C.steel)
  mesh.box(-3.57,5.47,-7.89,.34,.071,.37,C.black)

  rail(mesh,[-.83,0,-9.15],[-.83,0,1.035],{paint:'#65705a',steps:8,infill:false})
  rail(mesh,[-7.07,0,1.035],[-.83,0,1.035],{paint:'#65705a',steps:5,infill:false})
  for(const [a,b] of [
    [[-.83,.17,-9.14],[-.83,.17,1.034]],[[-7.065,.17,1.035],[-.833,.17,1.035]],
  ]) {
    const n=Math.ceil(Math.hypot(b[2]-a[2],b[0]-a[0])/.24)
    for(let j=0;j<n;j++) {
      const u=mix(a,b,j/n),v=mix(a,b,Math.min(1,(j+1.7)/n))
      mesh.beam(u,add(v,[0,.91,0]),.015,.015,'#53635d',MAT.steel)
      mesh.beam(add(u,[0,.91,0]),v,.015,.015,'#53635d',MAT.steel)
    }
    for(let y=.28;y<1.0;y+=.16) {
      mesh.beam(add(a,[0,y,0]),add(b,[0,y,0]),.013,.013,'#7e8b81',MAT.zinc)
    }
  }
  mesh.box(-.83,.682,-2.29,.075,.307,1.32,C.black)
  surfaceSign(scene,[-.779,.684,-2.29],'east',1.21,.235,'DRIVE 01','HAUL ROPE RETURN SHEAVE','sand')
  surfaceSign(scene,[-3.07,.74,1.08],'south',1.10,.27,'MOVING MACHINERY','AUTHORIZED PERSONNEL','sand')
  safetyStripe(mesh,-.716,-3.92,.15,10.12)
  floorSign(scene,.19,-2.80,.94,.29,'KEEP CLEAR','','floor')
  floorSign(scene,-3.20,1.26,1.74,.42,'SERVICE ACCESS','','floor')
  mesh.box(-1.03,1.40,.94,.22,.52,.26,'#536664',MAT.paint)
  mesh.box(-.891,1.42,.94,.062,.444,.207,C.black)
  mesh.cylinder([-.884,1.53,.94],[-.851,1.53,.94],.057,C.amber,MAT.paint,12)
  mesh.cylinder([-.851,1.53,.94],[-.816,1.53,.94],.040,'#ad4c3d',MAT.paint,14)
  mesh.box(-.852,1.32,.94,.026,.078,.147,'#a0a493',MAT.paint)
  mesh.box(-6.95,1.73,-1.78,.33,1.15,1.00,C.steel,MAT.paint)
  surfaceSign(scene,[-6.771,1.98,-1.78],'east',.79,.24,'DRIVE CONTROL','MOTOR / BRAKE / TENSION','small')
  for(const z of [-2.04,-1.78,-1.59]){
    mesh.cylinder([-6.774,1.65,z],[-6.735,1.65,z],.033,C.lamp,MAT.glow,9)
  }

  mesh.box(-6.535,.94,3.37,.75,.079,1.75,C.timberLight,MAT.timber)
  for(const z of [2.66,4.08]) {
    mesh.box(-6.55,.465,z,.53,.88,.20,C.steel,MAT.paint)
  }
  for (let k=0;k<5;k++){
    mesh.box(-6.79,.36+k*.095,3.37,.07,.071,1.52,'#777365',MAT.timber)
  }
  surfaceSign(scene,[-6.943,2.12,3.38],'east',1.42,.4,'FALKEN PASS TRAMWAY','MAINTENANCE LOG  /  DRIVE 01','small')
}


function cabin(scene) {
  const mesh=scene.mesh
  const x=-3.24, z=-14.75
  const outline=[[1.43,1.76],[1.025,2.205],[-1.025,2.205],[-1.43,1.76],[-1.43,-1.76],[-1.025,-2.205],[1.025,-2.205],[1.43,-1.76]]
  const at=(i,t,y,scale=1)=> {
    const [a,b]=outline[i], [c,d]=outline[(i+1)%8]
    return [x+(a+(c-a)*t)*scale,y,z+(b+(d-b)*t)*scale]
  }
  const middle=[x,.22,z]
  for(let i=0;i<8;i++) {
    const side=norm(sub(at(i,0,0),at(i,1,0)))
    const normal=cross(side,UP)
    const strip=(y0,y1,s0,s1,tint,mat=MAT.paint,details=0,lo=0,hi=1)=>{
      mesh.quad(at(i,hi,y0,s0),at(i,lo,y0,s0),at(i,lo,y1,s1),at(i,hi,y1,s1),tint,mat,details,normal)
    }
    mesh.tri(middle,at(i,0,.22,.925),at(i,1,.22,.925),C.black,MAT.steel,0,[0,-1,0])
    mesh.tri([x,.335,z],at(i,1,.335,.94),at(i,0,.335,.94),'#5b655e',MAT.rubber,0,UP)
    mesh.tri([x,2.797,z],at(i,0,2.797,.831),at(i,1,2.797,.831),'#a8aca1',MAT.zinc,0,UP)
    mesh.tri([x,2.646,z],at(i,0,2.646,.931),at(i,1,2.646,.931),'#859087',MAT.paint,0,[0,-1,0])
    strip(.22,.31,.925,.993,C.black,MAT.rubber)
    strip(.31,.43,.993,1.014,C.deep)
    strip(.43,.82,1.014,1.018,i%2===0?'#376865':C.enamel)
    strip(.82,.905,1.018,1.017,C.white)
    strip(.905,.998,1.017,1.012,C.deep)
    strip(.969,1.035,1.025,1.026,C.black,MAT.rubber)
    strip(1.005,1.052,1.030,1.031,C.aluminum,MAT.zinc)
    strip(2.485,2.575,.964,.971,C.black,MAT.rubber)
    strip(2.556,2.606,.983,.981,C.aluminum,MAT.zinc)
    strip(2.611,2.705,.977,.971,'#b5b9aa',MAT.zinc)
    strip(2.705,2.797,.971,.831,'#a5aaa0',MAT.zinc)
    const cuts=i===7?[0,.235,.5,.765,1]:i===3?[0,.30,.66,1]:i===1 || i===5?[0,.5,1]:[0,1]
    for(let k=0;k<cuts.length-1;k++) {
      const t0=cuts[k], t1=cuts[k+1]
      const sideLength=Math.hypot(...sub(at(i,0,0),at(i,1,0)))
      const edge=(k===0?.046:.027)/sideLength
      const far=(k===cuts.length-2?.047:.027)/sideLength
      const a=at(i,t1-far,1.047,1.023), b=at(i,t0+edge,1.047,1.023)
      const c=at(i,t0+edge,2.553,.966), d=at(i,t1-far,2.553,.966)
      paneQuad(scene,a,b,c,d,k%2===0?'#81a5a4':'#87a4a1',i===7?.33:.39)
      mesh.beam(b,c,.063,.063,C.black,MAT.rubber)
      mesh.beam(a,d,.063,.063,C.black,MAT.rubber)
      mesh.beam(add(b,mul(normal,.034)),add(c,mul(normal,.034)),.031,.024,C.aluminum,MAT.zinc)
      if (k===cuts.length-2) mesh.beam(add(a,mul(normal,.034)),add(d,mul(normal,.034)),.031,.024,C.aluminum,MAT.zinc)
    }
    mesh.beam(at(i,0,.984,1.023),at(i,0,2.658,.972),.097,.102,C.enamel,MAT.paint)
    mesh.beam(add(at(i,0,.987,1.044),mul(normal,.010)),add(at(i,0,2.655,.986),mul(normal,.010)),.032,.035,C.aluminum,MAT.zinc)
    const lowerRib = .390
    mesh.beam(at(i,.013,lowerRib,1.025),at(i,.987,lowerRib,1.025),.068,.063,C.black,MAT.rubber)
  }

  const loadingX=x+1.43
  for (const centerZ of [z-.934,z,z+.934]) {
    mesh.box(loadingX+.04,.678,centerZ,.026,.55,.025,C.black,MAT.rubber)
  }
  for(const d of [-1,1]) {
    const zz=z+d*.137
    mesh.box(loadingX+.048,1.229,zz,.052,.24,.088,C.black,MAT.paint)
    mesh.pipe([[loadingX+.077,1.136,zz],[loadingX+.126,1.170,zz],[loadingX+.126,1.297,zz],[loadingX+.079,1.33,zz]],.016,C.aluminum,MAT.zinc,8)
  }
  mesh.box(loadingX+.05,.327,z,.137,.069,1.83,C.aluminum,MAT.zinc)
  mesh.box(loadingX+.052,.376,z,.135,.022,1.84,'#9a8252',MAT.stripe,.85)
  for (let i=0;i<13;i++) mesh.box(loadingX+.091,.392,z+(i-6)*.137,.052,.012,.057,C.black,MAT.rubber)
  mesh.box(loadingX+.021,2.617,z,.085,.115,1.95,C.black,MAT.steel)
  for(const r of [-.86,-.64,.64,.86]) mesh.box(loadingX+.057,2.614,z+r,.022,.043,.055,C.bright,MAT.zinc)

  label(scene,[loadingX+.039,.649,z+1.340],NZ,UP,.60,.263,'01','','logo')
  label(scene,[loadingX+.040,.65,z-1.352],NZ,UP,.57,.193,'FALKEN','PASS TRAMWAY','logoSmall')
  for(const offset of [-2.272,2.272]) {
    const south=offset>0
    const right=south?X:NX
    label(scene,[x,.666,z+offset],right,UP,1.61,.305,'FALKEN PASS','AERIAL TRAMWAY   /   CABIN 01','cabin')
    for(const n of [-1,1]) {
      const px=x+n*.858
      mesh.box(px,.55,z+offset-n*.00005,.125,.098,.039,C.black,MAT.steel)
      mesh.box(px,.55,z+offset+(south?.024:-.024),.084,.064,.013,south?'#cfbd8f':'#a95b4c',MAT.paint)
    }
  }

  for(const [seatZ, facing] of [[z-1.46,1],[z+1.54,-1]]) {
    mesh.box(x,.64,seatZ,1.87,.17,.49,'#866349',MAT.cloth)
    mesh.box(x,.94,seatZ-facing*.194,1.82,.50,.119,'#9a7049',MAT.cloth)
    mesh.box(x,.465,seatZ,1.82,.086,.38,C.steel)
    for(const dx of [-.78,.78]) {
      mesh.beam([x+dx,.34,seatZ-.13],[x+dx,.63,seatZ+.14],.046,.059,C.steel)
    }
    for(const dx of [-.57,0,.57]) {
      mesh.box(x+dx,.737,seatZ,.011,.009,.488,'#574e3a',MAT.cloth)
    }
  }
  for(const dx of [-.70,.70]){
    mesh.pipe([[x+dx,2.49,z-1.50],[x+dx,2.29,z-1.35],[x+dx,2.29,z+1.35],[x+dx,2.49,z+1.50]],.027,C.aluminum,MAT.zinc,8)
    for(const offset of [-1.13,-.59,.46,1.11]) {
      mesh.pipe([[x+dx-.054,2.29,z+offset],[x+dx-.061,2.11,z+offset],[x+dx,2.041,z+offset],[x+dx+.061,2.11,z+offset],[x+dx+.054,2.29,z+offset]],.013,'#ad9c72',MAT.rubber,6)
    }
  }
  mesh.box(x,2.612,z,.59,.056,1.95,C.steel)
  mesh.box(x,2.576,z,.15,.024,1.53,'#f3d4a1',MAT.glow)
  mesh.box(x-.935,1.01,z+1.38,.42,.17,.27,C.steel)
  mesh.box(x-.94,1.10,z+1.38,.33,.022,.22,C.black)
  for (let dx=-.105;dx<.12;dx+=.07) {
    mesh.cylinder([x-.94+dx,1.11,z+1.37],[x-.94+dx,1.133,z+1.37],.018,dx>.04?C.amber:C.lamp,MAT.glow,8)
  }
  for(const zz of [-.58,.58]) {
    mesh.box(x,2.831,z+zz,1.91,.071,.36,'#677574',MAT.steel)
    for(const dx of [-.82,.82]) {
      mesh.box(x+dx,2.90,z+zz,.34,.085,.48,C.darkGreen,MAT.paint)
      for(const dz of [-.134,.134]) {
        mesh.cylinder([x+dx+.10,2.943,z+zz+dz],[x+dx+.10,2.975,z+zz+dz],.036,C.bright,MAT.zinc,6)
      }
    }
  }
  const suspension='#4a6667'
  for(const zz of [-.54,.54]) {
    const p=z+zz
    for(const [a,b,w,d] of [
      [[x+.79,2.958,p],[x+.70,3.44,p],.15,.24],
      [[x+.70,3.44,p],[x+.31,3.78,p],.15,.24],
      [[x-.79,2.958,p],[x-.63,3.43,p],.15,.24],
      [[x-.63,3.43,p],[x+.30,3.78,p],.15,.24],
      [[x+.30,3.76,p],[x+.23,4.25,p],.19,.29],
      [[x+.23,4.25,p],[x-.25,4.70,p],.19,.29],
      [[x-.25,4.70,p],[x-.33,4.95,p],.19,.29],
    ]) {
      mesh.beam(a,b,w,d,suspension,MAT.paint)
      const v=[0,0,.049]
      mesh.beam(add(a,v),add(b,v),w*.34,d+.031,C.aluminum,MAT.zinc)
    }
    mesh.cylinder([x-.455,4.12,p],[x-.685,4.12,p],.074,C.bright,MAT.zinc,12)
    mesh.beam([x-.60,4.11,p],[x+.33,4.11,p],.12,.115,C.black)
    mesh.box(x-.332,4.968,p,.48,.166,.41,C.black)
    mesh.cylinder([x-.597,4.970,p],[x-.06,4.970,p],.096,C.bright,MAT.zinc,14)
    mesh.box(x,5.106,p,.155,.105,.26,C.amber,MAT.paint)
    mesh.cylinder([x-.14,5.162,p],[x+.14,5.162,p],.071,'#a99c73',MAT.zinc,12)
  }
  mesh.box(x-.33,4.968,z,.42,.181,2.15,suspension,MAT.steel)
  for(const zz of [-.88,-.38,.38,.88]) {
    const p=z+zz
    mesh.cylinder([x-.51,5.047,p],[x-.15,5.047,p],.08,C.aluminum,MAT.zinc,12)
    mesh.cylinder([x-.447,5.046,p],[x-.221,5.046,p],.223,C.black,MAT.rubber,24)
    mesh.cylinder([x-.472,5.046,p],[x-.428,5.046,p],.235,C.aluminum,MAT.zinc,24)
    mesh.cylinder([x-.235,5.046,p],[x-.193,5.046,p],.235,C.aluminum,MAT.zinc,24)
  }
  mesh.box(x-.338,5.235,z,.22,.088,1.93,'#5a6d67',MAT.paint)
  mesh.box(x-.334,5.286,z,.25,.032,1.30,C.amber,MAT.paint)
  mesh.box(x-.32,.178,z,1.18,.12,2.78,C.black)
  mesh.box(x+.39,.180,z,.155,.17,3.10,C.steel)
}


function cableHead(mesh) {
  mesh.beam([-6.72,4.57,-20.14],[-1.45,4.57,-20.14],.29,.28,C.steel)
  for (const x of [-6.70,-1.39]) {
    frameColumn(mesh,x,-20.14,5.74,.22,C.steel)
    mesh.beam([x,3.71,-20.14],[x+(x<-3?.86:-.86),4.57,-20.14],.118,.125,C.steel)
  }
  mesh.box(-3.44,4.82,-20.13,1.21,.32,.55,'#657573',MAT.paint)
  mesh.box(-3.46,4.969,-20.13,.79,.118,.36,C.black)
  for (const [x,y] of [[-3.24,4.98],[-3.57,5.098]]) {
    mesh.cylinder([x-.14,y,-20.13],[x+.14,y,-20.13],.146,C.wheel,MAT.paint,22)
    mesh.cylinder([x-.142,y,-20.13],[x-.092,y,-20.13],.171,C.aluminum,MAT.zinc,22)
    mesh.cylinder([x+.091,y,-20.13],[x+.143,y,-20.13],.171,C.aluminum,MAT.zinc,22)
  }

  const x=-3.54, z=-43.6
  for(const dx of [-1.56,1.56]) {
    for(const dz of [-1.14,1.14]) {
      mesh.beam([x+dx*1.42,-36,z+dz*1.52],[x+dx*.53,3.75,z+dz*.6],.27,.25,'#4c5e5c',MAT.steel)
    }
    for(const y of [-25,-17,-9,-1,3.0]) {
      const f=1.46-(y+36)/39*.82
      mesh.beam([x+dx*f,y,z-f*1.14],[x+dx*f,y,z+f*1.14],.17,.18,C.steel)
    }
  }
  for (const y of [-26,-18,-10,-2]) {
    const f=1.46-(y+36)/39*.82
    const top=f-.16
    for(const oz of [-1.1,1.1]){
      mesh.beam([x-1.56*f,y,z+f*oz],[x+1.56*top,y+7.7,z+top*oz],.17,.18,C.steel)
      mesh.beam([x+1.56*f,y,z+f*oz],[x-1.56*top,y+7.7,z+top*oz],.17,.18,C.steel)
    }
  }
  mesh.beam([x-2.1,3.58,z],[x+2.1,3.58,z],.34,.39,C.steel)
  mesh.box(x+.1,4.25,z,.99,1.11,1.04,C.darkGreen,MAT.paint)
  for(const xx of [-3.57,-3.24]){
    mesh.cylinder([xx-.13,4.644,z],[xx+.13,4.644,z],.18,C.aluminum,MAT.zinc,16)
  }
}

function platform(scene) {
  const mesh=scene.mesh
  roof(scene,-7.33,5.46,-2.98,-22.10,-8.99,5.67,6.54,.30)
  for (const z of [-11.28,-14.85,-18.49,-21.55]) {
    frameColumn(mesh,-6.92,z,5.74,.208)
    frameColumn(mesh,5.01,z,5.69,.19)
    mesh.beam([-6.98,5.59,z],[5.03,5.59,z],.205,.243,C.steel)
    mesh.beam([-6.92,5.64,z],[-2.98,6.39,z],.105,.138,C.steel)
    mesh.beam([-2.98,6.39,z],[4.97,5.64,z],.103,.137,C.steel)
    mesh.beam([5.01,4.67,z],[4.07,5.61,z],.106,.117,C.steel)
    for(const x of [-2.98,.60,3.35]){
      const y=6.39-(x+2.98)*.093
      mesh.beam([x,5.57,z],[x,y,z],.066,.066,C.steel)
    }
  }
  rail(mesh,[5.01,0,-9.29],[5.01,0,-21.84],{paint:'#4e6563'})
  rail(mesh,[-6.99,0,-9.25],[-6.99,0,-21.81],{paint:'#4c605d'})
  rail(mesh,[-6.95,0,-21.72],[-.86,0,-21.72],{paint:'#516562'})
  rail(mesh,[-1.58,0,-11.94],[-1.58,0,-9.43],{paint:'#62746c',steps:2})
  rail(mesh,[-6.94,0,-17.91],[-1.58,0,-17.91],{paint:'#536661',steps:4})
  rail(mesh,[-4.56,0,-18.00],[-4.56,0,-21.03],{paint:'#536661',steps:2})
  rail(mesh,[-4.56,0,-21.03],[-1.58,0,-21.03],{paint:'#536661',steps:2})
  rail(mesh,[-1.58,0,-21.03],[-.86,0,-21.72],{paint:'#536661',steps:1})
  for(const z of [-11.73,-10.67]) {
    mesh.box(-6.97,2.62,z,.065,3.10,1.03,'#687675',MAT.paint)
    mesh.box(-6.917,2.62,z,.039,2.98,.042,C.steel)
  }
  const zSide=-10.63
  for(const y of [2.23,2.284,2.338,2.392,2.446,2.5,2.554,2.608,2.662,2.716]){
    mesh.box(-6.871,y,zSide,.029,.026,.83,'#435558',MAT.steel)
  }

  for(const z of [-14.4,-19.26]) lamp(scene,1.82,4.76,z,1.47,'z',1.05)
  lamp(scene,-3.9,5.61,-13.23,1.22,'x',.86,false)
  trench(mesh,4.64,-15.52,12.0)
  safetyStripe(mesh,-1.46,-14.75,.124,5.04)
  mesh.box(-1.325,.010,-14.75,.046,.014,4.82,'#ab9c6c',MAT.stripe,1)
  for (let i=0;i<30;i++) {
    for(const x of [-1.275,-1.214]) {
      mesh.cylinder([x,.013,-16.98+i*.152],[x,.023,-16.98+i*.152],.023,'#9b9064',MAT.zinc,7)
    }
  }
  floorSign(scene,-.36,-14.68,1.39,.56,'BOARDING','WAIT BEHIND LINE','sandFloor')
  floorSign(scene,2.55,-19.73,1.66,.57,'↑  LOOKOUT','','floor')
  floorSign(scene,-2.36,-19.44,1.38,.43,'CABIN 01','','floor')
  surfaceSign(scene,[4.966,1.44,-14.84],'west',.69,.27,'PLATFORM 01','STAND CLEAR OF DOORS','navy')
  surfaceSign(scene,[-4.01,1.29,-17.98],'north',.69,.19,'CABIN 01','','line')
  mesh.box(-.87,.125,-13.99,.22,.25,.29,'#777a61',MAT.paint)
  mesh.box(-.87,.657,-13.99,.103,1.12,.101,C.steel)
  mesh.box(-.87,1.236,-13.99,.124,.16,.16,C.steel)
  mesh.box(-.805,1.24,-13.99,.023,.079,.10,C.amber,MAT.paint)

  puddle(mesh,3.78,-11.61,.46,.42,6174)
  puddle(mesh,3.52,-16.05,.64,.27,7670)
  puddle(mesh,3.8,-20.87,.70,.35,7917)
  puddle(mesh,.48,-20.96,.36,.37,6547)
  for(const z of [-11.28,-18.49,-21.55]){
    const x=5.025
    mesh.pipe([[x,5.631,z],[x+.265,5.36,z],[x+.265,.48,z],[x+.265,.38,z-.24]],.051,'#778685',MAT.zinc,11)
    for(const y of [1.47,3.4,4.7]) mesh.box(x+.23,y,z,.16,.089,.145,C.black)
  }

  cableHead(mesh)
  for(const z of [-3.92,-11.40,-18.55]) {
    mesh.box(-.85,-.47,z,12.31,.58,.37,C.steel)
    for(const x of [-6.05,4.11]) {
      mesh.box(x,-14.6,z,1.13,29.2,1.13,C.lower,MAT.concrete,.98)
      mesh.box(x,-1.00,z,2.03,1.03,1.36,C.form,MAT.concrete)
      mesh.beam([x,-6.24,z],[x>0?x-2.55:x+2.55,-.67,z],.24,.31,C.steel)
    }
  }
}

function lookout(scene) {
  const mesh=scene.mesh
  const a=-.86, b=5.01, back=-27.10, front=-21.66
  rail(mesh,[a,0,back],[b,0,back],{timber:true,paint:'#485c58',steps:4})
  rail(mesh,[a,0,back],[a,0,front],{timber:true,paint:'#485c58',steps:4})
  rail(mesh,[b,0,back],[b,0,front],{timber:true,paint:'#485c58',steps:4})
  roof(scene,-1.23,5.43,1.04,-27.38,-21.58,2.89,3.44,.21,true)
  for(const z of [-26.85,-21.86]){
    for(const x of [-.86,5.00]){
      mesh.box(x,1.422,z,.174,2.844,.183,C.timber,MAT.timber)
      mesh.box(x,.105,z,.234,.210,.235,C.black)
      mesh.box(x,2.834,z,.216,.110,.29,C.steel)
      mesh.beam([x,2.24,z],[x+(x<0?.595:-.595),2.87,z],.129,.128,C.woodDark,MAT.timber)
      const zz=z<(back+front)/2?z+.68:z-.68
      mesh.beam([x,2.24,z],[x,2.85,zz],.129,.128,C.woodDark,MAT.timber)
      for(const y of [.153,2.40]) {
        mesh.cylinder([x+(x<0?.095:-.095),y,z],[x+(x<0?.126:-.126),y,z],.024,C.bright,MAT.zinc,6)
      }
    }
  }
  const gapZ=-21.89
  mesh.box(2.065,.004,gapZ,5.78,.018,.124,'#4c5e60',MAT.steel)
  for(let i=0;i<40;i++) {
    mesh.box(-.79+i*.145,.017,gapZ,.043,.014,.093,'#88938a',MAT.zinc)
  }
  for (const [x,z,rx,rz,seed] of [
    [3.77,-23.13,.93,.55,8594],[1.23,-24.32,.56,.28,7522],[4.23,-24.77,.62,.41,7020],
    [2.04,-26.04,1.42,.44,6522],[3.65,-26.46,.93,.31,6043],[.14,-26.12,.53,.49,5672],
  ]) puddle(mesh,x,z,rx,rz,seed)
  trench(mesh,4.60,-24.56,4.75)
  lamp(scene,1.10,2.78,-24.95,.94,'x',.56)
  for(const z of [-24.42,-22.81]){
    pane(scene,[5.009,1.456,z],Z,UP,1.51,.60,'#91a8a5',.24)
    mesh.box(5.01,1.77,z,.076,.082,1.53,C.woodDark,MAT.timber)
    mesh.box(5.01,1.45,z+.755,.057,.646,.037,C.aluminum,MAT.zinc)
    mesh.box(5.01,1.45,z-.755,.057,.646,.037,C.aluminum,MAT.zinc)
  }

  const benchX=-.552, benchZ=-24.35
  for(const off of [-.175,-.052,.071,.194]){
    mesh.box(benchX+off,.485,benchZ,.107,.063,1.76,'#987657',MAT.timber)
  }
  for(const z of [-25.07,-23.63]){
    mesh.beam([benchX-.08,.03,z],[benchX-.08,.451,z],.06,.36,C.steel)
    mesh.box(benchX-.08,.022,z,.30,.043,.125,C.black)
  }
  for (const y of [.623,.753,.883]){
    mesh.box(benchX-.233,y,benchZ,.065,.106,1.73,C.timberLight,MAT.timber)
  }
  const p=[3.50,1.055,-26.48], right=X, up=[0,.509,-.861]
  const normal=cross(right,up)
  mesh.oriented(p,right,up,normal,1.31,.51,.067,C.black,MAT.steel)
  label(scene,add(p,mul(normal,.035)),right,up,1.25,.45,'FALKEN RIDGE','NORTH FACE     /     2,418 M','map')
  for(const x of [3.01,3.99]){
    mesh.beam([x,.024,-26.70],[x,1.027,-26.55],.086,.10,C.steel)
    mesh.box(x,.03,-26.70,.18,.06,.18,C.black)
  }
  surfaceSign(scene,[2.91,2.475,-21.92],'north',2.05,.27,'TERMINAL   ·   PLATFORM 01','','navy')
  surfaceSign(scene,[2.91,2.475,-21.63],'south',2.05,.27,'FALKEN RIDGE LOOKOUT','','navy')
  for(const x of [2.03,3.76]) {
    mesh.beam([x,2.592,-21.766],[x,3.08,-21.766],.018,.018,C.aluminum,MAT.zinc)
  }
  mesh.box(.48,-.41,-24.60,.38,.34,5.54,C.steel)
  mesh.box(4.20,-.41,-24.60,.38,.34,5.54,C.steel)
  for(const x of [.48,4.20]){
    mesh.beam([x,-5.90,-20.87],[x,-.57,-26.27],.30,.34,C.steel)
    mesh.beam([x,-.52,-21.98],[x,-.56,-27.04],.21,.22,C.steel)
  }
}

export function makeWorld() {
  const scene = {mesh:new Mesh(), glass:[], labels:[], lights:[], landscape:makeLandscape()}
  building(scene)
  machine(scene)
  platform(scene)
  cabin(scene)
  lookout(scene)
  return scene
}

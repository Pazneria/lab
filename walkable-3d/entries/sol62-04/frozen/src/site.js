import * as T from 'three';
import { Batch, TAU, clamp, color, curvePoints, mix, pick, rand, seeded, v } from './geometry.js';
import { house, bed } from './world.js';
import { paintedPlate, tintSet } from './textures.js';

const mossTints = tintSet([0x465027,0x646935,0x414a2c,0x293f29,0x677447,0x485d2f]);
const ironTints = tintSet([0x4c5e4e,0x536451,0x465b53,0x5d6958,0x41534c,0x596559]);
const rustTints = tintSet([0x5c4736,0x685340,0x52604a,0x79583b,0x555747]);
const bedBricks = tintSet([0x897c62,0x9c8b6a,0x817966,0x9b8269,0x807965,0x968471,0x837763]);
const floorTints = tintSet([0xaaa084,0xaa9d81,0x9e967c,0xb2a589,0x968e71,0xa39b83,0x9d967f,0xb2a58c,0x9a947c,0xae9a7a]);
const westTints = tintSet([0x9d9a87,0x9f9e89,0xaaa38d,0x969887,0xa7a38d]);
const thresholdTints = tintSet([0xa79e82,0xaa9e83,0x9c9787,0xada38c,0x8c8a73]);

function top(batch,x0,x1,z0,z1,y,tint) {
  batch.surface(v(x0,y,z1),v(x1,y,z1),v(x1,y,z0),v(x0,y,z0),tint);
}

function paver(batch,x0,x1,z0,z1,y,tint,rng) {
  const corners = Array.from({length:8},()=>rand(rng,.015,.052));
  const rim = [
    [x0+corners[0],z1],[x1-corners[1],z1],[x1,z1-corners[2]],[x1,z0+corners[3]],
    [x1-corners[4],z0],[x0+corners[5],z0],[x0,z0+corners[6]],[x0,z1-corners[7]],
  ];
  const xc=(x0+x1)*.5, zc=(z0+z1)*.5;
  const first = batch.vertex(v(xc,y,zc),v(0,1,0),tint,.5,.5);
  for (const [x,z] of rim) batch.vertex(v(x,y+rand(rng,-.005,.002),z),v(0,1,0),
    tint.clone().multiplyScalar(rand(rng,.76,1.04)),(x-x0)/(x1-x0),(z-z0)/(z1-z0));
  for (let i=0;i<rim.length;i++) {
    const next=(i+1)%rim.length;
    batch.triangle(first,first+i+1,first+next+1);
    const [a,b]=[rim[i],rim[next]];
    batch.surface(v(b[0],y,b[1]),v(a[0],y,a[1]),v(a[0],y-.04,a[1]),v(b[0],y-.04,b[1]),
      tint.clone().multiplyScalar(.59));
  }
}

function paving(batch,x0,x1,z0,z1,cw,cl,tints,rng) {
  const rows=Math.ceil((z1-z0)/cl), cols=Math.ceil((x1-x0)/cw);
  const dz=(z1-z0)/rows, dx=(x1-x0)/cols;
  for(let j=0;j<rows;j++){
    const near=z0+j*dz, far=near+dz;
    const shift = j%2===1 ? dx*.42 : 0;
    for(let i=0;i<=cols;i++){
      const left=clamp(x0+i*dx-shift,x0,x1);
      const right=clamp(x0+(i+1)*dx-shift,x0,x1);
      if(right-left<.1) continue;
      const gap=rand(rng,.006,.013);
      paver(batch,left+gap,right-gap,near+gap,far-gap,rand(rng,-.004,.013),pick(rng,tints),rng);
    }
  }
}

function soilGrid(batch,x0,x1,z0,z1,height,rng,kind='bed') {
  const distant=(x1-x0)>10;
  const resolution=distant?.60:3;
  const nx=Math.ceil((x1-x0)*resolution), nz=Math.ceil((z1-z0)*resolution);
  const palette=tintSet(kind==='bed'?[0x4b3b2c,0x5b472f,0x60503b,0x534331,0x6d5439,0x514736,0x544334]:
    [0x636343,0x59604a,0x687151,0x5a5f43,0x626348]);
  const grid=[];
  const f=(x,z)=> .016*Math.sin(x*6+z*1.7)+.018*Math.sin(z*4.13-x*3.08)+.016*Math.cos(x*9+z*3);
  for(let i=0;i<=nz;i++) for(let j=0;j<=nx;j++){
    const x=mix(x0,x1,j/nx), z=mix(z0,z1,i/nz);
    const slope=v(f(x-.03,z)-f(x+.03,z),.06,f(x,z-.03)-f(x,z+.03)).normalize();
    grid.push(batch.vertex(v(x,height+(distant ? 0 : f(x,z)),z),distant?v(0,1,0):slope,
      pick(rng,palette),x*.83,z*.83));
  }
  for(let i=0;i<nz;i++) for(let j=0;j<nx;j++){
    const p=i*(nx+1)+j;
    batch.quad(grid[p],grid[p+nx+1],grid[p+nx+2],grid[p+1]);
  }
}

function mossPatch(batch,x,y,z,rx,rz,h,tint,rng,angle=0) {
  const center = batch.vertex(v(x,y+h,z),v(0,1,0),tint,.5,.5);
  const count=7;
  for(let i=0;i<count;i++) {
    const phase=TAU*i/count;
    const rough=rand(rng,.68,1.16);
    const dx=Math.cos(phase)*rx*rough, dz=Math.sin(phase)*rz*rough;
    const q=v(x+dx*Math.cos(angle)-dz*Math.sin(angle),y+rand(rng,.001,.005),
      z+dx*Math.sin(angle)+dz*Math.cos(angle));
    batch.vertex(q,v(dx*.4,h*5+.03,dz*.4).normalize(),tint.clone().multiplyScalar(rand(rng,.52,.75)),dx*2+.5,dz*2+.5);
  }
  for(let i=0;i<count;i++) batch.triangle(center,center+1+(i+1)%count,center+1+i);
}

function brickCourse(batch,a,b,y,height,width,average,tints,rng) {
  const n=Math.ceil(a.distanceTo(b)/average);
  const delta=b.clone().sub(a);
  const along=a.distanceTo(b)/n;
  const alongX = Math.abs(delta.x) > Math.abs(delta.z);
  for(let i=0;i<n;i++){
    const at=a.clone().addScaledVector(delta,(i+.5)/n);
    const dim=along-rand(rng,.007,.016);
    batch.box(at.x,y+rand(rng,-.004,.005),at.z, alongX?dim:width,height,
      alongX?width:dim,pick(rng,tints),rand(rng,-.024,.024));
  }
}

function buildFloor(parent,m) {
  const rng=seeded(701);
  const stone=new Batch(m.stone,'Worn limestone paving and retaining walls',{cast:false});
  const mortar=new Batch(m.soil,'Mortar, earth, and terrace substrate',{cast:false});
  const coping=new Batch(m.stone,'Raised bed coping and limestone walls');
  const moss=new Batch(m.moss,'Moss in mortar joints and damp corners',{cast:false});
  const {halfWidth:w,halfLength:l}=house;

  mortar.box(0,-.075,0,w*2,.1,l*2,color(0x71674e));
  mortar.box(.02,-.082,9.88,6.66,.1,3.21,color(0x726a50));
  // Five adjacent strips keep the repaired walking lanes flush with the original paving.
  const strips=[
    [-w,-2.99,.61,.67,westTints],[-2.99,-2.45,.57,.65,westTints],
    [-2.45,2.61,.61,.67,floorTints],[2.61,3.11,.54,.57,thresholdTints],
    [3.11,w,.61,.67,floorTints],
  ];
  for(const [left,right,cw,cl,tints] of strips) paving(stone,left,right,-l,l,cw,cl,tints,rng);
  paving(stone,-3.3,3.34,8.41,11.41,.67,.59,thresholdTints,rng);
  for(let i=0;i<55;i++){
    const x=rand(rng,-3.25,3.27), z=rand(rng,8.56,11.35);
    if(Math.abs(x)<1.48 && rng()<.78) continue;
    mossPatch(moss,x,.017,z,rand(rng,.025,.18),rand(rng,.03,.13),.008,pick(rng,mossTints),rng);
  }
  for(let i=0;i<340;i++){
    const z=rand(rng,-8.3,8.2);
    let x=pick(rng,[-3.82,-1.73,1.72,3.84])+rand(rng,-.14,.14);
    if(z>bed.front || z<bed.back) {
      if(Math.abs(x)<2.5) continue;
    }
    if(i%5===0) x += rand(rng,-.39,.39);
    mossPatch(moss,x,.020,z,rand(rng,.022,.18),rand(rng,.025,.19),rand(rng,.003,.029),pick(rng,mossTints),rng);
  }
  const soil = new Batch(m.soil,'Planting soil mounds and exterior earth',{cast:false});
  soilGrid(soil,-18,18,-18,19,-.21,rng,'exterior');
  soilGrid(soil,bed.left+.08,bed.right-.08,bed.back+.09,bed.front-.08,.297,rng);
  soilGrid(soil,-w+.13,-3.87,-7.0,7.48,.16,rng);
  soilGrid(soil,3.86,w-.13,-6.7,7.48,.145,rng);
  soilGrid(soil,-6.6,-4.75,-8.5,8.8,-.15,rng,'exterior');
  soilGrid(soil,4.75,6.8,-8.5,8.8,-.15,rng,'exterior');

  const edges=[
    [v(bed.left,.0,bed.back),v(bed.left,0,bed.front)],
    [v(bed.right,0,bed.back),v(bed.right,0,bed.front)],
    [v(bed.left,0,bed.back),v(bed.right,0,bed.back)],
    [v(bed.left,0,bed.front),v(bed.right,0,bed.front)],
  ];
  for(const [a,b] of edges){
    const alongX=a.z===b.z;
    const length=a.distanceTo(b);
    const mid=a.clone().lerp(b,.5);
    coping.box(mid.x,.166,mid.z,alongX?length:.19,.37,alongX?.19:length,color(0x706552));
    brickCourse(coping,a,b,.068,.127,.176,.38,bedBricks,rng);
    const offset=b.clone().sub(a).normalize().multiplyScalar(.14);
    brickCourse(coping,a.clone().add(offset),b,.203,.126,.18,.39,bedBricks,rng);
    brickCourse(coping,a,b,.343,.083,.225,.47,bedBricks,rng);
    for(let i=0;i<length*10;i++){
      const point=a.clone().lerp(b,rng());
      mossPatch(moss,point.x+rand(rng,-.076,.076),.391,point.z+rand(rng,-.076,.076),
        rand(rng,.028,.09),rand(rng,.03,.13),rand(rng,.006,.02),pick(rng,mossTints),rng);
    }
  }
  const margins=[[v(-3.86,0,-7.04),v(-3.86,0,7.59)],[v(3.85,0,-6.76),v(3.85,0,7.59)]];
  for(const [a,b] of margins){
    coping.box(a.x,.087,(a.z+b.z)*.5,.14,.17,b.z-a.z,color(0x716a50));
    brickCourse(coping,a,b,.14,.106,.166,.42,bedBricks,rng);
    for(let i=0;i<90;i++){
      mossPatch(moss,a.x+rand(rng,-.06,.074),.195,mix(a.z,b.z,rng()),rand(rng,.035,.08),rand(rng,.03,.13),.011,pick(rng,mossTints),rng);
    }
  }

  const footings=[
    [v(-w,0,-l),v(-w,0,l)],[v(w,0,-l),v(w,0,l)],[v(-w,0,-l),v(w,0,-l)],
    [v(-w,0,l),v(-house.doorHalfWidth,0,l)],[v(house.doorHalfWidth,0,l),v(w,0,l)]
  ];
  const brickTints=tintSet([0x8c8068,0x9b8d70,0x9c866b,0x998775,0x878475,0x877760,0xa08c76]);
  for(const [a,b] of footings){
    const alongX=a.z===b.z, middle=a.clone().lerp(b,.5);
    const length=a.distanceTo(b);
    coping.box(middle.x,.236,middle.z,alongX?length:.29,.76,alongX?.29:length,color(0x776c54));
    for(let course=0;course<4;course++){
      const offset=b.clone().sub(a).normalize().multiplyScalar(course%2*.22);
      brickCourse(coping,a.clone().add(offset),b,.013+course*.152,.140,.32,.52,brickTints,rng);
    }
    brickCourse(coping,a,b,.595,.101,.36,.64,bedBricks,rng);
  }
  brickCourse(coping,v(-3.31,0,11.38),v(3.35,0,11.38),-.061,.26,.19,.59,thresholdTints,rng);
  brickCourse(coping,v(-3.27,0,8.39),v(-3.27,0,11.38),-.083,.21,.18,.59,thresholdTints,rng);
  brickCourse(coping,v(3.29,0,8.39),v(3.29,0,11.38),-.083,.21,.18,.59,thresholdTints,rng);
  paver(stone,-1.12,1.12,8.30,8.69,.030,color(0xb0a488),rng);
  const seams=new Batch(m.accent,'Thin stone fractures and earth marks',{cast:false});
  for(let i=0;i<110;i++){
    const z=rand(rng,-8.2,11.2);
    const x=rand(rng,-3.7,3.7);
    if (z<bed.front && z>bed.back && Math.abs(x)<1.7) continue;
    if (z>8.3 && Math.abs(x)>3.2) continue;
    const a=rand(rng,0,TAU), len=rand(rng,.055,.32), thick=rand(rng,.002,.008);
    const x2=x+Math.cos(a)*len, z2=z+Math.sin(a)*len;
    const midx=(x+x2)*.5+rand(rng,-.038,.038);
    const midz=(z+z2)*.5+rand(rng,-.037,.037);
    const pigment=color(pick(rng,[0x665d49,0x6c634f,0x6d6351,0x7f7158]));
    top(seams,x-thick,x+thick,z-thick,z+thick,.026,pigment);
    seams.surface(v(x,.025,z),v(x+thick,.025,z),v(midx+thick*.6,.025,midz),v(midx,.025,midz),pigment);
    seams.surface(v(midx,.025,midz),v(midx+thick*.6,.025,midz),v(x2+thick*.33,.025,z2),v(x2,.025,z2),pigment);
  }
  for(const batch of [mortar,soil,stone,coping,moss,seams]) batch.assemble(parent);
}

function buildFrame(parent,m) {
  const rng=seeded(98261);
  const { halfWidth:w, halfLength:l, eaves:e, peak:p, doorHalfWidth:d }=house;
  const iron = new Batch(m.iron,'Gabled iron frame, glazing bars and operable hinges');
  const oxide = new Batch(m.iron,'Cast rosettes, oxidation, and rivets');
  const roof = new Batch(m.iron,'Vented ridge and cast rain gutters');
  const glass = {};
  for(const name of ['east wall','west wall','east roof','west roof','front gable','rear gable','open doors']){
    glass[name]=new Batch(m.glass,'Wavy glass – '+name,{cast:false,receive:false});
  }
  const cracks=new Batch(m.cracks,'Cracked and fragmented glazing',{cast:false,receive:false});
  const frame=()=>pick(rng,ironTints);
  const rusty=()=>pick(rng,rustTints);
  const roofY=x=>p-Math.abs(x)*(p-e)/w;
  const bays=12;
  const dz=l*2/bays;

  function glazing(name, a,b,c,d,mark=0) {
    const batch=glass[name];
    const dirt=rand(rng,.12,.83)*(mark===3?1.9:1);
    const haze=mark===3?rand(rng,.21,.50):rand(rng,.005,.22);
    const materialData=new T.Color().setRGB(dirt,haze,rng()>.5?1:0);
    if(mark===1) return;
    if(mark===2){
      const inset=rand(rng,.16,.39);
      const tip=c.clone().lerp(d,inset);
      batch.surface(a,b,tip,c.clone().lerp(a,.84),materialData);
    } else {
      batch.surface(a,b,c,d,materialData);
    }
    if(mark===3){
      const at=(u,t)=>a.clone().lerp(b,u).lerp(d.clone().lerp(c,u),t);
      const offset=v().subVectors(b,a).cross(v().subVectors(d,a)).normalize().multiplyScalar(.003);
      const ribbon=(u0,t0,u1,t1,width,tint)=>{
        const ax=at(u0,t0).add(offset), ay=at(u0+width,t0).add(offset);
        const bx=at(u1,t1).add(offset), by=at(u1+width*.7,t1).add(offset);
        cracks.surface(ax,ay,by,bx,tint);
      };
      const origin=rand(rng,.40,.66);
      const mid=rand(rng,.38,.58);
      const line=[
        [origin*.44,0],[origin*.73,.20],[origin-.05,.34],[origin,mid],
        [origin+.13,mid+.15],[origin+.089,mid+.32],[origin+.20,1],
      ];
      const tint=color(0xd5d8ac);
      for(let i=1;i<line.length;i++) ribbon(...line[i-1],...line[i],rand(rng,.0014,.0030),tint);
      ribbon(origin,mid,origin-.16,mid+.18,.002,tint);
      ribbon(origin-.16,mid+.18,.04,mid+.28,.0014,tint);
      ribbon(origin+.13,mid+.15,.91,mid+.10,.0015,tint);
    }
  }

  for(const side of [-1,1]){
    const x=side*w;
    const which=side===1?'east':'west';
    for(const [y,h] of [[.651,.074],[2.64,.057],[e,.126]]){
      iron.box(x,y,0,.09,h,2*l+.07,frame());
    }
    for(let i=0;i<=bays;i++){
      const z=-l+dz*i;
      iron.box(x,(e+.62)*.5,z,.114,e-.56,.104,frame());
      oxide.box(x,.723,z,.153,.18,.157,rusty());
      for(const y of [.77,2.64,3.315]){
        const insideX=x-side*.073;
        oxide.rod(v(insideX,y,z),v(insideX-side*.018,y,z),.026,rusty(),8);
      }
      if(i<bays){
        const z2=z+dz, h=(z+z2)*.5;
        iron.box(x,1.64,h,.042,2.0,.044,frame());
        for(let j=0;j<2;j++){
          const lo=z+(j+.0)*dz*.5+.027, hi=z+(j+1)*dz*.5-.027;
          let type=0;
          if((i*7+j*5+side*17+80)%23===0) type=3;
          if((i*11+j*3+side+80)%41===0) type=2;
          glazing(which+' wall',v(x,.69,lo),v(x,.69,hi),v(x,2.61,hi),v(x,2.61,lo),type);
        }
        const isOpen=(i+(side===1?2:0))%7===0;
        const hingeY=e-.08;
        const bottomX=x+(isOpen?side*.29:0);
        const bottomY=isOpen?2.76:2.68;
        const l0=v(bottomX,bottomY,z+.074), r0=v(bottomX,bottomY,z2-.074);
        const l1=v(x,hingeY,z+.074), r1=v(x,hingeY,z2-.074);
        iron.beam(l0,r0,.044,.045,frame()); iron.beam(r0,r1,.041,.044,frame());
        iron.beam(l0,l1,.041,.044,frame()); iron.beam(l1,r1,.041,.044,frame());
        glazing(which+' wall',l0,r0,r1,l1,(i+side+12)%13===0?3:0);
        if(isOpen){
          oxide.rod(v(x,2.83,h-.38),v(bottomX,bottomY+.035,h-.38),.013,rusty());
          oxide.rod(v(x,2.83,h+.38),v(bottomX,bottomY+.035,h+.38),.013,rusty());
        } else if(i%2===0){
          oxide.box(x-side*.047,bottomY+.061,h,.022,.095,.067,rusty());
        }
      }
      if(i%2===0){
        const a=v(x-side*.025,2.48,z), c=v(x-side*1.10,roofY(x-side*1.1)-.075,z);
        const brace=curvePoints(t=>v(mix(a.x,c.x,t*t*.58+.42*t),mix(a.y,c.y,1-(1-t)**1.7),z),8);
        for(let j=1;j<brace.length;j++) iron.beam(brace[j-1],brace[j],.047,.061,frame());
        oxide.rod(v(x-side*.07,2.49,z),v(x-side*.10,2.58,z),.022,rusty());
      }
    }
    for(let i=0;i<=bays;i++){
      const z=-l+dz*i;
      iron.beam(v(x,e,z),v(0,p,z),.078,.095,frame());
      if(i%2===0){
        iron.beam(v(x-side*.06,e-.04,z),v(0,e+.39,z),.054,.069,frame());
        iron.rod(v(side*.09,e+.39,z),v(side*.29,roofY(.29)-.09,z),.017,frame());
        iron.rod(v(side*2.25,e+.19,z),v(side*2.25,roofY(2.25)-.04,z),.018,frame());
      }
      if(i<bays){
        const mid=z+dz*.50;
        iron.beam(v(x,e,mid),v(side*.15,roofY(.15),mid),.038,.045,frame());
      }
    }
    const xs=[.17,1.18,2.41,3.61,w];
    for(const h of xs){
      iron.box(side*h,roofY(h)-.018,0,.055,.077,l*2,frame(),0,0,-side*.414);
    }
    for(let row=0;row<xs.length-1;row++) for(let i=0;i<bays*2;i++){
      const z=-l+i*dz*.5+.029, ze=z+dz*.5-.058;
      const x1=side*(xs[row]+.017), x2=side*(xs[row+1]-.01);
      let state=0;
      if ((i*11+row*17+side+147)%43===0) state=1;
      if ((i*17+row*11+side+147)%53===0) state=2;
      if ((i*5+row*31+side+147)%26===0) state=3;
      glazing(which+' roof',v(x1,roofY(x1)+.015,z),v(x1,roofY(x1)+.015,ze),
        v(x2,roofY(x2)+.015,ze),v(x2,roofY(x2)+.015,z),state);
    }
    roof.box(x+side*.069,e-.061,0,.15,.087,2*l+.33,frame(),0,0,-side*.12);
    roof.box(x+side*.14,e-.038,0,.039,.077,2*l+.34,frame());
    const pipeX=x+side*.30, pipeZ=side*6.82;
    roof.cord([
      v(x+side*.11,e-.12,pipeZ),v(pipeX,e-.27,pipeZ),v(pipeX,e-.6,pipeZ),
      v(pipeX,.31,pipeZ),v(pipeX+side*.15,.16,pipeZ+.14),
    ],.058,frame(),12,9);
    for(const y of [.71,1.9,2.58]) oxide.box(pipeX,y,pipeZ,.143,.073,.138,rusty());
  }

  iron.box(0,p-.06,0,.095,.11,l*2+.16,frame());
  for(let i=0;i<12;i++){
    const z=-l+dz*(i+.5);
    for(const s of [-1,1]){
      roof.box(s*.155,p+.187,z,.366,.044,dz-.016,frame(),0,0,-s*.19);
      iron.rod(v(s*.21,roofY(.21),z),v(s*.19,p+.18,z),.027,frame());
      if(i%3===0) iron.rod(v(s*.21,roofY(.21),z-.47),v(s*.19,p+.17,z-.47),.022,frame());
    }
  }
  roof.box(0,p+.229,0,.062,.072,l*2+.13,frame());

  const edgeX=[-w,-3.54,-2.33,-d,0,d,2.33,3.54,w];
  for(const side of [-1,1]){
    const front=side===1, z=l*side;
    const plane=front?'front gable':'rear gable';
    iron.box(0,e,z,w*2,.109,.08,frame());
    if(front){
      iron.box(0,2.84,z,d*2+.13,.14,.103,frame());
      iron.box(0,3.19,z,d*2+.15,.076,.069,frame());
      iron.box(0,2.84,z+.053,d*2+.19,.040,.056,ironTints[2]);
    } else {
      iron.box(0,.646,z,2*w,.087,.09,frame());
      iron.box(0,2.60,z,2*w,.072,.073,frame());
    }
    for (let j=0;j<edgeX.length;j++){
      const x=edgeX[j];
      const doorpost=front && Math.abs(Math.abs(x)-d)<.01;
      const bottom=front && x===0 ? 3.19 : doorpost ? .02 : .642;
      const h=roofY(x)-bottom;
      iron.box(x,bottom+h*.5,z,doorpost?.128:.069,h,.096,frame());
      if(j+1===edgeX.length) continue;
      const xx=edgeX[j+1], xm=(x+xx)*.5;
      let loy=.68;
      if(front && Math.abs(xm)<d) loy=2.9;
      if(loy<1 && front) {
        iron.box(xm,2.60,z,xx-x,.059,.073,frame());
        iron.box(xm,.649,z,xx-x,.074,.085,frame());
      }
      const hi=loy<1?2.57:3.14;
      glazing(plane,v(x+.044,loy,z),v(xx-.044,loy,z),v(xx-.044,hi,z),v(x+.044,hi,z),
        (!front&&j===2)?3:0);
      glazing(plane,v(x+.044,hi+.063,z),v(xx-.044,hi+.063,z),v(xx-.044,e-.055,z),v(x+.044,e-.055,z),0);
      if(j>0 && j<edgeX.length-2){
        const x0=x+.045,x1=xx-.045;
        glazing(plane,v(x0,e+.051,z),v(x1,e+.051,z),v(x1,roofY(x1)-.053,z),v(x0,roofY(x0)-.053,z),
          (!front&&j===4)?2:0);
      } else {
        const left=j===0;
        const x0=x+.127,x1=xx-.042;
        const a=v(x0,e+.046,z), b=v(x1,e+.046,z);
        const tip=left?v(x1,roofY(x1)-.05,z):v(x0,roofY(x0)-.05,z);
        glazing(plane,a,b,tip,tip.clone().lerp(left?a:b,.06));
      }
    }
    for(const s of [-1,1]) iron.beam(v(0,p,z),v(s*w,e,z),.122,.122,frame());
    iron.rod(v(0,p-.18,z),v(0,p+.20,z),.031,rusty());
    oxide.rod(v(0,p+.18,z),v(0,p+.34,z),.043,rusty(),7);
  }

  for(const s of [-1,1]){
    const x0=s*(d-.018), x1=s*(d+.118), z0=l-.005, z1=l+.99;
    const at=(t,y)=>v(mix(x0,x1,t),y,mix(z0,z1,t));
    for(const t of [0,1]) iron.beam(at(t,.047),at(t,2.774),.064,.064,frame());
    for(const y of [.086,.43,1.34,2.16,2.746]) iron.beam(at(0,y),at(1,y),.057,.060,frame());
    for(const [a,b] of [[.46,1.31],[1.38,2.13],[2.19,2.71]]){
      glazing('open doors',at(.041,a),at(.96,a),at(.96,b),at(.041,b),s<0&&a>2?3:0);
    }
    iron.beam(at(0,.11),at(1,.42),.038,.044,frame());
    oxide.rod(at(.87,1.21),at(.87,1.38),.034,rusty(),8);
    oxide.rod(at(.11,.31),at(.11,.43),.031,rusty(),8);
    oxide.rod(at(.11,2.45),at(.11,2.55),.031,rusty(),8);
  }

  for(const batch of [iron,oxide,roof]) batch.assemble(parent);
  for(const [i,batch] of Object.values(glass).entries()){
    const mesh=batch.assemble(parent);
    mesh.renderOrder=10+i*.001;
  }
  const broken=cracks.assemble(parent);
  if(broken) broken.renderOrder=12;

  const plate=paintedPlate(1.60,.35,{title:'The Fern House',subtitle:'CONSERVATORY     ·     1894',style:'green'});
  const sign=new T.Mesh(new T.PlaneGeometry(1.60,.35),plate);
  sign.position.set(0,3.044,l+.074);
  sign.name='Enamel conservatory sign';
  parent.add(sign);
  const backSign=new T.Mesh(new T.PlaneGeometry(1.60,.35),plate);
  backSign.position.set(0,3.044,l-.067);
  backSign.rotation.y=Math.PI;
  backSign.name='Reverse enamel conservatory sign';
  parent.add(backSign);
}

export function buildSite(scene, materials) {
  const site=new T.Group();
  site.name='1894 iron glasshouse';
  scene.add(site);
  buildFloor(site,materials);
  buildFrame(site,materials);
}

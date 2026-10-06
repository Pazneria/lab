import * as THREE from 'three';
import {STAIR} from './navigation.js';
import {random} from './materials.js';

const rng=random(37);
export function architecture(scene,b,m){
  const box=(...args)=>b.box(...args);
  function wallWithOpenings(name,width,height,holes,pos,angle){
    const sh=new THREE.Shape();sh.moveTo(-width/2,0);for(const h of holes.filter(h=>h.y===0).sort((a,c)=>a.x-c.x)){sh.lineTo(h.x-h.w/2,0);sh.lineTo(h.x-h.w/2,h.h);sh.lineTo(h.x+h.w/2,h.h);sh.lineTo(h.x+h.w/2,0);}sh.lineTo(width/2,0);sh.lineTo(width/2,height);sh.lineTo(-width/2,height);sh.closePath();
    for(const h of holes.filter(h=>h.y>0)){const p=new THREE.Path(),l=h.x-h.w/2,r=h.x+h.w/2,bot=h.y,top=h.y+h.h;p.moveTo(l,bot);p.lineTo(l,top-(h.arch?h.w/2:0));if(h.arch)p.absarc(h.x,top-h.w/2,h.w/2,Math.PI,0,true);else p.lineTo(r,top);p.lineTo(r,bot);p.closePath();sh.holes.push(p);}
    const mesh=new THREE.Mesh(new THREE.ExtrudeGeometry(sh,{depth:.32,bevelEnabled:false,curveSegments:24}),m.plaster);mesh.name=name;mesh.position.set(...pos);mesh.rotation.y=angle;mesh.castShadow=true;mesh.receiveShadow=true;scene.add(mesh);
  }
  function window(x,y,z,w,h,angle,arched=true){
    const f=b.frame(x,y,z,angle),top=h-(arched?w/2:0);
    box('cream',[0,.01,0],[w+.38,.2,.42],[0,0,0],null,f);
    box('darkWood',[-w/2,top/2,0],[.12,top,.18],[0,0,0],null,f);box('darkWood',[w/2,top/2,0],[.12,top,.18],[0,0,0],null,f);
    if(arched){
      for(let i=0;i<28;i++){const a=Math.PI*i/28,aa=Math.PI*(i+1)/28;const r=w/2; b.rod('darkWood',[Math.cos(a)*r,top+Math.sin(a)*r,0],[Math.cos(aa)*r,top+Math.sin(aa)*r,0],.065,f);b.rod('cream',[Math.cos(a)*(r+.13),top+Math.sin(a)*(r+.13),-.03],[Math.cos(aa)*(r+.13),top+Math.sin(aa)*(r+.13),-.03],.075,f);}
      b.rod('darkWood',[0,top,0],[0,h,0],.027,f);
      for(const a of [Math.PI/4,Math.PI*3/4])b.rod('darkWood',[0,top,0],[Math.cos(a)*w/2,top+Math.sin(a)*w/2,0],.025,f);
    }else box('darkWood',[0,h,0],[w+.1,.12,.18],[0,0,0],null,f);
    box('darkWood',[0,top/2,0],[.065,top,.105],[0,0,0],null,f);
    for(let yy=1.12;yy<top;yy+=1.17)box('darkWood',[0,yy,0],[w,.056,.1],[0,0,0],null,f);
    box('darkWood',[0,.11,0],[w,.12,.18],[0,0,0],null,f);
    // Barely tinted panes leave the countryside clear and do not cast opaque shadows.
    b.add('plane','glass',[0,top/2,0],[w-.08,top-.07,1],[0,0,0],null,f,false);
    box('wood',[0,-.06,.12],[w+.32,.11,.5],[0,0,0],null,f);
    for(const xx of [-w*.32,w*.32])box('brass',[xx,1.03,.065],[.025,.1,.025],[0,0,0],null,f,false);
  }
  // Wide floorboards with irregular joints, individual tone and dark seams.
  box('darkWood',[0,-.14,0],[16,.28,18]);
  for(let x=-7.83,i=0;x<8;x+=.34,i++){
    let z=-9;let j=0;
    while(z<8.99){const length=Math.min(2.1+rng()*1.7,9-z);box('wood',[x,-.016,z+length/2],[.327,.035,length-.014],[0,0,0],new THREE.Color().setRGB(.79+rng()*.21,.79+rng()*.21,.79+rng()*.21));if(j%2===0)for(const zz of [z+.055,z+length-.055])for(const xx of [x-.107,x+.107])b.add('cyl','iron',[xx,.004,zz],[.007,.004,.007],[],null,null,false);z+=length;j++;}
  }
  box('darkWood',[9.8,-.14,4],[3.6,.28,6]);
  for(let x=8.16;x<11.6;x+=.32)box('wood',[x,-.015,4],[.308,.035,5.98],[0,0,0],new THREE.Color().setScalar(.85+rng()*.15));
  box('plaster',[-8.16,4.15,0],[.32,8.3,18.35]);box('plaster',[0,4.15,-9.16],[16.4,8.3,.32]);
  wallWithOpenings('East window wall',18.3,8.3,[{x:-6.4,y:1.0,w:2.55,h:6.05,arch:true},{x:-2.15,y:1,w:2.55,h:6.05,arch:true},{x:4,y:0,w:6,h:4.65}], [8.32,0,0],-Math.PI/2);
  window(7.98,1,-6.4,2.55,6.05,-Math.PI/2);window(7.98,1,-2.15,2.55,6.05,-Math.PI/2);
  wallWithOpenings('Entrance window wall',16.3,8.3,[{x:-4.3,y:1,w:2.5,h:6.1,arch:true},{x:4.4,y:1,w:2.5,h:6.1,arch:true}], [0,0,9],0);
  window(-4.3,1,8.98,2.5,6.1,Math.PI);window(4.4,1,8.98,2.5,6.1,Math.PI);
  wallWithOpenings('Alcove bay windows',6,5.3,[{x:-1.8,y:.85,w:1.52,h:3.9,arch:true},{x:0,y:.85,w:1.52,h:3.9,arch:true},{x:1.8,y:.85,w:1.52,h:3.9,arch:true}], [11.92,0,4],-Math.PI/2);
  for(const z of [2.2,4,5.8])window(11.55,.85,z,1.52,3.9,-Math.PI/2);
  for(const z of [1,7]){
    wallWithOpenings('Alcove end window',3.7,5.3,[{x:0,y:1,w:2.15,h:3.7,arch:true}], [9.85,0,z===1?.68:z],0);
    window(9.85,1,z+(z===1?.02:-.02),2.15,3.7,z===1?0:Math.PI);
  }
  box('cream',[8.02,4.56,4],[.32,.32,6.1]);box('wood',[8.02,4.37,4],[.38,.1,6.2]);
  for(const z of [1.05,6.94]){box('cream',[8.02,2.2,z],[.34,4.4,.34]);box('wood',[8.02,.65,z],[.42,1.3,.42]);}
  // Dado panelling, skirting and picture rails wrap the intact wall sections.
  function panelRun(f,len){box('darkWood',[0,.4,0],[len,.8,.1],[0,0,0],null,f);box('wood',[0,.83,.015],[len,.095,.18],[0,0,0],null,f);box('wood',[0,.13,.035],[len,.18,.17],[0,0,0],null,f);for(let x=-len/2+.25;x<len/2;x+=.92){box('wood',[x,.46,.07],[.055,.6,.035],[0,0,0],null,f);}}
  panelRun(b.frame(-7.96,0,0,Math.PI/2),18);panelRun(b.frame(0,0,-8.98),16);panelRun(b.frame(0,0,8.94,Math.PI),16);panelRun(b.frame(7.94,0,-4,-Math.PI/2),10);panelRun(b.frame(11.51,0,4,-Math.PI/2),6);
  for(const y of [7.6,7.79]){box('wood',[-7.92,y,0],[.14,.11,18]);box('wood',[7.92,y,0],[.14,.11,18]);box('wood',[0,y,-8.93],[16,.11,.14]);box('wood',[0,y,8.93],[16,.11,.14]);}
  // Paneled entrance and cast iron latch.
  const door=b.frame(0,0,8.88,Math.PI);box('darkWood',[0,1.53,0],[1.8,3.06,.15],[0,0,0],null,door);
  for(const x of [-.45,.45])for(const y of [.67,1.83,2.62]){box('edge',[x,y,.09],[.67,y===2.62?.42:.89,.035],[0,0,0],null,door);box('wood',[x,y,.12],[.57,y===2.62?.32:.78,.025],[0,0,0],null,door);}
  for(const x of [-1,1])box('wood',[x,1.6,.02],[.2,3.2,.26],[0,0,0],null,door);box('wood',[0,3.22,.02],[2.2,.16,.28],[0,0,0],null,door);
  box('iron',[.16,1.14,.16],[.1,.27,.045],[0,0,0],null,door);b.rod('brass',[.13,1.15,.23],[.38,1.15,.23],.025,door);
  // Partial upper gallery, with a left return and open central volume.
  const decks=[[0,-7.1,16,3.8],[-6.3,-2.4,3.4,5.6]];
  for(const [x,z,w,d]of decks){box('darkWood',[x,3.25,z],[w,.3,d]);box('wood',[x,3.413,z],[w,.025,d]);for(let xx=x-w/2+.17;xx<x+w/2;xx+=.34)box('wood',[xx,3.435,z],[.324,.027,d-.02],[0,0,0],new THREE.Color().setScalar(.83+rng()*.17));}
  box('wood',[1.7,3.22,-5.18],[12.6,.39,.23]);box('wood',[-4.61,3.22,-2.37],[.23,.39,5.62]);
  for(const x of [-7.63,-4.65,-.6,3.5,7.65]){
    box('darkWood',[x,1.54,-5.38],[.23,3.08,.23]);box('wood',[x,.17,-5.38],[.34,.34,.34]);box('wood',[x,2.93,-5.38],[.38,.19,.38]);
    for(const sign of [-1,1])b.rod('wood',[x,2.5,-5.38],[x+sign*.58,3.1,-5.38],.09);
    
  }
  for(const z of [-2.6,.17]){box('darkWood',[-4.72,1.56,z],[.23,3.12,.23]);box('wood',[-4.72,.15,z],[.33,.3,.33]);}
  // Broad, shallow treads. Twenty risers at 170 mm, 315 mm deep.
  const steps=20,depth=(STAIR.maxZ-STAIR.minZ)/steps;
  for(let i=0;i<steps;i++){
    const h=(i+1)*3.4/steps,z=STAIR.maxZ-(i+.5)*depth;
    box('darkWood',[-6.175,h/2,z],[2.55,h,depth]);box('wood',[-6.175,h+.013,z+.014],[2.59,.027,depth+.028]);
    box('edge',[-6.175,h-.018,z+depth/2+.02],[2.6,.06,.042]);
    // Muted woven stair runner, held by slim brass rods.
    box('runner',[-6.175,h+.031,z],[1.26,.009,depth-.028],[],null,null,false);box('runner',[-6.175,h-.085,z+depth/2+.024],[1.26,.17,.009],[],null,null,false);b.rod('brass',[-6.88,h+.04,z-depth/2+.065],[-5.47,h+.04,z-depth/2+.065],.012);
  }
  function balustrade(a,c,y,solid=true){
    const len=Math.hypot(c[0]-a[0],c[1]-a[1]);b.rod('wood',[a[0],y+1.06,a[1]],[c[0],y+1.06,c[1]],.068);b.rod('iron',[a[0],y+.13,a[1]],[c[0],y+.13,c[1]],.023);
    for(let k=0;k<=Math.round(len/.21);k++){const t=k/Math.round(len/.21),x=a[0]+(c[0]-a[0])*t,z=a[1]+(c[1]-a[1])*t;b.rod('iron',[x,y+.1,z],[x,y+1.02,z],.013);if(k%4===0){b.add('sphere','iron',[x,y+.58,z],[.038,.052,.038]);}}
    for(let k=0;k<=Math.ceil(len/2.2);k++){const t=k/Math.ceil(len/2.2),x=a[0]+(c[0]-a[0])*t,z=a[1]+(c[1]-a[1])*t;box('darkWood',[x,y+.57,z],[.105,1.14,.105]);b.add('sphere','wood',[x,y+1.18,z],[.087,.087,.087]);}
    
  }
  balustrade([-4.54,-5.13],[7.81,-5.13],3.4);balustrade([-4.54,-5.13],[-4.54,.36],3.4);
  for(const x of [-7.55,-4.79]){
    b.rod('wood',[x,1.08,6.78],[x,4.5,.35],.074);b.rod('darkWood',[x,.15,6.78],[x,3.57,.35],.082);
    for(let i=0;i<=20;i++){const z=6.7-i*6.3/20,h=i*3.4/20;b.rod('iron',[x,h+.1,z],[x,h+1.04,z],.019);if(i%5===0){box('wood',[x,h+.55,z],[.12,1.1,.12]);b.add('sphere','wood',[x,h+1.16,z],[.09,.09,.09]);}}
    
  }
  // Rafters, ridge and tie beams give the hall a legible roof structure from above.
  for(const side of [-1,1]){
    const geo=new THREE.BufferGeometry();const verts=side===1?[0,10.35,-9.3,8.3,8.05,-9.3,8.3,8.05,9.3,0,10.35,9.3]:[-8.3,8.05,-9.3,0,10.35,-9.3,0,10.35,9.3,-8.3,8.05,9.3];geo.setAttribute('position',new THREE.Float32BufferAttribute(verts,3));geo.setIndex([0,2,1,0,3,2]);geo.computeVertexNormals();const roof=new THREE.Mesh(geo,m.ceiling);roof.material=roof.material.clone();roof.material.side=THREE.DoubleSide;roof.castShadow=true;roof.receiveShadow=true;scene.add(roof);
  }
  box('darkWood',[0,10.18,0],[.3,.3,18.5]);
  for(let z=-8.55;z<9;z+=3.45){box('wood',[0,7.93,z],[16.15,.3,.24]);for(const x of [-7.84,7.84]){box('wood',[x,6.44,z],[.24,3.18,.24]);b.rod('wood',[x,7.02,z],[x-Math.sign(x)*1.1,7.92,z],.13);}b.rod('darkWood',[-8.12,8.12,z],[0,10.26,z],.14);b.rod('darkWood',[0,10.26,z],[8.12,8.12,z],.14);b.rod('iron',[0,8.08,z],[0,10.16,z],.028);}
  // Triangular plaster gables close the roof at both ends.
  for(const z of [-9.1,9.1]){const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute([-8.15,8.14,z,8.15,8.14,z,0,10.34,z],3));g.computeVertexNormals();const mat=m.cream.clone();mat.side=THREE.DoubleSide;const mesh=new THREE.Mesh(g,mat);mesh.castShadow=true;scene.add(mesh);}
  box('cream',[9.8,5.34,4],[3.85,.19,6.4]);for(const z of [1.1,2.55,4,5.45,6.9])box('wood',[9.8,5.14,z],[3.75,.23,.18]);box('wood',[11.5,5.11,4],[.17,.25,6]);
  return{window};
}

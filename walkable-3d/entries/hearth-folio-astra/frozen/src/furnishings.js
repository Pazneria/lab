import * as THREE from 'three';
import {random} from './materials.js';

const rng=random(1894),palette=[0x4c5947,0x713f32,0x34484c,0x87734f,0x595346,0x955d42,0x3c4934,0x503930,0xa09170,0x6a765d,0x313e4d,0x6c4c48,0x705d3d,0x7c4036,0x47584c];
export function furnishings(scene,b,m){
  const box=(...a)=>b.box(...a);let bookCount=0;
  for(let i=0;i<16;i++){
    const geo=new THREE.PlaneGeometry(1,1),uv=geo.attributes.uv;for(let k=0;k<uv.count;k++)uv.setXY(k,(uv.getX(k)+i%4)/4,(uv.getY(k)+(3-(i/4|0)))/4);b.register('label'+i,geo);
  }
  const temp=new THREE.Object3D();
  function local(parent,p,r=[0,0,0]){temp.position.set(...p);temp.rotation.set(...r);temp.scale.set(1,1,1);temp.updateMatrix();return parent?parent.clone().multiply(temp.matrix):temp.matrix.clone();}
  function book(f,x,y,z,w,h,d,col,lean=0,flat=false){
    bookCount++;const frame=local(f,[x,y,z],[0,0,flat?Math.PI/2:lean]);
    box('pages',[0,h/2,-.004],[w-.008,h-.012,d-.023],[0,0,0],new THREE.Color().setScalar(.82+rng()*.18),frame,false);
    for(const side of [-1,1])box('book',[side*(w/2-.002),h/2,0],[.004,h,d],[0,0,0],col,frame,false);
    box('book',[0,h/2,d/2-.006],[w,h,.012],[0,0,0],col,frame,false);
    if(rng()>.2){for(const yy of [h*.12,h*.84]){box('gold',[0,yy,d/2+.003],[w*.89,.006,.006],[0,0,0],null,frame,false);if(rng()>.48)box('book',[0,yy+.017,d/2+.007],[w*.92,.014,.01],[0,0,0],col,frame,false);}}
    if(w>.055&&rng()>.2)b.add('label'+(rng()*16|0),'labels',[0,h*.51,d/2+.005],[w*.93,h*.52,1],[0,0,0],null,frame,false);
    if(rng()>.72)box('paper',[0,h*.18,d/2+.007],[w*.7,.027,.005],[0,0,0],null,frame,false);
  }
  function stack(f,x,y,z,n=4){for(let i=0;i<n;i++){const thickness=.045+rng()*.025;book(local(f,[x,y+i*.068,z],[0,(rng()-.5)*.18,0]),.17,thickness/2,0,thickness,.3+rng()*.06,.23+rng()*.05,palette[rng()*palette.length|0],0,true);}}
  function vase(f,x,y,z,scale=1,mat='ceramic'){
    const name='vase';if(!b.geometries[name]){const pts=[[0,0],[.09,0],[.115,.02],[.155,.14],[.145,.25],[.07,.32],[.055,.37],[.072,.385]].map(a=>new THREE.Vector2(...a));b.register(name,new THREE.LatheGeometry(pts,20));}
    b.add(name,mat,[x,y,z],[scale,scale,scale],[0,0,0],null,f);b.add('cyl','black',[x,y+.38*scale,z],[.052*scale,.006,.052*scale],[],null,f,false);
  }
  function shelf(x,y,z,w=2.55,h=2.6,angle=0,seed=0,double=false){
    const f=b.frame(x,y,z,angle),d=double?.76:.47,rows=h<2?3:6,spacing=h<2?.435:.392;
    const localWood=seed%3===0?'wood':'darkWood';
    box(localWood,[0,h/2,-d/2+.025],[w,h,.055],[],null,f);for(const xx of [-w/2+.045,w/2-.045]){box(localWood,[xx,h/2,0],[.09,h,d],[],null,f);box('wood',[xx,h/2,d/2+.02],[.045,h-.05,.047],[],null,f);}
    box(localWood,[0,.095,0],[w+.075,.19,d+.07],[],null,f);box('wood',[0,h+.018,0],[w+.14,.10,d+.13],[],null,f);box('edge',[0,h-.075,d/2+.015],[w+.075,.065,.062],[],null,f);
    box(localWood,[0,h/2,0],[.062,h-.15,d-.015],[],null,f);box('wood',[0,h/2,d/2+.019],[.07,h-.15,.038],[],null,f);
    for(let row=0;row<rows;row++){
      const yy=.22+row*spacing;box('wood',[0,yy,0],[w-.12,.046,d-.025],[],null,f);box('edge',[0,yy-.018,d/2+.01],[w-.13,.045,.025],[],null,f);
      let xx=-w/2+.13,groupLeft=0,groupColor=palette[0],groupHeight=.3;const gapIndex=(seed+row)%5;
      while(xx<w/2-.17){
        if(groupLeft--<=0){groupLeft=2+(rng()*6|0);groupColor=palette[(rng()*palette.length+seed)%palette.length|0];groupHeight=.255+rng()*.079;}
        const bw=.026+Math.pow(rng(),1.4)*.085,bh=groupHeight+(rng()-.5)*.037,bd=.185+rng()*.105;
        if(xx+bw>w/2-.1)break;
        if(xx<.065&&xx+bw>-.065){xx=.075;continue;}
        if(row===gapIndex&&xx>.05&&xx<.17){if(row%2){vase(f,xx+.17,yy+.024,.012,.72,'terra');xx+=.52;}else{stack(f,xx+.22,yy+.04,.045,3);xx+=.57;}continue;}
        if(rng()<.025){xx+=.14;continue;}
        const lean=rng()<.12?(rng()-.5)*.18:0;const col=new THREE.Color(groupColor).multiplyScalar(.83+rng()*.24);book(f,xx+bw/2,yy+.026,.08+rng()*.023,bw,bh,bd,col,lean);xx+=bw+.009+rng()*.015;
      }
      for(const xx of [-w/2+.083,w/2-.083])for(const off of [-.05,.03])b.add('sphere','brass',[xx,yy-.05,d*.32+off],[.008,.008,.008],[],null,f,false);
    }
    // Recessed brass catalogue plate on the cornice (decorative, no interaction).
    box('brass',[0,h-.071,d/2+.053],[.28,.064,.007],[],null,f,false);box('black',[0,h-.071,d/2+.058],[.22,.038,.005],[],null,f,false);
    return f;
  }
  for(let i=0;i<6;i++){const x=-6.6+i*2.64;shelf(x,0,-8.68,2.47,2.62,0,i);shelf(x,3.45,-8.68,2.47,2.62,0,i+13);}
  shelf(-7.68,0,-2.32,3.3,2.62,Math.PI/2,21);shelf(-7.68,0,-6.85,2.7,2.62,Math.PI/2,9);
  shelf(-7.68,3.45,-2.35,3.4,2.62,Math.PI/2,3);shelf(-7.68,3.45,-6.25,3.35,2.62,Math.PI/2,6);
  // Lower, double-sided cases: each side has its own collection and open shelf gaps.
  for(const [x,z,seed]of [[-2.75,-1.68,10],[3.85,-1.78,34]]){
    const a=Math.PI/2;shelf(x-.21,0,z,3.15,1.6,-a,seed);shelf(x+.21,0,z,3.15,1.6,a,seed+5);
  }
  function rug(x,y,z,w,d,angle=0){b.add('plane','rug',[x,y+.008,z],[w,d,1],[-Math.PI/2,0,angle],null,null,false);for(let i=0;i<Math.floor(w/.055);i++)for(const sign of [-1,1])box('paper',[x-w/2+.025+i*.055,y+.006,z+sign*(d/2+.034)],[.023,.007,.085],[0,0,(rng()-.5)*.04],null,null,false);}
  rug(.15,.029,2.67,6.5,4.6);rug(9.82,.029,4.03,2.92,4.62);rug(1.8,3.46,-6.75,5.8,2.44);
  function chair(x,y,z,angle=0,green=false){
    const f=b.frame(x,y,z,angle),leather=green?'greenLeather':'leather';
    b.add('plane','contact',[0,.039,0],[1.4,1.3,1],[-Math.PI/2,0,0],null,f,false);
    for(const xx of [-.31,.31])for(const zz of [-.31,.31]){box('darkWood',[xx,.2,zz],[.085,.4,.085],[.05,0,xx*.1],null,f);b.add('sphere','brass',[xx,.035,zz],[.05,.025,.05],[],null,f,false);}
    box('darkWood',[0,.365,0],[.78,.14,.81],[],null,f);b.add('round',leather,[0,.53,.035],[.68,.22,.7],[],null,f);b.add('round',leather,[0,.91,-.335],[.77,.88,.2],[-.105,0,0],null,f);
    for(const xx of [-.42,.42]){b.add('round',leather,[xx,.68,.018],[.18,.27,.84],[],null,f);b.add('cyl',leather,[xx,.79,.01],[.11,.75,.11],[Math.PI/2,0,0],null,f);box('darkWood',[xx,.47,.26],[.085,.42,.085],[],null,f);}
    // Welt seams, brass tacks and soft tuft buttons remain visible up close.
    for(const zz of [-.285,.363])b.rod('edge',[-.30,.577,zz],[.30,.577,zz],.009,f);
    for(const xx of [-.29,.29])b.rod('edge',[xx,.577,-.27],[xx,.577,.35],.009,f);
    for(const xx of [-.225,0,.225])for(const yy of [.78,1.03]){const tz=-.227-.105*(yy-.91);b.add('sphere','darkWood',[xx,yy,tz],[.024,.022,.012],[],null,f,false);for(const sg of [-1,1])b.rod(leather,[xx,yy,tz-.003],[xx+sg*.05,yy+.04,tz-.01],.005,f);}
    for(let xx=-.34;xx<.36;xx+=.065)b.add('sphere','brass',[xx,.393,.412],[.009,.009,.008],[],null,f,false);
    return f;
  }
  function table(x,y,z,w=2.6,d=1.1,angle=0){
    const f=b.frame(x,y,z,angle);b.add('round','wood',[0,.81,0],[w,.1,d],[],null,f);box('darkWood',[0,.687,0],[w-.18,.18,d-.16],[],null,f);
    b.add('plane','contact',[0,.04,0],[w*1.25,d*1.6,1],[-Math.PI/2,0,0],null,f,false);
    for(const xx of [-w/2+.18,w/2-.18])for(const zz of [-d/2+.16,d/2-.16]){box('darkWood',[xx,.38,zz],[.09,.76,.09],[],null,f);b.add('sphere','wood',[xx,.53,zz],[.08,.13,.08],[],null,f);}
    b.rod('wood',[-w/2+.18,.22,0],[w/2-.18,.22,0],.055,f);
    return f;
  }
  function lamp(f,x,y,z,green=false){
    b.add('cyl','brass',[x,y+.023,z],[.15,.046,.15],[],null,f);b.rod('brass',[x,y+.04,z],[x,y+.47,z],.024,f);
    if(green){b.add('round','lampGreen',[x,y+.48,z],[.44,.15,.28],[],null,f);box('bulb',[x,y+.423,z],[.32,.017,.18],[],null,f,false);}
    else{b.add('cone','lamp',[x,y+.49,z],[.26,.32,.26],[],null,f);b.add('sphere','brass',[x,y+.67,z],[.025,.027,.025],[],null,f);}
    b.add('sphere','bulb',[x,y+.43,z],[.043,.051,.043],[],null,f,false);
  }
  function openBook(f,x,y,z,angle=0){
    const q=local(f,[x,y,z],[0,angle,0]);for(const s of [-1,1]){box('book',[s*.135,0,0],[.27,.018,.36],[0,0,s*.04],0x6c4832,q,false);box('paper',[s*.131,.022,0],[.253,.04,.343],[0,0,s*.045],null,q,false);for(let k=0;k<13;k++){const len=.17+(rng()-.5)*.035;box('edge',[s*.13,.048+k*.00002,-.13+k*.020],[len,.0015,.0015],[0,0,s*.045],null,q,false);}}b.rod('leather',[0,.05,-.16],[0,.05,.19],.006,q);box('book',[.083,.048,.21],[.022,.002,.12],[],0x875044,q,false);
  }
  function cup(f,x,y,z){
    b.add('cyl','ceramic',[x,y+.012,z],[.084,.02,.084],[],null,f);b.add('cyl','ceramic',[x,y+.06,z],[.052,.087,.052],[],null,f);b.add('cyl','black',[x,y+.106,z],[.044,.002,.044],[],null,f,false);b.add('torus','ceramic',[x+.055,y+.069,z],[.034,.034,.034],[],null,f);
  }
  const mainTable=table(.2,0,2.55,3.4,1.28);lamp(mainTable,-1.14,.86,-.2,true);lamp(mainTable,1.1,.86,.18,true);openBook(mainTable,-.55,.88,.1,-.12);stack(mainTable,.49,.91,-.18,3);cup(mainTable,-.03,.866,.34);
  chair(-.94,0,3.72,Math.PI);chair(1.35,0,1.37,0,true);
  chair(10.32,0,2.33,.15,true);chair(10.33,0,5.79,Math.PI-.17);
  const side=b.frame(10.48,0,4.15);b.add('cyl','wood',[0,.63,0],[.47,.075,.47],[],null,side);b.add('cyl','darkWood',[0,.31,0],[.075,.6,.075],[],null,side);for(let i=0;i<3;i++){const a=i*Math.PI*2/3;b.rod('darkWood',[0,.13,0],[Math.cos(a)*.34,.055,Math.sin(a)*.34],.045,side);}lamp(side,0,.67,-.04);cup(side,.24,.67,.17);book(side,-.22,.7,.12,.08,.24,.18,0x6c4334,0,true);
  // Leather footstool in the bay.
  const ott=b.frame(9.22,0,5.24,-.1);b.add('round','leather',[0,.37,0],[.71,.24,.5],[],null,ott);for(const x of [-.25,.25])for(const z of [-.17,.17])box('darkWood',[x,.14,z],[.06,.28,.06],[],null,ott);
  const desk=table(3.7,3.46,-7.04,2.45,1.08);lamp(desk,.78,.86,-.22,true);openBook(desk,-.23,.88,.12,.05);stack(desk,-.79,.89,-.17,2);cup(desk,.46,.87,.21);chair(3.69,3.46,-7.98,0,true);
  chair(.21,3.46,-7.1,-.1);const gallerySide=table(1.35,3.46,-6.79,.64,.66);vase(gallerySide,0,.86,0,.62);
  // A narrow console under the gallery, with a collected little still life.
  const console=table(5.68,0,-6.65,1.6,.62);vase(console,-.48,.86,0,1);stack(console,.25,.88,.03,3);lamp(console,.52,.86,-.05);
  // Botanical plant: curved woody stems and paired waxy leaves.
  function plant(x,y,z,size=1){
    const f=b.frame(x,y,z);b.add('cone','terra',[0,.18*size,0],[.25*size,.36*size,.25*size],[],null,f);b.add('torus','terra',[0,.36*size,0],[.138*size,.138*size,.138*size],[Math.PI/2,0,0],null,f);b.add('cyl','darkWood',[0,.342*size,0],[.12*size,.014,.12*size],[],null,f);
    for(let i=0;i<7;i++){const a=i*2.39,ht=(.75+rng()*.6)*size,px=Math.cos(a)*.25*size,pz=Math.sin(a)*.25*size;b.rod('edge',[0,.3*size,0],[px,ht,pz],.011*size,f);for(let j=0;j<4;j++){const t=.35+j*.2;for(const side of [-1,1]){const xx=px*t+Math.cos(a+side*.7)*.11*size,zz=pz*t+Math.sin(a+side*.7)*.11*size;b.add('sphere','leaf',[xx,.3*size+(ht-.3*size)*t,zz],[.06*size,.017*size,.17*size],[.2,a+side*.7,.2],new THREE.Color().setScalar(.72+rng()*.3),f,false);}}}
    
  }
  plant(11.03,0,6.45,1.2);plant(7.28,0,.26,.82);plant(7.31,3.46,-5.99,1);
  // Rolled charts and book piles on the low cases.
  for(const [x,z]of [[-2.74,-2.55],[3.85,-1.2]]){const f=b.frame(x,1.675,z,Math.PI/2);stack(f,0,0,0,3);for(let i=0;i<3;i++)b.add('cyl','paper',[.5+i*.07,.05,-.1],[.032,.4,.032],[Math.PI/2,0,.06*i],null,f,false);}
  return {bookCount,book,stack,vase,chair,table,lamp,openBook,plant};
}

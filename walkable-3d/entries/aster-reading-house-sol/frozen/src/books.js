import * as THREE from 'three';
import {colorGeometry,localPoint} from './batch.js';
import {bookPalette,rand} from './materials.js';
import {orientedObstacle} from './layout.js';

export function createBookTools(batch,m){
  let count=0;
  function book(origin,w,h,d,angle=0,tilt=0,index=Math.floor(rand()*64)){
    count++;
    const color=bookPalette[index%bookPalette.length];
    const coverThickness=Math.min(.0035,w*.18);
    const q=new THREE.Quaternion().setFromEuler(new THREE.Euler(0,angle,tilt));
    const pos=new THREE.Vector3(...origin);
    function piece(size,offset,material,colored=false){const p=new THREE.Vector3(...offset).applyQuaternion(q).add(pos);const g=new THREE.BoxGeometry(...size);if(colored)colorGeometry(g,color);g.applyQuaternion(q);batch.add(g,material,p.toArray(),[0,0,0],[1,1,1],material===m.bookCover);}
    piece([w-coverThickness*2-.0015,h-.014,d-.025],[0,h/2,-.006],m.paper);
    piece([coverThickness,h,d],[-w/2+coverThickness/2,h/2,0],m.bookCover,true);piece([coverThickness,h,d],[w/2-coverThickness/2,h/2,0],m.bookCover,true);
    piece([w,h,.018],[0,h/2,d/2-.009],m.bookCover,true);
    const front=new THREE.PlaneGeometry(w-.002,h-.002);const uv=front.attributes.uv;
    const ax=(index%8)/8,ay=1-(Math.floor(index/8)+1)/8;
    for(let i=0;i<uv.count;i++){uv.setXY(i,ax+(.009+uv.getX(i)*.982)/8,ay+(.009+uv.getY(i)*.982)/8);}
    front.applyQuaternion(q);const fp=new THREE.Vector3(0,h/2,d/2+.001).applyQuaternion(q).add(pos);batch.add(front,m.bookSpine,fp.toArray(),[0,0,0],[1,1,1],false);
    if(index%3===0)for(const yy of[h*.17,h*.83])piece([w,.005,.006],[0,yy,d/2+.005],m.bookCover,true);
    if(index%5===0)for(const yy of[h*.10,h*.89])piece([w*.78,.0025,.002],[0,yy,d/2+.003],m.pageGold);
  }
  function stack(origin,angle=0,number=3,scale=1){
    let y=origin[1];for(let i=0;i<number;i++){
      const w=(.25+rand()*.08)*scale,d=(.19+rand()*.06)*scale,h=(.034+rand()*.025)*scale;
      const a=angle+(rand()-.5)*.14;const color=bookPalette[Math.floor(rand()*bookPalette.length)];
      for(const sy of [y,y+h]){const g=colorGeometry(new THREE.BoxGeometry(w,.008,d),color);batch.add(g,m.bookCover,[origin[0]+(rand()-.5)*.02,sy,origin[2]],[0,a,0],[1,1,1],true);}
      batch.box([w-.012,h-.008,d-.014],[origin[0],y+h/2,origin[2]],m.paper,[0,a,0],false);y+=h+.008;
    }return y;
  }
  function shelf(origin,width=2.7,height=2.4,angle=0,levels=5,variant=0,register=true){
    const d=.4,frame=.065;const pt=(x,y,z)=>localPoint(x,y,z,origin,angle);
    const box=(size,p,mat=m.walnut)=>batch.box(size,pt(...p),mat,[0,angle,0]);
    box([width,height,.045],[0,height/2,-d/2+.023]);
    for(const x of [-width/2+.035,width/2-.035]){box([frame,height,d],[x,height/2,0],m.walnutVertical);box([.025,height-.09,.025],[x,height/2,d/2+.014],m.oakVertical);}
    box([width+.07,.08,d+.035],[0,height+.025,.006],m.oak);box([width+.035,.09,d+.02],[0,.07,0]);
    const interval=(height-.17)/levels;
    for(let level=0;level<=levels;level++){
      const base=.13+level*interval;box([width-.08,.045,d-.015],[0,base,0]);box([width-.08,.018,.028],[0,base+.027,d/2+.004],m.oak);
      if(level===levels)continue;
      let x=-width/2+.12;let item=0;
      while(x<width/2-.14){
        if((level+variant)%3===1&&item===Math.floor(width*4)){
          if(width>2&&x<.275&&x+.34>.16)x=.275;
          if(variant%4===2){
            box([.28,.22,.25],[x+.16,base+.14,.035],m.linen);box([.29,.02,.26],[x+.16,base+.255,.035],m.walnut);box([.12,.055,.006],[x+.16,base+.16,.164],m.paper);box([.024,.024,.01],[x+.16,base+.105,.17],m.iron);x+=.39;
          }else if(variant%4===3&&level===1){
            batch.cylinder(.055,.08,.14,pt(x+.15,base+.102,.02),m.ceramic,[0,0,0],12);batch.cylinder(.04,.055,.065,pt(x+.15,base+.204,.02),m.ceramicCream,[0,0,0],12);x+=.35;
          }else if(rand()>.35){stack(pt(x+.16,base+.03,.035),angle,3);x+=.38;}else{x+=.3;}item++;continue;
        }
        if(item>2&&rand()<.08){x+=.04+rand()*.06;}
        const w=.015+Math.pow(rand(),1.2)*.060;const h=(interval-.06)*(.6+rand()*.39);const dep=Math.min(h*.81,.17+rand()*.13);
        if(x+w>width/2-.08)break;
        if(width>2&&x<.275&&x+w>.16){x=.275;item++;continue;}
        const tilted=rand()<.08&&x>-.8;
        const tilt=tilted?(rand()-.5)*.15:0;
        const p=pt(x+w/2,base+.032,.175-dep/2+(rand()-.5)*.035);
        book(p,w,h,dep,angle,tilt,Math.floor(rand()*64));x+=w+.002+rand()*.003+(tilted?.025:0);item++;
      }
      if(level===2&&variant%2===0){box([.09,.03,.08],[width/2-.16,base+.06,.06],m.iron);box([.018,.16,.1],[width/2-.2,base+.135,.06],m.iron);}
    }
    // A divider, aged shelf edges, and brass inventory tab interrupt the book rhythm.
    if(width>2){box([.045,height-.1,d-.03],[.21,height/2,0],m.walnutVertical);}
    box([.15,.045,.012],[-width*.29,height-.1,d/2+.026],m.brass);
    for(let i=0;i<4;i++){const x=(rand()-.5)*(width-.1),y=.13+Math.floor(rand()*levels)*interval;box([.055,.005,.024],[x,y+.026,d/2+.008],m.oak);}
    if(register)orientedObstacle(origin[0],origin[2],width,d+.08,angle,origin[1],origin[1]+height,'bookcase');
  }
  return{book,stack,shelf,get count(){return count;}};
}

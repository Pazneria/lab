import * as THREE from 'three';
import {localPoint} from './batch.js';
import {rand} from './materials.js';
import {orientedObstacle} from './layout.js';

function roundedGeometry(w,h,d,r=.045){
  r=Math.min(r,w/3,h/3,d/3);const s=new THREE.Shape();const x=-w/2+r,y=-h/2+r,W=w-2*r,H=h-2*r;
  s.moveTo(x,y-r);s.lineTo(x+W,y-r);s.quadraticCurveTo(x+W+r,y-r,x+W+r,y);s.lineTo(x+W+r,y+H);s.quadraticCurveTo(x+W+r,y+H+r,x+W,y+H+r);s.lineTo(x,y+H+r);s.quadraticCurveTo(x-r,y+H+r,x-r,y+H);s.lineTo(x-r,y);s.quadraticCurveTo(x-r,y-r,x,y-r);
  const g=new THREE.ExtrudeGeometry(s,{depth:d-2*r,bevelEnabled:true,bevelSegments:2,steps:1,bevelSize:r*.5,bevelThickness:r,curveSegments:3});g.translate(0,0,-d/2+r);return g;
}
function imageMaterial(draw,w=512,h=512){const c=document.createElement('canvas');c.width=w;c.height=h;draw(c.getContext('2d'),w,h);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=8;return new THREE.MeshStandardMaterial({map:t,roughness:.94});}

export function createObjectTools(batch,m,books,scene){
  function contact(origin,w,d,angle=0){batch.add(new THREE.PlaneGeometry(w,d),m.contact,[origin[0],origin[1]+.024,origin[2]],[-Math.PI/2,0,-angle],[1,1,1],false);}
  const local=(origin,angle)=>({pt:(x,y,z)=>localPoint(x,y,z,origin,angle),box:(size,p,mat=m.oak)=>batch.box(size,localPoint(...p,origin,angle),mat,[0,angle,0]),rounded:(size,p,mat=m.leather,r=.045)=>batch.add(roundedGeometry(...size,r),mat,localPoint(...p,origin,angle),[0,angle,0])});
  function table(origin,w=2.8,d=1.25,angle=0,register=true){const{box}=local(origin,angle);contact(origin,w+.4,d+.45,angle);box([w,.085,d],[0,.76,0],m.oak);box([w-.14,.13,d-.16],[0,.65,0],m.walnut);for(const x of [-w/2+.16,w/2-.16])for(const z of [-d/2+.13,d/2-.13]){box([.095,.64,.095],[x,.32,z],m.walnutVertical);box([.11,.06,.11],[x,.08,z],m.iron);}box([w-.22,.055,.065],[0,.23,0],m.walnut);if(register)orientedObstacle(origin[0],origin[2],w,d,angle,origin[1],origin[1]+.84,'table');}
  function chair(origin,angle=0,register=true){const{pt,box,rounded}=local(origin,angle);contact(origin,.9,.86,angle);for(const x of [-.22,.22])for(const z of [-.2,.2])box([.045,.45,.045],[x,.225,z],m.walnutVertical);box([.53,.055,.5],[0,.445,0],m.walnut);rounded([.46,.09,.43],[0,.51,-.005],m.leather);for(const x of[-.23,.23])box([.045,.56,.045],[x,.77,-.20],m.walnutVertical);box([.51,.10,.055],[0,1.045,-.20],m.walnut);for(const x of[-.13,0,.13])box([.045,.38,.035],[x,.84,-.20],m.oakVertical);for(const x of[-.22,.22])box([.035,.035,.43],[x,.2,0],m.walnut);if(register)orientedObstacle(origin[0],origin[2],.59,.58,angle,origin[1],origin[1]+1.1,'reading chair');}
  function armchair(origin,angle=0,green=false,register=true){const{pt,box,rounded}=local(origin,angle);const leather=green?m.leatherGreen:m.leather;
    contact(origin,1.3,1.2,angle);
    for(const x of[-.34,.34])for(const z of[-.3,.3])box([.07,.21,.07],[x,.105,z],m.walnut);
    rounded([.88,.26,.83],[0,.34,0],leather,.05);rounded([.66,.16,.66],[0,.53,.06],leather,.045);rounded([.88,.61,.21],[0,.79,-.34],leather,.055);
    for(const x of[-.39,.39]){rounded([.19,.32,.84],[x,.65,.015],leather,.055);batch.rod(pt(x,.79,-.34),pt(x,.79,.38),.006,m.pageGold);}
    for(const x of[-.26,0,.26])for(const y of[.72,.91])batch.sphere(.017,pt(x,y,-.224),m.walnut,[1,1,.4],8);
    for(const x of[-.3,.3])batch.rod(pt(x,.62,-.16),pt(x,.62,.32),.004,m.pageGold);
    // Broad pale scuffs along the arms give the upholstery a touched surface.
    for(const x of[-.4,.4])rounded([.105,.008,.28],[x,.813,.21],green?m.leatherGreen:m.leather,.005);
    if(register)orientedObstacle(origin[0],origin[2],1.03,.98,angle,origin[1],origin[1]+1.17,'leather armchair');
  }
  function couch(origin,angle=0){const{pt,box,rounded}=local(origin,angle);contact(origin,2.5,1.3,angle);for(const x of[-.8,.8])for(const z of[-.28,.28])box([.08,.22,.08],[x,.11,z],m.walnut);rounded([1.95,.27,.85],[0,.33,0],m.leatherGreen);rounded([1.98,.64,.23],[0,.77,-.34],m.leatherGreen);for(const x of[-.88,.88])rounded([.21,.34,.85],[x,.62,0],m.leatherGreen);for(const x of[-.46,.24])rounded([.7,.15,.64],[x,.51,.07],m.leatherGreen);rounded([.38,.38,.16],[.52,.72,-.13],m.linen);for(const x of[-.62,-.21,.21,.62])for(const y of[.7,.9])batch.sphere(.016,pt(x,y,-.218),m.walnut,[1,1,.4],8);orientedObstacle(origin[0],origin[2],2.08,.95,angle,origin[1],origin[1]+1.16,'alcove settee');}
  function lamp(origin,kind='desk'){
    const[x,y,z]=origin;const tall=kind==='floor',height=tall?1.6:.45;
    batch.cylinder(tall?.18:.105,tall?.21:.12,.055,[x,y+.027,z],m.iron);batch.cylinder(.02,.023,height,[x,y+height/2+.04,z],m.brass);
    if(tall){batch.cylinder(.22,.32,.34,[x,y+1.51,z],m.lampShade,[0,0,0],24);batch.cylinder(.014,.014,.05,[x,y+1.715,z],m.brass);}
    else{batch.rod([x,y+.43,z],[x,y+.48,z+.065],.013,m.brass);const shade=new THREE.SphereGeometry(.18,20,10,0,Math.PI*2,0,Math.PI/2);batch.add(shade,m.ceramic,[x,y+.45,z+.065],[0,0,0],[1,.65,.65]);batch.cylinder(.12,.12,.015,[x,y+.45,z+.065],m.glow,[0,0,0],20,false);}
    const light=new THREE.PointLight('#ffd398',tall?14:5,tall?5:3.2,2);light.position.set(x,y+(tall?1.43:.44),z);scene.add(light);
    return light;
  }
  const pages=imageMaterial((ctx,w,h)=>{ctx.fillStyle='#e3d8b9';ctx.fillRect(0,0,w,h);ctx.fillStyle='#473c2c';ctx.globalAlpha=.46;for(let col=0;col<2;col++)for(let i=0;i<28;i++){const y=55+i*12;const x=40+col*245;const len=150+rand()*48;ctx.fillRect(x,y,len,1.5);if(i%7===0)ctx.fillRect(x,y+4,len*.76,.5);}ctx.globalAlpha=.8;ctx.font='18px Georgia';ctx.fillText('On the wooded hills',44,35);ctx.strokeStyle='#74663e';ctx.strokeRect(300,390,110,68);for(let i=0;i<9;i++){ctx.beginPath();ctx.moveTo(300,440+rand()*14);ctx.lineTo(340,405+rand()*40);ctx.lineTo(410,443+rand()*12);ctx.stroke();}});
  function openBook(origin,angle=0){const{pt,box}=local(origin,angle);box([.48,.026,.32],[0,.008,0],m.walnut);for(const side of[-1,1]){const geom=new THREE.PlaneGeometry(.23,.30);const uv=geom.attributes.uv;for(let i=0;i<uv.count;i++)uv.setX(i,uv.getX(i)*.5+(side>0?.5:0));geom.rotateX(-Math.PI/2);batch.add(geom,pages,pt(side*.117,.035,0),[0,angle,side*.08],[1,1,1],false);}box([.014,.032,.32],[0,.025,0],m.paper);box([.012,.002,.12],[.08,.041,.15],m.red);}
  function cup(origin){const[x,y,z]=origin;batch.cylinder(.072,.078,.012,[x,y+.008,z],m.ceramicCream);batch.cylinder(.045,.03,.076,[x,y+.05,z],m.ceramicCream,[0,0,0],16);batch.cylinder(.038,.038,.005,[x,y+.089,z],m.walnut,[0,0,0],16,false);const torus=new THREE.TorusGeometry(.025,.007,5,12);batch.add(torus,m.ceramicCream,[x+.05,y+.051,z],[0,Math.PI/2,0]);}
  function plant(origin,size=1){const[x,y,z]=origin;batch.cylinder(.13*size,.085*size,.22*size,[x,y+.11*size,z],m.ceramic,[0,0,0],16);batch.cylinder(.115*size,.115*size,.01,[x,y+.219*size,z],m.soil);for(let i=0;i<18;i++){const a=i*2.399,reach=(.1+rand()*.18)*size,up=(.25+rand()*.4)*size;const end=[x+Math.cos(a)*reach,y+up,z+Math.sin(a)*reach];batch.rod([x,y+.18*size,z],end,.004*size,m.leaf,5);const g=new THREE.SphereGeometry(.1*size,6,4);batch.add(g,m.leaf,end,[.6*Math.cos(a),a,.8*Math.sin(a)],[.35,.09,1.2]);}}
  function smallObjects(origin){books.stack(origin,.14,3);const[x,y,z]=origin;cup([x+.39,y,z+.08]);batch.box([.14,.015,.20],[x-.31,y+.011,z+.025],m.leather);batch.box([.008,.008,.18],[x-.3,y+.027,z+.05],m.brass,[0,.3,0],false);}
  function framedArt(origin,w=.8,h=1.1,angle=0,kind='botanical'){
    const{pt,box}=local(origin,angle);
    const art=imageMaterial((ctx,W,H)=>{
      ctx.fillStyle=kind==='landscape'?'#b1ae83':'#d1c6a7';ctx.fillRect(0,0,W,H);
      if(kind==='map'){ctx.strokeStyle='#796f4f';ctx.lineWidth=1;for(let i=0;i<40;i++){ctx.beginPath();ctx.moveTo(0,i*17);for(let x=0;x<W;x+=8)ctx.lineTo(x,i*17+Math.sin(x*.018+i)*16+Math.cos(x*.04-i)*4);ctx.stroke();}ctx.strokeStyle='#947349';ctx.lineWidth=6;ctx.beginPath();ctx.moveTo(80,H);ctx.bezierCurveTo(250,200,180,260,W,90);ctx.stroke();ctx.fillStyle='#5b523a';ctx.font='20px Georgia';ctx.fillText('THE ASTER HILLS',40,42);}
      else if(kind==='landscape'){ctx.fillStyle='#cfbc91';ctx.fillRect(0,0,W,H*.45);for(let i=0;i<6;i++){ctx.fillStyle=['#a5a181','#8b9475','#7e8b64','#667957','#586848','#4c5c40'][i];ctx.beginPath();ctx.moveTo(0,H);for(let x=0;x<=W;x+=12)ctx.lineTo(x,H*(.35+i*.09)+Math.sin(x*.011+i)*H*.08);ctx.lineTo(W,H);ctx.fill();}ctx.fillStyle='#d6c3a0';ctx.fillRect(W*.5,H*.6,42,35);ctx.fillStyle='#694c36';ctx.beginPath();ctx.moveTo(W*.5-5,H*.6);ctx.lineTo(W*.5+20,H*.56);ctx.lineTo(W*.5+49,H*.6);ctx.fill();}
      else{ctx.strokeStyle='#4d6544';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(W*.49,H*.88);ctx.bezierCurveTo(W*.46,H*.6,W*.58,H*.4,W*.48,H*.16);ctx.stroke();for(let i=0;i<12;i++){const yy=H*(.23+i*.046),xx=W*(.5+Math.sin(i)*.04);ctx.fillStyle=i%2?'#6f7d51':'#84905d';ctx.beginPath();ctx.ellipse(xx+(i%2?40:-40),yy,50,13,i%2?-.45:.45,0,6.3);ctx.fill();}ctx.font='16px Georgia';ctx.fillStyle='#5d563d';ctx.fillText('Plate XVIII — Fagus sylvatica',44,H*.95);}
      ctx.strokeStyle='#6d6143';ctx.lineWidth=2;ctx.strokeRect(17,17,W-34,H-34);ctx.globalAlpha=.1;for(let i=0;i<5000;i++){ctx.fillStyle=rand()>.5?'#fff':'#282816';ctx.fillRect(rand()*W,rand()*H,1,1);}
    },512,kind==='landscape'?360:640);
    box([w+.13,h+.13,.06],[0,0,0],m.walnut);box([w+.045,h+.045,.025],[0,0,.042],m.brass);box([w,h,.02],[0,0,.063],m.linen);batch.add(new THREE.PlaneGeometry(w-.06,h-.06),art,pt(0,0,.076),[0,angle,0],[1,1,1],false);
  }
  function globe(origin){const[x,y,z]=origin;const globeMat=imageMaterial((ctx,w,h)=>{ctx.fillStyle='#738b82';ctx.fillRect(0,0,w,h);ctx.fillStyle='#b5a575';for(let i=0;i<15;i++){const xx=rand()*w,yy=rand()*h;ctx.beginPath();for(let j=0;j<20;j++){const a=j/20*6.3,r=20+rand()*35;const px=xx+Math.cos(a)*r,py=yy+Math.sin(a)*r*.5;if(j===0)ctx.moveTo(px,py);else ctx.lineTo(px,py);}ctx.fill();}ctx.strokeStyle='#ddd1a455';ctx.lineWidth=1;for(let x=0;x<w;x+=32){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.stroke();}for(let y=0;y<h;y+=32){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke();}},512,256);batch.cylinder(.15,.19,.05,[x,y+.025,z],m.walnut);batch.cylinder(.018,.04,.16,[x,y+.11,z],m.brass);batch.sphere(.20,[x,y+.33,z],globeMat,[1,1,1],24);batch.add(new THREE.TorusGeometry(.216,.008,6,40),m.brass,[x,y+.33,z],[0,0,.35]);}
  function bookPress(origin,angle=0){const{pt,box}=local(origin,angle);box([.55,.055,.38],[0,.0275,0],m.walnut);box([.39,.041,.28],[0,.073,0],m.paper);box([.46,.039,.31],[0,.113,0],m.oak);for(const x of[-.23,.23]){box([.035,.33,.04],[x,.205,0],m.iron);box([.07,.028,.075],[x,.066,0],m.iron);}box([.53,.06,.12],[0,.34,0],m.walnut);batch.cylinder(.013,.013,.26,pt(0,.276,0),m.brass,[0,0,0],12);for(let i=0;i<13;i++)batch.cylinder(.017,.017,.003,pt(0,.163+i*.016,0),m.iron,[0,0,0],12);batch.rod(pt(-.115,.411,0),pt(.115,.411,0),.019,m.walnut,12);for(const x of[-.23,.23])batch.sphere(.017,pt(x,.38,0),m.brass,[1,.4,1],10);}
  function footstool(origin,angle=0){const{box,rounded}=local(origin,angle);contact(origin,.83,.75,angle);for(const x of[-.22,.22])for(const z of[-.17,.17])box([.048,.25,.048],[x,.125,z],m.walnutVertical);box([.53,.08,.43],[0,.24,0],m.walnut);rounded([.56,.14,.46],[0,.345,0],m.leather);orientedObstacle(origin[0],origin[2],.64,.54,angle,origin[1],origin[1]+.47,'leather footstool');}
  return{table,chair,armchair,couch,lamp,openBook,cup,plant,smallObjects,framedArt,globe,bookPress,footstool};
}

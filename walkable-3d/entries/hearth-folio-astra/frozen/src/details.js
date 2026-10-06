import * as THREE from 'three';
import {random} from './materials.js';

const rng=random(934);
function canvasMap(w,h,fn){const c=document.createElement('canvas');c.width=w;c.height=h;fn(c.getContext('2d'),w,h);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=4;return t;}
export function details(scene,b,m,props){
  function framed(texture,x,y,z,w,h,angle=0){const f=b.frame(x,y,z,angle);b.box('darkWood',[0,0,0],[w+.19,h+.19,.085],[],null,f);b.box('gold',[0,0,.05],[w+.085,h+.085,.018],[],null,f);b.box('cream',[0,0,.067],[w+.033,h+.033,.016],[],null,f);const mat=new THREE.MeshStandardMaterial({map:texture,roughness:.92});const mesh=new THREE.Mesh(new THREE.PlaneGeometry(w,h),mat);mesh.position.set(0,0,.078);mesh.applyMatrix4(f);scene.add(mesh);}
  function botanical(seed){const r=random(seed);return canvasMap(512,720,(c,w,h)=>{c.fillStyle='#c7bb94';c.fillRect(0,0,w,h);for(let i=0;i<6000;i++){c.fillStyle=`rgba(69,55,25,${r()*.07})`;c.fillRect(r()*w,r()*h,1+r()*2,1);}
    c.strokeStyle='#798055';c.lineWidth=4;c.beginPath();c.moveTo(253,593);c.bezierCurveTo(195,370,330,291,235,132);c.stroke();
    for(let i=0;i<13;i++){const y=185+i*29,x=250+Math.sin(i*.45)*27,sg=i%2?1:-1;c.strokeStyle='#5a683d';c.lineWidth=2;c.beginPath();c.moveTo(x,y+35);c.quadraticCurveTo(x+sg*80,y-5,x+sg*120,y-12);c.stroke();c.save();c.translate(x+sg*54,y+4);c.rotate(sg*-.46);for(let k=0;k<5;k++){c.fillStyle=['#596a3f','#768055','#657648'][k%3];c.beginPath();c.ellipse(sg*k*10,-k*3,24-k*2,8,sg*-.3,0,Math.PI*2);c.fill();}c.restore();}
    c.textAlign='center';c.fillStyle='#51553f';c.font='24px Georgia';c.fillText(['OSMUNDA REGALIS','SALVIA PRATENSIS','POLYPODIUM VULGARE'][seed%3],256,651);c.font='13px Georgia';c.fillText('Collected on the western ridge · Plate '+seed,256,679);c.strokeStyle='#55553c66';c.strokeRect(25,25,w-50,h-50);
  });}
  framed(botanical(4),-7.85,5.62,2.12,1.04,1.45,Math.PI/2);framed(botanical(7),-7.85,5.62,4.0,1.04,1.45,Math.PI/2);framed(botanical(9),-7.85,5.62,5.88,1.04,1.45,Math.PI/2);
  const map=canvasMap(1024,720,(c,w,h)=>{
    c.fillStyle='#b7ac82';c.fillRect(0,0,w,h);c.strokeStyle='#827f583f';c.lineWidth=1;
    for(let i=0;i<26;i++){c.beginPath();for(let x=20;x<w-20;x+=8){let yy=70+i*22+Math.sin(x*.01+i*.35)*25+Math.sin(x*.022+i)*10;c.lineTo(x,yy);}c.stroke();}
    c.strokeStyle='#758876';c.lineWidth=15;c.beginPath();c.moveTo(370,0);c.bezierCurveTo(500,190,170,300,570,425);c.bezierCurveTo(740,490,650,610,780,720);c.stroke();c.strokeStyle='#e3d2a6';c.lineWidth=3;c.setLineDash([12,7]);c.beginPath();c.moveTo(110,690);c.bezierCurveTo(250,370,590,250,920,90);c.stroke();c.setLineDash([]);
    c.fillStyle='#696e4d';for(let i=0;i<150;i++){let x=rng()*900+70,y=rng()*580+60;c.beginPath();c.moveTo(x,y-5);c.lineTo(x-4,y+5);c.lineTo(x+4,y+5);c.closePath();c.fill();}
    c.strokeStyle='#574f3677';c.lineWidth=4;c.strokeRect(19,19,986,682);c.lineWidth=1;c.strokeRect(28,28,968,664);c.fillStyle='#554f39';c.font='32px Georgia';c.fillText('THE WESTERN HILLS',67,83);c.font='18px Georgia';c.fillText('A survey of footpaths, woods & waterways',67,115);c.font='italic 19px Georgia';for(const [s,x,y]of [['Alder Wood',640,265],['River Wye',590,510],['The Ridge',210,225],['Meadow Hill',107,543]])c.fillText(s,x,y);
    c.save();c.translate(871,564);for(let i=0;i<8;i++){c.rotate(Math.PI/4);c.beginPath();c.moveTo(0,-59);c.lineTo(-8,0);c.lineTo(0,10);c.lineTo(8,0);c.closePath();c.fillStyle=i%2?'#8b805b':'#484a3b';c.fill();}c.restore();c.font='18px Georgia';c.fillText('N',864,490);
    for(let i=0;i<18000;i++){c.fillStyle=`rgba(77,57,25,${rng()*.06})`;c.fillRect(rng()*w,rng()*h,1,2);}
  });
  framed(map,7.89,2.27,-4.24,1.19,.84,-Math.PI/2);
  const landscape=canvasMap(1024,560,(c,w,h)=>{const sky=c.createLinearGradient(0,0,0,h);sky.addColorStop(0,'#aaab8d');sky.addColorStop(.6,'#d5bc8b');sky.addColorStop(1,'#676943');c.fillStyle=sky;c.fillRect(0,0,w,h);for(let j=0;j<5;j++){c.fillStyle=['#939579','#828a6c','#697b60','#5d694a','#4d5a3e'][j];c.beginPath();c.moveTo(0,h);for(let x=0;x<=w;x+=8)c.lineTo(x,245+j*53+Math.sin(x*.006+j)*45+Math.sin(x*.018+j*.75)*12);c.lineTo(w,h);c.fill();}c.fillStyle='#353f30';for(let i=0;i<12;i++){let x=30+i*96,y=405+Math.sin(i)*22;c.fillRect(x,y-65,5,106);for(let j=0;j<5;j++){c.beginPath();c.ellipse(x+(rng()-.5)*35,y-65+j*10,25,21,0,0,7);c.fill();}}for(let i=0;i<14000;i++){c.fillStyle=`rgba(211,196,143,${rng()*.13})`;c.fillRect(rng()*w,rng()*h,2+rng()*8,.7);}});
  framed(landscape,0,6.97,-8.9,3.85,1.18,0);
  // Brass pendulum clock, visible from the lower hall and overlook.
  const cf=b.frame(-3.08,6.88,-8.85);b.add('cyl','darkWood',[0,0,0],[.44,.12,.44],[Math.PI/2,0,0],null,cf);b.add('torus','brass',[0,0,.075],[.415,.415,.415],[],null,cf);b.add('cyl','paper',[0,0,.075],[.374,.014,.374],[Math.PI/2,0,0],null,cf);
  for(let i=0;i<12;i++){const a=i*Math.PI/6;b.rod('darkWood',[Math.sin(a)*.308,Math.cos(a)*.308,.09],[Math.sin(a)*.343,Math.cos(a)*.343,.09],.009,cf);}b.rod('iron',[0,0,.1],[-.19,.09,.1],.015,cf);b.rod('iron',[0,0,.105],[.10,.25,.105],.01,cf);b.add('sphere','brass',[0,0,.11],[.035,.035,.019],[],null,cf);
  // A turned globe on the gallery, deliberately set away from the circulation edge.
  const globeMap=canvasMap(1024,512,(c,w,h)=>{c.fillStyle='#ad9e76';c.fillRect(0,0,w,h);c.strokeStyle='#675e4366';c.lineWidth=1;for(let x=0;x<w;x+=64){c.beginPath();c.moveTo(x,0);c.lineTo(x,h);c.stroke();}for(let y=0;y<h;y+=64){c.beginPath();c.moveTo(0,y);c.lineTo(w,y);c.stroke();}const continents=[[[130,130],[230,70],[295,115],[320,190],[260,214],[240,310],[210,290],[190,200]],[[410,142],[505,105],[586,150],[641,126],[754,134],[835,196],[798,225],[720,220],[671,284],[600,240],[574,210],[522,282],[482,364],[443,306],[430,220]],[[772,320],[855,311],[900,360],[824,392],[785,375]]];for(const p of continents){c.fillStyle='#59684f';c.beginPath();p.forEach(a=>c.lineTo(...a));c.closePath();c.fill();}c.fillStyle='#5e5946';c.font='italic 19px Georgia';c.fillText('OCEANUS',45,330);c.fillText('TERRA',666,72);});
  const globeMat=new THREE.MeshStandardMaterial({map:globeMap,roughness:.73});const globe=new THREE.Mesh(new THREE.SphereGeometry(.34,40,24),globeMat);globe.position.set(-5.4,4.38,-2.1);globe.rotation.z=.29;scene.add(globe);
  b.add('torus','brass',[-5.4,4.38,-2.1],[.395,.395,.395],[0,.2,.29]);b.add('cyl','darkWood',[-5.4,3.86,-2.1],[.056,.77,.056]);b.add('cyl','wood',[-5.4,3.49,-2.1],[.28,.07,.28]);
  // A small iron stove and stacked split logs opposite the bay.
  const stove=b.frame(-2.07,0,8.37,Math.PI);b.box('stone',[0,.04,0],[1.46,.08,1.01],[],null,stove);b.add('round','iron',[0,.64,0],[.81,.98,.64],[],null,stove);b.add('cyl','iron',[0,2.08,-.12],[.12,2.1,.12],[],null,stove);b.box('brass',[0,.64,.326],[.55,.54,.028],[],null,stove);b.box('black',[0,.64,.344],[.47,.46,.012],[],null,stove);b.rod('iron',[.27,.54,.41],[.27,.74,.41],.023,stove);for(const x of [-.28,.28])for(const z of [-.23,.23])b.box('iron',[x,.13,z],[.09,.26,.08],[],null,stove);for(let k=0;k<5;k++)b.rod('iron',[-.2+k*.1,.44,.361],[-.2+k*.1,.84,.361],.009,stove);
  for(let i=0;i<5;i++){b.add('cyl','wood',[-3.08+(i%2)*.18,.13+Math.floor(i/2)*.16,8.51],[.10,.44,.10],[Math.PI/2,0,.07*i]);}
  // Iron chandelier with individual shades, sockets and suspension chains.
  const center=[.2,5.8,.9];b.add('torus','iron',center,[1.2,1.2,1.2],[Math.PI/2,0,0]);
  for(let i=0;i<6;i++){const a=i*Math.PI/3,x=center[0]+Math.cos(a)*1.2,z=center[2]+Math.sin(a)*1.2;b.rod('brass',[x,5.8,z],[x,6.12,z],.02);b.add('cone','lamp',[x,6.17,z],[.23,.25,.23]);b.add('sphere','bulb',[x,6.03,z],[.053,.048,.053],[],null,null,false);}
  for(let i=0;i<3;i++){const a=i*Math.PI*2/3;const x=.2+Math.cos(a),z=.9+Math.sin(a);b.rod('iron',[x,5.8,z],[.2,8,.9],.013);}
  b.add('sphere','brass',[.2,7.94,.9],[.1,.08,.1]);
  // Coat pegs and a folded wool throw at the entry.
  b.box('wood',[1.92,1.6,8.81],[.8,.12,.06]);for(const x of [1.67,1.91,2.15])b.rod('iron',[x,1.6,8.78],[x,1.63,8.6],.021);
  // Linen curtains at the opening, gathered loosely around their brass ties.
  const curtainGeo=new THREE.PlaneGeometry(.75,3.85,20,28),cp=curtainGeo.attributes.position;
  for(let i=0;i<cp.count;i++){const u=cp.getX(i)/.75+.5,v=cp.getY(i)/3.85+.5,gather=1-.57*Math.exp(-(((v-.38)/.16)**2));cp.setXYZ(i,(u-.5)*.75*gather,cp.getY(i)+.027*Math.cos(u*Math.PI*6)*(1-v),.045*Math.sin(u*Math.PI*10)+.1*Math.sin(v*Math.PI));}curtainGeo.computeVertexNormals();
  const linenMap=canvasMap(256,256,(c,w,h)=>{c.fillStyle='#7e8d72';c.fillRect(0,0,w,h);for(let x=0;x<w;x+=2){c.fillStyle=x%4?'#60705833':'#ccd1ad33';c.fillRect(x,0,.7,h);}for(let y=0;y<h;y+=3){c.fillStyle='#4b644433';c.fillRect(0,y,w,.5);}});const curtainMat=new THREE.MeshStandardMaterial({map:linenMap,roughness:1,side:THREE.DoubleSide});
  for(const z of [1.4,6.6]){const curtain=new THREE.Mesh(curtainGeo,curtainMat);curtain.position.set(7.91,2.39,z);curtain.rotation.y=-Math.PI/2;curtain.castShadow=true;curtain.receiveShadow=true;scene.add(curtain);b.add('torus','brass',[7.92,1.92,z],[.13,.13,.13],[0,0,Math.PI/2]);}
  b.rod('iron',[7.82,4.4,1.04],[7.82,4.4,6.96],.025);
  // A librarian's small rolling step ladder, kept beside the end of the stacks.
  const lf=b.frame(-5.05,0,-8.05);for(const x of [-.27,.27]){b.rod('wood',[x,.12,.46],[x,2.55,-.06],.042,lf);b.add('cyl','iron',[x,.1,.48],[.07,.045,.07],[0,0,Math.PI/2],null,lf);}for(let k=0;k<8;k++){const y=.24+k*.285,z=.46-(y/2.55)*.52;b.box('wood',[0,y,z],[.6,.055,.16],[],null,lf);}
}

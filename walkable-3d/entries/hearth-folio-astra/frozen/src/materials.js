import * as THREE from 'three';

export function random(seed=4217){return()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
const rng=random(712);
function texture(w,h,draw){const c=document.createElement('canvas');c.width=w;c.height=h;draw(c.getContext('2d'),w,h);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.wrapS=t.wrapT=THREE.RepeatWrapping;t.anisotropy=4;return t;}
function grain(base,kind){return texture(512,512,(c,w,h)=>{
  const im=c.createImageData(w,h);
  for(let y=0;y<h;y++)for(let x=0;x<w;x++){
    let v=(rng()-.5)*13;
    if(kind==='wood')v+=8*Math.sin(x*.21+Math.sin(y*.018)*1.1)+3*Math.sin(x*1.8+y*.004)+3*Math.sin(x*.046);
    if(kind==='plaster')v+=3*Math.sin(x*.028)*Math.sin(y*.043)+2*Math.cos((x+y)*.1);
    if(kind==='leather')v+=3*Math.sin(y*.42+Math.sin(x*.06)*2)+2*Math.sin(x*1.9+y*1.3);
    const i=(y*w+x)*4;im.data[i]=base[0]+v;im.data[i+1]=base[1]+v*.75;im.data[i+2]=base[2]+v*.55;im.data[i+3]=255;
  }c.putImageData(im,0,0);
  if(kind==='wood'){
    for(let j=0;j<85;j++){let x=rng()*w;c.strokeStyle=`rgba(28,15,6,${.03+rng()*.12})`;c.lineWidth=rng()*1.7+.3;c.beginPath();c.moveTo(x,0);for(let y=0;y<=h;y+=20)c.lineTo(x+Math.sin(y*.013+j)*2,y);c.stroke();}
    for(let j=0;j<3;j++){const x=rng()*w,y=rng()*h;c.save();c.translate(x,y);c.scale(.45,1.8);for(let k=1;k<7;k++){c.beginPath();c.ellipse(0,0,k*3,k*4,0,0,Math.PI*2);c.strokeStyle=`rgba(35,18,7,${.13-k*.013})`;c.stroke();}c.restore();}
  }
  if(kind==='leather'){
    for(let j=0;j<1000;j++){c.fillStyle=`rgba(240,188,123,${rng()*.045})`;c.fillRect(rng()*w,rng()*h,rng()*8+.3,.4);}
    const g=c.createRadialGradient(256,260,30,256,256,340);g.addColorStop(0,'rgba(218,166,112,.15)');g.addColorStop(.65,'rgba(208,137,87,.03)');g.addColorStop(1,'rgba(22,12,8,.34)');c.fillStyle=g;c.fillRect(0,0,w,h);
  }
});}
function rugMap(){return texture(1024,1024,(c,w,h)=>{
  c.fillStyle='#65382f';c.fillRect(0,0,w,h);
  const borders=[[14,'#ac8a5a',3],[26,'#253e3c',20],[55,'#bb9864',4],[67,'#372f2a',3],[82,'#a87b4c',27],[118,'#d0ad71',3],[129,'#263e3d',5],[144,'#a57b50',2]];
  for(const [p,col,th]of borders){c.strokeStyle=col;c.lineWidth=th;c.strokeRect(p,p,w-2*p,h-2*p);}
  function flower(x,y,r,col){c.save();c.translate(x,y);c.fillStyle=col;for(let i=0;i<8;i++){c.rotate(Math.PI/4);c.beginPath();c.ellipse(r*.6,0,r*.36,r*.14,0,0,Math.PI*2);c.fill();}c.fillStyle='#d2ac6b';c.beginPath();c.arc(0,0,r*.16,0,7);c.fill();c.restore();}
  for(let i=0;i<20;i++){const p=45+i*49;flower(p,84,18,'#183d38');flower(p,940,18,'#183d38');flower(84,p,18,'#183d38');flower(940,p,18,'#183d38');}
  for(let y=190;y<850;y+=82)for(let x=195;x<850;x+=84){flower(x+((y/82|0)%2)*25,y,20,'#9b7a4c');c.strokeStyle='#b397654b';c.beginPath();c.moveTo(x,y-26);c.quadraticCurveTo(x+25,y,x,y+28);c.stroke();}
  c.save();c.translate(512,512);for(let j=0;j<4;j++){const s=300-j*39;c.beginPath();c.moveTo(0,-s);c.lineTo(s*.64,0);c.lineTo(0,s);c.lineTo(-s*.64,0);c.closePath();c.fillStyle=['#c1a46d','#283f39','#b0844e','#5b322d'][j];c.fill();}flower(0,0,88,'#b89559');c.restore();
  for(let i=0;i<12000;i++){const a=rng()*.075;c.fillStyle=`rgba(220,205,161,${a})`;c.fillRect(rng()*w,rng()*h,.6+rng()*2,2+rng()*9);}
  for(let y=0;y<h;y+=3){c.fillStyle='rgba(25,20,16,.075)';c.fillRect(0,y,w,.7);}
});}
function spineAtlas(){return texture(1024,1024,(c)=>{
  const names=['FIELD NOTES','THE HERBARIUM','NATURAL HISTORY','HILL & VALE','POEMS','ATLAS','BOTANICA','LETTERS','OLD ROADS','THE ORCHARD','TRAVELS','ESSAYS','MOSS & STONE','COLLECTED WORKS','ORNITHOLOGY','THE GARDEN'];
  for(let k=0;k<16;k++){const x=(k%4)*256,y=(k/4|0)*256;c.save();c.translate(x+128,y+128);c.fillStyle='#d9bc76';c.textAlign='center';c.font='24px Georgia';c.translate(0,-8);const words=names[k].split(' ');words.forEach((t,j)=>c.fillText(t,0,j*30,210));c.font='16px Georgia';c.fillText(['I','II','III','IV'][k%4],0,87);c.strokeStyle='#cbb078';c.lineWidth=2;c.beginPath();c.moveTo(-62,-41);c.lineTo(62,-41);c.moveTo(-47,50);c.lineTo(47,50);c.stroke();c.restore();}
});}
export function makeMaterials(){
  const timber=grain([134,93,54],'wood'),dark=grain([90,59,34],'wood'),plaster=grain([164,174,145],'plaster'),cream=grain([205,194,161],'plaster'),leather=grain([91,45,31],'leather'),greenLeather=grain([55,72,57],'leather');
  const pages=texture(128,256,(c,w,h)=>{c.fillStyle='#d7c7a4';c.fillRect(0,0,w,h);for(let y=0;y<h;y+=2){c.fillStyle=`rgba(103,78,42,${.06+rng()*.17})`;c.fillRect(0,y,w,.5);}for(let i=0;i<80;i++){c.fillStyle='#b29a6f33';c.fillRect(rng()*w,rng()*h,1,1);}});
  const m={wood:new THREE.MeshStandardMaterial({map:timber,roughness:.58}),darkWood:new THREE.MeshStandardMaterial({map:dark,roughness:.55}),edge:new THREE.MeshStandardMaterial({color:0x87603c,roughness:.65}),plaster:new THREE.MeshStandardMaterial({map:plaster,roughness:.97}),cream:new THREE.MeshStandardMaterial({map:cream,roughness:.95}),ceiling:new THREE.MeshStandardMaterial({color:0xc0b590,roughness:.92}),iron:new THREE.MeshStandardMaterial({color:0x282b25,metalness:.72,roughness:.62}),brass:new THREE.MeshStandardMaterial({color:0xba9653,metalness:.67,roughness:.42}),gold:new THREE.MeshStandardMaterial({color:0xd0b878,metalness:.3,roughness:.6}),leather:new THREE.MeshStandardMaterial({map:leather,roughness:.54}),greenLeather:new THREE.MeshStandardMaterial({map:greenLeather,roughness:.6}),pages:new THREE.MeshStandardMaterial({map:pages,roughness:.93}),book:new THREE.MeshStandardMaterial({color:0xffffff,roughness:.82}),ceramic:new THREE.MeshStandardMaterial({color:0xb5c0ad,roughness:.33}),terra:new THREE.MeshStandardMaterial({color:0x9d593b,roughness:.91}),leaf:new THREE.MeshStandardMaterial({color:0x596d3e,roughness:.95,side:THREE.DoubleSide}),paper:new THREE.MeshStandardMaterial({color:0xdaceaa,roughness:.93}),black:new THREE.MeshStandardMaterial({color:0x181f1d,roughness:.88}),lamp:new THREE.MeshStandardMaterial({color:0xe8d8a9,emissive:0xffca72,emissiveIntensity:.52,roughness:.72,side:THREE.DoubleSide}),lampGreen:new THREE.MeshStandardMaterial({color:0x244f3e,metalness:.15,roughness:.3}),bulb:new THREE.MeshStandardMaterial({color:0xffecd1,emissive:0xffd29b,emissiveIntensity:3}),rug:new THREE.MeshStandardMaterial({map:rugMap(),roughness:1}),labels:new THREE.MeshStandardMaterial({map:spineAtlas(),transparent:true,alphaTest:.12,roughness:.6,depthWrite:false}),glass:new THREE.MeshStandardMaterial({color:0xd2ddc7,transparent:true,opacity:.055,roughness:.2,metalness:.1,depthWrite:false}),stone:new THREE.MeshStandardMaterial({color:0x9a967a,roughness:.97})};
  m.runner=new THREE.MeshStandardMaterial({map:texture(256,512,(c,w,h)=>{c.fillStyle='#6d4133';c.fillRect(0,0,w,h);for(const x of [13,25,35,220,230,242]){c.fillStyle=x%2?'#c2a372':'#2e433c';c.fillRect(x,0,x%2?3:6,h);}for(let y=0;y<h;y+=3){c.fillStyle='rgba(225,208,168,.07)';c.fillRect(0,y,w,1);}for(let i=0;i<4000;i++){c.fillStyle='rgba(25,23,15,.07)';c.fillRect(rng()*w,rng()*h,1,2);}}),roughness:1});
  m.hill=new THREE.MeshStandardMaterial({color:0xffffff,roughness:1});
  m.contact=new THREE.MeshBasicMaterial({map:texture(128,128,(c,w,h)=>{const g=c.createRadialGradient(w/2,h/2,6,w/2,h/2,w/2);g.addColorStop(0,'rgba(19,13,7,.25)');g.addColorStop(.5,'rgba(19,13,7,.14)');g.addColorStop(1,'rgba(19,13,7,0)');c.fillStyle=g;c.fillRect(0,0,w,h);}),transparent:true,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-1,polygonOffsetUnits:-1});
  for(const key of ['wood','darkWood','plaster','cream','leather','greenLeather']){m[key].bumpMap=m[key].map;m[key].bumpScale=key.includes('leather')||key==='greenLeather'?.006:.011;}
  for(const key of ['wood','darkWood']){const horizontal=m[key].clone();horizontal.map=m[key].map.clone();horizontal.map.center.set(.5,.5);horizontal.map.rotation=Math.PI/2;horizontal.map.needsUpdate=true;horizontal.bumpMap=horizontal.map;m[key+'H']=horizontal;}
  return m;
}

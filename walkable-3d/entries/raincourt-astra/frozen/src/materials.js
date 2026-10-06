import * as THREE from 'three';

let seed=98124;
export function rand(){seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;}
export const between=(a,b)=>a+(b-a)*rand();
function canvas(size=1024){const c=document.createElement('canvas');c.width=c.height=size;return c;}
function tex(c,repeat=1,color=true){const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(repeat,repeat);t.colorSpace=color?THREE.SRGBColorSpace:THREE.NoColorSpace;t.anisotropy=8;return t;}
function grain(ctx,n,alpha,size=1024){for(let i=0;i<n;i++){const q=rand()>.5?255:0;ctx.fillStyle=`rgba(${q},${q},${q},${rand()*alpha})`;ctx.fillRect(rand()*size,rand()*size,1+rand()*3,1+rand()*3);}}
export function makeMaterials(renderer){
 const mats={};
 // Hand-made staggered granite texture with chipped edges, mottled faces and recessed grout.
 const paving=canvas(2048),p=paving.getContext('2d'),rough=canvas(2048),r=rough.getContext('2d'),height=canvas(2048),h=height.getContext('2d');
 p.fillStyle='#252d2e';p.fillRect(0,0,2048,2048);h.fillStyle='#303030';h.fillRect(0,0,2048,2048);r.fillStyle='#e4e4e4';r.fillRect(0,0,2048,2048);
 for(let row=0;row<16;row++)for(let col=-1;col<9;col++){
  const x=col*256+(row%2)*128,y=row*128,v=between(61,90),rw=between(82,150);
  p.fillStyle=`rgb(${v*.91},${v*1.03},${v*1.04})`;p.fillRect(x+4,y+4,248,120);h.fillStyle='#c5c5c5';h.fillRect(x+4,y+4,248,120);h.fillStyle='#ededed';h.fillRect(x+8,y+8,240,112);r.fillStyle=`rgb(${rw},${rw},${rw})`;r.fillRect(x+4,y+4,248,120);
  p.strokeStyle='#b2bbb52c';p.lineWidth=2;p.strokeRect(x+6,y+6,244,116);
  for(let j=0;j<85;j++){const a=rand()*.08;p.fillStyle=`rgba(${rand()>.4?'213,218,203':'0,0,0'},${a})`;p.beginPath();p.ellipse(x+rand()*250,y+rand()*122,3+rand()*23,1+rand()*5,rand()*3,0,Math.PI*2);p.fill();}
  if(rand()>.74){p.strokeStyle='#17202490';p.lineWidth=1+rand();p.beginPath();const cx=x+between(30,215);p.moveTo(cx,y+4);p.lineTo(cx+12,y+36);p.lineTo(cx-9,y+60);p.lineTo(cx+6,y+85);p.stroke();h.strokeStyle='#878787';h.lineWidth=2;h.stroke();}
 }
 grain(p,105000,.15,2048);grain(h,65000,.12,2048);grain(r,40000,.17,2048);
 for(let i=0;i<180;i++){const x=rand()*2048,y=rand()*2048,ra=between(25,200);const g=r.createRadialGradient(x,y,0,x,y,ra);g.addColorStop(0,'rgba(5,5,5,.68)');g.addColorStop(1,'rgba(5,5,5,0)');r.fillStyle=g;r.fillRect(x-ra,y-ra,ra*2,ra*2);const gg=p.createRadialGradient(x,y,0,x,y,ra);gg.addColorStop(0,'rgba(7,17,20,.18)');gg.addColorStop(1,'rgba(7,17,20,0)');p.fillStyle=gg;p.fillRect(x-ra,y-ra,ra*2,ra*2);}
 mats.paving=new THREE.MeshStandardMaterial({map:tex(paving,6),bumpMap:tex(height,6,false),bumpScale:.026,roughnessMap:tex(rough,6,false),roughness:1,metalness:.23,envMapIntensity:.6});
 const wood=canvas(),w=wood.getContext('2d');w.fillStyle='#887056';w.fillRect(0,0,1024,1024);
 for(let i=0;i<2200;i++){const yy=rand()*1024;w.strokeStyle=`rgba(${rand()>.45?'22,13,7':'216,186,126'},${between(.02,.18)})`;w.lineWidth=between(.5,2.8);w.beginPath();w.moveTo(0,yy);w.bezierCurveTo(300,yy+between(-15,15),650,yy+between(-15,15),1024,yy+between(-5,5));w.stroke();}
 for(let y=0;y<1024;y+=128){w.fillStyle='#241c1460';w.fillRect(0,y,1024,4);w.fillStyle='#e0c59b35';w.fillRect(0,y+5,1024,2);for(let x of [20,1004]){w.fillStyle='#292923';w.beginPath();w.arc(x,y+17,3,0,7);w.fill();}}
 grain(w,15000,.14);mats.wood=new THREE.MeshStandardMaterial({map:tex(wood),roughness:.78,bumpMap:tex(wood,1,false),bumpScale:.007,color:'#b7a18b'});mats.darkWood=mats.wood.clone();mats.darkWood.color.set('#58483b');mats.crate=mats.wood.clone();mats.crate.color.set('#c6ab7a');
 const plaster=canvas(),pl=plaster.getContext('2d');pl.fillStyle='#88867c';pl.fillRect(0,0,1024,1024);grain(pl,95000,.14);
 for(let i=0;i<250;i++){const x=rand()*1024,y=rand()*1024,ra=between(5,135);for(let ox of[-1024,0,1024])for(let oy of[-1024,0,1024]){const px=x+ox,py=y+oy;if(px+ra<0||px-ra>1024||py+ra<0||py-ra>1024)continue;const g=pl.createRadialGradient(px,py,0,px,py,ra);g.addColorStop(0,'rgba(19,30,25,.065)');g.addColorStop(1,'rgba(19,30,25,0)');pl.fillStyle=g;pl.fillRect(px-ra,py-ra,ra*2,ra*2);}}
 mats.plaster=new THREE.MeshStandardMaterial({map:tex(plaster,3),bumpMap:tex(plaster,3,false),bumpScale:.035,roughness:.94,color:'#a5aca6'});mats.plasterWarm=mats.plaster.clone();mats.plasterWarm.color.set('#b7a18a');
 const bricks=canvas(),b=bricks.getContext('2d');b.fillStyle='#66675d';b.fillRect(0,0,1024,1024);
 for(let y=0;y<16;y++)for(let x=-1;x<9;x++){const v=between(62,103);b.fillStyle=`rgb(${v},${v*.83},${v*.72})`;b.fillRect(x*128+(y%2)*64+3,y*64+3,122,58);b.fillStyle='#bbb6a620';b.fillRect(x*128+(y%2)*64+5,y*64+4,118,2);}grain(b,35000,.18);
 mats.brick=new THREE.MeshStandardMaterial({map:tex(bricks,2),bumpMap:tex(bricks,2,false),bumpScale:.025,roughness:.88});
 const fabric=canvas(512),f=fabric.getContext('2d');f.fillStyle='#cac9ba';f.fillRect(0,0,512,512);for(let i=0;i<512;i+=2){f.fillStyle=i%4?'#514b3929':'#ffffff20';f.fillRect(i,0,1,512);f.fillRect(0,i,512,1);}grain(f,25000,.2,512);
 for(const [name,color] of Object.entries({rust:'#924b38',olive:'#798265',blue:'#4b6f80',cream:'#c2b087'}))mats[name]=new THREE.MeshStandardMaterial({map:tex(fabric,3),bumpMap:tex(fabric,3,false),bumpScale:.008,color,roughness:.98,side:THREE.DoubleSide});
 const stripe=canvas(512),sc=stripe.getContext('2d');sc.fillStyle='#b8b092';sc.fillRect(0,0,512,512);for(let x=0;x<512;x+=128){sc.fillStyle='#526752';sc.fillRect(x,0,64,512);sc.fillStyle='#253f3544';sc.fillRect(x+3,0,2,512);sc.fillRect(x+61,0,2,512);}sc.globalAlpha=.15;sc.drawImage(fabric,0,0);sc.globalAlpha=1;grain(sc,26000,.14,512);mats.striped=new THREE.MeshStandardMaterial({map:tex(stripe,1),bumpMap:tex(fabric,3,false),bumpScale:.007,roughness:1,side:THREE.DoubleSide});
 const steel=canvas(512),s=steel.getContext('2d');s.fillStyle='#b0b9b7';s.fillRect(0,0,512,512);for(let i=0;i<1600;i++){s.fillStyle=`rgba(255,255,255,${rand()*.16})`;s.fillRect(rand()*512,rand()*512,between(10,180),.5);}grain(s,10000,.1,512);
 mats.steel=new THREE.MeshStandardMaterial({color:'#bcc4c2',map:tex(steel),metalness:.68,roughness:.32,envMapIntensity:1.4,bumpMap:tex(steel,1,false),bumpScale:.002});
 const basic={iron:['#252e2d',.75,.65],black:['#121d1e',.85,.12],bronze:['#8c6740',.35,.7],redPaint:['#792f24',.72,.12],greenPaint:['#345048',.76,.15],ivory:['#d4c9a2',.73,.03],ceramic:['#a9b9b2',.22,.08],terracotta:['#895640',.92,0],leaf:['#3f5b37',.85,0],leafLight:['#657a41',.87,0],orange:['#e5892b',.65,0],yellow:['#ddb14a',.7,0],apple:['#a73527',.3,0],aubergine:['#34293f',.25,0],bun:['#ead8b1',.92,0],meat:['#924b28',.43,.02],moss:['#3e4f36',1,0],paper:['#d1bc8b',.9,0]};
 for(const[n,[c,roughness,metalness]]of Object.entries(basic))mats[n]=new THREE.MeshStandardMaterial({color:c,roughness,metalness});
 const ceramicNoise=canvas(256),cn=ceramicNoise.getContext('2d');cn.fillStyle='#c5c9bb';cn.fillRect(0,0,256,256);grain(cn,21000,.21,256);mats.ceramic.map=tex(ceramicNoise);mats.ceramic.bumpMap=tex(ceramicNoise,1,false);mats.ceramic.bumpScale=.003;
 mats.orange.color.set('#b7611e');mats.orange.bumpMap=tex(ceramicNoise,1,false);mats.orange.bumpScale=.003;mats.orange.roughness=.7;
 const roast=canvas(256),ro=roast.getContext('2d');ro.fillStyle='#b59169';ro.fillRect(0,0,256,256);grain(ro,12000,.25,256);for(let i=0;i<280;i++){ro.fillStyle=rand()>.5?'#28180ea0':'#cdb58277';ro.beginPath();ro.ellipse(rand()*256,rand()*256,between(1,9),between(1,5),rand()*Math.PI,0,Math.PI*2);ro.fill();}mats.meat.map=tex(roast);mats.meat.roughness=.52;
 mats.window=new THREE.MeshStandardMaterial({color:'#203130',roughness:.18,metalness:.4});mats.litWindow=new THREE.MeshStandardMaterial({color:'#ae8c53',emissive:'#bd8234',emissiveIntensity:.55,roughness:.7});
 const paperGlow=canvas(256),pg=paperGlow.getContext('2d');pg.fillStyle='#e6e1d5';pg.fillRect(0,0,256,256);grain(pg,35000,.08,256);for(let i=0;i<80;i++){pg.fillStyle='#756b5920';pg.fillRect(rand()*256,rand()*256,.5,2+rand()*8);}mats.lantern=new THREE.MeshStandardMaterial({map:tex(paperGlow),color:'#f3c279',emissiveMap:tex(paperGlow),emissive:'#ff9d39',emissiveIntensity:1.5,roughness:.95});mats.lanternRed=mats.lantern.clone();mats.lanternRed.color.set('#d97a48');mats.lanternRed.emissive.set('#fd6027');mats.lanternRed.emissiveIntensity=1;
 return mats;
}

export function signTexture({title,subtitle='',small='',bg='#243b3b',ink='#dfd4ae',accent='#9b6744',width=1024,height=384,vertical=false,border=true}){
 const c=document.createElement('canvas');c.width=width;c.height=height;const g=c.getContext('2d');g.fillStyle=bg;g.fillRect(0,0,width,height);grain(g,20000,.13,width);if(border){g.strokeStyle=ink+'65';g.lineWidth=2;g.strokeRect(16,16,width-32,height-32);g.strokeStyle=accent;g.lineWidth=5;g.strokeRect(24,24,width-48,height-48);}
 g.textAlign='center';g.textBaseline='middle';g.fillStyle=ink;g.font=`500 ${vertical?width*.57:height*.38}px "Yu Mincho", "MS Mincho", Georgia, serif`;
 if(vertical){const chars=title.split('');chars.forEach((ch,i)=>g.fillText(ch,width/2,height*(.22+i*.25)));}else{g.fillText(title,width/2,height*.39);g.font=`600 ${height*.086}px Arial`;g.letterSpacing='6px';g.fillText(subtitle,width/2,height*.71);if(small){g.font=`${height*.049}px Arial`;g.fillStyle=ink+'a8';g.fillText(small,width/2,height*.87);}}
 // Fine chips in the paint.
 for(let i=0;i<300;i++){g.fillStyle=rand()>.5?'#0a191425':'#e9dbad17';g.fillRect(rand()*width,rand()*height,1+rand()*9,1+rand()*2);}
 return tex(c);
}

export function environment(renderer){
 const c=document.createElement('canvas');c.width=1024;c.height=512;const g=c.getContext('2d');const grad=g.createLinearGradient(0,0,0,512);grad.addColorStop(0,'#172b4b');grad.addColorStop(.46,'#4a6172');grad.addColorStop(.58,'#1c272b');grad.addColorStop(1,'#141c23');g.fillStyle=grad;g.fillRect(0,0,1024,512);
 for(let i=0;i<20;i++){const x=rand()*1024,w=between(8,40);g.fillStyle=i%4===0?'#c88c44':i%3===0?'#526e74':'#354448';g.fillRect(x,260+rand()*20,w,20+rand()*35);}
 const texture=new THREE.CanvasTexture(c);texture.mapping=THREE.EquirectangularReflectionMapping;texture.colorSpace=THREE.SRGBColorSpace;const pm=new THREE.PMREMGenerator(renderer),env=pm.fromEquirectangular(texture).texture;texture.dispose();pm.dispose();return env;
}

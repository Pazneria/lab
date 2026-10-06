import * as THREE from 'three';

export function randomSource(seed=71593){return()=>{seed=(Math.imul(1664525,seed)+1013904223)>>>0;return seed/4294967296;};}
export const rand=randomSource();
function canvas(size=512){const c=document.createElement('canvas');c.width=c.height=size;return [c,c.getContext('2d')];}
function texture(c,repeat=1){const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(repeat,repeat);t.anisotropy=8;return t;}
function noise(ctx,size,strength=10){const data=ctx.getImageData(0,0,size,size);for(let i=0;i<data.data.length;i+=4){const n=(rand()-.5)*strength;for(let j=0;j<3;j++)data.data[i+j]+=n;}ctx.putImageData(data,0,0);}
function wood(base,dark,planks=false){
  const [c,ctx]=canvas(1024);ctx.fillStyle=base;ctx.fillRect(0,0,1024,1024);
  if(planks){for(let row=0;row<8;row++){ctx.fillStyle=`rgba(${rand()>.5?'255,224,163':'40,20,5'},${.03+rand()*.09})`;ctx.fillRect(0,row*128,1024,127);ctx.fillStyle='#241409';ctx.globalAlpha=.38;ctx.fillRect(0,row*128,1024,2);const offset=Math.floor(rand()*700);ctx.fillRect(offset,row*128,2,128);ctx.globalAlpha=1;for(const x of [offset+9,offset-9])for(const y of [row*128+10,row*128+116]){ctx.fillStyle='#4b301d';ctx.beginPath();ctx.ellipse(x,y,1.3,2,0,0,6.3);ctx.fill();}}}
  for(let i=0;i<1800;i++){const y=rand()*1024;ctx.strokeStyle=rand()>.5?dark:'#c9a670';ctx.globalAlpha=.015+rand()*.065;ctx.lineWidth=.3+rand()*1.5;ctx.beginPath();ctx.moveTo(0,y);for(let x=0;x<=1024;x+=40)ctx.lineTo(x,y+Math.sin(x*.015+i)*(.4+rand()*2));ctx.stroke();}
  ctx.globalAlpha=.12;for(let i=0;i<24;i++){const x=rand()*1024,y=rand()*1024;ctx.strokeStyle=dark;for(let j=1;j<6;j++){ctx.beginPath();ctx.ellipse(x,y,15+j*11,1+j*2,0,0,Math.PI*2);ctx.stroke();}}
  ctx.globalAlpha=1;noise(ctx,1024,8);return texture(c);
}
function plaster(){const[c,ctx]=canvas();ctx.fillStyle='#ded8c4';ctx.fillRect(0,0,512,512);for(let i=0;i<4200;i++){ctx.fillStyle=rand()>.5?'#ece7d4':'#a7a595';ctx.globalAlpha=rand()*.055;ctx.beginPath();ctx.arc(rand()*512,rand()*512,rand()*18,0,6.3);ctx.fill();}ctx.globalAlpha=1;noise(ctx,512,8);return texture(c,2);}
function leather(){const[c,ctx]=canvas();ctx.fillStyle='#5a3425';ctx.fillRect(0,0,512,512);for(let i=0;i<90;i++){const x=rand()*512,y=rand()*512,r=25+rand()*120;const g=ctx.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,'#b1854840');g.addColorStop(1,'#b1854800');ctx.fillStyle=g;ctx.fillRect(x-r,y-r,r*2,r*2);}noise(ctx,512,23);for(let i=0;i<900;i++){ctx.strokeStyle='#25160e';ctx.globalAlpha=rand()*.13;ctx.beginPath();const x=rand()*512,y=rand()*512;ctx.moveTo(x,y);ctx.lineTo(x+rand()*15,y+rand()*2);ctx.stroke();}return texture(c);}
function paper(){const[c,ctx]=canvas();ctx.fillStyle='#cfc4a4';ctx.fillRect(0,0,512,512);for(let i=0;i<256;i++){ctx.fillStyle=i%7===0?'#9c9176':'#e9debe';ctx.globalAlpha=.25+rand()*.3;ctx.fillRect(0,i*2,512,.7);}ctx.globalAlpha=1;noise(ctx,512,8);return texture(c);}
function rug(base='#683f32',colors=['#b39962','#263c37','#927351','#8b5236'],striped=false){const[c,ctx]=canvas(1024);ctx.fillStyle=base;ctx.fillRect(0,0,1024,1024);for(let border=0;border<4;border++){ctx.strokeStyle=colors[border];ctx.lineWidth=border%2?8:30;ctx.strokeRect(35+border*28,35+border*28,954-border*56,954-border*56);}for(let x=150;x<900;x+=100)for(let y=150;y<900;y+=100){ctx.fillStyle=colors[((x+y)/100|0)%4];if(striped){ctx.fillRect(x-31,y-12,62,24);ctx.fillRect(x-12,y-31,24,62);}else{ctx.beginPath();ctx.moveTo(x,y-29);ctx.lineTo(x+21,y);ctx.lineTo(x,y+29);ctx.lineTo(x-21,y);ctx.closePath();ctx.fill();}ctx.fillStyle='#c0a36e';ctx.fillRect(x-3,y-3,6,6);}ctx.globalAlpha=.13;for(let i=0;i<1024;i+=2){ctx.fillStyle=i%4?'#dbcdb0':'#090b09';ctx.fillRect(0,i,1024,.7);ctx.fillRect(i,0,.5,1024);}ctx.globalAlpha=1;noise(ctx,1024,35);return texture(c);}
const bookPalette=['#6a3028','#344e44','#3c4d60','#997647','#675042','#39382c','#7c664b','#6b6b51','#844734','#b09c6c','#3e3232','#58646c'];
export function makeMaterials(){
  const oak=wood('#88613c','#35220f');const walnut=wood('#573b29','#27180e');const floor=wood('#92734d','#45301c',true);const plasterMap=plaster();const leatherMap=leather();
  const mat=(color,roughness=.8,extra={})=>new THREE.MeshStandardMaterial({color,roughness,...extra});
  const m={
    oak:mat('#e3c094',.7,{map:oak,bumpMap:oak,bumpScale:.018}),
    walnut:mat('#dcc2a0',.72,{map:walnut,bumpMap:walnut,bumpScale:.012}),
    floor:mat('#debe91',.78,{map:floor,bumpMap:floor,bumpScale:.016}),
    plaster:mat('#f3ecd5',.94,{map:plasterMap,bumpMap:plasterMap,bumpScale:.022}),
    sage:mat('#75867a',.92,{map:plasterMap,bumpMap:plasterMap,bumpScale:.015}),
    plasterDark:mat('#a5afa0',.95,{map:plasterMap}),
    iron:mat('#282b27',.68,{metalness:.55}),
    brass:mat('#b69451',.4,{metalness:.65}),
    leather:mat('#e1ba90',.87,{map:leatherMap,bumpMap:leatherMap,bumpScale:.011}),
    leatherGreen:mat('#6e8361',.9,{map:leatherMap,bumpMap:leatherMap,bumpScale:.012}),
    paper:mat('#fff2d3',.96,{map:paper(),bumpMap:paper(),bumpScale:.003}),
    rug:mat('#b9a788',.98,{map:rug(),bumpScale:.005}),
    rugAlcove:mat('#c1bea6',.98,{map:rug('#40564c',['#afa177','#7d563b','#8b9376','#c2bc97'],true)}),
    linen:mat('#c5bda3',.96),
    ceramic:mat('#687f77',.34),
    ceramicCream:mat('#d1c5a1',.4),
    soil:mat('#30271a'),
    leaf:mat('#546647',.85,{side:THREE.DoubleSide}),
    glass:new THREE.MeshPhysicalMaterial({color:'#d3e7df',transparent:true,opacity:.1,roughness:.14,metalness:.05,depthWrite:false,side:THREE.DoubleSide}),
    glow:mat('#fff1c4',.8,{emissive:'#ffc471',emissiveIntensity:1.2}),
    lampShade:mat('#d7c6a0',.9,{emissive:'#ba8445',emissiveIntensity:.35,side:THREE.DoubleSide}),
    stone:mat('#b4ad91',.93,{map:plasterMap,bumpMap:plasterMap,bumpScale:.04}),
    pageGold:mat('#b99b5a',.65,{metalness:.15}),
    black:mat('#242822'),
    red:mat('#893b2a'),
  };
  for(const name of ['oak','walnut']){const vertical=m[name].clone();vertical.map=m[name].map.clone();vertical.map.center.set(.5,.5);vertical.map.rotation=Math.PI/2;vertical.map.repeat.set(1,2);vertical.bumpMap=vertical.map;m[name+'Vertical']=vertical;}
  const[fabricCanvas,fabricCtx]=canvas(256);fabricCtx.fillStyle='#cfc4a6';fabricCtx.fillRect(0,0,256,256);fabricCtx.globalAlpha=.16;for(let i=0;i<256;i+=2){fabricCtx.fillStyle=i%4?'#706b58':'#fbf2d4';fabricCtx.fillRect(i,0,1,256);fabricCtx.fillRect(0,i,256,1);}fabricCtx.globalAlpha=1;noise(fabricCtx,256,8);const fabricMap=texture(fabricCanvas);m.curtain=mat('#e7d9b6',.98,{map:fabricMap,bumpMap:fabricMap,bumpScale:.006,side:THREE.DoubleSide});
  const[aoCanvas,aoCtx]=canvas(128);const ao=aoCtx.createRadialGradient(64,64,10,64,64,64);ao.addColorStop(0,'rgba(20,16,9,.25)');ao.addColorStop(.6,'rgba(20,16,9,.12)');ao.addColorStop(1,'rgba(20,16,9,0)');aoCtx.fillStyle=ao;aoCtx.fillRect(0,0,128,128);m.contact=new THREE.MeshBasicMaterial({map:texture(aoCanvas),transparent:true,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-1,polygonOffsetUnits:-1,side:THREE.DoubleSide});
  const[c,ctx]=canvas(1024);const titles=['FIELD NOTES','THE ATLAS','BOTANICA','LETTERS','ESSAYS','THE OLD ROAD','TRAVELS','POEMS','A NATURAL HISTORY','VOL. II','THE HILLS','COLLECTED WORKS','ARCHIVE','STUDIES','ASTRONOMY','MEMOIRS'];
  for(let i=0;i<64;i++){
    const x=(i%8)*128,y=Math.floor(i/8)*128;const color=bookPalette[i%bookPalette.length];ctx.fillStyle=color;ctx.fillRect(x,y,128,128);
    const g=ctx.createLinearGradient(x,y,x+128,y);g.addColorStop(0,'#0007');g.addColorStop(.15,'#ffffff0d');g.addColorStop(.6,'#ffffff00');g.addColorStop(1,'#0005');ctx.fillStyle=g;ctx.fillRect(x,y,128,128);
    ctx.strokeStyle=i%3?'#c4a667':'#c5b99b';ctx.globalAlpha=.55;ctx.lineWidth=1.5;
    for(const v of [13,18,104,110]){ctx.beginPath();ctx.moveTo(x+8,y+v);ctx.lineTo(x+120,y+v);ctx.stroke();}
    if(i%4===0){ctx.strokeRect(x+14,y+26,100,71);}
    ctx.fillStyle=i%3?'#d7c293':'#cecfbb';ctx.globalAlpha=.7;ctx.textAlign='center';ctx.font='9px Georgia';
    if(i%4){ctx.save();ctx.translate(x+64,y+62);ctx.rotate(-Math.PI/2);ctx.font='10px Georgia';ctx.fillText(titles[i%titles.length],0,3,69);ctx.restore();}
    else{ctx.fillText(titles[i%titles.length],x+64,y+49,98);ctx.font='8px Georgia';ctx.fillText(String(1807+i*2),x+64,y+76,70);}
    if(i%7===0){ctx.fillStyle='#d7c7a1';ctx.globalAlpha=.7;ctx.fillRect(x+28,y+80,72,14);ctx.fillStyle='#423b2b';ctx.font='8px monospace';ctx.fillText('A '+(104+i),x+64,y+90);}
    ctx.globalAlpha=.07;ctx.fillStyle='#e8d5ab';for(let j=0;j<38;j++){ctx.fillRect(x+rand()*128,y+rand()*128,rand()*15,rand()*2+.5);}ctx.globalAlpha=1;
  }
  noise(ctx,1024,9);const spineTex=texture(c);spineTex.wrapS=spineTex.wrapT=THREE.ClampToEdgeWrapping;spineTex.anisotropy=8;
  m.bookSpine=mat('#fff',.83,{map:spineTex});m.bookCover=mat('#fff',.86,{vertexColors:true});
  return m;
}
export {bookPalette};

import * as T from './vendor/three.module.min.js';
import {TAU,PI,randomSeed} from './geometry.js';

export const C={ink:'#243d3d', deep:'#123f43', teal:'#277977', mint:'#94b6a7', jade:'#537f75', sea:'#75a69e', pine:'#355951', dark:'#453328', wood:'#a17548', oak:'#bb8b58', walnut:'#745039', trim:'#b98b54', gilt:'#d5ad6b', brass:'#c69a58', bronze:'#876a43', pearl:'#ede1c4', chalk:'#f5e9cf', flax:'#cfb992', coral:'#b95542', rust:'#914637', slate:'#456477', blue:'#337080', wine:'#783e49', navy:'#233e4c', plaster:'#d7d6bd'};
function canvas(w,h=w){const a=document.createElement('canvas');a.width=w;a.height=h;return a;}
function texture(c,repeat=[1,1],wrap=true){
  const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;
  if(wrap)t.wrapS=t.wrapT=T.RepeatWrapping;
  t.repeat.set(...repeat);t.anisotropy=4;return t;
}
function line(ctx,pts,color,width=1){
  ctx.beginPath();pts.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.strokeStyle=color;ctx.lineWidth=width;ctx.stroke();
}
function ellipse(ctx,x,y,rx,ry,fill,stroke,lw=1) {
  ctx.beginPath();ctx.ellipse(x,y,rx,ry,0,0,TAU);if(fill){ctx.fillStyle=fill;ctx.fill();}if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=lw;ctx.stroke();}
}
// Engraved scallop repeated on the fittings, woven silk and workshop stationery.
export function shellMark(ctx,x,y,s,color) {
  ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.strokeStyle=color;ctx.lineWidth=1.7;
  ctx.beginPath();ctx.moveTo(-2,16);
  ctx.bezierCurveTo(-16,13,-32,-1,-27,-10);ctx.quadraticCurveTo(-23,-15,-19,-12);
  ctx.quadraticCurveTo(-20,-24,-10,-20);ctx.quadraticCurveTo(-6,-30,0,-23);
  ctx.quadraticCurveTo(8,-29,12,-18);ctx.quadraticCurveTo(22,-21,21,-12);
  ctx.quadraticCurveTo(31,-13,29,-4);ctx.bezierCurveTo(26,6,14,12,2,16);ctx.stroke();
  for(const [xx,yy] of [[-24,-8],[-18,-12],[-10,-19],[0,-23],[11,-18],[19,-11],[26,-5]])line(ctx,[[0,16],[xx*.57,3+(yy-3)*.36],[xx,yy]],color,1.2);
  ellipse(ctx,0,18,4,2,color);ctx.restore();
}
function makeWood(){
  const c=canvas(512),x=c.getContext('2d'),rng=randomSeed(331);
  x.fillStyle='#d5c6ad';x.fillRect(0,0,512,512);
  for(let i=0;i<1000;i++){
    const y=rng()*512,amp=1+rng()*2,phase=rng()*TAU;
    x.beginPath();for(let xx=0;xx<=512;xx+=8){const yy=y+Math.sin(xx*TAU/512+phase)*amp+Math.sin(xx*TAU/128+phase)*amp*.32;if(xx)x.lineTo(xx,yy);else x.moveTo(xx,yy);}
    x.strokeStyle=rng()>.4?'rgba(61,42,29,'+(.025+rng()*.13)+')':'rgba(255,248,219,.22)';x.lineWidth=.5+rng()*1.8;x.stroke();
  }
  for(let j=0;j<12;j++){const cx=rng()*512,cy=rng()*512;
    for(let i=0;i<4;i++)ellipse(x,cx,cy,4+i*5,1+i*1.35,null,'rgba(88,52,33,.16)',.9);
  }
  return texture(c,[.58,1.1]);
}
function fabric(kind){
  const c=canvas(256),x=c.getContext('2d'),rng=randomSeed(8192);
  x.fillStyle=kind==='shoal'?'#164e53':kind==='damask'?'#bfc2ad':'#e5e1da';x.fillRect(0,0,256,256);
  if(kind==='stripe'){
    for(let i=0;i<256;i+=64){
      x.fillStyle='#919891';x.fillRect(i+5,0,9,256);x.fillStyle='#858c89';x.fillRect(i+19,0,2,256);x.fillStyle='#fff4d3';x.fillRect(i+23,0,5,256);
    }
  }
  if(kind==='wool'){
    for(let j=-2;j<35;j++)for(let i=0;i<16;i++){
      const s=i%2?1:-1,xx=i*16,yy=j*8;
      line(x,[[xx,yy-s*4],[xx+16,yy+s*4]],j%2?'#bdc0b1':'#abb2aa',2.9);
      line(x,[[xx,yy-s*4+2],[xx+16,yy+s*4+2]],'#eeeee0',1.1);
    }
  }
  if(kind==='moire'){
    for(let row=-6;row<76;row++){
      const pts=[];
      for(let xx=0;xx<=256;xx+=3){
        const y=row*4,phase=Math.sin(xx*TAU/256)*.8+Math.sin(y*TAU/256)*1.5;
        pts.push([xx,y+Math.sin(xx*TAU/256+phase)*10+Math.sin(xx*TAU/128+y*TAU/256)*2.6]);
      }
      line(x,pts,row%3?'rgba(115,125,114,.34)':'rgba(250,244,208,.80)',row%3?1.4:2.0);
    }
  }
  if(kind==='shoal'||kind==='damask'){
    const gold=kind==='shoal'?'#bc9e67':'#eff1d7',mid=kind==='shoal'?'#377778':'#9ea797';
    for(let row=-1;row<4;row++)for(let col=-1;col<4;col++){
      const cx=col*128+(row%2)*64,cy=row*128;
      shellMark(x,cx,cy,.92,gold);
      for(const side of [-1,1]){
        x.beginPath();x.moveTo(cx,cy+52);x.bezierCurveTo(cx+side*16,cy+30,cx+side*62,cy+18,cx+side*57,cy-9);x.bezierCurveTo(cx+side*52,cy-23,cx+side*36,cy-10,cx+side*46,cy-3);x.strokeStyle=mid;x.lineWidth=2.8;x.stroke();
        for(let n=0;n<4;n++)ellipse(x,cx+side*(10+n*9),cy+39-n*6,3,1.65,gold);
      }
      ellipse(x,cx,cy-43,3.5,5,null,gold,1.2);
    }
  }
  for(let i=0;i<256;i+=2){x.fillStyle=i%4===0?'rgba(255,252,231,.095)':'rgba(35,35,30,.07)';x.fillRect(i,0,1,256);x.fillStyle='rgba(35,32,30,.075)';x.fillRect(0,i,256,1);}
  for(let i=0;i<3900;i++){const px=rng()*256,py=rng()*256;x.fillStyle=rng()>.5?'rgba(255,251,234,.12)':'rgba(38,29,28,.075)';x.fillRect(px,py,rng()*3+.5,.7);}
  return texture(c,kind==='shoal'?[1.4,1.4]:kind==='damask'?[1.25,1.25]:kind==='stripe'?[1.5,1.5]:kind==='wool'?[2.1,2.1]:kind==='moire'?[1.15,1.6]:[3.6,3.6]);
}
function mineral(){
  const c=canvas(256),x=c.getContext('2d'),rng=randomSeed(636);
  x.fillStyle='#f0ede5';x.fillRect(0,0,256,256);
  for(let i=0;i<10000;i++){x.fillStyle='rgba(91,78,56,'+(rng()*.06)+')';x.fillRect(rng()*256,rng()*256,rng()*3+.5,1);}
  return texture(c,[.8,.8]);
}
function glazing(mirror){
  const c=canvas(256,512),x=c.getContext('2d'),rng=randomSeed(6563),g=x.createLinearGradient(0,0,166,512);
  const bands=mirror?[[0,'#829a98'],[.29,'#bdc9bc'],[.45,'#9bb3ad'],[.64,'#5a7975'],[.72,'#748a7c'],[1,'#9c9380']]:[[0,'#9cc8dc'],[.3,'#c5e1e6'],[.65,'#e4eedf'],[1,'#bcd6d2']];
  for(const [n,c] of bands)g.addColorStop(n,c);x.fillStyle=g;x.fillRect(0,0,256,512);
  if(mirror){
    x.save();x.filter='blur(7px)';x.fillStyle='rgba(227,241,226,.42)';x.transform(1,0,-.32,1,0,0);
    for(const xx of [60,92,133,230])x.fillRect(xx,10,24,290);x.restore();
  } else {
    for(let k=0;k<3;k++){x.beginPath();x.moveTo(0,512);
      for(let xx=0;xx<=272;xx+=8)x.lineTo(xx,402+k*17+Math.sin(xx*.023+k)*8+Math.cos(xx*.04+k)*5);
      x.lineTo(256,512);x.fillStyle=['#accbd0','#afc9ca','#a0bfc2'][k];x.fill();
    }
  }
  for(let i=0;i<9000;i++){x.fillStyle=rng()>.5?'rgba(255,255,239,.08)':'rgba(88,99,89,.035)';x.fillRect(rng()*256,rng()*512,1,2);}
  return texture(c,[1,1],false);
}
export function makeMaterials(cpu=false){
  const standard=(opts={})=>new T.MeshStandardMaterial({roughness:.8,vertexColors:true,...opts});
  const wood=cpu?null:makeWood(), plain=cpu?null:fabric('plain'), plaster=cpu?null:mineral();
  const materials={
    wood:standard({map:wood,roughness:.48}), paint:standard({roughness:.62}),
    wall:standard({map:plaster}),stone:standard({map:plaster,roughness:.84}),
    brass:standard({metalness:.61,roughness:.32}),steel:standard({metalness:.73,roughness:.26}),
    cloth:standard({map:plain,side:T.DoubleSide,roughness:.9}),
    silk:standard({map:plain,side:T.DoubleSide,roughness:.38,metalness:.085}),
    wool:standard({map:cpu?null:fabric('wool'),side:T.DoubleSide,roughness:.98}),
    moire:new T.MeshPhysicalMaterial({map:cpu?null:fabric('moire'),vertexColors:true,side:T.DoubleSide,roughness:.36,sheen:.68,sheenColor:'#e1b69c',sheenRoughness:.52}),
    nacre:new T.MeshPhysicalMaterial({map:plain,vertexColors:true,side:T.DoubleSide,roughness:.37,metalness:.11,sheen:.52,sheenColor:'#aaceb6',sheenRoughness:.42,iridescence:.16,iridescenceThicknessRange:[120,235]}),
    damask:standard({map:cpu?null:fabric('damask'),side:T.DoubleSide,roughness:.49}),
    stripe:standard({map:cpu?null:fabric('stripe'),side:T.DoubleSide}),
    shoal:standard({map:cpu?null:fabric('shoal'),side:T.DoubleSide,roughness:.46,metalness:.09}),
    paper:standard({map:plaster,side:T.DoubleSide,roughness:.96}),
    glass:standard({map:cpu?null:glazing(false),emissive:'#a1c5ca',emissiveIntensity:.32,side:T.DoubleSide}),
    mirror:standard({map:cpu?null:glazing(true),metalness:.22,roughness:.32}),
    glow:new T.MeshBasicMaterial({vertexColors:true,side:T.DoubleSide}),
    print:standard({side:T.DoubleSide,roughness:.82}),
    shade:new T.MeshBasicMaterial({vertexColors:true,transparent:true,depthWrite:false,side:T.DoubleSide}),
  };
  if(!cpu){
    const a=canvas(128),x=a.getContext('2d'),g=x.createRadialGradient(64,64,3,64,64,63);
    g.addColorStop(0,'rgba(31,26,20,.49)');g.addColorStop(.48,'rgba(34,28,21,.29)');g.addColorStop(1,'rgba(34,28,21,0)');x.fillStyle=g;x.fillRect(0,0,128,128);
    materials.shade.map=texture(a,[1,1],false);
  }
  return materials;
}
export function environment(){
  const c=canvas(256,128),x=c.getContext('2d'),g=x.createLinearGradient(0,0,0,128);
  for(const [s,h] of [[0,'#6e797d'],[.33,'#cad8cf'],[.52,'#a9a89c'],[.63,'#756958'],[1,'#7a6552']])g.addColorStop(s,h);
  x.fillStyle=g;x.fillRect(0,0,256,128);x.fillStyle='#f2fffa';for(const i of [14,26,38,178,190])x.fillRect(i,34,8,26);x.fillStyle='#ffda98';x.fillRect(110,42,15,8);
  const t=texture(c,[1,1],false);t.mapping=T.EquirectangularReflectionMapping;return t;
}
export class PrintShop {
  constructor(material,cpu=false){
    this.cpu=cpu;this.x=2;this.y=2;this.row=0;this.cache=new Map();
    if(!cpu){this.c=canvas(2048);this.ctx=this.c.getContext('2d');material.map=texture(this.c,[1,1],false);material.map.anisotropy=4;this.tex=material.map;}
  }
  panel(key,w,h,draw){
    if(this.cache.has(key))return this.cache.get(key);
    if(this.x+w+4>2048){this.x=2;this.y+=this.row+5;this.row=0;}
    if(this.y+h+2>2048)throw Error('Print atlas full '+key);
    if(!this.cpu){const x=this.ctx;x.save();x.translate(this.x,this.y);x.beginPath();x.rect(0,0,w,h);x.clip();draw(x,w,h);x.restore();this.tex.needsUpdate=true;}
    const a=[(this.x+1)/2048,1-(this.y+h-1)/2048,(this.x+w-1)/2048,1-(this.y+1)/2048];
    this.x+=w+5;this.row=Math.max(h,this.row);this.cache.set(key,a);return a;
  }
  label(title,small='',dark=false){
    return this.panel(title+small,384,88,(x,w,h)=>{
      x.fillStyle=dark?'#214d4b':'#dfceb0';x.fillRect(0,0,w,h);
      x.strokeStyle=dark?'#caa767':'#89785b';x.lineWidth=1.7;x.strokeRect(5,5,w-10,h-10);
      x.fillStyle=dark?'#f1e3bc':'#323e38';x.textAlign='center';x.font=(small?'28':'32')+'px Georgia,serif';x.fillText(title,w/2,small?39:54,w-27);
      if(small){x.font='12px Georgia,serif';x.fillText(small,w/2,64,w-30);}
    });
  }
  drawing(kind){
    return this.panel('art'+kind,360,465,(x,w,h)=>{
      const dark=kind==='crest',bg=dark?'#1d5052':'#e3d3b3',ink=dark?'#d3b579':'#485e56',accent=dark?'#bba878':'#a9513c';
      x.fillStyle=bg;x.fillRect(0,0,w,h);x.strokeStyle=ink;x.lineWidth=1.3;x.strokeRect(11,11,w-22,h-22);x.strokeRect(17,17,w-34,h-34);
      const rng=randomSeed(366);for(let i=0;i<1500;i++){x.fillStyle='rgba(63,56,38,.052)';x.fillRect(rng()*w,rng()*h,2,1);}
      x.textAlign='center';x.fillStyle=ink;x.font='14px Georgia';x.fillText('M A I S O N   D E S   M A R É E S',180,48);
      if(dark){
        for(let r=55;r<=138;r+=20){x.beginPath();x.arc(180,220,r,0,TAU);x.strokeStyle=ink;x.lineWidth=r===135?2:.7;x.stroke();}
        for(let j=0;j<72;j++){let a=j*TAU/72;line(x,[[180+Math.cos(a)*121,220+Math.sin(a)*121],[180+Math.cos(a)*(j%6?125:134),220+Math.sin(a)*(j%6?125:134)]],ink,1);}
        shellMark(x,180,218,2.95,ink);
        line(x,[[146,115],[139,94],[160,104],[180,78],[199,104],[222,94],[214,115],[146,115]],ink,2.2);
      } else {
        for(let j=35;j<345;j+=18)line(x,[[j,78],[j,357]],'rgba(66,81,68,.10)');
        for(let j=86;j<350;j+=18)line(x,[[28,j],[331,j]],'rgba(66,81,68,.10)');
        if(kind==='mantle'){
          const outline=[[140,95],[135,119],[111,132],[92,165],[107,182],[133,167],[145,211],[132,240],[86,323],[72,341],[124,351],[177,357],[235,351],[290,329],[254,291],[218,235],[201,207],[213,160],[242,178],[253,157],[223,132],[200,124],[192,97]];
          line(x,outline,ink,2.5);line(x,[[141,96],[166,116],[192,97]],ink,2);
          for(let j=0;j<10;j++){let t=j/9;line(x,[[141+t*58,227],[127+t*91,259],[83+t*201,338+Math.sin(t*PI)*14]],j%3?ink:accent,1.2);}
          line(x,[[167,120],[160,174],[166,225],[180,352]],accent,1.7);
          for(let j=0;j<7;j++)ellipse(x,167-j*.6,139+j*10,1.6,1.6,ink);
          line(x,[[237,145],[277,117],[312,117]],accent,1);line(x,[[110,299],[69,275],[36,275]],accent,1);
        } else {
          for(let i=0;i<5;i++){const cx=56+(i%3)*94,cy=111+Math.floor(i/3)*115;
            x.beginPath();x.moveTo(cx,cy);x.bezierCurveTo(cx+61,cy-23,cx+32,cy+45,cx+55,cy+71);x.lineTo(cx+4,cy+89);x.quadraticCurveTo(cx+12,cy+47,cx,cy);x.closePath();x.strokeStyle=ink;x.lineWidth=1.7;x.stroke();
            line(x,[[cx+13,cy+5],[cx+22,cy+72]],accent,1);x.font='italic 14px Georgia';x.fillStyle=ink;x.fillText('ABCDE'[i],cx+24,cy+44);}
        }
      }
      x.fillStyle=ink;x.font='italic 24px Georgia';x.fillText(dark?'Le Cabinet des Marées':kind==='mantle'?'Le Manteau de Sonde':'Étude des découpes',180,392);
      x.font='12px Georgia';x.fillText(dark?'TAILLEURS DE LA COURONNE':'ATELIER ROYAL   ·   PLANCHE '+(kind==='mantle'?'IV':'VII'),180,421);
    });
  }
}


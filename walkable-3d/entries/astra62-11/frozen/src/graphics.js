import {T,part,defineGraphic,PI,TAU} from './fabrication.js';

const pages=[], art=new Map(), dim=2048;
export const ink='#22393a', paper='#e5e5d8', rust='#c45b38', pale='#aab9ad', dark='#162728';
const sans='"Bahnschrift","Segoe UI",Arial,sans-serif', mono='"Consolas","Lucida Console",monospace';
export function txt(c,t,x,y,size,col=ink,weight=500,family=sans,align='left'){
  c.fillStyle=col;c.font=weight+' '+size+'px '+family;c.textAlign=align;c.textBaseline='alphabetic';c.fillText(t,x,y);c.textAlign='left';
}
export function monoTxt(c,t,x,y,size,col=ink,align='left'){txt(c,t,x,y,size,col,500,mono,align);}
export function rect(c,x,y,w,h,color){c.fillStyle=color;c.fillRect(x,y,w,h);}
export function line(c,x,y,X,Y,color,width=1){c.strokeStyle=color;c.lineWidth=width;c.beginPath();c.moveTo(x,y);c.lineTo(X,Y);c.stroke();}
export function circle(c,x,y,r,color,fill=false,w=1){c.beginPath();c.arc(x,y,r,0,TAU);if(fill){c.fillStyle=color;c.fill();}else{c.strokeStyle=color;c.lineWidth=w;c.stroke();}}
export function logo(c,x,y,size,color){
  c.save();c.translate(x,y);c.scale(size/60,size/60);c.fillStyle=color;
  for(let i=0;i<3;i++){
    c.beginPath();c.moveTo(0,i*17+14);c.lineTo(44,i*17);c.lineTo(59,i*17+5);c.lineTo(15,i*17+19);c.closePath();c.fill();
  }c.restore();
}
function getArt(id,w,h,draw,lit){
  if(art.has(id))return art.get(id);
  let p=pages.filter(v=>v.lit===lit).at(-1);
  function page(){
    const canvas=document.createElement('canvas');canvas.width=canvas.height=dim;
    const texture=new T.CanvasTexture(canvas);texture.colorSpace=T.SRGBColorSpace;texture.anisotropy=8;
    const key='graphic'+pages.length;defineGraphic(key,texture,lit);
    const v={c:canvas.getContext('2d'),texture,cx:3,cy:3,row:0,key,lit};pages.push(v);return v;
  }
  if(!p)p=page();
  if(p.cx+w+3>dim){p.cx=3;p.cy+=p.row+5;p.row=0;}
  if(p.cy+h+3>dim)p=page();
  const x=p.cx,y=p.cy,c=p.c;c.save();c.beginPath();c.rect(x,y,w,h);c.clip();c.translate(x,y);draw(c,w,h);c.restore();
  p.cx+=w+5;p.row=Math.max(p.row,h);p.texture.needsUpdate=true;
  p.texture.userData.usedW=Math.max(p.texture.userData.usedW||0,x+w+3);
  p.texture.userData.usedH=Math.max(p.texture.userData.usedH||0,y+h+3);
  const entry={key:p.key,u:x/dim,v:1-(y+h)/dim,du:w/dim,dv:h/dim};art.set(id,entry);return entry;
}
export function graphic(g,x,y,z,w,h,id,pw,ph,draw,lit=false){
  const a=getArt(id,pw,ph,draw,lit),geom=new T.PlaneGeometry(w,h),u=geom.attributes.uv;
  for(let i=0;i<u.count;i++)u.setXY(i,a.u+u.getX(i)*a.du,a.v+u.getY(i)*a.dv);
  return part(g,geom,x,y,z,'#ffffff',a.key);
}
export function textLabel(g,x,y,z,w,h,str,opt={}){
  const col=opt.color||ink,bg=opt.bg||'',type=opt.mono?'mono':'sans',al=opt.align||'center',weight=opt.weight||600;
  const ph=opt.ph||70,pw=Math.min(1490,Math.max(50,Math.round(ph*w/h)));
  const key=['type',str,col,bg,type,pw,ph,al,weight].join('/');
  return graphic(g,x,y,z,w,h,key,pw,ph,(c,W,H)=>{
    if(bg)rect(c,0,0,W,H,bg);
    const f=opt.mono?mono:sans;const fsize=H*(opt.size||.69);
    c.font=weight+' '+fsize+'px '+f;
    const fit=Math.min(1,(W-4)/c.measureText(str).width);
    txt(c,str,al==='left'?1:al==='right'?W-1:W/2,H*.51+fsize*fit*.34,fsize*fit,col,weight,f,al);
  });
}
export function tag(g,x,y,z,w,h,code,name,sub,invert=false){
  return graphic(g,x,y,z,w,h,'tag/'+[code,name,sub,invert].join('/'),512,Math.max(84,Math.round(512*h/w)),(c,W,H)=>{
    const bg=invert?ink:'#e1e1d1',fg=invert?'#e9ecdd':ink;
    rect(c,0,0,W,H,bg);rect(c,0,0,8,H,invert?'#e28b56':rust);
    monoTxt(c,code,22,H*.23,H*.14,invert?'#b7c8bc':'#52625e');
    txt(c,name,20,H*.59,H*.32,fg,600);
    line(c,21,H*.72,W-18,H*.72,invert?'#667b73':'#99a69b',1);
    monoTxt(c,sub,21,H*.9,H*.12,fg);
  });
}
export function stationSign(g,x,y,z,num,name,sub,w=4.3){
  return graphic(g,x,y,z,w,.49,'stationsign/'+num,1100,126,(c,W,H)=>{
    rect(c,0,0,140,H,ink);txt(c,num,68,92,84,'#e4e9d8',500,sans,'center');
    txt(c,name,166,66,58,ink,600);
    monoTxt(c,sub,171,102,19,'#53695f');
    rect(c,W-37,21,24,8,rust);rect(c,W-37,35,24,8,rust);
  });
}
export function compliance(g,x,y,z,w=.3,h=.12,id='A/012'){
  return graphic(g,x,y,z,w,h,'serial'+id,320,120,(c,W,H)=>{
    rect(c,0,0,W,H,'#c1c4b8');rect(c,10,10,W-20,24,ink);monoTxt(c,'FIELDWORK   |   EQUIPMENT',16,27,15,'#e3e4d7');
    monoTxt(c,'S/N  24-'+id,12,60,18);monoTxt(c,'24 V DC   /   CLASS I',12,82,13);
    for(let i=0;i<46;i++)rect(c,12+i*3.45,92,1+(i*7%3),18,ink);
    txt(c,'CE',286,103,24,ink,600,sans,'center');
  });
}
export function floorLabel(g,x,z,w,h,str,rot=0){
  const o=textLabel(g,x,.009,z,w,h,str,{color:'#c6c7b5',mono:true});
  o.rotation.order='YXZ';o.rotation.y=rot;o.rotation.x=-PI/2;return o;
}
export function floorBadge(g,x,z,num,rot=0){
  const o=graphic(g,x,.010,z,.62,.62,'floor'+num,160,160,(c,W,H)=>{
    c.strokeStyle='#c1c1ad';c.lineWidth=3;c.strokeRect(8,8,W-16,H-16);
    txt(c,num,W*.5,100,62,'#c1c1ad',550,sans,'center');
    rect(c,22,124,116,4,'#bf7551');
  });o.rotation.order='YXZ';o.rotation.y=rot;o.rotation.x=-PI/2;
}
export function calibrationScreen(g,x,y,z,w,h){
  return graphic(g,x,y,z,w,h,'imager-cal',960,560,(c,W,H)=>{
    rect(c,0,0,W,H,'#d8e0ce');rect(c,0,0,W,56,'#213c39');
    logo(c,18,12,35,'#d7dfcc');monoTxt(c,'SIGHTLINE   /   CALIBRATION PLATE',72,37,23,'#e2e7d9');
    monoTxt(c,'LIVE  02',W-19,36,19,'#c3daba','right');
    const ox=25,oy=76,sw=596,sh=386;
    rect(c,ox,oy,sw,sh,'#b9c6b7');
    for(let i=0;i<=sw;i+=24)line(c,ox+i,oy,ox+i,oy+sh,'#a6b6a9');
    for(let i=0;i<=sh;i+=24)line(c,ox,oy+i,ox+sw,oy+i,'#a6b6a9');
    const cx=325,cy=267;
    circle(c,cx,cy,159,'#435b55',false,2);circle(c,cx,cy,149,'#d7dece',true);
    for(let i=0;i<48;i++){
      const a=TAU*i/48;c.beginPath();c.moveTo(cx,cy);c.arc(cx,cy,145,a,a+TAU/96);c.closePath();
      c.fillStyle=i%12<9?'#253831':'#b85e3f';c.fill();
    }
    circle(c,cx,cy,25,'#c5d0bf',true);circle(c,cx,cy,16,'#2a403c',false,2);
    line(c,cx-21,cy,cx+21,cy,ink,2);line(c,cx,cy-21,cx,cy+21,ink,2);
    for(const [xx,yy] of [[46,102],[550,102],[46,394],[550,394]]){
      rect(c,xx,yy,48,48,'#263d36');rect(c,xx+7,yy+7,34,34,'#cfdbc9');
      for(let j=0;j<4;j++)for(let k=0;k<4;k++)if((j*7+k*3+xx+yy)%5<2)rect(c,xx+10+j*7,yy+10+k*7,7,7,'#263d36');
    }
    const xx=648;monoTxt(c,'SPATIAL RESPONSE',xx,102,21);line(c,xx,116,936,116,'#678077',2);
    for(let i=0;i<4;i++){
      monoTxt(c,['0.5','1.0','2.0','4.0'][i],xx,147+i*39,16);
      const period=16-i*3;
      for(let j=0;j<236;j+=period)rect(c,xx+46+j,130+i*39,period*.5,23,ink);
    }
    monoTxt(c,'CHROMA  /  D65',xx,320,18);
    ['#ae664c','#c7985c','#d7cd88','#779e80','#719fa6','#697986'].forEach((color,i)=>rect(c,xx+i*47,335,44,43,color));
    monoTxt(c,'LUMINANCE RAMP',xx,407,18);
    for(let i=0;i<10;i++){const b=36+i*19;rect(c,xx+i*28.3,420,29,37,'rgb('+b+','+(b+5)+','+b+')');}
    line(c,26,487,935,487,'#61786e',2);monoTxt(c,'PLATE 7C',26,530,23);monoTxt(c,'2048 × 1536    12 BIT     f/8.0',W-24,526,19,ink,'right');
  },true);
}
export function motionScreen(g,x,y,z,w,h){
  return graphic(g,x,y,z,w,h,'motion-control',704,432,(c,W,H)=>{
    rect(c,0,0,W,H,'#142b2c');rect(c,0,0,W,50,'#cbd6c5');
    monoTxt(c,'KINEMATIC TEST  /  AX-3',19,33,24,ink);
    monoTxt(c,'HOLD',W-20,33,20,'#834e35','right');
    const X=40,Y=84,ww=400,hh=258;
    for(let j=0;j<9;j++)line(c,X+j*ww/8,Y,X+j*ww/8,Y+hh,'#39504d');
    for(let j=0;j<7;j++)line(c,X,Y+j*hh/6,X+ww,Y+j*hh/6,'#39504d');
    c.lineWidth=3;c.strokeStyle='#e19d63';c.beginPath();
    for(let i=0;i<=200;i++){const a=i/200*TAU,xx=X+ww*.5+Math.sin(2*a)*150,yy=Y+hh*.5+Math.sin(3*a+.4)*95;if(i===0)c.moveTo(xx,yy);else c.lineTo(xx,yy);}c.stroke();
    circle(c,240,212,9,'#dde4c6',false,2);line(c,220,212,260,212,'#b4c8ac',2);line(c,240,192,240,232,'#b4c8ac',2);
    for(let i=0;i<3;i++){monoTxt(c,['X / mm','Y / mm','Z / mm'][i],473,106+i*88,17,'#8eaba0');monoTxt(c,['+128.40','−032.08','+076.20'][i],473,148+i*88,36,'#d6dec6');}
    line(c,20,369,W-20,369,'#5c7770');circle(c,30,400,5,'#a3c7a7',true);monoTxt(c,'SERVO READY',50,407,19,'#b4cdb4');monoTxt(c,'CYCLE  014',W-20,407,18,'#adc1b2','right');
  },true);
}
export function sampleScreen(g,x,y,z,w,h){
  return graphic(g,x,y,z,w,h,'sample-control',512,250,(c,W,H)=>{
    rect(c,0,0,W,H,'#233a38');rect(c,0,0,W,40,'#c3cbb8');
    monoTxt(c,'OPTICAL HEAD / PX.01',14,27,19,ink);monoTxt(c,'READY',W-12,27,16,ink,'right');
    monoTxt(c,'SCAN POSITION',20,78,16,'#9eb8a4');txt(c,'032.50°',17,142,59,'#e0e4d4',500);
    for(let i=0;i<12;i++){const a=i/12*TAU;circle(c,397+Math.cos(a)*58,134+Math.sin(a)*58,5,i===3?'#ed9d61':'#a2b7a2',true);}
    circle(c,397,134,44,'#72918a',false,2);circle(c,397,134,10,'#d78c53',false,3);
    line(c,20,177,300,177,'#728c7f');monoTxt(c,'SPECIMEN  017 / CALCITE',20,207,16,'#b8cabb');
    monoTxt(c,'8 CHANNEL ARRAY     24.1 C',20,232,13,'#91ac9b');
  },true);
}

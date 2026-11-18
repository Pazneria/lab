import {rng,TAU,pick} from './workshop.js';
export const spineColors=['#62382d','#35453b','#2e434c','#884a39','#51433e','#816c47','#5b5350','#758074','#494038','#69424a','#535d68','#79604c','#a58c69','#344a49','#775c39','#4b4b30'];
const seriesTitles=['COLLECTED PAPERS','THE VALLEY SURVEY','NATURAL HISTORIES','COUNTY RECORDS'];
const seriesHides=[1,3,2,9];
const numerals=['I','II','III','IV','V','VI','VII','VIII'];
export const spineBase=i=>i>=96?spineColors[seriesHides[Math.floor((i-96)/8)]]:spineColors[(i*7+Math.floor(i/16)*3)%spineColors.length];
const titles=['THE ALPINE FLORA','MEASURE OF LAND','COLLECTED PAPERS','FIELD NOTES','THE UPPER VALLEY','FERNS AND MOSSES','THE GREEN WORLD','ESSAYS','THE NATURALIST','STUDIES IN LIGHT','WILD GARDENS','TRAVELS','A BOOK OF HOURS','THE OLD ROADS','ATLAS OF STARS','SILVA','ORNITHOLOGY','MOUNTAIN PASSES','RIVERS AND LAKES','THE HILLS','LOCAL RECORDS','THE HERBARIUM','STONE AND EARTH','FOLIO'];
function canvas(w,h){const c=document.createElement('canvas');c.width=w;c.height=h;return [c,c.getContext('2d')];}
function path(ctx,pts,fill,stroke,width=1,close=true){
  ctx.beginPath();ctx.moveTo(...pts[0]);for(const p of pts.slice(1))ctx.lineTo(...p);if(close)ctx.closePath();
  if(fill){ctx.fillStyle=fill;ctx.fill();}if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=width;ctx.stroke();}
}
function line(c,x,y,X,Y,col,w=1){path(c,[[x,y],[X,Y]],null,col,w,false);}
function ellipse(c,x,y,rx,ry,a,col,fill=true){
  c.beginPath();c.ellipse(x,y,Math.max(.01,rx),Math.max(.01,ry),a,0,TAU);
  if(fill){c.fillStyle=col;c.fill();}else{c.strokeStyle=col;c.stroke();}
}
function type(c,text,x,y,size,col,font='Georgia',align='center',italic=false){
  c.font=(italic?'italic ':'')+size+'px '+font;c.textAlign=align;c.fillStyle=col;c.fillText(text,x,y);
}
function grain(c,w,h,count,seed,opacity){
  const r=rng(seed);c.save();for(let i=0;i<count;i++){
    c.fillStyle=r()>.5?'rgba(255,238,196,'+opacity*r()+')':'rgba(34,22,16,'+opacity*r()+')';
    c.fillRect(r()*w,r()*h,1+r()*1.7,.5+r()*2.3);
  }c.restore();
}
export function makeSpines(){
  const W=96,H=256,[can,c]=canvas(W*16,H*8),r=rng(3123);
  for(let i=0;i<128;i++){
    c.save();c.translate((i%16)*W,Math.floor(i/16)*H);c.beginPath();c.rect(0,0,W,H);c.clip();
    c.fillStyle=spineBase(i);c.fillRect(0,0,W,H);
    let gr=c.createLinearGradient(0,0,W,0);gr.addColorStop(0,'rgba(18,10,5,.42)');gr.addColorStop(.16,'rgba(251,216,169,.10)');gr.addColorStop(.69,'rgba(255,233,201,.02)');gr.addColorStop(1,'rgba(25,10,1,.30)');c.fillStyle=gr;c.fillRect(0,0,W,H);
    const series=i>=96?Math.floor((i-96)/8):-1;
    const gold=pick(['#cba66a','#b69b66','#e1c396','#b89464'],r),t=series>=0?seriesTitles[series]:titles[(i*3+Math.floor(i/5))%titles.length];
    const kind=series>=0?[0,1,6,0][series]:i%8;
    const ys=kind===4?[15,236]:kind===3?[12,75,180,240]:[12,36,88,185,222,244];
    for(const y of ys){c.fillStyle='rgba(20,10,4,.32)';c.fillRect(0,y+2,W,3);c.fillStyle=gold;c.globalAlpha=.5+r()*.45;c.fillRect(3,y,W-6,1.8);c.globalAlpha=1;}
    if(kind===0||kind===1||kind===6){
      c.fillStyle=kind===1?'#6a342e':'#302c27';c.fillRect(5,45,W-10,36);
      c.strokeStyle=gold;c.lineWidth=.8;c.strokeRect(7,47,W-14,32);
      t.split(' ').slice(0,3).forEach((s,k)=>type(c,s,W/2,55+k*9,9,gold));
      type(c,series>=0?numerals[(i-96)%8]:numerals[i%5],48,147,16,gold);
    }else if(kind===4||kind===5){
      c.save();c.translate(46,133);c.rotate(-Math.PI/2);type(c,t,0,3,13,gold);c.restore();
      if(kind===4){c.strokeStyle=gold;c.lineWidth=1;c.strokeRect(17,23,62,206);}
    }else{
      const words=t.split(' ');words.forEach((s,k)=>type(c,s,48,59+k*12,11,gold));
      c.save();c.translate(48,130);c.rotate(Math.PI/4);c.strokeStyle=gold;c.strokeRect(-7,-7,14,14);c.strokeRect(-4,-4,8,8);c.restore();
      for(const y of [106,154]){line(c,35,y,61,y,gold);ellipse(c,48,y+3,2,2,0,gold);}
    }
    if(i%5===2||i%7===1){
      c.save();c.translate(46,209);c.rotate((r()-.5)*.09);c.fillStyle='#c0ae87';c.fillRect(-22,-11,44,22);
      line(c,-18,-7,18,-7,'#867457');type(c,('00'+(17*i%532)).slice(-3),0,5,11,'#4c4236','monospace');c.restore();
    }
    for(let k=0;k<55;k++){
      const y=(r()>.5?r()*7:H-r()*7),x=r()*W;line(c,x,y,x+r()*8,y+(r()-.5)*2,'rgba(216,183,142,.32)',.8);
    }
    grain(c,W,H,240,17*i,.14);c.restore();
  }return can;
}
export function makeCovers(){
  const W=96,H=144,[can,c]=canvas(W*16,H*8),r=rng(9061);
  for(let i=0;i<128;i++){
    c.save();c.translate((i%16)*W,Math.floor(i/16)*H);c.beginPath();c.rect(0,0,W,H);c.clip();
    const hide=spineBase(i),serial=i>=96,gold=serial?'#bfab7d':pick(['#bca274','#c6aa79','#a99877'],r);
    c.fillStyle=hide;c.fillRect(0,0,W,H);
    const marble=!serial&&i%6===2;
    if(marble){
      c.save();c.beginPath();c.rect(19,1,W-20,H-2);c.clip();
      c.fillStyle='#95896e';c.fillRect(19,1,W-20,H-2);
      for(let j=0;j<94;j++){
        const a=r()*W,b=r()*H;c.strokeStyle=pick(['#6a7160','#746557','#b1a185','#bbb095','#6b776e'],r);
        c.lineWidth=.6+r()*1.8;c.beginPath();c.moveTo(a,b);c.bezierCurveTo(a+13,b-4,a+17,b+5,a+4,b+7);c.bezierCurveTo(a-16,b+11,a+6,b+19,a+17,b+13);c.stroke();
      }c.restore();
      path(c,[[W-17,0],[W,0],[W,20]],hide);path(c,[[W-17,H],[W,H],[W,H-20]],hide);
      line(c,18,1,18,H-1,gold,.9);
    }else{
      c.strokeStyle=gold;c.lineWidth=.65;c.globalAlpha=.58;c.strokeRect(10,7,W-17,H-14);
      if(i%4!==1)c.strokeRect(13,10,W-23,H-20);
      c.globalAlpha=1;
      for(const xx of [16,W-12])for(const yy of [13,H-13])diamond(c,xx,yy,1.75,2.55,gold);
      const title=serial?seriesTitles[Math.floor((i-96)/8)]:titles[(i*3+Math.floor(i/5))%titles.length];
      title.split(' ').forEach((s,k)=>type(c,s,51,38+k*9,7.8,gold));
      const bx=50,by=95;c.save();c.translate(bx,by);c.rotate(-.18);
      line(c,0,9,0,-14,gold,.85);
      for(let k=0;k<4;k++)for(const s of [-1,1])ellipse(c,s*(3-k*.38),3-k*3.6,3.7-k*.35,1.35,-s*.50,gold);
      c.restore();if(serial)type(c,numerals[(i-96)%8],51,122,9.5,gold);
    }
    c.fillStyle='rgba(34,23,15,.23)';c.fillRect(4,0,2,H);c.fillStyle='rgba(230,206,160,.16)';c.fillRect(7,0,1,H);
    grain(c,W,H,210,i+531,.18);c.restore();
  }return can;
}
function diamond(c,x,y,rx,ry,col,stroke){path(c,[[x,y-ry],[x+rx,y],[x,y+ry],[x-rx,y]],col,stroke,2);}
function flower(c,x,y,r,base,petal,heart){
  const pts=[];for(let i=0;i<16;i++){const a=i*Math.PI/8,s=i%2?r*.56:r;pts.push([x+Math.cos(a)*s,y+Math.sin(a)*s]);}
  path(c,pts,base,petal,1.4);diamond(c,x,y,r*.41,r*.41,petal);diamond(c,x,y,r*.16,r*.16,heart);
}
export function makeRug(){
  const W=768,H=1280,[can,c]=canvas(W,H);
  c.fillStyle='#bc9672';c.fillRect(0,0,W,H);
  for(const [edge,col] of [[5,'#533c35'],[12,'#ad7955'],[20,'#4b5960'],[34,'#ccaa77'],[41,'#733f3c'],[88,'#c2a477'],[94,'#364b4c'],[112,'#a07d56'],[118,'#934939']]){
    c.fillStyle=col;c.fillRect(edge,edge,W-2*edge,H-2*edge);
  }
  function border(y,vertical,len){
    c.save();if(vertical){c.translate(y,0);c.rotate(Math.PI/2);}else c.translate(0,y);
    for(let k=61;k<len-50;k+=47){
      line(c,k-24,0,k,-10,'#d2ae79',2);line(c,k,-10,k+24,0,'#d2ae79',2);
      flower(c,k,0,16,'#cab58d','#34494c','#9a6647');
      diamond(c,k+24,0,6,9,'#ac8459');
    }c.restore();
  }
  border(64,false,W);border(H-64,false,W);border(64,true,H);border(W-64,true,H);
  c.save();c.beginPath();c.rect(120,120,W-240,H-240);c.clip();
  for(let row=0;row<12;row++)for(let col=-1;col<6;col++){
    const x=142+col*103+(row%2)*52,y=141+row*94;
    flower(c,x,y,17,'#4e5950','#bc995f','#653e33');
    for(const s of [-1,1]){
      path(c,[[x+s*7,y+14],[x+s*27,y+32],[x+s*37,y+23],[x+s*43,y+32]],null,'#c79362',2.8,false);
      diamond(c,x+s*26,y-21,5,10,'#c09a69');
    }
  }
  for(const cy of [365,640,915]){
    diamond(c,384,cy,166,192,'#463f37','#c49c64');diamond(c,384,cy,155,180,'#536762','#be9b61');diamond(c,384,cy,128,152,'#7e4237','#c2a36a');
    for(const s of [-1,1])for(const t of [-1,1]){
      flower(c,384+s*58,cy+t*45,22,'#c2a273','#354947','#886241');
      diamond(c,384+s*118,cy,10,19,'#b89768');
    }
    flower(c,384,cy,65,'#344c4b','#d3b380','#9e563d');diamond(c,384,cy-111,11,23,'#c7ad7e');diamond(c,384,cy+111,11,23,'#c7ad7e');
  }c.restore();
  for(let i=0;i<W;i+=3){c.fillStyle=i%2?'rgba(250,228,190,.06)':'rgba(30,22,17,.09)';c.fillRect(i,0,1,H);}
  for(let i=0;i<H;i+=3){c.fillStyle='rgba(46,32,23,.14)';c.fillRect(0,i,W,.7);}
  grain(c,W,H,12000,521,.10);return can;
}
function paperBase(c,w,h){
  c.fillStyle='#d9c8a3';c.fillRect(0,0,w,h);const grad=c.createRadialGradient(w*.4,h*.4,w*.12,w*.5,h*.5,h*.73);
  grad.addColorStop(0,'rgba(255,250,230,.65)');grad.addColorStop(1,'rgba(165,132,84,.26)');c.fillStyle=grad;c.fillRect(0,0,w,h);
  grain(c,w,h,5000,9903,.15);
}
function fern(c,x,y,h,slant,r){
  const point=t=>[x+slant*t+Math.sin(t*Math.PI)*h*.09,y-h*t];
  let prev=point(0);
  for(let i=1;i<=32;i++){
    const t=i/33,p=point(t);line(c,...prev,...p,'#655e3a',1.3);prev=p;
    const len=h*(.015+.16*Math.sin(t*Math.PI)**.66)*(1-t*.3);
    for(const sign of [-1,1]){
      const end=[p[0]+sign*len,p[1]-len*.69],mid=[p[0]+sign*len*.48,p[1]-len*.17];
      path(c,[p,mid,end,[p[0]+sign*len*.40,p[1]-len*.37]],pick(['#77805b','#8d9068','#707b54'],r),'#565e45',.5);
      line(c,...p,...end,'#535d41',.6);
      for(let q=1;q<8;q++){const u=q/8;line(c,p[0]+sign*len*u,p[1]-len*.69*u,p[0]+sign*len*(u+.05),p[1]-len*(.69*u+.065),'#49533c',.5);}
    }
  }
}
export function makeFern(){
  const [can,c]=canvas(512,704);paperBase(c,512,704);const r=rng(871);
  type(c,'HORTUS  ALPINUS',256,48,20,'#605a48');line(c,49,64,463,64,'#8b846d');
  type(c,'Plate XVII',450,89,13,'#756b55','Georgia','right',true);
  fern(c,238,558,386,16,r);fern(c,240,556,298,-143,r);fern(c,238,556,271,143,r);fern(c,236,557,214,-77,r);
  for(let i=0;i<12;i++)line(c,238,552,225+r()*25,568+r()*8,'#827454',1);
  type(c,'Polystichum lonchitis',256,613,27,'#4b513c','Georgia','center',true);
  type(c,'THE  HOLLY  FERN',256,641,12,'#65614d');line(c,133,658,379,658,'#918972');
  return can;
}
export function makeMap(){
  const W=896,H=600,[can,c]=canvas(W,H);paperBase(c,W,H);
  c.save();c.beginPath();c.rect(26,25,W-52,H-50);c.clip();
  const hills=[[70,60,230,133],[530,12,239,132],[640,440,265,165],[99,592,295,202],[853,168,147,196],[338,339,105,71]];
  for(let k=0;k<hills.length;k++){
    const [x,y,rx,ry]=hills[k];
    for(let i=1;i<=26;i++){
      const pts=[];for(let a=0;a<=180;a++){const t=a*TAU/180,s=(i/23)**.91*(1+.11*Math.cos(t*3+k)+.052*Math.sin(t*7+i*.035));
        pts.push([x+s*rx*Math.cos(t),y+s*ry*Math.sin(t)]);}
      path(c,pts,null,i%5?'#a89d7f':'#8c886c',i%5?.65:1.2);
    }
  }
  const river=[];for(let x=-20;x<W+20;x+=4)river.push([x,251+66*Math.sin(x/154)+33*Math.sin(x/71)+x*.069]);
  path(c,river,null,'#6d9294',7,false);path(c,river,null,'#a6b7ad',3,false);
  const road=river.map(([x,y])=>[x,y+20+13*Math.sin(x*.021)]);path(c,road,null,'#946e51',1.4,false);
  const r=rng(776);for(let i=0;i<58;i++){const x=390+(r()-.5)*130,y=329+(r()-.5)*39;c.save();c.translate(x,y);c.rotate(-.27+r()*.3);c.fillStyle='#776a54';c.fillRect(0,0,3+r()*6,3+r()*5);c.restore();}
  for(const [x,y,s] of [[132,141,'M o r r i s   F e l l'],[602,119,'T h e   H i g h   P a s s'],[419,367,'ALDERWICK'],[638,323,'River Larch'],[748,488,'G r e y   S c a r']])type(c,s,x,y,13,'#535844','Georgia','center',true);
  c.restore();c.strokeStyle='#787158';c.strokeRect(23,22,W-46,H-44);c.strokeRect(27,26,W-54,H-52);
  c.fillStyle='#e2d3af';c.fillRect(52,431,246,116);c.strokeStyle='#8a7a59';c.strokeRect(56,435,238,108);
  type(c,'A  SURVEY  OF',175,462,12,'#625b47');type(c,'The Larch Valley',175,497,27,'#494e40','Georgia','center',true);type(c,'ONE  INCH  TO  THE  MILE',175,524,10,'#68604e');
  const X=818,Y=82;for(let i=0;i<8;i++){const a=i*Math.PI/4;path(c,[[X,Y],[X+Math.cos(a)*28,Y+Math.sin(a)*28],[X+Math.cos(a+.5)*7,Y+Math.sin(a+.5)*7]],i%2?'#8c8869':'#474e42');}type(c,'N',X,Y-32,12,'#464c40');
  return can;
}
export function makeFolio(){
  const [can,c]=canvas(704,460);paperBase(c,704,460);const r=rng(55);
  type(c,'CHAPTER  VIII',175,59,15,'#615842');type(c,'The valley flora',175,89,25,'#443f31','Georgia','center',true);
  for(let row=0;row<24;row++){
    let x=41+(row%9===0?13:0),y=120+row*11;
    while(x<300){const w=5+r()*23;line(c,x,y,Math.min(306,x+w),y,'#77715d',1.6);x+=w+4;}
  }
  fern(c,528,353,248,27,r);fern(c,528,354,156,-85,r);type(c,'Fig. 16.  Mountain fern.',525,385,13,'#625b48','Georgia','center',true);
  type(c,'128',176,424,11,'#827761');type(c,'129',527,424,11,'#827761');return can;
}
export const labels=['ALDERWICK  HILL  LIBRARY','NATURAL  HISTORIES','TRAVEL  &  TOPOGRAPHY','BOTANY','THE  MAP  GALLERY','LOCAL  RECORDS','COLLECTED  WORKS','REFERENCE'];
export function makeLabels(){
  const [can,c]=canvas(1024,512);
  labels.forEach((t,i)=>{const y=i*64;c.fillStyle=i===0?'#43504a':'#9c845d';c.fillRect(0,y,1024,64);c.strokeStyle=i===0?'#c7b58d':'#655b44';c.lineWidth=2;c.strokeRect(5,y+4,1014,56);type(c,t,512,y+45,i===0?40:38,i===0?'#e9d2a6':'#393b31');});
  return can;
}
export function makeGlobe(){
  const [can,c]=canvas(768,384);c.fillStyle='#a0ad97';c.fillRect(0,0,768,384);
  const land=[[[.07,.18],[.19,.10],[.27,.18],[.25,.30],[.21,.34],[.20,.46],[.27,.54],[.22,.53],[.14,.40]],[[.26,.49],[.35,.55],[.37,.62],[.30,.78],[.28,.90],[.25,.78],[.25,.64]],[[.46,.31],[.51,.28],[.50,.19],[.55,.15],[.58,.22],[.65,.14],[.77,.14],[.91,.22],[.87,.36],[.78,.42],[.78,.52],[.72,.44],[.68,.52],[.65,.41],[.58,.38]],[[.46,.37],[.54,.34],[.60,.44],[.57,.58],[.52,.72],[.49,.67],[.47,.55],[.43,.48]],[[.79,.67],[.86,.62],[.9,.72],[.86,.79],[.78,.74]],[[.29,.07],[.35,.08],[.33,.2],[.29,.19]]];
  land.forEach(poly=>path(c,poly.map(([x,y])=>[x*768,y*384]),'#d0b783','#93866c',2));for(let i=0;i<=768;i+=32)line(c,i,0,i,384,'rgba(81,83,64,.48)',1);
  for(let i=0;i<384;i+=32)line(c,0,i,768,i,'rgba(81,83,64,.48)',1);
  grain(c,768,384,10000,149,.17);return can;
}

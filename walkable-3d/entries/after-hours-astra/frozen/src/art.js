import * as THREE from 'three';

export const palette={ink:'#101a29',cream:'#f0deb3',gold:'#dca45d',cyan:'#70e0d5',coral:'#ee785f'};
export function random(seed=1){return()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};}
export function canvas(w,h,draw){const c=document.createElement('canvas');c.width=w;c.height=h;draw(c.getContext('2d'),w,h);return c;}
export function texture(c,repeat){const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=4;if(repeat){t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(...repeat);}return t;}
function line(ctx,pts,color,width=2){ctx.strokeStyle=color;ctx.lineWidth=width;ctx.beginPath();pts.forEach((p,i)=>i?ctx.lineTo(...p):ctx.moveTo(...p));ctx.stroke();}
function text(ctx,s,x,y,size,color=palette.cream,align='left',weight=700){ctx.fillStyle=color;ctx.textAlign=align;ctx.font=`${weight} ${size}px Arial, sans-serif`;ctx.fillText(s,x,y);}
function circle(ctx,x,y,r,color,width=2){ctx.strokeStyle=color;ctx.lineWidth=width;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.stroke();}
function stars(ctx,w,h,seed=6,count=110){const r=random(seed);for(let i=0;i<count;i++){ctx.globalAlpha=.25+r()*.65;ctx.fillStyle=i%5===0?palette.gold:'#b8d8df';const s=r()*1.6+.6;ctx.fillRect(r()*w,r()*h,s,s);}ctx.globalAlpha=1;}
function badge(ctx,x,y,r,color){circle(ctx,x,y,r,color,3);circle(ctx,x,y,r*.82,color,1);for(let i=0;i<12;i++){const a=i*Math.PI/6;line(ctx,[[x+Math.cos(a)*r*.88,y+Math.sin(a)*r*.88],[x+Math.cos(a)*r*.96,y+Math.sin(a)*r*.96]],color,2);}}

export function surfaceMap(type){return texture(canvas(256,256,(c,w,h)=>{
 const r=random(32);c.fillStyle=type==='wood'?'#594032':type==='plaster'?'#a4a099':'#bfc0bd';c.fillRect(0,0,w,h);
 if(type==='wood'){for(let i=0;i<230;i++){c.strokeStyle=`rgba(${i%2?150:10},${i%2?103:8},${i%2?61:5},${.03+r()*.12})`;c.beginPath();const x=r()*w;c.moveTo(x,0);c.bezierCurveTo(x+8,70,x-9,160,x+2,h);c.stroke();}}
 else{for(let i=0;i<7000;i++){const v=r()>.5?255:0;c.fillStyle=`rgba(${v},${v},${v},${r()*.1})`;c.fillRect(r()*w,r()*h,1+r()*1.5,1);}}
}),type==='wood'?[2,1]:[3,3]);}

export function carpetMap(){return texture(canvas(512,512,(c,w,h)=>{
 c.fillStyle='#202d38';c.fillRect(0,0,w,h);const r=random(177);
 for(let y=-32;y<h+40;y+=64)for(let x=-32;x<w+40;x+=64){const X=x+(y%128?32:0);line(c,[[X-16,y],[X,y-20],[X+16,y],[X,y+20],[X-16,y]],'#4b5553',1.2);line(c,[[X-9,y],[X,y-11],[X+9,y]],'#846a53',1.5);c.fillStyle='#9b7153';c.fillRect(X-1,y+7,2,3);c.fillStyle='#406a6e';c.fillRect(X+22,y+28,9,2);}
 for(let i=0;i<40000;i++){c.fillStyle=r()>.5?'rgba(190,172,136,.065)':'rgba(0,4,12,.13)';c.fillRect(r()*w,r()*h,1,1+r()*2);}
}),[5.8,8]);}

export function marquee(spec){return texture(canvas(1024,256,(c,w,h)=>{
 const g=c.createLinearGradient(0,0,w,h);g.addColorStop(0,spec.dark);g.addColorStop(1,'#101722');c.fillStyle=g;c.fillRect(0,0,w,h);
 const col=spec.accent;c.strokeStyle=col;c.lineWidth=4;c.strokeRect(10,10,w-20,h-20);c.lineWidth=1;c.strokeRect(20,20,w-40,h-40);
 if(spec.type==='moon'){stars(c,w,h);badge(c,115,128,64,col);circle(c,115,128,34,palette.cream,2);c.fillStyle=palette.cream;c.beginPath();c.arc(115,128,24,0,Math.PI*2);c.fill();c.fillStyle=spec.dark;c.beginPath();c.arc(129,118,22,0,Math.PI*2);c.fill();text(c,'MOONWAKE',575,141,96,palette.cream,'center');text(c,'N I G H T   C O U R I E R',578,194,22,col,'center',400);}
 else{for(let i=0;i<7;i++)line(c,[[20+i*23,225],[140+i*23,20]],col+'66',4);text(c,spec.name,586,139,spec.name.length>11?78:92,palette.cream,'center');text(c,spec.tagline.toUpperCase(),581,192,23,col,'center',400);}
 const r=random(9);for(let i=0;i<90;i++){c.fillStyle='#ffffff07';c.fillRect(r()*w,r()*h,r()*18,1);}
}));}

export function sideArt(spec){return texture(canvas(512,1024,(c,w,h)=>{
 c.fillStyle=spec.dark;c.fillRect(0,0,w,h);const col=spec.accent;
 c.save();c.beginPath();c.rect(22,22,w-44,h-44);c.clip();
 if(spec.type==='moon'){
  stars(c,w,h,49,260);for(let i=0;i<6;i++){c.save();c.translate(254,422);c.rotate(-.43);c.scale(1,.53+i*.1);circle(c,0,0,125+i*29,col,i===2?6:1.5);c.restore();}
  const g=c.createRadialGradient(213,327,4,261,415,124);g.addColorStop(0,'#f8e7b7');g.addColorStop(.75,'#d5a769');g.addColorStop(1,'#525e65');c.fillStyle=g;c.beginPath();c.arc(259,414,109,0,Math.PI*2);c.fill();
  const r=random(5);for(let i=0;i<14;i++){const x=201+r()*102,y=339+r()*148;circle(c,x,y,3+r()*14,'#896d4a99',1);}
  line(c,[[38,750],[310,615],[420,196]],'#e8d9b5',4);line(c,[[337,556],[372,570],[354,523],[337,556]],col,4);
  text(c,'M O O N',256,796,49,palette.cream,'center');text(c,'W A K E',256,856,49,palette.cream,'center');text(c,'NIGHT COURIER / 1987',256,914,15,col,'center',400);
 }else if(spec.bank==='tide'){
  for(let i=0;i<13;i++){c.beginPath();c.strokeStyle=i%3===0?col:'#317b83';c.lineWidth=i%3===0?4:1.5;for(let y=130;y<875;y+=8){const x=60+i*34+Math.sin(y*.012+i*.5)*35;y===130?c.moveTo(x,y):c.lineTo(x,y);}c.stroke();}
  c.fillStyle='#102c38';c.beginPath();c.arc(258,420,140,0,Math.PI*2);c.fill();badge(c,258,420,130,col);circle(c,258,420,94,col,2);line(c,[[190,453],[258,345],[330,453],[258,425],[190,453]],palette.cream,7);
  text(c,spec.name.split(' ')[0],256,755,53,palette.cream,'center');text(c,spec.name.split(' ').slice(1).join(' '),256,813,47,col,'center');text(c,'DEEPWATER SERIES • 02',256,875,15,palette.cream,'center',400);
 }else{
  for(let i=0;i<8;i++){c.fillStyle=i%2===0?col:'#9e3654';c.beginPath();c.moveTo(-120+i*84,100);c.lineTo(-50+i*84,100);c.lineTo(390+i*84,935);c.lineTo(320+i*84,935);c.fill();}
  c.fillStyle='#2b243a';c.beginPath();c.arc(256,390,149,0,Math.PI*2);c.fill();badge(c,256,390,130,palette.cream);for(let i=0;i<5;i++)line(c,[[155,335+i*23],[356,335+i*23]],col,10);
  line(c,[[182,451],[240,338],[304,451],[256,420],[182,451]],palette.cream,5);
  c.fillStyle=spec.dark;c.fillRect(30,682,452,155);text(c,spec.name.split(' ')[0],256,746,50,palette.cream,'center');text(c,spec.name.split(' ').slice(1).join(' '),256,802,43,palette.cream,'center');text(c,'CITYLINE / ELECTRONIC AMUSEMENTS',256,914,13,palette.cream,'center',400);
 }
 c.restore();c.strokeStyle=col;c.lineWidth=3;c.strokeRect(18,18,w-36,h-36);
 const r=random(31);for(let i=0;i<180;i++){c.fillStyle='#d5d1b818';const y=i<110?850+r()*130:r()*h;c.fillRect(30+r()*450,y,1+r()*10,.5+r());}
}));}

export function screenArt(spec){return texture(canvas(1024,768,(c,w,h)=>{
 c.fillStyle='#030b14';c.fillRect(0,0,w,h);const col=spec.accent;const r=random(83);
 text(c,'1UP  008450',49,50,20,col);text(c,'HI  024900',w/2,50,20,palette.cream,'center');text(c,'CREDIT  00',w-50,50,20,col,'right');
 c.save();c.beginPath();c.rect(35,70,w-70,576);c.clip();
 if(spec.type==='moon'){
  stars(c,w,h,17,180);const g=c.createRadialGradient(572,326,5,600,360,195);g.addColorStop(0,'#ebd6a0');g.addColorStop(.65,'#b99564');g.addColorStop(1,'#172934');c.fillStyle=g;c.beginPath();c.arc(600,360,181,0,Math.PI*2);c.fill();
  c.save();c.translate(598,361);c.rotate(-.45);c.scale(1,.43);for(let i=0;i<5;i++)circle(c,0,0,205+i*17,col,i===2?3:1);c.restore();
  for(let i=0;i<13;i++){const x=502+r()*169,y=249+r()*207;circle(c,x,y,r()*24+4,'#6e674faa',2);}
  c.setLineDash([4,11]);line(c,[[84,480],[181,390],[309,502],[463,470],[830,152]],'#91cac7',2);c.setLineDash([]);
  line(c,[[283,467],[302,413],[317,458],[308,451],[303,473],[297,451],[283,467]],palette.cream,3);line(c,[[299,480],[300,510]],col,2);
  badge(c,830,151,23,col);text(c,'SEA OF QUIET',598,590,16,palette.cream,'center',400);text(c,'POST 07',830,107,15,col,'center',400);text(c,'DELIVER THE LAST LIGHT',82,120,28,palette.cream);text(c,'SECTOR 03 : SELENE',82,155,16,col,'left',400);
 }else if(spec.type==='tide'){
  for(let j=0;j<13;j++){c.beginPath();c.strokeStyle=j%3===0?'#316d70':'#153b4b';for(let x=0;x<w;x+=8){const y=180+j*32+Math.sin(x*.009+j*.7)*48;x?c.lineTo(x,y):c.moveTo(x,y);}c.stroke();}
  for(let i=0;i<4;i++){badge(c,200+i*205,290+Math.sin(i*2)*130,24,col);text(c,`0${i+1}`,200+i*205,297+Math.sin(i*2)*130,16,palette.cream,'center');}
  line(c,[[197,290],[406,407],[613,194],[811,255]],col,3);line(c,[[470,460],[508,401],[543,460],[507,441],[470,460]],palette.cream,5);
  for(let i=0;i<20;i++){c.fillStyle=col+'55';c.fillRect(r()*w,220+r()*350,3,3);}text(c,'FOLLOW THE CURRENT',w/2,590,25,palette.cream,'center');text(c,'DEPTH 0840m',68,111,17,col);
 }else if(spec.type==='signal'){
  c.strokeStyle='#143b46';for(let x=54;x<w;x+=48)line(c,[[x,80],[x,640]],'#143b46');for(let y=85;y<650;y+=48)line(c,[[45,y],[980,y]],'#143b46');
  for(let i=0;i<5;i++)circle(c,520,363,50+i*47,i===4?col:'#387776',i===4?2:1);
  line(c,[[520,364],[671,185]],col,3);c.fillStyle='#68d7bb18';c.beginPath();c.moveTo(520,364);c.arc(520,364,231,-1.08,-.82);c.fill();
  for(let i=0;i<9;i++){const x=343+r()*333,y=183+r()*350;circle(c,x,y,5,col,3);}line(c,[[490,387],[520,329],[549,387],[520,373],[490,387]],palette.cream,3);text(c,'A SIGNAL IN THE SILENCE',512,624,25,palette.cream,'center');text(c,'SCAN 07 // 88.4',65,110,17,col);
 }else if(spec.type==='rail'){
  for(let i=-8;i<15;i++){line(c,[[i*90,600],[i*90+550,80]],'#412b42');line(c,[[i*90,80],[i*90+560,600]],'#412b42');}
  const tracks=[[[68,483],[346,230],[592,464],[920,170]],[[68,520],[347,267],[592,501],[944,192]],[[142,168],[738,701]]];
  for(const pts of tracks){line(c,pts,'#ba805b',12);line(c,pts,'#27253b',6);}
  for(let i=0;i<6;i++){const x=240+i*46,y=380-i*43;c.fillStyle=i===0?palette.cream:col;c.beginPath();c.moveTo(x,y);c.lineTo(x+35,y-30);c.lineTo(x+58,y-9);c.lineTo(x+22,y+24);c.closePath();c.fill();}
  for(const p of [[346,239],[592,477],[745,328]])badge(c,...p,18,'#8ed5b8');text(c,'MAKE THE CONNECTION',512,625,25,palette.cream,'center');text(c,'LINE B / NIGHT SERVICE',65,111,17,col);
 }else{
  const g=c.createLinearGradient(0,80,0,440);g.addColorStop(0,'#231d40');g.addColorStop(1,'#79415a');c.fillStyle=g;c.fillRect(0,80,w,350);
  c.fillStyle='#edab69';c.beginPath();c.arc(526,263,115,0,Math.PI*2);c.fill();for(let i=0;i<6;i++){c.fillStyle='#64314c';c.fillRect(408,277+i*15,240,3+i);}
  c.fillStyle='#1d233c';c.beginPath();c.moveTo(0,365);for(let x=0;x<1100;x+=65)c.lineTo(x,305+r()*103);c.lineTo(w,430);c.lineTo(0,430);c.fill();
  c.fillStyle='#111c2e';c.fillRect(0,421,w,226);for(let i=0;i<14;i++)line(c,[[500+(i-7)*31,414],[500+(i-7)*160,650]],'#b85e6a',2);for(let i=0;i<8;i++)line(c,[[0,426+i*i*4],[w,426+i*i*4]],'#b85e6a',2);
  c.fillStyle='#c4775b';c.beginPath();c.moveTo(328,647);c.lineTo(470,419);c.lineTo(560,419);c.lineTo(718,647);c.fill();line(c,[[523,434],[529,619]],palette.cream,5);
  c.fillStyle='#e9bd88';c.beginPath();c.moveTo(488,574);c.lineTo(533,547);c.lineTo(578,574);c.lineTo(565,597);c.lineTo(502,597);c.closePath();c.fill();line(c,[[510,598],[501,625]],'#ff7865',5);line(c,[[551,598],[560,625]],'#ff7865',5);text(c,'COAST ROAD  /  02:14 AM',70,115,18,palette.cream);
 }
 c.restore();text(c,spec.name,512,698,36,palette.cream,'center');text(c,'INSERT TOKEN   •   1 TOKEN / 1 CREDIT',512,735,17,col,'center',400);
 // The phosphor mask is baked once. It never causes a per-frame texture upload.
 for(let y=0;y<h;y+=4){c.fillStyle='#00000025';c.fillRect(0,y,w,1);}
 const v=c.createRadialGradient(w/2,h/2,h*.25,w/2,h/2,w*.62);v.addColorStop(0,'#00000000');v.addColorStop(1,'#000000aa');c.fillStyle=v;c.fillRect(0,0,w,h);
}));}

export function label(lines,{bg='#16252b',fg='#e5dac1',accent='#b9a57a',width=512,height=256}={}){return texture(canvas(width,height,(c,w,h)=>{
 c.fillStyle=bg;c.fillRect(0,0,w,h);c.strokeStyle=accent;c.lineWidth=2;c.strokeRect(9,9,w-18,h-18);const arr=Array.isArray(lines)?lines:[lines];arr.forEach((s,i)=>text(c,s,w/2,h*(i+1)/(arr.length+1)+7,i===0?Math.min(45,w/(s.length*.63)):Math.min(27,w/(s.length*.65)),i===0?fg:accent,'center',i===0?700:400));
}));}

export function controlArt(spec){return texture(canvas(1024,400,(c,w,h)=>{
 c.fillStyle=spec.type==='moon'?'#203143':spec.bank==='tide'?'#15343b':'#372739';c.fillRect(0,0,w,h);const col=spec.accent;
 line(c,[[20,22],[w-20,22],[w-20,h-22],[20,h-22],[20,22]],col,3);for(let i=0;i<8;i++)line(c,[[24+i*14,370],[138+i*14,240]],col+'45',3);
 const moon=spec.type==='moon',tide=spec.bank==='tide',deckW=spec.w+(moon?.09:.045),deckD=moon?.62:.46,deckZ=moon?.53:.447;
 const px=x=>(.5+x/deckW)*w,py=z=>(.5+(z-deckZ)/(deckD*Math.cos(moon?.12:.16)))*h;
 text(c,moon?'P I L O T   C O N S O L E':tide?'N A V I G A T I O N':'C I T Y L I N E   S Y S T E M S',512,49,22,palette.cream,'center');
 const jx=moon?-.38:tide?-spec.w*.23:-spec.w*.25,jz=moon?.53:.435;
 badge(c,px(jx),py(jz),72,col);text(c,moon?'STEER':'MOVE',px(jx),350,20,col,'center');
 const controls=moon?[[.28,.59,'PULSE'],[.43,.49,'BOOST'],[.58,.61,'DOCK']]:tide?[[spec.w*.16,.44,'PING'],[spec.w*.32,.53,'DIVE']]:Array.from({length:6},(_,i)=>[spec.w*.08+(i%3)*.122,.42+Math.floor(i/3)*.13,['A','B','C','1','2','3'][i]]);
 for(const [x,z,s]of controls){const X=px(x),Y=py(z);circle(c,X,Y,moon?40:tide?43:34,col,2);text(c,s,X,Y+(moon?66:tide?64:50),moon?14:tide?16:13,col,'center');}
 if(moon){badge(c,px(-.67),py(.4),52,col);text(c,'FREQUENCY',px(-.67),py(.4)+80,12,col,'center');}
 else{text(c,'START',px(-.027),py(.28)+27,12,col,'center');}
 const r=random(35);for(let i=0;i<350;i++){c.fillStyle='#eeecd809';c.fillRect(210+r()*640,260+r()*110,2+r()*18,1);}
}));}

export function environmentMap(){const t=texture(canvas(512,256,(c,w,h)=>{
 const g=c.createLinearGradient(0,0,0,h);g.addColorStop(0,'#30343a');g.addColorStop(.5,'#303d43');g.addColorStop(1,'#151b21');c.fillStyle=g;c.fillRect(0,0,w,h);
 c.filter='blur(10px)';c.fillStyle='#c8b995';for(const x of [45,195,355])c.fillRect(x,48,65,17);c.fillStyle='#71998f';c.fillRect(2,104,62,35);c.fillStyle='#aa755d';c.fillRect(244,100,58,36);c.filter='none';
}));t.mapping=THREE.EquirectangularReflectionMapping;return t;}

export function windowArt(){return texture(canvas(1024,768,(c,w,h)=>{
 const g=c.createLinearGradient(0,0,0,h);g.addColorStop(0,'#0a1526');g.addColorStop(1,'#213440');c.fillStyle=g;c.fillRect(0,0,w,h);const r=random(34);
 for(let i=0;i<11;i++){const x=i*110-40,y=180+r()*170;c.fillStyle=i%2?'#152332':'#111e2d';c.fillRect(x,y,105,490);for(let a=0;a<3;a++)for(let b=0;b<6;b++){c.fillStyle=r()>.7?'#99875c':'#293743';c.fillRect(x+12+a*28,y+23+b*49,13,21);}}
 c.fillStyle='#172633';c.fillRect(0,595,w,180);line(c,[[0,670],[w,670]],'#587070',3);line(c,[[0,721],[w,721]],'#7e7653',2);line(c,[[744,202],[744,675]],'#8c8a71',5);const glow=c.createRadialGradient(744,202,3,744,202,95);glow.addColorStop(0,'#edb56977');glow.addColorStop(1,'#edb56900');c.fillStyle=glow;c.fillRect(649,107,190,190);c.fillStyle='#d5b77b';c.fillRect(726,201,36,7);
 for(let i=0;i<350;i++){c.strokeStyle='#adbac513';const x=r()*w,y=r()*h;line(c,[[x,y],[x-5,y+19]],'#adbac515');}
 // Interior light reflections on the storefront glass.
 c.fillStyle='#d5b37808';c.beginPath();c.moveTo(130,0);c.lineTo(207,0);c.lineTo(570,h);c.lineTo(490,h);c.fill();
}));}

export function contactShadow(){return texture(canvas(128,128,(c,w,h)=>{const g=c.createRadialGradient(64,64,12,64,64,63);g.addColorStop(0,'#000000ad');g.addColorStop(.55,'#00000066');g.addColorStop(1,'#00000000');c.fillStyle=g;c.fillRect(0,0,w,h);}));}

export function posterArt(kind){return texture(canvas(512,720,(c,w,h)=>{
 c.fillStyle=kind===0?'#d9c797':'#263c45';c.fillRect(0,0,w,h);const col=kind===0?'#273d49':'#d6b078';c.strokeStyle=col;c.lineWidth=3;c.strokeRect(22,22,w-44,h-44);
 if(kind===0){text(c,'ONE MORE',256,104,48,col,'center');text(c,'ROUND.',256,161,61,col,'center');badge(c,256,353,126,col);text(c,'25',256,389,112,col,'center');text(c,'AFTER HOURS',256,555,32,col,'center');text(c,'TOKENS AT THE COUNTER',256,606,18,col,'center',400);text(c,'GOOD COMPANY • OPEN LATE',256,650,14,col,'center',400);}
 else{stars(c,w,h,42,90);for(let i=0;i<5;i++)circle(c,256,341,76+i*24,col,i===2?4:1);text(c,'MOONWAKE',256,118,49,col,'center');text(c,'THE NIGHT HAS A NEW ORBIT',256,159,15,palette.cream,'center',400);line(c,[[203,399],[258,265],[309,399],[255,367],[203,399]],palette.cream,5);text(c,'LEAVE A LIGHT ON.',256,585,30,col,'center');text(c,'A NEW CABINET AT AFTER HOURS',256,644,15,palette.cream,'center',400);}
}));}

'use strict';
// All illustrations, lettering and instrument faces are drawn locally, once, into one atlas.
window.makeHabitatAtlas = function makeHabitatAtlas(){
 const atlas=document.createElement('canvas'),N=512,cols=8,rows=4,gutter=4;
 atlas.width=N*cols;atlas.height=N*rows;
 const ctx=atlas.getContext('2d',{alpha:true});
 let seed=44119;
 function random(){seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;}
 const C={paper:'#e1d8bc',ink:'#344d46',muted:'#697a69',red:'#a35b43',cream:'#e9e2c5',gray:'#526e66'};
 function tile(id,w,h,draw){
  ctx.save();ctx.translate((id%cols)*N+gutter,Math.floor(id/cols)*N+gutter);
  ctx.scale((N-2*gutter)/w,(N-2*gutter)/h);ctx.beginPath();ctx.rect(0,0,w,h);ctx.clip();draw(ctx,w,h);ctx.restore();
 }
 const rect=(x,y,w,h,c)=>{ctx.fillStyle=c;ctx.fillRect(x,y,w,h);};
 function line(x,y,X,Y,c,width=1){ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(X,Y);ctx.strokeStyle=c;ctx.lineWidth=width;ctx.stroke();}
 function path(points,c,fill=false,width=1){ctx.beginPath();points.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));if(fill){ctx.closePath();ctx.fillStyle=c;ctx.fill();}else{ctx.strokeStyle=c;ctx.lineWidth=width;ctx.stroke();}}
 function circle(x,y,r,c){ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fillStyle=c;ctx.fill();}
 function label(text,x,y,size,c=C.ink,face='Arial',weight=500,align='left'){
  ctx.fillStyle=c;ctx.font=weight+' '+size+'px '+face;ctx.textAlign=align;ctx.textBaseline='alphabetic';ctx.fillText(text,x,y);ctx.textAlign='left';
 }
 function spaced(txt,x,y,size,gap,c=C.ink){
  ctx.font='600 '+size+'px Arial';ctx.fillStyle=c;ctx.textAlign='left';
  for(let char of txt){ctx.fillText(char,x,y);x+=ctx.measureText(char).width+gap;}
 }
 function paper(w,h,c=C.paper){
  rect(0,0,w,h,c);
  for(let i=0;i<Math.min(8500,w*h*.08);i++){
   ctx.fillStyle=random()>.55?'rgba(101,78,38,.075)':'rgba(255,250,219,.21)';
   ctx.fillRect(random()*w,random()*h,.4+random()*1.2,.4+random()*.9);
  }
 }
 function fan(x,y,angle,len,width,depth){
  let a=angle+(.5-random())*.20,xx=x+Math.sin(a)*len,yy=y-Math.cos(a)*len;
  let mid=[x+(xx-x)*.49+width*.32,y+(yy-y)*.47];
  ctx.beginPath();ctx.moveTo(x,y);ctx.quadraticCurveTo(mid[0],mid[1],xx,yy);
  ctx.strokeStyle=['#9d5746','#b26851','#985d4b','#b67a58'][depth%4];ctx.lineWidth=width;ctx.lineCap='round';ctx.stroke();
  if(depth<1)return;
  fan(xx,yy,a*.81+(random()-.5)*.45,len*(.60+random()*.19),width*.67,depth-1);
  fan(mid[0],mid[1],a+(random()>.5?1:-1)*(.33+random()*.70),len*(.54+random()*.25),width*.55,depth-1);
 }
 tile(0,460,550,(c,w,h)=>{
  paper(w,h);spaced('BENTHIC NATURAL HISTORY',28,35,10,2.5);label('PL. IV',401,35,12,C.muted,'Georgia',500,'right');
  line(28,48,432,48,C.muted,1);label('Gorgonacea',27,105,48,C.ink,'Georgia',400);
  label('A branching colony of the outer shelf.',29,129,14,C.muted,'Georgia','italic');
  for(let k=-3;k<=3;k++)fan(228,440,k*.287,75+random()*26,5.8-random()*1.3,7);
  for(let j=0;j<12;j++){let x=199+random()*53;path([[x,449],[x+3,436+random()*7],[x+11,441],[x+16,450]],'#a68f6e',true);}
  line(306,310,368,281,C.muted,.9);label('b.',372,281,13,C.muted,'Georgia','italic');
  line(86,358,132,347,C.muted,.9);label('a.',65,359,13,C.muted,'Georgia','italic');
  line(29,474,430,474,'#8f9680');label('Fig. 4',30,497,15,C.red,'Georgia','italic');
  label('Fan coral, aboral aspect',91,498,16,C.ink,'Georgia');
  spaced('PELAGIA FIELD ARCHIVE',30,526,8.5,2,C.muted);
 });
 tile(1,600,310,(c,w,h)=>{
  spaced('PELAGIA   /   SUBSEA HOUSING',12,37,15,3,C.cream);
  line(12,54,570,54,'#d2d0ae',3);
  label('07',0,200,164,'#d9d5b4','Arial',700);
  spaced('NACRE',213,127,42,5,C.cream);spaced('HOUSE',214,176,42,5,C.cream);
  line(12,224,569,224,'#b2bea8',2);spaced('RESIDENT QUARTERS     •     186 M',14,267,16,2.4,C.cream);
 });
 function fishPlate(x,y,s){
  ctx.save();ctx.translate(x,y);ctx.scale(s,s);
  const outline=[[10,75],[32,56],[65,40],[106,29],[149,20],[168,2],[187,11],[181,24],[220,25],[260,35],[289,49],[308,67],[303,77],[280,89],[245,104],[186,112],[135,104],[94,94],[65,84],[27,96],[-13,116],[0,80],[-16,42]];
  path(outline,'#7a8d79',true);path([...outline,outline[0]],C.ink,false,1.8);
  for(let i=0;i<16;i++){
   let t=i/16,yy=37+i*4;ctx.beginPath();ctx.moveTo(50+Math.abs(t-.5)*99,yy+19);ctx.bezierCurveTo(148,yy-19,217,yy-12,280-Math.abs(t-.4)*23,yy+4);
   ctx.strokeStyle='rgba(53,78,65,.48)';ctx.lineWidth=1.1;ctx.stroke();
  }
  for(let i=0;i<9;i++)line(10,75,-9+(i%3)*3,47+i*7.6,'#485e51',1);
  for(let i=0;i<160;i++){let X=80+random()*147,Y=43+random()*36;ctx.beginPath();ctx.arc(X,Y,2+random()*2.7,0,.7*Math.PI);ctx.strokeStyle='#536c5b';ctx.lineWidth=.7;ctx.stroke();}
  circle(272,54,10,C.cream);circle(273,54,7,C.ink);circle(275,51,2.1,C.cream);
  ctx.beginPath();ctx.moveTo(250,41);ctx.quadraticCurveTo(225,76,250,91);ctx.strokeStyle=C.ink;ctx.lineWidth=2;ctx.stroke();
  path([[217,67],[178,100],[200,65]],'#647863',true);
  line(282,76,305,69,C.ink,1.8);
  ctx.restore();
 }
 tile(2,420,460,(c,w,h)=>{
  paper(w,h,'#ddd8bd');spaced('PELAGIA  /  FIELD SERIES',22,27,9,2);
  line(22,38,397,38,C.muted);label('Shelf fauna',21,83,38,C.ink,'Georgia');
  label('Teleost survey    /    07—B',23,105,14,C.muted,'Georgia','italic');
  fishPlate(53,155,1.04);line(39,306,371,306,'#96a28b',.9);
  for(let i=0;i<6;i++){line(41+i*15,322,41+i*15,327,C.ink,1.5);}
  line(41,326,116,326,C.ink,1.5);label('50 mm',42,343,10);
  label('Fig. 07',23,377,16,C.red,'Georgia','italic');label('Lateral aspect',94,378,18,C.ink,'Georgia');
  label('Northern transect. Adult specimen.',23,405,14,C.muted,'Georgia');
  spaced('HABITAT REFERENCE COLLECTION',23,437,8.2,1.7);
 });
 function coast(x,y,w,h,night=false){
  ctx.save();ctx.translate(x,y);ctx.beginPath();ctx.rect(0,0,w,h);ctx.clip();
  let sky=ctx.createLinearGradient(0,0,0,h);sky.addColorStop(0,night?'#68867e':'#b3b6a0');sky.addColorStop(.69,night?'#cab291':'#e2cc9f');sky.addColorStop(1,'#d8bc94');rect(0,0,w,h,sky);
  circle(w*.694,h*.288,h*.152,night?'#dbb68a':'#ba7454');
  function ridge(points,col){path([...points.map(([a,b])=>[a*w,b*h]),[w,h],[0,h]],col,true);}
  ridge([[0,.42],[.08,.403],[.16,.427],[.22,.351],[.306,.366],[.4,.329],[.48,.384],[.61,.466],[.73,.46],[.8,.426],[.85,.443],[1,.411]],'#9aa78f');
  ridge([[0,.36],[.18,.40],[.23,.437],[.33,.457],[.356,.49],[.50,.53],[.65,.544],[.79,.51],[.89,.523],[1,.5]],'#778d80');
  rect(0,h*.56,w,h*.44,night?'#6d8781':'#88a398');
  for(let i=0;i<105;i++){
   let yy=h*(.576+random()*.42),xx=random()*w,l=(.011+random()*.108)*w;
   line(xx,yy,xx+l,yy,random()>.52?'rgba(223,216,179,.60)':'rgba(61,96,90,.30)',.65+random()*.9);
  }
  ridge([[0,.47],[.11,.479],[.192,.509],[.23,.564],[.34,.591],[.35,.606],[.485,.621],[.47,.643],[.32,.652],[.38,.681],[.21,.683],[.19,.701],[0,.717],[0,1],[0,1]],'#566f63');
  ridge([[0,.855],[.081,.826],[.166,.809],[.213,.77],[.295,.794],[.33,.823],[.376,.836],[.411,.884],[.54,.89],[.56,.934],[.65,.972],[.68,1],[1,1]],'#425b52');
  // A coastal beacon gives the print a recognizable human scale.
  const bx=w*.171,by=h*.494;
  path([[bx-.009*w,by],[bx-.006*w,by-.095*h],[bx+.005*w,by-.095*h],[bx+.01*w,by]],'#ded4b5',true);
  rect(bx-.007*w,by-.117*h,.014*w,.022*h,'#6a6c55');
  path([[bx-.01*w,by-.118*h],[bx,by-.132*h],[bx+.010*w,by-.118*h]],'#9f5d42',true);
  for(let i=0;i<1700;i++){rect(random()*w,random()*h,.8,.8,random()>.51?'rgba(255,241,195,.13)':'rgba(36,54,46,.11)');}
  ctx.restore();
 }
 tile(4,340,400,(c,w,h)=>{paper(w,h,'#e9dfc4');coast(17,17,306,296,true);label('North Point  /  June',26,355,24,'#626449','Georgia','italic');});
 tile(5,640,260,()=>{
  spaced('N A C R E    /    0 7',100,43,14,2,C.ink);
  label('AIRLOCK',320,133,70,C.ink,'Arial',700,'center');line(116,155,526,155,C.red,4);
  label('EQUALISE BEFORE OPENING',320,206,19,C.ink,'Arial',600,'center');
 });
 function gate(id,num,txt){
  tile(id,720,105,()=>{
   rect(0,0,720,105,'#2e4943');rect(7,10,6,85,'#c29b65');
   label(num,27,74,52,'#c4ac7d','Arial',600);line(116,18,116,87,'#859486',2);
   spaced(txt,142,69,33,2.4,C.cream);
   path([[654,68],[672,48],[690,68]],'#d4d8ba',false,4);
  });
 }
 gate(6,'02','SAMPLE LAB');gate(7,'03','OBSERVATION');
 tile(8,640,96,()=>{
  rect(0,0,640,96,'#ac9869');rect(7,8,626,80,'#4e5547');rect(10,11,620,74,'#b3a47a');
  spaced('PRESSURE GLAZING',25,41,18,2.5,'#353f37');label('PG–03   /   LAMINATED   /   KEEP SEAL CLEAR',25,70,13,'#38473b','Arial',600);
  label('07',606,68,40,'#38473b','Arial',600,'right');
 });
 tile(9,780,470,(c,w,h)=>{
  paper(w,h,'#ded6b8');spaced('A T L A S   O F   T H E   S H E L F',27,25,9,.9);
  label('PLATE  07',752,25,10,C.ink,'Arial',600,'right');
  coast(25,39,730,299,false);
  label('Pelagia Shelf',24,402,54,C.ink,'Georgia',400);
  label('NORTHERN TRANSECT',752,372,14,C.ink,'Arial',600,'right');
  label('Soundings at North Point',752,398,16,C.muted,'Georgia','italic','right');
  line(25,419,754,419,C.muted);
  spaced('LITTORAL SURVEY COLLECTION',25,446,9,2,C.muted);
  label('17°  42′  N     /     63°  28′  W',751,447,10,C.muted,'Arial',500,'right');
 });
 tile(10,660,413,(c,w,h)=>{
  paper(w,h,'#e5dfc5');rect(324,0,5,h,'#bfb79e');rect(329,0,3,h,'#d6cdb0');
  spaced('DIVE NOTES',20,32,12,2);label('07  /  16',304,32,12,C.ink,'Arial',500,'right');
  for(let i=0;i<12;i++)line(18,65+26*i,308,65+26*i,'#aab2a2',.8);
  label('Transect B — east wall',20,66,18,'#595e53','Georgia','italic');
  for(let i=0;i<7;i++){
   let x=22,y=93+i*26;
   for(let j=0;j<5+Math.floor(random()*4);j++){let ww=11+random()*23;
    ctx.beginPath();ctx.moveTo(x,y);for(let k=0;k<ww;k+=2)ctx.lineTo(x+k,y-Math.sin(k*1.1)*random()*5);ctx.strokeStyle='#667265';ctx.lineWidth=1.35;ctx.stroke();x+=ww+5;if(x>267)break;
   }
  }
  for(let k=-2;k<=2;k++)fan(498,316,k*.37,48,3.4,5);
  label('Gorgonian, sample 3.',362,360,18,C.ink,'Georgia','italic');label('186 m',561,391,11,C.muted);
 });
 tile(11,320,120,(c,w,h)=>{
  paper(w,h,'#dedcc4');rect(0,0,12,h,'#a26a44');spaced('STATION 07',26,33,15,1.3);
  label('B—034',24,85,36,C.ink,'Arial',650);label('SHELF',292,84,14,C.muted,'Arial',550,'right');line(24,99,294,99,C.muted,1);
 });
 tile(13,320,320,(c,w,h)=>{
  circle(160,160,157,'#d8d6bc');
  for(let i=0;i<=50;i++){
   let a=(.78+i/50*1.44)*Math.PI,x=Math.cos(a),y=Math.sin(a);
   line(160+129*x,160+129*y,160+(i%5===0?107:120)*x,160+(i%5===0?107:120)*y,i>43?C.red:C.ink,i%5===0?3.4:1.7);
   if(i%10===0)label(String(i/2),160+87*x,166+87*y,19,C.ink,'Arial',550,'center');
  }
  label('ΔP',160,119,24,C.ink,'Georgia',500,'center');label('bar',160,208,17,C.ink,'Georgia','italic','center');
  spaced('NACRE',135,238,9,2);
  let a=(.78+.744*1.44)*Math.PI;
  ctx.save();ctx.translate(160,160);ctx.rotate(a);
  path([[-19,5],[119,.8],[119,-1],[-19,-4]],'#974d38',true);ctx.restore();circle(160,160,11,'#52625a');circle(160,160,4,'#c0b28c');
 });
 tile(14,300,116,(c,w,h)=>{paper(w,h,'#d5d4bc');spaced('ARCHIVE',13,37,16,2);label('SHELF  /  07',12,90,29,C.ink,'Arial',600);});
 tile(15,450,128,()=>{spaced('P O T A B L E',10,54,22,3.2,C.ink);line(10,72,395,72,C.muted,2);label('DOMESTIC WATER SUPPLY',10,107,13,C.ink,'Arial',500);});
 tile(16,480,320,()=>{
  rect(0,0,480,320,'#61796f');ctx.strokeStyle='#bdc0a3';ctx.lineWidth=2;ctx.strokeRect(17,16,447,287);
  spaced('PELAGIA SURVEY',35,51,13,2.7,'#e1dcc0');
  label('Soundings',34,144,58,'#e2dcbf','Georgia',400);
  for(let i=0;i<11;i++){let pts=[];for(let j=0;j<=38;j++){let x=j*12;pts.push([22+x*.966,183+i*8+10*Math.sin(x*.013+i*.1)+4*Math.sin(x*.033)]);}path(pts,'#a7b19b',false,1.3);}
 });
 tile(18,640,86,()=>{
  path([[32,44],[55,25],[55,38],[85,38],[85,50],[55,50],[55,63]],C.cream,true);
  spaced('RESIDENT QUARTERS',114,57,28,2,C.cream);
 });
 tile(19,690,405,()=>{
  for(let i=0;i<35;i++){let a=i%5===0?.55:.24;line(i*20,0,i*20,405,'rgba(200,211,177,'+a+')',i%5===0?1.15:.75);}
  for(let i=0;i<21;i++){let a=i%5===0?.55:.24;line(0,i*20,690,i*20,'rgba(200,211,177,'+a+')',i%5===0?1.15:.75);}
  for(let j=0;j<7;j++)label(String(j*5),j*100+3,398,10,'#cad0b3');
  label('10 mm',682,18,12,'#d5d8bc','Arial',500,'right');
 });
 tile(20,700,440,()=>{
  for(let i=0;i<26;i++)for(let j=0;j<16;j++){
   let x=12+i*27,y=13+j*27;circle(x,y+1,3.9,'#b8c6b3');circle(x,y,3.4,'#475f57');circle(x,y-.6,2.1,'#344a44');
  }
 });
 tile(21,700,160,()=>{
  spaced('WET BENCH',6,77,61,3.5,C.ink);line(7,97,662,97,C.muted,2.4);
  spaced('PELAGIA    /    SPECIMEN PROCESSING',8,133,15,1.75,C.ink);
 });
 tile(22,310,190,()=>{
  spaced('PRESSURE',8,30,20,2.3);line(8,47,288,47,C.muted,2);
  label('ΔP',5,113,49,C.ink,'Georgia');label('18.6',105,114,48,C.ink,'Arial',600);label('bar',218,113,23,C.ink);
  spaced('EXTERNAL DIFFERENTIAL',7,161,10,1.25);
 });
 tile(23,650,170,()=>{
  spaced('HULL SERVICES',16,80,45,3.3,C.cream);line(16,101,626,101,'#bdc6ad',2);
  spaced('ENVIRONMENT   /   LOOP 02',16,139,16,2,C.cream);
 });
 tile(24,610,188,()=>{
  spaced('OBSERVATION',10,81,43,3.5,C.ink);line(10,107,575,107,C.muted,2.5);
  label('Northern transect     /     186 m',10,157,23,C.ink,'Georgia','italic');
 });
 tile(25,570,130,()=>{
  ctx.strokeStyle='#a7bbae';ctx.lineWidth=3;ctx.beginPath();ctx.arc(45,63,31,0,Math.PI*2);ctx.stroke();
  path([[27,74],[44,42],[61,74]],'#a7bbae',false,3);
  spaced('PELAGIA GLASSWORKS',98,57,21,2.1,'#b4c1b0');
  label('LAMINATED   /   PG–03   /   S.N. 0186',98,88,13,'#b4c1b0','Arial',550);
 });
 tile(26,590,140,()=>{
  // Narrow broken scuffs at hand height, printed against the underlying enamel.
  for(let j=0;j<32;j++){
   let x=45+random()*360,y=39+random()*62,w=5+random()*68;
   let stroke=random()>.47?'#8e9f90':'#526c60';
   path([[x,y],[x+w*.52,y-1.8],[x+w,y-1.4-random()*2]],stroke,false,1.35+random()*2.4);
  }
  for(let j=0;j<26;j++){let x=50+random()*390,y=46+random()*62;rect(x,y,1+random()*5,1.4,'#899785');}
 });
 return atlas;
};


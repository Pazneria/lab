'use strict';
S.makeAtlas = function(){
  const canvas=document.createElement('canvas');canvas.width=2048;canvas.height=2048;
  const ctx=canvas.getContext('2d'),rects=S.atlasRects={},rng=S.random(589),ink='#293a3c',paper='#e4e0c8';
  let X=3,Y=3,row=0;
  function tile(name,w,h,paint){
    if(X+w+3>2048){X=3;Y+=row+5;row=0}if(Y+h+3>2048)throw Error('Atlas full at '+name);
    const image=document.createElement('canvas');image.width=w;image.height=h;const c=image.getContext('2d');
    const rect=(x,y,a,b,col)=>{c.fillStyle=col;c.fillRect(x,y,a,b)};
    const txt=(str,x,y,size,col=ink,weight=600,font='Arial')=>{c.fillStyle=col;c.font=weight+' '+size+'px '+font;c.fillText(str,x,y)};
    const line=(pts,col,l=1,close=false)=>{c.beginPath();pts.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));if(close)c.closePath();c.strokeStyle=col;c.lineWidth=l;c.stroke()};
    const disc=(x,y,r,col)=>{c.fillStyle=col;c.beginPath();c.arc(x,y,r,0,S.TAU);c.fill()};
    paint({c,w,h,rect,txt,line,disc});
    ctx.drawImage(image,X,Y);rects[name]=[(X+.5)/2048,(Y+.5)/2048,(X+w-.5)/2048,(Y+h-.5)/2048];
    X+=w+5;row=Math.max(row,h);
  }
  function mark(c,x,y,s,col){c.save();c.translate(x,y);c.scale(s,s);c.strokeStyle=col;c.lineWidth=2.8;c.lineJoin='round';
    for(let j=0;j<3;j++){c.beginPath();let pts=[[0,35],[9,28],[15,10],[24,3],[32,8],[34,20],[43,28],[51,29]];pts.forEach(([a,b],i)=>{let k=[1,.79,.57][j],xx=23+(a-23)*k,yy=b+8*j;i?c.lineTo(xx,yy):c.moveTo(xx,yy)});c.stroke()}c.restore()}
  tile('brand',640,156,({c,rect,txt,line})=>{
    rect(0,0,640,156,'#e4e1cd');mark(c,28,31,1.55,'#323e3e');rect(133,19,2,119,'#82867a');
    txt('I S O B A R',158,85,63,'#25383a',750);txt('P O L A R   F I E L D   S U R V E Y',162,126,19,'#394a47',650);
    line([[580,33],[610,33],[610,61]],'#b85131',5);
  });
  tile('number',280,202,({rect,txt,line})=>{txt('05',6,162,184,'#e9e3cf',800);rect(12,179,248,3,'#dbd8c5');txt('S T A T I O N',16,200,17,'#e9e3cf')});
  tile('port',440,78,({rect,txt})=>{rect(0,0,440,78,'#263c40');rect(9,10,8,58,'#ecaa61');txt('MAIN ACCESS',31,42,31,'#e8e5cc',700);txt('FIELD LAB   /   S-05',32,64,14,'#bccbc1',600,'monospace');txt('01',355,60,50,'#e0d7ba')});
  tile('west',440,78,({rect,txt})=>{rect(0,0,440,78,'#e0d6bd');txt('ISOBAR',16,53,43,'#2e4140',700);rect(218,10,2,57,'#69726a');txt('OBSERVATORY',237,35,21);txt('77° 18′ N  /  015° 42′ E',239,58,12,ink,600,'monospace')});
  tile('map',740,528,({c,w,h,rect,txt,line,disc})=>{
    rect(0,0,w,h,'#e5dfca');txt('KARSTFJELL',24,49,38,ink,700);txt('GLACIAL SURVEY   /   SHEET 24 NE',27,71,13,ink,700,'monospace');
    txt('05',653,58,50,'#af533a');rect(20,82,700,1,ink);c.save();c.beginPath();c.rect(22,95,696,364);c.clip();
    const tints=['#afc9c4','#c2d2c7','#d1d5bd','#dedbc1','#d1d0b3','#cbcab0','#c4c4a8','#bcc1a6'];
    function hgt(x,y){x/=87;y/=81;return Math.sin(x*.79+y*.64)+.60*Math.cos(y*1.72-x*.37)+.50*Math.sin(x*2.18+y*.73)+.27*Math.cos(x*3.17-y*2.1)+.13*Math.sin(y*4.11+x*3.93)+.06*Math.cos(y*6.3+x*5.7)}
    const step=5,cols=143,rows=76,hs=Array.from({length:rows},(_,j)=>Array.from({length:cols},(_,i)=>hgt(i*step,j*step)));
    for(let j=0;j<rows-1;j++)for(let i=0;i<cols-1;i++){let hv=hs[j][i];rect(22+i*step,95+j*step,5,5,tints[Math.max(0,Math.min(7,Math.floor((hv+.72)*2.42)))])}
    for(let level=-1.9;level<2.5;level+=.13){
      c.beginPath();
      for(let j=0;j<rows-1;j++)for(let i=0;i<cols-1;i++){
        const vv=[hs[j][i],hs[j][i+1],hs[j+1][i+1],hs[j+1][i]],xx=[0,1,1,0],yy=[0,0,1,1];let hit=[];
        for(let k=0;k<4;k++){let m=(k+1)%4;if((vv[k]<level)===(vv[m]<level))continue;let f=(level-vv[k])/(vv[m]-vv[k]);hit.push([22+(i+xx[k]+(xx[m]-xx[k])*f)*step,95+(j+yy[k]+(yy[m]-yy[k])*f)*step])}
        if(hit.length>=2){c.moveTo(...hit[0]);c.lineTo(...hit[1])}
      }
      c.strokeStyle=level<-.72?'#879e99':'#9c9f88';c.lineWidth=.70;c.stroke();
    }
    for(let j=0;j<9;j++)line([[20+j*87,90],[20+j*87,465]],'#72898066',.8);
    for(let j=0;j<6;j++)line([[15,93+j*73],[726,93+j*73]],'#72898066',.8);
    c.setLineDash([5,4]);line([[155,361],[237,302],[368,325],[429,236],[533,213],[610,170]],'#9c4836',2);c.setLineDash([]);
    [[155,361],[237,302],[368,325],[429,236],[533,213],[610,170]].forEach(([x,y],i)=>{disc(x,y,4,'#ad5039');txt('T'+(i+1),x+5,y-5,10,ink,600,'monospace')});
    txt('V E S T E R I S E N',58,169,13,'#4b6866');txt('Karstfjell   814',461,358,12,ink,500,'Georgia');c.restore();
    txt('ISOBAR  /  FIELD CARTOGRAPHY',24,493,16);txt('LOCAL GRID 24   •   CONTOUR INTERVAL 25 M',25,513,11,ink,500,'monospace');
    for(let i=0;i<4;i++)rect(535+i*40,486,40,6,i%2?paper:ink);txt('0',533,508,11);txt('2 km',672,508,11);
  });
  tile('graph',520,292,({rect,txt,line,disc})=>{
    rect(0,0,520,292,'#142c30');rect(0,0,520,42,'#25474a');txt('ISOBAR  /  LOGGER 02',16,28,18,'#bed4c3',600,'monospace');disc(489,20,4,'#e5a455');
    txt('BAROMETRIC PRESSURE',18,69,13,'#9bbab1',600,'monospace');txt('986.4',16,120,47,'#c8dfcb',500,'monospace');txt('hPa',175,118,17,'#8fafa9');
    for(let j=0;j<7;j++)line([[18,142+j*18],[500,142+j*18]],'#355552',1);
    for(let i=0;i<17;i++)line([[18+i*30,139],[18+i*30,253]],'#355552',1);
    let p=[];for(let i=0;i<237;i++)p.push([18+i*2,217+Math.sin(i*.049)*14+Math.sin(i*.16)*6-i*.17+(rng()-.5)*6]);line(p,'#dcb17a',2);
    txt('18:00 UTC',17,275,13,'#8faea5',500,'monospace');txt('06:00 UTC',424,275,13,'#8faea5',500,'monospace');
  });
  tile('log',258,344,({rect,txt,line})=>{
    rect(0,0,258,344,'#e5e0c9');txt('FIELD RECORD',18,40,25);txt('SNOW PIT  /  PROFILE 018',18,61,11,'#5d6b64',600,'monospace');
    rect(17,73,223,3,ink);let y=90;for(let i=0;i<9;i++,y+=23){line([[18,y+8],[238,y+8]],'#9da89c');txt(String(i*5).padStart(2,'0')+' cm',20,y+4,10,ink,500,'monospace');line([[95,y+1],[111,y-2],[126,y+3],[138,y],[148,y+1],[158,y-2]],'#617371',1.3)}
    line([[81,80],[81,288]],'#8b968c');txt('K. LARSEN  /  17 XI',18,320,11,'#7c6955',600,'monospace');
  });
  tile('dial',138,138,({c,disc,txt,line})=>{
    disc(69,69,68,'#333c3b');disc(69,69,62,'#c7c9b6');disc(69,69,56,'#e7e4d2');
    for(let i=0;i<=40;i++){let a=(-222+i*6.6)*Math.PI/180,lr=i%5?5:10;line([[69+51*Math.cos(a),69+51*Math.sin(a)],[69+(51-lr)*Math.cos(a),69+(51-lr)*Math.sin(a)]],ink,i%5?1:2)}
    txt('hPa',58,94,12);txt('ISOBAR',46,110,10);line([[65,74],[97,30]],'#a63e2e',3);disc(69,69,5,ink);
  });
  tile('hazard',320,52,({c,rect,txt})=>{rect(0,0,320,52,'#e1ad58');for(let j=-1;j<5;j++){c.fillStyle='#38423d';c.beginPath();c.moveTo(j*15,0);c.lineTo(j*15+7,0);c.lineTo(j*15-9,52);c.lineTo(j*15-16,52);c.fill()}txt('MIND THE STEP',72,35,25,'#273632',700)});
  tile('core',344,136,({rect,txt,line})=>{rect(0,0,344,136,paper);txt('CRYOSPHERE UNIT',13,31,21);rect(12,42,317,2,ink);txt('CORE  04 / A',12,78,31);txt('DEPTH    14.2 — 14.6 m',14,108,17,ink,600,'monospace');txt('KARSTFJELL   •   TRANSECT N',14,126,10)});
  tile('scope',260,55,({rect,txt})=>{rect(0,0,260,55,'#3f5550');txt('OPTIK  /  M-8',15,38,29,'#e6e4cf')});
  tile('tags',448,70,({rect,txt})=>{rect(0,0,448,70,'#d6d6c6');txt('FIELD INSTRUMENTS',12,34,25);txt('SURVEY EQUIPMENT  /  STORE 02',13,57,13,ink,600,'monospace')});
  tile('bunk',330,72,({rect,txt})=>{rect(0,0,330,72,'#c9cdbb');txt('BERTH  01',12,42,34);txt('ISOBAR   /   WINTER PARTY',14,62,12,ink,600,'monospace')});
  tile('radio',244,76,({rect,txt,line})=>{rect(0,0,244,76,'#a7b6a1');txt('14.283',10,52,48,'#263d35',600,'monospace');txt('MHz',185,53,17);line([[10,62],[227,62]],ink,2)});
  tile('keyboard',320,116,({rect})=>{rect(0,0,320,116,'#373f3d');for(let j=0;j<5;j++)for(let i=0;i<(j===4?7:13);i++){let k=j===4?42:23;rect(8+i*k,8+j*19,k-4,14,'#58615c');rect(11+i*k,11+j*19,4,2,'#c1c5b6')}});
  tile('safety',256,146,({rect,txt})=>{rect(0,0,256,146,'#ced3bf');rect(0,0,256,35,'#48695e');txt('FIELD SAFETY',11,25,19,'#eff1de');txt('FIRST AID',10,82,30);txt('MEDICAL KIT  /  1',12,115,14,ink,600,'monospace');rect(192,59,17,52,'#ab513d');rect(175,76,52,17,'#ab513d')});
  tile('exit',242,64,({rect,txt})=>{rect(0,0,242,64,'#34665b');txt('←  EXIT',18,47,43,'#e6e5d1')});
  tile('photo',250,156,({c,rect})=>{rect(0,0,250,156,'#ece5d1');rect(9,8,232,122,'#a7bbbf');for(let j=0;j<3;j++){c.beginPath();c.moveTo(9,124);for(let x=9;x<=241;x+=4)c.lineTo(x,55+j*15+Math.sin(x*.028+j*2)*20+Math.sin(x*.08+j)*13+rng()*4);c.lineTo(241,130);c.lineTo(9,130);c.fillStyle=['#8a9ea2','#687e86','#4b6069'][j];c.fill()}});
  tile('service',300,98,({rect,txt})=>{rect(0,0,300,98,'#303e3d');txt('S-05  /  MECH.',13,39,29,'#dde1c9');txt('VENTILATION   24 VDC',15,68,17,'#bcc9b9',500,'monospace');txt('INSPECT FILTER MONTHLY',15,86,11,'#aab8ac',500,'monospace')});
  tile('cargo',394,132,({rect,txt,line})=>{
    rect(0,0,394,132,'#d6d4bc');txt('ISOBAR   /   FIELD FREIGHT',12,25,17,ink,700,'monospace');
    rect(12,35,370,2,'#68786c');txt('SAMPLE RETURN',11,76,36);txt('KARSTFJELL   S-05',13,107,18,ink,600,'monospace');
    for(let i=0;i<27;i++)rect(267+i*4,89,1+(i*7%3),29,'#46554a');
  });
  return canvas;
};

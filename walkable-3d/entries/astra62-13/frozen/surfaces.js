'use strict';
const P=(()=>{
 const m=G.mat;
 return {
  iron:m('#435657',1),ironDark:m('#2e3d40',1),steel:m('#839197',2),zinc:m('#b4bbb4',2),black:m('#283334',7),
  rail:m('#525d58',1),cream:m('#e1dfcf',10),white:m('#e9e7d7',0),rubber:m('#232b2c',7),cable:m('#545d5e',8),
  copper:m('#96694e',2),concrete:m('#a3a59b',5),foundation:m('#777d76',5),floor:m('#888c86',6),
  wet:m('#64716d',6),darkFloor:m('#535c59',6),timber:m('#ae8864',3),plank:m('#ad8a64',4),cedar:m('#856950',3),
  edge:m('#c9a24d',10),gold:m('#dea94c',10),wheel:m('#c29553',1),wheelLight:m('#d8b372',1),enamel:m('#be5036',10),
  vermilion:m('#d35b40',10),redDark:m('#873b31',1),body:m('#d6d5c6',10),panel:m('#738880',1),
  window:m('#93b4b8',12),cabinGlass:m('#a3bec0',22),glow:m('#ffe2a1',13),led:m('#aaddbc',13),
  screen:m('#3a4843',1),grate:m('#5c6465',9),roof:m('#536361',1),mesh:m('#7b827d',19),paint:m('#d1b76d',20),
  mountain:m('#748484',11),label:m('#ffffff',14),needle:m('#314748',16)
 };
})();
const Signs=(()=>{
 const rects={}, W=2048,H=2048;
 function build(){
 const canvas=document.createElement('canvas');canvas.width=W;canvas.height=H;const c=canvas.getContext('2d',{alpha:false});
 const paper='#e7e2cc',green='#263e40',gold='#e6b357',red='#a74532',grey='#a3b2a5';
 let n=0,tw=512,th=256;
 function tile(key,background,draw){let x=(n%4)*tw,y=Math.floor(n/4)*th;n++;c.save();c.translate(x,y);c.fillStyle=background;c.fillRect(0,0,tw,th);c.beginPath();c.rect(0,0,tw,th);c.clip();draw();c.restore();rects[key]=[(x+2)/W,(y+2)/H,(x+tw-2)/W,(y+th-2)/H]}
 function text(t,x,y,s,color=paper,weight=700,font='Arial'){c.fillStyle=color;c.font=weight+' '+s+'px '+font;c.fillText(t,x,y)}
 function rule(x,y,w,h=3,col=paper){c.fillStyle=col;c.fillRect(x,y,w,h)}
 function stroke(points,col,line=4,close=false){c.beginPath();points.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));if(close)c.closePath();c.lineJoin='round';c.lineCap='round';c.strokeStyle=col;c.lineWidth=line;c.stroke()}
 function logo(x,y,s,col){stroke([[0,48],[22,8],[36,31],[49,1],[73,48],[0,48]].map(([a,b])=>[x+a*s,y+b*s]),col,4*s);stroke([[13,47],[28,20],[34,28],[42,17]].map(([a,b])=>[x+a*s,y+b*s]),col,3*s)}
 function arrow(x,y,s,col,dir=1){stroke([[x-18*s*dir,y],[x+16*s*dir,y],[x+3*s*dir,y-13*s]],col,5*s);stroke([[x+16*s*dir,y],[x+3*s*dir,y+13*s]],col,5*s)}
 function border(col=paper){c.strokeStyle=col;c.lineWidth=2;c.strokeRect(12,12,488,232)}
 function top(t,col=gold){text(t,26,43,20,col,700);rule(26,56,458,2,col)}
 tile('terminal',green,()=>{top('N G B     /     LUFTSEILBAHN');logo(27,95,1.05,gold);text('NORDGRAT',114,142,61);text('B E R G S T A T I O N',117,179,24);text('2 1 4 8   m   ü. M.',117,218,19,grey)});
 tile('drive',green,()=>{top('MASCHINENHALLE     /     01');text('Antriebsrad',24,137,68);text('DRIVE SHEAVE   ·   Ø 4 320 mm',26,192,28,gold);rule(28,215,75,8,gold)});
 tile('board',paper,()=>{top('NORDGRATBAHN     /     BERGSTATION',green);text('Einstieg',25,145,83,green);arrow(434,114,1.8,green);text('QUAI  01      /      BOARDING',29,211,29,green)});
 tile('lookout',green,()=>{top('NORDGRAT     /     2148 M');text('Aussicht',23,149,78);arrow(438,113,1.7,gold);text('BELVÉDÈRE    /    VIEWPOINT',26,206,26,grey)});
 tile('back',green,()=>{top('N G B     /     BERGSTATION');arrow(65,125,1.75,gold,-1);text('Ausgang',121,150,73);text('SORTIE   /   EXIT',124,207,27,grey)});
 tile('car',red,()=>{logo(24,76,1.44,paper);text('NORDGRAT',151,133,58);text('B E R G B A H N E N',154,177,23);rule(155,193,306,3)});
 tile('number',red,()=>{text('01',32,203,218,paper,650);text('N G B',317,115,44);rule(320,130,143,3);text('2 1 4 8',317,173,33)});
 tile('warning','#dcb247',()=>{border('#303b35');stroke([[44,178],[101,65],[162,178],[44,178]],green,9);stroke([[106,95],[88,131],[111,127],[97,155]],green,7);text('ACHTUNG',191,108,50,green);text('Hochspannung',191,155,35,green);text('ZUTRITT VERBOTEN',192,194,25,green)});
 tile('nameplate','#475555',()=>{border('#bcc6b8');text('H. WEISS  &  SOHN',27,65,42);text('SEILBAHNTECHNIK   /   URI',29,102,24);rule(27,118,454,2);text('TYPE   NG–42              BJ.   1976',29,159,27);text('FABR.  047 / 218         680 kW',29,204,27)});
 tile('door',paper,()=>{top('N G B    /    KABINE 01',green);text('Automatische Tür',24,125,52,green);text('FREIHALTEN',27,190,45,red);arrow(433,169,1.4,red)});
 tile('panel',green,()=>{top('TECHNISCHER DIENST');text('Steuerung',25,140,62);text('ANTRIEB    /    FELD  03',28,201,29,grey)});
 tile('map','#d9d6bb',()=>{const rand=G.seeded(127);for(let j=0;j<22;j++){const pts=[];for(let x=-8;x<530;x+=4){const y=55+j*8+18*Math.sin(x/76+j*.19)+9*Math.sin(x/26+j*.3)+3*Math.cos(x/12+j*.18);pts.push([x,y])}stroke(pts,'#a9b2a0',1.5)}
 rule(0,0,512,49,green);text('NORDGRAT  /  STRECKENPLAN',20,34,25,paper);stroke([[50,209],[195,161],[279,145],[424,69]],red,6);for(const [x,y] of [[50,209],[195,161],[424,69]]){c.fillStyle=paper;c.beginPath();c.arc(x,y,7,0,7);c.fill();c.strokeStyle=red;c.lineWidth=3;c.stroke()}text('TALSTATION',40,242,18,green);text('NORDGRAT   2148 m',267,101,20,green);text('Mittelturm',134,145,17,green)});
 tile('panorama','#dfdecc',()=>{top('PANORAMA   /   NORDGRAT  2148 m',green);const pts=[];for(let x=0;x<520;x+=3){let y=163+14*Math.sin(x/18)+12*Math.cos(x/39)-37*Math.pow(Math.max(0,Math.cos((x-109)/41)),6)-54*Math.pow(Math.max(0,Math.cos((x-339)/36)),10)+4*Math.sin(x*.8);pts.push([x,y])}stroke(pts,'#506d67',4);for(const [x,t] of [[80,'Rothorn'],[254,'Tannjoch'],[391,'Gipfelgrat']]){rule(x,151,2,47,'#76897b');text(t,x-30,222,17,green)}});
 tile('speed',paper,()=>{border(green);text('SEILGESCHWINDIGKEIT',23,46,25,green);for(let i=0;i<=20;i++){const a=Math.PI*(.98+i/20*1.04);stroke([[257+155*Math.cos(a),202+122*Math.sin(a)],[257+(i%5?145:134)*Math.cos(a),202+(i%5?116:105)*Math.sin(a)]],green,i%5?2:4)}stroke([[255,205],[132,139]],red,5);text('0',80,220,23,green);text('12',400,220,23,green);text('m/s',231,232,23,green)});
 tile('distance',green,()=>{text('2148',18,175,155,paper,600);text('m',389,166,68,gold);text('H Ö H E   Ü B E R   M E E R',26,226,24,grey)});
 tile('service',paper,()=>{top('N G B    /    REVISIONSBUCH',green);for(let i=0;i<6;i++){rule(23,86+i*25,465,1,'#9baba0');text(['DATUM','14.10','18.10','21.10','25.10','01.11'][i],27,81+i*25,13,green);text(['ARBEIT','Seilauflage geprüft','Lager geschmiert','Sichtkontrolle','Bremsprobe','Ölstand geprüft'][i],129,81+i*25,14,green)}});
 tile('bay',green,()=>{text('01',14,207,217,paper,650);text('QUAI',297,113,49,gold);rule(300,128,175,4,gold);text('EINSTIEG',300,178,31)});
 tile('noentry','#b14c35',()=>{border();text('HALT',22,143,119);text('BETRIEBSBEREICH',25,206,35)});
 tile('guide',paper,()=>{top('N G B     /     STATION  02',green);text('Maschinenhalle',24,129,57,green);text('SALLE DES MACHINES',27,190,32,green)});
 return canvas
 }
 function label(key,center,right,up,w,h){const rect=rects[key];if(!rect)throw Error('Sign missing '+key);const [x,y,X,Y]=rect;const r=G.mul(right,w/2),u=G.mul(up,h/2);let a=G.sub(G.sub(center,r),u),b=G.sub(G.add(center,r),u),cc=G.add(G.add(center,r),u),d=G.add(G.sub(center,r),u);G.quad(a,b,cc,d,P.label,[[x,Y],[X,Y],[X,y],[x,y]])}
 return {build,label,rects}
})();

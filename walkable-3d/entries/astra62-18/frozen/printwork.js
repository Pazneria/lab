// Original printed material, engravings, work charts and two coastal linocuts.
export function printedAtlas(){
 const size=512,canvas=document.createElement('canvas');canvas.width=canvas.height=size*4;
 const c=canvas.getContext('2d',{alpha:false});
 const ink='#233e40',pine='#426966',cream='#e3dec9',brass='#b99965',rust='#b76342',paper='#ece4cf',graph='#91a79a';
 const sans='Barlow, Bahnschrift, "Segoe UI", sans-serif',mono='"IBM Plex Mono", Consolas, monospace',serif='Baskervville, Georgia, serif';
 function rect(x,y,w,h,color){c.fillStyle=color;c.fillRect(x,y,w,h);}
 function line(pts,color,width=1,close=false){if(!pts.length)return;c.beginPath();c.moveTo(...pts[0]);for(let i=1;i<pts.length;i++)c.lineTo(...pts[i]);if(close)c.closePath();c.strokeStyle=color;c.lineWidth=width;c.stroke();}
 function poly(pts,color){c.beginPath();c.moveTo(...pts[0]);for(let i=1;i<pts.length;i++)c.lineTo(...pts[i]);c.closePath();c.fillStyle=color;c.fill();}
 function circle(x,y,r,color,fill=false,w=1){c.beginPath();c.arc(x,y,r,0,Math.PI*2);if(fill){c.fillStyle=color;c.fill();}else{c.strokeStyle=color;c.lineWidth=w;c.stroke();}}
 function txt(s,x,y,sz,col=ink,font=sans,weight=400,align='left'){c.font=weight+' '+sz+'px '+font;c.textAlign=align;c.fillStyle=col;c.fillText(s,x,y);}
 function cell(id,w,h,bg,fn){c.save();const x=id%4*size,y=Math.floor(id/4)*size;c.translate(x,y);c.scale(size/w,size/h);c.beginPath();c.rect(0,0,w,h);c.clip();rect(0,0,w,h,bg);fn();c.restore();}
 function emblem(x,y,r,col){circle(x,y,r,col,false,Math.max(1.4,r*.055));for(let j=0;j<3;j++){
  const pts=[];for(let i=0;i<=24;i++){const t=i/24;pts.push([x+(t-.5)*r*1.43,y+r*(.15+j*.20)-Math.sin(t*Math.PI*2-.33)*r*.13]);}line(pts,col,r*.06);}
  line([[x-r*.53,y-r*.13],[x+r*.01,y-r*.68],[x+r*.48,y-r*.12]],col,r*.07);}
 function ticks(x,y,w,h,count,color){for(let i=0;i<=count;i++){let xx=x+w*i/count;line([[xx,y],[xx,y+(i%5===0?h:h*.44)]],color,1.4);}}
 function random(seed){return ()=>((seed=(Math.imul(seed,1664525)+1013904223)>>>0)/4294967296);}
 cell(0,700,305,'#294449',()=>{
  rect(17,19,666,267,'#a59875');rect(20,22,660,261,'#294449');
  emblem(84,107,39,'#d3c39c');txt('N A C R E',152,91,39,cream,sans,600);
  txt('PELAGIC SURVEY VESSEL',153,120,17,'#c0c9ba',mono);
  line([[46,151],[654,151]],'#8c9a87',2);
  txt('L. SERRAT',46,219,50,paper,sans,500);txt('CAPTAIN   /   PRIVATE QUARTERS',48,254,17,cream,mono);
  txt('04',643,227,79,brass,sans,400,'right');
 });
 cell(1,940,496,'#e9dfc7',()=>{
  // Two-block coastal print made for the captain's home port.
  c.save();c.beginPath();c.rect(24,22,892,389);c.clip();rect(24,22,892,389,'#dac9a7');
  circle(704,134,68,'#cb764d',true);circle(704,134,75,'#ba9876',false,1.3);
  for(let i=0;i<9;i++)line([[24,53+i*9],[343-i*15,53+i*9]],'#cbbd9f',1.6);
  poly([[0,216],[69,207],[125,215],[189,194],[273,200],[321,180],[355,185],[435,155],[470,158],[573,113],[647,139],[690,131],[840,194],[944,168],[944,420],[0,420]],'#97a89a');
  poly([[0,259],[86,227],[152,235],[238,213],[338,234],[414,210],[487,216],[568,189],[626,190],[681,167],[783,157],[841,143],[944,176],[944,410],[0,410]],'#607f77');
  poly([[0,256],[146,256],[203,248],[296,253],[399,239],[489,245],[531,238],[613,244],[698,235],[791,236],[865,222],[945,232],[945,418],[0,418]],'#729795');
  poly([[0,232],[58,207],[90,209],[128,190],[173,199],[201,186],[249,202],[253,221],[292,226],[285,244],[337,245],[324,256],[385,263],[342,273],[265,277],[233,290],[0,298]],'#3c5b57');
  const rr=random(17);for(let i=0;i<110;i++){const y=257+rr()*155,x=rr()*930,w=8+rr()*98;
   if(x>336||y>294)line([[x,y],[x+w*.42,y-1.7],[x+w,y-.6]],i%4===0?'#bbbea6':'#537e7f',1+rr()*1.3);}
  poly([[528,414],[580,386],[620,385],[672,357],[716,356],[725,347],[791,340],[805,328],[865,321],[903,297],[944,285],[944,420]],'#b97e54');
  poly([[616,414],[682,391],[717,390],[763,371],[793,375],[864,346],[944,341],[944,421]],'#815c45');
  for(let i=0;i<23;i++){const x=679+rr()*250,y=374+rr()*34;line([[x,y],[x+8,y-4]],'#d5a577',2);}
  // A lone red buoy sits off the point.
  rect(490,273,3,15,'#524f40');poly([[485,287],[499,287],[496,292],[488,292]],rust);
  for(const [x,y,k] of [[357,102,1],[389,91,.78],[400,109,.55]])line([[x-8*k,y-3*k],[x,y],[x+9*k,y-5*k]],'#53675e',1.9);
  c.restore();txt('CALA SERENA',28,459,31,ink,sans,500);
  txt('LITTORAL STUDIES     /     Nº 03',909,450,15,'#5b6d60',mono,400,'right');txt('BLOCK PRINT  ·  E. SERRAT',909,473,11,'#687567',mono,400,'right');
 });
 cell(2,860,401,'#172c32',()=>{
  rect(18,18,824,2,'#68877f');txt('NACRE   /   SURVEY OFFICE',24,51,17,'#a3c0ac',mono);
  txt('PASSAGE PLAN',26,91,37,'#d7dfc7',sans,500);
  txt('321.7°',822,83,37,'#d3b787',mono,400,'right');txt('COURSE TRUE',823,104,12,'#9daea0',mono,400,'right');
  const a=27,b=119,w=536,h=219;
  rect(a,b,w,h,'#233c41');
  for(let i=0;i<12;i++)line([[a+i*w/11,b],[a+i*w/11,b+h]],'#3b5354',1);
  for(let i=0;i<6;i++)line([[a,b+i*h/5],[a+w,b+i*h/5]],'#405859',1);
  c.save();c.beginPath();c.rect(a,b,w,h);c.clip();
  for(let j=0;j<13;j++){c.beginPath();c.ellipse(220,285,68+j*13,23+j*5.6,-.39,0,Math.PI*2);c.strokeStyle=j%4===0?'#71938e':'#496665';c.lineWidth=1.3;c.stroke();}
  const points=[[55,303],[140,294],[221,255],[292,246],[361,199],[460,183],[529,145]];
  line(points,'#e1af76',2.7);
  for(let i=0;i<points.length;i++){circle(...points[i],4.2,'#edd5a6',true);txt(String(i+1).padStart(2,'0'),points[i][0]+8,points[i][1]-7,11,'#b9cab2',mono);}
  c.restore();const rr=random(217);for(let i=0;i<87;i++){const x=a+rr()*w,y=b+rr()*h;circle(x,y,.8+rr(),'#a9b7a2',true);}
  txt('WATCH  /  A',591,143,19,'#dac8a5',mono);
  for(const [i,t,n] of [[0,'PERIAPSIS','19.42'],[1,'SURVEY ARC','071 / 073'],[2,'WINDOW','06:40 Z']]){
   const y=170+i*59;line([[590,y],[825,y]],'#4a625f',1.2);txt(t,591,y+18,12,'#9ab6a6',mono);txt(n,591,y+43,21,'#d7dfc7',mono);}
  ticks(26,350,536,9,50,'#798d7c');txt('SERRAT  /  VERIFIED',27,382,15,'#a9bbab',mono);txt('NAVIGATION COPY   08.14',825,382,13,'#97b5aa',mono,400,'right');
 });
 cell(3,505,339,'#d6d3bd',()=>{
  rect(0,0,505,13,'#b46b49');txt('WATCH BILL',22,61,38,ink,sans,600);txt('07 / 14',480,53,17,ink,mono,400,'right');
  txt('DECK OFFICE     ·     CAPTAIN’S COPY',24,83,12,'#66786e',mono);
  const list=[['04:00','Sounding pass','SERRAT'],['06:40','Transfer window','IWATA'],['08:15','Survey debrief','SERRAT'],['11:30','Sample review','BAEZ'],['16:00','Evening relief','NAIR']];
  list.forEach(([tm,s,n],i)=>{const y=118+i*40;line([[23,y-16],[480,y-16]],'#9fa995',1.4);txt(tm,24,y+8,15,ink,mono);txt(s,105,y+9,19,ink);txt(n,478,y+8,12,'#4b675f',mono,400,'right');});
  line([[24,299],[480,299]],'#8a9d8e',1.5);txt('RELIEF SIGNED',24,322,12,ink,mono);
  line([[326,319],[350,304],[346,318],[366,311],[357,322],[374,317],[392,308],[387,318],[410,316],[431,311]],'#596f77',1.8);
 });
 cell(4,776,444,paper,()=>{
  txt('PELAGOS   /   SOUNDING SHEET  XII',24,35,22,ink,sans,600);txt('L.S.   ·   1:42 000',753,34,12,ink,mono,400,'right');
  const L=21,T=51,W=734,H=347;
  const height=(x,y)=>.44*Math.sin(x*6.9+y*1.7)+.34*Math.cos(y*6.2-x*2.7)+.19*Math.sin(x*13.4+y*7.2)+.12*Math.cos(y*18.8+x*6.9)+.05*Math.sin(x*31.2-y*16.8)+.035*Math.cos(x*53+y*38);
  const levels=[-.72,-.53,-.36,-.18,0,.17,.29,.42,.51,.61,.73,.86,1.01];
  const fills=['#a1bab0','#a6beb4','#adc6b9','#b5c9ba','#bdcebc','#c5d2bf','#cfd6c0','#d6d7bd','#dcdac1','#e4dcc3','#dccaa6','#cfbb96','#c6af89','#bba682'];
  const nx=148,ny=73,arr=[];
  for(let j=0;j<=ny;j++){const row=[];for(let i=0;i<=nx;i++)row.push(height(i/nx,j/ny));arr.push(row);}
  for(let j=0;j<ny;j++){let last=-1,start=0;for(let i=0;i<=nx;i++){let k=0;while(k<levels.length&&arr[j][i]>levels[k])k++;if(k!==last||i===nx){if(i)rect(L+W*start/nx,T+H*j/ny,W*(i-start)/nx+.6,H/ny+.5,fills[last]);start=i;last=k;}}}
  c.save();c.beginPath();c.rect(L,T,W,H);c.clip();
  levels.forEach((iso,k)=>{c.beginPath();for(let j=0;j<ny;j++)for(let i=0;i<nx;i++){
   const a=arr[j][i],b=arr[j][i+1],d=arr[j+1][i],e=arr[j+1][i+1],p=[];
   const edge=(v1,v2,x1,y1,x2,y2)=>{if((v1>iso)===(v2>iso))return;let t=(iso-v1)/(v2-v1);p.push([L+(i+x1+(x2-x1)*t)*W/nx,T+(j+y1+(y2-y1)*t)*H/ny]);};
   edge(a,b,0,0,1,0);edge(b,e,1,0,1,1);edge(e,d,1,1,0,1);edge(d,a,0,1,0,0);
   for(let z=1;z<p.length;z+=2){c.moveTo(...p[z-1]);c.lineTo(...p[z]);}
  }c.strokeStyle=k===9?'#766c51':k>9?'#a18e6b':'#83a297';c.lineWidth=k===9?2.2:1.2;c.stroke();});
  for(let i=0;i<15;i++)line([[L+i*W/14,T],[L+i*W/14,T+H]],'#899c8e',.7);
  for(let j=0;j<8;j++)line([[L,T+j*H/7],[L+W,T+j*H/7]],'#899c8e',.7);
  const route=[[69,351],[185,297],[261,315],[370,238],[447,190],[587,229],[683,140]];c.setLineDash([6,5]);line(route,rust,2.3);c.setLineDash([]);
  route.forEach(([x,y],i)=>{circle(x,y,3.8,rust);txt(String.fromCharCode(65+i),x+8,y-5,12,ink,mono);});
  circle(681,109,30,ink,false,1);poly([[681,76],[676,109],[681,102],[686,109]],ink);line([[654,109],[709,109]],ink,1);txt('N',676,70,13,ink,mono);
  c.restore();txt('NORTH ARM  ·  TRANSECT B',23,426,14,ink,mono);ticks(570,411,178,11,10,ink);
 });
 cell(5,770,440,'#ded4b9',()=>{
  rect(12,9,362,422,'#eee4c9');rect(391,9,367,422,'#eae0c4');
  for(let i=0;i<12;i++){line([[27,80+i*27],[357,80+i*27]],'#b3bba9',.9);line([[407,80+i*27],[744,80+i*27]],'#b3bba9',.9);}
  txt('14 July',30,55,30,'#79573f',serif);txt('N A C R E',355,47,13,ink,mono,400,'right');
  txt('First light, outer arc.',32,107,23,'#485e60',serif);
  txt('A clean sounding at 06:40.',32,157,18,'#56696b',serif);
  txt('The cloud shelf broke just',32,186,18,'#56696b',serif);
  txt('as we came around.',32,212,18,'#56696b',serif);
  txt('Send the blue one home.',32,266,18,'#56696b',serif);
  line([[180,341],[204,308],[195,333],[225,317],[218,334],[237,328],[265,312],[253,333],[285,324],[321,318]],'#53676b',2);
  c.save();c.translate(567,182);c.rotate(-.055);
  rect(-134,-114,266,236,'#cdc3aa');rect(-132,-116,266,236,'#f6e9ce');
  rect(-120,-104,242,177,'#d1b692');circle(56,-55,26,'#e6c096',true);
  poly([[-120,-4],[-83,-30],[-48,-25],[-18,-45],[5,-32],[35,-40],[79,-16],[122,-23],[122,73],[-120,73]],'#809286');
  rect(-120,11,242,62,'#698c87');poly([[-120,20],[-90,-6],[-61,-9],[-53,2],[-13,6],[-40,17],[-73,19],[-120,36]],'#465d56');
  for(let i=0;i<6;i++)line([[-39+i*12,32+i*6],[65+i*7,31+i*6]],'#a9b8a1',1.9);
  txt('Serena, on the way out',-116,104,17,'#56645b',serif);
  rect(-34,-124,66,23,'#ceb988');c.restore();
  txt('HOME ANCHORAGE',413,348,17,ink,mono);txt('47° 12′ N   ·   008° 31′ W',414,379,17,'#53686b',mono);
 });
 cell(6,640,204,'#314c4c',()=>{rect(15,15,610,174,'#a49b7a');rect(18,18,604,168,'#314c4c');txt('FIELD ARCHIVE',33,88,48,cream,sans,500);txt('HYDROGRAPHY     /     SERIES 04',35,142,20,'#c6c7a9',mono);for(let i=0;i<17;i++)rect(520+(i%8)*8,45+Math.floor(i/8)*9,4,5,brass);});
 cell(7,656,176,'#c7c7b6',()=>{rect(17,15,12,146,rust);txt('OBSERVATION',48,78,46,ink,sans,600);txt('LAMINATED PORT   /   FRAME  06',50,127,20,ink,mono);emblem(587,85,38,'#4b6861');});
 cell(8,384,384,'#425d56',()=>{c.save();c.translate(192,174);emblem(0,0,100,'#c6b388');c.restore();txt('N A C R E',192,327,28,'#d0c39f',sans,600,'center');});
 cell(9,520,540,'#d5c9a9',()=>{
  rect(16,16,488,508,'#213f44');txt('THE TIDAL YEAR',36,64,31,'#dbceb0',serif);
  txt('S T U D I E S    I N    P H A S E',37,92,11,'#b7b899',mono);
  const cx=260,cy=281;for(let i=0;i<16;i++){c.beginPath();c.ellipse(cx,cy,126+i*3.34,117-i*2.55,-.50+i*.063,0,Math.PI*2);c.strokeStyle=i%4===0?'#bfa274':'#77988d';c.lineWidth=i%4===0?1.9:1;c.stroke();}
  for(let i=0;i<60;i++){const a=i*Math.PI/30,R=185;line([[cx+Math.cos(a)*R,cy+Math.sin(a)*R],[cx+Math.cos(a)*(R-(i%5===0?9:3)),cy+Math.sin(a)*(R-(i%5===0?9:3))]],'#adad8d',1);}
  circle(cx,cy,55,'#b66b49',true);circle(cx,cy,67,'#b38e67');
  for(let i=0;i<12;i++){const a=i*Math.PI/6-.44;circle(cx+155*Math.cos(a),cy+101*Math.sin(a),i%3===0?9:4.4,i%3===0?'#e2d4b2':'#b5bca4',true);}
  txt('SPRING  /  NEAP',38,486,13,'#c6c9b3',mono);txt('SERRAT  ·  02',481,486,13,'#c6c9b3',mono,400,'right');
 });
 cell(10,590,175,ink,()=>{txt('04  /  BERTH',21,107,65,cream,sans,500);});
 cell(11,388,485,'#e1d7bc',()=>{
  rect(18,18,352,376,'#ccad7c');circle(113,121,39,'#ddc296',true);
  poly([[18,219],[75,178],[129,203],[190,173],[244,190],[314,141],[370,153],[370,395],[18,395]],'#7d8b77');
  rect(18,231,352,164,'#76968e');poly([[18,235],[74,227],[135,237],[173,230],[249,240],[370,230],[370,250],[18,250]],'#abc0ac');
  poly([[135,309],[284,301],[268,316],[171,324]],'#3c5049');
  line([[221,302],[211,151]],'#554f3c',3.5);
  poly([[209,162],[214,292],[140,286]],'#eadbc0');poly([[217,180],[224,288],[274,287]],'#cba977');
  for(let i=0;i<7;i++)line([[51+i*16,341+i*5],[183+i*15,336+i*5]],'#a3b3a1',2);
  txt('Home, before dawn.',30,442,24,'#4d5e53',serif);txt('CALA SERENA  /  07',31,466,11,'#6d7365',mono);
 });
 cell(12,480,252,'#c8ba92',()=>{rect(9,9,462,234,'#657768');rect(13,13,454,226,'#c8ba92');txt('SOUNDINGS',26,92,57,ink,sans,500);txt('FIELD NOTES   /   VOL. IV',29,139,22,ink,mono);line([[28,165],[448,165]],ink,2);txt('L. SERRAT',30,203,22,ink,mono);});
 cell(13,400,160,ink,()=>{txt('06:40',200,115,99,cream,mono,400,'center');});
 cell(14,740,405,'#dfd7bd',()=>{
  rect(13,13,714,379,'#a69e80');rect(16,16,708,373,'#dfd7bd');
  txt('CUTTER Nº 6',33,67,34,ink,serif);txt('LINES PLAN   /   SERENA YARD',706,61,14,ink,mono,400,'right');
  for(let j=0;j<7;j++)line([[31,121+j*30],[708,121+j*30]],'#b3b39c',.9);
  for(let i=0;i<17;i++)line([[54+i*38,97],[54+i*38,318]],'#bbbaa2',.9);
  for(let k=0;k<10;k++){const pts=[];for(let i=0;i<=90;i++){const t=i/90;pts.push([54+t*622,193+(56-k*3.78)*Math.sin(Math.PI*t)**.78-16*t*t-17*t**7]);}line(pts,k%3===0?ink:'#768c7b',1.4);}
  line([[56,193],[72,226],[179,250],[373,259],[543,244],[650,202],[676,162]],ink,2);
  for(let i=0;i<=16;i++){const t=i/16,x=54+t*622;line([[x,191-13*t*t],[x,193+54*Math.sin(t*Math.PI)**.78-16*t*t-17*t**7]],'#809382',1);}
  line([[344,193],[338,94],[346,95],[353,194]],'#7f7257',2);line([[112,190],[340,98],[640,164]],'#84978b',1.1);
  ticks(57,292,618,12,64,ink);txt('LOA   10.8 M',35,354,18,ink,mono);txt('HALF-BREADTH & PROFILE   ·   1 / 48',705,355,15,ink,mono,400,'right');
 });
 cell(15,650,400,ink,()=>{txt('NACRE   /   DUTY COPY',29,55,23,cream,mono);emblem(330,233,112,brass);});
 return canvas;
}

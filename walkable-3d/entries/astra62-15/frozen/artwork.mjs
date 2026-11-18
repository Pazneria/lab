// Original block-print designs, cartography and material swatches. All drawing coordinates
// use a 512-unit sheet, so the same small atlas serves frames, the quilt and the writing table.
import {T,PI,TAU} from './mesh.mjs'
const S=512
let g,seed
function ran(a=0,b=1){seed=(Math.imul(seed,1664525)+1013904223)>>>0;return a+(b-a)*seed/4294967296}
function rect(x,y,w,h,c){g.fillStyle=c;g.fillRect(x,y,w,h)}
function path(p,c,stroke,width=1,close=true){g.beginPath();g.moveTo(...p[0]);for(let i=1;i<p.length;i++)g.lineTo(...p[i]);if(close)g.closePath();if(c){g.fillStyle=c;g.fill()}if(stroke){g.lineWidth=width;g.strokeStyle=stroke;g.stroke()}}
function line(p,c,w=1){path(p,null,c,w,false)}
function ellipse(x,y,rx,ry,c,r=0,stroke=null,sw=1){g.beginPath();g.ellipse(x,y,rx,ry,r,0,TAU);if(c){g.fillStyle=c;g.fill()}if(stroke){g.strokeStyle=stroke;g.lineWidth=sw;g.stroke()}}
function text(str,x,y,size,c,face='Georgia',align='center',style=''){g.fillStyle=c;g.textAlign=align;g.font=style+' '+size+'px '+face;g.fillText(str,x,y)}
function framed(x,y,w,h,c,th=1){g.strokeStyle=c;g.lineWidth=th;g.strokeRect(x,y,w,h)}
function diamond(x,y,w,h,c){path([[x-w,y],[x,y-h],[x+w,y],[x,y+h]],c)}
function star(x,y,r,c,p=4,ang=0){path(Array.from({length:p*2},(_,i)=>{const a=i*PI/p+ang;return [x+r*(i%2?.27:1)*Math.cos(a),y+r*(i%2?.27:1)*Math.sin(a)]}),c)}
function stamp(x,y,r,col){ellipse(x,y,r,r,null,0,col,1.4);ellipse(x,y,r*.84,r*.84,null,0,col,.6);star(x,y,r*.65,col,4,PI/2);ellipse(x,y,r*.22,r*.22,col)}
function ornament(x,y,w,h,c){framed(x,y,w,h,c,1.3);framed(x+5,y+5,w-10,h-10,c,.6);for(const xx of [x,x+w])for(const yy of [y,y+h]){diamond(xx,yy,5,5,c);ellipse(xx,yy,1.4,1.4,'#e1c698')}}
function grain(amount,alpha=1){const img=g.getImageData(0,0,S,S),a=img.data;for(let i=0;i<a.length;i+=4){const n=(ran()+ran()-1)*amount*alpha;for(let k=0;k<3;k++)a[i+k]+=n}g.putImageData(img,0,0)}
function paper(bg='#e5d5b2'){rect(0,0,S,S,bg);for(let i=0;i<1500;i++){const x=ran(0,512),y=ran(0,512);line([[x,y],[x+ran(1,6),y+ran(-1,1)]],i%2?'#88663816':'#ffffff24',ran(.25,.9))}}
function silk(){g.save();g.globalAlpha=.052;for(let i=0;i<512;i+=2){line([[0,i+.5],[512,i+.5]],'#201c13',.9);line([[i+.5,0],[i+.5,512]],'#fff0ca',.76)}g.restore();grain(9)}
// Engraved atlas moth, with four separately coloured wings, scalloped margins and fine venation.
function moth(x,y,w,h,ink='#d5b974',wing='#f1dcac',base='#879580',accent='#b77749'){
 g.save();g.translate(x,y);g.scale(w/240,h/145);g.lineJoin='round'
 for(const side of [-1,1]){g.save();g.scale(side,1)
  g.beginPath();g.moveTo(3,3);g.bezierCurveTo(18,9,49,11,78,-3);g.bezierCurveTo(88,13,84,26,80,34);g.quadraticCurveTo(76,34,75,42);g.quadraticCurveTo(68,41,65,49);g.quadraticCurveTo(59,47,55,53);g.quadraticCurveTo(49,51,42,58);g.quadraticCurveTo(39,69,35,70);g.bezierCurveTo(33,54,13,39,3,11);g.closePath();g.fillStyle=base;g.fill();g.strokeStyle=ink;g.lineWidth=1.7;g.stroke()
  for(let i=0;i<6;i++){let xx=38+i*7.4,yy=53-i*5;line([[6,9],[xx*.68,22],[xx,yy]],ink,.85);ellipse(xx,yy-4,2.8,4.3,wing,-.48)}
  g.beginPath();g.moveTo(3,-4);g.bezierCurveTo(14,-22,56,-57,115,-63);g.quadraticCurveTo(119,-52,101,-28);g.bezierCurveTo(91,-13,74,-1,57,8);g.quadraticCurveTo(45,7,38,17);g.quadraticCurveTo(31,17,25,20);g.bezierCurveTo(14,18,9,8,3,-4);g.closePath();g.fillStyle=wing;g.fill();g.strokeStyle=ink;g.lineWidth=1.9;g.stroke()
  path([[13,-9],[38,-30],[64,-39],[84,-51],[106,-57],[78,-42],[69,-31],[48,-21],[42,-12],[24,0]],accent)
  path([[35,11],[47,0],[59,-5],[71,-17],[82,-22],[101,-46],[95,-28],[78,-11],[65,-2],[47,8]],base)
  for(const [a,b,c,d] of [[42,-25,109,-57],[37,-15,97,-40],[31,-7,78,-15],[27,-1,59,0],[22,2,40,12]])line([[4,-3],[a,b],[c,d]],ink,.85)
  ellipse(54,-19,10.4,7.1,ink,-.55);ellipse(54,-19,7.5,4.9,base,-.55);ellipse(55,-20,3.2,2.4,wing,-.55)
  for(let i=0;i<10;i++){let xx=47+i*5.4,yy=5-i*4.8;ellipse(xx,yy,1,2.4,ink,-.65)}
  g.beginPath();g.moveTo(2,-14);g.quadraticCurveTo(8,-34,23,-39);g.strokeStyle=ink;g.lineWidth=1.8;g.stroke()
  for(let i=0;i<6;i++)line([[6+i*2.6,-23-i*2.4],[8+i*2.9,-31-i*1.6]],ink,1)
  g.restore()}
 ellipse(0,12,4.2,20,ink);ellipse(0,-3,6.4,12,base);ellipse(0,-13,4.8,4.6,ink);for(let i=0;i<5;i++)line([[-3,7+i*4],[3,8+i*4]],wing,.8)
 g.restore()
}
function ridge(x,y,w,h,ink='#696d57'){path([[x-w/2,y],[x-w*.21,y-h*.48],[x-w*.12,y-h*.44],[x,y-h],[x+w*.12,y-h*.58],[x+w*.20,y-h*.64],[x+w/2,y]],'#afa988');path([[x,y-h],[x+w*.12,y-h*.58],[x+w*.20,y-h*.64],[x+w/2,y],[x+w*.14,y-1],[x+w*.04,y-h*.28],[x-w*.05,y-h*.24],[x+w*.035,y-h*.54]],'#777d67');line([[x-w*.48,y],[x-w*.20,y-h*.49],[x-w*.12,y-h*.44],[x,y-h],[x+w*.12,y-h*.58],[x+w*.20,y-h*.64],[x+w*.46,y-1]],ink,.9);for(let i=0;i<4;i++)line([[x-w*.03-i*w*.037,y-h*.63+i*h*.10],[x-w*.16-i*w*.053,y-h*.06]],ink,.55)}
function conifer(x,y,s,c){line([[x,y],[x,y-s*1.4]],c,s*.11);for(let i=0;i<3;i++)path([[x,y-s*(1.42-i*.24)],[x+s*(.21+i*.055),y-s*(.85-i*.27)],[x-s*(.21+i*.055),y-s*(.85-i*.27)]],c)}
function house(x,y,s,c='#796548'){path([[x-s,y],[x-s,y-s*.88],[x,y-s*1.81],[x+s,y-s*.88],[x+s,y]],'#dbca9e',c,.8);path([[x-s*1.23,y-s*.8],[x,y-s*1.91],[x+s*1.26,y-s*.8]],c);rect(x-s*.18,y-s*.65,s*.34,s*.65,c)}
function rose(x,y,r,ink='#726345'){ellipse(x,y,r,r,null,0,ink,.8);ellipse(x,y,r*.83,r*.83,null,0,ink,.7);for(let k=0;k<8;k++){g.save();g.translate(x,y);g.rotate(k*PI/4);const l=k%2?r*.61:r*1.10;path([[0,-l],[r*.113,0],[0,r*.13]],ink);path([[0,-l],[-r*.113,0],[0,r*.13]],'#dac99d',ink,.65);g.restore()}ellipse(x,y,r*.085,r*.085,'#aa7852');text('N',x,y-r*1.24,9,ink)}
function map(){paper('#ddcfa7');const olive='#8d9477'
 // Topography is drawn as nested contour lines with a hand-carved line quality.
 g.save();g.beginPath();g.rect(16,16,480,480);g.clip()
 const hills=[[92,116,72,86],[193,72,121,46],[365,158,89,86],[165,282,63,67],[374,365,105,89],[68,445,106,66],[492,457,72,78]]
 for(const [x,y,rx,ry] of hills){for(let l=11;l>=1;l--){const f=l/10.8,pts=[];for(let i=0;i<=100;i++){const a=TAU*i/100,k=1+.138*Math.sin(a*3+x)+.058*Math.cos(a*6-y)+.035*Math.sin(a*8+f*1.4);pts.push([x+rx*f*k*Math.cos(a)+f*f*5,y+ry*f*k*Math.sin(a)])}path(pts,l===11?'#a3aa831e':null,l%3===0?'#7e866893':'#8e92716b',l%3===0?.92:.56)}}
 g.beginPath();g.moveTo(260,-4);g.bezierCurveTo(248,30,285,55,271,88);g.bezierCurveTo(257,113,272,125,284,150);g.bezierCurveTo(312,189,218,201,228,245);g.bezierCurveTo(236,291,297,291,272,339);g.bezierCurveTo(256,373,214,383,194,423);g.bezierCurveTo(172,455,209,485,182,520);g.strokeStyle='#668f90';g.lineWidth=5.6;g.stroke();g.strokeStyle='#a0b7a4';g.lineWidth=2.4;g.stroke()
 g.beginPath();g.moveTo(492,278);g.bezierCurveTo(439,264,403,305,374,299);g.bezierCurveTo(323,274,311,317,280,319);g.strokeStyle='#749690';g.lineWidth=2.3;g.stroke()
 for(const [cx,cy,count] of [[79,100,30],[151,94,21],[347,146,34],[366,359,31],[71,403,20]]){const pts=Array.from({length:count},()=>[cx+ran(-34,34),cy+ran(-31,29),ran(11,25)]).sort((a,b)=>a[1]-b[1]);for(const [x,y,s] of pts)ridge(x,y,s,s*ran(.55,.93))}
 for(const [cx,cy] of [[155,195],[77,237],[330,263],[408,405],[218,137],[417,81],[140,416]])for(let i=0;i<37;i++){const a=ran(0,TAU),r=ran(0,1);conifer(cx+Math.cos(a)*r*32,cy+Math.sin(a)*r*18,ran(3,6),'#78876c')}
 const stops=[[.17,.72],[.335,.58],[.492,.646],[.63,.392],[.796,.284]],names=['BELL WEIR','WOODFOLD','LARCH FERRY','ALDER FELL','HIGH LANTERN'];g.setLineDash([3,3]);line(stops.map(([u,v])=>[u*512,v*512]),'#ad6748',1.4);g.setLineDash([])
 for(let i=0;i<5;i++){const x=stops[i][0]*512,y=stops[i][1]*512;for(const [dx,dy,s] of [[-4,0,3],[2,2,3.3],[6,-1,2.4]])house(x+dx,y+dy,s);ellipse(x,y+5,2.8,2.8,'#b96f51');text(names[i],x,y+16,7.9,'#594f3c','Georgia','center','bold')}
 text('R i v e r   A l d e r',247,375,7.5,'#5e817c','Georgia','center','italic');text('T H E   S L E E P I N G   F E L L S',114,148,6.8,'#72694d')
 g.restore();ornament(10,10,492,492,'#86724f');rose(451,65,27);rect(24,23,173,35,'#dfd0ad');framed(24,23,173,35,'#897551',.9);text('THE  ALDER  REACH',110,40,13.4,'#584c37');text('NIGHT ROUTES   ·   SURVEY SHEET IV',110,50,5.8,'#7b6849','Arial')
 rect(301,449,178,36,'#e2d3b0');framed(301,449,178,36,'#8c7953',.8);text('Hushwing Survey  ·  Alder Division',390,462,9,'#68573e','Georgia','center','italic');for(let i=0;i<8;i++)rect(321+i*10,472,10,3,i%2?'#ddcda7':'#746245');text('8 leagues',431,477,7,'#75674c')
 for(let i=0;i<4;i++){let p=(i+1)*102.4;rect(p-.8,0,.8,512,'#8c784c1e');rect(p,0,1.2,512,'#fff6ce59')}grain(10)}
function banner(){rect(0,0,512,512,'#2e5958');rect(13,0,486,512,'#386260');for(let i=0;i<48;i++){const x=ran(27,485),y=ran(36,482);star(x,y,ran(1.5,3.8),'#c9ad7879',4)}
 ornament(22,17,468,479,'#c6a673');ornament(34,29,444,455,'#8a9c7e')
 for(const yy of [51,450])for(let i=0;i<13;i++){let x=72+i*30.6;diamond(x,yy,4,2,'#c4ac7c')}
 ellipse(256,257,145,143,null,0,'#ad9e71',1.2);ellipse(256,257,137,135,null,0,'#839a82',.7)
 for(let i=0;i<60;i++){let a=i*TAU/60,r=i%5===0?150:147;line([[256+142*Math.cos(a),257+140*Math.sin(a)],[256+r*Math.cos(a),257+(r-2)*Math.sin(a)]],'#cbb17e',i%5===0?1.6:.9)}
 text('H U S H W I N G',256,97,29,'#eed7a8');text('THE  ALDER  FELL  DIVISION',256,116,9.8,'#c6b28e','Arial');star(256,156,16,'#d6b475',8,PI/2)
 moth(256,258,349,218,'#aa9266','#efdbaf','#a0ab87','#c99159')
 for(const s of [-1,1]){g.save();g.translate(256,0);g.scale(s,1);g.beginPath();g.moveTo(88,365);g.bezierCurveTo(149,337,180,294,189,238);g.strokeStyle='#bba075';g.lineWidth=1.8;g.stroke()
 for(let i=0;i<7;i++){const a=i/7,x=98+88*a,y=357-103*a;ellipse(x,y,5,13,'#a6a381',-.6);ellipse(x+9,y-7,4,11,'#a6a381',.76)}g.restore()}
 text('N I G H T   P O S T',256,414,20,'#e5cfa1');text('BY  LANTERN  AND  WING',256,435,8.4,'#c6b28b','Arial');silk()}
function specimens(){paper('#e7d8b8');ornament(15,15,482,482,'#9a855d');text('Lepidoptera nocturna',256,54,27,'#584f3f','Georgia','center','italic');text('ALDER FELL   /   FIELD CABINET   /   PLATE 06',256,74,8.8,'#786b50','Arial');line([[48,87],[464,87]],'#a38b61',.8)
 moth(246,175,263,139,'#675943','#c9ab70','#878b69','#9c724e');text('I.   The great ash messenger',256,256,12,'#756345','Georgia','center','italic')
 moth(136,332,162,100,'#685f4c','#b7c4a1','#889884','#958d63');moth(377,327,153,93,'#745646','#c59675','#9d795a','#b66f49')
 text('II.   Willow rest',141,404,11,'#78684e','Georgia','center','italic');text('III.   Copper dusk',375,404,11,'#78684e','Georgia','center','italic')
 for(let i=0;i<6;i++){rect(64+i*19,450,14,12,['#d3bd8b','#a79f7c','#88947b','#b18d66','#9b775c','#706f60'][i])}stamp(430,453,19,'#ac7657');grain(11)}
function quilt(){rect(0,0,512,512,'#c7955c');const colors=['#d4a467','#d1a26b','#c59159','#d6ab75','#ce9c62','#c99964']
 for(let j=0;j<6;j++)for(let i=0;i<6;i++){const x=26+i*76.67,y=21+j*78.4,w=76.67,h=78.4;rect(x,y,w,h,colors[(i+2*j)%6])
 if(i===0||i===5||j===0||j===5){let a=(i+j)%2;path([[x+3,y+4],[x+w-3,y+h*.5],[x+3,y+h-4]],a?'#b97751':'#dcbc8b');path([[x+10,y+h*.24],[x+w*.54,y+h*.51],[x+10,y+h*.78]],a?'#c89462':'#c79564')}
 else{g.save();g.translate(x+w/2,y+h/2);g.rotate((i===j||i+j===5)?PI/4:0);framed(-w*.24,-h*.24,w*.48,h*.48,'#b3865877',1);g.restore()}}
 const cx=256,cy=263,r=143;for(let i=0;i<8;i++){g.save();g.translate(cx,cy);g.rotate(i*PI/4);path([[0,0],[-r*.24,-r*.42],[0,-r],[r*.24,-r*.42]],i%2?'#849186':'#f0d6a4');path([[0,0],[0,-r],[r*.24,-r*.42]],i%2?'#607c75':'#d5b587');g.restore()}
 diamond(cx,cy,38,38,'#ab6849');diamond(cx,cy,21,21,'#e4bc83');diamond(cx,cy,8,8,'#698278')
 for(const x of [94,418])for(const y of [105,419]){star(x,y,28,'#e3c99b',4);diamond(x,y,6,6,'#b97855')}
 for(let j=0;j<9;j++)for(let i=-4;i<12;i++){g.setLineDash([2.4,2.8]);line([[i*56,j*60],[(i+1)*56,(j+1)*60]],'#f1d29b8a',1.05);line([[(i+1)*56,j*60],[i*56,(j+1)*60]],'#a77a4e74',.8)}g.setLineDash([])
 for(const x of [0,498])rect(x,0,14,512,'#a2654a');for(const y of [0,499])rect(0,y,512,13,'#a2654a');framed(17,16,478,481,'#ecd0a1',2);framed(21,20,470,473,'#a97a51',1)
 g.save();g.translate(384,382);g.rotate(.065);rect(-14,-12,28,24,'#9a9e80');framed(-13,-11,26,22,'#d9bd8f',1);for(let i=-12;i<=12;i+=4)line([[i,-14],[i+2,-8]],'#eccea2',1.5);g.restore();silk()}
function kilim(runner=false){const border=runner?'#3b5d59':'#9d5c43',field=runner?'#b88358':'#43615b',ivory='#dcc59a',dusk='#5f7470',ochre='#c39761'
 rect(0,0,S,S,'#c9b38c');rect(6,6,500,500,border);for(let k=0;k<2;k++){const i=10+k*21;framed(i,i,512-2*i,512-2*i,k?ivory:ochre,2)}
 for(let i=0;i<36;i++){const x=15+i*13.8;for(const y of [21,491]){diamond(x,y,5.6,6.1,ivory);diamond(x,y,2.6,3.2,runner?border:field)}for(const y of [21,491]){diamond(y,x,6.1,5.6,ivory);diamond(y,x,3.2,2.6,field)}}
 rect(38,38,436,436,field);framed(41,41,430,430,'#d5ad7a',2);framed(46,46,420,420,border,4)
 const stepped=(x,y,rx,ry,col)=>{const pts=[];for(let j=0;j<4;j++){const scx=[1,-1,-1,1][j],scy=[-1,-1,1,1][j];let a=[[0,1],[.23,1],[.23,.79],[.44,.79],[.44,.59],[.64,.59],[.64,.39],[.83,.39],[.83,.19],[1,.19],[1,0]];if(j===0||j===2)a=a.slice().reverse();for(const [xx,yy] of a)pts.push([x+rx*xx*scx,y+ry*yy*scy])}path(pts,col)}
 for(let j=0;j<(runner?3:2);j++){const y=runner?116+j*138:154+j*204,r=runner?61:95;stepped(256,y,runner?130:122,r,runner?'#5e7770':'#b57d50');stepped(256,y,runner?105:99,r*.80,ivory);stepped(256,y,runner?91:84,r*.66,runner?'#92684b':'#9a6047')
 const feather=(x,dy,sg)=>{path([[x,y+dy],[x+sg*56,y+dy-22],[x+sg*46,y+dy-2],[x+sg*14,y+dy+8]],ivory);path([[x,y+dy+4],[x+sg*35,y+dy+12],[x+sg*20,y+dy+22]],ochre)}
 for(const s of [-1,1])feather(256,-3,s);diamond(256,y,5,19,dusk)}
 for(const sx of [82,430])for(let j=0;j<8;j++){let yy=69+j*53;diamond(sx,yy,13,17,j%2?ochre:ivory);diamond(sx,yy,7,10,border);star(sx,yy,5,ivory)}
 for(const x of [113,399])for(let j=0;j<13;j++)diamond(x,65+j*32,3,5,'#caac7f')
 silk()}
function panorama(){const gr=g.createLinearGradient(0,0,0,512);gr.addColorStop(0,'#a9c6c4');gr.addColorStop(.42,'#f8dbac');gr.addColorStop(.75,'#e7bc8b');gr.addColorStop(1,'#93a79a');g.fillStyle=gr;g.fillRect(0,0,512,512)
 ellipse(166,199,45,45,'#ffedbe');ellipse(166,199,57,57,'#ffe5ae28')
 for(let i=0;i<29;i++){let x=ran(-60,512),y=ran(90,252);ellipse(x,y,ran(24,97),ran(1.5,5.5),'#fff0cf55')}
 for(let layer=0;layer<4;layer++){const p=[[0,512]];for(let i=0;i<=80;i++){let x=i*6.4,y=246+layer*40+19*Math.sin(x*.014+layer*2)+13*Math.cos(x*.027+layer*2.24)+5*Math.sin(x*.056+layer);p.push([x,y])}p.push([512,512]);path(p,['#c6bb9e','#a6afa2','#889c8a','#697f70'][layer])}
 for(let i=0;i<35;i++){let x=ran(0,512),y=342+17*Math.sin(x*.016);conifer(x,y,ran(5,19),'#809380')}
 for(const [x,y,sc] of [[112,348,1],[346,369,.8],[452,350,.58]]){rect(x-4*sc,y-29*sc,8*sc,29*sc,'#847a67');path([[x-8*sc,y-27*sc],[x,y-39*sc],[x+8*sc,y-27*sc]],'#827662');rect(x-sc,y-26*sc,2*sc,5*sc,'#e5c892')}
 // Softly silhouetted rowan twigs outside the upper panes.
 const branch=(x,y,len,a,depth)=>{const xx=x+len*Math.cos(a),yy=y+len*Math.sin(a);g.beginPath();g.moveTo(x,y);g.quadraticCurveTo((x+xx)/2+4,(y+yy)/2-4,xx,yy);g.strokeStyle=['#647760','#738166','#879373','#8a9477'][Math.min(depth,3)];g.lineWidth=1+depth*.9;g.stroke()
 if(depth>0){branch(xx,yy,len*.69,a+ran(.17,.48),depth-1);branch(xx,yy,len*.73,a-ran(.22,.52),depth-1)}else{for(let i=0;i<4;i++)ellipse(xx+ran(-9,9),yy+ran(-8,8),ran(4,11),ran(2,4),'#869472',a+ran(-.5,.5))}}
 branch(-19,90,79,-.06,3);branch(543,275,93,3.59,3);grain(4)}
function portrait(){paper('#d8c8a4');rect(25,24,462,417,'#a5b5a7');ellipse(347,144,49,49,'#e1c296');path([[25,238],[91,156],[167,208],[270,113],[380,214],[451,179],[487,192],[487,443],[25,443]],'#7d968a');path([[25,288],[89,226],[172,264],[291,200],[389,281],[487,236],[487,443],[25,443]],'#637d70')
 function person(x,y,s,coat,skin,hair,scarf){g.save();g.translate(x,y);g.scale(s,s);path([[-95,167],[-80,63],[-45,35],[-28,27],[31,27],[68,48],[87,84],[98,167]],coat);ellipse(0,0,44,58,skin);g.beginPath();g.moveTo(-44,8);g.bezierCurveTo(-75,-72,28,-96,51,-35);g.lineTo(44,18);g.quadraticCurveTo(34,9,29,-34);g.quadraticCurveTo(-5,-18,-37,-21);g.closePath();g.fillStyle=hair;g.fill()
 for(const sx of [-15,15]){line([[sx-5,-4],[sx+5,-4]],hair,2.8);ellipse(sx,3,2.6,3.5,hair)}line([[1,5],[-2,17],[4,18]],'#9c7457',1.6);g.beginPath();g.moveTo(-11,28);g.quadraticCurveTo(1,36,13,25);g.strokeStyle='#8b5949';g.lineWidth=2.2;g.stroke()
 path([[-40,36],[-3,50],[37,35],[44,51],[17,65],[26,123],[7,131],[-6,69],[-34,58]],scarf);g.restore()}
 person(184,271,1.03,'#456662','#bf9777','#514a3c','#b17c51');person(333,304,.83,'#96725a','#d8ae84','#674b39','#d0b784')
 rect(0,434,512,78,'#e5d5b1');text('Alder Fell, the first summer',256,472,22,'#745d45','Georgia','center','italic');framed(14,14,484,484,'#8c7959',1.2);grain(12)}
function station(){paper('#ddcfaa');rect(23,23,466,361,'#acb9ac');const y0=338
 ellipse(367,102,42,42,'#e6cb9a');for(let i=0;i<3;i++){let p=[[23,383]];for(let j=0;j<=45;j++)p.push([23+j*466/45,175+i*44+31*Math.sin(j*.16+i*1.85)+12*Math.cos(j*.42+i)]);p.push([489,383]);path(p,['#9ba98f','#788e7c','#60786a'][i])}
 for(let i=0;i<20;i++)conifer(ran(30,433),ran(310,377),ran(13,52),'#526c5f')
 path([[203,y0],[208,199],[265,190],[279,y0]],'#ccba93','#736952',2);path([[198,206],[235,166],[274,196],[268,209]],'#826a51');rect(216,216,37,43,'#8d9c85');rect(220,219,11,32,'#e8c891');rect(238,219,11,32,'#e8c891');line([[237,168],[237,119]],'#665e4f',3);path([[239,120],[284,128],[240,140]],'#ac7854')
 path([[143,343],[147,286],[186,257],[213,278],[213,341]],'#cbb891','#72674e',2);path([[138,290],[185,250],[220,277],[208,284],[185,264],[150,293]],'#8c6c54')
 for(let i=0;i<4;i++)line([[206+i*15,318],[206+i*15,344]],'#80775f',2);ornament(15,15,482,482,'#978060');text('ALDER FELL',256,430,28,'#63593f');text('LANTERN  STATION   •   ELEV.  1170',256,453,10,'#786b4d','Arial');grain(11)}
function logbook(){rect(0,0,512,512,'#43625b');ornament(26,19,460,474,'#bda77a');ornament(39,32,434,448,'#8e9b7f');text('H U S H W I N G',256,91,20,'#d8c293');moth(256,244,291,182,'#ad9b72','#cfbc93','#a5a689','#ac8e63');text('Route Register',256,382,30,'#ddc798','Georgia','center','italic');text('VOL. IV      •      M. VENN',256,437,12,'#c7b285','Arial');grain(13)}
function letter(){paper('#e7d6ac');line([[0,0],[256,299],[512,0]],'#ad966d',2.8);line([[0,512],[181,228]],'#b7a079',2.2);line([[512,512],[329,228]],'#b7a079',2.2);stamp(438,75,32,'#68877a');text('ALDER POST',438,119,11,'#718a7d','Arial');grain(10)}
function chart(){paper('#d6ceb0');ornament(19,21,474,471,'#8f8264');text('Bearings at first light',256,62,23,'#675d47','Georgia','center','italic');text('FIELD TABLES     •     4th ASCENT',256,85,9,'#8e7a58','Arial')
 const x0=63,y0=107,w=382,h=246;for(let i=0;i<13;i++)line([[x0+i*w/12,y0],[x0+i*w/12,y0+h]],'#90958175',.9);for(let j=0;j<10;j++)line([[x0,y0+j*h/9],[x0+w,y0+j*h/9]],'#90958175',.9)
 for(let j=0;j<3;j++){let p=[];for(let i=0;i<65;i++)p.push([x0+w*i/64,y0+h*(.57-j*.085+.16*Math.sin(i*.11+j*.2)+.094*Math.cos(i*.24+j*.11)-.0014*i)]);line(p,['#5b817d','#a46a4c','#8b876a'][j],2)}
 for(let i=0;i<5;i++){const yy=379+i*15;line([[72,yy],[330,yy]],'#968b7273',.7);text(['I    Ash Bridge','II   West Weir','III  North Lantern','IV   Alder Fell','V    Return'][i],76,yy-2,9.4,'#6f674f','Georgia','left','italic');text(['063','117','124','137','142'][i],294,yy-2,9,'#84765b','Georgia','left')}rose(397,411,32);grain(9)}
function clockFace(){rect(0,0,512,512,'#d8c496');ellipse(256,256,244,244,'#e3d2a9',0,'#9b8154',8);ellipse(256,256,215,215,null,0,'#947d54',2)
 for(let i=0;i<60;i++){const a=i*TAU/60,r=i%5?208:195;line([[256+r*Math.sin(a),256-r*Math.cos(a)],[256+214*Math.sin(a),256-214*Math.cos(a)]],'#665e4b',i%5?1.6:3.3)}
 for(let i=1;i<=12;i++){const a=i*PI/6;text(['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII'][i-1],256+170*Math.sin(a),267-170*Math.cos(a),31,'#5d5848')}
 text('ALDER',256,183,17,'#867350');line([[256,256],[136,184]],'#5a5d4e',9);line([[256,256],[337,124]],'#8a684b',5);ellipse(256,256,10,10,'#a48552');grain(7)}
function label(){paper('#dbcca4');ornament(11,18,490,476,'#928061');text('N I G H T   P O S T',256,106,25,'#6b6650');moth(256,253,185,115,'#6c7059','#b2af89','#82907a','#b19a72');text('ALDER  FELL',256,382,36,'#65604b');text('M. VENN    /    ROUTE IV',256,430,17,'#837557','Arial');grain(9)}
function stripe(){rect(0,0,512,512,'#eee6d3');for(let i=0;i<8;i++){rect(i*64+17,0,4,512,'#acbdaf');rect(i*64+24,0,1.5,512,'#9dafa0');rect(i*64+27,0,1.5,512,'#9dafa0')}silk()}
function embroidery(){rect(0,0,S,S,'#d6c9a6');ellipse(256,256,195,195,null,0,'#a29c8066',1.5)
 moth(253,261,326,228,'#9b9881','#d5c9aa','#c0bca1','#c9bea0')
 g.save();g.beginPath();g.rect(0,0,258,512);g.clip();moth(253,261,326,228,'#8d7052','#c4895c','#738d7d','#b2654b');g.restore()
 for(let i=0;i<29;i++){const a=PI*.68+i*.044,x=256+164*Math.cos(a),y=256+164*Math.sin(a);line([[x,y],[x+3.5,y-2.4]],'#a6684d',2.5)}silk()}
function frieze(){g.save();g.scale(1,4);rect(0,0,512,128,'#dac9a9');for(const y of [6,121]){rect(0,y,512,2,'#ac946e');rect(0,y+4,512,1,'#f0dcbb')}
 const pts=[];for(let i=0;i<=64;i++){const x=i*8;pts.push([x,65+11*Math.sin(TAU*x/256)])}line(pts,'#a28f6c',2.2)
 for(let i=0;i<16;i++){const x=15+i*32,s=i%2?1:-1,y=65+11*Math.sin(TAU*x/256);line([[x,y],[x+11,y+s*14]],'#a28f6c',1.5);ellipse(x+14,y+s*16,13,4.8,'#9d9d7b',s*.58);ellipse(x-4,y-s*7,9,3.6,'#b6a57e',-s*.56);if(i%4===0)ellipse(x+5,y+16,3,3,'#b88b69')}
 g.restore();grain(7)}
const art={11:()=>kilim(),12:quilt,13:map,14:specimens,15:portrait,16:panorama,17:stripe,18:logbook,19:letter,20:banner,21:()=>kilim(true),22:station,23:chart,24:embroidery,25:()=>rect(0,0,S,S,'#fff2cd'),26:clockFace,27:label,28:frieze}

// Periodic fields avoid seams on long timbers. Broad grain and pores run parallel to a board.
const fields=new Map()
function noiseGrid(n){if(!fields.has(n)){const a=new Float32Array(n*n);for(let i=0;i<a.length;i++)a[i]=ran(-.5,.5);fields.set(n,a)}return fields.get(n)}
function noise(x,y,n){x=(x-Math.floor(x))*n;y=(y-Math.floor(y))*n;const i=Math.floor(x),j=Math.floor(y);let u=x-i,v=y-j;u=u*u*(3-2*u);v=v*v*(3-2*v);const a=noiseGrid(n),ii=(i+1)%n,jj=(j+1)%n;return (a[j*n+i]*(1-u)+a[j*n+ii]*u)*(1-v)+(a[jj*n+i]*(1-u)+a[jj*n+ii]*u)*v}
export function substrate(t){seed=1451183+t*127;const A=new Uint8ClampedArray(S*S*4)
 for(let y=0;y<S;y++)for(let x=0;x<S;x++){const u=x/S,v=y/S,ix=(y*S+x)*4,st=ran()-.5,low=noise(u,v,5),fine=noise(u,v,61);let val=231,red=0,blue=0
  if(t===T.wood||t===T.paint){let warp=.018*Math.sin(TAU*u)+.019*noise(u,v,5)+.009*noise(u*.5,v,12)
   const dx=Math.sin(PI*(u-.38)),dy=Math.sin(PI*(v-.63));const knot=Math.exp(-dx*dx*6.5-dy*dy*21);warp+=.044*knot*Math.sin(TAU*(v-.63))
   const wave=v+warp,ring=.5+.5*Math.sin(TAU*(10*wave+.61*Math.sin(TAU*wave*3))),grainLine=Math.max(0,Math.sin(TAU*(74*wave+.49*Math.sin(TAU*wave*11))))**7
   val=235-18*ring**4-15*grainLine+low*17+fine*9+st*10-13*knot*(.6+.4*Math.sin((dx*dx*5+dy*dy*13)*30));if(t===T.paint)val=236+(val-225)*.40
   red=3;blue=-3.6
  }else if(t===T.plaster){val=235+low*19+noise(u,v,15)*10+fine*9+st*10;red=1;blue=-1.8}
  else if(t===T.linen||t===T.wool){const woven=(Math.sin(TAU*x/4)*Math.cos(TAU*y/4)+.6*Math.cos(TAU*y/3.2));val=(t===T.wool?225:232)+woven*(t===T.wool?7:10)+st*(t===T.wool?25:16)+low*10+fine*14}
  else if(t===T.metal){val=232+low*13+fine*7+st*7+2.8*Math.sin(TAU*y/3.2)}
  else if(t===T.paper){val=238+low*8+fine*7+st*14;red=2;blue=-2}
  else if(t===T.leather){val=226+low*15+fine*17+st*16-11*Math.max(0,Math.cos(TAU*u*41+23*noise(u,v,15)))**8}
  else if(t===T.china){val=238+low*9+fine*4+st*3}
  else if(t===T.stone)val=224+low*30+fine*17+st*19
  A[ix]=val+red;A[ix+1]=val;A[ix+2]=val+blue;A[ix+3]=255
 }
 // Pores, old tool marks and polishing scratches are baked into the repeating swatches.
 if(t===T.wood||t===T.paint||t===T.metal){const count=t===T.metal?130:700;for(let i=0;i<count;i++){
  const x=ran(0,S),y=ran(0,S),len=ran(2,32),dy=ran(-1.2,1.2)*(t===T.metal?4:1),v=i%4?-ran(3,10):ran(4,12)
  for(let j=0;j<len;j++){const xx=(Math.floor(x+j)+S)%S,yy=(Math.floor(y+dy*j/len)+S)%S,k=(yy*S+xx)*4;for(let c=0;c<3;c++)A[k+c]+=v*Math.sin(PI*j/len)}
 }}
 return A
}
export function drawSheet(ctx,t){g=ctx;seed=1451183+t*127;g.save();art[t]();g.restore()}
export async function makeAtlas(gl,swatches,progress){const tex=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D_ARRAY,tex);gl.texStorage3D(gl.TEXTURE_2D_ARRAY,10,gl.RGBA8,S,S,29)
 const canvas=document.createElement('canvas');canvas.width=S;canvas.height=S;g=canvas.getContext('2d',{willReadFrequently:true});g.lineJoin='round'
 // Mipmaps are generated only after the final layer is uploaded.
 gl.texSubImage3D(gl.TEXTURE_2D_ARRAY,0,0,0,0,S,S,11,gl.RGBA,gl.UNSIGNED_BYTE,swatches)
 for(let t=11;t<29;t++){drawSheet(g,t);gl.bindTexture(gl.TEXTURE_2D_ARRAY,tex);gl.texSubImage3D(gl.TEXTURE_2D_ARRAY,0,0,0,t,S,S,1,gl.RGBA,gl.UNSIGNED_BYTE,canvas)
  if(t%4===3){progress?.(t+1);await new Promise(r=>setTimeout(r,0))}}
 gl.generateMipmap(gl.TEXTURE_2D_ARRAY);gl.texParameteri(gl.TEXTURE_2D_ARRAY,gl.TEXTURE_MIN_FILTER,gl.LINEAR_MIPMAP_LINEAR);gl.texParameteri(gl.TEXTURE_2D_ARRAY,gl.TEXTURE_MAG_FILTER,gl.LINEAR)
 gl.texParameteri(gl.TEXTURE_2D_ARRAY,gl.TEXTURE_WRAP_S,gl.REPEAT);gl.texParameteri(gl.TEXTURE_2D_ARRAY,gl.TEXTURE_WRAP_T,gl.REPEAT)
 const ext=gl.getExtension('EXT_texture_filter_anisotropic');if(ext)gl.texParameterf(gl.TEXTURE_2D_ARRAY,ext.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(4,gl.getParameter(ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT)))
 return tex}

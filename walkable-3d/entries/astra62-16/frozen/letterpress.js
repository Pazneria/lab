'use strict';
function makeLetterpress(){
 const cvs=document.createElement('canvas');cvs.width=cvs.height=2048;
 const ctx=cvs.getContext('2d',{alpha:false});
 let state=17934;function random(){state=(Math.imul(state,1664525)+1013904223)>>>0;return state/4294967296}
 function line(x,y,xx,yy,col,w=1){ctx.strokeStyle=col;ctx.lineWidth=w;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(xx,yy);ctx.stroke()}
 function label(txt,x,y,size,color='#333a30',italic=false,align='center'){
  ctx.fillStyle=color;ctx.textAlign=align;ctx.font=(italic?'italic ':'')+size+'px Georgia, serif';ctx.fillText(txt,x,y)
 }
 function sprig(x,y,s,fruit=false){
  ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.lineWidth=2.7;ctx.strokeStyle='#48543a';ctx.fillStyle='#78815a';
  ctx.beginPath();ctx.moveTo(0,57);ctx.bezierCurveTo(3,25,-3,-21,16,-66);ctx.stroke();
  for(let i=0;i<8;i++){const b=i%2===0?-1:1,yy=39-i*13,xx=Math.pow(i/7,2)*12;
   ctx.save();ctx.translate(xx,yy);ctx.rotate(b*.82);
   ctx.beginPath();ctx.moveTo(0,0);ctx.bezierCurveTo(-13,-13,-9,-28,0,-40);ctx.bezierCurveTo(15,-22,10,-11,0,0);ctx.fill();ctx.stroke();
   line(0,-1,0,-37,'#505d3c',1);for(let j=0;j<3;j++)line(0,-8-j*7,5,-15-j*7,'#505d3c',.8);ctx.restore()
  }
  if(fruit){
   ctx.fillStyle='#c99246';ctx.strokeStyle='#74603c';ctx.beginPath();ctx.moveTo(0,2);ctx.bezierCurveTo(-16,3,-16,13,-20,18);ctx.bezierCurveTo(-33,37,-14,53,0,48);ctx.bezierCurveTo(20,54,35,30,20,16);ctx.bezierCurveTo(14,8,16,3,0,2);ctx.fill();ctx.stroke();
   for(let i=0;i<60;i++){let xx=(random()-.5)*32,yy=random()*28+12;ctx.fillStyle='rgba(108,70,31,.33)';ctx.fillRect(xx,yy,1,1)}
  }
  ctx.restore()
 }
 function border(color,margin=12){ctx.strokeStyle=color;ctx.lineWidth=2;ctx.strokeRect(margin,margin,512-2*margin,256-2*margin);ctx.lineWidth=1;ctx.strokeRect(margin+5,margin+5,502-2*margin,246-2*margin)}
 const jars=['QUINCE PIPS','WORMWOOD','STAR ANISE','MUGWORT','ROSE HIPS','SWEET CICELY','MANDRAKE','MOON SALT','VERVAIN','FIG LEAF','SAGE','INK'];
 const books=['The Orchard Book','A Small Herbal','Tides & Phases','Household Receipts','The Glass Garden','Root & Rind','Wild Almanack','Cures for Rain'];
 for(let cell=0;cell<32;cell++){
  ctx.save();ctx.translate(cell%4*512,Math.floor(cell/4)*256);ctx.beginPath();ctx.rect(0,0,512,256);ctx.clip();
  const dark=cell===0||cell===5||cell>=22&&cell<30;
  let bg=dark?['#27473f','#524137','#56464a','#40504d'][cell%4]:cell===19?'#e1dccc':'#dfcfa9';
  ctx.fillStyle=bg;ctx.fillRect(0,0,512,256);
  for(let i=0;i<2500;i++){ctx.fillStyle=random()<.5?'rgba(75,51,34,.06)':'rgba(251,239,201,.085)';ctx.fillRect(random()*512,random()*256,random()*4+.4,random()*2+.25)}
  if(cell===0||cell===5){border('#b49a67',13);label(cell===0?'HOUSE  ·  KITCHEN  ·  GLASS':'HERBS  ·  DISTILLATES  ·  INKS',256,61,19,'#d3bb8a');line(100,76,412,76,'#ac956a');
   label(cell===0?'The Crooked':'The',256,127,44,'#eddfb3',true);label(cell===0?'Q U I N C E':'S T I L L R O O M',256,185,cell===0?52:39,'#eddfb3');line(174,209,338,209,'#ac956a')
  }else if(cell===1||cell===21){
   border('#8a7956');label(cell===1?'POMONA DOMESTICA':'HORTUS LUNARIS',256,45,25);sprig(148,151,1.07,true);sprig(343,150,.88,false);
   label(cell===1?'I.  Cydonia obliqua':'III.  Lunaria',256,232,22,'#57573d',true)
  }else if(cell===2||cell===3||cell===4){
   label(cell===2?'Quince butter':cell===3?'The bent quince':'A distillation',42,49,30,'#484734',true,'left');line(41,61,468,61,'#a28d6d');
   const lines=cell===2?['Six late quinces, well rubbed','Rainwater to cover','A twist of lemon and two cloves','Simmer until the flesh is rose.','For a restless household.']:cell===3?['Collected after first frost.','The fruit follows the moon','even when picked green.','Keep the skin and pips.']:['A measure of clear rain.','Bruise the fruit gently.','Rest the glass in shadow.','Return the first three drops.'];
   lines.forEach((t,i)=>label(t,43,95+i*26,18,'#665843',true,'left'));sprig(399,165,.57,cell!==4);label('·  '+(31+cell)+'  ·',256,238,14)
  }else if(cell>=6&&cell<=17){
   border('#7d7255',17);line(64,86,448,86,'#958364');label('C. Q.   /   MATERIA DOMESTICA',256,67,19);label(jars[cell-6],256,154,43);line(105,180,407,180,'#958364');label('JAR '+String(cell-5).padStart(2,'0')+'   ·   HAND GATHERED',256,212,16)
  }else if(cell===18){border('#8b7753');label('A TABLE OF LUNATIONS',256,58,27);for(let i=0;i<7;i++){
    const x=62+i*64;ctx.fillStyle='#625d4d';ctx.beginPath();ctx.arc(x,131,23,0,Math.PI*2);ctx.fill();ctx.fillStyle='#c9b78f';ctx.beginPath();ctx.ellipse(x+(3-i)*3,131,Math.max(1,Math.abs(3-i))*5.7,21,0,0,Math.PI*2);ctx.fill();label(['I','II','III','IV','V','VI','VII'][i],x,182,15)
   }label('For the use of the stillroom',256,221,18,'#6b604a',true)
  }else if(cell===19){border('#587b82',12);ctx.strokeStyle='#658691';ctx.lineWidth=5;ctx.beginPath();ctx.arc(256,127,84,0,Math.PI*2);ctx.stroke();sprig(256,142,.94,true);
   for(const x of [45,467])for(const y of [36,220]){ctx.fillStyle='#778f8c';ctx.beginPath();ctx.ellipse(x,y,15,6,x===45?-.6:.6,0,Math.PI*2);ctx.fill()}
  }else if(cell>=22&&cell<30){border('#b09667',16);label('C  ·  Q',256,56,18,'#d4bd8e');line(110,81,402,81,'#b39b70');label(books[cell-22],256,144,39,'#e4cfa0',true);line(110,168,402,168,'#b39b70');label('PRIVATE WORKING LIBRARY',256,210,16,'#c5b283')
  }else{border('#8c8364',14);label(cell===30?'Lunaria noctis':cell===31?'Cydonia minima':'Salvia officinalis',256,138,42,'#46533e',true);label('THE GLASSHOUSE COLLECTION',256,194,17)}
  ctx.restore()
 }
 return cvs
}

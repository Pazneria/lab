import * as T from './package/build/three.module.min.js';
import {art,canvas,tex,materials,seeded} from './materials.js';
const R=seeded(1917),tau=Math.PI*2;
const cream='#f4e5bb',gold='#e0b76e',dk='#253e35',rust='#954e3d';
function line(c,points,color,width=1){c.beginPath();points.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.strokeStyle=color;c.lineWidth=width;c.stroke()}
function text(c,str,x,y,size,color=dk,italic=false,bold=false){c.textAlign='center';c.textBaseline='middle';c.fillStyle=color;c.font=(italic?'italic ':'')+(bold?'bold ':'')+size+'px Georgia,serif';c.fillText(str,x,y)}
function tracked(c,str,cx,y,size,spacing,color){c.font='600 '+size+'px Arial,sans-serif';c.textBaseline='middle';c.textAlign='left';const w=[...str].reduce((a,b)=>a+c.measureText(b).width+spacing,0)-spacing;let x=cx-w/2;c.fillStyle=color;for(const ch of str){c.fillText(ch,x,y);x+=c.measureText(ch).width+spacing}}
function border(c,w,h,pad,color,width=1){c.strokeStyle=color;c.lineWidth=width;c.strokeRect(pad,pad,w-2*pad,h-2*pad)}
function dot(c,x,y,r,color){c.fillStyle=color;c.beginPath();c.arc(x,y,r,0,tau);c.fill()}
function diamond(c,x,y,w,h,color){c.fillStyle=color;c.beginPath();c.moveTo(x,y-h);c.lineTo(x+w,y);c.lineTo(x,y+h);c.lineTo(x-w,y);c.closePath();c.fill()}
function paper(c,w,h,color){c.fillStyle=color;c.fillRect(0,0,w,h);for(let i=0;i<w*h/88;i++){c.fillStyle=R()>.5?'rgba(83,54,23,.11)':'rgba(255,251,214,.22)';c.fillRect(R()*w,R()*h,1+R()*2,.7+R()*1.2)}}
function worn(c,w,h){
  c.save();for(let i=0;i<w*h/240;i++){const x=R()*w,y=R()*h;c.fillStyle=R()>.45?'rgba(224,197,141,.17)':'rgba(46,37,26,.21)';c.fillRect(x,y,1+R()**3*w*.023,.5+R()**6*2.2)}c.restore();
}
function sprig(c,x,y,s,col,flip=1){
  c.save();c.translate(x,y);c.scale(s*flip,s);c.lineCap='round';
  c.beginPath();c.moveTo(0,0);c.quadraticCurveTo(25,-26,56,-32);c.strokeStyle=col;c.lineWidth=2.3;c.stroke();
  for(let i=1;i<=6;i++){let xx=i*7.9,yy=-i*5.1+(i-3)**2*.6;
    for(const j of [-1,1]){c.beginPath();c.ellipse(xx,yy+j*4,6-i*.35,2.7,j*.75-.35,0,tau);c.fillStyle=col;c.fill()}}
  c.restore();
}
function scissors(c,x,y,s,color){
  c.save();c.translate(x,y);c.scale(s,s);c.lineCap='round';c.lineJoin='round';c.strokeStyle=color;c.lineWidth=3.4;
  for(const d of [-1,1]){c.beginPath();c.ellipse(d*12,15,8.5,12,d*.45,0,tau);c.stroke();line(c,[[d*8,6],[0,-4],[-d*19,-37],[-d*3,-7]],color,3)}
  dot(c,0,-4,2.8,color);c.restore();
}
function spool(c,x,y,s,color){
  c.save();c.translate(x,y);c.rotate(-.17);c.scale(s,s);
  c.fillStyle=color;c.fillRect(-9,-13,18,26);c.fillRect(-13,-16,26,4);c.fillRect(-13,13,26,4);
  for(let j=-9;j<12;j+=4)line(c,[[-8,j],[8,j-3]],dk,1.1);c.restore();
}
export function createArt(){
  art('mainSign',1200,258,(c,w,h)=>{
    paper(c,w,h,'#24483e');border(c,w,h,6,'#c79b54',5);border(c,w,h,16,'#ddc492',1.5);
    for(const x of [34,w-34])for(const y of [31,h-31])diamond(c,x,y,6,6,gold);
    tracked(c,'I R I S    V A L E',w/2,39,19,3.5,gold);
    line(c,[[250,40],[441,40]],gold,1);line(c,[[759,40],[950,40]],gold,1);
    text(c,'The Gilded Hem',w/2+3,126,133,'#132f28',true);text(c,'The Gilded Hem',w/2,121,133,cream,true);
    tracked(c,'TRAVELLING  HABERDASHERY',w/2,212,23,6,gold);
    sprig(c,62,174,1.02,gold);sprig(c,w-62,174,1.02,gold,-1);worn(c,w,h);
  });
  art('tradeSeal',512,440,(c,w,h)=>{
    c.translate(w/2,h/2);c.strokeStyle=gold;c.lineWidth=3;c.beginPath();c.ellipse(0,0,229,191,0,0,tau);c.stroke();c.lineWidth=1;c.beginPath();c.ellipse(0,0,222,184,0,0,tau);c.stroke();
    tracked(c,'IRIS VALE',0,-116,32,7,cream);scissors(c,0,5,2.1,gold);
    sprig(c,-121,47,.92,cream);sprig(c,121,47,.92,cream,-1);
    tracked(c,'CLOTH & NOTIONS',0,105,19,4,cream);text(c,'Mender on the road',0,144,19,gold,true);
  });
  art('endSeal',512,160,(c,w,h)=>{sprig(c,24,112,1.35,gold);sprig(c,488,112,1.35,gold,-1);text(c,'IV',256,82,112,gold,true);line(c,[[152,137],[360,137]],gold,1.5)});
  art('ledger',400,278,(c,w,h)=>{
    paper(c,w,h,'#dfcea3');c.fillStyle='#eee1bb';c.fillRect(8,5,w-16,h-10);
    line(c,[[w/2,5],[w/2-2,h-6]],'#a69269',4);text(c,'Mending book',102,37,23,dk,true);text(c,'November',299,36,20,rust,true);
    for(let j=0;j<8;j++){const y=66+j*23;line(c,[[18,y],[184,y]],'#bbad8f');line(c,[[215,y],[381,y]],'#bbad8f');for(const x of [25,222]){let a=x;for(let i=0;i<3;i++){const pts=[[a,y-4]];for(let k=0;k<9;k++){a+=2+R()*3;pts.push([a,y-5-R()**2*7])}line(c,pts,'#615a48',1.2);a+=6}}}
    line(c,[[345,53],[345,251]],rust,1);
  });
  art('letter',240,160,(c,w,h)=>{paper(c,w,h,'#efe0b7');line(c,[[3,3],[119,92],[238,3]],'#afa17f',2);line(c,[[3,157],[85,79]],'#b5a682');line(c,[[237,157],[155,79]],'#b5a682');dot(c,120,94,14,'#a4513c');text(c,'V',120,93,17,'#d59b6c',true)});
  art('botany',290,382,(c,w,h)=>{
    paper(c,w,h,'#e4d6af');border(c,w,h,10,'#827653',1);tracked(c,'FIELD COLOURS',145,39,15,2.5,dk);
    text(c,'Reseda luteola',145,332,24,dk,true);tracked(c,'DYER’S WELD  ·  PL. III',145,357,9,1.2,rust);
    for(const [x,y,ang,sc] of [[140,292,-.22,1],[146,289,.21,.79],[138,285,-.59,.61]]){
      c.save();c.translate(x,y);c.rotate(ang);c.scale(sc,sc);line(c,[[0,0],[3,-80],[0,-155],[-3,-213]],'#566344',2.2);
      for(let i=0;i<8;i++){let s=i%2?1:-1;c.fillStyle='#73805a';c.beginPath();c.ellipse(s*10,-20-i*14,16,3.3,-s*.62,0,tau);c.fill()}
      for(let i=0;i<25;i++){let yy=-131-i*3.2,xx=(i%2?1:-1)*(6-i*.13);dot(c,xx,yy,4.8-i*.09,'#a58d36');dot(c,xx-1,yy-1,2.2,'#d0bc66')}c.restore();
    }
  });
  art('sampler',320,380,(c,w,h)=>{
    paper(c,w,h,'#dbcda5');border(c,w,h,12,'#845b43',2);tracked(c,'DYE SAMPLES',160,40,17,3,dk);
    const cols=['#994b44','#be8d4c','#d3b65e','#566d86','#647d66','#735563'];
    cols.forEach((co,i)=>{const x=42+(i%2)*130,y=72+Math.floor(i/2)*90;c.fillStyle=co;c.fillRect(x,y,103,51);for(let j=0;j<24;j++){c.fillRect(x+j*4.4,y+51,1.7,2+R()*4)}text(c,['Madder','Walnut','Weld','Woad','Nettle','Logwood'][i],x+50,y+68,15,dk,true)});
    tracked(c,'I. VALE  /  FOLIO 12',160,354,10,2.5,rust);
  });
  for(const [key,str] of Object.entries({thread:'SILK  THREAD',linen:'LINEN  TAPE',buttons:'HORN  BUTTONS',woad:'WOAD',madder:'MADDER',weld:'WELD',needles:'NEEDLES',pins:'BRASS  PINS',mend:'MENDING',stock:'I. VALE',letters:'LETTERS'})){
    art(key,240,84,(c,w,h)=>{paper(c,w,h,'#dfcfa6');border(c,w,h,5,'#8b795a',1.5);text(c,str,120,44,str.length>10?20:25,'#353b30',false,true);});
  }
  for(let i=0;i<12;i++)art('num'+i,96,50,(c,w,h)=>{paper(c,w,h,'#d7c696');text(c,String(i+1).padStart(2,'0'),48,26,34,dk,true)});
  art('rug',512,256,(c,w,h)=>{
    paper(c,w,h,'#814a3f');border(c,w,h,5,'#393f36',8);border(c,w,h,15,'#bd9d6c',5);border(c,w,h,25,'#354f48',8);border(c,w,h,33,'#cbaf7c',2);
    for(let x=10;x<w;x+=18)for(const y of [24,232])diamond(c,x,y,5,3,cream);
    for(const x of [100,256,412]){diamond(c,x,128,70,81,'#d0b17c');diamond(c,x,128,58,68,'#48625b');diamond(c,x,128,36,43,'#b77c53');diamond(c,x,128,21,23,'#4f5550');diamond(c,x,128,8,9,'#d7bc89')}
    for(let y=0;y<h;y+=2)line(c,[[0,y],[w,y]],y%6?'rgba(38,29,23,.12)':'rgba(238,224,168,.16)',1);
  });
  art('measure',512,40,(c,w,h)=>{paper(c,w,h,'#d4b987');for(let i=0;i<100;i++){const x=5+i*5;line(c,[[x,0],[x,i%5===0?17:9]],'#4c4432',1.4);if(i%10===0)text(c,i,x+5,28,10,'#514631')}});
  const schemes=[['#ac5449','#ead3a6','#755345'],['#466977','#c5c5a8','#75918f'],['#a98c4e','#eddfaf','#776948'],['#70826a','#d8d5b4','#485f55'],['#b49699','#ece1c7','#886974']];
  schemes.forEach(([base,petal,detail],i)=>{
    const c=canvas(256,256),g=c.getContext('2d');g.fillStyle=base;g.fillRect(0,0,256,256);
    if(i===2||i===4){
      for(let x=0;x<256;x+=64){g.fillStyle=petal;g.fillRect(x+6,0,4,256);g.fillRect(x+16,0,2,256);g.fillStyle=detail;g.fillRect(x+23,0,9,256);for(let y=0;y<256;y+=32)diamond(g,x+46,y+14,4,7,petal)}
    }else{
      for(let y=-32;y<300;y+=64)for(let x=-60;x<310;x+=64){
        const xx=x+((y+32)%128===0?0:32);g.save();g.translate(xx,y);g.rotate(-.3);line(g,[[-8,18],[2,0],[6,-11]],petal,1.6);
        for(let k=0;k<5;k++){g.save();g.translate(7,-12);g.rotate(k*tau/5);g.beginPath();g.ellipse(0,-4.5,2.1,4.1,0,0,tau);g.fillStyle=petal;g.fill();g.restore()}
        for(const d of [-1,1]){g.beginPath();g.ellipse(d*4,4+3*d,5.8,2.4,d*.7,0,tau);g.fillStyle=petal;g.fill()}dot(g,7,-12,1.8,detail);g.restore()
      }
    }
    for(let p=0;p<256;p+=2){line(g,[[p,0],[p,256]],'rgba(237,227,200,.065)');line(g,[[0,p],[256,p]],'rgba(36,31,24,.075)')}
    materials['fabric'+i]=new T.MeshStandardMaterial({map:tex(c),roughness:1,vertexColors:true,side:T.DoubleSide});
  });
}
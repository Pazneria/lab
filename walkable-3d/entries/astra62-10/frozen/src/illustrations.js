import {rng,TAU} from './workshop.js';
function canvas(n,m){const c=document.createElement('canvas');c.width=n;c.height=m;return [c,c.getContext('2d')];}
export function makeClock(){
  const [c,a]=canvas(512,512);const r=rng(954);a.fillStyle='#e2d8ba';a.fillRect(0,0,512,512);
  const gradient=a.createRadialGradient(239,211,54,256,256,267);gradient.addColorStop(0,'#f2e8cc');gradient.addColorStop(1,'#c3b89a');
  a.fillStyle=gradient;a.fillRect(0,0,512,512);a.translate(256,256);a.strokeStyle='#6a624d';
  for(const rad of [238,225,170]){a.lineWidth=rad===238?3:1.4;a.beginPath();a.arc(0,0,rad,0,TAU);a.stroke();}
  for(let i=0;i<60;i++){a.save();a.rotate(TAU*i/60);a.fillStyle='#504d40';a.fillRect(i%5?-1:-2.5,-235,i%5?2:5,i%5?6:12);a.restore();}
  const roman=['XII','I','II','III','IV','V','VI','VII','VIII','IX','X','XI'];a.fillStyle='#443f33';a.font='30px Georgia';a.textAlign='center';a.textBaseline='middle';
  for(let i=0;i<12;i++){const t=i*TAU/12;a.fillText(roman[i],197*Math.sin(t),-197*Math.cos(t));}
  a.font='17px Georgia';a.fillText('A L D E R W I C K',0,-60);a.font='italic 15px Georgia';a.fillText('A.D. 1893',0,66);
  function hand(t,len,w){a.save();a.rotate(t);a.beginPath();a.moveTo(0,21);a.lineTo(-w,1);a.lineTo(-w*.44,-len*.69);a.lineTo(-w*.82,-len*.78);a.lineTo(0,-len);a.lineTo(w*.82,-len*.78);a.lineTo(w*.44,-len*.69);a.lineTo(w,1);a.closePath();a.fillStyle='#34372f';a.fill();a.restore();}
  hand(TAU*4.67/12,135,7.3);hand(TAU*40/60,196,5);
  a.beginPath();a.arc(0,0,8,0,TAU);a.fillStyle='#a48a55';a.fill();
  for(let i=0;i<5000;i++){a.fillStyle='rgba(75,59,40,'+r()*.10+')';a.fillRect(r()*512-256,r()*512-256,1+r()*2,1);}
  return c;
}
export function makeMoths(){
  const [c,a]=canvas(512,704),r=rng(129);a.fillStyle='#e5d7b6';a.fillRect(0,0,512,704);
  for(let i=0;i<13000;i++){a.fillStyle='rgba(100,78,41,'+r()*.11+')';a.fillRect(r()*512,r()*704,1+r()*2,1);}
  a.textAlign='center';a.fillStyle='#575945';a.font='20px Georgia';a.fillText('INSECTA   BRITANNICA',256,45);a.fillRect(43,62,426,1);a.font='italic 13px Georgia';a.textAlign='right';a.fillText('Plate XXVI',462,82);
  const groups=[[256,212,1.02,'#b89a68','#665f46'],[158,413,.65,'#b0785c','#5d5646'],[359,421,.58,'#9caa85','#5b7057']];
  for(const [x,y,sc,c1,c2] of groups){
    a.save();a.translate(x,y);a.scale(sc,sc);
    for(const s of [-1,1]){
      a.save();a.scale(s,1);a.beginPath();a.moveTo(0,-5);a.bezierCurveTo(47,-48,105,-80,154,-75);a.bezierCurveTo(141,-38,103,0,45,19);a.bezierCurveTo(100,9,119,8,120,24);a.bezierCurveTo(109,65,58,81,11,45);a.closePath();a.fillStyle=c1;a.fill();a.strokeStyle=c2;a.lineWidth=2;a.stroke();
      for(let i=0;i<7;i++){a.beginPath();a.moveTo(9,8);a.quadraticCurveTo(65,-15,148-i*9,-70+i*13);a.lineWidth=.8;a.stroke();a.beginPath();a.moveTo(9,11);a.quadraticCurveTo(45,32,114-i*10,25+i*5);a.stroke();}
      for(let i=0;i<9;i++){a.beginPath();a.ellipse(118-i*7,-62+i*7.8,7-i*.35,4,-.5,0,TAU);a.fillStyle=c2;a.fill();}
      for(const [xx,yy,rr] of [[65,-20,12],[70,35,9]]){
        a.beginPath();a.ellipse(xx,yy,rr,rr*.64,-.5,0,TAU);a.fillStyle=c2;a.fill();
        a.beginPath();a.arc(xx,yy,rr*.31,0,TAU);a.fillStyle='#d2c097';a.fill();
      }
      a.beginPath();a.moveTo(0,-11);a.quadraticCurveTo(8,-29,22,-39);a.stroke();a.restore();
    }
    a.beginPath();a.ellipse(0,13,5.6,31,0,0,TAU);a.fillStyle='#5a5842';a.fill();a.beginPath();a.arc(0,-14,6.5,0,TAU);a.fill();a.restore();
  }
  a.textAlign='center';a.fillStyle='#555744';a.font='italic 21px Georgia';a.fillText('Lepidoptera of the fell',256,587);a.font='12px Georgia';a.fillText('FIELD  COLLECTION   ·   LARCH  VALLEY',256,625);a.fillRect(138,646,236,1);
  return c;
}

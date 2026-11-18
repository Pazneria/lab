import {rng,TAU} from './workshop.js';
import {bookcase,flatStack,plaque} from './stacks.js';
import {folio,frame} from './objects.js';
import {walnut,honey,dark,brass,iron,H} from './architecture.js';

export function oilStudy(){
  const c=document.createElement('canvas');c.width=720;c.height=452;const a=c.getContext('2d'),r=rng(88191);
  const sky=a.createLinearGradient(0,0,0,285);sky.addColorStop(0,'#87a4af');sky.addColorStop(.55,'#c5bda8');sky.addColorStop(1,'#e5c49a');a.fillStyle=sky;a.fillRect(0,0,720,452);
  for(let i=0;i<2000;i++){
    const x=r()*720,y=r()*262;a.fillStyle=r()>.48?'rgba(239,219,182,.11)':'rgba(117,147,151,.10)';a.fillRect(x,y,2+r()*15,.45+r()*2);
  }
  function band(y,amp,phase,col,lit,shade){
    const Y=x=>y+amp*(.62*Math.sin(x*.009+phase)+.24*Math.sin(x*.023+phase)+.12*Math.sin(x*.052-phase)+.022*Math.sin(x*.19));
    a.beginPath();a.moveTo(0,452);for(let x=0;x<=720;x+=2)a.lineTo(x,Y(x));a.lineTo(720,452);a.closePath();a.fillStyle=col;a.fill();
    a.save();a.clip();for(let i=0;i<2600;i++){
      const x=r()*720,yy=Y(x)+r()*(452-y+amp);a.strokeStyle=(Math.sin(x*.009+phase+.8)+r()*.7>0)?lit:shade;
      a.lineWidth=.4+r()*2.3;a.beginPath();a.moveTo(x,yy);a.lineTo(x+2+r()*9,yy+r()*3-1.5);a.stroke();
    }a.restore();
  }
  band(186,41,.39,'#89979a','rgba(186,177,157,.32)','rgba(107,129,135,.35)');
  band(222,30,2.7,'#85918a','rgba(172,169,139,.38)','rgba(97,119,115,.33)');
  band(280,46,.12,'#78846e','rgba(159,154,113,.47)','rgba(81,103,92,.46)');
  band(357,45,3.8,'#777956','rgba(180,160,104,.44)','rgba(72,88,71,.51)');
  for(let i=0;i<50;i++){
    const x=49+r()*192,y=279+.12*x+r()*18,h=12+r()*35;
    a.fillStyle='#4f614f';a.beginPath();a.moveTo(x,y);a.quadraticCurveTo(x-h*.12,y-h*.50,x,y-h);a.quadraticCurveTo(x+h*.12,y-h*.58,x+h*.07,y);a.fill();
  }
  for(let i=0;i<5;i++){const x=383+i*17,y=286+(i%2)*7;a.fillStyle='#c8b390';a.fillRect(x,y,13,6);a.fillStyle='#8c6752';a.beginPath();a.moveTo(x-2,y);a.lineTo(x+4,y-4);a.lineTo(x+13,y-4);a.lineTo(x+15,y);a.fill();}
  for(let i=0;i<8000;i++){a.fillStyle=r()>.5?'rgba(245,221,171,.075)':'rgba(49,56,45,.076)';a.fillRect(r()*720,r()*452,1+r()*3,.6+r()*2);}
  a.font='italic 10px Georgia';a.fillStyle='#b3a188';a.fillText('E. Larch   /   09',616,422);return c;
}
function ladder(W){
  W.at(-7.44,0,7.30,Math.PI/2,()=>{
    W.rod('brass',[-1.30,2.75,.561],[2.44,2.75,.561],.022,.022,brass,10);
    for(const xx of [-1.17,.56,2.34])W.beam('iron',[xx,2.84,.435],[xx,2.75,.561],.035,.033,iron);
    for(const s of [-1,1]){
      W.beam('wood',[s*.185,.061,1.065],[s*.185,2.91,.535],.054,.083,'#cfb18c');
      W.rod('iron',[s*.21,.083,1.047],[s*.16,.083,1.047],.076,.076,'#52534a',14);
      W.rod('brass',[s*.217,.083,1.047],[s*.221,.083,1.047],.024,.024,brass,10);
      W.beam('iron',[s*.185,2.71,.569],[s*.185,2.806,.493],.027,.029,iron);
    }
    for(let i=0;i<10;i++){const yy=.265+i*.259,z=1.065-(yy-.061)*.53/2.849;
      W.box('wood',0,yy,z,.388,.031,.092,'#d6bd9c');
      for(const s of [-1,1])W.rod('iron',[s*.208,yy,z],[s*.215,yy,z],.009,.008,'#615a47',6);
    }
    W.solid(0,.791,.439,.59,0,2.87,'rolling shelf ladder');
  });
}
function cabinetStudy(W){
  const cx=-4.48,cz=-6.64,w=2.54,d=.33,h=1.16;
  for(const a of [0,Math.PI])bookcase(W,cx,0,cz,a,{width:w,height:h,bays:3,levels:2,depth:d,base:.145,seed:a?236:157,label:a?3:7,colour:'#a78a6e'});
  W.box('wood',cx,h+.030,cz,w+.181,.068,.89,'#cfb190');
  // Paired oak wedges carry the open herbarium at an angle to the aisle.
  W.at(cx-.40,h+.061,cz+.006,-.06,()=>{
    for(const s of [-1,1]){
      const xx=s*.19,pts=[[xx,.005,.17],[xx,.005,-.18],[xx,.127,-.18]];
      W.face('wood',s>0?pts.slice().reverse():pts,walnut);
      W.box('wood',xx,.055,-.122,.044,.11,.105,walnut);
    }
    W.pose(0,.078,0,.316,0,0,()=>{
      W.box('wood',0,.012,0,.735,.031,.443,honey);folio(W,0,.03,0,0,1.26);
      W.box('brass',0,.049,.217,.635,.028,.022,brass);
    });
  });
  flatStack(W,cx+.77,h+.065,cz+.015,2,861,1.21);
}
function mapTools(W){
  W.at(6.995,4.359,-8.15,-Math.PI/2,()=>{
    const p=[-.008,.008,-.08],q=[.042,.008,-.013];
    W.rod('brass',p,[-.097,.011,.073],.007,.0015,brass,8);W.rod('brass',p,[.071,.011,.063],.007,.0015,brass,8);
    W.rod('brass',[-.019,.008,-.081],[.003,.008,-.079],.010,.010,brass,8);
    W.box('wood',.132,.007,0,.030,.014,.283,'#dcc49a');
    for(let i=0;i<24;i++)W.box('plain',.125,.015,-.133+i*.011,i%5?.009:.018,.001,.0015,'#544c3a');
  });
}
function ao(W,x,y,z,w,d,angle=0,opacity='#ffffff'){
  W.at(x,y,z,angle,()=>W.face('contact',[[-w/2,0,d/2],[w/2,0,d/2],[w/2,0,-d/2],[-w/2,0,-d/2]],opacity));
}
export function collectedDetails(W){
  W.zone='west collections';ladder(W);cabinetStudy(W);
  W.zone='map gallery';frame(W,5.68,5.48,-10.36,0,2.11,1.37,'painting');mapTools(W);
  W.at(H.edge-.066,0,-.30,-Math.PI/2,()=>plaque(W,0,H.gallery-.20,0,.92,4,.097));
  W.zone='contact shadows';const prev=W.cast;W.cast=false;W.receive=false;
  for(const [x,y,z,w,d,angle] of [
    [-2.06,.026,-.17,2.01,3.63,-.065],[-9.67,.029,-4.96,1.19,1.09,.684],[-9.56,.029,-1.40,1.19,1.09,2.36],
    [-8.51,.029,-4.18,.8,.60,.36],[-9.92,.029,-3.15,.83,.78,0],[-4.88,.007,5.43,1.43,3.67,0],[-4.48,.007,-6.64,3.13,1.30,0],
    [-1.74,.007,-9.77,3.67,.98,0],[6.16,3.430,4.33,1.22,1.13,-1.97],[5.13,3.431,-9.08,1.11,.98,0],[-7.01,.007,7.29,1.12,.83,0]
  ])ao(W,x,y,z,w,d,angle);
  for(const z of [-9.99,-6.61,-2.71,1.52,5.48])ao(W,H.edge+.13,.007,z,.81,.78);
  W.cast=prev;W.receive=true;
}
export function contactMap(){
  const c=document.createElement('canvas');c.width=c.height=96;const a=c.getContext('2d'),g=a.createRadialGradient(48,48,3,48,48,48);
  g.addColorStop(0,'rgba(51,39,25,.68)');g.addColorStop(.48,'rgba(53,42,30,.51)');g.addColorStop(.76,'rgba(62,52,37,.24)');g.addColorStop(1,'rgba(66,55,38,0)');a.fillStyle=g;a.fillRect(0,0,96,96);return c;
}

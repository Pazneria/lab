import {book,flatStack} from './stacks.js';
import {rng,TAU} from './workshop.js';
import {honey,walnut,dark,brass,iron} from './architecture.js';

export function borderArt(){
  const c=document.createElement('canvas');c.width=256;c.height=64;const a=c.getContext('2d'),r=rng(1134);
  a.fillStyle='#496157';a.fillRect(0,0,256,64);
  for(const y of [5,9,54,58]){a.fillStyle=y===9||y===54?'#9b9875':'#baad87';a.fillRect(0,y,256,1);}
  for(let i=0;i<4;i++){
    const x=i*64+32,s=i%2?1:-1;
    a.strokeStyle='#bdaf86';a.lineWidth=1.8;a.beginPath();a.moveTo(x-32,32);
    a.bezierCurveTo(x-17,32+s*20,x+17,32-s*20,x+32,32);a.stroke();
    for(let j=-1;j<=1;j++){
      const xx=x+j*12,yy=32-s*j*3;
      a.save();a.translate(xx,yy);a.rotate(-s*(.75+j*.26));a.beginPath();a.moveTo(0,0);a.bezierCurveTo(-3,-2,-5,-7,-4,-11);a.bezierCurveTo(1,-9,3,-3,0,0);a.fillStyle=j===0?'#b0a37d':'#8e9b76';a.fill();a.restore();
    }
  }
  for(let i=0;i<950;i++){a.fillStyle=r()>.5?'rgba(203,183,139,.12)':'rgba(52,62,46,.14)';a.fillRect(r()*256,r()*64,1+r()*2,1);}
  return c;
}
function cornice(W,x,z,angle,len,y){
  W.at(x,0,z,angle,()=>{
    W.box('paint',0,y,.026,len,.160,.082,'#445b50');
    W.panel('frieze',0,y,.070,len,.153,'#fff7db',[[0,0],[len/.83,0],[len/.83,1],[0,1]]);
    W.box('wood',0,y-.102,.043,len,.047,.118,'#b09574');
    W.box('wood',0,y+.106,.055,len,.061,.147,walnut);
  });
}
function trolley(W,x,z,angle){
  W.at(x,.002,z,angle,()=>{
    const r=rng(158);
    for(const s of [-1,1])for(const t of [-1,1]){
      const xx=s*.393,zz=t*.175;
      W.rod('iron',[xx-.020,.070,zz],[xx+.020,.070,zz],.062,.062,'#47483f',14);
      W.rod('brass',[xx-.026,.070,zz],[xx+.026,.070,zz],.021,.021,brass,10);
      W.box('iron',xx,.143,zz,.035,.113,.041,iron);
      W.box('wood',xx,.537,zz,.043,.741,.055,walnut);
    }
    for(const yy of [.225,.558]){
      W.box('wood',0,yy,0,.897,.043,.438,'#b99a7b');
      W.box('paint',0,yy+.039,-.199,.886,.053,.033,'#466052');
      W.box('wood',0,yy-.027,.213,.906,.049,.034,walnut);
      for(const s of [-1,1])W.box('wood',s*.432,yy+.065,0,.040,.152,.439,'#b19777');
    }
    for(const s of [-1,1]){
      W.rod('brass',[s*.393,.899,-.177],[s*.393,.899,.178],.024,.024,brass,12);
      W.box('wood',s*.393,.694,0,.042,.056,.383,'#a98e70');
    }
    W.rod('wood',[-.393,.871,-.176],[.393,.871,-.176],.016,.016,walnut,10);
    let offset=-.369;
    for(let i=0;i<9;i++){const w=.029+r()*.025;book(W,offset+w/2,.580,.170-r()*.013,w,.18+r()*.09,.159+r()*.042,Math.floor(r()*128));offset+=w+.004;}
    book(W,offset+.053,.580,.158,.048,.252,.190,33,.188);
    flatStack(W,.237,.581,.004,3,604,.87);flatStack(W,-.166,.247,.014,3,710,1.29);
    flatStack(W,.206,.247,-.002,2,922,1.10);
    W.solid(0,0,.904,.449,0,.930,'book trolley');
  });
}
export function joinery(W){
  W.zone='shell';
  cornice(W,0,8.984,Math.PI,14.94,3.744);
  cornice(W,0,-10.381,0,14.96,7.248);
  // A mobile return cart stands at the end of the east collection.
  W.zone='south collections';trolley(W,3.90,6.91,-.38);
}

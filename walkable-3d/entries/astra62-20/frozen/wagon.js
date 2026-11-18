import {zone,box,place,lathe,rod,beam,torus,path,grid,face,ellipsoid,print,pi,tau} from './geometry.js';
import {P,rand} from './materials.js';
import {frame,pin,panel,strapHinge,handle,wear,pick,lantern} from './joinery.js';
import {L,W,F,endStep,tread,stepStart,stairZ} from './walk.js';
const E=3.06, roof=z=>E+.59*(1-(z/1.52)**2);
const greens=['#386759','#3d6c5d','#426f60','#386656','#3e6b59'],honey=['#bc9b71','#c8a77b','#c1a278','#cbaf84','#bda079'];
function clad(x0,x1,y0,y1,z,s){
  if(x1<=x0||y1<=y0)return;
  const w=x1-x0,h=y1-y0,n=Math.ceil(h/.144),cx=(x0+x1)/2;
  box(cx,(y0+y1)/2,z,w,h,.073,'#514c39','wood',0);
  for(let i=0;i<n;i++){
    const yy=y0+(i+.5)*h/n,k=w>4?2:1,cut=x0+w*(.34+rand()*.32);
    for(const [a,b] of (k===1?[[x0,x1]]:[[x0,cut],[cut,x1]])){
      box((a+b)/2,yy,z+s*.041,b-a-.002,h/n-.003,.035,pick(greens),'paint',.004);
      box((a+b)/2,yy,z-s*.040,b-a-.002,h/n-.0025,.028,pick(honey),'wood',.003);
    }
  }
}
function windowAt(x,z,w,y0,y1,s){
  const y=(y0+y1)/2,h=y1-y0;
  for(const d of [-1,1]){
    const zz=z+s*d*.065;frame(x,y,zz,w+.154,h+.14,.073,d===1?P.deep:P.oak,.058,d===1?'paint':'wood');
    frame(x,y,zz+s*d*.027,w+.042,h+.034,.023,d===1?P.trim:P.maple,.022);
    box(x,y0-.045,zz,w+.21,.065,.15,d===1?P.pine:P.oak,d===1?'paint':'wood');
  }
  frame(x,y,z,w-.012,h-.008,.035,P.cream,.056,'paint');
  box(x,y,z,.032,h-.05,.035,P.cream,'paint');
  box(x,y+.018,z,w-.05,.034,.036,P.cream,'paint');
  for(const dx of [-1,1])for(const dy of [-1,1])box(x+dx*w*.245,y+dy*h*.245,z,w*.47,h*.46,.003,'#cbd6bf','glass',0);
}
function side(s){
  const z=s*W;
  if(s===1){
    clad(-L,3.4,F,1.30,z,s);clad(3.4,L,F,E,z,s);
    clad(-L,-.06,1.30,1.81,z,s);clad(-L,-3.14,1.81,2.61,z,s);
    clad(-1.90,-.06,1.81,2.61,z,s);clad(-L,-.06,2.61,E,z,s);
    clad(-.06,3.40,2.93,E,z,s);windowAt(-2.52,z,1.24,1.81,2.61,s);
    print('tradeSeal',-.99,2.05,z+.063,1.22,1.01);
    box(1.66,1.294,z,3.50,.09,.206,P.oak,'wood');
    for(const x of [-.085,3.415]){
      box(x,2.13,z,.108,1.66,.147,P.deep,'paint');
      box(x,2.13,z+.079,.024,1.66,.014,P.trim,'paint');
    }
  }else{
    clad(-L,L,F,1.80,z,s);clad(-L,-3.13,1.80,2.57,z,s);clad(-1.69,L,1.80,2.57,z,s);
    clad(-L,L,2.57,2.70,z,s);clad(-L,.38,2.70,2.94,z,s);clad(2.90,L,2.70,2.94,z,s);clad(-L,L,2.94,E,z,s);
    windowAt(-2.41,z,1.44,1.80,2.57,s);windowAt(1.64,z,2.52,2.70,2.94,s);
  }
  for(const x of [-3.60,-1.67,-.17,3.59,...(s<0?[1.66]:[])]){
    if(s===1&&x===-1.67)continue;
    box(x,(F+E)/2,z+s*.068,.082,E-F,.072,P.deep,'paint');
    box(x,(F+E)/2,z+s*.108,.015,E-F-.10,.009,P.trim,'paint',.002);
    for(const yy of [F+.09,E-.09])place(x,yy,z+s*.114,()=>pin(0,0,0,.019),0,s===1?0:pi);
  }
  for(const [y,h,c] of [[F+.014,.12,P.deep],[F+.088,.025,P.trim],[E-.029,.14,P.deep],[E+.036,.031,P.trim]]){
    box(0,y,z+s*.077,2*L+.20,h,.102,c,'paint');
  }
  if(s===1){
    wear(-1.15,F+.012,z+.131,4.28,.055,44);
    wear(-2.48,1.495,z+.080,2.00,.040,16);
    wear(-.09,2.09,z+.146,.028,1.47,12);
  }
  if(s===1){box(-1.91,1.51,z+.066,3.36,.033,.018,P.trim,'paint');box(-1.91,1.47,z+.065,3.36,.013,.016,P.trim,'paint')}
  for(let k=0;k<19;k++){const x=-3.45+k*.38;box(x,E-.109,z+s*.084,.105,.065,.080,P.chestnut,'wood');}
}
function gable(sign){
  const x=sign*L;
  // Wall-face x runs across the end, with its positive z normal facing outside.
  place(x,0,0,()=>{
    function slab(a,b,lo,hi){
      for(let q=0,n=Math.ceil((b-a)/.129);q<n;q++){
        const xx=a+(q+.5)*(b-a)/n;
        box(xx,(lo+hi)/2,0,(b-a)/n-.002,hi-lo,.099,pick(greens),'paint',.004);
        box(xx,(lo+hi)/2,-.057,(b-a)/n-.002,hi-lo,.022,pick(honey),'wood',.003);
      }
    }
    if(sign<0){slab(-W,-.48,F,E);slab(.78,W,F,E);slab(-.48,.78,2.92,E);}
    else{slab(-W,W,F,E);panel(0,1.91,.067,1.72,1.64,P.pine,P.deep);print('tradeSeal',0,1.95,.103,1.45,1.25)}
    for(let i=0;i<25;i++){
      const a=-1.455+i*2.91/25,b=a+2.91/25,xx=(a+b)/2,t=roof(Math.max(Math.abs(a),Math.abs(b)));
      if(t>E)box(xx,(E+t)/2,.001,b-a-.001,t-E,.115,pick(greens),'paint',.002);
    }
    for(const y of [F+.025,E-.008])box(0,y,.071,2.88,.083,.064,P.deep,'paint');
    if(sign<0){
      for(const xx of [-.51,.81]){box(xx,1.90,.087,.095,2.08,.11,P.deep,'paint');box(xx,1.91,.15,.022,2.01,.014,P.trim,'paint');}
      box(.15,2.94,.088,1.42,.10,.11,P.deep,'paint');
      box(.15,F+.007,.027,1.24,.038,.19,P.oak);
    }
    print('endSeal',0,3.29,.065,1.32,.358);
    const ps=[];for(let i=0;i<=18;i++){const z=-1.52+i*3.04/18;ps.push([z,roof(z)+.02,.117])}
    path(ps,.057,P.deep,'paint',36,6);path(ps.map(q=>[q[0],q[1]+.013,q[2]+.05]),.009,P.trim,'paint',36,5);
    for(const d of [-1,1]){
      const xx=d*1.27;
      face([[xx-.10,3.02,.12],[xx+.10,3.02,.12],[xx+.06,2.91,.12],[xx,2.85,.12],[xx-.06,2.91,.12]],P.oak,'wood');
    }
  },0,sign<0?-pi/2:pi/2);
}
function roofShell(){
  grid(4,28,(s,t)=>[-3.85+s*7.70,roof(-1.535+t*3.07)+.072,-1.535+t*3.07],'#54695f','cloth',[13,10],true);
  for(let i=0;i<24;i++){
    const a=-1.465+i*2.93/24,b=a+2.93/24,mid=(a+b)/2;
    place(0,roof(mid)+.018,mid,()=>box(0,0,0,7.59,.051,Math.hypot(b-a,roof(b)-roof(a))-.002,pick(['#c6ac80','#b69a70','#c2a47b']),'wood',.003),-Math.atan2(roof(b)-roof(a),b-a));
  }
  for(const x of [-3.77,-2.48,-1.23,.02,1.27,2.52,3.77]){
    const p=Array.from({length:19},(_,i)=>{const z=-1.535+3.07*i/18;return [x,roof(z)+.078,z]});path(p,.016,'#48594f','cloth',32,6);
    if(Math.abs(x)<3.75){
      const inside=p.map(q=>[q[0],q[1]-.123,q[2]]);path(inside,.043,P.oak,'wood',26,6);
    }
  }
  for(const s of [-1,1]){
    box(0,E+.061,s*1.535,7.77,.116,.078,P.deep,'paint');box(0,E+.046,s*1.579,7.76,.019,.012,P.trim,'paint');
  }
}
function wheels(){
  zone('runningGear');
  for(const xx of [-2.59,2.63]){
    const r=xx<0?.613:.573;
    rod([xx,r,-1.59],[xx,r,1.59],.076,P.iron,'metal',.076,16);
    for(const s of [-1,1])place(xx,r,s*1.54,()=>{
      // Each felloe is a separate scarfed piece, banded with a flat iron tyre.
      function rim(r0,r1,width,col,mat,segments=56,split=0){
        const seg=segments;for(let j=0;j<seg;j++){
          const a=j*tau/seg+split,b=(j+1)*tau/seg-split;
          const point=(k,R,z)=>[Math.cos(k)*R,Math.sin(k)*R,z];
          for(const dz of [-1,1])face([point(a,r0,dz*width/2),point(a,r1,dz*width/2),point(b,r1,dz*width/2),point(b,r0,dz*width/2)],col,mat,[[0,0],[0,.15],[.3,.15],[.3,0]]);
          face([point(a,r1,-width/2),point(b,r1,-width/2),point(b,r1,width/2),point(a,r1,width/2)],col,mat);
          face([point(a,r0,width/2),point(b,r0,width/2),point(b,r0,-width/2),point(a,r0,-width/2)],col,mat);
        }
      }
      rim(r-.018,r,.126,'#484a40','metal');rim(r-.087,r-.015,.107,'#976c3c','wood',42,.0015);
      for(const dz of [-1,1])torus(0,0,dz*.056,r-.051,.009,P.trim,'paint',48,5);
      for(let j=0;j<14;j++){
        const a=j*tau/14+(xx>0?.10:0);
        place(0,0,0,()=>{
          lathe(0,0,0,[[.043,.087],[.048,.136],[.029,.21],[.022,r-.11],[.032,r-.067]],j%3===0?'#a87743':'#a5723d','wood',8);
          rod([0,.178,.032],[0,r-.121,.024],.004,P.trim,'paint',.003,5);
          pin(0,r-.046,.063,.010,P.iron);
        },0,0,a)
      }
      place(0,0,-.135,()=>{
        lathe(0,0,0,[[.069,0],[.096,.032],[.118,.085],[.123,.146],[.105,.192],[.081,.245],[.067,.262]],P.chestnut,'wood',24);
        for(const [h,rr] of [[.038,.104],[.166,.114],[.213,.096]])lathe(0,h,0,[[rr,0],[rr,.021]],P.iron,'metal',22);
        lathe(0,.248,0,[[.073,0],[.082,.009],[.075,.028],[.045,.044]],P.brass,'metal',18);
      },pi/2);
    },0,s<0?pi:0);
  }
  for(const s of [-1,1]){
    box(0,.689,s*.93,7.36,.156,.132,P.walnut,'wood');
    for(const x of [-2.59,2.63]){
      for(let j=0;j<3;j++)path([[x-.53+j*.075,.745-j*.019,s*1.07],[x-.27,.652-j*.022,s*1.07],[x,.632-j*.019,s*1.07],[x+.27,.652-j*.022,s*1.07],[x+.53-j*.075,.745-j*.019,s*1.07]],.025,'#51534b','metal',13,5);
      box(x,.679,s*1.07,.132,.184,.137,P.iron,'metal');
    }
    beam([3.16,.65,s*.74],[5.56,.46,s*.86],.080,.088,P.oak);
    rod([5.34,.477,s*.85],[5.57,.46,s*.86],.048,P.leather,'leather');
  }
  for(const s of [-1,1])box(0,.799,s*1.364,7.37,.161,.117,P.walnut);
  // The parked shafts rest on a folding prop with a transverse bolster.
  box(5.008,.469,0,.116,.073,1.815,P.oak);
  for(const s of [-1,1]){
    beam([4.827,.018,s*.835],[5.008,.457,s*.692],.054,.053,P.chestnut);
    beam([5.176,.018,s*.835],[5.008,.457,s*.692],.052,.049,P.oak);
    rod([5.009,.418,s*.652],[5.009,.418,s*.750],.019,P.brass,'metal');
    path([[4.033,.631,s*.789],[4.06,.553,s*.879],[4.117,.475,s*.857],[4.143,.493,s*.828],[4.140,.632,s*.798]],.013,P.leather,'leather',11,6);
  }
  box(3.814,.632,0,.087,.082,1.518,P.walnut);
  rod([3.81,.604,-.019],[3.89,.604,-.019],.022,P.iron);
  for(const x of [-3.13,-1.48,.37,2.30,3.35])box(x,.755,0,.135,.135,2.81,P.walnut);
  for(let j=0;j<3;j++)box(-.1,.803,(j-1)*.82,7.38,.085,.146,P.chestnut);
}
function entrance(){
  zone('entrance');
  box((endStep-L)/2,F-.039,stairZ,-L-endStep+.04,.078,1.27,P.oak);
  for(let i=0;i<4;i++){
    const x=stepStart+(i+.5)*tread,y=(i+1)*.18;
    for(const d of [-1,1])box(x+d*tread*.245,y-.029,stairZ,tread*.495,.058,1.23,pick(['#b1895a','#b58c5d','#b28b5b']));
    box(x-tread/2+.014,y-.027,stairZ,.044,.060,1.25,'#c39c66');
    for(const z of [-.49,.49])rod([x-.07,y-.002,stairZ+z],[x-.07,y+.004,stairZ+z],.011,P.iron,'metal',.011,7);
  }
  for(const s of [-1,1]){
    beam([stepStart-.02,.068,stairZ+s*.505],[endStep+.06,F-.1,stairZ+s*.505],.106,.10,P.walnut);
    box(endStep+.085,.416,stairZ+s*.517,.095,.83,.097,P.chestnut);
    box(-3.80,.405,stairZ+s*.517,.096,.81,.094,P.chestnut);
    beam([endStep+.08,.125,stairZ+s*.517],[-3.78,.795,stairZ+s*.517],.056,.059,P.oak);
  }
  const z=stairZ+.622;
  for(const [x,h] of [[stepStart+.056,.18],[endStep+.045,.90],[-3.76,.90]]){
    box(x,h+.395,z,.064,.965,.066,P.deep,'paint');lathe(x,h+.878,z,[[.046,0],[.052,.018],[.032,.048],[.011,.058]],P.brass,'metal',12);
  }
  beam([stepStart+.056,1.019,z],[endStep+.045,1.739,z],.074,.074,P.oak);
  box((endStep-.0-3.73)/2,1.739,z,.45,.075,.074,P.oak);
  place(-L-.071,0,-.48,()=>{
    const w=1.225,cy=F+.99;
    box(w*.5,F+.515,0,w,1.03,.079,P.deep,'paint');
    for(const x of [.063,w-.063])box(x,cy,0,.126,1.98,.084,P.pine,'paint');
    box(w/2,F+1.93,0,w,.11,.086,P.pine,'paint');
    for(const z of [-.053,.053]){
      panel(w/2,F+.52,z,w-.23,.74,P.pine,P.deep);
      frame(w/2,F+1.466,z,w-.22,.88,.047,P.trim,.027,'paint');
    }
    box(w*.5,F+1.463,0,.036,.84,.057,P.cream,'paint');box(w*.5,F+1.477,0,w-.23,.033,.057,P.cream,'paint');
    box(w*.5,F+1.465,0,w-.25,.80,.005,'#b4c9b8','glass',0);
    for(const sz of [-1,1]){
      box(w-.16,F+.94,sz*.053,.072,.215,.021,P.bronze,'metal');rod([w-.16,F+.969,sz*.06],[w-.16,F+.969,sz*.122],.025,P.brass);
      ellipsoid(w-.16,F+.969,sz*.123,.036,.031,.024,P.brass,'metal',12,6);
    }
    wear(w-.105,F+.95,.059,.115,.26,22);
    wear(w*.50,F+.148,.060,.99,.066,20);
    for(const y of [F+.24,F+1.74]){box(.14,y,.054,.258,.045,.015,P.iron,'metal');pin(.244,y,.064,.013)}
  },0,pi-.29);
  // Lamp on the sheltered gable, beside the jamb.
  place(-L-.139,2.11,1.053,()=>{box(0,.04,0,.154,.25,.022,P.iron,'metal');path([[0,.09,.01],[0,.19,.12],[0,.17,.21],[0,.115,.22]],.014,P.iron);lantern(0,-.30,.22,1.06)},0,-pi/2);
}
export function buildWagon(){
  wheels();zone('body');
  box(0,F-.093,0,2*L+.11,.15,2*W+.10,P.walnut);
  const n=15;for(let i=0;i<n;i++){
    const z=-W+(i+.5)*2*W/n,j=-1.5+rand()*2.75,cut=j+2.3+rand()*.75;
    for(const [a,b] of [[-L,j],[j,cut],[cut,L]]){if(b<=a)continue;box((a+b)/2,F-.022,z,b-a-.002,.044,2*W/n-.0028,pick(['#b48c5e','#bf9667','#b78e60','#bc976a','#b78f64']),'wood',.003)}
  }
  side(-1);side(1);gable(-1);gable(1);roofShell();entrance();
  zone('body');
  // Narrow moulded transition arch leaves the entire central aisle open.
  for(const s of [-1,1]){
    box(-.08,1.99,s*1.272,.105,2.18,.103,P.deep,'paint');
    box(-.018,1.98,s*1.27,.018,2.08,.025,P.trim,'paint');
    beam([-.08,2.83,s*1.26],[-.08,3.356,s*.82],.096,.09,P.oak);
  }
  // Chocks and a leather-lashed toolbox under the long sill.
  for(const [xx,s] of [[-2.59,1],[2.63,-1]])place(xx-.43,.004,s*1.54,()=>{const a=-.20,b=.18,h=.152,d=.108;for(const z of [-d,d])face([[a,0,z],[b,0,z],[b,h,z]],P.chestnut,'wood');face([[a,0,-d],[b,h,-d],[b,h,d],[a,0,d]],P.oak,'wood');box(b,h/2,0,.012,h,d*2,P.walnut)});
  box(-.83,.64,1.28,1.24,.30,.28,P.pine,'paint');for(const x of [-1.30,-.36])box(x,.64,1.43,.057,.31,.024,P.leather,'leather');
}
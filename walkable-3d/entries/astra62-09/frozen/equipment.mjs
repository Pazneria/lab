import {T,C,PI,TAU,bolt,pipeJoint,seeded} from './geometry.mjs';

function splitShell(k){
  k.frame([6.69,0,-3.65],[0,-PI/2+.11,0],()=>{
    // The upper half of the opened compressor case is parked on a four-wheel service cradle.
    const axis=1.068,R=.970,L=1.13;
    const rr=(x,r,a)=>[x,axis+Math.cos(a)*r,Math.sin(a)*r];
    function arcTube(x,r,a1,a2,rad,m,c){
      k.tube(Array.from({length:21},(_,i)=>rr(x,r,a1+(a2-a1)*i/20)),rad,m,c,32,8);
    }
    function skin(x1,x2,r,a1,a2,m,c,inside=false){
      const p=[],n=[],idx=[];
      for(let i=0;i<=36;i++){
        const a=a1+(a2-a1)*i/36;
        for(const x of [x1,x2]){p.push(...rr(x,r,a));n.push(0,Math.cos(a)*(inside?-1:1),Math.sin(a)*(inside?-1:1))}
        if(i){const a=i*2-2,b=a+1,c=a+2,d=a+3;if(inside)idx.push(a,b,c,b,d,c);else idx.push(a,c,b,b,c,d)}
      }
      const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(p,3));g.setAttribute('normal',new T.Float32BufferAttribute(n,3));g.setIndex(idx);k.add(g,m,c);g.dispose();
    }
    k.box([0,.372,0],[2.68,.133,1.845],'paint',C.grey,.041);
    for(const x of [-1.09,1.09])for(const z of [-.71,.71]){
      k.cyl([x,.145,z],.14,.14,.093,'rubber',C.hose,'z',20);
      k.cyl([x,.145,z+.055],.066,.066,.023,'metal',C.steel,'z',12);
      k.box([x,.245,z],[.145,.21,.143],'metal',C.steel,.014);
      k.box([x,.705,z],[.085,.55,.089],'paint',C.teal,.008);
      k.bar([x,.437,z*.59],[x,.951,z],.056,.053,'metal',C.grey);
      k.box([x,.966,z],[.32,.111,.62],'rubber',C.iron,.019);
    }
    skin(-L,L,R,-PI/2,PI/2,'paint',0xb9c1b6);
    skin(-L,L,R-.047,-PI/2,PI/2,'metal',C.dark,true);
    for(const x of [-L,-.36,.38,L]){
      arcTube(x,R,-PI/2,PI/2,.043,'paint',x<-.9||x>.9?C.grey:C.hull);
      arcTube(x,R-.067,-PI/2,PI/2,.027,'metal',C.steel);
    }
    for(const side of [-1,1]){
      const z=side*R;
      k.box([0,axis,z],[2.38,.075,.21],'metal',C.steel,.017);
      for(let j=0;j<8;j++){
        const x=-.995+j*.284;
        k.cyl([x,axis+.043,z+side*.034],.035,.035,.009,'black',C.seam,'y',12);
        k.ring([x,axis+.049,z+side*.034],.036,.006,'bright',C.silver,'y',16);
      }
    }
    for(const x of [-.88,.90]){
      k.ring([x,axis+R+.070,0],.084,.029,'paint',C.ochre,'z',24);
      k.box([x,axis+R+.017,0],[.195,.053,.17],'paint',C.ochre,.012);
    }
    const a=1.00, p=rr(.01,R+.028,a);
    k.box(p,[.986,.047,.304],'paint',C.iron,.019,[a,0,0]);
    const surf=rr(.01,R+.054,a);
    k.label(surf,[0,Math.cos(a),Math.sin(a)],[0,Math.sin(a),-Math.cos(a)],.842,.196,['HC–04    /    UPPER  CASE','LIFT AT BOTH EYES'],{ink:'#d4d6c7'});
  });
  k.solid(5.58,-5.04,7.80,-2.25,0,2.20);k.contact(6.69,-3.65,2.68,3.48,.53);
}

function cabling(k){
  // Fixed ladder tray with four separately clipped lines, a formed corner and a junction box.
  k.frame([-8.15,0,-.70],[0,PI/2,0],()=>{
    for(const y of [1.14,1.48])k.box([0,y,.188],[7.88,.053,.205],'metal',C.grey,.007);
    for(let i=0;i<16;i++)k.box([-3.74+i*.5,1.31,.147],[.047,.354,.12],'metal',C.steel,.006);
    for(let i=0;i<4;i++){
      const y=1.20+i*.071;
      k.tube([[-3.97,y,.259],[-3.42,y,.259],[-2.7,y-.028,.259],[-2.00,y,.259],[-.83,y-.05,.259],[.13,y,.259],[1.16,y-.046,.259],[2.08,y,.259],[3.67,y,.259],[3.93,y+.16,.259],[3.96,y+.34,.259]],.024,'rubber',i===2?0x6e6253:C.hose,66,8);
      for(const x of [-3.40,-2.01,.13,2.08,3.55])k.cyl([x,y,.259],.029,.029,.033,'metal',C.steel,'x',8);
    }
    k.box([3.94,1.91,.209],[.65,.55,.277],'paint',C.teal,.037);
    k.box([3.94,1.91,.365],[.58,.473,.040],'paint',C.panel,.021);
    k.label([3.94,1.915,.389],[0,0,1],[0,1,0],.415,.129,'JB   /   16',{ink:'#415452'});
    for(const x of [3.70,4.18])for(const y of [1.73,2.09])bolt(k,[x,y,.389],'z',.021);
  });
  // Pipe bundle below the viewing port ties the machine bay to the service return.
  for(const [i,r] of [.086,.058].entries()){
    const y=.70+i*.24;
    k.tube([[6.94,y,-6.85],[6.94,y,-6.48],[6.71,y,-6.23],[6.31,y,-6.21],[5.55,y,-6.21],[5.27,y+.15,-6.21],[5.10,y+.28,-6.21],[4.61,y+.29,-6.21]],r,'metal',i?C.copper:C.steel,36,12);
    for(const x of [5.75,6.39])pipeJoint(k,[x,y,-6.21],'x',r);
  }
}
function meterPanel(k){
  // Twin readouts at the return end form a hands-on local station, with a single pilot lamp.
  k.frame([-2.41,0,.09],[0,PI,0],()=>{
    k.box([0,1.49,.378],[.66,.71,.326],'paint',C.iron,.055);
    k.box([0,1.49,.56],[.594,.64,.046],'paint',C.panel,.026);
    k.cyl([0,1.592,.599],.169,.17,.071,'metal',C.dark,'z',36);
    k.cyl([0,1.592,.64],.145,.145,.014,'paint',C.ivory,'z',36);
    for(let i=0;i<=12;i++){
      const a=(-.80+1.60*i/12)*PI;
      k.box([.112*Math.sin(a),1.592+.112*Math.cos(a),.653],[.007,i%3?.014:.027,.004],'mark',C.dark,0,[0,0,-a]);
    }
    k.rod([0,1.592,.658],[-.069,1.676,.658],.0055,'paint',C.red,8);
    k.cyl([0,1.592,.663],.015,.015,.008,'metal',C.grey,'z',12);
    k.label([0,1.526,.656],[0,0,1],[0,1,0],.096,.039,'MPa',{ink:'#303836'});
    k.cyl([-.16,1.307,.59],.047,.047,.04,'rubber',C.dark,'z',16);
    k.cyl([-.16,1.307,.616],.032,.032,.014,'signal',C.mint,'z',16);
    k.label([.067,1.305,.589],[0,0,1],[0,1,0],.279,.069,'RETURN',{ink:'#303a3b'});
    for(const x of [-.252,.252])for(const y of [1.231,1.747])bolt(k,[x,y,.59],'z',.019);
  });
}
export function buildEquipment(k){
  k.section('service alcove',()=>{
    k.frame([10.33,0,3.545],[0,PI,0],()=>{
      k.box([0,2.12,.02],[1.56,1.015,.073],'paint',C.grey,.021);
      k.box([0,2.12,.066],[1.488,.941,.016],'paint',C.light,.006);
      k.label([0,2.12,.079],[0,0,1],[0,1,0],1.454,.921,['HC–04'],{diagram:true});
      for(const x of [-.581,.581]){
        k.box([x,2.587,.091],[.151,.057,.024],'metal',C.steel,.007);
        bolt(k,[x,2.591,.105],'z',.015);
      }
    });
  });
  k.section('cover cradle',()=>splitShell(k));
  k.section('utility runs',()=>cabling(k));
  k.section('recirculator',()=>{
    meterPanel(k);
    // Guarded inspection bar below the open vanes.
    k.box([-.10,.87,1.815],[2.14,.112,.135],'paint',C.iron,.022);
    k.box([-.10,.926,1.819],[1.98,.028,.062],'signal',0xc5ebe1,.012);
    for(const x of [-.96,.01,.75])k.box([x,.909,1.818],[.038,.066,.151],'metal',C.steel,.006);
    for(const x of [-.98,.77])k.bar([x,.345,1.76],[x,.82,1.814],.049,.049,'metal',C.grey);
  });
}

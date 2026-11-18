import {T,C,PI,TAU,bolt,pipeJoint,handle} from './geometry.mjs';

const H=1.71,Z=.65;
function blades(k,x,inner,outer,count,chord,twist,col,phase=0) {
  const pos=[],index=[];
  const radial=4,across=4, layer=(radial+1)*(across+1);
  for(let side=0;side<2;side++)for(let j=0;j<=radial;j++)for(let i=0;i<=across;i++){
    const u=i/across,s=j/radial, r=inner+(outer-inner)*s;
    const a=twist*s*s+u*(TAU/count)*(.92-.17*s)+(.008+.015*Math.sin(PI*u))*side;
    const ax=(.5-u)*chord*(.64+.36*s)+.056*Math.sin(u*PI)*(1+s)-s*.06;
    pos.push(ax+(side?.011:0),r*Math.cos(a),r*Math.sin(a));
  }
  function quad(a,b,c,d){index.push(a,b,d,b,c,d)}
  for(let j=0;j<radial;j++)for(let i=0;i<across;i++){
    const a=j*(across+1)+i,b=a+1,d=a+across+1,c=d+1;
    quad(a,d,c,b);quad(a+layer,b+layer,c+layer,d+layer);
  }
  for(let j=0;j<radial;j++){const a=j*(across+1),b=a+across+1;quad(a,a+layer,b+layer,b);quad(b+across,b+across+layer,a+across+layer,a+across)}
  for(let i=0;i<across;i++){const a=i,b=i+1;quad(a,b,b+layer,a+layer);const c=a+radial*(across+1);quad(c,c+layer,c+layer+1,c+1)}
  for(let j=0;j<index.length;j+=3){const b=index[j+1];index[j+1]=index[j+2];index[j+2]=b}
  const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(pos,3));g.setIndex(index);g.computeVertexNormals();
  for(let j=0;j<count;j++)k.frame([x,H,Z],[phase+TAU*j/count,0,0],()=>k.add(g,'bright',j%4===0?C.steel:col));
  g.dispose();
}
export function buildMachine(k){
  k.section('recirculator',()=>{
    const box=(p,s,m,c,b=0,r)=>k.box(p,s,m,c,b,r);
    const turn=(x,profile,m,c,n=64)=>k.turn([x,H,Z],profile,m,c,'x',n);
    const end=(x,rt,rb,h,m,c,n=64)=>k.cyl([x,H,Z],rt,rb,h,m,c,'x',n);
    const ring=(x,R,r,m,c)=>k.ring([x,H,Z],R,r,m,c,'x',72);
    const radial=(x,r,a)=>[x,H+r*Math.cos(a),Z+r*Math.sin(a)];
    function boltsOn(x,r,n,size,c=C.silver){for(let i=0;i<n;i++){const a=TAU*(i+.5)/n;bolt(k,radial(x,r,a),'x',size,c)}}
    // Welded, anchored base with replaceable vibration isolators and two removable sumps.
    box([0,.105,Z],[6.46,.19,2.68],'paint',C.iron,.045);
    for(const z of [Z-1.28,Z+1.28]){
      box([0,.23,z],[6.36,.18,.16],'paint',C.grey,.017);
      box([0,.32,z],[6.34,.035,.25],'metal',C.dark,.008);
      for(const x of [-2.92,-1.56,0,1.56,2.92])bolt(k,[x,.345,z],'y',.051);
    }
    for(const x of [-2.43,1.87]){
      for(const dz of [-.86,.86]){
        box([x,.36,Z+dz],[.76,.07,.61],'metal',C.steel,.03);
        for(const xx of [-.23,.23])for(const zz of [-.20,.20])bolt(k,[x+xx,.409,Z+dz+zz],'y',.035);
        k.cyl([x,.472,Z+dz],.215,.25,.17,'rubber',C.hose,'y',24);
        k.cyl([x,.57,Z+dz],.25,.25,.06,'metal',C.steel,'y');
      }
      // Split A-frame stands. Webs have exposed bolt-on feet and pressed flanges.
      for(const dz of [-.83,.83]){
        const a=[x,.61,Z+dz],b=[x,1.29,Z+dz*.68];
        k.bar(a,b,.38,.24,'paint',C.teal);
        for(const dx of [-.22,.22])k.bar([x+dx,.61,Z+dz],[x+dx,1.30,Z+dz*.68],.052,.34,'paint',C.panel);
      }
      box([x,.78,Z],[.40,.19,1.70],'paint',C.teal,.018);
    }
    // Outboard drive with cast longitudinal cooling ribs, inspection covers and floating coupling.
    turn(-2.19,[[-.89,.02],[-.89,.49],[-.78,.63],[-.61,.77],[-.48,.80],[.39,.80],[.48,.72],[.53,.57],[.54,.02]],'paint',C.teal);
    for(let i=0;i<30;i++){
      const a=TAU*i/30;
      k.box(radial(-2.26,.804,a),[.91,.091,.035],'paint',i%5===0?C.panel:C.teal,.012,[a,0,0]);
    }
    for(const x of [-2.85,-2.70,-1.76]){
      end(x,.81,.81,.071,'paint',C.grey);ring(x+.04,.76,.017,'metal',C.silver);
    }
    end(-3.09,.49,.49,.14,'metal',C.dark);end(-3.16,.34,.42,.095,'metal',C.steel);
    boltsOn(-3.16,.418,10,.032);
    turn(-1.48,[[-.28,.52],[-.25,.82],[-.18,.88],[-.09,.90],[.03,.90],[.10,.80],[.20,.66]],'paint',C.ochre);
    for(const x of [-1.64,-1.39]){end(x,.94,.94,.07,'paint',C.yellow);boltsOn(x+.043,.852,16,.038)}
    // Exposed multi-stage rotor. Each ring is built with swept, thick airfoil blades.
    turn(.15,[[-1.56,.28],[-1.5,.49],[-1.29,.56],[1.32,.50],[1.49,.39],[1.55,.27]],'metal',C.dark);
    for(let j=0;j<5;j++){
      const x=-1.04+j*.427, r=.87+j*.031;
      turn(x,[[-.145,.48],[-.115,.64],[-.06,.66],[.07,.66],[.11,.61],[.145,.50]],'bright',C.steel);
      blades(k,x,.60,r,34,.205,.215,j%2?0xc0b7a3:0xb4c0bd,j*.19);
      turn(x+.13,[[-.033,.45],[-.032,.68],[.012,.682],[.029,.61]],'bright',C.silver);
      ring(x+.15,.54,.024,'metal',C.copper);
    }
    // Bearing collector and flanged intake. Annular shells leave a physical opening.
    turn(1.70,[[-.53,.60],[-.53,.96],[-.44,1.03],[-.26,1.12],[.13,1.16],[.29,1.13],[.40,1.04],[.40,.86],[.23,.84],[-.13,.82],[-.47,.78],[-.53,.60]],'paint',C.yellow,80);
    for(const x of [1.28,1.88]){
      turn(x,[[-.052,1.01],[-.052,1.145],[-.02,1.18],[.052,1.18],[.063,1.03]],'paint',C.ochre,80);
      boltsOn(x+.066,1.105,22,.039);
    }
    for(let i=0;i<14;i++){
      const a=TAU*i/14;
      k.box(radial(1.62,1.147,a),[.39,.061,.079],'paint',C.yellow,.018,[a,0,0]);
    }
    turn(2.20,[[-.16,.86],[-.16,1.01],[-.09,1.09],[.015,1.09],[.055,1.055],[.055,.932],[.002,.885],[-.16,.86]],'bright',C.silver,80);
    ring(2.252,1.012,.012,'metal',C.dark);
    boltsOn(2.265,1.023,20,.031);
    turn(2.02,[[-.18,.79],[-.10,.884],[.14,.901],[.14,.855],[-.1,.80]],'metal',C.iron);
    // Staggered front vanes and machined nose. Rotor is parked for service.
    blades(k,1.999,.28,.878,23,.205,-.57,0xa4b2b0);
    turn(2.11,[[-.17,.05],[-.17,.32],[-.02,.34],[.14,.30],[.25,.20],[.30,.114],[.30,.01]],'bright',C.silver);
    for(const x of [2.101,2.132])ring(x,.329,.013,'metal',C.dark);
    end(2.425,.091,.105,.024,'metal',C.dark,12);
    // Longitudinal stay rods and real nut stacks at each end.
    for(const a of [2.27,3.50,4.36,5.80]){
      const r=1.021;
      k.rod(radial(-1.49,r,a),radial(1.30,r,a),.042,'bright',C.silver,12);
      for(const x of [-1.42,1.24]){
        const p=radial(x,r,a);k.cyl(p,.091,.091,.112,'metal',C.dark,'x',6);
        k.ring(p,.081,.013,'bright',C.steel,'x',16);
      }
    }
    // Two partial safety hoops on the far side, with a transparent bolted curved shield.
    const pp=[],nn=[],ii=[];
    const a0=-1.29,a1=.28;
    for(let j=0;j<=24;j++){
      const a=a0+(a1-a0)*j/24;
      for(const x of [-1.30,1.18]){pp.push(...radial(x,1.105,a));nn.push(0,Math.cos(a),Math.sin(a))}
      if(j)ii.push(j*2-2,j*2,j*2-1,j*2-1,j*2,j*2+1);
    }
    const shield=new T.BufferGeometry();shield.setAttribute('position',new T.Float32BufferAttribute(pp,3));shield.setAttribute('normal',new T.Float32BufferAttribute(nn,3));shield.setIndex(ii);k.add(shield,'glass',0xabcac4);shield.dispose();
    for(const x of [-1.32,.05,1.16]){
      const pts=Array.from({length:13},(_,i)=>radial(x,1.12,a0+(a1-a0)*i/12));k.tube(pts,.035,'metal',C.steel,18,8);
    }
    for(const a of [a0,a1]){k.rod(radial(-1.34,1.13,a),radial(1.24,1.13,a),.033,'metal',C.silver)}
    // Lubrication manifold, formed lines, lagged elbows and pressure instrumentation.
    for(const x of [-2.46,-1.93]){
      k.cyl([x,2.51,Z],.163,.17,.21,'paint',C.teal);
      k.cyl([x,2.64,Z],.15,.15,.071,'metal',C.copper,'y',6);
    }
    k.tube([[-2.46,2.65,Z],[-2.46,2.90,Z],[-2.36,3.0,Z],[-2.15,3.0,Z],[-2.05,2.91,Z],[-2.05,2.78,Z+.27],[-1.88,2.67,Z+.48]],.070,'metal',C.copper,36);
    k.tube([[-2.24,1.20,Z+.63],[-2.24,.81,Z+.97],[-2.05,.66,Z+1.03],[.98,.66,Z+1.03],[1.33,.72,Z+.95],[1.51,1.06,Z+.80]],.046,'metal',C.copper,55);
    for(const x of [-1.89,-.62,.65])k.box([x,.66,Z+1.038],[.085,.158,.12],'metal',C.dark,.015);
    for(const [i,offset] of [.0,.17].entries()){
      const z=Z-.04+offset;
      k.tube([[-2.69,1.63,z-.64],[-2.84,1.57,z-.97],[-2.92,.91,z-1.28],[-2.50,.53,z-1.39],[-1.46,.46,z-1.39],[-.99,.45,z-1.24],[-.84,.66,z-.97],[-.79,.87,z-.80]],.077-i*.012,'rubber',C.hose,52);
      pipeJoint(k,[-2.7,1.63,z-.68],'z',.079);pipeJoint(k,[-1.70,.47,z-1.39],'x',.080,C.steel);
    }
    // Local inlet gauge with a physically raised bezel and a printed dial.
    k.rod([1.72,2.79,Z+.06],[1.72,3.01,Z+.06],.043,'metal',C.copper);
    k.cyl([1.72,3.055,Z+.09],.145,.147,.09,'metal',C.dark,'z',32);
    k.cyl([1.72,3.055,Z+.142],.127,.127,.023,'paint',C.ivory,'z',36);
    for(let i=0;i<11;i++){
      const a=(-.8+i*.16)*PI;
      k.box([1.72+.101*Math.sin(a),3.055+.101*Math.cos(a),Z+.157],[.009,.021,.004],'black',C.dark,0,[0,0,-a]);
    }
    k.rod([1.72,3.055,Z+.165],[1.771,3.130,Z+.165],.006,'paint',C.red,6);
    k.cyl([1.72,3.055,Z+.165],.013,.013,.012,'metal',C.dark,'z',10);
    for(const x of [-2.68,1.60]){
      k.ring([x,x<0?2.57:2.97,Z-.26],.102,.038,'paint',x<0?C.teal:C.ochre,'z',28);
    }
    // Builder's plate and electronics box on the drive side.
    box([-2.22,1.88,Z+.84],[.79,.46,.17],'paint',C.iron,.035);
    box([-2.22,1.88,Z+.937],[.71,.378,.031],'metal',C.steel,.014);
    k.label([-2.22,1.886,Z+.955],[0,0,1],[0,1,0],.59,.251,['K E S T R E L','HC–04   /   He II','SERIES 38     •     04287'],{ink:'#202a2c',weights:[750,850,600]});
    for(const dx of [-.315,.315])for(const dy of [-.147,.147])bolt(k,[-2.22+dx,1.88+dy,Z+.953],'z',.019);
    box([-.08,.493,Z+1.266],[1.85,.305,.085],'paint',C.iron,.018);
    k.label([-.08,.5,Z+1.313],[0,0,1],[0,1,0],1.58,.165,'HELIUM RECIRCULATOR',{ink:'#d4d6c8'});
    for(const dx of [-.86,.86])bolt(k,[-.08+dx,.51,Z+1.311],'z',.021);
    // Service connector with braided lead and orange lock-out tab.
    box([-2.90,.79,Z+.88],[.38,.37,.35],'paint',C.ochre,.036);
    k.cyl([-2.90,.79,Z+1.09],.096,.10,.12,'rubber',C.iron,'z',12);
    k.tube([[-2.90,.79,Z+1.15],[-2.94,.60,Z+1.25],[-2.71,.35,Z+1.24],[-2.34,.30,Z+1.11],[-2.17,.50,Z+.89]],.036,'rubber',C.hose);
  });
  k.contact(0,Z,7.78,3.55,.69);
  k.solid(-3.23,Z-1.43,3.23,Z+1.43,0,.40);
  k.solid(-3.2,Z-1.1,2.48,Z+1.19,.4,3.26);
}

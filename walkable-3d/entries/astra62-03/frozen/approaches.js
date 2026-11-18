import {PI,TAU,UP,DOWN,mix,randomSource} from './geometry.js';
import {F,terrace,forecourt,HALL_WIDTH as H,PORCH_END} from './layout.js';
const rnd=randomSource(91852);
export const SOUTH_STEP=8.08,NORTH_STEP=6.65,TREAD_S=.375,TREAD_N=.42;
const area=p=>p.reduce((v,[x,z],i)=>{const q=p[(i+1)%p.length];return v+x*q[1]-z*q[0]},0);
function clip(subject,clipper){
  let poly=subject;
  const sign=Math.sign(area(clipper));
  for(let n=0;n<clipper.length && poly.length;n++){
    const a=clipper[n],b=clipper[(n+1)%clipper.length],d=[b[0]-a[0],b[1]-a[1]];
    const dist=p=>sign*(d[0]*(p[1]-a[1])-d[1]*(p[0]-a[0]));
    const out=[];
    for(let i=0;i<poly.length;i++){
      const p=poly[i],q=poly[(i+1)%poly.length],P=dist(p),Q=dist(q);
      if(P>=0)out.push(p);
      if((P<0)!==(Q<0)){const f=P/(P-Q);out.push([mix(p[0],q[0],f),mix(p[1],q[1],f)])}
    }
    poly=out;
  }
  return poly;
}
function paved(g,outline,y,row,width){
  g.prism('mortar',outline,y-.16,y-.018);
  let rowId=0;
  const xs=outline.map(p=>p[0]),zs=outline.map(p=>p[1]),mx=Math.max(...xs),mz=Math.max(...zs);
  for(let z=Math.min(...zs);z<mz;z+=row,rowId++){
    for(let x=Math.min(...xs)-width+(rowId%2)*width*.46;x<mx;x+=width){
      const d=.010,j=.01+rnd()*.036;
      const rect=[[x+d+j,z+d],[x+width-d,z+d],[x+width-d,z+row-d-j*.4],[x+width-d-j*.6,z+row-d],[x+d,z+row-d],[x+d,z+d+j*.65]];
      const poly=clip(rect,outline);
      if(poly.length>2 && Math.abs(area(poly))>.00015)g.prism('flag',poly,y-.024,y-.003+rnd()*.006,{tone:.84+rnd()*.21});
    }
  }
}
function edgeFrame(g,a,b,fn){
  const dx=b[0]-a[0],dz=b[1]-a[1],len=Math.hypot(dx,dz);
  g.at((b[0]+a[0])/2,0,(b[1]+a[1])/2,-Math.atan2(dz,dx),()=>fn(len));
}
function parapet(g,poly,height,front=false){
  for(let i=0;i<poly.length;i++){
    if(i===0)continue;
    const a=poly[i],b=poly[(i+1)%poly.length];
    edgeFrame(g,a,b,len=>{
      g.box('plaster',0,height/2-.05,0,len+.025,height+.10,.38);
      g.box('base',0,.084,0,len+.04,.16,.42,{tone:.88});
      g.box('stone',0,height-.082,0,len+.05,.070,.42);
      const blocks=Math.ceil(len/.96);
      for(let k=0;k<blocks;k++)g.hewn('lightFlag',-len/2+len*(k+.5)/blocks,height+.013,0,len/blocks-.011,.118,.50,.020,{tone:.93+rnd()*.12});
      if(len>4){
        const x=0;g.box('stone',x,height*.54,0,.48,height*1.08,.50);
        g.hewn('lightFlag',x,height+.102,0,.59,.135,.60,.022);
      }
    });
    if(i!==1 && i!==poly.length-1){
      g.at(a[0],0,a[1],0,()=>{
        g.box('stone',0,height*.55,0,.50,height*1.1,.51);
        g.hewn('lightFlag',0,height+.10,0,.62,.145,.62,.021);
        if(!front){
          g.revolve('copper',[[.083,height+.18],[.092,height+.205],[.066,height+.235],[.028,height+.253]],16,{},true);
        }
      });
    }
  }
}
function vault(g,z0,z1,rib=false){
  const w=rib?H-.068:H,spring=2.32,rise=rib?1.245:1.33,top=3.98,n=24;
  for(let i=0;i<n;i++){
    const a=i*PI/n,b=(i+1)*PI/n,point=(t,z)=>[Math.cos(t)*w,spring+rise*Math.sin(t),z];
    const A=point(a,z0),B=point(b,z0),C=point(b,z1),D=point(a,z1);
    const normal=t=>[-Math.cos(t)*rise/Math.hypot(rise*Math.cos(t),w*Math.sin(t)),-Math.sin(t)*w/Math.hypot(rise*Math.cos(t),w*Math.sin(t)),0];
    const mat=rib?'stone':'plaster';
    g.face(mat,[A,B,C,D],normal((a+b)/2),{ns:[normal(a),normal(b),normal(b),normal(a)],uv:[[a*w,z0],[b*w,z0],[b*w,z1],[a*w,z1]],tone:rib?.92+i%3*.045:.9});
    if(!rib){
      g.face('plaster',[[A[0],top,z0],[B[0],top,z0],[B[0],top,z1],[A[0],top,z1]],UP);
    }
    for(const [u,v,z,sgn] of [[A,B,z0,-1],[D,C,z1,1]]){
      const hU=rib?u[1]+.115:top,hV=rib?v[1]+.115:top;
      g.face(mat,[u,v,[v[0],hV,z],[u[0],hU,z]],[0,0,sgn],{tone:rib?.91+i%4*.04:1});
    }
  }
}
function passage(g){
  g.section('south passage',true,()=>{
    const z0=5.16,z1=PORCH_END,depth=.51,outer=H+depth;
    for(const side of [-1,1]){
      const x=side*(H+depth/2);
      const aperture=side<0?9.48:10.43,gap=.38;
      for(const [a,b] of [[z0,aperture-gap],[aperture+gap,z1]])
        g.box('plaster',x,1.95,(a+b)/2,depth,4.05,b-a);
      g.box('plaster',x,.71,aperture,depth,1.53,gap*2);
      g.box('plaster',x,3.18,aperture,depth,1.62,gap*2);
      g.box('stone',x,1.46,aperture,depth+.14,.10,gap*2+.11);
      g.box('stone',x,2.365,aperture,depth+.09,.105,gap*2+.13);
      for(let k=-1;k<=1;k++)g.cylinder('cedar',[x,1.52,aperture+k*.208],[x,2.31,aperture+k*.208],.026,.025,8);
      g.box('base',side*(H+.03),.135,(z0+z1)/2,.16,.27,z1-z0);
      g.box('stone',side*(H+.005),2.34,(z0+z1)/2,.20,.13,z1-z0);
      g.box('stone',side*(outer-.15),4.02,(z0+z1)/2,.47,.12,z1-z0+.19);
      g.box('plaster',side*(outer-.15),4.135,(z0+z1)/2,.30,.18,z1-z0+.09);
      for(const z of [7.45,9.86,11.94]){
        g.box('stone',side*(H-.006),1.16,z,.139,2.31,.242,{tone:.91});
        g.box('lightFlag',side*(H-.024),2.23,z,.21,.145,.315);
        g.box('base',side*(H-.016),.25,z,.205,.50,.36);
      }
    }
    vault(g,z0,z1);
    for(const z of [7.45,9.86,11.94])vault(g,z-.116,z+.116,true);
    // The plaster roof has an overhanging weather course at the mouth.
    g.box('stone',0,4.02,z1-.06,outer*2+.14,.12,.33);
    g.box('plaster',0,4.12,z1-.095,outer*2,.14,.23);
    g.at(-H+.038,1.80,8.83,PI/2,()=>{
      g.box('aged',0,0,0,.91,.295,.035);g.decal('plaque',0,0,.019,.884,.271);
    });
  });
  g.section('south paving',true,()=>{
    paved(g,[[-H,8.075],[H,8.075],[H,PORCH_END],[-H,PORCH_END]],0,.70,.93);
    for(let i=0;i<4;i++){
      const h=(i+1)*.15,z=SOUTH_STEP-TREAD_S*(i+.5);
      for(let k=0;k<3;k++){
        const wd=2*H/3;
        g.hewn('stone',-H+wd*(k+.5),h/2-.015,z,wd-.007,h+.03,TREAD_S+.005,.012,{tone:.9+rnd()*.16});
      }
      g.hewn('lightFlag',0,h-.025,z+TREAD_S/2-.007,2*H+.016,.052,.072,.009,{tone:.96});
    }
    paved(g,[[-H,5.01],[H,5.01],[H,SOUTH_STEP-TREAD_S*4],[-H,SOUTH_STEP-TREAD_S*4]],F+.011,.65,.875);
    paved(g,forecourt,0,.773,1.10);parapet(g,forecourt,.43,true);
  });
}
function northPortal(g){
  g.at(0,0,0,PI,()=>{
    const width=2.53,door=1.97,spring=2.93,rise=1.59,top=5.00,front=6.59,back=5.53,n=24;
    for(const s of [-1,1]){
      g.box('plaster',s*(width+door)/2,(top+.05)/2,(back+front)/2,width-door,top-.05,front-back);
      g.box('base',s*(width+door)/2,.36,(back+front)/2,width-door+.085,.72,front-back+.12);
      g.box('stone',s*(width+door)/2,.72,(back+front)/2,width-door+.13,.10,front-back+.18);
      for(let j=0;j<6;j++){
        const h=(spring-.76)/6;
        g.box('stone',s*(door+.107),.76+h*(j+.5),front+.035,.21,h-.012,.10,{tone:.9+rnd()*.17});
      }
      g.box('lightFlag',s*(door+.147),spring-.075,front+.024,.36,.13,.20);
    }
    for(let i=0;i<n;i++){
      const a=PI*i/n,b=PI*(i+1)/n;
      const p=(t,z,dr)=>[(door+dr)*Math.cos(t),spring+(rise+dr)*Math.sin(t),z];
      const A=p(a,front,0),B=p(b,front,0),C=p(b,back,0),D=p(a,back,0);
      g.face('plaster',[A,B,[B[0],top,front],[A[0],top,front]],[0,0,1]);
      g.face('chalk',[A,B,C,D],[-Math.cos((a+b)/2),-Math.sin((a+b)/2),0],{tone:.9});
      g.face('plaster',[D,C,[C[0],top,back],[D[0],top,back]],[0,0,-1]);
      g.face('stone',[p(a,front+.052,0),p(b,front+.052,0),p(b,front+.052,.176),p(a,front+.052,.176)],[0,0,1],{tone:.91+(i%4)*.05});
      g.face('teal',[p(a,front+.046,.196),p(b,front+.046,.196),p(b,front+.046,.235),p(a,front+.046,.235)],[0,0,1],{tone:.88+(i%3)*.08});
    }
    g.hewn('lightFlag',0,top+.045,(front+back)/2,width*2+.18,.14,front-back+.18,.024);
    g.box('teal',0,4.94,front+.009,width*2-.12,.027,.038);
    for(let j=0;j<19;j++)g.hewn('stone',(j-9)*.254,4.988,front+.043,.151,.10,.10,.012,{tone:.95+j%3*.028});
    g.box('plaster',0,top+.166,(front+back)/2,width*2+.054,.13,front-back+.07);
    // Geometric lozenges are set in the spandrels on either side of the arch.
    for(const s of [-1,1])for(const [dx,y,r] of [[1.90,4.48,.22],[2.25,4.18,.12],[1.58,4.67,.091]]){
      const x=s*dx,z=front+.014;
      for(const [rr,mat,zz] of [[r+.028,'stone',z],[r,'lapis',z+.004],[r*.66,'teal',z+.009],[r*.28,'ivory',z+.014]])
        g.face(mat,[[x,y+rr,zz],[x+rr,y,zz],[x,y-rr,zz],[x-rr,y,zz]],[0,0,1]);
    }
  });
}
function northTerrace(g){
  g.section('north terrace',true,()=>{
    g.prism('base',terrace,-1.4,-.09);paved(g,terrace,0,.76,1.10);parapet(g,terrace,.79);
    northPortal(g);
    const half=2.07;
    g.box('base',0,.27,-5.90,2*half,.61,1.56);
    paved(g,[[-half,-NORTH_STEP],[half,-NORTH_STEP],[half,-5.06],[-half,-5.06]],F+.011,.54,.90);
    for(let i=0;i<3;i++){
      const y=F-(i+1)*.15,z=-NORTH_STEP-TREAD_N*(i+.5);
      for(let j=0;j<4;j++){
        const w=2*half/4;g.hewn('stone',-half+w*(j+.5),y/2-.018,z,w-.009,y+.036,TREAD_N+.004,.014,{tone:.86+rnd()*.20});
      }
      g.hewn('lightFlag',0,y-.027,z-TREAD_N/2+.014,2*half+.018,.059,.091,.011);
      for(const s of [-1,1])g.box('stone',s*(half+.16),y/2+.064,z,.33,y+.16,TREAD_N-.012);
    }
    for(const s of [-1,1])g.box('stone',s*(half+.16),.395,-6.34,.34,.815,.72);
    // Parallel brass meridian markers continue onto the terrace.
    for(const x of [-.038,.038])g.box('aged',x,.006,-11.39,.014,.006,6.70);
    for(let i=0;i<9;i++)g.box('aged',0,.009,-8.40-i*.72,i%2?.125:.21,.006,.015);
  });
}
export function buildApproaches(g){passage(g);northTerrace(g)}

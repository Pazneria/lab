import {C,PI,bolt} from './geometry.mjs';
import {gallery as G,stairs as S} from './layout.mjs';
const y=G.level;
function rail(k,a,b,spans){
  const p=(t,h)=>[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t+h,a[2]+(b[2]-a[2])*t];
  k.rod(p(0,1.04),p(1,1.04),.047,'paint',C.yellow,16);
  k.rod(p(0,.53),p(1,.53),.028,'metal',C.steel);
  for(let i=0;i<=spans;i++){
    const t=i/spans;
    k.rod(p(t,.04),p(t,1.04),.037,'metal',C.grey,12);
    k.box(p(t,.035),[.156,.062,.16],'metal',C.dark,.014);
    for(const h of [.119,.525,1.034])k.cyl(p(t,h),h>1?.051:.045,h>1?.051:.045,.071,'metal',h>1?C.ochre:C.steel,'y',12);
  }
  // Use short colliders along inclined handrails so lower-floor passage still fits below.
  const n=Math.max(1,Math.ceil(Math.abs(a[1]-b[1])/.16));
  for(let i=0;i<n;i++){
    const p0=p(i/n,0),p1=p((i+1)/n,0);
    k.solid(Math.min(p0[0],p1[0])-.052,Math.min(p0[2],p1[2])-.052,Math.max(p0[0],p1[0])+.052,Math.max(p0[2],p1[2])+.052,Math.min(p0[1],p1[1])+.025,Math.max(p0[1],p1[1])+1.092);
  }
}
export function buildGallery(k){
  k.section('inspection gallery',()=>{
    const w=G.right-G.left,d=G.front-G.back,c=(G.left+G.right)/2,z=(G.back+G.front)/2;
    // Platform soffit is open. The actual grating casts through to the utility cabinets below.
    for(const gz of [G.front-.07,G.back+.10]){
      k.box([c,y-.15,gz],[w,.252,.095],'paint',C.grey,.012);
      for(const gy of [y-.278,y-.044])k.box([c,gy,gz],[w,.041,.213],'metal',C.steel,.007);
    }
    for(let i=0;i<=7;i++){
      const gx=G.left+i*w/7;
      k.box([gx,y-.139,z],[.091,.19,d-.10],'paint',C.dark,.006);
      k.box([gx,y-.049,z],[.169,.038,d-.10],'metal',C.steel);
    }
    const divisions=7;
    for(let bay=0;bay<divisions;bay++){
      const x=G.left+w*(bay+.5)/divisions, span=w/divisions;
      for(let i=0;i<22;i++)k.box([x-span/2+span*(i+.5)/22,y-.028,z],[.043,.054,d-.068],'metal',i%5?C.grey:C.steel);
      for(let j=0;j<12;j++)k.box([x,y-.046,G.back+.09+j*(d-.18)/11],[span-.04,.033,.025],'metal',C.steel);
    }
    for(const [x,gz] of [[G.left+.16,G.front-.18],[-1.47,G.front-.18],[G.right-.19,G.front-.18]]){
      k.box([x,.066,gz],[.46,.119,.45],'metal',C.steel,.022);
      k.box([x,1.185,gz],[.166,2.23,.162],'paint',C.panel,.016);
      k.box([x,2.19,gz],[.36,.21,.29],'metal',C.grey,.018);
      k.bar([x,1.70,gz],[x+.48,2.31,gz],.081,.083,'metal',C.grey);
      k.contact(x,gz,.79,.71,.45);
      k.solid(x-.12,gz-.12,x+.12,gz+.12,0,y-.15);
      for(const dx of [-.14,.14])bolt(k,[x+dx,.137,gz],'y',.035);
    }
    for(const x of [-4.5,.66,3.75]){
      const z0=G.back+.05,z1=G.front-.22;
      k.bar([x,.79,z0],[x,2.31,z1],.115,.15,'paint',C.grey);
      for(let j=0;j<5;j++)k.solid(x-.07,z0+(z1-z0)*j/5-.05,x+.07,z0+(z1-z0)*(j+1)/5+.05,.71+1.52*j/5,.87+1.52*(j+1)/5);
    }
    const toeStart=S.right-.03;
    k.box([(toeStart+G.right)/2,y+.091,G.front-.03],[G.right-toeStart,.174,.052],'paint',C.panel,.009);
    k.box([G.right-.044,y+.093,z],[.052,.174,d],'paint',C.panel,.009);
    rail(k,[toeStart,y,G.front-.064],[G.right-.055,y,G.front-.064],8);
    rail(k,[G.right-.055,y,G.front-.064],[G.right-.055,y,G.back+.13],2);
    rail(k,[G.left+.060,y,G.back+.13],[G.left+.060,y,G.front-.064],2);
    k.box([1.14,y+.35,G.front-.032],[1.61,.29,.042],'paint',C.iron,.016);
    k.label([1.14,y+.355,G.front-.005],[0,0,1],[0,1,0],1.40,.162,'INSPECTION   /   02',{ink:'#d1cfb7'});
    // Open-riser industrial stairs: sixteen regular rises, four bearing strips per tread.
    const run=(S.bottom-S.top)/S.count,rise=S.height/S.count,sw=S.right-S.left,cx=(S.left+S.right)/2;
    for(let i=0;i<S.count;i++){
      const yf=rise*(i+1),zf=S.bottom-i*run,zt=zf-run;
      for(let j=0;j<4;j++){
        const zz=zt+run*(j+.5)/4;
        k.box([cx,yf-.029,zz],[sw-.102,.056,run/4-.012],'metal',j===3?C.steel:C.grey,.006);
      }
      for(const side of [-1,1]){
        const xx=cx+side*(sw*.5-.14);
        k.box([xx,yf+.001,zf-.035],[.174,.008,.052],'mark',C.yellow);
        k.box([xx,yf-.077,zt+run/2],[.22,.071,run+.014],'metal',C.dark,.005);
      }
      // Regular cross-cut grooves on the tread nosing, interrupted at its fixing points.
      for(let j=0;j<9;j++)k.box([cx+(j-4)*.133,yf+.003,zf-.037],[.063,.006,.025],'metal',C.dark);
      if(i%4===0)for(const side of [-1,1])bolt(k,[cx+side*(sw*.5-.10),yf+.008,zt+.076],'y',.024);
    }
    for(const x of [S.left+.052,S.right-.052]){
      k.bar([x,.012,S.bottom+.08],[x,y-.122,S.top-.06],.13,.205,'paint',C.grey);
      rail(k,[x,rise,S.bottom-.06],[x,y,S.top-.06],4);
      k.box([x,.066,S.bottom],[.245,.119,.40],'metal',C.steel,.018);
    }
    k.box([cx,.01,S.bottom+.28],[sw+.06,.021,.46],'deck',C.grey,.012);
    k.label([cx,.024,S.bottom+.28],[0,1,0],[0,0,-1],1.265,.155,'GALLERY    ↑',{ink:'#d9c7a2',distress:true});
    k.contact(cx,-2.13,2.22,6.13,.33);k.contact(c,z,w+.54,d+.72,.30);
  });
}


import {PI,TAU,rad,radial,tangent,UP,DOWN,mix,randomSource,add,mul} from './geometry.js';
import {F,INNER as I,OUTER as O,TOP,portals} from './layout.js';
const rng=randomSource(83237);

// The soffit continues from the inner wall to the outer face of the drum.
function wallStrip(g,l,r,b0,b1,t0,t1){
  function vertical(R,sign,mat,baseTone){
    const uv=[[l*R,b0],[r*R,b1],[r*R,t1],[l*R,t0]];
    g.face(mat,[rad(l,R,b0),rad(r,R,b1),rad(r,R,t1),rad(l,R,t0)],radial((l+r)/2,sign),{
      ns:[radial(l,sign),radial(r,sign),radial(r,sign),radial(l,sign)],uv,
      tones:[baseTone*(b0<F+.1?.79:.96),baseTone*(b1<F+.1?.79:.96),baseTone,baseTone]
    });
  }
  vertical(I,-1,'plaster',.96);vertical(O,1,'plaster',1);
}
function aperture(g,p){
  const {a,w,sill,spring,rise}=p;
  const steps=p.door?28:16,edge=Math.asin(w/I),calc=t=>a+Math.asin(w*Math.sin(t)/I);
  for(let j=0;j<steps;j++){
    const t0=-PI/2+PI*j/steps,t1=-PI/2+PI*(j+1)/steps;
    const l=calc(t0),r=calc(t1),h=spring+rise*Math.cos(t0),k=spring+rise*Math.cos(t1);
    wallStrip(g,l,r,h,k,TOP,TOP);
    g.face('chalk',[rad(l,I,h),rad(l,O,h),rad(r,O,k),rad(r,I,k)],DOWN,{tone:.90,uv:[[0,t0*w],[O-I,t0*w],[O-I,t1*w],[0,t1*w]]});
    if(!p.door){
      wallStrip(g,l,r,-.16,-.16,sill,sill);
      g.face('stone',[rad(l,I-.04,sill),rad(l,O+.06,sill-.035),rad(r,O+.06,sill-.035),rad(r,I-.04,sill)],UP);
    }
  }
  for(const sign of [-1,1]){
    const t=a+sign*edge;
    g.face('stone',[rad(t,I,sill),rad(t,O,sill),rad(t,O,spring),rad(t,I,spring)],tangent(t,-sign),{tone:.92});
  }
  for(const outside of [false,true]) archDress(g,p,outside);
}
function archDress(g,p,out){
  const n=p.door?17:9, R=out?O+.085:I-.083,back=out?O-.025:I+.025, s=out?1:-1;
  const band=p.door?.27:.16;
  function pt(t,r,b){
    return rad(p.a+Math.asin((p.w+b)*Math.sin(t)/I),r,p.spring+(p.rise+b)*Math.cos(t));
  }
  for(let i=0;i<n;i++){
    const t=-PI/2+PI*(i+.014)/n,u=-PI/2+PI*(i+.986)/n;
    const b=band+(i===(n-1)/2 && p.door?.085:0);
    const front=R+s*(i===(n-1)/2?.028:0)+s*rng()*.008,mat='stone';
    const a=pt(t,front,0),c=pt(u,front,0),d=pt(u,front,b),e=pt(t,front,b);
    const tone=.90+rng()*.18, norm=radial(p.a+Math.asin(p.w*Math.sin((t+u)/2)/I),s);
    g.face(mat,[a,c,d,e],norm,{tone});
    g.face(mat,[a,c,pt(u,back,0),pt(t,back,0)],DOWN,{tone:tone*.86});
    g.face(mat,[e,d,pt(u,back,b),pt(t,back,b)],UP,{tone});
    g.face(mat,[a,e,pt(t,back,b),pt(t,back,0)],tangent(p.a,-1),{tone});
    g.face(mat,[c,d,pt(u,back,b),pt(u,back,0)],tangent(p.a,1),{tone});
  }
  for(const side of [-1,1]){
    const a=p.a+side*Math.asin(p.w/I),b=p.a+side*Math.asin((p.w+band)/I);
    const courses=p.door?5:3;
    for(let j=0;j<courses;j++){
      const h=mix(p.sill,p.spring,j/courses)+.008,k=mix(p.sill,p.spring,(j+1)/courses)-.007;
      g.sector('stone',Math.min(back,R),Math.max(back,R),Math.min(a,b),Math.max(a,b),h,k,2,{tone:.89+rng()*.16});
    }
    const x=p.a+side*Math.asin((p.w+band/2)/I);
    const half=(band+.11)/(2*I);
    g.sector('lightFlag',Math.min(back,R)-.026,Math.max(back,R)+.026,x-half,x+half,p.spring-.060,p.spring+.026,2,{tone:.96});
  }
  if(!p.door){
    const ext=Math.asin((p.w+band+.05)/I);
    g.sector('stone',Math.min(back,R)-.03,Math.max(back,R)+.045,p.a-ext,p.a+ext,p.sill-.13,p.sill+.008,8,{tone:1.04});
  }
}
function tileBand(g,R,y,h,a,b,inward,frequency=2.24){
  const count=Math.ceil((b-a)*R/.38),sgn=inward?-1:1;
  for(let j=0;j<count;j++){
    const l=mix(a,b,j/count),r=mix(a,b,(j+1)/count);
    g.face('frieze',[rad(l,R,y),rad(r,R,y),rad(r,R,y+h),rad(l,R,y+h)],radial((l+r)/2,sgn),
      {ns:[radial(l,sgn),radial(r,sgn),radial(r,sgn),radial(l,sgn)],uv:[[l*R/frequency,0],[r*R/frequency,0],[r*R/frequency,1],[l*R/frequency,1]]});
  }
}
function floor(g){
  g.revolve('mortar',[[I+.04,.49],[I+.04,F-.018]],96,{},true);
  const rings=[0,.80,1.49,1.84,2.53,3.28,4.03,4.65,I+.04],counts=[8,16,28,24,27,31,36,38];
  for(let i=0;i<counts.length;i++){
    const n=counts[i],angle=TAU/n,k=(i%2?.41:.02)*angle;
    for(let j=0;j<n;j++){
      const start=k+j*angle,end=start+angle,ri=rings[i]+(i?.006:0),ro=rings[i+1]-.006;
      const gap=.006/Math.max(ro-.27,.5);
      g.sector(i===2?'lightFlag':'flag',ri,ro,start+gap,end-gap,F-.029,F+(rng()-.5)*.004,Math.max(2,Math.ceil(110/n)),{tone:.86+rng()*.18});
    }
  }
  // Cut a north-south sight line into the inlaid pavement.
  for(const side of [-1,1])for(const x of [-.042,.042]){
    g.box('aged',x,F+.003,side*3.56,.014,.008,3.35);
  }
  for(const [r,w,mat] of [[1.51,.019,'aged'],[1.825,.015,'aged'],[4.65,.018,'aged']])
    g.sector(mat,r,r+w,0,TAU,F+.001,F+.007,128);
  for(let i=0;i<120;i++){
    const a=i*TAU/120,major=i%10===0,len=major?.17:(i%2?.043:.079);
    g.at(0,F+.006,0,a,()=>g.box(major?'brass':'aged',0,0,1.823-len/2,major?.027:.011,.006,len));
  }
  // Four large cardinal lozenges with opposite halves in glazed clay.
  for(let i=0;i<8;i++)g.at(0,F+.008,0,i*TAU/8,()=>{
    const long=i%2?.24:.43;
    g.face('lapis',[[0,0,1.87],[-.092,0,1.95],[0,0,1.89+long]],UP);
    g.face('teal',[[0,0,1.87],[.092,0,1.95],[0,0,1.89+long]],UP);
  });
}
function buttress(g,a){
  g.at(0,0,0,a,()=>{
    const r=O-.13,w=.76;
    const levels=[[-.18,w+.18,r+.89],[.57,w+.14,r+.84],[.69,w+.07,r+.78],[3.78,w-.04,r+.52],[4.25,w-.14,r+.33]];
    for(let i=0;i<levels.length-1;i++){
      const [y,b,d]=levels[i],[Y,B,D]=levels[i+1];
      const opts={tone:i===0?.91:1},mat=i===0?'base':'plaster';
      g.face(mat,[[-b/2,y,d],[b/2,y,d],[B/2,Y,D],[-B/2,Y,D]],[0,0,1],opts);
      for(const s of [-1,1])g.face(mat,[[s*b/2,y,r],[s*b/2,y,d],[s*B/2,Y,D],[s*B/2,Y,r]],[s,0,0],opts);
    }
    g.box('stone',0,.50,r+.39,w+.21,.13,.89,{tone:1.05});
    g.box('stone',0,4.27,r+.15,w-.045,.115,.41);
    // Paired bites in the plaster indicate the ends of former scaffold beams.
    for(const s of [-1,1])g.box('recess',s*.19,3.27,r+.563,.073,.102,.018,{tone:.65});
  });
}
function clerestoryScreen(g,a){
  g.at(0,0,0,a,()=>{
    const Z=(I+O)/2,half=.309,y0=3.56,y1=3.995;
    for(const side of [-1,1])g.box('aged',side*half,(y0+y1)/2,Z,.026,y1-y0,.030);
    g.box('copper',0,y0,Z,.632,.023,.039);
    g.box('copper',0,y1,Z,.655,.024,.041);
    // Six open lozenges leave the sky visible beyond the deep reveal.
    const dy=(y1-y0)/2,dx=half*2/3;
    for(let k=0;k<3;k++)for(let j=0;j<2;j++){
      const x=-half+(k+.5)*dx,y=y0+(j+.5)*dy;
      const q=[[x-dx/2,y,Z],[x,y+dy/2,Z],[x+dx/2,y,Z],[x,y-dy/2,Z]];
      for(let n=0;n<4;n++)g.beam('aged',q[n],q[(n+1)%4],.017,.021);
      g.cylinder('brass',[x,y+dy/2,Z-.018],[x,y+dy/2,Z+.018],.019,.019,8);
    }
    const curve=[];
    for(let j=0;j<=12;j++){
      const t=j*PI/12;curve.push([.301*Math.cos(t),4.008+.286*Math.sin(t),Z]);
    }
    for(let j=0;j<12;j++)g.beam('aged',curve[j],curve[j+1],.019,.024);
    for(const k of [3,6,9])g.beam('copper',[0,4.008,Z],curve[k],.016,.020);
  });
}
export function buildChamber(g){
  g.section('chamber',true,()=>{
    const p=[...portals].sort((x,y)=>x.a-y.a);
    for(let j=0;j<p.length;j++){
      const a=p[j],next=p[(j+1)%p.length],l=a.a+Math.asin(a.w/I),r=next.a+(j===p.length-1?TAU:0)-Math.asin(next.w/I);
      const cnt=Math.ceil((r-l)/.064);
      for(let k=0;k<cnt;k++)wallStrip(g,mix(l,r,k/cnt),mix(l,r,(k+1)/cnt),-.18,-.18,TOP,TOP);
      aperture(g,a);
    }
    const halfDoor=Math.asin((portals[0].w+.005)/I),north=Math.asin((portals[4].w+.005)/I);
    for(const [a,b] of [[halfDoor,PI-north],[PI+north,TAU-halfDoor]]){
      g.sector('ochre',I-.022,I+.03,a,b,F-.025,1.24,64,{tone:.88});
      g.sector('base',I-.075,I+.025,a,b,F-.025,F+.21,64,{tone:.94});
      g.sector('stone',I-.054,I+.018,a,b,1.25,1.305,64,{tone:1.04});
      tileBand(g,I-.035,1.314,.158,a,b,true,1.40);
      g.sector('stone',I-.058,I+.020,a,b,1.475,1.515,64);
      // The lower exterior is built in two staggered courses.
      for(let row=0;row<2;row++){
        const segments=Math.ceil((b-a)*O/.91),step=(b-a)/segments;
        for(let j=-1;j<segments;j++){
          const l=Math.max(a,a+(j+row*.47)*step),r=Math.min(b,a+(j+1+row*.47)*step);
          if(r-l<.008)continue;
          g.sector('base',O-.025,O+.086+rng()*.013,l+.001,r-.001,-.17+row*.41,.22+row*.41,Math.ceil((r-l)/.04),{tone:.86+rng()*.20});
        }
      }
      g.sector('stone',O-.02,O+.11,a,b,.635,.715,65);
    }
    // Stepped drum, glazed belt, circular dome track.
    const trim=[[I-.09,O+.075,4.65,4.75,'stone'],[I-.06,O+.04,4.75,5.02,'chalk'],[I-.13,O+.14,5.02,5.12,'stone'],
      [I-.22,O+.22,5.12,5.23,'lightFlag'],[I-.13,O+.15,5.23,5.43,'plaster'],[I-.17,O+.20,5.43,5.53,'stone']];
    for(const [ri,ro,y,Y,m] of trim)g.sector(m,ri,ro,0,TAU,y,Y,128);
    tileBand(g,O+.045,4.76,.245,0,TAU,false,2.24);
    tileBand(g,I-.07,4.78,.205,0,TAU,true,1.96);
    for(const a of [.52,1.27,1.91,2.62,-.54,-1.26,-1.92,-2.63])buttress(g,a);
    clerestoryScreen(g,1.59);clerestoryScreen(g,-1.58);
  });
  g.section('pavement',false,()=>floor(g));
}

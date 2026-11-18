"use strict";
const MORTAR=mat(1,0x999890,.86);
function roughBlock(x0,x1,y0,y1,z,m,j=.018){
 // The wall core carries the depth. Each individual face has a pitched edge and chipped corners.
 const b=Math.min(j,(x1-x0)*.16,(y1-y0)*.16),c=b*rand(.8,1.8),zz=z+rand(.0008,.007);
 const back=[[x0+c,y0,z],[x1-c,y0,z],[x1,y0+c,z],[x1,y1-c,z],[x1-c,y1,z],[x0+c,y1,z],[x0,y1-c,z],[x0,y0+c,z]];
 const midX=(x0+x1)/2,midY=(y0+y1)/2;
 const front=back.map(([x,y])=>[x+(midX-x)*b/Math.max(.01,(x1-x0)/2),y+(midY-y)*b/Math.max(.01,(y1-y0)/2),zz+b*rand(.81,1.15)]);
 const dx=rand(0,5),dy=rand(0,4),uv=p=>[p[0]*.97+dx,p[1]*.97+dy];
 face(front,m,front.map(uv));
 for(let k=0;k<8;k++){const h=(k+1)%8;const pts=[back[k],back[h],front[h],front[k]];face(pts,shade(m,k===0?.85:.96),pts.map(uv));}
}
function intervals(a,b,holes,y0,y1){
 let out=[[a,b]];
 for(const hole of holes){
  if(y1<=hole.lo+.0001||y0>=hole.s+hole.h-.0001)continue;
  const v=Math.max(0,(y0-hole.s)/Math.max(.001,hole.h));
  const radius=hole.r*Math.sqrt(Math.max(0,1-v*v));
  const l=hole.x-radius,r=hole.x+radius,next=[];
  for(const [lo,hi] of out){if(l>=hi||r<=lo)next.push([lo,hi]);else{if(l>lo)next.push([lo,l]);if(r<hi)next.push([r,hi]);}}
  out=next;
 }
 return out;
}
function wallFace(a,b,base,top,z,opts={}){
 const {holes=[],m=STONE,course=.34,width=.7,depth=.28,plaster=false,soot=false}=opts;
 let yy=base,row=0;const cuts=[base,top,...holes.flatMap(o=>[o.lo,o.s,o.s+o.h])].filter(q=>q>=base&&q<=top).sort((p,q)=>p-q);
 while(yy<top-.001){
  let yn=Math.min(top,yy+course*(plaster?1:rand(.91,1.09)));
  for(const v of cuts)if(v>yy+.001&&v<yn-.001)yn=v;
  for(const [l,r] of intervals(a,b,holes,yy,yn)){
   if(r-l<.008)continue;
   box((l+r)*.5,(yy+yn)*.5,z-depth*.5,r-l,yn-yy,depth,plaster?m:MORTAR);
   if(!plaster){
    let x=l,n=0;
    while(x<r-.005){
     let w=width*rand(.68,1.33)*(n===0&&row%2?.58:1);
     if(r-x-w<width*.34)w=r-x;else w=Math.min(w,r-x);
     const dark=soot?1-.20*Math.max(0,(yy-2.5)/6)-.08*Math.max(0,1-yy/1.7):1;
     const mm=shade(m,rand(.86,1.09)*dark);
     if(w>.035&&yn-yy>.035)roughBlock(x+.007,x+w-.007,yy+.007,yn-.007,z+.002,mm,course*.060);
     x+=w;n++;
    }
   }
  }
  yy=yn;row++;
 }
}
function arch(cx,s,rx,ry,t,z,depth,m=STONE,legs=true,lo=0,n=17){
 if(legs){for(const side of [-1,1]){
  const h=s-lo,count=Math.max(1,Math.round(h/Math.max(.26,t*1.45)));
  for(let k=0;k<count;k++)box(cx+side*(rx+t*.49),lo+(k+.5)*h/count,z,t*1.04,h/count-.012,depth,shade(m,rand(.87,1.08)),.025);
  box(cx+side*(rx+t*.5),s-.035,z,t*1.09+.075,.14,depth+.065,m,.018);
 }}
 for(let i=0;i<n;i++){
  const a=i*Math.PI/n+.002,b=(i+1)*Math.PI/n-.002;
  const key=i===Math.floor(n/2),th=t*(key?1.17:1),dz=key?.035:0;
  function shape(zz){return [[cx+rx*Math.cos(a),s+ry*Math.sin(a),zz],[cx+(rx+th)*Math.cos(a),s+(ry+th)*Math.sin(a),zz],[cx+(rx+th)*Math.cos(b),s+(ry+th)*Math.sin(b),zz],[cx+rx*Math.cos(b),s+ry*Math.sin(b),zz]];}
  prism(shape(z+depth/2+dz),shape(z-depth/2-dz),shade(m,rand(.88,1.08)));
 }
}
function tileFloor(x0,x1,z0,z1,stepX,stepZ,m,base=-.005){
 box((x0+x1)/2,base-.065,(z0+z1)/2,x1-x0,.12,z1-z0,shade(DARKSTONE,.67));
 let z=z0,idx=0;
 while(z<z1-.02){
  let d=Math.min(z1-z,stepZ*rand(.85,1.14));if(z1-z-d<.28)d=z1-z;
  let x=x0,k=0;
  while(x<x1-.015){
   let w=Math.min(x1-x,stepX*rand(.73,1.26)*(idx%2&&k===0?.54:1));if(x1-x-w<.3)w=x1-x;
   const y=base+rand(.003,.012),a=x+.009,b=x+w-.009,c=z+.009,e=z+d-.009;
   const bevel=.026,co=rand(.017,.064);
   const outline=[[a+co,c],[a,c+co],[a,e-co],[a+co,e],[b-co,e],[b,e-co],[b,c+co],[b-co,c]];
   const mid=[(a+b)/2,(c+e)/2],ox=rand(0,5),oy=rand(0,4),mm=shade(m,rand(.86,1.06));
   const top=outline.map(([xx,zz])=>[xx+(mid[0]-xx)*bevel/Math.max(.12,w*.5),y,zz+(mid[1]-zz)*bevel/Math.max(.12,d*.5)]);
   face(top,mm,top.map(p=>[p[0]/1.45+ox,p[2]/1.45+oy]));
   for(let i=0;i<8;i++){const j=(i+1)%8;face([[outline[i][0],y-.026,outline[i][1]],[outline[j][0],y-.026,outline[j][1]],top[j],top[i]],shade(mm,.82));}
   x+=w;k++;
  }
  z+=d;idx++;
 }
}
function roof(xr,ze,zn,eave,ridge,timber,underside,spacing){
 for(const side of [-1,1]){
  const a=[side*xr,eave,zn],b=[0,ridge,zn],c=[0,ridge,ze],d=[side*xr,eave,ze];
  const q=side<0?[a,b,c,d]:[d,c,b,a];face(q,underside,q.map(p=>[p[2]/1.65,p[0]/1.1]));
  const length=Math.hypot(xr,ridge-eave),planks=Math.ceil(length/.27);
  for(let i=1;i<planks;i++){
   const v=i/planks,x=side*xr*v,y=ridge+(eave-ridge)*v-.012;
   box(x,y,(zn+ze)/2,.019,.032,ze-zn,shade(timber,.65));
  }
  for(let z=zn+.12;z<=ze;z+=spacing)beam([side*xr,eave-.11,z],[0,ridge-.11,z],.20,.19,timber,.013);
 }
 beam([0,ridge-.12,zn],[0,ridge-.12,ze],.22,.27,timber);
}
function gable(width,eave,ridge,z,front,m){
 const p=[[-width,eave,z],[width,eave,z],[0,ridge,z]];if(front<0)p.reverse();face(p,m);
}
function plankFloor(){
 const a=-3.5,b=3.5,near=2.70,far=9.40;
 box(0,-.077,6.0,7.0,.14,6.8,shade(WALNUT,.48));
 let x=a,i=0;
 while(x<b-.001){
  let w=Math.min(b-x,rand(.22,.31));if(b-x-w<.12)w=b-x;
  let z=near,j=0;
  while(z<far-.01){
    let len=Math.min(far-z,j?rand(2.3,3.7):.78+((i*1.34)%2.3));if(far-z-len<.69)len=far-z;
    const cx=x+w/2,cz=z+len/2;
    box(cx,-.033,cz,w-.004,.067,len-.006,shade(OAK,rand(.72,.96)),.006);
    if(len>.25)for(const off of [-1,1])for(const end of [-1,1]){
     const px=cx+off*w*.30,pz=cz+end*(len/2-.042);
     face([[px-.006,.003,pz-.004],[px-.005,.003,pz+.006],[px+.006,.003,pz+.003],[px+.004,.003,pz-.005]],BLACKIRON);
    }
    z+=len;j++;
  }x+=w;i++;
 }
}
function windowSash(cx,s,rx,ry,lo,z){
 arch(cx,s,rx,ry,.085,z,.20,shade(OAK,.83),true,lo,13);
 box(cx,lo-.055,z+.10,2*rx+.31,.125,.40,OAK,.024);
 panel([cx,(lo+s+ry)/2,z-.135],[1,0,0],UP,rx*2+.04,s+ry-lo+.02,mat(LITTLEVISTA,WHITE,1,1.38));
 for(let i=-3;i<=3;i++){
  const xx=i*rx/3.5,hi=s+ry*Math.sqrt(1-(xx/rx)**2);
  beam([cx+xx,lo,z-.05],[cx+xx,hi,z-.05],i===0?.049:.015,.024,i===0?WALNUT:BLACKIRON,.002);
 }
 for(const y of [lo+.39,lo+.81])if(y<s+ry)box(cx,y,z-.035,rx*2,.028,.03,BLACKIRON,.003);
 // Diamond leading cut at the masonry reveal.
 for(const sign of [-1,1])for(let p=-6;p<=7;p++){
   const pts=[];for(let j=0;j<=85;j++){const xx=-rx+j*2*rx/85,yy=lo+.35*p+sign*xx*.92;
    if(yy>=lo+.02&&yy<=s+ry*Math.sqrt(Math.max(0,1-(xx/rx)**2))-.015)pts.push([cx+xx,yy,z-.021]);}
   if(pts.length>1)beam(pts[0],pts[pts.length-1],.010,.013,IRON,.001);
 }
}
function bedroomShell(){
 group("bedroom shell");plankFloor();
 const door={x:.56,lo:0,s:1.79,r:.88,h:.55};
 frame(0,0,2.77,0,()=>{
  wallFace(-3.5,3.5,0,.86,0,{holes:[door],m:STONE,course:.257,width:.56});
  wallFace(-3.5,3.5,.86,3.08,0,{holes:[door],plaster:true,m:PLASTER,course:.20});
  gable(3.52,3.075,4.19,0,1,PLASTER);arch(.56,1.79,.88,.55,.195,.018,.40,PALESTONE);
  for(const x of [-3.35,-1.56,2.08,3.37])box(x,1.54,.035,.13,3.08,.13,WALNUT,.012);
  box(0,2.92,.065,7,.14,.18,WALNUT,.015);
 });
 frame(0,0,9.30,Math.PI,()=>{
  wallFace(-3.5,3.5,0,.82,0,{m:STONE,course:.27,width:.59});
  wallFace(-3.5,3.5,.82,3.08,0,{m:PLASTER,plaster:true,course:1});
  gable(3.52,3.075,4.19,0,1,PLASTER);
  const cx=-1.35;box(cx,1.08,.045,1.27,2.17,.09,WALNUT,.025);
  for(let i=0;i<6;i++)box(cx+(i-2.5)*.18,1.04,.103,.174,2.03,.08,shade(OAK,.78+rand(0,.13)),.009);
  for(const xx of [-.65,.65])box(cx+xx,1.12,.11,.145,2.24,.19,WALNUT,.013);
  box(cx,2.19,.11,1.45,.18,.19,WALNUT,.014);
  for(const yy of [.43,1.63]){box(cx-.13,yy,.157,.96,.057,.041,BLACKIRON,.009);for(const xx of [-.52,-.25,.17])cylinder([cx+xx,yy,.182],[cx+xx,yy,.197],.022,.019,IRON,8);}
  hoop([cx+.39,1.02,.193],[.058,0,0],[0,.080,0],.012,BRASS,15,6);
  for(const x of [-3.35,.22,2.05,3.35])box(x,1.54,.04,.13,3.08,.14,WALNUT,.012);
 });
 for(const side of [-1,1]){
  frame(side*3.48,0,6.035,-side*Math.PI/2,()=>{
   const hole=side===-1?[{x:-.33,lo:1.37,s:2.30,r:.90,h:.48}]:[];
   wallFace(-3.28,3.28,0,.82,0,{m:STONE,course:.26,width:.53});
   wallFace(-3.28,3.28,.82,3.08,0,{m:PLASTER,plaster:true,holes:hole,course:.16});
   for(const xx of [-3.20,-1.71,1.52,3.20])box(xx,1.53,.045,.14,3.07,.13,shade(OAK,.80),.012);
   box(0,.865,.06,6.57,.10,.14,OAK,.012);box(0,3.015,.05,6.57,.17,.20,WALNUT,.018);
   if(hole.length)windowSash(-.33,2.30,.90,.48,1.37,.02);
  });
 }
 roof(3.54,9.34,2.70,3.075,4.19,shade(OAK,.83),shade(OAK,1.10),.87);
 for(const z of [3.08,6.05,9.06]){
  box(0,3.035,z,7.02,.19,.17,OAK,.019);
  for(const s of [-1,1])beam([s*3.33,2.45,z],[s*2.70,2.99,z],.145,.13,OAK,.014);
 }
}
function passageShell(){
 group("service masonry");tileFloor(-1.72,2.86,-5.35,2.70,.91,.66,FLAG);
 const end={x:.56,lo:0,s:1.91,r:1.01,h:.80};
 frame(0,0,-5.21,0,()=>{wallFace(-1.78,2.89,0,3.64,0,{m:DARKSTONE,holes:[end],course:.32,width:.68});arch(.56,1.91,1.01,.80,.25,.04,.53,STONE);});
 frame(0,0,2.63,Math.PI,()=>{const hole={x:-.56,lo:0,s:1.79,r:.88,h:.55};wallFace(-2.87,1.73,0,3.60,0,{m:STONE,holes:[hole],course:.32,width:.7});arch(-.56,1.79,.88,.55,.18,.035,.32,STONE);});
 for(const side of [-1,1]){
  frame(side<0?-1.71:2.85,0,-1.24,-side*Math.PI/2,()=>{
    wallFace(-4.02,4.02,0,3.55,0,{m:shade(STONE,.88),course:.32,width:.67});
    box(0,3.47,.105,8.09,.17,.24,WALNUT,.015);
  });
 }
 box(.57,3.68,-1.24,4.70,.25,8.07,shade(OAK,.78));
 for(let z=-4.96;z<2.79;z+=.72)box(.57,3.50,z,4.60,.17,.12,TAR,.015);
 for(const z of [-4.84,-1.20,2.48]){
  box(.57,3.25,z,4.62,.24,.20,WALNUT,.018);
  for(const x of [-1.54,2.68]){box(x,1.57,z,.19,3.19,.20,WALNUT,.017);beam([x,2.52,z],[x+(x<0?.65:-.65),3.20,z],.14,.13,OAK,.013);}
 }
}
function roostShell(){
 group("roost paving south");tileFloor(-8.45,8.45,-12.65,-5.35,1.48,.94,shade(FLAG,.89));
 group("roost paving north");tileFloor(-8.45,8.45,-20.05,-12.65,1.48,.94,shade(FLAG,.84));
 group("roost entry stone");
 frame(0,0,-5.44,Math.PI,()=>{
  const doorway={x:-.56,lo:0,s:1.91,r:1.01,h:.80};
  wallFace(-8.48,8.48,0,7.18,0,{m:STONE,holes:[doorway],course:.49,width:1.02,soot:true});
  arch(-.56,1.91,1.01,.80,.27,.07,.69,PALESTONE,true,0,13);
  gable(8.48,7.17,10.60,0,1,shade(PLASTER,.72));
  box(0,7.19,.08,16.95,.29,.31,WALNUT,.032);
  for(const x of [-6,-3,0,3,6]){const y=10.60-3.43*Math.abs(x)/8.48;box(x,(y+7.19)/2,.07,.19,y-7.19+.02,.20,TAR,.018);}
 });
 for(const side of [-1,1]){
  group(side<0?"roost west wall":"roost east wall");
  frame(side*8.42,0,-12.72,-side*Math.PI/2,()=>{
   const gaps=side<0?[{x:.25,lo:3.95,s:5.55,r:.66,h:.63},{x:4.13,lo:3.95,s:5.55,r:.66,h:.63}]:[];
   wallFace(-7.32,7.32,0,7.18,0,{m:shade(STONE,side<0?.91:.82),holes:gaps,course:.49,width:1.04,soot:true});
   for(const o of gaps){arch(o.x,o.s,o.r,o.h,.18,.03,.51,DARKSTONE,true,o.lo,11);panel([o.x,(o.lo+o.s+o.h)/2,-.29],[1,0,0],UP,1.36,o.s+o.h-o.lo+.02,mat(VISTA,0xffebc1,1,1.28));box(o.x,o.lo,.071,1.68,.12,.36,STONE,.028);for(const off of [-.34,0,.34])box(o.x+off,(o.lo+o.s+.38)/2,.008,.035,o.s+.38-o.lo,.065,BLACKIRON,.006);}
   box(0,6.98,.11,14.67,.30,.31,TAR,.033);
  });
 }
 group("great flight arch");
 frame(0,0,-20,0,()=>{
   const gate={x:0,lo:1.58,s:3.47,r:5.45,h:4.58};
   wallFace(-8.46,8.46,0,9.62,0,{m:shade(STONE,.86),holes:[gate],course:.485,width:1.08,soot:true});
   arch(0,3.47,5.45,4.58,.60,.04,1.05,STONE,true,1.55,29);
   arch(0,3.47,6.025,5.16,.145,.13,.95,shade(DARKSTONE,1.18),false,0,31);
   box(0,1.55,.03,11.55,.29,1.18,shade(STONE,.81),.065);
   gable(2.47,9.61,10.60,-.35,1,shade(DARKSTONE,.80));
   // The recessed panorama is only visible through the flight opening.

 });
 group("roost roof");
 roof(8.48,-5.35,-20.10,7.17,10.60,shade(OAK,.74),shade(WALNUT,.90),1.42);
 for(const x of [-5.65,-2.83,2.83,5.65]){
  const y=10.60-Math.abs(x)*3.43/8.48-.25;
  box(x,y,-12.70,.27,.34,14.66,WALNUT,.030);
 }
 for(const [k,z] of [-7.05,-12.00,-17.92].entries()){
  group("roost stone rib "+k);
  const r=7.55,s=3.24,ry=5.2;
  arch(0,s,r,ry,.55,z,.69,shade(STONE,.87),false,0,29);
  arch(0,s,r+.50,ry+.51,.14,z,.79,shade(DARKSTONE,1.19),false,0,31);
  for(const side of [-1,1]){
   const x=side*(r+.28);
   box(x,.21,z,1.10,.42,1.12,shade(DARKSTONE,1.09),.065);
   for(let j=0;j<5;j++)box(x,.42+(j+.5)*.532,z,.76,.522,.84,shade(STONE,rand(.76,.94)),.032);
   box(x,3.13,z,.99,.26,1.10,PALESTONE,.042);box(x,3.32,z,1.10,.17,1.19,shade(STONE,.90),.033);
   obstacle(x,z,1.09,1.13);
   beam([side*7.90,5.45,z],[side*5.85,7.62,z],.24,.27,TAR,.028);
  }
  box(0,7.70,z,12.84,.31,.35,WALNUT,.035);
  for(const sign of [-1,1])beam([sign*5.90,7.83,z],[0,10.20,z],.32,.32,shade(OAK,.82),.028);
  beam([0,7.84,z],[0,10.23,z],.32,.28,OAK,.025);
 }
}


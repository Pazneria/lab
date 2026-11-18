"use strict";
function cliffView(){
 group("open mountain horizon");
 // A curved backing keeps the mountain horizon behind the jambs even from a grazing angle.
 const o=[0,0,-19.70],r=15.60,n=56;
 for(let i=0;i<n;i++){
  const a=(i/n-.5)*Math.PI*1.56,b=((i+1)/n-.5)*Math.PI*1.56;
  const p=(t,y)=>[o[0]+r*Math.sin(t),y,o[2]-r*Math.cos(t)];
  face([p(a,-7.1),p(b,-7.1),p(b,14.4),p(a,14.4)],mat(VISTA,0xffefd2,1,1.46),[[i/n,1],[(i+1)/n,1],[(i+1)/n,0],[i/n,0]]);
 }
 // Short, offset ridgelines make the outside view slide past the stone opening with real parallax.
 function hills(z,base,height,width,colour,phase){
  const pts=[];for(let i=0;i<=43;i++){
   const xx=-width/2+i*width/43;
   const y=base+height*(.34*Math.sin(i*.29+phase)+.28*Math.sin(i*.77+phase*.3)+.25*Math.sin(i*.17+phase*2)+rand(-.077,.077));
   pts.push([xx,y,z+.27*Math.sin(i*.71+phase)]);
  }
  for(let i=0;i<pts.length-1;i++){
   const a=pts[i],b=pts[i+1],m=mat(SOLID,colour,1,1.16);
   const k=.96+.046*Math.sin(i*.61+phase);
   face([[a[0],-4,a[2]], [b[0],-4,b[2]],b,a],shade(m,k));
  }
 }
 hills(-30.9,2.41,2.28,30,0x8b9285,.8);hills(-27.6,1.10,1.71,25.1,0x667b6f,3.0);
 function pine(x,y,z,h){
  const bark=mat(SOLID,0x505a4e,1,1.06);cylinder([x,y,z],[x,y+h,z],h*.019,h*.0018,bark,6);
  for(let k=0;k<7;k++){
   const t=k/7,b=y+h*(.16+.715*t),w=h*.170*(1-.82*t),top=b+h*(.36-.11*t);
   const m=mat(SOLID,k%2?0x566e61:0x50695d,1,1.08);
   for(let j=0;j<10;j++){
    const a=j*TAU/10+k*.35,bb=a+TAU/10;
    const q=(v,rr,yy)=>[x+rr*Math.cos(v),yy,z+rr*Math.sin(v)];
    const A=q(a,w*rand(.90,1.12),b+rand(-.08,.08)*w),B=q(bb,w*rand(.90,1.12),b+.04*w);
    face([A,B,[x+.01*h,top,z]],shade(m,.92+.13*Math.sin(a)));
   }
  }
 }
 for(let j=0;j<21;j++){
  const x=-11.7+j*1.15+rand(-.29,.29);
  const sides=Math.min(1,Math.abs(x)/7);
  pine(x,-.54+.19*Math.sin(x),-25.7+rand(-1.1,1),1.2+1.77*sides+rand(0,.96));
 }
}
function restingThrow(){
 group("perch mending");
 const deck=1.720;
 function nest(x,z){
  let a=Math.atan2((z+15.71)/1.85,(x-.36)/4.22),r=0;
  for(let k=0;k<3;k++){
   const xx=(x-.36)/(4.22*(1+.040*Math.sin(3*a+.4)+.027*Math.sin(6*a-.7))),zz=(z+15.71)/(1.85*(1+.060*Math.sin(3*a-.4)));
   r=Math.hypot(xx,zz);a=Math.atan2(zz,xx);
  }
  const h=.095+.038*Math.sin(a*3+1)*r+.46*Math.exp(-(((r-.82)/.205)**2))*(.80+.17*Math.sin(a-.40)+.16*Math.sin(4*a))+.030*Math.sin(a*11+r*6)*r;
  return deck+.021+(r<1?h:r<1.07?h*(1.07-r)/.07:0);
 }
 function fabric(u,v){
  const x=2.19+(u-.5)*2.28+.118*Math.sin(v*3.3)+.037*Math.sin(v*10+u*6);
  const w=.024*Math.sin(u*24+v*5.3)+.014*Math.sin(u*44-v*3.0),fold=.019*Math.cos(u*13.7+v*5.3);
  if(v<.28){
   const q=v/.28;
   return [x,1.149+.60*q+.052*Math.sin(u*5)*(1-q)+.012*Math.sin(u*19),-13.058-.043*q+w*(1.44-.4*q)+.064*Math.sin(q*Math.PI)];
  }
  const q=(v-.28)/.72,z=-13.108-1.97*q+.043*Math.sin(u*5)*q;
  return [x,nest(x,z)+.041+w+fold,z];
 }
 const dyed=mat(7,0x81998a);
 surface(43,47,fabric,(u,v)=>[u*4.2,v*4.9],dyed);
 const detail=(u,v,h)=>{const p=fabric(u,v);if(v<.28)p[2]+=h;else p[1]+=h;return p;};
 for(const [a,b,m] of [[.065,.080,mat(7,0xc6b187)],[.087,.100,mat(7,0xbcab87)],[.797,.829,mat(7,0x576f60)],[.839,.852,mat(7,0xc6b28d)]]){
  surface(43,2,(u,v)=>detail(u,a+(b-a)*v,.0038),(u,v)=>[u*4,v*.3],m);
 }
 // A rectangular darn with a running stitch holds a torn corner together.
 surface(9,8,(u,v)=>detail(.159+.151*u,.112+.115*v,.007),(u,v)=>[u*.74,v*.64],mat(7,0x9fa38a));
 for(let i=0;i<=13;i++){
  const u=.165+i*.0102;
  pipe([detail(u,.120,.009),detail(u+.005,.124,.010)],.0026,LINEN,4);
  pipe([detail(u,.215,.009),detail(u+.005,.214,.010)],.0026,LINEN,4);
 }
 for(let i=0;i<54;i++){
  const u=(i+.44)/54,p=fabric(u,.002),b=[p[0]+.011*Math.sin(i),p[1]-.058-rand(0,.048),p[2]+.011];
  pipe([p,V.mix(p,b,.47),b],.005,mat(7,i%3?0xa6b199:0xb8b399),4);
 }
}
function oldRakes(x,y,z,yaw,scale){
 frame(x,y,z,yaw,()=>{
  for(let k=0;k<4;k++){
   const off=(k-1.5)*.165*scale,ell=(1-.10*Math.abs(k-1.65))*scale;
   const q=t=>[off+.37*scale*t+.031*Math.sin(t*6+k),.62*ell-t*1.27*ell,.003+.001*Math.cos(t*8+k)];
   for(let j=0;j<19;j++){
    const a=j/19,b=(j+1)/19,A=q(a),B=q(b),w=.026*scale*Math.pow(Math.sin(a*Math.PI),.64),v=.026*scale*Math.pow(Math.sin(b*Math.PI),.64);
    face([[A[0]-w,A[1],A[2]],[B[0]-v,B[1],B[2]],[B[0]+v*.33,B[1],B[2]],[A[0]+w*.33,A[1],A[2]]],mat(1,0x8d877a));
    face([[A[0]+w*.32,A[1],A[2]+.0006],[B[0]+v*.32,B[1],B[2]+.0006],[B[0]+v*1.20,B[1],B[2]+.0006],[A[0]+w*1.20,A[1],A[2]+.0006]],shade(STONE,1.06));
   }
  }
 });
}
function finalDetails(){
 cliffView();restingThrow();
 group("large stone claw marks");
 oldRakes(3.05,3.05,-5.505,Math.PI,1.25);
 oldRakes(-8.356,2.57,-8.25,Math.PI/2,1.49);
 group("thresholds and keepsakes");
 box(.56,.010,-5.34,2.00,.041,.42,shade(FLAG,1.05),.016);
 scute(-2.46,.731,4.28,.49,-.4);
 // A repaired dragon scute beside the resin jars is large enough to inspect by hand.
 frame(-1.68,0,-.02,Math.PI/2,()=>{scute(-.142,.905,.510,.61,.41);});
}

function heatingDucts(){
 group("banked heat ducts");
 for(const cx of [5.45,6.24,7.03]){
  const z=-12.732,w=.756,d=.39;
  box(cx,.014,z,w,.036,d,BLACKIRON,.010);
  box(cx,.034,z,w-.064,.006,d-.068,mat(1,0x744431,.82,.16));
  for(let i=0;i<9;i++)box(cx+(i-4)*.077,.042,z,.043,.021,d-.021,shade(IRON,.90),.004);
  for(const ss of [-1,1]){
   box(cx,.041,z+ss*(d*.5-.017),w-.007,.026,.037,shade(BRASS,.72),.004);
   for(const dx of [-.306,.306])cylinder([cx+dx,.053,z+ss*.173],[cx+dx,.059,z+ss*.173],.009,.008,IRON,8);
  }
 }
 for(const x of [-1.01,1.46]){
  box(x,.414,-13.72,1.40,.60,.64,shade(DARKSTONE,.91),.035);
  box(x,.434,-13.374,1.24,.438,.071,BLACKIRON,.018);
  box(x,.429,-13.328,1.09,.308,.026,mat(1,0xb76d42,1,.34),.009);
  for(let j=0;j<4;j++)box(x,.326+j*.071,-13.287,1.11,.038,.060,shade(IRON,.81),.005);
  for(const xx of [-.567,.567])for(const yy of [-.164,.164])stud(x+xx,.433+yy,-13.33,.015,BRASS);
 }
 group("roost inspection light");
 const x=-4.36,z=-12.00;
 box(x,7.70,z,.157,.326,.386,BLACKIRON,.009);
 hoop([x,7.46,z],[.074,0,0],[0,.103,0],.017,IRON,14,6);
 chain([x,7.39,z],[x,4.63,z],.087,.018,shade(IRON,.92));
 hoop([x,4.56,z],[.079,0,0],[0,.10,0],.019,BRASS,17,6);
 for(let i=0;i<3;i++){
  const a=i*TAU/3+.22;
  chain([x,4.47,z],[x+.342*Math.cos(a),4.06,z+.342*Math.sin(a)],.058,.012,IRON);
 }
 lathe(x,0,z,[[0,3.43],[.181,3.43],[.247,3.47],[.222,3.51]],BLACKIRON,10);
 lathe(x,0,z,[[.165,3.50],[.23,3.62],[.266,3.87],[.212,3.977]],mat(SOLID,0xf7dc9c,1,2.25),10);
 for(let i=0;i<10;i++){
  const a=i*TAU/10;beam([x+.207*Math.cos(a),3.50,z+.207*Math.sin(a)],[x+.279*Math.cos(a),3.985,z+.279*Math.sin(a)],.016,.024,BRASS,.003);
 }
 lathe(x,0,z,[[.212,3.967],[.448,3.965],[.453,3.992],[.351,4.047],[.155,4.174],[.097,4.18],[.083,4.213],[0,4.216]],mat(6,0xb59870),20);
 hoop([x,3.640,z],[.248,0,0],[0,0,.248],.012,BLACKIRON,20,6);
 // Static, softly feathered daylight beneath the clerestories.
 group("roost window light");
 for(const [zz,w] of [[-12.97,1.03],[-16.85,1.03]]){
  const start=[-8.26,5.53,zz],end=[-2.90,1.00,zz+1.17];
  const p=(u,v)=>{const mid=V.mix(start,end,v),offset=(u-.5)*w*(1+1.7*v);return [mid[0]+.12*offset,mid[1]+.15*offset,mid[2]+offset];};
  surface(2,2,p,(u,v)=>[u,v],mat(51,0xffe3b2,1,0,.067));
 }
}


"use strict";
function surface(nu,nv,fn,uvfn,m){
 const samples=[];
 for(let j=0;j<=nv;j++)for(let i=0;i<=nu;i++)samples.push(fn(i/nu,j/nv));
 const at=(i,j)=>samples[clamp(j,0,nv)*(nu+1)+clamp(i,0,nu)];
 const normals=samples.map((p,k)=>{const i=k%(nu+1),j=Math.floor(k/(nu+1));return V.unit(V.cross(V.sub(at(i+1,j),at(i-1,j)),V.sub(at(i,j+1),at(i,j-1))));});
 for(let j=0;j<nv;j++)for(let i=0;i<nu;i++){
   const ix=j*(nu+1)+i,ids=[ix,ix+1,ix+nu+2,ix+nu+1];
   face(ids.map(k=>samples[k]),m,ids.map(k=>uvfn((k%(nu+1))/nu,Math.floor(k/(nu+1))/nv)),ids.map(k=>normals[k]));
 }
}
function stud(x,y,z,r=.025,m=IRON){
 cylinder([x,y,z-.006],[x,y,z+.008],r,r*.84,m,8);
}
function picture(x,y,z,w,h,id,frameMat=WALNUT,border=.050){
 box(x,y,z,w+border*2,h+border*2,.065,shade(frameMat,.71),.014);
 panel([x,y,z+.041],[1,0,0],UP,w,h,mat(id));
 for(const s of [-1,1]){box(x+s*(w+border)*.5,y,z+.044,border,h+2*border,.047,frameMat,.009);box(x,y+s*(h+border)*.5,z+.044,w+.005,border,.047,frameMat,.008);}
}
function label(x,y,z,w,h,id){
 box(x,y,z,w+.034,h+.034,.026,BLACKIRON,.006);
 panel([x,y,z+.016],[1,0,0],UP,w,h,mat(id));
 for(const side of [-1,1])stud(x+side*(w*.5-.025),y,z+.015,.009,BRASS);
}
function jar(x,y,z,r,h,m,lid=true){
 const p=[[0,0],[r*.67,0],[r*.85,.04*h],[r,.16*h],[r*.98,.61*h],[r*.81,.77*h],[r*.67,.82*h],[r*.67,.92*h],[r*.74,.94*h],[r*.74,.99*h],[r*.58,h],[r*.55,.90*h],[r*.55,.75*h],[0,.74*h]];
 lathe(x,y,z,p,m,20);
 if(lid){lathe(x,y,z,[[0,h*.98],[r*.68,h*.98],[r*.71,h*1.06],[r*.56,h*1.10],[0,h*1.10]],shade(OAK,1.1),16);}
}
function mug(x,y,z,scale=1,m=CELADON,yaw=0){
 frame(x,y,z,yaw,()=>{const s=scale;
  lathe(0,0,0,[[0,0],[.063*s,0],[.075*s,.020*s],[.084*s,.139*s],[.089*s,.156*s],[.088*s,.167*s],[.074*s,.169*s],[.071*s,.147*s],[.062*s,.029*s],[0,.024*s]],m,20);
  lathe(0,0,0,[[.071*s,.133*s],[0,.133*s]],mat(12,0x58402b),18);
  const p=[];for(let i=0;i<=12;i++){const t=Math.PI*i/12;p.push([(.071+.071*Math.sin(t))*s,(.092+.055*Math.cos(t))*s,0]);}pipe(p,.012*s,m,7);
 });
}
function bottle(x,y,z,r,h,m=CELADON){
 lathe(x,y,z,[[0,0],[r*.75,0],[r,.09*h],[r,.62*h],[r*.90,.70*h],[r*.43,.82*h],[r*.40,.95*h],[r*.47,.96*h],[r*.47,h],[r*.33,h],[r*.33,.92*h]],m,16);
 cylinder([x,y+h*.98,z],[x,y+h*1.06,z],r*.33,r*.35,OAK,12);
}
function lantern(x,y,z,s=1){
 frame(x,y,z,0,()=>{
 const body=mat(SOLID,0xffce86,1,2.20),rim=shade(BRASS,.70);
 lathe(0,0,0,[[0,0],[.14*s,0],[.17*s,.037*s],[.162*s,.080*s],[.113*s,.118*s]],BLACKIRON,8);
 lathe(0,0,0,[[.10*s,.103*s],[.132*s,.175*s],[.133*s,.340*s],[.094*s,.380*s]],body,8);
 lathe(0,0,0,[[.155*s,.359*s],[.164*s,.381*s],[.148*s,.410*s],[.08*s,.453*s],[.071*s,.515*s],[0,.52*s]],BLACKIRON,8);
 for(let i=0;i<6;i++){const a=i*TAU/6;beam([Math.cos(a)*.13*s,.078*s,Math.sin(a)*.13*s],[Math.cos(a)*.145*s,.375*s,Math.sin(a)*.145*s],.015*s,.016*s,rim,.001);}
 for(const yy of [.119,.345])hoop([0,yy*s,0],[.144*s,0,0],[0,0,.144*s],.009*s,rim,16,5);
 hoop([0,.548*s,0],[.057*s,0,0],[0,.054*s,0],.009*s,BLACKIRON,16,5);
 });
}
function wallLamp(x,y,z,s=1){
 // Neutral wall orientation: its face opens along positive Z.
 box(x,y+.55*s,z+.025,.19*s,.42*s,.065,BLACKIRON,.018);
 for(const v of [-.13,.13])stud(x,y+(.55+v)*s,z+.07,.026*s,BRASS);
 pipe([[x,y+.64*s,z+.06],[x,y+.69*s,z+.26*s],[x,y+.66*s,z+.35*s],[x,y+.58*s,z+.35*s]],.023*s,BLACKIRON,8);
 lantern(x,y,z+.35*s,s);
}
function stool(x,y,z,scale=1,yaw=0){
 frame(x,y,z,yaw,()=>{const s=scale;
  lathe(0,0,0,[[0,.418*s],[.216*s,.418*s],[.238*s,.438*s],[.238*s,.474*s],[.222*s,.49*s],[0,.49*s]],OAK,20);
  for(let i=0;i<3;i++){
   const a=(i+.5)*TAU/3;const v=[Math.cos(a),Math.sin(a)];
   cylinder([v[0]*.217*s,.009*s,v[1]*.217*s],[v[0]*.143*s,.43*s,v[1]*.143*s],.035*s,.043*s,WALNUT,9);
   const b=(i+1.5)*TAU/3;beam([v[0]*.18*s,.19*s,v[1]*.18*s],[Math.cos(b)*.18*s,.19*s,Math.sin(b)*.18*s],.029*s,.035*s,OAK,.004);
  }
 });
}
function bucket(x,y,z,r=.26,h=.43,water=false){
 const n=16;const profile=[[0,.019],[r*.79,.019],[r*.84,.044],[r,h-.023],[r,h],[r*.91,h],[r*.77,.075],[0,.074]];
 lathe(x,y,z,profile,shade(OAK,.83),n);
 for(let i=0;i<n;i++){
  const a=TAU*i/n;
  beam([x+r*.844*Math.cos(a),y+.055,z+r*.844*Math.sin(a)],[x+r*1.002*Math.cos(a),y+h-.012,z+r*1.002*Math.sin(a)],.010,.009,shade(WALNUT,.62),0);
 }
 for(const t of [.15,.80]){
  const rr=r*(.84+.16*t)+.008;lathe(x,y,z,[[rr-.003,h*t],[rr,h*t+.003],[rr+.004,h*t+.041],[rr-.002,h*t+.044]],IRON,n);
 }
 const pts=[];for(let i=0;i<=16;i++){const a=Math.PI*i/16;pts.push([x+r*Math.cos(a),y+h*.85+r*Math.sin(a)*1.09,z+Math.sin(a)*r*.34]);}pipe(pts,r*.04,IRON,7);
 if(water){lathe(x,y,z,[[r*.915,h*.78],[0,h*.78]],mat(12,0x66817a),22);hoop([x-.022,y+h*.78+.002,z+.015],[r*.42,0,0],[0,0,r*.39],.002,mat(12,0x92a59a),22,4);}
}
function folded(x,y,z,w,h,d,m){
 for(let j=0;j<3;j++){
  const ww=w*(1-j*.017),zz=z+Math.sin(j)*.014;
  box(x,y+(j+.5)*h/3,zz,ww,h/3+.004,d*(1-j*.025),m,Math.min(.024,h*.12));
  pipe([[x-ww*.46,y+j*h/3+.014,zz+d*.48],[x,y+j*h/3+.012,zz+d*.49],[x+ww*.47,y+j*h/3+.015,zz+d*.48]],.006,shade(m,.79),5);
 }
}
function coil(x,y,z,r,turns,wire,m=CORD){
 const p=[];for(let i=0;i<=turns*25;i++){const a=i*TAU/25,rr=r*(.88+.065*Math.sin(a*.27)+.037*Math.cos(a*2));p.push([x+rr*Math.cos(a),y+wire+i/25*wire*1.65,z+rr*.83*Math.sin(a)]);}
 pipe(p,wire,m,7);
 const tail=p[p.length-1];pipe([tail,[x+r*1.1,y+wire*2,z+r*.24],[x+r*1.25,y+wire,z+r*.78],[x+r*1.7,y+wire,z+r*.96]],wire,m,7);
}
function peg(x,y,z,len=.18){
 cylinder([x,y,z],[x,y+.042,z+len],.026,.027,shade(OAK,.77),10);
 cylinder([x,y+.041,z+len-.009],[x,y+.047,z+len+.012],.036,.035,OAK,10);
}
function hangingCloth(x,y,z,w,h,m){
 const fn=(u,v)=>[x+(u-.5)*w*(.35+.65*v)+.027*Math.sin(v*4+u*2),y-v*h+.04*Math.sin(u*6)*v,z+.054+Math.sin(u*17+.6*Math.sin(v*5))*(.025+.042*v)+v*.04];
 surface(15,15,fn,(u,v)=>[u*1.1,v*2.05],m);
 const pts=[];for(let i=0;i<=15;i++)pts.push(fn(i/15,.956));pipe(pts,.005,shade(m,.68),4);
}
function closedBook(x,y,z,w,h,d,m,yaw=0){
 frame(x,y,z,yaw,()=>{
  box(0,.01,0,w,.021,d,m,.005);box(0,h*.51,.003,w-.021,h-.031,d-.025,PAPER,.007);
  box(0,h-.009,0,w,.021,d,m,.005);box(-w/2+.01,h/2,0,.025,h,d,m,.005);
  for(let i=0;i<3;i++)box(-w/2+.013,h/2,-d*.34+i*d*.34,.029,h+.002,.018,shade(BRASS,.69),.003);
 });
}
function openBook(x,y,z,w,d,yaw=0){
 frame(x,y,z,yaw,()=>{
  box(0,.015,0,w+.025,.030,d+.025,LEATHER,.008);
  for(const ss of [-1,1]){
   const gx=ss*w*.25;
   box(gx,.041,0,w*.49,.044,d-.008,PAPER,.011);
   surface(8,2,(u,v)=>[gx+(u-.5)*w*.5,.064+.026*Math.sin(u*Math.PI)+.010*(ss<0?u:1-u),(v-.5)*(-d)],(u,v)=>[u,1-v],mat(ss<0?LEDGER:PAGE));
  }
  const m=mat(7,0x984c37);face([[-.025,.070,d*.44],[-.002,.072,d*.44],[.029,.023,d*.58],[.003,.024,d*.58]],m);
 });
}
function nailPlate(x,y,z,w,h,m=IRON){
 box(x,y,z,w,h,.031,m,.008);const rad=Math.min(w,h)*.12;
 for(const s of [-1,1])for(const t of [-1,1])stud(x+s*(w*.5-rad*1.6),y+t*(h*.5-rad*1.6),z+.017,rad,shade(m,1.15));
}
function barrel(x,y,z,r=.42,h=1.03,lid=true){
 const n=18,p=[[0,0],[r*.78,0],[r*.88,h*.13],[r,h*.46],[r*.985,h*.63],[r*.84,h*.92],[r*.80,h],[r*.74,h],[r*.74,h*.91]];
 lathe(x,y,z,p,OAK,n);
 for(let i=0;i<n;i++){
   const a=(i+.02)*TAU/n,c=Math.cos(a),s=Math.sin(a);
   pipe(p.slice(1,7).map(([rr,yy])=>[x+rr*1.003*c,y+yy,z+rr*1.003*s]),.006,shade(WALNUT,.69),4);
 }
 for(const [t,rr] of [[.10,.869],[.31,.957],[.72,.960],[.91,.864]])lathe(x,y,z,[[r*rr,h*t-.025],[r*rr+.013,h*t-.019],[r*rr+.013,h*t+.027],[r*rr,h*t+.031]],IRON,n);
 if(lid){lathe(x,y,z,[[r*.766,h*.976],[0,h*.976]],WALNUT,n);for(const dz of [-.4,0,.4])box(x,y+h*.979,z+r*dz,r*1.45*Math.sqrt(1-dz*dz),.006,.009,BLACKIRON);}
}
function smallBasket(x,y,z,r,h){
 lathe(x,y,z,[[0,0],[r*.60,.015],[r*.85,h*.28],[r,h*.89],[r*.96,h],[r*.85,h],[r*.79,h*.36],[0,h*.20]],mat(9,0xcaad82),16);
 for(let j=0;j<7;j++){
  const t=(j+.55)/7,rr=r*(.66+.34*Math.sin(t*Math.PI/2));
  hoop([x,y+h*t,z],[rr,0,0],[0,0,rr],.010,mat(7,j%2?0xbba17b:0xd0b58d),20,5);
 }
 for(let i=0;i<12;i++){const a=i*TAU/12;pipe([[x+r*.65*Math.cos(a),y+.019,z+r*.65*Math.sin(a)],[x+r*.90*Math.cos(a),y+h*.46,z+r*.90*Math.sin(a)],[x+r*.97*Math.cos(a),y+h*.98,z+r*.97*Math.sin(a)]],.009,CORD,5);}
}


import {rng,pick,mix} from './workshop.js';

export const H={west:-7.5,east:7.5,north:-10.4,south:9,eave:7.35,ridge:9.80,
  alcoveWest:-10.85,alcoveNorth:-6.32,alcoveSouth:0, gallery:3.42,edge:3.75,deckEnd:5.65,
  stairLeft:1.10,stairBottom:1.45,stairTop:-5.75,landingEnd:-7.50};
export const walnut='#92765e', honey='#e1c49f', dark='#715b4b', teal='#405752', iron='#41423c', brass='#b9a16e';
const r=rng(9158);
function fill(W,x0,x1,y0,y1,mat='plaster',col='#fffbef',depth=.34){
  if(x1-x0<.0001||y1-y0<.0001)return;
  W.box(mat,(x0+x1)/2,(y0+y1)/2,-depth/2,x1-x0,y1-y0,depth,col);
}
function strip(W,x0,x1,y,z,h,d,mat='wood',col=walnut){W.box(mat,(x0+x1)/2,y,z,x1-x0,h,d,col);}
function curvedBand(W,cx,spr,rx,ry,th,z,depth,mat,col,n=28){
  for(let i=0;i<n;i++) {
    const t=Math.PI*i/n,u=Math.PI*(i+1)/n;
    const p=(a,out,zz)=>[cx-(rx+out)*Math.cos(a),spr+(ry+out)*Math.sin(a),zz];
    const a=p(t,0,z),b=p(u,0,z),A=p(t,th,z),B=p(u,th,z),af=p(t,0,z-depth),bf=p(u,0,z-depth);
    const uv=[[i/n,0],[(i+1)/n,0],[(i+1)/n,1],[i/n,1]];
    W.face(mat,[a,b,B,A],col,uv);W.face(mat,[a,af,bf,b],col,uv);
    W.face(mat,[A,B,p(u,th,z-depth),p(t,th,z-depth)],col,uv);
  }
}
function holeHead(W,cx,rx,spr,ry,cap,back=-.34){
  const n=28;
  for(let i=0;i<n;i++){
    const t=i*Math.PI/n,u=(i+1)*Math.PI/n;
    const x=cx-rx*Math.cos(t),X=cx-rx*Math.cos(u),y=spr+ry*Math.sin(t),Y=spr+ry*Math.sin(u);
    W.face('plaster',[[x,y,0],[X,Y,0],[X,cap,0],[x,cap,0]],'#fffbef',[[x/2.45,y/2.45],[X/2.45,Y/2.45],[X/2.45,cap/2.45],[x/2.45,cap/2.45]]);
    W.face('stone',[[x,y,0],[x,y,back],[X,Y,back],[X,Y,0]],'#e5d7ba');
  }
}
function windowBay(W,cx,width,sill,spring,rise,cap,ymin=0,small=false){
  const rr=width/2,L=cx-rr,R=cx+rr;
  fill(W,L,R,ymin,sill);holeHead(W,cx,rr,spring,rise,cap);
  const stoneCol='#e4d6b9', frame=small?'#725f46':'#685943';
  for(const [x,dir] of [[L,-1],[R,1]]){
    W.box('stone',x+dir*.11,(sill+spring)/2,.044,.22,spring-sill,.12,stoneCol);
    W.box('stone',x+dir*.21,(sill+spring)/2,.067,.038,spring-sill,.14,'#f6e2be');
    W.box('wood',x-dir*.053,(sill+spring)/2,-.19,.106,spring-sill,.105,frame);
    W.box('stone',x+dir*.10,spring-.018,.088,.31,.10,.19,'#e5d2ac');
    if(!small){for(let y=sill+.48;y<spring-.15;y+=.61)W.box('plain',x+dir*.11,y,.108,.21,.008,.008,'#af9f85');}
  }
  curvedBand(W,cx,spring,rr,rise,.23,.107,.13,'stone',stoneCol);
  curvedBand(W,cx,spring,rr+.19,rise+.19,.045,.14,.075,'stone','#eadbbd');
  curvedBand(W,cx,spring,rr-.102,rise-.102,.105,-.13,.1,'wood',frame);
  if(!small)for(let i=1;i<13;i++){
    const a=i*Math.PI/13;
    W.beam('plain',[cx-rr*Math.cos(a),spring+rise*Math.sin(a),.113],[cx-(rr+.184)*Math.cos(a),spring+(rise+.184)*Math.sin(a),.113],.009,.006,'#a1997f');
  }
  const c='#514d3c',bz=-.205;
  W.box('wood',cx,sill+.049,bz,width,.10,.12,frame);
  W.box('stone',cx,sill-.03,.028,width+.49,.10,.55,'#eee0c0');
  W.box('stone',cx,sill-.12,.062,width+.32,.085,.32,'#c2b69a');
  W.box('wood',cx,spring,bz,width,.087,.09,c);
  for(const f of [1/3,2/3])W.box('wood',L+width*f,(sill+spring)/2,bz,.048,spring-sill,.075,c);
  const levels=small?1:Math.max(1,Math.floor((spring-sill)/.96));
  for(let i=1;i<=levels;i++)W.box('iron',cx,sill+(spring-sill)*i/(levels+1),bz,width,.028,.048,'#5d5949');
  for(const angle of [Math.PI/4,Math.PI/2,Math.PI*3/4]){
    W.beam('wood',[cx,spring,bz],[cx+(rr-.09)*Math.cos(angle),spring+(rise-.06)*Math.sin(angle),bz],.047,.061,c);
  }
  curvedBand(W,cx,spring,rr*.31,rise*.31,.036,bz+.022,.051,'wood',c,18);
  const old=W.cast;W.cast=false;
  W.panel('glass',cx,(sill+spring)/2,bz-.045,width,spring-sill,'#d4e1ce');
  for(let i=0;i<20;i++){const a=i*Math.PI/20,b=(i+1)*Math.PI/20;W.face('glass',[[cx,spring,bz-.045],[cx+rr*Math.cos(a),spring+rise*Math.sin(a),bz-.045],[cx+rr*Math.cos(b),spring+rise*Math.sin(b),bz-.045]],'#d6dfce');}
  W.cast=old;
}
function wallWindows(W,min,max,windows,cap,ymin=0){
  let prev=min;
  for(const win of windows){
    const [cx,w,y,spr,ry,small]=win;fill(W,prev,cx-w/2,ymin,cap);windowBay(W,cx,w,y,spr,ry,cap,ymin,small);prev=cx+w/2;
  }fill(W,prev,max,ymin,cap);
}
function wainscot(W,l,r,h=.77){
  const len=r-l;strip(W,l,r,h/2,.037,h,.081,'paint',teal);
  const n=Math.max(1,Math.round(len/.73));
  for(let i=0;i<=n;i++)W.box('paint',l+len*i/n,h*.51,.09,.056,h*.85,.043,'#52635a');
  strip(W,l,r,.11,.088,.21,.115,'wood',dark);strip(W,l,r,h-.015,.095,.08,.13,'paint','#53645a');
  strip(W,l-.02,r+.02,h+.035,.102,.054,.18,'wood',walnut);
}
function floor(W) {
  const {west:L,east:R,north:N,south:S}=H, per=.24;
  W.box('wood',0,-.095,(N+S)/2,R-L+.08,.17,S-N+.08,'#624b38');
  const cols=['#c6ac8d','#d7bb99','#d2b697','#dfc6a6','#bea186','#c8ad8a','#cdb298','#d9c2a1'];
  const nx=14,nz=18,sx=(R-L-2*per)/nx,sz=(S-N-2*per)/nz;
  for(let k=0;k<nz;k++)for(let i=0;i<nx;i++)for(let b=0;b<4;b++){
    const along=(i+k)%2===0;
    const x=L+per+sx*(i+(along?.5:(b+.5)/4)),z=N+per+sz*(k+(along?(b+.5)/4:.5));
    W.box('wood',x,-.012,z,along?sx-.008:sx/4-.004,.024,along?sz/4-.004:sz-.008,pick(cols,r),{skip:[0,1,2,3,5]});
  }
  for(const x of [L+per/2,R-per/2])W.box('wood',x,-.012,(N+S)/2,per-.006,.026,S-N,'#bd9c7b');
  for(const z of [N+per/2,S-per/2])W.box('wood',0,-.012,z,R-L-per*2,.026,per-.006,'#caa582');
  for(const x of [L+per-.035,R-per+.035])W.box('wood',x,.001,(N+S)/2,.018,.005,S-N-.20,dark);
  for(const z of [N+per-.035,S-per+.035])W.box('wood',0,.001,z,R-L-.20,.005,.018,dark);
  // Flagstones continue across the threshold into the projecting window bay.
  const Wd=L-H.alcoveWest,Dt=H.alcoveSouth-H.alcoveNorth;
  W.box('stone',H.alcoveWest+Wd/2,-.09,H.alcoveNorth+Dt/2,Wd+.05,.16,Dt,'#8d8776');
  for(let j=0;j<8;j++)for(let i=0;i<4;i++)W.box('stone',H.alcoveWest+(i+.5)*Wd/4,-.028,H.alcoveNorth+(j+.5)*Dt/8,Wd/4-.013,.058,Dt/8-.013,pick(['#d5cdb5','#dcd1b7','#c8c4ae'],r));
}
function shell(W){
  const {west:L,east:R,north:N,south:S,eave:E,ridge:P}=H;
  W.at(0,0,N,0,()=>{
    wallWindows(W,L,R,[[-4.95,2.54,.88,5.13,1.27],[-1.55,2.77,.75,5.59,1.385],[1.90,2.64,.88,5.15,1.32]],E);
    wainscot(W,L,R,.65);
    W.face('plaster',[[L,E,0],[R,E,0],[0,P,0]],'#f8f1de',[[0,0],[6,0],[3,1]]);
  });
  W.at(0,0,S,Math.PI,()=>{
    fill(W,L,R,0,E);wainscot(W,L,R,.94);W.face('plaster',[[L,E,0],[R,E,0],[0,P,0]],'#faf1dd');
  });
  W.at(R,0,0,-Math.PI/2,()=>{
    wallWindows(W,N,S,[[-7.70,2.35,4.19,5.66,1.175],[3.28,2.04,4.18,5.77,1.02]],E);
    wainscot(W,N,S,.84);
  });
  W.at(L,0,0,Math.PI/2,()=>{
    const lo=-S,hi=-N,cx=3.16,rr=3.16,spr=2.88,ry=1.28,cap=4.54;
    fill(W,lo,0,0,cap);fill(W,6.32,hi,0,cap);holeHead(W,cx,rr,spr,ry,cap);
    curvedBand(W,cx,spr,rr,ry,.205,.115,.38,'stone','#e6d8bc',34);
    curvedBand(W,cx,spr,rr+.17,ry+.17,.053,.15,.15,'stone','#eadec2',34);
    for(const x of [-.103,6.423]){
      W.box('stone',x,spr/2,.015,.21,spr,.51,'#e4d6b9');W.box('stone',x,spr-.012,.045,.35,.13,.63,'#eadfc5');
      W.box('stone',x,.18,.051,.34,.36,.59,'#c8bba1');
    }
    wainscot(W,lo,-.25);wainscot(W,6.58,hi);
    wallWindows(W,lo,hi,[[-5.42,1.92,4.98,5.79,.96,true],[-1.16,1.92,4.98,5.79,.96,true],[3.16,2.22,4.9,5.68,1.11,true],[7.86,1.92,4.98,5.79,.96,true]],E,cap);
    strip(W,lo,hi,4.56,.04,.095,.15,'wood','#ad9376');
  });
  const AW=H.alcoveWest,AN=H.alcoveNorth,AS=H.alcoveSouth,AH=4.47;
  W.at(AW,0,0,Math.PI/2,()=>{
    wallWindows(W,-AS,-AN,[[1.40,1.71,.76,2.83,.855],[3.17,1.45,.76,2.95,.725],[4.95,1.71,.76,2.83,.855]],AH);
    wainscot(W,-AS,-AN,.56);
  });
  W.at((AW+L)/2,0,AN,0,()=>{fill(W,(AW-L)/2,(L-AW)/2,0,AH);wainscot(W,(AW-L)/2,(L-AW)/2,.77);});
  W.at((AW+L)/2,0,AS,Math.PI,()=>{fill(W,(AW-L)/2,(L-AW)/2,0,AH);wainscot(W,(AW-L)/2,(L-AW)/2,.77);});
  W.box('paint',(AW+L)/2,AH+.06,(AN+AS)/2,L-AW+.14,.13,AS-AN+.15,'#829085');
  for(const z of [-6.22,-4.63,-3.16,-1.67,-.08])W.box('wood',(AW+L)/2,AH-.04,z,L-AW,.16,.14,'#9f876e');
}
function roof(W){
  const {west:L,east:R,eave:E,ridge:P,north:N,south:S}=H;
  const ang=Math.atan2(P-E,R),len=Math.hypot(P-E,R),depth=S-N+.92;
  for(const s of [-1,1]){
    W.pose(s*R/2,(E+P)/2+.06,(S+N)/2,0,0,-s*ang,()=>{
      W.box('wood',0,.082,0,len+.25,.12,depth,'#765d49');
      for(let i=0;i<54;i++)W.box('wood',0,0,-depth/2+(i+.5)*depth/54,len+.21,.075,depth/54-.012,pick(['#bc9c7d','#b79877','#c0a385','#c8a988','#bda188'],r));
    });
    for(const frac of [.27,.62,.96])W.box('wood',s*R*frac,mix(P,E,frac)-.12,(N+S)/2,.14,.22,depth-.3,'#9c8264');
  }
  W.box('wood',0,P-.08,(N+S)/2,.22,.27,depth-.2,walnut);
  for(const z of [-9.30,-3.55,2.30,8.30]){
    W.box('wood',0,E-.18,z,15.05,.29,.235,'#a78b6c');
    for(const side of [-1,1]){
      W.beam('wood',[side*7.46,E-.25,z],[0,P-.17,z],.22,.25,'#ae9272');
      W.beam('wood',[side*7.40,E-1.27,z],[side*5.82,E-.17,z],.17,.20,'#a78c6d');
      W.beam('wood',[side*3.20,E-.075,z],[side*1.2,P-.58,z],.145,.17,'#a78b6b');
      W.box('wood',side*7.38,E-.72,z,.24,1.43,.265,walnut);
      W.box('stone',side*7.30,E-1.36,z,.37,.19,.38,'#dfd1b5');
      for(const x of [side*5.84,side*3.17]){
        W.box('iron',x,E-.175,z,.094,.307,.249,iron);
        for(const zz of [-1,1])W.rod('iron',[x,E-.163,z+zz*.126],[x,E-.163,z+zz*.14],.029,.026,'#666356',8);
      }
    }
    W.box('wood',0,(P+E)/2-.19,z,.20,P-E+.21,.245,walnut);
    W.box('iron',0,E-.18,z,.35,.15,.257,iron);
    W.turn('wood',0,E-.57,z,[[0,.065],[.08,.14],[.18,.13],[.24,.092]],walnut,12);
  }
}
function deck(W,x0,x1,z0,z1){
  const y=H.gallery;
  W.box('wood',(x0+x1)/2,y-.125,(z0+z1)/2,x1-x0,.22,z1-z0,'#826a55');
  const n=Math.ceil((z1-z0)/.216);
  for(let i=0;i<n;i++)W.box('wood',(x0+x1)/2,y-.016,z0+(i+.5)*(z1-z0)/n,x1-x0-.006,.033,(z1-z0)/n-.006,pick(['#c8ac8c','#d1b798','#c2a386','#d7bb96'],r));
  W.box('wood',x0+.04,y-.155,(z0+z1)/2,.16,.28,z1-z0+.08,walnut);
  W.box('wood',x0+.016,y-.075,(z0+z1)/2,.22,.065,z1-z0+.11,honey);
}
function newel(W,x,y,z){
  W.box('wood',x,y+.49,z,.147,.98,.147,walnut);
  for(const [yy,sz,h] of [[.075,.205,.15],[.17,.182,.055],[.87,.177,.055],[.95,.216,.078],[1.012,.162,.065]])
    W.box('wood',x,y+yy,z,sz,h,sz,yy>.9?honey:walnut);
  W.turn('brass',x,y+1.04,z,[[0,.056],[.025,.067],[.069,.044],[.105,.012]],brass,10);
}
function rail(W,a,b,withFirst=true,withLast=true){
  const [x,y,z]=a,[X,Y,Z]=b,L=Math.hypot(X-x,Z-z),n=Math.ceil(L/.177),dY=Y-y;
  if(withFirst)newel(W,x,y,z);if(withLast)newel(W,X,Y,Z);
  const capA=[x,y+.965,z],capB=[X,Y+.965,Z];
  W.beam('wood',capA,capB,.108,.107,'#b59473');W.beam('iron',[x,y+.862,z],[X,Y+.862,Z],.044,.043,iron);
  W.beam('iron',[x,y+.138,z],[X,Y+.138,Z],.032,.032,iron);
  for(let i=1;i<n;i++){
    const t=i/n,xx=mix(x,X,t),yy=y+dY*t,zz=mix(z,Z,t);
    W.box('iron',xx,yy+.502,zz,.023,.741,.023,iron);
    if(i%2===1){
      W.turn('iron',xx,yy+.44,zz,[[0,.018],[.068,.037],[.14,.016]],'#5a584a',4);
      W.box('brass',xx,yy+.501,zz,.048,.020,.048,'#a18c62');
    }
  }
  // Fixed rails provide physical edge constraints even between the thin balusters.
  if(Math.abs(Y-y)<.01)W.solid((x+X)/2,(z+Z)/2,Math.max(.105,Math.abs(X-x)),Math.max(.105,Math.abs(Z-z)),y-.04,y+1.06,'gallery rail');
}
function gallery(W){
  const {gallery:G,edge:E,east:R,north:N,deckEnd:D,stairLeft:L,stairTop:T,stairBottom:B,landingEnd:F}=H;
  deck(W,E,R,N,D);deck(W,L,E,F,T);
  W.box('wood',E+.095,G-.31,(N+D)/2,.24,.32,D-N,walnut);
  W.box('wood',(R+E)/2,G-.15,D,R-E+.2,.325,.19,walnut);
  for(const z of [-9.99,-6.61,-2.71,1.52,5.48]){
    const x=E+.13;
    W.box('wood',x,(G-.4)/2,z,.22,G-.39,.23,'#a28666');
    W.box('wood',x,.162,z,.33,.325,.34,walnut);
    W.box('wood',x,.345,z,.29,.085,.30,honey);
    W.box('wood',x,G-.61,z,.34,.21,.35,walnut);
    W.box('wood',x,G-.48,z,.395,.11,.41,honey);
    W.box('wood',(R+E)/2,G-.325,z,R-E,.22,.19,'#a98c6d');
    W.beam('wood',[x+.05,G-1.01,z],[x+.70,G-.35,z],.116,.15,walnut);
    if(z<D-.5)W.beam('wood',[x,G-.96,z+.06],[x,G-.34,z+.64],.13,.14,walnut);
    W.solid(x,z,.30,.31,0,G,'gallery post');
  }
  const n=21,dt=(B-T)/n,dh=G/n,w=E-L,c=(E+L)/2;
  for(let i=0;i<n;i++){
    const h=(i+1)*dh,z=B-(i+.5)*dt;
    W.box('wood',c,h/2,z,w,h,dt+.002,i%2?walnut:'#a58a6d');
    W.box('wood',c,h-.025,z+.012,w+.055,.050,dt+.050,'#d5b692');
    W.box('wood',c,h-.058,z+dt/2+.017,w+.042,.026,.052,'#b18f6b');
    W.box('runner',c,h+.004,z,1.58,.009,dt+.009);
    W.panel('runner',c,h-dh/2,z+dt/2+.003,1.58,dh-.009);
    W.rod('brass',[c-.833,h+.023,z-dt/2+.029],[c+.833,h+.023,z-dt/2+.029],.011,.011,brass,8);
    for(const s of [-1,1])W.box('brass',c+s*.824,h+.033,z-dt/2+.028,.036,.061,.035,brass);
  }
  // Raised-panel storage doors are set into the tall, enclosed end of the stair.
  W.at(L-.013,0,0,-Math.PI/2,()=>{
    const end=T+.10,stop=B-.54;
    W.box('wood',(end+stop)/2,.071,.013,stop-end,.142,.056,dark);
    const panelWidth=.73,nPanels=7;
    for(let i=0;i<nPanels;i++){
      const xx=end+panelWidth*(i+.5),ht=G*(B-(xx+panelWidth/2))/(B-T)-.40;
      if(ht<.30)continue;
      W.box('paint',xx,.145+ht/2,.018,panelWidth-.020,ht,.054,'#43554c');
      W.box('paint',xx,.145+ht/2,.049,panelWidth-.134,ht-.116,.023,'#53655a');
      for(const s of [-1,1]){
        W.box('wood',xx+s*(panelWidth/2-.027),.142+ht/2,.056,.045,ht+.023,.047,'#9d8468');
        W.box('wood',xx,.145+ht/2+s*(ht/2-.023),.061,panelWidth-.035,.047,.047,'#a28a6c');
      }
      if(i<4){
        const px=xx+(i%2===0?.245:-.245),py=.145+ht*.54;
        W.box('brass',px,py,.078,.036,.089,.015,'#99875f');
        W.rod('brass',[px,py+.016,.084],[px,py+.016,.114],.012,.016,brass,9);
      }
    }
  });
  for(const x of [L,E]){
    W.beam('wood',[x,.092,B+.015],[x,G+.09,T],.14,.19,walnut);
    W.beam('wood',[x,-.13,B],[x,G-.14,T],.19,.27,'#997e62');
    rail(W,[x,.047,B],[x,G,T]);
  }
  const landingRails=[[L,F,E,F],[L,F,L,T],[E,N+.07,E,F],[E,T,E,-2.22],[E,-2.22,E,1.72],[E,1.72,E,D],[E,D,R-.08,D]];
  landingRails.forEach(([x,z,X,Z],i)=>rail(W,[x,G,z],[X,G,Z],![1,4,5,6].includes(i),true));
}
export function architecture(W){
  W.zone='shell';floor(W);shell(W);roof(W);W.zone='gallery';gallery(W);
}

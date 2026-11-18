import {rng,pick,mix,TAU} from './workshop.js';
const riverZ=x=>-52+6.5*Math.sin(x*.043)+2.2*Math.sin(x*.11+.6);
const smooth=t=>Math.min(1,Math.max(0,t))**2*(3-2*Math.min(1,Math.max(0,t)));
export function hill(x,z){
  const g=t=>Math.exp(-t*t);
  const f=2.2*Math.sin(x*.079+z*.032)+1.5*Math.cos(z*.114-x*.027)+.62*Math.sin(x*.271+z*.089);
  const nearN=(15+7*Math.sin(x*.049+1)+3.7*Math.cos(x*.112))*g((z+83+9*Math.sin(x*.055))/21);
  const farN=(36+12*Math.sin(x*.032)+6*Math.cos(x*.076+1.1))*g((z+155+14*Math.sin(x*.03))/26);
  const nearW=(20+8*Math.cos(z*.048)+3*Math.sin(z*.131))*g((x+84+10*Math.sin(z*.044))/23);
  const farW=(36+10*Math.sin(z*.064))*g((x+166+9*Math.sin(z*.062))/27);
  const east=(21+8*Math.cos(z*.05))*g((x-93+7*Math.cos(z*.072))/25);
  let h=-6.4+f+nearN+farN+nearW+farW+east;
  h=mix(-8.32,h,smooth(Math.abs(z-riverZ(x))/12));
  const radial=Math.hypot(x*.88,z*.95);return mix(-.82,h,smooth((radial-9)/27));
}
function terrain(W){
  const r=rng(8006),N=102,step=4.05,origin=-N*step/2;
  const grid=[];
  for(let j=0;j<=N;j++)for(let i=0;i<=N;i++){
    const x=origin+i*step+(i===0||i===N?0:(r()-.5)*1.36),z=origin+j*step+(j===0||j===N?0:(r()-.5)*1.36),y=hill(x,z);
    const dx=(hill(x+.5,z)-hill(x-.5,z)),dz=(hill(x,z+.5)-hill(x,z-.5)),ll=Math.hypot(dx,1,dz);
    const grain=.5+.5*Math.sin(x*.105+z*.035)*Math.cos(z*.147);
    const color=W.color('#a0ad7d').clone().lerp(W.color('#cac393'),.12+grain*.54).lerp(W.color('#8e9891'),Math.min(.74,Math.max(0,y-3)/38));
    grid.push({p:[x,y,z],n:[-dx/ll,1/ll,-dz/ll],c:color,uv:[x/12,z/12]});
  }
  const make=(a,b,c,field)=>{
    const p=[a,b,c];W.face('ground',p.map(k=>k.p),'#ffffff',p.map(k=>k.uv),p.map(k=>k.n),p.map(k=>k.c.clone().multiplyScalar(field)));
  };
  for(let j=0;j<N;j++)for(let i=0;i<N;i++){
    const k=j*(N+1)+i,a=grid[k],b=grid[k+1],c=grid[k+N+2],d=grid[k+N+1];
    const field=.95+.08*Math.sin(Math.floor(i/4)*2.7+Math.floor(j/3)*3.2);
    make(a,d,c,field);make(a,c,b,field);
  }
  for(let i=-80;i<80;i++){
    const x=i*1.95,X=x+1.95,z=riverZ(x),Z=riverZ(X),y=-8.10;
    W.face('plain',[[x,y,z+1.38],[X,y,Z+1.38],[X,y,Z-1.4],[x,y,z-1.4]],'#779a9a');
    if(i%3===1)W.face('plain',[[x,y+.014,z+.53],[X+.38,y+.014,Z+.54],[X-1.02,y+.014,Z+.41]],'#a8b9b0');
  }
}
function crown(W,x,y,z,rx,ry,rz,c,seed,needle=false){
  const r=rng(seed),n=needle?7:8,layers=needle?[[0,.27],[.22,.85],[.43,1],[.69,.67],[.83,.38],[1,.014]]:[[0,.16],[.17,.74],[.40,1],[.71,.90],[.88,.62],[1,.09]];
  const grid=[];
  for(let j=0;j<layers.length;j++){
    const [hh,rad]=layers[j],ring=[];
    for(let i=0;i<n;i++){
      const a=i*TAU/n+.20*(j%2),f=rad*(.87+r()*.25),cx=Math.cos(a),cz=Math.sin(a);
      const yy=hh+(j===0||j===layers.length-1?0:(r()-.5)*.09);
      const ny=mix(-.39,.96,hh),len=Math.hypot(cx,ny,cz);
      ring.push({p:[x+cx*rx*f+.085*rx*hh,y+yy*ry,z+cz*rz*f],n:[cx/len,ny/len,cz/len],
        c:W.color(c).clone().multiplyScalar(.77+hh*.24+r()*.10)});
    }grid.push(ring);
  }
  for(let j=0;j<grid.length-1;j++)for(let i=0;i<n;i++){
    const ii=(i+1)%n,ps=[grid[j][i],grid[j+1][i],grid[j+1][ii],grid[j][ii]];
    W.face('leaf',ps.map(o=>o.p),c,undefined,ps.map(o=>o.n),ps.map(o=>o.c));
  }
}
function tree(W,x,z,h,kind,r){
  const y=hill(x,z)-.12,c=kind?pick(['#506547','#596d4b','#62764e','#56694b'],r):pick(['#758453','#83915e','#7b8858','#6c8257','#838c5e'],r);
  W.rod('plain',[x,y,z],[x+.024*h,y+h*.64,z],h*.028,h*.018,'#685f49',5);
  const seed=Math.floor(r()*60000);
  if(kind)crown(W,x,y+h*.16,z,h*.137,h*.89,h*.131,c,seed,true);
  else {
    crown(W,x,y+h*.30,z,h*.294,h*.72,h*.273,c,seed);
    if(h>3.5){
      crown(W,x-h*.17,y+h*.32,z+h*.076,h*.192,h*.54,h*.196,c,seed+4);
      crown(W,x+h*.16,y+h*.43,z-h*.054,h*.161,h*.47,h*.180,c,seed+7);
    }
  }
}
function house(W,x,z,angle,w,d,h,roofCol,church=false){
  const y=hill(x,z)-.12;
  W.at(x,y,z,angle,()=>{
    W.box('plaster',0,h*.5-.19,0,w,h+.38,d,church?'#e9dabc':'#d5c7aa');
    const eave=h,top=h+w*.31;
    for(const s of [-1,1]){
      const pts=[[s*(w+.35)/2,eave-.08,-d/2-.20],[0,top,-d/2-.20],[0,top,d/2+.20],[s*(w+.35)/2,eave-.08,d/2+.20]];
      W.face('plain',s===1?pts:pts.reverse(),roofCol);
    }
    for(const s of [-1,1]){
      const pts=[[-w/2,eave,s*d/2],[w/2,eave,s*d/2],[0,top,s*d/2]];
      W.face('plaster',s===1?pts:pts.reverse(),'#e6d8b9');
    }
    W.box('stone',w*.25,top-.08,-d*.23,.28,.91,.31,'#c5baa3');
    for(const a of [-.27,0,.27])W.box('plain',a*w,h*.59,d/2+.012,.29,.47,.035,'#595c50');
    if(church){
      W.box('stone',w*.33,h*.96,d*.28,1.07,4.8,1.05,'#d6c7ad');
      const tx=w*.33,tz=d*.28,ty=h*.96+2.4;
      for(const s of [-1,1]){
        W.box('plain',tx,ty-.52,tz+s*.54,.30,.53,.02,'#565c50');
        W.box('plain',tx+s*.54,ty-.52,tz,.02,.53,.30,'#565c50');
      }
      W.rod('plain',[tx,ty,tz],[tx,ty+1.92,tz],.92,.032,'#737b76',4);
    }
  });
}
function lane(W,path,width,col){
  for(let i=1;i<path.length;i++){
    const [x,z]=path[i-1],[X,Z]=path[i],d=Math.hypot(X-x,Z-z),nx=-(Z-z)/d*width/2,nz=(X-x)/d*width/2;
    const ps=[[x+nx,z+nz],[X+nx,Z+nz],[X-nx,Z-nz],[x-nx,z-nz]].map(([a,b])=>[a,hill(a,b)+.115,b]);
    W.face('ground',ps,col,[[0,0],[1,0],[1,1],[0,1]],ps.map(()=>[0,1,0]));
  }
}
export function landscape(W){
  W.zone='valley';W.cast=false;W.receive=false;terrain(W);const r=rng(7819);
  const groups=[[-27,-24,14,10,15],[-42,-48,12,5,16],[-57,-13,17,11,39],[52,-48,14,14,36],[38,-82,14,11,24],[-67,-79,19,14,42],[-12,-85,20,8,36],[96,-16,10,23,16],[-52,36,10,15,18],[31,25,9,10,10],[3,-109,76,8,38],[-118,-1,11,65,57]];
  for(const [cx,cz,rx,rz,n] of groups)for(let i=0;i<n;i++){
    const x=cx+(r()-.5)*rx*2,z=cz+(r()-.5)*rz*2;
    if(Math.hypot(x,z)<19||Math.abs(z-riverZ(x))<3)continue;
    tree(W,x,z,2.2+r()*3.8,r()>.67,r);
  }
  for(const [x,z,h,k] of [[-13,-18,4.2,0],[-16,-17,5.3,1],[8,-20,6.3,1],[10,-21,5.1,1],[15,-19,4.4,0],[-19,-3.0,4.0,0],[-22,-5.5,4.3,1],[-24,-7,4.7,1],[-21,7,4.9,0]])tree(W,x,z,h,k,r);
  for(let i=0;i<16;i++){
    const x=-21+i*2.7+r()*1.5,z=riverZ(x)+6.8+r()*6.6;
    house(W,x,z,-.35+r()*.79,2.17+r()*1.35,2.9+r()*1.65,1.9+r()*1.18,pick(['#a16e55','#986e58','#7e7e70','#936d5b'],r));
  }
  house(W,4.8,-49,-.27,3.15,5.17,3.12,'#7f827a',true);
  const path=Array.from({length:68},(_,i)=>{const x=-81+i*2.45;return [x,riverZ(x)+12.5+1.5*Math.sin(i*.31)];});
  lane(W,path,1.71,'#e0d3b3');
  // A low terrace and its coping establish the library's position above the valley.
  W.box('stone',-.4,-.66,-13.72,21.9,.55,.40,'#b8b29c');W.box('stone',-.4,-.353,-13.72,22.06,.105,.49,'#d4c8aa');
  W.box('stone',-13.65,-.67,-2.8,.36,.54,14.3,'#bab69e');W.box('stone',-13.65,-.36,-2.8,.46,.11,14.5,'#d5caaf');
  W.cast=true;W.receive=true;
}

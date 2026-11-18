'use strict';
const G = (() => {
  const add=(a,b)=>a.map((v,i)=>v+b[i]), sub=(a,b)=>a.map((v,i)=>v-b[i]);
  const mul=(a,s)=>a.map(v=>v*s), dot=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2];
  const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
  const len=a=>Math.hypot(...a), unit=a=>mul(a,1/(len(a)||1)), mix=(a,b,t)=>add(a,mul(sub(b,a),t));
  const hex=h=>{const k=parseInt(h.replace('#',''),16);return [(k>>16)/255,((k>>8)&255)/255,(k&255)/255]};
  const mat=(h,id=0)=>({color:typeof h==='string'?hex(h):h,id});
  const tint=(m,k)=>({color:m.color.map(x=>Math.min(1,x*k)),id:m.id});
  const groups=new Map();
  let groupName='building', geo;
  function group(name){groupName=name;if(!groups.has(name))groups.set(name,{name,verts:[],indices:[]});geo=groups.get(name)}
  group(groupName);
  const I=[[1,0,0],[0,1,0],[0,0,1],[0,0,0]];
  let xf=I;
  function vector(p,b=xf){return [0,1,2].map(i=>p[0]*b[0][i]+p[1]*b[1][i]+p[2]*b[2][i])}
  const point=p=>add(vector(p),xf[3]);
  function local(x,y,z,o,fn){const old=xf;xf=[vector(x),vector(y),vector(z),point(o)];try{fn()}finally{xf=old}}
  function vertex(p,n,uv,m,f=1){const v=point(p),normal=vector(n);geo.verts.push(...v,...normal,...uv,m.color[0]*f,m.color[1]*f,m.color[2]*f,m.id);return geo.verts.length/12-1}
  function indices(...ii){geo.indices.push(...ii)}
  function quad(a,b,c,d,m,uv,n){n=n||unit(cross(sub(b,a),sub(d,a)));const w=len(sub(b,a)),h=len(sub(d,a));if(!uv){const p=point(a);const u=(p[0]*.71+p[2]*.37+p[1]*.22)%13,v=(p[2]*.61-p[0]*.29+p[1]*.91)%11;uv=[[u,v],[u+w,v],[u+w,v+h],[u,v+h]]}const i=vertex(a,n,uv[0],m);vertex(b,n,uv[1],m);vertex(c,n,uv[2],m);vertex(d,n,uv[3],m);indices(i,i+1,i+2,i,i+2,i+3)}
  function tri(a,b,c,m){const n=unit(cross(sub(b,a),sub(c,a)));const i=vertex(a,n,[0,0],m);vertex(b,n,[len(sub(b,a)),0],m);vertex(c,n,[0,len(sub(c,a))],m);indices(i,i+1,i+2)}
  function box(x,y,z,w,h,d,m){
    const a=x-w/2,b=x+w/2,e=y-h/2,f=y+h/2,k=z-d/2,l=z+d/2;
    quad([a,e,l],[b,e,l],[b,f,l],[a,f,l],m);quad([b,e,k],[a,e,k],[a,f,k],[b,f,k],m);
    quad([b,e,l],[b,e,k],[b,f,k],[b,f,l],m);quad([a,e,k],[a,e,l],[a,f,l],[a,f,k],m);
    quad([a,f,l],[b,f,l],[b,f,k],[a,f,k],m);quad([a,e,k],[b,e,k],[b,e,l],[a,e,l],m)
  }
  function roundedBox(x,y,z,w,h,d,rad,m){
    const center=[x,y,z],half=[w*.5,h*.5,d*.5];rad=Math.min(rad,...half.map(v=>v*.49));const core=half.map(v=>v-rad);
    for(let face=0;face<3;face++)for(const sign of [-1,1]){const u=(face+1)%3,v=(face+2)%3;const us=[-half[u],-core[u],core[u],half[u]],vs=[-half[v],-core[v],core[v],half[v]];const first=geo.verts.length/12;
      for(const vv of vs)for(const uu of us){let p=[0,0,0];p[face]=sign*half[face];p[u]=uu;p[v]=vv;const c=p.map((q,i)=>Math.max(-core[i],Math.min(core[i],q))),n=unit(sub(p,c));vertex(add(center,add(c,mul(n,rad))),n,[uu+x*.31,vv+z*.22],m)}
      for(let j=0;j<3;j++)for(let i=0;i<3;i++){const k=first+j*4+i;if(sign>0)indices(k,k+1,k+5,k,k+5,k+4);else indices(k,k+5,k+1,k,k+4,k+5)}
    }
  }
  function basis(p,q){const v=sub(q,p),l=len(v),y=mul(v,1/(l||1));const x=unit(cross(y,Math.abs(y[2])<.88?[0,0,1]:[1,0,0]));return [x,y,cross(x,y),l]}
  function beam(p,q,w,d,m){const [x,y,z,l]=basis(p,q);local(x,y,z,mix(p,q,.5),()=>box(0,0,0,w,l,d,m))}
  function ibeam(p,q,w,d,m,web=.18){const [x,y,z,l]=basis(p,q);local(x,y,z,mix(p,q,.5),()=>{const t=Math.min(w,d)*.12;box(0,0,0,w*web,l,d,m);box(0,0,-d*.5+t*.5,w,l,t,m);box(0,0,d*.5-t*.5,w,l,t,m)})}
  function cyl(p,q,r,m,sides=16,r2=r,caps=true){
    const [x,y,z,l]=basis(p,q);const i0=geo.verts.length/12;
    for(let i=0;i<=sides;i++){const t=i/sides*Math.PI*2,rad=add(mul(x,Math.cos(t)),mul(z,Math.sin(t)));const n=unit(add(rad,mul(y,(r-r2)/(l||1))));
      vertex(add(p,mul(rad,r)),n,[m.id===8?i/sides*.303:i/sides*2*Math.PI*r,0],m);vertex(add(q,mul(rad,r2)),n,[m.id===8?i/sides*.303:i/sides*2*Math.PI*r,l],m);
      if(i<sides){const a=i0+i*2;indices(a,a+1,a+3,a,a+3,a+2)}
    }
    if(caps){for(let end=0;end<2;end++){const base=end?q:p,radius=end?r2:r,normal=mul(y,end?1:-1);const a=vertex(base,normal,[radius,radius],m);
      for(let i=0;i<=sides;i++){const t=i/sides*Math.PI*2;vertex(add(base,add(mul(x,radius*Math.cos(t)),mul(z,radius*Math.sin(t)))),normal,[radius*(1+Math.cos(t)),radius*(1+Math.sin(t))],m);if(i)end?indices(a,a+i+1,a+i):indices(a,a+i,a+i+1)}
    }}
  }
  function ringX(x,y,z,ri,ro,width,m,sides=72){
    const a=x-width/2,b=x+width/2;
    function p(xx,r,t){return [xx,y+Math.cos(t)*r,z+Math.sin(t)*r]}
    const off=geo.verts.length/12;
    for(let i=0;i<=sides;i++){
      const t=2*Math.PI*i/sides,v=i/sides*Math.PI*2*ro,cy=Math.cos(t),sz=Math.sin(t);
      vertex(p(a,ro,t),[0,cy,sz],[v,0],m);vertex(p(b,ro,t),[0,cy,sz],[v,width],m);
      vertex(p(a,ri,t),[0,-cy,-sz],[v,0],m);vertex(p(b,ri,t),[0,-cy,-sz],[v,width],m);
      vertex(p(a,ri,t),[-1,0,0],[v,0],m);vertex(p(a,ro,t),[-1,0,0],[v,ro-ri],m);
      vertex(p(b,ri,t),[1,0,0],[v,0],m);vertex(p(b,ro,t),[1,0,0],[v,ro-ri],m);
      if(i<sides){let k=off+i*8;for(const [j,h] of [[0,1],[3,2],[4,5],[7,6]])indices(k+j,k+j+8,k+h+8,k+j,k+h+8,k+h)}
    }
  }
  function pipe(points,r,m,n=10){for(let i=1;i<points.length;i++)cyl(points[i-1],points[i],r,m,n,r,false)}
  function pathBeam(points,w,d,m){for(let i=1;i<points.length;i++)beam(points[i-1],points[i],w,d,m)}
  function seeded(seed){return ()=>{seed=(Math.imul(1664525,seed)+1013904223)>>>0;return seed/4294967296}}
  const colliders=[],solid=(x1,z1,x2,z2)=>colliders.push([Math.min(x1,x2),Math.min(z1,z2),Math.max(x1,x2),Math.max(z1,z2)]);
  return {add,sub,mul,dot,cross,len,unit,mix,mat,hex,tint,groups,group,vertex,indices,quad,tri,box,roundedBox,beam,ibeam,cyl,ringX,pipe,pathBeam,local,seeded,colliders,solid};
})();

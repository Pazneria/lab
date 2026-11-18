'use strict';
window.S = (() => {
  const TAU = Math.PI * 2;
  const groups = Object.create(null), obstacles = [], contacts = [];
  const colors = new Map();
  const C = { paint:0, zinc:1, enamel:2, panel:3, wood:4, cloth:5, snow:6, rock:7, ice:8, rubber:9, floor:10, glow:11, label:12, glass:13, far:14, screen:15, steel:16, frost:17, ceramic:18, ribs:19, tread:20 };
  let groupName = 'station', room = 0;
  const I = [1,0,0, 0,1,0, 0,0,1, 0,0,0];
  let frame = I;
  const sub=(a,b)=>[a[0]-b[0],a[1]-b[1],a[2]-b[2]];
  const add=(a,b)=>[a[0]+b[0],a[1]+b[1],a[2]+b[2]];
  const mul=(a,k)=>[a[0]*k,a[1]*k,a[2]*k];
  const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
  function unit(a){let n=Math.hypot(...a)||1;return mul(a,1/n)}
  function rgb(c){
    if(Array.isArray(c))return c;
    if(colors.has(c))return colors.get(c);
    let v=parseInt(c.replace('#',''),16),r=[(v>>16&255)/255,(v>>8&255)/255,(v&255)/255];colors.set(c,r);return r;
  }
  function tint(c,k){return rgb(c).map(a=>Math.min(1,a*k))}
  function mix(a,b,t){a=rgb(a);b=rgb(b);return a.map((v,i)=>v+(b[i]-v)*t)}
  function random(seed){return ()=>{seed|=0;seed=seed+0x6d2b79f5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return ((t^t>>>14)>>>0)/4294967296}}
  function normal(a){return [frame[0]*a[0]+frame[3]*a[1]+frame[6]*a[2],frame[1]*a[0]+frame[4]*a[1]+frame[7]*a[2],frame[2]*a[0]+frame[5]*a[1]+frame[8]*a[2]]}
  function point(a){const v=normal(a);return [v[0]+frame[9],v[1]+frame[10],v[2]+frame[11]]}
  function at(x,y,z,ry,work,rx=0,rz=0){
    const old=frame,p=point([x,y,z]),sy=Math.sin(ry),cy=Math.cos(ry),sx=Math.sin(rx),cx=Math.cos(rx),sz=Math.sin(rz),cz=Math.cos(rz);
    // Y, X, then Z in local coordinates.
    const a=normal([cy*cz+sy*sx*sz,cx*sz,-sy*cz+cy*sx*sz]),b=normal([-cy*sz+sy*sx*cz,cx*cz,sy*sz+cy*sx*cz]),c=normal([sy*cx,-sx,cy*cx]);
    frame=[...a,...b,...c,...p];try{work()}finally{frame=old}
  }
  function group(name,level,work){const n=groupName,r=room;groupName=name;room=level;try{work()}finally{groupName=n;room=r}}
  function data(mat){let name=mat===C.glass?'glass':groupName;return groups[name]||(groups[name]={v:[],i:[]})}
  function vertex(g,p,n,color,uv,mat,ao=1){
    const wp=frame===I?p:point(p),wn=frame===I?n:normal(n),c=rgb(color);
    g.v.push(...wp,...wn,...c,uv[0],uv[1],mat,room,ao);
    return g.v.length/14-1;
  }
  function face(a,b,c,d,col,mat=0,uv=null){
    const g=data(mat),n=unit(cross(sub(b,a),sub(c,a))),p=[a,b,c,d],start=g.v.length/14;
    const u=Math.hypot(...sub(b,a)),v=Math.hypot(...sub(d,a));uv=uv||(mat===C.glass?[[0,0],[1,0],[1,1],[0,1]]:[[0,0],[u,0],[u,v],[0,v]]);
    for(let j=0;j<4;j++)vertex(g,p[j],n,col,uv[j],mat);
    g.i.push(start,start+1,start+2,start,start+2,start+3);
  }
  function tri(a,b,c,col,mat=0){
    const g=data(mat),n=unit(cross(sub(b,a),sub(c,a))),base=g.v.length/14;
    for(const p of [a,b,c])vertex(g,p,n,col,[p[0],p[2]],mat);
    g.i.push(base,base+1,base+2);
  }
  function box(x,y,z,w,h,d,col,mat=0){
    const l=x-w/2,r=x+w/2,b=y-h/2,t=y+h/2,k=z-d/2,f=z+d/2;
    face([l,b,f],[r,b,f],[r,t,f],[l,t,f],col,mat);
    face([r,b,k],[l,b,k],[l,t,k],[r,t,k],col,mat);
    face([r,b,f],[r,b,k],[r,t,k],[r,t,f],col,mat);
    face([l,b,k],[l,b,f],[l,t,f],[l,t,k],col,mat);
    face([l,t,f],[r,t,f],[r,t,k],[l,t,k],col,mat);
    face([l,b,k],[r,b,k],[r,b,f],[l,b,f],col,mat);
  }
  // Extrude a counterclockwise section in the local XY plane.
  function prism(poly,z0,z1,col,mat=0){
    const a=poly.map(p=>[...p,z0]),b=poly.map(p=>[...p,z1]);
    for(let j=1;j<poly.length-1;j++){tri(b[0],b[j],b[j+1],col,mat);tri(a[0],a[j+1],a[j],col,mat)}
    for(let j=0;j<a.length;j++){let k=(j+1)%a.length;face(a[j],a[k],b[k],b[j],col,mat)}
  }
  function rounded(x,y,z,w,h,d,r,col,mat=0){
    r=Math.min(w/2,h/2,r);let poly=[];
    for(let i=0;i<4;i++){
      const sx=[1,-1,-1,1][i],sy=[1,1,-1,-1][i],cx=x+sx*(w/2-r),cy=y+sy*(h/2-r);
      for(let j=0;j<=3;j++){const a=i*Math.PI/2+j*Math.PI/6;poly.push([cx+r*Math.cos(a),cy+r*Math.sin(a)])}
    }
    prism(poly,z-d/2,z+d/2,col,mat);
  }
  function cylinder(a,b,ra,rb,col,mat=0,seg=12,caps=true){
    const up=unit(sub(b,a)),ref=Math.abs(up[1])>.8?[1,0,0]:[0,1,0];
    const u=unit(cross(up,ref)),v=cross(u,up),g=data(mat),l=Math.hypot(...sub(b,a))||1;
    const start=g.v.length/14;
    for(let j=0;j<=seg;j++){
      const t=j/seg*TAU,n=add(mul(u,Math.cos(t)),mul(v,Math.sin(t))),nn=unit(add(n,mul(up,(ra-rb)/l)));
      vertex(g,add(a,mul(n,ra)),nn,col,[j/seg*TAU*ra,0],mat);vertex(g,add(b,mul(n,rb)),nn,col,[j/seg*TAU*ra,l],mat);
    }
    for(let j=0;j<seg;j++){let k=start+j*2;g.i.push(k,k+1,k+2,k+1,k+3,k+2)}
    if(caps){for(let side=0;side<2;side++){
      const base=side?b:a,n=mul(up,side?1:-1),r=side?rb:ra;
      const s=vertex(g,base,n,col,[.5,.5],mat);
      for(let j=0;j<seg;j++){let t=j/seg*TAU,off=add(mul(u,r*Math.cos(t)),mul(v,r*Math.sin(t)));vertex(g,add(base,off),n,col,[off[0],off[2]],mat)}
      for(let j=0;j<seg;j++){let p=s+1+j,q=s+1+(j+1)%seg;if(side)g.i.push(s,q,p);else g.i.push(s,p,q)}
    }}
  }
  function cyl(x,y,z,r,h,col,mat=0,n=16){cylinder([x,y-h/2,z],[x,y+h/2,z],r,r,col,mat,n)}
  function tube(points,r,col,mat=1,n=8){for(let i=1;i<points.length;i++)cylinder(points[i-1],points[i],r,r,col,mat,n)}
  function ball(x,y,z,rx,ry,rz,col,mat=0,seg=14,rings=8){
    const g=data(mat),s=g.v.length/14;
    for(let j=0;j<=rings;j++){
      const el=Math.PI*j/rings,si=Math.sin(el),co=Math.cos(el);
      for(let i=0;i<=seg;i++){const an=TAU*i/seg,dx=si*Math.cos(an),dz=si*Math.sin(an);
        vertex(g,[x+rx*dx,y+ry*co,z+rz*dz],unit([dx/rx,co/ry,dz/rz]),col,[i/seg*TAU*rx,j/rings*Math.PI*ry],mat);
      }
    }
    for(let j=0;j<rings;j++)for(let i=0;i<seg;i++){const a=s+j*(seg+1)+i,b=a+seg+1;g.i.push(a,a+1,b,b,a+1,b+1)}
  }
  function decal(key,x,y,z,w,h,yaw=0,rx=0,emissive=false){
    const uv=S.atlasRects[key];if(!uv)throw Error('Missing atlas tile '+key);
    const [l,t,r,b]=uv;
    at(x,y,z,yaw,()=>face([-w/2,-h/2,0],[w/2,-h/2,0],[w/2,h/2,0],[-w/2,h/2,0],'ffffff',emissive?15:12,[[l,b],[r,b],[r,t],[l,t]]),rx);
  }
  function block(x,z,w,d,round=false){obstacles.push({x,z,w:w/2,d:d/2,round})}
  function contact(x,z,rx,rz,p=.35,inside=false){contacts.push({x,z,rx,rz,p,inside})}
  function smooth(a,b,x){const t=Math.min(1,Math.max(0,(x-a)/(b-a)));return t*t*(3-2*t)}
  return {C,TAU,groups,obstacles,contacts,rgb,tint,mix,random,sub,add,mul,cross,unit,point,at,group,data,vertex,face,tri,box,prism,rounded,cylinder,cyl,tube,ball,decal,block,contact,smooth};
})();


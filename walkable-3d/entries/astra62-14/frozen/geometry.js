'use strict';
const G = (() => {
  const PI = Math.PI, TAU = PI*2;
  let state = 182711;
  function rand(a=0,b=1) { state=(Math.imul(state,1664525)+1013904223)>>>0; return a+(b-a)*(state/4294967296); }
  const pick = a=>a[Math.floor(rand(0,a.length))];
  const rgb = s => { if(Array.isArray(s))return s; const v=parseInt(s.replace('#',''),16); return [(v>>16&255)/255,(v>>8&255)/255,(v&255)/255]; };
  const shade = (c,f)=>rgb(c).map(v=>Math.min(1,Math.max(0,v*f)));
  const blend = (a,b,t)=>rgb(a).map((v,i)=>v*(1-t)+rgb(b)[i]*t);
  const add=(a,b)=>a.map((v,i)=>v+b[i]), sub=(a,b)=>a.map((v,i)=>v-b[i]), mul=(a,s)=>a.map(v=>v*s);
  const dot=(a,b)=>a.reduce((s,v,i)=>s+v*b[i],0);
  const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
  const unit=a=>mul(a,1/(Math.hypot(...a)||1));
  const M = {plain:0,wood:1,plaster:2,stone:3,brick:4,clay:5,satin:6,gloss:7,iron:8,cloth:9,leaf:10,sign:11,glass:12,shadow:13,paper:14,paint:15,gravel:16};
  const groups=new Map(), blocks=[],signs=[];
  let zone='studio', trans={p:[0,0,0],x:[1,0,0],y:[0,1,0],z:[0,0,1]};
  function dir(v){return [0,1,2].map(i=>trans.x[i]*v[0]+trans.y[i]*v[1]+trans.z[i]*v[2]);}
  function pos(p){return add(trans.p,dir(p));}
  function basis(p,x,y,z,fn){
    const previous=trans; trans={p:pos(p),x:dir(x),y:dir(y),z:dir(z)};
    try { fn(); } finally { trans=previous; }
  }
  function at(x,y,z,a,fn){const c=Math.cos(a),s=Math.sin(a);basis([x,y,z],[c,0,-s],[0,1,0],[s,0,c],fn);}
  function area(s,fn){let prev=zone;zone=s;try{fn();}finally{zone=prev;}}
  function group(m){
    const pass=m===M.glass?'glass':m===M.shadow?'shade':m===M.sign?'sign':'solid';
    const k=zone+'-'+pass;
    if(!groups.has(k))groups.set(k,{name:k,pass,vs:[],ix:[],min:[1e4,1e4,1e4],max:[-1e4,-1e4,-1e4]});
    return groups.get(k);
  }
  const stride=13;
  function vertex(g,p,n,c,u,v,m,pat=0){
    const wp=pos(p),wn=dir(n),id=g.vs.length/stride;
    for(let i=0;i<3;i++){g.min[i]=Math.min(g.min[i],wp[i]);g.max[i]=Math.max(g.max[i],wp[i]);}
    g.vs.push(...wp,...wn,...rgb(c),u,v,m,pat); return id;
  }
  function face(pts,c,m,n=null,uv=null,pat=0){
    const g=group(m); const calc=unit(cross(sub(pts[1],pts[0]),sub(pts[2],pts[0])));n=n||calc;
    const flip=dot(n,calc)<0,first=g.vs.length/stride;
    for(let i=0;i<pts.length;i++){const q=uv?uv[i]:[dot(pts[i],unit(sub(pts[1],pts[0]))),dot(pts[i],unit(cross(n,sub(pts[1],pts[0]))))];vertex(g,pts[i],n,c,q[0],q[1],m,pat);}
    for(let i=1;i<pts.length-1;i++)g.ix.push(first,first+(flip?i+1:i),first+(flip?i:i+1));
  }
  function box(x,y,z,w,h,d,c,m=M.wood,b=0){
    const center=[x,y,z],half=[w/2,h/2,d/2],pad=Math.min(b,w*.23,h*.23,d*.23);
    const axisUV=(pts,axes)=>{const [a,b]=axes.sort((i,j)=>half[j]-half[i]);return pts.map(p=>[p[a]+x*.97+z*.33,p[b]+x*.11+y*.61]);};
    for(let a=0;a<3;a++)for(const s of [-1,1]){
      const b=(a+1)%3,k=(a+2)%3,verts=[];
      for(const [sb,sk] of [[-1,-1],[1,-1],[1,1],[-1,1]]){const p=center.slice();p[a]+=half[a]*s;p[b]+=(half[b]-pad)*sb;p[k]+=(half[k]-pad)*sk;verts.push(p);}
      const n=[0,0,0];n[a]=s;face(verts,c,m,n,axisUV(verts,[b,k]));
    }
    if(!pad)return;
    // Chamfer long edges and trim each three-way corner.
    for(let a=0;a<3;a++)for(const s of [-1,1])for(const t of [-1,1]){
      const b=(a+1)%3,k=(a+2)%3,pts=[];
      for(const [end,side] of [[-1,0],[1,0],[1,1],[-1,1]]){
        const p=center.slice();p[a]+=end*(half[a]-pad);p[b]+=s*(half[b]-(side?pad:0));p[k]+=t*(half[k]-(side?0:pad));pts.push(p);
      }
      const n=[0,0,0];n[b]=s*.7071;n[k]=t*.7071;face(pts,c,m,n,axisUV(pts,[a,b]));
    }
    for(const a of [-1,1])for(const b of [-1,1])for(const k of [-1,1]){
      const signs=[a,b,k],pts=[0,1,2].map(i=>center.map((v,j)=>v+signs[j]*(half[j]-(j===i?0:pad))));
      face(pts,c,m,unit(signs));
    }
  }
  function align(a,b,fn){
    const up=unit(sub(b,a)),side=unit(cross(up,Math.abs(up[2])>.96?[1,0,0]:[0,0,1])),back=cross(side,up);
    basis(mul(add(a,b),.5),side,up,back,()=>fn(Math.hypot(...sub(b,a))));
  }
  function beam(a,b,w,d,c,m=M.wood,ch=0){align(a,b,h=>box(0,0,0,w,h,d,c,m,ch));}
  function cyl(x,y,z,rt,rb,h,c,m=M.wood,n=20){
    const g=group(m),first=g.vs.length/stride, slope=(rb-rt)/h;
    const top=[],bot=[];
    for(let j=0;j<=n;j++){const a=TAU*j/n,cs=Math.cos(a),sn=Math.sin(a),nm=unit([cs,slope,sn]);
      const p0=[x+rb*cs,y-h/2,z+rb*sn],p1=[x+rt*cs,y+h/2,z+rt*sn];
      vertex(g,p0,nm,c,j/n*TAU*(rb+rt)/2,0,m);vertex(g,p1,nm,c,j/n*TAU*(rb+rt)/2,h,m);
      if(j<n){bot.push(p0);top.push(p1);const i=first+j*2;g.ix.push(i,i+1,i+2,i+2,i+1,i+3);}
    }
    if(rt>0)face(top,c,m,[0,1,0],top.map(p=>[p[0],p[2]]));if(rb>0)face(bot,c,m,[0,-1,0],bot.map(p=>[p[0],p[2]]));
  }
  function rod(a,b,r,c,m=M.iron,n=10,r2=r){align(a,b,h=>cyl(0,0,0,r2,r,h,c,m,n));}
  function tube(path,r,c,m=M.iron,sides=8){
    const g=group(m),start=g.vs.length/stride;let prev=null;
    for(let i=0;i<path.length;i++){
      const p=path[i],t=unit(sub(path[Math.min(i+1,path.length-1)],path[Math.max(i-1,0)]));
      let u=prev?unit(sub(prev,mul(t,dot(t,prev)))):unit(cross(t,Math.abs(t[1])>.9?[1,0,0]:[0,1,0]));
      if(Math.hypot(...u)<.5)u=unit(cross(t,[0,0,1])); const v=cross(t,u);prev=u; const rad=typeof r==='function'?r(i/(path.length-1)):r;
      for(let j=0;j<=sides;j++){const a=TAU*j/sides,n=add(mul(u,Math.cos(a)),mul(v,Math.sin(a)));
        vertex(g,add(p,mul(n,rad)),n,c,j/sides,i*.07,m);
        if(i<path.length-1&&j<sides){const k=start+i*(sides+1)+j;g.ix.push(k,k+1,k+sides+1,k+1,k+sides+2,k+sides+1);}
      }
    }
  }
  function ring(x,y,z,r,th,c,m=M.iron,n=32){const path=[];for(let i=0;i<=n;i++){const a=TAU*i/n;path.push([x+Math.cos(a)*r,y,z+Math.sin(a)*r]);}tube(path,th,c,m,6);}
  function blob(x,y,z,rx,ry,rz,c,m=M.stone,noise=.06,n=12){
    const g=group(m),start=g.vs.length/stride,phase=rand(0,TAU),rows=Math.max(6,n>>1);
    for(let i=0;i<=rows;i++)for(let j=0;j<=n;j++){
      const a=TAU*j/n,b=PI*i/rows,q=[Math.sin(b)*Math.cos(a),-Math.cos(b),Math.sin(b)*Math.sin(a)],s=1+noise*Math.sin(3*a+phase)*Math.sin(b)**2+noise*.5*Math.sin(4*b+phase);
      vertex(g,[x+rx*q[0]*s,y+ry*q[1]*s,z+rz*q[2]*s],unit([q[0]/rx,q[1]/ry,q[2]/rz]),c,j/n,i/rows,m);
      if(i<rows&&j<n){const k=start+i*(n+1)+j;g.ix.push(k,k+n+1,k+1,k+1,k+n+1,k+n+2);}
    }
  }
  function contact(x,y,z,rx,rz,opacity=.3){
    const pts=[[-1,-1],[1,-1],[1,1],[-1,1]];face(pts.map(([a,b])=>[x+a*rx,y+.0015,z+b*rz]),[.14,.105,.075],M.shadow,[0,1,0],pts,opacity);
  }
  function collider(x,z,w,d){const p=pos([x,0,z]),vx=dir([w/2,0,0]),vz=dir([0,0,d/2]);const hx=Math.abs(vx[0])+Math.abs(vz[0]),hz=Math.abs(vx[2])+Math.abs(vz[2]);blocks.push([p[0]-hx,p[2]-hz,p[0]+hx,p[2]+hz]);}
  function sign(x,y,z,w,h,theme,lines,opts={}){
    let id=signs.findIndex(e=>e.theme===theme&&e.lines.join('|')===lines.join('|')&&e.layout===(opts.layout||'center'));
    if(id<0){id=signs.length;signs.push({theme,lines,layout:opts.layout||'center',aspect:w/h});}
    const pts=[[x-w/2,y-h/2,z],[x+w/2,y-h/2,z],[x+w/2,y+h/2,z],[x-w/2,y+h/2,z]];
    face(pts,'ffffff',M.sign,[0,0,1],[[0,1],[1,1],[1,0],[0,0]],id);
  }
  return {PI,TAU,rand,pick,rgb,shade,blend,add,sub,mul,dot,cross,unit,M,groups,blocks,signs,stride,vertex,group,face,box,at,basis,area,pos,beam,cyl,rod,tube,ring,blob,contact,collider,sign};
})();

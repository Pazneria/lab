'use strict';
(() => {
  const {TAU,mix,random,smooth}=S,rng=random(15502);
  const hash=(x,z)=>{let n=Math.imul(x,374761393)+Math.imul(z,668265263)|0;n=Math.imul(n^(n>>>13),1274126177);return ((n^(n>>>16))>>>0)/4294967296};
  function noise(x,z){
    const a=Math.floor(x),b=Math.floor(z),u=x-a,v=z-b,t=u*u*(3-2*u),s=v*v*(3-2*v);
    const p=hash(a,b),q=hash(a+1,b),r=hash(a,b+1),d=hash(a+1,b+1);return p+(q-p)*t+(r-p)*s+(p-q-r+d)*t*s;
  }
  const drifts=[],cells=new Map();
  function drift(x,z,len,w,h,bend,angle){
    const d={x,z,len,w,h,bend,co:Math.cos(angle),si:Math.sin(angle)};drifts.push(d);
    const rad=len+w+Math.abs(bend);for(let iz=Math.floor((z-rad)/4);iz<=Math.floor((z+rad)/4);iz++)for(let ix=Math.floor((x-rad)/4);ix<=Math.floor((x+rad)/4);ix++){let k=ix+','+iz;if(!cells.has(k))cells.set(k,[]);cells.get(k).push(d)}
  }
  for(let i=0;i<286;i++)drift((rng()-.5)*49,(rng()-.5)*43,1+rng()*4,.15+rng()*.77,.035+rng()**2*.26,(rng()-.5)*.56,-.18+(rng()-.5)*.29);
  drift(-4.66,.78,4.2,.97,.57,.3,-.8);
  drift(4.85,-1.9,3.7,1.3,.56,.26,-1.5);
  drift(-3.48,2.08,2.1,.72,.44,.25,-.07);
  drift(2.7,1.98,2.9,1.04,.53,.15,-.16);
  drift(1.26,3.38,2.4,.84,.42,.23,-.65);
  drift(-6.38,5.4,3.3,.97,.65,.32,-1.2);
  const path=z=>-.78+smooth(5.5,14,z)*5.9;
  // Shallow refrozen runoff collects at the leeward drip edge.
  const pools=[[2.92,3.11,1.05,.42,-.24],[3.87,2.88,.62,.33,-.31],[-2.75,4.67,.62,.27,.37],[7.54,-2.51,.86,.41,-.56],[3.75,5.76,.89,.32,-.19]];
  function iceCover(x,z){
    let cover=0;
    for(let [cx,cz,rx,rz,angle] of pools){
      let dx=x-cx,dz=z-cz;
      if(Math.abs(dx)>rx+rz||Math.abs(dz)>rx+rz)continue;
      let u=(dx*Math.cos(angle)+dz*Math.sin(angle))/rx,v=(dz*Math.cos(angle)-dx*Math.sin(angle))/rz;
      let rag=.33*(noise(x*4.2,z*4.2)-.51)+.19*Math.sin(x*6.3+z*4.9);
      cover=Math.max(cover,1-smooth(.61,1.08,u*u+v*v+rag));
    }
    return cover;
  }
  S.iceCover=iceCover;S.icePools=pools;
  function height(x,z){
    const close=Math.min(1,Math.max(0,(Math.max(Math.abs(x),Math.abs(z))-19)/11));
    let h=.078+(noise(x*.19+5,z*.22)-.49)*.29+(noise(x*.55,z*.63)-.5)*.095;
    h+=.021*Math.sin(z*4.8+x*.77+noise(x*.40,z*.32)*4)*(.2+noise(x*.36,z*.61));
    if(close<1){
      const ds=cells.get(Math.floor(x/4)+','+Math.floor(z/4))||[];
      for(let i=0;i<ds.length;i++){const d=ds[i],dx=x-d.x,dz=z-d.z,u=(dx*d.co+dz*d.si)/d.len;
        if(Math.abs(u)>=1)continue;
        let v=(-dx*d.si+dz*d.co-d.bend*(1-u*u))/d.w;
        v=v<0?v*1.58:v*.88;if(Math.abs(v)>=1)continue;
        let shape=(1-u*u)**1.38*(1-Math.abs(v))**1.37;
        h+=d.h*shape*(1-close);
      }
    }
    const trail=(1-smooth(.38,1.44,Math.abs(x-path(z))))*smooth(4.2,6.05,z)*(1-smooth(13,17,z));
    h=h*(1-trail*.82)+.062*trail*.82;
    const pad=(1-smooth(1.29,2.0,Math.abs(x+.77)))*(1-smooth(1.4,2.0,Math.abs(z-5.2)));
    h=h*(1-pad)+.075*pad;
    const glaze=iceCover(x,z);h=h*(1-.78*glaze)+.054*glaze;
    return h+.87*close*(noise(x*.087,z*.084)-.38);
  }
  S.height=height;S.noise=noise;
  S.footprints=[];
  function track(centers){
    centers.forEach((p,i)=>{let prev=centers[Math.max(0,i-1)],next=centers[Math.min(centers.length-1,i+1)],a=Math.atan2(next[0]-prev[0],next[1]-prev[1]),s=i%2?-.125:.125;
      S.footprints.push([p[0]+Math.cos(a)*s,p[1]-Math.sin(a)*s,a+(rng()-.5)*.23,i%2,rng()*.22+.58]);
    });
  }
  track(Array.from({length:24},(_,i)=>{let z=6.1+i*.43;return [path(z)+.11*Math.sin(i*.5),z]}));
  track(Array.from({length:20},(_,i)=>{let u=i/19;return [-.76-5.4*Math.sin(u*1.66),6.38-5.94*u+1.2*Math.sin(u*3.6)]}));
  function snowfield(){
    const g=S.data(6),nn=244,sz=nn+1,sx=[],zz=[],heights=new Float32Array(sz*sz);
    function coord(i){const a=(i-nn/2)*.177;let v=Math.max(0,Math.abs(a)-17);return a+Math.sign(a)*v*v*5.45}
    for(let i=0;i<sz;i++){sx.push(coord(i));zz.push(coord(i))}
    for(let j=0;j<sz;j++)for(let i=0;i<sz;i++)heights[i+j*sz]=height(sx[i],zz[j]);
    const base=g.v.length/14;
    for(let j=0;j<sz;j++)for(let i=0;i<sz;i++){
      const l=Math.max(0,i-1),r=Math.min(nn,i+1),b=Math.max(0,j-1),f=Math.min(nn,j+1);
      const x=sx[i],z=zz[j],y=heights[i+j*sz],nx=(heights[l+j*sz]-heights[r+j*sz])/(sx[r]-sx[l]),nz=(heights[i+b*sz]-heights[i+f*sz])/(zz[f]-zz[b]);
      const c=mix('bfcee0','e4e9ed',.13+.70*noise(x*.37+1,z*.52)+.14*smooth(-.02,.48,y));
      S.vertex(g,[x,y,z],S.unit([nx,1,nz]),c,[x,z],6);
    }
    g.ranges=[];
    for(let tz=0;tz<4;tz++)for(let tx=0;tx<4;tx++){
      let i0=Math.floor(tx*nn/4),i1=Math.floor((tx+1)*nn/4),j0=Math.floor(tz*nn/4),j1=Math.floor((tz+1)*nn/4),start=g.i.length;
      for(let j=j0;j<j1;j++)for(let i=i0;i<i1;i++){const a=base+j*sz+i;g.i.push(a,a+sz,a+1,a+1,a+sz,a+sz+1)}
      g.ranges.push({start,count:g.i.length-start,b:[sx[i0],-1,zz[j0],sx[i1],1.6,zz[j1]]});
    }
  }
  function mountains(layer){
    const ra=random(774+layer*54),N=426,rows=16,peaks=[],grid=[];
    const radius=layer?112:76;
    for(let i=0;i<(layer?26:18);i++)peaks.push([i/(layer?26:18)*TAU+ra()*.16,.055+ra()*.18,(layer?16:6)+ra()*(layer?32:17)]);
    for(let j=0;j<=rows;j++){
      let row=[],t=j/rows;
      for(let i=0;i<N;i++){
        let a=i/N*TAU,cs=Math.cos(a),sn=Math.sin(a),n1=noise(cs*4+21,sn*4+6),n2=noise(cs*15+5,sn*15+4);
        let ridge=.54+.13*Math.sin(a*4+1)+.10*n2,r=radius+44*t+n1*12,peak=0;
        for(let p of peaks){let dif=Math.abs(Math.atan2(Math.sin(a-p[0]),Math.cos(a-p[0])));peak=Math.max(peak,p[2]*Math.exp(-((dif/p[1])**2)*.64))}
        let profile=t<ridge?(t/ridge)**1.15:Math.max(0,1-(t-ridge)/(1-ridge))**.73;
        let x=cs*r,z=sn*r,spur=noise(x*.095,z*.11)+.45*noise(x*.21,z*.23);
        let y=-1.2+profile*(peak*(.62+.27*n2+.18*n1)+(spur-.60)*8)+Math.sin(t*7+a*28)*profile*1.2;
        row.push([x,y,z]);
      }grid.push(row);
    }
    function patch(a,b,c){
      let n=S.unit(S.cross(S.sub(b,a),S.sub(c,a)));if(n[1]<0){let h=b;b=c;c=h;n=S.mul(n,-1)}
      const x=(a[0]+b[0]+c[0])/3,z=(a[2]+b[2]+c[2])/3,h=(a[1]+b[1]+c[1])/3;
      const streak=noise(x*.23+h*.22,z*.16)*.24+Math.sin(h*1.66+x*.23-z*.33)*.039;
      const cover=smooth(.62,.90,n[1]+streak-.115+.09*n[0]);
      const rock=mix(layer?'566b8a':'4c6380',layer?'8194ac':'788ba0',noise(x*.14,z*.14));
      let col=mix(rock,layer?'b9c9dc':'c1cedd',cover);S.tri(a,b,c,col,14);
    }
    const geom=S.data(14);if(!geom.ranges)geom.ranges=[];
    for(let s=0;s<8;s++){
      let start=geom.i.length,min=[Infinity,Infinity,Infinity],max=[-Infinity,-Infinity,-Infinity];
      for(let j=0;j<rows;j++)for(let i=Math.floor(s*N/8);i<Math.floor((s+1)*N/8);i++){
        let k=(i+1)%N,a=grid[j][i],b=grid[j][k],c=grid[j+1][k],d=grid[j+1][i];
        for(let p of [a,b,c,d])for(let ax=0;ax<3;ax++){min[ax]=Math.min(min[ax],p[ax]);max[ax]=Math.max(max[ax],p[ax])}
        patch(a,b,c);patch(a,c,d);
      }
      geom.ranges.push({start,count:geom.i.length-start,b:[...min,...max]});
    }
  }
  function boulder(x,z,rx,h,rz,icy=false){
    const bottom=height(x,z)-h*.36,N=9,ring=[],mid=[],top=[];
    for(let i=0;i<N;i++){let a=i/N*TAU,k=.76+rng()*.39,dx=Math.cos(a)*rx*k,dz=Math.sin(a)*rz*k;
      ring.push([x+dx,bottom,z+dz]);mid.push([x+dx*.89,bottom+h*(.49+.17*rng()),z+dz*.9]);top.push([x+dx*.57+.05*rx,bottom+h*(.83+.2*rng()),z+dz*.54])}
    for(let i=0;i<N;i++){let k=(i+1)%N;
      S.face(ring[k],ring[i],mid[i],mid[k],mix(icy?'729aaf':'56616b',icy?'bdd7dc':'8c8f8e',rng()),icy?8:7);
      S.face(mid[k],mid[i],top[i],top[k],mix(icy?'9ebdcb':'858e97','c5d4de',rng()*.69),icy?8:7);
      S.tri(top[k],top[i],[x,bottom+h*1.035,z],mix('c2d1dc','e1e7e9',rng()*.71),6);
    }
    S.contact(x,z,rx*1.42,rz*1.42,.23);
  }
  function surroundings(){
    for(let [cx,cz,rx,n,icy] of [[9.9,3.9,1,12,false],[-8.2,6,1.15,14,false],[5.5,-9,1.6,11,true],[-11,-5,1.4,16,true],[3.6,14,.78,10,true],[15,-8,2.5,12,true]]){
      for(let i=0;i<n;i++){
        const s=(.15+rng()**2*.9)*rx,x=cx+(rng()-.5)*rx*3.9,z=cz+(rng()-.5)*rx*2.3,h=s*(icy?.35:.46);
        boulder(x,z,s,h,s*(.43+rng()*.36),icy);if(s>1)S.block(x,z,s*1.45,s*.8,true);
      }
    }
    // A half-buried slatted windbreak on the windward side of the apron.
    S.at(-6.10,.06,4.85,1.17,()=>{
      for(let k=0;k<3;k++){
        let xx=(k-1)*1.76;S.box(xx,.56,0,.084,1.27,.085,'777568',4);S.box(xx,.98,.045,.105,.12,.025,'a4a69b',1);
      }
      for(let j=0;j<20;j++){let x=-1.76+j*3.52/19,h=.8+.12*Math.sin(j*.72);
        S.box(x,.12+h/2,.06,.11,h,.032,mix('8c8370','b3ac96',rng()),4);
        S.box(x,.12+h+.014,.06,.112,.028,.041,'becdd5',6);
      }
      for(let y of [.34,.73])S.tube([[-1.87,y,.09],[0,y-.017,.096],[1.88,y,.09]],.009,'606a67',1,6);
    });
    for(let i=-3;i<=3;i++)S.block(-6.1+Math.cos(1.17)*i*.52,4.85-Math.sin(1.17)*i*.52,.37,.53);
    for(let [x,z] of [[7.8,-4.4],[-7.7,-3.7],[-2.1,-10.4]]){
      let y=height(x,z);S.cyl(x,y+.9,z,.025,1.9,'d5c9a8',0,8);
      for(let j=0;j<6;j++)S.cyl(x,y+.69+j*.18,z,.026,.087,'c06742',0,8);
      S.ball(x,y+1.89,z,.037,.037,.037,'ce8352',2,9,5);
    }
  }
  S.landscape=()=>{S.group('horizon',0,()=>{mountains(1);mountains(0)});S.group('snow',0,snowfield);S.group('station',0,surroundings)};
})();

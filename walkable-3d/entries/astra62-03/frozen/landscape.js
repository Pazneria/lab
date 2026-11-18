import {TAU,PI,UP,rad,radial,unit,cross,sub,add,mul,mix,randomSource} from './geometry.js';
const rn=randomSource(932345);
const h=(a,b,seed)=>{const n=Math.sin(a*127.1+b*313.7+seed*113.4)*43758.5453;return n-Math.floor(n)};
function noise(x,z,s=1){
  const i=Math.floor(x),j=Math.floor(z),u=x-i,v=z-j,p=u*u*(3-2*u),q=v*v*(3-2*v);
  return mix(mix(h(i,j,s),h(i+1,j,s),p),mix(h(i,j+1,s),h(i+1,j+1,s),p),q);
}
function sandHeight(x,z){
  const warp=noise(x/65,z/65,3),v=x*.069+z*.043+warp*3.4+Math.sin(z*.038)*.86;
  const wave=Math.sin(v+.68*Math.sin(v+.34));
  return -15.2+3.48*wave+1.07*Math.sin(x*.098-z*.028+warp*5.6)+3.6*(noise(x/48,z/48,6)-.5);
}
function dunes(g,formations){
  // Distant land is outside the house's high-resolution shadow atlas.
  // Bake the mesas' lee shadows into the dunes using the same sun azimuth.
  const shapes=[...formations,[0,.25,11.1,18.4,17.65,0]].map(([x,z,rx,rz,height,angle])=>({
    x,z,rx:rx*.85,rz:rz*.85,top:-18+height,cs:Math.cos(angle),sn:Math.sin(angle)
  }));
  function shelter(x,z,y){
    let shade=0;
    for(const m of shapes){
      const rise=m.top-y;if(rise<=0)continue;
      const dx=x-m.x,dz=z-m.z;
      if(Math.abs(dx)>m.rx+m.rz+rise*1.4 || Math.abs(dz)>m.rx+m.rz+rise*1.4)continue;
      const ax=(m.cs*dx-m.sn*dz)/m.rx,az=(m.sn*dx+m.cs*dz)/m.rz;
      const vx=(-.523*m.cs+.673*m.sn)*rise/(.571*m.rx),vz=(-.523*m.sn-.673*m.cs)*rise/(.571*m.rz);
      const t=Math.max(0,Math.min(1,-(ax*vx+az*vz)/(vx*vx+vz*vz+.00001)));
      const dist=((Math.abs(ax+t*vx))**2.65+(Math.abs(az+t*vz))**2.65)**(1/2.65);
      shade=Math.max(shade,Math.max(0,Math.min(1,(1.09-dist)*5.4)));
    }
    return 1-shade*.35;
  }
  const N=104,span=235,verts=[];
  for(let j=0;j<=N;j++){
    const row=[];
    for(let i=0;i<=N;i++){
      const x=(i/N*2-1)*span,z=(j/N*2-1)*span,y=sandHeight(x,z);
      const normal=unit([sandHeight(x-.9,z)-sandHeight(x+.9,z),1.8,sandHeight(x,z-.9)-sandHeight(x,z+.9)]);
      row.push({p:[x,y,z],n:normal,t:(.86+.19*noise(x/32,z/32,2)+.055*noise(x/8,z/8,8))*shelter(x,z,y)});
    }
    verts.push(row);
  }
  for(let j=0;j<N;j++)for(let i=0;i<N;i++){
    const a=[verts[j][i],verts[j+1][i],verts[j+1][i+1],verts[j][i+1]];
    g.face('dune',a.map(v=>v.p),UP,{ns:a.map(v=>v.n),tones:a.map(v=>v.t)});
  }
}
function mesa(g,cx,cz,rx,rz,base,height,angle,seed,distant=false){
  const rand=randomSource(seed),N=distant?21:35;
  const A=[],radii=[],elevation=[],edge=[];
  const phases=[rand()*TAU,rand()*TAU,rand()*TAU];
  for(let i=0;i<N;i++){
    const a=TAU*(i+(rand()-.5)*.30)/N;
    A.push(a);radii.push(.97+.088*Math.sin(3*a+phases[0])+.076*Math.sin(5*a+phases[1])+.06*rand());
    elevation.push(.035*Math.sin(a+phases[2])+.024*rand());edge.push(rand());
  }
  // Talus, undercut beds and a gently sloping caprock.
  const layers=[[0,1.37],[.16,1.17],[.30,1.02],[.35,.985],[.37,.995],[.52,.864],[.553,.875],[.57,.851],[.75,.806],[.77,.824],[.815,.818],[.90,.782],[.925,.811],[1,.785]];
  const rim=[],mat=distant?'horizon':'rock';
  g.at(cx,base,cz,angle,()=>{
    for(let j=0;j<layers.length;j++){
      const [y,r]=layers[j],p=[];
      for(let i=0;i<N;i++){
        const a=A[i],f=r*radii[i]+(edge[i]-.5)*.056*Math.sin(j*.47);
        // Superellipse corners give the towers true table-shaped shoulders.
        const ex=Math.sin(a),ez=Math.cos(a),power=.74;
        p.push([rx*f*Math.sign(ex)*Math.pow(Math.abs(ex),power),height*(y+elevation[i]*Math.min(1,y*5)),rz*f*Math.sign(ez)*Math.pow(Math.abs(ez),power)]);
      }
      rim.push(p);
    }
    for(let j=0;j<rim.length-1;j++){
      for(let i=0;i<N;i++){
        const k=(i+1)%N,sh=(j===4||j===8||j===11)?.87:1;
        const t=sh*(.91+edge[i]*.12);
        const tint=distant?[1,.98,.98]:(j<2?[1.14,1.12,1.09]:(j===5||j===9?[1.12,1.08,1.03]:[1,.99,.99]));
        g.face(mat,[rim[j][i],rim[j][k],rim[j+1][k],rim[j+1][i]],radial(A[i]),{tone:t,tint});
      }
    }
    const p=rim.at(-1),c=[0,height*1.017,0];
    for(let i=0;i<N;i++)g.face(mat,[p[i],p[(i+1)%N],c],UP,{tone:1.04,tint:[1,.99,.91]});
  });
}
function farHills(g){
  const steps=144,rad0=230;
  for(let layer=0;layer<2;layer++)for(let i=0;i<steps;i++){
    function point(n){
      const a=n*TAU/steps,r=rad0+layer*39+8*Math.sin(a*5+layer);
      const skyline=-2+layer*7+6*Math.sin(a*3.0+.7+layer*5)+3.0*Math.sin(a*11.0+1)+1.7*Math.cos(a*29+layer);
      return rad(a,r,skyline);
    }
    const a=point(i),b=point(i+1);
    g.face('horizon',[[a[0],-26,a[2]],[b[0],-26,b[2]],b,a],radial(TAU*i/steps,-1),{tone:layer?1.16:1.04,tint:[.94,.99,1.08]});
  }
}
function plateau(g){
  const N=88,layers=[[-12.6,1.30],[-10.4,1.21],[-8.3,1.06],[-7.85,1.09],[-7.50,1.05],[-5.67,1.034],[-5.43,1.06],[-5.20,1.058],[-4.98,1.02],[-3.9,.995],[-3.78,1.024],[-3.51,1.027],[-2.9,1.002],[-2.84,1.022],[-2.65,1.017],[-2.39,.989],[-1.36,.969],[-1.15,.99],[-.90,.995],[-.51,.97]];
  const rim=[];
  for(let j=0;j<layers.length;j++){
    const [y,m]=layers[j],p=[];
    for(let i=0;i<N;i++){
      const a=TAU*i/N,n=noise(Math.sin(a)*4.0+7,Math.cos(a)*4.0+2,5),n2=noise(Math.sin(a)*9+19,Math.cos(a)*9,2);
      const r=(.985+.10*(n-.5)+.035*(n2-.5)+.018*Math.sin(7*a+1))*m;
      p.push([Math.sin(a)*11.8*r+.40*Math.cos(a*2),y+.40*(n-.5)+.10*Math.sin(a*3+j*.19),Math.cos(a)*18.6*r+.25]);
    }rim.push(p);
  }
  for(let j=0;j<rim.length-1;j++)for(let i=0;i<N;i++){
    const k=(i+1)%N,ledge=layers[j+1][1]-layers[j][1]>.009;
    const tone=(ledge?.81:1.0)*(.88+.12*noise(i*.54,j*.31,3));
    g.face('rock',[rim[j][i],rim[j][k],rim[j+1][k],rim[j+1][i]],radial(i*TAU/N),{tone,tint:j%7===0?[1.15,1.10,1.04]:[1.02,.99,.97]});
  }
  const p=rim.at(-1);
  for(let i=0;i<N;i++){
    const k=(i+1)%N,r=mul(p[i],.80),s=mul(p[k],.8);r[1]=-.265;s[1]=-.265;
    g.face('rock',[p[i],p[k],s,r],UP,{tone:1.11,tint:[1,1.04,1.07]});
    g.face('sand',[r,s,[0,-.155,0]],UP,{tone:.90+rngAt(i)*.03});
  }
}
const rngAt=i=>h(i,25,9);
export function pebble(g,x,y,z,sx,sy,sz,theta,mat='stone',tone=1,seed=3){
  const rand=randomSource(seed),n=7+(seed%3),base=[],mid=[],cap=[];
  for(let i=0;i<n;i++){
    const a=TAU*(i+.17*rand())/n;
    const v=.81+.28*rand(),X=Math.sin(a)*sx*v,Z=Math.cos(a)*sz*v;
    base.push([X*.80,-sy*.15,Z*.83]);
    mid.push([X,sy*(.31+rand()*.21),Z]);
    cap.push([X*(.52+.23*rand())+sx*.075,sy*(.74+.26*rand()),Z*.62+sz*.07]);
  }
  g.at(x,y,z,theta,()=>{
    for(let i=0;i<n;i++){
      const j=(i+1)%n;
      g.face(mat,[base[i],base[j],mid[j],mid[i]],radial(TAU*i/n),{tone:tone*.88});
      g.face(mat,[mid[i],mid[j],cap[j],cap[i]],radial(TAU*i/n),{tone:tone*(.90+.13*rand())});
      g.face(mat,[cap[i],cap[j],[sx*.09,sy*.96,sz*.05]],UP,{tone});
    }
  });
}
function plants(g,x,y,z,scale,seed){
  const rnd=randomSource(seed);
  for(let j=0;j<14;j++){
    const a=rnd()*TAU,d=(.04+rnd()*.18)*scale,X=x+d*Math.sin(a),Z=z+d*Math.cos(a),t=(.13+rnd()*.33)*scale,w=(.009+rnd()*.019)*scale;
    const p=[X+t*.62*Math.sin(a)+.07*scale,y+t,Z+t*.62*Math.cos(a)];
    const n=[Math.cos(a),.29,-Math.sin(a)],root=[X,y,Z];
    const pts=[add(root,[-w,0,-w*.4]),add(root,[w,0,w*.4]),p];
    g.face(j%3?'grass':'chaff',pts,n,{tones:[.66,.66,1.07]});
    g.face(j%3?'grass':'chaff',pts,mul(n,-1),{tones:[.66,.66,1.07]});
  }
}
function outcrops(g){
  for(let i=0;i<130;i++){
    const a=rn()*TAU,d=(.69+.265*rn()),x=Math.sin(a)*11.60*d,z=.25+Math.cos(a)*18.6*d;
    if((Math.abs(x)<5.45 && z<-4.45 && z>-15.95)||(Math.abs(x)<2.98 && z>5 && z<15.05)||Math.hypot(x,z)<6.94)continue;
    const size=.12+rn()**2*.89;
    pebble(g,x,-.405+(.9-d)*.26,z,size*(.9+rn()),size*(.38+rn()*.45),size*(.65+rn()*.7),rn()*TAU,'rock',.91+rn()*.16,1000+i);
    if(i%5===0)plants(g,x+.22,-.23,z-.14,.73+rn()*.6,340+i);
  }
  // Dislocated flaggy slabs just below the terrace lip.
  for(let j=0;j<33;j++){
    const a=2.32+rn()*1.43,r=1.014+rn()*.09;
    pebble(g,Math.sin(a)*11.25*r,-1.29-rn()*1.1,Math.cos(a)*18.15*r,.47+rn()*1.3,.27+rn()*.41,.63+rn()*1.1,rn()*PI,'rock',.93+rn()*.12,2330+j);
  }
}
export function buildLandscape(g){
  g.section('dunes and horizon',false,()=>{
    farHills(g);
    const groups=[
      [-42,-80,19,11,17,-.19],[-64,-73,6.9,6.0,12,.35],[-25,-92,7.3,6.5,19,.28],
      [40,-106,25,14,18,.47],[71,-113,9.2,10,15,.16],[20,-119,5.3,6.3,13,.35],
      [-111,-12,23,10.9,22,.43],[-89,10,6.0,5.9,17,.18],[-102,23,7.1,6,14,.29],
      [94,38,19,13,18,.26],[107,22,8.2,5,20,-.39],[66,87,20,8,14,.23],
      [-30,122,18,15,23,-.27],[-53,118,9.3,7.5,16,.22],[-80,106,15,7.3,14,-.44],
      [132,-151,34,17,28,.39],[-114,-153,27,16,30,-.37],[2,-178,31,12,17,.13],
      [163,-42,19,15,22,.7],[-156,72,27,11,24,-.5]
    ];
    dunes(g,groups);
    groups.forEach(([x,z,r,s,t,a],i)=>mesa(g,x,z,r,s,-18,t,a,6241+i*47,i>14));
  },false);
  g.section('plateau',true,()=>{plateau(g);outcrops(g)});
}

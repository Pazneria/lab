'use strict';

const Craft = (() => {
  const {Mesh, rng, rgb, mix, mul, rotate, add, stone, mortar, wood, iron, cloth, leather, plain, embers, shadow, TAU, tint, blend} = Ward;
  let nextRandom=rng(100428);
  const random=()=>nextRandom();
  const resetSeed=()=>{ nextRandom=rng(100428); };
  const rand = (a,b) => mix(a,b,random());
  const pick = list => list[Math.floor(random()*list.length)];
  const riser = (x,y,z) => [x,y,z];
  const brickColors = ['#817466','#74685d','#8c7c68','#97846e','#6e6257','#82776c','#776f65','#8c8072'];
  const floorColors = ['#665e56','#75695d','#827365','#746b62','#8e7e6b','#675d52','#7b6a5b','#817568'];
  const oakColors = ['#77563e','#6a4b36','#805e43','#71513c','#876546','#6c4d38','#8e6a4c'];
  const barnOak = ['#51392a','#594130','#644832','#58402d','#694b31','#4c382b','#674932'];
  const ashColors = ['#746359','#685b53','#807065','#655b51','#73706a','#625a55','#716259','#7e6c5d'];
  const ironDark = '#4c4943', ironEdge = '#6d6a5e', bronze = '#907047', blackOak = '#443426';

  function frame(ox, oz, tx, tz) {
    return {
      point(u,y,d=0) { return [ox+u*tx-d*tz,y,oz+u*tz+d*tx]; },
      normal: [-tz,0,tx],
      tangent: [tx,0,tz],
      yaw: Math.atan2(-tz,tx)
    };
  }
  function faceRect(mesh,f,x0,y0,x1,y1,d,color,material,em=0,flipped=false) {
    let p = [f.point(x0,y0,d),f.point(x1,y0,d),f.point(x1,y1,d),f.point(x0,y1,d)];
    let uv = [[0,0],[1,0],[1,1],[0,1]];
    if (flipped) { p=p.reverse(); uv=uv.reverse(); }
    mesh.face(p,color,material,uv,em);
  }
  function patch(mesh,f,x0,y0,x1,y1,d,color,material=stone) {
    const center=f.point((x0+x1)*.5,(y0+y1)*.5,d);
    mesh.box(center,[x1-x0,y1-y0,.04],color,material,f.yaw);
  }
  function stonePiece(mesh,f,x0,y0,x1,y1,depth,color,reverse=false, uvSize=.9) {
    const w=x1-x0,h=y1-y0;
    if (w<.035 || h<.04) return;
    const corner = Math.min(w,h)*rand(.075,.18);
    const shift=Math.min(w,h)*.037;
    const outer = [
      [x0+corner,y0],[x1-corner,y0],[x1,y0+corner],[x1,y1-corner],
      [x1-corner,y1],[x0+corner,y1],[x0,y1-corner],[x0,y0+corner]
    ].map(([u,v])=>[u+rand(-shift,shift),v+rand(-shift,shift)]);
    const [cx,cy]=[(x0+x1)*.5,(y0+y1)*.5];
    const step = depth*(reverse?-1:1), offset=rand(.09,.19);
    const inside = outer.map(([u,v])=>[mix(u,cx,offset),mix(v,cy,offset)]);
    const left = outer.map(([u,v])=>f.point(u,v,0));
    const right = inside.map(([u,v])=>f.point(u,v,step*rand(.92,1.08)));
    const flat = f.point(cx,cy,step+Math.sign(step)*rand(0,.008));
    const off1 = rand(0,7), off2=rand(0,7);
    const uv = ([x,y])=>[x*uvSize+off1,y*uvSize+off2];
    function make(p,c,qu) {
      mesh.face(reverse?p.reverse():p,c,stone,reverse?qu.reverse():qu);
    }
    for (let i=0;i<8;i++) {
      const j=(i+1)%8;
      const band = i<3 ? rand(.72,.85) : i<6 ? rand(1.03,1.16) : rand(.86,1.04);
      make([left[i],left[j],right[j],right[i]],tint(color,band),[uv(outer[i]),uv(outer[j]),uv(inside[j]),uv(inside[i])]);
      make([right[i],right[j],flat],tint(color,rand(.95,1.055)),[uv(inside[i]),uv(inside[j]),uv([cx,cy])]);
    }
  }
  function archReach(y, cut) {
    const center = (cut.l+cut.r)*.5, rx=(cut.r-cut.l)*.5;
    if (y <= cut.spring) return [cut.l,cut.r];
    const unit=(y-cut.spring)/(cut.high-cut.spring);
    if (unit>=1) return [center,center];
    const d=rx*Math.sqrt(1-unit*unit);
    return [center-d,center+d];
  }
  function wall(mesh,f,width,height,options={}) {
    const {cuts=[],row=.43,block=1.05,palette=brickColors,
      mortarColor='#4a4239',both=false,depth=.36,relief=.063,soot=0} = options;
    const rows=Math.ceil(height/row);
    const frameBack=frame(...(() => {
      const p=f.point(0,0,-depth);
      return [p[0],p[2],f.tangent[0],f.tangent[2]];
    })());
    let bottom=0;
    for (let level=0;level<rows;level++) {
      const top = level===rows-1 ? height : (level+1)*height/rows+rand(-.047,.047);
      let intervals=[[0,width]];
      for (const cut of cuts) {
        if (bottom >= cut.high || top <= (cut.low ?? 0)) continue;
        let range=[cut.l,cut.r];
        if (cut.spring!==undefined) {
          range=archReach(bottom,cut);
          const n=8;
          for (let strip=0;strip<n;strip++) {
            const y0=mix(bottom,top,strip/n), y1=mix(bottom,top,(strip+1)/n);
            const at0=archReach(y0,cut), at1=archReach(y1,cut);
            if (at1[0]>range[0]+.001) for (const side of [0,1]) {
              for (const [f0,reverse] of both?[[f,false],[frameBack,true]]:[[f,false]]) {
                const p=[f0.point(range[side],y0),f0.point(at0[side],y0),
                  f0.point(at1[side],y1),f0.point(range[side],y1)];
                if (Math.abs(at0[side]-range[side])<.0001) p.splice(1,1);
                if (side===1) p.reverse();
                if (reverse) p.reverse();
                mesh.face(p,'#675b50',stone);
              }
            }
          }
        }
        intervals=intervals.flatMap(([a,b])=>{
          if (range[0]>=b || range[1]<=a) return [[a,b]];
          return [[a,Math.min(b,range[0])],[Math.max(a,range[1]),b]].filter(([l,r])=>r-l>.02);
        });
      }
      for (const [a,b] of intervals) {
        faceRect(mesh,f,a,bottom,b,top,0,mortarColor,mortar);
        if (both) faceRect(mesh,frameBack,a,bottom,b,top,0,mortarColor,mortar,0,true);
        let at=a;
        let first=level%2===0 ? rand(.72,1.33) : rand(.37,.79);
        for (let guard=0;at<b-.022 && guard<100;guard++) {
          const next=at+(guard===0 ? first : rand(.67,1.31))*block;
          const end=next>b-block*.30 ? b : next;
          const v = pick(palette);
          const grime = soot*clampRange((1.55-bottom)/1.55)*rand(.7,1.1);
          const color = blend(v,'#3d3229',Math.min(.75,grime));
          const inset=Math.min(.024,(end-at)*.11);
          const y0=bottom+rand(.009,.021), y1=top-rand(.009,.022);
          stonePiece(mesh,f,at+inset,y0,end-inset,y1,rand(.67,1.23)*relief,color);
          if (both) stonePiece(mesh,frameBack,at+inset,y0,end-inset,y1,rand(.60,1.12)*relief,tint(color,rand(.81,1.01)),true);
          at=end;
        }
      }
      bottom=top;
    }
  }
  const clampRange = t => Math.max(0,Math.min(1,t));

  function slab(mesh,x0,x1,z0,z1,y,color,material=stone,bevel=.043,edges=true) {
    const w=x1-x0,d=z1-z0;
    if (w<.02||d<.02) return;
    const cut = Math.min(bevel,w*.23,d*.23);
    const border = [[x0+cut,z1],[x1-cut,z1],[x1,z1-cut],[x1,z0+cut],
      [x1-cut,z0],[x0+cut,z0],[x0,z0+cut],[x0,z1-cut]];
    const jitter = Math.min(cut*.13,.019);
    const outer = border.map(([x,z])=>[x+rand(-jitter,jitter),z+rand(-jitter,jitter)]);
    const [cx,cz] = [(x0+x1)*.5,(z0+z1)*.5];
    const inner = outer.map(([x,z])=>[mix(x,cx,.029),mix(z,cz,.036)]);
    const top = inner.map(([x,z])=>[x,y,z]);
    const off1=rand(0,8), off2=rand(0,8);
    const uv=([x,z])=>[x+off1,z+off2];
    mesh.face(top,color,material,inner.map(uv));
    if (edges) for (let i=0;i<8;i++) {
      const j=(i+1)%8;
      mesh.face([[...outer[i].slice(0,1),y-.045,outer[i][1]],
        [outer[j][0],y-.045,outer[j][1]],top[j],top[i]],tint(color,i<4?.75:.91),material);
    }
  }
  function flags(mesh,bounds,options={}) {
    const [xmin,xmax,zmin,zmax]=bounds;
    const {width=1.08,depth=.91,y=.003,gap=.025,palette=floorColors,wear=.0} = options;
    mesh.box([(xmin+xmax)*.5,y-.054,(zmin+zmax)*.5],[xmax-xmin,.065,zmax-zmin], '#413a33',mortar);
    let rz=zmin,row=0;
    while (rz<zmax-.045) {
      const nextZ=rz+depth*rand(.77,1.18);
      const ez=nextZ>zmax-depth*.30 ? zmax : nextZ;
      let rx=xmin,col=0;
      while (rx<xmax-.045) {
        const nextX=rx+width*(col===0 && row%2 ? rand(.34,.61) : rand(.76,1.27));
        const ex=nextX>xmax-width*.32 ? xmax : nextX;
        const c = blend(pick(palette),'#4b3a2d',wear*rand(.3,.85));
        slab(mesh,rx+gap,ex-gap,rz+gap,ez-gap,y+rand(-.007,.007),c,stone,rand(.026,.078));
        rx=ex;
        col++;
      }
      rz=ez;
      row++;
    }
  }
  function planks(mesh, xmin, xmax, zmin, zmax, y) {
    mesh.box([(xmin+xmax)*.5,y-.078,(zmin+zmax)*.5],[xmax-xmin,.075,zmax-zmin],'#392c23',wood);
    let row=0,x=xmin;
    while (x<xmax-.018) {
      const nx = Math.min(x+rand(.22,.39),xmax);
      let z=zmin,col=0;
      while (z<zmax-.02) {
        const next=z+(col===0&&row%2 ? rand(.65,1.42) : rand(1.7,2.85));
        const nz = next>zmax-.34 ? zmax : next;
        const color = pick(oakColors);
        mesh.beam([(.5*(x+nx)),y-.021,z+.009],[.5*(x+nx),y-.021,nz-.009],
          nx-x-.011,.055,color,wood,.009);
        if (random()>.24) for (const k of [.05,.94]) {
          const zz=mix(z,nz,k);
          for (const xx of [x+.034,nx-.035]) if (nx-x>.12) {
            mesh.cyl([xx,y+.007,zz],[xx,y+.009,zz],.011,.010,'#312b24',iron,5);
          }
        }
        z=nz;
        col++;
      }
      x=nx;
      row++;
    }
  }
  function arch(mesh,opt) {
    const {cx=0, spring, rx, ry, thick, zFront, depth, count,
      palette=ashColors, gap=.011, shade=1, bevel=.035, masonry=true} = opt;
    const step=Math.PI/count;
    function point(a,r,z) { return [cx+(rx+r)*Math.sin(a),spring+(ry+r)*Math.cos(a),z]; }
    for (let i=0;i<count;i++) {
      const a=-Math.PI/2+i*step+gap,b=a+step-2*gap;
      const lower=rand(-.013,.013), upper=thick+rand(-.012,.012);
      const c=tint(pick(palette),shade);
      const af=zFront+rand(-.012,.012), az=zFront-depth;
      const fa=point(a,lower+bevel,af),fb=point(b,lower+bevel,af);
      const fc=point(b,upper-bevel,af),fd=point(a,upper-bevel,af);
      const ea=point(a,lower,af-bevel),eb=point(b,lower,af-bevel);
      const ec=point(b,upper,af-bevel),ed=point(a,upper,af-bevel);
      const ba=point(a,lower,az),bb=point(b,lower,az);
      const bc=point(b,upper,az),bd=point(a,upper,az);
      mesh.face([fa,fb,fc,fd],c,stone);
      mesh.face([ea,eb,fb,fa],tint(c,.79),stone);
      mesh.face([fd,fc,ec,ed],tint(c,1.19),stone);
      mesh.face([eb,ea,ba,bb],tint(c,.83),stone);
      mesh.face([bb,ba,bd,bc],tint(c,.95),stone);
      if (masonry) {
        mesh.face([ed,ec,bc,bd],c,stone);
        mesh.face([ea,fa,fd,ed,bd,ba],tint(c,.72),stone);
        mesh.face([fb,eb,bb,bc,ec,fc],tint(c,.91),stone);
      }
    }
  }
  function nail(mesh,p,normal,r=.033,c=ironEdge) {
    mesh.cyl(add(p,mul(normal,-.012)),add(p,mul(normal,.011)),r*1.13,r*.84,c,iron,r>.07?8:6,0,false);
  }
  function band(mesh, f, l,r, y, h, at, color=ironDark, studs=3) {
    mesh.beam(f.point(l,y,at),f.point(r,y,at),.027,h,color,iron,.012);
    for (let i=0;i<studs;i++) nail(mesh,f.point(mix(l+.06,r-.06,(i+.5)/studs),y,at+.018),f.normal,.024);
  }
  function chain(mesh,x,yTop,z,count,scale=1,color=ironDark) {
    for (let i=0;i<count;i++) {
      const yaw=i%2 ? Math.PI*.48 : 0;
      mesh.ring([x+.018*Math.sin(i*.64),yTop-i*.141*scale,z],
        [Math.sin(yaw),0,Math.cos(yaw)],.091*scale,.022*scale,color,iron,10,5);
    }
  }
  function paintedBoard(mesh,f,x0,y0,x1,y1,d,material,frameColor=blackOak) {
    patch(mesh,f,x0-.02,y0-.02,x1+.02,y1+.02,d-.028,frameColor,wood);
    faceRect(mesh,f,x0,y0,x1,y1,d, '#ffffff', material);
    for (const x of [x0+.022,x1-.022]) for (const y of [y0+.022,y1-.022]) nail(mesh,f.point(x,y,d+.004),f.normal,.012,bronze);
  }
  function brazierLamp(mesh, x,y,z, size=1, metal=ironDark, warm='#ffa94f') {
    const p=(dx,dy,dz)=>[x+dx*size,y+dy*size,z+dz*size];
    mesh.cyl(p(0,-.23,0),p(0,-.15,0),.14*size,.165*size,metal,iron,8);
    mesh.cyl(p(0,-.15,0),p(0,.14,0),.105*size,.096*size,warm,embers,8,2.35);
    mesh.cyl(p(0,.14,0),p(0,.226,0),.156*size,.086*size,metal,iron,8);
    mesh.cyl(p(0,.226,0),p(0,.251,0),.086*size,.061*size,metal,iron,8);
    for (let i=0;i<8;i++) {
      const t=i/8*TAU, dx=Math.cos(t)*.13,dz=Math.sin(t)*.13;
      mesh.beam(p(dx,-.15,dz),p(dx*.92,.145,dz*.92),.015*size,.019*size,metal,iron,.004);
    }
    mesh.ring(p(0,.292,0),[0,0,1],.045*size,.011*size,metal,iron,12,5);
  }

  return {random,resetSeed,rand,pick,riser,brickColors,floorColors,oakColors,barnOak,ashColors,ironDark,ironEdge,bronze,blackOak,
    frame,faceRect,patch,stonePiece,wall,slab,flags,planks,arch,nail,band,chain,paintedBoard,brazierLamp};
})();


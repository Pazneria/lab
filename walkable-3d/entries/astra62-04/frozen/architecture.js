"use strict";
PH.buildHouse=function(){
  const {rand,pick,mix,clamp,add,sub,mul,len,norm,cross,lerp3,shift,rgb,tint,mat:M,solid,glass,glassGroups,face,box,beam,tube,blob,lathe,ao,obstacle,plaque,TAU}=PH;
  const W=4.15,L=9.2,E=3.42,R=5.73;
  const iron=rgb('47635b'), deep=rgb('334840'), lit=rgb('70877a'), coal=rgb('323e38');
  const rust=rgb('906945'), mortar=rgb('8e8976'), lime=rgb('c2b899');
  const wallColors=['9b7965','a77d63','897161','ac8a71','aa8a74','948674','b79d83'];
  function edge(a,b,r,c=iron,s=6){tube([a,b],r,c,M.paint,s);}
  function masonry(a,b,base,height,width,rows){
    const xz=sub(b,a),span=len(xz),axis=norm(xz),ang=Math.atan2(-axis[2],axis[0]);
    const ctr=lerp3(a,b,.5);box(ctr[0],base+height/2,ctr[2],span,height,width-.028,mortar,M.stone,ang);
    const rh=height/rows,unit=.37;
    for(let row=0;row<rows;row++){
      for(let p=row%2?-.5*unit:0;p<span;p+=unit){
        const s=Math.max(p,0),e=Math.min(span,p+unit);
        if(e-s<.035)continue;
        const pos=add(a,mul(axis,(s+e)/2));
        box(pos[0],base+(row+.5)*rh,pos[2],e-s-.01,rh-.009,width+rand(-.008,.008),tint(pick(wallColors),rand(.86,1.07)),M.brick,ang);
      }
    }
  }
  function slab(x0,z0,x1,z1,y,color,m,bevel=.009){
    if(x1-x0<.022||z1-z0<.022)return;
    const e=Math.min(bevel,(x1-x0)/6,(z1-z0)/6),v=(x,z,h)=>[x,h,z];
    const outer=[v(x0,z0,y-e*.5),v(x0,z1,y-e*.5),v(x1,z1,y-e*.5),v(x1,z0,y-e*.5)];
    const inner=[v(x0+e,z0+e,y),v(x0+e,z1-e,y),v(x1-e,z1-e,y),v(x1-e,z0+e,y)];
    face(inner,color,m,inner.map(p=>[p[0],p[2]]));
    for(let i=0;i<4;i++){
      const n=(i+1)%4;face([outer[i],outer[n],inner[n],inner[i]],tint(color,.94),m);
    }
  }
  const tile=['a68c72','ad8e72','b1987a','ad927d','97846e','a78e78','a48873','b99b80','9a8775','b69f86','a08b7a'];
  box(0,-.099,0,W*2+.16,.18,2*L+.14,rgb('746e60'),M.stone);
  const u=.163;
  for(let j=-50;j<60;j++)for(let i=-27;i<27;i++){
    const res=((i-j)%4+4)%4;if(res!==0&&res!==3)continue;
    const x=i*u,z=j*u;
    const x0=Math.max(-W,x)+.003,z0=Math.max(-7.08,z)+.003,x1=Math.min(W,x+u*(res===0?2:1))-.003,z1=Math.min(L,z+u*(res===0?1:2))-.003;
    if(x0>-1.1&&x1<1.1&&z0>-6.2&&z1<6.2)continue;
    slab(x0,z0,x1,z1,rand(-.002,.0035),tint(pick(tile),rand(.9,1.06)),M.paver,.004);
  }
  function flagstones(x0,z0,x1,z1,sx,sz,colors){
    let row=0;
    for(let z=z0;z<z1;z+=sz,row++){
      for(let x=x0-(row%2)*sx*.5;x<x1;x+=sx){
        slab(Math.max(x0,x)+.006,z+.007,Math.min(x1,x+sx)-.006,Math.min(z1,z+sz)-.007,.009,tint(pick(colors),rand(.93,1.04)),M.stone,.012);
      }
    }
  }
  flagstones(-W,-L,W,-7.08,.89,.51,['a49e87','b8ae95','a9a58e','939783']);
  box(0,-.103,10.62,4.8,.18,2.84,rgb('7a7968'),M.stone);
  flagstones(-2.4,L,2.4,12.04,.79,.57,['aaa48f','b1a791','a2a08b','959a83']);
  function grille(x,z,w,d){
    box(x,.013,z,w,.017,d,coal,M.zinc);
    for(const s of [-1,1]){
      box(x+s*(w/2-.013),.028,z,.023,.021,d,deep,M.zinc);
      box(x,.028,z+s*(d/2-.013),w,.021,.023,deep,M.zinc);
    }
    const count=Math.ceil(w/.037);
    for(let k=1;k<count;k++)box(x-w/2+k*w/count,.029,z,.012,.018,d-.029,tint('70827a',rand(.78,1)),M.zinc);
    for(const k of [-.24,0,.24])box(x,.032,z+k*d,w-.025,.009,.012,deep,M.zinc);
  }
  grille(0,9.84,1.74,.52);grille(-3.29,1.7,.25,.56);grille(3.12,-5.15,.26,.63);grille(1.88,-7.58,.36,.5);
  const bed=[[.98,6.56],[1.38,6.11],[1.38,-6.09],[.94,-6.55],[-.94,-6.55],[-1.38,-6.09],[-1.38,6.11],[-.98,6.56]];
  const bedStone=['989a7f','a0a086','929780','a39f82'];
  for(let i=0;i<bed.length;i++){
    const a=[bed[i][0],0,bed[i][1]],two=bed[(i+1)%bed.length],b=[two[0],0,two[1]];
    masonry(a,b,0,.32,.18,3);
    const d=norm(sub(b,a)),span=len(sub(b,a)),count=Math.ceil(span/.63),angle=Math.atan2(-d[2],d[0]);
    for(let k=0;k<count;k++){const v=lerp3(a,b,(k+.5)/count);box(v[0],.361,v[2],span/count-.007,.081,.235,tint(pick(bedStone),rand(.91,1.04)),M.stone,angle);}
  }
  obstacle(-1.45,-6.16,1.45,6.16);obstacle(-1.12,-6.65,1.12,6.65);ao(0,0,2.0,8.6,.6);
  const heights=(x,z)=>.41+.07*Math.sin(1.6*z+2*x)+.037*Math.cos(3.3*z-2.5*x)+.028*Math.sin(x*8.4+1.9*z);
  for(let j=0;j<70;j++)for(let i=0;i<13;i++){
    const p=(u,v)=>{let z=-6.5+(j+v)*13/70,w=1.33-.38*clamp((Math.abs(z)-6.06)/.46);let x=(-1+2*(i+u)/13)*w;return[x,heights(x,z),z];};
    const pts=[p(0,0),p(0,1),p(1,1),p(1,0)];
    face(pts,tint('665440',rand(.95,1.04)),M.soil,pts.map(v=>[v[0],v[2]]));
  }
  PH.soilHeight=heights;
  for(const sx of [-1,1]){
    masonry([sx*W,0,-L],[sx*W,0,L],-.015,.51,.237,5);
    box(sx*W,.528,0,.285,.085,2*L+.12,lime,M.stone);
    box(sx*W,.609,0,.126,.104,2*L+.12,deep,M.paint);
    for(const z of [-L,L]){
      if(z>0)masonry([sx*1.24,0,z],[sx*W,0,z],-.015,.51,.237,5);
    }
    box(sx*(W+1.24)/2,.53,L,W-1.24,.085,.275,lime,M.stone);
  }
  masonry([-W,0,-L],[W,0,-L],-.015,.51,.237,5);
  box(0,.526,-L,W*2+.19,.09,.275,lime,M.stone);
  function pane(a,b,c,d,damage=false){
    const w=len(sub(b,a)),h=len(sub(d,a)),offset=rand(0,16);
    face([a,b,c,d],tint('eef5eb',rand(.84,1.07)),M.glass,[[offset,0],[offset+w,0],[offset+w,h],[offset,h]],glass);
    if(damage){
      const uv=(u,v)=>add(lerp3(a,b,u),mul(sub(d,a),v));
      const sx=rand(.29,.7),sy=rand(.27,.75),pc=rgb('b8c4b4');
      const rays=pick([[[0,.81],[.28,1],[.79,0]],[[0,.15],[1,.5],[.67,1]]]);
      for(const [ex,ey]of rays){
        const q1=uv(mix(sx,ex,.38)+rand(-.04,.04),mix(sy,ey,.38)+rand(-.05,.05));
        const q2=uv(mix(sx,ex,.75)+rand(-.04,.04),mix(sy,ey,.75));
        tube([uv(sx,sy),q1,q2,uv(ex,ey)],[.0038,.0025,.0025,.001],pc,M.zinc,3);
        if(rand()<.42)tube([q1,uv(mix(sx,ex,.49)+.1,mix(sy,ey,.53))],[.002,.0007],pc,M.zinc,3);
      }
    }
  }
  function group(start,center){glassGroups.push({offset:start,count:glass.count-start,center});}
  const ys=[.65,1.56,2.49,E]; 
  for(const s of [-1,1]){
    const x=s*W;
    for(const y of [.658,1.56,2.49,E]){
      box(x,y,0,y===E?.137:.047,y===E?.146:.046,2*L+.13,y===E?deep:iron,M.paint);
      if(y===E)box(x+s*.065,y+.042,0,.13,.039,2*L+.27,lit,M.zinc);
    }
    for(let j=0;j<16;j++){
      const z0=-L+j*1.15,z1=z0+1.15,major=j%2===0;
      if(!major)box(x,(E+.63)/2,z0,.047,E-.63,.043,iron,M.paint);
      const start=glass.count;
      for(let k=0;k<3;k++){
        if((s===1&&j===10&&k===2)||(s===-1&&j===3&&k===2))continue;
        pane([x,ys[k]+.017,z0+.017],[x,ys[k]+.017,z1-.017],[x,ys[k+1]-.018,z1-.017],[x,ys[k+1]-.018,z0+.017],(j*3+k+(s+1)*5)%31===9);
      }
      group(start,[x,2,(z0+z1)/2]);
    }
    const yroof=t=>mix(E,R,t);
    for(let k=1;k<=4;k++){
      const t=k/4;box(s*W*(1-t),yroof(t),0,.053,.06,L*2+.15,iron,M.paint);
    }
    for(let j=0;j<16;j++){
      const z0=-L+j*1.15,z1=z0+1.15;
      if(j%2)beam([x,E,z0],[0,R,z0],.049,.075,iron,M.paint);
      const start=glass.count;
      for(let k=0;k<4;k++){
        if((s===1&&j===7&&k===1)||(s===-1&&j===13&&k===2))continue;
        const t0=k/4+.003,t1=(k+1)/4-.003, lift=(s===-1&&[4,5,10,11].includes(j)&&k===3)?.16:0;
        const v=(t,z)=>[s*W*(1-t),yroof(t)+.018+(t===t0?lift:0),z];
        const a=v(t0,z0+.017),b=v(t0,z1-.017),c=v(t1,z1-.017),d=v(t1,z0+.017);
        pane(a,b,c,d,(j*7+k+3*s)===37);
        if(lift){edge(a,b,.018,iron);edge(a,d,.013,lit);edge(b,c,.013,lit);}
      }
      group(start,[s*W*.5,(E+R)*.5,(z0+z1)/2]);
    }
  }
  // Paired angles, raised column bases and curved knee braces carry the roof.
  for(let j=0;j<=8;j++){
    const z=-L+j*2.3;
    for(const s of [-1,1]){
      const x=s*W;
      box(x,1.965,z,.105,2.98,.11,deep,M.paint);
      box(x-s*.04,1.98,z,.083,2.92,.146,iron,M.paint);
      box(x,.72,z,.177,.24,.202,deep,M.paint);box(x,.861,z,.147,.052,.173,lit,M.paint);
      box(x,E-.095,z,.213,.174,.219,iron,M.paint);box(x,E+.017,z,.26,.058,.263,lit,M.paint);
      beam([x,E,z],[0,R,z],.116,.132,deep,M.paint);
      beam([x,E+.047,z],[0,R+.047,z],.155,.037,lit,M.paint);
      const pts=[];
      for(let k=0;k<=12;k++){const t=k/12;pts.push([x-s*(1-Math.cos(t*Math.PI/2))*.95,E-.89+.89*Math.sin(t*Math.PI/2)+.32*t,z]);}
      tube(pts,.033,iron,M.paint,7);
      edge([x-s*.02,E-.64,z],[x-s*.94,E+.47,z],.014,lit);
      for(let k=0;k<3;k++)edge([x-s*(.14+k*.18),E-.28+k*.23,z],[x-s*(.14+k*.18),E+.057+k*.097,z],.012,iron);
      for(const y of [.70,.78,2.49,E-.13])for(const side of [-1,1])
        blob(x-s*.103,y,z+side*.046,.014,.015,.015,lit,M.zinc,2,5);
    }
    if(j%2===0||j===3||j===5){
      edge([-W,E+.047,z],[W,E+.047,z],.027,iron,8);
      edge([0,E+.05,z],[0,R-.036,z],.029,deep,8);
      for(const s of [-1,1]){
        edge([0,E+.084,z],[s*W*.54,mix(R,E,.54),z],.019,iron,7);
        edge([s*W*.55,E+.055,z],[s*W*.55,mix(R,E,.55),z],.012,iron);
      }
      blob(0,E+.023,z,.074,.077,.054,iron,M.paint,3,8);
    }
  }
  box(0,R+.05,0,.145,.116,2*L+.29,deep,M.paint);
  for(const z of [-L,L]){lathe(0,z,[[.07,R+.09],[.07,R+.18],[.039,R+.2],[.044,R+.27],[.012,R+.34]],iron,M.paint,12);}
  // Glazed gables. The front portal interrupts the glazing below its fanlight.
  for(const side of [-1,1]){
    const z=side*L,front=side===1;
    const cuts=front?[-W,-2.73,-1.24,0,1.24,2.73,W]:[-W,-2.765,-1.382,0,1.382,2.765,W];
    const roof=x=>R-(R-E)*Math.abs(x)/W;
    for(let j=0;j<cuts.length-1;j++){
      const x0=cuts[j],x1=cuts[j+1],opening=front&&x0>=-1.24&&x1<=1.24,start=glass.count;
      if(!opening){
        for(let k=0;k<3;k++)pane([x0+.023,ys[k]+.02,z],[x1-.023,ys[k]+.02,z],[x1-.023,ys[k+1]-.02,z],[x0+.023,ys[k+1]-.02,z],!front&&j===0&&k===1);
        for(const y of [1.56,2.49])box((x0+x1)/2,y,z,x1-x0,.052,.06,iron,M.paint);
      }else pane([x0+.02,2.63,z],[x1-.02,2.63,z],[x1-.02,E-.025,z],[x0+.02,E-.025,z]);
      const lo=E+.045;
      if(Math.min(roof(x0),roof(x1))<lo){
        const tip=x0<0?x0:x1,inner=x0<0?x1:x0;
        const startX=tip+(inner-tip)*.045/(roof(inner)-E);
        const pts=[[startX,lo,z],[inner,lo,z],[inner,roof(inner)-.013,z]];
        face(pts,rgb('e6efe0'),M.glass,pts.map(v=>[v[0],v[1]]),glass);
      }else pane([x0+.015,lo,z],[x1-.015,lo,z],[x1-.015,roof(x1)-.018,z],[x0+.015,roof(x0)-.018,z]);
      group(start,[(x0+x1)/2,2.8,z]);
      if(j>0){
        const base=opening&&x0===0?E:.55;
        box(x0,(roof(x0)+base)/2,z,.063,roof(x0)-base,.073,iron,M.paint);
      }
    }
    box(0,E,z,W*2,.089,.098,deep,M.paint);
    for(const y of [4.12,4.82]){
      const hw=(R-y)*W/(R-E);box(0,y,z,hw*2,.04,.056,iron,M.paint);
    }
  }
  // A semicircular transom sits above a pair of doors held open against the frontage.
  for(const s of [-1,1]){
    box(s*1.213,1.323,L,.13,2.65,.154,deep,M.paint);
    box(s*1.205,.25,L,.199,.49,.221,iron,M.paint);
    const x=s*1.24, zend=L-.93, xend=x+s*.59;
    for(const f of [0,1])beam([mix(x,xend,f),.055,mix(L,zend,f)],[mix(x,xend,f),2.49,mix(L,zend,f)],.067,.081,iron,M.paint);
    for(const y of [.09,.61,1.49,2.47])beam([x,y,L],[xend,y,zend],.068,.075,iron,M.paint);
    const ds=glass.count;
    for(const [a,b]of [[.63,1.46],[1.52,2.43]])pane([x,a,L],[xend,a,zend],[xend,b,zend],[x,b,L]);
    group(ds,[(x+xend)/2,1.5,(L+zend)/2]);
    beam([x,.34,L],[xend,.34,zend],.5,.06,deep,M.paint);
    const hx=mix(x,xend,.79),hz=mix(L,zend,.79);
    tube([[hx,1.12,hz],[hx-s*.06,1.12,hz-.035],[hx-s*.06,.96,hz-.035],[hx,.96,hz]],.013,rgb('b99b63'),M.brass,9);
    obstacle(Math.min(x,xend)-.035,zend-.02,Math.max(x,xend)+.035,L+.035);
  }
  box(0,2.572,L,2.57,.141,.17,deep,M.paint);
  const arch=[];for(let i=0;i<=30;i++){const t=i/30*Math.PI;arch.push([1.2*Math.cos(t),2.627+.744*Math.sin(t),L+.052]);if(i%5===0)edge([0,2.627,L+.052],arch[i],.015,lit);}
  tube(arch,.029,iron,M.paint,7);
  for(const s of [-1,1])edge([s*.581,3.02,L+.08],[s*.581,3.26,L+.08],.009,coal);
  box(0,2.944,L+.084,1.48,.324,.042,deep,M.paint);
  plaque([0,2.944,L+.109],[1,0,0],[0,1,0],1.45,.30,0);
  // Low hot-water mains, cast collars, wall taps and corner downpipes.
  for(const s of [-1,1]){
    const x=s*(W-.204);
    for(const y of [.238,.369]){
      tube([[x,y,-L+.17],[x,y,L-.25]],.043,coal,M.zinc,11);
      for(let z=-8.65;z<9;z+=1.47)tube([[x,y,z-.029],[x,y,z+.029]],.054,iron,M.zinc,11);
    }
    for(let z=-8.6;z<L;z+=2.3){
      box(x,.18,z,.18,.068,.075,deep,M.zinc);box(x+s*.075,.225,z,.053,.23,.075,deep,M.zinc);
    }
    const zz=s>0?-8.77:8.76;
    tube([[x-.04*s,.1,zz-.19],[x,.16,zz],[x,.33,zz+.045],[x,E-.1,zz+.045],[x+.07*s,E+.03,zz]],.054,iron,M.zinc,10);
    for(const y of [.37,1.58,2.75])tube([[x,y-.022,zz+.045],[x,y+.022,zz+.045]],.062,lit,M.zinc,10);
  }
  // A sheltered apron of dirt and broken-edged stone just outside the glass.
  for(const s of [-1,1]){
    box(s*(W+.5),-.139,0,1.04,.17,L*2+.7,rgb('686c51'),M.soil);
    box(s*3.31,-.141,9.71,1.82,.16,1.06,rgb('687154'),M.soil);
  }
};
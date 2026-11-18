'use strict';
const Ceramics = (() => {
  const {PI,TAU,rand,pick,rgb,shade,blend,M,group,vertex,at,cyl,tube,ring,blob,contact,cross,sub,unit}=G;
  // Height and radius in units of the individual piece. Profiles include a trimmed foot.
  const profiles = {
    bottle:[[0,.53],[.035,.56],[.06,.52],[.11,.62],[.28,.9],[.49,1],[.63,.93],[.77,.54],[.82,.29],[.955,.26],[.977,.34],[1,.32]],
    pear:[[0,.48],[.04,.51],[.07,.48],[.14,.67],[.28,.93],[.44,1],[.62,.87],[.82,.43],[.9,.31],[.975,.34],[1,.39]],
    urn:[[0,.50],[.04,.54],[.075,.49],[.19,.69],[.43,.94],[.66,1],[.79,.91],[.86,.68],[.91,.60],[.966,.64],[1,.73]],
    crock:[[0,.71],[.042,.74],[.065,.71],[.14,.82],[.4,.94],[.77,1],[.88,.97],[.93,.88],[.97,.92],[1,.93]],
    bowl:[[0,.36],[.08,.38],[.13,.34],[.18,.43],[.33,.64],[.57,.83],[.8,.96],[.95,1],[1,.99]],
    deep:[[0,.36],[.065,.39],[.11,.36],[.15,.48],[.28,.59],[.53,.78],[.82,.94],[.97,1],[1,.986]],
    dish:[[0,.48],[.12,.51],[.22,.49],[.29,.59],[.46,.73],[.7,.88],[.93,1],[1,.99]],
    cup:[[0,.62],[.052,.65],[.087,.6],[.14,.71],[.34,.82],[.70,.92],[.92,1],[1,.98]],
    beaker:[[0,.69],[.038,.72],[.07,.69],[.13,.78],[.48,.86],[.9,.97],[.976,1],[1,.987]],
    jug:[[0,.54],[.046,.59],[.08,.54],[.18,.72],[.38,.95],[.58,1],[.72,.91],[.82,.66],[.88,.62],[1,.72]],
    moon:[[0,.43],[.06,.48],[.1,.45],[.15,.59],[.32,.87],[.53,1],[.73,.90],[.88,.60],[.91,.33],[.97,.31],[1,.36]],
    jar:[[0,.63],[.04,.67],[.07,.63],[.15,.78],[.35,.96],[.68,1],[.85,.9],[.93,.71],[1,.73]],
    bud:[[0,.42],[.046,.46],[.08,.44],[.17,.62],[.33,.88],[.52,1],[.67,.89],[.81,.49],[.9,.26],[1,.28]],
    tall:[[0,.60],[.032,.64],[.06,.6],[.14,.65],[.4,.80],[.72,1],[.86,.95],[.96,.82],[1,.87]],
    plate:[[0,.48],[.19,.51],[.32,.49],[.37,.64],[.54,.81],[.80,.93],[1,1]]
  };
  // Pattern numbers are interpreted by the ceramic surface shader.
  const finishes = {
    greenware:['bfa182',M.clay,1], wet:['ae7050',M.clay,2], red:['bc7858',M.clay,1], bisque:['d2a17e',M.clay,1],
    porcelain:['ddd5be',M.satin,3], ash:['a9ae8c',M.satin,4], honey:['ad7740',M.gloss,5],
    celadon:['8aa89a',M.gloss,4], lagoon:['557f80',M.gloss,6], ink:['344956',M.gloss,6],
    shino:['d8b893',M.satin,7], tenmoku:['523c32',M.gloss,5], brush:['ddd5b7',M.gloss,8],
    stripe:['dbcbab',M.satin,9], ochre:['c69a51',M.satin,3], olive:['828968',M.gloss,4],
    cobalt:['485e79',M.gloss,4], chalk:['d7ceba',M.clay,1], iron:['805143',M.satin,7]
  };
  function radiusAt(knots,t){
    if(t<=0)return knots[0][1];if(t>=1)return knots[knots.length-1][1];
    let i=1;while(knots[i][0]<t)i++;
    const [a,ra]=knots[i-1],[b,rb]=knots[i],u=(t-a)/(b-a);
    function slope(k){
      if(!k||k===knots.length-1)return k?0:(knots[1][1]-ra)/(knots[1][0]-a);
      const d0=(knots[k][1]-knots[k-1][1])/(knots[k][0]-knots[k-1][0]),d1=(knots[k+1][1]-knots[k][1])/(knots[k+1][0]-knots[k][0]);
      return d0*d1<=0?0:2*d0*d1/(d0+d1);
    }
    return (1+2*u)*(1-u)**2*ra+u*(1-u)**2*(b-a)*slope(i-1)+u*u*(3-2*u)*rb+u*u*(u-1)*(b-a)*slope(i);
  }
  function pot(x,y,z,shape,h,r,finish,opts={}){
    const knots=profiles[shape],recipe=finishes[finish],p=rand(0,TAU),q=rand(0,TAU);
    const base=opts.color||shade(recipe[0],rand(.96,1.045)),m=recipe[1],style=recipe[2]+rand(.02,.94);
    const n=opts.sides||Math.max(32,Math.min(66,Math.round(27+r*92))),angle=opts.angle===undefined?rand(0,TAU):opts.angle;
    const ellipt=rand(.969,1.024),flutes=opts.flutes||0,irregular=opts.irregular||1,wall=Math.min(r*.09,Math.max(.004,h*.027));
    const throwing=rand(15,25),lobe=rand(.003,.009)*irregular;
    const rim=knots[knots.length-1][1]*r;
    const ys=[0];
    for(let k=1;k<knots.length;k++){
      const from=knots[k-1][0],to=knots[k][0],count=Math.max(1,Math.ceil((to-from)*25));
      for(let s=1;s<=count;s++)ys.push(from+(to-from)*s/count);
    }
    const rows=ys.map(t=>({t,r:radiusAt(knots,t)*r,ao:.85+.15*Math.min(t*5,1)}));
    // Fold the lip back into a second profile so the clay body has a readable wall thickness.
    const roll=wall*.62;
    for(let i=1;i<=5;i++){
      const a=PI*i/5;rows.push({t:1,r:rim-roll+roll*Math.cos(a),dy:roll*Math.sin(a),ao:.99-i*.009});
    }
    const floor=Math.min(.23,Math.max(.07,wall*1.7/h));
    for(let j=ys.length-2;j>=0;j--)if(ys[j]>floor){
      const t=ys[j];rows.push({t,r:Math.max(.006,radiusAt(knots,t)*r-2*roll),ao:.59+.37*t});
    }
    rows.push({t:floor,r:Math.max(.004,radiusAt(knots,floor)*r-wall*1.4),ao:.66},{t:floor-.009,r:r*.14,ao:.66},{t:floor-.007,r:.0001,ao:.66});
    function point(row,a){
      const t=row.t,s=Math.sin(Math.PI*t),wave=(Math.sin(3*a+p+.7*t)*.010+Math.sin(2*a+q)*.013+Math.sin(5*a-p+t)*.004)*irregular;
      const ripple=.0037*Math.sin(t*TAU*throwing+.75*Math.sin(a+p))*(1-Math.pow(2*t-1,8));
      const fl=flutes?.045*Math.cos(a*flutes+p+.26*t)*Math.max(0,s)**.8:0;
      let rr=row.r*(1+wave+ripple+fl);
      let yy=t*h+(row.dy||0)+h*lobe*t*t*(Math.sin(3*a+q)+.6*Math.sin(a-p));
      if(shape==='jug'){
        const spout=Math.max(0,Math.cos(a-PI))**12*Math.max(0,(t-.76)/.24)**1.5;
        rr+=r*.33*spout; yy+=h*.052*spout;
      }
      return [Math.cos(a)*rr+r*.019*Math.sin(p)*t,yy,Math.sin(a)*rr*ellipt+r*.014*Math.cos(q)*t];
    }
    at(x,y,z,angle,()=>{
      contact(0,0,0,r*knots[0][1]*1.86,r*knots[0][1]*1.83,.43);
      const g=group(m),first=g.vs.length/G.stride;
      const bodyStart=g.ix.length;
      const grid=rows.map(row=>Array.from({length:n},(_,j)=>point(row,j/n*TAU)));
      for(let i=0;i<rows.length;i++){
        const row=rows[i],c=shade(base,row.ao);
        for(let j=0;j<=n;j++){
          const jj=j%n,da=sub(grid[i][(jj+1)%n],grid[i][(jj+n-1)%n]);
          const dh=sub(grid[Math.min(i+1,rows.length-1)][jj],grid[Math.max(0,i-1)][jj]),nm=unit(cross(dh,da));
          vertex(g,grid[i][jj],nm,c,j/n,row.t,m,style);
          if(i<rows.length-1&&j<n){const k=first+i*(n+1)+j;g.ix.push(k,k+n+1,k+1,k+1,k+n+1,k+n+2);}
        }
      }
      // Distance meshes reuse the same vertices and preserve the foot, shoulder and lip.
      const far=[],keep=rows.map((row,i)=>i).filter(i=>i===0||i===rows.length-1||i%4===0||knots.some(k=>Math.abs(rows[i].t-k[0])<.00001));
      const cols=[];for(let j=0;j<n;j+=2)cols.push(j);cols.push(n);
      for(let i=0;i<keep.length-1;i++)for(let j=0;j<cols.length-1;j++){
        const a=first+keep[i]*(n+1)+cols[j],b=first+keep[i+1]*(n+1)+cols[j],step=cols[j+1]-cols[j];
        far.push(a,b,a+step,a+step,b,b+step);
      }
      (g.potteryLods||(g.potteryLods=[])).push({start:bodyStart,end:g.ix.length,far});
      if(shape==='jug'||opts.handle){
        const count=opts.handle===2?2:1;
        for(let k=0;k<count;k++)at(0,0,0,k*PI,()=>{
          const s=shape==='jug'?.84:.87,end=shape==='jug'?.33:.25;
          const path=Array.from({length:23},(_,i)=>{const u=i/22;
            return [r*(radiusAt(knots,s)*(1-u)+radiusAt(knots,end)*u+.58*Math.sin(u*PI)**.72)-.005,
              h*(s+(end-s)*u+.09*Math.sin(u*TAU)),r*(.026*Math.sin(u*PI+p))];});
          tube(path,t=>Math.max(.006,r*(.088+.052*Math.abs(t*2-1)**3)),base,m,10);
        });
      }
      if(opts.spout){
        const path=Array.from({length:16},(_,i)=>{const t=i/15;
          return [-r*(.69+1.17*t+.13*Math.sin(t*PI)),h*(.33+.65*t-.094*Math.sin(t*PI)),.014*r*Math.sin(t*PI)];
        });
        const segs=20,shell=group(m),baseIndex=shell.vs.length/G.stride;
        const crossSection=(i,j,inside)=>{
          const t=i/15,a=TAU*j/segs,tangent=unit(sub(path[Math.min(15,i+1)],path[Math.max(0,i-1)]));
          const up=[tangent[1],-tangent[0],0];
          const rad=r*(.315*(1-t)**1.5+.116+.017*t**9)-(inside?.0046:0);
          const n=[up[0]*Math.cos(a),up[1]*Math.cos(a),Math.sin(a)];
          const pt=path[i].map((v,k)=>v+n[k]*rad);
          return {pt,n:inside?n.map(v=>-v):n};
        };
        for(let side=0;side<2;side++)for(let i=0;i<16;i++)for(let j=0;j<=segs;j++){
          const {pt,n}=crossSection(i,j,side===1);
          vertex(shell,pt,n,side?shade(base,.60+.27*i/15):base,j/segs,i/15,m);
          if(i<15&&j<segs){const k=baseIndex+(side*16+i)*(segs+1)+j;
            if(!side)shell.ix.push(k,k+segs+1,k+1,k+1,k+segs+1,k+segs+2);
            else shell.ix.push(k,k+1,k+segs+1,k+1,k+segs+2,k+segs+1);}
        }
        for(let j=0;j<segs;j++){
          const a=crossSection(15,j,false).pt,b=crossSection(15,j+1,false).pt,c=crossSection(15,j+1,true).pt,d=crossSection(15,j,true).pt;
          G.face([a,b,c,d],base,m,unit(sub(path[15],path[14])));
        }
      }
      if(opts.lid){
        cyl(0,h+.011,0,rim*1.04,rim*.94,.021,base,m,n);
        blob(0,h+.023,0,rim*.99,.025,rim*.99,base,m,.015,22);
        cyl(0,h+.047,0,r*.1,r*.13,.026,base,m,14);blob(0,h+.068,0,r*.21,.025,r*.21,base,m,.025,16);
      }
    });
    return h;
  }
  return {pot,profiles,finishes};
})();

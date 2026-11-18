import * as T from 'three';
import { Batch, TAU, clamp, color, curvePoints, irregularStem, mix, pick, rand, seeded, v } from './geometry.js';
import { tintSet } from './textures.js';

const palettes = {
  monstera:tintSet([0x305d3a,0x366338,0x3e703d,0x3d724c,0x537b44,0x295741]),
  elephant:tintSet([0x3c794a,0x37684c,0x4b8150,0x3e7242,0x427547,0x3b6546]),
  banana:tintSet([0x657d3a,0x718836,0x567541,0x537842,0x78914a]),
  palm:tintSet([0x496740,0x4a743a,0x5b793c,0x698441,0x3e6542]),
  fern:tintSet([0x607d33,0x678c3b,0x6f943e,0x879747,0x507439,0x42623b]),
  nest:tintSet([0x6d873d,0x5b803e,0x7d974b,0x6e8849,0x557747]),
  ginger:tintSet([0x757f40,0x768347,0x788a52,0x566b41,0x466144]),
  vine:tintSet([0x486940,0x547948,0x547849,0x456b42,0x68844c]),
  epiphyte:tintSet([0x776347,0x695c49,0x826b52,0x58634c,0x597354]),
  ground:tintSet([0x597445,0x6b8446,0x507847,0x6c7943,0x527349,0x455b37]),
  outer:tintSet([0x495f42,0x6d7e54,0x4c6147,0x657854,0x526b48]),
  senescent:tintSet([0x7c6242,0x715841,0x77604a,0x8a7751,0x61563b]),
};
const trunkTints=tintSet([0x715941,0x716149,0x715640,0x5c4e3a,0x635642,0x6d6249,0x615743]);
const frondStems=tintSet([0x718446,0x64793e,0x799250,0x697841,0x687043]);
const shootTints=tintSet([0x738751,0x708051,0x687d49,0x788851,0x526a43]);
const dryTips=tintSet([0x80714c,0x6c603e,0x786140,0x8d7950]);

function dir(angle) {
  return v(Math.cos(angle),0,Math.sin(angle));
}
const lightGreen=color(0x9ca658);
const browning=color(0x847444);

function blade(batch, start, end, halfWidth, tint, options={}) {
  const {
    style='broad', hump=.08, drop=.08, twist=0, bend=0, steps=10, slices=6,
    gloss=0, senescence=0, phase=0,
  }=options;
  const delta=end.clone().sub(start);
  const along=v(delta.x,0,delta.z).normalize();
  if(along.lengthSq()<.001) along.set(0,0,1);
  const across=v(along.z,0,-along.x);
  const deepClefts=style==='monstera';
  const tears=style==='banana';

  function width(t,s){
    if(style==='heart' || style==='monstera'){
      let w=Math.pow(Math.max(.00001,Math.sin(Math.PI*t**.68)),.72)*(1.09-.19*t);
      if(deepClefts){
        const phaseShift=s<0?.016:-.013;
        for(const target of [.37,.49,.61,.724,.833]){
          const g=(t-target-phaseShift)/.022;
          w*=1-.56*Math.exp(-g*g);
        }
      }
      return w;
    }
    if(tears){
      let w=Math.pow(Math.max(.00001,Math.sin(Math.PI*t**.88)),.53);
      const rip=Math.pow(Math.max(0,Math.sin(t*53.0+(s<0?2.5:.0)+phase)),18);
      if(t>.31 && t<.92) w*=1-rip*.40;
      return w;
    }
    if(style==='strap') return Math.pow(Math.max(.00001,Math.sin(Math.PI*t**.95)),.62)*(.73+.34*t);
    if(style==='pinna') return Math.pow(Math.max(.00001,Math.sin(Math.PI*t**.76)),.77);
    return Math.pow(Math.max(.00001,Math.sin(Math.PI*t**.80)),.77);
  }
  function point(t,s){
    const w=halfWidth*width(t,s);
    const wave=Math.sin(Math.PI*t);
    const terrace=(s*s)*drop*wave;
    let pitch=twist*s*w*(.36+t) - terrace;
    if(tears) pitch += w*s*s*(.12*Math.sin(t*45+phase) + .06*Math.sin(t*72));
    if(style==='strap') pitch += w*s*s*.29*Math.sin(t*31+phase);
    if(deepClefts) pitch += w*s*s*.16*Math.sin(t*48+phase+(s<0?0:1.5));
    const wingback = (style==='heart'||deepClefts) ? -.21*w*Math.sin(t*7)*s*s : 0;
    return start.clone().addScaledVector(delta,t)
      .addScaledVector(along,wingback)
      .addScaledVector(across,s*w + bend*Math.sin(Math.PI*t*1.2))
      .add(v(0,hump*wave + pitch,0));
  }
  function tintAt(t,s){
    const side=Math.abs(s);
    const variation=.87 + .073*Math.sin(t*11+phase) + .115*Math.cos(t*5.9+s*2+phase);
    const rim=1-.18*side*side;
    return tint.clone().multiplyScalar((.82+.21*Math.sin(Math.PI*t*.90))*variation*rim)
      .lerp(lightGreen,gloss*(1-side)**7*(1-t*.48))
      .lerp(browning,senescence*clamp((t-.57)*2+side**8,0,1));
  }
  function vertex(t,s){
    const df=point(Math.min(.9999,t+.003),s).sub(point(Math.max(.0001,t-.003),s));
    const ds=point(t,Math.min(1,s+.008)).sub(point(t,Math.max(-1,s-.008)));
    const norm=df.cross(ds).normalize();
    if(norm.lengthSq() < .1) norm.set(0,1,0);
    return batch.vertex(point(t,s),norm,tintAt(t,s),(s+1)*.5,t);
  }
  function outside(t,s){
    if(!deepClefts) return true;
    for(let i=0;i<4;i++){
      const center=.296+i*.127+(s<0?.025:0);
      const u=(t-center)/(.024+i*.004);
      const c=.43+.065*Math.sin(i*1.8+phase+(s<0?1:0));
      const w=(Math.abs(s)-c)/(.115+i*.011);
      if(u*u+w*w<1) return false;
    }
    return true;
  }
  function edge(a,b){
    let inside=a.out?a:b, voidSide=a.out?b:a;
    for(let pass=0;pass<5;pass++){
      const t=(inside.t+voidSide.t)*.5, s=(inside.s+voidSide.s)*.5;
      if(outside(t,s)) inside={t,s};
      else voidSide={t,s};
    }
    return vertex(inside.t,inside.s);
  }
  function facet(a,b,c){
    if(a.out && b.out && c.out) {
      batch.triangle(a.index,b.index,c.index);
      return;
    }
    if(!a.out && !b.out && !c.out) return;
    const clipped=[];
    const points=[a,b,c];
    for(let k=0;k<3;k++){
      const from=points[k], to=points[(k+1)%3];
      if(from.out) clipped.push(from.index);
      if(from.out!==to.out) clipped.push(edge(from,to));
    }
    for(let k=2;k<clipped.length;k++) batch.triangle(clipped[0],clipped[k-1],clipped[k]);
  }
  const grid=[];
  for(let i=0;i<=steps;i++) for(let j=0;j<=slices;j++){
    const t=.0002+(i/steps)*.9996,s=(j/slices)*2-1;
    const out=outside(t,s);
    grid.push({t,s,out,index:out?vertex(t,s):-1});
  }
  const stride=slices+1;
  for(let i=0;i<steps;i++) for(let j=0;j<slices;j++){
    const row=i*stride+j;
    facet(grid[row],grid[row+stride],grid[row+stride+1]);
    facet(grid[row],grid[row+stride+1],grid[row+1]);
  }
  return t=>point(t,0);
}

function strongMidrib(batch,point,radius,tint) {
  const points=curvePoints(t=>point(mix(.015,.89,t)).add(v(0,.004,0)),6);
  batch.cord(points,radius,tint,7,4);
}

function beds(batches,rng,distant) {
  const { leaf,fern,banana,accent,bark,stem,dry }=batches;

  function monstera(x,y,z,s,angle=0,n=8){
    const root=v(x,y,z);
    for(let i=0;i<n;i++){
      const a=angle+i*2.399+rand(rng,-.17,.17);
      const forward=dir(a);
      const sv=rand(rng,.64,1.22)*s;
      const leafStart=root.clone().addScaledVector(forward,rand(rng,.14,.49)*s)
        .add(v(0,sv*rand(rng,.62,1.40),0));
      const leafEnd=leafStart.clone().addScaledVector(forward,sv*rand(rng,.55,.87))
        .add(v(0,sv*rand(rng,-.44,.23),0));
      const petiole=[
        root.clone().addScaledVector(forward,.031),
        root.clone().lerp(leafStart,.52).add(v(-.04,.05,.021)),
        leafStart,
      ];
      stem.cord(petiole,.016*sv,pick(rng,shootTints),6,5);
      const heavy=i%5!==3;
      const path=blade(leaf,leafStart,leafEnd,rand(rng,.27,.40)*sv,pick(rng,palettes.monstera),{
        hump:sv*.14,drop:sv*.15,twist:rand(rng,-.46,.61),bend:rand(rng,-.066,.077)*sv,
        style:heavy?'monstera':'heart',steps:heavy?25:12,slices:heavy?14:8,
        gloss:.15,senescence:i%4===1?.41:.08,phase:rand(rng,0,TAU),
      });
      strongMidrib(stem,path,sv*.0048,pick(rng,shootTints));
    }
  }

  function elephant(x,y,z,s,aim=0,n=7){
    const root=v(x,y,z);
    for(let i=0;i<n;i++){
      const a=aim+i*2.399+rand(rng,-.3,.3);
      const f=dir(a), sv=rand(rng,.67,1.17)*s;
      const at=root.clone().addScaledVector(f,sv*rand(rng,.10,.54)).add(v(0,sv*rand(rng,.68,1.92),0));
      const left=at.clone().addScaledVector(f,-sv*.15).add(v(0,sv*.047,0));
      const end=at.clone().addScaledVector(f,sv*rand(rng,.7,1.23)).add(v(0,sv*rand(rng,-.6,-.11),0));
      stem.cord([
        root.clone().addScaledVector(f,.045),
        root.clone().lerp(at,.38).add(v(0,sv*.088,.015)),
        at.clone().lerp(root,.16).addScaledVector(f,-.04),at
      ],sv*.020,pick(rng,shootTints),distant?5:8,distant?4:6);
      const path=blade(leaf,left,end,rand(rng,.32,.48)*sv,pick(rng,palettes.elephant),{
        style:'heart',hump:sv*.125,drop:sv*.19,twist:rand(rng,-.32,.4),
        bend:rand(rng,-.07,.08),steps:distant?7:15,slices:distant?4:10,gloss:.18,phase:i*1.3,senescence:i%3===0?.36:.09,
      });
      if(!distant) strongMidrib(stem,path,sv*.0045,pick(rng,shootTints));
    }
  }

  function treeFern(x,y,z,s,angle=0,fronds=11){
    const root=v(x,y,z);
    const h=s*rand(rng,1.52,1.74);
    const curve=curvePoints(t=>root.clone().add(v(.18*s*t*t,h*t,.08*s*Math.sin(t*4.6))),14);
    const radius=curve.map((_,i)=>s*(.116+.049*(1-i/14)**2+.046*(i/14)**6));
    irregularStem(bark,curve,radius,pick(rng,trunkTints),rng,13);
    // Scales and old stipe bases broaden the crown and make the trunk read as fibrous.
    for(let j=0;j<58;j++){
      const t=rand(rng,.018,.99), a=rand(rng,0,TAU);
      const at=root.clone().add(v(.18*s*t*t,h*t,.08*s*Math.sin(t*4.6)));
      const f=dir(a);
      const b=at.clone().addScaledVector(f,s*(.118+.035*(1-t)**2));
      const tip=b.clone().addScaledVector(f,s*rand(rng,.029,.062)).add(v(0,s*rand(rng,.03,.095),0));
      bark.rod(b,tip,s*rand(rng,.014,.028),pick(rng,trunkTints),5);
    }
    for(let i=0;i<8;i++){
      const a=rand(rng,0,TAU), f=dir(a);
      const out=rand(rng,.2,.44)*s;
      const foot=root.clone().addScaledVector(f,out).add(v(0,.012,0));
      irregularStem(bark,[foot,foot.clone().lerp(root,.6).add(v(0,.084*s,0)),
        root.clone().add(v(0,rand(rng,.14,.23)*s,0))],
        [s*.013,s*.032,s*.057],pick(rng,trunkTints),rng,6);
    }
    const crown=curve.at(-1);
    for(let i=0;i<fronds;i++){
      const angle0=angle+i*2.399+rand(rng,-.21,.21);
      const f=dir(angle0), side=v(-f.z,0,f.x);
      const r=s*rand(rng,.94,1.42);
      const hi=rand(rng,.28,.68)*s, low=rand(rng,.25,.74)*s;
      const center=t=>crown.clone().addScaledVector(f,r*(.07+t*.98))
        .addScaledVector(side,.074*Math.sin(t*5+i))
        .add(v(0,hi*Math.sin(t*Math.PI*.92)-low*t*t+(i%3===0?.23*t:0),0));
      stem.cord(curvePoints(center,8),.012*s,pick(rng,frondStems),13,5);
      const count=i%3===0?16:14;
      const tint=pick(rng,palettes.fern);
      for(let j=0;j<count;j++) for(const sign of [-1,1]){
        const t=.147+j/count*.785+rand(rng,-.012,.012)+(sign>0?.009:0);
        const at=center(t);
        const size=(.37*Math.pow(Math.sin(Math.PI*t**.67),.78)+.017)*s*rand(rng,.83,1.11);
        const tip=at.clone().addScaledVector(side,sign*size).addScaledVector(f,size*(.33+t*.24))
          .add(v(0,size*rand(rng,-.31,-.085),0));
        blade(fern,at,tip,size*rand(rng,.115,.19),tint,{
          style:'pinna',hump:size*.13,drop:size*.16,twist:rand(rng,-.27,.28),steps:5,slices:2,
          senescence:j<1?.32:.07,phase:i*.51+j*.34,
        });
      }
      blade(fern,center(.87),center(1).addScaledVector(f,.05*s),.024*s,tint,{steps:4,slices:2});
    }
    for(let i=0;i<3;i++){
      const f=dir(i*2.399+angle);
      const side=v(-f.z,0,f.x);
      const at=crown.clone().addScaledVector(f,.05*s);
      const points=curvePoints(t=>at.clone().addScaledVector(f,s*(.22*t+.07*Math.sin(t*4.7)))
        .addScaledVector(side,s*.077*Math.sin(t*5))
        .add(v(0,s*(.48*t-.054*Math.sin(t*7)),0)),10);
      stem.cord(points,s*.013,pick(rng,frondStems),14,5);
      for(let j=0;j<7;j++){
        const p=points[j+3], dr=side.clone().multiplyScalar(j%2===0?1:-1);
        blade(fern,p,p.clone().addScaledVector(dr,rand(rng,.042,.10)*s).add(v(.006,.077*s,.014)),
          .017*s,palettes.fern[2],{steps:4,slices:2});
      }
    }
  }

  function fanPalm(x,y,z,s){
    const root=v(x,y,z);
    const h=s*2.97;
    const crown=root.clone().add(v(.28*s,h,-.22*s));
    const path=curvePoints(t=>root.clone().lerp(crown,t).add(v(-.14*s*Math.sin(t*4),0,.05*Math.sin(t*7))),23);
    irregularStem(bark,path,path.map((_,i)=>s*(.113+.052*(1-i/23)**7)),
      color(0x85816b),rng,14);
    for(let j=0;j<25;j++){
      const t=(j+.46)/25;
      const center=path[Math.floor(t*23)].clone().lerp(path[Math.ceil(t*23)],t*23%1);
      const r=s*(.117+.043*(1-t)**7);
      const ring=curvePoints(u=>center.clone().add(v(r*Math.cos(TAU*u),s*.018*Math.cos(TAU*u+.55),r*Math.sin(TAU*u))),10);
      for(let i=1;i<ring.length;i++) bark.rod(ring[i-1],ring[i],s*.011,pick(rng,trunkTints),4);
    }
    for(let i=0;i<10;i++){
      const a=i*2.399+rand(rng,-.27,.27);
      const f=dir(a), across=v(-f.z,0,f.x);
      const sv=rand(rng,.75,1.14)*s;
      const hand=crown.clone().addScaledVector(f,sv*rand(rng,.49,.82))
        .add(v(0,sv*rand(rng,-.18,.31),0));
      stem.cord([crown.clone(),crown.clone().lerp(hand,.48).add(v(0,.10*sv,0)),hand],
        .022*sv,pick(rng,shootTints),8,6);
      const tint=pick(rng,palettes.palm);
      const wing=rand(rng,.81,1.02);
      for(let j=0;j<13;j++){
        const q=(j-6)/6;
        const wide=1-Math.abs(q)**1.4*.31;
        const tip=hand.clone().addScaledVector(f,wide*sv*wing*(1-.65*q*q))
          .addScaledVector(across,q*sv*wing*.86).add(v(0,sv*(-.52+.38*q*q+.17*Math.cos(i)),0));
        const base=hand.clone().addScaledVector(across,q*.073*sv);
        const width=(.107+.009*Math.cos(j*3))*sv;
        blade(banana,base,tip,width,tint,{hump:.125*sv,drop:.040*sv,twist:(j%2-.5)*.35,
          steps:10,slices:4,style:'strap',gloss:.13,phase:i*.93+j*.59,senescence:j%6===0?.32:.08});
      }
    }
  }

  function bananaClump(x,y,z,s,lean=1){
    const root=v(x,y,z);
    const h=s*2.91;
    const crown=root.clone().add(v(.28*s*lean,h,.12*s*lean));
    const path=curvePoints(t=>root.clone().lerp(crown,t).add(v(-.09*s*Math.sin(t*4),0,.04*s*Math.sin(t*6))),13);
    irregularStem(bark,path,path.map((_,i)=>s*(.10+.064*(1-i/13)**1.1)),color(0x78774b),rng,11);
    for(let i=0;i<13;i++){
      const a=i*2.399, f=dir(a);
      const from=path[Math.floor(rand(rng,1,10))].clone().addScaledVector(f,.12*s);
      const tip=from.clone().addScaledVector(f,s*rand(rng,.026,.15)).add(v(0,s*rand(rng,.21,.52),0));
      blade(bark,from,tip,s*.059,pick(rng,palettes.senescent),{
        style:'strap',steps:7,slices:3,twist:.4,hump:.02*s,drop:.03*s,senescence:.21,
      });
    }
    for(let i=0;i<8;i++){
      const a=i*2.399+rand(rng,-.18,.18);
      const f=dir(a);
      const sv=s*rand(rng,.73,1.17);
      const join=crown.clone().addScaledVector(f,sv*(i===0?.16:rand(rng,.24,.56)))
        .add(v(0,sv*rand(rng,-.24,.35),0));
      const tip=join.clone().addScaledVector(f,sv*rand(rng,1.09,1.73))
        .add(v(0,sv*(i===0?.56:rand(rng,-.95,.32)),0));
      stem.cord([crown.clone().add(v(0,i*-.022*s,0)),crown.clone().lerp(join,.54).add(v(0,.046*s,0)),join],
        .023*sv,pick(rng,shootTints),7,6);
      const pin=blade(banana,join,tip,sv*rand(rng,.24,.40),pick(rng,palettes.banana),{
        style:'banana',steps:23,slices:8,hump:sv*rand(rng,.12,.36),drop:sv*.14,
        twist:rand(rng,-.49,.46),bend:rand(rng,-.11,.12)*sv,phase:i*.71,senescence:i%3===0?.30:.12,
      });
      strongMidrib(stem,pin,sv*.007,pick(rng,shootTints));
    }
    const f=dir(5.03+lean*.95);
    const b=crown.clone().add(v(0,-h*.32,0));
    const tip=b.clone().addScaledVector(f,.87*s).add(v(0,-1.08*s,0));
    blade(dry,b,tip,s*.189,pick(rng,palettes.senescent),
      {style:'banana',steps:14,slices:5,hump:.23*s,drop:.07*s,twist:.45,senescence:.61});
  }

  function nest(x,y,z,size,n=10,palette=palettes.nest){
    const root=v(x,y,z);
    const angle=rand(rng,0,TAU);
    for(let i=0;i<n;i++){
      const a=angle+i*2.399+rand(rng,-.22,.22);
      const len=rand(rng,.53,1.01)*size;
      const f=dir(a);
      const from=root.clone().addScaledVector(f,.041*size).add(v(0,i*.002,0));
      const tip=root.clone().addScaledVector(f,len*rand(rng,.34,.92)).add(v(0,len*rand(rng,.22,1.03),0));
      blade(fern,from,tip,len*rand(rng,.073,.145),pick(rng,palette),{
        style:'strap',steps:distant?6:10,slices:distant?2:4,hump:len*.22,drop:len*.045,twist:rand(rng,-.46,.46),
        bend:rand(rng,-.06,.06)*size,phase:i*.79,senescence:rand(rng,.04,.32),
      });
    }
  }

  function lace(x,y,z,s,palette=palettes.ground,n=6){
    const root=v(x,y,z);
    const phase=rand(rng,0,TAU);
    for(let i=0;i<n;i++){
      const f=dir(phase+i*2.399), side=v(-f.z,0,f.x);
      const r=rand(rng,.58,.95)*s;
      const center=t=>root.clone().addScaledVector(f,r*t).add(v(0,s*(.35*Math.sin(t*Math.PI*.78)+.11*t),0));
      stem.cord(curvePoints(center,4),.005*s+.001,pick(rng,frondStems),distant?4:5,4);
      const tint=pick(rng,palette);
      const count=distant?7:8;
      for(let j=0;j<count;j++) for(const sign of [-1,1]){
        const t=.20+(j/count)*.80+(sign===1?.028:0);
        const from=center(Math.min(t,.97));
        const length=s*.27*Math.sin(t*Math.PI*.92)*rand(rng,.75,1.11);
        const to=from.clone().addScaledVector(side,length*sign).addScaledVector(f,length*.44);
        to.y+=length*rand(rng,-.08,.32);
        blade(fern,from,to,length*.20,tint,{steps:distant?3:4,slices:distant?1:2,hump:length*.13,drop:length*.15,style:'pinna',phase:j*.79});
      }
    }
  }

  function herb(x,y,z,s,n=7,palette=palettes.ground){
    const origin=v(x,y,z);
    const angle=rand(rng,0,TAU);
    for(let i=0;i<n;i++){
      const f=dir(angle+i*2.399);
      const l=rand(rng,.42,.83)*s;
      const b=origin.clone().addScaledVector(f,l*.27).add(v(0,l*rand(rng,.21,.92),0));
      const tip=b.clone().addScaledVector(f,l*.72).add(v(0,l*rand(rng,-.28,.36),0));
      const petiole=rand(rng,.007,.012)*s+.001, petioleTint=pick(rng,shootTints);
      if(!distant || i%2===0) stem.rod(origin,b,petiole,petioleTint,distant?3:4);
      blade(leaf,b,tip,l*rand(rng,.18,.39),pick(rng,palette),{
        style:i%3===1?'heart':'broad',steps:distant?4:6,slices:distant?2:4,hump:l*.125,drop:l*.09,
        twist:rand(rng,-.5,.5),gloss:.13,phase:i*.71,senescence:i%5===2?.28:.08,
      });
    }
  }

  function rosette(x,y,z,s,flower=true){
    const root=v(x,y,z);
    const angle=rand(rng,0,TAU);
    const purple=tintSet([0x705446,0x78564a,0x7b6650,0x736447,0x817251]);
    for(let i=0;i<15;i++){
      const f=dir(angle+i*2.399);
      const l=s*(1.10-i/22)*rand(rng,.77,1.19);
      const a=root.clone().addScaledVector(f,l*.034).add(v(0,.004*i,0));
      const b=root.clone().addScaledVector(f,l*rand(rng,.34,.76)).add(v(0,l*rand(rng,.5,.91),0));
      blade(fern,a,b,l*.091,pick(rng,i>6 && flower?purple:palettes.ginger),{
        style:'strap',hump:l*.15,drop:l*.062,steps:9,slices:4,twist:rand(rng,-.17,.25),phase:i*.51,
      });
    }
    if(!flower) return;
    const top=root.clone().add(v(.08*s,.87*s,-.045*s));
    stem.rod(root,top,.023*s,pick(rng,frondStems),6);
    const sepals=tintSet([0x975649,0xaa6a56,0xab735b,0x905449,0x8e5c57]);
    for(let j=0;j<17;j++){
      const t=.46+j*.029;
      const at=root.clone().lerp(top,t);
      const f=dir(angle+2.399*j);
      const b=at.clone().addScaledVector(f,s*(.22*(1-t)+.026)).add(v(0,s*.066,0));
      blade(accent,at,b,s*rand(rng,.018,.037),pick(rng,sepals),{
        style:'heart',steps:5,slices:3,drop:s*.012,hump:s*.034,phase:j*.67,
      });
    }
  }

  function vine(points, s=.44, count=20, palette=palettes.vine){
    const path=new T.CatmullRomCurve3(points);
    const samples=curvePoints(t=>path.getPoint(t),12);
    stem.cord(samples,.010*s+.004,color(0x686b44),Math.ceil(count*1.2),5);
    for(let i=0;i<count;i++){
      const t=(i+.1)/count, a=path.getPoint(t);
      const f=dir(i*2.399+rand(rng,-.25,.25));
      const at=a.clone().addScaledVector(f,s*rand(rng,.12,.37)).add(v(0,-.11*s,0));
      stem.rod(a,at,.008*s+.001,pick(rng,shootTints),4);
      const tip=at.clone().addScaledVector(f,s*rand(rng,.34,.74))
        .add(v(0,s*rand(rng,-.46,.14),0));
      blade(leaf,at,tip,rand(rng,.13,.26)*s,pick(rng,palette),{
        style:'heart',steps:distant?5:7,slices:distant?2:4,hump:s*.10,drop:s*.07,twist:rand(rng,-.62,.57),gloss:.12,phase:i*.54,
      });
    }
  }

  function litter(x0,x1,y,z0,z1,count){
    for(let i=0;i<count;i++){
      const x=rand(rng,x0,x1), z=rand(rng,z0,z1);
      const at=v(x,y+rand(rng,-.006,.027),z);
      const len=rand(rng,.033,.19), s=rand(rng,.018,.058);
      const f=dir(rand(rng,0,TAU));
      const end=at.clone().addScaledVector(f,len).add(v(0,rand(rng,-.018,.011),0));
      const tint=pick(rng,rng()<.42?dryTips:palettes.senescent);
      blade(dry,at,end,s,tint,{
        steps:4,slices:2,hump:rand(rng,.005,.026),drop:rand(rng,.006,.017),
        twist:rand(rng,-.65,.65),style:'heart',phase:i*.37,senescence:.20,
      });
    }
  }

  return { monstera,elephant,treeFern,fanPalm,bananaClump,nest,lace,herb,rosette,vine,litter };
}

function group(parent,m,name,rng,build,{ cast=true, distant=false, wall=0 }={}) {
  const meshGroup=new T.Group();
  meshGroup.name=name;
  parent.add(meshGroup);
  const shadow={cast,receive:!distant};
  const batches={
    leaf:new Batch(m.leaf,name+' / glossy foliage',shadow),
    banana:new Batch(m.banana,name+' / broad and pleated fronds',shadow),
    fern:new Batch(m.fern,name+' / fern foliage',shadow),
    bark:new Batch(m.bark,name+' / textured stems',shadow),
    stem:new Batch(m.plain,name+' / petioles and rachises',shadow),
    accent:new Batch(m.accent,name+' / inflorescences',shadow),
    dry:new Batch(m.accent,name+' / broken and fallen leaves',{cast:false,receive:!distant}),
  };
  build(beds(batches,rng,distant),rng);
  for(const batch of Object.values(batches)){
    if(wall) shapeToWindow(batch,wall);
    batch.assemble(meshGroup);
  }
}

// Leaves growing against intact side panes flatten gradually toward the glass.
function shapeToWindow(batch, side) {
  const begins=4.35, limit=4.696, span=limit-begins;
  for(let i=0;i<batch.p.length;i+=3){
    const x=batch.p[i]*side;
    if(x<begins) continue;
    const constriction=Math.exp(-(x-begins)/span);
    batch.p[i]=side*(begins+span*(1-constriction));
    const nx=batch.n[i]/constriction, ny=batch.n[i+1], nz=batch.n[i+2];
    const length=Math.hypot(nx,ny,nz);
    if(length>0){
      batch.n[i]=nx/length;
      batch.n[i+1]=ny/length;
      batch.n[i+2]=nz/length;
    }
  }
}

export function buildFoliage(scene,m) {
  const all=new T.Group();
  all.name='Tropical specimens and volunteer growth';
  scene.add(all);
  const soil=.315;
  group(all,m,'Entrance, arrowleaf and split-leaf bed',seeded(93213),(p,rng)=>{
    p.monstera(-.83,soil,4.03,.99,.6,8);
    p.elephant(.81,soil,3.88,.92,-.6,8);
    p.monstera(-1.03,soil,2.67,.68,2.8,7);
    p.nest(.68,soil,5.12,.78,11);
    p.rosette(-.97,soil,5.12,.62);
    p.lace(-.24,soil,5.06,.64,palettes.ground,6);
    p.lace(1.29,soil,4.8,.62,palettes.fern,6);
    p.herb(-1.39,soil,4.66,.51,8);
    p.rosette(.41,soil,3.20,.69,false);
    p.herb(1.37,soil,2.7,.52,6,palettes.epiphyte);
    p.nest(.03,soil,2.76,.89,10);
    p.litter(-1.46,1.46,soil,2.18,5.25,102);
    for(let i=0;i<17;i++){
      const x=pick(rng,[-1,1])*rand(rng,.78,1.48);
      p.herb(x,soil+.01,rand(rng,2.3,5.34),rand(rng,.21,.43),5);
    }
  });
  group(all,m,'Tree fern canopy and banana clump',seeded(441),(p,rng)=>{
    p.treeFern(-.53,soil,-.39,1.26,1.8,13);
    p.bananaClump(.71,soil,.89,1.02,1);
    p.bananaClump(.88,soil,-.84,.72,-1);
    p.elephant(-.86,soil,-1.80,.83,.9,7);
    p.nest(-1.07,soil,1.15,.71,12);
    p.nest(.03,soil,1.87,.65,10);
    p.lace(-1.27,soil,.29,.64,palettes.fern,7);
    p.lace(-1.24,soil,-1.2,.74,palettes.fern,6);
    p.rosette(1.2,soil,1.54,.72);
    p.rosette(1.22,soil,-.38,.61,false);
    p.herb(1.35,soil,-1.03,.57,8);
    p.herb(-.95,soil,1.96,.47,7,palettes.epiphyte);
    p.litter(-1.47,1.47,soil,-2.05,2.14,125);
    for(let i=0;i<23;i++){
      const x=pick(rng,[-1,1])*rand(rng,.73,1.45);
      p.herb(x,soil,rand(rng,-2.08,2.15),rand(rng,.18,.39),4);
    }
  });
  group(all,m,'Fan palm and rear understory',seeded(46541),(p,rng)=>{
    p.fanPalm(-.83,soil,-4.32,1.15);
    p.treeFern(.63,soil,-3.77,.83,-1.35,10);
    p.elephant(.88,soil,-2.52,.72,-.3,7);
    p.monstera(.82,soil,-4.99,.69,1.3,6);
    p.nest(-1.03,soil,-3.37,.75);
    p.nest(.29,soil,-5.34,.78,10);
    p.lace(-1.08,soil,-5.24,.69,palettes.ground,7);
    p.lace(.70,soil,-3.22,.64,palettes.fern,6);
    p.lace(1.16,soil,-5.17,.45,palettes.fern,5);
    p.rosette(-1.33,soil,-4.32,.53,false);
    p.rosette(.77,soil,-5.45,.48);
    p.litter(-1.46,1.46,soil,-5.57,-2.12,98);
    for(let i=0;i<19;i++){
      const x=pick(rng,[-1,1])*rand(rng,.67,1.48);
      p.herb(x,soil,rand(rng,-5.57,-2.15),rand(rng,.18,.40),5);
    }
  });
  group(all,m,'West window border and curtain vines',seeded(913),(p,rng)=>{
    p.elephant(-4.34,.171,5.86,.66,-1.7,6);
    p.monstera(-4.37,.17,2.88,.63,0.15,6);
    p.treeFern(-4.34,.167,-2.92,.76,1.7,10);
    p.nest(-4.29,.166,-5.42,.69,11);
    p.nest(-4.30,.17,4.75,.69,11);
    p.rosette(-4.18,.17,1.58,.62);
    p.rosette(-4.22,.167,-3.96,.53,false);
    p.vine([v(-4.55,.32,1.6),v(-4.56,1.40,1.35),v(-4.60,2.43,.48),
      v(-4.45,3.28,-.81),v(-4.05,3.47,-1.67),v(-3.72,3.13,-1.95),v(-3.57,2.48,-1.64)],.57,31);
    p.vine([v(-4.48,.38,-6.38),v(-4.57,1.60,-6.74),v(-4.56,2.67,-6.51),
      v(-4.48,3.24,-5.45),v(-4.22,3.19,-4.52),v(-4.08,2.43,-4.05)],.46,24);
    p.vine([v(-4.66,.47,6.71),v(-4.67,1.68,7.05),v(-4.63,2.56,6.63),
      v(-4.57,3.35,5.77),v(-4.27,3.49,4.55),v(-4.05,2.92,3.99)],.47,22);
    for(let i=0;i<32;i++){
      const x=rand(rng,-4.60,-3.96), z=rand(rng,-6.89,7.35);
      if(i%4===0) p.lace(x,.174,z,rand(rng,.38,.54),palettes.fern,5);
      else p.herb(x,.167,z,rand(rng,.27,.52),5);
    }
    p.litter(-4.64,-3.95,.173,-6.93,7.44,86);
  },{wall:-1});
  group(all,m,'East window border and climbing ginger',seeded(1717),(p,rng)=>{
    p.nest(4.18,.164,6.25,.72,11);
    p.monstera(4.36,.164,4.63,.56,1,6);
    p.elephant(4.34,.163,1.54,.72,3.2,6);
    p.nest(4.22,.166,-.53,.70,10,palettes.fern);
    p.monstera(4.37,.161,-4.21,.57,3.4,6);
    p.rosette(4.23,.157,5.76,.51);
    p.rosette(4.32,.154,-2.69,.53);
    p.rosette(4.23,.154,-5.68,.61,false);
    p.vine([v(4.64,.31,3.72),v(4.63,1.70,3.48),v(4.58,2.7,2.86),
      v(4.55,3.30,2.07),v(4.27,3.50,1.10),v(3.90,3.74,.28)],.48,26);
    p.vine([v(4.62,.33,-2.79),v(4.61,1.84,-2.72),v(4.48,3.14,-1.53),
      v(3.86,3.73,-1.12),v(3.47,3.92,-.52),v(3.16,3.43,-.14)],.52,25);
    p.vine([v(4.37,3.27,-6.13),v(4.07,3.55,-5.48),v(3.86,3.23,-4.77),
      v(3.80,2.77,-4.52)],.40,13,palettes.epiphyte);
    for(let i=0;i<31;i++){
      const x=rand(rng,3.96,4.60), z=rand(rng,-6.68,7.27);
      if(i%3===0) p.lace(x,.158,z,rand(rng,.32,.57),palettes.fern,5);
      else p.herb(x,.153,z,rand(rng,.27,.53),5);
    }
    p.litter(3.94,4.66,.159,-6.69,7.41,81);
  },{wall:1});
  group(all,m,'Scraps on the paths and terrace',seeded(32787),(p)=>{
    p.litter(-3.78,-3.31,.027,-6.97,7.94,57);
    p.litter(-2.22,-1.74,.027,-5.63,5.68,46);
    p.litter(1.72,1.99,.028,-5.39,5.34,36);
    p.litter(3.30,3.80,.028,-6.54,7.36,61);
    p.litter(-3.24,3.18,.025,8.46,11.34,50);
    p.litter(-1.71,3.48,.027,-8.28,-7.10,33);
    p.herb(-3.17,.023,10.88,.32,6);
    p.lace(3.23,.019,9.98,.43,palettes.outer,6);
    p.herb(-3.08,.023,8.48,.37,7);
    p.herb(3.24,.018,10.43,.38,7,palettes.outer);
    p.lace(-3.18,.029,9.49,.41,palettes.fern,6);
  },{cast:false});

  group(all,m,'Planting outside the glazing',seeded(93),(p,rng)=>{
    for(const sign of [-1,1]){
      for(let i=0;i<31;i++){
        const x=sign*rand(rng,4.93,7.15), z=rand(rng,-8.92,9.58);
        const s=rand(rng,.39,.98);
        if(i%6===0) p.elephant(x,-.13,z,s*.72,rand(rng,0,TAU),5);
        else if(i%3===0) p.lace(x,-.132,z,s*.83,palettes.outer,6);
        else if(i%3===1) p.herb(x,-.143,z,s,6,palettes.outer);
        else p.nest(x,-.139,z,s*.87,8,palettes.outer);
      }
      for(let i=0;i<11;i++){
        const z=-10.5+rand(rng,-1.5,.9);
        const x=sign*rand(rng,.6,5.9);
        p.nest(x,-.152,z,rand(rng,.55,1.13),8,palettes.outer);
      }
    }
    p.vine([v(-4.68,-.12,8.66),v(-4.62,1.07,8.58),v(-4.56,2.1,8.53),
      v(-4.23,3.19,8.52),v(-3.67,3.80,8.48),v(-3.33,3.76,8.42)],.58,28,palettes.outer);
    p.vine([v(4.72,.06,8.72),v(4.56,1.18,8.50),v(4.03,2.20,8.53),
      v(3.67,2.61,8.51),v(3.13,2.73,8.48)],.53,23,palettes.outer);
    p.nest(-3.55,-.18,10.12,.73,13,palettes.outer);
    p.nest(3.57,-.18,10.51,.83,13,palettes.outer);
    p.lace(-3.73,-.18,11.12,.67,palettes.outer,7);
    p.lace(3.89,-.18,11.38,.72,palettes.outer,7);
  },{cast:false,distant:true});

  group(all,m,'Plants at the working end of the glasshouse',seeded(7620),(p)=>{
    p.nest(-.53,1.17,-7.98,.34,11);
    p.rosette(.66,1.13,-8.01,.43,false);
    p.herb(1.76,1.18,-8.02,.42,8,palettes.epiphyte);
    p.lace(3.03,.43,-7.83,.68,palettes.fern,7);
    p.monstera(-2.72,.47,-7.89,.56,-.6,5);
    p.nest(-3.85,.17,-7.92,.47,9);
    p.lace(-3.82,2.568,-7.82,.44,palettes.fern,6);
    p.vine([v(-3.82,2.574,-7.82),v(-3.72,2.58,-7.65),v(-3.65,2.45,-7.61),
      v(-3.68,2.26,-7.54),v(-3.65,2.06,-7.49)],.26,11,palettes.vine);
    p.vine([v(-2.38,2.87,-7.75),v(-2.27,2.60,-7.68),v(-2.14,2.15,-7.69),
      v(-1.94,1.72,-7.66)],.34,13,palettes.epiphyte);
    p.vine([v(3.76,3.15,-8.31),v(3.04,3.06,-8.32),v(2.45,2.99,-8.28),
      v(2.29,2.58,-8.21),v(2.17,2.38,-8.22)],.42,16);
  });
}

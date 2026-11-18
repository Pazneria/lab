"use strict";
PH.buildPlanting=function(){
  const {rand,pick,TAU,mix,clamp,add,sub,mul,shift,lerp3,rgb,tint,mat:M,face,box,tube,blob,lathe,ao}=PH;
  const B=PH.botany,H=PH.soilHeight;
  // Three crowns separated by lower, inspectable pockets. The largest fronds spread above the aisles.
  B.aroid(-.36,5.04,1.32);
  B.strelitzia(.39,3.48,1.91,1.11,true);
  B.aroid(.48,1.88,.92,'jewel');
  B.treeFern(-.31,-.15,2.23,.158,1.94,.36);
  B.aroid(.33,-1.74,1.29);
  B.strelitzia(-.34,-3.35,1.43,-1.06,true);
  B.treeFern(.33,-5.12,1.55,.126,1.48,2.41);
  const groups=[
    [-.64,5.99,.54,0],[.54,5.73,.64,1],[-1.02,4.27,.49,1],[.94,4.67,.50,0],
    [-.82,2.71,.66,0],[.96,2.76,.40,1],[-.78,1.51,.64,1],[.83,.94,.65,0],[-.72,.42,.38,0],
    [.91,-.66,.51,1],[-.9,-1.17,.57,0],[-.75,-2.30,.55,1],[.96,-2.85,.59,0],
    [-.77,-3.91,.42,1],[.81,-4.11,.60,0],[-.82,-4.92,.58,1],[-.62,-5.93,.46,0],[.66,-5.98,.52,1]
  ];
  for(const [x,z,s,kind]of groups)(kind?B.softFern:B.rosette)(x,z,s);
  for(const [x,z,s]of [[-.79,3.45,.54],[.76,-3.84,.48],[.04,6.07,.42],[-.89,-.72,.43],[.66,.06,.57]])B.aroid(x,z,s,'jewel');
  // A decaying log under the aroids. The severed end shows a damp, light-colored core.
  const log=[[.94,.48,5.32],[.71,.54,4.87],[.49,.55,4.43],[.34,.52,4.01]];
  tube(log,[.117,.14,.127,.102],rgb('70644e'),M.bark,13,true);
  for(let j=0;j<19;j++){
    const t=rand(0,.97),p=lerp3(log[0],log[3],t);B.moss(p[0]+rand(-.055,.055),p[1]+.10,p[2],rand(.035,.085));
  }
  // Epiphytic vines follow damp posts, then stray onto roof ties and form hanging tips.
  for(const [s,z,start,reach]of [[-1,6.9,.42,2.74],[1,0,.45,3.1],[-1,-4.6,.5,3.26],[1,-6.9,.42,2.41],[1,6.9,.52,2.36]]){
    const path=[];
    for(let i=0;i<=24;i++){
      const t=i/24;path.push([s*(4.05-.072*Math.cos(t*15)-.065*t),start+t*reach,z+.067*Math.sin(t*15)+.10*t]);
    }
    B.runningVine(path,.14,1.10);
    for(let j=0;j<3;j++){
      const p=path[9+j*5],d=j%2?1:-1,branch=[];
      for(let i=0;i<=11;i++){const t=i/11;branch.push(shift(p,-s*.072*Math.sin(t*3.14),.12*Math.sin(t*3.14)-t*t*.23,d*t*(.57+.12*j)));}
      B.runningVine(branch,.15,.83);
    }
    if(reach>3){
      const p=path[24],line=[];
      for(let i=0;i<=22;i++){const t=i/22;line.push(shift(p,-s*1.22*t,.41*Math.sin(t*Math.PI)-.34*t*t,.13*Math.sin(t*6.1)));}
      B.runningVine(line,.125,.87);
      const h=line[19],down=[];
      for(let i=0;i<=14;i++){const t=i/14;down.push(shift(h,.036*Math.sin(t*9),-.77*t,.048*Math.cos(t*6)));}
      B.runningVine(down,.132,.73);
    }
  }
  // Fern spore capsules, liverwort cushions and involute new growth along the curb.
  for(let k=0;k<132;k++){
    const z=rand(-6.17,6.17),s=pick([-1,1]),x=s*rand(.99,1.28),r=rand(.045,.143);
    for(let j=0;j<3;j++){const px=x+rand(-.065,.065),pz=z+rand(-.077,.077);B.moss(px,H(px,pz)+.004,pz,r*rand(.53,1.0));}
    if(k%8===0){
      for(let j=0;j<5;j++){
        const px=x+rand(-.065,.065),pz=z+rand(-.065,.065),p=[px,H(px,pz)+.015,pz],q=shift(p,rand(-.011,.011),rand(.038,.083),rand(-.012,.012));
        tube([p,q],[.0018,.0011],rgb('9b7d4e'),M.fiber,4);blob(...q,.004,.009,.003,rgb('bca36d'),M.fiber,2,5);
      }
    }
  }
  // Patches of moss on masonry follow the damp side in clusters, with exposed stone between.
  for(let k=0;k<72;k++){
    const side=pick([-1,1]),cz=rand(-5.93,5.93),n=Math.floor(rand(3,9)),outer=k%3===0;
    const x=side*(outer?4.00:1.39),y=outer?.571:.403;
    for(let j=0;j<n;j++){const px=x+rand(-.065,.065),pz=cz+rand(-.13,.13);B.moss(px,y-.006,pz,rand(.018,.061));}
  }
  const deposits=['8a7861','7e7158','645641','9b876b','afa283','76664e'];
  for(let k=0;k<850;k++){
    const z=rand(-6.35,6.35),x=rand(-1.265,1.265)*(1-.15*(Math.abs(z)>6.05)),r=rand(.009,.041),y=H(x,z)+.006;
    if(k%4===0)blob(x,y,z,r*1.5,r*.60,r*.83,rgb(pick(deposits)),M.grit,2,5,.28);
    else{
      const a=rand(0,TAU),d=[Math.cos(a)*r,0,Math.sin(a)*r],s=[-d[2]*.42,0,d[0]*.42],p=[x,y,z];
      face([sub(p,d),add(p,s),shift(add(p,d),0,.006,0),sub(p,s)],rgb(pick(deposits)),M.bark);
    }
  }
  for(let k=0;k<110;k++){
    const border=k%6===0,z=rand(-6.15,6.15),x=border?pick([-1,1])*rand(1.57,1.88):rand(-1.23,1.23);
    const y=border?.017:H(x,z)+.02,a=rand(0,TAU),l=rand(.06,.245);
    B.leaf([x,y,z],a,l,l*rand(.16,.31),rand(.006,.036),rand(.001,.016),M.litter,pick(['a7955d','9b7e4d','ad935a','ad9d68','896f49','957f55']),{rib:l>.13,rows:6,cols:4,lean:rand(-.74,.74),vein:'aa9063'});
  }
  // Woodland sorrel creeps through the lower level in irregular colonies.
  for(let k=0;k<30;k++){
    const cx=rand(-1.14,1.14),cz=rand(-6.05,6.05);
    for(let j=0;j<7;j++){
      const x=cx+rand(-.13,.13),z=cz+rand(-.16,.16),p=[x,H(x,z)+.004,z];
      const q=shift(p,rand(-.028,.028),rand(.055,.14),rand(-.032,.032)),a=rand(0,TAU);
      tube([p,q],.0018,rgb('849260'),M.fiber,4);
      for(let h=0;h<3;h++)B.leaf(q,a+h*TAU/3,rand(.030,.049),rand(.019,.031),.015,.011,M.heart,pick(['779356','758f50','658349','8da35e']),{cols:2,rows:4,rib:false});
    }
  }
  const markers=[[-.87,5.94,-.82,1],[1.18,3.30,1.35,2],[-1.13,.59,-1.44,3],[1.17,1.33,1.49,4],[-1.13,-3.72,-1.60,5],[.89,-5.94,2.8,6]];
  for(const [x,z,a,id]of markers)B.marker(x,z,a,id,H(x,z),.33);
  // Sparse plants and wet seams on the exterior apron are limited to the immediate threshold.
  for(const [x,z]of [[-2.16,9.67],[2.25,9.40],[-2.31,10.48],[2.26,10.92],[-2.79,9.79],[2.98,9.63]]){
    for(let i=0;i<12;i++)B.moss(x+rand(-.13,.13),.008,z+rand(-.19,.19),rand(.043,.09));
    B.softFern(x,z,rand(.25,.41),.01);
  }
};
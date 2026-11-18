"use strict";
PH.buildFittings=function(){
  const {rand,pick,TAU,mix,add,sub,mul,shift,lerp3,norm,cross,rgb,tint,mat:M,glass,glassGroups,face,box,beam,tube,lathe,blob,plaque,obstacle}=PH;
  const iron=rgb('506252'),dark=rgb('414b40'),metal=rgb('8a9688'),brass=rgb('ae986a'),wood=rgb('a18a67');
  function glazed(points,colour){
    const start=glass.count;
    const uv=points.map((p,i)=>[p[0]+p[2]*.09,p[1]+p[2]]);
    face(points,colour,M.glass,uv,glass);
    let center=[0,0,0];for(const p of points)center=add(center,mul(p,1/points.length));
    glassGroups.push({offset:start,count:glass.count-start,center});
  }
  // A shallow wired-glass hood and short return screens define the potting recess.
  const left=-2.38,right=2.09,front=-8.24,back=-9.05;
  const height=z=>mix(2.38,2.243,(z-back)/(front-back));
  for(let i=0;i<=5;i++){
    const x=mix(left,right,i/5);
    beam([x,height(back),back],[x,height(front),front],.033,.045,iron,M.paint);
    if(i===5)continue;
    const nx=mix(left,right,(i+1)/5);
    glazed([[x+.015,height(back),back+.013],[nx-.015,height(back),back+.013],[nx-.015,height(front),front-.018],[x+.015,height(front),front-.018]],rgb('c1c9b7'));
  }
  box((left+right)/2,height(front),front,right-left+.06,.061,.075,iron,M.paint);
  for(const x of [left,right]){
    const zz=front-.10;
    box(x,1.56,zz,.051,1.34,.054,iron,M.paint);
    box(x,1.395,(zz+back)/2,.061,.055,zz-back,iron,M.paint);
    box(x,.93,(zz+back)/2,.074,.068,zz-back,iron,M.paint);
    glazed([[x,1.42,back],[x,1.42,zz],[x,height(zz)-.03,zz],[x,height(back)-.03,back]],rgb('cfceb8'));
    for(let j=0;j<4;j++){const z=mix(back,zz,(j+.5)/4);box(x,1.16,z,.044,.402,(zz-back)/4-.007,tint('84917f',rand(.89,1.03)),M.wood);}
    obstacle(x-.03,back,x+.03,zz+.03);
  }
  // A hand wheel drives the opening lights through a worm box and a suspended shaft.
  const wx=-3.884,wz=2.30,wy=1.34;
  box(-4.015,wy,wz,.17,.31,.19,dark,M.zinc);
  tube([[-4.03,wy,wz],[wx+.035,wy,wz]],.033,brass,M.brass,12,true);
  const wheel=[];
  for(let i=0;i<=38;i++){const a=i*TAU/38;wheel.push([wx,wy+.181*Math.cos(a),wz+.181*Math.sin(a)]);}
  tube(wheel,.014,iron,M.paint,9);
  for(let i=0;i<5;i++){
    const a=i*TAU/5,b=a+.19;
    tube([[wx,wy,wz],[wx+.016,wy+.10*Math.cos(b),wz+.10*Math.sin(b)],[wx,wy+.17*Math.cos(a),wz+.17*Math.sin(a)]],[.021,.012,.010],iron,M.paint,7);
  }
  tube([[wx,wy+.181,wz],[wx+.095,wy+.181,wz]],[.011,.014],brass,M.brass,9);
  tube([[wx+.041,wy+.181,wz],[wx+.128,wy+.181,wz]],[.021,.018],rgb('8f7855'),M.wood,11,true);
  tube([[-4.012,wy+.12,wz],[-4.012,3.39,wz]],.013,metal,M.zinc,8);
  tube([[-4.012,3.37,wz],[-3.88,3.50,wz],[-1.02,5.01,wz]],.016,metal,M.zinc,8);
  const axleX=-1.018, axleY=5.01;
  tube([[axleX,axleY,-5.04],[axleX,axleY,5.66]],.014,metal,M.zinc,8);
  for(const z of [-4.60,-2.30,0,2.30,4.60]){
    tube([[axleX,axleY,z],[axleX,5.15,z]],.008,dark,M.zinc,6);
    tube([[axleX,axleY,z-.025],[axleX,axleY,z+.025]],.024,brass,M.brass,9);
  }
  for(const z of [-4.02,-2.86,2.86,4.02]){
    tube([[axleX,axleY,z],[axleX+.16,axleY+.05,z],[axleX+.225,axleY+.36,z]],[.013,.012,.008],metal,M.zinc,7);
  }
  for(const sy of [1.57,1.61])tube([[-4.015,sy,wz-.061],[-4.015,sy,wz+.061]],.013,brass,M.brass,8);
  plaque([-4.007,1.71,wz],[0,0,-1],[0,1,0],.328,.115,11);
  // A few shards stay in their rebates, with pale broken edges visible against the sky.
  const x=4.15,z=-9.2+10*1.15,y=2.49;
  let pts=[[x,y+.024,z+.023],[x,y+.024,z+.773],[x,y+.22,z+.49],[x,y+.17,z+.37],[x,y+.65,z+.023]];
  glazed(pts,rgb('cad5c9'));tube(pts.slice(1),.0025,rgb('b4c7b1'),M.zinc,3);
  const roof=(t,z)=>[4.15*(1-t),3.42+2.31*t+.019,z];
  pts=[roof(.251,-1.132),roof(.251,-.369),roof(.349,-.677),roof(.326,-.78),roof(.440,-1.132)];
  glazed(pts,rgb('daebdb'));tube(pts.slice(1),.0027,rgb('bbccba'),M.zinc,3);
  // Pot rings, potting mix, a trowel and tied stakes describe the last use of the bench.
  const bx=-.14,bz=-8.67,top=.94;
  function ringStain(x,z,r){
    const C=rgb('776c52');let start=rand(0,TAU),a=start;
    for(let i=0;i<19;i++){
      const b=a+TAU/22*rand(.78,1.2);
      if(i%7!==3){const P=(q,rad)=>[x+Math.cos(q)*rad,top+.0033,z+Math.sin(q)*rad];face([P(a,r),P(a,r-.008),P(b,r-.007),P(b,r)],tint(C,rand(.89,1.06)),M.wood);}
      a=b;
    }
  }
  ringStain(.34,-8.44,.103);ringStain(-1.73,-8.45,.084);
  for(let i=0;i<54;i++){
    const x=-1.22+rand(-.31,.46),z=-8.37+rand(-.12,.075),r=rand(.002,.014);
    blob(x,top+.004,z,r,r*.47,r*rand(.65,1.4),rgb(pick(['5c503d','726044','887250'])),M.soil,2,5,.15);
  }
  function trowel(x,y,z,a,scale){
    const d=[Math.cos(a),0,Math.sin(a)],s=[-d[2],0,d[0]],P=(u,h,w)=>add([x,y,z],add(mul(d,u*scale),add([0,h*scale,0],mul(s,w*scale))));
    tube([P(-.18,.030,0),P(-.174,.030,0),P(-.05,.028,0),P(-.012,.025,0),P(.019,.022,0)],[.009,.020,.019,.014,.008].map(v=>v*scale),wood,M.wood,10,true);
    tube([P(-.028,.026,0),P(.047,.022,0)],.009*scale,brass,M.brass,9);
    const a0=P(.025,.024,0),b=P(.081,.032,-.048),c=P(.165,.027,-.037),t=P(.220,.017,0),e=P(.165,.026,.037),f=P(.081,.031,.048),mid=P(.110,.008,0);
    for(const pair of [[a0,b],[b,c],[c,t],[t,e],[e,f],[f,a0]])face([pair[0],pair[1],mid],metal,M.zinc);
  }
  trowel(-.62,top+.005,-8.384,-.38,.88);
  // A ball of natural twine, with a loose end trailing toward the tray.
  blob(-.85,1.673,-8.87,.080,.068,.080,rgb('b8a77c'),M.fiber,6,12);
  for(let j=0;j<11;j++){
    const a=j*2.399,t=.22+.49*(j%3)/2,path=[];
    for(let k=0;k<=30;k++){
      const q=TAU*k/30,s=Math.sin(q),c=Math.cos(q);
      path.push([-.85+.081*(c*Math.cos(a)-s*Math.sin(a)*t),1.673+.069*s*Math.sqrt(1-t*t),-8.87+.081*(c*Math.sin(a)+s*Math.cos(a)*t)]);
    }
    tube(path,.002,rgb('bcad86'),M.fiber,4);
  }
  tube([[-.868,1.620,-8.835],[-.893,1.603,-8.794],[-.920,1.586,-8.743],[-.917,1.508,-8.730],[-.950,1.477,-8.727]],[.0026,.0024,.0023,.002,.001],wood,M.fiber,4);
  // Fibrous buttresses and the remains of last season's fronds below the live crowns.
  for(const {base,crown,height:treeHeight,radius} of PH.fernRecords){
    for(let j=0;j<7;j++){
      const a=TAU*j/7+rand(-.18,.18),d=[Math.cos(a),0,Math.sin(a)],s=[-d[2],0,d[0]],root=shift(base,0,-.023,0);
      const end=add(root,mul(d,rand(.32,.59)));
      tube([shift(add(root,mul(d,radius*.56)),0,.31,0),shift(add(root,mul(d,radius*1.07)),0,.12,0),shift(lerp3(root,end,.68),0,.035,0),end],[.056,.059,.031,.009],rgb(pick(['695840','706146','70634c'])),M.bark,8);
    }
    for(let j=0;j<4;j++){
      const a=1.05+j*1.51+rand(-.31,.31),d=[Math.cos(a),0,Math.sin(a)],s=[-d[2],0,d[0]],reach=rand(.36,.60),drop=rand(.53,.89);
      const pos=t=>add(crown,add(mul(d,radius*.37+reach*Math.sin(t*1.55)),[0,-.08+.10*Math.sin(t*3.14)-drop*t*t,0]));
      const p=Array.from({length:10},(_,k)=>pos(k/9));
      tube(p,p.map((v,k)=>mix(.016,.002,k/9)),rgb('8c7954'),M.bark,6);
      const col=rgb(pick(['958252','a18e60','7f7951','928363']));
      for(let k=0;k<10;k++)for(const side of [-1,1]){
        if(rand()<.22)continue;
        const t=(k+.9)/11,r=pos(t),width=.12*Math.sin(Math.PI*t)+.032;
        const e=add(r,add(mul(s,width*side),add(mul(d,width*.36),[0,-width*rand(.58,1.06),0])));
        PH.botany.pinnule(r,e,width*.082,tint(col,rand(.84,1.05)),M.litter);
        for(let b=1;b<4;b++){
          const t=b/4,q=lerp3(r,e,t),end=shift(add(q,mul(d,width*.29)),0,-width*.19,0);
          PH.botany.pinnule(q,end,width*.052,tint(col,rand(.87,1.10)),M.litter);
        }
      }
    }
    if(treeHeight>2){
      const vine=[];for(let k=0;k<=16;k++){const t=k/16,a=t*8.7;vine.push(shift(lerp3(base,crown,t*.69),Math.cos(a)*radius*1.14,.07,Math.sin(a)*radius*1.13));}
      PH.botany.runningVine(vine,.139,.76);
    }
  }
  // Colonies below two leaking sills stop well short of the walking route.
  for(const [sx,cz]of [[-1,5.29],[1,-2.32],[-1,-5.41],[1,7.81]]){
    for(let j=0;j<10;j++){
      const px=sx*rand(3.85,4.0),pz=cz+rand(-.34,.31);
      PH.botany.moss(px,.008,pz,rand(.03,.09));
      if(j%4===0)PH.botany.softFern(px,pz,rand(.15,.28),.009);
    }
  }
};
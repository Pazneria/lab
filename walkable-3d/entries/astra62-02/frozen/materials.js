"use strict";
// Original, seeded surface stock and hand-lettered shop graphics, made locally at startup.
const Sheets = [], T = {};
function randomSource(seed) {
  let n=seed>>>0;
  return () => { n=(Math.imul(n,1664525)+1013904223)>>>0; return n/4294967296; };
}
const rand=randomSource(715287);
const between=(a,b)=>a+(b-a)*rand();
const pick=a=>a[Math.floor(rand()*a.length)];
const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
const TAU=2*Math.PI;
function sheet(key,paint) {
  const c=document.createElement("canvas");c.width=512;c.height=256;
  const g=c.getContext("2d",{alpha:false});
  paint(g);
  T[key]=Sheets.length;Sheets.push(c);
}
function fill(g,c,x=0,y=0,w=512,h=256){g.fillStyle=c;g.fillRect(x,y,w,h);}
function path(g,points,color,stroke,width=1){
  g.beginPath();points.forEach(([x,y],i)=>i?g.lineTo(x,y):g.moveTo(x,y));g.closePath();
  if(color){g.fillStyle=color;g.fill();}if(stroke){g.strokeStyle=stroke;g.lineWidth=width;g.stroke();}
}
function textAt(g,s,x,y,size,col,align="center",family='"Yu Mincho","MS Mincho","SimSun","Yu Gothic",Georgia,serif',weight="600"){
  g.fillStyle=col;g.font=weight+" "+size+"px "+family;g.textAlign=align;g.textBaseline="middle";g.fillText(s,x,y);
}
const sans='"Segoe UI",Arial,sans-serif';
function speck(g,n,seed,light="#ffecc9",dark="#342b26"){
  const r=randomSource(seed);
  for(let i=0;i<n;i++){g.globalAlpha=.03+r()*.15;g.fillStyle=r()>.5?light:dark;g.fillRect(r()*512,r()*256,.4+r()*3,.3+r()*1.4);}
  g.globalAlpha=1;
}
function grainField(seed,nx,ny) {
  const r=randomSource(seed),a=Float32Array.from({length:nx*ny},r);
  return (x,y)=>{const i=x*nx/512,j=y*ny/256,u=Math.floor(i),v=Math.floor(j);
    let dx=i-u,dy=j-v;dx=dx*dx*(3-2*dx);dy=dy*dy*(3-2*dy);
    const h=(p,q)=>a[(q%ny)*nx+p%nx];
    return (h(u,v)*(1-dx)+h(u+1,v)*dx)*(1-dy)+(h(u,v+1)*(1-dx)+h(u+1,v+1)*dx)*dy;};
}
function material(key,mode,seed) {
  sheet(key,g=>{
    const im=g.createImageData(512,256),p=im.data,r=randomSource(seed),wide=grainField(seed+1,7,5),mid=grainField(seed+2,32,20),streak=grainField(seed+3,95,3);
    for(let y=0;y<256;y++)for(let x=0;x<512;x++){
      const i=(y*512+x)*4,a=wide(x,y),b=mid(x,y),s=r(),f=streak(x,y);
      let v=234+8*(a-.5)+5*(s-.5),red=1,blue=1;
      if(mode==="stone")v=192+37*a+19*b+(s-.5)*33+(s>.989?18:s<.018?-28:0);
      if(mode==="wall")v=181+37*a+18*b+18*f+(s-.5)*21;
      if(mode==="wood"){
        const ring=Math.sin(y*.66+9*a+3*b+2*Math.sin(x*TAU/512))*.5+.5;
        const thread=Math.pow(ring,8);
        v=190+33*a+15*b-32*thread+(s-.5)*13;red=1.035;blue=.925;
      }
      if(mode==="fabric")v=210+16*a+9*b+((x%4===0)?-12:4)+((y%4===0)?-11:4)+(s-.5)*10;
      if(mode==="metal")v=197+28*a+11*b+Math.sin(y*15.23)*8+(s-.5)*13;
      if(mode==="paper")v=222+18*a+10*b+(s-.5)*16;
      if(mode==="brick"){
        const row=Math.floor(y/32), xx=(x+((row%2)*32))%64, yy=y%32;
        const edge=xx<2||yy<2;
        v=edge?148+28*a:186+26*a+22*b+(s-.5)*18;
        if(xx===2||yy===2)v*=.9;
        if(!edge){red=1.03;blue=.96;}
      }
      if(mode==="reed")v=189+26*a+15*b+(x%9<2?-37:5)+(Math.floor(x/9)%2===Math.floor(y/9)%2?(y%9<2?-20:4):0)+(s-.5)*8;
      p[i]=v*red;p[i+1]=v;p[i+2]=v*blue;p[i+3]=255;
    }
    g.putImageData(im,0,0);
    if(mode==="wood"){for(let i=0;i<70;i++){g.strokeStyle="rgba(54,42,31,"+(.05+r()*.16)+")";g.lineWidth=r()*1.1+.3;const x=r()*512,y=r()*256;g.beginPath();g.moveTo(x,y);g.bezierCurveTo(x+20,y+.5,x+30,y-2,x+r()*100,y-.5);g.stroke();}}
    if(mode==="metal"){for(let i=0;i<115;i++){g.strokeStyle="rgba(245,241,227,"+(.06+r()*.18)+")";g.lineWidth=.45;const x=r()*512,y=r()*256;g.beginPath();g.moveTo(x,y);g.lineTo(x+4+r()*43,y+r()*1.5);g.stroke();}}
    if(mode==="wall"){for(let i=0;i<190;i++){const x=r()*512,y=r()*250;g.fillStyle="rgba(63,47,30,.07)";g.fillRect(x,y,r()*2+.25,3+r()*27);}}
  });
}
function emblem(g,id,x,y,size,ink){
  g.save();g.translate(x,y);g.scale(size/100,size/100);g.fillStyle=ink;g.strokeStyle=ink;g.lineWidth=4;g.lineCap="round";g.lineJoin="round";
  function ellipse(x,y,rx,ry,rot=0,outline=false){g.beginPath();g.ellipse(x,y,rx,ry,rot,0,TAU);outline?g.stroke():g.fill();}
  function line(pts,w=3){g.lineWidth=w;g.beginPath();pts.forEach(([x,y],i)=>i?g.lineTo(x,y):g.moveTo(x,y));g.stroke();}
  if(id==="fish"){
    path(g,[[-28,-1],[-48,-19],[-44,0],[-48,19]],ink);ellipse(1,0,33,13);path(g,[[-3,-10],[7,-25],[17,-10]],ink);
    g.globalCompositeOperation="destination-out";ellipse(23,-3,2.4,2.4);line([[13,-10],[10,-4],[10,4],[14,11]],2);g.globalCompositeOperation="source-over";
    line([[-37,25],[-18,22],[-2,25],[14,22],[30,25]],2);
  }else if(id==="fire"){
    path(g,[[-27,23],[-33,7],[-20,-20],[-19,-2],[-8,-14],[4,-38],[14,-12],[12,1],[26,-14],[31,5],[25,22],[10,31],[-8,31]],ink);
    line([[-37,40],[38,33]],4);line([[-35,32],[36,41]],4);
  }else if(id==="fruit"){
    ellipse(-11,6,21,23,.13,true);ellipse(16,10,19,21,-.18,true);ellipse(-6,-25,16,6,.46);ellipse(12,-28,14,6,-.57);line([[0,-12],[5,-34]]);
  }else if(id==="pot"){
    path(g,[[-13,-30],[13,-30],[11,-17],[14,-8],[29,8],[28,21],[16,32],[-15,32],[-28,20],[-29,8],[-14,-9],[-11,-18]],ink);
    line([[-22,38],[22,38]],3);
  }else if(id==="tea"){
    path(g,[[-31,-1],[25,-1],[21,18],[10,29],[-14,29],[-25,18]],ink);ellipse(27,7,13,9,0,true);line([[-29,35],[28,35]],3);
    for(let j=-1;j<=1;j++)line([[j*13,-10],[j*13+4,-18],[j*13,-26],[j*13+4,-34]],2.5);
  }else{
    path(g,[[-39,4],[0,-27],[39,4],[25,4],[0,-13],[-26,4]],ink);
    for(let j=-1;j<=1;j++)line([[j*16,11],[j*16-4,28]],3);
  }
  g.restore();
}
function emblemSafe(g,id,x,y,size,color){
  // Isolate the carved lines of each printed seal from its paper ground.
  const cv=document.createElement("canvas");cv.width=160;cv.height=160;
  emblem(cv.getContext("2d"),id,80,77,145,color);
  g.drawImage(cv,x-size*.55,y-size*.55,size*1.1,size*1.1);
}
const shopArt={
  grill:{jp:"炭火串焼",en:"SUMIBI  /  CHARCOAL GRILL",icon:"fire",bg:"#76372e",ink:"#ffe4ad",short:"炭火",items:[["ねぎま","180"],["つくね","220"],["しいたけ","160"]]},
  fruit:{jp:"丸果青果",en:"MARUKA  /  FRUIT & GREENS",icon:"fruit",bg:"#506345",ink:"#f6e6af",short:"丸果",items:[["みかん","350"],["赤りんご","240"],["洋なし","300"]]},
  fish:{jp:"青潮鮮魚",en:"AOSHIO  /  DAILY CATCH",icon:"fish",bg:"#28535e",ink:"#e5ead5",short:"青潮",items:[["真あじ","480"],["さば","600"],["いわし","280"]]},
  pot:{jp:"土音陶房",en:"TSUCHINE  /  CERAMICS",icon:"pot",bg:"#594858",ink:"#f7dfbe",short:"土音",items:[["湯のみ","800"],["小皿","650"],["一輪挿し","900"]]},
  tea:{jp:"宵の茶屋",en:"YOI  /  TEA ROOM",icon:"tea",bg:"#3f5b48",ink:"#ffe9c0",short:"宵茶",items:[["ほうじ茶","320"],["煎茶","380"],["玄米茶","340"]]}
};
function makeArtwork(){
  let seed=891;
  for(const [key,s] of Object.entries(shopArt)){
    sheet(key+"Sign",g=>{
      fill(g,s.bg);g.strokeStyle=s.ink;g.globalAlpha=.65;g.lineWidth=2;g.strokeRect(11,14,490,228);g.globalAlpha=1;
      g.save();g.translate(68,117);g.scale(.73,1);emblemSafe(g,s.icon,0,0,113,s.ink);g.restore();fill(g,s.ink,120,58,1,132);
      g.save();g.translate(313,111);g.scale(.84,1);textAt(g,s.jp,0,0,84,s.ink);g.restore();textAt(g,s.en,314,185,15,s.ink,"center",sans,"650");
      speck(g,5600,seed++);
    });
    sheet(key+"Cloth",g=>{
      fill(g,s.bg);for(let x=0;x<512;x+=3)fill(g,"rgba(255,240,210,.044)",x,0,1,256);
      for(let y=0;y<256;y+=4)fill(g,"rgba(0,0,0,.06)",0,y,512,1);
      // The painted mon is pre-stretched, for a physically taller hanging panel.
      g.save();g.translate(256,130);g.scale(1.3,1);g.strokeStyle=s.ink;g.lineWidth=3;g.beginPath();g.arc(0,-4,64,0,TAU);g.stroke();
      emblemSafe(g,s.icon,0,-4,110,s.ink);g.restore();
      fill(g,s.ink,0,226,512,3);fill(g,s.ink,0,234,512,1);speck(g,3200,seed++);
    });
    sheet(key+"Menu",g=>{
      fill(g,"#e3cfaa");fill(g,s.bg,0,0,512,62);textAt(g,s.jp+"  ·  品書",256,32,34,s.ink);
      for(let i=0;i<3;i++){const y=91+i*51;textAt(g,s.items[i][0],37,y,27,"#33342c","left");textAt(g,"¥ "+s.items[i][1],470,y,23,s.bg,"right",sans);fill(g,"#a79778",37,y+22,435,1);}
      speck(g,2500,seed++);
    });
  }
  const placard=(key,bg,ink,jp,en,kind="rain")=>sheet(key,g=>{
    fill(g,bg);emblemSafe(g,kind,72,126,100,ink);textAt(g,jp,307,108,59,ink);textAt(g,en,309,169,17,ink,"center",sans);speck(g,5600,seed++);
  });
  placard("courtSign","#c9b996","#383d39","雨庭市場","A M E N I W A   •   E S T.   1 9 6 8");
  placard("teaWay","#253e3c","#f6d69f","茶屋  ↑","TEA ROOM   /   THROUGH PASSAGE","tea");
  placard("exitSign","#344948","#dfd7bd","東 口","E A S T    E N T R A N C E");
  placard("delivery","#ad8c64","#564d36","丸果組合","MARUKA   •   PACKING CO.","fruit");
  sheet("fishPrint",g=>{
    fill(g,"#d8ccb1");fill(g,"#2b5564",10,10,492,236);textAt(g,"港の朝市",248,46,43,"#ece3bd");emblemSafe(g,"fish",248,140,195,"#d5d1ad");
    textAt(g,"H A R B O U R   F I S H   A U C T I O N",256,215,14,"#e5dcb7","center",sans);speck(g,11000,481);
  });
  sheet("poster",g=>{
    fill(g,"#ddc59f");fill(g,"#b04d35",16,15,480,52);textAt(g,"夜 市 の 夕 べ",255,43,35,"#ffe8bd");
    fill(g,"#5c756b",16,77,480,134);g.fillStyle="#d5ab67";g.beginPath();g.arc(363,117,31,0,TAU);g.fill();
    for(let j=0;j<4;j++)path(g,[[14,203],[67+j*111,136-j%2*24],[138+j*117,201]],j%2?"#324d51":"#425f5b");
    textAt(g,"雨庭商店会    •    土 曜 夕 市",256,230,20,"#574d3a");speck(g,6900,863);
  });
  sheet("wallType",g=>{fill(g,"#b1a28c");textAt(g,"雨庭共同倉庫",255,100,70,"#62675f");textAt(g,"A M E N I W A   C O O P E R A T I V E",255,173,16,"#676b61","center",sans);speck(g,17000,751);});
  sheet("utility",g=>{fill(g,"#c8af64");textAt(g,"⚡",92,136,92,"#3f4237");textAt(g,"高電圧",323,100,60,"#393c33");textAt(g,"E L E C T R I C",323,171,20,"#393c33","center",sans);speck(g,1500,59);});
}
function buildMaterials(){
  sheet("plain",g=>fill(g,"#ffffff"));
  for(const [i,k] of ["stone","wall","wood","fabric","metal","paper","brick","reed"].entries())material(k,k,2343+i*273);
  makeArtwork();
}
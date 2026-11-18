"use strict";
function extraArtwork(){
  for(const [key,word,bg,ink] of [["amber","灯","#ffcc83","#79482e"],["grill","串","#f38a55","#633a2d"],["fish","魚","#f3e4ba","#52696b"],["tea","茶","#f5d594","#70513b"],["plain","","#ffc486","#a46039"]]){
    sheet("lamp"+key,g=>{
      const grad=g.createLinearGradient(0,0,0,256);grad.addColorStop(0,"#a5694c");grad.addColorStop(.11,bg);grad.addColorStop(.5,bg);grad.addColorStop(.91,bg);grad.addColorStop(1,"#b47c57");g.fillStyle=grad;g.fillRect(0,0,512,256);
      for(let j=0;j<17;j++){fill(g,"rgba(103,56,32,.27)",0,j*16,512,1.8);fill(g,"rgba(255,243,199,.26)",0,j*16+2,512,1.6);}
      for(let i=0;i<8;i++)fill(g,"rgba(111,71,43,.085)",i*64,0,2,256);
      if(word){textAt(g,word,256,132,90,ink);textAt(g,word,33,132,66,ink);textAt(g,word,478,132,66,ink);}
      speck(g,4400,word.length+83);
    });
  }
  const tags=[["mandarin","温州みかん","WAKAYAMA",350],["pear","洋なし","YAMAGATA",300],["apple","紅りんご","AOMORI",240],["mackerel","真さば","LOCAL CATCH",600],["aji","真あじ","LOCAL CATCH",480],["ware","小皿","HAND THROWN",650],["cup","湯のみ","STONEWARE",800],["skewer","炭火焼","PER SKEWER",180]];
  for(const [k,j,e,p] of tags)sheet(k+"Tag",g=>{
    fill(g,"#eddbb7");fill(g,"#a97252",10,12,492,4);textAt(g,j,25,83,57,"#363e37","left");textAt(g,e,27,153,19,"#626553","left",sans);
    textAt(g,"¥"+p,482,181,48,"#89523e","right",sans,"650");speck(g,1700,83+p);
  });
  sheet("scaleFace",g=>{
    fill(g,"#e4d7b7");
    g.save();g.translate(256,128);g.scale(2,1);
    for(let i=0;i<=40;i++){const a=(-215+i*7.2)*Math.PI/180;g.strokeStyle="#444a42";g.lineWidth=i%5===0?2.5:1;
      g.beginPath();g.moveTo(Math.cos(a)*94,Math.sin(a)*94);g.lineTo(Math.cos(a)*(i%5===0?79:86),Math.sin(a)*(i%5===0?79:86));g.stroke();
      if(i%10===0)textAt(g,""+(i/10),Math.cos(a)*63,Math.sin(a)*63,15,"#38473e","center",sans);}
    path(g,[[-3,5],[52,-58],[4,3]],"#983d2c");g.fillStyle="#3c443e";g.beginPath();g.arc(0,0,6,0,TAU);g.fill();textAt(g,"kg",0,43,15,"#5d6254","center",sans);g.restore();
  });
}
function decorationSheets(){
  sheet("reedPlate",g=>{
    fill(g,"#dcd8bd");g.save();g.translate(256,128);g.scale(2,1);
    for(const r of [113,108,88]){g.strokeStyle=r===108?"#879998":"#3e6672";g.lineWidth=r===108?1.5:2.5;g.beginPath();g.arc(0,0,r,0,TAU);g.stroke();}
    function twig(pts){g.strokeStyle="#456976";g.lineWidth=2.3;g.beginPath();g.moveTo(...pts[0]);g.bezierCurveTo(...pts[1],...pts[2],...pts[3]);g.stroke();}
    twig([[-51,54],[-31,25],[-12,-12],[39,-44]]);twig([[-32,31],[-37,7],[-41,-10],[-32,-34]]);
    for(const [x,y,a] of [[-28,18,-.62],[-15,1,-.38],[2,-14,-.22],[18,-30,-.5],[-35,-2,-1.4],[-34,-20,-1.88]]){
      g.save();g.translate(x,y);g.rotate(a);path(g,[[0,0],[8,-7],[28,-8],[18,-1]],"#4c7079");path(g,[[0,0],[8,7],[21,11],[17,4]],"#81989a");g.restore();
    }
    fill(g,"#ac6149",38,28,12,17);textAt(g,"土",44,37,10,"#e2d6bb");g.restore();speck(g,2700,741);
  });
}
function districtArt(){
  const vertical=(name,chars,bg,ink)=>{
    sheet(name,g=>{
      fill(g,bg);fill(g,ink,17,8,5,240);fill(g,ink,490,8,5,240);
      const n=Array.from(chars).length,h=212/n;
      Array.from(chars).forEach((c,i)=>{g.save();g.translate(256,24+h*(i+.52));g.scale(chars.length===4?5.35:4,1);textAt(g,c,0,0,h*.85,ink);g.restore();});speck(g,5200,92+n);
    });
  };
  vertical("blade","雨庭市場","#254c50","#a8dbd0");vertical("teaScroll","一服","#ded3ae","#4b5546");vertical("kilnFlag","陶器","#625566","#ead6ad");
  sheet("stationery",g=>{fill(g,"#e3d1aa");fill(g,"#586960",14,10,484,55);textAt(g,"市 場 通 信",256,39,32,"#f3e6c4");textAt(g,"十一月　　出店のご案内",256,98,29,"#4f554b");
    for(let j=0;j<6;j++){fill(g,"#a89d83",34,132+j*14,264-(j%3)*19,3);fill(g,"#b5a78c",330,132+j*14,145-(j%2)*28,3);}speck(g,3600,274);});
  sheet("locker",g=>{fill(g,"#344a4a");textAt(g,"水道",256,99,78,"#d6d0aa");textAt(g,"W A T E R   S U P P L Y",256,177,20,"#d6d0aa","center",sans);speck(g,3000,77);});
  sheet("teaTin",g=>{fill(g,"#b0a37d");for(let j=0;j<6;j++)for(let i=0;i<10;i++){g.strokeStyle="#8b9274";g.lineWidth=2;g.beginPath();g.arc(i*56+(j%2)*26,j*56,24,Math.PI,TAU);g.stroke();}
    fill(g,"#e6d8b3",176,20,155,216);textAt(g,"山",254,78,57,"#586b54");textAt(g,"茶",254,161,57,"#586b54");speck(g,2200,341);});
}

function atmosphereSheet(){
  sheet("atmosphere",g=>{
    const a=grainField(1507,8,8),b=grainField(1509,19,17),c=grainField(902,43,37),im=g.createImageData(512,256);
    for(let y=0;y<256;y++)for(let x=0;x<512;x++){
      const q=(y*512+x)*4,k=255*(.56*a(x,y)+.30*b(x,y)+.14*c(x,y));
      im.data[q]=im.data[q+1]=im.data[q+2]=k;im.data[q+3]=255;
    }g.putImageData(im,0,0);
  });
}

function finishPrinting(){
  // Surface details are painted at source resolution before mipmaps are generated.
  const wood=Sheets[T.wood].getContext("2d"),r=randomSource(302);
  for(const [x,y,w,h] of [[81,64,19,4],[373,212,27,5]]){
    for(let i=0;i<5;i++){wood.beginPath();wood.ellipse(x+i*.9,y,w*(1-i*.15),h*(1-i*.14),-.025,0,TAU);wood.strokeStyle="rgba(70,54,37,"+(.055+i*.012)+")";wood.lineWidth=.75;wood.stroke();}
    fill(wood,"rgba(81,62,46,.17)",x-w*.3,y-.7,w*.7,1.3);
  }
  const st=Sheets[T.stone].getContext("2d");
  for(let i=0;i<12;i++){
    const x=r()*512,y=r()*256;st.beginPath();st.moveTo(x,y);let xx=x,yy=y;
    for(let j=0;j<4;j++){xx+=r()*14;yy+=(r()-.4)*6;st.lineTo(xx,yy);}
    st.lineWidth=.4+r()*.55;st.strokeStyle=i%3?"rgba(67,70,64,.15)":"rgba(247,243,217,.21)";st.stroke();
  }
  for(const [key,s] of Object.entries(shopArt)){
    const g=Sheets[T[key+"Sign"]].getContext("2d");
    for(let i=0;i<137;i++){
      const x=r()*512,y=i<90?(r()<.5?r()*10:256-r()*12):r()*256;
      g.strokeStyle="rgba(219,187,145,"+(.06+r()*.23)+")";g.lineWidth=.4+r()*1.8;
      g.beginPath();g.moveTo(x,y);g.lineTo(x+3+r()*22,y+r()*1.4);g.stroke();
    }
    for(const x of [17,495])for(const y of [20,235]){
      g.fillStyle="#3f4035";g.beginPath();g.ellipse(x,y,2.2,3.4,0,0,TAU);g.fill();
      fill(g,"#bba07c",x-1,y-1.8,1.45,1.15);
    }
    const cloth=Sheets[T[key+"Cloth"]].getContext("2d");
    cloth.strokeStyle=s.ink;cloth.globalAlpha=.47;cloth.lineWidth=1.7;cloth.setLineDash([6,5]);
    for(const y of [8,245]){cloth.beginPath();cloth.moveTo(0,y);cloth.lineTo(512,y);cloth.stroke();}
    cloth.setLineDash([]);cloth.globalAlpha=1;
    if(key==="fish"){
      for(let j=0;j<2;j++)for(let i=-1;i<15;i++){
        for(const rr of [7,12,17]){cloth.strokeStyle="rgba(218,229,203,.43)";cloth.lineWidth=1.1;cloth.beginPath();cloth.ellipse(i*36+(j%2)*18,223-j*9,rr,rr*.59,0,Math.PI,TAU);cloth.stroke();}
      }
    }
  }
}
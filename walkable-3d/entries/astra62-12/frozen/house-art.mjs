import {TAU,rng,rect,poly,line,ellipse,arc,ring,round,grad,text,mono,serif,sans,star,grain,labelPanel} from "./graphics.mjs";

function carpet(c,w,h){
  const r=rng(98316);rect(c,0,0,w,h,"#373548");
  for(let i=0;i<46000;i++){
    const x=r()*w,y=r()*h;c.fillStyle=["#424051","#313443","#494052","#484654","#2d3141","#3d3749"][i%6];c.fillRect(x,y,.65+r()*2.6,.65+r()*1.4);
  }
  // Repeating scallops, dash-pairs and compass stitches in a contract-woven pile.
  for(let j=-1;j<5;j++)for(let i=-1;i<5;i++){
    const x=(i+(j%2)*.5)*128,y=j*128;
    c.save();c.translate(x,y);c.rotate(-.2);
    for(let a=-2;a<=2;a++){line(c,[[0,0],[a*6,-17+Math.abs(a)*2],[a*11,-28+Math.abs(a)*4]],a%2?"#776362":"#557070",2.8)}
    line(c,[[-24,-18],[-13,-26],[0,-33],[13,-26],[24,-18]],"#786663",2);
    poly(c,[[-4,0],[0,-6],[4,0],[0,4]],"#b27c63");
    c.restore();
    const q=x+49,s=y+57;line(c,[[q-12,s+2],[q-2,s-4],[q+6,s-2],[q+17,s-10]],"#526766",3);
    line(c,[[q+3,s+7],[q+10,s+3],[q+16,s+4]],"#82616a",2);
    star(c,x-17,y+68,4,"#9b8170");rect(c,x+32,y-43,5,2,"#987969");rect(c,x+77,y+79,3,3,"#748383");
  }
  c.globalAlpha=.15;for(let y=0;y<h;y+=3)rect(c,0,y,w,.85,"#a29b95");c.globalAlpha=1;
}
function wood(c,w,h){
  const r=rng(4513);rect(c,0,0,w,h,"#ae7750");
  for(let i=0;i<850;i++){
    const x=r()*w,p=[],amp=1+r()*4,phase=r()*TAU,shade=r();
    for(let y=-8;y<h+12;y+=8)p.push([x+amp*Math.sin(y*.012+phase)+amp*.64*Math.sin(y*.029+phase),y]);
    line(c,p,shade<.55?"rgba(69,33,27,"+(.05+r()*.18)+")":"rgba(249,194,132,"+(.07+r()*.17)+")",.5+r()*2);
  }
  for(const [x,y] of [[71,185],[184,360]])for(let i=1;i<8;i++){c.save();c.translate(x,y);c.rotate(.075);c.scale(1,4.1);ring(c,0,0,i*1.7,"rgba(93,52,35,.18)",.7);c.restore()}
  grain(c,w,h,6600,111,.14);
}
function plaster(c,w,h){
  const r=rng(325);rect(c,0,0,w,h,"#dfcbb0");
  for(let i=0;i<5800;i++){const x=r()*w,y=r()*h;ellipse(c,x,y,r()*2.3+.4,r()*1.7+.3,i%3?"rgba(112,80,66,.087)":"rgba(255,243,217,.18)")}
  grain(c,w,h,9600,121,.15)
}
function lantern(c,x,y,s,lit="#f1be72",ink="#315151"){
  c.save();c.translate(x,y);c.scale(s,s);line(c,[[0,-33],[0,-21]],ink,4);
  poly(c,[[-18,-16],[-5,-22],[5,-22],[18,-16]],ink);poly(c,[[-13,-13],[13,-13],[9,13],[-9,13]],lit);
  line(c,[[-13,-13],[-8,14],[8,14],[13,-13]],ink,3);line(c,[[1,-13],[1,14]],ink,2);
  poly(c,[[-13,13],[13,13],[6,19],[-6,19]],ink);c.restore()
}
function mural(c,w,h){
  const r=rng(335);rect(c,0,0,w,h,"#325a5a");
  rect(c,0,0,w,13,"#dbb77d");rect(c,0,h-16,w,16,"#ddac76");
  rect(c,0,22,w,h-46,"#365c5a");
  for(let i=0;i<98;i++){const x=r()*w,y=32+r()*201;if(i%8===0)star(c,x,y,3+r()*4,"#d7ad78");else ellipse(c,x,y,1.1,1.1,"#91a28d")}
  // Painted pier, warehouse roofs and the distant wheel.
  ellipse(c,890,166,108,108,"#b7936f");
  for(let i=0;i<7;i++)rect(c,773,175+i*9,237,2+i*.6,"#9c8d72");
  let p=[[0,310],[0,222]];for(let x=0;x<=w+30;x+=21)p.push([x,214+19*Math.sin(x*.007)+r()*17]);p.push([w+30,316]);poly(c,p,"#607c6f");
  p=[[0,340],[0,275]];for(let x=0;x<=w+45;x+=39)p.push([x,250+12*Math.sin(x*.012)+r()*24]);p.push([w+45,342]);poly(c,p,"#46675e");
  rect(c,0,310,w,116,"#254c50");
  for(let i=0;i<100;i++){const x=r()*w,y=321+r()*100;line(c,[[x,y],[x+4+r()*45,y]],i%4?"#42665f":"#b69672",1+r()*1.4)}
  for(let x=610;x<w+10;x+=39){rect(c,x,291,5,49+r()*9,"#203f43");line(c,[[x,292],[x+37,327]],"#34534f",3)}
  rect(c,595,286,w-595,9,"#263f40");
  for(let x=634;x<1200;x+=9){rect(c,x,274,1.8,14,"#2f4a48")}rect(c,632,273,568,2,"#2f4a48");
  for(const [x,y,s] of [[644,285,.77],[725,285,.7],[1025,285,.65],[1124,285,.84],[1319,285,.78]]){
    rect(c,x,y-49*s,99*s,49*s,"#36534e");poly(c,[[x-5*s,y-48*s],[x+44*s,y-76*s],[x+105*s,y-48*s]],"#2c4847");
    for(let j=0;j<5;j++)rect(c,x+(10+j*17)*s,y-36*s,8*s,14*s,j%3?"#c89165":"#8d8870");
  }
  const fx=968,fy=212,fr=63;ring(c,fx,fy,fr,"#2c4747",3);ring(c,fx,fy,fr-5,"#49665b",2);
  for(let i=0;i<16;i++){const a=i*TAU/16,x=fx+Math.cos(a)*fr,y=fy+Math.sin(a)*fr;line(c,[[fx,fy],[x,y]],"#3c5b53",1.5);rect(c,x-4,y+2,8,5,"#c29b71")}
  line(c,[[fx-26,285],[fx,fy],[fx+26,285]],"#304343",5);
  // A weathered hand-lettered house mark and compass.
  text(c,"N E I G H B O R H O O D    A M U S E M E N T S",60,70,17,"#d8c295",sans);
  text(c,"The",65,135,48,"#f1cf9e",{...serif,italic:true});
  text(c,"NIGHT PIER",53,229,109,"#244446",{...serif,max:630});text(c,"NIGHT PIER",50,223,109,"#eccda0",{...serif,max:630});
  line(c,[[60,248],[585,248]],"#d2ae79",3);
  text(c,"O P E N   T I L L   T H E   L A S T   F E R R Y",62,278,15,"#e3c9a0",sans);
  const cx=1344,cy=122;ring(c,cx,cy,65,"#b6ad85",2);ring(c,cx,cy,59,"#a0a183",1);
  for(let i=0;i<32;i++){const a=i*TAU/32;line(c,[[cx+Math.cos(a)*56,cy+Math.sin(a)*56],[cx+Math.cos(a)*(i%4?53:48),cy+Math.sin(a)*(i%4?53:48)]],"#c1b590",1.7)}
  lantern(c,cx,cy+2,1.6,"#dcad76","#c0b894");text(c,"N°  9",cx,cy+98,19,"#d9bf90",{...mono,align:"center"});
  grain(c,w,h,26000,238,.17);
}
function street(c,w,h){
  const r=rng(12013);rect(c,0,0,w,h,grad(c,0,0,0,h,[[0,"#17283d"],[.63,"#566375"],[1,"#263848"]]));
  for(let i=0;i<80;i++)ellipse(c,r()*w,r()*180,.5+r(),.7,"#a9b6bd");
  ellipse(c,1135,63,25,25,"#c0c7bd");ellipse(c,1144,56,26,26,"#283b50");
  let xx=-10;while(xx<w+40){const ww=37+r()*89,top=98+r()*94;rect(c,xx,top,ww,h-top,"#23384a");rect(c,xx+ww*.63,top-14,ww*.12,16,"#213548");
    for(let i=8;i<ww-8;i+=15)for(let j=top+10;j<285;j+=19)if(r()>.54)rect(c,xx+i,j,4+r()*4,7,r()<.48?"#9e977e":"#707d82");xx+=ww+3}
  const colors=["#33494e","#4b4e55","#3a4c51","#49535a"];
  xx=-30;let store=0;
  while(xx<w+10){const ww=109+r()*75,top=135+r()*68;
    rect(c,xx,top,ww,223,colors[store%4]);rect(c,xx-3,top-6,ww+6,7,"#283a43");
    for(let y=top+11;y<279;y+=40)for(let x=xx+12;x<xx+ww-28;x+=31){
      rect(c,x-2,y-2,21,27,"#253740");rect(c,x,y,17,23,r()<.33?"#ceaa79":r()<.5?"#797e77":"#4a626c");rect(c,x+8,y,2,24,"#34454b");rect(c,x,y+11,18,2,"#34454b")
    }
    rect(c,xx+3,287,ww-6,23,"#273e44");text(c,["BAIT & TACKLE","LOW WATER CAFÉ","SUNDREY BOOKS","ANCHOR REPAIR","FERRY MARKET"][store%5],xx+ww/2,303,13,"#bfa986",{...serif,align:"center",max:ww-11});
    rect(c,xx+4,311,ww-8,48,grad(c,0,310,0,365,[[0,"#7e756a"],[1,"#ad9071"]]));for(let x=xx+7;x<xx+ww-7;x+=27)rect(c,x,312,3,48,"#37474d");
    rect(c,xx+ww*.6,316,25,46,"#394b53");rect(c,xx-2,307,ww+4,6,"#385154");xx+=ww+5;store++;
  }
  rect(c,0,361,w,10,"#677076");rect(c,0,371,w,h-371,grad(c,0,371,0,h,[[0,"#374b57"],[1,"#233743"]]));
  for(let i=0;i<1200;i++){const x=r()*w,y=376+r()*(h-376);rect(c,x,y,2+r()*28,1+r()*1.5,i%5?"rgba(137,155,152,.14)":"rgba(208,167,115,.22)")}
  for(const x of [179,657,1224]){rect(c,x-3,155,6,209,"#24333e");line(c,[[x,169],[x+12,148],[x+36,145]],"#24333e",4);ellipse(c,x+36,148,11,4,"#d4bb8d");
    const g=c.createRadialGradient(x+36,151,1,x+36,151,40);g.addColorStop(0,"rgba(255,208,135,.39)");g.addColorStop(1,"rgba(228,175,109,0)");rect(c,x-5,110,85,82,g)}
  c.strokeStyle="#243845";c.lineWidth=2;c.beginPath();c.moveTo(-10,47);c.bezierCurveTo(430,126,850,107,w+10,59);c.stroke();grain(c,w,h,5500,527,.11);
}
function poster(c,w,h,id){
  const night=id==="ferry",fg=night?"#efc797":"#efe4bf",bg=night?"#2a5559":"#b95645";
  rect(c,0,0,w,h,"#e4d1ac");rect(c,9,9,w-18,h-18,bg);
  text(c,night?"SOUTH QUAY LINE":"PIER NINE • SUMMER SERIES",w/2,35,14,fg,{...mono,align:"center",max:w-30});
  text(c,night?"LAST":"MIDNIGHT",w/2,87,51,fg,{...serif,align:"center",max:w-28});
  text(c,night?"FERRY":"REGATTA",w/2,136,53,fg,{...serif,align:"center",max:w-28});
  c.save();c.beginPath();c.rect(15,146,w-30,h-225);c.clip();rect(c,14,146,w-28,h-224,night?"#345f65":"#dcad73");
  ellipse(c,night?184:68,190,39,39,night?"#e3c49c":"#e9cf95");
  for(let i=0;i<6;i++){const p=[[0,335+i*19]];for(let x=0;x<w+8;x+=4)p.push([x,242+10*Math.sin(x*.023+i*.5)+i*12]);p.push([w,350+i*19]);poly(c,p,["#699489","#366e70","#254f5b","#426d69","#4c776f","#345d62"][i])}
  if(night){
    poly(c,[[36,253],[224,253],[203,269],[66,269]],"#233b45");rect(c,66,233,135,19,"#e5c796");rect(c,91,218,86,16,"#d6b386");rect(c,134,206,12,14,"#995f52");for(let i=0;i<10;i++)rect(c,76+12*i,238,6,7,"#44656b");
  }else{
    for(const [x,y,s] of [[91,257,1],[170,238,.57],[209,254,.42]]){
      poly(c,[[x,y],[x,y-94*s],[x-40*s,y-5*s]],"#efe4c0");poly(c,[[x+4*s,y-80*s],[x+42*s,y-4*s],[x+4*s,y-4*s]],"#9b5145");line(c,[[x,y+1],[x,y-99*s]],"#61483d",2*s);poly(c,[[x-50*s,y],[x+49*s,y],[x+35*s,y+9*s],[x-35*s,y+9*s]],"#303f46");
    }
  }c.restore();
  line(c,[[19,h-68],[w-19,h-68]],fg,2);
  text(c,night?"11 : 40 PM":"SAT.  AUG  22",w/2,h-37,24,fg,{...mono,align:"center"});
  text(c,night?"FROM LANTERN LANDING":"ALL BOATS WELCOME",w/2,h-18,12,fg,{...mono,align:"center"});grain(c,w,h,5100,night?937:432,.2);
}
export function housePrints(a){
  a.add("white",8,8,(c,w,h)=>rect(c,0,0,w,h,"#fff"));
  a.add("enamel",128,128,(c,w,h)=>{rect(c,0,0,w,h,"#faf9f7");const r=rng(512);for(let i=0;i<5600;i++){const x=r()*w,y=r()*h;ellipse(c,x,y,r()*.8+.2,r()*.7+.2,i%3?"#f3f2f0":"#ffffff")}});
  a.add("brushed",256,96,(c,w,h)=>{rect(c,0,0,w,h,"#f0eeeb");const r=rng(913);for(let i=0;i<1900;i++){const y=r()*h,x=r()*w;line(c,[[x,y],[x+3+r()*32,y]],i%3?"rgba(107,111,105,.13)":"rgba(255,255,255,.6)",.35+r()*.45)}});
  a.add("molded",96,96,(c,w,h)=>{rect(c,0,0,w,h,"#fbfaf7");grain(c,w,h,3300,339,.055)});
  a.add("felt",128,128,(c,w,h)=>{rect(c,0,0,w,h,"#edece5");const r=rng(111);for(let i=0;i<5000;i++){const x=r()*w,y=r()*h;line(c,[[x,y],[x+1.1,y+1.8]],i%2?"#f5f3ec":"#dfded8",.65)}});
  a.add("mural",1536,432,mural);a.add("street",1536,512,street);a.add("carpet",512,512,carpet);
  a.add("wood",256,512,wood);a.add("plaster",256,256,plaster);
  a.add("ferry",256,400,(c,w,h)=>poster(c,w,h,"ferry"));a.add("regatta",256,400,(c,w,h)=>poster(c,w,h,"regatta"));
  a.add("tokenSign",512,196,(c,w,h)=>{
    rect(c,0,0,w,h,"#e8cca1");c.strokeStyle="#964e3d";c.lineWidth=5;c.strokeRect(8,8,w-16,h-16);c.strokeStyle="#ac7859";c.lineWidth=2;c.strokeRect(15,15,w-30,h-30);
    text(c,"THE NIGHT PIER    ★    WICKET No. 1",w/2,43,17,"#625246",{...mono,align:"center"});
    text(c,"TOKENS",w/2,120,77,"#823e32",{...serif,align:"center",max:436});
    text(c,"FIVE FOR ONE DOLLAR",w/2,163,26,"#514d44",{...mono,align:"center"});grain(c,w,h,4400,456);
  });
  a.add("open",256,108,(c,w,h)=>{
    rect(c,0,0,w,h,"#1d383a");round(c,9,9,w-18,h-18,20,"#b67455");round(c,12,12,w-24,h-24,18,"#283d3f");
    text(c,"OPEN",w/2,82,76,"#ed9971",{align:"center",max:217,stroke:["#7c5144",4]});
  });
  a.add("houseplate",384,120,(c,w,h)=>labelPanel(c,w,h,"#c5ad7b","#3a4a43","THE NIGHT PIER","NEIGHBORHOOD   AMUSEMENTS   •   EST. 1982"));
  a.add("exit",192,64,(c,w,h)=>labelPanel(c,w,h,"#294d46","#d9d7ad","EXIT","TO THE BOARDWALK"));
  a.add("rates",192,224,(c,w,h)=>{
    rect(c,0,0,w,h,"#e4d5b5");text(c,"HOUSE NOTES",13,32,22,"#894b3e",serif);
    line(c,[[13,42],[180,42]],"#ad8464",2);
    ["One token per play","Keep drinks here","Ask for change","at the counter"].forEach((s,i)=>text(c,s,15,72+i*24,14,"#4a524a",mono));
    text(c,"THANK YOU!",14,198,21,"#8a4d3c",{...serif,italic:true});
  });
  a.add("coinFace",128,88,(c,w,h)=>{rect(c,0,0,w,h,"#cf864a");rect(c,5,5,w-10,h-10,"#eaab65");text(c,"25¢",w/2,51,45,"#4d3430",{align:"center"});text(c,"PUSH TO REJECT",w/2,73,12,"#573b31",{...mono,align:"center"})});
  a.add("serial",256,114,(c,w,h)=>{rect(c,0,0,w,h,"#b3ada0");rect(c,4,4,w-8,h-8,"#354444");text(c,"PIER  ◊  SERVICE",12,31,23,"#e2d8b7",mono);text(c,"INSPECTED   •   08 / 82",12,55,15,"#d0ccb4",mono);for(let i=0;i<43;i++)rect(c,13+i*3.7,69,1+i%3,25,"#bcbba6");text(c,"N°09",190,94,15,"#d0ccb4",mono)});
  a.add("depthDial",192,192,(c,w,h)=>{const x=w/2,y=h/2;rect(c,0,0,w,h,"#354e48");ellipse(c,x,y,91,91,"#dfcda5");ring(c,x,y,83,"#af9f83",2);for(let i=0;i<=32;i++){const a=2.36+i*4.71/32;line(c,[[x+Math.cos(a)*75,y+Math.sin(a)*75],[x+Math.cos(a)*(i%4?68:59),y+Math.sin(a)*(i%4?68:59)]],i>24?"#ac5b45":"#45524a",i%4?2:3)}
    text(c,"FATHOMS",x,119,17,"#42544a",{...mono,align:"center"});text(c,"0     80",x,149,14,"#71594a",{...mono,align:"center"});poly(c,[[x-5,y+3],[x+38,y-58],[x+4,y+3]],"#a84f37");ellipse(c,x,y,7,7,"#42534a")});
  a.add("clock",256,256,(c,w,h)=>{rect(c,0,0,w,h,"#e6d6b8");const x=w/2,y=h/2;for(let i=0;i<60;i++){const q=i*TAU/60;line(c,[[x+110*Math.sin(q),y-110*Math.cos(q)],[x+(i%5?106:99)*Math.sin(q),y-(i%5?106:99)*Math.cos(q)]],"#48514a",i%5?1.5:3)}
    for(let i=1;i<=12;i++){const q=i*TAU/12;text(c,String(i),x+85*Math.sin(q),y-85*Math.cos(q)+7,23,"#384b48",{...sans,align:"center"})}text(c,"NIGHT PIER",x,y+38,12,"#94856d",{...mono,align:"center"});
    line(c,[[x,y],[x-51,y+13]],"#344340",6);line(c,[[x,y],[x+45,y-65]],"#344340",4);line(c,[[x-20,y+2],[x+77,y-9]],"#a25340",2);ellipse(c,x,y,5,5,"#a25340");
  });
  a.add("token",128,128,(c,w,h)=>{rect(c,0,0,w,h,"#ac8550");ring(c,64,64,57,"#ebc785",4);ring(c,64,64,50,"#725b3b",1.5);star(c,64,58,30,"#ebcc91");text(c,"NIGHT PIER",64,101,11,"#604d35",{...mono,align:"center"})});
  a.add("tickets",256,96,(c,w,h)=>{rect(c,0,0,w,h,"#d29072");for(let i=0;i<4;i++){c.strokeStyle="#8c594d";c.lineWidth=1.5;c.strokeRect(i*64+4,5,56,86);text(c,"PIER",i*64+32,31,17,"#654d46",{align:"center"});star(c,i*64+32,52,12,"#845b4b");text(c,"042"+i,i*64+32,82,10,"#644e45",{...mono,align:"center"})}});
  a.add("grill",128,128,(c,w,h)=>{rect(c,0,0,w,h,"#565653");for(let j=-1;j<17;j++)for(let i=-1;i<17;i++){const x=i*8+(j%2)*4,y=j*8;ellipse(c,x,y+.8,2.4,2.4,"#77736a");ellipse(c,x,y,2.3,2.3,"#242b2c")}});
  a.add("rubber",128,128,(c,w,h)=>{rect(c,0,0,w,h,"#52504e");for(let i=-1;i<32;i++){line(c,[[i*8,-1],[i*8,129]],"#6b635a",1);line(c,[[i*8+3,-1],[i*8+3,129]],"#343739",2)}grain(c,w,h,1200,542,.18)});
  a.add("benchSlat",256,64,(c,w,h)=>{rect(c,0,0,w,h,"#a7734e");for(let i=0;i<17;i++){const y=i*4;line(c,[[0,y],[64,y-1],[158,y+1],[256,y]],i%3?"#9e6c49":"#b58056",.8)}grain(c,w,h,900,619)});
  a.add("backPanel",256,256,(c,w,h)=>{rect(c,0,0,w,h,"#57534b");grain(c,w,h,8000,517,.22);for(let j=0;j<12;j++){round(c,52,43+j*6,152,2.7,1.2,"#252a2a");rect(c,55,46+j*6,145,.8,"#827966")}
     rect(c,52,150,152,59,"#ada994");text(c,"SERVICE ACCESS",128,170,17,"#414841",{...mono,align:"center"});text(c,"DISCONNECT MAINS",128,189,11,"#414841",{...mono,align:"center"});text(c,"AC 110 V  /  60 Hz",128,202,9,"#414841",{...mono,align:"center"})});
}
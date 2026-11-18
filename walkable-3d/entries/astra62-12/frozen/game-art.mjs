import {TAU,rng,rect,poly,line,ellipse,arc,ring,round,grad,text,mono,serif,sans,star,grain} from "./graphics.mjs";

export const titles={
  ember:{name:"EMBER PASS",type:"WESTERN RAILWAY",no:"07",a:"#e9a956",b:"#a34035",c:"#3d3535",paper:"#f9deab",blurb:"CLIMB THE RED SUMMIT",maker:"FIELDSTONE ELECTRIC"},
  relay:{name:"DUST RELAY",type:"DESERT ROAD RACE",no:"12",a:"#e68a42",b:"#347e83",c:"#333844",paper:"#ffe2ae",blurb:"THE SALT FLATS • STAGE 1",maker:"FIELDSTONE ELECTRIC"},
  lunar:{name:"LUNAR POST",type:"ORBITAL COURIER",no:"03",a:"#69d4da",b:"#cf798c",c:"#233a62",paper:"#e4f1dc",blurb:"DELIVERY TO MOON SECTOR 6",maker:"NORTH STAR AUTOMATA"},
  kite:{name:"KITE SIGNAL",type:"AEROWAVE SYSTEM",no:"09",a:"#f1c86b",b:"#53bca9",c:"#40375d",paper:"#eef1cf",blurb:"CATCH THE HIGH FREQUENCY",maker:"NORTH STAR AUTOMATA"},
  bell:{name:"BELL DIVER",type:"DEEP SEA EXPEDITION",no:"04",a:"#eeb565",b:"#ee7252",c:"#16494e",paper:"#ffe8b8",blurb:"SECTOR 01 • THE LANTERN REEF",maker:"PELAGIC INSTRUMENT CO."}
};
function ridges(c,r,y,step,range,color){
  const p=[[-8,224],[-8,y]];for(let x=-8;x<349;x+=step)p.push([x,y+r()*range]);p.push([349,224]);poly(c,p,color);
}
function skyStars(c,r,n,height){for(let i=0;i<n;i++){const x=r()*320,y=r()*height;if(i%8===0)star(c,x,y,2.2,"#f3dda8");else rect(c,x,y,i%3?1:2,1,"#a7d4d5")}}
function plume(c,x,y,s){
  for(let i=0;i<8;i++)ellipse(c,x-i*s*7,y-s*(i*2.1+Math.sin(i)*1.9),s*(2+i*.8),s*(2+i*.4),i%2?"#c29778":"#e5be91");
}
function train(c,x,y,s){
  c.save();c.translate(x,y);c.scale(s,s);const dark="#322f32",gold="#edb66d";
  for(let i=0;i<2;i++){const p=-87+i*33;rect(c,p,-15,30,13,"#7b4434");rect(c,p-1,-17,32,3,dark);for(let k=0;k<4;k++)rect(c,p+3+k*6,-13,4,5,gold);line(c,[[p,-5],[p+30,-5]],"#d8914e",1);ellipse(c,p+6,0,3,3,dark);ellipse(c,p+24,0,3,3,dark)}
  rect(c,-18,-12,37,11,dark);rect(c,-19,-20,14,11,dark);rect(c,-21,-22,18,3,dark);rect(c,-16,-17,6,6,gold);rect(c,9,-20,4,10,dark);rect(c,7,-22,8,4,dark);rect(c,17,-11,4,8,"#a8533d");poly(c,[[18,-4],[29,1],[15,1]],dark);
  for(let i=0;i<3;i++){ellipse(c,-11+i*11,0,4.5,4.5,dark);ring(c,-11+i*11,0,2.9,"#be875a",1)}
  line(c,[[-11,0],[10,0]],gold,1.5);plume(c,12,-24,.8);c.restore();
}
function ember(c){
  const r=rng(93);rect(c,0,0,320,210,grad(c,0,0,0,190,[[0,"#713a52"],[.5,"#e48959"],[1,"#eeb577"]]));
  ellipse(c,218,67,42,42,"#ffda86");for(let i=0;i<5;i++)rect(c,172,64+i*5,90,1+i*.3,"#ee9d68");
  poly(c,[[0,144],[0,105],[49,49],[77,83],[122,29],[177,93],[207,64],[245,111],[272,80],[320,115],[320,166]],"#9b5659");
  poly(c,[[65,102],[122,29],[110,68],[120,61],[102,88]],"#eeb787");poly(c,[[16,99],[49,49],[40,78],[46,75]],"#e3a87b");
  ridges(c,r,99,17,40,"#99544b");ridges(c,r,118,21,31,"#69444b");
  for(let i=0;i<65;i++){const x=r()*330,y=124+r()*33,s=6+r()*12;poly(c,[[x-s*.32,y],[x,y-s],[x+s*.32,y]],"#4a4046")}
  c.save();c.translate(0,160);c.rotate(-.075);
  for(let x=-10;x<330;x+=22){rect(c,x,0,3,63,"#453b3c");line(c,[[x,2],[x+23,38],[x,67]],"#57403c",2.4)}rect(c,-10,-3,355,6,"#523a32");train(c,199,-7,1.17);c.restore();
  ridges(c,r,179,17,20,"#3e363e");for(let i=0;i<16;i++){const x=r()*320,y=190+r()*27;poly(c,[[x-6,y],[x,y-22],[x+6,y]],"#332f38")}
}
function car(c,x,y,s){
  c.save();c.translate(x,y);c.scale(s,s);
  ellipse(c,0,5,43,7,"#743f41");round(c,-32,-7,12,16,3,"#283942");round(c,20,-7,12,16,3,"#283942");
  poly(c,[[-35,-2],[-33,-11],[-21,-15],[-14,-27],[13,-28],[22,-16],[32,-12],[35,-1],[27,4],[-27,4]],"#dc643d");
  poly(c,[[-18,-15],[-11,-24],[11,-25],[18,-16]],"#355b64");poly(c,[[-11,-23],[1,-24],[-7,-17],[-16,-17]],"#8dc0b5");
  rect(c,-33,-10,66,2,"#ffc786");rect(c,-26,-8,12,3,"#ffcf82");rect(c,14,-8,12,3,"#ffcf82");rect(c,-8,-5,16,5,"#edd2a1");rect(c,-29,1,58,3,"#70494a");c.restore();
}
function relay(c){
  const r=rng(143);
  rect(c,0,0,320,210,grad(c,0,0,0,150,[[0,"#357986"],[.7,"#c8c99e"],[1,"#eabf81"]]));
  ellipse(c,72,56,28,28,"#ffe4a5");for(let i=0;i<6;i++)rect(c,22+r()*260,24+r()*53,14+r()*41,2,"#caddbe");
  ridges(c,r,87,13,23,"#9c8b78");poly(c,[[0,95],[20,87],[26,61],[51,60],[56,84],[96,87],[99,78],[111,76],[116,94],[157,109],[218,107],[242,88],[247,70],[281,72],[285,93],[320,96],[320,146],[0,146]],"#b76e51");
  rect(c,0,108,320,110,"#dd9760");
  poly(c,[[157,108],[180,108],[143,126],[189,134],[207,146],[320,184],[320,210],[0,210],[116,148],[150,139],[123,127]],"#70595c");
  poly(c,[[157,108],[162,108],[130,127],[155,139],[124,150],[16,210],[0,210],[116,148],[150,139],[123,127]],"#efcd95");
  for(let i=0;i<35;i++){const y=113+r()*93,x=r()*320;if(x<92||x>254)rect(c,x,y,2+(y-105)*.08,1,"#bc7b53")}
  for(const [x,y,s] of [[31,148,1],[265,126,.62],[290,175,1.42],[88,118,.30]]){
    line(c,[[x,y],[x,y-s*22]],"#56695b",s*4);line(c,[[x,y-s*9],[x-s*7,y-s*13],[x-s*7,y-s*19]],"#56695b",s*3);line(c,[[x,y-s*13],[x+s*5,y-s*16],[x+s*5,y-s*21]],"#56695b",s*3)
  }
  car(c,178,181,1.15);
}
function ship(c,x,y,s){
  c.save();c.translate(x,y);c.rotate(-.15);c.scale(s,s);
  poly(c,[[-18,-6],[-46,1],[-18,5]],"#e87d82");poly(c,[[-19,-3],[-35,0],[-18,2]],"#ffe7a4");
  poly(c,[[-22,1],[-30,-17],[-21,-16],[-7,-5],[7,-6],[15,-13],[24,-12],[31,-5],[44,2],[31,5],[-16,8]],"#dfe6ce");
  poly(c,[[-17,5],[42,2],[27,9],[-16,10]],"#74949f");poly(c,[[-8,2],[-26,18],[-12,16],[10,4]],"#d98d91");poly(c,[[12,-5],[18,-11],[23,-10],[29,-5]],"#446681");
  line(c,[[0,-1],[10,-1],[15,1]],"#c45e77",2);c.restore()
}
function lunar(c){
  const r=rng(85);rect(c,0,0,320,210,grad(c,0,0,0,210,[[0,"#152845"],[1,"#4a4868"]]));skyStars(c,r,100,193);
  ellipse(c,241,78,45,45,"#9cb9ba");c.save();c.beginPath();c.arc(241,78,45,0,TAU);c.clip();
  for(let i=0;i<32;i++){const x=198+r()*92,y=34+r()*91,sz=2+r()*9;ellipse(c,x,y,sz,sz*.55,"#77979e");arc(c,x,y,sz*.66,.2,2.6,"#c4d2c8",1.1)}
  c.restore();
  c.save();c.translate(241,78);c.rotate(-.35);c.scale(1,.23);arc(c,0,0,62,-.3,Math.PI+.25,"#d2a4a5",7);c.restore();
  for(let i=0;i<7;i++)line(c,[[i*43-54,131+i%3*10],[i*43-29,127+i%3*10]],"#637483",1);
  ship(c,123,111,1.35);ridges(c,r,153,22,32,"#70627a");ridges(c,r,178,15,25,"#3f435a");
  for(let i=0;i<10;i++){const x=9+i*37,y=174+13*Math.sin(i);line(c,[[x,y-10],[x,y+6]],"#383c52",2);ellipse(c,x,y-11,2,2,"#f0b19e")}
}
function kite(c){
  const r=rng(713);rect(c,0,0,320,210,grad(c,0,0,0,210,[[0,"#39345c"],[.58,"#777399"],[1,"#d7afa6"]]));skyStars(c,r,61,115);
  for(let i=0;i<6;i++){const p=[];for(let x=-10;x<340;x+=5)p.push([x,95+18*Math.sin(x*.018+i*.25)+i*2]);line(c,p,i%2?"#9ca8ac":"#b5a1ad",1)}
  const x=164,y=80;line(c,[[x,y+30],[152,126],[117,141],[140,149],[122,160],[82,169]],"#efe0b1",2);
  poly(c,[[x-53,y+9],[x+4,y-33],[x+48,y+5],[x-1,y+33]],"#f4bd72");
  poly(c,[[x-53,y+9],[x+4,y-33],[x-1,y+1]],"#72d1be");poly(c,[[x-1,y+1],[x+48,y+5],[x-1,y+33]],"#cc7e80");line(c,[[x+4,y-33],[x-1,y+33]],"#fbe9bd",2);
  for(const [xx,yy] of [[151,126],[122,141],[130,154]])poly(c,[[xx-5,yy-4],[xx+5,yy+4],[xx+5,yy-4],[xx-5,yy+4]],"#f5c176");
  ridges(c,r,154,24,22,"#687288");ridges(c,r,171,21,18,"#44556a");
  for(const [xx,yy,s] of [[45,183,1],[265,182,.65]]){line(c,[[xx-10*s,yy],[xx,yy-42*s],[xx+10*s,yy],[xx-5*s,yy-17*s],[xx+5*s,yy-17*s]],"#38475c",2);for(let j=0;j<3;j++)arc(c,xx,yy-42*s,5+j*5,-1.3,.6,"#b4cbbd",1);ellipse(c,xx,yy-42*s,2,2,"#ffc78a")}
}
function diverBell(c,x,y,s){
  c.save();c.translate(x,y);c.scale(s,s);
  line(c,[[0,-100],[0,-24]],"#94af93",1.5);ring(c,0,-23,4,"#bd9c68",2);
  ellipse(c,0,-1,20,20,"#d69151");rect(c,-20,-2,40,17,"#dba65e");poly(c,[[-20,10],[-26,18],[-25,23],[25,23],[26,18],[20,10]],"#eaba70");
  line(c,[[-20,13],[20,13]],"#a16c46",3);ellipse(c,-2,-2,11,11,"#eac580");ellipse(c,-2,-2,8.7,8.7,"#22636a");ellipse(c,-3,-4,5,5,"#478b86");
  line(c,[[-9,-2],[5,-2]],"#d5aa63",1.7);line(c,[[-2,-9],[-2,5]],"#d5aa63",1.7);round(c,14,-1,12,7,2,"#f6d998");c.restore()
}
function bell(c){
  const r=rng(211);rect(c,0,0,320,210,grad(c,0,0,0,210,[[0,"#387c7b"],[.61,"#154b5b"],[1,"#102e40"]]));
  for(let i=0;i<6;i++)poly(c,[[26+i*55,-2],[48+i*55,-2],[-28+i*55,153]],"rgba(156,204,167,.075)");
  for(let i=0;i<65;i++)ellipse(c,r()*320,r()*204,.5+r(),.5+r(),"#7dad9c");
  ridges(c,r,134,15,36,"#29616b");ridges(c,r,158,17,33,"#1b4854");
  poly(c,[[148,92],[271,88],[263,130],[145,100]],"rgba(244,209,126,.16)");diverBell(c,123,94,1.14);
  for(const [x,y,s] of [[232,91,1],[257,82,.6],[216,72,.5]]){
    c.fillStyle="#e3a18b";c.beginPath();c.arc(x,y,8*s,Math.PI,TAU);c.fill();
    for(let j=0;j<4;j++)line(c,[[x-5*s+j*3*s,y],[x-7*s+j*3*s,y+6*s],[x-4*s+j*3*s,y+13*s]],"#d6a191",1.2*s);
  }
  function coral(x,y,len,theta,depth){const nx=x+Math.sin(theta)*len,ny=y-Math.cos(theta)*len;line(c,[[x,y],[nx,ny]],depth>1?"#b26864":"#e59d7d",depth*1.2+.5);if(depth>0){coral(nx,ny,len*.64,theta-.43-r()*.27,depth-1);coral(nx,ny,len*.71,theta+.25+r()*.32,depth-1)}}
  for(const [x,y,s] of [[26,194,15],[288,196,21],[260,194,12],[10,177,10]])coral(x,y,s,0,3);
  for(let i=0;i<18;i++){const x=151+r()*49,y=120+r()*17;poly(c,[[x,y],[x+4,y-2],[x+4,y],[x+6,y-1],[x+4,y+2]],"#9fc3ae")}
}
const scenes={ember,relay,lunar,kite,bell};
function compose(c,id,x,y,w,h){c.save();c.translate(x,y);c.scale(w/320,h/210);scenes[id](c);c.restore()}
function helmet(c,x,y,s){
  c.save();c.translate(x,y);c.scale(s,s);const shell="#e4ad65",ink="#2d5351",highlight="#f8d494";
  poly(c,[[-59,33],[-67,47],[-60,58],[-31,66],[31,66],[60,58],[67,47],[58,33]],shell);
  ellipse(c,0,-4,53,55,ink);ellipse(c,0,-4,49,51,shell);
  arc(c,-2,-6,42,3.55,5.05,highlight,3);rect(c,-53,-10,12,27,ink);rect(c,42,-10,11,27,ink);
  ring(c,0,-2,33,ink,6);ellipse(c,0,-2,27,27,ink);ring(c,0,-2,24,highlight,2);
  for(const a of [-1,0,1]){line(c,[[a*13-13,-21],[a*13+13,18]],shell,3);line(c,[[a*13-13,18],[a*13+13,-21]],shell,3)}
  for(let i=0;i<12;i++){const a=i*TAU/12;ellipse(c,Math.cos(a)*33,-2+Math.sin(a)*33,1.6,1.6,highlight)}
  round(c,-12,-62,24,8,2,ink);line(c,[[-53,45],[-27,54],[27,54],[54,45]],ink,3);c.restore();
}
export function gamePrints(atlas){
  for(const [id,g] of Object.entries(titles)){
    atlas.add(id+"Screen",384,294,(c,w,h)=>{
      rect(c,0,0,w,h,"#091822");c.save();c.translate(8,24);c.scale(368/320,232/210);scenes[id](c);c.restore();
      const left=id==="bell"?"DEPTH  084 M":"1UP  00"+g.no+"50";
      text(c,left,12,17,12,"#d3e4ce",mono);text(c,id==="bell"?"O₂  96%":"HI  048600",w-12,17,12,g.a,{...mono,align:"right"});
      text(c,g.name,19,56,id==="bell"?26:29,g.paper,{italic:id!=="bell",stroke:[g.c,3.5]});
      rect(c,8,254,368,2,g.b);text(c,g.blurb,w/2,274,13,g.paper,{...mono,align:"center"});
      text(c,"INSERT TOKEN   •   CREDIT 00",w/2,289,9,"#95b5ae",{...mono,align:"center"});
      for(let y=1;y<h;y+=3)rect(c,0,y,w,.6,"rgba(0,8,15,.13)");
      const shade=c.createRadialGradient(w*.48,h*.47,h*.25,w*.49,h*.5,w*.63);shade.addColorStop(0,"rgba(0,0,0,0)");shade.addColorStop(1,"rgba(0,10,14,.48)");rect(c,0,0,w,h,shade);
    });
    atlas.add(id+"Marquee",640,164,(c,w,h)=>{
      rect(c,0,0,w,h,g.c);
      if(id==="bell"){
        rect(c,5,5,w-10,h-10,g.a);rect(c,8,8,w-16,h-16,"#173e43");
        for(let i=0;i<8;i++){line(c,[[0,40+i*10],[83-i*4,61+i*4]],g.a,2);line(c,[[w,40+i*10],[w-83+i*4,61+i*4]],g.a,2)}
        text(c,"P E L A G I C     I N S T R U M E N T S",w/2,30,16,g.a,{...sans,align:"center"});
        text(c,"BELL DIVER",w/2,111,86,g.paper,{...serif,align:"center",max:491,stroke:["#512f23",2]});
        text(c,"★    DEEP  SEA  EXPEDITION    ★",w/2,145,20,g.a,{...mono,align:"center"});
      } else {
        compose(c,id,318,-37,334,226);
        poly(c,[[0,0],[402,0],[353,164],[0,164]],g.c);
        for(let i=0;i<4;i++)poly(c,[[371+i*7,0],[374+i*7,0],[325+i*7,164],[322+i*7,164]],i%2?g.a:g.b);
        text(c,g.maker,20,30,16,g.a,mono);text(c,g.name,21,113,73,g.b,{italic:true,max:338});text(c,g.name,16,107,73,g.paper,{italic:true,max:338});
        text(c,g.type+"    /    "+g.no,18,144,16,g.a,mono);
      }
      grain(c,w,h,2000,id.charCodeAt(0));
    });
    atlas.add(id+"Side",384,704,(c,w,h)=>{
      rect(c,0,0,w,h,g.c);
      if(id==="bell"){
        rect(c,12,12,w-24,h-24,"#245557");c.strokeStyle=g.a;c.lineWidth=3;c.strokeRect(21,21,w-42,h-42);
        for(let i=0;i<15;i++){const y=550+i*9,p=[];for(let x=20;x<w-18;x+=4)p.push([x,y+4*Math.sin(x*.055+i*.13)]);line(c,p,i%3?g.b:g.a,1.5)}
        for(let i=0;i<24;i++){const a=TAU*i/24;line(c,[[192+Math.cos(a)*102,298+Math.sin(a)*102],[192+Math.cos(a)*145,298+Math.sin(a)*145]],"#52807a",2)}
        ring(c,192,298,106,g.a,3);ring(c,192,298,99,g.a,1);helmet(c,192,292,1.35);
        text(c,"BELL",192,460,69,g.paper,{...serif,align:"center"});text(c,"DIVER",192,509,59,g.paper,{...serif,align:"center"});
        text(c,"FATHOM  WORKS  •  04",192,540,18,g.a,{...mono,align:"center"});
      } else{
        for(let j=0;j<6;j++)poly(c,[[j*22-50,0],[j*22-41,0],[w+30,391-j*22],[w+30,402-j*22]],j%2?g.a:g.b);
        c.save();c.beginPath();c.ellipse(w*.5,308,179,165,-.13,0,TAU);c.clip();compose(c,id,-35,136,w+70,343);c.restore();
        c.save();c.translate(w*.5,308);c.rotate(-.13);c.scale(1,165/179);ring(c,0,0,179,g.paper,5);ring(c,0,0,189,g.b,3);c.restore();
        poly(c,[[0,445],[w,405],[w,574],[0,614]],g.c);
        const words=g.name.split(" ");c.save();c.translate(28,474);c.rotate(-.10);
        text(c,words[0],3,7,70,g.b,{italic:true,max:330});text(c,words[0],0,0,70,g.paper,{italic:true,max:330});
        text(c,words[1],48,62,71,g.a,{italic:true,max:309});c.restore();
        for(let j=0;j<4;j++)line(c,[[-8,606+j*9],[w,561+j*9]],j%2?g.a:g.b,3);
        text(c,g.maker,20,668,15,g.paper,mono);
      }
      grain(c,w,h,8900,415+id.length,.16);
    });
    atlas.add(id+"Deck",512,166,(c,w,h)=>{
      rect(c,0,0,w,h,id==="bell"?"#345c58":g.c);
      for(let i=0;i<3;i++)line(c,[[0,17+i*6],[162,17+i*6],[188,40+i*6],[w,40+i*6]],i%2?g.b:g.a,2);
      const cx=id==="bell"?99:id==="lunar"?166:156,cy=83,rad=id==="lunar"||id==="kite"?54:42;
      for(let i=0;i<4;i++){const a=i*Math.PI/2;arc(c,cx,cy,rad,a+.15,a+1.38,g.a,1.5)}
      for(let i=0;i<16;i++){const a=i*TAU/16;line(c,[[cx+Math.cos(a)*(rad+1),cy+Math.sin(a)*(rad+1)],[cx+Math.cos(a)*(rad+(i%4?4:8)),cy+Math.sin(a)*(rad+(i%4?4:8))]],g.a,1.3)}
      const wear=rng(172+g.name.length*11);
      for(let i=0;i<25;i++){const xx=26+wear()*454,yy=120+wear()*42;line(c,[[xx,yy],[xx+1+wear()*9,yy-wear()*1.7]],i%3?"rgba(228,209,174,.17)":"rgba(21,26,26,.22)",.65)}
      text(c,id==="bell"?"BALLAST CONTROL":g.type,16,151,13,g.paper,mono);
      text(c,id==="bell"?"DESCEND  /  LIGHTS":id==="lunar"||id==="kite"?"VECTOR CONTROL":"MOVE   /   ACTION",w-14,151,13,g.paper,{...mono,align:"right"});
      for(const x of [12,w-12])for(const y of [10,h-10]){ellipse(c,x,y,3,3,"#b6b7a9");line(c,[[x-2,y+1],[x+2,y-1]],"#4c5660",1)}
      grain(c,w,h,1300,173);
    });
  }
}
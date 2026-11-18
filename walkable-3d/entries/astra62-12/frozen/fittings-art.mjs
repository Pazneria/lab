import {rect,poly,line,ellipse,ring,text,mono,serif,sans,star,grain,rng} from "./graphics.mjs";
export function fittingPrints(a){
  a.add("border",384,80,(c,w,h)=>{
    rect(c,0,0,w,h,"#435251");
    for(const [y,hh,col] of [[0,3,"#393946"],[5,2,"#aa8769"],[10,2,"#806e64"],[68,2,"#806e64"],[73,2,"#aa8769"],[77,3,"#393946"]])rect(c,0,y,w,hh,col);
    for(let x=-32;x<w+33;x+=64){line(c,[[x-28,40],[x,20],[x+28,40],[x,60],[x-28,40]],"#8d7c68",2);poly(c,[[x-10,40],[x,32],[x+10,40],[x,48]],"#9b7864")}
    grain(c,w,h,6200,382,.22)
  });
  a.add("mat",512,272,(c,w,h)=>{
    rect(c,0,0,w,h,"#5b4d42");
    for(let i=0;i<h;i+=3){rect(c,0,i,w,1,"#766251");rect(c,0,i+1,w,.8,"#493e37")}
    c.strokeStyle="#a08a6f";c.lineWidth=2;c.strokeRect(14,14,w-28,h-28);c.strokeRect(20,20,w-40,h-40);
    star(c,w/2,77,18,"#b49b79");text(c,"NIGHT PIER",w/2,161,55,"#bca380",{...serif,align:"center"});
    text(c,"A M U S E M E N T S",w/2,195,20,"#ab9679",{...sans,align:"center"});grain(c,w,h,12500,375,.28)
  });
  a.add("ceiling",256,256,(c,w,h)=>{
    rect(c,0,0,w,h,"#aa987f");const r=rng(772);
    for(let i=0;i<4300;i++){const x=r()*w,y=r()*h;rect(c,x,y,r()*2.6+.4,r()*.8+.4,i%3?"#958570":"#bdab90")}
    rect(c,0,0,w,1,"#766d60");rect(c,0,0,1,h,"#766d60");rect(c,2,2,w,1,"#baab92");rect(c,2,2,1,h,"#baab92");
  });
  a.add("laminate",256,256,(c,w,h)=>{rect(c,0,0,w,h,"#d4cbb2");const r=rng(987);for(let i=0;i<6900;i++){const x=r()*w,y=r()*h;ellipse(c,x,y,1+r()*1.4,.45+r()*.7,i%6?"#c0b9a6":"#a5a797")}grain(c,w,h,8300,854,.10)});
  a.add("lino",256,256,(c,w,h)=>{rect(c,0,0,w,h,"#b6b5a0");rect(c,0,0,w/2,h/2,"#6a8179");rect(c,w/2,h/2,w/2,h/2,"#6a8179");for(const y of [0,128]){rect(c,0,y,w,1.5,"#69766f");rect(c,y,0,1.5,h,"#69766f")}grain(c,w,h,16000,841,.23)});
  a.add("transom",512,96,(c,w,h)=>{rect(c,0,0,w,h,"#537572");for(let i=-1;i<5;i++){const x=i*128;poly(c,[[x-64,48],[x,4],[x+64,48],[x,92]],"#b3a376");poly(c,[[x-44,48],[x,17],[x+44,48],[x,79]],"#687f74");star(c,x,48,16,"#d7b07e");line(c,[[x-65,48],[x,3],[x+65,48],[x,93],[x-65,48]],"#344b47",3)}rect(c,0,3,w,3,"#c9aa7e");rect(c,0,h-6,w,3,"#c9aa7e");grain(c,w,h,4200,123)});
  a.add("counterBanner",768,124,(c,w,h)=>{rect(c,0,0,w,h,"#214b49");
    line(c,[[0,8],[w,8]],"#b5996f",2);line(c,[[0,h-8],[w,h-8]],"#b5996f",2);
    text(c,"TOKEN  WINDOW",w/2,81,60,"#f1d7a5",{...serif,align:"center",max:597});star(c,54,h/2,18,"#cf9d6c");star(c,w-54,h/2,18,"#cf9d6c");
  });
  a.add("register",192,64,(c,w,h)=>{rect(c,0,0,w,h,"#263936");for(let i=0;i<4;i++){rect(c,13+i*43,6,36,52,"#ced0b9");text(c,["$","0","2","5"][i],31+i*43,48,40,"#36493f",{...mono,align:"center"});rect(c,13+i*43,32,36,1.6,"#778173")}});
  a.add("ledger",256,176,(c,w,h)=>{rect(c,0,0,w,h,"#e7d7b2");rect(c,0,0,13,h,"#91765b");text(c,"WICKET RECORD",26,27,18,"#636356",mono);line(c,[[24,36],[236,36]],"#a98e73",1.2);for(let i=0;i<7;i++)line(c,[[23,53+i*16],[235,53+i*16]],"#b0ad93",1);line(c,[[70,40],[70,163]],"#b98c7d",1);
    ["8:15   TOKENS   4 rolls","8:40   FLOAT    A.K.","9:00   COUNT    125","9:20   TICKETS  03"].forEach((s,i)=>text(c,s,28,66+i*20,11,"#63726b",{...serif,italic:true}));
  });
  a.add("prizeCard",256,80,(c,w,h)=>{rect(c,0,0,w,h,"#e5d2a7");line(c,[[4,6],[w-4,6]],"#ad7661",2);text(c,"PRIZE EXCHANGE",w/2,37,25,"#7e4a40",{...serif,align:"center"});text(c,"SAVE YOUR TICKETS",w/2,63,14,"#6a6354",{...mono,align:"center"})});
  a.add("tideCard",256,344,(c,w,h)=>{
    rect(c,0,0,w,h,"#e0d6bb");rect(c,9,9,w-18,55,"#456760");text(c,"TIDE TABLE",w/2,47,28,"#f0dfbe",{...serif,align:"center"});
    text(c,"NORTH WHARF   /   NOV",w/2,87,16,"#695b4c",{...mono,align:"center"});line(c,[[14,98],[242,98]],"#93836a",1.5);
    for(let j=0;j<7;j++){const y=127+j*21;text(c,["MON","TUE","WED","THU","FRI","SAT","SUN"][j],20,y,12,"#506159",mono);text(c,"0"+(3+j%5)+":"+String(12+j*6)+"      1"+(5+j%4)+":"+String(16+j*5),89,y,12,"#506159",mono);line(c,[[16,y+5],[240,y+5]],"#b3a891",.8)}
    const p=[];for(let x=14;x<243;x+=3)p.push([x,285+16*Math.sin(x*.059)]);line(c,p,"#72938b",2);
    text(c,"HARBOURMASTER'S OFFICE",w/2,323,12,"#817866",{...mono,align:"center"});
  });
  a.add("shelfTag",128,48,(c,w,h)=>{rect(c,0,0,w,h,"#ddcba4");text(c,"60  TICKETS",w/2,33,19,"#5b5a50",{...mono,align:"center"})});
  a.add("shift",256,88,(c,w,h)=>{rect(c,0,0,w,h,"#eee0bb");text(c,"BACK IN A MINUTE",w/2,40,23,"#8c5043",{...serif,align:"center",max:232});text(c,"—  ELLIS",w/2,69,16,"#77715d",{...serif,align:"center",italic:true})});
}
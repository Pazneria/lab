"use strict";
PH.buildPotting=function(){
  const {rand,pick,mix,TAU,add,sub,mul,len,norm,cross,lerp3,shift,rgb,tint,mat:M,face,box,beam,tube,blob,lathe,obstacle,ao,plaque}=PH;
  const B=PH.botany, green=rgb('536b5e'),gray=rgb('89948b'),dark=rgb('424e43'),wood=rgb('948269'),brass=rgb('a99157');
  function pot(x,y,z,s,fill=false,greenGlaze=false){
    const profile=[[.108,0],[.123,.006],[.133,.036],[.173,.208],[.182,.212],[.184,.247],[.181,.257],[.163,.257],[.161,.242],[.151,.208],[.112,.040],[.010,.036]];
    const C=rgb(greenGlaze?pick(['61796a','637e6b','718678']):pick(['b57956','a96e50','b8805f','a77457','be8865','b18163','aa7051']));
    lathe(x,z,profile.map(([r,p])=>[r*s,y+p*s]),(i)=>tint(C,i===3?.94:i===4?.88:i>7?.72:1),greenGlaze?M.paint:M.clay,s>1.3?28:20);
    if(fill)lathe(x,z,[[.001,y+.218*s],[.153*s,y+.216*s],[.153*s,y+.209*s]],rgb('5a4b37'),M.soil,20);
    ao(x,z,.19*s,.21*s,.35);
    return y+.219*s;
  }
  function bucket(x,y,z,s){
    const p=[[.14,0],[.145,.02],[.17,.29],[.18,.295],[.181,.312],[.171,.314],[.165,.298],[.144,.041],[.006,.024]];
    lathe(x,z,p.map(([r,h])=>[r*s,y+h*s]),rgb('93a29a'),M.zinc,28);
    for(const h of [.065,.227])lathe(x,z,[[.151+h*.077,y+h*s],[.156+h*.077,y+(h+.008)*s],[.151+h*.077,y+(h+.014)*s]].map(([r,h])=>[r*s,h]),gray,M.zinc,24);
    const path=[];
    for(let i=0;i<=18;i++){const a=i*Math.PI/18;path.push([x+Math.cos(a)*.17*s,y+(.253+.235*Math.sin(a))*s,z+Math.sin(a)*.038*s]);}
    tube(path,.006*s,dark,M.zinc,7);
  }
  function tray(x,y,z,w,d){
    const C=rgb('917c5c');box(x,y+.011,z,w,.022,d,C,M.wood);
    for(const s of [-1,1]){box(x+s*(w/2-.011),y+.05,z,.021,.10,d,tint(C,1.03),M.wood);box(x,y+.052,z+s*(d/2-.011),w,.104,.021,tint(C,.90),M.wood);}
    box(x,y+.067,z,w-.033,.027,d-.033,rgb('5a4b38'),M.soil);
    for(let j=0;j<3;j++)for(let i=0;i<5;i++){
      if(rand()<.19)continue;
      const px=x+w*((i+.55)/5-.5)+rand(-.016,.016),pz=z+d*((j+.55)/3-.5)+rand(-.012,.012),h=rand(.042,.093),a=rand(0,TAU);
      tube([[px,y+.08,pz],[px+.009,y+.08+h,pz]],[.003,.0016],rgb('899557'),M.fiber,4);
      for(const s of [0,Math.PI])B.leaf([px+.009,y+.08+h,pz],a+s,.038,.017,.017,.013,M.heart,pick(['779651','89a563','647f45']),{rib:false,rows:4,cols:2});
    }
  }
  // Rear alcove: salvaged tongue-and-groove boarding, worktop and open lower shelf.
  const bx=-.14,bz=-8.67,bw=4.04,bd=.87,top=.94;
  for(let i=0;i<29;i++){
    const x=bx-bw*.55+(i+.5)*bw*1.1/29;
    box(x,1.04,-9.04,bw*1.1/29-.005,2.04,.107,tint(pick(['879184','939c8b','828b7b','909b8b','97a08f']),rand(.96,1.02)),M.wood);
  }
  box(bx,.24,-8.969,bw*1.1,.087,.06,green,M.paint);box(bx,2.07,-9.026,bw*1.12,.094,.16,green,M.wood);
  for(const s of [-1,1]){
    const x=bx+s*bw*.55;
    box(x,1.16,-8.86,.095,2.32,.13,green,M.paint);
    beam([x,1.78,-8.98],[x,2.17,-8.39],.048,.054,green,M.paint);
    beam([x,2.29,-9.04],[x,2.22,-8.34],.066,.084,green,M.paint);
  }
  box(bx,2.308,-8.95,bw*1.12,.076,.15,green,M.paint);
  for(let j=0;j<5;j++){const w=bd/5;box(bx,top-.035,bz-bd/2+w*(j+.5),bw,.07,w-.004,tint(pick(['a39273','a48e6c','9b896b','988467']),rand(.96,1.035)),M.wood);}
  for(const x of [bx-bw/2+.12,bx,bx+bw/2-.12]){
    for(const s of [-1,1]){const z=bz+s*(bd/2-.095);box(x,.46,z,.104,.905,.108,tint('887c61',rand(.90,1.03)),M.wood);}
    beam([x,.24,bz-.34],[x,.74,bz+.32],.058,.056,wood,M.wood);
  }
  for(const s of [-1,1]){box(bx,.794,bz+s*(bd/2-.071),bw-.12,.157,.071,wood,M.wood);box(bx,.262,bz+s*.315,bw-.1,.073,.063,dark,M.wood);}
  for(let j=0;j<5;j++)box(bx,.318,bz+(j-2)*.131,bw-.18,.048,.109,tint('978368',rand(.90,1.04)),M.wood);
  obstacle(bx-bw/2,-9.14,bx+bw/2,bz+bd/2);ao(bx,bz,2.45,.8,.67);
  // A propagation tray and an assortment of nested earthenware pots.
  tray(bx-.97,top,bz+.055,.77,.49);
  for(const [x,z,s,n] of [[.31,-.14,.72,3],[.66,-.19,.61,2],[.76,.098,.54,1],[1.08,-.10,.84,4],[1.50,.10,.60,2]]){
    for(let i=0;i<n;i++)pot(bx+x,top+.067*s*i,bz+z,s*(1-.016*i));
  }
  const herbY=pot(bx-1.68,top,bz-.03,1.10,true,true);B.softFern(bx-1.68,bz-.03,.34,herbY);
  const smallY=pot(bx+1.62,top,bz-.16,.71,true);B.rosette(bx+1.62,bz-.16,.27,smallY);
  for(let j=0;j<7;j++){
    const x=bx+rand(-1.68,.04),z=bz+rand(-.18,.21),s=rand(.74,1.13);pot(x,.343,z,s);if(j%2===0)pot(x,.343+.068*s,z,s*.98);
  }
  // A zinc watering can with a curved handle, a long tapered spout and a pierced rose.
  function wateringCan(x,y,z,s){
    const C=rgb('8f9c91');
    lathe(x,z,[[.146,0],[.185,.014],[.207,.091],[.193,.326],[.183,.343],[.122,.348],[.105,.333],[.105,.321]].map(([r,h])=>[r*s,y+h*s]),C,M.zinc,32);
    for(const h of [.045,.288])lathe(x,z,[[.2,y+h*s],[.203,y+(h+.009)*s],[.198,y+(h+.018)*s]].map(([r,h])=>[r*s,h]),tint(C,.91),M.zinc,28);
    const P=(xx,yy,zz)=>[x+xx*s,y+yy*s,z+zz*s];
    tube([P(.149,.09,0),P(.224,.124,0),P(.412,.303,0),P(.479,.381,0)],[.064,.052,.025,.023].map(v=>v*s),C,M.zinc,14);
    const n=norm([.76,.65,0]),side=[0,0,1],orth=norm(cross(n,side)),ro=P(.486,.386,0),end=add(ro,mul(n,.043*s));
    tube([ro,end],[.036*s,.064*s],brass,M.brass,16,true);
    for(let j=0;j<19;j++){const a=j*2.399,rad=Math.sqrt(j/19)*.052*s,p=add(add(end,mul(n,.0018)),add(mul(side,Math.cos(a)*rad),mul(orth,Math.sin(a)*rad)));blob(...p,.0029*s,.0029*s,.0029*s,dark,M.zinc,2,4);}
    const h=[];for(let i=0;i<=21;i++){const a=(-.49+.99*i/21)*Math.PI;h.push(P(-.11-.20*Math.cos(a),.23+.155*Math.sin(a),0));}
    tube(h,.014*s,C,M.zinc,9);
    const arch=[];for(let i=0;i<=19;i++){const a=Math.PI*i/19;arch.push(P(-.015,.32+.17*Math.sin(a),.155*Math.cos(a)));}
    tube(arch,.013*s,C,M.zinc,9);
  }
  wateringCan(bx-.10,top,bz+.04,.84);bucket(bx+1.40,.345,bz,.86);
  // Shelf brackets, a slate stock board, seed packets and plant stakes.
  box(bx-1.05,1.576,-8.897,1.89,.047,.31,wood,M.wood);
  for(const x of [bx-1.79,bx-.30]){beam([x,1.31,-8.976],[x,1.556,-8.763],.027,.035,dark,M.zinc);box(x,1.435,-8.96,.049,.25,.023,dark,M.zinc);}
  for(let j=0;j<4;j++)pot(bx-1.78+j*.285,1.600,-8.88,.49+j*.045);
  box(bx+.94,1.650,-8.954,1.31,.59,.057,wood,M.wood);plaque([bx+.94,1.65,-8.922],[1,0,0],[0,1,0],1.245,.527,8);
  box(bx,2.085,-8.917,1.60,.244,.07,dark,M.paint);plaque([bx,2.085,-8.877],[1,0,0],[0,1,0],1.54,.215,7);
  const potStakeY=pot(bx-1.95,top,bz+.176,.56);
  for(let i=0;i<8;i++){
    const x=bx-1.95+rand(-.044,.044),zz=bz+.176+rand(-.038,.038),h=rand(.19,.29);
    beam([x,top+.025,zz],[x+rand(-.060,.060),top+h,zz+rand(-.03,.035)],.013,.005,rgb('c2ad83'),M.wood);
  }
  for(const [x,z,angle,id]of [[bx+.36,bz+.247,-.22,9],[bx+.42,bz+.25,.14,10]]){
    const right=[Math.cos(angle),0,Math.sin(angle)],u=[-Math.sin(angle),.01,Math.cos(angle)];
    plaque([x,top+.008+(id-9)*.006,z],right,u,.147,.206,id);
  }
  // Gooseneck enamel task lamp.
  const lx=bx-1.05;
  tube([[lx,2.17,-8.98],[lx,2.28,-8.95],[lx,2.34,-8.85],[lx,2.35,-8.66],[lx,2.30,-8.54],[lx,2.23,-8.515]],.016,dark,M.zinc,9);
  lathe(lx,-8.515,[[.034,2.245],[.041,2.198],[.11,2.158],[.161,2.093],[.169,2.078],[.16,2.072]].map(q=>q),green,M.paint,24);
  lathe(lx,-8.515,[[.16,2.074],[.10,2.133],[.036,2.162]],rgb('d5cfb5'),M.paint,24);
  blob(lx,2.127,-8.515,.036,.048,.036,rgb('ded7b8'),M.stone,5,10);
  // Hose loops are tied at the hook and sag separately under their own weight.
  const hx=3.92,hz=-4.56,hy=1.3;
  beam([4.10,hy+.035,hz],[3.79,hy+.035,hz],.044,.037,gray,M.zinc);
  tube([[3.825,hy,hz-.114],[3.785,hy+.073,hz-.09],[3.785,hy+.077,hz+.09],[3.825,hy,hz+.113]],.018,gray,M.zinc,8);
  const hose=[];const winds=5.42;
  for(let j=0;j<=166;j++){
    const t=j/166,a=t*winds*TAU,ss=Math.sin(a);
    hose.push([hx-.08*t-.018*Math.cos(a),hy-.376+.383*Math.cos(a)+.019*Math.sin(a*1.03),hz+.245*ss*(1.1-.23*Math.cos(a))+.027*t]);
  }
  tube(hose,.0195,rgb('455c48'),M.rubber,8);
  const e=hose[hose.length-1];
  const tail=[e,[3.79,.48,hz+.22],[3.80,.13,hz+.43],[3.76,.039,hz+.67],[3.54,.034,hz+.90],[3.47,.033,hz+1.36],[3.62,.034,hz+1.57],[3.76,.035,hz+1.69],[3.78,.034,hz+1.92]];
  tube(tail,.0195,rgb('495c48'),M.rubber,8);
  tube([tail[7],tail[8],shift(tail[8],0,0,.10)],[.022,.032,.018],brass,M.brass,12);
  const tx=3.96,tz=hz-.53,ty=.99;
  tube([[4.13,ty,tz],[tx,ty,tz],[tx-.07,ty-.034,tz],[tx-.08,ty-.091,tz]],.029,brass,M.brass,10);
  tube([[tx-.035,ty,tz],[tx-.035,ty+.075,tz]],.012,brass,M.brass,8);
  const wheel=[];for(let j=0;j<=19;j++){const a=TAU*j/19;wheel.push([tx-.035+Math.cos(a)*.062,ty+.083,tz+Math.sin(a)*.062]);}
  tube(wheel,.009,rgb('99694d'),M.paint,6);
  for(let j=0;j<3;j++)tube([[tx-.035,ty+.083,tz],wheel[Math.floor(j*19/3)]],.007,rgb('966448'),M.paint,5);
  // Narrow benches and elevated pots give the two side aisles different foregrounds.
  function wallShelf(s,zCenter,length,height){
    const x=s*3.88;
    for(const z of [zCenter-length*.37,zCenter+length*.37]){
      beam([s*4.02,height-.47,z],[s*3.62,height-.07,z],.036,.042,green,M.zinc);
      box(s*4.04,height-.23,z,.04,.49,.073,green,M.zinc);
    }
    for(let k=0;k<3;k++)box(x+(k-1)*.164,height-.031,zCenter,.158,.062,length,tint('938a71',rand(.86,1.02)),M.wood);
    obstacle(x-.248,zCenter-length/2,x+.248,zCenter+length/2);ao(x,zCenter,.56,length*.70,.28);
  }
  wallShelf(-1,4.12,2.20,.86);
  let py=pot(-3.83,.86,4.72,1.19,true,true);B.rosette(-3.83,4.72,.58,py);
  py=pot(-3.83,.86,3.80,.82,true);B.softFern(-3.83,3.80,.36,py);
  pot(-3.88,.86,3.27,.69);pot(-3.88,.905,3.27,.67);
  wallShelf(1,-.75,2.38,.84);
  py=pot(3.79,.84,-1.41,.99,true);B.aroid(3.79,-1.41,.47,'jewel',py);
  tray(3.85,.84,-.57,.39,.62);pot(3.83,.84,.15,.71,true);
  for(const [x,z,s,what]of [[-3.50,-6.65,2.10,'fern'],[3.53,5.53,1.73,'aroid'],[-2.52,8.77,1.53,'rosette'],[2.65,-8.36,1.52,'rosette']]){
    const y=pot(x,.018,z,s,true);if(what==='fern')B.softFern(x,z,.80,y);else if(what==='aroid')B.aroid(x,z,.71,'jewel',y);else B.rosette(x,z,.63,y);
    const r=s*.18;obstacle(x-r,z-r,x+r,z+r);
  }
  // Sprung wire baskets hang from the side roof, clear of the path.
  for(const [s,z,height]of [[-1,-2.5,2.12],[1,3.85,2.34]]){
    const x=s*3.56;
    const bottom=height-.17;
    lathe(x,z,[[.076,bottom],[.14,bottom+.051],[.199,bottom+.13],[.205,height]],rgb('897656'),M.bark,20);
    lathe(x,z,[[.197,height-.02],[.21,height-.013],[.208,height+.014]],dark,M.zinc,20);
    for(let j=0;j<8;j++){
      const a=TAU*j/8,d=[Math.cos(a),0,Math.sin(a)];
      tube([[x+.055*d[0],bottom-.003,z+.055*d[2]],[x+.151*d[0],bottom+.062,z+.151*d[2]],[x+.212*d[0],height,z+.212*d[2]]],.005,gray,M.zinc,5);
      if(j%3===0)tube([[x+.207*d[0],height,z+.207*d[2]],[x,height+.44,z],[x,3.76,z]],.004,gray,M.zinc,5);
    }
    B.softFern(x,z,.54,height-.02);
    for(let k=0;k<3;k++){const a=rand(0,TAU),q=[];for(let i=0;i<9;i++){const t=i/8;q.push([x+Math.cos(a)*(.12+.17*t)+.045*Math.sin(t*7),height+.02-.51*t,z+Math.sin(a)*(.14+.12*t)+.03*Math.sin(t*6)]);}B.runningVine(q,.11,.59);}
  }
  PH.pot=pot;
};
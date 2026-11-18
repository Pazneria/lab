import {T,P,PI,TAU,model,group,part,box,bevel,cyl,rod,beam,bolt,tube,ball,plate,annulus,contact,localObstacle,seed} from './fabrication.js';
import {textLabel,tag,graphic,compliance,calibrationScreen,motionScreen,rect,txt,monoTxt,line,circle,ink,rust,paper} from './graphics.js';

function extrusion(g,a,b,w=.09,d=.09,col=P.alu){
  const dir=new T.Vector3(...b).sub(new T.Vector3(...a)),length=dir.length(),mid=new T.Vector3(...a).add(new T.Vector3(...b)).multiplyScalar(.5);
  const frame=group(g,mid.x,mid.y,mid.z);
  frame.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),dir.normalize());
  bevel(frame,0,0,0,w,length,d,.005,col,'metal');
  for(const s of [-1,1]){
    box(frame,s*(w*.5+.0006),0,0,.003,length-.006,d*.22,P.gun,'rubber');
    box(frame,0,0,s*(d*.5+.0006),w*.22,length-.006,.003,P.gun,'rubber');
  }
}
function table(g,w,d,level,col){
  contact(g,0,0,w+1.22,d+1.14);
  const xx=w/2-.13,zz=d/2-.112;
  for(const x of [-xx,xx])for(const z of [-zz,zz]){
    contact(g,x,z,.34,.31,.006);
    cyl(g,x,.041,z,.094,.076,P.rubber,'rubber',16);
    cyl(g,x,.095,z,.035,.065,P.alloy,'metal',12);
    cyl(g,x,.119,z,.059,.038,P.steel,'metal',6);
    extrusion(g,[x,.139,z],[x,level-.095,z],.085,.085,'#b9c2bc');
    bevel(g,x,level-.157,z,.147,.126,.139,.01,P.alloy,'metal');
    for(const s of [-1,1])bolt(g,x,level-.148,z+s*.072,.018,s===-1?'-z':'z');
  }
  for(const s of [-1,1]){
    extrusion(g,[-xx,level-.121,s*zz],[xx,level-.121,s*zz],.083,.085);
    extrusion(g,[s*xx,level-.121,-zz],[s*xx,level-.121,zz],.083,.085);
    extrusion(g,[s*xx,.266,-zz],[s*xx,.266,zz],.059,.059);
  }
  extrusion(g,[-xx,.263,-zz],[xx,.263,-zz],.067,.067);
  // Fixed trunking below the rear apron keeps the floor free.
  bevel(g,0,level-.269,-zz,w-.37,.139,.092,.012,P.sage,'paint');
  box(g,0,level-.256,-zz+.052,w-.43,.016,.018,P.deep,'rubber');
  bevel(g,0,level-.053,0,w,.096,d,.026,col,'laminate');
  bevel(g,0,level-.085,0,w+.008,.027,d+.009,.009,P.gun,'rubber');
  localObstacle(g,0,0,w,d);
}
function drawers(g,x,w,depth,top=.81){
  bevel(g,x,(top+.176)/2,-.01,w,top-.176,depth,.025,P.sage,'paint');
  const h=(top-.228)/3;
  for(let i=0;i<3;i++){
    const y=top-.022-h*(i+.5);
    bevel(g,x,y,depth*.5+.005,w-.049,h-.010,.042,.010,'#bac4b7','paint');
    box(g,x,y+h*.2,depth*.5+.037,w*.61,.026,.045,P.gun,'metal');
    box(g,x-.31*w,y-.02,depth*.5+.031,w*.123,.035,.008,P.ivory,'paint');
  }
  for(const side of [-1,1])bolt(g,x+side*(w/2-.05),.196,depth*.5+.013,.017);
}
function breadboard(g,x,z,w,d,y){
  bevel(g,x,y-.022,z,w,.044,d,.01,'#a5afab','metal');
  const o=graphic(g,x,y+.001,z,w-.024,d-.024,'breadboard'+w,1024,Math.round(1024*d/w),(c,W,H)=>{
    rect(c,0,0,W,H,'#a5afaa');
    const random=seed(8524);
    for(let i=0;i<1500;i++)rect(c,random()*W,random()*H,3+random()*44,.45,'rgba(238,241,224,.11)');
    const pitch=W/(w/.0475),nx=Math.floor(W/pitch),nz=Math.floor(H/pitch);
    for(let k=0;k<nx;k++)for(let j=0;j<nz;j++){
      const xx=(W-(nx-1)*pitch)/2+k*pitch,yy=(H-(nz-1)*pitch)/2+j*pitch;
      circle(c,xx,yy+.8,pitch*.14,'#d3d7c9',true);circle(c,xx,yy,pitch*.129,'#5f6c65',true);circle(c,xx,yy-.25,pitch*.083,'#34443e',true);
    }
  });
  o.rotation.x=-PI/2;
  for(const dx of [-1,1])for(const dz of [-1,1])bolt(g,x+dx*(w/2-.045),y+.006,z+dz*(d/2-.044),.017,'y',P.gun);
}
function monitor(g,x,z,level) {
  const mg=group(g,x,level,z,-.13);
  bevel(mg,0,.019,0,.47,.038,.31,.014,P.ink,'paint');
  rod(mg,[0,.025,0],[0,.744,-.056],.041,P.alloy,'metal',20);
  rod(mg,[0,.619,-.062],[0,.647,.098],.048,P.gun,'metal',20);
  const m=group(mg,0,.704,.084);m.rotation.x=-.045;
  bevel(m,0,0,0,1.348,.823,.075,.024,P.ink,'paint');
  bevel(m,0,0,-.049,.63,.42,.095,.032,P.alloy,'metal');
  for(const xx of [-.23,.23])for(const yy of [-.13,.13])bolt(m,xx,yy,-.103,.017,'-z');
  box(m,0,.01,.041,1.287,.746,.009,P.black,'rubber');
  calibrationScreen(m,0,.012,.047,1.253,.726);
  textLabel(m,-.46,-.386,.041,.255,.032,'FW  /  DISPLAY 7',{mono:true,color:'#b7c6b6'});
  box(m,.601,-.383,.042,.023,.007,.006,P.led,'signal');
  tube(mg,[[.17,.61,-.025],[.173,.532,-.063],[.055,.43,-.106],[.053,.19,-.071],[.069,.033,-.111],[.24,.021,-.20]],.012,P.rubber,'rubber',22);
}
function focusRing(g,z,r,d,col,n=48) {
  const barrel=cyl(g,0,0,z,r,d,col,'metal',n);barrel.rotation.x=PI/2;
}
function imager(g,x,y,z){
  const rail=group(g,x,y,z);
  extrusion(rail,[-.67,.045,0],[.52,.045,0],.086,.128,P.alloy);
  for(const sx of [-.635,.48]){bevel(rail,sx,.044,0,.052,.086,.143,.009,P.ink,'metal');bolt(rail,sx,.099,0,.024,'y');}
  bevel(rail,-.03,.106,0,.315,.066,.24,.015,P.deep,'metal');
  cyl(rail,-.03,.172,0,.102,.082,P.gun,'metal',24);
  rod(rail,[-.03,.173,0],[-.03,.277,0],.057,P.steel,'chrome',24);
  bevel(rail,-.03,.293,0,.223,.073,.171,.012,P.alloy,'metal');
  const h=group(rail,-.03,.427,0,PI/2-.075);h.rotation.x=.061;
  bevel(h,0,0,0,.26,.22,.36,.023,P.ivory,'paint');
  bevel(h,0,.0,-.18,.258,.217,.054,.014,P.orange,'paint');
  bevel(h,0,.001,.173,.269,.224,.035,.012,P.alloy,'metal');
  for(const s of [-1,1]){
    for(let i=0;i<6;i++)bevel(h,s*.135,.027,-.102+i*.034,.018,.127,.013,.003,P.gun,'metal');
    const side=group(h,s*.142,-.063,0,s*PI/2);textLabel(side,0,0,0,.239,.037,'LUCID / CAM-2',{mono:true});
  }
  for(const xx of [-.103,.103])for(const yy of [-.084,.084])bolt(h,xx,yy,.195,.011);
  focusRing(h,.212,.093,.062,P.gun);focusRing(h,.25,.082,.042,P.steel);
  focusRing(h,.3,.084,.069,P.ink);
  for(let i=0;i<6;i++)focusRing(h,.269+i*.011,.091,.005,P.gun);
  focusRing(h,.36,.095,.06,P.black);focusRing(h,.397,.10,.018,P.steel);
  focusRing(h,.407,.085,.008,'#222d32');
  const lens=ball(h,0,0,.41,.073,'#44757e','optic',32);lens.scale.z*=.20;
  const iris=ball(h,0,0,.425,.038,'#263f4a','optic',24);iris.scale.z*=.11;
  for(const sx of [-1,1]){
    rod(h,[sx*.061,-.016,-.192],[sx*.061,-.016,-.252],.029,P.gun,'metal',6);
    const end=[.455,-.4,-.58+sx*.024];
    tube(h,[[sx*.061,-.016,-.244],[sx*.076,-.02,-.303],[sx*.11,-.135,-.337],[.02+sx*.03,-.365,-.379],[.16+sx*.016,-.395,-.51],end],.012,P.rubber,'rubber',25);
    const exit=rail.worldToLocal(h.localToWorld(new T.Vector3(...end)));
    rod(rail,[exit.x,exit.y,exit.z],[exit.x,-.047,exit.z],.012,P.rubber,'rubber',9);
    cyl(rail,exit.x,-.045,exit.z,.025,.014,P.rubber,'rubber',16);
  }
}
function referenceTargets(g,level){
  const f=group(g,.42,level,.158);
  for(let i=0;i<3;i++){
    const x=(i-1)*.325;
    cyl(f,x,.013,0,.134,.026,P.ink,'rubber',28);
    cyl(f,x,.032,0,.118,.015,P.alloy,'metal',28);
    for(const s of [-1,1])box(f,x+s*.13,.004,.123,.041,.006,.009,P.deep,'paint');
    textLabel(f,x,.034,.139,.12,.028,'T-0'+(i+1),{mono:true,color:'#d4d9c8',bg:'#3c4d45'});
  }
  ball(f,-.325,.148,0,.109,'#e9e5cf','matte',32);
  const cube=bevel(f,0,.127,0,.179,.178,.179,.003,'#668f88','paint');cube.rotation.y=.34;
  const pyramid=cyl(f,.325,.152,0,.145,.225,'#c37645','paint',4,0);pyramid.rotation.y=.32;
  const frame=group(f,.055,.071,-.244,-.23);
  bevel(frame,0,0,0,.342,.052,.143,.009,P.gun,'metal');
  bevel(frame,0,.18,0,.328,.334,.025,.006,P.ceramic,'paint');
  graphic(frame,0,.18,.015,.304,.308,'checker',224,224,(c,W,H)=>{
    rect(c,0,0,W,H,'#e4e3d4');const s=26;
    for(let x=0;x<7;x++)for(let y=0;y<6;y++)if((x+y)%2===0)rect(c,21+x*s,15+y*s,s,s,ink);
    line(c,19,181,W-19,181,rust,3);monoTxt(c,'FIDUCIAL   /   7 × 6',19,205,15,ink);
  });
}
function taskLamp(g,x,level,z){
  const a=group(g,x,level,z,-.04);
  bevel(a,0,.056,0,.22,.11,.15,.015,P.deep,'metal');
  for(const zz of [-.039,.039]){
    beam(a,[0,.08,zz],[-.19,.621,zz],.045,.027,'#7f9289','metal',.006);
    beam(a,[-.19,.62,zz],[.28,.94,zz],.04,.027,'#91a298','metal',.006);
  }
  for(const [x,y] of [[0,.10],[-.19,.62],[.28,.94]])rod(a,[x,y,-.063],[x,y,.063],.051,P.gun,'metal',22);
  const l=group(a,.53,.91,.023);l.rotation.z=-.13;
  bevel(l,0,0,0,.61,.089,.203,.033,P.sage,'paint');
  box(l,0,-.049,.006,.531,.015,.156,'#f3eed9','light');
  tube(a,[[0,.07,-.049],[-.22,.56,-.067],[-.22,.66,-.075],[.27,.96,-.066],[.36,.94,-.056]],.011,P.rubber,'rubber',20);
}
function opticsShelf(g){
  const s=group(g,-1.57,1.72,-.736);
  bevel(s,0,0,0,1.22,.048,.263,.009,P.alloy,'metal');
  for(const x of [-.47,.47]){
    box(s,x,-.12,-.094,.038,.242,.041,P.gun,'metal');
    beam(s,[x,-.217,-.079],[x,-.021,.090],.03,.027,P.alloy,'metal',.004);
  }
  for(let i=0;i<3;i++){
    const x=-.341+i*.31,h=.115+i*.021;
    cyl(s,x,.035,0,.081,.021,P.ink,'rubber',20);cyl(s,x,.047+h/2,0,.066,h,P.gun,'metal',28);
    for(let j=0;j<3;j++)cyl(s,x,.067+j*.027,0,.069,.009,P.black,'rubber',28);
    cyl(s,x,.055+h,0,.066,.018,P.ceramic,'paint',28);
    textLabel(s,x,-.003,.139,.145,.029,'L / 0'+(i+1),{mono:true,color:'#203c33'});
  }
  bevel(s,-.05,.33,-.104,.85,.184,.04,.007,P.ceramic,'paint');
  tag(s,-.05,.33,-.081,.81,.158,'OPTICAL COMPONENTS','Reference lenses','35   /   50   /   85 mm');
}
function recordSheet(g,level){
  const f=group(g,1.647,level,.224,-.17);
  bevel(f,0,.012,0,.252,.014,.326,.005,'#6b6e5b','matte');
  box(f,0,.022,.001,.231,.008,.302,'#d5d4bf','matte');
  const pg=graphic(f,0,.027,.001,.231,.302,'sheet-optics',250,328,(c,W,H)=>{
    rect(c,0,0,W,H,'#e3e1ca');rect(c,15,18,33,6,rust);
    monoTxt(c,'FIELDWORK     FORM B-17',14,47,13,ink);txt(c,'Capture log',13,80,28,ink,600);
    line(c,13,96,W-13,96,'#72806f',1.5);monoTxt(c,'TARGET     EXP.      QC',15,116,13);
    for(let i=0;i<6;i++){
      const yy=144+i*24;line(c,15,yy+5,W-14,yy+5,'#a1ab94',1);
      if(i<4){monoTxt(c,['T-01','T-02','T-03','PL-7'][i],16,yy,14,'#53716a');monoTxt(c,['2.6 ms','2.6 ms','3.2 ms','4.0 ms'][i],97,yy,13,'#53716a');line(c,198,yy-3,202,yy+1,'#53716a',2);line(c,202,yy+1,213,yy-9,'#53716a',2);}
    }
    monoTxt(c,'OPTICS GROUP      02 / 04',15,H-17,12,'#879482');
  });pg.rotation.x=-PI/2;
  bevel(f,0,.034,-.121,.091,.015,.038,.004,P.alloy,'metal');
  const pencil=group(f,-.168,.018,.025,-.28);
  rod(pencil,[0,0,-.086],[0,0,.074],.0046,'#b68351','paint',6);
  rod(pencil,[0,0,.074],[0,0,.086],.0046,'#c4a573','matte',6,.0008);
  rod(pencil,[0,0,-.094],[0,0,-.086],.0051,P.steel,'metal',10);
}
export function buildPerception(){
  const g=group(model,-8.61,0,-.19,PI/2);
  table(g,4.35,1.22,.984,'#485956');drawers(g,1.33,1.13,.81,.854);
  breadboard(g,-.29,.10,2.96,.76,1.033);
  imager(g,-.967,1.035,.163);referenceTargets(g,1.039);
  monitor(g,1.42,-.328,.985);recordSheet(g,.985);taskLamp(g,-1.73,.984,-.377);opticsShelf(g);
  tag(g,-1.37,.924,.615,1.22,.085,'B — 02','VISION CALIBRATION','OPTICAL SYSTEMS GROUP');
  // Acquisition unit on the low rear shelf.
  bevel(g,-1.21,.32,-.129,1.02,.046,.606,.013,P.alloy,'metal');
  bevel(g,-1.23,.445,-.11,.88,.197,.49,.016,P.ceramic,'paint');
  const f=group(g,-1.23,.44,.142);
  box(f,-.183,0,0,.392,.111,.013,P.deep,'paint');
  textLabel(f,-.183,0,.008,.341,.074,'ACQ  /  ONLINE',{mono:true,color:'#bcd0b8'});
  for(let j=0;j<7;j++)box(f,.069+j*.047,0,.007,.017,.107,.009,P.ink,'rubber');
  for(let i=0;i<2;i++)tube(g,[[-1.61+i*.051,.433,-.25],[-1.73+i*.05,.38,-.335],[-1.76+i*.05,.33,-.50],[-1.76+i*.05,.54,-.56],[-1.70+i*.05,.72,-.55]],.017,P.rubber,'rubber',20);
}

function joint(g,x,y,z,r,d,code,col=P.ceramic) {
  const j=group(g,x,y,z);
  function disc(zz,rr,hh,c,s='metal',n=40){const o=cyl(j,0,0,zz,rr,hh,c,s,n);o.rotation.x=PI/2;}
  disc(0,r,d,P.alloy);disc(d*.5+.012,r*.91,.026,P.rubber,'rubber');disc(d*.5+.04,r*.81,.047,col,'paint');
  disc(d*.5+.066,r*.56,.012,P.gun);disc(d*.5+.078,r*.39,.016,P.steel);
  for(let i=0;i<6;i++){const a=i*TAU/6+.26;bolt(j,r*.68*Math.cos(a),r*.68*Math.sin(a),d*.5+.071,r*.077);}
  disc(-d*.5-.036,r*.87,.069,P.ink);disc(-d*.5-.095,r*.72,.056,P.gun);
  if(code)textLabel(j,0,-r*.01,d*.5+.089,r*.56,r*.21,code,{mono:true});
}
function taperedLink(g,a,b,wA,wB,depth,col,cut=false){
  const dx=b[0]-a[0],dy=b[1]-a[1],len=Math.hypot(dx,dy);
  const f=group(g,a[0],a[1],a[2]||0);f.rotation.z=Math.atan2(-dx,dy);
  const outline=[[-wA*.34,-wA*.30],[wA*.34,-wA*.30],[wA*.5,wA*.03],[wA*.47,len*.31],[wB*.51,len*.80],[wB*.44,len+wB*.1],[wB*.29,len+wB*.29],[-wB*.34,len+wB*.29],[-wB*.5,len*.95],[-wA*.46,len*.27]];
  const shape=new T.Shape(outline.map(p=>new T.Vector2(...p)));
  if(cut)shape.holes.push(new T.Path([[-wA*.18,len*.24],[wA*.17,len*.24],[wB*.19,len*.74],[-wB*.17,len*.74]].map(p=>new T.Vector2(...p))));
  const ge=new T.ExtrudeGeometry(shape,{depth,bevelThickness:.015,bevelSize:.012,bevelSegments:2,bevelEnabled:true,curveSegments:2});ge.translate(0,0,-depth/2);part(f,ge,0,0,0,col,'paint');return f;
}
function track(g,level){
  const f=group(g,0,level,0);
  bevel(f,0,.051,0,2.93,.10,.64,.018,P.gun,'metal');
  for(const s of [-1,1]){
    extrusion(f,[-1.41,.108,s*.207],[1.41,.108,s*.207],.076,.065,P.alu);
    rod(f,[-1.39,.166,s*.207],[1.39,.166,s*.207],.028,P.steel,'chrome',22);
    for(let i=0;i<11;i++)bolt(f,-1.31+i*.262,.108,s*.277,.018,'y');
  }
  for(const x of [-1.36,1.34]){
    bevel(f,x,.181,0,.136,.151,.482,.016,P.ceramic,'paint');
    for(const z of [-.18,.18])bolt(f,x,.265,z,.021,'y');
  }
  rod(f,[-1.28,.165,0],[1.31,.165,0],.025,P.alloy,'metal',18);
  // A coarse helix describes the lead screw without a textured moiré pattern.
  const pts=[];
  for(let i=0;i<=384;i++){const a=i*TAU/8;pts.push([-1.27+2.55*i/384,.165+.027*Math.cos(a),.027*Math.sin(a)]);}
  tube(f,pts,.005,P.steel,'chrome',384,5);
  bevel(f,1.475,.166,0,.164,.201,.23,.015,P.ink,'metal');
  for(let k=0;k<4;k++)bevel(f,1.426+k*.03,.166,0,.008,.218,.239,.003,P.alloy,'metal');
  tube(f,[[1.47,.16,-.108],[1.47,.105,-.202],[1.39,.064,-.34],[1.10,.042,-.39],[.91,.014,-.45]],.018,P.rubber,'rubber',20);
  const scale=graphic(f,0,.049,.326,2.63,.076,'axis-rule',1024,42,(c,W,H)=>{
    rect(c,0,0,W,H,'#c5c8b6');
    for(let i=0;i<=160;i++){const xx=16+i*6.16;line(c,xx,0,xx,i%10===0?20:i%5===0?15:8,ink,1.2);if(i%20===0)monoTxt(c,String(i*5),xx,36,12,ink,'center');}
  });
  for(let k=0;k<21;k++){
    const x=-1.30+.065*k;
    bevel(f,x,.146,-.355,.062,.064,.075,.008,P.rubber,'rubber');
    box(f,x,.184,-.355,.031,.008,.058,P.gun,'metal');
  }
}
function arm(g,level){
  const h=group(g,-.50,level,0);
  for(const x of [-.215,.215])for(const z of [-.20,.20])bevel(h,x,.18,z,.185,.092,.105,.008,P.gun,'metal');
  bevel(h,0,.245,0,.632,.073,.582,.019,P.alloy,'metal');
  cyl(h,0,.308,0,.235,.056,P.ink,'rubber',40);
  cyl(h,0,.369,0,.218,.089,P.orange,'paint',48,.189);
  cyl(h,0,.436,0,.184,.05,P.alloy,'metal',40);
  for(let i=0;i<8;i++){const a=i*TAU/8;bolt(h,Math.cos(a)*.254,.29,Math.sin(a)*.244,.021,'y');}
  const pedestal=plate(h,[[-.185,.456],[.18,.456],[.174,.671],[.127,.741],[-.104,.75],[-.176,.68]],.274,P.ivory,'paint',.023);
  const shoulder=[0,.682,0],elbow=[-.414,1.504,0],wrist=[.396,1.383,0],tip=[.60,1.125,0];
  taperedLink(h,shoulder,elbow,.294,.244,.213,P.orange,true);
  const fore=taperedLink(h,elbow,wrist,.246,.153,.186,P.ivory,false);
  const face=group(fore,0,.424,.109);face.rotation.z=PI/2;
  textLabel(face,0,0,.002,.389,.079,'VECTOR  /  M3',{mono:true,color:'#334c46'});
  taperedLink(h,wrist,tip,.158,.117,.138,P.gun);
  joint(h,shoulder[0],shoulder[1],0,.197,.354,'J1',P.ceramic);
  joint(h,elbow[0],elbow[1],0,.158,.30,'J2',P.ceramic);
  joint(h,wrist[0],wrist[1],0,.119,.233,'J3',P.orange);
  joint(h,tip[0],tip[1],0,.087,.159,'',P.ceramic);
  // Counterbalance assembly and service loop are deliberately visible from the far side.
  rod(h,[-.136,.721,-.169],[-.458,1.278,-.169],.043,P.gun,'metal',20);
  rod(h,[-.458,1.278,-.169],[-.523,1.451,-.169],.024,P.steel,'chrome',20);
  for(const [x,y] of [[-.136,.721],[-.523,1.451]])rod(h,[x,y,-.208],[x,y,-.091],.058,P.alloy,'metal',18);
  for(let i=0;i<2;i++){
    const z=-.133-i*.041;
    tube(h,[[-.192,.464,z],[-.272,.71,z-.052],[-.388,1.02,z],[-.554,1.45,z],[-.509,1.64,z],[-.325,1.659,z],[.066,1.575,z],[.343,1.503,z],[.46,1.42,z]],.018+i*.004,P.rubber,'rubber',46);
  }
  for(const [x,y,rot] of [[-.341,.987,.42],[-.540,1.42,.39],[-.251,1.622,-1.75],[.156,1.545,-1.77]]){
    const cl=bevel(h,x,y,-.161,.06,.029,.103,.004,P.alloy,'metal');cl.rotation.z=rot;
  }
  const end=group(h,tip[0],tip[1],0);end.rotation.z=.08;
  cyl(end,0,-.077,0,.071,.114,P.alloy,'metal',24);
  cyl(end,0,-.154,0,.049,.06,P.ink,'rubber',24);
  cyl(end,0,-.212,0,.031,.075,P.steel,'metal',20);
  cyl(end,0,-.306,0,.012,.123,P.steel,'chrome',16);
  ball(end,0,-.371,0,.022,'#a85037','optic',16);
  tube(h,[[.403,1.439,-.124],[.53,1.405,-.135],[.68,1.207,-.114],[.685,1.012,-.066],[.63,.97,0]],.012,P.rubber,'rubber',22);
  const gauge=group(h,.639,0,.0);
  bevel(gauge,0,.262,0,.47,.063,.37,.014,P.alloy,'metal');
  for(const xx of [-.162,.162])for(const zz of [-.11,.11])bolt(gauge,xx,.302,zz,.021,'y');
  bevel(gauge,0,.358,0,.245,.142,.236,.012,P.deep,'metal');
  cyl(gauge,0,.477,0,.079,.14,P.steel,'chrome',26);
  cyl(gauge,0,.582,0,.117,.072,P.ivory,'paint',40);
  cyl(gauge,0,.633,0,.086,.035,P.alloy,'metal',36);
  ball(gauge,0,.672,0,.056,'#aeb9ad','chrome',28);
}
function consoleUnit(g,x,z){
  const f=group(g,x,0,z,-.28);
  contact(f,0,.01,1.28,1.1);
  bevel(f,0,.048,0,.728,.088,.619,.033,P.rubber,'rubber');
  bevel(f,0,.112,0,.702,.061,.603,.02,P.alloy,'metal');
  const stand=plate(f,[[-.278,.142],[.28,.142],[.242,.883],[-.181,.978],[-.27,.840]],.45,P.sage,'paint',.021);
  const front=group(f,0,.55,.252);
  bevel(front,0,0,0,.442,.585,.024,.012,P.ceramic,'paint');
  for(let j=0;j<7;j++)box(front,0,-.177+j*.027,.016,.303,.009,.005,P.gun,'rubber');
  compliance(front,0,.122,.016,.292,.103,'AX-308');
  for(const xx of [-.192,.192])for(const yy of [-.262,.262])bolt(front,xx,yy,.016,.015);
  const desk=group(f,0,1.065,.026);desk.rotation.x=-.985;
  bevel(desk,0,0,0,.972,.727,.119,.035,P.ink,'paint');bevel(desk,0,0,.057,.942,.699,.022,.015,P.ceramic,'paint');
  bevel(desk,-.072,.063,.072,.695,.443,.042,.014,P.black,'rubber');
  motionScreen(desk,-.072,.063,.097,.649,.397);
  textLabel(desk,-.188,.307,.071,.456,.042,'MOTION CONTROL   /   C03',{mono:true});
  for(let i=0;i<4;i++){
    const x=-.358+i*.127;bevel(desk,x,-.222,.078,.084,.045,.024,.005,i===0?P.sage:P.alloy,'paint');
    textLabel(desk,x,-.273,.071,.107,.028,['HOME','MODE','STORE','STEP'][i],{mono:true});
  }
  const stop=group(desk,.342,.018,.076);stop.rotation.x=PI/2;
  cyl(stop,0,.013,0,.082,.024,'#dba84e','paint',28);
  cyl(stop,0,.044,0,.033,.039,P.gun,'metal',20);
  cyl(stop,0,.075,0,.061,.033,'#a84933','paint',28,.065);
  cyl(stop,0,.094,0,.055,.009,'#b54f38','paint',28);
  textLabel(desk,.342,-.11,.071,.158,.034,'E-STOP',{mono:true});
  for(const [yy,c] of [[.23,P.led],[.157,'#778b72']]){
    const o=cyl(desk,.342,yy,.081,.023,.026,P.gun,'metal',20);o.rotation.x=PI/2;
    const p=ball(desk,.342,yy,.096,.016,c,yy>.2?'signal':'optic',16);p.scale.z*=.43;
  }
  const knob=group(desk,.31,-.218,.087);knob.rotation.x=PI/2;cyl(knob,0,.008,0,.045,.043,P.gun,'metal',16);
  box(knob,0,.033,-.014,.009,.005,.021,P.ivory,'paint');
  tube(f,[[0,.2,-.246],[0,.1,-.324],[-.11,.055,-.39],[-.44,.045,-.43],[-.64,.059,-.425]],.024,P.rubber,'rubber',20);
  bevel(f,-.64,.016,-.425,.165,.025,.151,.008,P.alloy,'metal');
  cyl(f,-.64,.046,-.425,.039,.044,P.rubber,'rubber',16);
  localObstacle(f,0,0,1.03,.78);
}
function datumBoard(dept){
  const f=group(dept,-.67,1.94,-.817);
  bevel(f,0,0,-.052,2.91,.925,.095,.016,'#899b90','metal');
  graphic(f,0,0,-.002,2.87,.886,'survey-grid',1000,310,(c,W,H)=>{
    rect(c,0,0,W,H,'#c9d0c0');
    for(let x=25;x<W-5;x+=25)line(c,x,16,x,H-21,x%100===0?'#a9b7a7':'#bac5b5',1);
    for(let y=19;y<274;y+=25)line(c,15,y,W-15,y,'#b4c0af',1);
    for(let x=50;x<980;x+=100)for(let y=69;y<274;y+=100){line(c,x-5,y,x+5,y,'#7a8f80',1.3);line(c,x,y-5,x,y+5,'#7a8f80',1.3);}
    line(c,51,249,931,249,'#799180',2);line(c,151,249,151,30,'#799180',2);
    for(let x=51;x<932;x+=20)line(c,x,249,x,255+(x%100===51?5:0),'#778c7d',1);
    rect(c,18,11,222,31,'#c9d0c0');monoTxt(c,'CELL COORDINATES',24,34,17,ink);
    for(let i=0;i<8;i++)monoTxt(c,String(i*100),151+i*100,277,12,'#657d6c','center');
    monoTxt(c,'REF. 03    /    X–Z PLANE',20,297,13,ink);
    monoTxt(c,'DATUM  A',W-16,298,14,ink,'right');
    const ox=852,oy=66;circle(c,ox,oy,19,'#425e50',false,2);line(c,ox-31,oy,ox+31,oy,'#425e50',1);line(c,ox,oy-30,ox,oy+30,'#425e50',1);
  });
  for(const x of [-1.391,1.391])for(const y of [-.405,.405])bolt(f,x,y,.002,.015);
}
export function buildMotion(){
  const dept=group(model,8.53,0,-.19,-PI/2);
  datumBoard(dept);
  const g=group(dept,-.68,0,-.006);
  table(g,3.35,1.21,.805,'#788781');track(g,.81);arm(g,.81);
  const unit=group(g,.759,.435,-.042);
  bevel(unit,0,0,0,.807,.44,.797,.02,P.deep,'metal');
  bevel(unit,0,0,.408,.775,.413,.028,.013,P.ceramic,'paint');
  for(let i=0;i<10;i++)box(unit,-.284+i*.055,-.079,.427,.017,.148,.009,P.gun,'rubber');
  tag(unit,-.021,.094,.427,.56,.083,'AX  /  DRIVE','SERVO AMPLIFIER','MOTION SYSTEMS');
  for(const x of [-.345,.345])for(const y of [-.167,.167])bolt(unit,x,y,.431,.013);
  tag(g,-.75,.749,.608,1.01,.078,'C — 03','LINEAR TEST BED','TRAVEL  + / −  640 mm');
  const c=group(dept,1.781,0,.304);consoleUnit(c,0,0);
}


import {T,P,PI,TAU,model,group,part,box,bevel,cyl,rod,beam,bolt,tube,contact,seed,unshadow,localObstacle} from './fabrication.js';
import {graphic,textLabel,tag,stationSign,floorLabel,floorBadge,rect,txt,monoTxt,line,circle,logo,ink,rust,paper} from './graphics.js';

const height=4.82, xmin=-5.9,xmax=5.9,zmin=-6.85,zmax=7.65,back=9.50,bayL=-3.48,bayR=3.02,random=seed(1471);
const wallColor=['#dee0d3','#dde0d4','#d8dcd0','#dfe1d6'];
const floorColor=['#a6aaa0','#a9aca2','#a8aba1','#a4a89e','#a9aba2'];
function deck(g,x1,x2,z1,z2,nx,nz,bay=false){
  box(g,(x1+x2)/2,-.106,(z1+z2)/2,x2-x1,.13,z2-z1,'#626d66','floor');
  const w=(x2-x1)/nx,d=(z2-z1)/nz;
  for(let i=0;i<nx;i++)for(let j=0;j<nz;j++){
    const col=bay?['#a0a89e','#a5aca2','#a2aa9f'][(i*5+j*7)%3]:floorColor[Math.floor(random()*5)];
    const tile=new T.PlaneGeometry(w-.004,d-.004,Math.ceil(w/.18),Math.ceil(d/.18));
    const p=part(g,tile,x1+(i+.5)*w,0,z1+(j+.5)*d,col,'floor');p.rotation.x=-PI/2;
  }
}
function wall(g,length,h,opts={}){
  const strip=opts.bay?'#78918a':'#9caba0';
  box(g,0,h*.5,-.102,length+.012,h,.20,'#89978b','matte');
  const n=Math.ceil(length/1.48),w=length/n;
  for(let j=0;j<n;j++){
    const x=-length/2+(j+.5)*w;
    box(g,x,.55,.019,w-.009,1.10,.044,strip,'paint');
    box(g,x,(h+1.12)*.5,.008,w-.006,h-1.12-.007,.034,wallColor[j%4],'matte');
    if(j%2===0)for(const s of [-1,1])bolt(g,x+s*(w/2-.06),.99,.045,.012,'z',P.alloy);
  }
  box(g,0,.072,.053,length,.144,.082,'#53625d','rubber');
  box(g,0,.175,.061,length,.032,.064,'#9ea9a1','metal');
  box(g,0,1.105,.058,length,.035,.085,'#8e9b8e','metal');
  box(g,0,h-.061,.05,length,.105,.10,'#adb4a8','metal');
}
function clerestory(g,w,h,y,id){
  box(g,0,y,.048,w+.13,h+.15,.13,'#a2aaa0','metal');
  box(g,0,y,.116,w+.04,h+.04,.054,'#4d5c57','rubber');
  const n=Math.round(w/1.35),pw=w/n;
  for(let i=0;i<n;i++){
    const x=-w/2+(i+.5)*pw;
    graphic(g,x,y,.146,pw-.028,h,id+'frost'+i,320,236,(c,W,H)=>{
      const grad=c.createLinearGradient(0,0,W*.18,H);grad.addColorStop(0,'#c5d7d4');grad.addColorStop(.59,'#e7ecde');grad.addColorStop(1,'#cfdad1');c.fillStyle=grad;c.fillRect(0,0,W,H);
      for(let j=0;j<26;j++){const x=j*13;rect(c,x,0,3,H,'rgba(255,255,244,.17)');rect(c,x+4,0,1,H,'rgba(101,137,133,.12)');}
      const g=c.createLinearGradient(0,0,0,H);g.addColorStop(0,'rgba(255,255,255,0)');g.addColorStop(.78,'rgba(255,255,255,0)');g.addColorStop(1,'rgba(101,125,117,.13)');c.fillStyle=g;c.fillRect(0,0,W,H);
    },true);
    if(i)box(g,x-pw/2,y,.177,.034,h+.07,.058,'#abb6ad','metal');
  }
  box(g,0,y-h*.5-.051,.145,w+.26,.065,.27,'#c9cfc1','paint');
}
function vent(g,x,y,z,w,h){
  bevel(g,x,y,z,w,h,.055,.018,'#aeb9ac','paint');
  box(g,x,y,z+.031,w-.073,h-.065,.012,'#354644','matte');
  const n=Math.max(3,Math.round(h/.043));
  for(let i=0;i<n;i++){
    const b=box(g,x,y-h*.5+.043+i*(h-.082)/(n-1),z+.052,w-.076,.020,.041,'#a4b1a5','metal');b.rotation.x=.26;
  }
}
function lamina(g,x,z,w,d,y=height-.12) {
  bevel(g,x,y,z,w+.14,.105,d+.14,.03,'#a7b0a4','metal');
  box(g,x,y-.055,z,w+.06,.027,d+.06,'#67736c','matte');
  bevel(g,x,y-.078,z,w,.035,d,.012,'#f4eee0','light');
  for(const t of [-1,1])box(g,x+t*w*.502,y-.087,z,.022,.035,d+.055,'#c8ccc0','metal');
}
function slottedTray(g,x,y,z,len) {
  box(g,x,y,z,.27,.046,len,'#6e7d77','metal');
  for(const side of [-1,1]) {
    box(g,x+side*.135,y+.045,z,.023,.09,len,'#8e9b92','metal');
    for(let i=0;i<Math.floor(len/.34);i++)box(g,x+side*.148,y+.05,z-len/2+.16+i*.34,.004,.031,.19,'#475a54','matte');
  }
  for(let i=0;i<3;i++)rod(g,[x-.09+i*.078,y+.043,z-len/2],[x-.09+i*.078,y+.043,z+len/2],.023,i===1?'#90684f':'#525c58','rubber',8);
}
function airPipe(g,x,y,z1,z2,r){
  rod(g,[x,y,z1],[x,y,z2],r,'#a6b3aa','metal',32);
  for(let z=z1+.10;z<z2;z+=1.46)rod(g,[x,y,z-.018],[x,y,z+.018],r+.013,'#798a80','metal',32);
  for(let z=z1+.48;z<z2;z+=2.88){
    rod(g,[x-r-.04,y-.02,z],[x-r-.04,height-.07,z],.011,P.gun,'metal',8);
    rod(g,[x+r+.04,y-.02,z],[x+r+.04,height-.07,z],.011,P.gun,'metal',8);
    box(g,x,y-r-.023,z,r*2+.16,.042,.055,'#8a9a8f','metal');
  }
}
function buildingId(g) {
  graphic(g,0,2.47,.034,4.9,1.05,'building-id',1400,300,(c,W,H)=>{
    logo(c,10,62,154,ink);txt(c,'FIELDWORK',199,176,153,ink,650);
    line(c,201,205,1383,205,'#738779',3);
    monoTxt(c,'LABORATORY FOR APPLIED MEASUREMENT',205,258,34,'#435f55');
  });
}
function chart(g,x,y,variant) {
  const w=.97,h=1.37;
  bevel(g,x,y,.079,w+.062,h+.062,.095,.016,'#819189','metal');
  graphic(g,x,y,.128,w,h,'chart'+variant,360,510,(c,W,H)=>{
    const bg=variant?'#d9dacc':'#294341',fg=variant?ink:'#dbe2cd',soft=variant?'#87998a':'#879e8e';
    rect(c,0,0,W,H,bg);rect(c,19,25,35,7,'#cf7449');monoTxt(c,'FW / TECHNICAL SERIES',21,60,14,fg);
    txt(c,variant?'Focal plane':'Angular scan',19,102,33,fg,600);line(c,20,117,W-20,117,soft);
    const cx=180,cy=267;
    if(!variant){
      for(let j=0;j<3;j++){c.beginPath();c.ellipse(cx,cy,107-j*16,78-j*10,-.55,0,TAU);c.strokeStyle=soft;c.lineWidth=j?2:5;c.stroke();}
      for(let i=0;i<12;i++){const a=i*TAU/12;line(c,cx+Math.cos(a)*88,cy+Math.sin(a)*75,cx+Math.cos(a)*112,cy+Math.sin(a)*94,fg,1);}
      for(let i=0;i<6;i++)line(c,67,335+i*3,277,190+i*3,'#c3835c',1);
      circle(c,cx,cy,9,fg,false,2);
    }else{
      for(let j=0;j<5;j++){c.strokeStyle=soft;c.strokeRect(48+j*18,179+j*12,92,121);}
      for(let i=0;i<9;i++)line(c,68,197+i*12,285,247,'#b77453',1.5);
      c.beginPath();c.ellipse(204,247,15,80,0,0,TAU);c.strokeStyle=ink;c.lineWidth=3;c.stroke();
      line(c,285,178,285,313,ink,4);circle(c,285,247,6,ink,true);
    }
    line(c,20,397,W-20,397,soft);monoTxt(c,variant?'LENS ASSEMBLY / FIG. 02':'GONIOMETER / FIG. 01',20,428,16,fg);
    monoTxt(c,'FIELDWORK INSTRUMENTS',20,480,12,soft);txt(c,variant?'02':'01',W-21,483,30,fg,600,undefined,'right');
  });
}
function rearService(g) {
  buildingId(g);
  chart(g,-4.12,2.11,0);chart(g,-2.98,2.11,1);
  const r=group(g,4.33,0,.11);
  bevel(r,0,1.10,.052,1.62,2.03,.14,.038,'#b1beb1','paint');
  for(const s of [-1,1]){
    bevel(r,s*.395,1.1,.14,.778,1.91,.063,.014,'#c1cbbe','paint');
    if(s===1)vent(r,.389,1.82,.195,.55,.3);
    for(const y of [.37,1.72])bevel(r,s*.758,y,.192,.036,.112,.027,.008,P.alloy,'metal');
    bevel(r,s*.083,1.04,.2,.027,.15,.043,.009,'#495c54','rubber');
  }
  textLabel(r,-.407,1.74,.177,.61,.096,'FACILITY SERVICES',{mono:true});
  tag(r,-.385,1.46,.177,.55,.21,'UTILITIES  /  04','POWER + DATA','PDU 2 • LOW VOLTAGE');
  localObstacle(r,0,.13,1.64,.3);
  for(const x of [-4.80,-2.05,2.36]) {
    box(g,x,.61,.052,.19,.195,.04,'#b8c3b7','paint');
    for(const j of [-1,1])box(g,x+j*.032,.62,.081,.018,.05,.008,'#48574f','rubber');
  }
}
function entry(g){
  const door=group(g,0,0,.10);
  box(door,0,1.39,.016,3.04,2.78,.14,'#65786f','metal');
  box(door,0,1.31,.095,2.82,2.62,.065,'#364a44','rubber');
  for(const s of [-1,1]){
    const x=s*.69;
    bevel(door,x,1.30,.139,1.356,2.54,.104,.014,'#a9b9ad','paint');
    box(door,x,1.77,.204,1.02,1.19,.064,'#3c514e','rubber');
    graphic(door,x,1.77,.238,.95,1.12,'entryglass'+s,220,280,(c,W,H)=>{
      const gr=c.createLinearGradient(0,0,W,H);gr.addColorStop(0,'#9baea4');gr.addColorStop(.47,'#788e87');gr.addColorStop(1,'#5a7069');
      c.fillStyle=gr;c.fillRect(0,0,W,H);rect(c,0,H*.49,W,8,'rgba(221,230,204,.3)');
      for(let j=0;j<7;j++)rect(c,7+j*35,H*.54,14,5,'rgba(231,237,214,.35)');
    });
    for(const sx of [-1,1])rod(door,[x+sx*.47,.995,.21],[x+sx*.47,.995,.306],.03,'#58695f','metal');
    rod(door,[x-.52,.995,.305],[x+.52,.995,.305],.034,P.steel,'metal',22);
    bevel(door,x,.24,.197,1.23,.31,.025,.007,'#97a69b','metal');
    box(door,x,2.48,.22,.36,.075,.07,'#88998d','metal');
    rod(door,[x,2.50,.26],[x+s*.41,2.64,.22],.014,P.gun,'metal',10);
  }
  textLabel(door,0,2.99,.06,1.42,.23,'01   /   ENTRANCE',{mono:true});
  graphic(door,0,2.72,.128,.55,.12,'exit-sign',256,56,(c,W,H)=>{
    rect(c,0,0,W,H,'#396553');monoTxt(c,'←  EXIT',W/2,41,36,'#e8edcf','center');
  },true);
  const reader=group(door,-1.67,1.15,.0);
  bevel(reader,0,0,.06,.13,.25,.09,.018,P.deep,'paint');box(reader,0,.069,.11,.064,.014,.008,P.led,'signal');
  for(let i=0;i<3;i++)box(reader,0,-.02-i*.026,.108,.06,.006,.004,P.alloy,'metal');
  localObstacle(door,0,.13,3.08,.38);
  graphic(g,-3.44,2.10,.03,2.19,.89,'return-mark',800,326,(c,W,H)=>{
    logo(c,0,14,77,ink);monoTxt(c,'FIELDWORK  /  ACCESS 01',110,50,29,ink);
    txt(c,'Arrival hall',0,196,111,ink,550);line(c,4,224,W-10,224,'#839589',2);
    monoTxt(c,'MAIN ENTRANCE      ↗',4,280,30,ink);
  });
  const safety=group(g,3.08,0,.09);
  box(safety,0,1.0,.03,.36,.62,.06,'#839288','metal');
  cyl(safety,0,.82,.16,.115,.42,'#b24d37','paint',24);
  const shoulder=cyl(safety,0,1.07,.16,.115,.095,'#b24d37','paint',24,.052);
  cyl(safety,0,.593,.16,.098,.035,'#663f33','rubber',24);
  cyl(safety,0,1.152,.16,.034,.09,P.steel,'metal',16);
  box(safety,-.057,1.205,.16,.19,.03,.045,'#86412f','paint');
  tube(safety,[[.04,1.16,.16],[.155,1.13,.17],[.19,.96,.17],[.17,.78,.17]],.016,P.rubber);
  tag(safety,0,.84,.278,.147,.215,'FIRE','CO₂','CLASS E',true);
  textLabel(safety,0,1.62,.024,.49,.15,'FIRE POINT',{color:'#923e2e',mono:true});
}
function threshold(g,side) {
  const dir=side<0?PI/2:-PI/2,mid=(bayL+bayR)/2,span=bayR-bayL;
  const f=group(g,side*5.86,0,mid,dir);
  for(const s of [-1,1]){
    box(f,s*(span/2-.045),1.67,0,.11,3.34,.29,'#6a8176','metal');
    bevel(f,s*(span/2-.045),.68,.132,.118,1.33,.075,.018,'#c9ccba','paint');
    box(f,s*(span/2-.045),1.35,.178,.12,.06,.011,'#bc6c43','paint');
  }
  box(f,0,(height+3.34)/2,0,span,height-3.34,.29,'#d0d6c8','matte');
  box(f,0,3.37,.026,span,.105,.39,'#84988b','metal');
  box(f,0,3.301,.098,span-.3,.027,.135,'#b9c3b7','metal');
  const a=side<0;
  stationSign(f,0,3.85,.15,a?'02':'03',a?'Perception bench':'Motion test rig',a?'IMAGING  /  TARGET CHARACTERISATION':'KINEMATICS  /  REPEATABILITY');
  box(f,0,.007,0,span-.15,.014,.115,'#929e91','metal');
  for(const s of [-1,1])box(f,s*(span/2-.36),.013,0,.47,.003,.12,'#c18652','paint');
  floorBadge(f,0,.75,a?'02':'03',0);
}
function bay(g,s){
  const facing=s<0?PI/2:-PI/2,mid=(bayL+bayR)/2,span=bayR-bayL,depth=back-5.9;
  deck(g,s<0?-back:5.9,s<0?-5.9:back,bayL,bayR,3,5,true);
  const backwall=group(g,s*back,0,mid,facing);wall(backwall,span,3.65,{bay:true});
  const rear=group(g,s*(back+5.9)/2,0,bayL,0),front=group(g,s*(back+5.9)/2,0,bayR,PI);
  wall(rear,depth,3.65,{bay:true});wall(front,depth,3.65,{bay:true});
  box(g,s*(back+5.9)/2,3.69,mid,depth+.06,.1,span+.04,'#c4ccbe','matte');
  for(const z of [-2.71,-1.54,-.37,.8,1.97])box(g,s*7.7,3.6,z,depth-.04,.095,.059,'#aebaaa','metal');
  for(const z of [-1.91,.93])lamina(g,s*7.71,z,2.57,.245,3.54);
  threshold(g,s);
  const isWest=s<0;
  graphic(backwall,-.18,2.84,.034,3.70,.48,'bay-head'+s,1000,130,(c,W,H)=>{
    monoTxt(c,isWest?'OPTICAL SYSTEMS GROUP':'DYNAMICS GROUP',6,32,22,'#546f61');
    line(c,6,48,986,48,'#879c8b',2);
    txt(c,isWest?'Vision calibration':'Actuator testing',4,117,64,ink,550);
    monoTxt(c,isWest?'B / 02':'C / 03',983,107,26,rust,'right');
  });
  // A utility spine carries extraction, instrument power and patch panels at bench height.
  box(backwall,0,1.16,.093,span-.29,.155,.135,'#b5c0b1','metal');
  box(backwall,0,1.215,.168,span-.35,.015,.02,'#8e9d91','rubber');
  for(let x=-2.34;x<=2.4;x+=1.58){
    bevel(backwall,x,1.15,.173,.35,.127,.045,.013,'#a1afa1','paint');
    for(const k of [-1,1]){const o=cyl(backwall,x+k*.083,1.15,.2,.036,.018,'#374741','rubber',16);o.rotation.x=PI/2;}
  }
  if(isWest){vent(front,-.87,2.60,.06,1.22,.43);chart(rear,.36,2.0,1);}
  else{vent(rear,.19,2.78,.055,1.87,.38);chart(front,-.71,1.96,0);}
}
function floorOutlet(g,x,z,id,ry){
  const f=group(g,x,0,z,ry);
  bevel(f,0,.006,0,.394,.012,.292,.004,'#6f7b72','metal');
  bevel(f,0,.013,0,.374,.008,.271,.003,'#99a294','metal');
  for(const sx of [-1,1])for(const sz of [-1,1])bolt(f,sx*.158,.019,sz*.107,.011,'y',P.gun);
  const lid=group(f,0,.019,.031);lid.rotation.x=-PI/2;
  textLabel(lid,0,0,0,.204,.035,id,{mono:true,color:'#475b4d'});
  box(f,0,.019,-.053,.085,.003,.021,P.gun,'rubber');
}
function floorMarkings(g) {
  // Flush paint follows the approach and branches toward the two open work bays.
  const colour='#c4c3ac',accent='#b78353';
  function stripe(x,z,w,d,c=colour){box(g,x,.00325,z,w,.003,d,c,'matte');}
  for(const s of [-1,1]){
    stripe(s*2.10,.95,.026,9.45);stripe(s*2.10,-3.85,.026,.12,accent);
    stripe(s*2.1,5.84,.026,.22,accent);
    stripe(s*3.85,1.73,3.42,.025);stripe(s*3.85,-2.25,3.42,.025);
    for(let i=0;i<4;i++)stripe(s*(4.99+i*.135),1.67,.064,.092,accent);
  }
  for(const s of [-1,1])for(const z of [-2.05,1.62]){
    stripe(s*1.81,z,.22,.022,accent);stripe(s*1.91,z+(z<0?.09:-.09),.022,.20,accent);
  }
  floorBadge(g,-1.65,4.88,'01');floorLabel(g,.16,4.92,2.48,.23,'INSTRUMENT FLOOR');
  floorLabel(g,-2.8,-3.87,1.5,.126,'OPTICAL SYSTEMS',PI);
  floorLabel(g,2.8,-3.87,1.55,.126,'KINEMATIC SYSTEMS',PI);
}
export function buildHall(){
  const g=unshadow(group(model));deck(g,xmin,xmax,zmin,zmax,8,10);
  const rear=group(g,0,0,zmin,0);wall(rear,xmax-xmin,height);rearService(rear);clerestory(rear,10.38,.78,3.91,'north');
  const front=group(g,0,0,zmax,PI);wall(front,xmax-xmin,height);entry(front);clerestory(front,7.97,.66,3.92,'south');
  for(const s of [-1,1]){
    for(const [a,b] of [[zmin,bayL],[bayR,zmax]]){
      const wallG=group(g,s*5.9,0,(a+b)/2,s<0?PI/2:-PI/2);wall(wallG,b-a,height);
      if(a===bayR){
        clerestory(wallG,b-a-.53,.88,3.87,'side'+s);
        const t=s<0?'OPTICS':'MOTION';
        graphic(wallG,0,2.12,.03,2.15,.52,'way'+s,650,157,(c,W,H)=>{
          monoTxt(c,'DEPARTMENT  /  '+(s<0?'02':'03'),5,32,20,'#537062');
          txt(c,t,2,118,78,ink,550);monoTxt(c,s<0?'→':'←',W-14,113,76,rust,'right');line(c,5,144,W-6,144,'#8ca08f',2);
        });
      }else vent(wallG,0,3.69,.036,2.1,.39);
    }
    bay(g,s);
  }
  box(g,0,height+.038,.4,11.9,.115,14.6,'#d4d9cb','matte');
  for(let z=-6.53;z<7.65;z+=2.16){
    box(g,0,height-.077,z,11.8,.166,.103,'#bbc6b7','metal');
    for(const x of [-3.3,0,3.3])bevel(g,x,height-.178,z,.27,.05,.20,.012,'#a4b3a5','metal');
  }
  for(const x of [-3.65,3.65]){
    airPipe(g,x,4.42,zmin+.16,zmax-.16,.17);
    for(const z of [-4.72,-1.38,1.96,5.3])lamina(g,x*.56,z,.47,2.48);
  }
  slottedTray(g,4.40,4.49,.42,13.91);slottedTray(g,-4.40,4.49,.42,13.91);
  for(const z of [-3.94,2.83]){
    box(g,0,4.56,z,11.71,.18,.21,'#a1b1a4','paint');
    box(g,0,4.442,z,11.71,.055,.32,'#aebbae','metal');
  }
  floorMarkings(g);floorOutlet(g,-4.94,2.21,'DATA / 02',0);floorOutlet(g,4.94,-2.68,'DRIVE / 03',PI);floorOutlet(g,1.31,-1.67,'PX   /   24 V',-.21);
}

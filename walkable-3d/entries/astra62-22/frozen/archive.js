import {C,shellMark} from './materials.js';
import {PI,TAU,mix,randomSeed} from './geometry.js';
import {shadow,plaque} from './rooms.js';
import {pull,drawer,workTable,fold,swatch,spool,stool} from './objects.js';

const families=[
  {name:'Soies de courant',code:'SÉRIE I   ·   FILAMENTS',colors:['#31767a','#498b83','#526f77','#d4b98d','#264e58','#809c93']},
  {name:'Laines de grève',code:'SÉRIE II   ·   SERGÉS',colors:['#9c654e','#b89c71','#7e5d56','#607771','#d4c5a7','#576269']},
  {name:'Brocards de cour',code:'SÉRIE III   ·   FAÇONNÉS',colors:['#955244','#657872','#8e733f','#546579','#a87969','#344d54']}
];
function bolt(b,p,r,len,mat,col,band,seed){
  const rng=randomSeed(seed),flat=.80+rng()*.18;
  b.local(p,[0,(rng()-.5)*.09,(rng()-.5)*.055],()=>{
    b.surface(24,3,(u,v)=>{
      const a=TAU*u,rr=r*(1+.018*Math.sin(3*a+seed));
      return [Math.cos(a)*rr,Math.sin(a)*rr,(v-.5)*len,u*TAU*r,v*len];
    },mat,col);
    for(const s of [-1,1])b.cyl([0,0,s*(len/2-.004)],r*.994,r*.994,.008,mat,col,22,[PI/2,0,0]);
    // Exposed wound edge, independent tube core, and spiralling layers.
    const tip=len/2+.003,pts=[];
    for(let j=0;j<=40;j++){
      const t=j/40,a=t*TAU*2.7+.32,rr=r*(.18+.79*t);pts.push([Math.cos(a)*rr,Math.sin(a)*rr,tip+.0004*t]);
    }
    b.curve(pts,.0025,'cloth',seed%3?'#cab99c':'#8e8373',48,4);
    b.cyl([0,0,tip+.003],r*.183,r*.183,.007,'paper','#be9f71',14,[PI/2,0,0]);
    b.cyl([0,0,tip+.007],r*.099,r*.099,.0025,'paint','#514a3e',12,[PI/2,0,0]);
    if(band){
      const at=len*.14;
      b.cyl([0,0,at],r*1.022,r*1.022,.063,'paper','#d6c7a6',24,[PI/2,0,0]);
      for(const dz of [-.024,.019])b.torus([0,0,at+dz],r*1.024,.0023,'silk','#a99b7e',[0,0,0],23);
    }
  },[1,flat,1]);
}
function rollShelf(b,y,cols,mat,seed,count=7){
  const rng=randomSeed(seed),step=1.89/count;
  for(let j=0;j<count;j++){
    const r=(.092+rng()*.033)*(count<7?1.10:1),xx=(j-(count-1)/2)*step;
    const dye=cols[(j+Math.floor(rng()*2))%cols.length];
    bolt(b,[xx,y+r*.90,.024+rng()*.055],r,.61+rng()*.11,j%4===1?'stripe':mat,dye,j%3===0,seed+j);
  }
  for(let j=0;j<count-2;j+=2){
    const r=.099+rng()*.021,xx=(j-(count-2)/2)*step;
    bolt(b,[xx,y+r*.90+.146,-.006],r,.67,j%4===0?'damask':mat,cols[(j+2)%cols.length],j%3===1,seed+21+j);
  }
}
function foldedShelf(b,y,colors,seed,number=2){
  const rng=randomSeed(seed);
  for(let j=0;j<number;j++){
    let yy=y;
    const n=2+Math.floor(rng()*3),x=(j-(number-1)/2)*(1.97/number);
    for(let i=0;i<n;i++){
      const thick=.056+rng()*.034;
      fold(b,[x+(rng()-.5)*.052,yy,.018+rng()*.040],(1.97/number)*(.76+rng()*.15),.58+rng()*.116,thick,i===1?'stripe':i===3?'damask':'cloth',colors[(i+2*j+seed)%colors.length],(rng()-.5)*.07);
      yy+=thick*.97;
    }
  }
}
function boxFile(b,x,y,w,code){
  b.box([x,y+.142,-.028],[w,.277,.53],'cloth',C.jade);
  b.box([x,y+.278,-.027],[w+.020,.042,.55],'cloth','#729489');
  b.box([x,y+.15,.248],[.20,.093,.011],'brass',C.brass);
  b.tile([x,y+.15,.256],.17,.064,'print',b.print.label(code,'ARCHIVES'));
  for(const s of [-1,1])b.box([x+s*(w*.5-.055),y+.144,.243],[.029,.27,.013],'paper',C.flax);
}
function casework(b,index,z){
  const f=families[index],w=2.21,x=-4.206;shadow(b,x+.07,z,1.50,2.72);
  b.local([x,0,z],[0,PI/2,0],()=>{
    b.box([0,1.43,-.391],[w,2.79,.092],'wood',C.dark);
    for(let k=0;k<9;k++)b.box([(k-4)*.231,1.48,-.333],[.226,2.52,.025],'paint',index===1?'#47594e':'#3d5b53');
    b.box([0,.18,-.015],[w+.04,.28,.85],'wood',C.walnut);
    b.box([0,.078,.008],[w+.09,.12,.89],'wood',C.dark);
    for(const s of [-1,1]){
      b.box([s*(w/2-.042),1.43,0],[.085,2.78,.81],'wood',C.walnut);
      b.box([s*(w/2-.048),1.44,.411],[.10,2.80,.080],'wood',C.wood);
      b.box([s*(w/2-.048),1.46,.457],[.016,2.56,.012],'wood',C.trim);
    }
    b.box([0,2.812,.007],[w+.13,.109,.93],'wood',C.walnut);
    b.box([0,2.887,.012],[w+.17,.053,.96],'wood',C.trim);
    for(const y of [.484,1.062,1.635,2.203]){
      b.box([0,y-.033,0],[w-.13,.061,.79],'wood',C.wood);
      b.box([0,y-.036,.397],[w-.13,.070,.031],'wood',C.trim);
      b.box([0,y-.047,.415],[w-.16,.010,.006],'brass',C.bronze);
    }
    for(const s of [-1,1])drawer(b,s*.516,.355,.401,.98,.188);
    plaque(b,f.name,f.code,[0,2.73,.427],1.04,.171,0,true);
    if(index===0){
      rollShelf(b,.485,f.colors,'silk',681);foldedShelf(b,1.063,f.colors,211,2);
      rollShelf(b,1.636,f.colors,'silk',982,6);foldedShelf(b,2.204,f.colors,227,2);
    }else if(index===1){
      foldedShelf(b,.485,f.colors,423,3);rollShelf(b,1.063,f.colors,'wool',732,6);
      foldedShelf(b,1.636,f.colors,473,2);for(let i=0;i<3;i++)boxFile(b,(i-1)*.64,2.204,.56,'L. 0'+(i+4));
    }else{
      rollShelf(b,.485,f.colors,'damask',511,6);foldedShelf(b,1.063,f.colors,1019,2);
      rollShelf(b,1.636,f.colors,'damask',922,7);foldedShelf(b,2.204,f.colors,1829,3);
    }
    // A single leaf pulled over the lip shows the scale of the weave at eye level.
    const sy=index===1?1.635:1.062;
    b.local([index?.44:-.39,sy+.066,.407],[0,0,0],()=>swatch(b,[0,0,0],.39,.223,index===2?'shoal':index===0?'silk':'stripe',index===2?'#e9dfc4':f.colors[1],0,index));
  });b.block(x,z,.98,w+.06);
}
function rail(b,z,index){
  const f=families[index],w=2.09;
  b.local([4.66,0,z],[0,-PI/2,0],()=>{
    b.box([0,1.98,0],[w,1.55,.105],'wood',C.walnut);
    b.box([0,1.98,.058],[w-.112,1.43,.024],'cloth','#a6997d');
    for(const s of [-1,1]){
      b.box([s*(w/2-.036),1.97,.079],[.041,1.53,.073],'wood',C.trim);
      b.rod([s*(w/2-.074),2.52,.071],[s*(w/2-.074),2.52,.223],.025,'brass',C.brass,12);
    }
    b.rod([-w/2+.030,2.52,.202],[w/2-.03,2.52,.202],.018,'brass',C.brass,14);
    for(let j=0;j<3;j++){
      const x=(j-1)*.627,drop=[.72,.83,.65][(j+index)%3];
      for(const dx of [-.168,.168])b.torus([x+dx,2.479,.20],.045,.006,'brass',C.brass,[0,PI/2,0],14);
      b.box([x,2.404,.193],[.523,.09,.045],'wood',C.wood);
      swatch(b,[x,2.37,.149],.50,drop+.036,'cloth','#c3b99d',0,j);
      swatch(b,[x-.018,2.366,.184],.452,drop-.038,j===1?'stripe':'cloth',f.colors[(j+index+2)%6],0,j+1);
      const mat=index===2&&j===1?'shoal':index===1&&j!==0?'wool':index===0&&j===1?'moire':['damask','silk','stripe'][(j+index)%3];
      swatch(b,[x-.043,2.362,.222],.377,drop-.117,mat,mat==='shoal'?'#f3e2cd':f.colors[j],0,j+2);
      b.box([x,1.425,.105],[.27,.085,.014],'paper',C.flax);
      for(let k=0;k<4;k++)b.box([x-.078+k*.047,1.425,.116],[.036,.043,.004],'silk',f.colors[(k+j)%6]);
    }
    plaque(b,['Filaments','Teintures','Façonnés'][index],'COLLECTION PERMANENTE',[0,2.686,.087],.77,.13,0,true);
  });
}
function pageArt(b,left){
  return b.print.panel(left?'book-left':'book-right',298,355,(x,w,h)=>{
    x.fillStyle='#e4d6b7';x.fillRect(0,0,w,h);x.strokeStyle='#a79978';x.strokeRect(10,10,w-20,h-20);
    x.fillStyle='#43584e';x.font='italic 23px Georgia';x.textAlign='center';x.fillText(left?'Nuancier de grève':'Les verts de sonde',w/2,43);
    x.font='10px Georgia';x.fillText('MAISON DES MARÉES    •    ARCHIVES TEXTILES',w/2,63);
    for(let j=0;j<3;j++){
      const y=90+j*80;x.strokeStyle='#9a8e73';x.beginPath();x.moveTo(24,y);x.lineTo(w-24,y);x.stroke();
      x.textAlign='left';x.font='italic 15px Georgia';x.fillText((left?['I.   Lin lavé','II.  Serge fine','III. Drap double']:['IV.  Taffetas','V.   Gros de Tours','VI.  Brocatelle'])[j],30,y+24);
      x.font='11px Georgia';x.fillText((left?['sel naturel','argile rose','bleu d’encre']:['vert d’eau','vert de sonde','or sur pers'])[j],30,y+44);
    }
    shellMark(x,254,327,.40,'#6b7b66');
  });
}
function folio(b,x,y,z){
  b.local([x,y,z],[0,.12,0],()=>{
    b.box([0,.013,0],[.873,.027,.557],'cloth',C.deep);
    for(const s of [-1,1]){
      const left=s<0,rect=pageArt(b,left);
      b.box([s*.209,.043,0],[.408,.054,.526],'paper',C.flax);
      b.surface(16,3,(u,v)=>{
        const xx=s*(.010+.402*u),yy=.074+.035*Math.exp(-u*9)+.008*u*u,zz=mix(.258,-.258,v);
        return [xx,yy,zz,mix(rect[0],rect[2],left?1-u:u),mix(rect[1],rect[3],v)];
      },'print','#fffae9',false);
      for(let j=0;j<3;j++){
        const zz=-.09+j*.117,xx=left?-.094:.321;
        b.surface(9,4,(u,v)=>[xx+(u-.5)*.117,.079+.005*Math.sin(u*PI*4)*(v+.3),zz+(v-.5)*.088,u*.17,v*.14],j===2?'damask':j===0?'cloth':'silk',families[left?1:0].colors[j]);
      }
    }
    b.box([.048,.079,.258],[.014,.002,.13],'silk',C.coral);
  });
}
function archiveTable(b){
  const x=1.80,z=-2.95,w=2.45,d=.92,h=.922,yaw=-PI/2;shadow(b,x,z,1.80,3.23);
  b.local([x,0,z],[0,yaw,0],()=>{
    workTable(b,w,d,h,true);
    b.box([0,.27,0],[w-.14,.06,d-.16],'wood',C.wood);
    foldedShelf(b,.31,families[1].colors,416,3);
    folio(b,-.29,h+.009,.038);
    fold(b,[.73,h+.010,-.083],.53,.43,.065,'damask',C.wood,-.12);
    fold(b,[.74,h+.075,-.105],.49,.37,.055,'stripe',C.jade,-.08);
    spool(b,[-.998,h+.012,-.23],.045,.121,C.coral);
    spool(b,[-.901,h+.012,-.263],.036,.111,C.teal);
    // Small block holds a fan of dyed thread cards.
    b.box([.722,h+.034,.264],[.53,.055,.134],'wood',C.walnut);
    for(let i=0;i<7;i++){
      const xx=.52+i*.065;
      b.local([xx,h+.067,.247],[.19,0,-.064+i*.014],()=>{
        b.box([0,.049,0],[.059,.103,.010],'paper',C.pearl);
        b.box([0,.054,.007],[.064,.045,.009],'silk',families[0].colors[i%6]);
      });
    }
  });b.block(x,z,d+.035,w+.05);
}
function steps(b){
  const xx=-3.19,zz=-5.46;shadow(b,xx,zz,.91,1.05);
  b.local([xx,0,zz],[0,PI/2+.04,0],()=>{
    for(const s of [-1,1]){
      b.rod([s*.281,0,.19],[s*.238,.90,-.24],.034,'wood',C.walnut,9);
      b.rod([s*.28,0,-.36],[s*.236,.88,-.25],.030,'wood',C.walnut,9);
    }
    for(let i=0;i<3;i++)b.box([0,.19+i*.235,.105-i*.11],[.585-i*.025,.055,.221],'wood',C.wood);
    b.box([0,.884,-.246],[.56,.065,.31],'wood',C.oak);
  });b.block(xx,zz,.65,.62);
}
export function buildArchive(b){
  b.zone='Archive cases';[ -.38,-2.76,-5.13].forEach((z,i)=>casework(b,i,z));
  b.zone='Sample library';[-.44,-2.78,-5.13].forEach((z,i)=>rail(b,z,i));
  archiveTable(b);steps(b);
  for(const z of [-.44,-2.78,-5.13])b.block(4.64,z,.43,2.09);
}


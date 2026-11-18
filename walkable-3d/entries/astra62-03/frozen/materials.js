import * as THREE from './vendor/three.module.min.js';
import {TAU, randomSource} from './geometry.js';
import {INNER,ROOF_YAW,portals} from './layout.js';

function drawnTexture(w,h,draw,repeat=false){
  const canvas=document.createElement('canvas');canvas.width=w;canvas.height=h;
  const ctx=canvas.getContext('2d');draw(ctx,w,h);
  const tex=new THREE.CanvasTexture(canvas);tex.colorSpace=THREE.SRGBColorSpace;
  if(repeat)tex.wrapS=tex.wrapT=THREE.RepeatWrapping;
  tex.anisotropy=4;return tex;
}
function line(ctx,x,y,u,v){ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(u,v);ctx.stroke()}
function circle(ctx,x,y,r,fill=false){
  ctx.beginPath();ctx.arc(x,y,r,0,TAU);if(fill)ctx.fill();else ctx.stroke();
}
function polygon(ctx,points,fill,stroke){
  ctx.beginPath();points.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.closePath();
  if(fill){ctx.fillStyle=fill;ctx.fill()}if(stroke){ctx.strokeStyle=stroke;ctx.stroke()}
}
function paper(ctx,w,h,base,seed=23){
  ctx.fillStyle=base;ctx.fillRect(0,0,w,h);const rnd=randomSource(seed);
  for(let i=0;i<11000;i++){
    ctx.fillStyle=i%3?'rgba(92,60,25,.042)':'rgba(255,252,220,.11)';
    ctx.fillRect(rnd()*w,rnd()*h,rnd()*3+1,rnd()*2+.6);
  }
}
function zellij(){
  return drawnTexture(768,192,(c,w,h)=>{
    paper(c,w,h,'#d8c8a1');
    c.fillStyle='#194c52';c.fillRect(0,6,w,h-12);
    for(let i=-1;i<9;i++){
      const cx=i*96+48,cy=96;
      const star=(radius,inner,phase=0)=>Array.from({length:16},(_,j)=>{
        const a=j*TAU/16+phase,r=j%2?inner:radius;return [cx+Math.cos(a)*r,cy+Math.sin(a)*r];
      });
      c.lineWidth=3;polygon(c,star(61,42),'#c8ba8a','#243e3b');polygon(c,star(51,31),'#6fada4','#173d40');
      polygon(c,star(32,21),'#153f56','#d7c68c');polygon(c,star(11,7),'#d9b879');
      for(const sy of [28,164]){
        polygon(c,[[cx,sy-11],[cx+22,sy],[cx,sy+11],[cx-22,sy]],'#91bdb3','#bfc6ac');
        polygon(c,[[cx+48,sy-7],[cx+57,sy],[cx+48,sy+7],[cx+39,sy]],'#b88d53');
      }
    }
    for(const [y,col,l] of [[10,'#799f95',4],[18,'#e0cc91',3],[175,'#d6bc8f',3],[184,'#79a59e',4]]){
      c.fillStyle=col;c.fillRect(0,y,w,l);
    }
    const rnd=randomSource(453);
    for(let i=0;i<1600;i++){c.fillStyle=i%2?'rgba(246,227,182,.14)':'rgba(22,39,38,.13)';c.fillRect(rnd()*w,rnd()*h,1+rnd()*3,1+rnd()*2)}
    for(let x=0;x<w;x+=96){c.fillStyle='rgba(78,67,52,.58)';c.fillRect(x,0,2,h)}
  },true);
}
function ceramicRelief(colorMap){
  const image=colorMap.image,c=image.getContext('2d'),w=image.width,h=image.height,px=c.getImageData(0,0,w,h).data;
  const heights=new Float32Array(w*h),normals=new Uint8Array(w*h*4);
  for(let y=0;y<h;y++)for(let x=0;x<w;x++){
    const i=(w*y+x)*4,lum=(px[i]*.23+px[i+1]*.56+px[i+2]*.21)/255;
    const seam=Math.min(x%96,96-x%96)<2?.46:0;
    heights[w*y+x]=lum*.83-seam;
  }
  for(let y=0;y<h;y++)for(let x=0;x<w;x++){
    const u=(heights[w*y+(x+2)%w]-heights[w*y+(x+w-2)%w])*.98;
    const v=(heights[w*((y+2)%h)+x]-heights[w*((y+h-2)%h)+x])*.98;
    const k=((h-1-y)*w+x)*4,s=Math.hypot(1,u,v);
    normals[k]=Math.round(128-127*u/s);normals[k+1]=Math.round(128+127*v/s);normals[k+2]=Math.round(128+127/s);normals[k+3]=255;
  }
  const tex=new THREE.DataTexture(normals,w,h,THREE.RGBAFormat);
  tex.wrapS=tex.wrapT=THREE.RepeatWrapping;tex.generateMipmaps=true;tex.magFilter=THREE.LinearFilter;tex.minFilter=THREE.LinearMipmapLinearFilter;tex.anisotropy=4;tex.needsUpdate=true;
  return tex;
}
function atlas(){
  return drawnTexture(1024,1344,(c,w,h)=>{
    paper(c,w,h,'#ccba8e');const ink='#394a47',faded='#836a4a',red='#904e34';
    c.strokeStyle=faded;c.lineWidth=3;c.strokeRect(30,32,w-60,h-64);c.lineWidth=1;c.strokeRect(40,42,w-80,h-84);
    c.fillStyle=ink;c.textAlign='center';c.font='24px serif';c.fillText('•     M E R I D I A N   H O U S E     •',w/2,94);
    c.font='58px Georgia, serif';c.fillText('Tabula stellarum',w/2,169);
    c.font='19px serif';c.fillText('A   M A P   O F   T H E   N O R T H E R N   S K Y',w/2,218);
    const cx=512,cy=679,R=373;
    c.strokeStyle=ink;c.lineWidth=2;circle(c,cx,cy,R+16);circle(c,cx,cy,R+4);
    for(let i=0;i<7;i++){c.strokeStyle=i===6?ink:'#928368';c.lineWidth=i===6?2:1;circle(c,cx,cy,R*(i+1)/7)}
    for(let j=0;j<144;j++){
      const a=j*TAU/144,k=j%6===0,ex=Math.sin(a),ey=-Math.cos(a);
      c.strokeStyle=k?ink:faded;line(c,cx+(R+4)*ex,cy+(R+4)*ey,cx+(R+(k?16:9))*ex,cy+(R+(k?16:9))*ey);
      if(k){
        c.strokeStyle='#a89976';line(c,cx,cy,cx+R*ex,cy+R*ey);
        c.fillStyle=ink;c.font='17px serif';c.fillText(String(j/6).padStart(2,'0'),cx+(R+35)*ex,cy+(R+35)*ey+6);
      }
    }
    const pt=(ra,dec)=>[cx+Math.sin(ra*TAU/24)*R*(90-dec)/90,cy-Math.cos(ra*TAU/24)*R*(90-dec)/90];
    const groups=[
      ['URSA MAJOR',[[13.79,49.3],[13.40,54.9],[12.90,55.9],[12.26,57.0],[11.06,61.8],[11.03,56.4],[11.90,53.7],[12.26,57.0]]],
      ['CASSIOPEIA',[[.15,59.1],[.67,56.5],[.95,60.7],[1.43,60.2],[1.91,63.7]]],
      ['LYRA',[[18.62,38.8],[18.75,37.6],[18.83,33.4],[18.98,32.7],[18.98,36.9],[18.75,37.6]]],
      ['CYGNUS',[[19.51,27.9],[20.37,40.3],[20.69,45.3],[20.37,40.3],[19.75,45.1],[20.37,40.3],[20.77,34.0]]],
      ['URSA MINOR',[[2.53,89.2],[17.54,86.6],[16.76,82.0],[15.73,77.8],[14.84,74.2],[15.35,71.8],[16.29,75.8],[15.73,77.8]]],
      ['AURIGA',[[5.28,46],[5.99,44.9],[5.99,37.2],[5.44,28.6],[4.95,33.2],[5.28,46]]]
    ];
    const rnd=randomSource(1258);
    for(let i=0;i<370;i++){const a=rnd()*TAU,r=Math.sqrt(rnd())*R;c.fillStyle=faded;circle(c,cx+Math.cos(a)*r,cy+Math.sin(a)*r,.7+rnd()*1.1,true)}
    for(const [name,stars] of groups){
      const p=stars.map(s=>pt(...s));c.strokeStyle=ink;c.lineWidth=1.4;
      for(let i=1;i<p.length;i++)line(c,...p[i-1],...p[i]);
      c.fillStyle=ink;for(const q of p)circle(c,...q,3.6,true);
      c.fillStyle=red;c.font='italic 15px Georgia, serif';c.fillText(name,p[1][0]+27,p[1][1]-11);
    }
    c.strokeStyle=faded;line(c,94,1137,930,1137);
    c.fillStyle=ink;c.textAlign='left';c.font='italic 27px Georgia, serif';c.fillText('Meridian transits',98,1189);
    c.font='20px serif';c.fillText('I.   Align the sight along the meridian.',98,1232);c.fillText('II.  Read the divided circle at culmination.',98,1265);
    c.textAlign='right';c.fillStyle=red;c.font='33px Georgia, serif';c.fillText('Plate IV',925,1239);
  });
}
function plate(title,sub,bright=false){
  return drawnTexture(768,228,(c,w,h)=>{
    paper(c,w,h,bright?'#b29968':'#29413e');const ink=bright?'#3d382c':'#d5c8a5';
    c.strokeStyle=ink;c.lineWidth=2;c.strokeRect(13,13,w-26,h-26);c.lineWidth=1;c.strokeRect(20,20,w-40,h-40);
    for(const x of [29,w-29])for(const y of [29,h-29]){c.fillStyle='#695e48';circle(c,x,y,3.7,true)}
    c.fillStyle=ink;c.textAlign='center';c.font='54px Georgia, serif';c.fillText(title,w/2,112);
    c.font='23px serif';c.fillText(sub,w/2,165);
  });
}
function compass(){
  return drawnTexture(768,768,(c,w,h)=>{
    paper(c,w,h,'#c5b18a');const x=w/2,y=h/2,r=355;
    c.strokeStyle='#584b38';c.lineWidth=4;circle(c,x,y,r);c.lineWidth=2;circle(c,x,y,r-11);circle(c,x,y,r-51);
    for(let i=0;i<180;i++){const a=i*TAU/180;c.lineWidth=i%5?1:3;line(c,x+Math.sin(a)*(r-12),y-Math.cos(a)*(r-12),x+Math.sin(a)*(r-(i%5?21:36)),y-Math.cos(a)*(r-(i%5?21:36)))}
    for(let i=0;i<16;i++){
      const a=i*TAU/16,z=i%2?151:(i%4?207:250),pt=(r,b)=>[x+r*Math.sin(b),y-r*Math.cos(b)];
      polygon(c,[[x,y],pt(35,a-.77),pt(z,a)],i%2?'#71827b':'#315754');polygon(c,[[x,y],pt(35,a+.77),pt(z,a)],'#ac8964','#715e44');
    }
    c.textAlign='center';c.textBaseline='middle';c.font='32px Georgia, serif';c.fillStyle='#493e2b';
    for(const [i,t] of ['N','E','S','W'].entries())c.fillText(t,x+Math.sin(i*TAU/4)*278,y-Math.cos(i*TAU/4)*278);
  });
}
function contact(){
  return drawnTexture(128,128,(c,w)=>{
    const g=c.createRadialGradient(w/2,w/2,0,w/2,w/2,w/2);
    g.addColorStop(0,'rgba(43,31,21,.62)');g.addColorStop(.53,'rgba(48,35,25,.32)');g.addColorStop(1,'rgba(51,33,21,0)');
    c.fillStyle=g;c.fillRect(0,0,w,w);
  });
}
export function makeMaterials(manager,anisotropy=4){
  const loader=new THREE.TextureLoader(manager),cache=new Map();
  function image(name,normal,repeat){
    const key=[name,normal,repeat].join('/');if(cache.has(key))return cache.get(key);
    const t=loader.load('./textures/'+name+(normal?'-n':'')+'.jpg');
    if(!normal)t.colorSpace=THREE.SRGBColorSpace;
    t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.setScalar(1/repeat);t.anisotropy=Math.min(anisotropy,6);cache.set(key,t);return t;
  }
  const mts={};
  function pbr(name,color,roughness=.8,metalness=0,extra={}){
    mts[name]=new THREE.MeshStandardMaterial({color,roughness,metalness,vertexColors:true,...extra});mts[name].name=name;
  }
  function surface(name,file,repeat,strength,rough,metal=0,color=0xffffff){
    pbr(name,color,rough,metal,{map:image(file,false,repeat),normalMap:image(file,true,repeat),normalScale:new THREE.Vector2(strength,strength)});
  }
  surface('plaster','lime',1.85,.34,.94);
  surface('chalk','lime',1.85,.27,.88,0,0xfff1d8);
  surface('ochre','lime',1.85,.36,.91,0,0xd6a27d);
  surface('stone','ashlar',1.32,.46,.88);
  surface('base','ashlar',1.32,.55,.93,0,0xc8b6a3);
  surface('flag','flag',1.55,.34,.85);
  surface('lightFlag','flag',1.55,.32,.79,0,0xfff2d5);
  surface('copper','copper',.78,.22,.43,.68);
  surface('aged','copper',.78,.22,.47,.68,0x93a69a);
  surface('roof','dome',1.62,.19,.51,.54);
  for(const [name,file,scale] of [['copper','copper',.78],['aged','copper',.78],['roof','dome',1.62]]){
    const mask=image(file+'-orm',false,scale);mask.colorSpace=THREE.NoColorSpace;
    mts[name].roughnessMap=mask;mts[name].metalnessMap=mask;
    mts[name].roughness=name==='aged'?1.0:.91;mts[name].metalness=name==='aged'?.82:.94;
  }
  surface('cedar','cedar',1.28,.29,.77);
  surface('sand','sand',1.42,.32,.95);
  surface('rock','strata',3.4,.51,.97);
  pbr('mortar',0x9c866d,.98);pbr('recess',0x645548,.96);
  pbr('brass',0xc5a16b,.33,.79);pbr('gold',0xe4bf7b,.25,.8);
  pbr('gunmetal',0x353f3d,.39,.65);pbr('black',0x262d2d,.65,.31);
  pbr('teal',0x316a68,.26,.13);pbr('lapis',0x1f4956,.32,.11);pbr('ivory',0xd9cdaf,.34,.05);
  const tileColor=zellij();
  pbr('frieze',0xffffff,.29,.12,{map:tileColor,normalMap:ceramicRelief(tileColor),normalScale:new THREE.Vector2(.34,.34)});
  pbr('atlas',0xffffff,.86,0,{map:atlas()});
  pbr('plaque',0xffffff,.53,.3,{map:plate('Meridian House','S O U T H    P A S S A G E')});
  pbr('maker',0xffffff,.48,.43,{map:plate('Transit No. VII','M E R I D I A N    W O R K S',true)});
  pbr('dial',0xffffff,.58,.24,{map:compass()});
  pbr('cloth',0x968365,.96);pbr('page',0xdfccab,.94);pbr('leather',0x774b37,.75);pbr('cord',0x887456,.94);
  mts.lens=new THREE.MeshPhysicalMaterial({color:0x2e535d,metalness:.34,roughness:.15,clearcoat:1,clearcoatRoughness:.085,iridescence:.31,iridescenceIOR:1.34,iridescenceThicknessRange:[235,385],envMapIntensity:1.45,vertexColors:true});pbr('glassEdge',0x407e88,.2,.48);
  pbr('iron',0x4b4237,.64,.55);pbr('wax',0x87442e,.77);
  pbr('shale',0xa87757,.97);pbr('dune',0xdfb281,.98);pbr('grass',0x958357,.96);
  pbr('horizon',0xae8676,.98);pbr('chaff',0xb9a06b,.93);
  mts.contact=new THREE.MeshBasicMaterial({map:contact(),transparent:true,depthWrite:false,toneMapped:false,polygonOffset:true,polygonOffsetFactor:-1,polygonOffsetUnits:-1});
  return mts;
}

// A small fixed radiance field gives bronze and glazed clay a sky, a dark
// wall and a sunlit opening to reflect even when those are out of view.
export function reflectionSky(){
  const W=256,H=128,data=new Uint16Array(W*H*4),toHalf=THREE.DataUtils.toHalfFloat;
  for(let j=0;j<H;j++)for(let i=0;i<W;i++){
    const v=(j+.5)/H,u=(i+.5)/W,e=Math.sin((v-.5)*Math.PI),s=Math.cos((u-.69)*TAU);
    const skylight=Math.max(0,e),glow=Math.pow(Math.max(0,s),24)*Math.exp(-((e-.28)**2)/.07);
    const opening=(s>.91 && e>-.08 && e<.57)?1:0;
    const ground=e<0?(.42+.14*Math.sin(u*TAU*3)):.42;
    const c=[ground*1.05+skylight*.53+glow*1.7+opening*1.25,ground*.80+skylight*.85+glow*1.28+opening*1.05,ground*.61+skylight*1.30+glow*.72+opening*.78];
    const k=(i+W*j)*4;for(let q=0;q<3;q++)data[k+q]=toHalf(c[q]);data[k+3]=toHalf(1);
  }
  const tex=new THREE.DataTexture(data,W,H,THREE.RGBAFormat,THREE.HalfFloatType);tex.mapping=THREE.EquirectangularReflectionMapping;tex.needsUpdate=true;return tex;
}

// Fixed interior reflections follow the actual door bearings and dome slot.
// The probe is generated once from the room dimensions. There are no live
// reflection cameras in the render loop.
export function chamberReflections(){
  const W=256,H=128,data=new Uint16Array(W*H*4),half=THREE.DataUtils.toHalfFloat;
  for(let y=0;y<H;y++)for(let x=0;x<W;x++){
    const pitch=((y+.5)/H-.5)*Math.PI,bearing=((x+.5)/W-.5)*TAU;
    const dy=Math.sin(pitch),horizontal=Math.cos(pitch),dx=Math.cos(bearing)*horizontal,dz=Math.sin(bearing)*horizontal;
    const az=Math.atan2(dx,dz),wallY=2.58+dy*INNER/Math.max(.001,horizontal);
    const sunFacing=Math.max(0,-dx*.523+dy*.571-dz*.673);
    const glow=sunFacing**52,sky=[1.04+glow*2.9,1.27+glow*2.0,1.49+glow*.86];
    let c;
    if(wallY<.60){
      const wash=.82+.35*Math.max(0,-dz)+.12*Math.sin(az*5);
      c=[.43*wash,.32*wash,.21*wash];
    }else if(wallY<5.9){
      const wash=.80+.31*Math.max(0,dx*.6+dz*.8)+.05*Math.cos(4*az);
      c=[.52*wash,.40*wash,.288*wash];
      if((wallY>4.77&&wallY<5.02)||(wallY>1.31&&wallY<1.48))c=[.18,.28,.23];
      for(const {a,w,sill,spring,rise} of portals){
        const s=Math.sin(az-a)*INNER;
        if(Math.cos(az-a)<0||Math.abs(s)>w)continue;
        const top=spring+rise*Math.sqrt(1-(s/w)**2);
        if(wallY>sill && wallY<top){
          c=dy>.06?sky:[1.26,1.02,.70];
          if(a===0)c=c.map(v=>v*.53);
          break;
        }
      }
    }else{
      const R=5.8,Q=3.65,vert=2.58-5.9,A=horizontal**2/(R*R)+dy*dy/(Q*Q),B=2*vert*dy/(Q*Q),C=vert**2/(Q*Q)-1;
      const t=(-B+Math.sqrt(Math.max(0,B*B-4*A*C)))/(2*A);
      const localX=t*(dx*Math.cos(ROOF_YAW)-dz*Math.sin(ROOF_YAW)),localZ=t*(dx*Math.sin(ROOF_YAW)+dz*Math.cos(ROOF_YAW));
      const seam=.85+.15*Math.cos(localX*12);
      c=[.29*seam,.18*seam,.108*seam];
      if(Math.abs(localX)<1.13 && !(localZ>4.86 && wallY<7.3))c=sky;
    }
    const q=4*(x+W*y);
    for(let j=0;j<3;j++)data[q+j]=half(c[j]);data[q+3]=half(1);
  }
  const t=new THREE.DataTexture(data,W,H,THREE.RGBAFormat,THREE.HalfFloatType);
  t.mapping=THREE.EquirectangularReflectionMapping;t.needsUpdate=true;return t;
}

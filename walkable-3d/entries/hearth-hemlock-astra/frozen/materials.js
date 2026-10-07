import * as THREE from 'three';

export function randomGenerator(seed = 173) {
  return () => { seed = (Math.imul(seed, 1664525) + 1013904223) | 0; return (seed >>> 0) / 4294967296; };
}

function canvasTexture(paint, size = 256, repeat = 1) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const c = canvas.getContext('2d');
  paint(c, size, randomGenerator(948));
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(repeat, repeat);
  texture.anisotropy = 4;
  return texture;
}

export function makeMaterials() {
  const plaster = canvasTexture((c,s,r) => {
    c.fillStyle='#d8d0b6'; c.fillRect(0,0,s,s);
    for(let i=0;i<9500;i++){ const a=r()*.08; c.fillStyle=`rgba(${r()>.5?'255,255,232':'76,64,41'},${a})`;c.fillRect(r()*s,r()*s,1+r()*4,1+r()*3); }
    for(let i=0;i<45;i++){ c.fillStyle='rgba(87,75,52,.035)';c.beginPath();c.ellipse(r()*s,r()*s,10+r()*30,2+r()*6,r()*6,0,Math.PI*2);c.fill(); }
  });
  const wood = canvasTexture((c,s,r)=>{
    c.fillStyle='#c2b499';c.fillRect(0,0,s,s);
    for(let i=0;i<600;i++) {
      const x=r()*s;c.strokeStyle=`rgba(${r()>.45?'52,28,14':'225,184,118'},${.02+r()*.17})`;c.lineWidth=.3+r()*1.6;
      c.beginPath();c.moveTo(x,0);for(let y=0;y<=s;y+=16)c.lineTo(x+Math.sin(y/46+i)*(.4+r()*2),y);c.stroke();
    }
    for(let i=0;i<5;i++){const x=r()*s,y=r()*s;for(let j=1;j<8;j++){c.strokeStyle=`rgba(48,27,13,${.11-j*.009})`;c.beginPath();c.ellipse(x,y,2+j*1.5,6+j*4,.02,0,Math.PI*2);c.stroke();}}
    for(let i=0;i<45;i++){c.strokeStyle='rgba(238,208,144,.15)';c.beginPath();const x=r()*s,y=r()*s;c.moveTo(x,y);c.lineTo(x+1,y+10+r()*30);c.stroke();}
  },512);
  const stone=canvasTexture((c,s,r)=>{
    c.fillStyle='#b9ad96';c.fillRect(0,0,s,s);
    for(let i=0;i<13000;i++){c.fillStyle=`rgba(${r()>.45?'244,231,201':'58,59,49'},${r()*.14})`;c.fillRect(r()*s,r()*s,1+r()*3,1+r()*2);}
    for(let i=0;i<10;i++){c.strokeStyle='rgba(74,69,57,.10)';c.lineWidth=.5;let x=r()*s,y=r()*s;c.beginPath();c.moveTo(x,y);for(let j=0;j<8;j++){x+=r()*20-10;y+=r()*20;c.lineTo(x,y)}c.stroke();}
  });
  const ceramic=canvasTexture((c,s,r)=>{
    c.fillStyle='#eee7d5';c.fillRect(0,0,s,s);
    for(let i=0;i<1900;i++){c.fillStyle=`rgba(64,43,25,${.03+r()*.17})`;c.beginPath();c.arc(r()*s,r()*s,.3+r()*.7,0,Math.PI*2);c.fill();}
  });
  const cloth=canvasTexture((c,s,r)=>{
    c.fillStyle='#d7c5a0';c.fillRect(0,0,s,s);
    for(let y=0;y<s;y+=4){c.fillStyle='rgba(82,64,39,.15)';c.fillRect(0,y,s,1);}
    for(let x=0;x<s;x+=4){c.fillStyle='rgba(255,246,216,.23)';c.fillRect(x,0,1,s);}
    c.fillStyle='#8d5448';for(let x=18;x<s;x+=64){c.fillRect(x,0,5,s);c.fillRect(x+10,0,2,s);}
  });
  const soil=canvasTexture((c,s,r)=>{
    c.fillStyle='#34251e';c.fillRect(0,0,s,s);for(let i=0;i<8000;i++){c.fillStyle=['#49352a','#5c4533','#211c17','#71624a'][Math.floor(r()*4)];c.fillRect(r()*s,r()*s,r()*3+1,r()*3+1);}
  });
  const leafMap=canvasTexture((c,s,r)=>{
    c.fillStyle='#87a574';c.fillRect(0,0,s,s);c.strokeStyle='#c2d59a';c.lineWidth=3;c.beginPath();c.moveTo(s/2,0);c.lineTo(s/2,s);c.stroke();
    c.lineWidth=1.1;for(let y=0;y<s;y+=25){c.beginPath();c.moveTo(s/2,y);c.lineTo(0,y-50);c.moveTo(s/2,y);c.lineTo(s,y-50);c.stroke();}
    for(let i=0;i<2000;i++){c.fillStyle='rgba(20,62,25,.08)';c.fillRect(r()*s,r()*s,1,2);}
  });
  const M=(color,roughness=.7,extra={})=>new THREE.MeshStandardMaterial({color,roughness,...extra});
  const materials={
    plaster:M('#f2e2c4',.93,{map:plaster,bumpMap:plaster,bumpScale:.022}),
    bluePlaster:M('#758a83',.93,{map:plaster,bumpMap:plaster,bumpScale:.023}),
    wood:M('#9c7449',.74,{map:wood,bumpMap:wood,bumpScale:.025}),
    paleWood:M('#cfad73',.73,{map:wood,bumpMap:wood,bumpScale:.018}),
    darkWood:M('#66503c',.81,{map:wood,bumpMap:wood,bumpScale:.025}),
    paintedWood:M('#526b5c',.82,{map:wood,bumpMap:wood,bumpScale:.009}),
    blueWood:M('#3d615c',.81,{map:wood,bumpMap:wood,bumpScale:.009}),
    stone:M('#c9c2aa',.92,{map:stone,bumpMap:stone,bumpScale:.027}),
    darkStone:M('#767c76',.94,{map:stone,bumpMap:stone,bumpScale:.035}),
    mortar:M('#7a7666',1),
    brick:M('#9c624b',.91,{map:stone,bumpMap:stone,bumpScale:.022}),
    terra:M('#cc8255',.89,{map:ceramic}),
    cream:M('#f2dec0',.24,{map:ceramic}),
    celadon:M('#86a797',.22,{map:ceramic}),
    ochre:M('#d6a448',.28,{map:ceramic}),
    plum:M('#76516a',.31,{map:ceramic}),
    iron:M('#2f3533',.5,{metalness:.58}),
    brass:M('#bd9855',.31,{metalness:.72}),
    copper:M('#b67b53',.4,{metalness:.65}),
    glass:new THREE.MeshPhysicalMaterial({color:'#d2e4dc',roughness:.13,metalness:.05,transparent:true,opacity:.10,depthWrite:false,side:THREE.DoubleSide}),
    bottleGlass:new THREE.MeshPhysicalMaterial({color:'#829e84',roughness:.2,metalness:.1,transparent:true,opacity:.56,depthWrite:false}),
    amberGlass:new THREE.MeshStandardMaterial({color:'#8c5926',roughness:.23,metalness:.1}),
    purpleGlass:new THREE.MeshStandardMaterial({color:'#6b6189',roughness:.22,metalness:.13}),
    water:new THREE.MeshStandardMaterial({color:'#859c91',roughness:.12,metalness:.3}),
    soil:M('#ffffff',1,{map:soil}),
    leaf:M('#659053',.82,{map:leafMap,side:THREE.DoubleSide}),
    leafDark:M('#3c6c4b',.83,{map:leafMap,side:THREE.DoubleSide}),
    leafSilver:M('#b3c2a0',.78,{map:leafMap,side:THREE.DoubleSide}),
    leafPurple:M('#79658d',.7,{map:leafMap,side:THREE.DoubleSide}),
    stem:M('#576e36',.88),
    linen:M('#f6e8c9',.97,{map:cloth,bumpMap:cloth,bumpScale:.009,side:THREE.DoubleSide}),
    paper:M('#e2cfa2',.93,{map:ceramic}),
    tea:M('#674727',.23),
    crust:M('#c39042',.94,{map:stone,bumpMap:stone,bumpScale:.015}),
    cutBread:M('#edcf91',1,{map:ceramic}),
    red:M('#a95842',.61),
    yellow:M('#dfb84b',.5),
    glow:new THREE.MeshStandardMaterial({color:'#b2eacb',emissive:'#84ddb9',emissiveIntensity:1.4,roughness:.3}),
    ember:new THREE.MeshBasicMaterial({color:'#ffc173'}),
    black:new THREE.MeshStandardMaterial({color:'#18231f',roughness:1}),
    curtain:M('#e8d8b6',1,{map:cloth,side:THREE.DoubleSide}),
    bookRed:M('#814c3c',.89),bookGreen:M('#455d49',.88),bookBlue:M('#4c626b',.87),bookGold:M('#a2834d',.9),
    outside:M('#829187',1),
  };
  const ao=canvasTexture((c,s)=>{
    const gradient=c.createRadialGradient(s/2,s/2,0,s/2,s/2,s/2);gradient.addColorStop(0,'rgba(25,20,11,.43)');gradient.addColorStop(.5,'rgba(25,20,11,.20)');gradient.addColorStop(1,'rgba(25,20,11,0)');c.fillStyle=gradient;c.fillRect(0,0,s,s);
  },64);
  materials.ao=new THREE.MeshBasicMaterial({map:ao,transparent:true,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-1});
  const floorMap=wood.clone();floorMap.center.set(.5,.5);floorMap.rotation=Math.PI/2;floorMap.needsUpdate=true;
  materials.floorWood=materials.wood.clone();materials.floorWood.map=floorMap;materials.floorWood.bumpMap=floorMap;
  materials.floorDark=materials.darkWood.clone();materials.floorDark.map=floorMap;materials.floorDark.bumpMap=floorMap;
  return materials;
}

export function textMaterial(lines, {background='#e0cc9e',ink='#413d31',width=256,height=128,font='serif',border=true}={}) {
  const canvas=document.createElement('canvas');canvas.width=width;canvas.height=height;
  const c=canvas.getContext('2d');c.fillStyle=background;c.fillRect(0,0,width,height);
  if(border){c.strokeStyle=ink;c.lineWidth=2;c.strokeRect(7,7,width-14,height-14);c.lineWidth=1;c.strokeRect(11,11,width-22,height-22);}
  c.fillStyle=ink;c.textAlign='center';c.textBaseline='middle';
  lines.forEach((line,i)=>{c.font=`${i===0?'italic ':''}${Math.floor(height/(lines.length+1)*.71)}px ${font}`;c.fillText(line,width/2,height*(i+1)/(lines.length+1),width-26);});
  const t=new THREE.CanvasTexture(canvas);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=4;
  return new THREE.MeshStandardMaterial({map:t,roughness:.9,side:THREE.DoubleSide});
}

export function makeEnvironment() {
  // An original low-resolution reflection environment. Soft overcast sky above,
  // earth below, with broad window highlights to separate glass and glazed clay.
  const canvas=document.createElement('canvas');canvas.width=512;canvas.height=256;
  const c=canvas.getContext('2d');const sky=c.createLinearGradient(0,0,0,256);
  sky.addColorStop(0,'#bed1d7');sky.addColorStop(.38,'#e4e8df');sky.addColorStop(.52,'#b3c2b6');sky.addColorStop(.60,'#787b60');sky.addColorStop(1,'#403c2c');
  c.fillStyle=sky;c.fillRect(0,0,512,256);
  c.fillStyle='#f4f0dc';c.fillRect(70,70,48,44);c.fillStyle='#fff2d8';c.fillRect(340,96,19,15);
  const texture=new THREE.CanvasTexture(canvas);texture.mapping=THREE.EquirectangularReflectionMapping;texture.colorSpace=THREE.SRGBColorSpace;
  return texture;
}

export function botanicalMaterial(name='Salvia officinalis',note='Gather before the rain.') {
  const canvas=document.createElement('canvas');canvas.width=384;canvas.height=512;
  const c=canvas.getContext('2d'),r=randomGenerator(782);
  c.fillStyle='#d9cca8';c.fillRect(0,0,384,512);
  for(let i=0;i<4500;i++){c.fillStyle=`rgba(95,78,46,${r()*.09})`;c.fillRect(r()*384,r()*512,1,1);}
  c.strokeStyle='#7d8461';c.lineWidth=1;c.strokeRect(18,18,348,476);c.strokeRect(23,23,338,466);
  c.fillStyle='#3d5741';c.font='italic 27px Georgia';c.textAlign='center';c.fillText(name,192,68,320);
  c.font='10px Georgia';c.fillText('SPECIMENS FROM THE COTTAGE GARDEN',192,90);
  c.strokeStyle='#4c6445';c.lineWidth=3;c.beginPath();c.moveTo(192,423);c.bezierCurveTo(157,319,232,225,180,132);c.stroke();
  for(let j=0;j<10;j++){
    const y=154+j*25,x=191+Math.sin(j*.8)*15,side=j%2?1:-1,tx=x+side*(52+(j%3)*7),ty=y-30;
    c.strokeStyle='#657754';c.lineWidth=2;c.beginPath();c.moveTo(x,y);c.lineTo(tx,ty);c.stroke();
    c.fillStyle=j%3?'#809169':'#8d9b74';c.beginPath();c.moveTo(x+side*12,y-8);c.bezierCurveTo(tx-side*4,ty+23,tx+side*26,ty-1,tx+side*34,ty-27);c.bezierCurveTo(tx-side*9,ty-37,tx-side*23,ty-2,x+side*12,y-8);c.fill();c.stroke();
    c.strokeStyle='#c0c29a';c.lineWidth=1;c.beginPath();c.moveTo(x+side*15,y-9);c.lineTo(tx+side*29,ty-24);c.stroke();
  }
  c.fillStyle='#675642';c.font='italic 16px Georgia';c.fillText(note,192,457,316);
  c.font='10px Georgia';c.fillText('PLATE VII   ·   17 OCTOBER',192,478);
  const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;texture.anisotropy=4;
  return new THREE.MeshStandardMaterial({map:texture,roughness:.95,side:THREE.DoubleSide});
}

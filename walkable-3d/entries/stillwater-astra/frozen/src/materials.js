import * as THREE from 'three';

export function seeded(seed=42){let s=seed>>>0;return()=>{s=(Math.imul(1664525,s)+1013904223)>>>0;return s/4294967296;};}
const clamp=(x,a=0,b=255)=>Math.max(a,Math.min(b,x));
function canvas(w,h){const c=document.createElement('canvas');c.width=w;c.height=h;return c;}
function texture(c){const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.wrapS=t.wrapT=THREE.RepeatWrapping;t.anisotropy=8;return t;}

function woodTexture(base,seed,paint=false){
 const c=canvas(1024,256),ctx=c.getContext('2d'),r=seeded(seed),img=ctx.createImageData(c.width,c.height);
 const phases=Array.from({length:12},()=>r()*Math.PI*2);
 for(let y=0;y<c.height;y++)for(let x=0;x<c.width;x++){
  const bend=3*Math.sin(x*.009+phases[0])+1.7*Math.sin(x*.021+y*.03);
  const grain=Math.sin((y+bend)*.95)*3.6+Math.sin((y+bend)*.29+phases[2])*4+Math.sin(y*.078+Math.sin(x*.007)*.5)*6;
  const pores=r()*11-5.5;const fade=Math.sin(x*.006+y*.071)*4+Math.sin(x*.026-y*.047)*2;
  const edge=Math.pow(Math.abs(y-128)/128,10)*-15;
  const i=(y*1024+x)*4;
  for(let k=0;k<3;k++)img.data[i+k]=clamp(base[k]+grain+pores+fade+edge);
  img.data[i+3]=255;
 }
 ctx.putImageData(img,0,0);
 for(let n=0;n<620;n++){
  const y=r()*256,x=r()*1024,len=20+r()*530;ctx.strokeStyle=r()>.6?'rgba(227,219,185,.11)':'rgba(40,38,28,.12)';ctx.lineWidth=.3+r()*1.0;
  ctx.beginPath();ctx.moveTo(x,y);ctx.bezierCurveTo(x+len*.3,y-2,x+len*.7,y+2,x+len,y+(r()-.5)*3);ctx.stroke();
 }
 for(let n=0;n<7;n++){
  const x=r()*1024,y=25+r()*206;
  for(let j=12;j>0;j--){ctx.strokeStyle=`rgba(39,34,26,${.015+(12-j)*.008})`;ctx.lineWidth=.8;ctx.beginPath();ctx.ellipse(x,y,4+j*3,1+j*.65,.02,0,Math.PI*2);ctx.stroke();}
  ctx.fillStyle='rgba(38,30,22,.36)';ctx.beginPath();ctx.ellipse(x,y,4,1.8,0,0,Math.PI*2);ctx.fill();
 }
 for(let n=0;n<22;n++){
  const x=r()*1024,y=r()*256;ctx.strokeStyle='rgba(38,32,25,.31)';ctx.lineWidth=.5+r();ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+20+r()*120,y+(r()-.5)*2);ctx.lineTo(x+90+r()*100,y);ctx.stroke();
 }
 if(paint){
  for(let n=0;n<950;n++){
   const x=r()*1024,y=r()*256;ctx.fillStyle=`rgba(183,167,130,${r()*.42})`;ctx.fillRect(x,y,2+r()*31,.35+r()*1.7);
  }
  for(let n=0;n<30;n++){const x=r()*1024,y=r()*256;ctx.fillStyle='rgba(165,143,101,.4)';ctx.fillRect(x,y,6+r()*38,1+r()*5);}
 }
 return texture(c);
}
function stoneTexture(base,seed){
 const c=canvas(512,512),ctx=c.getContext('2d'),r=seeded(seed),data=ctx.createImageData(512,512);
 for(let y=0;y<512;y++)for(let x=0;x<512;x++){
  const n=Math.sin(x*.062+Math.sin(y*.033)*3)*4+Math.sin(y*.107+x*.04)*3+Math.sin(x*.019+y*.023)*7+(r()-.5)*25;
  const i=(y*512+x)*4;for(let k=0;k<3;k++)data.data[i+k]=clamp(base[k]+n);data.data[i+3]=255;
 }
 ctx.putImageData(data,0,0);
 for(let n=0;n<1400;n++){
  const x=r()*512,y=r()*512,rad=.4+r()*3;
  ctx.fillStyle=r()>.5?'rgba(220,214,185,.17)':'rgba(23,35,30,.16)';ctx.beginPath();ctx.ellipse(x,y,rad,rad*.55,r()*3,0,Math.PI*2);ctx.fill();
 }
 return texture(c);
}
function fabricTexture(base,seed){const c=canvas(256,256),ctx=c.getContext('2d'),r=seeded(seed);ctx.fillStyle=base;ctx.fillRect(0,0,256,256);for(let i=0;i<256;i+=2){ctx.strokeStyle=`rgba(24,31,25,${.08+r()*.12})`;ctx.beginPath();ctx.moveTo(i,0);ctx.lineTo(i,256);ctx.moveTo(0,i);ctx.lineTo(256,i);ctx.stroke();}return texture(c);}
function ropeTexture(){
 const c=canvas(256,128),ctx=c.getContext('2d'),data=ctx.createImageData(256,128),r=seeded(98);
 for(let y=0;y<128;y++)for(let x=0;x<256;x++){
  const twist=Math.sin((y/128*3+x/256*13)*Math.PI*2),fiber=Math.sin(y*2.1+x*1.6)*3,n=twist*19+fiber+r()*9,i=(y*256+x)*4;
  data.data[i]=170+n;data.data[i+1]=149+n;data.data[i+2]=109+n;data.data[i+3]=255;
 }ctx.putImageData(data,0,0);return texture(c);
}

export function createMaterials(){
 const mats={};
 const make=(name,color,roughness=.8,metalness=0,extra={})=>mats[name]=new THREE.MeshStandardMaterial({color,roughness,metalness,...extra});
 const wood=woodTexture([144,131,108],27),warm=woodTexture([159,128,88],31),dark=woodTexture([79,76,61],34),wet=woodTexture([68,76,62],59),teal=woodTexture([57,102,101],42,true),cream=woodTexture([195,191,162],55,true),red=woodTexture([122,67,49],61,true);
 make('wood',0xd6cbb7,.86,0,{map:wood,bumpMap:wood,bumpScale:.024});
 mats.woods=Array.from({length:6},(_,i)=>new THREE.MeshStandardMaterial({map:wood,color:new THREE.Color().setHSL(.10,.12,.78+i*.026),bumpMap:wood,bumpScale:.024,roughness:.86}));
 make('warmWood',0xffffff,.79,0,{map:warm,bumpMap:warm,bumpScale:.017});
 make('darkWood',0xe2dbcb,.92,0,{map:dark,bumpMap:dark,bumpScale:.035});
 make('wetWood',0xa6b3a4,.51,0,{map:wet,bumpMap:wet,bumpScale:.023});
 make('teal',0xffffff,.64,0,{map:teal,bumpMap:teal,bumpScale:.016});
 make('cream',0xf4edcf,.77,0,{map:cream,bumpMap:cream,bumpScale:.022});
 make('red',0xf3dec3,.78,0,{map:red,bumpMap:red,bumpScale:.014});
 make('trim',0xd3cbb0,.77);make('iron',0x3f4843,.65,.48);make('steel',0x8b958d,.37,.73);make('rust',0x73503a,.95,.12);make('brass',0x9e8551,.38,.66);
 const stone=stoneTexture([116,123,113],18),sand=stoneTexture([149,147,119],10),mud=stoneTexture([88,106,95],21),roof=stoneTexture([71,90,89],35);
 make('stone',0xd6d5c5,.87,0,{map:stone,bumpMap:stone,bumpScale:.07});
 mats.stones=Array.from({length:5},(_,i)=>new THREE.MeshStandardMaterial({map:stone,color:new THREE.Color().setHSL(.115,.06,.60+i*.066),bumpMap:stone,bumpScale:.07,roughness:.8}));
 make('wetStone',0x697e73,.38,0,{map:stone,bumpMap:stone,bumpScale:.045});
 make('sand',0xe0d9bd,.94,0,{map:sand,bumpMap:sand,bumpScale:.037});
 make('mud',0xb8c1a0,.53,0,{map:mud,bumpMap:mud,bumpScale:.025});
 make('roof',0xb4c9c3,.86,.08,{map:roof,bumpMap:roof,bumpScale:.032});
 mats.roofs=Array.from({length:4},(_,i)=>{const m=mats.roof.clone();m.color.setHSL(.44,.075,.61+i*.027);return m;});
 make('roofEdge',0x455c58,.63,.22);
 make('rope',0xe7d5ac,.94,0,{map:ropeTexture(),bumpScale:.004});mats.rope.bumpMap=mats.rope.map;
 make('tarp',0xa6baad,.95,0,{map:fabricTexture('#708d81',11),side:THREE.DoubleSide,bumpScale:.015});mats.tarp.bumpMap=mats.tarp.map;
 make('sack',0xe4dac1,.98,0,{map:fabricTexture('#a89772',12)});
 make('grass',0x7c8960,1,0,{side:THREE.DoubleSide});make('grassDry',0xabb088,1,0,{side:THREE.DoubleSide});make('weed',0x556b45,.65,0,{side:THREE.DoubleSide});
 make('shell',0xd8d3b7,.72);make('barnacle',0xb8b99f,.9);make('paper',0xd9d0ae,.95);make('black',0x26312e,.9);make('copper',0x915f43,.49,.5);
 make('glass',0x94c4c0,.15,.15,{transparent:true,opacity:.18,depthWrite:false,side:THREE.DoubleSide});
 make('lamp',0xffdab1,.35,0,{emissive:0xffc77d,emissiveIntensity:1.1});
 const contactCanvas=canvas(128,128),cc=contactCanvas.getContext('2d'),gradient=cc.createRadialGradient(64,64,8,64,64,63);
 gradient.addColorStop(0,'rgba(20,29,25,.48)');gradient.addColorStop(.50,'rgba(20,29,25,.31)');gradient.addColorStop(1,'rgba(20,29,25,0)');cc.fillStyle=gradient;cc.fillRect(0,0,128,128);
 mats.contact=new THREE.MeshBasicMaterial({map:texture(contactCanvas),transparent:true,depthWrite:false,opacity:.75,polygonOffset:true,polygonOffsetFactor:-1});
 return mats;
}

export function labelMaterial(text,{width=1024,height=256,bg='#1c4140',fg='#d8d5b9',font='bold 70px Georgia',sub='',weather=true}={}){
 const c=canvas(width,height),ctx=c.getContext('2d');ctx.fillStyle=bg;ctx.fillRect(0,0,width,height);ctx.strokeStyle=fg;ctx.globalAlpha=.44;ctx.strokeRect(13,13,width-26,height-26);ctx.globalAlpha=1;ctx.textAlign='center';ctx.textBaseline='middle';ctx.font=font;ctx.fillStyle=fg;ctx.fillText(text,width/2,height*(sub ? .42 : .51));
 if(sub){ctx.font='24px Arial';ctx.fillText(sub,width/2,height*.77);}
 if(weather){const r=seeded(101);for(let i=0;i<700;i++){ctx.fillStyle=i%2?'rgba(198,182,137,.08)':'rgba(30,41,32,.08)';ctx.fillRect(r()*width,r()*height,r()*30+2,r()*2+.3);}}
 return new THREE.MeshStandardMaterial({map:texture(c),roughness:.85,side:THREE.DoubleSide});
}

export function createWater(){
 const mat=new THREE.ShaderMaterial({uniforms:{time:{value:0},sunDir:{value:new THREE.Vector3(-.62,.52,.58).normalize()},fogColor:{value:new THREE.Color(0xbdcec9)}},vertexShader:`
 varying vec3 vWorld;
 void main(){vec4 p=modelMatrix*vec4(position,1.);vWorld=p.xyz;gl_Position=projectionMatrix*viewMatrix*p;}
 `,fragmentShader:`
 precision highp float;
 uniform float time;uniform vec3 sunDir;uniform vec3 fogColor;varying vec3 vWorld;
 void main(){
  vec2 p=vWorld.xz;float t=time*.32;
  float a=sin(p.x*2.8+p.y*1.85+t),b=sin(p.x*4.7-p.y*2.7-t*.63),c=sin(p.x*12.1+p.y*8.2+t*.8);
  vec3 n=normalize(vec3(a*.022+b*.013+c*.005,1.,a*.017-b*.009+c*.003));
  vec3 view=normalize(cameraPosition-vWorld);float fres=pow(1.-max(dot(n,view),0.),4.);
  float bed=1.12-smoothstep(-3.,8.,p.y)*.90-max(0.,p.y-8.)*.062+sin(p.x*.7+p.y*.31)*.024+sin(p.x*1.4-p.y*.4)*.013;
  float depth=smoothstep(.025,1.55,.065-bed);
  vec3 shallow=vec3(.26,.42,.34),deep=vec3(.085,.235,.27),sky=vec3(.68,.79,.78);
  vec3 color=mix(mix(shallow,deep,depth),sky,.23+fres*.62);
  float sandRidge=sin(p.y*9.1+p.x*.73+sin(p.x*1.9)*.27)*.5+.5;
  float speck=fract(sin(dot(floor(p*33.),vec2(12.9898,78.233)))*43758.5453);
  color+=(sandRidge*.018-speck*.012)*(1.-depth)*(1.-fres);
  float ripple=sin(p.x*1.55-p.y*2.5+t)*sin(p.x*3.1+p.y*2.5+t*.7);
  color+=ripple*.007;
  float spec=pow(max(dot(reflect(-sunDir,n),view),0.),250.);
  color+=vec3(1.,.91,.67)*spec*.65;
  float sparkle=pow(max(0.,sin(p.x*21.+p.y*9.+t*2.)*sin(p.y*18.-p.x*7.-t)),14.)*pow(fres,.6)*.06;
  color+=vec3(sparkle);
  float dist=length(cameraPosition-vWorld);color=mix(color,fogColor,1.-exp(-dist*.007));
  gl_FragColor=vec4(color,1.);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
 }
 `});
 const mesh=new THREE.Mesh(new THREE.PlaneGeometry(400,400),mat);mesh.rotation.x=-Math.PI/2;mesh.position.set(0,.065,95);mesh.name='Single-pass fixed-tide water';return {mesh,mat};
}

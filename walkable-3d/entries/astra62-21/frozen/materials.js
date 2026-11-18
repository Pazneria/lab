"use strict";
const STONE=mat(0),DARKSTONE=mat(1),OAK=mat(2),WALNUT=mat(3),ENDGRAIN=mat(4);
const IRON=mat(5,0xa8aaa5),BLACKIRON=mat(5,0x756f68),BRASS=mat(6),LINEN=mat(7),COVER=mat(8);
const STRAW=mat(9),PLASTER=mat(10),LEATHER=mat(11),CERAMIC=mat(12),PAPER=mat(13),FLAG=mat(14),CINDER=mat(15);
const SOLID=16,PORTRAIT=17,CHART=18,LEDGER=19,BALM=20,NAMEPLATE=21,DIAL=22,BANNER=23,WASHLABEL=24,TEALABEL=25,VISTA=26,LITTLEVISTA=27,PAGE=28,ROSTERTAG=29;
const CELADON=mat(12,0x81a39a),MADDER=mat(7,0x965341),GREEN=mat(7,0x5d8277);
const CORD=mat(7,0xb29c75),TAR=mat(3,0x9b9a96),PALESTONE=mat(0,0xfff3dd);
const MOOD={cream:"#d9c9a5",ink:"#34483f",gold:"#baa16c",red:"#944f3f"};
function vpath(ctx,svg,fill,stroke=null,width=1){
 const path=new Path2D(svg);if(fill){ctx.fillStyle=fill;ctx.fill(path);}if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=width;ctx.lineJoin="round";ctx.lineCap="round";ctx.stroke(path);}
}
function textAt(c,s,x,y,size,color,align="center",style=""){
 c.font=style+" "+size+"px Georgia, serif";c.textAlign=align;c.fillStyle=color;c.fillText(s,x,y);
}
function paperGround(c,w,h,base){
 c.fillStyle=base;c.fillRect(0,0,w,h);
 let seed=902;function v(){seed=seed*16807%2147483647;return seed/2147483647;}
 for(let i=0;i<2300;i++){c.fillStyle=v()>.45?"rgba(83,62,34,.07)":"rgba(255,241,201,.13)";const s=.2+v()*1.5;c.fillRect(v()*w,v()*h,s*1.8,s);}
}
function dragonMark(c,x,y,scale,ink,detail){
 c.save();c.translate(x,y);c.scale(scale,scale);
 // A gently curled wyvern: long neck, folded flight membrane, and returning tail.
 vpath(c,"M 26 80 Q 6 74 9 57 Q 12 42 28 44 Q 18 44 18 55 Q 18 63 31 65 Q 23 52 36 43 Q 46 36 56 41 L 41 18 Q 52 20 64 29 L 60 6 Q 75 18 83 34 L 87 15 Q 98 38 93 46 Q 105 46 110 38 Q 115 31 113 21 L 110 15 L 117 18 L 122 8 L 123 18 L 133 13 L 131 22 L 142 29 L 139 34 L 127 35 Q 128 54 116 65 Q 107 75 89 76 L 97 82 L 113 81 L 108 85 L 88 87 L 76 78 Q 60 85 45 78 Q 35 77 29 72 Q 35 82 53 85 Q 36 89 26 80 Z",ink);
 vpath(c,"M 47 47 Q 58 45 69 56 L 64 32 M 70 56 L 83 38 M 71 58 Q 82 54 91 49 M 38 59 Q 43 67 57 66 M 106 60 Q 117 50 119 37 M 123 25 L 129 27",null,detail,1.7);
 c.fillStyle=detail;c.beginPath();c.arc(128,25,1.2,0,TAU);c.fill();c.restore();
}
function landscape(c,w,h,small=false){
 const grad=c.createLinearGradient(0,0,0,h);grad.addColorStop(0,small?"#78969d":"#738084");grad.addColorStop(.46,small?"#c8c9ad":"#d5b197");grad.addColorStop(.76,"#efd4a3");grad.addColorStop(1,"#b7b29a");c.fillStyle=grad;c.fillRect(0,0,w,h);
 c.fillStyle=small?"#e8d6a5":"#f6dfac";c.beginPath();c.arc(w*.70,h*.46,small?17:22,0,TAU);c.fill();
 const ridge=(base,amp,phase,color)=>{
  c.beginPath();c.moveTo(-2,h+1);
  for(let i=-2;i<=w+2;i+=3){const n=i/w;const wave=Math.abs(Math.sin(n*7.8+phase))*.52+Math.abs(Math.sin(n*13.3+phase*2))*.35+Math.sin(n*34+phase)*.12+Math.sin(i*.31)*.018;c.lineTo(i,h*(base-amp*wave));}
  c.lineTo(w+2,h+1);c.fillStyle=color;c.fill();
 };
 ridge(.76,.28,1.7,"#a99f91");ridge(.84,.24,.1,"#92928a");ridge(.92,.17,2.3,"#727e77");ridge(.99,.12,1.9,"#53675f");
 for(let i=0;i<67;i++){const xx=i*(w/63)-5,ht=h*(.030+.083*(.5+.5*Math.sin(i*5.2))+.08*Math.abs(xx/w-.5));const yy=h*(.95+.035*Math.sin(i*.12));c.fillStyle=i%3?"#52665d":"#495f55";c.beginPath();c.moveTo(xx,yy-ht);c.lineTo(xx+ht*.18,yy);c.lineTo(xx-ht*.18,yy);c.fill();}
}
function artLayer(id){
 const cv=document.createElement("canvas");cv.width=cv.height=384;const c=cv.getContext("2d",{alpha:false});
 let w=384,h=384;if(id===PORTRAIT){w=420;h=310;}if(id===CHART){w=290;h=395;}if(id===LEDGER||id===PAGE){w=238;h=320;}
 if([BALM,NAMEPLATE,WASHLABEL,TEALABEL,ROSTERTAG].includes(id)){w=440;h=id===NAMEPLATE?142:165;}
 if(id===BANNER){w=230;h=460;}if(id===VISTA||id===LITTLEVISTA){w=630;h=370;}
 c.scale(384/w,384/h);const ink=MOOD.ink,gold=MOOD.gold,red=MOOD.red;
 if(id===SOLID){c.fillStyle="white";c.fillRect(0,0,w,h);return cv;}
 if(id===VISTA||id===LITTLEVISTA){landscape(c,w,h,id===LITTLEVISTA);return cv;}
 paperGround(c,w,h,"#deceaa");
 if(id===PORTRAIT){
   c.save();c.beginPath();c.rect(14,15,w-28,h-51);c.clip();c.translate(14,15);landscape(c,w-28,h-51,true);
   vpath(c,"M 0 219 Q 94 159 180 201 Q 274 153 395 188 L 398 270 L 0 270 Z","#697764");
   dragonMark(c,102,113,1.48,"#354d43","#9fa689");
   for(let i=0;i<110;i++){const px=12+(i*39)%370,py=220+(i*23)%41;vpath(c,"M "+px+" "+py+" l -3 -8 m 3 8 l 2 -12",null,"#a5a481",.85);}
   c.restore();c.strokeStyle="#75694e";c.lineWidth=2;c.strokeRect(13,14,w-26,h-49);
   textAt(c,"Mallow, first summer",w/2,h-12,17,"#524b3b","center","italic");
 }else if(id===CHART){
   c.strokeStyle="#8d7951";c.strokeRect(10,10,w-20,h-20);c.strokeRect(14,14,w-28,h-28);
   textAt(c,"THE KEEPER’S BOOK",w/2,44,14,ink);textAt(c,"Wing & scale care",w/2,74,24,ink,"center","italic");
   vpath(c,"M 43 234 Q 68 207 86 183 L 140 101 L 158 118 L 179 92 Q 188 147 235 183 Q 212 178 200 201 Q 174 181 162 215 Q 136 188 108 235 Q 92 219 76 241 L 46 248 Z", "#b3ad8f",ink,2.5);
   vpath(c,"M 49 238 L 92 195 L 140 106 M 94 193 Q 134 150 178 96 M 96 198 Q 147 157 214 173 M 96 202 Q 151 177 195 195 M 98 208 Q 137 190 160 210",null,ink,1.5);
   for(let i=0;i<18;i++){vpath(c,"M "+(110+i*4)+" "+(179-i*2.6)+" q 14 -4 25 -7",null,"#807f67",.9);}
   vpath(c,"M 158 114 L 203 88 h 28 M 134 199 l 55 27 h 45 M 65 230 l -17 -67 h -16",null,red,1);
   textAt(c,"I",235,91,13,red);textAt(c,"II",240,229,13,red);textAt(c,"III",28,165,13,red);
   c.fillStyle=ink;c.fillRect(35,263,w-70,1);
   textAt(c,"Wash with warm water",w/2,292,17,ink);textAt(c,"Work balm from root to tip",w/2,317,16,ink);textAt(c,"Leave the new scales clear",w/2,341,16,ink);
   textAt(c,"Ashwick  ·  West roost",w/2,370,12,red,"center","italic");
 }else if(id===LEDGER||id===PAGE){
   textAt(c,id===LEDGER?"Mallow":"Evening rounds",22,39,29,ink,"left","italic");
   c.fillStyle="#9c7050";c.fillRect(22,51,w-44,1);
   const lines=id===LEDGER?["First frost","Both wings sound.","She held still for","the left hinge today.","","Warm mash, two pails.","Fresh straw before dusk.","","— E."]:["Brush, soft side first.","Check the heel straps.","Leave the gate unbarred","while the hearth draws.","","No resin behind the ear.","She hates the smell."];
   lines.forEach((t,i)=>textAt(c,t,22,77+i*22,15,"#5b5543","left","italic"));
   if(id===LEDGER)dragonMark(c,138,235,.49,"#76694c","#d7c4a1");
 }else if(id===DIAL){
   c.fillStyle="#ab9e75";c.fillRect(0,0,w,h);c.translate(w/2,h/2);c.fillStyle="#e4d4ab";c.beginPath();c.arc(0,0,176,0,TAU);c.fill();
   for(let i=0;i<43;i++){const a=(145+i*250/42)*Math.PI/180,r=i%7?146:128;vpath(c,"M "+Math.cos(a)*r+" "+Math.sin(a)*r+" L "+Math.cos(a)*158+" "+Math.sin(a)*158,null,i>34?red:ink,i%7?3:6);}
   textAt(c,"ROOST",0,-43,30,ink);textAt(c,"WARMTH",0,-11,20,ink);textAt(c,"ASHWICK",0,91,17,red);
   vpath(c,"M -11 10 L 64 -99 L 5 16 Z",red);c.fillStyle=ink;c.beginPath();c.arc(0,0,13,0,TAU);c.fill();
 }else if(id===BANNER){
   paperGround(c,w,h,"#3f6154");c.fillStyle="#b49d68";c.fillRect(15,0,3,h);c.fillRect(21,0,1,h);c.fillRect(w-18,0,3,h);c.fillRect(w-23,0,1,h);
   c.strokeStyle=gold;c.lineWidth=2;c.beginPath();c.ellipse(w/2,175,80,87,0,0,TAU);c.stroke();dragonMark(c,37,123,1.10,"#c9b383","#506957");
   vpath(c,"M 60 297 Q 116 336 170 297 M 70 303 l -2 -13 10 15 M 83 310 l 1 -15 8 17 M 98 315 l 3 -13 6 14 M 155 305 l 5 -14 3 9 M 139 313 l 5 -16 4 10",null,gold,2);
   textAt(c,"ASHWICK",w/2,367,22,"#cbb98f");
   for(let i=0;i<320;i++){c.fillStyle="rgba(224,208,157,.04)";c.fillRect(i*1.31,0,.65,h);}
 }else{
   const dark=id===NAMEPLATE||id===WASHLABEL;
   if(dark)paperGround(c,w,h,"#3b5148");
   const edge=dark?"#cab88b":ink;c.strokeStyle=edge;c.lineWidth=2;c.strokeRect(9,8,w-18,h-16);
   if(id===NAMEPLATE){textAt(c,"W E S T   R O O S T",w/2,40,17,"#c4b389");textAt(c,"MALLOW",w/2,102,54,"#e4d2a4");}
   else if(id===BALM){textAt(c,"ASHWICK   ✦   STORES",w/2,48,21,red);textAt(c,"Scale balm",w/2,109,52,ink,"center","italic");textAt(c,"PINE RESIN  &  BEESWAX",w/2,141,16,ink);}
   else if(id===WASHLABEL){textAt(c,"WARM WASH",w/2,83,43,"#e1d3b2");textAt(c,"Brushes  ·  cloths  ·  soap",w/2,124,21,"#d0c09b","center","italic");}
   else if(id===TEALABEL){textAt(c,"Keeper’s tea",w/2,89,44,ink,"center","italic");textAt(c,"NETTLE  &  MINT",w/2,128,20,red);}
   else {textAt(c,"MALLOW",w/2,82,46,ink);textAt(c,"WINTER HARNESS  ·  III",w/2,124,20,red);}
 }
 return cv;
}
async function materialAtlas(gl){
 const image=new Image();const ready=new Promise((resolve,reject)=>{image.onload=resolve;image.onerror=()=>reject(Error("The local material atlas could not be decoded."));});image.src=TILE_SOURCE;await ready;
 const n=384,layers=30,levels=1+Math.floor(Math.log2(n));
 const tex=gl.createTexture();gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D_ARRAY,tex);
 gl.texStorage3D(gl.TEXTURE_2D_ARRAY,levels,gl.RGBA8,n,n,layers);gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,false);
 const cv=document.createElement("canvas");cv.width=cv.height=n;const c=cv.getContext("2d",{willReadFrequently:true});
 for(let k=0;k<16;k++){
  c.clearRect(0,0,n,n);c.drawImage(image,(k%4)*n,Math.floor(k/4)*n,n,n,0,0,n,n);
  const data=c.getImageData(0,0,n,n).data;
  gl.texSubImage3D(gl.TEXTURE_2D_ARRAY,0,0,0,k,n,n,1,gl.RGBA,gl.UNSIGNED_BYTE,data);
 }
 for(let k=16;k<layers;k++)gl.texSubImage3D(gl.TEXTURE_2D_ARRAY,0,0,0,k,n,n,1,gl.RGBA,gl.UNSIGNED_BYTE,artLayer(k));
 gl.generateMipmap(gl.TEXTURE_2D_ARRAY);
 gl.texParameteri(gl.TEXTURE_2D_ARRAY,gl.TEXTURE_MIN_FILTER,gl.LINEAR_MIPMAP_LINEAR);gl.texParameteri(gl.TEXTURE_2D_ARRAY,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
 const an=gl.getExtension("EXT_texture_filter_anisotropic");if(an)gl.texParameterf(gl.TEXTURE_2D_ARRAY,an.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(4,gl.getParameter(an.MAX_TEXTURE_MAX_ANISOTROPY_EXT)));
 return tex;
}


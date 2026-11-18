'use strict';
function inkAtlas(gl,entries){
 const sheet=document.createElement('canvas');sheet.width=sheet.height=2048;
 const ctx=sheet.getContext('2d'),vertices=[];
 let left=6,top=6,row=0,seed=1234;
 const noise=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296};
 function fit(text,x,y,w,h,font,track=0){
  ctx.save();ctx.translate(x,y);ctx.font=font;ctx.textBaseline='middle';ctx.textAlign='left';
  const chars=Array.from(text),width=chars.reduce((n,c)=>n+ctx.measureText(c).width,0)+track*(chars.length-1);
  const bb=ctx.measureText('Hgj'),height=bb.actualBoundingBoxAscent+bb.actualBoundingBoxDescent||100;
  ctx.scale(w/width,h/height);let u=-width/2;
  for(const c of chars){ctx.fillText(c,u,0);u+=ctx.measureText(c).width+track}ctx.restore()
 }
 function path(points,close=false){
  ctx.beginPath();ctx.moveTo(...points[0]);for(let i=1;i<points.length;i++)ctx.lineTo(...points[i]);if(close)ctx.closePath();ctx.stroke()
 }
 function linesPlan(w,h,small){
  ctx.save();ctx.scale(w/640,h/350);ctx.strokeStyle='#607668';ctx.fillStyle='#52675e';ctx.lineWidth=1.65;
  ctx.strokeRect(7,6,626,338);ctx.lineWidth=.65;ctx.strokeRect(12,11,616,328);
  if(!small){
   fit('WREN',91,40,121,29,'bold 100px Georgia',6);
   fit('HULL LINES',496,37,192,20,'100px Georgia',5);
   fit('TERN INLET BOATWORKS',107,64,152,10,'bold 100px Arial',7);
  }
  ctx.lineWidth=1.0;ctx.setLineDash([6,4]);path([[38,161],[602,161]]);path([[37,250],[601,250]]);ctx.setLineDash([]);
  // Sheer and buttock lines in elevation above half-breadths in plan.
  ctx.lineWidth=2.35;ctx.beginPath();ctx.moveTo(45,116);ctx.bezierCurveTo(195,136,424,138,589,93);ctx.bezierCurveTo(563,118,559,147,510,153);ctx.bezierCurveTo(385,174,166,172,64,149);ctx.closePath();ctx.stroke();
  ctx.lineWidth=1.0;
  for(let j=1;j<5;j++){
   ctx.beginPath();ctx.moveTo(47+j*3,118+j*5);ctx.bezierCurveTo(194,136+j*8,437,141+j*5,586-j*7,95+j*8);ctx.stroke()
  }
  for(let j=0;j<11;j++){
   const x=66+j*48;ctx.globalAlpha=.65;path([[x,93],[x,176]]);ctx.globalAlpha=1;
   ctx.font='10px monospace';ctx.fillText(String(j),x-2,187)
  }
  for(const side of [-1,1])for(let j=0;j<4;j++){
   const a=(1-j*.19)*side;
   ctx.beginPath();ctx.moveTo(48,250+a*14);ctx.bezierCurveTo(182,250+a*57,421,250+a*59,586,250);ctx.stroke()
  }
  for(let j=0;j<12;j++){const x=57+j*46,half=15+32*Math.sin((j+.1)/12*PI);path([[x,250-half],[x,250+half]])}
  path([[17,310],[622,310]]);fit('16 FT.   CLINKER DINGHY',153,326,217,11,'100px Arial',5);fit('LWL   4.3 M',443,326,102,10,'100px Arial',5);fit('SHT. 01',577,326,58,10,'100px Arial',5);ctx.restore()
 }
 function inletChart(w,h){
  ctx.save();ctx.scale(w/440,h/480);ctx.lineWidth=1;ctx.strokeStyle='#77857a';ctx.fillStyle='#536b64';
  ctx.strokeRect(4,5,432,469);fit('TERN INLET',220,41,317,42,'100px Georgia',6);
  fit('SOUNDINGS  IN  METRES',221,76,200,12,'bold 100px Arial',6);
  ctx.save();ctx.beginPath();ctx.rect(17,94,405,315);ctx.clip();
  ctx.fillStyle='#b7c2b0';ctx.fillRect(17,94,405,315);
  ctx.strokeStyle='#7f9c8c';ctx.lineWidth=1.35;
  for(let j=0;j<7;j++){
   ctx.beginPath();ctx.moveTo(-6,124+j*13);ctx.bezierCurveTo(60,105+j*12,98,205+j*12,149,202+j*9);ctx.bezierCurveTo(182,216+j*11,195,161+j*10,221,163+j*11);ctx.bezierCurveTo(287,153+j*11,296,215+j*12,440,189+j*15);ctx.stroke();
   if(!j){ctx.lineTo(443,87);ctx.lineTo(-8,87);ctx.closePath();ctx.fillStyle='#cbc2a4';ctx.fill();ctx.stroke()}
  }
  ctx.strokeStyle='#7c8f83';ctx.lineWidth=.60;
  for(let x=17;x<436;x+=63)path([[x,94],[x,411]]);
  for(let y=94;y<412;y+=53)path([[17,y],[422,y]]);
  ctx.fillStyle='#687f73';ctx.font='italic 12px Georgia';
  for(let i=0;i<32;i++){const x=27+noise()*379,y=231+noise()*160;ctx.fillText((.8+noise()*8.1).toFixed(1),x,y)}
  ctx.fillStyle='#a46850';ctx.fillRect(172,185,14,7);ctx.fillRect(177,191,3,25);
  ctx.font='italic 12px Georgia';ctx.fillStyle='#5c695b';ctx.fillText('Boatworks',188,183);
  path([[364,150],[364,110],[357,128],[364,120],[370,128],[364,110]]);
  ctx.font='bold 11px Georgia';ctx.fillText('N',360,105);ctx.restore();
  fit('LOW WATER DATUM',108,430,158,14,'100px Arial',4);
  fit('T.I.B.  /  HYDROGRAPHIC SKETCH',220,457,277,10,'100px Arial',5);
  ctx.restore()
 }
 for(const s of entries){
  const w=Math.min(1000,Math.max(s.style.art?470:180,Math.round(480*s.w)));
  const h=Math.min(560,Math.max(33,Math.round(w*s.h/s.w)));
  if(left+w+6>2048){left=6;top+=row+12;row=0}if(top+h+4>2048)throw Error('Too many painted panels');
  const x=left,y=top;left+=w+12;row=Math.max(row,h);ctx.save();ctx.translate(x,y);
  ctx.beginPath();ctx.rect(0,0,w,h);ctx.clip();
  ctx.fillStyle=s.style.ink||'#d8d1b4';
  if(s.style.art==='lines'||s.style.art==='pattern')linesPlan(w,h,s.style.art==='pattern');
  else if(s.style.art==='chart')inletChart(w,h);
  else fit(s.text,w*.5,h*.48,w*.97,h*.92,(s.style.bold?'bold ':'')+'100px '+(s.style.family||'Arial'),(s.style.tracking||.025)*100);
  if(!s.style.art){
   ctx.globalCompositeOperation='destination-out';
   for(let i=0;i<w*h*.0022;i++){ctx.globalAlpha=.24+noise()*.51;ctx.fillRect(noise()*w,noise()*h,.5+noise()*3.8,.45+noise()*1.3)}
  }
  ctx.restore();
  const a=vmul(s.axis,s.w*.5),b=vmul(s.up,s.h*.5),n=norm(cross(s.axis,s.up));
  const ps=[vadd(vsub(s.center,a),b),vadd(vadd(s.center,a),b),vsub(vadd(s.center,a),b),vsub(vsub(s.center,a),b)];
  const uvs=[[x,y],[x+w,y],[x+w,y+h],[x,y+h]];
  for(const i of [0,1,2,0,2,3])vertices.push(...ps[i],uvs[i][0]/2048,uvs[i][1]/2048,...n)
 }
 const tex=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,tex);gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,false);
 gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,sheet);
 gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR_MIPMAP_LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
 gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);gl.generateMipmap(gl.TEXTURE_2D);
 return {tex,data:new Float32Array(vertices)}
}

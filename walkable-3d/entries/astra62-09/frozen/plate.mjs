// Original section drawing printed on the tool crib's inspection sheet.
export function drawSection(ctx,x,y,w,h){
  ctx.save();ctx.translate(x,y);ctx.scale(w/640,h/406);
  ctx.fillStyle='#d4d1bb';ctx.fillRect(0,0,640,406);
  ctx.strokeStyle='#606e66';ctx.lineWidth=1.4;ctx.strokeRect(12,12,616,382);
  ctx.fillStyle='#3e5252';ctx.textAlign='left';ctx.textBaseline='alphabetic';
  const text=(t,x,y,size,weight=600)=>{ctx.font=weight+' '+size+'px Bahnschrift, Arial, sans-serif';ctx.fillText(t,x,y)};
  const line=(points,color='#405553',width=2,close=false,fill=false)=>{
    ctx.beginPath();points.forEach(([px,py],i)=>i?ctx.lineTo(px,py):ctx.moveTo(px,py));if(close)ctx.closePath();
    ctx.strokeStyle=color;ctx.lineWidth=width;if(fill){ctx.fillStyle=fill;ctx.fill()}ctx.stroke();
  };
  text('KESTREL   /   PROPULSION SERVICE',26,37,12);
  text('HC–04   Shaft assembly',25,74,31,650);
  line([[25,89],[615,89]],'#78847b',1);
  // Dimension witness lines and sectioned bearing housings.
  ctx.setLineDash([10,4,2,4]);line([[35,221],[594,221]],'#7e8276',1.2);ctx.setLineDash([]);
  line([[49,210],[71,210],[77,201],[118,201],[129,197],[174,197],[188,187],[423,187],[442,193],[491,193],[501,200],[543,200],[556,208],[583,208],[583,232],[555,232],[542,239],[501,239],[492,247],[441,247],[423,254],[188,254],[174,245],[129,245],[118,240],[77,240],[70,231],[49,231]],'#485f5a',2.5,true,'#bdc1ae');
  for(const x of [88,98,108,144,154,163,458,470,483,509,518,527]){
    line([[x,200],[x-9,239]],'#76857a',1);
  }
  for(let j=0;j<6;j++){
    const x=197+j*39,r=43+j*3;
    line([[x,190],[x+7,220-r],[x+18,220-r-12],[x+23,220-r-11],[x+17,189]],'#405956',1.7,true,'#c1c4b2');
    line([[x+2,252],[x+9,220+r],[x+18,220+r+12],[x+23,220+r+11],[x+17,252]],'#405956',1.7,true,'#c1c4b2');
    line([[x-5,186],[x-5,256]],'#697a71',1);
  }
  for(const side of [-1,1]){
    const sy=n=>221+side*n;
    line([[118,sy(29)],[126,sy(51)],[145,sy(62)],[170,sy(62)],[180,sy(72)],[440,sy(80)],[452,sy(85)],[475,sy(85)],[486,sy(62)],[504,sy(56)],[517,sy(32)]],'#3e5652',2.4);
    line([[122,sy(32)],[132,sy(52)],[172,sy(55)],[182,sy(65)],[441,sy(73)],[453,sy(79)],[472,sy(79)],[482,sy(58)],[503,sy(51)]],'#738075',1.3);
  }
  line([[177,129],[177,112],[444,112],[444,134]],'#78827a',1);
  for(const x of [177,444])line([[x-3,117],[x+3,107]],'#718178',1.3);
  ctx.fillStyle='#506660';text('CL  1240',278,108,10);
  line([[47,306],[126,306],[151,280]],'#7a7562',1.2);text('01  /  DRIVE',47,323,10);
  line([[556,151],[584,140],[611,140]],'#7a7562',1.2);text('02',588,134,10);
  line([[12,345],[628,345]],'#687970',1.4);line([[421,345],[421,394]],'#687970',1.4);line([[542,345],[542,394]],'#687970',1.4);
  ctx.fillStyle='#475c57';text('SECTION  A—A',26,370,16);text('HELIUM  RECIRCULATOR',26,385,9);
  text('DWG  C09.42',433,373,12);text('REV   B',553,373,12);
  ctx.restore();
}


'use strict';
const Lettering = (() => {
  function makeCanvas(w,h){const c=document.createElement('canvas');c.width=w;c.height=h;return c;}
  function label(entry){
    const c=makeCanvas(384,160),ctx=c.getContext('2d'),h=200,w=Math.max(90,Math.min(2100,entry.aspect*h));
    ctx.scale(c.width/w,c.height/h);const {theme,lines}=entry;
    const palette={
      green:['#465e51','#e7e1c7'],blue:['#526873','#e4dcc1'],bone:['#d8cdb2','#4f574b'],
      paper:['#ded3b8','#5b6051'],wood:['#ae9671','#575443'],brass:['#af9566','#464a3c'],drawing:['#d5c8a9','#5c6254']
    };
    const [ground,ink]=palette[theme]||palette.bone;
    const line=(x0,y0,x1,y1,stroke,width)=>{ctx.strokeStyle=stroke;ctx.lineWidth=width;ctx.beginPath();ctx.moveTo(x0,y0);ctx.lineTo(x1,y1);ctx.stroke();};
    const text=(s,x,y,size,font='Arial',bold='600',align='center',max=w*.88)=>{
      let f=size;ctx.font=bold+' '+f+'px '+font;const tw=ctx.measureText(s).width;
      if(tw>max){f*=max/tw;ctx.font=bold+' '+f+'px '+font;}
      ctx.fillStyle=ink;ctx.textAlign=align;ctx.textBaseline='middle';ctx.fillText(s,x,y);
    };
    if(theme==='dial'){
      const x=w/2,y=h/2,r=Math.min(w,h)*.486;
      ctx.fillStyle='#dfdbc6';ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();
      ctx.strokeStyle='#888a77';ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(x,y,r*.96,0,Math.PI*2);ctx.stroke();
      for(let i=0;i<=40;i++){
        const a=(139+i*262/40)*Math.PI/180,cs=Math.cos(a),sn=Math.sin(a),major=i%5===0;
        line(x+cs*r*(major?.76:.84),y+sn*r*(major?.76:.84),x+cs*r*.91,y+sn*r*.91,'#53594d',major?2.8:1.4);
        if(major){ctx.fillStyle='#51584b';ctx.font='600 12px Arial';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(lines[0]==='°C'?String(i*4):String(i/5),x+cs*r*.64,y+sn*r*.64);}
      }
      text(lines[1],x,y+r*.32,11,'Georgia','normal');text(lines[0],x,y-r*.23,14,'Arial','normal');
      line(x-r*.09,y-r*.07,x-r*.58,y+r*.43,'#994d37',3.6);ctx.fillStyle='#4b5145';ctx.beginPath();ctx.arc(x,y,r*.062,0,7);ctx.fill();return c;
    }
    ctx.fillStyle=ground;ctx.fillRect(0,0,w,h);
    let seed=623+lines[0].length*139;
    const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
    for(let i=0;i<750;i++){ctx.fillStyle=i%2?'rgba(255,246,218,.12)':'rgba(68,59,43,.10)';ctx.fillRect(random()*w,random()*h,.6+random()*3,.45+random()*1.4);}
    if(theme==='drawing'){
      for(let xx=7;xx<w;xx+=12)line(xx,14,xx,h-14,'#b4b59d',.4);
      for(let yy=16;yy<h-8;yy+=12)line(6,yy,w-6,yy,'#b5b69f',.4);
      text(lines[0],w*.50,19,11,'Arial','600');
      const cx=w*.48,cy=h*.73,sh=h*.49,sw=w*.23;
      const profile=lines[0]==='SAGGAR'?[[.70,0],[.79,.12],[.90,.72],[.86,.91],[.82,1]]:[[.43,0],[.44,.05],[.72,.17],[1,.42],[.89,.61],[.46,.78],[.28,.86],[.31,1]];
      for(let side of [-1,1]){
        ctx.strokeStyle='#535e53';ctx.lineWidth=1.3;ctx.beginPath();for(let i=0;i<profile.length;i++){const [r,t]=profile[i];if(!i)ctx.moveTo(cx+side*r*sw,cy-t*sh);else ctx.lineTo(cx+side*r*sw,cy-t*sh);}ctx.stroke();
      }
      for(let side of [0,profile.length-1]){const [r,t]=profile[side];ctx.beginPath();ctx.ellipse(cx,cy-t*sh,r*sw,sw*.07,0,0,7);ctx.stroke();}
      ctx.setLineDash([2,2]);line(cx,cy+7,cx,cy-sh-7,'#747869',.7);ctx.setLineDash([]);
      line(w*.86,cy,w*.86,cy-sh,'#797c6b',.8);line(w*.82,cy,w*.9,cy,'#797c6b',.8);line(w*.82,cy-sh,w*.90,cy-sh,'#797c6b',.8);
      text(lines[1]||'STUDY',w*.48,h*.90,10,'monospace','normal');return c;
    }
    if(theme==='paper'){
      const xx=w*.095;text(lines[0],xx,h*.192,Math.min(h*.18,25),'Georgia','bold','left',w*.81);
      line(xx,h*.325,w*.91,h*.325,'#a07456',1.5);
      const rows=lines.length-1;for(let j=1;j<lines.length;j++){
        const yy=h*(.38+((j-.35)/Math.max(1,rows))*.47);
        text(lines[j],xx,yy,Math.min(21,70/Math.max(2,rows)),'monospace','normal','left',w*.81);line(xx,yy+12,w*.91,yy+12,'#a9ae95',.7);
      }return c;
    }
    if(theme==='green'||theme==='brass'||(theme==='bone'&&entry.aspect<6)){
      ctx.strokeStyle=theme==='green'?'#aeb69a':'#998f75';ctx.lineWidth=1.8;ctx.strokeRect(5,6,w-10,h-12);
      if(theme==='green'){ctx.lineWidth=.75;ctx.strokeRect(10,11,w-20,h-22);}
    }
    if(lines.length===1){
      text(lines[0],w/2,h*.515,h*(theme==='brass'?.59:.48),theme==='brass'?'Georgia':'Arial',theme==='brass'?'bold':'600');
    }else{
      text(lines[0],w/2,h*(lines.length===2?.40:.32),h*(lines.length===2?.40:.32),theme==='green'?'Georgia':'Arial','600');
      for(let j=1;j<lines.length;j++)text(lines[j],w/2,h*(.62+.21*(j-1)),h*.145,'monospace','normal');
    }
    return c;
  }
  function brushwork(){
    const c=makeCanvas(1024,512),s=c.getContext('2d');s.clearRect(0,0,c.width,c.height);
    // Cobalt grasses are hand-painted between broken wheel-turned bands.
    const blue='rgba(44,76,83,.93)',wash='rgba(56,96,99,.68)';
    function stroke(pts,col,width){s.strokeStyle=col;s.lineWidth=width;s.lineJoin='round';s.lineCap='round';s.beginPath();s.moveTo(...pts[0]);for(let k=1;k<pts.length;k++)s.lineTo(...pts[k]);s.stroke();}
    for(const [y,w,col] of [[76,4,blue],[89,2,wash],[374,6,blue],[385,2,wash],[402,4,blue]]){
      const pts=[];for(let i=0;i<=128;i++){const x=i*8;pts.push([x,y+1.8*Math.sin(x/1024*Math.PI*6+.7)+.8*Math.sin(x/1024*Math.PI*22)]);}stroke(pts,col,w);
    }
    function leaf(x,y,dx,dy,width){
      const len=Math.hypot(dx,dy),nx=-dy/len*width,ny=dx/len*width;
      s.fillStyle=wash;s.beginPath();s.moveTo(x,y);s.bezierCurveTo(x+dx*.33+nx,y+dy*.33+ny,x+dx*.70+nx*.6,y+dy*.70+ny*.6,x+dx,y+dy);
      s.bezierCurveTo(x+dx*.73-nx*.4,y+dy*.73-ny*.4,x+dx*.18-nx*.58,y+dy*.18-ny*.58,x,y);s.fill();
      stroke([[x,y],[x+dx*.46,y+dy*.46],[x+dx*.91,y+dy*.91]],blue,1.6);
    }
    for(let j=-1;j<7;j++){
      const x=j*171+28,y=360,tilt=Math.sin(j*1.95)*9;
      s.beginPath();s.moveTo(x,y);s.quadraticCurveTo(x+58,y-58,x+54+tilt,y-170);s.strokeStyle=blue;s.lineWidth=3.8;s.stroke();
      for(let i=0;i<6;i++){
        const u=(i+.7)/7,px=x+(70*u-18*u*u),py=y-162*u;
        leaf(px,py,-26-23*(1-u),-16-30*u,6.9);leaf(px+2,py-11,24+17*(1-u),-28-14*u,6.8);
      }
      leaf(x+53,y-165,tilt+9,-33,5);leaf(x+10,y-13,-26,-49,8);
      s.fillStyle=wash;for(let k=0;k<3;k++){s.beginPath();s.ellipse(x+93+k*7,290-k*12,3.1,5.8,-.45,0,7);s.fill();}
    }
    return c;
  }
  return {label,brushwork};
})();

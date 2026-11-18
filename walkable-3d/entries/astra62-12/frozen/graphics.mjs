// Original 2D illustrations and printed finishes for the offline atlas build.

export const TAU=Math.PI*2;
export function rng(seed=20261117) {return ()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296}}
export function rect(c,x,y,w,h,k){c.fillStyle=k;c.fillRect(x,y,w,h)}
export function poly(c,p,k){c.beginPath();p.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.closePath();c.fillStyle=k;c.fill()}
export function line(c,p,k,w=1,close=false){c.beginPath();p.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));if(close)c.closePath();c.lineWidth=w;c.strokeStyle=k;c.stroke()}
export function ellipse(c,x,y,rx,ry,k){if(rx<=0||ry<=0)return;c.beginPath();c.ellipse(x,y,rx,ry,0,0,TAU);c.fillStyle=k;c.fill()}
export function arc(c,x,y,r,a,b,k,w=1){c.beginPath();c.arc(x,y,r,a,b);c.lineWidth=w;c.strokeStyle=k;c.stroke()}
export function ring(c,x,y,r,k,w=1){arc(c,x,y,r,0,TAU,k,w)}
export function round(c,x,y,w,h,r,k){c.beginPath();c.roundRect(x,y,w,h,r);c.fillStyle=k;c.fill()}
export function grad(c,x,y,x2,y2,stops){const g=c.createLinearGradient(x,y,x2,y2);for(const [p,col] of stops)g.addColorStop(p,col);return g}
export function text(c,s,x,y,size,k,opts={}){
  c.save();c.font=(opts.italic?"italic ":"")+(opts.weight||"bold")+" "+size+"px "+(opts.face||"Impact, 'Arial Narrow', sans-serif");
  c.textAlign=opts.align||"left";c.textBaseline=opts.baseline||"alphabetic";c.fillStyle=k;
  if(opts.stroke){c.lineWidth=opts.stroke[1];c.strokeStyle=opts.stroke[0];c.lineJoin="round";if(opts.max!==undefined)c.strokeText(s,x,y,opts.max);else c.strokeText(s,x,y)}
  if(opts.max!==undefined)c.fillText(s,x,y,opts.max);else c.fillText(s,x,y);c.restore();
}
export const mono={face:"Consolas, monospace",weight:"bold"};
export const sans={face:"Arial, sans-serif",weight:"bold"};
export const serif={face:"Georgia, serif",weight:"bold"};
export function star(c,x,y,r,k){poly(c,[[x,y-r],[x+r*.2,y-r*.2],[x+r,y],[x+r*.2,y+r*.2],[x,y+r],[x-r*.2,y+r*.2],[x-r,y],[x-r*.2,y-r*.2]],k)}
export function grain(c,w,h,count,seed,alpha=.12){
  const rand=rng(seed);c.save();
  for(let i=0;i<count;i++){c.globalAlpha=rand()*alpha;c.fillStyle=i%3?"#110f1c":"#ffeaca";c.fillRect(rand()*w,rand()*h,.5+rand()*1.7,.5+rand()*1.5)}
  c.restore();
}
export function labelPanel(c,w,h,bg,fg,heading,sub){
  rect(c,0,0,w,h,bg);c.strokeStyle=fg;c.lineWidth=3;c.strokeRect(5,5,w-10,h-10);
  text(c,heading,w/2,h*.57,h*.49,fg,{align:"center",max:w*.89});
  text(c,sub,w/2,h*.83,h*.135,fg,{...mono,align:"center",max:w*.85});
}
const EDGE=4,SIZE=2048;
export class Atlas{
  constructor(makeCanvas){this.makeCanvas=makeCanvas;this.pages=[];this.regions={}}
  add(name,w,h,draw){
    if(this.regions[name])throw Error("Duplicate print "+name);
    let page=this.pages.at(-1);
    if(!page||page.y+Math.max(page.row,h+2*EDGE)>SIZE || (page.x+w+2*EDGE>SIZE && page.y+page.row+h+2*EDGE>SIZE)){
      const canvas=this.makeCanvas(SIZE,SIZE);
      page={canvas,ctx:canvas.getContext("2d",{alpha:false}),x:0,y:0,row:0};this.pages.push(page);
    }
    if(page.x+w+2*EDGE>SIZE){page.x=0;page.y+=page.row;page.row=0}
    const x=page.x+EDGE,y=page.y+EDGE;
    // A separate image isolates illustration clipping and keeps four-pixel gutters at tile edges.
    const tile=this.makeCanvas(w,h);
    const ctx=tile.getContext("2d",{alpha:false});ctx.save();draw(ctx,w,h);ctx.restore();
    const g=page.ctx;g.drawImage(tile,x,y);
    g.drawImage(tile,0,0,w,1,x,y-EDGE,w,EDGE);g.drawImage(tile,0,h-1,w,1,x,y+h,w,EDGE);
    g.drawImage(tile,0,0,1,h,x-EDGE,y,EDGE,h);g.drawImage(tile,w-1,0,1,h,x+w,y,EDGE,h);
    for(const sx of [0,1])for(const sy of [0,1])g.drawImage(tile,sx*(w-1),sy*(h-1),1,1,x+(sx?w:-EDGE),y+(sy?h:-EDGE),EDGE,EDGE);
    page.x+=w+2*EDGE;page.row=Math.max(page.row,h+2*EDGE);
    return this.regions[name]={page:this.pages.length-1,rect:[(x+.5)/SIZE,1-(y+h-.5)/SIZE,(w-1)/SIZE,(h-1)/SIZE]};
  }

}
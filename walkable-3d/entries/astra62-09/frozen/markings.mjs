import {T,seeded} from './geometry.mjs';
import {drawSection} from './plate.mjs';
const size=2048,pad=6;
export function buildMarkings(labels,anisotropy){
  const group=new T.Group(),density=448,rng=seeded(349109);
  let canvas,ctx,p=[],uv=[],index=[],left=pad,top=pad,row=0;
  function begin(){
    canvas=document.createElement('canvas');canvas.width=canvas.height=size;
    ctx=canvas.getContext('2d',{alpha:true});p=[];uv=[];index=[];left=pad;top=pad;row=0;
  }
  function finish(){
    if(!index.length)return;
    const map=new T.CanvasTexture(canvas);map.colorSpace=T.SRGBColorSpace;map.anisotropy=anisotropy;
    const mat=new T.MeshStandardMaterial({map,alphaTest:.26,alphaToCoverage:true,roughness:.74,metalness:.12,polygonOffset:true,polygonOffsetFactor:-1,polygonOffsetUnits:-1});
    const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(p,3));
    geo.setAttribute('uv',new T.Float32BufferAttribute(uv,2));geo.setIndex(index);geo.computeVertexNormals();geo.computeBoundingSphere();
    const mesh=new T.Mesh(geo,mat);mesh.name='Printed legends';mesh.receiveShadow=true;group.add(mesh);
  }
  begin();
  // Shelf-pack the tall legends first to keep every physical label sharp in one atlas.
  for(const item of [...labels].sort((a,b)=>b.h-a.h)){
    const width=Math.min(size-2*pad,Math.max(48,Math.ceil(item.w*density)));
    const height=Math.min(580,Math.max(25,Math.ceil(item.h*density)));
    if(left+width+pad>size){left=pad;top+=row+2*pad;row=0}
    if(top+height+pad>size){finish();begin()}
    const x=left,y=top;left+=width+pad*2;row=Math.max(row,height);
    const lines=item.lines,rowH=height/lines.length;
    ctx.save();ctx.beginPath();ctx.rect(x,y,width,height);ctx.clip();
    ctx.textAlign='center';ctx.textBaseline='alphabetic';ctx.fillStyle=item.options.ink||'#e1e1d3';
    if(item.options.diagram)drawSection(ctx,x,y,width,height);
    else lines.forEach((line,i)=>{
      const weight=item.options.weights?.[i]||700;
      const family='"Bahnschrift", "Arial Narrow", Arial, sans-serif';
      ctx.font=weight+' 100px '+family;
      const metrics=ctx.measureText(line);
      const cap=Math.max(55,(metrics.actualBoundingBoxAscent||68)+(metrics.actualBoundingBoxDescent||8));
      const em=Math.min((width-3)*100/Math.max(1,metrics.width),rowH*.89*100/cap);
      ctx.font=weight+' '+em.toFixed(2)+'px '+family;
      const measured=ctx.measureText(line);
      ctx.textBaseline='alphabetic';
      const ascent=measured.actualBoundingBoxAscent||em*.7,descent=measured.actualBoundingBoxDescent||0;
      ctx.fillText(line,x+width/2,y+(i+.5)*rowH+(ascent-descent)*.5);
    });
    if(item.options.distress){
      ctx.globalCompositeOperation='destination-out';
      for(let j=0;j<width*height*.0032;j++){
        ctx.fillStyle='rgba(0,0,0,'+(.15+rng()*.65)+')';
        ctx.fillRect(x+rng()*width,y+rng()*height,1+Math.pow(rng(),3)*6,.5+rng()*1.7);
      }
    }
    ctx.restore();
    const mat=new T.Matrix4().fromArray(item.matrix),base=p.length/3;
    for(const [xx,yy] of [[-.5,-.5],[.5,-.5],[.5,.5],[-.5,.5]]){
      const v=new T.Vector3(xx*item.w,yy*item.h,0).applyMatrix4(mat);p.push(v.x,v.y,v.z);
    }
    uv.push(x/size,1-(y+height)/size,(x+width)/size,1-(y+height)/size,(x+width)/size,1-y/size,x/size,1-y/size);
    index.push(base,base+1,base+2,base,base+2,base+3);
  }
  finish();return group;
}
export function contactShadows(contacts){
  const n=64,data=new Uint8Array(n*n*4),p=[],uv=[],col=[],idx=[];
  for(let y=0;y<n;y++)for(let x=0;x<n;x++){
    const u=(x+.5)/n*2-1,v=(y+.5)/n*2-1;
    const d=Math.pow(Math.pow(Math.abs(u),3.5)+Math.pow(Math.abs(v),3.5),1/3.5);
    const t=Math.min(1,Math.max(0,(1-d)/.49)),i=(x+y*n)*4;
    data[i]=data[i+1]=data[i+2]=255;data[i+3]=Math.round(255*t*t*(3-2*t));
  }
  for(const a of contacts){
    const base=p.length/3;
    for(const [u,v] of [[0,0],[0,1],[1,1],[1,0]]){
      p.push(a.x+(u-.5)*a.w,a.y,a.z+(v-.5)*a.d);uv.push(u,v);col.push(1,1,1,a.alpha);
    }
    idx.push(base,base+1,base+2,base,base+2,base+3);
  }
  const tex=new T.DataTexture(data,n,n);tex.magFilter=T.LinearFilter;tex.minFilter=T.LinearFilter;tex.needsUpdate=true;
  const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(p,3));g.setAttribute('uv',new T.Float32BufferAttribute(uv,2));g.setAttribute('color',new T.Float32BufferAttribute(col,4));g.setIndex(idx);
  return new T.Mesh(g,new T.MeshBasicMaterial({map:tex,color:0x1c2426,transparent:true,opacity:.56,vertexColors:true,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-1}));
}


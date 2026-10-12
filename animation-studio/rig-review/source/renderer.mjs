/** A small opaque vertex-color renderer. Animation/deformation stays in core. */
import {clamp} from './core.mjs';
const VS = 'attribute vec3 p,n,c;uniform float yaw,pitch,span,aspect,pointSize;uniform vec3 center;varying vec3 color;void main(){float a=cos(yaw),b=sin(yaw),u=cos(pitch),v=sin(pitch);vec3 t=p-center;t=vec3(a*t.x+b*t.z,t.y,-b*t.x+a*t.z);t=vec3(t.x,u*t.y-v*t.z,v*t.y+u*t.z);gl_Position=vec4(t.x*2.0/(span*aspect),t.y*2.0/span,-t.z*.15,1.0);gl_PointSize=pointSize;float light=.53+.57*max(0.0,dot(normalize(n),normalize(vec3(-.5,.9,1.2))));color=c*light;}';
const FS = 'precision mediump float;varying vec3 color;uniform bool unlit;void main(){vec3 c=max(vec3(0.0),color);if(unlit)c=color;gl_FragColor=vec4(mix(c*12.92,1.055*pow(c,vec3(1.0/2.4))-.055,step(vec3(.0031308),c)),1.0);}';
export class StudioRenderer {
 constructor(canvas){this.canvas=canvas;this.gl=canvas.getContext('webgl',{antialias:true,alpha:false,preserveDrawingBuffer:false,powerPreference:'low-power'});
 if(!this.gl)throw Error('WebGL is unavailable. The studio needs WebGL for viewing; the original assets and CPU evidence remain available.');
 const g=this.gl,shader=(type,source)=>{const s=g.createShader(type);g.shaderSource(s,source);g.compileShader(s);if(!g.getShaderParameter(s,g.COMPILE_STATUS))throw Error(g.getShaderInfoLog(s));return s;};
 this.program=g.createProgram();const vs=shader(g.VERTEX_SHADER,VS),fs=shader(g.FRAGMENT_SHADER,FS);g.attachShader(this.program,vs);g.attachShader(this.program,fs);g.linkProgram(this.program);
 if(!g.getProgramParameter(this.program,g.LINK_STATUS))throw Error(g.getProgramInfoLog(this.program));g.deleteShader(vs);g.deleteShader(fs);g.useProgram(this.program);
 this.buffer=g.createBuffer();this.meshSlots=[];this.attributeIds=[];this.uploads=0;this.uintIndices=!!g.getExtension('OES_element_index_uint');this.auxData=new Float32Array(0);g.bindBuffer(g.ARRAY_BUFFER,this.buffer);
 for(const [name,offset] of [['p',0],['n',12],['c',24]]){const id=g.getAttribLocation(this.program,name);this.attributeIds.push([id,offset]);g.enableVertexAttribArray(id);g.vertexAttribPointer(id,3,g.FLOAT,false,36,offset);}
 this.u={};for(const n of ['yaw','pitch','span','aspect','center','unlit','pointSize'])this.u[n]=g.getUniformLocation(this.program,n);
 g.enable(g.DEPTH_TEST);g.enable(g.SCISSOR_TEST);this.frames=0;
 }
 resize(){const c=this.canvas,d=Math.min(window.devicePixelRatio||1,1.5),scale=Math.min(d,1600/Math.max(c.clientWidth,1),1200/Math.max(c.clientHeight,1));const w=Math.max(1,Math.round(c.clientWidth*scale)),h=Math.max(1,Math.round(c.clientHeight*scale));if(c.width!==w||c.height!==h){c.width=w;c.height=h;}return {w,h};}
 draw({views,camera,grid=true,skeleton=false,foot=true,wire=false,xray=true}){
 const g=this.gl,{w,h}=this.resize();g.useProgram(this.program);g.bindBuffer(g.ARRAY_BUFFER,this.buffer);
 g.uniform1f(this.u.yaw,camera.yaw*Math.PI/180);g.uniform1f(this.u.pitch,camera.pitch*Math.PI/180);g.uniform1f(this.u.span,camera.span);
 g.uniform3fv(this.u.center,camera.center);
 const panes=views.length;let slotIndex=0;
 for(let i=0;i<panes;i++){
 const x=Math.round(w*i/panes),width=Math.round(w*(i+1)/panes)-x;g.viewport(x,0,width,h);g.scissor(x,0,width,h);g.uniform1f(this.u.aspect,width/h);
 g.clearColor(.055,.067,.075,1);g.clear(g.COLOR_BUFFER_BIT|g.DEPTH_BUFFER_BIT);
 if(grid)this.lines(gridLines(),[.105,.13,.145]);
 const view=views[i];g.uniform1i(this.u.unlit,0);g.enable(g.POLYGON_OFFSET_FILL);g.polygonOffset(1,1);
 for(const geometry of view.geometry){
 this.mesh(geometry,slotIndex++);
 if(wire){const edges=[];for(let k=0;k<geometry.indices.length;k+=3){const v=geometry.indices.slice(k,k+3);for(const [a,b] of [[v[0],v[1]],[v[1],v[2]],[v[2],v[0]]])edges.push(...geometry.positions.subarray(a*3,a*3+3),...geometry.positions.subarray(b*3,b*3+3));}this.lines(edges,[.055,.07,.08]);g.uniform1i(this.u.unlit,0);}
 }
 g.disable(g.POLYGON_OFFSET_FILL);g.disable(g.CULL_FACE);
 if(skeleton&&view.bones)this.lines(view.bones,[.1,.42,.65],true);
 if(skeleton&&view.overlay){
  for(const [kind,color] of [['joint',[.08,.63,.95]],['locator',[.52,.56,.62]],['socket',[1,.59,.08]]])this.lines(view.overlay.groups[kind],color,xray);
  for(const [kind,color,size] of [['joint',[.08,.63,.95],7],['locator',[.52,.56,.62],6],['socket',[1,.59,.08],8],['selected',[1,.12,.2],11]])this.points(view.overlay.dots[kind],color,size,xray);
 }
 if(view.flaggedLines)this.lines(view.flaggedLines,[1,.02,.12],true);
 if(view.soleMarkers)for(const marker of view.soleMarkers){this.lines(marker.lines,marker.color,true);this.points(marker.points,marker.color,8,true);}
 if(foot&&view.feet)for(const [side,sample] of Object.entries(view.feet)){const contact=view.contacts?.[side],p=sample.point,col=contact?[.2,.7,.48]:sample.clearance<-.004?[.85,.16,.12]:[.35,.44,.51];this.lines(contactRing(p),col,true);}
 }
 while(this.meshSlots.length>slotIndex){const slot=this.meshSlots.pop();g.deleteBuffer(slot.buffer);g.deleteBuffer(slot.indexBuffer);}
 this.frames++;
 return g.getError();
 }
 bindAttributes(buffer){const g=this.gl;g.bindBuffer(g.ARRAY_BUFFER,buffer);for(const [id,offset] of this.attributeIds)g.vertexAttribPointer(id,3,g.FLOAT,false,36,offset);}
 mesh(geometry,index){const g=this.gl;let slot=this.meshSlots[index];if(!slot)slot=this.meshSlots[index]={buffer:g.createBuffer(),indexBuffer:g.createBuffer()};this.bindAttributes(slot.buffer);
  if(slot.indices!==geometry.indices){let max=0;for(const i of geometry.indices)max=Math.max(max,i);slot.expanded=max>65535&&!this.uintIndices;slot.type=max>65535?g.UNSIGNED_INT:g.UNSIGNED_SHORT;slot.indices=geometry.indices;slot.positions=null;
   if(!slot.expanded){g.bindBuffer(g.ELEMENT_ARRAY_BUFFER,slot.indexBuffer);g.bufferData(g.ELEMENT_ARRAY_BUFFER,max>65535?new Uint32Array(geometry.indices):new Uint16Array(geometry.indices),g.STATIC_DRAW);}
  }
  if(slot.positions!==geometry.positions||slot.normals!==geometry.normals||slot.colors!==geometry.colors){const count=slot.expanded?geometry.indices.length:geometry.positions.length/3,length=count*9;if(slot.data?.length!==length)slot.data=new Float32Array(length);const data=slot.data;
   for(let i=0;i<count;i++){const v=(slot.expanded?geometry.indices[i]:i)*3,o=i*9;data[o]=geometry.positions[v];data[o+1]=geometry.positions[v+1];data[o+2]=geometry.positions[v+2];data[o+3]=geometry.normals[v];data[o+4]=geometry.normals[v+1];data[o+5]=geometry.normals[v+2];data[o+6]=geometry.colors[v];data[o+7]=geometry.colors[v+1];data[o+8]=geometry.colors[v+2];}
   g.bufferData(g.ARRAY_BUFFER,data,g.DYNAMIC_DRAW);slot.positions=geometry.positions;slot.normals=geometry.normals;slot.colors=geometry.colors;this.uploads++;
  }
  if(geometry.doubleSided)g.disable(g.CULL_FACE);else g.enable(g.CULL_FACE);
  if(slot.expanded)g.drawArrays(g.TRIANGLES,0,geometry.indices.length);else{g.bindBuffer(g.ELEMENT_ARRAY_BUFFER,slot.indexBuffer);g.drawElements(g.TRIANGLES,geometry.indices.length,slot.type,0);}
 }
 auxiliary(points,color,mode,size,overlay){const g=this.gl;if(!points.length)return;if(overlay)g.disable(g.DEPTH_TEST);const length=points.length*3;if(this.auxData.length<length)this.auxData=new Float32Array(length);const data=this.auxData.subarray(0,length);
  for(let i=0;i<points.length/3;i++){const p=i*3,o=i*9;data[o]=points[p];data[o+1]=points[p+1];data[o+2]=points[p+2];data[o+3]=0;data[o+4]=1;data[o+5]=0;data[o+6]=color[0];data[o+7]=color[1];data[o+8]=color[2];}
  this.bindAttributes(this.buffer);g.uniform1f(this.u.pointSize,size);g.uniform1i(this.u.unlit,1);g.bufferData(g.ARRAY_BUFFER,data,g.DYNAMIC_DRAW);g.drawArrays(mode,0,points.length/3);g.uniform1i(this.u.unlit,0);if(overlay)g.enable(g.DEPTH_TEST);
 }
 lines(points,color,overlay=false){this.auxiliary(points,color,this.gl.LINES,1,overlay);}
 points(points,color,size=7,overlay=false){this.auxiliary(points,color,this.gl.POINTS,size,overlay);}
 destroy(){const g=this.gl;for(const slot of this.meshSlots){g.deleteBuffer(slot.buffer);g.deleteBuffer(slot.indexBuffer);}this.meshSlots=[];g.deleteBuffer(this.buffer);g.deleteProgram(this.program);}

}
function gridLines(){const p=[];for(let i=-10;i<=10;i++){const s=i*.2;p.push(s,0,-2,s,0,2,-2,0,s,2,0,s);}return p;}
function contactRing(p){const v=[];for(let i=0;i<32;i++){const a=i*Math.PI/16,b=(i+1)*Math.PI/16;v.push(p[0]+.08*Math.cos(a),.003,p[2]+.08*Math.sin(a),p[0]+.08*Math.cos(b),.003,p[2]+.08*Math.sin(b));}v.push(p[0],0,p[2],...p,p[0]-.018,p[1],p[2],p[0]+.018,p[1],p[2]);return v;}


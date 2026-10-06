import * as THREE from 'three';
import {random} from './materials.js';

export function exterior(scene,b,m){
  const rng=random(17);
  // The land drops away to the east; the library sits on a small stone terrace.
  const geo=new THREE.PlaneGeometry(210,210,84,84);geo.rotateX(-Math.PI/2);const p=geo.attributes.position,colors=[];
  const tint=new THREE.Color();
  for(let i=0;i<p.count;i++){
    const x=p.getX(i),z=p.getZ(i),distance=Math.hypot(x*.9,z);
    let y=-.38-Math.max(0,x-12)*.12+Math.sin(x*.048+z*.039)*2.3+Math.sin(z*.081)*1.7;
    if(Math.abs(x)<15&&Math.abs(z)<14)y=-.38;
    else y=THREE.MathUtils.lerp(-.38,y,Math.min(1,Math.max(0,(distance-15)/11)));
    p.setY(i,y);const c=.81+rng()*.19;tint.setRGB(.29*c,.35*c,.20*c);colors.push(tint.r,tint.g,tint.b);
  }geo.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));geo.computeVertexNormals();const land=new THREE.Mesh(geo,new THREE.MeshStandardMaterial({vertexColors:true,roughness:1}));land.receiveShadow=true;scene.add(land);
  b.register('hill',new THREE.SphereGeometry(1,40,24));
  for(const [x,y,z,sx,sy,sz,col]of [[65,-7,-45,51,20,40,0x737b5e],[80,-12,30,57,24,53,0x687658],[45,-9,68,48,17,40,0x747d59],[-44,-7,65,42,18,50,0x6b7754],[-63,-8,-40,56,24,48,0x7b8063],[110,-5,-95,74,25,50,0x8a8f78]])b.add('hill','hill',[x,y,z],[sx,sy,sz],[],col,null,false);
  // Terracotta and flagstone immediately outside the windows give scale to the view.
  for(let x=8.5;x<14.7;x+=.82)for(let z=-8.5;z<9;z+=.81){if(x<11.8&&z>1&&z<7)continue;b.box('stone',[x,-.21,z],[.79,.10,.78],[],new THREE.Color().setScalar(.81+rng()*.25),null,false);}
  for(let z=-8.8;z<9;z+=.72){b.box('stone',[14.8,-.33,z],[.46,.54,.69],[],new THREE.Color().setScalar(.68+rng()*.24),null,false);b.box('stone',[14.8,-.03,z],[.58,.1,.72],[],null,null,false);}
  // Distant orchard trees are shared instances with individual clustered crowns.
  for(let i=0;i<85;i++){
    const a=rng()*Math.PI*2,dist=21+rng()*63,x=Math.cos(a)*dist,z=Math.sin(a)*dist;
    if(x>10&&x<20&&Math.abs(z)<12)continue;
    const y=-.38-Math.max(0,x-12)*.12+Math.sin(x*.048+z*.039)*2.3+Math.sin(z*.081)*1.7,ht=2.7+rng()*3.2;
    b.add('cyl','darkWood',[x,y+ht*.42,z],[.11+rng()*.08,ht*.84,.11],[],null,null,false);
    for(let k=0;k<5;k++){const aa=k*2.4,rad=ht*.3;b.add('sphere','leaf',[x+Math.cos(aa)*rad*.4,y+ht*.74+(rng()-.5)*.7,z+Math.sin(aa)*rad*.4],[rad*(.85+rng()*.4),rad*(1+rng()*.45),rad],[0,rng(),0],new THREE.Color().setRGB(.65+rng()*.35,.7+rng()*.25,.52+rng()*.27),null,false);}
  }
  // Sky gradient and a broad warm sun, with no network texture dependency.
  const sky=new THREE.Mesh(new THREE.SphereGeometry(160,32,16),new THREE.ShaderMaterial({side:THREE.BackSide,depthWrite:false,uniforms:{top:{value:new THREE.Color(0xa6b8b7)},bottom:{value:new THREE.Color(0xd9c8a5)},sunDir:{value:new THREE.Vector3(18,12,-3).normalize()}},vertexShader:'varying vec3 vDir; void main(){vDir=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',fragmentShader:`
    varying vec3 vDir;uniform vec3 top;uniform vec3 bottom;uniform vec3 sunDir;
    void main(){vec3 d=normalize(vDir);float h=smoothstep(-.03,.65,d.y);vec3 col=mix(bottom,top,h);float s=pow(max(dot(d,sunDir),0.),80.);col+=vec3(.22,.16,.08)*s;gl_FragColor=vec4(col,1.);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
    }
  `}));sky.renderOrder=-10;scene.add(sky);
}

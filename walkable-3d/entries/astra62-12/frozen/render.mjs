import * as THREE from "./vendor/three.module.min.js";

export const vertexSource=[
 "attribute vec4 region; attribute vec3 ink; attribute vec3 illumination; attribute vec4 surface;",
 "varying vec3 vP; varying vec3 vN; varying vec2 vUV; varying vec4 vRect; varying vec3 vInk; varying vec3 vLight; varying vec4 vFinish;",
 "void main(){vP=position;vN=normal;vUV=uv;vRect=region;vInk=ink;vLight=illumination*2.;vFinish=surface;vFinish.z*=1.25;gl_Position=projectionMatrix*viewMatrix*vec4(position,1.);}"
].join("\n");
export const fragmentSource=[
 "uniform sampler2D atlas; uniform float haze;",
 "varying vec3 vP; varying vec3 vN; varying vec2 vUV; varying vec4 vRect; varying vec3 vInk; varying vec3 vLight; varying vec4 vFinish;",
 // Analytic reflections of finite lights preserve rounded highlights on glass, ball tops and metal.
 "float discLight(vec3 r,vec3 delta,float radius,float blur){",
 " float id=inversesqrt(dot(delta,delta)+.0001);float a=radius*id+blur;float a2=a*a;",
 " float w=a2/(a2+2.*max(0.,1.-dot(r,delta*id)));return w*w;}",
 "float reflectedWindow(vec3 r,float rough){",
 " if(r.z<.15)return 0.;vec2 hit=vP.xy+r.xy*((4.92-vP.z)/r.z);",
 " float edge=max(abs(hit.x)-2.97,max(hit.y-2.23,.72-hit.y));",
 " float opening=1.-smoothstep(-rough,rough,edge);",
 " float bar=min(abs(abs(hit.x)-1.81),abs(abs(hit.x)-.61));",
 " return opening*(.68+.32*smoothstep(.02,.055+rough,bar));}",
 "void main(){",
 " vec2 uv=vRect.xy+fract(vUV)*vRect.zw;vec3 tex=textureGrad(atlas,uv,dFdx(vUV)*vRect.zw,dFdy(vUV)*vRect.zw).rgb;",
 " vec3 base=tex*vInk;float glow=vFinish.z;",
 " vec3 col=base*(mix(vLight,vec3(1.015),min(1.,glow))+max(0.,glow-1.)*.45);",
 " float gloss=vFinish.x,metal=vFinish.y,glass=vFinish.w;",
 " if(gloss>.29){",
 "  vec3 n=normalize(vN),eye=normalize(cameraPosition-vP),r=reflect(-eye,n);",
 "  float nv=max(0.,dot(n,eye)),f=1.-nv,rim=f*f*f*f,sky=smoothstep(-.18,.84,r.y);",
 "  vec3 env=mix(vec3(.11,.15,.16),vec3(.57,.43,.32),sky);",
 "  float blur=.019+(1.-gloss)*(1.-gloss)*.34;",
 "  float lamp=discLight(r,vec3(-.15,2.54,2.52)-vP,.20,blur)+discLight(r,vec3(-1.40,2.60,-1.62)-vP,.19,blur)+discLight(r,vec3(1.50,2.55,-2.58)-vP,.19,blur);",
 "  float cold=reflectedWindow(r,.025+.46*(1.-gloss));",
 "  col+=env*gloss*(.015+.084*metal+.108*rim)+base*(sky-.34)*metal*.16;",
 "  col+=vec3(.38,.61,.73)*cold*gloss*(.024+.085*metal+glass*(.026+.086*rim));",
 "  col+=vec3(1.,.82,.61)*min(lamp,1.4)*gloss*(.073+.37*metal+.074*glass);",
 "  col+=glass*vec3(.56,.70,.73)*(.019+.080*rim);",
 " }",
 " float fog=1.-exp(-haze*max(0.,distance(cameraPosition,vP)-4.));",
 " gl_FragColor=vec4(mix(col,vec3(.23,.24,.245),min(.13,fog)),1.);}"
].join("\n");

// Storefront glass reflects the pendants across the actual window plane.
export function storefrontGlass(scene){
  const points=[],indices=[];
  const quad=(x1,x2,y1,y2)=>{const i=points.length/3;points.push(x1,y1,4.918,x1,y2,4.918,x2,y2,4.918,x2,y1,4.918);indices.push(i,i+1,i+2,i,i+2,i+3)};
  quad(-2.992,-.636,.720,2.215);quad(.636,2.992,.720,2.215);quad(-.464,.464,.578,2.157);
  const g=new THREE.BufferGeometry();g.setAttribute("position",new THREE.Float32BufferAttribute(points,3));g.setIndex(indices);
  const vs="varying vec3 p;void main(){p=position;gl_Position=projectionMatrix*viewMatrix*vec4(position,1.);}";
  const fs=[
    "varying vec3 p;",
    "float ghost(vec3 ray,vec3 light,float radius){vec3 virtualP=vec3(light.xy,9.836-light.z);vec3 d=virtualP-cameraPosition;float t=dot(d,ray);float dist=length(d-ray*t);return 1.-smoothstep(radius*.68,radius*1.18,dist);}",
    "void main(){vec3 ray=normalize(p-cameraPosition);float f=pow(1.-abs(ray.z),3.);float lamps=ghost(ray,vec3(-.15,2.54,2.52),.173)+ghost(ray,vec3(-1.40,2.60,-1.62),.16)+ghost(ray,vec3(1.50,2.55,-2.58),.16);",
    "gl_FragColor=vec4(mix(vec3(.48,.65,.67),vec3(.92,.79,.60),min(1.,lamps)),.033+.095*f+.18*lamps);}"].join("\n");
  const m=new THREE.Mesh(g,new THREE.ShaderMaterial({vertexShader:vs,fragmentShader:fs,transparent:true,depthWrite:false,side:THREE.FrontSide}));m.name="Storefront glazing";scene.add(m);
}
// Localized halation expands only a few centimetres beyond the luminous shades.
export function lampHalos(scene){
  const p=[],uv=[],tint=[],sizes=[],ii=[];
  const lamps=[[-.15,2.54,2.52,.47,.092],[-1.40,2.60,-1.62,.42,.085],[1.50,2.55,-2.58,.42,.083],[-3.37,2.02,-2.63,.238,.11],[3.37,2.09,-2.726,.238,.11],[0,2.338,-2.615,.150,.055]];
  for(const [x,y,z,r,s] of lamps){
    const start=p.length/3;
    for(const [u,v] of [[-1,-1],[1,-1],[1,1],[-1,1]]){p.push(x,y,z);uv.push(u,v);tint.push(s,s*.73,s*.43);sizes.push(r)}
    ii.push(start,start+1,start+2,start,start+2,start+3);
  }
  const g=new THREE.BufferGeometry();g.setAttribute("position",new THREE.Float32BufferAttribute(p,3));g.setAttribute("uv",new THREE.Float32BufferAttribute(uv,2));g.setAttribute("tint",new THREE.Float32BufferAttribute(tint,3));g.setAttribute("radius",new THREE.Float32BufferAttribute(sizes,1));g.setIndex(ii);
  const vs="attribute vec3 tint;attribute float radius;varying vec2 v;varying vec3 c;void main(){v=uv;c=tint;vec4 q=viewMatrix*vec4(position,1.);q.xy+=uv*radius;gl_Position=projectionMatrix*q;}";
  const fs="varying vec2 v;varying vec3 c;void main(){float a=max(0.,1.-dot(v,v));gl_FragColor=vec4(c*a*a*a,1.);}";
  const mesh=new THREE.Mesh(g,new THREE.ShaderMaterial({vertexShader:vs,fragmentShader:fs,blending:THREE.AdditiveBlending,transparent:true,depthWrite:false}));mesh.name="Opal lamp halos";mesh.frustumCulled=false;scene.add(mesh);
}
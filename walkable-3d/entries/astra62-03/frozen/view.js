import * as THREE from './vendor/three.module.min.js';
import {reflectionSky,chamberReflections,makeMaterials} from './materials.js';
import {fittingMaterials} from './fittings.js';

const SUN=new THREE.Vector3(-.523,.571,-.673).normalize();
function skyTexture(){
  // Small coherent-noise tile for very thin high-altitude haze.
  const N=128,bytes=new Uint8Array(N*N*4);
  const hash=(x,y)=>{let h=Math.imul(x+28,374761393)^Math.imul(y+5,668265263);h=Math.imul(h^h>>>13,1274126177);return ((h^h>>>16)>>>0)/4294967296};
  const value=(u,v,n)=>{
    const i=Math.floor(u*n),j=Math.floor(v*n),x=u*n-i,y=v*n-j,fx=x*x*(3-2*x),fy=y*y*(3-2*y);
    const a=hash(i%n,j%n),b=hash((i+1)%n,j%n),c=hash(i%n,(j+1)%n),d=hash((i+1)%n,(j+1)%n);
    return (a+(b-a)*fx)*(1-fy)+(c+(d-c)*fx)*fy;
  };
  for(let j=0;j<N;j++)for(let i=0;i<N;i++){
    const x=i/N,y=j/N,key=(j*N+i)*4,v=.54*value(x,y,5)+.28*value(x,y,13)+.12*value(x,y,32)+.06*value(x,y,63);
    bytes[key]=bytes[key+1]=bytes[key+2]=Math.round(v*255);bytes[key+3]=255;
  }
  const tex=new THREE.DataTexture(bytes,N,N);tex.wrapS=tex.wrapT=THREE.RepeatWrapping;
  tex.magFilter=THREE.LinearFilter;tex.minFilter=THREE.LinearMipmapLinearFilter;tex.generateMipmaps=true;tex.needsUpdate=true;return tex;
}
function skyDome(){
  const mat=new THREE.ShaderMaterial({
    side:THREE.BackSide,depthWrite:false,uniforms:{sun:{value:SUN},mist:{value:skyTexture()}},
    vertexShader:`varying vec3 direction;
    void main(){direction=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}
    `,
    fragmentShader:`uniform vec3 sun; uniform sampler2D mist;
    varying vec3 direction;
    void main(){
      vec3 d=normalize(direction);float y=max(d.y,0.0);
      float elev=pow(smoothstep(-0.06,.92,d.y),.47);
      float facing=dot(d,sun);float glow=pow(max(0.,facing),7.);
      vec3 horizon=mix(vec3(.84,.66,.52),vec3(1.28,.91,.57),max(0.,facing)*.76);
      vec3 col=mix(horizon,vec3(.125,.33,.51),elev);
      col+=vec3(.23,.13,.042)*glow;
      vec2 skyUV=d.xz/(.30+y);skyUV=mat2(.85,-.53,.53,.85)*skyUV;
      float vapor=texture2D(mist,skyUV*vec2(.17,1.45)+vec2(.08,.2)).r;
      float fine=texture2D(mist,skyUV*vec2(.48,3.67)).r;
      float cloud=smoothstep(.585,.78,vapor+.12*(fine-.5))*smoothstep(.04,.30,y);
      col=mix(col,vec3(.97,.88,.73),cloud*.18);
      float halo=exp(-max(0.,1.-facing)*180.);
      col+=vec3(.68,.39,.14)*halo+vec3(.73,.51,.28)*exp(-max(0.,1.-facing)*2400.);
      float disc=smoothstep(.999974,.999987,facing);
      col=mix(col,vec3(8.,6.2,3.7),disc);
      gl_FragColor=vec4(col,1.);
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }`
  });
  const sphere=new THREE.Mesh(new THREE.SphereGeometry(400,40,20),mat);
  sphere.frustumCulled=false;sphere.renderOrder=100;sphere.name='Late afternoon sky';return sphere;
}
async function unpackScene(scene,materials){
  if(typeof DecompressionStream==='undefined'){
    const [{Workshop},{buildChamber},{buildDome},{buildApproaches},{buildInstrument},{buildFittings},{buildLandscape},{buildWeathering}]=await Promise.all([
      import('./geometry.js'),import('./chamber.js'),import('./dome.js'),import('./approaches.js'),
      import('./instrument.js'),import('./fittings.js'),import('./landscape.js'),import('./weathering.js')
    ]);
    const g=new Workshop(materials);
    for(const build of [buildChamber,buildDome,buildApproaches,buildInstrument,buildFittings,buildLandscape,buildWeathering])build(g);
    g.finish(scene);return;
  }
  const file=await fetch('./observatory.mesh.gz');
  if(!file.ok)throw Error('The observatory mesh could not be loaded.');
  let raw=await file.arrayBuffer();
  if(new Uint8Array(raw,0,2)[0]===31)raw=await new Response(new Blob([raw]).stream().pipeThrough(new DecompressionStream('gzip'))).arrayBuffer();
  const header=new DataView(raw),size=header.getUint32(4,true),base=(8+size+3)&~3;
  const decoder=new TextDecoder();
  if(decoder.decode(new Uint8Array(raw,0,4))!=='MRDN')throw Error('Invalid scene geometry.');
  const spec=JSON.parse(decoder.decode(new Uint8Array(raw,8,size)));
  const view=(Type,[offset,len])=>new Type(raw,base+offset,len);
  const indoorProbe=chamberReflections(),interiorMetals=new Map();
  for(const d of spec.meshes){
    const geo=new THREE.BufferGeometry();
    geo.setAttribute('position',new THREE.BufferAttribute(view(Float32Array,d.p),3));
    geo.setAttribute('normal',new THREE.BufferAttribute(view(Int16Array,d.n),3,true));
    geo.setAttribute('uv',new THREE.BufferAttribute(view(Float32Array,d.u),2));
    geo.setAttribute('color',new THREE.BufferAttribute(view(Float32Array,d.c),3));
    geo.setIndex(new THREE.BufferAttribute(view(d.wide?Uint32Array:Uint16Array,d.i),1));
    geo.boundingBox=new THREE.Box3(new THREE.Vector3(...d.b.slice(0,3)),new THREE.Vector3(...d.b.slice(3)));
    geo.boundingSphere=geo.boundingBox.getBoundingSphere(new THREE.Sphere());
    if(!materials[d.mat])throw Error('Missing material '+d.mat);
    let material=materials[d.mat];
    if(d.name==='instruments and furnishings' && (material.metalness>=.30||d.mat==='lens')){
      if(!interiorMetals.has(d.mat)){
        const local=material.clone();local.envMap=indoorProbe;local.envMapIntensity=d.mat==='lens'?1.35:1.04;
        interiorMetals.set(d.mat,local);
      }
      material=interiorMetals.get(d.mat);
    }
    const mesh=new THREE.Mesh(geo,material);mesh.name=d.name+' / '+d.mat;
    mesh.castShadow=d.cast;mesh.receiveShadow=d.receive;mesh.matrixAutoUpdate=false;
    if(d.mat==='contact')mesh.renderOrder=1;
    if(d.mat==='spall'||d.mat==='soot')mesh.renderOrder=2;
    scene.add(mesh);
  }
}
export async function createView(canvas,progress,initial){
  const renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:false,powerPreference:'high-performance',stencil:false});
  renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.08;
  renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.shadowMap.autoUpdate=false;renderer.shadowMap.needsUpdate=true;
  const scene=new THREE.Scene();scene.background=new THREE.Color(0xd9bea2);scene.fog=new THREE.FogExp2(0xd7bca6,.0072);
  const camera=new THREE.PerspectiveCamera(66,1,.048,478);camera.rotation.order='YXZ';
  camera.position.set(initial.x,initial.eye,initial.z);camera.rotation.set(initial.pitch,initial.yaw,0,'YXZ');
  const sky=skyDome();scene.add(sky);
  const sun=new THREE.DirectionalLight(0xffe2b7,3.55);
  sun.target.position.set(0,.7,0);sun.position.copy(SUN).multiplyScalar(55).add(sun.target.position);sun.castShadow=true;
  // The house and its immediate plateau get the complete fixed shadow atlas.
  const sc=sun.shadow.camera;sc.left=-20;sc.right=20;sc.top=20;sc.bottom=-20;sc.near=20;sc.far=92;sc.updateProjectionMatrix();
  sun.shadow.mapSize.set(2048,2048);sun.shadow.bias=-.00013;sun.shadow.normalBias=.016;
  sun.shadow.autoUpdate=false;sun.shadow.needsUpdate=true;
  scene.add(sun,sun.target,new THREE.HemisphereLight(0xd7e5ed,0xc39571,1.30));
  scene.environment=reflectionSky();scene.environmentIntensity=.68;
  const manager=new THREE.LoadingManager();
  const images=new Promise((resolve,reject)=>{
    manager.onLoad=resolve;manager.onError=url=>reject(Error('Could not load '+url));
    manager.onProgress=(_,done,total)=>progress(.12+.62*done/Math.max(1,total),'Loading surfaces…');
  });
  const materials=makeMaterials(manager,renderer.capabilities.getMaxAnisotropy());fittingMaterials(materials);
  await Promise.all([images,unpackScene(scene,materials)]);
  function resize(){
    const w=Math.max(1,innerWidth),h=Math.max(1,innerHeight);
    const dpr=Math.min(devicePixelRatio||1,1.65,Math.sqrt(2750000/(w*h)));
    renderer.setPixelRatio(dpr);renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();
  }
  const invalidateShadow=()=>{renderer.shadowMap.needsUpdate=true;sun.shadow.needsUpdate=true};
  resize();progress(.86,'Preparing the observatory…');
  if(renderer.compileAsync)await renderer.compileAsync(scene,camera);
  function draw(){
    sky.position.copy(camera.position);renderer.render(scene,camera);
  }
  invalidateShadow();draw();
  return {camera,renderer,scene,resize,draw,invalidateShadow};
}

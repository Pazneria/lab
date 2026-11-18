import * as T from '../vendor/three.module.min.js';

export function createRenderer(canvas){
  const renderer=new T.WebGLRenderer({canvas,antialias:true,alpha:false,stencil:false,powerPreference:'high-performance'});
  renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.04;
  renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;renderer.shadowMap.autoUpdate=false;
  return renderer;
}
function lightField(renderer){
  // An analytical interior panorama supplies continuous reflections in glass and turned metal.
  const w=256,h=128,pixels=new Uint16Array(w*h*4),toHalf=T.DataUtils.toHalfFloat;
  const windowBand=(u,v,hw,hh,feather)=>Math.max(0,Math.min(1,(hw-Math.abs(u))/feather,(hh-Math.abs(v))/feather));
  for(let j=0;j<h;j++){
    const lat=((j+.5)/h-.5)*Math.PI,c=Math.cos(lat),dy=Math.sin(lat);
    for(let i=0;i<w;i++){
      const lon=((i+.5)/w-.5)*2*Math.PI,dx=c*Math.cos(lon),dz=c*Math.sin(lon);
      const tx=5.9/Math.max(.00001,Math.abs(dx)),ty=(dy>0?3.02:1.8)/Math.max(.00001,Math.abs(dy)),tz=7.2/Math.max(.00001,Math.abs(dz));
      const t=Math.min(tx,ty,tz),x=t*dx,y=1.8+t*dy,z=t*dz;
      let r,g,b;
      if(t===ty&&dy>0){
        const strip=windowBand(Math.abs(x)-2.03,((z+8.31)%3.34)-1.67,.33,1.33,.12);
        const deck=windowBand(Math.abs(x)-3.65,0,.22,10,.09);
        r=1.00+strip*7.4-deck*.40;g=1.03+strip*7.2-deck*.40;b=.96+strip*6.7-deck*.37;
      }else if(t===ty){
        const v=.32+.11*Math.abs(x)/5.9;r=v*.96;g=v;b=v*.94;
      }else{
        const u=t===tx?z:x,glass=windowBand(u,y-3.84,t===tx?5.9:5.0,.51,.17);
        const mullion=Math.abs(Math.sin((u+.35)*Math.PI/1.33));
        const light=glass*(.65+.35*Math.min(1,mullion*5.0));
        const lower=Math.min(1,Math.max(0,(y-1.06)*7));
        r=.41+lower*.39+light*2.7;g=.51+lower*.36+light*3.04;b=.48+lower*.32+light*3.22;
        if(t===tx&&Math.abs(z)<3.1&&y<3.34){r*=.67;g*=.71;b*=.73;}
      }
      const k=(j*w+i)*4;pixels[k]=toHalf(r);pixels[k+1]=toHalf(g);pixels[k+2]=toHalf(b);pixels[k+3]=toHalf(1);
    }
  }
  const texture=new T.DataTexture(pixels,w,h,T.RGBAFormat,T.HalfFloatType);
  texture.mapping=T.EquirectangularReflectionMapping;texture.colorSpace=T.LinearSRGBColorSpace;texture.needsUpdate=true;
  const gen=new T.PMREMGenerator(renderer);const target=gen.fromEquirectangular(texture);gen.dispose();texture.dispose();return target;
}
export function illuminate(scene,renderer){
  scene.background=new T.Color('#ccd3c6');scene.environment=lightField(renderer).texture;scene.environmentIntensity=.56;
  const sky=new T.HemisphereLight(0xf1f5e9,0x98a299,1.23);scene.add(sky);
  const key=new T.DirectionalLight(0xfff0d9,2.46);key.position.set(-4.15,8.7,4.35);
  key.target.position.set(0,.8,-.7);scene.add(key,key.target);key.castShadow=true;
  key.shadow.mapSize.set(2048,2048);Object.assign(key.shadow.camera,{left:-11.3,right:11.3,top:9.65,bottom:-9.65,near:.35,far:28});
  key.shadow.camera.updateProjectionMatrix();key.shadow.bias=-.00016;key.shadow.normalBias=.009;
  const fill=new T.DirectionalLight(0xe0eff4,.91);fill.position.set(4.1,3.9,-5.6);scene.add(fill);
  // Short ranges keep task lighting concentrated on each bench and its wall.
  for(const [x,y,z,color,power,reach] of [[-8.0,2.82,.31,0xf4f3e3,3.6,4.25],[8.11,2.79,-.45,0xfff0dc,3.75,4.1],[0,1.812,.024,0xffdeb0,.083,1.02]]){
    const p=new T.PointLight(color,power,reach,2);p.position.set(x,y,z);scene.add(p);
  }
}
async function checked(url){
  const r=await fetch(url);if(!r.ok)throw Error('Could not load '+url+' ('+r.status+')');return r;
}
const base=new URL('../assets/',import.meta.url);
export async function loadScene(scene,renderer){
  const manifest=await (await checked(new URL('scene.json',base))).json();
  if(manifest.format!==1)throw Error('Unsupported scene format');
  const loader=new T.TextureLoader(),maxAniso=renderer.capabilities.getMaxAnisotropy();
  const loaded=await Promise.all([
    Promise.all(manifest.textures.map(async d=>{
      const t=await loader.loadAsync(new URL(d.file,base).href);t.colorSpace=d.isColor?T.SRGBColorSpace:T.NoColorSpace;
      if(d.repeat)t.wrapS=t.wrapT=T.RepeatWrapping;
      t.repeat.set(...d.uvScale);t.offset.set(0,1-d.uvScale[1]);t.anisotropy=Math.min(d.aniso,maxAniso);return t;
    })),
    (async()=>{
      const bytes=await (await checked(new URL('world.bin.gz',base))).arrayBuffer(),head=new Uint8Array(bytes,0,2);
      const data=head[0]===31&&head[1]===139?await new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'))).arrayBuffer():bytes;
      if(data.byteLength!==manifest.stats.rawBytes)throw Error('Incomplete geometry payload');return data;
    })()
  ]);
  const [maps,buffer]=loaded;
  const mats=manifest.materials.map(d=>{
    const opts={vertexColors:true,map:d.map===null?null:maps[d.map],side:d.side,alphaTest:d.alphaTest,opacity:d.opacity,transparent:d.transparent,depthWrite:d.depthWrite,
      toneMapped:d.toneMapped,polygonOffset:d.polygonOffset,polygonOffsetFactor:d.polygonOffsetFactor};
    if(d.basic)return new T.MeshBasicMaterial(opts);
    return new T.MeshStandardMaterial({...opts,roughness:d.roughness,roughnessMap:d.roughnessMap===null?null:maps[d.roughnessMap],metalness:d.metalness,emissive:d.emissive,emissiveIntensity:d.emissiveIntensity,envMapIntensity:d.envMapIntensity});
  });
  const arrays={f32:Float32Array,u32:Uint32Array,u16:Uint16Array,i16:Int16Array};
  function typed(d){return new arrays[d.type](buffer,d.offset,d.length);}
  for(const d of manifest.meshes){
    const geo=new T.BufferGeometry();
    for(const [name,view] of Object.entries(d.attrs))geo.setAttribute(name,new T.BufferAttribute(typed(view),name==='uv'?2:3,view.normalized));
    geo.setIndex(new T.BufferAttribute(typed(d.index),1));geo.computeBoundingSphere();
    const mesh=new T.Mesh(geo,mats[d.material]);mesh.name=d.name;mesh.castShadow=d.cast;mesh.receiveShadow=d.receive;mesh.renderOrder=d.order;
    mesh.matrixAutoUpdate=false;scene.add(mesh);
  }
  renderer.shadowMap.needsUpdate=true;
  return manifest.collision;
}
export function fitViewport(renderer,camera){
  const canvas=renderer.domElement,w=canvas.clientWidth||window.innerWidth,h=canvas.clientHeight||window.innerHeight;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.5,Math.sqrt(2240000/(w*h))));
  renderer.setSize(w,h,false);camera.aspect=w/h;camera.fov=camera.aspect<1.08?67:58;camera.updateProjectionMatrix();
}

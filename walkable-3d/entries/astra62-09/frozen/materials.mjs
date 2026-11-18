import * as T from './vendor/three.module.min.js';

export function makeMaterials(finish,volume,light,traffic){
  const config={
    paint:[.48,.16,.83,.92,.10],deck:[.58,.37,1.27,.78,.16],
    metal:[.37,.75,.64,.41,.82],bright:[.255,.88,.41,.29,1.0],
    rubber:[.85,.005,.42,.08,.05],black:[.78,.15,.30,.07,.13],
    mark:[.68,.08,1.18,.26,.02],peg:[.58,.29,.66,.40,.19],steelglass:[.16,.58,.16,.03,.07]
  };
  const materials={};
  for(const [key,[roughness,metalness,scrape,edge,brush]] of Object.entries(config)){
    const m=new T.MeshStandardMaterial({vertexColors:true,roughness,metalness,envMapIntensity:key==='bright'?1.19:.90});
    const peg=key==='peg';
    m.customProgramCacheKey=()=>peg?'bay-perforated-4':'bay-finish-4';
    m.onBeforeCompile=s=>{
      Object.assign(s.uniforms,{
        yardFinish:{value:finish},yardTraffic:{value:traffic},yardIsMark:{value:key==='mark'?1:0},yardVolume:{value:volume},
        yardOrigin:{value:new T.Vector3(...light.origin)},
        yardExtent:{value:new T.Vector3(...light.dim.map(n=>n*light.spacing))},
        yardStyle:{value:new T.Vector3(scrape,edge,brush)}
      });
      s.vertexShader=s.vertexShader.replace('#include <common>',`#include <common>
        attribute float abrasion;
        varying vec3 yardP;
        varying vec3 yardN;
        varying float yardEdge;`).replace('#include <begin_vertex>',`#include <begin_vertex>
        yardP=position; yardN=normal; yardEdge=abrasion;`);
      s.fragmentShader=s.fragmentShader.replace('#include <common>',`#include <common>
        uniform sampler2D yardFinish, yardTraffic;
        uniform float yardIsMark;
        uniform highp sampler3D yardVolume;
        uniform vec3 yardOrigin, yardExtent, yardStyle;
        varying vec3 yardP;
        varying vec3 yardN;
        varying float yardEdge;`);
      s.fragmentShader=s.fragmentShader.replace('#include <color_fragment>',`#include <color_fragment>
        vec3 yardNorm=normalize(yardN);
        vec3 an=abs(yardNorm);
        vec2 panelUv=an.y>max(an.x,an.z)?yardP.xz:(an.x>an.z?yardP.zy:yardP.xy);
        vec3 pat=texture2D(yardFinish,panelUv*.83).rgb;
        vec3 fine=texture2D(yardFinish,panelUv*3.71+vec2(.13,.63)).rgb;
        vec3 brushed=texture2D(yardFinish,panelUv*vec2(.39,10.5)+vec2(.42,.18)).rgb;
        float grain=(pat.r-.57)*.22+(fine.r-.57)*.16+(brushed.r-.57)*yardStyle.z*.32;
        float scratch=clamp(pat.g*1.26+fine.g*.53,0.,1.);
        float chipped=yardEdge*yardStyle.y*smoothstep(.485,.665,pat.b*.70+fine.b*.30);
        float mottling=(pat.b-.51)*.19;
        float skirt=(1.-smoothstep(.08,.72,yardP.y))*(1.-an.y)*(.15+.31*pat.b);
        diffuseColor.rgb*=1.+grain+mottling-skirt;
        diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.34,.365,.350),clamp(chipped*.73+scratch*yardStyle.x*.32,0.,.86));
        ${peg?`vec2 holes=fract(panelUv/.087)-.5;
        float hole=smoothstep(.101,.152,length(holes));
        diffuseColor.rgb*=mix(.155,1.,hole);`:''}
        vec3 floorUse=vec3(0.);
        if(yardP.y<.087 && yardNorm.y>.65){
          floorUse=texture2D(yardTraffic,(yardP.xz+vec2(8.4,7.2))/vec2(20.8,14.4)).rgb;
          diffuseColor.rgb*=1.+floorUse.r*.058-floorUse.b*.43;
          diffuseColor.rgb*=mix(vec3(1.),vec3(.49,.458,.405),floorUse.g);
          if(yardIsMark>.5){
            vec2 joint=min(fract((yardP.xz+vec2(8.4,7.2))/vec2(1.4,1.44)),1.-fract((yardP.xz+vec2(8.4,7.2))/vec2(1.4,1.44)));
            if(min(joint.x,joint.y)<.0045 || pat.g+.56*fine.g>.80 || fine.b>.743)discard;
          }
        }
        float relief=(pat.r-.52)*.00049-scratch*.00057+(fine.r-.52)*.00012;`);
      s.fragmentShader=s.fragmentShader.replace('#include <roughnessmap_fragment>',`#include <roughnessmap_fragment>
        roughnessFactor=clamp(roughnessFactor+(pat.b-.51)*.17+(brushed.r-.56)*yardStyle.z*.19+scratch*.085-chipped*.09-floorUse.g*.20-floorUse.r*.09+floorUse.b*.063,.17,.94);`);
      s.fragmentShader=s.fragmentShader.replace('#include <metalnessmap_fragment>',`#include <metalnessmap_fragment>
        metalnessFactor=mix(metalnessFactor,.68,chipped*.65);`);
      s.fragmentShader=s.fragmentShader.replace('#include <normal_fragment_maps>',`#include <normal_fragment_maps>
        vec3 dpX=dFdx(-vViewPosition),dpY=dFdy(-vViewPosition);
        vec3 roX=cross(dpY,normal),roY=cross(normal,dpX);
        float detY=dot(roX,dpX);
        vec3 gradY=sign(detY)*(dFdx(relief)*roX+dFdy(relief)*roY);
        normal=normalize(normal*max(.0000000001,abs(detY))-gradY);`);
      s.fragmentShader=s.fragmentShader.replace('#include <aomap_fragment>',`#include <aomap_fragment>
        vec4 irradianceField=texture(yardVolume,clamp((yardP+yardNorm*.142-yardOrigin)/yardExtent,vec3(.001),vec3(.999)));
        float access=mix(.27,1.06,irradianceField.r);
        float ceilingVisibility=mix(.42,1.,irradianceField.g);
        reflectedLight.indirectDiffuse*=access*mix(.71,1.,irradianceField.g);
        reflectedLight.indirectSpecular*=mix(.37,1.,irradianceField.r);
        reflectedLight.directDiffuse*=ceilingVisibility;
        reflectedLight.directSpecular*=mix(.64,1.,irradianceField.g);
        vec3 portDirection=normalize(vec3(-.4,4.2,-6.92)-yardP);
        vec3 benchDirection=normalize(vec3(11.54,2.66,clamp(yardP.z,-1.0,2.48))-yardP);
        float portBounce=irradianceField.b*(.23+.77*max(0.,dot(yardNorm,portDirection)));
        float benchBounce=irradianceField.a*(.23+.77*max(0.,dot(yardNorm,benchDirection)));
        reflectedLight.indirectDiffuse+=diffuseColor.rgb*(1.-metalnessFactor)*access*(vec3(.27,.40,.55)*portBounce+vec3(.89,.53,.23)*benchBounce);`);
    };
    materials[key]=m;
  }
  const glass=new T.MeshStandardMaterial({vertexColors:true,metalness:.34,roughness:.11,transparent:true,opacity:.12,side:T.DoubleSide,depthWrite:false,envMapIntensity:1.38,forceSinglePass:true});
  glass.onBeforeCompile=s=>{
    s.fragmentShader=s.fragmentShader.replace('#include <opaque_fragment>',`
      float grazing=pow(1.-clamp(abs(dot(normal,normalize(vViewPosition))),0.,1.),3.);
      diffuseColor.a=.063+.40*grazing;
      #include <opaque_fragment>`);
  };
  materials.glass=glass;
  materials.lit=new T.MeshBasicMaterial({vertexColors:true,color:new T.Color(2.30,2.27,2.16)});
  materials.signal=new T.MeshBasicMaterial({vertexColors:true,color:new T.Color(1.53,1.65,1.59)});
  materials.outside=new T.MeshBasicMaterial({vertexColors:true,fog:false});
  materials.outside.onBeforeCompile=s=>{
    s.vertexShader=s.vertexShader.replace('#include <common>','#include <common>\nvarying float outerSun;')
      .replace('#include <begin_vertex>','#include <begin_vertex>\nouterSun=.35+.76*max(0.,dot(normalize(normal),normalize(vec3(-.70,.58,.414))));');
    s.fragmentShader=s.fragmentShader.replace('#include <common>','#include <common>\nvarying float outerSun;')
      .replace('#include <color_fragment>','#include <color_fragment>\ndiffuseColor.rgb*=outerSun;');
  };
  return materials;
}

export function illuminate(scene,renderer){
  const hemi=new T.HemisphereLight(0xf3f2e6,0x7c8c92,.93);
  scene.add(hemi);
  const key=new T.DirectionalLight(0xfff1d9,2.05);
  key.position.set(7.8,14.4,6.9);key.target.position.set(-.15,.82,-.36);
  key.castShadow=true;key.shadow.mapSize.set(2048,2048);
  Object.assign(key.shadow.camera,{left:-11.3,right:11.3,top:9.6,bottom:-9.6,near:1,far:33});
  key.shadow.camera.updateProjectionMatrix();key.shadow.bias=-.00016;key.shadow.normalBias=.010;key.shadow.radius=1.5;
  scene.add(key,key.target);
  const windowLight=new T.DirectionalLight(0xc2d8ee,.83);windowLight.position.set(-4.4,5.7,-8.4);scene.add(windowLight);
  const benchLight=new T.PointLight(0xffc188,13.7,6.0,2);benchLight.position.set(11.22,2.51,.81);scene.add(benchLight);
  const inspection=new T.PointLight(0xb6e9e4,1.8,3.0,2);inspection.position.set(-.05,1.11,1.83);scene.add(inspection);
  renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;
  renderer.shadowMap.autoUpdate=false;renderer.shadowMap.needsUpdate=true;
}


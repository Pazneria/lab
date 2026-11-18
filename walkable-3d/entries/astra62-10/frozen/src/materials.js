import * as T from '../vendor/three.module.min.js';
import {makeSpines,makeCovers,makeRug,makeMap,makeFern,makeFolio,makeLabels,makeGlobe} from './art.js';
import {rng} from './workshop.js';
import {makeClock,makeMoths} from './illustrations.js';
import {oilStudy,contactMap} from './curios.js';
import {borderArt} from './joinery.js';
function runner(){
  const c=document.createElement('canvas');c.width=256;c.height=96;const a=c.getContext('2d');
  a.fillStyle='#784737';a.fillRect(0,0,256,96);
  for(const s of [0,1])for(const [offset,w,col] of [[3,4,'#bc9c65'],[9,13,'#434f49'],[24,2,'#d4b57d'],[30,3,'#b18555']]){
    a.fillStyle=col;a.fillRect(s?256-offset-w:offset,0,w,96);
  }
  for(let x=15;x<256;x+=225)for(let y=0;y<97;y+=12){a.fillStyle='#b79869';a.save();a.translate(x,y);a.rotate(Math.PI/4);a.fillRect(-2.6,-2.6,5.2,5.2);a.restore();}
  for(let y=0;y<96;y+=2){a.fillStyle='rgba(45,29,19,.12)';a.fillRect(0,y,256,1);}
  return c;
}
export function skyTexture(){
  const c=document.createElement('canvas');c.width=1024;c.height=512;
  const a=c.getContext('2d'),g=a.createLinearGradient(0,0,0,512);
  for(const [p,col] of [[0,'#6e9ebd'],[.29,'#9ebbc9'],[.42,'#d8d3c6'],[.49,'#f5d9b1'],[.57,'#e7cba7'],[1,'#b5a98b']])g.addColorStop(p,col);
  a.fillStyle=g;a.fillRect(0,0,1024,512);const r=rng(409);
  for(let i=0;i<82;i++){const x=r()*1024,y=148+r()*91,rx=12+r()*83,ry=1+r()*5;a.save();a.translate(x,y);a.scale(rx,ry);const f=a.createRadialGradient(0,0,0,0,0,1);f.addColorStop(0,'rgba(255,238,211,.21)');f.addColorStop(1,'rgba(255,238,211,0)');a.fillStyle=f;a.fillRect(-1,-1,2,2);a.restore();}
  const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;t.mapping=T.EquirectangularReflectionMapping;return t;
}
export async function makeMaterials(renderer){
  const materials={},loader=new T.TextureLoader(),aniso=Math.min(8,renderer.capabilities.getMaxAnisotropy());
  const get=async(name,linear=false)=>{
    const t=await loader.loadAsync(new URL('../assets/'+name+'.png',import.meta.url).href);
    if(!linear)t.colorSpace=T.SRGBColorSpace;t.wrapS=t.wrapT=T.RepeatWrapping;t.anisotropy=aniso;return t;
  };
  function cm(c){const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;t.anisotropy=aniso;return t;}
  function mat(name,opt={}){materials[name]=new T.MeshStandardMaterial({vertexColors:true,roughness:.85,...opt});}
  const [wood,wn,pl,pn,hide,hn,stone,sn,pages]=await Promise.all([get('quarter-sawn-oak'),get('quarter-sawn-oak-n',true),get('limewash'),get('limewash-n',true),get('hide'),get('hide-n',true),get('flagstone'),get('flagstone-n',true),get('leaf-edges')]);
  mat('wood',{map:wood,normalMap:wn,normalScale:new T.Vector2(.52,.52),roughness:.58});
  mat('paint',{normalMap:wn,normalScale:new T.Vector2(.44,.44),roughness:.65});
  mat('plaster',{map:pl,normalMap:pn,normalScale:new T.Vector2(.67,.67)});
  mat('stone',{map:stone,normalMap:sn,normalScale:new T.Vector2(.6,.6)});
  mat('hide',{map:hide,normalMap:hn,normalScale:new T.Vector2(.68,.68),roughness:.52});
  mat('pages',{map:pages});mat('plain');mat('iron',{metalness:.45,roughness:.48});mat('brass',{metalness:.58,roughness:.35});
  mat('ground',{map:stone,roughness:1});mat('leaf');mat('spine',{map:cm(makeSpines()),roughness:.65});
  mat('cover',{map:cm(makeCovers()),roughness:.67});mat('rug',{map:cm(makeRug())});mat('runner',{map:cm(runner())});
  for(const [key,fn] of [['map',makeMap],['fern',makeFern],['folio',makeFolio],['label',makeLabels],['globe',makeGlobe],['clock',makeClock],['moth',makeMoths],['painting',oilStudy]])mat(key,{map:cm(fn())});
  mat('glass',{transparent:true,opacity:.043,roughness:.22,depthWrite:false,side:T.DoubleSide});
  mat('opal',{emissive:0xffca83,emissiveIntensity:.76,roughness:.4});
  mat('greenGlass',{emissive:0x285c3e,emissiveIntensity:.52,roughness:.24});
  const border=cm(borderArt());border.wrapS=T.RepeatWrapping;mat('frieze',{map:border,roughness:.78});
  materials.contact=new T.MeshBasicMaterial({map:cm(contactMap()),transparent:true,opacity:.48,depthWrite:false,vertexColors:true});
  return materials;
}

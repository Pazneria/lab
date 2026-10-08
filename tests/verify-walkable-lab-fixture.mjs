import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import * as input from '../lab-space/assets/interaction.mjs';

let sequence=0;
export const memoryStorage = map => ({getItem:key=>map.get(key)||null,setItem:(key,value)=>map.set(key,value),removeItem:key=>map.delete(key)});
export async function moduleIn(context,path) {
  const url=new URL('../'+path,import.meta.url);
  return new vm.SourceTextModule(readFileSync(url,'utf8'),{context,initializeImportMeta(meta){meta.url='https://example.test/lab/'+path;}});
}
export async function screenFixture({placeholder=false,failedImage=false,catalog,href='https://example.test/lab/lab-space/',state={},session=new Map(),storage=new Map(),random=()=>0,storageDisabled=false}={}) {
  const elements=new Map(),opened=[],images=[],events=new Map(),assigned=[];let departures=0,resumes=0;
  const drawing=new Proxy({},{get:()=>()=>{}});
  function element(){return {dataset:{},children:[],listeners:{},hidden:false,disabled:false,checked:true,open:false,
    getContext:()=>drawing,append(...children){this.children.push(...children);},replaceChildren(...children){this.children=children;},
    setAttribute(){},addEventListener(type,fn){this.listeners[type]=fn;},close(){this.open=false;this.listeners.close?.();},showModal(){this.shown=true;this.open=true;},focus(){this.focused=true;},scrollIntoView(){this.scrolled=true;}};}
  const byId=id=>{if(!elements.has(id))elements.set(id,element());return elements.get(id);};
  const choices=['a','b','tie'].map(choice=>({...element(),dataset:{screenChoice:choice}}));
  const entries=catalog?.entries||['a','b'].map((id,i)=>({id,promptId:'01',title:'Scene '+id,htmlSha256:'a'.repeat(64),comparisonModel:'model'+i,requestedConfiguration:'model'+i,...placeholder?{previewAvailable:false}:{}}));
  const data=catalog||{entries,prompts:[{id:'01',title:'Test prompt'}]};
  const location={href,search:new URL(href).search,assign(url){assigned.push(url);opened.push(new URL(url).searchParams.get('entry'));}};
  const history={state,replaceState(value,unused,url){this.state=value;if(url){location.href=String(url);location.search=new URL(url).search;}}};
  const context=vm.createContext({URL,URLSearchParams,console,crypto:{randomUUID:()=>`visit-${++sequence}`},
    document:{getElementById:byId,createElement:element,querySelectorAll:()=>choices},
    localStorage:memoryStorage(storage),sessionStorage:storageDisabled?{getItem(){throw Error();},setItem(){throw Error();}}:memoryStorage(session),
    history,location,addEventListener(type,fn){if(!events.has(type))events.set(type,[]);events.get(type).push(fn);},
    Image:class {constructor(){images.push(this);}set src(value){this.url=value;this.complete=!failedImage;this.naturalWidth=failedImage?0:960;this.naturalHeight=failedImage?0:600;}},
    fetch:async()=>({ok:true,json:async()=>data})
  });
  context.pickerRandom=random;vm.runInContext('Math.random=pickerRandom',context);
  const synthetic=values=>new vm.SyntheticModule(Object.keys(values),function(){for(const [key,value]of Object.entries(values))this.setExport(key,value);},{context});
  const comparisons=await moduleIn(context,'walkable-3d/assets/comparisons.js'),navigation=await moduleIn(context,'walkable-3d/assets/scene-navigation.js');
  const module=await moduleIn(context,'lab-space/assets/walkable-screen.js');
  await module.link(path=>path.endsWith('interaction.mjs')?synthetic(input):path.endsWith('scene-navigation.js')?navigation:path.endsWith('public-judgments.js')?synthetic({publicVotingEnabled:false,submitPublicVote(){throw Error('Unexpected public write');},hasPublicVote:()=>false,loadPublicLeaderboard(){},renderPublicLeaderboard(){},subscribePublicJudgments(){}}):path.endsWith('comparisons.js')?comparisons:synthetic({renderLeaderboard(){}}));
  await module.evaluate();
  const api=module.namespace.createWalkableScreen({changed(){},suspend(){},resume(){resumes++;},depart(){departures++;history.state.labPosition={x:1,z:2,yaw:.3,pitch:.1};},approach(){}});
  await new Promise(resolve=>setImmediate(resolve));
  async function sceneVisit({ready=false}={}) {
    const sceneHref=assigned.at(-1),sceneContext=vm.createContext({URL,URLSearchParams,sessionStorage:memoryStorage(session),location:{href:sceneHref,search:new URL(sceneHref).search}});
    const sceneNavigation=await moduleIn(sceneContext,'walkable-3d/assets/scene-navigation.js');await sceneNavigation.link(()=>{});await sceneNavigation.evaluate();
    const nav=sceneNavigation.namespace.createSceneNavigation(new URL('https://example.test/lab/walkable-3d/')),visit=nav.current();
    if(visit){nav.start(visit);if(ready)nav.ready(visit);}
    return {nav,visit};
  }
  async function returnVisit(options={}) {await sceneVisit(options);for(const listener of events.get('pageshow')||[])listener({persisted:true});}
  return {api,byId,opened,entries,images,storage,session,choices,history,location,assigned,sceneVisit,returnVisit,events,get departures(){return departures;},get resumes(){return resumes;},ready:()=>returnVisit({ready:true})};
}

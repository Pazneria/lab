// Bounded CPU-only authoring aid. Does not construct a renderer, canvas or server.
import * as T from 'three';
import {writeFileSync} from 'node:fs';
import {Builder} from './builder.js';
import {buildHall} from './hall.js';
import {buildInstrument} from './instrument.js';
import {buildPerception} from './perception.js';
import {buildMotion} from './motion.js';
const b=new Builder();
b.add=(geometry)=>{geometry?.dispose();};b.box=()=>{};b.cyl=()=>{};
const M=new Proxy({}, {get(object,key){return object[key]??=new T.MeshStandardMaterial();}});
const A={sign:()=>new T.BufferGeometry(),plane:()=>new T.BufferGeometry(),cylBand:()=>new T.BufferGeometry()};
const ctx={b,M,A,screen(){}};
for(const build of [buildHall,buildInstrument,buildPerception,buildMotion])build(ctx);
const json=JSON.stringify(b.colliders,null,2);
const outputBase=new URL(process.argv[2]||import.meta.url);
writeFileSync(new URL('./colliders.json',outputBase),json+'\n');
writeFileSync(new URL('./colliders.mjs',outputBase),'// Exact Claude11 furniture/wall collision records; generated CPU-only.\nexport const colliders=Object.freeze('+json+'.map(Object.freeze));\n');
console.log(JSON.stringify({colliders:b.colliders.length,renderers:0,canvases:0}));

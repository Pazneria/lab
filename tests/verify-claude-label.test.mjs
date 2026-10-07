import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
test('owner-confirmed Claude identity displays consistently without changing catalog records',async()=>{
 const context=vm.createContext({});
 const module=new vm.SourceTextModule(readFileSync(new URL('../walkable-3d/assets/comparisons.js',import.meta.url),'utf8'),{context});
 await module.link(()=>{});await module.evaluate();
 const catalog=JSON.parse(readFileSync(new URL('../walkable-3d/entries.json',import.meta.url),'utf8'));
 const entries=Array.isArray(catalog)?catalog:catalog.entries;
 const before=JSON.stringify(entries),claude=entries.filter(e=>e.comparisonModel==='opus');
 assert.ok(claude.length>0);
 for(const entry of claude)assert.equal(module.namespace.modelName(entry),'Claude Opus 5.5');
 assert.equal(JSON.stringify(entries),before);
});

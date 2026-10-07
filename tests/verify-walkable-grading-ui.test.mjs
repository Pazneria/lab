// CPU-only DOM fixture. No browser, renderer, scene, or public submission.
import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';

async function fixture(old={}){
  class Node {
    constructor(tag){this.tag=tag;this.children=[];this.listeners={};this.dataset={};this.attrs={};this.value='';}
    append(...nodes){for(const node of nodes){node.parent=this;this.children.push(node);}}
    setAttribute(key,value){this.attrs[key]=value;}
    addEventListener(type,fn){(this.listeners[type]||=[]).push(fn);}
    dispatchEvent(event){if(!event.target)event.target=this;for(const fn of this.listeners[event.type]||[])fn(event);if(event.bubbles)this.parent?.dispatchEvent(event);}
    descendants(){return this.children.flatMap(node=>[node,...node.descendants()]);}
    querySelectorAll(){return this.descendants().filter(node=>['input','textarea'].includes(node.tag));}
    get elements(){return Object.fromEntries(this.querySelectorAll().filter(node=>node.name).map(node=>[node.name,node]));}
    get validity(){const n=Number(this.value);return {valid:this.value===''||(Number.isFinite(n)&&n>=Number(this.min)&&n<=Number(this.max)&&Number.isInteger(n*2))};}
    reportValidity(){return this.querySelectorAll().every(node=>node.tag!=='input'||node.validity.valid);}
  }
  const record={grades:{scene:old},preferences:{}},saves=[];
  const context=vm.createContext({document:{createElement:tag=>new Node(tag)},Event:class {constructor(type,options={}){this.type=type;Object.assign(this,options);}}});
  const module=new vm.SourceTextModule(readFileSync(new URL('../walkable-3d/assets/judgments.js',import.meta.url),'utf8'),{context});
  await module.link(path=>new vm.SyntheticModule(path.includes('comparisons')?['comparisonKey']:['publicRubricUrl'],function(){this.setExport(path.includes('comparisons')?'comparisonKey':'publicRubricUrl',()=>null);},{context}));await module.evaluate();
  const form=module.namespace.createGradeForm({id:'scene'},{getRecord:()=>record,refresh(){},save(){saves.push(JSON.parse(JSON.stringify(record)));},isPersistent:()=>true});
  const input=(name,value)=>{const field=form.elements[name];field.value=value;field.dispatchEvent({type:'input',bubbles:true});};
  const submit=()=>form.dispatchEvent({type:'submit',preventDefault(){}});
  const clear=()=>form.descendants().find(node=>node.tag==='button'&&node.textContent==='Clear grade').dispatchEvent({type:'click'});
  const total=()=>form.descendants().find(node=>node.className==='rubric-total').textContent;
  return {form,record,saves,input,submit,clear,total};
}
test('blank local grades stay unscored; slider, half points, total, save and clear preserve existing contract',async()=>{
 const f=await fixture();for(const name of ['visuals','performance','fulfillment'])assert.equal(f.form.elements[name].value,'');assert.match(f.total(),/Enter all three/);
 const slider=f.form.descendants().find(node=>node.type==='range');assert.equal(slider.attrs['aria-valuetext'],'Unscored');slider.value='40.5';slider.dispatchEvent({type:'input',bubbles:true});assert.equal(f.form.elements.visuals.value,'40.5');
 f.input('performance','30');f.input('fulfillment','18');f.input('notes','Private observation');assert.match(f.total(),/88.5 \/ 100/);f.submit();assert.equal(f.record.grades.scene.total,88.5);assert.equal(f.record.grades.scene.notes,'Private observation');assert.equal(f.saves.length,1);
 f.clear();assert.equal(f.record.grades.scene,undefined);assert.equal(f.saves.length,2);assert.match(f.total(),/Enter all three/);assert.equal(slider.attrs['aria-valuetext'],'Unscored');
});
test('invalid scores cannot save, partial grades remain partial, and dirty revision survives refresh',async()=>{
 const f=await fixture({visuals:25,performance:30,fulfillment:15,notes:'Old'});f.input('visuals','46');f.submit();assert.equal(f.saves.length,0);assert.equal(f.form.elements.visuals.attrs['aria-invalid'],'true');
 f.input('visuals','24.5');f.input('performance','');f.form.refreshGrade();assert.equal(f.form.elements.visuals.value,'24.5');f.submit();assert.equal(f.record.grades.scene.total,null);assert.equal(f.record.grades.scene.performance,null);assert.equal(f.record.grades.scene.visuals,24.5);
 f.record.grades.scene={visuals:12,performance:10,fulfillment:10,notes:'Elsewhere'};f.form.refreshGrade();assert.equal(f.form.elements.visuals.value,12);assert.match(f.total(),/32 \/ 100/);
});

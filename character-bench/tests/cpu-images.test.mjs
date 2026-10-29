import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,writeFileSync,readFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {decodeImage,inspectGLB} from '../tools/parse-glb.cpu.mjs';
const png=Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAIAAAD91JpzAAAAEklEQVR4nGOMrj7PwMDAxAAGABNyAamAITnYAAAAAElFTkSuQmCC','base64');
const jpeg=Buffer.from('/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAACAAIDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwCKiiivqjyz/9k=','base64');
function triangle(image=png,kind='png',embedded='bufferView'){
 const positions=Buffer.from(new Float32Array([0,0,0,1,0,0,0,1,0]).buffer),padding=Buffer.alloc((4-image.length%4)%4);
 const binary=Buffer.concat([positions,image,padding]);
 const json={asset:{version:'2.0'},scene:0,scenes:[{nodes:[0]}],nodes:[{mesh:0}],meshes:[{primitives:[{attributes:{POSITION:0},material:0}]}],accessors:[{bufferView:0,componentType:5126,count:3,type:'VEC3',min:[0,0,0],max:[1,1,0]}],bufferViews:[{buffer:0,byteLength:36},{buffer:0,byteOffset:36,byteLength:image.length}],buffers:[{byteLength:binary.length}],images:[embedded==='bufferView'?{bufferView:1,mimeType:'image/'+kind}:{uri:'data:image/'+kind+';base64,'+image.toString('base64')}],textures:[{source:0}],materials:[{pbrMetallicRoughness:{baseColorTexture:{index:0}}}]};
 const text=Buffer.from(JSON.stringify(json)),j=Buffer.concat([text,Buffer.alloc((4-text.length%4)%4,32)]),out=Buffer.alloc(28+j.length+binary.length);
 out.writeUInt32LE(0x46546c67,0);out.writeUInt32LE(2,4);out.writeUInt32LE(out.length,8);out.writeUInt32LE(j.length,12);out.writeUInt32LE(0x4e4f534a,16);j.copy(out,20);out.writeUInt32LE(binary.length,20+j.length);out.writeUInt32LE(0x004e4942,24+j.length);binary.copy(out,28+j.length);return out;
}
test('real PNG and JPEG decode produces bounded RGBA pixels, rejects corrupt streams',()=>{
 for(const image of [png,jpeg]){const decoded=decodeImage(image);assert.equal(decoded.width,2);assert.equal(decoded.height,2);assert.equal(decoded.data.length,16);assert.equal(decoded.data[3],255);assert.ok(decoded.data[2]>190);}
 assert.deepEqual([...decodeImage(png).data.subarray(0,4)],[91,123,207,255]);
 const corrupt=Buffer.from(png);corrupt[50]^=255;assert.throws(()=>decodeImage(corrupt),/decoder failed/);
 assert.throws(()=>decodeImage(jpeg.subarray(0,80)),/decoder failed/);
});
test('native GLTFLoader binds decoded embedded PNG/JPEG, closes images, and leaves files unchanged',async()=>{
 const folder=mkdtempSync(join(tmpdir(),'characterbench-image-test-'));
 for(const [image,kind,mode]of [[png,'png','bufferView'],[jpeg,'jpeg','uri']]){
  const path=join(folder,kind+'.glb'),bytes=triangle(image,kind,mode);writeFileSync(path,bytes);
  const result=await inspectGLB(path);assert.equal(result.preflight,true,result.error);assert.equal(result.parser,true,result.error);assert.equal(result.decodedImages.length,1);assert.equal(result.textureBindings,1);assert.equal(result.decodedImagesClosed,true);assert.equal(result.sourceHashUnchanged,true);assert.deepEqual(readFileSync(path),bytes);
 }
 const corrupt=Buffer.from(png);corrupt[50]^=255;const path=join(folder,'corrupt.glb');writeFileSync(path,triangle(corrupt));
 const failed=await inspectGLB(path);assert.equal(failed.preflight,true);assert.equal(failed.parser,false);assert.match(failed.error,/decoder failed/);
 assert.equal(globalThis.createImageBitmap,undefined);
});
test('post-import invalid bounds fail and evidence cannot overwrite an input',async()=>{
 const folder=mkdtempSync(join(tmpdir(),'characterbench-bounds-test-')),path=join(folder,'input.glb'),bytes=triangle();
 const binaryStart=28+bytes.readUInt32LE(12);bytes.writeFloatLE(NaN,binaryStart);writeFileSync(path,bytes);
 const failed=await inspectGLB(path);assert.equal(failed.preflight,true);assert.equal(failed.parser,false);assert.match(failed.error,/Non-finite scene bounds/);
 const run=spawnSync(process.execPath,[fileURLToPath(new URL('../tools/parse-glb.cpu.mjs',import.meta.url)),'--output',path,path],{encoding:'utf8'});
 assert.notEqual(run.status,0);assert.match(run.stderr,/must not overwrite/);assert.deepEqual(readFileSync(path),bytes);
});

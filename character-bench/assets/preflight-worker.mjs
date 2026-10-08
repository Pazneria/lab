import {validateGLB} from './contracts.mjs';
self.onmessage=event=>{
  const buffer=event.data.buffer;
  try {const {vertices,meshes}=validateGLB(buffer);self.postMessage({buffer,summary:{vertices,meshes}},[buffer]);}
  catch(error){self.postMessage({error:error.message});}
};

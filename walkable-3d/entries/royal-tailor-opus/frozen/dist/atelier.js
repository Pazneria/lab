(()=>{var Qe=(n,t,e)=>()=>{if(e)throw e[0];try{return n&&(t=n(n=0)),t}catch(i){throw e=[i],i}};var eu=(n,t)=>()=>{try{return t||n((t={exports:{}}).exports,t),t.exports}catch(e){throw t=0,e}};function ws(){let n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Pe[n&255]+Pe[n>>8&255]+Pe[n>>16&255]+Pe[n>>24&255]+"-"+Pe[t&255]+Pe[t>>8&255]+"-"+Pe[t>>16&15|64]+Pe[t>>24&255]+"-"+Pe[e&63|128]+Pe[e>>8&255]+"-"+Pe[e>>16&255]+Pe[e>>24&255]+Pe[i&255]+Pe[i>>8&255]+Pe[i>>16&255]+Pe[i>>24&255]).toLowerCase()}function Ae(n,t,e){return Math.max(t,Math.min(e,n))}function Hu(n,t){return(n%t+t)%t}function eo(n,t,e){return(1-e)*n+e*t}function ss(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Ve(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}function th(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function xr(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Vu(){let n=xr("canvas");return n.style.display="block",n}function cr(n){n in Yl||(Yl[n]=!0,console.warn(n))}function Gu(n,t,e){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}function Wu(n){let t=n.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Xu(n){let t=n.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}function Di(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function io(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}function so(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?va.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}function oo(n,t,e,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){Yn.fromArray(n,r);let a=s.x*Math.abs(Yn.x)+s.y*Math.abs(Yn.y)+s.z*Math.abs(Yn.z),l=t.dot(Yn),u=e.dot(Yn),h=i.dot(Yn);if(Math.max(-Math.max(l,u,h),Math.min(l,u,h))>a)return!1}return!0}function vo(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}function rf(n,t,e,i,s,r,o,a){let l;if(t.side===Le?l=i.intersectTriangle(o,r,s,!0,a):l=i.intersectTriangle(s,r,o,t.side===Hn,a),l===null)return null;$s.copy(a),$s.applyMatrix4(n.matrixWorld);let u=e.ray.origin.distanceTo($s);return u<e.near||u>e.far?null:{distance:u,point:$s.clone(),object:n}}function Js(n,t,e,i,s,r,o,a,l,u){n.getVertexPosition(a,Xs),n.getVertexPosition(l,qs),n.getVertexPosition(u,Ys);let h=rf(n,t,e,i,Xs,qs,Ys,ac);if(h){let m=new I;ti.getBarycoord(ac,Xs,qs,Ys,m),s&&(h.uv=ti.getInterpolatedAttribute(s,a,l,u,m,new It)),r&&(h.uv1=ti.getInterpolatedAttribute(r,a,l,u,m,new It)),o&&(h.normal=ti.getInterpolatedAttribute(o,a,l,u,m,new I),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));let c={a,b:l,c:u,normal:new I,materialIndex:0};ti.getNormal(Xs,qs,Ys,c.normal),h.face=c,h.barycoord=m}return h}function Bi(n){let t={};for(let e in n){t[e]={};for(let i in n[e]){let s=n[e][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone():Array.isArray(s)?t[e][i]=s.slice():t[e][i]=s}}return t}function Ue(n){let t={};for(let e=0;e<n.length;e++){let i=Bi(n[e]);for(let s in i)t[s]=i[s]}return t}function of(n){let t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function nh(n){let t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Jt.workingColorSpace}function ih(){let n=null,t=!1,e=null,i=null;function s(r,o){e(r,o),i=n.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function ff(n){let t=new WeakMap;function e(a,l){let u=a.array,h=a.usage,m=u.byteLength,c=n.createBuffer();n.bindBuffer(l,c),n.bufferData(l,u,h),a.onUploadCallback();let f;if(u instanceof Float32Array)f=n.FLOAT;else if(u instanceof Uint16Array)a.isFloat16BufferAttribute?f=n.HALF_FLOAT:f=n.UNSIGNED_SHORT;else if(u instanceof Int16Array)f=n.SHORT;else if(u instanceof Uint32Array)f=n.UNSIGNED_INT;else if(u instanceof Int32Array)f=n.INT;else if(u instanceof Int8Array)f=n.BYTE;else if(u instanceof Uint8Array)f=n.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)f=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:c,type:f,bytesPerElement:u.BYTES_PER_ELEMENT,version:a.version,size:m}}function i(a,l,u){let h=l.array,m=l.updateRanges;if(n.bindBuffer(u,a),m.length===0)n.bufferSubData(u,0,h);else{m.sort((f,x)=>f.start-x.start);let c=0;for(let f=1;f<m.length;f++){let x=m[c],v=m[f];v.start<=x.start+x.count+1?x.count=Math.max(x.count,v.start+v.count-x.start):(++c,m[c]=v)}m.length=c+1;for(let f=0,x=m.length;f<x;f++){let v=m[f];n.bufferSubData(u,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=t.get(a);l&&(n.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let u=t.get(a);if(u===void 0)t.set(a,e(a,l));else if(u.version<a.version){if(u.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(u.buffer,a,l),u.version=a.version}}return{get:s,remove:r,update:o}}function Yp(n,t,e,i,s,r,o){let a=new Pt(0),l=r===!0?0:1,u,h,m=null,c=0,f=null;function x(b){let y=b.isScene===!0?b.background:null;return y&&y.isTexture&&(y=(b.backgroundBlurriness>0?e:t).get(y)),y}function v(b){let y=!1,S=x(b);S===null?d(a,l):S&&S.isColor&&(d(S,1),y=!0);let L=n.xr.getEnvironmentBlendMode();L==="additive"?i.buffers.color.setClear(0,0,0,1,o):L==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||y)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function p(b,y){let S=x(y);S&&(S.isCubeTexture||S.mapping===Nr)?(h===void 0&&(h=new jt(new fe(1,1,1),new gn({name:"BackgroundCubeMaterial",uniforms:Bi(dn.backgroundCube.uniforms),vertexShader:dn.backgroundCube.vertexShader,fragmentShader:dn.backgroundCube.fragmentShader,side:Le,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(L,T,E){this.matrixWorld.copyPosition(E.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),Jn.copy(y.backgroundRotation),Jn.x*=-1,Jn.y*=-1,Jn.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(Jn.y*=-1,Jn.z*=-1),h.material.uniforms.envMap.value=S,h.material.uniforms.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(qp.makeRotationFromEuler(Jn)),h.material.toneMapped=Jt.getTransfer(S.colorSpace)!==ae,(m!==S||c!==S.version||f!==n.toneMapping)&&(h.material.needsUpdate=!0,m=S,c=S.version,f=n.toneMapping),h.layers.enableAll(),b.unshift(h,h.geometry,h.material,0,0,null)):S&&S.isTexture&&(u===void 0&&(u=new jt(new tn(2,2),new gn({name:"BackgroundMaterial",uniforms:Bi(dn.background.uniforms),vertexShader:dn.background.vertexShader,fragmentShader:dn.background.fragmentShader,side:Hn,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),Object.defineProperty(u.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(u)),u.material.uniforms.t2D.value=S,u.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,u.material.toneMapped=Jt.getTransfer(S.colorSpace)!==ae,S.matrixAutoUpdate===!0&&S.updateMatrix(),u.material.uniforms.uvTransform.value.copy(S.matrix),(m!==S||c!==S.version||f!==n.toneMapping)&&(u.material.needsUpdate=!0,m=S,c=S.version,f=n.toneMapping),u.layers.enableAll(),b.unshift(u,u.geometry,u.material,0,0,null))}function d(b,y){b.getRGB(Qs,nh(n)),i.buffers.color.setClear(Qs.r,Qs.g,Qs.b,y,o)}return{getClearColor:function(){return a},setClearColor:function(b,y=1){a.set(b),l=y,d(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(b){l=b,d(a,l)},render:v,addToRenderList:p}}function Zp(n,t){let e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=c(null),r=s,o=!1;function a(g,_,C,D,z){let $=!1,O=m(D,C,_);r!==O&&(r=O,u(r.object)),$=f(g,D,C,z),$&&x(g,D,C,z),z!==null&&t.update(z,n.ELEMENT_ARRAY_BUFFER),($||o)&&(o=!1,S(g,_,C,D),z!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(z).buffer))}function l(){return n.createVertexArray()}function u(g){return n.bindVertexArray(g)}function h(g){return n.deleteVertexArray(g)}function m(g,_,C){let D=C.wireframe===!0,z=i[g.id];z===void 0&&(z={},i[g.id]=z);let $=z[_.id];$===void 0&&($={},z[_.id]=$);let O=$[D];return O===void 0&&(O=c(l()),$[D]=O),O}function c(g){let _=[],C=[],D=[];for(let z=0;z<e;z++)_[z]=0,C[z]=0,D[z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:_,enabledAttributes:C,attributeDivisors:D,object:g,attributes:{},index:null}}function f(g,_,C,D){let z=r.attributes,$=_.attributes,O=0,Q=C.getAttributes();for(let X in Q)if(Q[X].location>=0){let et=z[X],it=$[X];if(it===void 0&&(X==="instanceMatrix"&&g.instanceMatrix&&(it=g.instanceMatrix),X==="instanceColor"&&g.instanceColor&&(it=g.instanceColor)),et===void 0||et.attribute!==it||it&&et.data!==it.data)return!0;O++}return r.attributesNum!==O||r.index!==D}function x(g,_,C,D){let z={},$=_.attributes,O=0,Q=C.getAttributes();for(let X in Q)if(Q[X].location>=0){let et=$[X];et===void 0&&(X==="instanceMatrix"&&g.instanceMatrix&&(et=g.instanceMatrix),X==="instanceColor"&&g.instanceColor&&(et=g.instanceColor));let it={};it.attribute=et,et&&et.data&&(it.data=et.data),z[X]=it,O++}r.attributes=z,r.attributesNum=O,r.index=D}function v(){let g=r.newAttributes;for(let _=0,C=g.length;_<C;_++)g[_]=0}function p(g){d(g,0)}function d(g,_){let C=r.newAttributes,D=r.enabledAttributes,z=r.attributeDivisors;C[g]=1,D[g]===0&&(n.enableVertexAttribArray(g),D[g]=1),z[g]!==_&&(n.vertexAttribDivisor(g,_),z[g]=_)}function b(){let g=r.newAttributes,_=r.enabledAttributes;for(let C=0,D=_.length;C<D;C++)_[C]!==g[C]&&(n.disableVertexAttribArray(C),_[C]=0)}function y(g,_,C,D,z,$,O){O===!0?n.vertexAttribIPointer(g,_,C,z,$):n.vertexAttribPointer(g,_,C,D,z,$)}function S(g,_,C,D){v();let z=D.attributes,$=C.getAttributes(),O=_.defaultAttributeValues;for(let Q in $){let X=$[Q];if(X.location>=0){let ot=z[Q];if(ot===void 0&&(Q==="instanceMatrix"&&g.instanceMatrix&&(ot=g.instanceMatrix),Q==="instanceColor"&&g.instanceColor&&(ot=g.instanceColor)),ot!==void 0){let et=ot.normalized,it=ot.itemSize,Et=t.get(ot);if(Et===void 0)continue;let Nt=Et.buffer,V=Et.type,U=Et.bytesPerElement,Y=V===n.INT||V===n.UNSIGNED_INT||ot.gpuType===ol;if(ot.isInterleavedBufferAttribute){let q=ot.data,st=q.stride,tt=ot.offset;if(q.isInstancedInterleavedBuffer){for(let mt=0;mt<X.locationSize;mt++)d(X.location+mt,q.meshPerAttribute);g.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=q.meshPerAttribute*q.count)}else for(let mt=0;mt<X.locationSize;mt++)p(X.location+mt);n.bindBuffer(n.ARRAY_BUFFER,Nt);for(let mt=0;mt<X.locationSize;mt++)y(X.location+mt,it/X.locationSize,V,et,st*U,(tt+it/X.locationSize*mt)*U,Y)}else{if(ot.isInstancedBufferAttribute){for(let q=0;q<X.locationSize;q++)d(X.location+q,ot.meshPerAttribute);g.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=ot.meshPerAttribute*ot.count)}else for(let q=0;q<X.locationSize;q++)p(X.location+q);n.bindBuffer(n.ARRAY_BUFFER,Nt);for(let q=0;q<X.locationSize;q++)y(X.location+q,it/X.locationSize,V,et,it*U,it/X.locationSize*q*U,Y)}}else if(O!==void 0){let et=O[Q];if(et!==void 0)switch(et.length){case 2:n.vertexAttrib2fv(X.location,et);break;case 3:n.vertexAttrib3fv(X.location,et);break;case 4:n.vertexAttrib4fv(X.location,et);break;default:n.vertexAttrib1fv(X.location,et)}}}}b()}function L(){A();for(let g in i){let _=i[g];for(let C in _){let D=_[C];for(let z in D)h(D[z].object),delete D[z];delete _[C]}delete i[g]}}function T(g){if(i[g.id]===void 0)return;let _=i[g.id];for(let C in _){let D=_[C];for(let z in D)h(D[z].object),delete D[z];delete _[C]}delete i[g.id]}function E(g){for(let _ in i){let C=i[_];if(C[g.id]===void 0)continue;let D=C[g.id];for(let z in D)h(D[z].object),delete D[z];delete C[g.id]}}function A(){N(),o=!0,r!==s&&(r=s,u(r.object))}function N(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:A,resetDefaultState:N,dispose:L,releaseStatesOfGeometry:T,releaseStatesOfProgram:E,initAttributes:v,enableAttribute:p,disableUnusedAttributes:b}}function $p(n,t,e){let i;function s(u){i=u}function r(u,h){n.drawArrays(i,u,h),e.update(h,i,1)}function o(u,h,m){m!==0&&(n.drawArraysInstanced(i,u,h,m),e.update(h,i,m))}function a(u,h,m){if(m===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,u,0,h,0,m);let f=0;for(let x=0;x<m;x++)f+=h[x];e.update(f,i,1)}function l(u,h,m,c){if(m===0)return;let f=t.get("WEBGL_multi_draw");if(f===null)for(let x=0;x<u.length;x++)o(u[x],h[x],c[x]);else{f.multiDrawArraysInstancedWEBGL(i,u,0,h,0,c,0,m);let x=0;for(let v=0;v<m;v++)x+=h[v];for(let v=0;v<c.length;v++)e.update(x,i,c[v])}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function Jp(n,t,e,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let E=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(E){return!(E!==ln&&i.convert(E)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(E){let A=E===Es&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(E!==An&&i.convert(E)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&E!==mn&&!A)}function l(E){if(E==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let u=e.precision!==void 0?e.precision:"highp",h=l(u);h!==u&&(console.warn("THREE.WebGLRenderer:",u,"not supported, using",h,"instead."),u=h);let m=e.logarithmicDepthBuffer===!0,c=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control");if(c===!0){let E=t.get("EXT_clip_control");E.clipControlEXT(E.LOWER_LEFT_EXT,E.ZERO_TO_ONE_EXT)}let f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_TEXTURE_SIZE),p=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),d=n.getParameter(n.MAX_VERTEX_ATTRIBS),b=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),y=n.getParameter(n.MAX_VARYING_VECTORS),S=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),L=x>0,T=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:u,logarithmicDepthBuffer:m,reverseDepthBuffer:c,maxTextures:f,maxVertexTextures:x,maxTextureSize:v,maxCubemapSize:p,maxAttributes:d,maxVertexUniforms:b,maxVaryings:y,maxFragmentUniforms:S,vertexTextures:L,maxSamples:T}}function Kp(n){let t=this,e=null,i=0,s=!1,r=!1,o=new wn,a=new Ht,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(m,c){let f=m.length!==0||c||i!==0||s;return s=c,i=m.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(m,c){e=h(m,c,0)},this.setState=function(m,c,f){let x=m.clippingPlanes,v=m.clipIntersection,p=m.clipShadows,d=n.get(m);if(!s||x===null||x.length===0||r&&!p)r?h(null):u();else{let b=r?0:i,y=b*4,S=d.clippingState||null;l.value=S,S=h(x,c,y,f);for(let L=0;L!==y;++L)S[L]=e[L];d.clippingState=S,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=b}};function u(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function h(m,c,f,x){let v=m!==null?m.length:0,p=null;if(v!==0){if(p=l.value,x!==!0||p===null){let d=f+v*4,b=c.matrixWorldInverse;a.getNormalMatrix(b),(p===null||p.length<d)&&(p=new Float32Array(d));for(let y=0,S=f;y!==v;++y,S+=4)o.copy(m[y]).applyMatrix4(b,a),o.normal.toArray(p,S),p[S+3]=o.constant}l.value=p,l.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,p}}function Qp(n){let t=new WeakMap;function e(o,a){return a===Wo?o.mapping=Fi:a===Xo&&(o.mapping=Oi),o}function i(o){if(o&&o.isTexture){let a=o.mapping;if(a===Wo||a===Xo)if(t.has(o)){let l=t.get(o).texture;return e(l,o.mapping)}else{let l=o.image;if(l&&l.height>0){let u=new wa(l.height);return u.fromEquirectangularTexture(n,o),t.set(o,u),o.addEventListener("dispose",s),e(u.texture,o.mapping)}else return null}}return o}function s(o){let a=o.target;a.removeEventListener("dispose",s);let l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function r(){t=new WeakMap}return{get:i,dispose:r}}function jp(n){let t=[],e=[],i=[],s=n,r=n-Ci+1+hc.length;for(let o=0;o<r;o++){let a=Math.pow(2,s);e.push(a);let l=1/a;o>n-Ci?l=hc[o-n+Ci-1]:o===0&&(l=0),i.push(l);let u=1/(a-2),h=-u,m=1+u,c=[h,h,m,h,m,m,h,h,m,m,h,m],f=6,x=6,v=3,p=2,d=1,b=new Float32Array(v*x*f),y=new Float32Array(p*x*f),S=new Float32Array(d*x*f);for(let T=0;T<f;T++){let E=T%3*2/3-1,A=T>2?0:-1,N=[E,A,0,E+2/3,A,0,E+2/3,A+1,0,E,A,0,E+2/3,A+1,0,E,A+1,0];b.set(N,v*x*T),y.set(c,p*x*T);let g=[T,T,T,T,T,T];S.set(g,d*x*T)}let L=new Fe;L.setAttribute("position",new Ne(b,v)),L.setAttribute("uv",new Ne(y,p)),L.setAttribute("faceIndex",new Ne(S,d)),t.push(L),s>Ci&&s--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function dc(n,t,e){let i=new Rn(n,t,e);return i.texture.mapping=Nr,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function js(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function t0(n,t,e){let i=new Float32Array(ei),s=new I(0,1,0);return new gn({name:"SphericalGaussianBlur",defines:{n:ei,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:pl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:kn,depthTest:!1,depthWrite:!1})}function pc(){return new gn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:pl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:kn,depthTest:!1,depthWrite:!1})}function mc(){return new gn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:pl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:kn,depthTest:!1,depthWrite:!1})}function pl(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function e0(n){let t=new WeakMap,e=null;function i(a){if(a&&a.isTexture){let l=a.mapping,u=l===Wo||l===Xo,h=l===Fi||l===Oi;if(u||h){let m=t.get(a),c=m!==void 0?m.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==c)return e===null&&(e=new Hi(n)),m=u?e.fromEquirectangular(a,m):e.fromCubemap(a,m),m.texture.pmremVersion=a.pmremVersion,t.set(a,m),m.texture;if(m!==void 0)return m.texture;{let f=a.image;return u&&f&&f.height>0||h&&f&&s(f)?(e===null&&(e=new Hi(n)),m=u?e.fromEquirectangular(a):e.fromCubemap(a),m.texture.pmremVersion=a.pmremVersion,t.set(a,m),a.addEventListener("dispose",r),m.texture):null}}}return a}function s(a){let l=0,u=6;for(let h=0;h<u;h++)a[h]!==void 0&&l++;return l===u}function r(a){let l=a.target;l.removeEventListener("dispose",r);let u=t.get(l);u!==void 0&&(t.delete(l),u.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:o}}function n0(n){let t={};function e(i){if(t[i]!==void 0)return t[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){let s=e(i);return s===null&&cr("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function i0(n,t,e,i){let s={},r=new WeakMap;function o(m){let c=m.target;c.index!==null&&t.remove(c.index);for(let x in c.attributes)t.remove(c.attributes[x]);for(let x in c.morphAttributes){let v=c.morphAttributes[x];for(let p=0,d=v.length;p<d;p++)t.remove(v[p])}c.removeEventListener("dispose",o),delete s[c.id];let f=r.get(c);f&&(t.remove(f),r.delete(c)),i.releaseStatesOfGeometry(c),c.isInstancedBufferGeometry===!0&&delete c._maxInstanceCount,e.memory.geometries--}function a(m,c){return s[c.id]===!0||(c.addEventListener("dispose",o),s[c.id]=!0,e.memory.geometries++),c}function l(m){let c=m.attributes;for(let x in c)t.update(c[x],n.ARRAY_BUFFER);let f=m.morphAttributes;for(let x in f){let v=f[x];for(let p=0,d=v.length;p<d;p++)t.update(v[p],n.ARRAY_BUFFER)}}function u(m){let c=[],f=m.index,x=m.attributes.position,v=0;if(f!==null){let b=f.array;v=f.version;for(let y=0,S=b.length;y<S;y+=3){let L=b[y+0],T=b[y+1],E=b[y+2];c.push(L,T,T,E,E,L)}}else if(x!==void 0){let b=x.array;v=x.version;for(let y=0,S=b.length/3-1;y<S;y+=3){let L=y+0,T=y+1,E=y+2;c.push(L,T,T,E,E,L)}}else return;let p=new(th(c)?Mr:br)(c,1);p.version=v;let d=r.get(m);d&&t.remove(d),r.set(m,p)}function h(m){let c=r.get(m);if(c){let f=m.index;f!==null&&c.version<f.version&&u(m)}else u(m);return r.get(m)}return{get:a,update:l,getWireframeAttribute:h}}function s0(n,t,e){let i;function s(c){i=c}let r,o;function a(c){r=c.type,o=c.bytesPerElement}function l(c,f){n.drawElements(i,f,r,c*o),e.update(f,i,1)}function u(c,f,x){x!==0&&(n.drawElementsInstanced(i,f,r,c*o,x),e.update(f,i,x))}function h(c,f,x){if(x===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,r,c,0,x);let p=0;for(let d=0;d<x;d++)p+=f[d];e.update(p,i,1)}function m(c,f,x,v){if(x===0)return;let p=t.get("WEBGL_multi_draw");if(p===null)for(let d=0;d<c.length;d++)u(c[d]/o,f[d],v[d]);else{p.multiDrawElementsInstancedWEBGL(i,f,0,r,c,0,v,0,x);let d=0;for(let b=0;b<x;b++)d+=f[b];for(let b=0;b<v.length;b++)e.update(d,i,v[b])}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=u,this.renderMultiDraw=h,this.renderMultiDrawInstances=m}function r0(n){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(e.calls++,o){case n.TRIANGLES:e.triangles+=a*(r/3);break;case n.LINES:e.lines+=a*(r/2);break;case n.LINE_STRIP:e.lines+=a*(r-1);break;case n.LINE_LOOP:e.lines+=a*r;break;case n.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function o0(n,t,e){let i=new WeakMap,s=new ee;function r(o,a,l){let u=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,m=h!==void 0?h.length:0,c=i.get(a);if(c===void 0||c.count!==m){let N=function(){E.dispose(),i.delete(a),a.removeEventListener("dispose",N)};c!==void 0&&c.texture.dispose();let f=a.morphAttributes.position!==void 0,x=a.morphAttributes.normal!==void 0,v=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],d=a.morphAttributes.normal||[],b=a.morphAttributes.color||[],y=0;f===!0&&(y=1),x===!0&&(y=2),v===!0&&(y=3);let S=a.attributes.position.count*y,L=1;S>t.maxTextureSize&&(L=Math.ceil(S/t.maxTextureSize),S=t.maxTextureSize);let T=new Float32Array(S*L*4*m),E=new yr(T,S,L,m);E.type=mn,E.needsUpdate=!0;let A=y*4;for(let g=0;g<m;g++){let _=p[g],C=d[g],D=b[g],z=S*L*4*g;for(let $=0;$<_.count;$++){let O=$*A;f===!0&&(s.fromBufferAttribute(_,$),T[z+O+0]=s.x,T[z+O+1]=s.y,T[z+O+2]=s.z,T[z+O+3]=0),x===!0&&(s.fromBufferAttribute(C,$),T[z+O+4]=s.x,T[z+O+5]=s.y,T[z+O+6]=s.z,T[z+O+7]=0),v===!0&&(s.fromBufferAttribute(D,$),T[z+O+8]=s.x,T[z+O+9]=s.y,T[z+O+10]=s.z,T[z+O+11]=D.itemSize===4?s.w:1)}}c={count:m,texture:E,size:new It(S,L)},i.set(a,c),a.addEventListener("dispose",N)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,e);else{let f=0;for(let v=0;v<u.length;v++)f+=u[v];let x=a.morphTargetsRelative?1:1-f;l.getUniforms().setValue(n,"morphTargetBaseInfluence",x),l.getUniforms().setValue(n,"morphTargetInfluences",u)}l.getUniforms().setValue(n,"morphTargetsTexture",c.texture,e),l.getUniforms().setValue(n,"morphTargetsTextureSize",c.size)}return{update:r}}function a0(n,t,e,i){let s=new WeakMap;function r(l){let u=i.render.frame,h=l.geometry,m=t.get(l,h);if(s.get(m)!==u&&(t.update(m),s.set(m,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==u&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,u))),l.isSkinnedMesh){let c=l.skeleton;s.get(c)!==u&&(c.update(),s.set(c,u))}return m}function o(){s=new WeakMap}function a(l){let u=l.target;u.removeEventListener("dispose",a),e.remove(u.instanceMatrix),u.instanceColor!==null&&e.remove(u.instanceColor)}return{update:r,dispose:o}}function $i(n,t,e){let i=n[0];if(i<=0||i>0)return n;let s=t*e,r=xc[s];if(r===void 0&&(r=new Float32Array(s),xc[s]=r),t!==0){i.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,n[o].toArray(r,a)}return r}function xe(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function _e(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function Or(n,t){let e=_c[t];e===void 0&&(e=new Int32Array(t),_c[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function l0(n,t){let e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function c0(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(xe(e,t))return;n.uniform2fv(this.addr,t),_e(e,t)}}function h0(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(xe(e,t))return;n.uniform3fv(this.addr,t),_e(e,t)}}function u0(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(xe(e,t))return;n.uniform4fv(this.addr,t),_e(e,t)}}function f0(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(xe(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),_e(e,t)}else{if(xe(e,i))return;bc.set(i),n.uniformMatrix2fv(this.addr,!1,bc),_e(e,i)}}function d0(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(xe(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),_e(e,t)}else{if(xe(e,i))return;vc.set(i),n.uniformMatrix3fv(this.addr,!1,vc),_e(e,i)}}function p0(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(xe(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),_e(e,t)}else{if(xe(e,i))return;yc.set(i),n.uniformMatrix4fv(this.addr,!1,yc),_e(e,i)}}function m0(n,t){let e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function g0(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(xe(e,t))return;n.uniform2iv(this.addr,t),_e(e,t)}}function x0(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(xe(e,t))return;n.uniform3iv(this.addr,t),_e(e,t)}}function _0(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(xe(e,t))return;n.uniform4iv(this.addr,t),_e(e,t)}}function y0(n,t){let e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function v0(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(xe(e,t))return;n.uniform2uiv(this.addr,t),_e(e,t)}}function b0(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(xe(e,t))return;n.uniform3uiv(this.addr,t),_e(e,t)}}function M0(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(xe(e,t))return;n.uniform4uiv(this.addr,t),_e(e,t)}}function S0(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(gc.compareFunction=jc,r=gc):r=sh,e.setTexture2D(t||r,s)}function E0(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||oh,s)}function w0(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||ah,s)}function T0(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||rh,s)}function A0(n){switch(n){case 5126:return l0;case 35664:return c0;case 35665:return h0;case 35666:return u0;case 35674:return f0;case 35675:return d0;case 35676:return p0;case 5124:case 35670:return m0;case 35667:case 35671:return g0;case 35668:case 35672:return x0;case 35669:case 35673:return _0;case 5125:return y0;case 36294:return v0;case 36295:return b0;case 36296:return M0;case 35678:case 36198:case 36298:case 36306:case 35682:return S0;case 35679:case 36299:case 36307:return E0;case 35680:case 36300:case 36308:case 36293:return w0;case 36289:case 36303:case 36311:case 36292:return T0}}function R0(n,t){n.uniform1fv(this.addr,t)}function C0(n,t){let e=$i(t,this.size,2);n.uniform2fv(this.addr,e)}function P0(n,t){let e=$i(t,this.size,3);n.uniform3fv(this.addr,e)}function I0(n,t){let e=$i(t,this.size,4);n.uniform4fv(this.addr,e)}function L0(n,t){let e=$i(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function D0(n,t){let e=$i(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function U0(n,t){let e=$i(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function N0(n,t){n.uniform1iv(this.addr,t)}function F0(n,t){n.uniform2iv(this.addr,t)}function O0(n,t){n.uniform3iv(this.addr,t)}function z0(n,t){n.uniform4iv(this.addr,t)}function k0(n,t){n.uniform1uiv(this.addr,t)}function B0(n,t){n.uniform2uiv(this.addr,t)}function H0(n,t){n.uniform3uiv(this.addr,t)}function V0(n,t){n.uniform4uiv(this.addr,t)}function G0(n,t,e){let i=this.cache,s=t.length,r=Or(e,s);xe(i,r)||(n.uniform1iv(this.addr,r),_e(i,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||sh,r[o])}function W0(n,t,e){let i=this.cache,s=t.length,r=Or(e,s);xe(i,r)||(n.uniform1iv(this.addr,r),_e(i,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||oh,r[o])}function X0(n,t,e){let i=this.cache,s=t.length,r=Or(e,s);xe(i,r)||(n.uniform1iv(this.addr,r),_e(i,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||ah,r[o])}function q0(n,t,e){let i=this.cache,s=t.length,r=Or(e,s);xe(i,r)||(n.uniform1iv(this.addr,r),_e(i,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||rh,r[o])}function Y0(n){switch(n){case 5126:return R0;case 35664:return C0;case 35665:return P0;case 35666:return I0;case 35674:return L0;case 35675:return D0;case 35676:return U0;case 5124:case 35670:return N0;case 35667:case 35671:return F0;case 35668:case 35672:return O0;case 35669:case 35673:return z0;case 5125:return k0;case 36294:return B0;case 36295:return H0;case 36296:return V0;case 35678:case 36198:case 36298:case 36306:case 35682:return G0;case 35679:case 36299:case 36307:return W0;case 35680:case 36300:case 36308:case 36293:return X0;case 36289:case 36303:case 36311:case 36292:return q0}}function Mc(n,t){n.seq.push(t),n.map[t.id]=t}function Z0(n,t,e){let i=n.name,s=i.length;for(Co.lastIndex=0;;){let r=Co.exec(i),o=Co.lastIndex,a=r[1],l=r[2]==="]",u=r[3];if(l&&(a=a|0),u===void 0||u==="["&&o+2===s){Mc(e,u===void 0?new Ta(a,n,t):new Aa(a,n,t));break}else{let m=e.map[a];m===void 0&&(m=new Ra(a),Mc(e,m)),e=m}}}function Sc(n,t,e){let i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}function K0(n,t){let e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){let a=o+1;i.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return i.join(`
`)}function Q0(n){let t=Jt.getPrimaries(Jt.workingColorSpace),e=Jt.getPrimaries(n),i;switch(t===e?i="":t===pr&&e===dr?i="LinearDisplayP3ToLinearSRGB":t===dr&&e===pr&&(i="LinearSRGBToLinearDisplayP3"),n){case Wn:case Fr:return[i,"LinearTransferOETF"];case Ge:case dl:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[i,"LinearTransferOETF"]}}function Ec(n,t,e){let i=n.getShaderParameter(t,n.COMPILE_STATUS),s=n.getShaderInfoLog(t).trim();if(i&&s==="")return"";let r=/ERROR: 0:(\d+)/.exec(s);if(r){let o=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+K0(n.getShaderSource(t),o)}else return s}function j0(n,t){let e=Q0(t);return`vec4 ${n}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function tm(n,t){let e;switch(t){case Eu:e="Linear";break;case wu:e="Reinhard";break;case Tu:e="Cineon";break;case rl:e="ACESFilmic";break;case Ru:e="AgX";break;case Cu:e="Neutral";break;case Au:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function em(){Jt.getLuminanceCoefficients(tr);let n=tr.x.toFixed(4),t=tr.y.toFixed(4),e=tr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function nm(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ds).join(`
`)}function im(n){let t=[];for(let e in n){let i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function sm(n,t){let e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){let r=n.getActiveAttrib(t,s),o=r.name,a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:n.getAttribLocation(t,o),locationSize:a}}return e}function ds(n){return n!==""}function wc(n,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Tc(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}function Ca(n){return n.replace(rm,am)}function am(n,t){let e=Bt[t];if(e===void 0){let i=om.get(t);if(i!==void 0)e=Bt[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return Ca(e)}function Ac(n){return n.replace(lm,cm)}function cm(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Rc(n){let t=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?t+=`
#define HIGH_PRECISION`:n.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function hm(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Bc?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===sl?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===En&&(t="SHADOWMAP_TYPE_VSM"),t}function um(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Fi:case Oi:t="ENVMAP_TYPE_CUBE";break;case Nr:t="ENVMAP_TYPE_CUBE_UV";break}return t}function fm(n){let t="ENVMAP_MODE_REFLECTION";return n.envMap&&n.envMapMode===Oi&&(t="ENVMAP_MODE_REFRACTION"),t}function dm(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Hc:t="ENVMAP_BLENDING_MULTIPLY";break;case Mu:t="ENVMAP_BLENDING_MIX";break;case Su:t="ENVMAP_BLENDING_ADD";break}return t}function pm(n){let t=n.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function mm(n,t,e,i){let s=n.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,l=hm(e),u=um(e),h=fm(e),m=dm(e),c=pm(e),f=nm(e),x=im(r),v=s.createProgram(),p,d,b=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x].filter(ds).join(`
`),p.length>0&&(p+=`
`),d=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x].filter(ds).join(`
`),d.length>0&&(d+=`
`)):(p=[Rc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ds).join(`
`),d=[Rc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.envMap?"#define "+h:"",e.envMap?"#define "+m:"",c?"#define CUBEUV_TEXEL_WIDTH "+c.texelWidth:"",c?"#define CUBEUV_TEXEL_HEIGHT "+c.texelHeight:"",c?"#define CUBEUV_MAX_MIP "+c.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Bn?"#define TONE_MAPPING":"",e.toneMapping!==Bn?Bt.tonemapping_pars_fragment:"",e.toneMapping!==Bn?tm("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Bt.colorspace_pars_fragment,j0("linearToOutputTexel",e.outputColorSpace),em(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ds).join(`
`)),o=Ca(o),o=wc(o,e),o=Tc(o,e),a=Ca(a),a=wc(a,e),a=Tc(a,e),o=Ac(o),a=Ac(a),e.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,p=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,d=["#define varying in",e.glslVersion===ql?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===ql?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);let y=b+p+o,S=b+d+a,L=Sc(s,s.VERTEX_SHADER,y),T=Sc(s,s.FRAGMENT_SHADER,S);s.attachShader(v,L),s.attachShader(v,T),e.index0AttributeName!==void 0?s.bindAttribLocation(v,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function E(_){if(n.debug.checkShaderErrors){let C=s.getProgramInfoLog(v).trim(),D=s.getShaderInfoLog(L).trim(),z=s.getShaderInfoLog(T).trim(),$=!0,O=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if($=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,v,L,T);else{let Q=Ec(s,L,"vertex"),X=Ec(s,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+_.name+`
Material Type: `+_.type+`

Program Info Log: `+C+`
`+Q+`
`+X)}else C!==""?console.warn("THREE.WebGLProgram: Program Info Log:",C):(D===""||z==="")&&(O=!1);O&&(_.diagnostics={runnable:$,programLog:C,vertexShader:{log:D,prefix:p},fragmentShader:{log:z,prefix:d}})}s.deleteShader(L),s.deleteShader(T),A=new Ui(s,v),N=sm(s,v)}let A;this.getUniforms=function(){return A===void 0&&E(this),A};let N;this.getAttributes=function(){return N===void 0&&E(this),N};let g=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return g===!1&&(g=s.getProgramParameter(v,$0)),g},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=J0++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=L,this.fragmentShader=T,this}function xm(n,t,e,i,s,r,o){let a=new vr,l=new Pa,u=new Set,h=[],m=s.logarithmicDepthBuffer,c=s.reverseDepthBuffer,f=s.vertexTextures,x=s.precision,v={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(g){return u.add(g),g===0?"uv":`uv${g}`}function d(g,_,C,D,z){let $=D.fog,O=z.geometry,Q=g.isMeshStandardMaterial?D.environment:null,X=(g.isMeshStandardMaterial?e:t).get(g.envMap||Q),ot=X&&X.mapping===Nr?X.image.height:null,et=v[g.type];g.precision!==null&&(x=s.getMaxPrecision(g.precision),x!==g.precision&&console.warn("THREE.WebGLProgram.getParameters:",g.precision,"not supported, using",x,"instead."));let it=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,Et=it!==void 0?it.length:0,Nt=0;O.morphAttributes.position!==void 0&&(Nt=1),O.morphAttributes.normal!==void 0&&(Nt=2),O.morphAttributes.color!==void 0&&(Nt=3);let V,U,Y,q;if(et){let He=dn[et];V=He.vertexShader,U=He.fragmentShader}else V=g.vertexShader,U=g.fragmentShader,l.update(g),Y=l.getVertexShaderID(g),q=l.getFragmentShaderID(g);let st=n.getRenderTarget(),tt=z.isInstancedMesh===!0,mt=z.isBatchedMesh===!0,Lt=!!g.map,gt=!!g.matcap,P=!!X,zt=!!g.aoMap,At=!!g.lightMap,Rt=!!g.bumpMap,Mt=!!g.normalMap,Gt=!!g.displacementMap,wt=!!g.emissiveMap,R=!!g.metalnessMap,M=!!g.roughnessMap,H=g.anisotropy>0,J=g.clearcoat>0,nt=g.dispersion>0,K=g.iridescence>0,bt=g.sheen>0,lt=g.transmission>0,ft=H&&!!g.anisotropyMap,Wt=J&&!!g.clearcoatMap,rt=J&&!!g.clearcoatNormalMap,xt=J&&!!g.clearcoatRoughnessMap,Ft=K&&!!g.iridescenceMap,Ot=K&&!!g.iridescenceThicknessMap,_t=bt&&!!g.sheenColorMap,Xt=bt&&!!g.sheenRoughnessMap,kt=!!g.specularMap,ie=!!g.specularColorMap,F=!!g.specularIntensityMap,dt=lt&&!!g.transmissionMap,Z=lt&&!!g.thicknessMap,j=!!g.gradientMap,ht=!!g.alphaMap,pt=g.alphaTest>0,qt=!!g.alphaHash,pe=!!g.extensions,Be=Bn;g.toneMapped&&(st===null||st.isXRRenderTarget===!0)&&(Be=n.toneMapping);let Yt={shaderID:et,shaderType:g.type,shaderName:g.name,vertexShader:V,fragmentShader:U,defines:g.defines,customVertexShaderID:Y,customFragmentShaderID:q,isRawShaderMaterial:g.isRawShaderMaterial===!0,glslVersion:g.glslVersion,precision:x,batching:mt,batchingColor:mt&&z._colorsTexture!==null,instancing:tt,instancingColor:tt&&z.instanceColor!==null,instancingMorph:tt&&z.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:st===null?n.outputColorSpace:st.isXRRenderTarget===!0?st.texture.colorSpace:Wn,alphaToCoverage:!!g.alphaToCoverage,map:Lt,matcap:gt,envMap:P,envMapMode:P&&X.mapping,envMapCubeUVHeight:ot,aoMap:zt,lightMap:At,bumpMap:Rt,normalMap:Mt,displacementMap:f&&Gt,emissiveMap:wt,normalMapObjectSpace:Mt&&g.normalMapType===Du,normalMapTangentSpace:Mt&&g.normalMapType===Qc,metalnessMap:R,roughnessMap:M,anisotropy:H,anisotropyMap:ft,clearcoat:J,clearcoatMap:Wt,clearcoatNormalMap:rt,clearcoatRoughnessMap:xt,dispersion:nt,iridescence:K,iridescenceMap:Ft,iridescenceThicknessMap:Ot,sheen:bt,sheenColorMap:_t,sheenRoughnessMap:Xt,specularMap:kt,specularColorMap:ie,specularIntensityMap:F,transmission:lt,transmissionMap:dt,thicknessMap:Z,gradientMap:j,opaque:g.transparent===!1&&g.blending===Ii&&g.alphaToCoverage===!1,alphaMap:ht,alphaTest:pt,alphaHash:qt,combine:g.combine,mapUv:Lt&&p(g.map.channel),aoMapUv:zt&&p(g.aoMap.channel),lightMapUv:At&&p(g.lightMap.channel),bumpMapUv:Rt&&p(g.bumpMap.channel),normalMapUv:Mt&&p(g.normalMap.channel),displacementMapUv:Gt&&p(g.displacementMap.channel),emissiveMapUv:wt&&p(g.emissiveMap.channel),metalnessMapUv:R&&p(g.metalnessMap.channel),roughnessMapUv:M&&p(g.roughnessMap.channel),anisotropyMapUv:ft&&p(g.anisotropyMap.channel),clearcoatMapUv:Wt&&p(g.clearcoatMap.channel),clearcoatNormalMapUv:rt&&p(g.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:xt&&p(g.clearcoatRoughnessMap.channel),iridescenceMapUv:Ft&&p(g.iridescenceMap.channel),iridescenceThicknessMapUv:Ot&&p(g.iridescenceThicknessMap.channel),sheenColorMapUv:_t&&p(g.sheenColorMap.channel),sheenRoughnessMapUv:Xt&&p(g.sheenRoughnessMap.channel),specularMapUv:kt&&p(g.specularMap.channel),specularColorMapUv:ie&&p(g.specularColorMap.channel),specularIntensityMapUv:F&&p(g.specularIntensityMap.channel),transmissionMapUv:dt&&p(g.transmissionMap.channel),thicknessMapUv:Z&&p(g.thicknessMap.channel),alphaMapUv:ht&&p(g.alphaMap.channel),vertexTangents:!!O.attributes.tangent&&(Mt||H),vertexColors:g.vertexColors,vertexAlphas:g.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,pointsUvs:z.isPoints===!0&&!!O.attributes.uv&&(Lt||ht),fog:!!$,useFog:g.fog===!0,fogExp2:!!$&&$.isFogExp2,flatShading:g.flatShading===!0,sizeAttenuation:g.sizeAttenuation===!0,logarithmicDepthBuffer:m,reverseDepthBuffer:c,skinning:z.isSkinnedMesh===!0,morphTargets:O.morphAttributes.position!==void 0,morphNormals:O.morphAttributes.normal!==void 0,morphColors:O.morphAttributes.color!==void 0,morphTargetsCount:Et,morphTextureStride:Nt,numDirLights:_.directional.length,numPointLights:_.point.length,numSpotLights:_.spot.length,numSpotLightMaps:_.spotLightMap.length,numRectAreaLights:_.rectArea.length,numHemiLights:_.hemi.length,numDirLightShadows:_.directionalShadowMap.length,numPointLightShadows:_.pointShadowMap.length,numSpotLightShadows:_.spotShadowMap.length,numSpotLightShadowsWithMaps:_.numSpotLightShadowsWithMaps,numLightProbes:_.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:g.dithering,shadowMapEnabled:n.shadowMap.enabled&&C.length>0,shadowMapType:n.shadowMap.type,toneMapping:Be,decodeVideoTexture:Lt&&g.map.isVideoTexture===!0&&Jt.getTransfer(g.map.colorSpace)===ae,premultipliedAlpha:g.premultipliedAlpha,doubleSided:g.side===Kt,flipSided:g.side===Le,useDepthPacking:g.depthPacking>=0,depthPacking:g.depthPacking||0,index0AttributeName:g.index0AttributeName,extensionClipCullDistance:pe&&g.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(pe&&g.extensions.multiDraw===!0||mt)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:g.customProgramCacheKey()};return Yt.vertexUv1s=u.has(1),Yt.vertexUv2s=u.has(2),Yt.vertexUv3s=u.has(3),u.clear(),Yt}function b(g){let _=[];if(g.shaderID?_.push(g.shaderID):(_.push(g.customVertexShaderID),_.push(g.customFragmentShaderID)),g.defines!==void 0)for(let C in g.defines)_.push(C),_.push(g.defines[C]);return g.isRawShaderMaterial===!1&&(y(_,g),S(_,g),_.push(n.outputColorSpace)),_.push(g.customProgramCacheKey),_.join()}function y(g,_){g.push(_.precision),g.push(_.outputColorSpace),g.push(_.envMapMode),g.push(_.envMapCubeUVHeight),g.push(_.mapUv),g.push(_.alphaMapUv),g.push(_.lightMapUv),g.push(_.aoMapUv),g.push(_.bumpMapUv),g.push(_.normalMapUv),g.push(_.displacementMapUv),g.push(_.emissiveMapUv),g.push(_.metalnessMapUv),g.push(_.roughnessMapUv),g.push(_.anisotropyMapUv),g.push(_.clearcoatMapUv),g.push(_.clearcoatNormalMapUv),g.push(_.clearcoatRoughnessMapUv),g.push(_.iridescenceMapUv),g.push(_.iridescenceThicknessMapUv),g.push(_.sheenColorMapUv),g.push(_.sheenRoughnessMapUv),g.push(_.specularMapUv),g.push(_.specularColorMapUv),g.push(_.specularIntensityMapUv),g.push(_.transmissionMapUv),g.push(_.thicknessMapUv),g.push(_.combine),g.push(_.fogExp2),g.push(_.sizeAttenuation),g.push(_.morphTargetsCount),g.push(_.morphAttributeCount),g.push(_.numDirLights),g.push(_.numPointLights),g.push(_.numSpotLights),g.push(_.numSpotLightMaps),g.push(_.numHemiLights),g.push(_.numRectAreaLights),g.push(_.numDirLightShadows),g.push(_.numPointLightShadows),g.push(_.numSpotLightShadows),g.push(_.numSpotLightShadowsWithMaps),g.push(_.numLightProbes),g.push(_.shadowMapType),g.push(_.toneMapping),g.push(_.numClippingPlanes),g.push(_.numClipIntersection),g.push(_.depthPacking)}function S(g,_){a.disableAll(),_.supportsVertexTextures&&a.enable(0),_.instancing&&a.enable(1),_.instancingColor&&a.enable(2),_.instancingMorph&&a.enable(3),_.matcap&&a.enable(4),_.envMap&&a.enable(5),_.normalMapObjectSpace&&a.enable(6),_.normalMapTangentSpace&&a.enable(7),_.clearcoat&&a.enable(8),_.iridescence&&a.enable(9),_.alphaTest&&a.enable(10),_.vertexColors&&a.enable(11),_.vertexAlphas&&a.enable(12),_.vertexUv1s&&a.enable(13),_.vertexUv2s&&a.enable(14),_.vertexUv3s&&a.enable(15),_.vertexTangents&&a.enable(16),_.anisotropy&&a.enable(17),_.alphaHash&&a.enable(18),_.batching&&a.enable(19),_.dispersion&&a.enable(20),_.batchingColor&&a.enable(21),g.push(a.mask),a.disableAll(),_.fog&&a.enable(0),_.useFog&&a.enable(1),_.flatShading&&a.enable(2),_.logarithmicDepthBuffer&&a.enable(3),_.reverseDepthBuffer&&a.enable(4),_.skinning&&a.enable(5),_.morphTargets&&a.enable(6),_.morphNormals&&a.enable(7),_.morphColors&&a.enable(8),_.premultipliedAlpha&&a.enable(9),_.shadowMapEnabled&&a.enable(10),_.doubleSided&&a.enable(11),_.flipSided&&a.enable(12),_.useDepthPacking&&a.enable(13),_.dithering&&a.enable(14),_.transmission&&a.enable(15),_.sheen&&a.enable(16),_.opaque&&a.enable(17),_.pointsUvs&&a.enable(18),_.decodeVideoTexture&&a.enable(19),_.alphaToCoverage&&a.enable(20),g.push(a.mask)}function L(g){let _=v[g.type],C;if(_){let D=dn[_];C=af.clone(D.uniforms)}else C=g.uniforms;return C}function T(g,_){let C;for(let D=0,z=h.length;D<z;D++){let $=h[D];if($.cacheKey===_){C=$,++C.usedTimes;break}}return C===void 0&&(C=new mm(n,_,g,r),h.push(C)),C}function E(g){if(--g.usedTimes===0){let _=h.indexOf(g);h[_]=h[h.length-1],h.pop(),g.destroy()}}function A(g){l.remove(g)}function N(){l.dispose()}return{getParameters:d,getProgramCacheKey:b,getUniforms:L,acquireProgram:T,releaseProgram:E,releaseShaderCache:A,programs:h,dispose:N}}function _m(){let n=new WeakMap;function t(o){return n.has(o)}function e(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function s(o,a,l){n.get(o)[a]=l}function r(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:r}}function ym(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function Cc(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function Pc(){let n=[],t=0,e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function o(m,c,f,x,v,p){let d=n[t];return d===void 0?(d={id:m.id,object:m,geometry:c,material:f,groupOrder:x,renderOrder:m.renderOrder,z:v,group:p},n[t]=d):(d.id=m.id,d.object=m,d.geometry=c,d.material=f,d.groupOrder=x,d.renderOrder=m.renderOrder,d.z=v,d.group=p),t++,d}function a(m,c,f,x,v,p){let d=o(m,c,f,x,v,p);f.transmission>0?i.push(d):f.transparent===!0?s.push(d):e.push(d)}function l(m,c,f,x,v,p){let d=o(m,c,f,x,v,p);f.transmission>0?i.unshift(d):f.transparent===!0?s.unshift(d):e.unshift(d)}function u(m,c){e.length>1&&e.sort(m||ym),i.length>1&&i.sort(c||Cc),s.length>1&&s.sort(c||Cc)}function h(){for(let m=t,c=n.length;m<c;m++){let f=n[m];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:a,unshift:l,finish:h,sort:u}}function vm(){let n=new WeakMap;function t(i,s){let r=n.get(i),o;return r===void 0?(o=new Pc,n.set(i,[o])):s>=r.length?(o=new Pc,r.push(o)):o=r[s],o}function e(){n=new WeakMap}return{get:t,dispose:e}}function bm(){let n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new I,color:new Pt};break;case"SpotLight":e={position:new I,direction:new I,color:new Pt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new I,color:new Pt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new I,skyColor:new Pt,groundColor:new Pt};break;case"RectAreaLight":e={color:new Pt,position:new I,halfWidth:new I,halfHeight:new I};break}return n[t.id]=e,e}}}function Mm(){let n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new It};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new It};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new It,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}function Em(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function wm(n){let t=new bm,e=Mm(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)i.probe.push(new I);let s=new I,r=new Vt,o=new Vt;function a(u){let h=0,m=0,c=0;for(let N=0;N<9;N++)i.probe[N].set(0,0,0);let f=0,x=0,v=0,p=0,d=0,b=0,y=0,S=0,L=0,T=0,E=0;u.sort(Em);for(let N=0,g=u.length;N<g;N++){let _=u[N],C=_.color,D=_.intensity,z=_.distance,$=_.shadow&&_.shadow.map?_.shadow.map.texture:null;if(_.isAmbientLight)h+=C.r*D,m+=C.g*D,c+=C.b*D;else if(_.isLightProbe){for(let O=0;O<9;O++)i.probe[O].addScaledVector(_.sh.coefficients[O],D);E++}else if(_.isDirectionalLight){let O=t.get(_);if(O.color.copy(_.color).multiplyScalar(_.intensity),_.castShadow){let Q=_.shadow,X=e.get(_);X.shadowIntensity=Q.intensity,X.shadowBias=Q.bias,X.shadowNormalBias=Q.normalBias,X.shadowRadius=Q.radius,X.shadowMapSize=Q.mapSize,i.directionalShadow[f]=X,i.directionalShadowMap[f]=$,i.directionalShadowMatrix[f]=_.shadow.matrix,b++}i.directional[f]=O,f++}else if(_.isSpotLight){let O=t.get(_);O.position.setFromMatrixPosition(_.matrixWorld),O.color.copy(C).multiplyScalar(D),O.distance=z,O.coneCos=Math.cos(_.angle),O.penumbraCos=Math.cos(_.angle*(1-_.penumbra)),O.decay=_.decay,i.spot[v]=O;let Q=_.shadow;if(_.map&&(i.spotLightMap[L]=_.map,L++,Q.updateMatrices(_),_.castShadow&&T++),i.spotLightMatrix[v]=Q.matrix,_.castShadow){let X=e.get(_);X.shadowIntensity=Q.intensity,X.shadowBias=Q.bias,X.shadowNormalBias=Q.normalBias,X.shadowRadius=Q.radius,X.shadowMapSize=Q.mapSize,i.spotShadow[v]=X,i.spotShadowMap[v]=$,S++}v++}else if(_.isRectAreaLight){let O=t.get(_);O.color.copy(C).multiplyScalar(D),O.halfWidth.set(_.width*.5,0,0),O.halfHeight.set(0,_.height*.5,0),i.rectArea[p]=O,p++}else if(_.isPointLight){let O=t.get(_);if(O.color.copy(_.color).multiplyScalar(_.intensity),O.distance=_.distance,O.decay=_.decay,_.castShadow){let Q=_.shadow,X=e.get(_);X.shadowIntensity=Q.intensity,X.shadowBias=Q.bias,X.shadowNormalBias=Q.normalBias,X.shadowRadius=Q.radius,X.shadowMapSize=Q.mapSize,X.shadowCameraNear=Q.camera.near,X.shadowCameraFar=Q.camera.far,i.pointShadow[x]=X,i.pointShadowMap[x]=$,i.pointShadowMatrix[x]=_.shadow.matrix,y++}i.point[x]=O,x++}else if(_.isHemisphereLight){let O=t.get(_);O.skyColor.copy(_.color).multiplyScalar(D),O.groundColor.copy(_.groundColor).multiplyScalar(D),i.hemi[d]=O,d++}}p>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ct.LTC_FLOAT_1,i.rectAreaLTC2=ct.LTC_FLOAT_2):(i.rectAreaLTC1=ct.LTC_HALF_1,i.rectAreaLTC2=ct.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=m,i.ambient[2]=c;let A=i.hash;(A.directionalLength!==f||A.pointLength!==x||A.spotLength!==v||A.rectAreaLength!==p||A.hemiLength!==d||A.numDirectionalShadows!==b||A.numPointShadows!==y||A.numSpotShadows!==S||A.numSpotMaps!==L||A.numLightProbes!==E)&&(i.directional.length=f,i.spot.length=v,i.rectArea.length=p,i.point.length=x,i.hemi.length=d,i.directionalShadow.length=b,i.directionalShadowMap.length=b,i.pointShadow.length=y,i.pointShadowMap.length=y,i.spotShadow.length=S,i.spotShadowMap.length=S,i.directionalShadowMatrix.length=b,i.pointShadowMatrix.length=y,i.spotLightMatrix.length=S+L-T,i.spotLightMap.length=L,i.numSpotLightShadowsWithMaps=T,i.numLightProbes=E,A.directionalLength=f,A.pointLength=x,A.spotLength=v,A.rectAreaLength=p,A.hemiLength=d,A.numDirectionalShadows=b,A.numPointShadows=y,A.numSpotShadows=S,A.numSpotMaps=L,A.numLightProbes=E,i.version=Sm++)}function l(u,h){let m=0,c=0,f=0,x=0,v=0,p=h.matrixWorldInverse;for(let d=0,b=u.length;d<b;d++){let y=u[d];if(y.isDirectionalLight){let S=i.directional[m];S.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(p),m++}else if(y.isSpotLight){let S=i.spot[f];S.position.setFromMatrixPosition(y.matrixWorld),S.position.applyMatrix4(p),S.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(p),f++}else if(y.isRectAreaLight){let S=i.rectArea[x];S.position.setFromMatrixPosition(y.matrixWorld),S.position.applyMatrix4(p),o.identity(),r.copy(y.matrixWorld),r.premultiply(p),o.extractRotation(r),S.halfWidth.set(y.width*.5,0,0),S.halfHeight.set(0,y.height*.5,0),S.halfWidth.applyMatrix4(o),S.halfHeight.applyMatrix4(o),x++}else if(y.isPointLight){let S=i.point[c];S.position.setFromMatrixPosition(y.matrixWorld),S.position.applyMatrix4(p),c++}else if(y.isHemisphereLight){let S=i.hemi[v];S.direction.setFromMatrixPosition(y.matrixWorld),S.direction.transformDirection(p),v++}}}return{setup:a,setupView:l,state:i}}function Ic(n){let t=new wm(n),e=[],i=[];function s(h){u.camera=h,e.length=0,i.length=0}function r(h){e.push(h)}function o(h){i.push(h)}function a(){t.setup(e)}function l(h){t.setupView(e,h)}let u={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:u,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function Tm(n){let t=new WeakMap;function e(s,r=0){let o=t.get(s),a;return o===void 0?(a=new Ic(n),t.set(s,[a])):r>=o.length?(a=new Ic(n),o.push(a)):a=o[r],a}function i(){t=new WeakMap}return{get:e,dispose:i}}function Cm(n,t,e){let i=new ys,s=new It,r=new It,o=new ee,a=new La({depthPacking:Lu}),l=new Da,u={},h=e.maxTextureSize,m={[Hn]:Le,[Le]:Hn,[Kt]:Kt},c=new gn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new It},radius:{value:4}},vertexShader:Am,fragmentShader:Rm}),f=c.clone();f.defines.HORIZONTAL_PASS=1;let x=new Fe;x.setAttribute("position",new Ne(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let v=new jt(x,c),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Bc;let d=this.type;this.render=function(T,E,A){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||T.length===0)return;let N=n.getRenderTarget(),g=n.getActiveCubeFace(),_=n.getActiveMipmapLevel(),C=n.state;C.setBlending(kn),C.buffers.color.setClear(1,1,1,1),C.buffers.depth.setTest(!0),C.setScissorTest(!1);let D=d!==En&&this.type===En,z=d===En&&this.type!==En;for(let $=0,O=T.length;$<O;$++){let Q=T[$],X=Q.shadow;if(X===void 0){console.warn("THREE.WebGLShadowMap:",Q,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;s.copy(X.mapSize);let ot=X.getFrameExtents();if(s.multiply(ot),r.copy(X.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/ot.x),s.x=r.x*ot.x,X.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/ot.y),s.y=r.y*ot.y,X.mapSize.y=r.y)),X.map===null||D===!0||z===!0){let it=this.type!==En?{minFilter:We,magFilter:We}:{};X.map!==null&&X.map.dispose(),X.map=new Rn(s.x,s.y,it),X.map.texture.name=Q.name+".shadowMap",X.camera.updateProjectionMatrix()}n.setRenderTarget(X.map),n.clear();let et=X.getViewportCount();for(let it=0;it<et;it++){let Et=X.getViewport(it);o.set(r.x*Et.x,r.y*Et.y,r.x*Et.z,r.y*Et.w),C.viewport(o),X.updateMatrices(Q,it),i=X.getFrustum(),S(E,A,X.camera,Q,this.type)}X.isPointLightShadow!==!0&&this.type===En&&b(X,A),X.needsUpdate=!1}d=this.type,p.needsUpdate=!1,n.setRenderTarget(N,g,_)};function b(T,E){let A=t.update(v);c.defines.VSM_SAMPLES!==T.blurSamples&&(c.defines.VSM_SAMPLES=T.blurSamples,f.defines.VSM_SAMPLES=T.blurSamples,c.needsUpdate=!0,f.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new Rn(s.x,s.y)),c.uniforms.shadow_pass.value=T.map.texture,c.uniforms.resolution.value=T.mapSize,c.uniforms.radius.value=T.radius,n.setRenderTarget(T.mapPass),n.clear(),n.renderBufferDirect(E,null,A,c,v,null),f.uniforms.shadow_pass.value=T.mapPass.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,n.setRenderTarget(T.map),n.clear(),n.renderBufferDirect(E,null,A,f,v,null)}function y(T,E,A,N){let g=null,_=A.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(_!==void 0)g=_;else if(g=A.isPointLight===!0?l:a,n.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0){let C=g.uuid,D=E.uuid,z=u[C];z===void 0&&(z={},u[C]=z);let $=z[D];$===void 0&&($=g.clone(),z[D]=$,E.addEventListener("dispose",L)),g=$}if(g.visible=E.visible,g.wireframe=E.wireframe,N===En?g.side=E.shadowSide!==null?E.shadowSide:E.side:g.side=E.shadowSide!==null?E.shadowSide:m[E.side],g.alphaMap=E.alphaMap,g.alphaTest=E.alphaTest,g.map=E.map,g.clipShadows=E.clipShadows,g.clippingPlanes=E.clippingPlanes,g.clipIntersection=E.clipIntersection,g.displacementMap=E.displacementMap,g.displacementScale=E.displacementScale,g.displacementBias=E.displacementBias,g.wireframeLinewidth=E.wireframeLinewidth,g.linewidth=E.linewidth,A.isPointLight===!0&&g.isMeshDistanceMaterial===!0){let C=n.properties.get(g);C.light=A}return g}function S(T,E,A,N,g){if(T.visible===!1)return;if(T.layers.test(E.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&g===En)&&(!T.frustumCulled||i.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(A.matrixWorldInverse,T.matrixWorld);let D=t.update(T),z=T.material;if(Array.isArray(z)){let $=D.groups;for(let O=0,Q=$.length;O<Q;O++){let X=$[O],ot=z[X.materialIndex];if(ot&&ot.visible){let et=y(T,ot,N,g);T.onBeforeShadow(n,T,E,A,D,et,X),n.renderBufferDirect(A,null,D,et,T,X),T.onAfterShadow(n,T,E,A,D,et,X)}}}else if(z.visible){let $=y(T,z,N,g);T.onBeforeShadow(n,T,E,A,D,$,null),n.renderBufferDirect(A,null,D,$,T,null),T.onAfterShadow(n,T,E,A,D,$,null)}}let C=T.children;for(let D=0,z=C.length;D<z;D++)S(C[D],E,A,N,g)}function L(T){T.target.removeEventListener("dispose",L);for(let A in u){let N=u[A],g=T.target.uuid;g in N&&(N[g].dispose(),delete N[g])}}}function Im(n){function t(){let F=!1,dt=new ee,Z=null,j=new ee(0,0,0,0);return{setMask:function(ht){Z!==ht&&!F&&(n.colorMask(ht,ht,ht,ht),Z=ht)},setLocked:function(ht){F=ht},setClear:function(ht,pt,qt,pe,Be){Be===!0&&(ht*=pe,pt*=pe,qt*=pe),dt.set(ht,pt,qt,pe),j.equals(dt)===!1&&(n.clearColor(ht,pt,qt,pe),j.copy(dt))},reset:function(){F=!1,Z=null,j.set(-1,0,0,0)}}}function e(){let F=!1,dt=!1,Z=null,j=null,ht=null;return{setReversed:function(pt){dt=pt},setTest:function(pt){pt?Y(n.DEPTH_TEST):q(n.DEPTH_TEST)},setMask:function(pt){Z!==pt&&!F&&(n.depthMask(pt),Z=pt)},setFunc:function(pt){if(dt&&(pt=Pm[pt]),j!==pt){switch(pt){case Oo:n.depthFunc(n.NEVER);break;case zo:n.depthFunc(n.ALWAYS);break;case ko:n.depthFunc(n.LESS);break;case Ni:n.depthFunc(n.LEQUAL);break;case Bo:n.depthFunc(n.EQUAL);break;case Ho:n.depthFunc(n.GEQUAL);break;case Vo:n.depthFunc(n.GREATER);break;case Go:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}j=pt}},setLocked:function(pt){F=pt},setClear:function(pt){ht!==pt&&(n.clearDepth(pt),ht=pt)},reset:function(){F=!1,Z=null,j=null,ht=null}}}function i(){let F=!1,dt=null,Z=null,j=null,ht=null,pt=null,qt=null,pe=null,Be=null;return{setTest:function(Yt){F||(Yt?Y(n.STENCIL_TEST):q(n.STENCIL_TEST))},setMask:function(Yt){dt!==Yt&&!F&&(n.stencilMask(Yt),dt=Yt)},setFunc:function(Yt,He,_n){(Z!==Yt||j!==He||ht!==_n)&&(n.stencilFunc(Yt,He,_n),Z=Yt,j=He,ht=_n)},setOp:function(Yt,He,_n){(pt!==Yt||qt!==He||pe!==_n)&&(n.stencilOp(Yt,He,_n),pt=Yt,qt=He,pe=_n)},setLocked:function(Yt){F=Yt},setClear:function(Yt){Be!==Yt&&(n.clearStencil(Yt),Be=Yt)},reset:function(){F=!1,dt=null,Z=null,j=null,ht=null,pt=null,qt=null,pe=null,Be=null}}}let s=new t,r=new e,o=new i,a=new WeakMap,l=new WeakMap,u={},h={},m=new WeakMap,c=[],f=null,x=!1,v=null,p=null,d=null,b=null,y=null,S=null,L=null,T=new Pt(0,0,0),E=0,A=!1,N=null,g=null,_=null,C=null,D=null,z=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),$=!1,O=0,Q=n.getParameter(n.VERSION);Q.indexOf("WebGL")!==-1?(O=parseFloat(/^WebGL (\d)/.exec(Q)[1]),$=O>=1):Q.indexOf("OpenGL ES")!==-1&&(O=parseFloat(/^OpenGL ES (\d)/.exec(Q)[1]),$=O>=2);let X=null,ot={},et=n.getParameter(n.SCISSOR_BOX),it=n.getParameter(n.VIEWPORT),Et=new ee().fromArray(et),Nt=new ee().fromArray(it);function V(F,dt,Z,j){let ht=new Uint8Array(4),pt=n.createTexture();n.bindTexture(F,pt),n.texParameteri(F,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(F,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let qt=0;qt<Z;qt++)F===n.TEXTURE_3D||F===n.TEXTURE_2D_ARRAY?n.texImage3D(dt,0,n.RGBA,1,1,j,0,n.RGBA,n.UNSIGNED_BYTE,ht):n.texImage2D(dt+qt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ht);return pt}let U={};U[n.TEXTURE_2D]=V(n.TEXTURE_2D,n.TEXTURE_2D,1),U[n.TEXTURE_CUBE_MAP]=V(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),U[n.TEXTURE_2D_ARRAY]=V(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),U[n.TEXTURE_3D]=V(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),r.setClear(1),o.setClear(0),Y(n.DEPTH_TEST),r.setFunc(Ni),At(!1),Rt(zl),Y(n.CULL_FACE),P(kn);function Y(F){u[F]!==!0&&(n.enable(F),u[F]=!0)}function q(F){u[F]!==!1&&(n.disable(F),u[F]=!1)}function st(F,dt){return h[F]!==dt?(n.bindFramebuffer(F,dt),h[F]=dt,F===n.DRAW_FRAMEBUFFER&&(h[n.FRAMEBUFFER]=dt),F===n.FRAMEBUFFER&&(h[n.DRAW_FRAMEBUFFER]=dt),!0):!1}function tt(F,dt){let Z=c,j=!1;if(F){Z=m.get(dt),Z===void 0&&(Z=[],m.set(dt,Z));let ht=F.textures;if(Z.length!==ht.length||Z[0]!==n.COLOR_ATTACHMENT0){for(let pt=0,qt=ht.length;pt<qt;pt++)Z[pt]=n.COLOR_ATTACHMENT0+pt;Z.length=ht.length,j=!0}}else Z[0]!==n.BACK&&(Z[0]=n.BACK,j=!0);j&&n.drawBuffers(Z)}function mt(F){return f!==F?(n.useProgram(F),f=F,!0):!1}let Lt={[jn]:n.FUNC_ADD,[ru]:n.FUNC_SUBTRACT,[ou]:n.FUNC_REVERSE_SUBTRACT};Lt[au]=n.MIN,Lt[lu]=n.MAX;let gt={[cu]:n.ZERO,[hu]:n.ONE,[uu]:n.SRC_COLOR,[No]:n.SRC_ALPHA,[xu]:n.SRC_ALPHA_SATURATE,[mu]:n.DST_COLOR,[du]:n.DST_ALPHA,[fu]:n.ONE_MINUS_SRC_COLOR,[Fo]:n.ONE_MINUS_SRC_ALPHA,[gu]:n.ONE_MINUS_DST_COLOR,[pu]:n.ONE_MINUS_DST_ALPHA,[_u]:n.CONSTANT_COLOR,[yu]:n.ONE_MINUS_CONSTANT_COLOR,[vu]:n.CONSTANT_ALPHA,[bu]:n.ONE_MINUS_CONSTANT_ALPHA};function P(F,dt,Z,j,ht,pt,qt,pe,Be,Yt){if(F===kn){x===!0&&(q(n.BLEND),x=!1);return}if(x===!1&&(Y(n.BLEND),x=!0),F!==su){if(F!==v||Yt!==A){if((p!==jn||y!==jn)&&(n.blendEquation(n.FUNC_ADD),p=jn,y=jn),Yt)switch(F){case Ii:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case hr:n.blendFunc(n.ONE,n.ONE);break;case kl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Bl:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}else switch(F){case Ii:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case hr:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case kl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Bl:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}d=null,b=null,S=null,L=null,T.set(0,0,0),E=0,v=F,A=Yt}return}ht=ht||dt,pt=pt||Z,qt=qt||j,(dt!==p||ht!==y)&&(n.blendEquationSeparate(Lt[dt],Lt[ht]),p=dt,y=ht),(Z!==d||j!==b||pt!==S||qt!==L)&&(n.blendFuncSeparate(gt[Z],gt[j],gt[pt],gt[qt]),d=Z,b=j,S=pt,L=qt),(pe.equals(T)===!1||Be!==E)&&(n.blendColor(pe.r,pe.g,pe.b,Be),T.copy(pe),E=Be),v=F,A=!1}function zt(F,dt){F.side===Kt?q(n.CULL_FACE):Y(n.CULL_FACE);let Z=F.side===Le;dt&&(Z=!Z),At(Z),F.blending===Ii&&F.transparent===!1?P(kn):P(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),r.setFunc(F.depthFunc),r.setTest(F.depthTest),r.setMask(F.depthWrite),s.setMask(F.colorWrite);let j=F.stencilWrite;o.setTest(j),j&&(o.setMask(F.stencilWriteMask),o.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),o.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),Gt(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?Y(n.SAMPLE_ALPHA_TO_COVERAGE):q(n.SAMPLE_ALPHA_TO_COVERAGE)}function At(F){N!==F&&(F?n.frontFace(n.CW):n.frontFace(n.CCW),N=F)}function Rt(F){F!==nu?(Y(n.CULL_FACE),F!==g&&(F===zl?n.cullFace(n.BACK):F===iu?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):q(n.CULL_FACE),g=F}function Mt(F){F!==_&&($&&n.lineWidth(F),_=F)}function Gt(F,dt,Z){F?(Y(n.POLYGON_OFFSET_FILL),(C!==dt||D!==Z)&&(n.polygonOffset(dt,Z),C=dt,D=Z)):q(n.POLYGON_OFFSET_FILL)}function wt(F){F?Y(n.SCISSOR_TEST):q(n.SCISSOR_TEST)}function R(F){F===void 0&&(F=n.TEXTURE0+z-1),X!==F&&(n.activeTexture(F),X=F)}function M(F,dt,Z){Z===void 0&&(X===null?Z=n.TEXTURE0+z-1:Z=X);let j=ot[Z];j===void 0&&(j={type:void 0,texture:void 0},ot[Z]=j),(j.type!==F||j.texture!==dt)&&(X!==Z&&(n.activeTexture(Z),X=Z),n.bindTexture(F,dt||U[F]),j.type=F,j.texture=dt)}function H(){let F=ot[X];F!==void 0&&F.type!==void 0&&(n.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function J(){try{n.compressedTexImage2D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function nt(){try{n.compressedTexImage3D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function K(){try{n.texSubImage2D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function bt(){try{n.texSubImage3D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function lt(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ft(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Wt(){try{n.texStorage2D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function rt(){try{n.texStorage3D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function xt(){try{n.texImage2D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Ft(){try{n.texImage3D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Ot(F){Et.equals(F)===!1&&(n.scissor(F.x,F.y,F.z,F.w),Et.copy(F))}function _t(F){Nt.equals(F)===!1&&(n.viewport(F.x,F.y,F.z,F.w),Nt.copy(F))}function Xt(F,dt){let Z=l.get(dt);Z===void 0&&(Z=new WeakMap,l.set(dt,Z));let j=Z.get(F);j===void 0&&(j=n.getUniformBlockIndex(dt,F.name),Z.set(F,j))}function kt(F,dt){let j=l.get(dt).get(F);a.get(dt)!==j&&(n.uniformBlockBinding(dt,j,F.__bindingPointIndex),a.set(dt,j))}function ie(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},X=null,ot={},h={},m=new WeakMap,c=[],f=null,x=!1,v=null,p=null,d=null,b=null,y=null,S=null,L=null,T=new Pt(0,0,0),E=0,A=!1,N=null,g=null,_=null,C=null,D=null,Et.set(0,0,n.canvas.width,n.canvas.height),Nt.set(0,0,n.canvas.width,n.canvas.height),s.reset(),r.reset(),o.reset()}return{buffers:{color:s,depth:r,stencil:o},enable:Y,disable:q,bindFramebuffer:st,drawBuffers:tt,useProgram:mt,setBlending:P,setMaterial:zt,setFlipSided:At,setCullFace:Rt,setLineWidth:Mt,setPolygonOffset:Gt,setScissorTest:wt,activeTexture:R,bindTexture:M,unbindTexture:H,compressedTexImage2D:J,compressedTexImage3D:nt,texImage2D:xt,texImage3D:Ft,updateUBOMapping:Xt,uniformBlockBinding:kt,texStorage2D:Wt,texStorage3D:rt,texSubImage2D:K,texSubImage3D:bt,compressedTexSubImage2D:lt,compressedTexSubImage3D:ft,scissor:Ot,viewport:_t,reset:ie}}function Lc(n,t,e,i){let s=Lm(i);switch(e){case qc:return n*t;case Zc:return n*t;case $c:return n*t*2;case cl:return n*t/s.components*s.byteLength;case hl:return n*t/s.components*s.byteLength;case Jc:return n*t*2/s.components*s.byteLength;case ul:return n*t*2/s.components*s.byteLength;case Yc:return n*t*3/s.components*s.byteLength;case ln:return n*t*4/s.components*s.byteLength;case fl:return n*t*4/s.components*s.byteLength;case sr:case rr:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case or:case ar:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Zo:case Jo:return Math.max(n,16)*Math.max(t,8)/4;case Yo:case $o:return Math.max(n,8)*Math.max(t,8)/2;case Ko:case Qo:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case jo:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case ta:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case ea:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case na:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case ia:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case sa:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case ra:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case oa:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case aa:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case la:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case ca:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case ha:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case ua:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case fa:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case da:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case lr:case pa:case ma:return Math.ceil(n/4)*Math.ceil(t/4)*16;case Kc:case ga:return Math.ceil(n/4)*Math.ceil(t/4)*8;case xa:case _a:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Lm(n){switch(n){case An:case Gc:return{byteLength:1,components:1};case _s:case Wc:case Es:return{byteLength:2,components:1};case al:case ll:return{byteLength:2,components:4};case ii:case ol:case mn:return{byteLength:4,components:1};case Xc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}function Dm(n,t,e,i,s,r,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),u=new It,h=new WeakMap,m,c=new WeakMap,f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(R,M){return f?new OffscreenCanvas(R,M):xr("canvas")}function v(R,M,H){let J=1,nt=wt(R);if((nt.width>H||nt.height>H)&&(J=H/Math.max(nt.width,nt.height)),J<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){let K=Math.floor(J*nt.width),bt=Math.floor(J*nt.height);m===void 0&&(m=x(K,bt));let lt=M?x(K,bt):m;return lt.width=K,lt.height=bt,lt.getContext("2d").drawImage(R,0,0,K,bt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+nt.width+"x"+nt.height+") to ("+K+"x"+bt+")."),lt}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+nt.width+"x"+nt.height+")."),R;return R}function p(R){return R.generateMipmaps&&R.minFilter!==We&&R.minFilter!==an}function d(R){n.generateMipmap(R)}function b(R,M,H,J,nt=!1){if(R!==null){if(n[R]!==void 0)return n[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let K=M;if(M===n.RED&&(H===n.FLOAT&&(K=n.R32F),H===n.HALF_FLOAT&&(K=n.R16F),H===n.UNSIGNED_BYTE&&(K=n.R8)),M===n.RED_INTEGER&&(H===n.UNSIGNED_BYTE&&(K=n.R8UI),H===n.UNSIGNED_SHORT&&(K=n.R16UI),H===n.UNSIGNED_INT&&(K=n.R32UI),H===n.BYTE&&(K=n.R8I),H===n.SHORT&&(K=n.R16I),H===n.INT&&(K=n.R32I)),M===n.RG&&(H===n.FLOAT&&(K=n.RG32F),H===n.HALF_FLOAT&&(K=n.RG16F),H===n.UNSIGNED_BYTE&&(K=n.RG8)),M===n.RG_INTEGER&&(H===n.UNSIGNED_BYTE&&(K=n.RG8UI),H===n.UNSIGNED_SHORT&&(K=n.RG16UI),H===n.UNSIGNED_INT&&(K=n.RG32UI),H===n.BYTE&&(K=n.RG8I),H===n.SHORT&&(K=n.RG16I),H===n.INT&&(K=n.RG32I)),M===n.RGB_INTEGER&&(H===n.UNSIGNED_BYTE&&(K=n.RGB8UI),H===n.UNSIGNED_SHORT&&(K=n.RGB16UI),H===n.UNSIGNED_INT&&(K=n.RGB32UI),H===n.BYTE&&(K=n.RGB8I),H===n.SHORT&&(K=n.RGB16I),H===n.INT&&(K=n.RGB32I)),M===n.RGBA_INTEGER&&(H===n.UNSIGNED_BYTE&&(K=n.RGBA8UI),H===n.UNSIGNED_SHORT&&(K=n.RGBA16UI),H===n.UNSIGNED_INT&&(K=n.RGBA32UI),H===n.BYTE&&(K=n.RGBA8I),H===n.SHORT&&(K=n.RGBA16I),H===n.INT&&(K=n.RGBA32I)),M===n.RGB&&H===n.UNSIGNED_INT_5_9_9_9_REV&&(K=n.RGB9_E5),M===n.RGBA){let bt=nt?fr:Jt.getTransfer(J);H===n.FLOAT&&(K=n.RGBA32F),H===n.HALF_FLOAT&&(K=n.RGBA16F),H===n.UNSIGNED_BYTE&&(K=bt===ae?n.SRGB8_ALPHA8:n.RGBA8),H===n.UNSIGNED_SHORT_4_4_4_4&&(K=n.RGBA4),H===n.UNSIGNED_SHORT_5_5_5_1&&(K=n.RGB5_A1)}return(K===n.R16F||K===n.R32F||K===n.RG16F||K===n.RG32F||K===n.RGBA16F||K===n.RGBA32F)&&t.get("EXT_color_buffer_float"),K}function y(R,M){let H;return R?M===null||M===ii||M===zi?H=n.DEPTH24_STENCIL8:M===mn?H=n.DEPTH32F_STENCIL8:M===_s&&(H=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===ii||M===zi?H=n.DEPTH_COMPONENT24:M===mn?H=n.DEPTH_COMPONENT32F:M===_s&&(H=n.DEPTH_COMPONENT16),H}function S(R,M){return p(R)===!0||R.isFramebufferTexture&&R.minFilter!==We&&R.minFilter!==an?Math.log2(Math.max(M.width,M.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?M.mipmaps.length:1}function L(R){let M=R.target;M.removeEventListener("dispose",L),E(M),M.isVideoTexture&&h.delete(M)}function T(R){let M=R.target;M.removeEventListener("dispose",T),N(M)}function E(R){let M=i.get(R);if(M.__webglInit===void 0)return;let H=R.source,J=c.get(H);if(J){let nt=J[M.__cacheKey];nt.usedTimes--,nt.usedTimes===0&&A(R),Object.keys(J).length===0&&c.delete(H)}i.remove(R)}function A(R){let M=i.get(R);n.deleteTexture(M.__webglTexture);let H=R.source,J=c.get(H);delete J[M.__cacheKey],o.memory.textures--}function N(R){let M=i.get(R);if(R.depthTexture&&R.depthTexture.dispose(),R.isWebGLCubeRenderTarget)for(let J=0;J<6;J++){if(Array.isArray(M.__webglFramebuffer[J]))for(let nt=0;nt<M.__webglFramebuffer[J].length;nt++)n.deleteFramebuffer(M.__webglFramebuffer[J][nt]);else n.deleteFramebuffer(M.__webglFramebuffer[J]);M.__webglDepthbuffer&&n.deleteRenderbuffer(M.__webglDepthbuffer[J])}else{if(Array.isArray(M.__webglFramebuffer))for(let J=0;J<M.__webglFramebuffer.length;J++)n.deleteFramebuffer(M.__webglFramebuffer[J]);else n.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&n.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&n.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let J=0;J<M.__webglColorRenderbuffer.length;J++)M.__webglColorRenderbuffer[J]&&n.deleteRenderbuffer(M.__webglColorRenderbuffer[J]);M.__webglDepthRenderbuffer&&n.deleteRenderbuffer(M.__webglDepthRenderbuffer)}let H=R.textures;for(let J=0,nt=H.length;J<nt;J++){let K=i.get(H[J]);K.__webglTexture&&(n.deleteTexture(K.__webglTexture),o.memory.textures--),i.remove(H[J])}i.remove(R)}let g=0;function _(){g=0}function C(){let R=g;return R>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+s.maxTextures),g+=1,R}function D(R){let M=[];return M.push(R.wrapS),M.push(R.wrapT),M.push(R.wrapR||0),M.push(R.magFilter),M.push(R.minFilter),M.push(R.anisotropy),M.push(R.internalFormat),M.push(R.format),M.push(R.type),M.push(R.generateMipmaps),M.push(R.premultiplyAlpha),M.push(R.flipY),M.push(R.unpackAlignment),M.push(R.colorSpace),M.join()}function z(R,M){let H=i.get(R);if(R.isVideoTexture&&Mt(R),R.isRenderTargetTexture===!1&&R.version>0&&H.__version!==R.version){let J=R.image;if(J===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(J.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Nt(H,R,M);return}}e.bindTexture(n.TEXTURE_2D,H.__webglTexture,n.TEXTURE0+M)}function $(R,M){let H=i.get(R);if(R.version>0&&H.__version!==R.version){Nt(H,R,M);return}e.bindTexture(n.TEXTURE_2D_ARRAY,H.__webglTexture,n.TEXTURE0+M)}function O(R,M){let H=i.get(R);if(R.version>0&&H.__version!==R.version){Nt(H,R,M);return}e.bindTexture(n.TEXTURE_3D,H.__webglTexture,n.TEXTURE0+M)}function Q(R,M){let H=i.get(R);if(R.version>0&&H.__version!==R.version){V(H,R,M);return}e.bindTexture(n.TEXTURE_CUBE_MAP,H.__webglTexture,n.TEXTURE0+M)}let X={[xs]:n.REPEAT,[pn]:n.CLAMP_TO_EDGE,[qo]:n.MIRRORED_REPEAT},ot={[We]:n.NEAREST,[Pu]:n.NEAREST_MIPMAP_NEAREST,[Us]:n.NEAREST_MIPMAP_LINEAR,[an]:n.LINEAR,[Qr]:n.LINEAR_MIPMAP_NEAREST,[ni]:n.LINEAR_MIPMAP_LINEAR},et={[Uu]:n.NEVER,[Bu]:n.ALWAYS,[Nu]:n.LESS,[jc]:n.LEQUAL,[Fu]:n.EQUAL,[ku]:n.GEQUAL,[Ou]:n.GREATER,[zu]:n.NOTEQUAL};function it(R,M){if(M.type===mn&&t.has("OES_texture_float_linear")===!1&&(M.magFilter===an||M.magFilter===Qr||M.magFilter===Us||M.magFilter===ni||M.minFilter===an||M.minFilter===Qr||M.minFilter===Us||M.minFilter===ni)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(R,n.TEXTURE_WRAP_S,X[M.wrapS]),n.texParameteri(R,n.TEXTURE_WRAP_T,X[M.wrapT]),(R===n.TEXTURE_3D||R===n.TEXTURE_2D_ARRAY)&&n.texParameteri(R,n.TEXTURE_WRAP_R,X[M.wrapR]),n.texParameteri(R,n.TEXTURE_MAG_FILTER,ot[M.magFilter]),n.texParameteri(R,n.TEXTURE_MIN_FILTER,ot[M.minFilter]),M.compareFunction&&(n.texParameteri(R,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(R,n.TEXTURE_COMPARE_FUNC,et[M.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===We||M.minFilter!==Us&&M.minFilter!==ni||M.type===mn&&t.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||i.get(M).__currentAnisotropy){let H=t.get("EXT_texture_filter_anisotropic");n.texParameterf(R,H.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,s.getMaxAnisotropy())),i.get(M).__currentAnisotropy=M.anisotropy}}}function Et(R,M){let H=!1;R.__webglInit===void 0&&(R.__webglInit=!0,M.addEventListener("dispose",L));let J=M.source,nt=c.get(J);nt===void 0&&(nt={},c.set(J,nt));let K=D(M);if(K!==R.__cacheKey){nt[K]===void 0&&(nt[K]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,H=!0),nt[K].usedTimes++;let bt=nt[R.__cacheKey];bt!==void 0&&(nt[R.__cacheKey].usedTimes--,bt.usedTimes===0&&A(M)),R.__cacheKey=K,R.__webglTexture=nt[K].texture}return H}function Nt(R,M,H){let J=n.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(J=n.TEXTURE_2D_ARRAY),M.isData3DTexture&&(J=n.TEXTURE_3D);let nt=Et(R,M),K=M.source;e.bindTexture(J,R.__webglTexture,n.TEXTURE0+H);let bt=i.get(K);if(K.version!==bt.__version||nt===!0){e.activeTexture(n.TEXTURE0+H);let lt=Jt.getPrimaries(Jt.workingColorSpace),ft=M.colorSpace===zn?null:Jt.getPrimaries(M.colorSpace),Wt=M.colorSpace===zn||lt===ft?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,M.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,M.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Wt);let rt=v(M.image,!1,s.maxTextureSize);rt=Gt(M,rt);let xt=r.convert(M.format,M.colorSpace),Ft=r.convert(M.type),Ot=b(M.internalFormat,xt,Ft,M.colorSpace,M.isVideoTexture);it(J,M);let _t,Xt=M.mipmaps,kt=M.isVideoTexture!==!0,ie=bt.__version===void 0||nt===!0,F=K.dataReady,dt=S(M,rt);if(M.isDepthTexture)Ot=y(M.format===ki,M.type),ie&&(kt?e.texStorage2D(n.TEXTURE_2D,1,Ot,rt.width,rt.height):e.texImage2D(n.TEXTURE_2D,0,Ot,rt.width,rt.height,0,xt,Ft,null));else if(M.isDataTexture)if(Xt.length>0){kt&&ie&&e.texStorage2D(n.TEXTURE_2D,dt,Ot,Xt[0].width,Xt[0].height);for(let Z=0,j=Xt.length;Z<j;Z++)_t=Xt[Z],kt?F&&e.texSubImage2D(n.TEXTURE_2D,Z,0,0,_t.width,_t.height,xt,Ft,_t.data):e.texImage2D(n.TEXTURE_2D,Z,Ot,_t.width,_t.height,0,xt,Ft,_t.data);M.generateMipmaps=!1}else kt?(ie&&e.texStorage2D(n.TEXTURE_2D,dt,Ot,rt.width,rt.height),F&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,rt.width,rt.height,xt,Ft,rt.data)):e.texImage2D(n.TEXTURE_2D,0,Ot,rt.width,rt.height,0,xt,Ft,rt.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){kt&&ie&&e.texStorage3D(n.TEXTURE_2D_ARRAY,dt,Ot,Xt[0].width,Xt[0].height,rt.depth);for(let Z=0,j=Xt.length;Z<j;Z++)if(_t=Xt[Z],M.format!==ln)if(xt!==null)if(kt){if(F)if(M.layerUpdates.size>0){let ht=Lc(_t.width,_t.height,M.format,M.type);for(let pt of M.layerUpdates){let qt=_t.data.subarray(pt*ht/_t.data.BYTES_PER_ELEMENT,(pt+1)*ht/_t.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,Z,0,0,pt,_t.width,_t.height,1,xt,qt,0,0)}M.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,Z,0,0,0,_t.width,_t.height,rt.depth,xt,_t.data,0,0)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,Z,Ot,_t.width,_t.height,rt.depth,0,_t.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else kt?F&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,Z,0,0,0,_t.width,_t.height,rt.depth,xt,Ft,_t.data):e.texImage3D(n.TEXTURE_2D_ARRAY,Z,Ot,_t.width,_t.height,rt.depth,0,xt,Ft,_t.data)}else{kt&&ie&&e.texStorage2D(n.TEXTURE_2D,dt,Ot,Xt[0].width,Xt[0].height);for(let Z=0,j=Xt.length;Z<j;Z++)_t=Xt[Z],M.format!==ln?xt!==null?kt?F&&e.compressedTexSubImage2D(n.TEXTURE_2D,Z,0,0,_t.width,_t.height,xt,_t.data):e.compressedTexImage2D(n.TEXTURE_2D,Z,Ot,_t.width,_t.height,0,_t.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):kt?F&&e.texSubImage2D(n.TEXTURE_2D,Z,0,0,_t.width,_t.height,xt,Ft,_t.data):e.texImage2D(n.TEXTURE_2D,Z,Ot,_t.width,_t.height,0,xt,Ft,_t.data)}else if(M.isDataArrayTexture)if(kt){if(ie&&e.texStorage3D(n.TEXTURE_2D_ARRAY,dt,Ot,rt.width,rt.height,rt.depth),F)if(M.layerUpdates.size>0){let Z=Lc(rt.width,rt.height,M.format,M.type);for(let j of M.layerUpdates){let ht=rt.data.subarray(j*Z/rt.data.BYTES_PER_ELEMENT,(j+1)*Z/rt.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,j,rt.width,rt.height,1,xt,Ft,ht)}M.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,rt.width,rt.height,rt.depth,xt,Ft,rt.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,Ot,rt.width,rt.height,rt.depth,0,xt,Ft,rt.data);else if(M.isData3DTexture)kt?(ie&&e.texStorage3D(n.TEXTURE_3D,dt,Ot,rt.width,rt.height,rt.depth),F&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,rt.width,rt.height,rt.depth,xt,Ft,rt.data)):e.texImage3D(n.TEXTURE_3D,0,Ot,rt.width,rt.height,rt.depth,0,xt,Ft,rt.data);else if(M.isFramebufferTexture){if(ie)if(kt)e.texStorage2D(n.TEXTURE_2D,dt,Ot,rt.width,rt.height);else{let Z=rt.width,j=rt.height;for(let ht=0;ht<dt;ht++)e.texImage2D(n.TEXTURE_2D,ht,Ot,Z,j,0,xt,Ft,null),Z>>=1,j>>=1}}else if(Xt.length>0){if(kt&&ie){let Z=wt(Xt[0]);e.texStorage2D(n.TEXTURE_2D,dt,Ot,Z.width,Z.height)}for(let Z=0,j=Xt.length;Z<j;Z++)_t=Xt[Z],kt?F&&e.texSubImage2D(n.TEXTURE_2D,Z,0,0,xt,Ft,_t):e.texImage2D(n.TEXTURE_2D,Z,Ot,xt,Ft,_t);M.generateMipmaps=!1}else if(kt){if(ie){let Z=wt(rt);e.texStorage2D(n.TEXTURE_2D,dt,Ot,Z.width,Z.height)}F&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,xt,Ft,rt)}else e.texImage2D(n.TEXTURE_2D,0,Ot,xt,Ft,rt);p(M)&&d(J),bt.__version=K.version,M.onUpdate&&M.onUpdate(M)}R.__version=M.version}function V(R,M,H){if(M.image.length!==6)return;let J=Et(R,M),nt=M.source;e.bindTexture(n.TEXTURE_CUBE_MAP,R.__webglTexture,n.TEXTURE0+H);let K=i.get(nt);if(nt.version!==K.__version||J===!0){e.activeTexture(n.TEXTURE0+H);let bt=Jt.getPrimaries(Jt.workingColorSpace),lt=M.colorSpace===zn?null:Jt.getPrimaries(M.colorSpace),ft=M.colorSpace===zn||bt===lt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,M.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,M.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ft);let Wt=M.isCompressedTexture||M.image[0].isCompressedTexture,rt=M.image[0]&&M.image[0].isDataTexture,xt=[];for(let j=0;j<6;j++)!Wt&&!rt?xt[j]=v(M.image[j],!0,s.maxCubemapSize):xt[j]=rt?M.image[j].image:M.image[j],xt[j]=Gt(M,xt[j]);let Ft=xt[0],Ot=r.convert(M.format,M.colorSpace),_t=r.convert(M.type),Xt=b(M.internalFormat,Ot,_t,M.colorSpace),kt=M.isVideoTexture!==!0,ie=K.__version===void 0||J===!0,F=nt.dataReady,dt=S(M,Ft);it(n.TEXTURE_CUBE_MAP,M);let Z;if(Wt){kt&&ie&&e.texStorage2D(n.TEXTURE_CUBE_MAP,dt,Xt,Ft.width,Ft.height);for(let j=0;j<6;j++){Z=xt[j].mipmaps;for(let ht=0;ht<Z.length;ht++){let pt=Z[ht];M.format!==ln?Ot!==null?kt?F&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,ht,0,0,pt.width,pt.height,Ot,pt.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,ht,Xt,pt.width,pt.height,0,pt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):kt?F&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,ht,0,0,pt.width,pt.height,Ot,_t,pt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,ht,Xt,pt.width,pt.height,0,Ot,_t,pt.data)}}}else{if(Z=M.mipmaps,kt&&ie){Z.length>0&&dt++;let j=wt(xt[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,dt,Xt,j.width,j.height)}for(let j=0;j<6;j++)if(rt){kt?F&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,xt[j].width,xt[j].height,Ot,_t,xt[j].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Xt,xt[j].width,xt[j].height,0,Ot,_t,xt[j].data);for(let ht=0;ht<Z.length;ht++){let qt=Z[ht].image[j].image;kt?F&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,ht+1,0,0,qt.width,qt.height,Ot,_t,qt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,ht+1,Xt,qt.width,qt.height,0,Ot,_t,qt.data)}}else{kt?F&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,Ot,_t,xt[j]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Xt,Ot,_t,xt[j]);for(let ht=0;ht<Z.length;ht++){let pt=Z[ht];kt?F&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,ht+1,0,0,Ot,_t,pt.image[j]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,ht+1,Xt,Ot,_t,pt.image[j])}}}p(M)&&d(n.TEXTURE_CUBE_MAP),K.__version=nt.version,M.onUpdate&&M.onUpdate(M)}R.__version=M.version}function U(R,M,H,J,nt,K){let bt=r.convert(H.format,H.colorSpace),lt=r.convert(H.type),ft=b(H.internalFormat,bt,lt,H.colorSpace);if(!i.get(M).__hasExternalTextures){let rt=Math.max(1,M.width>>K),xt=Math.max(1,M.height>>K);nt===n.TEXTURE_3D||nt===n.TEXTURE_2D_ARRAY?e.texImage3D(nt,K,ft,rt,xt,M.depth,0,bt,lt,null):e.texImage2D(nt,K,ft,rt,xt,0,bt,lt,null)}e.bindFramebuffer(n.FRAMEBUFFER,R),Rt(M)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,J,nt,i.get(H).__webglTexture,0,At(M)):(nt===n.TEXTURE_2D||nt>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&nt<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,J,nt,i.get(H).__webglTexture,K),e.bindFramebuffer(n.FRAMEBUFFER,null)}function Y(R,M,H){if(n.bindRenderbuffer(n.RENDERBUFFER,R),M.depthBuffer){let J=M.depthTexture,nt=J&&J.isDepthTexture?J.type:null,K=y(M.stencilBuffer,nt),bt=M.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,lt=At(M);Rt(M)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,lt,K,M.width,M.height):H?n.renderbufferStorageMultisample(n.RENDERBUFFER,lt,K,M.width,M.height):n.renderbufferStorage(n.RENDERBUFFER,K,M.width,M.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,bt,n.RENDERBUFFER,R)}else{let J=M.textures;for(let nt=0;nt<J.length;nt++){let K=J[nt],bt=r.convert(K.format,K.colorSpace),lt=r.convert(K.type),ft=b(K.internalFormat,bt,lt,K.colorSpace),Wt=At(M);H&&Rt(M)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Wt,ft,M.width,M.height):Rt(M)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Wt,ft,M.width,M.height):n.renderbufferStorage(n.RENDERBUFFER,ft,M.width,M.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function q(R,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,R),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(M.depthTexture).__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),z(M.depthTexture,0);let J=i.get(M.depthTexture).__webglTexture,nt=At(M);if(M.depthTexture.format===Li)Rt(M)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,J,0,nt):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,J,0);else if(M.depthTexture.format===ki)Rt(M)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,J,0,nt):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,J,0);else throw new Error("Unknown depthTexture format")}function st(R){let M=i.get(R),H=R.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==R.depthTexture){let J=R.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),J){let nt=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,J.removeEventListener("dispose",nt)};J.addEventListener("dispose",nt),M.__depthDisposeCallback=nt}M.__boundDepthTexture=J}if(R.depthTexture&&!M.__autoAllocateDepthBuffer){if(H)throw new Error("target.depthTexture not supported in Cube render targets");q(M.__webglFramebuffer,R)}else if(H){M.__webglDepthbuffer=[];for(let J=0;J<6;J++)if(e.bindFramebuffer(n.FRAMEBUFFER,M.__webglFramebuffer[J]),M.__webglDepthbuffer[J]===void 0)M.__webglDepthbuffer[J]=n.createRenderbuffer(),Y(M.__webglDepthbuffer[J],R,!1);else{let nt=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,K=M.__webglDepthbuffer[J];n.bindRenderbuffer(n.RENDERBUFFER,K),n.framebufferRenderbuffer(n.FRAMEBUFFER,nt,n.RENDERBUFFER,K)}}else if(e.bindFramebuffer(n.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=n.createRenderbuffer(),Y(M.__webglDepthbuffer,R,!1);else{let J=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,nt=M.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,nt),n.framebufferRenderbuffer(n.FRAMEBUFFER,J,n.RENDERBUFFER,nt)}e.bindFramebuffer(n.FRAMEBUFFER,null)}function tt(R,M,H){let J=i.get(R);M!==void 0&&U(J.__webglFramebuffer,R,R.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),H!==void 0&&st(R)}function mt(R){let M=R.texture,H=i.get(R),J=i.get(M);R.addEventListener("dispose",T);let nt=R.textures,K=R.isWebGLCubeRenderTarget===!0,bt=nt.length>1;if(bt||(J.__webglTexture===void 0&&(J.__webglTexture=n.createTexture()),J.__version=M.version,o.memory.textures++),K){H.__webglFramebuffer=[];for(let lt=0;lt<6;lt++)if(M.mipmaps&&M.mipmaps.length>0){H.__webglFramebuffer[lt]=[];for(let ft=0;ft<M.mipmaps.length;ft++)H.__webglFramebuffer[lt][ft]=n.createFramebuffer()}else H.__webglFramebuffer[lt]=n.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){H.__webglFramebuffer=[];for(let lt=0;lt<M.mipmaps.length;lt++)H.__webglFramebuffer[lt]=n.createFramebuffer()}else H.__webglFramebuffer=n.createFramebuffer();if(bt)for(let lt=0,ft=nt.length;lt<ft;lt++){let Wt=i.get(nt[lt]);Wt.__webglTexture===void 0&&(Wt.__webglTexture=n.createTexture(),o.memory.textures++)}if(R.samples>0&&Rt(R)===!1){H.__webglMultisampledFramebuffer=n.createFramebuffer(),H.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let lt=0;lt<nt.length;lt++){let ft=nt[lt];H.__webglColorRenderbuffer[lt]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,H.__webglColorRenderbuffer[lt]);let Wt=r.convert(ft.format,ft.colorSpace),rt=r.convert(ft.type),xt=b(ft.internalFormat,Wt,rt,ft.colorSpace,R.isXRRenderTarget===!0),Ft=At(R);n.renderbufferStorageMultisample(n.RENDERBUFFER,Ft,xt,R.width,R.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+lt,n.RENDERBUFFER,H.__webglColorRenderbuffer[lt])}n.bindRenderbuffer(n.RENDERBUFFER,null),R.depthBuffer&&(H.__webglDepthRenderbuffer=n.createRenderbuffer(),Y(H.__webglDepthRenderbuffer,R,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(K){e.bindTexture(n.TEXTURE_CUBE_MAP,J.__webglTexture),it(n.TEXTURE_CUBE_MAP,M);for(let lt=0;lt<6;lt++)if(M.mipmaps&&M.mipmaps.length>0)for(let ft=0;ft<M.mipmaps.length;ft++)U(H.__webglFramebuffer[lt][ft],R,M,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+lt,ft);else U(H.__webglFramebuffer[lt],R,M,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0);p(M)&&d(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(bt){for(let lt=0,ft=nt.length;lt<ft;lt++){let Wt=nt[lt],rt=i.get(Wt);e.bindTexture(n.TEXTURE_2D,rt.__webglTexture),it(n.TEXTURE_2D,Wt),U(H.__webglFramebuffer,R,Wt,n.COLOR_ATTACHMENT0+lt,n.TEXTURE_2D,0),p(Wt)&&d(n.TEXTURE_2D)}e.unbindTexture()}else{let lt=n.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(lt=R.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(lt,J.__webglTexture),it(lt,M),M.mipmaps&&M.mipmaps.length>0)for(let ft=0;ft<M.mipmaps.length;ft++)U(H.__webglFramebuffer[ft],R,M,n.COLOR_ATTACHMENT0,lt,ft);else U(H.__webglFramebuffer,R,M,n.COLOR_ATTACHMENT0,lt,0);p(M)&&d(lt),e.unbindTexture()}R.depthBuffer&&st(R)}function Lt(R){let M=R.textures;for(let H=0,J=M.length;H<J;H++){let nt=M[H];if(p(nt)){let K=R.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:n.TEXTURE_2D,bt=i.get(nt).__webglTexture;e.bindTexture(K,bt),d(K),e.unbindTexture()}}}let gt=[],P=[];function zt(R){if(R.samples>0){if(Rt(R)===!1){let M=R.textures,H=R.width,J=R.height,nt=n.COLOR_BUFFER_BIT,K=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,bt=i.get(R),lt=M.length>1;if(lt)for(let ft=0;ft<M.length;ft++)e.bindFramebuffer(n.FRAMEBUFFER,bt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ft,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,bt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ft,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,bt.__webglMultisampledFramebuffer),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,bt.__webglFramebuffer);for(let ft=0;ft<M.length;ft++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(nt|=n.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(nt|=n.STENCIL_BUFFER_BIT)),lt){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,bt.__webglColorRenderbuffer[ft]);let Wt=i.get(M[ft]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Wt,0)}n.blitFramebuffer(0,0,H,J,0,0,H,J,nt,n.NEAREST),l===!0&&(gt.length=0,P.length=0,gt.push(n.COLOR_ATTACHMENT0+ft),R.depthBuffer&&R.resolveDepthBuffer===!1&&(gt.push(K),P.push(K),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,P)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,gt))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),lt)for(let ft=0;ft<M.length;ft++){e.bindFramebuffer(n.FRAMEBUFFER,bt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ft,n.RENDERBUFFER,bt.__webglColorRenderbuffer[ft]);let Wt=i.get(M[ft]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,bt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ft,n.TEXTURE_2D,Wt,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,bt.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&l){let M=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[M])}}}function At(R){return Math.min(s.maxSamples,R.samples)}function Rt(R){let M=i.get(R);return R.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function Mt(R){let M=o.render.frame;h.get(R)!==M&&(h.set(R,M),R.update())}function Gt(R,M){let H=R.colorSpace,J=R.format,nt=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||H!==Wn&&H!==zn&&(Jt.getTransfer(H)===ae?(J!==ln||nt!==An)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",H)),M}function wt(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(u.width=R.naturalWidth||R.width,u.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(u.width=R.displayWidth,u.height=R.displayHeight):(u.width=R.width,u.height=R.height),u}this.allocateTextureUnit=C,this.resetTextureUnits=_,this.setTexture2D=z,this.setTexture2DArray=$,this.setTexture3D=O,this.setTextureCube=Q,this.rebindTextures=tt,this.setupRenderTarget=mt,this.updateRenderTargetMipmap=Lt,this.updateMultisampleRenderTarget=zt,this.setupDepthRenderbuffer=st,this.setupFrameBufferTexture=U,this.useMultisampledRTT=Rt}function Um(n,t){function e(i,s=zn){let r,o=Jt.getTransfer(s);if(i===An)return n.UNSIGNED_BYTE;if(i===al)return n.UNSIGNED_SHORT_4_4_4_4;if(i===ll)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Xc)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Gc)return n.BYTE;if(i===Wc)return n.SHORT;if(i===_s)return n.UNSIGNED_SHORT;if(i===ol)return n.INT;if(i===ii)return n.UNSIGNED_INT;if(i===mn)return n.FLOAT;if(i===Es)return n.HALF_FLOAT;if(i===qc)return n.ALPHA;if(i===Yc)return n.RGB;if(i===ln)return n.RGBA;if(i===Zc)return n.LUMINANCE;if(i===$c)return n.LUMINANCE_ALPHA;if(i===Li)return n.DEPTH_COMPONENT;if(i===ki)return n.DEPTH_STENCIL;if(i===cl)return n.RED;if(i===hl)return n.RED_INTEGER;if(i===Jc)return n.RG;if(i===ul)return n.RG_INTEGER;if(i===fl)return n.RGBA_INTEGER;if(i===sr||i===rr||i===or||i===ar)if(o===ae)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===sr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===rr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===or)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===ar)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===sr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===rr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===or)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===ar)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Yo||i===Zo||i===$o||i===Jo)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Yo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Zo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===$o)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Jo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Ko||i===Qo||i===jo)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Ko||i===Qo)return o===ae?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===jo)return o===ae?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===ta||i===ea||i===na||i===ia||i===sa||i===ra||i===oa||i===aa||i===la||i===ca||i===ha||i===ua||i===fa||i===da)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===ta)return o===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===ea)return o===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===na)return o===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===ia)return o===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===sa)return o===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===ra)return o===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===oa)return o===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===aa)return o===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===la)return o===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===ca)return o===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===ha)return o===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===ua)return o===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===fa)return o===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===da)return o===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===lr||i===pa||i===ma)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===lr)return o===ae?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===pa)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===ma)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Kc||i===ga||i===xa||i===_a)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===lr)return r.COMPRESSED_RED_RGTC1_EXT;if(i===ga)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===xa)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===_a)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===zi?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}function km(n,t){function e(p,d){p.matrixAutoUpdate===!0&&p.updateMatrix(),d.value.copy(p.matrix)}function i(p,d){d.color.getRGB(p.fogColor.value,nh(n)),d.isFog?(p.fogNear.value=d.near,p.fogFar.value=d.far):d.isFogExp2&&(p.fogDensity.value=d.density)}function s(p,d,b,y,S){d.isMeshBasicMaterial||d.isMeshLambertMaterial?r(p,d):d.isMeshToonMaterial?(r(p,d),m(p,d)):d.isMeshPhongMaterial?(r(p,d),h(p,d)):d.isMeshStandardMaterial?(r(p,d),c(p,d),d.isMeshPhysicalMaterial&&f(p,d,S)):d.isMeshMatcapMaterial?(r(p,d),x(p,d)):d.isMeshDepthMaterial?r(p,d):d.isMeshDistanceMaterial?(r(p,d),v(p,d)):d.isMeshNormalMaterial?r(p,d):d.isLineBasicMaterial?(o(p,d),d.isLineDashedMaterial&&a(p,d)):d.isPointsMaterial?l(p,d,b,y):d.isSpriteMaterial?u(p,d):d.isShadowMaterial?(p.color.value.copy(d.color),p.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(p,d){p.opacity.value=d.opacity,d.color&&p.diffuse.value.copy(d.color),d.emissive&&p.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(p.map.value=d.map,e(d.map,p.mapTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,e(d.alphaMap,p.alphaMapTransform)),d.bumpMap&&(p.bumpMap.value=d.bumpMap,e(d.bumpMap,p.bumpMapTransform),p.bumpScale.value=d.bumpScale,d.side===Le&&(p.bumpScale.value*=-1)),d.normalMap&&(p.normalMap.value=d.normalMap,e(d.normalMap,p.normalMapTransform),p.normalScale.value.copy(d.normalScale),d.side===Le&&p.normalScale.value.negate()),d.displacementMap&&(p.displacementMap.value=d.displacementMap,e(d.displacementMap,p.displacementMapTransform),p.displacementScale.value=d.displacementScale,p.displacementBias.value=d.displacementBias),d.emissiveMap&&(p.emissiveMap.value=d.emissiveMap,e(d.emissiveMap,p.emissiveMapTransform)),d.specularMap&&(p.specularMap.value=d.specularMap,e(d.specularMap,p.specularMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest);let b=t.get(d),y=b.envMap,S=b.envMapRotation;y&&(p.envMap.value=y,Kn.copy(S),Kn.x*=-1,Kn.y*=-1,Kn.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Kn.y*=-1,Kn.z*=-1),p.envMapRotation.value.setFromMatrix4(zm.makeRotationFromEuler(Kn)),p.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=d.reflectivity,p.ior.value=d.ior,p.refractionRatio.value=d.refractionRatio),d.lightMap&&(p.lightMap.value=d.lightMap,p.lightMapIntensity.value=d.lightMapIntensity,e(d.lightMap,p.lightMapTransform)),d.aoMap&&(p.aoMap.value=d.aoMap,p.aoMapIntensity.value=d.aoMapIntensity,e(d.aoMap,p.aoMapTransform))}function o(p,d){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,d.map&&(p.map.value=d.map,e(d.map,p.mapTransform))}function a(p,d){p.dashSize.value=d.dashSize,p.totalSize.value=d.dashSize+d.gapSize,p.scale.value=d.scale}function l(p,d,b,y){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,p.size.value=d.size*b,p.scale.value=y*.5,d.map&&(p.map.value=d.map,e(d.map,p.uvTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,e(d.alphaMap,p.alphaMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest)}function u(p,d){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,p.rotation.value=d.rotation,d.map&&(p.map.value=d.map,e(d.map,p.mapTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,e(d.alphaMap,p.alphaMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest)}function h(p,d){p.specular.value.copy(d.specular),p.shininess.value=Math.max(d.shininess,1e-4)}function m(p,d){d.gradientMap&&(p.gradientMap.value=d.gradientMap)}function c(p,d){p.metalness.value=d.metalness,d.metalnessMap&&(p.metalnessMap.value=d.metalnessMap,e(d.metalnessMap,p.metalnessMapTransform)),p.roughness.value=d.roughness,d.roughnessMap&&(p.roughnessMap.value=d.roughnessMap,e(d.roughnessMap,p.roughnessMapTransform)),d.envMap&&(p.envMapIntensity.value=d.envMapIntensity)}function f(p,d,b){p.ior.value=d.ior,d.sheen>0&&(p.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),p.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(p.sheenColorMap.value=d.sheenColorMap,e(d.sheenColorMap,p.sheenColorMapTransform)),d.sheenRoughnessMap&&(p.sheenRoughnessMap.value=d.sheenRoughnessMap,e(d.sheenRoughnessMap,p.sheenRoughnessMapTransform))),d.clearcoat>0&&(p.clearcoat.value=d.clearcoat,p.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(p.clearcoatMap.value=d.clearcoatMap,e(d.clearcoatMap,p.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,e(d.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(p.clearcoatNormalMap.value=d.clearcoatNormalMap,e(d.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===Le&&p.clearcoatNormalScale.value.negate())),d.dispersion>0&&(p.dispersion.value=d.dispersion),d.iridescence>0&&(p.iridescence.value=d.iridescence,p.iridescenceIOR.value=d.iridescenceIOR,p.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(p.iridescenceMap.value=d.iridescenceMap,e(d.iridescenceMap,p.iridescenceMapTransform)),d.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=d.iridescenceThicknessMap,e(d.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),d.transmission>0&&(p.transmission.value=d.transmission,p.transmissionSamplerMap.value=b.texture,p.transmissionSamplerSize.value.set(b.width,b.height),d.transmissionMap&&(p.transmissionMap.value=d.transmissionMap,e(d.transmissionMap,p.transmissionMapTransform)),p.thickness.value=d.thickness,d.thicknessMap&&(p.thicknessMap.value=d.thicknessMap,e(d.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=d.attenuationDistance,p.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(p.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(p.anisotropyMap.value=d.anisotropyMap,e(d.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=d.specularIntensity,p.specularColor.value.copy(d.specularColor),d.specularColorMap&&(p.specularColorMap.value=d.specularColorMap,e(d.specularColorMap,p.specularColorMapTransform)),d.specularIntensityMap&&(p.specularIntensityMap.value=d.specularIntensityMap,e(d.specularIntensityMap,p.specularIntensityMapTransform))}function x(p,d){d.matcap&&(p.matcap.value=d.matcap)}function v(p,d){let b=t.get(d).light;p.referencePosition.value.setFromMatrixPosition(b.matrixWorld),p.nearDistance.value=b.shadow.camera.near,p.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function Bm(n,t,e,i){let s={},r={},o=[],a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(b,y){let S=y.program;i.uniformBlockBinding(b,S)}function u(b,y){let S=s[b.id];S===void 0&&(x(b),S=h(b),s[b.id]=S,b.addEventListener("dispose",p));let L=y.program;i.updateUBOMapping(b,L);let T=t.render.frame;r[b.id]!==T&&(c(b),r[b.id]=T)}function h(b){let y=m();b.__bindingPointIndex=y;let S=n.createBuffer(),L=b.__size,T=b.usage;return n.bindBuffer(n.UNIFORM_BUFFER,S),n.bufferData(n.UNIFORM_BUFFER,L,T),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,y,S),S}function m(){for(let b=0;b<a;b++)if(o.indexOf(b)===-1)return o.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function c(b){let y=s[b.id],S=b.uniforms,L=b.__cache;n.bindBuffer(n.UNIFORM_BUFFER,y);for(let T=0,E=S.length;T<E;T++){let A=Array.isArray(S[T])?S[T]:[S[T]];for(let N=0,g=A.length;N<g;N++){let _=A[N];if(f(_,T,N,L)===!0){let C=_.__offset,D=Array.isArray(_.value)?_.value:[_.value],z=0;for(let $=0;$<D.length;$++){let O=D[$],Q=v(O);typeof O=="number"||typeof O=="boolean"?(_.__data[0]=O,n.bufferSubData(n.UNIFORM_BUFFER,C+z,_.__data)):O.isMatrix3?(_.__data[0]=O.elements[0],_.__data[1]=O.elements[1],_.__data[2]=O.elements[2],_.__data[3]=0,_.__data[4]=O.elements[3],_.__data[5]=O.elements[4],_.__data[6]=O.elements[5],_.__data[7]=0,_.__data[8]=O.elements[6],_.__data[9]=O.elements[7],_.__data[10]=O.elements[8],_.__data[11]=0):(O.toArray(_.__data,z),z+=Q.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,C,_.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function f(b,y,S,L){let T=b.value,E=y+"_"+S;if(L[E]===void 0)return typeof T=="number"||typeof T=="boolean"?L[E]=T:L[E]=T.clone(),!0;{let A=L[E];if(typeof T=="number"||typeof T=="boolean"){if(A!==T)return L[E]=T,!0}else if(A.equals(T)===!1)return A.copy(T),!0}return!1}function x(b){let y=b.uniforms,S=0,L=16;for(let E=0,A=y.length;E<A;E++){let N=Array.isArray(y[E])?y[E]:[y[E]];for(let g=0,_=N.length;g<_;g++){let C=N[g],D=Array.isArray(C.value)?C.value:[C.value];for(let z=0,$=D.length;z<$;z++){let O=D[z],Q=v(O),X=S%L,ot=X%Q.boundary,et=X+ot;S+=ot,et!==0&&L-et<Q.storage&&(S+=L-et),C.__data=new Float32Array(Q.storage/Float32Array.BYTES_PER_ELEMENT),C.__offset=S,S+=Q.storage}}}let T=S%L;return T>0&&(S+=L-T),b.__size=S,b.__cache={},this}function v(b){let y={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(y.boundary=4,y.storage=4):b.isVector2?(y.boundary=8,y.storage=8):b.isVector3||b.isColor?(y.boundary=16,y.storage=12):b.isVector4?(y.boundary=16,y.storage=16):b.isMatrix3?(y.boundary=48,y.storage=48):b.isMatrix4?(y.boundary=64,y.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),y}function p(b){let y=b.target;y.removeEventListener("dispose",p);let S=o.indexOf(y.__bindingPointIndex);o.splice(S,1),n.deleteBuffer(s[y.id]),delete s[y.id],delete r[y.id]}function d(){for(let b in s)n.deleteBuffer(s[b]);o=[],s={},r={}}return{bind:l,update:u,dispose:d}}function ml(){let n=0,t=0,e=0,i=0;function s(r,o,a,l){n=r,t=a,e=-3*r+3*o-2*a-l,i=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,u){s(o,a,u*(a-r),u*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,u,h,m){let c=(o-r)/u-(a-r)/(u+h)+(a-o)/h,f=(a-o)/h-(l-o)/(h+m)+(l-a)/m;c*=h,f*=h,s(o,a,c,f)},calc:function(r){let o=r*r,a=o*r;return n+t*r+e*o+i*a}}}function Nc(n,t,e,i,s){let r=(i-t)*.5,o=(s-e)*.5,a=n*n,l=n*a;return(2*e-2*i+r+o)*l+(-3*e+3*i-2*r-o)*a+r*n+e}function Vm(n,t){let e=1-n;return e*e*t}function Gm(n,t){return 2*(1-n)*n*t}function Wm(n,t){return n*n*t}function ms(n,t,e,i){return Vm(n,t)+Gm(n,e)+Wm(n,i)}function Xm(n,t){let e=1-n;return e*e*e*t}function qm(n,t){let e=1-n;return 3*e*e*n*t}function Ym(n,t){return 3*(1-n)*n*n*t}function Zm(n,t){return n*n*n*t}function gs(n,t,e,i,s){return Xm(n,t)+qm(n,e)+Ym(n,i)+Zm(n,s)}function ir(n,t,e){return!n||!e&&n.constructor===t?n:typeof t.BYTES_PER_ELEMENT=="number"?new t(n):Array.prototype.slice.call(n)}function Jm(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function kc(){return performance.now()}var nu,zl,iu,Bc,sl,En,Hn,Le,Kt,kn,Ii,hr,kl,Bl,su,jn,ru,ou,au,lu,cu,hu,uu,fu,No,Fo,du,pu,mu,gu,xu,_u,yu,vu,bu,Oo,zo,ko,Ni,Bo,Ho,Vo,Go,Hc,Mu,Su,Bn,Eu,wu,Tu,rl,Au,Ru,Cu,Vc,Fi,Oi,Wo,Xo,Nr,xs,pn,qo,We,Pu,Us,an,Qr,ni,An,Gc,Wc,_s,ol,ii,mn,Es,al,ll,zi,Xc,qc,Yc,ln,Zc,$c,Li,ki,cl,hl,Jc,ul,fl,sr,rr,or,ar,Yo,Zo,$o,Jo,Ko,Qo,jo,ta,ea,na,ia,sa,ra,oa,aa,la,ca,ha,ua,fa,da,lr,pa,ma,Kc,ga,xa,_a,ur,ya,jr,Hl,Vl,Gl,Iu,Lu,Qc,Du,zn,Ge,Wn,dl,Fr,fr,ae,dr,pr,pi,Wl,Uu,Nu,Fu,jc,Ou,zu,ku,Bu,Xl,ql,Tn,mr,Vn,Pe,to,gr,It,Ht,no,Yl,Zl,$l,rs,qu,Jt,mi,va,Yu,_r,Zu,Xe,ee,ba,Rn,yr,Ma,De,I,ro,Jl,Cn,yn,sn,Ns,gi,xi,_i,Ln,Dn,qn,os,Fs,Os,Yn,$u,as,ao,si,vn,lo,zs,Un,co,ks,ho,Sa,Vt,yi,rn,Ju,Ku,Nn,Bs,Ze,Kl,Ql,Se,vr,Qu,jl,vi,bn,Hs,ls,ju,tf,tc,ec,nc,ic,ef,bi,uo,Ce,on,Mn,fo,Sn,Mi,Si,sc,po,mo,go,xo,_o,yo,ti,eh,Fn,Vs,Pt,Ie,nf,ri,Gn,me,Gs,Ne,br,Mr,se,sf,je,bo,Ei,$e,cs,Me,Fe,rc,Zn,Ws,oc,Xs,qs,Ys,Mo,Zs,ac,$s,jt,fe,af,lf,cf,gn,Sr,On,lc,cc,Re,wi,Ti,Ea,Er,wa,So,hf,uf,wn,$n,Ks,ys,tn,df,pf,mf,gf,xf,_f,yf,vf,bf,Mf,Sf,Ef,wf,Tf,Af,Rf,Cf,Pf,If,Lf,Df,Uf,Nf,Ff,Of,zf,kf,Bf,Hf,Vf,Gf,Wf,Xf,qf,Yf,Zf,$f,Jf,Kf,Qf,jf,td,ed,nd,id,sd,rd,od,ad,ld,cd,hd,ud,fd,dd,pd,md,gd,xd,_d,yd,vd,bd,Md,Sd,Ed,wd,Td,Ad,Rd,Cd,Pd,Id,Ld,Dd,Ud,Nd,Fd,Od,zd,kd,Bd,Hd,Vd,Gd,Wd,Xd,qd,Yd,Zd,$d,Jd,Kd,Qd,jd,tp,ep,np,ip,sp,rp,op,ap,lp,cp,hp,up,fp,dp,pp,mp,gp,xp,_p,yp,vp,bp,Mp,Sp,Ep,wp,Tp,Ap,Rp,Cp,Pp,Ip,Lp,Dp,Up,Np,Fp,Op,zp,kp,Bp,Hp,Vp,Gp,Wp,Xp,Bt,ct,dn,Qs,Jn,qp,wr,Ci,hc,ei,Eo,uc,wo,To,Ao,Ro,Qn,Ai,fc,Hi,Tr,sh,gc,rh,oh,ah,xc,_c,yc,vc,bc,Ta,Aa,Ra,Co,Ui,$0,J0,tr,rm,om,lm,gm,Pa,Ia,Sm,La,Da,Am,Rm,Pm,Ua,Pi,Nm,ps,Fm,Om,Na,Fa,Kn,zm,Ar,Vi,Oa,vs,Ri,Dc,er,Uc,Hm,hs,us,oi,Gi,cn,Rr,za,nr,Po,Io,Lo,Wi,ka,Ba,Ha,Va,Ga,Cr,Wa,$m,ye,Xi,te,Pr,hn,Ir,qi,Xa,qa,Ya,un,ai,Za,$a,Ja,Lr,li,Ka,Qa,Km,ja,Yi,Dr,Do,Fc,Oc,bs,tl,Ms,zc,fs,Uo,el,Zi,nl,Ss,Ur,gl,Qm,xl,jm,tg,eg,ng,ig,sg,rg,il,le,Eg,Je=Qe(()=>{nu=0,zl=1,iu=2,Bc=1,sl=2,En=3,Hn=0,Le=1,Kt=2,kn=0,Ii=1,hr=2,kl=3,Bl=4,su=5,jn=100,ru=101,ou=102,au=103,lu=104,cu=200,hu=201,uu=202,fu=203,No=204,Fo=205,du=206,pu=207,mu=208,gu=209,xu=210,_u=211,yu=212,vu=213,bu=214,Oo=0,zo=1,ko=2,Ni=3,Bo=4,Ho=5,Vo=6,Go=7,Hc=0,Mu=1,Su=2,Bn=0,Eu=1,wu=2,Tu=3,rl=4,Au=5,Ru=6,Cu=7,Vc=300,Fi=301,Oi=302,Wo=303,Xo=304,Nr=306,xs=1e3,pn=1001,qo=1002,We=1003,Pu=1004,Us=1005,an=1006,Qr=1007,ni=1008,An=1009,Gc=1010,Wc=1011,_s=1012,ol=1013,ii=1014,mn=1015,Es=1016,al=1017,ll=1018,zi=1020,Xc=35902,qc=1021,Yc=1022,ln=1023,Zc=1024,$c=1025,Li=1026,ki=1027,cl=1028,hl=1029,Jc=1030,ul=1031,fl=1033,sr=33776,rr=33777,or=33778,ar=33779,Yo=35840,Zo=35841,$o=35842,Jo=35843,Ko=36196,Qo=37492,jo=37496,ta=37808,ea=37809,na=37810,ia=37811,sa=37812,ra=37813,oa=37814,aa=37815,la=37816,ca=37817,ha=37818,ua=37819,fa=37820,da=37821,lr=36492,pa=36494,ma=36495,Kc=36283,ga=36284,xa=36285,_a=36286,ur=2300,ya=2301,jr=2302,Hl=2400,Vl=2401,Gl=2402,Iu=3200,Lu=3201,Qc=0,Du=1,zn="",Ge="srgb",Wn="srgb-linear",dl="display-p3",Fr="display-p3-linear",fr="linear",ae="srgb",dr="rec709",pr="p3",pi=7680,Wl=519,Uu=512,Nu=513,Fu=514,jc=515,Ou=516,zu=517,ku=518,Bu=519,Xl=35044,ql="300 es",Tn=2e3,mr=2001,Vn=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;let i=this._listeners;return i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;let s=this._listeners[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;let i=this._listeners[t.type];if(i!==void 0){t.target=this;let s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}},Pe=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],to=Math.PI/180,gr=180/Math.PI;It=class n{constructor(t=0,e=0){n.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(Ae(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*i-o*s+t.x,this.y=r*s+o*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Ht=class n{constructor(t,e,i,s,r,o,a,l,u){n.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,l,u)}set(t,e,i,s,r,o,a,l,u){let h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=l,h[6]=i,h[7]=o,h[8]=u,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[3],l=i[6],u=i[1],h=i[4],m=i[7],c=i[2],f=i[5],x=i[8],v=s[0],p=s[3],d=s[6],b=s[1],y=s[4],S=s[7],L=s[2],T=s[5],E=s[8];return r[0]=o*v+a*b+l*L,r[3]=o*p+a*y+l*T,r[6]=o*d+a*S+l*E,r[1]=u*v+h*b+m*L,r[4]=u*p+h*y+m*T,r[7]=u*d+h*S+m*E,r[2]=c*v+f*b+x*L,r[5]=c*p+f*y+x*T,r[8]=c*d+f*S+x*E,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],u=t[7],h=t[8];return e*o*h-e*a*u-i*r*h+i*a*l+s*r*u-s*o*l}invert(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],u=t[7],h=t[8],m=h*o-a*u,c=a*l-h*r,f=u*r-o*l,x=e*m+i*c+s*f;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);let v=1/x;return t[0]=m*v,t[1]=(s*u-h*i)*v,t[2]=(a*i-s*o)*v,t[3]=c*v,t[4]=(h*e-s*l)*v,t[5]=(s*r-a*e)*v,t[6]=f*v,t[7]=(i*l-u*e)*v,t[8]=(o*e-i*r)*v,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,o,a){let l=Math.cos(r),u=Math.sin(r);return this.set(i*l,i*u,-i*(l*o+u*a)+o+t,-s*u,s*l,-s*(-u*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(no.makeScale(t,e)),this}rotate(t){return this.premultiply(no.makeRotation(-t)),this}translate(t,e){return this.premultiply(no.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}},no=new Ht;Yl={};Zl=new Ht().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),$l=new Ht().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),rs={[Wn]:{transfer:fr,primaries:dr,luminanceCoefficients:[.2126,.7152,.0722],toReference:n=>n,fromReference:n=>n},[Ge]:{transfer:ae,primaries:dr,luminanceCoefficients:[.2126,.7152,.0722],toReference:n=>n.convertSRGBToLinear(),fromReference:n=>n.convertLinearToSRGB()},[Fr]:{transfer:fr,primaries:pr,luminanceCoefficients:[.2289,.6917,.0793],toReference:n=>n.applyMatrix3($l),fromReference:n=>n.applyMatrix3(Zl)},[dl]:{transfer:ae,primaries:pr,luminanceCoefficients:[.2289,.6917,.0793],toReference:n=>n.convertSRGBToLinear().applyMatrix3($l),fromReference:n=>n.applyMatrix3(Zl).convertLinearToSRGB()}},qu=new Set([Wn,Fr]),Jt={enabled:!0,_workingColorSpace:Wn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(n){if(!qu.has(n))throw new Error(`Unsupported working color space, "${n}".`);this._workingColorSpace=n},convert:function(n,t,e){if(this.enabled===!1||t===e||!t||!e)return n;let i=rs[t].toReference,s=rs[e].fromReference;return s(i(n))},fromWorkingColorSpace:function(n,t){return this.convert(n,this._workingColorSpace,t)},toWorkingColorSpace:function(n,t){return this.convert(n,t,this._workingColorSpace)},getPrimaries:function(n){return rs[n].primaries},getTransfer:function(n){return n===zn?fr:rs[n].transfer},getLuminanceCoefficients:function(n,t=this._workingColorSpace){return n.fromArray(rs[t].luminanceCoefficients)}};va=class{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{mi===void 0&&(mi=xr("canvas")),mi.width=t.width,mi.height=t.height;let i=mi.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),e=mi}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=xr("canvas");e.width=t.width,e.height=t.height;let i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);let s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Di(r[o]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(Di(e[i]/255)*255):e[i]=Di(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},Yu=0,_r=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Yu++}),this.uuid=ws(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(so(s[o].image)):r.push(so(s[o]))}else r=so(s);i.url=r}return e||(t.images[this.uuid]=i),i}};Zu=0,Xe=class n extends Vn{constructor(t=n.DEFAULT_IMAGE,e=n.DEFAULT_MAPPING,i=pn,s=pn,r=an,o=ni,a=ln,l=An,u=n.DEFAULT_ANISOTROPY,h=zn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Zu++}),this.uuid=ws(),this.name="",this.source=new _r(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=u,this.format=a,this.internalFormat=null,this.type=l,this.offset=new It(0,0),this.repeat=new It(1,1),this.center=new It(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ht,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Vc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case xs:t.x=t.x-Math.floor(t.x);break;case pn:t.x=t.x<0?0:1;break;case qo:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case xs:t.y=t.y-Math.floor(t.y);break;case pn:t.y=t.y<0?0:1;break;case qo:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};Xe.DEFAULT_IMAGE=null;Xe.DEFAULT_MAPPING=Vc;Xe.DEFAULT_ANISOTROPY=1;ee=class n{constructor(t=0,e=0,i=0,s=1){n.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,i=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*i+o[11]*s+o[15]*r,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r,l=t.elements,u=l[0],h=l[4],m=l[8],c=l[1],f=l[5],x=l[9],v=l[2],p=l[6],d=l[10];if(Math.abs(h-c)<.01&&Math.abs(m-v)<.01&&Math.abs(x-p)<.01){if(Math.abs(h+c)<.1&&Math.abs(m+v)<.1&&Math.abs(x+p)<.1&&Math.abs(u+f+d-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let y=(u+1)/2,S=(f+1)/2,L=(d+1)/2,T=(h+c)/4,E=(m+v)/4,A=(x+p)/4;return y>S&&y>L?y<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(y),s=T/i,r=E/i):S>L?S<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(S),i=T/s,r=A/s):L<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(L),i=E/r,s=A/r),this.set(i,s,r,e),this}let b=Math.sqrt((p-x)*(p-x)+(m-v)*(m-v)+(c-h)*(c-h));return Math.abs(b)<.001&&(b=1),this.x=(p-x)/b,this.y=(m-v)/b,this.z=(c-h)/b,this.w=Math.acos((u+f+d-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},ba=class extends Vn{constructor(t=1,e=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new ee(0,0,t,e),this.scissorTest=!1,this.viewport=new ee(0,0,t,e);let s={width:t,height:e,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:an,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);let r=new Xe(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);r.flipY=!1,r.generateMipmaps=i.generateMipmaps,r.internalFormat=i.internalFormat,this.textures=[];let o=i.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,s=t.textures.length;i<s;i++)this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;let e=Object.assign({},t.texture.image);return this.texture.source=new _r(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Rn=class extends ba{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}},yr=class extends Xe{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=We,this.minFilter=We,this.wrapR=pn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}},Ma=class extends Xe{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=We,this.minFilter=We,this.wrapR=pn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},De=class{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,o,a){let l=i[s+0],u=i[s+1],h=i[s+2],m=i[s+3],c=r[o+0],f=r[o+1],x=r[o+2],v=r[o+3];if(a===0){t[e+0]=l,t[e+1]=u,t[e+2]=h,t[e+3]=m;return}if(a===1){t[e+0]=c,t[e+1]=f,t[e+2]=x,t[e+3]=v;return}if(m!==v||l!==c||u!==f||h!==x){let p=1-a,d=l*c+u*f+h*x+m*v,b=d>=0?1:-1,y=1-d*d;if(y>Number.EPSILON){let L=Math.sqrt(y),T=Math.atan2(L,d*b);p=Math.sin(p*T)/L,a=Math.sin(a*T)/L}let S=a*b;if(l=l*p+c*S,u=u*p+f*S,h=h*p+x*S,m=m*p+v*S,p===1-a){let L=1/Math.sqrt(l*l+u*u+h*h+m*m);l*=L,u*=L,h*=L,m*=L}}t[e]=l,t[e+1]=u,t[e+2]=h,t[e+3]=m}static multiplyQuaternionsFlat(t,e,i,s,r,o){let a=i[s],l=i[s+1],u=i[s+2],h=i[s+3],m=r[o],c=r[o+1],f=r[o+2],x=r[o+3];return t[e]=a*x+h*m+l*f-u*c,t[e+1]=l*x+h*c+u*m-a*f,t[e+2]=u*x+h*f+a*c-l*m,t[e+3]=h*x-a*m-l*c-u*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let i=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,u=a(i/2),h=a(s/2),m=a(r/2),c=l(i/2),f=l(s/2),x=l(r/2);switch(o){case"XYZ":this._x=c*h*m+u*f*x,this._y=u*f*m-c*h*x,this._z=u*h*x+c*f*m,this._w=u*h*m-c*f*x;break;case"YXZ":this._x=c*h*m+u*f*x,this._y=u*f*m-c*h*x,this._z=u*h*x-c*f*m,this._w=u*h*m+c*f*x;break;case"ZXY":this._x=c*h*m-u*f*x,this._y=u*f*m+c*h*x,this._z=u*h*x+c*f*m,this._w=u*h*m-c*f*x;break;case"ZYX":this._x=c*h*m-u*f*x,this._y=u*f*m+c*h*x,this._z=u*h*x-c*f*m,this._w=u*h*m+c*f*x;break;case"YZX":this._x=c*h*m+u*f*x,this._y=u*f*m+c*h*x,this._z=u*h*x-c*f*m,this._w=u*h*m-c*f*x;break;case"XZY":this._x=c*h*m-u*f*x,this._y=u*f*m-c*h*x,this._z=u*h*x+c*f*m,this._w=u*h*m+c*f*x;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,i=e[0],s=e[4],r=e[8],o=e[1],a=e[5],l=e[9],u=e[2],h=e[6],m=e[10],c=i+a+m;if(c>0){let f=.5/Math.sqrt(c+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-u)*f,this._z=(o-s)*f}else if(i>a&&i>m){let f=2*Math.sqrt(1+i-a-m);this._w=(h-l)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+u)/f}else if(a>m){let f=2*Math.sqrt(1+a-i-m);this._w=(r-u)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+m-i-a);this._w=(o-s)/f,this._x=(r+u)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ae(this.dot(t),-1,1)))}rotateTowards(t,e){let i=this.angleTo(t);if(i===0)return this;let s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let i=t._x,s=t._y,r=t._z,o=t._w,a=e._x,l=e._y,u=e._z,h=e._w;return this._x=i*h+o*a+s*u-r*l,this._y=s*h+o*l+r*a-i*u,this._z=r*h+o*u+i*l-s*a,this._w=o*h-i*a-s*l-r*u,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let i=this._x,s=this._y,r=this._z,o=this._w,a=o*t._w+i*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=i,this._y=s,this._z=r,this;let l=1-a*a;if(l<=Number.EPSILON){let f=1-e;return this._w=f*o+e*this._w,this._x=f*i+e*this._x,this._y=f*s+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}let u=Math.sqrt(l),h=Math.atan2(u,a),m=Math.sin((1-e)*h)/u,c=Math.sin(e*h)/u;return this._w=o*m+this._w*c,this._x=i*m+this._x*c,this._y=s*m+this._y*c,this._z=r*m+this._z*c,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},I=class n{constructor(t=0,e=0,i=0){n.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Jl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Jl.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,i=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(t){let e=this.x,i=this.y,s=this.z,r=t.x,o=t.y,a=t.z,l=t.w,u=2*(o*s-a*i),h=2*(a*e-r*s),m=2*(r*i-o*e);return this.x=e+l*u+o*m-a*h,this.y=i+l*h+a*u-r*m,this.z=s+l*m+r*h-o*u,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let i=t.x,s=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=s*l-r*a,this.y=r*o-i*l,this.z=i*a-s*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return ro.copy(this).projectOnVector(t),this.sub(ro)}reflect(t){return this.sub(ro.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(Ae(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){let s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},ro=new I,Jl=new De,Cn=class{constructor(t=new I(1/0,1/0,1/0),e=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(sn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(sn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let i=sn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let i=t.geometry;if(i!==void 0){let r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,sn):sn.fromBufferAttribute(r,o),sn.applyMatrix4(t.matrixWorld),this.expandByPoint(sn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ns.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Ns.copy(i.boundingBox)),Ns.applyMatrix4(t.matrixWorld),this.union(Ns)}let s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,sn),sn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(os),Fs.subVectors(this.max,os),gi.subVectors(t.a,os),xi.subVectors(t.b,os),_i.subVectors(t.c,os),Ln.subVectors(xi,gi),Dn.subVectors(_i,xi),qn.subVectors(gi,_i);let e=[0,-Ln.z,Ln.y,0,-Dn.z,Dn.y,0,-qn.z,qn.y,Ln.z,0,-Ln.x,Dn.z,0,-Dn.x,qn.z,0,-qn.x,-Ln.y,Ln.x,0,-Dn.y,Dn.x,0,-qn.y,qn.x,0];return!oo(e,gi,xi,_i,Fs)||(e=[1,0,0,0,1,0,0,0,1],!oo(e,gi,xi,_i,Fs))?!1:(Os.crossVectors(Ln,Dn),e=[Os.x,Os.y,Os.z],oo(e,gi,xi,_i,Fs))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,sn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(sn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(yn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),yn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),yn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),yn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),yn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),yn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),yn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),yn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(yn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}},yn=[new I,new I,new I,new I,new I,new I,new I,new I],sn=new I,Ns=new Cn,gi=new I,xi=new I,_i=new I,Ln=new I,Dn=new I,qn=new I,os=new I,Fs=new I,Os=new I,Yn=new I;$u=new Cn,as=new I,ao=new I,si=class{constructor(t=new I,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let i=this.center;e!==void 0?i.copy(e):$u.setFromPoints(t).getCenter(i);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;as.subVectors(t,this.center);let e=as.lengthSq();if(e>this.radius*this.radius){let i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(as,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(ao.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(as.copy(t.center).add(ao)),this.expandByPoint(as.copy(t.center).sub(ao))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}},vn=new I,lo=new I,zs=new I,Un=new I,co=new I,ks=new I,ho=new I,Sa=class{constructor(t=new I,e=new I(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,vn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=vn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(vn.copy(this.origin).addScaledVector(this.direction,e),vn.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){lo.copy(t).add(e).multiplyScalar(.5),zs.copy(e).sub(t).normalize(),Un.copy(this.origin).sub(lo);let r=t.distanceTo(e)*.5,o=-this.direction.dot(zs),a=Un.dot(this.direction),l=-Un.dot(zs),u=Un.lengthSq(),h=Math.abs(1-o*o),m,c,f,x;if(h>0)if(m=o*l-a,c=o*a-l,x=r*h,m>=0)if(c>=-x)if(c<=x){let v=1/h;m*=v,c*=v,f=m*(m+o*c+2*a)+c*(o*m+c+2*l)+u}else c=r,m=Math.max(0,-(o*c+a)),f=-m*m+c*(c+2*l)+u;else c=-r,m=Math.max(0,-(o*c+a)),f=-m*m+c*(c+2*l)+u;else c<=-x?(m=Math.max(0,-(-o*r+a)),c=m>0?-r:Math.min(Math.max(-r,-l),r),f=-m*m+c*(c+2*l)+u):c<=x?(m=0,c=Math.min(Math.max(-r,-l),r),f=c*(c+2*l)+u):(m=Math.max(0,-(o*r+a)),c=m>0?r:Math.min(Math.max(-r,-l),r),f=-m*m+c*(c+2*l)+u);else c=o>0?-r:r,m=Math.max(0,-(o*c+a)),f=-m*m+c*(c+2*l)+u;return i&&i.copy(this.origin).addScaledVector(this.direction,m),s&&s.copy(lo).addScaledVector(zs,c),f}intersectSphere(t,e){vn.subVectors(t.center,this.origin);let i=vn.dot(this.direction),s=vn.dot(vn)-i*i,r=t.radius*t.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){let i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,o,a,l,u=1/this.direction.x,h=1/this.direction.y,m=1/this.direction.z,c=this.origin;return u>=0?(i=(t.min.x-c.x)*u,s=(t.max.x-c.x)*u):(i=(t.max.x-c.x)*u,s=(t.min.x-c.x)*u),h>=0?(r=(t.min.y-c.y)*h,o=(t.max.y-c.y)*h):(r=(t.max.y-c.y)*h,o=(t.min.y-c.y)*h),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),m>=0?(a=(t.min.z-c.z)*m,l=(t.max.z-c.z)*m):(a=(t.max.z-c.z)*m,l=(t.min.z-c.z)*m),i>l||a>s)||((a>i||i!==i)&&(i=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,vn)!==null}intersectTriangle(t,e,i,s,r){co.subVectors(e,t),ks.subVectors(i,t),ho.crossVectors(co,ks);let o=this.direction.dot(ho),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Un.subVectors(this.origin,t);let l=a*this.direction.dot(ks.crossVectors(Un,ks));if(l<0)return null;let u=a*this.direction.dot(co.cross(Un));if(u<0||l+u>o)return null;let h=-a*Un.dot(ho);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Vt=class n{constructor(t,e,i,s,r,o,a,l,u,h,m,c,f,x,v,p){n.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,l,u,h,m,c,f,x,v,p)}set(t,e,i,s,r,o,a,l,u,h,m,c,f,x,v,p){let d=this.elements;return d[0]=t,d[4]=e,d[8]=i,d[12]=s,d[1]=r,d[5]=o,d[9]=a,d[13]=l,d[2]=u,d[6]=h,d[10]=m,d[14]=c,d[3]=f,d[7]=x,d[11]=v,d[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new n().fromArray(this.elements)}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){let e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,i=t.elements,s=1/yi.setFromMatrixColumn(t,0).length(),r=1/yi.setFromMatrixColumn(t,1).length(),o=1/yi.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*o,e[9]=i[9]*o,e[10]=i[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,i=t.x,s=t.y,r=t.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(s),u=Math.sin(s),h=Math.cos(r),m=Math.sin(r);if(t.order==="XYZ"){let c=o*h,f=o*m,x=a*h,v=a*m;e[0]=l*h,e[4]=-l*m,e[8]=u,e[1]=f+x*u,e[5]=c-v*u,e[9]=-a*l,e[2]=v-c*u,e[6]=x+f*u,e[10]=o*l}else if(t.order==="YXZ"){let c=l*h,f=l*m,x=u*h,v=u*m;e[0]=c+v*a,e[4]=x*a-f,e[8]=o*u,e[1]=o*m,e[5]=o*h,e[9]=-a,e[2]=f*a-x,e[6]=v+c*a,e[10]=o*l}else if(t.order==="ZXY"){let c=l*h,f=l*m,x=u*h,v=u*m;e[0]=c-v*a,e[4]=-o*m,e[8]=x+f*a,e[1]=f+x*a,e[5]=o*h,e[9]=v-c*a,e[2]=-o*u,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){let c=o*h,f=o*m,x=a*h,v=a*m;e[0]=l*h,e[4]=x*u-f,e[8]=c*u+v,e[1]=l*m,e[5]=v*u+c,e[9]=f*u-x,e[2]=-u,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){let c=o*l,f=o*u,x=a*l,v=a*u;e[0]=l*h,e[4]=v-c*m,e[8]=x*m+f,e[1]=m,e[5]=o*h,e[9]=-a*h,e[2]=-u*h,e[6]=f*m+x,e[10]=c-v*m}else if(t.order==="XZY"){let c=o*l,f=o*u,x=a*l,v=a*u;e[0]=l*h,e[4]=-m,e[8]=u*h,e[1]=c*m+v,e[5]=o*h,e[9]=f*m-x,e[2]=x*m-f,e[6]=a*h,e[10]=v*m+c}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Ju,t,Ku)}lookAt(t,e,i){let s=this.elements;return Ze.subVectors(t,e),Ze.lengthSq()===0&&(Ze.z=1),Ze.normalize(),Nn.crossVectors(i,Ze),Nn.lengthSq()===0&&(Math.abs(i.z)===1?Ze.x+=1e-4:Ze.z+=1e-4,Ze.normalize(),Nn.crossVectors(i,Ze)),Nn.normalize(),Bs.crossVectors(Ze,Nn),s[0]=Nn.x,s[4]=Bs.x,s[8]=Ze.x,s[1]=Nn.y,s[5]=Bs.y,s[9]=Ze.y,s[2]=Nn.z,s[6]=Bs.z,s[10]=Ze.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[4],l=i[8],u=i[12],h=i[1],m=i[5],c=i[9],f=i[13],x=i[2],v=i[6],p=i[10],d=i[14],b=i[3],y=i[7],S=i[11],L=i[15],T=s[0],E=s[4],A=s[8],N=s[12],g=s[1],_=s[5],C=s[9],D=s[13],z=s[2],$=s[6],O=s[10],Q=s[14],X=s[3],ot=s[7],et=s[11],it=s[15];return r[0]=o*T+a*g+l*z+u*X,r[4]=o*E+a*_+l*$+u*ot,r[8]=o*A+a*C+l*O+u*et,r[12]=o*N+a*D+l*Q+u*it,r[1]=h*T+m*g+c*z+f*X,r[5]=h*E+m*_+c*$+f*ot,r[9]=h*A+m*C+c*O+f*et,r[13]=h*N+m*D+c*Q+f*it,r[2]=x*T+v*g+p*z+d*X,r[6]=x*E+v*_+p*$+d*ot,r[10]=x*A+v*C+p*O+d*et,r[14]=x*N+v*D+p*Q+d*it,r[3]=b*T+y*g+S*z+L*X,r[7]=b*E+y*_+S*$+L*ot,r[11]=b*A+y*C+S*O+L*et,r[15]=b*N+y*D+S*Q+L*it,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],o=t[1],a=t[5],l=t[9],u=t[13],h=t[2],m=t[6],c=t[10],f=t[14],x=t[3],v=t[7],p=t[11],d=t[15];return x*(+r*l*m-s*u*m-r*a*c+i*u*c+s*a*f-i*l*f)+v*(+e*l*f-e*u*c+r*o*c-s*o*f+s*u*h-r*l*h)+p*(+e*u*m-e*a*f-r*o*m+i*o*f+r*a*h-i*u*h)+d*(-s*a*h-e*l*m+e*a*c+s*o*m-i*o*c+i*l*h)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],u=t[7],h=t[8],m=t[9],c=t[10],f=t[11],x=t[12],v=t[13],p=t[14],d=t[15],b=m*p*u-v*c*u+v*l*f-a*p*f-m*l*d+a*c*d,y=x*c*u-h*p*u-x*l*f+o*p*f+h*l*d-o*c*d,S=h*v*u-x*m*u+x*a*f-o*v*f-h*a*d+o*m*d,L=x*m*l-h*v*l-x*a*c+o*v*c+h*a*p-o*m*p,T=e*b+i*y+s*S+r*L;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let E=1/T;return t[0]=b*E,t[1]=(v*c*r-m*p*r-v*s*f+i*p*f+m*s*d-i*c*d)*E,t[2]=(a*p*r-v*l*r+v*s*u-i*p*u-a*s*d+i*l*d)*E,t[3]=(m*l*r-a*c*r-m*s*u+i*c*u+a*s*f-i*l*f)*E,t[4]=y*E,t[5]=(h*p*r-x*c*r+x*s*f-e*p*f-h*s*d+e*c*d)*E,t[6]=(x*l*r-o*p*r-x*s*u+e*p*u+o*s*d-e*l*d)*E,t[7]=(o*c*r-h*l*r+h*s*u-e*c*u-o*s*f+e*l*f)*E,t[8]=S*E,t[9]=(x*m*r-h*v*r-x*i*f+e*v*f+h*i*d-e*m*d)*E,t[10]=(o*v*r-x*a*r+x*i*u-e*v*u-o*i*d+e*a*d)*E,t[11]=(h*a*r-o*m*r-h*i*u+e*m*u+o*i*f-e*a*f)*E,t[12]=L*E,t[13]=(h*v*s-x*m*s+x*i*c-e*v*c-h*i*p+e*m*p)*E,t[14]=(x*a*s-o*v*s-x*i*l+e*v*l+o*i*p-e*a*p)*E,t[15]=(o*m*s-h*a*s+h*i*l-e*m*l-o*i*c+e*a*c)*E,this}scale(t){let e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let i=Math.cos(e),s=Math.sin(e),r=1-i,o=t.x,a=t.y,l=t.z,u=r*o,h=r*a;return this.set(u*o+i,u*a-s*l,u*l+s*a,0,u*a+s*l,h*a+i,h*l-s*o,0,u*l-s*a,h*l+s*o,r*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,o){return this.set(1,i,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){let s=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,u=r+r,h=o+o,m=a+a,c=r*u,f=r*h,x=r*m,v=o*h,p=o*m,d=a*m,b=l*u,y=l*h,S=l*m,L=i.x,T=i.y,E=i.z;return s[0]=(1-(v+d))*L,s[1]=(f+S)*L,s[2]=(x-y)*L,s[3]=0,s[4]=(f-S)*T,s[5]=(1-(c+d))*T,s[6]=(p+b)*T,s[7]=0,s[8]=(x+y)*E,s[9]=(p-b)*E,s[10]=(1-(c+v))*E,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){let s=this.elements,r=yi.set(s[0],s[1],s[2]).length(),o=yi.set(s[4],s[5],s[6]).length(),a=yi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],rn.copy(this);let u=1/r,h=1/o,m=1/a;return rn.elements[0]*=u,rn.elements[1]*=u,rn.elements[2]*=u,rn.elements[4]*=h,rn.elements[5]*=h,rn.elements[6]*=h,rn.elements[8]*=m,rn.elements[9]*=m,rn.elements[10]*=m,e.setFromRotationMatrix(rn),i.x=r,i.y=o,i.z=a,this}makePerspective(t,e,i,s,r,o,a=Tn){let l=this.elements,u=2*r/(e-t),h=2*r/(i-s),m=(e+t)/(e-t),c=(i+s)/(i-s),f,x;if(a===Tn)f=-(o+r)/(o-r),x=-2*o*r/(o-r);else if(a===mr)f=-o/(o-r),x=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=m,l[12]=0,l[1]=0,l[5]=h,l[9]=c,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=x,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,s,r,o,a=Tn){let l=this.elements,u=1/(e-t),h=1/(i-s),m=1/(o-r),c=(e+t)*u,f=(i+s)*h,x,v;if(a===Tn)x=(o+r)*m,v=-2*m;else if(a===mr)x=r*m,v=-1*m;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*u,l[4]=0,l[8]=0,l[12]=-c,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=v,l[14]=-x,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}},yi=new I,rn=new Vt,Ju=new I(0,0,0),Ku=new I(1,1,1),Nn=new I,Bs=new I,Ze=new I,Kl=new Vt,Ql=new De,Se=class n{constructor(t=0,e=0,i=0,s=n.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){let s=t.elements,r=s[0],o=s[4],a=s[8],l=s[1],u=s[5],h=s[9],m=s[2],c=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(Ae(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(c,u),this._z=0);break;case"YXZ":this._x=Math.asin(-Ae(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,u)):(this._y=Math.atan2(-m,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ae(c,-1,1)),Math.abs(c)<.9999999?(this._y=Math.atan2(-m,f),this._z=Math.atan2(-o,u)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ae(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(c,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,u));break;case"YZX":this._z=Math.asin(Ae(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,u),this._y=Math.atan2(-m,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Ae(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(c,u),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return Kl.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Kl,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Ql.setFromEuler(this),this.setFromQuaternion(Ql,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Se.DEFAULT_ORDER="XYZ";vr=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},Qu=0,jl=new I,vi=new De,bn=new Vt,Hs=new I,ls=new I,ju=new I,tf=new De,tc=new I(1,0,0),ec=new I(0,1,0),nc=new I(0,0,1),ic={type:"added"},ef={type:"removed"},bi={type:"childadded",child:null},uo={type:"childremoved",child:null},Ce=class n extends Vn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Qu++}),this.uuid=ws(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let t=new I,e=new Se,i=new De,s=new I(1,1,1);function r(){i.setFromEuler(e,!1)}function o(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Vt},normalMatrix:{value:new Ht}}),this.matrix=new Vt,this.matrixWorld=new Vt,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new vr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return vi.setFromAxisAngle(t,e),this.quaternion.multiply(vi),this}rotateOnWorldAxis(t,e){return vi.setFromAxisAngle(t,e),this.quaternion.premultiply(vi),this}rotateX(t){return this.rotateOnAxis(tc,t)}rotateY(t){return this.rotateOnAxis(ec,t)}rotateZ(t){return this.rotateOnAxis(nc,t)}translateOnAxis(t,e){return jl.copy(t).applyQuaternion(this.quaternion),this.position.add(jl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(tc,t)}translateY(t){return this.translateOnAxis(ec,t)}translateZ(t){return this.translateOnAxis(nc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(bn.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?Hs.copy(t):Hs.set(t,e,i);let s=this.parent;this.updateWorldMatrix(!0,!1),ls.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?bn.lookAt(ls,Hs,this.up):bn.lookAt(Hs,ls,this.up),this.quaternion.setFromRotationMatrix(bn),s&&(bn.extractRotation(s.matrixWorld),vi.setFromRotationMatrix(bn),this.quaternion.premultiply(vi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(ic),bi.child=t,this.dispatchEvent(bi),bi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(ef),uo.child=t,this.dispatchEvent(uo),uo.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),bn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),bn.multiply(t.parent.matrixWorld)),t.applyMatrix4(bn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(ic),bi.child=t,this.dispatchEvent(bi),bi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){let o=this.children[i].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ls,t,ju),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ls,tf,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){let i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){let e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let u=0,h=l.length;u<h;u++){let m=l[u];r(t.shapes,m)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,u=this.material.length;l<u;l++)a.push(r(t.materials,this.material[l]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];s.animations.push(r(t.animations,l))}}if(e){let a=o(t.geometries),l=o(t.materials),u=o(t.textures),h=o(t.images),m=o(t.shapes),c=o(t.skeletons),f=o(t.animations),x=o(t.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),u.length>0&&(i.textures=u),h.length>0&&(i.images=h),m.length>0&&(i.shapes=m),c.length>0&&(i.skeletons=c),f.length>0&&(i.animations=f),x.length>0&&(i.nodes=x)}return i.object=s,i;function o(a){let l=[];for(let u in a){let h=a[u];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){let s=t.children[i];this.add(s.clone())}return this}};Ce.DEFAULT_UP=new I(0,1,0);Ce.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ce.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;on=new I,Mn=new I,fo=new I,Sn=new I,Mi=new I,Si=new I,sc=new I,po=new I,mo=new I,go=new I,xo=new ee,_o=new ee,yo=new ee,ti=class n{constructor(t=new I,e=new I,i=new I){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),on.subVectors(t,e),s.cross(on);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){on.subVectors(s,e),Mn.subVectors(i,e),fo.subVectors(t,e);let o=on.dot(on),a=on.dot(Mn),l=on.dot(fo),u=Mn.dot(Mn),h=Mn.dot(fo),m=o*u-a*a;if(m===0)return r.set(0,0,0),null;let c=1/m,f=(u*l-a*h)*c,x=(o*h-a*l)*c;return r.set(1-f-x,x,f)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,Sn)===null?!1:Sn.x>=0&&Sn.y>=0&&Sn.x+Sn.y<=1}static getInterpolation(t,e,i,s,r,o,a,l){return this.getBarycoord(t,e,i,s,Sn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Sn.x),l.addScaledVector(o,Sn.y),l.addScaledVector(a,Sn.z),l)}static getInterpolatedAttribute(t,e,i,s,r,o){return xo.setScalar(0),_o.setScalar(0),yo.setScalar(0),xo.fromBufferAttribute(t,e),_o.fromBufferAttribute(t,i),yo.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(xo,r.x),o.addScaledVector(_o,r.y),o.addScaledVector(yo,r.z),o}static isFrontFacing(t,e,i,s){return on.subVectors(i,e),Mn.subVectors(t,e),on.cross(Mn).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return on.subVectors(this.c,this.b),Mn.subVectors(this.a,this.b),on.cross(Mn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return n.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return n.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,r){return n.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return n.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return n.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let i=this.a,s=this.b,r=this.c,o,a;Mi.subVectors(s,i),Si.subVectors(r,i),po.subVectors(t,i);let l=Mi.dot(po),u=Si.dot(po);if(l<=0&&u<=0)return e.copy(i);mo.subVectors(t,s);let h=Mi.dot(mo),m=Si.dot(mo);if(h>=0&&m<=h)return e.copy(s);let c=l*m-h*u;if(c<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(i).addScaledVector(Mi,o);go.subVectors(t,r);let f=Mi.dot(go),x=Si.dot(go);if(x>=0&&f<=x)return e.copy(r);let v=f*u-l*x;if(v<=0&&u>=0&&x<=0)return a=u/(u-x),e.copy(i).addScaledVector(Si,a);let p=h*x-f*m;if(p<=0&&m-h>=0&&f-x>=0)return sc.subVectors(r,s),a=(m-h)/(m-h+(f-x)),e.copy(s).addScaledVector(sc,a);let d=1/(p+v+c);return o=v*d,a=c*d,e.copy(i).addScaledVector(Mi,o).addScaledVector(Si,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},eh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Fn={h:0,s:0,l:0},Vs={h:0,s:0,l:0};Pt=class{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ge){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Jt.toWorkingColorSpace(this,e),this}setRGB(t,e,i,s=Jt.workingColorSpace){return this.r=t,this.g=e,this.b=i,Jt.toWorkingColorSpace(this,s),this}setHSL(t,e,i,s=Jt.workingColorSpace){if(t=Hu(t,1),e=Ae(e,0,1),i=Ae(i,0,1),e===0)this.r=this.g=this.b=i;else{let r=i<=.5?i*(1+e):i+e-i*e,o=2*i-r;this.r=vo(o,r,t+1/3),this.g=vo(o,r,t),this.b=vo(o,r,t-1/3)}return Jt.toWorkingColorSpace(this,s),this}setStyle(t,e=Ge){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ge){let i=eh[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Di(t.r),this.g=Di(t.g),this.b=Di(t.b),this}copyLinearToSRGB(t){return this.r=io(t.r),this.g=io(t.g),this.b=io(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ge){return Jt.fromWorkingColorSpace(Ie.copy(this),t),Math.round(Ae(Ie.r*255,0,255))*65536+Math.round(Ae(Ie.g*255,0,255))*256+Math.round(Ae(Ie.b*255,0,255))}getHexString(t=Ge){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Jt.workingColorSpace){Jt.fromWorkingColorSpace(Ie.copy(this),e);let i=Ie.r,s=Ie.g,r=Ie.b,o=Math.max(i,s,r),a=Math.min(i,s,r),l,u,h=(a+o)/2;if(a===o)l=0,u=0;else{let m=o-a;switch(u=h<=.5?m/(o+a):m/(2-o-a),o){case i:l=(s-r)/m+(s<r?6:0);break;case s:l=(r-i)/m+2;break;case r:l=(i-s)/m+4;break}l/=6}return t.h=l,t.s=u,t.l=h,t}getRGB(t,e=Jt.workingColorSpace){return Jt.fromWorkingColorSpace(Ie.copy(this),e),t.r=Ie.r,t.g=Ie.g,t.b=Ie.b,t}getStyle(t=Ge){Jt.fromWorkingColorSpace(Ie.copy(this),t);let e=Ie.r,i=Ie.g,s=Ie.b;return t!==Ge?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(Fn),this.setHSL(Fn.h+t,Fn.s+e,Fn.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(Fn),t.getHSL(Vs);let i=eo(Fn.h,Vs.h,e),s=eo(Fn.s,Vs.s,e),r=eo(Fn.l,Vs.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Ie=new Pt;Pt.NAMES=eh;nf=0,ri=class extends Vn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:nf++}),this.uuid=ws(),this.name="",this.type="Material",this.blending=Ii,this.side=Hn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=No,this.blendDst=Fo,this.blendEquation=jn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Pt(0,0,0),this.blendAlpha=0,this.depthFunc=Ni,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Wl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=pi,this.stencilZFail=pi,this.stencilZPass=pi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Ii&&(i.blending=this.blending),this.side!==Hn&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==No&&(i.blendSrc=this.blendSrc),this.blendDst!==Fo&&(i.blendDst=this.blendDst),this.blendEquation!==jn&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Ni&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Wl&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==pi&&(i.stencilFail=this.stencilFail),this.stencilZFail!==pi&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==pi&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){let o=[];for(let a in r){let l=r[a];delete l.metadata,o.push(l)}return o}if(e){let r=s(t.textures),o=s(t.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,i=null;if(e!==null){let s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},Gn=class extends ri{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Pt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Se,this.combine=Hc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},me=new I,Gs=new It,Ne=class{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=Xl,this.updateRanges=[],this.gpuType=mn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)Gs.fromBufferAttribute(this,e),Gs.applyMatrix3(t),this.setXY(e,Gs.x,Gs.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)me.fromBufferAttribute(this,e),me.applyMatrix3(t),this.setXYZ(e,me.x,me.y,me.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)me.fromBufferAttribute(this,e),me.applyMatrix4(t),this.setXYZ(e,me.x,me.y,me.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)me.fromBufferAttribute(this,e),me.applyNormalMatrix(t),this.setXYZ(e,me.x,me.y,me.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)me.fromBufferAttribute(this,e),me.transformDirection(t),this.setXYZ(e,me.x,me.y,me.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=ss(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=Ve(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=ss(e,this.array)),e}setX(t,e){return this.normalized&&(e=Ve(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=ss(e,this.array)),e}setY(t,e){return this.normalized&&(e=Ve(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=ss(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Ve(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=ss(e,this.array)),e}setW(t,e){return this.normalized&&(e=Ve(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=Ve(e,this.array),i=Ve(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=Ve(e,this.array),i=Ve(i,this.array),s=Ve(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=Ve(e,this.array),i=Ve(i,this.array),s=Ve(s,this.array),r=Ve(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Xl&&(t.usage=this.usage),t}},br=class extends Ne{constructor(t,e,i){super(new Uint16Array(t),e,i)}},Mr=class extends Ne{constructor(t,e,i){super(new Uint32Array(t),e,i)}},se=class extends Ne{constructor(t,e,i){super(new Float32Array(t),e,i)}},sf=0,je=new Vt,bo=new Ce,Ei=new I,$e=new Cn,cs=new Cn,Me=new I,Fe=class n extends Vn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:sf++}),this.uuid=ws(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(th(t)?Mr:br)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let r=new Ht().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return je.makeRotationFromQuaternion(t),this.applyMatrix4(je),this}rotateX(t){return je.makeRotationX(t),this.applyMatrix4(je),this}rotateY(t){return je.makeRotationY(t),this.applyMatrix4(je),this}rotateZ(t){return je.makeRotationZ(t),this.applyMatrix4(je),this}translate(t,e,i){return je.makeTranslation(t,e,i),this.applyMatrix4(je),this}scale(t,e,i){return je.makeScale(t,e,i),this.applyMatrix4(je),this}lookAt(t){return bo.lookAt(t),bo.updateMatrix(),this.applyMatrix4(bo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ei).negate(),this.translate(Ei.x,Ei.y,Ei.z),this}setFromPoints(t){let e=[];for(let i=0,s=t.length;i<s;i++){let r=t[i];e.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new se(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Cn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){let r=e[i];$e.setFromBufferAttribute(r),this.morphTargetsRelative?(Me.addVectors(this.boundingBox.min,$e.min),this.boundingBox.expandByPoint(Me),Me.addVectors(this.boundingBox.max,$e.max),this.boundingBox.expandByPoint(Me)):(this.boundingBox.expandByPoint($e.min),this.boundingBox.expandByPoint($e.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new si);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new I,1/0);return}if(t){let i=this.boundingSphere.center;if($e.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];cs.setFromBufferAttribute(a),this.morphTargetsRelative?(Me.addVectors($e.min,cs.min),$e.expandByPoint(Me),Me.addVectors($e.max,cs.max),$e.expandByPoint(Me)):($e.expandByPoint(cs.min),$e.expandByPoint(cs.max))}$e.getCenter(i);let s=0;for(let r=0,o=t.count;r<o;r++)Me.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(Me));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],l=this.morphTargetsRelative;for(let u=0,h=a.count;u<h;u++)Me.fromBufferAttribute(a,u),l&&(Ei.fromBufferAttribute(t,u),Me.add(Ei)),s=Math.max(s,i.distanceToSquared(Me))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ne(new Float32Array(4*i.count),4));let o=this.getAttribute("tangent"),a=[],l=[];for(let A=0;A<i.count;A++)a[A]=new I,l[A]=new I;let u=new I,h=new I,m=new I,c=new It,f=new It,x=new It,v=new I,p=new I;function d(A,N,g){u.fromBufferAttribute(i,A),h.fromBufferAttribute(i,N),m.fromBufferAttribute(i,g),c.fromBufferAttribute(r,A),f.fromBufferAttribute(r,N),x.fromBufferAttribute(r,g),h.sub(u),m.sub(u),f.sub(c),x.sub(c);let _=1/(f.x*x.y-x.x*f.y);isFinite(_)&&(v.copy(h).multiplyScalar(x.y).addScaledVector(m,-f.y).multiplyScalar(_),p.copy(m).multiplyScalar(f.x).addScaledVector(h,-x.x).multiplyScalar(_),a[A].add(v),a[N].add(v),a[g].add(v),l[A].add(p),l[N].add(p),l[g].add(p))}let b=this.groups;b.length===0&&(b=[{start:0,count:t.count}]);for(let A=0,N=b.length;A<N;++A){let g=b[A],_=g.start,C=g.count;for(let D=_,z=_+C;D<z;D+=3)d(t.getX(D+0),t.getX(D+1),t.getX(D+2))}let y=new I,S=new I,L=new I,T=new I;function E(A){L.fromBufferAttribute(s,A),T.copy(L);let N=a[A];y.copy(N),y.sub(L.multiplyScalar(L.dot(N))).normalize(),S.crossVectors(T,N);let _=S.dot(l[A])<0?-1:1;o.setXYZW(A,y.x,y.y,y.z,_)}for(let A=0,N=b.length;A<N;++A){let g=b[A],_=g.start,C=g.count;for(let D=_,z=_+C;D<z;D+=3)E(t.getX(D+0)),E(t.getX(D+1)),E(t.getX(D+2))}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Ne(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let c=0,f=i.count;c<f;c++)i.setXYZ(c,0,0,0);let s=new I,r=new I,o=new I,a=new I,l=new I,u=new I,h=new I,m=new I;if(t)for(let c=0,f=t.count;c<f;c+=3){let x=t.getX(c+0),v=t.getX(c+1),p=t.getX(c+2);s.fromBufferAttribute(e,x),r.fromBufferAttribute(e,v),o.fromBufferAttribute(e,p),h.subVectors(o,r),m.subVectors(s,r),h.cross(m),a.fromBufferAttribute(i,x),l.fromBufferAttribute(i,v),u.fromBufferAttribute(i,p),a.add(h),l.add(h),u.add(h),i.setXYZ(x,a.x,a.y,a.z),i.setXYZ(v,l.x,l.y,l.z),i.setXYZ(p,u.x,u.y,u.z)}else for(let c=0,f=e.count;c<f;c+=3)s.fromBufferAttribute(e,c+0),r.fromBufferAttribute(e,c+1),o.fromBufferAttribute(e,c+2),h.subVectors(o,r),m.subVectors(s,r),h.cross(m),i.setXYZ(c+0,h.x,h.y,h.z),i.setXYZ(c+1,h.x,h.y,h.z),i.setXYZ(c+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Me.fromBufferAttribute(t,e),Me.normalize(),t.setXYZ(e,Me.x,Me.y,Me.z)}toNonIndexed(){function t(a,l){let u=a.array,h=a.itemSize,m=a.normalized,c=new u.constructor(l.length*h),f=0,x=0;for(let v=0,p=l.length;v<p;v++){a.isInterleavedBufferAttribute?f=l[v]*a.data.stride+a.offset:f=l[v]*h;for(let d=0;d<h;d++)c[x++]=u[f++]}return new Ne(c,h,m)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new n,i=this.index.array,s=this.attributes;for(let a in s){let l=s[a],u=t(l,i);e.setAttribute(a,u)}let r=this.morphAttributes;for(let a in r){let l=[],u=r[a];for(let h=0,m=u.length;h<m;h++){let c=u[h],f=t(c,i);l.push(f)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let u=o[a];e.addGroup(u.start,u.count,u.materialIndex)}return e}toJSON(){let t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let u in l)l[u]!==void 0&&(t[u]=l[u]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let i=this.attributes;for(let l in i){let u=i[l];t.data.attributes[l]=u.toJSON(t.data)}let s={},r=!1;for(let l in this.morphAttributes){let u=this.morphAttributes[l],h=[];for(let m=0,c=u.length;m<c;m++){let f=u[m];h.push(f.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let i=t.index;i!==null&&this.setIndex(i.clone(e));let s=t.attributes;for(let u in s){let h=s[u];this.setAttribute(u,h.clone(e))}let r=t.morphAttributes;for(let u in r){let h=[],m=r[u];for(let c=0,f=m.length;c<f;c++)h.push(m[c].clone(e));this.morphAttributes[u]=h}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let u=0,h=o.length;u<h;u++){let m=o[u];this.addGroup(m.start,m.count,m.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},rc=new Vt,Zn=new Sa,Ws=new si,oc=new I,Xs=new I,qs=new I,Ys=new I,Mo=new I,Zs=new I,ac=new I,$s=new I,jt=class extends Ce{constructor(t=new Fe,e=new Gn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;e.fromBufferAttribute(s,t);let a=this.morphTargetInfluences;if(r&&a){Zs.set(0,0,0);for(let l=0,u=r.length;l<u;l++){let h=a[l],m=r[l];h!==0&&(Mo.fromBufferAttribute(m,t),o?Zs.addScaledVector(Mo,h):Zs.addScaledVector(Mo.sub(e),h))}e.add(Zs)}return e}raycast(t,e){let i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Ws.copy(i.boundingSphere),Ws.applyMatrix4(r),Zn.copy(t.ray).recast(t.near),!(Ws.containsPoint(Zn.origin)===!1&&(Zn.intersectSphere(Ws,oc)===null||Zn.origin.distanceToSquared(oc)>(t.far-t.near)**2))&&(rc.copy(r).invert(),Zn.copy(t.ray).applyMatrix4(rc),!(i.boundingBox!==null&&Zn.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,Zn)))}_computeIntersections(t,e,i){let s,r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,u=r.attributes.uv,h=r.attributes.uv1,m=r.attributes.normal,c=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let x=0,v=c.length;x<v;x++){let p=c[x],d=o[p.materialIndex],b=Math.max(p.start,f.start),y=Math.min(a.count,Math.min(p.start+p.count,f.start+f.count));for(let S=b,L=y;S<L;S+=3){let T=a.getX(S),E=a.getX(S+1),A=a.getX(S+2);s=Js(this,d,t,i,u,h,m,T,E,A),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{let x=Math.max(0,f.start),v=Math.min(a.count,f.start+f.count);for(let p=x,d=v;p<d;p+=3){let b=a.getX(p),y=a.getX(p+1),S=a.getX(p+2);s=Js(this,o,t,i,u,h,m,b,y,S),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let x=0,v=c.length;x<v;x++){let p=c[x],d=o[p.materialIndex],b=Math.max(p.start,f.start),y=Math.min(l.count,Math.min(p.start+p.count,f.start+f.count));for(let S=b,L=y;S<L;S+=3){let T=S,E=S+1,A=S+2;s=Js(this,d,t,i,u,h,m,T,E,A),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{let x=Math.max(0,f.start),v=Math.min(l.count,f.start+f.count);for(let p=x,d=v;p<d;p+=3){let b=p,y=p+1,S=p+2;s=Js(this,o,t,i,u,h,m,b,y,S),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}}};fe=class n extends Fe{constructor(t=1,e=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let l=[],u=[],h=[],m=[],c=0,f=0;x("z","y","x",-1,-1,i,e,t,o,r,0),x("z","y","x",1,-1,i,e,-t,o,r,1),x("x","z","y",1,1,t,i,e,s,o,2),x("x","z","y",1,-1,t,i,-e,s,o,3),x("x","y","z",1,-1,t,e,i,s,r,4),x("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new se(u,3)),this.setAttribute("normal",new se(h,3)),this.setAttribute("uv",new se(m,2));function x(v,p,d,b,y,S,L,T,E,A,N){let g=S/E,_=L/A,C=S/2,D=L/2,z=T/2,$=E+1,O=A+1,Q=0,X=0,ot=new I;for(let et=0;et<O;et++){let it=et*_-D;for(let Et=0;Et<$;Et++){let Nt=Et*g-C;ot[v]=Nt*b,ot[p]=it*y,ot[d]=z,u.push(ot.x,ot.y,ot.z),ot[v]=0,ot[p]=0,ot[d]=T>0?1:-1,h.push(ot.x,ot.y,ot.z),m.push(Et/E),m.push(1-et/A),Q+=1}}for(let et=0;et<A;et++)for(let it=0;it<E;it++){let Et=c+it+$*et,Nt=c+it+$*(et+1),V=c+(it+1)+$*(et+1),U=c+(it+1)+$*et;l.push(Et,Nt,U),l.push(Nt,V,U),X+=6}a.addGroup(f,X,N),f+=X,c+=Q}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};af={clone:Bi,merge:Ue},lf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,cf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,gn=class extends ri{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=lf,this.fragmentShader=cf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Bi(t.uniforms),this.uniformsGroups=of(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let i={};for(let s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}},Sr=class extends Ce{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Vt,this.projectionMatrix=new Vt,this.projectionMatrixInverse=new Vt,this.coordinateSystem=Tn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},On=new I,lc=new It,cc=new It,Re=class extends Sr{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=gr*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(to*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return gr*2*Math.atan(Math.tan(to*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){On.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(On.x,On.y).multiplyScalar(-t/On.z),On.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(On.x,On.y).multiplyScalar(-t/On.z)}getViewSize(t,e){return this.getViewBounds(t,lc,cc),e.subVectors(cc,lc)}setViewOffset(t,e,i,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(to*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,u=o.fullHeight;r+=o.offsetX*s/l,e-=o.offsetY*i/u,s*=o.width/l,i*=o.height/u}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},wi=-90,Ti=1,Ea=class extends Ce{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Re(wi,Ti,t,e);s.layers=this.layers,this.add(s);let r=new Re(wi,Ti,t,e);r.layers=this.layers,this.add(r);let o=new Re(wi,Ti,t,e);o.layers=this.layers,this.add(o);let a=new Re(wi,Ti,t,e);a.layers=this.layers,this.add(a);let l=new Re(wi,Ti,t,e);l.layers=this.layers,this.add(l);let u=new Re(wi,Ti,t,e);u.layers=this.layers,this.add(u)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[i,s,r,o,a,l]=e;for(let u of e)this.remove(u);if(t===Tn)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===mr)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let u of e)this.add(u),u.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,l,u,h]=this.children,m=t.getRenderTarget(),c=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),x=t.xr.enabled;t.xr.enabled=!1;let v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,s),t.render(e,r),t.setRenderTarget(i,1,s),t.render(e,o),t.setRenderTarget(i,2,s),t.render(e,a),t.setRenderTarget(i,3,s),t.render(e,l),t.setRenderTarget(i,4,s),t.render(e,u),i.texture.generateMipmaps=v,t.setRenderTarget(i,5,s),t.render(e,h),t.setRenderTarget(m,c,f),t.xr.enabled=x,i.texture.needsPMREMUpdate=!0}},Er=class extends Xe{constructor(t,e,i,s,r,o,a,l,u,h){t=t!==void 0?t:[],e=e!==void 0?e:Fi,super(t,e,i,s,r,o,a,l,u,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},wa=class extends Rn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new Er(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:an}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new fe(5,5,5),r=new gn({name:"CubemapFromEquirect",uniforms:Bi(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Le,blending:kn});r.uniforms.tEquirect.value=e;let o=new jt(s,r),a=e.minFilter;return e.minFilter===ni&&(e.minFilter=an),new Ea(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,i,s){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,i,s);t.setRenderTarget(r)}},So=new I,hf=new I,uf=new Ht,wn=class{constructor(t=new I(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){let s=So.subVectors(i,e).cross(hf.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let i=t.delta(So),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(i,r)}intersectsLine(t){let e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let i=e||uf.getNormalMatrix(t),s=this.coplanarPoint(So).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},$n=new si,Ks=new I,ys=class{constructor(t=new wn,e=new wn,i=new wn,s=new wn,r=new wn,o=new wn){this.planes=[t,e,i,s,r,o]}set(t,e,i,s,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(i),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=Tn){let i=this.planes,s=t.elements,r=s[0],o=s[1],a=s[2],l=s[3],u=s[4],h=s[5],m=s[6],c=s[7],f=s[8],x=s[9],v=s[10],p=s[11],d=s[12],b=s[13],y=s[14],S=s[15];if(i[0].setComponents(l-r,c-u,p-f,S-d).normalize(),i[1].setComponents(l+r,c+u,p+f,S+d).normalize(),i[2].setComponents(l+o,c+h,p+x,S+b).normalize(),i[3].setComponents(l-o,c-h,p-x,S-b).normalize(),i[4].setComponents(l-a,c-m,p-v,S-y).normalize(),e===Tn)i[5].setComponents(l+a,c+m,p+v,S+y).normalize();else if(e===mr)i[5].setComponents(a,m,v,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),$n.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),$n.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere($n)}intersectsSprite(t){return $n.center.set(0,0,0),$n.radius=.7071067811865476,$n.applyMatrix4(t.matrixWorld),this.intersectsSphere($n)}intersectsSphere(t){let e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let i=0;i<6;i++){let s=e[i];if(Ks.x=s.normal.x>0?t.max.x:t.min.x,Ks.y=s.normal.y>0?t.max.y:t.min.y,Ks.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Ks)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};tn=class n extends Fe{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};let r=t/2,o=e/2,a=Math.floor(i),l=Math.floor(s),u=a+1,h=l+1,m=t/a,c=e/l,f=[],x=[],v=[],p=[];for(let d=0;d<h;d++){let b=d*c-o;for(let y=0;y<u;y++){let S=y*m-r;x.push(S,-b,0),v.push(0,0,1),p.push(y/a),p.push(1-d/l)}}for(let d=0;d<l;d++)for(let b=0;b<a;b++){let y=b+u*d,S=b+u*(d+1),L=b+1+u*(d+1),T=b+1+u*d;f.push(y,S,T),f.push(S,L,T)}this.setIndex(f),this.setAttribute("position",new se(x,3)),this.setAttribute("normal",new se(v,3)),this.setAttribute("uv",new se(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.width,t.height,t.widthSegments,t.heightSegments)}},df=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,pf=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,mf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,gf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,xf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,_f=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,yf=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,vf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,bf=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Mf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Sf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Ef=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,wf=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Tf=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Af=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Rf=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Cf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Pf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,If=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Lf=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Df=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Uf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Nf=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Ff=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Of=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,zf=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,kf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Bf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Hf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Vf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Gf="gl_FragColor = linearToOutputTexel( gl_FragColor );",Wf=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Xf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,qf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Yf=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Zf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,$f=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Jf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Kf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Qf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,jf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,td=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,ed=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,nd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,id=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,sd=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,rd=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,od=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,ad=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,ld=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,cd=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,hd=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,ud=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,fd=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,dd=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,pd=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,md=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,gd=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,xd=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,_d=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,yd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,vd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,bd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Md=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Sd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Ed=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,wd=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Td=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Ad=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Rd=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Cd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Pd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Id=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Ld=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Dd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ud=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Nd=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Fd=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Od=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,zd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,kd=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Bd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Hd=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Vd=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Gd=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Wd=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Xd=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,qd=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Yd=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Zd=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,$d=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Jd=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Kd=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Qd=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,jd=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,tp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,ep=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,np=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,ip=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,sp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,rp=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,op=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,ap=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,lp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,cp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,hp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,up=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,fp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,dp=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,pp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,mp=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,gp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,xp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,_p=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,yp=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,vp=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,bp=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Mp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Sp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ep=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,wp=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Tp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Ap=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Rp=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Cp=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Pp=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Ip=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Lp=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Dp=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Up=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Np=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Fp=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Op=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,zp=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,kp=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Bp=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Hp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Vp=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Gp=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Wp=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Xp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Bt={alphahash_fragment:df,alphahash_pars_fragment:pf,alphamap_fragment:mf,alphamap_pars_fragment:gf,alphatest_fragment:xf,alphatest_pars_fragment:_f,aomap_fragment:yf,aomap_pars_fragment:vf,batching_pars_vertex:bf,batching_vertex:Mf,begin_vertex:Sf,beginnormal_vertex:Ef,bsdfs:wf,iridescence_fragment:Tf,bumpmap_pars_fragment:Af,clipping_planes_fragment:Rf,clipping_planes_pars_fragment:Cf,clipping_planes_pars_vertex:Pf,clipping_planes_vertex:If,color_fragment:Lf,color_pars_fragment:Df,color_pars_vertex:Uf,color_vertex:Nf,common:Ff,cube_uv_reflection_fragment:Of,defaultnormal_vertex:zf,displacementmap_pars_vertex:kf,displacementmap_vertex:Bf,emissivemap_fragment:Hf,emissivemap_pars_fragment:Vf,colorspace_fragment:Gf,colorspace_pars_fragment:Wf,envmap_fragment:Xf,envmap_common_pars_fragment:qf,envmap_pars_fragment:Yf,envmap_pars_vertex:Zf,envmap_physical_pars_fragment:rd,envmap_vertex:$f,fog_vertex:Jf,fog_pars_vertex:Kf,fog_fragment:Qf,fog_pars_fragment:jf,gradientmap_pars_fragment:td,lightmap_pars_fragment:ed,lights_lambert_fragment:nd,lights_lambert_pars_fragment:id,lights_pars_begin:sd,lights_toon_fragment:od,lights_toon_pars_fragment:ad,lights_phong_fragment:ld,lights_phong_pars_fragment:cd,lights_physical_fragment:hd,lights_physical_pars_fragment:ud,lights_fragment_begin:fd,lights_fragment_maps:dd,lights_fragment_end:pd,logdepthbuf_fragment:md,logdepthbuf_pars_fragment:gd,logdepthbuf_pars_vertex:xd,logdepthbuf_vertex:_d,map_fragment:yd,map_pars_fragment:vd,map_particle_fragment:bd,map_particle_pars_fragment:Md,metalnessmap_fragment:Sd,metalnessmap_pars_fragment:Ed,morphinstance_vertex:wd,morphcolor_vertex:Td,morphnormal_vertex:Ad,morphtarget_pars_vertex:Rd,morphtarget_vertex:Cd,normal_fragment_begin:Pd,normal_fragment_maps:Id,normal_pars_fragment:Ld,normal_pars_vertex:Dd,normal_vertex:Ud,normalmap_pars_fragment:Nd,clearcoat_normal_fragment_begin:Fd,clearcoat_normal_fragment_maps:Od,clearcoat_pars_fragment:zd,iridescence_pars_fragment:kd,opaque_fragment:Bd,packing:Hd,premultiplied_alpha_fragment:Vd,project_vertex:Gd,dithering_fragment:Wd,dithering_pars_fragment:Xd,roughnessmap_fragment:qd,roughnessmap_pars_fragment:Yd,shadowmap_pars_fragment:Zd,shadowmap_pars_vertex:$d,shadowmap_vertex:Jd,shadowmask_pars_fragment:Kd,skinbase_vertex:Qd,skinning_pars_vertex:jd,skinning_vertex:tp,skinnormal_vertex:ep,specularmap_fragment:np,specularmap_pars_fragment:ip,tonemapping_fragment:sp,tonemapping_pars_fragment:rp,transmission_fragment:op,transmission_pars_fragment:ap,uv_pars_fragment:lp,uv_pars_vertex:cp,uv_vertex:hp,worldpos_vertex:up,background_vert:fp,background_frag:dp,backgroundCube_vert:pp,backgroundCube_frag:mp,cube_vert:gp,cube_frag:xp,depth_vert:_p,depth_frag:yp,distanceRGBA_vert:vp,distanceRGBA_frag:bp,equirect_vert:Mp,equirect_frag:Sp,linedashed_vert:Ep,linedashed_frag:wp,meshbasic_vert:Tp,meshbasic_frag:Ap,meshlambert_vert:Rp,meshlambert_frag:Cp,meshmatcap_vert:Pp,meshmatcap_frag:Ip,meshnormal_vert:Lp,meshnormal_frag:Dp,meshphong_vert:Up,meshphong_frag:Np,meshphysical_vert:Fp,meshphysical_frag:Op,meshtoon_vert:zp,meshtoon_frag:kp,points_vert:Bp,points_frag:Hp,shadow_vert:Vp,shadow_frag:Gp,sprite_vert:Wp,sprite_frag:Xp},ct={common:{diffuse:{value:new Pt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ht},alphaMap:{value:null},alphaMapTransform:{value:new Ht},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ht}},envmap:{envMap:{value:null},envMapRotation:{value:new Ht},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ht}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ht}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ht},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ht},normalScale:{value:new It(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ht},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ht}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ht}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ht}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Pt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Pt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ht},alphaTest:{value:0},uvTransform:{value:new Ht}},sprite:{diffuse:{value:new Pt(16777215)},opacity:{value:1},center:{value:new It(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ht},alphaMap:{value:null},alphaMapTransform:{value:new Ht},alphaTest:{value:0}}},dn={basic:{uniforms:Ue([ct.common,ct.specularmap,ct.envmap,ct.aomap,ct.lightmap,ct.fog]),vertexShader:Bt.meshbasic_vert,fragmentShader:Bt.meshbasic_frag},lambert:{uniforms:Ue([ct.common,ct.specularmap,ct.envmap,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.fog,ct.lights,{emissive:{value:new Pt(0)}}]),vertexShader:Bt.meshlambert_vert,fragmentShader:Bt.meshlambert_frag},phong:{uniforms:Ue([ct.common,ct.specularmap,ct.envmap,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.fog,ct.lights,{emissive:{value:new Pt(0)},specular:{value:new Pt(1118481)},shininess:{value:30}}]),vertexShader:Bt.meshphong_vert,fragmentShader:Bt.meshphong_frag},standard:{uniforms:Ue([ct.common,ct.envmap,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.roughnessmap,ct.metalnessmap,ct.fog,ct.lights,{emissive:{value:new Pt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Bt.meshphysical_vert,fragmentShader:Bt.meshphysical_frag},toon:{uniforms:Ue([ct.common,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.gradientmap,ct.fog,ct.lights,{emissive:{value:new Pt(0)}}]),vertexShader:Bt.meshtoon_vert,fragmentShader:Bt.meshtoon_frag},matcap:{uniforms:Ue([ct.common,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.fog,{matcap:{value:null}}]),vertexShader:Bt.meshmatcap_vert,fragmentShader:Bt.meshmatcap_frag},points:{uniforms:Ue([ct.points,ct.fog]),vertexShader:Bt.points_vert,fragmentShader:Bt.points_frag},dashed:{uniforms:Ue([ct.common,ct.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Bt.linedashed_vert,fragmentShader:Bt.linedashed_frag},depth:{uniforms:Ue([ct.common,ct.displacementmap]),vertexShader:Bt.depth_vert,fragmentShader:Bt.depth_frag},normal:{uniforms:Ue([ct.common,ct.bumpmap,ct.normalmap,ct.displacementmap,{opacity:{value:1}}]),vertexShader:Bt.meshnormal_vert,fragmentShader:Bt.meshnormal_frag},sprite:{uniforms:Ue([ct.sprite,ct.fog]),vertexShader:Bt.sprite_vert,fragmentShader:Bt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ht},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Bt.background_vert,fragmentShader:Bt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ht}},vertexShader:Bt.backgroundCube_vert,fragmentShader:Bt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Bt.cube_vert,fragmentShader:Bt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Bt.equirect_vert,fragmentShader:Bt.equirect_frag},distanceRGBA:{uniforms:Ue([ct.common,ct.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Bt.distanceRGBA_vert,fragmentShader:Bt.distanceRGBA_frag},shadow:{uniforms:Ue([ct.lights,ct.fog,{color:{value:new Pt(0)},opacity:{value:1}}]),vertexShader:Bt.shadow_vert,fragmentShader:Bt.shadow_frag}};dn.physical={uniforms:Ue([dn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ht},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ht},clearcoatNormalScale:{value:new It(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ht},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ht},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ht},sheen:{value:0},sheenColor:{value:new Pt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ht},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ht},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ht},transmissionSamplerSize:{value:new It},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ht},attenuationDistance:{value:0},attenuationColor:{value:new Pt(0)},specularColor:{value:new Pt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ht},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ht},anisotropyVector:{value:new It},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ht}}]),vertexShader:Bt.meshphysical_vert,fragmentShader:Bt.meshphysical_frag};Qs={r:0,b:0,g:0},Jn=new Se,qp=new Vt;wr=class extends Sr{constructor(t=-1,e=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=i-t,o=i+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){let u=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=u*this.view.offsetX,o=r+u*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},Ci=4,hc=[.125,.215,.35,.446,.526,.582],ei=20,Eo=new wr,uc=new Pt,wo=null,To=0,Ao=0,Ro=!1,Qn=(1+Math.sqrt(5))/2,Ai=1/Qn,fc=[new I(-Qn,Ai,0),new I(Qn,Ai,0),new I(-Ai,0,Qn),new I(Ai,0,Qn),new I(0,Qn,-Ai),new I(0,Qn,Ai),new I(-1,1,-1),new I(1,1,-1),new I(-1,1,1),new I(1,1,1)],Hi=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,s=100){wo=this._renderer.getRenderTarget(),To=this._renderer.getActiveCubeFace(),Ao=this._renderer.getActiveMipmapLevel(),Ro=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,i,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=mc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=pc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(wo,To,Ao),this._renderer.xr.enabled=Ro,t.scissorTest=!1,js(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Fi||t.mapping===Oi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),wo=this._renderer.getRenderTarget(),To=this._renderer.getActiveCubeFace(),Ao=this._renderer.getActiveMipmapLevel(),Ro=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:an,minFilter:an,generateMipmaps:!1,type:Es,format:ln,colorSpace:Wn,depthBuffer:!1},s=dc(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=dc(t,e,i);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=jp(r)),this._blurMaterial=t0(r,t,e)}return s}_compileMaterial(t){let e=new jt(this._lodPlanes[0],t);this._renderer.compile(e,Eo)}_sceneToCubeUV(t,e,i,s){let a=new Re(90,1,e,i),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],h=this._renderer,m=h.autoClear,c=h.toneMapping;h.getClearColor(uc),h.toneMapping=Bn,h.autoClear=!1;let f=new Gn({name:"PMREM.Background",side:Le,depthWrite:!1,depthTest:!1}),x=new jt(new fe,f),v=!1,p=t.background;p?p.isColor&&(f.color.copy(p),t.background=null,v=!0):(f.color.copy(uc),v=!0);for(let d=0;d<6;d++){let b=d%3;b===0?(a.up.set(0,l[d],0),a.lookAt(u[d],0,0)):b===1?(a.up.set(0,0,l[d]),a.lookAt(0,u[d],0)):(a.up.set(0,l[d],0),a.lookAt(0,0,u[d]));let y=this._cubeSize;js(s,b*y,d>2?y:0,y,y),h.setRenderTarget(s),v&&h.render(x,a),h.render(t,a)}x.geometry.dispose(),x.material.dispose(),h.toneMapping=c,h.autoClear=m,t.background=p}_textureToCubeUV(t,e){let i=this._renderer,s=t.mapping===Fi||t.mapping===Oi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=mc()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=pc());let r=s?this._cubemapMaterial:this._equirectMaterial,o=new jt(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;let l=this._cubeSize;js(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(o,Eo)}_applyPMREM(t){let e=this._renderer,i=e.autoClear;e.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=fc[(s-r-1)%fc.length];this._blur(t,r-1,r,o,a)}e.autoClear=i}_blur(t,e,i,s,r){let o=this._pingPongRenderTarget;this._halfBlur(t,o,e,i,s,"latitudinal",r),this._halfBlur(o,t,i,i,s,"longitudinal",r)}_halfBlur(t,e,i,s,r,o,a){let l=this._renderer,u=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,m=new jt(this._lodPlanes[s],u),c=u.uniforms,f=this._sizeLods[i]-1,x=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*ei-1),v=r/x,p=isFinite(r)?1+Math.floor(h*v):ei;p>ei&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${ei}`);let d=[],b=0;for(let E=0;E<ei;++E){let A=E/v,N=Math.exp(-A*A/2);d.push(N),E===0?b+=N:E<p&&(b+=2*N)}for(let E=0;E<d.length;E++)d[E]=d[E]/b;c.envMap.value=t.texture,c.samples.value=p,c.weights.value=d,c.latitudinal.value=o==="latitudinal",a&&(c.poleAxis.value=a);let{_lodMax:y}=this;c.dTheta.value=x,c.mipInt.value=y-i;let S=this._sizeLods[s],L=3*S*(s>y-Ci?s-y+Ci:0),T=4*(this._cubeSize-S);js(e,L,T,3*S,2*S),l.setRenderTarget(e),l.render(m,Eo)}};Tr=class extends Xe{constructor(t,e,i,s,r,o,a,l,u,h=Li){if(h!==Li&&h!==ki)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&h===Li&&(i=ii),i===void 0&&h===ki&&(i=zi),super(null,s,r,o,a,l,h,i,u),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:We,this.minFilter=l!==void 0?l:We,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},sh=new Xe,gc=new Tr(1,1),rh=new yr,oh=new Ma,ah=new Er,xc=[],_c=[],yc=new Float32Array(16),vc=new Float32Array(9),bc=new Float32Array(4);Ta=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=A0(e.type)}},Aa=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Y0(e.type)}},Ra=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(t,e[a.id],i)}}},Co=/(\w+)(\])?(\[|\.)?/g;Ui=class{constructor(t,e){this.seq=[],this.map={};let i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){let r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);Z0(r,o,this)}}setValue(t,e,i,s){let r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){let s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,o=e.length;r!==o;++r){let a=e[r],l=i[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){let i=[];for(let s=0,r=t.length;s!==r;++s){let o=t[s];o.id in e&&i.push(o)}return i}};$0=37297,J0=0;tr=new I;rm=/^[ \t]*#include +<([\w\d./]+)>/gm;om=new Map;lm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;gm=0,Pa=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(i),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){let e=this.shaderCache,i=e.get(t);return i===void 0&&(i=new Ia(t),e.set(t,i)),i}},Ia=class{constructor(t){this.id=gm++,this.code=t,this.usedTimes=0}};Sm=0;La=class extends ri{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Iu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Da=class extends ri{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}},Am=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Rm=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;Pm={[Oo]:zo,[ko]:Vo,[Bo]:Go,[Ni]:Ho,[zo]:Oo,[Vo]:ko,[Go]:Bo,[Ho]:Ni};Ua=class extends Re{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}},Pi=class extends Ce{constructor(){super(),this.isGroup=!0,this.type="Group"}},Nm={type:"move"},ps=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Pi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Pi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Pi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,o=null,a=this._targetRay,l=this._grip,u=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(u&&t.hand){o=!0;for(let v of t.hand.values()){let p=e.getJointPose(v,i),d=this._getHandJoint(u,v);p!==null&&(d.matrix.fromArray(p.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=p.radius),d.visible=p!==null}let h=u.joints["index-finger-tip"],m=u.joints["thumb-tip"],c=h.position.distanceTo(m.position),f=.02,x=.005;u.inputState.pinching&&c>f+x?(u.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!u.inputState.pinching&&c<=f-x&&(u.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Nm)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),u!==null&&(u.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let i=new Pi;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}},Fm=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Om=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Na=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,i){if(this.texture===null){let s=new Xe,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=i.depthNear||e.depthFar!=i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,i=new gn({vertexShader:Fm,fragmentShader:Om,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new jt(new tn(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Fa=class extends Vn{constructor(t,e){super();let i=this,s=null,r=1,o=null,a="local-floor",l=1,u=null,h=null,m=null,c=null,f=null,x=null,v=new Na,p=e.getContextAttributes(),d=null,b=null,y=[],S=[],L=new It,T=null,E=new Re;E.layers.enable(1),E.viewport=new ee;let A=new Re;A.layers.enable(2),A.viewport=new ee;let N=[E,A],g=new Ua;g.layers.enable(1),g.layers.enable(2);let _=null,C=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(V){let U=y[V];return U===void 0&&(U=new ps,y[V]=U),U.getTargetRaySpace()},this.getControllerGrip=function(V){let U=y[V];return U===void 0&&(U=new ps,y[V]=U),U.getGripSpace()},this.getHand=function(V){let U=y[V];return U===void 0&&(U=new ps,y[V]=U),U.getHandSpace()};function D(V){let U=S.indexOf(V.inputSource);if(U===-1)return;let Y=y[U];Y!==void 0&&(Y.update(V.inputSource,V.frame,u||o),Y.dispatchEvent({type:V.type,data:V.inputSource}))}function z(){s.removeEventListener("select",D),s.removeEventListener("selectstart",D),s.removeEventListener("selectend",D),s.removeEventListener("squeeze",D),s.removeEventListener("squeezestart",D),s.removeEventListener("squeezeend",D),s.removeEventListener("end",z),s.removeEventListener("inputsourceschange",$);for(let V=0;V<y.length;V++){let U=S[V];U!==null&&(S[V]=null,y[V].disconnect(U))}_=null,C=null,v.reset(),t.setRenderTarget(d),f=null,c=null,m=null,s=null,b=null,Nt.stop(),i.isPresenting=!1,t.setPixelRatio(T),t.setSize(L.width,L.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(V){r=V,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(V){a=V,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return u||o},this.setReferenceSpace=function(V){u=V},this.getBaseLayer=function(){return c!==null?c:f},this.getBinding=function(){return m},this.getFrame=function(){return x},this.getSession=function(){return s},this.setSession=async function(V){if(s=V,s!==null){if(d=t.getRenderTarget(),s.addEventListener("select",D),s.addEventListener("selectstart",D),s.addEventListener("selectend",D),s.addEventListener("squeeze",D),s.addEventListener("squeezestart",D),s.addEventListener("squeezeend",D),s.addEventListener("end",z),s.addEventListener("inputsourceschange",$),p.xrCompatible!==!0&&await e.makeXRCompatible(),T=t.getPixelRatio(),t.getSize(L),s.renderState.layers===void 0){let U={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,U),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),b=new Rn(f.framebufferWidth,f.framebufferHeight,{format:ln,type:An,colorSpace:t.outputColorSpace,stencilBuffer:p.stencil})}else{let U=null,Y=null,q=null;p.depth&&(q=p.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,U=p.stencil?ki:Li,Y=p.stencil?zi:ii);let st={colorFormat:e.RGBA8,depthFormat:q,scaleFactor:r};m=new XRWebGLBinding(s,e),c=m.createProjectionLayer(st),s.updateRenderState({layers:[c]}),t.setPixelRatio(1),t.setSize(c.textureWidth,c.textureHeight,!1),b=new Rn(c.textureWidth,c.textureHeight,{format:ln,type:An,depthTexture:new Tr(c.textureWidth,c.textureHeight,Y,void 0,void 0,void 0,void 0,void 0,void 0,U),stencilBuffer:p.stencil,colorSpace:t.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:c.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(l),u=null,o=await s.requestReferenceSpace(a),Nt.setContext(s),Nt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function $(V){for(let U=0;U<V.removed.length;U++){let Y=V.removed[U],q=S.indexOf(Y);q>=0&&(S[q]=null,y[q].disconnect(Y))}for(let U=0;U<V.added.length;U++){let Y=V.added[U],q=S.indexOf(Y);if(q===-1){for(let tt=0;tt<y.length;tt++)if(tt>=S.length){S.push(Y),q=tt;break}else if(S[tt]===null){S[tt]=Y,q=tt;break}if(q===-1)break}let st=y[q];st&&st.connect(Y)}}let O=new I,Q=new I;function X(V,U,Y){O.setFromMatrixPosition(U.matrixWorld),Q.setFromMatrixPosition(Y.matrixWorld);let q=O.distanceTo(Q),st=U.projectionMatrix.elements,tt=Y.projectionMatrix.elements,mt=st[14]/(st[10]-1),Lt=st[14]/(st[10]+1),gt=(st[9]+1)/st[5],P=(st[9]-1)/st[5],zt=(st[8]-1)/st[0],At=(tt[8]+1)/tt[0],Rt=mt*zt,Mt=mt*At,Gt=q/(-zt+At),wt=Gt*-zt;if(U.matrixWorld.decompose(V.position,V.quaternion,V.scale),V.translateX(wt),V.translateZ(Gt),V.matrixWorld.compose(V.position,V.quaternion,V.scale),V.matrixWorldInverse.copy(V.matrixWorld).invert(),st[10]===-1)V.projectionMatrix.copy(U.projectionMatrix),V.projectionMatrixInverse.copy(U.projectionMatrixInverse);else{let R=mt+Gt,M=Lt+Gt,H=Rt-wt,J=Mt+(q-wt),nt=gt*Lt/M*R,K=P*Lt/M*R;V.projectionMatrix.makePerspective(H,J,nt,K,R,M),V.projectionMatrixInverse.copy(V.projectionMatrix).invert()}}function ot(V,U){U===null?V.matrixWorld.copy(V.matrix):V.matrixWorld.multiplyMatrices(U.matrixWorld,V.matrix),V.matrixWorldInverse.copy(V.matrixWorld).invert()}this.updateCamera=function(V){if(s===null)return;let U=V.near,Y=V.far;v.texture!==null&&(v.depthNear>0&&(U=v.depthNear),v.depthFar>0&&(Y=v.depthFar)),g.near=A.near=E.near=U,g.far=A.far=E.far=Y,(_!==g.near||C!==g.far)&&(s.updateRenderState({depthNear:g.near,depthFar:g.far}),_=g.near,C=g.far);let q=V.parent,st=g.cameras;ot(g,q);for(let tt=0;tt<st.length;tt++)ot(st[tt],q);st.length===2?X(g,E,A):g.projectionMatrix.copy(E.projectionMatrix),et(V,g,q)};function et(V,U,Y){Y===null?V.matrix.copy(U.matrixWorld):(V.matrix.copy(Y.matrixWorld),V.matrix.invert(),V.matrix.multiply(U.matrixWorld)),V.matrix.decompose(V.position,V.quaternion,V.scale),V.updateMatrixWorld(!0),V.projectionMatrix.copy(U.projectionMatrix),V.projectionMatrixInverse.copy(U.projectionMatrixInverse),V.isPerspectiveCamera&&(V.fov=gr*2*Math.atan(1/V.projectionMatrix.elements[5]),V.zoom=1)}this.getCamera=function(){return g},this.getFoveation=function(){if(!(c===null&&f===null))return l},this.setFoveation=function(V){l=V,c!==null&&(c.fixedFoveation=V),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=V)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(g)};let it=null;function Et(V,U){if(h=U.getViewerPose(u||o),x=U,h!==null){let Y=h.views;f!==null&&(t.setRenderTargetFramebuffer(b,f.framebuffer),t.setRenderTarget(b));let q=!1;Y.length!==g.cameras.length&&(g.cameras.length=0,q=!0);for(let tt=0;tt<Y.length;tt++){let mt=Y[tt],Lt=null;if(f!==null)Lt=f.getViewport(mt);else{let P=m.getViewSubImage(c,mt);Lt=P.viewport,tt===0&&(t.setRenderTargetTextures(b,P.colorTexture,c.ignoreDepthValues?void 0:P.depthStencilTexture),t.setRenderTarget(b))}let gt=N[tt];gt===void 0&&(gt=new Re,gt.layers.enable(tt),gt.viewport=new ee,N[tt]=gt),gt.matrix.fromArray(mt.transform.matrix),gt.matrix.decompose(gt.position,gt.quaternion,gt.scale),gt.projectionMatrix.fromArray(mt.projectionMatrix),gt.projectionMatrixInverse.copy(gt.projectionMatrix).invert(),gt.viewport.set(Lt.x,Lt.y,Lt.width,Lt.height),tt===0&&(g.matrix.copy(gt.matrix),g.matrix.decompose(g.position,g.quaternion,g.scale)),q===!0&&g.cameras.push(gt)}let st=s.enabledFeatures;if(st&&st.includes("depth-sensing")){let tt=m.getDepthInformation(Y[0]);tt&&tt.isValid&&tt.texture&&v.init(t,tt,s.renderState)}}for(let Y=0;Y<y.length;Y++){let q=S[Y],st=y[Y];q!==null&&st!==void 0&&st.update(q,U,u||o)}it&&it(V,U),U.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:U}),x=null}let Nt=new ih;Nt.setAnimationLoop(Et),this.setAnimationLoop=function(V){it=V},this.dispose=function(){}}},Kn=new Se,zm=new Vt;Ar=class{constructor(t={}){let{canvas:e=Vu(),context:i=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:u=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:m=!1}=t;this.isWebGLRenderer=!0;let c;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");c=i.getContextAttributes().alpha}else c=o;let f=new Uint32Array(4),x=new Int32Array(4),v=null,p=null,d=[],b=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ge,this.toneMapping=Bn,this.toneMappingExposure=1;let y=this,S=!1,L=0,T=0,E=null,A=-1,N=null,g=new ee,_=new ee,C=null,D=new Pt(0),z=0,$=e.width,O=e.height,Q=1,X=null,ot=null,et=new ee(0,0,$,O),it=new ee(0,0,$,O),Et=!1,Nt=new ys,V=!1,U=!1,Y=new Vt,q=new Vt,st=new I,tt=new ee,mt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Lt=!1;function gt(){return E===null?Q:1}let P=i;function zt(w,k){return e.getContext(w,k)}try{let w={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:u,powerPreference:h,failIfMajorPerformanceCaveat:m};if("setAttribute"in e&&e.setAttribute("data-engine","three.js r169"),e.addEventListener("webglcontextlost",j,!1),e.addEventListener("webglcontextrestored",ht,!1),e.addEventListener("webglcontextcreationerror",pt,!1),P===null){let k="webgl2";if(P=zt(k,w),P===null)throw zt(k)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let At,Rt,Mt,Gt,wt,R,M,H,J,nt,K,bt,lt,ft,Wt,rt,xt,Ft,Ot,_t,Xt,kt,ie,F;function dt(){At=new n0(P),At.init(),kt=new Um(P,At),Rt=new Jp(P,At,t,kt),Mt=new Im(P),Rt.reverseDepthBuffer&&Mt.buffers.depth.setReversed(!0),Gt=new r0(P),wt=new _m,R=new Dm(P,At,Mt,wt,Rt,kt,Gt),M=new Qp(y),H=new e0(y),J=new ff(P),ie=new Zp(P,J),nt=new i0(P,J,Gt,ie),K=new a0(P,nt,J,Gt),Ot=new o0(P,Rt,R),rt=new Kp(wt),bt=new xm(y,M,H,At,Rt,ie,rt),lt=new km(y,wt),ft=new vm,Wt=new Tm(At),Ft=new Yp(y,M,H,Mt,K,c,l),xt=new Cm(y,K,Rt),F=new Bm(P,Gt,Rt,Mt),_t=new $p(P,At,Gt),Xt=new s0(P,At,Gt),Gt.programs=bt.programs,y.capabilities=Rt,y.extensions=At,y.properties=wt,y.renderLists=ft,y.shadowMap=xt,y.state=Mt,y.info=Gt}dt();let Z=new Fa(y,P);this.xr=Z,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){let w=At.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){let w=At.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return Q},this.setPixelRatio=function(w){w!==void 0&&(Q=w,this.setSize($,O,!1))},this.getSize=function(w){return w.set($,O)},this.setSize=function(w,k,G=!0){if(Z.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}$=w,O=k,e.width=Math.floor(w*Q),e.height=Math.floor(k*Q),G===!0&&(e.style.width=w+"px",e.style.height=k+"px"),this.setViewport(0,0,w,k)},this.getDrawingBufferSize=function(w){return w.set($*Q,O*Q).floor()},this.setDrawingBufferSize=function(w,k,G){$=w,O=k,Q=G,e.width=Math.floor(w*G),e.height=Math.floor(k*G),this.setViewport(0,0,w,k)},this.getCurrentViewport=function(w){return w.copy(g)},this.getViewport=function(w){return w.copy(et)},this.setViewport=function(w,k,G,W){w.isVector4?et.set(w.x,w.y,w.z,w.w):et.set(w,k,G,W),Mt.viewport(g.copy(et).multiplyScalar(Q).round())},this.getScissor=function(w){return w.copy(it)},this.setScissor=function(w,k,G,W){w.isVector4?it.set(w.x,w.y,w.z,w.w):it.set(w,k,G,W),Mt.scissor(_.copy(it).multiplyScalar(Q).round())},this.getScissorTest=function(){return Et},this.setScissorTest=function(w){Mt.setScissorTest(Et=w)},this.setOpaqueSort=function(w){X=w},this.setTransparentSort=function(w){ot=w},this.getClearColor=function(w){return w.copy(Ft.getClearColor())},this.setClearColor=function(){Ft.setClearColor.apply(Ft,arguments)},this.getClearAlpha=function(){return Ft.getClearAlpha()},this.setClearAlpha=function(){Ft.setClearAlpha.apply(Ft,arguments)},this.clear=function(w=!0,k=!0,G=!0){let W=0;if(w){let B=!1;if(E!==null){let at=E.texture.format;B=at===fl||at===ul||at===hl}if(B){let at=E.texture.type,ut=at===An||at===ii||at===_s||at===zi||at===al||at===ll,vt=Ft.getClearColor(),St=Ft.getClearAlpha(),Dt=vt.r,Ut=vt.g,Tt=vt.b;ut?(f[0]=Dt,f[1]=Ut,f[2]=Tt,f[3]=St,P.clearBufferuiv(P.COLOR,0,f)):(x[0]=Dt,x[1]=Ut,x[2]=Tt,x[3]=St,P.clearBufferiv(P.COLOR,0,x))}else W|=P.COLOR_BUFFER_BIT}k&&(W|=P.DEPTH_BUFFER_BIT,P.clearDepth(this.capabilities.reverseDepthBuffer?0:1)),G&&(W|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),P.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",j,!1),e.removeEventListener("webglcontextrestored",ht,!1),e.removeEventListener("webglcontextcreationerror",pt,!1),ft.dispose(),Wt.dispose(),wt.dispose(),M.dispose(),H.dispose(),K.dispose(),ie.dispose(),F.dispose(),bt.dispose(),Z.dispose(),Z.removeEventListener("sessionstart",Pl),Z.removeEventListener("sessionend",Il),Xn.stop()};function j(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),S=!0}function ht(){console.log("THREE.WebGLRenderer: Context Restored."),S=!1;let w=Gt.autoReset,k=xt.enabled,G=xt.autoUpdate,W=xt.needsUpdate,B=xt.type;dt(),Gt.autoReset=w,xt.enabled=k,xt.autoUpdate=G,xt.needsUpdate=W,xt.type=B}function pt(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function qt(w){let k=w.target;k.removeEventListener("dispose",qt),pe(k)}function pe(w){Be(w),wt.remove(w)}function Be(w){let k=wt.get(w).programs;k!==void 0&&(k.forEach(function(G){bt.releaseProgram(G)}),w.isShaderMaterial&&bt.releaseShaderCache(w))}this.renderBufferDirect=function(w,k,G,W,B,at){k===null&&(k=mt);let ut=B.isMesh&&B.matrixWorld.determinant()<0,vt=Kh(w,k,G,W,B);Mt.setMaterial(W,ut);let St=G.index,Dt=1;if(W.wireframe===!0){if(St=nt.getWireframeAttribute(G),St===void 0)return;Dt=2}let Ut=G.drawRange,Tt=G.attributes.position,Qt=Ut.start*Dt,oe=(Ut.start+Ut.count)*Dt;at!==null&&(Qt=Math.max(Qt,at.start*Dt),oe=Math.min(oe,(at.start+at.count)*Dt)),St!==null?(Qt=Math.max(Qt,0),oe=Math.min(oe,St.count)):Tt!=null&&(Qt=Math.max(Qt,0),oe=Math.min(oe,Tt.count));let he=oe-Qt;if(he<0||he===1/0)return;ie.setup(B,W,vt,G,St);let qe,Zt=_t;if(St!==null&&(qe=J.get(St),Zt=Xt,Zt.setIndex(qe)),B.isMesh)W.wireframe===!0?(Mt.setLineWidth(W.wireframeLinewidth*gt()),Zt.setMode(P.LINES)):Zt.setMode(P.TRIANGLES);else if(B.isLine){let Ct=W.linewidth;Ct===void 0&&(Ct=1),Mt.setLineWidth(Ct*gt()),B.isLineSegments?Zt.setMode(P.LINES):B.isLineLoop?Zt.setMode(P.LINE_LOOP):Zt.setMode(P.LINE_STRIP)}else B.isPoints?Zt.setMode(P.POINTS):B.isSprite&&Zt.setMode(P.TRIANGLES);if(B.isBatchedMesh)if(B._multiDrawInstances!==null)Zt.renderMultiDrawInstances(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount,B._multiDrawInstances);else if(At.get("WEBGL_multi_draw"))Zt.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else{let Ct=B._multiDrawStarts,Te=B._multiDrawCounts,$t=B._multiDrawCount,nn=St?J.get(St).bytesPerElement:1,di=wt.get(W).currentProgram.getUniforms();for(let Ye=0;Ye<$t;Ye++)di.setValue(P,"_gl_DrawID",Ye),Zt.render(Ct[Ye]/nn,Te[Ye])}else if(B.isInstancedMesh)Zt.renderInstances(Qt,he,B.count);else if(G.isInstancedBufferGeometry){let Ct=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,Te=Math.min(G.instanceCount,Ct);Zt.renderInstances(Qt,he,Te)}else Zt.render(Qt,he)};function Yt(w,k,G){w.transparent===!0&&w.side===Kt&&w.forceSinglePass===!1?(w.side=Le,w.needsUpdate=!0,Ds(w,k,G),w.side=Hn,w.needsUpdate=!0,Ds(w,k,G),w.side=Kt):Ds(w,k,G)}this.compile=function(w,k,G=null){G===null&&(G=w),p=Wt.get(G),p.init(k),b.push(p),G.traverseVisible(function(B){B.isLight&&B.layers.test(k.layers)&&(p.pushLight(B),B.castShadow&&p.pushShadow(B))}),w!==G&&w.traverseVisible(function(B){B.isLight&&B.layers.test(k.layers)&&(p.pushLight(B),B.castShadow&&p.pushShadow(B))}),p.setupLights();let W=new Set;return w.traverse(function(B){if(!(B.isMesh||B.isPoints||B.isLine||B.isSprite))return;let at=B.material;if(at)if(Array.isArray(at))for(let ut=0;ut<at.length;ut++){let vt=at[ut];Yt(vt,G,B),W.add(vt)}else Yt(at,G,B),W.add(at)}),b.pop(),p=null,W},this.compileAsync=function(w,k,G=null){let W=this.compile(w,k,G);return new Promise(B=>{function at(){if(W.forEach(function(ut){wt.get(ut).currentProgram.isReady()&&W.delete(ut)}),W.size===0){B(w);return}setTimeout(at,10)}At.get("KHR_parallel_shader_compile")!==null?at():setTimeout(at,10)})};let He=null;function _n(w){He&&He(w)}function Pl(){Xn.stop()}function Il(){Xn.start()}let Xn=new ih;Xn.setAnimationLoop(_n),typeof self<"u"&&Xn.setContext(self),this.setAnimationLoop=function(w){He=w,Z.setAnimationLoop(w),w===null?Xn.stop():Xn.start()},Z.addEventListener("sessionstart",Pl),Z.addEventListener("sessionend",Il),this.render=function(w,k){if(k!==void 0&&k.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(S===!0)return;if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),Z.enabled===!0&&Z.isPresenting===!0&&(Z.cameraAutoUpdate===!0&&Z.updateCamera(k),k=Z.getCamera()),w.isScene===!0&&w.onBeforeRender(y,w,k,E),p=Wt.get(w,b.length),p.init(k),b.push(p),q.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),Nt.setFromProjectionMatrix(q),U=this.localClippingEnabled,V=rt.init(this.clippingPlanes,U),v=ft.get(w,d.length),v.init(),d.push(v),Z.enabled===!0&&Z.isPresenting===!0){let at=y.xr.getDepthSensingMesh();at!==null&&Zr(at,k,-1/0,y.sortObjects)}Zr(w,k,0,y.sortObjects),v.finish(),y.sortObjects===!0&&v.sort(X,ot),Lt=Z.enabled===!1||Z.isPresenting===!1||Z.hasDepthSensing()===!1,Lt&&Ft.addToRenderList(v,w),this.info.render.frame++,V===!0&&rt.beginShadows();let G=p.state.shadowsArray;xt.render(G,w,k),V===!0&&rt.endShadows(),this.info.autoReset===!0&&this.info.reset();let W=v.opaque,B=v.transmissive;if(p.setupLights(),k.isArrayCamera){let at=k.cameras;if(B.length>0)for(let ut=0,vt=at.length;ut<vt;ut++){let St=at[ut];Dl(W,B,w,St)}Lt&&Ft.render(w);for(let ut=0,vt=at.length;ut<vt;ut++){let St=at[ut];Ll(v,w,St,St.viewport)}}else B.length>0&&Dl(W,B,w,k),Lt&&Ft.render(w),Ll(v,w,k);E!==null&&(R.updateMultisampleRenderTarget(E),R.updateRenderTargetMipmap(E)),w.isScene===!0&&w.onAfterRender(y,w,k),ie.resetDefaultState(),A=-1,N=null,b.pop(),b.length>0?(p=b[b.length-1],V===!0&&rt.setGlobalState(y.clippingPlanes,p.state.camera)):p=null,d.pop(),d.length>0?v=d[d.length-1]:v=null};function Zr(w,k,G,W){if(w.visible===!1)return;if(w.layers.test(k.layers)){if(w.isGroup)G=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(k);else if(w.isLight)p.pushLight(w),w.castShadow&&p.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||Nt.intersectsSprite(w)){W&&tt.setFromMatrixPosition(w.matrixWorld).applyMatrix4(q);let ut=K.update(w),vt=w.material;vt.visible&&v.push(w,ut,vt,G,tt.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||Nt.intersectsObject(w))){let ut=K.update(w),vt=w.material;if(W&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),tt.copy(w.boundingSphere.center)):(ut.boundingSphere===null&&ut.computeBoundingSphere(),tt.copy(ut.boundingSphere.center)),tt.applyMatrix4(w.matrixWorld).applyMatrix4(q)),Array.isArray(vt)){let St=ut.groups;for(let Dt=0,Ut=St.length;Dt<Ut;Dt++){let Tt=St[Dt],Qt=vt[Tt.materialIndex];Qt&&Qt.visible&&v.push(w,ut,Qt,G,tt.z,Tt)}}else vt.visible&&v.push(w,ut,vt,G,tt.z,null)}}let at=w.children;for(let ut=0,vt=at.length;ut<vt;ut++)Zr(at[ut],k,G,W)}function Ll(w,k,G,W){let B=w.opaque,at=w.transmissive,ut=w.transparent;p.setupLightsView(G),V===!0&&rt.setGlobalState(y.clippingPlanes,G),W&&Mt.viewport(g.copy(W)),B.length>0&&Ls(B,k,G),at.length>0&&Ls(at,k,G),ut.length>0&&Ls(ut,k,G),Mt.buffers.depth.setTest(!0),Mt.buffers.depth.setMask(!0),Mt.buffers.color.setMask(!0),Mt.setPolygonOffset(!1)}function Dl(w,k,G,W){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[W.id]===void 0&&(p.state.transmissionRenderTarget[W.id]=new Rn(1,1,{generateMipmaps:!0,type:At.has("EXT_color_buffer_half_float")||At.has("EXT_color_buffer_float")?Es:An,minFilter:ni,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Jt.workingColorSpace}));let at=p.state.transmissionRenderTarget[W.id],ut=W.viewport||g;at.setSize(ut.z,ut.w);let vt=y.getRenderTarget();y.setRenderTarget(at),y.getClearColor(D),z=y.getClearAlpha(),z<1&&y.setClearColor(16777215,.5),y.clear(),Lt&&Ft.render(G);let St=y.toneMapping;y.toneMapping=Bn;let Dt=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),p.setupLightsView(W),V===!0&&rt.setGlobalState(y.clippingPlanes,W),Ls(w,G,W),R.updateMultisampleRenderTarget(at),R.updateRenderTargetMipmap(at),At.has("WEBGL_multisampled_render_to_texture")===!1){let Ut=!1;for(let Tt=0,Qt=k.length;Tt<Qt;Tt++){let oe=k[Tt],he=oe.object,qe=oe.geometry,Zt=oe.material,Ct=oe.group;if(Zt.side===Kt&&he.layers.test(W.layers)){let Te=Zt.side;Zt.side=Le,Zt.needsUpdate=!0,Ul(he,G,W,qe,Zt,Ct),Zt.side=Te,Zt.needsUpdate=!0,Ut=!0}}Ut===!0&&(R.updateMultisampleRenderTarget(at),R.updateRenderTargetMipmap(at))}y.setRenderTarget(vt),y.setClearColor(D,z),Dt!==void 0&&(W.viewport=Dt),y.toneMapping=St}function Ls(w,k,G){let W=k.isScene===!0?k.overrideMaterial:null;for(let B=0,at=w.length;B<at;B++){let ut=w[B],vt=ut.object,St=ut.geometry,Dt=W===null?ut.material:W,Ut=ut.group;vt.layers.test(G.layers)&&Ul(vt,k,G,St,Dt,Ut)}}function Ul(w,k,G,W,B,at){w.onBeforeRender(y,k,G,W,B,at),w.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),B.onBeforeRender(y,k,G,W,w,at),B.transparent===!0&&B.side===Kt&&B.forceSinglePass===!1?(B.side=Le,B.needsUpdate=!0,y.renderBufferDirect(G,k,W,B,w,at),B.side=Hn,B.needsUpdate=!0,y.renderBufferDirect(G,k,W,B,w,at),B.side=Kt):y.renderBufferDirect(G,k,W,B,w,at),w.onAfterRender(y,k,G,W,B,at)}function Ds(w,k,G){k.isScene!==!0&&(k=mt);let W=wt.get(w),B=p.state.lights,at=p.state.shadowsArray,ut=B.state.version,vt=bt.getParameters(w,B.state,at,k,G),St=bt.getProgramCacheKey(vt),Dt=W.programs;W.environment=w.isMeshStandardMaterial?k.environment:null,W.fog=k.fog,W.envMap=(w.isMeshStandardMaterial?H:M).get(w.envMap||W.environment),W.envMapRotation=W.environment!==null&&w.envMap===null?k.environmentRotation:w.envMapRotation,Dt===void 0&&(w.addEventListener("dispose",qt),Dt=new Map,W.programs=Dt);let Ut=Dt.get(St);if(Ut!==void 0){if(W.currentProgram===Ut&&W.lightsStateVersion===ut)return Fl(w,vt),Ut}else vt.uniforms=bt.getUniforms(w),w.onBeforeCompile(vt,y),Ut=bt.acquireProgram(vt,St),Dt.set(St,Ut),W.uniforms=vt.uniforms;let Tt=W.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Tt.clippingPlanes=rt.uniform),Fl(w,vt),W.needsLights=jh(w),W.lightsStateVersion=ut,W.needsLights&&(Tt.ambientLightColor.value=B.state.ambient,Tt.lightProbe.value=B.state.probe,Tt.directionalLights.value=B.state.directional,Tt.directionalLightShadows.value=B.state.directionalShadow,Tt.spotLights.value=B.state.spot,Tt.spotLightShadows.value=B.state.spotShadow,Tt.rectAreaLights.value=B.state.rectArea,Tt.ltc_1.value=B.state.rectAreaLTC1,Tt.ltc_2.value=B.state.rectAreaLTC2,Tt.pointLights.value=B.state.point,Tt.pointLightShadows.value=B.state.pointShadow,Tt.hemisphereLights.value=B.state.hemi,Tt.directionalShadowMap.value=B.state.directionalShadowMap,Tt.directionalShadowMatrix.value=B.state.directionalShadowMatrix,Tt.spotShadowMap.value=B.state.spotShadowMap,Tt.spotLightMatrix.value=B.state.spotLightMatrix,Tt.spotLightMap.value=B.state.spotLightMap,Tt.pointShadowMap.value=B.state.pointShadowMap,Tt.pointShadowMatrix.value=B.state.pointShadowMatrix),W.currentProgram=Ut,W.uniformsList=null,Ut}function Nl(w){if(w.uniformsList===null){let k=w.currentProgram.getUniforms();w.uniformsList=Ui.seqWithValue(k.seq,w.uniforms)}return w.uniformsList}function Fl(w,k){let G=wt.get(w);G.outputColorSpace=k.outputColorSpace,G.batching=k.batching,G.batchingColor=k.batchingColor,G.instancing=k.instancing,G.instancingColor=k.instancingColor,G.instancingMorph=k.instancingMorph,G.skinning=k.skinning,G.morphTargets=k.morphTargets,G.morphNormals=k.morphNormals,G.morphColors=k.morphColors,G.morphTargetsCount=k.morphTargetsCount,G.numClippingPlanes=k.numClippingPlanes,G.numIntersection=k.numClipIntersection,G.vertexAlphas=k.vertexAlphas,G.vertexTangents=k.vertexTangents,G.toneMapping=k.toneMapping}function Kh(w,k,G,W,B){k.isScene!==!0&&(k=mt),R.resetTextureUnits();let at=k.fog,ut=W.isMeshStandardMaterial?k.environment:null,vt=E===null?y.outputColorSpace:E.isXRRenderTarget===!0?E.texture.colorSpace:Wn,St=(W.isMeshStandardMaterial?H:M).get(W.envMap||ut),Dt=W.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,Ut=!!G.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),Tt=!!G.morphAttributes.position,Qt=!!G.morphAttributes.normal,oe=!!G.morphAttributes.color,he=Bn;W.toneMapped&&(E===null||E.isXRRenderTarget===!0)&&(he=y.toneMapping);let qe=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,Zt=qe!==void 0?qe.length:0,Ct=wt.get(W),Te=p.state.lights;if(V===!0&&(U===!0||w!==N)){let Ke=w===N&&W.id===A;rt.setState(W,w,Ke)}let $t=!1;W.version===Ct.__version?(Ct.needsLights&&Ct.lightsStateVersion!==Te.state.version||Ct.outputColorSpace!==vt||B.isBatchedMesh&&Ct.batching===!1||!B.isBatchedMesh&&Ct.batching===!0||B.isBatchedMesh&&Ct.batchingColor===!0&&B.colorTexture===null||B.isBatchedMesh&&Ct.batchingColor===!1&&B.colorTexture!==null||B.isInstancedMesh&&Ct.instancing===!1||!B.isInstancedMesh&&Ct.instancing===!0||B.isSkinnedMesh&&Ct.skinning===!1||!B.isSkinnedMesh&&Ct.skinning===!0||B.isInstancedMesh&&Ct.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&Ct.instancingColor===!1&&B.instanceColor!==null||B.isInstancedMesh&&Ct.instancingMorph===!0&&B.morphTexture===null||B.isInstancedMesh&&Ct.instancingMorph===!1&&B.morphTexture!==null||Ct.envMap!==St||W.fog===!0&&Ct.fog!==at||Ct.numClippingPlanes!==void 0&&(Ct.numClippingPlanes!==rt.numPlanes||Ct.numIntersection!==rt.numIntersection)||Ct.vertexAlphas!==Dt||Ct.vertexTangents!==Ut||Ct.morphTargets!==Tt||Ct.morphNormals!==Qt||Ct.morphColors!==oe||Ct.toneMapping!==he||Ct.morphTargetsCount!==Zt)&&($t=!0):($t=!0,Ct.__version=W.version);let nn=Ct.currentProgram;$t===!0&&(nn=Ds(W,k,B));let di=!1,Ye=!1,$r=!1,ue=nn.getUniforms(),In=Ct.uniforms;if(Mt.useProgram(nn.program)&&(di=!0,Ye=!0,$r=!0),W.id!==A&&(A=W.id,Ye=!0),di||N!==w){Rt.reverseDepthBuffer?(Y.copy(w.projectionMatrix),Wu(Y),Xu(Y),ue.setValue(P,"projectionMatrix",Y)):ue.setValue(P,"projectionMatrix",w.projectionMatrix),ue.setValue(P,"viewMatrix",w.matrixWorldInverse);let Ke=ue.map.cameraPosition;Ke!==void 0&&Ke.setValue(P,st.setFromMatrixPosition(w.matrixWorld)),Rt.logarithmicDepthBuffer&&ue.setValue(P,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&ue.setValue(P,"isOrthographic",w.isOrthographicCamera===!0),N!==w&&(N=w,Ye=!0,$r=!0)}if(B.isSkinnedMesh){ue.setOptional(P,B,"bindMatrix"),ue.setOptional(P,B,"bindMatrixInverse");let Ke=B.skeleton;Ke&&(Ke.boneTexture===null&&Ke.computeBoneTexture(),ue.setValue(P,"boneTexture",Ke.boneTexture,R))}B.isBatchedMesh&&(ue.setOptional(P,B,"batchingTexture"),ue.setValue(P,"batchingTexture",B._matricesTexture,R),ue.setOptional(P,B,"batchingIdTexture"),ue.setValue(P,"batchingIdTexture",B._indirectTexture,R),ue.setOptional(P,B,"batchingColorTexture"),B._colorsTexture!==null&&ue.setValue(P,"batchingColorTexture",B._colorsTexture,R));let Jr=G.morphAttributes;if((Jr.position!==void 0||Jr.normal!==void 0||Jr.color!==void 0)&&Ot.update(B,G,nn),(Ye||Ct.receiveShadow!==B.receiveShadow)&&(Ct.receiveShadow=B.receiveShadow,ue.setValue(P,"receiveShadow",B.receiveShadow)),W.isMeshGouraudMaterial&&W.envMap!==null&&(In.envMap.value=St,In.flipEnvMap.value=St.isCubeTexture&&St.isRenderTargetTexture===!1?-1:1),W.isMeshStandardMaterial&&W.envMap===null&&k.environment!==null&&(In.envMapIntensity.value=k.environmentIntensity),Ye&&(ue.setValue(P,"toneMappingExposure",y.toneMappingExposure),Ct.needsLights&&Qh(In,$r),at&&W.fog===!0&&lt.refreshFogUniforms(In,at),lt.refreshMaterialUniforms(In,W,Q,O,p.state.transmissionRenderTarget[w.id]),Ui.upload(P,Nl(Ct),In,R)),W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(Ui.upload(P,Nl(Ct),In,R),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&ue.setValue(P,"center",B.center),ue.setValue(P,"modelViewMatrix",B.modelViewMatrix),ue.setValue(P,"normalMatrix",B.normalMatrix),ue.setValue(P,"modelMatrix",B.matrixWorld),W.isShaderMaterial||W.isRawShaderMaterial){let Ke=W.uniformsGroups;for(let Kr=0,tu=Ke.length;Kr<tu;Kr++){let Ol=Ke[Kr];F.update(Ol,nn),F.bind(Ol,nn)}}return nn}function Qh(w,k){w.ambientLightColor.needsUpdate=k,w.lightProbe.needsUpdate=k,w.directionalLights.needsUpdate=k,w.directionalLightShadows.needsUpdate=k,w.pointLights.needsUpdate=k,w.pointLightShadows.needsUpdate=k,w.spotLights.needsUpdate=k,w.spotLightShadows.needsUpdate=k,w.rectAreaLights.needsUpdate=k,w.hemisphereLights.needsUpdate=k}function jh(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return L},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return E},this.setRenderTargetTextures=function(w,k,G){wt.get(w.texture).__webglTexture=k,wt.get(w.depthTexture).__webglTexture=G;let W=wt.get(w);W.__hasExternalTextures=!0,W.__autoAllocateDepthBuffer=G===void 0,W.__autoAllocateDepthBuffer||At.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),W.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(w,k){let G=wt.get(w);G.__webglFramebuffer=k,G.__useDefaultFramebuffer=k===void 0},this.setRenderTarget=function(w,k=0,G=0){E=w,L=k,T=G;let W=!0,B=null,at=!1,ut=!1;if(w){let St=wt.get(w);if(St.__useDefaultFramebuffer!==void 0)Mt.bindFramebuffer(P.FRAMEBUFFER,null),W=!1;else if(St.__webglFramebuffer===void 0)R.setupRenderTarget(w);else if(St.__hasExternalTextures)R.rebindTextures(w,wt.get(w.texture).__webglTexture,wt.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){let Tt=w.depthTexture;if(St.__boundDepthTexture!==Tt){if(Tt!==null&&wt.has(Tt)&&(w.width!==Tt.image.width||w.height!==Tt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");R.setupDepthRenderbuffer(w)}}let Dt=w.texture;(Dt.isData3DTexture||Dt.isDataArrayTexture||Dt.isCompressedArrayTexture)&&(ut=!0);let Ut=wt.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Ut[k])?B=Ut[k][G]:B=Ut[k],at=!0):w.samples>0&&R.useMultisampledRTT(w)===!1?B=wt.get(w).__webglMultisampledFramebuffer:Array.isArray(Ut)?B=Ut[G]:B=Ut,g.copy(w.viewport),_.copy(w.scissor),C=w.scissorTest}else g.copy(et).multiplyScalar(Q).floor(),_.copy(it).multiplyScalar(Q).floor(),C=Et;if(Mt.bindFramebuffer(P.FRAMEBUFFER,B)&&W&&Mt.drawBuffers(w,B),Mt.viewport(g),Mt.scissor(_),Mt.setScissorTest(C),at){let St=wt.get(w.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+k,St.__webglTexture,G)}else if(ut){let St=wt.get(w.texture),Dt=k||0;P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,St.__webglTexture,G||0,Dt)}A=-1},this.readRenderTargetPixels=function(w,k,G,W,B,at,ut){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let vt=wt.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&ut!==void 0&&(vt=vt[ut]),vt){Mt.bindFramebuffer(P.FRAMEBUFFER,vt);try{let St=w.texture,Dt=St.format,Ut=St.type;if(!Rt.textureFormatReadable(Dt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Rt.textureTypeReadable(Ut)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=w.width-W&&G>=0&&G<=w.height-B&&P.readPixels(k,G,W,B,kt.convert(Dt),kt.convert(Ut),at)}finally{let St=E!==null?wt.get(E).__webglFramebuffer:null;Mt.bindFramebuffer(P.FRAMEBUFFER,St)}}},this.readRenderTargetPixelsAsync=async function(w,k,G,W,B,at,ut){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let vt=wt.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&ut!==void 0&&(vt=vt[ut]),vt){let St=w.texture,Dt=St.format,Ut=St.type;if(!Rt.textureFormatReadable(Dt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Rt.textureTypeReadable(Ut))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(k>=0&&k<=w.width-W&&G>=0&&G<=w.height-B){Mt.bindFramebuffer(P.FRAMEBUFFER,vt);let Tt=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,Tt),P.bufferData(P.PIXEL_PACK_BUFFER,at.byteLength,P.STREAM_READ),P.readPixels(k,G,W,B,kt.convert(Dt),kt.convert(Ut),0);let Qt=E!==null?wt.get(E).__webglFramebuffer:null;Mt.bindFramebuffer(P.FRAMEBUFFER,Qt);let oe=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await Gu(P,oe,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,Tt),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,at),P.deleteBuffer(Tt),P.deleteSync(oe),at}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(w,k=null,G=0){w.isTexture!==!0&&(cr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),k=arguments[0]||null,w=arguments[1]);let W=Math.pow(2,-G),B=Math.floor(w.image.width*W),at=Math.floor(w.image.height*W),ut=k!==null?k.x:0,vt=k!==null?k.y:0;R.setTexture2D(w,0),P.copyTexSubImage2D(P.TEXTURE_2D,G,0,0,ut,vt,B,at),Mt.unbindTexture()},this.copyTextureToTexture=function(w,k,G=null,W=null,B=0){w.isTexture!==!0&&(cr("WebGLRenderer: copyTextureToTexture function signature has changed."),W=arguments[0]||null,w=arguments[1],k=arguments[2],B=arguments[3]||0,G=null);let at,ut,vt,St,Dt,Ut;G!==null?(at=G.max.x-G.min.x,ut=G.max.y-G.min.y,vt=G.min.x,St=G.min.y):(at=w.image.width,ut=w.image.height,vt=0,St=0),W!==null?(Dt=W.x,Ut=W.y):(Dt=0,Ut=0);let Tt=kt.convert(k.format),Qt=kt.convert(k.type);R.setTexture2D(k,0),P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,k.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,k.unpackAlignment);let oe=P.getParameter(P.UNPACK_ROW_LENGTH),he=P.getParameter(P.UNPACK_IMAGE_HEIGHT),qe=P.getParameter(P.UNPACK_SKIP_PIXELS),Zt=P.getParameter(P.UNPACK_SKIP_ROWS),Ct=P.getParameter(P.UNPACK_SKIP_IMAGES),Te=w.isCompressedTexture?w.mipmaps[B]:w.image;P.pixelStorei(P.UNPACK_ROW_LENGTH,Te.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,Te.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,vt),P.pixelStorei(P.UNPACK_SKIP_ROWS,St),w.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,B,Dt,Ut,at,ut,Tt,Qt,Te.data):w.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,B,Dt,Ut,Te.width,Te.height,Tt,Te.data):P.texSubImage2D(P.TEXTURE_2D,B,Dt,Ut,at,ut,Tt,Qt,Te),P.pixelStorei(P.UNPACK_ROW_LENGTH,oe),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,he),P.pixelStorei(P.UNPACK_SKIP_PIXELS,qe),P.pixelStorei(P.UNPACK_SKIP_ROWS,Zt),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Ct),B===0&&k.generateMipmaps&&P.generateMipmap(P.TEXTURE_2D),Mt.unbindTexture()},this.copyTextureToTexture3D=function(w,k,G=null,W=null,B=0){w.isTexture!==!0&&(cr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),G=arguments[0]||null,W=arguments[1]||null,w=arguments[2],k=arguments[3],B=arguments[4]||0);let at,ut,vt,St,Dt,Ut,Tt,Qt,oe,he=w.isCompressedTexture?w.mipmaps[B]:w.image;G!==null?(at=G.max.x-G.min.x,ut=G.max.y-G.min.y,vt=G.max.z-G.min.z,St=G.min.x,Dt=G.min.y,Ut=G.min.z):(at=he.width,ut=he.height,vt=he.depth,St=0,Dt=0,Ut=0),W!==null?(Tt=W.x,Qt=W.y,oe=W.z):(Tt=0,Qt=0,oe=0);let qe=kt.convert(k.format),Zt=kt.convert(k.type),Ct;if(k.isData3DTexture)R.setTexture3D(k,0),Ct=P.TEXTURE_3D;else if(k.isDataArrayTexture||k.isCompressedArrayTexture)R.setTexture2DArray(k,0),Ct=P.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,k.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,k.unpackAlignment);let Te=P.getParameter(P.UNPACK_ROW_LENGTH),$t=P.getParameter(P.UNPACK_IMAGE_HEIGHT),nn=P.getParameter(P.UNPACK_SKIP_PIXELS),di=P.getParameter(P.UNPACK_SKIP_ROWS),Ye=P.getParameter(P.UNPACK_SKIP_IMAGES);P.pixelStorei(P.UNPACK_ROW_LENGTH,he.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,he.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,St),P.pixelStorei(P.UNPACK_SKIP_ROWS,Dt),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Ut),w.isDataTexture||w.isData3DTexture?P.texSubImage3D(Ct,B,Tt,Qt,oe,at,ut,vt,qe,Zt,he.data):k.isCompressedArrayTexture?P.compressedTexSubImage3D(Ct,B,Tt,Qt,oe,at,ut,vt,qe,he.data):P.texSubImage3D(Ct,B,Tt,Qt,oe,at,ut,vt,qe,Zt,he),P.pixelStorei(P.UNPACK_ROW_LENGTH,Te),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,$t),P.pixelStorei(P.UNPACK_SKIP_PIXELS,nn),P.pixelStorei(P.UNPACK_SKIP_ROWS,di),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Ye),B===0&&k.generateMipmaps&&P.generateMipmap(Ct),Mt.unbindTexture()},this.initRenderTarget=function(w){wt.get(w).__webglFramebuffer===void 0&&R.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?R.setTextureCube(w,0):w.isData3DTexture?R.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?R.setTexture2DArray(w,0):R.setTexture2D(w,0),Mt.unbindTexture()},this.resetState=function(){L=0,T=0,E=null,Mt.reset(),ie.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Tn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=t===dl?"display-p3":"srgb",e.unpackColorSpace=Jt.workingColorSpace===Fr?"display-p3":"srgb"}},Vi=class extends Ce{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Se,this.environmentIntensity=1,this.environmentRotation=new Se,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}},Oa=class extends Xe{constructor(t=null,e=1,i=1,s,r,o,a,l,u=We,h=We,m,c){super(null,o,a,l,u,h,s,r,m,c),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},vs=class extends Ne{constructor(t,e,i,s=1){super(t,e,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},Ri=new Vt,Dc=new Vt,er=[],Uc=new Cn,Hm=new Vt,hs=new jt,us=new si,oi=class extends jt{constructor(t,e,i){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new vs(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,Hm)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Cn),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,Ri),Uc.copy(t.boundingBox).applyMatrix4(Ri),this.boundingBox.union(Uc)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new si),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,Ri),us.copy(t.boundingSphere).applyMatrix4(Ri),this.boundingSphere.union(us)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let i=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=i.length+1,o=t*r+1;for(let a=0;a<i.length;a++)i[a]=s[o+a]}raycast(t,e){let i=this.matrixWorld,s=this.count;if(hs.geometry=this.geometry,hs.material=this.material,hs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),us.copy(this.boundingSphere),us.applyMatrix4(i),t.ray.intersectsSphere(us)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Ri),Dc.multiplyMatrices(i,Ri),hs.matrixWorld=Dc,hs.raycast(t,er);for(let o=0,a=er.length;o<a;o++){let l=er[o];l.instanceId=r,l.object=this,e.push(l)}er.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new vs(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){let i=e.morphTargetInfluences,s=i.length+1;this.morphTexture===null&&(this.morphTexture=new Oa(new Float32Array(s*this.count),s,this.count,cl,mn));let r=this.morphTexture.source.data.data,o=0;for(let u=0;u<i.length;u++)o+=i[u];let a=this.geometry.morphTargetsRelative?1:1-o,l=s*t;r[l]=a,r.set(i,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}},Gi=class extends Xe{constructor(t,e,i,s,r,o,a,l,u){super(t,e,i,s,r,o,a,l,u),this.isCanvasTexture=!0,this.needsUpdate=!0}},cn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){let i=this.getUtoTmapping(t);return this.getPoint(i,e)}getPoints(t=5){let e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return e}getSpacedPoints(t=5){let e=[];for(let i=0;i<=t;i++)e.push(this.getPointAt(i/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],i,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)i=this.getPoint(o/t),r+=i.distanceTo(s),e.push(r),s=i;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){let i=this.getLengths(),s=0,r=i.length,o;e?o=e:o=t*i[r-1];let a=0,l=r-1,u;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),u=i[s]-o,u<0)a=s+1;else if(u>0)l=s-1;else{l=s;break}if(s=l,i[s]===o)return s/(r-1);let h=i[s],c=i[s+1]-h,f=(o-h)/c;return(s+f)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let o=this.getPoint(s),a=this.getPoint(r),l=e||(o.isVector2?new It:new I);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){let i=this.getUtoTmapping(t);return this.getTangent(i,e)}computeFrenetFrames(t,e){let i=new I,s=[],r=[],o=[],a=new I,l=new Vt;for(let f=0;f<=t;f++){let x=f/t;s[f]=this.getTangentAt(x,new I)}r[0]=new I,o[0]=new I;let u=Number.MAX_VALUE,h=Math.abs(s[0].x),m=Math.abs(s[0].y),c=Math.abs(s[0].z);h<=u&&(u=h,i.set(1,0,0)),m<=u&&(u=m,i.set(0,1,0)),c<=u&&i.set(0,0,1),a.crossVectors(s[0],i).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(s[f-1],s[f]),a.length()>Number.EPSILON){a.normalize();let x=Math.acos(Ae(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(a,x))}o[f].crossVectors(s[f],r[f])}if(e===!0){let f=Math.acos(Ae(r[0].dot(r[t]),-1,1));f/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(f=-f);for(let x=1;x<=t;x++)r[x].applyMatrix4(l.makeRotationAxis(s[x],f*x)),o[x].crossVectors(s[x],r[x])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},Rr=class extends cn{constructor(t=0,e=0,i=1,s=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=i,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(t,e=new It){let i=e,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);let a=this.aStartAngle+t*r,l=this.aX+this.xRadius*Math.cos(a),u=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let h=Math.cos(this.aRotation),m=Math.sin(this.aRotation),c=l-this.aX,f=u-this.aY;l=c*h-f*m+this.aX,u=c*m+f*h+this.aY}return i.set(l,u)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},za=class extends Rr{constructor(t,e,i,s,r,o){super(t,e,i,i,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};nr=new I,Po=new ml,Io=new ml,Lo=new ml,Wi=class extends cn{constructor(t=[],e=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=i,this.tension=s}getPoint(t,e=new I){let i=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t,a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let u,h;this.closed||a>0?u=s[(a-1)%r]:(nr.subVectors(s[0],s[1]).add(s[0]),u=nr);let m=s[a%r],c=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(nr.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=nr),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,x=Math.pow(u.distanceToSquared(m),f),v=Math.pow(m.distanceToSquared(c),f),p=Math.pow(c.distanceToSquared(h),f);v<1e-4&&(v=1),x<1e-4&&(x=v),p<1e-4&&(p=v),Po.initNonuniformCatmullRom(u.x,m.x,c.x,h.x,x,v,p),Io.initNonuniformCatmullRom(u.y,m.y,c.y,h.y,x,v,p),Lo.initNonuniformCatmullRom(u.z,m.z,c.z,h.z,x,v,p)}else this.curveType==="catmullrom"&&(Po.initCatmullRom(u.x,m.x,c.x,h.x,this.tension),Io.initCatmullRom(u.y,m.y,c.y,h.y,this.tension),Lo.initCatmullRom(u.z,m.z,c.z,h.z,this.tension));return i.set(Po.calc(l),Io.calc(l),Lo.calc(l)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){let s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(new I().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};ka=class extends cn{constructor(t=new It,e=new It,i=new It,s=new It){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new It){let i=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return i.set(gs(t,s.x,r.x,o.x,a.x),gs(t,s.y,r.y,o.y,a.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Ba=class extends cn{constructor(t=new I,e=new I,i=new I,s=new I){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new I){let i=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return i.set(gs(t,s.x,r.x,o.x,a.x),gs(t,s.y,r.y,o.y,a.y),gs(t,s.z,r.z,o.z,a.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Ha=class extends cn{constructor(t=new It,e=new It){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new It){let i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new It){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Va=class extends cn{constructor(t=new I,e=new I){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new I){let i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new I){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Ga=class extends cn{constructor(t=new It,e=new It,i=new It){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new It){let i=e,s=this.v0,r=this.v1,o=this.v2;return i.set(ms(t,s.x,r.x,o.x),ms(t,s.y,r.y,o.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Cr=class extends cn{constructor(t=new I,e=new I,i=new I){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new I){let i=e,s=this.v0,r=this.v1,o=this.v2;return i.set(ms(t,s.x,r.x,o.x),ms(t,s.y,r.y,o.y),ms(t,s.z,r.z,o.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Wa=class extends cn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new It){let i=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,l=s[o===0?o:o-1],u=s[o],h=s[o>s.length-2?s.length-1:o+1],m=s[o>s.length-3?s.length-1:o+2];return i.set(Nc(a,l.x,u.x,h.x,m.x),Nc(a,l.y,u.y,h.y,m.y)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){let s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(new It().fromArray(s))}return this}},$m=Object.freeze({__proto__:null,ArcCurve:za,CatmullRomCurve3:Wi,CubicBezierCurve:ka,CubicBezierCurve3:Ba,EllipseCurve:Rr,LineCurve:Ha,LineCurve3:Va,QuadraticBezierCurve:Ga,QuadraticBezierCurve3:Cr,SplineCurve:Wa}),ye=class n extends Fe{constructor(t=1,e=1,i=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};let u=this;s=Math.floor(s),r=Math.floor(r);let h=[],m=[],c=[],f=[],x=0,v=[],p=i/2,d=0;b(),o===!1&&(t>0&&y(!0),e>0&&y(!1)),this.setIndex(h),this.setAttribute("position",new se(m,3)),this.setAttribute("normal",new se(c,3)),this.setAttribute("uv",new se(f,2));function b(){let S=new I,L=new I,T=0,E=(e-t)/i;for(let A=0;A<=r;A++){let N=[],g=A/r,_=g*(e-t)+t;for(let C=0;C<=s;C++){let D=C/s,z=D*l+a,$=Math.sin(z),O=Math.cos(z);L.x=_*$,L.y=-g*i+p,L.z=_*O,m.push(L.x,L.y,L.z),S.set($,E,O).normalize(),c.push(S.x,S.y,S.z),f.push(D,1-g),N.push(x++)}v.push(N)}for(let A=0;A<s;A++)for(let N=0;N<r;N++){let g=v[N][A],_=v[N+1][A],C=v[N+1][A+1],D=v[N][A+1];t>0&&(h.push(g,_,D),T+=3),e>0&&(h.push(_,C,D),T+=3)}u.addGroup(d,T,0),d+=T}function y(S){let L=x,T=new It,E=new I,A=0,N=S===!0?t:e,g=S===!0?1:-1;for(let C=1;C<=s;C++)m.push(0,p*g,0),c.push(0,g,0),f.push(.5,.5),x++;let _=x;for(let C=0;C<=s;C++){let z=C/s*l+a,$=Math.cos(z),O=Math.sin(z);E.x=N*O,E.y=p*g,E.z=N*$,m.push(E.x,E.y,E.z),c.push(0,g,0),T.x=$*.5+.5,T.y=O*.5*g+.5,f.push(T.x,T.y),x++}for(let C=0;C<s;C++){let D=L+C,z=_+C;S===!0?h.push(z,z+1,D):h.push(z+1,z,D),A+=3}u.addGroup(d,A,S===!0?1:2),d+=A}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Xi=class n extends Fe{constructor(t=1,e=32,i=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));let l=Math.min(o+a,Math.PI),u=0,h=[],m=new I,c=new I,f=[],x=[],v=[],p=[];for(let d=0;d<=i;d++){let b=[],y=d/i,S=0;d===0&&o===0?S=.5/e:d===i&&l===Math.PI&&(S=-.5/e);for(let L=0;L<=e;L++){let T=L/e;m.x=-t*Math.cos(s+T*r)*Math.sin(o+y*a),m.y=t*Math.cos(o+y*a),m.z=t*Math.sin(s+T*r)*Math.sin(o+y*a),x.push(m.x,m.y,m.z),c.copy(m).normalize(),v.push(c.x,c.y,c.z),p.push(T+S,1-y),b.push(u++)}h.push(b)}for(let d=0;d<i;d++)for(let b=0;b<e;b++){let y=h[d][b+1],S=h[d][b],L=h[d+1][b],T=h[d+1][b+1];(d!==0||o>0)&&f.push(y,S,T),(d!==i-1||l<Math.PI)&&f.push(S,L,T)}this.setIndex(f),this.setAttribute("position",new se(x,3)),this.setAttribute("normal",new se(v,3)),this.setAttribute("uv",new se(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}},te=class n extends Fe{constructor(t=1,e=.4,i=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:i,tubularSegments:s,arc:r},i=Math.floor(i),s=Math.floor(s);let o=[],a=[],l=[],u=[],h=new I,m=new I,c=new I;for(let f=0;f<=i;f++)for(let x=0;x<=s;x++){let v=x/s*r,p=f/i*Math.PI*2;m.x=(t+e*Math.cos(p))*Math.cos(v),m.y=(t+e*Math.cos(p))*Math.sin(v),m.z=e*Math.sin(p),a.push(m.x,m.y,m.z),h.x=t*Math.cos(v),h.y=t*Math.sin(v),c.subVectors(m,h).normalize(),l.push(c.x,c.y,c.z),u.push(x/s),u.push(f/i)}for(let f=1;f<=i;f++)for(let x=1;x<=s;x++){let v=(s+1)*f+x-1,p=(s+1)*(f-1)+x-1,d=(s+1)*(f-1)+x,b=(s+1)*f+x;o.push(v,p,b),o.push(p,d,b)}this.setIndex(o),this.setAttribute("position",new se(a,3)),this.setAttribute("normal",new se(l,3)),this.setAttribute("uv",new se(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}},Pr=class n extends Fe{constructor(t=new Cr(new I(-1,-1,0),new I(-1,1,0),new I(1,1,0)),e=64,i=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:i,radialSegments:s,closed:r};let o=t.computeFrenetFrames(e,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;let a=new I,l=new I,u=new It,h=new I,m=[],c=[],f=[],x=[];v(),this.setIndex(x),this.setAttribute("position",new se(m,3)),this.setAttribute("normal",new se(c,3)),this.setAttribute("uv",new se(f,2));function v(){for(let y=0;y<e;y++)p(y);p(r===!1?e:0),b(),d()}function p(y){h=t.getPointAt(y/e,h);let S=o.normals[y],L=o.binormals[y];for(let T=0;T<=s;T++){let E=T/s*Math.PI*2,A=Math.sin(E),N=-Math.cos(E);l.x=N*S.x+A*L.x,l.y=N*S.y+A*L.y,l.z=N*S.z+A*L.z,l.normalize(),c.push(l.x,l.y,l.z),a.x=h.x+i*l.x,a.y=h.y+i*l.y,a.z=h.z+i*l.z,m.push(a.x,a.y,a.z)}}function d(){for(let y=1;y<=e;y++)for(let S=1;S<=s;S++){let L=(s+1)*(y-1)+(S-1),T=(s+1)*y+(S-1),E=(s+1)*y+S,A=(s+1)*(y-1)+S;x.push(L,T,A),x.push(T,E,A)}}function b(){for(let y=0;y<=e;y++)for(let S=0;S<=s;S++)u.x=y/e,u.y=S/s,f.push(u.x,u.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new n(new $m[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}},hn=class extends ri{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Pt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Pt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Qc,this.normalScale=new It(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Se,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},Ir=class extends hn{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new It(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ae(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Pt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Pt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Pt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}};qi=class{constructor(t,e,i,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(i),this.sampleValues=e,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,i=this._cachedIndex,s=e[i],r=e[i-1];n:{t:{let o;e:{i:if(!(t<s)){for(let a=i+2;;){if(s===void 0){if(t<r)break i;return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===a)break;if(r=s,s=e[++i],t<s)break t}o=e.length;break e}if(!(t>=r)){let a=e[1];t<a&&(i=2,r=a);for(let l=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(s=r,r=e[--i-1],t>=r)break t}o=i,i=0;break e}break n}for(;i<o;){let a=i+o>>>1;t<e[a]?o=a:i=a+1}if(s=e[i],r=e[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,s)}return this.interpolate_(i,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=t*s;for(let o=0;o!==s;++o)e[o]=i[r+o];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Xa=class extends qi{constructor(t,e,i,s){super(t,e,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Hl,endingEnd:Hl}}intervalChanged_(t,e,i){let s=this.parameterPositions,r=t-2,o=t+1,a=s[r],l=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case Vl:r=t,a=2*e-i;break;case Gl:r=s.length-2,a=e+s[r]-s[r+1];break;default:r=t,a=i}if(l===void 0)switch(this.getSettings_().endingEnd){case Vl:o=t,l=2*i-e;break;case Gl:o=1,l=i+s[1]-s[0];break;default:o=t-1,l=e}let u=(i-e)*.5,h=this.valueSize;this._weightPrev=u/(e-a),this._weightNext=u/(l-i),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(t,e,i,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,u=l-a,h=this._offsetPrev,m=this._offsetNext,c=this._weightPrev,f=this._weightNext,x=(i-e)/(s-e),v=x*x,p=v*x,d=-c*p+2*c*v-c*x,b=(1+c)*p+(-1.5-2*c)*v+(-.5+c)*x+1,y=(-1-f)*p+(1.5+f)*v+.5*x,S=f*p-f*v;for(let L=0;L!==a;++L)r[L]=d*o[h+L]+b*o[u+L]+y*o[l+L]+S*o[m+L];return r}},qa=class extends qi{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,u=l-a,h=(i-e)/(s-e),m=1-h;for(let c=0;c!==a;++c)r[c]=o[u+c]*m+o[l+c]*h;return r}},Ya=class extends qi{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t){return this.copySampleValue_(t-1)}},un=class{constructor(t,e,i,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=ir(e,this.TimeBufferType),this.values=ir(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,i;if(e.toJSON!==this.toJSON)i=e.toJSON(t);else{i={name:t.name,times:ir(t.times,Array),values:ir(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(i.interpolation=s)}return i.type=t.ValueTypeName,i}InterpolantFactoryMethodDiscrete(t){return new Ya(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new qa(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Xa(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case ur:e=this.InterpolantFactoryMethodDiscrete;break;case ya:e=this.InterpolantFactoryMethodLinear;break;case jr:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return console.warn("THREE.KeyframeTrack:",i),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ur;case this.InterpolantFactoryMethodLinear:return ya;case this.InterpolantFactoryMethodSmooth:return jr}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]*=t}return this}trim(t,e){let i=this.times,s=i.length,r=0,o=s-1;for(;r!==s&&i[r]<t;)++r;for(;o!==-1&&i[o]>e;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=i.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let i=this.times,s=this.values,r=i.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let l=i[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),t=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),t=!1;break}o=l}if(s!==void 0&&Jm(s))for(let a=0,l=s.length;a!==l;++a){let u=s[a];if(isNaN(u)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,u),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===jr,r=t.length-1,o=1;for(let a=1;a<r;++a){let l=!1,u=t[a],h=t[a+1];if(u!==h&&(a!==1||u!==t[0]))if(s)l=!0;else{let m=a*i,c=m-i,f=m+i;for(let x=0;x!==i;++x){let v=e[m+x];if(v!==e[c+x]||v!==e[f+x]){l=!0;break}}}if(l){if(a!==o){t[o]=t[a];let m=a*i,c=o*i;for(let f=0;f!==i;++f)e[c+f]=e[m+f]}++o}}if(r>0){t[o]=t[r];for(let a=r*i,l=o*i,u=0;u!==i;++u)e[l+u]=e[a+u];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*i)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),i=this.constructor,s=new i(this.name,t,e);return s.createInterpolant=this.createInterpolant,s}};un.prototype.TimeBufferType=Float32Array;un.prototype.ValueBufferType=Float32Array;un.prototype.DefaultInterpolation=ya;ai=class extends un{constructor(t,e,i){super(t,e,i)}};ai.prototype.ValueTypeName="bool";ai.prototype.ValueBufferType=Array;ai.prototype.DefaultInterpolation=ur;ai.prototype.InterpolantFactoryMethodLinear=void 0;ai.prototype.InterpolantFactoryMethodSmooth=void 0;Za=class extends un{};Za.prototype.ValueTypeName="color";$a=class extends un{};$a.prototype.ValueTypeName="number";Ja=class extends qi{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(i-e)/(s-e),u=t*a;for(let h=u+a;u!==h;u+=4)De.slerpFlat(r,0,o,u-a,o,u,l);return r}},Lr=class extends un{InterpolantFactoryMethodLinear(t){return new Ja(this.times,this.values,this.getValueSize(),t)}};Lr.prototype.ValueTypeName="quaternion";Lr.prototype.InterpolantFactoryMethodSmooth=void 0;li=class extends un{constructor(t,e,i){super(t,e,i)}};li.prototype.ValueTypeName="string";li.prototype.ValueBufferType=Array;li.prototype.DefaultInterpolation=ur;li.prototype.InterpolantFactoryMethodLinear=void 0;li.prototype.InterpolantFactoryMethodSmooth=void 0;Ka=class extends un{};Ka.prototype.ValueTypeName="vector";Qa=class{constructor(t,e,i){let s=this,r=!1,o=0,a=0,l,u=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=i,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,m){return u.push(h,m),this},this.removeHandler=function(h){let m=u.indexOf(h);return m!==-1&&u.splice(m,2),this},this.getHandler=function(h){for(let m=0,c=u.length;m<c;m+=2){let f=u[m],x=u[m+1];if(f.global&&(f.lastIndex=0),f.test(h))return x}return null}}},Km=new Qa,ja=class{constructor(t){this.manager=t!==void 0?t:Km,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let i=this;return new Promise(function(s,r){i.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}};ja.DEFAULT_MATERIAL_NAME="__DEFAULT";Yi=class extends Ce{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Pt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}},Dr=class extends Yi{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ce.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Pt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}},Do=new Vt,Fc=new I,Oc=new I,bs=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new It(512,512),this.map=null,this.mapPass=null,this.matrix=new Vt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ys,this._frameExtents=new It(1,1),this._viewportCount=1,this._viewports=[new ee(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,i=this.matrix;Fc.setFromMatrixPosition(t.matrixWorld),e.position.copy(Fc),Oc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Oc),e.updateMatrixWorld(),Do.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Do),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Do)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},tl=class extends bs{constructor(){super(new Re(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(t){let e=this.camera,i=gr*2*t.angle*this.focus,s=this.mapSize.width/this.mapSize.height,r=t.distance||e.far;(i!==e.fov||s!==e.aspect||r!==e.far)&&(e.fov=i,e.aspect=s,e.far=r,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this}},Ms=class extends Yi{constructor(t,e,i=0,s=Math.PI/3,r=0,o=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Ce.DEFAULT_UP),this.updateMatrix(),this.target=new Ce,this.distance=i,this.angle=s,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new tl}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}},zc=new Vt,fs=new I,Uo=new I,el=class extends bs{constructor(){super(new Re(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new It(4,2),this._viewportCount=6,this._viewports=[new ee(2,1,1,1),new ee(0,1,1,1),new ee(3,1,1,1),new ee(1,1,1,1),new ee(3,0,1,1),new ee(1,0,1,1)],this._cubeDirections=[new I(1,0,0),new I(-1,0,0),new I(0,0,1),new I(0,0,-1),new I(0,1,0),new I(0,-1,0)],this._cubeUps=[new I(0,1,0),new I(0,1,0),new I(0,1,0),new I(0,1,0),new I(0,0,1),new I(0,0,-1)]}updateMatrices(t,e=0){let i=this.camera,s=this.matrix,r=t.distance||i.far;r!==i.far&&(i.far=r,i.updateProjectionMatrix()),fs.setFromMatrixPosition(t.matrixWorld),i.position.copy(fs),Uo.copy(i.position),Uo.add(this._cubeDirections[e]),i.up.copy(this._cubeUps[e]),i.lookAt(Uo),i.updateMatrixWorld(),s.makeTranslation(-fs.x,-fs.y,-fs.z),zc.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(zc)}},Zi=class extends Yi{constructor(t,e,i=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new el}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}},nl=class extends bs{constructor(){super(new wr(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Ss=class extends Yi{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ce.DEFAULT_UP),this.updateMatrix(),this.target=new Ce,this.shadow=new nl}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}},Ur=class{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=kc(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let e=kc();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}};gl="\\[\\]\\.:\\/",Qm=new RegExp("["+gl+"]","g"),xl="[^"+gl+"]",jm="[^"+gl.replace("\\.","")+"]",tg=/((?:WC+[\/:])*)/.source.replace("WC",xl),eg=/(WCOD+)?/.source.replace("WCOD",jm),ng=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",xl),ig=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",xl),sg=new RegExp("^"+tg+eg+ng+ig+"$"),rg=["material","materials","bones","map"],il=class{constructor(t,e,i){let s=i||le.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(t,e)}setValue(t,e){let i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=i.length;s!==r;++s)i[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].unbind()}},le=class n{constructor(t,e,i){this.path=e,this.parsedPath=i||n.parseTrackName(e),this.node=n.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,i){return t&&t.isAnimationObjectGroup?new n.Composite(t,e,i):new n(t,e,i)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Qm,"")}static parseTrackName(t){let e=sg.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let i={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=i.nodeName.substring(s+1);rg.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return i}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let i=t.skeleton.getBoneByName(e);if(i!==void 0)return i}if(t.children){let i=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let l=i(a.children);if(l)return l}return null},s=i(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)t[e++]=i[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,i=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=n.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let u=e.objectIndex;switch(i){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===u){u=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[i]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[i]}if(u!==void 0){if(t[u]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[u]}}let o=t[s];if(o===void 0){let u=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+u+"."+s+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};le.Composite=il;le.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};le.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};le.prototype.GetterByBindingType=[le.prototype._getValue_direct,le.prototype._getValue_array,le.prototype._getValue_arrayElement,le.prototype._getValue_toArray];le.prototype.SetterByBindingTypeAndVersioning=[[le.prototype._setValue_direct,le.prototype._setValue_direct_setNeedsUpdate,le.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[le.prototype._setValue_array,le.prototype._setValue_array_setNeedsUpdate,le.prototype._setValue_array_setMatrixWorldNeedsUpdate],[le.prototype._setValue_arrayElement,le.prototype._setValue_arrayElement_setNeedsUpdate,le.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[le.prototype._setValue_fromArray,le.prototype._setValue_fromArray_setNeedsUpdate,le.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];Eg=new Float32Array(1);typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"169"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="169")});function Ji(n){let t=new Gn;return t.color.setScalar(n),t}var zr,lh=Qe(()=>{Je();zr=class extends Vi{constructor(){super();let t=new fe;t.deleteAttribute("uv");let e=new hn({side:Le}),i=new hn,s=new Zi(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);let r=new jt(t,e);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);let o=new jt(t,i);o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),this.add(o);let a=new jt(t,i);a.position.set(-5.607,-.754,-.758),a.rotation.set(0,.994,0),a.scale.set(1.97,1.534,3.955),this.add(a);let l=new jt(t,i);l.position.set(6.167,.857,7.803),l.rotation.set(0,.561,0),l.scale.set(3.927,6.285,3.687),this.add(l);let u=new jt(t,i);u.position.set(-2.017,.018,6.124),u.rotation.set(0,.333,0),u.scale.set(2.002,4.566,2.064),this.add(u);let h=new jt(t,i);h.position.set(2.291,-.756,-2.621),h.rotation.set(0,-.286,0),h.scale.set(1.546,1.552,1.496),this.add(h);let m=new jt(t,i);m.position.set(-2.193,-.369,-5.547),m.rotation.set(0,.516,0),m.scale.set(3.875,3.487,2.986),this.add(m);let c=new jt(t,Ji(50));c.position.set(-16.116,14.37,8.208),c.scale.set(.1,2.428,2.739),this.add(c);let f=new jt(t,Ji(50));f.position.set(-16.109,18.021,-8.207),f.scale.set(.1,2.425,2.751),this.add(f);let x=new jt(t,Ji(17));x.position.set(14.904,12.198,-1.832),x.scale.set(.15,4.265,6.331),this.add(x);let v=new jt(t,Ji(43));v.position.set(-.462,8.89,14.52),v.scale.set(4.38,5.441,.088),this.add(v);let p=new jt(t,Ji(20));p.position.set(3.235,11.486,-12.541),p.scale.set(2.5,2,.1),this.add(p);let d=new jt(t,Ji(100));d.position.set(0,20,0),d.scale.set(1,.1,1),this.add(d)}dispose(){let t=new Set;this.traverse(e=>{e.isMesh&&(t.add(e.geometry),t.add(e.material))});for(let e of t)e.dispose()}}});function hh(n,t=!1){let e=n[0].index!==null,i=new Set(Object.keys(n[0].attributes)),s=new Set(Object.keys(n[0].morphAttributes)),r={},o={},a=n[0].morphTargetsRelative,l=new Fe,u=0;for(let h=0;h<n.length;++h){let m=n[h],c=0;if(e!==(m.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let f in m.attributes){if(!i.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(m.attributes[f]),c++}if(c!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==m.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let f in m.morphAttributes){if(!s.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[f]===void 0&&(o[f]=[]),o[f].push(m.morphAttributes[f])}if(t){let f;if(e)f=m.index.count;else if(m.attributes.position!==void 0)f=m.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(u,f,h),u+=f}}if(e){let h=0,m=[];for(let c=0;c<n.length;++c){let f=n[c].index;for(let x=0;x<f.count;++x)m.push(f.getX(x)+h);h+=n[c].attributes.position.count}l.setIndex(m)}for(let h in r){let m=ch(r[h]);if(!m)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,m)}for(let h in o){let m=o[h][0].length;if(m===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let c=0;c<m;++c){let f=[];for(let v=0;v<o[h].length;++v)f.push(o[h][v][c]);let x=ch(f);if(!x)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(x)}}return l}function ch(n){let t,e,i,s=-1,r=0;for(let u=0;u<n.length;++u){let h=n[u];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=h.normalized),i!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}let o=new t(r),a=new Ne(o,e,i),l=0;for(let u=0;u<n.length;++u){let h=n[u];if(h.isInterleavedBufferAttribute){let m=l/e;for(let c=0,f=h.count;c<f;c++)for(let x=0;x<e;x++){let v=h.getComponent(c,x);a.setComponent(c+m,x,v)}}else o.set(h.array,l);l+=h.count*e}return s!==void 0&&(a.gpuType=s),a}var uh=Qe(()=>{Je()});function en(n,t,e,i,s,r){let o=2*Math.PI*s/4,a=Math.max(r-2*s,0),l=Math.PI/4;Ts.copy(t),Ts[i]=0,Ts.normalize();let u=.5*o/(o+a),h=1-Ts.angleTo(n)/l;return Math.sign(Ts[e])===1?h*u:a/(o+a)+u+u*(1-h)}var Ts,kr,fh=Qe(()=>{Je();Ts=new I;kr=class extends fe{constructor(t=1,e=1,i=1,s=2,r=.1){if(s=s*2+1,r=Math.min(t/2,e/2,i/2,r),super(1,1,1,s,s,s),s===1)return;let o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;let a=new I,l=new I,u=new I(t,e,i).divideScalar(2).subScalar(r),h=this.attributes.position.array,m=this.attributes.normal.array,c=this.attributes.uv.array,f=h.length/6,x=new I,v=.5/s;for(let p=0,d=0;p<h.length;p+=3,d+=2)switch(a.fromArray(h,p),l.copy(a),l.x-=Math.sign(l.x)*v,l.y-=Math.sign(l.y)*v,l.z-=Math.sign(l.z)*v,l.normalize(),h[p+0]=u.x*Math.sign(a.x)+l.x*r,h[p+1]=u.y*Math.sign(a.y)+l.y*r,h[p+2]=u.z*Math.sign(a.z)+l.z*r,m[p+0]=l.x,m[p+1]=l.y,m[p+2]=l.z,Math.floor(p/f)){case 0:x.set(1,0,0),c[d+0]=en(x,l,"z","y",r,i),c[d+1]=1-en(x,l,"y","z",r,e);break;case 1:x.set(-1,0,0),c[d+0]=1-en(x,l,"z","y",r,i),c[d+1]=1-en(x,l,"y","z",r,e);break;case 2:x.set(0,1,0),c[d+0]=1-en(x,l,"x","z",r,t),c[d+1]=en(x,l,"z","x",r,i);break;case 3:x.set(0,-1,0),c[d+0]=1-en(x,l,"x","z",r,t),c[d+1]=1-en(x,l,"z","x",r,i);break;case 4:x.set(0,0,1),c[d+0]=1-en(x,l,"x","y",r,t),c[d+1]=1-en(x,l,"y","x",r,e);break;case 5:x.set(0,0,-1),c[d+0]=en(x,l,"x","y",r,t),c[d+1]=1-en(x,l,"y","x",r,e);break}}}});function de(n=0,t=0,e=0,i=0,s=0,r=0,o=1,a=o,l=o){return ph.set(i,s,r,"YXZ"),dh.setFromEuler(ph),mh.set(n,t,e),gh.set(o,a,l),new Vt().compose(mh,dh,gh)}function Hr(n,t){let e=xh.get(n);return e||(e=t(),xh.set(n,e)),e}function ne(n,t,e=32,i=5,s=!1){let r=new Wi(n.map(o=>o.isVector3?o:new I(...o)),s);return new Pr(r,e,t,i,s)}function re(n,t,e){let i=new tn(1,1,t,e),s=i.attributes.position,r=i.attributes.uv;for(let o=0;o<s.count;o++){let a=r.getX(o),l=1-r.getY(o),u=n(a,l);s.setXYZ(o,u[0],u[1],u[2])}return i.computeVertexNormals(),i}function Ki(n,t,e,i=60){let s=new Wi(n.map(h=>h.isVector3?h:new I(...h))),r=s.getSpacedPoints(i),o=[],a=[],l=[];for(let h=0;h<=i;h++){let m=s.getTangentAt(h/i),c=e(r[h],m).normalize().multiplyScalar(t/2);if(o.push(r[h].x-c.x,r[h].y-c.y,r[h].z-c.z,r[h].x+c.x,r[h].y+c.y,r[h].z+c.z),a.push(h/i,0,h/i,1),h<i){let f=h*2;l.push(f,f+1,f+2,f+1,f+3,f+2)}}let u=new Fe;return u.setAttribute("position",new se(o,3)),u.setAttribute("uv",new se(a,2)),u.setIndex(l),u.computeVertexNormals(),u}function fn(n,t,e,i,s=0,r=.15){return re((o,a)=>{let l=(o-.5)*n*(1+r*a),u=Math.sin(o*e*Math.PI*2+s)*i*(.35+a)+Math.sin(o*23+s*3)*i*.15*a;return[l,-a*t+Math.sin(o*e*Math.PI*2+s)*.01*a,u]},24,10)}var zg,dh,ph,mh,gh,Br,xh,og,ag,lg,cg,Ee,Qi=Qe(()=>{Je();uh();fh();zg=new Vt,dh=new De,ph=new Se,mh=new I,gh=new I;Br=class{constructor(){this.map=new Map,this.stack=[new Vt]}get top(){return this.stack[this.stack.length-1]}push(t,e,i,s=0,r=0,o=0,a=1){this.stack.push(this.top.clone().multiply(de(t,e,i,r,s,o,a)))}pop(){this.stack.pop()}geo(t,e,i=0,s=0,r=0,o=0,a=0,l=0,u=1,h=u,m=u){let c=t.clone();c.applyMatrix4(this.top.clone().multiply(de(i,s,r,o,a,l,u,h,m)));for(let x of Object.keys(c.attributes))x!=="position"&&x!=="normal"&&x!=="uv"&&c.deleteAttribute(x);c.attributes.uv||c.setAttribute("uv",new se(new Float32Array(c.attributes.position.count*2),2)),c.clearGroups();let f=this.map.get(e);return f||(f=[],this.map.set(e,f)),f.push(c),c}box(t,e,i,s,r,o,a,l=0,u=0,h=0){return this.geo(og(e,i,s),t,r,o,a,u,l,h)}rbox(t,e,i,s,r,o,a,l,u=0,h=0,m=0){return this.geo(ag(e,i,s,r),t,o,a,l,h,u,m)}cyl(t,e,i,s,r,o,a,l,u=0,h=0,m=0){return this.geo(lg(e,i,s,r),t,o,a,l,u,h,m)}sph(t,e,i,s,r,o=1,a=1,l=1,u=12){return this.geo(cg(e,u),t,i,s,r,0,0,0,o,a,l)}card(t,e,i,s,r,o,a=0,l=0,u=0,h=[0,0,1,1]){let m=new tn(e,i),c=m.attributes.uv;for(let f=0;f<c.count;f++)c.setXY(f,h[0]+c.getX(f)*(h[2]-h[0]),h[1]+c.getY(f)*(h[3]-h[1]));return this.geo(m,t,s,r,o,a,l,u)}flush(t){let e=[];for(let[i,s]of this.map){let o=s.some(u=>!u.index)?s.map(u=>u.index?u.toNonIndexed():u):s,a=hh(o,!1);if(!a){console.warn("merge failed",i.name);continue}a.computeBoundingSphere();let l=new jt(a,i);l.castShadow=!i.userData.noCast,l.receiveShadow=!i.userData.noReceive,l.matrixAutoUpdate=!1,l.updateMatrix(),t.add(l),e.push(l)}return this.map.clear(),e}},xh=new Map;og=(n,t,e)=>Hr(`b${n},${t},${e}`,()=>{let i=new fe(n,t,e),s=i.attributes.uv,r=i.attributes.normal;for(let o=0;o<s.count;o++){let a=Math.abs(r.getX(o)),l=Math.abs(r.getY(o)),u=a>.5?e:n,h=l>.5?e:t;s.setXY(o,s.getX(o)*u,s.getY(o)*h)}return i}),ag=(n,t,e,i)=>Hr(`r${n},${t},${e},${i}`,()=>new kr(n,t,e,2,i)),lg=(n,t,e,i)=>Hr(`c${n},${t},${e},${i}`,()=>new ye(n,t,e,i)),cg=(n,t)=>Hr(`s${n},${t}`,()=>new Xi(n,t,Math.max(6,t*.66|0)));Ee=class{constructor(t,e,i){this.geo=t,this.mat=e,this.items=[]}add(t,e){this.items.push([t,e])}build(t,e=!0){if(!this.items.length)return null;let i=new oi(this.geo,this.mat,this.items.length),s=new Pt;return this.items.forEach(([r,o],a)=>{i.setMatrixAt(a,r),o!==void 0&&i.setColorAt(a,s.set(o))}),i.instanceMatrix.needsUpdate=!0,i.instanceColor&&(i.instanceColor.needsUpdate=!0),i.castShadow=e,i.receiveShadow=!0,i.computeBoundingSphere(),t.add(i),i}}});function we(n){let t=n*2654435761>>>0;return()=>(t=t*1664525+1013904223>>>0,t/4294967296)}function Oe(n,t){let e=document.createElement("canvas");return e.width=n,e.height=t,[e,e.getContext("2d")]}function ze(n,t=!0,e=[1,1]){let i=new Gi(n);return i.wrapS=i.wrapT=xs,i.repeat.set(e[0],e[1]),t&&(i.colorSpace=Ge),i.anisotropy=8,i}function ji(n,t,e,i,s){let r=n.getImageData(0,0,t,e),o=r.data;for(let a=0;a<o.length;a+=4){let l=(s()-.5)*i;o[a]+=l,o[a+1]+=l,o[a+2]+=l}n.putImageData(r,0,0)}function yl(n,t,e,i,s,r,o,a){n.save(),n.beginPath(),n.rect(t,e,i,s),n.clip(),n.fillStyle=_l(...r),n.fillRect(t,e,i,s);let l=a?s:i,u=a?i:s,h=Math.floor(u/2.2);for(let m=0;m<h;m++){let c=o()*u,f=o()<.5;n.strokeStyle=f?_l(r[0]*.6,r[1]*.55,r[2]*.5,.25+o()*.3):_l(r[0]*1.2+10,r[1]*1.15+8,r[2]*1.1,.12+o()*.15),n.lineWidth=.5+o()*1.4,n.beginPath();let x=o()*6,v=.004+o()*.01,p=1+o()*3;for(let d=0;d<=l;d+=8){let b=c+Math.sin(d*v+x)*p;a?d===0?n.moveTo(t+b,e+d):n.lineTo(t+b,e+d):d===0?n.moveTo(t+d,e+b):n.lineTo(t+d,e+b)}n.stroke()}n.restore()}function ts(n,t,e,i){let s=we(n),[r,o]=Oe(1024,1024),a=1024/e;for(let l=0;l<e;l++){let u=-s()*600;for(;u<1024;){let h=500+s()*500,m=.82+s()*.3;yl(o,u,l*a,h,a,[t[0]*m,t[1]*m,t[2]*m],s,!1),o.fillStyle="rgba(20,10,5,0.7)",o.fillRect(u,l*a,2,a),s()<.4&&(o.fillStyle="rgba(40,20,8,0.5)",o.beginPath(),o.ellipse(u+s()*h,l*a+a*(.3+s()*.4),6+s()*6,3+s()*3,0,0,7),o.fill()),u+=h}o.fillStyle="rgba(15,8,4,0.85)",o.fillRect(0,l*a,1024,2)}if(i){for(let l=0;l<40;l++){let u=o.createRadialGradient(0,0,0,0,0,1);o.save(),o.translate(s()*1024,s()*1024),o.scale(60+s()*140,30+s()*60),u.addColorStop(0,"rgba(230,200,160,0.12)"),u.addColorStop(1,"rgba(230,200,160,0)"),o.fillStyle=u,o.fillRect(-1,-1,2,2),o.restore()}for(let l=0;l<160;l++){o.strokeStyle=`rgba(30,18,10,${.1+s()*.2})`,o.lineWidth=.6,o.beginPath();let u=s()*1024,h=s()*1024;o.moveTo(u,h),o.lineTo(u+(s()-.5)*40,h+(s()-.5)*8),o.stroke()}}return ji(o,1024,1024,14,s),ze(r)}function _h(n){let t=we(n),[e,i]=Oe(1024,1024),s=256,r=4;for(let o=0;o<4;o++)for(let a=0;a<4;a++){let l=(o+a)%2===0;for(let u=0;u<r;u++){let h=.85+t()*.28,m=[128*h,78*h,42*h],c=s/r;l?yl(i,o*s+u*c,a*s,c,s,m,t,!0):yl(i,o*s,a*s+u*c,s,c,m,t,!1),i.fillStyle="rgba(25,12,5,0.6)",l?i.fillRect(o*s+u*c,a*s,1.5,s):i.fillRect(o*s,a*s+u*c,s,1.5)}i.strokeStyle="rgba(20,10,4,0.9)",i.lineWidth=2.5,i.strokeRect(o*s,a*s,s,s)}return ji(i,1024,1024,10,t),ze(e)}function As(n,t,e,i,s,r){n.save(),n.translate(t,e),n.scale(i,i),n.fillStyle=s,n.strokeStyle=r,n.lineWidth=1.6;for(let o of[1,-1])n.save(),n.scale(o,1),n.beginPath(),n.moveTo(0,70),n.bezierCurveTo(40,60,70,20,50,-20),n.bezierCurveTo(35,-50,70,-70,85,-55),n.bezierCurveTo(70,-40,60,-10,75,20),n.bezierCurveTo(85,45,40,90,0,95),n.closePath(),n.fill(),n.stroke(),n.beginPath(),n.ellipse(28,30,9,22,-.5,0,7),n.stroke(),n.beginPath(),n.moveTo(10,-30),n.bezierCurveTo(30,-60,20,-90,0,-100),n.stroke(),n.restore();n.beginPath(),n.moveTo(-22,-10),n.lineTo(-26,-40),n.lineTo(-12,-26),n.lineTo(0,-48),n.lineTo(12,-26),n.lineTo(26,-40),n.lineTo(22,-10),n.closePath(),n.fill(),n.stroke(),n.beginPath(),n.arc(0,18,14,0,7),n.stroke(),n.restore()}function yh(){let[n,t]=Oe(512,512);t.fillStyle="#1d4744",t.fillRect(0,0,512,512);let e=we(7);for(let r=0;r<512;r+=3)t.fillStyle=`rgba(255,255,255,${.012+e()*.02})`,t.fillRect(0,r,512,1);let i="rgba(70,128,118,0.55)",s="rgba(214,180,110,0.55)";As(t,256,256,1.05,i,s);for(let[r,o]of[[0,0],[512,0],[0,512],[512,512]])As(t,r,o,1.05,i,s);return ji(t,512,512,8,e),ze(n)}function vh(n,t){let e=we(t),i=256,[s,r]=Oe(i,i);if(r.fillStyle="#e8e8e8",r.fillRect(0,0,i,i),n==="weave")for(let o=0;o<i;o+=2)r.fillStyle=`rgba(0,0,0,${.04+e()*.06})`,r.fillRect(0,o,i,1),r.fillRect(o,0,1,i);else if(n==="stripe")for(let o=0;o<i;o+=64)r.fillStyle="rgba(0,0,0,0.38)",r.fillRect(o,0,22,i),r.fillStyle="rgba(255,255,255,0.6)",r.fillRect(o+30,0,4,i);else if(n==="pinstripe"){r.fillStyle="#9a9a9a",r.fillRect(0,0,i,i);for(let o=0;o<i;o+=16)r.fillStyle="rgba(255,255,255,0.75)",r.fillRect(o,0,1.5,i)}else if(n==="plaid"){r.fillStyle="#b0b0b0",r.fillRect(0,0,i,i);for(let[o,a,l]of[[0,60,.35],[100,20,.5],[150,8,-.6],[200,30,.25]])r.fillStyle=l>0?`rgba(0,0,0,${l})`:`rgba(255,255,255,${-l})`,r.fillRect(o,0,a,i),r.fillRect(0,o,i,a)}else if(n==="tweed"){r.fillStyle="#a8a8a8",r.fillRect(0,0,i,i);for(let o=0;o<i;o+=8)for(let a=0;a<i;a+=4){let l=Math.floor(a/32)%2?1:-1;r.strokeStyle=`rgba(${e()<.5?"0,0,0":"255,255,255"},${.2+e()*.3})`,r.lineWidth=1.5,r.beginPath(),r.moveTo(a,o),r.lineTo(a+3,o+6*l+(l<0?6:0)),r.stroke()}for(let o=0;o<300;o++)r.fillStyle=`rgba(${e()<.5?0:255},${e()<.5?0:255},${e()<.5?0:255},0.25)`,r.fillRect(e()*i,e()*i,2+e()*3,1)}else if(n==="damask"){r.fillStyle="#c4c4c4",r.fillRect(0,0,i,i),As(r,128,128,.5,"rgba(255,255,255,0.5)","rgba(255,255,255,0.4)");for(let[o,a]of[[0,0],[256,0],[0,256],[256,256]])As(r,o,a,.5,"rgba(255,255,255,0.5)","rgba(255,255,255,0.4)")}else if(n==="foulard"){r.fillStyle="#bdbdbd",r.fillRect(0,0,i,i);for(let o=0;o<i;o+=32)for(let a=o/32%2*16;a<i;a+=32)r.fillStyle="rgba(255,255,255,0.8)",r.beginPath(),r.arc(a,o,5,0,7),r.fill(),r.fillStyle="rgba(0,0,0,0.4)",r.beginPath(),r.arc(a,o,2,0,7),r.fill()}else if(n==="velvet")for(let o=0;o<2e3;o++)r.fillStyle=`rgba(${e()<.5?0:255},${e()<.5?0:255},${e()<.5?0:255},0.05)`,r.beginPath(),r.arc(e()*i,e()*i,2+e()*10,0,7),r.fill();else if(n==="boltend"){r.fillStyle="#d0d0d0",r.fillRect(0,0,i,i);for(let o=120;o>26;o-=2+e()*2)r.strokeStyle=`rgba(0,0,0,${.15+e()*.25})`,r.lineWidth=.8,r.beginPath(),r.arc(128,128,o,0,7),r.stroke();r.fillStyle="#8a7350",r.beginPath(),r.arc(128,128,26,0,7),r.fill(),r.fillStyle="#2b2218",r.beginPath(),r.arc(128,128,16,0,7),r.fill()}return ji(r,i,i,10,e),ze(s)}function bh(){let[t,e]=Oe(1024,1024),i=we(42);[{name:"BODICE FRONT",sub:"CUT 1 ON FOLD \xB7 VELVET + LINING",pts:[[.15,.1],[.55,.06],[.82,.2],[.86,.55],[.78,.92],[.18,.92],[.12,.5]]},{name:"PETAL \xB7 TIER II",sub:"CUT 14 \xB7 SILK SHOT GOLD",pts:[[.25,.06],[.75,.06],[.86,.45],[.7,.8],[.5,.95],[.3,.8],[.14,.45]]},{name:"SLEEVE \xB7 UPPER",sub:"CUT 2 \xB7 SLASH 8x",pts:[[.1,.4],[.3,.12],[.5,.06],[.7,.12],[.9,.4],[.8,.92],[.2,.92]]},{name:"COLLAR FEATHER",sub:"CUT 13 \xB7 ORGANZA",pts:[[.5,.04],[.68,.25],[.7,.6],[.56,.96],[.44,.96],[.3,.6],[.32,.25]]}].forEach((o,a)=>{let l=a%2*512,u=Math.floor(a/2)*512;e.save(),e.translate(l,u),e.beginPath(),o.pts.forEach(([h,m],c)=>c?e.lineTo(h*512,m*512):e.moveTo(h*512,m*512)),e.closePath(),e.fillStyle=a%2?"#e3d3ae":"#d9c79c",e.fill(),e.save(),e.clip();for(let h=0;h<600;h++)e.fillStyle=`rgba(90,60,20,${i()*.06})`,e.fillRect(i()*512,i()*512,3,3);e.strokeStyle="rgba(60,90,160,0.35)",e.lineWidth=1;for(let h=0;h<512;h+=32)e.beginPath(),e.moveTo(h,0),e.lineTo(h,512),e.moveTo(0,h),e.lineTo(512,h),e.stroke();e.restore(),e.strokeStyle="#2a1e12",e.lineWidth=3,e.stroke(),e.save(),e.translate(256,256),e.scale(.9,.9),e.translate(-256,-256),e.beginPath(),o.pts.forEach(([h,m],c)=>c?e.lineTo(h*512,m*512):e.moveTo(h*512,m*512)),e.closePath(),e.setLineDash([10,7]),e.strokeStyle="#b3261e",e.lineWidth=2,e.stroke(),e.setLineDash([]),e.restore(),e.strokeStyle="#1b1b1b",e.lineWidth=2.5,e.beginPath(),e.moveTo(256,150),e.lineTo(256,400),e.stroke(),e.beginPath(),e.moveTo(244,168),e.lineTo(256,150),e.lineTo(268,168),e.moveTo(244,382),e.lineTo(256,400),e.lineTo(268,382),e.stroke(),o.pts.forEach(([h,m],c)=>{c%2&&(e.fillStyle="#2a1e12",e.fillRect(h*512-3,m*512-8,6,16))}),e.fillStyle="#2a1e12",e.font="bold 26px Georgia, serif",e.textAlign="center",e.fillText(o.name,256,250),e.font="italic 16px Georgia, serif",e.fillText(o.sub,256,276),e.fillStyle="#7a2e22",e.font="15px Georgia, serif",e.fillText("Comm. No. 47 \u2014 H.M. Queen Isaude",256,302),e.restore()});let r=ze(t);return r.wrapS=r.wrapT=pn,r}function Mh(){let[n,t]=Oe(512,768),e=we(9);t.fillStyle="#efe4cc",t.fillRect(0,0,512,768);for(let i=0;i<2e3;i++)t.fillStyle=`rgba(120,90,40,${e()*.05})`,t.fillRect(e()*512,e()*768,2,2);t.fillStyle="#3a2c1c",t.font="italic 28px Georgia, serif",t.textAlign="center",t.fillText("The Verdigris Aurora",256,50),t.font="16px Georgia, serif",t.fillText("Coronation gown \xB7 Commission No. 47",256,76);for(let i=0;i<13;i++){let s=-1.25+i*.20833333333333334,r=150-Math.abs(i-6)*12;t.save(),t.translate(256,230),t.rotate(s),t.beginPath(),t.ellipse(0,-r/2-10,14,r/2,0,0,7),t.fillStyle=i%3===1?"rgba(80,170,160,0.25)":"rgba(80,170,160,0.45)",t.fill(),t.strokeStyle="#a07a2a",t.lineWidth=2,t.stroke(),t.restore()}t.fillStyle="#1f5a55",t.strokeStyle="#2a1e12",t.lineWidth=2,t.beginPath(),t.moveTo(220,240),t.lineTo(292,240),t.lineTo(282,330),t.lineTo(230,330),t.closePath(),t.fill(),t.stroke();for(let i=0;i<3;i++){let s=340+i*110,r=60+i*55,o=110+i*60;t.fillStyle=["#1f5a55","#3f8a7a","#b8913f"][i],t.beginPath(),t.moveTo(256-r,s),t.lineTo(256+r,s);for(let a=10;a>=0;a--){let l=256-o+a*(2*o/10);t.lineTo(l+o/10,s+130),t.lineTo(l,s+115)}t.closePath(),t.fill(),t.stroke()}t.fillStyle="#d4a646";for(let i=0;i<40;i++)t.beginPath(),t.arc(140+e()*230,360+e()*300,2,0,7),t.fill();return t.fillStyle="#3a2c1c",t.font="italic 14px Georgia, serif",t.textAlign="left",t.fillText("\u2014 gilt wire feathers, 13, organza panes",300,150),t.fillText("\u2014 slashed sleeve, coral lining",320,300),t.fillText("\u2014 petals in three tiers,",360,470),t.fillText("   velvet / shot silk / brocade",360,490),t.fillText("train: constellation of the",30,720),t.fillText("Nine Crowns, gold couched",30,740),t.strokeStyle="rgba(58,44,28,0.5)",t.beginPath(),t.moveTo(298,146),t.lineTo(270,180),t.stroke(),ze(n)}function Sh(){let[n,t]=Oe(512,512),e=we(3);t.fillStyle="#ece2cc",t.fillRect(0,0,512,512);for(let i=0;i<512;i+=2)t.fillStyle=`rgba(90,70,40,${.03+e()*.05})`,t.fillRect(0,i,512,1),t.fillRect(i,0,1,512);for(let i=0;i<120;i++)t.fillStyle="rgba(110,80,40,0.25)",t.fillRect(e()*512,e()*512,2+e()*4,1);t.strokeStyle="rgba(40,40,60,0.55)",t.lineWidth=1.5,t.setLineDash([8,6]);for(let i=40;i<512;i+=128)t.beginPath(),t.moveTo(i,0),t.bezierCurveTo(i+20,170,i-20,340,i+10,512),t.stroke();t.setLineDash([]),t.strokeStyle="rgba(160,40,40,0.6)";for(let i=60;i<512;i+=110)t.beginPath(),t.moveTo(0,i),t.lineTo(512,i+4),t.stroke();t.fillStyle="rgba(40,40,60,0.7)",t.font="18px Georgia, serif",t.fillText("CF",10,40),t.fillText("SB",260,240),t.fillText("+1/4",140,420),t.fillText("waist",330,100);for(let i=0;i<10;i++){let s=e()*512,r=e()*512;t.beginPath(),t.moveTo(s-6,r-6),t.lineTo(s+6,r+6),t.moveTo(s+6,r-6),t.lineTo(s-6,r+6),t.stroke()}return ze(n)}function Eh(){let[n,t]=Oe(1024,512),e=we(5);t.fillStyle="#efe3c6",t.fillRect(0,0,1024,512);for(let i=0;i<1024;i+=2)t.fillStyle=`rgba(255,255,255,${.04+e()*.05})`,t.fillRect(i,0,1,512);t.strokeStyle="rgba(255,255,255,0.95)",t.lineWidth=3,t.setLineDash([12,8]);for(let i=0;i<3;i++){let s=[12,14,16][i],r=80+i*130;t.beginPath();for(let o=0;o<s;o++){let a=o*1024/s,l=1024/s;t.moveTo(a,r),t.quadraticCurveTo(a+l/2,r+190,a+l,r)}t.stroke()}t.setLineDash([]),t.fillStyle="rgba(80,80,110,0.7)",t.font="22px Georgia, serif";for(let i=0;i<6;i++)t.fillText(["I","II","III"][i%3]+"\xB7"+(i+3),60+i*170,70+i%3*130);return ze(n)}function wh(){let[t,e]=Oe(1024,1024),[i,s]=Oe(1024,1024),r=we(11);e.fillStyle="#123f3d",e.fillRect(0,0,1024,1024);for(let h=0;h<3e3;h++)e.fillStyle=`rgba(${r()<.5?0:120},${r()<.5?40:200},${r()<.5?40:190},0.04)`,e.beginPath(),e.arc(r()*1024,r()*1024,3+r()*14,0,7),e.fill();s.fillStyle="#000",s.fillRect(0,0,1024,1024);let o=[];for(let h=0;h<46;h++)o.push([r()*1024,60+r()*904,8+r()*20]);let a=(h,m,c,f)=>{h.beginPath();for(let x=0;x<10;x++){let v=x*Math.PI/5-Math.PI/2,p=x%2?f*.42:f;h.lineTo(m+Math.cos(v)*p,c+Math.sin(v)*p)}h.closePath()};o.sort((h,m)=>h[0]-m[0]);for(let h=0;h<o.length;h++){let[m,c,f]=o[h],x=m<1024*.55;if(h>0&&Math.abs(o[h-1][1]-c)<260){let[v,p]=o[h-1];if(x&&v<1024*.55)for(let d of[e,s])d.strokeStyle=d===e?"#d8ad55":"#fff",d.lineWidth=2.5,d.beginPath(),d.moveTo(v,p),d.lineTo(m,c),d.stroke();else e.strokeStyle="rgba(240,240,230,0.75)",e.setLineDash([6,8]),e.lineWidth=2,e.beginPath(),e.moveTo(v,p),e.lineTo(m,c),e.stroke(),e.setLineDash([])}if(x){for(let v of[e,s])a(v,m,c,f),v.fillStyle=v===e?"#e2b85a":"#fff",v.fill();e.strokeStyle="#7a5a20",e.lineWidth=1.5,a(e,m,c,f),e.stroke()}else e.strokeStyle="rgba(245,245,235,0.85)",e.setLineDash([4,5]),e.lineWidth=2,a(e,m,c,f),e.stroke(),e.setLineDash([])}for(let h=0;h<500;h++){let m=r()*1024*.55,c=r()*1024;for(let f of[e,s])f.fillStyle=f===e?"#cfa24c":"#ddd",f.fillRect(m,c,2.5,2.5)}let l=ze(t),u=ze(i,!1);return[l,u]}function Th(){let[n,t]=Oe(512,64),e=we(13);t.fillStyle="#000",t.fillRect(0,0,512,64),t.fillStyle="#fff",t.fillRect(0,0,512,20);for(let i=0;i<512;i+=1.5)t.fillStyle="#fff",t.fillRect(i,0,1,20+e()*e()*44);return ze(n,!1)}function Ah(){let[n,t]=Oe(1024,32);t.fillStyle="#e8c63a",t.fillRect(0,0,1024,32),t.fillStyle="#2a1e12",t.font="12px sans-serif";for(let e=0;e<1024;e+=8)t.fillRect(e,0,1,e%40===0?12:6),e%80===0&&t.fillText(String(e/8),e+2,26);return ze(n)}function Rh(){let[n,t]=Oe(1024,1024),e=we(17);t.fillStyle="#7a2f2a",t.fillRect(0,0,1024,1024);for(let[i,s]of[[20,"#1d4744"],[60,"#c9a35a"],[72,"#1d4744"],[130,"#c9a35a"],[140,"#5c2420"]])t.strokeStyle=s,t.lineWidth=i<100?30:8,t.strokeRect(i,i,1024-2*i,1024-2*i);for(let i=0;i<64;i++){let s=i/64*Math.PI*2;t.fillStyle="#c9a35a",t.beginPath(),t.ellipse(512+Math.cos(s)*300,512+Math.sin(s)*300,18,8,s,0,7),t.fill()}t.save(),t.translate(512,512);for(let i=0;i<16;i++)t.rotate(Math.PI/8),t.fillStyle=i%2?"#1d4744":"#2f6b63",t.beginPath(),t.ellipse(0,-130,40,120,0,0,7),t.fill();return t.fillStyle="#c9a35a",t.beginPath(),t.arc(0,0,70,0,7),t.fill(),t.restore(),As(t,512,520,.45,"#5c2420","#1d4744"),ji(t,1024,1024,26,e),ze(n)}function Ch(){let[n,t]=Oe(512,256);["SILKS \xB7 I","VELVETS","WOOLLENS","BROCADES","LININGS","ORGANZA","TWEEDS","TRIMS"].forEach((s,r)=>{let o=r%4*128,a=Math.floor(r/4)*128;t.fillStyle="#efe6cf",t.fillRect(o+4,a+30,120,68),t.strokeStyle="#6b5130",t.lineWidth=2,t.strokeRect(o+8,a+34,112,60),t.fillStyle="#2a1e12",t.font="bold 15px Georgia, serif",t.textAlign="center",t.fillText(s,o+64,a+62),t.font="italic 12px Georgia, serif",t.fillText("No. "+(101+r*37)+"\u2013"+(130+r*37),o+64,a+82)});let i=ze(n);return i.wrapS=i.wrapT=pn,i}function Ph(){let[n,t]=Oe(256,256),e=we(21);t.fillStyle="#ece4d4",t.fillRect(0,0,256,256);for(let i=0;i<400;i++)t.fillStyle=`rgba(${e()<.5?255:120},${e()<.5?250:100},${e()<.5?240:80},0.05)`,t.beginPath(),t.arc(e()*256,e()*256,4+e()*20,0,7),t.fill();return ji(t,256,256,8,e),ze(n)}var _l,Rs=Qe(()=>{Je();_l=(n,t,e,i=1)=>`rgba(${n|0},${t|0},${e|0},${i})`});function Ih(){let n=a=>new hn(a),t=a=>new Ir(a),e={};for(let[a,l]of[["weave",1],["stripe",2],["pinstripe",3],["plaid",4],["tweed",5],["damask",6],["foulard",7],["velvet",8],["boltend",9]])e[a]=vh(a,l);let[i,s]=wh(),r={tex:e,parquet:n({map:_h(1),roughness:.42,metalness:0}),archiveFloor:n({map:ts(2,[96,60,36],7,!1),roughness:.55}),workFloor:n({map:ts(3,[150,112,72],5,!0),roughness:.82}),damask:n({map:yh(),roughness:.8}),plaster:n({map:Ph(),roughness:.92,color:15920352}),ceiling:n({color:15722972,roughness:.95}),walnut:n({map:ts(4,[92,56,32],4,!1),roughness:.5}),walnutDark:n({map:ts(5,[62,38,22],4,!1),roughness:.45}),oakWorn:n({map:ts(6,[168,128,82],3,!0),roughness:.7}),paintTeal:n({color:2379851,roughness:.6}),gilt:n({color:13804874,metalness:1,roughness:.3}),brass:n({color:12092987,metalness:1,roughness:.42}),steel:n({color:13159634,metalness:1,roughness:.22}),iron:n({color:2763308,metalness:.8,roughness:.5}),blackLacquer:n({color:1118481,roughness:.25,metalness:.2}),mirror:n({color:14673640,metalness:1,roughness:.03}),glassWin:n({color:13624063,emissive:13624063,emissiveIntensity:1.6,roughness:.2}),skylight:n({color:15134975,emissive:15134975,emissiveIntensity:2}),bulb:n({color:16769192,emissive:16760944,emissiveIntensity:4}),shadeLinen:n({color:15325620,emissive:6965792,emissiveIntensity:.6,roughness:.9,side:Kt}),rug:n({map:Rh(),roughness:1}),upholstery:t({color:9056053,roughness:.8,sheen:1,sheenColor:new Pt(16751242),sheenRoughness:.4,map:e.velvet}),baize:n({color:3103292,roughness:1,map:e.weave}),curtain:t({color:6104112,roughness:.85,sheen:1,sheenColor:new Pt(14121600),sheenRoughness:.5,map:e.velvet,side:Kt}),sheer:n({color:16052712,roughness:.9,transparent:!0,opacity:.45,side:Kt,depthWrite:!1}),paper:n({map:bh(),alphaTest:.5,side:Kt,roughness:.92}),kraft:n({color:13217148,roughness:.95,map:e.weave}),sketch:n({map:Mh(),roughness:.9}),labels:n({map:Ch(),roughness:.8}),cork:n({color:10844748,roughness:1,map:e.tweed,side:Kt}),porcelain:n({color:16118506,roughness:.2}),bolt:{},toile:n({map:Sh(),roughness:.95,side:Kt}),lining:t({color:14709850,roughness:.35,sheen:.8,sheenColor:new Pt(16762016),sheenRoughness:.3,side:Kt}),velvet:t({color:1002827,roughness:.9,sheen:1,sheenColor:new Pt(6281412),sheenRoughness:.35,map:e.velvet,side:Kt}),shotSilk:t({color:4164218,roughness:.3,sheen:1,sheenColor:new Pt(15188064),sheenRoughness:.25,side:Kt}),brocade:n({color:13146696,metalness:.55,roughness:.45,map:e.damask,side:Kt}),underSilk:t({map:Eh(),roughness:.4,sheen:.6,sheenColor:new Pt(16777215),sheenRoughness:.3,side:Kt}),train:n({map:i,metalnessMap:s,metalness:.9,roughnessMap:null,roughness:.75,side:Kt}),organza:n({color:10477780,roughness:.25,transparent:!0,opacity:.38,side:Kt,depthWrite:!1,emissive:862758}),fringe:n({color:15721414,alphaMap:Th(),alphaTest:.45,side:Kt,roughness:.6}),formLinen:n({color:13482393,roughness:.95,map:e.weave,side:Kt}),thread:n({color:16184040,roughness:.7}),chalk:n({color:15921904,roughness:1}),tape:n({map:Ah(),roughness:.6,side:Kt}),cabochonR:t({color:10489898,roughness:.05,transmission:0,clearcoat:1,metalness:.1}),cabochonG:t({color:1018474,roughness:.05,clearcoat:1,metalness:.1}),pinHead:n({roughness:.25})};for(let a of["parquet","archiveFloor","workFloor","walnut","walnutDark","oakWorn"])r[a].bumpMap=r[a].map,r[a].bumpScale=.35;r.toile.bumpMap=e.weave,r.toile.bumpScale=.4,r.velvet.bumpMap=e.velvet,r.velvet.bumpScale=.5,r.sheer.userData.noCast=!0,r.organza.userData.noCast=!0,r.glassWin.userData.noCast=!0,r.skylight.userData.noCast=!0,r.ceiling.userData.noCast=!0,r.damask.userData.noCast=!0,r.paintTeal.userData.noCast=!0,r.plaster.userData.noCast=!0,r.bulb.userData.noCast=!0,r.shadeLinen.userData.noCast=!0,r.parquet.userData.noCast=!0,r.archiveFloor.userData.noCast=!0,r.workFloor.userData.noCast=!0,r.rug.userData.noCast=!0;let o={silk:{map:e.weave,roughness:.28,sheen:.8},velvet:{map:e.velvet,roughness:.9,sheen:1},stripe:{map:e.stripe,roughness:.6},pinstripe:{map:e.pinstripe,roughness:.75},plaid:{map:e.plaid,roughness:.85},tweed:{map:e.tweed,roughness:.95},damask:{map:e.damask,roughness:.4,metalness:.25},foulard:{map:e.foulard,roughness:.45}};for(let[a,l]of Object.entries(o))r.bolt[a]=l.sheen?t({map:l.map,roughness:l.roughness,sheen:l.sheen,sheenColor:new Pt(5921370),sheenRoughness:.35,side:Kt}):n({map:l.map,roughness:l.roughness,metalness:l.metalness||0,side:Kt});return r.bolt.tweed.bumpMap=e.tweed,r.bolt.tweed.bumpScale=.6,r.bolt.plaid.bumpMap=e.weave,r.bolt.plaid.bumpScale=.4,r.boltEnd=n({map:e.boltend,roughness:.8,bumpMap:e.boltend,bumpScale:.5}),r}var Lh=Qe(()=>{Je();Rs()});function Vr(n,t,e,i,s,r,o){n.push(i,0,s,r),n.rbox(o,.62,.14,.58,.04,0,.46,0),n.rbox(o,.58,.62,.1,.04,0,.86,-.27,0,-.12),n.box(t.gilt,.66,.05,.62,0,.37,0);for(let a of[-.28,.28]){for(let l of[-.26,.26])n.cyl(t.walnutDark,.025,.018,.37,8,a,.185,l);n.rbox(o,.08,.2,.5,.03,a*1.12,.62,0),n.sph(t.gilt,.03,a*1.12,.73,.24)}n.sph(t.gilt,.035,0,1.2,-.3),n.pop(),e.boxC(i,s,.75,.75)}function Dh({B:n,M:t,C:e,pins:i,H:s}){let a=new tn(5.2,4.4);n.geo(a,t.rug,-12,.006,-1.2+.6,-Math.PI/2),n.cyl(t.walnut,1.6,1.62,.1,64,-12,.05,-1.2),n.cyl(t.walnutDark,1.32,1.34,.1,64,-12,.15,-1.2),n.cyl(t.upholstery,1.26,1.26,.02,64,-12,.2,-1.2),n.geo(new te(1.3,.018,6,96),t.gilt,-12,.2,-1.2,Math.PI/2),n.geo(new te(1.61,.012,6,96),t.gilt,-12,.1,-1.2,Math.PI/2),n.push(-12+.75,.2,-1.2+.35),n.cyl(t.iron,.12,.14,.03,20,0,.015,0),n.cyl(t.brass,.01,.01,.9,8,0,.45,0),n.box(t.walnut,.06,.04,.12,0,.62,.05),n.sph(t.upholstery,.035,0,.62,.13,1,1,1),n.pop(),e.circle(-12+.75,-1.2+.35,.16);let l=-4.72,u=(b,y,S,L)=>{n.push(b,0,y,S),n.box(t.mirror,L,2.3,.02,0,1.45,0),n.box(t.gilt,L+.12,.08,.06,0,.27,0),n.box(t.gilt,L+.12,.1,.06,0,2.63,0),n.box(t.gilt,.06,2.42,.06,-L/2-.03,1.45,0),n.box(t.gilt,.06,2.42,.06,L/2+.03,1.45,0),n.box(t.walnutDark,L+.1,2.4,.03,0,1.45,-.035),n.sph(t.gilt,.05,0,2.74,0),n.cyl(t.walnutDark,.03,.04,.24,8,-L/2,.12,0),n.cyl(t.walnutDark,.03,.04,.24,8,L/2,.12,0),n.pop()};u(-12,l,0,1.1),u(-12-.55-.5*Math.cos(.55),l+.5*Math.sin(.55),.55,1),u(-12+.55+.5*Math.cos(.55),l+.5*Math.sin(.55),-.55,1),e.box(-12-1.6,-12+1.6,-5,-4.1),n.cyl(t.gilt,.32,.32,.04,32,-12,3.35,-4.84,Math.PI/2),n.cyl(t.paintTeal,.27,.27,.05,32,-12,3.35,-4.83,Math.PI/2);for(let b=0;b<5;b++){let y=-.6+b*.3;n.box(t.gilt,.05,.22,.04,-12+Math.sin(y)*.12,3.4+Math.cos(y)*.08,-4.79,0,0,-y)}n.cyl(t.ceiling,.7,.75,.04,48,-12,s-.02,-1.2),n.geo(new te(.72,.025,6,64),t.gilt,-12,s-.04,-1.2,Math.PI/2),n.geo(new te(.45,.02,6,48),t.gilt,-12,s-.045,-1.2,Math.PI/2);for(let b=0;b<16;b++){let y=b/16*Math.PI*2;n.sph(t.gilt,.03,-12+Math.cos(y)*.59,s-.045,-1.2+Math.sin(y)*.59,1.6,.5,.8)}n.push(-12,0,-1.2),n.cyl(t.gilt,.012,.012,.75,6,0,s-.375,0),n.sph(t.gilt,.09,0,3.35,0,1,1.4,1),n.geo(new te(.45,.018,6,48),t.gilt,0,3.15,0,Math.PI/2);for(let b=0;b<8;b++){let y=b/8*Math.PI*2,S=Math.cos(y)*.45,L=Math.sin(y)*.45;n.cyl(t.porcelain,.018,.018,.1,8,S,3.22,L),n.sph(t.bulb,.022,S,3.3,L,1,1.5,1),n.geo(ne([[0,3.3,0],[S*.5,3.1,L*.5],[S,3.15,L]],.01,12,5),t.gilt),n.sph(t.mirror,.025,S*1.06,3.04,L*1.06,.7,1.4,.7,6)}n.pop(),n.push(-15.2,0,.2,Math.PI/2),n.rbox(t.upholstery,1.9,.18,.7,.06,0,.42,0),n.rbox(t.upholstery,.16,.5,.7,.06,-.92,.66,0,0,0,.2),n.rbox(t.upholstery,1.3,.36,.12,.05,-.25,.7,-.32,0,-.2),n.box(t.gilt,1.95,.06,.74,0,.32,0);for(let b of[-.85,.85])for(let y of[-.3,.3])n.cyl(t.walnutDark,.03,.02,.3,8,b,.15,y);n.rbox(t.shotSilk,.4,.14,.35,.06,.5,.58,.05,.3),n.pop(),e.box(-15.9,-14.75,-.8,1.2);let h=-14.75,m=1.75;n.cyl(t.walnut,.36,.36,.04,32,h,.7,m),n.cyl(t.gilt,.365,.365,.012,32,h,.68,m),n.cyl(t.walnutDark,.04,.06,.66,10,h,.35,m);for(let b=0;b<3;b++){let y=b*2.094;n.box(t.walnutDark,.3,.04,.05,h+Math.cos(y)*.14,.04,m+Math.sin(y)*.14,-y)}n.cyl(t.porcelain,.07,.05,.12,16,h-.1,.78,m-.06),n.cyl(t.porcelain,.012,.012,.06,6,h-.02,.8,m-.06,0,0,1.2);for(let[b,y]of[[.12,.08],[-.05,.16]])n.cyl(t.porcelain,.07,.07,.008,16,h+b,.725,m+y),n.cyl(t.porcelain,.04,.03,.05,16,h+b,.755,m+y);n.sph(t.upholstery,.06,h+.15,.74,m-.12,1,.6,1);for(let b=0;b<9;b++){let y=b*.7;i.push([de(h+.15+Math.cos(y)*.035,.775,m-.12+Math.sin(y)*.035,Math.cos(y)*.5,0,Math.sin(y)*.5),["#c0392b","#f1c40f","#2e86c1","#ecf0f1"][b%4]])}e.circle(h,m,.42),Vr(n,t,e,-9.2,3.3,-2.3,t.upholstery),Vr(n,t,e,-9,2,-1.9,t.upholstery),n.cyl(t.walnut,.24,.24,.03,24,-8.75,.55,2.7),n.cyl(t.walnutDark,.03,.04,.54,8,-8.75,.27,2.7),n.card(t.sketch,.2,.28,-8.75,.572,2.7,-Math.PI/2,.3,0),e.circle(-8.75,2.7,.28);let c=-15.6,f=-13.7,x=4.45;n.cyl(t.brass,.015,.015,f-c,8,(c+f)/2,1.85,x,0,0,Math.PI/2);for(let b of[c,f])n.cyl(t.brass,.018,.018,1.85,8,b,.925,x),n.box(t.walnutDark,.08,.04,.5,b,.02,x);let v=[t.velvet,t.lining,t.shotSilk,t.curtain,t.brocade,t.toile];for(let b=0;b<6;b++){let y=c+.2+b*.3;n.geo(ne([[y-.17,1.72,x],[y,1.8,x],[y+.17,1.72,x]],.006,12,4),t.walnutDark),n.geo(ne([[y,1.8,x],[y,1.87,x],[y+.02,1.89,x]],.003,6,4),t.brass),n.geo(fn(.42,1.1+b%3*.12,3+b%2,.035,b),v[b],y,1.75,x,0,Math.PI/2+.15*(b%2?1:-1))}e.box(c-.1,f+.1,4.1,5);for(let b=0;b<3;b++){let y=-.5+b*.5;n.push(-15.1+b*.52*Math.cos(.3),0,-3.4-b*.2,.3+(b%2?-.5:.2)),n.box(t.walnutDark,.56,1.9,.04,0,1,0),n.box(t.damask,.46,1.4,.05,0,1.15,0),n.box(t.gilt,.5,.03,.06,0,1.87,0),n.box(t.gilt,.5,.03,.06,0,.42,0),n.pop()}e.box(-15.6,-13.6,-4,-3),n.geo(fn(.5,.8,3,.04,2),t.lining,-14.6,1.92,-3.45,0,.1);let p=-9.3,d=-4.45;n.box(t.walnut,1.4,.95,.55,p,.475,d);for(let b=0;b<3;b++)for(let y=0;y<4;y++)n.box(t.walnutDark,.31,.26,.02,p-.51+y*.34,.17+b*.29,d+.28),n.card(t.labels,.1,.05,p-.51+y*.34,.24+b*.29,d+.292,0,0,0,[(b*4+y)%4/4,.5-Math.floor((b*4+y)%8/4)*.5+.12,(b*4+y)%4/4+.25,1-Math.floor((b*4+y)%8/4)*.5-.12]),n.sph(t.brass,.014,p-.51+y*.34,.15+b*.29,d+.3);n.box(t.walnutDark,1.46,.04,.6,p,.97,d);for(let b=0;b<3;b++){let y=p-.45+b*.45;n.box(t.baize,.36,.02,.28,y,1,d+.04);for(let S=0;S<12;S++)n.cyl([t.gilt,t.porcelain,t.blackLacquer][b],.014,.014,.008,12,y-.13+S%4*.085,1.015,d-.05+Math.floor(S/4)*.09)}for(let b=0;b<5;b++){let y=p-.5+b*.25;n.cyl([t.lining,t.velvet,t.shotSilk,t.brocade,t.upholstery][b],.05,.05,.04,20,y,1.3,d-.12,Math.PI/2),n.cyl(t.walnut,.02,.02,.05,8,y,1.3,d-.12,Math.PI/2)}n.cyl(t.brass,.008,.008,1.3,6,p,1.3,d-.12,0,0,Math.PI/2);for(let b of[p-.68,p+.68])n.box(t.walnutDark,.04,.4,.04,b,1.17,d-.12);e.box(p-.75,p+.75,-5,d+.33);for(let b of[-2.6,2.6]){for(let y of[-1,1])n.geo(fn(.55,3.25,4,.05,b+y),t.curtain,-15.78,3.75,b+y*.95,0,Math.PI/2);n.geo(fn(1.2,2.7,7,.02,b),t.sheer,-15.82,3.7,b,0,Math.PI/2),n.cyl(t.gilt,.02,.02,2.5,8,-15.75,3.78,b,Math.PI/2);for(let y of[-1,1])n.sph(t.gilt,.045,-15.75,3.78,b+y*1.27)}for(let[b,y,S]of[[-8.14,-3.2,-Math.PI/2],[-8.14,2.2,-Math.PI/2],[-15.86,-.9,Math.PI/2],[-15.86,1.3,Math.PI/2],[-14.2,4.86,Math.PI],[-9.8,4.86,Math.PI]])n.push(b,2.25,y,S),n.box(t.gilt,.1,.22,.03,0,0,.015),n.geo(ne([[0,-.06,.03],[0,-.1,.12],[0,-.02,.2]],.01,10,5),t.gilt),n.cyl(t.gilt,.04,.025,.03,12,0,-.02,.2),n.cyl(t.porcelain,.012,.012,.12,8,0,.05,.2),n.sph(t.bulb,.012,0,.125,.2,1,1.8,1,8),n.pop();n.box(t.gilt,.06,1.2,.95,-8.14,2.3,3.4),n.card(t.sketch,.75,1.05,-8.1,2.3,3.4,0,-Math.PI/2,0)}var vl=Qe(()=>{Je();Qi()});function ci(n,t,e){let i=n.clone(),s=i.attributes.uv;for(let r=0;r<s.count;r++)s.setXY(r,s.getX(r)*t,s.getY(r)*e);return i}function Uh({B:n,M:t,C:e,pins:i,scene:s}){let r=we(77),o=(U,Y=.08)=>{let q=new Pt(U);return q.offsetHSL((r()-.5)*.02,(r()-.5)*.1,(r()-.5)*Y),q},a=U=>U[Math.floor(r()*U.length)],l=(U,Y)=>{let q=new ye(1,1,1,20,1),st=q.attributes.uv;for(let tt=0;tt<st.count;tt++)tt<42&&st.setXY(tt,st.getX(tt)*U,st.getY(tt)*Y);return q},u={rollSilk:new Ee(l(3,1),[t.bolt.silk,t.boltEnd,t.boltEnd]),rollFoulard:new Ee(l(4,2),[t.bolt.foulard,t.boltEnd,t.boltEnd]),rollStripe:new Ee(l(2,1),[t.bolt.stripe,t.boltEnd,t.boltEnd]),rollDamask:new Ee(l(1,1),[t.bolt.damask,t.boltEnd,t.boltEnd]),rollVelvet:new Ee(l(2,1),[t.bolt.velvet,t.boltEnd,t.boltEnd]),boardTweed:new Ee(ci(new fe(1,1,1),1,1),t.bolt.tweed),boardPlaid:new Ee(ci(new fe(1,1,1),.8,.8),t.bolt.plaid),boardPin:new Ee(ci(new fe(1,1,1),3,3),t.bolt.pinstripe),foldVelvet:new Ee(ci(new fe(1,1,1,1,1,1),1.5,1.5),t.bolt.velvet),foldSilk:new Ee(ci(new fe(1,1,1),2,2),t.bolt.silk),foldDamask:new Ee(ci(new fe(1,1,1),1,1),t.bolt.damask),foldWool:new Ee(ci(new fe(1,1,1),2,2),t.bolt.tweed)},h=new I,m=new De,c=new Se,f=new I,x=(U,Y,q,st,tt,mt,Lt,gt,P)=>(c.set(st,tt,mt),m.setFromEuler(c),new Vt().compose(h.set(U,Y,q),m,f.set(Lt,gt,P))),v=-3.38,p=.6,d=v+p,b=-7.75,y=2.3,S=5,L=3.3,T=[.1,.6,1.1,1.6,2.1,2.6,3.1];n.box(t.walnutDark,S*y,L,.03,b+S*y/2,L/2,v+.015);for(let U=0;U<=S;U++)n.box(t.walnut,.06,L+.05,p,b+U*y,(L+.05)/2,v+p/2);for(let U of T)n.box(t.walnut,S*y,.035,p,b+S*y/2,U,v+p/2),n.box(t.walnutDark,S*y,.05,.02,b+S*y/2,U-.005,d+.01);n.box(t.walnutDark,S*y+.2,.22,p+.12,b+S*y/2,L+.11,v+p/2+.03),n.box(t.gilt,S*y+.2,.03,.02,b+S*y/2,L+.02,d+.1);let E=[0,6,1,3,7];for(let U=0;U<S;U++){let Y=E[U];n.box(t.brass,.42,.18,.01,b+U*y+y/2,L+.12,d+.095),n.card(t.labels,.36,.14,b+U*y+y/2,L+.12,d+.102,0,0,0,[Y%4/4,(Y<4?.5:0)+.12,Y%4/4+.25,(Y<4?1:.5)-.12])}e.box(b-.1,b+S*y+.1,-3.6,d+.12);for(let U=0;U<S;U++){let Y=b+U*y+.05,q=Y+y-.1;for(let st=0;st<T.length-1;st++){let tt=T[st]+.018,mt=T[st+1]-T[st]-.04,Lt=[["ends","ends","ends","ends","ends","ends"],["boards","boards","boards","boards","folds","boards"],["folds","folds","folds","folds","folds","folds"],["long","long","long","long","long","ends"],["ends","folds","ends","ends","boards","ends"]][U][st];if(!(r()<.08&&st>0)){if(Lt==="ends"){let gt=Y+.02,P=U===0?["rollSilk","rollSilk","rollFoulard"]:["rollDamask","rollStripe","rollVelvet","rollSilk"],zt=U===0?ce.silk:[...ce.brocade,...ce.velvet],At=[];for(;;){let Rt=.055+r()*.04;if(gt+Rt*2>q)break;let Mt=a(P),Gt=o(a(Mt==="rollVelvet"?ce.velvet:Mt==="rollDamask"?ce.brocade:zt)),wt=.5+r()*.08;u[Mt].add(x(gt+Rt,tt+Rt,v+.04+wt/2+(r()-.5)*.03,Math.PI/2,0,r()*6,Rt,wt,Rt),Gt),At.push([gt+Rt,Rt]),gt+=Rt*2+.004}for(let Rt=0;Rt<At.length-1;Rt++){if(r()<.3)continue;let[Mt,Gt]=At[Rt],[wt,R]=At[Rt+1],M=Math.min(Gt,R)*(.8+r()*.2),H=tt+Math.max(Gt,R)*2+M*.55;if(H+M>tt+mt)continue;let J=a(P);u[J].add(x((Mt+wt)/2,H,v+.3,Math.PI/2,0,r()*6,M,.5,M),o(a(zt)))}}else if(Lt==="boards"){let gt=Y+.03;for(;;){let P=.05+r()*.08;if(gt+P>q-.02)break;let zt=Math.min(mt-.02,.38+r()*.06),At=a(["boardTweed","boardPlaid","boardPin"]),Rt=gt+P>q-.2&&r()<.5?.12:0;u[At].add(x(gt+P/2,tt+zt/2,v+.3,0,0,-Rt,P,zt,.52),o(a(ce.wool))),gt+=P+.006+(r()<.1?.08:0)}n.box(t.brass,.01,.2,.3,q-.005,tt+.1,v+.3)}else if(Lt==="folds"){let P=(q-Y)/3;for(let zt=0;zt<3;zt++){let At=tt,Rt=Y+P*(zt+.5)+(r()-.5)*.05,Mt=U===2?["foldVelvet","foldVelvet","foldSilk"]:["foldDamask","foldWool","foldSilk"];for(;;){let Gt=.025+r()*.06;if(At+Gt>tt+mt-.03)break;let wt=a(Mt),R=o(a(wt==="foldVelvet"?ce.velvet:wt==="foldSilk"?ce.silk:wt==="foldWool"?ce.wool:ce.brocade));u[wt].add(x(Rt+(r()-.5)*.03,At+Gt/2,v+.3,0,(r()-.5)*.06,0,P*.82,Gt,.46),R),At+=Gt+.002}r()<.5&&n.box(t.lining,.025,At-tt+.004,.47,Rt+P*.2,tt+(At-tt)/2,v+.3)}}else if(Lt==="long"){let gt=2+(r()<.5?1:0);for(let P=0;P<gt;P++){let zt=.06+r()*.025,At=v+.12+P*.17;if(At+zt>d)break;let Rt=o(a(ce.brocade.concat(ce.silk))),Mt=P===0?"rollDamask":a(["rollSilk","rollDamask","rollStripe"]);if(u[Mt].add(x((Y+q)/2,tt+zt,At,0,0,Math.PI/2,zt,q-Y-.1,zt),Rt),P===gt-1&&r()<.75){let Gt=Mt==="rollSilk"?t.bolt.silk:Mt==="rollStripe"?t.bolt.stripe:t.bolt.damask,wt=.5+r()*.5,R=Y+.3+r()*(q-Y-.6-wt/2),M=.25+r()*.3,J=re((nt,K)=>{let bt=(nt-.5)*wt,lt=K*(.2+M),ft,Wt;if(lt<.2)ft=zt*2-lt*.6,Wt=At+zt+lt*.9;else{let rt=lt-.2;ft=zt*2-.12-rt,Wt=d+.03+Math.sin(nt*18)*.012*rt/M}return[bt,ft,Wt]},16,10).clone();J.attributes.uv.array.forEach((nt,K,bt)=>{bt[K]*=2}),n.geo(J,Gt===t.bolt.silk?t.shotSilk:Gt===t.bolt.stripe?t.lining:t.brocade,R,tt,0)}}}}}}n.cyl(t.brass,.018,.018,S*y,8,b+S*y/2,2.95,d+.2,0,0,Math.PI/2);for(let U of[b+.01,b+S*y-.01])n.box(t.brass,.02,.04,.2,U,2.95,d+.1);{let Y=d+.2,q=d+1.05,st=Math.atan2(q-Y,2.95);for(let tt of[-.24,.24])n.box(t.walnut,.05,3.1,.07,-1.6+tt,1.5,(Y+q)/2,0,st);for(let tt=1;tt<10;tt++){let mt=tt/10;n.cyl(t.walnutDark,.015,.015,.48,8,-1.6,2.95*(1-mt),Y+(q-Y)*mt,0,0,Math.PI/2)}n.geo(new te(.03,.01,6,12),t.brass,-1.6-.24,2.95,Y,0,Math.PI/2),n.geo(new te(.03,.01,6,12),t.brass,-1.6+.24,2.95,Y,0,Math.PI/2),e.box(-1.6-.3,-1.6+.3,d,q+.05)}let A=3.38,N=A-.62,g=-7.6,_=-1.4;n.box(t.walnut,_-g,.92,.6,(g+_)/2,.46,A-.3),n.box(t.walnutDark,_-g+.06,.04,.64,(g+_)/2,.94,A-.32);let C=6,D=6;for(let U=0;U<C;U++)for(let Y=0;Y<D;Y++){let q=g+(U+.5)*(_-g)/C,st=.1+Y*.135;n.box(t.walnutDark,(_-g)/C-.03,.11,.015,q,st+.03,N-.01),n.box(t.brass,.14,.018,.02,q,st+0,N-.025);let tt=(U+Y)%8;n.card(t.labels,.12,.05,q,st+.055,N-.019,0,Math.PI,0,[tt%4/4,(tt<4?.5:0)+.12,tt%4/4+.25,(tt<4?1:.5)-.12])}{let U=g+2.5*(_-g)/C,Y=.1+4*.135,q=N-.3;n.box(t.walnut,.95,.04,.55,U,Y+.02,q);for(let st=0;st<8;st++){let tt=o(a(ce.silk.concat(ce.velvet)));n.box(t.kraft,.2,.004,.24,U-.33+st%4*.22,Y+.044,q-.13+Math.floor(st/4)*.26),u[["foldSilk","foldVelvet","foldDamask","foldWool"][st%4]].add(x(U-.33+st%4*.22,Y+.05,q-.15+Math.floor(st/4)*.26,0,(r()-.5)*.1,0,.15,.006,.15),tt)}}e.box(g-.05,_+.05,N-.1,3.6);for(let U=0;U<6;U++){let Y=g+.4+U*.95;for(let q=0;q<3;q++)n.rbox(q%2?t.curtain:t.velvet,.36,.05,.28,.01,Y+(r()-.5)*.04,.985+q*.052,A-.32,(r()-.5)*.2)}n.cyl(t.brass,.016,.016,_-g,10,(g+_)/2,2.3,A-.32,0,0,Math.PI/2);for(let U of[g+.05,_-.05])n.box(t.brass,.02,.02,.32,U,2.3,A-.16);let z=[t.bolt.silk,t.bolt.velvet,t.bolt.plaid,t.bolt.stripe,t.bolt.damask,t.bolt.tweed,t.bolt.foulard,t.bolt.pinstripe],$=z.map(U=>null);for(let U=0;U<16;U++){let Y=g+.25+U*.385,q=U%8,st=z[q],tt=[.012,.03,.02,.016,.022,.025,.01,.018][q],mt=[5,2,3,3,3,2,6,3][q],Lt=.45+r()*.38,gt=fn(.34,Lt,mt,tt,U*1.7,q===0||q===6?.3:.08),P=[3,1.5,.6,1.2,.8,1.5,2,2.5][q];gt.attributes.uv.array.forEach((At,Rt,Mt)=>{Mt[Rt]*=P});let zt=q+"_"+(U>=8?1:0);if(!$[zt]){let At=st.clone();At.color=o(a(q===1?ce.velvet:q===2||q===5||q===7?ce.wool:q===4?ce.brocade:ce.silk),.03),$[zt]=At}n.geo(gt,$[zt],Y,2.24,A-.32+U%2*.03),n.geo(new te(.025,.004,6,12),t.brass,Y,2.28,A-.32,0,Math.PI/2),n.box(t.brass,.34,.012,.02,Y,2.245,A-.32),n.card(t.labels,.08,.035,Y+.11,2.2,A-.305+U%2*.03,0,Math.PI,0,[q%4/4,(q<4?.5:0)+.12,q%4/4+.25,(q<4?1:.5)-.12])}let O=-.9,Q=3.6,X=6,ot=7,et=.36;n.box(t.walnutDark,Q-O,ot*et+.04,.03,(O+Q)/2,ot*et/2+.1,A-.015);for(let U=0;U<=X;U++)n.box(t.walnut,.03,ot*et+.04,.45,O+U*(Q-O)/X,ot*et/2+.1,A-.23);for(let U=0;U<=ot;U++)n.box(t.walnut,Q-O,.025,.45,(O+Q)/2,.1+U*et,A-.23);n.box(t.walnutDark,Q-O,.1,.47,(O+Q)/2,.05,A-.23);for(let U=0;U<X;U++)for(let Y=0;Y<ot;Y++){let q=O+(U+.5)*(Q-O)/X,st=.115+Y*et,tt=2+Math.floor(r()*5),mt=["foldSilk","foldVelvet","foldDamask","foldWool"],Lt=mt[(U+Y)%4];for(let gt=0;gt<tt;gt++){let P=.02+r()*.035;if(st+P>.1+(Y+1)*et-.04)break;let zt=r()<.7?Lt:a(mt);u[zt].add(x(q+(r()-.5)*.04,st+P/2,A-.24,0,(r()-.5)*.15,0,.6,P,.34),o(a(zt==="foldVelvet"?ce.velvet:zt==="foldWool"?ce.wool:zt==="foldDamask"?ce.brocade:ce.silk))),st+=P+.002}(Y===3||Y===0)&&n.card(t.labels,.12,.05,q,.1+Y*et-.012,A-.452,0,Math.PI,0,[U%4/4,.62,U%4/4+.25,.88])}e.box(O-.05,Q+.1,A-.5,3.6);let it=-5.4,Et=1.2,Nt=0,V=.9;n.box(t.walnut,Et-it,.06,1.1,(it+Et)/2,V-.03,Nt),n.box(t.walnutDark,Et-it-.1,.12,1,(it+Et)/2,V-.12,Nt);for(let U of[it+.12,(it+Et)/2,Et-.12])for(let Y of[-.45,.45])n.cyl(t.walnutDark,.045,.035,V-.06,10,U,(V-.06)/2,Nt+Y);n.box(t.walnutDark,Et-it-.2,.04,.06,(it+Et)/2,.15,Nt),e.box(it-.05,Et+.05,-.6,.6);{let U=it+.9;u.rollDamask.add(x(U,V+.09,Nt,Math.PI/2,0,0,.09,.95,.09),new Pt("#c89a48"));let Y=re((q,st)=>{let tt=(q-.5)*.9,mt=st*1.6,Lt,gt;if(mt<.9)Lt=U-.09-mt,gt=V+.004+Math.sin(mt*9+q*3)*.004;else{let zt=mt-.9;Lt=it-.02-Math.sin(zt*2.2)*.06,gt=V-zt}let P=mt>.85?Math.sin(q*Math.PI*5)*.03*Math.min(1,(mt-.85)*3):0;return[Lt-(mt>.9?P:0),gt,tt+(mt>.9,0)]},20,24);Y.attributes.uv.array.forEach((q,st,tt)=>{tt[st]*=1.6}),n.geo(Y,t.brocade)}for(let U=0;U<4;U++){let Y=-3.6+U*1.15,q=U%2?.18:-.15,st=(r()-.5)*.4;n.push(Y,V,q,st),n.box(t.velvet,.62,.03,.42,0,.015,0);for(let tt=0;tt<6;tt++){let mt=-.15+tt*.06,Lt=o(a(Object.values(ce).flat()));u[a(["foldSilk","foldDamask","foldWool","foldVelvet"])].add(new Vt().multiplyMatrices(de(Y,V,q,0,st,0),x(.12+tt*.025,.035+tt*.004,0,0,0,mt,.26,.003,.38)),Lt)}n.box(t.kraft,.28,.035,.4,-.15,.033,0,0,0,.08),n.pop()}for(let U=0;U<9;U++){let Y=-.8+U*.2,q=.4+Math.sin(Y)*.15,st=-.25+Math.cos(Y)*.05;n.box(t.kraft,.14,.002,.2,q,V+.002+U*.002,st,Y),u[["foldSilk","foldVelvet","foldDamask","foldWool"][U%4]].add(x(q,V+.005+U*.002,st+.01,0,Y,0,.1,.002,.1),o(a(Object.values(ce).flat()))),i.push([de(q,V+.03+U*.002,st-.04,.3,0,.2),"#c0392b"])}n.geo(new te(.05,.007,8,24),t.brass,.85,V+.012,.25,Math.PI/2),n.cyl(t.mirror,.046,.046,.004,24,.85,V+.012,.25),n.cyl(t.walnutDark,.012,.014,.12,8,.95,V+.012,.32,Math.PI/2,-.9,0),n.rbox(t.upholstery,.3,.04,.4,.01,-4.6,V+.02,.2,.2),n.box(t.kraft,.28,.01,.38,-4.6,V+.045,.2,.2);for(let U of Object.keys(u))u[U].build(s,!0)}var ce,Nh=Qe(()=>{Je();Qi();Rs();ce={silk:["#8e1b3a","#1f6f8b","#d9a441","#5a2d82","#2e7d4f","#c75b39","#e8d5b0","#224870","#b03a5b","#e6c86e"],wool:["#4a4a52","#6b5a45","#2f3b4c","#7a6a58","#3c4a3a","#8a7f70","#5b3a2e","#9c9480"],velvet:["#7c1f35","#1a4f73","#235e45","#6b2a5e","#8a4a1c","#3a3a5c","#0f4d4b"],brocade:["#c89a48","#a7743a","#d8b36a","#9a6a7a","#7d8f6a"]}});function bl(n,t,e,i,s,r,o=.25,a=1){n.push(e,i,s,r,0,0,a);for(let l of[-1,1])n.push(0,.006,0,l*o/2),n.box(t.steel,.016,.003,.16,0,0,-.08),n.box(t.steel,.008,.0032,.05,.004,0,-.17),n.geo(new te(.022,.005,6,14),t.blackLacquer,l*.012,0,.05,Math.PI/2),n.box(t.steel,.008,.004,.03,l*.004,0,.018),n.pop();n.cyl(t.brass,.005,.005,.012,8,0,.01,0),n.pop()}function Gr(n,t,e,i,s){n.cyl(t.iron,.004,.004,4.2-s-.15,4,e,(4.2+s+.15)/2,i),n.geo(new ye(.06,.26,.24,24,1,!0),t.shadeLinen,e,s+.04,i),n.cyl(t.brass,.04,.05,.05,12,e,s+.17,i),n.sph(t.bulb,.045,e,s-.02,i)}function Fh({B:n,M:t,C:e,pins:i,scene:s}){let r=we(99),o=6.9,a=13.3,l=-5.4,u=.92,h=.9,m=(o+a)/2;n.box(t.oakWorn,a-o,.08,h,m,u-.04,l),n.box(t.walnutDark,a-o-.1,.16,h-.1,m,u-.16,l);for(let g of[o+.1,m,a-.1])for(let _ of[-.36,.36])n.box(t.oakWorn,.09,u-.08,.09,g,(u-.08)/2,l+_);n.box(t.oakWorn,a-o-.2,.03,h-.15,m,.18,l);for(let g=0;g<6;g++){let _=o+.55+g*1.06;n.box(t.walnut,.9,.14,.02,_,u-.16,l+h/2-.04),n.box(t.brass,.12,.02,.025,_,u-.16,l+h/2-.02)}for(let g=0;g<5;g++)n.rbox(g%2?t.toile:t.kraft,.6,.05+r()*.05,.5,.015,o+.6+g*1.2,.23+.03,l+.05,(r()-.5)*.2);e.box(o-.05,a+.05,-6,l+h/2+.05);let c=u;n.push(8,c,l+.05,.25),n.rbox(t.walnut,.7,.03,.16,.01,0,.16,0),n.box(t.walnutDark,.06,.16,.12,-.25,.08,0),n.box(t.walnutDark,.5,.02,.2,0,.01,0),n.geo(new ye(.055,.075,.5,18,1,!0),t.toile,.05,.22,0,0,0,Math.PI/2),n.geo(new ye(.06,.08,.36,18,1,!0,0,Math.PI*1.3),t.velvet,.12,.225,0,0,0,Math.PI/2),n.geo(new ye(.058,.0785,.37,18,1,!0,Math.PI*1.3,.4),t.lining,.12,.225,0,0,0,Math.PI/2);for(let g=0;g<8;g++)i.push([new Vt().multiplyMatrices(n.top,de(-.05+g*.04,.29,.02,.3,0,.2)),"#c0392b"]);n.pop(),n.push(9,c,l-.15,-.4),n.box(t.iron,.18,.012,.12,0,.006,0),n.geo(new ye(.06,.08,.08,3),t.iron,0,.055,0,0,Math.PI/6,0,1.5,1,1),n.geo(ne([[-.06,.09,0],[-.04,.16,0],[.04,.16,0],[.06,.09,0]],.012,12,6),t.walnutDark),n.pop(),bl(n,t,9.6,c,l+.2,.6,.3),bl(n,t,9.95,c,l+.15,-.3,.05,.8),n.cyl(t.brass,.009,.011,.02,12,10.2,c+.01,l+.25);for(let g=0;g<3;g++)n.box([t.chalk,t.lining,t.paintTeal][g],.045,.008,.045,10.35+g*.06,c+.004,l+.22,.3+g,0,0);n.cyl(t.bolt.silk,.03,.03,.018,16,10.6,c+.009,l+.25),n.geo(Ki(Array.from({length:30},(g,_)=>{let C=_*.7,D=.012+_*.0018;return[Math.cos(C)*D,0,Math.sin(C)*D]}),.016,()=>new I(0,1,0),120),t.tape,10.85,c+.009,l+.18),n.geo(Ki([[.07,0,0],[.2,0,.05],[.35,0,.02],[.5,0,.1]],.016,(g,_)=>new I(0,1,0).cross(_)),t.tape,10.85,c+.002,l+.18);let f=new ye(.018,.018,.04,12),x=new Ee(f,new hn({roughness:.65})),v=new ye(.022,.022,.006,12),p=new Ee(v,t.walnut),d=["#f4f1ea","#1b1b1b","#0f4d4b","#3f8a7a","#d4a646","#e0745a","#7c1f35","#1a4f73","#5a2d82","#c75b39","#e6c86e","#2e7d4f"];n.box(t.walnut,1.5,.9,.04,11.6,1.9,-5.93);for(let g=0;g<5;g++){n.box(t.walnutDark,1.46,.02,.07,11.6,1.52+g*.17,-5.88);for(let _=0;_<14;_++){let C=10.95+_*.1,D=1.55+g*.17;n.cyl(t.walnutDark,.003,.003,.06,4,C,D+.03,-5.87);let z=de(C,D+.025,-5.87);x.add(z,d[(_*3+g*5)%d.length]),p.add(de(C,D+.003,-5.87)),p.add(de(C,D+.047,-5.87))}}for(let g=0;g<5;g++)x.add(de(11.2+g*.06,c+.02,l+.05,0,0,0),g<3?"#d4a646":"#e0745a");n.cyl(t.brass,.012,.012,3.2,8,8.5,2.98,-5.86,0,0,Math.PI/2);for(let g=0;g<6;g++){let _=7.2+g*.52,C=g%4,D=.46,z=.62+g%2*.12;n.card(t.paper,D,z,_,2.95-z/2,-5.83+g*.004,0,g%2?.05:-.05,(g%3-1)*.03,Cs[C]),n.geo(new te(.018,.003,4,10),t.steel,_,2.97,-5.84)}n.box(t.cork,1.2,.85,.03,7.6,1.55,-5.92),n.box(t.walnutDark,1.26,.9,.02,7.6,1.55,-5.94),n.card(t.sketch,.42,.63,7.42,1.58,-5.9,0,0,.02);for(let g=0;g<6;g++){let _=7.86+g%2*.17,C=1.85-Math.floor(g/2)*.24;n.card(new hn({color:d[g*2+1],roughness:g%2?.4:.9,map:t.tex[["velvet","damask","weave","plaid","velvet","stripe"][g]]}),.14,.18,_,C,-5.902,0,0,(r()-.5)*.15),i.push([de(_,C+.07,-5.88,Math.PI/2,0,0),"#c0392b"])}for(let g=0;g<2;g++){let _=11.9+g*.38,C=l+.1,D=[];for(let z=0;z<=24;z++){let $=z<=12?-1:1,O=z<=12?z/12:(24-z)/12,Q=.06*Math.sin(Math.PI*O)**.8;D.push([_+$*Q,c+.006,C-.25+O*.5])}n.geo(ne(D,.0028,48,4),t.gilt),n.geo(ne([[_,c+.006,C-.25],[_,c+.006,C+.25]],.0035,6,4),t.gilt),g===0&&n.geo(re((z,$)=>{let O=$,Q=.06*Math.sin(Math.PI*O)**.8;return[_+(z*2-1)*Q,c+.004,C-.25+O*.5]},6,10),t.organza)}n.geo(new te(.05,.006,6,24),t.gilt,12.9,c+.006,l+.25,Math.PI/2),n.geo(new te(.045,.006,6,24),t.gilt,12.9,c+.014,l+.25,Math.PI/2),n.push(12.65,c+.01,l+.3,.8),n.box(t.steel,.012,.01,.08,-.008,0,-.04,.08),n.box(t.steel,.012,.01,.08,.008,0,-.04,-.08),n.box(t.upholstery,.016,.016,.1,-.02,0,.05,.15),n.box(t.upholstery,.016,.016,.1,.02,0,.05,-.15),n.pop(),n.cyl(t.sheer,.05,.05,.11,16,12.3,c+.055,l-.25);for(let g=0;g<14;g++)n.sph(g%3?t.gilt:t.cabochonR,.008,12.3+(r()-.5)*.06,c+.01+r()*.04,l-.25+(r()-.5)*.06,1,1,1,6);n.sph(t.velvet,.045,10.55,c+.025,l-.15,1,.55,1,14);for(let g=0;g<14;g++){let _=g*.9,C=.025*(g%3)/2;i.push([de(10.55+Math.cos(_)*C,c+.055,l-.15+Math.sin(_)*C,Math.cos(_)*.4,0,Math.sin(_)*.4),["#c0392b","#f1c40f","#2e86c1","#ecf0f1","#27ae60"][g%5]])}n.card(t.paper,.6,.6,8.9,c+.003,l+.15,-Math.PI/2,.2,0,Cs[0]),n.card(t.paper,.5,.5,12,c+.012,l-.15,-Math.PI/2,-.4,0,Cs[3]),n.cyl(t.porcelain,.07,.07,.008,18,7.35,c+.004,l+.25),n.cyl(t.porcelain,.042,.032,.06,18,7.35,c+.038,l+.25),n.cyl(t.walnutDark,.038,.038,.002,18,7.35,c+.058,l+.25),n.geo(new te(.018,.005,6,12),t.porcelain,7.395,c+.04,l+.25,0,0,0),n.rbox(t.curtain,.24,.025,.32,.006,7.05,c+.013,l-.05,.3),n.card(t.paper,.22,.3,7.05,c+.027,l-.05,-Math.PI/2,.3,0,Cs[2]);{n.push(7.6,0,-2.6,.9);for(let g of[-.28,.28])n.box(t.walnut,.04,1.9,.04,g,.95,0,0,.12,-g*.15);n.box(t.walnut,.04,1.9,.04,0,.92,-.35,0,-.3),n.box(t.walnut,.7,.04,.08,0,.82,.09),n.box(t.gilt,.66,.9,.025,0,1.3,.1,0,.12),n.card(t.sketch,.58,.84,0,1.3,.115,.12,0,0),n.pop(),e.circle(7.6,-2.6,.45)}Gr(n,t,8.6,-5,2.35),Gr(n,t,11.4,-5,2.35);for(let g of[8.4,10.9]){n.cyl(t.oakWorn,.18,.18,.05,20,g,.65,-4.55);for(let _=0;_<3;_++){let C=_*2.094;n.cyl(t.walnutDark,.018,.022,.66,8,g+Math.cos(C)*.12,.32,-4.55+Math.sin(C)*.12,Math.sin(C)*.15,0,-Math.cos(C)*.15)}n.geo(new te(.12,.01,5,20),t.brass,g,.25,-4.55,Math.PI/2),e.circle(g,-4.55,.22)}let b=7.4,y=12.6,S=4.6,L=1.3,T=.9,E=(b+y)/2;n.box(t.oakWorn,y-b,.07,L,E,T-.035,S);for(let g of[b+.1,y-.1])for(let _ of[-.55,.55])n.box(t.walnutDark,.1,T-.07,.1,g,(T-.07)/2,S+_);n.box(t.walnutDark,y-b-.2,.05,.08,E,.25,S);for(let g=0;g<6;g++)n.cyl(g%2?t.velvet:t.shotSilk,.08,.08,1.1,16,b+.6+g*.75,.38,S,Math.PI/2,0,0);e.box(b-.05,y+.05,S-L/2-.05,6),n.box(t.kraft,y-b-.2,.002,L-.1,E,T+.001,S),n.geo(re((g,_)=>[(g-.5)*3.2,.006+.004*Math.sin(g*30)*_,(_-.5)*1.05],30,6),t.velvet,E-.6,T,S),n.geo(re((g,_)=>{let C=(g-.5)*1,D=_*1.3,z,$;if(D<.05)z=.006,$=-D;else{let O=D-.05;z=.006-Math.min(O,.86),$=-.05-.05*Math.sin(Math.min(O,.86)*3)-Math.max(0,O-.86)}return[C+.02*Math.sin(_*9+g*5),z+(D>.9,0),$]},12,20),t.velvet,E-.6,T,S-.52,0,0,0),[[8,4.45,.2,0],[8.8,4.75,-.3,1],[9.5,4.4,1.2,3],[10.2,4.7,.1,2],[11.4,4.5,-.1,0]].forEach(([g,_,C,D])=>{n.card(t.paper,.62,.62,g,T+.016,_,-Math.PI/2,C,0,Cs[D]);for(let z=0;z<4;z++)i.push([de(g+Math.cos(z*1.57+C)*.2,T+.03,_+Math.sin(z*1.57+C)*.2,.2,0,.6),"#f1c40f"])});{let g=[];for(let _=0;_<=16;_++){let C=_/16*Math.PI*2;g.push([10.9+Math.cos(C)*.22,T+.012,4.4+Math.sin(C)*.3*(C>Math.PI?1.2:1)])}n.geo(ne(g,.002,64,3,!0),t.chalk)}for(let g=0;g<5;g++)n.cyl(t.brass,.04,.045,.03,16,8.3+g*.75,T+.03,4.1+g%2*.05),n.sph(t.brass,.015,8.3+g*.75,T+.055,4.1+g%2*.05);n.box(t.steel,.6,.004,.04,11.7,T+.02,4.95,.1),n.box(t.steel,.04,.004,.35,11.42,T+.02,4.8,.1),bl(n,t,10.9,T+.015,4.95,2.4,.4,1.2),n.geo(re((g,_)=>{let C=g*2.4,D=.12+.08*_;return[Math.cos(C)*D*(1+.3*g),0,Math.sin(C)*D]},12,2),t.sheer,9.2,T+.022,4.95),Gr(n,t,8.8,4.6,2.4),Gr(n,t,11.2,4.6,2.4);{n.push(14.9,0,3.6,-Math.PI/2),n.box(t.walnut,1,.04,.5,0,.76,0);for(let C of[-.42,.42])n.box(t.iron,.04,.74,.4,C,.37,0);n.geo(new te(.2,.02,6,24),t.iron,.3,.38,0),n.box(t.iron,.5,.03,.25,0,.08,.05,0,.1),n.rbox(t.blackLacquer,.12,.25,.12,.02,.22,.905,0),n.rbox(t.blackLacquer,.44,.08,.1,.03,.02,1.02,0),n.rbox(t.blackLacquer,.07,.15,.08,.02,-.18,.93,0),n.box(t.gilt,.3,.01,.102,.02,1,0),n.cyl(t.steel,.06,.06,.025,20,.29,.98,0,0,0,Math.PI/2),n.cyl(t.steel,.002,.002,.05,4,-.18,.84,.02),n.cyl(t.bolt.silk,.012,.012,.03,10,.05,1.07,0),n.geo(fn(.3,.3,3,.02,2),t.lining,-.25,.79,.1,-1.2,0,0),n.pop(),e.box(14.9-.35,14.9+.35,3.6-.6,3.6+.6),Vr(n,t,e,14.1,3.6,Math.PI/2+.2,t.velvet)}{n.push(14.6,0,-4.2,-2.3),n.geo(re((C,D)=>{let z=C*Math.PI*2,$=.95+D*.62,O=$,Q=.18-.04*Math.sin((O-.95)/.62*Math.PI*1.2)+(O>1.42?-(O-1.42)*.8:0);return[Math.sin(z)*Math.max(.04,Q)*(1+.35*Math.max(0,Math.min(1,(O-1.25)/.18))),$,Math.cos(z)*Math.max(.04,Q)*.78]},32,16),t.toile),n.cyl(t.walnut,.02,.02,.95,8,0,.475,0);for(let C=0;C<3;C++){let D=C*2.094;n.box(t.walnutDark,.3,.03,.04,Math.cos(D)*.15,.03,Math.sin(D)*.15,-D)}n.geo(fn(.5,.5,5,.03,4,.8),t.toile,0,.98,.15),n.pop(),e.circle(14.6,-4.2,.4)}for(let g=0;g<6;g++){let _=[t.velvet,t.brocade,t.shotSilk,t.lining,t.curtain,t.toile];n.cyl(_[g],.07,.07,1.5,16,4.45+g*.16,.75,-5.6+g%2*.12,.12,0,.08*(g-2))}e.box(4.2,5.4,-6,-5.3);{n.push(5.2,0,4.9,.2),n.rbox(t.toile,1.2,.04,.38,.015,0,.86,0);for(let g of[-1,1])n.box(t.walnutDark,.03,.9,.03,g*.25,.43,0,0,0,g*.4);n.geo(new ye(.06,.08,.08,3),t.iron,.4,.92,0,0,Math.PI/6,0,1.5,1,1),n.pop(),e.box(4.5,5.9,4.6,5.3)}let N=[t.velvet,t.shotSilk,t.brocade,t.lining,t.toile,t.kraft];for(let g=0;g<22;g++){let _=g%2===0,C=_?7.3+r()*5.6:7.6+r()*4.8,D=_?-4.6+r()*.7:3.4+r()*.6,z=.05+r()*.12,$=.05+r()*.2,O=r()*.03,Q=re((X,ot)=>[(X-.5)*z*(1-.4*ot),.004+O*Math.sin(X*Math.PI)*ot,(ot-.5)*$],3,3);if(n.geo(Q,N[g%N.length],C,0,D,0,r()*6,0),g%3===0){let X=r()*6;n.geo(ne([[C,.003,D],[C+Math.cos(X)*.08,.004,D+Math.sin(X)*.05],[C+Math.cos(X+1)*.15,.003,D+Math.sin(X+.6)*.12]],.0012,10,3),g%2?t.gilt:t.thread)}}{n.geo(new ye(.24,.19,.32,20,1,!0),t.cork,13,.16,3.3),n.cyl(t.cork,.19,.19,.02,20,13,.01,3.3),n.geo(new te(.24,.015,6,24),t.cork,13,.32,3.3,Math.PI/2);for(let C=0;C<6;C++)n.geo(fn(.14,.12+r()*.1,2,.02,C),N[C],13+(r()-.5)*.25,.4,3.3+(r()-.5)*.25,.4*(r()-.5),r()*6,0);e.circle(13,3.3,.28)}for(let g of[-2.4,2.4]){n.cyl(t.gilt,.015,.015,.9,8,4.2,3.75,g,Math.PI/2);for(let _ of[-1,1])n.sph(t.gilt,.03,4.2,3.75,g+_*.46);n.geo(re((_,C)=>{let D=C>.85?(1-Math.abs(_-.5)*2)*.15:0;return[.01*Math.sin(_*9),-C*1.6-D,(.5-_)*.76*(1-C*.05)]},8,10),t.damask,4.2,3.72,g),n.geo(ne([[4.21,3.72-1.36,g-.37],[4.21,3.72-1.75,g],[4.21,3.72-1.36,g+.37]],.008,12,4),t.gilt),n.sph(t.gilt,.025,4.21,3.72-1.79,g,1,1.6,1)}x.build(s,!1),p.build(s,!1)}var Cs,Oh=Qe(()=>{Je();Qi();Rs();vl();Cs=[[0,.5,.5,1],[.5,.5,1,1],[0,0,.5,.5],[.5,0,1,.5]]});function ug(n){if(n<=es[0][0])return es[0][1];for(let t=1;t<es.length;t++)if(n<=es[t][0]){let[e,i]=es[t-1],[s,r]=es[t],o=(n-e)/(s-e);return i+(r-i)*(o*o*(3-2*o))}return 0}function ve(n,t,e){let i=.022*Math.exp(-(((t-1.28)/.055)**2))*Math.max(0,Math.cos(n))**2,s=ug(t)+e+i;return[Math.sin(n)*s*fg(t),t,Math.cos(n)*s*dg(t)]}function Ml(n,t,e,i=0,s=11){let r=Sl(t)+e+i*t*Math.sin(n*s+.7);return[Math.sin(n)*r,zh(t),Math.cos(n)*r*.92]}function kh({B:n,M:t,C:e,pins:i}){let a=we(4711);n.cyl(t.walnutDark,1.12,1.15,.22-.03,64,10,(.22-.03)/2,0),n.cyl(t.baize,1.1,1.1,.03,64,10,.22-.015,0),n.geo(new te(1.115,.014,6,96),t.brass,10,.22,0,Math.PI/2);for(let c=0;c<24;c++){let f=c/24*Math.PI*2;n.sph(t.brass,.012,10+Math.cos(f)*1.14,.22*.5,0+Math.sin(f)*1.14)}e.circle(10,0,1.18),e.box(10+.9,10+2.45,-1.25,1.25),e.box(10+1.6,10+2.2,-1.65,1.65),n.push(10,.22,0,-Math.PI/2),n.geo(re((c,f)=>ve(c*Math.PI*2,.9+f*.8,0),40,30),t.formLinen),n.cyl(t.walnut,.03,.045,.06,12,0,1.72,0),n.sph(t.brass,.022,0,1.76,0),n.cyl(t.steel,.006,.006,.42,6,0,1.6,-.21,.5,0,0),n.geo(new te(.02,.006,6,12),t.steel,0,1.63,-.13);let l=c=>1.44-.035*Math.max(0,Math.cos(c))**4+.03*Math.max(0,-Math.cos(c));n.geo(re((c,f)=>{let x=c*Math.PI*2,v=1+f*(l(x)-1);return ve(x,v,.006)},48,18),t.toile);for(let c=0;c<5;c++){let f=-1.5-c*.27,x=[];for(let v=0;v<=6;v++){let p=1.02+v*.065,d=ve(f,p,.011);x.push(d)}n.geo(ne(x,.0035,12,4),t.thread)}[[-.42,.42],[.45,1.2],[-1.2,-.45],[1.23,2.05],[2.08,2.86]].forEach(([c,f],x)=>{n.geo(re((v,p)=>{let d=c+v*(f-c),b=1+p*(l(d)-1);return ve(d,b,.016+.002*(x%2))},12,18),t.velvet);for(let v of[c,f]){let p=[];for(let d=0;d<=10;d++){let b=1+d/10*(l(v)-1);p.push(ve(v,b,.02))}n.geo(ne(p,.0028,20,4),t.gilt)}});{let c=[[-.3,1.08],[-.12,1.16],[.05,1.11],[.22,1.2],[.1,1.3],[-.08,1.34],[-.25,1.25],[.3,1.33]],f=[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,1],[4,7]];for(let[x,v]of f){let p=[];for(let d=0;d<=6;d++){let b=d/6;p.push(ve(c[x][0]+(c[v][0]-c[x][0])*b,c[x][1]+(c[v][1]-c[x][1])*b,.021))}n.geo(ne(p,.0018,12,3),t.gilt);for(let d=1;d<6;d+=2){let b=p[d];n.sph(t.gilt,.0032,b[0],b[1],b[2],1,1,1,6)}}c.forEach(([x,v],p)=>{let d=ve(x,v,.024);n.sph(p%3===0?t.cabochonR:t.gilt,p%3===0?.008:.006,d[0],d[1],d[2],1,1,.7,10)});for(let[x,v]of f.slice(0,5)){let p=[];for(let d=0;d<=6;d++){let b=d/6;p.push(ve(.55+(c[x][0]+.3+(c[v][0]-c[x][0])*b)*.9,c[x][1]+(c[v][1]-c[x][1])*b,.021))}for(let d=0;d<6;d+=1){let b=p[d],y=p[d+1];n.box(t.chalk,.0025,.0025,.0025,(b[0]*2+y[0])/3,(b[1]*2+y[1])/3,(b[2]*2+y[2])/3),n.box(t.chalk,.0025,.0025,.0025,(b[0]+y[0]*2)/3,(b[1]+y[1]*2)/3,(b[2]+y[2]*2)/3)}}}for(let[c,f]of[[2.86,2.98],[-1.2,-1.32]])n.geo(re((x,v)=>{let p=c+x*(f-c),d=1+v*(l(p)-1);return ve(p,d,.024+.012*x)},4,14),t.lining);for(let c=0;c<14;c++){let f=1.02+c*.03,x=ve(-1.25,f,.02);n.box(t.thread,.003,.016,.003,x[0],x[1],x[2])}for(let c=0;c<9;c++){let f=1.04+c*.042;for(let x of[2.97,-2.97]){let v=ve(x,f,.024);n.geo(new te(.006,.0022,5,10),t.brass,v[0],v[1],v[2],0,x,0)}}{let c=[];for(let f=0;f<7;f++){let x=1.38-f*.042,v=ve(f%2?2.97:-2.97,x,.028);c.push(v)}c.push([.02,.98,-.2],[.05,.75,-.24],[.03,.5,-.32]),n.geo(Ki(c,.008,(f,x)=>{let v=new I(0,0,1).cross(x);return v.lengthSq()>1e-4?v:new I(1,0,0)},60),t.lining)}{let c=[];for(let f=0;f<=40;f++){let x=-1.2+f/40*4.06;c.push(ve(x,l(x),.022))}n.geo(ne(c,.006,80,5),t.gilt)}for(let c=0;c<7;c++){let f=-.9+c*.3,x=ve(f,l(f)-.02,.03);n.sph(c%2?t.cabochonG:t.cabochonR,.011,x[0],x[1],x[2],1,1,.6,10)}{let c=[];for(let f=0;f<=48;f++){let x=f/48*Math.PI*2;c.push(ve(x,1,.024))}n.geo(ne(c,.012,96,6,!0),t.brocade)}n.geo(re((c,f)=>Ml(c*Math.PI*2,.1+f*.89,0,.03),72,24),t.underSilk),n.geo(re((c,f)=>{let x=Ml(c*Math.PI*2,.99,-.002,.03),v=Math.hypot(x[0],x[2]/.92),p=1+.02*f;return[x[0]*p,.05-f*.05,x[2]*p]},72,1),t.fringe);for(let c=0;c<40;c++){let f=c/40*Math.PI*2,x=Ml(f,.95,.03,.03);i.push([new Vt().multiplyMatrices(n.top,de(x[0],x[1],x[2],.9*Math.cos(f),0,-.9*Math.sin(f))),["#c0392b","#f1c40f","#ecf0f1"][c%3]])}let h=[{t0:0,len:.36,n:12,off:.06,mat:t.velvet,curl:.03},{t0:.3,len:.36,n:14,off:.045,mat:t.shotSilk,curl:.035},{t0:.6,len:.34,n:16,off:.03,mat:t.brocade,curl:.04}],m=[];h.forEach((c,f)=>{for(let x=0;x<c.n;x++){let v=(x+f%2*.5)/c.n*Math.PI*2,p=Math.cos(v-2.4);if(f>0&&p>(f===1?.75:.45)){m.push(f);continue}let d=f>0&&p>(f===1?.45:.1),b=Math.PI*2/c.n*1.25,y=T=>(T<.55?1:Math.cos((T-.55)/.45*Math.PI/2)**.9)*(.75+.25*xn(0,.25,T)),S=(T,E,A=0)=>{let N=v+T*b/2*y(E),g=c.t0+E*c.len,_=(Sl(g)+c.off+c.curl*E*E+.012*(1-T*T)+.007*T+A)*(f===0?.72+.28*xn(0,.25,E):1);return[Math.sin(N)*_,zh(g)-.01*E*E,Math.cos(N)*_*.92]};n.geo(re((T,E)=>S(T*2-1,E),6,10),c.mat);let L=[];for(let T=0;T<=10;T++)L.push(S(-1,T/10,.002));for(let T=10;T>=0;T--)L.push(S(1,T/10,.002));if(!d)n.geo(ne(L,.0032,40,4),f===2?t.velvet:t.gilt);else{for(let T=1;T<12;T++){let E=S(-.85+T*.14,.06,.004);n.box(t.thread,.012,.0025,.0025,E[0],E[1],E[2],v)}for(let T=0;T<3;T++){let E=S(-.6+T*.6,.12,.004);i.push([new Vt().multiplyMatrices(n.top,de(E[0],E[1],E[2],1.2*Math.cos(v),0,-1.2*Math.sin(v))),"#f1c40f"])}}if(!d){let T=S(0,1,.006);n.sph(t.gilt,.008,T[0],T[1],T[2])}}});{let c=ve(Math.PI/2,1.43,.02),f=new I(c[0]+.03,c[1],c[2]),v=new I(c[0]+.14,.86,.04).clone().sub(f).normalize(),p=new De().setFromUnitVectors(new I(0,-1,0),v),d=new Se().setFromQuaternion(p,"YXZ"),b=f.clone().addScaledVector(v,.13);n.push(b.x,b.y,b.z,d.y,d.x,d.z),n.sph(t.lining,.1,0,0,0,1,1.25,.95,16);for(let y=0;y<8;y++){let S=y/8*Math.PI*2;n.geo(re((L,T)=>{let E=S+(L-.5)*.45,A=.13-T*.26,N=.1*Math.sqrt(Math.max(0,1-(A/.135)**2))*1.06+.005;return[Math.sin(E)*N,A,Math.cos(E)*N*.95]},4,10),t.velvet)}n.geo(new te(.075,.01,6,24),t.gilt,0,-.13,0,Math.PI/2),n.cyl(t.velvet,.065,.045,.36,18,0,-.32,0),n.cyl(t.brocade,.05,.05,.05,18,0,-.51,0),n.geo(re((y,S)=>{let L=y*Math.PI*1.6-.4,T=.052+.03*S;return[Math.sin(L)*T,-.53-S*.05,Math.cos(L)*T]},16,2),t.fringe),n.pop();for(let y=0;y<5;y++){let S=ve(Math.PI/2-.25+y*.12,1.42,.03);i.push([new Vt().multiplyMatrices(n.top,de(S[0],S[1],S[2],0,0,1.2)),"#c0392b"])}}{let c=[];for(let f=0;f<=16;f++){let x=f/16*Math.PI*2;c.push([-.205-.01*Math.cos(x),1.33+.08*Math.sin(x),.07*Math.cos(x)])}n.geo(ne(c,.004,32,4,!0),t.thread)}for(let c=0;c<13;c++){let f=-1.3+c*.21666666666666667,x=.62-Math.abs(c-6)*.045,v=.07+.01*(c%2),p=new I(...ve(Math.PI+f*.75,1.45,.03)),d=new I(Math.sin(f)*.9,Math.cos(f)*1+.15,-.38).normalize(),b=new I().crossVectors(d,new I(0,0,1)).normalize(),y=new I().crossVectors(b,d).normalize(),S=(A,N)=>{let g=v*Math.sin(Math.PI*Math.min(1,N*1.05))**.8*(N<.15?.6+N*2.6:1),_=.12*N*N;return p.clone().addScaledVector(d,N*x).addScaledVector(b,A*g).addScaledVector(y,-_+.01*A*A)},L=[];for(let A=0;A<=12;A++)L.push(S(-1,A/12));for(let A=12;A>=0;A--)L.push(S(1,A/12));if(n.geo(ne(L,.0035,48,4),t.gilt),n.geo(ne([S(0,0),S(0,.5),S(0,1)],.0045,16,5),t.gilt),c%4!==2&&c!==11){n.geo(re((A,N)=>S(A*2-1,N).toArray(),6,12),t.organza);for(let A=1;A<6;A++){let N=S(0,A/6);n.sph(t.gilt,.006,N.x,N.y,N.z,1,1,1,6)}for(let A=1;A<5;A++)n.geo(ne([S(0,A/5),S(-.7,A/5+.08),S(-1,A/5+.12)],.0015,6,3),t.gilt),n.geo(ne([S(0,A/5),S(.7,A/5+.08),S(1,A/5+.12)],.0015,6,3),t.gilt)}else{let A=S(.6,.7);n.geo(ne([A,A.clone().add(new I(.01,-.08,-.02)),A.clone().add(new I(-.01,-.15,0))],.0012,8,3),t.thread)}let E=S(0,1);n.sph(c%2?t.cabochonG:t.cabochonR,.013,E.x,E.y,E.z)}{let c=[];for(let f=0;f<=24;f++){let x=-1.45+f/24*2.9;c.push(ve(Math.PI+x*.75,1.45+.015*Math.cos(x*4),.034))}n.geo(ne(c,.012,48,6),t.gilt)}{let c=Math.PI-.75,f=Math.PI+.75,x=(d,b)=>{let y=c+d*(f-c),T=Sl(.96)-.04+b*1.62,E=1.08-.22*0,A=.024-(.22+.002)*xn(E-.02,E+.24,T);A+=.013*Math.sin(y*14+b*4)*xn(0,.3,b)*(1-xn(E-.1,E+.1,T)*.5);let N=T+.03*xn(E-.05,E+.2,T),g=.92+.08*xn(0,.3,b);return[Math.sin(y)*N*g,A+(1-xn(0,.08,b))*.03,Math.cos(y)*N*g]};n.geo(re(x,48,30),t.train);let v=[];for(let d=0;d<=24;d++)v.push(x(d/48,1));n.geo(ne(v.map(d=>[d[0],d[1]+.006,d[2]]),.006,48,5),t.gilt),n.geo(re((d,b)=>{let y=x(.5+d*.5,1),S=1+b*.025;return[y[0]*S,y[1]+.004,y[2]*S]},24,1),t.fringe);let p=x(.52,.72);n.geo(new te(.16,.012,6,40),t.walnut,p[0],p[1]+.012,p[2],Math.PI/2),n.geo(new te(.175,.01,6,40),t.walnut,p[0],p[1]+.014,p[2],Math.PI/2),n.box(t.brass,.03,.02,.02,p[0]+.18,p[1]+.015,p[2]),n.cyl(t.steel,.0012,.0012,.05,4,p[0]+.05,p[1]+.03,p[2]+.04,.6,0,.4),n.geo(ne([[p[0]+.05,p[1]+.05,p[2]+.05],[p[0]+.15,p[1]+.09,p[2]+.2],[p[0]+.3,p[1]+.01,p[2]+.35]],.0015,16,3),t.gilt),n.cyl(t.gilt,.025,.025,.045,14,p[0]+.32,p[1]+.025,p[2]+.36),n.cyl(t.walnut,.03,.03,.006,14,p[0]+.32,p[1]+.003,p[2]+.36),n.cyl(t.walnut,.03,.03,.006,14,p[0]+.32,p[1]+.048,p[2]+.36)}for(let c=0;c<4;c++){let f=.9+c*.32,x=.92,v=re((p,d)=>{let b=p*2-1,y=.09*(d<.55?1:Math.cos((d-.55)/.45*Math.PI/2));return[b*y,.004+.01*Math.sin(d*3)*(1-b*b),d*.3]},6,8);n.geo(v,c%2?t.shotSilk:t.brocade,Math.sin(f)*x,.005,Math.cos(f)*x,0,f+2.6,0),i.push([new Vt().multiplyMatrices(n.top,de(Math.sin(f)*x,.03,Math.cos(f)*x,.4,0,.3)),"#2e86c1"])}{let c=[[.12,.98,.245],[.16,1.25,.2],[.19,1.44,.08],[.1,1.53,-.05],[-.1,1.53,-.05],[-.19,1.44,.08],[-.17,1.22,.21],[-.15,1,.25]];n.geo(Ki(c,.016,(f,x)=>new I(f.x,0,f.z).normalize().cross(x),80),t.tape),n.box(t.brass,.018,.01,.003,-.15,1,.252)}n.pop()}var xn,es,fg,dg,zh,Sl,Bh=Qe(()=>{Je();Qi();Rs();xn=(n,t,e)=>{let i=Math.max(0,Math.min(1,(e-n)/(t-n)));return i*i*(3-2*i)},es=[[.9,.19],[.98,.165],[1.05,.138],[1.12,.145],[1.2,.165],[1.28,.19],[1.36,.18],[1.43,.165],[1.48,.135],[1.52,.085],[1.55,.06],[1.66,.055],[1.69,.035],[1.7,0]];fg=n=>1+.42*xn(1.26,1.45,n)*(1-xn(1.5,1.56,n)),dg=n=>.78;zh=n=>1.05*(1-n),Sl=n=>.15+.6*Math.pow(n,.72)+.05*n*n});function Hh(n){let t=Ih(),e=new Br,i={boxes:[],circles:[]},s={box(E,A,N,g){i.boxes.push([Math.min(E,A),Math.max(E,A),Math.min(N,g),Math.max(N,g)])},boxC(E,A,N,g){this.box(E-N/2,E+N/2,A-g/2,A+g/2)},circle(E,A,N){i.circles.push([E,A,N])}},r=[];function o(E,A,N,g,_,C,D,z){let O=[],Q=N,X=(D||[]).slice().sort((et,it)=>et[0]-it[0]);for(let[et,it,Et]of X)et>Q&&O.push([Q,et,0,ge]),O.push([et,it,Et,ge]),Q=it;Q<g&&O.push([Q,g,0,ge]);let ot=A+_*.12/2;for(let[et,it,Et,Nt]of O){let V=it-et,U=(et+it)/2,Y=Nt-Et;if(E==="x"?e.box(C,V,Y,.12,U,Et+Y/2,ot):e.box(C,.12,Y,V,ot,Et+Y/2,U),Et===0){E==="x"?s.box(et,it,A-.15,A+.15):s.box(A-.15,A+.15,et,it);let st=ot+_*(.12/2+.012),tt=ot+_*(.12/2+.03),mt=z.wainscot;if(mt){E==="x"?(e.box(mt,V,1.05,.025,U,.525,st),e.box(t.walnutDark,V,.16,.04,U,.08,tt),e.box(mt,V,.06,.05,U,1.06,tt)):(e.box(mt,.025,1.05,V,st,.525,U),e.box(t.walnutDark,.04,.16,V,tt,.08,U),e.box(mt,.05,.06,V,tt,1.06,U));let Lt=Math.max(1,Math.round(V/.95));for(let gt=0;gt<=Lt;gt++){let P=et+gt/Lt*V;E==="x"?e.box(t.walnutDark,.07,.86,.03,Math.min(it-.04,Math.max(et+.04,P)),.6,tt):e.box(t.walnutDark,.03,.86,.07,tt,.6,Math.min(it-.04,Math.max(et+.04,P)))}}}let q=z.crown;E==="x"?e.box(q,V,.14,.08,U,ge-.07,ot+_*.1):e.box(q,.08,.14,V,ot+_*.1,ge-.07,U)}for(let[et,it,Et]of X){let Nt=A+_*.13;for(let V of[et,it])E==="x"?e.box(t.walnutDark,.12,Et,.05,V+(V===et?-.06:.06),Et/2,Nt):e.box(t.walnutDark,.05,Et,.12,Nt,Et/2,V+(V===et?-.06:.06));E==="x"?e.box(z.crown,it-et+.36,.16,.07,(et+it)/2,Et+.08,Nt):e.box(z.crown,.07,.16,it-et+.36,Nt,Et+.08,(et+it)/2)}}function a(E,A,N,g,_){let C={wainscot:_.wainscot,crown:_.crown},D=new tn(A-E,g-N),z=D.attributes.uv;for(let O=0;O<z.count;O++)z.setXY(O,z.getX(O)*(A-E)/_.floorTile,z.getY(O)*(g-N)/_.floorTile);e.geo(D,_.floor,(E+A)/2,0,(N+g)/2,-Math.PI/2);let $=new tn(A-E,g-N);e.geo($,t.ceiling,(E+A)/2,ge,(N+g)/2,Math.PI/2),o("x",N,E,A,1,_.wall,_.N,C),o("x",g,E,A,-1,_.wall,_.S,C),o("z",E,N,g,1,_.wall,_.W,C),o("z",A,N,g,-1,_.wall,_.E,C)}let l=[-1.4,1.4,3];a(-16,-8,-5,5,{floor:t.parquet,floorTile:2.2,wall:t.damask,wainscot:t.walnut,crown:t.gilt,E:[l],S:[[-12.8,-11.2,2.9]]}),a(-8,4,-3.5,3.5,{floor:t.archiveFloor,floorTile:3,wall:t.paintTeal,wainscot:t.walnut,crown:t.walnutDark,W:[l],E:[l]}),a(4,16,-6,6,{floor:t.workFloor,floorTile:3.2,wall:t.plaster,wainscot:t.oakWorn,crown:t.walnutDark,W:[l]});{e.box(t.walnutDark,.78,2.84,.06,-12.4,1.43,4.9+.02);for(let[A,N]of[[-12.4,.75],[-12.4,2]])e.box(t.walnut,.56,.9,.02,A,N,4.9-.02);e.geo(new fe(.78,2.84,.06),t.walnutDark,-11.2-.39*Math.cos(.5),1.43,4.9-.39*Math.sin(.5),0,-.5),e.sph(t.brass,.035,-12.08,1.05,4.9-.06),e.box(t.glassWin,6,4.2,.02,-12,2.1,5.6),s.box(-12.8,-11.2,4.6,5.2),s.box(-11.95,-11.2,4.45,4.9)}function u(E,A,N,g,_,C,D){let z=A+g*.125,$=(O,Q,X,ot,et,it,Et,Nt)=>E==="z"?e.box(O,Et,it,et,ot,Nt,Q):e.box(O,et,it,Et,Q,Nt,ot);$(t.glassWin,N,0,z,_,D,.02,C+D/2),$(t.walnutDark,N-_/2-.05,0,z+g*.03,.1,D+.1,.08,C+D/2),$(t.walnutDark,N+_/2+.05,0,z+g*.03,.1,D+.1,.08,C+D/2),$(t.walnutDark,N,0,z+g*.03,_+.2,.1,.08,C+D+.05),$(t.walnutDark,N,0,z+g*.08,_+.3,.06,.24,C-.03),$(t.walnutDark,N,0,z+g*.02,.04,D,.04,C+D/2);for(let O=1;O<5;O++)$(t.walnutDark,N,0,z+g*.02,_,.035,.04,C+D*O/5)}u("z",-16,-2.6,1,1.3,1,2.6),u("z",-16,2.6,1,1.3,1,2.6);for(let E of[-3.8,0,3.8])u("z",16,E,-1,1.4,1,2.7);function h(E,A,N,g){e.box(t.skylight,N,.02,g,E,ge-.01,A),e.box(t.walnutDark,N+.16,.12,.08,E,ge-.06,A-g/2-.04),e.box(t.walnutDark,N+.16,.12,.08,E,ge-.06,A+g/2+.04),e.box(t.walnutDark,.08,.12,g,E-N/2-.04,ge-.06,A),e.box(t.walnutDark,.08,.12,g,E+N/2+.04,ge-.06,A);for(let _=1;_<3;_++)e.box(t.walnutDark,.04,.06,g,E-N/2+N*_/3,ge-.04,A)}let m=(()=>{let E=document.createElement("canvas");E.width=4,E.height=128;let A=E.getContext("2d"),N=A.createLinearGradient(0,0,0,128);return N.addColorStop(0,"#fff"),N.addColorStop(.55,"#555"),N.addColorStop(1,"#000"),A.fillStyle=N,A.fillRect(0,0,4,128),new Gi(E)})(),c=new Gn({color:12571903,alphaMap:m,transparent:!0,opacity:.07,depthWrite:!1,blending:hr,side:Kt});c.userData.noCast=!0,c.userData.noReceive=!0;let f=(E,A,N,g)=>{let _=new ye(Math.SQRT1_2,Math.SQRT1_2,1,4,1,!0);_.rotateY(Math.PI/4),_.scale(N,ge-.05,g),_.translate(0,(ge-.05)/2,0);let C=_.attributes.position;for(let D=0;D<C.count;D++)C.setZ(D,C.getZ(D)-(ge-C.getY(D))*.375);e.geo(_,c,E,0,A)};for(let E of[-5.5,-2,1.5])f(E,0,2.1,1.5);f(8,0,2.5,2.1),f(12.6,0,2.5,2.1);for(let E of[-5.5,-2,1.5])h(E,0,2.2,1.6);h(8,0,2.6,2.2),h(12.6,0,2.6,2.2);let x=t.oakWorn.clone();x.userData.noCast=!0;let v=t.iron.clone();v.userData.noCast=!0;for(let E of[5.6,10.3,14.9]){e.box(x,.22,.28,12,E,ge-.14,0);for(let A of[-4,0,4])e.box(v,.24,.3,.05,E,ge-.15,A)}e.box(t.brass,.3,.012,2.8,-8,.006,0),e.box(t.brass,.3,.012,2.8,4,.006,0);let p={B:e,M:t,C:s,pins:r,H:ge,scene:n};Dh(p),Uh(p),Fh(p),kh(p);{let E=new Xi(.0045,8,6),A=new ye(7e-4,7e-4,.032,4);A.translate(0,-.016,0);let N=new oi(E,t.pinHead,r.length),g=new oi(A,t.steel,r.length),_=new Pt;r.forEach(([C,D],z)=>{N.setMatrixAt(z,C),g.setMatrixAt(z,C),N.setColorAt(z,_.set(D))});for(let C of[N,g])C.instanceMatrix.needsUpdate=!0,C.computeBoundingSphere(),n.add(C);N.instanceColor&&(N.instanceColor.needsUpdate=!0)}let d=e.flush(n);n.add(new Dr(14542847,6968384,1.5));let b=new Ss(15003135,2.4);b.position.set(0,16,6),b.target.position.set(0,0,0),b.castShadow=!0,b.shadow.mapSize.set(4096,2048),Object.assign(b.shadow.camera,{left:-17,right:17,top:8.5,bottom:-8.5,near:4,far:34}),b.shadow.camera.updateProjectionMatrix(),b.shadow.bias=-4e-4,b.shadow.normalBias=.02,n.add(b,b.target);let y=new Ss(13622527,.85);y.position.set(4,7,-8),n.add(y);let S=new Ms(16759666,55,0,.55,.65,2);S.position.set(8,3.72,1.8),S.target.position.set(10,1,0),S.castShadow=!0,S.shadow.mapSize.set(1024,1024),S.shadow.bias=-6e-4,S.shadow.normalBias=.01,n.add(S,S.target);let L=(E,A)=>{let N=A.clone().sub(E).normalize(),g=new De().setFromUnitVectors(new I(0,-1,0),N),_=new Se().setFromQuaternion(g,"YXZ");e.push(E.x,E.y,E.z,_.y,_.x,_.z),e.cyl(t.brass,.07,.11,.22,16,0,.1,0),e.cyl(t.bulb,.095,.095,.01,16,0,-.012,0),e.sph(t.iron,.05,0,.24,0),e.pop(),e.cyl(t.iron,.008,.008,ge-E.y,6,E.x,(ge+E.y)/2+.06,E.z)};L(new I(8,3.8,1.8),new I(10,1,0)),L(new I(12.4,3.75,-1.6),new I(10,.9,0));let T=new Ms(16761477,30,0,.6,.7,2);T.position.set(12.4,3.67,-1.6),T.target.position.set(10,.9,0),n.add(T,T.target);for(let[E,A,N,g,_]of[[8.6,2.35,-5,6,5],[11.4,2.35,-5,6,5],[10,2.4,4.2,5,5],[-12,3.1,-1.2,14,9]]){let C=new Zi(g>10?16769720:16757866,g,_,2);C.position.set(E,A,N),n.add(C)}return{colliders:i,meshes:d,M:t}}var ge,Vh=Qe(()=>{Je();Qi();Lh();vl();Nh();Oh();Bh();ge=4.2});var Mg=eu(()=>{Je();lh();Vh();var Gh=document.getElementById("status"),pg=n=>{Gh&&(Gh.textContent=n)},be=new Ar({antialias:!0,powerPreference:"high-performance"}),Wr=[1,.75,1.5],Ps=0,qh=Math.min(window.devicePixelRatio||1,1.5);be.setPixelRatio(qh*Wr[Ps]);be.setSize(window.innerWidth,window.innerHeight);be.outputColorSpace=Ge;be.toneMapping=rl;be.toneMappingExposure=1.05;be.shadowMap.enabled=!0;be.shadowMap.type=sl;be.shadowMap.autoUpdate=!1;document.body.appendChild(be.domElement);var is=new Vi;is.background=new Pt(1709586);var fi=new Re(70,window.innerWidth/window.innerHeight,.05,60);fi.rotation.order="YXZ";var mg=new Hi(be),Yh=mg.fromScene(new zr,.04).texture;is.environment=Yh;is.environmentIntensity=.42;var{colliders:Wh,M:hi}=Hh(is);for(let[n,t]of[[hi.mirror,1.5],[hi.gilt,1],[hi.brass,.85],[hi.steel,1],[hi.cabochonR,.9],[hi.cabochonG,.9],[hi.porcelain,.7]])n.envMap=Yh,n.envMapIntensity=t,n.needsUpdate=!0;be.shadowMap.needsUpdate=!0;var ke=new Set,yt={x:-12,z:3.9,y:0,yaw:0,pitch:-.08,vx:0,vz:0,crouch:!1,eye:1.62},gg=[["Entrance",-12,3.9,-12,1.4,-1.2],["Fitting dais",-9.9,1,-12,1,-1.4],["Archive \xB7 shelves",-7,-1.5,2,1.6,-2.6],["Archive \xB7 samples",-.5,1.6,-3,1,2.8],["Outfit \xB7 front",7.3,.4,10,1.25,0],["Outfit \xB7 side-back",12.3,-2.6,10,1.25,0],["Outfit \xB7 train",13.4,2.4,10.5,.9,0],["Workbench",10.2,-3.5,10.2,.85,-5.6],["Return view",5,.2,-12,1.4,0]];function wl(n){let t=gg[n];yt.x=t[1],yt.z=t[2],yt.vx=yt.vz=0;let e=t[3]-t[1],i=t[5]-t[2],s=t[4]-(Tl(yt.x,yt.z)+yt.eye);yt.yaw=Math.atan2(-e,-i),yt.pitch=Math.atan2(s,Math.hypot(e,i)),yt.y=Tl(yt.x,yt.z),Jh(t[0])}function Tl(n,t){let e=Math.hypot(n+12,t+1.2);return e<1.32?.2:e<1.62?.1:0}var ui=.3;function xg(){for(let n=0;n<3;n++){for(let[t,e,i,s]of Wh.boxes){let r=Math.max(t,Math.min(yt.x,e)),o=Math.max(i,Math.min(yt.z,s)),a=yt.x-r,l=yt.z-o,u=a*a+l*l;if(u<ui*ui)if(u>1e-8){let h=Math.sqrt(u);yt.x=r+a/h*ui,yt.z=o+l/h*ui}else{let h=[[yt.x-t,-1,0],[e-yt.x,1,0],[yt.z-i,0,-1],[s-yt.z,0,1]].sort((m,c)=>m[0]-c[0])[0];yt.x+=h[1]*(h[0]+ui),yt.z+=h[2]*(h[0]+ui)}}for(let[t,e,i]of Wh.circles){let s=yt.x-t,r=yt.z-e,o=Math.hypot(s,r),a=i+ui;o<a&&o>1e-6&&(yt.x=t+s/o*a,yt.z=e+r/o*a)}}}var Al=document.getElementById("overlay"),_g=document.getElementById("hud"),yg=document.getElementById("room"),Zh=document.getElementById("perf"),qr=!1,Rl=!1,Xr=!1,Cl=be.domElement,$h=()=>{try{let n=Cl.requestPointerLock?.();n&&n.catch&&n.catch(()=>{})}catch{}};Al.addEventListener("click",()=>{$h(),Al.classList.add("hidden")});document.addEventListener("pointerlockchange",()=>{qr=document.pointerLockElement===Cl,qr||Al.classList.remove("hidden")});Cl.addEventListener("mousedown",()=>{qr||($h(),Rl=!0)});window.addEventListener("mouseup",()=>Rl=!1);window.addEventListener("mousemove",n=>{!qr&&!Rl||(yt.yaw-=n.movementX*.0022,yt.pitch-=n.movementY*.0022,yt.pitch=Math.max(-1.45,Math.min(1.45,yt.pitch)))});window.addEventListener("keydown",n=>{ke.add(n.code),n.code==="KeyR"&&wl(0),/^Digit[1-9]$/.test(n.code)&&wl(+n.code.slice(5)-1),n.code==="KeyC"&&(yt.crouch=!yt.crouch),n.code==="KeyH"&&_g.classList.toggle("hidden"),n.code==="KeyF"&&(Xr=!Xr,Zh.style.display=Xr?"block":"none"),n.code==="KeyG"&&(Ps=(Ps+1)%Wr.length,be.setPixelRatio(qh*Wr[Ps]),be.setSize(window.innerWidth,window.innerHeight),Jh("Render scale "+Wr[Ps]+"\xD7")),["Space","ArrowUp","ArrowDown"].includes(n.code)&&n.preventDefault()});window.addEventListener("keyup",n=>ke.delete(n.code));window.addEventListener("blur",()=>ke.clear());window.addEventListener("resize",()=>{fi.aspect=window.innerWidth/window.innerHeight,fi.updateProjectionMatrix(),be.setSize(window.innerWidth,window.innerHeight)});var Xh="",Is=0,Yr=document.getElementById("flash");function Jh(n){Yr.textContent=n,Yr.style.opacity=1,Is=1.6}var vg=new Ur,ns=[],El=0;function bg(){let n=vg.getDelta(),t=Math.min(n,.05),e=(ke.has("KeyW")||ke.has("ArrowUp")?1:0)-(ke.has("KeyS")||ke.has("ArrowDown")?1:0),i=(ke.has("KeyD")||ke.has("ArrowRight")?1:0)-(ke.has("KeyA")||ke.has("ArrowLeft")?1:0);ke.has("KeyQ")&&(yt.yaw+=1.8*t),ke.has("KeyE")&&(yt.yaw-=1.8*t);let s=(ke.has("ShiftLeft")||ke.has("ShiftRight")?3.6:1.9)*(yt.crouch?.6:1),r=Math.hypot(e,i)||1,o=Math.sin(yt.yaw),a=Math.cos(yt.yaw),l=(-o*e+a*i)/r*s,u=(-a*e-o*i)/r*s,h=1-Math.exp(-14*t);yt.vx+=(l-yt.vx)*h,yt.vz+=(u-yt.vz)*h;let m=2;for(let v=0;v<m;v++)yt.x+=yt.vx*t/m,yt.z+=yt.vz*t/m,xg();let c=Tl(yt.x,yt.z);yt.y+=(c-yt.y)*(1-Math.exp(-12*t));let f=yt.crouch?1.12:1.62;yt.eye+=(f-yt.eye)*(1-Math.exp(-10*t)),fi.position.set(yt.x,yt.y+yt.eye,yt.z),fi.rotation.set(yt.pitch,yt.yaw,0);let x=yt.x<-8?"Fitting Salon":yt.x<4?"Fabric Archive":"Workshop \xB7 Commission No. 47";if(x!==Xh&&(yg.textContent=x,Xh=x),Is>0&&(Is-=t,Is<=0&&(Yr.style.opacity=0)),be.render(is,fi),ns.push(n*1e3),ns.length>120&&ns.shift(),El+=t,Xr&&El>.25){El=0;let v=ns.reduce((b,y)=>b+y,0)/ns.length,p=Math.max(...ns),d=be.info.render;Zh.textContent=`${v.toFixed(1)} ms avg \xB7 ${(1e3/v).toFixed(0)} fps \xB7 worst ${p.toFixed(1)} ms
${d.calls} draws \xB7 ${(d.triangles/1e3).toFixed(0)}k tris`}}wl(0);Is=0;Yr.style.opacity=0;be.compile(is,fi);pg("Ready \u2014 click to enter");document.getElementById("enter").disabled=!1;be.setAnimationLoop(bg)});Mg();})();
/*! Bundled license information:

three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2024 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/

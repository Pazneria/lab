(()=>{var ln=(n,t,e)=>()=>{if(e)throw e[0];try{return n&&(t=n(n=0)),t}catch(i){throw e=[i],i}};var Yf=(n,t)=>()=>{try{return t||n((t={exports:{}}).exports,t),t.exports}catch(e){throw t=0,e}};function Zf(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function $f(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function $s(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function gu(){let n=$s("canvas");return n.style.display="block",n}function cc(...n){let t="THREE."+n.shift();ls?ls("log",t,...n):console.log(t,...n)}function xu(n){let t=n[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=n[1];e&&e.isStackTrace?n[0]+=" "+e.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Ft(...n){n=xu(n);let t="THREE."+n.shift();if(ls)ls("warn",t,...n);else{let e=n[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...n)}}function Ot(...n){n=xu(n);let t="THREE."+n.shift();if(ls)ls("error",t,...n);else{let e=n[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...n)}}function Ri(...n){let t=n.join(" ");t in oh||(oh[t]=!0,Ft(...n))}function _u(n,t,e){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}function Ms(){let n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Oe[n&255]+Oe[n>>8&255]+Oe[n>>16&255]+Oe[n>>24&255]+"-"+Oe[t&255]+Oe[t>>8&255]+"-"+Oe[t>>16&15|64]+Oe[t>>24&255]+"-"+Oe[e&63|128]+Oe[e>>8&255]+"-"+Oe[e>>16&255]+Oe[e>>24&255]+Oe[i&255]+Oe[i>>8&255]+Oe[i>>16&255]+Oe[i>>24&255]).toLowerCase()}function Jt(n,t,e){return Math.max(t,Math.min(e,n))}function Jf(n,t){return(n%t+t)%t}function al(n,t,e){return(1-e)*n+e*t}function Fs(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:case Uint8ClampedArray:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Xe(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Kf(){let n={enabled:!0,workingColorSpace:Ys,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===ae&&(s.r=qn(s.r),s.g=qn(s.g),s.b=qn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ae&&(s.r=ss(s.r),s.g=ss(s.g),s.b=ss(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Mn?Zs:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Ri("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Ri("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Ys]:{primaries:t,whitePoint:i,transfer:Zs,toXYZ:ch,fromXYZ:hh,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Ee},outputColorSpaceConfig:{drawingBufferColorSpace:Ee}},[Ee]:{primaries:t,whitePoint:i,transfer:ae,toXYZ:ch,fromXYZ:hh,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Ee}}}),n}function qn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function ss(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}function cl(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?va.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Ft("Texture: Unable to serialize Texture."),{})}function fl(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}function vl(n,t,e,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){bi.fromArray(n,r);let o=s.x*Math.abs(bi.x)+s.y*Math.abs(bi.y)+s.z*Math.abs(bi.z),l=t.dot(bi),c=e.dot(bi),h=i.dot(bi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}function dd(n,t,e,i,s,r,a,o){let l;if(t.side===Fe?l=i.intersectTriangle(a,r,s,!0,o):l=i.intersectTriangle(s,r,a,t.side===di,o),l===null)return null;ea.copy(o),ea.applyMatrix4(n.matrixWorld);let c=e.ray.origin.distanceTo(ea);return c<e.near||c>e.far?null:{distance:c,point:ea.clone(),object:n}}function na(n,t,e,i,s,r,a,o,l,c){n.getVertexPosition(o,Kr),n.getVertexPosition(l,Qr),n.getVertexPosition(c,jr);let h=dd(n,t,e,i,Kr,Qr,jr,Sh);if(h){let f=new P;ri.getBarycoord(Sh,Kr,Qr,jr,f),s&&(h.uv=ri.getInterpolatedAttribute(s,o,l,c,f,new ot)),r&&(h.uv1=ri.getInterpolatedAttribute(r,o,l,c,f,new ot)),a&&(h.normal=ri.getInterpolatedAttribute(a,o,l,c,f,new P),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));let u={a:o,b:l,c,normal:new P,materialIndex:0};ri.getNormal(Kr,Qr,jr,u.normal),h.face=u,h.barycoord=f}return h}function hc(){let n=0,t=0,e=0,i=0;function s(r,a,o,l){n=r,t=o,e=-3*r+3*a-2*o-l,i=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){s(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,f){let u=(a-r)/c-(o-r)/(c+h)+(o-a)/h,d=(o-a)/h-(l-a)/(h+f)+(l-o)/f;u*=h,d*=h,s(a,o,u,d)},calc:function(r){let a=r*r,o=a*r;return n+t*r+e*a+i*o}}}function Ah(n,t,e,i,s){let r=(i-t)*.5,a=(s-e)*.5,o=n*n,l=n*o;return(2*e-2*i+r+a)*l+(-3*e+3*i-2*r-a)*o+r*n+e}function gd(n,t){let e=1-n;return e*e*t}function xd(n,t){return 2*(1-n)*n*t}function _d(n,t){return n*n*t}function Ws(n,t,e,i){return gd(n,t)+xd(n,e)+_d(n,i)}function yd(n,t){let e=1-n;return e*e*e*t}function vd(n,t){let e=1-n;return 3*e*e*n*t}function Sd(n,t){return 3*(1-n)*n*n*t}function Md(n,t){return n*n*n*t}function Xs(n,t,e,i,s){return yd(n,t)+vd(n,e)+Sd(n,i)+Md(n,s)}function bd(n,t,e=2){let i=t&&t.length,s=i?t[0]*e:n.length,r=Su(n,0,s,e,!0),a=[];if(!r||r.next===r.prev)return a;let o,l,c;if(i&&(r=Rd(n,t,r,e)),n.length>80*e){o=n[0],l=n[1];let h=o,f=l;for(let u=e;u<s;u+=e){let d=n[u],g=n[u+1];d<o&&(o=d),g<l&&(l=g),d>h&&(h=d),g>f&&(f=g)}c=Math.max(h-o,f-l),c=c!==0?32767/c:0}return ur(r,a,e,o,l,c,0),a}function Su(n,t,e,i,s){let r;if(s===zd(n,t,e,i)>0)for(let a=t;a<e;a+=i)r=wh(a/i|0,n[a],n[a+1],r);else for(let a=e-i;a>=t;a-=i)r=wh(a/i|0,n[a],n[a+1],r);return r&&ms(r,r.next)&&(dr(r),r=r.next),r}function Li(n,t){if(!n)return n;t||(t=n);let e=n,i;do if(i=!1,!e.steiner&&(ms(e,e.next)||ye(e.prev,e,e.next)===0)){if(dr(e),e=t=e.prev,e===e.next)break;i=!0}else e=e.next;while(i||e!==t);return t}function ur(n,t,e,i,s,r,a){if(!n)return;!a&&r&&Dd(n,i,s,r);let o=n;for(;n.prev!==n.next;){let l=n.prev,c=n.next;if(r?Ed(n,i,s,r):Td(n)){t.push(l.i,n.i,c.i),dr(n),n=c.next,o=c.next;continue}if(n=c,n===o){a?a===1?(n=Ad(Li(n),t),ur(n,t,e,i,s,r,2)):a===2&&wd(n,t,e,i,s,r):ur(Li(n),t,e,i,s,r,1);break}}}function Td(n){let t=n.prev,e=n,i=n.next;if(ye(t,e,i)>=0)return!1;let s=t.x,r=e.x,a=i.x,o=t.y,l=e.y,c=i.y,h=Math.min(s,r,a),f=Math.min(o,l,c),u=Math.max(s,r,a),d=Math.max(o,l,c),g=i.next;for(;g!==t;){if(g.x>=h&&g.x<=u&&g.y>=f&&g.y<=d&&Hs(s,o,r,l,a,c,g.x,g.y)&&ye(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function Ed(n,t,e,i){let s=n.prev,r=n,a=n.next;if(ye(s,r,a)>=0)return!1;let o=s.x,l=r.x,c=a.x,h=s.y,f=r.y,u=a.y,d=Math.min(o,l,c),g=Math.min(h,f,u),M=Math.max(o,l,c),p=Math.max(h,f,u),m=Ul(d,g,t,e,i),S=Ul(M,p,t,e,i),T=n.prevZ,y=n.nextZ;for(;T&&T.z>=m&&y&&y.z<=S;){if(T.x>=d&&T.x<=M&&T.y>=g&&T.y<=p&&T!==s&&T!==a&&Hs(o,h,l,f,c,u,T.x,T.y)&&ye(T.prev,T,T.next)>=0||(T=T.prevZ,y.x>=d&&y.x<=M&&y.y>=g&&y.y<=p&&y!==s&&y!==a&&Hs(o,h,l,f,c,u,y.x,y.y)&&ye(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;T&&T.z>=m;){if(T.x>=d&&T.x<=M&&T.y>=g&&T.y<=p&&T!==s&&T!==a&&Hs(o,h,l,f,c,u,T.x,T.y)&&ye(T.prev,T,T.next)>=0)return!1;T=T.prevZ}for(;y&&y.z<=S;){if(y.x>=d&&y.x<=M&&y.y>=g&&y.y<=p&&y!==s&&y!==a&&Hs(o,h,l,f,c,u,y.x,y.y)&&ye(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function Ad(n,t){let e=n;do{let i=e.prev,s=e.next.next;!ms(i,s)&&bu(i,e,e.next,s)&&fr(i,s)&&fr(s,i)&&(t.push(i.i,e.i,s.i),dr(e),dr(e.next),e=n=s),e=e.next}while(e!==n);return Li(e)}function wd(n,t,e,i,s,r){let a=n;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&Fd(a,o)){let l=Tu(a,o);a=Li(a,a.next),l=Li(l,l.next),ur(a,t,e,i,s,r,0),ur(l,t,e,i,s,r,0);return}o=o.next}a=a.next}while(a!==n)}function Rd(n,t,e,i){let s=[];for(let r=0,a=t.length;r<a;r++){let o=t[r]*i,l=r<a-1?t[r+1]*i:n.length,c=Su(n,o,l,i,!1);c===c.next&&(c.steiner=!0),s.push(Ud(c))}s.sort(Cd);for(let r=0;r<s.length;r++)e=Id(s[r],e);return e}function Cd(n,t){let e=n.x-t.x;if(e===0&&(e=n.y-t.y,e===0)){let i=(n.next.y-n.y)/(n.next.x-n.x),s=(t.next.y-t.y)/(t.next.x-t.x);e=i-s}return e}function Id(n,t){let e=Pd(n,t);if(!e)return t;let i=Tu(e,n);return Li(i,i.next),Li(e,e.next)}function Pd(n,t){let e=t,i=n.x,s=n.y,r=-1/0,a;if(ms(n,e))return e;do{if(ms(n,e.next))return e.next;if(s<=e.y&&s>=e.next.y&&e.next.y!==e.y){let f=e.x+(s-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(f<=i&&f>r&&(r=f,a=e.x<e.next.x?e:e.next,f===i))return a}e=e.next}while(e!==t);if(!a)return null;let o=a,l=a.x,c=a.y,h=1/0;e=a;do{if(i>=e.x&&e.x>=l&&i!==e.x&&Mu(s<c?i:r,s,l,c,s<c?r:i,s,e.x,e.y)){let f=Math.abs(s-e.y)/(i-e.x);fr(e,n)&&(f<h||f===h&&(e.x>a.x||e.x===a.x&&Ld(a,e)))&&(a=e,h=f)}e=e.next}while(e!==o);return a}function Ld(n,t){return ye(n.prev,n,t.prev)<0&&ye(t.next,n,n.next)<0}function Dd(n,t,e,i){let s=n;do s.z===0&&(s.z=Ul(s.x,s.y,t,e,i)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==n);s.prevZ.nextZ=null,s.prevZ=null,Nd(s)}function Nd(n){let t,e=1;do{let i=n,s;n=null;let r=null;for(t=0;i;){t++;let a=i,o=0;for(let c=0;c<e&&(o++,a=a.nextZ,!!a);c++);let l=e;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||i.z<=a.z)?(s=i,i=i.nextZ,o--):(s=a,a=a.nextZ,l--),r?r.nextZ=s:n=s,s.prevZ=r,r=s;i=a}r.nextZ=null,e*=2}while(t>1);return n}function Ul(n,t,e,i,s){return n=(n-e)*s|0,t=(t-i)*s|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,n|t<<1}function Ud(n){let t=n,e=n;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==n);return e}function Mu(n,t,e,i,s,r,a,o){return(s-a)*(t-o)>=(n-a)*(r-o)&&(n-a)*(i-o)>=(e-a)*(t-o)&&(e-a)*(r-o)>=(s-a)*(i-o)}function Hs(n,t,e,i,s,r,a,o){return!(n===a&&t===o)&&Mu(n,t,e,i,s,r,a,o)}function Fd(n,t){return n.next.i!==t.i&&n.prev.i!==t.i&&!Bd(n,t)&&(fr(n,t)&&fr(t,n)&&Od(n,t)&&(ye(n.prev,n,t.prev)||ye(n,t.prev,t))||ms(n,t)&&ye(n.prev,n,n.next)>0&&ye(t.prev,t,t.next)>0)}function ye(n,t,e){return(t.y-n.y)*(e.x-t.x)-(t.x-n.x)*(e.y-t.y)}function ms(n,t){return n.x===t.x&&n.y===t.y}function bu(n,t,e,i){let s=aa(ye(n,t,e)),r=aa(ye(n,t,i)),a=aa(ye(e,i,n)),o=aa(ye(e,i,t));return!!(s!==r&&a!==o||s===0&&ra(n,e,t)||r===0&&ra(n,i,t)||a===0&&ra(e,n,i)||o===0&&ra(e,t,i))}function ra(n,t,e){return t.x<=Math.max(n.x,e.x)&&t.x>=Math.min(n.x,e.x)&&t.y<=Math.max(n.y,e.y)&&t.y>=Math.min(n.y,e.y)}function aa(n){return n>0?1:n<0?-1:0}function Bd(n,t){let e=n;do{if(e.i!==n.i&&e.next.i!==n.i&&e.i!==t.i&&e.next.i!==t.i&&bu(e,e.next,n,t))return!0;e=e.next}while(e!==n);return!1}function fr(n,t){return ye(n.prev,n,n.next)<0?ye(n,t,n.next)>=0&&ye(n,n.prev,t)>=0:ye(n,t,n.prev)<0||ye(n,n.next,t)<0}function Od(n,t){let e=n,i=!1,s=(n.x+t.x)/2,r=(n.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(i=!i),e=e.next;while(e!==n);return i}function Tu(n,t){let e=Fl(n.i,n.x,n.y),i=Fl(t.i,t.x,t.y),s=n.next,r=t.prev;return n.next=t,t.prev=n,e.next=s,s.prev=e,i.next=e,e.prev=i,r.next=i,i.prev=r,i}function wh(n,t,e,i){let s=Fl(n,t,e);return i?(s.next=i.next,s.prev=i,i.next.prev=s,i.next=s):(s.prev=s,s.next=s),s}function dr(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function Fl(n,t,e){return{i:n,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function zd(n,t,e,i){let s=0;for(let r=t,a=e-i;r<e;r+=i)s+=(n[a]-n[r])*(n[r+1]+n[a+1]),a=r;return s}function Rh(n){let t=n.length;t>2&&n[t-1].equals(n[0])&&n.pop()}function Ch(n,t){for(let e=0;e<t.length;e++)n.push(t[e].x),n.push(t[e].y)}function Vd(n,t,e){if(e.shapes=[],Array.isArray(n))for(let i=0,s=n.length;i<s;i++){let r=n[i];e.shapes.push(r.uuid)}else e.shapes.push(n.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}function Oi(n){let t={};for(let e in n){t[e]={};for(let i in n[e]){let s=n[e][i];if(Ih(s))s.isRenderTargetTexture?(Ft("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone();else if(Array.isArray(s))if(Ih(s[0])){let r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();t[e][i]=r}else t[e][i]=s.slice();else t[e][i]=s}}return t}function ke(n){let t={};for(let e=0;e<n.length;e++){let i=Oi(n[e]);for(let s in i)t[s]=i[s]}return t}function Ih(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function Gd(n){let t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function uc(n){let t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Qt.workingColorSpace}function es(n,t){return!n||n.constructor===t?n:typeof t.BYTES_PER_ELEMENT=="number"?new t(n):Array.prototype.slice.call(n)}function Cl(n){return n!==void 0&&n.inTangents!==void 0&&n.outTangents!==void 0}function Au(n,t,e,i,s){let r=1-n;return r*r*r*t+3*r*r*n*e+3*r*n*n*i+n*n*n*s}function Xd(n,t,e,i,s){let r=1-n;return 3*r*r*(e-t)+6*r*n*(i-e)+3*n*n*(s-i)}function qd(n,t,e,i,s){let r=(n-t)/(s-t);for(let a=0;a<8;a++){let o=Au(r,t,e,i,s)-n;if(Math.abs(o)<1e-10)break;let l=Xd(r,t,e,i,s);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-o/l))}return r}function Ph(n,t){for(let e=0,i=n.length;e!==i;e+=2)n[e]*=t}function pc(n,t,e,i){let s=ep(i);switch(e){case ac:return n*t;case ja:return n*t/s.components*s.byteLength;case to:return n*t/s.components*s.byteLength;case gi:return n*t*2/s.components*s.byteLength;case eo:return n*t*2/s.components*s.byteLength;case oc:return n*t*3/s.components*s.byteLength;case fn:return n*t*4/s.components*s.byteLength;case no:return n*t*4/s.components*s.byteLength;case Rr:case Cr:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Ir:case Pr:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case so:case ao:return Math.max(n,16)*Math.max(t,8)/4;case io:case ro:return Math.max(n,8)*Math.max(t,8)/2;case oo:case lo:case ho:case uo:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case co:case Lr:case fo:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case po:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case mo:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case go:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case xo:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case _o:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case yo:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case vo:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case So:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case Mo:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case bo:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case To:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case Eo:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case Ao:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case wo:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case Ro:case Co:case Io:return Math.ceil(n/4)*Math.ceil(t/4)*16;case Po:case Lo:return Math.ceil(n/4)*Math.ceil(t/4)*8;case Dr:case Do:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function ep(n){switch(n){case Je:case nc:return{byteLength:1,components:1};case vs:case ic:case Sn:return{byteLength:2,components:1};case Ka:case Qa:return{byteLength:2,components:4};case vn:case Ja:case un:return{byteLength:4,components:1};case sc:case rc:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}var Fh,Hl,Bh,Ui,Oh,_s,di,Fe,nn,Un,ys,Wl,Xl,ql,zh,Fi,kh,Vh,Gh,Hh,Wh,Xh,qh,Yh,Yl,Zl,Zh,$h,Jh,Kh,Qh,jh,tu,eu,nu,ua,fa,da,rs,pa,ma,ga,xa,qa,iu,su,yn,$l,Jl,Kl,Er,Ql,jl,tc,ec,pi,Bi,Ya,Za,Ar,as,Cn,_a,Pe,ru,wr,Ae,$a,Fn,Je,nc,ic,vs,Ja,vn,un,Sn,Ka,Qa,Ss,sc,rc,ac,oc,fn,In,mi,ja,to,gi,eo,no,Rr,Cr,Ir,Pr,io,so,ro,ao,oo,lo,co,ho,uo,Lr,fo,po,mo,go,xo,_o,yo,vo,So,Mo,bo,To,Eo,Ao,wo,Ro,Co,Io,Po,Lo,Dr,Do,qs,ya,ca,Pl,Ll,Dl,Nl,au,Nr,ou,Mn,Ee,Ys,Zs,ae,ha,lu,cu,hu,uu,No,fu,du,Uo,pu,mu,lc,_n,os,oh,ls,yu,Pn,Oe,rl,Js,mc,ot,qe,gc,P,ol,lh,xc,Vt,ll,ch,hh,Qt,Wi,va,Qf,cs,jf,hl,We,_c,_e,Sa,Ye,Ks,Ma,Xa,jt,Xi,pn,td,ed,ti,Vr,Ke,uh,fh,Ze,Qs,nd,dh,qi,Vn,Gr,Bs,id,sd,ph,mh,gh,xh,rd,Yi,ul,be,Ai,ad,hs,vu,ei,Hr,Wt,ze,Ci,mn,Gn,dl,Hn,Zi,$i,_h,pl,ml,gl,xl,_l,yl,ri,Ln,Wn,gn,Wr,Ji,Ki,Qi,ni,ii,Mi,Os,Xr,qr,bi,Me,Yr,od,Ne,js,tr,oe,ld,zs,Sl,ai,cd,cn,Ml,ji,Qe,ks,Ce,Le,bl,hd,ud,xn,fd,Yn,Xn,Tl,Zr,$r,ba,Dn,yh,Ti,Jr,vh,Kr,Qr,jr,El,ta,Sh,ea,pe,er,us,ts,Mh,ia,bh,pd,Vs,Gs,nr,Ei,md,sa,oi,ir,Zn,li,Ta,sr,Nn,Ii,rr,fs,je,ds,Ea,Th,Eh,Al,wl,Rl,ps,ar,Aa,or,wa,lr,cr,hr,Ra,Ca,Pi,ci,Bl,wi,Di,kd,pr,mr,$n,Ue,gr,hn,xr,Eu,Hd,Wd,tn,Ia,$e,_r,Pa,La,hi,Da,Na,Ua,Fa,en,ui,Ba,Oa,za,yr,fi,ka,Va,wu,Ga,Ni,vr,Il,Lh,Dh,gs,oa,la,Rn,Sr,si,Nh,Uh,Ie,Ol,Mr,zl,br,xs,kl,Tr,ns,is,Ha,Wa,fc,Yd,dc,Zd,$d,Jd,Kd,Qd,jd,tp,Vl,ge,A_,yc,Gl,vc=ln(()=>{Fh=0,Hl=1,Bh=2,Ui=1,Oh=2,_s=3,di=0,Fe=1,nn=2,Un=0,ys=1,Wl=2,Xl=3,ql=4,zh=5,Fi=100,kh=101,Vh=102,Gh=103,Hh=104,Wh=200,Xh=201,qh=202,Yh=203,Yl=204,Zl=205,Zh=206,$h=207,Jh=208,Kh=209,Qh=210,jh=211,tu=212,eu=213,nu=214,ua=0,fa=1,da=2,rs=3,pa=4,ma=5,ga=6,xa=7,qa=0,iu=1,su=2,yn=0,$l=1,Jl=2,Kl=3,Er=4,Ql=5,jl=6,tc=7,ec=300,pi=301,Bi=302,Ya=303,Za=304,Ar=306,as=1e3,Cn=1001,_a=1002,Pe=1003,ru=1004,wr=1005,Ae=1006,$a=1007,Fn=1008,Je=1009,nc=1010,ic=1011,vs=1012,Ja=1013,vn=1014,un=1015,Sn=1016,Ka=1017,Qa=1018,Ss=1020,sc=35902,rc=35899,ac=1021,oc=1022,fn=1023,In=1026,mi=1027,ja=1028,to=1029,gi=1030,eo=1031,no=1033,Rr=33776,Cr=33777,Ir=33778,Pr=33779,io=35840,so=35841,ro=35842,ao=35843,oo=36196,lo=37492,co=37496,ho=37488,uo=37489,Lr=37490,fo=37491,po=37808,mo=37809,go=37810,xo=37811,_o=37812,yo=37813,vo=37814,So=37815,Mo=37816,bo=37817,To=37818,Eo=37819,Ao=37820,wo=37821,Ro=36492,Co=36494,Io=36495,Po=36283,Lo=36284,Dr=36285,Do=36286,qs=2300,ya=2301,ca=2302,Pl=2303,Ll=2400,Dl=2401,Nl=2402,au=3200,Nr=0,ou=1,Mn="",Ee="srgb",Ys="srgb-linear",Zs="linear",ae="srgb",ha=7680,lu=519,cu=512,hu=513,uu=514,No=515,fu=516,du=517,Uo=518,pu=519,mu=35044,lc="300 es",_n=2e3,os=2001;oh={},ls=null;yu={[ua]:fa,[da]:ga,[pa]:xa,[rs]:ma,[fa]:ua,[ga]:da,[xa]:pa,[ma]:rs},Pn=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){let i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){let i=this._listeners;if(i===void 0)return;let s=i[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let i=e[t.type];if(i!==void 0){t.target=this;let s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}},Oe=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],rl=Math.PI/180,Js=180/Math.PI;mc=class mc{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Jt(this.x,t.x,e.x),this.y=Jt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Jt(this.x,t,e),this.y=Jt(this.y,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Jt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(Jt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*i-a*s+t.x,this.y=r*s+a*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};mc.prototype.isVector2=!0;ot=mc,qe=class{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,a,o){let l=i[s+0],c=i[s+1],h=i[s+2],f=i[s+3],u=r[a+0],d=r[a+1],g=r[a+2],M=r[a+3];if(f!==M||l!==u||c!==d||h!==g){let p=l*u+c*d+h*g+f*M;p<0&&(u=-u,d=-d,g=-g,M=-M,p=-p);let m=1-o;if(p<.9995){let S=Math.acos(p),T=Math.sin(S);m=Math.sin(m*S)/T,o=Math.sin(o*S)/T,l=l*m+u*o,c=c*m+d*o,h=h*m+g*o,f=f*m+M*o}else{l=l*m+u*o,c=c*m+d*o,h=h*m+g*o,f=f*m+M*o;let S=1/Math.sqrt(l*l+c*c+h*h+f*f);l*=S,c*=S,h*=S,f*=S}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=f}static multiplyQuaternionsFlat(t,e,i,s,r,a){let o=i[s],l=i[s+1],c=i[s+2],h=i[s+3],f=r[a],u=r[a+1],d=r[a+2],g=r[a+3];return t[e]=o*g+h*f+l*d-c*u,t[e+1]=l*g+h*u+c*f-o*d,t[e+2]=c*g+h*d+o*u-l*f,t[e+3]=h*g-o*f-l*u-c*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let i=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(i/2),h=o(s/2),f=o(r/2),u=l(i/2),d=l(s/2),g=l(r/2);switch(a){case"XYZ":this._x=u*h*f+c*d*g,this._y=c*d*f-u*h*g,this._z=c*h*g+u*d*f,this._w=c*h*f-u*d*g;break;case"YXZ":this._x=u*h*f+c*d*g,this._y=c*d*f-u*h*g,this._z=c*h*g-u*d*f,this._w=c*h*f+u*d*g;break;case"ZXY":this._x=u*h*f-c*d*g,this._y=c*d*f+u*h*g,this._z=c*h*g+u*d*f,this._w=c*h*f-u*d*g;break;case"ZYX":this._x=u*h*f-c*d*g,this._y=c*d*f+u*h*g,this._z=c*h*g-u*d*f,this._w=c*h*f+u*d*g;break;case"YZX":this._x=u*h*f+c*d*g,this._y=c*d*f+u*h*g,this._z=c*h*g-u*d*f,this._w=c*h*f-u*d*g;break;case"XZY":this._x=u*h*f-c*d*g,this._y=c*d*f-u*h*g,this._z=c*h*g+u*d*f,this._w=c*h*f+u*d*g;break;default:Ft("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,i=e[0],s=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],f=e[10],u=i+o+f;if(u>0){let d=.5/Math.sqrt(u+1);this._w=.25/d,this._x=(h-l)*d,this._y=(r-c)*d,this._z=(a-s)*d}else if(i>o&&i>f){let d=2*Math.sqrt(1+i-o-f);this._w=(h-l)/d,this._x=.25*d,this._y=(s+a)/d,this._z=(r+c)/d}else if(o>f){let d=2*Math.sqrt(1+o-i-f);this._w=(r-c)/d,this._x=(s+a)/d,this._y=.25*d,this._z=(l+h)/d}else{let d=2*Math.sqrt(1+f-i-o);this._w=(a-s)/d,this._x=(r+c)/d,this._y=(l+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Jt(this.dot(t),-1,1)))}rotateTowards(t,e){let i=this.angleTo(t);if(i===0)return this;let s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let i=t._x,s=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=i*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-i*c,this._z=r*h+a*c+i*l-s*o,this._w=a*h-i*o-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){let i=t._x,s=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(i=-i,s=-s,r=-r,a=-a,o=-o);let l=1-e;if(o<.9995){let c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,e=Math.sin(e*c)/h,this._x=this._x*l+i*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this._onChangeCallback()}else this._x=this._x*l+i*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this.normalize();return this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},gc=class gc{constructor(t=0,e=0,i=0){this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(lh.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(lh.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,i=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(t){let e=this.x,i=this.y,s=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*s-o*i),h=2*(o*e-r*s),f=2*(r*i-a*e);return this.x=e+l*c+a*f-o*h,this.y=i+l*h+o*c-r*f,this.z=s+l*f+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Jt(this.x,t.x,e.x),this.y=Jt(this.y,t.y,e.y),this.z=Jt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Jt(this.x,t,e),this.y=Jt(this.y,t,e),this.z=Jt(this.z,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Jt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let i=t.x,s=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=s*l-r*o,this.y=r*a-i*l,this.z=i*o-s*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return ol.copy(this).projectOnVector(t),this.sub(ol)}reflect(t){return this.sub(ol.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(Jt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){let s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};gc.prototype.isVector3=!0;P=gc,ol=new P,lh=new qe,xc=class xc{constructor(t,e,i,s,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,a,o,l,c)}set(t,e,i,s,r,a,o,l,c){let h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=i,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,s=e.elements,r=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],h=i[4],f=i[7],u=i[2],d=i[5],g=i[8],M=s[0],p=s[3],m=s[6],S=s[1],T=s[4],y=s[7],E=s[2],v=s[5],A=s[8];return r[0]=a*M+o*S+l*E,r[3]=a*p+o*T+l*v,r[6]=a*m+o*y+l*A,r[1]=c*M+h*S+f*E,r[4]=c*p+h*T+f*v,r[7]=c*m+h*y+f*A,r[2]=u*M+d*S+g*E,r[5]=u*p+d*T+g*v,r[8]=u*m+d*y+g*A,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-i*r*h+i*o*l+s*r*c-s*a*l}invert(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],f=h*a-o*c,u=o*l-h*r,d=c*r-a*l,g=e*f+i*u+s*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let M=1/g;return t[0]=f*M,t[1]=(s*c-h*i)*M,t[2]=(o*i-s*a)*M,t[3]=u*M,t[4]=(h*e-s*l)*M,t[5]=(s*r-o*e)*M,t[6]=d*M,t[7]=(i*l-c*e)*M,t[8]=(a*e-i*r)*M,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*a+c*o)+a+t,-s*c,s*l,-s*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return Ri("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(ll.makeScale(t,e)),this}rotate(t){return Ri("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(ll.makeRotation(-t)),this}translate(t,e){return Ri("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(ll.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}};xc.prototype.isMatrix3=!0;Vt=xc,ll=new Vt,ch=new Vt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),hh=new Vt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Qt=Kf();va=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{Wi===void 0&&(Wi=$s("canvas")),Wi.width=t.width,Wi.height=t.height;let s=Wi.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),i=Wi}return i.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=$s("canvas");e.width=t.width,e.height=t.height;let i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);let s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=qn(r[a]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(qn(e[i]/255)*255):e[i]=qn(e[i]);return{data:e,width:t.width,height:t.height}}else return Ft("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},Qf=0,cs=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Qf++}),this.uuid=Ms(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(cl(s[a].image)):r.push(cl(s[a]))}else r=cl(s);i.url=r}return e||(t.images[this.uuid]=i),i}};jf=0,hl=new P,We=class n extends Pn{constructor(t=n.DEFAULT_IMAGE,e=n.DEFAULT_MAPPING,i=Cn,s=Cn,r=Ae,a=Fn,o=fn,l=Je,c=n.DEFAULT_ANISOTROPY,h=Mn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:jf++}),this.uuid=Ms(),this.name="",this.source=new cs(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ot(0,0),this.repeat=new ot(1,1),this.center=new ot(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Vt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(hl).x}get height(){return this.source.getSize(hl).y}get depth(){return this.source.getSize(hl).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let i=t[e];if(i===void 0){Ft(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Ft(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==ec)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case as:t.x=t.x-Math.floor(t.x);break;case Cn:t.x=t.x<0?0:1;break;case _a:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case as:t.y=t.y-Math.floor(t.y);break;case Cn:t.y=t.y<0?0:1;break;case _a:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};We.DEFAULT_IMAGE=null;We.DEFAULT_MAPPING=ec;We.DEFAULT_ANISOTROPY=1;_c=class _c{constructor(t=0,e=0,i=0,s=1){this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,i=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*i+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r,l=t.elements,c=l[0],h=l[4],f=l[8],u=l[1],d=l[5],g=l[9],M=l[2],p=l[6],m=l[10];if(Math.abs(h-u)<.01&&Math.abs(f-M)<.01&&Math.abs(g-p)<.01){if(Math.abs(h+u)<.1&&Math.abs(f+M)<.1&&Math.abs(g+p)<.1&&Math.abs(c+d+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let T=(c+1)/2,y=(d+1)/2,E=(m+1)/2,v=(h+u)/4,A=(f+M)/4,x=(g+p)/4;return T>y&&T>E?T<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(T),s=v/i,r=A/i):y>E?y<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),i=v/s,r=x/s):E<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(E),i=A/r,s=x/r),this.set(i,s,r,e),this}let S=Math.sqrt((p-g)*(p-g)+(f-M)*(f-M)+(u-h)*(u-h));return Math.abs(S)<.001&&(S=1),this.x=(p-g)/S,this.y=(f-M)/S,this.z=(u-h)/S,this.w=Math.acos((c+d+m-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Jt(this.x,t.x,e.x),this.y=Jt(this.y,t.y,e.y),this.z=Jt(this.z,t.z,e.z),this.w=Jt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Jt(this.x,t,e),this.y=Jt(this.y,t,e),this.z=Jt(this.z,t,e),this.w=Jt(this.w,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Jt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};_c.prototype.isVector4=!0;_e=_c,Sa=class extends Pn{constructor(t=1,e=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ae,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=i.depth,this.scissor=new _e(0,0,t,e),this.scissorTest=!1,this.viewport=new _e(0,0,t,e),this.textures=[];let s={width:t,height:e,depth:i.depth},r=new We(s),a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:Ae,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,i=t.textures.length;e<i;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let s=Object.assign({},t.textures[e].image);this.textures[e].source=new cs(s)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Ye=class extends Sa{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}},Ks=class extends We{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Pe,this.minFilter=Pe,this.wrapR=Cn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}},Ma=class extends We{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Pe,this.minFilter=Pe,this.wrapR=Cn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}},Xa=class Xa{constructor(t,e,i,s,r,a,o,l,c,h,f,u,d,g,M,p){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,a,o,l,c,h,f,u,d,g,M,p)}set(t,e,i,s,r,a,o,l,c,h,f,u,d,g,M,p){let m=this.elements;return m[0]=t,m[4]=e,m[8]=i,m[12]=s,m[1]=r,m[5]=a,m[9]=o,m[13]=l,m[2]=c,m[6]=h,m[10]=f,m[14]=u,m[3]=d,m[7]=g,m[11]=M,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Xa().fromArray(this.elements)}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){let e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),i.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,i=t.elements,s=1/Xi.setFromMatrixColumn(t,0).length(),r=1/Xi.setFromMatrixColumn(t,1).length(),a=1/Xi.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*a,e[9]=i[9]*a,e[10]=i[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,i=t.x,s=t.y,r=t.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),f=Math.sin(r);if(t.order==="XYZ"){let u=a*h,d=a*f,g=o*h,M=o*f;e[0]=l*h,e[4]=-l*f,e[8]=c,e[1]=d+g*c,e[5]=u-M*c,e[9]=-o*l,e[2]=M-u*c,e[6]=g+d*c,e[10]=a*l}else if(t.order==="YXZ"){let u=l*h,d=l*f,g=c*h,M=c*f;e[0]=u+M*o,e[4]=g*o-d,e[8]=a*c,e[1]=a*f,e[5]=a*h,e[9]=-o,e[2]=d*o-g,e[6]=M+u*o,e[10]=a*l}else if(t.order==="ZXY"){let u=l*h,d=l*f,g=c*h,M=c*f;e[0]=u-M*o,e[4]=-a*f,e[8]=g+d*o,e[1]=d+g*o,e[5]=a*h,e[9]=M-u*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){let u=a*h,d=a*f,g=o*h,M=o*f;e[0]=l*h,e[4]=g*c-d,e[8]=u*c+M,e[1]=l*f,e[5]=M*c+u,e[9]=d*c-g,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){let u=a*l,d=a*c,g=o*l,M=o*c;e[0]=l*h,e[4]=M-u*f,e[8]=g*f+d,e[1]=f,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=d*f+g,e[10]=u-M*f}else if(t.order==="XZY"){let u=a*l,d=a*c,g=o*l,M=o*c;e[0]=l*h,e[4]=-f,e[8]=c*h,e[1]=u*f+M,e[5]=a*h,e[9]=d*f-g,e[2]=g*f-d,e[6]=o*h,e[10]=M*f+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(td,t,ed)}lookAt(t,e,i){let s=this.elements;return Ke.subVectors(t,e),Ke.lengthSq()===0&&(Ke.z=1),Ke.normalize(),ti.crossVectors(i,Ke),ti.lengthSq()===0&&(Math.abs(i.z)===1?Ke.x+=1e-4:Ke.z+=1e-4,Ke.normalize(),ti.crossVectors(i,Ke)),ti.normalize(),Vr.crossVectors(Ke,ti),s[0]=ti.x,s[4]=Vr.x,s[8]=Ke.x,s[1]=ti.y,s[5]=Vr.y,s[9]=Ke.y,s[2]=ti.z,s[6]=Vr.z,s[10]=Ke.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,s=e.elements,r=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],h=i[1],f=i[5],u=i[9],d=i[13],g=i[2],M=i[6],p=i[10],m=i[14],S=i[3],T=i[7],y=i[11],E=i[15],v=s[0],A=s[4],x=s[8],w=s[12],I=s[1],D=s[5],O=s[9],H=s[13],N=s[2],C=s[6],B=s[10],k=s[14],j=s[3],q=s[7],K=s[11],$=s[15];return r[0]=a*v+o*I+l*N+c*j,r[4]=a*A+o*D+l*C+c*q,r[8]=a*x+o*O+l*B+c*K,r[12]=a*w+o*H+l*k+c*$,r[1]=h*v+f*I+u*N+d*j,r[5]=h*A+f*D+u*C+d*q,r[9]=h*x+f*O+u*B+d*K,r[13]=h*w+f*H+u*k+d*$,r[2]=g*v+M*I+p*N+m*j,r[6]=g*A+M*D+p*C+m*q,r[10]=g*x+M*O+p*B+m*K,r[14]=g*w+M*H+p*k+m*$,r[3]=S*v+T*I+y*N+E*j,r[7]=S*A+T*D+y*C+E*q,r[11]=S*x+T*O+y*B+E*K,r[15]=S*w+T*H+y*k+E*$,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],f=t[6],u=t[10],d=t[14],g=t[3],M=t[7],p=t[11],m=t[15],S=l*d-c*u,T=o*d-c*f,y=o*u-l*f,E=a*d-c*h,v=a*u-l*h,A=a*f-o*h;return e*(M*S-p*T+m*y)-i*(g*S-p*E+m*v)+s*(g*T-M*E+m*A)-r*(g*y-M*v+p*A)}determinantAffine(){let t=this.elements,e=t[0],i=t[4],s=t[8],r=t[1],a=t[5],o=t[9],l=t[2],c=t[6],h=t[10];return e*(a*h-o*c)-i*(r*h-o*l)+s*(r*c-a*l)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],f=t[9],u=t[10],d=t[11],g=t[12],M=t[13],p=t[14],m=t[15],S=e*o-i*a,T=e*l-s*a,y=e*c-r*a,E=i*l-s*o,v=i*c-r*o,A=s*c-r*l,x=h*M-f*g,w=h*p-u*g,I=h*m-d*g,D=f*p-u*M,O=f*m-d*M,H=u*m-d*p,N=S*H-T*O+y*D+E*I-v*w+A*x;if(N===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let C=1/N;return t[0]=(o*H-l*O+c*D)*C,t[1]=(s*O-i*H-r*D)*C,t[2]=(M*A-p*v+m*E)*C,t[3]=(u*v-f*A-d*E)*C,t[4]=(l*I-a*H-c*w)*C,t[5]=(e*H-s*I+r*w)*C,t[6]=(p*y-g*A-m*T)*C,t[7]=(h*A-u*y+d*T)*C,t[8]=(a*O-o*I+c*x)*C,t[9]=(i*I-e*O-r*x)*C,t[10]=(g*v-M*y+m*S)*C,t[11]=(f*y-h*v-d*S)*C,t[12]=(o*w-a*D-l*x)*C,t[13]=(e*D-i*w+s*x)*C,t[14]=(M*T-g*E-p*S)*C,t[15]=(h*E-f*T+u*S)*C,this}scale(t){let e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let i=Math.cos(e),s=Math.sin(e),r=1-i,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+i,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+i,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,a){return this.set(1,i,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){let s=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,f=o+o,u=r*c,d=r*h,g=r*f,M=a*h,p=a*f,m=o*f,S=l*c,T=l*h,y=l*f,E=i.x,v=i.y,A=i.z;return s[0]=(1-(M+m))*E,s[1]=(d+y)*E,s[2]=(g-T)*E,s[3]=0,s[4]=(d-y)*v,s[5]=(1-(u+m))*v,s[6]=(p+S)*v,s[7]=0,s[8]=(g+T)*A,s[9]=(p-S)*A,s[10]=(1-(u+M))*A,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){let s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];let r=this.determinantAffine();if(r===0)return i.set(1,1,1),e.identity(),this;let a=Xi.set(s[0],s[1],s[2]).length(),o=Xi.set(s[4],s[5],s[6]).length(),l=Xi.set(s[8],s[9],s[10]).length();r<0&&(a=-a),pn.copy(this);let c=1/a,h=1/o,f=1/l;return pn.elements[0]*=c,pn.elements[1]*=c,pn.elements[2]*=c,pn.elements[4]*=h,pn.elements[5]*=h,pn.elements[6]*=h,pn.elements[8]*=f,pn.elements[9]*=f,pn.elements[10]*=f,e.setFromRotationMatrix(pn),i.x=a,i.y=o,i.z=l,this}makePerspective(t,e,i,s,r,a,o=_n,l=!1){let c=this.elements,h=2*r/(e-t),f=2*r/(i-s),u=(e+t)/(e-t),d=(i+s)/(i-s),g,M;if(l)g=r/(a-r),M=a*r/(a-r);else if(o===_n)g=-(a+r)/(a-r),M=-2*a*r/(a-r);else if(o===os)g=-a/(a-r),M=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=f,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=M,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,i,s,r,a,o=_n,l=!1){let c=this.elements,h=2/(e-t),f=2/(i-s),u=-(e+t)/(e-t),d=-(i+s)/(i-s),g,M;if(l)g=1/(a-r),M=a/(a-r);else if(o===_n)g=-2/(a-r),M=-(a+r)/(a-r);else if(o===os)g=-1/(a-r),M=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=f,c[9]=0,c[13]=d,c[2]=0,c[6]=0,c[10]=g,c[14]=M,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}};Xa.prototype.isMatrix4=!0;jt=Xa,Xi=new P,pn=new jt,td=new P(0,0,0),ed=new P(1,1,1),ti=new P,Vr=new P,Ke=new P,uh=new jt,fh=new qe,Ze=class n{constructor(t=0,e=0,i=0,s=n.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){let s=t.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],f=s[2],u=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin(Jt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Jt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(Jt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-f,d),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Jt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(u,d),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Jt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-Jt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:Ft("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return uh.makeRotationFromQuaternion(t),this.setFromRotationMatrix(uh,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return fh.setFromEuler(this),this.setFromQuaternion(fh,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Ze.DEFAULT_ORDER="XYZ";Qs=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},nd=0,dh=new P,qi=new qe,Vn=new jt,Gr=new P,Bs=new P,id=new P,sd=new qe,ph=new P(1,0,0),mh=new P(0,1,0),gh=new P(0,0,1),xh={type:"added"},rd={type:"removed"},Yi={type:"childadded",child:null},ul={type:"childremoved",child:null},be=class n extends Pn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:nd++}),this.uuid=Ms(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let t=new P,e=new Ze,i=new qe,s=new P(1,1,1);function r(){i.setFromEuler(e,!1)}function a(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new jt},normalMatrix:{value:new Vt}}),this.matrix=new jt,this.matrixWorld=new jt,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Qs,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return qi.setFromAxisAngle(t,e),this.quaternion.multiply(qi),this}rotateOnWorldAxis(t,e){return qi.setFromAxisAngle(t,e),this.quaternion.premultiply(qi),this}rotateX(t){return this.rotateOnAxis(ph,t)}rotateY(t){return this.rotateOnAxis(mh,t)}rotateZ(t){return this.rotateOnAxis(gh,t)}translateOnAxis(t,e){return dh.copy(t).applyQuaternion(this.quaternion),this.position.add(dh.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(ph,t)}translateY(t){return this.translateOnAxis(mh,t)}translateZ(t){return this.translateOnAxis(gh,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Vn.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?Gr.copy(t):Gr.set(t,e,i);let s=this.parent;this.updateWorldMatrix(!0,!1),Bs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Vn.lookAt(Bs,Gr,this.up):Vn.lookAt(Gr,Bs,this.up),this.quaternion.setFromRotationMatrix(Vn),s&&(Vn.extractRotation(s.matrixWorld),qi.setFromRotationMatrix(Vn),this.quaternion.premultiply(qi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Ot("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(xh),Yi.child=t,this.dispatchEvent(Yi),Yi.child=null):Ot("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(rd),ul.child=t,this.dispatchEvent(ul),ul.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Vn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Vn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Vn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(xh),Yi.child=t,this.dispatchEvent(Yi),Yi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){let a=this.children[i].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Bs,t,id),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Bs,sd,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,i=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*i-r[8]*s,r[13]+=i-r[1]*e-r[5]*i-r[9]*s,r[14]+=s-r[2]*e-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e,i=!1){let s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),e===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,i)}}toJSON(t){let e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let f=l[c];r(t.shapes,f)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(r(t.animations,l))}}if(e){let o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),f=a(t.shapes),u=a(t.skeletons),d=a(t.animations),g=a(t.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),f.length>0&&(i.shapes=f),u.length>0&&(i.skeletons=u),d.length>0&&(i.animations=d),g.length>0&&(i.nodes=g)}return i.object=s,i;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){let s=t.children[i];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};be.DEFAULT_UP=new P(0,1,0);be.DEFAULT_MATRIX_AUTO_UPDATE=!0;be.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;Ai=class extends be{constructor(){super(),this.isGroup=!0,this.type="Group"}},ad={type:"move"},hs=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ai,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ai,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ai,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(let M of t.hand.values()){let p=e.getJointPose(M,i),m=this._getHandJoint(c,M);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}let h=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],u=h.position.distanceTo(f.position),d=.02,g=.005;c.inputState.pinching&&u>d+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=d-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(ad)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let i=new Ai;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}},vu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ei={h:0,s:0,l:0},Hr={h:0,s:0,l:0};Wt=class{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ee){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Qt.colorSpaceToWorking(this,e),this}setRGB(t,e,i,s=Qt.workingColorSpace){return this.r=t,this.g=e,this.b=i,Qt.colorSpaceToWorking(this,s),this}setHSL(t,e,i,s=Qt.workingColorSpace){if(t=Jf(t,1),e=Jt(e,0,1),i=Jt(i,0,1),e===0)this.r=this.g=this.b=i;else{let r=i<=.5?i*(1+e):i+e-i*e,a=2*i-r;this.r=fl(a,r,t+1/3),this.g=fl(a,r,t),this.b=fl(a,r,t-1/3)}return Qt.colorSpaceToWorking(this,s),this}setStyle(t,e=Ee){function i(r){r!==void 0&&parseFloat(r)<1&&Ft("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Ft("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);Ft("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ee){let i=vu[t.toLowerCase()];return i!==void 0?this.setHex(i,e):Ft("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=qn(t.r),this.g=qn(t.g),this.b=qn(t.b),this}copyLinearToSRGB(t){return this.r=ss(t.r),this.g=ss(t.g),this.b=ss(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ee){return Qt.workingToColorSpace(ze.copy(this),t),Math.round(Jt(ze.r*255,0,255))*65536+Math.round(Jt(ze.g*255,0,255))*256+Math.round(Jt(ze.b*255,0,255))}getHexString(t=Ee){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Qt.workingColorSpace){Qt.workingToColorSpace(ze.copy(this),e);let i=ze.r,s=ze.g,r=ze.b,a=Math.max(i,s,r),o=Math.min(i,s,r),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let f=a-o;switch(c=h<=.5?f/(a+o):f/(2-a-o),a){case i:l=(s-r)/f+(s<r?6:0);break;case s:l=(r-i)/f+2;break;case r:l=(i-s)/f+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=Qt.workingColorSpace){return Qt.workingToColorSpace(ze.copy(this),e),t.r=ze.r,t.g=ze.g,t.b=ze.b,t}getStyle(t=Ee){Qt.workingToColorSpace(ze.copy(this),t);let e=ze.r,i=ze.g,s=ze.b;return t!==Ee?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(ei),this.setHSL(ei.h+t,ei.s+e,ei.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(ei),t.getHSL(Hr);let i=al(ei.h,Hr.h,e),s=al(ei.s,Hr.s,e),r=al(ei.l,Hr.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},ze=new Wt;Wt.NAMES=vu;Ci=class extends be{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ze,this.environmentIntensity=1,this.environmentRotation=new Ze,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},mn=new P,Gn=new P,dl=new P,Hn=new P,Zi=new P,$i=new P,_h=new P,pl=new P,ml=new P,gl=new P,xl=new _e,_l=new _e,yl=new _e,ri=class n{constructor(t=new P,e=new P,i=new P){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),mn.subVectors(t,e),s.cross(mn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){mn.subVectors(s,e),Gn.subVectors(i,e),dl.subVectors(t,e);let a=mn.dot(mn),o=mn.dot(Gn),l=mn.dot(dl),c=Gn.dot(Gn),h=Gn.dot(dl),f=a*c-o*o;if(f===0)return r.set(0,0,0),null;let u=1/f,d=(c*l-o*h)*u,g=(a*h-o*l)*u;return r.set(1-d-g,g,d)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,Hn)===null?!1:Hn.x>=0&&Hn.y>=0&&Hn.x+Hn.y<=1}static getInterpolation(t,e,i,s,r,a,o,l){return this.getBarycoord(t,e,i,s,Hn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Hn.x),l.addScaledVector(a,Hn.y),l.addScaledVector(o,Hn.z),l)}static getInterpolatedAttribute(t,e,i,s,r,a){return xl.setScalar(0),_l.setScalar(0),yl.setScalar(0),xl.fromBufferAttribute(t,e),_l.fromBufferAttribute(t,i),yl.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(xl,r.x),a.addScaledVector(_l,r.y),a.addScaledVector(yl,r.z),a}static isFrontFacing(t,e,i,s){return mn.subVectors(i,e),Gn.subVectors(t,e),mn.cross(Gn).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return mn.subVectors(this.c,this.b),Gn.subVectors(this.a,this.b),mn.cross(Gn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return n.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return n.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,r){return n.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return n.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return n.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let i=this.a,s=this.b,r=this.c,a,o;Zi.subVectors(s,i),$i.subVectors(r,i),pl.subVectors(t,i);let l=Zi.dot(pl),c=$i.dot(pl);if(l<=0&&c<=0)return e.copy(i);ml.subVectors(t,s);let h=Zi.dot(ml),f=$i.dot(ml);if(h>=0&&f<=h)return e.copy(s);let u=l*f-h*c;if(u<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(i).addScaledVector(Zi,a);gl.subVectors(t,r);let d=Zi.dot(gl),g=$i.dot(gl);if(g>=0&&d<=g)return e.copy(r);let M=d*c-l*g;if(M<=0&&c>=0&&g<=0)return o=c/(c-g),e.copy(i).addScaledVector($i,o);let p=h*g-d*f;if(p<=0&&f-h>=0&&d-g>=0)return _h.subVectors(r,s),o=(f-h)/(f-h+(d-g)),e.copy(s).addScaledVector(_h,o);let m=1/(p+M+u);return a=M*m,o=u*m,e.copy(i).addScaledVector(Zi,a).addScaledVector($i,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Ln=class{constructor(t=new P(1/0,1/0,1/0),e=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(gn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(gn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let i=gn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let i=t.geometry;if(i!==void 0){let r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,gn):gn.fromBufferAttribute(r,a),gn.applyMatrix4(t.matrixWorld),this.expandByPoint(gn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Wr.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Wr.copy(i.boundingBox)),Wr.applyMatrix4(t.matrixWorld),this.union(Wr)}let s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,gn),gn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Os),Xr.subVectors(this.max,Os),Ji.subVectors(t.a,Os),Ki.subVectors(t.b,Os),Qi.subVectors(t.c,Os),ni.subVectors(Ki,Ji),ii.subVectors(Qi,Ki),Mi.subVectors(Ji,Qi);let e=[0,-ni.z,ni.y,0,-ii.z,ii.y,0,-Mi.z,Mi.y,ni.z,0,-ni.x,ii.z,0,-ii.x,Mi.z,0,-Mi.x,-ni.y,ni.x,0,-ii.y,ii.x,0,-Mi.y,Mi.x,0];return!vl(e,Ji,Ki,Qi,Xr)||(e=[1,0,0,0,1,0,0,0,1],!vl(e,Ji,Ki,Qi,Xr))?!1:(qr.crossVectors(ni,ii),e=[qr.x,qr.y,qr.z],vl(e,Ji,Ki,Qi,Xr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,gn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(gn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Wn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Wn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Wn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Wn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Wn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Wn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Wn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Wn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Wn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},Wn=[new P,new P,new P,new P,new P,new P,new P,new P],gn=new P,Wr=new Ln,Ji=new P,Ki=new P,Qi=new P,ni=new P,ii=new P,Mi=new P,Os=new P,Xr=new P,qr=new P,bi=new P;Me=new P,Yr=new ot,od=0,Ne=class extends Pn{constructor(t,e,i=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:od++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=mu,this.updateRanges=[],this.gpuType=un,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)Yr.fromBufferAttribute(this,e),Yr.applyMatrix3(t),this.setXY(e,Yr.x,Yr.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)Me.fromBufferAttribute(this,e),Me.applyMatrix3(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)Me.fromBufferAttribute(this,e),Me.applyMatrix4(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Me.fromBufferAttribute(this,e),Me.applyNormalMatrix(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Me.fromBufferAttribute(this,e),Me.transformDirection(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=Fs(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=Xe(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Fs(e,this.array)),e}setX(t,e){return this.normalized&&(e=Xe(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Fs(e,this.array)),e}setY(t,e){return this.normalized&&(e=Xe(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Fs(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Xe(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Fs(e,this.array)),e}setW(t,e){return this.normalized&&(e=Xe(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=Xe(e,this.array),i=Xe(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=Xe(e,this.array),i=Xe(i,this.array),s=Xe(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=Xe(e,this.array),i=Xe(i,this.array),s=Xe(s,this.array),r=Xe(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}},js=class extends Ne{constructor(t,e,i){super(new Uint16Array(t),e,i)}},tr=class extends Ne{constructor(t,e,i){super(new Uint32Array(t),e,i)}},oe=class extends Ne{constructor(t,e,i){super(new Float32Array(t),e,i)}},ld=new Ln,zs=new P,Sl=new P,ai=class{constructor(t=new P,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let i=this.center;e!==void 0?i.copy(e):ld.setFromPoints(t).getCenter(i);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;zs.subVectors(t,this.center);let e=zs.lengthSq();if(e>this.radius*this.radius){let i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(zs,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Sl.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(zs.copy(t.center).add(Sl)),this.expandByPoint(zs.copy(t.center).sub(Sl))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},cd=0,cn=new jt,Ml=new be,ji=new P,Qe=new Ln,ks=new Ln,Ce=new P,Le=class n extends Pn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:cd++}),this.uuid=Ms(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Zf(t)?tr:js)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let r=new Vt().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return cn.makeRotationFromQuaternion(t),this.applyMatrix4(cn),this}rotateX(t){return cn.makeRotationX(t),this.applyMatrix4(cn),this}rotateY(t){return cn.makeRotationY(t),this.applyMatrix4(cn),this}rotateZ(t){return cn.makeRotationZ(t),this.applyMatrix4(cn),this}translate(t,e,i){return cn.makeTranslation(t,e,i),this.applyMatrix4(cn),this}scale(t,e,i){return cn.makeScale(t,e,i),this.applyMatrix4(cn),this}lookAt(t){return Ml.lookAt(t),Ml.updateMatrix(),this.applyMatrix4(Ml.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ji).negate(),this.translate(ji.x,ji.y,ji.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let i=[];for(let s=0,r=t.length;s<r;s++){let a=t[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new oe(i,3))}else{let i=Math.min(t.length,e.count);for(let s=0;s<i;s++){let r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Ft("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ln);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Ot("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){let r=e[i];Qe.setFromBufferAttribute(r),this.morphTargetsRelative?(Ce.addVectors(this.boundingBox.min,Qe.min),this.boundingBox.expandByPoint(Ce),Ce.addVectors(this.boundingBox.max,Qe.max),this.boundingBox.expandByPoint(Ce)):(this.boundingBox.expandByPoint(Qe.min),this.boundingBox.expandByPoint(Qe.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ot('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ai);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Ot("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(t){let i=this.boundingSphere.center;if(Qe.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){let o=e[r];ks.setFromBufferAttribute(o),this.morphTargetsRelative?(Ce.addVectors(Qe.min,ks.min),Qe.expandByPoint(Ce),Ce.addVectors(Qe.max,ks.max),Qe.expandByPoint(Ce)):(Qe.expandByPoint(ks.min),Qe.expandByPoint(ks.max))}Qe.getCenter(i);let s=0;for(let r=0,a=t.count;r<a;r++)Ce.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(Ce));if(e)for(let r=0,a=e.length;r<a;r++){let o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Ce.fromBufferAttribute(o,c),l&&(ji.fromBufferAttribute(t,c),Ce.add(ji)),s=Math.max(s,i.distanceToSquared(Ce))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Ot('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Ot("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=e.position,s=e.normal,r=e.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new Ne(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));let o=[],l=[];for(let x=0;x<i.count;x++)o[x]=new P,l[x]=new P;let c=new P,h=new P,f=new P,u=new ot,d=new ot,g=new ot,M=new P,p=new P;function m(x,w,I){c.fromBufferAttribute(i,x),h.fromBufferAttribute(i,w),f.fromBufferAttribute(i,I),u.fromBufferAttribute(r,x),d.fromBufferAttribute(r,w),g.fromBufferAttribute(r,I),h.sub(c),f.sub(c),d.sub(u),g.sub(u);let D=1/(d.x*g.y-g.x*d.y);isFinite(D)&&(M.copy(h).multiplyScalar(g.y).addScaledVector(f,-d.y).multiplyScalar(D),p.copy(f).multiplyScalar(d.x).addScaledVector(h,-g.x).multiplyScalar(D),o[x].add(M),o[w].add(M),o[I].add(M),l[x].add(p),l[w].add(p),l[I].add(p))}let S=this.groups;S.length===0&&(S=[{start:0,count:t.count}]);for(let x=0,w=S.length;x<w;++x){let I=S[x],D=I.start,O=I.count;for(let H=D,N=D+O;H<N;H+=3)m(t.getX(H+0),t.getX(H+1),t.getX(H+2))}let T=new P,y=new P,E=new P,v=new P;function A(x){E.fromBufferAttribute(s,x),v.copy(E);let w=o[x];T.copy(w),T.sub(E.multiplyScalar(E.dot(w))).normalize(),y.crossVectors(v,w);let D=y.dot(l[x])<0?-1:1;a.setXYZW(x,T.x,T.y,T.z,D)}for(let x=0,w=S.length;x<w;++x){let I=S[x],D=I.start,O=I.count;for(let H=D,N=D+O;H<N;H+=3)A(t.getX(H+0)),A(t.getX(H+1)),A(t.getX(H+2))}this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==e.count)i=new Ne(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let u=0,d=i.count;u<d;u++)i.setXYZ(u,0,0,0);let s=new P,r=new P,a=new P,o=new P,l=new P,c=new P,h=new P,f=new P;if(t)for(let u=0,d=t.count;u<d;u+=3){let g=t.getX(u+0),M=t.getX(u+1),p=t.getX(u+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,M),a.fromBufferAttribute(e,p),h.subVectors(a,r),f.subVectors(s,r),h.cross(f),o.fromBufferAttribute(i,g),l.fromBufferAttribute(i,M),c.fromBufferAttribute(i,p),o.add(h),l.add(h),c.add(h),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(M,l.x,l.y,l.z),i.setXYZ(p,c.x,c.y,c.z)}else for(let u=0,d=e.count;u<d;u+=3)s.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),a.fromBufferAttribute(e,u+2),h.subVectors(a,r),f.subVectors(s,r),h.cross(f),i.setXYZ(u+0,h.x,h.y,h.z),i.setXYZ(u+1,h.x,h.y,h.z),i.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Ce.fromBufferAttribute(t,e),Ce.normalize(),t.setXYZ(e,Ce.x,Ce.y,Ce.z)}toNonIndexed(){function t(o,l){let c=o.array,h=o.itemSize,f=o.normalized,u=new c.constructor(l.length*h),d=0,g=0;for(let M=0,p=l.length;M<p;M++){o.isInterleavedBufferAttribute?d=l[M]*o.data.stride+o.offset:d=l[M]*h;for(let m=0;m<h;m++)u[g++]=c[d++]}return new Ne(u,h,f)}if(this.index===null)return Ft("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new n,i=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=t(l,i);e.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let h=0,f=c.length;h<f;h++){let u=c[h],d=t(u,i);l.push(d)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let i=this.attributes;for(let l in i){let c=i[l];t.data.attributes[l]=c.toJSON(t.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let f=0,u=c.length;f<u;f++){let d=c[f];h.push(d.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let i=t.index;i!==null&&this.setIndex(i.clone());let s=t.attributes;for(let c in s){let h=s[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],f=r[c];for(let u=0,d=f.length;u<d;u++)h.push(f[u].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let c=0,h=a.length;c<h;c++){let f=a[c];this.addGroup(f.start,f.count,f.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},bl=new P,hd=new P,ud=new Vt,xn=class{constructor(t=new P(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){let s=bl.subVectors(i,e).cross(hd.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,i=!0){let s=t.delta(bl),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let a=-(t.start.dot(this.normal)+this.constant)/r;return i===!0&&(a<0||a>1)?null:e.copy(t.start).addScaledVector(s,a)}intersectsLine(t){let e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let i=e||ud.getNormalMatrix(t),s=this.coplanarPoint(bl).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},fd=0,Yn=class extends Pn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:fd++}),this.uuid=Ms(),this.name="",this.type="Material",this.blending=ys,this.side=di,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Yl,this.blendDst=Zl,this.blendEquation=Fi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Wt(0,0,0),this.blendAlpha=0,this.depthFunc=rs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=lu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ha,this.stencilZFail=ha,this.stencilZPass=ha,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let i=t[e];if(i===void 0){Ft(`Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Ft(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector2&&i&&i.isVector2||s&&s.isEuler&&i&&i.isEuler||s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(e){let r=s(t.textures),a=s(t.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new Wt().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(i=>new xn().fromJSON(i))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let i=t.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new ot().fromArray(i)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new ot().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,i=null;if(e!==null){let s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}},Xn=new P,Tl=new P,Zr=new P,$r=new P,ba=class{constructor(t=new P,e=new P(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Xn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Xn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Xn.copy(this.origin).addScaledVector(this.direction,e),Xn.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){Tl.copy(t).add(e).multiplyScalar(.5),Zr.copy(e).sub(t).normalize(),$r.copy(this.origin).sub(Tl);let r=t.distanceTo(e)*.5,a=-this.direction.dot(Zr),o=$r.dot(this.direction),l=-$r.dot(Zr),c=$r.lengthSq(),h=Math.abs(1-a*a),f,u,d,g;if(h>0)if(f=a*l-o,u=a*o-l,g=r*h,f>=0)if(u>=-g)if(u<=g){let M=1/h;f*=M,u*=M,d=f*(f+a*u+2*o)+u*(a*f+u+2*l)+c}else u=r,f=Math.max(0,-(a*u+o)),d=-f*f+u*(u+2*l)+c;else u=-r,f=Math.max(0,-(a*u+o)),d=-f*f+u*(u+2*l)+c;else u<=-g?(f=Math.max(0,-(-a*r+o)),u=f>0?-r:Math.min(Math.max(-r,-l),r),d=-f*f+u*(u+2*l)+c):u<=g?(f=0,u=Math.min(Math.max(-r,-l),r),d=u*(u+2*l)+c):(f=Math.max(0,-(a*r+o)),u=f>0?r:Math.min(Math.max(-r,-l),r),d=-f*f+u*(u+2*l)+c);else u=a>0?-r:r,f=Math.max(0,-(a*u+o)),d=-f*f+u*(u+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(Tl).addScaledVector(Zr,u),d}intersectSphere(t,e){if(t.radius<0)return null;Xn.subVectors(t.center,this.origin);let i=Xn.dot(this.direction),s=Xn.dot(Xn)-i*i,r=t.radius*t.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){let i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,a,o,l,c=1/this.direction.x,h=1/this.direction.y,f=1/this.direction.z,u=this.origin;return c>=0?(i=(t.min.x-u.x)*c,s=(t.max.x-u.x)*c):(i=(t.max.x-u.x)*c,s=(t.min.x-u.x)*c),h>=0?(r=(t.min.y-u.y)*h,a=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,a=(t.min.y-u.y)*h),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),f>=0?(o=(t.min.z-u.z)*f,l=(t.max.z-u.z)*f):(o=(t.max.z-u.z)*f,l=(t.min.z-u.z)*f),i>l||o>s)||((o>i||i!==i)&&(i=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,Xn)!==null}intersectTriangle(t,e,i,s,r){let a=this.origin,o=this.direction,l=o.x,c=o.y,h=o.z,f=t.x-a.x,u=t.y-a.y,d=t.z-a.z,g=e.x-a.x,M=e.y-a.y,p=e.z-a.z,m=i.x-a.x,S=i.y-a.y,T=i.z-a.z,y=Math.abs(l),E=Math.abs(c),v=Math.abs(h),A,x,w,I,D,O,H,N,C,B,k,j;if(y>=E&&y>=v?(w=l,O=f,C=g,j=m,l>=0?(A=c,x=h,I=u,D=d,H=M,N=p,B=S,k=T):(A=h,x=c,I=d,D=u,H=p,N=M,B=T,k=S)):E>=v?(w=c,O=u,C=M,j=S,c>=0?(A=h,x=l,I=d,D=f,H=p,N=g,B=T,k=m):(A=l,x=h,I=f,D=d,H=g,N=p,B=m,k=T)):(w=h,O=d,C=p,j=T,h>=0?(A=l,x=c,I=f,D=u,H=g,N=M,B=m,k=S):(A=c,x=l,I=u,D=f,H=M,N=g,B=S,k=m)),w===0)return null;let q=A/w,K=x/w,$=1/w,wt=I-q*O,bt=D-K*O,ne=H-q*C,Yt=N-K*C,te=B-q*j,J=k-K*j,et=te*Yt-J*ne,xt=wt*J-bt*te,Bt=ne*bt-Yt*wt;if(s){if(et<0||xt<0||Bt<0)return null}else if((et<0||xt<0||Bt<0)&&(et>0||xt>0||Bt>0))return null;let St=et+xt+Bt;if(St===0)return null;let zt=$*(et*O+xt*C+Bt*j);return(St>0?zt<0:zt>0)?null:this.at(zt/St,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Dn=class extends Yn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Wt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ze,this.combine=qa,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},yh=new jt,Ti=new ba,Jr=new ai,vh=new P,Kr=new P,Qr=new P,jr=new P,El=new P,ta=new P,Sh=new P,ea=new P,pe=class extends be{constructor(t=new Le,e=new Dn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){let i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;e.fromBufferAttribute(s,t);let o=this.morphTargetInfluences;if(r&&o){ta.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=o[l],f=r[l];h!==0&&(El.fromBufferAttribute(f,t),a?ta.addScaledVector(El,h):ta.addScaledVector(El.sub(e),h))}e.add(ta)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Jr.copy(i.boundingSphere),Jr.applyMatrix4(r),Ti.copy(t.ray).recast(t.near),!(Jr.containsPoint(Ti.origin)===!1&&(Ti.intersectSphere(Jr,vh)===null||Ti.origin.distanceToSquared(vh)>(t.far-t.near)**2))&&(yh.copy(r).invert(),Ti.copy(t.ray).applyMatrix4(yh),!(i.boundingBox!==null&&Ti.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,Ti)))}_computeIntersections(t,e,i){let s,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,f=r.attributes.normal,u=r.groups,d=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,M=u.length;g<M;g++){let p=u[g],m=a[p.materialIndex],S=Math.max(p.start,d.start),T=Math.min(o.count,Math.min(p.start+p.count,d.start+d.count));for(let y=S,E=T;y<E;y+=3){let v=o.getX(y),A=o.getX(y+1),x=o.getX(y+2);s=na(this,m,t,i,c,h,f,v,A,x),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{let g=Math.max(0,d.start),M=Math.min(o.count,d.start+d.count);for(let p=g,m=M;p<m;p+=3){let S=o.getX(p),T=o.getX(p+1),y=o.getX(p+2);s=na(this,a,t,i,c,h,f,S,T,y),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,M=u.length;g<M;g++){let p=u[g],m=a[p.materialIndex],S=Math.max(p.start,d.start),T=Math.min(l.count,Math.min(p.start+p.count,d.start+d.count));for(let y=S,E=T;y<E;y+=3){let v=y,A=y+1,x=y+2;s=na(this,m,t,i,c,h,f,v,A,x),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{let g=Math.max(0,d.start),M=Math.min(l.count,d.start+d.count);for(let p=g,m=M;p<m;p+=3){let S=p,T=p+1,y=p+2;s=na(this,a,t,i,c,h,f,S,T,y),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}}};er=class extends We{constructor(t=null,e=1,i=1,s,r,a,o,l,c=Pe,h=Pe,f,u){super(null,a,o,l,c,h,s,r,f,u),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},us=class extends Ne{constructor(t,e,i,s=1){super(t,e,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},ts=new jt,Mh=new jt,ia=[],bh=new Ln,pd=new jt,Vs=new pe,Gs=new ai,nr=class extends pe{constructor(t,e,i){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new us(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,pd)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Ln),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,ts),bh.copy(t.boundingBox).applyMatrix4(ts),this.boundingBox.union(bh)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new ai),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,ts),Gs.copy(t.boundingSphere).applyMatrix4(ts),this.boundingSphere.union(Gs)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){return this.instanceColor===null?e.setRGB(1,1,1):e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let i=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=i.length+1,a=t*r+1;for(let o=0;o<i.length;o++)i[o]=s[a+o]}raycast(t,e){let i=this.matrixWorld,s=this.count;if(Vs.geometry=this.geometry,Vs.material=this.material,Vs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Gs.copy(this.boundingSphere),Gs.applyMatrix4(i),t.ray.intersectsSphere(Gs)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,ts),Mh.multiplyMatrices(i,ts),Vs.matrixWorld=Mh,Vs.raycast(t,ia);for(let a=0,o=ia.length;a<o;a++){let l=ia[a];l.instanceId=r,l.object=this,e.push(l)}ia.length=0}}setColorAt(t,e){return this.instanceColor===null&&(this.instanceColor=new us(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,e){return e.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,e){let i=e.morphTargetInfluences,s=i.length+1;this.morphTexture===null&&(this.morphTexture=new er(new Float32Array(s*this.count),s,this.count,ja,un));let r=this.morphTexture.source.data.data,a=0;for(let c=0;c<i.length;c++)a+=i[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=s*t;return r[l]=o,r.set(i,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Ei=new ai,md=new ot(.5,.5),sa=new P,oi=class{constructor(t=new xn,e=new xn,i=new xn,s=new xn,r=new xn,a=new xn){this.planes=[t,e,i,s,r,a]}set(t,e,i,s,r,a){let o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){let e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=_n,i=!1){let s=this.planes,r=t.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],f=r[5],u=r[6],d=r[7],g=r[8],M=r[9],p=r[10],m=r[11],S=r[12],T=r[13],y=r[14],E=r[15];if(s[0].setComponents(c-a,d-h,m-g,E-S).normalize(),s[1].setComponents(c+a,d+h,m+g,E+S).normalize(),s[2].setComponents(c+o,d+f,m+M,E+T).normalize(),s[3].setComponents(c-o,d-f,m-M,E-T).normalize(),i)s[4].setComponents(l,u,p,y).normalize(),s[5].setComponents(c-l,d-u,m-p,E-y).normalize();else if(s[4].setComponents(c-l,d-u,m-p,E-y).normalize(),e===_n)s[5].setComponents(c+l,d+u,m+p,E+y).normalize();else if(e===os)s[5].setComponents(l,u,p,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ei.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Ei.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ei)}intersectsSprite(t){Ei.center.set(0,0,0);let e=md.distanceTo(t.center);return Ei.radius=.7071067811865476+e,Ei.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ei)}intersectsSphere(t){let e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let i=0;i<6;i++){let s=e[i];if(sa.x=s.normal.x>0?t.max.x:t.min.x,sa.y=s.normal.y>0?t.max.y:t.min.y,sa.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(sa)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},ir=class extends We{constructor(t=[],e=pi,i,s,r,a,o,l,c,h){super(t,e,i,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},Zn=class extends We{constructor(t,e,i,s,r,a,o,l,c){super(t,e,i,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},li=class extends We{constructor(t,e,i=vn,s,r,a,o=Pe,l=Pe,c,h=In,f=1){if(h!==In&&h!==mi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:t,height:e,depth:f};super(u,s,r,a,o,l,h,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new cs(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},Ta=class extends li{constructor(t,e=vn,i=pi,s,r,a=Pe,o=Pe,l,c=In){let h={width:t,height:t,depth:1},f=[h,h,h,h,h,h];super(t,t,e,i,s,r,a,o,l,c),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},sr=class extends We{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},Nn=class n extends Le{constructor(t=1,e=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],h=[],f=[],u=0,d=0;g("z","y","x",-1,-1,i,e,t,a,r,0),g("z","y","x",1,-1,i,e,-t,a,r,1),g("x","z","y",1,1,t,i,e,s,a,2),g("x","z","y",1,-1,t,i,-e,s,a,3),g("x","y","z",1,-1,t,e,i,s,r,4),g("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new oe(c,3)),this.setAttribute("normal",new oe(h,3)),this.setAttribute("uv",new oe(f,2));function g(M,p,m,S,T,y,E,v,A,x,w){let I=y/A,D=E/x,O=y/2,H=E/2,N=v/2,C=A+1,B=x+1,k=0,j=0,q=new P;for(let K=0;K<B;K++){let $=K*D-H;for(let wt=0;wt<C;wt++){let bt=wt*I-O;q[M]=bt*S,q[p]=$*T,q[m]=N,c.push(q.x,q.y,q.z),q[M]=0,q[p]=0,q[m]=v>0?1:-1,h.push(q.x,q.y,q.z),f.push(wt/A),f.push(1-K/x),k+=1}}for(let K=0;K<x;K++)for(let $=0;$<A;$++){let wt=u+$+C*K,bt=u+$+C*(K+1),ne=u+($+1)+C*(K+1),Yt=u+($+1)+C*K;l.push(wt,bt,Yt),l.push(bt,ne,Yt),j+=6}o.addGroup(d,j,w),d+=j,u+=k}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},Ii=class n extends Le{constructor(t=1,e=1,i=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let h=[],f=[],u=[],d=[],g=0,M=[],p=i/2,m=0;S(),a===!1&&(t>0&&T(!0),e>0&&T(!1)),this.setIndex(h),this.setAttribute("position",new oe(f,3)),this.setAttribute("normal",new oe(u,3)),this.setAttribute("uv",new oe(d,2));function S(){let y=new P,E=new P,v=0,A=(e-t)/i;for(let x=0;x<=r;x++){let w=[],I=x/r,D=I*(e-t)+t;for(let O=0;O<=s;O++){let H=O/s,N=H*l+o,C=Math.sin(N),B=Math.cos(N);E.x=D*C,E.y=-I*i+p,E.z=D*B,f.push(E.x,E.y,E.z),y.set(C,A,B).normalize(),u.push(y.x,y.y,y.z),d.push(H,1-I),w.push(g++)}M.push(w)}for(let x=0;x<s;x++)for(let w=0;w<r;w++){let I=M[w][x],D=M[w+1][x],O=M[w+1][x+1],H=M[w][x+1];(t>0||w!==0)&&(h.push(I,D,H),v+=3),(e>0||w!==r-1)&&(h.push(D,O,H),v+=3)}c.addGroup(m,v,0),m+=v}function T(y){let E=g,v=new ot,A=new P,x=0,w=y===!0?t:e,I=y===!0?1:-1;for(let O=1;O<=s;O++)f.push(0,p*I,0),u.push(0,I,0),d.push(.5,.5),g++;let D=g;for(let O=0;O<=s;O++){let N=O/s*l+o,C=Math.cos(N),B=Math.sin(N);A.x=w*B,A.y=p*I,A.z=w*C,f.push(A.x,A.y,A.z),u.push(0,I,0),v.x=C*.5+.5,v.y=B*.5*I+.5,d.push(v.x,v.y),g++}for(let O=0;O<s;O++){let H=E+O,N=D+O;y===!0?h.push(N,N+1,H):h.push(N+1,N,H),x+=3}c.addGroup(m,x,y===!0?1:2),m+=x}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},rr=class n extends Ii{constructor(t=1,e=1,i=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,i,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new n(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},fs=class n extends Le{constructor(t=[],e=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:i,detail:s};let r=[],a=[];o(s),c(i),h(),this.setAttribute("position",new oe(r,3)),this.setAttribute("normal",new oe(r.slice(),3)),this.setAttribute("uv",new oe(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(S){let T=new P,y=new P,E=new P;for(let v=0;v<e.length;v+=3)d(e[v+0],T),d(e[v+1],y),d(e[v+2],E),l(T,y,E,S)}function l(S,T,y,E){let v=E+1,A=[];for(let x=0;x<=v;x++){A[x]=[];let w=S.clone().lerp(y,x/v),I=T.clone().lerp(y,x/v),D=v-x;for(let O=0;O<=D;O++)O===0&&x===v?A[x][O]=w:A[x][O]=w.clone().lerp(I,O/D)}for(let x=0;x<v;x++)for(let w=0;w<2*(v-x)-1;w++){let I=Math.floor(w/2);w%2===0?(u(A[x][I+1]),u(A[x+1][I]),u(A[x][I])):(u(A[x][I+1]),u(A[x+1][I+1]),u(A[x+1][I]))}}function c(S){let T=new P;for(let y=0;y<r.length;y+=3)T.x=r[y+0],T.y=r[y+1],T.z=r[y+2],T.normalize().multiplyScalar(S),r[y+0]=T.x,r[y+1]=T.y,r[y+2]=T.z}function h(){let S=new P;for(let T=0;T<r.length;T+=3){S.x=r[T+0],S.y=r[T+1],S.z=r[T+2];let y=p(S)/2/Math.PI+.5,E=m(S)/Math.PI+.5;a.push(y,1-E)}g(),f()}function f(){for(let S=0;S<a.length;S+=6){let T=a[S+0],y=a[S+2],E=a[S+4],v=Math.max(T,y,E),A=Math.min(T,y,E);v>.9&&A<.1&&(T<.2&&(a[S+0]+=1),y<.2&&(a[S+2]+=1),E<.2&&(a[S+4]+=1))}}function u(S){r.push(S.x,S.y,S.z)}function d(S,T){let y=S*3;T.x=t[y+0],T.y=t[y+1],T.z=t[y+2]}function g(){let S=new P,T=new P,y=new P,E=new P,v=new ot,A=new ot,x=new ot;for(let w=0,I=0;w<r.length;w+=9,I+=6){S.set(r[w+0],r[w+1],r[w+2]),T.set(r[w+3],r[w+4],r[w+5]),y.set(r[w+6],r[w+7],r[w+8]),v.set(a[I+0],a[I+1]),A.set(a[I+2],a[I+3]),x.set(a[I+4],a[I+5]),E.copy(S).add(T).add(y).divideScalar(3);let D=p(E);M(v,I+0,S,D),M(A,I+2,T,D),M(x,I+4,y,D)}}function M(S,T,y,E){E<0&&S.x===1&&(a[T]=S.x-1),y.x===0&&y.z===0&&(a[T]=E/2/Math.PI+.5)}function p(S){return Math.atan2(S.z,-S.x)}function m(S){return Math.atan2(-S.y,Math.sqrt(S.x*S.x+S.z*S.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.vertices,t.indices,t.radius,t.detail)}},je=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Ft("Curve: .getPoint() not implemented.")}getPointAt(t,e){let i=this.getUtoTmapping(t);return this.getPoint(i,e)}getPoints(t=5){let e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return e}getSpacedPoints(t=5){let e=[];for(let i=0;i<=t;i++)e.push(this.getPointAt(i/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],i,s=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)i=this.getPoint(a/t),r+=i.distanceTo(s),e.push(r),s=i;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){let i=this.getLengths(),s=0,r=i.length,a;e?a=e:a=t*i[r-1];let o=0,l=r-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=i[s]-a,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,i[s]===a)return s/(r-1);let h=i[s],u=i[s+1]-h,d=(a-h)/u;return(s+d)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let a=this.getPoint(s),o=this.getPoint(r),l=e||(a.isVector2?new ot:new P);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){let i=this.getUtoTmapping(t);return this.getTangent(i,e)}computeFrenetFrames(t,e=!1){let i=new P,s=[],r=[],a=[],o=new P,l=new jt;for(let d=0;d<=t;d++){let g=d/t;s[d]=this.getTangentAt(g,new P)}r[0]=new P,a[0]=new P;let c=Number.MAX_VALUE,h=Math.abs(s[0].x),f=Math.abs(s[0].y),u=Math.abs(s[0].z);h<=c&&(c=h,i.set(1,0,0)),f<=c&&(c=f,i.set(0,1,0)),u<=c&&i.set(0,0,1),o.crossVectors(s[0],i).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let d=1;d<=t;d++){if(r[d]=r[d-1].clone(),a[d]=a[d-1].clone(),o.crossVectors(s[d-1],s[d]),o.length()>Number.EPSILON){o.normalize();let g=Math.acos(Jt(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(l.makeRotationAxis(o,g))}a[d].crossVectors(s[d],r[d])}if(e===!0){let d=Math.acos(Jt(r[0].dot(r[t]),-1,1));d/=t,s[0].dot(o.crossVectors(r[0],r[t]))>0&&(d=-d);for(let g=1;g<=t;g++)r[g].applyMatrix4(l.makeRotationAxis(s[g],d*g)),a[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},ds=class extends je{constructor(t=0,e=0,i=1,s=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=i,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new ot){let i=e,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);let o=this.aStartAngle+t*r,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),f=Math.sin(this.aRotation),u=l-this.aX,d=c-this.aY;l=u*h-d*f+this.aX,c=u*f+d*h+this.aY}return i.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},Ea=class extends ds{constructor(t,e,i,s,r,a){super(t,e,i,i,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};Th=new P,Eh=new P,Al=new hc,wl=new hc,Rl=new hc,ps=class extends je{constructor(t=[],e=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=i,this.tension=s}getPoint(t,e=new P){let i=e,s=this.points,r=s.length,a=(r-(this.closed?0:1))*t,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=s[(o-1)%r]:(Eh.subVectors(s[0],s[1]).add(s[0]),c=Eh);let f=s[o%r],u=s[(o+1)%r];if(this.closed||o+2<r?h=s[(o+2)%r]:(Th.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=Th),this.curveType==="centripetal"||this.curveType==="chordal"){let d=this.curveType==="chordal"?.5:.25,g=Math.pow(c.distanceToSquared(f),d),M=Math.pow(f.distanceToSquared(u),d),p=Math.pow(u.distanceToSquared(h),d);M<1e-4&&(M=1),g<1e-4&&(g=M),p<1e-4&&(p=M),Al.initNonuniformCatmullRom(c.x,f.x,u.x,h.x,g,M,p),wl.initNonuniformCatmullRom(c.y,f.y,u.y,h.y,g,M,p),Rl.initNonuniformCatmullRom(c.z,f.z,u.z,h.z,g,M,p)}else this.curveType==="catmullrom"&&(Al.initCatmullRom(c.x,f.x,u.x,h.x,this.tension),wl.initCatmullRom(c.y,f.y,u.y,h.y,this.tension),Rl.initCatmullRom(c.z,f.z,u.z,h.z,this.tension));return i.set(Al.calc(l),wl.calc(l),Rl.calc(l)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){let s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(new P().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};ar=class extends je{constructor(t=new ot,e=new ot,i=new ot,s=new ot){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new ot){let i=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return i.set(Xs(t,s.x,r.x,a.x,o.x),Xs(t,s.y,r.y,a.y,o.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Aa=class extends je{constructor(t=new P,e=new P,i=new P,s=new P){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new P){let i=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return i.set(Xs(t,s.x,r.x,a.x,o.x),Xs(t,s.y,r.y,a.y,o.y),Xs(t,s.z,r.z,a.z,o.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},or=class extends je{constructor(t=new ot,e=new ot){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new ot){let i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new ot){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},wa=class extends je{constructor(t=new P,e=new P){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new P){let i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new P){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},lr=class extends je{constructor(t=new ot,e=new ot,i=new ot){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new ot){let i=e,s=this.v0,r=this.v1,a=this.v2;return i.set(Ws(t,s.x,r.x,a.x),Ws(t,s.y,r.y,a.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},cr=class extends je{constructor(t=new P,e=new P,i=new P){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new P){let i=e,s=this.v0,r=this.v1,a=this.v2;return i.set(Ws(t,s.x,r.x,a.x),Ws(t,s.y,r.y,a.y),Ws(t,s.z,r.z,a.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},hr=class extends je{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new ot){let i=e,s=this.points,r=(s.length-1)*t,a=Math.floor(r),o=r-a,l=s[a===0?a:a-1],c=s[a],h=s[a>s.length-2?s.length-1:a+1],f=s[a>s.length-3?s.length-1:a+2];return i.set(Ah(o,l.x,c.x,h.x,f.x),Ah(o,l.y,c.y,h.y,f.y)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){let s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(new ot().fromArray(s))}return this}},Ra=Object.freeze({__proto__:null,ArcCurve:Ea,CatmullRomCurve3:ps,CubicBezierCurve:ar,CubicBezierCurve3:Aa,EllipseCurve:ds,LineCurve:or,LineCurve3:wa,QuadraticBezierCurve:lr,QuadraticBezierCurve3:cr,SplineCurve:hr}),Ca=class extends je{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let i=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Ra[i](e,t))}return this}getPoint(t,e){let i=t*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=i){let a=s[r]-i,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let i=0,s=this.curves.length;i<s;i++)e+=this.curves[i].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],i;for(let s=0,r=this.curves;s<r.length;s++){let a=r[s],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,l=a.getPoints(o);for(let c=0;c<l.length;c++){let h=l[c];i&&i.equals(h)||(e.push(h),i=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){let s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,i=this.curves.length;e<i;e++){let s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){let s=t.curves[e];this.curves.push(new Ra[s.type]().fromJSON(s))}return this}},Pi=class extends Ca{constructor(t){super(),this.type="Path",this.currentPoint=new ot,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,i=t.length;e<i;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let i=new or(this.currentPoint.clone(),new ot(t,e));return this.curves.push(i),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,i,s){let r=new lr(this.currentPoint.clone(),new ot(t,e),new ot(i,s));return this.curves.push(r),this.currentPoint.set(i,s),this}bezierCurveTo(t,e,i,s,r,a){let o=new ar(this.currentPoint.clone(),new ot(t,e),new ot(i,s),new ot(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),i=new hr(e);return this.curves.push(i),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,i,s,r,a){let o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+o,e+l,i,s,r,a),this}absarc(t,e,i,s,r,a){return this.absellipse(t,e,i,i,s,r,a),this}ellipse(t,e,i,s,r,a,o,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,i,s,r,a,o,l),this}absellipse(t,e,i,s,r,a,o,l){let c=new ds(t,e,i,s,r,a,o,l);if(this.curves.length>0){let f=c.getPoint(0);f.equals(this.currentPoint)||this.lineTo(f.x,f.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},ci=class extends Pi{constructor(t){super(t),this.uuid=Ms(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let i=0,s=this.holes.length;i<s;i++)e[i]=this.holes[i].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){let s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,i=this.holes.length;e<i;e++){let s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){let s=t.holes[e];this.holes.push(new Pi().fromJSON(s))}return this}};Bl=class{static triangulate(t,e,i=2){return bd(t,e,i)}},wi=class n{static area(t){let e=t.length,i=0;for(let s=e-1,r=0;r<e;s=r++)i+=t[s].x*t[r].y-t[r].x*t[s].y;return i*.5}static isClockWise(t){return n.area(t)<0}static triangulateShape(t,e){let i=[],s=[],r=[];Rh(t),Ch(i,t);let a=t.length;e.forEach(Rh);for(let l=0;l<e.length;l++)s.push(a),a+=e[l].length,Ch(i,e[l]);let o=Bl.triangulate(i,s);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}};Di=class n extends Le{constructor(t=new ci([new ot(.5,.5),new ot(-.5,.5),new ot(-.5,-.5),new ot(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];let i=this,s=[],r=[];for(let o=0,l=t.length;o<l;o++){let c=t[o];a(c)}this.setAttribute("position",new oe(s,3)),this.setAttribute("uv",new oe(r,2)),this.computeVertexNormals();function a(o){let l=[],c=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,f=e.depth!==void 0?e.depth:1,u=e.bevelEnabled!==void 0?e.bevelEnabled:!0,d=e.bevelThickness!==void 0?e.bevelThickness:.2,g=e.bevelSize!==void 0?e.bevelSize:d-.1,M=e.bevelOffset!==void 0?e.bevelOffset:0,p=e.bevelSegments!==void 0?e.bevelSegments:3,m=e.extrudePath,S=e.UVGenerator!==void 0?e.UVGenerator:kd,T,y=!1,E,v,A,x;if(m){T=m.getSpacedPoints(h),y=!0,u=!1;let nt=m.isCatmullRomCurve3?m.closed:!1;E=m.computeFrenetFrames(h,nt),v=new P,A=new P,x=new P}u||(p=0,d=0,g=0,M=0);let w=o.extractPoints(c),I=w.shape,D=w.holes;if(!wi.isClockWise(I)){I=I.reverse();for(let nt=0,st=D.length;nt<st;nt++){let rt=D[nt];wi.isClockWise(rt)&&(D[nt]=rt.reverse())}}function H(nt){let rt=10000000000000001e-36,at=nt[0];for(let ht=1;ht<=nt.length;ht++){let Nt=ht%nt.length,Dt=nt[Nt],kt=Dt.x-at.x,Gt=Dt.y-at.y,L=kt*kt+Gt*Gt,ie=Math.max(Math.abs(Dt.x),Math.abs(Dt.y),Math.abs(at.x),Math.abs(at.y)),Zt=rt*ie*ie;if(L<=Zt){nt.splice(Nt,1),ht--;continue}at=Dt}}H(I),D.forEach(H);let N=D.length,C=I;for(let nt=0;nt<N;nt++){let st=D[nt];I=I.concat(st)}function B(nt,st,rt){return st||Ot("ExtrudeGeometry: vec does not exist"),nt.clone().addScaledVector(st,rt)}let k=I.length;function j(nt,st,rt){let at,ht,Nt,Dt=nt.x-st.x,kt=nt.y-st.y,Gt=rt.x-nt.x,L=rt.y-nt.y,ie=Dt*Dt+kt*kt,Zt=Dt*L-kt*Gt;if(Math.abs(Zt)>Number.EPSILON){let R=Math.sqrt(ie),_=Math.sqrt(Gt*Gt+L*L),z=st.x-kt/R,W=st.y+Dt/R,Y=rt.x-L/_,lt=rt.y+Gt/_,ct=((Y-z)*L-(lt-W)*Gt)/(Dt*L-kt*Gt);at=z+Dt*ct-nt.x,ht=W+kt*ct-nt.y;let Z=at*at+ht*ht;if(Z<=2)return new ot(at,ht);Nt=Math.sqrt(Z/2)}else{let R=!1;Dt>Number.EPSILON?Gt>Number.EPSILON&&(R=!0):Dt<-Number.EPSILON?Gt<-Number.EPSILON&&(R=!0):Math.sign(kt)===Math.sign(L)&&(R=!0),R?(at=-kt,ht=Dt,Nt=Math.sqrt(ie)):(at=Dt,ht=kt,Nt=Math.sqrt(ie/2))}return new ot(at/Nt,ht/Nt)}let q=[];for(let nt=0,st=C.length,rt=st-1,at=nt+1;nt<st;nt++,rt++,at++)rt===st&&(rt=0),at===st&&(at=0),q[nt]=j(C[nt],C[rt],C[at]);let K=[],$,wt=q.concat();for(let nt=0,st=N;nt<st;nt++){let rt=D[nt];$=[];for(let at=0,ht=rt.length,Nt=ht-1,Dt=at+1;at<ht;at++,Nt++,Dt++)Nt===ht&&(Nt=0),Dt===ht&&(Dt=0),$[at]=j(rt[at],rt[Nt],rt[Dt]);K.push($),wt=wt.concat($)}let bt;if(p===0)bt=wi.triangulateShape(C,D);else{let nt=[],st=[];for(let rt=0;rt<p;rt++){let at=rt/p,ht=d*Math.cos(at*Math.PI/2),Nt=g*Math.sin(at*Math.PI/2)+M;for(let Dt=0,kt=C.length;Dt<kt;Dt++){let Gt=B(C[Dt],q[Dt],Nt);xt(Gt.x,Gt.y,-ht),at===0&&nt.push(Gt)}for(let Dt=0,kt=N;Dt<kt;Dt++){let Gt=D[Dt];$=K[Dt];let L=[];for(let ie=0,Zt=Gt.length;ie<Zt;ie++){let R=B(Gt[ie],$[ie],Nt);xt(R.x,R.y,-ht),at===0&&L.push(R)}at===0&&st.push(L)}}bt=wi.triangulateShape(nt,st)}let ne=bt.length,Yt=g+M;for(let nt=0;nt<k;nt++){let st=u?B(I[nt],wt[nt],Yt):I[nt];y?(A.copy(E.normals[0]).multiplyScalar(st.x),v.copy(E.binormals[0]).multiplyScalar(st.y),x.copy(T[0]).add(A).add(v),xt(x.x,x.y,x.z)):xt(st.x,st.y,0)}for(let nt=1;nt<=h;nt++)for(let st=0;st<k;st++){let rt=u?B(I[st],wt[st],Yt):I[st];y?(A.copy(E.normals[nt]).multiplyScalar(rt.x),v.copy(E.binormals[nt]).multiplyScalar(rt.y),x.copy(T[nt]).add(A).add(v),xt(x.x,x.y,x.z)):xt(rt.x,rt.y,f/h*nt)}for(let nt=p-1;nt>=0;nt--){let st=nt/p,rt=d*Math.cos(st*Math.PI/2),at=g*Math.sin(st*Math.PI/2)+M;for(let ht=0,Nt=C.length;ht<Nt;ht++){let Dt=B(C[ht],q[ht],at);xt(Dt.x,Dt.y,f+rt)}for(let ht=0,Nt=D.length;ht<Nt;ht++){let Dt=D[ht];$=K[ht];for(let kt=0,Gt=Dt.length;kt<Gt;kt++){let L=B(Dt[kt],$[kt],at);y?xt(L.x,L.y+T[h-1].y,T[h-1].x+rt):xt(L.x,L.y,f+rt)}}}te(),J();function te(){let nt=s.length/3;if(u){let st=0,rt=k*st;for(let at=0;at<ne;at++){let ht=bt[at];Bt(ht[2]+rt,ht[1]+rt,ht[0]+rt)}st=h+p*2,rt=k*st;for(let at=0;at<ne;at++){let ht=bt[at];Bt(ht[0]+rt,ht[1]+rt,ht[2]+rt)}}else{for(let st=0;st<ne;st++){let rt=bt[st];Bt(rt[2],rt[1],rt[0])}for(let st=0;st<ne;st++){let rt=bt[st];Bt(rt[0]+k*h,rt[1]+k*h,rt[2]+k*h)}}i.addGroup(nt,s.length/3-nt,0)}function J(){let nt=s.length/3,st=0;et(C,st),st+=C.length;for(let rt=0,at=D.length;rt<at;rt++){let ht=D[rt];et(ht,st),st+=ht.length}i.addGroup(nt,s.length/3-nt,1)}function et(nt,st){let rt=nt.length;for(;--rt>=0;){let at=rt,ht=rt-1;ht<0&&(ht=nt.length-1);for(let Nt=0,Dt=h+p*2;Nt<Dt;Nt++){let kt=k*Nt,Gt=k*(Nt+1),L=st+at+kt,ie=st+ht+kt,Zt=st+ht+Gt,R=st+at+Gt;St(L,ie,Zt,R)}}}function xt(nt,st,rt){l.push(nt),l.push(st),l.push(rt)}function Bt(nt,st,rt){zt(nt),zt(st),zt(rt);let at=s.length/3,ht=S.generateTopUV(i,s,at-3,at-2,at-1);le(ht[0]),le(ht[1]),le(ht[2])}function St(nt,st,rt,at){zt(nt),zt(st),zt(at),zt(st),zt(rt),zt(at);let ht=s.length/3,Nt=S.generateSideWallUV(i,s,ht-6,ht-3,ht-2,ht-1);le(Nt[0]),le(Nt[1]),le(Nt[3]),le(Nt[1]),le(Nt[2]),le(Nt[3])}function zt(nt){s.push(l[nt*3+0]),s.push(l[nt*3+1]),s.push(l[nt*3+2])}function le(nt){r.push(nt.x),r.push(nt.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes,i=this.parameters.options;return Vd(e,i,t)}static fromJSON(t,e){let i=[];for(let r=0,a=t.shapes.length;r<a;r++){let o=e[t.shapes[r]];i.push(o)}let s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new Ra[s.type]().fromJSON(s)),new n(i,t.options)}},kd={generateTopUV:function(n,t,e,i,s){let r=t[e*3],a=t[e*3+1],o=t[i*3],l=t[i*3+1],c=t[s*3],h=t[s*3+1];return[new ot(r,a),new ot(o,l),new ot(c,h)]},generateSideWallUV:function(n,t,e,i,s,r){let a=t[e*3],o=t[e*3+1],l=t[e*3+2],c=t[i*3],h=t[i*3+1],f=t[i*3+2],u=t[s*3],d=t[s*3+1],g=t[s*3+2],M=t[r*3],p=t[r*3+1],m=t[r*3+2];return Math.abs(o-h)<Math.abs(a-c)?[new ot(a,1-l),new ot(c,1-f),new ot(u,1-g),new ot(M,1-m)]:[new ot(o,1-l),new ot(h,1-f),new ot(d,1-g),new ot(p,1-m)]}};pr=class n extends fs{constructor(t=1,e=0){let i=(1+Math.sqrt(5))/2,s=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new n(t.radius,t.detail)}},mr=class n extends fs{constructor(t=1,e=0){let i=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(i,s,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new n(t.radius,t.detail)}},$n=class n extends Le{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};let r=t/2,a=e/2,o=Math.floor(i),l=Math.floor(s),c=o+1,h=l+1,f=t/o,u=e/l,d=[],g=[],M=[],p=[];for(let m=0;m<h;m++){let S=m*u-a;for(let T=0;T<c;T++){let y=T*f-r;g.push(y,-S,0),M.push(0,0,1),p.push(T/o),p.push(1-m/l)}}for(let m=0;m<l;m++)for(let S=0;S<o;S++){let T=S+c*m,y=S+c*(m+1),E=S+1+c*(m+1),v=S+1+c*m;d.push(T,y,v),d.push(y,E,v)}this.setIndex(d),this.setAttribute("position",new oe(g,3)),this.setAttribute("normal",new oe(M,3)),this.setAttribute("uv",new oe(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.width,t.height,t.widthSegments,t.heightSegments)}},Ue=class n extends Le{constructor(t=1,e=32,i=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));let l=Math.min(a+o,Math.PI),c=0,h=[],f=new P,u=new P,d=[],g=[],M=[],p=[];for(let m=0;m<=i;m++){let S=[],T=m/i,y=a+T*o,E=t*Math.cos(y),v=Math.sqrt(t*t-E*E),A=0;m===0&&a===0?A=.5/e:m===i&&l===Math.PI&&(A=-.5/e);for(let x=0;x<=e;x++){let w=x/e,I=s+w*r;f.x=-v*Math.cos(I),f.y=E,f.z=v*Math.sin(I),g.push(f.x,f.y,f.z),u.copy(f).normalize(),M.push(u.x,u.y,u.z),p.push(w+A,1-T),S.push(c++)}h.push(S)}for(let m=0;m<i;m++)for(let S=0;S<e;S++){let T=h[m][S+1],y=h[m][S],E=h[m+1][S],v=h[m+1][S+1];(m!==0||a>0)&&d.push(T,y,v),(m!==i-1||l<Math.PI)&&d.push(y,E,v)}this.setIndex(d),this.setAttribute("position",new oe(g,3)),this.setAttribute("normal",new oe(M,3)),this.setAttribute("uv",new oe(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}},gr=class n extends fs{constructor(t=1,e=0){let i=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],s=[2,1,0,0,3,2,1,3,0,2,3,1];super(i,s,t,e),this.type="TetrahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new n(t.radius,t.detail)}},hn=class n extends Le{constructor(t=1,e=.4,i=12,s=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:i,tubularSegments:s,arc:r,thetaStart:a,thetaLength:o},i=Math.floor(i),s=Math.floor(s);let l=[],c=[],h=[],f=[],u=new P,d=new P,g=new P;for(let M=0;M<=i;M++){let p=a+M/i*o;for(let m=0;m<=s;m++){let S=m/s*r;d.x=(t+e*Math.cos(p))*Math.cos(S),d.y=(t+e*Math.cos(p))*Math.sin(S),d.z=e*Math.sin(p),c.push(d.x,d.y,d.z),u.x=t*Math.cos(S),u.y=t*Math.sin(S),g.subVectors(d,u).normalize(),h.push(g.x,g.y,g.z),f.push(m/s),f.push(M/i)}}for(let M=1;M<=i;M++)for(let p=1;p<=s;p++){let m=(s+1)*M+p-1,S=(s+1)*(M-1)+p-1,T=(s+1)*(M-1)+p,y=(s+1)*M+p;l.push(m,S,y),l.push(S,T,y)}this.setIndex(l),this.setAttribute("position",new oe(c,3)),this.setAttribute("normal",new oe(h,3)),this.setAttribute("uv",new oe(f,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}},xr=class n extends Le{constructor(t=new cr(new P(-1,-1,0),new P(-1,1,0),new P(1,1,0)),e=64,i=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:i,radialSegments:s,closed:r};let a=t.computeFrenetFrames(e,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new P,l=new P,c=new ot,h=new P,f=[],u=[],d=[],g=[];M(),this.setIndex(g),this.setAttribute("position",new oe(f,3)),this.setAttribute("normal",new oe(u,3)),this.setAttribute("uv",new oe(d,2));function M(){for(let T=0;T<e;T++)p(T);p(r===!1?e:0),S(),m()}function p(T){h=t.getPointAt(T/e,h);let y=a.normals[T],E=a.binormals[T];for(let v=0;v<=s;v++){let A=v/s*Math.PI*2,x=Math.sin(A),w=-Math.cos(A);l.x=w*y.x+x*E.x,l.y=w*y.y+x*E.y,l.z=w*y.z+x*E.z,l.normalize(),u.push(l.x,l.y,l.z),o.x=h.x+i*l.x,o.y=h.y+i*l.y,o.z=h.z+i*l.z,f.push(o.x,o.y,o.z)}}function m(){for(let T=1;T<=e;T++)for(let y=1;y<=s;y++){let E=(s+1)*(T-1)+(y-1),v=(s+1)*T+(y-1),A=(s+1)*T+y,x=(s+1)*(T-1)+y;g.push(E,v,x),g.push(v,A,x)}}function S(){for(let T=0;T<=e;T++)for(let y=0;y<=s;y++)c.x=T/e,c.y=y/s,d.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new n(new Ra[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}};Eu={clone:Oi,merge:ke},Hd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Wd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,tn=class extends Yn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Hd,this.fragmentShader=Wd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Oi(t.uniforms),this.uniformsGroups=Gd(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let i={};for(let s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let i in t.uniforms){let s=t.uniforms[i];switch(this.uniforms[i]={},s.type){case"t":this.uniforms[i].value=e[s.value]||null;break;case"c":this.uniforms[i].value=new Wt().setHex(s.value);break;case"v2":this.uniforms[i].value=new ot().fromArray(s.value);break;case"v3":this.uniforms[i].value=new P().fromArray(s.value);break;case"v4":this.uniforms[i].value=new _e().fromArray(s.value);break;case"m3":this.uniforms[i].value=new Vt().fromArray(s.value);break;case"m4":this.uniforms[i].value=new jt().fromArray(s.value);break;default:this.uniforms[i].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let i in t.extensions)this.extensions[i]=t.extensions[i];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},Ia=class extends tn{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},$e=class extends Yn{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Wt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Wt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Nr,this.normalScale=new ot(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ze,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},_r=class extends Yn{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Wt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Wt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Nr,this.normalScale=new ot(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ze,this.combine=qa,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.envMapIntensity=t.envMapIntensity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},Pa=class extends Yn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=au,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},La=class extends Yn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};hi=class{constructor(t,e,i,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(i),this.sampleValues=e,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,i=this._cachedIndex,s=e[i],r=e[i-1];n:{t:{let a;e:{i:if(!(t<s)){for(let o=i+2;;){if(s===void 0){if(t<r)break i;return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(r=s,s=e[++i],t<s)break t}a=e.length;break e}if(!(t>=r)){let o=e[1];t<o&&(i=2,r=o);for(let l=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(s=r,r=e[--i-1],t>=r)break t}a=i,i=0;break e}break n}for(;i<a;){let o=i+a>>>1;t<e[o]?a=o:i=o+1}if(s=e[i],r=e[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,s)}return this.interpolate_(i,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=t*s;for(let a=0;a!==s;++a)e[a]=i[r+a];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Da=class extends hi{constructor(t,e,i,s){super(t,e,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Ll,endingEnd:Ll}}intervalChanged_(t,e,i){let s=this.parameterPositions,r=t-2,a=t+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case Dl:r=t,o=2*e-i;break;case Nl:r=s.length-2,o=e+s[r]-s[r+1];break;default:r=t,o=i}if(l===void 0)switch(this.getSettings_().endingEnd){case Dl:a=t,l=2*i-e;break;case Nl:a=1,l=i+s[1]-s[0];break;default:a=t-1,l=e}let c=(i-e)*.5,h=this.valueSize;this._weightPrev=c/(e-o),this._weightNext=c/(l-i),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(t,e,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this._offsetPrev,f=this._offsetNext,u=this._weightPrev,d=this._weightNext,g=(i-e)/(s-e),M=g*g,p=M*g,m=-u*p+2*u*M-u*g,S=(1+u)*p+(-1.5-2*u)*M+(-.5+u)*g+1,T=(-1-d)*p+(1.5+d)*M+.5*g,y=d*p-d*M;for(let E=0;E!==o;++E)r[E]=m*a[h+E]+S*a[c+E]+T*a[l+E]+y*a[f+E];return r}},Na=class extends hi{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=(i-e)/(s-e),f=1-h;for(let u=0;u!==o;++u)r[u]=a[c+u]*f+a[l+u]*h;return r}},Ua=class extends hi{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t){return this.copySampleValue_(t-1)}},Fa=class extends hi{interpolate_(t,e,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this.inTangents,f=this.outTangents;if(!h||!f){let g=(i-e)/(s-e),M=1-g;for(let p=0;p!==o;++p)r[p]=a[c+p]*M+a[l+p]*g;return r}let u=o*2,d=t-1;for(let g=0;g!==o;++g){let M=a[c+g],p=a[l+g],m=d*u+g*2,S=f[m],T=f[m+1],y=t*u+g*2,E=h[y],v=h[y+1],A=qd(i,e,S,E,s);r[g]=Au(A,M,T,v,p)}return r}};en=class{constructor(t,e,i,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=es(e,this.TimeBufferType),this.values=es(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,i;if(e.toJSON!==this.toJSON)i=e.toJSON(t);else{i={name:t.name,times:es(t.times,Array),values:es(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(i.interpolation=s),Cl(t.settings)&&(i.settings={inTangents:es(t.settings.inTangents,Array),outTangents:es(t.settings.outTangents,Array)})}return i.type=t.ValueTypeName,i}InterpolantFactoryMethodDiscrete(t){return new Ua(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Na(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Da(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new Fa(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case qs:e=this.InterpolantFactoryMethodDiscrete;break;case ya:e=this.InterpolantFactoryMethodLinear;break;case ca:e=this.InterpolantFactoryMethodSmooth;break;case Pl:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return Ft("KeyframeTrack:",i),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return qs;case this.InterpolantFactoryMethodLinear:return ya;case this.InterpolantFactoryMethodSmooth:return ca;case this.InterpolantFactoryMethodBezier:return Pl}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]*=t;Cl(this.settings)&&(Ph(this.settings.inTangents,t),Ph(this.settings.outTangents,t))}return this}trim(t,e){let i=this.times,s=i.length,r=0,a=s-1;for(;r!==s&&i[r]<t;)++r;for(;a!==-1&&i[a]>e;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=i.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(Ot("KeyframeTrack: Invalid value size in track.",this),t=!1);let i=this.times,s=this.values,r=i.length;r===0&&(Ot("KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==r;o++){let l=i[o];if(typeof l=="number"&&isNaN(l)){Ot("KeyframeTrack: Time is not a valid number.",this,o,l),t=!1;break}if(a!==null&&a>l){Ot("KeyframeTrack: Out of order keys.",this,o,l,a),t=!1;break}a=l}if(s!==void 0&&$f(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){Ot("KeyframeTrack: Value is not a valid number.",this,o,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===ca,r=t.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=t[o],h=t[o+1];if(c!==h&&(o!==1||c!==t[0]))if(s)l=!0;else{let f=o*i,u=f-i,d=f+i;for(let g=0;g!==i;++g){let M=e[f+g];if(M!==e[u+g]||M!==e[d+g]){l=!0;break}}}if(l){if(o!==a){t[a]=t[o];let f=o*i,u=a*i;for(let d=0;d!==i;++d)e[u+d]=e[f+d]}++a}}if(r>0){t[a]=t[r];for(let o=r*i,l=a*i,c=0;c!==i;++c)e[l+c]=e[o+c];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*i)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),i=this.constructor,s=new i(this.name,t,e);return s.createInterpolant=this.createInterpolant,Cl(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};en.prototype.ValueTypeName="";en.prototype.TimeBufferType=Float32Array;en.prototype.ValueBufferType=Float32Array;en.prototype.DefaultInterpolation=ya;ui=class extends en{constructor(t,e,i){super(t,e,i)}};ui.prototype.ValueTypeName="bool";ui.prototype.ValueBufferType=Array;ui.prototype.DefaultInterpolation=qs;ui.prototype.InterpolantFactoryMethodLinear=void 0;ui.prototype.InterpolantFactoryMethodSmooth=void 0;Ba=class extends en{constructor(t,e,i,s){super(t,e,i,s)}};Ba.prototype.ValueTypeName="color";Oa=class extends en{constructor(t,e,i,s){super(t,e,i,s)}};Oa.prototype.ValueTypeName="number";za=class extends hi{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(i-e)/(s-e),c=t*o;for(let h=c+o;c!==h;c+=4)qe.slerpFlat(r,0,a,c-o,a,c,l);return r}},yr=class extends en{constructor(t,e,i,s){super(t,e,i,s)}InterpolantFactoryMethodLinear(t){return new za(this.times,this.values,this.getValueSize(),t)}};yr.prototype.ValueTypeName="quaternion";yr.prototype.InterpolantFactoryMethodSmooth=void 0;fi=class extends en{constructor(t,e,i){super(t,e,i)}};fi.prototype.ValueTypeName="string";fi.prototype.ValueBufferType=Array;fi.prototype.DefaultInterpolation=qs;fi.prototype.InterpolantFactoryMethodLinear=void 0;fi.prototype.InterpolantFactoryMethodSmooth=void 0;ka=class extends en{constructor(t,e,i,s){super(t,e,i,s)}};ka.prototype.ValueTypeName="vector";Va=class{constructor(t,e,i){let s=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=i,this._abortController=null,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,f){return c.push(h,f),this},this.removeHandler=function(h){let f=c.indexOf(h);return f!==-1&&c.splice(f,2),this},this.getHandler=function(h){for(let f=0,u=c.length;f<u;f+=2){let d=c[f],g=c[f+1];if(d.global&&(d.lastIndex=0),d.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},wu=new Va,Ga=class{constructor(t){this.manager=t!==void 0?t:wu,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let i=this;return new Promise(function(s,r){i.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};Ga.DEFAULT_MATERIAL_NAME="__DEFAULT";Ni=class extends be{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Wt(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}},vr=class extends Ni{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(be.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Wt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){let e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}},Il=new jt,Lh=new P,Dh=new P,gs=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ot(512,512),this.mapType=Je,this.map=null,this.mapPass=null,this.matrix=new jt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new oi,this._frameExtents=new ot(1,1),this._viewportCount=1,this._viewports=[new _e(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera;Lh.setFromMatrixPosition(t.matrixWorld),e.position.copy(Lh),Dh.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Dh),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,i,s){Il.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),i.setFromProjectionMatrix(Il,t.coordinateSystem,t.reversedDepth);let r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,l=s?s.x/r.x:0,c=s?s.y/r.y:0;t.coordinateSystem===os||t.reversedDepth?e.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):e.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),e.multiply(Il)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},oa=new P,la=new qe,Rn=new P,Sr=class extends be{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new jt,this.projectionMatrix=new jt,this.projectionMatrixInverse=new jt,this.coordinateSystem=_n,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(oa,la,Rn),Rn.x===1&&Rn.y===1&&Rn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(oa,la,Rn.set(1,1,1)).invert()}updateWorldMatrix(t,e,i=!1){super.updateWorldMatrix(t,e,i),this.matrixWorld.decompose(oa,la,Rn),Rn.x===1&&Rn.y===1&&Rn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(oa,la,Rn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},si=new P,Nh=new ot,Uh=new ot,Ie=class extends Sr{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=Js*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(rl*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Js*2*Math.atan(Math.tan(rl*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){si.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(si.x,si.y).multiplyScalar(-t/si.z),si.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(si.x,si.y).multiplyScalar(-t/si.z)}getViewSize(t,e){return this.getViewBounds(t,Nh,Uh),e.subVectors(Uh,Nh)}setViewOffset(t,e,i,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(rl*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,e-=a.offsetY*i/c,s*=a.width/l,i*=a.height/c}let o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},Ol=class extends gs{constructor(){super(new Ie(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(t){let e=this.camera,i=Js*2*t.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=t.distance||e.far;(i!==e.fov||s!==e.aspect||r!==e.far)&&(e.fov=i,e.aspect=s,e.far=r,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this.aspect=t.aspect,this}toJSON(){let t=super.toJSON();return t.focus=this.focus,t.aspect=this.aspect,t}},Mr=class extends Ni{constructor(t,e,i=0,s=Math.PI/3,r=0,a=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(be.DEFAULT_UP),this.updateMatrix(),this.target=new be,this.distance=i,this.angle=s,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new Ol}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.map=t.map,this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.distance=this.distance,e.object.angle=this.angle,e.object.decay=this.decay,e.object.penumbra=this.penumbra,e.object.target=this.target.uuid,this.map&&this.map.isTexture&&(e.object.map=this.map.toJSON(t).uuid),e.object.shadow=this.shadow.toJSON(),e}},zl=class extends gs{constructor(){super(new Ie(90,1,.5,500)),this.isPointLightShadow=!0}},br=class extends Ni{constructor(t,e,i=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new zl}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.distance=this.distance,e.object.decay=this.decay,e.object.shadow=this.shadow.toJSON(),e}},xs=class extends Sr{constructor(t=-1,e=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=i-t,a=i+t,o=s+e,l=s-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},kl=class extends gs{constructor(){super(new xs(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Tr=class extends Ni{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(be.DEFAULT_UP),this.updateMatrix(),this.target=new be,this.shadow=new kl}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}},ns=-90,is=1,Ha=class extends be{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Ie(ns,is,t,e);s.layers=this.layers,this.add(s);let r=new Ie(ns,is,t,e);r.layers=this.layers,this.add(r);let a=new Ie(ns,is,t,e);a.layers=this.layers,this.add(a);let o=new Ie(ns,is,t,e);o.layers=this.layers,this.add(o);let l=new Ie(ns,is,t,e);l.layers=this.layers,this.add(l);let c=new Ie(ns,is,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[i,s,r,a,o,l]=e;for(let c of e)this.remove(c);if(t===_n)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===os)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,h]=this.children,f=t.getRenderTarget(),u=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let M=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let p=!1;t.isWebGLRenderer===!0?p=t.state.buffers.depth.getReversed():p=t.reversedDepthBuffer,t.setRenderTarget(i,0,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(i,1,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(i,2,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(i,3,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(i,4,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),i.texture.generateMipmaps=M,t.setRenderTarget(i,5,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(f,u,d),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}},Wa=class extends Ie{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}},fc="\\[\\]\\.:\\/",Yd=new RegExp("["+fc+"]","g"),dc="[^"+fc+"]",Zd="[^"+fc.replace("\\.","")+"]",$d=/((?:WC+[\/:])*)/.source.replace("WC",dc),Jd=/(WCOD+)?/.source.replace("WCOD",Zd),Kd=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",dc),Qd=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",dc),jd=new RegExp("^"+$d+Jd+Kd+Qd+"$"),tp=["material","materials","bones","map"],Vl=class{constructor(t,e,i){let s=i||ge.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(t,e)}setValue(t,e){let i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=i.length;s!==r;++s)i[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].unbind()}},ge=class n{constructor(t,e,i){this.path=e,this.parsedPath=i||n.parseTrackName(e),this.node=n.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,i){return t&&t.isAnimationObjectGroup?new n.Composite(t,e,i):new n(t,e,i)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Yd,"")}static parseTrackName(t){let e=jd.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let i={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=i.nodeName.substring(s+1);tp.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return i}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let i=t.skeleton.getBoneByName(e);if(i!==void 0)return i}if(t.children){let i=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===e||o.uuid===e)return o;let l=i(o.children);if(l)return l}return null},s=i(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)t[e++]=i[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,i=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=n.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Ft("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=e.objectIndex;switch(i){case"materials":if(!t.material){Ot("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Ot("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Ot("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Ot("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Ot("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[i]===void 0){Ot("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[i]}if(c!==void 0){if(t[c]===void 0){Ot("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let a=t[s];if(a===void 0){let c=e.nodeName;Ot("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?o=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){Ot("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Ot("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};ge.Composite=Vl;ge.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ge.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ge.prototype.GetterByBindingType=[ge.prototype._getValue_direct,ge.prototype._getValue_array,ge.prototype._getValue_arrayElement,ge.prototype._getValue_toArray];ge.prototype.SetterByBindingTypeAndVersioning=[[ge.prototype._setValue_direct,ge.prototype._setValue_direct_setNeedsUpdate,ge.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ge.prototype._setValue_array,ge.prototype._setValue_array_setNeedsUpdate,ge.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ge.prototype._setValue_arrayElement,ge.prototype._setValue_arrayElement_setNeedsUpdate,ge.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ge.prototype._setValue_fromArray,ge.prototype._setValue_fromArray_setNeedsUpdate,ge.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];A_=new Float32Array(1),yc=class yc{constructor(t,e,i,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let i=0;i<4;i++)this.elements[i]=t[i+e];return this}set(t,e,i,s){let r=this.elements;return r[0]=t,r[2]=e,r[1]=i,r[3]=s,this}};yc.prototype.isMatrix2=!0;Gl=yc;typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?Ft("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186")});function $u(){let n=null,t=!1,e=null,i=null;function s(r,a){i=n.requestAnimationFrame(s),e(r,a)}return{start:function(){t!==!0&&e!==null&&n!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function lp(n){let t=new WeakMap;function e(o,l){let c=o.array,h=o.usage,f=c.byteLength,u=n.createBuffer();n.bindBuffer(l,u),n.bufferData(l,c,h),o.onUploadCallback();let d;if(c instanceof Float32Array)d=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)d=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?d=n.HALF_FLOAT:d=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=n.SHORT;else if(c instanceof Uint32Array)d=n.UNSIGNED_INT;else if(c instanceof Int32Array)d=n.INT;else if(c instanceof Int8Array)d=n.BYTE;else if(c instanceof Uint8Array)d=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:f}}function i(o,l,c){let h=l.array,f=l.updateRanges;if(n.bindBuffer(c,o),f.length===0)n.bufferSubData(c,0,h);else{f.sort((d,g)=>d.start-g.start);let u=0;for(let d=1;d<f.length;d++){let g=f[u],M=f[d];M.start<=g.start+g.count+1?g.count=Math.max(g.count,M.start+M.count-g.start):(++u,f[u]=M)}f.length=u+1;for(let d=0,g=f.length;d<g;d++){let M=f[d];n.bufferSubData(c,M.start*h.BYTES_PER_ELEMENT,h,M.start,M.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=t.get(o);l&&(n.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}function Wm(n,t,e,i,s,r){let a=new Wt(0),o=s===!0?0:1,l,c,h=null,f=0,u=null;function d(S){let T=S.isScene===!0?S.background:null;if(T&&T.isTexture){let y=S.backgroundBlurriness>0;T=t.get(T,y)}return T}function g(S){let T=!1,y=d(S);y===null?p(a,o):y&&y.isColor&&(p(y,1),T=!0);let E=n.xr.getEnvironmentBlendMode();E==="additive"?e.buffers.color.setClear(0,0,0,1,r):E==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(n.autoClear||T)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function M(S,T){let y=d(T);y&&(y.isCubeTexture||y.mapping===Ar)?(c===void 0&&(c=new pe(new Nn(1,1,1),new tn({name:"BackgroundCubeMaterial",uniforms:Oi(On.backgroundCube.uniforms),vertexShader:On.backgroundCube.vertexShader,fragmentShader:On.backgroundCube.fragmentShader,side:Fe,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(E,v,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=y,c.material.uniforms.backgroundBlurriness.value=T.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Hm.makeRotationFromEuler(T.backgroundRotation)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Ju),c.material.toneMapped=Qt.getTransfer(y.colorSpace)!==ae,(h!==y||f!==y.version||u!==n.toneMapping)&&(c.material.needsUpdate=!0,h=y,f=y.version,u=n.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new pe(new $n(2,2),new tn({name:"BackgroundMaterial",uniforms:Oi(On.background.uniforms),vertexShader:On.background.vertexShader,fragmentShader:On.background.fragmentShader,side:di,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,l.material.toneMapped=Qt.getTransfer(y.colorSpace)!==ae,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(h!==y||f!==y.version||u!==n.toneMapping)&&(l.material.needsUpdate=!0,h=y,f=y.version,u=n.toneMapping),l.layers.enableAll(),S.unshift(l,l.geometry,l.material,0,0,null))}function p(S,T){S.getRGB(Fo,uc(n)),e.buffers.color.setClear(Fo.r,Fo.g,Fo.b,T,r)}function m(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(S,T=1){a.set(S),o=T,p(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(S){o=S,p(a,o)},render:g,addToRenderList:M,dispose:m}}function Xm(n,t){let e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=u(null),r=s,a=!1;function o(D,O,H,N,C){let B=!1,k=f(D,N,H,O);r!==k&&(r=k,c(r.object)),B=d(D,N,H,C),B&&g(D,N,H,C),C!==null&&t.update(C,n.ELEMENT_ARRAY_BUFFER),(B||a)&&(a=!1,y(D,O,H,N),C!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(C).buffer))}function l(){return n.createVertexArray()}function c(D){return n.bindVertexArray(D)}function h(D){return n.deleteVertexArray(D)}function f(D,O,H,N){let C=N.wireframe===!0,B=i[O.id];B===void 0&&(B={},i[O.id]=B);let k=D.isInstancedMesh===!0?D.id:0,j=B[k];j===void 0&&(j={},B[k]=j);let q=j[H.id];q===void 0&&(q={},j[H.id]=q);let K=q[C];return K===void 0&&(K=u(l()),q[C]=K),K}function u(D){let O=[],H=[],N=[];for(let C=0;C<e;C++)O[C]=0,H[C]=0,N[C]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:O,enabledAttributes:H,attributeDivisors:N,object:D,attributes:{},index:null}}function d(D,O,H,N){let C=r.attributes,B=O.attributes,k=0,j=H.getAttributes();for(let q in j)if(j[q].location>=0){let $=C[q],wt=B[q];if(wt===void 0&&(q==="instanceMatrix"&&D.instanceMatrix&&(wt=D.instanceMatrix),q==="instanceColor"&&D.instanceColor&&(wt=D.instanceColor)),$===void 0||$.attribute!==wt||wt&&$.data!==wt.data)return!0;k++}return r.attributesNum!==k||r.index!==N}function g(D,O,H,N){let C={},B=O.attributes,k=0,j=H.getAttributes();for(let q in j)if(j[q].location>=0){let $=B[q];$===void 0&&(q==="instanceMatrix"&&D.instanceMatrix&&($=D.instanceMatrix),q==="instanceColor"&&D.instanceColor&&($=D.instanceColor));let wt={};wt.attribute=$,$&&$.data&&(wt.data=$.data),C[q]=wt,k++}r.attributes=C,r.attributesNum=k,r.index=N}function M(){let D=r.newAttributes;for(let O=0,H=D.length;O<H;O++)D[O]=0}function p(D){m(D,0)}function m(D,O){let H=r.newAttributes,N=r.enabledAttributes,C=r.attributeDivisors;H[D]=1,N[D]===0&&(n.enableVertexAttribArray(D),N[D]=1),C[D]!==O&&(n.vertexAttribDivisor(D,O),C[D]=O)}function S(){let D=r.newAttributes,O=r.enabledAttributes;for(let H=0,N=O.length;H<N;H++)O[H]!==D[H]&&(n.disableVertexAttribArray(H),O[H]=0)}function T(D,O,H,N,C,B,k){k===!0?n.vertexAttribIPointer(D,O,H,C,B):n.vertexAttribPointer(D,O,H,N,C,B)}function y(D,O,H,N){M();let C=N.attributes,B=H.getAttributes(),k=O.defaultAttributeValues;for(let j in B){let q=B[j];if(q.location>=0){let K=C[j];if(K===void 0&&(j==="instanceMatrix"&&D.instanceMatrix&&(K=D.instanceMatrix),j==="instanceColor"&&D.instanceColor&&(K=D.instanceColor)),K!==void 0){let $=K.normalized,wt=K.itemSize,bt=t.get(K);if(bt===void 0)continue;let ne=bt.buffer,Yt=bt.type,te=bt.bytesPerElement,J=Yt===n.INT||Yt===n.UNSIGNED_INT||K.gpuType===Ja;if(K.isInterleavedBufferAttribute){let et=K.data,xt=et.stride,Bt=K.offset;if(et.isInstancedInterleavedBuffer){for(let St=0;St<q.locationSize;St++)m(q.location+St,et.meshPerAttribute);D.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=et.meshPerAttribute*et.count)}else for(let St=0;St<q.locationSize;St++)p(q.location+St);n.bindBuffer(n.ARRAY_BUFFER,ne);for(let St=0;St<q.locationSize;St++)T(q.location+St,wt/q.locationSize,Yt,$,xt*te,(Bt+wt/q.locationSize*St)*te,J)}else{if(K.isInstancedBufferAttribute){for(let et=0;et<q.locationSize;et++)m(q.location+et,K.meshPerAttribute);D.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let et=0;et<q.locationSize;et++)p(q.location+et);n.bindBuffer(n.ARRAY_BUFFER,ne);for(let et=0;et<q.locationSize;et++)T(q.location+et,wt/q.locationSize,Yt,$,wt*te,wt/q.locationSize*et*te,J)}}else if(k!==void 0){let $=k[j];if($!==void 0)switch($.length){case 2:n.vertexAttrib2fv(q.location,$);break;case 3:n.vertexAttrib3fv(q.location,$);break;case 4:n.vertexAttrib4fv(q.location,$);break;default:n.vertexAttrib1fv(q.location,$)}}}}S()}function E(){w();for(let D in i){let O=i[D];for(let H in O){let N=O[H];for(let C in N){let B=N[C];for(let k in B)h(B[k].object),delete B[k];delete N[C]}}delete i[D]}}function v(D){if(i[D.id]===void 0)return;let O=i[D.id];for(let H in O){let N=O[H];for(let C in N){let B=N[C];for(let k in B)h(B[k].object),delete B[k];delete N[C]}}delete i[D.id]}function A(D){for(let O in i){let H=i[O];for(let N in H){let C=H[N];if(C[D.id]===void 0)continue;let B=C[D.id];for(let k in B)h(B[k].object),delete B[k];delete C[D.id]}}}function x(D){for(let O in i){let H=i[O],N=D.isInstancedMesh===!0?D.id:0,C=H[N];if(C!==void 0){for(let B in C){let k=C[B];for(let j in k)h(k[j].object),delete k[j];delete C[B]}delete H[N],Object.keys(H).length===0&&delete i[O]}}}function w(){I(),a=!0,r!==s&&(r=s,c(r.object))}function I(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:w,resetDefaultState:I,dispose:E,releaseStatesOfGeometry:v,releaseStatesOfObject:x,releaseStatesOfProgram:A,initAttributes:M,enableAttribute:p,disableUnusedAttributes:S}}function qm(n,t,e){let i;function s(l){i=l}function r(l,c){n.drawArrays(i,l,c),e.update(c,i,1)}function a(l,c,h){h!==0&&(n.drawArraysInstanced(i,l,c,h),e.update(c,i,h))}function o(l,c,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,h);let u=0;for(let d=0;d<h;d++)u+=c[d];e.update(u,i,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function Ym(n,t,e,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let A=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(A){return!(A!==fn&&i.convert(A)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){let x=A===Sn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(A!==Je&&A!==un&&!x&&i.convert(A)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE))}function l(A){if(A==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",h=l(c);h!==c&&(Ft("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let f=e.logarithmicDepthBuffer===!0,u=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&u===!1&&Ft("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let d=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),M=n.getParameter(n.MAX_TEXTURE_SIZE),p=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),m=n.getParameter(n.MAX_VERTEX_ATTRIBS),S=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),T=n.getParameter(n.MAX_VARYING_VECTORS),y=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),E=n.getParameter(n.MAX_SAMPLES),v=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:f,reversedDepthBuffer:u,maxTextures:d,maxVertexTextures:g,maxTextureSize:M,maxCubemapSize:p,maxAttributes:m,maxVertexUniforms:S,maxVaryings:T,maxFragmentUniforms:y,maxSamples:E,samples:v}}function Zm(n){let t=this,e=null,i=0,s=!1,r=!1,a=new xn,o=new Vt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,u){let d=f.length!==0||u||i!==0||s;return s=u,i=f.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,u){e=h(f,u,0)},this.setState=function(f,u,d){let g=f.clippingPlanes,M=f.clipIntersection,p=f.clipShadows,m=n.get(f);if(!s||g===null||g.length===0||r&&!p)r?h(null):c();else{let S=r?0:i,T=S*4,y=m.clippingState||null;l.value=y,y=h(g,u,T,d);for(let E=0;E!==T;++E)y[E]=e[E];m.clippingState=y,this.numIntersection=M?this.numPlanes:0,this.numPlanes+=S}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function h(f,u,d,g){let M=f!==null?f.length:0,p=null;if(M!==0){if(p=l.value,g!==!0||p===null){let m=d+M*4,S=u.matrixWorldInverse;o.getNormalMatrix(S),(p===null||p.length<m)&&(p=new Float32Array(m));for(let T=0,y=d;T!==M;++T,y+=4)a.copy(f[T]).applyMatrix4(S,o),a.normal.toArray(p,y),p[y+3]=a.constant}l.value=p,l.needsUpdate=!0}return t.numPlanes=M,t.numIntersection=0,p}}function jm(n){let t=[],e=[],i=n,s=n-Ts+1+$m;for(let r=0;r<s;r++){let a=Math.pow(2,i);t.push(a);let o=1/(a-2),l=-o,c=1+o,h=[l,l,c,l,c,c,l,l,c,c,l,c],f=6,u=6,d=3,g=new Float32Array(d*u*f),M=new Float32Array(d*u*f);for(let m=0;m<f;m++){let S=m%3*2/3-1,T=m>2?0:-1,y=[S,T,0,S+2/3,T,0,S+2/3,T+1,0,S,T,0,S+2/3,T+1,0,S,T+1,0];g.set(y,d*u*m);for(let E=0;E<u;E++){let v=h[E*2]*2-1,A=h[E*2+1]*2-1;m===0?zi.set(1,A,v):m===1?zi.set(-v,1,-A):m===2?zi.set(-v,A,1):m===3?zi.set(-1,A,-v):m===4?zi.set(-v,-1,A):zi.set(v,A,-1),zi.toArray(M,(m*u+E)*d)}}let p=new Le;p.setAttribute("position",new Ne(g,d)),p.setAttribute("outputDirection",new Ne(M,d)),e.push(new pe(p,null)),i>Ts&&i--}return{lodMeshes:e,sizeLods:t}}function Cu(n,t,e){let i=new Ye(n,t,e);return i.texture.mapping=Ar,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function bs(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function tg(n,t,e){return new tn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Km,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:ko(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Un,depthTest:!1,depthWrite:!1})}function eg(n,t,e){return new tn({name:"SphericalGaussianBlur",defines:{SAMPLES:Jm,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:ko(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:Un,depthTest:!1,depthWrite:!1})}function Iu(){return new tn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ko(),fragmentShader:`

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
		`,blending:Un,depthTest:!1,depthWrite:!1})}function Pu(){return new tn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ko(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Un,depthTest:!1,depthWrite:!1})}function ko(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}function ng(n){let t=new WeakMap,e=new WeakMap,i=null;function s(u,d=!1){return u==null?null:d?a(u):r(u)}function r(u){if(u&&u.isTexture){let d=u.mapping;if(d===Ya||d===Za)if(t.has(u)){let g=t.get(u).texture;return o(g,u.mapping)}else{let g=u.image;if(g&&g.height>0){let M=new Oo(g.height);return M.fromEquirectangularTexture(n,u),t.set(u,M),u.addEventListener("dispose",c),o(M.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){let d=u.mapping,g=d===Ya||d===Za,M=d===pi||d===Bi;if(g||M){let p=e.get(u),m=p!==void 0?p.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==m)return i===null&&(i=new As(n)),p=g?i.fromEquirectangular(u,p):i.fromCubemap(u,p),p.texture.pmremVersion=u.pmremVersion,e.set(u,p),p.texture;if(p!==void 0)return p.texture;{let S=u.image;return g&&S&&S.height>0||M&&S&&l(S)?(i===null&&(i=new As(n)),p=g?i.fromEquirectangular(u):i.fromCubemap(u),p.texture.pmremVersion=u.pmremVersion,e.set(u,p),u.addEventListener("dispose",h),p.texture):null}}}return u}function o(u,d){return d===Ya?u.mapping=pi:d===Za&&(u.mapping=Bi),u}function l(u){let d=0,g=6;for(let M=0;M<g;M++)u[M]!==void 0&&d++;return d===g}function c(u){let d=u.target;d.removeEventListener("dispose",c);let g=t.get(d);g!==void 0&&(t.delete(d),g.dispose())}function h(u){let d=u.target;d.removeEventListener("dispose",h);let g=e.get(d);g!==void 0&&(e.delete(d),g.dispose())}function f(){t=new WeakMap,e=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:f}}function ig(n){let t={};function e(i){if(t[i]!==void 0)return t[i];let s=n.getExtension(i);return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){let s=e(i);return s===null&&Ri("WebGLRenderer: "+i+" extension not supported."),s}}}function sg(n,t,e,i){let s={},r=new WeakMap;function a(f){let u=f.target;u.index!==null&&t.remove(u.index);for(let g in u.attributes)t.remove(u.attributes[g]);u.removeEventListener("dispose",a),delete s[u.id];let d=r.get(u);d&&(t.remove(d),r.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function o(f,u){return s[u.id]===!0||(u.addEventListener("dispose",a),s[u.id]=!0,e.memory.geometries++),u}function l(f){let u=f.attributes;for(let d in u)t.update(u[d],n.ARRAY_BUFFER)}function c(f){let u=[],d=f.index,g=f.attributes.position,M=0;if(g===void 0)return;if(d!==null){let S=d.array;M=d.version;for(let T=0,y=S.length;T<y;T+=3){let E=S[T+0],v=S[T+1],A=S[T+2];u.push(E,v,v,A,A,E)}}else{let S=g.array;M=g.version;for(let T=0,y=S.length/3-1;T<y;T+=3){let E=T+0,v=T+1,A=T+2;u.push(E,v,v,A,A,E)}}let p=new(g.count>=65535?tr:js)(u,1);p.version=M;let m=r.get(f);m&&t.remove(m),r.set(f,p)}function h(f){let u=r.get(f);if(u){let d=f.index;d!==null&&u.version<d.version&&c(f)}else c(f);return r.get(f)}return{get:o,update:l,getWireframeAttribute:h}}function rg(n,t,e){let i;function s(f){i=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function l(f,u){n.drawElements(i,u,r,f*a),e.update(u,i,1)}function c(f,u,d){d!==0&&(n.drawElementsInstanced(i,u,r,f*a,d),e.update(u,i,d))}function h(f,u,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,u,0,r,f,0,d);let M=0;for(let p=0;p<d;p++)M+=u[p];e.update(M,i,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function ag(n){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(e.calls++,a){case n.TRIANGLES:e.triangles+=o*(r/3);break;case n.LINES:e.lines+=o*(r/2);break;case n.LINE_STRIP:e.lines+=o*(r-1);break;case n.LINE_LOOP:e.lines+=o*r;break;case n.POINTS:e.points+=o*r;break;default:Ot("WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function og(n,t,e){let i=new WeakMap,s=new _e;function r(a,o,l){let c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=h!==void 0?h.length:0,u=i.get(o);if(u===void 0||u.count!==f){let w=function(){A.dispose(),i.delete(o),o.removeEventListener("dispose",w)};u!==void 0&&u.texture.dispose();let d=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,M=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],m=o.morphAttributes.normal||[],S=o.morphAttributes.color||[],T=0;d===!0&&(T=1),g===!0&&(T=2),M===!0&&(T=3);let y=o.attributes.position.count*T,E=1;y>t.maxTextureSize&&(E=Math.ceil(y/t.maxTextureSize),y=t.maxTextureSize);let v=new Float32Array(y*E*4*f),A=new Ks(v,y,E,f);A.type=un,A.needsUpdate=!0;let x=T*4;for(let I=0;I<f;I++){let D=p[I],O=m[I],H=S[I],N=y*E*4*I;for(let C=0;C<D.count;C++){let B=C*x;d===!0&&(s.fromBufferAttribute(D,C),v[N+B+0]=s.x,v[N+B+1]=s.y,v[N+B+2]=s.z,v[N+B+3]=0),g===!0&&(s.fromBufferAttribute(O,C),v[N+B+4]=s.x,v[N+B+5]=s.y,v[N+B+6]=s.z,v[N+B+7]=0),M===!0&&(s.fromBufferAttribute(H,C),v[N+B+8]=s.x,v[N+B+9]=s.y,v[N+B+10]=s.z,v[N+B+11]=H.itemSize===4?s.w:1)}}u={count:f,texture:A,size:new ot(y,E)},i.set(o,u),o.addEventListener("dispose",w)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,e);else{let d=0;for(let M=0;M<c.length;M++)d+=c[M];let g=o.morphTargetsRelative?1:1-d;l.getUniforms().setValue(n,"morphTargetBaseInfluence",g),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",u.texture,e),l.getUniforms().setValue(n,"morphTargetsTextureSize",u.size)}return{update:r}}function lg(n,t,e,i,s){let r=new WeakMap;function a(c){let h=s.render.frame,f=c.geometry,u=t.get(c,f);if(r.get(u)!==h&&(t.update(u),r.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(e.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,n.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){let d=c.skeleton;r.get(d)!==h&&(d.update(),r.set(d,h))}return u}function o(){r=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),i.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:a,dispose:o}}function hg(n,t,e,i,s,r){let a=new Ye(t,e,{type:n,depthBuffer:s,stencilBuffer:r,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,l=null,c=new Le;c.setAttribute("position",new oe([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new oe([0,2,0,0,2,0],2));let h=new Ia({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),f=new pe(c,h),u=new xs(-1,1,1,-1,0,1),d=null,g=null,M=!1,p,m=null,S=[],T=!1;this.setSize=function(y,E){a.setSize(y,E),o!==null&&o.setSize(y,E),l!==null&&l.setSize(y,E);for(let v=0;v<S.length;v++){let A=S[v];A.setSize&&A.setSize(y,E)}},this.setEffects=function(y){S=y,T=S.length>0&&S[0].isRenderPass===!0;let E=a.width,v=a.height;S.length>0&&o===null&&(o=new Ye(E,v,{type:Sn,depthBuffer:!1,stencilBuffer:!1}),l=new Ye(E,v,{type:Sn,depthBuffer:!1,stencilBuffer:!1}));for(let A=0;A<S.length;A++){let x=S[A];x.setSize&&x.setSize(E,v)}},this.begin=function(y,E){if(M||y.toneMapping===yn&&S.length===0)return!1;if(m=E,E!==null){let v=E.width,A=E.height;(a.width!==v||a.height!==A)&&this.setSize(v,A)}return T===!1&&y.setRenderTarget(a),p=y.toneMapping,y.toneMapping=yn,!0},this.hasRenderPass=function(){return T},this.end=function(y,E){y.toneMapping=p,M=!0;let v=a,A=o;for(let x=0;x<S.length;x++){let w=S[x];w.enabled!==!1&&(w.render(y,A,v,E),w.needsSwap!==!1&&(v=A,A=A===o?l:o))}if(d!==y.outputColorSpace||g!==y.toneMapping){d=y.outputColorSpace,g=y.toneMapping,h.defines={},Qt.getTransfer(d)===ae&&(h.defines.SRGB_TRANSFER="");let x=cg[g];x&&(h.defines[x]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=v.texture,y.setRenderTarget(m),y.render(f,u),m=null,M=!1},this.isCompositing=function(){return M},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),c.dispose(),h.dispose()}}function ws(n,t,e){let i=n[0];if(i<=0||i>0)return n;let s=t*e,r=Lu[s];if(r===void 0&&(r=new Float32Array(s),Lu[s]=r),t!==0){i.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,n[a].toArray(r,o)}return r}function we(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function Re(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function Vo(n,t){let e=Du[t];e===void 0&&(e=new Int32Array(t),Du[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function ug(n,t){let e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function fg(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(we(e,t))return;n.uniform2fv(this.addr,t),Re(e,t)}}function dg(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(we(e,t))return;n.uniform3fv(this.addr,t),Re(e,t)}}function pg(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(we(e,t))return;n.uniform4fv(this.addr,t),Re(e,t)}}function mg(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(we(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),Re(e,t)}else{if(we(e,i))return;Fu.set(i),n.uniformMatrix2fv(this.addr,!1,Fu),Re(e,i)}}function gg(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(we(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),Re(e,t)}else{if(we(e,i))return;Uu.set(i),n.uniformMatrix3fv(this.addr,!1,Uu),Re(e,i)}}function xg(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(we(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),Re(e,t)}else{if(we(e,i))return;Nu.set(i),n.uniformMatrix4fv(this.addr,!1,Nu),Re(e,i)}}function _g(n,t){let e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function yg(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(we(e,t))return;n.uniform2iv(this.addr,t),Re(e,t)}}function vg(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(we(e,t))return;n.uniform3iv(this.addr,t),Re(e,t)}}function Sg(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(we(e,t))return;n.uniform4iv(this.addr,t),Re(e,t)}}function Mg(n,t){let e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function bg(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(we(e,t))return;n.uniform2uiv(this.addr,t),Re(e,t)}}function Tg(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(we(e,t))return;n.uniform3uiv(this.addr,t),Re(e,t)}}function Eg(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(we(e,t))return;n.uniform4uiv(this.addr,t),Re(e,t)}}function Ag(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(wc.compareFunction=e.isReversedDepthBuffer()?Uo:No,r=wc):r=Ku,e.setTexture2D(t||r,s)}function wg(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||ju,s)}function Rg(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||tf,s)}function Cg(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||Qu,s)}function Ig(n){switch(n){case 5126:return ug;case 35664:return fg;case 35665:return dg;case 35666:return pg;case 35674:return mg;case 35675:return gg;case 35676:return xg;case 5124:case 35670:return _g;case 35667:case 35671:return yg;case 35668:case 35672:return vg;case 35669:case 35673:return Sg;case 5125:return Mg;case 36294:return bg;case 36295:return Tg;case 36296:return Eg;case 35678:case 36198:case 36298:case 36306:case 35682:return Ag;case 35679:case 36299:case 36307:return wg;case 35680:case 36300:case 36308:case 36293:return Rg;case 36289:case 36303:case 36311:case 36292:return Cg}}function Pg(n,t){n.uniform1fv(this.addr,t)}function Lg(n,t){let e=ws(t,this.size,2);n.uniform2fv(this.addr,e)}function Dg(n,t){let e=ws(t,this.size,3);n.uniform3fv(this.addr,e)}function Ng(n,t){let e=ws(t,this.size,4);n.uniform4fv(this.addr,e)}function Ug(n,t){let e=ws(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function Fg(n,t){let e=ws(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function Bg(n,t){let e=ws(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function Og(n,t){n.uniform1iv(this.addr,t)}function zg(n,t){n.uniform2iv(this.addr,t)}function kg(n,t){n.uniform3iv(this.addr,t)}function Vg(n,t){n.uniform4iv(this.addr,t)}function Gg(n,t){n.uniform1uiv(this.addr,t)}function Hg(n,t){n.uniform2uiv(this.addr,t)}function Wg(n,t){n.uniform3uiv(this.addr,t)}function Xg(n,t){n.uniform4uiv(this.addr,t)}function qg(n,t,e){let i=this.cache,s=t.length,r=Vo(e,s);we(i,r)||(n.uniform1iv(this.addr,r),Re(i,r));let a;this.type===n.SAMPLER_2D_SHADOW?a=wc:a=Ku;for(let o=0;o!==s;++o)e.setTexture2D(t[o]||a,r[o])}function Yg(n,t,e){let i=this.cache,s=t.length,r=Vo(e,s);we(i,r)||(n.uniform1iv(this.addr,r),Re(i,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||ju,r[a])}function Zg(n,t,e){let i=this.cache,s=t.length,r=Vo(e,s);we(i,r)||(n.uniform1iv(this.addr,r),Re(i,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||tf,r[a])}function $g(n,t,e){let i=this.cache,s=t.length,r=Vo(e,s);we(i,r)||(n.uniform1iv(this.addr,r),Re(i,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||Qu,r[a])}function Jg(n){switch(n){case 5126:return Pg;case 35664:return Lg;case 35665:return Dg;case 35666:return Ng;case 35674:return Ug;case 35675:return Fg;case 35676:return Bg;case 5124:case 35670:return Og;case 35667:case 35671:return zg;case 35668:case 35672:return kg;case 35669:case 35673:return Vg;case 5125:return Gg;case 36294:return Hg;case 36295:return Wg;case 36296:return Xg;case 35678:case 36198:case 36298:case 36306:case 35682:return qg;case 35679:case 36299:case 36307:return Yg;case 35680:case 36300:case 36308:case 36293:return Zg;case 36289:case 36303:case 36311:case 36292:return $g}}function Bu(n,t){n.seq.push(t),n.map[t.id]=t}function Kg(n,t,e){let i=n.name,s=i.length;for(Ec.lastIndex=0;;){let r=Ec.exec(i),a=Ec.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){Bu(e,c===void 0?new Rc(o,n,t):new Cc(o,n,t));break}else{let f=e.map[o];f===void 0&&(f=new Ic(o),Bu(e,f)),e=f}}}function Ou(n,t,e){let i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}function tx(n,t){let e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){let o=a+1;i.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return i.join(`
`)}function ex(n){Qt._getMatrix(zu,Qt.workingColorSpace,n);let t=`mat3( ${zu.elements.map(e=>e.toFixed(4))} )`;switch(Qt.getTransfer(n)){case Zs:return[t,"LinearTransferOETF"];case ae:return[t,"sRGBTransferOETF"];default:return Ft("WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function ku(n,t,e){let i=n.getShaderParameter(t,n.COMPILE_STATUS),r=(n.getShaderInfoLog(t)||"").trim();if(i&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+tx(n.getShaderSource(t),o)}else return r}function nx(n,t){let e=ex(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function sx(n,t){let e=ix[t];return e===void 0?(Ft("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function rx(){Qt.getLuminanceCoefficients(Bo);let n=Bo.x.toFixed(4),t=Bo.y.toFixed(4),e=Bo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function ax(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Br).join(`
`)}function ox(n){let t=[];for(let e in n){let i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function lx(n,t){let e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){let r=n.getActiveAttrib(t,s),a=r.name,o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:n.getAttribLocation(t,a),locationSize:o}}return e}function Br(n){return n!==""}function Vu(n,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Gu(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}function Pc(n){return n.replace(cx,ux)}function ux(n,t){let e=qt[t];if(e===void 0){let i=hx.get(t);if(i!==void 0)e=qt[i],Ft('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return Pc(e)}function Hu(n){return n.replace(fx,dx)}function dx(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Wu(n){let t=`precision ${n.precision} float;
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
#define LOW_PRECISION`),t}function mx(n){return px[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}function xx(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":gx[n.envMapMode]||"ENVMAP_TYPE_CUBE"}function yx(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":_x[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}function Sx(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":vx[n.combine]||"ENVMAP_BLENDING_NONE"}function Mx(n){let t=n.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function bx(n,t,e,i){let s=n.getContext(),r=e.defines,a=e.vertexShader,o=e.fragmentShader,l=mx(e),c=xx(e),h=yx(e),f=Sx(e),u=Mx(e),d=ax(e),g=ox(r),M=s.createProgram(),p,m,S=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Br).join(`
`),p.length>0&&(p+=`
`),m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Br).join(`
`),m.length>0&&(m+=`
`)):(p=[Wu(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Br).join(`
`),m=[Wu(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+f:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==yn?"#define TONE_MAPPING":"",e.toneMapping!==yn?qt.tonemapping_pars_fragment:"",e.toneMapping!==yn?sx("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",qt.colorspace_pars_fragment,nx("linearToOutputTexel",e.outputColorSpace),rx(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Br).join(`
`)),a=Pc(a),a=Vu(a,e),a=Gu(a,e),o=Pc(o),o=Vu(o,e),o=Gu(o,e),a=Hu(a),o=Hu(o),e.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,p=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,m=["#define varying in",e.glslVersion===lc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===lc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);let T=S+p+a,y=S+m+o,E=Ou(s,s.VERTEX_SHADER,T),v=Ou(s,s.FRAGMENT_SHADER,y);s.attachShader(M,E),s.attachShader(M,v),e.index0AttributeName!==void 0?s.bindAttribLocation(M,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(M,0,"position"),s.linkProgram(M);function A(D){if(n.debug.checkShaderErrors){let O=s.getProgramInfoLog(M)||"",H=s.getShaderInfoLog(E)||"",N=s.getShaderInfoLog(v)||"",C=O.trim(),B=H.trim(),k=N.trim(),j=!0,q=!0;if(s.getProgramParameter(M,s.LINK_STATUS)===!1)if(j=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,M,E,v);else{let K=ku(s,E,"vertex"),$=ku(s,v,"fragment");Ot("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(M,s.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+C+`
`+K+`
`+$)}else C!==""?Ft("WebGLProgram: Program Info Log:",C):(B===""||k==="")&&(q=!1);q&&(D.diagnostics={runnable:j,programLog:C,vertexShader:{log:B,prefix:p},fragmentShader:{log:k,prefix:m}})}s.deleteShader(E),s.deleteShader(v),x=new Es(s,M),w=lx(s,M)}let x;this.getUniforms=function(){return x===void 0&&A(this),x};let w;this.getAttributes=function(){return w===void 0&&A(this),w};let I=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return I===!1&&(I=s.getProgramParameter(M,Qg)),I},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(M),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=jg++,this.cacheKey=t,this.usedTimes=1,this.program=M,this.vertexShader=E,this.fragmentShader=v,this}function Ex(n){return n===gi||n===Lr||n===Dr}function Ax(n,t,e,i,s,r){let a=new Qs,o=new Lc,l=new Set,c=[],h=new Map,f=i.logarithmicDepthBuffer,u=i.precision,d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(x){return l.add(x),x===0?"uv":`uv${x}`}function M(x,w,I,D,O,H){let N=D.fog,C=O.geometry,B=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?D.environment:null,k=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,j=t.get(x.envMap||B,k),q=j&&j.mapping===Ar?j.image.height:null,K=d[x.type];x.precision!==null&&(u=i.getMaxPrecision(x.precision),u!==x.precision&&Ft("WebGLProgram.getParameters:",x.precision,"not supported, using",u,"instead."));let $=C.morphAttributes.position||C.morphAttributes.normal||C.morphAttributes.color,wt=$!==void 0?$.length:0,bt=0;C.morphAttributes.position!==void 0&&(bt=1),C.morphAttributes.normal!==void 0&&(bt=2),C.morphAttributes.color!==void 0&&(bt=3);let ne,Yt,te,J;if(K){let fe=On[K];ne=fe.vertexShader,Yt=fe.fragmentShader}else{ne=x.vertexShader,Yt=x.fragmentShader;let fe=o.getVertexShaderStage(x),se=o.getFragmentShaderStage(x);o.update(x,fe,se),te=fe.id,J=se.id}let et=n.getRenderTarget(),xt=n.state.buffers.depth.getReversed(),Bt=O.isInstancedMesh===!0,St=O.isBatchedMesh===!0,zt=!!x.map,le=!!x.matcap,nt=!!j,st=!!x.aoMap,rt=!!x.lightMap,at=!!x.bumpMap&&x.wireframe===!1,ht=!!x.normalMap,Nt=!!x.displacementMap,Dt=!!x.emissiveMap,kt=!!x.metalnessMap,Gt=!!x.roughnessMap,L=x.anisotropy>0,ie=x.clearcoat>0,Zt=x.dispersion>0,R=x.retroreflectivity>0,_=x.iridescence>0,z=x.sheen>0,W=x.transmission>0,Y=L&&!!x.anisotropyMap,lt=ie&&!!x.clearcoatMap,ct=ie&&!!x.clearcoatNormalMap,Z=ie&&!!x.clearcoatRoughnessMap,tt=_&&!!x.iridescenceMap,ut=_&&!!x.iridescenceThicknessMap,It=z&&!!x.sheenColorMap,mt=z&&!!x.sheenRoughnessMap,ft=!!x.specularMap,Pt=!!x.specularColorMap,Ut=!!x.specularIntensityMap,Ht=W&&!!x.transmissionMap,F=W&&!!x.thicknessMap,dt=!!x.gradientMap,Q=!!x.alphaMap,pt=x.alphaTest>0,vt=!!x.alphaHash,it=!!x.extensions,Lt=yn;x.toneMapped&&(et===null||et.isXRRenderTarget===!0)&&(Lt=n.toneMapping);let Rt={shaderID:K,shaderType:x.type,shaderName:x.name,vertexShader:ne,fragmentShader:Yt,defines:x.defines,customVertexShaderID:te,customFragmentShaderID:J,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:u,batching:St,batchingColor:St&&O._colorsTexture!==null,instancing:Bt,instancingColor:Bt&&O.instanceColor!==null,instancingMorph:Bt&&O.morphTexture!==null,outputColorSpace:et===null?n.outputColorSpace:et.isXRRenderTarget===!0?et.texture.colorSpace:Qt.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:zt,matcap:le,envMap:nt,envMapMode:nt&&j.mapping,envMapCubeUVHeight:q,aoMap:st,lightMap:rt,bumpMap:at,normalMap:ht,displacementMap:Nt,emissiveMap:Dt,normalMapObjectSpace:ht&&x.normalMapType===ou,normalMapTangentSpace:ht&&x.normalMapType===Nr,packedNormalMap:ht&&x.normalMapType===Nr&&Ex(x.normalMap.format),metalnessMap:kt,roughnessMap:Gt,anisotropy:L,anisotropyMap:Y,clearcoat:ie,clearcoatMap:lt,clearcoatNormalMap:ct,clearcoatRoughnessMap:Z,dispersion:Zt,retroreflection:R,iridescence:_,iridescenceMap:tt,iridescenceThicknessMap:ut,sheen:z,sheenColorMap:It,sheenRoughnessMap:mt,specularMap:ft,specularColorMap:Pt,specularIntensityMap:Ut,transmission:W,transmissionMap:Ht,thicknessMap:F,gradientMap:dt,opaque:x.transparent===!1&&x.blending===ys&&x.alphaToCoverage===!1,alphaMap:Q,alphaTest:pt,alphaHash:vt,combine:x.combine,mapUv:zt&&g(x.map.channel),aoMapUv:st&&g(x.aoMap.channel),lightMapUv:rt&&g(x.lightMap.channel),bumpMapUv:at&&g(x.bumpMap.channel),normalMapUv:ht&&g(x.normalMap.channel),displacementMapUv:Nt&&g(x.displacementMap.channel),emissiveMapUv:Dt&&g(x.emissiveMap.channel),metalnessMapUv:kt&&g(x.metalnessMap.channel),roughnessMapUv:Gt&&g(x.roughnessMap.channel),anisotropyMapUv:Y&&g(x.anisotropyMap.channel),clearcoatMapUv:lt&&g(x.clearcoatMap.channel),clearcoatNormalMapUv:ct&&g(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Z&&g(x.clearcoatRoughnessMap.channel),iridescenceMapUv:tt&&g(x.iridescenceMap.channel),iridescenceThicknessMapUv:ut&&g(x.iridescenceThicknessMap.channel),sheenColorMapUv:It&&g(x.sheenColorMap.channel),sheenRoughnessMapUv:mt&&g(x.sheenRoughnessMap.channel),specularMapUv:ft&&g(x.specularMap.channel),specularColorMapUv:Pt&&g(x.specularColorMap.channel),specularIntensityMapUv:Ut&&g(x.specularIntensityMap.channel),transmissionMapUv:Ht&&g(x.transmissionMap.channel),thicknessMapUv:F&&g(x.thicknessMap.channel),alphaMapUv:Q&&g(x.alphaMap.channel),vertexTangents:!!C.attributes.tangent&&(ht||L),vertexNormals:!!C.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!C.attributes.color&&C.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!C.attributes.uv&&(zt||Q),fog:!!N,useFog:x.fog===!0,fogExp2:!!N&&N.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||C.attributes.normal===void 0&&ht===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:xt,skinning:O.isSkinnedMesh===!0,hasPositionAttribute:C.attributes.position!==void 0,morphTargets:C.morphAttributes.position!==void 0,morphNormals:C.morphAttributes.normal!==void 0,morphColors:C.morphAttributes.color!==void 0,morphTargetsCount:wt,morphTextureStride:bt,numSunLights:w.sun.length,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numSunLightShadows:w.sunShadowMap.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numLightProbeGrids:H.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:n.shadowMap.enabled&&I.length>0,shadowMapType:n.shadowMap.type,toneMapping:Lt,decodeVideoTexture:zt&&x.map.isVideoTexture===!0&&Qt.getTransfer(x.map.colorSpace)===ae,decodeVideoTextureEmissive:Dt&&x.emissiveMap.isVideoTexture===!0&&Qt.getTransfer(x.emissiveMap.colorSpace)===ae,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===nn,flipSided:x.side===Fe,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:it&&x.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(it&&x.extensions.multiDraw===!0||St)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return Rt.vertexUv1s=l.has(1),Rt.vertexUv2s=l.has(2),Rt.vertexUv3s=l.has(3),l.clear(),Rt}function p(x){let w=[];if(x.shaderID?w.push(x.shaderID):(w.push(x.customVertexShaderID),w.push(x.customFragmentShaderID)),x.defines!==void 0)for(let I in x.defines)w.push(I),w.push(x.defines[I]);return x.isRawShaderMaterial===!1&&(m(w,x),S(w,x),w.push(n.outputColorSpace)),w.push(x.customProgramCacheKey),w.join()}function m(x,w){x.push(w.precision),x.push(w.outputColorSpace),x.push(w.envMapMode),x.push(w.envMapCubeUVHeight),x.push(w.mapUv),x.push(w.alphaMapUv),x.push(w.lightMapUv),x.push(w.aoMapUv),x.push(w.bumpMapUv),x.push(w.normalMapUv),x.push(w.displacementMapUv),x.push(w.emissiveMapUv),x.push(w.metalnessMapUv),x.push(w.roughnessMapUv),x.push(w.anisotropyMapUv),x.push(w.clearcoatMapUv),x.push(w.clearcoatNormalMapUv),x.push(w.clearcoatRoughnessMapUv),x.push(w.iridescenceMapUv),x.push(w.iridescenceThicknessMapUv),x.push(w.sheenColorMapUv),x.push(w.sheenRoughnessMapUv),x.push(w.specularMapUv),x.push(w.specularColorMapUv),x.push(w.specularIntensityMapUv),x.push(w.transmissionMapUv),x.push(w.thicknessMapUv),x.push(w.combine),x.push(w.fogExp2),x.push(w.sizeAttenuation),x.push(w.morphTargetsCount),x.push(w.morphAttributeCount),x.push(w.numSunLights),x.push(w.numDirLights),x.push(w.numPointLights),x.push(w.numSpotLights),x.push(w.numSpotLightMaps),x.push(w.numHemiLights),x.push(w.numRectAreaLights),x.push(w.numSunLightShadows),x.push(w.numDirLightShadows),x.push(w.numPointLightShadows),x.push(w.numSpotLightShadows),x.push(w.numSpotLightShadowsWithMaps),x.push(w.numLightProbes),x.push(w.shadowMapType),x.push(w.toneMapping),x.push(w.numClippingPlanes),x.push(w.numClipIntersection),x.push(w.depthPacking)}function S(x,w){a.disableAll(),w.instancing&&a.enable(0),w.instancingColor&&a.enable(1),w.instancingMorph&&a.enable(2),w.matcap&&a.enable(3),w.envMap&&a.enable(4),w.normalMapObjectSpace&&a.enable(5),w.normalMapTangentSpace&&a.enable(6),w.clearcoat&&a.enable(7),w.iridescence&&a.enable(8),w.alphaTest&&a.enable(9),w.vertexColors&&a.enable(10),w.vertexAlphas&&a.enable(11),w.vertexUv1s&&a.enable(12),w.vertexUv2s&&a.enable(13),w.vertexUv3s&&a.enable(14),w.vertexTangents&&a.enable(15),w.anisotropy&&a.enable(16),w.alphaHash&&a.enable(17),w.batching&&a.enable(18),w.dispersion&&a.enable(19),w.retroreflection&&a.enable(24),w.batchingColor&&a.enable(20),w.gradientMap&&a.enable(21),w.packedNormalMap&&a.enable(22),w.vertexNormals&&a.enable(23),x.push(a.mask),a.disableAll(),w.fog&&a.enable(0),w.useFog&&a.enable(1),w.flatShading&&a.enable(2),w.logarithmicDepthBuffer&&a.enable(3),w.reversedDepthBuffer&&a.enable(4),w.skinning&&a.enable(5),w.morphTargets&&a.enable(6),w.morphNormals&&a.enable(7),w.morphColors&&a.enable(8),w.premultipliedAlpha&&a.enable(9),w.shadowMapEnabled&&a.enable(10),w.doubleSided&&a.enable(11),w.flipSided&&a.enable(12),w.useDepthPacking&&a.enable(13),w.dithering&&a.enable(14),w.transmission&&a.enable(15),w.sheen&&a.enable(16),w.opaque&&a.enable(17),w.pointsUvs&&a.enable(18),w.decodeVideoTexture&&a.enable(19),w.decodeVideoTextureEmissive&&a.enable(20),w.alphaToCoverage&&a.enable(21),w.numLightProbeGrids>0&&a.enable(22),w.hasPositionAttribute&&a.enable(23),x.push(a.mask)}function T(x){let w=d[x.type],I;if(w){let D=On[w];I=Eu.clone(D.uniforms)}else I=x.uniforms;return I}function y(x,w){let I=h.get(w);return I!==void 0?++I.usedTimes:(I=new bx(n,w,x,s),c.push(I),h.set(w,I)),I}function E(x){if(--x.usedTimes===0){let w=c.indexOf(x);c[w]=c[c.length-1],c.pop(),h.delete(x.cacheKey),x.destroy()}}function v(x){o.remove(x)}function A(){o.dispose()}return{getParameters:M,getProgramCacheKey:p,getUniforms:T,acquireProgram:y,releaseProgram:E,releaseShaderCache:v,programs:c,dispose:A}}function wx(){let n=new WeakMap;function t(a){return n.has(a)}function e(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function s(a,o,l){n.get(a)[o]=l}function r(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:r}}function Rx(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.materialVariant!==t.materialVariant?n.materialVariant-t.materialVariant:n.z!==t.z?n.z-t.z:n.id-t.id}function Xu(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function qu(){let n=[],t=0,e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function a(u){let d=0;return u.isInstancedMesh&&(d+=2),u.isSkinnedMesh&&(d+=1),d}function o(u,d,g,M,p,m){let S=n[t];return S===void 0?(S={id:u.id,object:u,geometry:d,material:g,materialVariant:a(u),groupOrder:M,renderOrder:u.renderOrder,z:p,group:m},n[t]=S):(S.id=u.id,S.object=u,S.geometry=d,S.material=g,S.materialVariant=a(u),S.groupOrder=M,S.renderOrder=u.renderOrder,S.z=p,S.group=m),t++,S}function l(u,d,g,M,p,m,S){S.reversedDepth===!0&&(p=-p);let T=o(u,d,g,M,p,m);g.transmission>0?i.push(T):g.transparent===!0?s.push(T):e.push(T)}function c(u,d,g,M,p,m){let S=o(u,d,g,M,p,m);g.transmission>0?i.unshift(S):g.transparent===!0?s.unshift(S):e.unshift(S)}function h(u,d){e.length>1&&e.sort(u||Rx),i.length>1&&i.sort(d||Xu),s.length>1&&s.sort(d||Xu)}function f(){for(let u=t,d=n.length;u<d;u++){let g=n[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:l,unshift:c,finish:f,sort:h}}function Cx(){let n=new WeakMap;function t(i,s){let r=n.get(i),a;return r===void 0?(a=new qu,n.set(i,[a])):s>=r.length?(a=new qu,r.push(a)):a=r[s],a}function e(){n=new WeakMap}return{get:t,dispose:e}}function Ix(){let n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new P,color:new Wt};break;case"SpotLight":e={position:new P,direction:new P,color:new Wt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new P,color:new Wt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new P,skyColor:new Wt,groundColor:new Wt};break;case"RectAreaLight":e={color:new Wt,position:new P,halfWidth:new P,halfHeight:new P};break}return n[t.id]=e,e}}}function Px(){let n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ot};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ot};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ot,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}function Dx(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function Nx(n){let t=new Ix,e=Px(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new P);let s=new P,r=new jt,a=new jt;function o(c){let h=0,f=0,u=0;for(let O=0;O<9;O++)i.probe[O].set(0,0,0);let d=0,g=0,M=0,p=0,m=0,S=0,T=0,y=0,E=0,v=0,A=0,x=0,w=0,I=0;c.sort(Dx);for(let O=0,H=c.length;O<H;O++){let N=c[O],C=N.color,B=N.intensity,k=N.distance,j=null;if(N.shadow&&N.shadow.map&&(N.shadow.map.texture.format===gi?j=N.shadow.map.texture:j=N.shadow.map.depthTexture||N.shadow.map.texture),N.isAmbientLight)h+=C.r*B,f+=C.g*B,u+=C.b*B;else if(N.isLightProbe){for(let q=0;q<9;q++)i.probe[q].addScaledVector(N.sh.coefficients[q],B);I++}else if(N.isSunLight){let q=t.get(N);if(q.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){let K=N.shadow,$=e.get(N);$.shadowIntensity=K.intensity,$.shadowBias=K.bias,$.shadowNormalBias=K.normalBias,$.shadowRadius=K.radius,$.shadowMapSize.copy(K.mapSize).multiply(K.getFrameExtents()),i.sunShadow[g]=$,i.sunShadowMap[g]=j;let wt=K.getViewportCount();for(let bt=0;bt<wt;bt++)i.sunShadowMatrix[M+bt]=K.getMatrix(bt),i.sunShadowCascade[M+bt]=K._cascadeData[bt];M+=wt,g++}i.sun[d]=q,d++}else if(N.isDirectionalLight){let q=t.get(N);if(q.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){let K=N.shadow,$=e.get(N);$.shadowIntensity=K.intensity,$.shadowBias=K.bias,$.shadowNormalBias=K.normalBias,$.shadowRadius=K.radius,$.shadowMapSize=K.mapSize,i.directionalShadow[p]=$,i.directionalShadowMap[p]=j,i.directionalShadowMatrix[p]=N.shadow.matrix,E++}i.directional[p]=q,p++}else if(N.isSpotLight){let q=t.get(N);q.position.setFromMatrixPosition(N.matrixWorld),q.color.copy(C).multiplyScalar(B),q.distance=k,q.coneCos=Math.cos(N.angle),q.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),q.decay=N.decay,i.spot[S]=q;let K=N.shadow;if(N.map&&(i.spotLightMap[x]=N.map,x++,K.updateMatrices(N),N.castShadow&&w++),i.spotLightMatrix[S]=K.matrix,N.castShadow){let $=e.get(N);$.shadowIntensity=K.intensity,$.shadowBias=K.bias,$.shadowNormalBias=K.normalBias,$.shadowRadius=K.radius,$.shadowMapSize=K.mapSize,i.spotShadow[S]=$,i.spotShadowMap[S]=j,A++}S++}else if(N.isRectAreaLight){let q=t.get(N);q.color.copy(C).multiplyScalar(B),q.halfWidth.set(N.width*.5,0,0),q.halfHeight.set(0,N.height*.5,0),i.rectArea[T]=q,T++}else if(N.isPointLight){let q=t.get(N);if(q.color.copy(N.color).multiplyScalar(N.intensity),q.distance=N.distance,q.decay=N.decay,N.castShadow){let K=N.shadow,$=e.get(N);$.shadowIntensity=K.intensity,$.shadowBias=K.bias,$.shadowNormalBias=K.normalBias,$.shadowRadius=K.radius,$.shadowMapSize=K.mapSize,$.shadowCameraNear=K.camera.near,$.shadowCameraFar=K.camera.far,i.pointShadow[m]=$,i.pointShadowMap[m]=j,i.pointShadowMatrix[m]=N.shadow.matrix,v++}i.point[m]=q,m++}else if(N.isHemisphereLight){let q=t.get(N);q.skyColor.copy(N.color).multiplyScalar(B),q.groundColor.copy(N.groundColor).multiplyScalar(B),i.hemi[y]=q,y++}}T>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=gt.LTC_FLOAT_1,i.rectAreaLTC2=gt.LTC_FLOAT_2):(i.rectAreaLTC1=gt.LTC_HALF_1,i.rectAreaLTC2=gt.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=f,i.ambient[2]=u;let D=i.hash;(D.sunLength!==d||D.directionalLength!==p||D.pointLength!==m||D.spotLength!==S||D.rectAreaLength!==T||D.hemiLength!==y||D.numSunShadows!==g||D.numDirectionalShadows!==E||D.numPointShadows!==v||D.numSpotShadows!==A||D.numSpotMaps!==x||D.numLightProbes!==I)&&(i.sun.length=d,i.directional.length=p,i.spot.length=S,i.rectArea.length=T,i.point.length=m,i.hemi.length=y,i.sunShadow.length=g,i.sunShadowMap.length=g,i.sunShadowMatrix.length=M,i.sunShadowCascade.length=M,i.directionalShadow.length=E,i.directionalShadowMap.length=E,i.directionalShadowMatrix.length=E,i.pointShadow.length=v,i.pointShadowMap.length=v,i.pointShadowMatrix.length=v,i.spotShadow.length=A,i.spotShadowMap.length=A,i.spotLightMatrix.length=A+x-w,i.spotLightMap.length=x,i.numSpotLightShadowsWithMaps=w,i.numLightProbes=I,D.sunLength=d,D.directionalLength=p,D.pointLength=m,D.spotLength=S,D.rectAreaLength=T,D.hemiLength=y,D.numSunShadows=g,D.numDirectionalShadows=E,D.numPointShadows=v,D.numSpotShadows=A,D.numSpotMaps=x,D.numLightProbes=I,i.version=Lx++)}function l(c,h){let f=0,u=0,d=0,g=0,M=0,p=0,m=h.matrixWorldInverse;for(let S=0,T=c.length;S<T;S++){let y=c[S];if(y.isSunLight){let E=i.sun[f];E.direction.setFromMatrixPosition(y.matrixWorld),E.direction.transformDirection(m),f++}else if(y.isDirectionalLight){let E=i.directional[u];E.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(m),u++}else if(y.isSpotLight){let E=i.spot[g];E.position.setFromMatrixPosition(y.matrixWorld),E.position.applyMatrix4(m),E.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(m),g++}else if(y.isRectAreaLight){let E=i.rectArea[M];E.position.setFromMatrixPosition(y.matrixWorld),E.position.applyMatrix4(m),a.identity(),r.copy(y.matrixWorld),r.premultiply(m),a.extractRotation(r),E.halfWidth.set(y.width*.5,0,0),E.halfHeight.set(0,y.height*.5,0),E.halfWidth.applyMatrix4(a),E.halfHeight.applyMatrix4(a),M++}else if(y.isPointLight){let E=i.point[d];E.position.setFromMatrixPosition(y.matrixWorld),E.position.applyMatrix4(m),d++}else if(y.isHemisphereLight){let E=i.hemi[p];E.direction.setFromMatrixPosition(y.matrixWorld),E.direction.transformDirection(m),p++}}}return{setup:o,setupView:l,state:i}}function Yu(n){let t=new Nx(n),e=[],i=[],s=[];function r(u){f.camera=u,e.length=0,i.length=0,s.length=0}function a(u){e.push(u)}function o(u){i.push(u)}function l(u){s.push(u)}function c(){t.setup(e)}function h(u){t.setupView(e,u)}let f={lightsArray:e,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:f,setupLights:c,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function Ux(n){let t=new WeakMap;function e(s,r=0){let a=t.get(s),o;return a===void 0?(o=new Yu(n),t.set(s,[o])):r>=a.length?(o=new Yu(n),a.push(o)):o=a[r],o}function i(){t=new WeakMap}return{get:e,dispose:i}}function kx(n,t,e){let i=new oi,s=new ot,r=new ot,a=new _e,o=new Pa,l=new La,c={},h=e.maxTextureSize,f={[di]:Fe,[Fe]:di,[nn]:nn},u=new tn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ot},radius:{value:4}},vertexShader:Fx,fragmentShader:Bx}),d=u.clone();d.defines.HORIZONTAL_PASS=1;let g=new Le;g.setAttribute("position",new Ne(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let M=new pe(g,u),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ui;let m=this.type;this.render=function(v,A,x){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||v.length===0)return;this.type===Oh&&(Ft("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Ui);let w=n.getRenderTarget(),I=n.getActiveCubeFace(),D=n.getActiveMipmapLevel(),O=n.state;O.setBlending(Un),O.buffers.depth.getReversed()===!0?O.buffers.color.setClear(0,0,0,0):O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);let H=m!==this.type;H&&A.traverse(function(N){N.material&&(Array.isArray(N.material)?N.material.forEach(C=>C.needsUpdate=!0):N.material.needsUpdate=!0)});for(let N=0,C=v.length;N<C;N++){let B=v[N],k=B.shadow;if(k===void 0){Ft("WebGLShadowMap:",B,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;s.copy(k.mapSize);let j=k.getFrameExtents();s.multiply(j),r.copy(k.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/j.x),s.x=r.x*j.x,k.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/j.y),s.y=r.y*j.y,k.mapSize.y=r.y));let q=n.state.buffers.depth.getReversed();if(k.camera._reversedDepth=q,k.map===null||H===!0){if(k.map!==null&&(k.map.depthTexture!==null&&(k.map.depthTexture.dispose(),k.map.depthTexture=null),k.map.dispose()),this.type===_s){if(B.isPointLight){Ft("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}k.map=new Ye(s.x,s.y,{format:gi,type:Sn,minFilter:Ae,magFilter:Ae,generateMipmaps:!1}),k.map.texture.name=B.name+".shadowMap",k.map.depthTexture=new li(s.x,s.y,un),k.map.depthTexture.name=B.name+".shadowMapDepth",k.map.depthTexture.format=In,k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=Pe,k.map.depthTexture.magFilter=Pe}else B.isPointLight?(k.map=new Oo(s.x),k.map.depthTexture=new Ta(s.x,vn)):(k.map=new Ye(s.x,s.y),k.map.depthTexture=new li(s.x,s.y,vn)),k.map.depthTexture.name=B.name+".shadowMap",k.map.depthTexture.format=In,this.type===Ui?(k.map.depthTexture.compareFunction=q?Uo:No,k.map.depthTexture.minFilter=Ae,k.map.depthTexture.magFilter=Ae):(k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=Pe,k.map.depthTexture.magFilter=Pe);k.camera.updateProjectionMatrix()}k.map.isWebGLCubeRenderTarget!==!0&&(k.map.width!==s.x||k.map.height!==s.y)&&k.map.setSize(s.x,s.y);let K=k.map.isWebGLCubeRenderTarget?6:k.getViewportCount();B.isPointLight!==!0&&k.updateMatrices(B,x);for(let $=0;$<K;$++){let wt=k.getCamera($);if(B.isPointLight){let bt=k.camera,ne=k.matrix,Yt=B.distance||bt.far;Yt!==bt.far&&(bt.far=Yt,bt.updateProjectionMatrix()),Fr.setFromMatrixPosition(B.matrixWorld),bt.position.copy(Fr),Ac.copy(bt.position),Ac.add(Ox[$]),bt.up.copy(zx[$]),bt.lookAt(Ac),bt.updateMatrixWorld(),ne.makeTranslation(-Fr.x,-Fr.y,-Fr.z),Zu.multiplyMatrices(bt.projectionMatrix,bt.matrixWorldInverse),k._frustum.setFromProjectionMatrix(Zu,bt.coordinateSystem,bt.reversedDepth)}if(k.map.isWebGLCubeRenderTarget)n.setRenderTarget(k.map,$),n.clear();else{$===0&&(n.setRenderTarget(k.map),n.clear());let bt=k.getViewport($);a.set(r.x*bt.x,r.y*bt.y,r.x*bt.z,r.y*bt.w),O.viewport(a)}i=k.getFrustum($),y(A,x,wt,B,this.type)}k.isPointLightShadow!==!0&&this.type===_s&&S(k,x),k.needsUpdate=!1}m=this.type,p.needsUpdate=!1,n.setRenderTarget(w,I,D)};function S(v,A){let x=t.update(M);u.defines.VSM_SAMPLES!==v.blurSamples&&(u.defines.VSM_SAMPLES=v.blurSamples,d.defines.VSM_SAMPLES=v.blurSamples,u.needsUpdate=!0,d.needsUpdate=!0),v.mapPass===null?v.mapPass=new Ye(s.x,s.y,{format:gi,type:Sn}):(v.mapPass.width!==v.map.width||v.mapPass.height!==v.map.height)&&v.mapPass.setSize(v.map.width,v.map.height),u.uniforms.shadow_pass.value=v.map.depthTexture,u.uniforms.resolution.value.set(v.map.width,v.map.height),u.uniforms.radius.value=v.radius,n.setRenderTarget(v.mapPass),n.clear(),n.renderBufferDirect(A,null,x,u,M,null),d.uniforms.shadow_pass.value=v.mapPass.texture,d.uniforms.resolution.value.set(v.map.width,v.map.height),d.uniforms.radius.value=v.radius,n.setRenderTarget(v.map),n.clear(),n.renderBufferDirect(A,null,x,d,M,null)}function T(v,A,x,w){let I=null,D=x.isPointLight===!0?v.customDistanceMaterial:v.customDepthMaterial;if(D!==void 0)I=D;else if(I=x.isPointLight===!0?l:o,n.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){let O=I.uuid,H=A.uuid,N=c[O];N===void 0&&(N={},c[O]=N);let C=N[H];C===void 0&&(C=I.clone(),N[H]=C,A.addEventListener("dispose",E)),I=C}if(I.visible=A.visible,I.wireframe=A.wireframe,w===_s?I.side=A.shadowSide!==null?A.shadowSide:A.side:I.side=A.shadowSide!==null?A.shadowSide:f[A.side],I.alphaMap=A.alphaMap,I.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,I.map=A.map,I.clipShadows=A.clipShadows,I.clippingPlanes=A.clippingPlanes,I.clipIntersection=A.clipIntersection,I.displacementMap=A.displacementMap,I.displacementScale=A.displacementScale,I.displacementBias=A.displacementBias,I.wireframeLinewidth=A.wireframeLinewidth,I.linewidth=A.linewidth,x.isPointLight===!0&&I.isMeshDistanceMaterial===!0){let O=n.properties.get(I);O.light=x}return I}function y(v,A,x,w,I){if(v.visible===!1)return;if(v.layers.test(A.layers)&&(v.isMesh||v.isLine||v.isPoints)&&(v.castShadow||v.receiveShadow&&I===_s)&&(!v.frustumCulled||v.intersectsFrustum(i))){v.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,v.matrixWorld);let H=t.update(v),N=v.material;if(Array.isArray(N)){let C=H.groups;for(let B=0,k=C.length;B<k;B++){let j=C[B],q=N[j.materialIndex];if(q&&q.visible){let K=T(v,q,w,I);v.onBeforeShadow(n,v,A,x,H,K,j),n.renderBufferDirect(x,null,H,K,v,j),v.onAfterShadow(n,v,A,x,H,K,j)}}}else if(N.visible){let C=T(v,N,w,I);v.onBeforeShadow(n,v,A,x,H,C,null),n.renderBufferDirect(x,null,H,C,v,null),v.onAfterShadow(n,v,A,x,H,C,null)}}let O=v.children;for(let H=0,N=O.length;H<N;H++)y(O[H],A,x,w,I)}function E(v){v.target.removeEventListener("dispose",E);for(let x in c){let w=c[x],I=v.target.uuid;I in w&&(w[I].dispose(),delete w[I])}}}function Vx(n,t){function e(){let F=!1,dt=new _e,Q=null,pt=new _e(0,0,0,0);return{setMask:function(vt){Q!==vt&&!F&&(n.colorMask(vt,vt,vt,vt),Q=vt)},setLocked:function(vt){F=vt},setClear:function(vt,it,Lt,Rt,fe){fe===!0&&(vt*=Rt,it*=Rt,Lt*=Rt),dt.set(vt,it,Lt,Rt),pt.equals(dt)===!1&&(n.clearColor(vt,it,Lt,Rt),pt.copy(dt))},reset:function(){F=!1,Q=null,pt.set(-1,0,0,0)}}}function i(){let F=!1,dt=!1,Q=null,pt=null,vt=null;return{setReversed:function(it){if(dt!==it){let Lt=t.get("EXT_clip_control");it?Lt.clipControlEXT(Lt.LOWER_LEFT_EXT,Lt.ZERO_TO_ONE_EXT):Lt.clipControlEXT(Lt.LOWER_LEFT_EXT,Lt.NEGATIVE_ONE_TO_ONE_EXT),dt=it;let Rt=vt;vt=null,this.setClear(Rt)}},getReversed:function(){return dt},setTest:function(it){it?et(n.DEPTH_TEST):xt(n.DEPTH_TEST)},setMask:function(it){Q!==it&&!F&&(n.depthMask(it),Q=it)},setFunc:function(it){if(dt&&(it=yu[it]),pt!==it){switch(it){case ua:n.depthFunc(n.NEVER);break;case fa:n.depthFunc(n.ALWAYS);break;case da:n.depthFunc(n.LESS);break;case rs:n.depthFunc(n.LEQUAL);break;case pa:n.depthFunc(n.EQUAL);break;case ma:n.depthFunc(n.GEQUAL);break;case ga:n.depthFunc(n.GREATER);break;case xa:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}pt=it}},setLocked:function(it){F=it},setClear:function(it){vt!==it&&(vt=it,dt&&(it=1-it),n.clearDepth(it))},reset:function(){F=!1,Q=null,pt=null,vt=null,dt=!1}}}function s(){let F=!1,dt=null,Q=null,pt=null,vt=null,it=null,Lt=null,Rt=null,fe=null;return{setTest:function(se){F||(se?et(n.STENCIL_TEST):xt(n.STENCIL_TEST))},setMask:function(se){dt!==se&&!F&&(n.stencilMask(se),dt=se)},setFunc:function(se,dn,An){(Q!==se||pt!==dn||vt!==An)&&(n.stencilFunc(se,dn,An),Q=se,pt=dn,vt=An)},setOp:function(se,dn,An){(it!==se||Lt!==dn||Rt!==An)&&(n.stencilOp(se,dn,An),it=se,Lt=dn,Rt=An)},setLocked:function(se){F=se},setClear:function(se){fe!==se&&(n.clearStencil(se),fe=se)},reset:function(){F=!1,dt=null,Q=null,pt=null,vt=null,it=null,Lt=null,Rt=null,fe=null}}}let r=new e,a=new i,o=new s,l=new WeakMap,c=new WeakMap,h={},f={},u={},d=new WeakMap,g=[],M=null,p=!1,m=null,S=null,T=null,y=null,E=null,v=null,A=null,x=new Wt(0,0,0),w=0,I=!1,D=null,O=null,H=null,N=null,C=null,B=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),k=!1,j=0,q=n.getParameter(n.VERSION);q.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec(q)[1]),k=j>=1):q.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),k=j>=2);let K=null,$={},wt=n.getParameter(n.SCISSOR_BOX),bt=n.getParameter(n.VIEWPORT),ne=new _e().fromArray(wt),Yt=new _e().fromArray(bt);function te(F,dt,Q,pt){let vt=new Uint8Array(4),it=n.createTexture();n.bindTexture(F,it),n.texParameteri(F,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(F,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Lt=0;Lt<Q;Lt++)F===n.TEXTURE_3D||F===n.TEXTURE_2D_ARRAY?n.texImage3D(dt,0,n.RGBA,1,1,pt,0,n.RGBA,n.UNSIGNED_BYTE,vt):n.texImage2D(dt+Lt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,vt);return it}let J={};J[n.TEXTURE_2D]=te(n.TEXTURE_2D,n.TEXTURE_2D,1),J[n.TEXTURE_CUBE_MAP]=te(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),J[n.TEXTURE_2D_ARRAY]=te(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),J[n.TEXTURE_3D]=te(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),et(n.DEPTH_TEST),a.setFunc(rs),at(!1),ht(Hl),et(n.CULL_FACE),st(Un);function et(F){h[F]!==!0&&(n.enable(F),h[F]=!0)}function xt(F){h[F]!==!1&&(n.disable(F),h[F]=!1)}function Bt(F,dt){return u[F]!==dt?(n.bindFramebuffer(F,dt),u[F]=dt,F===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=dt),F===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=dt),!0):!1}function St(F,dt){let Q=g,pt=!1;if(F){Q=d.get(dt),Q===void 0&&(Q=[],d.set(dt,Q));let vt=F.textures;if(Q.length!==vt.length||Q[0]!==n.COLOR_ATTACHMENT0){for(let it=0,Lt=vt.length;it<Lt;it++)Q[it]=n.COLOR_ATTACHMENT0+it;Q.length=vt.length,pt=!0}}else Q[0]!==n.BACK&&(Q[0]=n.BACK,pt=!0);pt&&n.drawBuffers(Q)}function zt(F){return M!==F?(n.useProgram(F),M=F,!0):!1}let le={[Fi]:n.FUNC_ADD,[kh]:n.FUNC_SUBTRACT,[Vh]:n.FUNC_REVERSE_SUBTRACT};le[Gh]=n.MIN,le[Hh]=n.MAX;let nt={[Wh]:n.ZERO,[Xh]:n.ONE,[qh]:n.SRC_COLOR,[Yl]:n.SRC_ALPHA,[Qh]:n.SRC_ALPHA_SATURATE,[Jh]:n.DST_COLOR,[Zh]:n.DST_ALPHA,[Yh]:n.ONE_MINUS_SRC_COLOR,[Zl]:n.ONE_MINUS_SRC_ALPHA,[Kh]:n.ONE_MINUS_DST_COLOR,[$h]:n.ONE_MINUS_DST_ALPHA,[jh]:n.CONSTANT_COLOR,[tu]:n.ONE_MINUS_CONSTANT_COLOR,[eu]:n.CONSTANT_ALPHA,[nu]:n.ONE_MINUS_CONSTANT_ALPHA};function st(F,dt,Q,pt,vt,it,Lt,Rt,fe,se){if(F===Un){p===!0&&(xt(n.BLEND),p=!1);return}if(p===!1&&(et(n.BLEND),p=!0),F!==zh){if(F!==m||se!==I){if((S!==Fi||E!==Fi)&&(n.blendEquation(n.FUNC_ADD),S=Fi,E=Fi),se)switch(F){case ys:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Wl:n.blendFunc(n.ONE,n.ONE);break;case Xl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case ql:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:Ot("WebGLState: Invalid blending: ",F);break}else switch(F){case ys:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Wl:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Xl:Ot("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case ql:Ot("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ot("WebGLState: Invalid blending: ",F);break}T=null,y=null,v=null,A=null,x.set(0,0,0),w=0,m=F,I=se}return}vt=vt||dt,it=it||Q,Lt=Lt||pt,(dt!==S||vt!==E)&&(n.blendEquationSeparate(le[dt],le[vt]),S=dt,E=vt),(Q!==T||pt!==y||it!==v||Lt!==A)&&(n.blendFuncSeparate(nt[Q],nt[pt],nt[it],nt[Lt]),T=Q,y=pt,v=it,A=Lt),(Rt.equals(x)===!1||fe!==w)&&(n.blendColor(Rt.r,Rt.g,Rt.b,fe),x.copy(Rt),w=fe),m=F,I=!1}function rt(F,dt){F.side===nn?xt(n.CULL_FACE):et(n.CULL_FACE);let Q=F.side===Fe;dt&&(Q=!Q),at(Q),F.blending===ys&&F.transparent===!1?st(Un):st(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),a.setFunc(F.depthFunc),a.setTest(F.depthTest),a.setMask(F.depthWrite),r.setMask(F.colorWrite);let pt=F.stencilWrite;o.setTest(pt),pt&&(o.setMask(F.stencilWriteMask),o.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),o.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),Dt(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?et(n.SAMPLE_ALPHA_TO_COVERAGE):xt(n.SAMPLE_ALPHA_TO_COVERAGE)}function at(F){D!==F&&(F?n.frontFace(n.CW):n.frontFace(n.CCW),D=F)}function ht(F){F!==Fh?(et(n.CULL_FACE),F!==O&&(F===Hl?n.cullFace(n.BACK):F===Bh?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):xt(n.CULL_FACE),O=F}function Nt(F){F!==H&&(k&&n.lineWidth(F),H=F)}function Dt(F,dt,Q){F?(et(n.POLYGON_OFFSET_FILL),(N!==dt||C!==Q)&&(N=dt,C=Q,a.getReversed()&&(dt=-dt),n.polygonOffset(dt,Q))):xt(n.POLYGON_OFFSET_FILL)}function kt(F){F?et(n.SCISSOR_TEST):xt(n.SCISSOR_TEST)}function Gt(F){F===void 0&&(F=n.TEXTURE0+B-1),K!==F&&(n.activeTexture(F),K=F)}function L(F,dt,Q){Q===void 0&&(K===null?Q=n.TEXTURE0+B-1:Q=K);let pt=$[Q];pt===void 0&&(pt={type:void 0,texture:void 0},$[Q]=pt),(pt.type!==F||pt.texture!==dt)&&(K!==Q&&(n.activeTexture(Q),K=Q),n.bindTexture(F,dt||J[F]),pt.type=F,pt.texture=dt)}function ie(){let F=$[K];F!==void 0&&F.type!==void 0&&(n.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function Zt(){try{n.compressedTexImage2D(...arguments)}catch(F){Ot("WebGLState:",F)}}function R(){try{n.compressedTexImage3D(...arguments)}catch(F){Ot("WebGLState:",F)}}function _(){try{n.texSubImage2D(...arguments)}catch(F){Ot("WebGLState:",F)}}function z(){try{n.texSubImage3D(...arguments)}catch(F){Ot("WebGLState:",F)}}function W(){try{n.compressedTexSubImage2D(...arguments)}catch(F){Ot("WebGLState:",F)}}function Y(){try{n.compressedTexSubImage3D(...arguments)}catch(F){Ot("WebGLState:",F)}}function lt(){try{n.texStorage2D(...arguments)}catch(F){Ot("WebGLState:",F)}}function ct(){try{n.texStorage3D(...arguments)}catch(F){Ot("WebGLState:",F)}}function Z(){try{n.texImage2D(...arguments)}catch(F){Ot("WebGLState:",F)}}function tt(){try{n.texImage3D(...arguments)}catch(F){Ot("WebGLState:",F)}}function ut(F){return f[F]!==void 0?f[F]:n.getParameter(F)}function It(F,dt){f[F]!==dt&&(n.pixelStorei(F,dt),f[F]=dt)}function mt(F){ne.equals(F)===!1&&(n.scissor(F.x,F.y,F.z,F.w),ne.copy(F))}function ft(F){Yt.equals(F)===!1&&(n.viewport(F.x,F.y,F.z,F.w),Yt.copy(F))}function Pt(F,dt){let Q=c.get(dt);Q===void 0&&(Q=new WeakMap,c.set(dt,Q));let pt=Q.get(F);pt===void 0&&(pt=n.getUniformBlockIndex(dt,F.name),Q.set(F,pt))}function Ut(F,dt){let pt=c.get(dt).get(F);l.get(dt)!==pt&&(n.uniformBlockBinding(dt,pt,F.__bindingPointIndex),l.set(dt,pt))}function Ht(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),h={},f={},K=null,$={},u={},d=new WeakMap,g=[],M=null,p=!1,m=null,S=null,T=null,y=null,E=null,v=null,A=null,x=new Wt(0,0,0),w=0,I=!1,D=null,O=null,H=null,N=null,C=null,ne.set(0,0,n.canvas.width,n.canvas.height),Yt.set(0,0,n.canvas.width,n.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:et,disable:xt,bindFramebuffer:Bt,drawBuffers:St,useProgram:zt,setBlending:st,setMaterial:rt,setFlipSided:at,setCullFace:ht,setLineWidth:Nt,setPolygonOffset:Dt,setScissorTest:kt,activeTexture:Gt,bindTexture:L,unbindTexture:ie,compressedTexImage2D:Zt,compressedTexImage3D:R,texImage2D:Z,texImage3D:tt,pixelStorei:It,getParameter:ut,updateUBOMapping:Pt,uniformBlockBinding:Ut,texStorage2D:lt,texStorage3D:ct,texSubImage2D:_,texSubImage3D:z,compressedTexSubImage2D:W,compressedTexSubImage3D:Y,scissor:mt,viewport:ft,reset:Ht}}function Gx(n,t,e,i,s,r,a){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ot,h=new WeakMap,f=new Set,u,d=new WeakMap,g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function M(R,_){return g?new OffscreenCanvas(R,_):$s("canvas")}function p(R,_,z){let W=1,Y=Zt(R);if((Y.width>z||Y.height>z)&&(W=z/Math.max(Y.width,Y.height)),W<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){let lt=Math.floor(W*Y.width),ct=Math.floor(W*Y.height);u===void 0&&(u=M(lt,ct));let Z=_?M(lt,ct):u;return Z.width=lt,Z.height=ct,Z.getContext("2d").drawImage(R,0,0,lt,ct),Ft("WebGLRenderer: Texture has been resized from ("+Y.width+"x"+Y.height+") to ("+lt+"x"+ct+")."),Z}else return"data"in R&&Ft("WebGLRenderer: Image in DataTexture is too big ("+Y.width+"x"+Y.height+")."),R;return R}function m(R){return R.generateMipmaps}function S(R){n.generateMipmap(R)}function T(R){return R.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?n.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function y(R,_,z,W,Y,lt=!1){if(R!==null){if(n[R]!==void 0)return n[R];Ft("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let ct;W&&(ct=t.get("EXT_texture_norm16"),ct||Ft("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Z=_;if(_===n.RED&&(z===n.FLOAT&&(Z=n.R32F),z===n.HALF_FLOAT&&(Z=n.R16F),z===n.UNSIGNED_BYTE&&(Z=n.R8),z===n.UNSIGNED_SHORT&&ct&&(Z=ct.R16_EXT),z===n.SHORT&&ct&&(Z=ct.R16_SNORM_EXT)),_===n.RED_INTEGER&&(z===n.UNSIGNED_BYTE&&(Z=n.R8UI),z===n.UNSIGNED_SHORT&&(Z=n.R16UI),z===n.UNSIGNED_INT&&(Z=n.R32UI),z===n.BYTE&&(Z=n.R8I),z===n.SHORT&&(Z=n.R16I),z===n.INT&&(Z=n.R32I)),_===n.RG&&(z===n.FLOAT&&(Z=n.RG32F),z===n.HALF_FLOAT&&(Z=n.RG16F),z===n.UNSIGNED_BYTE&&(Z=n.RG8),z===n.UNSIGNED_SHORT&&ct&&(Z=ct.RG16_EXT),z===n.SHORT&&ct&&(Z=ct.RG16_SNORM_EXT)),_===n.RG_INTEGER&&(z===n.UNSIGNED_BYTE&&(Z=n.RG8UI),z===n.UNSIGNED_SHORT&&(Z=n.RG16UI),z===n.UNSIGNED_INT&&(Z=n.RG32UI),z===n.BYTE&&(Z=n.RG8I),z===n.SHORT&&(Z=n.RG16I),z===n.INT&&(Z=n.RG32I)),_===n.RGB_INTEGER&&(z===n.UNSIGNED_BYTE&&(Z=n.RGB8UI),z===n.UNSIGNED_SHORT&&(Z=n.RGB16UI),z===n.UNSIGNED_INT&&(Z=n.RGB32UI),z===n.BYTE&&(Z=n.RGB8I),z===n.SHORT&&(Z=n.RGB16I),z===n.INT&&(Z=n.RGB32I)),_===n.RGBA_INTEGER&&(z===n.UNSIGNED_BYTE&&(Z=n.RGBA8UI),z===n.UNSIGNED_SHORT&&(Z=n.RGBA16UI),z===n.UNSIGNED_INT&&(Z=n.RGBA32UI),z===n.BYTE&&(Z=n.RGBA8I),z===n.SHORT&&(Z=n.RGBA16I),z===n.INT&&(Z=n.RGBA32I)),_===n.RGB&&(z===n.UNSIGNED_SHORT&&ct&&(Z=ct.RGB16_EXT),z===n.SHORT&&ct&&(Z=ct.RGB16_SNORM_EXT),z===n.UNSIGNED_INT_5_9_9_9_REV&&(Z=n.RGB9_E5),z===n.UNSIGNED_INT_10F_11F_11F_REV&&(Z=n.R11F_G11F_B10F)),_===n.RGBA){let tt=lt?Zs:Qt.getTransfer(Y);z===n.FLOAT&&(Z=n.RGBA32F),z===n.HALF_FLOAT&&(Z=n.RGBA16F),z===n.UNSIGNED_BYTE&&(Z=tt===ae?n.SRGB8_ALPHA8:n.RGBA8),z===n.UNSIGNED_SHORT&&ct&&(Z=ct.RGBA16_EXT),z===n.SHORT&&ct&&(Z=ct.RGBA16_SNORM_EXT),z===n.UNSIGNED_SHORT_4_4_4_4&&(Z=n.RGBA4),z===n.UNSIGNED_SHORT_5_5_5_1&&(Z=n.RGB5_A1)}return(Z===n.R16F||Z===n.R32F||Z===n.RG16F||Z===n.RG32F||Z===n.RGBA16F||Z===n.RGBA32F)&&t.get("EXT_color_buffer_float"),Z}function E(R,_){let z;return R?_===null||_===vn||_===Ss?z=n.DEPTH24_STENCIL8:_===un?z=n.DEPTH32F_STENCIL8:_===vs&&(z=n.DEPTH24_STENCIL8,Ft("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===vn||_===Ss?z=n.DEPTH_COMPONENT24:_===un?z=n.DEPTH_COMPONENT32F:_===vs&&(z=n.DEPTH_COMPONENT16),z}function v(R,_){return m(R)===!0||R.isFramebufferTexture&&R.minFilter!==Pe&&R.minFilter!==Ae?Math.log2(Math.max(_.width,_.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?_.mipmaps.length:1}function A(R){let _=R.target;_.removeEventListener("dispose",A),w(_),_.isVideoTexture&&h.delete(_),_.isHTMLTexture&&f.delete(_)}function x(R){let _=R.target;_.removeEventListener("dispose",x),D(_)}function w(R){let _=i.get(R);if(_.__webglInit===void 0)return;let z=R.source,W=d.get(z);if(W){let Y=W[_.__cacheKey];Y.usedTimes--,Y.usedTimes===0&&I(R),Object.keys(W).length===0&&d.delete(z)}i.remove(R)}function I(R){let _=i.get(R);n.deleteTexture(_.__webglTexture);let z=R.source,W=d.get(z);delete W[_.__cacheKey],a.memory.textures--}function D(R){let _=i.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),i.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let W=0;W<6;W++){if(Array.isArray(_.__webglFramebuffer[W]))for(let Y=0;Y<_.__webglFramebuffer[W].length;Y++)n.deleteFramebuffer(_.__webglFramebuffer[W][Y]);else n.deleteFramebuffer(_.__webglFramebuffer[W]);_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer[W])}else{if(Array.isArray(_.__webglFramebuffer))for(let W=0;W<_.__webglFramebuffer.length;W++)n.deleteFramebuffer(_.__webglFramebuffer[W]);else n.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&n.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let W=0;W<_.__webglColorRenderbuffer.length;W++)_.__webglColorRenderbuffer[W]&&n.deleteRenderbuffer(_.__webglColorRenderbuffer[W]);_.__webglDepthRenderbuffer&&n.deleteRenderbuffer(_.__webglDepthRenderbuffer)}let z=R.textures;for(let W=0,Y=z.length;W<Y;W++){let lt=i.get(z[W]);lt.__webglTexture&&(n.deleteTexture(lt.__webglTexture),a.memory.textures--),i.remove(z[W])}i.remove(R)}let O=0;function H(){O=0}function N(){return O}function C(R){O=R}function B(){let R=O;return R>=s.maxTextures&&Ft("WebGLTextures: Trying to use "+(R+1)+" texture units while this GPU supports only "+s.maxTextures),O+=1,R}function k(R){let _=[];return _.push(R.wrapS),_.push(R.wrapT),_.push(R.wrapR||0),_.push(R.magFilter),_.push(R.minFilter),_.push(R.anisotropy),_.push(R.internalFormat),_.push(R.format),_.push(R.type),_.push(R.generateMipmaps),_.push(R.premultiplyAlpha),_.push(R.flipY),_.push(R.unpackAlignment),_.push(R.colorSpace),_.join()}function j(R,_){let z=i.get(R);if(R.isVideoTexture&&L(R),R.isRenderTargetTexture===!1&&R.isExternalTexture!==!0&&R.version>0&&z.__version!==R.version){let W=R.image;if(W===null)Ft("WebGLRenderer: Texture marked for update but no image data found.");else if(W.complete===!1)Ft("WebGLRenderer: Texture marked for update but image is incomplete");else{xt(z,R,_);return}}else R.isExternalTexture&&(z.__webglTexture=R.sourceTexture?R.sourceTexture:null);e.bindTexture(n.TEXTURE_2D,z.__webglTexture,n.TEXTURE0+_)}function q(R,_){let z=i.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&z.__version!==R.version){xt(z,R,_);return}else R.isExternalTexture&&(z.__webglTexture=R.sourceTexture?R.sourceTexture:null);e.bindTexture(n.TEXTURE_2D_ARRAY,z.__webglTexture,n.TEXTURE0+_)}function K(R,_){let z=i.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&z.__version!==R.version){xt(z,R,_);return}e.bindTexture(n.TEXTURE_3D,z.__webglTexture,n.TEXTURE0+_)}function $(R,_){let z=i.get(R);if(R.isCubeDepthTexture!==!0&&R.version>0&&z.__version!==R.version){Bt(z,R,_);return}e.bindTexture(n.TEXTURE_CUBE_MAP,z.__webglTexture,n.TEXTURE0+_)}let wt={[as]:n.REPEAT,[Cn]:n.CLAMP_TO_EDGE,[_a]:n.MIRRORED_REPEAT},bt={[Pe]:n.NEAREST,[ru]:n.NEAREST_MIPMAP_NEAREST,[wr]:n.NEAREST_MIPMAP_LINEAR,[Ae]:n.LINEAR,[$a]:n.LINEAR_MIPMAP_NEAREST,[Fn]:n.LINEAR_MIPMAP_LINEAR},ne={[cu]:n.NEVER,[pu]:n.ALWAYS,[hu]:n.LESS,[No]:n.LEQUAL,[uu]:n.EQUAL,[Uo]:n.GEQUAL,[fu]:n.GREATER,[du]:n.NOTEQUAL};function Yt(R,_){if(_.type===un&&t.has("OES_texture_float_linear")===!1&&(_.magFilter===Ae||_.magFilter===$a||_.magFilter===wr||_.magFilter===Fn||_.minFilter===Ae||_.minFilter===$a||_.minFilter===wr||_.minFilter===Fn)&&Ft("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(R,n.TEXTURE_WRAP_S,wt[_.wrapS]),n.texParameteri(R,n.TEXTURE_WRAP_T,wt[_.wrapT]),(R===n.TEXTURE_3D||R===n.TEXTURE_2D_ARRAY)&&n.texParameteri(R,n.TEXTURE_WRAP_R,wt[_.wrapR]),n.texParameteri(R,n.TEXTURE_MAG_FILTER,bt[_.magFilter]),n.texParameteri(R,n.TEXTURE_MIN_FILTER,bt[_.minFilter]),_.compareFunction&&(n.texParameteri(R,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(R,n.TEXTURE_COMPARE_FUNC,ne[_.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Pe||_.minFilter!==wr&&_.minFilter!==Fn||_.type===un&&t.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||i.get(_).__currentAnisotropy){let z=t.get("EXT_texture_filter_anisotropic");n.texParameterf(R,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),i.get(_).__currentAnisotropy=_.anisotropy}}}function te(R,_){let z=!1;R.__webglInit===void 0&&(R.__webglInit=!0,_.addEventListener("dispose",A));let W=_.source,Y=d.get(W);Y===void 0&&(Y={},d.set(W,Y));let lt=k(_);if(lt!==R.__cacheKey){Y[lt]===void 0&&(Y[lt]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,z=!0),Y[lt].usedTimes++;let ct=Y[R.__cacheKey];ct!==void 0&&(Y[R.__cacheKey].usedTimes--,ct.usedTimes===0&&I(_)),R.__cacheKey=lt,R.__webglTexture=Y[lt].texture}return z}function J(R,_,z){return Math.floor(Math.floor(R/z)/_)}function et(R,_,z,W){let lt=R.updateRanges;if(lt.length===0)e.texSubImage2D(n.TEXTURE_2D,0,0,0,_.width,_.height,z,W,_.data);else{lt.sort((It,mt)=>It.start-mt.start);let ct=0;for(let It=1;It<lt.length;It++){let mt=lt[ct],ft=lt[It],Pt=mt.start+mt.count,Ut=J(ft.start,_.width,4),Ht=J(mt.start,_.width,4);ft.start<=Pt+1&&Ut===Ht&&J(ft.start+ft.count-1,_.width,4)===Ut?mt.count=Math.max(mt.count,ft.start+ft.count-mt.start):(++ct,lt[ct]=ft)}lt.length=ct+1;let Z=e.getParameter(n.UNPACK_ROW_LENGTH),tt=e.getParameter(n.UNPACK_SKIP_PIXELS),ut=e.getParameter(n.UNPACK_SKIP_ROWS);e.pixelStorei(n.UNPACK_ROW_LENGTH,_.width);for(let It=0,mt=lt.length;It<mt;It++){let ft=lt[It],Pt=Math.floor(ft.start/4),Ut=Math.ceil(ft.count/4),Ht=Pt%_.width,F=Math.floor(Pt/_.width),dt=Ut,Q=1;e.pixelStorei(n.UNPACK_SKIP_PIXELS,Ht),e.pixelStorei(n.UNPACK_SKIP_ROWS,F),e.texSubImage2D(n.TEXTURE_2D,0,Ht,F,dt,Q,z,W,_.data)}R.clearUpdateRanges(),e.pixelStorei(n.UNPACK_ROW_LENGTH,Z),e.pixelStorei(n.UNPACK_SKIP_PIXELS,tt),e.pixelStorei(n.UNPACK_SKIP_ROWS,ut)}}function xt(R,_,z){let W=n.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(W=n.TEXTURE_2D_ARRAY),_.isData3DTexture&&(W=n.TEXTURE_3D);let Y=te(R,_),lt=_.source;e.bindTexture(W,R.__webglTexture,n.TEXTURE0+z);let ct=i.get(lt);if(lt.version!==ct.__version||Y===!0){if(e.activeTexture(n.TEXTURE0+z),(typeof ImageBitmap<"u"&&_.image instanceof ImageBitmap)===!1){let Q=Qt.getPrimaries(Qt.workingColorSpace),pt=_.colorSpace===Mn?null:Qt.getPrimaries(_.colorSpace),vt=_.colorSpace===Mn||Q===pt?n.NONE:n.BROWSER_DEFAULT_WEBGL;e.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),e.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),e.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,vt)}e.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment);let tt=p(_.image,!1,s.maxTextureSize);tt=ie(_,tt);let ut=r.convert(_.format,_.colorSpace),It=r.convert(_.type),mt=y(_.internalFormat,ut,It,_.normalized,_.colorSpace,_.isVideoTexture);Yt(W,_);let ft,Pt=_.mipmaps,Ut=_.isVideoTexture!==!0,Ht=ct.__version===void 0||Y===!0,F=lt.dataReady,dt=v(_,tt);if(_.isDepthTexture)mt=E(_.format===mi,_.type),Ht&&(Ut?e.texStorage2D(n.TEXTURE_2D,1,mt,tt.width,tt.height):e.texImage2D(n.TEXTURE_2D,0,mt,tt.width,tt.height,0,ut,It,null));else if(_.isDataTexture)if(Pt.length>0){Ut&&Ht&&e.texStorage2D(n.TEXTURE_2D,dt,mt,Pt[0].width,Pt[0].height);for(let Q=0,pt=Pt.length;Q<pt;Q++)ft=Pt[Q],Ut?F&&e.texSubImage2D(n.TEXTURE_2D,Q,0,0,ft.width,ft.height,ut,It,ft.data):e.texImage2D(n.TEXTURE_2D,Q,mt,ft.width,ft.height,0,ut,It,ft.data);_.generateMipmaps=!1}else Ut?(Ht&&e.texStorage2D(n.TEXTURE_2D,dt,mt,tt.width,tt.height),F&&et(_,tt,ut,It)):e.texImage2D(n.TEXTURE_2D,0,mt,tt.width,tt.height,0,ut,It,tt.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){Ut&&Ht&&e.texStorage3D(n.TEXTURE_2D_ARRAY,dt,mt,Pt[0].width,Pt[0].height,tt.depth);for(let Q=0,pt=Pt.length;Q<pt;Q++)if(ft=Pt[Q],_.format!==fn)if(ut!==null)if(Ut){if(F)if(_.layerUpdates.size>0){let vt=pc(ft.width,ft.height,_.format,_.type);for(let it of _.layerUpdates){let Lt=ft.data.subarray(it*vt/ft.data.BYTES_PER_ELEMENT,(it+1)*vt/ft.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,Q,0,0,it,ft.width,ft.height,1,ut,Lt)}}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,Q,0,0,0,ft.width,ft.height,tt.depth,ut,ft.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,Q,mt,ft.width,ft.height,tt.depth,0,ft.data,0,0);else Ft("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ut?F&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,Q,0,0,0,ft.width,ft.height,tt.depth,ut,It,ft.data):e.texImage3D(n.TEXTURE_2D_ARRAY,Q,mt,ft.width,ft.height,tt.depth,0,ut,It,ft.data);_.layerUpdates.size>0&&_.clearLayerUpdates()}else{Ut&&Ht&&e.texStorage2D(n.TEXTURE_2D,dt,mt,Pt[0].width,Pt[0].height);for(let Q=0,pt=Pt.length;Q<pt;Q++)ft=Pt[Q],_.format!==fn?ut!==null?Ut?F&&e.compressedTexSubImage2D(n.TEXTURE_2D,Q,0,0,ft.width,ft.height,ut,ft.data):e.compressedTexImage2D(n.TEXTURE_2D,Q,mt,ft.width,ft.height,0,ft.data):Ft("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ut?F&&e.texSubImage2D(n.TEXTURE_2D,Q,0,0,ft.width,ft.height,ut,It,ft.data):e.texImage2D(n.TEXTURE_2D,Q,mt,ft.width,ft.height,0,ut,It,ft.data)}else if(_.isDataArrayTexture)if(Ut){if(Ht&&e.texStorage3D(n.TEXTURE_2D_ARRAY,dt,mt,tt.width,tt.height,tt.depth),F)if(_.layerUpdates.size>0){let Q=pc(tt.width,tt.height,_.format,_.type);for(let pt of _.layerUpdates){let vt=tt.data.subarray(pt*Q/tt.data.BYTES_PER_ELEMENT,(pt+1)*Q/tt.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,pt,tt.width,tt.height,1,ut,It,vt)}_.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,tt.width,tt.height,tt.depth,ut,It,tt.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,mt,tt.width,tt.height,tt.depth,0,ut,It,tt.data);else if(_.isData3DTexture)Ut?(Ht&&e.texStorage3D(n.TEXTURE_3D,dt,mt,tt.width,tt.height,tt.depth),F&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,tt.width,tt.height,tt.depth,ut,It,tt.data)):e.texImage3D(n.TEXTURE_3D,0,mt,tt.width,tt.height,tt.depth,0,ut,It,tt.data);else if(_.isFramebufferTexture){if(Ht)if(Ut)e.texStorage2D(n.TEXTURE_2D,dt,mt,tt.width,tt.height);else{let Q=tt.width,pt=tt.height;for(let vt=0;vt<dt;vt++)e.texImage2D(n.TEXTURE_2D,vt,mt,Q,pt,0,ut,It,null),Q>>=1,pt>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in n){let Q=n.canvas;if(Q.hasAttribute("layoutsubtree")||Q.setAttribute("layoutsubtree","true"),tt.parentNode!==Q){Q.appendChild(tt),f.add(_),Q.onpaint=pt=>{let vt=pt.changedElements;for(let it of f)vt.includes(it.image)&&(it.needsUpdate=!0)},Q.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,tt);else{let vt=n.RGBA,it=n.RGBA,Lt=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,vt,it,Lt,tt)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Pt.length>0){if(Ut&&Ht){let Q=Zt(Pt[0]);e.texStorage2D(n.TEXTURE_2D,dt,mt,Q.width,Q.height)}for(let Q=0,pt=Pt.length;Q<pt;Q++)ft=Pt[Q],Ut?F&&e.texSubImage2D(n.TEXTURE_2D,Q,0,0,ut,It,ft):e.texImage2D(n.TEXTURE_2D,Q,mt,ut,It,ft);_.generateMipmaps=!1}else if(Ut){if(Ht){let Q=Zt(tt);e.texStorage2D(n.TEXTURE_2D,dt,mt,Q.width,Q.height)}F&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,ut,It,tt)}else e.texImage2D(n.TEXTURE_2D,0,mt,ut,It,tt);m(_)&&S(W),ct.__version=lt.version,_.onUpdate&&_.onUpdate(_)}R.__version=_.version}function Bt(R,_,z){if(_.image.length!==6)return;let W=te(R,_),Y=_.source;e.bindTexture(n.TEXTURE_CUBE_MAP,R.__webglTexture,n.TEXTURE0+z);let lt=i.get(Y);if(Y.version!==lt.__version||W===!0){e.activeTexture(n.TEXTURE0+z);let ct=Qt.getPrimaries(Qt.workingColorSpace),Z=_.colorSpace===Mn?null:Qt.getPrimaries(_.colorSpace),tt=_.colorSpace===Mn||ct===Z?n.NONE:n.BROWSER_DEFAULT_WEBGL;e.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),e.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),e.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),e.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,tt);let ut=_.isCompressedTexture||_.image[0].isCompressedTexture,It=_.image[0]&&_.image[0].isDataTexture,mt=[];for(let it=0;it<6;it++)!ut&&!It?mt[it]=p(_.image[it],!0,s.maxCubemapSize):mt[it]=It?_.image[it].image:_.image[it],mt[it]=ie(_,mt[it]);let ft=mt[0],Pt=r.convert(_.format,_.colorSpace),Ut=r.convert(_.type),Ht=y(_.internalFormat,Pt,Ut,_.normalized,_.colorSpace),F=_.isVideoTexture!==!0,dt=lt.__version===void 0||W===!0,Q=Y.dataReady,pt=v(_,ft);Yt(n.TEXTURE_CUBE_MAP,_);let vt;if(ut){F&&dt&&e.texStorage2D(n.TEXTURE_CUBE_MAP,pt,Ht,ft.width,ft.height);for(let it=0;it<6;it++){vt=mt[it].mipmaps;for(let Lt=0;Lt<vt.length;Lt++){let Rt=vt[Lt];_.format!==fn?Pt!==null?F?Q&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+it,Lt,0,0,Rt.width,Rt.height,Pt,Rt.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+it,Lt,Ht,Rt.width,Rt.height,0,Rt.data):Ft("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):F?Q&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+it,Lt,0,0,Rt.width,Rt.height,Pt,Ut,Rt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+it,Lt,Ht,Rt.width,Rt.height,0,Pt,Ut,Rt.data)}}}else{if(vt=_.mipmaps,F&&dt){vt.length>0&&pt++;let it=Zt(mt[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,pt,Ht,it.width,it.height)}for(let it=0;it<6;it++)if(It){F?Q&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,0,0,mt[it].width,mt[it].height,Pt,Ut,mt[it].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,Ht,mt[it].width,mt[it].height,0,Pt,Ut,mt[it].data);for(let Lt=0;Lt<vt.length;Lt++){let fe=vt[Lt].image[it].image;F?Q&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+it,Lt+1,0,0,fe.width,fe.height,Pt,Ut,fe.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+it,Lt+1,Ht,fe.width,fe.height,0,Pt,Ut,fe.data)}}else{F?Q&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,0,0,Pt,Ut,mt[it]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,Ht,Pt,Ut,mt[it]);for(let Lt=0;Lt<vt.length;Lt++){let Rt=vt[Lt];F?Q&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+it,Lt+1,0,0,Pt,Ut,Rt.image[it]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+it,Lt+1,Ht,Pt,Ut,Rt.image[it])}}}m(_)&&S(n.TEXTURE_CUBE_MAP),lt.__version=Y.version,_.onUpdate&&_.onUpdate(_)}R.__version=_.version}function St(R,_,z,W,Y,lt){let ct=r.convert(z.format,z.colorSpace),Z=r.convert(z.type),tt=y(z.internalFormat,ct,Z,z.normalized,z.colorSpace),ut=i.get(_),It=i.get(z);if(It.__renderTarget=_,!ut.__hasExternalTextures){let mt=Math.max(1,_.width>>lt),ft=Math.max(1,_.height>>lt);Y===n.TEXTURE_3D||Y===n.TEXTURE_2D_ARRAY?e.texImage3D(Y,lt,tt,mt,ft,_.depth,0,ct,Z,null):e.texImage2D(Y,lt,tt,mt,ft,0,ct,Z,null)}e.bindFramebuffer(n.FRAMEBUFFER,R),Gt(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,W,Y,It.__webglTexture,0,kt(_)):(Y===n.TEXTURE_2D||Y>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&Y<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,W,Y,It.__webglTexture,lt),e.bindFramebuffer(n.FRAMEBUFFER,null)}function zt(R,_,z){if(n.bindRenderbuffer(n.RENDERBUFFER,R),_.depthBuffer){let W=_.depthTexture,Y=W&&W.isDepthTexture?W.type:null,lt=E(_.stencilBuffer,Y),ct=_.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;Gt(_)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,kt(_),lt,_.width,_.height):z?n.renderbufferStorageMultisample(n.RENDERBUFFER,kt(_),lt,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,lt,_.width,_.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,ct,n.RENDERBUFFER,R)}else{let W=_.textures;for(let Y=0;Y<W.length;Y++){let lt=W[Y],ct=r.convert(lt.format,lt.colorSpace),Z=r.convert(lt.type),tt=y(lt.internalFormat,ct,Z,lt.normalized,lt.colorSpace);Gt(_)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,kt(_),tt,_.width,_.height):z?n.renderbufferStorageMultisample(n.RENDERBUFFER,kt(_),tt,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,tt,_.width,_.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function le(R,_,z){let W=_.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(n.FRAMEBUFFER,R),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let Y=i.get(_.depthTexture);if(Y.__renderTarget=_,(!Y.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),W){if(Y.__webglInit===void 0&&(Y.__webglInit=!0,_.depthTexture.addEventListener("dispose",A)),Y.__webglTexture===void 0){Y.__webglTexture=n.createTexture(),e.bindTexture(n.TEXTURE_CUBE_MAP,Y.__webglTexture),Yt(n.TEXTURE_CUBE_MAP,_.depthTexture);let ut=r.convert(_.depthTexture.format),It=r.convert(_.depthTexture.type),mt;_.depthTexture.format===In?mt=n.DEPTH_COMPONENT24:_.depthTexture.format===mi&&(mt=n.DEPTH24_STENCIL8);for(let ft=0;ft<6;ft++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ft,0,mt,_.width,_.height,0,ut,It,null)}}else j(_.depthTexture,0);let lt=Y.__webglTexture,ct=kt(_),Z=W?n.TEXTURE_CUBE_MAP_POSITIVE_X+z:n.TEXTURE_2D,tt=_.depthTexture.format===mi?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(_.depthTexture.format===In)Gt(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,tt,Z,lt,0,ct):n.framebufferTexture2D(n.FRAMEBUFFER,tt,Z,lt,0);else if(_.depthTexture.format===mi)Gt(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,tt,Z,lt,0,ct):n.framebufferTexture2D(n.FRAMEBUFFER,tt,Z,lt,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function nt(R){let _=i.get(R),z=R.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==R.depthTexture){let W=R.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),W){let Y=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,W.removeEventListener("dispose",Y)};W.addEventListener("dispose",Y),_.__depthDisposeCallback=Y}_.__boundDepthTexture=W}if(R.depthTexture&&!_.__autoAllocateDepthBuffer)if(z)for(let W=0;W<6;W++)le(_.__webglFramebuffer[W],R,W);else{let W=R.texture.mipmaps;W&&W.length>0?le(_.__webglFramebuffer[0],R,0):le(_.__webglFramebuffer,R,0)}else if(z){_.__webglDepthbuffer=[];for(let W=0;W<6;W++)if(e.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[W]),_.__webglDepthbuffer[W]===void 0)_.__webglDepthbuffer[W]=n.createRenderbuffer(),zt(_.__webglDepthbuffer[W],R,!1);else{let Y=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,lt=_.__webglDepthbuffer[W];n.bindRenderbuffer(n.RENDERBUFFER,lt),n.framebufferRenderbuffer(n.FRAMEBUFFER,Y,n.RENDERBUFFER,lt)}}else{let W=R.texture.mipmaps;if(W&&W.length>0?e.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[0]):e.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=n.createRenderbuffer(),zt(_.__webglDepthbuffer,R,!1);else{let Y=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,lt=_.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,lt),n.framebufferRenderbuffer(n.FRAMEBUFFER,Y,n.RENDERBUFFER,lt)}}e.bindFramebuffer(n.FRAMEBUFFER,null)}function st(R,_,z){let W=i.get(R);_!==void 0&&St(W.__webglFramebuffer,R,R.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),z!==void 0&&nt(R)}function rt(R){let _=R.texture,z=i.get(R),W=i.get(_);R.addEventListener("dispose",x);let Y=R.textures,lt=R.isWebGLCubeRenderTarget===!0,ct=Y.length>1;if(ct||(W.__webglTexture===void 0&&(W.__webglTexture=n.createTexture()),W.__version=_.version,a.memory.textures++),lt){z.__webglFramebuffer=[];for(let Z=0;Z<6;Z++)if(_.mipmaps&&_.mipmaps.length>0){z.__webglFramebuffer[Z]=[];for(let tt=0;tt<_.mipmaps.length;tt++)z.__webglFramebuffer[Z][tt]=n.createFramebuffer()}else z.__webglFramebuffer[Z]=n.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){z.__webglFramebuffer=[];for(let Z=0;Z<_.mipmaps.length;Z++)z.__webglFramebuffer[Z]=n.createFramebuffer()}else z.__webglFramebuffer=n.createFramebuffer();if(ct)for(let Z=0,tt=Y.length;Z<tt;Z++){let ut=i.get(Y[Z]);ut.__webglTexture===void 0&&(ut.__webglTexture=n.createTexture(),a.memory.textures++)}if(R.samples>0&&Gt(R)===!1){z.__webglMultisampledFramebuffer=n.createFramebuffer(),z.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let Z=0;Z<Y.length;Z++){let tt=Y[Z];z.__webglColorRenderbuffer[Z]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,z.__webglColorRenderbuffer[Z]);let ut=r.convert(tt.format,tt.colorSpace),It=r.convert(tt.type),mt=y(tt.internalFormat,ut,It,tt.normalized,tt.colorSpace,R.isXRRenderTarget===!0),ft=kt(R);n.renderbufferStorageMultisample(n.RENDERBUFFER,ft,mt,R.width,R.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Z,n.RENDERBUFFER,z.__webglColorRenderbuffer[Z])}n.bindRenderbuffer(n.RENDERBUFFER,null),R.depthBuffer&&(z.__webglDepthRenderbuffer=n.createRenderbuffer(),zt(z.__webglDepthRenderbuffer,R,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(lt){e.bindTexture(n.TEXTURE_CUBE_MAP,W.__webglTexture),Yt(n.TEXTURE_CUBE_MAP,_);for(let Z=0;Z<6;Z++)if(_.mipmaps&&_.mipmaps.length>0)for(let tt=0;tt<_.mipmaps.length;tt++)St(z.__webglFramebuffer[Z][tt],R,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,tt);else St(z.__webglFramebuffer[Z],R,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0);m(_)&&S(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(ct){for(let Z=0,tt=Y.length;Z<tt;Z++){let ut=Y[Z],It=i.get(ut),mt=n.TEXTURE_2D;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(mt=R.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(mt,It.__webglTexture),Yt(mt,ut),St(z.__webglFramebuffer,R,ut,n.COLOR_ATTACHMENT0+Z,mt,0),m(ut)&&S(mt)}e.unbindTexture()}else{let Z=n.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(Z=R.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(Z,W.__webglTexture),Yt(Z,_),_.mipmaps&&_.mipmaps.length>0)for(let tt=0;tt<_.mipmaps.length;tt++)St(z.__webglFramebuffer[tt],R,_,n.COLOR_ATTACHMENT0,Z,tt);else St(z.__webglFramebuffer,R,_,n.COLOR_ATTACHMENT0,Z,0);m(_)&&S(Z),e.unbindTexture()}R.depthBuffer&&nt(R)}function at(R){let _=R.textures;for(let z=0,W=_.length;z<W;z++){let Y=_[z];if(m(Y)){let lt=T(R),ct=i.get(Y).__webglTexture;e.bindTexture(lt,ct),S(lt),e.unbindTexture()}}}let ht=[],Nt=[];function Dt(R){if(R.samples>0){if(Gt(R)===!1){let _=R.textures,z=R.width,W=R.height,Y=n.COLOR_BUFFER_BIT,lt=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ct=i.get(R),Z=_.length>1;if(Z)for(let ut=0;ut<_.length;ut++)e.bindFramebuffer(n.FRAMEBUFFER,ct.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ut,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,ct.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ut,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,ct.__webglMultisampledFramebuffer);let tt=R.texture.mipmaps;tt&&tt.length>0?e.bindFramebuffer(n.DRAW_FRAMEBUFFER,ct.__webglFramebuffer[0]):e.bindFramebuffer(n.DRAW_FRAMEBUFFER,ct.__webglFramebuffer);for(let ut=0;ut<_.length;ut++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(Y|=n.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(Y|=n.STENCIL_BUFFER_BIT)),Z){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ct.__webglColorRenderbuffer[ut]);let It=i.get(_[ut]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,It,0)}n.blitFramebuffer(0,0,z,W,0,0,z,W,Y,n.NEAREST),l===!0&&(ht.length=0,Nt.length=0,ht.push(n.COLOR_ATTACHMENT0+ut),R.depthBuffer&&R.storeMultisampledDepthBuffer===!1&&(ht.push(lt),Nt.push(lt),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Nt)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,ht))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),Z)for(let ut=0;ut<_.length;ut++){e.bindFramebuffer(n.FRAMEBUFFER,ct.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ut,n.RENDERBUFFER,ct.__webglColorRenderbuffer[ut]);let It=i.get(_[ut]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,ct.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ut,n.TEXTURE_2D,It,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,ct.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.storeMultisampledDepthBuffer===!1&&l){let _=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[_])}}}function kt(R){return Math.min(s.maxSamples,R.samples)}function Gt(R){let _=i.get(R);return R.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function L(R){let _=a.render.frame;h.get(R)!==_&&(h.set(R,_),R.update())}function ie(R,_){let z=R.colorSpace,W=R.format,Y=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||z!==Ys&&z!==Mn&&(Qt.getTransfer(z)===ae?(W!==fn||Y!==Je)&&Ft("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ot("WebGLTextures: Unsupported texture color space:",z)),_}function Zt(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(c.width=R.naturalWidth||R.width,c.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(c.width=R.displayWidth,c.height=R.displayHeight):(c.width=R.width,c.height=R.height),c}this.allocateTextureUnit=B,this.resetTextureUnits=H,this.getTextureUnits=N,this.setTextureUnits=C,this.setTexture2D=j,this.setTexture2DArray=q,this.setTexture3D=K,this.setTextureCube=$,this.rebindTextures=st,this.setupRenderTarget=rt,this.updateRenderTargetMipmap=at,this.updateMultisampleRenderTarget=Dt,this.setupDepthRenderbuffer=nt,this.setupFrameBufferTexture=St,this.useMultisampledRTT=Gt,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function Hx(n,t){function e(i,s=Mn){let r,a=Qt.getTransfer(s);if(i===Je)return n.UNSIGNED_BYTE;if(i===Ka)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Qa)return n.UNSIGNED_SHORT_5_5_5_1;if(i===sc)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===rc)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===nc)return n.BYTE;if(i===ic)return n.SHORT;if(i===vs)return n.UNSIGNED_SHORT;if(i===Ja)return n.INT;if(i===vn)return n.UNSIGNED_INT;if(i===un)return n.FLOAT;if(i===Sn)return n.HALF_FLOAT;if(i===ac)return n.ALPHA;if(i===oc)return n.RGB;if(i===fn)return n.RGBA;if(i===In)return n.DEPTH_COMPONENT;if(i===mi)return n.DEPTH_STENCIL;if(i===ja)return n.RED;if(i===to)return n.RED_INTEGER;if(i===gi)return n.RG;if(i===eo)return n.RG_INTEGER;if(i===no)return n.RGBA_INTEGER;if(i===Rr||i===Cr||i===Ir||i===Pr)if(a===ae)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Rr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Cr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Ir)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Pr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Rr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Cr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Ir)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Pr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===io||i===so||i===ro||i===ao)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===io)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===so)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===ro)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===ao)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===oo||i===lo||i===co||i===ho||i===uo||i===Lr||i===fo)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===oo||i===lo)return a===ae?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===co)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===ho)return r.COMPRESSED_R11_EAC;if(i===uo)return r.COMPRESSED_SIGNED_R11_EAC;if(i===Lr)return r.COMPRESSED_RG11_EAC;if(i===fo)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===po||i===mo||i===go||i===xo||i===_o||i===yo||i===vo||i===So||i===Mo||i===bo||i===To||i===Eo||i===Ao||i===wo)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===po)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===mo)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===go)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===xo)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===_o)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===yo)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===vo)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===So)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Mo)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===bo)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===To)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Eo)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Ao)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===wo)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Ro||i===Co||i===Io)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===Ro)return a===ae?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Co)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Io)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Po||i===Lo||i===Dr||i===Do)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===Po)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Lo)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Dr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Do)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Ss?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}function Yx(n,t){function e(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function i(p,m){m.color.getRGB(p.fogColor.value,uc(n)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function s(p,m,S,T,y){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?r(p,m):m.isMeshLambertMaterial?(r(p,m),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(r(p,m),f(p,m)):m.isMeshPhongMaterial?(r(p,m),h(p,m),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(r(p,m),u(p,m),m.isMeshPhysicalMaterial&&d(p,m,y)):m.isMeshMatcapMaterial?(r(p,m),g(p,m)):m.isMeshDepthMaterial?r(p,m):m.isMeshDistanceMaterial?(r(p,m),M(p,m)):m.isMeshNormalMaterial?r(p,m):m.isLineBasicMaterial?(a(p,m),m.isLineDashedMaterial&&o(p,m)):m.isPointsMaterial?l(p,m,S,T):m.isSpriteMaterial?c(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,e(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,e(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===Fe&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,e(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===Fe&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,e(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,e(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);let S=t.get(m),T=S.envMap,y=S.envMapRotation;T&&(p.envMap.value=T,p.envMapRotation.value.setFromMatrix4(qx.makeRotationFromEuler(y)).transpose(),T.isCubeTexture&&T.isRenderTargetTexture===!1&&p.envMapRotation.value.premultiply(ef),p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap&&(p.lightMap.value=m.lightMap,p.lightMapIntensity.value=m.lightMapIntensity,e(m.lightMap,p.lightMapTransform)),m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,p.aoMapTransform))}function a(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,e(m.map,p.mapTransform))}function o(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function l(p,m,S,T){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*S,p.scale.value=T*.5,m.map&&(p.map.value=m.map,e(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function c(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,e(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function h(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function f(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function u(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,p.roughnessMapTransform)),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function d(p,m,S){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Fe&&p.clearcoatNormalScale.value.negate())),m.dispersion>0&&(p.dispersion.value=m.dispersion),m.retroreflectivity>0&&(p.retroreflectivity.value=m.retroreflectivity),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=S.texture,p.transmissionSamplerSize.value.set(S.width,S.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,m){m.matcap&&(p.matcap.value=m.matcap)}function M(p,m){let S=t.get(m).light;p.referencePosition.value.setFromMatrixPosition(S.matrixWorld),p.nearDistance.value=S.shadow.camera.near,p.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function Zx(n,t,e,i){let s={},r={},a=[],o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,E){let v=E.program;i.uniformBlockBinding(y,v)}function c(y,E){let v=s[y.id];v===void 0&&(p(y),v=h(y),s[y.id]=v,y.addEventListener("dispose",S));let A=E.program;i.updateUBOMapping(y,A);let x=t.render.frame;r[y.id]!==x&&(u(y),r[y.id]=x)}function h(y){let E=f();y.__bindingPointIndex=E;let v=n.createBuffer(),A=y.__size,x=y.usage;return n.bindBuffer(n.UNIFORM_BUFFER,v),n.bufferData(n.UNIFORM_BUFFER,A,x),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,E,v),v}function f(){for(let y=0;y<o;y++)if(a.indexOf(y)===-1)return a.push(y),y;return Ot("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(y){let E=s[y.id],v=y.uniforms,A=y.__cache;n.bindBuffer(n.UNIFORM_BUFFER,E);for(let x=0,w=v.length;x<w;x++){let I=v[x];if(Array.isArray(I))for(let D=0,O=I.length;D<O;D++)d(I[D],x,D,A);else d(I,x,0,A)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function d(y,E,v,A){if(M(y,E,v,A)===!0){let x=y.__offset,w=y.value;if(Array.isArray(w)){let I=0;for(let D=0;D<w.length;D++){let O=w[D],H=m(O);g(O,y.__data,I),typeof O!="number"&&typeof O!="boolean"&&!O.isMatrix3&&!ArrayBuffer.isView(O)&&(I+=H.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(w,y.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,x,y.__data)}}function g(y,E,v){typeof y=="number"||typeof y=="boolean"?E[0]=y:y.isMatrix3?(E[0]=y.elements[0],E[1]=y.elements[1],E[2]=y.elements[2],E[3]=0,E[4]=y.elements[3],E[5]=y.elements[4],E[6]=y.elements[5],E[7]=0,E[8]=y.elements[6],E[9]=y.elements[7],E[10]=y.elements[8],E[11]=0):ArrayBuffer.isView(y)?E.set(new y.constructor(y.buffer,y.byteOffset,E.length)):y.toArray(E,v)}function M(y,E,v,A){let x=y.value,w=E+"_"+v;if(A[w]===void 0)return typeof x=="number"||typeof x=="boolean"?A[w]=x:ArrayBuffer.isView(x)?A[w]=x.slice():A[w]=x.clone(),!0;{let I=A[w];if(typeof x=="number"||typeof x=="boolean"){if(I!==x)return A[w]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(I.equals(x)===!1)return I.copy(x),!0}}return!1}function p(y){let E=y.uniforms,v=0,A=16;for(let w=0,I=E.length;w<I;w++){let D=Array.isArray(E[w])?E[w]:[E[w]];for(let O=0,H=D.length;O<H;O++){let N=D[O],C=Array.isArray(N.value)?N.value:[N.value];for(let B=0,k=C.length;B<k;B++){let j=C[B],q=m(j),K=v%A,$=K%q.boundary,wt=K+$;v+=$,wt!==0&&A-wt<q.storage&&(v+=A-wt),N.__data=new Float32Array(q.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=v,v+=q.storage}}}let x=v%A;return x>0&&(v+=A-x),y.__size=v,y.__cache={},this}function m(y){let E={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(E.boundary=4,E.storage=4):y.isVector2?(E.boundary=8,E.storage=8):y.isVector3||y.isColor?(E.boundary=16,E.storage=12):y.isVector4?(E.boundary=16,E.storage=16):y.isMatrix3?(E.boundary=48,E.storage=48):y.isMatrix4?(E.boundary=64,E.storage=64):y.isTexture?Ft("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(y)?(E.boundary=16,E.storage=y.byteLength):Ft("WebGLRenderer: Unsupported uniform value type.",y),E}function S(y){let E=y.target;E.removeEventListener("dispose",S);let v=a.indexOf(E.__bindingPointIndex);a.splice(v,1),n.deleteBuffer(s[E.id]),delete s[E.id],delete r[E.id]}function T(){for(let y in s)n.deleteBuffer(s[y]);a=[],s={},r={}}return{bind:l,update:c,dispose:T}}function Jx(){return Bn===null&&(Bn=new er($x,16,16,gi,Sn),Bn.name="DFG_LUT",Bn.minFilter=Ae,Bn.magFilter=Ae,Bn.wrapS=Cn,Bn.wrapT=Cn,Bn.generateMipmaps=!1,Bn.needsUpdate=!0),Bn}var cp,hp,up,fp,dp,pp,mp,gp,xp,_p,yp,vp,Sp,Mp,bp,Tp,Ep,Ap,wp,Rp,Cp,Ip,Pp,Lp,Dp,Np,Up,Fp,Bp,Op,zp,kp,Vp,Gp,Hp,Wp,Xp,qp,Yp,Zp,$p,Jp,Kp,Qp,jp,t0,e0,n0,i0,s0,r0,a0,o0,l0,c0,h0,u0,f0,d0,p0,m0,g0,x0,_0,y0,v0,S0,M0,b0,T0,E0,A0,w0,R0,C0,I0,P0,L0,D0,N0,U0,F0,B0,O0,z0,k0,V0,G0,H0,W0,X0,q0,Y0,Z0,$0,J0,K0,Q0,j0,tm,em,nm,im,sm,rm,am,om,lm,cm,hm,um,fm,dm,pm,mm,gm,xm,_m,ym,vm,Sm,Mm,bm,Tm,Em,Am,wm,Rm,Cm,Im,Pm,Lm,Dm,Nm,Um,Fm,Bm,Om,zm,km,Vm,Gm,qt,gt,On,Fo,Hm,Ju,Ts,$m,Jm,Km,Ur,Ru,Sc,Mc,bc,Tc,Qm,zi,As,Oo,cg,Ku,wc,Qu,ju,tf,Lu,Du,Nu,Uu,Fu,Rc,Cc,Ic,Ec,Es,Qg,jg,zu,ix,Bo,cx,hx,fx,px,gx,_x,vx,Tx,Lc,Dc,Lx,Fx,Bx,Ox,zx,Zu,Fr,Ac,Wx,Xx,Nc,Uc,qx,ef,$x,Bn,zo,bn=ln(()=>{vc();vc();cp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,hp=`#ifdef USE_ALPHAHASH
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
#endif`,up=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,fp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,dp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,pp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,mp=`#ifdef USE_AOMAP
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
#endif`,gp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,xp=`#ifdef USE_BATCHING
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
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,_p=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,yp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,vp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Sp=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Mp=`#ifdef USE_IRIDESCENCE
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
#endif`,bp=`#ifdef USE_BUMPMAP
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
#endif`,Tp=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Ep=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Ap=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,wp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Rp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Cp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Ip=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Pp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,Lp=`#define PI 3.141592653589793
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
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
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
} // validated`,Dp=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Np=`vec3 transformedNormal = objectNormal;
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
#endif`,Up=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Fp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Bp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Op=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,zp="gl_FragColor = linearToOutputTexel( gl_FragColor );",kp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Vp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,Gp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Hp=`#ifdef USE_ENVMAP
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
#endif`,Wp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Xp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,qp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Yp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Zp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,$p=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Jp=`#ifdef USE_GRADIENTMAP
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
}`,Kp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Qp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,jp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,t0=`uniform bool receiveShadow;
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
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
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
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
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
#endif
#include <lightprobes_pars_fragment>`,e0=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
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
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,n0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,i0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,s0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,r0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,a0=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
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
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
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
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
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
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
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
#endif`,o0=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
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
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
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
		return 0.5 / max( gv + gl, EPSILON );
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
	vec3 f0 = material.specularColorBlended;
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
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
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
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
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
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
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
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,l0=`
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
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
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
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
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
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
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
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,c0=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,h0=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,u0=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,f0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,d0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,p0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,m0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,g0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,x0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,_0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,y0=`#if defined( USE_POINTS_UV )
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
#endif`,v0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,S0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,M0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,b0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,T0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,E0=`#ifdef USE_MORPHTARGETS
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
#endif`,A0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,w0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
	#ifdef DOUBLE_SIDED
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
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,R0=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,C0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,I0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,P0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,L0=`#ifdef USE_NORMALMAP
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
#endif`,D0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,N0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,U0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,F0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,B0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,O0=`vec3 packNormalToRGB( const in vec3 normal ) {
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
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,z0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,k0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,V0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,G0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,H0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,W0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,X0=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
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
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
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
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
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
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,q0=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
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
#endif`,Y0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
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
#endif`,Z0=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
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
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
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
}`,$0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,J0=`#ifdef USE_SKINNING
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
#endif`,K0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Q0=`#ifdef USE_SKINNING
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
#endif`,j0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,tm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,em=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,nm=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,im=`#ifdef USE_TRANSMISSION
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
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,sm=`#ifdef USE_TRANSMISSION
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
#endif`,rm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,am=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,om=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,lm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,cm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,hm=`uniform sampler2D t2D;
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
}`,um=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,fm=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,dm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,pm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,mm=`#include <common>
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
}`,gm=`#if DEPTH_PACKING == 3200
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
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,xm=`#define DISTANCE
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
}`,_m=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,ym=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,vm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Sm=`uniform float scale;
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
}`,Mm=`uniform vec3 diffuse;
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
}`,bm=`#include <common>
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
}`,Tm=`uniform vec3 diffuse;
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
}`,Em=`#define LAMBERT
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
}`,Am=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
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
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
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
}`,wm=`#define MATCAP
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
}`,Rm=`#define MATCAP
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
}`,Cm=`#define NORMAL
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
}`,Im=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
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
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Pm=`#define PHONG
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
}`,Lm=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
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
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
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
}`,Dm=`#define STANDARD
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
}`,Nm=`#define STANDARD
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
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
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
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
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
}`,Um=`#define TOON
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
}`,Fm=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
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
}`,Bm=`uniform float size;
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
}`,Om=`uniform vec3 diffuse;
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
}`,zm=`#include <common>
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
}`,km=`uniform vec3 color;
uniform float opacity;
#include <common>
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
	#include <premultiplied_alpha_fragment>
}`,Vm=`uniform float rotation;
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
}`,Gm=`uniform vec3 diffuse;
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
}`,qt={alphahash_fragment:cp,alphahash_pars_fragment:hp,alphamap_fragment:up,alphamap_pars_fragment:fp,alphatest_fragment:dp,alphatest_pars_fragment:pp,aomap_fragment:mp,aomap_pars_fragment:gp,batching_pars_vertex:xp,batching_vertex:_p,begin_vertex:yp,beginnormal_vertex:vp,bsdfs:Sp,iridescence_fragment:Mp,bumpmap_pars_fragment:bp,clipping_planes_fragment:Tp,clipping_planes_pars_fragment:Ep,clipping_planes_pars_vertex:Ap,clipping_planes_vertex:wp,color_fragment:Rp,color_pars_fragment:Cp,color_pars_vertex:Ip,color_vertex:Pp,common:Lp,cube_uv_reflection_fragment:Dp,defaultnormal_vertex:Np,displacementmap_pars_vertex:Up,displacementmap_vertex:Fp,emissivemap_fragment:Bp,emissivemap_pars_fragment:Op,colorspace_fragment:zp,colorspace_pars_fragment:kp,envmap_fragment:Vp,envmap_common_pars_fragment:Gp,envmap_pars_fragment:Hp,envmap_pars_vertex:Wp,envmap_physical_pars_fragment:e0,envmap_vertex:Xp,fog_vertex:qp,fog_pars_vertex:Yp,fog_fragment:Zp,fog_pars_fragment:$p,gradientmap_pars_fragment:Jp,lightmap_pars_fragment:Kp,lights_lambert_fragment:Qp,lights_lambert_pars_fragment:jp,lights_pars_begin:t0,lights_toon_fragment:n0,lights_toon_pars_fragment:i0,lights_phong_fragment:s0,lights_phong_pars_fragment:r0,lights_physical_fragment:a0,lights_physical_pars_fragment:o0,lights_fragment_begin:l0,lights_fragment_maps:c0,lights_fragment_end:h0,lightprobes_pars_fragment:u0,logdepthbuf_fragment:f0,logdepthbuf_pars_fragment:d0,logdepthbuf_pars_vertex:p0,logdepthbuf_vertex:m0,map_fragment:g0,map_pars_fragment:x0,map_particle_fragment:_0,map_particle_pars_fragment:y0,metalnessmap_fragment:v0,metalnessmap_pars_fragment:S0,morphinstance_vertex:M0,morphcolor_vertex:b0,morphnormal_vertex:T0,morphtarget_pars_vertex:E0,morphtarget_vertex:A0,normal_fragment_begin:w0,normal_fragment_maps:R0,normal_pars_fragment:C0,normal_pars_vertex:I0,normal_vertex:P0,normalmap_pars_fragment:L0,clearcoat_normal_fragment_begin:D0,clearcoat_normal_fragment_maps:N0,clearcoat_pars_fragment:U0,iridescence_pars_fragment:F0,opaque_fragment:B0,packing:O0,premultiplied_alpha_fragment:z0,project_vertex:k0,dithering_fragment:V0,dithering_pars_fragment:G0,roughnessmap_fragment:H0,roughnessmap_pars_fragment:W0,shadowmap_pars_fragment:X0,shadowmap_pars_vertex:q0,shadowmap_vertex:Y0,shadowmask_pars_fragment:Z0,skinbase_vertex:$0,skinning_pars_vertex:J0,skinning_vertex:K0,skinnormal_vertex:Q0,specularmap_fragment:j0,specularmap_pars_fragment:tm,tonemapping_fragment:em,tonemapping_pars_fragment:nm,transmission_fragment:im,transmission_pars_fragment:sm,uv_pars_fragment:rm,uv_pars_vertex:am,uv_vertex:om,worldpos_vertex:lm,background_vert:cm,background_frag:hm,backgroundCube_vert:um,backgroundCube_frag:fm,cube_vert:dm,cube_frag:pm,depth_vert:mm,depth_frag:gm,distance_vert:xm,distance_frag:_m,equirect_vert:ym,equirect_frag:vm,linedashed_vert:Sm,linedashed_frag:Mm,meshbasic_vert:bm,meshbasic_frag:Tm,meshlambert_vert:Em,meshlambert_frag:Am,meshmatcap_vert:wm,meshmatcap_frag:Rm,meshnormal_vert:Cm,meshnormal_frag:Im,meshphong_vert:Pm,meshphong_frag:Lm,meshphysical_vert:Dm,meshphysical_frag:Nm,meshtoon_vert:Um,meshtoon_frag:Fm,points_vert:Bm,points_frag:Om,shadow_vert:zm,shadow_frag:km,sprite_vert:Vm,sprite_frag:Gm},gt={common:{diffuse:{value:new Wt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Vt},alphaMap:{value:null},alphaMapTransform:{value:new Vt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Vt}},envmap:{envMap:{value:null},envMapRotation:{value:new Vt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Vt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Vt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Vt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Vt},normalScale:{value:new ot(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Vt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Vt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Vt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Vt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Wt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new P},probesMax:{value:new P},probesResolution:{value:new P}},points:{diffuse:{value:new Wt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Vt},alphaTest:{value:0},uvTransform:{value:new Vt}},sprite:{diffuse:{value:new Wt(16777215)},opacity:{value:1},center:{value:new ot(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Vt},alphaMap:{value:null},alphaMapTransform:{value:new Vt},alphaTest:{value:0}}},On={basic:{uniforms:ke([gt.common,gt.specularmap,gt.envmap,gt.aomap,gt.lightmap,gt.fog]),vertexShader:qt.meshbasic_vert,fragmentShader:qt.meshbasic_frag},lambert:{uniforms:ke([gt.common,gt.specularmap,gt.envmap,gt.aomap,gt.lightmap,gt.emissivemap,gt.bumpmap,gt.normalmap,gt.displacementmap,gt.fog,gt.lights,{emissive:{value:new Wt(0)},envMapIntensity:{value:1}}]),vertexShader:qt.meshlambert_vert,fragmentShader:qt.meshlambert_frag},phong:{uniforms:ke([gt.common,gt.specularmap,gt.envmap,gt.aomap,gt.lightmap,gt.emissivemap,gt.bumpmap,gt.normalmap,gt.displacementmap,gt.fog,gt.lights,{emissive:{value:new Wt(0)},specular:{value:new Wt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:qt.meshphong_vert,fragmentShader:qt.meshphong_frag},standard:{uniforms:ke([gt.common,gt.envmap,gt.aomap,gt.lightmap,gt.emissivemap,gt.bumpmap,gt.normalmap,gt.displacementmap,gt.roughnessmap,gt.metalnessmap,gt.fog,gt.lights,{emissive:{value:new Wt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:qt.meshphysical_vert,fragmentShader:qt.meshphysical_frag},toon:{uniforms:ke([gt.common,gt.aomap,gt.lightmap,gt.emissivemap,gt.bumpmap,gt.normalmap,gt.displacementmap,gt.gradientmap,gt.fog,gt.lights,{emissive:{value:new Wt(0)}}]),vertexShader:qt.meshtoon_vert,fragmentShader:qt.meshtoon_frag},matcap:{uniforms:ke([gt.common,gt.bumpmap,gt.normalmap,gt.displacementmap,gt.fog,{matcap:{value:null}}]),vertexShader:qt.meshmatcap_vert,fragmentShader:qt.meshmatcap_frag},points:{uniforms:ke([gt.points,gt.fog]),vertexShader:qt.points_vert,fragmentShader:qt.points_frag},dashed:{uniforms:ke([gt.common,gt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:qt.linedashed_vert,fragmentShader:qt.linedashed_frag},depth:{uniforms:ke([gt.common,gt.displacementmap]),vertexShader:qt.depth_vert,fragmentShader:qt.depth_frag},normal:{uniforms:ke([gt.common,gt.bumpmap,gt.normalmap,gt.displacementmap,{opacity:{value:1}}]),vertexShader:qt.meshnormal_vert,fragmentShader:qt.meshnormal_frag},sprite:{uniforms:ke([gt.sprite,gt.fog]),vertexShader:qt.sprite_vert,fragmentShader:qt.sprite_frag},background:{uniforms:{uvTransform:{value:new Vt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:qt.background_vert,fragmentShader:qt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Vt}},vertexShader:qt.backgroundCube_vert,fragmentShader:qt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:qt.cube_vert,fragmentShader:qt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:qt.equirect_vert,fragmentShader:qt.equirect_frag},distance:{uniforms:ke([gt.common,gt.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:qt.distance_vert,fragmentShader:qt.distance_frag},shadow:{uniforms:ke([gt.lights,gt.fog,{color:{value:new Wt(0)},opacity:{value:1}}]),vertexShader:qt.shadow_vert,fragmentShader:qt.shadow_frag}};On.physical={uniforms:ke([On.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Vt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Vt},clearcoatNormalScale:{value:new ot(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Vt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Vt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Vt},sheen:{value:0},sheenColor:{value:new Wt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Vt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Vt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Vt},transmissionSamplerSize:{value:new ot},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Vt},attenuationDistance:{value:0},attenuationColor:{value:new Wt(0)},specularColor:{value:new Wt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Vt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Vt},anisotropyVector:{value:new ot},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Vt}}]),vertexShader:qt.meshphysical_vert,fragmentShader:qt.meshphysical_frag};Fo={r:0,b:0,g:0},Hm=new jt,Ju=new Vt;Ju.set(-1,0,0,0,1,0,0,0,1);Ts=4,$m=6,Jm=20,Km=256,Ur=new xs,Ru=new Wt,Sc=null,Mc=0,bc=0,Tc=!1,Qm=new P,zi=new P,As=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,i=.1,s=100,r={}){let{size:a=256,position:o=Qm}=r;Sc=this._renderer.getRenderTarget(),Mc=this._renderer.getActiveCubeFace(),bc=this._renderer.getActiveMipmapLevel(),Tc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,i,s,l,o),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Pu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Iu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(Sc,Mc,bc),this._renderer.xr.enabled=Tc,t.scissorTest=!1,bs(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===pi||t.mapping===Bi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Sc=this._renderer.getRenderTarget(),Mc=this._renderer.getActiveCubeFace(),bc=this._renderer.getActiveMipmapLevel(),Tc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:Ae,minFilter:Ae,generateMipmaps:!1,type:Sn,format:fn,colorSpace:Ys,depthBuffer:!1},s=Cu(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Cu(t,e,i);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=jm(r)),this._blurMaterial=eg(r,t,e),this._ggxMaterial=tg(r,t,e)}return s}_compileMaterial(t){let e=new pe(new Le,t);this._renderer.compile(e,Ur)}_sceneToCubeUV(t,e,i,s,r){let l=new Ie(90,1,e,i),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],f=this._renderer,u=f.autoClear,d=f.toneMapping;f.getClearColor(Ru),f.toneMapping=yn,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(s),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new pe(new Nn,new Dn({name:"PMREM.Background",side:Fe,depthWrite:!1,depthTest:!1})));let M=this._backgroundBox,p=M.material,m=!1,S=t.background;S?S.isColor&&(p.color.copy(S),t.background=null,m=!0):(p.color.copy(Ru),m=!0);for(let T=0;T<6;T++){let y=T%3;y===0?(l.up.set(0,c[T],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[T],r.y,r.z)):y===1?(l.up.set(0,0,c[T]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[T],r.z)):(l.up.set(0,c[T],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[T]));let E=this._cubeSize;bs(s,y*E,T>2?E:0,E,E),f.setRenderTarget(s),m&&f.render(M,l),f.render(t,l)}f.toneMapping=d,f.autoClear=u,t.background=S}_textureToCubeUV(t,e){let i=this._renderer,s=t.mapping===pi||t.mapping===Bi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Pu()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Iu());let r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;let o=r.uniforms;o.envMap.value=t;let l=this._cubeSize;bs(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(a,Ur)}_applyPMREM(t){let e=this._renderer,i=e.autoClear;e.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=i}_applyGGXFilter(t,e,i){let s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;let l=a.uniforms,c=i/(this._lodMeshes.length-1),h=e/(this._lodMeshes.length-1),f=Math.sqrt(c*c-h*h),u=c*1.25,d=f*u,{_lodMax:g}=this,M=this._sizeLods[i],p=3*M*(i>g-Ts?i-g+Ts:0),m=4*(this._cubeSize-M);l.envMap.value=t.texture,l.roughness.value=d,l.mipInt.value=g-e,bs(r,p,m,3*M,2*M),s.setRenderTarget(r),s.render(o,Ur),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=g-i,bs(t,p,m,3*M,2*M),s.setRenderTarget(t),s.render(o,Ur)}_blur(t,e,i,s){let r=this._pingPongRenderTarget,a=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(t,r,e,i,a),this._blurPass(r,t,i,i,a)}_blurPass(t,e,i,s,r){let a=this._renderer,o=this._blurMaterial,l=this._lodMeshes[s];l.material=o;let c=o.uniforms;c.envMap.value=t.texture,c.sigma.value=r,c.mipInt.value=this._lodMax-i;let h=this._sizeLods[s],f=3*h*(s>this._lodMax-Ts?s-this._lodMax+Ts:0),u=4*(this._cubeSize-h);bs(e,f,u,3*h,2*h),a.setRenderTarget(e),a.render(l,Ur)}};Oo=class extends Ye{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new ir(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Nn(5,5,5),r=new tn({name:"CubemapFromEquirect",uniforms:Oi(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Fe,blending:Un});r.uniforms.tEquirect.value=e;let a=new pe(s,r),o=e.minFilter;return e.minFilter===Fn&&(e.minFilter=Ae),new Ha(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,i=!0,s=!0){let r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,i,s);t.setRenderTarget(r)}};cg={[$l]:"LINEAR_TONE_MAPPING",[Jl]:"REINHARD_TONE_MAPPING",[Kl]:"CINEON_TONE_MAPPING",[Er]:"ACES_FILMIC_TONE_MAPPING",[jl]:"AGX_TONE_MAPPING",[tc]:"NEUTRAL_TONE_MAPPING",[Ql]:"CUSTOM_TONE_MAPPING"};Ku=new We,wc=new li(1,1),Qu=new Ks,ju=new Ma,tf=new ir,Lu=[],Du=[],Nu=new Float32Array(16),Uu=new Float32Array(9),Fu=new Float32Array(4);Rc=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=Ig(e.type)}},Cc=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Jg(e.type)}},Ic=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(t,e[o.id],i)}}},Ec=/(\w+)(\])?(\[|\.)?/g;Es=class{constructor(t,e){this.seq=[],this.map={};let i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){let o=t.getActiveUniform(e,a),l=t.getUniformLocation(e,o.name);Kg(o,l,this)}let s=[],r=[];for(let a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,i,s){let r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){let s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,a=e.length;r!==a;++r){let o=e[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,e){let i=[];for(let s=0,r=t.length;s!==r;++s){let a=t[s];a.id in e&&i.push(a)}return i}};Qg=37297,jg=0;zu=new Vt;ix={[$l]:"Linear",[Jl]:"Reinhard",[Kl]:"Cineon",[Er]:"ACESFilmic",[jl]:"AgX",[tc]:"Neutral",[Ql]:"Custom"};Bo=new P;cx=/^[ \t]*#include +<([\w\d./]+)>/gm;hx=new Map;fx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;px={[Ui]:"SHADOWMAP_TYPE_PCF",[_s]:"SHADOWMAP_TYPE_VSM"};gx={[pi]:"ENVMAP_TYPE_CUBE",[Bi]:"ENVMAP_TYPE_CUBE",[Ar]:"ENVMAP_TYPE_CUBE_UV"};_x={[Bi]:"ENVMAP_MODE_REFRACTION"};vx={[qa]:"ENVMAP_BLENDING_MULTIPLY",[iu]:"ENVMAP_BLENDING_MIX",[su]:"ENVMAP_BLENDING_ADD"};Tx=0,Lc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,i){let s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(i)===!1&&(s.add(i),i.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){let e=this.shaderCache,i=e.get(t);return i===void 0&&(i=new Dc(t),e.set(t,i)),i}},Dc=class{constructor(t){this.id=Tx++,this.code=t,this.usedTimes=0}};Lx=0;Fx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Bx=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Ox=[new P(1,0,0),new P(-1,0,0),new P(0,1,0),new P(0,-1,0),new P(0,0,1),new P(0,0,-1)],zx=[new P(0,-1,0),new P(0,-1,0),new P(0,0,1),new P(0,0,-1),new P(0,-1,0),new P(0,-1,0)],Zu=new jt,Fr=new P,Ac=new P;Wx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Xx=`
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

}`,Nc=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let i=new sr(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,i=new tn({vertexShader:Wx,fragmentShader:Xx,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new pe(new $n(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Uc=class extends Pn{constructor(t,e){super();let i=this,s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,f=null,u=null,d=null,g=null,M=typeof XRWebGLBinding<"u",p=new Nc,m={},S=e.getContextAttributes(),T=null,y=null,E=[],v=[],A=new ot,x=null,w=null,I=new Ie;I.viewport=new _e;let D=new Ie;D.viewport=new _e;let O=[I,D],H=new Wa,N=null,C=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(J){let et=E[J];return et===void 0&&(et=new hs,E[J]=et),et.getTargetRaySpace()},this.getControllerGrip=function(J){let et=E[J];return et===void 0&&(et=new hs,E[J]=et),et.getGripSpace()},this.getHand=function(J){let et=E[J];return et===void 0&&(et=new hs,E[J]=et),et.getHandSpace()};function B(J){let et=v.indexOf(J.inputSource);if(et===-1)return;let xt=E[et];xt!==void 0&&(xt.update(J.inputSource,J.frame,c||a),xt.dispatchEvent({type:J.type,data:J.inputSource}))}function k(){s.removeEventListener("select",B),s.removeEventListener("selectstart",B),s.removeEventListener("selectend",B),s.removeEventListener("squeeze",B),s.removeEventListener("squeezestart",B),s.removeEventListener("squeezeend",B),s.removeEventListener("end",k),s.removeEventListener("inputsourceschange",j);for(let J=0;J<E.length;J++){let et=v[J];et!==null&&(v[J]=null,E[J].disconnect(et))}N=null,C=null,p.reset();for(let J in m)delete m[J];if(t.setRenderTarget(T),d=null,u=null,f=null,s=null,y=null,te.stop(),i.isPresenting=!1,t.setPixelRatio(x),t.setSize(A.width,A.height,!1),w!==null){let J=w.camera;J.fov=w.fov,J.zoom=w.zoom,J.updateProjectionMatrix(),w=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(J){r=J,i.isPresenting===!0&&Ft("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(J){o=J,i.isPresenting===!0&&Ft("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(J){c=J},this.getBaseLayer=function(){return u!==null?u:d},this.getBinding=function(){return f===null&&M&&(f=new XRWebGLBinding(s,e)),f},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(J){if(s=J,s!==null){if(T=t.getRenderTarget(),s.addEventListener("select",B),s.addEventListener("selectstart",B),s.addEventListener("selectend",B),s.addEventListener("squeeze",B),s.addEventListener("squeezestart",B),s.addEventListener("squeezeend",B),s.addEventListener("end",k),s.addEventListener("inputsourceschange",j),S.xrCompatible!==!0&&await e.makeXRCompatible(),x=t.getPixelRatio(),t.getSize(A),M&&"createProjectionLayer"in XRWebGLBinding.prototype){let xt=null,Bt=null,St=null;S.depth&&(St=S.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,xt=S.stencil?mi:In,Bt=S.stencil?Ss:vn);let zt={colorFormat:e.RGBA8,depthFormat:St,scaleFactor:r};f=this.getBinding(),u=f.createProjectionLayer(zt),s.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),y=new Ye(u.textureWidth,u.textureHeight,{format:fn,type:Je,depthTexture:new li(u.textureWidth,u.textureHeight,Bt,void 0,void 0,void 0,void 0,void 0,void 0,xt),stencilBuffer:S.stencil,colorSpace:t.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{let xt={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,e,xt),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),y=new Ye(d.framebufferWidth,d.framebufferHeight,{format:fn,type:Je,colorSpace:t.outputColorSpace,stencilBuffer:S.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),te.setContext(s),te.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function j(J){for(let et=0;et<J.removed.length;et++){let xt=J.removed[et],Bt=v.indexOf(xt);Bt>=0&&(v[Bt]=null,E[Bt].disconnect(xt))}for(let et=0;et<J.added.length;et++){let xt=J.added[et],Bt=v.indexOf(xt);if(Bt===-1){for(let zt=0;zt<E.length;zt++)if(zt>=v.length){v.push(xt),Bt=zt;break}else if(v[zt]===null){v[zt]=xt,Bt=zt;break}if(Bt===-1)break}let St=E[Bt];St&&St.connect(xt)}}let q=new P,K=new P;function $(J,et,xt){q.setFromMatrixPosition(et.matrixWorld),K.setFromMatrixPosition(xt.matrixWorld);let Bt=q.distanceTo(K),St=et.projectionMatrix.elements,zt=xt.projectionMatrix.elements,le=St[14]/(St[10]-1),nt=St[14]/(St[10]+1),st=(St[9]+1)/St[5],rt=(St[9]-1)/St[5],at=(St[8]-1)/St[0],ht=(zt[8]+1)/zt[0],Nt=le*at,Dt=le*ht,kt=Bt/(-at+ht),Gt=kt*-at;if(et.matrixWorld.decompose(J.position,J.quaternion,J.scale),J.translateX(Gt),J.translateZ(kt),J.matrixWorld.compose(J.position,J.quaternion,J.scale),J.matrixWorldInverse.copy(J.matrixWorld).invert(),St[10]===-1)J.projectionMatrix.copy(et.projectionMatrix),J.projectionMatrixInverse.copy(et.projectionMatrixInverse);else{let L=le+kt,ie=nt+kt,Zt=Nt-Gt,R=Dt+(Bt-Gt),_=st*nt/ie*L,z=rt*nt/ie*L;J.projectionMatrix.makePerspective(Zt,R,_,z,L,ie),J.projectionMatrixInverse.copy(J.projectionMatrix).invert()}}function wt(J,et){et===null?J.matrixWorld.copy(J.matrix):J.matrixWorld.multiplyMatrices(et.matrixWorld,J.matrix),J.matrixWorldInverse.copy(J.matrixWorld).invert()}this.updateCamera=function(J){if(s===null)return;let et=J.near,xt=J.far;p.texture!==null&&(p.depthNear>0&&(et=p.depthNear),p.depthFar>0&&(xt=p.depthFar)),H.near=D.near=I.near=et,H.far=D.far=I.far=xt,(N!==H.near||C!==H.far)&&(s.updateRenderState({depthNear:H.near,depthFar:H.far}),N=H.near,C=H.far),H.layers.mask=J.layers.mask|6,I.layers.mask=H.layers.mask&-5,D.layers.mask=H.layers.mask&-3;let Bt=J.parent,St=H.cameras;wt(H,Bt);for(let zt=0;zt<St.length;zt++)wt(St[zt],Bt);St.length===2?$(H,I,D):H.projectionMatrix.copy(I.projectionMatrix),w===null&&J.isPerspectiveCamera&&(w={camera:J,fov:J.fov,zoom:J.zoom}),bt(J,H,Bt)};function bt(J,et,xt){xt===null?J.matrix.copy(et.matrixWorld):(J.matrix.copy(xt.matrixWorld),J.matrix.invert(),J.matrix.multiply(et.matrixWorld)),J.matrix.decompose(J.position,J.quaternion,J.scale),J.updateMatrixWorld(!0),J.projectionMatrix.copy(et.projectionMatrix),J.projectionMatrixInverse.copy(et.projectionMatrixInverse),J.isPerspectiveCamera&&(J.fov=Js*2*Math.atan(1/J.projectionMatrix.elements[5]),J.zoom=1)}this.getCamera=function(){return H},this.getFoveation=function(){if(!(u===null&&d===null))return l},this.setFoveation=function(J){l=J,u!==null&&(u.fixedFoveation=J),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=J)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(H)},this.getCameraTexture=function(J){return m[J]};let ne=null;function Yt(J,et){if(h=et.getViewerPose(c||a),g=et,h!==null){let xt=h.views;d!==null&&(t.setRenderTargetFramebuffer(y,d.framebuffer),t.setRenderTarget(y));let Bt=!1;xt.length!==H.cameras.length&&(H.cameras.length=0,Bt=!0);for(let nt=0;nt<xt.length;nt++){let st=xt[nt],rt=null;if(d!==null)rt=d.getViewport(st);else{let ht=f.getViewSubImage(u,st);rt=ht.viewport,nt===0&&(t.setRenderTargetTextures(y,ht.colorTexture,ht.depthStencilTexture),t.setRenderTarget(y))}let at=O[nt];at===void 0&&(at=new Ie,at.layers.enable(nt),at.viewport=new _e,O[nt]=at),at.matrix.fromArray(st.transform.matrix),at.matrix.decompose(at.position,at.quaternion,at.scale),at.projectionMatrix.fromArray(st.projectionMatrix),at.projectionMatrixInverse.copy(at.projectionMatrix).invert(),at.viewport.set(rt.x,rt.y,rt.width,rt.height),nt===0&&(H.matrix.copy(at.matrix),H.matrix.decompose(H.position,H.quaternion,H.scale)),Bt===!0&&H.cameras.push(at)}let St=s.enabledFeatures;if(St&&St.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&M){f=i.getBinding();let nt=f.getDepthInformation(xt[0]);nt&&nt.isValid&&nt.texture&&p.init(nt,s.renderState)}if(St&&St.includes("camera-access")&&M){t.state.unbindTexture(),f=i.getBinding();for(let nt=0;nt<xt.length;nt++){let st=xt[nt].camera;if(st){let rt=m[st];rt||(rt=new sr,m[st]=rt);let at=f.getCameraImage(st);rt.sourceTexture=at}}}}for(let xt=0;xt<E.length;xt++){let Bt=v[xt],St=E[xt];Bt!==null&&St!==void 0&&St.update(Bt,et,c||a)}ne&&ne(J,et),et.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:et}),g=null}let te=new $u;te.setAnimationLoop(Yt),this.setAnimationLoop=function(J){ne=J},this.dispose=function(){}}},qx=new jt,ef=new Vt;ef.set(-1,0,0,0,1,0,0,0,1);$x=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Bn=null;zo=class{constructor(t={}){let{canvas:e=gu(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:u=!1,outputBufferType:d=Je}=t;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=a;let M=d,p=new Set([no,eo,to]),m=new Set([Je,vn,vs,Ss,Ka,Qa]),S=new Uint32Array(4),T=new Int32Array(4),y=new P,E=null,v=null,A=[],x=[],w=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=yn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let I=this,D=!1,O=null,H=null,N=null,C=null;this._outputColorSpace=Ee;let B=0,k=0,j=null,q=-1,K=null,$=new _e,wt=new _e,bt=null,ne=new Wt(0),Yt=0,te=e.width,J=e.height,et=1,xt=null,Bt=null,St=new _e(0,0,te,J),zt=new _e(0,0,te,J),le=!1,nt=new oi,st=!1,rt=!1,at=new jt,ht=new P,Nt=new _e,Dt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},kt=!1;function Gt(){return j===null?et:1}let L=i;function ie(b,U){return e.getContext(b,U)}let Zt,R,_,z,W,Y,lt,ct,Z,tt,ut,It,mt,ft,Pt,Ut,Ht,F,dt,Q,pt,vt,it;try{let b={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"186"}`),e.addEventListener("webglcontextlost",fe,!1),e.addEventListener("webglcontextrestored",se,!1),e.addEventListener("webglcontextcreationerror",dn,!1),L===null){let U="webgl2";if(L=ie(U,b),L===null)throw ie(U)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Lt()}catch(b){throw e.removeEventListener("webglcontextlost",fe,!1),e.removeEventListener("webglcontextrestored",se,!1),e.removeEventListener("webglcontextcreationerror",dn,!1),Ot("WebGLRenderer: "+b.message),b}function Lt(){Zt=new ig(L),Zt.init(),pt=new Hx(L,Zt),R=new Ym(L,Zt,t,pt),_=new Vx(L,Zt),R.reversedDepthBuffer&&u&&_.buffers.depth.setReversed(!0),H=L.createFramebuffer(),N=L.createFramebuffer(),C=L.createFramebuffer(),z=new ag(L),W=new wx,Y=new Gx(L,Zt,_,W,R,pt,z),lt=new ng(I),ct=new lp(L),vt=new Xm(L,ct),Z=new sg(L,ct,z,vt),tt=new lg(L,Z,ct,vt,z),F=new og(L,R,Y),Pt=new Zm(W),ut=new Ax(I,lt,Zt,R,vt,Pt),It=new Yx(I,W),mt=new Cx,ft=new Ux(Zt),Ht=new Wm(I,lt,_,tt,g,l),Ut=new kx(I,tt,R),it=new Zx(L,z,R,_),dt=new qm(L,Zt,z),Q=new rg(L,Zt,z),z.programs=ut.programs,I.capabilities=R,I.extensions=Zt,I.properties=W,I.renderLists=mt,I.shadowMap=Ut,I.state=_,I.info=z}M!==Je&&(w=new hg(M,e.width,e.height,o,s,r));let Rt=new Uc(I,L);this.xr=Rt,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){let b=Zt.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){let b=Zt.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return et},this.setPixelRatio=function(b){b!==void 0&&(et=b,this.setSize(te,J,!1))},this.getSize=function(b){return b.set(te,J)},this.setSize=function(b,U,X=!0){if(Rt.isPresenting){Ft("WebGLRenderer: Can't change size while VR device is presenting.");return}te=b,J=U,e.width=Math.floor(b*et),e.height=Math.floor(U*et),X===!0&&(e.style.width=b+"px",e.style.height=U+"px"),w!==null&&w.setSize(e.width,e.height),this.setViewport(0,0,b,U)},this.getDrawingBufferSize=function(b){return b.set(te*et,J*et).floor()},this.setDrawingBufferSize=function(b,U,X){te=b,J=U,et=X,e.width=Math.floor(b*X),e.height=Math.floor(U*X),this.setViewport(0,0,b,U)},this.setEffects=function(b){if(M===Je){Ot("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(b){for(let U=0;U<b.length;U++)if(b[U].isOutputPass===!0){Ft("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}w.setEffects(b||[])},this.getCurrentViewport=function(b){return b.copy($)},this.getViewport=function(b){return b.copy(St)},this.setViewport=function(b,U,X,V){b.isVector4?St.set(b.x,b.y,b.z,b.w):St.set(b,U,X,V),_.viewport($.copy(St).multiplyScalar(et).round())},this.getScissor=function(b){return b.copy(zt)},this.setScissor=function(b,U,X,V){b.isVector4?zt.set(b.x,b.y,b.z,b.w):zt.set(b,U,X,V),_.scissor(wt.copy(zt).multiplyScalar(et).round())},this.getScissorTest=function(){return le},this.setScissorTest=function(b){_.setScissorTest(le=b)},this.setOpaqueSort=function(b){xt=b},this.setTransparentSort=function(b){Bt=b},this.getClearColor=function(b){return b.copy(Ht.getClearColor())},this.setClearColor=function(){Ht.setClearColor(...arguments)},this.getClearAlpha=function(){return Ht.getClearAlpha()},this.setClearAlpha=function(){Ht.setClearAlpha(...arguments)},this.clear=function(b=!0,U=!0,X=!0){let V=0;if(b){let G=!1;if(j!==null){let yt=j.texture.format;G=p.has(yt)}if(G){let yt=j.texture.type,Tt=m.has(yt),_t=Ht.getClearColor(),Et=Ht.getClearAlpha(),Ct=_t.r,Xt=_t.g,$t=_t.b;Tt?(S[0]=Ct,S[1]=Xt,S[2]=$t,S[3]=Et,L.clearBufferuiv(L.COLOR,0,S)):(T[0]=Ct,T[1]=Xt,T[2]=$t,T[3]=Et,L.clearBufferiv(L.COLOR,0,T))}else V|=L.COLOR_BUFFER_BIT}U&&(V|=L.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),X&&(V|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),V!==0&&L.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(b){b.setRenderer(this),O=b},this.dispose=function(){e.removeEventListener("webglcontextlost",fe,!1),e.removeEventListener("webglcontextrestored",se,!1),e.removeEventListener("webglcontextcreationerror",dn,!1),Ht.dispose(),mt.dispose(),ft.dispose(),W.dispose(),lt.dispose(),tt.dispose(),vt.dispose(),it.dispose(),ut.dispose(),Rt.dispose(),Rt.removeEventListener("sessionstart",Qc),Rt.removeEventListener("sessionend",jc),Si.stop()};function fe(b){b.preventDefault(),cc("WebGLRenderer: Context Lost."),D=!0}function se(){cc("WebGLRenderer: Context Restored."),D=!1;let b=z.autoReset,U=Ut.enabled,X=Ut.autoUpdate,V=Ut.needsUpdate,G=Ut.type;Lt(),z.autoReset=b,Ut.enabled=U,Ut.autoUpdate=X,Ut.needsUpdate=V,Ut.type=G}function dn(b){Ot("WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function An(b){let U=b.target;U.removeEventListener("dispose",An),kf(U)}function kf(b){Vf(b),W.remove(b)}function Vf(b){let U=W.get(b).programs;U!==void 0&&(U.forEach(function(X){ut.releaseProgram(X)}),b.isShaderMaterial&&ut.releaseShaderCache(b))}this.renderBufferDirect=function(b,U,X,V,G,yt){U===null&&(U=Dt);let Tt=G.isMesh&&G.matrixWorld.determinantAffine()<0,_t=Wf(b,U,X,V,G);_.setMaterial(V,Tt);let Et=X.index,Ct=1;if(V.wireframe===!0){if(Et=Z.getWireframeAttribute(X),Et===void 0)return;Ct=2}let Xt=X.drawRange,$t=X.attributes.position,At=Xt.start*Ct,re=(Xt.start+Xt.count)*Ct;yt!==null&&(At=Math.max(At,yt.start*Ct),re=Math.min(re,(yt.start+yt.count)*Ct)),Et!==null?(At=Math.max(At,0),re=Math.min(re,Et.count)):$t!=null&&(At=Math.max(At,0),re=Math.min(re,$t.count));let Se=re-At;if(Se<0||Se===1/0)return;vt.setup(G,V,_t,X,Et);let me,ue=dt;if(Et!==null&&(me=ct.get(Et),ue=Q,ue.setIndex(me)),G.isMesh)V.wireframe===!0?(_.setLineWidth(V.wireframeLinewidth*Gt()),ue.setMode(L.LINES)):ue.setMode(L.TRIANGLES);else if(G.isLine){let Be=V.linewidth;Be===void 0&&(Be=1),_.setLineWidth(Be*Gt()),G.isLineSegments?ue.setMode(L.LINES):G.isLineLoop?ue.setMode(L.LINE_LOOP):ue.setMode(L.LINE_STRIP)}else G.isPoints?ue.setMode(L.POINTS):G.isSprite&&ue.setMode(L.TRIANGLES);if(G.isBatchedMesh)if(Zt.get("WEBGL_multi_draw"))ue.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else{let Be=G._multiDrawStarts,Mt=G._multiDrawCounts,He=G._multiDrawCount,ee=Et?ct.get(Et).bytesPerElement:1,on=W.get(V).currentProgram.getUniforms();for(let wn=0;wn<He;wn++)on.setValue(L,"_gl_DrawID",wn),ue.render(Be[wn]/ee,Mt[wn])}else if(G.isInstancedMesh)ue.renderInstances(At,Se,G.count);else if(X.isInstancedBufferGeometry){let Be=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,Mt=Math.min(X.instanceCount,Be);ue.renderInstances(At,Se,Mt)}else ue.render(At,Se)};function Kc(b,U,X,V){O!==null&&b.isNodeMaterial&&O.setObject(V,b),st===!0&&Pt.setState(b,X,!1),b.transparent===!0&&b.side===nn&&b.forceSinglePass===!1?(b.side=Fe,b.needsUpdate=!0,kr(b,U,V),b.side=di,b.needsUpdate=!0,kr(b,U,V),b.side=nn):kr(b,U,V)}this.compile=function(b,U,X=null){X===null&&(X=b),O!==null&&O.renderStart(b,U,X),v=ft.get(X),v.init(U),x.push(v),X.traverseVisible(function(G){G.isLight&&G.layers.test(U.layers)&&(v.pushLight(G),G.castShadow&&v.pushShadow(G))}),b!==X&&b.traverseVisible(function(G){G.isLight&&G.layers.test(U.layers)&&(v.pushLight(G),G.castShadow&&v.pushShadow(G))}),v.setupLights(),O!==null&&O.updateLights(v.state.lightsArray),rt=this.localClippingEnabled,st=Pt.init(this.clippingPlanes,rt),st===!0&&Pt.setGlobalState(this.clippingPlanes,U),O!==null&&Ut.render(v.state.shadowsArray,X,U);let V=new Set;return b.traverse(function(G){if(!(G.isMesh||G.isPoints||G.isLine||G.isSprite))return;let yt=G.material;if(yt)if(Array.isArray(yt))for(let Tt=0;Tt<yt.length;Tt++){let _t=yt[Tt];Kc(_t,X,U,G),V.add(_t)}else Kc(yt,X,U,G),V.add(yt)}),v=x.pop(),O!==null&&O.renderEnd(),V},this.compileAsync=function(b,U,X=null){let V=this.compile(b,U,X);return new Promise(G=>{function yt(){if(V.forEach(function(Tt){let Et=W.get(Tt).currentProgram;(Et===void 0||Et.isReady())&&V.delete(Tt)}),V.size===0){G(b);return}setTimeout(yt,10)}Zt.get("KHR_parallel_shader_compile")!==null?yt():setTimeout(yt,10)})};let il=null;function Gf(b){il&&il(b)}function Qc(){Si.stop()}function jc(){Si.start()}let Si=new $u;Si.setAnimationLoop(Gf),typeof self<"u"&&Si.setContext(self),this.setAnimationLoop=function(b){il=b,Rt.setAnimationLoop(b),b===null?Si.stop():Si.start()},Rt.addEventListener("sessionstart",Qc),Rt.addEventListener("sessionend",jc),this.render=function(b,U){if(U!==void 0&&U.isCamera!==!0){Ot("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;O!==null&&O.renderStart(b,U);let X=Rt.enabled===!0&&Rt.isPresenting===!0,V=w!==null&&(j===null||X)&&w.begin(I,j);if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),Rt.enabled===!0&&Rt.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(Rt.cameraAutoUpdate===!0&&Rt.updateCamera(U),U=Rt.getCamera()),b.isScene===!0&&b.onBeforeRender(I,b,U,j),v=ft.get(b,x.length),v.init(U),v.state.textureUnits=Y.getTextureUnits(),x.push(v),at.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),nt.setFromProjectionMatrix(at,_n,U.reversedDepth),rt=this.localClippingEnabled,st=Pt.init(this.clippingPlanes,rt),E=mt.get(b,A.length),E.init(),A.push(E),Rt.enabled===!0&&Rt.isPresenting===!0){let Tt=I.xr.getDepthSensingMesh();Tt!==null&&sl(Tt,U,-1/0,I.sortObjects)}sl(b,U,0,I.sortObjects),E.finish(),O!==null&&O.updateLights(v.state.lightsArray),I.sortObjects===!0&&E.sort(xt,Bt),kt=Rt.enabled===!1||Rt.isPresenting===!1||Rt.hasDepthSensing()===!1,kt&&Ht.addToRenderList(E,b),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),st===!0&&Pt.beginShadows();let G=v.state.shadowsArray;if(Ut.render(G,b,U),st===!0&&Pt.endShadows(),(V&&w.hasRenderPass())===!1){let Tt=E.opaque,_t=E.transmissive;if(v.setupLights(),U.isArrayCamera){let Et=U.cameras;if(_t.length>0)for(let Ct=0,Xt=Et.length;Ct<Xt;Ct++){let $t=Et[Ct];eh(Tt,_t,b,$t)}kt&&Ht.render(b);for(let Ct=0,Xt=Et.length;Ct<Xt;Ct++){let $t=Et[Ct];th(E,b,$t,$t.viewport)}}else _t.length>0&&eh(Tt,_t,b,U),kt&&Ht.render(b),th(E,b,U)}j!==null&&k===0&&(Y.updateMultisampleRenderTarget(j),Y.updateRenderTargetMipmap(j)),V&&w.end(I),b.isScene===!0&&b.onAfterRender(I,b,U),vt.resetDefaultState(),q=-1,K=null,x.pop(),x.length>0?(v=x[x.length-1],Y.setTextureUnits(v.state.textureUnits),st===!0&&Pt.setGlobalState(I.clippingPlanes,v.state.camera)):v=null,A.pop(),A.length>0?E=A[A.length-1]:E=null,O!==null&&O.renderEnd()};function sl(b,U,X,V){if(b.visible===!1)return;if(b.layers.test(U.layers)){if(b.isGroup)X=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(U);else if(b.isLightProbeGrid)v.pushLightProbeGrid(b);else if(b.isLight)v.pushLight(b),b.castShadow&&v.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||b.intersectsFrustum(nt)){V&&Nt.setFromMatrixPosition(b.matrixWorld).applyMatrix4(at);let Tt=tt.update(b),_t=b.material;_t.visible&&E.push(b,Tt,_t,X,Nt.z,null,U)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||b.intersectsFrustum(nt))){let Tt=tt.update(b),_t=b.material;if(V&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),Nt.copy(b.boundingSphere.center)):(Tt.boundingSphere===null&&Tt.computeBoundingSphere(),Nt.copy(Tt.boundingSphere.center)),Nt.applyMatrix4(b.matrixWorld).applyMatrix4(at)),Array.isArray(_t)){let Et=Tt.groups;for(let Ct=0,Xt=Et.length;Ct<Xt;Ct++){let $t=Et[Ct],At=_t[$t.materialIndex];At&&At.visible&&E.push(b,Tt,At,X,Nt.z,$t,U)}}else _t.visible&&E.push(b,Tt,_t,X,Nt.z,null,U)}}let yt=b.children;for(let Tt=0,_t=yt.length;Tt<_t;Tt++)sl(yt[Tt],U,X,V)}function th(b,U,X,V){let{opaque:G,transmissive:yt,transparent:Tt}=b;v.setupLightsView(X),st===!0&&Pt.setGlobalState(I.clippingPlanes,X),V&&_.viewport($.copy(V)),G.length>0&&zr(G,U,X),yt.length>0&&zr(yt,U,X),Tt.length>0&&zr(Tt,U,X),_.buffers.depth.setTest(!0),_.buffers.depth.setMask(!0),_.buffers.color.setMask(!0),_.setPolygonOffset(!1)}function eh(b,U,X,V){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;if(v.state.transmissionRenderTarget[V.id]===void 0){let At=Zt.has("EXT_color_buffer_half_float")||Zt.has("EXT_color_buffer_float");v.state.transmissionRenderTarget[V.id]=new Ye(1,1,{generateMipmaps:!0,type:At?Sn:Je,minFilter:Fn,samples:Math.max(4,R.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Qt.workingColorSpace})}let yt=v.state.transmissionRenderTarget[V.id],Tt=V.viewport||$;yt.setSize(Tt.z*I.transmissionResolutionScale,Tt.w*I.transmissionResolutionScale);let _t=I.getRenderTarget(),Et=I.getActiveCubeFace(),Ct=I.getActiveMipmapLevel();I.setRenderTarget(yt),I.getClearColor(ne),Yt=I.getClearAlpha(),Yt<1&&I.setClearColor(16777215,.5),I.clear(),kt&&Ht.render(X);let Xt=I.toneMapping;I.toneMapping=yn;let $t=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),v.setupLightsView(V),st===!0&&Pt.setGlobalState(I.clippingPlanes,V),zr(b,X,V),Y.updateMultisampleRenderTarget(yt),Y.updateRenderTargetMipmap(yt),Zt.has("WEBGL_multisampled_render_to_texture")===!1){let At=!1;for(let re=0,Se=U.length;re<Se;re++){let me=U[re],{object:ue,geometry:Be,material:Mt,group:He}=me;if(Mt.side===nn&&ue.layers.test(V.layers)){let ee=Mt.side;Mt.side=Fe,Mt.needsUpdate=!0,nh(ue,X,V,Be,Mt,He),Mt.side=ee,Mt.needsUpdate=!0,At=!0}}At===!0&&(Y.updateMultisampleRenderTarget(yt),Y.updateRenderTargetMipmap(yt))}I.setRenderTarget(_t,Et,Ct),I.setClearColor(ne,Yt),$t!==void 0&&(V.viewport=$t),I.toneMapping=Xt}function zr(b,U,X){let V=U.isScene===!0?U.overrideMaterial:null;for(let G=0,yt=b.length;G<yt;G++){let Tt=b[G],{object:_t,geometry:Et,group:Ct}=Tt,Xt=Tt.material;Xt.allowOverride===!0&&V!==null&&(Xt=V),_t.layers.test(X.layers)&&nh(_t,U,X,Et,Xt,Ct)}}function nh(b,U,X,V,G,yt){O!==null&&G.isNodeMaterial&&O.setObject(b,G),b.onBeforeRender(I,U,X,V,G,yt),b.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),G.onBeforeRender(I,U,X,V,b,yt),G.transparent===!0&&G.side===nn&&G.forceSinglePass===!1?(G.side=Fe,G.needsUpdate=!0,I.renderBufferDirect(X,U,V,G,b,yt),G.side=di,G.needsUpdate=!0,I.renderBufferDirect(X,U,V,G,b,yt),G.side=nn):I.renderBufferDirect(X,U,V,G,b,yt),b.onAfterRender(I,U,X,V,G,yt)}function kr(b,U,X){U.isScene!==!0&&(U=Dt);let V=W.get(b),G=v.state.lights,yt=v.state.shadowsArray,Tt=G.state.version,_t=ut.getParameters(b,G.state,yt,U,X,v.state.lightProbeGridArray),Et=ut.getProgramCacheKey(_t),Ct=V.programs;V.environment=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?U.environment:null,V.fog=U.fog;let Xt=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap;V.envMap=lt.get(b.envMap||V.environment,Xt),V.envMapRotation=V.environment!==null&&b.envMap===null?U.environmentRotation:b.envMapRotation,Ct===void 0&&(b.addEventListener("dispose",An),Ct=new Map,V.programs=Ct);let $t=Ct.get(Et);if($t!==void 0){if(V.currentProgram===$t&&V.lightsStateVersion===Tt)return sh(b,_t),$t}else _t.uniforms=ut.getUniforms(b),O!==null&&b.isNodeMaterial&&O.build(b,X,_t),b.onBeforeCompile(_t,I),$t=ut.acquireProgram(_t,Et),Ct.set(Et,$t),V.uniforms=_t.uniforms;let At=V.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(At.clippingPlanes=Pt.uniform),sh(b,_t),V.needsLights=qf(b),V.lightsStateVersion=Tt,V.needsLights&&(At.ambientLightColor.value=G.state.ambient,At.lightProbe.value=G.state.probe,At.sunLights.value=G.state.sun,At.sunLightShadows.value=G.state.sunShadow,At.directionalLights.value=G.state.directional,At.directionalLightShadows.value=G.state.directionalShadow,At.spotLights.value=G.state.spot,At.spotLightShadows.value=G.state.spotShadow,At.rectAreaLights.value=G.state.rectArea,At.ltc_1.value=G.state.rectAreaLTC1,At.ltc_2.value=G.state.rectAreaLTC2,At.pointLights.value=G.state.point,At.pointLightShadows.value=G.state.pointShadow,At.hemisphereLights.value=G.state.hemi,At.sunShadowMatrix.value=G.state.sunShadowMatrix,At.sunShadowCascade.value=G.state.sunShadowCascade,At.directionalShadowMatrix.value=G.state.directionalShadowMatrix,At.spotLightMatrix.value=G.state.spotLightMatrix,At.spotLightMap.value=G.state.spotLightMap,At.pointShadowMatrix.value=G.state.pointShadowMatrix),V.lightProbeGrid=v.state.lightProbeGridArray.length>0,V.currentProgram=$t,V.uniformsList=null,$t}function ih(b){if(b.uniformsList===null){let U=b.currentProgram.getUniforms();b.uniformsList=Es.seqWithValue(U.seq,b.uniforms)}return b.uniformsList}function sh(b,U){let X=W.get(b);X.outputColorSpace=U.outputColorSpace,X.batching=U.batching,X.batchingColor=U.batchingColor,X.instancing=U.instancing,X.instancingColor=U.instancingColor,X.instancingMorph=U.instancingMorph,X.skinning=U.skinning,X.morphTargets=U.morphTargets,X.morphNormals=U.morphNormals,X.morphColors=U.morphColors,X.morphTargetsCount=U.morphTargetsCount,X.numClippingPlanes=U.numClippingPlanes,X.numIntersection=U.numClipIntersection,X.vertexAlphas=U.vertexAlphas,X.vertexTangents=U.vertexTangents,X.toneMapping=U.toneMapping}function Hf(b,U){if(b.length===0)return null;if(b.length===1)return b[0].texture!==null?b[0]:null;y.setFromMatrixPosition(U.matrixWorld);for(let X=0,V=b.length;X<V;X++){let G=b[X];if(G.texture!==null&&G.boundingBox.containsPoint(y))return G}return null}function Wf(b,U,X,V,G){U.isScene!==!0&&(U=Dt),Y.resetTextureUnits();let yt=U.fog,Tt=V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial?U.environment:null,_t=j===null?I.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:Qt.workingColorSpace,Et=V.isMeshStandardMaterial||V.isMeshLambertMaterial&&!V.envMap||V.isMeshPhongMaterial&&!V.envMap,Ct=lt.get(V.envMap||Tt,Et),Xt=V.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,$t=!!X.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),At=!!X.morphAttributes.position,re=!!X.morphAttributes.normal,Se=!!X.morphAttributes.color,me=yn;V.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(me=I.toneMapping);let ue=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,Be=ue!==void 0?ue.length:0,Mt=W.get(V),He=v.state.lights;if(st===!0&&(rt===!0||b!==K)){let de=b===K&&V.id===q;Pt.setState(V,b,de)}let ee=!1;V.version===Mt.__version?(Mt.needsLights&&Mt.lightsStateVersion!==He.state.version||Mt.outputColorSpace!==_t||G.isBatchedMesh&&Mt.batching===!1||!G.isBatchedMesh&&Mt.batching===!0||G.isBatchedMesh&&Mt.batchingColor===!0&&G._colorsTexture===null||G.isBatchedMesh&&Mt.batchingColor===!1&&G._colorsTexture!==null||G.isInstancedMesh&&Mt.instancing===!1||!G.isInstancedMesh&&Mt.instancing===!0||G.isSkinnedMesh&&Mt.skinning===!1||!G.isSkinnedMesh&&Mt.skinning===!0||G.isInstancedMesh&&Mt.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&Mt.instancingColor===!1&&G.instanceColor!==null||G.isInstancedMesh&&Mt.instancingMorph===!0&&G.morphTexture===null||G.isInstancedMesh&&Mt.instancingMorph===!1&&G.morphTexture!==null||Mt.envMap!==Ct||V.fog===!0&&Mt.fog!==yt||Mt.numClippingPlanes!==void 0&&(Mt.numClippingPlanes!==Pt.numPlanes||Mt.numIntersection!==Pt.numIntersection)||Mt.vertexAlphas!==Xt||Mt.vertexTangents!==$t||Mt.morphTargets!==At||Mt.morphNormals!==re||Mt.morphColors!==Se||Mt.toneMapping!==me||Mt.morphTargetsCount!==Be||!!Mt.lightProbeGrid!=v.state.lightProbeGridArray.length>0)&&(ee=!0):(ee=!0,Mt.__version=V.version);let on=Mt.currentProgram;ee===!0&&(on=kr(V,U,G),O&&V.isNodeMaterial&&O.onUpdateProgram(V,on,Mt));let wn=!1,Kn=!1,Gi=!1,ce=on.getUniforms(),ve=Mt.uniforms;if(_.useProgram(on.program)&&(wn=!0,Kn=!0,Gi=!0),V.id!==q&&(q=V.id,Kn=!0),Mt.needsLights){let de=Hf(v.state.lightProbeGridArray,G);Mt.lightProbeGrid!==de&&(Mt.lightProbeGrid=de,Kn=!0)}if(wn||K!==b){_.buffers.depth.getReversed()&&b.reversedDepth!==!0&&(b._reversedDepth=!0,b.updateProjectionMatrix()),ce.setValue(L,"projectionMatrix",b.projectionMatrix),ce.setValue(L,"viewMatrix",b.matrixWorldInverse);let jn=ce.map.cameraPosition;jn!==void 0&&jn.setValue(L,ht.setFromMatrixPosition(b.matrixWorld)),R.logarithmicDepthBuffer&&ce.setValue(L,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&ce.setValue(L,"isOrthographic",b.isOrthographicCamera===!0),K!==b&&(K=b,Kn=!0,Gi=!0)}if(Mt.needsLights&&(He.state.sunShadowMap.length>0&&ce.setValue(L,"sunShadowMap",He.state.sunShadowMap,Y),He.state.directionalShadowMap.length>0&&ce.setValue(L,"directionalShadowMap",He.state.directionalShadowMap,Y),He.state.spotShadowMap.length>0&&ce.setValue(L,"spotShadowMap",He.state.spotShadowMap,Y),He.state.pointShadowMap.length>0&&ce.setValue(L,"pointShadowMap",He.state.pointShadowMap,Y)),G.isSkinnedMesh){ce.setOptional(L,G,"bindMatrix"),ce.setOptional(L,G,"bindMatrixInverse");let de=G.skeleton;de&&(de.boneTexture===null&&de.computeBoneTexture(),ce.setValue(L,"boneTexture",de.boneTexture,Y))}G.isBatchedMesh&&(ce.setOptional(L,G,"batchingTexture"),ce.setValue(L,"batchingTexture",G._matricesTexture,Y),ce.setOptional(L,G,"batchingIdTexture"),ce.setValue(L,"batchingIdTexture",G._indirectTexture,Y),ce.setOptional(L,G,"batchingColorTexture"),G._colorsTexture!==null&&ce.setValue(L,"batchingColorTexture",G._colorsTexture,Y));let Qn=X.morphAttributes;if((Qn.position!==void 0||Qn.normal!==void 0||Qn.color!==void 0)&&F.update(G,X,on),(Kn||Mt.receiveShadow!==G.receiveShadow)&&(Mt.receiveShadow=G.receiveShadow,ce.setValue(L,"receiveShadow",G.receiveShadow)),(V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial)&&V.envMap===null&&U.environment!==null&&(ve.envMapIntensity.value=U.environmentIntensity),ve.dfgLUT!==void 0&&(ve.dfgLUT.value=Jx()),Kn){if(ce.setValue(L,"toneMappingExposure",I.toneMappingExposure),Mt.needsLights&&Xf(ve,Gi),yt&&V.fog===!0&&It.refreshFogUniforms(ve,yt),It.refreshMaterialUniforms(ve,V,et,J,v.state.transmissionRenderTarget[b.id]),Mt.needsLights&&Mt.lightProbeGrid){let de=Mt.lightProbeGrid;ve.probesSH.value=de.texture,ve.probesMin.value.copy(de.boundingBox.min),ve.probesMax.value.copy(de.boundingBox.max),ve.probesResolution.value.copy(de.resolution)}Es.upload(L,ih(Mt),ve,Y)}if(V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(Es.upload(L,ih(Mt),ve,Y),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&ce.setValue(L,"center",G.center),ce.setValue(L,"modelViewMatrix",G.modelViewMatrix),ce.setValue(L,"normalMatrix",G.normalMatrix),ce.setValue(L,"modelMatrix",G.matrixWorld),V.uniformsGroups!==void 0){let de=V.uniformsGroups;for(let jn=0,Hi=de.length;jn<Hi;jn++){let ah=de[jn];it.update(ah,on),it.bind(ah,on)}}return on}function Xf(b,U){b.ambientLightColor.needsUpdate=U,b.lightProbe.needsUpdate=U,b.sunLights.needsUpdate=U,b.sunLightShadows.needsUpdate=U,b.directionalLights.needsUpdate=U,b.directionalLightShadows.needsUpdate=U,b.pointLights.needsUpdate=U,b.pointLightShadows.needsUpdate=U,b.spotLights.needsUpdate=U,b.spotLightShadows.needsUpdate=U,b.rectAreaLights.needsUpdate=U,b.hemisphereLights.needsUpdate=U}function qf(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return B},this.getActiveMipmapLevel=function(){return k},this.getRenderTarget=function(){return j},this.setRenderTargetTextures=function(b,U,X){let V=W.get(b);V.__autoAllocateDepthBuffer=b.resolveDepthBuffer===!1,V.__autoAllocateDepthBuffer===!1&&(V.__useRenderToTexture=!1),W.get(b.texture).__webglTexture=U,W.get(b.depthTexture).__webglTexture=V.__autoAllocateDepthBuffer?void 0:X,V.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(b,U){let X=W.get(b);X.__webglFramebuffer=U,X.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(b,U=0,X=0){j=b,B=U,k=X;let V=null,G=!1,yt=!1;if(b){let _t=W.get(b);if(_t.__useDefaultFramebuffer!==void 0){_.bindFramebuffer(L.FRAMEBUFFER,_t.__webglFramebuffer),$.copy(b.viewport),wt.copy(b.scissor),bt=b.scissorTest,_.viewport($),_.scissor(wt),_.setScissorTest(bt),q=-1;return}else if(_t.__webglFramebuffer===void 0)Y.setupRenderTarget(b);else if(_t.__hasExternalTextures)Y.rebindTextures(b,W.get(b.texture).__webglTexture,W.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){let Xt=b.depthTexture;if(_t.__boundDepthTexture!==Xt){if(Xt!==null&&W.has(Xt)&&(b.width!==Xt.image.width||b.height!==Xt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Y.setupDepthRenderbuffer(b)}}let Et=b.texture;(Et.isData3DTexture||Et.isDataArrayTexture||Et.isCompressedArrayTexture)&&(yt=!0);let Ct=W.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Ct[U])?V=Ct[U][X]:V=Ct[U],G=!0):b.samples>0&&Y.useMultisampledRTT(b)===!1?V=W.get(b).__webglMultisampledFramebuffer:Array.isArray(Ct)?V=Ct[X]:V=Ct,$.copy(b.viewport),wt.copy(b.scissor),bt=b.scissorTest}else $.copy(St).multiplyScalar(et).floor(),wt.copy(zt).multiplyScalar(et).floor(),bt=le;if(X!==0&&(V=H),_.bindFramebuffer(L.FRAMEBUFFER,V)&&_.drawBuffers(b,V),_.viewport($),_.scissor(wt),_.setScissorTest(bt),G){let _t=W.get(b.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+U,_t.__webglTexture,X)}else if(yt){let _t=U;for(let Et=0;Et<b.textures.length;Et++){let Ct=W.get(b.textures[Et]);L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0+Et,Ct.__webglTexture,X,_t)}}else if(b!==null&&X!==0){let _t=W.get(b.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,_t.__webglTexture,X)}q=-1};function rh(b){let U=W.get(b);return(U.__readFormat!==b.format||U.__readType!==b.type)&&(U.__readFormat=b.format,U.__readType=b.type,U.__formatReadable=R.textureFormatReadable(b.format),U.__typeReadable=R.textureTypeReadable(b.type)),U}this.readRenderTargetPixels=function(b,U,X,V,G,yt,Tt,_t=0){if(!(b&&b.isWebGLRenderTarget)){Ot("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Et=W.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Tt!==void 0&&(Et=Et[Tt]),Et){_.bindFramebuffer(L.FRAMEBUFFER,Et);try{let Ct=b.textures[_t],Xt=Ct.format,$t=Ct.type;b.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+_t);let At=rh(Ct);if(At.__formatReadable===!1){Ot("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(At.__typeReadable===!1){Ot("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=b.width-V&&X>=0&&X<=b.height-G&&L.readPixels(U,X,V,G,pt.convert(Xt),pt.convert($t),yt)}finally{let Ct=j!==null?W.get(j).__webglFramebuffer:null;_.bindFramebuffer(L.FRAMEBUFFER,Ct)}}},this.readRenderTargetPixelsAsync=async function(b,U,X,V,G,yt,Tt,_t=0){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Et=W.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Tt!==void 0&&(Et=Et[Tt]),Et)if(U>=0&&U<=b.width-V&&X>=0&&X<=b.height-G){_.bindFramebuffer(L.FRAMEBUFFER,Et);let Ct=b.textures[_t],Xt=Ct.format,$t=Ct.type;b.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+_t);let At=rh(Ct);if(At.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(At.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let re=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,re),L.bufferData(L.PIXEL_PACK_BUFFER,yt.byteLength,L.STREAM_READ),L.readPixels(U,X,V,G,pt.convert(Xt),pt.convert($t),0),L.bindBuffer(L.PIXEL_PACK_BUFFER,null);let Se=j!==null?W.get(j).__webglFramebuffer:null;_.bindFramebuffer(L.FRAMEBUFFER,Se);let me=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await _u(L,me,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,re),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,yt),L.bindBuffer(L.PIXEL_PACK_BUFFER,null),L.deleteBuffer(re),L.deleteSync(me),yt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(b,U=null,X=0){let V=Math.pow(2,-X),G=Math.floor(b.image.width*V),yt=Math.floor(b.image.height*V),Tt=U!==null?U.x:0,_t=U!==null?U.y:0;Y.setTexture2D(b,0),L.copyTexSubImage2D(L.TEXTURE_2D,X,0,0,Tt,_t,G,yt),_.unbindTexture()},this.copyTextureToTexture=function(b,U,X=null,V=null,G=0,yt=0){let Tt,_t,Et,Ct,Xt,$t,At,re,Se,me=b.isCompressedTexture?b.mipmaps[yt]:b.image;if(X!==null)Tt=X.max.x-X.min.x,_t=X.max.y-X.min.y,Et=X.isBox3?X.max.z-X.min.z:1,Ct=X.min.x,Xt=X.min.y,$t=X.isBox3?X.min.z:0;else{let ve=Math.pow(2,-G);Tt=Math.floor(me.width*ve),_t=Math.floor(me.height*ve),b.isDataArrayTexture?Et=me.depth:b.isData3DTexture?Et=Math.floor(me.depth*ve):Et=1,Ct=0,Xt=0,$t=0}V!==null?(At=V.x,re=V.y,Se=V.z):(At=0,re=0,Se=0);let ue=pt.convert(U.format),Be=pt.convert(U.type),Mt;U.isData3DTexture?(Y.setTexture3D(U,0),Mt=L.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(Y.setTexture2DArray(U,0),Mt=L.TEXTURE_2D_ARRAY):(Y.setTexture2D(U,0),Mt=L.TEXTURE_2D),_.activeTexture(L.TEXTURE0),_.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,U.flipY),_.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),_.pixelStorei(L.UNPACK_ALIGNMENT,U.unpackAlignment);let He=_.getParameter(L.UNPACK_ROW_LENGTH),ee=_.getParameter(L.UNPACK_IMAGE_HEIGHT),on=_.getParameter(L.UNPACK_SKIP_PIXELS),wn=_.getParameter(L.UNPACK_SKIP_ROWS),Kn=_.getParameter(L.UNPACK_SKIP_IMAGES);_.pixelStorei(L.UNPACK_ROW_LENGTH,me.width),_.pixelStorei(L.UNPACK_IMAGE_HEIGHT,me.height),_.pixelStorei(L.UNPACK_SKIP_PIXELS,Ct),_.pixelStorei(L.UNPACK_SKIP_ROWS,Xt),_.pixelStorei(L.UNPACK_SKIP_IMAGES,$t);let Gi=b.isDataArrayTexture||b.isData3DTexture,ce=U.isDataArrayTexture||U.isData3DTexture;if(b.isDepthTexture){let ve=W.get(b),Qn=W.get(U),de=W.get(ve.__renderTarget),jn=W.get(Qn.__renderTarget);_.bindFramebuffer(L.READ_FRAMEBUFFER,de.__webglFramebuffer),_.bindFramebuffer(L.DRAW_FRAMEBUFFER,jn.__webglFramebuffer);for(let Hi=0;Hi<Et;Hi++)Gi&&(L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,W.get(b).__webglTexture,G,$t+Hi),L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,W.get(U).__webglTexture,yt,Se+Hi)),L.blitFramebuffer(Ct,Xt,Tt,_t,At,re,Tt,_t,L.DEPTH_BUFFER_BIT,L.NEAREST);_.bindFramebuffer(L.READ_FRAMEBUFFER,null),_.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else if(G!==0||b.isRenderTargetTexture||W.has(b)){let ve=W.get(b),Qn=W.get(U);_.bindFramebuffer(L.READ_FRAMEBUFFER,N),_.bindFramebuffer(L.DRAW_FRAMEBUFFER,C);for(let de=0;de<Et;de++)Gi?L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,ve.__webglTexture,G,$t+de):L.framebufferTexture2D(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,ve.__webglTexture,G),ce?L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Qn.__webglTexture,yt,Se+de):L.framebufferTexture2D(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,Qn.__webglTexture,yt),G!==0?L.blitFramebuffer(Ct,Xt,Tt,_t,At,re,Tt,_t,L.COLOR_BUFFER_BIT,L.NEAREST):ce?L.copyTexSubImage3D(Mt,yt,At,re,Se+de,Ct,Xt,Tt,_t):L.copyTexSubImage2D(Mt,yt,At,re,Ct,Xt,Tt,_t);_.bindFramebuffer(L.READ_FRAMEBUFFER,null),_.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else ce?b.isDataTexture||b.isData3DTexture?L.texSubImage3D(Mt,yt,At,re,Se,Tt,_t,Et,ue,Be,me.data):U.isCompressedArrayTexture?L.compressedTexSubImage3D(Mt,yt,At,re,Se,Tt,_t,Et,ue,me.data):L.texSubImage3D(Mt,yt,At,re,Se,Tt,_t,Et,ue,Be,me):b.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,yt,At,re,Tt,_t,ue,Be,me.data):b.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,yt,At,re,me.width,me.height,ue,me.data):L.texSubImage2D(L.TEXTURE_2D,yt,At,re,Tt,_t,ue,Be,me);_.pixelStorei(L.UNPACK_ROW_LENGTH,He),_.pixelStorei(L.UNPACK_IMAGE_HEIGHT,ee),_.pixelStorei(L.UNPACK_SKIP_PIXELS,on),_.pixelStorei(L.UNPACK_SKIP_ROWS,wn),_.pixelStorei(L.UNPACK_SKIP_IMAGES,Kn),yt===0&&U.generateMipmaps&&L.generateMipmap(Mt),_.unbindTexture()},this.initRenderTarget=function(b){W.get(b).__webglFramebuffer===void 0&&Y.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?Y.setTextureCube(b,0):b.isData3DTexture?Y.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?Y.setTexture2DArray(b,0):Y.setTexture2D(b,0),_.unbindTexture()},this.resetState=function(){B=0,k=0,j=null,_.reset(),vt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return _n}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=Qt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Qt._getUnpackColorSpace()}}});function Rs(n){return new _r({color:0,emissive:16777215,emissiveIntensity:n})}var Go,nf=ln(()=>{bn();Go=class extends Ci{constructor(){super(),this.name="RoomEnvironment",this.position.y=-3.5;let t=new Nn;t.deleteAttribute("uv");let e=new $e({side:Fe}),i=new $e,s=new br(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);let r=new pe(t,e);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);let a=new nr(t,i,6),o=new be;o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),o.updateMatrix(),a.setMatrixAt(0,o.matrix),o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),o.updateMatrix(),a.setMatrixAt(1,o.matrix),o.position.set(6.167,.857,7.803),o.rotation.set(0,.561,0),o.scale.set(3.927,6.285,3.687),o.updateMatrix(),a.setMatrixAt(2,o.matrix),o.position.set(-2.017,.018,6.124),o.rotation.set(0,.333,0),o.scale.set(2.002,4.566,2.064),o.updateMatrix(),a.setMatrixAt(3,o.matrix),o.position.set(2.291,-.756,-2.621),o.rotation.set(0,-.286,0),o.scale.set(1.546,1.552,1.496),o.updateMatrix(),a.setMatrixAt(4,o.matrix),o.position.set(-2.193,-.369,-5.547),o.rotation.set(0,.516,0),o.scale.set(3.875,3.487,2.986),o.updateMatrix(),a.setMatrixAt(5,o.matrix),this.add(a);let l=new pe(t,Rs(50));l.position.set(-16.116,14.37,8.208),l.scale.set(.1,2.428,2.739),this.add(l);let c=new pe(t,Rs(50));c.position.set(-16.109,18.021,-8.207),c.scale.set(.1,2.425,2.751),this.add(c);let h=new pe(t,Rs(17));h.position.set(14.904,12.198,-1.832),h.scale.set(.15,4.265,6.331),this.add(h);let f=new pe(t,Rs(43));f.position.set(-.462,8.89,14.52),f.scale.set(4.38,5.441,.088),this.add(f);let u=new pe(t,Rs(20));u.position.set(3.235,11.486,-12.541),u.scale.set(2.5,2,.1),this.add(u);let d=new pe(t,Rs(100));d.position.set(0,20,0),d.scale.set(1,.1,1),this.add(d)}dispose(){let t=new Set;this.traverse(e=>{e.isMesh&&(t.add(e.geometry),t.add(e.material))});for(let e of t)e.dispose()}}});function rf(n,t=!1){let e=n[0].index!==null,i=new Set(Object.keys(n[0].attributes)),s=new Set(Object.keys(n[0].morphAttributes)),r={},a={},o=n[0].morphTargetsRelative,l=new Le,c=0;for(let h=0;h<n.length;++h){let f=n[h],u=0;if(e!==(f.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let d in f.attributes){if(!i.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;r[d]===void 0&&(r[d]=[]),r[d].push(f.attributes[d]),u++}if(u!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==f.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let d in f.morphAttributes){if(!s.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;a[d]===void 0&&(a[d]=[]),a[d].push(f.morphAttributes[d])}if(t){let d;if(e)d=f.index.count;else if(f.attributes.position!==void 0)d=f.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,d,h),c+=d}}if(e){let h=0,f=[];for(let u=0;u<n.length;++u){let d=n[u].index;for(let g=0;g<d.count;++g)f.push(d.getX(g)+h);h+=n[u].attributes.position.count}l.setIndex(f)}for(let h in r){let f=sf(r[h]);if(!f)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,f)}for(let h in a){let f=a[h][0].length;if(f!==0){l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let u=0;u<f;++u){let d=[];for(let M=0;M<a[h].length;++M)d.push(a[h][M][u]);let g=sf(d);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(g)}}}return l}function sf(n){let t,e,i,s=-1,r=0;for(let c=0;c<n.length;++c){let h=n[c];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=h.normalized),i!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}let a=new t(r),o=new Ne(a,e,i),l=0;for(let c=0;c<n.length;++c){let h=n[c];if(h.isInterleavedBufferAttribute){let f=l/e;for(let u=0,d=h.count;u<d;u++)for(let g=0;g<e;g++){let M=h.getComponent(u,g);o.setComponent(u+f,g,M)}}else a.set(h.array,l);l+=h.count*e}return s!==void 0&&(o.gpuType=s),o}var af=ln(()=>{bn()});function Kx(n){let t=n.attributes.position.array,e=n.attributes.uv.array,i=n.attributes.position.count;for(let s=0;s<i;s+=3){let r=s*3,a=r+3,o=r+6,l=t[a]-t[r],c=t[a+1]-t[r+1],h=t[a+2]-t[r+2],f=t[o]-t[r],u=t[o+1]-t[r+1],d=t[o+2]-t[r+2],g=Math.abs(c*d-h*u),M=Math.abs(h*f-l*d),p=Math.abs(l*u-c*f);for(let m=0;m<3;m++){let S=(s+m)*3,T=(s+m)*2;g>=M&&g>=p?(e[T]=t[S+2],e[T+1]=t[S+1]):M>=p?(e[T]=t[S],e[T+1]=t[S+2]):(e[T]=t[S],e[T+1]=t[S+1])}}}function Ve(n,t=.012,e=40,i=6){let s=new ps(n.map(r=>new P(...r)),!1,"centripetal");return new xr(s,e,t,i,!1)}function Tn(n,t,e,i=64,s=Math.PI*2){let r=new ci;if(s>=Math.PI*2-1e-4){r.absarc(0,0,t,0,Math.PI*2,!1);let o=new Pi;o.absarc(0,0,n,0,Math.PI*2,!0),r.holes.push(o)}else r.absarc(0,0,t,0,s,!1),r.absarc(0,0,n,s,0,!0);let a=new Di(r,{depth:e,bevelEnabled:!1,curveSegments:i});return a.rotateX(-Math.PI/2),a}var Ho,Wo,Xo,Cs,of,US,qo,Yo,Is=ln(()=>{bn();af();Ho=new jt,Wo=new qe,Xo=new Ze,Cs=new P,of=new P,US=new Vt,qo=class{constructor(){this.groups=new Map,this.stack=[new jt],this.colliders=[]}get top(){return this.stack[this.stack.length-1]}push(t=[0,0,0],e=[0,0,0],i=1){Xo.set(e[0],e[1],e[2]),Wo.setFromEuler(Xo),typeof i=="number"?Cs.set(i,i,i):Cs.set(i[0],i[1],i[2]),Ho.compose(of.set(t[0],t[1],t[2]),Wo,Cs),this.stack.push(this.top.clone().multiply(Ho))}pop(){this.stack.pop()}pushLook(t,e,i=[0,1,0]){let s=new P(...t),r=new P(...e),a=new P(...i),o=s.clone().sub(r).normalize();Math.abs(o.dot(a))>.999&&a.set(0,0,1);let l=new jt().lookAt(s,r,a);l.setPosition(s),this.stack.push(this.top.clone().multiply(l))}add(t,e,i=[0,0,0],s=[0,0,0],r={}){Xo.set(s[0],s[1],s[2]),Wo.setFromEuler(Xo);let a=r.scale?typeof r.scale=="number"?Cs.set(r.scale,r.scale,r.scale):Cs.set(...r.scale):Cs.set(1,1,1);Ho.compose(of.set(i[0],i[1],i[2]),Wo,a);let o=this.top.clone().multiply(Ho),l=t.index?t.toNonIndexed():t.clone();for(let u of Object.keys(l.attributes))u!=="position"&&u!=="normal"&&u!=="uv"&&l.deleteAttribute(u);l.applyMatrix4(o),l.attributes.uv||l.setAttribute("uv",new Ne(new Float32Array(l.attributes.position.count*2),2)),(r.uv||e.userData.uv||"world")==="world"&&Kx(l);let h=(this.region||"")+"|"+e.uuid,f=this.groups.get(h);return f||(f={mat:e,geos:[],cast:e.userData.cast!==!1,receive:e.userData.receive!==!1},this.groups.set(h,f)),f.geos.push(l),l}box(t,e,i,s,r,a,o){return this.add(new Nn(t,e,i),s,r,a,o)}cyl(t,e,i,s,r,a,o=20,l){return this.add(new Ii(t,e,i,o),s,r,a,l)}collideBox(t,e,i,s){this.colliders.push({type:"box",minX:t,maxX:e,minZ:i,maxZ:s})}collideCircle(t,e,i){this.colliders.push({type:"circle",x:t,z:e,r:i})}collideLocalBox(t,e,i){let s=[[-t/2,-e/2],[t/2,-e/2],[t/2,e/2],[-t/2,e/2]],r=1e9,a=-1e9,o=1e9,l=-1e9;for(let[c,h]of s){let f=new P(i[0]+c,0,i[2]+h).applyMatrix4(this.top);r=Math.min(r,f.x),a=Math.max(a,f.x),o=Math.min(o,f.z),l=Math.max(l,f.z)}this.collideBox(r,a,o,l)}build(t){let e=0;for(let i of this.groups.values()){let s=i.mat,r=rf(i.geos,!1);r.computeBoundingSphere();let a=new pe(r,s);a.castShadow=i.cast,a.receiveShadow=i.receive,a.matrixAutoUpdate=!1,a.updateMatrix(),s.transparent&&(a.renderOrder=2),t.add(a),e+=r.attributes.position.count/3;for(let o of i.geos)o.dispose()}return this.groups.clear(),e}};Yo=class{constructor(t=2048){this.size=t,this.canvas=document.createElement("canvas"),this.canvas.width=this.canvas.height=t,this.ctx=this.canvas.getContext("2d"),this.x=0,this.y=0,this.rowH=0}alloc(t,e){if(t=Math.ceil(t)+4,e=Math.ceil(e)+4,this.x+t>this.size&&(this.x=0,this.y+=this.rowH,this.rowH=0),this.y+e>this.size)throw new Error("atlas full");let i={x:this.x+2,y:this.y+2,w:t-4,h:e-4};return this.x+=t,this.rowH=Math.max(this.rowH,e),i}plane(t,e,i,s){i=Math.min(i,(this.size-8)/t,(this.size-8)/e);let r=this.alloc(t*i,e*i),a=this.ctx;a.save(),a.translate(r.x,r.y),a.beginPath(),a.rect(0,0,r.w,r.h),a.clip(),a.clearRect(0,0,r.w,r.h),s(a,r.w,r.h),a.restore();let o=new $n(t,e),l=o.attributes.uv,c=this.size;for(let h=0;h<l.count;h++){let f=l.getX(h),u=l.getY(h);l.setXY(h,(r.x+f*r.w)/c,1-(r.y+(1-u)*r.h)/c)}return o}cylBand(t,e,i,s,r,a,o=32){r=Math.min(r,(this.size-8)/(t*s));let l=this.alloc(t*s*r,e*r),c=this.ctx;c.save(),c.translate(l.x,l.y),c.beginPath(),c.rect(0,0,l.w,l.h),c.clip(),c.clearRect(0,0,l.w,l.h),a(c,l.w,l.h),c.restore();let h=new Ii(t,t,e,o,1,!0,i,s),f=h.attributes.uv,u=this.size;for(let d=0;d<f.count;d++){let g=f.getX(d),M=f.getY(d);f.setXY(d,(l.x+g*l.w)/u,1-(l.y+(1-M)*l.h)/u)}return h}sign(t,e,{bg:i="#f2f2ee",border:s=null,lines:r=[],align:a="center",pad:o=.08,px:l=400}={}){return this.plane(t,e,l,(c,h,f)=>{c.fillStyle=i,c.fillRect(0,0,h,f),s&&(c.strokeStyle=s,c.lineWidth=Math.max(2,f*.04),c.strokeRect(c.lineWidth/2,c.lineWidth/2,h-c.lineWidth,f-c.lineWidth));let u=r.reduce((g,M)=>g+M.size*f*1.25,0),d=(f-u)/2;for(let g of r){let M=g.size*f;c.font=`${g.weight||600} ${M}px ${g.font||'"Segoe UI", Arial, sans-serif'}`,c.fillStyle=g.color||"#1b1f24",c.textBaseline="middle",c.textAlign=g.align||a;let p=(g.align||a)==="left"?h*o:(g.align||a)==="right"?h*(1-o):h/2;c.fillText(g.t,p,d+M*.62,h*(1-o*2)),d+=M*1.25}})}texture(t){let e=new Zn(this.canvas);return e.colorSpace=Ee,e.anisotropy=t,e}}});function Or(n){let t=n>>>0;return()=>(t=t*1664525+1013904223>>>0,t/4294967296)}function Qx(n,t,e,i){let s=Or(i),r=new Float32Array(t*e);for(let o=0;o<r.length;o++)r[o]=s();let a=new Float32Array(n*n);for(let o=0;o<n;o++){let l=o/n*e,c=Math.floor(l),h=l-c,f=h*h*(3-2*h),u=c%e*t,d=(c+1)%e*t;for(let g=0;g<n;g++){let M=g/n*t,p=Math.floor(M),m=M-p,S=m*m*(3-2*m),T=p%t,y=(p+1)%t,E=r[u+T]+(r[u+y]-r[u+T])*S,v=r[d+T]+(r[d+y]-r[d+T])*S;a[o*n+g]=E+(v-E)*f}}return a}function Ge(n,t,e,i,s=1){let r=new Float32Array(n*n),a=1,o=0,l=t;for(let c=0;c<e;c++){let h=Qx(n,Math.max(1,Math.round(l/s)),Math.min(n,l),i+c*101);for(let f=0;f<r.length;f++)r[f]+=(h[f]-.5)*a;o+=a,a*=.5,l*=2}for(let c=0;c<r.length;c++)r[c]/=o;return r}function Zo(n){let t=document.createElement("canvas");return t.width=t.height=n,t}function De(n,t,e=[1,1,1]){let i=Zo(n),s=i.getContext("2d"),r=s.createImageData(n,n);for(let a=0;a<n*n;a++){let o=Math.max(0,Math.min(1,t(a)));r.data[a*4]=o*255*e[0],r.data[a*4+1]=o*255*e[1],r.data[a*4+2]=o*255*e[2],r.data[a*4+3]=255}return s.putImageData(r,0,0),i}function _i(n,t,e){let i=Zo(n),s=i.getContext("2d"),r=s.createImageData(n,n);for(let a=0;a<n;a++)for(let o=0;o<n;o++){let l=t[a*n+(o-1+n)%n],c=t[a*n+(o+1)%n],h=t[(a-1+n)%n*n+o],f=t[(a+1)%n*n+o],u=(l-c)*e,d=(f-h)*e,g=1,M=Math.hypot(u,d,g),p=(a*n+o)*4;r.data[p]=(u/M*.5+.5)*255,r.data[p+1]=(d/M*.5+.5)*255,r.data[p+2]=(g/M*.5+.5)*255,r.data[p+3]=255}return s.putImageData(r,0,0),i}function Fc(n,t,e){let i=new Zn(n);return i.wrapS=i.wrapT=as,i.colorSpace=t?Ee:Mn,i.anisotropy=e,i.generateMipmaps=!0,i.minFilter=Fn,i}function ki(n,t,e,i,s,r){let a=n.getContext("2d"),o=Or(e),l=n.width;a.lineCap="round";for(let c=0;c<t;c++){let h=o()*l,f=o()*l,u=o()*Math.PI*2,d=(.1+o())*r;a.strokeStyle=i,a.globalAlpha=s*(.3+o()*.7),a.lineWidth=.5+o()*1.2,a.beginPath(),a.moveTo(h,f),a.quadraticCurveTo(h+Math.cos(u+.2)*d*.5,f+Math.sin(u+.2)*d*.5,h+Math.cos(u)*d,f+Math.sin(u)*d),a.stroke()}a.globalAlpha=1}function lf(n){let t={},e=(i,s,r,a,o,l)=>{let c=1/r,h={map:Fc(a,!0,n)};o&&(h.roughnessMap=Fc(o,!1,n)),l&&(h.normalMap=Fc(l,!1,n));for(let f in h)h[f].repeat.set(c,c);t[i]=h};{let s=Ge(1024,4,4,11),r=Ge(1024,128,2,12),a=Or(5),o=new Float32Array(1024*1024),l=f=>{let u=f%1024,d=f/1024|0,g=Math.min(u%512,512-u%512),M=Math.min(d%512,512-d%512);return Math.min(g,M)},c=De(1024,f=>{let u=l(f),d=.56+s[f]*.16+r[f]*.05+(a()<.01?(a()-.5)*.18:0);return u<2?d*=.55:u<4&&(d*=.85),o[f]=u<3?-1:0,d},[1,.995,.975]);ki(c,90,7,"#2a2a2a",.08,120);let h=De(1024,f=>.42+s[f]*.25+r[f]*.1+(l(f)<3?.3:0));e("floor",1024,2.4,c,h,_i(1024,o,1.5))}{let s=Ge(512,6,3,21),r=Ge(512,128,2,22),a=Or(9),o=new Float32Array(512*512),l=De(512,c=>{let h=c%512,f=c/512|0,u=Math.min(h%256,256-h%256,f%256,256-f%256),g=.66+(((h/256|0)+(f/256|0))%2?.02:0)+s[c]*.06+r[c]*.05;return a()<.035&&(g-=.12+a()*.2),u<1&&(g*=.7,o[c]=-1),g},[.97,.99,1]);e("vinyl",512,1.2,l,De(512,c=>.55+s[c]*.2),_i(512,o,1.2))}{let s=Ge(256,64,2,31),r=new Float32Array(256*256),a=De(256,o=>{let l=o/256|0,c=Math.sin(l/256*Math.PI*2*16);return r[o]=c,.17+c*.015+s[o]*.05},[1,1,1.04]);e("ribRubber",256,.5,a,De(256,o=>.8+s[o]*.2),_i(256,r,.6))}{let s=Ge(512,4,3,41),r=Ge(512,128,2,42),a=new Float32Array(512*512),o=De(512,l=>{let c=l%512,h=Math.min(c,512-c);return a[l]=h<2?-1:r[l]*.15,(.9+s[l]*.04+r[l]*.015)*(h<2?.8:1)});e("wall",512,1.2,o,null,_i(512,a,1.4))}{let s=Or(51),r=De(256,a=>{let o=a%256,l=a/256|0;return Math.min(o,256-o,l,256-l)<4?.8:.86-(s()<.06?.12*s():0)});e("ceiling",256,.6,r,null,null)}{let s=Ge(256,4,3,61),r=Ge(256,64,2,62),a=new Float32Array(256*256);for(let l=0;l<a.length;l++)a[l]=r[l];let o=De(256,l=>.95+s[l]*.05+r[l]*.02);ki(o,14,63,"#777",.12,40),e("paint",256,.4,o,De(256,l=>.5+s[l]*.2+r[l]*.1),_i(256,a,.5))}{let s=Ge(512,256,3,71,64),r=Ge(512,4,2,72),a=new Float32Array(512*512);for(let l=0;l<a.length;l++)a[l]=s[l];let o=De(512,l=>.82+s[l]*.22+r[l]*.06);ki(o,20,73,"#555",.15,60),e("brushed",512,.35,o,De(512,l=>.3+s[l]*.25+r[l]*.12),_i(512,a,.8))}{let s=Ge(1024,5,4,81),r=Ge(1024,256,2,82),a=De(1024,c=>.26+s[c]*.06+r[c]*.02,[1,1,1.03]);ki(a,260,83,"#9aa0a6",.12,60);let o=a.getContext("2d");o.globalAlpha=.07,o.strokeStyle="#d8d0c0",o.lineWidth=5,o.beginPath(),o.arc(300,640,34,.3,5.6),o.stroke(),o.globalAlpha=.05,o.beginPath(),o.arc(760,220,33,1.2,6),o.stroke(),o.globalAlpha=1;let l=De(1024,c=>.55+s[c]*.2+r[c]*.08);ki(l,200,83,"#555",.3,60),e("worktop",1024,1.2,a,l,null)}{let s=Ge(512,5,3,91),r=Ge(512,128,2,92),a=De(512,o=>.78+s[o]*.05+r[o]*.02,[1,.985,.95]);ki(a,60,93,"#666",.07,40),e("laminate",512,.8,a,De(512,o=>.5+s[o]*.2),null)}{let s=Ge(256,64,3,101),r=new Float32Array(256*256);for(let a=0;a<r.length;a++)r[a]=s[a];e("rubber",256,.2,De(256,a=>.9+s[a]*.15),De(256,a=>.75+s[a]*.2),_i(256,r,.6))}{let s=Zo(256),r=s.getContext("2d");r.fillStyle="#e2b21c",r.fillRect(0,0,256,256),r.fillStyle="#1c1c1c";for(let a=-2;a<4;a++)r.beginPath(),r.moveTo(a*128,0),r.lineTo(a*128+64,0),r.lineTo(a*128+64+256,256),r.lineTo(a*128+256,256),r.closePath(),r.fill();ki(s,80,111,"#777",.25,30),e("hazard",256,.25,s,null,null)}{let s=Zo(256),r=s.getContext("2d");r.fillStyle="#c9cdd1",r.fillRect(0,0,256,256);let a=new Float32Array(256*256);r.fillStyle="#16181a";for(let l=0;l<16;l++)for(let c=0;c<16;c++){let h=c*16+8+l%2*8,f=l*16+8;r.beginPath(),r.arc(h%256,f,4.2,0,Math.PI*2),r.fill()}let o=r.getImageData(0,0,256,256).data;for(let l=0;l<256*256;l++)a[l]=o[l*4]/255;e("perf",256,.12,s,null,_i(256,a,3))}return t}var cf=ln(()=>{bn()});function hf(n,t){let e=(o,l,c={})=>{let h=new $e({...l||{},...o});return Object.assign(h.userData,c),h},i=(o,l={})=>{let c=new Dn({color:o});return Object.assign(c.userData,{cast:!1,receive:!1,...l}),c},s=(o,l=.5,c)=>e({color:o,roughness:l,metalness:0,normalScale:new ot(.35,.35)},n.paint,c),r=(o,l=.35)=>e({color:o,metalness:1,roughness:l,normalScale:new ot(.25,.25)},n.brushed),a={floor:e({color:16777215,roughness:1,metalness:0,normalScale:new ot(.6,.6)},n.floor,{cast:!1}),vinyl:e({color:16777215,roughness:1,metalness:0},n.vinyl,{cast:!1}),ribRubber:e({color:16777215,roughness:1,metalness:0,normalScale:new ot(.6,.6)},n.ribRubber,{cast:!1}),wall:e({color:15329249,roughness:.85,normalScale:new ot(.5,.5)},n.wall),wallAccent:e({color:5204088,roughness:.7,normalScale:new ot(.5,.5)},n.wall),ceiling:e({color:15921904,roughness:.95},n.ceiling,{cast:!1}),skirting:e({color:2763823,roughness:.8},n.rubber),steel:r(13159633,.32),steelDark:r(7172729,.42),alu:r(14080477,.45),chrome:e({color:15264492,metalness:1,roughness:.12}),anodBlack:e({color:2303273,metalness:.6,roughness:.42},n.brushed),brass:e({color:13214298,metalness:1,roughness:.35},n.brushed),paintWhite:s(15263971,.42),paintGrey:s(5462367,.5),paintDark:s(2829875,.55),paintBlue:s(2973580,.45),paintTeal:s(3112826,.45),paintYellow:s(14725152,.45),paintOrange:s(14115882,.42),paintRed:s(11740702,.42),paintGreen:s(4029002,.5),paintCream:s(14275264,.55),rubber:e({color:1908256,roughness:.85,metalness:0},n.rubber),cableBlue:e({color:3108784,roughness:.6},n.rubber),cableOrange:e({color:13788714,roughness:.6},n.rubber),cableGrey:e({color:9212310,roughness:.65},n.rubber),cableYellow:e({color:14202149,roughness:.6},n.rubber),plastic:e({color:3816770,roughness:.55}),plasticLight:e({color:13158852,roughness:.5}),worktop:e({color:16777215,roughness:1,metalness:0},n.worktop),laminate:e({color:16777215,roughness:1,metalness:0},n.laminate),hazard:e({color:16777215,roughness:.6},n.hazard,{cast:!1}),perf:e({color:16777215,roughness:.45,metalness:.7,normalScale:new ot(.5,.5)},n.perf),floorPaintY:e({color:14265634,roughness:.55},null,{cast:!1}),floorPaintW:e({color:15132384,roughness:.55},null,{cast:!1}),paper:e({color:16052970,roughness:.9}),cardboard:e({color:11569754,roughness:.9}),calGrey:e({color:9079434,roughness:.9}),lens:e({color:659480,metalness:.2,roughness:.04,envMapIntensity:2.2}),lensCoat:e({color:2759240,metalness:.6,roughness:.06,envMapIntensity:2}),glass:e({color:13624298,metalness:0,roughness:.05,transparent:!0,opacity:.16,depthWrite:!1,envMapIntensity:1.6},null,{cast:!1,receive:!1}),glassTint:e({color:10467520,metalness:0,roughness:.08,transparent:!0,opacity:.22,depthWrite:!1,envMapIntensity:1.4},null,{cast:!1,receive:!1}),lightPanel:i(16776436),ledGreen:i(4063098),ledAmber:i(16756768),ledRed:i(16722458),ledBlue:i(3842303),ledCyan:i(8386303),ledWhite:i(16054527),screenOff:e({color:461067,roughness:.15,metalness:.3}),label:e({map:t,roughness:.55,metalness:0},null,{uv:"keep",cast:!1}),labelCut:e({map:t,roughness:.6,metalness:0,alphaTest:.5},null,{uv:"keep",cast:!1}),labelGlow:new Dn({map:t})};return Object.assign(a.labelGlow.userData,{uv:"keep",cast:!1,receive:!1}),a.lightPanel.toneMapped=!1,a.glass.side=nn,a.glassTint.side=nn,a}var uf=ln(()=>{bn()});function $o(n,t,e,i,s,r,a,o=0,l=!0){let c=(i+s)/2,h=s-i;n.box(yi,r,h,t.wall,[e-a*yi/2,o+r/2,c]),l&&o===0&&(n.box(.012,1,h,t.wallAccent,[e+a*.006,.6,c]),n.box(.02,.035,h,t.steel,[e+a*.01,1.115,c]),n.box(.018,.1,h,t.skirting,[e+a*.009,.05,c])),o===0&&n.collideBox(Math.min(e,e-a*yi)-.01,Math.max(e,e-a*yi)+.01,i,s)}function Ps(n,t,e,i,s,r,a,o=0,l=!0){let c=(i+s)/2,h=s-i;n.box(h,r,yi,t.wall,[c,o+r/2,e-a*yi/2]),l&&o===0&&(n.box(h,1,.012,t.wallAccent,[c,.6,e+a*.006]),n.box(h,.035,.02,t.steel,[c,1.115,e+a*.01]),n.box(h,.1,.018,t.skirting,[c,.05,e+a*.009])),o===0&&n.collideBox(i,s,Math.min(e,e-a*yi)-.01,Math.max(e,e-a*yi)+.01)}function Bc(n,t,e,i,s,r=1.3,a=!0){let o=a?r:.2,l=a?.2:r;n.box(o,.06,l,t.paintWhite,[e,i-.03,s]),n.box(a?r-.06:.14,.006,a?.14:r-.06,t.lightPanel,[e,i-.063,s])}function ff(n){let{b:t,M:e,A:i}=n,{x0:s,x1:r,z0:a,z1:o,h:l}=jx;t.box(r-s,.1,o-a,e.floor,[0,-.05,(a+o)/2]),t.box(Kt.depth,.1,Kt.z1-Kt.z0,e.vinyl,[s-Kt.depth/2,-.05,0]),t.box(Kt.depth,.1,Kt.z1-Kt.z0,e.ribRubber,[r+Kt.depth/2,-.05,0]);for(let p of[-1,1])t.box(.09,.008,Kt.z1-Kt.z0,e.steel,[p*7,.002,0]);t.box(r-s+.4,.1,o-a+.4,e.ceiling,[0,l+.05,(a+o)/2]);for(let p of[-1,1])t.box(Kt.depth,.1,Kt.z1-Kt.z0,e.ceiling,[p*(7+Kt.depth/2),Kt.h+.05,0]);Ps(t,e,a,s-.2,r+.2,l,1),Ps(t,e,o,s-.2,-1.3,l,-1),Ps(t,e,o,1.3,r+.2,l,-1),Ps(t,e,o,-1.3,1.3,l-2.5,-1,2.5,!1);for(let p of[-1,1]){let m=p*7,S=-p;$o(t,e,m,a,Kt.z0,l,S),$o(t,e,m,Kt.z1,o,l,S),$o(t,e,m,Kt.z0,Kt.z1,l-Kt.h,S,Kt.h,!1);let T=p*(7+Kt.depth);$o(t,e,T,Kt.z0-.2,Kt.z1+.2,Kt.h,-p);let y=Math.min(m,T),E=Math.max(m,T);Ps(t,e,Kt.z0,y,E,Kt.h,1),Ps(t,e,Kt.z1,y,E,Kt.h,-1);for(let v of[Kt.z0+.15,Kt.z1-.15])t.box(.5,Kt.h,.3,e.paintGrey,[m,Kt.h/2,v]),t.collideBox(m-.25,m+.25,v-.15,v+.15);t.box(.5,.3,Kt.z1-Kt.z0,e.paintGrey,[m,Kt.h-.15,0]);for(let v of[-1.6,0,1.6])for(let A of[1.5,3.5])Bc(t,e,p*(7+A),Kt.h,v,1.3,!1)}for(let p of[-4.8,-1.6,1.6,4.8])for(let m of[-5.4,-2.9,-.4,2.1,4.6,7.1])Bc(t,e,p,l,m,1.3,!1);t.cyl(.28,.28,o-a,e.steelDark,[5.9,3.9,(a+o)/2],[Math.PI/2,0,0],24);for(let p=a+.6;p<o;p+=1.5)t.cyl(.3,.3,.04,e.steel,[5.9,3.9,p],[Math.PI/2,0,0],24),t.cyl(.008,.008,.25,e.steel,[5.9,4.29,p],[0,0,0],6);for(let p of[-4,.5,5])t.box(.3,.2,.3,e.steelDark,[5.9,3.55,p]),t.box(.36,.02,.36,e.perf,[5.9,3.44,p]);t.box(.6,.35,o-a,e.steelDark,[-5.9,4.15,(a+o)/2]);for(let p=a+.5;p<o;p+=1.2)t.box(.64,.39,.03,e.steel,[-5.9,4.15,p]);let c=3.3,h=a+.35;for(let p of[-.15,.15])t.box(r-s,.06,.012,e.steel,[0,c,h+p]);for(let p=s+.15;p<r;p+=.3)t.box(.03,.012,.3,e.steel,[p,c-.02,h]);for(let p=s+1;p<r;p+=2.5)t.cyl(.006,.006,l-c,e.steel,[p,(l+c)/2,h],[0,0,0],6);let f=[[e.cableBlue,-.08],[e.rubber,-.03],[e.cableGrey,.03],[e.cableOrange,.08]];for(let[p,m]of f)t.cyl(.011,.011,r-s-.2,p,[0,c+0,h+m],[0,0,Math.PI/2],6);let u=o;t.box(2.7,.08,.16,e.alu,[0,2.54,u]);for(let p of[-1,1])t.box(.08,2.5,.16,e.alu,[p*1.31,1.25,u]);for(let p of[-1,1]){let m=p*.63;t.box(1.2,2.4,.012,e.glass,[m,1.22,u]),t.box(.06,2.42,.05,e.alu,[m-.6+.03,1.22,u]),t.box(.06,2.42,.05,e.alu,[m+.6-.03,1.22,u]),t.box(1.2,.06,.05,e.alu,[m,2.4,u]),t.box(1.2,.18,.05,e.alu,[m,.09,u]),t.cyl(.018,.018,1,e.steel,[m,1.05,u-.08],[0,0,Math.PI/2],10);for(let S of[-.45,.45])t.box(.03,.03,.06,e.steel,[m+S,1.05,u-.05])}t.collideBox(-1.35,1.35,u-.05,u+.1),t.box(4,.1,3,e.floor,[0,-.05,u+1.6]),t.box(4,.1,3,e.ceiling,[0,2.95,u+1.6]);for(let p of[-1,1])t.box(.1,3,3,e.wall,[p*2,1.5,u+1.6]);t.box(4,3,.1,e.wallAccent,[0,1.5,u+3.1]),Bc(t,e,0,2.9,u+1.6,1.3,!0),t.add(i.sign(2.2,.5,{bg:"#2c3e4c",lines:[{t:"APPLIED SENSING LAB",size:.34,color:"#f0f2f4",weight:700},{t:"Demonstration Hall \xB7 Open Day",size:.22,color:"#b9cad6",weight:500}]}),e.label,[0,1.75,u+3.04],[0,Math.PI,0]),t.box(.42,.18,.06,e.paintWhite,[0,2.8,u-.04]),t.add(i.sign(.38,.14,{bg:"#0d8a3c",lines:[{t:"EXIT  \u27F6",size:.62,color:"#ffffff",weight:800}]}),e.labelGlow,[0,2.8,u-.072],[0,Math.PI,0]),t.add(i.sign(4.2,.55,{bg:"#e9e7e1",lines:[{t:"APPLIED SENSING LAB  \xB7  DEMONSTRATION HALL",size:.42,color:"#2c3e4c",weight:700}]}),e.label,[0,3.35,u-.012],[0,Math.PI,0]),t.box(1.3,.95,.04,e.alu,[2.7,1.55,u-.03]),t.add(i.plane(1.24,.89,420,(p,m,S)=>t_(p,m,S)),e.label,[2.7,1.55,u-.052],[0,Math.PI,0]),t.box(.2,.06,.08,e.steelDark,[-2,1.15,u-.04]),t.cyl(.08,.08,.55,e.paintRed,[-2,.78,u-.14],[0,0,0],18),t.add(new Ue(.08,18,8,0,Math.PI*2,0,Math.PI/2),e.paintRed,[-2,1.055,u-.14]),t.box(.05,.08,.05,e.anodBlack,[-2,1.16,u-.14]),t.add(Ve([[-2,1.17,-.17+u],[-1.93,1.1,-.24+u],[-1.91,.85,-.22+u]],.008,12,6),e.rubber),t.add(i.sign(.2,.2,{bg:"#c0281f",lines:[{t:"FIRE",size:.3,color:"#fff",weight:800},{t:"EXT.",size:.3,color:"#fff",weight:800}]}),e.label,[-2,1.45,u-.012],[0,Math.PI,0]),t.collideCircle(-2,u-.14,.12),t.box(2,.05,.42,e.laminate,[-4.6,.45,u-.35]);for(let p of[-.85,.85])t.box(.05,.43,.38,e.anodBlack,[-4.6+p,.215,u-.35]);t.collideBox(-5.65,-3.55,u-.6,u),t.box(3.5,2,.08,e.anodBlack,[0,2.45,a+.04]),n.screen("datawall",3.36,1.89,1024,576,[0,2.45,a+.085],[0,0,0]),t.add(i.sign(1.6,.16,{bg:"#2b2e33",lines:[{t:"ORBIS-7 \xB7 LIVE ACQUISITION FEED",size:.5,color:"#e0e6ea",weight:600}]}),e.label,[0,1.33,a+.081]);for(let[p,m]of[-6.55,-5.9].entries()){let S=a+.55;t.box(.6,2,.9,e.paintDark,[m,1,S]),t.box(.56,1.8,.02,e.perf,[m,1.02,S+.455]),t.box(.02,.3,.03,e.steel,[m+.24,1.1,S+.48]);for(let T=0;T<7;T++)t.box(.52,.004,.004,e.steelDark,[m,.25+T*.25,S+.468]);t.add(i.sign(.22,.07,{bg:"#f2f2ee",lines:[{t:`RACK R${p+1}`,size:.55,weight:700}]}),e.label,[m,1.85,S+.468]);for(let T=0;T<6;T++)t.box(.012,.012,.004,T%3===2?e.ledAmber:e.ledGreen,[m-.2+T*.02,1.7,S+.468]);t.collideBox(m-.32,m+.32,a,S+.48)}for(let[p,m]of[e.cableBlue,e.rubber,e.cableGrey].entries())t.add(Ve([[-6.2+p*.05,c,h],[-6.2+p*.05,2.6,h+.05],[-6.2+p*.05,2.02,h+.1]],.011,12,6),m);let d=5.1,g=a+.4;t.box(3.4,.86,.62,e.paintWhite,[d,.45,g]),t.box(3.44,.04,.68,e.worktop,[d,.9,g+.02]),t.box(3.36,.1,.02,e.skirting,[d,.05,g+.31]);for(let p=0;p<4;p++)t.box(.82,.74,.012,e.paintWhite,[d-1.26+p*.84,.48,g+.312]),t.box(.14,.02,.02,e.steel,[d-1.26+p*.84,.8,g+.33]);t.collideBox(d-1.75,d+1.75,a,g+.4),t.box(.36,.2,.26,e.plasticLight,[4,1.02,g]),t.box(.2,.13,.005,e.screenOff,[3.93,1.03,g+.13]),t.add(i.plane(.19,.12,900,(p,m,S)=>e_(p,m,S)),e.labelGlow,[3.93,1.03,g+.134]);for(let p=0;p<6;p++)t.cyl(.01,.01,.02,e.plastic,[4.08+p%2*.05,1.07-(p/2|0)*.04,g+.135],[Math.PI/2,0,0],10);for(let[p,m]of[5,5.5].entries())t.box(.42,.14,.32,p?e.paintDark:e.paintBlue,[m,.99,g]),t.box(.12,.02,.03,e.steel,[m,1.02,g+.17]);t.add(i.sign(.3,.06,{bg:"#f7d64a",lines:[{t:"SPARE LENS UNITS",size:.5,weight:700}]}),e.label,[5,.99,g+.161]);for(let p=0;p<5;p++)t.box(.16,.1,.24,[e.paintBlue,e.paintYellow,e.paintBlue,e.paintRed,e.paintBlue][p],[6.05+p%3*.18-.18,.97+(p/3|0)*.105,g]);let M=(p,m,S,T,y,E)=>{t.box(.04,1.1,.8,e.alu,[p,1.75,m],[0,S,0]);let v=Math.sign(-p)*.022;t.add(i.plane(.76,1.06,500,(A,x,w)=>n_(A,x,w,T,y,E)),e.label,[p+v,1.75,m],[0,S+Math.PI/2*Math.sign(-p),0])};M(-6.98,5.6,0,"PERCEPTION",["Can a machine tell a cube","from a cylinder under","changing light?","","Bench A runs repeatable","trials with a calibrated","camera, turntable and","reference targets."],"#2d5f8c"),M(6.98,5.6,0,"MOTION",["Precise movement starts","with careful testing.","","Rig B moves a 3-joint arm","along a linear track while","encoders log every","millimetre.","","Operators only beyond","the yellow line."],"#d7642a"),M(-6.98,-5.2,0,"IMAGING",["ORBIS-7 surrounds a single","sample with eight lens","and sensor modules plus","four arch-mounted views.","","Each frame is captured","from 13 angles at once."],"#2f7f7a"),t.box(.06,.4,.34,e.paintWhite,[6.97,1.45,-5.2]),t.add(i.sign(.32,.38,{bg:"#ffffff",lines:[{t:"\u271A",size:.5,color:"#1d8a3c",weight:800},{t:"FIRST AID",size:.16,color:"#1d8a3c",weight:800}]}),e.label,[6.938,1.45,-5.2],[0,-Math.PI/2,0]),t.add(Tn(1.78,1.9,.004,96),e.hazard,[Te.x,0,Te.z]),t.add(Tn(2.6,2.66,.004,96),e.floorPaintW,[Te.x,0,Te.z]);for(let p of[-1,1])t.box(.06,.004,5.2,e.floorPaintY,[p*1.4,.002,5.6]);t.add(i.sign(2.6,.5,{bg:"rgba(0,0,0,0)",lines:[{t:"\u25C4 PERCEPTION      MOTION \u25BA",size:.5,color:"#e3e3dc",weight:800}]}),e.labelCut,[0,.005,4.6],[-Math.PI/2,0,0]),t.add(i.sign(1.2,.36,{bg:"rgba(0,0,0,0)",lines:[{t:"EXIT \u25B2",size:.6,color:"#e3e3dc",weight:800}]}),e.labelCut,[0,.005,3.4],[-Math.PI/2,0,Math.PI]);for(let p of[-1,1])t.box(.06,.004,2.6,e.floorPaintY,[p*6.2,.002,0]),t.box(1.4,.004,.06,e.floorPaintY,[p*5.5,.002,-1.3]),t.box(1.4,.004,.06,e.floorPaintY,[p*5.5,.002,1.3]);t.add(i.sign(3,.42,{bg:"#2d5f8c",lines:[{t:"PERCEPTION TESTING  \xB7  BENCH A",size:.42,color:"#ffffff",weight:700}]}),e.label,[-6.985,3.8,0],[0,Math.PI/2,0]),t.add(i.sign(3,.42,{bg:"#c75a24",lines:[{t:"MOTION TESTING  \xB7  RIG B",size:.42,color:"#ffffff",weight:700}]}),e.label,[6.985,3.8,0],[0,-Math.PI/2,0])}function t_(n,t,e){n.fillStyle="#f4f3ee",n.fillRect(0,0,t,e),n.fillStyle="#2c3e4c",n.fillRect(0,0,t,e*.13),n.fillStyle="#fff",n.font=`700 ${e*.07}px Segoe UI, Arial`,n.textBaseline="middle",n.fillText("HALL PLAN \xB7 VISITOR ROUTE",t*.04,e*.065);let i=Math.min(t/26,e*.8/17),s=t/2,r=e*.14+7.2*i,a=l=>s+l*i,o=l=>r+l*i;n.strokeStyle="#2c3e4c",n.lineWidth=3,n.fillStyle="#e2e4e2",n.beginPath(),n.moveTo(a(-7),o(-7)),n.lineTo(a(7),o(-7)),n.lineTo(a(7),o(-3.4)),n.lineTo(a(12),o(-3.4)),n.lineTo(a(12),o(3.4)),n.lineTo(a(7),o(3.4)),n.lineTo(a(7),o(8.5)),n.lineTo(a(-7),o(8.5)),n.lineTo(a(-7),o(3.4)),n.lineTo(a(-12),o(3.4)),n.lineTo(a(-12),o(-3.4)),n.lineTo(a(-7),o(-3.4)),n.closePath(),n.fill(),n.stroke(),n.fillStyle="#2f7f7a",n.beginPath(),n.arc(a(0),o(-.6),1.6*i,0,Math.PI*2),n.fill(),n.fillStyle="#2d5f8c",n.fillRect(a(-12),o(-2.4),.9*i,4.8*i),n.fillStyle="#d7642a",n.fillRect(a(9.6),o(-1.5),2.3*i,3.3*i),n.strokeStyle="#c0281f",n.setLineDash([6,5]),n.lineWidth=3,n.beginPath(),n.moveTo(a(0),o(7.6)),n.lineTo(a(0),o(2.6)),n.arc(a(0),o(-.6),3.2*i,Math.PI/2,Math.PI*2.5),n.stroke(),n.beginPath(),n.moveTo(a(-3.2),o(-.6)),n.lineTo(a(-10),o(0)),n.moveTo(a(3.2),o(-.6)),n.lineTo(a(8.6),o(0)),n.stroke(),n.setLineDash([]),n.fillStyle="#1b1f24",n.font=`600 ${e*.045}px Segoe UI, Arial`,n.textAlign="center",n.fillText("ORBIS-7",a(0),o(-.6)+.1*i),n.fillText("BENCH A",a(-9.5),o(4.6)),n.fillText("RIG B",a(9.5),o(4.6)),n.fillStyle="#c0281f",n.beginPath(),n.arc(a(0),o(7.4),.45*i,0,Math.PI*2),n.fill(),n.fillStyle="#1b1f24",n.fillText("YOU ARE HERE",a(0),o(8.5)+e*.05)}function e_(n,t,e){n.fillStyle="#04140c",n.fillRect(0,0,t,e),n.strokeStyle="rgba(80,140,100,0.5)",n.lineWidth=1;for(let i=1;i<10;i++)n.beginPath(),n.moveTo(t*i/10,0),n.lineTo(t*i/10,e),n.stroke();for(let i=1;i<8;i++)n.beginPath(),n.moveTo(0,e*i/8),n.lineTo(t,e*i/8),n.stroke();n.strokeStyle="#ffe14a",n.lineWidth=2,n.beginPath();for(let i=0;i<t;i++){let s=e*.35+Math.sin(i*.12)*e*.12;i?n.lineTo(i,s):n.moveTo(i,s)}n.stroke(),n.strokeStyle="#4ad8ff",n.beginPath();for(let i=0;i<t;i++){let s=e*.72+(i%40<20?-1:1)*e*.08;i?n.lineTo(i,s):n.moveTo(i,s)}n.stroke()}function n_(n,t,e,i,s,r){n.fillStyle="#f5f4ef",n.fillRect(0,0,t,e),n.fillStyle=r,n.fillRect(0,0,t,e*.16),n.fillStyle="#fff",n.font=`700 ${e*.065}px Segoe UI, Arial`,n.textBaseline="middle",n.fillText(i,t*.08,e*.085),n.fillStyle="#2b2f35",n.font=`500 ${e*.036}px Segoe UI, Arial`,s.forEach((a,o)=>n.fillText(a,t*.08,e*.23+o*e*.052)),n.strokeStyle=r,n.lineWidth=4,n.beginPath(),n.arc(t*.75,e*.86,e*.07,0,Math.PI*2),n.stroke(),n.beginPath(),n.moveTo(t*.1,e*.93),n.lineTo(t*.55,e*.93),n.stroke()}var jx,Kt,Te,yi,Oc=ln(()=>{bn();Is();jx={x0:-7,x1:7,z0:-7,z1:8.5,h:4.4},Kt={z0:-3.4,z1:3.4,depth:5,h:3.3},Te={x:0,z:-.6},yi=.2});function df(n){let{b:t,M:e,A:i}=n,s=new $e({color:12581119,emissive:5823743,emissiveIntensity:1.6,roughness:.15,metalness:0});s.userData.cast=!1;let r=1.08,a=1.25;t.push([Te.x,0,Te.z]),t.collideCircle(Te.x,Te.z,1.5),t.cyl(1.45,1.45,.12,e.paintDark,[0,.06,0],[0,0,0],72),t.add(Tn(1.45,1.475,.125,96),e.steel,[0,0,0]),t.cyl(1.42,1.42,.006,e.rubber,[0,.123,0],[0,0,0],72),t.add(Tn(1.476,1.49,.012,96),e.ledCyan,[0,.02,0]),t.add(i.cylBand(1.477,.07,-.42,.84,420,(h,f,u)=>{h.fillStyle="#2b2e33",h.fillRect(0,0,f,u),h.font=`700 ${u*.6}px Segoe UI, Arial`,h.fillStyle="#e6eaee",h.textAlign="center",h.textBaseline="middle",h.fillText("ORBIS-7   \xB7   MULTI-VIEW SAMPLE IMAGER",f/2,u*.55)},32),e.label,[0,.075,0]),t.cyl(.55,.58,.5,e.paintWhite,[0,.375,0],[0,0,0],48);for(let h of[.24,.5])t.cyl(.556,.556,.012,e.paintGrey,[0,h,0],[0,0,0],48);t.cyl(.57,.57,.035,e.steel,[0,.64,0],[0,0,0],48),t.add(i.cylBand(.553,.1,-.55,1.1,600,(h,f,u)=>{h.fillStyle="#2d5f8c",h.fillRect(0,0,f,u),h.font=`700 ${u*.46}px Segoe UI, Arial`,h.fillStyle="#fff",h.textAlign="center",h.textBaseline="middle",h.fillText("ORBIS-7  \xB7  UNIT 02",f/2,u*.52)},24),e.label,[0,.37,0]);for(let h=0;h<4;h++){let f=(h*90+45)*En;t.push([0,0,0],[0,f,0]),t.box(.26,.2,.02,e.perf,[0,.37,.55]);for(let[u,d]of[[-.12,.09],[.12,.09],[-.12,-.09],[.12,-.09]])t.cyl(.006,.006,.008,e.chrome,[u,.37+d,.562],[Math.PI/2,0,0],8);t.pop()}t.box(.16,.06,.01,e.screenOff,[0,.56,.548]),t.add(i.sign(.15,.05,{bg:"#06120c",lines:[{t:"READY  13/13 CH",size:.42,color:"#5dffa0",weight:600,font:"Consolas, monospace"}]}),e.labelGlow,[0,.56,.554]),t.cyl(.13,.13,.32,e.steel,[0,.8,0],[0,0,0],32);for(let h=0;h<5;h++)t.add(new hn(.135,.014,8,32),e.rubber,[0,.68+h*.026,0],[Math.PI/2,0,0]);t.box(.36,.04,.36,e.anodBlack,[0,.98,0]),t.box(.3,.03,.3,e.steelDark,[0,1.015,0],[0,.02,0]);for(let h of[[.21,0,0,Math.PI/2],[0,.21,Math.PI/2,0]])t.cyl(.008,.008,.07,e.chrome,[h[0]*.9,1,h[1]*.9],[h[2],0,h[3]],10),t.cyl(.02,.02,.035,e.anodBlack,[h[0]*1.15,1,h[1]*1.15],[h[2],0,h[3]],16);t.cyl(.13,.13,.02,e.steel,[0,1.04,0],[0,0,0],40),t.cyl(.09,.09,.004,e.ledWhite,[0,1.051,0],[0,0,0],40),t.add(Tn(.115,.122,.006,48),e.chrome,[0,1.05,0]);for(let h=0;h<3;h++){let f=h*120*En;t.cyl(.003,.003,.04,e.chrome,[Math.sin(f)*.035,1.07,Math.cos(f)*.035],[Math.cos(f)*.3,0,-Math.sin(f)*.3],6)}t.add(new mr(.03,0),s,[0,r,0],[0,.4,0],{scale:[1,1.5,1]}),t.add(new Ue(.11,32,12,0,Math.PI*2,0,Math.PI/2),e.glass,[0,1.05,0]),t.add(Tn(.108,.125,.012,48),e.steel,[0,1.048,0]);for(let h of[45*En,135*En]){t.push([0,0,0],[0,h,0]),t.add(new hn(a,.04,10,64,Math.PI),e.steel,[0,r+.04,0]);for(let f of[-1,1]){let u=f*a;t.cyl(.04,.04,r+.04-.12,e.steel,[u,(r+.04+.12)/2,0],[0,0,0],16),t.box(.18,.02,.18,e.steelDark,[u,.13,0]);for(let[m,S]of[[-.065,-.065],[.065,-.065],[-.065,.065],[.065,.065]])t.cyl(.01,.01,.012,e.chrome,[u+m,.145,S],[0,0,0],6);t.cyl(.055,.055,.1,e.anodBlack,[u,r+.04,0],[0,0,0],16),t.cyl(.05,.05,.06,e.anodBlack,[u,.2,0],[0,0,0],16);for(let m of[.42,.78])t.box(.1,.025,.11,e.anodBlack,[u,m,0]);t.push([f*1.37,.125,0],[0,f>0?-Math.PI/2:Math.PI/2,0]),t.box(.16,.1,.09,e.paintGrey,[0,.05,0]),t.box(.012,.012,.004,e.ledGreen,[.05,.08,.047]),t.cyl(.012,.012,.02,e.anodBlack,[-.04,.05,-.05],[Math.PI/2,0,0],8),t.cyl(.012,.012,.02,e.anodBlack,[.04,.05,-.05],[Math.PI/2,0,0],8),t.pop();let d=52*En,g=a-.1,M=[f*g*Math.cos(d),r+.04+g*Math.sin(d),0];t.push([f*a*Math.cos(d),r+.04+a*Math.sin(d),0],[0,0,f*d]),t.add(new hn(.052,.014,6,16),e.anodBlack,[0,0,0],[Math.PI/2,0,0]),t.pop(),t.pushLook(M,[0,r,0]),t.cyl(.05,.05,.15,e.paintWhite,[0,0,0],[Math.PI/2,0,0],20),t.cyl(.052,.052,.02,e.paintTeal,[0,0,.04],[Math.PI/2,0,0],20),t.cyl(.036,.036,.06,e.anodBlack,[0,0,-.1],[Math.PI/2,0,0],20),t.cyl(.04,.04,.012,e.chrome,[0,0,-.13],[Math.PI/2,0,0],20),t.add(new Ue(.05,18,6,0,Math.PI*2,0,.62),e.lensCoat,[0,0,-.136+.05*Math.cos(.62)],[-Math.PI/2,0,0]),t.cyl(.04,.04,.012,e.anodBlack,[0,0,.081],[Math.PI/2,0,0],16),t.box(.01,.01,.01,e.ledGreen,[0,.05,.05]),t.pop();let p=[];for(let m=0;m<=8;m++){let S=d-d*m/8,T=a+.055;p.push([f*T*Math.cos(S),r+.04+T*Math.sin(S),.03])}p.unshift([f*(g+.02)*Math.cos(d)+f*.02,r+.04+(g+.12)*Math.sin(d),.02]),p.push([f*(a+.055),.6,.03],[f*(a+.06),.2,.03],[f*1.37,.16,.06]),t.add(Ve(p,.009,60,6),e.cableGrey)}t.pop()}let o=r+.04+a;t.box(.12,.08,.12,e.anodBlack,[0,o-.06,0],[0,45*En,0]),t.cyl(.14,.14,.14,e.paintWhite,[0,o-.17,0],[0,0,0],32),t.cyl(.145,.145,.025,e.paintTeal,[0,o-.13,0],[0,0,0],32),t.cyl(.15,.15,.02,e.anodBlack,[0,o-.25,0],[0,0,0],32),t.add(Tn(.08,.135,.004,40),e.ledWhite,[0,o-.264,0],[Math.PI,0,0]),t.cyl(.05,.05,.05,e.anodBlack,[0,o-.28,0],[0,0,0],20),t.add(new Ue(.06,18,6,0,Math.PI*2,0,.6),e.lensCoat,[0,o-.305+.06*Math.cos(.6),0],[Math.PI,0,0]),t.add(i.cylBand(.142,.06,-.6,1.2,900,(h,f,u)=>{h.fillStyle="#e8e8e3",h.fillRect(0,0,f,u),h.font=`700 ${u*.6}px Segoe UI, Arial`,h.fillStyle="#2b2e33",h.textAlign="center",h.textBaseline="middle",h.fillText("T0",f/2,u*.55)},12),e.label,[0,o-.2,0]),t.box(.012,.012,.012,e.ledGreen,[0,o-.15,.142]);let l=1;t.add(Tn(1.06,1.19,.1,96),e.steel,[0,l,0]),t.add(Tn(1.19,1.205,.06,96),e.paintBlue,[0,l+.02,0]);for(let h=0;h<4;h++){let f=(45+h*90)*En;t.push([0,0,0],[0,f,0]),t.box(.1,.08,.12,e.anodBlack,[0,l+.05,1.2]),t.pop()}for(let h=0;h<8;h++){let f=(22.5+45*h)*En,u=1.13,d=h%2===0,g=[u*Math.sin(f),l+.1,u*Math.cos(f)];if(t.pushLook(g,[0,r-.08,0]),t.box(.14,.025,.12,e.anodBlack,[0,.0125,0]),d){t.box(.13,.12,.19,e.paintWhite,[0,.085,.01]),t.box(.134,.03,.12,e.paintBlue,[0,.085,.03]),t.box(.12,.11,.02,e.anodBlack,[0,.085,.115]);for(let S=0;S<6;S++)t.box(.005,.03,.15,e.alu,[-.05+S*.02,.16,.02]);t.cyl(.045,.045,.1,e.anodBlack,[0,.085,-.13],[Math.PI/2,0,0],24),t.cyl(.05,.05,.035,e.rubber,[0,.085,-.115],[Math.PI/2,0,0],24),t.cyl(.05,.05,.012,e.chrome,[0,.085,-.186],[Math.PI/2,0,0],24),t.add(new Ue(.07,20,6,0,Math.PI*2,0,.58),e.lensCoat,[0,.085,-.192+.07*Math.cos(.58)],[-Math.PI/2,0,0]),t.add(i.sign(.05,.03,{bg:"#2b2e33",lines:[{t:`L${h/2+1}`,size:.7,color:"#fff",weight:700}]}),e.label,[.0671,.085,.06],[0,Math.PI/2,0]),t.add(i.sign(.05,.03,{bg:"#2b2e33",lines:[{t:`L${h/2+1}`,size:.7,color:"#fff",weight:700}]}),e.label,[-.0671,.085,.06],[0,-Math.PI/2,0])}else{t.cyl(.065,.065,.2,e.paintDark,[0,.085,0],[Math.PI/2,0,0],24),t.cyl(.068,.068,.03,e.paintOrange,[0,.085,.05],[Math.PI/2,0,0],24),t.box(.12,.12,.014,e.paintOrange,[0,.085,-.1]),t.box(.07,.07,.006,e.lens,[0,.085,-.109]);for(let[S,T]of[[-.045,-.045],[.045,-.045],[-.045,.045],[.045,.045]])t.cyl(.006,.006,.006,e.ledRed,[S,.085+T,-.108],[Math.PI/2,0,0],8);t.cyl(.05,.05,.01,e.perf,[0,.085,.102],[Math.PI/2,0,0],20),t.add(i.sign(.05,.03,{bg:"#e8e8e3",lines:[{t:`S${(h+1)/2}`,size:.7,color:"#1b1f24",weight:700}]}),e.label,[.0661,.085,-.02],[0,Math.PI/2,0]),t.add(i.sign(.05,.03,{bg:"#e8e8e3",lines:[{t:`S${(h+1)/2}`,size:.7,color:"#1b1f24",weight:700}]}),e.label,[-.0661,.085,-.02],[0,-Math.PI/2,0])}t.box(.012,.012,.012,h===5?e.ledAmber:e.ledGreen,[.04,d?.15:.16,.09]),t.cyl(.016,.016,.03,e.anodBlack,[0,.06,.12],[Math.PI/2,0,0],10);let M=d?1:-1,p=1.25*Math.sin(22.5*En)*M,m=1.25*Math.cos(22.5*En)-u;t.add(Ve([[0,.06,.13],[0,.03,.2],[p*.5,-.04,m+.14],[p*.88,-.1,m+.075],[p*.93,-.35,m+.06],[p*.93,-.75,m+.06],[p*.95,-.94,m+.11],[p*.9,-.95,m+.2]],.01,50,6),d?e.cableBlue:e.rubber),t.pop()}t.add(new hn(1.33,.018,8,96),e.rubber,[0,.14,0],[Math.PI/2,0,0]);for(let h=0;h<16;h++){let f=h*22.5*En;t.box(.03,.03,.05,e.anodBlack,[Math.sin(f)*1.33,.14,Math.cos(f)*1.33],[0,f,0])}t.add(Ve([[0,.14,-1.33],[0,.13,-1.47],[0,.06,-1.52],[0,.02,-1.62]],.03,16,10),e.rubber),t.pop();let c=(h,f,u,d)=>{let g=Math.hypot(u-h,d-f),M=Math.atan2(u-h,d-f);t.push([(h+u)/2,0,(f+d)/2],[0,M,0]);let p=new ci;p.moveTo(-.16,0),p.lineTo(-.07,.03),p.lineTo(.07,.03),p.lineTo(.16,0),p.closePath();let m=new Di(p,{depth:g,bevelEnabled:!1});t.add(m,e.paintDark,[0,0,-g/2]),t.box(.12,.004,g-.02,e.hazard,[0,.031,0]),t.pop()};c(Te.x,Te.z-1.62,Te.x,-6.45),c(Te.x-.12,-6.55,-5.75,-6.55),t.box(.36,.035,.36,e.paintDark,[0,.017,-6.55]),t.push([2.3,0,2.1],[0,-.4,0]),t.box(.08,.95,.08,e.steel,[0,.475,0]),t.box(.42,.02,.32,e.steelDark,[0,.01,0]),t.push([0,1,0],[.45,0,0]),t.box(.62,.03,.44,e.anodBlack,[0,0,0]),t.add(i.plane(.58,.4,700,(h,f,u)=>i_(h,f,u)),e.label,[0,.016,0],[-Math.PI/2,0,0]),t.pop(),t.pop(),t.collideCircle(2.3,2.1,.32)}function i_(n,t,e){n.fillStyle="#f5f4ef",n.fillRect(0,0,t,e),n.fillStyle="#2f7f7a",n.fillRect(0,0,t,e*.17),n.fillStyle="#fff",n.textBaseline="middle",n.font=`700 ${e*.09}px Segoe UI, Arial`,n.fillText("EXHIBIT 01 \xB7 ORBIS-7",t*.05,e*.09),n.fillStyle="#2b2f35",n.font=`500 ${e*.048}px Segoe UI, Arial`,["Multi-view sample imager. Thirteen synchronised","views capture one sample from every side in a","single 4 ms exposure.","","L1\u2013L4  telecentric lens units (blue cables)","S1\u2013S4  depth / IR sensor units (black cables)","T0 + A1\u2013A4  overhead and arch cameras"].forEach((a,o)=>n.fillText(a,t*.05,e*.25+o*e*.072));let i=t*.82,s=e*.72,r=e*.17;n.strokeStyle="#2d5f8c",n.lineWidth=3,n.beginPath(),n.arc(i,s,r,0,Math.PI*2),n.stroke();for(let a=0;a<8;a++){let o=(22.5+a*45)*Math.PI/180;n.fillStyle=a%2?"#d7642a":"#2d5f8c",n.fillRect(i+Math.sin(o)*r-5,s+Math.cos(o)*r-5,10,10)}n.fillStyle="#58b8d8",n.beginPath(),n.arc(i,s,6,0,Math.PI*2),n.fill()}var En,pf=ln(()=>{bn();Oc();Is();En=Math.PI/180});function gf(n){let{b:t,M:e,A:i}=n,s=-11.98,r=-11.13,a=-2.5,o=2.5,l=.92,c=(s+r)/2;t.box(r-s+.02,.04,o-a,e.worktop,[c,l-.02,0]),t.box(.03,.06,o-a,e.steelDark,[r-.03,l-.07,0]);for(let v of[a+.05,0,o-.05])for(let A of[s+.05,r-.06])t.box(.05,l-.04,.05,e.steelDark,[A,(l-.04)/2,v]);t.box(r-s-.1,.025,o-a-.1,e.paintGrey,[c,.24,0]);for(let v of[a+.05,0,o-.05])t.box(r-s-.1,.04,.03,e.steelDark,[c,.22,v]);t.box(.06,.1,o-a,e.paintWhite,[s+.03,l+.05,0]);for(let v=a+.3;v<o;v+=.45)t.box(.006,.05,.08,e.plasticLight,[s+.063,l+.05,v]),t.box(.004,.012,.012,v>0?e.ledRed:e.ledGreen,[s+.066,l+.085,v+.03]);t.collideBox(s-.05,r+.02,a-.02,o+.02),t.box(.9,.012,3.6,e.rubber,[-10.6,.006,-.2]);for(let v of[-1,1])t.box(.9,.014,.04,e.paintYellow,[-10.6,.007,-.2+v*1.78]);for(let v of[-2.3,-.8,.8,2.3])t.box(.02,1.1,.03,e.steel,[-11.99,1.75,v]);t.box(.32,.025,4.8,e.paintWhite,[-11.84,2.05,0]);for(let v of[-2.3,-.8,.8,2.3])t.box(.3,.04,.02,e.steel,[-11.85,2.02,v]);let h=[[-2.1,.3,.2,e.cardboard],[-1.75,.25,.16,e.paintBlue],[-1.45,.22,.12,e.cardboard],[1.3,.28,.18,e.paintDark],[1.65,.3,.24,e.cardboard],[2.05,.2,.14,e.paintBlue]];for(let[v,A,x,w]of h)t.box(.26,x,A,w,[-11.84,2.0625+x/2,v]);t.add(i.sign(.25,.05,{bg:"#f4f2ea",lines:[{t:"LENS KIT 2",size:.6,weight:700}]}),e.label,[-11.709,2.15,-1.75],[0,Math.PI/2,0]),t.add(i.sign(.3,.06,{bg:"#f4f2ea",lines:[{t:"SAMPLE SET B",size:.6,weight:700}]}),e.label,[-11.709,2.2,1.65],[0,Math.PI/2,0]),t.add(i.plane(.6,.84,500,(v,A,x)=>l_(v,A,x)),e.label,[-11.995,1.55,-.35],[0,Math.PI/2,0]);let f=1.15,u=-11.55;t.cyl(.24,.26,.05,e.anodBlack,[u,l+.025,f],[0,0,0],48),t.cyl(.22,.22,.015,e.calGrey,[u,l+.057,f],[0,0,0],48),t.add(i.plane(.44,.44,900,(v,A,x)=>r_(v,A,x)),e.labelCut,[u,l+.0655,f],[-Math.PI/2,0,0]);let d=l+.066;t.box(.08,.08,.08,e.paintRed,[u-.08,d+.04,f-.08],[0,.4,0]),t.add(new Ue(.05,28,16),e.paintBlue,[u+.09,d+.05,f-.06]),t.add(new rr(.05,.12,28),e.paintYellow,[u-.06,d+.06,f+.1]),t.cyl(.04,.04,.1,e.paintGreen,[u+.08,d+.05,f+.1],[0,0,0],28),t.add(new hn(.04,.015,12,28),e.paintOrange,[u+.01,d+.015,f+.01],[Math.PI/2,0,0]),t.box(.3,.02,.2,e.plasticLight,[-11.4,l+.01,2.2]),t.add(new pr(.04,0),e.paintWhite,[-11.47,l+.06,2.2]),t.add(new gr(.05,0),e.paintTeal,[-11.35,l+.05,2.22]),t.add(Ve([[u-.2,l+.02,f-.2],[-11.85,l+.01,f-.35],[-11.9,l+.01,.2],[-11.93,l+.04,-.2]],.006,20,6),e.rubber),t.box(.04,.8,.04,e.steelDark,[-11.88,l+.4,f]),t.box(.2,.012,.3,e.steelDark,[-11.85,l+.006,f]),t.box(.012,.6,.84,e.paintWhite,[-11.84,l+.47,f]),t.add(i.plane(.8,.56,900,(v,A,x)=>mf(v,A,x)),e.label,[-11.8335,l+.47,f],[0,Math.PI/2,0]);for(let v of[-1,1]){let A=f+v*.62,x=-11.32;t.cyl(.08,.09,.02,e.anodBlack,[x,l+.01,A],[0,0,0],20),t.cyl(.012,.012,.5,e.steel,[x,l+.26,A],[0,0,0],10),t.pushLook([x,l+.55,A],[u,l+.08,f]),t.box(.3,.22,.04,e.anodBlack,[0,0,0]),t.box(.27,.19,.004,e.lightPanel,[0,0,-.021]);for(let w=0;w<5;w++)t.box(.26,.004,.02,e.alu,[0,-.08+w*.04,.03]);t.cyl(.02,.02,.05,e.anodBlack,[.17,0,0],[0,0,Math.PI/2],10),t.pop(),t.add(Ve([[x,l+.45,A+.03],[x-.1,l+.2,A+.05],[x-.3,l+.01,A+.04],[-11.9,l+.01,A],[-11.93,l+.06,A-.05*v]],.005,24,6),e.rubber)}let g=-.45,M=-11.55;t.box(.06,.03,.7,e.alu,[M,l+.015,g]);for(let v of[g-.33,g+.33])t.box(.12,.02,.04,e.anodBlack,[M,l+.01,v]);t.box(.1,.03,.1,e.anodBlack,[M,l+.045,g+.1]),t.cyl(.015,.015,.03,e.chrome,[M+.06,l+.045,g+.1],[0,0,Math.PI/2],10),t.cyl(.018,.018,.22,e.steel,[M,l+.17,g+.1],[0,0,0],12),t.cyl(.035,.035,.04,e.anodBlack,[M,l+.3,g+.1],[0,0,0],16),t.pushLook([M,l+.37,g+.1],[u,l+.08,f]),t.box(.13,.03,.1,e.anodBlack,[0,-.06,0]),t.box(.1,.1,.12,e.paintDark,[0,0,0]),t.box(.104,.02,.124,e.paintTeal,[0,.03,0]);for(let v=0;v<4;v++)t.box(.106,.004,.08,e.alu,[0,-.035+v*.012,.01]);t.cyl(.04,.04,.012,e.anodBlack,[0,0,-.066],[Math.PI/2,0,0],24),t.cyl(.036,.036,.1,e.anodBlack,[0,0,-.12],[Math.PI/2,0,0],24),t.cyl(.039,.039,.02,e.rubber,[0,0,-.1],[Math.PI/2,0,0],24),t.cyl(.039,.039,.016,e.rubber,[0,0,-.145],[Math.PI/2,0,0],24),t.cyl(.044,.038,.04,e.anodBlack,[0,0,-.185],[Math.PI/2,0,0],24),t.add(new Ue(.05,18,6,0,Math.PI*2,0,.6),e.lensCoat,[0,0,-.172+.05*Math.cos(.6)],[-Math.PI/2,0,0]),t.box(.012,.012,.004,e.ledGreen,[.03,.03,.062]),t.box(.012,.012,.004,e.ledBlue,[.01,.03,.062]),t.cyl(.012,.012,.03,e.cableOrange,[-.02,-.02,.075],[Math.PI/2,0,0],10),t.add(i.sign(.08,.025,{bg:"#2b2e33",lines:[{t:"CAM-A1",size:.6,color:"#fff",weight:700}]}),e.label,[.0505,0,0],[0,Math.PI/2,0]),t.box(.18,.035,.035,e.paintDark,[0,.085,-.02]),t.box(.02,.03,.02,e.anodBlack,[0,.06,-.02]);for(let v of[-.065,.065])t.cyl(.01,.01,.006,e.lens,[v,.085,-.04],[Math.PI/2,0,0],12);t.cyl(.006,.006,.006,e.ledRed,[.02,.085,-.04],[Math.PI/2,0,0],8),t.pop(),t.add(Ve([[M-.02,l+.35,g+.18],[M-.04,l+.25,g+.3],[M-.25,l+.01,g+.25],[-11.92,l+.01,g],[-11.94,l+.01,-1.3],[-11.94,l-.1,-1.6],[-11.9,.45,-1.7]],.007,40,6),e.cableOrange);let p=(v,A,x)=>{t.box(.08,.02,.08,e.anodBlack,[-11.9,l+.01,v]),t.cyl(.018,.018,.42,e.steel,[-11.9,l+.22,v],[0,0,0],12),t.box(.2,.025,.04,e.steel,[-11.82,l+.42,v],[0,0,0]),t.push([-11.68,l+.4,v],[0,Math.PI/2+A,0]),t.box(.62,.38,.03,e.anodBlack,[0,0,0]),t.box(.2,.15,.04,e.plastic,[0,0,-.03]),t.box(.06,.008,.012,e.plastic,[.24,-.192,.012]),t.box(.006,.006,.004,e.ledWhite,[.27,-.19,.016]),n.screen(x,.594,.334,640,360,[0,.01,.0162],[0,0,0]),x==="pattern"&&t.add(i.sign(.07,.07,{bg:"#ffe66d",lines:[{t:"gain",size:.24,color:"#333",weight:500,font:"Segoe Print, cursive"},{t:"+2dB?",size:.24,color:"#333",weight:500,font:"Segoe Print, cursive"}]}),e.label,[-.275,.14,.0185],[0,0,.08]),t.pop()};p(-1.4,-.22,"pattern"),p(-2.08,-.5,"detect"),t.push([-11.42,l,-1.55],[0,Math.PI/2+.12,0]),t.box(.44,.02,.14,e.plastic,[0,.01,0],[.06,0,0]),t.add(i.plane(.42,.12,900,(v,A,x)=>a_(v,A,x)),e.label,[0,.0215,0],[-Math.PI/2+.06,0,0]),t.pop(),t.add(new Ue(.03,16,8),e.plastic,[-11.42,l+.005,-1.18],[0,0,0],{scale:[1,.5,1.6]}),t.box(.2,.004,.24,e.rubber,[-11.42,l+.002,-1.18]),t.push([-11.4,l,-.95],[0,.25,0]),t.box(.21,.012,.29,e.paper,[0,.006,0]),t.add(i.plane(.2,.28,900,(v,A,x)=>o_(v,A,x)),e.label,[0,.0125,0],[-Math.PI/2,0,0]),t.cyl(.004,.004,.15,e.paintBlue,[.06,.016,.02],[Math.PI/2,0,.3],6),t.pop(),t.cyl(.042,.038,.1,e.paintWhite,[-11.28,l+.05,-2.25],[0,0,0],20),t.add(new hn(.028,.008,8,16),e.paintWhite,[-11.24,l+.055,-2.25],[0,0,0]),t.box(.45,.45,.2,e.paintDark,[-11.6,.475,-1.9]),t.box(.01,.4,.15,e.perf,[-11.372,.48,-1.9]),t.box(.004,.012,.012,e.ledBlue,[-11.365,.66,-1.85]),t.box(.4,.2,.15,e.plastic,[-11.6,.36,-1.45]),t.add(Ve([[-11.6,.6,-1.8],[-11.75,.7,-1.75],[-11.93,.85,-1.6],[-11.93,.93,-1.5]],.008,16,6),e.rubber),t.box(.12,.02,4.6,e.perf,[-11.88,.78,0]),t.box(.01,.06,4.6,e.perf,[-11.82,.8,0]);for(let[v,A]of[e.rubber,e.cableGrey,e.cableOrange].entries())t.cyl(.008,.008,4.5,A,[-11.9+v*.02,.8,0],[Math.PI/2,0,0],6);let m=-10.75,S=-1.55;for(let v=0;v<5;v++){let A=v*72*s_;t.box(.03,.025,.3,e.anodBlack,[m+Math.sin(A)*.15,.06,S+Math.cos(A)*.15],[0,A,0]),t.add(new Ue(.025,10,6),e.plastic,[m+Math.sin(A)*.29,.025,S+Math.cos(A)*.29])}t.cyl(.025,.03,.45,e.chrome,[m,.3,S],[0,0,0],12),t.add(new hn(.17,.008,6,24),e.chrome,[m,.3,S],[Math.PI/2,0,0]),t.cyl(.19,.18,.07,e.rubber,[m,.57,S],[0,0,0],28),t.collideCircle(m,S,.28);let T=-10.4;for(let v of[T-.85,T+.85])for(let A of[-3.36,-2.98])t.box(.035,1.9,.035,e.steelDark,[v,.95,A]);for(let v of[.15,.6,1.05,1.5,1.88])t.box(1.74,.02,.42,e.steel,[T,v,-3.17]);let y=[e.paintBlue,e.paintBlue,e.paintYellow,e.paintBlue,e.paintRed,e.paintBlue,e.paintGreen],E=0;for(let v of[.16,.61,1.06,1.51])for(let A=0;A<4;A++){if(E*7%5===3){E++;continue}let x=y[E++%y.length],w=T-.63+A*.42;t.box(.34,.16,.36,x,[w,v+.09,-3.15]),t.box(.2,.05,.006,e.paper,[w,v+.11,-2.968])}t.add(i.sign(.8,.12,{bg:"#2d5f8c",lines:[{t:"REFERENCE SAMPLES",size:.5,color:"#fff",weight:700}]}),e.label,[T,2.02,-3.38]),t.collideBox(T-.9,T+.9,-3.4,-2.92),t.box(2,1.1,.03,e.alu,[-9.9,1.55,3.385]),t.add(i.plane(1.94,1.04,520,(v,A,x)=>c_(v,A,x)),e.label,[-9.9,1.55,3.368],[0,Math.PI,0]),t.box(1.6,.03,.06,e.alu,[-9.9,.985,3.36]);for(let[v,A]of[e.paintBlue,e.paintRed,e.paintGreen].entries())t.cyl(.008,.008,.12,A,[-10.3+v*.05,1.01,3.355],[0,0,Math.PI/2],8);t.box(.6,.02,.45,e.steel,[-8.2,.8,2.85]),t.box(.6,.02,.45,e.steel,[-8.2,.3,2.85]);for(let[v,A]of[[-8.48,2.65],[-7.92,2.65],[-8.48,3.05],[-7.92,3.05]])t.box(.025,.78,.025,e.steel,[v,.46,A]),t.cyl(.035,.035,.03,e.rubber,[v,.035,A],[0,0,Math.PI/2],12);t.box(.4,.3,.012,e.paintWhite,[-8.2,.96,2.95],[-.15,0,0]),t.add(i.plane(.38,.28,900,(v,A,x)=>mf(v,A,x)),e.label,[-8.2,.96,2.9435],[-.15,Math.PI,0]),t.box(.3,.1,.25,e.paintDark,[-8.3,.36,2.85]),t.collideBox(-8.55,-7.85,2.6,3.4)}function mf(n,t,e){n.fillStyle="#f4f4f0",n.fillRect(0,0,t,e);let i=e/9,s=t*.04,r=e*.06;for(let f=0;f<7;f++)for(let u=0;u<9;u++)(u+f)%2&&(n.fillStyle="#111",n.fillRect(s+u*i,r+f*i,i,i));let a=s+9*i+t*.03,o=t-a-t*.03,l=["#7a4f3a","#c49a86","#5f7ba0","#5c6d3e","#8577b0","#62bcae","#d6853a","#4b5aa8","#c25563","#5a3a6a","#9cbc4a","#e0a83a","#30408f","#4c9a50","#b03a3a","#e6c84a","#b85a9a","#2c88a8"],c=o/3,h=e*.62/6;l.forEach((f,u)=>{n.fillStyle=f,n.fillRect(a+u%3*c+2,r+(u/3|0)*h+2,c-4,h-4)});for(let f=0;f<12;f++){let u=Math.round(f/11*245+5);n.fillStyle=`rgb(${u},${u},${u})`,n.fillRect(s+f*(t-2*s)/12,e*.84,(t-2*s)/12+1,e*.1)}for(let[f,u]of[[a+2,e*.7],[a+o-e*.11,e*.7]])n.fillStyle="#111",n.fillRect(f,u,e*.11,e*.11),n.fillStyle="#fff",n.fillRect(f+e*.022,u+e*.022,e*.022,e*.044),n.fillRect(f+e*.066,u+e*.044,e*.022,e*.044);n.fillStyle="#333",n.font=`600 ${e*.035}px Consolas, monospace`,n.fillText("ASL-CAL 9x7 / 25mm",s,e*.82)}function r_(n,t,e){let i=t/2,s=e/2,r=t*.48;n.strokeStyle="#f2f2ee",n.fillStyle="#f2f2ee",n.lineWidth=2,n.beginPath(),n.arc(i,s,r*.97,0,Math.PI*2),n.stroke();for(let a=0;a<72;a++){let o=a*5*Math.PI/180,l=a%6===0?.1:.05;n.lineWidth=a%6===0?3:1.5,n.beginPath(),n.moveTo(i+Math.cos(o)*r*.97,s+Math.sin(o)*r*.97),n.lineTo(i+Math.cos(o)*r*(.97-l),s+Math.sin(o)*r*(.97-l)),n.stroke()}n.lineWidth=1.5,n.beginPath(),n.moveTo(i-r*.2,s),n.lineTo(i+r*.2,s),n.moveTo(i,s-r*.2),n.lineTo(i,s+r*.2),n.stroke(),n.font=`700 ${t*.04}px Consolas, monospace`,n.textAlign="center",n.fillText("0\xB0",i,s-r*.78),n.fillText("90\xB0",i+r*.76,s+6),n.fillText("180\xB0",i,s+r*.84)}function a_(n,t,e){n.fillStyle="#2a2c30",n.fillRect(0,0,t,e);let i=5,s=15,r=t/s,a=e/i;for(let o=0;o<i;o++)for(let l=0;l<s;l++){if(o===4&&l>3&&l<10){l===4&&(n.fillStyle="#3c3f44",n.fillRect(l*r+2,o*a+2,r*6-4,a-4));continue}n.fillStyle="#3c3f44",n.fillRect(l*r+2,o*a+2,r-4,a-4),n.fillStyle="#9aa0a8",n.fillRect(l*r+r*.35,o*a+a*.35,r*.2,a*.15)}}function o_(n,t,e){n.fillStyle="#f7f5ec",n.fillRect(0,0,t,e),n.strokeStyle="#a8c4dc",n.lineWidth=1;for(let i=e*.1;i<e;i+=e*.045)n.beginPath(),n.moveTo(0,i),n.lineTo(t,i),n.stroke();n.fillStyle="#2a3b6a",n.font=`${e*.032}px "Segoe Print", cursive`,["Run 14  \u2014 5 objects, 24 angles","cube   0.97 / 0.95 / 0.96","cyl    0.91  (glare at 90\xB0)","cone   0.94","torus  0.88 \u2192 retry w/ diffuser","","light panel L: 5600K, 60%","light panel R: 5600K, 55%","","TODO: re-cal after lens swap"].forEach((i,s)=>n.fillText(i,t*.06,e*.135+s*e*.045))}function l_(n,t,e){n.fillStyle="#f5f4ef",n.fillRect(0,0,t,e),n.fillStyle="#2d5f8c",n.fillRect(0,0,t,e*.11),n.fillStyle="#fff",n.font=`700 ${e*.05}px Segoe UI, Arial`,n.textBaseline="middle",n.fillText("TEST PROTOCOL PB-A",t*.06,e*.055),n.fillStyle="#222",n.font=`500 ${e*.03}px Segoe UI, Arial`,["1. Warm up light panels 10 min","2. Verify chart focus (MTF50 > 0.3)","3. Zero turntable at 0\xB0","4. Place sample set, log IDs","5. Run 24-step rotation sweep","6. Review detections on display B","7. Export log, reset bench"].forEach((i,s)=>n.fillText(i,t*.06,e*.18+s*e*.065)),n.strokeStyle="#2d5f8c",n.lineWidth=3,n.strokeRect(t*.06,e*.67,t*.88,e*.28),n.fillStyle="#2d5f8c",n.font=`600 ${e*.028}px Segoe UI, Arial`,n.fillText("Lux at sample: 1200 \xB1 50",t*.1,e*.72),n.fillText("Camera: CAM-A1, f/4, 1/250 s",t*.1,e*.77),n.fillText("Last calibration: 03 OCT",t*.1,e*.82)}function c_(n,t,e){n.fillStyle="#f8f8f6",n.fillRect(0,0,t,e),n.lineCap="round",n.lineJoin="round",n.strokeStyle="#1f4e9a",n.fillStyle="#1f4e9a",n.lineWidth=3,n.font=`${e*.06}px "Segoe Print", cursive`,n.fillText("Sweep plan \u2014 week 41",t*.04,e*.1),n.font=`${e*.04}px "Segoe Print", cursive`,["\u2022 diffuser on both panels","\u2022 torus + cyl: glare test","\u2022 24 steps \xD7 15\xB0","\u2022 compare CAM-A1 vs depth bar"].forEach((o,l)=>n.fillText(o,t*.05,e*.22+l*e*.075));let i=t*.55,s=e*.82,r=t*.4,a=e*.6;n.strokeStyle="#222",n.beginPath(),n.moveTo(i,s-a),n.lineTo(i,s),n.lineTo(i+r,s),n.stroke(),n.strokeStyle="#c0281f",n.beginPath();for(let o=0;o<=40;o++){let l=i+o/40*r,c=s-a*(.85-.25*Math.exp(-((o-20)**2)/30));o?n.lineTo(l,c):n.moveTo(l,c)}n.stroke(),n.fillStyle="#222",n.font=`${e*.035}px "Segoe Print", cursive`,n.fillText("angle \u2192",i+r*.6,s+e*.06),n.fillText("conf.",i-t*.05,s-a-e*.02),n.fillStyle="#c0281f",n.fillText("glare dip @ 90\xB0",i+r*.3,s-a*.45),n.strokeStyle="#2a7a3a",n.lineWidth=3,n.strokeRect(t*.06,e*.6,t*.08,e*.08),n.beginPath(),n.moveTo(t*.14,e*.64),n.lineTo(t*.36,e*.64),n.stroke(),n.beginPath(),n.arc(t*.42,e*.64,e*.08,0,Math.PI*2),n.stroke(),n.fillStyle="#2a7a3a",n.fillText("cam",t*.06,e*.75),n.fillText("table",t*.38,e*.79)}var s_,xf=ln(()=>{bn();Is();s_=Math.PI/180});function _f(n){let{b:t,M:e,A:i}=n,s=9.6,r=11.85,a=-1.5,o=1.6,l=.82,c=(s+r)/2,h=(a+o)/2,f=new $e({color:5922404,metalness:.7,roughness:.4,map:e.perf.map,normalMap:e.perf.normalMap});t.box(r-s,.05,o-a,f,[c,l-.025,h]),t.box(r-s-.04,.1,o-a-.04,e.paintGrey,[c,l-.1,h]);for(let C of[s+.08,r-.08])for(let B of[a+.08,h,o-.08])t.box(.08,l-.15,.08,e.paintGrey,[C,(l-.15)/2+.02,B]),t.cyl(.05,.06,.02,e.rubber,[C,.01,B],[0,0,0],12);t.box(r-s-.2,.06,.06,e.paintGrey,[c,.18,a+.08]),t.box(r-s-.2,.06,.06,e.paintGrey,[c,.18,o-.08]),t.collideBox(s-.1,r+.2,a-.1,o+.1);let u=a+.15,d=o-.15,g=d-u,M=(u+d)/2;t.box(.5,.03,g+.1,e.anodBlack,[10.55,l+.015,M]);for(let C of[10.38,10.72]){t.box(.03,.025,g,e.chrome,[C,l+.0425,M]);for(let B=u+.05;B<d;B+=.12)t.cyl(.005,.005,.003,e.anodBlack,[C,l+.0555,B],[0,0,0],6)}t.cyl(.012,.012,g-.1,e.chrome,[10.55,l+.06,M],[Math.PI/2,0,0],12);for(let C of[u+.02,d-.02])t.box(.12,.08,.05,e.anodBlack,[10.55,l+.07,C]);t.box(.11,.11,.03,e.alu,[10.55,l+.07,u-.05]),t.box(.1,.1,.16,e.anodBlack,[10.55,l+.07,u-.15]),t.cyl(.04,.04,.05,e.paintBlue,[10.55,l+.07,u-.255],[Math.PI/2,0,0],16),t.add(i.sign(.08,.03,{bg:"#f4f2ea",lines:[{t:"AX-1 SERVO",size:.5,weight:700}]}),e.label,[10.6005,l+.08,u-.15],[0,Math.PI/2,0]);for(let C of[u+.1,d-.1])t.box(.04,.05,.03,e.paintYellow,[10.3,l+.055,C]),t.box(.03,.03,.02,e.plastic,[10.82,l+.05,C]),t.box(.006,.006,.006,e.ledAmber,[10.82,l+.068,C]);let p=.25;for(let C of[10.38,10.72])for(let B of[-.09,.09])t.box(.06,.035,.08,e.steelDark,[C,l+.07,p+B]);t.box(.12,.05,.1,e.brass,[10.55,l+.07,p]),t.box(.46,.025,.34,e.alu,[10.55,l+.1,p]),t.add(i.plane(g,.02,900,(C,B,k)=>{C.fillStyle="#d8d8d0",C.fillRect(0,0,B,k),C.fillStyle="#222";for(let j=0;j<300;j++){let q=j/300*B;C.fillRect(q,0,1,j%10===0?k:j%5===0?k*.6:k*.35)}}),e.label,[10.31,l+.031,M],[-Math.PI/2,0,Math.PI/2]),t.push([10.55,l+.1125,p],[0,-.5,0]),t.cyl(.13,.14,.05,e.anodBlack,[0,.025,0],[0,0,0],32);for(let C=0;C<8;C++){let B=C*45*Vi;t.cyl(.008,.008,.01,e.chrome,[Math.sin(B)*.115,.054,Math.cos(B)*.115],[0,0,0],6)}t.cyl(.11,.12,.16,e.paintOrange,[0,.13,0],[0,0,0],32),t.cyl(.115,.115,.02,e.anodBlack,[0,.06,0],[0,0,0],32),t.add(i.cylBand(.1105,.03,-.4,.8,1400,(C,B,k)=>{C.fillStyle="#d7642a",C.fillRect(0,0,B,k),C.fillStyle="#fff",C.font=`700 ${k*.75}px Segoe UI`,C.textAlign="center",C.textBaseline="middle",C.fillText("J1",B/2,k*.55)},12),e.label,[0,.16,0]);for(let C of[-1,1])t.box(.035,.16,.14,e.paintOrange,[C*.085,.27,0]);t.push([0,.32,0],[0,0,0]),t.cyl(.07,.07,.22,e.anodBlack,[0,0,0],[0,0,Math.PI/2],24);for(let C of[-1,1])t.cyl(.055,.055,.012,e.alu,[C*.116,0,0],[0,0,Math.PI/2],24);t.add(i.sign(.05,.03,{bg:"#2b2e33",lines:[{t:"J2",size:.7,color:"#fff",weight:700}]}),e.label,[.1225,0,0],[0,Math.PI/2,0]),t.push([0,0,0],[-28*Vi,0,0]),t.box(.1,.48,.1,e.paintOrange,[0,.24,0]),t.box(.104,.3,.02,e.paintDark,[0,.24,.05]),t.add(Ve([[.06,.05,-.05],[.07,.25,-.07],[.06,.46,-.06]],.012,12,6),e.rubber),t.push([0,.48,0],[100*Vi,0,0]),t.cyl(.06,.06,.16,e.anodBlack,[0,0,0],[0,0,Math.PI/2],24);for(let C of[-1,1])t.cyl(.045,.045,.012,e.alu,[C*.086,0,0],[0,0,Math.PI/2],24);t.add(i.sign(.04,.025,{bg:"#2b2e33",lines:[{t:"J3",size:.7,color:"#fff",weight:700}]}),e.label,[.0925,0,0],[0,Math.PI/2,0]),t.box(.075,.36,.075,e.paintOrange,[0,.19,0]),t.add(Ve([[.045,.03,-.045],[.05,.2,-.05],[.04,.36,-.04]],.009,10,6),e.rubber),t.push([0,.38,0],[42*Vi,0,0]),t.cyl(.045,.045,.06,e.anodBlack,[0,0,0],[0,0,0],20),t.cyl(.05,.05,.012,e.paintBlue,[0,.035,0],[0,0,0],20),t.box(.12,.03,.05,e.alu,[0,.06,0]);for(let C of[-1,1])t.box(.015,.08,.035,e.steel,[C*.04,.11,0]),t.box(.01,.03,.03,e.rubber,[C*.03,.14,0]);t.box(.045,.045,.045,e.paintYellow,[0,.135,0],[0,.2,0]),t.pop(),t.pop(),t.pop(),t.pop(),t.pop();{let B=l+.02,k=.07,j=u+.1,q=(j+p)/2+.25,K=[];for(let $=j;$<q;$+=.04)K.push([$,B,0]);for(let $=0;$<=180;$+=20)K.push([q+Math.sin($*Vi)*k,B+k-Math.cos($*Vi)*k,$*Vi]);for(let $=q-.04;$>p+.1;$-=.04)K.push([$,B+2*k,Math.PI]);for(let[$,wt,bt]of K)t.push([11.1,wt+.02,$],[-bt,0,0]),t.box(.07,.035,.036,e.plastic,[0,0,0]),t.pop();t.box(.08,.03,.06,e.alu,[11.1,B+2*k+.02,p+.1]),t.box(.5,.012,.05,e.alu,[10.85,l+.11,p+.1])}t.box(.2,.06,.2,e.steelDark,[10,l+.03,-.9]);for(let[C,B]of[[-.06,-.06],[.06,-.06],[0,.06]])t.cyl(.008,.008,.05,e.chrome,[10+C,l+.085,-.9+B],[0,0,0],8);t.box(.12,.06,.06,e.paintGrey,[10.05,l+.03,1.2]),t.box(.12,.06,.06,e.paintGrey,[10.05,l+.03,1.3]),t.add(i.sign(.1,.04,{bg:"#f4f2ea",lines:[{t:"2 kg",size:.6,weight:700}]}),e.label,[9.9895,l+.03,1.2],[0,-Math.PI/2,0]),t.box(.06,.05,.05,e.paintRed,[10,l+.025,.7]),t.cyl(.008,.008,.2,e.chrome,[10,l+.15,.7],[0,0,0],8),t.cyl(.006,.006,.12,e.chrome,[10.05,l+.24,.7],[0,0,Math.PI/2],8),t.cyl(.03,.03,.015,e.chrome,[10.11,l+.24,.7],[Math.PI/2,0,0],20),t.add(i.plane(.05,.05,1600,(C,B,k)=>{C.fillStyle="#fafafa",C.beginPath(),C.arc(B/2,k/2,B/2,0,7),C.fill(),C.strokeStyle="#111";for(let j=0;j<50;j++){let q=j/50*Math.PI*2;C.lineWidth=j%5?1:2,C.beginPath(),C.moveTo(B/2+Math.cos(q)*B*.46,k/2+Math.sin(q)*k*.46),C.lineTo(B/2+Math.cos(q)*B*(j%5?.41:.37),k/2+Math.sin(q)*k*(j%5?.41:.37)),C.stroke()}C.strokeStyle="#c00",C.lineWidth=2,C.beginPath(),C.moveTo(B/2,k/2),C.lineTo(B*.75,k*.25),C.stroke()}),e.labelCut,[10.11,l+.24,.7081]);let m=s+.02,S=r-.02,T=a+.02,y=o-.02,E=l,v=2.15,A=.045,x=[[m,T],[S,T],[m,y],[S,y],[m,h],[S,h]];for(let[C,B]of x)t.box(A,v-E,A,e.alu,[C,(E+v)/2,B]),t.box(A+.004,.01,A+.004,e.plastic,[C,v+.005,B]);for(let C of[v,E+.05])t.box(S-m,A,A,e.alu,[c,C-A/2,T]),t.box(S-m,A,A,e.alu,[c,C-A/2,y]),t.box(A,A,y-T,e.alu,[m,C-A/2,h]),t.box(A,A,y-T,e.alu,[S,C-A/2,h]);t.box(A,A,y-T,e.alu,[c,v-A/2,h]),t.box(.006,v-E-.1,y-T-.05,e.glassTint,[S+.03,(E+v)/2+.02,h]);for(let C of[T,y])t.box(S-m-.05,v-E-.1,.006,e.glassTint,[c,(E+v)/2+.02,C+(C<0?-.03:.03)]);t.box(.006,.5,y-T-.05,e.glassTint,[m-.03,v-.28,h]),t.box(A,A,y-T,e.alu,[m,v-.55,h]);for(let[C,B]of x.slice(0,4))t.box(.06,.06,.012,e.alu,[C+(C<c?.03:-.03),v-.08,B]);for(let C of[T+.1,y-.1]){t.box(.04,.85,.04,e.paintYellow,[m-.06,l+.47,C]);for(let B=0;B<8;B++)t.box(.004,.02,.02,e.ledRed,[m-.06+0,l+.12+B*.1,C+(C<0?.021:-.021)])}t.add(i.sign(.34,.24,{bg:"#f7d64a",border:"#111",lines:[{t:"\u26A0 CAUTION",size:.2,color:"#111",weight:800},{t:"Moving parts",size:.14,color:"#111",weight:600},{t:"Light curtain active",size:.12,color:"#111",weight:600}]}),e.label,[m-.034,v-.28,-.6],[0,-Math.PI/2,0]),t.add(i.sign(.5,.1,{bg:"#2b2e33",lines:[{t:"RIG B  \xB7  LINEAR + 3R",size:.5,color:"#fff",weight:700}]}),e.label,[m-.034,v-.28,.5],[0,-Math.PI/2,0]);let w=[m,T];t.cyl(.012,.012,.12,e.steel,[w[0],v+.06,w[1]],[0,0,0],8);let I=[[e.ledGreen,0],[new $e({color:9067024,roughness:.3,transparent:!1}),1],[new $e({color:6951952,roughness:.3}),2]];for(let[C,B]of I)t.cyl(.035,.035,.06,C,[w[0],v+.15+B*.065,w[1]],[0,0,0],20);t.cyl(.036,.036,.01,e.plastic,[w[0],v+.115,w[1]],[0,0,0],20),t.cyl(.03,.036,.02,e.plastic,[w[0],v+.32,w[1]],[0,0,0],20);let D=9.1,O=-1.95,H=2.05;t.box(.08,.004,H-O,e.hazard,[D,.002,(O+H)/2]),t.box(12-D,.004,.08,e.hazard,[(D+12)/2,.002,O]),t.box(12-D,.004,.08,e.hazard,[(D+12)/2,.002,H]),t.add(i.sign(1.2,.18,{bg:"rgba(0,0,0,0)",lines:[{t:"OPERATORS ONLY BEYOND LINE",size:.55,color:"#e0b020",weight:800}]}),e.labelCut,[8.85,.005,.05],[-Math.PI/2,0,Math.PI/2]),t.collideBox(D+.1,12,O,H),t.push([8.55,0,-2.78],[0,.4,0]),t.box(1.2,.72,.6,e.paintGrey,[0,.38,-.02]),t.box(1.2,.04,.6,e.skirting,[0,.02,-.02]),t.box(1.16,.6,.012,e.paintGrey,[0,.4,.286]),t.box(.1,.02,.02,e.steel,[.45,.62,.3]);for(let C=0;C<6;C++)t.box(.3,.006,.012,e.perf,[-.35,.3+C*.03,.295]);t.push([0,.8,.05],[.38,0,0]),t.box(1.24,.06,.5,e.paintDark,[0,0,0]),t.box(1.16,.004,.44,e.laminate,[0,.032,0]),t.add(i.plane(1.16,.44,700,(C,B,k)=>h_(C,B,k)),e.label,[0,.035,0],[-Math.PI/2,0,0]),t.box(.11,.05,.11,e.paintYellow,[.45,.06,.04]),t.cyl(.018,.018,.03,e.paintRed,[.45,.095,.04],[0,0,0],16),t.cyl(.042,.035,.03,e.paintRed,[.45,.12,.04],[0,0,0],24);let N=(C,B,k,j)=>{t.cyl(.026,.026,.012,e.chrome,[C,.038,B],[0,0,0],20),t.cyl(.02,.02,.018,k,[C,.045,B],[0,0,0],20)};N(-.42,-.08,e.ledGreen),N(-.3,-.08,e.ledAmber),N(-.18,-.08,e.paintDark),t.cyl(.03,.03,.01,e.chrome,[-.42,.036,.1],[0,0,0],20),t.box(.012,.03,.045,e.plastic,[-.42,.055,.1],[0,.6,0]),t.cyl(.022,.022,.015,e.chrome,[-.3,.04,.1],[0,0,0],16),t.box(.006,.02,.025,e.brass,[-.3,.058,.1],[0,.3,0]),t.cyl(.05,.05,.02,e.anodBlack,[.05,.045,.08],[0,0,0],28),t.cyl(.008,.008,.025,e.chrome,[.08,.07,.08],[0,0,0],8),t.box(.09,.02,.09,e.rubber,[.22,.04,.07]),t.cyl(.008,.01,.08,e.steel,[.22,.09,.07],[.15,0,0],10),t.add(new Ue(.02,14,10),e.paintRed,[.22,.135,.078]),t.pop(),t.box(1.24,.42,.1,e.paintDark,[0,1.25,-.24],[-.1,0,0]),t.push([0,1.25,-.24],[-.1,0,0]),n.screen("joints",.56,.32,640,366,[-.3,0,.0505],[0,0,0]),n.screen("trace",.56,.32,640,366,[.3,0,.0505],[0,0,0]),t.pop(),t.box(.04,.4,.04,e.steelDark,[0,1,-.26]),t.add(i.sign(.8,.07,{bg:"#2b2e33",lines:[{t:"RIG B  \xB7  OPERATOR CONSOLE",size:.55,color:"#e6eaee",weight:700}]}),e.label,[0,1.495,-.21],[-.1,0,0]),t.collideLocalBox(1.3,.75,[0,0,-.02]),t.pop(),t.push([9.05,0,-1.25],[0,.55,0]),t.box(.22,.025,1.6,e.paintDark,[0,.0125,0]),t.box(.12,.004,1.58,e.hazard,[0,.026,0]),t.pop(),t.box(.45,1.9,.9,e.paintGrey,[11.75,.95,2.75]),t.box(.01,1.84,.42,e.paintGrey,[11.522,.95,2.52]),t.box(.01,1.84,.42,e.paintGrey,[11.522,.95,2.98]);for(let C of[2.7,2.8])t.box(.03,.14,.025,e.anodBlack,[11.505,1.1,C]);t.add(i.sign(.16,.14,{bg:"#f7d64a",border:"#111",lines:[{t:"\u26A1",size:.5,color:"#111",weight:800},{t:"400 V",size:.22,color:"#111",weight:800}]}),e.label,[11.516,1.55,2.52],[0,-Math.PI/2,0]),t.add(i.sign(.3,.06,{bg:"#f4f2ea",lines:[{t:"PANEL B-2",size:.6,weight:700}]}),e.label,[11.516,1.75,2.98],[0,-Math.PI/2,0]),t.box(.08,.08,.08,e.plastic,[11.505,1.3,2.98]),t.box(.02,.04,.012,e.paintRed,[11.46,1.3,2.98]),t.collideBox(11.5,12,2.28,3.25),t.cyl(.025,.025,1.5,e.steelDark,[11.92,2.1,1.5],[Math.PI/2,0,0],12),t.add(Ve([[11.92,1.9,2.3],[11.92,2.1,2.1],[11.92,2.1,.75],[11.92,1.6,.55],[11.9,1,.5],[11.82,.86,.4]],.02,30,8),e.rubber),t.push([8.35,0,2.75],[0,-.15,0]),t.box(.75,.72,.45,e.paintRed,[0,.5,0]);for(let C=0;C<4;C++)t.box(.7,.003,.004,e.paintDark,[0,.3+C*.13,.227]),t.box(.3,.02,.02,e.steel,[0,.36+C*.13,.24]);t.box(.79,.03,.49,e.rubber,[0,.875,0]);for(let[C,B]of[[-.32,-.18],[.32,-.18],[-.32,.18],[.32,.18]])t.cyl(.05,.05,.035,e.rubber,[C,.06,B],[0,0,Math.PI/2],14);t.box(.04,.3,.04,e.steel,[.42,.95,0]),t.box(.3,.06,.12,e.paintYellow,[-.12,.92,.05]),t.cyl(.012,.012,.22,e.paintBlue,[.15,.9,-.05],[0,0,Math.PI/2],8),t.box(.12,.01,.04,e.steel,[.15,.895,.1],[0,.4,0]),t.pop(),t.collideBox(7.9,8.8,2.45,3.05)}function h_(n,t,e){n.fillStyle="#d8d8d0",n.fillRect(0,0,t,e),n.strokeStyle="#555",n.lineWidth=2,n.strokeRect(6,6,t-12,e-12),n.fillStyle="#222",n.font=`700 ${e*.06}px Segoe UI, Arial`,n.textAlign="center",n.textBaseline="middle";let i=r=>t/2+r/1.16*t,s=r=>e/2+r/.44*e;n.fillText("START",i(-.42),s(-.16)),n.fillText("HOLD",i(-.3),s(-.16)),n.fillText("RESET",i(-.18),s(-.16)),n.fillText("MODE",i(-.42),s(.18)),n.fillText("KEY",i(-.3),s(.18)),n.fillText("JOG AX-1",i(.05),s(.18)),n.fillText("J1 / J2",i(.22),s(.18)),n.fillStyle="#b3261e",n.font=`800 ${e*.07}px Segoe UI, Arial`,n.fillText("EMERGENCY STOP",i(.45),s(.16)),n.fillStyle="#e0b020",n.beginPath(),n.arc(i(.45),s(.04),e*.16,0,7),n.fill()}var Vi,yf=ln(()=>{bn();Is();Vi=Math.PI/180});function Jo(n,t,e,i,s){n.strokeStyle=s,n.lineWidth=1,n.beginPath();for(let r=0;r<=t;r+=i)n.moveTo(r+.5,0),n.lineTo(r+.5,e);for(let r=0;r<=e;r+=i)n.moveTo(0,r+.5),n.lineTo(t,r+.5);n.stroke()}function Ko(n,t,e,i,s,r){n.fillStyle="#0d1a24",n.fillRect(0,0,t,e*.09),n.fillStyle=r,n.fillRect(0,e*.09-3,t,3),n.fillStyle="#e8f0f4",n.font=`600 ${e*.05}px Consolas, monospace`,n.textBaseline="middle",n.textAlign="left",n.fillText(i,t*.02,e*.047),n.textAlign="right",n.fillStyle="#8fb3c8",n.fillText(s,t*.98,e*.047),n.textAlign="left"}function u_(n,t,e,i){n.fillStyle="#5a5a5a",n.fillRect(0,0,t,e),["#c0c0c0","#c0c000","#00c0c0","#00c000","#c000c0","#c00000","#0000c0"].forEach((l,c)=>{n.fillStyle=l,n.fillRect(c*t/7,0,t/7+1,e*.18)});for(let l=0;l<16;l++){let c=Math.round(l/15*255);n.fillStyle=`rgb(${c},${c},${c})`,n.fillRect(l*t/16,e*.82,t/16+1,e*.18)}Jo(n,t,e,e/12,"rgba(255,255,255,0.18)");let r=t/2,a=e/2;n.strokeStyle="#fff",n.lineWidth=2;for(let l of[.08,.16,.24,.3])n.beginPath(),n.arc(r,a,e*l,0,zn),n.stroke();for(let l=0;l<24;l++)n.fillStyle=l%2?"#111":"#eee",n.beginPath(),n.moveTo(r,a),n.arc(r,a,e*.075,l/24*zn,(l+1)/24*zn),n.fill();for(let l=0;l<18;l++)n.fillStyle="#111",n.fillRect(t*.06+l*(t*.012-l*.25),e*.3,Math.max(1,t*.006-l*.12),e*.4);for(let l=0;l<18;l++)n.fillStyle="#eee",n.fillRect(t*.82,e*.3+l*(e*.022),t*.12,Math.max(1,e*.011-l*.25));n.fillStyle="#fff";for(let[l,c]of[[.03,.22],[.94,.22],[.03,.72],[.94,.72]])n.fillRect(t*l,e*c,t*.03,e*.012),n.fillRect(t*l+t*.009,e*c-e*.02,t*.012,e*.05);let o=e*.18+i*.25%1*e*.64;n.fillStyle="rgba(80,255,170,0.35)",n.fillRect(0,o,t,3),n.fillStyle="#000a",n.fillRect(t*.02,e*.2,t*.3,e*.07),n.fillStyle="#7dffb6",n.font=`600 ${e*.04}px Consolas, monospace`,n.textBaseline="middle",n.fillText(`PB-A  CAL 04   ${(i%60).toFixed(1).padStart(4,"0")}s`,t*.03,e*.235)}function f_(n,t,e,i){n.fillStyle="#10161b",n.fillRect(0,0,t,e),Ko(n,t,e,"CAM-A1 \xB7 DETECTION REVIEW",`RUN 14 \xB7 STEP ${Math.floor(i*.6)%24+1}/24`,"#3aa0ff");let s=t*.03,r=e*.12,a=t*.62,o=e*.8;n.fillStyle="#2a3036",n.fillRect(s,r,a,o),Jo(n,a,o,1e9,"#000"),n.save(),n.translate(s+a/2,r+o*.62),n.scale(1,.38),n.fillStyle="#4a5056",n.beginPath(),n.arc(0,0,a*.36,0,zn),n.fill(),n.restore();let l=Math.floor(i*.6)*(zn/24),c=[["cube","#c0392b",.97],["sphere","#2d6fb0",.99],["cone","#e0b020",.94],["cylinder","#3d8a4a",.91],["torus","#d7642a",.88]];c.forEach(([f,u,d],g)=>{let M=l+g/c.length*zn,p=s+a/2+Math.cos(M)*a*.24,m=r+o*.62+Math.sin(M)*o*.13-o*.08,S=o*.1*(.85+.15*Math.sin(M));n.fillStyle=u,f==="sphere"?(n.beginPath(),n.arc(p,m,S*.5,0,zn),n.fill()):f==="cone"?(n.beginPath(),n.moveTo(p,m-S*.6),n.lineTo(p+S*.45,m+S*.5),n.lineTo(p-S*.45,m+S*.5),n.fill()):f==="torus"?(n.lineWidth=S*.22,n.strokeStyle=u,n.beginPath(),n.ellipse(p,m,S*.45,S*.22,0,0,zn),n.stroke()):n.fillRect(p-S*.4,m-S*.5,S*.8,S);let T=Math.max(.5,d-(f==="cylinder"&&Math.abs(Math.sin(M))>.9?.2:0));n.strokeStyle=T>.9?"#5dffa0":"#ffc040",n.lineWidth=2,n.strokeRect(p-S*.65,m-S*.75,S*1.3,S*1.45),n.fillStyle=n.strokeStyle,n.font=`600 ${e*.034}px Consolas, monospace`,n.textBaseline="bottom",n.fillText(`${f} ${T.toFixed(2)}`,p-S*.65,m-S*.78)});let h=t*.68;n.fillStyle="#c8d6df",n.font=`600 ${e*.036}px Consolas, monospace`,n.textBaseline="top",n.fillText("CLASS      CONF  IoU",h,e*.14),c.forEach(([f,u,d],g)=>{n.fillStyle=u,n.fillRect(h,e*.2+g*e*.065,e*.03,e*.03),n.fillStyle="#c8d6df",n.fillText(`${f.padEnd(9)} ${d.toFixed(2)}  0.${80+g*3}`,h+e*.045,e*.195+g*e*.065)}),n.strokeStyle="#3aa0ff",n.lineWidth=2,n.beginPath();for(let f=0;f<60;f++){let u=h+f/59*t*.29,d=e*.86-(.6+.3*Math.sin(f*.3+i*.5)*Math.cos(f*.11))*e*.4;f?n.lineTo(u,d):n.moveTo(u,d)}n.stroke(),n.fillStyle="#8fb3c8",n.fillText("mean conf / step",h,e*.9)}function d_(n,t,e,i){n.fillStyle="#0f1418",n.fillRect(0,0,t,e),Ko(n,t,e,"RIG B \xB7 AXIS STATUS","MODE: TEST  \u25CF","#d7642a"),[["AX-1","mm",412.6+Math.sin(i*.4)*.3,.55],["J1","\xB0",-28.6,.42],["J2","\xB0",28,.58],["J3","\xB0",-100,.22],["J4","\xB0",42,.62]].forEach(([r,a,o,l],c)=>{let h=e*.16+c*e*.155;n.fillStyle="#c8d6df",n.font=`600 ${e*.06}px Consolas, monospace`,n.textBaseline="middle",n.fillText(r,t*.04,h+e*.04),n.fillStyle="#1e2a33",n.fillRect(t*.18,h+e*.015,t*.48,e*.05),n.fillStyle="#d7642a",n.fillRect(t*.18,h+e*.015,t*.48*l,e*.05),n.fillStyle="#e8f0f4",n.textAlign="right",n.fillText(`${o.toFixed(1)} ${a}`,t*.9,h+e*.04),n.textAlign="left",n.fillStyle="#5dffa0",n.beginPath(),n.arc(t*.95,h+e*.04,e*.018,0,zn),n.fill()}),n.fillStyle="#8fb3c8",n.font=`500 ${e*.045}px Consolas, monospace`,n.fillText(`CYCLE 1${String(Math.floor(i/4)%1e3).padStart(3,"0")}   E-STOP OK   CURTAIN OK`,t*.04,e*.95)}function p_(n,t,e,i){n.fillStyle="#0f1418",n.fillRect(0,0,t,e),Ko(n,t,e,"AX-1 POSITION TRACE","10 s WINDOW","#3aa0ff");let s=t*.06,r=e*.14,a=t*.9,o=e*.5;n.save(),n.translate(s,r),Jo(n,a,o,o/5,"rgba(120,160,190,0.18)"),n.restore();let l=f=>Math.sin(f*.8)*.8+Math.sin(f*2.1)*.12;n.strokeStyle="#3aa0ff",n.lineWidth=2,n.beginPath();for(let f=0;f<=160;f++){let u=s+f/160*a,d=r+o/2-l(i+f*.06)*o*.42;f?n.lineTo(u,d):n.moveTo(u,d)}n.stroke(),n.strokeStyle="rgba(255,255,255,0.4)",n.setLineDash([5,5]),n.beginPath();for(let f=0;f<=160;f++){let u=s+f/160*a,d=r+o/2-Math.sin((i+f*.06)*.8)*.8*o*.42;f?n.lineTo(u,d):n.moveTo(u,d)}n.stroke(),n.setLineDash([]);let c=e*.72,h=e*.18;n.save(),n.translate(s,c),Jo(n,a,h,h/2,"rgba(120,160,190,0.18)"),n.restore(),n.strokeStyle="#ffc040",n.beginPath();for(let f=0;f<=160;f++){let u=s+f/160*a,d=c+h/2-Math.sin((i+f*.06)*2.1)*.12*h*2.5;f?n.lineTo(u,d):n.moveTo(u,d)}n.stroke(),n.fillStyle="#8fb3c8",n.font=`500 ${e*.045}px Consolas, monospace`,n.textBaseline="middle",n.fillText("following error  \xB10.05 mm",s,e*.95)}function m_(n,t,e,i){n.fillStyle="#0c1318",n.fillRect(0,0,t,e),Ko(n,t,e,"ORBIS-7 \xB7 LIVE ACQUISITION",`FRAME ${String(Math.floor(i*2.5)).padStart(6,"0")} \xB7 13 VIEWS \xB7 SYNC OK`,"#2f9f98");let s=5,r=t*.62/s,a=r*.62,o=t*.025,l=e*.13;for(let u=0;u<13;u++){let d=o+u%s*r,g=l+Math.floor(u/s)*(a+e*.035);n.fillStyle="#16232b",n.fillRect(d+3,g+3,r-6,a-6);let M=u/13*zn+i*.15,p=d+r/2,m=g+a/2,S=Math.abs(Math.cos(M))*a*.18+a*.06,T=a*.3,y=n.createRadialGradient(p,m,1,p,m,T);y.addColorStop(0,"#e6ffff"),y.addColorStop(.5,"#58c8e8"),y.addColorStop(1,"rgba(20,60,80,0)"),n.fillStyle=y,n.beginPath(),n.moveTo(p,m-T),n.lineTo(p+S,m),n.lineTo(p,m+T),n.lineTo(p-S,m),n.closePath(),n.fill(),n.fillStyle="#8fb3c8",n.font=`600 ${e*.026}px Consolas, monospace`,n.textBaseline="top",n.fillText(u<4?`L${u+1}`:u<8?`S${u-3}`:u<12?`A${u-7}`:"T0",d+8,g+7),n.fillStyle=u===5?"#ffb020":"#5dffa0",n.fillRect(d+r-18,g+9,8,8)}let c=t*.67,h=t*.3;n.fillStyle="#c8d6df",n.font=`600 ${e*.032}px Consolas, monospace`,n.textBaseline="top",n.fillText("INTENSITY HISTOGRAM",c,e*.13);for(let u=0;u<48;u++){let d=Math.exp(-((u-30)**2)/60)*.8+Math.exp(-((u-10)**2)/20)*.35+.03*Math.sin(u*3+i*2);n.fillStyle="#2f9f98",n.fillRect(c+u*(h/48),e*.45-d*e*.26,h/48-1,d*e*.26)}[["exposure","4.0 ms"],["gain","+2 dB"],["sample temp",`${(22.4+Math.sin(i*.2)*.1).toFixed(1)} \xB0C`],["stage XY","+0.012 / -0.004 mm"],["ring light","62 %"],["channel 6","RECAL DUE"]].forEach(([u,d],g)=>{n.fillStyle="#8fb3c8",n.fillText(u,c,e*.52+g*e*.06),n.fillStyle=g===5?"#ffb020":"#e8f0f4",n.textAlign="right",n.fillText(d,c+h,e*.52+g*e*.06),n.textAlign="left"}),n.fillStyle="#2f9f98",n.fillRect(0,e-6,i*.1%1*t,6)}var zn,vf,Sf=ln(()=>{zn=Math.PI*2;vf={pattern:u_,detect:f_,joints:d_,trace:p_,datawall:m_}});var T_=Yf(()=>{bn();nf();Is();cf();uf();Oc();pf();xf();yf();Sf();var xe=new zo({antialias:!0,powerPreference:"high-performance",stencil:!1}),Lf=window.devicePixelRatio||1,Us=[.75,1,1.25,1.5,2].filter(n=>n<=Math.max(1,Lf)+.01),Ns=Us.reduce((n,t,e)=>t<=Math.min(Lf,1.25)+.01?e:n,0);xe.setPixelRatio(Us[Ns]);xe.setSize(window.innerWidth,window.innerHeight);xe.toneMapping=Er;xe.toneMappingExposure=1.05;xe.shadowMap.enabled=!0;xe.shadowMap.type=Ui;xe.shadowMap.autoUpdate=!1;document.body.appendChild(xe.domElement);var an=new Ci;an.background=new Wt(1711393);var rn=new Ie(70,window.innerWidth/window.innerHeight,.04,80);rn.rotation.order="YXZ";var Df=new As(xe);an.environment=Df.fromScene(new Go,.04).texture;an.environmentIntensity=.42;Df.dispose();an.add(new vr(15988473,8222316,.85));var kn=new Tr(16774890,1.9);kn.position.set(3.5,14,5.5);kn.target.position.set(0,0,-.5);kn.castShadow=!0;kn.shadow.mapSize.set(4096,4096);Object.assign(kn.shadow.camera,{left:-13,right:13,top:10.5,bottom:-10.5,near:2,far:30});kn.shadow.bias=-3e-4;kn.shadow.normalBias=.025;kn.shadow.radius=2.5;an.add(kn,kn.target);function qc(n,t,e,i,s,r=.7){let a=new Mr(n,t,0,s,r,2);return a.position.set(...e),a.target.position.set(...i),an.add(a,a.target),a}qc(16774114,38,[Te.x,4.3,Te.z+.4],[Te.x,.8,Te.z],.52);qc(15922943,20,[-9.6,3.25,.3],[-11.5,.9,.2],.75);qc(16773860,20,[9.4,3.25,-.6],[10.7,.8,-.2],.8);var Yc=Math.min(8,xe.capabilities.getMaxAnisotropy()),g_=lf(Yc),Nf=new Yo(4096),Uf=Nf.texture(Yc),x_=hf(g_,Uf),vi=new qo,Qo=[],nl={b:vi,M:x_,A:Nf,screen(n,t,e,i,s,r,a){let o=document.createElement("canvas");o.width=i,o.height=s;let l=new Zn(o);l.colorSpace=Ee,l.anisotropy=Yc,l.minFilter=Ae,l.generateMipmaps=!1;let c=new Dn({map:l,color:14211288,toneMapped:!1}),h=new pe(new $n(t,e),c),f=new jt().compose(new P(...r),new qe().setFromEuler(new Ze(...a)),new P(1,1,1));h.matrixAutoUpdate=!1,h.matrix.copy(vi.top).multiply(f),h.matrixWorldNeedsUpdate=!0,an.add(h);let u={id:n,cv:o,c:o.getContext("2d"),tex:l,mesh:h,draw:vf[n],pos:new P().setFromMatrixPosition(h.matrix)};u.draw(u.c,i,s,0),l.needsUpdate=!0,Qo.push(u)}};vi.region="hall";ff(nl);vi.region="core";df(nl);vi.region="west";gf(nl);vi.region="east";_f(nl);Uf.needsUpdate=!0;var __=vi.build(an),Ff=vi.colliders,Zc={x:0,z:7.3,yaw:0,pitch:-.04},Mf={Digit1:Zc,Digit2:{x:2.9,z:1.9,yaw:.93,pitch:-.12},Digit3:{x:-9.4,z:.9,yaw:1.45,pitch:-.2},Digit4:{x:8,z:-.9,yaw:-1.25,pitch:-.15}},Jn=.3,Bf=1.62,y_=1.12,he={pos:new P,vel:new P,yaw:0,pitch:0,eye:Bf,crouch:!1};function tl(n){he.pos.set(n.x,0,n.z),he.vel.set(0,0,0),he.yaw=n.yaw,he.pitch=n.pitch}tl(Zc);var sn=new Set,$c=!1,Jc=!1,Gc=0,Hc=0,bf=.0022,Wc=document.getElementById("overlay"),el=document.getElementById("stats"),Xc=document.getElementById("area");function Tf(n,t){he.yaw-=n*bf,he.pitch=Math.max(-1.45,Math.min(1.45,he.pitch-t*bf))}Wc.addEventListener("click",()=>{Wc.classList.add("hidden"),xe.domElement.requestPointerLock?.()?.catch?.(()=>{})});xe.domElement.addEventListener("mousedown",n=>{$c||(xe.domElement.requestPointerLock?.()?.catch?.(()=>{}),Jc=!0,Gc=n.clientX,Hc=n.clientY)});window.addEventListener("mouseup",()=>{Jc=!1});document.addEventListener("pointerlockchange",()=>{$c=document.pointerLockElement===xe.domElement});window.addEventListener("mousemove",n=>{$c?Tf(n.movementX,n.movementY):Jc&&(Tf(n.clientX-Gc,n.clientY-Hc),Gc=n.clientX,Hc=n.clientY)});window.addEventListener("keydown",n=>{sn.add(n.code),n.code==="KeyR"&&tl(Zc),Mf[n.code]&&tl(Mf[n.code]),n.code==="KeyC"&&(he.crouch=!he.crouch),n.code==="KeyF"&&(el.style.display=el.style.display==="block"?"none":"block"),n.code==="KeyH"&&(Wc.classList.remove("hidden"),document.exitPointerLock?.()),n.code==="KeyP"&&(Ns=(Ns+1)%Us.length,xe.setPixelRatio(Us[Ns]),xe.setSize(window.innerWidth,window.innerHeight),zf(`Render scale ${Us[Ns]}\xD7`)),(n.code.startsWith("Arrow")||n.code==="Space")&&n.preventDefault()});window.addEventListener("keyup",n=>sn.delete(n.code));window.addEventListener("blur",()=>sn.clear());window.addEventListener("resize",()=>{rn.aspect=window.innerWidth/window.innerHeight,rn.updateProjectionMatrix(),xe.setSize(window.innerWidth,window.innerHeight)});function v_(n){for(let t=0;t<3;t++)for(let e of Ff)if(e.type==="box"){let i=Math.max(e.minX,Math.min(n.x,e.maxX)),s=Math.max(e.minZ,Math.min(n.z,e.maxZ)),r=n.x-i,a=n.z-s,o=r*r+a*a;if(o>=Jn*Jn)continue;if(o>1e-9){let l=Math.sqrt(o);n.x=i+r/l*Jn,n.z=s+a/l*Jn}else{let l=n.x-e.minX,c=e.maxX-n.x,h=n.z-e.minZ,f=e.maxZ-n.z,u=Math.min(l,c,h,f);u===l?n.x=e.minX-Jn:u===c?n.x=e.maxX+Jn:u===h?n.z=e.minZ-Jn:n.z=e.maxZ+Jn}}else{let i=n.x-e.x,s=n.z-e.z,r=i*i+s*s,a=e.r+Jn;if(r<a*a){let o=Math.sqrt(r)||1e-6;n.x=e.x+i/o*a,n.z=e.z+s/o*a}}}var Ef=new P,Af=new P,Ls=new P;function Of(n){let t=(sn.has("KeyW")||sn.has("ArrowUp")?1:0)-(sn.has("KeyS")||sn.has("ArrowDown")?1:0),e=(sn.has("KeyD")||sn.has("ArrowRight")?1:0)-(sn.has("KeyA")||sn.has("ArrowLeft")?1:0);Ef.set(-Math.sin(he.yaw),0,-Math.cos(he.yaw)),Af.set(Math.cos(he.yaw),0,-Math.sin(he.yaw)),Ls.set(0,0,0).addScaledVector(Ef,t).addScaledVector(Af,e),Ls.lengthSq()>0&&Ls.normalize();let i=(sn.has("ShiftLeft")||sn.has("ShiftRight")?4.2:2.2)*(he.crouch?.55:1);Ls.multiplyScalar(i);let s=1-Math.exp(-n*(Ls.lengthSq()>0?10:14));he.vel.lerp(Ls,s);let r=he.vel.clone().multiplyScalar(n),a=Math.max(1,Math.ceil(r.length()/.08));r.divideScalar(a);for(let l=0;l<a;l++)he.pos.add(r),v_(he.pos);let o=he.crouch?y_:Bf;he.eye+=(o-he.eye)*(1-Math.exp(-n*10)),rn.position.set(he.pos.x,he.eye,he.pos.z),rn.rotation.set(he.pitch,he.yaw,0)}var wf="",jo=0;function zf(n){Xc.textContent=n,Xc.style.opacity=1,jo=2.5}function S_(n){return n.x<-7?"Perception Testing \xB7 Bench A":n.x>7?"Motion Testing \xB7 Rig B":n.z>5.5?"Entrance":Math.hypot(n.x-Te.x,n.z-Te.z)<3.6?"ORBIS-7 Multi-View Imager":"Demonstration Hall"}var Rf=new oi,Cf=new jt,zc=0,kc=0;function M_(n,t){if(kc+=n,!(kc<1/60)){kc=0,Cf.multiplyMatrices(rn.projectionMatrix,rn.matrixWorldInverse),Rf.setFromProjectionMatrix(Cf);for(let e=0;e<Qo.length;e++){let i=Qo[zc];if(zc=(zc+1)%Qo.length,!(i.pos.distanceTo(rn.position)>20||!Rf.containsPoint(i.pos))){i.draw(i.c,i.cv.width,i.cv.height,t),i.tex.needsUpdate=!0;break}}}}var Ds=[],Vc=0;function b_(n){if(Ds.push(n),Ds.length>240&&Ds.shift(),Vc+=n,Vc<250||el.style.display!=="block")return;Vc=0;let t=[...Ds].sort((r,a)=>r-a),e=Ds.reduce((r,a)=>r+a,0)/Ds.length,i=t[Math.floor(t.length*.99)-1]||t[t.length-1],s=xe.info.render;el.textContent=`FPS        ${(1e3/e).toFixed(0)}
frame avg  ${e.toFixed(2)} ms
frame p99  ${i.toFixed(2)} ms
frame max  ${t[t.length-1].toFixed(2)} ms
draw calls ${s.calls}
triangles  ${(s.triangles/1e3).toFixed(0)}k
scale      ${Us[Ns]}\xD7`}an.traverse(n=>{if(n.material)for(let t of["map","normalMap","roughnessMap"])n.material[t]&&xe.initTexture(n.material[t])});Of(0);xe.compile(an,rn);xe.shadowMap.needsUpdate=!0;xe.render(an,rn);document.getElementById("loading").remove();window.__lab={renderer:xe,scene:an,camera:rn,player:he,teleport:tl,triCount:__,colliders:Ff};var If=performance.now(),Pf=0;xe.setAnimationLoop(()=>{let n=performance.now(),t=n-If;If=n;let e=Math.min(.05,t/1e3);Pf+=e,Of(e),rn.updateMatrixWorld(),M_(e,Pf);let i=S_(he.pos);i!==wf&&(wf=i,zf(i)),jo>0&&(jo-=e,jo<=0&&(Xc.style.opacity=0)),xe.render(an,rn),b_(t)})});T_();})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/

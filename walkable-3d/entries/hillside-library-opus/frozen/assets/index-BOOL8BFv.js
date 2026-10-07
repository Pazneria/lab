(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function e(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=e(r);fetch(r.href,s)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Ma="170",rl=0,Ka=1,sl=2,Sa=1,al=2,un=3,Cn=0,ve=1,De=2,wn=0,_i=1,Lr=2,Za=3,ja=4,ol=5,Xn=100,cl=101,ll=102,ul=103,hl=104,fl=200,dl=201,pl=202,ml=203,ws=204,Rs=205,gl=206,_l=207,xl=208,vl=209,Ml=210,Sl=211,yl=212,El=213,bl=214,Cs=0,Ps=1,Ls=2,Si=3,Is=4,Ds=5,Us=6,Ns=7,ya=0,Tl=1,Al=2,Rn=0,wl=1,Rl=2,Cl=3,uc=4,Pl=5,Ll=6,Il=7,hc=300,yi=301,Ei=302,Fs=303,Os=304,Or=306,Ir=1e3,Yn=1001,Bs=1002,Ue=1003,Dl=1004,Qi=1005,Je=1006,Wr=1007,An=1008,mn=1009,fc=1010,dc=1011,Xi=1012,Ea=1013,$n=1014,Qe=1015,Yi=1016,ba=1017,Ta=1018,bi=1020,pc=35902,mc=1021,gc=1022,qe=1023,_c=1024,xc=1025,xi=1026,Ti=1027,Aa=1028,wa=1029,vc=1030,Ra=1031,Ca=1033,br=33776,Tr=33777,Ar=33778,wr=33779,zs=35840,Hs=35841,ks=35842,Gs=35843,Vs=36196,Ws=37492,Xs=37496,qs=37808,Ys=37809,$s=37810,Ks=37811,Zs=37812,js=37813,Js=37814,Qs=37815,ta=37816,ea=37817,na=37818,ia=37819,ra=37820,sa=37821,Rr=36492,aa=36494,oa=36495,Mc=36283,ca=36284,la=36285,ua=36286,Ul=3200,Nl=3201,Pa=0,Fl=1,Tn="",Ae="srgb",wi="srgb-linear",Br="linear",Jt="srgb",ti=7680,Ja=519,Ol=512,Bl=513,zl=514,Sc=515,Hl=516,kl=517,Gl=518,Vl=519,Qa=35044,to="300 es",hn=2e3,Dr=2001;class Ri{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const i=this._listeners;return i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const r=this._listeners[t];if(r!==void 0){const s=r.indexOf(e);s!==-1&&r.splice(s,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const i=this._listeners[t.type];if(i!==void 0){t.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,t);t.target=null}}}const _e=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Xr=Math.PI/180,ha=180/Math.PI;function $i(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(_e[n&255]+_e[n>>8&255]+_e[n>>16&255]+_e[n>>24&255]+"-"+_e[t&255]+_e[t>>8&255]+"-"+_e[t>>16&15|64]+_e[t>>24&255]+"-"+_e[e&63|128]+_e[e>>8&255]+"-"+_e[e>>16&255]+_e[e>>24&255]+_e[i&255]+_e[i>>8&255]+_e[i>>16&255]+_e[i>>24&255]).toLowerCase()}function we(n,t,e){return Math.max(t,Math.min(e,n))}function Wl(n,t){return(n%t+t)%t}function qr(n,t,e){return(1-e)*n+e*t}function Di(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Te(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}class qt{constructor(t=0,e=0){qt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6],this.y=r[1]*e+r[4]*i+r[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(we(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),r=Math.sin(e),s=this.x-t.x,a=this.y-t.y;return this.x=s*i-a*r+t.x,this.y=s*r+a*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Bt{constructor(t,e,i,r,s,a,o,c,u){Bt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,r,s,a,o,c,u)}set(t,e,i,r,s,a,o,c,u){const l=this.elements;return l[0]=t,l[1]=r,l[2]=o,l[3]=e,l[4]=s,l[5]=c,l[6]=i,l[7]=a,l[8]=u,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,r=e.elements,s=this.elements,a=i[0],o=i[3],c=i[6],u=i[1],l=i[4],f=i[7],h=i[2],p=i[5],g=i[8],_=r[0],m=r[3],d=r[6],A=r[1],b=r[4],M=r[7],D=r[2],w=r[5],C=r[8];return s[0]=a*_+o*A+c*D,s[3]=a*m+o*b+c*w,s[6]=a*d+o*M+c*C,s[1]=u*_+l*A+f*D,s[4]=u*m+l*b+f*w,s[7]=u*d+l*M+f*C,s[2]=h*_+p*A+g*D,s[5]=h*m+p*b+g*w,s[8]=h*d+p*M+g*C,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],r=t[2],s=t[3],a=t[4],o=t[5],c=t[6],u=t[7],l=t[8];return e*a*l-e*o*u-i*s*l+i*o*c+r*s*u-r*a*c}invert(){const t=this.elements,e=t[0],i=t[1],r=t[2],s=t[3],a=t[4],o=t[5],c=t[6],u=t[7],l=t[8],f=l*a-o*u,h=o*c-l*s,p=u*s-a*c,g=e*f+i*h+r*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=f*_,t[1]=(r*u-l*i)*_,t[2]=(o*i-r*a)*_,t[3]=h*_,t[4]=(l*e-r*c)*_,t[5]=(r*s-o*e)*_,t[6]=p*_,t[7]=(i*c-u*e)*_,t[8]=(a*e-i*s)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,r,s,a,o){const c=Math.cos(s),u=Math.sin(s);return this.set(i*c,i*u,-i*(c*a+u*o)+a+t,-r*u,r*c,-r*(-u*a+c*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(Yr.makeScale(t,e)),this}rotate(t){return this.premultiply(Yr.makeRotation(-t)),this}translate(t,e){return this.premultiply(Yr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let r=0;r<9;r++)if(e[r]!==i[r])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Yr=new Bt;function yc(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function Ur(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Xl(){const n=Ur("canvas");return n.style.display="block",n}const eo={};function Gi(n){n in eo||(eo[n]=!0,console.warn(n))}function ql(n,t,e){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:i()}}setTimeout(s,e)})}function Yl(n){const t=n.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function $l(n){const t=n.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Xt={enabled:!0,workingColorSpace:wi,spaces:{},convert:function(n,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===Jt&&(n.r=dn(n.r),n.g=dn(n.g),n.b=dn(n.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(n.applyMatrix3(this.spaces[t].toXYZ),n.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===Jt&&(n.r=vi(n.r),n.g=vi(n.g),n.b=vi(n.b))),n},fromWorkingColorSpace:function(n,t){return this.convert(n,this.workingColorSpace,t)},toWorkingColorSpace:function(n,t){return this.convert(n,t,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===Tn?Br:this.spaces[n].transfer},getLuminanceCoefficients:function(n,t=this.workingColorSpace){return n.fromArray(this.spaces[t].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,t,e){return n.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace}};function dn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function vi(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}const no=[.64,.33,.3,.6,.15,.06],io=[.2126,.7152,.0722],ro=[.3127,.329],so=new Bt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ao=new Bt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Xt.define({[wi]:{primaries:no,whitePoint:ro,transfer:Br,toXYZ:so,fromXYZ:ao,luminanceCoefficients:io,workingColorSpaceConfig:{unpackColorSpace:Ae},outputColorSpaceConfig:{drawingBufferColorSpace:Ae}},[Ae]:{primaries:no,whitePoint:ro,transfer:Jt,toXYZ:so,fromXYZ:ao,luminanceCoefficients:io,outputColorSpaceConfig:{drawingBufferColorSpace:Ae}}});let ei;class Kl{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{ei===void 0&&(ei=Ur("canvas")),ei.width=t.width,ei.height=t.height;const i=ei.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),e=ei}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Ur("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const r=i.getImageData(0,0,t.width,t.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=dn(s[a]/255)*255;return i.putImageData(r,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(dn(e[i]/255)*255):e[i]=dn(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Zl=0;class Ec{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Zl++}),this.uuid=$i(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push($r(r[a].image)):s.push($r(r[a]))}else s=$r(r);i.url=s}return e||(t.images[this.uuid]=i),i}}function $r(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Kl.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let jl=0;class Me extends Ri{constructor(t=Me.DEFAULT_IMAGE,e=Me.DEFAULT_MAPPING,i=Yn,r=Yn,s=Je,a=An,o=qe,c=mn,u=Me.DEFAULT_ANISOTROPY,l=Tn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:jl++}),this.uuid=$i(),this.name="",this.source=new Ec(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=u,this.format=o,this.internalFormat=null,this.type=c,this.offset=new qt(0,0),this.repeat=new qt(1,1),this.center=new qt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Bt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=l,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==hc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Ir:t.x=t.x-Math.floor(t.x);break;case Yn:t.x=t.x<0?0:1;break;case Bs:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Ir:t.y=t.y-Math.floor(t.y);break;case Yn:t.y=t.y<0?0:1;break;case Bs:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Me.DEFAULT_IMAGE=null;Me.DEFAULT_MAPPING=hc;Me.DEFAULT_ANISOTROPY=1;class te{constructor(t=0,e=0,i=0,r=1){te.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=r}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,r){return this.x=t,this.y=e,this.z=i,this.w=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,r=this.z,s=this.w,a=t.elements;return this.x=a[0]*e+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*e+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*e+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*e+a[7]*i+a[11]*r+a[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,r,s;const c=t.elements,u=c[0],l=c[4],f=c[8],h=c[1],p=c[5],g=c[9],_=c[2],m=c[6],d=c[10];if(Math.abs(l-h)<.01&&Math.abs(f-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(l+h)<.1&&Math.abs(f+_)<.1&&Math.abs(g+m)<.1&&Math.abs(u+p+d-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const b=(u+1)/2,M=(p+1)/2,D=(d+1)/2,w=(l+h)/4,C=(f+_)/4,I=(g+m)/4;return b>M&&b>D?b<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(b),r=w/i,s=C/i):M>D?M<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(M),i=w/r,s=I/r):D<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(D),i=C/s,r=I/s),this.set(i,r,s,e),this}let A=Math.sqrt((m-g)*(m-g)+(f-_)*(f-_)+(h-l)*(h-l));return Math.abs(A)<.001&&(A=1),this.x=(m-g)/A,this.y=(f-_)/A,this.z=(h-l)/A,this.w=Math.acos((u+p+d-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Jl extends Ri{constructor(t=1,e=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new te(0,0,t,e),this.scissorTest=!1,this.viewport=new te(0,0,t,e);const r={width:t,height:e,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Je,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const s=new Me(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);s.flipY=!1,s.generateMipmaps=i.generateMipmaps,s.internalFormat=i.internalFormat,this.textures=[];const a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=t,this.textures[r].image.height=e,this.textures[r].image.depth=i;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,r=t.textures.length;i<r;i++)this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Ec(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Kn extends Jl{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class bc extends Me{constructor(t=null,e=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:r},this.magFilter=Ue,this.minFilter=Ue,this.wrapR=Yn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Ql extends Me{constructor(t=null,e=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:r},this.magFilter=Ue,this.minFilter=Ue,this.wrapR=Yn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ln{constructor(t=0,e=0,i=0,r=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=r}static slerpFlat(t,e,i,r,s,a,o){let c=i[r+0],u=i[r+1],l=i[r+2],f=i[r+3];const h=s[a+0],p=s[a+1],g=s[a+2],_=s[a+3];if(o===0){t[e+0]=c,t[e+1]=u,t[e+2]=l,t[e+3]=f;return}if(o===1){t[e+0]=h,t[e+1]=p,t[e+2]=g,t[e+3]=_;return}if(f!==_||c!==h||u!==p||l!==g){let m=1-o;const d=c*h+u*p+l*g+f*_,A=d>=0?1:-1,b=1-d*d;if(b>Number.EPSILON){const D=Math.sqrt(b),w=Math.atan2(D,d*A);m=Math.sin(m*w)/D,o=Math.sin(o*w)/D}const M=o*A;if(c=c*m+h*M,u=u*m+p*M,l=l*m+g*M,f=f*m+_*M,m===1-o){const D=1/Math.sqrt(c*c+u*u+l*l+f*f);c*=D,u*=D,l*=D,f*=D}}t[e]=c,t[e+1]=u,t[e+2]=l,t[e+3]=f}static multiplyQuaternionsFlat(t,e,i,r,s,a){const o=i[r],c=i[r+1],u=i[r+2],l=i[r+3],f=s[a],h=s[a+1],p=s[a+2],g=s[a+3];return t[e]=o*g+l*f+c*p-u*h,t[e+1]=c*g+l*h+u*f-o*p,t[e+2]=u*g+l*p+o*h-c*f,t[e+3]=l*g-o*f-c*h-u*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,r){return this._x=t,this._y=e,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,r=t._y,s=t._z,a=t._order,o=Math.cos,c=Math.sin,u=o(i/2),l=o(r/2),f=o(s/2),h=c(i/2),p=c(r/2),g=c(s/2);switch(a){case"XYZ":this._x=h*l*f+u*p*g,this._y=u*p*f-h*l*g,this._z=u*l*g+h*p*f,this._w=u*l*f-h*p*g;break;case"YXZ":this._x=h*l*f+u*p*g,this._y=u*p*f-h*l*g,this._z=u*l*g-h*p*f,this._w=u*l*f+h*p*g;break;case"ZXY":this._x=h*l*f-u*p*g,this._y=u*p*f+h*l*g,this._z=u*l*g+h*p*f,this._w=u*l*f-h*p*g;break;case"ZYX":this._x=h*l*f-u*p*g,this._y=u*p*f+h*l*g,this._z=u*l*g-h*p*f,this._w=u*l*f+h*p*g;break;case"YZX":this._x=h*l*f+u*p*g,this._y=u*p*f+h*l*g,this._z=u*l*g-h*p*f,this._w=u*l*f-h*p*g;break;case"XZY":this._x=h*l*f-u*p*g,this._y=u*p*f-h*l*g,this._z=u*l*g+h*p*f,this._w=u*l*f+h*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,r=Math.sin(i);return this._x=t.x*r,this._y=t.y*r,this._z=t.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],r=e[4],s=e[8],a=e[1],o=e[5],c=e[9],u=e[2],l=e[6],f=e[10],h=i+o+f;if(h>0){const p=.5/Math.sqrt(h+1);this._w=.25/p,this._x=(l-c)*p,this._y=(s-u)*p,this._z=(a-r)*p}else if(i>o&&i>f){const p=2*Math.sqrt(1+i-o-f);this._w=(l-c)/p,this._x=.25*p,this._y=(r+a)/p,this._z=(s+u)/p}else if(o>f){const p=2*Math.sqrt(1+o-i-f);this._w=(s-u)/p,this._x=(r+a)/p,this._y=.25*p,this._z=(c+l)/p}else{const p=2*Math.sqrt(1+f-i-o);this._w=(a-r)/p,this._x=(s+u)/p,this._y=(c+l)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(we(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const r=Math.min(1,e/i);return this.slerp(t,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,r=t._y,s=t._z,a=t._w,o=e._x,c=e._y,u=e._z,l=e._w;return this._x=i*l+a*o+r*u-s*c,this._y=r*l+a*c+s*o-i*u,this._z=s*l+a*u+i*c-r*o,this._w=a*l-i*o-r*c-s*u,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const i=this._x,r=this._y,s=this._z,a=this._w;let o=a*t._w+i*t._x+r*t._y+s*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=i,this._y=r,this._z=s,this;const c=1-o*o;if(c<=Number.EPSILON){const p=1-e;return this._w=p*a+e*this._w,this._x=p*i+e*this._x,this._y=p*r+e*this._y,this._z=p*s+e*this._z,this.normalize(),this}const u=Math.sqrt(c),l=Math.atan2(u,o),f=Math.sin((1-e)*l)/u,h=Math.sin(e*l)/u;return this._w=a*f+this._w*h,this._x=i*f+this._x*h,this._y=r*f+this._y*h,this._z=s*f+this._z*h,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(t),r*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class U{constructor(t=0,e=0,i=0){U.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(oo.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(oo.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6]*r,this.y=s[1]*e+s[4]*i+s[7]*r,this.z=s[2]*e+s[5]*i+s[8]*r,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,r=this.z,s=t.elements,a=1/(s[3]*e+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*e+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*e+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*e+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(t){const e=this.x,i=this.y,r=this.z,s=t.x,a=t.y,o=t.z,c=t.w,u=2*(a*r-o*i),l=2*(o*e-s*r),f=2*(s*i-a*e);return this.x=e+c*u+a*f-o*l,this.y=i+c*l+o*u-s*f,this.z=r+c*f+s*l-a*u,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[4]*i+s[8]*r,this.y=s[1]*e+s[5]*i+s[9]*r,this.z=s[2]*e+s[6]*i+s[10]*r,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,r=t.y,s=t.z,a=e.x,o=e.y,c=e.z;return this.x=r*c-s*o,this.y=s*a-i*c,this.z=i*o-r*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Kr.copy(this).projectOnVector(t),this.sub(Kr)}reflect(t){return this.sub(Kr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(we(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,r=this.z-t.z;return e*e+i*i+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const r=Math.sin(e)*t;return this.x=r*Math.sin(i),this.y=Math.cos(e)*t,this.z=r*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),r=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=r,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Kr=new U,oo=new Ln;class Zn{constructor(t=new U(1/0,1/0,1/0),e=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(ke.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(ke.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=ke.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const s=i.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,ke):ke.fromBufferAttribute(s,a),ke.applyMatrix4(t.matrixWorld),this.expandByPoint(ke);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),tr.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),tr.copy(i.boundingBox)),tr.applyMatrix4(t.matrixWorld),this.union(tr)}const r=t.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,ke),ke.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Ui),er.subVectors(this.max,Ui),ni.subVectors(t.a,Ui),ii.subVectors(t.b,Ui),ri.subVectors(t.c,Ui),vn.subVectors(ii,ni),Mn.subVectors(ri,ii),Fn.subVectors(ni,ri);let e=[0,-vn.z,vn.y,0,-Mn.z,Mn.y,0,-Fn.z,Fn.y,vn.z,0,-vn.x,Mn.z,0,-Mn.x,Fn.z,0,-Fn.x,-vn.y,vn.x,0,-Mn.y,Mn.x,0,-Fn.y,Fn.x,0];return!Zr(e,ni,ii,ri,er)||(e=[1,0,0,0,1,0,0,0,1],!Zr(e,ni,ii,ri,er))?!1:(nr.crossVectors(vn,Mn),e=[nr.x,nr.y,nr.z],Zr(e,ni,ii,ri,er))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,ke).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(ke).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(sn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),sn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),sn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),sn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),sn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),sn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),sn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),sn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(sn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const sn=[new U,new U,new U,new U,new U,new U,new U,new U],ke=new U,tr=new Zn,ni=new U,ii=new U,ri=new U,vn=new U,Mn=new U,Fn=new U,Ui=new U,er=new U,nr=new U,On=new U;function Zr(n,t,e,i,r){for(let s=0,a=n.length-3;s<=a;s+=3){On.fromArray(n,s);const o=r.x*Math.abs(On.x)+r.y*Math.abs(On.y)+r.z*Math.abs(On.z),c=t.dot(On),u=e.dot(On),l=i.dot(On);if(Math.max(-Math.max(c,u,l),Math.min(c,u,l))>o)return!1}return!0}const tu=new Zn,Ni=new U,jr=new U;class Ci{constructor(t=new U,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):tu.setFromPoints(t).getCenter(i);let r=0;for(let s=0,a=t.length;s<a;s++)r=Math.max(r,i.distanceToSquared(t[s]));return this.radius=Math.sqrt(r),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ni.subVectors(t,this.center);const e=Ni.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),r=(i-this.radius)*.5;this.center.addScaledVector(Ni,r/i),this.radius+=r}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(jr.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ni.copy(t.center).add(jr)),this.expandByPoint(Ni.copy(t.center).sub(jr))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const an=new U,Jr=new U,ir=new U,Sn=new U,Qr=new U,rr=new U,ts=new U;class Tc{constructor(t=new U,e=new U(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,an)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=an.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(an.copy(this.origin).addScaledVector(this.direction,e),an.distanceToSquared(t))}distanceSqToSegment(t,e,i,r){Jr.copy(t).add(e).multiplyScalar(.5),ir.copy(e).sub(t).normalize(),Sn.copy(this.origin).sub(Jr);const s=t.distanceTo(e)*.5,a=-this.direction.dot(ir),o=Sn.dot(this.direction),c=-Sn.dot(ir),u=Sn.lengthSq(),l=Math.abs(1-a*a);let f,h,p,g;if(l>0)if(f=a*c-o,h=a*o-c,g=s*l,f>=0)if(h>=-g)if(h<=g){const _=1/l;f*=_,h*=_,p=f*(f+a*h+2*o)+h*(a*f+h+2*c)+u}else h=s,f=Math.max(0,-(a*h+o)),p=-f*f+h*(h+2*c)+u;else h=-s,f=Math.max(0,-(a*h+o)),p=-f*f+h*(h+2*c)+u;else h<=-g?(f=Math.max(0,-(-a*s+o)),h=f>0?-s:Math.min(Math.max(-s,-c),s),p=-f*f+h*(h+2*c)+u):h<=g?(f=0,h=Math.min(Math.max(-s,-c),s),p=h*(h+2*c)+u):(f=Math.max(0,-(a*s+o)),h=f>0?s:Math.min(Math.max(-s,-c),s),p=-f*f+h*(h+2*c)+u);else h=a>0?-s:s,f=Math.max(0,-(a*h+o)),p=-f*f+h*(h+2*c)+u;return i&&i.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(Jr).addScaledVector(ir,h),p}intersectSphere(t,e){an.subVectors(t.center,this.origin);const i=an.dot(this.direction),r=an.dot(an)-i*i,s=t.radius*t.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,c=i+a;return c<0?null:o<0?this.at(c,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,r,s,a,o,c;const u=1/this.direction.x,l=1/this.direction.y,f=1/this.direction.z,h=this.origin;return u>=0?(i=(t.min.x-h.x)*u,r=(t.max.x-h.x)*u):(i=(t.max.x-h.x)*u,r=(t.min.x-h.x)*u),l>=0?(s=(t.min.y-h.y)*l,a=(t.max.y-h.y)*l):(s=(t.max.y-h.y)*l,a=(t.min.y-h.y)*l),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),f>=0?(o=(t.min.z-h.z)*f,c=(t.max.z-h.z)*f):(o=(t.max.z-h.z)*f,c=(t.min.z-h.z)*f),i>c||o>r)||((o>i||i!==i)&&(i=o),(c<r||r!==r)&&(r=c),r<0)?null:this.at(i>=0?i:r,e)}intersectsBox(t){return this.intersectBox(t,an)!==null}intersectTriangle(t,e,i,r,s){Qr.subVectors(e,t),rr.subVectors(i,t),ts.crossVectors(Qr,rr);let a=this.direction.dot(ts),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Sn.subVectors(this.origin,t);const c=o*this.direction.dot(rr.crossVectors(Sn,rr));if(c<0)return null;const u=o*this.direction.dot(Qr.cross(Sn));if(u<0||c+u>a)return null;const l=-o*Sn.dot(ts);return l<0?null:this.at(l/a,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class $t{constructor(t,e,i,r,s,a,o,c,u,l,f,h,p,g,_,m){$t.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,r,s,a,o,c,u,l,f,h,p,g,_,m)}set(t,e,i,r,s,a,o,c,u,l,f,h,p,g,_,m){const d=this.elements;return d[0]=t,d[4]=e,d[8]=i,d[12]=r,d[1]=s,d[5]=a,d[9]=o,d[13]=c,d[2]=u,d[6]=l,d[10]=f,d[14]=h,d[3]=p,d[7]=g,d[11]=_,d[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new $t().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,i=t.elements,r=1/si.setFromMatrixColumn(t,0).length(),s=1/si.setFromMatrixColumn(t,1).length(),a=1/si.setFromMatrixColumn(t,2).length();return e[0]=i[0]*r,e[1]=i[1]*r,e[2]=i[2]*r,e[3]=0,e[4]=i[4]*s,e[5]=i[5]*s,e[6]=i[6]*s,e[7]=0,e[8]=i[8]*a,e[9]=i[9]*a,e[10]=i[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,r=t.y,s=t.z,a=Math.cos(i),o=Math.sin(i),c=Math.cos(r),u=Math.sin(r),l=Math.cos(s),f=Math.sin(s);if(t.order==="XYZ"){const h=a*l,p=a*f,g=o*l,_=o*f;e[0]=c*l,e[4]=-c*f,e[8]=u,e[1]=p+g*u,e[5]=h-_*u,e[9]=-o*c,e[2]=_-h*u,e[6]=g+p*u,e[10]=a*c}else if(t.order==="YXZ"){const h=c*l,p=c*f,g=u*l,_=u*f;e[0]=h+_*o,e[4]=g*o-p,e[8]=a*u,e[1]=a*f,e[5]=a*l,e[9]=-o,e[2]=p*o-g,e[6]=_+h*o,e[10]=a*c}else if(t.order==="ZXY"){const h=c*l,p=c*f,g=u*l,_=u*f;e[0]=h-_*o,e[4]=-a*f,e[8]=g+p*o,e[1]=p+g*o,e[5]=a*l,e[9]=_-h*o,e[2]=-a*u,e[6]=o,e[10]=a*c}else if(t.order==="ZYX"){const h=a*l,p=a*f,g=o*l,_=o*f;e[0]=c*l,e[4]=g*u-p,e[8]=h*u+_,e[1]=c*f,e[5]=_*u+h,e[9]=p*u-g,e[2]=-u,e[6]=o*c,e[10]=a*c}else if(t.order==="YZX"){const h=a*c,p=a*u,g=o*c,_=o*u;e[0]=c*l,e[4]=_-h*f,e[8]=g*f+p,e[1]=f,e[5]=a*l,e[9]=-o*l,e[2]=-u*l,e[6]=p*f+g,e[10]=h-_*f}else if(t.order==="XZY"){const h=a*c,p=a*u,g=o*c,_=o*u;e[0]=c*l,e[4]=-f,e[8]=u*l,e[1]=h*f+_,e[5]=a*l,e[9]=p*f-g,e[2]=g*f-p,e[6]=o*l,e[10]=_*f+h}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(eu,t,nu)}lookAt(t,e,i){const r=this.elements;return Pe.subVectors(t,e),Pe.lengthSq()===0&&(Pe.z=1),Pe.normalize(),yn.crossVectors(i,Pe),yn.lengthSq()===0&&(Math.abs(i.z)===1?Pe.x+=1e-4:Pe.z+=1e-4,Pe.normalize(),yn.crossVectors(i,Pe)),yn.normalize(),sr.crossVectors(Pe,yn),r[0]=yn.x,r[4]=sr.x,r[8]=Pe.x,r[1]=yn.y,r[5]=sr.y,r[9]=Pe.y,r[2]=yn.z,r[6]=sr.z,r[10]=Pe.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,r=e.elements,s=this.elements,a=i[0],o=i[4],c=i[8],u=i[12],l=i[1],f=i[5],h=i[9],p=i[13],g=i[2],_=i[6],m=i[10],d=i[14],A=i[3],b=i[7],M=i[11],D=i[15],w=r[0],C=r[4],I=r[8],E=r[12],S=r[1],P=r[5],X=r[9],k=r[13],K=r[2],Q=r[6],$=r[10],nt=r[14],q=r[3],ot=r[7],mt=r[11],v=r[15];return s[0]=a*w+o*S+c*K+u*q,s[4]=a*C+o*P+c*Q+u*ot,s[8]=a*I+o*X+c*$+u*mt,s[12]=a*E+o*k+c*nt+u*v,s[1]=l*w+f*S+h*K+p*q,s[5]=l*C+f*P+h*Q+p*ot,s[9]=l*I+f*X+h*$+p*mt,s[13]=l*E+f*k+h*nt+p*v,s[2]=g*w+_*S+m*K+d*q,s[6]=g*C+_*P+m*Q+d*ot,s[10]=g*I+_*X+m*$+d*mt,s[14]=g*E+_*k+m*nt+d*v,s[3]=A*w+b*S+M*K+D*q,s[7]=A*C+b*P+M*Q+D*ot,s[11]=A*I+b*X+M*$+D*mt,s[15]=A*E+b*k+M*nt+D*v,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],r=t[8],s=t[12],a=t[1],o=t[5],c=t[9],u=t[13],l=t[2],f=t[6],h=t[10],p=t[14],g=t[3],_=t[7],m=t[11],d=t[15];return g*(+s*c*f-r*u*f-s*o*h+i*u*h+r*o*p-i*c*p)+_*(+e*c*p-e*u*h+s*a*h-r*a*p+r*u*l-s*c*l)+m*(+e*u*f-e*o*p-s*a*f+i*a*p+s*o*l-i*u*l)+d*(-r*o*l-e*c*f+e*o*h+r*a*f-i*a*h+i*c*l)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const r=this.elements;return t.isVector3?(r[12]=t.x,r[13]=t.y,r[14]=t.z):(r[12]=t,r[13]=e,r[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],r=t[2],s=t[3],a=t[4],o=t[5],c=t[6],u=t[7],l=t[8],f=t[9],h=t[10],p=t[11],g=t[12],_=t[13],m=t[14],d=t[15],A=f*m*u-_*h*u+_*c*p-o*m*p-f*c*d+o*h*d,b=g*h*u-l*m*u-g*c*p+a*m*p+l*c*d-a*h*d,M=l*_*u-g*f*u+g*o*p-a*_*p-l*o*d+a*f*d,D=g*f*c-l*_*c-g*o*h+a*_*h+l*o*m-a*f*m,w=e*A+i*b+r*M+s*D;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const C=1/w;return t[0]=A*C,t[1]=(_*h*s-f*m*s-_*r*p+i*m*p+f*r*d-i*h*d)*C,t[2]=(o*m*s-_*c*s+_*r*u-i*m*u-o*r*d+i*c*d)*C,t[3]=(f*c*s-o*h*s-f*r*u+i*h*u+o*r*p-i*c*p)*C,t[4]=b*C,t[5]=(l*m*s-g*h*s+g*r*p-e*m*p-l*r*d+e*h*d)*C,t[6]=(g*c*s-a*m*s-g*r*u+e*m*u+a*r*d-e*c*d)*C,t[7]=(a*h*s-l*c*s+l*r*u-e*h*u-a*r*p+e*c*p)*C,t[8]=M*C,t[9]=(g*f*s-l*_*s-g*i*p+e*_*p+l*i*d-e*f*d)*C,t[10]=(a*_*s-g*o*s+g*i*u-e*_*u-a*i*d+e*o*d)*C,t[11]=(l*o*s-a*f*s-l*i*u+e*f*u+a*i*p-e*o*p)*C,t[12]=D*C,t[13]=(l*_*r-g*f*r+g*i*h-e*_*h-l*i*m+e*f*m)*C,t[14]=(g*o*r-a*_*r-g*i*c+e*_*c+a*i*m-e*o*m)*C,t[15]=(a*f*r-l*o*r+l*i*c-e*f*c-a*i*h+e*o*h)*C,this}scale(t){const e=this.elements,i=t.x,r=t.y,s=t.z;return e[0]*=i,e[4]*=r,e[8]*=s,e[1]*=i,e[5]*=r,e[9]*=s,e[2]*=i,e[6]*=r,e[10]*=s,e[3]*=i,e[7]*=r,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],r=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,r))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),r=Math.sin(e),s=1-i,a=t.x,o=t.y,c=t.z,u=s*a,l=s*o;return this.set(u*a+i,u*o-r*c,u*c+r*o,0,u*o+r*c,l*o+i,l*c-r*a,0,u*c-r*o,l*c+r*a,s*c*c+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,r,s,a){return this.set(1,i,s,0,t,1,a,0,e,r,1,0,0,0,0,1),this}compose(t,e,i){const r=this.elements,s=e._x,a=e._y,o=e._z,c=e._w,u=s+s,l=a+a,f=o+o,h=s*u,p=s*l,g=s*f,_=a*l,m=a*f,d=o*f,A=c*u,b=c*l,M=c*f,D=i.x,w=i.y,C=i.z;return r[0]=(1-(_+d))*D,r[1]=(p+M)*D,r[2]=(g-b)*D,r[3]=0,r[4]=(p-M)*w,r[5]=(1-(h+d))*w,r[6]=(m+A)*w,r[7]=0,r[8]=(g+b)*C,r[9]=(m-A)*C,r[10]=(1-(h+_))*C,r[11]=0,r[12]=t.x,r[13]=t.y,r[14]=t.z,r[15]=1,this}decompose(t,e,i){const r=this.elements;let s=si.set(r[0],r[1],r[2]).length();const a=si.set(r[4],r[5],r[6]).length(),o=si.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),t.x=r[12],t.y=r[13],t.z=r[14],Ge.copy(this);const u=1/s,l=1/a,f=1/o;return Ge.elements[0]*=u,Ge.elements[1]*=u,Ge.elements[2]*=u,Ge.elements[4]*=l,Ge.elements[5]*=l,Ge.elements[6]*=l,Ge.elements[8]*=f,Ge.elements[9]*=f,Ge.elements[10]*=f,e.setFromRotationMatrix(Ge),i.x=s,i.y=a,i.z=o,this}makePerspective(t,e,i,r,s,a,o=hn){const c=this.elements,u=2*s/(e-t),l=2*s/(i-r),f=(e+t)/(e-t),h=(i+r)/(i-r);let p,g;if(o===hn)p=-(a+s)/(a-s),g=-2*a*s/(a-s);else if(o===Dr)p=-a/(a-s),g=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=l,c[9]=h,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,i,r,s,a,o=hn){const c=this.elements,u=1/(e-t),l=1/(i-r),f=1/(a-s),h=(e+t)*u,p=(i+r)*l;let g,_;if(o===hn)g=(a+s)*f,_=-2*f;else if(o===Dr)g=s*f,_=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=2*u,c[4]=0,c[8]=0,c[12]=-h,c[1]=0,c[5]=2*l,c[9]=0,c[13]=-p,c[2]=0,c[6]=0,c[10]=_,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let r=0;r<16;r++)if(e[r]!==i[r])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const si=new U,Ge=new $t,eu=new U(0,0,0),nu=new U(1,1,1),yn=new U,sr=new U,Pe=new U,co=new $t,lo=new Ln;class Ne{constructor(t=0,e=0,i=0,r=Ne.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=r}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,r=this._order){return this._x=t,this._y=e,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const r=t.elements,s=r[0],a=r[4],o=r[8],c=r[1],u=r[5],l=r[9],f=r[2],h=r[6],p=r[10];switch(e){case"XYZ":this._y=Math.asin(we(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,p),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(h,u),this._z=0);break;case"YXZ":this._x=Math.asin(-we(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(c,u)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(we(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,p),this._z=Math.atan2(-a,u)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-we(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,p),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-a,u));break;case"YZX":this._z=Math.asin(we(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-l,u),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-we(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,u),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-l,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return co.makeRotationFromQuaternion(t),this.setFromRotationMatrix(co,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return lo.setFromEuler(this),this.setFromQuaternion(lo,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ne.DEFAULT_ORDER="XYZ";class Ac{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let iu=0;const uo=new U,ai=new Ln,on=new $t,ar=new U,Fi=new U,ru=new U,su=new Ln,ho=new U(1,0,0),fo=new U(0,1,0),po=new U(0,0,1),mo={type:"added"},au={type:"removed"},oi={type:"childadded",child:null},es={type:"childremoved",child:null};class de extends Ri{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:iu++}),this.uuid=$i(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=de.DEFAULT_UP.clone();const t=new U,e=new Ne,i=new Ln,r=new U(1,1,1);function s(){i.setFromEuler(e,!1)}function a(){e.setFromQuaternion(i,void 0,!1)}e._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new $t},normalMatrix:{value:new Bt}}),this.matrix=new $t,this.matrixWorld=new $t,this.matrixAutoUpdate=de.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=de.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ac,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return ai.setFromAxisAngle(t,e),this.quaternion.multiply(ai),this}rotateOnWorldAxis(t,e){return ai.setFromAxisAngle(t,e),this.quaternion.premultiply(ai),this}rotateX(t){return this.rotateOnAxis(ho,t)}rotateY(t){return this.rotateOnAxis(fo,t)}rotateZ(t){return this.rotateOnAxis(po,t)}translateOnAxis(t,e){return uo.copy(t).applyQuaternion(this.quaternion),this.position.add(uo.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(ho,t)}translateY(t){return this.translateOnAxis(fo,t)}translateZ(t){return this.translateOnAxis(po,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(on.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?ar.copy(t):ar.set(t,e,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Fi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?on.lookAt(Fi,ar,this.up):on.lookAt(ar,Fi,this.up),this.quaternion.setFromRotationMatrix(on),r&&(on.extractRotation(r.matrixWorld),ai.setFromRotationMatrix(on),this.quaternion.premultiply(ai.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(mo),oi.child=t,this.dispatchEvent(oi),oi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(au),es.child=t,this.dispatchEvent(es),es.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),on.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),on.multiply(t.parent.matrixWorld)),t.applyMatrix4(on),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(mo),oi.child=t,this.dispatchEvent(oi),oi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Fi,t,ru),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Fi,su,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,r=e.length;i<r;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,r=e.length;i<r;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,r=e.length;i<r;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let u=0,l=c.length;u<l;u++){const f=c[u];s(t.shapes,f)}else s(t.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,u=this.material.length;c<u;c++)o.push(s(t.materials,this.material[c]));r.material=o}else r.material=s(t.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];r.animations.push(s(t.animations,c))}}if(e){const o=a(t.geometries),c=a(t.materials),u=a(t.textures),l=a(t.images),f=a(t.shapes),h=a(t.skeletons),p=a(t.animations),g=a(t.nodes);o.length>0&&(i.geometries=o),c.length>0&&(i.materials=c),u.length>0&&(i.textures=u),l.length>0&&(i.images=l),f.length>0&&(i.shapes=f),h.length>0&&(i.skeletons=h),p.length>0&&(i.animations=p),g.length>0&&(i.nodes=g)}return i.object=r,i;function a(o){const c=[];for(const u in o){const l=o[u];delete l.metadata,c.push(l)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const r=t.children[i];this.add(r.clone())}return this}}de.DEFAULT_UP=new U(0,1,0);de.DEFAULT_MATRIX_AUTO_UPDATE=!0;de.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Ve=new U,cn=new U,ns=new U,ln=new U,ci=new U,li=new U,go=new U,is=new U,rs=new U,ss=new U,as=new te,os=new te,cs=new te;class Xe{constructor(t=new U,e=new U,i=new U){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,r){r.subVectors(i,e),Ve.subVectors(t,e),r.cross(Ve);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(t,e,i,r,s){Ve.subVectors(r,e),cn.subVectors(i,e),ns.subVectors(t,e);const a=Ve.dot(Ve),o=Ve.dot(cn),c=Ve.dot(ns),u=cn.dot(cn),l=cn.dot(ns),f=a*u-o*o;if(f===0)return s.set(0,0,0),null;const h=1/f,p=(u*c-o*l)*h,g=(a*l-o*c)*h;return s.set(1-p-g,g,p)}static containsPoint(t,e,i,r){return this.getBarycoord(t,e,i,r,ln)===null?!1:ln.x>=0&&ln.y>=0&&ln.x+ln.y<=1}static getInterpolation(t,e,i,r,s,a,o,c){return this.getBarycoord(t,e,i,r,ln)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,ln.x),c.addScaledVector(a,ln.y),c.addScaledVector(o,ln.z),c)}static getInterpolatedAttribute(t,e,i,r,s,a){return as.setScalar(0),os.setScalar(0),cs.setScalar(0),as.fromBufferAttribute(t,e),os.fromBufferAttribute(t,i),cs.fromBufferAttribute(t,r),a.setScalar(0),a.addScaledVector(as,s.x),a.addScaledVector(os,s.y),a.addScaledVector(cs,s.z),a}static isFrontFacing(t,e,i,r){return Ve.subVectors(i,e),cn.subVectors(t,e),Ve.cross(cn).dot(r)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,r){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[r]),this}setFromAttributeAndIndices(t,e,i,r){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,r),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Ve.subVectors(this.c,this.b),cn.subVectors(this.a,this.b),Ve.cross(cn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Xe.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Xe.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,r,s){return Xe.getInterpolation(t,this.a,this.b,this.c,e,i,r,s)}containsPoint(t){return Xe.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Xe.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,r=this.b,s=this.c;let a,o;ci.subVectors(r,i),li.subVectors(s,i),is.subVectors(t,i);const c=ci.dot(is),u=li.dot(is);if(c<=0&&u<=0)return e.copy(i);rs.subVectors(t,r);const l=ci.dot(rs),f=li.dot(rs);if(l>=0&&f<=l)return e.copy(r);const h=c*f-l*u;if(h<=0&&c>=0&&l<=0)return a=c/(c-l),e.copy(i).addScaledVector(ci,a);ss.subVectors(t,s);const p=ci.dot(ss),g=li.dot(ss);if(g>=0&&p<=g)return e.copy(s);const _=p*u-c*g;if(_<=0&&u>=0&&g<=0)return o=u/(u-g),e.copy(i).addScaledVector(li,o);const m=l*g-p*f;if(m<=0&&f-l>=0&&p-g>=0)return go.subVectors(s,r),o=(f-l)/(f-l+(p-g)),e.copy(r).addScaledVector(go,o);const d=1/(m+_+h);return a=_*d,o=h*d,e.copy(i).addScaledVector(ci,a).addScaledVector(li,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const wc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},En={h:0,s:0,l:0},or={h:0,s:0,l:0};function ls(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class Lt{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const r=t;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ae){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Xt.toWorkingColorSpace(this,e),this}setRGB(t,e,i,r=Xt.workingColorSpace){return this.r=t,this.g=e,this.b=i,Xt.toWorkingColorSpace(this,r),this}setHSL(t,e,i,r=Xt.workingColorSpace){if(t=Wl(t,1),e=we(e,0,1),i=we(i,0,1),e===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+e):i+e-i*e,a=2*i-s;this.r=ls(a,s,t+1/3),this.g=ls(a,s,t),this.b=ls(a,s,t-1/3)}return Xt.toWorkingColorSpace(this,r),this}setStyle(t,e=Ae){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(s,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ae){const i=wc[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=dn(t.r),this.g=dn(t.g),this.b=dn(t.b),this}copyLinearToSRGB(t){return this.r=vi(t.r),this.g=vi(t.g),this.b=vi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ae){return Xt.fromWorkingColorSpace(xe.copy(this),t),Math.round(we(xe.r*255,0,255))*65536+Math.round(we(xe.g*255,0,255))*256+Math.round(we(xe.b*255,0,255))}getHexString(t=Ae){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Xt.workingColorSpace){Xt.fromWorkingColorSpace(xe.copy(this),e);const i=xe.r,r=xe.g,s=xe.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let c,u;const l=(o+a)/2;if(o===a)c=0,u=0;else{const f=a-o;switch(u=l<=.5?f/(a+o):f/(2-a-o),a){case i:c=(r-s)/f+(r<s?6:0);break;case r:c=(s-i)/f+2;break;case s:c=(i-r)/f+4;break}c/=6}return t.h=c,t.s=u,t.l=l,t}getRGB(t,e=Xt.workingColorSpace){return Xt.fromWorkingColorSpace(xe.copy(this),e),t.r=xe.r,t.g=xe.g,t.b=xe.b,t}getStyle(t=Ae){Xt.fromWorkingColorSpace(xe.copy(this),t);const e=xe.r,i=xe.g,r=xe.b;return t!==Ae?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(t,e,i){return this.getHSL(En),this.setHSL(En.h+t,En.s+e,En.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(En),t.getHSL(or);const i=qr(En.h,or.h,e),r=qr(En.s,or.s,e),s=qr(En.l,or.l,e);return this.setHSL(i,r,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,r=this.b,s=t.elements;return this.r=s[0]*e+s[3]*i+s[6]*r,this.g=s[1]*e+s[4]*i+s[7]*r,this.b=s[2]*e+s[5]*i+s[8]*r,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const xe=new Lt;Lt.NAMES=wc;let ou=0;class jn extends Ri{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ou++}),this.uuid=$i(),this.name="",this.blending=_i,this.side=Cn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ws,this.blendDst=Rs,this.blendEquation=Xn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Lt(0,0,0),this.blendAlpha=0,this.depthFunc=Si,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ja,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ti,this.stencilZFail=ti,this.stencilZPass=ti,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const r=this[e];if(r===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==_i&&(i.blending=this.blending),this.side!==Cn&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==ws&&(i.blendSrc=this.blendSrc),this.blendDst!==Rs&&(i.blendDst=this.blendDst),this.blendEquation!==Xn&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Si&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ja&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ti&&(i.stencilFail=this.stencilFail),this.stencilZFail!==ti&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==ti&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const c=s[o];delete c.metadata,a.push(c)}return a}if(e){const s=r(t.textures),a=r(t.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const r=e.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=e[s].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Pn extends jn{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new Lt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ne,this.combine=ya,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const ce=new U,cr=new qt;class Ee{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=Qa,this.updateRanges=[],this.gpuType=Qe,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[t+r]=e.array[i+r];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)cr.fromBufferAttribute(this,e),cr.applyMatrix3(t),this.setXY(e,cr.x,cr.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)ce.fromBufferAttribute(this,e),ce.applyMatrix3(t),this.setXYZ(e,ce.x,ce.y,ce.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)ce.fromBufferAttribute(this,e),ce.applyMatrix4(t),this.setXYZ(e,ce.x,ce.y,ce.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)ce.fromBufferAttribute(this,e),ce.applyNormalMatrix(t),this.setXYZ(e,ce.x,ce.y,ce.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)ce.fromBufferAttribute(this,e),ce.transformDirection(t),this.setXYZ(e,ce.x,ce.y,ce.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=Di(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=Te(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Di(e,this.array)),e}setX(t,e){return this.normalized&&(e=Te(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Di(e,this.array)),e}setY(t,e){return this.normalized&&(e=Te(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Di(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Te(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Di(e,this.array)),e}setW(t,e){return this.normalized&&(e=Te(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=Te(e,this.array),i=Te(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,r){return t*=this.itemSize,this.normalized&&(e=Te(e,this.array),i=Te(i,this.array),r=Te(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=r,this}setXYZW(t,e,i,r,s){return t*=this.itemSize,this.normalized&&(e=Te(e,this.array),i=Te(i,this.array),r=Te(r,this.array),s=Te(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=r,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Qa&&(t.usage=this.usage),t}}class Rc extends Ee{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class Cc extends Ee{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class le extends Ee{constructor(t,e,i){super(new Float32Array(t),e,i)}}let cu=0;const Oe=new $t,us=new de,ui=new U,Le=new Zn,Oi=new Zn,fe=new U;class Re extends Ri{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:cu++}),this.uuid=$i(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(yc(t)?Cc:Rc)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Bt().getNormalMatrix(t);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(t),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Oe.makeRotationFromQuaternion(t),this.applyMatrix4(Oe),this}rotateX(t){return Oe.makeRotationX(t),this.applyMatrix4(Oe),this}rotateY(t){return Oe.makeRotationY(t),this.applyMatrix4(Oe),this}rotateZ(t){return Oe.makeRotationZ(t),this.applyMatrix4(Oe),this}translate(t,e,i){return Oe.makeTranslation(t,e,i),this.applyMatrix4(Oe),this}scale(t,e,i){return Oe.makeScale(t,e,i),this.applyMatrix4(Oe),this}lookAt(t){return us.lookAt(t),us.updateMatrix(),this.applyMatrix4(us.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ui).negate(),this.translate(ui.x,ui.y,ui.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const i=[];for(let r=0,s=t.length;r<s;r++){const a=t[r];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new le(i,3))}else{for(let i=0,r=e.count;i<r;i++){const s=t[i];e.setXYZ(i,s.x,s.y,s.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Zn);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,r=e.length;i<r;i++){const s=e[i];Le.setFromBufferAttribute(s),this.morphTargetsRelative?(fe.addVectors(this.boundingBox.min,Le.min),this.boundingBox.expandByPoint(fe),fe.addVectors(this.boundingBox.max,Le.max),this.boundingBox.expandByPoint(fe)):(this.boundingBox.expandByPoint(Le.min),this.boundingBox.expandByPoint(Le.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ci);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new U,1/0);return}if(t){const i=this.boundingSphere.center;if(Le.setFromBufferAttribute(t),e)for(let s=0,a=e.length;s<a;s++){const o=e[s];Oi.setFromBufferAttribute(o),this.morphTargetsRelative?(fe.addVectors(Le.min,Oi.min),Le.expandByPoint(fe),fe.addVectors(Le.max,Oi.max),Le.expandByPoint(fe)):(Le.expandByPoint(Oi.min),Le.expandByPoint(Oi.max))}Le.getCenter(i);let r=0;for(let s=0,a=t.count;s<a;s++)fe.fromBufferAttribute(t,s),r=Math.max(r,i.distanceToSquared(fe));if(e)for(let s=0,a=e.length;s<a;s++){const o=e[s],c=this.morphTargetsRelative;for(let u=0,l=o.count;u<l;u++)fe.fromBufferAttribute(o,u),c&&(ui.fromBufferAttribute(t,u),fe.add(ui)),r=Math.max(r,i.distanceToSquared(fe))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,r=e.normal,s=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ee(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),o=[],c=[];for(let I=0;I<i.count;I++)o[I]=new U,c[I]=new U;const u=new U,l=new U,f=new U,h=new qt,p=new qt,g=new qt,_=new U,m=new U;function d(I,E,S){u.fromBufferAttribute(i,I),l.fromBufferAttribute(i,E),f.fromBufferAttribute(i,S),h.fromBufferAttribute(s,I),p.fromBufferAttribute(s,E),g.fromBufferAttribute(s,S),l.sub(u),f.sub(u),p.sub(h),g.sub(h);const P=1/(p.x*g.y-g.x*p.y);isFinite(P)&&(_.copy(l).multiplyScalar(g.y).addScaledVector(f,-p.y).multiplyScalar(P),m.copy(f).multiplyScalar(p.x).addScaledVector(l,-g.x).multiplyScalar(P),o[I].add(_),o[E].add(_),o[S].add(_),c[I].add(m),c[E].add(m),c[S].add(m))}let A=this.groups;A.length===0&&(A=[{start:0,count:t.count}]);for(let I=0,E=A.length;I<E;++I){const S=A[I],P=S.start,X=S.count;for(let k=P,K=P+X;k<K;k+=3)d(t.getX(k+0),t.getX(k+1),t.getX(k+2))}const b=new U,M=new U,D=new U,w=new U;function C(I){D.fromBufferAttribute(r,I),w.copy(D);const E=o[I];b.copy(E),b.sub(D.multiplyScalar(D.dot(E))).normalize(),M.crossVectors(w,E);const P=M.dot(c[I])<0?-1:1;a.setXYZW(I,b.x,b.y,b.z,P)}for(let I=0,E=A.length;I<E;++I){const S=A[I],P=S.start,X=S.count;for(let k=P,K=P+X;k<K;k+=3)C(t.getX(k+0)),C(t.getX(k+1)),C(t.getX(k+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Ee(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let h=0,p=i.count;h<p;h++)i.setXYZ(h,0,0,0);const r=new U,s=new U,a=new U,o=new U,c=new U,u=new U,l=new U,f=new U;if(t)for(let h=0,p=t.count;h<p;h+=3){const g=t.getX(h+0),_=t.getX(h+1),m=t.getX(h+2);r.fromBufferAttribute(e,g),s.fromBufferAttribute(e,_),a.fromBufferAttribute(e,m),l.subVectors(a,s),f.subVectors(r,s),l.cross(f),o.fromBufferAttribute(i,g),c.fromBufferAttribute(i,_),u.fromBufferAttribute(i,m),o.add(l),c.add(l),u.add(l),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(_,c.x,c.y,c.z),i.setXYZ(m,u.x,u.y,u.z)}else for(let h=0,p=e.count;h<p;h+=3)r.fromBufferAttribute(e,h+0),s.fromBufferAttribute(e,h+1),a.fromBufferAttribute(e,h+2),l.subVectors(a,s),f.subVectors(r,s),l.cross(f),i.setXYZ(h+0,l.x,l.y,l.z),i.setXYZ(h+1,l.x,l.y,l.z),i.setXYZ(h+2,l.x,l.y,l.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)fe.fromBufferAttribute(t,e),fe.normalize(),t.setXYZ(e,fe.x,fe.y,fe.z)}toNonIndexed(){function t(o,c){const u=o.array,l=o.itemSize,f=o.normalized,h=new u.constructor(c.length*l);let p=0,g=0;for(let _=0,m=c.length;_<m;_++){o.isInterleavedBufferAttribute?p=c[_]*o.data.stride+o.offset:p=c[_]*l;for(let d=0;d<l;d++)h[g++]=u[p++]}return new Ee(h,l,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Re,i=this.index.array,r=this.attributes;for(const o in r){const c=r[o],u=t(c,i);e.setAttribute(o,u)}const s=this.morphAttributes;for(const o in s){const c=[],u=s[o];for(let l=0,f=u.length;l<f;l++){const h=u[l],p=t(h,i);c.push(p)}e.morphAttributes[o]=c}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const u=a[o];e.addGroup(u.start,u.count,u.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const u in c)c[u]!==void 0&&(t[u]=c[u]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const c in i){const u=i[c];t.data.attributes[c]=u.toJSON(t.data)}const r={};let s=!1;for(const c in this.morphAttributes){const u=this.morphAttributes[c],l=[];for(let f=0,h=u.length;f<h;f++){const p=u[f];l.push(p.toJSON(t.data))}l.length>0&&(r[c]=l,s=!0)}s&&(t.data.morphAttributes=r,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone(e));const r=t.attributes;for(const u in r){const l=r[u];this.setAttribute(u,l.clone(e))}const s=t.morphAttributes;for(const u in s){const l=[],f=s[u];for(let h=0,p=f.length;h<p;h++)l.push(f[h].clone(e));this.morphAttributes[u]=l}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let u=0,l=a.length;u<l;u++){const f=a[u];this.addGroup(f.start,f.count,f.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const _o=new $t,Bn=new Tc,lr=new Ci,xo=new U,ur=new U,hr=new U,fr=new U,hs=new U,dr=new U,vo=new U,pr=new U;class Qt extends de{constructor(t=new Re,e=new Pn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const r=e[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(t,e){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;e.fromBufferAttribute(r,t);const o=this.morphTargetInfluences;if(s&&o){dr.set(0,0,0);for(let c=0,u=s.length;c<u;c++){const l=o[c],f=s[c];l!==0&&(hs.fromBufferAttribute(f,t),a?dr.addScaledVector(hs,l):dr.addScaledVector(hs.sub(e),l))}e.add(dr)}return e}raycast(t,e){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),lr.copy(i.boundingSphere),lr.applyMatrix4(s),Bn.copy(t.ray).recast(t.near),!(lr.containsPoint(Bn.origin)===!1&&(Bn.intersectSphere(lr,xo)===null||Bn.origin.distanceToSquared(xo)>(t.far-t.near)**2))&&(_o.copy(s).invert(),Bn.copy(t.ray).applyMatrix4(_o),!(i.boundingBox!==null&&Bn.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,Bn)))}_computeIntersections(t,e,i){let r;const s=this.geometry,a=this.material,o=s.index,c=s.attributes.position,u=s.attributes.uv,l=s.attributes.uv1,f=s.attributes.normal,h=s.groups,p=s.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=h.length;g<_;g++){const m=h[g],d=a[m.materialIndex],A=Math.max(m.start,p.start),b=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let M=A,D=b;M<D;M+=3){const w=o.getX(M),C=o.getX(M+1),I=o.getX(M+2);r=mr(this,d,t,i,u,l,f,w,C,I),r&&(r.faceIndex=Math.floor(M/3),r.face.materialIndex=m.materialIndex,e.push(r))}}else{const g=Math.max(0,p.start),_=Math.min(o.count,p.start+p.count);for(let m=g,d=_;m<d;m+=3){const A=o.getX(m),b=o.getX(m+1),M=o.getX(m+2);r=mr(this,a,t,i,u,l,f,A,b,M),r&&(r.faceIndex=Math.floor(m/3),e.push(r))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,_=h.length;g<_;g++){const m=h[g],d=a[m.materialIndex],A=Math.max(m.start,p.start),b=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let M=A,D=b;M<D;M+=3){const w=M,C=M+1,I=M+2;r=mr(this,d,t,i,u,l,f,w,C,I),r&&(r.faceIndex=Math.floor(M/3),r.face.materialIndex=m.materialIndex,e.push(r))}}else{const g=Math.max(0,p.start),_=Math.min(c.count,p.start+p.count);for(let m=g,d=_;m<d;m+=3){const A=m,b=m+1,M=m+2;r=mr(this,a,t,i,u,l,f,A,b,M),r&&(r.faceIndex=Math.floor(m/3),e.push(r))}}}}function lu(n,t,e,i,r,s,a,o){let c;if(t.side===ve?c=i.intersectTriangle(a,s,r,!0,o):c=i.intersectTriangle(r,s,a,t.side===Cn,o),c===null)return null;pr.copy(o),pr.applyMatrix4(n.matrixWorld);const u=e.ray.origin.distanceTo(pr);return u<e.near||u>e.far?null:{distance:u,point:pr.clone(),object:n}}function mr(n,t,e,i,r,s,a,o,c,u){n.getVertexPosition(o,ur),n.getVertexPosition(c,hr),n.getVertexPosition(u,fr);const l=lu(n,t,e,i,ur,hr,fr,vo);if(l){const f=new U;Xe.getBarycoord(vo,ur,hr,fr,f),r&&(l.uv=Xe.getInterpolatedAttribute(r,o,c,u,f,new qt)),s&&(l.uv1=Xe.getInterpolatedAttribute(s,o,c,u,f,new qt)),a&&(l.normal=Xe.getInterpolatedAttribute(a,o,c,u,f,new U),l.normal.dot(i.direction)>0&&l.normal.multiplyScalar(-1));const h={a:o,b:c,c:u,normal:new U,materialIndex:0};Xe.getNormal(ur,hr,fr,h.normal),l.face=h,l.barycoord=f}return l}class In extends Re{constructor(t=1,e=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const c=[],u=[],l=[],f=[];let h=0,p=0;g("z","y","x",-1,-1,i,e,t,a,s,0),g("z","y","x",1,-1,i,e,-t,a,s,1),g("x","z","y",1,1,t,i,e,r,a,2),g("x","z","y",1,-1,t,i,-e,r,a,3),g("x","y","z",1,-1,t,e,i,r,s,4),g("x","y","z",-1,-1,t,e,-i,r,s,5),this.setIndex(c),this.setAttribute("position",new le(u,3)),this.setAttribute("normal",new le(l,3)),this.setAttribute("uv",new le(f,2));function g(_,m,d,A,b,M,D,w,C,I,E){const S=M/C,P=D/I,X=M/2,k=D/2,K=w/2,Q=C+1,$=I+1;let nt=0,q=0;const ot=new U;for(let mt=0;mt<$;mt++){const v=mt*P-k;for(let L=0;L<Q;L++){const H=L*S-X;ot[_]=H*A,ot[m]=v*b,ot[d]=K,u.push(ot.x,ot.y,ot.z),ot[_]=0,ot[m]=0,ot[d]=w>0?1:-1,l.push(ot.x,ot.y,ot.z),f.push(L/C),f.push(1-mt/I),nt+=1}}for(let mt=0;mt<I;mt++)for(let v=0;v<C;v++){const L=h+v+Q*mt,H=h+v+Q*(mt+1),R=h+(v+1)+Q*(mt+1),O=h+(v+1)+Q*mt;c.push(L,H,O),c.push(H,R,O),q+=6}o.addGroup(p,q,E),p+=q,h+=nt}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new In(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Ai(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const r=n[e][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=r.clone():Array.isArray(r)?t[e][i]=r.slice():t[e][i]=r}}return t}function Se(n){const t={};for(let e=0;e<n.length;e++){const i=Ai(n[e]);for(const r in i)t[r]=i[r]}return t}function uu(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function Pc(n){const t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Xt.workingColorSpace}const hu={clone:Ai,merge:Se};var fu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,du=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class $e extends jn{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=fu,this.fragmentShader=du,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ai(t.uniforms),this.uniformsGroups=uu(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?e.uniforms[r]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[r]={type:"m4",value:a.toArray()}:e.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class Lc extends de{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new $t,this.projectionMatrix=new $t,this.projectionMatrixInverse=new $t,this.coordinateSystem=hn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const bn=new U,Mo=new qt,So=new qt;class Ie extends Lc{constructor(t=50,e=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=ha*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Xr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ha*2*Math.atan(Math.tan(Xr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){bn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(bn.x,bn.y).multiplyScalar(-t/bn.z),bn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(bn.x,bn.y).multiplyScalar(-t/bn.z)}getViewSize(t,e){return this.getViewBounds(t,Mo,So),e.subVectors(So,Mo)}setViewOffset(t,e,i,r,s,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Xr*.5*this.fov)/this.zoom,i=2*e,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,u=a.fullHeight;s+=a.offsetX*r/c,e-=a.offsetY*i/u,r*=a.width/c,i*=a.height/u}const o=this.filmOffset;o!==0&&(s+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const hi=-90,fi=1;class pu extends de{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Ie(hi,fi,t,e);r.layers=this.layers,this.add(r);const s=new Ie(hi,fi,t,e);s.layers=this.layers,this.add(s);const a=new Ie(hi,fi,t,e);a.layers=this.layers,this.add(a);const o=new Ie(hi,fi,t,e);o.layers=this.layers,this.add(o);const c=new Ie(hi,fi,t,e);c.layers=this.layers,this.add(c);const u=new Ie(hi,fi,t,e);u.layers=this.layers,this.add(u)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,r,s,a,o,c]=e;for(const u of e)this.remove(u);if(t===hn)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Dr)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const u of e)this.add(u),u.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,c,u,l]=this.children,f=t.getRenderTarget(),h=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,r),t.render(e,s),t.setRenderTarget(i,1,r),t.render(e,a),t.setRenderTarget(i,2,r),t.render(e,o),t.setRenderTarget(i,3,r),t.render(e,c),t.setRenderTarget(i,4,r),t.render(e,u),i.texture.generateMipmaps=_,t.setRenderTarget(i,5,r),t.render(e,l),t.setRenderTarget(f,h,p),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class Ic extends Me{constructor(t,e,i,r,s,a,o,c,u,l){t=t!==void 0?t:[],e=e!==void 0?e:yi,super(t,e,i,r,s,a,o,c,u,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class mu extends Kn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},r=[i,i,i,i,i,i];this.texture=new Ic(r,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Je}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new In(5,5,5),s=new $e({name:"CubemapFromEquirect",uniforms:Ai(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:ve,blending:wn});s.uniforms.tEquirect.value=e;const a=new Qt(r,s),o=e.minFilter;return e.minFilter===An&&(e.minFilter=Je),new pu(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,i,r){const s=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,i,r);t.setRenderTarget(s)}}const fs=new U,gu=new U,_u=new Bt;class Vn{constructor(t=new U(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,r){return this.normal.set(t,e,i),this.constant=r,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const r=fs.subVectors(i,e).cross(gu.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(r,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const i=t.delta(fs),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:e.copy(t.start).addScaledVector(i,s)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||_u.getNormalMatrix(t),r=this.coplanarPoint(fs).applyMatrix4(t),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const zn=new Ci,gr=new U;class La{constructor(t=new Vn,e=new Vn,i=new Vn,r=new Vn,s=new Vn,a=new Vn){this.planes=[t,e,i,r,s,a]}set(t,e,i,r,s,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=hn){const i=this.planes,r=t.elements,s=r[0],a=r[1],o=r[2],c=r[3],u=r[4],l=r[5],f=r[6],h=r[7],p=r[8],g=r[9],_=r[10],m=r[11],d=r[12],A=r[13],b=r[14],M=r[15];if(i[0].setComponents(c-s,h-u,m-p,M-d).normalize(),i[1].setComponents(c+s,h+u,m+p,M+d).normalize(),i[2].setComponents(c+a,h+l,m+g,M+A).normalize(),i[3].setComponents(c-a,h-l,m-g,M-A).normalize(),i[4].setComponents(c-o,h-f,m-_,M-b).normalize(),e===hn)i[5].setComponents(c+o,h+f,m+_,M+b).normalize();else if(e===Dr)i[5].setComponents(o,f,_,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),zn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),zn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(zn)}intersectsSprite(t){return zn.center.set(0,0,0),zn.radius=.7071067811865476,zn.applyMatrix4(t.matrixWorld),this.intersectsSphere(zn)}intersectsSphere(t){const e=this.planes,i=t.center,r=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const r=e[i];if(gr.x=r.normal.x>0?t.max.x:t.min.x,gr.y=r.normal.y>0?t.max.y:t.min.y,gr.z=r.normal.z>0?t.max.z:t.min.z,r.distanceToPoint(gr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Dc(){let n=null,t=!1,e=null,i=null;function r(s,a){e(s,a),i=n.requestAnimationFrame(r)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(r),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){n=s}}}function xu(n){const t=new WeakMap;function e(o,c){const u=o.array,l=o.usage,f=u.byteLength,h=n.createBuffer();n.bindBuffer(c,h),n.bufferData(c,u,l),o.onUploadCallback();let p;if(u instanceof Float32Array)p=n.FLOAT;else if(u instanceof Uint16Array)o.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(u instanceof Int16Array)p=n.SHORT;else if(u instanceof Uint32Array)p=n.UNSIGNED_INT;else if(u instanceof Int32Array)p=n.INT;else if(u instanceof Int8Array)p=n.BYTE;else if(u instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:h,type:p,bytesPerElement:u.BYTES_PER_ELEMENT,version:o.version,size:f}}function i(o,c,u){const l=c.array,f=c.updateRanges;if(n.bindBuffer(u,o),f.length===0)n.bufferSubData(u,0,l);else{f.sort((p,g)=>p.start-g.start);let h=0;for(let p=1;p<f.length;p++){const g=f[h],_=f[p];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++h,f[h]=_)}f.length=h+1;for(let p=0,g=f.length;p<g;p++){const _=f[p];n.bufferSubData(u,_.start*l.BYTES_PER_ELEMENT,l,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=t.get(o);c&&(n.deleteBuffer(c.buffer),t.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const l=t.get(o);(!l||l.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const u=t.get(o);if(u===void 0)t.set(o,e(o,c));else if(u.version<o.version){if(u.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(u.buffer,o,c),u.version=o.version}}return{get:r,remove:s,update:a}}class pn extends Re{constructor(t=1,e=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:r};const s=t/2,a=e/2,o=Math.floor(i),c=Math.floor(r),u=o+1,l=c+1,f=t/o,h=e/c,p=[],g=[],_=[],m=[];for(let d=0;d<l;d++){const A=d*h-a;for(let b=0;b<u;b++){const M=b*f-s;g.push(M,-A,0),_.push(0,0,1),m.push(b/o),m.push(1-d/c)}}for(let d=0;d<c;d++)for(let A=0;A<o;A++){const b=A+u*d,M=A+u*(d+1),D=A+1+u*(d+1),w=A+1+u*d;p.push(b,M,w),p.push(M,D,w)}this.setIndex(p),this.setAttribute("position",new le(g,3)),this.setAttribute("normal",new le(_,3)),this.setAttribute("uv",new le(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new pn(t.width,t.height,t.widthSegments,t.heightSegments)}}var vu=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Mu=`#ifdef USE_ALPHAHASH
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
#endif`,Su=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,yu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Eu=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,bu=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Tu=`#ifdef USE_AOMAP
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
#endif`,Au=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,wu=`#ifdef USE_BATCHING
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
#endif`,Ru=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Cu=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Pu=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Lu=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Iu=`#ifdef USE_IRIDESCENCE
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
#endif`,Du=`#ifdef USE_BUMPMAP
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
#endif`,Uu=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Nu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Fu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Ou=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Bu=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,zu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Hu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,ku=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Gu=`#define PI 3.141592653589793
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
} // validated`,Vu=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Wu=`vec3 transformedNormal = objectNormal;
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
#endif`,Xu=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,qu=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Yu=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,$u=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Ku="gl_FragColor = linearToOutputTexel( gl_FragColor );",Zu=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,ju=`#ifdef USE_ENVMAP
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
#endif`,Ju=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Qu=`#ifdef USE_ENVMAP
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
#endif`,th=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,eh=`#ifdef USE_ENVMAP
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
#endif`,nh=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ih=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,rh=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,sh=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,ah=`#ifdef USE_GRADIENTMAP
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
}`,oh=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ch=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lh=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,uh=`uniform bool receiveShadow;
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
#endif`,hh=`#ifdef USE_ENVMAP
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
#endif`,fh=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,dh=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,ph=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,mh=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,gh=`PhysicalMaterial material;
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
#endif`,_h=`struct PhysicalMaterial {
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
}`,xh=`
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
#endif`,vh=`#if defined( RE_IndirectDiffuse )
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
#endif`,Mh=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Sh=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,yh=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Eh=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,bh=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Th=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Ah=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,wh=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Rh=`#if defined( USE_POINTS_UV )
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
#endif`,Ch=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Ph=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Lh=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Ih=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Dh=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Uh=`#ifdef USE_MORPHTARGETS
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
#endif`,Nh=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Fh=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Oh=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Bh=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,zh=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Hh=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,kh=`#ifdef USE_NORMALMAP
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
#endif`,Gh=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Vh=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Wh=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Xh=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,qh=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Yh=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,$h=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Kh=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Zh=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,jh=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Jh=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Qh=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,tf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,ef=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,nf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,rf=`float getShadowMask() {
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
}`,sf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,af=`#ifdef USE_SKINNING
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
#endif`,of=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,cf=`#ifdef USE_SKINNING
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
#endif`,lf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,uf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,hf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,ff=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,df=`#ifdef USE_TRANSMISSION
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
#endif`,pf=`#ifdef USE_TRANSMISSION
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
#endif`,mf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,gf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,_f=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,xf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const vf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Mf=`uniform sampler2D t2D;
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
}`,Sf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,yf=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Ef=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,bf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Tf=`#include <common>
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
}`,Af=`#if DEPTH_PACKING == 3200
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
}`,wf=`#define DISTANCE
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
}`,Rf=`#define DISTANCE
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
}`,Cf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Pf=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Lf=`uniform float scale;
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
}`,If=`uniform vec3 diffuse;
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
}`,Df=`#include <common>
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
}`,Uf=`uniform vec3 diffuse;
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
}`,Nf=`#define LAMBERT
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
}`,Ff=`#define LAMBERT
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
}`,Of=`#define MATCAP
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
}`,Bf=`#define MATCAP
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
}`,zf=`#define NORMAL
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
}`,Hf=`#define NORMAL
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
}`,kf=`#define PHONG
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
}`,Gf=`#define PHONG
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
}`,Vf=`#define STANDARD
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
}`,Wf=`#define STANDARD
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
}`,Xf=`#define TOON
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
}`,qf=`#define TOON
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
}`,Yf=`uniform float size;
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
}`,$f=`uniform vec3 diffuse;
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
}`,Kf=`#include <common>
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
}`,Zf=`uniform vec3 color;
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
}`,jf=`uniform float rotation;
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
}`,Jf=`uniform vec3 diffuse;
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
}`,Ht={alphahash_fragment:vu,alphahash_pars_fragment:Mu,alphamap_fragment:Su,alphamap_pars_fragment:yu,alphatest_fragment:Eu,alphatest_pars_fragment:bu,aomap_fragment:Tu,aomap_pars_fragment:Au,batching_pars_vertex:wu,batching_vertex:Ru,begin_vertex:Cu,beginnormal_vertex:Pu,bsdfs:Lu,iridescence_fragment:Iu,bumpmap_pars_fragment:Du,clipping_planes_fragment:Uu,clipping_planes_pars_fragment:Nu,clipping_planes_pars_vertex:Fu,clipping_planes_vertex:Ou,color_fragment:Bu,color_pars_fragment:zu,color_pars_vertex:Hu,color_vertex:ku,common:Gu,cube_uv_reflection_fragment:Vu,defaultnormal_vertex:Wu,displacementmap_pars_vertex:Xu,displacementmap_vertex:qu,emissivemap_fragment:Yu,emissivemap_pars_fragment:$u,colorspace_fragment:Ku,colorspace_pars_fragment:Zu,envmap_fragment:ju,envmap_common_pars_fragment:Ju,envmap_pars_fragment:Qu,envmap_pars_vertex:th,envmap_physical_pars_fragment:hh,envmap_vertex:eh,fog_vertex:nh,fog_pars_vertex:ih,fog_fragment:rh,fog_pars_fragment:sh,gradientmap_pars_fragment:ah,lightmap_pars_fragment:oh,lights_lambert_fragment:ch,lights_lambert_pars_fragment:lh,lights_pars_begin:uh,lights_toon_fragment:fh,lights_toon_pars_fragment:dh,lights_phong_fragment:ph,lights_phong_pars_fragment:mh,lights_physical_fragment:gh,lights_physical_pars_fragment:_h,lights_fragment_begin:xh,lights_fragment_maps:vh,lights_fragment_end:Mh,logdepthbuf_fragment:Sh,logdepthbuf_pars_fragment:yh,logdepthbuf_pars_vertex:Eh,logdepthbuf_vertex:bh,map_fragment:Th,map_pars_fragment:Ah,map_particle_fragment:wh,map_particle_pars_fragment:Rh,metalnessmap_fragment:Ch,metalnessmap_pars_fragment:Ph,morphinstance_vertex:Lh,morphcolor_vertex:Ih,morphnormal_vertex:Dh,morphtarget_pars_vertex:Uh,morphtarget_vertex:Nh,normal_fragment_begin:Fh,normal_fragment_maps:Oh,normal_pars_fragment:Bh,normal_pars_vertex:zh,normal_vertex:Hh,normalmap_pars_fragment:kh,clearcoat_normal_fragment_begin:Gh,clearcoat_normal_fragment_maps:Vh,clearcoat_pars_fragment:Wh,iridescence_pars_fragment:Xh,opaque_fragment:qh,packing:Yh,premultiplied_alpha_fragment:$h,project_vertex:Kh,dithering_fragment:Zh,dithering_pars_fragment:jh,roughnessmap_fragment:Jh,roughnessmap_pars_fragment:Qh,shadowmap_pars_fragment:tf,shadowmap_pars_vertex:ef,shadowmap_vertex:nf,shadowmask_pars_fragment:rf,skinbase_vertex:sf,skinning_pars_vertex:af,skinning_vertex:of,skinnormal_vertex:cf,specularmap_fragment:lf,specularmap_pars_fragment:uf,tonemapping_fragment:hf,tonemapping_pars_fragment:ff,transmission_fragment:df,transmission_pars_fragment:pf,uv_pars_fragment:mf,uv_pars_vertex:gf,uv_vertex:_f,worldpos_vertex:xf,background_vert:vf,background_frag:Mf,backgroundCube_vert:Sf,backgroundCube_frag:yf,cube_vert:Ef,cube_frag:bf,depth_vert:Tf,depth_frag:Af,distanceRGBA_vert:wf,distanceRGBA_frag:Rf,equirect_vert:Cf,equirect_frag:Pf,linedashed_vert:Lf,linedashed_frag:If,meshbasic_vert:Df,meshbasic_frag:Uf,meshlambert_vert:Nf,meshlambert_frag:Ff,meshmatcap_vert:Of,meshmatcap_frag:Bf,meshnormal_vert:zf,meshnormal_frag:Hf,meshphong_vert:kf,meshphong_frag:Gf,meshphysical_vert:Vf,meshphysical_frag:Wf,meshtoon_vert:Xf,meshtoon_frag:qf,points_vert:Yf,points_frag:$f,shadow_vert:Kf,shadow_frag:Zf,sprite_vert:jf,sprite_frag:Jf},ct={common:{diffuse:{value:new Lt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Bt},alphaMap:{value:null},alphaMapTransform:{value:new Bt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Bt}},envmap:{envMap:{value:null},envMapRotation:{value:new Bt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Bt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Bt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Bt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Bt},normalScale:{value:new qt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Bt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Bt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Bt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Bt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Lt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Lt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Bt},alphaTest:{value:0},uvTransform:{value:new Bt}},sprite:{diffuse:{value:new Lt(16777215)},opacity:{value:1},center:{value:new qt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Bt},alphaMap:{value:null},alphaMapTransform:{value:new Bt},alphaTest:{value:0}}},je={basic:{uniforms:Se([ct.common,ct.specularmap,ct.envmap,ct.aomap,ct.lightmap,ct.fog]),vertexShader:Ht.meshbasic_vert,fragmentShader:Ht.meshbasic_frag},lambert:{uniforms:Se([ct.common,ct.specularmap,ct.envmap,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.fog,ct.lights,{emissive:{value:new Lt(0)}}]),vertexShader:Ht.meshlambert_vert,fragmentShader:Ht.meshlambert_frag},phong:{uniforms:Se([ct.common,ct.specularmap,ct.envmap,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.fog,ct.lights,{emissive:{value:new Lt(0)},specular:{value:new Lt(1118481)},shininess:{value:30}}]),vertexShader:Ht.meshphong_vert,fragmentShader:Ht.meshphong_frag},standard:{uniforms:Se([ct.common,ct.envmap,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.roughnessmap,ct.metalnessmap,ct.fog,ct.lights,{emissive:{value:new Lt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ht.meshphysical_vert,fragmentShader:Ht.meshphysical_frag},toon:{uniforms:Se([ct.common,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.gradientmap,ct.fog,ct.lights,{emissive:{value:new Lt(0)}}]),vertexShader:Ht.meshtoon_vert,fragmentShader:Ht.meshtoon_frag},matcap:{uniforms:Se([ct.common,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.fog,{matcap:{value:null}}]),vertexShader:Ht.meshmatcap_vert,fragmentShader:Ht.meshmatcap_frag},points:{uniforms:Se([ct.points,ct.fog]),vertexShader:Ht.points_vert,fragmentShader:Ht.points_frag},dashed:{uniforms:Se([ct.common,ct.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ht.linedashed_vert,fragmentShader:Ht.linedashed_frag},depth:{uniforms:Se([ct.common,ct.displacementmap]),vertexShader:Ht.depth_vert,fragmentShader:Ht.depth_frag},normal:{uniforms:Se([ct.common,ct.bumpmap,ct.normalmap,ct.displacementmap,{opacity:{value:1}}]),vertexShader:Ht.meshnormal_vert,fragmentShader:Ht.meshnormal_frag},sprite:{uniforms:Se([ct.sprite,ct.fog]),vertexShader:Ht.sprite_vert,fragmentShader:Ht.sprite_frag},background:{uniforms:{uvTransform:{value:new Bt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ht.background_vert,fragmentShader:Ht.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Bt}},vertexShader:Ht.backgroundCube_vert,fragmentShader:Ht.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ht.cube_vert,fragmentShader:Ht.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ht.equirect_vert,fragmentShader:Ht.equirect_frag},distanceRGBA:{uniforms:Se([ct.common,ct.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ht.distanceRGBA_vert,fragmentShader:Ht.distanceRGBA_frag},shadow:{uniforms:Se([ct.lights,ct.fog,{color:{value:new Lt(0)},opacity:{value:1}}]),vertexShader:Ht.shadow_vert,fragmentShader:Ht.shadow_frag}};je.physical={uniforms:Se([je.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Bt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Bt},clearcoatNormalScale:{value:new qt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Bt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Bt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Bt},sheen:{value:0},sheenColor:{value:new Lt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Bt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Bt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Bt},transmissionSamplerSize:{value:new qt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Bt},attenuationDistance:{value:0},attenuationColor:{value:new Lt(0)},specularColor:{value:new Lt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Bt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Bt},anisotropyVector:{value:new qt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Bt}}]),vertexShader:Ht.meshphysical_vert,fragmentShader:Ht.meshphysical_frag};const _r={r:0,b:0,g:0},Hn=new Ne,Qf=new $t;function td(n,t,e,i,r,s,a){const o=new Lt(0);let c=s===!0?0:1,u,l,f=null,h=0,p=null;function g(A){let b=A.isScene===!0?A.background:null;return b&&b.isTexture&&(b=(A.backgroundBlurriness>0?e:t).get(b)),b}function _(A){let b=!1;const M=g(A);M===null?d(o,c):M&&M.isColor&&(d(M,1),b=!0);const D=n.xr.getEnvironmentBlendMode();D==="additive"?i.buffers.color.setClear(0,0,0,1,a):D==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(n.autoClear||b)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(A,b){const M=g(b);M&&(M.isCubeTexture||M.mapping===Or)?(l===void 0&&(l=new Qt(new In(1,1,1),new $e({name:"BackgroundCubeMaterial",uniforms:Ai(je.backgroundCube.uniforms),vertexShader:je.backgroundCube.vertexShader,fragmentShader:je.backgroundCube.fragmentShader,side:ve,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(D,w,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),Hn.copy(b.backgroundRotation),Hn.x*=-1,Hn.y*=-1,Hn.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(Hn.y*=-1,Hn.z*=-1),l.material.uniforms.envMap.value=M,l.material.uniforms.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,l.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Qf.makeRotationFromEuler(Hn)),l.material.toneMapped=Xt.getTransfer(M.colorSpace)!==Jt,(f!==M||h!==M.version||p!==n.toneMapping)&&(l.material.needsUpdate=!0,f=M,h=M.version,p=n.toneMapping),l.layers.enableAll(),A.unshift(l,l.geometry,l.material,0,0,null)):M&&M.isTexture&&(u===void 0&&(u=new Qt(new pn(2,2),new $e({name:"BackgroundMaterial",uniforms:Ai(je.background.uniforms),vertexShader:je.background.vertexShader,fragmentShader:je.background.fragmentShader,side:Cn,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),Object.defineProperty(u.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(u)),u.material.uniforms.t2D.value=M,u.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,u.material.toneMapped=Xt.getTransfer(M.colorSpace)!==Jt,M.matrixAutoUpdate===!0&&M.updateMatrix(),u.material.uniforms.uvTransform.value.copy(M.matrix),(f!==M||h!==M.version||p!==n.toneMapping)&&(u.material.needsUpdate=!0,f=M,h=M.version,p=n.toneMapping),u.layers.enableAll(),A.unshift(u,u.geometry,u.material,0,0,null))}function d(A,b){A.getRGB(_r,Pc(n)),i.buffers.color.setClear(_r.r,_r.g,_r.b,b,a)}return{getClearColor:function(){return o},setClearColor:function(A,b=1){o.set(A),c=b,d(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(A){c=A,d(o,c)},render:_,addToRenderList:m}}function ed(n,t){const e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=h(null);let s=r,a=!1;function o(S,P,X,k,K){let Q=!1;const $=f(k,X,P);s!==$&&(s=$,u(s.object)),Q=p(S,k,X,K),Q&&g(S,k,X,K),K!==null&&t.update(K,n.ELEMENT_ARRAY_BUFFER),(Q||a)&&(a=!1,M(S,P,X,k),K!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(K).buffer))}function c(){return n.createVertexArray()}function u(S){return n.bindVertexArray(S)}function l(S){return n.deleteVertexArray(S)}function f(S,P,X){const k=X.wireframe===!0;let K=i[S.id];K===void 0&&(K={},i[S.id]=K);let Q=K[P.id];Q===void 0&&(Q={},K[P.id]=Q);let $=Q[k];return $===void 0&&($=h(c()),Q[k]=$),$}function h(S){const P=[],X=[],k=[];for(let K=0;K<e;K++)P[K]=0,X[K]=0,k[K]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:X,attributeDivisors:k,object:S,attributes:{},index:null}}function p(S,P,X,k){const K=s.attributes,Q=P.attributes;let $=0;const nt=X.getAttributes();for(const q in nt)if(nt[q].location>=0){const mt=K[q];let v=Q[q];if(v===void 0&&(q==="instanceMatrix"&&S.instanceMatrix&&(v=S.instanceMatrix),q==="instanceColor"&&S.instanceColor&&(v=S.instanceColor)),mt===void 0||mt.attribute!==v||v&&mt.data!==v.data)return!0;$++}return s.attributesNum!==$||s.index!==k}function g(S,P,X,k){const K={},Q=P.attributes;let $=0;const nt=X.getAttributes();for(const q in nt)if(nt[q].location>=0){let mt=Q[q];mt===void 0&&(q==="instanceMatrix"&&S.instanceMatrix&&(mt=S.instanceMatrix),q==="instanceColor"&&S.instanceColor&&(mt=S.instanceColor));const v={};v.attribute=mt,mt&&mt.data&&(v.data=mt.data),K[q]=v,$++}s.attributes=K,s.attributesNum=$,s.index=k}function _(){const S=s.newAttributes;for(let P=0,X=S.length;P<X;P++)S[P]=0}function m(S){d(S,0)}function d(S,P){const X=s.newAttributes,k=s.enabledAttributes,K=s.attributeDivisors;X[S]=1,k[S]===0&&(n.enableVertexAttribArray(S),k[S]=1),K[S]!==P&&(n.vertexAttribDivisor(S,P),K[S]=P)}function A(){const S=s.newAttributes,P=s.enabledAttributes;for(let X=0,k=P.length;X<k;X++)P[X]!==S[X]&&(n.disableVertexAttribArray(X),P[X]=0)}function b(S,P,X,k,K,Q,$){$===!0?n.vertexAttribIPointer(S,P,X,K,Q):n.vertexAttribPointer(S,P,X,k,K,Q)}function M(S,P,X,k){_();const K=k.attributes,Q=X.getAttributes(),$=P.defaultAttributeValues;for(const nt in Q){const q=Q[nt];if(q.location>=0){let ot=K[nt];if(ot===void 0&&(nt==="instanceMatrix"&&S.instanceMatrix&&(ot=S.instanceMatrix),nt==="instanceColor"&&S.instanceColor&&(ot=S.instanceColor)),ot!==void 0){const mt=ot.normalized,v=ot.itemSize,L=t.get(ot);if(L===void 0)continue;const H=L.buffer,R=L.type,O=L.bytesPerElement,Z=R===n.INT||R===n.UNSIGNED_INT||ot.gpuType===Ea;if(ot.isInterleavedBufferAttribute){const J=ot.data,lt=J.stride,rt=ot.offset;if(J.isInstancedInterleavedBuffer){for(let Tt=0;Tt<q.locationSize;Tt++)d(q.location+Tt,J.meshPerAttribute);S.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let Tt=0;Tt<q.locationSize;Tt++)m(q.location+Tt);n.bindBuffer(n.ARRAY_BUFFER,H);for(let Tt=0;Tt<q.locationSize;Tt++)b(q.location+Tt,v/q.locationSize,R,mt,lt*O,(rt+v/q.locationSize*Tt)*O,Z)}else{if(ot.isInstancedBufferAttribute){for(let J=0;J<q.locationSize;J++)d(q.location+J,ot.meshPerAttribute);S.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=ot.meshPerAttribute*ot.count)}else for(let J=0;J<q.locationSize;J++)m(q.location+J);n.bindBuffer(n.ARRAY_BUFFER,H);for(let J=0;J<q.locationSize;J++)b(q.location+J,v/q.locationSize,R,mt,v*O,v/q.locationSize*J*O,Z)}}else if($!==void 0){const mt=$[nt];if(mt!==void 0)switch(mt.length){case 2:n.vertexAttrib2fv(q.location,mt);break;case 3:n.vertexAttrib3fv(q.location,mt);break;case 4:n.vertexAttrib4fv(q.location,mt);break;default:n.vertexAttrib1fv(q.location,mt)}}}}A()}function D(){I();for(const S in i){const P=i[S];for(const X in P){const k=P[X];for(const K in k)l(k[K].object),delete k[K];delete P[X]}delete i[S]}}function w(S){if(i[S.id]===void 0)return;const P=i[S.id];for(const X in P){const k=P[X];for(const K in k)l(k[K].object),delete k[K];delete P[X]}delete i[S.id]}function C(S){for(const P in i){const X=i[P];if(X[S.id]===void 0)continue;const k=X[S.id];for(const K in k)l(k[K].object),delete k[K];delete X[S.id]}}function I(){E(),a=!0,s!==r&&(s=r,u(s.object))}function E(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:I,resetDefaultState:E,dispose:D,releaseStatesOfGeometry:w,releaseStatesOfProgram:C,initAttributes:_,enableAttribute:m,disableUnusedAttributes:A}}function nd(n,t,e){let i;function r(u){i=u}function s(u,l){n.drawArrays(i,u,l),e.update(l,i,1)}function a(u,l,f){f!==0&&(n.drawArraysInstanced(i,u,l,f),e.update(l,i,f))}function o(u,l,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,u,0,l,0,f);let p=0;for(let g=0;g<f;g++)p+=l[g];e.update(p,i,1)}function c(u,l,f,h){if(f===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<u.length;g++)a(u[g],l[g],h[g]);else{p.multiDrawArraysInstancedWEBGL(i,u,0,l,0,h,0,f);let g=0;for(let _=0;_<f;_++)g+=l[_]*h[_];e.update(g,i,1)}}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function id(n,t,e,i){let r;function s(){if(r!==void 0)return r;if(t.has("EXT_texture_filter_anisotropic")===!0){const C=t.get("EXT_texture_filter_anisotropic");r=n.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(C){return!(C!==qe&&i.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){const I=C===Yi&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(C!==mn&&i.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==Qe&&!I)}function c(C){if(C==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let u=e.precision!==void 0?e.precision:"highp";const l=c(u);l!==u&&(console.warn("THREE.WebGLRenderer:",u,"not supported, using",l,"instead."),u=l);const f=e.logarithmicDepthBuffer===!0,h=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),d=n.getParameter(n.MAX_VERTEX_ATTRIBS),A=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),b=n.getParameter(n.MAX_VARYING_VECTORS),M=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),D=g>0,w=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:u,logarithmicDepthBuffer:f,reverseDepthBuffer:h,maxTextures:p,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:d,maxVertexUniforms:A,maxVaryings:b,maxFragmentUniforms:M,vertexTextures:D,maxSamples:w}}function rd(n){const t=this;let e=null,i=0,r=!1,s=!1;const a=new Vn,o=new Bt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){const p=f.length!==0||h||i!==0||r;return r=h,i=f.length,p},this.beginShadows=function(){s=!0,l(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,h){e=l(f,h,0)},this.setState=function(f,h,p){const g=f.clippingPlanes,_=f.clipIntersection,m=f.clipShadows,d=n.get(f);if(!r||g===null||g.length===0||s&&!m)s?l(null):u();else{const A=s?0:i,b=A*4;let M=d.clippingState||null;c.value=M,M=l(g,h,b,p);for(let D=0;D!==b;++D)M[D]=e[D];d.clippingState=M,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=A}};function u(){c.value!==e&&(c.value=e,c.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function l(f,h,p,g){const _=f!==null?f.length:0;let m=null;if(_!==0){if(m=c.value,g!==!0||m===null){const d=p+_*4,A=h.matrixWorldInverse;o.getNormalMatrix(A),(m===null||m.length<d)&&(m=new Float32Array(d));for(let b=0,M=p;b!==_;++b,M+=4)a.copy(f[b]).applyMatrix4(A,o),a.normal.toArray(m,M),m[M+3]=a.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}function sd(n){let t=new WeakMap;function e(a,o){return o===Fs?a.mapping=yi:o===Os&&(a.mapping=Ei),a}function i(a){if(a&&a.isTexture){const o=a.mapping;if(o===Fs||o===Os)if(t.has(a)){const c=t.get(a).texture;return e(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const u=new mu(c.height);return u.fromEquirectangularTexture(n,a),t.set(a,u),a.addEventListener("dispose",r),e(u.texture,a.mapping)}else return null}}return a}function r(a){const o=a.target;o.removeEventListener("dispose",r);const c=t.get(o);c!==void 0&&(t.delete(o),c.dispose())}function s(){t=new WeakMap}return{get:i,dispose:s}}class Uc extends Lc{constructor(t=-1,e=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-t,a=i+t,o=r+e,c=r-e;if(this.view!==null&&this.view.enabled){const u=(this.right-this.left)/this.view.fullWidth/this.zoom,l=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=u*this.view.offsetX,a=s+u*this.view.width,o-=l*this.view.offsetY,c=o-l*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const gi=4,yo=[.125,.215,.35,.446,.526,.582],qn=20,ds=new Uc,Eo=new Lt;let ps=null,ms=0,gs=0,_s=!1;const Wn=(1+Math.sqrt(5))/2,di=1/Wn,bo=[new U(-Wn,di,0),new U(Wn,di,0),new U(-di,0,Wn),new U(di,0,Wn),new U(0,Wn,-di),new U(0,Wn,di),new U(-1,1,-1),new U(1,1,-1),new U(-1,1,1),new U(1,1,1)];class fa{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,r=100){ps=this._renderer.getRenderTarget(),ms=this._renderer.getActiveCubeFace(),gs=this._renderer.getActiveMipmapLevel(),_s=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(t,i,r,s),e>0&&this._blur(s,0,0,e),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=wo(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ao(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(ps,ms,gs),this._renderer.xr.enabled=_s,t.scissorTest=!1,xr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===yi||t.mapping===Ei?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),ps=this._renderer.getRenderTarget(),ms=this._renderer.getActiveCubeFace(),gs=this._renderer.getActiveMipmapLevel(),_s=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:Je,minFilter:Je,generateMipmaps:!1,type:Yi,format:qe,colorSpace:wi,depthBuffer:!1},r=To(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=To(t,e,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=ad(s)),this._blurMaterial=od(s,t,e)}return r}_compileMaterial(t){const e=new Qt(this._lodPlanes[0],t);this._renderer.compile(e,ds)}_sceneToCubeUV(t,e,i,r){const o=new Ie(90,1,e,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],l=this._renderer,f=l.autoClear,h=l.toneMapping;l.getClearColor(Eo),l.toneMapping=Rn,l.autoClear=!1;const p=new Pn({name:"PMREM.Background",side:ve,depthWrite:!1,depthTest:!1}),g=new Qt(new In,p);let _=!1;const m=t.background;m?m.isColor&&(p.color.copy(m),t.background=null,_=!0):(p.color.copy(Eo),_=!0);for(let d=0;d<6;d++){const A=d%3;A===0?(o.up.set(0,c[d],0),o.lookAt(u[d],0,0)):A===1?(o.up.set(0,0,c[d]),o.lookAt(0,u[d],0)):(o.up.set(0,c[d],0),o.lookAt(0,0,u[d]));const b=this._cubeSize;xr(r,A*b,d>2?b:0,b,b),l.setRenderTarget(r),_&&l.render(g,o),l.render(t,o)}g.geometry.dispose(),g.material.dispose(),l.toneMapping=h,l.autoClear=f,t.background=m}_textureToCubeUV(t,e){const i=this._renderer,r=t.mapping===yi||t.mapping===Ei;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=wo()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ao());const s=r?this._cubemapMaterial:this._equirectMaterial,a=new Qt(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=t;const c=this._cubeSize;xr(e,0,0,3*c,2*c),i.setRenderTarget(e),i.render(a,ds)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=bo[(r-s-1)%bo.length];this._blur(t,s-1,s,a,o)}e.autoClear=i}_blur(t,e,i,r,s){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,i,r,"latitudinal",s),this._halfBlur(a,t,i,i,r,"longitudinal",s)}_halfBlur(t,e,i,r,s,a,o){const c=this._renderer,u=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const l=3,f=new Qt(this._lodPlanes[r],u),h=u.uniforms,p=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*qn-1),_=s/g,m=isFinite(s)?1+Math.floor(l*_):qn;m>qn&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${qn}`);const d=[];let A=0;for(let C=0;C<qn;++C){const I=C/_,E=Math.exp(-I*I/2);d.push(E),C===0?A+=E:C<m&&(A+=2*E)}for(let C=0;C<d.length;C++)d[C]=d[C]/A;h.envMap.value=t.texture,h.samples.value=m,h.weights.value=d,h.latitudinal.value=a==="latitudinal",o&&(h.poleAxis.value=o);const{_lodMax:b}=this;h.dTheta.value=g,h.mipInt.value=b-i;const M=this._sizeLods[r],D=3*M*(r>b-gi?r-b+gi:0),w=4*(this._cubeSize-M);xr(e,D,w,3*M,2*M),c.setRenderTarget(e),c.render(f,ds)}}function ad(n){const t=[],e=[],i=[];let r=n;const s=n-gi+1+yo.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);e.push(o);let c=1/o;a>n-gi?c=yo[a-n+gi-1]:a===0&&(c=0),i.push(c);const u=1/(o-2),l=-u,f=1+u,h=[l,l,f,l,f,f,l,l,f,f,l,f],p=6,g=6,_=3,m=2,d=1,A=new Float32Array(_*g*p),b=new Float32Array(m*g*p),M=new Float32Array(d*g*p);for(let w=0;w<p;w++){const C=w%3*2/3-1,I=w>2?0:-1,E=[C,I,0,C+2/3,I,0,C+2/3,I+1,0,C,I,0,C+2/3,I+1,0,C,I+1,0];A.set(E,_*g*w),b.set(h,m*g*w);const S=[w,w,w,w,w,w];M.set(S,d*g*w)}const D=new Re;D.setAttribute("position",new Ee(A,_)),D.setAttribute("uv",new Ee(b,m)),D.setAttribute("faceIndex",new Ee(M,d)),t.push(D),r>gi&&r--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function To(n,t,e){const i=new Kn(n,t,e);return i.texture.mapping=Or,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function xr(n,t,e,i,r){n.viewport.set(t,e,i,r),n.scissor.set(t,e,i,r)}function od(n,t,e){const i=new Float32Array(qn),r=new U(0,1,0);return new $e({name:"SphericalGaussianBlur",defines:{n:qn,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Ia(),fragmentShader:`

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
		`,blending:wn,depthTest:!1,depthWrite:!1})}function Ao(){return new $e({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ia(),fragmentShader:`

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
		`,blending:wn,depthTest:!1,depthWrite:!1})}function wo(){return new $e({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ia(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:wn,depthTest:!1,depthWrite:!1})}function Ia(){return`

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
	`}function cd(n){let t=new WeakMap,e=null;function i(o){if(o&&o.isTexture){const c=o.mapping,u=c===Fs||c===Os,l=c===yi||c===Ei;if(u||l){let f=t.get(o);const h=f!==void 0?f.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==h)return e===null&&(e=new fa(n)),f=u?e.fromEquirectangular(o,f):e.fromCubemap(o,f),f.texture.pmremVersion=o.pmremVersion,t.set(o,f),f.texture;if(f!==void 0)return f.texture;{const p=o.image;return u&&p&&p.height>0||l&&p&&r(p)?(e===null&&(e=new fa(n)),f=u?e.fromEquirectangular(o):e.fromCubemap(o),f.texture.pmremVersion=o.pmremVersion,t.set(o,f),o.addEventListener("dispose",s),f.texture):null}}}return o}function r(o){let c=0;const u=6;for(let l=0;l<u;l++)o[l]!==void 0&&c++;return c===u}function s(o){const c=o.target;c.removeEventListener("dispose",s);const u=t.get(c);u!==void 0&&(t.delete(c),u.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:a}}function ld(n){const t={};function e(i){if(t[i]!==void 0)return t[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return t[i]=r,r}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const r=e(i);return r===null&&Gi("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function ud(n,t,e,i){const r={},s=new WeakMap;function a(f){const h=f.target;h.index!==null&&t.remove(h.index);for(const g in h.attributes)t.remove(h.attributes[g]);for(const g in h.morphAttributes){const _=h.morphAttributes[g];for(let m=0,d=_.length;m<d;m++)t.remove(_[m])}h.removeEventListener("dispose",a),delete r[h.id];const p=s.get(h);p&&(t.remove(p),s.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,e.memory.geometries--}function o(f,h){return r[h.id]===!0||(h.addEventListener("dispose",a),r[h.id]=!0,e.memory.geometries++),h}function c(f){const h=f.attributes;for(const g in h)t.update(h[g],n.ARRAY_BUFFER);const p=f.morphAttributes;for(const g in p){const _=p[g];for(let m=0,d=_.length;m<d;m++)t.update(_[m],n.ARRAY_BUFFER)}}function u(f){const h=[],p=f.index,g=f.attributes.position;let _=0;if(p!==null){const A=p.array;_=p.version;for(let b=0,M=A.length;b<M;b+=3){const D=A[b+0],w=A[b+1],C=A[b+2];h.push(D,w,w,C,C,D)}}else if(g!==void 0){const A=g.array;_=g.version;for(let b=0,M=A.length/3-1;b<M;b+=3){const D=b+0,w=b+1,C=b+2;h.push(D,w,w,C,C,D)}}else return;const m=new(yc(h)?Cc:Rc)(h,1);m.version=_;const d=s.get(f);d&&t.remove(d),s.set(f,m)}function l(f){const h=s.get(f);if(h){const p=f.index;p!==null&&h.version<p.version&&u(f)}else u(f);return s.get(f)}return{get:o,update:c,getWireframeAttribute:l}}function hd(n,t,e){let i;function r(h){i=h}let s,a;function o(h){s=h.type,a=h.bytesPerElement}function c(h,p){n.drawElements(i,p,s,h*a),e.update(p,i,1)}function u(h,p,g){g!==0&&(n.drawElementsInstanced(i,p,s,h*a,g),e.update(p,i,g))}function l(h,p,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,s,h,0,g);let m=0;for(let d=0;d<g;d++)m+=p[d];e.update(m,i,1)}function f(h,p,g,_){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let d=0;d<h.length;d++)u(h[d]/a,p[d],_[d]);else{m.multiDrawElementsInstancedWEBGL(i,p,0,s,h,0,_,0,g);let d=0;for(let A=0;A<g;A++)d+=p[A]*_[A];e.update(d,i,1)}}this.setMode=r,this.setIndex=o,this.render=c,this.renderInstances=u,this.renderMultiDraw=l,this.renderMultiDrawInstances=f}function fd(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(e.calls++,a){case n.TRIANGLES:e.triangles+=o*(s/3);break;case n.LINES:e.lines+=o*(s/2);break;case n.LINE_STRIP:e.lines+=o*(s-1);break;case n.LINE_LOOP:e.lines+=o*s;break;case n.POINTS:e.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function r(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:r,update:i}}function dd(n,t,e){const i=new WeakMap,r=new te;function s(a,o,c){const u=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=l!==void 0?l.length:0;let h=i.get(o);if(h===void 0||h.count!==f){let S=function(){I.dispose(),i.delete(o),o.removeEventListener("dispose",S)};var p=S;h!==void 0&&h.texture.dispose();const g=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,d=o.morphAttributes.position||[],A=o.morphAttributes.normal||[],b=o.morphAttributes.color||[];let M=0;g===!0&&(M=1),_===!0&&(M=2),m===!0&&(M=3);let D=o.attributes.position.count*M,w=1;D>t.maxTextureSize&&(w=Math.ceil(D/t.maxTextureSize),D=t.maxTextureSize);const C=new Float32Array(D*w*4*f),I=new bc(C,D,w,f);I.type=Qe,I.needsUpdate=!0;const E=M*4;for(let P=0;P<f;P++){const X=d[P],k=A[P],K=b[P],Q=D*w*4*P;for(let $=0;$<X.count;$++){const nt=$*E;g===!0&&(r.fromBufferAttribute(X,$),C[Q+nt+0]=r.x,C[Q+nt+1]=r.y,C[Q+nt+2]=r.z,C[Q+nt+3]=0),_===!0&&(r.fromBufferAttribute(k,$),C[Q+nt+4]=r.x,C[Q+nt+5]=r.y,C[Q+nt+6]=r.z,C[Q+nt+7]=0),m===!0&&(r.fromBufferAttribute(K,$),C[Q+nt+8]=r.x,C[Q+nt+9]=r.y,C[Q+nt+10]=r.z,C[Q+nt+11]=K.itemSize===4?r.w:1)}}h={count:f,texture:I,size:new qt(D,w)},i.set(o,h),o.addEventListener("dispose",S)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",a.morphTexture,e);else{let g=0;for(let m=0;m<u.length;m++)g+=u[m];const _=o.morphTargetsRelative?1:1-g;c.getUniforms().setValue(n,"morphTargetBaseInfluence",_),c.getUniforms().setValue(n,"morphTargetInfluences",u)}c.getUniforms().setValue(n,"morphTargetsTexture",h.texture,e),c.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:s}}function pd(n,t,e,i){let r=new WeakMap;function s(c){const u=i.render.frame,l=c.geometry,f=t.get(c,l);if(r.get(f)!==u&&(t.update(f),r.set(f,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),r.get(c)!==u&&(e.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,n.ARRAY_BUFFER),r.set(c,u))),c.isSkinnedMesh){const h=c.skeleton;r.get(h)!==u&&(h.update(),r.set(h,u))}return f}function a(){r=new WeakMap}function o(c){const u=c.target;u.removeEventListener("dispose",o),e.remove(u.instanceMatrix),u.instanceColor!==null&&e.remove(u.instanceColor)}return{update:s,dispose:a}}class Nc extends Me{constructor(t,e,i,r,s,a,o,c,u,l=xi){if(l!==xi&&l!==Ti)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&l===xi&&(i=$n),i===void 0&&l===Ti&&(i=bi),super(null,r,s,a,o,c,l,i,u),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:Ue,this.minFilter=c!==void 0?c:Ue,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Fc=new Me,Ro=new Nc(1,1),Oc=new bc,Bc=new Ql,zc=new Ic,Co=[],Po=[],Lo=new Float32Array(16),Io=new Float32Array(9),Do=new Float32Array(4);function Pi(n,t,e){const i=n[0];if(i<=0||i>0)return n;const r=t*e;let s=Co[r];if(s===void 0&&(s=new Float32Array(r),Co[r]=s),t!==0){i.toArray(s,0);for(let a=1,o=0;a!==t;++a)o+=e,n[a].toArray(s,o)}return s}function ue(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function he(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function zr(n,t){let e=Po[t];e===void 0&&(e=new Int32Array(t),Po[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function md(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function gd(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ue(e,t))return;n.uniform2fv(this.addr,t),he(e,t)}}function _d(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(ue(e,t))return;n.uniform3fv(this.addr,t),he(e,t)}}function xd(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ue(e,t))return;n.uniform4fv(this.addr,t),he(e,t)}}function vd(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(ue(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),he(e,t)}else{if(ue(e,i))return;Do.set(i),n.uniformMatrix2fv(this.addr,!1,Do),he(e,i)}}function Md(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(ue(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),he(e,t)}else{if(ue(e,i))return;Io.set(i),n.uniformMatrix3fv(this.addr,!1,Io),he(e,i)}}function Sd(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(ue(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),he(e,t)}else{if(ue(e,i))return;Lo.set(i),n.uniformMatrix4fv(this.addr,!1,Lo),he(e,i)}}function yd(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function Ed(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ue(e,t))return;n.uniform2iv(this.addr,t),he(e,t)}}function bd(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ue(e,t))return;n.uniform3iv(this.addr,t),he(e,t)}}function Td(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ue(e,t))return;n.uniform4iv(this.addr,t),he(e,t)}}function Ad(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function wd(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ue(e,t))return;n.uniform2uiv(this.addr,t),he(e,t)}}function Rd(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ue(e,t))return;n.uniform3uiv(this.addr,t),he(e,t)}}function Cd(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ue(e,t))return;n.uniform4uiv(this.addr,t),he(e,t)}}function Pd(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(Ro.compareFunction=Sc,s=Ro):s=Fc,e.setTexture2D(t||s,r)}function Ld(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),e.setTexture3D(t||Bc,r)}function Id(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),e.setTextureCube(t||zc,r)}function Dd(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),e.setTexture2DArray(t||Oc,r)}function Ud(n){switch(n){case 5126:return md;case 35664:return gd;case 35665:return _d;case 35666:return xd;case 35674:return vd;case 35675:return Md;case 35676:return Sd;case 5124:case 35670:return yd;case 35667:case 35671:return Ed;case 35668:case 35672:return bd;case 35669:case 35673:return Td;case 5125:return Ad;case 36294:return wd;case 36295:return Rd;case 36296:return Cd;case 35678:case 36198:case 36298:case 36306:case 35682:return Pd;case 35679:case 36299:case 36307:return Ld;case 35680:case 36300:case 36308:case 36293:return Id;case 36289:case 36303:case 36311:case 36292:return Dd}}function Nd(n,t){n.uniform1fv(this.addr,t)}function Fd(n,t){const e=Pi(t,this.size,2);n.uniform2fv(this.addr,e)}function Od(n,t){const e=Pi(t,this.size,3);n.uniform3fv(this.addr,e)}function Bd(n,t){const e=Pi(t,this.size,4);n.uniform4fv(this.addr,e)}function zd(n,t){const e=Pi(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function Hd(n,t){const e=Pi(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function kd(n,t){const e=Pi(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function Gd(n,t){n.uniform1iv(this.addr,t)}function Vd(n,t){n.uniform2iv(this.addr,t)}function Wd(n,t){n.uniform3iv(this.addr,t)}function Xd(n,t){n.uniform4iv(this.addr,t)}function qd(n,t){n.uniform1uiv(this.addr,t)}function Yd(n,t){n.uniform2uiv(this.addr,t)}function $d(n,t){n.uniform3uiv(this.addr,t)}function Kd(n,t){n.uniform4uiv(this.addr,t)}function Zd(n,t,e){const i=this.cache,r=t.length,s=zr(e,r);ue(i,s)||(n.uniform1iv(this.addr,s),he(i,s));for(let a=0;a!==r;++a)e.setTexture2D(t[a]||Fc,s[a])}function jd(n,t,e){const i=this.cache,r=t.length,s=zr(e,r);ue(i,s)||(n.uniform1iv(this.addr,s),he(i,s));for(let a=0;a!==r;++a)e.setTexture3D(t[a]||Bc,s[a])}function Jd(n,t,e){const i=this.cache,r=t.length,s=zr(e,r);ue(i,s)||(n.uniform1iv(this.addr,s),he(i,s));for(let a=0;a!==r;++a)e.setTextureCube(t[a]||zc,s[a])}function Qd(n,t,e){const i=this.cache,r=t.length,s=zr(e,r);ue(i,s)||(n.uniform1iv(this.addr,s),he(i,s));for(let a=0;a!==r;++a)e.setTexture2DArray(t[a]||Oc,s[a])}function tp(n){switch(n){case 5126:return Nd;case 35664:return Fd;case 35665:return Od;case 35666:return Bd;case 35674:return zd;case 35675:return Hd;case 35676:return kd;case 5124:case 35670:return Gd;case 35667:case 35671:return Vd;case 35668:case 35672:return Wd;case 35669:case 35673:return Xd;case 5125:return qd;case 36294:return Yd;case 36295:return $d;case 36296:return Kd;case 35678:case 36198:case 36298:case 36306:case 35682:return Zd;case 35679:case 36299:case 36307:return jd;case 35680:case 36300:case 36308:case 36293:return Jd;case 36289:case 36303:case 36311:case 36292:return Qd}}class ep{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=Ud(e.type)}}class np{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=tp(e.type)}}class ip{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(t,e[o.id],i)}}}const xs=/(\w+)(\])?(\[|\.)?/g;function Uo(n,t){n.seq.push(t),n.map[t.id]=t}function rp(n,t,e){const i=n.name,r=i.length;for(xs.lastIndex=0;;){const s=xs.exec(i),a=xs.lastIndex;let o=s[1];const c=s[2]==="]",u=s[3];if(c&&(o=o|0),u===void 0||u==="["&&a+2===r){Uo(e,u===void 0?new ep(o,n,t):new np(o,n,t));break}else{let f=e.map[o];f===void 0&&(f=new ip(o),Uo(e,f)),e=f}}}class Cr{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=t.getActiveUniform(e,r),a=t.getUniformLocation(e,s.name);rp(s,a,this)}}setValue(t,e,i,r){const s=this.map[e];s!==void 0&&s.setValue(t,i,r)}setOptional(t,e,i){const r=e[i];r!==void 0&&this.setValue(t,i,r)}static upload(t,e,i,r){for(let s=0,a=e.length;s!==a;++s){const o=e[s],c=i[o.id];c.needsUpdate!==!1&&o.setValue(t,c.value,r)}}static seqWithValue(t,e){const i=[];for(let r=0,s=t.length;r!==s;++r){const a=t[r];a.id in e&&i.push(a)}return i}}function No(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const sp=37297;let ap=0;function op(n,t){const e=n.split(`
`),i=[],r=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return i.join(`
`)}const Fo=new Bt;function cp(n){Xt._getMatrix(Fo,Xt.workingColorSpace,n);const t=`mat3( ${Fo.elements.map(e=>e.toFixed(4))} )`;switch(Xt.getTransfer(n)){case Br:return[t,"LinearTransferOETF"];case Jt:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function Oo(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),r=n.getShaderInfoLog(t).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const a=parseInt(s[1]);return e.toUpperCase()+`

`+r+`

`+op(n.getShaderSource(t),a)}else return r}function lp(n,t){const e=cp(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function up(n,t){let e;switch(t){case wl:e="Linear";break;case Rl:e="Reinhard";break;case Cl:e="Cineon";break;case uc:e="ACESFilmic";break;case Ll:e="AgX";break;case Il:e="Neutral";break;case Pl:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const vr=new U;function hp(){Xt.getLuminanceCoefficients(vr);const n=vr.x.toFixed(4),t=vr.y.toFixed(4),e=vr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function fp(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Vi).join(`
`)}function dp(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function pp(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(t,r),a=s.name;let o=1;s.type===n.FLOAT_MAT2&&(o=2),s.type===n.FLOAT_MAT3&&(o=3),s.type===n.FLOAT_MAT4&&(o=4),e[a]={type:s.type,location:n.getAttribLocation(t,a),locationSize:o}}return e}function Vi(n){return n!==""}function Bo(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function zo(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const mp=/^[ \t]*#include +<([\w\d./]+)>/gm;function da(n){return n.replace(mp,_p)}const gp=new Map;function _p(n,t){let e=Ht[t];if(e===void 0){const i=gp.get(t);if(i!==void 0)e=Ht[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return da(e)}const xp=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ho(n){return n.replace(xp,vp)}function vp(n,t,e,i){let r="";for(let s=parseInt(t);s<parseInt(e);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function ko(n){let t=`precision ${n.precision} float;
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
#define LOW_PRECISION`),t}function Mp(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Sa?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===al?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===un&&(t="SHADOWMAP_TYPE_VSM"),t}function Sp(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case yi:case Ei:t="ENVMAP_TYPE_CUBE";break;case Or:t="ENVMAP_TYPE_CUBE_UV";break}return t}function yp(n){let t="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case Ei:t="ENVMAP_MODE_REFRACTION";break}return t}function Ep(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case ya:t="ENVMAP_BLENDING_MULTIPLY";break;case Tl:t="ENVMAP_BLENDING_MIX";break;case Al:t="ENVMAP_BLENDING_ADD";break}return t}function bp(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:i,maxMip:e}}function Tp(n,t,e,i){const r=n.getContext(),s=e.defines;let a=e.vertexShader,o=e.fragmentShader;const c=Mp(e),u=Sp(e),l=yp(e),f=Ep(e),h=bp(e),p=fp(e),g=dp(s),_=r.createProgram();let m,d,A=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Vi).join(`
`),m.length>0&&(m+=`
`),d=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Vi).join(`
`),d.length>0&&(d+=`
`)):(m=[ko(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Vi).join(`
`),d=[ko(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.envMap?"#define "+l:"",e.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Rn?"#define TONE_MAPPING":"",e.toneMapping!==Rn?Ht.tonemapping_pars_fragment:"",e.toneMapping!==Rn?up("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Ht.colorspace_pars_fragment,lp("linearToOutputTexel",e.outputColorSpace),hp(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Vi).join(`
`)),a=da(a),a=Bo(a,e),a=zo(a,e),o=da(o),o=Bo(o,e),o=zo(o,e),a=Ho(a),o=Ho(o),e.isRawShaderMaterial!==!0&&(A=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,d=["#define varying in",e.glslVersion===to?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===to?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const b=A+m+a,M=A+d+o,D=No(r,r.VERTEX_SHADER,b),w=No(r,r.FRAGMENT_SHADER,M);r.attachShader(_,D),r.attachShader(_,w),e.index0AttributeName!==void 0?r.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_);function C(P){if(n.debug.checkShaderErrors){const X=r.getProgramInfoLog(_).trim(),k=r.getShaderInfoLog(D).trim(),K=r.getShaderInfoLog(w).trim();let Q=!0,$=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if(Q=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,_,D,w);else{const nt=Oo(r,D,"vertex"),q=Oo(r,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+X+`
`+nt+`
`+q)}else X!==""?console.warn("THREE.WebGLProgram: Program Info Log:",X):(k===""||K==="")&&($=!1);$&&(P.diagnostics={runnable:Q,programLog:X,vertexShader:{log:k,prefix:m},fragmentShader:{log:K,prefix:d}})}r.deleteShader(D),r.deleteShader(w),I=new Cr(r,_),E=pp(r,_)}let I;this.getUniforms=function(){return I===void 0&&C(this),I};let E;this.getAttributes=function(){return E===void 0&&C(this),E};let S=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=r.getProgramParameter(_,sp)),S},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=ap++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=D,this.fragmentShader=w,this}let Ap=0;class wp{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,r=this._getShaderStage(e),s=this._getShaderStage(i),a=this._getShaderCacheForMaterial(t);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new Rp(t),e.set(t,i)),i}}class Rp{constructor(t){this.id=Ap++,this.code=t,this.usedTimes=0}}function Cp(n,t,e,i,r,s,a){const o=new Ac,c=new wp,u=new Set,l=[],f=r.logarithmicDepthBuffer,h=r.vertexTextures;let p=r.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(E){return u.add(E),E===0?"uv":`uv${E}`}function m(E,S,P,X,k){const K=X.fog,Q=k.geometry,$=E.isMeshStandardMaterial?X.environment:null,nt=(E.isMeshStandardMaterial?e:t).get(E.envMap||$),q=nt&&nt.mapping===Or?nt.image.height:null,ot=g[E.type];E.precision!==null&&(p=r.getMaxPrecision(E.precision),p!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",p,"instead."));const mt=Q.morphAttributes.position||Q.morphAttributes.normal||Q.morphAttributes.color,v=mt!==void 0?mt.length:0;let L=0;Q.morphAttributes.position!==void 0&&(L=1),Q.morphAttributes.normal!==void 0&&(L=2),Q.morphAttributes.color!==void 0&&(L=3);let H,R,O,Z;if(ot){const jt=je[ot];H=jt.vertexShader,R=jt.fragmentShader}else H=E.vertexShader,R=E.fragmentShader,c.update(E),O=c.getVertexShaderID(E),Z=c.getFragmentShaderID(E);const J=n.getRenderTarget(),lt=n.state.buffers.depth.getReversed(),rt=k.isInstancedMesh===!0,Tt=k.isBatchedMesh===!0,kt=!!E.map,St=!!E.matcap,Ut=!!nt,N=!!E.aoMap,me=!!E.lightMap,Ct=!!E.bumpMap,Nt=!!E.normalMap,_t=!!E.displacementMap,Gt=!!E.emissiveMap,Rt=!!E.metalnessMap,T=!!E.roughnessMap,x=E.anisotropy>0,G=E.clearcoat>0,tt=E.dispersion>0,it=E.iridescence>0,j=E.sheen>0,At=E.transmission>0,ht=x&&!!E.anisotropyMap,xt=G&&!!E.clearcoatMap,Wt=G&&!!E.clearcoatNormalMap,st=G&&!!E.clearcoatRoughnessMap,vt=it&&!!E.iridescenceMap,Pt=it&&!!E.iridescenceThicknessMap,It=j&&!!E.sheenColorMap,Mt=j&&!!E.sheenRoughnessMap,Vt=!!E.specularMap,zt=!!E.specularColorMap,ee=!!E.specularIntensityMap,F=At&&!!E.transmissionMap,ut=At&&!!E.thicknessMap,Y=!!E.gradientMap,et=!!E.alphaMap,pt=E.alphaTest>0,ft=!!E.alphaHash,Ft=!!E.extensions;let se=Rn;E.toneMapped&&(J===null||J.isXRRenderTarget===!0)&&(se=n.toneMapping);const ge={shaderID:ot,shaderType:E.type,shaderName:E.name,vertexShader:H,fragmentShader:R,defines:E.defines,customVertexShaderID:O,customFragmentShaderID:Z,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:p,batching:Tt,batchingColor:Tt&&k._colorsTexture!==null,instancing:rt,instancingColor:rt&&k.instanceColor!==null,instancingMorph:rt&&k.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:J===null?n.outputColorSpace:J.isXRRenderTarget===!0?J.texture.colorSpace:wi,alphaToCoverage:!!E.alphaToCoverage,map:kt,matcap:St,envMap:Ut,envMapMode:Ut&&nt.mapping,envMapCubeUVHeight:q,aoMap:N,lightMap:me,bumpMap:Ct,normalMap:Nt,displacementMap:h&&_t,emissiveMap:Gt,normalMapObjectSpace:Nt&&E.normalMapType===Fl,normalMapTangentSpace:Nt&&E.normalMapType===Pa,metalnessMap:Rt,roughnessMap:T,anisotropy:x,anisotropyMap:ht,clearcoat:G,clearcoatMap:xt,clearcoatNormalMap:Wt,clearcoatRoughnessMap:st,dispersion:tt,iridescence:it,iridescenceMap:vt,iridescenceThicknessMap:Pt,sheen:j,sheenColorMap:It,sheenRoughnessMap:Mt,specularMap:Vt,specularColorMap:zt,specularIntensityMap:ee,transmission:At,transmissionMap:F,thicknessMap:ut,gradientMap:Y,opaque:E.transparent===!1&&E.blending===_i&&E.alphaToCoverage===!1,alphaMap:et,alphaTest:pt,alphaHash:ft,combine:E.combine,mapUv:kt&&_(E.map.channel),aoMapUv:N&&_(E.aoMap.channel),lightMapUv:me&&_(E.lightMap.channel),bumpMapUv:Ct&&_(E.bumpMap.channel),normalMapUv:Nt&&_(E.normalMap.channel),displacementMapUv:_t&&_(E.displacementMap.channel),emissiveMapUv:Gt&&_(E.emissiveMap.channel),metalnessMapUv:Rt&&_(E.metalnessMap.channel),roughnessMapUv:T&&_(E.roughnessMap.channel),anisotropyMapUv:ht&&_(E.anisotropyMap.channel),clearcoatMapUv:xt&&_(E.clearcoatMap.channel),clearcoatNormalMapUv:Wt&&_(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:st&&_(E.clearcoatRoughnessMap.channel),iridescenceMapUv:vt&&_(E.iridescenceMap.channel),iridescenceThicknessMapUv:Pt&&_(E.iridescenceThicknessMap.channel),sheenColorMapUv:It&&_(E.sheenColorMap.channel),sheenRoughnessMapUv:Mt&&_(E.sheenRoughnessMap.channel),specularMapUv:Vt&&_(E.specularMap.channel),specularColorMapUv:zt&&_(E.specularColorMap.channel),specularIntensityMapUv:ee&&_(E.specularIntensityMap.channel),transmissionMapUv:F&&_(E.transmissionMap.channel),thicknessMapUv:ut&&_(E.thicknessMap.channel),alphaMapUv:et&&_(E.alphaMap.channel),vertexTangents:!!Q.attributes.tangent&&(Nt||x),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!Q.attributes.color&&Q.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!Q.attributes.uv&&(kt||et),fog:!!K,useFog:E.fog===!0,fogExp2:!!K&&K.isFogExp2,flatShading:E.flatShading===!0,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:f,reverseDepthBuffer:lt,skinning:k.isSkinnedMesh===!0,morphTargets:Q.morphAttributes.position!==void 0,morphNormals:Q.morphAttributes.normal!==void 0,morphColors:Q.morphAttributes.color!==void 0,morphTargetsCount:v,morphTextureStride:L,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:E.dithering,shadowMapEnabled:n.shadowMap.enabled&&P.length>0,shadowMapType:n.shadowMap.type,toneMapping:se,decodeVideoTexture:kt&&E.map.isVideoTexture===!0&&Xt.getTransfer(E.map.colorSpace)===Jt,decodeVideoTextureEmissive:Gt&&E.emissiveMap.isVideoTexture===!0&&Xt.getTransfer(E.emissiveMap.colorSpace)===Jt,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===De,flipSided:E.side===ve,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:Ft&&E.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ft&&E.extensions.multiDraw===!0||Tt)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return ge.vertexUv1s=u.has(1),ge.vertexUv2s=u.has(2),ge.vertexUv3s=u.has(3),u.clear(),ge}function d(E){const S=[];if(E.shaderID?S.push(E.shaderID):(S.push(E.customVertexShaderID),S.push(E.customFragmentShaderID)),E.defines!==void 0)for(const P in E.defines)S.push(P),S.push(E.defines[P]);return E.isRawShaderMaterial===!1&&(A(S,E),b(S,E),S.push(n.outputColorSpace)),S.push(E.customProgramCacheKey),S.join()}function A(E,S){E.push(S.precision),E.push(S.outputColorSpace),E.push(S.envMapMode),E.push(S.envMapCubeUVHeight),E.push(S.mapUv),E.push(S.alphaMapUv),E.push(S.lightMapUv),E.push(S.aoMapUv),E.push(S.bumpMapUv),E.push(S.normalMapUv),E.push(S.displacementMapUv),E.push(S.emissiveMapUv),E.push(S.metalnessMapUv),E.push(S.roughnessMapUv),E.push(S.anisotropyMapUv),E.push(S.clearcoatMapUv),E.push(S.clearcoatNormalMapUv),E.push(S.clearcoatRoughnessMapUv),E.push(S.iridescenceMapUv),E.push(S.iridescenceThicknessMapUv),E.push(S.sheenColorMapUv),E.push(S.sheenRoughnessMapUv),E.push(S.specularMapUv),E.push(S.specularColorMapUv),E.push(S.specularIntensityMapUv),E.push(S.transmissionMapUv),E.push(S.thicknessMapUv),E.push(S.combine),E.push(S.fogExp2),E.push(S.sizeAttenuation),E.push(S.morphTargetsCount),E.push(S.morphAttributeCount),E.push(S.numDirLights),E.push(S.numPointLights),E.push(S.numSpotLights),E.push(S.numSpotLightMaps),E.push(S.numHemiLights),E.push(S.numRectAreaLights),E.push(S.numDirLightShadows),E.push(S.numPointLightShadows),E.push(S.numSpotLightShadows),E.push(S.numSpotLightShadowsWithMaps),E.push(S.numLightProbes),E.push(S.shadowMapType),E.push(S.toneMapping),E.push(S.numClippingPlanes),E.push(S.numClipIntersection),E.push(S.depthPacking)}function b(E,S){o.disableAll(),S.supportsVertexTextures&&o.enable(0),S.instancing&&o.enable(1),S.instancingColor&&o.enable(2),S.instancingMorph&&o.enable(3),S.matcap&&o.enable(4),S.envMap&&o.enable(5),S.normalMapObjectSpace&&o.enable(6),S.normalMapTangentSpace&&o.enable(7),S.clearcoat&&o.enable(8),S.iridescence&&o.enable(9),S.alphaTest&&o.enable(10),S.vertexColors&&o.enable(11),S.vertexAlphas&&o.enable(12),S.vertexUv1s&&o.enable(13),S.vertexUv2s&&o.enable(14),S.vertexUv3s&&o.enable(15),S.vertexTangents&&o.enable(16),S.anisotropy&&o.enable(17),S.alphaHash&&o.enable(18),S.batching&&o.enable(19),S.dispersion&&o.enable(20),S.batchingColor&&o.enable(21),E.push(o.mask),o.disableAll(),S.fog&&o.enable(0),S.useFog&&o.enable(1),S.flatShading&&o.enable(2),S.logarithmicDepthBuffer&&o.enable(3),S.reverseDepthBuffer&&o.enable(4),S.skinning&&o.enable(5),S.morphTargets&&o.enable(6),S.morphNormals&&o.enable(7),S.morphColors&&o.enable(8),S.premultipliedAlpha&&o.enable(9),S.shadowMapEnabled&&o.enable(10),S.doubleSided&&o.enable(11),S.flipSided&&o.enable(12),S.useDepthPacking&&o.enable(13),S.dithering&&o.enable(14),S.transmission&&o.enable(15),S.sheen&&o.enable(16),S.opaque&&o.enable(17),S.pointsUvs&&o.enable(18),S.decodeVideoTexture&&o.enable(19),S.decodeVideoTextureEmissive&&o.enable(20),S.alphaToCoverage&&o.enable(21),E.push(o.mask)}function M(E){const S=g[E.type];let P;if(S){const X=je[S];P=hu.clone(X.uniforms)}else P=E.uniforms;return P}function D(E,S){let P;for(let X=0,k=l.length;X<k;X++){const K=l[X];if(K.cacheKey===S){P=K,++P.usedTimes;break}}return P===void 0&&(P=new Tp(n,S,E,s),l.push(P)),P}function w(E){if(--E.usedTimes===0){const S=l.indexOf(E);l[S]=l[l.length-1],l.pop(),E.destroy()}}function C(E){c.remove(E)}function I(){c.dispose()}return{getParameters:m,getProgramCacheKey:d,getUniforms:M,acquireProgram:D,releaseProgram:w,releaseShaderCache:C,programs:l,dispose:I}}function Pp(){let n=new WeakMap;function t(a){return n.has(a)}function e(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function r(a,o,c){n.get(a)[o]=c}function s(){n=new WeakMap}return{has:t,get:e,remove:i,update:r,dispose:s}}function Lp(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function Go(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function Vo(){const n=[];let t=0;const e=[],i=[],r=[];function s(){t=0,e.length=0,i.length=0,r.length=0}function a(f,h,p,g,_,m){let d=n[t];return d===void 0?(d={id:f.id,object:f,geometry:h,material:p,groupOrder:g,renderOrder:f.renderOrder,z:_,group:m},n[t]=d):(d.id=f.id,d.object=f,d.geometry=h,d.material=p,d.groupOrder=g,d.renderOrder=f.renderOrder,d.z=_,d.group=m),t++,d}function o(f,h,p,g,_,m){const d=a(f,h,p,g,_,m);p.transmission>0?i.push(d):p.transparent===!0?r.push(d):e.push(d)}function c(f,h,p,g,_,m){const d=a(f,h,p,g,_,m);p.transmission>0?i.unshift(d):p.transparent===!0?r.unshift(d):e.unshift(d)}function u(f,h){e.length>1&&e.sort(f||Lp),i.length>1&&i.sort(h||Go),r.length>1&&r.sort(h||Go)}function l(){for(let f=t,h=n.length;f<h;f++){const p=n[f];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:i,transparent:r,init:s,push:o,unshift:c,finish:l,sort:u}}function Ip(){let n=new WeakMap;function t(i,r){const s=n.get(i);let a;return s===void 0?(a=new Vo,n.set(i,[a])):r>=s.length?(a=new Vo,s.push(a)):a=s[r],a}function e(){n=new WeakMap}return{get:t,dispose:e}}function Dp(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new U,color:new Lt};break;case"SpotLight":e={position:new U,direction:new U,color:new Lt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new U,color:new Lt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new U,skyColor:new Lt,groundColor:new Lt};break;case"RectAreaLight":e={color:new Lt,position:new U,halfWidth:new U,halfHeight:new U};break}return n[t.id]=e,e}}}function Up(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let Np=0;function Fp(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function Op(n){const t=new Dp,e=Up(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)i.probe.push(new U);const r=new U,s=new $t,a=new $t;function o(u){let l=0,f=0,h=0;for(let E=0;E<9;E++)i.probe[E].set(0,0,0);let p=0,g=0,_=0,m=0,d=0,A=0,b=0,M=0,D=0,w=0,C=0;u.sort(Fp);for(let E=0,S=u.length;E<S;E++){const P=u[E],X=P.color,k=P.intensity,K=P.distance,Q=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)l+=X.r*k,f+=X.g*k,h+=X.b*k;else if(P.isLightProbe){for(let $=0;$<9;$++)i.probe[$].addScaledVector(P.sh.coefficients[$],k);C++}else if(P.isDirectionalLight){const $=t.get(P);if($.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const nt=P.shadow,q=e.get(P);q.shadowIntensity=nt.intensity,q.shadowBias=nt.bias,q.shadowNormalBias=nt.normalBias,q.shadowRadius=nt.radius,q.shadowMapSize=nt.mapSize,i.directionalShadow[p]=q,i.directionalShadowMap[p]=Q,i.directionalShadowMatrix[p]=P.shadow.matrix,A++}i.directional[p]=$,p++}else if(P.isSpotLight){const $=t.get(P);$.position.setFromMatrixPosition(P.matrixWorld),$.color.copy(X).multiplyScalar(k),$.distance=K,$.coneCos=Math.cos(P.angle),$.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),$.decay=P.decay,i.spot[_]=$;const nt=P.shadow;if(P.map&&(i.spotLightMap[D]=P.map,D++,nt.updateMatrices(P),P.castShadow&&w++),i.spotLightMatrix[_]=nt.matrix,P.castShadow){const q=e.get(P);q.shadowIntensity=nt.intensity,q.shadowBias=nt.bias,q.shadowNormalBias=nt.normalBias,q.shadowRadius=nt.radius,q.shadowMapSize=nt.mapSize,i.spotShadow[_]=q,i.spotShadowMap[_]=Q,M++}_++}else if(P.isRectAreaLight){const $=t.get(P);$.color.copy(X).multiplyScalar(k),$.halfWidth.set(P.width*.5,0,0),$.halfHeight.set(0,P.height*.5,0),i.rectArea[m]=$,m++}else if(P.isPointLight){const $=t.get(P);if($.color.copy(P.color).multiplyScalar(P.intensity),$.distance=P.distance,$.decay=P.decay,P.castShadow){const nt=P.shadow,q=e.get(P);q.shadowIntensity=nt.intensity,q.shadowBias=nt.bias,q.shadowNormalBias=nt.normalBias,q.shadowRadius=nt.radius,q.shadowMapSize=nt.mapSize,q.shadowCameraNear=nt.camera.near,q.shadowCameraFar=nt.camera.far,i.pointShadow[g]=q,i.pointShadowMap[g]=Q,i.pointShadowMatrix[g]=P.shadow.matrix,b++}i.point[g]=$,g++}else if(P.isHemisphereLight){const $=t.get(P);$.skyColor.copy(P.color).multiplyScalar(k),$.groundColor.copy(P.groundColor).multiplyScalar(k),i.hemi[d]=$,d++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ct.LTC_FLOAT_1,i.rectAreaLTC2=ct.LTC_FLOAT_2):(i.rectAreaLTC1=ct.LTC_HALF_1,i.rectAreaLTC2=ct.LTC_HALF_2)),i.ambient[0]=l,i.ambient[1]=f,i.ambient[2]=h;const I=i.hash;(I.directionalLength!==p||I.pointLength!==g||I.spotLength!==_||I.rectAreaLength!==m||I.hemiLength!==d||I.numDirectionalShadows!==A||I.numPointShadows!==b||I.numSpotShadows!==M||I.numSpotMaps!==D||I.numLightProbes!==C)&&(i.directional.length=p,i.spot.length=_,i.rectArea.length=m,i.point.length=g,i.hemi.length=d,i.directionalShadow.length=A,i.directionalShadowMap.length=A,i.pointShadow.length=b,i.pointShadowMap.length=b,i.spotShadow.length=M,i.spotShadowMap.length=M,i.directionalShadowMatrix.length=A,i.pointShadowMatrix.length=b,i.spotLightMatrix.length=M+D-w,i.spotLightMap.length=D,i.numSpotLightShadowsWithMaps=w,i.numLightProbes=C,I.directionalLength=p,I.pointLength=g,I.spotLength=_,I.rectAreaLength=m,I.hemiLength=d,I.numDirectionalShadows=A,I.numPointShadows=b,I.numSpotShadows=M,I.numSpotMaps=D,I.numLightProbes=C,i.version=Np++)}function c(u,l){let f=0,h=0,p=0,g=0,_=0;const m=l.matrixWorldInverse;for(let d=0,A=u.length;d<A;d++){const b=u[d];if(b.isDirectionalLight){const M=i.directional[f];M.direction.setFromMatrixPosition(b.matrixWorld),r.setFromMatrixPosition(b.target.matrixWorld),M.direction.sub(r),M.direction.transformDirection(m),f++}else if(b.isSpotLight){const M=i.spot[p];M.position.setFromMatrixPosition(b.matrixWorld),M.position.applyMatrix4(m),M.direction.setFromMatrixPosition(b.matrixWorld),r.setFromMatrixPosition(b.target.matrixWorld),M.direction.sub(r),M.direction.transformDirection(m),p++}else if(b.isRectAreaLight){const M=i.rectArea[g];M.position.setFromMatrixPosition(b.matrixWorld),M.position.applyMatrix4(m),a.identity(),s.copy(b.matrixWorld),s.premultiply(m),a.extractRotation(s),M.halfWidth.set(b.width*.5,0,0),M.halfHeight.set(0,b.height*.5,0),M.halfWidth.applyMatrix4(a),M.halfHeight.applyMatrix4(a),g++}else if(b.isPointLight){const M=i.point[h];M.position.setFromMatrixPosition(b.matrixWorld),M.position.applyMatrix4(m),h++}else if(b.isHemisphereLight){const M=i.hemi[_];M.direction.setFromMatrixPosition(b.matrixWorld),M.direction.transformDirection(m),_++}}}return{setup:o,setupView:c,state:i}}function Wo(n){const t=new Op(n),e=[],i=[];function r(l){u.camera=l,e.length=0,i.length=0}function s(l){e.push(l)}function a(l){i.push(l)}function o(){t.setup(e)}function c(l){t.setupView(e,l)}const u={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:r,state:u,setupLights:o,setupLightsView:c,pushLight:s,pushShadow:a}}function Bp(n){let t=new WeakMap;function e(r,s=0){const a=t.get(r);let o;return a===void 0?(o=new Wo(n),t.set(r,[o])):s>=a.length?(o=new Wo(n),a.push(o)):o=a[s],o}function i(){t=new WeakMap}return{get:e,dispose:i}}class zp extends jn{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Ul,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Hp extends jn{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const kp=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Gp=`uniform sampler2D shadow_pass;
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
}`;function Vp(n,t,e){let i=new La;const r=new qt,s=new qt,a=new te,o=new zp({depthPacking:Nl}),c=new Hp,u={},l=e.maxTextureSize,f={[Cn]:ve,[ve]:Cn,[De]:De},h=new $e({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new qt},radius:{value:4}},vertexShader:kp,fragmentShader:Gp}),p=h.clone();p.defines.HORIZONTAL_PASS=1;const g=new Re;g.setAttribute("position",new Ee(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Qt(g,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Sa;let d=this.type;this.render=function(w,C,I){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;const E=n.getRenderTarget(),S=n.getActiveCubeFace(),P=n.getActiveMipmapLevel(),X=n.state;X.setBlending(wn),X.buffers.color.setClear(1,1,1,1),X.buffers.depth.setTest(!0),X.setScissorTest(!1);const k=d!==un&&this.type===un,K=d===un&&this.type!==un;for(let Q=0,$=w.length;Q<$;Q++){const nt=w[Q],q=nt.shadow;if(q===void 0){console.warn("THREE.WebGLShadowMap:",nt,"has no shadow.");continue}if(q.autoUpdate===!1&&q.needsUpdate===!1)continue;r.copy(q.mapSize);const ot=q.getFrameExtents();if(r.multiply(ot),s.copy(q.mapSize),(r.x>l||r.y>l)&&(r.x>l&&(s.x=Math.floor(l/ot.x),r.x=s.x*ot.x,q.mapSize.x=s.x),r.y>l&&(s.y=Math.floor(l/ot.y),r.y=s.y*ot.y,q.mapSize.y=s.y)),q.map===null||k===!0||K===!0){const v=this.type!==un?{minFilter:Ue,magFilter:Ue}:{};q.map!==null&&q.map.dispose(),q.map=new Kn(r.x,r.y,v),q.map.texture.name=nt.name+".shadowMap",q.camera.updateProjectionMatrix()}n.setRenderTarget(q.map),n.clear();const mt=q.getViewportCount();for(let v=0;v<mt;v++){const L=q.getViewport(v);a.set(s.x*L.x,s.y*L.y,s.x*L.z,s.y*L.w),X.viewport(a),q.updateMatrices(nt,v),i=q.getFrustum(),M(C,I,q.camera,nt,this.type)}q.isPointLightShadow!==!0&&this.type===un&&A(q,I),q.needsUpdate=!1}d=this.type,m.needsUpdate=!1,n.setRenderTarget(E,S,P)};function A(w,C){const I=t.update(_);h.defines.VSM_SAMPLES!==w.blurSamples&&(h.defines.VSM_SAMPLES=w.blurSamples,p.defines.VSM_SAMPLES=w.blurSamples,h.needsUpdate=!0,p.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new Kn(r.x,r.y)),h.uniforms.shadow_pass.value=w.map.texture,h.uniforms.resolution.value=w.mapSize,h.uniforms.radius.value=w.radius,n.setRenderTarget(w.mapPass),n.clear(),n.renderBufferDirect(C,null,I,h,_,null),p.uniforms.shadow_pass.value=w.mapPass.texture,p.uniforms.resolution.value=w.mapSize,p.uniforms.radius.value=w.radius,n.setRenderTarget(w.map),n.clear(),n.renderBufferDirect(C,null,I,p,_,null)}function b(w,C,I,E){let S=null;const P=I.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(P!==void 0)S=P;else if(S=I.isPointLight===!0?c:o,n.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0){const X=S.uuid,k=C.uuid;let K=u[X];K===void 0&&(K={},u[X]=K);let Q=K[k];Q===void 0&&(Q=S.clone(),K[k]=Q,C.addEventListener("dispose",D)),S=Q}if(S.visible=C.visible,S.wireframe=C.wireframe,E===un?S.side=C.shadowSide!==null?C.shadowSide:C.side:S.side=C.shadowSide!==null?C.shadowSide:f[C.side],S.alphaMap=C.alphaMap,S.alphaTest=C.alphaTest,S.map=C.map,S.clipShadows=C.clipShadows,S.clippingPlanes=C.clippingPlanes,S.clipIntersection=C.clipIntersection,S.displacementMap=C.displacementMap,S.displacementScale=C.displacementScale,S.displacementBias=C.displacementBias,S.wireframeLinewidth=C.wireframeLinewidth,S.linewidth=C.linewidth,I.isPointLight===!0&&S.isMeshDistanceMaterial===!0){const X=n.properties.get(S);X.light=I}return S}function M(w,C,I,E,S){if(w.visible===!1)return;if(w.layers.test(C.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&S===un)&&(!w.frustumCulled||i.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,w.matrixWorld);const k=t.update(w),K=w.material;if(Array.isArray(K)){const Q=k.groups;for(let $=0,nt=Q.length;$<nt;$++){const q=Q[$],ot=K[q.materialIndex];if(ot&&ot.visible){const mt=b(w,ot,E,S);w.onBeforeShadow(n,w,C,I,k,mt,q),n.renderBufferDirect(I,null,k,mt,w,q),w.onAfterShadow(n,w,C,I,k,mt,q)}}}else if(K.visible){const Q=b(w,K,E,S);w.onBeforeShadow(n,w,C,I,k,Q,null),n.renderBufferDirect(I,null,k,Q,w,null),w.onAfterShadow(n,w,C,I,k,Q,null)}}const X=w.children;for(let k=0,K=X.length;k<K;k++)M(X[k],C,I,E,S)}function D(w){w.target.removeEventListener("dispose",D);for(const I in u){const E=u[I],S=w.target.uuid;S in E&&(E[S].dispose(),delete E[S])}}}const Wp={[Cs]:Ps,[Ls]:Us,[Is]:Ns,[Si]:Ds,[Ps]:Cs,[Us]:Ls,[Ns]:Is,[Ds]:Si};function Xp(n,t){function e(){let F=!1;const ut=new te;let Y=null;const et=new te(0,0,0,0);return{setMask:function(pt){Y!==pt&&!F&&(n.colorMask(pt,pt,pt,pt),Y=pt)},setLocked:function(pt){F=pt},setClear:function(pt,ft,Ft,se,ge){ge===!0&&(pt*=se,ft*=se,Ft*=se),ut.set(pt,ft,Ft,se),et.equals(ut)===!1&&(n.clearColor(pt,ft,Ft,se),et.copy(ut))},reset:function(){F=!1,Y=null,et.set(-1,0,0,0)}}}function i(){let F=!1,ut=!1,Y=null,et=null,pt=null;return{setReversed:function(ft){if(ut!==ft){const Ft=t.get("EXT_clip_control");ut?Ft.clipControlEXT(Ft.LOWER_LEFT_EXT,Ft.ZERO_TO_ONE_EXT):Ft.clipControlEXT(Ft.LOWER_LEFT_EXT,Ft.NEGATIVE_ONE_TO_ONE_EXT);const se=pt;pt=null,this.setClear(se)}ut=ft},getReversed:function(){return ut},setTest:function(ft){ft?J(n.DEPTH_TEST):lt(n.DEPTH_TEST)},setMask:function(ft){Y!==ft&&!F&&(n.depthMask(ft),Y=ft)},setFunc:function(ft){if(ut&&(ft=Wp[ft]),et!==ft){switch(ft){case Cs:n.depthFunc(n.NEVER);break;case Ps:n.depthFunc(n.ALWAYS);break;case Ls:n.depthFunc(n.LESS);break;case Si:n.depthFunc(n.LEQUAL);break;case Is:n.depthFunc(n.EQUAL);break;case Ds:n.depthFunc(n.GEQUAL);break;case Us:n.depthFunc(n.GREATER);break;case Ns:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}et=ft}},setLocked:function(ft){F=ft},setClear:function(ft){pt!==ft&&(ut&&(ft=1-ft),n.clearDepth(ft),pt=ft)},reset:function(){F=!1,Y=null,et=null,pt=null,ut=!1}}}function r(){let F=!1,ut=null,Y=null,et=null,pt=null,ft=null,Ft=null,se=null,ge=null;return{setTest:function(jt){F||(jt?J(n.STENCIL_TEST):lt(n.STENCIL_TEST))},setMask:function(jt){ut!==jt&&!F&&(n.stencilMask(jt),ut=jt)},setFunc:function(jt,ze,nn){(Y!==jt||et!==ze||pt!==nn)&&(n.stencilFunc(jt,ze,nn),Y=jt,et=ze,pt=nn)},setOp:function(jt,ze,nn){(ft!==jt||Ft!==ze||se!==nn)&&(n.stencilOp(jt,ze,nn),ft=jt,Ft=ze,se=nn)},setLocked:function(jt){F=jt},setClear:function(jt){ge!==jt&&(n.clearStencil(jt),ge=jt)},reset:function(){F=!1,ut=null,Y=null,et=null,pt=null,ft=null,Ft=null,se=null,ge=null}}}const s=new e,a=new i,o=new r,c=new WeakMap,u=new WeakMap;let l={},f={},h=new WeakMap,p=[],g=null,_=!1,m=null,d=null,A=null,b=null,M=null,D=null,w=null,C=new Lt(0,0,0),I=0,E=!1,S=null,P=null,X=null,k=null,K=null;const Q=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let $=!1,nt=0;const q=n.getParameter(n.VERSION);q.indexOf("WebGL")!==-1?(nt=parseFloat(/^WebGL (\d)/.exec(q)[1]),$=nt>=1):q.indexOf("OpenGL ES")!==-1&&(nt=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),$=nt>=2);let ot=null,mt={};const v=n.getParameter(n.SCISSOR_BOX),L=n.getParameter(n.VIEWPORT),H=new te().fromArray(v),R=new te().fromArray(L);function O(F,ut,Y,et){const pt=new Uint8Array(4),ft=n.createTexture();n.bindTexture(F,ft),n.texParameteri(F,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(F,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Ft=0;Ft<Y;Ft++)F===n.TEXTURE_3D||F===n.TEXTURE_2D_ARRAY?n.texImage3D(ut,0,n.RGBA,1,1,et,0,n.RGBA,n.UNSIGNED_BYTE,pt):n.texImage2D(ut+Ft,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,pt);return ft}const Z={};Z[n.TEXTURE_2D]=O(n.TEXTURE_2D,n.TEXTURE_2D,1),Z[n.TEXTURE_CUBE_MAP]=O(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),Z[n.TEXTURE_2D_ARRAY]=O(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Z[n.TEXTURE_3D]=O(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),J(n.DEPTH_TEST),a.setFunc(Si),Ct(!1),Nt(Ka),J(n.CULL_FACE),N(wn);function J(F){l[F]!==!0&&(n.enable(F),l[F]=!0)}function lt(F){l[F]!==!1&&(n.disable(F),l[F]=!1)}function rt(F,ut){return f[F]!==ut?(n.bindFramebuffer(F,ut),f[F]=ut,F===n.DRAW_FRAMEBUFFER&&(f[n.FRAMEBUFFER]=ut),F===n.FRAMEBUFFER&&(f[n.DRAW_FRAMEBUFFER]=ut),!0):!1}function Tt(F,ut){let Y=p,et=!1;if(F){Y=h.get(ut),Y===void 0&&(Y=[],h.set(ut,Y));const pt=F.textures;if(Y.length!==pt.length||Y[0]!==n.COLOR_ATTACHMENT0){for(let ft=0,Ft=pt.length;ft<Ft;ft++)Y[ft]=n.COLOR_ATTACHMENT0+ft;Y.length=pt.length,et=!0}}else Y[0]!==n.BACK&&(Y[0]=n.BACK,et=!0);et&&n.drawBuffers(Y)}function kt(F){return g!==F?(n.useProgram(F),g=F,!0):!1}const St={[Xn]:n.FUNC_ADD,[cl]:n.FUNC_SUBTRACT,[ll]:n.FUNC_REVERSE_SUBTRACT};St[ul]=n.MIN,St[hl]=n.MAX;const Ut={[fl]:n.ZERO,[dl]:n.ONE,[pl]:n.SRC_COLOR,[ws]:n.SRC_ALPHA,[Ml]:n.SRC_ALPHA_SATURATE,[xl]:n.DST_COLOR,[gl]:n.DST_ALPHA,[ml]:n.ONE_MINUS_SRC_COLOR,[Rs]:n.ONE_MINUS_SRC_ALPHA,[vl]:n.ONE_MINUS_DST_COLOR,[_l]:n.ONE_MINUS_DST_ALPHA,[Sl]:n.CONSTANT_COLOR,[yl]:n.ONE_MINUS_CONSTANT_COLOR,[El]:n.CONSTANT_ALPHA,[bl]:n.ONE_MINUS_CONSTANT_ALPHA};function N(F,ut,Y,et,pt,ft,Ft,se,ge,jt){if(F===wn){_===!0&&(lt(n.BLEND),_=!1);return}if(_===!1&&(J(n.BLEND),_=!0),F!==ol){if(F!==m||jt!==E){if((d!==Xn||M!==Xn)&&(n.blendEquation(n.FUNC_ADD),d=Xn,M=Xn),jt)switch(F){case _i:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Lr:n.blendFunc(n.ONE,n.ONE);break;case Za:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case ja:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}else switch(F){case _i:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Lr:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Za:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case ja:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}A=null,b=null,D=null,w=null,C.set(0,0,0),I=0,m=F,E=jt}return}pt=pt||ut,ft=ft||Y,Ft=Ft||et,(ut!==d||pt!==M)&&(n.blendEquationSeparate(St[ut],St[pt]),d=ut,M=pt),(Y!==A||et!==b||ft!==D||Ft!==w)&&(n.blendFuncSeparate(Ut[Y],Ut[et],Ut[ft],Ut[Ft]),A=Y,b=et,D=ft,w=Ft),(se.equals(C)===!1||ge!==I)&&(n.blendColor(se.r,se.g,se.b,ge),C.copy(se),I=ge),m=F,E=!1}function me(F,ut){F.side===De?lt(n.CULL_FACE):J(n.CULL_FACE);let Y=F.side===ve;ut&&(Y=!Y),Ct(Y),F.blending===_i&&F.transparent===!1?N(wn):N(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),a.setFunc(F.depthFunc),a.setTest(F.depthTest),a.setMask(F.depthWrite),s.setMask(F.colorWrite);const et=F.stencilWrite;o.setTest(et),et&&(o.setMask(F.stencilWriteMask),o.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),o.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),Gt(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?J(n.SAMPLE_ALPHA_TO_COVERAGE):lt(n.SAMPLE_ALPHA_TO_COVERAGE)}function Ct(F){S!==F&&(F?n.frontFace(n.CW):n.frontFace(n.CCW),S=F)}function Nt(F){F!==rl?(J(n.CULL_FACE),F!==P&&(F===Ka?n.cullFace(n.BACK):F===sl?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):lt(n.CULL_FACE),P=F}function _t(F){F!==X&&($&&n.lineWidth(F),X=F)}function Gt(F,ut,Y){F?(J(n.POLYGON_OFFSET_FILL),(k!==ut||K!==Y)&&(n.polygonOffset(ut,Y),k=ut,K=Y)):lt(n.POLYGON_OFFSET_FILL)}function Rt(F){F?J(n.SCISSOR_TEST):lt(n.SCISSOR_TEST)}function T(F){F===void 0&&(F=n.TEXTURE0+Q-1),ot!==F&&(n.activeTexture(F),ot=F)}function x(F,ut,Y){Y===void 0&&(ot===null?Y=n.TEXTURE0+Q-1:Y=ot);let et=mt[Y];et===void 0&&(et={type:void 0,texture:void 0},mt[Y]=et),(et.type!==F||et.texture!==ut)&&(ot!==Y&&(n.activeTexture(Y),ot=Y),n.bindTexture(F,ut||Z[F]),et.type=F,et.texture=ut)}function G(){const F=mt[ot];F!==void 0&&F.type!==void 0&&(n.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function tt(){try{n.compressedTexImage2D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function it(){try{n.compressedTexImage3D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function j(){try{n.texSubImage2D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function At(){try{n.texSubImage3D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ht(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function xt(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Wt(){try{n.texStorage2D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function st(){try{n.texStorage3D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function vt(){try{n.texImage2D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Pt(){try{n.texImage3D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function It(F){H.equals(F)===!1&&(n.scissor(F.x,F.y,F.z,F.w),H.copy(F))}function Mt(F){R.equals(F)===!1&&(n.viewport(F.x,F.y,F.z,F.w),R.copy(F))}function Vt(F,ut){let Y=u.get(ut);Y===void 0&&(Y=new WeakMap,u.set(ut,Y));let et=Y.get(F);et===void 0&&(et=n.getUniformBlockIndex(ut,F.name),Y.set(F,et))}function zt(F,ut){const et=u.get(ut).get(F);c.get(ut)!==et&&(n.uniformBlockBinding(ut,et,F.__bindingPointIndex),c.set(ut,et))}function ee(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),l={},ot=null,mt={},f={},h=new WeakMap,p=[],g=null,_=!1,m=null,d=null,A=null,b=null,M=null,D=null,w=null,C=new Lt(0,0,0),I=0,E=!1,S=null,P=null,X=null,k=null,K=null,H.set(0,0,n.canvas.width,n.canvas.height),R.set(0,0,n.canvas.width,n.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:J,disable:lt,bindFramebuffer:rt,drawBuffers:Tt,useProgram:kt,setBlending:N,setMaterial:me,setFlipSided:Ct,setCullFace:Nt,setLineWidth:_t,setPolygonOffset:Gt,setScissorTest:Rt,activeTexture:T,bindTexture:x,unbindTexture:G,compressedTexImage2D:tt,compressedTexImage3D:it,texImage2D:vt,texImage3D:Pt,updateUBOMapping:Vt,uniformBlockBinding:zt,texStorage2D:Wt,texStorage3D:st,texSubImage2D:j,texSubImage3D:At,compressedTexSubImage2D:ht,compressedTexSubImage3D:xt,scissor:It,viewport:Mt,reset:ee}}function Xo(n,t,e,i){const r=qp(i);switch(e){case mc:return n*t;case _c:return n*t;case xc:return n*t*2;case Aa:return n*t/r.components*r.byteLength;case wa:return n*t/r.components*r.byteLength;case vc:return n*t*2/r.components*r.byteLength;case Ra:return n*t*2/r.components*r.byteLength;case gc:return n*t*3/r.components*r.byteLength;case qe:return n*t*4/r.components*r.byteLength;case Ca:return n*t*4/r.components*r.byteLength;case br:case Tr:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Ar:case wr:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Hs:case Gs:return Math.max(n,16)*Math.max(t,8)/4;case zs:case ks:return Math.max(n,8)*Math.max(t,8)/2;case Vs:case Ws:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Xs:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case qs:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Ys:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case $s:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case Ks:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case Zs:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case js:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case Js:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case Qs:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case ta:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case ea:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case na:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case ia:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case ra:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case sa:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case Rr:case aa:case oa:return Math.ceil(n/4)*Math.ceil(t/4)*16;case Mc:case ca:return Math.ceil(n/4)*Math.ceil(t/4)*8;case la:case ua:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function qp(n){switch(n){case mn:case fc:return{byteLength:1,components:1};case Xi:case dc:case Yi:return{byteLength:2,components:1};case ba:case Ta:return{byteLength:2,components:4};case $n:case Ea:case Qe:return{byteLength:4,components:1};case pc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}function Yp(n,t,e,i,r,s,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),u=new qt,l=new WeakMap;let f;const h=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(T,x){return p?new OffscreenCanvas(T,x):Ur("canvas")}function _(T,x,G){let tt=1;const it=Rt(T);if((it.width>G||it.height>G)&&(tt=G/Math.max(it.width,it.height)),tt<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const j=Math.floor(tt*it.width),At=Math.floor(tt*it.height);f===void 0&&(f=g(j,At));const ht=x?g(j,At):f;return ht.width=j,ht.height=At,ht.getContext("2d").drawImage(T,0,0,j,At),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+it.width+"x"+it.height+") to ("+j+"x"+At+")."),ht}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+it.width+"x"+it.height+")."),T;return T}function m(T){return T.generateMipmaps}function d(T){n.generateMipmap(T)}function A(T){return T.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?n.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function b(T,x,G,tt,it=!1){if(T!==null){if(n[T]!==void 0)return n[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let j=x;if(x===n.RED&&(G===n.FLOAT&&(j=n.R32F),G===n.HALF_FLOAT&&(j=n.R16F),G===n.UNSIGNED_BYTE&&(j=n.R8)),x===n.RED_INTEGER&&(G===n.UNSIGNED_BYTE&&(j=n.R8UI),G===n.UNSIGNED_SHORT&&(j=n.R16UI),G===n.UNSIGNED_INT&&(j=n.R32UI),G===n.BYTE&&(j=n.R8I),G===n.SHORT&&(j=n.R16I),G===n.INT&&(j=n.R32I)),x===n.RG&&(G===n.FLOAT&&(j=n.RG32F),G===n.HALF_FLOAT&&(j=n.RG16F),G===n.UNSIGNED_BYTE&&(j=n.RG8)),x===n.RG_INTEGER&&(G===n.UNSIGNED_BYTE&&(j=n.RG8UI),G===n.UNSIGNED_SHORT&&(j=n.RG16UI),G===n.UNSIGNED_INT&&(j=n.RG32UI),G===n.BYTE&&(j=n.RG8I),G===n.SHORT&&(j=n.RG16I),G===n.INT&&(j=n.RG32I)),x===n.RGB_INTEGER&&(G===n.UNSIGNED_BYTE&&(j=n.RGB8UI),G===n.UNSIGNED_SHORT&&(j=n.RGB16UI),G===n.UNSIGNED_INT&&(j=n.RGB32UI),G===n.BYTE&&(j=n.RGB8I),G===n.SHORT&&(j=n.RGB16I),G===n.INT&&(j=n.RGB32I)),x===n.RGBA_INTEGER&&(G===n.UNSIGNED_BYTE&&(j=n.RGBA8UI),G===n.UNSIGNED_SHORT&&(j=n.RGBA16UI),G===n.UNSIGNED_INT&&(j=n.RGBA32UI),G===n.BYTE&&(j=n.RGBA8I),G===n.SHORT&&(j=n.RGBA16I),G===n.INT&&(j=n.RGBA32I)),x===n.RGB&&G===n.UNSIGNED_INT_5_9_9_9_REV&&(j=n.RGB9_E5),x===n.RGBA){const At=it?Br:Xt.getTransfer(tt);G===n.FLOAT&&(j=n.RGBA32F),G===n.HALF_FLOAT&&(j=n.RGBA16F),G===n.UNSIGNED_BYTE&&(j=At===Jt?n.SRGB8_ALPHA8:n.RGBA8),G===n.UNSIGNED_SHORT_4_4_4_4&&(j=n.RGBA4),G===n.UNSIGNED_SHORT_5_5_5_1&&(j=n.RGB5_A1)}return(j===n.R16F||j===n.R32F||j===n.RG16F||j===n.RG32F||j===n.RGBA16F||j===n.RGBA32F)&&t.get("EXT_color_buffer_float"),j}function M(T,x){let G;return T?x===null||x===$n||x===bi?G=n.DEPTH24_STENCIL8:x===Qe?G=n.DEPTH32F_STENCIL8:x===Xi&&(G=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===$n||x===bi?G=n.DEPTH_COMPONENT24:x===Qe?G=n.DEPTH_COMPONENT32F:x===Xi&&(G=n.DEPTH_COMPONENT16),G}function D(T,x){return m(T)===!0||T.isFramebufferTexture&&T.minFilter!==Ue&&T.minFilter!==Je?Math.log2(Math.max(x.width,x.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?x.mipmaps.length:1}function w(T){const x=T.target;x.removeEventListener("dispose",w),I(x),x.isVideoTexture&&l.delete(x)}function C(T){const x=T.target;x.removeEventListener("dispose",C),S(x)}function I(T){const x=i.get(T);if(x.__webglInit===void 0)return;const G=T.source,tt=h.get(G);if(tt){const it=tt[x.__cacheKey];it.usedTimes--,it.usedTimes===0&&E(T),Object.keys(tt).length===0&&h.delete(G)}i.remove(T)}function E(T){const x=i.get(T);n.deleteTexture(x.__webglTexture);const G=T.source,tt=h.get(G);delete tt[x.__cacheKey],a.memory.textures--}function S(T){const x=i.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),i.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let tt=0;tt<6;tt++){if(Array.isArray(x.__webglFramebuffer[tt]))for(let it=0;it<x.__webglFramebuffer[tt].length;it++)n.deleteFramebuffer(x.__webglFramebuffer[tt][it]);else n.deleteFramebuffer(x.__webglFramebuffer[tt]);x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer[tt])}else{if(Array.isArray(x.__webglFramebuffer))for(let tt=0;tt<x.__webglFramebuffer.length;tt++)n.deleteFramebuffer(x.__webglFramebuffer[tt]);else n.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&n.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let tt=0;tt<x.__webglColorRenderbuffer.length;tt++)x.__webglColorRenderbuffer[tt]&&n.deleteRenderbuffer(x.__webglColorRenderbuffer[tt]);x.__webglDepthRenderbuffer&&n.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const G=T.textures;for(let tt=0,it=G.length;tt<it;tt++){const j=i.get(G[tt]);j.__webglTexture&&(n.deleteTexture(j.__webglTexture),a.memory.textures--),i.remove(G[tt])}i.remove(T)}let P=0;function X(){P=0}function k(){const T=P;return T>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+r.maxTextures),P+=1,T}function K(T){const x=[];return x.push(T.wrapS),x.push(T.wrapT),x.push(T.wrapR||0),x.push(T.magFilter),x.push(T.minFilter),x.push(T.anisotropy),x.push(T.internalFormat),x.push(T.format),x.push(T.type),x.push(T.generateMipmaps),x.push(T.premultiplyAlpha),x.push(T.flipY),x.push(T.unpackAlignment),x.push(T.colorSpace),x.join()}function Q(T,x){const G=i.get(T);if(T.isVideoTexture&&_t(T),T.isRenderTargetTexture===!1&&T.version>0&&G.__version!==T.version){const tt=T.image;if(tt===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(tt.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{R(G,T,x);return}}e.bindTexture(n.TEXTURE_2D,G.__webglTexture,n.TEXTURE0+x)}function $(T,x){const G=i.get(T);if(T.version>0&&G.__version!==T.version){R(G,T,x);return}e.bindTexture(n.TEXTURE_2D_ARRAY,G.__webglTexture,n.TEXTURE0+x)}function nt(T,x){const G=i.get(T);if(T.version>0&&G.__version!==T.version){R(G,T,x);return}e.bindTexture(n.TEXTURE_3D,G.__webglTexture,n.TEXTURE0+x)}function q(T,x){const G=i.get(T);if(T.version>0&&G.__version!==T.version){O(G,T,x);return}e.bindTexture(n.TEXTURE_CUBE_MAP,G.__webglTexture,n.TEXTURE0+x)}const ot={[Ir]:n.REPEAT,[Yn]:n.CLAMP_TO_EDGE,[Bs]:n.MIRRORED_REPEAT},mt={[Ue]:n.NEAREST,[Dl]:n.NEAREST_MIPMAP_NEAREST,[Qi]:n.NEAREST_MIPMAP_LINEAR,[Je]:n.LINEAR,[Wr]:n.LINEAR_MIPMAP_NEAREST,[An]:n.LINEAR_MIPMAP_LINEAR},v={[Ol]:n.NEVER,[Vl]:n.ALWAYS,[Bl]:n.LESS,[Sc]:n.LEQUAL,[zl]:n.EQUAL,[Gl]:n.GEQUAL,[Hl]:n.GREATER,[kl]:n.NOTEQUAL};function L(T,x){if(x.type===Qe&&t.has("OES_texture_float_linear")===!1&&(x.magFilter===Je||x.magFilter===Wr||x.magFilter===Qi||x.magFilter===An||x.minFilter===Je||x.minFilter===Wr||x.minFilter===Qi||x.minFilter===An)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(T,n.TEXTURE_WRAP_S,ot[x.wrapS]),n.texParameteri(T,n.TEXTURE_WRAP_T,ot[x.wrapT]),(T===n.TEXTURE_3D||T===n.TEXTURE_2D_ARRAY)&&n.texParameteri(T,n.TEXTURE_WRAP_R,ot[x.wrapR]),n.texParameteri(T,n.TEXTURE_MAG_FILTER,mt[x.magFilter]),n.texParameteri(T,n.TEXTURE_MIN_FILTER,mt[x.minFilter]),x.compareFunction&&(n.texParameteri(T,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(T,n.TEXTURE_COMPARE_FUNC,v[x.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===Ue||x.minFilter!==Qi&&x.minFilter!==An||x.type===Qe&&t.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||i.get(x).__currentAnisotropy){const G=t.get("EXT_texture_filter_anisotropic");n.texParameterf(T,G.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,r.getMaxAnisotropy())),i.get(x).__currentAnisotropy=x.anisotropy}}}function H(T,x){let G=!1;T.__webglInit===void 0&&(T.__webglInit=!0,x.addEventListener("dispose",w));const tt=x.source;let it=h.get(tt);it===void 0&&(it={},h.set(tt,it));const j=K(x);if(j!==T.__cacheKey){it[j]===void 0&&(it[j]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,G=!0),it[j].usedTimes++;const At=it[T.__cacheKey];At!==void 0&&(it[T.__cacheKey].usedTimes--,At.usedTimes===0&&E(x)),T.__cacheKey=j,T.__webglTexture=it[j].texture}return G}function R(T,x,G){let tt=n.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(tt=n.TEXTURE_2D_ARRAY),x.isData3DTexture&&(tt=n.TEXTURE_3D);const it=H(T,x),j=x.source;e.bindTexture(tt,T.__webglTexture,n.TEXTURE0+G);const At=i.get(j);if(j.version!==At.__version||it===!0){e.activeTexture(n.TEXTURE0+G);const ht=Xt.getPrimaries(Xt.workingColorSpace),xt=x.colorSpace===Tn?null:Xt.getPrimaries(x.colorSpace),Wt=x.colorSpace===Tn||ht===xt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Wt);let st=_(x.image,!1,r.maxTextureSize);st=Gt(x,st);const vt=s.convert(x.format,x.colorSpace),Pt=s.convert(x.type);let It=b(x.internalFormat,vt,Pt,x.colorSpace,x.isVideoTexture);L(tt,x);let Mt;const Vt=x.mipmaps,zt=x.isVideoTexture!==!0,ee=At.__version===void 0||it===!0,F=j.dataReady,ut=D(x,st);if(x.isDepthTexture)It=M(x.format===Ti,x.type),ee&&(zt?e.texStorage2D(n.TEXTURE_2D,1,It,st.width,st.height):e.texImage2D(n.TEXTURE_2D,0,It,st.width,st.height,0,vt,Pt,null));else if(x.isDataTexture)if(Vt.length>0){zt&&ee&&e.texStorage2D(n.TEXTURE_2D,ut,It,Vt[0].width,Vt[0].height);for(let Y=0,et=Vt.length;Y<et;Y++)Mt=Vt[Y],zt?F&&e.texSubImage2D(n.TEXTURE_2D,Y,0,0,Mt.width,Mt.height,vt,Pt,Mt.data):e.texImage2D(n.TEXTURE_2D,Y,It,Mt.width,Mt.height,0,vt,Pt,Mt.data);x.generateMipmaps=!1}else zt?(ee&&e.texStorage2D(n.TEXTURE_2D,ut,It,st.width,st.height),F&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,st.width,st.height,vt,Pt,st.data)):e.texImage2D(n.TEXTURE_2D,0,It,st.width,st.height,0,vt,Pt,st.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){zt&&ee&&e.texStorage3D(n.TEXTURE_2D_ARRAY,ut,It,Vt[0].width,Vt[0].height,st.depth);for(let Y=0,et=Vt.length;Y<et;Y++)if(Mt=Vt[Y],x.format!==qe)if(vt!==null)if(zt){if(F)if(x.layerUpdates.size>0){const pt=Xo(Mt.width,Mt.height,x.format,x.type);for(const ft of x.layerUpdates){const Ft=Mt.data.subarray(ft*pt/Mt.data.BYTES_PER_ELEMENT,(ft+1)*pt/Mt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,Y,0,0,ft,Mt.width,Mt.height,1,vt,Ft)}x.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,Y,0,0,0,Mt.width,Mt.height,st.depth,vt,Mt.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,Y,It,Mt.width,Mt.height,st.depth,0,Mt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else zt?F&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,Y,0,0,0,Mt.width,Mt.height,st.depth,vt,Pt,Mt.data):e.texImage3D(n.TEXTURE_2D_ARRAY,Y,It,Mt.width,Mt.height,st.depth,0,vt,Pt,Mt.data)}else{zt&&ee&&e.texStorage2D(n.TEXTURE_2D,ut,It,Vt[0].width,Vt[0].height);for(let Y=0,et=Vt.length;Y<et;Y++)Mt=Vt[Y],x.format!==qe?vt!==null?zt?F&&e.compressedTexSubImage2D(n.TEXTURE_2D,Y,0,0,Mt.width,Mt.height,vt,Mt.data):e.compressedTexImage2D(n.TEXTURE_2D,Y,It,Mt.width,Mt.height,0,Mt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):zt?F&&e.texSubImage2D(n.TEXTURE_2D,Y,0,0,Mt.width,Mt.height,vt,Pt,Mt.data):e.texImage2D(n.TEXTURE_2D,Y,It,Mt.width,Mt.height,0,vt,Pt,Mt.data)}else if(x.isDataArrayTexture)if(zt){if(ee&&e.texStorage3D(n.TEXTURE_2D_ARRAY,ut,It,st.width,st.height,st.depth),F)if(x.layerUpdates.size>0){const Y=Xo(st.width,st.height,x.format,x.type);for(const et of x.layerUpdates){const pt=st.data.subarray(et*Y/st.data.BYTES_PER_ELEMENT,(et+1)*Y/st.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,et,st.width,st.height,1,vt,Pt,pt)}x.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,st.width,st.height,st.depth,vt,Pt,st.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,It,st.width,st.height,st.depth,0,vt,Pt,st.data);else if(x.isData3DTexture)zt?(ee&&e.texStorage3D(n.TEXTURE_3D,ut,It,st.width,st.height,st.depth),F&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,st.width,st.height,st.depth,vt,Pt,st.data)):e.texImage3D(n.TEXTURE_3D,0,It,st.width,st.height,st.depth,0,vt,Pt,st.data);else if(x.isFramebufferTexture){if(ee)if(zt)e.texStorage2D(n.TEXTURE_2D,ut,It,st.width,st.height);else{let Y=st.width,et=st.height;for(let pt=0;pt<ut;pt++)e.texImage2D(n.TEXTURE_2D,pt,It,Y,et,0,vt,Pt,null),Y>>=1,et>>=1}}else if(Vt.length>0){if(zt&&ee){const Y=Rt(Vt[0]);e.texStorage2D(n.TEXTURE_2D,ut,It,Y.width,Y.height)}for(let Y=0,et=Vt.length;Y<et;Y++)Mt=Vt[Y],zt?F&&e.texSubImage2D(n.TEXTURE_2D,Y,0,0,vt,Pt,Mt):e.texImage2D(n.TEXTURE_2D,Y,It,vt,Pt,Mt);x.generateMipmaps=!1}else if(zt){if(ee){const Y=Rt(st);e.texStorage2D(n.TEXTURE_2D,ut,It,Y.width,Y.height)}F&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,vt,Pt,st)}else e.texImage2D(n.TEXTURE_2D,0,It,vt,Pt,st);m(x)&&d(tt),At.__version=j.version,x.onUpdate&&x.onUpdate(x)}T.__version=x.version}function O(T,x,G){if(x.image.length!==6)return;const tt=H(T,x),it=x.source;e.bindTexture(n.TEXTURE_CUBE_MAP,T.__webglTexture,n.TEXTURE0+G);const j=i.get(it);if(it.version!==j.__version||tt===!0){e.activeTexture(n.TEXTURE0+G);const At=Xt.getPrimaries(Xt.workingColorSpace),ht=x.colorSpace===Tn?null:Xt.getPrimaries(x.colorSpace),xt=x.colorSpace===Tn||At===ht?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,xt);const Wt=x.isCompressedTexture||x.image[0].isCompressedTexture,st=x.image[0]&&x.image[0].isDataTexture,vt=[];for(let et=0;et<6;et++)!Wt&&!st?vt[et]=_(x.image[et],!0,r.maxCubemapSize):vt[et]=st?x.image[et].image:x.image[et],vt[et]=Gt(x,vt[et]);const Pt=vt[0],It=s.convert(x.format,x.colorSpace),Mt=s.convert(x.type),Vt=b(x.internalFormat,It,Mt,x.colorSpace),zt=x.isVideoTexture!==!0,ee=j.__version===void 0||tt===!0,F=it.dataReady;let ut=D(x,Pt);L(n.TEXTURE_CUBE_MAP,x);let Y;if(Wt){zt&&ee&&e.texStorage2D(n.TEXTURE_CUBE_MAP,ut,Vt,Pt.width,Pt.height);for(let et=0;et<6;et++){Y=vt[et].mipmaps;for(let pt=0;pt<Y.length;pt++){const ft=Y[pt];x.format!==qe?It!==null?zt?F&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+et,pt,0,0,ft.width,ft.height,It,ft.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+et,pt,Vt,ft.width,ft.height,0,ft.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):zt?F&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+et,pt,0,0,ft.width,ft.height,It,Mt,ft.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+et,pt,Vt,ft.width,ft.height,0,It,Mt,ft.data)}}}else{if(Y=x.mipmaps,zt&&ee){Y.length>0&&ut++;const et=Rt(vt[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,ut,Vt,et.width,et.height)}for(let et=0;et<6;et++)if(st){zt?F&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,0,0,vt[et].width,vt[et].height,It,Mt,vt[et].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,Vt,vt[et].width,vt[et].height,0,It,Mt,vt[et].data);for(let pt=0;pt<Y.length;pt++){const Ft=Y[pt].image[et].image;zt?F&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+et,pt+1,0,0,Ft.width,Ft.height,It,Mt,Ft.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+et,pt+1,Vt,Ft.width,Ft.height,0,It,Mt,Ft.data)}}else{zt?F&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,0,0,It,Mt,vt[et]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,Vt,It,Mt,vt[et]);for(let pt=0;pt<Y.length;pt++){const ft=Y[pt];zt?F&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+et,pt+1,0,0,It,Mt,ft.image[et]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+et,pt+1,Vt,It,Mt,ft.image[et])}}}m(x)&&d(n.TEXTURE_CUBE_MAP),j.__version=it.version,x.onUpdate&&x.onUpdate(x)}T.__version=x.version}function Z(T,x,G,tt,it,j){const At=s.convert(G.format,G.colorSpace),ht=s.convert(G.type),xt=b(G.internalFormat,At,ht,G.colorSpace),Wt=i.get(x),st=i.get(G);if(st.__renderTarget=x,!Wt.__hasExternalTextures){const vt=Math.max(1,x.width>>j),Pt=Math.max(1,x.height>>j);it===n.TEXTURE_3D||it===n.TEXTURE_2D_ARRAY?e.texImage3D(it,j,xt,vt,Pt,x.depth,0,At,ht,null):e.texImage2D(it,j,xt,vt,Pt,0,At,ht,null)}e.bindFramebuffer(n.FRAMEBUFFER,T),Nt(x)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,tt,it,st.__webglTexture,0,Ct(x)):(it===n.TEXTURE_2D||it>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&it<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,tt,it,st.__webglTexture,j),e.bindFramebuffer(n.FRAMEBUFFER,null)}function J(T,x,G){if(n.bindRenderbuffer(n.RENDERBUFFER,T),x.depthBuffer){const tt=x.depthTexture,it=tt&&tt.isDepthTexture?tt.type:null,j=M(x.stencilBuffer,it),At=x.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ht=Ct(x);Nt(x)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ht,j,x.width,x.height):G?n.renderbufferStorageMultisample(n.RENDERBUFFER,ht,j,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,j,x.width,x.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,At,n.RENDERBUFFER,T)}else{const tt=x.textures;for(let it=0;it<tt.length;it++){const j=tt[it],At=s.convert(j.format,j.colorSpace),ht=s.convert(j.type),xt=b(j.internalFormat,At,ht,j.colorSpace),Wt=Ct(x);G&&Nt(x)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Wt,xt,x.width,x.height):Nt(x)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Wt,xt,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,xt,x.width,x.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function lt(T,x){if(x&&x.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,T),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const tt=i.get(x.depthTexture);tt.__renderTarget=x,(!tt.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),Q(x.depthTexture,0);const it=tt.__webglTexture,j=Ct(x);if(x.depthTexture.format===xi)Nt(x)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,it,0,j):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,it,0);else if(x.depthTexture.format===Ti)Nt(x)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,it,0,j):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,it,0);else throw new Error("Unknown depthTexture format")}function rt(T){const x=i.get(T),G=T.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==T.depthTexture){const tt=T.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),tt){const it=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,tt.removeEventListener("dispose",it)};tt.addEventListener("dispose",it),x.__depthDisposeCallback=it}x.__boundDepthTexture=tt}if(T.depthTexture&&!x.__autoAllocateDepthBuffer){if(G)throw new Error("target.depthTexture not supported in Cube render targets");lt(x.__webglFramebuffer,T)}else if(G){x.__webglDepthbuffer=[];for(let tt=0;tt<6;tt++)if(e.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer[tt]),x.__webglDepthbuffer[tt]===void 0)x.__webglDepthbuffer[tt]=n.createRenderbuffer(),J(x.__webglDepthbuffer[tt],T,!1);else{const it=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,j=x.__webglDepthbuffer[tt];n.bindRenderbuffer(n.RENDERBUFFER,j),n.framebufferRenderbuffer(n.FRAMEBUFFER,it,n.RENDERBUFFER,j)}}else if(e.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=n.createRenderbuffer(),J(x.__webglDepthbuffer,T,!1);else{const tt=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,it=x.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,it),n.framebufferRenderbuffer(n.FRAMEBUFFER,tt,n.RENDERBUFFER,it)}e.bindFramebuffer(n.FRAMEBUFFER,null)}function Tt(T,x,G){const tt=i.get(T);x!==void 0&&Z(tt.__webglFramebuffer,T,T.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),G!==void 0&&rt(T)}function kt(T){const x=T.texture,G=i.get(T),tt=i.get(x);T.addEventListener("dispose",C);const it=T.textures,j=T.isWebGLCubeRenderTarget===!0,At=it.length>1;if(At||(tt.__webglTexture===void 0&&(tt.__webglTexture=n.createTexture()),tt.__version=x.version,a.memory.textures++),j){G.__webglFramebuffer=[];for(let ht=0;ht<6;ht++)if(x.mipmaps&&x.mipmaps.length>0){G.__webglFramebuffer[ht]=[];for(let xt=0;xt<x.mipmaps.length;xt++)G.__webglFramebuffer[ht][xt]=n.createFramebuffer()}else G.__webglFramebuffer[ht]=n.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){G.__webglFramebuffer=[];for(let ht=0;ht<x.mipmaps.length;ht++)G.__webglFramebuffer[ht]=n.createFramebuffer()}else G.__webglFramebuffer=n.createFramebuffer();if(At)for(let ht=0,xt=it.length;ht<xt;ht++){const Wt=i.get(it[ht]);Wt.__webglTexture===void 0&&(Wt.__webglTexture=n.createTexture(),a.memory.textures++)}if(T.samples>0&&Nt(T)===!1){G.__webglMultisampledFramebuffer=n.createFramebuffer(),G.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let ht=0;ht<it.length;ht++){const xt=it[ht];G.__webglColorRenderbuffer[ht]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,G.__webglColorRenderbuffer[ht]);const Wt=s.convert(xt.format,xt.colorSpace),st=s.convert(xt.type),vt=b(xt.internalFormat,Wt,st,xt.colorSpace,T.isXRRenderTarget===!0),Pt=Ct(T);n.renderbufferStorageMultisample(n.RENDERBUFFER,Pt,vt,T.width,T.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ht,n.RENDERBUFFER,G.__webglColorRenderbuffer[ht])}n.bindRenderbuffer(n.RENDERBUFFER,null),T.depthBuffer&&(G.__webglDepthRenderbuffer=n.createRenderbuffer(),J(G.__webglDepthRenderbuffer,T,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(j){e.bindTexture(n.TEXTURE_CUBE_MAP,tt.__webglTexture),L(n.TEXTURE_CUBE_MAP,x);for(let ht=0;ht<6;ht++)if(x.mipmaps&&x.mipmaps.length>0)for(let xt=0;xt<x.mipmaps.length;xt++)Z(G.__webglFramebuffer[ht][xt],T,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ht,xt);else Z(G.__webglFramebuffer[ht],T,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ht,0);m(x)&&d(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(At){for(let ht=0,xt=it.length;ht<xt;ht++){const Wt=it[ht],st=i.get(Wt);e.bindTexture(n.TEXTURE_2D,st.__webglTexture),L(n.TEXTURE_2D,Wt),Z(G.__webglFramebuffer,T,Wt,n.COLOR_ATTACHMENT0+ht,n.TEXTURE_2D,0),m(Wt)&&d(n.TEXTURE_2D)}e.unbindTexture()}else{let ht=n.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(ht=T.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(ht,tt.__webglTexture),L(ht,x),x.mipmaps&&x.mipmaps.length>0)for(let xt=0;xt<x.mipmaps.length;xt++)Z(G.__webglFramebuffer[xt],T,x,n.COLOR_ATTACHMENT0,ht,xt);else Z(G.__webglFramebuffer,T,x,n.COLOR_ATTACHMENT0,ht,0);m(x)&&d(ht),e.unbindTexture()}T.depthBuffer&&rt(T)}function St(T){const x=T.textures;for(let G=0,tt=x.length;G<tt;G++){const it=x[G];if(m(it)){const j=A(T),At=i.get(it).__webglTexture;e.bindTexture(j,At),d(j),e.unbindTexture()}}}const Ut=[],N=[];function me(T){if(T.samples>0){if(Nt(T)===!1){const x=T.textures,G=T.width,tt=T.height;let it=n.COLOR_BUFFER_BIT;const j=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,At=i.get(T),ht=x.length>1;if(ht)for(let xt=0;xt<x.length;xt++)e.bindFramebuffer(n.FRAMEBUFFER,At.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+xt,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,At.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+xt,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,At.__webglMultisampledFramebuffer),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,At.__webglFramebuffer);for(let xt=0;xt<x.length;xt++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(it|=n.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(it|=n.STENCIL_BUFFER_BIT)),ht){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,At.__webglColorRenderbuffer[xt]);const Wt=i.get(x[xt]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Wt,0)}n.blitFramebuffer(0,0,G,tt,0,0,G,tt,it,n.NEAREST),c===!0&&(Ut.length=0,N.length=0,Ut.push(n.COLOR_ATTACHMENT0+xt),T.depthBuffer&&T.resolveDepthBuffer===!1&&(Ut.push(j),N.push(j),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,N)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Ut))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ht)for(let xt=0;xt<x.length;xt++){e.bindFramebuffer(n.FRAMEBUFFER,At.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+xt,n.RENDERBUFFER,At.__webglColorRenderbuffer[xt]);const Wt=i.get(x[xt]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,At.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+xt,n.TEXTURE_2D,Wt,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,At.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&c){const x=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[x])}}}function Ct(T){return Math.min(r.maxSamples,T.samples)}function Nt(T){const x=i.get(T);return T.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function _t(T){const x=a.render.frame;l.get(T)!==x&&(l.set(T,x),T.update())}function Gt(T,x){const G=T.colorSpace,tt=T.format,it=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||G!==wi&&G!==Tn&&(Xt.getTransfer(G)===Jt?(tt!==qe||it!==mn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",G)),x}function Rt(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(u.width=T.naturalWidth||T.width,u.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(u.width=T.displayWidth,u.height=T.displayHeight):(u.width=T.width,u.height=T.height),u}this.allocateTextureUnit=k,this.resetTextureUnits=X,this.setTexture2D=Q,this.setTexture2DArray=$,this.setTexture3D=nt,this.setTextureCube=q,this.rebindTextures=Tt,this.setupRenderTarget=kt,this.updateRenderTargetMipmap=St,this.updateMultisampleRenderTarget=me,this.setupDepthRenderbuffer=rt,this.setupFrameBufferTexture=Z,this.useMultisampledRTT=Nt}function $p(n,t){function e(i,r=Tn){let s;const a=Xt.getTransfer(r);if(i===mn)return n.UNSIGNED_BYTE;if(i===ba)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Ta)return n.UNSIGNED_SHORT_5_5_5_1;if(i===pc)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===fc)return n.BYTE;if(i===dc)return n.SHORT;if(i===Xi)return n.UNSIGNED_SHORT;if(i===Ea)return n.INT;if(i===$n)return n.UNSIGNED_INT;if(i===Qe)return n.FLOAT;if(i===Yi)return n.HALF_FLOAT;if(i===mc)return n.ALPHA;if(i===gc)return n.RGB;if(i===qe)return n.RGBA;if(i===_c)return n.LUMINANCE;if(i===xc)return n.LUMINANCE_ALPHA;if(i===xi)return n.DEPTH_COMPONENT;if(i===Ti)return n.DEPTH_STENCIL;if(i===Aa)return n.RED;if(i===wa)return n.RED_INTEGER;if(i===vc)return n.RG;if(i===Ra)return n.RG_INTEGER;if(i===Ca)return n.RGBA_INTEGER;if(i===br||i===Tr||i===Ar||i===wr)if(a===Jt)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===br)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Tr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Ar)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===wr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===br)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Tr)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Ar)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===wr)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===zs||i===Hs||i===ks||i===Gs)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===zs)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Hs)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===ks)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Gs)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Vs||i===Ws||i===Xs)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Vs||i===Ws)return a===Jt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Xs)return a===Jt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===qs||i===Ys||i===$s||i===Ks||i===Zs||i===js||i===Js||i===Qs||i===ta||i===ea||i===na||i===ia||i===ra||i===sa)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(i===qs)return a===Jt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Ys)return a===Jt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===$s)return a===Jt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Ks)return a===Jt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Zs)return a===Jt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===js)return a===Jt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Js)return a===Jt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Qs)return a===Jt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===ta)return a===Jt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===ea)return a===Jt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===na)return a===Jt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===ia)return a===Jt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===ra)return a===Jt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===sa)return a===Jt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Rr||i===aa||i===oa)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(i===Rr)return a===Jt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===aa)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===oa)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Mc||i===ca||i===la||i===ua)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(i===Rr)return s.COMPRESSED_RED_RGTC1_EXT;if(i===ca)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===la)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===ua)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===bi?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}class Kp extends Ie{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Mr extends de{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Zp={type:"move"};class vs{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Mr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Mr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Mr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let r=null,s=null,a=null;const o=this._targetRay,c=this._grip,u=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(u&&t.hand){a=!0;for(const _ of t.hand.values()){const m=e.getJointPose(_,i),d=this._getHandJoint(u,_);m!==null&&(d.matrix.fromArray(m.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=m.radius),d.visible=m!==null}const l=u.joints["index-finger-tip"],f=u.joints["thumb-tip"],h=l.position.distanceTo(f.position),p=.02,g=.005;u.inputState.pinching&&h>p+g?(u.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!u.inputState.pinching&&h<=p-g&&(u.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,i),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(r=e.getPose(t.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Zp)))}return o!==null&&(o.visible=r!==null),c!==null&&(c.visible=s!==null),u!==null&&(u.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new Mr;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}const jp=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Jp=`
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

}`;class Qp{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,i){if(this.texture===null){const r=new Me,s=t.properties.get(r);s.__webglTexture=e.texture,(e.depthNear!=i.depthNear||e.depthFar!=i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=r}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new $e({vertexShader:jp,fragmentShader:Jp,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Qt(new pn(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class t0 extends Ri{constructor(t,e){super();const i=this;let r=null,s=1,a=null,o="local-floor",c=1,u=null,l=null,f=null,h=null,p=null,g=null;const _=new Qp,m=e.getContextAttributes();let d=null,A=null;const b=[],M=[],D=new qt;let w=null;const C=new Ie;C.viewport=new te;const I=new Ie;I.viewport=new te;const E=[C,I],S=new Kp;let P=null,X=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(R){let O=b[R];return O===void 0&&(O=new vs,b[R]=O),O.getTargetRaySpace()},this.getControllerGrip=function(R){let O=b[R];return O===void 0&&(O=new vs,b[R]=O),O.getGripSpace()},this.getHand=function(R){let O=b[R];return O===void 0&&(O=new vs,b[R]=O),O.getHandSpace()};function k(R){const O=M.indexOf(R.inputSource);if(O===-1)return;const Z=b[O];Z!==void 0&&(Z.update(R.inputSource,R.frame,u||a),Z.dispatchEvent({type:R.type,data:R.inputSource}))}function K(){r.removeEventListener("select",k),r.removeEventListener("selectstart",k),r.removeEventListener("selectend",k),r.removeEventListener("squeeze",k),r.removeEventListener("squeezestart",k),r.removeEventListener("squeezeend",k),r.removeEventListener("end",K),r.removeEventListener("inputsourceschange",Q);for(let R=0;R<b.length;R++){const O=M[R];O!==null&&(M[R]=null,b[R].disconnect(O))}P=null,X=null,_.reset(),t.setRenderTarget(d),p=null,h=null,f=null,r=null,A=null,H.stop(),i.isPresenting=!1,t.setPixelRatio(w),t.setSize(D.width,D.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(R){s=R,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(R){o=R,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return u||a},this.setReferenceSpace=function(R){u=R},this.getBaseLayer=function(){return h!==null?h:p},this.getBinding=function(){return f},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(R){if(r=R,r!==null){if(d=t.getRenderTarget(),r.addEventListener("select",k),r.addEventListener("selectstart",k),r.addEventListener("selectend",k),r.addEventListener("squeeze",k),r.addEventListener("squeezestart",k),r.addEventListener("squeezeend",k),r.addEventListener("end",K),r.addEventListener("inputsourceschange",Q),m.xrCompatible!==!0&&await e.makeXRCompatible(),w=t.getPixelRatio(),t.getSize(D),r.renderState.layers===void 0){const O={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,e,O),r.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),A=new Kn(p.framebufferWidth,p.framebufferHeight,{format:qe,type:mn,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let O=null,Z=null,J=null;m.depth&&(J=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,O=m.stencil?Ti:xi,Z=m.stencil?bi:$n);const lt={colorFormat:e.RGBA8,depthFormat:J,scaleFactor:s};f=new XRWebGLBinding(r,e),h=f.createProjectionLayer(lt),r.updateRenderState({layers:[h]}),t.setPixelRatio(1),t.setSize(h.textureWidth,h.textureHeight,!1),A=new Kn(h.textureWidth,h.textureHeight,{format:qe,type:mn,depthTexture:new Nc(h.textureWidth,h.textureHeight,Z,void 0,void 0,void 0,void 0,void 0,void 0,O),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1})}A.isXRRenderTarget=!0,this.setFoveation(c),u=null,a=await r.requestReferenceSpace(o),H.setContext(r),H.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function Q(R){for(let O=0;O<R.removed.length;O++){const Z=R.removed[O],J=M.indexOf(Z);J>=0&&(M[J]=null,b[J].disconnect(Z))}for(let O=0;O<R.added.length;O++){const Z=R.added[O];let J=M.indexOf(Z);if(J===-1){for(let rt=0;rt<b.length;rt++)if(rt>=M.length){M.push(Z),J=rt;break}else if(M[rt]===null){M[rt]=Z,J=rt;break}if(J===-1)break}const lt=b[J];lt&&lt.connect(Z)}}const $=new U,nt=new U;function q(R,O,Z){$.setFromMatrixPosition(O.matrixWorld),nt.setFromMatrixPosition(Z.matrixWorld);const J=$.distanceTo(nt),lt=O.projectionMatrix.elements,rt=Z.projectionMatrix.elements,Tt=lt[14]/(lt[10]-1),kt=lt[14]/(lt[10]+1),St=(lt[9]+1)/lt[5],Ut=(lt[9]-1)/lt[5],N=(lt[8]-1)/lt[0],me=(rt[8]+1)/rt[0],Ct=Tt*N,Nt=Tt*me,_t=J/(-N+me),Gt=_t*-N;if(O.matrixWorld.decompose(R.position,R.quaternion,R.scale),R.translateX(Gt),R.translateZ(_t),R.matrixWorld.compose(R.position,R.quaternion,R.scale),R.matrixWorldInverse.copy(R.matrixWorld).invert(),lt[10]===-1)R.projectionMatrix.copy(O.projectionMatrix),R.projectionMatrixInverse.copy(O.projectionMatrixInverse);else{const Rt=Tt+_t,T=kt+_t,x=Ct-Gt,G=Nt+(J-Gt),tt=St*kt/T*Rt,it=Ut*kt/T*Rt;R.projectionMatrix.makePerspective(x,G,tt,it,Rt,T),R.projectionMatrixInverse.copy(R.projectionMatrix).invert()}}function ot(R,O){O===null?R.matrixWorld.copy(R.matrix):R.matrixWorld.multiplyMatrices(O.matrixWorld,R.matrix),R.matrixWorldInverse.copy(R.matrixWorld).invert()}this.updateCamera=function(R){if(r===null)return;let O=R.near,Z=R.far;_.texture!==null&&(_.depthNear>0&&(O=_.depthNear),_.depthFar>0&&(Z=_.depthFar)),S.near=I.near=C.near=O,S.far=I.far=C.far=Z,(P!==S.near||X!==S.far)&&(r.updateRenderState({depthNear:S.near,depthFar:S.far}),P=S.near,X=S.far),C.layers.mask=R.layers.mask|2,I.layers.mask=R.layers.mask|4,S.layers.mask=C.layers.mask|I.layers.mask;const J=R.parent,lt=S.cameras;ot(S,J);for(let rt=0;rt<lt.length;rt++)ot(lt[rt],J);lt.length===2?q(S,C,I):S.projectionMatrix.copy(C.projectionMatrix),mt(R,S,J)};function mt(R,O,Z){Z===null?R.matrix.copy(O.matrixWorld):(R.matrix.copy(Z.matrixWorld),R.matrix.invert(),R.matrix.multiply(O.matrixWorld)),R.matrix.decompose(R.position,R.quaternion,R.scale),R.updateMatrixWorld(!0),R.projectionMatrix.copy(O.projectionMatrix),R.projectionMatrixInverse.copy(O.projectionMatrixInverse),R.isPerspectiveCamera&&(R.fov=ha*2*Math.atan(1/R.projectionMatrix.elements[5]),R.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(h===null&&p===null))return c},this.setFoveation=function(R){c=R,h!==null&&(h.fixedFoveation=R),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=R)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(S)};let v=null;function L(R,O){if(l=O.getViewerPose(u||a),g=O,l!==null){const Z=l.views;p!==null&&(t.setRenderTargetFramebuffer(A,p.framebuffer),t.setRenderTarget(A));let J=!1;Z.length!==S.cameras.length&&(S.cameras.length=0,J=!0);for(let rt=0;rt<Z.length;rt++){const Tt=Z[rt];let kt=null;if(p!==null)kt=p.getViewport(Tt);else{const Ut=f.getViewSubImage(h,Tt);kt=Ut.viewport,rt===0&&(t.setRenderTargetTextures(A,Ut.colorTexture,h.ignoreDepthValues?void 0:Ut.depthStencilTexture),t.setRenderTarget(A))}let St=E[rt];St===void 0&&(St=new Ie,St.layers.enable(rt),St.viewport=new te,E[rt]=St),St.matrix.fromArray(Tt.transform.matrix),St.matrix.decompose(St.position,St.quaternion,St.scale),St.projectionMatrix.fromArray(Tt.projectionMatrix),St.projectionMatrixInverse.copy(St.projectionMatrix).invert(),St.viewport.set(kt.x,kt.y,kt.width,kt.height),rt===0&&(S.matrix.copy(St.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),J===!0&&S.cameras.push(St)}const lt=r.enabledFeatures;if(lt&&lt.includes("depth-sensing")){const rt=f.getDepthInformation(Z[0]);rt&&rt.isValid&&rt.texture&&_.init(t,rt,r.renderState)}}for(let Z=0;Z<b.length;Z++){const J=M[Z],lt=b[Z];J!==null&&lt!==void 0&&lt.update(J,O,u||a)}v&&v(R,O),O.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:O}),g=null}const H=new Dc;H.setAnimationLoop(L),this.setAnimationLoop=function(R){v=R},this.dispose=function(){}}}const kn=new Ne,e0=new $t;function n0(n,t){function e(m,d){m.matrixAutoUpdate===!0&&m.updateMatrix(),d.value.copy(m.matrix)}function i(m,d){d.color.getRGB(m.fogColor.value,Pc(n)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function r(m,d,A,b,M){d.isMeshBasicMaterial||d.isMeshLambertMaterial?s(m,d):d.isMeshToonMaterial?(s(m,d),f(m,d)):d.isMeshPhongMaterial?(s(m,d),l(m,d)):d.isMeshStandardMaterial?(s(m,d),h(m,d),d.isMeshPhysicalMaterial&&p(m,d,M)):d.isMeshMatcapMaterial?(s(m,d),g(m,d)):d.isMeshDepthMaterial?s(m,d):d.isMeshDistanceMaterial?(s(m,d),_(m,d)):d.isMeshNormalMaterial?s(m,d):d.isLineBasicMaterial?(a(m,d),d.isLineDashedMaterial&&o(m,d)):d.isPointsMaterial?c(m,d,A,b):d.isSpriteMaterial?u(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function s(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map,e(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.bumpMap&&(m.bumpMap.value=d.bumpMap,e(d.bumpMap,m.bumpMapTransform),m.bumpScale.value=d.bumpScale,d.side===ve&&(m.bumpScale.value*=-1)),d.normalMap&&(m.normalMap.value=d.normalMap,e(d.normalMap,m.normalMapTransform),m.normalScale.value.copy(d.normalScale),d.side===ve&&m.normalScale.value.negate()),d.displacementMap&&(m.displacementMap.value=d.displacementMap,e(d.displacementMap,m.displacementMapTransform),m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap,e(d.emissiveMap,m.emissiveMapTransform)),d.specularMap&&(m.specularMap.value=d.specularMap,e(d.specularMap,m.specularMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);const A=t.get(d),b=A.envMap,M=A.envMapRotation;b&&(m.envMap.value=b,kn.copy(M),kn.x*=-1,kn.y*=-1,kn.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(kn.y*=-1,kn.z*=-1),m.envMapRotation.value.setFromMatrix4(e0.makeRotationFromEuler(kn)),m.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap&&(m.lightMap.value=d.lightMap,m.lightMapIntensity.value=d.lightMapIntensity,e(d.lightMap,m.lightMapTransform)),d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity,e(d.aoMap,m.aoMapTransform))}function a(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,d.map&&(m.map.value=d.map,e(d.map,m.mapTransform))}function o(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function c(m,d,A,b){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*A,m.scale.value=b*.5,d.map&&(m.map.value=d.map,e(d.map,m.uvTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function u(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map,e(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function l(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function f(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function h(m,d){m.metalness.value=d.metalness,d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap,e(d.metalnessMap,m.metalnessMapTransform)),m.roughness.value=d.roughness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap,e(d.roughnessMap,m.roughnessMapTransform)),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function p(m,d,A){m.ior.value=d.ior,d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap,e(d.sheenColorMap,m.sheenColorMapTransform)),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap,e(d.sheenRoughnessMap,m.sheenRoughnessMapTransform))),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap,e(d.clearcoatMap,m.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,e(d.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(m.clearcoatNormalMap.value=d.clearcoatNormalMap,e(d.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===ve&&m.clearcoatNormalScale.value.negate())),d.dispersion>0&&(m.dispersion.value=d.dispersion),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap,e(d.iridescenceMap,m.iridescenceMapTransform)),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap,e(d.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=A.texture,m.transmissionSamplerSize.value.set(A.width,A.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap,e(d.transmissionMap,m.transmissionMapTransform)),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap,e(d.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(m.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(m.anisotropyMap.value=d.anisotropyMap,e(d.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap,e(d.specularColorMap,m.specularColorMapTransform)),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap,e(d.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,d){d.matcap&&(m.matcap.value=d.matcap)}function _(m,d){const A=t.get(d).light;m.referencePosition.value.setFromMatrixPosition(A.matrixWorld),m.nearDistance.value=A.shadow.camera.near,m.farDistance.value=A.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function i0(n,t,e,i){let r={},s={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(A,b){const M=b.program;i.uniformBlockBinding(A,M)}function u(A,b){let M=r[A.id];M===void 0&&(g(A),M=l(A),r[A.id]=M,A.addEventListener("dispose",m));const D=b.program;i.updateUBOMapping(A,D);const w=t.render.frame;s[A.id]!==w&&(h(A),s[A.id]=w)}function l(A){const b=f();A.__bindingPointIndex=b;const M=n.createBuffer(),D=A.__size,w=A.usage;return n.bindBuffer(n.UNIFORM_BUFFER,M),n.bufferData(n.UNIFORM_BUFFER,D,w),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,b,M),M}function f(){for(let A=0;A<o;A++)if(a.indexOf(A)===-1)return a.push(A),A;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(A){const b=r[A.id],M=A.uniforms,D=A.__cache;n.bindBuffer(n.UNIFORM_BUFFER,b);for(let w=0,C=M.length;w<C;w++){const I=Array.isArray(M[w])?M[w]:[M[w]];for(let E=0,S=I.length;E<S;E++){const P=I[E];if(p(P,w,E,D)===!0){const X=P.__offset,k=Array.isArray(P.value)?P.value:[P.value];let K=0;for(let Q=0;Q<k.length;Q++){const $=k[Q],nt=_($);typeof $=="number"||typeof $=="boolean"?(P.__data[0]=$,n.bufferSubData(n.UNIFORM_BUFFER,X+K,P.__data)):$.isMatrix3?(P.__data[0]=$.elements[0],P.__data[1]=$.elements[1],P.__data[2]=$.elements[2],P.__data[3]=0,P.__data[4]=$.elements[3],P.__data[5]=$.elements[4],P.__data[6]=$.elements[5],P.__data[7]=0,P.__data[8]=$.elements[6],P.__data[9]=$.elements[7],P.__data[10]=$.elements[8],P.__data[11]=0):($.toArray(P.__data,K),K+=nt.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,X,P.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(A,b,M,D){const w=A.value,C=b+"_"+M;if(D[C]===void 0)return typeof w=="number"||typeof w=="boolean"?D[C]=w:D[C]=w.clone(),!0;{const I=D[C];if(typeof w=="number"||typeof w=="boolean"){if(I!==w)return D[C]=w,!0}else if(I.equals(w)===!1)return I.copy(w),!0}return!1}function g(A){const b=A.uniforms;let M=0;const D=16;for(let C=0,I=b.length;C<I;C++){const E=Array.isArray(b[C])?b[C]:[b[C]];for(let S=0,P=E.length;S<P;S++){const X=E[S],k=Array.isArray(X.value)?X.value:[X.value];for(let K=0,Q=k.length;K<Q;K++){const $=k[K],nt=_($),q=M%D,ot=q%nt.boundary,mt=q+ot;M+=ot,mt!==0&&D-mt<nt.storage&&(M+=D-mt),X.__data=new Float32Array(nt.storage/Float32Array.BYTES_PER_ELEMENT),X.__offset=M,M+=nt.storage}}}const w=M%D;return w>0&&(M+=D-w),A.__size=M,A.__cache={},this}function _(A){const b={boundary:0,storage:0};return typeof A=="number"||typeof A=="boolean"?(b.boundary=4,b.storage=4):A.isVector2?(b.boundary=8,b.storage=8):A.isVector3||A.isColor?(b.boundary=16,b.storage=12):A.isVector4?(b.boundary=16,b.storage=16):A.isMatrix3?(b.boundary=48,b.storage=48):A.isMatrix4?(b.boundary=64,b.storage=64):A.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",A),b}function m(A){const b=A.target;b.removeEventListener("dispose",m);const M=a.indexOf(b.__bindingPointIndex);a.splice(M,1),n.deleteBuffer(r[b.id]),delete r[b.id],delete s[b.id]}function d(){for(const A in r)n.deleteBuffer(r[A]);a=[],r={},s={}}return{bind:c,update:u,dispose:d}}class r0{constructor(t={}){const{canvas:e=Xl(),context:i=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:u=!1,powerPreference:l="default",failIfMajorPerformanceCaveat:f=!1,reverseDepthBuffer:h=!1}=t;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=a;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,d=null;const A=[],b=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ae,this.toneMapping=Rn,this.toneMappingExposure=1;const M=this;let D=!1,w=0,C=0,I=null,E=-1,S=null;const P=new te,X=new te;let k=null;const K=new Lt(0);let Q=0,$=e.width,nt=e.height,q=1,ot=null,mt=null;const v=new te(0,0,$,nt),L=new te(0,0,$,nt);let H=!1;const R=new La;let O=!1,Z=!1;const J=new $t,lt=new $t,rt=new U,Tt=new te,kt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let St=!1;function Ut(){return I===null?q:1}let N=i;function me(y,B){return e.getContext(y,B)}try{const y={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:u,powerPreference:l,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Ma}`),e.addEventListener("webglcontextlost",et,!1),e.addEventListener("webglcontextrestored",pt,!1),e.addEventListener("webglcontextcreationerror",ft,!1),N===null){const B="webgl2";if(N=me(B,y),N===null)throw me(B)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(y){throw console.error("THREE.WebGLRenderer: "+y.message),y}let Ct,Nt,_t,Gt,Rt,T,x,G,tt,it,j,At,ht,xt,Wt,st,vt,Pt,It,Mt,Vt,zt,ee,F;function ut(){Ct=new ld(N),Ct.init(),zt=new $p(N,Ct),Nt=new id(N,Ct,t,zt),_t=new Xp(N,Ct),Nt.reverseDepthBuffer&&h&&_t.buffers.depth.setReversed(!0),Gt=new fd(N),Rt=new Pp,T=new Yp(N,Ct,_t,Rt,Nt,zt,Gt),x=new sd(M),G=new cd(M),tt=new xu(N),ee=new ed(N,tt),it=new ud(N,tt,Gt,ee),j=new pd(N,it,tt,Gt),It=new dd(N,Nt,T),st=new rd(Rt),At=new Cp(M,x,G,Ct,Nt,ee,st),ht=new n0(M,Rt),xt=new Ip,Wt=new Bp(Ct),Pt=new td(M,x,G,_t,j,p,c),vt=new Vp(M,j,Nt),F=new i0(N,Gt,Nt,_t),Mt=new nd(N,Ct,Gt),Vt=new hd(N,Ct,Gt),Gt.programs=At.programs,M.capabilities=Nt,M.extensions=Ct,M.properties=Rt,M.renderLists=xt,M.shadowMap=vt,M.state=_t,M.info=Gt}ut();const Y=new t0(M,N);this.xr=Y,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const y=Ct.get("WEBGL_lose_context");y&&y.loseContext()},this.forceContextRestore=function(){const y=Ct.get("WEBGL_lose_context");y&&y.restoreContext()},this.getPixelRatio=function(){return q},this.setPixelRatio=function(y){y!==void 0&&(q=y,this.setSize($,nt,!1))},this.getSize=function(y){return y.set($,nt)},this.setSize=function(y,B,V=!0){if(Y.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}$=y,nt=B,e.width=Math.floor(y*q),e.height=Math.floor(B*q),V===!0&&(e.style.width=y+"px",e.style.height=B+"px"),this.setViewport(0,0,y,B)},this.getDrawingBufferSize=function(y){return y.set($*q,nt*q).floor()},this.setDrawingBufferSize=function(y,B,V){$=y,nt=B,q=V,e.width=Math.floor(y*V),e.height=Math.floor(B*V),this.setViewport(0,0,y,B)},this.getCurrentViewport=function(y){return y.copy(P)},this.getViewport=function(y){return y.copy(v)},this.setViewport=function(y,B,V,W){y.isVector4?v.set(y.x,y.y,y.z,y.w):v.set(y,B,V,W),_t.viewport(P.copy(v).multiplyScalar(q).round())},this.getScissor=function(y){return y.copy(L)},this.setScissor=function(y,B,V,W){y.isVector4?L.set(y.x,y.y,y.z,y.w):L.set(y,B,V,W),_t.scissor(X.copy(L).multiplyScalar(q).round())},this.getScissorTest=function(){return H},this.setScissorTest=function(y){_t.setScissorTest(H=y)},this.setOpaqueSort=function(y){ot=y},this.setTransparentSort=function(y){mt=y},this.getClearColor=function(y){return y.copy(Pt.getClearColor())},this.setClearColor=function(){Pt.setClearColor.apply(Pt,arguments)},this.getClearAlpha=function(){return Pt.getClearAlpha()},this.setClearAlpha=function(){Pt.setClearAlpha.apply(Pt,arguments)},this.clear=function(y=!0,B=!0,V=!0){let W=0;if(y){let z=!1;if(I!==null){const at=I.texture.format;z=at===Ca||at===Ra||at===wa}if(z){const at=I.texture.type,dt=at===mn||at===$n||at===Xi||at===bi||at===ba||at===Ta,yt=Pt.getClearColor(),Et=Pt.getClearAlpha(),Dt=yt.r,Ot=yt.g,bt=yt.b;dt?(g[0]=Dt,g[1]=Ot,g[2]=bt,g[3]=Et,N.clearBufferuiv(N.COLOR,0,g)):(_[0]=Dt,_[1]=Ot,_[2]=bt,_[3]=Et,N.clearBufferiv(N.COLOR,0,_))}else W|=N.COLOR_BUFFER_BIT}B&&(W|=N.DEPTH_BUFFER_BIT),V&&(W|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),N.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",et,!1),e.removeEventListener("webglcontextrestored",pt,!1),e.removeEventListener("webglcontextcreationerror",ft,!1),xt.dispose(),Wt.dispose(),Rt.dispose(),x.dispose(),G.dispose(),j.dispose(),ee.dispose(),F.dispose(),At.dispose(),Y.dispose(),Y.removeEventListener("sessionstart",ka),Y.removeEventListener("sessionend",Ga),Nn.stop()};function et(y){y.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),D=!0}function pt(){console.log("THREE.WebGLRenderer: Context Restored."),D=!1;const y=Gt.autoReset,B=vt.enabled,V=vt.autoUpdate,W=vt.needsUpdate,z=vt.type;ut(),Gt.autoReset=y,vt.enabled=B,vt.autoUpdate=V,vt.needsUpdate=W,vt.type=z}function ft(y){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",y.statusMessage)}function Ft(y){const B=y.target;B.removeEventListener("dispose",Ft),se(B)}function se(y){ge(y),Rt.remove(y)}function ge(y){const B=Rt.get(y).programs;B!==void 0&&(B.forEach(function(V){At.releaseProgram(V)}),y.isShaderMaterial&&At.releaseShaderCache(y))}this.renderBufferDirect=function(y,B,V,W,z,at){B===null&&(B=kt);const dt=z.isMesh&&z.matrixWorld.determinant()<0,yt=el(y,B,V,W,z);_t.setMaterial(W,dt);let Et=V.index,Dt=1;if(W.wireframe===!0){if(Et=it.getWireframeAttribute(V),Et===void 0)return;Dt=2}const Ot=V.drawRange,bt=V.attributes.position;let Yt=Ot.start*Dt,ne=(Ot.start+Ot.count)*Dt;at!==null&&(Yt=Math.max(Yt,at.start*Dt),ne=Math.min(ne,(at.start+at.count)*Dt)),Et!==null?(Yt=Math.max(Yt,0),ne=Math.min(ne,Et.count)):bt!=null&&(Yt=Math.max(Yt,0),ne=Math.min(ne,bt.count));const ie=ne-Yt;if(ie<0||ie===1/0)return;ee.setup(z,W,yt,V,Et);let be,Kt=Mt;if(Et!==null&&(be=tt.get(Et),Kt=Vt,Kt.setIndex(be)),z.isMesh)W.wireframe===!0?(_t.setLineWidth(W.wireframeLinewidth*Ut()),Kt.setMode(N.LINES)):Kt.setMode(N.TRIANGLES);else if(z.isLine){let wt=W.linewidth;wt===void 0&&(wt=1),_t.setLineWidth(wt*Ut()),z.isLineSegments?Kt.setMode(N.LINES):z.isLineLoop?Kt.setMode(N.LINE_LOOP):Kt.setMode(N.LINE_STRIP)}else z.isPoints?Kt.setMode(N.POINTS):z.isSprite&&Kt.setMode(N.TRIANGLES);if(z.isBatchedMesh)if(z._multiDrawInstances!==null)Kt.renderMultiDrawInstances(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount,z._multiDrawInstances);else if(Ct.get("WEBGL_multi_draw"))Kt.renderMultiDraw(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount);else{const wt=z._multiDrawStarts,rn=z._multiDrawCounts,Zt=z._multiDrawCount,He=Et?tt.get(Et).bytesPerElement:1,Qn=Rt.get(W).currentProgram.getUniforms();for(let Ce=0;Ce<Zt;Ce++)Qn.setValue(N,"_gl_DrawID",Ce),Kt.render(wt[Ce]/He,rn[Ce])}else if(z.isInstancedMesh)Kt.renderInstances(Yt,ie,z.count);else if(V.isInstancedBufferGeometry){const wt=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,rn=Math.min(V.instanceCount,wt);Kt.renderInstances(Yt,ie,rn)}else Kt.render(Yt,ie)};function jt(y,B,V){y.transparent===!0&&y.side===De&&y.forceSinglePass===!1?(y.side=ve,y.needsUpdate=!0,Ji(y,B,V),y.side=Cn,y.needsUpdate=!0,Ji(y,B,V),y.side=De):Ji(y,B,V)}this.compile=function(y,B,V=null){V===null&&(V=y),d=Wt.get(V),d.init(B),b.push(d),V.traverseVisible(function(z){z.isLight&&z.layers.test(B.layers)&&(d.pushLight(z),z.castShadow&&d.pushShadow(z))}),y!==V&&y.traverseVisible(function(z){z.isLight&&z.layers.test(B.layers)&&(d.pushLight(z),z.castShadow&&d.pushShadow(z))}),d.setupLights();const W=new Set;return y.traverse(function(z){if(!(z.isMesh||z.isPoints||z.isLine||z.isSprite))return;const at=z.material;if(at)if(Array.isArray(at))for(let dt=0;dt<at.length;dt++){const yt=at[dt];jt(yt,V,z),W.add(yt)}else jt(at,V,z),W.add(at)}),b.pop(),d=null,W},this.compileAsync=function(y,B,V=null){const W=this.compile(y,B,V);return new Promise(z=>{function at(){if(W.forEach(function(dt){Rt.get(dt).currentProgram.isReady()&&W.delete(dt)}),W.size===0){z(y);return}setTimeout(at,10)}Ct.get("KHR_parallel_shader_compile")!==null?at():setTimeout(at,10)})};let ze=null;function nn(y){ze&&ze(y)}function ka(){Nn.stop()}function Ga(){Nn.start()}const Nn=new Dc;Nn.setAnimationLoop(nn),typeof self<"u"&&Nn.setContext(self),this.setAnimationLoop=function(y){ze=y,Y.setAnimationLoop(y),y===null?Nn.stop():Nn.start()},Y.addEventListener("sessionstart",ka),Y.addEventListener("sessionend",Ga),this.render=function(y,B){if(B!==void 0&&B.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;if(y.matrixWorldAutoUpdate===!0&&y.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),Y.enabled===!0&&Y.isPresenting===!0&&(Y.cameraAutoUpdate===!0&&Y.updateCamera(B),B=Y.getCamera()),y.isScene===!0&&y.onBeforeRender(M,y,B,I),d=Wt.get(y,b.length),d.init(B),b.push(d),lt.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),R.setFromProjectionMatrix(lt),Z=this.localClippingEnabled,O=st.init(this.clippingPlanes,Z),m=xt.get(y,A.length),m.init(),A.push(m),Y.enabled===!0&&Y.isPresenting===!0){const at=M.xr.getDepthSensingMesh();at!==null&&Vr(at,B,-1/0,M.sortObjects)}Vr(y,B,0,M.sortObjects),m.finish(),M.sortObjects===!0&&m.sort(ot,mt),St=Y.enabled===!1||Y.isPresenting===!1||Y.hasDepthSensing()===!1,St&&Pt.addToRenderList(m,y),this.info.render.frame++,O===!0&&st.beginShadows();const V=d.state.shadowsArray;vt.render(V,y,B),O===!0&&st.endShadows(),this.info.autoReset===!0&&this.info.reset();const W=m.opaque,z=m.transmissive;if(d.setupLights(),B.isArrayCamera){const at=B.cameras;if(z.length>0)for(let dt=0,yt=at.length;dt<yt;dt++){const Et=at[dt];Wa(W,z,y,Et)}St&&Pt.render(y);for(let dt=0,yt=at.length;dt<yt;dt++){const Et=at[dt];Va(m,y,Et,Et.viewport)}}else z.length>0&&Wa(W,z,y,B),St&&Pt.render(y),Va(m,y,B);I!==null&&(T.updateMultisampleRenderTarget(I),T.updateRenderTargetMipmap(I)),y.isScene===!0&&y.onAfterRender(M,y,B),ee.resetDefaultState(),E=-1,S=null,b.pop(),b.length>0?(d=b[b.length-1],O===!0&&st.setGlobalState(M.clippingPlanes,d.state.camera)):d=null,A.pop(),A.length>0?m=A[A.length-1]:m=null};function Vr(y,B,V,W){if(y.visible===!1)return;if(y.layers.test(B.layers)){if(y.isGroup)V=y.renderOrder;else if(y.isLOD)y.autoUpdate===!0&&y.update(B);else if(y.isLight)d.pushLight(y),y.castShadow&&d.pushShadow(y);else if(y.isSprite){if(!y.frustumCulled||R.intersectsSprite(y)){W&&Tt.setFromMatrixPosition(y.matrixWorld).applyMatrix4(lt);const dt=j.update(y),yt=y.material;yt.visible&&m.push(y,dt,yt,V,Tt.z,null)}}else if((y.isMesh||y.isLine||y.isPoints)&&(!y.frustumCulled||R.intersectsObject(y))){const dt=j.update(y),yt=y.material;if(W&&(y.boundingSphere!==void 0?(y.boundingSphere===null&&y.computeBoundingSphere(),Tt.copy(y.boundingSphere.center)):(dt.boundingSphere===null&&dt.computeBoundingSphere(),Tt.copy(dt.boundingSphere.center)),Tt.applyMatrix4(y.matrixWorld).applyMatrix4(lt)),Array.isArray(yt)){const Et=dt.groups;for(let Dt=0,Ot=Et.length;Dt<Ot;Dt++){const bt=Et[Dt],Yt=yt[bt.materialIndex];Yt&&Yt.visible&&m.push(y,dt,Yt,V,Tt.z,bt)}}else yt.visible&&m.push(y,dt,yt,V,Tt.z,null)}}const at=y.children;for(let dt=0,yt=at.length;dt<yt;dt++)Vr(at[dt],B,V,W)}function Va(y,B,V,W){const z=y.opaque,at=y.transmissive,dt=y.transparent;d.setupLightsView(V),O===!0&&st.setGlobalState(M.clippingPlanes,V),W&&_t.viewport(P.copy(W)),z.length>0&&ji(z,B,V),at.length>0&&ji(at,B,V),dt.length>0&&ji(dt,B,V),_t.buffers.depth.setTest(!0),_t.buffers.depth.setMask(!0),_t.buffers.color.setMask(!0),_t.setPolygonOffset(!1)}function Wa(y,B,V,W){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;d.state.transmissionRenderTarget[W.id]===void 0&&(d.state.transmissionRenderTarget[W.id]=new Kn(1,1,{generateMipmaps:!0,type:Ct.has("EXT_color_buffer_half_float")||Ct.has("EXT_color_buffer_float")?Yi:mn,minFilter:An,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Xt.workingColorSpace}));const at=d.state.transmissionRenderTarget[W.id],dt=W.viewport||P;at.setSize(dt.z,dt.w);const yt=M.getRenderTarget();M.setRenderTarget(at),M.getClearColor(K),Q=M.getClearAlpha(),Q<1&&M.setClearColor(16777215,.5),M.clear(),St&&Pt.render(V);const Et=M.toneMapping;M.toneMapping=Rn;const Dt=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),d.setupLightsView(W),O===!0&&st.setGlobalState(M.clippingPlanes,W),ji(y,V,W),T.updateMultisampleRenderTarget(at),T.updateRenderTargetMipmap(at),Ct.has("WEBGL_multisampled_render_to_texture")===!1){let Ot=!1;for(let bt=0,Yt=B.length;bt<Yt;bt++){const ne=B[bt],ie=ne.object,be=ne.geometry,Kt=ne.material,wt=ne.group;if(Kt.side===De&&ie.layers.test(W.layers)){const rn=Kt.side;Kt.side=ve,Kt.needsUpdate=!0,Xa(ie,V,W,be,Kt,wt),Kt.side=rn,Kt.needsUpdate=!0,Ot=!0}}Ot===!0&&(T.updateMultisampleRenderTarget(at),T.updateRenderTargetMipmap(at))}M.setRenderTarget(yt),M.setClearColor(K,Q),Dt!==void 0&&(W.viewport=Dt),M.toneMapping=Et}function ji(y,B,V){const W=B.isScene===!0?B.overrideMaterial:null;for(let z=0,at=y.length;z<at;z++){const dt=y[z],yt=dt.object,Et=dt.geometry,Dt=W===null?dt.material:W,Ot=dt.group;yt.layers.test(V.layers)&&Xa(yt,B,V,Et,Dt,Ot)}}function Xa(y,B,V,W,z,at){y.onBeforeRender(M,B,V,W,z,at),y.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,y.matrixWorld),y.normalMatrix.getNormalMatrix(y.modelViewMatrix),z.onBeforeRender(M,B,V,W,y,at),z.transparent===!0&&z.side===De&&z.forceSinglePass===!1?(z.side=ve,z.needsUpdate=!0,M.renderBufferDirect(V,B,W,z,y,at),z.side=Cn,z.needsUpdate=!0,M.renderBufferDirect(V,B,W,z,y,at),z.side=De):M.renderBufferDirect(V,B,W,z,y,at),y.onAfterRender(M,B,V,W,z,at)}function Ji(y,B,V){B.isScene!==!0&&(B=kt);const W=Rt.get(y),z=d.state.lights,at=d.state.shadowsArray,dt=z.state.version,yt=At.getParameters(y,z.state,at,B,V),Et=At.getProgramCacheKey(yt);let Dt=W.programs;W.environment=y.isMeshStandardMaterial?B.environment:null,W.fog=B.fog,W.envMap=(y.isMeshStandardMaterial?G:x).get(y.envMap||W.environment),W.envMapRotation=W.environment!==null&&y.envMap===null?B.environmentRotation:y.envMapRotation,Dt===void 0&&(y.addEventListener("dispose",Ft),Dt=new Map,W.programs=Dt);let Ot=Dt.get(Et);if(Ot!==void 0){if(W.currentProgram===Ot&&W.lightsStateVersion===dt)return Ya(y,yt),Ot}else yt.uniforms=At.getUniforms(y),y.onBeforeCompile(yt,M),Ot=At.acquireProgram(yt,Et),Dt.set(Et,Ot),W.uniforms=yt.uniforms;const bt=W.uniforms;return(!y.isShaderMaterial&&!y.isRawShaderMaterial||y.clipping===!0)&&(bt.clippingPlanes=st.uniform),Ya(y,yt),W.needsLights=il(y),W.lightsStateVersion=dt,W.needsLights&&(bt.ambientLightColor.value=z.state.ambient,bt.lightProbe.value=z.state.probe,bt.directionalLights.value=z.state.directional,bt.directionalLightShadows.value=z.state.directionalShadow,bt.spotLights.value=z.state.spot,bt.spotLightShadows.value=z.state.spotShadow,bt.rectAreaLights.value=z.state.rectArea,bt.ltc_1.value=z.state.rectAreaLTC1,bt.ltc_2.value=z.state.rectAreaLTC2,bt.pointLights.value=z.state.point,bt.pointLightShadows.value=z.state.pointShadow,bt.hemisphereLights.value=z.state.hemi,bt.directionalShadowMap.value=z.state.directionalShadowMap,bt.directionalShadowMatrix.value=z.state.directionalShadowMatrix,bt.spotShadowMap.value=z.state.spotShadowMap,bt.spotLightMatrix.value=z.state.spotLightMatrix,bt.spotLightMap.value=z.state.spotLightMap,bt.pointShadowMap.value=z.state.pointShadowMap,bt.pointShadowMatrix.value=z.state.pointShadowMatrix),W.currentProgram=Ot,W.uniformsList=null,Ot}function qa(y){if(y.uniformsList===null){const B=y.currentProgram.getUniforms();y.uniformsList=Cr.seqWithValue(B.seq,y.uniforms)}return y.uniformsList}function Ya(y,B){const V=Rt.get(y);V.outputColorSpace=B.outputColorSpace,V.batching=B.batching,V.batchingColor=B.batchingColor,V.instancing=B.instancing,V.instancingColor=B.instancingColor,V.instancingMorph=B.instancingMorph,V.skinning=B.skinning,V.morphTargets=B.morphTargets,V.morphNormals=B.morphNormals,V.morphColors=B.morphColors,V.morphTargetsCount=B.morphTargetsCount,V.numClippingPlanes=B.numClippingPlanes,V.numIntersection=B.numClipIntersection,V.vertexAlphas=B.vertexAlphas,V.vertexTangents=B.vertexTangents,V.toneMapping=B.toneMapping}function el(y,B,V,W,z){B.isScene!==!0&&(B=kt),T.resetTextureUnits();const at=B.fog,dt=W.isMeshStandardMaterial?B.environment:null,yt=I===null?M.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:wi,Et=(W.isMeshStandardMaterial?G:x).get(W.envMap||dt),Dt=W.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,Ot=!!V.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),bt=!!V.morphAttributes.position,Yt=!!V.morphAttributes.normal,ne=!!V.morphAttributes.color;let ie=Rn;W.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(ie=M.toneMapping);const be=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,Kt=be!==void 0?be.length:0,wt=Rt.get(W),rn=d.state.lights;if(O===!0&&(Z===!0||y!==S)){const Fe=y===S&&W.id===E;st.setState(W,y,Fe)}let Zt=!1;W.version===wt.__version?(wt.needsLights&&wt.lightsStateVersion!==rn.state.version||wt.outputColorSpace!==yt||z.isBatchedMesh&&wt.batching===!1||!z.isBatchedMesh&&wt.batching===!0||z.isBatchedMesh&&wt.batchingColor===!0&&z.colorTexture===null||z.isBatchedMesh&&wt.batchingColor===!1&&z.colorTexture!==null||z.isInstancedMesh&&wt.instancing===!1||!z.isInstancedMesh&&wt.instancing===!0||z.isSkinnedMesh&&wt.skinning===!1||!z.isSkinnedMesh&&wt.skinning===!0||z.isInstancedMesh&&wt.instancingColor===!0&&z.instanceColor===null||z.isInstancedMesh&&wt.instancingColor===!1&&z.instanceColor!==null||z.isInstancedMesh&&wt.instancingMorph===!0&&z.morphTexture===null||z.isInstancedMesh&&wt.instancingMorph===!1&&z.morphTexture!==null||wt.envMap!==Et||W.fog===!0&&wt.fog!==at||wt.numClippingPlanes!==void 0&&(wt.numClippingPlanes!==st.numPlanes||wt.numIntersection!==st.numIntersection)||wt.vertexAlphas!==Dt||wt.vertexTangents!==Ot||wt.morphTargets!==bt||wt.morphNormals!==Yt||wt.morphColors!==ne||wt.toneMapping!==ie||wt.morphTargetsCount!==Kt)&&(Zt=!0):(Zt=!0,wt.__version=W.version);let He=wt.currentProgram;Zt===!0&&(He=Ji(W,B,z));let Qn=!1,Ce=!1,Li=!1;const re=He.getUniforms(),Ze=wt.uniforms;if(_t.useProgram(He.program)&&(Qn=!0,Ce=!0,Li=!0),W.id!==E&&(E=W.id,Ce=!0),Qn||S!==y){_t.buffers.depth.getReversed()?(J.copy(y.projectionMatrix),Yl(J),$l(J),re.setValue(N,"projectionMatrix",J)):re.setValue(N,"projectionMatrix",y.projectionMatrix),re.setValue(N,"viewMatrix",y.matrixWorldInverse);const _n=re.map.cameraPosition;_n!==void 0&&_n.setValue(N,rt.setFromMatrixPosition(y.matrixWorld)),Nt.logarithmicDepthBuffer&&re.setValue(N,"logDepthBufFC",2/(Math.log(y.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&re.setValue(N,"isOrthographic",y.isOrthographicCamera===!0),S!==y&&(S=y,Ce=!0,Li=!0)}if(z.isSkinnedMesh){re.setOptional(N,z,"bindMatrix"),re.setOptional(N,z,"bindMatrixInverse");const Fe=z.skeleton;Fe&&(Fe.boneTexture===null&&Fe.computeBoneTexture(),re.setValue(N,"boneTexture",Fe.boneTexture,T))}z.isBatchedMesh&&(re.setOptional(N,z,"batchingTexture"),re.setValue(N,"batchingTexture",z._matricesTexture,T),re.setOptional(N,z,"batchingIdTexture"),re.setValue(N,"batchingIdTexture",z._indirectTexture,T),re.setOptional(N,z,"batchingColorTexture"),z._colorsTexture!==null&&re.setValue(N,"batchingColorTexture",z._colorsTexture,T));const Ii=V.morphAttributes;if((Ii.position!==void 0||Ii.normal!==void 0||Ii.color!==void 0)&&It.update(z,V,He),(Ce||wt.receiveShadow!==z.receiveShadow)&&(wt.receiveShadow=z.receiveShadow,re.setValue(N,"receiveShadow",z.receiveShadow)),W.isMeshGouraudMaterial&&W.envMap!==null&&(Ze.envMap.value=Et,Ze.flipEnvMap.value=Et.isCubeTexture&&Et.isRenderTargetTexture===!1?-1:1),W.isMeshStandardMaterial&&W.envMap===null&&B.environment!==null&&(Ze.envMapIntensity.value=B.environmentIntensity),Ce&&(re.setValue(N,"toneMappingExposure",M.toneMappingExposure),wt.needsLights&&nl(Ze,Li),at&&W.fog===!0&&ht.refreshFogUniforms(Ze,at),ht.refreshMaterialUniforms(Ze,W,q,nt,d.state.transmissionRenderTarget[y.id]),Cr.upload(N,qa(wt),Ze,T)),W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(Cr.upload(N,qa(wt),Ze,T),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&re.setValue(N,"center",z.center),re.setValue(N,"modelViewMatrix",z.modelViewMatrix),re.setValue(N,"normalMatrix",z.normalMatrix),re.setValue(N,"modelMatrix",z.matrixWorld),W.isShaderMaterial||W.isRawShaderMaterial){const Fe=W.uniformsGroups;for(let _n=0,xn=Fe.length;_n<xn;_n++){const $a=Fe[_n];F.update($a,He),F.bind($a,He)}}return He}function nl(y,B){y.ambientLightColor.needsUpdate=B,y.lightProbe.needsUpdate=B,y.directionalLights.needsUpdate=B,y.directionalLightShadows.needsUpdate=B,y.pointLights.needsUpdate=B,y.pointLightShadows.needsUpdate=B,y.spotLights.needsUpdate=B,y.spotLightShadows.needsUpdate=B,y.rectAreaLights.needsUpdate=B,y.hemisphereLights.needsUpdate=B}function il(y){return y.isMeshLambertMaterial||y.isMeshToonMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isShadowMaterial||y.isShaderMaterial&&y.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(y,B,V){Rt.get(y.texture).__webglTexture=B,Rt.get(y.depthTexture).__webglTexture=V;const W=Rt.get(y);W.__hasExternalTextures=!0,W.__autoAllocateDepthBuffer=V===void 0,W.__autoAllocateDepthBuffer||Ct.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),W.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(y,B){const V=Rt.get(y);V.__webglFramebuffer=B,V.__useDefaultFramebuffer=B===void 0},this.setRenderTarget=function(y,B=0,V=0){I=y,w=B,C=V;let W=!0,z=null,at=!1,dt=!1;if(y){const Et=Rt.get(y);if(Et.__useDefaultFramebuffer!==void 0)_t.bindFramebuffer(N.FRAMEBUFFER,null),W=!1;else if(Et.__webglFramebuffer===void 0)T.setupRenderTarget(y);else if(Et.__hasExternalTextures)T.rebindTextures(y,Rt.get(y.texture).__webglTexture,Rt.get(y.depthTexture).__webglTexture);else if(y.depthBuffer){const bt=y.depthTexture;if(Et.__boundDepthTexture!==bt){if(bt!==null&&Rt.has(bt)&&(y.width!==bt.image.width||y.height!==bt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");T.setupDepthRenderbuffer(y)}}const Dt=y.texture;(Dt.isData3DTexture||Dt.isDataArrayTexture||Dt.isCompressedArrayTexture)&&(dt=!0);const Ot=Rt.get(y).__webglFramebuffer;y.isWebGLCubeRenderTarget?(Array.isArray(Ot[B])?z=Ot[B][V]:z=Ot[B],at=!0):y.samples>0&&T.useMultisampledRTT(y)===!1?z=Rt.get(y).__webglMultisampledFramebuffer:Array.isArray(Ot)?z=Ot[V]:z=Ot,P.copy(y.viewport),X.copy(y.scissor),k=y.scissorTest}else P.copy(v).multiplyScalar(q).floor(),X.copy(L).multiplyScalar(q).floor(),k=H;if(_t.bindFramebuffer(N.FRAMEBUFFER,z)&&W&&_t.drawBuffers(y,z),_t.viewport(P),_t.scissor(X),_t.setScissorTest(k),at){const Et=Rt.get(y.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+B,Et.__webglTexture,V)}else if(dt){const Et=Rt.get(y.texture),Dt=B||0;N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,Et.__webglTexture,V||0,Dt)}E=-1},this.readRenderTargetPixels=function(y,B,V,W,z,at,dt){if(!(y&&y.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let yt=Rt.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&dt!==void 0&&(yt=yt[dt]),yt){_t.bindFramebuffer(N.FRAMEBUFFER,yt);try{const Et=y.texture,Dt=Et.format,Ot=Et.type;if(!Nt.textureFormatReadable(Dt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Nt.textureTypeReadable(Ot)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=y.width-W&&V>=0&&V<=y.height-z&&N.readPixels(B,V,W,z,zt.convert(Dt),zt.convert(Ot),at)}finally{const Et=I!==null?Rt.get(I).__webglFramebuffer:null;_t.bindFramebuffer(N.FRAMEBUFFER,Et)}}},this.readRenderTargetPixelsAsync=async function(y,B,V,W,z,at,dt){if(!(y&&y.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let yt=Rt.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&dt!==void 0&&(yt=yt[dt]),yt){const Et=y.texture,Dt=Et.format,Ot=Et.type;if(!Nt.textureFormatReadable(Dt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Nt.textureTypeReadable(Ot))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(B>=0&&B<=y.width-W&&V>=0&&V<=y.height-z){_t.bindFramebuffer(N.FRAMEBUFFER,yt);const bt=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,bt),N.bufferData(N.PIXEL_PACK_BUFFER,at.byteLength,N.STREAM_READ),N.readPixels(B,V,W,z,zt.convert(Dt),zt.convert(Ot),0);const Yt=I!==null?Rt.get(I).__webglFramebuffer:null;_t.bindFramebuffer(N.FRAMEBUFFER,Yt);const ne=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await ql(N,ne,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,bt),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,at),N.deleteBuffer(bt),N.deleteSync(ne),at}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(y,B=null,V=0){y.isTexture!==!0&&(Gi("WebGLRenderer: copyFramebufferToTexture function signature has changed."),B=arguments[0]||null,y=arguments[1]);const W=Math.pow(2,-V),z=Math.floor(y.image.width*W),at=Math.floor(y.image.height*W),dt=B!==null?B.x:0,yt=B!==null?B.y:0;T.setTexture2D(y,0),N.copyTexSubImage2D(N.TEXTURE_2D,V,0,0,dt,yt,z,at),_t.unbindTexture()},this.copyTextureToTexture=function(y,B,V=null,W=null,z=0){y.isTexture!==!0&&(Gi("WebGLRenderer: copyTextureToTexture function signature has changed."),W=arguments[0]||null,y=arguments[1],B=arguments[2],z=arguments[3]||0,V=null);let at,dt,yt,Et,Dt,Ot,bt,Yt,ne;const ie=y.isCompressedTexture?y.mipmaps[z]:y.image;V!==null?(at=V.max.x-V.min.x,dt=V.max.y-V.min.y,yt=V.isBox3?V.max.z-V.min.z:1,Et=V.min.x,Dt=V.min.y,Ot=V.isBox3?V.min.z:0):(at=ie.width,dt=ie.height,yt=ie.depth||1,Et=0,Dt=0,Ot=0),W!==null?(bt=W.x,Yt=W.y,ne=W.z):(bt=0,Yt=0,ne=0);const be=zt.convert(B.format),Kt=zt.convert(B.type);let wt;B.isData3DTexture?(T.setTexture3D(B,0),wt=N.TEXTURE_3D):B.isDataArrayTexture||B.isCompressedArrayTexture?(T.setTexture2DArray(B,0),wt=N.TEXTURE_2D_ARRAY):(T.setTexture2D(B,0),wt=N.TEXTURE_2D),N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,B.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,B.unpackAlignment);const rn=N.getParameter(N.UNPACK_ROW_LENGTH),Zt=N.getParameter(N.UNPACK_IMAGE_HEIGHT),He=N.getParameter(N.UNPACK_SKIP_PIXELS),Qn=N.getParameter(N.UNPACK_SKIP_ROWS),Ce=N.getParameter(N.UNPACK_SKIP_IMAGES);N.pixelStorei(N.UNPACK_ROW_LENGTH,ie.width),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,ie.height),N.pixelStorei(N.UNPACK_SKIP_PIXELS,Et),N.pixelStorei(N.UNPACK_SKIP_ROWS,Dt),N.pixelStorei(N.UNPACK_SKIP_IMAGES,Ot);const Li=y.isDataArrayTexture||y.isData3DTexture,re=B.isDataArrayTexture||B.isData3DTexture;if(y.isRenderTargetTexture||y.isDepthTexture){const Ze=Rt.get(y),Ii=Rt.get(B),Fe=Rt.get(Ze.__renderTarget),_n=Rt.get(Ii.__renderTarget);_t.bindFramebuffer(N.READ_FRAMEBUFFER,Fe.__webglFramebuffer),_t.bindFramebuffer(N.DRAW_FRAMEBUFFER,_n.__webglFramebuffer);for(let xn=0;xn<yt;xn++)Li&&N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Rt.get(y).__webglTexture,z,Ot+xn),y.isDepthTexture?(re&&N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Rt.get(B).__webglTexture,z,ne+xn),N.blitFramebuffer(Et,Dt,at,dt,bt,Yt,at,dt,N.DEPTH_BUFFER_BIT,N.NEAREST)):re?N.copyTexSubImage3D(wt,z,bt,Yt,ne+xn,Et,Dt,at,dt):N.copyTexSubImage2D(wt,z,bt,Yt,ne+xn,Et,Dt,at,dt);_t.bindFramebuffer(N.READ_FRAMEBUFFER,null),_t.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else re?y.isDataTexture||y.isData3DTexture?N.texSubImage3D(wt,z,bt,Yt,ne,at,dt,yt,be,Kt,ie.data):B.isCompressedArrayTexture?N.compressedTexSubImage3D(wt,z,bt,Yt,ne,at,dt,yt,be,ie.data):N.texSubImage3D(wt,z,bt,Yt,ne,at,dt,yt,be,Kt,ie):y.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,z,bt,Yt,at,dt,be,Kt,ie.data):y.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,z,bt,Yt,ie.width,ie.height,be,ie.data):N.texSubImage2D(N.TEXTURE_2D,z,bt,Yt,at,dt,be,Kt,ie);N.pixelStorei(N.UNPACK_ROW_LENGTH,rn),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,Zt),N.pixelStorei(N.UNPACK_SKIP_PIXELS,He),N.pixelStorei(N.UNPACK_SKIP_ROWS,Qn),N.pixelStorei(N.UNPACK_SKIP_IMAGES,Ce),z===0&&B.generateMipmaps&&N.generateMipmap(wt),_t.unbindTexture()},this.copyTextureToTexture3D=function(y,B,V=null,W=null,z=0){return y.isTexture!==!0&&(Gi("WebGLRenderer: copyTextureToTexture3D function signature has changed."),V=arguments[0]||null,W=arguments[1]||null,y=arguments[2],B=arguments[3],z=arguments[4]||0),Gi('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(y,B,V,W,z)},this.initRenderTarget=function(y){Rt.get(y).__webglFramebuffer===void 0&&T.setupRenderTarget(y)},this.initTexture=function(y){y.isCubeTexture?T.setTextureCube(y,0):y.isData3DTexture?T.setTexture3D(y,0):y.isDataArrayTexture||y.isCompressedArrayTexture?T.setTexture2DArray(y,0):T.setTexture2D(y,0),_t.unbindTexture()},this.resetState=function(){w=0,C=0,I=null,_t.reset(),ee.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return hn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=Xt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Xt._getUnpackColorSpace()}}class Hc extends de{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ne,this.environmentIntensity=1,this.environmentRotation=new Ne,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class s0 extends Me{constructor(t=null,e=1,i=1,r,s,a,o,c,u=Ue,l=Ue,f,h){super(null,a,o,c,u,l,r,s,f,h),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class pa extends Ee{constructor(t,e,i,r=1){super(t,e,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const pi=new $t,qo=new $t,Sr=[],Yo=new Zn,a0=new $t,Bi=new Qt,zi=new Ci;class kc extends Qt{constructor(t,e,i){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new pa(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<i;r++)this.setMatrixAt(r,a0)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Zn),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,pi),Yo.copy(t.boundingBox).applyMatrix4(pi),this.boundingBox.union(Yo)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ci),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,pi),zi.copy(t.boundingSphere).applyMatrix4(pi),this.boundingSphere.union(zi)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const i=e.morphTargetInfluences,r=this.morphTexture.source.data.data,s=i.length+1,a=t*s+1;for(let o=0;o<i.length;o++)i[o]=r[a+o]}raycast(t,e){const i=this.matrixWorld,r=this.count;if(Bi.geometry=this.geometry,Bi.material=this.material,Bi.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),zi.copy(this.boundingSphere),zi.applyMatrix4(i),t.ray.intersectsSphere(zi)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,pi),qo.multiplyMatrices(i,pi),Bi.matrixWorld=qo,Bi.raycast(t,Sr);for(let a=0,o=Sr.length;a<o;a++){const c=Sr[a];c.instanceId=s,c.object=this,e.push(c)}Sr.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new pa(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const i=e.morphTargetInfluences,r=i.length+1;this.morphTexture===null&&(this.morphTexture=new s0(new Float32Array(r*this.count),r,this.count,Aa,Qe));const s=this.morphTexture.source.data.data;let a=0;for(let u=0;u<i.length;u++)a+=i[u];const o=this.geometry.morphTargetsRelative?1:1-a,c=r*t;s[c]=o,s.set(i,c+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class o0 extends jn{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new Lt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const $o=new $t,ma=new Tc,yr=new Ci,Er=new U;class c0 extends de{constructor(t=new Re,e=new o0){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const i=this.geometry,r=this.matrixWorld,s=t.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),yr.copy(i.boundingSphere),yr.applyMatrix4(r),yr.radius+=s,t.ray.intersectsSphere(yr)===!1)return;$o.copy(r).invert(),ma.copy(t.ray).applyMatrix4($o);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,u=i.index,f=i.attributes.position;if(u!==null){const h=Math.max(0,a.start),p=Math.min(u.count,a.start+a.count);for(let g=h,_=p;g<_;g++){const m=u.getX(g);Er.fromBufferAttribute(f,m),Ko(Er,m,c,r,t,e,this)}}else{const h=Math.max(0,a.start),p=Math.min(f.count,a.start+a.count);for(let g=h,_=p;g<_;g++)Er.fromBufferAttribute(f,g),Ko(Er,g,c,r,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const r=e[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Ko(n,t,e,i,r,s,a){const o=ma.distanceSqToPoint(n);if(o<e){const c=new U;ma.closestPointToPoint(n,c),c.applyMatrix4(i);const u=r.ray.origin.distanceTo(c);if(u<r.near||u>r.far)return;s.push({distance:u,distanceToRay:Math.sqrt(o),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}class Gc extends Me{constructor(t,e,i,r,s,a,o,c,u){super(t,e,i,r,s,a,o,c,u),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Hr extends Re{constructor(t=1,e=1,i=1,r=32,s=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:c};const u=this;r=Math.floor(r),s=Math.floor(s);const l=[],f=[],h=[],p=[];let g=0;const _=[],m=i/2;let d=0;A(),a===!1&&(t>0&&b(!0),e>0&&b(!1)),this.setIndex(l),this.setAttribute("position",new le(f,3)),this.setAttribute("normal",new le(h,3)),this.setAttribute("uv",new le(p,2));function A(){const M=new U,D=new U;let w=0;const C=(e-t)/i;for(let I=0;I<=s;I++){const E=[],S=I/s,P=S*(e-t)+t;for(let X=0;X<=r;X++){const k=X/r,K=k*c+o,Q=Math.sin(K),$=Math.cos(K);D.x=P*Q,D.y=-S*i+m,D.z=P*$,f.push(D.x,D.y,D.z),M.set(Q,C,$).normalize(),h.push(M.x,M.y,M.z),p.push(k,1-S),E.push(g++)}_.push(E)}for(let I=0;I<r;I++)for(let E=0;E<s;E++){const S=_[E][I],P=_[E+1][I],X=_[E+1][I+1],k=_[E][I+1];(t>0||E!==0)&&(l.push(S,P,k),w+=3),(e>0||E!==s-1)&&(l.push(P,X,k),w+=3)}u.addGroup(d,w,0),d+=w}function b(M){const D=g,w=new qt,C=new U;let I=0;const E=M===!0?t:e,S=M===!0?1:-1;for(let X=1;X<=r;X++)f.push(0,m*S,0),h.push(0,S,0),p.push(.5,.5),g++;const P=g;for(let X=0;X<=r;X++){const K=X/r*c+o,Q=Math.cos(K),$=Math.sin(K);C.x=E*$,C.y=m*S,C.z=E*Q,f.push(C.x,C.y,C.z),h.push(0,S,0),w.x=Q*.5+.5,w.y=$*.5*S+.5,p.push(w.x,w.y),g++}for(let X=0;X<r;X++){const k=D+X,K=P+X;M===!0?l.push(K,K+1,k):l.push(K+1,K,k),I+=3}u.addGroup(d,I,M===!0?1:2),d+=I}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Hr(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Da extends Hr{constructor(t=1,e=1,i=32,r=1,s=!1,a=0,o=Math.PI*2){super(0,t,e,i,r,s,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:i,heightSegments:r,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(t){return new Da(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Ki extends Re{constructor(t=1,e=32,i=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));const c=Math.min(a+o,Math.PI);let u=0;const l=[],f=new U,h=new U,p=[],g=[],_=[],m=[];for(let d=0;d<=i;d++){const A=[],b=d/i;let M=0;d===0&&a===0?M=.5/e:d===i&&c===Math.PI&&(M=-.5/e);for(let D=0;D<=e;D++){const w=D/e;f.x=-t*Math.cos(r+w*s)*Math.sin(a+b*o),f.y=t*Math.cos(a+b*o),f.z=t*Math.sin(r+w*s)*Math.sin(a+b*o),g.push(f.x,f.y,f.z),h.copy(f).normalize(),_.push(h.x,h.y,h.z),m.push(w+M,1-b),A.push(u++)}l.push(A)}for(let d=0;d<i;d++)for(let A=0;A<e;A++){const b=l[d][A+1],M=l[d][A],D=l[d+1][A],w=l[d+1][A+1];(d!==0||a>0)&&p.push(b,M,w),(d!==i-1||c<Math.PI)&&p.push(M,D,w)}this.setIndex(p),this.setAttribute("position",new le(g,3)),this.setAttribute("normal",new le(_,3)),this.setAttribute("uv",new le(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ki(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Ua extends Re{constructor(t=1,e=.4,i=12,r=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:i,tubularSegments:r,arc:s},i=Math.floor(i),r=Math.floor(r);const a=[],o=[],c=[],u=[],l=new U,f=new U,h=new U;for(let p=0;p<=i;p++)for(let g=0;g<=r;g++){const _=g/r*s,m=p/i*Math.PI*2;f.x=(t+e*Math.cos(m))*Math.cos(_),f.y=(t+e*Math.cos(m))*Math.sin(_),f.z=e*Math.sin(m),o.push(f.x,f.y,f.z),l.x=t*Math.cos(_),l.y=t*Math.sin(_),h.subVectors(f,l).normalize(),c.push(h.x,h.y,h.z),u.push(g/r),u.push(p/i)}for(let p=1;p<=i;p++)for(let g=1;g<=r;g++){const _=(r+1)*p+g-1,m=(r+1)*(p-1)+g-1,d=(r+1)*(p-1)+g,A=(r+1)*p+g;a.push(_,m,A),a.push(m,d,A)}this.setIndex(a),this.setAttribute("position",new le(o,3)),this.setAttribute("normal",new le(c,3)),this.setAttribute("uv",new le(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ua(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class ga extends jn{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Lt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Lt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Pa,this.normalScale=new qt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ne,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class l0 extends jn{static get type(){return"MeshLambertMaterial"}constructor(t){super(),this.isMeshLambertMaterial=!0,this.color=new Lt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Lt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Pa,this.normalScale=new qt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ne,this.combine=ya,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Na extends de{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Lt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class u0 extends Na{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(de.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Lt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Ms=new $t,Zo=new U,jo=new U;class Vc{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new qt(512,512),this.map=null,this.mapPass=null,this.matrix=new $t,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new La,this._frameExtents=new qt(1,1),this._viewportCount=1,this._viewports=[new te(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,i=this.matrix;Zo.setFromMatrixPosition(t.matrixWorld),e.position.copy(Zo),jo.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(jo),e.updateMatrixWorld(),Ms.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ms),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Ms)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const Jo=new $t,Hi=new U,Ss=new U;class h0 extends Vc{constructor(){super(new Ie(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new qt(4,2),this._viewportCount=6,this._viewports=[new te(2,1,1,1),new te(0,1,1,1),new te(3,1,1,1),new te(1,1,1,1),new te(3,0,1,1),new te(1,0,1,1)],this._cubeDirections=[new U(1,0,0),new U(-1,0,0),new U(0,0,1),new U(0,0,-1),new U(0,1,0),new U(0,-1,0)],this._cubeUps=[new U(0,1,0),new U(0,1,0),new U(0,1,0),new U(0,1,0),new U(0,0,1),new U(0,0,-1)]}updateMatrices(t,e=0){const i=this.camera,r=this.matrix,s=t.distance||i.far;s!==i.far&&(i.far=s,i.updateProjectionMatrix()),Hi.setFromMatrixPosition(t.matrixWorld),i.position.copy(Hi),Ss.copy(i.position),Ss.add(this._cubeDirections[e]),i.up.copy(this._cubeUps[e]),i.lookAt(Ss),i.updateMatrixWorld(),r.makeTranslation(-Hi.x,-Hi.y,-Hi.z),Jo.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Jo)}}class Fa extends Na{constructor(t,e,i=0,r=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=r,this.shadow=new h0}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class f0 extends Vc{constructor(){super(new Uc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class d0 extends Na{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(de.DEFAULT_UP),this.updateMatrix(),this.target=new de,this.shadow=new f0}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ma}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ma);class p0 extends Hc{constructor(){super();const t=new In;t.deleteAttribute("uv");const e=new ga({side:ve}),i=new ga,r=new Fa(16777215,900,28,2);r.position.set(.418,16.199,.3),this.add(r);const s=new Qt(t,e);s.position.set(-.757,13.219,.717),s.scale.set(31.713,28.305,28.591),this.add(s);const a=new Qt(t,i);a.position.set(-10.906,2.009,1.846),a.rotation.set(0,-.195,0),a.scale.set(2.328,7.905,4.651),this.add(a);const o=new Qt(t,i);o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),this.add(o);const c=new Qt(t,i);c.position.set(6.167,.857,7.803),c.rotation.set(0,.561,0),c.scale.set(3.927,6.285,3.687),this.add(c);const u=new Qt(t,i);u.position.set(-2.017,.018,6.124),u.rotation.set(0,.333,0),u.scale.set(2.002,4.566,2.064),this.add(u);const l=new Qt(t,i);l.position.set(2.291,-.756,-2.621),l.rotation.set(0,-.286,0),l.scale.set(1.546,1.552,1.496),this.add(l);const f=new Qt(t,i);f.position.set(-2.193,-.369,-5.547),f.rotation.set(0,.516,0),f.scale.set(3.875,3.487,2.986),this.add(f);const h=new Qt(t,mi(50));h.position.set(-16.116,14.37,8.208),h.scale.set(.1,2.428,2.739),this.add(h);const p=new Qt(t,mi(50));p.position.set(-16.109,18.021,-8.207),p.scale.set(.1,2.425,2.751),this.add(p);const g=new Qt(t,mi(17));g.position.set(14.904,12.198,-1.832),g.scale.set(.15,4.265,6.331),this.add(g);const _=new Qt(t,mi(43));_.position.set(-.462,8.89,14.52),_.scale.set(4.38,5.441,.088),this.add(_);const m=new Qt(t,mi(20));m.position.set(3.235,11.486,-12.541),m.scale.set(2.5,2,.1),this.add(m);const d=new Qt(t,mi(100));d.position.set(0,20,0),d.scale.set(1,.1,1),this.add(d)}dispose(){const t=new Set;this.traverse(e=>{e.isMesh&&(t.add(e.geometry),t.add(e.material))});for(const e of t)e.dispose()}}function mi(n){const t=new Pn;return t.color.setScalar(n),t}function Dn(n){let t=n>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function pe(n,t=4,e=4){const i=Dn(n),r=[];for(let s=0;s<e;s++){const a=t<<s,o=new Float32Array(a*a);for(let c=0;c<o.length;c++)o[c]=i();r.push({P:a,g:o})}return(s,a)=>{let o=0,c=.5,u=0;for(const{P:l,g:f}of r){const h=s*l,p=a*l,g=Math.floor(h),_=Math.floor(p),m=h-g,d=p-_,A=m*m*(3-2*m),b=d*d*(3-2*d),M=(g%l+l)%l,D=(M+1)%l,w=(_%l+l)%l,C=(w+1)%l,I=f[w*l+M],E=f[w*l+D],S=f[C*l+M],P=f[C*l+D];o+=c*(I+(E-I)*A+(S-I)*b+(I-E-S+P)*A*b),u+=c,c*=.5}return o/u}}function Ke(n,t){const e=document.createElement("canvas");return e.width=n,e.height=t,e}function en(n,t=!0,e=!0){const i=new Gc(n);return t&&(i.colorSpace=Ae),e&&(i.wrapS=i.wrapT=Ir),i.anisotropy=8,i.generateMipmaps=!0,i.minFilter=An,i}function Un(n,t){const e=n.getContext("2d"),i=e.createImageData(n.width,n.height),r=i.data,s=[0,0,0];for(let a=0;a<n.height;a++)for(let o=0;o<n.width;o++){t(o/n.width,a/n.height,s,o,a);const c=(a*n.width+o)*4;r[c]=s[0],r[c+1]=s[1],r[c+2]=s[2],r[c+3]=255}return e.putImageData(i,0,0),e}const Ye=(n,t=0,e=255)=>n<t?t:n>e?e:n;function ys(n,t,e,i={}){const r=i.size||512,s=Ke(r,r),a=pe(n,2,4),o=pe(n+7,8,3),c=pe(n+13,3,4),u=i.rings||9;return Un(s,(l,f,h)=>{const p=a(l*.5,f)*3;let g=Math.sin((f*u+p)*Math.PI*2);g=Math.pow(Math.abs(g),.35);const _=o(l*.25,f*8),m=o(l*2,f*32%1);let d=.55*g+.3*_+.15*m;d=d*(.85+.3*c(l,f));for(let A=0;A<3;A++)h[A]=Ye(e[A]+(t[A]-e[A])*d)}),en(s)}function m0(n){const e=Ke(1024,1024),i=Dn(n),r=8,s=[];for(let f=0;f<r;f++)s.push({off:i(),tone:.78+i()*.35,hue:i(),len:.45+i()*.3});const a=pe(n+3,2,4),o=pe(n+9,8,3),c=pe(n+11,3,4),u=[150,98,58],l=[78,46,24];return Un(e,(f,h,p)=>{const g=Math.floor(h*r),_=s[g],m=h*r-g,d=(f+_.off)%1,A=Math.floor(d/_.len*2),b=d/_.len*2%1,M=_.tone*(A%2?.92:1.04)*(.96+.08*Math.sin(A*12.9+g)),D=a(f,h*.5+g*.13)*2.5;let w=Math.abs(Math.sin((m*3+D+A)*Math.PI*2));w=Math.pow(w,.4);const C=o(f*.5,h*4);let I=(.55*w+.45*C)*M;const E=c(f,h);I*=.9+.2*E;let S=Math.min(m,1-m)*64,P=Math.min(b,1-b)*260;const X=Math.min(1,S,P);for(let k=0;k<3;k++)p[k]=Ye((l[k]+(u[k]-l[k])*I)*(.25+.75*X)+(_.hue-.5)*(k===0?12:k===1?6:0))}),en(e)}function Qo(n,t){const i=Ke(512,512),r=pe(n,4,5),s=pe(n+1,16,2);return Un(i,(a,o,c)=>{const u=r(a,o),l=s(a,o),f=.88+.16*u+.05*l;c[0]=Ye(t[0]*f),c[1]=Ye(t[1]*f),c[2]=Ye(t[2]*(f-.02))}),en(i)}function g0(n){const e=Ke(512,512),i=pe(n,6,5),r=pe(n+4,24,2);return Un(e,(s,a,o)=>{const c=Math.floor(a*4),u=(s+c%2*.5)%1,l=a*4-c,f=u*2-Math.floor(u*2),h=Math.min(1,Math.min(l,1-l)*40,Math.min(f,1-f)*60),p=(.8+.25*i(s,a)+.08*r(s,a))*(.55+.45*h);o[0]=Ye(196*p),o[1]=Ye(178*p),o[2]=Ye(150*p)}),en(e)}function tc(n,t){const i=Ke(512,512),r=pe(n,64,2),s=pe(n+2,8,4),a=pe(n+5,3,4);return Un(i,(o,c,u)=>{const l=r(o,c),h=Math.abs(s(o,c)-.5)<.015?.7:1,p=Math.max(0,a(o,c)-.52)*3.2,g=(.82+.3*l)*h;for(let _=0;_<3;_++){const m=t[_]+(_===0?70:_===1?52:36);u[_]=Ye((t[_]*(1-p)+m*p)*g)}}),en(i)}function Es(n,t,e){const r=Ke(256,256),s=pe(n,8,3);return Un(r,(a,o,c,u,l)=>{const f=((u+l)%4<2?1:.92)*(u%2?1:.96),h=e&&Math.sin(a*Math.PI*2*6)>.6?.82:1,p=f*h*(.9+.15*s(a,o));for(let g=0;g<3;g++)c[g]=Ye(t[g]*p)}),en(r)}function _0(n){const i=Ke(512,768),r=i.getContext("2d");r.fillStyle="#7a2a22",r.fillRect(0,0,512,768);const s=(f,h,p)=>{r.strokeStyle=p,r.lineWidth=h,r.strokeRect(f,f,512-f*2,768-f*2)};s(14,22,"#2a2440"),s(34,6,"#c9a46a"),s(52,26,"#3c4a5c"),s(70,5,"#c9a46a"),r.fillStyle="#d2b07a";for(let f=0;f<26;f++){const h=f/26,p=[[h*512,52],[460,h*768],[512-h*512,716],[52,768-h*768]];for(const[g,_]of p)r.save(),r.translate(g,_),r.rotate(Math.PI/4),r.fillRect(-5,-5,10,10),r.restore()}for(let f=110;f<668;f+=48)for(let h=110;h<412;h+=48)r.fillStyle=(h+f)%96===0?"#2f3a52":"#a8742f",r.save(),r.translate(h,f),r.rotate(Math.PI/4),r.fillRect(-7,-7,14,14),r.restore(),r.fillStyle="#e0c590",r.fillRect(h-2,f-2,4,4);r.save(),r.translate(512/2,768/2);const a=[[150,"#2a2440"],[130,"#c9a46a"],[118,"#3c4a5c"],[86,"#8e3a2a"],[60,"#d8bd85"],[36,"#2a2440"]];for(const[f,h]of a)r.fillStyle=h,r.beginPath(),r.ellipse(0,0,f*.75,f,0,0,Math.PI*2),r.fill();r.restore();const o=r.getImageData(0,0,512,768),c=pe(n+3,4,4),u=pe(n+5,64,1);for(let f=0;f<768;f++)for(let h=0;h<512;h++){const p=(f*512+h)*4,g=.78+.28*c(h/512,f/768)+.08*u(h/512,f/768),_=Math.max(0,c(h/512+.3,f/768)-.58)*1.6;for(let m=0;m<3;m++)o.data[p+m]=Ye(o.data[p+m]*g*(1-_)+150*_)}return r.putImageData(o,0,0),en(i,!0,!1)}function x0(n){const i=Ke(512,256),r=i.getContext("2d"),s=Dn(n),a=pe(n,16,3);Un(i,(u,l,f)=>{const h=200+40*a(u,l);f[0]=f[1]=f[2]=h});const o="#d9a94a",c=32;for(let u=0;u<8;u++){const l=u*c;r.save(),r.beginPath(),r.rect(l,0,c,256),r.clip();const f=r.createLinearGradient(l,0,l+c,0);if(f.addColorStop(0,"rgba(0,0,0,0.35)"),f.addColorStop(.2,"rgba(0,0,0,0)"),f.addColorStop(.8,"rgba(0,0,0,0)"),f.addColorStop(1,"rgba(0,0,0,0.35)"),r.fillStyle=f,r.fillRect(l,0,c,256),r.fillStyle=o,u===0&&(r.fillRect(l,14,c,2),r.fillRect(l,240,c,2)),u===1){for(const h of[40,90,140,190])r.fillStyle="rgba(0,0,0,0.45)",r.fillRect(l,h,c,6),r.fillStyle="rgba(255,255,255,0.35)",r.fillRect(l,h,c,2);r.fillStyle="#2a1a14",r.fillRect(l+3,52,c-6,30),r.fillStyle=o;for(let h=0;h<3;h++)r.fillRect(l+7,60+h*7,c-14-s()*6,2)}if(u===2){for(let h=0;h<6;h++)r.fillRect(l+8,50+h*9,c-16-s()*8,3);r.fillRect(l,226,c,6)}if(u===3){r.fillStyle="rgba(0,0,0,0.5)",r.fillRect(l,0,c,34),r.fillRect(l,222,c,34),r.fillStyle=o,r.fillRect(l,34,c,2),r.fillRect(l,220,c,2);for(let h=0;h<4;h++)r.fillRect(l+9,80+h*8,c-18,2)}if(u===4){r.fillStyle="rgba(255,255,255,0.25)",r.fillRect(l,0,c,256),r.fillStyle="rgba(20,20,20,0.75)";for(let h=0;h<10;h++)r.fillRect(l+12,40+h*12,3+s()*4,7)}if(u===5){for(const h of[8,16,24,230,238,246])r.fillRect(l,h,c,2);for(let h=0;h<5;h++)r.beginPath(),r.arc(l+c/2,60+h*30,3,0,Math.PI*2),r.fill();r.fillStyle="#1d1d1d",r.fillRect(l+4,34,c-8,18),r.fillStyle=o,r.fillRect(l+8,41,c-16,3)}if(u===6){r.fillStyle="rgba(255,255,255,0.3)";for(let h=0;h<40;h++)r.fillRect(l+s()*c,s()<.5?s()*30:256-s()*30,2+s()*4,1+s()*2);r.fillStyle=o,r.fillRect(l+10,70,c-20,3)}u===7&&(r.fillStyle="rgba(0,0,0,0.55)",r.fillRect(l,20,c,10),r.fillRect(l,226,c,10),r.fillStyle="rgba(240,235,220,1)",r.fillRect(l+5,60,c-10,34),r.fillStyle="rgba(40,30,20,0.8)",r.fillRect(l+8,70,c-16,2),r.fillRect(l+8,78,c-18,2)),r.restore()}for(let u=256;u<384;u++){const l=215+(Math.sin(u*2.7)*.5+.5)*30*s();r.fillStyle=`rgb(${l},${l},${l-4})`,r.fillRect(u,0,1,256)}return en(i,!0,!1)}function v0(n){const e=Ke(512,512),i=e.getContext("2d"),r=Dn(n);return[["#d8b27a","#8a6a4a","#4b5a3a","#2e3a2a"],["#9fb3c0","#6a7a6a","#3e4a3a","#22281e"],["#e8c28a","#b07a4a","#5a3a2a","#2a1e18"],["#7a8aa0","#5a6058","#3a3a30","#1e1e18"]].forEach((a,o)=>{const c=o%2*256,u=Math.floor(o/2)*256,l=i.createLinearGradient(0,u,0,u+256);l.addColorStop(0,a[0]),l.addColorStop(.55,a[1]),l.addColorStop(1,a[3]),i.fillStyle=l,i.fillRect(c,u,256,256);for(let h=0;h<3;h++){i.fillStyle=a[1+h],i.beginPath(),i.moveTo(c,u+256);const p=120+h*45;for(let g=0;g<=16;g++)i.lineTo(c+g*16,u+p+Math.sin(g*.7+h*2+o)*18+r()*10);i.lineTo(c+256,u+256),i.fill()}o===2&&(i.fillStyle="rgba(255,230,170,0.8)",i.beginPath(),i.arc(c+180,u+90,18,0,7),i.fill());const f=i.createRadialGradient(c+128,u+128,40,c+128,u+128,190);f.addColorStop(0,"rgba(60,40,10,0)"),f.addColorStop(1,"rgba(40,25,5,0.55)"),i.fillStyle=f,i.fillRect(c,u,256,256)}),en(e,!0,!1)}function M0(n){const i=Ke(512,256),r=pe(n,4,5);return Un(i,(s,a,o)=>{const c=r(s,a*.5+.2)>.53,u=Math.abs(a-.5),l=Math.abs(s*24%1)<.03||Math.abs(a*12%1)<.04?.82:1;c?(o[0]=196*l,o[1]=168*l,o[2]=112*l):(o[0]=(150-u*60)*l,o[1]=(140-u*40)*l,o[2]=(100-u*20)*l)}),en(i,!0,!1)}function S0(){const n=Ke(64,64),t=n.getContext("2d"),e=t.createRadialGradient(32,32,0,32,32,32);return e.addColorStop(0,"rgba(255,255,255,1)"),e.addColorStop(.4,"rgba(255,255,255,0.35)"),e.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=e,t.fillRect(0,0,64,64),new Gc(n)}function y0(n,t=!1){const e=n[0].index!==null,i=new Set(Object.keys(n[0].attributes)),r=new Set(Object.keys(n[0].morphAttributes)),s={},a={},o=n[0].morphTargetsRelative,c=new Re;let u=0;for(let l=0;l<n.length;++l){const f=n[l];let h=0;if(e!==(f.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+l+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const p in f.attributes){if(!i.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+l+'. All geometries must have compatible attributes; make sure "'+p+'" attribute exists among all geometries, or in none of them.'),null;s[p]===void 0&&(s[p]=[]),s[p].push(f.attributes[p]),h++}if(h!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+l+". Make sure all geometries have the same number of attributes."),null;if(o!==f.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+l+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const p in f.morphAttributes){if(!r.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+l+".  .morphAttributes must be consistent throughout all geometries."),null;a[p]===void 0&&(a[p]=[]),a[p].push(f.morphAttributes[p])}if(t){let p;if(e)p=f.index.count;else if(f.attributes.position!==void 0)p=f.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+l+". The geometry must have either an index or a position attribute"),null;c.addGroup(u,p,l),u+=p}}if(e){let l=0;const f=[];for(let h=0;h<n.length;++h){const p=n[h].index;for(let g=0;g<p.count;++g)f.push(p.getX(g)+l);l+=n[h].attributes.position.count}c.setIndex(f)}for(const l in s){const f=ec(s[l]);if(!f)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+l+" attribute."),null;c.setAttribute(l,f)}for(const l in a){const f=a[l][0].length;if(f===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[l]=[];for(let h=0;h<f;++h){const p=[];for(let _=0;_<a[l].length;++_)p.push(a[l][_][h]);const g=ec(p);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+l+" morphAttribute."),null;c.morphAttributes[l].push(g)}}return c}function ec(n){let t,e,i,r=-1,s=0;for(let u=0;u<n.length;++u){const l=n[u];if(t===void 0&&(t=l.array.constructor),t!==l.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=l.itemSize),e!==l.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=l.normalized),i!==l.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(r===-1&&(r=l.gpuType),r!==l.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;s+=l.count*e}const a=new t(s),o=new Ee(a,e,i);let c=0;for(let u=0;u<n.length;++u){const l=n[u];if(l.isInterleavedBufferAttribute){const f=c/e;for(let h=0,p=l.count;h<p;h++)for(let g=0;g<e;g++){const _=l.getComponent(h,g);o.setComponent(h+f,g,_)}}else a.set(l.array,c);c+=l.count*e}return r!==void 0&&(o.gpuType=r),o}const nc=new Ne,ic=new Ln;function E0(n,t,e,i,r){const s=new In(n,t,e),a=s.attributes.uv,o=r(),c=r(),u=[[e,t],[e,t],[n,e],[n,e],[n,t],[n,t]];for(let l=0;l<6;l++){const[f,h]=u[l],p=h>f;for(let g=0;g<4;g++){const _=l*4+g;let m=a.getX(_)*f,d=a.getY(_)*h;if(p){const A=m;m=d,d=A}a.setXY(_,m/i+o,d/i+c)}}return s}class b0{constructor(t){this.rand=t,this.batches=new Map,this.solids=[]}add(t,e){this.batches.has(t)||this.batches.set(t,[]),this.batches.get(t).push(e.index?e.toNonIndexed():e)}frame(t,e,i,r=0){return new kr(this,new $t().makeRotationY(r).setPosition(t,e,i))}finish(t){for(const[e,i]of this.batches){for(const a of i)for(const o of Object.keys(a.attributes))["position","normal","uv"].includes(o)||a.deleteAttribute(o);const r=y0(i,!1),s=new Qt(r,e);s.castShadow=!e.userData.noShadow,s.receiveShadow=!0,s.matrixAutoUpdate=!1,t.add(s)}}}class kr{constructor(t,e){this.b=t,this.m=e}sub(t,e,i,r=0){return new kr(this.b,this.m.clone().multiply(new $t().makeRotationY(r).setPosition(t,e,i)))}local(t,e,i,r=0,s=0,a=0){return nc.set(r,s,a),ic.setFromEuler(nc),new $t().compose(new U(t,e,i),ic,new U(1,1,1)).premultiply(this.m)}geo(t,e,i,r,s,a,o,c){e.applyMatrix4(this.local(i,r,s,a,o,c)),this.b.add(t,e)}box(t,e,i,r,s,a,o,c=0,u=0,l=0){this.geo(t,E0(e,i,r,t.userData.ts||1,this.b.rand),s,a,o,c,u,l)}cyl(t,e,i,r,s,a,o,c=12,u=0,l=0,f=0,h=!1,p,g){const _=new Hr(e,i,r,c,1,h,p||0,g||Math.PI*2),m=t.userData.ts||1,d=_.attributes.uv,A=Math.PI*2*Math.max(e,i);for(let b=0;b<d.count;b++)d.setXY(b,d.getY(b)*r/m,d.getX(b)*A/m);this.geo(t,_,s,a,o,u,l,f)}sphere(t,e,i,r,s,a=1,o=1,c=1,u=12,l=8){const f=new Ki(e,u,l);f.scale(a,o,c),this.geo(t,f,i,r,s)}torus(t,e,i,r,s,a,o=0,c=0,u=0,l=32){this.geo(t,new Ua(e,i,6,l),r,s,a,o,c,u)}plane(t,e,i,r,s,a,o=0,c=0,u=0,l=null){const f=new pn(e,i);if(l){const h=f.attributes.uv;for(let p=0;p<h.count;p++)h.setXY(p,l[0]+h.getX(p)*l[2],l[1]+h.getY(p)*l[3])}this.geo(t,f,r,s,a,o,c,u)}solid(t,e,i,r,s,a){const o=this.local(r,s,a),c=new U,u=new U(1/0,1/0,1/0),l=new U(-1/0,-1/0,-1/0);for(let f=0;f<8;f++)c.set((f&1?.5:-.5)*t,(f&2?.5:-.5)*e,(f&4?.5:-.5)*i).applyMatrix4(o),u.min(c),l.max(c);this.b.solids.push({x0:u.x,x1:l.x,y0:u.y,y1:l.y,z0:u.z,z1:l.z})}sbox(t,e,i,r,s,a,o){this.box(t,e,i,r,s,a,o),this.solid(e,i,r,s,a,o)}}function T0(){const n=(l,f)=>{const h=new ga(l);return h.userData.ts=f||1,h},t=ys(1,[118,70,38],[48,26,12],{rings:16}),e=ys(2,[184,124,70],[104,62,30],{rings:15}),i=ys(3,[84,50,30],[34,18,10],{rings:11}),r=m0(4),s=Qo(5,[232,214,184]),a=Qo(6,[150,158,124]),o=tc(7,[100,34,22]),c=tc(8,[92,56,30]),u=g0(9);return{walnut:n({map:t,bumpMap:t,bumpScale:.6,roughness:.6,color:16777215},1.3),oak:n({map:e,bumpMap:e,bumpScale:.5,roughness:.48},1.6),dark:n({map:i,bumpMap:i,bumpScale:.5,roughness:.55},1.2),floor:n({map:r,bumpMap:r,bumpScale:1.2,roughness:.42},1.9),plaster:n({map:s,bumpMap:s,bumpScale:1.5,roughness:.94},3),sage:n({map:a,bumpMap:a,bumpScale:1.5,roughness:.92},2.5),ceil:n({map:s,roughness:.95,color:15919320},4),leather:n({map:o,bumpMap:o,bumpScale:1.2,roughness:.5},.9),leather2:n({map:c,bumpMap:c,bumpScale:1.2,roughness:.55},.9),stone:n({map:u,bumpMap:u,bumpScale:2,roughness:.88},1.4),iron:n({color:1841946,metalness:.75,roughness:.48}),brass:n({color:11831880,metalness:1,roughness:.32}),gilt:n({color:10122294,metalness:.8,roughness:.42}),soot:n({color:920587,roughness:1}),cushion:n({map:Es(10,[150,128,92],!0),roughness:.95},.5),cushion2:n({map:Es(11,[70,88,70],!1),roughness:.95},.4),runner:n({map:Es(12,[118,34,28],!0),roughness:.95},.6),paper:n({color:15129280,roughness:.9}),ceramic:n({color:15525590,roughness:.25}),terracotta:n({color:10246714,roughness:.85}),plant:n({color:4086828,roughness:.75,side:De}),greenGlass:n({color:1993264,emissive:3971642,emissiveIntensity:.55,roughness:.15,metalness:.1,side:De}),shade:n({color:15390376,emissive:16757865,emissiveIntensity:.9,roughness:.9,side:De}),flame:Object.assign(new Pn({color:new Lt(2.4,1.6,.7)}),{userData:{noShadow:!0}}),ember:Object.assign(new Pn({color:new Lt(2.2,.7,.2)}),{userData:{noShadow:!0}}),rug:n({map:_0(13),roughness:1}),painting:n({map:v0(14),roughness:.55}),globe:n({map:M0(15),roughness:.4})}}const _a={H:10.5,GY:4.2};function A0(n,t,e){const i=new b0(e),r=i.frame(0,0,0,0),s=_a.H,a=_a.GY,o=[],c=[],u=[],l=e;function f(v,L,H,R,O,Z,J,lt,rt){const Tt=[L,H];for(const St of lt)Tt.push(St[0],St[1]);const kt=[...new Set(Tt)].sort((St,Ut)=>St-Ut);for(let St=0;St<kt.length-1;St++){const Ut=kt[St],N=kt[St+1],me=lt.filter(_t=>_t[0]<=Ut&&_t[1]>=N).sort((_t,Gt)=>_t[2]-Gt[2]);let Ct=Z;const Nt=(_t,Gt)=>{Gt-_t<.001||(v==="x"?r.sbox(rt,O-R,Gt-_t,N-Ut,(R+O)/2,(_t+Gt)/2,(Ut+N)/2):r.sbox(rt,N-Ut,Gt-_t,O-R,(Ut+N)/2,(_t+Gt)/2,(R+O)/2))};for(const _t of me)Nt(Ct,_t[2]),Ct=_t[3];Nt(Ct,J)}}r.sbox(n.floor,14,.3,19,0,-.15,-.5),r.box(n.ceil,15,.3,20,0,s+.15,-.5),f("z",-7.5,7.5,-10.5,-10,0,s,[],n.plaster),f("x",-10.5,9.5,7,7.5,0,s,[],n.plaster),f("z",-7.5,7.5,9,9.5,0,s,[[-5,-3,4.5,8.3],[2.6,4.6,4.5,8.3]],n.plaster),f("x",-10.5,9.5,-7.5,-7,0,s,[[-5.6,-3.6,.9,7.2],[-1.6,.4,.9,7.2],[2.4,7.4,0,3.4],[3.2,6.6,5,8]],n.plaster),r.sbox(n.floor,4.5,.3,5,-9.25,-.15,4.9),r.box(n.ceil,5,.3,6,-9.5,3.75,4.9),r.box(n.plaster,5.4,.3,6.6,-9.75,4.05,4.9),f("z",-12,-7.5,1.9,2.4,0,3.6,[[-10.4,-8.6,.9,2.9]],n.sage),f("z",-12,-7.5,7.4,7.9,0,3.6,[[-10.4,-8.6,.9,2.9]],n.sage),f("x",1.9,7.9,-12,-11.5,0,3.6,[[2.9,6.9,.6,3]],n.sage);for(const v of[3.2,4.9,6.6])r.box(n.dark,4.5,.18,.14,-9.25,3.52,v);r.box(n.oak,.3,.3,5.2,-7.15,3.45,4.9);function g(v,L,H,R,O=!0){v.box(n.oak,L+.3,.05,R+.14,0,0,(-R+.14)/2),v.box(n.oak,.12,H+.12,.06,-L/2-.06,H/2,.02),v.box(n.oak,.12,H+.12,.06,L/2+.06,H/2,.02),v.box(n.oak,L+.36,.14,.07,0,H+.07,.02);const Z=-R*.55;v.box(n.dark,L,.07,.07,0,.06,Z),v.box(n.dark,L,.07,.07,0,H-.035,Z),v.box(n.dark,.07,H,.07,-L/2+.035,H/2,Z),v.box(n.dark,.07,H,.07,L/2-.035,H/2,Z);const J=Math.max(1,Math.round(L/.62));for(let rt=1;rt<J;rt++)v.box(n.iron,.03,H,.035,-L/2+L*rt/J,H/2,Z);const lt=Math.max(1,Math.round(H/.55));for(let rt=1;rt<lt;rt++)v.box(rt%4===0?n.dark:n.iron,L,rt%4===0?.06:.025,.035,0,H*rt/lt,Z);if(O){const rt=[];for(const[Tt,kt]of[[-L/2,0],[L/2,0],[L/2,H],[-L/2,H]])rt.push(new U(Tt,kt,Z).applyMatrix4(v.m));u.push(rt)}}g(r.sub(-7,.9,-4.6,Math.PI/2),2,6.3,.5),g(r.sub(-7,.9,-.6,Math.PI/2),2,6.3,.5),g(r.sub(-7,5,4.9,Math.PI/2),3.4,3,.5),g(r.sub(-11.5,.6,4.9,Math.PI/2),4,2.4,.5),g(r.sub(-9.5,.9,7.4,Math.PI),1.8,2,.5),g(r.sub(-9.5,.9,2.4,0),1.8,2,.5,!1),g(r.sub(-4,4.5,9,Math.PI),2,3.8,.5),g(r.sub(3.6,4.5,9,Math.PI),2,3.8,.5),r.box(n.oak,.14,3.5,.6,-6.95,1.75,2.33),r.box(n.oak,.14,3.5,.6,-6.95,1.75,7.47);for(const v of[-4.6,-.6])r.box(n.dark,.04,.85,2,-6.98,.45,v);r.box(n.dark,.05,1,2.2,6.97,.5,7.85),r.box(n.oak,.08,.06,2.3,6.96,1.02,7.85);for(const[v,L,H,R]of[[14,.3,0,-9.85],[14,.3,0,8.85],[.3,19,-6.85,-.5],[.3,19,6.85,-.5]])r.box(n.oak,v,.22,L,H,s-.11,R),r.box(n.dark,v+(v>1?0:.1),.08,L+(L>1?0:.12),H,s-.26,R);r.box(n.oak,.12,.1,19,-6.94,8.4,-.5),r.box(n.oak,14,.1,.12,0,8.4,8.94),r.box(n.oak,.12,.1,19,6.94,8.4,-.5);for(const v of[-4.6,-.6]){r.cyl(n.iron,.02,.02,2.9,-6.82,7.55,v,8,Math.PI/2,0,0);for(const L of[-1,1]){r.sphere(n.iron,.045,-6.82,7.55,v+L*1.45),r.box(n.iron,.12,.03,.03,-6.9,7.55,v+L*1.3);for(let H=0;H<4;H++)r.box(n.cushion2,.05+H%2*.03,4.85-H*.12,.05,-6.86+H%2*.03,5.08+H*.06,v+L*(1.04+H*.035),0,0,0);r.cyl(n.brass,.012,.012,.2,-6.8,3.4,v+L*1.1,6,Math.PI/2,0,0)}}for(const v of[-8.2,-4.6,-1,2.6,6.2]){r.box(n.dark,14,.38,.3,0,9.85,v),r.box(n.dark,.24,.6,.24,0,10.2,v);for(const L of[-1,1])r.box(n.dark,.2,1.4,.22,L*6.55,9.2,v,0,0,L*.62),r.box(n.iron,.36,.42,.32,L*3.4,9.85,v),r.box(n.dark,.25,.7,.32,L*6.88,9.2,v)}for(const v of[-3.4,3.4])r.box(n.dark,.2,.24,19,v,10.25,-.5);r.sbox(n.floor,14,.35,3,0,a-.175,-8.5),r.sbox(n.floor,2.8,.35,5.8,5.6,a-.175,-4.1);for(let v=-6.6;v<4.2;v+=.9)r.box(n.dark,.12,.24,3,v,a-.47,-8.5);for(let v=-6.6;v<-1.2;v+=.9)r.box(n.dark,2.8,.24,.12,5.6,a-.47,v);r.box(n.oak,11.42,.55,.24,-1.4,a-.27,-6.9),r.box(n.oak,.24,.55,5.9,4.3,a-.27,-4.15),r.box(n.dark,11.42,.06,.3,-1.4,a-.02,-6.9),r.box(n.dark,.3,.06,5.9,4.3,a-.02,-4.15);const _=[[-4.6,-6.9,"x"],[-1.4,-6.9,"x"],[1.8,-6.9,"x"],[4.3,-6.9,"c"],[4.3,-4.1,"z"],[4.3,-1.35,"z"]];for(const[v,L,H]of _){r.cyl(n.iron,.07,.085,a-.55,v,(a-.55)/2,L,14),r.box(n.iron,.24,.16,.24,v,.08,L),r.box(n.iron,.26,.1,.26,v,a-.6,L),r.cyl(n.iron,.11,.07,.18,v,a-.75,L,14),r.solid(.26,a-.5,.26,v,(a-.5)/2,L);const R=H==="x"?[[1,0],[-1,0]]:H==="z"?[[0,1],[0,-1]]:[[-1,0],[0,1]];for(const[O,Z]of R)r.box(n.iron,.04,.9,.04,v+O*.3,a-.88,L+Z*.3,Z*.72,0,-O*.72),r.torus(n.iron,.12,.012,v+O*.22,a-.75,L+Z*.22,0,O?0:Math.PI/2,0,16)}function m(v,L,H,R,O,Z=2.4){const J=Math.hypot(H-v,R-L),lt=Math.atan2(-(R-L),H-v),rt=r.sub(v,O,L,lt);rt.box(n.oak,J+.06,.07,.13,J/2,1.02,0),rt.box(n.iron,J,.04,.05,J/2,.97,0),rt.box(n.iron,J,.04,.05,J/2,.1,0);const Tt=Math.round(J/.13);for(let St=1;St<Tt;St++){const Ut=J*St/Tt;rt.box(n.iron,.02,.86,.02,Ut,.53,0),St%3===0&&rt.sphere(n.iron,.025,Ut,.45,0)}const kt=Math.max(1,Math.round(J/Z));for(let St=0;St<=kt;St++){const Ut=J*St/kt;rt.box(n.oak,.11,1.12,.11,Ut,.56,0),rt.sphere(n.oak,.065,Ut,1.16,0,1,.8,1)}rt.solid(J,1.1,.16,J/2,.55,0)}m(-7,-6.92,4.3,-6.92,a),m(4.3,-6.92,4.3,-1.25,a,1.9),r.box(n.oak,.08,.3,3,-6.96,a+.1,-8.5);const d=a/24,A=.3,b=4.2,M=7,D=6.7,w=(b+M)/2,C=M-b,I=[];for(let v=1;v<=11;v++)I.push({y:v*d,z0:D-v*A,z1:D-(v-1)*A});I.push({y:12*d,z0:2.1,z1:3.4,landing:!0});for(let v=13;v<=23;v++)I.push({y:v*d,z0:2.1-(v-12)*A,z1:2.1-(v-13)*A});for(const v of I){const L=v.z1-v.z0,H=(v.z0+v.z1)/2;r.box(n.dark,C,v.y-.045,L,w,(v.y-.045)/2,H),r.box(n.oak,C+.03,.045,L+.035,w-.015,v.y-.0225,H+.0175),r.solid(C,v.y,L,w,v.y/2,H),r.box(n.runner,1.5,.012,L,w+.15,v.y+.006,H+.01),r.box(n.runner,1.5,d-.03,.012,w+.15,v.y-d/2-.02,v.z1+.007),r.cyl(n.brass,.008,.008,1.62,w+.15,v.y-d+.012,v.z1+.02,6,0,0,Math.PI/2);const R=v.landing?9:2;for(let O=0;O<R;O++){const Z=v.z0+L*(O+.5)/R;r.box(n.iron,.022,.9,.022,b+.07,v.y+.45,Z)}r.solid(.16,1.05,L,b+.07,v.y+.52,H)}const E=Math.atan(d/A),S=[[D,0,D-11*A,11*d],[2.1,12*d,-1.2,23*d]];for(const[v,L,H,R]of S){const O=Math.hypot(v-H,R-L),Z=(v+H)/2,J=(L+R)/2;r.box(n.oak,.13,.07,O,b+.07,J+1,Z,E,0,0),r.box(n.iron,.05,.04,O,b+.07,J+.95,Z,E,0,0),r.box(n.oak,.07,.32,O+.2,b-.02,J+.02,Z-.05,E,0,0)}r.box(n.oak,.13,.07,1.3,b+.07,12*d+1,2.75);for(const[v,L]of[[D-.12,0],[3.4,11*d],[2.1,12*d],[-1.25,a]])r.box(n.oak,.16,1.25,.16,b+.07,L+.62,v),r.box(n.oak,.2,.06,.2,b+.07,L+1.26,v),r.sphere(n.oak,.08,b+.07,L+1.35,v);r.solid(.2,1.25,.2,b+.07,.62,D-.12);function P(v,L,H,R,O={}){const Z=Math.max(1,Math.round(L/(O.bay||.92))),J=L/Z,lt=O.spacing||.38,rt=.14,Tt=Math.floor((H-rt-.12)/lt),kt=(H-rt-.12)/Tt;v.box(n.dark,L,rt,R-.03,L/2,rt/2,-R/2-.015),v.box(n.walnut,L,H,.02,L/2,H/2,-R+.01),v.box(n.walnut,L+.06,.07,R+.05,L/2,H-.035,-R/2+.025),v.box(n.walnut,L+.12,.05,R+.09,L/2,H+.025,-R/2+.045),O.noCornice||v.box(n.dark,L+.02,.1,.03,L/2,H-.12,.01);for(let St=0;St<=Z;St++){const Ut=Math.min(L-.02,Math.max(.02,St*J));v.box(n.walnut,.04,H-.07,R,Ut,(H-.07)/2,-R/2),v.box(n.dark,.06,H-.2,.015,Ut,H/2-.05,.005)}for(let St=0;St<Z;St++){const Ut=St*J+.02,N=(St+1)*J-.02,me=(l()-.5)*.04;for(let Ct=0;Ct<=Tt;Ct++){const Nt=rt+Ct*kt+(Ct>0&&Ct<Tt?me:0);if(Ct>0&&Ct<Tt+1&&v.box(n.walnut,N-Ut,.026,R-.025,(Ut+N)/2,Nt-.013,-R/2-.0125),Ct<Tt){const Gt=rt+(Ct+1)*kt+(Ct+1<Tt?me:0)-Nt-.026-.005,Rt=O.sparse?.8:.97;l()<Rt&&o.push({m:v.local(Ut+.005,Nt,-.012),len:N-Ut-.01,clear:Gt,d:R-.04})}}}O.solid!==!1&&v.solid(L,H+.05,R,L/2,H/2,-R/2)}P(r.sub(-7,0,-9.6,0),14,3.45,.4),P(r.sub(-6.6,0,-5.75,Math.PI/2),3.85,3.45,.4),P(r.sub(6.6,0,-9.6,-Math.PI/2),8.4,3.45,.4,{spacing:.4}),P(r.sub(-6.6,0,-1.7,Math.PI/2),1.8,2.4,.36,{spacing:.36}),P(r.sub(-6.6,0,2.3,Math.PI/2),1.8,2.4,.36,{spacing:.42}),P(r.sub(-1.4,0,8.6,Math.PI),5.6,3.2,.4,{spacing:.4}),P(r.sub(7,0,8.6,Math.PI),5.6,3.2,.4,{spacing:.37}),P(r.sub(-7,a,-9.6,0),14,3.8,.4,{spacing:.4}),P(r.sub(-6.6,a,-7,Math.PI/2),2.6,3.8,.4,{spacing:.4}),P(r.sub(6.6,a,-9.6,-Math.PI/2),8.4,3.8,.4,{spacing:.39});for(const v of[-5,-2.4]){P(r.sub(-4.3,0,v+.3,0),4,2.25,.3,{spacing:.36,solid:!1}),P(r.sub(-.3,0,v-.3,Math.PI),4,2.25,.3,{spacing:.36,solid:!1}),r.solid(4.1,2.3,.62,-2.3,1.15,v);for(const L of[-4.33,-.27])r.box(n.oak,.06,2.3,.66,L,1.15,v);r.box(n.oak,4.14,.05,.7,-2.3,2.3,v)}P(r.sub(-10.6,0,2.75,0),2.2,.85,.35,{bay:.75,noCornice:!0}),P(r.sub(-8.4,0,7.05,Math.PI),2.2,.85,.35,{bay:.75,noCornice:!0});function X(v,L,H){r.cyl(n.iron,.016,.016,13.6,0,v+H-.15,-9.47,8,0,0,Math.PI/2);for(let rt=-6.4;rt<=6.4;rt+=2.13)r.box(n.iron,.03,.03,.14,rt,v+H-.15,-9.53);const R=-9.45,O=-8.35,Z=Math.hypot(O-R,H),J=-Math.atan((O-R)/H);for(const rt of[-.22,.22])r.box(n.oak,.05,Z,.08,L+rt,v+H/2,(R+O)/2,J,0,0);const lt=Math.floor(Z/.28);for(let rt=1;rt<lt;rt++){const Tt=rt/lt;r.cyl(n.iron,.014,.014,.44,L,v+Tt*H,O+(R-O)*Tt,8,0,0,Math.PI/2)}for(const rt of[-.22,.22])r.cyl(n.iron,.035,.035,.04,L+rt,v+.035,O,10,0,0,Math.PI/2),r.box(n.iron,.02,.14,.02,L+rt,v+H-.08,R-.02);r.solid(.6,1.2,.45,L,v+.6,O-.15)}X(0,-2.6,3.3),X(a,2.2,3.4);function k(v,L,H=.9,R=!0){const O=H,Z=.86;v.box(L,O,.3,Z,0,.27,0),v.box(L,O-.3,.13,Z-.24,0,.48,.06);for(const lt of[-1,1])v.box(L,.16,.36,Z-.05,lt*(O/2-.08),.6,.02),v.cyl(L,.095,.095,Z-.02,lt*(O/2-.07),.78,.03,12,Math.PI/2,0,0),v.cyl(n.dark,.03,.022,.12,lt*(O/2-.07),.06,Z/2-.08,8),v.cyl(n.dark,.03,.022,.12,lt*(O/2-.07),.06,-Z/2+.08,8),R&&v.box(L,.1,.45,.3,lt*(O/2-.06),1.05,-Z/2+.2);const J=R?1.12:.9;v.box(L,O-.04,J-.4,.2,0,.4+(J-.4)/2,-Z/2+.1,-.08,0,0),v.cyl(L,.09,.09,O-.06,0,J,-Z/2+.12,12,0,0,Math.PI/2);for(let lt=0;lt<3;lt++)for(let rt=0;rt<Math.round(O/.22);rt++){const Tt=Math.round(O/.22);v.sphere(n.iron,.012,-O/2+.13+(O-.26)*(rt+lt%2*.5)/Tt,.62+lt*.13,-Z/2+.215,1,1,.6,6,4)}v.solid(O,.95,Z,0,.47,0)}function K(v){v.box(n.oak,.44,.04,.42,0,.46,0);for(const[L,H]of[[-.19,.18],[.19,.18],[-.19,-.18],[.19,-.18]])v.cyl(n.oak,.02,.018,.44,L,.22,H,8);for(const L of[-.19,.19])v.box(n.oak,.035,.5,.035,L,.72,-.19,-.1,0,0);v.box(n.oak,.42,.08,.03,0,.94,-.215,-.1,0,0);for(let L=-1;L<=1;L++)v.box(n.oak,.03,.36,.02,L*.1,.72,-.2,-.1,0,0);v.box(n.oak,.38,.02,.02,0,.12,0),v.box(n.leather2,.36,.03,.34,0,.495,.01),v.solid(.44,.95,.44,0,.47,0)}function Q(v,L,H,R,O=0){v.cyl(n.brass,.07,.08,.025,L,H+.012,R,16),v.cyl(n.brass,.01,.01,.3,L,H+.17,R,8),v.cyl(n.brass,.012,.012,.12,L,H+.32,R,6,0,O,Math.PI/2),v.cyl(n.greenGlass,.1,.1,.3,L,H+.34,R,16,0,O,Math.PI/2,!1,0,Math.PI),v.sphere(n.flame,.03,L,H+.31,R,1.6,.6,1)}function $(v,L,H,R,O=1){v.cyl(n.ceramic,.06*O,.09*O,.25*O,L,H+.125*O,R,16),v.cyl(n.brass,.01,.01,.15*O,L,H+.3*O,R,6),v.cyl(n.shade,.1*O,.17*O,.2*O,L,H+.42*O,R,20,0,0,0,!0)}function nt(v,L,H,R,O,Z,J){v.box(n.gilt,L+2*.07,.07,.05,R,O+H/2+.07/2,Z),v.box(n.gilt,L+2*.07,.07,.05,R,O-H/2-.07/2,Z),v.box(n.gilt,.07,H,.05,R-L/2-.07/2,O,Z),v.box(n.gilt,.07,H,.05,R+L/2+.07/2,O,Z),v.plane(n.painting,L,H,R,O,Z,0,0,0,[J%2*.5,Math.floor(J/2)*.5,.5,.5])}function q(v,L,H,R,O,Z){t.stack(v.m,L,H,R,O,Z)}function ot(v,L,H,R,O=.18){v.cyl(n.brass,.045,.06,.02,L,H+.01,R,12),v.cyl(n.brass,.012,.02,.2,L,H+.11,R,8),v.cyl(n.brass,.03,.02,.03,L,H+.22,R,10),v.cyl(n.paper,.016,.016,O,L,H+.235+O/2,R,8),v.sphere(n.flame,.012,L,H+.25+O,R,1,2,1,6,4)}{const v=r.sub(-.5,0,1.9,0);v.box(n.oak,1.25,.06,3.9,0,.75,0),v.box(n.dark,1.05,.13,3.6,0,.655,0);for(const H of[-1.75,0,1.75])for(const R of[-.5,.5])v.cyl(n.dark,.05,.04,.6,R,.32,H,10),v.sphere(n.dark,.06,R,.45,H,1,.8,1,10,6);v.box(n.dark,.06,.06,3.4,0,.14,0),v.solid(1.25,.8,3.9,0,.4,0),Q(v,0,.78,-.95,Math.PI/2),Q(v,0,.78,.95,Math.PI/2),c.push({p:new U(-.5,1.15,1.9),c:16761466,i:5.5,d:9}),q(v,.35,.78,-1.5,4,.2),q(v,-.38,.78,1.55,3,-.4),q(v,.4,.78,.4,2,1.2),v.box(n.leather,.44,.012,.3,-.15,.786,-.25,0,.1,0),v.box(n.paper,.2,.025,.28,-.255,.8,-.26,0,.1,.06),v.box(n.paper,.2,.025,.28,-.055,.8,-.24,0,.1,-.06),v.box(n.paper,.21,.004,.29,.3,.783,.9,0,-.3,0),v.cyl(n.iron,.03,.03,.05,.42,.805,.95,10),v.cyl(n.brass,.002,.002,.18,.4,.86,.95,4,0,0,.4);const L=[[-.88,-1.2,Math.PI/2],[-.92,.05,Math.PI/2+.15],[-.86,1.25,Math.PI/2],[.86,-1.25,-Math.PI/2],[1.15,.1,-Math.PI/2-.4],[.88,1.2,-Math.PI/2]];for(const[H,R,O]of L)K(v.sub(H,0,R,O))}{const v=new pn(3.4,5.6);v.rotateX(-Math.PI/2),r.geo(n.rug,v,-.5,.008,1.9);const L=new pn(3.4,5.2);L.rotateX(-Math.PI/2),L.rotateY(Math.PI/2),r.geo(n.rug,L,0,.008,6.8);const H=new pn(2.2,3.2);H.rotateX(-Math.PI/2),r.geo(n.rug,H,-9.4,.008,4.9)}{const v=r.sub(0,0,9,Math.PI);v.box(n.stone,2.7,.08,.75,0,.04,.37);for(const L of[-1,1])v.box(n.stone,.38,1.28,.38,L*.96,.64,.19);v.box(n.stone,2.3,.36,.4,0,1.46,.2),v.box(n.dark,2.7,.08,.48,0,1.68,.24),v.box(n.plaster,2.3,3,.3,0,3.22,.15),v.box(n.soot,1.56,1.28,.04,0,.64,.02),v.box(n.soot,1.56,.02,.38,0,.09,.19);for(let L=0;L<6;L++)v.box(n.iron,.025,.25,.025,-.4+L*.16,.24,.3);v.box(n.iron,.9,.03,.3,0,.14,.2),v.cyl(n.dark,.06,.07,.75,0,.22,.18,8,0,.1,Math.PI/2),v.cyl(n.dark,.05,.05,.7,.05,.3,.24,8,0,-.3,Math.PI/2),v.box(n.ember,.8,.03,.26,0,.165,.2),v.sphere(n.ember,.12,-.1,.25,.2,2.2,.5,.8,8,6),v.solid(2.7,1.72,.8,0,.86,.4),ot(v,-1.05,1.72,.25),ot(v,1.05,1.72,.25,.14),v.box(n.dark,.32,.36,.14,0,1.9,.22),v.cyl(n.ceramic,.11,.11,.02,0,1.94,.3,20,Math.PI/2,0,0),v.cyl(n.brass,.125,.125,.015,0,1.94,.295,20,Math.PI/2,0,0),v.cyl(n.terracotta,.05,.08,.22,.6,1.83,.22,12),q(v,-.6,1.72,.24,2,.3),nt(v,1.4,.95,0,3.5,.31,2),v.cyl(n.iron,.012,.012,.8,1.32,.4,.55,6,0,0,.08),v.cyl(n.brass,.025,.025,.06,1.35,.82,.55,8),c.push({p:new U(0,.55,8.35),c:16747068,i:6,d:10,fire:!0})}k(r.sub(0,0,5.7,0),n.leather,2.2,!1),k(r.sub(-2.15,0,7.4,Math.PI/2-.2),n.leather2),k(r.sub(2.15,0,7.4,-Math.PI/2+.25),n.leather);{const v=r.sub(0,0,7.3,.05);v.box(n.oak,1.1,.05,.6,0,.42,0);for(const[H,R]of[[-.5,-.25],[.5,-.25],[-.5,.25],[.5,.25]])v.box(n.dark,.05,.4,.05,H,.2,R);v.box(n.dark,1,.02,.5,0,.1,0),v.solid(1.1,.45,.6,0,.22,0),q(v,-.25,.445,0,3,.5),v.cyl(n.ceramic,.04,.03,.07,.25,.48,.05,12),v.torus(n.ceramic,.025,.006,.29,.48,.05,0,0,0,10),v.cyl(n.ceramic,.07,.07,.008,.25,.449,.05,16),q(v,-.2,.12,0,3,0);const L=r.sub(1.45,0,5.75,0);L.cyl(n.dark,.25,.25,.03,0,.6,0,20),L.cyl(n.dark,.03,.04,.58,0,.3,0,8),L.cyl(n.dark,.18,.2,.03,0,.015,0,16),L.solid(.5,.62,.5,0,.31,0),$(L,0,.615,0,1.1)}{r.sbox(n.oak,.62,.45,4,-11.2,.225,4.9),r.box(n.cushion,.56,.1,3.9,-11.2,.5,4.9),r.box(n.cushion2,.16,.42,.5,-11.38,.74,3.25,0,0,-.25),r.box(n.leather2,.16,.38,.46,-11.38,.72,6.5,0,.2,-.3),r.box(n.cushion,.4,.06,.6,-11.1,.58,5.2,0,.4,0),t.stack(r.m,-11.2,.55,4.3,3,.4),r.cyl(n.terracotta,.11,.08,.2,-11.25,.65,6,14);for(let H=0;H<9;H++){const R=H/9*Math.PI*2;r.box(n.plant,.06,.32,.01,-11.25+Math.cos(R)*.06,.88,6+Math.sin(R)*.06,Math.sin(R)*.5,R,Math.cos(R)*.5)}k(r.sub(-9.3,0,3.4,-Math.PI/2+.55),n.leather),k(r.sub(-9.3,0,6.35,-Math.PI/2-.55),n.leather2);const v=r.sub(-9.9,0,4.9,0);v.cyl(n.oak,.3,.3,.035,0,.6,0,24),v.cyl(n.dark,.035,.05,.58,0,.3,0,10);for(let H=0;H<3;H++){const R=H/3*Math.PI*2;v.box(n.dark,.05,.05,.3,Math.cos(R)*.12,.04,Math.sin(R)*.12,0,-R+Math.PI/2,0)}v.solid(.6,.62,.6,0,.31,0),q(v,-.08,.62,-.08,3,.7),v.cyl(n.ceramic,.045,.035,.06,.14,.65,.1,12),v.cyl(n.ceramic,.075,.075,.008,.14,.62,.1,16);const L=r.sub(-8,0,7,0);L.cyl(n.iron,.16,.18,.03,0,.015,0,16),L.cyl(n.iron,.014,.014,1.5,0,.76,0,8),L.cyl(n.shade,.14,.24,.28,0,1.55,0,20,0,0,0,!0),L.solid(.36,1.6,.36,0,.8,0),c.push({p:new U(-8,1.5,6.9),c:16757866,i:4,d:7}),nt(r.sub(-7.5,0,2.4,0),.5,.4,-.45,2,.03,3),q(r,-8.6,0,7.15,5,.3)}{const v=r.sub(-5.9,0,-.7,.3);for(let H=0;H<3;H++){const R=H/3*Math.PI*2;v.box(n.dark,.04,.75,.04,Math.cos(R)*.18,.37,Math.sin(R)*.18,Math.sin(R)*.25,0,-Math.cos(R)*.25)}v.torus(n.oak,.3,.03,0,.76,0,Math.PI/2,0,0,32),v.torus(n.brass,.32,.01,0,1,0,0,0,.4,32);const L=new Ki(.29,32,20);L.rotateZ(.4),v.geo(n.globe,L,0,1,0),v.solid(.7,1.3,.7,0,.65,0)}{const v=r.sub(5.5,0,-1.22,Math.PI);v.box(n.oak,1.9,1.1,.5,0,.55,.25);for(let L=0;L<8;L++)for(let H=0;H<6;H++){const R=-.82+L*.235,O=.22+H*.15;v.box(n.walnut,.2,.12,.02,R,O,.505),v.box(n.brass,.05,.012,.02,R,O-.02,.52),v.box(n.paper,.05,.025,.005,R,O+.025,.517)}v.box(n.walnut,2,.05,.56,0,1.125,.25),v.solid(1.9,1.15,.5,0,.57,.25),$(v,.65,1.15,.25,.9),q(v,-.4,1.15,.25,4,.2),r.cyl(n.brass,.008,.008,.75,5.5,a-.95,-4.1,6),r.cyl(n.brass,.04,.04,.05,5.5,a-.6,-4.1,10),r.cyl(n.shade,.1,.22,.2,5.5,a-1.38,-4.1,20,0,0,0,!0),r.sphere(n.flame,.035,5.5,a-1.4,-4.1,1,1,1,8,6),c.push({p:new U(5.5,a-1.5,-4.1),c:16759930,i:3.5,d:7})}{const v=r.sub(-5.6,a,-8.85,0);v.box(n.oak,1.4,.05,.7,0,.76,0);for(const H of[-1,1])v.box(n.dark,.36,.72,.64,H*.5,.37,0);v.box(n.dark,.6,.12,.62,0,.67,0);for(const H of[-1,1])for(let R=0;R<3;R++)v.box(n.walnut,.32,.2,.02,H*.5,.16+R*.22,.33),v.cyl(n.brass,.015,.015,.02,H*.5,.16+R*.22,.345,8,Math.PI/2,0,0);v.solid(1.4,.8,.7,0,.4,0),Q(v,-.4,.785,-.1,0),q(v,.45,.785,-.1,5,0),v.box(n.paper,.3,.004,.22,.05,.787,.1,0,.2,0),v.cyl(n.iron,.025,.03,.045,-.15,.81,-.15,10),K(v.sub(.05,0,.6,Math.PI+.2)),c.push({p:new U(-5.9,a+1.25,-8.85),c:16761466,i:4.5,d:8}),k(r.sub(6,a,-3.6,-Math.PI/2),n.leather2);const L=r.sub(6.1,a,-2.4,0);L.cyl(n.dark,.22,.22,.03,0,.55,0,18),L.cyl(n.dark,.03,.03,.54,0,.27,0,8),L.cyl(n.dark,.15,.17,.03,0,.015,0,14),L.solid(.44,.58,.44,0,.29,0),q(L,0,.565,0,3,.4),t.stack(r.m,3.4,a,-9,6,.2),t.stack(r.m,-1.6,0,-8.9,4,.1)}for(const[v,L,H]of[[-.5,6.2,1.9],[-2.3,7,-3.7]]){r.torus(n.iron,.75,.025,v,L,H,Math.PI/2,0,0,40),r.torus(n.iron,.4,.018,v,L-.25,H,Math.PI/2,0,0,28),r.cyl(n.iron,.006,.006,10.5-L,v,(10.5+L)/2,H,4);for(let R=0;R<4;R++){const O=R/4*Math.PI*2+.4;r.cyl(n.iron,.005,.005,1.1,v+Math.cos(O)*.37,L+.45,H+Math.sin(O)*.37,4,Math.sin(O)*.72,0,-Math.cos(O)*.72)}for(let R=0;R<10;R++){const O=R/10*Math.PI*2,Z=v+Math.cos(O)*.75,J=H+Math.sin(O)*.75;r.cyl(n.iron,.03,.02,.04,Z,L+.03,J,8),r.cyl(n.paper,.014,.014,.14,Z,L+.12,J,6),r.sphere(n.flame,.011,Z,L+.205,J,1,2,1,6,4)}}nt(r.sub(7,0,0,-Math.PI/2),1.1,.8,4.6,3.1,.03,0),nt(r.sub(7,0,0,-Math.PI/2),.9,1.2,.7,5.3,.03,1),nt(r.sub(-7,0,0,Math.PI/2),.9,.7,2.6,3.2,.03,3),nt(r.sub(-7,0,0,Math.PI/2),.9,.7,-1.4,3.2,.03,1);{const v=r;v.sphere(n.ceramic,.12,-3.6,2.5,-5,.85,1.1,.85,14,10),v.cyl(n.ceramic,.07,.1,.16,-3.6,2.4,-5,12),v.box(n.stone,.2,.08,.2,-3.6,2.36,-5),t.stack(r.m,-1.2,2.325,-5,3,.3),v.cyl(n.terracotta,.12,.09,.26,-1,2.455,-2.4,14),v.sphere(n.plant,.18,-1,2.7,-2.4,1,.7,1,10,6),t.stack(r.m,-3.2,2.325,-2.4,4,1.2),ot(r,-2.4,2.325,-2.4)}const mt=(v,L,H)=>{const R=new kr(i,v.m),O=l();if(O<.35)R.box(n.iron,.012,Math.min(.16,v.clear-.02),.11,L-H/2+.01,Math.min(.16,v.clear-.02)/2,-.08),R.box(n.iron,.09,.006,.11,L-H/2+.05,.003,-.08);else if(O<.55&&v.clear>.22)R.cyl(l()<.5?n.ceramic:n.terracotta,.035,.05,.15,L,.075,-.1,12);else if(O<.75){const Z=Math.min(H-.02,.14);R.box(l()<.5?n.walnut:n.leather2,Z,Math.min(.08,v.clear-.02),.12,L,.04,-.1)}else O<.85&&v.clear>.2&&R.box(n.gilt,.1,.13,.012,L,.065,-.12,-.15,0,0)};for(const v of o)t.fillSlot(v,mt);return i.finish=i.finish.bind(i),{B:i,lights:c,windows:u,slots:o}}const rc=[[.36,.08,.06],[.42,.12,.08],[.12,.2,.12],[.1,.16,.28],[.18,.1,.06],[.48,.32,.16],[.06,.06,.06],[.55,.42,.2],[.16,.26,.26],[.3,.1,.16],[.62,.55,.42],[.26,.24,.2],[.4,.24,.1],[.2,.12,.2],[.7,.62,.48]],sc=new Ln,ac=new Ne,w0=new U,R0=new U;class C0{constructor(t){this.rand=t,this.mats=[],this.cols=[],this.vars=[]}color(t,e=0){const i=this.rand,r=t||rc[Math.floor(i()*rc.length)],s=.8+i()*.4,a=e||(i()<.12?.2+i()*.25:0);return[r[0]*s*(1-a)+.55*a,r[1]*s*(1-a)+.48*a,r[2]*s*(1-a)+.38*a]}add(t,e,i,r,s,a,o,c,u,l,f=0){ac.set(0,f,s),sc.setFromEuler(ac);const h=new $t().compose(w0.set(e,i,r),sc,R0.set(a,o,c));h.premultiply(t),this.mats.push(h),this.cols.push(u),this.vars.push(l)}fillSlot(t,e){const i=this.rand,{m:r,len:s,clear:a,d:o}=t;let c=.01+i()*.04,u=.25;for(;c<s-.03;){const l=i(),f=s-c;if(l<.07&&f>.34&&a>.16){const M=2+Math.floor(i()*4);let D=0,w=0;const C=.2+i()*.1;for(let I=0;I<M;I++){const E=.022+i()*.04;if(D+E>a-.02)break;const S=Math.min(C+(i()-.5)*.06,f-.03),P=Math.min(o-.02,.15+i()*.08);this.add(r,c+S/2+(i()-.5)*.02,D+E/2,-P/2-.01-i()*.02,Math.PI/2,E,S,P,this.color(),Math.floor(i()*8),(i()-.5)*.12),D+=E,w=Math.max(w,S)}c+=w+.02+i()*.03;continue}if(l<.13){const M=.06+i()*.16;e&&M>.1&&f>.2&&e(t,c+M/2,M),c+=M;continue}const h=i()<.4,p=h?4+Math.floor(i()*10):3+Math.floor(i()*12),g=this.color(),_=Math.floor(i()*8),m=Math.min(a-.02,.2+i()*.16),d=.03+i()*.03,A=Math.min(o-.02,.15+i()*.08),b=i()<.2?.08:0;for(let M=0;M<p&&c<s-.03;M++){let D,w,C,I,E;if(h?(D=d*(.85+i()*.3),w=m,C=A,I=i()<.08?this.color():g,E=_):(D=.016+i()*.05+(i()<.1?.03:0),w=Math.min(a-.015,.17+i()*.17+b),C=Math.min(o-.02,.12+i()*.13),I=this.color(),E=Math.floor(i()*8)),c+D>s-.01)break;const S=.006+i()*(i()<.15?.06:.018);this.add(r,c+D/2,w/2,-C/2-S,0,D,w,C,I,E,(i()-.5)*.03),c+=D+.0015,u=w}if(i()<.35&&s-c>.12){const M=.12+i()*.3,D=.02+i()*.03,w=Math.min(u*.95,a-.03,.18+i()*.12),C=Math.min(o-.02,.14+i()*.08),I=c+D/2*Math.cos(M)+w/2*Math.sin(M),E=D/2*Math.sin(M)+w/2*Math.cos(M);c+D*Math.cos(M)+w*Math.sin(M)<s-.01&&(this.add(r,I,E,-C/2-.01,M,D,w,C,this.color(),Math.floor(i()*8)),c+=D*Math.cos(M)+w*Math.sin(M))}c+=.004+i()*.04}}stack(t,e,i,r,s,a=0){const o=this.rand;let c=i;for(let u=0;u<s;u++){const l=.025+o()*.04,f=.2+o()*.12,h=.15+o()*.08;this.add(t,e+(o()-.5)*.03,c+l/2,r+(o()-.5)*.03,Math.PI/2,l,f,h,this.color(),Math.floor(o()*8),a+(o()-.5)*.4),c+=l}return c}build(t){const e=new In(1,1,1),i=e.attributes.uv,r=new Float32Array(i.count),s=new Float32Array(i.count);for(let h=0;h<6;h++)for(let p=0;p<4;p++){const g=h*4+p;let _=i.getX(g),m=i.getY(g);if(h===4)_=_*.0625,r[g]=1;else if(h===0||h===1)_=.76+_*.23;else if(h===2||h===3){const d=_;_=.51+m*.23,m=d,s[g]=1}else _=.51+_*.23,s[g]=1;i.setXY(g,_,m)}e.setAttribute("aSpine",new Ee(r,1)),e.setAttribute("aPage",new Ee(s,1));const a=this.mats.length,o=new Float32Array(a);for(let h=0;h<a;h++)o[h]=this.vars[h];e.setAttribute("aVar",new pa(o,1));const c=new l0({map:t});c.onBeforeCompile=h=>{h.vertexShader=h.vertexShader.replace("#include <common>",`#include <common>
attribute float aSpine;
attribute float aPage;
attribute float aVar;
varying float vPage;`).replace("#include <uv_vertex>",`#include <uv_vertex>
vMapUv.x += aSpine * aVar * 0.0625;
vPage = aPage;`).replace("#include <color_vertex>",`#include <color_vertex>
vColor.xyz = mix(vColor.xyz, vec3(0.78, 0.71, 0.57), aPage);`),h.fragmentShader=h.fragmentShader.replace("#include <common>",`#include <common>
varying float vPage;`).replace("#include <color_fragment>",`
          float gm = 0.0;
          #ifdef USE_MAP
            gm = clamp((sampledDiffuseColor.r - sampledDiffuseColor.b - 0.18) * 4.0, 0.0, 1.0) * (1.0 - vPage);
          #endif
          diffuseColor.rgb *= mix(vColor, vec3(1.25), gm);
        `).replace("#include <roughnessmap_fragment>",`#include <roughnessmap_fragment>
roughnessFactor = mix(roughnessFactor, 0.32, gm);
`).replace("#include <metalnessmap_fragment>",`#include <metalnessmap_fragment>
metalnessFactor = mix(metalnessFactor, 0.85, gm);
`)};const u=e.index.array;e.setIndex(Array.from(u.slice(0,30)));const l=new kc(e,c,a),f=new Lt;for(let h=0;h<a;h++){l.setMatrixAt(h,this.mats[h]);const p=this.cols[h];f.setRGB(p[0],p[1],p[2]),l.setColorAt(h,f)}return l.instanceMatrix.needsUpdate=!0,l.instanceColor.needsUpdate=!0,l.castShadow=!0,l.receiveShadow=!0,l.computeBoundingSphere(),l}}const fn=document.getElementById("c"),oe=new r0({canvas:fn,antialias:!0,powerPreference:"high-performance"}),Wc=Math.min(window.devicePixelRatio||1,1);let Be=Wc;oe.setPixelRatio(Be);oe.setSize(window.innerWidth,window.innerHeight);oe.toneMapping=uc;oe.toneMappingExposure=1.05;oe.outputColorSpace=Ae;oe.shadowMap.enabled=!0;oe.shadowMap.type=Sa;oe.shadowMap.autoUpdate=!1;const ae=new Hc;ae.background=new Lt(9075306);const gn=new Ie(70,window.innerWidth/window.innerHeight,.05,2500);gn.rotation.order="YXZ";const P0=new fa(oe);ae.environment=P0.fromScene(new p0,.04).texture;ae.environmentIntensity=.22;const L0=Dn(20261006),I0=T0(),Xc=new C0(Dn(77)),Zi=A0(I0,Xc,L0);Zi.B.finish(ae);const qc=Xc.build(x0(31));ae.add(qc);const Oa=Zi.B.solids,Mi=new U(-.9,.4,.14).normalize(),tn=new d0(16757611,8);tn.target.position.set(-2,3,-1);tn.position.copy(tn.target.position).addScaledVector(Mi,60);tn.castShadow=!0;tn.shadow.mapSize.set(4096,4096);const Jn=tn.shadow.camera;Jn.left=-17;Jn.right=17;Jn.top=15;Jn.bottom=-15;Jn.near=20;Jn.far=100;Jn.updateProjectionMatrix();tn.shadow.bias=-4e-4;tn.shadow.normalBias=.025;ae.add(tn,tn.target);const D0=new u0(13227775,6964264,.42);ae.add(D0);const Yc=new Fa(16754792,11,24,1.2);Yc.position.set(3,3.6,-.8);ae.add(Yc);const $c=[];for(const n of Zi.lights){const t=new Fa(n.c,n.i,n.d,2);t.position.copy(n.p),t.userData=n,ae.add(t),$c.push(t)}new Lt(1,.66,.42);{const n=new Ki(1200,32,16),t=new $e({side:ve,depthWrite:!1,uniforms:{sunDir:{value:Mi}},vertexShader:"varying vec3 vDir; void main(){ vDir = position; vec4 p = projectionMatrix * modelViewMatrix * vec4(position,1.0); gl_Position = p.xyww; }",fragmentShader:`uniform vec3 sunDir; varying vec3 vDir;
      void main(){ vec3 d = normalize(vDir); float h = d.y;
        vec3 zen = vec3(0.16,0.27,0.55); vec3 hor = vec3(1.25,0.74,0.45); vec3 below = vec3(0.55,0.42,0.36);
        vec3 col = mix(hor, zen, pow(clamp(h,0.0,1.0), 0.5));
        col = mix(col, below, smoothstep(0.0,-0.2,h));
        float s = max(dot(d, sunDir), 0.0);
        col += vec3(1.0,0.55,0.25)*pow(s,5.0)*0.7 + vec3(1.0,0.75,0.45)*pow(s,90.0)*2.5 + smoothstep(0.9993,0.9996,s)*vec3(18.0,12.0,7.0);
        gl_FragColor = vec4(col,1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`}),e=new Qt(n,t);e.frustumCulled=!1,e.renderOrder=-1,ae.add(e)}function We(n,t){let e=-.7;const i=Math.max(0,-n-13);return e-=70*(1-Math.exp(-i/140)),e+=(Math.sin(n*.011+t*.017)*10+Math.sin(t*.029+1.3)*Math.cos(n*.013)*12)*Math.min(1,i/120),n<-420&&(e+=Math.min(140,(-n-420)*.22)*(.75+.18*Math.sin(t*.009+.5)+.07*Math.sin(t*.043))),n>8&&(e+=(n-8)*.35),Math.abs(t)>30&&n>-60&&(e+=(Math.abs(t)-30)*.12),e}{const e=new pn(1800,1800,220,220);e.rotateX(-Math.PI/2);const i=e.attributes.position,r=new Float32Array(i.count*3),s=new Lt(.24,.27,.1),a=new Lt(.34,.3,.12),o=new Lt,c=new U(Mi.x,Mi.y,Mi.z);for(let b=0;b<i.count;b++){const M=i.getX(b),D=i.getZ(b),w=We(M,D);i.setY(b,w);const C=We(M-1,D)-We(M+1,D),I=We(M,D-1)-We(M,D+1),E=new U(C,2,I).normalize(),S=.45+.9*Math.max(0,E.dot(c));o.copy(s).lerp(a,.5+.5*Math.sin(M*.05)*Math.cos(D*.07)).multiplyScalar(S),o.r*=1.25,o.g*=1.05;const P=Math.hypot(M+10,D),X=1-Math.exp(-P/420);o.lerp(new Lt(.86,.6,.48),X*.92),r[b*3]=o.r,r[b*3+1]=o.g,r[b*3+2]=o.b}e.setAttribute("color",new Ee(r,3)),e.computeVertexNormals();const u=new Qt(e,new Pn({vertexColors:!0}));u.position.x=-300;for(let b=0;b<i.count;b++)i.setY(b,We(i.getX(b)-300,i.getZ(b)));u.matrixAutoUpdate=!1,u.updateMatrix(),ae.add(u);for(let b=0;b<i.count;b++){const M=i.getX(b)-300,D=i.getZ(b),w=We(M-1,D)-We(M+1,D),C=We(M,D-1)-We(M,D+1),I=new U(w,2,C).normalize(),E=.45+.9*Math.max(0,I.dot(c));o.copy(s).lerp(a,.5+.5*Math.sin(M*.05)*Math.cos(D*.07)).multiplyScalar(E),o.r*=1.25,o.g*=1.05;const S=Math.hypot(M+10,D);o.lerp(new Lt(.86,.6,.48),(1-Math.exp(-S/420))*.92),r[b*3]=o.r,r[b*3+1]=o.g,r[b*3+2]=o.b}const l=Dn(5),f=new Da(1,1,7);f.translate(0,.5,0);const h=new kc(f,new Pn,700),p=new $t,g=new Ln,_=new U,m=new U,d=new Lt;let A=0;for(;A<700;){const b=-14-Math.pow(l(),1.6)*520,M=(l()-.5)*900;if(b>-45)continue;const D=5+l()*9,w=D*(.25+l()*.1);_.set(b,We(b,M)-.5,M),m.set(w,D,w),p.compose(_,g,m),h.setMatrixAt(A,p);const C=Math.hypot(b+10,M);d.setRGB(.16+l()*.06,.2+l()*.07,.1).lerp(new Lt(.8,.58,.5),(1-Math.exp(-C/300))*.92),h.setColorAt(A,d),A++}h.frustumCulled=!1,ae.add(h)}const xa=Mi.clone().negate();{const n=[],t=[];for(const a of Zi.windows.slice(0,4))for(let o=0;o<4;o++){const c=a[o],u=a[(o+1)%4],l=c.clone().addScaledVector(xa,12),f=u.clone().addScaledVector(xa,12);for(const[h,p,g]of[[c,0,0],[u,0,1],[f,1,1],[c,0,0],[f,1,1],[l,1,0]])n.push(h.x,h.y,h.z),t.push(p,g)}const i=new Re;i.setAttribute("position",new le(n,3)),i.setAttribute("uv",new le(t,2));const r=new $e({transparent:!0,depthWrite:!1,blending:Lr,side:De,uniforms:{t:{value:0}},vertexShader:"varying vec2 vUv; varying vec3 vW; void main(){ vUv = uv; vec4 w = modelMatrix*vec4(position,1.0); vW = w.xyz; gl_Position = projectionMatrix*viewMatrix*w; }",fragmentShader:`uniform float t; varying vec2 vUv; varying vec3 vW;
      void main(){ float along = vUv.x; float across = vUv.y;
        float a = pow(1.0-along, 1.6) * smoothstep(0.0,0.04,along) * smoothstep(0.0,0.25,across) * smoothstep(1.0,0.75,across);
        float n = 0.75 + 0.25*sin(vW.x*1.7 + vW.y*2.3 + t*0.3) * sin(vW.z*1.3 - t*0.2);
        float fadeFloor = smoothstep(0.0, 0.6, vW.y);
        gl_FragColor = vec4(vec3(1.0,0.72,0.42)*a*n*0.11*fadeFloor, 1.0); }`}),s=new Qt(i,r);s.frustumCulled=!1,s.renderOrder=5,ae.add(s),window.__shafts=r}let Nr;{const n=Dn(9),t=[],e=[];for(const s of Zi.windows)for(let a=0;a<420;a++){const o=n(),c=n(),u=s[0].clone().lerp(s[1],o).lerp(s[3].clone().lerp(s[2],o),c).addScaledVector(xa,.5+n()*11);u.y<.1||u.y>10||u.x>6.9||u.z<-9.9||u.z>8.9||(t.push(u.x,u.y,u.z),e.push(n()*100))}const i=new Re;i.setAttribute("position",new le(t,3)),i.setAttribute("phase",new le(e,1)),Nr=new $e({transparent:!0,depthWrite:!1,blending:Lr,uniforms:{t:{value:0},map:{value:S0()},scale:{value:window.innerHeight*.5}},vertexShader:`uniform float t; uniform float scale; attribute float phase; varying float vA;
      void main(){ vec3 p = position + vec3(sin(t*0.11+phase)*0.25, sin(t*0.07+phase*1.3)*0.3, cos(t*0.09+phase*0.7)*0.25);
        vec4 mv = modelViewMatrix*vec4(p,1.0); gl_Position = projectionMatrix*mv;
        gl_PointSize = clamp(0.018*scale/-mv.z, 0.0, 6.0); vA = 0.55+0.45*sin(t*0.5+phase); }`,fragmentShader:"uniform sampler2D map; varying float vA; void main(){ float a = texture2D(map, gl_PointCoord).a; gl_FragColor = vec4(vec3(1.0,0.8,0.55)*a*vA*0.8, 1.0); }"});const r=new c0(i,Nr);r.frustumCulled=!1,ae.add(r)}const gt={pos:new U,vy:0,yaw:0,pitch:0,eye:1.62,eyeCur:1.62,smoothY:0,vel:new U,radius:.28,step:.42,height:1.75},Kc=[{p:[3.4,0,4.3],yaw:.78,pitch:.1,name:"Entrance by the hearth"},{p:[-2,0,-3.7],yaw:1.2,pitch:-.05,name:"Lower shelves, between the stacks"},{p:[-8.2,0,4.9],yaw:1.5,pitch:-.05,name:"Window reading alcove"},{p:[5.6,0,8],yaw:0,pitch:.18,name:"Foot of the staircase"},{p:[1.2,_a.GY,-7.6],yaw:Math.PI-.3,pitch:-.32,name:"Gallery overlook"}];function qi(n){const t=Kc[n];gt.pos.set(t.p[0],t.p[1],t.p[2]),gt.yaw=t.yaw,gt.pitch=t.pitch,gt.vy=0,gt.vel.set(0,0,0),gt.smoothY=gt.pos.y,Ba(t.name)}function U0(n,t,e){let i=-1/0;const r=gt.radius*.7;for(const s of Oa)n+r<s.x0||n-r>s.x1||t+r<s.z0||t-r>s.z1||s.y1<=e+gt.step&&s.y1>i&&(i=s.y1);return i}function bs(n,t,e,i){const r=gt.radius;for(const s of Oa)if(!(n+r<=s.x0||n-r>=s.x1||t+r<=s.z0||t-r>=s.z1)&&s.y0<e+i&&s.y1>e+gt.step)return!0;return!1}const ye=new Set;let Wi=!1;addEventListener("keydown",n=>{if(ye.add(n.code),n.code==="KeyR"&&qi(0),n.code.startsWith("Digit")){const t=+n.code.slice(5)-1;t>=0&&t<Kc.length&&qi(t)}n.code==="KeyC"&&(Wi=!Wi),n.code==="KeyF"&&Zc.classList.toggle("show"),n.code==="KeyH"&&N0.classList.toggle("hide"),n.code==="KeyP"&&(Be=Be>.8?Math.max(.6,Be-.25):Wc,oe.setPixelRatio(Be),Gr(),Ba(`Render scale ${Math.round(Be*100)}%`)),["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Space"].includes(n.code)&&n.preventDefault()});addEventListener("keyup",n=>ye.delete(n.code));addEventListener("blur",()=>ye.clear());const oc=document.getElementById("overlay"),N0=document.getElementById("help"),Zc=document.getElementById("stats"),Fr=document.getElementById("toast");let Pr=0;function Ba(n){Fr.textContent=n,Fr.classList.add("show"),Pr=2.2}let za=!1,Ha=!1;oc.addEventListener("click",()=>{var n;(n=fn.requestPointerLock)==null||n.call(fn),oc.classList.add("hide")});fn.addEventListener("mousedown",()=>{var n;za||(Ha=!0,(n=fn.requestPointerLock)==null||n.call(fn))});addEventListener("mouseup",()=>Ha=!1);document.addEventListener("pointerlockchange",()=>{za=document.pointerLockElement===fn});addEventListener("mousemove",n=>{if(!za&&!Ha)return;const t=.0022;gt.yaw-=n.movementX*t,gt.pitch=Math.max(-1.5,Math.min(1.5,gt.pitch-n.movementY*t))});function jc(n){const t=(ye.has("KeyW")||ye.has("ArrowUp")?1:0)-(ye.has("KeyS")||ye.has("ArrowDown")?1:0),e=(ye.has("KeyD")||ye.has("ArrowRight")?1:0)-(ye.has("KeyA")||ye.has("ArrowLeft")?1:0),i=(ye.has("ShiftLeft")||ye.has("ShiftRight")?4.6:2.5)*(Wi?.55:1),r=Math.sin(gt.yaw),s=Math.cos(gt.yaw),a=-r*t+s*e,o=-s*t-r*e,c=Math.hypot(a,o)||1,u=new U(a/c*i*(t||e?1:0),0,o/c*i*(t||e?1:0)),l=1-Math.exp(-n*12);gt.vel.lerp(u,l);const f=Wi?1.15:gt.height,h=gt.pos.x+gt.vel.x*n,p=gt.pos.z+gt.vel.z*n;bs(h,p,gt.pos.y,f)?bs(h,gt.pos.z,gt.pos.y,f)?bs(gt.pos.x,p,gt.pos.y,f)?gt.vel.multiplyScalar(.2):(gt.pos.z=p,gt.vel.x*=.5):(gt.pos.x=h,gt.vel.z*=.5):(gt.pos.x=h,gt.pos.z=p);const g=U0(gt.pos.x,gt.pos.z,gt.pos.y);g>=gt.pos.y-gt.step&&g>-1/0&&gt.vy<=0?(gt.pos.y=g,gt.vy=0):(gt.vy-=9.8*n,gt.pos.y+=gt.vy*n,g>-1/0&&gt.pos.y<g&&(gt.pos.y=g,gt.vy=0)),gt.pos.y<-10&&qi(0),gt.smoothY+=(gt.pos.y-gt.smoothY)*(1-Math.exp(-n*14)),gt.eyeCur+=((Wi?1:gt.eye)-gt.eyeCur)*(1-Math.exp(-n*10)),gn.position.set(gt.pos.x,gt.smoothY+gt.eyeCur,gt.pos.z),gn.rotation.set(gt.pitch,gt.yaw,0)}function Gr(){gn.aspect=window.innerWidth/window.innerHeight,gn.updateProjectionMatrix(),oe.setSize(window.innerWidth,window.innerHeight),Nr.uniforms.scale.value=window.innerHeight*Be*.5}addEventListener("resize",Gr);Gr();const F0=new Pn({colorWrite:!1}),va=[];ae.traverse(n=>{n.material&&(n.material.transparent||n.material.isShaderMaterial||n.isPoints)&&va.push(n)});oe.autoClear=!1;let Jc=!1;function Qc(){if(oe.clear(),Jc){for(const n of va)n.visible=!1;ae.overrideMaterial=F0,oe.render(ae,gn),ae.overrideMaterial=null;for(const n of va)n.visible=!0}oe.render(ae,gn)}const Gn=[];let Ts=0,cc=performance.now(),ki=0,As=0,lc=0;qi(0);Fr.classList.remove("show");oe.compile(ae,gn);ae.traverse(n=>{const t=n.material;if(t){for(const e of["map","bumpMap"])t[e]&&oe.initTexture(t[e]);t.uniforms&&t.uniforms.map&&oe.initTexture(t.uniforms.map.value)}});oe.shadowMap.needsUpdate=!0;function tl(n){const t=(n-cc)/1e3;cc=n;const e=Math.min(t,.05);ki+=e,jc(e);for(const i of $c)i.userData.fire&&(i.intensity=i.userData.i*(.82+.12*Math.sin(ki*9.1)+.08*Math.sin(ki*23.7+1.3)));if(window.__shafts.uniforms.t.value=ki,Nr.uniforms.t.value=ki,Qc(),t<.25&&document.visibilityState==="visible"&&Gn.push(t*1e3),Gn.length>240&&Gn.shift(),Ts+=t,Ts>.5){Ts=0;const i=[...Gn].sort((o,c)=>o-c),r=i.reduce((o,c)=>o+c,0)/i.length,s=i[Math.floor(i.length*.99)-1]||r,a=oe.info.render;Zc.textContent=`${(1e3/r).toFixed(0)} fps  avg ${r.toFixed(1)} ms  p99 ${s.toFixed(1)} ms
calls ${a.calls}  tris ${(a.triangles/1e3).toFixed(0)}k  scale ${Math.round(Be*100)}%
pos ${gt.pos.x.toFixed(1)} ${gt.pos.y.toFixed(2)} ${gt.pos.z.toFixed(1)}`}if(As+=t,As>4&&Gn.length>=120&&lc<2){const i=Gn.slice(-120);i.reduce((s,a)=>s+a,0)/i.length>26&&(lc++,As=0,Be=Math.max(.6,Be*.8),oe.setPixelRatio(Be),Gr(),Gn.length=0,Ba("Render scale "+Math.round(Be*100)+"% (auto)"))}Pr>0&&(Pr-=e,Pr<=0&&Fr.classList.remove("show")),requestAnimationFrame(tl)}requestAnimationFrame(tl);document.getElementById("loading").classList.add("hide");window.__lib={P:gt,setView:qi,solids:Oa,renderer:oe,scene:ae,camera:gn,books:qc,drawFrame:Qc,setPrepass:n=>Jc=n,sim:(n,t)=>{n.forEach(e=>ye.add(e));for(let e=0;e<t;e+=1/60)jc(1/60);return n.forEach(e=>ye.delete(e)),gt.pos.toArray().map(e=>+e.toFixed(2))}};

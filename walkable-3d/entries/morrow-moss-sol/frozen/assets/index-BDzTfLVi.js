(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function e(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=e(r);fetch(r.href,s)}})();/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const wo="180",ac=0,ta=1,lc=2,al=1,ll=2,un=3,wn=0,Re=1,be=2,yn=0,fi=1,ea=2,na=3,ia=4,cc=5,kn=100,uc=101,hc=102,fc=103,dc=104,pc=200,mc=201,gc=202,_c=203,Cs=204,Ps=205,vc=206,xc=207,Mc=208,Sc=209,yc=210,Ec=211,Tc=212,Ac=213,wc=214,Ls=0,Ds=1,Us=2,mi=3,Is=4,Ns=5,Fs=6,Os=7,cl=0,bc=1,Rc=2,En=0,Cc=1,Pc=2,Lc=3,ul=4,Dc=5,Uc=6,Ic=7,hl=300,gi=301,_i=302,Bs=303,zs=304,zr=306,Dr=1e3,fn=1001,ks=1002,qe=1003,Nc=1004,Qi=1005,Qe=1006,Xr=1007,Gn=1008,en=1009,fl=1010,dl=1011,Bi=1012,bo=1013,Wn=1014,dn=1015,Yi=1016,Ro=1017,Co=1018,zi=1020,pl=35902,ml=35899,gl=1021,_l=1022,We=1023,ki=1026,Hi=1027,vl=1028,Po=1029,xl=1030,Lo=1031,Do=1033,wr=33776,br=33777,Rr=33778,Cr=33779,Hs=35840,Gs=35841,Vs=35842,Ws=35843,Xs=36196,qs=37492,Ys=37496,Zs=37808,Ks=37809,Js=37810,$s=37811,js=37812,Qs=37813,to=37814,eo=37815,no=37816,io=37817,ro=37818,so=37819,oo=37820,ao=37821,lo=36492,co=36494,uo=36495,ho=36283,fo=36284,po=36285,mo=36286,Fc=3200,Oc=3201,Ml=0,Bc=1,hn="",Ee="srgb",vi="srgb-linear",Ur="linear",Kt="srgb",Kn=7680,ra=519,zc=512,kc=513,Hc=514,Sl=515,Gc=516,Vc=517,Wc=518,Xc=519,sa=35044,oa="300 es",tn=2e3,Ir=2001;class Si{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){const i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){const i=this._listeners;if(i===void 0)return;const r=i[t];if(r!==void 0){const s=r.indexOf(e);s!==-1&&r.splice(s,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const i=e[t.type];if(i!==void 0){t.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,t);t.target=null}}}const xe=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],qr=Math.PI/180,go=180/Math.PI;function yi(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(xe[n&255]+xe[n>>8&255]+xe[n>>16&255]+xe[n>>24&255]+"-"+xe[t&255]+xe[t>>8&255]+"-"+xe[t>>16&15|64]+xe[t>>24&255]+"-"+xe[e&63|128]+xe[e>>8&255]+"-"+xe[e>>16&255]+xe[e>>24&255]+xe[i&255]+xe[i>>8&255]+xe[i>>16&255]+xe[i>>24&255]).toLowerCase()}function Bt(n,t,e){return Math.max(t,Math.min(e,n))}function qc(n,t){return(n%t+t)%t}function Yr(n,t,e){return(1-e)*n+e*t}function wi(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function we(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}class ct{constructor(t=0,e=0){ct.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6],this.y=r[1]*e+r[4]*i+r[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Bt(this.x,t.x,e.x),this.y=Bt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Bt(this.x,t,e),this.y=Bt(this.y,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Bt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Bt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),r=Math.sin(e),s=this.x-t.x,o=this.y-t.y;return this.x=s*i-o*r+t.x,this.y=s*r+o*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Tn{constructor(t=0,e=0,i=0,r=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=r}static slerpFlat(t,e,i,r,s,o,a){let l=i[r+0],c=i[r+1],u=i[r+2],h=i[r+3];const p=s[o+0],d=s[o+1],g=s[o+2],v=s[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=u,t[e+3]=h;return}if(a===1){t[e+0]=p,t[e+1]=d,t[e+2]=g,t[e+3]=v;return}if(h!==v||l!==p||c!==d||u!==g){let m=1-a;const f=l*p+c*d+u*g+h*v,M=f>=0?1:-1,S=1-f*f;if(S>Number.EPSILON){const b=Math.sqrt(S),w=Math.atan2(b,f*M);m=Math.sin(m*w)/b,a=Math.sin(a*w)/b}const _=a*M;if(l=l*m+p*_,c=c*m+d*_,u=u*m+g*_,h=h*m+v*_,m===1-a){const b=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=b,c*=b,u*=b,h*=b}}t[e]=l,t[e+1]=c,t[e+2]=u,t[e+3]=h}static multiplyQuaternionsFlat(t,e,i,r,s,o){const a=i[r],l=i[r+1],c=i[r+2],u=i[r+3],h=s[o],p=s[o+1],d=s[o+2],g=s[o+3];return t[e]=a*g+u*h+l*d-c*p,t[e+1]=l*g+u*p+c*h-a*d,t[e+2]=c*g+u*d+a*p-l*h,t[e+3]=u*g-a*h-l*p-c*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,r){return this._x=t,this._y=e,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,r=t._y,s=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(i/2),u=a(r/2),h=a(s/2),p=l(i/2),d=l(r/2),g=l(s/2);switch(o){case"XYZ":this._x=p*u*h+c*d*g,this._y=c*d*h-p*u*g,this._z=c*u*g+p*d*h,this._w=c*u*h-p*d*g;break;case"YXZ":this._x=p*u*h+c*d*g,this._y=c*d*h-p*u*g,this._z=c*u*g-p*d*h,this._w=c*u*h+p*d*g;break;case"ZXY":this._x=p*u*h-c*d*g,this._y=c*d*h+p*u*g,this._z=c*u*g+p*d*h,this._w=c*u*h-p*d*g;break;case"ZYX":this._x=p*u*h-c*d*g,this._y=c*d*h+p*u*g,this._z=c*u*g-p*d*h,this._w=c*u*h+p*d*g;break;case"YZX":this._x=p*u*h+c*d*g,this._y=c*d*h+p*u*g,this._z=c*u*g-p*d*h,this._w=c*u*h-p*d*g;break;case"XZY":this._x=p*u*h-c*d*g,this._y=c*d*h-p*u*g,this._z=c*u*g+p*d*h,this._w=c*u*h+p*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,r=Math.sin(i);return this._x=t.x*r,this._y=t.y*r,this._z=t.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],r=e[4],s=e[8],o=e[1],a=e[5],l=e[9],c=e[2],u=e[6],h=e[10],p=i+a+h;if(p>0){const d=.5/Math.sqrt(p+1);this._w=.25/d,this._x=(u-l)*d,this._y=(s-c)*d,this._z=(o-r)*d}else if(i>a&&i>h){const d=2*Math.sqrt(1+i-a-h);this._w=(u-l)/d,this._x=.25*d,this._y=(r+o)/d,this._z=(s+c)/d}else if(a>h){const d=2*Math.sqrt(1+a-i-h);this._w=(s-c)/d,this._x=(r+o)/d,this._y=.25*d,this._z=(l+u)/d}else{const d=2*Math.sqrt(1+h-i-a);this._w=(o-r)/d,this._x=(s+c)/d,this._y=(l+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Bt(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const r=Math.min(1,e/i);return this.slerp(t,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,r=t._y,s=t._z,o=t._w,a=e._x,l=e._y,c=e._z,u=e._w;return this._x=i*u+o*a+r*c-s*l,this._y=r*u+o*l+s*a-i*c,this._z=s*u+o*c+i*l-r*a,this._w=o*u-i*a-r*l-s*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const i=this._x,r=this._y,s=this._z,o=this._w;let a=o*t._w+i*t._x+r*t._y+s*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=i,this._y=r,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const d=1-e;return this._w=d*o+e*this._w,this._x=d*i+e*this._x,this._y=d*r+e*this._y,this._z=d*s+e*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),h=Math.sin((1-e)*u)/c,p=Math.sin(e*u)/c;return this._w=o*h+this._w*p,this._x=i*h+this._x*p,this._y=r*h+this._y*p,this._z=s*h+this._z*p,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(t),r*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class P{constructor(t=0,e=0,i=0){P.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(aa.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(aa.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6]*r,this.y=s[1]*e+s[4]*i+s[7]*r,this.z=s[2]*e+s[5]*i+s[8]*r,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,r=this.z,s=t.elements,o=1/(s[3]*e+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*e+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*e+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*e+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(t){const e=this.x,i=this.y,r=this.z,s=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*r-a*i),u=2*(a*e-s*r),h=2*(s*i-o*e);return this.x=e+l*c+o*h-a*u,this.y=i+l*u+a*c-s*h,this.z=r+l*h+s*u-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[4]*i+s[8]*r,this.y=s[1]*e+s[5]*i+s[9]*r,this.z=s[2]*e+s[6]*i+s[10]*r,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Bt(this.x,t.x,e.x),this.y=Bt(this.y,t.y,e.y),this.z=Bt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Bt(this.x,t,e),this.y=Bt(this.y,t,e),this.z=Bt(this.z,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Bt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,r=t.y,s=t.z,o=e.x,a=e.y,l=e.z;return this.x=r*l-s*a,this.y=s*o-i*l,this.z=i*a-r*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Zr.copy(this).projectOnVector(t),this.sub(Zr)}reflect(t){return this.sub(Zr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Bt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,r=this.z-t.z;return e*e+i*i+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const r=Math.sin(e)*t;return this.x=r*Math.sin(i),this.y=Math.cos(e)*t,this.z=r*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),r=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=r,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Zr=new P,aa=new Tn;class Nt{constructor(t,e,i,r,s,o,a,l,c){Nt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,r,s,o,a,l,c)}set(t,e,i,r,s,o,a,l,c){const u=this.elements;return u[0]=t,u[1]=r,u[2]=a,u[3]=e,u[4]=s,u[5]=l,u[6]=i,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,r=e.elements,s=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],u=i[4],h=i[7],p=i[2],d=i[5],g=i[8],v=r[0],m=r[3],f=r[6],M=r[1],S=r[4],_=r[7],b=r[2],w=r[5],R=r[8];return s[0]=o*v+a*M+l*b,s[3]=o*m+a*S+l*w,s[6]=o*f+a*_+l*R,s[1]=c*v+u*M+h*b,s[4]=c*m+u*S+h*w,s[7]=c*f+u*_+h*R,s[2]=p*v+d*M+g*b,s[5]=p*m+d*S+g*w,s[8]=p*f+d*_+g*R,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],r=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8];return e*o*u-e*a*c-i*s*u+i*a*l+r*s*c-r*o*l}invert(){const t=this.elements,e=t[0],i=t[1],r=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8],h=u*o-a*c,p=a*l-u*s,d=c*s-o*l,g=e*h+i*p+r*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return t[0]=h*v,t[1]=(r*c-u*i)*v,t[2]=(a*i-r*o)*v,t[3]=p*v,t[4]=(u*e-r*l)*v,t[5]=(r*s-a*e)*v,t[6]=d*v,t[7]=(i*l-c*e)*v,t[8]=(o*e-i*s)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,r,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*o+c*a)+o+t,-r*c,r*l,-r*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Kr.makeScale(t,e)),this}rotate(t){return this.premultiply(Kr.makeRotation(-t)),this}translate(t,e){return this.premultiply(Kr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let r=0;r<9;r++)if(e[r]!==i[r])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Kr=new Nt;function yl(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function Nr(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Yc(){const n=Nr("canvas");return n.style.display="block",n}const la={};function Gi(n){n in la||(la[n]=!0,console.warn(n))}function Zc(n,t,e){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:i()}}setTimeout(s,e)})}const ca=new Nt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ua=new Nt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Kc(){const n={enabled:!0,workingColorSpace:vi,spaces:{},convert:function(r,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===Kt&&(r.r=pn(r.r),r.g=pn(r.g),r.b=pn(r.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===Kt&&(r.r=di(r.r),r.g=di(r.g),r.b=di(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===hn?Ur:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,o){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Gi("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Gi("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[vi]:{primaries:t,whitePoint:i,transfer:Ur,toXYZ:ca,fromXYZ:ua,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Ee},outputColorSpaceConfig:{drawingBufferColorSpace:Ee}},[Ee]:{primaries:t,whitePoint:i,transfer:Kt,toXYZ:ca,fromXYZ:ua,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Ee}}}),n}const Xt=Kc();function pn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function di(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Jn;class Jc{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{Jn===void 0&&(Jn=Nr("canvas")),Jn.width=t.width,Jn.height=t.height;const r=Jn.getContext("2d");t instanceof ImageData?r.putImageData(t,0,0):r.drawImage(t,0,0,t.width,t.height),i=Jn}return i.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Nr("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const r=i.getImageData(0,0,t.width,t.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=pn(s[o]/255)*255;return i.putImageData(r,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(pn(e[i]/255)*255):e[i]=pn(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let $c=0;class Uo{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:$c++}),this.uuid=yi(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(Jr(r[o].image)):s.push(Jr(r[o]))}else s=Jr(r);i.url=s}return e||(t.images[this.uuid]=i),i}}function Jr(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Jc.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let jc=0;const $r=new P;class Te extends Si{constructor(t=Te.DEFAULT_IMAGE,e=Te.DEFAULT_MAPPING,i=fn,r=fn,s=Qe,o=Gn,a=We,l=en,c=Te.DEFAULT_ANISOTROPY,u=hn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:jc++}),this.uuid=yi(),this.name="",this.source=new Uo(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new ct(0,0),this.repeat=new ct(1,1),this.center=new ct(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Nt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize($r).x}get height(){return this.source.getSize($r).y}get depth(){return this.source.getSize($r).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const r=this[e];if(r===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==hl)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Dr:t.x=t.x-Math.floor(t.x);break;case fn:t.x=t.x<0?0:1;break;case ks:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Dr:t.y=t.y-Math.floor(t.y);break;case fn:t.y=t.y<0?0:1;break;case ks:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Te.DEFAULT_IMAGE=null;Te.DEFAULT_MAPPING=hl;Te.DEFAULT_ANISOTROPY=1;class Jt{constructor(t=0,e=0,i=0,r=1){Jt.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=r}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,r){return this.x=t,this.y=e,this.z=i,this.w=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,r=this.z,s=this.w,o=t.elements;return this.x=o[0]*e+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*e+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*e+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*e+o[7]*i+o[11]*r+o[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,r,s;const l=t.elements,c=l[0],u=l[4],h=l[8],p=l[1],d=l[5],g=l[9],v=l[2],m=l[6],f=l[10];if(Math.abs(u-p)<.01&&Math.abs(h-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+p)<.1&&Math.abs(h+v)<.1&&Math.abs(g+m)<.1&&Math.abs(c+d+f-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const S=(c+1)/2,_=(d+1)/2,b=(f+1)/2,w=(u+p)/4,R=(h+v)/4,L=(g+m)/4;return S>_&&S>b?S<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(S),r=w/i,s=R/i):_>b?_<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(_),i=w/r,s=L/r):b<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(b),i=R/s,r=L/s),this.set(i,r,s,e),this}let M=Math.sqrt((m-g)*(m-g)+(h-v)*(h-v)+(p-u)*(p-u));return Math.abs(M)<.001&&(M=1),this.x=(m-g)/M,this.y=(h-v)/M,this.z=(p-u)/M,this.w=Math.acos((c+d+f-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Bt(this.x,t.x,e.x),this.y=Bt(this.y,t.y,e.y),this.z=Bt(this.z,t.z,e.z),this.w=Bt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Bt(this.x,t,e),this.y=Bt(this.y,t,e),this.z=Bt(this.z,t,e),this.w=Bt(this.w,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Bt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Qc extends Si{constructor(t=1,e=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Qe,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=i.depth,this.scissor=new Jt(0,0,t,e),this.scissorTest=!1,this.viewport=new Jt(0,0,t,e);const r={width:t,height:e,depth:i.depth},s=new Te(r);this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(t={}){const e={minFilter:Qe,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=t,this.textures[r].image.height=e,this.textures[r].image.depth=i,this.textures[r].isArrayTexture=this.textures[r].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,i=t.textures.length;e<i;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const r=Object.assign({},t.textures[e].image);this.textures[e].source=new Uo(r)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Xn extends Qc{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class El extends Te{constructor(t=null,e=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:r},this.magFilter=qe,this.minFilter=qe,this.wrapR=fn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class tu extends Te{constructor(t=null,e=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:r},this.magFilter=qe,this.minFilter=qe,this.wrapR=fn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Zi{constructor(t=new P(1/0,1/0,1/0),e=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(ke.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(ke.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=ke.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const s=i.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,ke):ke.fromBufferAttribute(s,o),ke.applyMatrix4(t.matrixWorld),this.expandByPoint(ke);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),tr.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),tr.copy(i.boundingBox)),tr.applyMatrix4(t.matrixWorld),this.union(tr)}const r=t.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,ke),ke.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(bi),er.subVectors(this.max,bi),$n.subVectors(t.a,bi),jn.subVectors(t.b,bi),Qn.subVectors(t.c,bi),gn.subVectors(jn,$n),_n.subVectors(Qn,jn),Ln.subVectors($n,Qn);let e=[0,-gn.z,gn.y,0,-_n.z,_n.y,0,-Ln.z,Ln.y,gn.z,0,-gn.x,_n.z,0,-_n.x,Ln.z,0,-Ln.x,-gn.y,gn.x,0,-_n.y,_n.x,0,-Ln.y,Ln.x,0];return!jr(e,$n,jn,Qn,er)||(e=[1,0,0,0,1,0,0,0,1],!jr(e,$n,jn,Qn,er))?!1:(nr.crossVectors(gn,_n),e=[nr.x,nr.y,nr.z],jr(e,$n,jn,Qn,er))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,ke).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(ke).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(sn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),sn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),sn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),sn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),sn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),sn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),sn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),sn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(sn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const sn=[new P,new P,new P,new P,new P,new P,new P,new P],ke=new P,tr=new Zi,$n=new P,jn=new P,Qn=new P,gn=new P,_n=new P,Ln=new P,bi=new P,er=new P,nr=new P,Dn=new P;function jr(n,t,e,i,r){for(let s=0,o=n.length-3;s<=o;s+=3){Dn.fromArray(n,s);const a=r.x*Math.abs(Dn.x)+r.y*Math.abs(Dn.y)+r.z*Math.abs(Dn.z),l=t.dot(Dn),c=e.dot(Dn),u=i.dot(Dn);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const eu=new Zi,Ri=new P,Qr=new P;class Io{constructor(t=new P,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):eu.setFromPoints(t).getCenter(i);let r=0;for(let s=0,o=t.length;s<o;s++)r=Math.max(r,i.distanceToSquared(t[s]));return this.radius=Math.sqrt(r),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ri.subVectors(t,this.center);const e=Ri.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),r=(i-this.radius)*.5;this.center.addScaledVector(Ri,r/i),this.radius+=r}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Qr.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ri.copy(t.center).add(Qr)),this.expandByPoint(Ri.copy(t.center).sub(Qr))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}const on=new P,ts=new P,ir=new P,vn=new P,es=new P,rr=new P,ns=new P;class nu{constructor(t=new P,e=new P(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,on)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=on.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(on.copy(this.origin).addScaledVector(this.direction,e),on.distanceToSquared(t))}distanceSqToSegment(t,e,i,r){ts.copy(t).add(e).multiplyScalar(.5),ir.copy(e).sub(t).normalize(),vn.copy(this.origin).sub(ts);const s=t.distanceTo(e)*.5,o=-this.direction.dot(ir),a=vn.dot(this.direction),l=-vn.dot(ir),c=vn.lengthSq(),u=Math.abs(1-o*o);let h,p,d,g;if(u>0)if(h=o*l-a,p=o*a-l,g=s*u,h>=0)if(p>=-g)if(p<=g){const v=1/u;h*=v,p*=v,d=h*(h+o*p+2*a)+p*(o*h+p+2*l)+c}else p=s,h=Math.max(0,-(o*p+a)),d=-h*h+p*(p+2*l)+c;else p=-s,h=Math.max(0,-(o*p+a)),d=-h*h+p*(p+2*l)+c;else p<=-g?(h=Math.max(0,-(-o*s+a)),p=h>0?-s:Math.min(Math.max(-s,-l),s),d=-h*h+p*(p+2*l)+c):p<=g?(h=0,p=Math.min(Math.max(-s,-l),s),d=p*(p+2*l)+c):(h=Math.max(0,-(o*s+a)),p=h>0?s:Math.min(Math.max(-s,-l),s),d=-h*h+p*(p+2*l)+c);else p=o>0?-s:s,h=Math.max(0,-(o*p+a)),d=-h*h+p*(p+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(ts).addScaledVector(ir,p),d}intersectSphere(t,e){on.subVectors(t.center,this.origin);const i=on.dot(this.direction),r=on.dot(on)-i*i,s=t.radius*t.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,r,s,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,p=this.origin;return c>=0?(i=(t.min.x-p.x)*c,r=(t.max.x-p.x)*c):(i=(t.max.x-p.x)*c,r=(t.min.x-p.x)*c),u>=0?(s=(t.min.y-p.y)*u,o=(t.max.y-p.y)*u):(s=(t.max.y-p.y)*u,o=(t.min.y-p.y)*u),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),h>=0?(a=(t.min.z-p.z)*h,l=(t.max.z-p.z)*h):(a=(t.max.z-p.z)*h,l=(t.min.z-p.z)*h),i>l||a>r)||((a>i||i!==i)&&(i=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,e)}intersectsBox(t){return this.intersectBox(t,on)!==null}intersectTriangle(t,e,i,r,s){es.subVectors(e,t),rr.subVectors(i,t),ns.crossVectors(es,rr);let o=this.direction.dot(ns),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;vn.subVectors(this.origin,t);const l=a*this.direction.dot(rr.crossVectors(vn,rr));if(l<0)return null;const c=a*this.direction.dot(es.cross(vn));if(c<0||l+c>o)return null;const u=-a*vn.dot(ns);return u<0?null:this.at(u/o,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class se{constructor(t,e,i,r,s,o,a,l,c,u,h,p,d,g,v,m){se.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,r,s,o,a,l,c,u,h,p,d,g,v,m)}set(t,e,i,r,s,o,a,l,c,u,h,p,d,g,v,m){const f=this.elements;return f[0]=t,f[4]=e,f[8]=i,f[12]=r,f[1]=s,f[5]=o,f[9]=a,f[13]=l,f[2]=c,f[6]=u,f[10]=h,f[14]=p,f[3]=d,f[7]=g,f[11]=v,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new se().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,i=t.elements,r=1/ti.setFromMatrixColumn(t,0).length(),s=1/ti.setFromMatrixColumn(t,1).length(),o=1/ti.setFromMatrixColumn(t,2).length();return e[0]=i[0]*r,e[1]=i[1]*r,e[2]=i[2]*r,e[3]=0,e[4]=i[4]*s,e[5]=i[5]*s,e[6]=i[6]*s,e[7]=0,e[8]=i[8]*o,e[9]=i[9]*o,e[10]=i[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,r=t.y,s=t.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),h=Math.sin(s);if(t.order==="XYZ"){const p=o*u,d=o*h,g=a*u,v=a*h;e[0]=l*u,e[4]=-l*h,e[8]=c,e[1]=d+g*c,e[5]=p-v*c,e[9]=-a*l,e[2]=v-p*c,e[6]=g+d*c,e[10]=o*l}else if(t.order==="YXZ"){const p=l*u,d=l*h,g=c*u,v=c*h;e[0]=p+v*a,e[4]=g*a-d,e[8]=o*c,e[1]=o*h,e[5]=o*u,e[9]=-a,e[2]=d*a-g,e[6]=v+p*a,e[10]=o*l}else if(t.order==="ZXY"){const p=l*u,d=l*h,g=c*u,v=c*h;e[0]=p-v*a,e[4]=-o*h,e[8]=g+d*a,e[1]=d+g*a,e[5]=o*u,e[9]=v-p*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const p=o*u,d=o*h,g=a*u,v=a*h;e[0]=l*u,e[4]=g*c-d,e[8]=p*c+v,e[1]=l*h,e[5]=v*c+p,e[9]=d*c-g,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const p=o*l,d=o*c,g=a*l,v=a*c;e[0]=l*u,e[4]=v-p*h,e[8]=g*h+d,e[1]=h,e[5]=o*u,e[9]=-a*u,e[2]=-c*u,e[6]=d*h+g,e[10]=p-v*h}else if(t.order==="XZY"){const p=o*l,d=o*c,g=a*l,v=a*c;e[0]=l*u,e[4]=-h,e[8]=c*u,e[1]=p*h+v,e[5]=o*u,e[9]=d*h-g,e[2]=g*h-d,e[6]=a*u,e[10]=v*h+p}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(iu,t,ru)}lookAt(t,e,i){const r=this.elements;return Le.subVectors(t,e),Le.lengthSq()===0&&(Le.z=1),Le.normalize(),xn.crossVectors(i,Le),xn.lengthSq()===0&&(Math.abs(i.z)===1?Le.x+=1e-4:Le.z+=1e-4,Le.normalize(),xn.crossVectors(i,Le)),xn.normalize(),sr.crossVectors(Le,xn),r[0]=xn.x,r[4]=sr.x,r[8]=Le.x,r[1]=xn.y,r[5]=sr.y,r[9]=Le.y,r[2]=xn.z,r[6]=sr.z,r[10]=Le.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,r=e.elements,s=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],u=i[1],h=i[5],p=i[9],d=i[13],g=i[2],v=i[6],m=i[10],f=i[14],M=i[3],S=i[7],_=i[11],b=i[15],w=r[0],R=r[4],L=r[8],E=r[12],T=r[1],D=r[5],F=r[9],k=r[13],q=r[2],W=r[6],X=r[10],J=r[14],H=r[3],st=r[7],ht=r[11],Tt=r[15];return s[0]=o*w+a*T+l*q+c*H,s[4]=o*R+a*D+l*W+c*st,s[8]=o*L+a*F+l*X+c*ht,s[12]=o*E+a*k+l*J+c*Tt,s[1]=u*w+h*T+p*q+d*H,s[5]=u*R+h*D+p*W+d*st,s[9]=u*L+h*F+p*X+d*ht,s[13]=u*E+h*k+p*J+d*Tt,s[2]=g*w+v*T+m*q+f*H,s[6]=g*R+v*D+m*W+f*st,s[10]=g*L+v*F+m*X+f*ht,s[14]=g*E+v*k+m*J+f*Tt,s[3]=M*w+S*T+_*q+b*H,s[7]=M*R+S*D+_*W+b*st,s[11]=M*L+S*F+_*X+b*ht,s[15]=M*E+S*k+_*J+b*Tt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],r=t[8],s=t[12],o=t[1],a=t[5],l=t[9],c=t[13],u=t[2],h=t[6],p=t[10],d=t[14],g=t[3],v=t[7],m=t[11],f=t[15];return g*(+s*l*h-r*c*h-s*a*p+i*c*p+r*a*d-i*l*d)+v*(+e*l*d-e*c*p+s*o*p-r*o*d+r*c*u-s*l*u)+m*(+e*c*h-e*a*d-s*o*h+i*o*d+s*a*u-i*c*u)+f*(-r*a*u-e*l*h+e*a*p+r*o*h-i*o*p+i*l*u)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const r=this.elements;return t.isVector3?(r[12]=t.x,r[13]=t.y,r[14]=t.z):(r[12]=t,r[13]=e,r[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],r=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8],h=t[9],p=t[10],d=t[11],g=t[12],v=t[13],m=t[14],f=t[15],M=h*m*c-v*p*c+v*l*d-a*m*d-h*l*f+a*p*f,S=g*p*c-u*m*c-g*l*d+o*m*d+u*l*f-o*p*f,_=u*v*c-g*h*c+g*a*d-o*v*d-u*a*f+o*h*f,b=g*h*l-u*v*l-g*a*p+o*v*p+u*a*m-o*h*m,w=e*M+i*S+r*_+s*b;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/w;return t[0]=M*R,t[1]=(v*p*s-h*m*s-v*r*d+i*m*d+h*r*f-i*p*f)*R,t[2]=(a*m*s-v*l*s+v*r*c-i*m*c-a*r*f+i*l*f)*R,t[3]=(h*l*s-a*p*s-h*r*c+i*p*c+a*r*d-i*l*d)*R,t[4]=S*R,t[5]=(u*m*s-g*p*s+g*r*d-e*m*d-u*r*f+e*p*f)*R,t[6]=(g*l*s-o*m*s-g*r*c+e*m*c+o*r*f-e*l*f)*R,t[7]=(o*p*s-u*l*s+u*r*c-e*p*c-o*r*d+e*l*d)*R,t[8]=_*R,t[9]=(g*h*s-u*v*s-g*i*d+e*v*d+u*i*f-e*h*f)*R,t[10]=(o*v*s-g*a*s+g*i*c-e*v*c-o*i*f+e*a*f)*R,t[11]=(u*a*s-o*h*s-u*i*c+e*h*c+o*i*d-e*a*d)*R,t[12]=b*R,t[13]=(u*v*r-g*h*r+g*i*p-e*v*p-u*i*m+e*h*m)*R,t[14]=(g*a*r-o*v*r-g*i*l+e*v*l+o*i*m-e*a*m)*R,t[15]=(o*h*r-u*a*r+u*i*l-e*h*l-o*i*p+e*a*p)*R,this}scale(t){const e=this.elements,i=t.x,r=t.y,s=t.z;return e[0]*=i,e[4]*=r,e[8]*=s,e[1]*=i,e[5]*=r,e[9]*=s,e[2]*=i,e[6]*=r,e[10]*=s,e[3]*=i,e[7]*=r,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],r=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,r))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),r=Math.sin(e),s=1-i,o=t.x,a=t.y,l=t.z,c=s*o,u=s*a;return this.set(c*o+i,c*a-r*l,c*l+r*a,0,c*a+r*l,u*a+i,u*l-r*o,0,c*l-r*a,u*l+r*o,s*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,r,s,o){return this.set(1,i,s,0,t,1,o,0,e,r,1,0,0,0,0,1),this}compose(t,e,i){const r=this.elements,s=e._x,o=e._y,a=e._z,l=e._w,c=s+s,u=o+o,h=a+a,p=s*c,d=s*u,g=s*h,v=o*u,m=o*h,f=a*h,M=l*c,S=l*u,_=l*h,b=i.x,w=i.y,R=i.z;return r[0]=(1-(v+f))*b,r[1]=(d+_)*b,r[2]=(g-S)*b,r[3]=0,r[4]=(d-_)*w,r[5]=(1-(p+f))*w,r[6]=(m+M)*w,r[7]=0,r[8]=(g+S)*R,r[9]=(m-M)*R,r[10]=(1-(p+v))*R,r[11]=0,r[12]=t.x,r[13]=t.y,r[14]=t.z,r[15]=1,this}decompose(t,e,i){const r=this.elements;let s=ti.set(r[0],r[1],r[2]).length();const o=ti.set(r[4],r[5],r[6]).length(),a=ti.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),t.x=r[12],t.y=r[13],t.z=r[14],He.copy(this);const c=1/s,u=1/o,h=1/a;return He.elements[0]*=c,He.elements[1]*=c,He.elements[2]*=c,He.elements[4]*=u,He.elements[5]*=u,He.elements[6]*=u,He.elements[8]*=h,He.elements[9]*=h,He.elements[10]*=h,e.setFromRotationMatrix(He),i.x=s,i.y=o,i.z=a,this}makePerspective(t,e,i,r,s,o,a=tn,l=!1){const c=this.elements,u=2*s/(e-t),h=2*s/(i-r),p=(e+t)/(e-t),d=(i+r)/(i-r);let g,v;if(l)g=s/(o-s),v=o*s/(o-s);else if(a===tn)g=-(o+s)/(o-s),v=-2*o*s/(o-s);else if(a===Ir)g=-o/(o-s),v=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=p,c[12]=0,c[1]=0,c[5]=h,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,i,r,s,o,a=tn,l=!1){const c=this.elements,u=2/(e-t),h=2/(i-r),p=-(e+t)/(e-t),d=-(i+r)/(i-r);let g,v;if(l)g=1/(o-s),v=o/(o-s);else if(a===tn)g=-2/(o-s),v=-(o+s)/(o-s);else if(a===Ir)g=-1/(o-s),v=-s/(o-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=0,c[12]=p,c[1]=0,c[5]=h,c[9]=0,c[13]=d,c[2]=0,c[6]=0,c[10]=g,c[14]=v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let r=0;r<16;r++)if(e[r]!==i[r])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const ti=new P,He=new se,iu=new P(0,0,0),ru=new P(1,1,1),xn=new P,sr=new P,Le=new P,ha=new se,fa=new Tn;class Ke{constructor(t=0,e=0,i=0,r=Ke.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=r}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,r=this._order){return this._x=t,this._y=e,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const r=t.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],u=r[9],h=r[2],p=r[6],d=r[10];switch(e){case"XYZ":this._y=Math.asin(Bt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(p,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Bt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(Bt(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(-h,d),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Bt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(p,d),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Bt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-Bt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(p,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return ha.makeRotationFromQuaternion(t),this.setFromRotationMatrix(ha,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return fa.setFromEuler(this),this.setFromQuaternion(fa,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ke.DEFAULT_ORDER="XYZ";class Tl{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let su=0;const da=new P,ei=new Tn,an=new se,or=new P,Ci=new P,ou=new P,au=new Tn,pa=new P(1,0,0),ma=new P(0,1,0),ga=new P(0,0,1),_a={type:"added"},lu={type:"removed"},ni={type:"childadded",child:null},is={type:"childremoved",child:null};class _e extends Si{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:su++}),this.uuid=yi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=_e.DEFAULT_UP.clone();const t=new P,e=new Ke,i=new Tn,r=new P(1,1,1);function s(){i.setFromEuler(e,!1)}function o(){e.setFromQuaternion(i,void 0,!1)}e._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new se},normalMatrix:{value:new Nt}}),this.matrix=new se,this.matrixWorld=new se,this.matrixAutoUpdate=_e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=_e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Tl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return ei.setFromAxisAngle(t,e),this.quaternion.multiply(ei),this}rotateOnWorldAxis(t,e){return ei.setFromAxisAngle(t,e),this.quaternion.premultiply(ei),this}rotateX(t){return this.rotateOnAxis(pa,t)}rotateY(t){return this.rotateOnAxis(ma,t)}rotateZ(t){return this.rotateOnAxis(ga,t)}translateOnAxis(t,e){return da.copy(t).applyQuaternion(this.quaternion),this.position.add(da.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(pa,t)}translateY(t){return this.translateOnAxis(ma,t)}translateZ(t){return this.translateOnAxis(ga,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(an.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?or.copy(t):or.set(t,e,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Ci.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?an.lookAt(Ci,or,this.up):an.lookAt(or,Ci,this.up),this.quaternion.setFromRotationMatrix(an),r&&(an.extractRotation(r.matrixWorld),ei.setFromRotationMatrix(an),this.quaternion.premultiply(ei.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(_a),ni.child=t,this.dispatchEvent(ni),ni.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(lu),is.child=t,this.dispatchEvent(is),is.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),an.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),an.multiply(t.parent.matrixWorld)),t.applyMatrix4(an),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(_a),ni.child=t,this.dispatchEvent(ni),ni.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ci,t,ou),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ci,au,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,r=e.length;i<r;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,r=e.length;i<r;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,r=e.length;i<r;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(a=>({...a})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(t),r.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];s(t.shapes,h)}else s(t.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(t.materials,this.material[l]));r.material=a}else r.material=s(t.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),u=o(t.images),h=o(t.shapes),p=o(t.skeletons),d=o(t.animations),g=o(t.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),h.length>0&&(i.shapes=h),p.length>0&&(i.skeletons=p),d.length>0&&(i.animations=d),g.length>0&&(i.nodes=g)}return i.object=r,i;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const r=t.children[i];this.add(r.clone())}return this}}_e.DEFAULT_UP=new P(0,1,0);_e.DEFAULT_MATRIX_AUTO_UPDATE=!0;_e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Ge=new P,ln=new P,rs=new P,cn=new P,ii=new P,ri=new P,va=new P,ss=new P,os=new P,as=new P,ls=new Jt,cs=new Jt,us=new Jt;class Ve{constructor(t=new P,e=new P,i=new P){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,r){r.subVectors(i,e),Ge.subVectors(t,e),r.cross(Ge);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(t,e,i,r,s){Ge.subVectors(r,e),ln.subVectors(i,e),rs.subVectors(t,e);const o=Ge.dot(Ge),a=Ge.dot(ln),l=Ge.dot(rs),c=ln.dot(ln),u=ln.dot(rs),h=o*c-a*a;if(h===0)return s.set(0,0,0),null;const p=1/h,d=(c*l-a*u)*p,g=(o*u-a*l)*p;return s.set(1-d-g,g,d)}static containsPoint(t,e,i,r){return this.getBarycoord(t,e,i,r,cn)===null?!1:cn.x>=0&&cn.y>=0&&cn.x+cn.y<=1}static getInterpolation(t,e,i,r,s,o,a,l){return this.getBarycoord(t,e,i,r,cn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,cn.x),l.addScaledVector(o,cn.y),l.addScaledVector(a,cn.z),l)}static getInterpolatedAttribute(t,e,i,r,s,o){return ls.setScalar(0),cs.setScalar(0),us.setScalar(0),ls.fromBufferAttribute(t,e),cs.fromBufferAttribute(t,i),us.fromBufferAttribute(t,r),o.setScalar(0),o.addScaledVector(ls,s.x),o.addScaledVector(cs,s.y),o.addScaledVector(us,s.z),o}static isFrontFacing(t,e,i,r){return Ge.subVectors(i,e),ln.subVectors(t,e),Ge.cross(ln).dot(r)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,r){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[r]),this}setFromAttributeAndIndices(t,e,i,r){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,r),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Ge.subVectors(this.c,this.b),ln.subVectors(this.a,this.b),Ge.cross(ln).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Ve.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Ve.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,r,s){return Ve.getInterpolation(t,this.a,this.b,this.c,e,i,r,s)}containsPoint(t){return Ve.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Ve.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,r=this.b,s=this.c;let o,a;ii.subVectors(r,i),ri.subVectors(s,i),ss.subVectors(t,i);const l=ii.dot(ss),c=ri.dot(ss);if(l<=0&&c<=0)return e.copy(i);os.subVectors(t,r);const u=ii.dot(os),h=ri.dot(os);if(u>=0&&h<=u)return e.copy(r);const p=l*h-u*c;if(p<=0&&l>=0&&u<=0)return o=l/(l-u),e.copy(i).addScaledVector(ii,o);as.subVectors(t,s);const d=ii.dot(as),g=ri.dot(as);if(g>=0&&d<=g)return e.copy(s);const v=d*c-l*g;if(v<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(i).addScaledVector(ri,a);const m=u*g-d*h;if(m<=0&&h-u>=0&&d-g>=0)return va.subVectors(s,r),a=(h-u)/(h-u+(d-g)),e.copy(r).addScaledVector(va,a);const f=1/(m+v+p);return o=v*f,a=p*f,e.copy(i).addScaledVector(ii,o).addScaledVector(ri,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Al={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Mn={h:0,s:0,l:0},ar={h:0,s:0,l:0};function hs(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class Gt{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const r=t;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ee){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Xt.colorSpaceToWorking(this,e),this}setRGB(t,e,i,r=Xt.workingColorSpace){return this.r=t,this.g=e,this.b=i,Xt.colorSpaceToWorking(this,r),this}setHSL(t,e,i,r=Xt.workingColorSpace){if(t=qc(t,1),e=Bt(e,0,1),i=Bt(i,0,1),e===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+e):i+e-i*e,o=2*i-s;this.r=hs(o,s,t+1/3),this.g=hs(o,s,t),this.b=hs(o,s,t-1/3)}return Xt.colorSpaceToWorking(this,r),this}setStyle(t,e=Ee){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(s,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ee){const i=Al[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=pn(t.r),this.g=pn(t.g),this.b=pn(t.b),this}copyLinearToSRGB(t){return this.r=di(t.r),this.g=di(t.g),this.b=di(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ee){return Xt.workingToColorSpace(Me.copy(this),t),Math.round(Bt(Me.r*255,0,255))*65536+Math.round(Bt(Me.g*255,0,255))*256+Math.round(Bt(Me.b*255,0,255))}getHexString(t=Ee){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Xt.workingColorSpace){Xt.workingToColorSpace(Me.copy(this),e);const i=Me.r,r=Me.g,s=Me.b,o=Math.max(i,r,s),a=Math.min(i,r,s);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const h=o-a;switch(c=u<=.5?h/(o+a):h/(2-o-a),o){case i:l=(r-s)/h+(r<s?6:0);break;case r:l=(s-i)/h+2;break;case s:l=(i-r)/h+4;break}l/=6}return t.h=l,t.s=c,t.l=u,t}getRGB(t,e=Xt.workingColorSpace){return Xt.workingToColorSpace(Me.copy(this),e),t.r=Me.r,t.g=Me.g,t.b=Me.b,t}getStyle(t=Ee){Xt.workingToColorSpace(Me.copy(this),t);const e=Me.r,i=Me.g,r=Me.b;return t!==Ee?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(t,e,i){return this.getHSL(Mn),this.setHSL(Mn.h+t,Mn.s+e,Mn.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(Mn),t.getHSL(ar);const i=Yr(Mn.h,ar.h,e),r=Yr(Mn.s,ar.s,e),s=Yr(Mn.l,ar.l,e);return this.setHSL(i,r,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,r=this.b,s=t.elements;return this.r=s[0]*e+s[3]*i+s[6]*r,this.g=s[1]*e+s[4]*i+s[7]*r,this.b=s[2]*e+s[5]*i+s[8]*r,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Me=new Gt;Gt.NAMES=Al;let cu=0;class Ki extends Si{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:cu++}),this.uuid=yi(),this.name="",this.type="Material",this.blending=fi,this.side=wn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Cs,this.blendDst=Ps,this.blendEquation=kn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Gt(0,0,0),this.blendAlpha=0,this.depthFunc=mi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ra,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Kn,this.stencilZFail=Kn,this.stencilZPass=Kn,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const r=this[e];if(r===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==fi&&(i.blending=this.blending),this.side!==wn&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Cs&&(i.blendSrc=this.blendSrc),this.blendDst!==Ps&&(i.blendDst=this.blendDst),this.blendEquation!==kn&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==mi&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ra&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Kn&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Kn&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Kn&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(e){const s=r(t.textures),o=r(t.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const r=e.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=e[s].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class wl extends Ki{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Gt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ke,this.combine=cl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const he=new P,lr=new ct;let uu=0;class ze{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:uu++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=sa,this.updateRanges=[],this.gpuType=dn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[t+r]=e.array[i+r];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)lr.fromBufferAttribute(this,e),lr.applyMatrix3(t),this.setXY(e,lr.x,lr.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)he.fromBufferAttribute(this,e),he.applyMatrix3(t),this.setXYZ(e,he.x,he.y,he.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)he.fromBufferAttribute(this,e),he.applyMatrix4(t),this.setXYZ(e,he.x,he.y,he.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)he.fromBufferAttribute(this,e),he.applyNormalMatrix(t),this.setXYZ(e,he.x,he.y,he.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)he.fromBufferAttribute(this,e),he.transformDirection(t),this.setXYZ(e,he.x,he.y,he.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=wi(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=we(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=wi(e,this.array)),e}setX(t,e){return this.normalized&&(e=we(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=wi(e,this.array)),e}setY(t,e){return this.normalized&&(e=we(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=wi(e,this.array)),e}setZ(t,e){return this.normalized&&(e=we(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=wi(e,this.array)),e}setW(t,e){return this.normalized&&(e=we(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=we(e,this.array),i=we(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,r){return t*=this.itemSize,this.normalized&&(e=we(e,this.array),i=we(i,this.array),r=we(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=r,this}setXYZW(t,e,i,r,s){return t*=this.itemSize,this.normalized&&(e=we(e,this.array),i=we(i,this.array),r=we(r,this.array),s=we(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=r,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==sa&&(t.usage=this.usage),t}}class bl extends ze{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class Rl extends ze{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class Vt extends ze{constructor(t,e,i){super(new Float32Array(t),e,i)}}let hu=0;const Oe=new se,fs=new _e,si=new P,De=new Zi,Pi=new Zi,me=new P;class ge extends Si{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:hu++}),this.uuid=yi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(yl(t)?Rl:bl)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Nt().getNormalMatrix(t);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(t),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Oe.makeRotationFromQuaternion(t),this.applyMatrix4(Oe),this}rotateX(t){return Oe.makeRotationX(t),this.applyMatrix4(Oe),this}rotateY(t){return Oe.makeRotationY(t),this.applyMatrix4(Oe),this}rotateZ(t){return Oe.makeRotationZ(t),this.applyMatrix4(Oe),this}translate(t,e,i){return Oe.makeTranslation(t,e,i),this.applyMatrix4(Oe),this}scale(t,e,i){return Oe.makeScale(t,e,i),this.applyMatrix4(Oe),this}lookAt(t){return fs.lookAt(t),fs.updateMatrix(),this.applyMatrix4(fs.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(si).negate(),this.translate(si.x,si.y,si.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const i=[];for(let r=0,s=t.length;r<s;r++){const o=t[r];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Vt(i,3))}else{const i=Math.min(t.length,e.count);for(let r=0;r<i;r++){const s=t[r];e.setXYZ(r,s.x,s.y,s.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Zi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,r=e.length;i<r;i++){const s=e[i];De.setFromBufferAttribute(s),this.morphTargetsRelative?(me.addVectors(this.boundingBox.min,De.min),this.boundingBox.expandByPoint(me),me.addVectors(this.boundingBox.max,De.max),this.boundingBox.expandByPoint(me)):(this.boundingBox.expandByPoint(De.min),this.boundingBox.expandByPoint(De.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Io);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(t){const i=this.boundingSphere.center;if(De.setFromBufferAttribute(t),e)for(let s=0,o=e.length;s<o;s++){const a=e[s];Pi.setFromBufferAttribute(a),this.morphTargetsRelative?(me.addVectors(De.min,Pi.min),De.expandByPoint(me),me.addVectors(De.max,Pi.max),De.expandByPoint(me)):(De.expandByPoint(Pi.min),De.expandByPoint(Pi.max))}De.getCenter(i);let r=0;for(let s=0,o=t.count;s<o;s++)me.fromBufferAttribute(t,s),r=Math.max(r,i.distanceToSquared(me));if(e)for(let s=0,o=e.length;s<o;s++){const a=e[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)me.fromBufferAttribute(a,c),l&&(si.fromBufferAttribute(t,c),me.add(si)),r=Math.max(r,i.distanceToSquared(me))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,r=e.normal,s=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ze(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let L=0;L<i.count;L++)a[L]=new P,l[L]=new P;const c=new P,u=new P,h=new P,p=new ct,d=new ct,g=new ct,v=new P,m=new P;function f(L,E,T){c.fromBufferAttribute(i,L),u.fromBufferAttribute(i,E),h.fromBufferAttribute(i,T),p.fromBufferAttribute(s,L),d.fromBufferAttribute(s,E),g.fromBufferAttribute(s,T),u.sub(c),h.sub(c),d.sub(p),g.sub(p);const D=1/(d.x*g.y-g.x*d.y);isFinite(D)&&(v.copy(u).multiplyScalar(g.y).addScaledVector(h,-d.y).multiplyScalar(D),m.copy(h).multiplyScalar(d.x).addScaledVector(u,-g.x).multiplyScalar(D),a[L].add(v),a[E].add(v),a[T].add(v),l[L].add(m),l[E].add(m),l[T].add(m))}let M=this.groups;M.length===0&&(M=[{start:0,count:t.count}]);for(let L=0,E=M.length;L<E;++L){const T=M[L],D=T.start,F=T.count;for(let k=D,q=D+F;k<q;k+=3)f(t.getX(k+0),t.getX(k+1),t.getX(k+2))}const S=new P,_=new P,b=new P,w=new P;function R(L){b.fromBufferAttribute(r,L),w.copy(b);const E=a[L];S.copy(E),S.sub(b.multiplyScalar(b.dot(E))).normalize(),_.crossVectors(w,E);const D=_.dot(l[L])<0?-1:1;o.setXYZW(L,S.x,S.y,S.z,D)}for(let L=0,E=M.length;L<E;++L){const T=M[L],D=T.start,F=T.count;for(let k=D,q=D+F;k<q;k+=3)R(t.getX(k+0)),R(t.getX(k+1)),R(t.getX(k+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new ze(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let p=0,d=i.count;p<d;p++)i.setXYZ(p,0,0,0);const r=new P,s=new P,o=new P,a=new P,l=new P,c=new P,u=new P,h=new P;if(t)for(let p=0,d=t.count;p<d;p+=3){const g=t.getX(p+0),v=t.getX(p+1),m=t.getX(p+2);r.fromBufferAttribute(e,g),s.fromBufferAttribute(e,v),o.fromBufferAttribute(e,m),u.subVectors(o,s),h.subVectors(r,s),u.cross(h),a.fromBufferAttribute(i,g),l.fromBufferAttribute(i,v),c.fromBufferAttribute(i,m),a.add(u),l.add(u),c.add(u),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(v,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let p=0,d=e.count;p<d;p+=3)r.fromBufferAttribute(e,p+0),s.fromBufferAttribute(e,p+1),o.fromBufferAttribute(e,p+2),u.subVectors(o,s),h.subVectors(r,s),u.cross(h),i.setXYZ(p+0,u.x,u.y,u.z),i.setXYZ(p+1,u.x,u.y,u.z),i.setXYZ(p+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)me.fromBufferAttribute(t,e),me.normalize(),t.setXYZ(e,me.x,me.y,me.z)}toNonIndexed(){function t(a,l){const c=a.array,u=a.itemSize,h=a.normalized,p=new c.constructor(l.length*u);let d=0,g=0;for(let v=0,m=l.length;v<m;v++){a.isInterleavedBufferAttribute?d=l[v]*a.data.stride+a.offset:d=l[v]*u;for(let f=0;f<u;f++)p[g++]=c[d++]}return new ze(p,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new ge,i=this.index.array,r=this.attributes;for(const a in r){const l=r[a],c=t(l,i);e.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let u=0,h=c.length;u<h;u++){const p=c[u],d=t(p,i);l.push(d)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const l in i){const c=i[l];t.data.attributes[l]=c.toJSON(t.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,p=c.length;h<p;h++){const d=c[h];u.push(d.toJSON(t.data))}u.length>0&&(r[l]=u,s=!0)}s&&(t.data.morphAttributes=r,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone());const r=t.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(e))}const s=t.morphAttributes;for(const c in s){const u=[],h=s[c];for(let p=0,d=h.length;p<d;p++)u.push(h[p].clone(e));this.morphAttributes[c]=u}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,u=o.length;c<u;c++){const h=o[c];this.addGroup(h.start,h.count,h.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const xa=new se,Un=new nu,cr=new Io,Ma=new P,ur=new P,hr=new P,fr=new P,ds=new P,dr=new P,Sa=new P,pr=new P;class Xe extends _e{constructor(t=new ge,e=new wl){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const r=e[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(t,e){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;e.fromBufferAttribute(r,t);const a=this.morphTargetInfluences;if(s&&a){dr.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=a[l],h=s[l];u!==0&&(ds.fromBufferAttribute(h,t),o?dr.addScaledVector(ds,u):dr.addScaledVector(ds.sub(e),u))}e.add(dr)}return e}raycast(t,e){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),cr.copy(i.boundingSphere),cr.applyMatrix4(s),Un.copy(t.ray).recast(t.near),!(cr.containsPoint(Un.origin)===!1&&(Un.intersectSphere(cr,Ma)===null||Un.origin.distanceToSquared(Ma)>(t.far-t.near)**2))&&(xa.copy(s).invert(),Un.copy(t.ray).applyMatrix4(xa),!(i.boundingBox!==null&&Un.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,Un)))}_computeIntersections(t,e,i){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,h=s.attributes.normal,p=s.groups,d=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,v=p.length;g<v;g++){const m=p[g],f=o[m.materialIndex],M=Math.max(m.start,d.start),S=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let _=M,b=S;_<b;_+=3){const w=a.getX(_),R=a.getX(_+1),L=a.getX(_+2);r=mr(this,f,t,i,c,u,h,w,R,L),r&&(r.faceIndex=Math.floor(_/3),r.face.materialIndex=m.materialIndex,e.push(r))}}else{const g=Math.max(0,d.start),v=Math.min(a.count,d.start+d.count);for(let m=g,f=v;m<f;m+=3){const M=a.getX(m),S=a.getX(m+1),_=a.getX(m+2);r=mr(this,o,t,i,c,u,h,M,S,_),r&&(r.faceIndex=Math.floor(m/3),e.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,v=p.length;g<v;g++){const m=p[g],f=o[m.materialIndex],M=Math.max(m.start,d.start),S=Math.min(l.count,Math.min(m.start+m.count,d.start+d.count));for(let _=M,b=S;_<b;_+=3){const w=_,R=_+1,L=_+2;r=mr(this,f,t,i,c,u,h,w,R,L),r&&(r.faceIndex=Math.floor(_/3),r.face.materialIndex=m.materialIndex,e.push(r))}}else{const g=Math.max(0,d.start),v=Math.min(l.count,d.start+d.count);for(let m=g,f=v;m<f;m+=3){const M=m,S=m+1,_=m+2;r=mr(this,o,t,i,c,u,h,M,S,_),r&&(r.faceIndex=Math.floor(m/3),e.push(r))}}}}function fu(n,t,e,i,r,s,o,a){let l;if(t.side===Re?l=i.intersectTriangle(o,s,r,!0,a):l=i.intersectTriangle(r,s,o,t.side===wn,a),l===null)return null;pr.copy(a),pr.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(pr);return c<e.near||c>e.far?null:{distance:c,point:pr.clone(),object:n}}function mr(n,t,e,i,r,s,o,a,l,c){n.getVertexPosition(a,ur),n.getVertexPosition(l,hr),n.getVertexPosition(c,fr);const u=fu(n,t,e,i,ur,hr,fr,Sa);if(u){const h=new P;Ve.getBarycoord(Sa,ur,hr,fr,h),r&&(u.uv=Ve.getInterpolatedAttribute(r,a,l,c,h,new ct)),s&&(u.uv1=Ve.getInterpolatedAttribute(s,a,l,c,h,new ct)),o&&(u.normal=Ve.getInterpolatedAttribute(o,a,l,c,h,new P),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const p={a,b:l,c,normal:new P,materialIndex:0};Ve.getNormal(ur,hr,fr,p.normal),u.face=p,u.barycoord=h}return u}class bn extends ge{constructor(t=1,e=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],u=[],h=[];let p=0,d=0;g("z","y","x",-1,-1,i,e,t,o,s,0),g("z","y","x",1,-1,i,e,-t,o,s,1),g("x","z","y",1,1,t,i,e,r,o,2),g("x","z","y",1,-1,t,i,-e,r,o,3),g("x","y","z",1,-1,t,e,i,r,s,4),g("x","y","z",-1,-1,t,e,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new Vt(c,3)),this.setAttribute("normal",new Vt(u,3)),this.setAttribute("uv",new Vt(h,2));function g(v,m,f,M,S,_,b,w,R,L,E){const T=_/R,D=b/L,F=_/2,k=b/2,q=w/2,W=R+1,X=L+1;let J=0,H=0;const st=new P;for(let ht=0;ht<X;ht++){const Tt=ht*D-k;for(let zt=0;zt<W;zt++){const jt=zt*T-F;st[v]=jt*M,st[m]=Tt*S,st[f]=q,c.push(st.x,st.y,st.z),st[v]=0,st[m]=0,st[f]=w>0?1:-1,u.push(st.x,st.y,st.z),h.push(zt/R),h.push(1-ht/L),J+=1}}for(let ht=0;ht<L;ht++)for(let Tt=0;Tt<R;Tt++){const zt=p+Tt+W*ht,jt=p+Tt+W*(ht+1),ne=p+(Tt+1)+W*(ht+1),qt=p+(Tt+1)+W*ht;l.push(zt,jt,qt),l.push(jt,ne,qt),H+=6}a.addGroup(d,H,E),d+=H,p+=J}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new bn(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function xi(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const r=n[e][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=r.clone():Array.isArray(r)?t[e][i]=r.slice():t[e][i]=r}}return t}function ye(n){const t={};for(let e=0;e<n.length;e++){const i=xi(n[e]);for(const r in i)t[r]=i[r]}return t}function du(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function Cl(n){const t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Xt.workingColorSpace}const pu={clone:xi,merge:ye};var mu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,gu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Rn extends Ki{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=mu,this.fragmentShader=gu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=xi(t.uniforms),this.uniformsGroups=du(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?e.uniforms[r]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[r]={type:"m4",value:o.toArray()}:e.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class Pl extends _e{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new se,this.projectionMatrix=new se,this.projectionMatrixInverse=new se,this.coordinateSystem=tn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Sn=new P,ya=new ct,Ea=new ct;class Ue extends Pl{constructor(t=50,e=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=go*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(qr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return go*2*Math.atan(Math.tan(qr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){Sn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Sn.x,Sn.y).multiplyScalar(-t/Sn.z),Sn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Sn.x,Sn.y).multiplyScalar(-t/Sn.z)}getViewSize(t,e){return this.getViewBounds(t,ya,Ea),e.subVectors(Ea,ya)}setViewOffset(t,e,i,r,s,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(qr*.5*this.fov)/this.zoom,i=2*e,r=this.aspect*i,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,e-=o.offsetY*i/c,r*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(s+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,e,e-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const oi=-90,ai=1;class _u extends _e{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Ue(oi,ai,t,e);r.layers=this.layers,this.add(r);const s=new Ue(oi,ai,t,e);s.layers=this.layers,this.add(s);const o=new Ue(oi,ai,t,e);o.layers=this.layers,this.add(o);const a=new Ue(oi,ai,t,e);a.layers=this.layers,this.add(a);const l=new Ue(oi,ai,t,e);l.layers=this.layers,this.add(l);const c=new Ue(oi,ai,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,r,s,o,a,l]=e;for(const c of e)this.remove(c);if(t===tn)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Ir)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,u]=this.children,h=t.getRenderTarget(),p=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,r),t.render(e,s),t.setRenderTarget(i,1,r),t.render(e,o),t.setRenderTarget(i,2,r),t.render(e,a),t.setRenderTarget(i,3,r),t.render(e,l),t.setRenderTarget(i,4,r),t.render(e,c),i.texture.generateMipmaps=v,t.setRenderTarget(i,5,r),t.render(e,u),t.setRenderTarget(h,p,d),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class Ll extends Te{constructor(t=[],e=gi,i,r,s,o,a,l,c,u){super(t,e,i,r,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class vu extends Xn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},r=[i,i,i,i,i,i];this.texture=new Ll(r),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new bn(5,5,5),s=new Rn({name:"CubemapFromEquirect",uniforms:xi(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Re,blending:yn});s.uniforms.tEquirect.value=e;const o=new Xe(r,s),a=e.minFilter;return e.minFilter===Gn&&(e.minFilter=Qe),new _u(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,i=!0,r=!0){const s=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,i,r);t.setRenderTarget(s)}}class gr extends _e{constructor(){super(),this.isGroup=!0,this.type="Group"}}const xu={type:"move"};class ps{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new gr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new gr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new gr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const v of t.hand.values()){const m=e.getJointPose(v,i),f=this._getHandJoint(c,v);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],p=u.position.distanceTo(h.position),d=.02,g=.005;c.inputState.pinching&&p>d+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&p<=d-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=e.getPose(t.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(xu)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new gr;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}class No{constructor(t,e=1,i=1e3){this.isFog=!0,this.name="",this.color=new Gt(t),this.near=e,this.far=i}clone(){return new No(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Mu extends _e{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ke,this.environmentIntensity=1,this.environmentRotation=new Ke,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}const ms=new P,Su=new P,yu=new Nt;class Bn{constructor(t=new P(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,r){return this.normal.set(t,e,i),this.constant=r,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const r=ms.subVectors(i,e).cross(Su.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(r,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const i=t.delta(ms),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:e.copy(t.start).addScaledVector(i,s)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||yu.getNormalMatrix(t),r=this.coplanarPoint(ms).applyMatrix4(t),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const In=new Io,Eu=new ct(.5,.5),_r=new P;class Fo{constructor(t=new Bn,e=new Bn,i=new Bn,r=new Bn,s=new Bn,o=new Bn){this.planes=[t,e,i,r,s,o]}set(t,e,i,r,s,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=tn,i=!1){const r=this.planes,s=t.elements,o=s[0],a=s[1],l=s[2],c=s[3],u=s[4],h=s[5],p=s[6],d=s[7],g=s[8],v=s[9],m=s[10],f=s[11],M=s[12],S=s[13],_=s[14],b=s[15];if(r[0].setComponents(c-o,d-u,f-g,b-M).normalize(),r[1].setComponents(c+o,d+u,f+g,b+M).normalize(),r[2].setComponents(c+a,d+h,f+v,b+S).normalize(),r[3].setComponents(c-a,d-h,f-v,b-S).normalize(),i)r[4].setComponents(l,p,m,_).normalize(),r[5].setComponents(c-l,d-p,f-m,b-_).normalize();else if(r[4].setComponents(c-l,d-p,f-m,b-_).normalize(),e===tn)r[5].setComponents(c+l,d+p,f+m,b+_).normalize();else if(e===Ir)r[5].setComponents(l,p,m,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),In.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),In.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(In)}intersectsSprite(t){In.center.set(0,0,0);const e=Eu.distanceTo(t.center);return In.radius=.7071067811865476+e,In.applyMatrix4(t.matrixWorld),this.intersectsSphere(In)}intersectsSphere(t){const e=this.planes,i=t.center,r=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const r=e[i];if(_r.x=r.normal.x>0?t.max.x:t.min.x,_r.y=r.normal.y>0?t.max.y:t.min.y,_r.z=r.normal.z>0?t.max.z:t.min.z,r.distanceToPoint(_r)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Dl extends Te{constructor(t,e,i,r,s,o,a,l,c){super(t,e,i,r,s,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Ul extends Te{constructor(t,e,i=Wn,r,s,o,a=qe,l=qe,c,u=ki,h=1){if(u!==ki&&u!==Hi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const p={width:t,height:e,depth:h};super(p,r,s,o,a,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Uo(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class Il extends Te{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class Fr extends ge{constructor(t=1,e=32,i=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:i,thetaLength:r},e=Math.max(3,e);const s=[],o=[],a=[],l=[],c=new P,u=new ct;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let h=0,p=3;h<=e;h++,p+=3){const d=i+h/e*r;c.x=t*Math.cos(d),c.y=t*Math.sin(d),o.push(c.x,c.y,c.z),a.push(0,0,1),u.x=(o[p]/t+1)/2,u.y=(o[p+1]/t+1)/2,l.push(u.x,u.y)}for(let h=1;h<=e;h++)s.push(h,h+1,0);this.setIndex(s),this.setAttribute("position",new Vt(o,3)),this.setAttribute("normal",new Vt(a,3)),this.setAttribute("uv",new Vt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Fr(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Or extends ge{constructor(t=1,e=1,i=1,r=32,s=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const u=[],h=[],p=[],d=[];let g=0;const v=[],m=i/2;let f=0;M(),o===!1&&(t>0&&S(!0),e>0&&S(!1)),this.setIndex(u),this.setAttribute("position",new Vt(h,3)),this.setAttribute("normal",new Vt(p,3)),this.setAttribute("uv",new Vt(d,2));function M(){const _=new P,b=new P;let w=0;const R=(e-t)/i;for(let L=0;L<=s;L++){const E=[],T=L/s,D=T*(e-t)+t;for(let F=0;F<=r;F++){const k=F/r,q=k*l+a,W=Math.sin(q),X=Math.cos(q);b.x=D*W,b.y=-T*i+m,b.z=D*X,h.push(b.x,b.y,b.z),_.set(W,R,X).normalize(),p.push(_.x,_.y,_.z),d.push(k,1-T),E.push(g++)}v.push(E)}for(let L=0;L<r;L++)for(let E=0;E<s;E++){const T=v[E][L],D=v[E+1][L],F=v[E+1][L+1],k=v[E][L+1];(t>0||E!==0)&&(u.push(T,D,k),w+=3),(e>0||E!==s-1)&&(u.push(D,F,k),w+=3)}c.addGroup(f,w,0),f+=w}function S(_){const b=g,w=new ct,R=new P;let L=0;const E=_===!0?t:e,T=_===!0?1:-1;for(let F=1;F<=r;F++)h.push(0,m*T,0),p.push(0,T,0),d.push(.5,.5),g++;const D=g;for(let F=0;F<=r;F++){const q=F/r*l+a,W=Math.cos(q),X=Math.sin(q);R.x=E*X,R.y=m*T,R.z=E*W,h.push(R.x,R.y,R.z),p.push(0,T,0),w.x=W*.5+.5,w.y=X*.5*T+.5,d.push(w.x,w.y),g++}for(let F=0;F<r;F++){const k=b+F,q=D+F;_===!0?u.push(q,q+1,k):u.push(q+1,q,k),L+=3}c.addGroup(f,L,_===!0?1:2),f+=L}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Or(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Oo extends ge{constructor(t=[],e=[],i=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:i,detail:r};const s=[],o=[];a(r),c(i),u(),this.setAttribute("position",new Vt(s,3)),this.setAttribute("normal",new Vt(s.slice(),3)),this.setAttribute("uv",new Vt(o,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function a(M){const S=new P,_=new P,b=new P;for(let w=0;w<e.length;w+=3)d(e[w+0],S),d(e[w+1],_),d(e[w+2],b),l(S,_,b,M)}function l(M,S,_,b){const w=b+1,R=[];for(let L=0;L<=w;L++){R[L]=[];const E=M.clone().lerp(_,L/w),T=S.clone().lerp(_,L/w),D=w-L;for(let F=0;F<=D;F++)F===0&&L===w?R[L][F]=E:R[L][F]=E.clone().lerp(T,F/D)}for(let L=0;L<w;L++)for(let E=0;E<2*(w-L)-1;E++){const T=Math.floor(E/2);E%2===0?(p(R[L][T+1]),p(R[L+1][T]),p(R[L][T])):(p(R[L][T+1]),p(R[L+1][T+1]),p(R[L+1][T]))}}function c(M){const S=new P;for(let _=0;_<s.length;_+=3)S.x=s[_+0],S.y=s[_+1],S.z=s[_+2],S.normalize().multiplyScalar(M),s[_+0]=S.x,s[_+1]=S.y,s[_+2]=S.z}function u(){const M=new P;for(let S=0;S<s.length;S+=3){M.x=s[S+0],M.y=s[S+1],M.z=s[S+2];const _=m(M)/2/Math.PI+.5,b=f(M)/Math.PI+.5;o.push(_,1-b)}g(),h()}function h(){for(let M=0;M<o.length;M+=6){const S=o[M+0],_=o[M+2],b=o[M+4],w=Math.max(S,_,b),R=Math.min(S,_,b);w>.9&&R<.1&&(S<.2&&(o[M+0]+=1),_<.2&&(o[M+2]+=1),b<.2&&(o[M+4]+=1))}}function p(M){s.push(M.x,M.y,M.z)}function d(M,S){const _=M*3;S.x=t[_+0],S.y=t[_+1],S.z=t[_+2]}function g(){const M=new P,S=new P,_=new P,b=new P,w=new ct,R=new ct,L=new ct;for(let E=0,T=0;E<s.length;E+=9,T+=6){M.set(s[E+0],s[E+1],s[E+2]),S.set(s[E+3],s[E+4],s[E+5]),_.set(s[E+6],s[E+7],s[E+8]),w.set(o[T+0],o[T+1]),R.set(o[T+2],o[T+3]),L.set(o[T+4],o[T+5]),b.copy(M).add(S).add(_).divideScalar(3);const D=m(b);v(w,T+0,M,D),v(R,T+2,S,D),v(L,T+4,_,D)}}function v(M,S,_,b){b<0&&M.x===1&&(o[S]=M.x-1),_.x===0&&_.z===0&&(o[S]=b/2/Math.PI+.5)}function m(M){return Math.atan2(M.z,-M.x)}function f(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Oo(t.vertices,t.indices,t.radius,t.details)}}class nn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(t,e){const i=this.getUtoTmapping(t);return this.getPoint(i,e)}getPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return e}getSpacedPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPointAt(i/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let i,r=this.getPoint(0),s=0;e.push(0);for(let o=1;o<=t;o++)i=this.getPoint(o/t),s+=i.distanceTo(r),e.push(s),r=i;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){const i=this.getLengths();let r=0;const s=i.length;let o;e?o=e:o=t*i[s-1];let a=0,l=s-1,c;for(;a<=l;)if(r=Math.floor(a+(l-a)/2),c=i[r]-o,c<0)a=r+1;else if(c>0)l=r-1;else{l=r;break}if(r=l,i[r]===o)return r/(s-1);const u=i[r],p=i[r+1]-u,d=(o-u)/p;return(r+d)/(s-1)}getTangent(t,e){let r=t-1e-4,s=t+1e-4;r<0&&(r=0),s>1&&(s=1);const o=this.getPoint(r),a=this.getPoint(s),l=e||(o.isVector2?new ct:new P);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){const i=this.getUtoTmapping(t);return this.getTangent(i,e)}computeFrenetFrames(t,e=!1){const i=new P,r=[],s=[],o=[],a=new P,l=new se;for(let d=0;d<=t;d++){const g=d/t;r[d]=this.getTangentAt(g,new P)}s[0]=new P,o[0]=new P;let c=Number.MAX_VALUE;const u=Math.abs(r[0].x),h=Math.abs(r[0].y),p=Math.abs(r[0].z);u<=c&&(c=u,i.set(1,0,0)),h<=c&&(c=h,i.set(0,1,0)),p<=c&&i.set(0,0,1),a.crossVectors(r[0],i).normalize(),s[0].crossVectors(r[0],a),o[0].crossVectors(r[0],s[0]);for(let d=1;d<=t;d++){if(s[d]=s[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(r[d-1],r[d]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(Bt(r[d-1].dot(r[d]),-1,1));s[d].applyMatrix4(l.makeRotationAxis(a,g))}o[d].crossVectors(r[d],s[d])}if(e===!0){let d=Math.acos(Bt(s[0].dot(s[t]),-1,1));d/=t,r[0].dot(a.crossVectors(s[0],s[t]))>0&&(d=-d);for(let g=1;g<=t;g++)s[g].applyMatrix4(l.makeRotationAxis(r[g],d*g)),o[g].crossVectors(r[g],s[g])}return{tangents:r,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Bo extends nn{constructor(t=0,e=0,i=1,r=1,s=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=i,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(t,e=new ct){const i=e,r=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(o?s=0:s=r),this.aClockwise===!0&&!o&&(s===r?s=-r:s=s-r);const a=this.aStartAngle+t*s;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),p=l-this.aX,d=c-this.aY;l=p*u-d*h+this.aX,c=p*h+d*u+this.aY}return i.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Tu extends Bo{constructor(t,e,i,r,s,o){super(t,e,i,i,r,s,o),this.isArcCurve=!0,this.type="ArcCurve"}}function zo(){let n=0,t=0,e=0,i=0;function r(s,o,a,l){n=s,t=a,e=-3*s+3*o-2*a-l,i=2*s-2*o+a+l}return{initCatmullRom:function(s,o,a,l,c){r(o,a,c*(a-s),c*(l-o))},initNonuniformCatmullRom:function(s,o,a,l,c,u,h){let p=(o-s)/c-(a-s)/(c+u)+(a-o)/u,d=(a-o)/u-(l-o)/(u+h)+(l-a)/h;p*=u,d*=u,r(o,a,p,d)},calc:function(s){const o=s*s,a=o*s;return n+t*s+e*o+i*a}}}const vr=new P,gs=new zo,_s=new zo,vs=new zo;class Nl extends nn{constructor(t=[],e=!1,i="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=i,this.tension=r}getPoint(t,e=new P){const i=e,r=this.points,s=r.length,o=(s-(this.closed?0:1))*t;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:l===0&&a===s-1&&(a=s-2,l=1);let c,u;this.closed||a>0?c=r[(a-1)%s]:(vr.subVectors(r[0],r[1]).add(r[0]),c=vr);const h=r[a%s],p=r[(a+1)%s];if(this.closed||a+2<s?u=r[(a+2)%s]:(vr.subVectors(r[s-1],r[s-2]).add(r[s-1]),u=vr),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(h),d),v=Math.pow(h.distanceToSquared(p),d),m=Math.pow(p.distanceToSquared(u),d);v<1e-4&&(v=1),g<1e-4&&(g=v),m<1e-4&&(m=v),gs.initNonuniformCatmullRom(c.x,h.x,p.x,u.x,g,v,m),_s.initNonuniformCatmullRom(c.y,h.y,p.y,u.y,g,v,m),vs.initNonuniformCatmullRom(c.z,h.z,p.z,u.z,g,v,m)}else this.curveType==="catmullrom"&&(gs.initCatmullRom(c.x,h.x,p.x,u.x,this.tension),_s.initCatmullRom(c.y,h.y,p.y,u.y,this.tension),vs.initCatmullRom(c.z,h.z,p.z,u.z,this.tension));return i.set(gs.calc(l),_s.calc(l),vs.calc(l)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const r=t.points[e];this.points.push(r.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){const r=this.points[e];t.points.push(r.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const r=t.points[e];this.points.push(new P().fromArray(r))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Ta(n,t,e,i,r){const s=(i-t)*.5,o=(r-e)*.5,a=n*n,l=n*a;return(2*e-2*i+s+o)*l+(-3*e+3*i-2*s-o)*a+s*n+e}function Au(n,t){const e=1-n;return e*e*t}function wu(n,t){return 2*(1-n)*n*t}function bu(n,t){return n*n*t}function Ni(n,t,e,i){return Au(n,t)+wu(n,e)+bu(n,i)}function Ru(n,t){const e=1-n;return e*e*e*t}function Cu(n,t){const e=1-n;return 3*e*e*n*t}function Pu(n,t){return 3*(1-n)*n*n*t}function Lu(n,t){return n*n*n*t}function Fi(n,t,e,i,r){return Ru(n,t)+Cu(n,e)+Pu(n,i)+Lu(n,r)}class Fl extends nn{constructor(t=new ct,e=new ct,i=new ct,r=new ct){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=i,this.v3=r}getPoint(t,e=new ct){const i=e,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return i.set(Fi(t,r.x,s.x,o.x,a.x),Fi(t,r.y,s.y,o.y,a.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Du extends nn{constructor(t=new P,e=new P,i=new P,r=new P){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=i,this.v3=r}getPoint(t,e=new P){const i=e,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return i.set(Fi(t,r.x,s.x,o.x,a.x),Fi(t,r.y,s.y,o.y,a.y),Fi(t,r.z,s.z,o.z,a.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Ol extends nn{constructor(t=new ct,e=new ct){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new ct){const i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new ct){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Uu extends nn{constructor(t=new P,e=new P){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new P){const i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new P){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Bl extends nn{constructor(t=new ct,e=new ct,i=new ct){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new ct){const i=e,r=this.v0,s=this.v1,o=this.v2;return i.set(Ni(t,r.x,s.x,o.x),Ni(t,r.y,s.y,o.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class zl extends nn{constructor(t=new P,e=new P,i=new P){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new P){const i=e,r=this.v0,s=this.v1,o=this.v2;return i.set(Ni(t,r.x,s.x,o.x),Ni(t,r.y,s.y,o.y),Ni(t,r.z,s.z,o.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class kl extends nn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new ct){const i=e,r=this.points,s=(r.length-1)*t,o=Math.floor(s),a=s-o,l=r[o===0?o:o-1],c=r[o],u=r[o>r.length-2?r.length-1:o+1],h=r[o>r.length-3?r.length-1:o+2];return i.set(Ta(a,l.x,c.x,u.x,h.x),Ta(a,l.y,c.y,u.y,h.y)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const r=t.points[e];this.points.push(r.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){const r=this.points[e];t.points.push(r.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const r=t.points[e];this.points.push(new ct().fromArray(r))}return this}}var _o=Object.freeze({__proto__:null,ArcCurve:Tu,CatmullRomCurve3:Nl,CubicBezierCurve:Fl,CubicBezierCurve3:Du,EllipseCurve:Bo,LineCurve:Ol,LineCurve3:Uu,QuadraticBezierCurve:Bl,QuadraticBezierCurve3:zl,SplineCurve:kl});class Iu extends nn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const i=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new _o[i](e,t))}return this}getPoint(t,e){const i=t*this.getLength(),r=this.getCurveLengths();let s=0;for(;s<r.length;){if(r[s]>=i){const o=r[s]-i,a=this.curves[s],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,e)}s++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let i=0,r=this.curves.length;i<r;i++)e+=this.curves[i].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let i;for(let r=0,s=this.curves;r<s.length;r++){const o=s[r],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,l=o.getPoints(a);for(let c=0;c<l.length;c++){const u=l[c];i&&i.equals(u)||(e.push(u),i=u)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){const r=t.curves[e];this.curves.push(r.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,i=this.curves.length;e<i;e++){const r=this.curves[e];t.curves.push(r.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){const r=t.curves[e];this.curves.push(new _o[r.type]().fromJSON(r))}return this}}class Aa extends Iu{constructor(t){super(),this.type="Path",this.currentPoint=new ct,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,i=t.length;e<i;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const i=new Ol(this.currentPoint.clone(),new ct(t,e));return this.curves.push(i),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,i,r){const s=new Bl(this.currentPoint.clone(),new ct(t,e),new ct(i,r));return this.curves.push(s),this.currentPoint.set(i,r),this}bezierCurveTo(t,e,i,r,s,o){const a=new Fl(this.currentPoint.clone(),new ct(t,e),new ct(i,r),new ct(s,o));return this.curves.push(a),this.currentPoint.set(s,o),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),i=new kl(e);return this.curves.push(i),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,i,r,s,o){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+a,e+l,i,r,s,o),this}absarc(t,e,i,r,s,o){return this.absellipse(t,e,i,i,r,s,o),this}ellipse(t,e,i,r,s,o,a,l){const c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(t+c,e+u,i,r,s,o,a,l),this}absellipse(t,e,i,r,s,o,a,l){const c=new Bo(t,e,i,r,s,o,a,l);if(this.curves.length>0){const h=c.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(c);const u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class kr extends Aa{constructor(t){super(t),this.uuid=yi(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let i=0,r=this.holes.length;i<r;i++)e[i]=this.holes[i].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){const r=t.holes[e];this.holes.push(r.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,i=this.holes.length;e<i;e++){const r=this.holes[e];t.holes.push(r.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){const r=t.holes[e];this.holes.push(new Aa().fromJSON(r))}return this}}function Nu(n,t,e=2){const i=t&&t.length,r=i?t[0]*e:n.length;let s=Hl(n,0,r,e,!0);const o=[];if(!s||s.next===s.prev)return o;let a,l,c;if(i&&(s=ku(n,t,s,e)),n.length>80*e){a=1/0,l=1/0;let u=-1/0,h=-1/0;for(let p=e;p<r;p+=e){const d=n[p],g=n[p+1];d<a&&(a=d),g<l&&(l=g),d>u&&(u=d),g>h&&(h=g)}c=Math.max(u-a,h-l),c=c!==0?32767/c:0}return Vi(s,o,e,a,l,c,0),o}function Hl(n,t,e,i,r){let s;if(r===$u(n,t,e,i)>0)for(let o=t;o<e;o+=i)s=wa(o/i|0,n[o],n[o+1],s);else for(let o=e-i;o>=t;o-=i)s=wa(o/i|0,n[o],n[o+1],s);return s&&Mi(s,s.next)&&(Xi(s),s=s.next),s}function qn(n,t){if(!n)return n;t||(t=n);let e=n,i;do if(i=!1,!e.steiner&&(Mi(e,e.next)||le(e.prev,e,e.next)===0)){if(Xi(e),e=t=e.prev,e===e.next)break;i=!0}else e=e.next;while(i||e!==t);return t}function Vi(n,t,e,i,r,s,o){if(!n)return;!o&&s&&Xu(n,i,r,s);let a=n;for(;n.prev!==n.next;){const l=n.prev,c=n.next;if(s?Ou(n,i,r,s):Fu(n)){t.push(l.i,n.i,c.i),Xi(n),n=c.next,a=c.next;continue}if(n=c,n===a){o?o===1?(n=Bu(qn(n),t),Vi(n,t,e,i,r,s,2)):o===2&&zu(n,t,e,i,r,s):Vi(qn(n),t,e,i,r,s,1);break}}}function Fu(n){const t=n.prev,e=n,i=n.next;if(le(t,e,i)>=0)return!1;const r=t.x,s=e.x,o=i.x,a=t.y,l=e.y,c=i.y,u=Math.min(r,s,o),h=Math.min(a,l,c),p=Math.max(r,s,o),d=Math.max(a,l,c);let g=i.next;for(;g!==t;){if(g.x>=u&&g.x<=p&&g.y>=h&&g.y<=d&&Ui(r,a,s,l,o,c,g.x,g.y)&&le(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function Ou(n,t,e,i){const r=n.prev,s=n,o=n.next;if(le(r,s,o)>=0)return!1;const a=r.x,l=s.x,c=o.x,u=r.y,h=s.y,p=o.y,d=Math.min(a,l,c),g=Math.min(u,h,p),v=Math.max(a,l,c),m=Math.max(u,h,p),f=vo(d,g,t,e,i),M=vo(v,m,t,e,i);let S=n.prevZ,_=n.nextZ;for(;S&&S.z>=f&&_&&_.z<=M;){if(S.x>=d&&S.x<=v&&S.y>=g&&S.y<=m&&S!==r&&S!==o&&Ui(a,u,l,h,c,p,S.x,S.y)&&le(S.prev,S,S.next)>=0||(S=S.prevZ,_.x>=d&&_.x<=v&&_.y>=g&&_.y<=m&&_!==r&&_!==o&&Ui(a,u,l,h,c,p,_.x,_.y)&&le(_.prev,_,_.next)>=0))return!1;_=_.nextZ}for(;S&&S.z>=f;){if(S.x>=d&&S.x<=v&&S.y>=g&&S.y<=m&&S!==r&&S!==o&&Ui(a,u,l,h,c,p,S.x,S.y)&&le(S.prev,S,S.next)>=0)return!1;S=S.prevZ}for(;_&&_.z<=M;){if(_.x>=d&&_.x<=v&&_.y>=g&&_.y<=m&&_!==r&&_!==o&&Ui(a,u,l,h,c,p,_.x,_.y)&&le(_.prev,_,_.next)>=0)return!1;_=_.nextZ}return!0}function Bu(n,t){let e=n;do{const i=e.prev,r=e.next.next;!Mi(i,r)&&Vl(i,e,e.next,r)&&Wi(i,r)&&Wi(r,i)&&(t.push(i.i,e.i,r.i),Xi(e),Xi(e.next),e=n=r),e=e.next}while(e!==n);return qn(e)}function zu(n,t,e,i,r,s){let o=n;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&Zu(o,a)){let l=Wl(o,a);o=qn(o,o.next),l=qn(l,l.next),Vi(o,t,e,i,r,s,0),Vi(l,t,e,i,r,s,0);return}a=a.next}o=o.next}while(o!==n)}function ku(n,t,e,i){const r=[];for(let s=0,o=t.length;s<o;s++){const a=t[s]*i,l=s<o-1?t[s+1]*i:n.length,c=Hl(n,a,l,i,!1);c===c.next&&(c.steiner=!0),r.push(Yu(c))}r.sort(Hu);for(let s=0;s<r.length;s++)e=Gu(r[s],e);return e}function Hu(n,t){let e=n.x-t.x;if(e===0&&(e=n.y-t.y,e===0)){const i=(n.next.y-n.y)/(n.next.x-n.x),r=(t.next.y-t.y)/(t.next.x-t.x);e=i-r}return e}function Gu(n,t){const e=Vu(n,t);if(!e)return t;const i=Wl(e,n);return qn(i,i.next),qn(e,e.next)}function Vu(n,t){let e=t;const i=n.x,r=n.y;let s=-1/0,o;if(Mi(n,e))return e;do{if(Mi(n,e.next))return e.next;if(r<=e.y&&r>=e.next.y&&e.next.y!==e.y){const h=e.x+(r-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(h<=i&&h>s&&(s=h,o=e.x<e.next.x?e:e.next,h===i))return o}e=e.next}while(e!==t);if(!o)return null;const a=o,l=o.x,c=o.y;let u=1/0;e=o;do{if(i>=e.x&&e.x>=l&&i!==e.x&&Gl(r<c?i:s,r,l,c,r<c?s:i,r,e.x,e.y)){const h=Math.abs(r-e.y)/(i-e.x);Wi(e,n)&&(h<u||h===u&&(e.x>o.x||e.x===o.x&&Wu(o,e)))&&(o=e,u=h)}e=e.next}while(e!==a);return o}function Wu(n,t){return le(n.prev,n,t.prev)<0&&le(t.next,n,n.next)<0}function Xu(n,t,e,i){let r=n;do r.z===0&&(r.z=vo(r.x,r.y,t,e,i)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==n);r.prevZ.nextZ=null,r.prevZ=null,qu(r)}function qu(n){let t,e=1;do{let i=n,r;n=null;let s=null;for(t=0;i;){t++;let o=i,a=0;for(let c=0;c<e&&(a++,o=o.nextZ,!!o);c++);let l=e;for(;a>0||l>0&&o;)a!==0&&(l===0||!o||i.z<=o.z)?(r=i,i=i.nextZ,a--):(r=o,o=o.nextZ,l--),s?s.nextZ=r:n=r,r.prevZ=s,s=r;i=o}s.nextZ=null,e*=2}while(t>1);return n}function vo(n,t,e,i,r){return n=(n-e)*r|0,t=(t-i)*r|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,n|t<<1}function Yu(n){let t=n,e=n;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==n);return e}function Gl(n,t,e,i,r,s,o,a){return(r-o)*(t-a)>=(n-o)*(s-a)&&(n-o)*(i-a)>=(e-o)*(t-a)&&(e-o)*(s-a)>=(r-o)*(i-a)}function Ui(n,t,e,i,r,s,o,a){return!(n===o&&t===a)&&Gl(n,t,e,i,r,s,o,a)}function Zu(n,t){return n.next.i!==t.i&&n.prev.i!==t.i&&!Ku(n,t)&&(Wi(n,t)&&Wi(t,n)&&Ju(n,t)&&(le(n.prev,n,t.prev)||le(n,t.prev,t))||Mi(n,t)&&le(n.prev,n,n.next)>0&&le(t.prev,t,t.next)>0)}function le(n,t,e){return(t.y-n.y)*(e.x-t.x)-(t.x-n.x)*(e.y-t.y)}function Mi(n,t){return n.x===t.x&&n.y===t.y}function Vl(n,t,e,i){const r=Mr(le(n,t,e)),s=Mr(le(n,t,i)),o=Mr(le(e,i,n)),a=Mr(le(e,i,t));return!!(r!==s&&o!==a||r===0&&xr(n,e,t)||s===0&&xr(n,i,t)||o===0&&xr(e,n,i)||a===0&&xr(e,t,i))}function xr(n,t,e){return t.x<=Math.max(n.x,e.x)&&t.x>=Math.min(n.x,e.x)&&t.y<=Math.max(n.y,e.y)&&t.y>=Math.min(n.y,e.y)}function Mr(n){return n>0?1:n<0?-1:0}function Ku(n,t){let e=n;do{if(e.i!==n.i&&e.next.i!==n.i&&e.i!==t.i&&e.next.i!==t.i&&Vl(e,e.next,n,t))return!0;e=e.next}while(e!==n);return!1}function Wi(n,t){return le(n.prev,n,n.next)<0?le(n,t,n.next)>=0&&le(n,n.prev,t)>=0:le(n,t,n.prev)<0||le(n,n.next,t)<0}function Ju(n,t){let e=n,i=!1;const r=(n.x+t.x)/2,s=(n.y+t.y)/2;do e.y>s!=e.next.y>s&&e.next.y!==e.y&&r<(e.next.x-e.x)*(s-e.y)/(e.next.y-e.y)+e.x&&(i=!i),e=e.next;while(e!==n);return i}function Wl(n,t){const e=xo(n.i,n.x,n.y),i=xo(t.i,t.x,t.y),r=n.next,s=t.prev;return n.next=t,t.prev=n,e.next=r,r.prev=e,i.next=e,e.prev=i,s.next=i,i.prev=s,i}function wa(n,t,e,i){const r=xo(n,t,e);return i?(r.next=i.next,r.prev=i,i.next.prev=r,i.next=r):(r.prev=r,r.next=r),r}function Xi(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function xo(n,t,e){return{i:n,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function $u(n,t,e,i){let r=0;for(let s=t,o=e-i;s<e;s+=i)r+=(n[o]-n[s])*(n[s+1]+n[o+1]),o=s;return r}class ju{static triangulate(t,e,i=2){return Nu(t,e,i)}}class Oi{static area(t){const e=t.length;let i=0;for(let r=e-1,s=0;s<e;r=s++)i+=t[r].x*t[s].y-t[s].x*t[r].y;return i*.5}static isClockWise(t){return Oi.area(t)<0}static triangulateShape(t,e){const i=[],r=[],s=[];ba(t),Ra(i,t);let o=t.length;e.forEach(ba);for(let l=0;l<e.length;l++)r.push(o),o+=e[l].length,Ra(i,e[l]);const a=ju.triangulate(i,r);for(let l=0;l<a.length;l+=3)s.push(a.slice(l,l+3));return s}}function ba(n){const t=n.length;t>2&&n[t-1].equals(n[0])&&n.pop()}function Ra(n,t){for(let e=0;e<t.length;e++)n.push(t[e].x),n.push(t[e].y)}class ko extends Oo{constructor(t=1,e=0){const i=(1+Math.sqrt(5))/2,r=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(r,s,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new ko(t.radius,t.detail)}}class Ho extends ge{constructor(t=[new ct(0,-.5),new ct(.5,0),new ct(0,.5)],e=12,i=0,r=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:i,phiLength:r},e=Math.floor(e),r=Bt(r,0,Math.PI*2);const s=[],o=[],a=[],l=[],c=[],u=1/e,h=new P,p=new ct,d=new P,g=new P,v=new P;let m=0,f=0;for(let M=0;M<=t.length-1;M++)switch(M){case 0:m=t[M+1].x-t[M].x,f=t[M+1].y-t[M].y,d.x=f*1,d.y=-m,d.z=f*0,v.copy(d),d.normalize(),l.push(d.x,d.y,d.z);break;case t.length-1:l.push(v.x,v.y,v.z);break;default:m=t[M+1].x-t[M].x,f=t[M+1].y-t[M].y,d.x=f*1,d.y=-m,d.z=f*0,g.copy(d),d.x+=v.x,d.y+=v.y,d.z+=v.z,d.normalize(),l.push(d.x,d.y,d.z),v.copy(g)}for(let M=0;M<=e;M++){const S=i+M*u*r,_=Math.sin(S),b=Math.cos(S);for(let w=0;w<=t.length-1;w++){h.x=t[w].x*_,h.y=t[w].y,h.z=t[w].x*b,o.push(h.x,h.y,h.z),p.x=M/e,p.y=w/(t.length-1),a.push(p.x,p.y);const R=l[3*w+0]*_,L=l[3*w+1],E=l[3*w+0]*b;c.push(R,L,E)}}for(let M=0;M<e;M++)for(let S=0;S<t.length-1;S++){const _=S+M*t.length,b=_,w=_+t.length,R=_+t.length+1,L=_+1;s.push(b,w,L),s.push(R,L,w)}this.setIndex(s),this.setAttribute("position",new Vt(o,3)),this.setAttribute("uv",new Vt(a,2)),this.setAttribute("normal",new Vt(c,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ho(t.points,t.segments,t.phiStart,t.phiLength)}}class Yn extends ge{constructor(t=1,e=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:r};const s=t/2,o=e/2,a=Math.floor(i),l=Math.floor(r),c=a+1,u=l+1,h=t/a,p=e/l,d=[],g=[],v=[],m=[];for(let f=0;f<u;f++){const M=f*p-o;for(let S=0;S<c;S++){const _=S*h-s;g.push(_,-M,0),v.push(0,0,1),m.push(S/a),m.push(1-f/l)}}for(let f=0;f<l;f++)for(let M=0;M<a;M++){const S=M+c*f,_=M+c*(f+1),b=M+1+c*(f+1),w=M+1+c*f;d.push(S,_,w),d.push(_,b,w)}this.setIndex(d),this.setAttribute("position",new Vt(g,3)),this.setAttribute("normal",new Vt(v,3)),this.setAttribute("uv",new Vt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Yn(t.width,t.height,t.widthSegments,t.heightSegments)}}class Ji extends ge{constructor(t=new kr([new ct(0,.5),new ct(-.5,-.5),new ct(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};const i=[],r=[],s=[],o=[];let a=0,l=0;if(Array.isArray(t)===!1)c(t);else for(let u=0;u<t.length;u++)c(t[u]),this.addGroup(a,l,u),a+=l,l=0;this.setIndex(i),this.setAttribute("position",new Vt(r,3)),this.setAttribute("normal",new Vt(s,3)),this.setAttribute("uv",new Vt(o,2));function c(u){const h=r.length/3,p=u.extractPoints(e);let d=p.shape;const g=p.holes;Oi.isClockWise(d)===!1&&(d=d.reverse());for(let m=0,f=g.length;m<f;m++){const M=g[m];Oi.isClockWise(M)===!0&&(g[m]=M.reverse())}const v=Oi.triangulateShape(d,g);for(let m=0,f=g.length;m<f;m++){const M=g[m];d=d.concat(M)}for(let m=0,f=d.length;m<f;m++){const M=d[m];r.push(M.x,M.y,0),s.push(0,0,1),o.push(M.x,M.y)}for(let m=0,f=v.length;m<f;m++){const M=v[m],S=M[0]+h,_=M[1]+h,b=M[2]+h;i.push(S,_,b),l+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes;return Qu(e,t)}static fromJSON(t,e){const i=[];for(let r=0,s=t.shapes.length;r<s;r++){const o=e[t.shapes[r]];i.push(o)}return new Ji(i,t.curveSegments)}}function Qu(n,t){if(t.shapes=[],Array.isArray(n))for(let e=0,i=n.length;e<i;e++){const r=n[e];t.shapes.push(r.uuid)}else t.shapes.push(n.uuid);return t}class Hr extends ge{constructor(t=1,e=.4,i=12,r=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:i,tubularSegments:r,arc:s},i=Math.floor(i),r=Math.floor(r);const o=[],a=[],l=[],c=[],u=new P,h=new P,p=new P;for(let d=0;d<=i;d++)for(let g=0;g<=r;g++){const v=g/r*s,m=d/i*Math.PI*2;h.x=(t+e*Math.cos(m))*Math.cos(v),h.y=(t+e*Math.cos(m))*Math.sin(v),h.z=e*Math.sin(m),a.push(h.x,h.y,h.z),u.x=t*Math.cos(v),u.y=t*Math.sin(v),p.subVectors(h,u).normalize(),l.push(p.x,p.y,p.z),c.push(g/r),c.push(d/i)}for(let d=1;d<=i;d++)for(let g=1;g<=r;g++){const v=(r+1)*d+g-1,m=(r+1)*(d-1)+g-1,f=(r+1)*(d-1)+g,M=(r+1)*d+g;o.push(v,m,M),o.push(m,f,M)}this.setIndex(o),this.setAttribute("position",new Vt(a,3)),this.setAttribute("normal",new Vt(l,3)),this.setAttribute("uv",new Vt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Hr(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class Go extends ge{constructor(t=new zl(new P(-1,-1,0),new P(-1,1,0),new P(1,1,0)),e=64,i=1,r=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:i,radialSegments:r,closed:s};const o=t.computeFrenetFrames(e,s);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const a=new P,l=new P,c=new ct;let u=new P;const h=[],p=[],d=[],g=[];v(),this.setIndex(g),this.setAttribute("position",new Vt(h,3)),this.setAttribute("normal",new Vt(p,3)),this.setAttribute("uv",new Vt(d,2));function v(){for(let S=0;S<e;S++)m(S);m(s===!1?e:0),M(),f()}function m(S){u=t.getPointAt(S/e,u);const _=o.normals[S],b=o.binormals[S];for(let w=0;w<=r;w++){const R=w/r*Math.PI*2,L=Math.sin(R),E=-Math.cos(R);l.x=E*_.x+L*b.x,l.y=E*_.y+L*b.y,l.z=E*_.z+L*b.z,l.normalize(),p.push(l.x,l.y,l.z),a.x=u.x+i*l.x,a.y=u.y+i*l.y,a.z=u.z+i*l.z,h.push(a.x,a.y,a.z)}}function f(){for(let S=1;S<=e;S++)for(let _=1;_<=r;_++){const b=(r+1)*(S-1)+(_-1),w=(r+1)*S+(_-1),R=(r+1)*S+_,L=(r+1)*(S-1)+_;g.push(b,w,L),g.push(w,R,L)}}function M(){for(let S=0;S<=e;S++)for(let _=0;_<=r;_++)c.x=S/e,c.y=_/r,d.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new Go(new _o[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}class Ei extends Ki{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Gt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Gt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ml,this.normalScale=new ct(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ke,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class th extends Ki{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Fc,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class eh extends Ki{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Vo extends _e{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Gt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class nh extends Vo{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(_e.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Gt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const xs=new se,Ca=new P,Pa=new P;class Xl{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ct(512,512),this.mapType=en,this.map=null,this.mapPass=null,this.matrix=new se,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Fo,this._frameExtents=new ct(1,1),this._viewportCount=1,this._viewports=[new Jt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,i=this.matrix;Ca.setFromMatrixPosition(t.matrixWorld),e.position.copy(Ca),Pa.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Pa),e.updateMatrixWorld(),xs.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(xs,e.coordinateSystem,e.reversedDepth),e.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(xs)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const La=new se,Li=new P,Ms=new P;class ih extends Xl{constructor(){super(new Ue(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ct(4,2),this._viewportCount=6,this._viewports=[new Jt(2,1,1,1),new Jt(0,1,1,1),new Jt(3,1,1,1),new Jt(1,1,1,1),new Jt(3,0,1,1),new Jt(1,0,1,1)],this._cubeDirections=[new P(1,0,0),new P(-1,0,0),new P(0,0,1),new P(0,0,-1),new P(0,1,0),new P(0,-1,0)],this._cubeUps=[new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,0,1),new P(0,0,-1)]}updateMatrices(t,e=0){const i=this.camera,r=this.matrix,s=t.distance||i.far;s!==i.far&&(i.far=s,i.updateProjectionMatrix()),Li.setFromMatrixPosition(t.matrixWorld),i.position.copy(Li),Ms.copy(i.position),Ms.add(this._cubeDirections[e]),i.up.copy(this._cubeUps[e]),i.lookAt(Ms),i.updateMatrixWorld(),r.makeTranslation(-Li.x,-Li.y,-Li.z),La.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(La,i.coordinateSystem,i.reversedDepth)}}class Ss extends Vo{constructor(t,e,i=0,r=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=r,this.shadow=new ih}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class ql extends Pl{constructor(t=-1,e=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-t,o=i+t,a=r+e,l=r-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class rh extends Xl{constructor(){super(new ql(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class sh extends Vo{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(_e.DEFAULT_UP),this.updateMatrix(),this.target=new _e,this.shadow=new rh}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class oh extends Ue{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}class ah{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=performance.now();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function Da(n,t,e,i){const r=lh(i);switch(e){case gl:return n*t;case vl:return n*t/r.components*r.byteLength;case Po:return n*t/r.components*r.byteLength;case xl:return n*t*2/r.components*r.byteLength;case Lo:return n*t*2/r.components*r.byteLength;case _l:return n*t*3/r.components*r.byteLength;case We:return n*t*4/r.components*r.byteLength;case Do:return n*t*4/r.components*r.byteLength;case wr:case br:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Rr:case Cr:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Gs:case Ws:return Math.max(n,16)*Math.max(t,8)/4;case Hs:case Vs:return Math.max(n,8)*Math.max(t,8)/2;case Xs:case qs:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Ys:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Zs:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Ks:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case Js:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case $s:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case js:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case Qs:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case to:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case eo:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case no:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case io:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case ro:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case so:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case oo:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case ao:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case lo:case co:case uo:return Math.ceil(n/4)*Math.ceil(t/4)*16;case ho:case fo:return Math.ceil(n/4)*Math.ceil(t/4)*8;case po:case mo:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function lh(n){switch(n){case en:case fl:return{byteLength:1,components:1};case Bi:case dl:case Yi:return{byteLength:2,components:1};case Ro:case Co:return{byteLength:2,components:4};case Wn:case bo:case dn:return{byteLength:4,components:1};case pl:case ml:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:wo}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=wo);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Yl(){let n=null,t=!1,e=null,i=null;function r(s,o){e(s,o),i=n.requestAnimationFrame(r)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(r),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){n=s}}}function ch(n){const t=new WeakMap;function e(a,l){const c=a.array,u=a.usage,h=c.byteLength,p=n.createBuffer();n.bindBuffer(l,p),n.bufferData(l,c,u),a.onUploadCallback();let d;if(c instanceof Float32Array)d=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)d=n.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?d=n.HALF_FLOAT:d=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=n.SHORT;else if(c instanceof Uint32Array)d=n.UNSIGNED_INT;else if(c instanceof Int32Array)d=n.INT;else if(c instanceof Int8Array)d=n.BYTE;else if(c instanceof Uint8Array)d=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:p,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:h}}function i(a,l,c){const u=l.array,h=l.updateRanges;if(n.bindBuffer(c,a),h.length===0)n.bufferSubData(c,0,u);else{h.sort((d,g)=>d.start-g.start);let p=0;for(let d=1;d<h.length;d++){const g=h[p],v=h[d];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++p,h[p]=v)}h.length=p+1;for(let d=0,g=h.length;d<g;d++){const v=h[d];n.bufferSubData(c,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(n.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=t.get(a);(!u||u.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:r,remove:s,update:o}}var uh=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,hh=`#ifdef USE_ALPHAHASH
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
#endif`,fh=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,dh=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ph=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,mh=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,gh=`#ifdef USE_AOMAP
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
#endif`,_h=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,vh=`#ifdef USE_BATCHING
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
#endif`,xh=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Mh=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Sh=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,yh=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Eh=`#ifdef USE_IRIDESCENCE
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
#endif`,Th=`#ifdef USE_BUMPMAP
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
#endif`,Ah=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,wh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,bh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Rh=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Ch=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Ph=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Lh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Dh=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Uh=`#define PI 3.141592653589793
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
} // validated`,Ih=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Nh=`vec3 transformedNormal = objectNormal;
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
#endif`,Fh=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Oh=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Bh=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,zh=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,kh="gl_FragColor = linearToOutputTexel( gl_FragColor );",Hh=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Gh=`#ifdef USE_ENVMAP
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
#endif`,Vh=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Wh=`#ifdef USE_ENVMAP
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
#endif`,Xh=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,qh=`#ifdef USE_ENVMAP
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
#endif`,Yh=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Zh=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Kh=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Jh=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,$h=`#ifdef USE_GRADIENTMAP
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
}`,jh=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Qh=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,tf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,ef=`uniform bool receiveShadow;
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
#endif`,nf=`#ifdef USE_ENVMAP
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
#endif`,rf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,sf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,of=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,af=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lf=`PhysicalMaterial material;
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
#endif`,cf=`struct PhysicalMaterial {
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
}`,uf=`
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
#endif`,hf=`#if defined( RE_IndirectDiffuse )
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
#endif`,ff=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,df=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,pf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,mf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,gf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,_f=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,vf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,xf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Mf=`#if defined( USE_POINTS_UV )
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
#endif`,Sf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,yf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Ef=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Tf=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Af=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,wf=`#ifdef USE_MORPHTARGETS
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
#endif`,bf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Rf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Cf=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Pf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Lf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Df=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Uf=`#ifdef USE_NORMALMAP
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
#endif`,If=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Nf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Ff=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Of=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Bf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,zf=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,kf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Hf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Gf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Vf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Wf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Xf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,qf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
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
#endif`,Yf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Zf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Kf=`float getShadowMask() {
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
}`,Jf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,$f=`#ifdef USE_SKINNING
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
#endif`,jf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Qf=`#ifdef USE_SKINNING
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
#endif`,td=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,ed=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,nd=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,id=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,rd=`#ifdef USE_TRANSMISSION
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
#endif`,sd=`#ifdef USE_TRANSMISSION
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
#endif`,od=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ad=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ld=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,cd=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const ud=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,hd=`uniform sampler2D t2D;
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
}`,fd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,dd=`#ifdef ENVMAP_TYPE_CUBE
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
}`,pd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,md=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,gd=`#include <common>
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
}`,_d=`#if DEPTH_PACKING == 3200
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
}`,vd=`#define DISTANCE
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
}`,xd=`#define DISTANCE
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
}`,Md=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Sd=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,yd=`uniform float scale;
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
}`,Ed=`uniform vec3 diffuse;
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
}`,Td=`#include <common>
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
}`,Ad=`uniform vec3 diffuse;
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
}`,wd=`#define LAMBERT
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
}`,bd=`#define LAMBERT
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
}`,Rd=`#define MATCAP
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
}`,Cd=`#define MATCAP
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
}`,Pd=`#define NORMAL
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
}`,Ld=`#define NORMAL
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
}`,Dd=`#define PHONG
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
}`,Ud=`#define PHONG
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
}`,Id=`#define STANDARD
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
}`,Nd=`#define STANDARD
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
}`,Fd=`#define TOON
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
}`,Od=`#define TOON
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
}`,Bd=`uniform float size;
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
}`,zd=`uniform vec3 diffuse;
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
}`,kd=`#include <common>
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
}`,Hd=`uniform vec3 color;
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
}`,Gd=`uniform float rotation;
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
}`,Vd=`uniform vec3 diffuse;
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
}`,Ot={alphahash_fragment:uh,alphahash_pars_fragment:hh,alphamap_fragment:fh,alphamap_pars_fragment:dh,alphatest_fragment:ph,alphatest_pars_fragment:mh,aomap_fragment:gh,aomap_pars_fragment:_h,batching_pars_vertex:vh,batching_vertex:xh,begin_vertex:Mh,beginnormal_vertex:Sh,bsdfs:yh,iridescence_fragment:Eh,bumpmap_pars_fragment:Th,clipping_planes_fragment:Ah,clipping_planes_pars_fragment:wh,clipping_planes_pars_vertex:bh,clipping_planes_vertex:Rh,color_fragment:Ch,color_pars_fragment:Ph,color_pars_vertex:Lh,color_vertex:Dh,common:Uh,cube_uv_reflection_fragment:Ih,defaultnormal_vertex:Nh,displacementmap_pars_vertex:Fh,displacementmap_vertex:Oh,emissivemap_fragment:Bh,emissivemap_pars_fragment:zh,colorspace_fragment:kh,colorspace_pars_fragment:Hh,envmap_fragment:Gh,envmap_common_pars_fragment:Vh,envmap_pars_fragment:Wh,envmap_pars_vertex:Xh,envmap_physical_pars_fragment:nf,envmap_vertex:qh,fog_vertex:Yh,fog_pars_vertex:Zh,fog_fragment:Kh,fog_pars_fragment:Jh,gradientmap_pars_fragment:$h,lightmap_pars_fragment:jh,lights_lambert_fragment:Qh,lights_lambert_pars_fragment:tf,lights_pars_begin:ef,lights_toon_fragment:rf,lights_toon_pars_fragment:sf,lights_phong_fragment:of,lights_phong_pars_fragment:af,lights_physical_fragment:lf,lights_physical_pars_fragment:cf,lights_fragment_begin:uf,lights_fragment_maps:hf,lights_fragment_end:ff,logdepthbuf_fragment:df,logdepthbuf_pars_fragment:pf,logdepthbuf_pars_vertex:mf,logdepthbuf_vertex:gf,map_fragment:_f,map_pars_fragment:vf,map_particle_fragment:xf,map_particle_pars_fragment:Mf,metalnessmap_fragment:Sf,metalnessmap_pars_fragment:yf,morphinstance_vertex:Ef,morphcolor_vertex:Tf,morphnormal_vertex:Af,morphtarget_pars_vertex:wf,morphtarget_vertex:bf,normal_fragment_begin:Rf,normal_fragment_maps:Cf,normal_pars_fragment:Pf,normal_pars_vertex:Lf,normal_vertex:Df,normalmap_pars_fragment:Uf,clearcoat_normal_fragment_begin:If,clearcoat_normal_fragment_maps:Nf,clearcoat_pars_fragment:Ff,iridescence_pars_fragment:Of,opaque_fragment:Bf,packing:zf,premultiplied_alpha_fragment:kf,project_vertex:Hf,dithering_fragment:Gf,dithering_pars_fragment:Vf,roughnessmap_fragment:Wf,roughnessmap_pars_fragment:Xf,shadowmap_pars_fragment:qf,shadowmap_pars_vertex:Yf,shadowmap_vertex:Zf,shadowmask_pars_fragment:Kf,skinbase_vertex:Jf,skinning_pars_vertex:$f,skinning_vertex:jf,skinnormal_vertex:Qf,specularmap_fragment:td,specularmap_pars_fragment:ed,tonemapping_fragment:nd,tonemapping_pars_fragment:id,transmission_fragment:rd,transmission_pars_fragment:sd,uv_pars_fragment:od,uv_pars_vertex:ad,uv_vertex:ld,worldpos_vertex:cd,background_vert:ud,background_frag:hd,backgroundCube_vert:fd,backgroundCube_frag:dd,cube_vert:pd,cube_frag:md,depth_vert:gd,depth_frag:_d,distanceRGBA_vert:vd,distanceRGBA_frag:xd,equirect_vert:Md,equirect_frag:Sd,linedashed_vert:yd,linedashed_frag:Ed,meshbasic_vert:Td,meshbasic_frag:Ad,meshlambert_vert:wd,meshlambert_frag:bd,meshmatcap_vert:Rd,meshmatcap_frag:Cd,meshnormal_vert:Pd,meshnormal_frag:Ld,meshphong_vert:Dd,meshphong_frag:Ud,meshphysical_vert:Id,meshphysical_frag:Nd,meshtoon_vert:Fd,meshtoon_frag:Od,points_vert:Bd,points_frag:zd,shadow_vert:kd,shadow_frag:Hd,sprite_vert:Gd,sprite_frag:Vd},rt={common:{diffuse:{value:new Gt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Nt},alphaMap:{value:null},alphaMapTransform:{value:new Nt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Nt}},envmap:{envMap:{value:null},envMapRotation:{value:new Nt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Nt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Nt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Nt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Nt},normalScale:{value:new ct(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Nt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Nt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Nt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Nt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Gt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Gt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Nt},alphaTest:{value:0},uvTransform:{value:new Nt}},sprite:{diffuse:{value:new Gt(16777215)},opacity:{value:1},center:{value:new ct(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Nt},alphaMap:{value:null},alphaMapTransform:{value:new Nt},alphaTest:{value:0}}},je={basic:{uniforms:ye([rt.common,rt.specularmap,rt.envmap,rt.aomap,rt.lightmap,rt.fog]),vertexShader:Ot.meshbasic_vert,fragmentShader:Ot.meshbasic_frag},lambert:{uniforms:ye([rt.common,rt.specularmap,rt.envmap,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.fog,rt.lights,{emissive:{value:new Gt(0)}}]),vertexShader:Ot.meshlambert_vert,fragmentShader:Ot.meshlambert_frag},phong:{uniforms:ye([rt.common,rt.specularmap,rt.envmap,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.fog,rt.lights,{emissive:{value:new Gt(0)},specular:{value:new Gt(1118481)},shininess:{value:30}}]),vertexShader:Ot.meshphong_vert,fragmentShader:Ot.meshphong_frag},standard:{uniforms:ye([rt.common,rt.envmap,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.roughnessmap,rt.metalnessmap,rt.fog,rt.lights,{emissive:{value:new Gt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ot.meshphysical_vert,fragmentShader:Ot.meshphysical_frag},toon:{uniforms:ye([rt.common,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.gradientmap,rt.fog,rt.lights,{emissive:{value:new Gt(0)}}]),vertexShader:Ot.meshtoon_vert,fragmentShader:Ot.meshtoon_frag},matcap:{uniforms:ye([rt.common,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.fog,{matcap:{value:null}}]),vertexShader:Ot.meshmatcap_vert,fragmentShader:Ot.meshmatcap_frag},points:{uniforms:ye([rt.points,rt.fog]),vertexShader:Ot.points_vert,fragmentShader:Ot.points_frag},dashed:{uniforms:ye([rt.common,rt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ot.linedashed_vert,fragmentShader:Ot.linedashed_frag},depth:{uniforms:ye([rt.common,rt.displacementmap]),vertexShader:Ot.depth_vert,fragmentShader:Ot.depth_frag},normal:{uniforms:ye([rt.common,rt.bumpmap,rt.normalmap,rt.displacementmap,{opacity:{value:1}}]),vertexShader:Ot.meshnormal_vert,fragmentShader:Ot.meshnormal_frag},sprite:{uniforms:ye([rt.sprite,rt.fog]),vertexShader:Ot.sprite_vert,fragmentShader:Ot.sprite_frag},background:{uniforms:{uvTransform:{value:new Nt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ot.background_vert,fragmentShader:Ot.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Nt}},vertexShader:Ot.backgroundCube_vert,fragmentShader:Ot.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ot.cube_vert,fragmentShader:Ot.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ot.equirect_vert,fragmentShader:Ot.equirect_frag},distanceRGBA:{uniforms:ye([rt.common,rt.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ot.distanceRGBA_vert,fragmentShader:Ot.distanceRGBA_frag},shadow:{uniforms:ye([rt.lights,rt.fog,{color:{value:new Gt(0)},opacity:{value:1}}]),vertexShader:Ot.shadow_vert,fragmentShader:Ot.shadow_frag}};je.physical={uniforms:ye([je.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Nt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Nt},clearcoatNormalScale:{value:new ct(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Nt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Nt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Nt},sheen:{value:0},sheenColor:{value:new Gt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Nt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Nt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Nt},transmissionSamplerSize:{value:new ct},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Nt},attenuationDistance:{value:0},attenuationColor:{value:new Gt(0)},specularColor:{value:new Gt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Nt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Nt},anisotropyVector:{value:new ct},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Nt}}]),vertexShader:Ot.meshphysical_vert,fragmentShader:Ot.meshphysical_frag};const Sr={r:0,b:0,g:0},Nn=new Ke,Wd=new se;function Xd(n,t,e,i,r,s,o){const a=new Gt(0);let l=s===!0?0:1,c,u,h=null,p=0,d=null;function g(S){let _=S.isScene===!0?S.background:null;return _&&_.isTexture&&(_=(S.backgroundBlurriness>0?e:t).get(_)),_}function v(S){let _=!1;const b=g(S);b===null?f(a,l):b&&b.isColor&&(f(b,1),_=!0);const w=n.xr.getEnvironmentBlendMode();w==="additive"?i.buffers.color.setClear(0,0,0,1,o):w==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||_)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(S,_){const b=g(_);b&&(b.isCubeTexture||b.mapping===zr)?(u===void 0&&(u=new Xe(new bn(1,1,1),new Rn({name:"BackgroundCubeMaterial",uniforms:xi(je.backgroundCube.uniforms),vertexShader:je.backgroundCube.vertexShader,fragmentShader:je.backgroundCube.fragmentShader,side:Re,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(w,R,L){this.matrixWorld.copyPosition(L.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),Nn.copy(_.backgroundRotation),Nn.x*=-1,Nn.y*=-1,Nn.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(Nn.y*=-1,Nn.z*=-1),u.material.uniforms.envMap.value=b,u.material.uniforms.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Wd.makeRotationFromEuler(Nn)),u.material.toneMapped=Xt.getTransfer(b.colorSpace)!==Kt,(h!==b||p!==b.version||d!==n.toneMapping)&&(u.material.needsUpdate=!0,h=b,p=b.version,d=n.toneMapping),u.layers.enableAll(),S.unshift(u,u.geometry,u.material,0,0,null)):b&&b.isTexture&&(c===void 0&&(c=new Xe(new Yn(2,2),new Rn({name:"BackgroundMaterial",uniforms:xi(je.background.uniforms),vertexShader:je.background.vertexShader,fragmentShader:je.background.fragmentShader,side:wn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=b,c.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,c.material.toneMapped=Xt.getTransfer(b.colorSpace)!==Kt,b.matrixAutoUpdate===!0&&b.updateMatrix(),c.material.uniforms.uvTransform.value.copy(b.matrix),(h!==b||p!==b.version||d!==n.toneMapping)&&(c.material.needsUpdate=!0,h=b,p=b.version,d=n.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null))}function f(S,_){S.getRGB(Sr,Cl(n)),i.buffers.color.setClear(Sr.r,Sr.g,Sr.b,_,o)}function M(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(S,_=1){a.set(S),l=_,f(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(S){l=S,f(a,l)},render:v,addToRenderList:m,dispose:M}}function qd(n,t){const e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=p(null);let s=r,o=!1;function a(T,D,F,k,q){let W=!1;const X=h(k,F,D);s!==X&&(s=X,c(s.object)),W=d(T,k,F,q),W&&g(T,k,F,q),q!==null&&t.update(q,n.ELEMENT_ARRAY_BUFFER),(W||o)&&(o=!1,_(T,D,F,k),q!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(q).buffer))}function l(){return n.createVertexArray()}function c(T){return n.bindVertexArray(T)}function u(T){return n.deleteVertexArray(T)}function h(T,D,F){const k=F.wireframe===!0;let q=i[T.id];q===void 0&&(q={},i[T.id]=q);let W=q[D.id];W===void 0&&(W={},q[D.id]=W);let X=W[k];return X===void 0&&(X=p(l()),W[k]=X),X}function p(T){const D=[],F=[],k=[];for(let q=0;q<e;q++)D[q]=0,F[q]=0,k[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:F,attributeDivisors:k,object:T,attributes:{},index:null}}function d(T,D,F,k){const q=s.attributes,W=D.attributes;let X=0;const J=F.getAttributes();for(const H in J)if(J[H].location>=0){const ht=q[H];let Tt=W[H];if(Tt===void 0&&(H==="instanceMatrix"&&T.instanceMatrix&&(Tt=T.instanceMatrix),H==="instanceColor"&&T.instanceColor&&(Tt=T.instanceColor)),ht===void 0||ht.attribute!==Tt||Tt&&ht.data!==Tt.data)return!0;X++}return s.attributesNum!==X||s.index!==k}function g(T,D,F,k){const q={},W=D.attributes;let X=0;const J=F.getAttributes();for(const H in J)if(J[H].location>=0){let ht=W[H];ht===void 0&&(H==="instanceMatrix"&&T.instanceMatrix&&(ht=T.instanceMatrix),H==="instanceColor"&&T.instanceColor&&(ht=T.instanceColor));const Tt={};Tt.attribute=ht,ht&&ht.data&&(Tt.data=ht.data),q[H]=Tt,X++}s.attributes=q,s.attributesNum=X,s.index=k}function v(){const T=s.newAttributes;for(let D=0,F=T.length;D<F;D++)T[D]=0}function m(T){f(T,0)}function f(T,D){const F=s.newAttributes,k=s.enabledAttributes,q=s.attributeDivisors;F[T]=1,k[T]===0&&(n.enableVertexAttribArray(T),k[T]=1),q[T]!==D&&(n.vertexAttribDivisor(T,D),q[T]=D)}function M(){const T=s.newAttributes,D=s.enabledAttributes;for(let F=0,k=D.length;F<k;F++)D[F]!==T[F]&&(n.disableVertexAttribArray(F),D[F]=0)}function S(T,D,F,k,q,W,X){X===!0?n.vertexAttribIPointer(T,D,F,q,W):n.vertexAttribPointer(T,D,F,k,q,W)}function _(T,D,F,k){v();const q=k.attributes,W=F.getAttributes(),X=D.defaultAttributeValues;for(const J in W){const H=W[J];if(H.location>=0){let st=q[J];if(st===void 0&&(J==="instanceMatrix"&&T.instanceMatrix&&(st=T.instanceMatrix),J==="instanceColor"&&T.instanceColor&&(st=T.instanceColor)),st!==void 0){const ht=st.normalized,Tt=st.itemSize,zt=t.get(st);if(zt===void 0)continue;const jt=zt.buffer,ne=zt.type,qt=zt.bytesPerElement,Y=ne===n.INT||ne===n.UNSIGNED_INT||st.gpuType===bo;if(st.isInterleavedBufferAttribute){const $=st.data,pt=$.stride,Lt=st.offset;if($.isInstancedInterleavedBuffer){for(let Et=0;Et<H.locationSize;Et++)f(H.location+Et,$.meshPerAttribute);T.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=$.meshPerAttribute*$.count)}else for(let Et=0;Et<H.locationSize;Et++)m(H.location+Et);n.bindBuffer(n.ARRAY_BUFFER,jt);for(let Et=0;Et<H.locationSize;Et++)S(H.location+Et,Tt/H.locationSize,ne,ht,pt*qt,(Lt+Tt/H.locationSize*Et)*qt,Y)}else{if(st.isInstancedBufferAttribute){for(let $=0;$<H.locationSize;$++)f(H.location+$,st.meshPerAttribute);T.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=st.meshPerAttribute*st.count)}else for(let $=0;$<H.locationSize;$++)m(H.location+$);n.bindBuffer(n.ARRAY_BUFFER,jt);for(let $=0;$<H.locationSize;$++)S(H.location+$,Tt/H.locationSize,ne,ht,Tt*qt,Tt/H.locationSize*$*qt,Y)}}else if(X!==void 0){const ht=X[J];if(ht!==void 0)switch(ht.length){case 2:n.vertexAttrib2fv(H.location,ht);break;case 3:n.vertexAttrib3fv(H.location,ht);break;case 4:n.vertexAttrib4fv(H.location,ht);break;default:n.vertexAttrib1fv(H.location,ht)}}}}M()}function b(){L();for(const T in i){const D=i[T];for(const F in D){const k=D[F];for(const q in k)u(k[q].object),delete k[q];delete D[F]}delete i[T]}}function w(T){if(i[T.id]===void 0)return;const D=i[T.id];for(const F in D){const k=D[F];for(const q in k)u(k[q].object),delete k[q];delete D[F]}delete i[T.id]}function R(T){for(const D in i){const F=i[D];if(F[T.id]===void 0)continue;const k=F[T.id];for(const q in k)u(k[q].object),delete k[q];delete F[T.id]}}function L(){E(),o=!0,s!==r&&(s=r,c(s.object))}function E(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:L,resetDefaultState:E,dispose:b,releaseStatesOfGeometry:w,releaseStatesOfProgram:R,initAttributes:v,enableAttribute:m,disableUnusedAttributes:M}}function Yd(n,t,e){let i;function r(c){i=c}function s(c,u){n.drawArrays(i,c,u),e.update(u,i,1)}function o(c,u,h){h!==0&&(n.drawArraysInstanced(i,c,u,h),e.update(u,i,h))}function a(c,u,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,u,0,h);let d=0;for(let g=0;g<h;g++)d+=u[g];e.update(d,i,1)}function l(c,u,h,p){if(h===0)return;const d=t.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<c.length;g++)o(c[g],u[g],p[g]);else{d.multiDrawArraysInstancedWEBGL(i,c,0,u,0,p,0,h);let g=0;for(let v=0;v<h;v++)g+=u[v]*p[v];e.update(g,i,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function Zd(n,t,e,i){let r;function s(){if(r!==void 0)return r;if(t.has("EXT_texture_filter_anisotropic")===!0){const R=t.get("EXT_texture_filter_anisotropic");r=n.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(R){return!(R!==We&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(R){const L=R===Yi&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(R!==en&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==dn&&!L)}function l(R){if(R==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const h=e.logarithmicDepthBuffer===!0,p=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),d=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),f=n.getParameter(n.MAX_VERTEX_ATTRIBS),M=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),S=n.getParameter(n.MAX_VARYING_VECTORS),_=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),b=g>0,w=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:h,reversedDepthBuffer:p,maxTextures:d,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:M,maxVaryings:S,maxFragmentUniforms:_,vertexTextures:b,maxSamples:w}}function Kd(n){const t=this;let e=null,i=0,r=!1,s=!1;const o=new Bn,a=new Nt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,p){const d=h.length!==0||p||i!==0||r;return r=p,i=h.length,d},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,p){e=u(h,p,0)},this.setState=function(h,p,d){const g=h.clippingPlanes,v=h.clipIntersection,m=h.clipShadows,f=n.get(h);if(!r||g===null||g.length===0||s&&!m)s?u(null):c();else{const M=s?0:i,S=M*4;let _=f.clippingState||null;l.value=_,_=u(g,p,S,d);for(let b=0;b!==S;++b)_[b]=e[b];f.clippingState=_,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function u(h,p,d,g){const v=h!==null?h.length:0;let m=null;if(v!==0){if(m=l.value,g!==!0||m===null){const f=d+v*4,M=p.matrixWorldInverse;a.getNormalMatrix(M),(m===null||m.length<f)&&(m=new Float32Array(f));for(let S=0,_=d;S!==v;++S,_+=4)o.copy(h[S]).applyMatrix4(M,a),o.normal.toArray(m,_),m[_+3]=o.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,m}}function Jd(n){let t=new WeakMap;function e(o,a){return a===Bs?o.mapping=gi:a===zs&&(o.mapping=_i),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===Bs||a===zs)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new vu(l.height);return c.fromEquirectangularTexture(n,o),t.set(o,c),o.addEventListener("dispose",r),e(c.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function s(){t=new WeakMap}return{get:i,dispose:s}}const ui=4,Ua=[.125,.215,.35,.446,.526,.582],Hn=20,ys=new ql,Ia=new Gt;let Es=null,Ts=0,As=0,ws=!1;const zn=(1+Math.sqrt(5))/2,li=1/zn,Na=[new P(-zn,li,0),new P(zn,li,0),new P(-li,0,zn),new P(li,0,zn),new P(0,zn,-li),new P(0,zn,li),new P(-1,1,-1),new P(1,1,-1),new P(-1,1,1),new P(1,1,1)],$d=new P;class Fa{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,r=100,s={}){const{size:o=256,position:a=$d}=s;Es=this._renderer.getRenderTarget(),Ts=this._renderer.getActiveCubeFace(),As=this._renderer.getActiveMipmapLevel(),ws=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,i,r,l,a),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=za(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ba(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Es,Ts,As),this._renderer.xr.enabled=ws,t.scissorTest=!1,yr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===gi||t.mapping===_i?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Es=this._renderer.getRenderTarget(),Ts=this._renderer.getActiveCubeFace(),As=this._renderer.getActiveMipmapLevel(),ws=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:Qe,minFilter:Qe,generateMipmaps:!1,type:Yi,format:We,colorSpace:vi,depthBuffer:!1},r=Oa(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Oa(t,e,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=jd(s)),this._blurMaterial=Qd(s,t,e)}return r}_compileMaterial(t){const e=new Xe(this._lodPlanes[0],t);this._renderer.compile(e,ys)}_sceneToCubeUV(t,e,i,r,s){const l=new Ue(90,1,e,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],h=this._renderer,p=h.autoClear,d=h.toneMapping;h.getClearColor(Ia),h.toneMapping=En,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(r),h.clearDepth(),h.setRenderTarget(null));const v=new wl({name:"PMREM.Background",side:Re,depthWrite:!1,depthTest:!1}),m=new Xe(new bn,v);let f=!1;const M=t.background;M?M.isColor&&(v.color.copy(M),t.background=null,f=!0):(v.color.copy(Ia),f=!0);for(let S=0;S<6;S++){const _=S%3;_===0?(l.up.set(0,c[S],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[S],s.y,s.z)):_===1?(l.up.set(0,0,c[S]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[S],s.z)):(l.up.set(0,c[S],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[S]));const b=this._cubeSize;yr(r,_*b,S>2?b:0,b,b),h.setRenderTarget(r),f&&h.render(m,l),h.render(t,l)}m.geometry.dispose(),m.material.dispose(),h.toneMapping=d,h.autoClear=p,t.background=M}_textureToCubeUV(t,e){const i=this._renderer,r=t.mapping===gi||t.mapping===_i;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=za()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ba());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new Xe(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=t;const l=this._cubeSize;yr(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(o,ys)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=Na[(r-s-1)%Na.length];this._blur(t,s-1,s,o,a)}e.autoClear=i}_blur(t,e,i,r,s){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,i,r,"latitudinal",s),this._halfBlur(o,t,i,i,r,"longitudinal",s)}_halfBlur(t,e,i,r,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new Xe(this._lodPlanes[r],c),p=c.uniforms,d=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*d):2*Math.PI/(2*Hn-1),v=s/g,m=isFinite(s)?1+Math.floor(u*v):Hn;m>Hn&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Hn}`);const f=[];let M=0;for(let R=0;R<Hn;++R){const L=R/v,E=Math.exp(-L*L/2);f.push(E),R===0?M+=E:R<m&&(M+=2*E)}for(let R=0;R<f.length;R++)f[R]=f[R]/M;p.envMap.value=t.texture,p.samples.value=m,p.weights.value=f,p.latitudinal.value=o==="latitudinal",a&&(p.poleAxis.value=a);const{_lodMax:S}=this;p.dTheta.value=g,p.mipInt.value=S-i;const _=this._sizeLods[r],b=3*_*(r>S-ui?r-S+ui:0),w=4*(this._cubeSize-_);yr(e,b,w,3*_,2*_),l.setRenderTarget(e),l.render(h,ys)}}function jd(n){const t=[],e=[],i=[];let r=n;const s=n-ui+1+Ua.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);e.push(a);let l=1/a;o>n-ui?l=Ua[o-n+ui-1]:o===0&&(l=0),i.push(l);const c=1/(a-2),u=-c,h=1+c,p=[u,u,h,u,h,h,u,u,h,h,u,h],d=6,g=6,v=3,m=2,f=1,M=new Float32Array(v*g*d),S=new Float32Array(m*g*d),_=new Float32Array(f*g*d);for(let w=0;w<d;w++){const R=w%3*2/3-1,L=w>2?0:-1,E=[R,L,0,R+2/3,L,0,R+2/3,L+1,0,R,L,0,R+2/3,L+1,0,R,L+1,0];M.set(E,v*g*w),S.set(p,m*g*w);const T=[w,w,w,w,w,w];_.set(T,f*g*w)}const b=new ge;b.setAttribute("position",new ze(M,v)),b.setAttribute("uv",new ze(S,m)),b.setAttribute("faceIndex",new ze(_,f)),t.push(b),r>ui&&r--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function Oa(n,t,e){const i=new Xn(n,t,e);return i.texture.mapping=zr,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function yr(n,t,e,i,r){n.viewport.set(t,e,i,r),n.scissor.set(t,e,i,r)}function Qd(n,t,e){const i=new Float32Array(Hn),r=new P(0,1,0);return new Rn({name:"SphericalGaussianBlur",defines:{n:Hn,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Wo(),fragmentShader:`

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
		`,blending:yn,depthTest:!1,depthWrite:!1})}function Ba(){return new Rn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Wo(),fragmentShader:`

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
		`,blending:yn,depthTest:!1,depthWrite:!1})}function za(){return new Rn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Wo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:yn,depthTest:!1,depthWrite:!1})}function Wo(){return`

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
	`}function tp(n){let t=new WeakMap,e=null;function i(a){if(a&&a.isTexture){const l=a.mapping,c=l===Bs||l===zs,u=l===gi||l===_i;if(c||u){let h=t.get(a);const p=h!==void 0?h.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==p)return e===null&&(e=new Fa(n)),h=c?e.fromEquirectangular(a,h):e.fromCubemap(a,h),h.texture.pmremVersion=a.pmremVersion,t.set(a,h),h.texture;if(h!==void 0)return h.texture;{const d=a.image;return c&&d&&d.height>0||u&&d&&r(d)?(e===null&&(e=new Fa(n)),h=c?e.fromEquirectangular(a):e.fromCubemap(a),h.texture.pmremVersion=a.pmremVersion,t.set(a,h),a.addEventListener("dispose",s),h.texture):null}}}return a}function r(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:o}}function ep(n){const t={};function e(i){if(t[i]!==void 0)return t[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return t[i]=r,r}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const r=e(i);return r===null&&Gi("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function np(n,t,e,i){const r={},s=new WeakMap;function o(h){const p=h.target;p.index!==null&&t.remove(p.index);for(const g in p.attributes)t.remove(p.attributes[g]);p.removeEventListener("dispose",o),delete r[p.id];const d=s.get(p);d&&(t.remove(d),s.delete(p)),i.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,e.memory.geometries--}function a(h,p){return r[p.id]===!0||(p.addEventListener("dispose",o),r[p.id]=!0,e.memory.geometries++),p}function l(h){const p=h.attributes;for(const d in p)t.update(p[d],n.ARRAY_BUFFER)}function c(h){const p=[],d=h.index,g=h.attributes.position;let v=0;if(d!==null){const M=d.array;v=d.version;for(let S=0,_=M.length;S<_;S+=3){const b=M[S+0],w=M[S+1],R=M[S+2];p.push(b,w,w,R,R,b)}}else if(g!==void 0){const M=g.array;v=g.version;for(let S=0,_=M.length/3-1;S<_;S+=3){const b=S+0,w=S+1,R=S+2;p.push(b,w,w,R,R,b)}}else return;const m=new(yl(p)?Rl:bl)(p,1);m.version=v;const f=s.get(h);f&&t.remove(f),s.set(h,m)}function u(h){const p=s.get(h);if(p){const d=h.index;d!==null&&p.version<d.version&&c(h)}else c(h);return s.get(h)}return{get:a,update:l,getWireframeAttribute:u}}function ip(n,t,e){let i;function r(p){i=p}let s,o;function a(p){s=p.type,o=p.bytesPerElement}function l(p,d){n.drawElements(i,d,s,p*o),e.update(d,i,1)}function c(p,d,g){g!==0&&(n.drawElementsInstanced(i,d,s,p*o,g),e.update(d,i,g))}function u(p,d,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,s,p,0,g);let m=0;for(let f=0;f<g;f++)m+=d[f];e.update(m,i,1)}function h(p,d,g,v){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<p.length;f++)c(p[f]/o,d[f],v[f]);else{m.multiDrawElementsInstancedWEBGL(i,d,0,s,p,0,v,0,g);let f=0;for(let M=0;M<g;M++)f+=d[M]*v[M];e.update(f,i,1)}}this.setMode=r,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function rp(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(e.calls++,o){case n.TRIANGLES:e.triangles+=a*(s/3);break;case n.LINES:e.lines+=a*(s/2);break;case n.LINE_STRIP:e.lines+=a*(s-1);break;case n.LINE_LOOP:e.lines+=a*s;break;case n.POINTS:e.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:r,update:i}}function sp(n,t,e){const i=new WeakMap,r=new Jt;function s(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=u!==void 0?u.length:0;let p=i.get(a);if(p===void 0||p.count!==h){let T=function(){L.dispose(),i.delete(a),a.removeEventListener("dispose",T)};var d=T;p!==void 0&&p.texture.dispose();const g=a.morphAttributes.position!==void 0,v=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,f=a.morphAttributes.position||[],M=a.morphAttributes.normal||[],S=a.morphAttributes.color||[];let _=0;g===!0&&(_=1),v===!0&&(_=2),m===!0&&(_=3);let b=a.attributes.position.count*_,w=1;b>t.maxTextureSize&&(w=Math.ceil(b/t.maxTextureSize),b=t.maxTextureSize);const R=new Float32Array(b*w*4*h),L=new El(R,b,w,h);L.type=dn,L.needsUpdate=!0;const E=_*4;for(let D=0;D<h;D++){const F=f[D],k=M[D],q=S[D],W=b*w*4*D;for(let X=0;X<F.count;X++){const J=X*E;g===!0&&(r.fromBufferAttribute(F,X),R[W+J+0]=r.x,R[W+J+1]=r.y,R[W+J+2]=r.z,R[W+J+3]=0),v===!0&&(r.fromBufferAttribute(k,X),R[W+J+4]=r.x,R[W+J+5]=r.y,R[W+J+6]=r.z,R[W+J+7]=0),m===!0&&(r.fromBufferAttribute(q,X),R[W+J+8]=r.x,R[W+J+9]=r.y,R[W+J+10]=r.z,R[W+J+11]=q.itemSize===4?r.w:1)}}p={count:h,texture:L,size:new ct(b,w)},i.set(a,p),a.addEventListener("dispose",T)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,e);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const v=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(n,"morphTargetBaseInfluence",v),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",p.texture,e),l.getUniforms().setValue(n,"morphTargetsTextureSize",p.size)}return{update:s}}function op(n,t,e,i){let r=new WeakMap;function s(l){const c=i.render.frame,u=l.geometry,h=t.get(l,u);if(r.get(h)!==c&&(t.update(h),r.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==c&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const p=l.skeleton;r.get(p)!==c&&(p.update(),r.set(p,c))}return h}function o(){r=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:s,dispose:o}}const Zl=new Te,ka=new Ul(1,1),Kl=new El,Jl=new tu,$l=new Ll,Ha=[],Ga=[],Va=new Float32Array(16),Wa=new Float32Array(9),Xa=new Float32Array(4);function Ti(n,t,e){const i=n[0];if(i<=0||i>0)return n;const r=t*e;let s=Ha[r];if(s===void 0&&(s=new Float32Array(r),Ha[r]=s),t!==0){i.toArray(s,0);for(let o=1,a=0;o!==t;++o)a+=e,n[o].toArray(s,a)}return s}function fe(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function de(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function Gr(n,t){let e=Ga[t];e===void 0&&(e=new Int32Array(t),Ga[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function ap(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function lp(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(fe(e,t))return;n.uniform2fv(this.addr,t),de(e,t)}}function cp(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(fe(e,t))return;n.uniform3fv(this.addr,t),de(e,t)}}function up(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(fe(e,t))return;n.uniform4fv(this.addr,t),de(e,t)}}function hp(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(fe(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),de(e,t)}else{if(fe(e,i))return;Xa.set(i),n.uniformMatrix2fv(this.addr,!1,Xa),de(e,i)}}function fp(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(fe(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),de(e,t)}else{if(fe(e,i))return;Wa.set(i),n.uniformMatrix3fv(this.addr,!1,Wa),de(e,i)}}function dp(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(fe(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),de(e,t)}else{if(fe(e,i))return;Va.set(i),n.uniformMatrix4fv(this.addr,!1,Va),de(e,i)}}function pp(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function mp(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(fe(e,t))return;n.uniform2iv(this.addr,t),de(e,t)}}function gp(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(fe(e,t))return;n.uniform3iv(this.addr,t),de(e,t)}}function _p(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(fe(e,t))return;n.uniform4iv(this.addr,t),de(e,t)}}function vp(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function xp(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(fe(e,t))return;n.uniform2uiv(this.addr,t),de(e,t)}}function Mp(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(fe(e,t))return;n.uniform3uiv(this.addr,t),de(e,t)}}function Sp(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(fe(e,t))return;n.uniform4uiv(this.addr,t),de(e,t)}}function yp(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(ka.compareFunction=Sl,s=ka):s=Zl,e.setTexture2D(t||s,r)}function Ep(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),e.setTexture3D(t||Jl,r)}function Tp(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),e.setTextureCube(t||$l,r)}function Ap(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),e.setTexture2DArray(t||Kl,r)}function wp(n){switch(n){case 5126:return ap;case 35664:return lp;case 35665:return cp;case 35666:return up;case 35674:return hp;case 35675:return fp;case 35676:return dp;case 5124:case 35670:return pp;case 35667:case 35671:return mp;case 35668:case 35672:return gp;case 35669:case 35673:return _p;case 5125:return vp;case 36294:return xp;case 36295:return Mp;case 36296:return Sp;case 35678:case 36198:case 36298:case 36306:case 35682:return yp;case 35679:case 36299:case 36307:return Ep;case 35680:case 36300:case 36308:case 36293:return Tp;case 36289:case 36303:case 36311:case 36292:return Ap}}function bp(n,t){n.uniform1fv(this.addr,t)}function Rp(n,t){const e=Ti(t,this.size,2);n.uniform2fv(this.addr,e)}function Cp(n,t){const e=Ti(t,this.size,3);n.uniform3fv(this.addr,e)}function Pp(n,t){const e=Ti(t,this.size,4);n.uniform4fv(this.addr,e)}function Lp(n,t){const e=Ti(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function Dp(n,t){const e=Ti(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function Up(n,t){const e=Ti(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function Ip(n,t){n.uniform1iv(this.addr,t)}function Np(n,t){n.uniform2iv(this.addr,t)}function Fp(n,t){n.uniform3iv(this.addr,t)}function Op(n,t){n.uniform4iv(this.addr,t)}function Bp(n,t){n.uniform1uiv(this.addr,t)}function zp(n,t){n.uniform2uiv(this.addr,t)}function kp(n,t){n.uniform3uiv(this.addr,t)}function Hp(n,t){n.uniform4uiv(this.addr,t)}function Gp(n,t,e){const i=this.cache,r=t.length,s=Gr(e,r);fe(i,s)||(n.uniform1iv(this.addr,s),de(i,s));for(let o=0;o!==r;++o)e.setTexture2D(t[o]||Zl,s[o])}function Vp(n,t,e){const i=this.cache,r=t.length,s=Gr(e,r);fe(i,s)||(n.uniform1iv(this.addr,s),de(i,s));for(let o=0;o!==r;++o)e.setTexture3D(t[o]||Jl,s[o])}function Wp(n,t,e){const i=this.cache,r=t.length,s=Gr(e,r);fe(i,s)||(n.uniform1iv(this.addr,s),de(i,s));for(let o=0;o!==r;++o)e.setTextureCube(t[o]||$l,s[o])}function Xp(n,t,e){const i=this.cache,r=t.length,s=Gr(e,r);fe(i,s)||(n.uniform1iv(this.addr,s),de(i,s));for(let o=0;o!==r;++o)e.setTexture2DArray(t[o]||Kl,s[o])}function qp(n){switch(n){case 5126:return bp;case 35664:return Rp;case 35665:return Cp;case 35666:return Pp;case 35674:return Lp;case 35675:return Dp;case 35676:return Up;case 5124:case 35670:return Ip;case 35667:case 35671:return Np;case 35668:case 35672:return Fp;case 35669:case 35673:return Op;case 5125:return Bp;case 36294:return zp;case 36295:return kp;case 36296:return Hp;case 35678:case 36198:case 36298:case 36306:case 35682:return Gp;case 35679:case 36299:case 36307:return Vp;case 35680:case 36300:case 36308:case 36293:return Wp;case 36289:case 36303:case 36311:case 36292:return Xp}}class Yp{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=wp(e.type)}}class Zp{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=qp(e.type)}}class Kp{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(t,e[a.id],i)}}}const bs=/(\w+)(\])?(\[|\.)?/g;function qa(n,t){n.seq.push(t),n.map[t.id]=t}function Jp(n,t,e){const i=n.name,r=i.length;for(bs.lastIndex=0;;){const s=bs.exec(i),o=bs.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){qa(e,c===void 0?new Yp(a,n,t):new Zp(a,n,t));break}else{let h=e.map[a];h===void 0&&(h=new Kp(a),qa(e,h)),e=h}}}class Pr{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=t.getActiveUniform(e,r),o=t.getUniformLocation(e,s.name);Jp(s,o,this)}}setValue(t,e,i,r){const s=this.map[e];s!==void 0&&s.setValue(t,i,r)}setOptional(t,e,i){const r=e[i];r!==void 0&&this.setValue(t,i,r)}static upload(t,e,i,r){for(let s=0,o=e.length;s!==o;++s){const a=e[s],l=i[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,r)}}static seqWithValue(t,e){const i=[];for(let r=0,s=t.length;r!==s;++r){const o=t[r];o.id in e&&i.push(o)}return i}}function Ya(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const $p=37297;let jp=0;function Qp(n,t){const e=n.split(`
`),i=[],r=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let o=r;o<s;o++){const a=o+1;i.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return i.join(`
`)}const Za=new Nt;function tm(n){Xt._getMatrix(Za,Xt.workingColorSpace,n);const t=`mat3( ${Za.elements.map(e=>e.toFixed(4))} )`;switch(Xt.getTransfer(n)){case Ur:return[t,"LinearTransferOETF"];case Kt:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function Ka(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),s=(n.getShaderInfoLog(t)||"").trim();if(i&&s==="")return"";const o=/ERROR: 0:(\d+)/.exec(s);if(o){const a=parseInt(o[1]);return e.toUpperCase()+`

`+s+`

`+Qp(n.getShaderSource(t),a)}else return s}function em(n,t){const e=tm(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function nm(n,t){let e;switch(t){case Cc:e="Linear";break;case Pc:e="Reinhard";break;case Lc:e="Cineon";break;case ul:e="ACESFilmic";break;case Uc:e="AgX";break;case Ic:e="Neutral";break;case Dc:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Er=new P;function im(){Xt.getLuminanceCoefficients(Er);const n=Er.x.toFixed(4),t=Er.y.toFixed(4),e=Er.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function rm(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ii).join(`
`)}function sm(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function om(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(t,r),o=s.name;let a=1;s.type===n.FLOAT_MAT2&&(a=2),s.type===n.FLOAT_MAT3&&(a=3),s.type===n.FLOAT_MAT4&&(a=4),e[o]={type:s.type,location:n.getAttribLocation(t,o),locationSize:a}}return e}function Ii(n){return n!==""}function Ja(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function $a(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const am=/^[ \t]*#include +<([\w\d./]+)>/gm;function Mo(n){return n.replace(am,cm)}const lm=new Map;function cm(n,t){let e=Ot[t];if(e===void 0){const i=lm.get(t);if(i!==void 0)e=Ot[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return Mo(e)}const um=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ja(n){return n.replace(um,hm)}function hm(n,t,e,i){let r="";for(let s=parseInt(t);s<parseInt(e);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Qa(n){let t=`precision ${n.precision} float;
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
#define LOW_PRECISION`),t}function fm(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===al?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===ll?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===un&&(t="SHADOWMAP_TYPE_VSM"),t}function dm(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case gi:case _i:t="ENVMAP_TYPE_CUBE";break;case zr:t="ENVMAP_TYPE_CUBE_UV";break}return t}function pm(n){let t="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case _i:t="ENVMAP_MODE_REFRACTION";break}return t}function mm(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case cl:t="ENVMAP_BLENDING_MULTIPLY";break;case bc:t="ENVMAP_BLENDING_MIX";break;case Rc:t="ENVMAP_BLENDING_ADD";break}return t}function gm(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function _m(n,t,e,i){const r=n.getContext(),s=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=fm(e),c=dm(e),u=pm(e),h=mm(e),p=gm(e),d=rm(e),g=sm(s),v=r.createProgram();let m,f,M=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Ii).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Ii).join(`
`),f.length>0&&(f+=`
`)):(m=[Qa(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ii).join(`
`),f=[Qa(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",e.envMap?"#define "+h:"",p?"#define CUBEUV_TEXEL_WIDTH "+p.texelWidth:"",p?"#define CUBEUV_TEXEL_HEIGHT "+p.texelHeight:"",p?"#define CUBEUV_MAX_MIP "+p.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==En?"#define TONE_MAPPING":"",e.toneMapping!==En?Ot.tonemapping_pars_fragment:"",e.toneMapping!==En?nm("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Ot.colorspace_pars_fragment,em("linearToOutputTexel",e.outputColorSpace),im(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ii).join(`
`)),o=Mo(o),o=Ja(o,e),o=$a(o,e),a=Mo(a),a=Ja(a,e),a=$a(a,e),o=ja(o),a=ja(a),e.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",e.glslVersion===oa?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===oa?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const S=M+m+o,_=M+f+a,b=Ya(r,r.VERTEX_SHADER,S),w=Ya(r,r.FRAGMENT_SHADER,_);r.attachShader(v,b),r.attachShader(v,w),e.index0AttributeName!==void 0?r.bindAttribLocation(v,0,e.index0AttributeName):e.morphTargets===!0&&r.bindAttribLocation(v,0,"position"),r.linkProgram(v);function R(D){if(n.debug.checkShaderErrors){const F=r.getProgramInfoLog(v)||"",k=r.getShaderInfoLog(b)||"",q=r.getShaderInfoLog(w)||"",W=F.trim(),X=k.trim(),J=q.trim();let H=!0,st=!0;if(r.getProgramParameter(v,r.LINK_STATUS)===!1)if(H=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,v,b,w);else{const ht=Ka(r,b,"vertex"),Tt=Ka(r,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(v,r.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+W+`
`+ht+`
`+Tt)}else W!==""?console.warn("THREE.WebGLProgram: Program Info Log:",W):(X===""||J==="")&&(st=!1);st&&(D.diagnostics={runnable:H,programLog:W,vertexShader:{log:X,prefix:m},fragmentShader:{log:J,prefix:f}})}r.deleteShader(b),r.deleteShader(w),L=new Pr(r,v),E=om(r,v)}let L;this.getUniforms=function(){return L===void 0&&R(this),L};let E;this.getAttributes=function(){return E===void 0&&R(this),E};let T=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return T===!1&&(T=r.getProgramParameter(v,$p)),T},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=jp++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=b,this.fragmentShader=w,this}let vm=0;class xm{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,r=this._getShaderStage(e),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(t);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new Mm(t),e.set(t,i)),i}}class Mm{constructor(t){this.id=vm++,this.code=t,this.usedTimes=0}}function Sm(n,t,e,i,r,s,o){const a=new Tl,l=new xm,c=new Set,u=[],h=r.logarithmicDepthBuffer,p=r.vertexTextures;let d=r.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(E){return c.add(E),E===0?"uv":`uv${E}`}function m(E,T,D,F,k){const q=F.fog,W=k.geometry,X=E.isMeshStandardMaterial?F.environment:null,J=(E.isMeshStandardMaterial?e:t).get(E.envMap||X),H=J&&J.mapping===zr?J.image.height:null,st=g[E.type];E.precision!==null&&(d=r.getMaxPrecision(E.precision),d!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",d,"instead."));const ht=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,Tt=ht!==void 0?ht.length:0;let zt=0;W.morphAttributes.position!==void 0&&(zt=1),W.morphAttributes.normal!==void 0&&(zt=2),W.morphAttributes.color!==void 0&&(zt=3);let jt,ne,qt,Y;if(st){const Yt=je[st];jt=Yt.vertexShader,ne=Yt.fragmentShader}else jt=E.vertexShader,ne=E.fragmentShader,l.update(E),qt=l.getVertexShaderID(E),Y=l.getFragmentShaderID(E);const $=n.getRenderTarget(),pt=n.state.buffers.depth.getReversed(),Lt=k.isInstancedMesh===!0,Et=k.isBatchedMesh===!0,Ht=!!E.map,ve=!!E.matcap,C=!!J,ie=!!E.aoMap,Ut=!!E.lightMap,Ct=!!E.bumpMap,_t=!!E.normalMap,re=!!E.displacementMap,vt=!!E.emissiveMap,Ft=!!E.metalnessMap,pe=!!E.roughnessMap,ue=E.anisotropy>0,A=E.clearcoat>0,x=E.dispersion>0,O=E.iridescence>0,V=E.sheen>0,K=E.transmission>0,G=ue&&!!E.anisotropyMap,yt=A&&!!E.clearcoatMap,nt=A&&!!E.clearcoatNormalMap,xt=A&&!!E.clearcoatRoughnessMap,Mt=O&&!!E.iridescenceMap,tt=O&&!!E.iridescenceThicknessMap,lt=V&&!!E.sheenColorMap,Rt=V&&!!E.sheenRoughnessMap,St=!!E.specularMap,ot=!!E.specularColorMap,It=!!E.specularIntensityMap,U=K&&!!E.transmissionMap,et=K&&!!E.thicknessMap,it=!!E.gradientMap,dt=!!E.alphaMap,j=E.alphaTest>0,Z=!!E.alphaHash,gt=!!E.extensions;let Dt=En;E.toneMapped&&($===null||$.isXRRenderTarget===!0)&&(Dt=n.toneMapping);const Qt={shaderID:st,shaderType:E.type,shaderName:E.name,vertexShader:jt,fragmentShader:ne,defines:E.defines,customVertexShaderID:qt,customFragmentShaderID:Y,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:d,batching:Et,batchingColor:Et&&k._colorsTexture!==null,instancing:Lt,instancingColor:Lt&&k.instanceColor!==null,instancingMorph:Lt&&k.morphTexture!==null,supportsVertexTextures:p,outputColorSpace:$===null?n.outputColorSpace:$.isXRRenderTarget===!0?$.texture.colorSpace:vi,alphaToCoverage:!!E.alphaToCoverage,map:Ht,matcap:ve,envMap:C,envMapMode:C&&J.mapping,envMapCubeUVHeight:H,aoMap:ie,lightMap:Ut,bumpMap:Ct,normalMap:_t,displacementMap:p&&re,emissiveMap:vt,normalMapObjectSpace:_t&&E.normalMapType===Bc,normalMapTangentSpace:_t&&E.normalMapType===Ml,metalnessMap:Ft,roughnessMap:pe,anisotropy:ue,anisotropyMap:G,clearcoat:A,clearcoatMap:yt,clearcoatNormalMap:nt,clearcoatRoughnessMap:xt,dispersion:x,iridescence:O,iridescenceMap:Mt,iridescenceThicknessMap:tt,sheen:V,sheenColorMap:lt,sheenRoughnessMap:Rt,specularMap:St,specularColorMap:ot,specularIntensityMap:It,transmission:K,transmissionMap:U,thicknessMap:et,gradientMap:it,opaque:E.transparent===!1&&E.blending===fi&&E.alphaToCoverage===!1,alphaMap:dt,alphaTest:j,alphaHash:Z,combine:E.combine,mapUv:Ht&&v(E.map.channel),aoMapUv:ie&&v(E.aoMap.channel),lightMapUv:Ut&&v(E.lightMap.channel),bumpMapUv:Ct&&v(E.bumpMap.channel),normalMapUv:_t&&v(E.normalMap.channel),displacementMapUv:re&&v(E.displacementMap.channel),emissiveMapUv:vt&&v(E.emissiveMap.channel),metalnessMapUv:Ft&&v(E.metalnessMap.channel),roughnessMapUv:pe&&v(E.roughnessMap.channel),anisotropyMapUv:G&&v(E.anisotropyMap.channel),clearcoatMapUv:yt&&v(E.clearcoatMap.channel),clearcoatNormalMapUv:nt&&v(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:xt&&v(E.clearcoatRoughnessMap.channel),iridescenceMapUv:Mt&&v(E.iridescenceMap.channel),iridescenceThicknessMapUv:tt&&v(E.iridescenceThicknessMap.channel),sheenColorMapUv:lt&&v(E.sheenColorMap.channel),sheenRoughnessMapUv:Rt&&v(E.sheenRoughnessMap.channel),specularMapUv:St&&v(E.specularMap.channel),specularColorMapUv:ot&&v(E.specularColorMap.channel),specularIntensityMapUv:It&&v(E.specularIntensityMap.channel),transmissionMapUv:U&&v(E.transmissionMap.channel),thicknessMapUv:et&&v(E.thicknessMap.channel),alphaMapUv:dt&&v(E.alphaMap.channel),vertexTangents:!!W.attributes.tangent&&(_t||ue),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!W.attributes.uv&&(Ht||dt),fog:!!q,useFog:E.fog===!0,fogExp2:!!q&&q.isFogExp2,flatShading:E.flatShading===!0&&E.wireframe===!1,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:pt,skinning:k.isSkinnedMesh===!0,morphTargets:W.morphAttributes.position!==void 0,morphNormals:W.morphAttributes.normal!==void 0,morphColors:W.morphAttributes.color!==void 0,morphTargetsCount:Tt,morphTextureStride:zt,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:E.dithering,shadowMapEnabled:n.shadowMap.enabled&&D.length>0,shadowMapType:n.shadowMap.type,toneMapping:Dt,decodeVideoTexture:Ht&&E.map.isVideoTexture===!0&&Xt.getTransfer(E.map.colorSpace)===Kt,decodeVideoTextureEmissive:vt&&E.emissiveMap.isVideoTexture===!0&&Xt.getTransfer(E.emissiveMap.colorSpace)===Kt,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===be,flipSided:E.side===Re,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:gt&&E.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(gt&&E.extensions.multiDraw===!0||Et)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return Qt.vertexUv1s=c.has(1),Qt.vertexUv2s=c.has(2),Qt.vertexUv3s=c.has(3),c.clear(),Qt}function f(E){const T=[];if(E.shaderID?T.push(E.shaderID):(T.push(E.customVertexShaderID),T.push(E.customFragmentShaderID)),E.defines!==void 0)for(const D in E.defines)T.push(D),T.push(E.defines[D]);return E.isRawShaderMaterial===!1&&(M(T,E),S(T,E),T.push(n.outputColorSpace)),T.push(E.customProgramCacheKey),T.join()}function M(E,T){E.push(T.precision),E.push(T.outputColorSpace),E.push(T.envMapMode),E.push(T.envMapCubeUVHeight),E.push(T.mapUv),E.push(T.alphaMapUv),E.push(T.lightMapUv),E.push(T.aoMapUv),E.push(T.bumpMapUv),E.push(T.normalMapUv),E.push(T.displacementMapUv),E.push(T.emissiveMapUv),E.push(T.metalnessMapUv),E.push(T.roughnessMapUv),E.push(T.anisotropyMapUv),E.push(T.clearcoatMapUv),E.push(T.clearcoatNormalMapUv),E.push(T.clearcoatRoughnessMapUv),E.push(T.iridescenceMapUv),E.push(T.iridescenceThicknessMapUv),E.push(T.sheenColorMapUv),E.push(T.sheenRoughnessMapUv),E.push(T.specularMapUv),E.push(T.specularColorMapUv),E.push(T.specularIntensityMapUv),E.push(T.transmissionMapUv),E.push(T.thicknessMapUv),E.push(T.combine),E.push(T.fogExp2),E.push(T.sizeAttenuation),E.push(T.morphTargetsCount),E.push(T.morphAttributeCount),E.push(T.numDirLights),E.push(T.numPointLights),E.push(T.numSpotLights),E.push(T.numSpotLightMaps),E.push(T.numHemiLights),E.push(T.numRectAreaLights),E.push(T.numDirLightShadows),E.push(T.numPointLightShadows),E.push(T.numSpotLightShadows),E.push(T.numSpotLightShadowsWithMaps),E.push(T.numLightProbes),E.push(T.shadowMapType),E.push(T.toneMapping),E.push(T.numClippingPlanes),E.push(T.numClipIntersection),E.push(T.depthPacking)}function S(E,T){a.disableAll(),T.supportsVertexTextures&&a.enable(0),T.instancing&&a.enable(1),T.instancingColor&&a.enable(2),T.instancingMorph&&a.enable(3),T.matcap&&a.enable(4),T.envMap&&a.enable(5),T.normalMapObjectSpace&&a.enable(6),T.normalMapTangentSpace&&a.enable(7),T.clearcoat&&a.enable(8),T.iridescence&&a.enable(9),T.alphaTest&&a.enable(10),T.vertexColors&&a.enable(11),T.vertexAlphas&&a.enable(12),T.vertexUv1s&&a.enable(13),T.vertexUv2s&&a.enable(14),T.vertexUv3s&&a.enable(15),T.vertexTangents&&a.enable(16),T.anisotropy&&a.enable(17),T.alphaHash&&a.enable(18),T.batching&&a.enable(19),T.dispersion&&a.enable(20),T.batchingColor&&a.enable(21),T.gradientMap&&a.enable(22),E.push(a.mask),a.disableAll(),T.fog&&a.enable(0),T.useFog&&a.enable(1),T.flatShading&&a.enable(2),T.logarithmicDepthBuffer&&a.enable(3),T.reversedDepthBuffer&&a.enable(4),T.skinning&&a.enable(5),T.morphTargets&&a.enable(6),T.morphNormals&&a.enable(7),T.morphColors&&a.enable(8),T.premultipliedAlpha&&a.enable(9),T.shadowMapEnabled&&a.enable(10),T.doubleSided&&a.enable(11),T.flipSided&&a.enable(12),T.useDepthPacking&&a.enable(13),T.dithering&&a.enable(14),T.transmission&&a.enable(15),T.sheen&&a.enable(16),T.opaque&&a.enable(17),T.pointsUvs&&a.enable(18),T.decodeVideoTexture&&a.enable(19),T.decodeVideoTextureEmissive&&a.enable(20),T.alphaToCoverage&&a.enable(21),E.push(a.mask)}function _(E){const T=g[E.type];let D;if(T){const F=je[T];D=pu.clone(F.uniforms)}else D=E.uniforms;return D}function b(E,T){let D;for(let F=0,k=u.length;F<k;F++){const q=u[F];if(q.cacheKey===T){D=q,++D.usedTimes;break}}return D===void 0&&(D=new _m(n,T,E,s),u.push(D)),D}function w(E){if(--E.usedTimes===0){const T=u.indexOf(E);u[T]=u[u.length-1],u.pop(),E.destroy()}}function R(E){l.remove(E)}function L(){l.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:_,acquireProgram:b,releaseProgram:w,releaseShaderCache:R,programs:u,dispose:L}}function ym(){let n=new WeakMap;function t(o){return n.has(o)}function e(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function r(o,a,l){n.get(o)[a]=l}function s(){n=new WeakMap}return{has:t,get:e,remove:i,update:r,dispose:s}}function Em(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function tl(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function el(){const n=[];let t=0;const e=[],i=[],r=[];function s(){t=0,e.length=0,i.length=0,r.length=0}function o(h,p,d,g,v,m){let f=n[t];return f===void 0?(f={id:h.id,object:h,geometry:p,material:d,groupOrder:g,renderOrder:h.renderOrder,z:v,group:m},n[t]=f):(f.id=h.id,f.object=h,f.geometry=p,f.material=d,f.groupOrder=g,f.renderOrder=h.renderOrder,f.z=v,f.group=m),t++,f}function a(h,p,d,g,v,m){const f=o(h,p,d,g,v,m);d.transmission>0?i.push(f):d.transparent===!0?r.push(f):e.push(f)}function l(h,p,d,g,v,m){const f=o(h,p,d,g,v,m);d.transmission>0?i.unshift(f):d.transparent===!0?r.unshift(f):e.unshift(f)}function c(h,p){e.length>1&&e.sort(h||Em),i.length>1&&i.sort(p||tl),r.length>1&&r.sort(p||tl)}function u(){for(let h=t,p=n.length;h<p;h++){const d=n[h];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:i,transparent:r,init:s,push:a,unshift:l,finish:u,sort:c}}function Tm(){let n=new WeakMap;function t(i,r){const s=n.get(i);let o;return s===void 0?(o=new el,n.set(i,[o])):r>=s.length?(o=new el,s.push(o)):o=s[r],o}function e(){n=new WeakMap}return{get:t,dispose:e}}function Am(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new P,color:new Gt};break;case"SpotLight":e={position:new P,direction:new P,color:new Gt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new P,color:new Gt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new P,skyColor:new Gt,groundColor:new Gt};break;case"RectAreaLight":e={color:new Gt,position:new P,halfWidth:new P,halfHeight:new P};break}return n[t.id]=e,e}}}function wm(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ct};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ct};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ct,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let bm=0;function Rm(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function Cm(n){const t=new Am,e=wm(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new P);const r=new P,s=new se,o=new se;function a(c){let u=0,h=0,p=0;for(let E=0;E<9;E++)i.probe[E].set(0,0,0);let d=0,g=0,v=0,m=0,f=0,M=0,S=0,_=0,b=0,w=0,R=0;c.sort(Rm);for(let E=0,T=c.length;E<T;E++){const D=c[E],F=D.color,k=D.intensity,q=D.distance,W=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)u+=F.r*k,h+=F.g*k,p+=F.b*k;else if(D.isLightProbe){for(let X=0;X<9;X++)i.probe[X].addScaledVector(D.sh.coefficients[X],k);R++}else if(D.isDirectionalLight){const X=t.get(D);if(X.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const J=D.shadow,H=e.get(D);H.shadowIntensity=J.intensity,H.shadowBias=J.bias,H.shadowNormalBias=J.normalBias,H.shadowRadius=J.radius,H.shadowMapSize=J.mapSize,i.directionalShadow[d]=H,i.directionalShadowMap[d]=W,i.directionalShadowMatrix[d]=D.shadow.matrix,M++}i.directional[d]=X,d++}else if(D.isSpotLight){const X=t.get(D);X.position.setFromMatrixPosition(D.matrixWorld),X.color.copy(F).multiplyScalar(k),X.distance=q,X.coneCos=Math.cos(D.angle),X.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),X.decay=D.decay,i.spot[v]=X;const J=D.shadow;if(D.map&&(i.spotLightMap[b]=D.map,b++,J.updateMatrices(D),D.castShadow&&w++),i.spotLightMatrix[v]=J.matrix,D.castShadow){const H=e.get(D);H.shadowIntensity=J.intensity,H.shadowBias=J.bias,H.shadowNormalBias=J.normalBias,H.shadowRadius=J.radius,H.shadowMapSize=J.mapSize,i.spotShadow[v]=H,i.spotShadowMap[v]=W,_++}v++}else if(D.isRectAreaLight){const X=t.get(D);X.color.copy(F).multiplyScalar(k),X.halfWidth.set(D.width*.5,0,0),X.halfHeight.set(0,D.height*.5,0),i.rectArea[m]=X,m++}else if(D.isPointLight){const X=t.get(D);if(X.color.copy(D.color).multiplyScalar(D.intensity),X.distance=D.distance,X.decay=D.decay,D.castShadow){const J=D.shadow,H=e.get(D);H.shadowIntensity=J.intensity,H.shadowBias=J.bias,H.shadowNormalBias=J.normalBias,H.shadowRadius=J.radius,H.shadowMapSize=J.mapSize,H.shadowCameraNear=J.camera.near,H.shadowCameraFar=J.camera.far,i.pointShadow[g]=H,i.pointShadowMap[g]=W,i.pointShadowMatrix[g]=D.shadow.matrix,S++}i.point[g]=X,g++}else if(D.isHemisphereLight){const X=t.get(D);X.skyColor.copy(D.color).multiplyScalar(k),X.groundColor.copy(D.groundColor).multiplyScalar(k),i.hemi[f]=X,f++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=rt.LTC_FLOAT_1,i.rectAreaLTC2=rt.LTC_FLOAT_2):(i.rectAreaLTC1=rt.LTC_HALF_1,i.rectAreaLTC2=rt.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=h,i.ambient[2]=p;const L=i.hash;(L.directionalLength!==d||L.pointLength!==g||L.spotLength!==v||L.rectAreaLength!==m||L.hemiLength!==f||L.numDirectionalShadows!==M||L.numPointShadows!==S||L.numSpotShadows!==_||L.numSpotMaps!==b||L.numLightProbes!==R)&&(i.directional.length=d,i.spot.length=v,i.rectArea.length=m,i.point.length=g,i.hemi.length=f,i.directionalShadow.length=M,i.directionalShadowMap.length=M,i.pointShadow.length=S,i.pointShadowMap.length=S,i.spotShadow.length=_,i.spotShadowMap.length=_,i.directionalShadowMatrix.length=M,i.pointShadowMatrix.length=S,i.spotLightMatrix.length=_+b-w,i.spotLightMap.length=b,i.numSpotLightShadowsWithMaps=w,i.numLightProbes=R,L.directionalLength=d,L.pointLength=g,L.spotLength=v,L.rectAreaLength=m,L.hemiLength=f,L.numDirectionalShadows=M,L.numPointShadows=S,L.numSpotShadows=_,L.numSpotMaps=b,L.numLightProbes=R,i.version=bm++)}function l(c,u){let h=0,p=0,d=0,g=0,v=0;const m=u.matrixWorldInverse;for(let f=0,M=c.length;f<M;f++){const S=c[f];if(S.isDirectionalLight){const _=i.directional[h];_.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),_.direction.sub(r),_.direction.transformDirection(m),h++}else if(S.isSpotLight){const _=i.spot[d];_.position.setFromMatrixPosition(S.matrixWorld),_.position.applyMatrix4(m),_.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),_.direction.sub(r),_.direction.transformDirection(m),d++}else if(S.isRectAreaLight){const _=i.rectArea[g];_.position.setFromMatrixPosition(S.matrixWorld),_.position.applyMatrix4(m),o.identity(),s.copy(S.matrixWorld),s.premultiply(m),o.extractRotation(s),_.halfWidth.set(S.width*.5,0,0),_.halfHeight.set(0,S.height*.5,0),_.halfWidth.applyMatrix4(o),_.halfHeight.applyMatrix4(o),g++}else if(S.isPointLight){const _=i.point[p];_.position.setFromMatrixPosition(S.matrixWorld),_.position.applyMatrix4(m),p++}else if(S.isHemisphereLight){const _=i.hemi[v];_.direction.setFromMatrixPosition(S.matrixWorld),_.direction.transformDirection(m),v++}}}return{setup:a,setupView:l,state:i}}function nl(n){const t=new Cm(n),e=[],i=[];function r(u){c.camera=u,e.length=0,i.length=0}function s(u){e.push(u)}function o(u){i.push(u)}function a(){t.setup(e)}function l(u){t.setupView(e,u)}const c={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function Pm(n){let t=new WeakMap;function e(r,s=0){const o=t.get(r);let a;return o===void 0?(a=new nl(n),t.set(r,[a])):s>=o.length?(a=new nl(n),o.push(a)):a=o[s],a}function i(){t=new WeakMap}return{get:e,dispose:i}}const Lm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Dm=`uniform sampler2D shadow_pass;
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
}`;function Um(n,t,e){let i=new Fo;const r=new ct,s=new ct,o=new Jt,a=new th({depthPacking:Oc}),l=new eh,c={},u=e.maxTextureSize,h={[wn]:Re,[Re]:wn,[be]:be},p=new Rn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ct},radius:{value:4}},vertexShader:Lm,fragmentShader:Dm}),d=p.clone();d.defines.HORIZONTAL_PASS=1;const g=new ge;g.setAttribute("position",new ze(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Xe(g,p),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=al;let f=this.type;this.render=function(w,R,L){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;const E=n.getRenderTarget(),T=n.getActiveCubeFace(),D=n.getActiveMipmapLevel(),F=n.state;F.setBlending(yn),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const k=f!==un&&this.type===un,q=f===un&&this.type!==un;for(let W=0,X=w.length;W<X;W++){const J=w[W],H=J.shadow;if(H===void 0){console.warn("THREE.WebGLShadowMap:",J,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;r.copy(H.mapSize);const st=H.getFrameExtents();if(r.multiply(st),s.copy(H.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/st.x),r.x=s.x*st.x,H.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/st.y),r.y=s.y*st.y,H.mapSize.y=s.y)),H.map===null||k===!0||q===!0){const Tt=this.type!==un?{minFilter:qe,magFilter:qe}:{};H.map!==null&&H.map.dispose(),H.map=new Xn(r.x,r.y,Tt),H.map.texture.name=J.name+".shadowMap",H.camera.updateProjectionMatrix()}n.setRenderTarget(H.map),n.clear();const ht=H.getViewportCount();for(let Tt=0;Tt<ht;Tt++){const zt=H.getViewport(Tt);o.set(s.x*zt.x,s.y*zt.y,s.x*zt.z,s.y*zt.w),F.viewport(o),H.updateMatrices(J,Tt),i=H.getFrustum(),_(R,L,H.camera,J,this.type)}H.isPointLightShadow!==!0&&this.type===un&&M(H,L),H.needsUpdate=!1}f=this.type,m.needsUpdate=!1,n.setRenderTarget(E,T,D)};function M(w,R){const L=t.update(v);p.defines.VSM_SAMPLES!==w.blurSamples&&(p.defines.VSM_SAMPLES=w.blurSamples,d.defines.VSM_SAMPLES=w.blurSamples,p.needsUpdate=!0,d.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new Xn(r.x,r.y)),p.uniforms.shadow_pass.value=w.map.texture,p.uniforms.resolution.value=w.mapSize,p.uniforms.radius.value=w.radius,n.setRenderTarget(w.mapPass),n.clear(),n.renderBufferDirect(R,null,L,p,v,null),d.uniforms.shadow_pass.value=w.mapPass.texture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,n.setRenderTarget(w.map),n.clear(),n.renderBufferDirect(R,null,L,d,v,null)}function S(w,R,L,E){let T=null;const D=L.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(D!==void 0)T=D;else if(T=L.isPointLight===!0?l:a,n.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){const F=T.uuid,k=R.uuid;let q=c[F];q===void 0&&(q={},c[F]=q);let W=q[k];W===void 0&&(W=T.clone(),q[k]=W,R.addEventListener("dispose",b)),T=W}if(T.visible=R.visible,T.wireframe=R.wireframe,E===un?T.side=R.shadowSide!==null?R.shadowSide:R.side:T.side=R.shadowSide!==null?R.shadowSide:h[R.side],T.alphaMap=R.alphaMap,T.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,T.map=R.map,T.clipShadows=R.clipShadows,T.clippingPlanes=R.clippingPlanes,T.clipIntersection=R.clipIntersection,T.displacementMap=R.displacementMap,T.displacementScale=R.displacementScale,T.displacementBias=R.displacementBias,T.wireframeLinewidth=R.wireframeLinewidth,T.linewidth=R.linewidth,L.isPointLight===!0&&T.isMeshDistanceMaterial===!0){const F=n.properties.get(T);F.light=L}return T}function _(w,R,L,E,T){if(w.visible===!1)return;if(w.layers.test(R.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&T===un)&&(!w.frustumCulled||i.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,w.matrixWorld);const k=t.update(w),q=w.material;if(Array.isArray(q)){const W=k.groups;for(let X=0,J=W.length;X<J;X++){const H=W[X],st=q[H.materialIndex];if(st&&st.visible){const ht=S(w,st,E,T);w.onBeforeShadow(n,w,R,L,k,ht,H),n.renderBufferDirect(L,null,k,ht,w,H),w.onAfterShadow(n,w,R,L,k,ht,H)}}}else if(q.visible){const W=S(w,q,E,T);w.onBeforeShadow(n,w,R,L,k,W,null),n.renderBufferDirect(L,null,k,W,w,null),w.onAfterShadow(n,w,R,L,k,W,null)}}const F=w.children;for(let k=0,q=F.length;k<q;k++)_(F[k],R,L,E,T)}function b(w){w.target.removeEventListener("dispose",b);for(const L in c){const E=c[L],T=w.target.uuid;T in E&&(E[T].dispose(),delete E[T])}}}const Im={[Ls]:Ds,[Us]:Fs,[Is]:Os,[mi]:Ns,[Ds]:Ls,[Fs]:Us,[Os]:Is,[Ns]:mi};function Nm(n,t){function e(){let U=!1;const et=new Jt;let it=null;const dt=new Jt(0,0,0,0);return{setMask:function(j){it!==j&&!U&&(n.colorMask(j,j,j,j),it=j)},setLocked:function(j){U=j},setClear:function(j,Z,gt,Dt,Qt){Qt===!0&&(j*=Dt,Z*=Dt,gt*=Dt),et.set(j,Z,gt,Dt),dt.equals(et)===!1&&(n.clearColor(j,Z,gt,Dt),dt.copy(et))},reset:function(){U=!1,it=null,dt.set(-1,0,0,0)}}}function i(){let U=!1,et=!1,it=null,dt=null,j=null;return{setReversed:function(Z){if(et!==Z){const gt=t.get("EXT_clip_control");Z?gt.clipControlEXT(gt.LOWER_LEFT_EXT,gt.ZERO_TO_ONE_EXT):gt.clipControlEXT(gt.LOWER_LEFT_EXT,gt.NEGATIVE_ONE_TO_ONE_EXT),et=Z;const Dt=j;j=null,this.setClear(Dt)}},getReversed:function(){return et},setTest:function(Z){Z?$(n.DEPTH_TEST):pt(n.DEPTH_TEST)},setMask:function(Z){it!==Z&&!U&&(n.depthMask(Z),it=Z)},setFunc:function(Z){if(et&&(Z=Im[Z]),dt!==Z){switch(Z){case Ls:n.depthFunc(n.NEVER);break;case Ds:n.depthFunc(n.ALWAYS);break;case Us:n.depthFunc(n.LESS);break;case mi:n.depthFunc(n.LEQUAL);break;case Is:n.depthFunc(n.EQUAL);break;case Ns:n.depthFunc(n.GEQUAL);break;case Fs:n.depthFunc(n.GREATER);break;case Os:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}dt=Z}},setLocked:function(Z){U=Z},setClear:function(Z){j!==Z&&(et&&(Z=1-Z),n.clearDepth(Z),j=Z)},reset:function(){U=!1,it=null,dt=null,j=null,et=!1}}}function r(){let U=!1,et=null,it=null,dt=null,j=null,Z=null,gt=null,Dt=null,Qt=null;return{setTest:function(Yt){U||(Yt?$(n.STENCIL_TEST):pt(n.STENCIL_TEST))},setMask:function(Yt){et!==Yt&&!U&&(n.stencilMask(Yt),et=Yt)},setFunc:function(Yt,rn,Je){(it!==Yt||dt!==rn||j!==Je)&&(n.stencilFunc(Yt,rn,Je),it=Yt,dt=rn,j=Je)},setOp:function(Yt,rn,Je){(Z!==Yt||gt!==rn||Dt!==Je)&&(n.stencilOp(Yt,rn,Je),Z=Yt,gt=rn,Dt=Je)},setLocked:function(Yt){U=Yt},setClear:function(Yt){Qt!==Yt&&(n.clearStencil(Yt),Qt=Yt)},reset:function(){U=!1,et=null,it=null,dt=null,j=null,Z=null,gt=null,Dt=null,Qt=null}}}const s=new e,o=new i,a=new r,l=new WeakMap,c=new WeakMap;let u={},h={},p=new WeakMap,d=[],g=null,v=!1,m=null,f=null,M=null,S=null,_=null,b=null,w=null,R=new Gt(0,0,0),L=0,E=!1,T=null,D=null,F=null,k=null,q=null;const W=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,J=0;const H=n.getParameter(n.VERSION);H.indexOf("WebGL")!==-1?(J=parseFloat(/^WebGL (\d)/.exec(H)[1]),X=J>=1):H.indexOf("OpenGL ES")!==-1&&(J=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),X=J>=2);let st=null,ht={};const Tt=n.getParameter(n.SCISSOR_BOX),zt=n.getParameter(n.VIEWPORT),jt=new Jt().fromArray(Tt),ne=new Jt().fromArray(zt);function qt(U,et,it,dt){const j=new Uint8Array(4),Z=n.createTexture();n.bindTexture(U,Z),n.texParameteri(U,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(U,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let gt=0;gt<it;gt++)U===n.TEXTURE_3D||U===n.TEXTURE_2D_ARRAY?n.texImage3D(et,0,n.RGBA,1,1,dt,0,n.RGBA,n.UNSIGNED_BYTE,j):n.texImage2D(et+gt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,j);return Z}const Y={};Y[n.TEXTURE_2D]=qt(n.TEXTURE_2D,n.TEXTURE_2D,1),Y[n.TEXTURE_CUBE_MAP]=qt(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),Y[n.TEXTURE_2D_ARRAY]=qt(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Y[n.TEXTURE_3D]=qt(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),$(n.DEPTH_TEST),o.setFunc(mi),Ct(!1),_t(ta),$(n.CULL_FACE),ie(yn);function $(U){u[U]!==!0&&(n.enable(U),u[U]=!0)}function pt(U){u[U]!==!1&&(n.disable(U),u[U]=!1)}function Lt(U,et){return h[U]!==et?(n.bindFramebuffer(U,et),h[U]=et,U===n.DRAW_FRAMEBUFFER&&(h[n.FRAMEBUFFER]=et),U===n.FRAMEBUFFER&&(h[n.DRAW_FRAMEBUFFER]=et),!0):!1}function Et(U,et){let it=d,dt=!1;if(U){it=p.get(et),it===void 0&&(it=[],p.set(et,it));const j=U.textures;if(it.length!==j.length||it[0]!==n.COLOR_ATTACHMENT0){for(let Z=0,gt=j.length;Z<gt;Z++)it[Z]=n.COLOR_ATTACHMENT0+Z;it.length=j.length,dt=!0}}else it[0]!==n.BACK&&(it[0]=n.BACK,dt=!0);dt&&n.drawBuffers(it)}function Ht(U){return g!==U?(n.useProgram(U),g=U,!0):!1}const ve={[kn]:n.FUNC_ADD,[uc]:n.FUNC_SUBTRACT,[hc]:n.FUNC_REVERSE_SUBTRACT};ve[fc]=n.MIN,ve[dc]=n.MAX;const C={[pc]:n.ZERO,[mc]:n.ONE,[gc]:n.SRC_COLOR,[Cs]:n.SRC_ALPHA,[yc]:n.SRC_ALPHA_SATURATE,[Mc]:n.DST_COLOR,[vc]:n.DST_ALPHA,[_c]:n.ONE_MINUS_SRC_COLOR,[Ps]:n.ONE_MINUS_SRC_ALPHA,[Sc]:n.ONE_MINUS_DST_COLOR,[xc]:n.ONE_MINUS_DST_ALPHA,[Ec]:n.CONSTANT_COLOR,[Tc]:n.ONE_MINUS_CONSTANT_COLOR,[Ac]:n.CONSTANT_ALPHA,[wc]:n.ONE_MINUS_CONSTANT_ALPHA};function ie(U,et,it,dt,j,Z,gt,Dt,Qt,Yt){if(U===yn){v===!0&&(pt(n.BLEND),v=!1);return}if(v===!1&&($(n.BLEND),v=!0),U!==cc){if(U!==m||Yt!==E){if((f!==kn||_!==kn)&&(n.blendEquation(n.FUNC_ADD),f=kn,_=kn),Yt)switch(U){case fi:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case ea:n.blendFunc(n.ONE,n.ONE);break;case na:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case ia:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case fi:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case ea:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case na:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case ia:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}M=null,S=null,b=null,w=null,R.set(0,0,0),L=0,m=U,E=Yt}return}j=j||et,Z=Z||it,gt=gt||dt,(et!==f||j!==_)&&(n.blendEquationSeparate(ve[et],ve[j]),f=et,_=j),(it!==M||dt!==S||Z!==b||gt!==w)&&(n.blendFuncSeparate(C[it],C[dt],C[Z],C[gt]),M=it,S=dt,b=Z,w=gt),(Dt.equals(R)===!1||Qt!==L)&&(n.blendColor(Dt.r,Dt.g,Dt.b,Qt),R.copy(Dt),L=Qt),m=U,E=!1}function Ut(U,et){U.side===be?pt(n.CULL_FACE):$(n.CULL_FACE);let it=U.side===Re;et&&(it=!it),Ct(it),U.blending===fi&&U.transparent===!1?ie(yn):ie(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),o.setFunc(U.depthFunc),o.setTest(U.depthTest),o.setMask(U.depthWrite),s.setMask(U.colorWrite);const dt=U.stencilWrite;a.setTest(dt),dt&&(a.setMask(U.stencilWriteMask),a.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),a.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),vt(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?$(n.SAMPLE_ALPHA_TO_COVERAGE):pt(n.SAMPLE_ALPHA_TO_COVERAGE)}function Ct(U){T!==U&&(U?n.frontFace(n.CW):n.frontFace(n.CCW),T=U)}function _t(U){U!==ac?($(n.CULL_FACE),U!==D&&(U===ta?n.cullFace(n.BACK):U===lc?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):pt(n.CULL_FACE),D=U}function re(U){U!==F&&(X&&n.lineWidth(U),F=U)}function vt(U,et,it){U?($(n.POLYGON_OFFSET_FILL),(k!==et||q!==it)&&(n.polygonOffset(et,it),k=et,q=it)):pt(n.POLYGON_OFFSET_FILL)}function Ft(U){U?$(n.SCISSOR_TEST):pt(n.SCISSOR_TEST)}function pe(U){U===void 0&&(U=n.TEXTURE0+W-1),st!==U&&(n.activeTexture(U),st=U)}function ue(U,et,it){it===void 0&&(st===null?it=n.TEXTURE0+W-1:it=st);let dt=ht[it];dt===void 0&&(dt={type:void 0,texture:void 0},ht[it]=dt),(dt.type!==U||dt.texture!==et)&&(st!==it&&(n.activeTexture(it),st=it),n.bindTexture(U,et||Y[U]),dt.type=U,dt.texture=et)}function A(){const U=ht[st];U!==void 0&&U.type!==void 0&&(n.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function x(){try{n.compressedTexImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function O(){try{n.compressedTexImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function V(){try{n.texSubImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function K(){try{n.texSubImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function G(){try{n.compressedTexSubImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function yt(){try{n.compressedTexSubImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function nt(){try{n.texStorage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function xt(){try{n.texStorage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Mt(){try{n.texImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function tt(){try{n.texImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function lt(U){jt.equals(U)===!1&&(n.scissor(U.x,U.y,U.z,U.w),jt.copy(U))}function Rt(U){ne.equals(U)===!1&&(n.viewport(U.x,U.y,U.z,U.w),ne.copy(U))}function St(U,et){let it=c.get(et);it===void 0&&(it=new WeakMap,c.set(et,it));let dt=it.get(U);dt===void 0&&(dt=n.getUniformBlockIndex(et,U.name),it.set(U,dt))}function ot(U,et){const dt=c.get(et).get(U);l.get(et)!==dt&&(n.uniformBlockBinding(et,dt,U.__bindingPointIndex),l.set(et,dt))}function It(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},st=null,ht={},h={},p=new WeakMap,d=[],g=null,v=!1,m=null,f=null,M=null,S=null,_=null,b=null,w=null,R=new Gt(0,0,0),L=0,E=!1,T=null,D=null,F=null,k=null,q=null,jt.set(0,0,n.canvas.width,n.canvas.height),ne.set(0,0,n.canvas.width,n.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:$,disable:pt,bindFramebuffer:Lt,drawBuffers:Et,useProgram:Ht,setBlending:ie,setMaterial:Ut,setFlipSided:Ct,setCullFace:_t,setLineWidth:re,setPolygonOffset:vt,setScissorTest:Ft,activeTexture:pe,bindTexture:ue,unbindTexture:A,compressedTexImage2D:x,compressedTexImage3D:O,texImage2D:Mt,texImage3D:tt,updateUBOMapping:St,uniformBlockBinding:ot,texStorage2D:nt,texStorage3D:xt,texSubImage2D:V,texSubImage3D:K,compressedTexSubImage2D:G,compressedTexSubImage3D:yt,scissor:lt,viewport:Rt,reset:It}}function Fm(n,t,e,i,r,s,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ct,u=new WeakMap;let h;const p=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(A,x){return d?new OffscreenCanvas(A,x):Nr("canvas")}function v(A,x,O){let V=1;const K=ue(A);if((K.width>O||K.height>O)&&(V=O/Math.max(K.width,K.height)),V<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const G=Math.floor(V*K.width),yt=Math.floor(V*K.height);h===void 0&&(h=g(G,yt));const nt=x?g(G,yt):h;return nt.width=G,nt.height=yt,nt.getContext("2d").drawImage(A,0,0,G,yt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+G+"x"+yt+")."),nt}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),A;return A}function m(A){return A.generateMipmaps}function f(A){n.generateMipmap(A)}function M(A){return A.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?n.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function S(A,x,O,V,K=!1){if(A!==null){if(n[A]!==void 0)return n[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let G=x;if(x===n.RED&&(O===n.FLOAT&&(G=n.R32F),O===n.HALF_FLOAT&&(G=n.R16F),O===n.UNSIGNED_BYTE&&(G=n.R8)),x===n.RED_INTEGER&&(O===n.UNSIGNED_BYTE&&(G=n.R8UI),O===n.UNSIGNED_SHORT&&(G=n.R16UI),O===n.UNSIGNED_INT&&(G=n.R32UI),O===n.BYTE&&(G=n.R8I),O===n.SHORT&&(G=n.R16I),O===n.INT&&(G=n.R32I)),x===n.RG&&(O===n.FLOAT&&(G=n.RG32F),O===n.HALF_FLOAT&&(G=n.RG16F),O===n.UNSIGNED_BYTE&&(G=n.RG8)),x===n.RG_INTEGER&&(O===n.UNSIGNED_BYTE&&(G=n.RG8UI),O===n.UNSIGNED_SHORT&&(G=n.RG16UI),O===n.UNSIGNED_INT&&(G=n.RG32UI),O===n.BYTE&&(G=n.RG8I),O===n.SHORT&&(G=n.RG16I),O===n.INT&&(G=n.RG32I)),x===n.RGB_INTEGER&&(O===n.UNSIGNED_BYTE&&(G=n.RGB8UI),O===n.UNSIGNED_SHORT&&(G=n.RGB16UI),O===n.UNSIGNED_INT&&(G=n.RGB32UI),O===n.BYTE&&(G=n.RGB8I),O===n.SHORT&&(G=n.RGB16I),O===n.INT&&(G=n.RGB32I)),x===n.RGBA_INTEGER&&(O===n.UNSIGNED_BYTE&&(G=n.RGBA8UI),O===n.UNSIGNED_SHORT&&(G=n.RGBA16UI),O===n.UNSIGNED_INT&&(G=n.RGBA32UI),O===n.BYTE&&(G=n.RGBA8I),O===n.SHORT&&(G=n.RGBA16I),O===n.INT&&(G=n.RGBA32I)),x===n.RGB&&(O===n.UNSIGNED_INT_5_9_9_9_REV&&(G=n.RGB9_E5),O===n.UNSIGNED_INT_10F_11F_11F_REV&&(G=n.R11F_G11F_B10F)),x===n.RGBA){const yt=K?Ur:Xt.getTransfer(V);O===n.FLOAT&&(G=n.RGBA32F),O===n.HALF_FLOAT&&(G=n.RGBA16F),O===n.UNSIGNED_BYTE&&(G=yt===Kt?n.SRGB8_ALPHA8:n.RGBA8),O===n.UNSIGNED_SHORT_4_4_4_4&&(G=n.RGBA4),O===n.UNSIGNED_SHORT_5_5_5_1&&(G=n.RGB5_A1)}return(G===n.R16F||G===n.R32F||G===n.RG16F||G===n.RG32F||G===n.RGBA16F||G===n.RGBA32F)&&t.get("EXT_color_buffer_float"),G}function _(A,x){let O;return A?x===null||x===Wn||x===zi?O=n.DEPTH24_STENCIL8:x===dn?O=n.DEPTH32F_STENCIL8:x===Bi&&(O=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===Wn||x===zi?O=n.DEPTH_COMPONENT24:x===dn?O=n.DEPTH_COMPONENT32F:x===Bi&&(O=n.DEPTH_COMPONENT16),O}function b(A,x){return m(A)===!0||A.isFramebufferTexture&&A.minFilter!==qe&&A.minFilter!==Qe?Math.log2(Math.max(x.width,x.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?x.mipmaps.length:1}function w(A){const x=A.target;x.removeEventListener("dispose",w),L(x),x.isVideoTexture&&u.delete(x)}function R(A){const x=A.target;x.removeEventListener("dispose",R),T(x)}function L(A){const x=i.get(A);if(x.__webglInit===void 0)return;const O=A.source,V=p.get(O);if(V){const K=V[x.__cacheKey];K.usedTimes--,K.usedTimes===0&&E(A),Object.keys(V).length===0&&p.delete(O)}i.remove(A)}function E(A){const x=i.get(A);n.deleteTexture(x.__webglTexture);const O=A.source,V=p.get(O);delete V[x.__cacheKey],o.memory.textures--}function T(A){const x=i.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),i.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let V=0;V<6;V++){if(Array.isArray(x.__webglFramebuffer[V]))for(let K=0;K<x.__webglFramebuffer[V].length;K++)n.deleteFramebuffer(x.__webglFramebuffer[V][K]);else n.deleteFramebuffer(x.__webglFramebuffer[V]);x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer[V])}else{if(Array.isArray(x.__webglFramebuffer))for(let V=0;V<x.__webglFramebuffer.length;V++)n.deleteFramebuffer(x.__webglFramebuffer[V]);else n.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&n.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let V=0;V<x.__webglColorRenderbuffer.length;V++)x.__webglColorRenderbuffer[V]&&n.deleteRenderbuffer(x.__webglColorRenderbuffer[V]);x.__webglDepthRenderbuffer&&n.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const O=A.textures;for(let V=0,K=O.length;V<K;V++){const G=i.get(O[V]);G.__webglTexture&&(n.deleteTexture(G.__webglTexture),o.memory.textures--),i.remove(O[V])}i.remove(A)}let D=0;function F(){D=0}function k(){const A=D;return A>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+r.maxTextures),D+=1,A}function q(A){const x=[];return x.push(A.wrapS),x.push(A.wrapT),x.push(A.wrapR||0),x.push(A.magFilter),x.push(A.minFilter),x.push(A.anisotropy),x.push(A.internalFormat),x.push(A.format),x.push(A.type),x.push(A.generateMipmaps),x.push(A.premultiplyAlpha),x.push(A.flipY),x.push(A.unpackAlignment),x.push(A.colorSpace),x.join()}function W(A,x){const O=i.get(A);if(A.isVideoTexture&&Ft(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&O.__version!==A.version){const V=A.image;if(V===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(V.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Y(O,A,x);return}}else A.isExternalTexture&&(O.__webglTexture=A.sourceTexture?A.sourceTexture:null);e.bindTexture(n.TEXTURE_2D,O.__webglTexture,n.TEXTURE0+x)}function X(A,x){const O=i.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&O.__version!==A.version){Y(O,A,x);return}e.bindTexture(n.TEXTURE_2D_ARRAY,O.__webglTexture,n.TEXTURE0+x)}function J(A,x){const O=i.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&O.__version!==A.version){Y(O,A,x);return}e.bindTexture(n.TEXTURE_3D,O.__webglTexture,n.TEXTURE0+x)}function H(A,x){const O=i.get(A);if(A.version>0&&O.__version!==A.version){$(O,A,x);return}e.bindTexture(n.TEXTURE_CUBE_MAP,O.__webglTexture,n.TEXTURE0+x)}const st={[Dr]:n.REPEAT,[fn]:n.CLAMP_TO_EDGE,[ks]:n.MIRRORED_REPEAT},ht={[qe]:n.NEAREST,[Nc]:n.NEAREST_MIPMAP_NEAREST,[Qi]:n.NEAREST_MIPMAP_LINEAR,[Qe]:n.LINEAR,[Xr]:n.LINEAR_MIPMAP_NEAREST,[Gn]:n.LINEAR_MIPMAP_LINEAR},Tt={[zc]:n.NEVER,[Xc]:n.ALWAYS,[kc]:n.LESS,[Sl]:n.LEQUAL,[Hc]:n.EQUAL,[Wc]:n.GEQUAL,[Gc]:n.GREATER,[Vc]:n.NOTEQUAL};function zt(A,x){if(x.type===dn&&t.has("OES_texture_float_linear")===!1&&(x.magFilter===Qe||x.magFilter===Xr||x.magFilter===Qi||x.magFilter===Gn||x.minFilter===Qe||x.minFilter===Xr||x.minFilter===Qi||x.minFilter===Gn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(A,n.TEXTURE_WRAP_S,st[x.wrapS]),n.texParameteri(A,n.TEXTURE_WRAP_T,st[x.wrapT]),(A===n.TEXTURE_3D||A===n.TEXTURE_2D_ARRAY)&&n.texParameteri(A,n.TEXTURE_WRAP_R,st[x.wrapR]),n.texParameteri(A,n.TEXTURE_MAG_FILTER,ht[x.magFilter]),n.texParameteri(A,n.TEXTURE_MIN_FILTER,ht[x.minFilter]),x.compareFunction&&(n.texParameteri(A,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(A,n.TEXTURE_COMPARE_FUNC,Tt[x.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===qe||x.minFilter!==Qi&&x.minFilter!==Gn||x.type===dn&&t.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||i.get(x).__currentAnisotropy){const O=t.get("EXT_texture_filter_anisotropic");n.texParameterf(A,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,r.getMaxAnisotropy())),i.get(x).__currentAnisotropy=x.anisotropy}}}function jt(A,x){let O=!1;A.__webglInit===void 0&&(A.__webglInit=!0,x.addEventListener("dispose",w));const V=x.source;let K=p.get(V);K===void 0&&(K={},p.set(V,K));const G=q(x);if(G!==A.__cacheKey){K[G]===void 0&&(K[G]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,O=!0),K[G].usedTimes++;const yt=K[A.__cacheKey];yt!==void 0&&(K[A.__cacheKey].usedTimes--,yt.usedTimes===0&&E(x)),A.__cacheKey=G,A.__webglTexture=K[G].texture}return O}function ne(A,x,O){return Math.floor(Math.floor(A/O)/x)}function qt(A,x,O,V){const G=A.updateRanges;if(G.length===0)e.texSubImage2D(n.TEXTURE_2D,0,0,0,x.width,x.height,O,V,x.data);else{G.sort((tt,lt)=>tt.start-lt.start);let yt=0;for(let tt=1;tt<G.length;tt++){const lt=G[yt],Rt=G[tt],St=lt.start+lt.count,ot=ne(Rt.start,x.width,4),It=ne(lt.start,x.width,4);Rt.start<=St+1&&ot===It&&ne(Rt.start+Rt.count-1,x.width,4)===ot?lt.count=Math.max(lt.count,Rt.start+Rt.count-lt.start):(++yt,G[yt]=Rt)}G.length=yt+1;const nt=n.getParameter(n.UNPACK_ROW_LENGTH),xt=n.getParameter(n.UNPACK_SKIP_PIXELS),Mt=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,x.width);for(let tt=0,lt=G.length;tt<lt;tt++){const Rt=G[tt],St=Math.floor(Rt.start/4),ot=Math.ceil(Rt.count/4),It=St%x.width,U=Math.floor(St/x.width),et=ot,it=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,It),n.pixelStorei(n.UNPACK_SKIP_ROWS,U),e.texSubImage2D(n.TEXTURE_2D,0,It,U,et,it,O,V,x.data)}A.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,nt),n.pixelStorei(n.UNPACK_SKIP_PIXELS,xt),n.pixelStorei(n.UNPACK_SKIP_ROWS,Mt)}}function Y(A,x,O){let V=n.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(V=n.TEXTURE_2D_ARRAY),x.isData3DTexture&&(V=n.TEXTURE_3D);const K=jt(A,x),G=x.source;e.bindTexture(V,A.__webglTexture,n.TEXTURE0+O);const yt=i.get(G);if(G.version!==yt.__version||K===!0){e.activeTexture(n.TEXTURE0+O);const nt=Xt.getPrimaries(Xt.workingColorSpace),xt=x.colorSpace===hn?null:Xt.getPrimaries(x.colorSpace),Mt=x.colorSpace===hn||nt===xt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Mt);let tt=v(x.image,!1,r.maxTextureSize);tt=pe(x,tt);const lt=s.convert(x.format,x.colorSpace),Rt=s.convert(x.type);let St=S(x.internalFormat,lt,Rt,x.colorSpace,x.isVideoTexture);zt(V,x);let ot;const It=x.mipmaps,U=x.isVideoTexture!==!0,et=yt.__version===void 0||K===!0,it=G.dataReady,dt=b(x,tt);if(x.isDepthTexture)St=_(x.format===Hi,x.type),et&&(U?e.texStorage2D(n.TEXTURE_2D,1,St,tt.width,tt.height):e.texImage2D(n.TEXTURE_2D,0,St,tt.width,tt.height,0,lt,Rt,null));else if(x.isDataTexture)if(It.length>0){U&&et&&e.texStorage2D(n.TEXTURE_2D,dt,St,It[0].width,It[0].height);for(let j=0,Z=It.length;j<Z;j++)ot=It[j],U?it&&e.texSubImage2D(n.TEXTURE_2D,j,0,0,ot.width,ot.height,lt,Rt,ot.data):e.texImage2D(n.TEXTURE_2D,j,St,ot.width,ot.height,0,lt,Rt,ot.data);x.generateMipmaps=!1}else U?(et&&e.texStorage2D(n.TEXTURE_2D,dt,St,tt.width,tt.height),it&&qt(x,tt,lt,Rt)):e.texImage2D(n.TEXTURE_2D,0,St,tt.width,tt.height,0,lt,Rt,tt.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){U&&et&&e.texStorage3D(n.TEXTURE_2D_ARRAY,dt,St,It[0].width,It[0].height,tt.depth);for(let j=0,Z=It.length;j<Z;j++)if(ot=It[j],x.format!==We)if(lt!==null)if(U){if(it)if(x.layerUpdates.size>0){const gt=Da(ot.width,ot.height,x.format,x.type);for(const Dt of x.layerUpdates){const Qt=ot.data.subarray(Dt*gt/ot.data.BYTES_PER_ELEMENT,(Dt+1)*gt/ot.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,j,0,0,Dt,ot.width,ot.height,1,lt,Qt)}x.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,j,0,0,0,ot.width,ot.height,tt.depth,lt,ot.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,j,St,ot.width,ot.height,tt.depth,0,ot.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else U?it&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,j,0,0,0,ot.width,ot.height,tt.depth,lt,Rt,ot.data):e.texImage3D(n.TEXTURE_2D_ARRAY,j,St,ot.width,ot.height,tt.depth,0,lt,Rt,ot.data)}else{U&&et&&e.texStorage2D(n.TEXTURE_2D,dt,St,It[0].width,It[0].height);for(let j=0,Z=It.length;j<Z;j++)ot=It[j],x.format!==We?lt!==null?U?it&&e.compressedTexSubImage2D(n.TEXTURE_2D,j,0,0,ot.width,ot.height,lt,ot.data):e.compressedTexImage2D(n.TEXTURE_2D,j,St,ot.width,ot.height,0,ot.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):U?it&&e.texSubImage2D(n.TEXTURE_2D,j,0,0,ot.width,ot.height,lt,Rt,ot.data):e.texImage2D(n.TEXTURE_2D,j,St,ot.width,ot.height,0,lt,Rt,ot.data)}else if(x.isDataArrayTexture)if(U){if(et&&e.texStorage3D(n.TEXTURE_2D_ARRAY,dt,St,tt.width,tt.height,tt.depth),it)if(x.layerUpdates.size>0){const j=Da(tt.width,tt.height,x.format,x.type);for(const Z of x.layerUpdates){const gt=tt.data.subarray(Z*j/tt.data.BYTES_PER_ELEMENT,(Z+1)*j/tt.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,Z,tt.width,tt.height,1,lt,Rt,gt)}x.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,tt.width,tt.height,tt.depth,lt,Rt,tt.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,St,tt.width,tt.height,tt.depth,0,lt,Rt,tt.data);else if(x.isData3DTexture)U?(et&&e.texStorage3D(n.TEXTURE_3D,dt,St,tt.width,tt.height,tt.depth),it&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,tt.width,tt.height,tt.depth,lt,Rt,tt.data)):e.texImage3D(n.TEXTURE_3D,0,St,tt.width,tt.height,tt.depth,0,lt,Rt,tt.data);else if(x.isFramebufferTexture){if(et)if(U)e.texStorage2D(n.TEXTURE_2D,dt,St,tt.width,tt.height);else{let j=tt.width,Z=tt.height;for(let gt=0;gt<dt;gt++)e.texImage2D(n.TEXTURE_2D,gt,St,j,Z,0,lt,Rt,null),j>>=1,Z>>=1}}else if(It.length>0){if(U&&et){const j=ue(It[0]);e.texStorage2D(n.TEXTURE_2D,dt,St,j.width,j.height)}for(let j=0,Z=It.length;j<Z;j++)ot=It[j],U?it&&e.texSubImage2D(n.TEXTURE_2D,j,0,0,lt,Rt,ot):e.texImage2D(n.TEXTURE_2D,j,St,lt,Rt,ot);x.generateMipmaps=!1}else if(U){if(et){const j=ue(tt);e.texStorage2D(n.TEXTURE_2D,dt,St,j.width,j.height)}it&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,lt,Rt,tt)}else e.texImage2D(n.TEXTURE_2D,0,St,lt,Rt,tt);m(x)&&f(V),yt.__version=G.version,x.onUpdate&&x.onUpdate(x)}A.__version=x.version}function $(A,x,O){if(x.image.length!==6)return;const V=jt(A,x),K=x.source;e.bindTexture(n.TEXTURE_CUBE_MAP,A.__webglTexture,n.TEXTURE0+O);const G=i.get(K);if(K.version!==G.__version||V===!0){e.activeTexture(n.TEXTURE0+O);const yt=Xt.getPrimaries(Xt.workingColorSpace),nt=x.colorSpace===hn?null:Xt.getPrimaries(x.colorSpace),xt=x.colorSpace===hn||yt===nt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,xt);const Mt=x.isCompressedTexture||x.image[0].isCompressedTexture,tt=x.image[0]&&x.image[0].isDataTexture,lt=[];for(let Z=0;Z<6;Z++)!Mt&&!tt?lt[Z]=v(x.image[Z],!0,r.maxCubemapSize):lt[Z]=tt?x.image[Z].image:x.image[Z],lt[Z]=pe(x,lt[Z]);const Rt=lt[0],St=s.convert(x.format,x.colorSpace),ot=s.convert(x.type),It=S(x.internalFormat,St,ot,x.colorSpace),U=x.isVideoTexture!==!0,et=G.__version===void 0||V===!0,it=K.dataReady;let dt=b(x,Rt);zt(n.TEXTURE_CUBE_MAP,x);let j;if(Mt){U&&et&&e.texStorage2D(n.TEXTURE_CUBE_MAP,dt,It,Rt.width,Rt.height);for(let Z=0;Z<6;Z++){j=lt[Z].mipmaps;for(let gt=0;gt<j.length;gt++){const Dt=j[gt];x.format!==We?St!==null?U?it&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,gt,0,0,Dt.width,Dt.height,St,Dt.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,gt,It,Dt.width,Dt.height,0,Dt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):U?it&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,gt,0,0,Dt.width,Dt.height,St,ot,Dt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,gt,It,Dt.width,Dt.height,0,St,ot,Dt.data)}}}else{if(j=x.mipmaps,U&&et){j.length>0&&dt++;const Z=ue(lt[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,dt,It,Z.width,Z.height)}for(let Z=0;Z<6;Z++)if(tt){U?it&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,lt[Z].width,lt[Z].height,St,ot,lt[Z].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,It,lt[Z].width,lt[Z].height,0,St,ot,lt[Z].data);for(let gt=0;gt<j.length;gt++){const Qt=j[gt].image[Z].image;U?it&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,gt+1,0,0,Qt.width,Qt.height,St,ot,Qt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,gt+1,It,Qt.width,Qt.height,0,St,ot,Qt.data)}}else{U?it&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,St,ot,lt[Z]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,It,St,ot,lt[Z]);for(let gt=0;gt<j.length;gt++){const Dt=j[gt];U?it&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,gt+1,0,0,St,ot,Dt.image[Z]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,gt+1,It,St,ot,Dt.image[Z])}}}m(x)&&f(n.TEXTURE_CUBE_MAP),G.__version=K.version,x.onUpdate&&x.onUpdate(x)}A.__version=x.version}function pt(A,x,O,V,K,G){const yt=s.convert(O.format,O.colorSpace),nt=s.convert(O.type),xt=S(O.internalFormat,yt,nt,O.colorSpace),Mt=i.get(x),tt=i.get(O);if(tt.__renderTarget=x,!Mt.__hasExternalTextures){const lt=Math.max(1,x.width>>G),Rt=Math.max(1,x.height>>G);K===n.TEXTURE_3D||K===n.TEXTURE_2D_ARRAY?e.texImage3D(K,G,xt,lt,Rt,x.depth,0,yt,nt,null):e.texImage2D(K,G,xt,lt,Rt,0,yt,nt,null)}e.bindFramebuffer(n.FRAMEBUFFER,A),vt(x)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,V,K,tt.__webglTexture,0,re(x)):(K===n.TEXTURE_2D||K>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,V,K,tt.__webglTexture,G),e.bindFramebuffer(n.FRAMEBUFFER,null)}function Lt(A,x,O){if(n.bindRenderbuffer(n.RENDERBUFFER,A),x.depthBuffer){const V=x.depthTexture,K=V&&V.isDepthTexture?V.type:null,G=_(x.stencilBuffer,K),yt=x.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,nt=re(x);vt(x)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,nt,G,x.width,x.height):O?n.renderbufferStorageMultisample(n.RENDERBUFFER,nt,G,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,G,x.width,x.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,yt,n.RENDERBUFFER,A)}else{const V=x.textures;for(let K=0;K<V.length;K++){const G=V[K],yt=s.convert(G.format,G.colorSpace),nt=s.convert(G.type),xt=S(G.internalFormat,yt,nt,G.colorSpace),Mt=re(x);O&&vt(x)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Mt,xt,x.width,x.height):vt(x)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Mt,xt,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,xt,x.width,x.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Et(A,x){if(x&&x.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,A),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const V=i.get(x.depthTexture);V.__renderTarget=x,(!V.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),W(x.depthTexture,0);const K=V.__webglTexture,G=re(x);if(x.depthTexture.format===ki)vt(x)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,K,0,G):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,K,0);else if(x.depthTexture.format===Hi)vt(x)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,K,0,G):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,K,0);else throw new Error("Unknown depthTexture format")}function Ht(A){const x=i.get(A),O=A.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==A.depthTexture){const V=A.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),V){const K=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,V.removeEventListener("dispose",K)};V.addEventListener("dispose",K),x.__depthDisposeCallback=K}x.__boundDepthTexture=V}if(A.depthTexture&&!x.__autoAllocateDepthBuffer){if(O)throw new Error("target.depthTexture not supported in Cube render targets");const V=A.texture.mipmaps;V&&V.length>0?Et(x.__webglFramebuffer[0],A):Et(x.__webglFramebuffer,A)}else if(O){x.__webglDepthbuffer=[];for(let V=0;V<6;V++)if(e.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer[V]),x.__webglDepthbuffer[V]===void 0)x.__webglDepthbuffer[V]=n.createRenderbuffer(),Lt(x.__webglDepthbuffer[V],A,!1);else{const K=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,G=x.__webglDepthbuffer[V];n.bindRenderbuffer(n.RENDERBUFFER,G),n.framebufferRenderbuffer(n.FRAMEBUFFER,K,n.RENDERBUFFER,G)}}else{const V=A.texture.mipmaps;if(V&&V.length>0?e.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer[0]):e.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=n.createRenderbuffer(),Lt(x.__webglDepthbuffer,A,!1);else{const K=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,G=x.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,G),n.framebufferRenderbuffer(n.FRAMEBUFFER,K,n.RENDERBUFFER,G)}}e.bindFramebuffer(n.FRAMEBUFFER,null)}function ve(A,x,O){const V=i.get(A);x!==void 0&&pt(V.__webglFramebuffer,A,A.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),O!==void 0&&Ht(A)}function C(A){const x=A.texture,O=i.get(A),V=i.get(x);A.addEventListener("dispose",R);const K=A.textures,G=A.isWebGLCubeRenderTarget===!0,yt=K.length>1;if(yt||(V.__webglTexture===void 0&&(V.__webglTexture=n.createTexture()),V.__version=x.version,o.memory.textures++),G){O.__webglFramebuffer=[];for(let nt=0;nt<6;nt++)if(x.mipmaps&&x.mipmaps.length>0){O.__webglFramebuffer[nt]=[];for(let xt=0;xt<x.mipmaps.length;xt++)O.__webglFramebuffer[nt][xt]=n.createFramebuffer()}else O.__webglFramebuffer[nt]=n.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){O.__webglFramebuffer=[];for(let nt=0;nt<x.mipmaps.length;nt++)O.__webglFramebuffer[nt]=n.createFramebuffer()}else O.__webglFramebuffer=n.createFramebuffer();if(yt)for(let nt=0,xt=K.length;nt<xt;nt++){const Mt=i.get(K[nt]);Mt.__webglTexture===void 0&&(Mt.__webglTexture=n.createTexture(),o.memory.textures++)}if(A.samples>0&&vt(A)===!1){O.__webglMultisampledFramebuffer=n.createFramebuffer(),O.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let nt=0;nt<K.length;nt++){const xt=K[nt];O.__webglColorRenderbuffer[nt]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,O.__webglColorRenderbuffer[nt]);const Mt=s.convert(xt.format,xt.colorSpace),tt=s.convert(xt.type),lt=S(xt.internalFormat,Mt,tt,xt.colorSpace,A.isXRRenderTarget===!0),Rt=re(A);n.renderbufferStorageMultisample(n.RENDERBUFFER,Rt,lt,A.width,A.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+nt,n.RENDERBUFFER,O.__webglColorRenderbuffer[nt])}n.bindRenderbuffer(n.RENDERBUFFER,null),A.depthBuffer&&(O.__webglDepthRenderbuffer=n.createRenderbuffer(),Lt(O.__webglDepthRenderbuffer,A,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(G){e.bindTexture(n.TEXTURE_CUBE_MAP,V.__webglTexture),zt(n.TEXTURE_CUBE_MAP,x);for(let nt=0;nt<6;nt++)if(x.mipmaps&&x.mipmaps.length>0)for(let xt=0;xt<x.mipmaps.length;xt++)pt(O.__webglFramebuffer[nt][xt],A,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,xt);else pt(O.__webglFramebuffer[nt],A,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0);m(x)&&f(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(yt){for(let nt=0,xt=K.length;nt<xt;nt++){const Mt=K[nt],tt=i.get(Mt);let lt=n.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(lt=A.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(lt,tt.__webglTexture),zt(lt,Mt),pt(O.__webglFramebuffer,A,Mt,n.COLOR_ATTACHMENT0+nt,lt,0),m(Mt)&&f(lt)}e.unbindTexture()}else{let nt=n.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(nt=A.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(nt,V.__webglTexture),zt(nt,x),x.mipmaps&&x.mipmaps.length>0)for(let xt=0;xt<x.mipmaps.length;xt++)pt(O.__webglFramebuffer[xt],A,x,n.COLOR_ATTACHMENT0,nt,xt);else pt(O.__webglFramebuffer,A,x,n.COLOR_ATTACHMENT0,nt,0);m(x)&&f(nt),e.unbindTexture()}A.depthBuffer&&Ht(A)}function ie(A){const x=A.textures;for(let O=0,V=x.length;O<V;O++){const K=x[O];if(m(K)){const G=M(A),yt=i.get(K).__webglTexture;e.bindTexture(G,yt),f(G),e.unbindTexture()}}}const Ut=[],Ct=[];function _t(A){if(A.samples>0){if(vt(A)===!1){const x=A.textures,O=A.width,V=A.height;let K=n.COLOR_BUFFER_BIT;const G=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,yt=i.get(A),nt=x.length>1;if(nt)for(let Mt=0;Mt<x.length;Mt++)e.bindFramebuffer(n.FRAMEBUFFER,yt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Mt,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,yt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Mt,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,yt.__webglMultisampledFramebuffer);const xt=A.texture.mipmaps;xt&&xt.length>0?e.bindFramebuffer(n.DRAW_FRAMEBUFFER,yt.__webglFramebuffer[0]):e.bindFramebuffer(n.DRAW_FRAMEBUFFER,yt.__webglFramebuffer);for(let Mt=0;Mt<x.length;Mt++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(K|=n.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(K|=n.STENCIL_BUFFER_BIT)),nt){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,yt.__webglColorRenderbuffer[Mt]);const tt=i.get(x[Mt]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,tt,0)}n.blitFramebuffer(0,0,O,V,0,0,O,V,K,n.NEAREST),l===!0&&(Ut.length=0,Ct.length=0,Ut.push(n.COLOR_ATTACHMENT0+Mt),A.depthBuffer&&A.resolveDepthBuffer===!1&&(Ut.push(G),Ct.push(G),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Ct)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Ut))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),nt)for(let Mt=0;Mt<x.length;Mt++){e.bindFramebuffer(n.FRAMEBUFFER,yt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Mt,n.RENDERBUFFER,yt.__webglColorRenderbuffer[Mt]);const tt=i.get(x[Mt]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,yt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Mt,n.TEXTURE_2D,tt,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,yt.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&l){const x=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[x])}}}function re(A){return Math.min(r.maxSamples,A.samples)}function vt(A){const x=i.get(A);return A.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function Ft(A){const x=o.render.frame;u.get(A)!==x&&(u.set(A,x),A.update())}function pe(A,x){const O=A.colorSpace,V=A.format,K=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||O!==vi&&O!==hn&&(Xt.getTransfer(O)===Kt?(V!==We||K!==en)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",O)),x}function ue(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=k,this.resetTextureUnits=F,this.setTexture2D=W,this.setTexture2DArray=X,this.setTexture3D=J,this.setTextureCube=H,this.rebindTextures=ve,this.setupRenderTarget=C,this.updateRenderTargetMipmap=ie,this.updateMultisampleRenderTarget=_t,this.setupDepthRenderbuffer=Ht,this.setupFrameBufferTexture=pt,this.useMultisampledRTT=vt}function Om(n,t){function e(i,r=hn){let s;const o=Xt.getTransfer(r);if(i===en)return n.UNSIGNED_BYTE;if(i===Ro)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Co)return n.UNSIGNED_SHORT_5_5_5_1;if(i===pl)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===ml)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===fl)return n.BYTE;if(i===dl)return n.SHORT;if(i===Bi)return n.UNSIGNED_SHORT;if(i===bo)return n.INT;if(i===Wn)return n.UNSIGNED_INT;if(i===dn)return n.FLOAT;if(i===Yi)return n.HALF_FLOAT;if(i===gl)return n.ALPHA;if(i===_l)return n.RGB;if(i===We)return n.RGBA;if(i===ki)return n.DEPTH_COMPONENT;if(i===Hi)return n.DEPTH_STENCIL;if(i===vl)return n.RED;if(i===Po)return n.RED_INTEGER;if(i===xl)return n.RG;if(i===Lo)return n.RG_INTEGER;if(i===Do)return n.RGBA_INTEGER;if(i===wr||i===br||i===Rr||i===Cr)if(o===Kt)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===wr)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===br)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Rr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Cr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===wr)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===br)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Rr)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Cr)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Hs||i===Gs||i===Vs||i===Ws)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Hs)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Gs)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Vs)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Ws)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Xs||i===qs||i===Ys)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Xs||i===qs)return o===Kt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Ys)return o===Kt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Zs||i===Ks||i===Js||i===$s||i===js||i===Qs||i===to||i===eo||i===no||i===io||i===ro||i===so||i===oo||i===ao)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Zs)return o===Kt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Ks)return o===Kt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Js)return o===Kt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===$s)return o===Kt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===js)return o===Kt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Qs)return o===Kt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===to)return o===Kt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===eo)return o===Kt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===no)return o===Kt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===io)return o===Kt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===ro)return o===Kt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===so)return o===Kt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===oo)return o===Kt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===ao)return o===Kt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===lo||i===co||i===uo)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(i===lo)return o===Kt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===co)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===uo)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===ho||i===fo||i===po||i===mo)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(i===ho)return s.COMPRESSED_RED_RGTC1_EXT;if(i===fo)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===po)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===mo)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===zi?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}const Bm=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,zm=`
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

}`;class km{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const i=new Il(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new Rn({vertexShader:Bm,fragmentShader:zm,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Xe(new Yn(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Hm extends Si{constructor(t,e){super();const i=this;let r=null,s=1,o=null,a="local-floor",l=1,c=null,u=null,h=null,p=null,d=null,g=null;const v=typeof XRWebGLBinding<"u",m=new km,f={},M=e.getContextAttributes();let S=null,_=null;const b=[],w=[],R=new ct;let L=null;const E=new Ue;E.viewport=new Jt;const T=new Ue;T.viewport=new Jt;const D=[E,T],F=new oh;let k=null,q=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let $=b[Y];return $===void 0&&($=new ps,b[Y]=$),$.getTargetRaySpace()},this.getControllerGrip=function(Y){let $=b[Y];return $===void 0&&($=new ps,b[Y]=$),$.getGripSpace()},this.getHand=function(Y){let $=b[Y];return $===void 0&&($=new ps,b[Y]=$),$.getHandSpace()};function W(Y){const $=w.indexOf(Y.inputSource);if($===-1)return;const pt=b[$];pt!==void 0&&(pt.update(Y.inputSource,Y.frame,c||o),pt.dispatchEvent({type:Y.type,data:Y.inputSource}))}function X(){r.removeEventListener("select",W),r.removeEventListener("selectstart",W),r.removeEventListener("selectend",W),r.removeEventListener("squeeze",W),r.removeEventListener("squeezestart",W),r.removeEventListener("squeezeend",W),r.removeEventListener("end",X),r.removeEventListener("inputsourceschange",J);for(let Y=0;Y<b.length;Y++){const $=w[Y];$!==null&&(w[Y]=null,b[Y].disconnect($))}k=null,q=null,m.reset();for(const Y in f)delete f[Y];t.setRenderTarget(S),d=null,p=null,h=null,r=null,_=null,qt.stop(),i.isPresenting=!1,t.setPixelRatio(L),t.setSize(R.width,R.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){s=Y,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){a=Y,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(Y){c=Y},this.getBaseLayer=function(){return p!==null?p:d},this.getBinding=function(){return h===null&&v&&(h=new XRWebGLBinding(r,e)),h},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(Y){if(r=Y,r!==null){if(S=t.getRenderTarget(),r.addEventListener("select",W),r.addEventListener("selectstart",W),r.addEventListener("selectend",W),r.addEventListener("squeeze",W),r.addEventListener("squeezestart",W),r.addEventListener("squeezeend",W),r.addEventListener("end",X),r.addEventListener("inputsourceschange",J),M.xrCompatible!==!0&&await e.makeXRCompatible(),L=t.getPixelRatio(),t.getSize(R),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let pt=null,Lt=null,Et=null;M.depth&&(Et=M.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,pt=M.stencil?Hi:ki,Lt=M.stencil?zi:Wn);const Ht={colorFormat:e.RGBA8,depthFormat:Et,scaleFactor:s};h=this.getBinding(),p=h.createProjectionLayer(Ht),r.updateRenderState({layers:[p]}),t.setPixelRatio(1),t.setSize(p.textureWidth,p.textureHeight,!1),_=new Xn(p.textureWidth,p.textureHeight,{format:We,type:en,depthTexture:new Ul(p.textureWidth,p.textureHeight,Lt,void 0,void 0,void 0,void 0,void 0,void 0,pt),stencilBuffer:M.stencil,colorSpace:t.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}else{const pt={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(r,e,pt),r.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),_=new Xn(d.framebufferWidth,d.framebufferHeight,{format:We,type:en,colorSpace:t.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),qt.setContext(r),qt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function J(Y){for(let $=0;$<Y.removed.length;$++){const pt=Y.removed[$],Lt=w.indexOf(pt);Lt>=0&&(w[Lt]=null,b[Lt].disconnect(pt))}for(let $=0;$<Y.added.length;$++){const pt=Y.added[$];let Lt=w.indexOf(pt);if(Lt===-1){for(let Ht=0;Ht<b.length;Ht++)if(Ht>=w.length){w.push(pt),Lt=Ht;break}else if(w[Ht]===null){w[Ht]=pt,Lt=Ht;break}if(Lt===-1)break}const Et=b[Lt];Et&&Et.connect(pt)}}const H=new P,st=new P;function ht(Y,$,pt){H.setFromMatrixPosition($.matrixWorld),st.setFromMatrixPosition(pt.matrixWorld);const Lt=H.distanceTo(st),Et=$.projectionMatrix.elements,Ht=pt.projectionMatrix.elements,ve=Et[14]/(Et[10]-1),C=Et[14]/(Et[10]+1),ie=(Et[9]+1)/Et[5],Ut=(Et[9]-1)/Et[5],Ct=(Et[8]-1)/Et[0],_t=(Ht[8]+1)/Ht[0],re=ve*Ct,vt=ve*_t,Ft=Lt/(-Ct+_t),pe=Ft*-Ct;if($.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(pe),Y.translateZ(Ft),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),Et[10]===-1)Y.projectionMatrix.copy($.projectionMatrix),Y.projectionMatrixInverse.copy($.projectionMatrixInverse);else{const ue=ve+Ft,A=C+Ft,x=re-pe,O=vt+(Lt-pe),V=ie*C/A*ue,K=Ut*C/A*ue;Y.projectionMatrix.makePerspective(x,O,V,K,ue,A),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function Tt(Y,$){$===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices($.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(r===null)return;let $=Y.near,pt=Y.far;m.texture!==null&&(m.depthNear>0&&($=m.depthNear),m.depthFar>0&&(pt=m.depthFar)),F.near=T.near=E.near=$,F.far=T.far=E.far=pt,(k!==F.near||q!==F.far)&&(r.updateRenderState({depthNear:F.near,depthFar:F.far}),k=F.near,q=F.far),F.layers.mask=Y.layers.mask|6,E.layers.mask=F.layers.mask&3,T.layers.mask=F.layers.mask&5;const Lt=Y.parent,Et=F.cameras;Tt(F,Lt);for(let Ht=0;Ht<Et.length;Ht++)Tt(Et[Ht],Lt);Et.length===2?ht(F,E,T):F.projectionMatrix.copy(E.projectionMatrix),zt(Y,F,Lt)};function zt(Y,$,pt){pt===null?Y.matrix.copy($.matrixWorld):(Y.matrix.copy(pt.matrixWorld),Y.matrix.invert(),Y.matrix.multiply($.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy($.projectionMatrix),Y.projectionMatrixInverse.copy($.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=go*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return F},this.getFoveation=function(){if(!(p===null&&d===null))return l},this.setFoveation=function(Y){l=Y,p!==null&&(p.fixedFoveation=Y),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=Y)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(F)},this.getCameraTexture=function(Y){return f[Y]};let jt=null;function ne(Y,$){if(u=$.getViewerPose(c||o),g=$,u!==null){const pt=u.views;d!==null&&(t.setRenderTargetFramebuffer(_,d.framebuffer),t.setRenderTarget(_));let Lt=!1;pt.length!==F.cameras.length&&(F.cameras.length=0,Lt=!0);for(let C=0;C<pt.length;C++){const ie=pt[C];let Ut=null;if(d!==null)Ut=d.getViewport(ie);else{const _t=h.getViewSubImage(p,ie);Ut=_t.viewport,C===0&&(t.setRenderTargetTextures(_,_t.colorTexture,_t.depthStencilTexture),t.setRenderTarget(_))}let Ct=D[C];Ct===void 0&&(Ct=new Ue,Ct.layers.enable(C),Ct.viewport=new Jt,D[C]=Ct),Ct.matrix.fromArray(ie.transform.matrix),Ct.matrix.decompose(Ct.position,Ct.quaternion,Ct.scale),Ct.projectionMatrix.fromArray(ie.projectionMatrix),Ct.projectionMatrixInverse.copy(Ct.projectionMatrix).invert(),Ct.viewport.set(Ut.x,Ut.y,Ut.width,Ut.height),C===0&&(F.matrix.copy(Ct.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale)),Lt===!0&&F.cameras.push(Ct)}const Et=r.enabledFeatures;if(Et&&Et.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&v){h=i.getBinding();const C=h.getDepthInformation(pt[0]);C&&C.isValid&&C.texture&&m.init(C,r.renderState)}if(Et&&Et.includes("camera-access")&&v){t.state.unbindTexture(),h=i.getBinding();for(let C=0;C<pt.length;C++){const ie=pt[C].camera;if(ie){let Ut=f[ie];Ut||(Ut=new Il,f[ie]=Ut);const Ct=h.getCameraImage(ie);Ut.sourceTexture=Ct}}}}for(let pt=0;pt<b.length;pt++){const Lt=w[pt],Et=b[pt];Lt!==null&&Et!==void 0&&Et.update(Lt,$,c||o)}jt&&jt(Y,$),$.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:$}),g=null}const qt=new Yl;qt.setAnimationLoop(ne),this.setAnimationLoop=function(Y){jt=Y},this.dispose=function(){}}}const Fn=new Ke,Gm=new se;function Vm(n,t){function e(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function i(m,f){f.color.getRGB(m.fogColor.value,Cl(n)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function r(m,f,M,S,_){f.isMeshBasicMaterial||f.isMeshLambertMaterial?s(m,f):f.isMeshToonMaterial?(s(m,f),h(m,f)):f.isMeshPhongMaterial?(s(m,f),u(m,f)):f.isMeshStandardMaterial?(s(m,f),p(m,f),f.isMeshPhysicalMaterial&&d(m,f,_)):f.isMeshMatcapMaterial?(s(m,f),g(m,f)):f.isMeshDepthMaterial?s(m,f):f.isMeshDistanceMaterial?(s(m,f),v(m,f)):f.isMeshNormalMaterial?s(m,f):f.isLineBasicMaterial?(o(m,f),f.isLineDashedMaterial&&a(m,f)):f.isPointsMaterial?l(m,f,M,S):f.isSpriteMaterial?c(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function s(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,e(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===Re&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,e(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===Re&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,e(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,e(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,e(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const M=t.get(f),S=M.envMap,_=M.envMapRotation;S&&(m.envMap.value=S,Fn.copy(_),Fn.x*=-1,Fn.y*=-1,Fn.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(Fn.y*=-1,Fn.z*=-1),m.envMapRotation.value.setFromMatrix4(Gm.makeRotationFromEuler(Fn)),m.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,e(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,e(f.aoMap,m.aoMapTransform))}function o(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform))}function a(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function l(m,f,M,S){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*M,m.scale.value=S*.5,f.map&&(m.map.value=f.map,e(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function c(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function u(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function h(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function p(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,e(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,e(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function d(m,f,M){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,e(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,e(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,e(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,e(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,e(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Re&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,e(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,e(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,e(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,e(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,e(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,e(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,e(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function v(m,f){const M=t.get(f).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function Wm(n,t,e,i){let r={},s={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(M,S){const _=S.program;i.uniformBlockBinding(M,_)}function c(M,S){let _=r[M.id];_===void 0&&(g(M),_=u(M),r[M.id]=_,M.addEventListener("dispose",m));const b=S.program;i.updateUBOMapping(M,b);const w=t.render.frame;s[M.id]!==w&&(p(M),s[M.id]=w)}function u(M){const S=h();M.__bindingPointIndex=S;const _=n.createBuffer(),b=M.__size,w=M.usage;return n.bindBuffer(n.UNIFORM_BUFFER,_),n.bufferData(n.UNIFORM_BUFFER,b,w),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,S,_),_}function h(){for(let M=0;M<a;M++)if(o.indexOf(M)===-1)return o.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function p(M){const S=r[M.id],_=M.uniforms,b=M.__cache;n.bindBuffer(n.UNIFORM_BUFFER,S);for(let w=0,R=_.length;w<R;w++){const L=Array.isArray(_[w])?_[w]:[_[w]];for(let E=0,T=L.length;E<T;E++){const D=L[E];if(d(D,w,E,b)===!0){const F=D.__offset,k=Array.isArray(D.value)?D.value:[D.value];let q=0;for(let W=0;W<k.length;W++){const X=k[W],J=v(X);typeof X=="number"||typeof X=="boolean"?(D.__data[0]=X,n.bufferSubData(n.UNIFORM_BUFFER,F+q,D.__data)):X.isMatrix3?(D.__data[0]=X.elements[0],D.__data[1]=X.elements[1],D.__data[2]=X.elements[2],D.__data[3]=0,D.__data[4]=X.elements[3],D.__data[5]=X.elements[4],D.__data[6]=X.elements[5],D.__data[7]=0,D.__data[8]=X.elements[6],D.__data[9]=X.elements[7],D.__data[10]=X.elements[8],D.__data[11]=0):(X.toArray(D.__data,q),q+=J.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,F,D.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function d(M,S,_,b){const w=M.value,R=S+"_"+_;if(b[R]===void 0)return typeof w=="number"||typeof w=="boolean"?b[R]=w:b[R]=w.clone(),!0;{const L=b[R];if(typeof w=="number"||typeof w=="boolean"){if(L!==w)return b[R]=w,!0}else if(L.equals(w)===!1)return L.copy(w),!0}return!1}function g(M){const S=M.uniforms;let _=0;const b=16;for(let R=0,L=S.length;R<L;R++){const E=Array.isArray(S[R])?S[R]:[S[R]];for(let T=0,D=E.length;T<D;T++){const F=E[T],k=Array.isArray(F.value)?F.value:[F.value];for(let q=0,W=k.length;q<W;q++){const X=k[q],J=v(X),H=_%b,st=H%J.boundary,ht=H+st;_+=st,ht!==0&&b-ht<J.storage&&(_+=b-ht),F.__data=new Float32Array(J.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=_,_+=J.storage}}}const w=_%b;return w>0&&(_+=b-w),M.__size=_,M.__cache={},this}function v(M){const S={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(S.boundary=4,S.storage=4):M.isVector2?(S.boundary=8,S.storage=8):M.isVector3||M.isColor?(S.boundary=16,S.storage=12):M.isVector4?(S.boundary=16,S.storage=16):M.isMatrix3?(S.boundary=48,S.storage=48):M.isMatrix4?(S.boundary=64,S.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),S}function m(M){const S=M.target;S.removeEventListener("dispose",m);const _=o.indexOf(S.__bindingPointIndex);o.splice(_,1),n.deleteBuffer(r[S.id]),delete r[S.id],delete s[S.id]}function f(){for(const M in r)n.deleteBuffer(r[M]);o=[],r={},s={}}return{bind:l,update:c,dispose:f}}class Xm{constructor(t={}){const{canvas:e=Yc(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:p=!1}=t;this.isWebGLRenderer=!0;let d;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=i.getContextAttributes().alpha}else d=o;const g=new Uint32Array(4),v=new Int32Array(4);let m=null,f=null;const M=[],S=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=En,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const _=this;let b=!1;this._outputColorSpace=Ee;let w=0,R=0,L=null,E=-1,T=null;const D=new Jt,F=new Jt;let k=null;const q=new Gt(0);let W=0,X=e.width,J=e.height,H=1,st=null,ht=null;const Tt=new Jt(0,0,X,J),zt=new Jt(0,0,X,J);let jt=!1;const ne=new Fo;let qt=!1,Y=!1;const $=new se,pt=new P,Lt=new Jt,Et={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ht=!1;function ve(){return L===null?H:1}let C=i;function ie(y,I){return e.getContext(y,I)}try{const y={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${wo}`),e.addEventListener("webglcontextlost",it,!1),e.addEventListener("webglcontextrestored",dt,!1),e.addEventListener("webglcontextcreationerror",j,!1),C===null){const I="webgl2";if(C=ie(I,y),C===null)throw ie(I)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(y){throw console.error("THREE.WebGLRenderer: "+y.message),y}let Ut,Ct,_t,re,vt,Ft,pe,ue,A,x,O,V,K,G,yt,nt,xt,Mt,tt,lt,Rt,St,ot,It;function U(){Ut=new ep(C),Ut.init(),St=new Om(C,Ut),Ct=new Zd(C,Ut,t,St),_t=new Nm(C,Ut),Ct.reversedDepthBuffer&&p&&_t.buffers.depth.setReversed(!0),re=new rp(C),vt=new ym,Ft=new Fm(C,Ut,_t,vt,Ct,St,re),pe=new Jd(_),ue=new tp(_),A=new ch(C),ot=new qd(C,A),x=new np(C,A,re,ot),O=new op(C,x,A,re),tt=new sp(C,Ct,Ft),nt=new Kd(vt),V=new Sm(_,pe,ue,Ut,Ct,ot,nt),K=new Vm(_,vt),G=new Tm,yt=new Pm(Ut),Mt=new Xd(_,pe,ue,_t,O,d,l),xt=new Um(_,O,Ct),It=new Wm(C,re,Ct,_t),lt=new Yd(C,Ut,re),Rt=new ip(C,Ut,re),re.programs=V.programs,_.capabilities=Ct,_.extensions=Ut,_.properties=vt,_.renderLists=G,_.shadowMap=xt,_.state=_t,_.info=re}U();const et=new Hm(_,C);this.xr=et,this.getContext=function(){return C},this.getContextAttributes=function(){return C.getContextAttributes()},this.forceContextLoss=function(){const y=Ut.get("WEBGL_lose_context");y&&y.loseContext()},this.forceContextRestore=function(){const y=Ut.get("WEBGL_lose_context");y&&y.restoreContext()},this.getPixelRatio=function(){return H},this.setPixelRatio=function(y){y!==void 0&&(H=y,this.setSize(X,J,!1))},this.getSize=function(y){return y.set(X,J)},this.setSize=function(y,I,B=!0){if(et.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}X=y,J=I,e.width=Math.floor(y*H),e.height=Math.floor(I*H),B===!0&&(e.style.width=y+"px",e.style.height=I+"px"),this.setViewport(0,0,y,I)},this.getDrawingBufferSize=function(y){return y.set(X*H,J*H).floor()},this.setDrawingBufferSize=function(y,I,B){X=y,J=I,H=B,e.width=Math.floor(y*B),e.height=Math.floor(I*B),this.setViewport(0,0,y,I)},this.getCurrentViewport=function(y){return y.copy(D)},this.getViewport=function(y){return y.copy(Tt)},this.setViewport=function(y,I,B,z){y.isVector4?Tt.set(y.x,y.y,y.z,y.w):Tt.set(y,I,B,z),_t.viewport(D.copy(Tt).multiplyScalar(H).round())},this.getScissor=function(y){return y.copy(zt)},this.setScissor=function(y,I,B,z){y.isVector4?zt.set(y.x,y.y,y.z,y.w):zt.set(y,I,B,z),_t.scissor(F.copy(zt).multiplyScalar(H).round())},this.getScissorTest=function(){return jt},this.setScissorTest=function(y){_t.setScissorTest(jt=y)},this.setOpaqueSort=function(y){st=y},this.setTransparentSort=function(y){ht=y},this.getClearColor=function(y){return y.copy(Mt.getClearColor())},this.setClearColor=function(){Mt.setClearColor(...arguments)},this.getClearAlpha=function(){return Mt.getClearAlpha()},this.setClearAlpha=function(){Mt.setClearAlpha(...arguments)},this.clear=function(y=!0,I=!0,B=!0){let z=0;if(y){let N=!1;if(L!==null){const Q=L.texture.format;N=Q===Do||Q===Lo||Q===Po}if(N){const Q=L.texture.type,at=Q===en||Q===Wn||Q===Bi||Q===zi||Q===Ro||Q===Co,mt=Mt.getClearColor(),ft=Mt.getClearAlpha(),bt=mt.r,Pt=mt.g,At=mt.b;at?(g[0]=bt,g[1]=Pt,g[2]=At,g[3]=ft,C.clearBufferuiv(C.COLOR,0,g)):(v[0]=bt,v[1]=Pt,v[2]=At,v[3]=ft,C.clearBufferiv(C.COLOR,0,v))}else z|=C.COLOR_BUFFER_BIT}I&&(z|=C.DEPTH_BUFFER_BIT),B&&(z|=C.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),C.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",it,!1),e.removeEventListener("webglcontextrestored",dt,!1),e.removeEventListener("webglcontextcreationerror",j,!1),Mt.dispose(),G.dispose(),yt.dispose(),vt.dispose(),pe.dispose(),ue.dispose(),O.dispose(),ot.dispose(),It.dispose(),V.dispose(),et.dispose(),et.removeEventListener("sessionstart",Je),et.removeEventListener("sessionend",Zo),Cn.stop()};function it(y){y.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),b=!0}function dt(){console.log("THREE.WebGLRenderer: Context Restored."),b=!1;const y=re.autoReset,I=xt.enabled,B=xt.autoUpdate,z=xt.needsUpdate,N=xt.type;U(),re.autoReset=y,xt.enabled=I,xt.autoUpdate=B,xt.needsUpdate=z,xt.type=N}function j(y){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",y.statusMessage)}function Z(y){const I=y.target;I.removeEventListener("dispose",Z),gt(I)}function gt(y){Dt(y),vt.remove(y)}function Dt(y){const I=vt.get(y).programs;I!==void 0&&(I.forEach(function(B){V.releaseProgram(B)}),y.isShaderMaterial&&V.releaseShaderCache(y))}this.renderBufferDirect=function(y,I,B,z,N,Q){I===null&&(I=Et);const at=N.isMesh&&N.matrixWorld.determinant()<0,mt=ec(y,I,B,z,N);_t.setMaterial(z,at);let ft=B.index,bt=1;if(z.wireframe===!0){if(ft=x.getWireframeAttribute(B),ft===void 0)return;bt=2}const Pt=B.drawRange,At=B.attributes.position;let kt=Pt.start*bt,Zt=(Pt.start+Pt.count)*bt;Q!==null&&(kt=Math.max(kt,Q.start*bt),Zt=Math.min(Zt,(Q.start+Q.count)*bt)),ft!==null?(kt=Math.max(kt,0),Zt=Math.min(Zt,ft.count)):At!=null&&(kt=Math.max(kt,0),Zt=Math.min(Zt,At.count));const ce=Zt-kt;if(ce<0||ce===1/0)return;ot.setup(N,z,mt,B,ft);let ee,$t=lt;if(ft!==null&&(ee=A.get(ft),$t=Rt,$t.setIndex(ee)),N.isMesh)z.wireframe===!0?(_t.setLineWidth(z.wireframeLinewidth*ve()),$t.setMode(C.LINES)):$t.setMode(C.TRIANGLES);else if(N.isLine){let wt=z.linewidth;wt===void 0&&(wt=1),_t.setLineWidth(wt*ve()),N.isLineSegments?$t.setMode(C.LINES):N.isLineLoop?$t.setMode(C.LINE_LOOP):$t.setMode(C.LINE_STRIP)}else N.isPoints?$t.setMode(C.POINTS):N.isSprite&&$t.setMode(C.TRIANGLES);if(N.isBatchedMesh)if(N._multiDrawInstances!==null)Gi("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),$t.renderMultiDrawInstances(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount,N._multiDrawInstances);else if(Ut.get("WEBGL_multi_draw"))$t.renderMultiDraw(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount);else{const wt=N._multiDrawStarts,oe=N._multiDrawCounts,Wt=N._multiDrawCount,Ce=ft?A.get(ft).bytesPerElement:1,Zn=vt.get(z).currentProgram.getUniforms();for(let Pe=0;Pe<Wt;Pe++)Zn.setValue(C,"_gl_DrawID",Pe),$t.render(wt[Pe]/Ce,oe[Pe])}else if(N.isInstancedMesh)$t.renderInstances(kt,ce,N.count);else if(B.isInstancedBufferGeometry){const wt=B._maxInstanceCount!==void 0?B._maxInstanceCount:1/0,oe=Math.min(B.instanceCount,wt);$t.renderInstances(kt,ce,oe)}else $t.render(kt,ce)};function Qt(y,I,B){y.transparent===!0&&y.side===be&&y.forceSinglePass===!1?(y.side=Re,y.needsUpdate=!0,ji(y,I,B),y.side=wn,y.needsUpdate=!0,ji(y,I,B),y.side=be):ji(y,I,B)}this.compile=function(y,I,B=null){B===null&&(B=y),f=yt.get(B),f.init(I),S.push(f),B.traverseVisible(function(N){N.isLight&&N.layers.test(I.layers)&&(f.pushLight(N),N.castShadow&&f.pushShadow(N))}),y!==B&&y.traverseVisible(function(N){N.isLight&&N.layers.test(I.layers)&&(f.pushLight(N),N.castShadow&&f.pushShadow(N))}),f.setupLights();const z=new Set;return y.traverse(function(N){if(!(N.isMesh||N.isPoints||N.isLine||N.isSprite))return;const Q=N.material;if(Q)if(Array.isArray(Q))for(let at=0;at<Q.length;at++){const mt=Q[at];Qt(mt,B,N),z.add(mt)}else Qt(Q,B,N),z.add(Q)}),f=S.pop(),z},this.compileAsync=function(y,I,B=null){const z=this.compile(y,I,B);return new Promise(N=>{function Q(){if(z.forEach(function(at){vt.get(at).currentProgram.isReady()&&z.delete(at)}),z.size===0){N(y);return}setTimeout(Q,10)}Ut.get("KHR_parallel_shader_compile")!==null?Q():setTimeout(Q,10)})};let Yt=null;function rn(y){Yt&&Yt(y)}function Je(){Cn.stop()}function Zo(){Cn.start()}const Cn=new Yl;Cn.setAnimationLoop(rn),typeof self<"u"&&Cn.setContext(self),this.setAnimationLoop=function(y){Yt=y,et.setAnimationLoop(y),y===null?Cn.stop():Cn.start()},et.addEventListener("sessionstart",Je),et.addEventListener("sessionend",Zo),this.render=function(y,I){if(I!==void 0&&I.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(b===!0)return;if(y.matrixWorldAutoUpdate===!0&&y.updateMatrixWorld(),I.parent===null&&I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),et.enabled===!0&&et.isPresenting===!0&&(et.cameraAutoUpdate===!0&&et.updateCamera(I),I=et.getCamera()),y.isScene===!0&&y.onBeforeRender(_,y,I,L),f=yt.get(y,S.length),f.init(I),S.push(f),$.multiplyMatrices(I.projectionMatrix,I.matrixWorldInverse),ne.setFromProjectionMatrix($,tn,I.reversedDepth),Y=this.localClippingEnabled,qt=nt.init(this.clippingPlanes,Y),m=G.get(y,M.length),m.init(),M.push(m),et.enabled===!0&&et.isPresenting===!0){const Q=_.xr.getDepthSensingMesh();Q!==null&&Vr(Q,I,-1/0,_.sortObjects)}Vr(y,I,0,_.sortObjects),m.finish(),_.sortObjects===!0&&m.sort(st,ht),Ht=et.enabled===!1||et.isPresenting===!1||et.hasDepthSensing()===!1,Ht&&Mt.addToRenderList(m,y),this.info.render.frame++,qt===!0&&nt.beginShadows();const B=f.state.shadowsArray;xt.render(B,y,I),qt===!0&&nt.endShadows(),this.info.autoReset===!0&&this.info.reset();const z=m.opaque,N=m.transmissive;if(f.setupLights(),I.isArrayCamera){const Q=I.cameras;if(N.length>0)for(let at=0,mt=Q.length;at<mt;at++){const ft=Q[at];Jo(z,N,y,ft)}Ht&&Mt.render(y);for(let at=0,mt=Q.length;at<mt;at++){const ft=Q[at];Ko(m,y,ft,ft.viewport)}}else N.length>0&&Jo(z,N,y,I),Ht&&Mt.render(y),Ko(m,y,I);L!==null&&R===0&&(Ft.updateMultisampleRenderTarget(L),Ft.updateRenderTargetMipmap(L)),y.isScene===!0&&y.onAfterRender(_,y,I),ot.resetDefaultState(),E=-1,T=null,S.pop(),S.length>0?(f=S[S.length-1],qt===!0&&nt.setGlobalState(_.clippingPlanes,f.state.camera)):f=null,M.pop(),M.length>0?m=M[M.length-1]:m=null};function Vr(y,I,B,z){if(y.visible===!1)return;if(y.layers.test(I.layers)){if(y.isGroup)B=y.renderOrder;else if(y.isLOD)y.autoUpdate===!0&&y.update(I);else if(y.isLight)f.pushLight(y),y.castShadow&&f.pushShadow(y);else if(y.isSprite){if(!y.frustumCulled||ne.intersectsSprite(y)){z&&Lt.setFromMatrixPosition(y.matrixWorld).applyMatrix4($);const at=O.update(y),mt=y.material;mt.visible&&m.push(y,at,mt,B,Lt.z,null)}}else if((y.isMesh||y.isLine||y.isPoints)&&(!y.frustumCulled||ne.intersectsObject(y))){const at=O.update(y),mt=y.material;if(z&&(y.boundingSphere!==void 0?(y.boundingSphere===null&&y.computeBoundingSphere(),Lt.copy(y.boundingSphere.center)):(at.boundingSphere===null&&at.computeBoundingSphere(),Lt.copy(at.boundingSphere.center)),Lt.applyMatrix4(y.matrixWorld).applyMatrix4($)),Array.isArray(mt)){const ft=at.groups;for(let bt=0,Pt=ft.length;bt<Pt;bt++){const At=ft[bt],kt=mt[At.materialIndex];kt&&kt.visible&&m.push(y,at,kt,B,Lt.z,At)}}else mt.visible&&m.push(y,at,mt,B,Lt.z,null)}}const Q=y.children;for(let at=0,mt=Q.length;at<mt;at++)Vr(Q[at],I,B,z)}function Ko(y,I,B,z){const N=y.opaque,Q=y.transmissive,at=y.transparent;f.setupLightsView(B),qt===!0&&nt.setGlobalState(_.clippingPlanes,B),z&&_t.viewport(D.copy(z)),N.length>0&&$i(N,I,B),Q.length>0&&$i(Q,I,B),at.length>0&&$i(at,I,B),_t.buffers.depth.setTest(!0),_t.buffers.depth.setMask(!0),_t.buffers.color.setMask(!0),_t.setPolygonOffset(!1)}function Jo(y,I,B,z){if((B.isScene===!0?B.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[z.id]===void 0&&(f.state.transmissionRenderTarget[z.id]=new Xn(1,1,{generateMipmaps:!0,type:Ut.has("EXT_color_buffer_half_float")||Ut.has("EXT_color_buffer_float")?Yi:en,minFilter:Gn,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Xt.workingColorSpace}));const Q=f.state.transmissionRenderTarget[z.id],at=z.viewport||D;Q.setSize(at.z*_.transmissionResolutionScale,at.w*_.transmissionResolutionScale);const mt=_.getRenderTarget(),ft=_.getActiveCubeFace(),bt=_.getActiveMipmapLevel();_.setRenderTarget(Q),_.getClearColor(q),W=_.getClearAlpha(),W<1&&_.setClearColor(16777215,.5),_.clear(),Ht&&Mt.render(B);const Pt=_.toneMapping;_.toneMapping=En;const At=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),f.setupLightsView(z),qt===!0&&nt.setGlobalState(_.clippingPlanes,z),$i(y,B,z),Ft.updateMultisampleRenderTarget(Q),Ft.updateRenderTargetMipmap(Q),Ut.has("WEBGL_multisampled_render_to_texture")===!1){let kt=!1;for(let Zt=0,ce=I.length;Zt<ce;Zt++){const ee=I[Zt],$t=ee.object,wt=ee.geometry,oe=ee.material,Wt=ee.group;if(oe.side===be&&$t.layers.test(z.layers)){const Ce=oe.side;oe.side=Re,oe.needsUpdate=!0,$o($t,B,z,wt,oe,Wt),oe.side=Ce,oe.needsUpdate=!0,kt=!0}}kt===!0&&(Ft.updateMultisampleRenderTarget(Q),Ft.updateRenderTargetMipmap(Q))}_.setRenderTarget(mt,ft,bt),_.setClearColor(q,W),At!==void 0&&(z.viewport=At),_.toneMapping=Pt}function $i(y,I,B){const z=I.isScene===!0?I.overrideMaterial:null;for(let N=0,Q=y.length;N<Q;N++){const at=y[N],mt=at.object,ft=at.geometry,bt=at.group;let Pt=at.material;Pt.allowOverride===!0&&z!==null&&(Pt=z),mt.layers.test(B.layers)&&$o(mt,I,B,ft,Pt,bt)}}function $o(y,I,B,z,N,Q){y.onBeforeRender(_,I,B,z,N,Q),y.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,y.matrixWorld),y.normalMatrix.getNormalMatrix(y.modelViewMatrix),N.onBeforeRender(_,I,B,z,y,Q),N.transparent===!0&&N.side===be&&N.forceSinglePass===!1?(N.side=Re,N.needsUpdate=!0,_.renderBufferDirect(B,I,z,N,y,Q),N.side=wn,N.needsUpdate=!0,_.renderBufferDirect(B,I,z,N,y,Q),N.side=be):_.renderBufferDirect(B,I,z,N,y,Q),y.onAfterRender(_,I,B,z,N,Q)}function ji(y,I,B){I.isScene!==!0&&(I=Et);const z=vt.get(y),N=f.state.lights,Q=f.state.shadowsArray,at=N.state.version,mt=V.getParameters(y,N.state,Q,I,B),ft=V.getProgramCacheKey(mt);let bt=z.programs;z.environment=y.isMeshStandardMaterial?I.environment:null,z.fog=I.fog,z.envMap=(y.isMeshStandardMaterial?ue:pe).get(y.envMap||z.environment),z.envMapRotation=z.environment!==null&&y.envMap===null?I.environmentRotation:y.envMapRotation,bt===void 0&&(y.addEventListener("dispose",Z),bt=new Map,z.programs=bt);let Pt=bt.get(ft);if(Pt!==void 0){if(z.currentProgram===Pt&&z.lightsStateVersion===at)return Qo(y,mt),Pt}else mt.uniforms=V.getUniforms(y),y.onBeforeCompile(mt,_),Pt=V.acquireProgram(mt,ft),bt.set(ft,Pt),z.uniforms=mt.uniforms;const At=z.uniforms;return(!y.isShaderMaterial&&!y.isRawShaderMaterial||y.clipping===!0)&&(At.clippingPlanes=nt.uniform),Qo(y,mt),z.needsLights=ic(y),z.lightsStateVersion=at,z.needsLights&&(At.ambientLightColor.value=N.state.ambient,At.lightProbe.value=N.state.probe,At.directionalLights.value=N.state.directional,At.directionalLightShadows.value=N.state.directionalShadow,At.spotLights.value=N.state.spot,At.spotLightShadows.value=N.state.spotShadow,At.rectAreaLights.value=N.state.rectArea,At.ltc_1.value=N.state.rectAreaLTC1,At.ltc_2.value=N.state.rectAreaLTC2,At.pointLights.value=N.state.point,At.pointLightShadows.value=N.state.pointShadow,At.hemisphereLights.value=N.state.hemi,At.directionalShadowMap.value=N.state.directionalShadowMap,At.directionalShadowMatrix.value=N.state.directionalShadowMatrix,At.spotShadowMap.value=N.state.spotShadowMap,At.spotLightMatrix.value=N.state.spotLightMatrix,At.spotLightMap.value=N.state.spotLightMap,At.pointShadowMap.value=N.state.pointShadowMap,At.pointShadowMatrix.value=N.state.pointShadowMatrix),z.currentProgram=Pt,z.uniformsList=null,Pt}function jo(y){if(y.uniformsList===null){const I=y.currentProgram.getUniforms();y.uniformsList=Pr.seqWithValue(I.seq,y.uniforms)}return y.uniformsList}function Qo(y,I){const B=vt.get(y);B.outputColorSpace=I.outputColorSpace,B.batching=I.batching,B.batchingColor=I.batchingColor,B.instancing=I.instancing,B.instancingColor=I.instancingColor,B.instancingMorph=I.instancingMorph,B.skinning=I.skinning,B.morphTargets=I.morphTargets,B.morphNormals=I.morphNormals,B.morphColors=I.morphColors,B.morphTargetsCount=I.morphTargetsCount,B.numClippingPlanes=I.numClippingPlanes,B.numIntersection=I.numClipIntersection,B.vertexAlphas=I.vertexAlphas,B.vertexTangents=I.vertexTangents,B.toneMapping=I.toneMapping}function ec(y,I,B,z,N){I.isScene!==!0&&(I=Et),Ft.resetTextureUnits();const Q=I.fog,at=z.isMeshStandardMaterial?I.environment:null,mt=L===null?_.outputColorSpace:L.isXRRenderTarget===!0?L.texture.colorSpace:vi,ft=(z.isMeshStandardMaterial?ue:pe).get(z.envMap||at),bt=z.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,Pt=!!B.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),At=!!B.morphAttributes.position,kt=!!B.morphAttributes.normal,Zt=!!B.morphAttributes.color;let ce=En;z.toneMapped&&(L===null||L.isXRRenderTarget===!0)&&(ce=_.toneMapping);const ee=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,$t=ee!==void 0?ee.length:0,wt=vt.get(z),oe=f.state.lights;if(qt===!0&&(Y===!0||y!==T)){const Se=y===T&&z.id===E;nt.setState(z,y,Se)}let Wt=!1;z.version===wt.__version?(wt.needsLights&&wt.lightsStateVersion!==oe.state.version||wt.outputColorSpace!==mt||N.isBatchedMesh&&wt.batching===!1||!N.isBatchedMesh&&wt.batching===!0||N.isBatchedMesh&&wt.batchingColor===!0&&N.colorTexture===null||N.isBatchedMesh&&wt.batchingColor===!1&&N.colorTexture!==null||N.isInstancedMesh&&wt.instancing===!1||!N.isInstancedMesh&&wt.instancing===!0||N.isSkinnedMesh&&wt.skinning===!1||!N.isSkinnedMesh&&wt.skinning===!0||N.isInstancedMesh&&wt.instancingColor===!0&&N.instanceColor===null||N.isInstancedMesh&&wt.instancingColor===!1&&N.instanceColor!==null||N.isInstancedMesh&&wt.instancingMorph===!0&&N.morphTexture===null||N.isInstancedMesh&&wt.instancingMorph===!1&&N.morphTexture!==null||wt.envMap!==ft||z.fog===!0&&wt.fog!==Q||wt.numClippingPlanes!==void 0&&(wt.numClippingPlanes!==nt.numPlanes||wt.numIntersection!==nt.numIntersection)||wt.vertexAlphas!==bt||wt.vertexTangents!==Pt||wt.morphTargets!==At||wt.morphNormals!==kt||wt.morphColors!==Zt||wt.toneMapping!==ce||wt.morphTargetsCount!==$t)&&(Wt=!0):(Wt=!0,wt.__version=z.version);let Ce=wt.currentProgram;Wt===!0&&(Ce=ji(z,I,N));let Zn=!1,Pe=!1,Ai=!1;const ae=Ce.getUniforms(),Ne=wt.uniforms;if(_t.useProgram(Ce.program)&&(Zn=!0,Pe=!0,Ai=!0),z.id!==E&&(E=z.id,Pe=!0),Zn||T!==y){_t.buffers.depth.getReversed()&&y.reversedDepth!==!0&&(y._reversedDepth=!0,y.updateProjectionMatrix()),ae.setValue(C,"projectionMatrix",y.projectionMatrix),ae.setValue(C,"viewMatrix",y.matrixWorldInverse);const Ae=ae.map.cameraPosition;Ae!==void 0&&Ae.setValue(C,pt.setFromMatrixPosition(y.matrixWorld)),Ct.logarithmicDepthBuffer&&ae.setValue(C,"logDepthBufFC",2/(Math.log(y.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&ae.setValue(C,"isOrthographic",y.isOrthographicCamera===!0),T!==y&&(T=y,Pe=!0,Ai=!0)}if(N.isSkinnedMesh){ae.setOptional(C,N,"bindMatrix"),ae.setOptional(C,N,"bindMatrixInverse");const Se=N.skeleton;Se&&(Se.boneTexture===null&&Se.computeBoneTexture(),ae.setValue(C,"boneTexture",Se.boneTexture,Ft))}N.isBatchedMesh&&(ae.setOptional(C,N,"batchingTexture"),ae.setValue(C,"batchingTexture",N._matricesTexture,Ft),ae.setOptional(C,N,"batchingIdTexture"),ae.setValue(C,"batchingIdTexture",N._indirectTexture,Ft),ae.setOptional(C,N,"batchingColorTexture"),N._colorsTexture!==null&&ae.setValue(C,"batchingColorTexture",N._colorsTexture,Ft));const Fe=B.morphAttributes;if((Fe.position!==void 0||Fe.normal!==void 0||Fe.color!==void 0)&&tt.update(N,B,Ce),(Pe||wt.receiveShadow!==N.receiveShadow)&&(wt.receiveShadow=N.receiveShadow,ae.setValue(C,"receiveShadow",N.receiveShadow)),z.isMeshGouraudMaterial&&z.envMap!==null&&(Ne.envMap.value=ft,Ne.flipEnvMap.value=ft.isCubeTexture&&ft.isRenderTargetTexture===!1?-1:1),z.isMeshStandardMaterial&&z.envMap===null&&I.environment!==null&&(Ne.envMapIntensity.value=I.environmentIntensity),Pe&&(ae.setValue(C,"toneMappingExposure",_.toneMappingExposure),wt.needsLights&&nc(Ne,Ai),Q&&z.fog===!0&&K.refreshFogUniforms(Ne,Q),K.refreshMaterialUniforms(Ne,z,H,J,f.state.transmissionRenderTarget[y.id]),Pr.upload(C,jo(wt),Ne,Ft)),z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(Pr.upload(C,jo(wt),Ne,Ft),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&ae.setValue(C,"center",N.center),ae.setValue(C,"modelViewMatrix",N.modelViewMatrix),ae.setValue(C,"normalMatrix",N.normalMatrix),ae.setValue(C,"modelMatrix",N.matrixWorld),z.isShaderMaterial||z.isRawShaderMaterial){const Se=z.uniformsGroups;for(let Ae=0,Wr=Se.length;Ae<Wr;Ae++){const Pn=Se[Ae];It.update(Pn,Ce),It.bind(Pn,Ce)}}return Ce}function nc(y,I){y.ambientLightColor.needsUpdate=I,y.lightProbe.needsUpdate=I,y.directionalLights.needsUpdate=I,y.directionalLightShadows.needsUpdate=I,y.pointLights.needsUpdate=I,y.pointLightShadows.needsUpdate=I,y.spotLights.needsUpdate=I,y.spotLightShadows.needsUpdate=I,y.rectAreaLights.needsUpdate=I,y.hemisphereLights.needsUpdate=I}function ic(y){return y.isMeshLambertMaterial||y.isMeshToonMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isShadowMaterial||y.isShaderMaterial&&y.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return L},this.setRenderTargetTextures=function(y,I,B){const z=vt.get(y);z.__autoAllocateDepthBuffer=y.resolveDepthBuffer===!1,z.__autoAllocateDepthBuffer===!1&&(z.__useRenderToTexture=!1),vt.get(y.texture).__webglTexture=I,vt.get(y.depthTexture).__webglTexture=z.__autoAllocateDepthBuffer?void 0:B,z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(y,I){const B=vt.get(y);B.__webglFramebuffer=I,B.__useDefaultFramebuffer=I===void 0};const rc=C.createFramebuffer();this.setRenderTarget=function(y,I=0,B=0){L=y,w=I,R=B;let z=!0,N=null,Q=!1,at=!1;if(y){const ft=vt.get(y);if(ft.__useDefaultFramebuffer!==void 0)_t.bindFramebuffer(C.FRAMEBUFFER,null),z=!1;else if(ft.__webglFramebuffer===void 0)Ft.setupRenderTarget(y);else if(ft.__hasExternalTextures)Ft.rebindTextures(y,vt.get(y.texture).__webglTexture,vt.get(y.depthTexture).__webglTexture);else if(y.depthBuffer){const At=y.depthTexture;if(ft.__boundDepthTexture!==At){if(At!==null&&vt.has(At)&&(y.width!==At.image.width||y.height!==At.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Ft.setupDepthRenderbuffer(y)}}const bt=y.texture;(bt.isData3DTexture||bt.isDataArrayTexture||bt.isCompressedArrayTexture)&&(at=!0);const Pt=vt.get(y).__webglFramebuffer;y.isWebGLCubeRenderTarget?(Array.isArray(Pt[I])?N=Pt[I][B]:N=Pt[I],Q=!0):y.samples>0&&Ft.useMultisampledRTT(y)===!1?N=vt.get(y).__webglMultisampledFramebuffer:Array.isArray(Pt)?N=Pt[B]:N=Pt,D.copy(y.viewport),F.copy(y.scissor),k=y.scissorTest}else D.copy(Tt).multiplyScalar(H).floor(),F.copy(zt).multiplyScalar(H).floor(),k=jt;if(B!==0&&(N=rc),_t.bindFramebuffer(C.FRAMEBUFFER,N)&&z&&_t.drawBuffers(y,N),_t.viewport(D),_t.scissor(F),_t.setScissorTest(k),Q){const ft=vt.get(y.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_CUBE_MAP_POSITIVE_X+I,ft.__webglTexture,B)}else if(at){const ft=I;for(let bt=0;bt<y.textures.length;bt++){const Pt=vt.get(y.textures[bt]);C.framebufferTextureLayer(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0+bt,Pt.__webglTexture,B,ft)}}else if(y!==null&&B!==0){const ft=vt.get(y.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,ft.__webglTexture,B)}E=-1},this.readRenderTargetPixels=function(y,I,B,z,N,Q,at,mt=0){if(!(y&&y.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ft=vt.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&at!==void 0&&(ft=ft[at]),ft){_t.bindFramebuffer(C.FRAMEBUFFER,ft);try{const bt=y.textures[mt],Pt=bt.format,At=bt.type;if(!Ct.textureFormatReadable(Pt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ct.textureTypeReadable(At)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}I>=0&&I<=y.width-z&&B>=0&&B<=y.height-N&&(y.textures.length>1&&C.readBuffer(C.COLOR_ATTACHMENT0+mt),C.readPixels(I,B,z,N,St.convert(Pt),St.convert(At),Q))}finally{const bt=L!==null?vt.get(L).__webglFramebuffer:null;_t.bindFramebuffer(C.FRAMEBUFFER,bt)}}},this.readRenderTargetPixelsAsync=async function(y,I,B,z,N,Q,at,mt=0){if(!(y&&y.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ft=vt.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&at!==void 0&&(ft=ft[at]),ft)if(I>=0&&I<=y.width-z&&B>=0&&B<=y.height-N){_t.bindFramebuffer(C.FRAMEBUFFER,ft);const bt=y.textures[mt],Pt=bt.format,At=bt.type;if(!Ct.textureFormatReadable(Pt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ct.textureTypeReadable(At))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const kt=C.createBuffer();C.bindBuffer(C.PIXEL_PACK_BUFFER,kt),C.bufferData(C.PIXEL_PACK_BUFFER,Q.byteLength,C.STREAM_READ),y.textures.length>1&&C.readBuffer(C.COLOR_ATTACHMENT0+mt),C.readPixels(I,B,z,N,St.convert(Pt),St.convert(At),0);const Zt=L!==null?vt.get(L).__webglFramebuffer:null;_t.bindFramebuffer(C.FRAMEBUFFER,Zt);const ce=C.fenceSync(C.SYNC_GPU_COMMANDS_COMPLETE,0);return C.flush(),await Zc(C,ce,4),C.bindBuffer(C.PIXEL_PACK_BUFFER,kt),C.getBufferSubData(C.PIXEL_PACK_BUFFER,0,Q),C.deleteBuffer(kt),C.deleteSync(ce),Q}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(y,I=null,B=0){const z=Math.pow(2,-B),N=Math.floor(y.image.width*z),Q=Math.floor(y.image.height*z),at=I!==null?I.x:0,mt=I!==null?I.y:0;Ft.setTexture2D(y,0),C.copyTexSubImage2D(C.TEXTURE_2D,B,0,0,at,mt,N,Q),_t.unbindTexture()};const sc=C.createFramebuffer(),oc=C.createFramebuffer();this.copyTextureToTexture=function(y,I,B=null,z=null,N=0,Q=null){Q===null&&(N!==0?(Gi("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),Q=N,N=0):Q=0);let at,mt,ft,bt,Pt,At,kt,Zt,ce;const ee=y.isCompressedTexture?y.mipmaps[Q]:y.image;if(B!==null)at=B.max.x-B.min.x,mt=B.max.y-B.min.y,ft=B.isBox3?B.max.z-B.min.z:1,bt=B.min.x,Pt=B.min.y,At=B.isBox3?B.min.z:0;else{const Fe=Math.pow(2,-N);at=Math.floor(ee.width*Fe),mt=Math.floor(ee.height*Fe),y.isDataArrayTexture?ft=ee.depth:y.isData3DTexture?ft=Math.floor(ee.depth*Fe):ft=1,bt=0,Pt=0,At=0}z!==null?(kt=z.x,Zt=z.y,ce=z.z):(kt=0,Zt=0,ce=0);const $t=St.convert(I.format),wt=St.convert(I.type);let oe;I.isData3DTexture?(Ft.setTexture3D(I,0),oe=C.TEXTURE_3D):I.isDataArrayTexture||I.isCompressedArrayTexture?(Ft.setTexture2DArray(I,0),oe=C.TEXTURE_2D_ARRAY):(Ft.setTexture2D(I,0),oe=C.TEXTURE_2D),C.pixelStorei(C.UNPACK_FLIP_Y_WEBGL,I.flipY),C.pixelStorei(C.UNPACK_PREMULTIPLY_ALPHA_WEBGL,I.premultiplyAlpha),C.pixelStorei(C.UNPACK_ALIGNMENT,I.unpackAlignment);const Wt=C.getParameter(C.UNPACK_ROW_LENGTH),Ce=C.getParameter(C.UNPACK_IMAGE_HEIGHT),Zn=C.getParameter(C.UNPACK_SKIP_PIXELS),Pe=C.getParameter(C.UNPACK_SKIP_ROWS),Ai=C.getParameter(C.UNPACK_SKIP_IMAGES);C.pixelStorei(C.UNPACK_ROW_LENGTH,ee.width),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,ee.height),C.pixelStorei(C.UNPACK_SKIP_PIXELS,bt),C.pixelStorei(C.UNPACK_SKIP_ROWS,Pt),C.pixelStorei(C.UNPACK_SKIP_IMAGES,At);const ae=y.isDataArrayTexture||y.isData3DTexture,Ne=I.isDataArrayTexture||I.isData3DTexture;if(y.isDepthTexture){const Fe=vt.get(y),Se=vt.get(I),Ae=vt.get(Fe.__renderTarget),Wr=vt.get(Se.__renderTarget);_t.bindFramebuffer(C.READ_FRAMEBUFFER,Ae.__webglFramebuffer),_t.bindFramebuffer(C.DRAW_FRAMEBUFFER,Wr.__webglFramebuffer);for(let Pn=0;Pn<ft;Pn++)ae&&(C.framebufferTextureLayer(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,vt.get(y).__webglTexture,N,At+Pn),C.framebufferTextureLayer(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,vt.get(I).__webglTexture,Q,ce+Pn)),C.blitFramebuffer(bt,Pt,at,mt,kt,Zt,at,mt,C.DEPTH_BUFFER_BIT,C.NEAREST);_t.bindFramebuffer(C.READ_FRAMEBUFFER,null),_t.bindFramebuffer(C.DRAW_FRAMEBUFFER,null)}else if(N!==0||y.isRenderTargetTexture||vt.has(y)){const Fe=vt.get(y),Se=vt.get(I);_t.bindFramebuffer(C.READ_FRAMEBUFFER,sc),_t.bindFramebuffer(C.DRAW_FRAMEBUFFER,oc);for(let Ae=0;Ae<ft;Ae++)ae?C.framebufferTextureLayer(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,Fe.__webglTexture,N,At+Ae):C.framebufferTexture2D(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,Fe.__webglTexture,N),Ne?C.framebufferTextureLayer(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,Se.__webglTexture,Q,ce+Ae):C.framebufferTexture2D(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,Se.__webglTexture,Q),N!==0?C.blitFramebuffer(bt,Pt,at,mt,kt,Zt,at,mt,C.COLOR_BUFFER_BIT,C.NEAREST):Ne?C.copyTexSubImage3D(oe,Q,kt,Zt,ce+Ae,bt,Pt,at,mt):C.copyTexSubImage2D(oe,Q,kt,Zt,bt,Pt,at,mt);_t.bindFramebuffer(C.READ_FRAMEBUFFER,null),_t.bindFramebuffer(C.DRAW_FRAMEBUFFER,null)}else Ne?y.isDataTexture||y.isData3DTexture?C.texSubImage3D(oe,Q,kt,Zt,ce,at,mt,ft,$t,wt,ee.data):I.isCompressedArrayTexture?C.compressedTexSubImage3D(oe,Q,kt,Zt,ce,at,mt,ft,$t,ee.data):C.texSubImage3D(oe,Q,kt,Zt,ce,at,mt,ft,$t,wt,ee):y.isDataTexture?C.texSubImage2D(C.TEXTURE_2D,Q,kt,Zt,at,mt,$t,wt,ee.data):y.isCompressedTexture?C.compressedTexSubImage2D(C.TEXTURE_2D,Q,kt,Zt,ee.width,ee.height,$t,ee.data):C.texSubImage2D(C.TEXTURE_2D,Q,kt,Zt,at,mt,$t,wt,ee);C.pixelStorei(C.UNPACK_ROW_LENGTH,Wt),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,Ce),C.pixelStorei(C.UNPACK_SKIP_PIXELS,Zn),C.pixelStorei(C.UNPACK_SKIP_ROWS,Pe),C.pixelStorei(C.UNPACK_SKIP_IMAGES,Ai),Q===0&&I.generateMipmaps&&C.generateMipmap(oe),_t.unbindTexture()},this.initRenderTarget=function(y){vt.get(y).__webglFramebuffer===void 0&&Ft.setupRenderTarget(y)},this.initTexture=function(y){y.isCubeTexture?Ft.setTextureCube(y,0):y.isData3DTexture?Ft.setTexture3D(y,0):y.isDataArrayTexture||y.isCompressedArrayTexture?Ft.setTexture2DArray(y,0):Ft.setTexture2D(y,0),_t.unbindTexture()},this.resetState=function(){w=0,R=0,L=null,_t.reset(),ot.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return tn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=Xt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Xt._getUnpackColorSpace()}}function qm(n,t=!1){const e=n[0].index!==null,i=new Set(Object.keys(n[0].attributes)),r=new Set(Object.keys(n[0].morphAttributes)),s={},o={},a=n[0].morphTargetsRelative,l=new ge;let c=0;for(let u=0;u<n.length;++u){const h=n[u];let p=0;if(e!==(h.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const d in h.attributes){if(!i.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;s[d]===void 0&&(s[d]=[]),s[d].push(h.attributes[d]),p++}if(p!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(a!==h.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const d in h.morphAttributes){if(!r.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;o[d]===void 0&&(o[d]=[]),o[d].push(h.morphAttributes[d])}if(t){let d;if(e)d=h.index.count;else if(h.attributes.position!==void 0)d=h.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,d,u),c+=d}}if(e){let u=0;const h=[];for(let p=0;p<n.length;++p){const d=n[p].index;for(let g=0;g<d.count;++g)h.push(d.getX(g)+u);u+=n[p].attributes.position.count}l.setIndex(h)}for(const u in s){const h=il(s[u]);if(!h)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;l.setAttribute(u,h)}for(const u in o){const h=o[u][0].length;if(h===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[u]=[];for(let p=0;p<h;++p){const d=[];for(let v=0;v<o[u].length;++v)d.push(o[u][v][p]);const g=il(d);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;l.morphAttributes[u].push(g)}}return l}function il(n){let t,e,i,r=-1,s=0;for(let c=0;c<n.length;++c){const u=n[c];if(t===void 0&&(t=u.array.constructor),t!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=u.itemSize),e!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=u.normalized),i!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(r===-1&&(r=u.gpuType),r!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;s+=u.count*e}const o=new t(s),a=new ze(o,e,i);let l=0;for(let c=0;c<n.length;++c){const u=n[c];if(u.isInterleavedBufferAttribute){const h=l/e;for(let p=0,d=u.count;p<d;p++)for(let g=0;g<e;g++){const v=u.getComponent(p,g);a.setComponent(p+h,g,v)}}else o.set(u.array,l);l+=u.count*e}return r!==void 0&&(a.gpuType=r),a}const Di=new P;function Be(n,t,e,i,r,s){const o=2*Math.PI*r/4,a=Math.max(s-2*r,0),l=Math.PI/4;Di.copy(t),Di[i]=0,Di.normalize();const c=.5*o/(o+a),u=1-Di.angleTo(n)/l;return Math.sign(Di[e])===1?u*c:a/(o+a)+c+c*(1-u)}class Xo extends bn{constructor(t=1,e=1,i=1,r=2,s=.1){const o=r*2+1;if(s=Math.min(t/2,e/2,i/2,s),super(1,1,1,o,o,o),this.type="RoundedBoxGeometry",this.parameters={width:t,height:e,depth:i,segments:r,radius:s},o===1)return;const a=this.toNonIndexed();this.index=null,this.attributes.position=a.attributes.position,this.attributes.normal=a.attributes.normal,this.attributes.uv=a.attributes.uv;const l=new P,c=new P,u=new P(t,e,i).divideScalar(2).subScalar(s),h=this.attributes.position.array,p=this.attributes.normal.array,d=this.attributes.uv.array,g=h.length/6,v=new P,m=.5/o;for(let f=0,M=0;f<h.length;f+=3,M+=2)switch(l.fromArray(h,f),c.copy(l),c.x-=Math.sign(c.x)*m,c.y-=Math.sign(c.y)*m,c.z-=Math.sign(c.z)*m,c.normalize(),h[f+0]=u.x*Math.sign(l.x)+c.x*s,h[f+1]=u.y*Math.sign(l.y)+c.y*s,h[f+2]=u.z*Math.sign(l.z)+c.z*s,p[f+0]=c.x,p[f+1]=c.y,p[f+2]=c.z,Math.floor(f/g)){case 0:v.set(1,0,0),d[M+0]=Be(v,c,"z","y",s,i),d[M+1]=1-Be(v,c,"y","z",s,e);break;case 1:v.set(-1,0,0),d[M+0]=1-Be(v,c,"z","y",s,i),d[M+1]=1-Be(v,c,"y","z",s,e);break;case 2:v.set(0,1,0),d[M+0]=1-Be(v,c,"x","z",s,t),d[M+1]=Be(v,c,"z","x",s,i);break;case 3:v.set(0,-1,0),d[M+0]=1-Be(v,c,"x","z",s,t),d[M+1]=1-Be(v,c,"z","x",s,i);break;case 4:v.set(0,0,1),d[M+0]=1-Be(v,c,"x","y",s,t),d[M+1]=1-Be(v,c,"y","x",s,e);break;case 5:v.set(0,0,-1),d[M+0]=Be(v,c,"x","y",s,t),d[M+1]=1-Be(v,c,"y","x",s,e);break}}static fromJSON(t){return new Xo(t.width,t.height,t.depth,t.segments,t.radius)}}const $e=n=>new P(...n),rl=new P(0,1,0);class Ym{constructor(t,e){this.scene=t,this.m=e,this.buckets=new Map,this.count=0}add(t,e,i=[0,0,0],r=[0,0,0],s=!0){const o=typeof e=="string"?this.m[e]:e,a=new Tn().setFromEuler(new Ke(...r));t.applyMatrix4(new se().compose($e(i),a,new P(1,1,1))),t.index&&(t=t.toNonIndexed()),t.attributes.normal||t.computeVertexNormals(),t.attributes.uv||t.setAttribute("uv",new ze(new Float32Array(t.attributes.position.count*2),2));for(const c of Object.keys(t.attributes))["position","normal","uv"].includes(c)||t.deleteAttribute(c);const l=o.uuid+(s?"s":"n");this.buckets.has(l)||this.buckets.set(l,{material:o,shadow:s,geometries:[]}),this.buckets.get(l).geometries.push(t),this.count++}box(t,e,i="oak",r=[0,0,0],s=!0){const o=["oak","lightWood","darkWood","teal","green","cream","redWood","endgrain"].includes(i),a=Math.min(...e),c=o&&a>.045&&e.reduce((u,h)=>u*h,1)>.002||i==="leather"&&a>.09?new Xo(...e,1,i==="leather"?.018:Math.min(.004,a*.06)):new bn(...e);if(o){const u=c.attributes.position,h=c.attributes.normal,p=c.attributes.uv,d=((t[0]*3.7+t[2]*1.13)%1+1)%1,g=((t[1]*2.1+t[2]*.47)%1+1)%1;for(let v=0;v<u.count;v++){const m=Math.abs(h.getX(v))>.5?0:Math.abs(h.getY(v))>.5?1:2,f=[0,1,2].filter(b=>b!==m),M=e[f[0]]>e[f[1]]?f[0]:f[1],S=f.find(b=>b!==M),_=[u.getX(v),u.getY(v),u.getZ(v)];p.setXY(v,(_[S]+e[S]/2)/.24+d,(_[M]+e[M]/2)/1.7+g)}}this.add(c,i,t,r,s)}cylinder(t,e,i,r="oak",s=12,o=[0,0,0],a=e,l=!0){this.add(new Or(a,e,i,s,1),r,t,o,l)}sphere(t,e,i="stone",r=1){const s=new ko(1,r);s.scale(...e),this.add(s,i,t)}torus(t,e,i,r="iron",s=[0,0,0],o=6,a=24){this.add(new Hr(e,i,o,a),r,t,s)}beam(t,e,i,r,s="oak"){const o=$e(e).sub($e(t)),a=new Tn().setFromUnitVectors(rl,o.clone().normalize()),l=new bn(i,o.length(),r);l.applyQuaternion(a),this.add(l,s,$e(t).add($e(e)).multiplyScalar(.5).toArray())}rod(t,e,i,r="iron",s=8){const o=$e(e).sub($e(t)),a=new Tn().setFromUnitVectors(rl,o.clone().normalize()),l=new Or(i,i,o.length(),s);l.applyQuaternion(a),this.add(l,r,$e(t).add($e(e)).multiplyScalar(.5).toArray())}plane(t,e,i,r=[0,0,0],s=!1){this.add(new Yn(...e),i,t,r,s)}lathe(t,e,i="ceramic",r=[0,0,0],s=16){this.add(new Ho(e.map(o=>new ct(...o)),s),i,t,r)}finish(){let t=0;for(const{material:e,shadow:i,geometries:r}of this.buckets.values()){const s=qm(r,!1);if(!s)throw new Error("Incompatible geometry in static batch");s.computeBoundingSphere();const o=new Xe(s,e);o.castShadow=i,o.receiveShadow=!0,o.matrixAutoUpdate=!1,this.scene.add(o),t+=s.attributes.position.count;for(const a of r)a.dispose()}return{authoredParts:this.count,materialBatches:this.buckets.size,vertices:t}}}function Ye(n,t,e,i="rope",r=24){n.add(new Go(new Nl(t.map($e)),r,e,5,!1),i)}function Zm(n,{x1:t,x2:e,z1:i,z2:r,y1:s,y2:o,material:a,strip:l=!1}){const u=l?1:12,h=new Yn(1,1,8,u),p=h.attributes.position;for(let d=0;d<p.count;d++){const g=p.getX(d)+.5,v=p.getY(d)+.5,m=t+(e-t)*g,f=r+(i-r)*v,M=Math.sin(g*Math.PI)*.055+Math.sin(v*Math.PI*2)*.014;p.setXYZ(d,m,s+(o-s)*g-M,f)}h.computeVertexNormals(),n.add(h,a)}function Vn(n){return()=>{n|=0,n=n+1831565813|0;let t=Math.imul(n^n>>>15,1|n);return t^=t+Math.imul(t^t>>>7,61|t),((t^t>>>14)>>>0)/4294967296}}function An(n,t=512){const e=document.createElement("canvas");e.width=e.height=t,n(e.getContext("2d"),t);const i=new Dl(e);return i.colorSpace=Ee,i.wrapS=i.wrapT=Dr,i.anisotropy=4,i}function Km(n,t,e=1){return An((i,r)=>{const s=Vn(e);i.fillStyle=n,i.fillRect(0,0,r,r);for(let o=0;o<750;o++){const a=s()*r,l=s()*r,c=.3+s()*1.5,u=20+s()*350;i.strokeStyle=s()>.55?"rgba(30,22,12,.08)":"rgba(255,229,173,.06)",i.lineWidth=c,i.beginPath(),i.moveTo(a,l),i.bezierCurveTo(a+7,l+u*.3,a-6,l+u*.65,a+3,l+u),i.stroke()}for(let o=0;o<95;o++){const a=s()*r,l=s()*r;i.fillStyle=t,i.globalAlpha=.14+s()*.35,i.beginPath(),i.ellipse(a,l,.6+s()*2,2+s()*24,s()*.15,0,Math.PI*2),i.fill()}i.globalAlpha=1;for(let o=0;o<4;o++){const a=s()*r,l=s()*r;i.strokeStyle="rgba(20,18,10,.1)",i.lineWidth=1;for(let c=1;c<6;c++)i.beginPath(),i.ellipse(a,l,c*2,c*6,0,0,Math.PI*2),i.stroke()}})}function ci(n,t=7){return An((e,i)=>{const r=Vn(t);e.fillStyle=n,e.fillRect(0,0,i,i);for(let s=0;s<i;s+=3)e.strokeStyle="rgba(255,246,208,.1)",e.lineWidth=.7,e.beginPath(),e.moveTo(s,0),e.lineTo(s,i),e.stroke();for(let s=0;s<i;s+=3)e.strokeStyle="rgba(29,28,19,.08)",e.beginPath(),e.moveTo(0,s),e.lineTo(i,s),e.stroke();for(let s=0;s<1800;s++)e.fillStyle=r()>.5?"rgba(255,245,208,.055)":"rgba(22,25,16,.04)",e.fillRect(r()*i,r()*i,2,2)})}function Jm(){const n=(s,o=.8,a={})=>new Ei({color:s,roughness:o,...a}),t=(s,o,a)=>{const l=Km(s,o,a);return n(16777215,.88,{map:l,bumpMap:l,bumpScale:.011})},e={oak:t("#9f7448","#d4b380",1),lightWood:t("#bf975f","#e0c490",2),darkWood:t("#604534","#a88050",3),teal:t("#315d58","#a98754",5),green:t("#55634a","#c4a06b",6),cream:t("#ddcbae","#8c674a",8),redWood:t("#875043","#c19669",13),endgrain:t("#957351","#c7a672",12),canvas:n(16777215,.98,{map:ci("#dfca9f")}),awningGreen:n(16777215,.98,{map:ci("#66765b",10)}),blanket:n(16777215,.96,{map:ci("#9b5245",9)}),linen:n(16777215,.97,{map:ci("#d9c8a5",4)}),cushion:n(16777215,.94,{map:ci("#596b69",11)}),rug:n(16777215,.98,{map:ci("#aa7954",15)}),iron:n("#383d3a",.67,{metalness:.66}),brass:n("#ae8850",.47,{metalness:.72}),copper:n("#a26842",.42,{metalness:.7}),leather:n(16777215,.9,{map:An((s,o)=>{s.fillStyle="#755039",s.fillRect(0,0,o,o);const a=Vn(14);for(let l=0;l<6e3;l++)s.fillStyle=l%2?"#ffffff0b":"#00000011",s.fillRect(a()*o,a()*o,1+a()*2,1+a()*2)})}),ceramic:n("#b8c8b5",.4),blueCeramic:n("#476969",.4),terracotta:n("#a96e4e",.87),jar:n("#5e8173",.33,{metalness:.13}),amber:n("#967442",.31,{metalness:.08}),paper:n("#ddc7a0",.96),chalk:n("#e2d7b6",.9),board:n("#2a3831",.98),rope:n("#bbaa7c",1),soil:n("#80775a",1),path:n("#9a8867",1),stone:n("#7d8271",1),darkStone:n("#575d51",1),grass:n("#717854",1),grassGold:n("#9d9663",1),leaf:n("#697556",.98,{side:be}),soot:n("#292923",1),coal:n("#493d2a",1),wax:n("#e3ca90",.83),glass:n("#b8d9cd",.12,{transparent:!0,opacity:.2,depthWrite:!1}),glow:n("#ffe1a1",.4,{emissive:"#ffc773",emissiveIntensity:1.3})};e.grass.side=e.grassGold.side=be;const i=e.blanket.map.image.getContext("2d");for(const s of[28,48,464,484])i.fillStyle=s===48||s===464?"#536c5e":"#d7c296",i.fillRect(0,s,512,6);i.strokeStyle="#d7c296",i.lineWidth=2;for(let s=0;s<512;s+=24)i.beginPath(),i.moveTo(s,79),i.lineTo(s+8,68),i.lineTo(s+16,79),i.stroke(),i.beginPath(),i.moveTo(s,432),i.lineTo(s+8,443),i.lineTo(s+16,432),i.stroke();e.blanket.map.needsUpdate=!0;for(const s of["canvas","awningGreen","blanket","linen","cushion","rug","leather"])e[s].bumpMap=e[s].map,e[s].bumpScale=s==="leather"?.003:.006;const r=An((s,o)=>{const a=Vn(801);s.fillStyle="#9c9c9c",s.fillRect(0,0,o,o);for(let l=0;l<550;l++){s.strokeStyle=a()>.5?"#b4b4b4":"#7d7d7d",s.lineWidth=.4+a(),s.beginPath();const c=a()*o,u=a()*o;s.moveTo(c,u),s.lineTo(c+a()*25,u+a()*3),s.stroke()}},256);return r.colorSpace=hn,e.iron.roughness=.92,e.iron.roughnessMap=r,e.iron.bumpMap=r,e.iron.bumpScale=.003,e.path.map=An((s,o)=>{const a=Vn(711);s.fillStyle="#9a8867",s.fillRect(0,0,o,o);for(let l=0;l<7e3;l++)s.fillStyle=a()>.5?"rgba(223,205,166,.13)":"rgba(75,67,44,.1)",s.fillRect(a()*o,a()*o,1+a()*3,1+a()*3)}),e.path.color.set("#ffffff"),e.path.map.repeat.set(9,9),e.path.bumpMap=e.path.map,e.path.bumpScale=.012,e}function So(n,{background:t="#2b4841",color:e="#e6d3a2",font:i="Georgia",size:r=54,lines:s=[],border:o=!0,width:a=1024,height:l=512}={}){const c=document.createElement("canvas");c.width=a,c.height=l;const u=c.getContext("2d");u.fillStyle=t,u.fillRect(0,0,a,l),o&&(u.strokeStyle=e,u.lineWidth=3,u.strokeRect(22,22,a-44,l-44),u.lineWidth=1,u.strokeRect(31,31,a-62,l-62)),u.fillStyle=e,u.textAlign="center",u.textBaseline="middle",u.font=`${r}px ${i}`;const h=s.length?s:[n],p=r*1.48;h.forEach((g,v)=>u.fillText(g,a/2,l/2+(v-(h.length-1)/2)*p,a-70));const d=new Dl(c);return d.colorSpace=Ee,d.anisotropy=4,new Ei({map:d,roughness:.9})}function $m(){const n=An((t,e)=>{const i=Vn(88);t.fillStyle="#858069",t.fillRect(0,0,e,e);for(let r=0;r<16e3;r++){const s=Math.floor(90+i()*70);t.fillStyle=`rgba(${s},${s-4},${s-22},.22)`,t.fillRect(i()*e,i()*e,1+i()*4,1+i()*4)}},512);return n.repeat.set(15,15),new Ei({map:n,color:"#c0b28f",roughness:1})}function jm(){const n=An((t,e)=>{t.fillStyle="#d6c49a",t.fillRect(0,0,e,e),t.fillStyle="#b8c7b2",t.fillRect(22,25,e-44,e*.67),t.fillStyle="#718979",t.beginPath(),t.moveTo(22,e*.41),t.quadraticCurveTo(e*.22,e*.12,e*.45,e*.44),t.quadraticCurveTo(e*.7,e*.18,e-22,e*.36),t.lineTo(e-22,e*.68),t.lineTo(22,e*.68),t.fill(),t.fillStyle="#4b6d63",t.beginPath(),t.moveTo(22,e*.52),t.quadraticCurveTo(e*.46,e*.3,e-22,e*.53),t.lineTo(e-22,e*.69),t.lineTo(22,e*.69),t.fill(),t.fillStyle="#8eada0",t.fillRect(22,e*.58,e-44,e*.14),t.fillStyle="#d2b379",t.fillRect(e*.64,e*.44,e*.14,e*.12),t.fillStyle="#7e5142",t.beginPath(),t.moveTo(e*.62,e*.44),t.lineTo(e*.71,e*.37),t.lineTo(e*.8,e*.44),t.fill(),t.fillStyle="#f1db9c",t.fillRect(e*.69,e*.47,e*.035,e*.048),t.fillStyle="#e8d7ae",t.beginPath(),t.arc(e*.25,e*.23,e*.065,0,Math.PI*2),t.fill(),t.fillStyle="#4c5d47",t.font="28px Georgia",t.textAlign="center",t.fillText("Back by harvest — M.",e/2,e*.84),t.font="17px Georgia",t.fillText("A small place by the long road",e/2,e*.92)});return n.wrapS=n.wrapT=fn,new Ei({map:n,roughness:.97})}function Qm(){const n=An((t,e)=>{t.fillStyle="#d9caa4",t.fillRect(0,0,e,e),t.strokeStyle="#6a927f",t.lineWidth=15,t.beginPath(),t.moveTo(e*.7,0),t.bezierCurveTo(e*.9,e*.45,e*.25,e*.4,e*.43,e),t.stroke();const i=Vn(151);for(let r=0;r<34;r++){const s=i()*e,o=i()*e;t.fillStyle="#8a9770",t.beginPath(),t.moveTo(s,o-10),t.lineTo(s+8,o+9),t.lineTo(s-8,o+9),t.fill()}t.setLineDash([5,6]),t.strokeStyle="#99664c",t.lineWidth=2,t.beginPath(),t.moveTo(e*.15,e*.8),t.bezierCurveTo(e*.12,e*.2,e*.8,e*.5,e*.75,e*.2),t.stroke(),t.setLineDash([]),t.fillStyle="#5b6149",t.font="24px Georgia",t.fillText("THE LONG WAY HOME",30,42);for(const[r,s,o]of[[.15,.8,"MILL"],[.47,.46,"FERRY"],[.75,.2,"HOME"]])t.fillStyle="#885c43",t.fillRect(r*e-5,s*e-5,10,10),t.font="18px Georgia",t.fillText(o,r*e+10,s*e+6);t.strokeStyle="#8f8969",t.lineWidth=2,t.strokeRect(15,15,e-30,e-30)});return n.wrapS=n.wrapT=fn,new Ei({map:n,roughness:.96})}const t0=.96,Rs=1.62,e0=.22,yo=.205,On={x:5.25,y:0,z:6.1,yaw:.65,pitch:-.065},qo=[{x1:-1.44,x2:1.44,z1:-2.94,z2:3.1,y:t0,name:"wagon"}];for(let n=0;n<5;n++)qo.push({x1:-.64,x2:.64,z1:4.7-(n+1)*.32,z2:4.7-n*.32,y:(n+1)*.192,name:`step-${n+1}`});const jl=[],te=(n,t,e,i,r,s,o)=>jl.push({name:n,x1:t,x2:e,z1:i,z2:r,y1:s,y2:o});te("left wagon wall",-1.57,-1.44,-3.05,3.07,.8,3.35);te("home right wall",1.44,1.57,.13,3.07,.8,3.35);te("shop sill",1.44,1.59,-3.05,.13,.8,1.4);te("shopfront front jamb",1.44,1.61,-2.74,-2.6,1.32,3.12);te("front wall",-1.57,1.57,-3.07,-2.94,.8,3.35);te("rear left door jamb",-1.57,-.62,2.94,3.07,.8,3.35);te("rear right door jamb",.62,1.57,2.94,3.07,.8,3.35);te("bed & fitted drawers",-1.42,-.57,.86,2.88,.96,1.57);te("folded table",.91,1.43,1.1,2.04,.96,1.83);te("stove & hearth",.86,1.43,2.16,2.85,.96,2.11);te("wardrobe",-1.42,-.91,.25,.77,.96,2.92);te("workshop cupboard",-1.42,-.92,-2.88,.13,.96,2.98);te("workbench",.72,1.43,-2.84,-.1,.96,1.86);te("end wall storage",-.93,.72,-2.88,-2.53,.96,2.6);te("left stair rail",-.77,-.65,3.14,4.74,0,1.95);te("right stair rail",.65,.77,3.14,4.74,0,1.95);te("open door",-1.38,-.65,3.08,4.14,.9,3.02);te("shop counter",1.53,2.55,-2.65,.08,0,1.46);te("awning front post",3.16,3.28,-2.77,-2.65,0,2.9);te("awning rear post",3.16,3.28,.1,.22,0,2.9);te("camp stool",3.78,4.24,2.4,2.85,0,.48);te("camp trunk",2.35,3.08,3.48,3.98,0,.52);te("camp fire",3.8,4.75,3.57,4.5,0,.38);for(const n of[-1.69,1.69])for(const t of[-1.91,1.92])te("wheel",n-.18,n+.18,t-.7,t+.7,0,1.36);for(const n of[-1.91,1.92])te("axle",-1.72,1.72,n-.09,n+.09,.51,.69);te("drawbar",-.16,.16,-5.04,-3.06,.28,.64);function Eo(n,t,e=0,i=yo){let r=0;for(const s of qo)n>=s.x1&&n<=s.x2&&t>=s.z1&&t<=s.z2&&s.y<=e+i+1e-4&&(r=Math.max(r,s.y));return r}function sl(n,t){let e=0;for(const i of qo)n>=i.x1&&n<=i.x2&&t>=i.z1&&t<=i.z2&&(e=Math.max(e,i.y));return e}function Tr(n,t,e,i=e0){if(Math.abs(n)>10.5||t>10.5||t<-9.5)return!0;for(const r of jl){if(e+.05>=r.y2||e+1.78<=r.y1)continue;const s=Math.max(r.x1,Math.min(n,r.x2)),o=Math.max(r.z1,Math.min(t,r.z2)),a=n-s,l=t-o;if(a*a+l*l<i*i-1e-8)return!0}return!1}function n0(n,t,e){const i=Math.max(1,Math.ceil(Math.hypot(t,e)/.055));for(let r=0;r<i;r++){const s=n.x+t/i;if(sl(s,n.z)<=n.y+yo+1e-4&&!Tr(s,n.z,n.y)){const a=Eo(s,n.z,n.y);Tr(s,n.z,Math.max(n.y,a))||(n.x=s,a>n.y&&(n.y=a))}const o=n.z+e/i;if(sl(n.x,o)<=n.y+yo+1e-4&&!Tr(n.x,o,n.y)){const a=Eo(n.x,o,n.y);Tr(n.x,o,Math.max(n.y,a))||(n.z=o,a>n.y&&(n.y=a))}}return n}function i0(n){return n.y>.8&&Math.abs(n.x)<1.48&&n.z<3.1?n.z>.2?"THE TINY HOME":"THE WORKSHOP":n.x>1.5&&n.x<3.8&&n.z<.6&&n.z>-3.2?"THE OPEN SHOP":Math.abs(n.x)<.65&&n.z>3.1&&n.z<4.7?"THE STEPS":"THE CAMP"}const ut=Math.PI;function Ie(n,t,e,i="oak",r="z",s=.19,o=.008){const a=r==="x"?0:r==="y"?1:2,l=Math.ceil(e[a]/s),c=e[a]/l;for(let u=0;u<l;u++){const h=[...t],p=[...e];h[a]+=-e[a]/2+c*(u+.5),p[a]=c-o,n.box(h,p,i)}}function Ze(n,t,e="x",i="iron",r=.017){n.cylinder(t,r,.012,i,8,e==="x"?[0,0,ut/2]:e==="z"?[ut/2,0,0]:[0,0,0])}function pi(n,t,e,i,r="front",s="brass",o=.15){if(r==="side"){n.rod([t,e,i-o/2],[t,e,i+o/2],.015,s);for(const a of[-o/2,o/2])n.rod([t-.04,e,i+a],[t,e,i+a],.012,s),Ze(n,[t-.038,e,i+a],"x",s,.025)}else{n.rod([t-o/2,e,i],[t+o/2,e,i],.015,s);for(const a of[-o/2,o/2])n.rod([t+a,e,i-.04],[t+a,e,i],.012,s),Ze(n,[t+a,e,i-.042],"z",s,.025)}}function mn(n,t,e,i,r=[0,0,0],s={}){const o=So(i,{size:64,width:512,height:256,border:!1,...s});return n.plane(t,e,o,r),o}function Ql(n,t,e,i,r=1,s="jar"){const o=[[0,0],[.071,0],[.084,.026],[.082,.19],[.066,.23],[.033,.255],[.031,.32],[.037,.324],[.037,.343],[.027,.347],[.027,.32]].map(([a,l])=>[a*r,l*r]);n.lathe([t,e,i],o,s),n.cylinder([t,e+.351*r,i],.027*r,.031*r,"rope",10)}function To(n,t,e,i,r=1,s="ceramic",o="darkWood"){n.lathe([t,e,i],[[0,0],[.1,0],[.113,.025],[.117,.18],[.1,.205],[.099,.23],[.087,.234],[.087,.205],[.102,.18]].map(([a,l])=>[a*r,l*r]),s),n.cylinder([t,e+.245*r,i],.112*r,.035*r,o,16),n.cylinder([t,e+.273*r,i],.023*r,.022*r,o,10)}function qi(n,t,e,i,r=1,s="ceramic"){n.lathe([t,e,i],[[0,0],[.06,.005],[.08,.028],[.13,.08],[.145,.135],[.151,.14],[.137,.145],[.12,.082],[.069,.035],[.053,.018],[0,.018]].map(([o,a])=>[o*r,a*r]),s),n.torus([t,e+.143*r,i],.145*r,.004*r,s==="blueCeramic"?"ceramic":s,[ut/2,0,0],4,20)}function r0(n,t,e,i,r=1,s="blueCeramic"){n.lathe([t,e,i],[[0,0],[.055,0],[.065,.018],[.066,.126],[.06,.14],[.052,.14],[.055,.03],[0,.026]].map(([o,a])=>[o*r,a*r]),s),n.torus([t+.076*r,e+.08*r,i],.042*r,.012*r,s,[0,0,0],6,16)}function hi(n,t,e,i,r=[.52,.38,.4],s="lightWood",o=!0){const[a,l,c]=r;n.box([t,e+.026,i],[a,.052,c],s);for(let u=0;u<3;u++){const h=e+.05+(u+.5)*(l-.05)/3,p=(l-.05)/3-.009;n.box([t-a/2+.024,h,i],[.048,p,c],s),n.box([t+a/2-.024,h,i],[.048,p,c],s),n.box([t,h,i-c/2+.024],[a,p,.048],s),n.box([t,h,i+c/2-.024],[a,p,.048],s)}for(const u of[-1,1])for(const h of[-1,1])n.box([t+u*(a/2-.045),e+l/2,i+h*(c/2-.045)],[.055,l,.055],"darkWood"),Ze(n,[t+u*(a/2+.002),e+.12,i+h*(c/2-.07)],"x");o||Ie(n,[t,e+l,i],[a,.04,c],s,"x",.1)}function s0(n,t,e,i,r=.29,s=.7){n.lathe([t,e,i],[[0,0],[r*.85,0],[r*.92,.08*s],[r,s*.3],[r*1.03,s*.5],[r,s*.7],[r*.92,s*.93],[r*.85,s],[0,s]],"oak",[],20);for(const a of[.08,.27,.75,.93]){const l=r*(a>.15&&a<.85?1.015:.92);n.torus([t,e+s*a,i],l,.016,"iron",[ut/2,0,0],4,20)}for(let a=0;a<12;a++){const l=a/12*ut*2;n.rod([t+Math.sin(l)*r*.915,e+.07,i+Math.cos(l)*r*.915],[t+Math.sin(l)*r*.915,e+s-.07,i+Math.cos(l)*r*.915],.004,"darkWood",4)}const o=r*.853;n.cylinder([t,e+s+.006,i],o,.024,"endgrain",24);for(let a=-2;a<=2;a++){const l=a*o*.32,c=Math.sqrt(o*o-l*l);n.rod([t+l,e+s+.019,i-c],[t+l,e+s+.019,i+c],.0015,"darkWood",4)}}function Ao(n,t,e,i="redWood",r=0){n.box(t,e,"paper",[0,r,0]),n.box([t[0],t[1]+e[1]/2+.005,t[2]],[e[0]+.02,.013,e[2]+.02],i,[0,r,0]),n.box([t[0],t[1]-e[1]/2-.005,t[2]],[e[0]+.02,.013,e[2]+.02],i,[0,r,0])}function Br(n,t,e,i="linen",r=3){for(let s=0;s<r;s++)n.box([t[0]+s%2*.009,t[1]+s*.038,t[2]],[e[0],.041,e[1]],i)}function o0(n){const t=[[-1.39,1.52],[-1.37,1.57],[-1.2,1.579],[-1,1.586],[-.8,1.581],[-.62,1.57],[-.585,1.48],[-.56,1.3]],e=[],i=[],r=[],s=20,o=t.length;for(let l=0;l<=s;l++)for(let c=0;c<o;c++){const[u,h]=t[c],p=1.01+l/s*1.23;if(e.push(u,h+Math.sin(l*.85+c*.7)*.004,p),i.push(c/(o-1),l/s),c<o-1&&l<s){const d=l*o+c;r.push(d,d+o,d+1,d+1,d+o,d+o+1)}}const a=new ge;a.setAttribute("position",new Vt(e,3)),a.setAttribute("uv",new Vt(i,2)),a.setIndex(r),a.computeVertexNormals(),n.add(a,"blanket");for(const l of[1.015,2.235])Ye(n,t.map(([c,u])=>[c,u+.003,l]),.004,"linen",24);for(let l=0;l<22;l++)n.rod([-.56,1.3,1.04+l*.054],[-.56,1.25+l%3*.005,1.04+l*.054],.003,"rope",4)}function tc(n,t,e,i="z"){n.box(t,e,"leather");const r=[...t];r[1]+=.008,i==="z"&&(n.box([r[0],r[1],r[2]+e[2]*.2],[e[0]+.023,.025,.061],"brass"),n.box([r[0],r[1]+.015,r[2]+e[2]*.2],[e[0]-.012,.007,.04],"leather"))}function Yo(n,t,e,i,r=.75){n.cylinder([t,e,i],.14*r,.055*r,"iron",10),n.cylinder([t,e+.32*r,i],.13*r,.07*r,"iron",10,[0,0,0],.08*r),n.cylinder([t,e+.36*r,i],.07*r,.05*r,"iron",10);for(let s=0;s<4;s++){const o=ut/4+s*ut/2;n.rod([t+Math.sin(o)*.09*r,e+.03*r,i+Math.cos(o)*.09*r],[t+Math.sin(o)*.09*r,e+.29*r,i+Math.cos(o)*.09*r],.01*r,"brass")}n.cylinder([t,e+.12*r,i],.033*r,.15*r,"wax",10),n.sphere([t,e+.21*r,i],[.022*r,.046*r,.022*r],"glow",1),n.torus([t,e+.45*r,i],.065*r,.009*r,"iron",[0,0,0],5,16)}function a0(n){n.box([0,.82,0],[2.94,.16,6.1],"darkWood");for(const t of[-1.12,1.12])n.box([t,.68,0],[.16,.24,6.36],"darkWood");for(const t of[-2.62,-1.91,0,1.92,2.68])n.box([0,.69,t],[3.22,.13,.14],"oak");Ie(n,[0,.92,0],[2.89,.08,6.14],"lightWood","z",.21);for(const t of[-1.91,1.92]){n.rod([-1.84,.62,t],[1.84,.62,t],.07,"iron",12);for(const e of[-1.66,1.66]){const i=[e,.62,t];n.torus(i,.55,.06,"darkWood",[0,ut/2,0],6,32),n.torus(i,.59,.025,"iron",[0,ut/2,0],4,32),n.cylinder(i,.115,.24,"oak",14,[0,0,ut/2]),n.cylinder([e+Math.sign(e)*.15,.62,t],.087,.06,"iron",12,[0,0,ut/2]);for(let s=0;s<12;s++){const o=s/12*ut*2;n.beam([e,.62+Math.sin(o)*.105,t+Math.cos(o)*.105],[e,.62+Math.sin(o)*.52,t+Math.cos(o)*.52],.047,.055,"lightWood")}for(const s of[-1,1])Ye(n,[[e-s*.04,.72,t-.53],[e-s*.04,.57,t],[e-s*.04,.72,t+.53]],.018,"iron",16);n.box([e,.08,t+.41],[.3,.14,.28],"darkWood",[.15,0,0]);const r=new Hr(.655,.035,5,20,ut);n.add(r,"teal",[e,.62,t],[0,ut/2,0])}}n.beam([-.95,.64,-2.8],[0,.48,-4.17],.1,.13,"darkWood"),n.beam([.95,.64,-2.8],[0,.48,-4.17],.1,.13,"darkWood"),n.box([0,.46,-4.47],[.12,.12,1.18],"oak"),n.rod([-.71,.44,-5.01],[.71,.44,-5.01],.047,"darkWood"),n.torus([0,.43,-5.1],.11,.019,"iron",[ut/2,0,0]);for(const t of[-1.2,1.2])for(const e of[-2.65,2.64])n.rod([t,.68,e],[t,.12,e],.025,"iron"),n.box([t,.045,e],[.25,.09,.3],"oak"),n.torus([t,.4,e],.044,.012,"iron",[0,0,0],5,12)}function l0(n,t){function e(m,f,M,S,_){Ie(n,[m,(S+_)/2,(f+M)/2],[.11,_-S,M-f],"teal","y",.17),Ie(n,[m-Math.sign(m)*.065,(S+_)/2,(f+M)/2],[.025,_-S,M-f],"cream","z",.2)}e(-1.5,-3,1.35,.95,3.2),e(-1.5,2.38,3,.95,3.2),e(-1.5,1.35,2.38,.95,2.02),e(-1.5,1.35,2.38,2.8,3.2),e(1.5,.13,3,.95,3.2),e(1.5,-3,.13,.95,1.39),e(1.5,-3,.13,3.02,3.2),e(1.5,-3,-2.69,1.39,3.02),Ie(n,[0,2.08,-3],[3,2.25,.12],"teal","x",.19),Ie(n,[0,2.08,-2.926],[2.9,2.25,.024],"cream","x",.19);for(const m of[-1.075,1.075])Ie(n,[m,2.08,3],[.85,2.25,.12],"teal","x",.17),Ie(n,[m,2.08,2.925],[.85,2.25,.025],"cream","x",.17);n.box([0,3.15,3],[1.26,.18,.14],"teal");for(const m of[-1.5,1.5]){n.box([m,1.03,0],[.16,.16,6.2],"darkWood"),n.box([m,3.15,0],[.14,.13,6.26],"darkWood");for(const f of[-3,.13,3]){n.box([m,2.08,f],[.16,2.22,.14],"oak");for(const M of[1.09,1.58,2.63,3.1])Ze(n,[m+Math.sign(m)*.087,M,f])}n.box([m,1.44,1.57],[.125,.065,2.82],"cream")}for(const m of[-.66,.66])n.box([m,2.06,3.02],[.09,2.18,.15],"oak");n.box([0,3.07,3.03],[1.4,.1,.17],"oak"),n.box([0,.966,3.025],[1.32,.02,.22],"brass");const i=36,r=10,s=[],o=[],a=[],l=[];for(let m=0;m<=r;m++)for(let f=0;f<=i;f++){const M=ut*f/i,S=Math.cos(M)*1.61,_=3.17+Math.sin(M)*.66,b=-3.15+m/r*6.3;if(s.push(S,_,b),o.push(Math.cos(M),Math.sin(M)*2.44,0),a.push(f/i*2,m/r*4),f<i&&m<r){const w=m*(i+1)+f;l.push(w,w+1,w+i+1,w+1,w+i+2,w+i+1)}}const c=new ge;c.setAttribute("position",new Vt(s,3)),c.setAttribute("normal",new Vt(o,3)),c.setAttribute("uv",new Vt(a,2)),c.setIndex(l),c.computeVertexNormals();const u=t.canvas.clone();u.side=be,n.add(c,u);for(const m of[-3.08,-1.8,-.5,.78,2.05,3.08]){const f=[];for(let M=0;M<=24;M++){const S=ut*M/24;f.push([Math.cos(S)*1.57,3.15+Math.sin(S)*.635,m])}Ye(n,f,.039,"oak",32)}n.box([0,3.748,0],[.067,.067,6.16],"darkWood");for(const m of[-3.14,-1,1.15,3.14]){const f=[];for(let M=0;M<=24;M++){const S=ut*M/24;f.push([Math.cos(S)*1.619,3.18+Math.sin(S)*.664,m])}Ye(n,f,.014,"rope",32)}for(const m of[-3.08,3.08]){const f=new kr;f.moveTo(-1.53,0);for(let S=0;S<=32;S++){const _=ut-ut*S/32;f.lineTo(Math.cos(_)*1.53,Math.sin(_)*.59)}f.lineTo(-1.53,0),n.add(new Ji(f),"green",[0,3.18,m],m<0?[0,ut,0]:[0,0,0]);const M=[];for(let S=0;S<=24;S++){const _=ut*S/24;M.push([Math.cos(_)*1.54,3.18+Math.sin(_)*.6,m])}Ye(n,M,.045,"darkWood",32);for(let S=1;S<11;S++){const _=ut*S/11;Ze(n,[Math.cos(_)*1.46,3.18+Math.sin(_)*.56,m+Math.sign(m)*.013],"z","brass",.018)}}n.box([-1.5,2.4,1.865],[.034,.72,.97],"glass",[0,0,0],!1);for(const m of[1.32,2.41])n.box([-1.505,2.41,m],[.19,.9,.07],"oak");for(const m of[1.99,2.84])n.box([-1.505,m,1.865],[.19,.065,1.18],"oak");n.box([-1.5,2.41,1.865],[.09,.8,.04],"cream"),n.box([-1.5,2.41,1.865],[.09,.04,1.05],"cream"),n.box([-1.4,1.98,1.865],[.23,.05,1.21],"lightWood");for(const m of[1.43,2.31]){for(let f=0;f<6;f++)n.cylinder([-1.34+f*.007,2.47,m+f*.017],.022,.61,"linen",6);n.box([-1.29,2.24,m+.04],[.05,.035,.13],"leather")}n.rod([-1.32,2.89,1.26],[-1.32,2.89,2.48],.014,"brass"),hi(n,-1.69,1.66,1.865,[.27,.22,1.04],"green");for(let m=0;m<9;m++){const f=1.43+m*.11;n.rod([-1.68,1.89,f],[-1.71,2.12+m%3*.055,f],.008,"leaf");for(let M=0;M<3;M++)n.sphere([-1.7+Math.sin(M+m)*.06,2.02+M*.046,f],[.045,.016,.026],"leaf",0)}for(const m of[1.57,1.93,2.2]){n.sphere([-1.71,2.2,m],[.02,.023,.02],"wax",1);for(let f=0;f<5;f++){const M=f*ut*2/5;n.sphere([-1.71+Math.sin(M)*.025,2.2+Math.cos(M)*.025,m],[.021,.016,.008],"linen",0)}}const h=-125*ut/180,p=1.19,d=(m,f,M=0)=>[-.66+Math.cos(h)*m+Math.sin(h)*M,f,3.075-Math.sin(h)*m+Math.cos(h)*M];for(let m=0;m<8;m++)n.box(d((m+.5)*p/8,1.98),[p/8-.006,2.06,.065],"green",[0,h,0]);for(const m of[1.17,2.78])n.box(d(p/2,m,.042),[p,.09,.025],"oak",[0,h,0]);n.beam(d(.08,1.21,.045),d(p-.08,2.74,.045),.058,.033,"oak");for(const m of[1.24,2.57])n.cylinder([-.66,m,3.075],.026,.14,"iron",10),n.box(d(.1,m,.041),[.2,.058,.013],"iron",[0,h,0]),Ze(n,[-.66,m,3.108],"z","brass",.016);const g=d(.99,1.94,.08),v=d(.99,1.82,.08);n.rod(g,v,.015,"brass"),n.rod(d(.99,1.94,.025),g,.012,"brass"),n.rod(d(.99,1.82,.025),v,.012,"brass")}function c0(n){for(let t=0;t<5;t++){const e=(t+1)*.192,i=4.7-(t+.5)*.32;Ie(n,[0,e-.03,i],[1.27,.06,.32],"oak","x",.21),n.box([0,e-.11,i-.115],[1.21,.17,.035],"darkWood"),n.box([0,e+.008,i+.12],[1.22,.015,.042],"lightWood");for(const r of[-.49,.49])Ze(n,[r,e+.005,i+.09],"y")}for(const t of[-.71,.71]){n.beam([t,.13,4.62],[t,.84,3.13],.1,.14,"darkWood"),n.beam([t,.96,4.66],[t,1.87,3.16],.074,.07,"oak"),n.beam([t,.55,4.64],[t,1.43,3.16],.045,.045,"oak");for(const[e,i]of[[4.65,.94],[3.81,1.45],[3.15,1.9]])n.box([t,i/2,e],[.085,i,.085],"darkWood"),n.sphere([t,i+.012,e],[.055,.034,.055],"brass",1)}mn(n,[.99,2.61,3.08],[.57,.24],"WELCOME",[0,0,0],{background:"#d7c398",color:"#405447",size:50}),n.box([.98,2.34,3.075],[.26,.18,.055],"iron"),mn(n,[.98,2.34,3.11],[.21,.13],"07",[0,0,0],{background:"#394940",color:"#e7d6a9",size:92})}function u0(n){n.box([-.985,1.17,1.88],[.82,.42,2],"teal"),n.box([-.985,1.405,1.88],[.88,.075,2.08],"darkWood"),n.box([-.985,1.49,1.88],[.78,.14,1.94],"linen");for(let t=0;t<3;t++){const e=1.22+t*.64;n.box([-.558,1.19,e],[.035,.32,.58],"green"),pi(n,-.523,1.2,e,"side"),mn(n,[-.532,1.08,e],[.25,.052],["LINEN","WINTER","SPARES"][t],[0,ut/2,0],{size:45})}n.sphere([-.986,1.62,2.55],[.32,.095,.18],"linen",2),n.sphere([-1.03,1.61,2.23],[.28,.065,.16],"cushion",2),o0(n),n.box([-.74,1.03,2.43],[.32,.025,.39],"oak");for(const t of[2.31,2.48])n.sphere([-.73,1.08,t],[.14,.055,.065],"leather",1),n.box([-.62,1.1,t],[.1,.04,.075],"darkWood");n.box([-1.165,1.99,.51],[.48,2.05,.49],"darkWood"),n.box([-.915,1.99,.51],[.034,1.87,.41],"teal"),n.box([-.892,2.49,.51],[.014,.041,.35],"oak"),pi(n,-.866,1.92,.62,"side","brass",.075);for(const t of[1.14,2.74])n.box([-.872,t,.33],[.02,.05,.12],"iron");for(const t of[.99,1.62,2.26,2.81])n.box([-1.235,2.99,t],[.39,.33,.53],"green"),n.box([-1.03,2.99,t],[.025,.29,.48],"cream"),Ze(n,[-1.007,2.95,t],"x","brass",.021);n.cylinder([-1.07,3.3,1.26],.11,.73,"canvas",14,[ut/2,0,0]);for(const t of[1,1.51])n.torus([-1.07,3.3,t],.115,.015,"leather",[0,0,0],5,14);Ie(n,[1.177,1.79,1.56],[.52,.05,.88],"lightWood","z",.14);for(const t of[1.25,1.88])n.beam([1.4,1.24,t],[.94,1.75,t],.045,.035,"oak"),n.box([1.43,1.74,t],[.025,.15,.1],"iron");for(let t=0;t<2;t++){const e=1.16+t*.08,i=1.33-t*.12,r=1.48+t*.11;n.cylinder([e,i,r],.2-t*.025,.055,"oak",16);for(let s=0;s<3;s++){const o=s/3*ut*2;n.beam([e+Math.sin(o)*.12,i-.03,r+Math.cos(o)*.12],[e+Math.sin(o)*.16,.99,r+Math.cos(o)*.16],.03,.03,"darkWood")}}Ao(n,[1.18,1.842,1.42],[.26,.025,.31],"redWood",.12),n.box([1.12,1.866,1.47],[.23,.004,.25],"paper",[0,.12,0]),n.plane([1.12,1.869,1.47],[.225,.245],Qm(),[-ut/2,0,-.12]),r0(n,1.2,1.82,1.82,.9,"ceramic"),n.cylinder([1.2,1.938,1.82],.047,.001,"darkWood",14),n.rod([1.32,1.832,1.2],[1.02,1.832,1.12],.008,"darkWood"),n.box([1.421,2.42,1.58],[.025,.38,.49],"darkWood"),n.plane([1.404,2.42,1.58],[.44,.33],jm(),[0,-ut/2,0]),n.box([1.419,2.14,1.51],[.04,.065,.49],"oak"),n.torus([1.373,2.13,1.45],.055,.012,"brass",[0,ut/2,0],6,18),n.cylinder([1.375,2.13,1.45],.048,.01,"paper",18,[0,0,ut/2]),n.rod([1.384,2.1,1.42],[1.384,2.16,1.48],.003,"iron"),n.box([1.388,2.055,1.82],[.064,.13,.2],"leather");for(let t=0;t<3;t++)n.box([1.36-t*.006,2.14+t*.024,1.83-t*.015],[.009,.17,.14],"paper",[.1,0,0]);n.rod([1.395,2.5,1.95],[1.395,2.2,1.92],.004,"darkWood");for(let t=0;t<6;t++)for(const e of[-1,1])n.sphere([1.391,2.23+t*.042,1.92+e*.035*(1-t*.1)],[.003,.016,.023],"leaf",0);n.cylinder([-.98,2.45,2.86],.19,.021,"canvas",24,[ut/2,0,0]),n.cylinder([-.98,2.45,2.81],.108,.12,"canvas",20,[ut/2,0,0],.089),n.torus([-.98,2.45,2.775],.105,.013,"leather",[0,0,0],5,22),n.rod([-.98,2.65,2.905],[-.98,2.65,2.82],.012,"brass"),n.box([1.15,.992,2.5],[.58,.063,.66],"darkStone");for(const t of[.99,1.29])for(const e of[2.3,2.7])n.rod([t,1.02,e],[t,1.18,e],.025,"iron");n.box([1.15,1.41,2.5],[.42,.5,.46],"iron"),n.box([.925,1.4,2.5],[.028,.32,.31],"soot"),n.torus([.908,1.41,2.5],.071,.012,"iron",[0,ut/2,0],5,16),n.rod([.89,1.38,2.55],[.89,1.46,2.55],.012,"brass"),n.box([1.15,1.68,2.5],[.47,.06,.51],"iron"),n.cylinder([1.18,1.716,2.44],.143,.016,"soot",20),n.lathe([1.14,1.73,2.44],[[0,0],[.12,0],[.15,.08],[.12,.16],[.07,.2],[0,.2]],"copper"),n.cylinder([1.14,1.939,2.44],.09,.02,"copper",16),n.sphere([1.14,1.964,2.44],[.018,.023,.018],"darkWood",1),n.torus([1.14,1.95,2.44],.14,.013,"iron",[0,0,0],6,20),n.rod([1.03,1.79,2.43],[.91,1.88,2.43],.031,"copper"),n.cylinder([1.29,2.54,2.67],.065,1.63,"iron",12),n.cylinder([1.29,3.36,2.67],.11,.09,"brass",16),n.cylinder([1.29,3.75,2.67],.065,.69,"iron",12),n.cylinder([1.29,4.12,2.67],.12,.045,"iron",12,[0,0,0],.02),n.cylinder([1.29,3.575,2.67],.15,.035,"iron",20,[0,0,-.5]),n.cylinder([1.29,3.58,2.67],.087,.13,"brass",16),n.box([1.429,1.9,2.55],[.013,1.03,.68],"copper"),n.rod([1.35,2.6,2.13],[1.35,2.6,2.84],.014,"iron");for(const t of[2.22,2.39,2.74])Ye(n,[[1.35,2.61,t],[1.3,2.64,t],[1.3,2.53,t],[1.32,2.51,t]],.008,"brass",8);n.cylinder([1.28,2.28,2.23],.1,.034,"iron",18,[0,0,ut/2]),n.box([1.28,2.43,2.23],[.025,.18,.03],"iron"),n.rod([1.29,2.27,2.39],[1.29,2.5,2.39],.012,"oak"),n.sphere([1.29,2.25,2.39],[.008,.05,.03],"oak",1),Br(n,[1.28,2.25,2.74],[.09,.18],"linen",1),n.box([1.15,2.84,.66],[.5,.3,.69],"teal"),n.box([.89,2.84,.66],[.02,.25,.61],"cream"),pi(n,.868,2.81,.66,"side","brass",.08),n.box([1.15,2.58,.66],[.53,.045,.73],"lightWood"),To(n,1.15,2.61,.48,.7,"ceramic"),qi(n,1.12,2.62,.77,.7),n.box([.02,.969,1.6],[.9,.012,1.58],"rug");for(const t of[-.39,.43])n.box([t,.977,1.6],[.027,.002,1.54],"linen");for(const t of[.86,2.34])n.box([.02,.977,t],[.85,.002,.027],"linen");for(let t=0;t<20;t++)for(const e of[.78,2.42])n.rod([-.4+t*.044,.971,e],[-.4+t*.044,.971,e+Math.sign(e-1.6)*.047],.003,"rope",4);Yo(n,.71,2.71,2.85,.58),n.rod([.71,3.62,2.85],[.71,2.989,2.85],.006,"iron"),n.box([0,3.11,.17],[2.85,.09,.08],"oak");for(const t of[-1.38,1.38])n.box([t,2.03,.17],[.06,2.12,.07],"oak");mn(n,[.05,2.98,.211],[.51,.1],"MIND THE KETTLE",[0,0,0],{size:40,background:"#bda77c",color:"#4a5440"})}function h0(n){n.box([-1.4,1.99,-1.38],[.05,2.04,2.93],"darkWood");for(const t of[1.02,1.48,1.94,2.42,2.96])n.box([-1.15,t,-1.38],[.55,.055,2.95],"oak");for(const t of[-2.87,-1.91,-.92,.09])n.box([-1.18,2,t],[.49,2.02,.049],"green");for(let t=0;t<3;t++){const e=-2.38+t*.96;hi(n,-1.13,1.06,e,[.45,.31,.78],"lightWood"),mn(n,[-.892,1.24,e],[.4,.12],["TALLOW & WICKS","TWINE & PATCHES","SOAP & LINEN"][t],[0,ut/2,0],{size:40,background:"#c8b58b",color:"#435344"})}for(let t=0;t<5;t++)n.cylinder([-1.14,1.41,-2.61+t*.115],.032,.18,"wax",10),n.rod([-1.14,1.5,-2.61+t*.115],[-1.14,1.52,-2.61+t*.115],.003,"iron",4);for(let t=0;t<3;t++)n.torus([-1.11,1.43,-1.54+t*.17],.068,.02,"rope",[ut/2,0,0],5,16);Br(n,[-1.13,1.34,-.45],[.24,.42],"linen",3);for(let t=0;t<3;t++)n.box([-1.11,1.41,-.69+t*.13],[.17,.05,.1],"ceramic");for(let t=0;t<4;t++)To(n,-1.12,1.52,-2.7+t*.21,.74,t%2?"amber":"ceramic");for(let t=0;t<3;t++)qi(n,-1.12,1.53+t*.063,-1.5,1,"terracotta"),qi(n,-1.12,1.53+t*.051,-1.12,.82,"blueCeramic");Br(n,[-1.13,1.53,-.4],[.33,.49],"cushion",4);for(let t=0;t<3;t++)n.cylinder([-1.14,2.07,-2.59+t*.22],.076,.35,"canvas",12,[0,0,ut/2]),n.torus([-.964,2.07,-2.59+t*.22],.07,.009,"rope",[0,ut/2,0],5,14);for(let t=0;t<4;t++)Ql(n,-1.1,1.98,-1.74+t*.21,.85,t%2?"jar":"amber");hi(n,-1.14,1.99,-.41,[.37,.25,.63],"green");for(let t=0;t<3;t++)n.box([-1.11,2.3,-.62+t*.18],[.24,.03,.12],"leather");for(let t=0;t<3;t++)hi(n,-1.17,2.46,-2.39+t*.96,[.4,.36,.77],t===1?"green":"redWood",!1),tc(n,[-.949,2.67,-2.39+t*.96],[.022,.32,.05]);for(const[t,e]of[[-2.4,"PATCH & MEND"],[-1.43,"TEA & TONICS"],[-.45,"HOUSEHOLD"]])mn(n,[-.864,2.435,t],[.58,.055],e,[0,ut/2,0],{size:40,background:"#44594b",color:"#dfcfa1"});for(const t of[-2.65,-.34])for(const e of[.79,1.35])n.box([e,1.31,t],[.07,.69,.07],"darkWood");Ie(n,[1.08,1.735,-1.47],[.68,.07,2.7],"lightWood","z",.19),n.box([1.08,1.41,-1.47],[.64,.04,2.65],"darkWood");for(const t of[-2.29,-1.46,-.63])n.box([.724,1.57,t],[.027,.19,.74],"teal"),pi(n,.696,1.57,t,"side","brass");for(let t=0;t<2;t++)hi(n,1.08,1,-2.05+t*1.03,[.52,.3,.74],"darkWood");n.box([.9,1.777,-.68],[.27,.027,.42],"leather",[0,.12,0]),n.box([.99,1.797,-.73],[.17,.006,.24],"paper",[0,-.2,0]),n.rod([.8,1.789,-.9],[1.16,1.789,-.89],.014,"oak"),n.box([1.15,1.797,-.89],[.08,.036,.055],"iron"),n.box([.91,1.795,-1.08],[.22,.025,.12],"oak",[0,.25,0]);for(let t=0;t<8;t++)n.box([.84+t*.022,1.811,-1.08],[.003,.002,.04],"darkWood",[0,.25,0]);n.torus([1.23,1.81,-.46],.046,.01,"iron",[ut/2,0,.25],5,16),n.torus([1.23,1.81,-.34],.046,.01,"iron",[ut/2,0,-.25],5,16),n.rod([1.23,1.81,-.42],[1.01,1.81,-.4],.006,"iron"),n.box([.74,1.82,-1.57],[.14,.17,.2],"iron"),n.box([.69,1.85,-1.57],[.033,.13,.22],"iron"),n.rod([.59,1.79,-1.57],[.82,1.79,-1.57],.016,"iron"),n.rod([.585,1.68,-1.57],[.585,1.89,-1.57],.012,"iron");for(const t of[-2.34,-1.98])To(n,1.07,1.78,t,.81,"ceramic");n.box([1.34,1.82,-2.62],[.05,.11,.21],"oak");for(let t=0;t<3;t++)n.cylinder([1.3,1.84,-2.55+t*.065],.028,.09,"rope",10,[0,0,ut/2]),n.cylinder([1.3,1.9,-2.55+t*.065],.036,.009,"darkWood",10,[0,0,ut/2]);n.box([0,2.47,-2.88],[1.62,.09,.06],"oak");for(const t of[-.64,-.34,0,.38,.66])n.rod([t,2.47,-2.86],[t,2.47,-2.76],.015,"darkWood");for(let t=0;t<3;t++)Ye(n,[[-.62,2.44,-2.75],[-.73+t*.03,2.04,-2.73],[-.45-t*.02,1.98,-2.73],[-.62,2.44,-2.75]],.013,"rope",20);n.box([.39,2.14,-2.8],[.32,.51,.03],"leather"),n.box([.39,2.44,-2.79],[.23,.18,.03],"leather"),n.rod([.26,2.47,-2.78],[.5,2.47,-2.78],.01,"rope");for(const t of[.26,.5])n.box([t,2.07,-2.777],[.012,.1,.008],"rope");n.torus([0,2.39,-2.75],.06,.01,"iron"),n.torus([.08,2.39,-2.75],.06,.01,"iron"),n.rod([.03,2.34,-2.75],[-.02,2.11,-2.75],.009,"iron"),n.rod([.06,2.34,-2.75],[.13,2.11,-2.75],.009,"iron"),n.box([-.1,1.32,-2.72],[1.4,.66,.31],"teal");for(const t of[-.57,-.1,.37])n.box([t,1.37,-2.55],[.43,.42,.027],"green"),pi(n,t,1.36,-2.522,"front","brass",.12);n.box([-.1,1.68,-2.72],[1.45,.055,.36],"lightWood"),Ao(n,[-.36,1.74,-2.71],[.3,.06,.24],"green",.03),Ao(n,[-.35,1.8,-2.7],[.27,.032,.23],"redWood",-.1),Yo(n,.33,1.71,-2.7,.68),mn(n,[-.16,2.84,-2.906],[1.3,.23],"A PLACE FOR EVERYTHING",[0,0,0],{size:44,background:"#dbcaab",color:"#496053",border:!0});for(const t of[-.35,-.62]){Ye(n,[[-1.03,2.97,t],[-.92,2.99,t],[-.9,2.76,t]],.006,"rope",10);for(let e=0;e<6;e++){const i=(e-2.5)*.012;n.rod([-.9,2.76,t],[-.94+e*.015,2.57-e%3*.027,t+i],.004,"darkWood",5);for(let r=0;r<3;r++)n.sphere([-.94+e*.015,2.59+r*.044,t+i],[.014,.023,.008],e%2?"leaf":"grassGold",0)}n.torus([-.9,2.75,t],.021,.004,"rope",[ut/2,0,0],4,12)}n.box([-.6,1.758,-2.71],[.18,.105,.24],"paper"),n.box([-.6,1.814,-2.71],[.009,.003,.25],"rope"),n.box([-.6,1.814,-2.71],[.19,.003,.008],"rope"),n.torus([-.6,1.822,-2.71],.019,.004,"rope",[ut/2,0,0],4,10)}function f0(n,t){for(const o of[-2.66,.08])n.box([1.515,2.22,o],[.15,1.76,.1],"oak"),n.box([1.599,2.11,o],[.018,.14,.075],"iron"),Ze(n,[1.613,2.11,o],"x","brass",.022);Ie(n,[2.045,1.37,-1.28],[1.02,.09,2.67],"lightWood","z",.18),n.box([2.58,1.32,-1.28],[.075,.17,2.75],"teal");for(const o of[-2.64,.08])n.box([2.04,1.32,o],[1.07,.17,.067],"teal");for(const o of[-2.47,-.1])n.cylinder([1.54,1.39,o],.033,.13,"iron",10,[ut/2,0,0]),n.box([1.61,1.414,o],[.16,.014,.07],"iron"),n.box([2.44,.665,o],[.07,1.29,.07],"oak"),n.box([2.44,.038,o],[.2,.055,.18],"darkWood"),n.beam([2.43,.24,o],[1.69,1.29,o],.044,.044,"darkWood"),n.beam([2.4,.72,o],[1.57,1.25,o],.028,.029,"iron"),Ze(n,[2.477,.69,o],"x","brass",.028),n.rod([1.615,2.11,o<-1?-2.66:.08],[2.55,1.39,o],.013,"iron");Ie(n,[1.77,3.1,-1.29],[.55,.055,2.72],"green","z",.18);for(const o of[-2.55,-.03]){const a=o<-1?-2.66:.08;n.beam([1.53,2.76,a],[1.95,3.07,o],.035,.035,"iron"),n.cylinder([1.51,3.1,a],.025,.11,"iron",10,[ut/2,0,0])}const e=t.canvas.clone();e.side=be;const i=t.awningGreen.clone();i.side=be;for(let o=0;o<8;o++){const a=-2.8+o*3.08/8,l=a+3.08/8;Zm(n,{x1:1.48,x2:3.23,z1:a,z2:l,y1:3.27,y2:2.86,material:o%2?e:i});const c=new kr;c.moveTo(a,2.86),c.lineTo(l,2.86),c.lineTo(l,2.72),c.quadraticCurveTo((a+l)/2,2.63,a,2.72),c.closePath();const u=new Ji(c),h=u.attributes.position;for(let p=0;p<h.count;p++){const d=h.getX(p),g=h.getY(p);h.setXYZ(p,3.23,g,d)}u.computeVertexNormals(),n.add(u,o%2?e:i),n.rod([3.238,2.855,a],[3.238,2.74,a],.006,"rope",5)}n.rod([1.5,3.28,-2.84],[1.5,3.28,.3],.025,"darkWood"),n.rod([3.22,2.86,-2.84],[3.22,2.86,.3],.023,"darkWood");for(const o of[-2.71,.16])n.box([1.54,3.22,o],[.06,.18,.11],"iron"),n.cylinder([3.22,1.455,o],.044,2.88,"oak",10),n.cylinder([3.22,.1,o],.062,.16,"iron",10),n.rod([1.5,3.25,o],[3.22,2.86,o],.023,"iron"),n.beam([3.22,2.38,o],[2.73,2.97,o],.03,.03,"oak"),n.sphere([3.22,2.92,o],[.06,.08,.06],"brass",1),Ye(n,[[3.22,2.87,o],[3.63,1.3,o+(o<0?-.44:.44)],[3.95,.06,o+(o<0?-.84:.84)]],.01,"rope",10),n.rod([3.95,.01,o+(o<0?-.84:.84)],[3.95,.2,o+(o<0?-.84:.84)],.015,"iron");const r=So("",{width:1024,height:256,size:73,lines:["MORROW & MOSS"],border:!0});n.box([3.255,2.405,-1.28],[.047,.29,1.86],"darkWood"),n.plane([3.281,2.405,-1.28],[1.81,.26],r,[0,ut/2,0]);for(const o of[-2.04,-.52])n.rod([3.24,2.83,o],[3.25,2.55,o],.007,"iron");hi(n,2,1.418,-2.14,[.66,.15,.55],"green");for(let o=0;o<3;o++)for(let a=0;a<2;a++)Ql(n,1.84+a*.26,1.48,-2.32+o*.18,.7,o%2?"jar":"amber");const s=So("HERBAL",{background:"#dbcaa5",color:"#415e4b",font:"Georgia",size:48,width:256,height:128,border:!1});for(const o of[-2.32,-2.14,-1.96])n.plane([2.172,1.59,o],[.08,.045],s,[0,ut/2,0]);for(let o=0;o<3;o++)qi(n,2.13,1.42+o*.065,-1.28,1.1,"blueCeramic");for(let o=0;o<2;o++)qi(n,1.85,1.42+o*.07,-1.22,.95,"ceramic");n.box([2.07,1.437,-.5],[.65,.025,.54],"linen"),Br(n,[1.98,1.47,-.5],[.28,.28],"linen",3),tc(n,[1.98,1.55,-.5],[.32,.021,.041]),n.torus([2.31,1.47,-.42],.08,.029,"rope",[ut/2,0,0],6,18),n.box([2.22,1.459,-.64],[.16,.035,.13],"leather",[0,.22,0]);for(const[o,a]of[[-2.13,"GARDEN TEA"],[-1.24,"POTTERY"],[-.43,"MEND & MAKE"]])n.box([2.48,1.455,o],[.025,.091,.39],"darkWood",[0,0,-.16]),mn(n,[2.502,1.46,o],[.35,.073],a,[0,ut/2,0],{size:39,background:"#e0d0a9",color:"#415648"});for(const o of[-2.6,.06])n.box([2.596,1.31,o],[.02,.13,.11],"iron"),n.torus([2.62,1.31,o],.031,.008,"brass",[0,ut/2,0],5,12);n.rod([3.22,2.47,.16],[3.08,2.47,.16],.015,"iron"),Yo(n,3.07,2.01,.16,.78)}function d0(n,t){const e=new Xe(new Yn(100,100),$m());e.rotation.x=-ut/2,e.receiveShadow=!0,n.scene.add(e);const i=new kr;for(let a=0;a<48;a++){const l=a/48*ut*2,c=6.9+Math.sin(a*2.7)*.35,u=Math.cos(l)*c,h=Math.sin(l)*(c*.83);a===0?i.moveTo(u,h):i.lineTo(u,h)}i.closePath(),n.add(new Ji(i),"path",[.25,.003,.45],[-ut/2,0,0],!1);const r=new Ei({color:"#b8a583",roughness:1,transparent:!0,opacity:.28,depthWrite:!1});n.add(new Fr(1.1,28),r,[.06,.007,4.58],[-ut/2,0,0],!1),n.add(new Fr(1.15,28),r,[3.19,.008,-1.2],[-ut/2,0,0],!1);let s=1234;const o=()=>(s=s*1664525+1013904223>>>0,s/4294967296);for(let a=0;a<340;a++){const l=o()*ut*2,c=6+o()*3,u=Math.cos(l)*c,h=Math.sin(l)*c*.85,p=.06+o()*.19;for(let d=0;d<3;d++){const g=o()*ut*2,v=new ge;v.setAttribute("position",new Vt([u-.023,0,h,u+.023,0,h,u+Math.sin(g)*.08,p,h+Math.cos(g)*.08],3)),v.computeVertexNormals(),n.add(v,a%3?"grass":"grassGold",[],[],!1)}}for(let a=0;a<130;a++){const l=(o()-.5)*15,c=(o()-.5)*14;if(Math.abs(l)<1.9&&Math.abs(c)<4.8)continue;const u=.02+o()*.055;n.sphere([l,u*.35,c],[u,.4*u,u*.7],a%3?"stone":"darkStone",0)}n.cylinder([4.26,.012,4.04],.4,.02,"soot",20);for(let a=0;a<11;a++){const l=a/11*ut*2;n.sphere([4.26+Math.sin(l)*.46,.1,4.04+Math.cos(l)*.46],[.11,.1,.1],a%2?"stone":"darkStone",1)}for(let a=0;a<3;a++){const l=a*ut/3;n.rod([4.26-Math.sin(l)*.3,.11,4.04-Math.cos(l)*.3],[4.26+Math.sin(l)*.3,.11,4.04+Math.cos(l)*.3],.065,"coal")}for(let a=0;a<5;a++)n.sphere([4.1+o()*.3,.11,3.9+o()*.28],[.027,.017,.023],"glow",0);for(const[a,l]of[[3.94,4.29],[4.61,4.29],[4.26,3.68]])n.rod([a,.025,l],[4.26,.93,4.04],.013,"iron");Ye(n,[[4.26,.91,4.04],[4.26,.75,4.04],[4.28,.7,4.04]],.007,"iron",8),n.lathe([4.26,.4,4.04],[[0,0],[.12,0],[.16,.1],[.15,.2],[.13,.23],[0,.23]],"iron"),n.torus([4.26,.63,4.04],.135,.01,"iron",[0,0,0],5,20),n.cylinder([4.01,.44,2.62],.24,.072,"oak",18);for(let a=0;a<3;a++){const l=a*ut*2/3;n.beam([4.01+Math.sin(l)*.13,.41,2.62+Math.cos(l)*.13],[4.01+Math.sin(l)*.2,.02,2.62+Math.cos(l)*.2],.044,.044,"darkWood")}n.box([2.72,.23,3.73],[.69,.43,.47],"green"),n.box([2.72,.47,3.73],[.74,.08,.52],"darkWood");for(const a of[2.5,2.95])n.box([a,.517,3.73],[.053,.019,.54],"leather"),n.box([a,.29,3.98],[.053,.44,.019],"leather"),n.box([a,.37,4],[.08,.085,.02],"brass");pi(n,2.72,.31,4.006,"front","iron",.2),n.box([2.73,.66,3.76],[.32,.3,.14],"leather",[.15,0,.12]),n.box([2.73,.79,3.81],[.34,.08,.05],"darkWood",[.15,0,.12]),n.box([2.73,.69,3.842],[.08,.067,.01],"brass"),Ye(n,[[2.57,.77,3.76],[2.43,1.01,3.76],[2.74,1.11,3.76],[2.89,.8,3.76]],.012,"leather",20);for(let a=0;a<6;a++){const l=2.18+a%3*.14,c=.09+Math.floor(a/3)*.14;n.cylinder([l,c,2.72],.065,.53,"darkWood",10,[ut/2,0,0]),n.cylinder([l,c,3],.06,.012,"endgrain",10,[ut/2,0,0])}s0(n,-2.16,0,-2.91,.28,.66),n.lathe([-2.12,0,-2.12],[[0,0],[.17,0],[.2,.32],[.185,.34],[.16,.04],[0,.04]],"oak"),n.torus([-2.12,.29,-2.12],.195,.011,"iron",[ut/2,0,0]),n.torus([-2.12,.39,-2.12],.21,.012,"iron",[0,0,0],5,20);for(const[a,l]of[[-5.7,-4.6],[-6.7,2],[5.7,-4.8]])for(let c=0;c<8;c++){const u=(o()-.5)*.8,h=(o()-.5)*.6,p=.2+o()*.45;n.rod([a,0,l],[a+u,p,l+h],.012,"darkWood"),n.sphere([a+u,p,l+h],[.24,.17,.22],"leaf",1)}}function p0(n){for(const t of[-1.59,1.59])for(const e of[-2.93,2.91])for(const i of[1.18,2.93]){n.box([t,i,e],[.021,.2,.19],"iron");for(const r of[-.06,.06])Ze(n,[t+Math.sign(t)*.015,i+r,e],"x","brass",.013)}mn(n,[-1.572,2.15,-1.23],[1.2,.46],"MORROW & MOSS",[0,-ut/2,0],{size:55,lines:["MORROW & MOSS","USEFUL THINGS • GOOD TEA"],background:"#dfc89b",color:"#315b50",border:!0});for(let t=0;t<5;t++)n.box([1.579,2.75,2.2+t*.07],[.016,.16,.045],"darkWood");n.box([1.59,2.755,2.34],[.014,.2,.41],"darkWood");for(let t=0;t<5;t++)n.box([1.603,2.68+t*.035,2.34],[.01,.017,.35],"iron");for(const t of[-2.54,-.29])n.torus([-1.62,1.29,t],.046,.012,"iron",[0,ut/2,0],5,16);n.box([0,.73,1.3],[1.2,.13,.44],"canvas");for(const t of[-.4,.4])n.box([t,.807,1.3],[.06,.018,.48],"leather");n.box([.93,.055,4.52],[.4,.1,.22],"darkWood");for(let t=0;t<7;t++)n.box([.78+t*.045,.12,4.52],[.025,.08,.16],"rope");n.box([0,.01,4.96],[.89,.014,.45],"canvas");for(let t=0;t<6;t++)n.box([0,.019,4.79+t*.056],[.84,.003,.014],"darkWood")}function m0(){const n=new Mu;n.background=new Gt("#d8d2bb"),n.fog=new No("#d8d2bb",14,36);const t=Jm(),e=new Ym(n,t);d0(e),a0(e),l0(e,t),c0(e),u0(e),h0(e),f0(e,t),p0(e);const i=e.finish(),r=new nh("#e6ead7","#7a654b",1.25);n.add(r);const s=new sh("#ffe1ac",3.25);s.position.set(8.5,6.7,7),s.target.position.set(0,1.3,0),n.add(s,s.target),s.castShadow=!0,s.shadow.mapSize.set(2048,2048),s.shadow.camera.left=-9,s.shadow.camera.right=9,s.shadow.camera.top=9,s.shadow.camera.bottom=-9,s.shadow.camera.near=.5,s.shadow.camera.far=30,s.shadow.normalBias=.026,s.shadow.bias=-12e-5,s.shadow.radius=2;const o=new Ss("#f4ddb6",10,5.5,2);o.position.set(0,2.83,1.63),n.add(o);const a=new Ss("#dce6d1",8,4.5,2);a.position.set(.3,2.69,-1.6),n.add(a);const l=new Ss("#ffcd88",1.2,2.4,2);return l.position.set(3.07,2.2,.16),n.add(l),{scene:n,stats:i}}class g0{constructor(t,e,i){this.camera=t,this.canvas=e,this.onLock=i,this.keys=new Set,this.locked=!1,this.position={...On},this.yaw=On.yaw,this.pitch=On.pitch,this.velocityY=0,this.eyeY=Rs,this.camera.rotation.order="YXZ",document.addEventListener("pointerlockchange",()=>{this.locked=document.pointerLockElement===e,this.keys.clear(),i(this.locked)}),document.addEventListener("pointerlockerror",()=>{document.getElementById("inputNotice").textContent="Mouse look needs browser permission. Click Explore to try again."}),document.addEventListener("mousemove",r=>{this.locked&&(this.yaw-=r.movementX*.0021,this.pitch=Math.max(-1.4,Math.min(1.4,this.pitch-r.movementY*.0021)))}),document.addEventListener("keydown",r=>{["KeyW","KeyA","KeyS","KeyD","ArrowUp","ArrowDown","ArrowLeft","ArrowRight","ShiftLeft","ShiftRight","KeyR"].includes(r.code)&&(this.locked&&r.preventDefault(),r.code==="KeyR"&&this.locked&&!r.repeat?this.reset():this.keys.add(r.code))}),document.addEventListener("keyup",r=>this.keys.delete(r.code)),window.addEventListener("blur",()=>this.keys.clear()),document.addEventListener("visibilitychange",()=>this.keys.clear()),this.applyCamera()}async lock(){try{document.getElementById("inputNotice").textContent="",await this.canvas.requestPointerLock()}catch{document.getElementById("inputNotice").textContent="Mouse look needs browser permission. Click Explore to try again."}}pause(){this.locked&&document.exitPointerLock()}reset(){this.position={...On},this.yaw=On.yaw,this.pitch=On.pitch,this.velocityY=0,this.eyeY=On.y+Rs,this.applyCamera()}applyCamera(){this.camera.position.set(this.position.x,this.eyeY,this.position.z),this.camera.rotation.set(this.pitch,this.yaw,0,"YXZ")}update(t){if(t=Math.min(t,.05),this.locked){const e=Number(this.keys.has("KeyW")||this.keys.has("ArrowUp"))-Number(this.keys.has("KeyS")||this.keys.has("ArrowDown")),i=Number(this.keys.has("KeyD")||this.keys.has("ArrowRight"))-Number(this.keys.has("KeyA")||this.keys.has("ArrowLeft")),r=Math.hypot(e,i)||1,s=this.keys.has("ShiftLeft")||this.keys.has("ShiftRight")?2.8:1.85,o=(-Math.sin(this.yaw)*e+Math.cos(this.yaw)*i)/r*s*t,a=(-Math.cos(this.yaw)*e-Math.sin(this.yaw)*i)/r*s*t;n0(this.position,o,a);const l=Eo(this.position.x,this.position.z,this.position.y);this.position.y>l+1e-4?(this.velocityY-=16*t,this.position.y=Math.max(l,this.position.y+this.velocityY*t)):(this.position.y=l,this.velocityY=0),this.position.y<-1&&this.reset(),this.eyeY+=(this.position.y+Rs-this.eyeY)*(1-Math.exp(-16*t)),this.applyCamera()}return i0(this.position)}}const Ar=document.querySelector("#scene"),Lr=document.querySelector("#welcome"),_0=document.querySelector("#hud"),v0=document.querySelector("#reticle"),x0=document.querySelector("#foot");try{let a=function(){const l=s.getDelta(),c=r.update(l);c!==o&&(document.querySelector("#place").textContent=c,o=c),n.render(t,i)};var M0=a;const n=new Xm({canvas:Ar,antialias:!0,powerPreference:"high-performance"});n.setPixelRatio(Math.min(window.devicePixelRatio,1.65)),n.setSize(innerWidth,innerHeight),n.outputColorSpace=Ee,n.toneMapping=ul,n.toneMappingExposure=1.04,n.shadowMap.enabled=!0,n.shadowMap.type=ll,n.shadowMap.autoUpdate=!1,n.shadowMap.needsUpdate=!0;const{scene:t,stats:e}=m0(),i=new Ue(68,innerWidth/innerHeight,.045,60),r=new g0(i,Ar,l=>{Lr.hidden=l,_0.hidden=!l,v0.hidden=!l,x0.hidden=!l,l&&(document.querySelector("#enter").innerHTML="Resume exploring <span>↗</span>",document.querySelector("#reset").hidden=!1)});document.querySelector("#enter").addEventListener("click",()=>r.lock()),document.querySelector("#help").addEventListener("click",()=>r.pause()),document.querySelector("#reset").addEventListener("click",()=>{r.reset(),r.lock()}),Ar.addEventListener("click",()=>{Lr.hidden&&!r.locked&&r.lock()}),window.addEventListener("resize",()=>{i.aspect=innerWidth/innerHeight,i.updateProjectionMatrix(),n.setSize(innerWidth,innerHeight),n.setPixelRatio(Math.min(devicePixelRatio,1.65))}),Ar.addEventListener("webglcontextlost",l=>{l.preventDefault(),r.pause(),ol("The graphics context was interrupted. Reload this page to resume.")}),n.compile(t,i),n.render(t,i),document.querySelector("#loading").hidden=!0,Lr.hidden=!1;const s=new ah;let o="";n.setAnimationLoop(a),window.wagonScene={version:"1.0.0",authoredGeometry:e,renderer:n,camera:i,walker:r,reset:()=>r.reset()}}catch(n){ol(n.message),console.error(n)}function ol(n){document.querySelector("#loading").hidden=!0,Lr.hidden=!0,document.querySelector("#errorText").textContent=n,document.querySelector("#error").hidden=!1}

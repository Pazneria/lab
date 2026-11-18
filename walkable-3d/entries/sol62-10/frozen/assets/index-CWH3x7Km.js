(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=e(r);fetch(r.href,s)}})();/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const wo="179",ic=0,jo=1,rc=2,Nr=1,sc=2,fn=3,wn=0,Te=1,ve=2,Tn=0,mi=1,Qo=2,ta=3,ea=4,oc=5,zn=100,ac=101,lc=102,cc=103,uc=104,hc=200,fc=201,dc=202,pc=203,Us=204,Ns=205,mc=206,gc=207,_c=208,vc=209,xc=210,Mc=211,Sc=212,yc=213,Ec=214,Fs=0,Os=1,Bs=2,Mi=3,ks=4,zs=5,Hs=6,Vs=7,hl=0,bc=1,Tc=2,An=0,Ac=1,wc=2,Rc=3,fl=4,Cc=5,Pc=6,Lc=7,dl=300,Si=301,yi=302,Gs=303,Ws=304,Gr=306,Gi=1e3,Vn=1001,Xs=1002,Fe=1003,Dc=1004,nr=1005,Qe=1006,Zr=1007,Gn=1008,rn=1009,pl=1010,ml=1011,Wi=1012,Ro=1013,Xn=1014,tn=1015,$i=1016,Co=1017,Po=1018,Xi=1020,gl=35902,_l=1021,vl=1022,Ke=1023,qi=1026,Yi=1027,Lo=1028,Do=1029,xl=1030,Io=1031,Uo=1033,Cr=33776,Pr=33777,Lr=33778,Dr=33779,qs=35840,Ys=35841,Zs=35842,Ks=35843,Js=36196,$s=37492,js=37496,Qs=37808,to=37809,eo=37810,no=37811,io=37812,ro=37813,so=37814,oo=37815,ao=37816,lo=37817,co=37818,uo=37819,ho=37820,fo=37821,Ir=36492,po=36494,mo=36495,Ml=36283,go=36284,_o=36285,vo=36286,Ic=3200,Uc=3201,Sl=0,Nc=1,pn="",Re="srgb",Ei="srgb-linear",Fr="linear",ie="srgb",jn=7680,na=519,Fc=512,Oc=513,Bc=514,yl=515,kc=516,zc=517,Hc=518,Vc=519,ia=35044,ra="300 es",en=2e3,Or=2001;class Ai{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const r=n[t];if(r!==void 0){const s=r.indexOf(e);s!==-1&&r.splice(s,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const r=n.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,t);t.target=null}}}const Me=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Kr=Math.PI/180,xo=180/Math.PI;function wi(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Me[i&255]+Me[i>>8&255]+Me[i>>16&255]+Me[i>>24&255]+"-"+Me[t&255]+Me[t>>8&255]+"-"+Me[t>>16&15|64]+Me[t>>24&255]+"-"+Me[e&63|128]+Me[e>>8&255]+"-"+Me[e>>16&255]+Me[e>>24&255]+Me[n&255]+Me[n>>8&255]+Me[n>>16&255]+Me[n>>24&255]).toLowerCase()}function Jt(i,t,e){return Math.max(t,Math.min(e,i))}function Gc(i,t){return(i%t+t)%t}function Jr(i,t,e){return(1-e)*i+e*t}function Pi(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function we(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}class Tt{constructor(t=0,e=0){Tt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6],this.y=r[1]*e+r[4]*n+r[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Jt(this.x,t.x,e.x),this.y=Jt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Jt(this.x,t,e),this.y=Jt(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Jt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Jt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),r=Math.sin(e),s=this.x-t.x,o=this.y-t.y;return this.x=s*n-o*r+t.x,this.y=s*r+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Zn{constructor(t=0,e=0,n=0,r=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=r}static slerpFlat(t,e,n,r,s,o,a){let c=n[r+0],l=n[r+1],u=n[r+2],h=n[r+3];const d=s[o+0],p=s[o+1],_=s[o+2],x=s[o+3];if(a===0){t[e+0]=c,t[e+1]=l,t[e+2]=u,t[e+3]=h;return}if(a===1){t[e+0]=d,t[e+1]=p,t[e+2]=_,t[e+3]=x;return}if(h!==x||c!==d||l!==p||u!==_){let m=1-a;const f=c*d+l*p+u*_+h*x,A=f>=0?1:-1,b=1-f*f;if(b>Number.EPSILON){const N=Math.sqrt(b),P=Math.atan2(N,f*A);m=Math.sin(m*P)/N,a=Math.sin(a*P)/N}const v=a*A;if(c=c*m+d*v,l=l*m+p*v,u=u*m+_*v,h=h*m+x*v,m===1-a){const N=1/Math.sqrt(c*c+l*l+u*u+h*h);c*=N,l*=N,u*=N,h*=N}}t[e]=c,t[e+1]=l,t[e+2]=u,t[e+3]=h}static multiplyQuaternionsFlat(t,e,n,r,s,o){const a=n[r],c=n[r+1],l=n[r+2],u=n[r+3],h=s[o],d=s[o+1],p=s[o+2],_=s[o+3];return t[e]=a*_+u*h+c*p-l*d,t[e+1]=c*_+u*d+l*h-a*p,t[e+2]=l*_+u*p+a*d-c*h,t[e+3]=u*_-a*h-c*d-l*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,r){return this._x=t,this._y=e,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,r=t._y,s=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),u=a(r/2),h=a(s/2),d=c(n/2),p=c(r/2),_=c(s/2);switch(o){case"XYZ":this._x=d*u*h+l*p*_,this._y=l*p*h-d*u*_,this._z=l*u*_+d*p*h,this._w=l*u*h-d*p*_;break;case"YXZ":this._x=d*u*h+l*p*_,this._y=l*p*h-d*u*_,this._z=l*u*_-d*p*h,this._w=l*u*h+d*p*_;break;case"ZXY":this._x=d*u*h-l*p*_,this._y=l*p*h+d*u*_,this._z=l*u*_+d*p*h,this._w=l*u*h-d*p*_;break;case"ZYX":this._x=d*u*h-l*p*_,this._y=l*p*h+d*u*_,this._z=l*u*_-d*p*h,this._w=l*u*h+d*p*_;break;case"YZX":this._x=d*u*h+l*p*_,this._y=l*p*h+d*u*_,this._z=l*u*_-d*p*h,this._w=l*u*h-d*p*_;break;case"XZY":this._x=d*u*h-l*p*_,this._y=l*p*h-d*u*_,this._z=l*u*_+d*p*h,this._w=l*u*h+d*p*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,r=Math.sin(n);return this._x=t.x*r,this._y=t.y*r,this._z=t.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],r=e[4],s=e[8],o=e[1],a=e[5],c=e[9],l=e[2],u=e[6],h=e[10],d=n+a+h;if(d>0){const p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(u-c)*p,this._y=(s-l)*p,this._z=(o-r)*p}else if(n>a&&n>h){const p=2*Math.sqrt(1+n-a-h);this._w=(u-c)/p,this._x=.25*p,this._y=(r+o)/p,this._z=(s+l)/p}else if(a>h){const p=2*Math.sqrt(1+a-n-h);this._w=(s-l)/p,this._x=(r+o)/p,this._y=.25*p,this._z=(c+u)/p}else{const p=2*Math.sqrt(1+h-n-a);this._w=(o-r)/p,this._x=(s+l)/p,this._y=(c+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Jt(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const r=Math.min(1,e/n);return this.slerp(t,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,r=t._y,s=t._z,o=t._w,a=e._x,c=e._y,l=e._z,u=e._w;return this._x=n*u+o*a+r*l-s*c,this._y=r*u+o*c+s*a-n*l,this._z=s*u+o*l+n*c-r*a,this._w=o*u-n*a-r*c-s*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,r=this._y,s=this._z,o=this._w;let a=o*t._w+n*t._x+r*t._y+s*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=r,this._z=s,this;const c=1-a*a;if(c<=Number.EPSILON){const p=1-e;return this._w=p*o+e*this._w,this._x=p*n+e*this._x,this._y=p*r+e*this._y,this._z=p*s+e*this._z,this.normalize(),this}const l=Math.sqrt(c),u=Math.atan2(l,a),h=Math.sin((1-e)*u)/l,d=Math.sin(e*u)/l;return this._w=o*h+this._w*d,this._x=n*h+this._x*d,this._y=r*h+this._y*d,this._z=s*h+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(t),r*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class V{constructor(t=0,e=0,n=0){V.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(sa.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(sa.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6]*r,this.y=s[1]*e+s[4]*n+s[7]*r,this.z=s[2]*e+s[5]*n+s[8]*r,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,r=this.z,s=t.elements,o=1/(s[3]*e+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*e+s[4]*n+s[8]*r+s[12])*o,this.y=(s[1]*e+s[5]*n+s[9]*r+s[13])*o,this.z=(s[2]*e+s[6]*n+s[10]*r+s[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,r=this.z,s=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*r-a*n),u=2*(a*e-s*r),h=2*(s*n-o*e);return this.x=e+c*l+o*h-a*u,this.y=n+c*u+a*l-s*h,this.z=r+c*h+s*u-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*r,this.y=s[1]*e+s[5]*n+s[9]*r,this.z=s[2]*e+s[6]*n+s[10]*r,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Jt(this.x,t.x,e.x),this.y=Jt(this.y,t.y,e.y),this.z=Jt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Jt(this.x,t,e),this.y=Jt(this.y,t,e),this.z=Jt(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Jt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,r=t.y,s=t.z,o=e.x,a=e.y,c=e.z;return this.x=r*c-s*a,this.y=s*o-n*c,this.z=n*a-r*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return $r.copy(this).projectOnVector(t),this.sub($r)}reflect(t){return this.sub($r.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Jt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,r=this.z-t.z;return e*e+n*n+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const r=Math.sin(e)*t;return this.x=r*Math.sin(n),this.y=Math.cos(e)*t,this.z=r*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),r=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=r,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const $r=new V,sa=new Zn;class Zt{constructor(t,e,n,r,s,o,a,c,l){Zt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,r,s,o,a,c,l)}set(t,e,n,r,s,o,a,c,l){const u=this.elements;return u[0]=t,u[1]=r,u[2]=a,u[3]=e,u[4]=s,u[5]=c,u[6]=n,u[7]=o,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,r=e.elements,s=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],u=n[4],h=n[7],d=n[2],p=n[5],_=n[8],x=r[0],m=r[3],f=r[6],A=r[1],b=r[4],v=r[7],N=r[2],P=r[5],L=r[8];return s[0]=o*x+a*A+c*N,s[3]=o*m+a*b+c*P,s[6]=o*f+a*v+c*L,s[1]=l*x+u*A+h*N,s[4]=l*m+u*b+h*P,s[7]=l*f+u*v+h*L,s[2]=d*x+p*A+_*N,s[5]=d*m+p*b+_*P,s[8]=d*f+p*v+_*L,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],r=t[2],s=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8];return e*o*u-e*a*l-n*s*u+n*a*c+r*s*l-r*o*c}invert(){const t=this.elements,e=t[0],n=t[1],r=t[2],s=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8],h=u*o-a*l,d=a*c-u*s,p=l*s-o*c,_=e*h+n*d+r*p;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/_;return t[0]=h*x,t[1]=(r*l-u*n)*x,t[2]=(a*n-r*o)*x,t[3]=d*x,t[4]=(u*e-r*c)*x,t[5]=(r*s-a*e)*x,t[6]=p*x,t[7]=(n*c-l*e)*x,t[8]=(o*e-n*s)*x,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,r,s,o,a){const c=Math.cos(s),l=Math.sin(s);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-r*l,r*c,-r*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(jr.makeScale(t,e)),this}rotate(t){return this.premultiply(jr.makeRotation(-t)),this}translate(t,e){return this.premultiply(jr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let r=0;r<9;r++)if(e[r]!==n[r])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const jr=new Zt;function El(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Br(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Wc(){const i=Br("canvas");return i.style.display="block",i}const oa={};function gi(i){i in oa||(oa[i]=!0,console.warn(i))}function Xc(i,t,e){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:n()}}setTimeout(s,e)})}const aa=new Zt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),la=new Zt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function qc(){const i={enabled:!0,workingColorSpace:Ei,spaces:{},convert:function(r,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===ie&&(r.r=gn(r.r),r.g=gn(r.g),r.b=gn(r.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===ie&&(r.r=_i(r.r),r.g=_i(r.g),r.b=_i(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===pn?Fr:this.spaces[r].transfer},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,o){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return gi("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return gi("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(r,s)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Ei]:{primaries:t,whitePoint:n,transfer:Fr,toXYZ:aa,fromXYZ:la,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Re},outputColorSpaceConfig:{drawingBufferColorSpace:Re}},[Re]:{primaries:t,whitePoint:n,transfer:ie,toXYZ:aa,fromXYZ:la,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Re}}}),i}const te=qc();function gn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function _i(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Qn;class Yc{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Qn===void 0&&(Qn=Br("canvas")),Qn.width=t.width,Qn.height=t.height;const r=Qn.getContext("2d");t instanceof ImageData?r.putImageData(t,0,0):r.drawImage(t,0,0,t.width,t.height),n=Qn}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Br("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const r=n.getImageData(0,0,t.width,t.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=gn(s[o]/255)*255;return n.putImageData(r,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(gn(e[n]/255)*255):e[n]=gn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Zc=0;class No{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Zc++}),this.uuid=wi(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(Qr(r[o].image)):s.push(Qr(r[o]))}else s=Qr(r);n.url=s}return e||(t.images[this.uuid]=n),n}}function Qr(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Yc.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Kc=0;const ts=new V;class ye extends Ai{constructor(t=ye.DEFAULT_IMAGE,e=ye.DEFAULT_MAPPING,n=Vn,r=Vn,s=Qe,o=Gn,a=Ke,c=rn,l=ye.DEFAULT_ANISOTROPY,u=pn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Kc++}),this.uuid=wi(),this.name="",this.source=new No(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new Tt(0,0),this.repeat=new Tt(1,1),this.center=new Tt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Zt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(ts).x}get height(){return this.source.getSize(ts).y}get depth(){return this.source.getSize(ts).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const r=this[e];if(r===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==dl)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Gi:t.x=t.x-Math.floor(t.x);break;case Vn:t.x=t.x<0?0:1;break;case Xs:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Gi:t.y=t.y-Math.floor(t.y);break;case Vn:t.y=t.y<0?0:1;break;case Xs:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}ye.DEFAULT_IMAGE=null;ye.DEFAULT_MAPPING=dl;ye.DEFAULT_ANISOTROPY=1;class re{constructor(t=0,e=0,n=0,r=1){re.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=r}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,r){return this.x=t,this.y=e,this.z=n,this.w=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,r=this.z,s=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*r+o[12]*s,this.y=o[1]*e+o[5]*n+o[9]*r+o[13]*s,this.z=o[2]*e+o[6]*n+o[10]*r+o[14]*s,this.w=o[3]*e+o[7]*n+o[11]*r+o[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,r,s;const c=t.elements,l=c[0],u=c[4],h=c[8],d=c[1],p=c[5],_=c[9],x=c[2],m=c[6],f=c[10];if(Math.abs(u-d)<.01&&Math.abs(h-x)<.01&&Math.abs(_-m)<.01){if(Math.abs(u+d)<.1&&Math.abs(h+x)<.1&&Math.abs(_+m)<.1&&Math.abs(l+p+f-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const b=(l+1)/2,v=(p+1)/2,N=(f+1)/2,P=(u+d)/4,L=(h+x)/4,F=(_+m)/4;return b>v&&b>N?b<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(b),r=P/n,s=L/n):v>N?v<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(v),n=P/r,s=F/r):N<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(N),n=L/s,r=F/s),this.set(n,r,s,e),this}let A=Math.sqrt((m-_)*(m-_)+(h-x)*(h-x)+(d-u)*(d-u));return Math.abs(A)<.001&&(A=1),this.x=(m-_)/A,this.y=(h-x)/A,this.z=(d-u)/A,this.w=Math.acos((l+p+f-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Jt(this.x,t.x,e.x),this.y=Jt(this.y,t.y,e.y),this.z=Jt(this.z,t.z,e.z),this.w=Jt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Jt(this.x,t,e),this.y=Jt(this.y,t,e),this.z=Jt(this.z,t,e),this.w=Jt(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Jt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Jc extends Ai{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Qe,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new re(0,0,t,e),this.scissorTest=!1,this.viewport=new re(0,0,t,e);const r={width:t,height:e,depth:n.depth},s=new ye(r);this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(t={}){const e={minFilter:Qe,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=t,this.textures[r].image.height=e,this.textures[r].image.depth=n,this.textures[r].isArrayTexture=this.textures[r].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const r=Object.assign({},t.textures[e].image);this.textures[e].source=new No(r)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class qn extends Jc{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class bl extends ye{constructor(t=null,e=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:r},this.magFilter=Fe,this.minFilter=Fe,this.wrapR=Vn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class $c extends ye{constructor(t=null,e=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:r},this.magFilter=Fe,this.minFilter=Fe,this.wrapR=Vn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Rn{constructor(t=new V(1/0,1/0,1/0),e=new V(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(We.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(We.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=We.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const s=n.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,We):We.fromBufferAttribute(s,o),We.applyMatrix4(t.matrixWorld),this.expandByPoint(We);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),ir.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ir.copy(n.boundingBox)),ir.applyMatrix4(t.matrixWorld),this.union(ir)}const r=t.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,We),We.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Li),rr.subVectors(this.max,Li),ti.subVectors(t.a,Li),ei.subVectors(t.b,Li),ni.subVectors(t.c,Li),vn.subVectors(ei,ti),xn.subVectors(ni,ei),Ln.subVectors(ti,ni);let e=[0,-vn.z,vn.y,0,-xn.z,xn.y,0,-Ln.z,Ln.y,vn.z,0,-vn.x,xn.z,0,-xn.x,Ln.z,0,-Ln.x,-vn.y,vn.x,0,-xn.y,xn.x,0,-Ln.y,Ln.x,0];return!es(e,ti,ei,ni,rr)||(e=[1,0,0,0,1,0,0,0,1],!es(e,ti,ei,ni,rr))?!1:(sr.crossVectors(vn,xn),e=[sr.x,sr.y,sr.z],es(e,ti,ei,ni,rr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,We).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(We).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(an[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),an[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),an[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),an[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),an[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),an[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),an[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),an[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(an),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const an=[new V,new V,new V,new V,new V,new V,new V,new V],We=new V,ir=new Rn,ti=new V,ei=new V,ni=new V,vn=new V,xn=new V,Ln=new V,Li=new V,rr=new V,sr=new V,Dn=new V;function es(i,t,e,n,r){for(let s=0,o=i.length-3;s<=o;s+=3){Dn.fromArray(i,s);const a=r.x*Math.abs(Dn.x)+r.y*Math.abs(Dn.y)+r.z*Math.abs(Dn.z),c=t.dot(Dn),l=e.dot(Dn),u=n.dot(Dn);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}const jc=new Rn,Di=new V,ns=new V;class ji{constructor(t=new V,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):jc.setFromPoints(t).getCenter(n);let r=0;for(let s=0,o=t.length;s<o;s++)r=Math.max(r,n.distanceToSquared(t[s]));return this.radius=Math.sqrt(r),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Di.subVectors(t,this.center);const e=Di.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),r=(n-this.radius)*.5;this.center.addScaledVector(Di,r/n),this.radius+=r}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(ns.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Di.copy(t.center).add(ns)),this.expandByPoint(Di.copy(t.center).sub(ns))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}const ln=new V,is=new V,or=new V,Mn=new V,rs=new V,ar=new V,ss=new V;class Qc{constructor(t=new V,e=new V(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,ln)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=ln.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(ln.copy(this.origin).addScaledVector(this.direction,e),ln.distanceToSquared(t))}distanceSqToSegment(t,e,n,r){is.copy(t).add(e).multiplyScalar(.5),or.copy(e).sub(t).normalize(),Mn.copy(this.origin).sub(is);const s=t.distanceTo(e)*.5,o=-this.direction.dot(or),a=Mn.dot(this.direction),c=-Mn.dot(or),l=Mn.lengthSq(),u=Math.abs(1-o*o);let h,d,p,_;if(u>0)if(h=o*c-a,d=o*a-c,_=s*u,h>=0)if(d>=-_)if(d<=_){const x=1/u;h*=x,d*=x,p=h*(h+o*d+2*a)+d*(o*h+d+2*c)+l}else d=s,h=Math.max(0,-(o*d+a)),p=-h*h+d*(d+2*c)+l;else d=-s,h=Math.max(0,-(o*d+a)),p=-h*h+d*(d+2*c)+l;else d<=-_?(h=Math.max(0,-(-o*s+a)),d=h>0?-s:Math.min(Math.max(-s,-c),s),p=-h*h+d*(d+2*c)+l):d<=_?(h=0,d=Math.min(Math.max(-s,-c),s),p=d*(d+2*c)+l):(h=Math.max(0,-(o*s+a)),d=h>0?s:Math.min(Math.max(-s,-c),s),p=-h*h+d*(d+2*c)+l);else d=o>0?-s:s,h=Math.max(0,-(o*d+a)),p=-h*h+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(is).addScaledVector(or,d),p}intersectSphere(t,e){ln.subVectors(t.center,this.origin);const n=ln.dot(this.direction),r=ln.dot(ln)-n*n,s=t.radius*t.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,r,s,o,a,c;const l=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return l>=0?(n=(t.min.x-d.x)*l,r=(t.max.x-d.x)*l):(n=(t.max.x-d.x)*l,r=(t.min.x-d.x)*l),u>=0?(s=(t.min.y-d.y)*u,o=(t.max.y-d.y)*u):(s=(t.max.y-d.y)*u,o=(t.min.y-d.y)*u),n>o||s>r||((s>n||isNaN(n))&&(n=s),(o<r||isNaN(r))&&(r=o),h>=0?(a=(t.min.z-d.z)*h,c=(t.max.z-d.z)*h):(a=(t.max.z-d.z)*h,c=(t.min.z-d.z)*h),n>c||a>r)||((a>n||n!==n)&&(n=a),(c<r||r!==r)&&(r=c),r<0)?null:this.at(n>=0?n:r,e)}intersectsBox(t){return this.intersectBox(t,ln)!==null}intersectTriangle(t,e,n,r,s){rs.subVectors(e,t),ar.subVectors(n,t),ss.crossVectors(rs,ar);let o=this.direction.dot(ss),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Mn.subVectors(this.origin,t);const c=a*this.direction.dot(ar.crossVectors(Mn,ar));if(c<0)return null;const l=a*this.direction.dot(rs.cross(Mn));if(l<0||c+l>o)return null;const u=-a*Mn.dot(ss);return u<0?null:this.at(u/o,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class oe{constructor(t,e,n,r,s,o,a,c,l,u,h,d,p,_,x,m){oe.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,r,s,o,a,c,l,u,h,d,p,_,x,m)}set(t,e,n,r,s,o,a,c,l,u,h,d,p,_,x,m){const f=this.elements;return f[0]=t,f[4]=e,f[8]=n,f[12]=r,f[1]=s,f[5]=o,f[9]=a,f[13]=c,f[2]=l,f[6]=u,f[10]=h,f[14]=d,f[3]=p,f[7]=_,f[11]=x,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new oe().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,r=1/ii.setFromMatrixColumn(t,0).length(),s=1/ii.setFromMatrixColumn(t,1).length(),o=1/ii.setFromMatrixColumn(t,2).length();return e[0]=n[0]*r,e[1]=n[1]*r,e[2]=n[2]*r,e[3]=0,e[4]=n[4]*s,e[5]=n[5]*s,e[6]=n[6]*s,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,r=t.y,s=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(r),l=Math.sin(r),u=Math.cos(s),h=Math.sin(s);if(t.order==="XYZ"){const d=o*u,p=o*h,_=a*u,x=a*h;e[0]=c*u,e[4]=-c*h,e[8]=l,e[1]=p+_*l,e[5]=d-x*l,e[9]=-a*c,e[2]=x-d*l,e[6]=_+p*l,e[10]=o*c}else if(t.order==="YXZ"){const d=c*u,p=c*h,_=l*u,x=l*h;e[0]=d+x*a,e[4]=_*a-p,e[8]=o*l,e[1]=o*h,e[5]=o*u,e[9]=-a,e[2]=p*a-_,e[6]=x+d*a,e[10]=o*c}else if(t.order==="ZXY"){const d=c*u,p=c*h,_=l*u,x=l*h;e[0]=d-x*a,e[4]=-o*h,e[8]=_+p*a,e[1]=p+_*a,e[5]=o*u,e[9]=x-d*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){const d=o*u,p=o*h,_=a*u,x=a*h;e[0]=c*u,e[4]=_*l-p,e[8]=d*l+x,e[1]=c*h,e[5]=x*l+d,e[9]=p*l-_,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){const d=o*c,p=o*l,_=a*c,x=a*l;e[0]=c*u,e[4]=x-d*h,e[8]=_*h+p,e[1]=h,e[5]=o*u,e[9]=-a*u,e[2]=-l*u,e[6]=p*h+_,e[10]=d-x*h}else if(t.order==="XZY"){const d=o*c,p=o*l,_=a*c,x=a*l;e[0]=c*u,e[4]=-h,e[8]=l*u,e[1]=d*h+x,e[5]=o*u,e[9]=p*h-_,e[2]=_*h-p,e[6]=a*u,e[10]=x*h+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(tu,t,eu)}lookAt(t,e,n){const r=this.elements;return De.subVectors(t,e),De.lengthSq()===0&&(De.z=1),De.normalize(),Sn.crossVectors(n,De),Sn.lengthSq()===0&&(Math.abs(n.z)===1?De.x+=1e-4:De.z+=1e-4,De.normalize(),Sn.crossVectors(n,De)),Sn.normalize(),lr.crossVectors(De,Sn),r[0]=Sn.x,r[4]=lr.x,r[8]=De.x,r[1]=Sn.y,r[5]=lr.y,r[9]=De.y,r[2]=Sn.z,r[6]=lr.z,r[10]=De.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,r=e.elements,s=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],u=n[1],h=n[5],d=n[9],p=n[13],_=n[2],x=n[6],m=n[10],f=n[14],A=n[3],b=n[7],v=n[11],N=n[15],P=r[0],L=r[4],F=r[8],S=r[12],M=r[1],C=r[5],tt=r[9],et=r[13],Y=r[2],K=r[6],at=r[10],dt=r[14],nt=r[3],gt=r[7],pt=r[11],ft=r[15];return s[0]=o*P+a*M+c*Y+l*nt,s[4]=o*L+a*C+c*K+l*gt,s[8]=o*F+a*tt+c*at+l*pt,s[12]=o*S+a*et+c*dt+l*ft,s[1]=u*P+h*M+d*Y+p*nt,s[5]=u*L+h*C+d*K+p*gt,s[9]=u*F+h*tt+d*at+p*pt,s[13]=u*S+h*et+d*dt+p*ft,s[2]=_*P+x*M+m*Y+f*nt,s[6]=_*L+x*C+m*K+f*gt,s[10]=_*F+x*tt+m*at+f*pt,s[14]=_*S+x*et+m*dt+f*ft,s[3]=A*P+b*M+v*Y+N*nt,s[7]=A*L+b*C+v*K+N*gt,s[11]=A*F+b*tt+v*at+N*pt,s[15]=A*S+b*et+v*dt+N*ft,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],r=t[8],s=t[12],o=t[1],a=t[5],c=t[9],l=t[13],u=t[2],h=t[6],d=t[10],p=t[14],_=t[3],x=t[7],m=t[11],f=t[15];return _*(+s*c*h-r*l*h-s*a*d+n*l*d+r*a*p-n*c*p)+x*(+e*c*p-e*l*d+s*o*d-r*o*p+r*l*u-s*c*u)+m*(+e*l*h-e*a*p-s*o*h+n*o*p+s*a*u-n*l*u)+f*(-r*a*u-e*c*h+e*a*d+r*o*h-n*o*d+n*c*u)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const r=this.elements;return t.isVector3?(r[12]=t.x,r[13]=t.y,r[14]=t.z):(r[12]=t,r[13]=e,r[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],r=t[2],s=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8],h=t[9],d=t[10],p=t[11],_=t[12],x=t[13],m=t[14],f=t[15],A=h*m*l-x*d*l+x*c*p-a*m*p-h*c*f+a*d*f,b=_*d*l-u*m*l-_*c*p+o*m*p+u*c*f-o*d*f,v=u*x*l-_*h*l+_*a*p-o*x*p-u*a*f+o*h*f,N=_*h*c-u*x*c-_*a*d+o*x*d+u*a*m-o*h*m,P=e*A+n*b+r*v+s*N;if(P===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const L=1/P;return t[0]=A*L,t[1]=(x*d*s-h*m*s-x*r*p+n*m*p+h*r*f-n*d*f)*L,t[2]=(a*m*s-x*c*s+x*r*l-n*m*l-a*r*f+n*c*f)*L,t[3]=(h*c*s-a*d*s-h*r*l+n*d*l+a*r*p-n*c*p)*L,t[4]=b*L,t[5]=(u*m*s-_*d*s+_*r*p-e*m*p-u*r*f+e*d*f)*L,t[6]=(_*c*s-o*m*s-_*r*l+e*m*l+o*r*f-e*c*f)*L,t[7]=(o*d*s-u*c*s+u*r*l-e*d*l-o*r*p+e*c*p)*L,t[8]=v*L,t[9]=(_*h*s-u*x*s-_*n*p+e*x*p+u*n*f-e*h*f)*L,t[10]=(o*x*s-_*a*s+_*n*l-e*x*l-o*n*f+e*a*f)*L,t[11]=(u*a*s-o*h*s-u*n*l+e*h*l+o*n*p-e*a*p)*L,t[12]=N*L,t[13]=(u*x*r-_*h*r+_*n*d-e*x*d-u*n*m+e*h*m)*L,t[14]=(_*a*r-o*x*r-_*n*c+e*x*c+o*n*m-e*a*m)*L,t[15]=(o*h*r-u*a*r+u*n*c-e*h*c-o*n*d+e*a*d)*L,this}scale(t){const e=this.elements,n=t.x,r=t.y,s=t.z;return e[0]*=n,e[4]*=r,e[8]*=s,e[1]*=n,e[5]*=r,e[9]*=s,e[2]*=n,e[6]*=r,e[10]*=s,e[3]*=n,e[7]*=r,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],r=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,r))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),r=Math.sin(e),s=1-n,o=t.x,a=t.y,c=t.z,l=s*o,u=s*a;return this.set(l*o+n,l*a-r*c,l*c+r*a,0,l*a+r*c,u*a+n,u*c-r*o,0,l*c-r*a,u*c+r*o,s*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,r,s,o){return this.set(1,n,s,0,t,1,o,0,e,r,1,0,0,0,0,1),this}compose(t,e,n){const r=this.elements,s=e._x,o=e._y,a=e._z,c=e._w,l=s+s,u=o+o,h=a+a,d=s*l,p=s*u,_=s*h,x=o*u,m=o*h,f=a*h,A=c*l,b=c*u,v=c*h,N=n.x,P=n.y,L=n.z;return r[0]=(1-(x+f))*N,r[1]=(p+v)*N,r[2]=(_-b)*N,r[3]=0,r[4]=(p-v)*P,r[5]=(1-(d+f))*P,r[6]=(m+A)*P,r[7]=0,r[8]=(_+b)*L,r[9]=(m-A)*L,r[10]=(1-(d+x))*L,r[11]=0,r[12]=t.x,r[13]=t.y,r[14]=t.z,r[15]=1,this}decompose(t,e,n){const r=this.elements;let s=ii.set(r[0],r[1],r[2]).length();const o=ii.set(r[4],r[5],r[6]).length(),a=ii.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),t.x=r[12],t.y=r[13],t.z=r[14],Xe.copy(this);const l=1/s,u=1/o,h=1/a;return Xe.elements[0]*=l,Xe.elements[1]*=l,Xe.elements[2]*=l,Xe.elements[4]*=u,Xe.elements[5]*=u,Xe.elements[6]*=u,Xe.elements[8]*=h,Xe.elements[9]*=h,Xe.elements[10]*=h,e.setFromRotationMatrix(Xe),n.x=s,n.y=o,n.z=a,this}makePerspective(t,e,n,r,s,o,a=en,c=!1){const l=this.elements,u=2*s/(e-t),h=2*s/(n-r),d=(e+t)/(e-t),p=(n+r)/(n-r);let _,x;if(c)_=s/(o-s),x=o*s/(o-s);else if(a===en)_=-(o+s)/(o-s),x=-2*o*s/(o-s);else if(a===Or)_=-o/(o-s),x=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=h,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=_,l[14]=x,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,r,s,o,a=en,c=!1){const l=this.elements,u=2/(e-t),h=2/(n-r),d=-(e+t)/(e-t),p=-(n+r)/(n-r);let _,x;if(c)_=1/(o-s),x=o/(o-s);else if(a===en)_=-2/(o-s),x=-(o+s)/(o-s);else if(a===Or)_=-1/(o-s),x=-s/(o-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=h,l[9]=0,l[13]=p,l[2]=0,l[6]=0,l[10]=_,l[14]=x,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let r=0;r<16;r++)if(e[r]!==n[r])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const ii=new V,Xe=new oe,tu=new V(0,0,0),eu=new V(1,1,1),Sn=new V,lr=new V,De=new V,ca=new oe,ua=new Zn;class Ge{constructor(t=0,e=0,n=0,r=Ge.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=r}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,r=this._order){return this._x=t,this._y=e,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const r=t.elements,s=r[0],o=r[4],a=r[8],c=r[1],l=r[5],u=r[9],h=r[2],d=r[6],p=r[10];switch(e){case"XYZ":this._y=Math.asin(Jt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Jt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(Jt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-Jt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Jt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-Jt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return ca.makeRotationFromQuaternion(t),this.setFromRotationMatrix(ca,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return ua.setFromEuler(this),this.setFromQuaternion(ua,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ge.DEFAULT_ORDER="XYZ";class Tl{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let nu=0;const ha=new V,ri=new Zn,cn=new oe,cr=new V,Ii=new V,iu=new V,ru=new Zn,fa=new V(1,0,0),da=new V(0,1,0),pa=new V(0,0,1),ma={type:"added"},su={type:"removed"},si={type:"childadded",child:null},os={type:"childremoved",child:null};class xe extends Ai{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:nu++}),this.uuid=wi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=xe.DEFAULT_UP.clone();const t=new V,e=new Ge,n=new Zn,r=new V(1,1,1);function s(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new oe},normalMatrix:{value:new Zt}}),this.matrix=new oe,this.matrixWorld=new oe,this.matrixAutoUpdate=xe.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=xe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Tl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return ri.setFromAxisAngle(t,e),this.quaternion.multiply(ri),this}rotateOnWorldAxis(t,e){return ri.setFromAxisAngle(t,e),this.quaternion.premultiply(ri),this}rotateX(t){return this.rotateOnAxis(fa,t)}rotateY(t){return this.rotateOnAxis(da,t)}rotateZ(t){return this.rotateOnAxis(pa,t)}translateOnAxis(t,e){return ha.copy(t).applyQuaternion(this.quaternion),this.position.add(ha.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(fa,t)}translateY(t){return this.translateOnAxis(da,t)}translateZ(t){return this.translateOnAxis(pa,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(cn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?cr.copy(t):cr.set(t,e,n);const r=this.parent;this.updateWorldMatrix(!0,!1),Ii.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?cn.lookAt(Ii,cr,this.up):cn.lookAt(cr,Ii,this.up),this.quaternion.setFromRotationMatrix(cn),r&&(cn.extractRotation(r.matrixWorld),ri.setFromRotationMatrix(cn),this.quaternion.premultiply(ri.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(ma),si.child=t,this.dispatchEvent(si),si.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(su),os.child=t,this.dispatchEvent(os),os.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),cn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),cn.multiply(t.parent.matrixWorld)),t.applyMatrix4(cn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(ma),si.child=t,this.dispatchEvent(si),si.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,r=this.children.length;n<r;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ii,t,iu),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ii,ru,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(a=>({...a})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(t),r.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const h=c[l];s(t.shapes,h)}else s(t.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(s(t.materials,this.material[c]));r.material=a}else r.material=s(t.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];r.animations.push(s(t.animations,c))}}if(e){const a=o(t.geometries),c=o(t.materials),l=o(t.textures),u=o(t.images),h=o(t.shapes),d=o(t.skeletons),p=o(t.animations),_=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),d.length>0&&(n.skeletons=d),p.length>0&&(n.animations=p),_.length>0&&(n.nodes=_)}return n.object=r,n;function o(a){const c=[];for(const l in a){const u=a[l];delete u.metadata,c.push(u)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const r=t.children[n];this.add(r.clone())}return this}}xe.DEFAULT_UP=new V(0,1,0);xe.DEFAULT_MATRIX_AUTO_UPDATE=!0;xe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const qe=new V,un=new V,as=new V,hn=new V,oi=new V,ai=new V,ga=new V,ls=new V,cs=new V,us=new V,hs=new re,fs=new re,ds=new re;class Ye{constructor(t=new V,e=new V,n=new V){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,r){r.subVectors(n,e),qe.subVectors(t,e),r.cross(qe);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(t,e,n,r,s){qe.subVectors(r,e),un.subVectors(n,e),as.subVectors(t,e);const o=qe.dot(qe),a=qe.dot(un),c=qe.dot(as),l=un.dot(un),u=un.dot(as),h=o*l-a*a;if(h===0)return s.set(0,0,0),null;const d=1/h,p=(l*c-a*u)*d,_=(o*u-a*c)*d;return s.set(1-p-_,_,p)}static containsPoint(t,e,n,r){return this.getBarycoord(t,e,n,r,hn)===null?!1:hn.x>=0&&hn.y>=0&&hn.x+hn.y<=1}static getInterpolation(t,e,n,r,s,o,a,c){return this.getBarycoord(t,e,n,r,hn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,hn.x),c.addScaledVector(o,hn.y),c.addScaledVector(a,hn.z),c)}static getInterpolatedAttribute(t,e,n,r,s,o){return hs.setScalar(0),fs.setScalar(0),ds.setScalar(0),hs.fromBufferAttribute(t,e),fs.fromBufferAttribute(t,n),ds.fromBufferAttribute(t,r),o.setScalar(0),o.addScaledVector(hs,s.x),o.addScaledVector(fs,s.y),o.addScaledVector(ds,s.z),o}static isFrontFacing(t,e,n,r){return qe.subVectors(n,e),un.subVectors(t,e),qe.cross(un).dot(r)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,r){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[r]),this}setFromAttributeAndIndices(t,e,n,r){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,r),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return qe.subVectors(this.c,this.b),un.subVectors(this.a,this.b),qe.cross(un).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Ye.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Ye.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,r,s){return Ye.getInterpolation(t,this.a,this.b,this.c,e,n,r,s)}containsPoint(t){return Ye.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Ye.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,r=this.b,s=this.c;let o,a;oi.subVectors(r,n),ai.subVectors(s,n),ls.subVectors(t,n);const c=oi.dot(ls),l=ai.dot(ls);if(c<=0&&l<=0)return e.copy(n);cs.subVectors(t,r);const u=oi.dot(cs),h=ai.dot(cs);if(u>=0&&h<=u)return e.copy(r);const d=c*h-u*l;if(d<=0&&c>=0&&u<=0)return o=c/(c-u),e.copy(n).addScaledVector(oi,o);us.subVectors(t,s);const p=oi.dot(us),_=ai.dot(us);if(_>=0&&p<=_)return e.copy(s);const x=p*l-c*_;if(x<=0&&l>=0&&_<=0)return a=l/(l-_),e.copy(n).addScaledVector(ai,a);const m=u*_-p*h;if(m<=0&&h-u>=0&&p-_>=0)return ga.subVectors(s,r),a=(h-u)/(h-u+(p-_)),e.copy(r).addScaledVector(ga,a);const f=1/(m+x+d);return o=x*f,a=d*f,e.copy(n).addScaledVector(oi,o).addScaledVector(ai,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Al={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},yn={h:0,s:0,l:0},ur={h:0,s:0,l:0};function ps(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Xt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const r=t;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Re){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,te.colorSpaceToWorking(this,e),this}setRGB(t,e,n,r=te.workingColorSpace){return this.r=t,this.g=e,this.b=n,te.colorSpaceToWorking(this,r),this}setHSL(t,e,n,r=te.workingColorSpace){if(t=Gc(t,1),e=Jt(e,0,1),n=Jt(n,0,1),e===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+e):n+e-n*e,o=2*n-s;this.r=ps(o,s,t+1/3),this.g=ps(o,s,t),this.b=ps(o,s,t-1/3)}return te.colorSpaceToWorking(this,r),this}setStyle(t,e=Re){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(s,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Re){const n=Al[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=gn(t.r),this.g=gn(t.g),this.b=gn(t.b),this}copyLinearToSRGB(t){return this.r=_i(t.r),this.g=_i(t.g),this.b=_i(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Re){return te.workingToColorSpace(Se.copy(this),t),Math.round(Jt(Se.r*255,0,255))*65536+Math.round(Jt(Se.g*255,0,255))*256+Math.round(Jt(Se.b*255,0,255))}getHexString(t=Re){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=te.workingColorSpace){te.workingToColorSpace(Se.copy(this),e);const n=Se.r,r=Se.g,s=Se.b,o=Math.max(n,r,s),a=Math.min(n,r,s);let c,l;const u=(a+o)/2;if(a===o)c=0,l=0;else{const h=o-a;switch(l=u<=.5?h/(o+a):h/(2-o-a),o){case n:c=(r-s)/h+(r<s?6:0);break;case r:c=(s-n)/h+2;break;case s:c=(n-r)/h+4;break}c/=6}return t.h=c,t.s=l,t.l=u,t}getRGB(t,e=te.workingColorSpace){return te.workingToColorSpace(Se.copy(this),e),t.r=Se.r,t.g=Se.g,t.b=Se.b,t}getStyle(t=Re){te.workingToColorSpace(Se.copy(this),t);const e=Se.r,n=Se.g,r=Se.b;return t!==Re?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(t,e,n){return this.getHSL(yn),this.setHSL(yn.h+t,yn.s+e,yn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(yn),t.getHSL(ur);const n=Jr(yn.h,ur.h,e),r=Jr(yn.s,ur.s,e),s=Jr(yn.l,ur.l,e);return this.setHSL(n,r,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,r=this.b,s=t.elements;return this.r=s[0]*e+s[3]*n+s[6]*r,this.g=s[1]*e+s[4]*n+s[7]*r,this.b=s[2]*e+s[5]*n+s[8]*r,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Se=new Xt;Xt.NAMES=Al;let ou=0;class Qi extends Ai{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ou++}),this.uuid=wi(),this.name="",this.type="Material",this.blending=mi,this.side=wn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Us,this.blendDst=Ns,this.blendEquation=zn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Xt(0,0,0),this.blendAlpha=0,this.depthFunc=Mi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=na,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=jn,this.stencilZFail=jn,this.stencilZPass=jn,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const r=this[e];if(r===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==mi&&(n.blending=this.blending),this.side!==wn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Us&&(n.blendSrc=this.blendSrc),this.blendDst!==Ns&&(n.blendDst=this.blendDst),this.blendEquation!==zn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Mi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==na&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==jn&&(n.stencilFail=this.stencilFail),this.stencilZFail!==jn&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==jn&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const o=[];for(const a in s){const c=s[a];delete c.metadata,o.push(c)}return o}if(e){const s=r(t.textures),o=r(t.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const r=e.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=e[s].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class Fo extends Qi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Xt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ge,this.combine=hl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const de=new V,hr=new Tt;let au=0;class Ve{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:au++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=ia,this.updateRanges=[],this.gpuType=tn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[t+r]=e.array[n+r];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)hr.fromBufferAttribute(this,e),hr.applyMatrix3(t),this.setXY(e,hr.x,hr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)de.fromBufferAttribute(this,e),de.applyMatrix3(t),this.setXYZ(e,de.x,de.y,de.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)de.fromBufferAttribute(this,e),de.applyMatrix4(t),this.setXYZ(e,de.x,de.y,de.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)de.fromBufferAttribute(this,e),de.applyNormalMatrix(t),this.setXYZ(e,de.x,de.y,de.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)de.fromBufferAttribute(this,e),de.transformDirection(t),this.setXYZ(e,de.x,de.y,de.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Pi(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=we(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Pi(e,this.array)),e}setX(t,e){return this.normalized&&(e=we(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Pi(e,this.array)),e}setY(t,e){return this.normalized&&(e=we(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Pi(e,this.array)),e}setZ(t,e){return this.normalized&&(e=we(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Pi(e,this.array)),e}setW(t,e){return this.normalized&&(e=we(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=we(e,this.array),n=we(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,r){return t*=this.itemSize,this.normalized&&(e=we(e,this.array),n=we(n,this.array),r=we(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=r,this}setXYZW(t,e,n,r,s){return t*=this.itemSize,this.normalized&&(e=we(e,this.array),n=we(n,this.array),r=we(r,this.array),s=we(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=r,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==ia&&(t.usage=this.usage),t}}class wl extends Ve{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Rl extends Ve{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class jt extends Ve{constructor(t,e,n){super(new Float32Array(t),e,n)}}let lu=0;const ke=new oe,ms=new xe,li=new V,Ie=new Rn,Ui=new Rn,_e=new V;class pe extends Ai{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:lu++}),this.uuid=wi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(El(t)?Rl:wl)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Zt().getNormalMatrix(t);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(t),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return ke.makeRotationFromQuaternion(t),this.applyMatrix4(ke),this}rotateX(t){return ke.makeRotationX(t),this.applyMatrix4(ke),this}rotateY(t){return ke.makeRotationY(t),this.applyMatrix4(ke),this}rotateZ(t){return ke.makeRotationZ(t),this.applyMatrix4(ke),this}translate(t,e,n){return ke.makeTranslation(t,e,n),this.applyMatrix4(ke),this}scale(t,e,n){return ke.makeScale(t,e,n),this.applyMatrix4(ke),this}lookAt(t){return ms.lookAt(t),ms.updateMatrix(),this.applyMatrix4(ms.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(li).negate(),this.translate(li.x,li.y,li.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let r=0,s=t.length;r<s;r++){const o=t[r];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new jt(n,3))}else{const n=Math.min(t.length,e.count);for(let r=0;r<n;r++){const s=t[r];e.setXYZ(r,s.x,s.y,s.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Rn);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new V(-1/0,-1/0,-1/0),new V(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,r=e.length;n<r;n++){const s=e[n];Ie.setFromBufferAttribute(s),this.morphTargetsRelative?(_e.addVectors(this.boundingBox.min,Ie.min),this.boundingBox.expandByPoint(_e),_e.addVectors(this.boundingBox.max,Ie.max),this.boundingBox.expandByPoint(_e)):(this.boundingBox.expandByPoint(Ie.min),this.boundingBox.expandByPoint(Ie.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ji);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new V,1/0);return}if(t){const n=this.boundingSphere.center;if(Ie.setFromBufferAttribute(t),e)for(let s=0,o=e.length;s<o;s++){const a=e[s];Ui.setFromBufferAttribute(a),this.morphTargetsRelative?(_e.addVectors(Ie.min,Ui.min),Ie.expandByPoint(_e),_e.addVectors(Ie.max,Ui.max),Ie.expandByPoint(_e)):(Ie.expandByPoint(Ui.min),Ie.expandByPoint(Ui.max))}Ie.getCenter(n);let r=0;for(let s=0,o=t.count;s<o;s++)_e.fromBufferAttribute(t,s),r=Math.max(r,n.distanceToSquared(_e));if(e)for(let s=0,o=e.length;s<o;s++){const a=e[s],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)_e.fromBufferAttribute(a,l),c&&(li.fromBufferAttribute(t,l),_e.add(li)),r=Math.max(r,n.distanceToSquared(_e))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,r=e.normal,s=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ve(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let F=0;F<n.count;F++)a[F]=new V,c[F]=new V;const l=new V,u=new V,h=new V,d=new Tt,p=new Tt,_=new Tt,x=new V,m=new V;function f(F,S,M){l.fromBufferAttribute(n,F),u.fromBufferAttribute(n,S),h.fromBufferAttribute(n,M),d.fromBufferAttribute(s,F),p.fromBufferAttribute(s,S),_.fromBufferAttribute(s,M),u.sub(l),h.sub(l),p.sub(d),_.sub(d);const C=1/(p.x*_.y-_.x*p.y);isFinite(C)&&(x.copy(u).multiplyScalar(_.y).addScaledVector(h,-p.y).multiplyScalar(C),m.copy(h).multiplyScalar(p.x).addScaledVector(u,-_.x).multiplyScalar(C),a[F].add(x),a[S].add(x),a[M].add(x),c[F].add(m),c[S].add(m),c[M].add(m))}let A=this.groups;A.length===0&&(A=[{start:0,count:t.count}]);for(let F=0,S=A.length;F<S;++F){const M=A[F],C=M.start,tt=M.count;for(let et=C,Y=C+tt;et<Y;et+=3)f(t.getX(et+0),t.getX(et+1),t.getX(et+2))}const b=new V,v=new V,N=new V,P=new V;function L(F){N.fromBufferAttribute(r,F),P.copy(N);const S=a[F];b.copy(S),b.sub(N.multiplyScalar(N.dot(S))).normalize(),v.crossVectors(P,S);const C=v.dot(c[F])<0?-1:1;o.setXYZW(F,b.x,b.y,b.z,C)}for(let F=0,S=A.length;F<S;++F){const M=A[F],C=M.start,tt=M.count;for(let et=C,Y=C+tt;et<Y;et+=3)L(t.getX(et+0)),L(t.getX(et+1)),L(t.getX(et+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ve(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,p=n.count;d<p;d++)n.setXYZ(d,0,0,0);const r=new V,s=new V,o=new V,a=new V,c=new V,l=new V,u=new V,h=new V;if(t)for(let d=0,p=t.count;d<p;d+=3){const _=t.getX(d+0),x=t.getX(d+1),m=t.getX(d+2);r.fromBufferAttribute(e,_),s.fromBufferAttribute(e,x),o.fromBufferAttribute(e,m),u.subVectors(o,s),h.subVectors(r,s),u.cross(h),a.fromBufferAttribute(n,_),c.fromBufferAttribute(n,x),l.fromBufferAttribute(n,m),a.add(u),c.add(u),l.add(u),n.setXYZ(_,a.x,a.y,a.z),n.setXYZ(x,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let d=0,p=e.count;d<p;d+=3)r.fromBufferAttribute(e,d+0),s.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),u.subVectors(o,s),h.subVectors(r,s),u.cross(h),n.setXYZ(d+0,u.x,u.y,u.z),n.setXYZ(d+1,u.x,u.y,u.z),n.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)_e.fromBufferAttribute(t,e),_e.normalize(),t.setXYZ(e,_e.x,_e.y,_e.z)}toNonIndexed(){function t(a,c){const l=a.array,u=a.itemSize,h=a.normalized,d=new l.constructor(c.length*u);let p=0,_=0;for(let x=0,m=c.length;x<m;x++){a.isInterleavedBufferAttribute?p=c[x]*a.data.stride+a.offset:p=c[x]*u;for(let f=0;f<u;f++)d[_++]=l[p++]}return new Ve(d,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new pe,n=this.index.array,r=this.attributes;for(const a in r){const c=r[a],l=t(c,n);e.setAttribute(a,l)}const s=this.morphAttributes;for(const a in s){const c=[],l=s[a];for(let u=0,h=l.length;u<h;u++){const d=l[u],p=t(d,n);c.push(p)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const r={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let h=0,d=l.length;h<d;h++){const p=l[h];u.push(p.toJSON(t.data))}u.length>0&&(r[c]=u,s=!0)}s&&(t.data.morphAttributes=r,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const r=t.attributes;for(const l in r){const u=r[l];this.setAttribute(l,u.clone(e))}const s=t.morphAttributes;for(const l in s){const u=[],h=s[l];for(let d=0,p=h.length;d<p;d++)u.push(h[d].clone(e));this.morphAttributes[l]=u}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let l=0,u=o.length;l<u;l++){const h=o[l];this.addGroup(h.start,h.count,h.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const _a=new oe,In=new Qc,fr=new ji,va=new V,dr=new V,pr=new V,mr=new V,gs=new V,gr=new V,xa=new V,_r=new V;class He extends xe{constructor(t=new pe,e=new Fo){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const r=e[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(t,e){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(r,t);const a=this.morphTargetInfluences;if(s&&a){gr.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const u=a[c],h=s[c];u!==0&&(gs.fromBufferAttribute(h,t),o?gr.addScaledVector(gs,u):gr.addScaledVector(gs.sub(e),u))}e.add(gr)}return e}raycast(t,e){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),fr.copy(n.boundingSphere),fr.applyMatrix4(s),In.copy(t.ray).recast(t.near),!(fr.containsPoint(In.origin)===!1&&(In.intersectSphere(fr,va)===null||In.origin.distanceToSquared(va)>(t.far-t.near)**2))&&(_a.copy(s).invert(),In.copy(t.ray).applyMatrix4(_a),!(n.boundingBox!==null&&In.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,In)))}_computeIntersections(t,e,n){let r;const s=this.geometry,o=this.material,a=s.index,c=s.attributes.position,l=s.attributes.uv,u=s.attributes.uv1,h=s.attributes.normal,d=s.groups,p=s.drawRange;if(a!==null)if(Array.isArray(o))for(let _=0,x=d.length;_<x;_++){const m=d[_],f=o[m.materialIndex],A=Math.max(m.start,p.start),b=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let v=A,N=b;v<N;v+=3){const P=a.getX(v),L=a.getX(v+1),F=a.getX(v+2);r=vr(this,f,t,n,l,u,h,P,L,F),r&&(r.faceIndex=Math.floor(v/3),r.face.materialIndex=m.materialIndex,e.push(r))}}else{const _=Math.max(0,p.start),x=Math.min(a.count,p.start+p.count);for(let m=_,f=x;m<f;m+=3){const A=a.getX(m),b=a.getX(m+1),v=a.getX(m+2);r=vr(this,o,t,n,l,u,h,A,b,v),r&&(r.faceIndex=Math.floor(m/3),e.push(r))}}else if(c!==void 0)if(Array.isArray(o))for(let _=0,x=d.length;_<x;_++){const m=d[_],f=o[m.materialIndex],A=Math.max(m.start,p.start),b=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let v=A,N=b;v<N;v+=3){const P=v,L=v+1,F=v+2;r=vr(this,f,t,n,l,u,h,P,L,F),r&&(r.faceIndex=Math.floor(v/3),r.face.materialIndex=m.materialIndex,e.push(r))}}else{const _=Math.max(0,p.start),x=Math.min(c.count,p.start+p.count);for(let m=_,f=x;m<f;m+=3){const A=m,b=m+1,v=m+2;r=vr(this,o,t,n,l,u,h,A,b,v),r&&(r.faceIndex=Math.floor(m/3),e.push(r))}}}}function cu(i,t,e,n,r,s,o,a){let c;if(t.side===Te?c=n.intersectTriangle(o,s,r,!0,a):c=n.intersectTriangle(r,s,o,t.side===wn,a),c===null)return null;_r.copy(a),_r.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(_r);return l<e.near||l>e.far?null:{distance:l,point:_r.clone(),object:i}}function vr(i,t,e,n,r,s,o,a,c,l){i.getVertexPosition(a,dr),i.getVertexPosition(c,pr),i.getVertexPosition(l,mr);const u=cu(i,t,e,n,dr,pr,mr,xa);if(u){const h=new V;Ye.getBarycoord(xa,dr,pr,mr,h),r&&(u.uv=Ye.getInterpolatedAttribute(r,a,c,l,h,new Tt)),s&&(u.uv1=Ye.getInterpolatedAttribute(s,a,c,l,h,new Tt)),o&&(u.normal=Ye.getInterpolatedAttribute(o,a,c,l,h,new V),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const d={a,b:c,c:l,normal:new V,materialIndex:0};Ye.getNormal(dr,pr,mr,d.normal),u.face=d,u.barycoord=h}return u}class Kn extends pe{constructor(t=1,e=1,n=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const c=[],l=[],u=[],h=[];let d=0,p=0;_("z","y","x",-1,-1,n,e,t,o,s,0),_("z","y","x",1,-1,n,e,-t,o,s,1),_("x","z","y",1,1,t,n,e,r,o,2),_("x","z","y",1,-1,t,n,-e,r,o,3),_("x","y","z",1,-1,t,e,n,r,s,4),_("x","y","z",-1,-1,t,e,-n,r,s,5),this.setIndex(c),this.setAttribute("position",new jt(l,3)),this.setAttribute("normal",new jt(u,3)),this.setAttribute("uv",new jt(h,2));function _(x,m,f,A,b,v,N,P,L,F,S){const M=v/L,C=N/F,tt=v/2,et=N/2,Y=P/2,K=L+1,at=F+1;let dt=0,nt=0;const gt=new V;for(let pt=0;pt<at;pt++){const ft=pt*C-et;for(let vt=0;vt<K;vt++){const Mt=vt*M-tt;gt[x]=Mt*A,gt[m]=ft*b,gt[f]=Y,l.push(gt.x,gt.y,gt.z),gt[x]=0,gt[m]=0,gt[f]=P>0?1:-1,u.push(gt.x,gt.y,gt.z),h.push(vt/L),h.push(1-pt/F),dt+=1}}for(let pt=0;pt<F;pt++)for(let ft=0;ft<L;ft++){const vt=d+ft+K*pt,Mt=d+ft+K*(pt+1),Rt=d+(ft+1)+K*(pt+1),st=d+(ft+1)+K*pt;c.push(vt,Mt,st),c.push(Mt,Rt,st),nt+=6}a.addGroup(p,nt,S),p+=nt,d+=dt}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Kn(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function bi(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const r=i[e][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=r.clone():Array.isArray(r)?t[e][n]=r.slice():t[e][n]=r}}return t}function be(i){const t={};for(let e=0;e<i.length;e++){const n=bi(i[e]);for(const r in n)t[r]=n[r]}return t}function uu(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Cl(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:te.workingColorSpace}const hu={clone:bi,merge:be};var fu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,du=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class _n extends Qi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=fu,this.fragmentShader=du,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=bi(t.uniforms),this.uniformsGroups=uu(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?e.uniforms[r]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[r]={type:"m4",value:o.toArray()}:e.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Pl extends xe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new oe,this.projectionMatrix=new oe,this.projectionMatrixInverse=new oe,this.coordinateSystem=en,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const En=new V,Ma=new Tt,Sa=new Tt;class Ne extends Pl{constructor(t=50,e=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=xo*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Kr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return xo*2*Math.atan(Math.tan(Kr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){En.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(En.x,En.y).multiplyScalar(-t/En.z),En.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(En.x,En.y).multiplyScalar(-t/En.z)}getViewSize(t,e){return this.getViewBounds(t,Ma,Sa),e.subVectors(Sa,Ma)}setViewOffset(t,e,n,r,s,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Kr*.5*this.fov)/this.zoom,n=2*e,r=this.aspect*n,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;s+=o.offsetX*r/c,e-=o.offsetY*n/l,r*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(s+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const ci=-90,ui=1;class pu extends xe{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Ne(ci,ui,t,e);r.layers=this.layers,this.add(r);const s=new Ne(ci,ui,t,e);s.layers=this.layers,this.add(s);const o=new Ne(ci,ui,t,e);o.layers=this.layers,this.add(o);const a=new Ne(ci,ui,t,e);a.layers=this.layers,this.add(a);const c=new Ne(ci,ui,t,e);c.layers=this.layers,this.add(c);const l=new Ne(ci,ui,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,r,s,o,a,c]=e;for(const l of e)this.remove(l);if(t===en)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Or)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,c,l,u]=this.children,h=t.getRenderTarget(),d=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),_=t.xr.enabled;t.xr.enabled=!1;const x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,r),t.render(e,s),t.setRenderTarget(n,1,r),t.render(e,o),t.setRenderTarget(n,2,r),t.render(e,a),t.setRenderTarget(n,3,r),t.render(e,c),t.setRenderTarget(n,4,r),t.render(e,l),n.texture.generateMipmaps=x,t.setRenderTarget(n,5,r),t.render(e,u),t.setRenderTarget(h,d,p),t.xr.enabled=_,n.texture.needsPMREMUpdate=!0}}class Ll extends ye{constructor(t=[],e=Si,n,r,s,o,a,c,l,u){super(t,e,n,r,s,o,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class mu extends qn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},r=[n,n,n,n,n,n];this.texture=new Ll(r),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Kn(5,5,5),s=new _n({name:"CubemapFromEquirect",uniforms:bi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Te,blending:Tn});s.uniforms.tEquirect.value=e;const o=new He(r,s),a=e.minFilter;return e.minFilter===Gn&&(e.minFilter=Qe),new pu(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,r=!0){const s=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,r);t.setRenderTarget(s)}}class xr extends xe{constructor(){super(),this.isGroup=!0,this.type="Group"}}const gu={type:"move"};class _s{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new xr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new xr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new V,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new V),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new xr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new V,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new V),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let r=null,s=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(const x of t.hand.values()){const m=e.getJointPose(x,n),f=this._getHandJoint(l,x);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const u=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],d=u.position.distanceTo(h.position),p=.02,_=.005;l.inputState.pinching&&d>p+_?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&d<=p-_&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(r=e.getPose(t.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(gu)))}return a!==null&&(a.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new xr;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}class Oo{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Xt(t),this.near=e,this.far=n}clone(){return new Oo(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class _u extends xe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ge,this.environmentIntensity=1,this.environmentRotation=new Ge,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class vu extends ye{constructor(t=null,e=1,n=1,r,s,o,a,c,l=Fe,u=Fe,h,d){super(null,o,a,c,l,u,r,s,h,d),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ya extends Ve{constructor(t,e,n,r=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const hi=new oe,Ea=new oe,Mr=[],ba=new Rn,xu=new oe,Ni=new He,Fi=new ji;class Mu extends He{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new ya(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<n;r++)this.setMatrixAt(r,xu)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Rn),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,hi),ba.copy(t.boundingBox).applyMatrix4(hi),this.boundingBox.union(ba)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new ji),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,hi),Fi.copy(t.boundingSphere).applyMatrix4(hi),this.boundingSphere.union(Fi)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,r=this.morphTexture.source.data.data,s=n.length+1,o=t*s+1;for(let a=0;a<n.length;a++)n[a]=r[o+a]}raycast(t,e){const n=this.matrixWorld,r=this.count;if(Ni.geometry=this.geometry,Ni.material=this.material,Ni.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Fi.copy(this.boundingSphere),Fi.applyMatrix4(n),t.ray.intersectsSphere(Fi)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,hi),Ea.multiplyMatrices(n,hi),Ni.matrixWorld=Ea,Ni.raycast(t,Mr);for(let o=0,a=Mr.length;o<a;o++){const c=Mr[o];c.instanceId=s,c.object=this,e.push(c)}Mr.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new ya(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new vu(new Float32Array(r*this.count),r,this.count,Lo,tn));const s=this.morphTexture.source.data.data;let o=0;for(let l=0;l<n.length;l++)o+=n[l];const a=this.geometry.morphTargetsRelative?1:1-o,c=r*t;s[c]=a,s.set(n,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const vs=new V,Su=new V,yu=new Zt;class Bn{constructor(t=new V(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,r){return this.normal.set(t,e,n),this.constant=r,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const r=vs.subVectors(n,e).cross(Su.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(r,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(vs),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:e.copy(t.start).addScaledVector(n,s)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||yu.getNormalMatrix(t),r=this.coplanarPoint(vs).applyMatrix4(t),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Un=new ji,Eu=new Tt(.5,.5),Sr=new V;class Wr{constructor(t=new Bn,e=new Bn,n=new Bn,r=new Bn,s=new Bn,o=new Bn){this.planes=[t,e,n,r,s,o]}set(t,e,n,r,s,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=en,n=!1){const r=this.planes,s=t.elements,o=s[0],a=s[1],c=s[2],l=s[3],u=s[4],h=s[5],d=s[6],p=s[7],_=s[8],x=s[9],m=s[10],f=s[11],A=s[12],b=s[13],v=s[14],N=s[15];if(r[0].setComponents(l-o,p-u,f-_,N-A).normalize(),r[1].setComponents(l+o,p+u,f+_,N+A).normalize(),r[2].setComponents(l+a,p+h,f+x,N+b).normalize(),r[3].setComponents(l-a,p-h,f-x,N-b).normalize(),n)r[4].setComponents(c,d,m,v).normalize(),r[5].setComponents(l-c,p-d,f-m,N-v).normalize();else if(r[4].setComponents(l-c,p-d,f-m,N-v).normalize(),e===en)r[5].setComponents(l+c,p+d,f+m,N+v).normalize();else if(e===Or)r[5].setComponents(c,d,m,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Un.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Un.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Un)}intersectsSprite(t){Un.center.set(0,0,0);const e=Eu.distanceTo(t.center);return Un.radius=.7071067811865476+e,Un.applyMatrix4(t.matrixWorld),this.intersectsSphere(Un)}intersectsSphere(t){const e=this.planes,n=t.center,r=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const r=e[n];if(Sr.x=r.normal.x>0?t.max.x:t.min.x,Sr.y=r.normal.y>0?t.max.y:t.min.y,Sr.z=r.normal.z>0?t.max.z:t.min.z,r.distanceToPoint(Sr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class bu extends ye{constructor(t,e,n,r,s,o,a,c,l){super(t,e,n,r,s,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Dl extends ye{constructor(t,e,n=Xn,r,s,o,a=Fe,c=Fe,l,u=qi,h=1){if(u!==qi&&u!==Yi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:t,height:e,depth:h};super(d,r,s,o,a,c,u,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new No(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class vi extends pe{constructor(t=1,e=1,n=1,r=32,s=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:c};const l=this;r=Math.floor(r),s=Math.floor(s);const u=[],h=[],d=[],p=[];let _=0;const x=[],m=n/2;let f=0;A(),o===!1&&(t>0&&b(!0),e>0&&b(!1)),this.setIndex(u),this.setAttribute("position",new jt(h,3)),this.setAttribute("normal",new jt(d,3)),this.setAttribute("uv",new jt(p,2));function A(){const v=new V,N=new V;let P=0;const L=(e-t)/n;for(let F=0;F<=s;F++){const S=[],M=F/s,C=M*(e-t)+t;for(let tt=0;tt<=r;tt++){const et=tt/r,Y=et*c+a,K=Math.sin(Y),at=Math.cos(Y);N.x=C*K,N.y=-M*n+m,N.z=C*at,h.push(N.x,N.y,N.z),v.set(K,L,at).normalize(),d.push(v.x,v.y,v.z),p.push(et,1-M),S.push(_++)}x.push(S)}for(let F=0;F<r;F++)for(let S=0;S<s;S++){const M=x[S][F],C=x[S+1][F],tt=x[S+1][F+1],et=x[S][F+1];(t>0||S!==0)&&(u.push(M,C,et),P+=3),(e>0||S!==s-1)&&(u.push(C,tt,et),P+=3)}l.addGroup(f,P,0),f+=P}function b(v){const N=_,P=new Tt,L=new V;let F=0;const S=v===!0?t:e,M=v===!0?1:-1;for(let tt=1;tt<=r;tt++)h.push(0,m*M,0),d.push(0,M,0),p.push(.5,.5),_++;const C=_;for(let tt=0;tt<=r;tt++){const Y=tt/r*c+a,K=Math.cos(Y),at=Math.sin(Y);L.x=S*at,L.y=m*M,L.z=S*K,h.push(L.x,L.y,L.z),d.push(0,M,0),P.x=K*.5+.5,P.y=at*.5*M+.5,p.push(P.x,P.y),_++}for(let tt=0;tt<r;tt++){const et=N+tt,Y=C+tt;v===!0?u.push(Y,Y+1,et):u.push(Y+1,Y,et),F+=3}l.addGroup(f,F,v===!0?1:2),f+=F}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new vi(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class sn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,r=this.getPoint(0),s=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),s+=n.distanceTo(r),e.push(s),r=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){const n=this.getLengths();let r=0;const s=n.length;let o;e?o=e:o=t*n[s-1];let a=0,c=s-1,l;for(;a<=c;)if(r=Math.floor(a+(c-a)/2),l=n[r]-o,l<0)a=r+1;else if(l>0)c=r-1;else{c=r;break}if(r=c,n[r]===o)return r/(s-1);const u=n[r],d=n[r+1]-u,p=(o-u)/d;return(r+p)/(s-1)}getTangent(t,e){let r=t-1e-4,s=t+1e-4;r<0&&(r=0),s>1&&(s=1);const o=this.getPoint(r),a=this.getPoint(s),c=e||(o.isVector2?new Tt:new V);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){const n=new V,r=[],s=[],o=[],a=new V,c=new oe;for(let p=0;p<=t;p++){const _=p/t;r[p]=this.getTangentAt(_,new V)}s[0]=new V,o[0]=new V;let l=Number.MAX_VALUE;const u=Math.abs(r[0].x),h=Math.abs(r[0].y),d=Math.abs(r[0].z);u<=l&&(l=u,n.set(1,0,0)),h<=l&&(l=h,n.set(0,1,0)),d<=l&&n.set(0,0,1),a.crossVectors(r[0],n).normalize(),s[0].crossVectors(r[0],a),o[0].crossVectors(r[0],s[0]);for(let p=1;p<=t;p++){if(s[p]=s[p-1].clone(),o[p]=o[p-1].clone(),a.crossVectors(r[p-1],r[p]),a.length()>Number.EPSILON){a.normalize();const _=Math.acos(Jt(r[p-1].dot(r[p]),-1,1));s[p].applyMatrix4(c.makeRotationAxis(a,_))}o[p].crossVectors(r[p],s[p])}if(e===!0){let p=Math.acos(Jt(s[0].dot(s[t]),-1,1));p/=t,r[0].dot(a.crossVectors(s[0],s[t]))>0&&(p=-p);for(let _=1;_<=t;_++)s[_].applyMatrix4(c.makeRotationAxis(r[_],p*_)),o[_].crossVectors(r[_],s[_])}return{tangents:r,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Bo extends sn{constructor(t=0,e=0,n=1,r=1,s=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(t,e=new Tt){const n=e,r=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(o?s=0:s=r),this.aClockwise===!0&&!o&&(s===r?s=-r:s=s-r);const a=this.aStartAngle+t*s;let c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),d=c-this.aX,p=l-this.aY;c=d*u-p*h+this.aX,l=d*h+p*u+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Tu extends Bo{constructor(t,e,n,r,s,o){super(t,e,n,n,r,s,o),this.isArcCurve=!0,this.type="ArcCurve"}}function ko(){let i=0,t=0,e=0,n=0;function r(s,o,a,c){i=s,t=a,e=-3*s+3*o-2*a-c,n=2*s-2*o+a+c}return{initCatmullRom:function(s,o,a,c,l){r(o,a,l*(a-s),l*(c-o))},initNonuniformCatmullRom:function(s,o,a,c,l,u,h){let d=(o-s)/l-(a-s)/(l+u)+(a-o)/u,p=(a-o)/u-(c-o)/(u+h)+(c-a)/h;d*=u,p*=u,r(o,a,d,p)},calc:function(s){const o=s*s,a=o*s;return i+t*s+e*o+n*a}}}const yr=new V,xs=new ko,Ms=new ko,Ss=new ko;class Il extends sn{constructor(t=[],e=!1,n="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=r}getPoint(t,e=new V){const n=e,r=this.points,s=r.length,o=(s-(this.closed?0:1))*t;let a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:c===0&&a===s-1&&(a=s-2,c=1);let l,u;this.closed||a>0?l=r[(a-1)%s]:(yr.subVectors(r[0],r[1]).add(r[0]),l=yr);const h=r[a%s],d=r[(a+1)%s];if(this.closed||a+2<s?u=r[(a+2)%s]:(yr.subVectors(r[s-1],r[s-2]).add(r[s-1]),u=yr),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let _=Math.pow(l.distanceToSquared(h),p),x=Math.pow(h.distanceToSquared(d),p),m=Math.pow(d.distanceToSquared(u),p);x<1e-4&&(x=1),_<1e-4&&(_=x),m<1e-4&&(m=x),xs.initNonuniformCatmullRom(l.x,h.x,d.x,u.x,_,x,m),Ms.initNonuniformCatmullRom(l.y,h.y,d.y,u.y,_,x,m),Ss.initNonuniformCatmullRom(l.z,h.z,d.z,u.z,_,x,m)}else this.curveType==="catmullrom"&&(xs.initCatmullRom(l.x,h.x,d.x,u.x,this.tension),Ms.initCatmullRom(l.y,h.y,d.y,u.y,this.tension),Ss.initCatmullRom(l.z,h.z,d.z,u.z,this.tension));return n.set(xs.calc(c),Ms.calc(c),Ss.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const r=t.points[e];this.points.push(r.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const r=this.points[e];t.points.push(r.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const r=t.points[e];this.points.push(new V().fromArray(r))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Ta(i,t,e,n,r){const s=(n-t)*.5,o=(r-e)*.5,a=i*i,c=i*a;return(2*e-2*n+s+o)*c+(-3*e+3*n-2*s-o)*a+s*i+e}function Au(i,t){const e=1-i;return e*e*t}function wu(i,t){return 2*(1-i)*i*t}function Ru(i,t){return i*i*t}function Hi(i,t,e,n){return Au(i,t)+wu(i,e)+Ru(i,n)}function Cu(i,t){const e=1-i;return e*e*e*t}function Pu(i,t){const e=1-i;return 3*e*e*i*t}function Lu(i,t){return 3*(1-i)*i*i*t}function Du(i,t){return i*i*i*t}function Vi(i,t,e,n,r){return Cu(i,t)+Pu(i,e)+Lu(i,n)+Du(i,r)}class Ul extends sn{constructor(t=new Tt,e=new Tt,n=new Tt,r=new Tt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=r}getPoint(t,e=new Tt){const n=e,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(Vi(t,r.x,s.x,o.x,a.x),Vi(t,r.y,s.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Iu extends sn{constructor(t=new V,e=new V,n=new V,r=new V){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=r}getPoint(t,e=new V){const n=e,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(Vi(t,r.x,s.x,o.x,a.x),Vi(t,r.y,s.y,o.y,a.y),Vi(t,r.z,s.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Nl extends sn{constructor(t=new Tt,e=new Tt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new Tt){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new Tt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Uu extends sn{constructor(t=new V,e=new V){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new V){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new V){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Fl extends sn{constructor(t=new Tt,e=new Tt,n=new Tt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new Tt){const n=e,r=this.v0,s=this.v1,o=this.v2;return n.set(Hi(t,r.x,s.x,o.x),Hi(t,r.y,s.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Nu extends sn{constructor(t=new V,e=new V,n=new V){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new V){const n=e,r=this.v0,s=this.v1,o=this.v2;return n.set(Hi(t,r.x,s.x,o.x),Hi(t,r.y,s.y,o.y),Hi(t,r.z,s.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Ol extends sn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new Tt){const n=e,r=this.points,s=(r.length-1)*t,o=Math.floor(s),a=s-o,c=r[o===0?o:o-1],l=r[o],u=r[o>r.length-2?r.length-1:o+1],h=r[o>r.length-3?r.length-1:o+2];return n.set(Ta(a,c.x,l.x,u.x,h.x),Ta(a,c.y,l.y,u.y,h.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const r=t.points[e];this.points.push(r.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const r=this.points[e];t.points.push(r.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const r=t.points[e];this.points.push(new Tt().fromArray(r))}return this}}var Mo=Object.freeze({__proto__:null,ArcCurve:Tu,CatmullRomCurve3:Il,CubicBezierCurve:Ul,CubicBezierCurve3:Iu,EllipseCurve:Bo,LineCurve:Nl,LineCurve3:Uu,QuadraticBezierCurve:Fl,QuadraticBezierCurve3:Nu,SplineCurve:Ol});class Fu extends sn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Mo[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),r=this.getCurveLengths();let s=0;for(;s<r.length;){if(r[s]>=n){const o=r[s]-n,a=this.curves[s],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,e)}s++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,r=this.curves.length;n<r;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let r=0,s=this.curves;r<s.length;r++){const o=s[r],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,c=o.getPoints(a);for(let l=0;l<c.length;l++){const u=c[l];n&&n.equals(u)||(e.push(u),n=u)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const r=t.curves[e];this.curves.push(r.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const r=this.curves[e];t.curves.push(r.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const r=t.curves[e];this.curves.push(new Mo[r.type]().fromJSON(r))}return this}}class Aa extends Fu{constructor(t){super(),this.type="Path",this.currentPoint=new Tt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new Nl(this.currentPoint.clone(),new Tt(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,r){const s=new Fl(this.currentPoint.clone(),new Tt(t,e),new Tt(n,r));return this.curves.push(s),this.currentPoint.set(n,r),this}bezierCurveTo(t,e,n,r,s,o){const a=new Ul(this.currentPoint.clone(),new Tt(t,e),new Tt(n,r),new Tt(s,o));return this.curves.push(a),this.currentPoint.set(s,o),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new Ol(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,r,s,o){const a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,e+c,n,r,s,o),this}absarc(t,e,n,r,s,o){return this.absellipse(t,e,n,n,r,s,o),this}ellipse(t,e,n,r,s,o,a,c){const l=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(t+l,e+u,n,r,s,o,a,c),this}absellipse(t,e,n,r,s,o,a,c){const l=new Bo(t,e,n,r,s,o,a,c);if(this.curves.length>0){const h=l.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(l);const u=l.getPoint(1);return this.currentPoint.copy(u),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class zo extends Aa{constructor(t){super(t),this.uuid=wi(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,r=this.holes.length;n<r;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const r=t.holes[e];this.holes.push(r.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const r=this.holes[e];t.holes.push(r.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const r=t.holes[e];this.holes.push(new Aa().fromJSON(r))}return this}}function Ou(i,t,e=2){const n=t&&t.length,r=n?t[0]*e:i.length;let s=Bl(i,0,r,e,!0);const o=[];if(!s||s.next===s.prev)return o;let a,c,l;if(n&&(s=Vu(i,t,s,e)),i.length>80*e){a=1/0,c=1/0;let u=-1/0,h=-1/0;for(let d=e;d<r;d+=e){const p=i[d],_=i[d+1];p<a&&(a=p),_<c&&(c=_),p>u&&(u=p),_>h&&(h=_)}l=Math.max(u-a,h-c),l=l!==0?32767/l:0}return Zi(s,o,e,a,c,l,0),o}function Bl(i,t,e,n,r){let s;if(r===Qu(i,t,e,n)>0)for(let o=t;o<e;o+=n)s=wa(o/n|0,i[o],i[o+1],s);else for(let o=e-n;o>=t;o-=n)s=wa(o/n|0,i[o],i[o+1],s);return s&&Ti(s,s.next)&&(Ji(s),s=s.next),s}function Yn(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(Ti(e,e.next)||he(e.prev,e,e.next)===0)){if(Ji(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Zi(i,t,e,n,r,s,o){if(!i)return;!o&&s&&Yu(i,n,r,s);let a=i;for(;i.prev!==i.next;){const c=i.prev,l=i.next;if(s?ku(i,n,r,s):Bu(i)){t.push(c.i,i.i,l.i),Ji(i),i=l.next,a=l.next;continue}if(i=l,i===a){o?o===1?(i=zu(Yn(i),t),Zi(i,t,e,n,r,s,2)):o===2&&Hu(i,t,e,n,r,s):Zi(Yn(i),t,e,n,r,s,1);break}}}function Bu(i){const t=i.prev,e=i,n=i.next;if(he(t,e,n)>=0)return!1;const r=t.x,s=e.x,o=n.x,a=t.y,c=e.y,l=n.y,u=Math.min(r,s,o),h=Math.min(a,c,l),d=Math.max(r,s,o),p=Math.max(a,c,l);let _=n.next;for(;_!==t;){if(_.x>=u&&_.x<=d&&_.y>=h&&_.y<=p&&ki(r,a,s,c,o,l,_.x,_.y)&&he(_.prev,_,_.next)>=0)return!1;_=_.next}return!0}function ku(i,t,e,n){const r=i.prev,s=i,o=i.next;if(he(r,s,o)>=0)return!1;const a=r.x,c=s.x,l=o.x,u=r.y,h=s.y,d=o.y,p=Math.min(a,c,l),_=Math.min(u,h,d),x=Math.max(a,c,l),m=Math.max(u,h,d),f=So(p,_,t,e,n),A=So(x,m,t,e,n);let b=i.prevZ,v=i.nextZ;for(;b&&b.z>=f&&v&&v.z<=A;){if(b.x>=p&&b.x<=x&&b.y>=_&&b.y<=m&&b!==r&&b!==o&&ki(a,u,c,h,l,d,b.x,b.y)&&he(b.prev,b,b.next)>=0||(b=b.prevZ,v.x>=p&&v.x<=x&&v.y>=_&&v.y<=m&&v!==r&&v!==o&&ki(a,u,c,h,l,d,v.x,v.y)&&he(v.prev,v,v.next)>=0))return!1;v=v.nextZ}for(;b&&b.z>=f;){if(b.x>=p&&b.x<=x&&b.y>=_&&b.y<=m&&b!==r&&b!==o&&ki(a,u,c,h,l,d,b.x,b.y)&&he(b.prev,b,b.next)>=0)return!1;b=b.prevZ}for(;v&&v.z<=A;){if(v.x>=p&&v.x<=x&&v.y>=_&&v.y<=m&&v!==r&&v!==o&&ki(a,u,c,h,l,d,v.x,v.y)&&he(v.prev,v,v.next)>=0)return!1;v=v.nextZ}return!0}function zu(i,t){let e=i;do{const n=e.prev,r=e.next.next;!Ti(n,r)&&zl(n,e,e.next,r)&&Ki(n,r)&&Ki(r,n)&&(t.push(n.i,e.i,r.i),Ji(e),Ji(e.next),e=i=r),e=e.next}while(e!==i);return Yn(e)}function Hu(i,t,e,n,r,s){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&Ju(o,a)){let c=Hl(o,a);o=Yn(o,o.next),c=Yn(c,c.next),Zi(o,t,e,n,r,s,0),Zi(c,t,e,n,r,s,0);return}a=a.next}o=o.next}while(o!==i)}function Vu(i,t,e,n){const r=[];for(let s=0,o=t.length;s<o;s++){const a=t[s]*n,c=s<o-1?t[s+1]*n:i.length,l=Bl(i,a,c,n,!1);l===l.next&&(l.steiner=!0),r.push(Ku(l))}r.sort(Gu);for(let s=0;s<r.length;s++)e=Wu(r[s],e);return e}function Gu(i,t){let e=i.x-t.x;if(e===0&&(e=i.y-t.y,e===0)){const n=(i.next.y-i.y)/(i.next.x-i.x),r=(t.next.y-t.y)/(t.next.x-t.x);e=n-r}return e}function Wu(i,t){const e=Xu(i,t);if(!e)return t;const n=Hl(e,i);return Yn(n,n.next),Yn(e,e.next)}function Xu(i,t){let e=t;const n=i.x,r=i.y;let s=-1/0,o;if(Ti(i,e))return e;do{if(Ti(i,e.next))return e.next;if(r<=e.y&&r>=e.next.y&&e.next.y!==e.y){const h=e.x+(r-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(h<=n&&h>s&&(s=h,o=e.x<e.next.x?e:e.next,h===n))return o}e=e.next}while(e!==t);if(!o)return null;const a=o,c=o.x,l=o.y;let u=1/0;e=o;do{if(n>=e.x&&e.x>=c&&n!==e.x&&kl(r<l?n:s,r,c,l,r<l?s:n,r,e.x,e.y)){const h=Math.abs(r-e.y)/(n-e.x);Ki(e,i)&&(h<u||h===u&&(e.x>o.x||e.x===o.x&&qu(o,e)))&&(o=e,u=h)}e=e.next}while(e!==a);return o}function qu(i,t){return he(i.prev,i,t.prev)<0&&he(t.next,i,i.next)<0}function Yu(i,t,e,n){let r=i;do r.z===0&&(r.z=So(r.x,r.y,t,e,n)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==i);r.prevZ.nextZ=null,r.prevZ=null,Zu(r)}function Zu(i){let t,e=1;do{let n=i,r;i=null;let s=null;for(t=0;n;){t++;let o=n,a=0;for(let l=0;l<e&&(a++,o=o.nextZ,!!o);l++);let c=e;for(;a>0||c>0&&o;)a!==0&&(c===0||!o||n.z<=o.z)?(r=n,n=n.nextZ,a--):(r=o,o=o.nextZ,c--),s?s.nextZ=r:i=r,r.prevZ=s,s=r;n=o}s.nextZ=null,e*=2}while(t>1);return i}function So(i,t,e,n,r){return i=(i-e)*r|0,t=(t-n)*r|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function Ku(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function kl(i,t,e,n,r,s,o,a){return(r-o)*(t-a)>=(i-o)*(s-a)&&(i-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(s-a)>=(r-o)*(n-a)}function ki(i,t,e,n,r,s,o,a){return!(i===o&&t===a)&&kl(i,t,e,n,r,s,o,a)}function Ju(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!$u(i,t)&&(Ki(i,t)&&Ki(t,i)&&ju(i,t)&&(he(i.prev,i,t.prev)||he(i,t.prev,t))||Ti(i,t)&&he(i.prev,i,i.next)>0&&he(t.prev,t,t.next)>0)}function he(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function Ti(i,t){return i.x===t.x&&i.y===t.y}function zl(i,t,e,n){const r=br(he(i,t,e)),s=br(he(i,t,n)),o=br(he(e,n,i)),a=br(he(e,n,t));return!!(r!==s&&o!==a||r===0&&Er(i,e,t)||s===0&&Er(i,n,t)||o===0&&Er(e,i,n)||a===0&&Er(e,t,n))}function Er(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function br(i){return i>0?1:i<0?-1:0}function $u(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&zl(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function Ki(i,t){return he(i.prev,i,i.next)<0?he(i,t,i.next)>=0&&he(i,i.prev,t)>=0:he(i,t,i.prev)<0||he(i,i.next,t)<0}function ju(i,t){let e=i,n=!1;const r=(i.x+t.x)/2,s=(i.y+t.y)/2;do e.y>s!=e.next.y>s&&e.next.y!==e.y&&r<(e.next.x-e.x)*(s-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function Hl(i,t){const e=yo(i.i,i.x,i.y),n=yo(t.i,t.x,t.y),r=i.next,s=t.prev;return i.next=t,t.prev=i,e.next=r,r.prev=e,n.next=e,e.prev=n,s.next=n,n.prev=s,n}function wa(i,t,e,n){const r=yo(i,t,e);return n?(r.next=n.next,r.prev=n,n.next.prev=r,n.next=r):(r.prev=r,r.next=r),r}function Ji(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function yo(i,t,e){return{i,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Qu(i,t,e,n){let r=0;for(let s=t,o=e-n;s<e;s+=n)r+=(i[o]-i[s])*(i[s+1]+i[o+1]),o=s;return r}class th{static triangulate(t,e,n=2){return Ou(t,e,n)}}class mn{static area(t){const e=t.length;let n=0;for(let r=e-1,s=0;s<e;r=s++)n+=t[r].x*t[s].y-t[s].x*t[r].y;return n*.5}static isClockWise(t){return mn.area(t)<0}static triangulateShape(t,e){const n=[],r=[],s=[];Ra(t),Ca(n,t);let o=t.length;e.forEach(Ra);for(let c=0;c<e.length;c++)r.push(o),o+=e[c].length,Ca(n,e[c]);const a=th.triangulate(n,r);for(let c=0;c<a.length;c+=3)s.push(a.slice(c,c+3));return s}}function Ra(i){const t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function Ca(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}class Ho extends pe{constructor(t=new zo([new Tt(.5,.5),new Tt(-.5,.5),new Tt(-.5,-.5),new Tt(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,r=[],s=[];for(let a=0,c=t.length;a<c;a++){const l=t[a];o(l)}this.setAttribute("position",new jt(r,3)),this.setAttribute("uv",new jt(s,2)),this.computeVertexNormals();function o(a){const c=[],l=e.curveSegments!==void 0?e.curveSegments:12,u=e.steps!==void 0?e.steps:1,h=e.depth!==void 0?e.depth:1;let d=e.bevelEnabled!==void 0?e.bevelEnabled:!0,p=e.bevelThickness!==void 0?e.bevelThickness:.2,_=e.bevelSize!==void 0?e.bevelSize:p-.1,x=e.bevelOffset!==void 0?e.bevelOffset:0,m=e.bevelSegments!==void 0?e.bevelSegments:3;const f=e.extrudePath,A=e.UVGenerator!==void 0?e.UVGenerator:eh;let b,v=!1,N,P,L,F;f&&(b=f.getSpacedPoints(u),v=!0,d=!1,N=f.computeFrenetFrames(u,!1),P=new V,L=new V,F=new V),d||(m=0,p=0,_=0,x=0);const S=a.extractPoints(l);let M=S.shape;const C=S.holes;if(!mn.isClockWise(M)){M=M.reverse();for(let j=0,E=C.length;j<E;j++){const B=C[j];mn.isClockWise(B)&&(C[j]=B.reverse())}}function et(j){const B=10000000000000001e-36;let O=j[0];for(let I=1;I<=j.length;I++){const U=I%j.length,z=j[U],W=z.x-O.x,rt=z.y-O.y,y=W*W+rt*rt,g=Math.max(Math.abs(z.x),Math.abs(z.y),Math.abs(O.x),Math.abs(O.y)),R=B*g*g;if(y<=R){j.splice(U,1),I--;continue}O=z}}et(M),C.forEach(et);const Y=C.length,K=M;for(let j=0;j<Y;j++){const E=C[j];M=M.concat(E)}function at(j,E,B){return E||console.error("THREE.ExtrudeGeometry: vec does not exist"),j.clone().addScaledVector(E,B)}const dt=M.length;function nt(j,E,B){let O,I,U;const z=j.x-E.x,W=j.y-E.y,rt=B.x-j.x,y=B.y-j.y,g=z*z+W*W,R=z*y-W*rt;if(Math.abs(R)>Number.EPSILON){const k=Math.sqrt(g),J=Math.sqrt(rt*rt+y*y),X=E.x-W/k,mt=E.y+z/k,_t=B.x-y/J,At=B.y+rt/J,It=((_t-X)*y-(At-mt)*rt)/(z*y-W*rt);O=X+z*It-j.x,I=mt+W*It-j.y;const St=O*O+I*I;if(St<=2)return new Tt(O,I);U=Math.sqrt(St/2)}else{let k=!1;z>Number.EPSILON?rt>Number.EPSILON&&(k=!0):z<-Number.EPSILON?rt<-Number.EPSILON&&(k=!0):Math.sign(W)===Math.sign(y)&&(k=!0),k?(O=-W,I=z,U=Math.sqrt(g)):(O=z,I=W,U=Math.sqrt(g/2))}return new Tt(O/U,I/U)}const gt=[];for(let j=0,E=K.length,B=E-1,O=j+1;j<E;j++,B++,O++)B===E&&(B=0),O===E&&(O=0),gt[j]=nt(K[j],K[B],K[O]);const pt=[];let ft,vt=gt.concat();for(let j=0,E=Y;j<E;j++){const B=C[j];ft=[];for(let O=0,I=B.length,U=I-1,z=O+1;O<I;O++,U++,z++)U===I&&(U=0),z===I&&(z=0),ft[O]=nt(B[O],B[U],B[z]);pt.push(ft),vt=vt.concat(ft)}let Mt;if(m===0)Mt=mn.triangulateShape(K,C);else{const j=[],E=[];for(let B=0;B<m;B++){const O=B/m,I=p*Math.cos(O*Math.PI/2),U=_*Math.sin(O*Math.PI/2)+x;for(let z=0,W=K.length;z<W;z++){const rt=at(K[z],gt[z],U);G(rt.x,rt.y,-I),O===0&&j.push(rt)}for(let z=0,W=Y;z<W;z++){const rt=C[z];ft=pt[z];const y=[];for(let g=0,R=rt.length;g<R;g++){const k=at(rt[g],ft[g],U);G(k.x,k.y,-I),O===0&&y.push(k)}O===0&&E.push(y)}}Mt=mn.triangulateShape(j,E)}const Rt=Mt.length,st=_+x;for(let j=0;j<dt;j++){const E=d?at(M[j],vt[j],st):M[j];v?(L.copy(N.normals[0]).multiplyScalar(E.x),P.copy(N.binormals[0]).multiplyScalar(E.y),F.copy(b[0]).add(L).add(P),G(F.x,F.y,F.z)):G(E.x,E.y,0)}for(let j=1;j<=u;j++)for(let E=0;E<dt;E++){const B=d?at(M[E],vt[E],st):M[E];v?(L.copy(N.normals[j]).multiplyScalar(B.x),P.copy(N.binormals[j]).multiplyScalar(B.y),F.copy(b[j]).add(L).add(P),G(F.x,F.y,F.z)):G(B.x,B.y,h/u*j)}for(let j=m-1;j>=0;j--){const E=j/m,B=p*Math.cos(E*Math.PI/2),O=_*Math.sin(E*Math.PI/2)+x;for(let I=0,U=K.length;I<U;I++){const z=at(K[I],gt[I],O);G(z.x,z.y,h+B)}for(let I=0,U=C.length;I<U;I++){const z=C[I];ft=pt[I];for(let W=0,rt=z.length;W<rt;W++){const y=at(z[W],ft[W],O);v?G(y.x,y.y+b[u-1].y,b[u-1].x+B):G(y.x,y.y,h+B)}}}D(),H();function D(){const j=r.length/3;if(d){let E=0,B=dt*E;for(let O=0;O<Rt;O++){const I=Mt[O];ct(I[2]+B,I[1]+B,I[0]+B)}E=u+m*2,B=dt*E;for(let O=0;O<Rt;O++){const I=Mt[O];ct(I[0]+B,I[1]+B,I[2]+B)}}else{for(let E=0;E<Rt;E++){const B=Mt[E];ct(B[2],B[1],B[0])}for(let E=0;E<Rt;E++){const B=Mt[E];ct(B[0]+dt*u,B[1]+dt*u,B[2]+dt*u)}}n.addGroup(j,r.length/3-j,0)}function H(){const j=r.length/3;let E=0;$(K,E),E+=K.length;for(let B=0,O=C.length;B<O;B++){const I=C[B];$(I,E),E+=I.length}n.addGroup(j,r.length/3-j,1)}function $(j,E){let B=j.length;for(;--B>=0;){const O=B;let I=B-1;I<0&&(I=j.length-1);for(let U=0,z=u+m*2;U<z;U++){const W=dt*U,rt=dt*(U+1),y=E+O+W,g=E+I+W,R=E+I+rt,k=E+O+rt;Z(y,g,R,k)}}}function G(j,E,B){c.push(j),c.push(E),c.push(B)}function ct(j,E,B){lt(j),lt(E),lt(B);const O=r.length/3,I=A.generateTopUV(n,r,O-3,O-2,O-1);w(I[0]),w(I[1]),w(I[2])}function Z(j,E,B,O){lt(j),lt(E),lt(O),lt(E),lt(B),lt(O);const I=r.length/3,U=A.generateSideWallUV(n,r,I-6,I-3,I-2,I-1);w(U[0]),w(U[1]),w(U[3]),w(U[1]),w(U[2]),w(U[3])}function lt(j){r.push(c[j*3+0]),r.push(c[j*3+1]),r.push(c[j*3+2])}function w(j){s.push(j.x),s.push(j.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return nh(e,n,t)}static fromJSON(t,e){const n=[];for(let s=0,o=t.shapes.length;s<o;s++){const a=e[t.shapes[s]];n.push(a)}const r=t.options.extrudePath;return r!==void 0&&(t.options.extrudePath=new Mo[r.type]().fromJSON(r)),new Ho(n,t.options)}}const eh={generateTopUV:function(i,t,e,n,r){const s=t[e*3],o=t[e*3+1],a=t[n*3],c=t[n*3+1],l=t[r*3],u=t[r*3+1];return[new Tt(s,o),new Tt(a,c),new Tt(l,u)]},generateSideWallUV:function(i,t,e,n,r,s){const o=t[e*3],a=t[e*3+1],c=t[e*3+2],l=t[n*3],u=t[n*3+1],h=t[n*3+2],d=t[r*3],p=t[r*3+1],_=t[r*3+2],x=t[s*3],m=t[s*3+1],f=t[s*3+2];return Math.abs(a-u)<Math.abs(o-l)?[new Tt(o,1-c),new Tt(l,1-h),new Tt(d,1-_),new Tt(x,1-f)]:[new Tt(a,1-c),new Tt(u,1-h),new Tt(p,1-_),new Tt(m,1-f)]}};function nh(i,t,e){if(e.shapes=[],Array.isArray(i))for(let n=0,r=i.length;n<r;n++){const s=i[n];e.shapes.push(s.uuid)}else e.shapes.push(i.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class xi extends pe{constructor(t=[new Tt(0,-.5),new Tt(.5,0),new Tt(0,.5)],e=12,n=0,r=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:r},e=Math.floor(e),r=Jt(r,0,Math.PI*2);const s=[],o=[],a=[],c=[],l=[],u=1/e,h=new V,d=new Tt,p=new V,_=new V,x=new V;let m=0,f=0;for(let A=0;A<=t.length-1;A++)switch(A){case 0:m=t[A+1].x-t[A].x,f=t[A+1].y-t[A].y,p.x=f*1,p.y=-m,p.z=f*0,x.copy(p),p.normalize(),c.push(p.x,p.y,p.z);break;case t.length-1:c.push(x.x,x.y,x.z);break;default:m=t[A+1].x-t[A].x,f=t[A+1].y-t[A].y,p.x=f*1,p.y=-m,p.z=f*0,_.copy(p),p.x+=x.x,p.y+=x.y,p.z+=x.z,p.normalize(),c.push(p.x,p.y,p.z),x.copy(_)}for(let A=0;A<=e;A++){const b=n+A*u*r,v=Math.sin(b),N=Math.cos(b);for(let P=0;P<=t.length-1;P++){h.x=t[P].x*v,h.y=t[P].y,h.z=t[P].x*N,o.push(h.x,h.y,h.z),d.x=A/e,d.y=P/(t.length-1),a.push(d.x,d.y);const L=c[3*P+0]*v,F=c[3*P+1],S=c[3*P+0]*N;l.push(L,F,S)}}for(let A=0;A<e;A++)for(let b=0;b<t.length-1;b++){const v=b+A*t.length,N=v,P=v+t.length,L=v+t.length+1,F=v+1;s.push(N,P,F),s.push(L,F,P)}this.setIndex(s),this.setAttribute("position",new jt(o,3)),this.setAttribute("uv",new jt(a,2)),this.setAttribute("normal",new jt(l,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new xi(t.points,t.segments,t.phiStart,t.phiLength)}}class Jn extends pe{constructor(t=1,e=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:r};const s=t/2,o=e/2,a=Math.floor(n),c=Math.floor(r),l=a+1,u=c+1,h=t/a,d=e/c,p=[],_=[],x=[],m=[];for(let f=0;f<u;f++){const A=f*d-o;for(let b=0;b<l;b++){const v=b*h-s;_.push(v,-A,0),x.push(0,0,1),m.push(b/a),m.push(1-f/c)}}for(let f=0;f<c;f++)for(let A=0;A<a;A++){const b=A+l*f,v=A+l*(f+1),N=A+1+l*(f+1),P=A+1+l*f;p.push(b,v,P),p.push(v,N,P)}this.setIndex(p),this.setAttribute("position",new jt(_,3)),this.setAttribute("normal",new jt(x,3)),this.setAttribute("uv",new jt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Jn(t.width,t.height,t.widthSegments,t.heightSegments)}}class Vo extends pe{constructor(t=new zo([new Tt(0,.5),new Tt(-.5,-.5),new Tt(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};const n=[],r=[],s=[],o=[];let a=0,c=0;if(Array.isArray(t)===!1)l(t);else for(let u=0;u<t.length;u++)l(t[u]),this.addGroup(a,c,u),a+=c,c=0;this.setIndex(n),this.setAttribute("position",new jt(r,3)),this.setAttribute("normal",new jt(s,3)),this.setAttribute("uv",new jt(o,2));function l(u){const h=r.length/3,d=u.extractPoints(e);let p=d.shape;const _=d.holes;mn.isClockWise(p)===!1&&(p=p.reverse());for(let m=0,f=_.length;m<f;m++){const A=_[m];mn.isClockWise(A)===!0&&(_[m]=A.reverse())}const x=mn.triangulateShape(p,_);for(let m=0,f=_.length;m<f;m++){const A=_[m];p=p.concat(A)}for(let m=0,f=p.length;m<f;m++){const A=p[m];r.push(A.x,A.y,0),s.push(0,0,1),o.push(A.x,A.y)}for(let m=0,f=x.length;m<f;m++){const A=x[m],b=A[0]+h,v=A[1]+h,N=A[2]+h;n.push(b,v,N),c+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes;return ih(e,t)}static fromJSON(t,e){const n=[];for(let r=0,s=t.shapes.length;r<s;r++){const o=e[t.shapes[r]];n.push(o)}return new Vo(n,t.curveSegments)}}function ih(i,t){if(t.shapes=[],Array.isArray(i))for(let e=0,n=i.length;e<n;e++){const r=i[e];t.shapes.push(r.uuid)}else t.shapes.push(i.uuid);return t}class Wn extends pe{constructor(t=1,e=32,n=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(o+a,Math.PI);let l=0;const u=[],h=new V,d=new V,p=[],_=[],x=[],m=[];for(let f=0;f<=n;f++){const A=[],b=f/n;let v=0;f===0&&o===0?v=.5/e:f===n&&c===Math.PI&&(v=-.5/e);for(let N=0;N<=e;N++){const P=N/e;h.x=-t*Math.cos(r+P*s)*Math.sin(o+b*a),h.y=t*Math.cos(o+b*a),h.z=t*Math.sin(r+P*s)*Math.sin(o+b*a),_.push(h.x,h.y,h.z),d.copy(h).normalize(),x.push(d.x,d.y,d.z),m.push(P+v,1-b),A.push(l++)}u.push(A)}for(let f=0;f<n;f++)for(let A=0;A<e;A++){const b=u[f][A+1],v=u[f][A],N=u[f+1][A],P=u[f+1][A+1];(f!==0||o>0)&&p.push(b,v,P),(f!==n-1||c<Math.PI)&&p.push(v,N,P)}this.setIndex(p),this.setAttribute("position",new jt(_,3)),this.setAttribute("normal",new jt(x,3)),this.setAttribute("uv",new jt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Wn(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class kr extends pe{constructor(t=1,e=.4,n=12,r=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:r,arc:s},n=Math.floor(n),r=Math.floor(r);const o=[],a=[],c=[],l=[],u=new V,h=new V,d=new V;for(let p=0;p<=n;p++)for(let _=0;_<=r;_++){const x=_/r*s,m=p/n*Math.PI*2;h.x=(t+e*Math.cos(m))*Math.cos(x),h.y=(t+e*Math.cos(m))*Math.sin(x),h.z=e*Math.sin(m),a.push(h.x,h.y,h.z),u.x=t*Math.cos(x),u.y=t*Math.sin(x),d.subVectors(h,u).normalize(),c.push(d.x,d.y,d.z),l.push(_/r),l.push(p/n)}for(let p=1;p<=n;p++)for(let _=1;_<=r;_++){const x=(r+1)*p+_-1,m=(r+1)*(p-1)+_-1,f=(r+1)*(p-1)+_,A=(r+1)*p+_;o.push(x,m,A),o.push(m,f,A)}this.setIndex(o),this.setAttribute("position",new jt(a,3)),this.setAttribute("normal",new jt(c,3)),this.setAttribute("uv",new jt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new kr(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class Ce extends Qi{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Xt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Xt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Sl,this.normalScale=new Tt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ge,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class rh extends Qi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Ic,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class sh extends Qi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Go extends xe{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Xt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class oh extends Go{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(xe.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Xt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const ys=new oe,Pa=new V,La=new V;class Vl{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Tt(512,512),this.mapType=rn,this.map=null,this.mapPass=null,this.matrix=new oe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Wr,this._frameExtents=new Tt(1,1),this._viewportCount=1,this._viewports=[new re(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Pa.setFromMatrixPosition(t.matrixWorld),e.position.copy(Pa),La.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(La),e.updateMatrixWorld(),ys.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ys,e.coordinateSystem,e.reversedDepth),e.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(ys)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const Da=new oe,Oi=new V,Es=new V;class ah extends Vl{constructor(){super(new Ne(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Tt(4,2),this._viewportCount=6,this._viewports=[new re(2,1,1,1),new re(0,1,1,1),new re(3,1,1,1),new re(1,1,1,1),new re(3,0,1,1),new re(1,0,1,1)],this._cubeDirections=[new V(1,0,0),new V(-1,0,0),new V(0,0,1),new V(0,0,-1),new V(0,1,0),new V(0,-1,0)],this._cubeUps=[new V(0,1,0),new V(0,1,0),new V(0,1,0),new V(0,1,0),new V(0,0,1),new V(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,r=this.matrix,s=t.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),Oi.setFromMatrixPosition(t.matrixWorld),n.position.copy(Oi),Es.copy(n.position),Es.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(Es),n.updateMatrixWorld(),r.makeTranslation(-Oi.x,-Oi.y,-Oi.z),Da.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Da,n.coordinateSystem,n.reversedDepth)}}class lh extends Go{constructor(t,e,n=0,r=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=r,this.shadow=new ah}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class Gl extends Pl{constructor(t=-1,e=1,n=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-t,o=n+t,a=r+e,c=r-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,o=s+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class ch extends Vl{constructor(){super(new Gl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Ia extends Go{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(xe.DEFAULT_UP),this.updateMatrix(),this.target=new xe,this.shadow=new ch}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class uh extends Ne{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}function Ua(i,t,e,n){const r=hh(n);switch(e){case _l:return i*t;case Lo:return i*t/r.components*r.byteLength;case Do:return i*t/r.components*r.byteLength;case xl:return i*t*2/r.components*r.byteLength;case Io:return i*t*2/r.components*r.byteLength;case vl:return i*t*3/r.components*r.byteLength;case Ke:return i*t*4/r.components*r.byteLength;case Uo:return i*t*4/r.components*r.byteLength;case Cr:case Pr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Lr:case Dr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ys:case Ks:return Math.max(i,16)*Math.max(t,8)/4;case qs:case Zs:return Math.max(i,8)*Math.max(t,8)/2;case Js:case $s:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case js:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Qs:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case to:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case eo:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case no:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case io:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case ro:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case so:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case oo:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case ao:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case lo:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case co:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case uo:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case ho:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case fo:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Ir:case po:case mo:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Ml:case go:return Math.ceil(i/4)*Math.ceil(t/4)*8;case _o:case vo:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function hh(i){switch(i){case rn:case pl:return{byteLength:1,components:1};case Wi:case ml:case $i:return{byteLength:2,components:1};case Co:case Po:return{byteLength:2,components:4};case Xn:case Ro:case tn:return{byteLength:4,components:1};case gl:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:wo}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=wo);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Wl(){let i=null,t=!1,e=null,n=null;function r(s,o){e(s,o),n=i.requestAnimationFrame(r)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(r),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){i=s}}}function fh(i){const t=new WeakMap;function e(a,c){const l=a.array,u=a.usage,h=l.byteLength,d=i.createBuffer();i.bindBuffer(c,d),i.bufferData(c,l,u),a.onUploadCallback();let p;if(l instanceof Float32Array)p=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)p=i.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=i.SHORT;else if(l instanceof Uint32Array)p=i.UNSIGNED_INT;else if(l instanceof Int32Array)p=i.INT;else if(l instanceof Int8Array)p=i.BYTE;else if(l instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:h}}function n(a,c,l){const u=c.array,h=c.updateRanges;if(i.bindBuffer(l,a),h.length===0)i.bufferSubData(l,0,u);else{h.sort((p,_)=>p.start-_.start);let d=0;for(let p=1;p<h.length;p++){const _=h[d],x=h[p];x.start<=_.start+_.count+1?_.count=Math.max(_.count,x.start+x.count-_.start):(++d,h[d]=x)}h.length=d+1;for(let p=0,_=h.length;p<_;p++){const x=h[p];i.bufferSubData(l,x.start*u.BYTES_PER_ELEMENT,u,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=t.get(a);c&&(i.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=t.get(a);(!u||u.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:r,remove:s,update:o}}var dh=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,ph=`#ifdef USE_ALPHAHASH
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
#endif`,mh=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,gh=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,_h=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,vh=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,xh=`#ifdef USE_AOMAP
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
#endif`,Mh=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Sh=`#ifdef USE_BATCHING
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
#endif`,yh=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Eh=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,bh=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Th=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Ah=`#ifdef USE_IRIDESCENCE
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
#endif`,wh=`#ifdef USE_BUMPMAP
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
#endif`,Rh=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Ch=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Ph=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Lh=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Dh=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Ih=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Uh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Nh=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Fh=`#define PI 3.141592653589793
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
} // validated`,Oh=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Bh=`vec3 transformedNormal = objectNormal;
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
#endif`,kh=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,zh=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Hh=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Vh=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Gh="gl_FragColor = linearToOutputTexel( gl_FragColor );",Wh=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Xh=`#ifdef USE_ENVMAP
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
#endif`,qh=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Yh=`#ifdef USE_ENVMAP
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
#endif`,Zh=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Kh=`#ifdef USE_ENVMAP
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
#endif`,Jh=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,$h=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,jh=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Qh=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,tf=`#ifdef USE_GRADIENTMAP
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
}`,ef=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,nf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,rf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,sf=`uniform bool receiveShadow;
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
#endif`,of=`#ifdef USE_ENVMAP
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
#endif`,af=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,cf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,uf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,hf=`PhysicalMaterial material;
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
#endif`,ff=`struct PhysicalMaterial {
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
}`,df=`
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
#endif`,pf=`#if defined( RE_IndirectDiffuse )
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
#endif`,mf=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,gf=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,_f=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,vf=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,xf=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Mf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Sf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,yf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Ef=`#if defined( USE_POINTS_UV )
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
#endif`,bf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Tf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Af=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,wf=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Rf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Cf=`#ifdef USE_MORPHTARGETS
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
#endif`,Pf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Lf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Df=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,If=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Uf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Nf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Ff=`#ifdef USE_NORMALMAP
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
#endif`,Of=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Bf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,kf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,zf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Hf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Vf=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Gf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Wf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Xf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,qf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Yf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Zf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Kf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
		#ifdef USE_REVERSEDEPTHBUF
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSEDEPTHBUF
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare , distribution.x );
		#endif
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
#endif`,Jf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,$f=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,jf=`float getShadowMask() {
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
}`,Qf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,td=`#ifdef USE_SKINNING
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
#endif`,ed=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,nd=`#ifdef USE_SKINNING
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
#endif`,id=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,rd=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,sd=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,od=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,ad=`#ifdef USE_TRANSMISSION
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
#endif`,ld=`#ifdef USE_TRANSMISSION
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
#endif`,cd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ud=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,hd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,fd=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const dd=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,pd=`uniform sampler2D t2D;
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
}`,md=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,gd=`#ifdef ENVMAP_TYPE_CUBE
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
}`,_d=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,vd=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,xd=`#include <common>
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
}`,Md=`#if DEPTH_PACKING == 3200
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
	#ifdef USE_REVERSEDEPTHBUF
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
}`,Sd=`#define DISTANCE
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
}`,yd=`#define DISTANCE
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
}`,Ed=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,bd=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Td=`uniform float scale;
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
}`,Ad=`uniform vec3 diffuse;
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
}`,wd=`#include <common>
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
}`,Rd=`uniform vec3 diffuse;
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
}`,Cd=`#define LAMBERT
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
}`,Pd=`#define LAMBERT
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
}`,Ld=`#define MATCAP
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
}`,Dd=`#define MATCAP
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
}`,Id=`#define NORMAL
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
}`,Ud=`#define NORMAL
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
}`,Nd=`#define PHONG
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
}`,Fd=`#define PHONG
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
}`,Od=`#define STANDARD
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
}`,Bd=`#define STANDARD
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
}`,kd=`#define TOON
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
}`,zd=`#define TOON
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
}`,Hd=`uniform float size;
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
}`,Vd=`uniform vec3 diffuse;
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
}`,Gd=`#include <common>
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
}`,Wd=`uniform vec3 color;
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
}`,Xd=`uniform float rotation;
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
}`,qd=`uniform vec3 diffuse;
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
}`,Kt={alphahash_fragment:dh,alphahash_pars_fragment:ph,alphamap_fragment:mh,alphamap_pars_fragment:gh,alphatest_fragment:_h,alphatest_pars_fragment:vh,aomap_fragment:xh,aomap_pars_fragment:Mh,batching_pars_vertex:Sh,batching_vertex:yh,begin_vertex:Eh,beginnormal_vertex:bh,bsdfs:Th,iridescence_fragment:Ah,bumpmap_pars_fragment:wh,clipping_planes_fragment:Rh,clipping_planes_pars_fragment:Ch,clipping_planes_pars_vertex:Ph,clipping_planes_vertex:Lh,color_fragment:Dh,color_pars_fragment:Ih,color_pars_vertex:Uh,color_vertex:Nh,common:Fh,cube_uv_reflection_fragment:Oh,defaultnormal_vertex:Bh,displacementmap_pars_vertex:kh,displacementmap_vertex:zh,emissivemap_fragment:Hh,emissivemap_pars_fragment:Vh,colorspace_fragment:Gh,colorspace_pars_fragment:Wh,envmap_fragment:Xh,envmap_common_pars_fragment:qh,envmap_pars_fragment:Yh,envmap_pars_vertex:Zh,envmap_physical_pars_fragment:of,envmap_vertex:Kh,fog_vertex:Jh,fog_pars_vertex:$h,fog_fragment:jh,fog_pars_fragment:Qh,gradientmap_pars_fragment:tf,lightmap_pars_fragment:ef,lights_lambert_fragment:nf,lights_lambert_pars_fragment:rf,lights_pars_begin:sf,lights_toon_fragment:af,lights_toon_pars_fragment:lf,lights_phong_fragment:cf,lights_phong_pars_fragment:uf,lights_physical_fragment:hf,lights_physical_pars_fragment:ff,lights_fragment_begin:df,lights_fragment_maps:pf,lights_fragment_end:mf,logdepthbuf_fragment:gf,logdepthbuf_pars_fragment:_f,logdepthbuf_pars_vertex:vf,logdepthbuf_vertex:xf,map_fragment:Mf,map_pars_fragment:Sf,map_particle_fragment:yf,map_particle_pars_fragment:Ef,metalnessmap_fragment:bf,metalnessmap_pars_fragment:Tf,morphinstance_vertex:Af,morphcolor_vertex:wf,morphnormal_vertex:Rf,morphtarget_pars_vertex:Cf,morphtarget_vertex:Pf,normal_fragment_begin:Lf,normal_fragment_maps:Df,normal_pars_fragment:If,normal_pars_vertex:Uf,normal_vertex:Nf,normalmap_pars_fragment:Ff,clearcoat_normal_fragment_begin:Of,clearcoat_normal_fragment_maps:Bf,clearcoat_pars_fragment:kf,iridescence_pars_fragment:zf,opaque_fragment:Hf,packing:Vf,premultiplied_alpha_fragment:Gf,project_vertex:Wf,dithering_fragment:Xf,dithering_pars_fragment:qf,roughnessmap_fragment:Yf,roughnessmap_pars_fragment:Zf,shadowmap_pars_fragment:Kf,shadowmap_pars_vertex:Jf,shadowmap_vertex:$f,shadowmask_pars_fragment:jf,skinbase_vertex:Qf,skinning_pars_vertex:td,skinning_vertex:ed,skinnormal_vertex:nd,specularmap_fragment:id,specularmap_pars_fragment:rd,tonemapping_fragment:sd,tonemapping_pars_fragment:od,transmission_fragment:ad,transmission_pars_fragment:ld,uv_pars_fragment:cd,uv_pars_vertex:ud,uv_vertex:hd,worldpos_vertex:fd,background_vert:dd,background_frag:pd,backgroundCube_vert:md,backgroundCube_frag:gd,cube_vert:_d,cube_frag:vd,depth_vert:xd,depth_frag:Md,distanceRGBA_vert:Sd,distanceRGBA_frag:yd,equirect_vert:Ed,equirect_frag:bd,linedashed_vert:Td,linedashed_frag:Ad,meshbasic_vert:wd,meshbasic_frag:Rd,meshlambert_vert:Cd,meshlambert_frag:Pd,meshmatcap_vert:Ld,meshmatcap_frag:Dd,meshnormal_vert:Id,meshnormal_frag:Ud,meshphong_vert:Nd,meshphong_frag:Fd,meshphysical_vert:Od,meshphysical_frag:Bd,meshtoon_vert:kd,meshtoon_frag:zd,points_vert:Hd,points_frag:Vd,shadow_vert:Gd,shadow_frag:Wd,sprite_vert:Xd,sprite_frag:qd},Pt={common:{diffuse:{value:new Xt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Zt},alphaMap:{value:null},alphaMapTransform:{value:new Zt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Zt}},envmap:{envMap:{value:null},envMapRotation:{value:new Zt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Zt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Zt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Zt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Zt},normalScale:{value:new Tt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Zt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Zt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Zt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Zt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Xt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Xt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Zt},alphaTest:{value:0},uvTransform:{value:new Zt}},sprite:{diffuse:{value:new Xt(16777215)},opacity:{value:1},center:{value:new Tt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Zt},alphaMap:{value:null},alphaMapTransform:{value:new Zt},alphaTest:{value:0}}},$e={basic:{uniforms:be([Pt.common,Pt.specularmap,Pt.envmap,Pt.aomap,Pt.lightmap,Pt.fog]),vertexShader:Kt.meshbasic_vert,fragmentShader:Kt.meshbasic_frag},lambert:{uniforms:be([Pt.common,Pt.specularmap,Pt.envmap,Pt.aomap,Pt.lightmap,Pt.emissivemap,Pt.bumpmap,Pt.normalmap,Pt.displacementmap,Pt.fog,Pt.lights,{emissive:{value:new Xt(0)}}]),vertexShader:Kt.meshlambert_vert,fragmentShader:Kt.meshlambert_frag},phong:{uniforms:be([Pt.common,Pt.specularmap,Pt.envmap,Pt.aomap,Pt.lightmap,Pt.emissivemap,Pt.bumpmap,Pt.normalmap,Pt.displacementmap,Pt.fog,Pt.lights,{emissive:{value:new Xt(0)},specular:{value:new Xt(1118481)},shininess:{value:30}}]),vertexShader:Kt.meshphong_vert,fragmentShader:Kt.meshphong_frag},standard:{uniforms:be([Pt.common,Pt.envmap,Pt.aomap,Pt.lightmap,Pt.emissivemap,Pt.bumpmap,Pt.normalmap,Pt.displacementmap,Pt.roughnessmap,Pt.metalnessmap,Pt.fog,Pt.lights,{emissive:{value:new Xt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Kt.meshphysical_vert,fragmentShader:Kt.meshphysical_frag},toon:{uniforms:be([Pt.common,Pt.aomap,Pt.lightmap,Pt.emissivemap,Pt.bumpmap,Pt.normalmap,Pt.displacementmap,Pt.gradientmap,Pt.fog,Pt.lights,{emissive:{value:new Xt(0)}}]),vertexShader:Kt.meshtoon_vert,fragmentShader:Kt.meshtoon_frag},matcap:{uniforms:be([Pt.common,Pt.bumpmap,Pt.normalmap,Pt.displacementmap,Pt.fog,{matcap:{value:null}}]),vertexShader:Kt.meshmatcap_vert,fragmentShader:Kt.meshmatcap_frag},points:{uniforms:be([Pt.points,Pt.fog]),vertexShader:Kt.points_vert,fragmentShader:Kt.points_frag},dashed:{uniforms:be([Pt.common,Pt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Kt.linedashed_vert,fragmentShader:Kt.linedashed_frag},depth:{uniforms:be([Pt.common,Pt.displacementmap]),vertexShader:Kt.depth_vert,fragmentShader:Kt.depth_frag},normal:{uniforms:be([Pt.common,Pt.bumpmap,Pt.normalmap,Pt.displacementmap,{opacity:{value:1}}]),vertexShader:Kt.meshnormal_vert,fragmentShader:Kt.meshnormal_frag},sprite:{uniforms:be([Pt.sprite,Pt.fog]),vertexShader:Kt.sprite_vert,fragmentShader:Kt.sprite_frag},background:{uniforms:{uvTransform:{value:new Zt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Kt.background_vert,fragmentShader:Kt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Zt}},vertexShader:Kt.backgroundCube_vert,fragmentShader:Kt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Kt.cube_vert,fragmentShader:Kt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Kt.equirect_vert,fragmentShader:Kt.equirect_frag},distanceRGBA:{uniforms:be([Pt.common,Pt.displacementmap,{referencePosition:{value:new V},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Kt.distanceRGBA_vert,fragmentShader:Kt.distanceRGBA_frag},shadow:{uniforms:be([Pt.lights,Pt.fog,{color:{value:new Xt(0)},opacity:{value:1}}]),vertexShader:Kt.shadow_vert,fragmentShader:Kt.shadow_frag}};$e.physical={uniforms:be([$e.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Zt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Zt},clearcoatNormalScale:{value:new Tt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Zt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Zt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Zt},sheen:{value:0},sheenColor:{value:new Xt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Zt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Zt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Zt},transmissionSamplerSize:{value:new Tt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Zt},attenuationDistance:{value:0},attenuationColor:{value:new Xt(0)},specularColor:{value:new Xt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Zt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Zt},anisotropyVector:{value:new Tt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Zt}}]),vertexShader:Kt.meshphysical_vert,fragmentShader:Kt.meshphysical_frag};const Tr={r:0,b:0,g:0},Nn=new Ge,Yd=new oe;function Zd(i,t,e,n,r,s,o){const a=new Xt(0);let c=s===!0?0:1,l,u,h=null,d=0,p=null;function _(b){let v=b.isScene===!0?b.background:null;return v&&v.isTexture&&(v=(b.backgroundBlurriness>0?e:t).get(v)),v}function x(b){let v=!1;const N=_(b);N===null?f(a,c):N&&N.isColor&&(f(N,1),v=!0);const P=i.xr.getEnvironmentBlendMode();P==="additive"?n.buffers.color.setClear(0,0,0,1,o):P==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(b,v){const N=_(v);N&&(N.isCubeTexture||N.mapping===Gr)?(u===void 0&&(u=new He(new Kn(1,1,1),new _n({name:"BackgroundCubeMaterial",uniforms:bi($e.backgroundCube.uniforms),vertexShader:$e.backgroundCube.vertexShader,fragmentShader:$e.backgroundCube.fragmentShader,side:Te,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(P,L,F){this.matrixWorld.copyPosition(F.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),Nn.copy(v.backgroundRotation),Nn.x*=-1,Nn.y*=-1,Nn.z*=-1,N.isCubeTexture&&N.isRenderTargetTexture===!1&&(Nn.y*=-1,Nn.z*=-1),u.material.uniforms.envMap.value=N,u.material.uniforms.flipEnvMap.value=N.isCubeTexture&&N.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Yd.makeRotationFromEuler(Nn)),u.material.toneMapped=te.getTransfer(N.colorSpace)!==ie,(h!==N||d!==N.version||p!==i.toneMapping)&&(u.material.needsUpdate=!0,h=N,d=N.version,p=i.toneMapping),u.layers.enableAll(),b.unshift(u,u.geometry,u.material,0,0,null)):N&&N.isTexture&&(l===void 0&&(l=new He(new Jn(2,2),new _n({name:"BackgroundMaterial",uniforms:bi($e.background.uniforms),vertexShader:$e.background.vertexShader,fragmentShader:$e.background.fragmentShader,side:wn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(l)),l.material.uniforms.t2D.value=N,l.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,l.material.toneMapped=te.getTransfer(N.colorSpace)!==ie,N.matrixAutoUpdate===!0&&N.updateMatrix(),l.material.uniforms.uvTransform.value.copy(N.matrix),(h!==N||d!==N.version||p!==i.toneMapping)&&(l.material.needsUpdate=!0,h=N,d=N.version,p=i.toneMapping),l.layers.enableAll(),b.unshift(l,l.geometry,l.material,0,0,null))}function f(b,v){b.getRGB(Tr,Cl(i)),n.buffers.color.setClear(Tr.r,Tr.g,Tr.b,v,o)}function A(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(b,v=1){a.set(b),c=v,f(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(b){c=b,f(a,c)},render:x,addToRenderList:m,dispose:A}}function Kd(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=d(null);let s=r,o=!1;function a(M,C,tt,et,Y){let K=!1;const at=h(et,tt,C);s!==at&&(s=at,l(s.object)),K=p(M,et,tt,Y),K&&_(M,et,tt,Y),Y!==null&&t.update(Y,i.ELEMENT_ARRAY_BUFFER),(K||o)&&(o=!1,v(M,C,tt,et),Y!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(Y).buffer))}function c(){return i.createVertexArray()}function l(M){return i.bindVertexArray(M)}function u(M){return i.deleteVertexArray(M)}function h(M,C,tt){const et=tt.wireframe===!0;let Y=n[M.id];Y===void 0&&(Y={},n[M.id]=Y);let K=Y[C.id];K===void 0&&(K={},Y[C.id]=K);let at=K[et];return at===void 0&&(at=d(c()),K[et]=at),at}function d(M){const C=[],tt=[],et=[];for(let Y=0;Y<e;Y++)C[Y]=0,tt[Y]=0,et[Y]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:tt,attributeDivisors:et,object:M,attributes:{},index:null}}function p(M,C,tt,et){const Y=s.attributes,K=C.attributes;let at=0;const dt=tt.getAttributes();for(const nt in dt)if(dt[nt].location>=0){const pt=Y[nt];let ft=K[nt];if(ft===void 0&&(nt==="instanceMatrix"&&M.instanceMatrix&&(ft=M.instanceMatrix),nt==="instanceColor"&&M.instanceColor&&(ft=M.instanceColor)),pt===void 0||pt.attribute!==ft||ft&&pt.data!==ft.data)return!0;at++}return s.attributesNum!==at||s.index!==et}function _(M,C,tt,et){const Y={},K=C.attributes;let at=0;const dt=tt.getAttributes();for(const nt in dt)if(dt[nt].location>=0){let pt=K[nt];pt===void 0&&(nt==="instanceMatrix"&&M.instanceMatrix&&(pt=M.instanceMatrix),nt==="instanceColor"&&M.instanceColor&&(pt=M.instanceColor));const ft={};ft.attribute=pt,pt&&pt.data&&(ft.data=pt.data),Y[nt]=ft,at++}s.attributes=Y,s.attributesNum=at,s.index=et}function x(){const M=s.newAttributes;for(let C=0,tt=M.length;C<tt;C++)M[C]=0}function m(M){f(M,0)}function f(M,C){const tt=s.newAttributes,et=s.enabledAttributes,Y=s.attributeDivisors;tt[M]=1,et[M]===0&&(i.enableVertexAttribArray(M),et[M]=1),Y[M]!==C&&(i.vertexAttribDivisor(M,C),Y[M]=C)}function A(){const M=s.newAttributes,C=s.enabledAttributes;for(let tt=0,et=C.length;tt<et;tt++)C[tt]!==M[tt]&&(i.disableVertexAttribArray(tt),C[tt]=0)}function b(M,C,tt,et,Y,K,at){at===!0?i.vertexAttribIPointer(M,C,tt,Y,K):i.vertexAttribPointer(M,C,tt,et,Y,K)}function v(M,C,tt,et){x();const Y=et.attributes,K=tt.getAttributes(),at=C.defaultAttributeValues;for(const dt in K){const nt=K[dt];if(nt.location>=0){let gt=Y[dt];if(gt===void 0&&(dt==="instanceMatrix"&&M.instanceMatrix&&(gt=M.instanceMatrix),dt==="instanceColor"&&M.instanceColor&&(gt=M.instanceColor)),gt!==void 0){const pt=gt.normalized,ft=gt.itemSize,vt=t.get(gt);if(vt===void 0)continue;const Mt=vt.buffer,Rt=vt.type,st=vt.bytesPerElement,D=Rt===i.INT||Rt===i.UNSIGNED_INT||gt.gpuType===Ro;if(gt.isInterleavedBufferAttribute){const H=gt.data,$=H.stride,G=gt.offset;if(H.isInstancedInterleavedBuffer){for(let ct=0;ct<nt.locationSize;ct++)f(nt.location+ct,H.meshPerAttribute);M.isInstancedMesh!==!0&&et._maxInstanceCount===void 0&&(et._maxInstanceCount=H.meshPerAttribute*H.count)}else for(let ct=0;ct<nt.locationSize;ct++)m(nt.location+ct);i.bindBuffer(i.ARRAY_BUFFER,Mt);for(let ct=0;ct<nt.locationSize;ct++)b(nt.location+ct,ft/nt.locationSize,Rt,pt,$*st,(G+ft/nt.locationSize*ct)*st,D)}else{if(gt.isInstancedBufferAttribute){for(let H=0;H<nt.locationSize;H++)f(nt.location+H,gt.meshPerAttribute);M.isInstancedMesh!==!0&&et._maxInstanceCount===void 0&&(et._maxInstanceCount=gt.meshPerAttribute*gt.count)}else for(let H=0;H<nt.locationSize;H++)m(nt.location+H);i.bindBuffer(i.ARRAY_BUFFER,Mt);for(let H=0;H<nt.locationSize;H++)b(nt.location+H,ft/nt.locationSize,Rt,pt,ft*st,ft/nt.locationSize*H*st,D)}}else if(at!==void 0){const pt=at[dt];if(pt!==void 0)switch(pt.length){case 2:i.vertexAttrib2fv(nt.location,pt);break;case 3:i.vertexAttrib3fv(nt.location,pt);break;case 4:i.vertexAttrib4fv(nt.location,pt);break;default:i.vertexAttrib1fv(nt.location,pt)}}}}A()}function N(){F();for(const M in n){const C=n[M];for(const tt in C){const et=C[tt];for(const Y in et)u(et[Y].object),delete et[Y];delete C[tt]}delete n[M]}}function P(M){if(n[M.id]===void 0)return;const C=n[M.id];for(const tt in C){const et=C[tt];for(const Y in et)u(et[Y].object),delete et[Y];delete C[tt]}delete n[M.id]}function L(M){for(const C in n){const tt=n[C];if(tt[M.id]===void 0)continue;const et=tt[M.id];for(const Y in et)u(et[Y].object),delete et[Y];delete tt[M.id]}}function F(){S(),o=!0,s!==r&&(s=r,l(s.object))}function S(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:F,resetDefaultState:S,dispose:N,releaseStatesOfGeometry:P,releaseStatesOfProgram:L,initAttributes:x,enableAttribute:m,disableUnusedAttributes:A}}function Jd(i,t,e){let n;function r(l){n=l}function s(l,u){i.drawArrays(n,l,u),e.update(u,n,1)}function o(l,u,h){h!==0&&(i.drawArraysInstanced(n,l,u,h),e.update(u,n,h))}function a(l,u,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,u,0,h);let p=0;for(let _=0;_<h;_++)p+=u[_];e.update(p,n,1)}function c(l,u,h,d){if(h===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let _=0;_<l.length;_++)o(l[_],u[_],d[_]);else{p.multiDrawArraysInstancedWEBGL(n,l,0,u,0,d,0,h);let _=0;for(let x=0;x<h;x++)_+=u[x]*d[x];e.update(_,n,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function $d(i,t,e,n){let r;function s(){if(r!==void 0)return r;if(t.has("EXT_texture_filter_anisotropic")===!0){const L=t.get("EXT_texture_filter_anisotropic");r=i.getParameter(L.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(L){return!(L!==Ke&&n.convert(L)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(L){const F=L===$i&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(L!==rn&&n.convert(L)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&L!==tn&&!F)}function c(L){if(L==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";L="mediump"}return L==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const u=c(l);u!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const h=e.logarithmicDepthBuffer===!0,d=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),f=i.getParameter(i.MAX_VERTEX_ATTRIBS),A=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),b=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),N=_>0,P=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:h,reversedDepthBuffer:d,maxTextures:p,maxVertexTextures:_,maxTextureSize:x,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:A,maxVaryings:b,maxFragmentUniforms:v,vertexTextures:N,maxSamples:P}}function jd(i){const t=this;let e=null,n=0,r=!1,s=!1;const o=new Bn,a=new Zt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){const p=h.length!==0||d||n!==0||r;return r=d,n=h.length,p},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,d){e=u(h,d,0)},this.setState=function(h,d,p){const _=h.clippingPlanes,x=h.clipIntersection,m=h.clipShadows,f=i.get(h);if(!r||_===null||_.length===0||s&&!m)s?u(null):l();else{const A=s?0:n,b=A*4;let v=f.clippingState||null;c.value=v,v=u(_,d,b,p);for(let N=0;N!==b;++N)v[N]=e[N];f.clippingState=v,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=A}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function u(h,d,p,_){const x=h!==null?h.length:0;let m=null;if(x!==0){if(m=c.value,_!==!0||m===null){const f=p+x*4,A=d.matrixWorldInverse;a.getNormalMatrix(A),(m===null||m.length<f)&&(m=new Float32Array(f));for(let b=0,v=p;b!==x;++b,v+=4)o.copy(h[b]).applyMatrix4(A,a),o.normal.toArray(m,v),m[v+3]=o.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,m}}function Qd(i){let t=new WeakMap;function e(o,a){return a===Gs?o.mapping=Si:a===Ws&&(o.mapping=yi),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Gs||a===Ws)if(t.has(o)){const c=t.get(o).texture;return e(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new mu(c.height);return l.fromEquirectangularTexture(i,o),t.set(o,l),o.addEventListener("dispose",r),e(l.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function s(){t=new WeakMap}return{get:n,dispose:s}}const pi=4,Na=[.125,.215,.35,.446,.526,.582],Hn=20,bs=new Gl,Fa=new Xt;let Ts=null,As=0,ws=0,Rs=!1;const kn=(1+Math.sqrt(5))/2,fi=1/kn,Oa=[new V(-kn,fi,0),new V(kn,fi,0),new V(-fi,0,kn),new V(fi,0,kn),new V(0,kn,-fi),new V(0,kn,fi),new V(-1,1,-1),new V(1,1,-1),new V(-1,1,1),new V(1,1,1)],tp=new V;class Ba{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,r=100,s={}){const{size:o=256,position:a=tp}=s;Ts=this._renderer.getRenderTarget(),As=this._renderer.getActiveCubeFace(),ws=this._renderer.getActiveMipmapLevel(),Rs=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,n,r,c,a),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ha(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=za(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Ts,As,ws),this._renderer.xr.enabled=Rs,t.scissorTest=!1,Ar(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Si||t.mapping===yi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Ts=this._renderer.getRenderTarget(),As=this._renderer.getActiveCubeFace(),ws=this._renderer.getActiveMipmapLevel(),Rs=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Qe,minFilter:Qe,generateMipmaps:!1,type:$i,format:Ke,colorSpace:Ei,depthBuffer:!1},r=ka(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ka(t,e,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=ep(s)),this._blurMaterial=np(s,t,e)}return r}_compileMaterial(t){const e=new He(this._lodPlanes[0],t);this._renderer.compile(e,bs)}_sceneToCubeUV(t,e,n,r,s){const c=new Ne(90,1,e,n),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,p=h.toneMapping;h.getClearColor(Fa),h.toneMapping=An,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(r),h.clearDepth(),h.setRenderTarget(null));const x=new Fo({name:"PMREM.Background",side:Te,depthWrite:!1,depthTest:!1}),m=new He(new Kn,x);let f=!1;const A=t.background;A?A.isColor&&(x.color.copy(A),t.background=null,f=!0):(x.color.copy(Fa),f=!0);for(let b=0;b<6;b++){const v=b%3;v===0?(c.up.set(0,l[b],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x+u[b],s.y,s.z)):v===1?(c.up.set(0,0,l[b]),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y+u[b],s.z)):(c.up.set(0,l[b],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y,s.z+u[b]));const N=this._cubeSize;Ar(r,v*N,b>2?N:0,N,N),h.setRenderTarget(r),f&&h.render(m,c),h.render(t,c)}m.geometry.dispose(),m.material.dispose(),h.toneMapping=p,h.autoClear=d,t.background=A}_textureToCubeUV(t,e){const n=this._renderer,r=t.mapping===Si||t.mapping===yi;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ha()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=za());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new He(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=t;const c=this._cubeSize;Ar(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(o,bs)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=Oa[(r-s-1)%Oa.length];this._blur(t,s-1,s,o,a)}e.autoClear=n}_blur(t,e,n,r,s){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,r,"latitudinal",s),this._halfBlur(o,t,n,n,r,"longitudinal",s)}_halfBlur(t,e,n,r,s,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new He(this._lodPlanes[r],l),d=l.uniforms,p=this._sizeLods[n]-1,_=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*Hn-1),x=s/_,m=isFinite(s)?1+Math.floor(u*x):Hn;m>Hn&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Hn}`);const f=[];let A=0;for(let L=0;L<Hn;++L){const F=L/x,S=Math.exp(-F*F/2);f.push(S),L===0?A+=S:L<m&&(A+=2*S)}for(let L=0;L<f.length;L++)f[L]=f[L]/A;d.envMap.value=t.texture,d.samples.value=m,d.weights.value=f,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:b}=this;d.dTheta.value=_,d.mipInt.value=b-n;const v=this._sizeLods[r],N=3*v*(r>b-pi?r-b+pi:0),P=4*(this._cubeSize-v);Ar(e,N,P,3*v,2*v),c.setRenderTarget(e),c.render(h,bs)}}function ep(i){const t=[],e=[],n=[];let r=i;const s=i-pi+1+Na.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);e.push(a);let c=1/a;o>i-pi?c=Na[o-i+pi-1]:o===0&&(c=0),n.push(c);const l=1/(a-2),u=-l,h=1+l,d=[u,u,h,u,h,h,u,u,h,h,u,h],p=6,_=6,x=3,m=2,f=1,A=new Float32Array(x*_*p),b=new Float32Array(m*_*p),v=new Float32Array(f*_*p);for(let P=0;P<p;P++){const L=P%3*2/3-1,F=P>2?0:-1,S=[L,F,0,L+2/3,F,0,L+2/3,F+1,0,L,F,0,L+2/3,F+1,0,L,F+1,0];A.set(S,x*_*P),b.set(d,m*_*P);const M=[P,P,P,P,P,P];v.set(M,f*_*P)}const N=new pe;N.setAttribute("position",new Ve(A,x)),N.setAttribute("uv",new Ve(b,m)),N.setAttribute("faceIndex",new Ve(v,f)),t.push(N),r>pi&&r--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function ka(i,t,e){const n=new qn(i,t,e);return n.texture.mapping=Gr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ar(i,t,e,n,r){i.viewport.set(t,e,n,r),i.scissor.set(t,e,n,r)}function np(i,t,e){const n=new Float32Array(Hn),r=new V(0,1,0);return new _n({name:"SphericalGaussianBlur",defines:{n:Hn,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Wo(),fragmentShader:`

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
		`,blending:Tn,depthTest:!1,depthWrite:!1})}function za(){return new _n({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Wo(),fragmentShader:`

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
		`,blending:Tn,depthTest:!1,depthWrite:!1})}function Ha(){return new _n({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Wo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Tn,depthTest:!1,depthWrite:!1})}function Wo(){return`

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
	`}function ip(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===Gs||c===Ws,u=c===Si||c===yi;if(l||u){let h=t.get(a);const d=h!==void 0?h.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return e===null&&(e=new Ba(i)),h=l?e.fromEquirectangular(a,h):e.fromCubemap(a,h),h.texture.pmremVersion=a.pmremVersion,t.set(a,h),h.texture;if(h!==void 0)return h.texture;{const p=a.image;return l&&p&&p.height>0||u&&p&&r(p)?(e===null&&(e=new Ba(i)),h=l?e.fromEquirectangular(a):e.fromCubemap(a),h.texture.pmremVersion=a.pmremVersion,t.set(a,h),a.addEventListener("dispose",s),h.texture):null}}}return a}function r(a){let c=0;const l=6;for(let u=0;u<l;u++)a[u]!==void 0&&c++;return c===l}function s(a){const c=a.target;c.removeEventListener("dispose",s);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function rp(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return t[n]=r,r}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const r=e(n);return r===null&&gi("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function sp(i,t,e,n){const r={},s=new WeakMap;function o(h){const d=h.target;d.index!==null&&t.remove(d.index);for(const _ in d.attributes)t.remove(d.attributes[_]);d.removeEventListener("dispose",o),delete r[d.id];const p=s.get(d);p&&(t.remove(p),s.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(h,d){return r[d.id]===!0||(d.addEventListener("dispose",o),r[d.id]=!0,e.memory.geometries++),d}function c(h){const d=h.attributes;for(const p in d)t.update(d[p],i.ARRAY_BUFFER)}function l(h){const d=[],p=h.index,_=h.attributes.position;let x=0;if(p!==null){const A=p.array;x=p.version;for(let b=0,v=A.length;b<v;b+=3){const N=A[b+0],P=A[b+1],L=A[b+2];d.push(N,P,P,L,L,N)}}else if(_!==void 0){const A=_.array;x=_.version;for(let b=0,v=A.length/3-1;b<v;b+=3){const N=b+0,P=b+1,L=b+2;d.push(N,P,P,L,L,N)}}else return;const m=new(El(d)?Rl:wl)(d,1);m.version=x;const f=s.get(h);f&&t.remove(f),s.set(h,m)}function u(h){const d=s.get(h);if(d){const p=h.index;p!==null&&d.version<p.version&&l(h)}else l(h);return s.get(h)}return{get:a,update:c,getWireframeAttribute:u}}function op(i,t,e){let n;function r(d){n=d}let s,o;function a(d){s=d.type,o=d.bytesPerElement}function c(d,p){i.drawElements(n,p,s,d*o),e.update(p,n,1)}function l(d,p,_){_!==0&&(i.drawElementsInstanced(n,p,s,d*o,_),e.update(p,n,_))}function u(d,p,_){if(_===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,s,d,0,_);let m=0;for(let f=0;f<_;f++)m+=p[f];e.update(m,n,1)}function h(d,p,_,x){if(_===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<d.length;f++)l(d[f]/o,p[f],x[f]);else{m.multiDrawElementsInstancedWEBGL(n,p,0,s,d,0,x,0,_);let f=0;for(let A=0;A<_;A++)f+=p[A]*x[A];e.update(f,n,1)}}this.setMode=r,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function ap(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(s/3);break;case i.LINES:e.lines+=a*(s/2);break;case i.LINE_STRIP:e.lines+=a*(s-1);break;case i.LINE_LOOP:e.lines+=a*s;break;case i.POINTS:e.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:r,update:n}}function lp(i,t,e){const n=new WeakMap,r=new re;function s(o,a,c){const l=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=u!==void 0?u.length:0;let d=n.get(a);if(d===void 0||d.count!==h){let M=function(){F.dispose(),n.delete(a),a.removeEventListener("dispose",M)};var p=M;d!==void 0&&d.texture.dispose();const _=a.morphAttributes.position!==void 0,x=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,f=a.morphAttributes.position||[],A=a.morphAttributes.normal||[],b=a.morphAttributes.color||[];let v=0;_===!0&&(v=1),x===!0&&(v=2),m===!0&&(v=3);let N=a.attributes.position.count*v,P=1;N>t.maxTextureSize&&(P=Math.ceil(N/t.maxTextureSize),N=t.maxTextureSize);const L=new Float32Array(N*P*4*h),F=new bl(L,N,P,h);F.type=tn,F.needsUpdate=!0;const S=v*4;for(let C=0;C<h;C++){const tt=f[C],et=A[C],Y=b[C],K=N*P*4*C;for(let at=0;at<tt.count;at++){const dt=at*S;_===!0&&(r.fromBufferAttribute(tt,at),L[K+dt+0]=r.x,L[K+dt+1]=r.y,L[K+dt+2]=r.z,L[K+dt+3]=0),x===!0&&(r.fromBufferAttribute(et,at),L[K+dt+4]=r.x,L[K+dt+5]=r.y,L[K+dt+6]=r.z,L[K+dt+7]=0),m===!0&&(r.fromBufferAttribute(Y,at),L[K+dt+8]=r.x,L[K+dt+9]=r.y,L[K+dt+10]=r.z,L[K+dt+11]=Y.itemSize===4?r.w:1)}}d={count:h,texture:F,size:new Tt(N,P)},n.set(a,d),a.addEventListener("dispose",M)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let _=0;for(let m=0;m<l.length;m++)_+=l[m];const x=a.morphTargetsRelative?1:1-_;c.getUniforms().setValue(i,"morphTargetBaseInfluence",x),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",d.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:s}}function cp(i,t,e,n){let r=new WeakMap;function s(c){const l=n.render.frame,u=c.geometry,h=t.get(c,u);if(r.get(h)!==l&&(t.update(h),r.set(h,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),r.get(c)!==l&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,l))),c.isSkinnedMesh){const d=c.skeleton;r.get(d)!==l&&(d.update(),r.set(d,l))}return h}function o(){r=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:s,dispose:o}}const Xl=new ye,Va=new Dl(1,1),ql=new bl,Yl=new $c,Zl=new Ll,Ga=[],Wa=[],Xa=new Float32Array(16),qa=new Float32Array(9),Ya=new Float32Array(4);function Ri(i,t,e){const n=i[0];if(n<=0||n>0)return i;const r=t*e;let s=Ga[r];if(s===void 0&&(s=new Float32Array(r),Ga[r]=s),t!==0){n.toArray(s,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(s,a)}return s}function me(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function ge(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Xr(i,t){let e=Wa[t];e===void 0&&(e=new Int32Array(t),Wa[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function up(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function hp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(me(e,t))return;i.uniform2fv(this.addr,t),ge(e,t)}}function fp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(me(e,t))return;i.uniform3fv(this.addr,t),ge(e,t)}}function dp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(me(e,t))return;i.uniform4fv(this.addr,t),ge(e,t)}}function pp(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(me(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),ge(e,t)}else{if(me(e,n))return;Ya.set(n),i.uniformMatrix2fv(this.addr,!1,Ya),ge(e,n)}}function mp(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(me(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),ge(e,t)}else{if(me(e,n))return;qa.set(n),i.uniformMatrix3fv(this.addr,!1,qa),ge(e,n)}}function gp(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(me(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),ge(e,t)}else{if(me(e,n))return;Xa.set(n),i.uniformMatrix4fv(this.addr,!1,Xa),ge(e,n)}}function _p(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function vp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(me(e,t))return;i.uniform2iv(this.addr,t),ge(e,t)}}function xp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(me(e,t))return;i.uniform3iv(this.addr,t),ge(e,t)}}function Mp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(me(e,t))return;i.uniform4iv(this.addr,t),ge(e,t)}}function Sp(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function yp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(me(e,t))return;i.uniform2uiv(this.addr,t),ge(e,t)}}function Ep(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(me(e,t))return;i.uniform3uiv(this.addr,t),ge(e,t)}}function bp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(me(e,t))return;i.uniform4uiv(this.addr,t),ge(e,t)}}function Tp(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_2D_SHADOW?(Va.compareFunction=yl,s=Va):s=Xl,e.setTexture2D(t||s,r)}function Ap(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTexture3D(t||Yl,r)}function wp(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTextureCube(t||Zl,r)}function Rp(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTexture2DArray(t||ql,r)}function Cp(i){switch(i){case 5126:return up;case 35664:return hp;case 35665:return fp;case 35666:return dp;case 35674:return pp;case 35675:return mp;case 35676:return gp;case 5124:case 35670:return _p;case 35667:case 35671:return vp;case 35668:case 35672:return xp;case 35669:case 35673:return Mp;case 5125:return Sp;case 36294:return yp;case 36295:return Ep;case 36296:return bp;case 35678:case 36198:case 36298:case 36306:case 35682:return Tp;case 35679:case 36299:case 36307:return Ap;case 35680:case 36300:case 36308:case 36293:return wp;case 36289:case 36303:case 36311:case 36292:return Rp}}function Pp(i,t){i.uniform1fv(this.addr,t)}function Lp(i,t){const e=Ri(t,this.size,2);i.uniform2fv(this.addr,e)}function Dp(i,t){const e=Ri(t,this.size,3);i.uniform3fv(this.addr,e)}function Ip(i,t){const e=Ri(t,this.size,4);i.uniform4fv(this.addr,e)}function Up(i,t){const e=Ri(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Np(i,t){const e=Ri(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Fp(i,t){const e=Ri(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Op(i,t){i.uniform1iv(this.addr,t)}function Bp(i,t){i.uniform2iv(this.addr,t)}function kp(i,t){i.uniform3iv(this.addr,t)}function zp(i,t){i.uniform4iv(this.addr,t)}function Hp(i,t){i.uniform1uiv(this.addr,t)}function Vp(i,t){i.uniform2uiv(this.addr,t)}function Gp(i,t){i.uniform3uiv(this.addr,t)}function Wp(i,t){i.uniform4uiv(this.addr,t)}function Xp(i,t,e){const n=this.cache,r=t.length,s=Xr(e,r);me(n,s)||(i.uniform1iv(this.addr,s),ge(n,s));for(let o=0;o!==r;++o)e.setTexture2D(t[o]||Xl,s[o])}function qp(i,t,e){const n=this.cache,r=t.length,s=Xr(e,r);me(n,s)||(i.uniform1iv(this.addr,s),ge(n,s));for(let o=0;o!==r;++o)e.setTexture3D(t[o]||Yl,s[o])}function Yp(i,t,e){const n=this.cache,r=t.length,s=Xr(e,r);me(n,s)||(i.uniform1iv(this.addr,s),ge(n,s));for(let o=0;o!==r;++o)e.setTextureCube(t[o]||Zl,s[o])}function Zp(i,t,e){const n=this.cache,r=t.length,s=Xr(e,r);me(n,s)||(i.uniform1iv(this.addr,s),ge(n,s));for(let o=0;o!==r;++o)e.setTexture2DArray(t[o]||ql,s[o])}function Kp(i){switch(i){case 5126:return Pp;case 35664:return Lp;case 35665:return Dp;case 35666:return Ip;case 35674:return Up;case 35675:return Np;case 35676:return Fp;case 5124:case 35670:return Op;case 35667:case 35671:return Bp;case 35668:case 35672:return kp;case 35669:case 35673:return zp;case 5125:return Hp;case 36294:return Vp;case 36295:return Gp;case 36296:return Wp;case 35678:case 36198:case 36298:case 36306:case 35682:return Xp;case 35679:case 36299:case 36307:return qp;case 35680:case 36300:case 36308:case 36293:return Yp;case 36289:case 36303:case 36311:case 36292:return Zp}}class Jp{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Cp(e.type)}}class $p{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Kp(e.type)}}class jp{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(t,e[a.id],n)}}}const Cs=/(\w+)(\])?(\[|\.)?/g;function Za(i,t){i.seq.push(t),i.map[t.id]=t}function Qp(i,t,e){const n=i.name,r=n.length;for(Cs.lastIndex=0;;){const s=Cs.exec(n),o=Cs.lastIndex;let a=s[1];const c=s[2]==="]",l=s[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===r){Za(e,l===void 0?new Jp(a,i,t):new $p(a,i,t));break}else{let h=e.map[a];h===void 0&&(h=new jp(a),Za(e,h)),e=h}}}class Ur{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){const s=t.getActiveUniform(e,r),o=t.getUniformLocation(e,s.name);Qp(s,o,this)}}setValue(t,e,n,r){const s=this.map[e];s!==void 0&&s.setValue(t,n,r)}setOptional(t,e,n){const r=e[n];r!==void 0&&this.setValue(t,n,r)}static upload(t,e,n,r){for(let s=0,o=e.length;s!==o;++s){const a=e[s],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,r)}}static seqWithValue(t,e){const n=[];for(let r=0,s=t.length;r!==s;++r){const o=t[r];o.id in e&&n.push(o)}return n}}function Ka(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const tm=37297;let em=0;function nm(i,t){const e=i.split(`
`),n=[],r=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let o=r;o<s;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const Ja=new Zt;function im(i){te._getMatrix(Ja,te.workingColorSpace,i);const t=`mat3( ${Ja.elements.map(e=>e.toFixed(4))} )`;switch(te.getTransfer(i)){case Fr:return[t,"LinearTransferOETF"];case ie:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function $a(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),s=(i.getShaderInfoLog(t)||"").trim();if(n&&s==="")return"";const o=/ERROR: 0:(\d+)/.exec(s);if(o){const a=parseInt(o[1]);return e.toUpperCase()+`

`+s+`

`+nm(i.getShaderSource(t),a)}else return s}function rm(i,t){const e=im(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function sm(i,t){let e;switch(t){case Ac:e="Linear";break;case wc:e="Reinhard";break;case Rc:e="Cineon";break;case fl:e="ACESFilmic";break;case Pc:e="AgX";break;case Lc:e="Neutral";break;case Cc:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const wr=new V;function om(){te.getLuminanceCoefficients(wr);const i=wr.x.toFixed(4),t=wr.y.toFixed(4),e=wr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function am(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(zi).join(`
`)}function lm(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function cm(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(t,r),o=s.name;let a=1;s.type===i.FLOAT_MAT2&&(a=2),s.type===i.FLOAT_MAT3&&(a=3),s.type===i.FLOAT_MAT4&&(a=4),e[o]={type:s.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function zi(i){return i!==""}function ja(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Qa(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const um=/^[ \t]*#include +<([\w\d./]+)>/gm;function Eo(i){return i.replace(um,fm)}const hm=new Map;function fm(i,t){let e=Kt[t];if(e===void 0){const n=hm.get(t);if(n!==void 0)e=Kt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Eo(e)}const dm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function tl(i){return i.replace(dm,pm)}function pm(i,t,e,n){let r="";for(let s=parseInt(t);s<parseInt(e);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function el(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function mm(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Nr?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===sc?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===fn&&(t="SHADOWMAP_TYPE_VSM"),t}function gm(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Si:case yi:t="ENVMAP_TYPE_CUBE";break;case Gr:t="ENVMAP_TYPE_CUBE_UV";break}return t}function _m(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case yi:t="ENVMAP_MODE_REFRACTION";break}return t}function vm(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case hl:t="ENVMAP_BLENDING_MULTIPLY";break;case bc:t="ENVMAP_BLENDING_MIX";break;case Tc:t="ENVMAP_BLENDING_ADD";break}return t}function xm(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function Mm(i,t,e,n){const r=i.getContext(),s=e.defines;let o=e.vertexShader,a=e.fragmentShader;const c=mm(e),l=gm(e),u=_m(e),h=vm(e),d=xm(e),p=am(e),_=lm(s),x=r.createProgram();let m,f,A=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(zi).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(zi).join(`
`),f.length>0&&(f+=`
`)):(m=[el(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reversedDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(zi).join(`
`),f=[el(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+u:"",e.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reversedDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==An?"#define TONE_MAPPING":"",e.toneMapping!==An?Kt.tonemapping_pars_fragment:"",e.toneMapping!==An?sm("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Kt.colorspace_pars_fragment,rm("linearToOutputTexel",e.outputColorSpace),om(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(zi).join(`
`)),o=Eo(o),o=ja(o,e),o=Qa(o,e),a=Eo(a),a=ja(a,e),a=Qa(a,e),o=tl(o),a=tl(a),e.isRawShaderMaterial!==!0&&(A=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",e.glslVersion===ra?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===ra?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const b=A+m+o,v=A+f+a,N=Ka(r,r.VERTEX_SHADER,b),P=Ka(r,r.FRAGMENT_SHADER,v);r.attachShader(x,N),r.attachShader(x,P),e.index0AttributeName!==void 0?r.bindAttribLocation(x,0,e.index0AttributeName):e.morphTargets===!0&&r.bindAttribLocation(x,0,"position"),r.linkProgram(x);function L(C){if(i.debug.checkShaderErrors){const tt=r.getProgramInfoLog(x)||"",et=r.getShaderInfoLog(N)||"",Y=r.getShaderInfoLog(P)||"",K=tt.trim(),at=et.trim(),dt=Y.trim();let nt=!0,gt=!0;if(r.getProgramParameter(x,r.LINK_STATUS)===!1)if(nt=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,x,N,P);else{const pt=$a(r,N,"vertex"),ft=$a(r,P,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(x,r.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+K+`
`+pt+`
`+ft)}else K!==""?console.warn("THREE.WebGLProgram: Program Info Log:",K):(at===""||dt==="")&&(gt=!1);gt&&(C.diagnostics={runnable:nt,programLog:K,vertexShader:{log:at,prefix:m},fragmentShader:{log:dt,prefix:f}})}r.deleteShader(N),r.deleteShader(P),F=new Ur(r,x),S=cm(r,x)}let F;this.getUniforms=function(){return F===void 0&&L(this),F};let S;this.getAttributes=function(){return S===void 0&&L(this),S};let M=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=r.getProgramParameter(x,tm)),M},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=em++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=N,this.fragmentShader=P,this}let Sm=0;class ym{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,r=this._getShaderStage(e),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new Em(t),e.set(t,n)),n}}class Em{constructor(t){this.id=Sm++,this.code=t,this.usedTimes=0}}function bm(i,t,e,n,r,s,o){const a=new Tl,c=new ym,l=new Set,u=[],h=r.logarithmicDepthBuffer,d=r.vertexTextures;let p=r.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(S){return l.add(S),S===0?"uv":`uv${S}`}function m(S,M,C,tt,et){const Y=tt.fog,K=et.geometry,at=S.isMeshStandardMaterial?tt.environment:null,dt=(S.isMeshStandardMaterial?e:t).get(S.envMap||at),nt=dt&&dt.mapping===Gr?dt.image.height:null,gt=_[S.type];S.precision!==null&&(p=r.getMaxPrecision(S.precision),p!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",p,"instead."));const pt=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,ft=pt!==void 0?pt.length:0;let vt=0;K.morphAttributes.position!==void 0&&(vt=1),K.morphAttributes.normal!==void 0&&(vt=2),K.morphAttributes.color!==void 0&&(vt=3);let Mt,Rt,st,D;if(gt){const ee=$e[gt];Mt=ee.vertexShader,Rt=ee.fragmentShader}else Mt=S.vertexShader,Rt=S.fragmentShader,c.update(S),st=c.getVertexShaderID(S),D=c.getFragmentShaderID(S);const H=i.getRenderTarget(),$=i.state.buffers.depth.getReversed(),G=et.isInstancedMesh===!0,ct=et.isBatchedMesh===!0,Z=!!S.map,lt=!!S.matcap,w=!!dt,j=!!S.aoMap,E=!!S.lightMap,B=!!S.bumpMap,O=!!S.normalMap,I=!!S.displacementMap,U=!!S.emissiveMap,z=!!S.metalnessMap,W=!!S.roughnessMap,rt=S.anisotropy>0,y=S.clearcoat>0,g=S.dispersion>0,R=S.iridescence>0,k=S.sheen>0,J=S.transmission>0,X=rt&&!!S.anisotropyMap,mt=y&&!!S.clearcoatMap,_t=y&&!!S.clearcoatNormalMap,At=y&&!!S.clearcoatRoughnessMap,It=R&&!!S.iridescenceMap,St=R&&!!S.iridescenceThicknessMap,Ct=k&&!!S.sheenColorMap,Gt=k&&!!S.sheenRoughnessMap,kt=!!S.specularMap,Lt=!!S.specularColorMap,Yt=!!S.specularIntensityMap,q=J&&!!S.transmissionMap,bt=J&&!!S.thicknessMap,wt=!!S.gradientMap,Ft=!!S.alphaMap,yt=S.alphaTest>0,xt=!!S.alphaHash,Bt=!!S.extensions;let qt=An;S.toneMapped&&(H===null||H.isXRRenderTarget===!0)&&(qt=i.toneMapping);const ae={shaderID:gt,shaderType:S.type,shaderName:S.name,vertexShader:Mt,fragmentShader:Rt,defines:S.defines,customVertexShaderID:st,customFragmentShaderID:D,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:p,batching:ct,batchingColor:ct&&et._colorsTexture!==null,instancing:G,instancingColor:G&&et.instanceColor!==null,instancingMorph:G&&et.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:H===null?i.outputColorSpace:H.isXRRenderTarget===!0?H.texture.colorSpace:Ei,alphaToCoverage:!!S.alphaToCoverage,map:Z,matcap:lt,envMap:w,envMapMode:w&&dt.mapping,envMapCubeUVHeight:nt,aoMap:j,lightMap:E,bumpMap:B,normalMap:O,displacementMap:d&&I,emissiveMap:U,normalMapObjectSpace:O&&S.normalMapType===Nc,normalMapTangentSpace:O&&S.normalMapType===Sl,metalnessMap:z,roughnessMap:W,anisotropy:rt,anisotropyMap:X,clearcoat:y,clearcoatMap:mt,clearcoatNormalMap:_t,clearcoatRoughnessMap:At,dispersion:g,iridescence:R,iridescenceMap:It,iridescenceThicknessMap:St,sheen:k,sheenColorMap:Ct,sheenRoughnessMap:Gt,specularMap:kt,specularColorMap:Lt,specularIntensityMap:Yt,transmission:J,transmissionMap:q,thicknessMap:bt,gradientMap:wt,opaque:S.transparent===!1&&S.blending===mi&&S.alphaToCoverage===!1,alphaMap:Ft,alphaTest:yt,alphaHash:xt,combine:S.combine,mapUv:Z&&x(S.map.channel),aoMapUv:j&&x(S.aoMap.channel),lightMapUv:E&&x(S.lightMap.channel),bumpMapUv:B&&x(S.bumpMap.channel),normalMapUv:O&&x(S.normalMap.channel),displacementMapUv:I&&x(S.displacementMap.channel),emissiveMapUv:U&&x(S.emissiveMap.channel),metalnessMapUv:z&&x(S.metalnessMap.channel),roughnessMapUv:W&&x(S.roughnessMap.channel),anisotropyMapUv:X&&x(S.anisotropyMap.channel),clearcoatMapUv:mt&&x(S.clearcoatMap.channel),clearcoatNormalMapUv:_t&&x(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:At&&x(S.clearcoatRoughnessMap.channel),iridescenceMapUv:It&&x(S.iridescenceMap.channel),iridescenceThicknessMapUv:St&&x(S.iridescenceThicknessMap.channel),sheenColorMapUv:Ct&&x(S.sheenColorMap.channel),sheenRoughnessMapUv:Gt&&x(S.sheenRoughnessMap.channel),specularMapUv:kt&&x(S.specularMap.channel),specularColorMapUv:Lt&&x(S.specularColorMap.channel),specularIntensityMapUv:Yt&&x(S.specularIntensityMap.channel),transmissionMapUv:q&&x(S.transmissionMap.channel),thicknessMapUv:bt&&x(S.thicknessMap.channel),alphaMapUv:Ft&&x(S.alphaMap.channel),vertexTangents:!!K.attributes.tangent&&(O||rt),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,pointsUvs:et.isPoints===!0&&!!K.attributes.uv&&(Z||Ft),fog:!!Y,useFog:S.fog===!0,fogExp2:!!Y&&Y.isFogExp2,flatShading:S.flatShading===!0&&S.wireframe===!1,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:$,skinning:et.isSkinnedMesh===!0,morphTargets:K.morphAttributes.position!==void 0,morphNormals:K.morphAttributes.normal!==void 0,morphColors:K.morphAttributes.color!==void 0,morphTargetsCount:ft,morphTextureStride:vt,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:S.dithering,shadowMapEnabled:i.shadowMap.enabled&&C.length>0,shadowMapType:i.shadowMap.type,toneMapping:qt,decodeVideoTexture:Z&&S.map.isVideoTexture===!0&&te.getTransfer(S.map.colorSpace)===ie,decodeVideoTextureEmissive:U&&S.emissiveMap.isVideoTexture===!0&&te.getTransfer(S.emissiveMap.colorSpace)===ie,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===ve,flipSided:S.side===Te,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:Bt&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Bt&&S.extensions.multiDraw===!0||ct)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return ae.vertexUv1s=l.has(1),ae.vertexUv2s=l.has(2),ae.vertexUv3s=l.has(3),l.clear(),ae}function f(S){const M=[];if(S.shaderID?M.push(S.shaderID):(M.push(S.customVertexShaderID),M.push(S.customFragmentShaderID)),S.defines!==void 0)for(const C in S.defines)M.push(C),M.push(S.defines[C]);return S.isRawShaderMaterial===!1&&(A(M,S),b(M,S),M.push(i.outputColorSpace)),M.push(S.customProgramCacheKey),M.join()}function A(S,M){S.push(M.precision),S.push(M.outputColorSpace),S.push(M.envMapMode),S.push(M.envMapCubeUVHeight),S.push(M.mapUv),S.push(M.alphaMapUv),S.push(M.lightMapUv),S.push(M.aoMapUv),S.push(M.bumpMapUv),S.push(M.normalMapUv),S.push(M.displacementMapUv),S.push(M.emissiveMapUv),S.push(M.metalnessMapUv),S.push(M.roughnessMapUv),S.push(M.anisotropyMapUv),S.push(M.clearcoatMapUv),S.push(M.clearcoatNormalMapUv),S.push(M.clearcoatRoughnessMapUv),S.push(M.iridescenceMapUv),S.push(M.iridescenceThicknessMapUv),S.push(M.sheenColorMapUv),S.push(M.sheenRoughnessMapUv),S.push(M.specularMapUv),S.push(M.specularColorMapUv),S.push(M.specularIntensityMapUv),S.push(M.transmissionMapUv),S.push(M.thicknessMapUv),S.push(M.combine),S.push(M.fogExp2),S.push(M.sizeAttenuation),S.push(M.morphTargetsCount),S.push(M.morphAttributeCount),S.push(M.numDirLights),S.push(M.numPointLights),S.push(M.numSpotLights),S.push(M.numSpotLightMaps),S.push(M.numHemiLights),S.push(M.numRectAreaLights),S.push(M.numDirLightShadows),S.push(M.numPointLightShadows),S.push(M.numSpotLightShadows),S.push(M.numSpotLightShadowsWithMaps),S.push(M.numLightProbes),S.push(M.shadowMapType),S.push(M.toneMapping),S.push(M.numClippingPlanes),S.push(M.numClipIntersection),S.push(M.depthPacking)}function b(S,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),M.gradientMap&&a.enable(22),S.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reversedDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),S.push(a.mask)}function v(S){const M=_[S.type];let C;if(M){const tt=$e[M];C=hu.clone(tt.uniforms)}else C=S.uniforms;return C}function N(S,M){let C;for(let tt=0,et=u.length;tt<et;tt++){const Y=u[tt];if(Y.cacheKey===M){C=Y,++C.usedTimes;break}}return C===void 0&&(C=new Mm(i,M,S,s),u.push(C)),C}function P(S){if(--S.usedTimes===0){const M=u.indexOf(S);u[M]=u[u.length-1],u.pop(),S.destroy()}}function L(S){c.remove(S)}function F(){c.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:v,acquireProgram:N,releaseProgram:P,releaseShaderCache:L,programs:u,dispose:F}}function Tm(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function r(o,a,c){i.get(o)[a]=c}function s(){i=new WeakMap}return{has:t,get:e,remove:n,update:r,dispose:s}}function Am(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function nl(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function il(){const i=[];let t=0;const e=[],n=[],r=[];function s(){t=0,e.length=0,n.length=0,r.length=0}function o(h,d,p,_,x,m){let f=i[t];return f===void 0?(f={id:h.id,object:h,geometry:d,material:p,groupOrder:_,renderOrder:h.renderOrder,z:x,group:m},i[t]=f):(f.id=h.id,f.object=h,f.geometry=d,f.material=p,f.groupOrder=_,f.renderOrder=h.renderOrder,f.z=x,f.group=m),t++,f}function a(h,d,p,_,x,m){const f=o(h,d,p,_,x,m);p.transmission>0?n.push(f):p.transparent===!0?r.push(f):e.push(f)}function c(h,d,p,_,x,m){const f=o(h,d,p,_,x,m);p.transmission>0?n.unshift(f):p.transparent===!0?r.unshift(f):e.unshift(f)}function l(h,d){e.length>1&&e.sort(h||Am),n.length>1&&n.sort(d||nl),r.length>1&&r.sort(d||nl)}function u(){for(let h=t,d=i.length;h<d;h++){const p=i[h];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:n,transparent:r,init:s,push:a,unshift:c,finish:u,sort:l}}function wm(){let i=new WeakMap;function t(n,r){const s=i.get(n);let o;return s===void 0?(o=new il,i.set(n,[o])):r>=s.length?(o=new il,s.push(o)):o=s[r],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function Rm(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new V,color:new Xt};break;case"SpotLight":e={position:new V,direction:new V,color:new Xt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new V,color:new Xt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new V,skyColor:new Xt,groundColor:new Xt};break;case"RectAreaLight":e={color:new Xt,position:new V,halfWidth:new V,halfHeight:new V};break}return i[t.id]=e,e}}}function Cm(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Tt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Tt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Tt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let Pm=0;function Lm(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function Dm(i){const t=new Rm,e=Cm(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new V);const r=new V,s=new oe,o=new oe;function a(l){let u=0,h=0,d=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let p=0,_=0,x=0,m=0,f=0,A=0,b=0,v=0,N=0,P=0,L=0;l.sort(Lm);for(let S=0,M=l.length;S<M;S++){const C=l[S],tt=C.color,et=C.intensity,Y=C.distance,K=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)u+=tt.r*et,h+=tt.g*et,d+=tt.b*et;else if(C.isLightProbe){for(let at=0;at<9;at++)n.probe[at].addScaledVector(C.sh.coefficients[at],et);L++}else if(C.isDirectionalLight){const at=t.get(C);if(at.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const dt=C.shadow,nt=e.get(C);nt.shadowIntensity=dt.intensity,nt.shadowBias=dt.bias,nt.shadowNormalBias=dt.normalBias,nt.shadowRadius=dt.radius,nt.shadowMapSize=dt.mapSize,n.directionalShadow[p]=nt,n.directionalShadowMap[p]=K,n.directionalShadowMatrix[p]=C.shadow.matrix,A++}n.directional[p]=at,p++}else if(C.isSpotLight){const at=t.get(C);at.position.setFromMatrixPosition(C.matrixWorld),at.color.copy(tt).multiplyScalar(et),at.distance=Y,at.coneCos=Math.cos(C.angle),at.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),at.decay=C.decay,n.spot[x]=at;const dt=C.shadow;if(C.map&&(n.spotLightMap[N]=C.map,N++,dt.updateMatrices(C),C.castShadow&&P++),n.spotLightMatrix[x]=dt.matrix,C.castShadow){const nt=e.get(C);nt.shadowIntensity=dt.intensity,nt.shadowBias=dt.bias,nt.shadowNormalBias=dt.normalBias,nt.shadowRadius=dt.radius,nt.shadowMapSize=dt.mapSize,n.spotShadow[x]=nt,n.spotShadowMap[x]=K,v++}x++}else if(C.isRectAreaLight){const at=t.get(C);at.color.copy(tt).multiplyScalar(et),at.halfWidth.set(C.width*.5,0,0),at.halfHeight.set(0,C.height*.5,0),n.rectArea[m]=at,m++}else if(C.isPointLight){const at=t.get(C);if(at.color.copy(C.color).multiplyScalar(C.intensity),at.distance=C.distance,at.decay=C.decay,C.castShadow){const dt=C.shadow,nt=e.get(C);nt.shadowIntensity=dt.intensity,nt.shadowBias=dt.bias,nt.shadowNormalBias=dt.normalBias,nt.shadowRadius=dt.radius,nt.shadowMapSize=dt.mapSize,nt.shadowCameraNear=dt.camera.near,nt.shadowCameraFar=dt.camera.far,n.pointShadow[_]=nt,n.pointShadowMap[_]=K,n.pointShadowMatrix[_]=C.shadow.matrix,b++}n.point[_]=at,_++}else if(C.isHemisphereLight){const at=t.get(C);at.skyColor.copy(C.color).multiplyScalar(et),at.groundColor.copy(C.groundColor).multiplyScalar(et),n.hemi[f]=at,f++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Pt.LTC_FLOAT_1,n.rectAreaLTC2=Pt.LTC_FLOAT_2):(n.rectAreaLTC1=Pt.LTC_HALF_1,n.rectAreaLTC2=Pt.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=d;const F=n.hash;(F.directionalLength!==p||F.pointLength!==_||F.spotLength!==x||F.rectAreaLength!==m||F.hemiLength!==f||F.numDirectionalShadows!==A||F.numPointShadows!==b||F.numSpotShadows!==v||F.numSpotMaps!==N||F.numLightProbes!==L)&&(n.directional.length=p,n.spot.length=x,n.rectArea.length=m,n.point.length=_,n.hemi.length=f,n.directionalShadow.length=A,n.directionalShadowMap.length=A,n.pointShadow.length=b,n.pointShadowMap.length=b,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=A,n.pointShadowMatrix.length=b,n.spotLightMatrix.length=v+N-P,n.spotLightMap.length=N,n.numSpotLightShadowsWithMaps=P,n.numLightProbes=L,F.directionalLength=p,F.pointLength=_,F.spotLength=x,F.rectAreaLength=m,F.hemiLength=f,F.numDirectionalShadows=A,F.numPointShadows=b,F.numSpotShadows=v,F.numSpotMaps=N,F.numLightProbes=L,n.version=Pm++)}function c(l,u){let h=0,d=0,p=0,_=0,x=0;const m=u.matrixWorldInverse;for(let f=0,A=l.length;f<A;f++){const b=l[f];if(b.isDirectionalLight){const v=n.directional[h];v.direction.setFromMatrixPosition(b.matrixWorld),r.setFromMatrixPosition(b.target.matrixWorld),v.direction.sub(r),v.direction.transformDirection(m),h++}else if(b.isSpotLight){const v=n.spot[p];v.position.setFromMatrixPosition(b.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(b.matrixWorld),r.setFromMatrixPosition(b.target.matrixWorld),v.direction.sub(r),v.direction.transformDirection(m),p++}else if(b.isRectAreaLight){const v=n.rectArea[_];v.position.setFromMatrixPosition(b.matrixWorld),v.position.applyMatrix4(m),o.identity(),s.copy(b.matrixWorld),s.premultiply(m),o.extractRotation(s),v.halfWidth.set(b.width*.5,0,0),v.halfHeight.set(0,b.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),_++}else if(b.isPointLight){const v=n.point[d];v.position.setFromMatrixPosition(b.matrixWorld),v.position.applyMatrix4(m),d++}else if(b.isHemisphereLight){const v=n.hemi[x];v.direction.setFromMatrixPosition(b.matrixWorld),v.direction.transformDirection(m),x++}}}return{setup:a,setupView:c,state:n}}function rl(i){const t=new Dm(i),e=[],n=[];function r(u){l.camera=u,e.length=0,n.length=0}function s(u){e.push(u)}function o(u){n.push(u)}function a(){t.setup(e)}function c(u){t.setupView(e,u)}const l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:r,state:l,setupLights:a,setupLightsView:c,pushLight:s,pushShadow:o}}function Im(i){let t=new WeakMap;function e(r,s=0){const o=t.get(r);let a;return o===void 0?(a=new rl(i),t.set(r,[a])):s>=o.length?(a=new rl(i),o.push(a)):a=o[s],a}function n(){t=new WeakMap}return{get:e,dispose:n}}const Um=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Nm=`uniform sampler2D shadow_pass;
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
}`;function Fm(i,t,e){let n=new Wr;const r=new Tt,s=new Tt,o=new re,a=new rh({depthPacking:Uc}),c=new sh,l={},u=e.maxTextureSize,h={[wn]:Te,[Te]:wn,[ve]:ve},d=new _n({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Tt},radius:{value:4}},vertexShader:Um,fragmentShader:Nm}),p=d.clone();p.defines.HORIZONTAL_PASS=1;const _=new pe;_.setAttribute("position",new Ve(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new He(_,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Nr;let f=this.type;this.render=function(P,L,F){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||P.length===0)return;const S=i.getRenderTarget(),M=i.getActiveCubeFace(),C=i.getActiveMipmapLevel(),tt=i.state;tt.setBlending(Tn),tt.buffers.depth.getReversed()?tt.buffers.color.setClear(0,0,0,0):tt.buffers.color.setClear(1,1,1,1),tt.buffers.depth.setTest(!0),tt.setScissorTest(!1);const et=f!==fn&&this.type===fn,Y=f===fn&&this.type!==fn;for(let K=0,at=P.length;K<at;K++){const dt=P[K],nt=dt.shadow;if(nt===void 0){console.warn("THREE.WebGLShadowMap:",dt,"has no shadow.");continue}if(nt.autoUpdate===!1&&nt.needsUpdate===!1)continue;r.copy(nt.mapSize);const gt=nt.getFrameExtents();if(r.multiply(gt),s.copy(nt.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/gt.x),r.x=s.x*gt.x,nt.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/gt.y),r.y=s.y*gt.y,nt.mapSize.y=s.y)),nt.map===null||et===!0||Y===!0){const ft=this.type!==fn?{minFilter:Fe,magFilter:Fe}:{};nt.map!==null&&nt.map.dispose(),nt.map=new qn(r.x,r.y,ft),nt.map.texture.name=dt.name+".shadowMap",nt.camera.updateProjectionMatrix()}i.setRenderTarget(nt.map),i.clear();const pt=nt.getViewportCount();for(let ft=0;ft<pt;ft++){const vt=nt.getViewport(ft);o.set(s.x*vt.x,s.y*vt.y,s.x*vt.z,s.y*vt.w),tt.viewport(o),nt.updateMatrices(dt,ft),n=nt.getFrustum(),v(L,F,nt.camera,dt,this.type)}nt.isPointLightShadow!==!0&&this.type===fn&&A(nt,F),nt.needsUpdate=!1}f=this.type,m.needsUpdate=!1,i.setRenderTarget(S,M,C)};function A(P,L){const F=t.update(x);d.defines.VSM_SAMPLES!==P.blurSamples&&(d.defines.VSM_SAMPLES=P.blurSamples,p.defines.VSM_SAMPLES=P.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),P.mapPass===null&&(P.mapPass=new qn(r.x,r.y)),d.uniforms.shadow_pass.value=P.map.texture,d.uniforms.resolution.value=P.mapSize,d.uniforms.radius.value=P.radius,i.setRenderTarget(P.mapPass),i.clear(),i.renderBufferDirect(L,null,F,d,x,null),p.uniforms.shadow_pass.value=P.mapPass.texture,p.uniforms.resolution.value=P.mapSize,p.uniforms.radius.value=P.radius,i.setRenderTarget(P.map),i.clear(),i.renderBufferDirect(L,null,F,p,x,null)}function b(P,L,F,S){let M=null;const C=F.isPointLight===!0?P.customDistanceMaterial:P.customDepthMaterial;if(C!==void 0)M=C;else if(M=F.isPointLight===!0?c:a,i.localClippingEnabled&&L.clipShadows===!0&&Array.isArray(L.clippingPlanes)&&L.clippingPlanes.length!==0||L.displacementMap&&L.displacementScale!==0||L.alphaMap&&L.alphaTest>0||L.map&&L.alphaTest>0||L.alphaToCoverage===!0){const tt=M.uuid,et=L.uuid;let Y=l[tt];Y===void 0&&(Y={},l[tt]=Y);let K=Y[et];K===void 0&&(K=M.clone(),Y[et]=K,L.addEventListener("dispose",N)),M=K}if(M.visible=L.visible,M.wireframe=L.wireframe,S===fn?M.side=L.shadowSide!==null?L.shadowSide:L.side:M.side=L.shadowSide!==null?L.shadowSide:h[L.side],M.alphaMap=L.alphaMap,M.alphaTest=L.alphaToCoverage===!0?.5:L.alphaTest,M.map=L.map,M.clipShadows=L.clipShadows,M.clippingPlanes=L.clippingPlanes,M.clipIntersection=L.clipIntersection,M.displacementMap=L.displacementMap,M.displacementScale=L.displacementScale,M.displacementBias=L.displacementBias,M.wireframeLinewidth=L.wireframeLinewidth,M.linewidth=L.linewidth,F.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const tt=i.properties.get(M);tt.light=F}return M}function v(P,L,F,S,M){if(P.visible===!1)return;if(P.layers.test(L.layers)&&(P.isMesh||P.isLine||P.isPoints)&&(P.castShadow||P.receiveShadow&&M===fn)&&(!P.frustumCulled||n.intersectsObject(P))){P.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse,P.matrixWorld);const et=t.update(P),Y=P.material;if(Array.isArray(Y)){const K=et.groups;for(let at=0,dt=K.length;at<dt;at++){const nt=K[at],gt=Y[nt.materialIndex];if(gt&&gt.visible){const pt=b(P,gt,S,M);P.onBeforeShadow(i,P,L,F,et,pt,nt),i.renderBufferDirect(F,null,et,pt,P,nt),P.onAfterShadow(i,P,L,F,et,pt,nt)}}}else if(Y.visible){const K=b(P,Y,S,M);P.onBeforeShadow(i,P,L,F,et,K,null),i.renderBufferDirect(F,null,et,K,P,null),P.onAfterShadow(i,P,L,F,et,K,null)}}const tt=P.children;for(let et=0,Y=tt.length;et<Y;et++)v(tt[et],L,F,S,M)}function N(P){P.target.removeEventListener("dispose",N);for(const F in l){const S=l[F],M=P.target.uuid;M in S&&(S[M].dispose(),delete S[M])}}}const Om={[Fs]:Os,[Bs]:Hs,[ks]:Vs,[Mi]:zs,[Os]:Fs,[Hs]:Bs,[Vs]:ks,[zs]:Mi};function Bm(i,t){function e(){let q=!1;const bt=new re;let wt=null;const Ft=new re(0,0,0,0);return{setMask:function(yt){wt!==yt&&!q&&(i.colorMask(yt,yt,yt,yt),wt=yt)},setLocked:function(yt){q=yt},setClear:function(yt,xt,Bt,qt,ae){ae===!0&&(yt*=qt,xt*=qt,Bt*=qt),bt.set(yt,xt,Bt,qt),Ft.equals(bt)===!1&&(i.clearColor(yt,xt,Bt,qt),Ft.copy(bt))},reset:function(){q=!1,wt=null,Ft.set(-1,0,0,0)}}}function n(){let q=!1,bt=!1,wt=null,Ft=null,yt=null;return{setReversed:function(xt){if(bt!==xt){const Bt=t.get("EXT_clip_control");xt?Bt.clipControlEXT(Bt.LOWER_LEFT_EXT,Bt.ZERO_TO_ONE_EXT):Bt.clipControlEXT(Bt.LOWER_LEFT_EXT,Bt.NEGATIVE_ONE_TO_ONE_EXT),bt=xt;const qt=yt;yt=null,this.setClear(qt)}},getReversed:function(){return bt},setTest:function(xt){xt?H(i.DEPTH_TEST):$(i.DEPTH_TEST)},setMask:function(xt){wt!==xt&&!q&&(i.depthMask(xt),wt=xt)},setFunc:function(xt){if(bt&&(xt=Om[xt]),Ft!==xt){switch(xt){case Fs:i.depthFunc(i.NEVER);break;case Os:i.depthFunc(i.ALWAYS);break;case Bs:i.depthFunc(i.LESS);break;case Mi:i.depthFunc(i.LEQUAL);break;case ks:i.depthFunc(i.EQUAL);break;case zs:i.depthFunc(i.GEQUAL);break;case Hs:i.depthFunc(i.GREATER);break;case Vs:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Ft=xt}},setLocked:function(xt){q=xt},setClear:function(xt){yt!==xt&&(bt&&(xt=1-xt),i.clearDepth(xt),yt=xt)},reset:function(){q=!1,wt=null,Ft=null,yt=null,bt=!1}}}function r(){let q=!1,bt=null,wt=null,Ft=null,yt=null,xt=null,Bt=null,qt=null,ae=null;return{setTest:function(ee){q||(ee?H(i.STENCIL_TEST):$(i.STENCIL_TEST))},setMask:function(ee){bt!==ee&&!q&&(i.stencilMask(ee),bt=ee)},setFunc:function(ee,on,Je){(wt!==ee||Ft!==on||yt!==Je)&&(i.stencilFunc(ee,on,Je),wt=ee,Ft=on,yt=Je)},setOp:function(ee,on,Je){(xt!==ee||Bt!==on||qt!==Je)&&(i.stencilOp(ee,on,Je),xt=ee,Bt=on,qt=Je)},setLocked:function(ee){q=ee},setClear:function(ee){ae!==ee&&(i.clearStencil(ee),ae=ee)},reset:function(){q=!1,bt=null,wt=null,Ft=null,yt=null,xt=null,Bt=null,qt=null,ae=null}}}const s=new e,o=new n,a=new r,c=new WeakMap,l=new WeakMap;let u={},h={},d=new WeakMap,p=[],_=null,x=!1,m=null,f=null,A=null,b=null,v=null,N=null,P=null,L=new Xt(0,0,0),F=0,S=!1,M=null,C=null,tt=null,et=null,Y=null;const K=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let at=!1,dt=0;const nt=i.getParameter(i.VERSION);nt.indexOf("WebGL")!==-1?(dt=parseFloat(/^WebGL (\d)/.exec(nt)[1]),at=dt>=1):nt.indexOf("OpenGL ES")!==-1&&(dt=parseFloat(/^OpenGL ES (\d)/.exec(nt)[1]),at=dt>=2);let gt=null,pt={};const ft=i.getParameter(i.SCISSOR_BOX),vt=i.getParameter(i.VIEWPORT),Mt=new re().fromArray(ft),Rt=new re().fromArray(vt);function st(q,bt,wt,Ft){const yt=new Uint8Array(4),xt=i.createTexture();i.bindTexture(q,xt),i.texParameteri(q,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(q,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Bt=0;Bt<wt;Bt++)q===i.TEXTURE_3D||q===i.TEXTURE_2D_ARRAY?i.texImage3D(bt,0,i.RGBA,1,1,Ft,0,i.RGBA,i.UNSIGNED_BYTE,yt):i.texImage2D(bt+Bt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,yt);return xt}const D={};D[i.TEXTURE_2D]=st(i.TEXTURE_2D,i.TEXTURE_2D,1),D[i.TEXTURE_CUBE_MAP]=st(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),D[i.TEXTURE_2D_ARRAY]=st(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),D[i.TEXTURE_3D]=st(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),H(i.DEPTH_TEST),o.setFunc(Mi),B(!1),O(jo),H(i.CULL_FACE),j(Tn);function H(q){u[q]!==!0&&(i.enable(q),u[q]=!0)}function $(q){u[q]!==!1&&(i.disable(q),u[q]=!1)}function G(q,bt){return h[q]!==bt?(i.bindFramebuffer(q,bt),h[q]=bt,q===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=bt),q===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=bt),!0):!1}function ct(q,bt){let wt=p,Ft=!1;if(q){wt=d.get(bt),wt===void 0&&(wt=[],d.set(bt,wt));const yt=q.textures;if(wt.length!==yt.length||wt[0]!==i.COLOR_ATTACHMENT0){for(let xt=0,Bt=yt.length;xt<Bt;xt++)wt[xt]=i.COLOR_ATTACHMENT0+xt;wt.length=yt.length,Ft=!0}}else wt[0]!==i.BACK&&(wt[0]=i.BACK,Ft=!0);Ft&&i.drawBuffers(wt)}function Z(q){return _!==q?(i.useProgram(q),_=q,!0):!1}const lt={[zn]:i.FUNC_ADD,[ac]:i.FUNC_SUBTRACT,[lc]:i.FUNC_REVERSE_SUBTRACT};lt[cc]=i.MIN,lt[uc]=i.MAX;const w={[hc]:i.ZERO,[fc]:i.ONE,[dc]:i.SRC_COLOR,[Us]:i.SRC_ALPHA,[xc]:i.SRC_ALPHA_SATURATE,[_c]:i.DST_COLOR,[mc]:i.DST_ALPHA,[pc]:i.ONE_MINUS_SRC_COLOR,[Ns]:i.ONE_MINUS_SRC_ALPHA,[vc]:i.ONE_MINUS_DST_COLOR,[gc]:i.ONE_MINUS_DST_ALPHA,[Mc]:i.CONSTANT_COLOR,[Sc]:i.ONE_MINUS_CONSTANT_COLOR,[yc]:i.CONSTANT_ALPHA,[Ec]:i.ONE_MINUS_CONSTANT_ALPHA};function j(q,bt,wt,Ft,yt,xt,Bt,qt,ae,ee){if(q===Tn){x===!0&&($(i.BLEND),x=!1);return}if(x===!1&&(H(i.BLEND),x=!0),q!==oc){if(q!==m||ee!==S){if((f!==zn||v!==zn)&&(i.blendEquation(i.FUNC_ADD),f=zn,v=zn),ee)switch(q){case mi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Qo:i.blendFunc(i.ONE,i.ONE);break;case ta:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case ea:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",q);break}else switch(q){case mi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Qo:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case ta:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case ea:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",q);break}A=null,b=null,N=null,P=null,L.set(0,0,0),F=0,m=q,S=ee}return}yt=yt||bt,xt=xt||wt,Bt=Bt||Ft,(bt!==f||yt!==v)&&(i.blendEquationSeparate(lt[bt],lt[yt]),f=bt,v=yt),(wt!==A||Ft!==b||xt!==N||Bt!==P)&&(i.blendFuncSeparate(w[wt],w[Ft],w[xt],w[Bt]),A=wt,b=Ft,N=xt,P=Bt),(qt.equals(L)===!1||ae!==F)&&(i.blendColor(qt.r,qt.g,qt.b,ae),L.copy(qt),F=ae),m=q,S=!1}function E(q,bt){q.side===ve?$(i.CULL_FACE):H(i.CULL_FACE);let wt=q.side===Te;bt&&(wt=!wt),B(wt),q.blending===mi&&q.transparent===!1?j(Tn):j(q.blending,q.blendEquation,q.blendSrc,q.blendDst,q.blendEquationAlpha,q.blendSrcAlpha,q.blendDstAlpha,q.blendColor,q.blendAlpha,q.premultipliedAlpha),o.setFunc(q.depthFunc),o.setTest(q.depthTest),o.setMask(q.depthWrite),s.setMask(q.colorWrite);const Ft=q.stencilWrite;a.setTest(Ft),Ft&&(a.setMask(q.stencilWriteMask),a.setFunc(q.stencilFunc,q.stencilRef,q.stencilFuncMask),a.setOp(q.stencilFail,q.stencilZFail,q.stencilZPass)),U(q.polygonOffset,q.polygonOffsetFactor,q.polygonOffsetUnits),q.alphaToCoverage===!0?H(i.SAMPLE_ALPHA_TO_COVERAGE):$(i.SAMPLE_ALPHA_TO_COVERAGE)}function B(q){M!==q&&(q?i.frontFace(i.CW):i.frontFace(i.CCW),M=q)}function O(q){q!==ic?(H(i.CULL_FACE),q!==C&&(q===jo?i.cullFace(i.BACK):q===rc?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):$(i.CULL_FACE),C=q}function I(q){q!==tt&&(at&&i.lineWidth(q),tt=q)}function U(q,bt,wt){q?(H(i.POLYGON_OFFSET_FILL),(et!==bt||Y!==wt)&&(i.polygonOffset(bt,wt),et=bt,Y=wt)):$(i.POLYGON_OFFSET_FILL)}function z(q){q?H(i.SCISSOR_TEST):$(i.SCISSOR_TEST)}function W(q){q===void 0&&(q=i.TEXTURE0+K-1),gt!==q&&(i.activeTexture(q),gt=q)}function rt(q,bt,wt){wt===void 0&&(gt===null?wt=i.TEXTURE0+K-1:wt=gt);let Ft=pt[wt];Ft===void 0&&(Ft={type:void 0,texture:void 0},pt[wt]=Ft),(Ft.type!==q||Ft.texture!==bt)&&(gt!==wt&&(i.activeTexture(wt),gt=wt),i.bindTexture(q,bt||D[q]),Ft.type=q,Ft.texture=bt)}function y(){const q=pt[gt];q!==void 0&&q.type!==void 0&&(i.bindTexture(q.type,null),q.type=void 0,q.texture=void 0)}function g(){try{i.compressedTexImage2D(...arguments)}catch(q){console.error("THREE.WebGLState:",q)}}function R(){try{i.compressedTexImage3D(...arguments)}catch(q){console.error("THREE.WebGLState:",q)}}function k(){try{i.texSubImage2D(...arguments)}catch(q){console.error("THREE.WebGLState:",q)}}function J(){try{i.texSubImage3D(...arguments)}catch(q){console.error("THREE.WebGLState:",q)}}function X(){try{i.compressedTexSubImage2D(...arguments)}catch(q){console.error("THREE.WebGLState:",q)}}function mt(){try{i.compressedTexSubImage3D(...arguments)}catch(q){console.error("THREE.WebGLState:",q)}}function _t(){try{i.texStorage2D(...arguments)}catch(q){console.error("THREE.WebGLState:",q)}}function At(){try{i.texStorage3D(...arguments)}catch(q){console.error("THREE.WebGLState:",q)}}function It(){try{i.texImage2D(...arguments)}catch(q){console.error("THREE.WebGLState:",q)}}function St(){try{i.texImage3D(...arguments)}catch(q){console.error("THREE.WebGLState:",q)}}function Ct(q){Mt.equals(q)===!1&&(i.scissor(q.x,q.y,q.z,q.w),Mt.copy(q))}function Gt(q){Rt.equals(q)===!1&&(i.viewport(q.x,q.y,q.z,q.w),Rt.copy(q))}function kt(q,bt){let wt=l.get(bt);wt===void 0&&(wt=new WeakMap,l.set(bt,wt));let Ft=wt.get(q);Ft===void 0&&(Ft=i.getUniformBlockIndex(bt,q.name),wt.set(q,Ft))}function Lt(q,bt){const Ft=l.get(bt).get(q);c.get(bt)!==Ft&&(i.uniformBlockBinding(bt,Ft,q.__bindingPointIndex),c.set(bt,Ft))}function Yt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},gt=null,pt={},h={},d=new WeakMap,p=[],_=null,x=!1,m=null,f=null,A=null,b=null,v=null,N=null,P=null,L=new Xt(0,0,0),F=0,S=!1,M=null,C=null,tt=null,et=null,Y=null,Mt.set(0,0,i.canvas.width,i.canvas.height),Rt.set(0,0,i.canvas.width,i.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:H,disable:$,bindFramebuffer:G,drawBuffers:ct,useProgram:Z,setBlending:j,setMaterial:E,setFlipSided:B,setCullFace:O,setLineWidth:I,setPolygonOffset:U,setScissorTest:z,activeTexture:W,bindTexture:rt,unbindTexture:y,compressedTexImage2D:g,compressedTexImage3D:R,texImage2D:It,texImage3D:St,updateUBOMapping:kt,uniformBlockBinding:Lt,texStorage2D:_t,texStorage3D:At,texSubImage2D:k,texSubImage3D:J,compressedTexSubImage2D:X,compressedTexSubImage3D:mt,scissor:Ct,viewport:Gt,reset:Yt}}function km(i,t,e,n,r,s,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Tt,u=new WeakMap;let h;const d=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(y,g){return p?new OffscreenCanvas(y,g):Br("canvas")}function x(y,g,R){let k=1;const J=rt(y);if((J.width>R||J.height>R)&&(k=R/Math.max(J.width,J.height)),k<1)if(typeof HTMLImageElement<"u"&&y instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&y instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&y instanceof ImageBitmap||typeof VideoFrame<"u"&&y instanceof VideoFrame){const X=Math.floor(k*J.width),mt=Math.floor(k*J.height);h===void 0&&(h=_(X,mt));const _t=g?_(X,mt):h;return _t.width=X,_t.height=mt,_t.getContext("2d").drawImage(y,0,0,X,mt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+X+"x"+mt+")."),_t}else return"data"in y&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),y;return y}function m(y){return y.generateMipmaps}function f(y){i.generateMipmap(y)}function A(y){return y.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:y.isWebGL3DRenderTarget?i.TEXTURE_3D:y.isWebGLArrayRenderTarget||y.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function b(y,g,R,k,J=!1){if(y!==null){if(i[y]!==void 0)return i[y];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+y+"'")}let X=g;if(g===i.RED&&(R===i.FLOAT&&(X=i.R32F),R===i.HALF_FLOAT&&(X=i.R16F),R===i.UNSIGNED_BYTE&&(X=i.R8)),g===i.RED_INTEGER&&(R===i.UNSIGNED_BYTE&&(X=i.R8UI),R===i.UNSIGNED_SHORT&&(X=i.R16UI),R===i.UNSIGNED_INT&&(X=i.R32UI),R===i.BYTE&&(X=i.R8I),R===i.SHORT&&(X=i.R16I),R===i.INT&&(X=i.R32I)),g===i.RG&&(R===i.FLOAT&&(X=i.RG32F),R===i.HALF_FLOAT&&(X=i.RG16F),R===i.UNSIGNED_BYTE&&(X=i.RG8)),g===i.RG_INTEGER&&(R===i.UNSIGNED_BYTE&&(X=i.RG8UI),R===i.UNSIGNED_SHORT&&(X=i.RG16UI),R===i.UNSIGNED_INT&&(X=i.RG32UI),R===i.BYTE&&(X=i.RG8I),R===i.SHORT&&(X=i.RG16I),R===i.INT&&(X=i.RG32I)),g===i.RGB_INTEGER&&(R===i.UNSIGNED_BYTE&&(X=i.RGB8UI),R===i.UNSIGNED_SHORT&&(X=i.RGB16UI),R===i.UNSIGNED_INT&&(X=i.RGB32UI),R===i.BYTE&&(X=i.RGB8I),R===i.SHORT&&(X=i.RGB16I),R===i.INT&&(X=i.RGB32I)),g===i.RGBA_INTEGER&&(R===i.UNSIGNED_BYTE&&(X=i.RGBA8UI),R===i.UNSIGNED_SHORT&&(X=i.RGBA16UI),R===i.UNSIGNED_INT&&(X=i.RGBA32UI),R===i.BYTE&&(X=i.RGBA8I),R===i.SHORT&&(X=i.RGBA16I),R===i.INT&&(X=i.RGBA32I)),g===i.RGB&&R===i.UNSIGNED_INT_5_9_9_9_REV&&(X=i.RGB9_E5),g===i.RGBA){const mt=J?Fr:te.getTransfer(k);R===i.FLOAT&&(X=i.RGBA32F),R===i.HALF_FLOAT&&(X=i.RGBA16F),R===i.UNSIGNED_BYTE&&(X=mt===ie?i.SRGB8_ALPHA8:i.RGBA8),R===i.UNSIGNED_SHORT_4_4_4_4&&(X=i.RGBA4),R===i.UNSIGNED_SHORT_5_5_5_1&&(X=i.RGB5_A1)}return(X===i.R16F||X===i.R32F||X===i.RG16F||X===i.RG32F||X===i.RGBA16F||X===i.RGBA32F)&&t.get("EXT_color_buffer_float"),X}function v(y,g){let R;return y?g===null||g===Xn||g===Xi?R=i.DEPTH24_STENCIL8:g===tn?R=i.DEPTH32F_STENCIL8:g===Wi&&(R=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):g===null||g===Xn||g===Xi?R=i.DEPTH_COMPONENT24:g===tn?R=i.DEPTH_COMPONENT32F:g===Wi&&(R=i.DEPTH_COMPONENT16),R}function N(y,g){return m(y)===!0||y.isFramebufferTexture&&y.minFilter!==Fe&&y.minFilter!==Qe?Math.log2(Math.max(g.width,g.height))+1:y.mipmaps!==void 0&&y.mipmaps.length>0?y.mipmaps.length:y.isCompressedTexture&&Array.isArray(y.image)?g.mipmaps.length:1}function P(y){const g=y.target;g.removeEventListener("dispose",P),F(g),g.isVideoTexture&&u.delete(g)}function L(y){const g=y.target;g.removeEventListener("dispose",L),M(g)}function F(y){const g=n.get(y);if(g.__webglInit===void 0)return;const R=y.source,k=d.get(R);if(k){const J=k[g.__cacheKey];J.usedTimes--,J.usedTimes===0&&S(y),Object.keys(k).length===0&&d.delete(R)}n.remove(y)}function S(y){const g=n.get(y);i.deleteTexture(g.__webglTexture);const R=y.source,k=d.get(R);delete k[g.__cacheKey],o.memory.textures--}function M(y){const g=n.get(y);if(y.depthTexture&&(y.depthTexture.dispose(),n.remove(y.depthTexture)),y.isWebGLCubeRenderTarget)for(let k=0;k<6;k++){if(Array.isArray(g.__webglFramebuffer[k]))for(let J=0;J<g.__webglFramebuffer[k].length;J++)i.deleteFramebuffer(g.__webglFramebuffer[k][J]);else i.deleteFramebuffer(g.__webglFramebuffer[k]);g.__webglDepthbuffer&&i.deleteRenderbuffer(g.__webglDepthbuffer[k])}else{if(Array.isArray(g.__webglFramebuffer))for(let k=0;k<g.__webglFramebuffer.length;k++)i.deleteFramebuffer(g.__webglFramebuffer[k]);else i.deleteFramebuffer(g.__webglFramebuffer);if(g.__webglDepthbuffer&&i.deleteRenderbuffer(g.__webglDepthbuffer),g.__webglMultisampledFramebuffer&&i.deleteFramebuffer(g.__webglMultisampledFramebuffer),g.__webglColorRenderbuffer)for(let k=0;k<g.__webglColorRenderbuffer.length;k++)g.__webglColorRenderbuffer[k]&&i.deleteRenderbuffer(g.__webglColorRenderbuffer[k]);g.__webglDepthRenderbuffer&&i.deleteRenderbuffer(g.__webglDepthRenderbuffer)}const R=y.textures;for(let k=0,J=R.length;k<J;k++){const X=n.get(R[k]);X.__webglTexture&&(i.deleteTexture(X.__webglTexture),o.memory.textures--),n.remove(R[k])}n.remove(y)}let C=0;function tt(){C=0}function et(){const y=C;return y>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+y+" texture units while this GPU supports only "+r.maxTextures),C+=1,y}function Y(y){const g=[];return g.push(y.wrapS),g.push(y.wrapT),g.push(y.wrapR||0),g.push(y.magFilter),g.push(y.minFilter),g.push(y.anisotropy),g.push(y.internalFormat),g.push(y.format),g.push(y.type),g.push(y.generateMipmaps),g.push(y.premultiplyAlpha),g.push(y.flipY),g.push(y.unpackAlignment),g.push(y.colorSpace),g.join()}function K(y,g){const R=n.get(y);if(y.isVideoTexture&&z(y),y.isRenderTargetTexture===!1&&y.isExternalTexture!==!0&&y.version>0&&R.__version!==y.version){const k=y.image;if(k===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(k.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{D(R,y,g);return}}else y.isExternalTexture&&(R.__webglTexture=y.sourceTexture?y.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,R.__webglTexture,i.TEXTURE0+g)}function at(y,g){const R=n.get(y);if(y.isRenderTargetTexture===!1&&y.version>0&&R.__version!==y.version){D(R,y,g);return}e.bindTexture(i.TEXTURE_2D_ARRAY,R.__webglTexture,i.TEXTURE0+g)}function dt(y,g){const R=n.get(y);if(y.isRenderTargetTexture===!1&&y.version>0&&R.__version!==y.version){D(R,y,g);return}e.bindTexture(i.TEXTURE_3D,R.__webglTexture,i.TEXTURE0+g)}function nt(y,g){const R=n.get(y);if(y.version>0&&R.__version!==y.version){H(R,y,g);return}e.bindTexture(i.TEXTURE_CUBE_MAP,R.__webglTexture,i.TEXTURE0+g)}const gt={[Gi]:i.REPEAT,[Vn]:i.CLAMP_TO_EDGE,[Xs]:i.MIRRORED_REPEAT},pt={[Fe]:i.NEAREST,[Dc]:i.NEAREST_MIPMAP_NEAREST,[nr]:i.NEAREST_MIPMAP_LINEAR,[Qe]:i.LINEAR,[Zr]:i.LINEAR_MIPMAP_NEAREST,[Gn]:i.LINEAR_MIPMAP_LINEAR},ft={[Fc]:i.NEVER,[Vc]:i.ALWAYS,[Oc]:i.LESS,[yl]:i.LEQUAL,[Bc]:i.EQUAL,[Hc]:i.GEQUAL,[kc]:i.GREATER,[zc]:i.NOTEQUAL};function vt(y,g){if(g.type===tn&&t.has("OES_texture_float_linear")===!1&&(g.magFilter===Qe||g.magFilter===Zr||g.magFilter===nr||g.magFilter===Gn||g.minFilter===Qe||g.minFilter===Zr||g.minFilter===nr||g.minFilter===Gn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(y,i.TEXTURE_WRAP_S,gt[g.wrapS]),i.texParameteri(y,i.TEXTURE_WRAP_T,gt[g.wrapT]),(y===i.TEXTURE_3D||y===i.TEXTURE_2D_ARRAY)&&i.texParameteri(y,i.TEXTURE_WRAP_R,gt[g.wrapR]),i.texParameteri(y,i.TEXTURE_MAG_FILTER,pt[g.magFilter]),i.texParameteri(y,i.TEXTURE_MIN_FILTER,pt[g.minFilter]),g.compareFunction&&(i.texParameteri(y,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(y,i.TEXTURE_COMPARE_FUNC,ft[g.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(g.magFilter===Fe||g.minFilter!==nr&&g.minFilter!==Gn||g.type===tn&&t.has("OES_texture_float_linear")===!1)return;if(g.anisotropy>1||n.get(g).__currentAnisotropy){const R=t.get("EXT_texture_filter_anisotropic");i.texParameterf(y,R.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(g.anisotropy,r.getMaxAnisotropy())),n.get(g).__currentAnisotropy=g.anisotropy}}}function Mt(y,g){let R=!1;y.__webglInit===void 0&&(y.__webglInit=!0,g.addEventListener("dispose",P));const k=g.source;let J=d.get(k);J===void 0&&(J={},d.set(k,J));const X=Y(g);if(X!==y.__cacheKey){J[X]===void 0&&(J[X]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,R=!0),J[X].usedTimes++;const mt=J[y.__cacheKey];mt!==void 0&&(J[y.__cacheKey].usedTimes--,mt.usedTimes===0&&S(g)),y.__cacheKey=X,y.__webglTexture=J[X].texture}return R}function Rt(y,g,R){return Math.floor(Math.floor(y/R)/g)}function st(y,g,R,k){const X=y.updateRanges;if(X.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,g.width,g.height,R,k,g.data);else{X.sort((St,Ct)=>St.start-Ct.start);let mt=0;for(let St=1;St<X.length;St++){const Ct=X[mt],Gt=X[St],kt=Ct.start+Ct.count,Lt=Rt(Gt.start,g.width,4),Yt=Rt(Ct.start,g.width,4);Gt.start<=kt+1&&Lt===Yt&&Rt(Gt.start+Gt.count-1,g.width,4)===Lt?Ct.count=Math.max(Ct.count,Gt.start+Gt.count-Ct.start):(++mt,X[mt]=Gt)}X.length=mt+1;const _t=i.getParameter(i.UNPACK_ROW_LENGTH),At=i.getParameter(i.UNPACK_SKIP_PIXELS),It=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,g.width);for(let St=0,Ct=X.length;St<Ct;St++){const Gt=X[St],kt=Math.floor(Gt.start/4),Lt=Math.ceil(Gt.count/4),Yt=kt%g.width,q=Math.floor(kt/g.width),bt=Lt,wt=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,Yt),i.pixelStorei(i.UNPACK_SKIP_ROWS,q),e.texSubImage2D(i.TEXTURE_2D,0,Yt,q,bt,wt,R,k,g.data)}y.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,_t),i.pixelStorei(i.UNPACK_SKIP_PIXELS,At),i.pixelStorei(i.UNPACK_SKIP_ROWS,It)}}function D(y,g,R){let k=i.TEXTURE_2D;(g.isDataArrayTexture||g.isCompressedArrayTexture)&&(k=i.TEXTURE_2D_ARRAY),g.isData3DTexture&&(k=i.TEXTURE_3D);const J=Mt(y,g),X=g.source;e.bindTexture(k,y.__webglTexture,i.TEXTURE0+R);const mt=n.get(X);if(X.version!==mt.__version||J===!0){e.activeTexture(i.TEXTURE0+R);const _t=te.getPrimaries(te.workingColorSpace),At=g.colorSpace===pn?null:te.getPrimaries(g.colorSpace),It=g.colorSpace===pn||_t===At?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,g.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,g.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,It);let St=x(g.image,!1,r.maxTextureSize);St=W(g,St);const Ct=s.convert(g.format,g.colorSpace),Gt=s.convert(g.type);let kt=b(g.internalFormat,Ct,Gt,g.colorSpace,g.isVideoTexture);vt(k,g);let Lt;const Yt=g.mipmaps,q=g.isVideoTexture!==!0,bt=mt.__version===void 0||J===!0,wt=X.dataReady,Ft=N(g,St);if(g.isDepthTexture)kt=v(g.format===Yi,g.type),bt&&(q?e.texStorage2D(i.TEXTURE_2D,1,kt,St.width,St.height):e.texImage2D(i.TEXTURE_2D,0,kt,St.width,St.height,0,Ct,Gt,null));else if(g.isDataTexture)if(Yt.length>0){q&&bt&&e.texStorage2D(i.TEXTURE_2D,Ft,kt,Yt[0].width,Yt[0].height);for(let yt=0,xt=Yt.length;yt<xt;yt++)Lt=Yt[yt],q?wt&&e.texSubImage2D(i.TEXTURE_2D,yt,0,0,Lt.width,Lt.height,Ct,Gt,Lt.data):e.texImage2D(i.TEXTURE_2D,yt,kt,Lt.width,Lt.height,0,Ct,Gt,Lt.data);g.generateMipmaps=!1}else q?(bt&&e.texStorage2D(i.TEXTURE_2D,Ft,kt,St.width,St.height),wt&&st(g,St,Ct,Gt)):e.texImage2D(i.TEXTURE_2D,0,kt,St.width,St.height,0,Ct,Gt,St.data);else if(g.isCompressedTexture)if(g.isCompressedArrayTexture){q&&bt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Ft,kt,Yt[0].width,Yt[0].height,St.depth);for(let yt=0,xt=Yt.length;yt<xt;yt++)if(Lt=Yt[yt],g.format!==Ke)if(Ct!==null)if(q){if(wt)if(g.layerUpdates.size>0){const Bt=Ua(Lt.width,Lt.height,g.format,g.type);for(const qt of g.layerUpdates){const ae=Lt.data.subarray(qt*Bt/Lt.data.BYTES_PER_ELEMENT,(qt+1)*Bt/Lt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,yt,0,0,qt,Lt.width,Lt.height,1,Ct,ae)}g.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,yt,0,0,0,Lt.width,Lt.height,St.depth,Ct,Lt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,yt,kt,Lt.width,Lt.height,St.depth,0,Lt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else q?wt&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,yt,0,0,0,Lt.width,Lt.height,St.depth,Ct,Gt,Lt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,yt,kt,Lt.width,Lt.height,St.depth,0,Ct,Gt,Lt.data)}else{q&&bt&&e.texStorage2D(i.TEXTURE_2D,Ft,kt,Yt[0].width,Yt[0].height);for(let yt=0,xt=Yt.length;yt<xt;yt++)Lt=Yt[yt],g.format!==Ke?Ct!==null?q?wt&&e.compressedTexSubImage2D(i.TEXTURE_2D,yt,0,0,Lt.width,Lt.height,Ct,Lt.data):e.compressedTexImage2D(i.TEXTURE_2D,yt,kt,Lt.width,Lt.height,0,Lt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):q?wt&&e.texSubImage2D(i.TEXTURE_2D,yt,0,0,Lt.width,Lt.height,Ct,Gt,Lt.data):e.texImage2D(i.TEXTURE_2D,yt,kt,Lt.width,Lt.height,0,Ct,Gt,Lt.data)}else if(g.isDataArrayTexture)if(q){if(bt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Ft,kt,St.width,St.height,St.depth),wt)if(g.layerUpdates.size>0){const yt=Ua(St.width,St.height,g.format,g.type);for(const xt of g.layerUpdates){const Bt=St.data.subarray(xt*yt/St.data.BYTES_PER_ELEMENT,(xt+1)*yt/St.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,xt,St.width,St.height,1,Ct,Gt,Bt)}g.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,St.width,St.height,St.depth,Ct,Gt,St.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,kt,St.width,St.height,St.depth,0,Ct,Gt,St.data);else if(g.isData3DTexture)q?(bt&&e.texStorage3D(i.TEXTURE_3D,Ft,kt,St.width,St.height,St.depth),wt&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,St.width,St.height,St.depth,Ct,Gt,St.data)):e.texImage3D(i.TEXTURE_3D,0,kt,St.width,St.height,St.depth,0,Ct,Gt,St.data);else if(g.isFramebufferTexture){if(bt)if(q)e.texStorage2D(i.TEXTURE_2D,Ft,kt,St.width,St.height);else{let yt=St.width,xt=St.height;for(let Bt=0;Bt<Ft;Bt++)e.texImage2D(i.TEXTURE_2D,Bt,kt,yt,xt,0,Ct,Gt,null),yt>>=1,xt>>=1}}else if(Yt.length>0){if(q&&bt){const yt=rt(Yt[0]);e.texStorage2D(i.TEXTURE_2D,Ft,kt,yt.width,yt.height)}for(let yt=0,xt=Yt.length;yt<xt;yt++)Lt=Yt[yt],q?wt&&e.texSubImage2D(i.TEXTURE_2D,yt,0,0,Ct,Gt,Lt):e.texImage2D(i.TEXTURE_2D,yt,kt,Ct,Gt,Lt);g.generateMipmaps=!1}else if(q){if(bt){const yt=rt(St);e.texStorage2D(i.TEXTURE_2D,Ft,kt,yt.width,yt.height)}wt&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,Ct,Gt,St)}else e.texImage2D(i.TEXTURE_2D,0,kt,Ct,Gt,St);m(g)&&f(k),mt.__version=X.version,g.onUpdate&&g.onUpdate(g)}y.__version=g.version}function H(y,g,R){if(g.image.length!==6)return;const k=Mt(y,g),J=g.source;e.bindTexture(i.TEXTURE_CUBE_MAP,y.__webglTexture,i.TEXTURE0+R);const X=n.get(J);if(J.version!==X.__version||k===!0){e.activeTexture(i.TEXTURE0+R);const mt=te.getPrimaries(te.workingColorSpace),_t=g.colorSpace===pn?null:te.getPrimaries(g.colorSpace),At=g.colorSpace===pn||mt===_t?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,g.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,g.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,At);const It=g.isCompressedTexture||g.image[0].isCompressedTexture,St=g.image[0]&&g.image[0].isDataTexture,Ct=[];for(let xt=0;xt<6;xt++)!It&&!St?Ct[xt]=x(g.image[xt],!0,r.maxCubemapSize):Ct[xt]=St?g.image[xt].image:g.image[xt],Ct[xt]=W(g,Ct[xt]);const Gt=Ct[0],kt=s.convert(g.format,g.colorSpace),Lt=s.convert(g.type),Yt=b(g.internalFormat,kt,Lt,g.colorSpace),q=g.isVideoTexture!==!0,bt=X.__version===void 0||k===!0,wt=J.dataReady;let Ft=N(g,Gt);vt(i.TEXTURE_CUBE_MAP,g);let yt;if(It){q&&bt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,Ft,Yt,Gt.width,Gt.height);for(let xt=0;xt<6;xt++){yt=Ct[xt].mipmaps;for(let Bt=0;Bt<yt.length;Bt++){const qt=yt[Bt];g.format!==Ke?kt!==null?q?wt&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xt,Bt,0,0,qt.width,qt.height,kt,qt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xt,Bt,Yt,qt.width,qt.height,0,qt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):q?wt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xt,Bt,0,0,qt.width,qt.height,kt,Lt,qt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xt,Bt,Yt,qt.width,qt.height,0,kt,Lt,qt.data)}}}else{if(yt=g.mipmaps,q&&bt){yt.length>0&&Ft++;const xt=rt(Ct[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,Ft,Yt,xt.width,xt.height)}for(let xt=0;xt<6;xt++)if(St){q?wt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xt,0,0,0,Ct[xt].width,Ct[xt].height,kt,Lt,Ct[xt].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xt,0,Yt,Ct[xt].width,Ct[xt].height,0,kt,Lt,Ct[xt].data);for(let Bt=0;Bt<yt.length;Bt++){const ae=yt[Bt].image[xt].image;q?wt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xt,Bt+1,0,0,ae.width,ae.height,kt,Lt,ae.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xt,Bt+1,Yt,ae.width,ae.height,0,kt,Lt,ae.data)}}else{q?wt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xt,0,0,0,kt,Lt,Ct[xt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xt,0,Yt,kt,Lt,Ct[xt]);for(let Bt=0;Bt<yt.length;Bt++){const qt=yt[Bt];q?wt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xt,Bt+1,0,0,kt,Lt,qt.image[xt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xt,Bt+1,Yt,kt,Lt,qt.image[xt])}}}m(g)&&f(i.TEXTURE_CUBE_MAP),X.__version=J.version,g.onUpdate&&g.onUpdate(g)}y.__version=g.version}function $(y,g,R,k,J,X){const mt=s.convert(R.format,R.colorSpace),_t=s.convert(R.type),At=b(R.internalFormat,mt,_t,R.colorSpace),It=n.get(g),St=n.get(R);if(St.__renderTarget=g,!It.__hasExternalTextures){const Ct=Math.max(1,g.width>>X),Gt=Math.max(1,g.height>>X);J===i.TEXTURE_3D||J===i.TEXTURE_2D_ARRAY?e.texImage3D(J,X,At,Ct,Gt,g.depth,0,mt,_t,null):e.texImage2D(J,X,At,Ct,Gt,0,mt,_t,null)}e.bindFramebuffer(i.FRAMEBUFFER,y),U(g)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,k,J,St.__webglTexture,0,I(g)):(J===i.TEXTURE_2D||J>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,k,J,St.__webglTexture,X),e.bindFramebuffer(i.FRAMEBUFFER,null)}function G(y,g,R){if(i.bindRenderbuffer(i.RENDERBUFFER,y),g.depthBuffer){const k=g.depthTexture,J=k&&k.isDepthTexture?k.type:null,X=v(g.stencilBuffer,J),mt=g.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,_t=I(g);U(g)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,_t,X,g.width,g.height):R?i.renderbufferStorageMultisample(i.RENDERBUFFER,_t,X,g.width,g.height):i.renderbufferStorage(i.RENDERBUFFER,X,g.width,g.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,mt,i.RENDERBUFFER,y)}else{const k=g.textures;for(let J=0;J<k.length;J++){const X=k[J],mt=s.convert(X.format,X.colorSpace),_t=s.convert(X.type),At=b(X.internalFormat,mt,_t,X.colorSpace),It=I(g);R&&U(g)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,It,At,g.width,g.height):U(g)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,It,At,g.width,g.height):i.renderbufferStorage(i.RENDERBUFFER,At,g.width,g.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ct(y,g){if(g&&g.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,y),!(g.depthTexture&&g.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const k=n.get(g.depthTexture);k.__renderTarget=g,(!k.__webglTexture||g.depthTexture.image.width!==g.width||g.depthTexture.image.height!==g.height)&&(g.depthTexture.image.width=g.width,g.depthTexture.image.height=g.height,g.depthTexture.needsUpdate=!0),K(g.depthTexture,0);const J=k.__webglTexture,X=I(g);if(g.depthTexture.format===qi)U(g)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,J,0,X):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,J,0);else if(g.depthTexture.format===Yi)U(g)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,J,0,X):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,J,0);else throw new Error("Unknown depthTexture format")}function Z(y){const g=n.get(y),R=y.isWebGLCubeRenderTarget===!0;if(g.__boundDepthTexture!==y.depthTexture){const k=y.depthTexture;if(g.__depthDisposeCallback&&g.__depthDisposeCallback(),k){const J=()=>{delete g.__boundDepthTexture,delete g.__depthDisposeCallback,k.removeEventListener("dispose",J)};k.addEventListener("dispose",J),g.__depthDisposeCallback=J}g.__boundDepthTexture=k}if(y.depthTexture&&!g.__autoAllocateDepthBuffer){if(R)throw new Error("target.depthTexture not supported in Cube render targets");const k=y.texture.mipmaps;k&&k.length>0?ct(g.__webglFramebuffer[0],y):ct(g.__webglFramebuffer,y)}else if(R){g.__webglDepthbuffer=[];for(let k=0;k<6;k++)if(e.bindFramebuffer(i.FRAMEBUFFER,g.__webglFramebuffer[k]),g.__webglDepthbuffer[k]===void 0)g.__webglDepthbuffer[k]=i.createRenderbuffer(),G(g.__webglDepthbuffer[k],y,!1);else{const J=y.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,X=g.__webglDepthbuffer[k];i.bindRenderbuffer(i.RENDERBUFFER,X),i.framebufferRenderbuffer(i.FRAMEBUFFER,J,i.RENDERBUFFER,X)}}else{const k=y.texture.mipmaps;if(k&&k.length>0?e.bindFramebuffer(i.FRAMEBUFFER,g.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,g.__webglFramebuffer),g.__webglDepthbuffer===void 0)g.__webglDepthbuffer=i.createRenderbuffer(),G(g.__webglDepthbuffer,y,!1);else{const J=y.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,X=g.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,X),i.framebufferRenderbuffer(i.FRAMEBUFFER,J,i.RENDERBUFFER,X)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function lt(y,g,R){const k=n.get(y);g!==void 0&&$(k.__webglFramebuffer,y,y.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),R!==void 0&&Z(y)}function w(y){const g=y.texture,R=n.get(y),k=n.get(g);y.addEventListener("dispose",L);const J=y.textures,X=y.isWebGLCubeRenderTarget===!0,mt=J.length>1;if(mt||(k.__webglTexture===void 0&&(k.__webglTexture=i.createTexture()),k.__version=g.version,o.memory.textures++),X){R.__webglFramebuffer=[];for(let _t=0;_t<6;_t++)if(g.mipmaps&&g.mipmaps.length>0){R.__webglFramebuffer[_t]=[];for(let At=0;At<g.mipmaps.length;At++)R.__webglFramebuffer[_t][At]=i.createFramebuffer()}else R.__webglFramebuffer[_t]=i.createFramebuffer()}else{if(g.mipmaps&&g.mipmaps.length>0){R.__webglFramebuffer=[];for(let _t=0;_t<g.mipmaps.length;_t++)R.__webglFramebuffer[_t]=i.createFramebuffer()}else R.__webglFramebuffer=i.createFramebuffer();if(mt)for(let _t=0,At=J.length;_t<At;_t++){const It=n.get(J[_t]);It.__webglTexture===void 0&&(It.__webglTexture=i.createTexture(),o.memory.textures++)}if(y.samples>0&&U(y)===!1){R.__webglMultisampledFramebuffer=i.createFramebuffer(),R.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,R.__webglMultisampledFramebuffer);for(let _t=0;_t<J.length;_t++){const At=J[_t];R.__webglColorRenderbuffer[_t]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,R.__webglColorRenderbuffer[_t]);const It=s.convert(At.format,At.colorSpace),St=s.convert(At.type),Ct=b(At.internalFormat,It,St,At.colorSpace,y.isXRRenderTarget===!0),Gt=I(y);i.renderbufferStorageMultisample(i.RENDERBUFFER,Gt,Ct,y.width,y.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+_t,i.RENDERBUFFER,R.__webglColorRenderbuffer[_t])}i.bindRenderbuffer(i.RENDERBUFFER,null),y.depthBuffer&&(R.__webglDepthRenderbuffer=i.createRenderbuffer(),G(R.__webglDepthRenderbuffer,y,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(X){e.bindTexture(i.TEXTURE_CUBE_MAP,k.__webglTexture),vt(i.TEXTURE_CUBE_MAP,g);for(let _t=0;_t<6;_t++)if(g.mipmaps&&g.mipmaps.length>0)for(let At=0;At<g.mipmaps.length;At++)$(R.__webglFramebuffer[_t][At],y,g,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+_t,At);else $(R.__webglFramebuffer[_t],y,g,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+_t,0);m(g)&&f(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(mt){for(let _t=0,At=J.length;_t<At;_t++){const It=J[_t],St=n.get(It);let Ct=i.TEXTURE_2D;(y.isWebGL3DRenderTarget||y.isWebGLArrayRenderTarget)&&(Ct=y.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(Ct,St.__webglTexture),vt(Ct,It),$(R.__webglFramebuffer,y,It,i.COLOR_ATTACHMENT0+_t,Ct,0),m(It)&&f(Ct)}e.unbindTexture()}else{let _t=i.TEXTURE_2D;if((y.isWebGL3DRenderTarget||y.isWebGLArrayRenderTarget)&&(_t=y.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(_t,k.__webglTexture),vt(_t,g),g.mipmaps&&g.mipmaps.length>0)for(let At=0;At<g.mipmaps.length;At++)$(R.__webglFramebuffer[At],y,g,i.COLOR_ATTACHMENT0,_t,At);else $(R.__webglFramebuffer,y,g,i.COLOR_ATTACHMENT0,_t,0);m(g)&&f(_t),e.unbindTexture()}y.depthBuffer&&Z(y)}function j(y){const g=y.textures;for(let R=0,k=g.length;R<k;R++){const J=g[R];if(m(J)){const X=A(y),mt=n.get(J).__webglTexture;e.bindTexture(X,mt),f(X),e.unbindTexture()}}}const E=[],B=[];function O(y){if(y.samples>0){if(U(y)===!1){const g=y.textures,R=y.width,k=y.height;let J=i.COLOR_BUFFER_BIT;const X=y.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,mt=n.get(y),_t=g.length>1;if(_t)for(let It=0;It<g.length;It++)e.bindFramebuffer(i.FRAMEBUFFER,mt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+It,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,mt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+It,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,mt.__webglMultisampledFramebuffer);const At=y.texture.mipmaps;At&&At.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,mt.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,mt.__webglFramebuffer);for(let It=0;It<g.length;It++){if(y.resolveDepthBuffer&&(y.depthBuffer&&(J|=i.DEPTH_BUFFER_BIT),y.stencilBuffer&&y.resolveStencilBuffer&&(J|=i.STENCIL_BUFFER_BIT)),_t){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,mt.__webglColorRenderbuffer[It]);const St=n.get(g[It]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,St,0)}i.blitFramebuffer(0,0,R,k,0,0,R,k,J,i.NEAREST),c===!0&&(E.length=0,B.length=0,E.push(i.COLOR_ATTACHMENT0+It),y.depthBuffer&&y.resolveDepthBuffer===!1&&(E.push(X),B.push(X),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,B)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,E))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),_t)for(let It=0;It<g.length;It++){e.bindFramebuffer(i.FRAMEBUFFER,mt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+It,i.RENDERBUFFER,mt.__webglColorRenderbuffer[It]);const St=n.get(g[It]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,mt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+It,i.TEXTURE_2D,St,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,mt.__webglMultisampledFramebuffer)}else if(y.depthBuffer&&y.resolveDepthBuffer===!1&&c){const g=y.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[g])}}}function I(y){return Math.min(r.maxSamples,y.samples)}function U(y){const g=n.get(y);return y.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&g.__useRenderToTexture!==!1}function z(y){const g=o.render.frame;u.get(y)!==g&&(u.set(y,g),y.update())}function W(y,g){const R=y.colorSpace,k=y.format,J=y.type;return y.isCompressedTexture===!0||y.isVideoTexture===!0||R!==Ei&&R!==pn&&(te.getTransfer(R)===ie?(k!==Ke||J!==rn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",R)),g}function rt(y){return typeof HTMLImageElement<"u"&&y instanceof HTMLImageElement?(l.width=y.naturalWidth||y.width,l.height=y.naturalHeight||y.height):typeof VideoFrame<"u"&&y instanceof VideoFrame?(l.width=y.displayWidth,l.height=y.displayHeight):(l.width=y.width,l.height=y.height),l}this.allocateTextureUnit=et,this.resetTextureUnits=tt,this.setTexture2D=K,this.setTexture2DArray=at,this.setTexture3D=dt,this.setTextureCube=nt,this.rebindTextures=lt,this.setupRenderTarget=w,this.updateRenderTargetMipmap=j,this.updateMultisampleRenderTarget=O,this.setupDepthRenderbuffer=Z,this.setupFrameBufferTexture=$,this.useMultisampledRTT=U}function zm(i,t){function e(n,r=pn){let s;const o=te.getTransfer(r);if(n===rn)return i.UNSIGNED_BYTE;if(n===Co)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Po)return i.UNSIGNED_SHORT_5_5_5_1;if(n===gl)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===pl)return i.BYTE;if(n===ml)return i.SHORT;if(n===Wi)return i.UNSIGNED_SHORT;if(n===Ro)return i.INT;if(n===Xn)return i.UNSIGNED_INT;if(n===tn)return i.FLOAT;if(n===$i)return i.HALF_FLOAT;if(n===_l)return i.ALPHA;if(n===vl)return i.RGB;if(n===Ke)return i.RGBA;if(n===qi)return i.DEPTH_COMPONENT;if(n===Yi)return i.DEPTH_STENCIL;if(n===Lo)return i.RED;if(n===Do)return i.RED_INTEGER;if(n===xl)return i.RG;if(n===Io)return i.RG_INTEGER;if(n===Uo)return i.RGBA_INTEGER;if(n===Cr||n===Pr||n===Lr||n===Dr)if(o===ie)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Cr)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Pr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Lr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Dr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Cr)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Pr)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Lr)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Dr)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===qs||n===Ys||n===Zs||n===Ks)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===qs)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ys)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Zs)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ks)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Js||n===$s||n===js)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Js||n===$s)return o===ie?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===js)return o===ie?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Qs||n===to||n===eo||n===no||n===io||n===ro||n===so||n===oo||n===ao||n===lo||n===co||n===uo||n===ho||n===fo)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Qs)return o===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===to)return o===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===eo)return o===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===no)return o===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===io)return o===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ro)return o===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===so)return o===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===oo)return o===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===ao)return o===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===lo)return o===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===co)return o===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===uo)return o===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ho)return o===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===fo)return o===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ir||n===po||n===mo)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(n===Ir)return o===ie?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===po)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===mo)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Ml||n===go||n===_o||n===vo)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(n===Ir)return s.COMPRESSED_RED_RGTC1_EXT;if(n===go)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===_o)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===vo)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Xi?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}class Kl extends ye{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}}const Hm=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Vm=`
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

}`;class Gm{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new Kl(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new _n({vertexShader:Hm,fragmentShader:Vm,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new He(new Jn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Wm extends Ai{constructor(t,e){super();const n=this;let r=null,s=1,o=null,a="local-floor",c=1,l=null,u=null,h=null,d=null,p=null,_=null;const x=new Gm,m={},f=e.getContextAttributes();let A=null,b=null;const v=[],N=[],P=new Tt;let L=null;const F=new Ne;F.viewport=new re;const S=new Ne;S.viewport=new re;const M=[F,S],C=new uh;let tt=null,et=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(st){let D=v[st];return D===void 0&&(D=new _s,v[st]=D),D.getTargetRaySpace()},this.getControllerGrip=function(st){let D=v[st];return D===void 0&&(D=new _s,v[st]=D),D.getGripSpace()},this.getHand=function(st){let D=v[st];return D===void 0&&(D=new _s,v[st]=D),D.getHandSpace()};function Y(st){const D=N.indexOf(st.inputSource);if(D===-1)return;const H=v[D];H!==void 0&&(H.update(st.inputSource,st.frame,l||o),H.dispatchEvent({type:st.type,data:st.inputSource}))}function K(){r.removeEventListener("select",Y),r.removeEventListener("selectstart",Y),r.removeEventListener("selectend",Y),r.removeEventListener("squeeze",Y),r.removeEventListener("squeezestart",Y),r.removeEventListener("squeezeend",Y),r.removeEventListener("end",K),r.removeEventListener("inputsourceschange",at);for(let st=0;st<v.length;st++){const D=N[st];D!==null&&(N[st]=null,v[st].disconnect(D))}tt=null,et=null,x.reset();for(const st in m)delete m[st];t.setRenderTarget(A),p=null,d=null,h=null,r=null,b=null,Rt.stop(),n.isPresenting=!1,t.setPixelRatio(L),t.setSize(P.width,P.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(st){s=st,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(st){a=st,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(st){l=st},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return h},this.getFrame=function(){return _},this.getSession=function(){return r},this.setSession=async function(st){if(r=st,r!==null){if(A=t.getRenderTarget(),r.addEventListener("select",Y),r.addEventListener("selectstart",Y),r.addEventListener("selectend",Y),r.addEventListener("squeeze",Y),r.addEventListener("squeezestart",Y),r.addEventListener("squeezeend",Y),r.addEventListener("end",K),r.addEventListener("inputsourceschange",at),f.xrCompatible!==!0&&await e.makeXRCompatible(),L=t.getPixelRatio(),t.getSize(P),typeof XRWebGLBinding<"u"&&(h=new XRWebGLBinding(r,e)),h!==null&&"createProjectionLayer"in XRWebGLBinding.prototype){let H=null,$=null,G=null;f.depth&&(G=f.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,H=f.stencil?Yi:qi,$=f.stencil?Xi:Xn);const ct={colorFormat:e.RGBA8,depthFormat:G,scaleFactor:s};d=h.createProjectionLayer(ct),r.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),b=new qn(d.textureWidth,d.textureHeight,{format:Ke,type:rn,depthTexture:new Dl(d.textureWidth,d.textureHeight,$,void 0,void 0,void 0,void 0,void 0,void 0,H),stencilBuffer:f.stencil,colorSpace:t.outputColorSpace,samples:f.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const H={antialias:f.antialias,alpha:!0,depth:f.depth,stencil:f.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,e,H),r.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),b=new qn(p.framebufferWidth,p.framebufferHeight,{format:Ke,type:rn,colorSpace:t.outputColorSpace,stencilBuffer:f.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await r.requestReferenceSpace(a),Rt.setContext(r),Rt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function at(st){for(let D=0;D<st.removed.length;D++){const H=st.removed[D],$=N.indexOf(H);$>=0&&(N[$]=null,v[$].disconnect(H))}for(let D=0;D<st.added.length;D++){const H=st.added[D];let $=N.indexOf(H);if($===-1){for(let ct=0;ct<v.length;ct++)if(ct>=N.length){N.push(H),$=ct;break}else if(N[ct]===null){N[ct]=H,$=ct;break}if($===-1)break}const G=v[$];G&&G.connect(H)}}const dt=new V,nt=new V;function gt(st,D,H){dt.setFromMatrixPosition(D.matrixWorld),nt.setFromMatrixPosition(H.matrixWorld);const $=dt.distanceTo(nt),G=D.projectionMatrix.elements,ct=H.projectionMatrix.elements,Z=G[14]/(G[10]-1),lt=G[14]/(G[10]+1),w=(G[9]+1)/G[5],j=(G[9]-1)/G[5],E=(G[8]-1)/G[0],B=(ct[8]+1)/ct[0],O=Z*E,I=Z*B,U=$/(-E+B),z=U*-E;if(D.matrixWorld.decompose(st.position,st.quaternion,st.scale),st.translateX(z),st.translateZ(U),st.matrixWorld.compose(st.position,st.quaternion,st.scale),st.matrixWorldInverse.copy(st.matrixWorld).invert(),G[10]===-1)st.projectionMatrix.copy(D.projectionMatrix),st.projectionMatrixInverse.copy(D.projectionMatrixInverse);else{const W=Z+U,rt=lt+U,y=O-z,g=I+($-z),R=w*lt/rt*W,k=j*lt/rt*W;st.projectionMatrix.makePerspective(y,g,R,k,W,rt),st.projectionMatrixInverse.copy(st.projectionMatrix).invert()}}function pt(st,D){D===null?st.matrixWorld.copy(st.matrix):st.matrixWorld.multiplyMatrices(D.matrixWorld,st.matrix),st.matrixWorldInverse.copy(st.matrixWorld).invert()}this.updateCamera=function(st){if(r===null)return;let D=st.near,H=st.far;x.texture!==null&&(x.depthNear>0&&(D=x.depthNear),x.depthFar>0&&(H=x.depthFar)),C.near=S.near=F.near=D,C.far=S.far=F.far=H,(tt!==C.near||et!==C.far)&&(r.updateRenderState({depthNear:C.near,depthFar:C.far}),tt=C.near,et=C.far),C.layers.mask=st.layers.mask|6,F.layers.mask=C.layers.mask&3,S.layers.mask=C.layers.mask&5;const $=st.parent,G=C.cameras;pt(C,$);for(let ct=0;ct<G.length;ct++)pt(G[ct],$);G.length===2?gt(C,F,S):C.projectionMatrix.copy(F.projectionMatrix),ft(st,C,$)};function ft(st,D,H){H===null?st.matrix.copy(D.matrixWorld):(st.matrix.copy(H.matrixWorld),st.matrix.invert(),st.matrix.multiply(D.matrixWorld)),st.matrix.decompose(st.position,st.quaternion,st.scale),st.updateMatrixWorld(!0),st.projectionMatrix.copy(D.projectionMatrix),st.projectionMatrixInverse.copy(D.projectionMatrixInverse),st.isPerspectiveCamera&&(st.fov=xo*2*Math.atan(1/st.projectionMatrix.elements[5]),st.zoom=1)}this.getCamera=function(){return C},this.getFoveation=function(){if(!(d===null&&p===null))return c},this.setFoveation=function(st){c=st,d!==null&&(d.fixedFoveation=st),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=st)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(C)},this.getCameraTexture=function(st){return m[st]};let vt=null;function Mt(st,D){if(u=D.getViewerPose(l||o),_=D,u!==null){const H=u.views;p!==null&&(t.setRenderTargetFramebuffer(b,p.framebuffer),t.setRenderTarget(b));let $=!1;H.length!==C.cameras.length&&(C.cameras.length=0,$=!0);for(let lt=0;lt<H.length;lt++){const w=H[lt];let j=null;if(p!==null)j=p.getViewport(w);else{const B=h.getViewSubImage(d,w);j=B.viewport,lt===0&&(t.setRenderTargetTextures(b,B.colorTexture,B.depthStencilTexture),t.setRenderTarget(b))}let E=M[lt];E===void 0&&(E=new Ne,E.layers.enable(lt),E.viewport=new re,M[lt]=E),E.matrix.fromArray(w.transform.matrix),E.matrix.decompose(E.position,E.quaternion,E.scale),E.projectionMatrix.fromArray(w.projectionMatrix),E.projectionMatrixInverse.copy(E.projectionMatrix).invert(),E.viewport.set(j.x,j.y,j.width,j.height),lt===0&&(C.matrix.copy(E.matrix),C.matrix.decompose(C.position,C.quaternion,C.scale)),$===!0&&C.cameras.push(E)}const G=r.enabledFeatures;if(G&&G.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&h){const lt=h.getDepthInformation(H[0]);lt&&lt.isValid&&lt.texture&&x.init(lt,r.renderState)}if(G&&G.includes("camera-access")&&(t.state.unbindTexture(),h))for(let lt=0;lt<H.length;lt++){const w=H[lt].camera;if(w){let j=m[w];j||(j=new Kl,m[w]=j);const E=h.getCameraImage(w);j.sourceTexture=E}}}for(let H=0;H<v.length;H++){const $=N[H],G=v[H];$!==null&&G!==void 0&&G.update($,D,l||o)}vt&&vt(st,D),D.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:D}),_=null}const Rt=new Wl;Rt.setAnimationLoop(Mt),this.setAnimationLoop=function(st){vt=st},this.dispose=function(){}}}const Fn=new Ge,Xm=new oe;function qm(i,t){function e(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function n(m,f){f.color.getRGB(m.fogColor.value,Cl(i)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function r(m,f,A,b,v){f.isMeshBasicMaterial||f.isMeshLambertMaterial?s(m,f):f.isMeshToonMaterial?(s(m,f),h(m,f)):f.isMeshPhongMaterial?(s(m,f),u(m,f)):f.isMeshStandardMaterial?(s(m,f),d(m,f),f.isMeshPhysicalMaterial&&p(m,f,v)):f.isMeshMatcapMaterial?(s(m,f),_(m,f)):f.isMeshDepthMaterial?s(m,f):f.isMeshDistanceMaterial?(s(m,f),x(m,f)):f.isMeshNormalMaterial?s(m,f):f.isLineBasicMaterial?(o(m,f),f.isLineDashedMaterial&&a(m,f)):f.isPointsMaterial?c(m,f,A,b):f.isSpriteMaterial?l(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function s(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,e(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===Te&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,e(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===Te&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,e(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,e(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,e(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const A=t.get(f),b=A.envMap,v=A.envMapRotation;b&&(m.envMap.value=b,Fn.copy(v),Fn.x*=-1,Fn.y*=-1,Fn.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(Fn.y*=-1,Fn.z*=-1),m.envMapRotation.value.setFromMatrix4(Xm.makeRotationFromEuler(Fn)),m.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,e(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,e(f.aoMap,m.aoMapTransform))}function o(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform))}function a(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function c(m,f,A,b){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*A,m.scale.value=b*.5,f.map&&(m.map.value=f.map,e(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function l(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function u(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function h(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function d(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,e(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,e(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,A){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,e(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,e(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,e(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,e(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,e(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Te&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,e(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,e(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=A.texture,m.transmissionSamplerSize.value.set(A.width,A.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,e(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,e(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,e(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,e(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,e(f.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,f){f.matcap&&(m.matcap.value=f.matcap)}function x(m,f){const A=t.get(f).light;m.referencePosition.value.setFromMatrixPosition(A.matrixWorld),m.nearDistance.value=A.shadow.camera.near,m.farDistance.value=A.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function Ym(i,t,e,n){let r={},s={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(A,b){const v=b.program;n.uniformBlockBinding(A,v)}function l(A,b){let v=r[A.id];v===void 0&&(_(A),v=u(A),r[A.id]=v,A.addEventListener("dispose",m));const N=b.program;n.updateUBOMapping(A,N);const P=t.render.frame;s[A.id]!==P&&(d(A),s[A.id]=P)}function u(A){const b=h();A.__bindingPointIndex=b;const v=i.createBuffer(),N=A.__size,P=A.usage;return i.bindBuffer(i.UNIFORM_BUFFER,v),i.bufferData(i.UNIFORM_BUFFER,N,P),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,b,v),v}function h(){for(let A=0;A<a;A++)if(o.indexOf(A)===-1)return o.push(A),A;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(A){const b=r[A.id],v=A.uniforms,N=A.__cache;i.bindBuffer(i.UNIFORM_BUFFER,b);for(let P=0,L=v.length;P<L;P++){const F=Array.isArray(v[P])?v[P]:[v[P]];for(let S=0,M=F.length;S<M;S++){const C=F[S];if(p(C,P,S,N)===!0){const tt=C.__offset,et=Array.isArray(C.value)?C.value:[C.value];let Y=0;for(let K=0;K<et.length;K++){const at=et[K],dt=x(at);typeof at=="number"||typeof at=="boolean"?(C.__data[0]=at,i.bufferSubData(i.UNIFORM_BUFFER,tt+Y,C.__data)):at.isMatrix3?(C.__data[0]=at.elements[0],C.__data[1]=at.elements[1],C.__data[2]=at.elements[2],C.__data[3]=0,C.__data[4]=at.elements[3],C.__data[5]=at.elements[4],C.__data[6]=at.elements[5],C.__data[7]=0,C.__data[8]=at.elements[6],C.__data[9]=at.elements[7],C.__data[10]=at.elements[8],C.__data[11]=0):(at.toArray(C.__data,Y),Y+=dt.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,tt,C.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(A,b,v,N){const P=A.value,L=b+"_"+v;if(N[L]===void 0)return typeof P=="number"||typeof P=="boolean"?N[L]=P:N[L]=P.clone(),!0;{const F=N[L];if(typeof P=="number"||typeof P=="boolean"){if(F!==P)return N[L]=P,!0}else if(F.equals(P)===!1)return F.copy(P),!0}return!1}function _(A){const b=A.uniforms;let v=0;const N=16;for(let L=0,F=b.length;L<F;L++){const S=Array.isArray(b[L])?b[L]:[b[L]];for(let M=0,C=S.length;M<C;M++){const tt=S[M],et=Array.isArray(tt.value)?tt.value:[tt.value];for(let Y=0,K=et.length;Y<K;Y++){const at=et[Y],dt=x(at),nt=v%N,gt=nt%dt.boundary,pt=nt+gt;v+=gt,pt!==0&&N-pt<dt.storage&&(v+=N-pt),tt.__data=new Float32Array(dt.storage/Float32Array.BYTES_PER_ELEMENT),tt.__offset=v,v+=dt.storage}}}const P=v%N;return P>0&&(v+=N-P),A.__size=v,A.__cache={},this}function x(A){const b={boundary:0,storage:0};return typeof A=="number"||typeof A=="boolean"?(b.boundary=4,b.storage=4):A.isVector2?(b.boundary=8,b.storage=8):A.isVector3||A.isColor?(b.boundary=16,b.storage=12):A.isVector4?(b.boundary=16,b.storage=16):A.isMatrix3?(b.boundary=48,b.storage=48):A.isMatrix4?(b.boundary=64,b.storage=64):A.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",A),b}function m(A){const b=A.target;b.removeEventListener("dispose",m);const v=o.indexOf(b.__bindingPointIndex);o.splice(v,1),i.deleteBuffer(r[b.id]),delete r[b.id],delete s[b.id]}function f(){for(const A in r)i.deleteBuffer(r[A]);o=[],r={},s={}}return{bind:c,update:l,dispose:f}}class Zm{constructor(t={}){const{canvas:e=Wc(),context:n=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=o;const _=new Uint32Array(4),x=new Int32Array(4);let m=null,f=null;const A=[],b=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=An,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const v=this;let N=!1;this._outputColorSpace=Re;let P=0,L=0,F=null,S=-1,M=null;const C=new re,tt=new re;let et=null;const Y=new Xt(0);let K=0,at=e.width,dt=e.height,nt=1,gt=null,pt=null;const ft=new re(0,0,at,dt),vt=new re(0,0,at,dt);let Mt=!1;const Rt=new Wr;let st=!1,D=!1;const H=new oe,$=new V,G=new re,ct={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Z=!1;function lt(){return F===null?nt:1}let w=n;function j(T,Q){return e.getContext(T,Q)}try{const T={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${wo}`),e.addEventListener("webglcontextlost",wt,!1),e.addEventListener("webglcontextrestored",Ft,!1),e.addEventListener("webglcontextcreationerror",yt,!1),w===null){const Q="webgl2";if(w=j(Q,T),w===null)throw j(Q)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let E,B,O,I,U,z,W,rt,y,g,R,k,J,X,mt,_t,At,It,St,Ct,Gt,kt,Lt,Yt;function q(){E=new rp(w),E.init(),kt=new zm(w,E),B=new $d(w,E,t,kt),O=new Bm(w,E),B.reversedDepthBuffer&&d&&O.buffers.depth.setReversed(!0),I=new ap(w),U=new Tm,z=new km(w,E,O,U,B,kt,I),W=new Qd(v),rt=new ip(v),y=new fh(w),Lt=new Kd(w,y),g=new sp(w,y,I,Lt),R=new cp(w,g,y,I),St=new lp(w,B,z),_t=new jd(U),k=new bm(v,W,rt,E,B,Lt,_t),J=new qm(v,U),X=new wm,mt=new Im(E),It=new Zd(v,W,rt,O,R,p,c),At=new Fm(v,R,B),Yt=new Ym(w,I,B,O),Ct=new Jd(w,E,I),Gt=new op(w,E,I),I.programs=k.programs,v.capabilities=B,v.extensions=E,v.properties=U,v.renderLists=X,v.shadowMap=At,v.state=O,v.info=I}q();const bt=new Wm(v,w);this.xr=bt,this.getContext=function(){return w},this.getContextAttributes=function(){return w.getContextAttributes()},this.forceContextLoss=function(){const T=E.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=E.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return nt},this.setPixelRatio=function(T){T!==void 0&&(nt=T,this.setSize(at,dt,!1))},this.getSize=function(T){return T.set(at,dt)},this.setSize=function(T,Q,ut=!0){if(bt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}at=T,dt=Q,e.width=Math.floor(T*nt),e.height=Math.floor(Q*nt),ut===!0&&(e.style.width=T+"px",e.style.height=Q+"px"),this.setViewport(0,0,T,Q)},this.getDrawingBufferSize=function(T){return T.set(at*nt,dt*nt).floor()},this.setDrawingBufferSize=function(T,Q,ut){at=T,dt=Q,nt=ut,e.width=Math.floor(T*ut),e.height=Math.floor(Q*ut),this.setViewport(0,0,T,Q)},this.getCurrentViewport=function(T){return T.copy(C)},this.getViewport=function(T){return T.copy(ft)},this.setViewport=function(T,Q,ut,ht){T.isVector4?ft.set(T.x,T.y,T.z,T.w):ft.set(T,Q,ut,ht),O.viewport(C.copy(ft).multiplyScalar(nt).round())},this.getScissor=function(T){return T.copy(vt)},this.setScissor=function(T,Q,ut,ht){T.isVector4?vt.set(T.x,T.y,T.z,T.w):vt.set(T,Q,ut,ht),O.scissor(tt.copy(vt).multiplyScalar(nt).round())},this.getScissorTest=function(){return Mt},this.setScissorTest=function(T){O.setScissorTest(Mt=T)},this.setOpaqueSort=function(T){gt=T},this.setTransparentSort=function(T){pt=T},this.getClearColor=function(T){return T.copy(It.getClearColor())},this.setClearColor=function(){It.setClearColor(...arguments)},this.getClearAlpha=function(){return It.getClearAlpha()},this.setClearAlpha=function(){It.setClearAlpha(...arguments)},this.clear=function(T=!0,Q=!0,ut=!0){let ht=0;if(T){let it=!1;if(F!==null){const Et=F.texture.format;it=Et===Uo||Et===Io||Et===Do}if(it){const Et=F.texture.type,Dt=Et===rn||Et===Xn||Et===Wi||Et===Xi||Et===Co||Et===Po,Ot=It.getClearColor(),Ut=It.getClearAlpha(),Vt=Ot.r,Wt=Ot.g,zt=Ot.b;Dt?(_[0]=Vt,_[1]=Wt,_[2]=zt,_[3]=Ut,w.clearBufferuiv(w.COLOR,0,_)):(x[0]=Vt,x[1]=Wt,x[2]=zt,x[3]=Ut,w.clearBufferiv(w.COLOR,0,x))}else ht|=w.COLOR_BUFFER_BIT}Q&&(ht|=w.DEPTH_BUFFER_BIT),ut&&(ht|=w.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),w.clear(ht)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",wt,!1),e.removeEventListener("webglcontextrestored",Ft,!1),e.removeEventListener("webglcontextcreationerror",yt,!1),It.dispose(),X.dispose(),mt.dispose(),U.dispose(),W.dispose(),rt.dispose(),R.dispose(),Lt.dispose(),Yt.dispose(),k.dispose(),bt.dispose(),bt.removeEventListener("sessionstart",Je),bt.removeEventListener("sessionend",qo),Cn.stop()};function wt(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),N=!0}function Ft(){console.log("THREE.WebGLRenderer: Context Restored."),N=!1;const T=I.autoReset,Q=At.enabled,ut=At.autoUpdate,ht=At.needsUpdate,it=At.type;q(),I.autoReset=T,At.enabled=Q,At.autoUpdate=ut,At.needsUpdate=ht,At.type=it}function yt(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function xt(T){const Q=T.target;Q.removeEventListener("dispose",xt),Bt(Q)}function Bt(T){qt(T),U.remove(T)}function qt(T){const Q=U.get(T).programs;Q!==void 0&&(Q.forEach(function(ut){k.releaseProgram(ut)}),T.isShaderMaterial&&k.releaseShaderCache(T))}this.renderBufferDirect=function(T,Q,ut,ht,it,Et){Q===null&&(Q=ct);const Dt=it.isMesh&&it.matrixWorld.determinant()<0,Ot=$l(T,Q,ut,ht,it);O.setMaterial(ht,Dt);let Ut=ut.index,Vt=1;if(ht.wireframe===!0){if(Ut=g.getWireframeAttribute(ut),Ut===void 0)return;Vt=2}const Wt=ut.drawRange,zt=ut.attributes.position;let $t=Wt.start*Vt,ne=(Wt.start+Wt.count)*Vt;Et!==null&&($t=Math.max($t,Et.start*Vt),ne=Math.min(ne,(Et.start+Et.count)*Vt)),Ut!==null?($t=Math.max($t,0),ne=Math.min(ne,Ut.count)):zt!=null&&($t=Math.max($t,0),ne=Math.min(ne,zt.count));const fe=ne-$t;if(fe<0||fe===1/0)return;Lt.setup(it,ht,Ot,ut,Ut);let le,se=Ct;if(Ut!==null&&(le=y.get(Ut),se=Gt,se.setIndex(le)),it.isMesh)ht.wireframe===!0?(O.setLineWidth(ht.wireframeLinewidth*lt()),se.setMode(w.LINES)):se.setMode(w.TRIANGLES);else if(it.isLine){let Ht=ht.linewidth;Ht===void 0&&(Ht=1),O.setLineWidth(Ht*lt()),it.isLineSegments?se.setMode(w.LINES):it.isLineLoop?se.setMode(w.LINE_LOOP):se.setMode(w.LINE_STRIP)}else it.isPoints?se.setMode(w.POINTS):it.isSprite&&se.setMode(w.TRIANGLES);if(it.isBatchedMesh)if(it._multiDrawInstances!==null)gi("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),se.renderMultiDrawInstances(it._multiDrawStarts,it._multiDrawCounts,it._multiDrawCount,it._multiDrawInstances);else if(E.get("WEBGL_multi_draw"))se.renderMultiDraw(it._multiDrawStarts,it._multiDrawCounts,it._multiDrawCount);else{const Ht=it._multiDrawStarts,ce=it._multiDrawCounts,Qt=it._multiDrawCount,Pe=Ut?y.get(Ut).bytesPerElement:1,$n=U.get(ht).currentProgram.getUniforms();for(let Le=0;Le<Qt;Le++)$n.setValue(w,"_gl_DrawID",Le),se.render(Ht[Le]/Pe,ce[Le])}else if(it.isInstancedMesh)se.renderInstances($t,fe,it.count);else if(ut.isInstancedBufferGeometry){const Ht=ut._maxInstanceCount!==void 0?ut._maxInstanceCount:1/0,ce=Math.min(ut.instanceCount,Ht);se.renderInstances($t,fe,ce)}else se.render($t,fe)};function ae(T,Q,ut){T.transparent===!0&&T.side===ve&&T.forceSinglePass===!1?(T.side=Te,T.needsUpdate=!0,er(T,Q,ut),T.side=wn,T.needsUpdate=!0,er(T,Q,ut),T.side=ve):er(T,Q,ut)}this.compile=function(T,Q,ut=null){ut===null&&(ut=T),f=mt.get(ut),f.init(Q),b.push(f),ut.traverseVisible(function(it){it.isLight&&it.layers.test(Q.layers)&&(f.pushLight(it),it.castShadow&&f.pushShadow(it))}),T!==ut&&T.traverseVisible(function(it){it.isLight&&it.layers.test(Q.layers)&&(f.pushLight(it),it.castShadow&&f.pushShadow(it))}),f.setupLights();const ht=new Set;return T.traverse(function(it){if(!(it.isMesh||it.isPoints||it.isLine||it.isSprite))return;const Et=it.material;if(Et)if(Array.isArray(Et))for(let Dt=0;Dt<Et.length;Dt++){const Ot=Et[Dt];ae(Ot,ut,it),ht.add(Ot)}else ae(Et,ut,it),ht.add(Et)}),f=b.pop(),ht},this.compileAsync=function(T,Q,ut=null){const ht=this.compile(T,Q,ut);return new Promise(it=>{function Et(){if(ht.forEach(function(Dt){U.get(Dt).currentProgram.isReady()&&ht.delete(Dt)}),ht.size===0){it(T);return}setTimeout(Et,10)}E.get("KHR_parallel_shader_compile")!==null?Et():setTimeout(Et,10)})};let ee=null;function on(T){ee&&ee(T)}function Je(){Cn.stop()}function qo(){Cn.start()}const Cn=new Wl;Cn.setAnimationLoop(on),typeof self<"u"&&Cn.setContext(self),this.setAnimationLoop=function(T){ee=T,bt.setAnimationLoop(T),T===null?Cn.stop():Cn.start()},bt.addEventListener("sessionstart",Je),bt.addEventListener("sessionend",qo),this.render=function(T,Q){if(Q!==void 0&&Q.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(N===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),Q.parent===null&&Q.matrixWorldAutoUpdate===!0&&Q.updateMatrixWorld(),bt.enabled===!0&&bt.isPresenting===!0&&(bt.cameraAutoUpdate===!0&&bt.updateCamera(Q),Q=bt.getCamera()),T.isScene===!0&&T.onBeforeRender(v,T,Q,F),f=mt.get(T,b.length),f.init(Q),b.push(f),H.multiplyMatrices(Q.projectionMatrix,Q.matrixWorldInverse),Rt.setFromProjectionMatrix(H,en,Q.reversedDepth),D=this.localClippingEnabled,st=_t.init(this.clippingPlanes,D),m=X.get(T,A.length),m.init(),A.push(m),bt.enabled===!0&&bt.isPresenting===!0){const Et=v.xr.getDepthSensingMesh();Et!==null&&qr(Et,Q,-1/0,v.sortObjects)}qr(T,Q,0,v.sortObjects),m.finish(),v.sortObjects===!0&&m.sort(gt,pt),Z=bt.enabled===!1||bt.isPresenting===!1||bt.hasDepthSensing()===!1,Z&&It.addToRenderList(m,T),this.info.render.frame++,st===!0&&_t.beginShadows();const ut=f.state.shadowsArray;At.render(ut,T,Q),st===!0&&_t.endShadows(),this.info.autoReset===!0&&this.info.reset();const ht=m.opaque,it=m.transmissive;if(f.setupLights(),Q.isArrayCamera){const Et=Q.cameras;if(it.length>0)for(let Dt=0,Ot=Et.length;Dt<Ot;Dt++){const Ut=Et[Dt];Zo(ht,it,T,Ut)}Z&&It.render(T);for(let Dt=0,Ot=Et.length;Dt<Ot;Dt++){const Ut=Et[Dt];Yo(m,T,Ut,Ut.viewport)}}else it.length>0&&Zo(ht,it,T,Q),Z&&It.render(T),Yo(m,T,Q);F!==null&&L===0&&(z.updateMultisampleRenderTarget(F),z.updateRenderTargetMipmap(F)),T.isScene===!0&&T.onAfterRender(v,T,Q),Lt.resetDefaultState(),S=-1,M=null,b.pop(),b.length>0?(f=b[b.length-1],st===!0&&_t.setGlobalState(v.clippingPlanes,f.state.camera)):f=null,A.pop(),A.length>0?m=A[A.length-1]:m=null};function qr(T,Q,ut,ht){if(T.visible===!1)return;if(T.layers.test(Q.layers)){if(T.isGroup)ut=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(Q);else if(T.isLight)f.pushLight(T),T.castShadow&&f.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||Rt.intersectsSprite(T)){ht&&G.setFromMatrixPosition(T.matrixWorld).applyMatrix4(H);const Dt=R.update(T),Ot=T.material;Ot.visible&&m.push(T,Dt,Ot,ut,G.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||Rt.intersectsObject(T))){const Dt=R.update(T),Ot=T.material;if(ht&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),G.copy(T.boundingSphere.center)):(Dt.boundingSphere===null&&Dt.computeBoundingSphere(),G.copy(Dt.boundingSphere.center)),G.applyMatrix4(T.matrixWorld).applyMatrix4(H)),Array.isArray(Ot)){const Ut=Dt.groups;for(let Vt=0,Wt=Ut.length;Vt<Wt;Vt++){const zt=Ut[Vt],$t=Ot[zt.materialIndex];$t&&$t.visible&&m.push(T,Dt,$t,ut,G.z,zt)}}else Ot.visible&&m.push(T,Dt,Ot,ut,G.z,null)}}const Et=T.children;for(let Dt=0,Ot=Et.length;Dt<Ot;Dt++)qr(Et[Dt],Q,ut,ht)}function Yo(T,Q,ut,ht){const it=T.opaque,Et=T.transmissive,Dt=T.transparent;f.setupLightsView(ut),st===!0&&_t.setGlobalState(v.clippingPlanes,ut),ht&&O.viewport(C.copy(ht)),it.length>0&&tr(it,Q,ut),Et.length>0&&tr(Et,Q,ut),Dt.length>0&&tr(Dt,Q,ut),O.buffers.depth.setTest(!0),O.buffers.depth.setMask(!0),O.buffers.color.setMask(!0),O.setPolygonOffset(!1)}function Zo(T,Q,ut,ht){if((ut.isScene===!0?ut.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[ht.id]===void 0&&(f.state.transmissionRenderTarget[ht.id]=new qn(1,1,{generateMipmaps:!0,type:E.has("EXT_color_buffer_half_float")||E.has("EXT_color_buffer_float")?$i:rn,minFilter:Gn,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:te.workingColorSpace}));const Et=f.state.transmissionRenderTarget[ht.id],Dt=ht.viewport||C;Et.setSize(Dt.z*v.transmissionResolutionScale,Dt.w*v.transmissionResolutionScale);const Ot=v.getRenderTarget(),Ut=v.getActiveCubeFace(),Vt=v.getActiveMipmapLevel();v.setRenderTarget(Et),v.getClearColor(Y),K=v.getClearAlpha(),K<1&&v.setClearColor(16777215,.5),v.clear(),Z&&It.render(ut);const Wt=v.toneMapping;v.toneMapping=An;const zt=ht.viewport;if(ht.viewport!==void 0&&(ht.viewport=void 0),f.setupLightsView(ht),st===!0&&_t.setGlobalState(v.clippingPlanes,ht),tr(T,ut,ht),z.updateMultisampleRenderTarget(Et),z.updateRenderTargetMipmap(Et),E.has("WEBGL_multisampled_render_to_texture")===!1){let $t=!1;for(let ne=0,fe=Q.length;ne<fe;ne++){const le=Q[ne],se=le.object,Ht=le.geometry,ce=le.material,Qt=le.group;if(ce.side===ve&&se.layers.test(ht.layers)){const Pe=ce.side;ce.side=Te,ce.needsUpdate=!0,Ko(se,ut,ht,Ht,ce,Qt),ce.side=Pe,ce.needsUpdate=!0,$t=!0}}$t===!0&&(z.updateMultisampleRenderTarget(Et),z.updateRenderTargetMipmap(Et))}v.setRenderTarget(Ot,Ut,Vt),v.setClearColor(Y,K),zt!==void 0&&(ht.viewport=zt),v.toneMapping=Wt}function tr(T,Q,ut){const ht=Q.isScene===!0?Q.overrideMaterial:null;for(let it=0,Et=T.length;it<Et;it++){const Dt=T[it],Ot=Dt.object,Ut=Dt.geometry,Vt=Dt.group;let Wt=Dt.material;Wt.allowOverride===!0&&ht!==null&&(Wt=ht),Ot.layers.test(ut.layers)&&Ko(Ot,Q,ut,Ut,Wt,Vt)}}function Ko(T,Q,ut,ht,it,Et){T.onBeforeRender(v,Q,ut,ht,it,Et),T.modelViewMatrix.multiplyMatrices(ut.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),it.onBeforeRender(v,Q,ut,ht,T,Et),it.transparent===!0&&it.side===ve&&it.forceSinglePass===!1?(it.side=Te,it.needsUpdate=!0,v.renderBufferDirect(ut,Q,ht,it,T,Et),it.side=wn,it.needsUpdate=!0,v.renderBufferDirect(ut,Q,ht,it,T,Et),it.side=ve):v.renderBufferDirect(ut,Q,ht,it,T,Et),T.onAfterRender(v,Q,ut,ht,it,Et)}function er(T,Q,ut){Q.isScene!==!0&&(Q=ct);const ht=U.get(T),it=f.state.lights,Et=f.state.shadowsArray,Dt=it.state.version,Ot=k.getParameters(T,it.state,Et,Q,ut),Ut=k.getProgramCacheKey(Ot);let Vt=ht.programs;ht.environment=T.isMeshStandardMaterial?Q.environment:null,ht.fog=Q.fog,ht.envMap=(T.isMeshStandardMaterial?rt:W).get(T.envMap||ht.environment),ht.envMapRotation=ht.environment!==null&&T.envMap===null?Q.environmentRotation:T.envMapRotation,Vt===void 0&&(T.addEventListener("dispose",xt),Vt=new Map,ht.programs=Vt);let Wt=Vt.get(Ut);if(Wt!==void 0){if(ht.currentProgram===Wt&&ht.lightsStateVersion===Dt)return $o(T,Ot),Wt}else Ot.uniforms=k.getUniforms(T),T.onBeforeCompile(Ot,v),Wt=k.acquireProgram(Ot,Ut),Vt.set(Ut,Wt),ht.uniforms=Ot.uniforms;const zt=ht.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(zt.clippingPlanes=_t.uniform),$o(T,Ot),ht.needsLights=Ql(T),ht.lightsStateVersion=Dt,ht.needsLights&&(zt.ambientLightColor.value=it.state.ambient,zt.lightProbe.value=it.state.probe,zt.directionalLights.value=it.state.directional,zt.directionalLightShadows.value=it.state.directionalShadow,zt.spotLights.value=it.state.spot,zt.spotLightShadows.value=it.state.spotShadow,zt.rectAreaLights.value=it.state.rectArea,zt.ltc_1.value=it.state.rectAreaLTC1,zt.ltc_2.value=it.state.rectAreaLTC2,zt.pointLights.value=it.state.point,zt.pointLightShadows.value=it.state.pointShadow,zt.hemisphereLights.value=it.state.hemi,zt.directionalShadowMap.value=it.state.directionalShadowMap,zt.directionalShadowMatrix.value=it.state.directionalShadowMatrix,zt.spotShadowMap.value=it.state.spotShadowMap,zt.spotLightMatrix.value=it.state.spotLightMatrix,zt.spotLightMap.value=it.state.spotLightMap,zt.pointShadowMap.value=it.state.pointShadowMap,zt.pointShadowMatrix.value=it.state.pointShadowMatrix),ht.currentProgram=Wt,ht.uniformsList=null,Wt}function Jo(T){if(T.uniformsList===null){const Q=T.currentProgram.getUniforms();T.uniformsList=Ur.seqWithValue(Q.seq,T.uniforms)}return T.uniformsList}function $o(T,Q){const ut=U.get(T);ut.outputColorSpace=Q.outputColorSpace,ut.batching=Q.batching,ut.batchingColor=Q.batchingColor,ut.instancing=Q.instancing,ut.instancingColor=Q.instancingColor,ut.instancingMorph=Q.instancingMorph,ut.skinning=Q.skinning,ut.morphTargets=Q.morphTargets,ut.morphNormals=Q.morphNormals,ut.morphColors=Q.morphColors,ut.morphTargetsCount=Q.morphTargetsCount,ut.numClippingPlanes=Q.numClippingPlanes,ut.numIntersection=Q.numClipIntersection,ut.vertexAlphas=Q.vertexAlphas,ut.vertexTangents=Q.vertexTangents,ut.toneMapping=Q.toneMapping}function $l(T,Q,ut,ht,it){Q.isScene!==!0&&(Q=ct),z.resetTextureUnits();const Et=Q.fog,Dt=ht.isMeshStandardMaterial?Q.environment:null,Ot=F===null?v.outputColorSpace:F.isXRRenderTarget===!0?F.texture.colorSpace:Ei,Ut=(ht.isMeshStandardMaterial?rt:W).get(ht.envMap||Dt),Vt=ht.vertexColors===!0&&!!ut.attributes.color&&ut.attributes.color.itemSize===4,Wt=!!ut.attributes.tangent&&(!!ht.normalMap||ht.anisotropy>0),zt=!!ut.morphAttributes.position,$t=!!ut.morphAttributes.normal,ne=!!ut.morphAttributes.color;let fe=An;ht.toneMapped&&(F===null||F.isXRRenderTarget===!0)&&(fe=v.toneMapping);const le=ut.morphAttributes.position||ut.morphAttributes.normal||ut.morphAttributes.color,se=le!==void 0?le.length:0,Ht=U.get(ht),ce=f.state.lights;if(st===!0&&(D===!0||T!==M)){const Ee=T===M&&ht.id===S;_t.setState(ht,T,Ee)}let Qt=!1;ht.version===Ht.__version?(Ht.needsLights&&Ht.lightsStateVersion!==ce.state.version||Ht.outputColorSpace!==Ot||it.isBatchedMesh&&Ht.batching===!1||!it.isBatchedMesh&&Ht.batching===!0||it.isBatchedMesh&&Ht.batchingColor===!0&&it.colorTexture===null||it.isBatchedMesh&&Ht.batchingColor===!1&&it.colorTexture!==null||it.isInstancedMesh&&Ht.instancing===!1||!it.isInstancedMesh&&Ht.instancing===!0||it.isSkinnedMesh&&Ht.skinning===!1||!it.isSkinnedMesh&&Ht.skinning===!0||it.isInstancedMesh&&Ht.instancingColor===!0&&it.instanceColor===null||it.isInstancedMesh&&Ht.instancingColor===!1&&it.instanceColor!==null||it.isInstancedMesh&&Ht.instancingMorph===!0&&it.morphTexture===null||it.isInstancedMesh&&Ht.instancingMorph===!1&&it.morphTexture!==null||Ht.envMap!==Ut||ht.fog===!0&&Ht.fog!==Et||Ht.numClippingPlanes!==void 0&&(Ht.numClippingPlanes!==_t.numPlanes||Ht.numIntersection!==_t.numIntersection)||Ht.vertexAlphas!==Vt||Ht.vertexTangents!==Wt||Ht.morphTargets!==zt||Ht.morphNormals!==$t||Ht.morphColors!==ne||Ht.toneMapping!==fe||Ht.morphTargetsCount!==se)&&(Qt=!0):(Qt=!0,Ht.__version=ht.version);let Pe=Ht.currentProgram;Qt===!0&&(Pe=er(ht,Q,it));let $n=!1,Le=!1,Ci=!1;const ue=Pe.getUniforms(),Oe=Ht.uniforms;if(O.useProgram(Pe.program)&&($n=!0,Le=!0,Ci=!0),ht.id!==S&&(S=ht.id,Le=!0),$n||M!==T){O.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),ue.setValue(w,"projectionMatrix",T.projectionMatrix),ue.setValue(w,"viewMatrix",T.matrixWorldInverse);const Ae=ue.map.cameraPosition;Ae!==void 0&&Ae.setValue(w,$.setFromMatrixPosition(T.matrixWorld)),B.logarithmicDepthBuffer&&ue.setValue(w,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(ht.isMeshPhongMaterial||ht.isMeshToonMaterial||ht.isMeshLambertMaterial||ht.isMeshBasicMaterial||ht.isMeshStandardMaterial||ht.isShaderMaterial)&&ue.setValue(w,"isOrthographic",T.isOrthographicCamera===!0),M!==T&&(M=T,Le=!0,Ci=!0)}if(it.isSkinnedMesh){ue.setOptional(w,it,"bindMatrix"),ue.setOptional(w,it,"bindMatrixInverse");const Ee=it.skeleton;Ee&&(Ee.boneTexture===null&&Ee.computeBoneTexture(),ue.setValue(w,"boneTexture",Ee.boneTexture,z))}it.isBatchedMesh&&(ue.setOptional(w,it,"batchingTexture"),ue.setValue(w,"batchingTexture",it._matricesTexture,z),ue.setOptional(w,it,"batchingIdTexture"),ue.setValue(w,"batchingIdTexture",it._indirectTexture,z),ue.setOptional(w,it,"batchingColorTexture"),it._colorsTexture!==null&&ue.setValue(w,"batchingColorTexture",it._colorsTexture,z));const Be=ut.morphAttributes;if((Be.position!==void 0||Be.normal!==void 0||Be.color!==void 0)&&St.update(it,ut,Pe),(Le||Ht.receiveShadow!==it.receiveShadow)&&(Ht.receiveShadow=it.receiveShadow,ue.setValue(w,"receiveShadow",it.receiveShadow)),ht.isMeshGouraudMaterial&&ht.envMap!==null&&(Oe.envMap.value=Ut,Oe.flipEnvMap.value=Ut.isCubeTexture&&Ut.isRenderTargetTexture===!1?-1:1),ht.isMeshStandardMaterial&&ht.envMap===null&&Q.environment!==null&&(Oe.envMapIntensity.value=Q.environmentIntensity),Le&&(ue.setValue(w,"toneMappingExposure",v.toneMappingExposure),Ht.needsLights&&jl(Oe,Ci),Et&&ht.fog===!0&&J.refreshFogUniforms(Oe,Et),J.refreshMaterialUniforms(Oe,ht,nt,dt,f.state.transmissionRenderTarget[T.id]),Ur.upload(w,Jo(Ht),Oe,z)),ht.isShaderMaterial&&ht.uniformsNeedUpdate===!0&&(Ur.upload(w,Jo(Ht),Oe,z),ht.uniformsNeedUpdate=!1),ht.isSpriteMaterial&&ue.setValue(w,"center",it.center),ue.setValue(w,"modelViewMatrix",it.modelViewMatrix),ue.setValue(w,"normalMatrix",it.normalMatrix),ue.setValue(w,"modelMatrix",it.matrixWorld),ht.isShaderMaterial||ht.isRawShaderMaterial){const Ee=ht.uniformsGroups;for(let Ae=0,Yr=Ee.length;Ae<Yr;Ae++){const Pn=Ee[Ae];Yt.update(Pn,Pe),Yt.bind(Pn,Pe)}}return Pe}function jl(T,Q){T.ambientLightColor.needsUpdate=Q,T.lightProbe.needsUpdate=Q,T.directionalLights.needsUpdate=Q,T.directionalLightShadows.needsUpdate=Q,T.pointLights.needsUpdate=Q,T.pointLightShadows.needsUpdate=Q,T.spotLights.needsUpdate=Q,T.spotLightShadows.needsUpdate=Q,T.rectAreaLights.needsUpdate=Q,T.hemisphereLights.needsUpdate=Q}function Ql(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return P},this.getActiveMipmapLevel=function(){return L},this.getRenderTarget=function(){return F},this.setRenderTargetTextures=function(T,Q,ut){const ht=U.get(T);ht.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,ht.__autoAllocateDepthBuffer===!1&&(ht.__useRenderToTexture=!1),U.get(T.texture).__webglTexture=Q,U.get(T.depthTexture).__webglTexture=ht.__autoAllocateDepthBuffer?void 0:ut,ht.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,Q){const ut=U.get(T);ut.__webglFramebuffer=Q,ut.__useDefaultFramebuffer=Q===void 0};const tc=w.createFramebuffer();this.setRenderTarget=function(T,Q=0,ut=0){F=T,P=Q,L=ut;let ht=!0,it=null,Et=!1,Dt=!1;if(T){const Ut=U.get(T);if(Ut.__useDefaultFramebuffer!==void 0)O.bindFramebuffer(w.FRAMEBUFFER,null),ht=!1;else if(Ut.__webglFramebuffer===void 0)z.setupRenderTarget(T);else if(Ut.__hasExternalTextures)z.rebindTextures(T,U.get(T.texture).__webglTexture,U.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const zt=T.depthTexture;if(Ut.__boundDepthTexture!==zt){if(zt!==null&&U.has(zt)&&(T.width!==zt.image.width||T.height!==zt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");z.setupDepthRenderbuffer(T)}}const Vt=T.texture;(Vt.isData3DTexture||Vt.isDataArrayTexture||Vt.isCompressedArrayTexture)&&(Dt=!0);const Wt=U.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Wt[Q])?it=Wt[Q][ut]:it=Wt[Q],Et=!0):T.samples>0&&z.useMultisampledRTT(T)===!1?it=U.get(T).__webglMultisampledFramebuffer:Array.isArray(Wt)?it=Wt[ut]:it=Wt,C.copy(T.viewport),tt.copy(T.scissor),et=T.scissorTest}else C.copy(ft).multiplyScalar(nt).floor(),tt.copy(vt).multiplyScalar(nt).floor(),et=Mt;if(ut!==0&&(it=tc),O.bindFramebuffer(w.FRAMEBUFFER,it)&&ht&&O.drawBuffers(T,it),O.viewport(C),O.scissor(tt),O.setScissorTest(et),Et){const Ut=U.get(T.texture);w.framebufferTexture2D(w.FRAMEBUFFER,w.COLOR_ATTACHMENT0,w.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Ut.__webglTexture,ut)}else if(Dt){const Ut=Q;for(let Vt=0;Vt<T.textures.length;Vt++){const Wt=U.get(T.textures[Vt]);w.framebufferTextureLayer(w.FRAMEBUFFER,w.COLOR_ATTACHMENT0+Vt,Wt.__webglTexture,ut,Ut)}}else if(T!==null&&ut!==0){const Ut=U.get(T.texture);w.framebufferTexture2D(w.FRAMEBUFFER,w.COLOR_ATTACHMENT0,w.TEXTURE_2D,Ut.__webglTexture,ut)}S=-1},this.readRenderTargetPixels=function(T,Q,ut,ht,it,Et,Dt,Ot=0){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ut=U.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Dt!==void 0&&(Ut=Ut[Dt]),Ut){O.bindFramebuffer(w.FRAMEBUFFER,Ut);try{const Vt=T.textures[Ot],Wt=Vt.format,zt=Vt.type;if(!B.textureFormatReadable(Wt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!B.textureTypeReadable(zt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}Q>=0&&Q<=T.width-ht&&ut>=0&&ut<=T.height-it&&(T.textures.length>1&&w.readBuffer(w.COLOR_ATTACHMENT0+Ot),w.readPixels(Q,ut,ht,it,kt.convert(Wt),kt.convert(zt),Et))}finally{const Vt=F!==null?U.get(F).__webglFramebuffer:null;O.bindFramebuffer(w.FRAMEBUFFER,Vt)}}},this.readRenderTargetPixelsAsync=async function(T,Q,ut,ht,it,Et,Dt,Ot=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ut=U.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Dt!==void 0&&(Ut=Ut[Dt]),Ut)if(Q>=0&&Q<=T.width-ht&&ut>=0&&ut<=T.height-it){O.bindFramebuffer(w.FRAMEBUFFER,Ut);const Vt=T.textures[Ot],Wt=Vt.format,zt=Vt.type;if(!B.textureFormatReadable(Wt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!B.textureTypeReadable(zt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const $t=w.createBuffer();w.bindBuffer(w.PIXEL_PACK_BUFFER,$t),w.bufferData(w.PIXEL_PACK_BUFFER,Et.byteLength,w.STREAM_READ),T.textures.length>1&&w.readBuffer(w.COLOR_ATTACHMENT0+Ot),w.readPixels(Q,ut,ht,it,kt.convert(Wt),kt.convert(zt),0);const ne=F!==null?U.get(F).__webglFramebuffer:null;O.bindFramebuffer(w.FRAMEBUFFER,ne);const fe=w.fenceSync(w.SYNC_GPU_COMMANDS_COMPLETE,0);return w.flush(),await Xc(w,fe,4),w.bindBuffer(w.PIXEL_PACK_BUFFER,$t),w.getBufferSubData(w.PIXEL_PACK_BUFFER,0,Et),w.deleteBuffer($t),w.deleteSync(fe),Et}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,Q=null,ut=0){const ht=Math.pow(2,-ut),it=Math.floor(T.image.width*ht),Et=Math.floor(T.image.height*ht),Dt=Q!==null?Q.x:0,Ot=Q!==null?Q.y:0;z.setTexture2D(T,0),w.copyTexSubImage2D(w.TEXTURE_2D,ut,0,0,Dt,Ot,it,Et),O.unbindTexture()};const ec=w.createFramebuffer(),nc=w.createFramebuffer();this.copyTextureToTexture=function(T,Q,ut=null,ht=null,it=0,Et=null){Et===null&&(it!==0?(gi("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),Et=it,it=0):Et=0);let Dt,Ot,Ut,Vt,Wt,zt,$t,ne,fe;const le=T.isCompressedTexture?T.mipmaps[Et]:T.image;if(ut!==null)Dt=ut.max.x-ut.min.x,Ot=ut.max.y-ut.min.y,Ut=ut.isBox3?ut.max.z-ut.min.z:1,Vt=ut.min.x,Wt=ut.min.y,zt=ut.isBox3?ut.min.z:0;else{const Be=Math.pow(2,-it);Dt=Math.floor(le.width*Be),Ot=Math.floor(le.height*Be),T.isDataArrayTexture?Ut=le.depth:T.isData3DTexture?Ut=Math.floor(le.depth*Be):Ut=1,Vt=0,Wt=0,zt=0}ht!==null?($t=ht.x,ne=ht.y,fe=ht.z):($t=0,ne=0,fe=0);const se=kt.convert(Q.format),Ht=kt.convert(Q.type);let ce;Q.isData3DTexture?(z.setTexture3D(Q,0),ce=w.TEXTURE_3D):Q.isDataArrayTexture||Q.isCompressedArrayTexture?(z.setTexture2DArray(Q,0),ce=w.TEXTURE_2D_ARRAY):(z.setTexture2D(Q,0),ce=w.TEXTURE_2D),w.pixelStorei(w.UNPACK_FLIP_Y_WEBGL,Q.flipY),w.pixelStorei(w.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Q.premultiplyAlpha),w.pixelStorei(w.UNPACK_ALIGNMENT,Q.unpackAlignment);const Qt=w.getParameter(w.UNPACK_ROW_LENGTH),Pe=w.getParameter(w.UNPACK_IMAGE_HEIGHT),$n=w.getParameter(w.UNPACK_SKIP_PIXELS),Le=w.getParameter(w.UNPACK_SKIP_ROWS),Ci=w.getParameter(w.UNPACK_SKIP_IMAGES);w.pixelStorei(w.UNPACK_ROW_LENGTH,le.width),w.pixelStorei(w.UNPACK_IMAGE_HEIGHT,le.height),w.pixelStorei(w.UNPACK_SKIP_PIXELS,Vt),w.pixelStorei(w.UNPACK_SKIP_ROWS,Wt),w.pixelStorei(w.UNPACK_SKIP_IMAGES,zt);const ue=T.isDataArrayTexture||T.isData3DTexture,Oe=Q.isDataArrayTexture||Q.isData3DTexture;if(T.isDepthTexture){const Be=U.get(T),Ee=U.get(Q),Ae=U.get(Be.__renderTarget),Yr=U.get(Ee.__renderTarget);O.bindFramebuffer(w.READ_FRAMEBUFFER,Ae.__webglFramebuffer),O.bindFramebuffer(w.DRAW_FRAMEBUFFER,Yr.__webglFramebuffer);for(let Pn=0;Pn<Ut;Pn++)ue&&(w.framebufferTextureLayer(w.READ_FRAMEBUFFER,w.COLOR_ATTACHMENT0,U.get(T).__webglTexture,it,zt+Pn),w.framebufferTextureLayer(w.DRAW_FRAMEBUFFER,w.COLOR_ATTACHMENT0,U.get(Q).__webglTexture,Et,fe+Pn)),w.blitFramebuffer(Vt,Wt,Dt,Ot,$t,ne,Dt,Ot,w.DEPTH_BUFFER_BIT,w.NEAREST);O.bindFramebuffer(w.READ_FRAMEBUFFER,null),O.bindFramebuffer(w.DRAW_FRAMEBUFFER,null)}else if(it!==0||T.isRenderTargetTexture||U.has(T)){const Be=U.get(T),Ee=U.get(Q);O.bindFramebuffer(w.READ_FRAMEBUFFER,ec),O.bindFramebuffer(w.DRAW_FRAMEBUFFER,nc);for(let Ae=0;Ae<Ut;Ae++)ue?w.framebufferTextureLayer(w.READ_FRAMEBUFFER,w.COLOR_ATTACHMENT0,Be.__webglTexture,it,zt+Ae):w.framebufferTexture2D(w.READ_FRAMEBUFFER,w.COLOR_ATTACHMENT0,w.TEXTURE_2D,Be.__webglTexture,it),Oe?w.framebufferTextureLayer(w.DRAW_FRAMEBUFFER,w.COLOR_ATTACHMENT0,Ee.__webglTexture,Et,fe+Ae):w.framebufferTexture2D(w.DRAW_FRAMEBUFFER,w.COLOR_ATTACHMENT0,w.TEXTURE_2D,Ee.__webglTexture,Et),it!==0?w.blitFramebuffer(Vt,Wt,Dt,Ot,$t,ne,Dt,Ot,w.COLOR_BUFFER_BIT,w.NEAREST):Oe?w.copyTexSubImage3D(ce,Et,$t,ne,fe+Ae,Vt,Wt,Dt,Ot):w.copyTexSubImage2D(ce,Et,$t,ne,Vt,Wt,Dt,Ot);O.bindFramebuffer(w.READ_FRAMEBUFFER,null),O.bindFramebuffer(w.DRAW_FRAMEBUFFER,null)}else Oe?T.isDataTexture||T.isData3DTexture?w.texSubImage3D(ce,Et,$t,ne,fe,Dt,Ot,Ut,se,Ht,le.data):Q.isCompressedArrayTexture?w.compressedTexSubImage3D(ce,Et,$t,ne,fe,Dt,Ot,Ut,se,le.data):w.texSubImage3D(ce,Et,$t,ne,fe,Dt,Ot,Ut,se,Ht,le):T.isDataTexture?w.texSubImage2D(w.TEXTURE_2D,Et,$t,ne,Dt,Ot,se,Ht,le.data):T.isCompressedTexture?w.compressedTexSubImage2D(w.TEXTURE_2D,Et,$t,ne,le.width,le.height,se,le.data):w.texSubImage2D(w.TEXTURE_2D,Et,$t,ne,Dt,Ot,se,Ht,le);w.pixelStorei(w.UNPACK_ROW_LENGTH,Qt),w.pixelStorei(w.UNPACK_IMAGE_HEIGHT,Pe),w.pixelStorei(w.UNPACK_SKIP_PIXELS,$n),w.pixelStorei(w.UNPACK_SKIP_ROWS,Le),w.pixelStorei(w.UNPACK_SKIP_IMAGES,Ci),Et===0&&Q.generateMipmaps&&w.generateMipmap(ce),O.unbindTexture()},this.copyTextureToTexture3D=function(T,Q,ut=null,ht=null,it=0){return gi('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(T,Q,ut,ht,it)},this.initRenderTarget=function(T){U.get(T).__webglFramebuffer===void 0&&z.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?z.setTextureCube(T,0):T.isData3DTexture?z.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?z.setTexture2DArray(T,0):z.setTexture2D(T,0),O.unbindTexture()},this.resetState=function(){P=0,L=0,F=null,O.reset(),Lt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return en}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=te._getDrawingBufferColorSpace(t),e.unpackColorSpace=te._getUnpackColorSpace()}}const ot=Object.freeze({west:-7.72,east:7.72,north:-10.3,south:8.62,roof:8.91,alcoveWest:-11.32,alcoveNorth:-6.72,alcoveSouth:-1.81,galleryY:3.38,galleryFront:5.61,galleryInner:4.72,galleryNorth:-8.9,stairLeft:1.81,stairRight:4.28,stairStart:-.19,stairSteps:20}),zr=.225,Ps=1.655,Km=1.71,Jm=[0,.7854,1.5708,2.3562,3.1416,3.927,4.7124,5.4978].map(i=>[Math.cos(i)*zr,Math.sin(i)*zr]),sl={x:-3.02,z:4.16,yaw:-.15,pitch:.083};function $m(i,t){const e=ot;return i>=e.west&&i<=e.east&&t>=e.north&&t<=e.south||i>=e.alcoveWest&&i<=e.west&&t>=e.alcoveNorth&&t<=e.alcoveSouth}function jm(i,t,e){const n=ot;if(i>=n.stairLeft&&i<=n.stairRight&&t>=n.stairStart&&t<n.galleryFront){const s=(t-n.stairStart)/(n.galleryFront-n.stairStart);return Math.min(n.galleryY,n.galleryY*(s+.42/n.stairSteps))}return(t>=n.galleryFront||i>=n.galleryInner&&t>=n.galleryNorth)&&e>n.galleryY-.44?n.galleryY:0}function Qm(){const i=[];function t(n,r,s,o,a=0,c=2){i.push({x:n,z:r,hx:s/2,hz:o/2,low:a,high:c})}function e(n,r,s){for(const[o,a]of Jm)if(!$m(n+o,r+a))return!1;for(const o of i){if(s+.055>=o.high||s+Km<=o.low)continue;const a=Math.max(0,Math.abs(n-o.x)-o.hx),c=Math.max(0,Math.abs(r-o.z)-o.hz);if(a*a+c*c<zr*zr)return!1}return!0}return{add:t,clear:e,obstacles:i}}function ol(i,t,e,n){const r=i.x+t,s=i.z+e,o=jm(r,s,i.feet);return Math.abs(o-i.feet)>.29||!n.clear(r,s,o)?!1:(i.x=r,i.z=s,i.feet=o,!0)}const t0=new Set(["KeyW","KeyA","KeyS","KeyD","ArrowUp","ArrowLeft","ArrowDown","ArrowRight","ShiftLeft","ShiftRight","KeyR"]);function e0(i,t,e,n){const r={...sl,feet:0},s=new Set;let o="paused",a=!1,c=!1,l=null,u=Ps,h=0,d=0,p=0,_=0,x="";function m(S){o!==S&&(o=S,s.clear(),l=null,h=0,d=0,n(o,c))}function f(){Object.assign(r,sl,{feet:0}),h=0,d=0,u=Ps,p=0,_=0,N(0)}function A(){!a||document.pointerLockElement===e||(a=!1,m("drag"),e.focus({preventScroll:!0}))}function b(){if(o==="paused"){a=!0,c=!0;try{if(!e.requestPointerLock)return A();const S=e.requestPointerLock();S&&typeof S.catch=="function"&&S.catch(A)}catch{A()}}}function v(){a=!1,document.pointerLockElement===e&&document.exitPointerLock(),m("paused")}function N(S){i.position.set(r.x,u+S,r.z),i.rotation.set(r.pitch,r.yaw,0,"YXZ")}function P(S,M){r.yaw-=S*.00205,r.pitch=Math.max(-1.43,Math.min(1.43,r.pitch-M*.00205))}document.addEventListener("pointerlockchange",()=>{document.pointerLockElement===e?a?m("locked"):document.exitPointerLock():o==="locked"&&v()}),document.addEventListener("pointerlockerror",A),document.addEventListener("keydown",S=>{if(o==="paused"){S.code==="KeyR"&&f();return}if(S.code==="Escape"){o==="drag"&&v();return}t0.has(S.code)&&(S.preventDefault(),s.add(S.code),S.code==="KeyR"&&!S.repeat&&f())}),document.addEventListener("keyup",S=>s.delete(S.code)),document.addEventListener("mousemove",S=>{o==="locked"&&P(S.movementX,S.movementY)}),e.addEventListener("pointerdown",S=>{o!=="drag"||S.button!==0||(l=[S.pointerId,S.clientX,S.clientY],e.setPointerCapture(S.pointerId))}),e.addEventListener("pointermove",S=>{!l||l[0]!==S.pointerId||(P(S.clientX-l[1],S.clientY-l[2]),l[1]=S.clientX,l[2]=S.clientY)});for(const S of["pointerup","pointercancel","lostpointercapture"])e.addEventListener(S,()=>{l=null});window.addEventListener("blur",()=>{s.clear(),h=0,d=0}),document.addEventListener("visibilitychange",()=>{document.hidden&&v()});const L=(S,M)=>Number(s.has(S)||s.has(M));function F(S,M){if(o!=="paused"){const et=Math.min(.05,S),Y=L("KeyW","ArrowUp")-L("KeyS","ArrowDown"),K=L("KeyD","ArrowRight")-L("KeyA","ArrowLeft"),at=Math.hypot(Y,K),nt=(L("ShiftLeft","ShiftRight")?3.9:2.56)/Math.max(1,at),gt=Math.sin(r.yaw),pt=Math.cos(r.yaw),ft=(pt*K-gt*Y)*nt,vt=(-gt*K-pt*Y)*nt,Mt=1-Math.exp(-et*(at?18:26));h+=(ft-h)*Mt,d+=(vt-d)*Mt;const Rt=r.x,st=r.z,D=Math.max(1,Math.ceil(Math.hypot(h,d)*et/.075));for(let $=0;$<D;$++)ol(r,h*et/D,0,t)||(h=0),ol(r,0,d*et/D,t)||(d=0);const H=Math.hypot(r.x-Rt,r.z-st);p+=H*8.3,_+=((H>3e-4?.012:0)-_)*(1-Math.exp(-et*10)),u+=(r.feet+Ps-u)*(1-Math.exp(-et*16)),N(_*Math.sin(p))}const C=ot,tt=r.x<C.west?"Window alcove":r.z>=C.stairStart&&r.z<C.galleryFront&&r.x>C.stairLeft&&r.x<C.stairRight?"Main stair":r.feet>3?"Upper gallery":r.x>4.65||r.z>5.75?"Lower stacks":"Reading room";tt!==x&&(x=tt,M(tt))}return f(),{begin:b,pause:v,reset:f,tick:F}}function n0(i,t=!1){const e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),r=new Set(Object.keys(i[0].morphAttributes)),s={},o={},a=i[0].morphTargetsRelative,c=new pe;let l=0;for(let u=0;u<i.length;++u){const h=i[u];let d=0;if(e!==(h.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const p in h.attributes){if(!n.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+p+'" attribute exists among all geometries, or in none of them.'),null;s[p]===void 0&&(s[p]=[]),s[p].push(h.attributes[p]),d++}if(d!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(a!==h.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const p in h.morphAttributes){if(!r.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;o[p]===void 0&&(o[p]=[]),o[p].push(h.morphAttributes[p])}if(t){let p;if(e)p=h.index.count;else if(h.attributes.position!==void 0)p=h.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,p,u),l+=p}}if(e){let u=0;const h=[];for(let d=0;d<i.length;++d){const p=i[d].index;for(let _=0;_<p.count;++_)h.push(p.getX(_)+u);u+=i[d].attributes.position.count}c.setIndex(h)}for(const u in s){const h=al(s[u]);if(!h)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;c.setAttribute(u,h)}for(const u in o){const h=o[u][0].length;if(h===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[u]=[];for(let d=0;d<h;++d){const p=[];for(let x=0;x<o[u].length;++x)p.push(o[u][x][d]);const _=al(p);if(!_)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;c.morphAttributes[u].push(_)}}return c}function al(i){let t,e,n,r=-1,s=0;for(let l=0;l<i.length;++l){const u=i[l];if(t===void 0&&(t=u.array.constructor),t!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=u.itemSize),e!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=u.normalized),n!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(r===-1&&(r=u.gpuType),r!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;s+=u.count*e}const o=new t(s),a=new Ve(o,e,n);let c=0;for(let l=0;l<i.length;++l){const u=i[l];if(u.isInterleavedBufferAttribute){const h=c/e;for(let d=0,p=u.count;d<p;d++)for(let _=0;_<e;_++){const x=u.getComponent(d,_);a.setComponent(d+h,_,x)}}else o.set(u.array,c);c+=u.count*e}return r!==void 0&&(a.gpuType=r),a}function nn(i){let t=i>>>0;return()=>{t=t+1831565813>>>0;let e=Math.imul(t^t>>>15,t|1);return e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}const Hr=(i,t,e)=>i+(t-i)*e,Nt=(i,t,e)=>Hr(t,e,i()),Ze=(i,t)=>t[Math.floor(i()*t.length)];function je(i,t,e,n={}){const r=document.createElement("canvas");r.width=i,r.height=t,e(r.getContext("2d"),i,t);const s=new bu(r);return s.colorSpace=n.data?pn:Re,s.anisotropy=n.anisotropy??4,s}function On(i,t,e=256,n=2){const r=nn(t);return je(e,e,(s,o,a)=>{const c=s.createImageData(o,a),l=t%373*.017;for(let u=0;u<a;u++)for(let h=0;h<o;h++){const d=h/o,p=u/a,_=Math.sin(d*12+Math.sin(p*11)*1.4)*Math.sin(p*8.5+d*5),x=d+.019*Math.sin(p*6+d*5+l)+.009*Math.sin(p*19+d*7),m=Math.sin(x*(43+t%17)+Math.sin(x*21)*.63),f=Math.pow(.5+.5*Math.sin(x*810+Math.sin(d*81)*2),6),A=Math.pow(.5+.5*Math.sin(h*2.32+Math.sin(u*2.6))*Math.sin(u*2.67),4),b=r()-.5;let v;i==="oak"?v=224+_*10+m*12-f*33+b*10:i==="plaster"?v=240+_*7+Math.sin(d*48+p*77)*1.8+b*11:i==="stone"?v=222+_*19+Math.sin(d*113+p*84)*4+b*31:v=221+_*9-A*28+b*10;const N=(h+u*o)*4;if(i==="leather"){const L=Math.exp(-((d-.49)**2*11+(p-.51)**2*5))*(22+_*8)-9*Math.abs(Math.sin(p*3.7-d*3.2));c.data.set([v+L,v+L*.82,v+L*.58,255],N)}else c.data.set([v,v,v,255],N)}if(s.putImageData(c,0,0),i==="oak"){s.lineWidth=1;for(let u=0;u<n;u++){const h=Nt(r,o*.06,o*.94),d=Nt(r,a*.07,a*.91);s.strokeStyle=u%2?"#4237243b":"#f8edd347";for(let p=1;p<5;p++)s.beginPath(),s.ellipse(h,d,p*2,p*8,-.12,0,Math.PI*2),s.stroke()}}else if(i==="leather")for(let u=0;u<25;u++){const h=Nt(r,o*.18,o*.82),d=Nt(r,a*.19,a*.87),p=Nt(r,2.4,13.5);s.lineWidth=Nt(r,.4,1.05),s.strokeStyle=r()<.47?"#d6b89852":"#634b3e42",s.beginPath(),s.moveTo(h,d),s.quadraticCurveTo(h+p*.31,d+p*.22,h+p,d+p*.16),s.stroke()}})}function i0(){const i=On("oak",820),t=On("plaster",712),e=On("stone",421),n=On("skin",308),r=On("leather",631,320),s=On("oak",33773,256,1),o=On("oak",1559,256,0);t.wrapS=t.wrapT=Gi;const a=(h,d)=>new Ce({color:h,roughness:.78,...d}),c=h=>a(h,{map:i,roughness:.51}),l=h=>a(h,{map:t,roughness:.96,side:ve}),u=h=>a(h,{map:r,bumpMap:n,bumpScale:.009,roughness:.64});return{floor:c(16777215),floorAlt:a(16777215,{map:s,roughness:.51}),floorQuiet:a(16777215,{map:o,roughness:.51}),oak:c(9196590),oakWarm:c(11696709),oakLight:c(12750422),oakDark:c(6438441),walnut:c(4729633),shelfBack:c(5454119),edge:c(11892032),groove:a(2958362),plaster:l(14338983),sage:l(9148801),ceiling:l(13156266),alcove:l(12235151),pale:l(14731929),warmPaint:l(10722156),limestone:a(11903882,{map:e,roughness:.91}),slate:a(6120794,{map:e,roughness:.87}),ashStone:a(9799543,{map:e,roughness:.95}),iron:a(2370085,{metalness:.35,roughness:.48}),ironEdge:a(5001283,{metalness:.43,roughness:.42}),bronze:a(10383673,{metalness:.43,roughness:.43}),brass:a(11437648,{metalness:.31,roughness:.38}),brassDark:a(6705205,{metalness:.28,roughness:.54}),oxblood:u(7813931),tanLeather:u(10641718),greenLeather:u(4545097),sofa:u(8675652),pipingDark:u(6305825),pipingLight:u(12093008),linen:a(13020800,{map:n,roughness:.95}),greenCloth:a(6582625,{map:n,roughness:.92}),brickCloth:a(11100741,{map:n,roughness:.93}),rugEdge:a(6043952,{map:n,roughness:.94}),stairCloth:a(6831416,{map:n,roughness:.94}),stairStripe:a(12227429,{map:n,roughness:.93}),ink:a(2828321),paper:a(14797728,{map:t,roughness:.97}),oldPaper:a(11243626,{map:t,roughness:.97}),ceramic:a(9070414,{roughness:.38}),celadon:a(8162165,{roughness:.37}),porcelain:a(14077372,{roughness:.37}),lampShade:a(5995608,{roughness:.35,side:ve,emissive:3495228,emissiveIntensity:.22}),goldenShade:a(14068325,{map:t,roughness:.71,side:ve,emissive:14984274,emissiveIntensity:.34}),bulb:a(16765592,{emissive:16754235,emissiveIntensity:2.2,roughness:.43}),glass:a(11388343,{transparent:!0,opacity:.097,depthWrite:!1,roughness:.34,side:ve})}}function r0(i){const t=i0(),e=new Map,n=[],r=new Map,s=new xe,o=new V,a=new V(0,1,0),c=new Zn,l=new Ge,u=new Xt,h=[1,1,1],d={box:new Kn(1,1,1),sphere:new Wn(.5,12,8),ball:new Wn(.5,8,6),microball:new Wn(.5,6,4),cyl:new vi(.5,.5,1,12,1),slim:new vi(.5,.5,1,6,1),cone:new vi(.1,.5,1,12,1),plane:new Jn(1,1)};function p(v){const N=t[v[0]].clone();N.color.setHex(16777215);for(const P of v)r.set(t[P],N)}p(["floor","oak","oakWarm","oakLight","oakDark","walnut","shelfBack","edge"]),p(["plaster","sage","ceiling","alcove","pale","warmPaint"]),p(["oxblood","tanLeather","greenLeather","sofa","pipingDark","pipingLight"]),p(["iron","ironEdge"]);function _(v,N){if(N?.startsWith("outside")||N?.endsWith("copse"))return N;const[P,L,F]=v;if(P<-7.79)return"annex";if(L>=6.48)return"ceiling";const S=L>=3.31?"upper-":"lower-",M=P>=4.59?"east":F>=5.35?"south":F<=-5.66?"north":"room";return S+M}function x(v,N,P=[0,0,0],L={}){const F=new He(v,N);return F.position.fromArray(P),L.rot&&F.rotation.fromArray(L.rot),F.castShadow=L.cast??!0,F.receiveShadow=L.receive??!0,F.renderOrder=L.order??0,L.exterior&&(F.userData.exterior=!0),F.updateMatrix(),F.matrixAutoUpdate=!1,i.add(F),L.combine&&n.push([F,L.combine]),F}function m(v,N,P,L,F={}){const S=v==="ball"&&Math.max(...P??h)<.12?"microball":v,M=typeof S=="string"?d[S]:S,C=r.get(L)??L,tt=F.cast??!0,et=F.receive??!0,Y=_(N,F.cell),K=[M.id,C.id,tt,et,Y].join(":");let at=e.get(K);at||(at={geometry:M,material:C,cast:tt,receive:et,region:Y,matrices:[],colors:[],hasColors:!1},e.set(K,at)),s.position.fromArray(N),s.scale.fromArray(P??h),F.quat?s.quaternion.copy(F.quat):F.rot?s.quaternion.setFromEuler(l.set(...F.rot)):s.quaternion.identity(),s.updateMatrix(),at.matrices.push(s.matrix.clone());const dt=F.tint!==void 0||r.has(L);dt?(u.set(F.tint??16777215),r.has(L)&&u.multiply(L.color),at.colors.push(u.clone())):at.colors.push(null),at.hasColors||=dt}function f(v,N,P,L,F,S,M,C){L>0&&F>0&&S>0&&m("box",[v,N,P],[L,F,S],M,C)}function A(v,N,P,L,F={}){o.set(N[0]-v[0],N[1]-v[1],N[2]-v[2]);const S=o.length();if(S<1e-5)return;c.setFromUnitVectors(a,o.divideScalar(S));const M=v.map((C,tt)=>(C+N[tt])*.5);m(F.square?"box":"slim",M,[P,S,P],L,{...F,quat:c})}function b(){const v=new Map;for(const[P,L]of n){const F=[L,P.material.id,P.castShadow,P.receiveShadow,P.renderOrder,P.geometry.index!==null].join(":");v.has(F)||v.set(F,[]),v.get(F).push(P)}for(const P of v.values()){if(P.length<2)continue;const L=P[0],F=P.map(M=>M.geometry.clone().applyMatrix4(M.matrix)),S=n0(F);if(S){S.computeBoundingSphere(),x(S,L.material,[0,0,0],{cast:L.castShadow,receive:L.receiveShadow,order:L.renderOrder});for(const M of P)i.remove(M)}}n.length=0;let N=0;for(const P of e.values()){const{geometry:L,material:F,cast:S,receive:M,region:C,matrices:tt,colors:et,hasColors:Y}=P,K=new Mu(L,F,tt.length);K.castShadow=S,K.receiveShadow=M,(C.startsWith("outside")||C.endsWith("copse"))&&(K.userData.exterior=!0),K.matrixAutoUpdate=!1;for(let at=0;at<tt.length;at++)K.setMatrixAt(at,tt[at]),Y&&K.setColorAt(at,et[at]??u.setHex(16777215));K.computeBoundingSphere(),i.add(K),N+=tt.length}return e.clear(),N}return{scene:i,mat:t,box:f,mesh:x,piece:m,line:A,finish:b}}function s0(i,t,e=!1){const n=nn(i),[r,s,o,a,c]=t,l=je(640,e?1152:896,(u,h,d)=>{u.fillStyle=r,u.fillRect(0,0,h,d);function p(f,A,b,v,N){u.fillStyle=N,u.beginPath(),u.moveTo(f,A-v),u.lineTo(f+b,A),u.lineTo(f,A+v),u.lineTo(f-b,A),u.closePath(),u.fill()}function _(f,A,b,v,N){u.save(),u.translate(f,A),u.fillStyle=v;for(let P=0;P<8;P++)u.rotate(Math.PI/4),u.beginPath(),u.ellipse(b*.58,0,b*.43,b*.21,0,0,Math.PI*2),u.fill();u.restore(),p(f,A,b*.3,b*.3,N)}u.strokeStyle=s,u.lineWidth=43,u.strokeRect(36,36,h-72,d-72);const x=[14,21,52,60,67,73,82];for(const[f,A]of x.entries())u.lineWidth=f%3===0?3:1.5,u.strokeStyle=f%3===0?o:a,u.strokeRect(A,A,h-A*2,d-A*2);for(let f=34;f<=h-30;f+=29)_(f,36,13,a,o),_(f,d-36,13,a,o);for(let f=65;f<=d-59;f+=28)_(36,f,12,a,o),_(h-36,f,12,a,o);const m=e?[d*.28,d*.5,d*.72]:[d*.5];for(const f of m){const A=e?118:188,b=e?122:237;p(h/2,f,A,b,o),p(h/2,f,A-5,b-6,s),p(h/2,f,A-16,b-18,c),p(h/2,f,A-25,b-30,r),_(h/2,f,e?57:78,o,c);for(let v=0;v<8;v++){const N=v*Math.PI/4;_(h/2+(A-52)*Math.cos(N),f+(b-66)*Math.sin(N),17,a,o)}}for(let f=106;f<d-100;f+=47)for(let A=110+f%2*16;A<h-96;A+=43)m.some(b=>Math.abs(A-h/2)/(e?127:201)+Math.abs(f-b)/(e?128:245)<1.04)||_(A,f,Nt(n,5,12),n()>.33?a:c,o);for(let f=0;f<16500;f++)u.fillStyle=n()<.5?"#fff1cd13":"#15130f16",u.fillRect(n()*h,n()*d,1+n()*3,1);for(let f=0;f<d;f+=2)u.fillStyle="#18151117",u.fillRect(0,f,h,1)});return new Ce({color:16777215,map:l,roughness:.98,side:ve})}function ll(i,t){const e=nn(i),n=t==="hills"?"#c9b58d":"#a69b75",r=je(448,352,(s,o,a)=>{if(s.fillStyle=n,s.fillRect(0,0,o,a),t==="hills"){const c=["#ada389","#8d8a70","#797e62","#636d4e","#47553f","#393b2d"];for(let l=0;l<c.length;l++){s.fillStyle=c[l],s.beginPath(),s.moveTo(0,a);for(let u=0;u<=o+4;u+=4){const h=u*.014,d=121+l*29+Math.sin(h+l*1.9)*(16+l*2)+Math.sin(h*1.7)*14;s.lineTo(u,d)}s.lineTo(o,a),s.fill()}s.strokeStyle="#b8a178",s.lineWidth=4,s.beginPath(),s.moveTo(341,352),s.quadraticCurveTo(235,260,150,307),s.quadraticCurveTo(127,313,202,280),s.stroke()}else{s.strokeStyle="#5e6650",s.lineWidth=2;for(const c of[129,202,255,279,319]){s.beginPath(),s.moveTo(208,320),s.quadraticCurveTo(215,217,c,92+e()*90),s.stroke();for(let l=.27;l<.95;l+=.12){const u=Hr(208,c,l),h=300-180*l;s.save(),s.translate(u,h),s.rotate((e()-.5)*1.8),s.fillStyle=Ze(e,["#6b7258","#78805f","#826443"]),s.beginPath(),s.ellipse(7,0,16+e()*10,4+e()*6,0,0,Math.PI*2),s.fill(),s.restore()}}s.strokeStyle="#6e6047",s.strokeRect(21,21,o-42,a-42)}for(let c=0;c<6500;c++)s.fillStyle=e()<.5?"#eee1be25":"#3b352523",s.fillRect(e()*o,e()*a,1+e()*4,1+e()*2)});return new Ce({map:r,color:15392186,roughness:.9})}const Ls=Math.PI*2,Ds=[12223827,11828816,12750429,11105610,12093021,10777678,11236686,12882265,11500625,12158809];function o0(i,t){const{box:e,line:n,piece:r,mesh:s,mat:o}=i,a=nn(16495),c=[],l=[13080649,7113592,10710093,12956021,8624013].map(D=>new Ce({color:D,side:ve,roughness:.65,emissive:D,emissiveIntensity:.4}));function u(D,H,$,G){const ct=Math.sin($),Z=Math.cos($),lt=(w,j,E=0)=>[D+Z*w+ct*E,j,H-ct*w+Z*E];return{at:lt,turn:$,cell:G,block(w,j,E,B,O,I,U,z={}){e(...lt(w,j,E),B,O,I,U,{rot:[0,$,0],cell:G,...z})},rod(w,j,E,B,O,I,U,z={}){n(lt(w,j,O),lt(E,B,O),I,U,{cell:G,...z})},form(w,j,E,B,O,I=0,U={}){const z=new zo;w.forEach(([rt,y],g)=>g?z.lineTo(rt,y):z.moveTo(rt,y)),z.closePath();const W=I?new Ho(z,{depth:I,bevelEnabled:!1,curveSegments:1}):new Vo(z);return s(W,O,lt(j,E,B),{rot:[0,$,0],combine:O.transparent?void 0:G,...U})}}}const h=u(0,ot.north,0,"north-wall"),d=u(0,ot.south,Math.PI,"south-wall"),p=u(ot.east,0,-Math.PI/2,"east-wall"),_=u(ot.west,0,Math.PI/2,"west-wall"),x=u(ot.alcoveWest,0,Math.PI/2,"alcove-west"),m=u(0,ot.alcoveNorth,0,"alcove-north"),f=u(0,ot.alcoveSouth,Math.PI,"alcove-south");function A(D,H,$=20){return Array.from({length:$+1},(G,ct)=>{const Z=Math.PI*(1-ct/$);return[D*.5*Math.cos(Z),H*Math.sin(Z)]})}function b(D,H,$,G,ct,Z=o.plaster){$-H<.001||ct-G<.001||D.block((H+$)/2,(G+ct)/2,-.165,$-H,ct-G,.33,Z)}function v(D,H,$,G=.86){if($-H<.18)return;const ct=(H+$)/2,Z=$-H;D.block(ct,G/2,.023,Z,G,.049,o.sage),D.block(ct,.083,.062,Z,.145,.09,o.oakDark),D.block(ct,.169,.065,Z,.045,.096,o.oakWarm),D.block(ct,G-.059,.052,Z,.029,.079,o.oakDark),D.block(ct,G,.058,Z+.02,.065,.109,o.oak);const lt=Z/Math.max(1,Math.round(Z/.84));for(let w=H+lt;w<$-.05;w+=lt)D.block(w,(G+.14)/2,.063,.042,G-.19,.062,o.oakDark),D.block(w+.03,(G+.14)/2,.058,.012,G-.18,.053,o.edge)}function N(D,H,$,G,ct,Z=o.plaster){let lt=H;for(const w of ct){const{u:j,width:E,sill:B,spring:O,rise:I}=w,U=j-E/2,z=j+E/2;b(D,lt,U,0,G,Z),b(D,U,z,0,B,Z);const W=A(E,I);W.push([E/2,G-O],[-E/2,G-O]),D.form(W,j,O,-.33,Z,.33),lt<U&&v(D,lt,U),B>.15&&v(D,U,z,Math.min(.86,B-.09)),lt=z}b(D,lt,$,0,G,Z),v(D,lt,$)}function P(D,H,$,G,ct,Z,lt){const{sill:w,spring:j,width:E,rise:B}=$,O=H-E/2-G,I=H+E/2+G;D.rod(O,w,O,j,lt,ct,Z,{square:!0}),D.rod(I,w,I,j,lt,ct,Z,{square:!0});const U=A(E+2*G,B+G,28);for(let z=1;z<U.length;z++){const W=U[z-1],rt=U[z];D.rod(H+W[0],j+W[1],H+rt[0],j+rt[1],lt,ct,Z,{square:!0})}}function L(D,H,$=!1){const{u:G,width:ct,sill:Z,spring:lt,rise:w}=H,j=ct/2,E=[D.at(G-j-.17,Z-.12,-.37),D.at(G+j+.17,lt+w+.15,.23)].map(g=>new V(...g));c.push(new Rn().setFromPoints(E));const B=A(ct,w),O=[[-j,Z-lt],[j,Z-lt],...B.slice().reverse()];D.form(O,G,lt,-.159,o.glass,0,{cast:!1,receive:!1,order:1});const I=[...A(ct+.36,w+.18),...B.slice().reverse()];D.form(I,G,lt,-.072,o.limestone,.137);for(const g of[G-j,G+j])D.block(g+(g<G?-.089:.089),(lt+Z)/2,-.032,.178,lt-Z,.46,o.limestone),D.block(g,(lt+Z)/2,-.052,.091,lt-Z,.24,o.oakDark),D.block(g+(g<G?-.151:.151),(lt+Z)/2,.07,.02,lt-Z,.042,o.ashStone);P(D,G,H,.008,.073,o.oakDark,-.027),P(D,G,H,.088,.029,o.oakWarm,.062),P(D,G,H,-.046,.028,o.iron,-.149),D.block(G,Z-.051,.035,ct+.49,.112,.59,o.limestone),D.block(G,Z-.106,.174,ct+.51,.04,.365,o.ashStone),D.block(G,Z+.035,-.079,ct+.031,.085,.28,o.oakDark),D.block(G,lt,-.124,ct,.085,.146,o.oakDark),D.block(G,lt+.041,-.039,ct,.021,.053,o.oakWarm);for(const g of[-1/6,1/6]){const R=g*ct,k=lt+w*Math.sqrt(1-(R/j)**2);D.block(G+R,(Z+k)/2,-.136,.047,k-Z,.1,o.iron),D.block(G+R+.018,(Z+k)/2,-.081,.017,k-Z,.025,o.oakWarm)}const U=$?[.43,.78]:[.22,.46,.69,.87];for(const g of U){const R=Z+(lt-Z)*g;D.block(G,R,-.132,ct-.04,g===U[0]?.052:.028,.09,o.iron)}const z=Z+Math.min(1.11,(lt-Z)*.45);for(const g of[G-.16,G+.16])D.block(g,z,-.06,.047,.114,.025,o.brass),D.rod(g,z-.008,g+(g<G?-.064:.064),z+.043,-.019,.025,o.bronze);const W=lt+w*.42,rt=Math.min(w*.32,ct*.15),y=14;for(let g=0;g<y;g++){const R=g*Ls/y,k=(g+1)*Ls/y;D.rod(G+Math.cos(R)*rt,W+Math.sin(R)*rt,G+Math.cos(k)*rt,W+Math.sin(k)*rt,-.098,.025,o.iron)}for(let g=0;g<6;g++){const R=g*Ls/6,k=(X,mt)=>[Math.cos(mt)*X,Math.sin(mt)*X];D.form([[0,0],k(rt*.65,R-.31),k(rt*.96,R),k(rt*.65,R+.31)],G,W,-.133,l[g%3+1],0,{cast:!1,receive:!1,combine:"stained glass"});const J=k(rt*.92,R);D.rod(G,W,G+J[0],W+J[1],-.11,.014,o.iron)}for(const g of[-1,1]){const R=g*ct*.33,k=Z+(lt-Z)*($?.17:.1),J=.083*ct,X=Math.min(.29,(lt-Z)*.075),mt=[[0,-X],[J,0],[0,X],[-J,0]];D.form(mt,G+R,k,-.133,l[g===1?0:4],0,{cast:!1,receive:!1,combine:"stained glass"});for(let _t=0;_t<mt.length;_t++){const At=mt[_t],It=mt[(_t+1)%mt.length];D.rod(G+R+At[0],k+At[1],G+R+It[0],k+It[1],-.104,.013,o.iron)}}if(D.block(G,lt+w+.11,.071,.205,.278,.175,o.limestone),!$){D.block(G,lt+w+.13,.176,.092,.171,.047,o.ashStone);for(const g of[-1,1])D.block(G+g*(j+.092),lt-.015,.143,.23,.125,.286,o.ashStone)}}const F=[{u:-5.07,width:3.13,sill:.83,spring:5.91,rise:1.53},{u:-.35,width:3.38,sill:.83,spring:6.09,rise:1.63},{u:4.5,width:3.1,sill:.83,spring:5.91,rise:1.53}],S=[{u:-2.57,width:2.92,sill:1.27,spring:5.93,rise:1.48},{u:4.28,width:3.62,sill:4.38,spring:6.32,rise:1.55},{u:8.53,width:2.38,sill:1,spring:5.99,rise:1.25}];N(h,ot.west,ot.east,ot.roof,F),N(_,-ot.south,-ot.alcoveSouth,ot.roof,[S[0]]),N(_,-ot.alcoveNorth,-ot.north,ot.roof,[S[2]]);const M=S[1];b(_,-ot.alcoveSouth,M.u-M.width/2,3.96,ot.roof),b(_,M.u+M.width/2,-ot.alcoveNorth,3.96,ot.roof),b(_,M.u-M.width/2,M.u+M.width/2,3.96,M.sill),_.form([...A(M.width,M.rise),[M.width/2,ot.roof-M.spring],[-M.width/2,ot.roof-M.spring]],M.u,M.spring,-.33,o.plaster,.33),N(p,ot.north,ot.south,ot.roof,[]),N(d,-ot.east,-ot.west,ot.roof,[]);for(const D of F)L(h,D);for(const D of S)L(_,D);const C={u:4.26,width:3.53,sill:.89,spring:2.98,rise:.71},tt={u:-9.47,width:2.6,sill:1.02,spring:2.95,rise:.7};N(x,-ot.alcoveSouth,-ot.alcoveNorth,4.18,[C],o.alcove),N(m,ot.alcoveWest,ot.west,4.18,[tt],o.alcove),N(f,-ot.west,-ot.alcoveWest,4.18,[],o.alcove),L(x,C,!0),L(m,tt,!0);function et(D,H,$,G,ct,Z){const w=H-D-.38,j=Math.ceil(w/.247),E=w/j;e((D+H)/2,ct-.066,($+G)/2,H-D,.102,G-$,o.oakDark,{cell:Z,cast:ct>0});for(let B=0;B<j;B++){const O=D+.19+(B+.5)*E;let I=$+.19;for(let U=0;I<G-.19-.01;U++){const z=Math.min(I+(U===0?Nt(a,.55,2.6):Nt(a,1.63,3.39)),G-.19),W=Ze(a,[o.floor,o.floorAlt,o.floorQuiet]);e(O,ct-.021,(I+z)/2,E-.005,.043,z-I-.008,W,{cell:Z,tint:Ze(a,Ds),cast:!1,rot:[0,a()<.5?0:Math.PI,0]}),I=z}}for(const B of[D+.19/2,H-.19/2])e(B,ct-.021,($+G)/2,.19-.004,.044,G-$,o.oak,{cell:Z,cast:!1});for(const B of[$+.19/2,G-.19/2])e((D+H)/2,ct-.021,B,.19-.004,.044,H-D-.19*2,o.oak,{cell:Z,cast:!1,rot:[0,Math.PI/2,0]});for(const B of[D+.19-.019,H-.19+.019])e(B,ct+.003,($+G)/2,.014,.003,G-$-.39,o.edge,{cell:Z,cast:!1})}et(ot.west,ot.east,ot.north,ot.south,0,"lower-floor"),et(ot.alcoveWest,ot.west,ot.alcoveNorth,ot.alcoveSouth,0,"alcove-floor"),et(ot.galleryInner,ot.east,ot.galleryNorth,ot.galleryFront,ot.galleryY,"east-deck"),et(ot.west,ot.east,ot.galleryFront,ot.south,ot.galleryY,"south-deck");for(const D of[2.04,6.48])_.block(D,1.96,.032,.244,3.92,.39,o.oakDark),_.block(D,.153,.092,.35,.29,.42,o.oak),_.block(D,3.79,.12,.39,.302,.45,o.oak),_.block(D,1.97,.239,.104,3.28,.028,o.edge),t.add(ot.west+.04,-D,.31,.26,0,3.9);_.block(4.265,3.964,.021,5.1,.239,.49,o.oakDark),_.block(4.265,3.835,.11,5.08,.065,.24,o.oakWarm),_.block(4.265,4.078,.11,5.12,.043,.23,o.edge),e(-9.53,4.207,-4.265,3.64,.158,4.97,o.ceiling,{cell:"alcove-roof"});for(const D of[-6.34,-5.12,-3.41,-2.18])e(-9.53,4.079,D,3.67,.169,.179,o.oakDark,{cell:"alcove-roof"}),e(-9.53,3.99,D,.187,.032,3.65,o.oakWarm,{cell:"alcove-roof",rot:[0,Math.PI/2,0]});e(0,ot.roof+.054,-.84,16.1,.241,19.61,o.ceiling,{cell:"roof"});const Y=[-7.57,-3.89,-.13,3.68,7.6],K=[-10.15,-6.4,-2.61,1.21,4.92,8.44];for(const D of Y)e(D,8.68,-.83,.29,.41,19.04,o.oakDark,{cell:"roof"}),e(D,8.463,-.83,.193,.055,19.04,o.oakWarm,{cell:"roof"});for(const D of K)e(0,8.64,D,.34,.47,15.48,o.oakDark,{cell:"roof",rot:[0,Math.PI/2,0]}),e(0,8.399,D,.19,.062,15.48,o.oakWarm,{cell:"roof",rot:[0,Math.PI/2,0]});for(let D=0;D<Y.length-1;D++)for(let H=0;H<K.length-1;H++){const[$,G,ct,Z]=[Y[D],Y[D+1],K[H],K[H+1]];for(const lt of[$+.27,G-.27])e(lt,8.749,(ct+Z)/2,.058,.115,Z-ct-.37,o.oak,{cell:"roof"});for(const lt of[ct+.28,Z-.28])e(($+G)/2,8.749,lt,.058,.115,G-$-.37,o.oak,{cell:"roof",rot:[0,Math.PI/2,0]});r("cyl",[($+G)/2,8.811,(ct+Z)/2],[.26,.054,.26],o.oak,{cast:!1,cell:"roof"}),r("cyl",[($+G)/2,8.779,(ct+Z)/2],[.122,.02,.122],o.brassDark,{cast:!1,cell:"roof"})}for(const[D,H,$]of[[h,ot.west,ot.east],[d,-ot.east,-ot.west],[p,ot.north,ot.south],[_,-ot.south,-ot.north]]){D.block((H+$)/2,8.257,.063,$-H,.145,.218,o.oakDark),D.block((H+$)/2,8.155,.069,$-H,.063,.159,o.oakWarm);for(let G=H+.31;G<$-.19;G+=.36)D.block(G,8.202,.17,.1,.112,.043,o.oak,{cast:!1})}function at(D,H,$=8.22){D.block(H,$/2,.018,.277,$,.285,o.sage),D.block(H,.27,.139,.389,.54,.266,o.limestone),D.block(H,.529,.164,.415,.079,.317,o.ashStone),D.block(H,1.12,.161,.329,.166,.259,o.oak),D.block(H,$-.2,.118,.401,.275,.33,o.oakDark),D.block(H,$-.35,.155,.346,.054,.35,o.oakWarm),D.block(H,$-.09,.142,.458,.084,.375,o.oakWarm);for(const G of[-1,1])D.block(H+G*.094,($+1.21)/2,.167,.014,$-1.6,.031,o.pale)}for(const D of[-7.52,-2.78,1.94,7.52])at(h,D);for(const D of[-6.94,-.81,1.63,6.85,10.11])at(_,D);for(const D of[ot.north+.21,-5.5,-.93,3.62,ot.south-.19])at(p,D);for(const D of[-7.52,-2.04,1.92,7.54])at(d,D);function dt(D,H,$){const G={cell:$};e(D,1.6,H,.245,3.2,.245,o.oakDark,G),e(D,.19,H,.375,.378,.371,o.oak,G),e(D,.07,H,.415,.14,.41,o.walnut,G),e(D,.402,H,.33,.076,.33,o.oakWarm,G),e(D,2.91,H,.386,.32,.386,o.oak,G),e(D,3.03,H,.431,.132,.426,o.oakWarm,G);for(const ct of[-1,1])e(D+ct*.079,1.59,H-.128,.019,2.18,.021,o.edge,{...G,cast:!1}),e(D-.128,1.59,H+ct*.079,.021,2.18,.019,o.edge,{...G,cast:!1});t.add(D,H,.37,.37,0,3.25)}function nt(D,H,$,G,ct){const Z=(w,j)=>$==="x"?[D+G*w,j,H]:[D,j,H+G*w],lt=[[.11,2.39],[.16,2.52],[.225,2.65],[.32,2.75],[.44,2.84],[.61,2.9],[.78,2.93]];for(let w=1;w<lt.length;w++)n(Z(...lt[w-1]),Z(...lt[w]),.15-.007*w,o.oak,{square:!0,cell:ct});for(const w of[2.52,2.68,2.84])r("ball",[D-.127,w,H-.118],[.027,.027,.027],o.iron,{cell:ct,cast:!1})}for(const D of[-8.72,-5.1,-.6,3.74,5.74])dt(ot.galleryInner+.06,D,"east-posts"),D>-8.7&&nt(ot.galleryInner+.06,D,"z",-1,"east-posts"),D<5.6&&nt(ot.galleryInner+.06,D,"z",1,"east-posts");for(const D of[-7.53,-4.41,-.5])dt(D,ot.galleryFront+.085,"south-posts"),D>-7.5&&nt(D,ot.galleryFront+.085,"x",-1,"south-posts"),nt(D,ot.galleryFront+.085,"x",1,"south-posts");for(let D=-8.69;D<=5.73;D+=.96)e(6.23,3.17,D,3.04,.195,.135,o.oakDark,{cell:"east-deck"});for(let D=-7.51;D<7.6;D+=.72)e(D,3.176,7.12,.136,.177,3.01,o.oakDark,{cell:"south-deck"});function gt(D,H,$,G,ct){for(const[w,j,E]of[[3.221,.235,o.walnut],[3.355,.135,o.oakWarm],[3.096,.103,o.oak]])n([D,w,H],[$,w,G],j,E,{square:!0,cell:ct});const Z=Math.hypot($-D,G-H),lt=Math.floor(Z/.44);for(let w=0;w<lt;w++){const j=(w+.5)/lt,E=D+($-D)*j,B=H+(G-H)*j;e(E,3.209,B,.248,.078,.248,o.oak,{cell:ct,cast:!1}),r("ball",[E-.106,3.219,B-.097],[.03,.03,.03],o.brassDark,{cell:ct,cast:!1})}}gt(ot.galleryInner+.032,ot.galleryNorth,ot.galleryInner+.032,ot.galleryFront,"east-fascia"),gt(ot.galleryInner,ot.galleryNorth,ot.east,ot.galleryNorth,"east-fascia"),gt(ot.west,ot.galleryFront+.045,ot.stairLeft,ot.galleryFront+.045,"south-fascia"),gt(ot.stairRight,ot.galleryFront+.045,ot.galleryInner,ot.galleryFront+.045,"south-fascia");function pt(D,H,$,G,ct=.16){const Z={cell:G};e(D,H+.5,$,ct,1,ct,o.oakDark,Z),e(D,H+.085,$,ct+.061,.17,ct+.061,o.oak,Z),e(D,H+.918,$,ct+.064,.136,ct+.064,o.oakWarm,Z),e(D,H+1.008,$,ct+.104,.045,ct+.104,o.oakDark,Z),r("sphere",[D,H+1.074,$],[.11,.12,.11],o.bronze,Z)}function ft(D,H,$,G,ct){const Z=ot.galleryY,lt=Math.hypot($-D,G-H),w=Math.max(2,Math.round(lt/.156)),j=($-D)/lt,E=(G-H)/lt,B=(U,z)=>[D+($-D)*U,Z+z,H+(G-H)*U],O={cell:ct};n(B(0,.987),B(1,.987),.103,o.oakDark,{...O,square:!0}),n(B(0,1.028),B(1,1.028),.061,o.oakWarm,{...O,square:!0}),n(B(0,.095),B(1,.095),.045,o.iron,{...O,square:!0}),n(B(0,.825),B(1,.825),.035,o.iron,{...O,square:!0});for(let U=1;U<w;U++){const z=U/w;n(B(z,.08),B(z,.967),.022,o.iron,O);const[W,,rt]=B(z,0);if(U%4===1){const y=[W-j*.063,Z+.472,rt-E*.063],g=[W+j*.063,Z+.472,rt+E*.063];for(const R of[y,g])n(R,B(z,.587),.019,o.ironEdge,O),n(R,B(z,.355),.019,o.ironEdge,O);r("ball",B(z,.478),[.056,.065,.056],o.bronze,{...O,cast:!1})}else U%4===3&&r("ball",B(z,.477),[.045,.077,.045],o.ironEdge,O)}const I=Math.ceil(lt/3.2);for(let U=0;U<=I;U++){const[z,,W]=B(U/I,0);pt(z,Z,W,ct)}t.add((D+$)/2,(H+G)/2,Math.abs($-D)+.1,Math.abs(G-H)+.1,Z-.012,Z+1.11)}ft(ot.galleryInner+.07,ot.galleryNorth+.04,ot.galleryInner+.07,ot.galleryFront+.05,"east-guard"),ft(ot.galleryInner+.07,ot.galleryNorth+.04,ot.east-.14,ot.galleryNorth+.04,"north-guard"),ft(ot.west+.12,ot.galleryFront+.055,ot.stairLeft,ot.galleryFront+.055,"south-guard"),ft(ot.stairRight,ot.galleryFront+.055,ot.galleryInner+.07,ot.galleryFront+.055,"landing-guard");const vt=(ot.galleryFront-ot.stairStart)/ot.stairSteps,Mt=ot.galleryY/ot.stairSteps,Rt=ot.stairRight-ot.stairLeft,st=(ot.stairLeft+ot.stairRight)/2;for(let D=0;D<ot.stairSteps;D++){const H=ot.stairStart+vt*(D+.5),$=Mt*(D+1);e(st,$/2-.012,H,Rt,$+.028,vt+.001,o.oakDark,{cell:"stair"}),e(st,$-.022,H-.028,Rt+.055,.075,vt+.068,o.floor,{cell:"stair",tint:Ds[D*7%Ds.length]}),e(st,$-.01,H-.16,Rt+.057,.039,.045,o.oakWarm,{cell:"stair"}),e(st,$+.025,H-.023,1.48,.015,vt+.04,o.stairCloth,{cell:"runner"}),e(st,$-Mt/2,H-vt/2-.005,1.48,Mt-.003,.017,o.stairCloth,{cell:"runner",cast:!1});for(const G of[st-.674,st-.627,st+.627,st+.674])e(G,$+.0345,H-.026,.012,.004,vt+.028,o.stairStripe,{cell:"runner",cast:!1}),e(G,$-Mt/2,H-vt/2-.017,.012,Mt-.009,.008,o.stairStripe,{cell:"runner",cast:!1});n([st-.765,$+.04,H+.105],[st+.765,$+.04,H+.105],.014,o.bronze,{cell:"runner",cast:!1});for(const G of[st-.765,st+.765])r("ball",[G,$+.04,H+.105],[.043,.038,.043],o.brass,{cell:"runner"})}for(const D of[ot.stairLeft,ot.stairRight]){const H=D===ot.stairLeft?-.012:.012,$=D+H,G=ot.stairStart+.01,ct=ot.galleryFront+.065,Z=[$,.94,G],lt=[$,ot.galleryY+1.011,ct];n(Z,lt,.115,o.oakDark,{square:!0,cell:"stair-guard"}),n([$,Z[1]+.043,Z[2]],[$,lt[1]+.043,lt[2]],.061,o.oakWarm,{square:!0,cell:"stair-guard"}),n([$,.107,G],[$,ot.galleryY+.019,ct],.169,o.walnut,{square:!0,cell:"stair"}),n([$+H*6,.129,G],[$+H*6,ot.galleryY+.046,ct],.038,o.edge,{square:!0,cell:"stair"}),pt($,.083,G,"stair-guard",.194);for(let E=1;E<37;E++){const B=E/37,O=G+(ct-G)*B,I=ot.galleryY*B;n([$,I+.105,O],[$,.94+(lt[1]-.94)*B,O],.025,o.iron,{cell:"stair-guard"}),E%3===0&&r("ball",[$,I+.53,O],[.055,.093,.055],o.ironEdge,{cell:"stair-guard"})}const w=u($+H*4,0,-Math.PI/2,"stair-panels"),j=ot.galleryY/(ot.galleryFront-ot.stairStart);for(let E=1.11;E<ot.galleryFront-.61;E+=.76){const O=(E-.315-ot.stairStart)*j,I=(E+.63/2-ot.stairStart)*j;w.form([[-.63/2,.08],[.63/2,.08],[.63/2,I-.13],[-.63/2,O-.13]],E,0,0,o.oak,.027,{cast:!1}),w.form([[-.63/2+.047,.143],[.63/2-.047,.143],[.63/2-.047,I-.237],[-.63/2+.047,O-.216]],E,0,.03,o.walnut,.012,{cast:!1})}t.add($,(G+ct)/2,.126,ct-G+.027,0,4.53)}for(const D of[0,1]){const H=(D-.5)*.824;d.block(H,1.243,.103,.807,2.486,.123,o.oakDark);for(const[G,ct]of[[.44,.61],[1.569,1.05]]){d.block(H,G,.168,.622,ct,.044,o.walnut),d.block(H,G,.192,.488,ct-.109,.032,o.oak);for(const Z of[-1,1])d.block(H+Z*.284,G,.204,.024,ct,.044,o.edge)}d.block(H,1.031,.211,.641,.071,.071,o.oakWarm);const $=H+(D?-.294:.294);d.block($,1.128,.208,.087,.181,.053,o.bronze),r("sphere",d.at($,1.149,.294),[.098,.075,.092],o.brass,{cell:"south-wall"});for(const G of[.35,2.11])d.block(H+(D?.367:-.367),G,.225,.095,.093,.028,o.iron)}for(const D of[-.888,.888])d.block(D,1.27,.107,.138,2.54,.249,o.oak),d.block(D,1.27,.243,.029,2.54,.035,o.edge);return d.block(0,2.536,.144,1.92,.121,.257,o.oakDark),d.block(0,2.61,.15,1.98,.066,.284,o.oakWarm),d.block(0,.015,.24,1.73,.035,.48,o.slate),c}const Bi=new V;function ze(i,t,e,n,r,s){const o=2*Math.PI*r/4,a=Math.max(s-2*r,0),c=Math.PI/4;Bi.copy(t),Bi[n]=0,Bi.normalize();const l=.5*o/(o+a),u=1-Bi.angleTo(i)/c;return Math.sign(Bi[e])===1?u*l:a/(o+a)+l+l*(1-u)}class Vr extends Kn{constructor(t=1,e=1,n=1,r=2,s=.1){const o=r*2+1;if(s=Math.min(t/2,e/2,n/2,s),super(1,1,1,o,o,o),this.type="RoundedBoxGeometry",this.parameters={width:t,height:e,depth:n,segments:r,radius:s},o===1)return;const a=this.toNonIndexed();this.index=null,this.attributes.position=a.attributes.position,this.attributes.normal=a.attributes.normal,this.attributes.uv=a.attributes.uv;const c=new V,l=new V,u=new V(t,e,n).divideScalar(2).subScalar(s),h=this.attributes.position.array,d=this.attributes.normal.array,p=this.attributes.uv.array,_=h.length/6,x=new V,m=.5/o;for(let f=0,A=0;f<h.length;f+=3,A+=2)switch(c.fromArray(h,f),l.copy(c),l.x-=Math.sign(l.x)*m,l.y-=Math.sign(l.y)*m,l.z-=Math.sign(l.z)*m,l.normalize(),h[f+0]=u.x*Math.sign(c.x)+l.x*s,h[f+1]=u.y*Math.sign(c.y)+l.y*s,h[f+2]=u.z*Math.sign(c.z)+l.z*s,d[f+0]=l.x,d[f+1]=l.y,d[f+2]=l.z,Math.floor(f/_)){case 0:x.set(1,0,0),p[A+0]=ze(x,l,"z","y",s,n),p[A+1]=1-ze(x,l,"y","z",s,e);break;case 1:x.set(-1,0,0),p[A+0]=1-ze(x,l,"z","y",s,n),p[A+1]=1-ze(x,l,"y","z",s,e);break;case 2:x.set(0,1,0),p[A+0]=1-ze(x,l,"x","z",s,t),p[A+1]=ze(x,l,"z","x",s,n);break;case 3:x.set(0,-1,0),p[A+0]=1-ze(x,l,"x","z",s,t),p[A+1]=1-ze(x,l,"z","x",s,n);break;case 4:x.set(0,0,1),p[A+0]=1-ze(x,l,"x","y",s,t),p[A+1]=1-ze(x,l,"y","x",s,e);break;case 5:x.set(0,0,-1),p[A+0]=ze(x,l,"x","y",s,t),p[A+1]=1-ze(x,l,"y","x",s,e);break}}static fromJSON(t){return new Vr(t.width,t.height,t.depth,t.segments,t.radius)}}function a0(i,t,e){const{scene:n,mat:r,mesh:s,box:o,piece:a,line:c}=i,l=nn(321568),u=new Vr(1,1,1,2,.175),h=new Vr(1,1,1,3,.25),d=new vi(.5,.32,1,10),p=new Jn(1,1),_=new Ge(0,0,0,"YXZ"),x=new Zn,m=new kr(.5,.042,6,28),f=new kr(.5,.042,4,14),A=new xi([[0,0],[.29,0],[.33,.063],[.37,.16],[.4,.35],[.32,.52],[.17,.66],[.12,.77],[.13,.9],[.178,.98],[.175,1],[.142,1],[.105,.88],[.097,.79]].map(E=>new Tt(...E)),20),b=new xi([[0,0],[.35,0],[.38,.05],[.402,.23],[.35,.46],[.22,.56],[.143,.65],[.13,.88],[.16,.91],[.152,.96],[.109,.96],[.087,.85]].map(E=>new Tt(...E)),14),v=new xi([[.4,0],[.474,.024],[.46,.08],[.411,.17],[.36,.41],[.26,.69],[.17,.94],[.15,1],[.11,1],[.133,.91],[.225,.66],[.31,.4],[.38,.16],[.4,.05],[.37,0]].map(E=>new Tt(...E)),20),N=new Fo({color:2038293,transparent:!0,depthWrite:!1,opacity:.3,map:je(96,96,(E,B,O)=>{const I=E.createRadialGradient(B/2,O/2,4,B/2,O/2,47);I.addColorStop(0,"#ffffffff"),I.addColorStop(.42,"#ffffff8c"),I.addColorStop(1,"#ffffff00"),E.fillStyle=I,E.fillRect(0,0,B,O)})}),P={cell:"small-details",cast:!1};function L(E,B,O,I,U){const z=Math.sin(I),W=Math.cos(I),rt={cell:U,rot:[0,I,0]},y=(g,R,k)=>[E+W*g+z*k,B+R,O-z*g+W*k];return{yaw:I,from:y,cell:U,block(g,R,k,J,X,mt,_t,At){o(...y(g,R,k),J,X,mt,_t,{...rt,...At})},shape(g,R,k,J,X,mt,_t,At,It=0,St=0,Ct={}){x.setFromEuler(_.set(It,I,St,"YXZ")),a(g,y(R,k,J),[X,mt,_t],At,{cell:U,quat:x,...Ct})},path(g,R,k,J={}){for(let X=1;X<g.length;X++)c(y(...g[X-1]),y(...g[X]),R,k,{cell:U,...J})},obstruction(g,R,k,J=0,X=0){const[mt,,_t]=y(J,0,X);t.add(mt,_t,Math.abs(W)*g+Math.abs(z)*R,Math.abs(z)*g+Math.abs(W)*R,B,B+k)}}}function F(E,B,O,I,U,z){const W=s(p,N,[E,B+.003,O],{cast:!1,receive:!1,order:3,combine:B>0?"contacts-upstairs":"contacts-downstairs"});W.rotation.set(-Math.PI/2,0,-z),W.scale.set(I,U,1),W.updateMatrix()}function S(E,B,O,I,U,z,W,rt=!1){const y="rug-"+W;o(E,B+.011,O,I,.021,U,r.rugEdge,{cell:y,cast:!1}),a("plane",[E,B+.023,O],[I,U,1],s0(W,z,rt),{rot:[-Math.PI/2,0,0],cell:y,cast:!1});const g=nn(W+108),R=Math.floor(I/.027);for(const k of[-1,1])for(let J=0;J<R;J++){const X=E-I/2+(J+.5)*I/R,mt=O+k*(U/2+.027);o(X,B+.009,mt,Nt(g,.008,.016),.007,Nt(g,.041,.084),r.linen,{cell:y,cast:!1,tint:Ze(g,[13085304,11245418,12760982,10783065]),rot:[0,Nt(g,-.23,.23),0]})}}function M(E,B,O,I,U,z,W=1){const rt=L(E,B,O,I,z),y=U===r.tanLeather?r.pipingLight:r.pipingDark,g=U===r.greenLeather?r.brassDark:r.bronze,R=.91*W,k=.87;F(E,B,O,R*1.3,k*1.35,I);for(const J of[-.34,.34])for(const X of[-.317,.307])rt.shape(d,J*W,.094,X,.088,.188,.083,r.walnut,X<0?-.16:.06,J*-.23),X>0&&rt.shape("cyl",J*W,.029,X+.012,.069,.049,.069,r.bronze);rt.shape(u,0,.257,-.017,R,.23,k,U),rt.shape(u,0,.395,.052,R*.72,.171,.689,U,.027),rt.shape(u,0,.697,-.356,R*.97,.827,.211,U,-.16),rt.shape(h,0,.729,-.237,R*.74,.671,.209,U,-.185);for(const J of[-1,1]){const X=J*R*.421;rt.shape(u,X,.465,-.005,.173,.357,.807,U,-.007),rt.shape(h,X,.641,.019,.192,.169,.768,U,-.026),rt.path([[X-.069,.573,.397],[X-.078,.66,.363],[X-.046,.713,.33],[X+.051,.712,.346],[X+.086,.65,.373],[X+.067,.564,.4]],.013,y,{cast:!1});for(let mt=0;mt<5;mt++)rt.shape("ball",X-.054+mt*.027,.51+Math.sin(mt*.64)*.019,.402,.019,.019,.015,g,0,0,{cast:!1});rt.path([[X,.61,-.35],[X,.711,-.245],[X,.728,-.06],[X,.729,.17],[X,.705,.32]],.012,y,{cast:!1})}rt.path([[-R*.345,.386,.299],[-R*.3,.412,.378],[0,.421,.396],[R*.3,.413,.378],[R*.345,.386,.299]],.012,y,{cast:!1}),rt.path([[-R*.445,.232,.358],[-R*.39,.222,.418],[R*.39,.222,.418],[R*.445,.248,.358]],.014,y,{cast:!1});for(let J=0;J<17;J++){const X=(J-8)*R*.0475;rt.shape("ball",X,.24+Math.abs(J-8)*.0025,.425,.017,.017,.014,g,0,0,{cast:!1})}for(const[J,X]of[[.68,3],[.86,4],[.992,3]])for(let mt=0;mt<X;mt++){const _t=(mt-(X-1)/2)*R*.149,At=-.129-(J-.68)*.18;rt.shape("ball",_t,J,At,.03,.025,.017,y,0,0,{cast:!1})}rt.obstruction(R+.025,k,1.12)}function C(E,B,O,I,U,z=!0){const W=L(E,B,O,I,U);F(E,B,O,.66,.69,I);for(const rt of[-.174,.174]){for(const y of[-.177,.17])W.shape(d,rt,.219,y,.059,.428,.059,r.oakDark,y*.31,-rt*.29);W.path([[rt,.416,-.178],[rt,.652,-.201],[rt,.899,-.247]],.052,r.oak,{square:!0}),W.path([[rt,.155,-.171],[rt,.168,.168]],.038,r.oakDark,{square:!0})}W.path([[-.165,.189,.14],[.165,.189,.14]],.04,r.oak,{square:!0}),W.shape(u,0,.435,0,.448,.076,.434,r.oakDark),z&&W.shape(u,0,.478,.009,.414,.066,.398,r.greenLeather),W.shape(u,0,.913,-.246,.428,.106,.057,r.oakWarm),W.block(0,.69,-.208,.334,.051,.037,r.oak);for(const rt of[-.104,0,.104])W.path([[rt,.502,-.183],[rt,.665,-.199],[rt*1.08,.886,-.237]],.029,r.oak,{square:!0});W.obstruction(.43,.46,.96,0,-.025)}function tt(E,B,O,I,U,z,W,rt){const y=L(E,B,O,W,rt);F(E,B,O,I*1.2,U*1.11,W),y.shape(u,0,z-.04,0,I+.012,.084,U+.011,r.oakWarm),y.block(0,z-.081,0,I-.015,.027,U-.018,r.oakDark);for(let g=0;g<6;g++){const R=(I-.039)/6;y.block((g-2.5)*R,z+.001,0,R-.002,.005,U-.044,r.floor,{cast:!1,tint:Ze(l,[10776900,12486996,11566409,12289875,13078868])})}for(const g of[-1,1]){const R=g*(U/2-.211);y.shape(u,0,.077,R,I-.166,.108,.183,r.oakDark),y.shape(u,0,z-.15,R,I-.105,.111,.13,r.oak);for(const k of[-1,1]){const J=k*(I/2-.205);y.shape(d,J,(z-.15)/2+.066,R,.117,z-.285,.129,r.oakDark,0,.061*k),y.block(J,z-.155,R,.138,.149,.151,r.oak),y.shape("ball",J,z-.15,R+g*.077,.03,.032,.019,r.iron,0,0,{cast:!1})}}y.block(0,.198,0,.118,.155,U-.331,r.oakDark),y.block(0,.263,0,.118,.026,U-.353,r.oak);for(const g of[-1,1])y.block(g*(I/2-.118),z-.129,0,.068,.117,U-.139,r.oak);y.obstruction(I,U,z+.017)}function et(E,B,O,I,U,z,W,rt){const y=L(E,B,O,I,rt);F(E,B,O,U*1.2,z*1.23,I),y.shape(u,0,W-.029,0,U,.067,z,r.oakWarm),y.block(0,W-.089,0,U-.086,.063,z-.069,r.oak);for(const g of[-1,1])for(const R of[-1,1])y.shape(d,g*(U*.5-.073),W*.434,R*(z*.5-.074),.058,W*.895,.054,r.oakDark,R*.056,-g*.052);y.block(0,.172,0,U-.165,.038,z-.125,r.oak),y.block(0,W-.092,z/2-.036,U-.174,.058,.019,r.oakDark),y.shape("ball",0,W-.09,z/2-.018,.037,.034,.026,r.brass,0,0,{cast:!1}),y.obstruction(U,z,W)}function Y(E,B,O,I,U,z){const W=L(E,B,O,0,z);F(E,B,O,I*1.15,I*1.15,0),W.shape("cyl",0,U-.027,0,I,.06,I,r.oakWarm),W.shape("cyl",0,U-.068,0,I*.91,.036,I*.91,r.oakDark),W.shape("cyl",0,U*.46,0,.1,U*.73,.1,r.oakDark),W.shape("sphere",0,U*.46,0,.139,U*.52,.139,r.oak),W.shape("cyl",0,.11,0,.19,.074,.19,r.oakWarm);for(let rt=0;rt<3;rt++){const y=rt*2*Math.PI/3+.18,g=Math.cos(y),R=Math.sin(y);W.path([[0,.152,0],[g*.128,.11,R*.128],[g*.248,.064,R*.248],[g*.277,.059,R*.277]],.055,r.oakDark)}W.obstruction(I*.96,I*.96,U)}function K(E,B,O,I,U,z){const W=new lh(I,U,z,2);W.position.set(E,B,O),n.add(W)}function at(E,B,O,I,U=!1,z="desk-lamps"){const W=L(E,B,O,I,z),rt=U?1.22:.42;W.shape("cyl",0,.022,0,U?.32:.227,.044,U?.32:.162,r.brassDark),W.shape("cyl",0,.05,0,U?.225:.155,.028,U?.225:.113,r.bronze),W.shape("cyl",0,rt/2,0,U?.024:.018,rt-.079,U?.024:.018,r.brass);for(const y of[.091,rt-.07])W.shape("sphere",0,y,0,.048,.05,.048,r.bronze);U?(W.shape(v,0,rt-.051,0,.456,.319,.456,r.goldenShade),W.shape("sphere",0,rt+.275,0,.048,.07,.048,r.bronze),W.shape("sphere",0,rt-.015,0,.083,.105,.083,r.bulb,0,0,{cast:!1}),W.shape(m,0,rt-.045,0,.404,.404,.14,r.brass,Math.PI/2)):(W.path([[0,rt-.042,0],[.107,rt-.009,.015],[.125,rt-.023,.032]],.019,r.bronze),W.path([[0,rt-.042,0],[-.107,rt-.009,.015],[-.125,rt-.023,.032]],.019,r.bronze),W.shape(v,0,rt-.085,.043,.335,.136,.214,r.lampShade),W.shape("sphere",0,rt-.081,.045,.091,.047,.078,r.bulb,0,0,{cast:!1}),W.shape(m,0,rt-.078,.043,.293,.186,.06,r.bronze,Math.PI/2),W.path([[.115,rt-.052,.06],[.124,rt-.16,.076],[.12,rt-.215,.075]],.006,r.brassDark),W.shape("ball",.12,rt-.218,.075,.018,.024,.018,r.brass))}function dt(E,B,O,I,U,z=8){const W=L(E,0,B,0,U),rt=8.817;W.shape("cyl",0,rt,0,.234,.069,.234,r.iron),W.shape("cyl",0,rt-.044,0,.12,.104,.12,r.bronze);for(let y=rt-.14,g=0;y>O+.93;y-=.129,g++)a(f,[E,y,B],[.065,.172,.064],r.iron,{cell:U,rot:[0,g%2*Math.PI/2,0]});W.shape("sphere",0,O+.94,0,.199,.25,.199,r.bronze),W.shape(m,0,O,0,I*2,I*2,.85,r.iron,Math.PI/2),W.shape(m,0,O+.036,0,I*2.007,I*2.007,.27,r.bronze,Math.PI/2),W.shape(m,0,O-.043,0,I*1.958,I*1.958,.34,r.ironEdge,Math.PI/2),W.shape("cyl",0,O+.214,0,.05,1.294,.05,r.iron),W.shape("sphere",0,O-.42,0,.128,.198,.128,r.bronze);for(let y=0;y<z;y++){const g=y*Math.PI*2/z,R=Math.cos(g)*I,k=Math.sin(g)*I;y%2===0&&W.path([[0,O+.88,0],[R*.4,O+.61,k*.4],[R*.76,O+.328,k*.76],[R,O+.065,k]],.03,r.iron),W.path([[R*.82,O,k*.82],[R*1.08,O-.093,k*1.08],[R*1.24,O+.001,k*1.24],[R*1.26,O+.137,k*1.26]],.044,r.iron),W.shape("cyl",R*1.26,O+.13,k*1.26,.127,.064,.127,r.bronze),W.shape(v,R*1.26,O+.12,k*1.26,.246,.251,.246,r.goldenShade,0,Math.PI),W.shape("sphere",R*1.26,O+.208,k*1.26,.064,.064,.064,r.bulb,0,0,{cast:!1})}}function nt(E,B,O,I,U){const z=L(E,B,O,I,U);z.shape(u,0,.012,.011,.123,.245,.045,r.iron),z.path([[0,-.041,.022],[0,-.061,.102],[0,-.049,.189],[0,-.009,.24],[0,.057,.246]],.035,r.bronze),z.shape(v,0,.081,.243,.201,.188,.201,r.goldenShade,0,Math.PI),z.shape("sphere",0,.174,.243,.05,.074,.05,r.bulb),z.shape("cyl",0,.072,.243,.127,.047,.127,r.bronze)}const gt=new Ce({color:15390122,roughness:.96,side:ve,map:je(512,512,(E,B,O)=>{const I=E.createRadialGradient(B/2,O/2,68,B/2,O/2,362);I.addColorStop(0,"#f3e6c7"),I.addColorStop(.8,"#dbca9e"),I.addColorStop(1,"#9c865e"),E.fillStyle=I,E.fillRect(0,0,B,O);for(let U=0;U<2;U++){const z=U*256;if(E.fillStyle="#665039",U===0){E.font="bold 17px Georgia, serif",E.fillText("Notes on the Upper Valley",21,61),E.strokeStyle="#8d7250",E.lineWidth=1,E.strokeRect(20,85,216,113);for(let W=0;W<5;W++)E.beginPath(),E.moveTo(22,169+W*4),E.quadraticCurveTo(99,92+W*4,142,128+W*7),E.quadraticCurveTo(197,155+W*4,234,123+W*4),E.stroke()}for(let W=U?69:221;W<465;W+=13){let rt=21+z+(W%6<2?10:0);for(E.fillStyle="#51463594";rt<225+z;){const y=3+9*l();E.fillRect(rt,W+l()*1.5,y,1+l()),rt+=y+2+l()*7}}E.fillStyle="#665039",E.font="13px Georgia, serif",E.textAlign="center",E.fillText(U===0?"36":"37",128+z,488),E.textAlign="left"}for(let U=0;U<3350;U++)E.fillStyle=l()>.5?"#664f2d19":"#fffaea23",E.fillRect(l()*B,l()*O,1+l()*3,1)})});function pt(E,B,O,I,U,z=.42,W=.31){const rt=L(E,B,O,I,U);rt.shape(u,0,.009,0,z+.025,.019,W+.022,r.oxblood);for(const X of[-1,1])for(let mt=0;mt<4;mt++)rt.block(X*z*.258,.016+mt*.0028,0,z*.48-mt*.002,.0027,W-mt*.002,mt%2?r.paper:r.oldPaper,{cast:!1});const y=[],g=[],R=[],k=22;for(let X=0;X<=k;X++){const mt=X/k,_t=mt-.5,At=.025+.029*Math.sin(Math.PI*(_t>0?2*_t:-_t*2))+Math.abs(_t)**2*.038;y.push(_t*z,At,-W/2,_t*z,At,W/2),g.push(mt,1,mt,0),X<k&&R.push(2*X,2*X+1,2*X+3,2*X,2*X+3,2*X+2)}const J=new pe;J.setAttribute("position",new jt(y,3)),J.setAttribute("uv",new jt(g,2)),J.setIndex(R),J.computeVertexNormals(),s(J,gt,[E,B,O],{rot:[0,I,0],cast:!1}),rt.path([[.004,.024,-W*.45],[.016,.058,-W*.07],[.027,.046,W*.15],[.016,.031,W*.58]],.009,r.brickCloth,{cast:!1})}function ft(E,B,O,I,U,z){let W=0;for(const[rt,y,g,R,k]of z){const J=-.5*y+(k??0);e.volume(U,E+Math.cos(I)*J,B+W+rt*.5,O-Math.sin(I)*J,I+Nt(l,-.035,.047),rt,y,g,R,-Math.PI/2),W+=rt+.003}}function vt(E,B,O,I=!1){const U=I?.74:1,z=I?b:A;a("cyl",[E,B+.006,O],[.149*U,.014,.149*U],r.porcelain,P),a(z,[E,B+.011,O],[.125*U,.104*U,.125*U],r.porcelain,P),a(m,[E+.053*U,B+.048*U,O],[.049*U,.052*U,.048*U],r.porcelain,{...P,rot:[0,0,.18]})}function Mt(E,B,O,I,U,z,W=!0){if(a(A,[E,B,O],[I,I,I],U,{cell:z}),!!W)for(let rt=0;rt<6;rt++){const y=rt*2.399,g=Nt(l,.13,.32)*I*1.7,R=Math.cos(y)*Nt(l,.065,.159),k=Math.sin(y)*Nt(l,.065,.152);c([E,B+I*.83,O],[E+R,B+I+g,O+k],.006,r.greenCloth,{cell:z,cast:!1});for(const J of[.43,.65,.85])a("sphere",[E+R*J,B+I+g*J,O+k*J],[.064,.014,.027],rt%2?r.greenCloth:r.celadon,{cell:z,rot:[Nt(l,-.4,.4),y+J*Math.PI,-.22],cast:!1})}}function Rt(E,B,O,I,U,z,W,rt){const y=L(E,B,O,z,rt);y.block(0,0,.005,I,U,.049,r.walnut);for(const R of[-1,1])y.block(R*(I/2-.015),0,.031,.049,U+.021,.074,r.oak),y.block(0,R*(U/2-.012),.031,I-.009,.046,.075,r.oak),y.block(R*(I/2-.056),0,.036,.013,U-.097,.034,r.brassDark,{cast:!1}),y.block(0,R*(U/2-.054),.036,I-.108,.013,.034,r.brassDark,{cast:!1});const g=s(p,W,y.from(0,0,.04),{rot:[0,z,0],cast:!1});g.scale.set(I-.13,U-.13,1),g.updateMatrix()}const st=new Ce({roughness:.71,color:14928284,map:je(768,384,(E,B,O)=>{E.fillStyle="#a3966e",E.fillRect(0,0,B,O);const I=[[[30,98],[58,60],[113,58],[143,76],[174,67],[196,92],[221,107],[210,133],[177,147],[156,178],[140,195],[109,188],[94,169],[79,167],[64,135]],[[151,184],[175,177],[214,194],[225,227],[209,249],[207,271],[189,303],[161,324],[159,298],[152,270],[162,242],[147,213]],[[223,71],[252,52],[282,61],[288,82],[273,109],[239,101]],[[311,124],[334,97],[371,97],[399,107],[427,88],[441,65],[486,72],[513,65],[551,72],[575,87],[620,83],[655,108],[672,136],[643,162],[619,170],[599,193],[574,184],[551,201],[538,176],[505,156],[478,174],[465,204],[444,199],[421,159],[388,153],[363,153],[340,139]],[[340,149],[372,145],[409,156],[432,184],[429,209],[403,246],[389,266],[363,248],[347,227],[352,209],[328,184]],[[588,227],[614,227],[622,240],[642,248],[663,251],[657,260],[630,259],[617,249],[601,241]],[[651,267],[682,253],[718,261],[729,282],[713,315],[685,327],[652,311],[637,291]],[[699,166],[710,154],[724,162],[724,194],[709,203]],[[719,329],[738,340],[728,357],[708,359]]];for(const[U,z]of I.entries()){E.fillStyle=["#797659","#8f805d","#aa9a75","#7e805e"][U%4],E.strokeStyle="#686042",E.lineWidth=2,E.beginPath(),E.moveTo(...z[0]);for(const[W,rt]of z.slice(1))E.lineTo(W,rt);E.closePath(),E.fill(),E.stroke()}for(let U=16;U<O;U+=24)E.fillStyle=U===184?"#59523a9f":"#5c564050",E.fillRect(0,U,B,1);for(let U=0;U<B;U+=32)E.fillStyle="#594e3866",E.fillRect(U,0,1,O);E.fillStyle="#4e4738",E.font="italic 12px Georgia, serif",E.fillText("Atlantic Ocean",230,215),E.fillText("Indian Ocean",467,274),E.fillText("Pacific Ocean",30,238);for(let U=0;U<6050;U++)E.fillStyle=U%2?"#392d1d24":"#ffe9ac2b",E.fillRect(l()*B,l()*O,1+l()*2,1+l()*2)})}),D=new Wn(.5,28,18);function H(E,B,O,I,U){const z=L(E,B,O,-.35,U);z.shape("cyl",0,.033*I,0,.342*I,.064*I,.342*I,r.oakDark),z.shape("cyl",0,.078*I,0,.293*I,.028*I,.293*I,r.bronze),z.shape("sphere",0,.145*I,0,.121*I,.17*I,.121*I,r.brassDark),z.shape(D,0,.382*I,0,.376*I,.376*I,.376*I,st,.26,-.23),z.shape(m,0,.382*I,0,.441*I,.441*I,.12*I,r.bronze,.14,-.28),z.shape(m,0,.375*I,0,.444*I,.444*I,.158*I,r.brass,Math.PI/2+.23),z.shape("sphere",.055*I,.612*I,-.019*I,.039*I,.045*I,.039*I,r.brass)}function $(E,B,O,I,U){const z=L(E,0,B,O,U);z.path([[-I/2,.681,0],[I/2,.681,0]],.069,r.iron),z.path([[-I/2,.153,0],[I/2,.153,0]],.064,r.iron);for(let W=-I/2;W<=I/2+.006;W+=.091){z.shape("cyl",W,.414,-.071,.055,.47,.055,r.iron),z.shape("cyl",W,.414,.059,.073,.504,.073,r.iron),z.shape("cyl",W,.414,.011,.061,.473,.061,r.ironEdge);for(const rt of[.17,.665])z.path([[W,rt,-.059],[W,rt+.025,.013],[W,rt,.057]],.059,r.iron)}for(const W of[-1,1])z.shape("cyl",W*(I/2-.1),.083,0,.089,.152,.089,r.iron);z.path([[I/2,.131,0],[I/2+.11,.131,.004],[I/2+.12,.303,.004]],.043,r.iron),z.shape("ball",I/2+.12,.325,.004,.066,.069,.066,r.brassDark),z.obstruction(I+.036,.24,.73)}for(const E of[-5.07,-.35,4.5])$(E,ot.north+.232,0,1.62,"radiators");$(ot.west+.207,2.57,Math.PI/2,1.62,"radiators"),S(-4.8,0,-8.19,4.39,3.34,["#583d32","#3a4943","#c49864","#878970","#96674d"],251),S(-.51,0,-1.89,3.12,4.12,["#484f46","#594539","#bf9b66","#8c8862","#805c49"],882),S(-9.43,0,-4.26,2.72,3.54,["#6e4135","#413a33","#be9666","#8e875f","#865c4a"],517),S(-4.21,ot.galleryY,7.016,3.66,1.12,["#614744","#402e2c","#b29166","#7c8469","#7d624b"],325,!0),M(-6.08,0,-8.33,1.41,r.oxblood,"rear-lounge"),M(-3.63,0,-8.49,-1.02,r.tanLeather,"rear-lounge",.96),M(-5.23,0,-6.94,2.73,r.greenLeather,"rear-lounge"),Y(-4.82,0,-8.05,.83,.53,"rear-lounge"),pt(-4.84,.533,-8.05,.7,"rear-lounge",.34,.25),vt(-5.07,.533,-8.14),et(-6.54,0,-7.24,-.13,.45,.48,.546,"rear-lounge"),ft(-6.55,.549,-7.23,.36,"rear-lounge",[[.039,.25,.178,29],[.032,.21,.166,13,.015]]),Mt(-6.4,.55,-7.32,.194,r.ceramic,"rear-lounge",!1),tt(-.51,0,-1.84,1.41,3.33,.769,0,"reading-table"),C(-1.65,0,-2.74,Math.PI/2+.12,"reading-table"),C(-1.71,0,-1.06,Math.PI/2-.18,"reading-table"),C(.61,0,-2.76,-Math.PI/2-.22,"reading-table"),C(.69,0,-1.11,-Math.PI/2+.09,"reading-table"),at(-.46,.776,-2.23,.23,!1,"reading-table"),at(-.53,.776,-.83,Math.PI+.11,!1,"reading-table"),pt(-.75,.778,-2.91,-Math.PI/2+.26,"reading-table",.475,.31),pt(-.16,.778,-1.27,Math.PI/2+.13,"reading-table",.36,.267),ft(-.83,.778,-1.47,.16,"reading-table",[[.041,.288,.207,34],[.034,.253,.185,67,.008],[.026,.228,.172,55,-.023]]),ft(-.29,.778,-.405,.22,"reading-table",[[.043,.285,.201,44]]),vt(-.97,.778,-.653,!0),vt(-.08,.778,-2.6);const G=L(-.68,.777,-.46,.3,"reading-table");G.block(0,.005,0,.172,.006,.242,r.oldPaper),G.block(.01,.008,.03,.161,.005,.216,r.paper),G.path([[-.044,.016,-.096],[.08,.018,-.064]],.012,r.iron,{cast:!1}),G.shape("cyl",-.187,.026,-.06,.058,.048,.058,r.iron),G.shape("ball",-.187,.054,-.06,.043,.029,.043,r.brassDark),H(-.75,1.882,-5.94,1,"island-display"),ft(.5,1.884,-5.87,-.15,"island-display",[[.071,.38,.252,24],[.039,.32,.208,44,.025],[.057,.302,.215,57,-.018]]),Mt(1.52,1.883,-6.03,.38,r.celadon,"island-display"),pt(2.11,1.116,-8.2,.13,"atlas-display",.58,.369),ft(2.89,1.117,-8.09,-.17,"atlas-display",[[.058,.359,.222,10]]),Mt(1.27,1.114,-8.2,.225,r.ceramic,"atlas-display",!1);function ct(E){const B=je(256,384,(R,k,J)=>{const X=nn(650144);R.fillStyle="#686b55",R.fillRect(0,0,k,J);for(const mt of[15,25,32,110,124,132,146,222,230,240])R.fillStyle=mt>=100&&mt<=150?"#9e744f":"#a29975",R.fillRect(mt,0,mt%3+3,J);for(let mt=12;mt<=J;mt+=31){R.fillStyle="#cdc0984d",R.fillRect(0,mt,k,1.4);for(let _t=16;_t<k-13;_t+=10)R.fillStyle="#bcad7849",R.fillRect(_t,mt-3,4.3,6.8)}for(let mt=0;mt<4100;mt++)R.fillStyle=X()<.5?"#2f302253":"#c6b98a40",R.fillRect(X()*k,X()*J,1.2,1+X()*3)}),O=new Ce({map:B,color:15062707,roughness:.98,side:ve}),I=[[-.186,.557],[-.114,.54],[-.012,.527],[.142,.523],[.27,.519],[.336,.51],[.376,.496],[.403,.449],[.417,.368],[.419,.269]];function U(R,k){const J=Math.min(I.length-2,Math.floor(k)),X=k-J,mt=I[J],_t=I[J+1],At=Math.sin(R*25.4+k*.31)*.009+Math.sin(R*12.1-k*.8)*.011;return E.from(.79+R*.68+Math.sin(k*.45)*.026,mt[1]+(_t[1]-mt[1])*X+At,mt[0]+(_t[0]-mt[0])*X+(k>6?At*.77:0))}const z=[],W=[],rt=[],y=17;for(let R=0;R<I.length;R++)for(let k=0;k<=y;k++){const J=k/y;if(z.push(...U(J,R)),W.push(J,1-R/(I.length-1)),k===y||R===I.length-1)continue;const X=k+R*(y+1);rt.push(X,X+y+1,X+1,X+1,X+y+1,X+y+2)}const g=new pe;g.setAttribute("position",new jt(z,3)),g.setAttribute("uv",new jt(W,2)),g.setIndex(rt),g.computeVertexNormals(),s(g,O,[0,0,0],{cast:!1});for(let R=1;R<34;R++){const k=U(R/34,I.length-1),J=[k[0]+Nt(l,.001,.016),k[1]-Nt(l,.018,.036),k[2]+Nt(l,-.004,.005)];c(k,J,.006,r.linen,{cell:"window-seat",cast:!1})}}const Z=L(-10.899,0,-4.47,Math.PI/2,"window-seat");Z.shape(u,0,.242,-.008,3.24,.388,.707,r.oakDark),Z.block(0,.112,.351,3.26,.097,.052,r.walnut),Z.block(0,.315,.355,3.26,.055,.039,r.oakWarm);for(const E of[-1.053,0,1.053])Z.block(E,.213,.361,.998,.191,.034,r.shelfBack),Z.block(E,.213,.381,.818,.124,.025,r.oak),Z.shape(u,E,.433,.043,1.047,.153,.654,r.sofa),Z.path([[E-.493,.432,.345],[E-.462,.441,.365],[E+.459,.441,.365],[E+.493,.431,.342]],.012,r.pipingDark,{cast:!1});Z.shape(u,0,.612,-.254,3.235,.286,.227,r.sofa,-.17);for(const[E,B,O]of[[-1.09,r.greenCloth,.23],[-.41,r.linen,-.17],[1.01,r.brickCloth,-.27]]){Z.shape(h,E,.647,-.1,.409,.38,.168,B,-.41,O);const I=B===r.linen?r.brassDark:r.linen;Z.path([[E-.169,.576,.026],[E-.136,.718,-.038],[E+.139,.717,-.044],[E+.17,.575,.031]],.009,I,{cast:!1})}for(const E of[-1,1])Z.shape(h,E*1.579,.548,.052,.145,.209,.625,r.sofa),Z.block(E*1.595,.193,0,.159,.387,.712,r.oak);Z.obstruction(3.31,.729,.78),ct(Z),F(-10.83,0,-4.47,.94,3.52,0),M(-8.844,0,-2.72,2.89,r.oxblood,"alcove-seat",.96),Y(-9.662,0,-4.38,.72,.54,"alcove-seat"),pt(-9.71,.545,-4.32,1.02,"alcove-seat",.37,.255),vt(-9.45,.544,-4.46,!0),et(-9.906,0,-6.13,0,.95,.58,.678,"alcove-writer"),at(-10.12,.684,-6.197,.55,!1,"alcove-writer"),ft(-9.75,.685,-6.128,-.19,"alcove-writer",[[.047,.277,.172,28],[.022,.252,.155,16,.03]]),C(-9.79,0,-5.55,Math.PI+.16,"alcove-writer"),at(-10.366,0,-2.66,0,!0,"alcove-standing"),t.add(-10.366,-2.66,.32,.32,0,1.52);const lt=ll(1492,"hills"),w=ll(102,"leaves");Rt(-9.652,2.14,ot.alcoveSouth-.021,1.12,.83,Math.PI,lt,"alcove-frames"),Rt(-10.61,2.23,ot.alcoveSouth-.023,.52,.66,Math.PI,w,"alcove-frames"),Rt(-8.765,2.3,ot.alcoveSouth-.02,.41,.56,Math.PI,w,"alcove-frames"),Rt(3.006,5.735,ot.south-.042,2.48,1.26,Math.PI,lt,"upper-painting"),Rt(-5.11,7.11,ot.south-.022,.7,.66,Math.PI,w,"upper-painting"),Rt(ot.east-.02,7.24,-5.69,.68,.84,-Math.PI/2,w,"upper-painting"),Rt(ot.west+.035,2.143,5.21,1.39,1.03,Math.PI/2,lt,"entry-decor"),Rt(ot.west+.035,2.005,6.66,.61,.77,Math.PI/2,w,"entry-decor"),et(2.955,ot.galleryY,8.096,Math.PI,1.19,.58,.813,"upper-painting"),H(3.16,ot.galleryY+.818,8.18,.67,"upper-painting"),ft(2.68,ot.galleryY+.819,8.14,.07,"upper-painting",[[.032,.23,.166,42],[.027,.191,.135,25,.014]]),M(-6.884,ot.galleryY,7.496,2.3,r.greenLeather,"gallery-chair",.86),at(-7.199,ot.galleryY,8.116,0,!0,"gallery-chair"),t.add(-7.199,8.116,.32,.32,ot.galleryY,ot.galleryY+1.52);const j=new Ce({roughness:.81,color:15060906,map:je(448,176,(E,B,O)=>{E.fillStyle="#9e8157",E.fillRect(0,0,B,O),E.strokeStyle="#473c28",E.lineWidth=3,E.strokeRect(9,9,B-18,O-18),E.lineWidth=1.4,E.strokeRect(16,16,B-32,O-32),E.fillStyle="#382e21",E.textAlign="center",E.font="31px Georgia, serif",E.fillText("ASHCOMBE READING ROOM",B/2,77,B-49),E.font="21px Georgia, serif",E.fillText("EST. 1912",B/2,119)})});Rt(.005,2.799,ot.south-.027,1.12,.385,Math.PI,j,"entry-decor"),dt(-.48,-1.132,5.46,.785,"chandeliers"),dt(-4.88,-7.92,5.72,.513,"chandeliers",5),nt(-1.366,2.2,ot.south-.02,Math.PI,"wall-lamps"),nt(1.443,2.2,ot.south-.024,Math.PI,"wall-lamps"),nt(1.554,5.217,ot.south-.034,Math.PI,"wall-lamps"),nt(4.458,5.217,ot.south-.035,Math.PI,"wall-lamps"),nt(ot.west+.022,5.568,7.596,Math.PI/2,"wall-lamps"),nt(ot.east-.032,5.603,-5.595,-Math.PI/2,"wall-lamps"),nt(4.635,2.263,-.6,-Math.PI/2,"wall-lamps"),nt(4.653,2.264,-5.1,-Math.PI/2,"wall-lamps"),K(-.55,1.066,-2.167,16758120,7.1,4.7),K(-9.989,1.435,-2.83,16761206,12.3,6),K(6.051,2.419,-1.4,16760439,12.9,7.5),K(3.031,5.098,7.257,16761229,12.6,7.4)}const l0=new V(-16,12,-23).normalize(),Jl=l0.clone();function di(i,t,e,n,r,s){return Math.exp(-(((i-e)/r)**2+((t-n)/s)**2))}function Rr(i,t){const e=di(i,t,-51,-45,30,23)*9.7+di(i,t,14,-78,30,21)*14.1+di(i,t,-83,-89,45,24)*17.6+di(i,t,-95,6,24,42)*9.5+di(i,t,51,-54,23,33)*10.6,n=-8.1+6.85*di(i,t,0,1,29,31),r=(Math.sin(i*.114+t*.052)*.43+Math.cos(t*.13-i*.042)*.37)*Math.min(1.8,Math.hypot(i,t)/25);return n+e+r}function c0(i){const{mat:t,piece:e,box:n,line:r}=i,s=(ft,vt,Mt,Rt)=>i.mesh(ft,vt,Mt,{...Rt,exterior:!0}),o=nn(749111),a=new _n({side:Te,depthWrite:!1,uniforms:{sun:{value:Jl},upper:{value:new Xt(9744053)},horizon:{value:new Xt(14926489)},cloud:{value:new Xt(15915712)},golden:{value:new Xt(16763781)}},vertexShader:["varying vec3 direction;","void main() {","  direction = position;","  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);","}"].join(`
`),fragmentShader:["uniform vec3 sun, upper, horizon, cloud, golden;","varying vec3 direction;","void main() {","  vec3 ray = normalize(direction);","  float y = ray.y;","  vec3 sky = mix(horizon, upper, smoothstep(0.01, 0.74, y));","  float solar = max(0.0, dot(ray, sun));","  sky = mix(sky, golden, pow(solar, 10.0) * 0.34);","  float layer = sin(28.0*y + 3.8*ray.x + 0.65*sin(17.0*ray.z));","  layer += 0.42*sin(36.0*y - 7.0*ray.z + 1.67*sin(13.0*ray.x));","  layer += 0.25*sin(68.0*y + 4.0*ray.x);","  float wisps = smoothstep(0.88, 1.36, layer) * smoothstep(0.015, 0.19, y) * (1.0 - smoothstep(0.40, 0.79, y));","  sky = mix(sky, cloud, wisps * 0.59);","  sky += golden * pow(solar, 230.0) * 0.22;","  sky += vec3(1.6, 1.0, 0.48) * smoothstep(0.99964, 0.99988, solar);","  gl_FragColor = vec4(sky, 1.0);","  #include <tonemapping_fragment>","  #include <colorspace_fragment>","}"].join(`
`)});s(new Wn(192,24,16),a,[0,0,0],{cast:!1,receive:!1,order:-9});const c=116,l=107,u=-125,h=120,d=-143,p=72,_=[],x=[],m=[],f=new Xt(8093783),A=new Xt(6446405),b=new Xt(10126686),v=new Xt(10130813),N=new Xt;for(let ft=0;ft<=l;ft++)for(let vt=0;vt<=c;vt++){const Mt=u+(h-u)*vt/c,Rt=d+(p-d)*ft/l,st=Rr(Mt,Rt);_.push(Mt,st,Rt);const D=Math.sin(Rt*.154+Math.sin(Mt*.075)*1.79)*Math.cos(Mt*.122+Math.cos(Rt*.123));if(N.copy(f).lerp(A,Math.max(0,D)*.79).lerp(b,Math.max(0,-D)*.79),N.lerp(v,Math.min(.51,Math.max(0,Math.hypot(Mt,Rt)-32)*.0062)),N.multiplyScalar(Nt(o,.86,1.16)),x.push(N.r,N.g,N.b),vt===c||ft===l)continue;const H=ft*(c+1)+vt;m.push(H,H+c+1,H+1,H+1,H+c+1,H+c+2)}const P=new pe;P.setAttribute("position",new jt(_,3)),P.setAttribute("color",new jt(x,3)),P.setIndex(m),P.computeVertexNormals(),s(P,new Ce({vertexColors:!0,roughness:1}),[0,0,0],{cast:!1,receive:!1});const L=[new V(-10.58,-1.9,-8.3),new V(-13.8,-2.7,-10.8),new V(-19,-4.32,-13.96),new V(-26,-5.05,-18.55),new V(-25.8,-4.72,-25.7),new V(-17.8,-4.47,-31.6),new V(-12.5,-4.61,-38.1),new V(-16.8,-4.79,-47.4),new V(-24.8,-4.81,-57.2),new V(-31.9,-3.22,-67.5)],F=new Il(L),S=[],M=[],C=[],tt=114;for(let ft=0;ft<=tt;ft++){const vt=ft/tt,Mt=F.getPoint(vt),Rt=F.getTangent(vt),st=.59+.17*Math.sin(vt*19);for(const D of[-1,1]){const H=Mt.x+Rt.z*D*st,$=Mt.z-Rt.x*D*st;S.push(H,Rr(H,$)+.102,$),M.push(D===1?1:0,vt*16)}ft<tt&&C.push(ft*2,ft*2+2,ft*2+1,ft*2+1,ft*2+2,ft*2+3)}const et=new pe;et.setAttribute("position",new jt(S,3)),et.setAttribute("uv",new jt(M,2)),et.setIndex(C),et.computeVertexNormals();const Y=t.ashStone.clone();Y.side=ve,Y.color.set(10655605),Y.map=t.ashStone.map.clone(),Y.map.wrapT=Gi,Y.map.needsUpdate=!0,s(et,Y,[0,0,0],{cast:!1,receive:!1});const K=new Ce({color:16777215,map:t.limestone.map,roughness:1}),at=[8945254,10917241,10457204,11312254,7892571,8483679,10788229,9145971];n(0,-.48,-10.49,15.83,1.03,.36,t.ashStone,{cell:"outside-near",cast:!1}),n(-11.51,-.69,-4.265,.375,1.43,4.99,t.ashStone,{cell:"outside-near",cast:!1});for(let ft=0;ft<3;ft++)for(let vt=0;vt<33;vt++){const Mt=-9.45+(vt+.37*(ft%2))*.55,Rt=-12.22-.75*Math.cos(Mt*.085)+.16*Math.sin(vt*.24),st=-.93+ft*.2+.008*vt;n(Mt,st,Rt,Nt(o,.505,.573),Nt(o,.171,.227),Nt(o,.33,.49),K,{cell:"outside-near",tint:Ze(o,at),cast:!1,rot:[0,Nt(o,-.13,.13),Nt(o,-.07,.07)]})}for(let ft=0;ft<16;ft++){const vt=-7.7+ft*.488,Mt=-12.88-.16*Math.sin(ft*.34);for(let Rt=0;Rt<2;Rt++){const st=-.81+Rt*.232+.065*Math.cos(ft*.17);n(Mt,st,vt+.2*Rt,Nt(o,.45,.57),Nt(o,.184,.248),Nt(o,.425,.515),K,{cell:"outside-near",tint:Ze(o,at),cast:!1,rot:[0,Nt(o,-.12,.13),0]})}}const dt=new Ce({color:16777215,roughness:1}),nt=new Ce({color:6575426,roughness:1}),gt=[6382922,7828819,7633750,9011801,5859920,10127195];function pt(ft,vt,Mt,Rt){const st=Rr(ft,vt),D=vt<-33?"far-copse":"near-copse",H=Nt(o,-.17,.17)*Mt,$=[ft+H,st+Mt*.81,vt+H*.31];if(r([ft,st-.06,vt],$,Mt*.056,nt,{cell:D,cast:!1,receive:!1}),Rt===0){for(let G=0;G<6;G++){const ct=G/6,Z=[ft+H*ct,st+Mt*(.34+.105*G),vt+H*.31*ct],lt=Mt*(.51-.059*G)*Nt(o,.87,1.15);e("cone",Z,[lt,Mt*.405,lt*.95],dt,{cell:D,cast:!1,receive:!1,tint:Ze(o,gt),rot:[0,Nt(o,0,Math.PI),H*.13]})}return}for(let G=0;G<11;G++){const ct=G*2.39,Z=G<3?.03:Nt(o,.11,.36),lt=ft+H*.79+Math.cos(ct)*Z*Mt,w=vt+H*.04+Math.sin(ct)*Z*Mt,j=st+Mt*(.94-Z*.79+Nt(o,-.1,.051));G%2===0&&r([ft+H*.52,st+Mt*.52,vt],[lt,j,w],Mt*.024,nt,{cell:D,cast:!1,receive:!1});const E=Mt*Nt(o,.25,.42);e("ball",[lt,j,w],[E,E*Nt(o,.7,1.15),E*.89],dt,{cell:D,cast:!1,receive:!1,tint:Ze(o,gt),rot:[0,ct,.2]})}}for(const[ft,vt,Mt,Rt]of[[-14.6,-15.1,3.48,1],[-19.7,-9.7,3.85,1],[-18.2,-.5,3.49,1],[-14.6,-24.4,3.42,0],[-11.8,-26.1,2.7,0],[-16.5,-27.83,2.71,0],[-22.8,-31.8,2.96,1],[-24.1,-34.2,2.55,1],[-2.6,-24.34,2.61,1],[11.07,-24.64,3.21,1],[18.2,-30.11,3.28,1],[-31,-8.9,3.89,1]])pt(ft,vt,Mt,Rt);for(let ft=0;ft<43;ft++){const vt=Nt(o,-86,52),Mt=Nt(o,-75,-34);pt(vt,Mt,Nt(o,1.43,3),ft%3===0?1:0)}for(let ft=0;ft<230;ft++){const vt=Nt(o,-27,18),Mt=Nt(o,-34,3);if(vt>-13.35&&Mt>-14.1)continue;const Rt=Rr(vt,Mt),st=Nt(o,.1,.47);e(ft%6===0?"cone":"ball",[vt,Rt+st*.18,Mt],[st,st*Nt(o,.31,1.1),st*.64],dt,{cell:"outside-near",cast:!1,receive:!1,tint:Ze(o,gt),rot:[0,Nt(o,0,Math.PI),0]})}}const bo=1024,To=2048,Ue=128,dn=160,u0=["#644231","#774534","#474d37","#374d49","#715e42","#645f4e","#454240","#98744d"],cl=["HERBARIUM","THE DOWNS","LETTERS","THE COAST","POEMS","TOPOGRAPHY","ON THE MOORS","BIRD STUDIES","FOLK SONGS","NATURALIST","FIELD NOTES","JOURNAL","ATLAS","MEMOIRS","OLD ROADS","THE VALLEY","BOTANY","ESSAYS","WOODLANDS","ANNALS","GARDENS","TRAVELS","WILD FLOWERS","HISTORY","COUNTY RECORDS","LOCAL FLORA","COMMON LANDS","THE WEATHER","MONOGRAPHS","THE ROCKS","RIVER LIFE","THE SEASONS"],ul=["I","II","III","IV","V","VI","VII","VIII","IX","X"];function h0(){const i=nn(9329);return je(bo,To,(t,e,n)=>{t.fillStyle="#5e4939",t.fillRect(0,0,e,n);for(let r=0;r<12;r++)for(let s=0;s<8;s++){const o=s*Ue,a=r*dn;t.save(),t.translate(o,a),t.beginPath(),t.rect(0,0,Ue,dn),t.clip();const c=u0[s],l=r===11,u=t.createLinearGradient(0,0,Ue,0);if(u.addColorStop(0,l?"#988367":"#362c24"),u.addColorStop(.12,l?"#c6b68c":c),u.addColorStop(.48,l?"#e0cca4":c),u.addColorStop(.76,l?"#cab88d":c),u.addColorStop(1,l?"#a79371":"#443329"),t.fillStyle=u,t.fillRect(0,0,Ue,dn),l){for(let h=1;h<Ue;h+=2+Math.floor(i()*3))t.fillStyle=i()>.4?"#58433150":"#f6e1b047",t.fillRect(h,0,1,dn);t.fillStyle="#8b6e4a45",t.fillRect(0,0,7,dn),t.fillRect(Ue-9,0,9,dn)}else if(r<10){const h=r%4===0?"#d1bb82":"#bf9a59",d=r%3===1?"#4b3325":"#322a20",p=cl[(r*9+s*3)%cl.length],_=r%5;t.fillStyle="#2f262449",t.fillRect(0,0,Ue,10),t.fillRect(0,149,Ue,11),t.fillStyle="#cda87926",t.fillRect(12,3,5,154),t.fillRect(110,4,6,152);for(const x of _<2?[12,29,116,138,149]:[15,35,74,127,146])t.fillStyle="#2e2619a5",t.fillRect(0,x,Ue,2),t.fillStyle=h+"8e",t.fillRect(7,x+2,Ue-14,x===35?3:1.6);if(t.textAlign="center",_===4)t.translate(64,81),t.rotate(-Math.PI/2),t.fillStyle=d+"7f",t.fillRect(-48,-19,96,38),t.strokeStyle=h,t.strokeRect(-46,-17,92,34),t.fillStyle=h,t.font="bold 12px Georgia, serif",t.fillText(p,0,4,83),t.setTransform(1,0,0,1,o,a);else{const x=_<2?36:43;t.fillStyle=_===3?"#a18a58":d+"bb",t.fillRect(13,x,102,30),t.strokeStyle=h,t.lineWidth=1.4,t.strokeRect(17,x+3,94,24),t.fillStyle=_===3?"#493c27":h,t.font="bold 15px Georgia, serif",t.fillText(p,64,x+15,87),t.font="10px Georgia, serif",t.fillText(ul[(s+r)%ul.length],64,x+25,54);for(const[m,f]of[[0,0],[-16,0],[16,0],[0,-8],[0,8]])t.beginPath(),t.ellipse(64+m,95+f,m?6:4,2.6,m?.7:-.7,0,Math.PI*2),t.fill()}(_===1||_===3)&&(t.strokeStyle=h+"98",t.lineWidth=1,t.strokeRect(18,5,92,150)),r%4===1&&s%3===1&&(t.fillStyle="#d0b991",t.fillRect(31,118,66,23),t.fillStyle="#514735",t.font="bold 12px Georgia, serif",t.fillText("A "+(30+s*7+r),64,133))}for(let h=0;h<260;h++)t.fillStyle=Ze(i,["#e0c39024","#29231833","#d4b98215","#93745220"]),t.fillRect(i()*Ue,i()*dn,1+i()*3,1+i()*3);t.restore()}})}function f0(i,t=5){const e=i%8*Ue,n=Math.floor(i/8)*dn;return[(e+t)/bo,1-(n+dn-3)/To,(e+Ue-t)/bo,1-(n+3)/To]}const Xo=Array.from({length:96},(i,t)=>f0(t)),d0=Xo.slice(88,96),p0=Xo.slice(80,88);function m0(i){const t=new Ce({color:16777215,map:h0(),roughness:.88}),e=new Map;let n=0;function r(o,a,c,l,u,h,d,p,_,x=0){let m=e.get(o);m||(m={position:[],normal:[],uv:[],index:[]},e.set(o,m)),n++;const f=Math.cos(u),A=Math.sin(u),b=Math.cos(x),v=Math.sin(x),N=Xo[_],P=p0[_%8],L=d0[_%8],F=Math.min(.009,h*.15),S=Math.min(.0065,h*.17),M=-h/2,C=h/2,tt=Math.min(.028,p*.145),et=Math.min(.012,h*.2);function Y(nt,gt,pt,ft,vt,Mt=0,Rt=1){const st=m.position.length/3,D=gt[0]-nt[0],H=gt[1]-nt[1],$=gt[2]-nt[2],G=pt[0]-nt[0],ct=pt[1]-nt[1],Z=pt[2]-nt[2],lt=H*Z-$*ct,w=$*G-D*Z,j=D*ct-H*G,E=Math.hypot(lt,w,j),B=(lt*b-w*v)/E,O=(lt*v+w*b)/E,I=j/E;for(const[W,rt,y]of[nt,gt,pt,ft]){const g=W*b-rt*v,R=W*v+rt*b;m.position.push(a+f*g+A*y,c+R,l-A*g+f*y),m.normal.push(f*B+A*I,O,-A*B+f*I)}const U=Hr(vt[0],vt[2],Mt),z=Hr(vt[0],vt[2],Rt);m.uv.push(U,vt[1],z,vt[1],z,vt[3],U,vt[3]),m.index.push(st,st+1,st+2,st,st+2,st+3)}const K=[M,M+F,C-F,C],at=[0,et,et,0];for(let nt=0;nt<3;nt++){const[gt,pt]=[K[nt],K[nt+1]],[ft,vt]=[at[nt],at[nt+1]];Y([gt,0,ft],[pt,0,vt],[pt,d,vt],[gt,d,ft],N,(gt-M)/h,(pt-M)/h)}Y([M,0,-p],[M,0,0],[M,d,0],[M,d,-p],P),Y([C,0,0],[C,0,-p],[C,d,-p],[C,d,0],P);const dt=Math.abs(x)>.45;Y([M,d,et],[C,d,et],[C,d,-tt],[M,d,-tt],P),dt&&Y([C,0,et],[M,0,et],[M,0,-tt],[C,0,-tt],P),Y([M+S,d-.007,-tt],[C-S,d-.007,-tt],[C-S,d-.007,-p+.009],[M+S,d-.007,-p+.009],L),dt&&Y([C-S,.006,-tt],[M+S,.006,-tt],[M+S,.006,-p+.009],[C-S,.006,-p+.009],L),Y([C-S,.006,-p+.009],[M+S,.006,-p+.009],[M+S,d-.007,-p+.009],[C-S,d-.007,-p+.009],L);for(const[nt,gt]of[[M,M+S],[C-S,C]])Y([nt,d,-tt],[gt,d,-tt],[gt,d,-p],[nt,d,-p],P),Y([gt,0,-p],[nt,0,-p],[nt,d,-p],[gt,d,-p],P),dt&&Y([gt,0,-tt],[nt,0,-tt],[nt,0,-p],[gt,0,-p],P)}function s(){for(const o of e.values()){const a=new pe;a.setAttribute("position",new jt(o.position,3)),a.setAttribute("normal",new jt(o.normal,3)),a.setAttribute("uv",new jt(o.uv,2)),a.setIndex(o.index),a.computeBoundingSphere(),i.mesh(a,t,[0,0,0],{cast:!1})}return e.clear(),n}return{volume:r,finish:s}}function g0(i){const t=["LOCAL HISTORY","NATURAL HISTORY","VERSE & DRAMA","TRAVEL","FINE BINDINGS","COUNTY RECORDS","REFERENCE","LETTERS","ESSAYS","ART & DESIGN","FIELD GUIDES","BOTANY"],e=je(1024,256,s=>{for(const[o,a]of t.entries()){const c=o%4*256,l=Math.floor(o/4)*64;s.save(),s.translate(c,l),s.fillStyle=o%3===0?"#b99960":"#977b51",s.fillRect(0,0,256,64),s.strokeStyle="#514229",s.lineWidth=2,s.strokeRect(6,6,244,52),s.strokeStyle="#d5b985",s.lineWidth=1,s.strokeRect(10,10,236,44),s.fillStyle="#382d21",s.textAlign="center",s.textBaseline="middle",s.font="bold 20px Georgia, serif",s.fillText(a,128,33,204);for(const u of[20,236])s.beginPath(),s.arc(u,32,2.7,0,Math.PI*2),s.fill();s.restore()}}),n=new Ce({map:e,color:14272152,roughness:.67,metalness:.14});function r(s,o,a,c,l){const u=s%t.length,h=u%4/4,d=1-(Math.floor(u/4)+1)/4,p=new Jn(a,c),_=p.attributes.uv;for(let x=0;x<_.count;x++)_.setXY(x,h+(2+_.getX(x)*252)/1024,d+(2+_.getY(x)*60)/256);i.mesh(p,n,o,{rot:[0,l,0],cast:!1,combine:o[1]>ot.galleryY?"upper-case-labels":"lower-case-labels"})}return r}function _0(i,t){const{mat:e,box:n,line:r,piece:s}=i,o=m0(i),a=nn(55437),c=g0(i),l=[.88,.93,1.15,.74,1.06,.98,.83,1.14],u=new xi([[0,0],[.27,0],[.31,.064],[.39,.19],[.43,.42],[.33,.62],[.2,.71],[.15,.82],[.17,.94],[.23,.98],[.23,1],[.17,1],[.13,.93],[.14,.83]].map(([m,f])=>new Tt(m,f)),16);function h(m){const{id:f,x:A,z:b,yaw:v,width:N,depth:P,y:L=0,levels:F,bays:S,tag:M=0,variant:C=0,display:tt=!1,drawerBays:et=[]}=m,Y=F.at(-1),K=P/2,at=Math.sin(v),dt=Math.cos(v),nt={cell:f,rot:[0,v,0]},gt=(Z,lt,w)=>[A+dt*Z+at*w,L+lt,b-at*Z+dt*w],pt=(Z,lt,w,j,E,B,O,I)=>n(...gt(Z,lt,w),j,E,B,O,{...nt,...I}),ft=C%3===0?e.oakWarm:e.oak,vt=C%4===1?e.oak:e.oakDark,Mt=N;pt(0,Y/2,-K+.025,Mt-.024,Y,.047,e.shelfBack);for(const Z of[-Mt/2+.032,Mt/2-.032])pt(Z,Y/2,0,.068,Y,P,vt);if(pt(0,.067,0,Mt+.093,.134,P+.078,e.walnut),pt(0,.152,.012,Mt+.082,.046,P+.107,ft),pt(0,Y+.029,.016,Mt+.182,.065,P+.135,vt),pt(0,Y+.083,.04,Mt+.214,.043,P+.168,ft),pt(0,Y-.038,K+.008,Mt+.063,.045,.054,e.edge),!tt)for(let Z=-Mt/2+.18;Z<Mt/2-.09;Z+=.178)pt(Z,Y-.077,K+.035,.06,.065,.041,e.oak,{cast:!1});const Rt=S.reduce((Z,lt)=>Z+lt,0),st=Y-.117;let D=-Mt/2;for(let Z=0;Z<S.length;Z++){const lt=Mt*S[Z]/Rt,w=D+lt;Z&&pt(D,Y/2,-.003,.046,Y,P-.029,vt),Z===0&&$(D+.034),$(w-(Z===S.length-1?.032:0));const j=(D+w)/2;for(const[E,B]of F.entries()){if(E===F.length-1)break;const O=E===0?.058:.035,I=F[E+1];if(E===0&&et.includes(Z)){H(j,lt,B,I);continue}pt(j,B-O/2,.002,lt-.039,O,P-.011,vt),pt(j,B-.014,K+.011,lt-.052,.036,.044,ft),pt(j,B+.004,K+.007,lt-.055,.008,.042,e.edge,{cast:!1}),pt(j,I-.073,-K+.05,lt-.046,.077,.013,e.walnut,{cast:!1});const z=(C%3!==0||tt)&&(Z*11+E*13+M)%(tt?4:6)===0,W=(Z*13+E*7+M)%13===0,rt=(E+M+Z)%4===1,y=(E===F.length-2?I-.11:I-.048)-B,g=D+.063,R=w-.062,k=z?Math.min(.43,lt*.34):W?lt*.23:0,J=(M+Z)%2===0;z&&ct(J?g+k*.5:R-k*.47,B+.005,y,E+Z+M),G(g+(J?k:0),R-(J?0:k),B+.0025,y,E,Z,rt,W)}tt?c(M+Z,gt(j,Y-.013,K+.045),.28,.065,v):(pt(j,st,K+.02,.292,.077,.046,e.walnut,{cast:!1}),c(M+Z,gt(j,st,K+.044),.275,.06,v)),D=w}function H(Z,lt,w,j){const E=j-w-.012;pt(Z,w+E/2,-.012,lt-.065,E,P-.02,e.walnut);const B=lt>.92?2:1,O=(lt-.092)/B;for(let I=0;I<B;I++){const U=Z+(I+.5-B/2)*O;for(const z of[.25,.75]){const W=w+z*E;pt(U,W,K+.009,O-.013,E/2-.012,.034,vt),pt(U,W,K+.025,O-.043,E/2-.044,.019,e.oak),pt(U,W+E*.16,K+.036,O-.053,.012,.015,e.edge,{cast:!1}),pt(U,W,K+.044,.129,.062,.015,e.brassDark),pt(U,W+.01,K+.054,.079,.034,.007,e.oldPaper),pt(U,W+.011,K+.058,.043,.006,.002,e.ink,{cast:!1});const rt=-.047,y=.047,g=K+.066,R=[[rt,W-.015,g],[rt+.012,W-.035,g+.012],[y-.012,W-.035,g+.012],[y,W-.015,g]];for(let k=1;k<R.length;k++)r(gt(...R[k-1]),gt(...R[k]),.012,e.bronze,{cell:f})}}}function $(Z){pt(Z,Y/2,K+.009,.097,Y-.254,.065,vt),pt(Z,Y-.116,K+.019,.142,.139,.093,ft),pt(Z,.226,K+.025,.136,.16,.099,vt);for(const lt of[-1,1])pt(Z+lt*.023,Y/2,K+.041,.008,Y-.475,.014,e.edge,{cast:!1})}function G(Z,lt,w,j,E,B,O,I){let U=Z;for(;U<lt-.068;){const z=4+Math.floor(a()*8),W=Math.floor(a()*8),rt=a()>.47,y=Math.min(j-.009,j*Nt(a,.57,.9)*l[(E+B*3+M)%8]),g=j>.35&&(E+M)%4===0;if(a()<(I?.27:.13)&&lt-U>.34){const J=Nt(a,.162,.255);for(let X=0,mt=w;X<2+(E+B)%3;X++){const _t=Nt(a,.022,.043),At=Nt(a,.13,Math.min(P-.065,.26)),It=gt(U+Nt(a,.002,.022),mt+_t*.5,K-Nt(a,.047,.082));o.volume(f,...It,v+Nt(a,-.035,.035),_t,J-X*.011,At,Math.floor(a()*80),-Math.PI/2),mt+=_t+.003}U+=J+Nt(a,.028,.069);continue}const R=O?Nt(a,.029,.055):Nt(a,.042,.071),k=Math.floor(a()*10);for(let J=0;J<z&&U<lt-.046;J++){const X=Math.min(lt-U-.004,R*Nt(a,.56,1.77)+(g&&J%4===0?.032:0)),mt=Math.max(.086,Math.min(j,y*Nt(a,rt?.91:.7,rt?1.08:1.24))),_t=Math.min(P-.058,Math.max(.101,mt*Nt(a,.51,.92))),At=J===z-1&&a()>.65&&lt-U-X>.075?Nt(a,-.23,-.12):0,It=O||rt?Nt(a,.008,.049):Nt(a,.015,.096),St=gt(U+X/2,w,K-It),Ct=rt?(k+(J%7===6?1:0))%10*8+W:Math.floor(a()*80);o.volume(f,...St,v+(J%8===7?Nt(a,-.035,.035):0),X,mt,_t,Ct,At),U+=X+Nt(a,.002,.007)+Math.abs(At)*mt}U+=I?Nt(a,.046,.139):Nt(a,.009,.044)}}function ct(Z,lt,w,j){if(j%3===0&&w>.2){const E=Math.min(w-.028,.3);s(u,gt(Z,lt,K-.14),[E,E,E],j%2?e.celadon:e.ceramic,nt)}else if(j%3===1){const E=Math.min(w-.024,.193);pt(Z,lt+E/2,-.013,.233,E,Math.min(P*.68,.254),e.greenCloth),pt(Z,lt+E/2+.004,K*.65,.097,.052,.016,e.oldPaper),pt(Z,lt+E/2+.001,K*.71,.071,.014,.009,e.brassDark)}else pt(Z,lt+.073,-.026,.018,.145,.081,e.bronze),pt(Z-.033,lt+.014,-.016,.082,.028,.095,e.bronze),r(gt(Z-.025,lt+.023,-.023),gt(Z,lt+.126,-.021),.02,e.brassDark,{cell:f})}t.add(A,b,Math.abs(dt)*(Mt+.194)+Math.abs(at)*(P+.11),Math.abs(at)*(Mt+.194)+Math.abs(dt)*(P+.11),L,L+Y+.11)}const d=-Math.PI/2,p=Math.PI,_=[{z:-7.72,width:3.48,depth:.47,levels:[.21,.65,1.05,1.429,1.83,2.233,2.707],bays:[1.06,.93,1.13],tag:0},{z:-3.86,width:3.85,depth:.442,levels:[.225,.68,1.067,1.491,1.865,2.268,2.758],bays:[1,1.18,1.02],tag:1},{z:.3,width:3.84,depth:.45,levels:[.191,.62,1.025,1.393,1.758,2.185,2.712],bays:[.96,1.1,.85,1.05],tag:4,drawerBays:[1,2]},{z:4.32,width:3.56,depth:.454,levels:[.215,.715,1.15,1.537,1.93,2.31,2.755],bays:[1.19,.93,1.16],tag:5}];for(const[m,f]of _.entries())h({...f,x:7.392,yaw:d,id:"lower-east-"+m,variant:m});h({id:"lower-entry-a",x:-4.6,z:8.28,yaw:p,width:4.06,depth:.456,levels:[.195,.626,1.042,1.456,1.851,2.249,2.747],bays:[.94,1.08,1.04],tag:8,variant:1}),h({id:"lower-entry-b",x:3.99,z:8.27,yaw:p,width:3.77,depth:.482,levels:[.213,.721,1.142,1.528,1.937,2.345,2.767],bays:[1.29,.85,1.07],tag:2,variant:2,drawerBays:[0]}),h({id:"lower-entry-c",x:6.78,z:8.272,yaw:p,width:1.2,depth:.455,levels:[.18,.62,1.02,1.44,1.84,2.24,2.72],bays:[1],tag:11,variant:3}),h({id:"lower-west",x:-7.36,z:-.35,yaw:-d,width:1.78,depth:.455,levels:[.173,.633,1.06,1.478,1.92,2.426],bays:[1.1,.83],tag:10,variant:2});for(const[m,f]of[0,Math.PI].entries())h({id:"island-"+m,x:.32,z:-5.95+(m?-.211:.211),yaw:f,width:3.32,depth:.405,levels:[.155,.558,.955,1.343,1.725],bays:[1.1,.86,1],tag:4+m*3,variant:1,display:!0});return n(.32,1.855,-5.95,3.54,.052,.905,e.oakWarm,{cell:"island-top"}),n(.32,1.876,-5.95,3.4,.011,.754,e.oak,{cell:"island-top"}),h({id:"low-atlas",x:2.15,z:-8.19,yaw:0,width:2.37,depth:.492,levels:[.19,.59,1.01],bays:[1,.9],tag:7,variant:2,display:!0}),[[-7.11,2.71,[.2,.63,1.03,1.435,1.81,2.195,2.659],[1.04,.88],5],[-3.77,3.6,[.193,.624,1.022,1.417,1.814,2.218,2.689],[1,1.13,.94],9],[.22,3.8,[.205,.648,1.089,1.484,1.89,2.296,2.709],[.96,1.08,.9],2],[4.22,3.71,[.22,.725,1.12,1.527,1.932,2.3,2.745],[1,.86,1.07],1]].forEach(([m,f,A,b,v],N)=>h({id:"upper-east-"+N,x:7.401,z:m,yaw:d,width:f,depth:.418,y:ot.galleryY,levels:A,bays:b,tag:v,variant:N+1})),h({id:"upper-south-a",x:-4.94,z:8.26,yaw:p,width:3.77,depth:.409,y:ot.galleryY,levels:[.2,.693,1.101,1.496,1.904,2.295,2.761],bays:[1.06,.87,.98],tag:1,variant:1}),h({id:"upper-south-b",x:-.61,z:8.265,yaw:p,width:3.546,depth:.413,y:ot.galleryY,levels:[.18,.608,1.023,1.457,1.863,2.248,2.772],bays:[1.11,1,.94],tag:3,variant:2}),h({id:"upper-south-c",x:5.62,z:8.27,yaw:p,width:2.98,depth:.421,y:ot.galleryY,levels:[.181,.625,1.05,1.458,1.86,2.28,2.754],bays:[1.14,1.05],tag:5,variant:4}),o}const Is=document.getElementById("room"),v0=document.getElementById("panel"),bn=document.getElementById("enter"),x0=document.getElementById("intro"),Ao=document.getElementById("status"),M0=document.getElementById("location"),S0=document.getElementById("play-controls"),y0="<kbd>ESC</kbd> Pause <kbd>R</kbd> Reset",E0="Drag to look <kbd>ESC</kbd> Pause <kbd>R</kbd> Reset";function b0(){const i=new Zm({antialias:!0,alpha:!1,powerPreference:"high-performance"}),t=i.domElement;t.setAttribute("aria-label","Ashcombe Reading Room"),t.tabIndex=0,Is.appendChild(t),i.outputColorSpace=Re,i.toneMapping=fl,i.toneMappingExposure=1.12,i.shadowMap.enabled=!0,i.shadowMap.type=Nr,i.shadowMap.autoUpdate=!1,i.shadowMap.needsUpdate=!0;const e=new _u;e.background=new Xt(13352354),e.fog=new Oo(13680546,28,135);const n=new Ne(56,1,.045,226),r=new oh(16247765,8681317,1.49);e.add(r);const s=new Ia(16773080,.54);s.position.set(4.7,7.1,5.3),e.add(s);const o=new Ia(16764567,3.12),a=new V(-.6,2.8,-1.7);o.position.copy(a).addScaledVector(Jl,37),o.target.position.copy(a),o.castShadow=!0,o.shadow.camera.left=-15.3,o.shadow.camera.right=15.3,o.shadow.camera.top=14.5,o.shadow.camera.bottom=-14,o.shadow.camera.near=16,o.shadow.camera.far=57,o.shadow.camera.updateProjectionMatrix(),o.shadow.mapSize.set(2048,2048),o.shadow.normalBias=.022,o.shadow.bias=-17e-5,o.shadow.radius=2.4,e.add(o,o.target);const c=Qm(),l=r0(e),u=o0(l,c),h=_0(l,c);a0(l,c,h),h.finish(),c0(l),l.finish();const d=e.children.filter(M=>M.userData.exterior),p=new Wr,_=new oe;let x=!0,m=0,f=0,A=!1,b=!1,v=!1;const N=e0(n,c,t,(M,C)=>{A=M!=="paused",v0.hidden=A,document.body.classList.toggle("playing",A),S0.innerHTML=M==="drag"?E0:y0,A||(bn.textContent=C?"Resume exploring":"Enter the library",x0.textContent=C?"Resume from your current viewpoint.":"Click to capture the mouse and explore.",v&&!b&&bn.focus({preventScroll:!0})),f=0,L()});function P(M){m=0;const C=f?Math.min(.05,(M-f)/1e3):0;f=M,N.tick(C,et=>{M0.textContent=et}),n.updateMatrixWorld(),_.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),p.setFromProjectionMatrix(_);const tt=u.some(et=>p.intersectsBox(et));if(tt!==x){x=tt;for(const et of d)et.visible=tt}i.render(e,n),A&&L()}function L(){v&&!m&&!b&&(m=requestAnimationFrame(P))}function F(){const M=Math.max(1,Is.clientWidth),C=Math.max(1,Is.clientHeight);n.aspect=M/C,n.updateProjectionMatrix(),i.setPixelRatio(Math.min(devicePixelRatio||1,1.37,Math.sqrt(235e4/(M*C)))),i.setSize(M,C,!1),L()}bn.addEventListener("click",N.begin),document.addEventListener("keydown",M=>{M.code==="KeyR"&&L()}),window.addEventListener("resize",F),t.addEventListener("webglcontextlost",M=>{M.preventDefault(),b=!0,cancelAnimationFrame(m),m=0,N.pause(),bn.disabled=!0,Ao.textContent="The graphics context was interrupted. Waiting for it to return…"}),t.addEventListener("webglcontextrestored",()=>{b=!1,i.shadowMap.enabled=!0,i.shadowMap.autoUpdate=!1,i.shadowMap.needsUpdate=!0,i.shadowMap.type=Nr,bn.disabled=!v,Ao.textContent="",F()}),F();function S(){v=!0,bn.disabled=b,bn.textContent="Enter the library",L()}i.compileAsync(e,n).then(S,S)}requestAnimationFrame(()=>{try{b0()}catch(i){console.error(i),bn.hidden=!0,Ao.textContent="The room could not start. Open this build in a desktop browser with WebGL 2 available."}});

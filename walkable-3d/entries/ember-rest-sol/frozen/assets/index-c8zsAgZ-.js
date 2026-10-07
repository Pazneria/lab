(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Ao="180",hc=0,Jo=1,uc=2,hl=1,ul=2,ln=3,An=0,Ct=1,cn=2,yn=0,hi=1,$o=2,jo=3,Qo=4,fc=5,zn=100,dc=101,pc=102,mc=103,gc=104,_c=200,vc=201,xc=202,Mc=203,Us=204,Ns=205,Sc=206,yc=207,Ec=208,Tc=209,Ac=210,bc=211,wc=212,Rc=213,Cc=214,Fs=0,Os=1,Bs=2,pi=3,zs=4,ks=5,Hs=6,Vs=7,fl=0,Pc=1,Lc=2,En=0,Dc=1,Ic=2,Uc=3,dl=4,Nc=5,Fc=6,Oc=7,pl=300,mi=301,gi=302,Gs=303,Ws=304,Hr=306,Dr=1e3,Hn=1001,Xs=1002,qt=1003,Bc=1004,Qi=1005,Jt=1006,Kr=1007,Vn=1008,Qt=1009,ml=1010,gl=1011,Oi=1012,bo=1013,Gn=1014,un=1015,qi=1016,wo=1017,Ro=1018,Bi=1020,_l=35902,vl=35899,xl=1021,Ml=1022,Xt=1023,zi=1026,ki=1027,Sl=1028,Co=1029,yl=1030,Po=1031,Lo=1033,Ar=33776,br=33777,wr=33778,Rr=33779,qs=35840,Ys=35841,Zs=35842,Ks=35843,Js=36196,$s=37492,js=37496,Qs=37808,eo=37809,to=37810,no=37811,io=37812,ro=37813,so=37814,oo=37815,ao=37816,lo=37817,co=37818,ho=37819,uo=37820,fo=37821,po=36492,mo=36494,go=36495,_o=36283,vo=36284,xo=36285,Mo=36286,zc=3200,kc=3201,El=0,Hc=1,Sn="",Et="srgb",_i="srgb-linear",Ir="linear",et="srgb",Zn=7680,ea=519,Vc=512,Gc=513,Wc=514,Tl=515,Xc=516,qc=517,Yc=518,Zc=519,ta=35044,na="300 es",$t=2e3,Ur=2001;class Mi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const xt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Jr=Math.PI/180,Nr=180/Math.PI;function Si(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(xt[n&255]+xt[n>>8&255]+xt[n>>16&255]+xt[n>>24&255]+"-"+xt[e&255]+xt[e>>8&255]+"-"+xt[e>>16&15|64]+xt[e>>24&255]+"-"+xt[t&63|128]+xt[t>>8&255]+"-"+xt[t>>16&255]+xt[t>>24&255]+xt[i&255]+xt[i>>8&255]+xt[i>>16&255]+xt[i>>24&255]).toLowerCase()}function Ge(n,e,t){return Math.max(e,Math.min(t,n))}function Kc(n,e){return(n%e+e)%e}function $r(n,e,t){return(1-t)*n+t*e}function Ai(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function wt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}class le{constructor(e=0,t=0){le.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ge(this.x,e.x,t.x),this.y=Ge(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ge(this.x,e,t),this.y=Ge(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ge(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ge(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Tn{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,o,a){let l=i[r+0],c=i[r+1],h=i[r+2],u=i[r+3];const f=s[o+0],p=s[o+1],m=s[o+2],_=s[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u;return}if(a===1){e[t+0]=f,e[t+1]=p,e[t+2]=m,e[t+3]=_;return}if(u!==_||l!==f||c!==p||h!==m){let g=1-a;const d=l*f+c*p+h*m+u*_,A=d>=0?1:-1,E=1-d*d;if(E>Number.EPSILON){const R=Math.sqrt(E),b=Math.atan2(R,d*A);g=Math.sin(g*b)/R,a=Math.sin(a*b)/R}const x=a*A;if(l=l*g+f*x,c=c*g+p*x,h=h*g+m*x,u=u*g+_*x,g===1-a){const R=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=R,c*=R,h*=R,u*=R}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,i,r,s,o){const a=i[r],l=i[r+1],c=i[r+2],h=i[r+3],u=s[o],f=s[o+1],p=s[o+2],m=s[o+3];return e[t]=a*m+h*u+l*p-c*f,e[t+1]=l*m+h*f+c*u-a*p,e[t+2]=c*m+h*p+a*f-l*u,e[t+3]=h*m-a*u-l*f-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(i/2),h=a(r/2),u=a(s/2),f=l(i/2),p=l(r/2),m=l(s/2);switch(o){case"XYZ":this._x=f*h*u+c*p*m,this._y=c*p*u-f*h*m,this._z=c*h*m+f*p*u,this._w=c*h*u-f*p*m;break;case"YXZ":this._x=f*h*u+c*p*m,this._y=c*p*u-f*h*m,this._z=c*h*m-f*p*u,this._w=c*h*u+f*p*m;break;case"ZXY":this._x=f*h*u-c*p*m,this._y=c*p*u+f*h*m,this._z=c*h*m+f*p*u,this._w=c*h*u-f*p*m;break;case"ZYX":this._x=f*h*u-c*p*m,this._y=c*p*u+f*h*m,this._z=c*h*m-f*p*u,this._w=c*h*u+f*p*m;break;case"YZX":this._x=f*h*u+c*p*m,this._y=c*p*u+f*h*m,this._z=c*h*m-f*p*u,this._w=c*h*u-f*p*m;break;case"XZY":this._x=f*h*u-c*p*m,this._y=c*p*u-f*h*m,this._z=c*h*m+f*p*u,this._w=c*h*u+f*p*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],o=t[1],a=t[5],l=t[9],c=t[2],h=t[6],u=t[10],f=i+a+u;if(f>0){const p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(h-l)*p,this._y=(s-c)*p,this._z=(o-r)*p}else if(i>a&&i>u){const p=2*Math.sqrt(1+i-a-u);this._w=(h-l)/p,this._x=.25*p,this._y=(r+o)/p,this._z=(s+c)/p}else if(a>u){const p=2*Math.sqrt(1+a-i-u);this._w=(s-c)/p,this._x=(r+o)/p,this._y=.25*p,this._z=(l+h)/p}else{const p=2*Math.sqrt(1+u-i-a);this._w=(o-r)/p,this._x=(s+c)/p,this._y=(l+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ge(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,o=e._w,a=t._x,l=t._y,c=t._z,h=t._w;return this._x=i*h+o*a+r*c-s*l,this._y=r*h+o*l+s*a-i*c,this._z=s*h+o*c+i*l-r*a,this._w=o*h-i*a-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,o=this._w;let a=o*e._w+i*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=i,this._y=r,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const p=1-t;return this._w=p*o+t*this._w,this._x=p*i+t*this._x,this._y=p*r+t*this._y,this._z=p*s+t*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-t)*h)/c,f=Math.sin(t*h)/c;return this._w=o*u+this._w*f,this._x=i*u+this._x*f,this._y=r*u+this._y*f,this._z=s*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class P{constructor(e=0,t=0,i=0){P.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(ia.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(ia.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*r-a*i),h=2*(a*t-s*r),u=2*(s*i-o*t);return this.x=t+l*c+o*u-a*h,this.y=i+l*h+a*c-s*u,this.z=r+l*u+s*h-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ge(this.x,e.x,t.x),this.y=Ge(this.y,e.y,t.y),this.z=Ge(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ge(this.x,e,t),this.y=Ge(this.y,e,t),this.z=Ge(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ge(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=r*l-s*a,this.y=s*o-i*l,this.z=i*a-r*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return jr.copy(this).projectOnVector(e),this.sub(jr)}reflect(e){return this.sub(jr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ge(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const jr=new P,ia=new Tn;class He{constructor(e,t,i,r,s,o,a,l,c){He.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,l,c)}set(e,t,i,r,s,o,a,l,c){const h=this.elements;return h[0]=e,h[1]=r,h[2]=a,h[3]=t,h[4]=s,h[5]=l,h[6]=i,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],h=i[4],u=i[7],f=i[2],p=i[5],m=i[8],_=r[0],g=r[3],d=r[6],A=r[1],E=r[4],x=r[7],R=r[2],b=r[5],C=r[8];return s[0]=o*_+a*A+l*R,s[3]=o*g+a*E+l*b,s[6]=o*d+a*x+l*C,s[1]=c*_+h*A+u*R,s[4]=c*g+h*E+u*b,s[7]=c*d+h*x+u*C,s[2]=f*_+p*A+m*R,s[5]=f*g+p*E+m*b,s[8]=f*d+p*x+m*C,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8];return t*o*h-t*a*c-i*s*h+i*a*l+r*s*c-r*o*l}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=h*o-a*c,f=a*l-h*s,p=c*s-o*l,m=t*u+i*f+r*p;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/m;return e[0]=u*_,e[1]=(r*c-h*i)*_,e[2]=(a*i-r*o)*_,e[3]=f*_,e[4]=(h*t-r*l)*_,e[5]=(r*s-a*t)*_,e[6]=p*_,e[7]=(i*l-c*t)*_,e[8]=(o*t-i*s)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*o+c*a)+o+e,-r*c,r*l,-r*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Qr.makeScale(e,t)),this}rotate(e){return this.premultiply(Qr.makeRotation(-e)),this}translate(e,t){return this.premultiply(Qr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Qr=new He;function Al(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Fr(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Jc(){const n=Fr("canvas");return n.style.display="block",n}const ra={};function Hi(n){n in ra||(ra[n]=!0,console.warn(n))}function $c(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}const sa=new He().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),oa=new He().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function jc(){const n={enabled:!0,workingColorSpace:_i,spaces:{},convert:function(r,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===et&&(r.r=fn(r.r),r.g=fn(r.g),r.b=fn(r.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===et&&(r.r=ui(r.r),r.g=ui(r.g),r.b=ui(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Sn?Ir:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,o){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Hi("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Hi("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[_i]:{primaries:e,whitePoint:i,transfer:Ir,toXYZ:sa,fromXYZ:oa,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Et},outputColorSpaceConfig:{drawingBufferColorSpace:Et}},[Et]:{primaries:e,whitePoint:i,transfer:et,toXYZ:sa,fromXYZ:oa,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Et}}}),n}const Je=jc();function fn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function ui(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Kn;class Qc{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Kn===void 0&&(Kn=Fr("canvas")),Kn.width=e.width,Kn.height=e.height;const r=Kn.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=Kn}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Fr("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=fn(s[o]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(fn(t[i]/255)*255):t[i]=fn(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let eh=0;class Do{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:eh++}),this.uuid=Si(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(es(r[o].image)):s.push(es(r[o]))}else s=es(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function es(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Qc.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let th=0;const ts=new P;class Tt extends Mi{constructor(e=Tt.DEFAULT_IMAGE,t=Tt.DEFAULT_MAPPING,i=Hn,r=Hn,s=Jt,o=Vn,a=Xt,l=Qt,c=Tt.DEFAULT_ANISOTROPY,h=Sn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:th++}),this.uuid=Si(),this.name="",this.source=new Do(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new le(0,0),this.repeat=new le(1,1),this.center=new le(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new He,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(ts).x}get height(){return this.source.getSize(ts).y}get depth(){return this.source.getSize(ts).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==pl)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Dr:e.x=e.x-Math.floor(e.x);break;case Hn:e.x=e.x<0?0:1;break;case Xs:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Dr:e.y=e.y-Math.floor(e.y);break;case Hn:e.y=e.y<0?0:1;break;case Xs:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Tt.DEFAULT_IMAGE=null;Tt.DEFAULT_MAPPING=pl;Tt.DEFAULT_ANISOTROPY=1;class tt{constructor(e=0,t=0,i=0,r=1){tt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*t+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*t+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*t+o[7]*i+o[11]*r+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const l=e.elements,c=l[0],h=l[4],u=l[8],f=l[1],p=l[5],m=l[9],_=l[2],g=l[6],d=l[10];if(Math.abs(h-f)<.01&&Math.abs(u-_)<.01&&Math.abs(m-g)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+_)<.1&&Math.abs(m+g)<.1&&Math.abs(c+p+d-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const E=(c+1)/2,x=(p+1)/2,R=(d+1)/2,b=(h+f)/4,C=(u+_)/4,I=(m+g)/4;return E>x&&E>R?E<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(E),r=b/i,s=C/i):x>R?x<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(x),i=b/r,s=I/r):R<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(R),i=C/s,r=I/s),this.set(i,r,s,t),this}let A=Math.sqrt((g-m)*(g-m)+(u-_)*(u-_)+(f-h)*(f-h));return Math.abs(A)<.001&&(A=1),this.x=(g-m)/A,this.y=(u-_)/A,this.z=(f-h)/A,this.w=Math.acos((c+p+d-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ge(this.x,e.x,t.x),this.y=Ge(this.y,e.y,t.y),this.z=Ge(this.z,e.z,t.z),this.w=Ge(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ge(this.x,e,t),this.y=Ge(this.y,e,t),this.z=Ge(this.z,e,t),this.w=Ge(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ge(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class nh extends Mi{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Jt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new tt(0,0,e,t),this.scissorTest=!1,this.viewport=new tt(0,0,e,t);const r={width:e,height:t,depth:i.depth},s=new Tt(r);this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){const t={minFilter:Jt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isArrayTexture=this.textures[r].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new Do(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Wn extends nh{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class bl extends Tt{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=qt,this.minFilter=qt,this.wrapR=Hn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class ih extends Tt{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=qt,this.minFilter=qt,this.wrapR=Hn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Yi{constructor(e=new P(1/0,1/0,1/0),t=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Ht.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Ht.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Ht.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Ht):Ht.fromBufferAttribute(s,o),Ht.applyMatrix4(e.matrixWorld),this.expandByPoint(Ht);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),er.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),er.copy(i.boundingBox)),er.applyMatrix4(e.matrixWorld),this.union(er)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Ht),Ht.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(bi),tr.subVectors(this.max,bi),Jn.subVectors(e.a,bi),$n.subVectors(e.b,bi),jn.subVectors(e.c,bi),dn.subVectors($n,Jn),pn.subVectors(jn,$n),Pn.subVectors(Jn,jn);let t=[0,-dn.z,dn.y,0,-pn.z,pn.y,0,-Pn.z,Pn.y,dn.z,0,-dn.x,pn.z,0,-pn.x,Pn.z,0,-Pn.x,-dn.y,dn.x,0,-pn.y,pn.x,0,-Pn.y,Pn.x,0];return!ns(t,Jn,$n,jn,tr)||(t=[1,0,0,0,1,0,0,0,1],!ns(t,Jn,$n,jn,tr))?!1:(nr.crossVectors(dn,pn),t=[nr.x,nr.y,nr.z],ns(t,Jn,$n,jn,tr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Ht).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Ht).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(nn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),nn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),nn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),nn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),nn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),nn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),nn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),nn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(nn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const nn=[new P,new P,new P,new P,new P,new P,new P,new P],Ht=new P,er=new Yi,Jn=new P,$n=new P,jn=new P,dn=new P,pn=new P,Pn=new P,bi=new P,tr=new P,nr=new P,Ln=new P;function ns(n,e,t,i,r){for(let s=0,o=n.length-3;s<=o;s+=3){Ln.fromArray(n,s);const a=r.x*Math.abs(Ln.x)+r.y*Math.abs(Ln.y)+r.z*Math.abs(Ln.z),l=e.dot(Ln),c=t.dot(Ln),h=i.dot(Ln);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const rh=new Yi,wi=new P,is=new P;class Io{constructor(e=new P,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):rh.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;wi.subVectors(e,this.center);const t=wi.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(wi,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(is.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(wi.copy(e.center).add(is)),this.expandByPoint(wi.copy(e.center).sub(is))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const rn=new P,rs=new P,ir=new P,mn=new P,ss=new P,rr=new P,os=new P;class sh{constructor(e=new P,t=new P(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,rn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=rn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(rn.copy(this.origin).addScaledVector(this.direction,t),rn.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){rs.copy(e).add(t).multiplyScalar(.5),ir.copy(t).sub(e).normalize(),mn.copy(this.origin).sub(rs);const s=e.distanceTo(t)*.5,o=-this.direction.dot(ir),a=mn.dot(this.direction),l=-mn.dot(ir),c=mn.lengthSq(),h=Math.abs(1-o*o);let u,f,p,m;if(h>0)if(u=o*l-a,f=o*a-l,m=s*h,u>=0)if(f>=-m)if(f<=m){const _=1/h;u*=_,f*=_,p=u*(u+o*f+2*a)+f*(o*u+f+2*l)+c}else f=s,u=Math.max(0,-(o*f+a)),p=-u*u+f*(f+2*l)+c;else f=-s,u=Math.max(0,-(o*f+a)),p=-u*u+f*(f+2*l)+c;else f<=-m?(u=Math.max(0,-(-o*s+a)),f=u>0?-s:Math.min(Math.max(-s,-l),s),p=-u*u+f*(f+2*l)+c):f<=m?(u=0,f=Math.min(Math.max(-s,-l),s),p=f*(f+2*l)+c):(u=Math.max(0,-(o*s+a)),f=u>0?s:Math.min(Math.max(-s,-l),s),p=-u*u+f*(f+2*l)+c);else f=o>0?-s:s,u=Math.max(0,-(o*f+a)),p=-u*u+f*(f+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(rs).addScaledVector(ir,f),p}intersectSphere(e,t){rn.subVectors(e.center,this.origin);const i=rn.dot(this.direction),r=rn.dot(rn)-i*i,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return c>=0?(i=(e.min.x-f.x)*c,r=(e.max.x-f.x)*c):(i=(e.max.x-f.x)*c,r=(e.min.x-f.x)*c),h>=0?(s=(e.min.y-f.y)*h,o=(e.max.y-f.y)*h):(s=(e.max.y-f.y)*h,o=(e.min.y-f.y)*h),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),u>=0?(a=(e.min.z-f.z)*u,l=(e.max.z-f.z)*u):(a=(e.max.z-f.z)*u,l=(e.min.z-f.z)*u),i>l||a>r)||((a>i||i!==i)&&(i=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,rn)!==null}intersectTriangle(e,t,i,r,s){ss.subVectors(t,e),rr.subVectors(i,e),os.crossVectors(ss,rr);let o=this.direction.dot(os),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;mn.subVectors(this.origin,e);const l=a*this.direction.dot(rr.crossVectors(mn,rr));if(l<0)return null;const c=a*this.direction.dot(ss.cross(mn));if(c<0||l+c>o)return null;const h=-a*mn.dot(os);return h<0?null:this.at(h/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class lt{constructor(e,t,i,r,s,o,a,l,c,h,u,f,p,m,_,g){lt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,l,c,h,u,f,p,m,_,g)}set(e,t,i,r,s,o,a,l,c,h,u,f,p,m,_,g){const d=this.elements;return d[0]=e,d[4]=t,d[8]=i,d[12]=r,d[1]=s,d[5]=o,d[9]=a,d[13]=l,d[2]=c,d[6]=h,d[10]=u,d[14]=f,d[3]=p,d[7]=m,d[11]=_,d[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new lt().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,r=1/Qn.setFromMatrixColumn(e,0).length(),s=1/Qn.setFromMatrixColumn(e,1).length(),o=1/Qn.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(r),c=Math.sin(r),h=Math.cos(s),u=Math.sin(s);if(e.order==="XYZ"){const f=o*h,p=o*u,m=a*h,_=a*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=p+m*c,t[5]=f-_*c,t[9]=-a*l,t[2]=_-f*c,t[6]=m+p*c,t[10]=o*l}else if(e.order==="YXZ"){const f=l*h,p=l*u,m=c*h,_=c*u;t[0]=f+_*a,t[4]=m*a-p,t[8]=o*c,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=p*a-m,t[6]=_+f*a,t[10]=o*l}else if(e.order==="ZXY"){const f=l*h,p=l*u,m=c*h,_=c*u;t[0]=f-_*a,t[4]=-o*u,t[8]=m+p*a,t[1]=p+m*a,t[5]=o*h,t[9]=_-f*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const f=o*h,p=o*u,m=a*h,_=a*u;t[0]=l*h,t[4]=m*c-p,t[8]=f*c+_,t[1]=l*u,t[5]=_*c+f,t[9]=p*c-m,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const f=o*l,p=o*c,m=a*l,_=a*c;t[0]=l*h,t[4]=_-f*u,t[8]=m*u+p,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-c*h,t[6]=p*u+m,t[10]=f-_*u}else if(e.order==="XZY"){const f=o*l,p=o*c,m=a*l,_=a*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=f*u+_,t[5]=o*h,t[9]=p*u-m,t[2]=m*u-p,t[6]=a*h,t[10]=_*u+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(oh,e,ah)}lookAt(e,t,i){const r=this.elements;return Dt.subVectors(e,t),Dt.lengthSq()===0&&(Dt.z=1),Dt.normalize(),gn.crossVectors(i,Dt),gn.lengthSq()===0&&(Math.abs(i.z)===1?Dt.x+=1e-4:Dt.z+=1e-4,Dt.normalize(),gn.crossVectors(i,Dt)),gn.normalize(),sr.crossVectors(Dt,gn),r[0]=gn.x,r[4]=sr.x,r[8]=Dt.x,r[1]=gn.y,r[5]=sr.y,r[9]=Dt.y,r[2]=gn.z,r[6]=sr.z,r[10]=Dt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],h=i[1],u=i[5],f=i[9],p=i[13],m=i[2],_=i[6],g=i[10],d=i[14],A=i[3],E=i[7],x=i[11],R=i[15],b=r[0],C=r[4],I=r[8],y=r[12],S=r[1],L=r[5],O=r[9],k=r[13],q=r[2],V=r[6],X=r[10],j=r[14],G=r[3],ue=r[7],_e=r[11],Me=r[15];return s[0]=o*b+a*S+l*q+c*G,s[4]=o*C+a*L+l*V+c*ue,s[8]=o*I+a*O+l*X+c*_e,s[12]=o*y+a*k+l*j+c*Me,s[1]=h*b+u*S+f*q+p*G,s[5]=h*C+u*L+f*V+p*ue,s[9]=h*I+u*O+f*X+p*_e,s[13]=h*y+u*k+f*j+p*Me,s[2]=m*b+_*S+g*q+d*G,s[6]=m*C+_*L+g*V+d*ue,s[10]=m*I+_*O+g*X+d*_e,s[14]=m*y+_*k+g*j+d*Me,s[3]=A*b+E*S+x*q+R*G,s[7]=A*C+E*L+x*V+R*ue,s[11]=A*I+E*O+x*X+R*_e,s[15]=A*y+E*k+x*j+R*Me,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],h=e[2],u=e[6],f=e[10],p=e[14],m=e[3],_=e[7],g=e[11],d=e[15];return m*(+s*l*u-r*c*u-s*a*f+i*c*f+r*a*p-i*l*p)+_*(+t*l*p-t*c*f+s*o*f-r*o*p+r*c*h-s*l*h)+g*(+t*c*u-t*a*p-s*o*u+i*o*p+s*a*h-i*c*h)+d*(-r*a*h-t*l*u+t*a*f+r*o*u-i*o*f+i*l*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=e[9],f=e[10],p=e[11],m=e[12],_=e[13],g=e[14],d=e[15],A=u*g*c-_*f*c+_*l*p-a*g*p-u*l*d+a*f*d,E=m*f*c-h*g*c-m*l*p+o*g*p+h*l*d-o*f*d,x=h*_*c-m*u*c+m*a*p-o*_*p-h*a*d+o*u*d,R=m*u*l-h*_*l-m*a*f+o*_*f+h*a*g-o*u*g,b=t*A+i*E+r*x+s*R;if(b===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const C=1/b;return e[0]=A*C,e[1]=(_*f*s-u*g*s-_*r*p+i*g*p+u*r*d-i*f*d)*C,e[2]=(a*g*s-_*l*s+_*r*c-i*g*c-a*r*d+i*l*d)*C,e[3]=(u*l*s-a*f*s-u*r*c+i*f*c+a*r*p-i*l*p)*C,e[4]=E*C,e[5]=(h*g*s-m*f*s+m*r*p-t*g*p-h*r*d+t*f*d)*C,e[6]=(m*l*s-o*g*s-m*r*c+t*g*c+o*r*d-t*l*d)*C,e[7]=(o*f*s-h*l*s+h*r*c-t*f*c-o*r*p+t*l*p)*C,e[8]=x*C,e[9]=(m*u*s-h*_*s-m*i*p+t*_*p+h*i*d-t*u*d)*C,e[10]=(o*_*s-m*a*s+m*i*c-t*_*c-o*i*d+t*a*d)*C,e[11]=(h*a*s-o*u*s-h*i*c+t*u*c+o*i*p-t*a*p)*C,e[12]=R*C,e[13]=(h*_*r-m*u*r+m*i*f-t*_*f-h*i*g+t*u*g)*C,e[14]=(m*a*r-o*_*r-m*i*l+t*_*l+o*i*g-t*a*g)*C,e[15]=(o*u*r-h*a*r+h*i*l-t*u*l-o*i*f+t*a*f)*C,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,o=e.x,a=e.y,l=e.z,c=s*o,h=s*a;return this.set(c*o+i,c*a-r*l,c*l+r*a,0,c*a+r*l,h*a+i,h*l-r*o,0,c*l-r*a,h*l+r*o,s*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,c=s+s,h=o+o,u=a+a,f=s*c,p=s*h,m=s*u,_=o*h,g=o*u,d=a*u,A=l*c,E=l*h,x=l*u,R=i.x,b=i.y,C=i.z;return r[0]=(1-(_+d))*R,r[1]=(p+x)*R,r[2]=(m-E)*R,r[3]=0,r[4]=(p-x)*b,r[5]=(1-(f+d))*b,r[6]=(g+A)*b,r[7]=0,r[8]=(m+E)*C,r[9]=(g-A)*C,r[10]=(1-(f+_))*C,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;let s=Qn.set(r[0],r[1],r[2]).length();const o=Qn.set(r[4],r[5],r[6]).length(),a=Qn.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],Vt.copy(this);const c=1/s,h=1/o,u=1/a;return Vt.elements[0]*=c,Vt.elements[1]*=c,Vt.elements[2]*=c,Vt.elements[4]*=h,Vt.elements[5]*=h,Vt.elements[6]*=h,Vt.elements[8]*=u,Vt.elements[9]*=u,Vt.elements[10]*=u,t.setFromRotationMatrix(Vt),i.x=s,i.y=o,i.z=a,this}makePerspective(e,t,i,r,s,o,a=$t,l=!1){const c=this.elements,h=2*s/(t-e),u=2*s/(i-r),f=(t+e)/(t-e),p=(i+r)/(i-r);let m,_;if(l)m=s/(o-s),_=o*s/(o-s);else if(a===$t)m=-(o+s)/(o-s),_=-2*o*s/(o-s);else if(a===Ur)m=-o/(o-s),_=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=u,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,r,s,o,a=$t,l=!1){const c=this.elements,h=2/(t-e),u=2/(i-r),f=-(t+e)/(t-e),p=-(i+r)/(i-r);let m,_;if(l)m=1/(o-s),_=o/(o-s);else if(a===$t)m=-2/(o-s),_=-(o+s)/(o-s);else if(a===Ur)m=-1/(o-s),_=-s/(o-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=0,c[12]=f,c[1]=0,c[5]=u,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=m,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Qn=new P,Vt=new lt,oh=new P(0,0,0),ah=new P(1,1,1),gn=new P,sr=new P,Dt=new P,aa=new lt,la=new Tn;class Yt{constructor(e=0,t=0,i=0,r=Yt.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],h=r[9],u=r[2],f=r[6],p=r[10];switch(t){case"XYZ":this._y=Math.asin(Ge(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ge(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ge(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Ge(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Ge(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-Ge(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return aa.makeRotationFromQuaternion(e),this.setFromRotationMatrix(aa,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return la.setFromEuler(this),this.setFromQuaternion(la,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Yt.DEFAULT_ORDER="XYZ";class wl{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let lh=0;const ca=new P,ei=new Tn,sn=new lt,or=new P,Ri=new P,ch=new P,hh=new Tn,ha=new P(1,0,0),ua=new P(0,1,0),fa=new P(0,0,1),da={type:"added"},uh={type:"removed"},ti={type:"childadded",child:null},as={type:"childremoved",child:null};class vt extends Mi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:lh++}),this.uuid=Si(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=vt.DEFAULT_UP.clone();const e=new P,t=new Yt,i=new Tn,r=new P(1,1,1);function s(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new lt},normalMatrix:{value:new He}}),this.matrix=new lt,this.matrixWorld=new lt,this.matrixAutoUpdate=vt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=vt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new wl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ei.setFromAxisAngle(e,t),this.quaternion.multiply(ei),this}rotateOnWorldAxis(e,t){return ei.setFromAxisAngle(e,t),this.quaternion.premultiply(ei),this}rotateX(e){return this.rotateOnAxis(ha,e)}rotateY(e){return this.rotateOnAxis(ua,e)}rotateZ(e){return this.rotateOnAxis(fa,e)}translateOnAxis(e,t){return ca.copy(e).applyQuaternion(this.quaternion),this.position.add(ca.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(ha,e)}translateY(e){return this.translateOnAxis(ua,e)}translateZ(e){return this.translateOnAxis(fa,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(sn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?or.copy(e):or.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Ri.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?sn.lookAt(Ri,or,this.up):sn.lookAt(or,Ri,this.up),this.quaternion.setFromRotationMatrix(sn),r&&(sn.extractRotation(r.matrixWorld),ei.setFromRotationMatrix(sn),this.quaternion.premultiply(ei.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(da),ti.child=e,this.dispatchEvent(ti),ti.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(uh),as.child=e,this.dispatchEvent(as),as.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),sn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),sn.multiply(e.parent.matrixWorld)),e.applyMatrix4(sn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(da),ti.child=e,this.dispatchEvent(ti),ti.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ri,e,ch),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ri,hh,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(a=>({...a})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];s(e.shapes,u)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),h=o(e.images),u=o(e.shapes),f=o(e.skeletons),p=o(e.animations),m=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),u.length>0&&(i.shapes=u),f.length>0&&(i.skeletons=f),p.length>0&&(i.animations=p),m.length>0&&(i.nodes=m)}return i.object=r,i;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}vt.DEFAULT_UP=new P(0,1,0);vt.DEFAULT_MATRIX_AUTO_UPDATE=!0;vt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Gt=new P,on=new P,ls=new P,an=new P,ni=new P,ii=new P,pa=new P,cs=new P,hs=new P,us=new P,fs=new tt,ds=new tt,ps=new tt;class Wt{constructor(e=new P,t=new P,i=new P){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),Gt.subVectors(e,t),r.cross(Gt);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){Gt.subVectors(r,t),on.subVectors(i,t),ls.subVectors(e,t);const o=Gt.dot(Gt),a=Gt.dot(on),l=Gt.dot(ls),c=on.dot(on),h=on.dot(ls),u=o*c-a*a;if(u===0)return s.set(0,0,0),null;const f=1/u,p=(c*l-a*h)*f,m=(o*h-a*l)*f;return s.set(1-p-m,m,p)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,an)===null?!1:an.x>=0&&an.y>=0&&an.x+an.y<=1}static getInterpolation(e,t,i,r,s,o,a,l){return this.getBarycoord(e,t,i,r,an)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,an.x),l.addScaledVector(o,an.y),l.addScaledVector(a,an.z),l)}static getInterpolatedAttribute(e,t,i,r,s,o){return fs.setScalar(0),ds.setScalar(0),ps.setScalar(0),fs.fromBufferAttribute(e,t),ds.fromBufferAttribute(e,i),ps.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(fs,s.x),o.addScaledVector(ds,s.y),o.addScaledVector(ps,s.z),o}static isFrontFacing(e,t,i,r){return Gt.subVectors(i,t),on.subVectors(e,t),Gt.cross(on).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Gt.subVectors(this.c,this.b),on.subVectors(this.a,this.b),Gt.cross(on).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Wt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Wt.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return Wt.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return Wt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Wt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let o,a;ni.subVectors(r,i),ii.subVectors(s,i),cs.subVectors(e,i);const l=ni.dot(cs),c=ii.dot(cs);if(l<=0&&c<=0)return t.copy(i);hs.subVectors(e,r);const h=ni.dot(hs),u=ii.dot(hs);if(h>=0&&u<=h)return t.copy(r);const f=l*u-h*c;if(f<=0&&l>=0&&h<=0)return o=l/(l-h),t.copy(i).addScaledVector(ni,o);us.subVectors(e,s);const p=ni.dot(us),m=ii.dot(us);if(m>=0&&p<=m)return t.copy(s);const _=p*c-l*m;if(_<=0&&c>=0&&m<=0)return a=c/(c-m),t.copy(i).addScaledVector(ii,a);const g=h*m-p*u;if(g<=0&&u-h>=0&&p-m>=0)return pa.subVectors(s,r),a=(u-h)/(u-h+(p-m)),t.copy(r).addScaledVector(pa,a);const d=1/(g+_+f);return o=_*d,a=f*d,t.copy(i).addScaledVector(ni,o).addScaledVector(ii,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Rl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},_n={h:0,s:0,l:0},ar={h:0,s:0,l:0};function ms(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class We{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Et){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Je.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=Je.workingColorSpace){return this.r=e,this.g=t,this.b=i,Je.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=Je.workingColorSpace){if(e=Kc(e,1),t=Ge(t,0,1),i=Ge(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,o=2*i-s;this.r=ms(o,s,e+1/3),this.g=ms(o,s,e),this.b=ms(o,s,e-1/3)}return Je.colorSpaceToWorking(this,r),this}setStyle(e,t=Et){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Et){const i=Rl[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=fn(e.r),this.g=fn(e.g),this.b=fn(e.b),this}copyLinearToSRGB(e){return this.r=ui(e.r),this.g=ui(e.g),this.b=ui(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Et){return Je.workingToColorSpace(Mt.copy(this),e),Math.round(Ge(Mt.r*255,0,255))*65536+Math.round(Ge(Mt.g*255,0,255))*256+Math.round(Ge(Mt.b*255,0,255))}getHexString(e=Et){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Je.workingColorSpace){Je.workingToColorSpace(Mt.copy(this),t);const i=Mt.r,r=Mt.g,s=Mt.b,o=Math.max(i,r,s),a=Math.min(i,r,s);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case i:l=(r-s)/u+(r<s?6:0);break;case r:l=(s-i)/u+2;break;case s:l=(i-r)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=Je.workingColorSpace){return Je.workingToColorSpace(Mt.copy(this),t),e.r=Mt.r,e.g=Mt.g,e.b=Mt.b,e}getStyle(e=Et){Je.workingToColorSpace(Mt.copy(this),e);const t=Mt.r,i=Mt.g,r=Mt.b;return e!==Et?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(_n),this.setHSL(_n.h+e,_n.s+t,_n.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(_n),e.getHSL(ar);const i=$r(_n.h,ar.h,t),r=$r(_n.s,ar.s,t),s=$r(_n.l,ar.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Mt=new We;We.NAMES=Rl;let fh=0;class Zi extends Mi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:fh++}),this.uuid=Si(),this.name="",this.type="Material",this.blending=hi,this.side=An,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Us,this.blendDst=Ns,this.blendEquation=zn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new We(0,0,0),this.blendAlpha=0,this.depthFunc=pi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ea,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Zn,this.stencilZFail=Zn,this.stencilZPass=Zn,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==hi&&(i.blending=this.blending),this.side!==An&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Us&&(i.blendSrc=this.blendSrc),this.blendDst!==Ns&&(i.blendDst=this.blendDst),this.blendEquation!==zn&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==pi&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ea&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Zn&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Zn&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Zn&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(t){const s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Uo extends Zi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new We(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Yt,this.combine=fl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const pt=new P,lr=new le;let dh=0;class kt{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:dh++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=ta,this.updateRanges=[],this.gpuType=un,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)lr.fromBufferAttribute(this,t),lr.applyMatrix3(e),this.setXY(t,lr.x,lr.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)pt.fromBufferAttribute(this,t),pt.applyMatrix3(e),this.setXYZ(t,pt.x,pt.y,pt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)pt.fromBufferAttribute(this,t),pt.applyMatrix4(e),this.setXYZ(t,pt.x,pt.y,pt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)pt.fromBufferAttribute(this,t),pt.applyNormalMatrix(e),this.setXYZ(t,pt.x,pt.y,pt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)pt.fromBufferAttribute(this,t),pt.transformDirection(e),this.setXYZ(t,pt.x,pt.y,pt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Ai(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=wt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ai(t,this.array)),t}setX(e,t){return this.normalized&&(t=wt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ai(t,this.array)),t}setY(e,t){return this.normalized&&(t=wt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ai(t,this.array)),t}setZ(e,t){return this.normalized&&(t=wt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ai(t,this.array)),t}setW(e,t){return this.normalized&&(t=wt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=wt(t,this.array),i=wt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=wt(t,this.array),i=wt(i,this.array),r=wt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=wt(t,this.array),i=wt(i,this.array),r=wt(r,this.array),s=wt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==ta&&(e.usage=this.usage),e}}class Cl extends kt{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Pl extends kt{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class ot extends kt{constructor(e,t,i){super(new Float32Array(e),t,i)}}let ph=0;const Bt=new lt,gs=new vt,ri=new P,It=new Yi,Ci=new Yi,_t=new P;class At extends Mi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ph++}),this.uuid=Si(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Al(e)?Pl:Cl)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new He().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Bt.makeRotationFromQuaternion(e),this.applyMatrix4(Bt),this}rotateX(e){return Bt.makeRotationX(e),this.applyMatrix4(Bt),this}rotateY(e){return Bt.makeRotationY(e),this.applyMatrix4(Bt),this}rotateZ(e){return Bt.makeRotationZ(e),this.applyMatrix4(Bt),this}translate(e,t,i){return Bt.makeTranslation(e,t,i),this.applyMatrix4(Bt),this}scale(e,t,i){return Bt.makeScale(e,t,i),this.applyMatrix4(Bt),this}lookAt(e){return gs.lookAt(e),gs.updateMatrix(),this.applyMatrix4(gs.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ri).negate(),this.translate(ri.x,ri.y,ri.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const o=e[r];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new ot(i,3))}else{const i=Math.min(e.length,t.count);for(let r=0;r<i;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Yi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];It.setFromBufferAttribute(s),this.morphTargetsRelative?(_t.addVectors(this.boundingBox.min,It.min),this.boundingBox.expandByPoint(_t),_t.addVectors(this.boundingBox.max,It.max),this.boundingBox.expandByPoint(_t)):(this.boundingBox.expandByPoint(It.min),this.boundingBox.expandByPoint(It.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Io);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(e){const i=this.boundingSphere.center;if(It.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];Ci.setFromBufferAttribute(a),this.morphTargetsRelative?(_t.addVectors(It.min,Ci.min),It.expandByPoint(_t),_t.addVectors(It.max,Ci.max),It.expandByPoint(_t)):(It.expandByPoint(Ci.min),It.expandByPoint(Ci.max))}It.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)_t.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(_t));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)_t.fromBufferAttribute(a,c),l&&(ri.fromBufferAttribute(e,c),_t.add(ri)),r=Math.max(r,i.distanceToSquared(_t))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new kt(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let I=0;I<i.count;I++)a[I]=new P,l[I]=new P;const c=new P,h=new P,u=new P,f=new le,p=new le,m=new le,_=new P,g=new P;function d(I,y,S){c.fromBufferAttribute(i,I),h.fromBufferAttribute(i,y),u.fromBufferAttribute(i,S),f.fromBufferAttribute(s,I),p.fromBufferAttribute(s,y),m.fromBufferAttribute(s,S),h.sub(c),u.sub(c),p.sub(f),m.sub(f);const L=1/(p.x*m.y-m.x*p.y);isFinite(L)&&(_.copy(h).multiplyScalar(m.y).addScaledVector(u,-p.y).multiplyScalar(L),g.copy(u).multiplyScalar(p.x).addScaledVector(h,-m.x).multiplyScalar(L),a[I].add(_),a[y].add(_),a[S].add(_),l[I].add(g),l[y].add(g),l[S].add(g))}let A=this.groups;A.length===0&&(A=[{start:0,count:e.count}]);for(let I=0,y=A.length;I<y;++I){const S=A[I],L=S.start,O=S.count;for(let k=L,q=L+O;k<q;k+=3)d(e.getX(k+0),e.getX(k+1),e.getX(k+2))}const E=new P,x=new P,R=new P,b=new P;function C(I){R.fromBufferAttribute(r,I),b.copy(R);const y=a[I];E.copy(y),E.sub(R.multiplyScalar(R.dot(y))).normalize(),x.crossVectors(b,y);const L=x.dot(l[I])<0?-1:1;o.setXYZW(I,E.x,E.y,E.z,L)}for(let I=0,y=A.length;I<y;++I){const S=A[I],L=S.start,O=S.count;for(let k=L,q=L+O;k<q;k+=3)C(e.getX(k+0)),C(e.getX(k+1)),C(e.getX(k+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new kt(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let f=0,p=i.count;f<p;f++)i.setXYZ(f,0,0,0);const r=new P,s=new P,o=new P,a=new P,l=new P,c=new P,h=new P,u=new P;if(e)for(let f=0,p=e.count;f<p;f+=3){const m=e.getX(f+0),_=e.getX(f+1),g=e.getX(f+2);r.fromBufferAttribute(t,m),s.fromBufferAttribute(t,_),o.fromBufferAttribute(t,g),h.subVectors(o,s),u.subVectors(r,s),h.cross(u),a.fromBufferAttribute(i,m),l.fromBufferAttribute(i,_),c.fromBufferAttribute(i,g),a.add(h),l.add(h),c.add(h),i.setXYZ(m,a.x,a.y,a.z),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(g,c.x,c.y,c.z)}else for(let f=0,p=t.count;f<p;f+=3)r.fromBufferAttribute(t,f+0),s.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),h.subVectors(o,s),u.subVectors(r,s),h.cross(u),i.setXYZ(f+0,h.x,h.y,h.z),i.setXYZ(f+1,h.x,h.y,h.z),i.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)_t.fromBufferAttribute(e,t),_t.normalize(),e.setXYZ(t,_t.x,_t.y,_t.z)}toNonIndexed(){function e(a,l){const c=a.array,h=a.itemSize,u=a.normalized,f=new c.constructor(l.length*h);let p=0,m=0;for(let _=0,g=l.length;_<g;_++){a.isInterleavedBufferAttribute?p=l[_]*a.data.stride+a.offset:p=l[_]*h;for(let d=0;d<h;d++)f[m++]=c[p++]}return new kt(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new At,i=this.index.array,r=this.attributes;for(const a in r){const l=r[a],c=e(l,i);t.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let h=0,u=c.length;h<u;h++){const f=c[h],p=e(f,i);l.push(p)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,f=c.length;u<f;u++){const p=c[u];h.push(p.toJSON(e.data))}h.length>0&&(r[l]=h,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const c in r){const h=r[c];this.setAttribute(c,h.clone(t))}const s=e.morphAttributes;for(const c in s){const h=[],u=s[c];for(let f=0,p=u.length;f<p;f++)h.push(u[f].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,h=o.length;c<h;c++){const u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const ma=new lt,Dn=new sh,cr=new Io,ga=new P,hr=new P,ur=new P,fr=new P,_s=new P,dr=new P,_a=new P,pr=new P;class jt extends vt{constructor(e=new At,t=new Uo){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){dr.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const h=a[l],u=s[l];h!==0&&(_s.fromBufferAttribute(u,e),o?dr.addScaledVector(_s,h):dr.addScaledVector(_s.sub(t),h))}t.add(dr)}return t}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),cr.copy(i.boundingSphere),cr.applyMatrix4(s),Dn.copy(e.ray).recast(e.near),!(cr.containsPoint(Dn.origin)===!1&&(Dn.intersectSphere(cr,ga)===null||Dn.origin.distanceToSquared(ga)>(e.far-e.near)**2))&&(ma.copy(s).invert(),Dn.copy(e.ray).applyMatrix4(ma),!(i.boundingBox!==null&&Dn.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Dn)))}_computeIntersections(e,t,i){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,f=s.groups,p=s.drawRange;if(a!==null)if(Array.isArray(o))for(let m=0,_=f.length;m<_;m++){const g=f[m],d=o[g.materialIndex],A=Math.max(g.start,p.start),E=Math.min(a.count,Math.min(g.start+g.count,p.start+p.count));for(let x=A,R=E;x<R;x+=3){const b=a.getX(x),C=a.getX(x+1),I=a.getX(x+2);r=mr(this,d,e,i,c,h,u,b,C,I),r&&(r.faceIndex=Math.floor(x/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{const m=Math.max(0,p.start),_=Math.min(a.count,p.start+p.count);for(let g=m,d=_;g<d;g+=3){const A=a.getX(g),E=a.getX(g+1),x=a.getX(g+2);r=mr(this,o,e,i,c,h,u,A,E,x),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let m=0,_=f.length;m<_;m++){const g=f[m],d=o[g.materialIndex],A=Math.max(g.start,p.start),E=Math.min(l.count,Math.min(g.start+g.count,p.start+p.count));for(let x=A,R=E;x<R;x+=3){const b=x,C=x+1,I=x+2;r=mr(this,d,e,i,c,h,u,b,C,I),r&&(r.faceIndex=Math.floor(x/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{const m=Math.max(0,p.start),_=Math.min(l.count,p.start+p.count);for(let g=m,d=_;g<d;g+=3){const A=g,E=g+1,x=g+2;r=mr(this,o,e,i,c,h,u,A,E,x),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}}}function mh(n,e,t,i,r,s,o,a){let l;if(e.side===Ct?l=i.intersectTriangle(o,s,r,!0,a):l=i.intersectTriangle(r,s,o,e.side===An,a),l===null)return null;pr.copy(a),pr.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(pr);return c<t.near||c>t.far?null:{distance:c,point:pr.clone(),object:n}}function mr(n,e,t,i,r,s,o,a,l,c){n.getVertexPosition(a,hr),n.getVertexPosition(l,ur),n.getVertexPosition(c,fr);const h=mh(n,e,t,i,hr,ur,fr,_a);if(h){const u=new P;Wt.getBarycoord(_a,hr,ur,fr,u),r&&(h.uv=Wt.getInterpolatedAttribute(r,a,l,c,u,new le)),s&&(h.uv1=Wt.getInterpolatedAttribute(s,a,l,c,u,new le)),o&&(h.normal=Wt.getInterpolatedAttribute(o,a,l,c,u,new P),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new P,materialIndex:0};Wt.getNormal(hr,ur,fr,f.normal),h.face=f,h.barycoord=u}return h}class Xn extends At{constructor(e=1,t=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],h=[],u=[];let f=0,p=0;m("z","y","x",-1,-1,i,t,e,o,s,0),m("z","y","x",1,-1,i,t,-e,o,s,1),m("x","z","y",1,1,e,i,t,r,o,2),m("x","z","y",1,-1,e,i,-t,r,o,3),m("x","y","z",1,-1,e,t,i,r,s,4),m("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new ot(c,3)),this.setAttribute("normal",new ot(h,3)),this.setAttribute("uv",new ot(u,2));function m(_,g,d,A,E,x,R,b,C,I,y){const S=x/C,L=R/I,O=x/2,k=R/2,q=b/2,V=C+1,X=I+1;let j=0,G=0;const ue=new P;for(let _e=0;_e<X;_e++){const Me=_e*L-k;for(let ze=0;ze<V;ze++){const Ye=ze*S-O;ue[_]=Ye*A,ue[g]=Me*E,ue[d]=q,c.push(ue.x,ue.y,ue.z),ue[_]=0,ue[g]=0,ue[d]=b>0?1:-1,h.push(ue.x,ue.y,ue.z),u.push(ze/C),u.push(1-_e/I),j+=1}}for(let _e=0;_e<I;_e++)for(let Me=0;Me<C;Me++){const ze=f+Me+V*_e,Ye=f+Me+V*(_e+1),je=f+(Me+1)+V*(_e+1),Ze=f+(Me+1)+V*_e;l.push(ze,Ye,Ze),l.push(Ye,je,Ze),G+=6}a.addGroup(p,G,y),p+=G,f+=j}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Xn(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function vi(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone():Array.isArray(r)?e[t][i]=r.slice():e[t][i]=r}}return e}function yt(n){const e={};for(let t=0;t<n.length;t++){const i=vi(n[t]);for(const r in i)e[r]=i[r]}return e}function gh(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Ll(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Je.workingColorSpace}const _h={clone:vi,merge:yt};var vh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,xh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class bn extends Zi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=vh,this.fragmentShader=xh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=vi(e.uniforms),this.uniformsGroups=gh(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class Dl extends vt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new lt,this.projectionMatrix=new lt,this.projectionMatrixInverse=new lt,this.coordinateSystem=$t,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const vn=new P,va=new le,xa=new le;class Rt extends Dl{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Nr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Jr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Nr*2*Math.atan(Math.tan(Jr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){vn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(vn.x,vn.y).multiplyScalar(-e/vn.z),vn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(vn.x,vn.y).multiplyScalar(-e/vn.z)}getViewSize(e,t){return this.getViewBounds(e,va,xa),t.subVectors(xa,va)}setViewOffset(e,t,i,r,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Jr*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,t-=o.offsetY*i/c,r*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const si=-90,oi=1;class Mh extends vt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Rt(si,oi,e,t);r.layers=this.layers,this.add(r);const s=new Rt(si,oi,e,t);s.layers=this.layers,this.add(s);const o=new Rt(si,oi,e,t);o.layers=this.layers,this.add(o);const a=new Rt(si,oi,e,t);a.layers=this.layers,this.add(a);const l=new Rt(si,oi,e,t);l.layers=this.layers,this.add(l);const c=new Rt(si,oi,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,o,a,l]=t;for(const c of t)this.remove(c);if(e===$t)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Ur)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,h]=this.children,u=e.getRenderTarget(),f=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(t,s),e.setRenderTarget(i,1,r),e.render(t,o),e.setRenderTarget(i,2,r),e.render(t,a),e.setRenderTarget(i,3,r),e.render(t,l),e.setRenderTarget(i,4,r),e.render(t,c),i.texture.generateMipmaps=_,e.setRenderTarget(i,5,r),e.render(t,h),e.setRenderTarget(u,f,p),e.xr.enabled=m,i.texture.needsPMREMUpdate=!0}}class Il extends Tt{constructor(e=[],t=mi,i,r,s,o,a,l,c,h){super(e,t,i,r,s,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Sh extends Wn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new Il(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Xn(5,5,5),s=new bn({name:"CubemapFromEquirect",uniforms:vi(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Ct,blending:yn});s.uniforms.tEquirect.value=t;const o=new jt(r,s),a=t.minFilter;return t.minFilter===Vn&&(t.minFilter=Jt),new Mh(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,r);e.setRenderTarget(s)}}class gr extends vt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const yh={type:"move"};class vs{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new gr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new gr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new gr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const _ of e.hand.values()){const g=t.getJointPose(_,i),d=this._getHandJoint(c,_);g!==null&&(d.matrix.fromArray(g.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=g.radius),d.visible=g!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],f=h.position.distanceTo(u.position),p=.02,m=.005;c.inputState.pinching&&f>p+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=p-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(yh)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new gr;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class No{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new We(e),this.density=t}clone(){return new No(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Eh extends vt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Yt,this.environmentIntensity=1,this.environmentRotation=new Yt,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const xs=new P,Th=new P,Ah=new He;class On{constructor(e=new P(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=xs.subVectors(i,t).cross(Th.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(xs),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||Ah.getNormalMatrix(e),r=this.coplanarPoint(xs).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const In=new Io,bh=new le(.5,.5),_r=new P;class Fo{constructor(e=new On,t=new On,i=new On,r=new On,s=new On,o=new On){this.planes=[e,t,i,r,s,o]}set(e,t,i,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=$t,i=!1){const r=this.planes,s=e.elements,o=s[0],a=s[1],l=s[2],c=s[3],h=s[4],u=s[5],f=s[6],p=s[7],m=s[8],_=s[9],g=s[10],d=s[11],A=s[12],E=s[13],x=s[14],R=s[15];if(r[0].setComponents(c-o,p-h,d-m,R-A).normalize(),r[1].setComponents(c+o,p+h,d+m,R+A).normalize(),r[2].setComponents(c+a,p+u,d+_,R+E).normalize(),r[3].setComponents(c-a,p-u,d-_,R-E).normalize(),i)r[4].setComponents(l,f,g,x).normalize(),r[5].setComponents(c-l,p-f,d-g,R-x).normalize();else if(r[4].setComponents(c-l,p-f,d-g,R-x).normalize(),t===$t)r[5].setComponents(c+l,p+f,d+g,R+x).normalize();else if(t===Ur)r[5].setComponents(l,f,g,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),In.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),In.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(In)}intersectsSprite(e){In.center.set(0,0,0);const t=bh.distanceTo(e.center);return In.radius=.7071067811865476+t,In.applyMatrix4(e.matrixWorld),this.intersectsSphere(In)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(_r.x=r.normal.x>0?e.max.x:e.min.x,_r.y=r.normal.y>0?e.max.y:e.min.y,_r.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(_r)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Ul extends Tt{constructor(e,t,i,r,s,o,a,l,c){super(e,t,i,r,s,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Nl extends Tt{constructor(e,t,i=Gn,r,s,o,a=qt,l=qt,c,h=zi,u=1){if(h!==zi&&h!==ki)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:e,height:t,depth:u};super(f,r,s,o,a,l,h,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Do(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Fl extends Tt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Or extends At{constructor(e=1,t=1,i=1,r=32,s=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const h=[],u=[],f=[],p=[];let m=0;const _=[],g=i/2;let d=0;A(),o===!1&&(e>0&&E(!0),t>0&&E(!1)),this.setIndex(h),this.setAttribute("position",new ot(u,3)),this.setAttribute("normal",new ot(f,3)),this.setAttribute("uv",new ot(p,2));function A(){const x=new P,R=new P;let b=0;const C=(t-e)/i;for(let I=0;I<=s;I++){const y=[],S=I/s,L=S*(t-e)+e;for(let O=0;O<=r;O++){const k=O/r,q=k*l+a,V=Math.sin(q),X=Math.cos(q);R.x=L*V,R.y=-S*i+g,R.z=L*X,u.push(R.x,R.y,R.z),x.set(V,C,X).normalize(),f.push(x.x,x.y,x.z),p.push(k,1-S),y.push(m++)}_.push(y)}for(let I=0;I<r;I++)for(let y=0;y<s;y++){const S=_[y][I],L=_[y+1][I],O=_[y+1][I+1],k=_[y][I+1];(e>0||y!==0)&&(h.push(S,L,k),b+=3),(t>0||y!==s-1)&&(h.push(L,O,k),b+=3)}c.addGroup(d,b,0),d+=b}function E(x){const R=m,b=new le,C=new P;let I=0;const y=x===!0?e:t,S=x===!0?1:-1;for(let O=1;O<=r;O++)u.push(0,g*S,0),f.push(0,S,0),p.push(.5,.5),m++;const L=m;for(let O=0;O<=r;O++){const q=O/r*l+a,V=Math.cos(q),X=Math.sin(q);C.x=y*X,C.y=g*S,C.z=y*V,u.push(C.x,C.y,C.z),f.push(0,S,0),b.x=V*.5+.5,b.y=X*.5*S+.5,p.push(b.x,b.y),m++}for(let O=0;O<r;O++){const k=R+O,q=L+O;x===!0?h.push(q,q+1,k):h.push(q+1,q,k),I+=3}c.addGroup(d,I,x===!0?1:2),d+=I}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Or(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class en{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){const i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let i,r=this.getPoint(0),s=0;t.push(0);for(let o=1;o<=e;o++)i=this.getPoint(o/e),s+=i.distanceTo(r),t.push(s),r=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const i=this.getLengths();let r=0;const s=i.length;let o;t?o=t:o=e*i[s-1];let a=0,l=s-1,c;for(;a<=l;)if(r=Math.floor(a+(l-a)/2),c=i[r]-o,c<0)a=r+1;else if(c>0)l=r-1;else{l=r;break}if(r=l,i[r]===o)return r/(s-1);const h=i[r],f=i[r+1]-h,p=(o-h)/f;return(r+p)/(s-1)}getTangent(e,t){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);const o=this.getPoint(r),a=this.getPoint(s),l=t||(o.isVector2?new le:new P);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){const i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t=!1){const i=new P,r=[],s=[],o=[],a=new P,l=new lt;for(let p=0;p<=e;p++){const m=p/e;r[p]=this.getTangentAt(m,new P)}s[0]=new P,o[0]=new P;let c=Number.MAX_VALUE;const h=Math.abs(r[0].x),u=Math.abs(r[0].y),f=Math.abs(r[0].z);h<=c&&(c=h,i.set(1,0,0)),u<=c&&(c=u,i.set(0,1,0)),f<=c&&i.set(0,0,1),a.crossVectors(r[0],i).normalize(),s[0].crossVectors(r[0],a),o[0].crossVectors(r[0],s[0]);for(let p=1;p<=e;p++){if(s[p]=s[p-1].clone(),o[p]=o[p-1].clone(),a.crossVectors(r[p-1],r[p]),a.length()>Number.EPSILON){a.normalize();const m=Math.acos(Ge(r[p-1].dot(r[p]),-1,1));s[p].applyMatrix4(l.makeRotationAxis(a,m))}o[p].crossVectors(r[p],s[p])}if(t===!0){let p=Math.acos(Ge(s[0].dot(s[e]),-1,1));p/=e,r[0].dot(a.crossVectors(s[0],s[e]))>0&&(p=-p);for(let m=1;m<=e;m++)s[m].applyMatrix4(l.makeRotationAxis(r[m],p*m)),o[m].crossVectors(r[m],s[m])}return{tangents:r,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Oo extends en{constructor(e=0,t=0,i=1,r=1,s=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,t=new le){const i=t,r=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(o?s=0:s=r),this.aClockwise===!0&&!o&&(s===r?s=-r:s=s-r);const a=this.aStartAngle+e*s;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),f=l-this.aX,p=c-this.aY;l=f*h-p*u+this.aX,c=f*u+p*h+this.aY}return i.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class wh extends Oo{constructor(e,t,i,r,s,o){super(e,t,i,i,r,s,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Bo(){let n=0,e=0,t=0,i=0;function r(s,o,a,l){n=s,e=a,t=-3*s+3*o-2*a-l,i=2*s-2*o+a+l}return{initCatmullRom:function(s,o,a,l,c){r(o,a,c*(a-s),c*(l-o))},initNonuniformCatmullRom:function(s,o,a,l,c,h,u){let f=(o-s)/c-(a-s)/(c+h)+(a-o)/h,p=(a-o)/h-(l-o)/(h+u)+(l-a)/u;f*=h,p*=h,r(o,a,f,p)},calc:function(s){const o=s*s,a=o*s;return n+e*s+t*o+i*a}}}const vr=new P,Ms=new Bo,Ss=new Bo,ys=new Bo;class Ol extends en{constructor(e=[],t=!1,i="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=r}getPoint(e,t=new P){const i=t,r=this.points,s=r.length,o=(s-(this.closed?0:1))*e;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:l===0&&a===s-1&&(a=s-2,l=1);let c,h;this.closed||a>0?c=r[(a-1)%s]:(vr.subVectors(r[0],r[1]).add(r[0]),c=vr);const u=r[a%s],f=r[(a+1)%s];if(this.closed||a+2<s?h=r[(a+2)%s]:(vr.subVectors(r[s-1],r[s-2]).add(r[s-1]),h=vr),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let m=Math.pow(c.distanceToSquared(u),p),_=Math.pow(u.distanceToSquared(f),p),g=Math.pow(f.distanceToSquared(h),p);_<1e-4&&(_=1),m<1e-4&&(m=_),g<1e-4&&(g=_),Ms.initNonuniformCatmullRom(c.x,u.x,f.x,h.x,m,_,g),Ss.initNonuniformCatmullRom(c.y,u.y,f.y,h.y,m,_,g),ys.initNonuniformCatmullRom(c.z,u.z,f.z,h.z,m,_,g)}else this.curveType==="catmullrom"&&(Ms.initCatmullRom(c.x,u.x,f.x,h.x,this.tension),Ss.initCatmullRom(c.y,u.y,f.y,h.y,this.tension),ys.initCatmullRom(c.z,u.z,f.z,h.z,this.tension));return i.set(Ms.calc(l),Ss.calc(l),ys.calc(l)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(new P().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Ma(n,e,t,i,r){const s=(i-e)*.5,o=(r-t)*.5,a=n*n,l=n*a;return(2*t-2*i+s+o)*l+(-3*t+3*i-2*s-o)*a+s*n+t}function Rh(n,e){const t=1-n;return t*t*e}function Ch(n,e){return 2*(1-n)*n*e}function Ph(n,e){return n*n*e}function Ni(n,e,t,i){return Rh(n,e)+Ch(n,t)+Ph(n,i)}function Lh(n,e){const t=1-n;return t*t*t*e}function Dh(n,e){const t=1-n;return 3*t*t*n*e}function Ih(n,e){return 3*(1-n)*n*n*e}function Uh(n,e){return n*n*n*e}function Fi(n,e,t,i,r){return Lh(n,e)+Dh(n,t)+Ih(n,i)+Uh(n,r)}class Bl extends en{constructor(e=new le,t=new le,i=new le,r=new le){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=r}getPoint(e,t=new le){const i=t,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return i.set(Fi(e,r.x,s.x,o.x,a.x),Fi(e,r.y,s.y,o.y,a.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Nh extends en{constructor(e=new P,t=new P,i=new P,r=new P){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=r}getPoint(e,t=new P){const i=t,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return i.set(Fi(e,r.x,s.x,o.x,a.x),Fi(e,r.y,s.y,o.y,a.y),Fi(e,r.z,s.z,o.z,a.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class zl extends en{constructor(e=new le,t=new le){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new le){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new le){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Fh extends en{constructor(e=new P,t=new P){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new P){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new P){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class kl extends en{constructor(e=new le,t=new le,i=new le){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new le){const i=t,r=this.v0,s=this.v1,o=this.v2;return i.set(Ni(e,r.x,s.x,o.x),Ni(e,r.y,s.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Hl extends en{constructor(e=new P,t=new P,i=new P){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new P){const i=t,r=this.v0,s=this.v1,o=this.v2;return i.set(Ni(e,r.x,s.x,o.x),Ni(e,r.y,s.y,o.y),Ni(e,r.z,s.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Vl extends en{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new le){const i=t,r=this.points,s=(r.length-1)*e,o=Math.floor(s),a=s-o,l=r[o===0?o:o-1],c=r[o],h=r[o>r.length-2?r.length-1:o+1],u=r[o>r.length-3?r.length-1:o+2];return i.set(Ma(a,l.x,c.x,h.x,u.x),Ma(a,l.y,c.y,h.y,u.y)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const r=this.points[t];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(new le().fromArray(r))}return this}}var Br=Object.freeze({__proto__:null,ArcCurve:wh,CatmullRomCurve3:Ol,CubicBezierCurve:Bl,CubicBezierCurve3:Nh,EllipseCurve:Oo,LineCurve:zl,LineCurve3:Fh,QuadraticBezierCurve:kl,QuadraticBezierCurve3:Hl,SplineCurve:Vl});class Oh extends en{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Br[i](t,e))}return this}getPoint(e,t){const i=e*this.getLength(),r=this.getCurveLengths();let s=0;for(;s<r.length;){if(r[s]>=i){const o=r[s]-i,a=this.curves[s],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,t)}s++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let i=0,r=this.curves.length;i<r;i++)t+=this.curves[i].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let i;for(let r=0,s=this.curves;r<s.length;r++){const o=s[r],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,l=o.getPoints(a);for(let c=0;c<l.length;c++){const h=l[c];i&&i.equals(h)||(t.push(h),i=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const r=e.curves[t];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,i=this.curves.length;t<i;t++){const r=this.curves[t];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const r=e.curves[t];this.curves.push(new Br[r.type]().fromJSON(r))}return this}}class Sa extends Oh{constructor(e){super(),this.type="Path",this.currentPoint=new le,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,i=e.length;t<i;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const i=new zl(this.currentPoint.clone(),new le(e,t));return this.curves.push(i),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,i,r){const s=new kl(this.currentPoint.clone(),new le(e,t),new le(i,r));return this.curves.push(s),this.currentPoint.set(i,r),this}bezierCurveTo(e,t,i,r,s,o){const a=new Bl(this.currentPoint.clone(),new le(e,t),new le(i,r),new le(s,o));return this.curves.push(a),this.currentPoint.set(s,o),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),i=new Vl(t);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,i,r,s,o){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,t+l,i,r,s,o),this}absarc(e,t,i,r,s,o){return this.absellipse(e,t,i,i,r,s,o),this}ellipse(e,t,i,r,s,o,a,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,i,r,s,o,a,l),this}absellipse(e,t,i,r,s,o,a,l){const c=new Oo(e,t,i,r,s,o,a,l);if(this.curves.length>0){const u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class Vr extends Sa{constructor(e){super(e),this.uuid=Si(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let i=0,r=this.holes.length;i<r;i++)t[i]=this.holes[i].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){const r=e.holes[t];this.holes.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,i=this.holes.length;t<i;t++){const r=this.holes[t];e.holes.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){const r=e.holes[t];this.holes.push(new Sa().fromJSON(r))}return this}}function Bh(n,e,t=2){const i=e&&e.length,r=i?e[0]*t:n.length;let s=Gl(n,0,r,t,!0);const o=[];if(!s||s.next===s.prev)return o;let a,l,c;if(i&&(s=Gh(n,e,s,t)),n.length>80*t){a=1/0,l=1/0;let h=-1/0,u=-1/0;for(let f=t;f<r;f+=t){const p=n[f],m=n[f+1];p<a&&(a=p),m<l&&(l=m),p>h&&(h=p),m>u&&(u=m)}c=Math.max(h-a,u-l),c=c!==0?32767/c:0}return Vi(s,o,t,a,l,c,0),o}function Gl(n,e,t,i,r){let s;if(r===eu(n,e,t,i)>0)for(let o=e;o<t;o+=i)s=ya(o/i|0,n[o],n[o+1],s);else for(let o=t-i;o>=e;o-=i)s=ya(o/i|0,n[o],n[o+1],s);return s&&xi(s,s.next)&&(Wi(s),s=s.next),s}function qn(n,e){if(!n)return n;e||(e=n);let t=n,i;do if(i=!1,!t.steiner&&(xi(t,t.next)||ut(t.prev,t,t.next)===0)){if(Wi(t),t=e=t.prev,t===t.next)break;i=!0}else t=t.next;while(i||t!==e);return e}function Vi(n,e,t,i,r,s,o){if(!n)return;!o&&s&&Zh(n,i,r,s);let a=n;for(;n.prev!==n.next;){const l=n.prev,c=n.next;if(s?kh(n,i,r,s):zh(n)){e.push(l.i,n.i,c.i),Wi(n),n=c.next,a=c.next;continue}if(n=c,n===a){o?o===1?(n=Hh(qn(n),e),Vi(n,e,t,i,r,s,2)):o===2&&Vh(n,e,t,i,r,s):Vi(qn(n),e,t,i,r,s,1);break}}}function zh(n){const e=n.prev,t=n,i=n.next;if(ut(e,t,i)>=0)return!1;const r=e.x,s=t.x,o=i.x,a=e.y,l=t.y,c=i.y,h=Math.min(r,s,o),u=Math.min(a,l,c),f=Math.max(r,s,o),p=Math.max(a,l,c);let m=i.next;for(;m!==e;){if(m.x>=h&&m.x<=f&&m.y>=u&&m.y<=p&&Ii(r,a,s,l,o,c,m.x,m.y)&&ut(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function kh(n,e,t,i){const r=n.prev,s=n,o=n.next;if(ut(r,s,o)>=0)return!1;const a=r.x,l=s.x,c=o.x,h=r.y,u=s.y,f=o.y,p=Math.min(a,l,c),m=Math.min(h,u,f),_=Math.max(a,l,c),g=Math.max(h,u,f),d=So(p,m,e,t,i),A=So(_,g,e,t,i);let E=n.prevZ,x=n.nextZ;for(;E&&E.z>=d&&x&&x.z<=A;){if(E.x>=p&&E.x<=_&&E.y>=m&&E.y<=g&&E!==r&&E!==o&&Ii(a,h,l,u,c,f,E.x,E.y)&&ut(E.prev,E,E.next)>=0||(E=E.prevZ,x.x>=p&&x.x<=_&&x.y>=m&&x.y<=g&&x!==r&&x!==o&&Ii(a,h,l,u,c,f,x.x,x.y)&&ut(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;E&&E.z>=d;){if(E.x>=p&&E.x<=_&&E.y>=m&&E.y<=g&&E!==r&&E!==o&&Ii(a,h,l,u,c,f,E.x,E.y)&&ut(E.prev,E,E.next)>=0)return!1;E=E.prevZ}for(;x&&x.z<=A;){if(x.x>=p&&x.x<=_&&x.y>=m&&x.y<=g&&x!==r&&x!==o&&Ii(a,h,l,u,c,f,x.x,x.y)&&ut(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function Hh(n,e){let t=n;do{const i=t.prev,r=t.next.next;!xi(i,r)&&Xl(i,t,t.next,r)&&Gi(i,r)&&Gi(r,i)&&(e.push(i.i,t.i,r.i),Wi(t),Wi(t.next),t=n=r),t=t.next}while(t!==n);return qn(t)}function Vh(n,e,t,i,r,s){let o=n;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&$h(o,a)){let l=ql(o,a);o=qn(o,o.next),l=qn(l,l.next),Vi(o,e,t,i,r,s,0),Vi(l,e,t,i,r,s,0);return}a=a.next}o=o.next}while(o!==n)}function Gh(n,e,t,i){const r=[];for(let s=0,o=e.length;s<o;s++){const a=e[s]*i,l=s<o-1?e[s+1]*i:n.length,c=Gl(n,a,l,i,!1);c===c.next&&(c.steiner=!0),r.push(Jh(c))}r.sort(Wh);for(let s=0;s<r.length;s++)t=Xh(r[s],t);return t}function Wh(n,e){let t=n.x-e.x;if(t===0&&(t=n.y-e.y,t===0)){const i=(n.next.y-n.y)/(n.next.x-n.x),r=(e.next.y-e.y)/(e.next.x-e.x);t=i-r}return t}function Xh(n,e){const t=qh(n,e);if(!t)return e;const i=ql(t,n);return qn(i,i.next),qn(t,t.next)}function qh(n,e){let t=e;const i=n.x,r=n.y;let s=-1/0,o;if(xi(n,t))return t;do{if(xi(n,t.next))return t.next;if(r<=t.y&&r>=t.next.y&&t.next.y!==t.y){const u=t.x+(r-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(u<=i&&u>s&&(s=u,o=t.x<t.next.x?t:t.next,u===i))return o}t=t.next}while(t!==e);if(!o)return null;const a=o,l=o.x,c=o.y;let h=1/0;t=o;do{if(i>=t.x&&t.x>=l&&i!==t.x&&Wl(r<c?i:s,r,l,c,r<c?s:i,r,t.x,t.y)){const u=Math.abs(r-t.y)/(i-t.x);Gi(t,n)&&(u<h||u===h&&(t.x>o.x||t.x===o.x&&Yh(o,t)))&&(o=t,h=u)}t=t.next}while(t!==a);return o}function Yh(n,e){return ut(n.prev,n,e.prev)<0&&ut(e.next,n,n.next)<0}function Zh(n,e,t,i){let r=n;do r.z===0&&(r.z=So(r.x,r.y,e,t,i)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==n);r.prevZ.nextZ=null,r.prevZ=null,Kh(r)}function Kh(n){let e,t=1;do{let i=n,r;n=null;let s=null;for(e=0;i;){e++;let o=i,a=0;for(let c=0;c<t&&(a++,o=o.nextZ,!!o);c++);let l=t;for(;a>0||l>0&&o;)a!==0&&(l===0||!o||i.z<=o.z)?(r=i,i=i.nextZ,a--):(r=o,o=o.nextZ,l--),s?s.nextZ=r:n=r,r.prevZ=s,s=r;i=o}s.nextZ=null,t*=2}while(e>1);return n}function So(n,e,t,i,r){return n=(n-t)*r|0,e=(e-i)*r|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,n|e<<1}function Jh(n){let e=n,t=n;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==n);return t}function Wl(n,e,t,i,r,s,o,a){return(r-o)*(e-a)>=(n-o)*(s-a)&&(n-o)*(i-a)>=(t-o)*(e-a)&&(t-o)*(s-a)>=(r-o)*(i-a)}function Ii(n,e,t,i,r,s,o,a){return!(n===o&&e===a)&&Wl(n,e,t,i,r,s,o,a)}function $h(n,e){return n.next.i!==e.i&&n.prev.i!==e.i&&!jh(n,e)&&(Gi(n,e)&&Gi(e,n)&&Qh(n,e)&&(ut(n.prev,n,e.prev)||ut(n,e.prev,e))||xi(n,e)&&ut(n.prev,n,n.next)>0&&ut(e.prev,e,e.next)>0)}function ut(n,e,t){return(e.y-n.y)*(t.x-e.x)-(e.x-n.x)*(t.y-e.y)}function xi(n,e){return n.x===e.x&&n.y===e.y}function Xl(n,e,t,i){const r=Mr(ut(n,e,t)),s=Mr(ut(n,e,i)),o=Mr(ut(t,i,n)),a=Mr(ut(t,i,e));return!!(r!==s&&o!==a||r===0&&xr(n,t,e)||s===0&&xr(n,i,e)||o===0&&xr(t,n,i)||a===0&&xr(t,e,i))}function xr(n,e,t){return e.x<=Math.max(n.x,t.x)&&e.x>=Math.min(n.x,t.x)&&e.y<=Math.max(n.y,t.y)&&e.y>=Math.min(n.y,t.y)}function Mr(n){return n>0?1:n<0?-1:0}function jh(n,e){let t=n;do{if(t.i!==n.i&&t.next.i!==n.i&&t.i!==e.i&&t.next.i!==e.i&&Xl(t,t.next,n,e))return!0;t=t.next}while(t!==n);return!1}function Gi(n,e){return ut(n.prev,n,n.next)<0?ut(n,e,n.next)>=0&&ut(n,n.prev,e)>=0:ut(n,e,n.prev)<0||ut(n,n.next,e)<0}function Qh(n,e){let t=n,i=!1;const r=(n.x+e.x)/2,s=(n.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&r<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(i=!i),t=t.next;while(t!==n);return i}function ql(n,e){const t=yo(n.i,n.x,n.y),i=yo(e.i,e.x,e.y),r=n.next,s=e.prev;return n.next=e,e.prev=n,t.next=r,r.prev=t,i.next=t,t.prev=i,s.next=i,i.prev=s,i}function ya(n,e,t,i){const r=yo(n,e,t);return i?(r.next=i.next,r.prev=i,i.next.prev=r,i.next=r):(r.prev=r,r.next=r),r}function Wi(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function yo(n,e,t){return{i:n,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function eu(n,e,t,i){let r=0;for(let s=e,o=t-i;s<t;s+=i)r+=(n[o]-n[s])*(n[s+1]+n[o+1]),o=s;return r}class tu{static triangulate(e,t,i=2){return Bh(e,t,i)}}class li{static area(e){const t=e.length;let i=0;for(let r=t-1,s=0;s<t;r=s++)i+=e[r].x*e[s].y-e[s].x*e[r].y;return i*.5}static isClockWise(e){return li.area(e)<0}static triangulateShape(e,t){const i=[],r=[],s=[];Ea(e),Ta(i,e);let o=e.length;t.forEach(Ea);for(let l=0;l<t.length;l++)r.push(o),o+=t[l].length,Ta(i,t[l]);const a=tu.triangulate(i,r);for(let l=0;l<a.length;l+=3)s.push(a.slice(l,l+3));return s}}function Ea(n){const e=n.length;e>2&&n[e-1].equals(n[0])&&n.pop()}function Ta(n,e){for(let t=0;t<e.length;t++)n.push(e[t].x),n.push(e[t].y)}class Ki extends At{constructor(e=new Vr([new le(.5,.5),new le(-.5,.5),new le(-.5,-.5),new le(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const i=this,r=[],s=[];for(let a=0,l=e.length;a<l;a++){const c=e[a];o(c)}this.setAttribute("position",new ot(r,3)),this.setAttribute("uv",new ot(s,2)),this.computeVertexNormals();function o(a){const l=[],c=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,u=t.depth!==void 0?t.depth:1;let f=t.bevelEnabled!==void 0?t.bevelEnabled:!0,p=t.bevelThickness!==void 0?t.bevelThickness:.2,m=t.bevelSize!==void 0?t.bevelSize:p-.1,_=t.bevelOffset!==void 0?t.bevelOffset:0,g=t.bevelSegments!==void 0?t.bevelSegments:3;const d=t.extrudePath,A=t.UVGenerator!==void 0?t.UVGenerator:nu;let E,x=!1,R,b,C,I;d&&(E=d.getSpacedPoints(h),x=!0,f=!1,R=d.computeFrenetFrames(h,!1),b=new P,C=new P,I=new P),f||(g=0,p=0,m=0,_=0);const y=a.extractPoints(c);let S=y.shape;const L=y.holes;if(!li.isClockWise(S)){S=S.reverse();for(let ee=0,J=L.length;ee<J;ee++){const K=L[ee];li.isClockWise(K)&&(L[ee]=K.reverse())}}function k(ee){const K=10000000000000001e-36;let Z=ee[0];for(let ce=1;ce<=ee.length;ce++){const ne=ce%ee.length,he=ee[ne],Oe=he.x-Z.x,Fe=he.y-Z.y,T=Oe*Oe+Fe*Fe,v=Math.max(Math.abs(he.x),Math.abs(he.y),Math.abs(Z.x),Math.abs(Z.y)),F=K*v*v;if(T<=F){ee.splice(ne,1),ce--;continue}Z=he}}k(S),L.forEach(k);const q=L.length,V=S;for(let ee=0;ee<q;ee++){const J=L[ee];S=S.concat(J)}function X(ee,J,K){return J||console.error("THREE.ExtrudeGeometry: vec does not exist"),ee.clone().addScaledVector(J,K)}const j=S.length;function G(ee,J,K){let Z,ce,ne;const he=ee.x-J.x,Oe=ee.y-J.y,Fe=K.x-ee.x,T=K.y-ee.y,v=he*he+Oe*Oe,F=he*T-Oe*Fe;if(Math.abs(F)>Number.EPSILON){const H=Math.sqrt(v),Q=Math.sqrt(Fe*Fe+T*T),W=J.x-Oe/H,we=J.y+he/H,ae=K.x-T/Q,Te=K.y+Fe/Q,Ae=((ae-W)*T-(Te-we)*Fe)/(he*T-Oe*Fe);Z=W+he*Ae-ee.x,ce=we+Oe*Ae-ee.y;const ie=Z*Z+ce*ce;if(ie<=2)return new le(Z,ce);ne=Math.sqrt(ie/2)}else{let H=!1;he>Number.EPSILON?Fe>Number.EPSILON&&(H=!0):he<-Number.EPSILON?Fe<-Number.EPSILON&&(H=!0):Math.sign(Oe)===Math.sign(T)&&(H=!0),H?(Z=-Oe,ce=he,ne=Math.sqrt(v)):(Z=he,ce=Oe,ne=Math.sqrt(v/2))}return new le(Z/ne,ce/ne)}const ue=[];for(let ee=0,J=V.length,K=J-1,Z=ee+1;ee<J;ee++,K++,Z++)K===J&&(K=0),Z===J&&(Z=0),ue[ee]=G(V[ee],V[K],V[Z]);const _e=[];let Me,ze=ue.concat();for(let ee=0,J=q;ee<J;ee++){const K=L[ee];Me=[];for(let Z=0,ce=K.length,ne=ce-1,he=Z+1;Z<ce;Z++,ne++,he++)ne===ce&&(ne=0),he===ce&&(he=0),Me[Z]=G(K[Z],K[ne],K[he]);_e.push(Me),ze=ze.concat(Me)}let Ye;if(g===0)Ye=li.triangulateShape(V,L);else{const ee=[],J=[];for(let K=0;K<g;K++){const Z=K/g,ce=p*Math.cos(Z*Math.PI/2),ne=m*Math.sin(Z*Math.PI/2)+_;for(let he=0,Oe=V.length;he<Oe;he++){const Fe=X(V[he],ue[he],ne);Ce(Fe.x,Fe.y,-ce),Z===0&&ee.push(Fe)}for(let he=0,Oe=q;he<Oe;he++){const Fe=L[he];Me=_e[he];const T=[];for(let v=0,F=Fe.length;v<F;v++){const H=X(Fe[v],Me[v],ne);Ce(H.x,H.y,-ce),Z===0&&T.push(H)}Z===0&&J.push(T)}}Ye=li.triangulateShape(ee,J)}const je=Ye.length,Ze=m+_;for(let ee=0;ee<j;ee++){const J=f?X(S[ee],ze[ee],Ze):S[ee];x?(C.copy(R.normals[0]).multiplyScalar(J.x),b.copy(R.binormals[0]).multiplyScalar(J.y),I.copy(E[0]).add(C).add(b),Ce(I.x,I.y,I.z)):Ce(J.x,J.y,0)}for(let ee=1;ee<=h;ee++)for(let J=0;J<j;J++){const K=f?X(S[J],ze[J],Ze):S[J];x?(C.copy(R.normals[ee]).multiplyScalar(K.x),b.copy(R.binormals[ee]).multiplyScalar(K.y),I.copy(E[ee]).add(C).add(b),Ce(I.x,I.y,I.z)):Ce(K.x,K.y,u/h*ee)}for(let ee=g-1;ee>=0;ee--){const J=ee/g,K=p*Math.cos(J*Math.PI/2),Z=m*Math.sin(J*Math.PI/2)+_;for(let ce=0,ne=V.length;ce<ne;ce++){const he=X(V[ce],ue[ce],Z);Ce(he.x,he.y,u+K)}for(let ce=0,ne=L.length;ce<ne;ce++){const he=L[ce];Me=_e[ce];for(let Oe=0,Fe=he.length;Oe<Fe;Oe++){const T=X(he[Oe],Me[Oe],Z);x?Ce(T.x,T.y+E[h-1].y,E[h-1].x+K):Ce(T.x,T.y,u+K)}}}Y(),te();function Y(){const ee=r.length/3;if(f){let J=0,K=j*J;for(let Z=0;Z<je;Z++){const ce=Ye[Z];Ee(ce[2]+K,ce[1]+K,ce[0]+K)}J=h+g*2,K=j*J;for(let Z=0;Z<je;Z++){const ce=Ye[Z];Ee(ce[0]+K,ce[1]+K,ce[2]+K)}}else{for(let J=0;J<je;J++){const K=Ye[J];Ee(K[2],K[1],K[0])}for(let J=0;J<je;J++){const K=Ye[J];Ee(K[0]+j*h,K[1]+j*h,K[2]+j*h)}}i.addGroup(ee,r.length/3-ee,0)}function te(){const ee=r.length/3;let J=0;xe(V,J),J+=V.length;for(let K=0,Z=L.length;K<Z;K++){const ce=L[K];xe(ce,J),J+=ce.length}i.addGroup(ee,r.length/3-ee,1)}function xe(ee,J){let K=ee.length;for(;--K>=0;){const Z=K;let ce=K-1;ce<0&&(ce=ee.length-1);for(let ne=0,he=h+g*2;ne<he;ne++){const Oe=j*ne,Fe=j*(ne+1),T=J+Z+Oe,v=J+ce+Oe,F=J+ce+Fe,H=J+Z+Fe;Xe(T,v,F,H)}}}function Ce(ee,J,K){l.push(ee),l.push(J),l.push(K)}function Ee(ee,J,K){rt(ee),rt(J),rt(K);const Z=r.length/3,ce=A.generateTopUV(i,r,Z-3,Z-2,Z-1);w(ce[0]),w(ce[1]),w(ce[2])}function Xe(ee,J,K,Z){rt(ee),rt(J),rt(Z),rt(J),rt(K),rt(Z);const ce=r.length/3,ne=A.generateSideWallUV(i,r,ce-6,ce-3,ce-2,ce-1);w(ne[0]),w(ne[1]),w(ne[3]),w(ne[1]),w(ne[2]),w(ne[3])}function rt(ee){r.push(l[ee*3+0]),r.push(l[ee*3+1]),r.push(l[ee*3+2])}function w(ee){s.push(ee.x),s.push(ee.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,i=this.parameters.options;return iu(t,i,e)}static fromJSON(e,t){const i=[];for(let s=0,o=e.shapes.length;s<o;s++){const a=t[e.shapes[s]];i.push(a)}const r=e.options.extrudePath;return r!==void 0&&(e.options.extrudePath=new Br[r.type]().fromJSON(r)),new Ki(i,e.options)}}const nu={generateTopUV:function(n,e,t,i,r){const s=e[t*3],o=e[t*3+1],a=e[i*3],l=e[i*3+1],c=e[r*3],h=e[r*3+1];return[new le(s,o),new le(a,l),new le(c,h)]},generateSideWallUV:function(n,e,t,i,r,s){const o=e[t*3],a=e[t*3+1],l=e[t*3+2],c=e[i*3],h=e[i*3+1],u=e[i*3+2],f=e[r*3],p=e[r*3+1],m=e[r*3+2],_=e[s*3],g=e[s*3+1],d=e[s*3+2];return Math.abs(a-h)<Math.abs(o-c)?[new le(o,1-l),new le(c,1-u),new le(f,1-m),new le(_,1-d)]:[new le(a,1-l),new le(h,1-u),new le(p,1-m),new le(g,1-d)]}};function iu(n,e,t){if(t.shapes=[],Array.isArray(n))for(let i=0,r=n.length;i<r;i++){const s=n[i];t.shapes.push(s.uuid)}else t.shapes.push(n.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class zo extends At{constructor(e=[new le(0,-.5),new le(.5,0),new le(0,.5)],t=12,i=0,r=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:i,phiLength:r},t=Math.floor(t),r=Ge(r,0,Math.PI*2);const s=[],o=[],a=[],l=[],c=[],h=1/t,u=new P,f=new le,p=new P,m=new P,_=new P;let g=0,d=0;for(let A=0;A<=e.length-1;A++)switch(A){case 0:g=e[A+1].x-e[A].x,d=e[A+1].y-e[A].y,p.x=d*1,p.y=-g,p.z=d*0,_.copy(p),p.normalize(),l.push(p.x,p.y,p.z);break;case e.length-1:l.push(_.x,_.y,_.z);break;default:g=e[A+1].x-e[A].x,d=e[A+1].y-e[A].y,p.x=d*1,p.y=-g,p.z=d*0,m.copy(p),p.x+=_.x,p.y+=_.y,p.z+=_.z,p.normalize(),l.push(p.x,p.y,p.z),_.copy(m)}for(let A=0;A<=t;A++){const E=i+A*h*r,x=Math.sin(E),R=Math.cos(E);for(let b=0;b<=e.length-1;b++){u.x=e[b].x*x,u.y=e[b].y,u.z=e[b].x*R,o.push(u.x,u.y,u.z),f.x=A/t,f.y=b/(e.length-1),a.push(f.x,f.y);const C=l[3*b+0]*x,I=l[3*b+1],y=l[3*b+0]*R;c.push(C,I,y)}}for(let A=0;A<t;A++)for(let E=0;E<e.length-1;E++){const x=E+A*e.length,R=x,b=x+e.length,C=x+e.length+1,I=x+1;s.push(R,b,I),s.push(C,I,b)}this.setIndex(s),this.setAttribute("position",new ot(o,3)),this.setAttribute("uv",new ot(a,2)),this.setAttribute("normal",new ot(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new zo(e.points,e.segments,e.phiStart,e.phiLength)}}class Ji extends At{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,o=t/2,a=Math.floor(i),l=Math.floor(r),c=a+1,h=l+1,u=e/a,f=t/l,p=[],m=[],_=[],g=[];for(let d=0;d<h;d++){const A=d*f-o;for(let E=0;E<c;E++){const x=E*u-s;m.push(x,-A,0),_.push(0,0,1),g.push(E/a),g.push(1-d/l)}}for(let d=0;d<l;d++)for(let A=0;A<a;A++){const E=A+c*d,x=A+c*(d+1),R=A+1+c*(d+1),b=A+1+c*d;p.push(E,x,b),p.push(x,R,b)}this.setIndex(p),this.setAttribute("position",new ot(m,3)),this.setAttribute("normal",new ot(_,3)),this.setAttribute("uv",new ot(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ji(e.width,e.height,e.widthSegments,e.heightSegments)}}class Gr extends At{constructor(e=1,t=32,i=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(o+a,Math.PI);let c=0;const h=[],u=new P,f=new P,p=[],m=[],_=[],g=[];for(let d=0;d<=i;d++){const A=[],E=d/i;let x=0;d===0&&o===0?x=.5/t:d===i&&l===Math.PI&&(x=-.5/t);for(let R=0;R<=t;R++){const b=R/t;u.x=-e*Math.cos(r+b*s)*Math.sin(o+E*a),u.y=e*Math.cos(o+E*a),u.z=e*Math.sin(r+b*s)*Math.sin(o+E*a),m.push(u.x,u.y,u.z),f.copy(u).normalize(),_.push(f.x,f.y,f.z),g.push(b+x,1-E),A.push(c++)}h.push(A)}for(let d=0;d<i;d++)for(let A=0;A<t;A++){const E=h[d][A+1],x=h[d][A],R=h[d+1][A],b=h[d+1][A+1];(d!==0||o>0)&&p.push(E,x,b),(d!==i-1||l<Math.PI)&&p.push(x,R,b)}this.setIndex(p),this.setAttribute("position",new ot(m,3)),this.setAttribute("normal",new ot(_,3)),this.setAttribute("uv",new ot(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Gr(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class ko extends At{constructor(e=1,t=.4,i=12,r=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:r,arc:s},i=Math.floor(i),r=Math.floor(r);const o=[],a=[],l=[],c=[],h=new P,u=new P,f=new P;for(let p=0;p<=i;p++)for(let m=0;m<=r;m++){const _=m/r*s,g=p/i*Math.PI*2;u.x=(e+t*Math.cos(g))*Math.cos(_),u.y=(e+t*Math.cos(g))*Math.sin(_),u.z=t*Math.sin(g),a.push(u.x,u.y,u.z),h.x=e*Math.cos(_),h.y=e*Math.sin(_),f.subVectors(u,h).normalize(),l.push(f.x,f.y,f.z),c.push(m/r),c.push(p/i)}for(let p=1;p<=i;p++)for(let m=1;m<=r;m++){const _=(r+1)*p+m-1,g=(r+1)*(p-1)+m-1,d=(r+1)*(p-1)+m,A=(r+1)*p+m;o.push(_,g,A),o.push(g,d,A)}this.setIndex(o),this.setAttribute("position",new ot(a,3)),this.setAttribute("normal",new ot(l,3)),this.setAttribute("uv",new ot(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ko(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Ho extends At{constructor(e=new Hl(new P(-1,-1,0),new P(-1,1,0),new P(1,1,0)),t=64,i=1,r=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:i,radialSegments:r,closed:s};const o=e.computeFrenetFrames(t,s);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const a=new P,l=new P,c=new le;let h=new P;const u=[],f=[],p=[],m=[];_(),this.setIndex(m),this.setAttribute("position",new ot(u,3)),this.setAttribute("normal",new ot(f,3)),this.setAttribute("uv",new ot(p,2));function _(){for(let E=0;E<t;E++)g(E);g(s===!1?t:0),A(),d()}function g(E){h=e.getPointAt(E/t,h);const x=o.normals[E],R=o.binormals[E];for(let b=0;b<=r;b++){const C=b/r*Math.PI*2,I=Math.sin(C),y=-Math.cos(C);l.x=y*x.x+I*R.x,l.y=y*x.y+I*R.y,l.z=y*x.z+I*R.z,l.normalize(),f.push(l.x,l.y,l.z),a.x=h.x+i*l.x,a.y=h.y+i*l.y,a.z=h.z+i*l.z,u.push(a.x,a.y,a.z)}}function d(){for(let E=1;E<=t;E++)for(let x=1;x<=r;x++){const R=(r+1)*(E-1)+(x-1),b=(r+1)*E+(x-1),C=(r+1)*E+x,I=(r+1)*(E-1)+x;m.push(R,b,I),m.push(b,C,I)}}function A(){for(let E=0;E<=t;E++)for(let x=0;x<=r;x++)c.x=E/t,c.y=x/r,p.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new Ho(new Br[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}class yi extends Zi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new We(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new We(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=El,this.normalScale=new le(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Yt,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class ru extends Zi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=zc,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class su extends Zi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Wr extends vt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new We(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class ou extends Wr{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(vt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new We(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Es=new lt,Aa=new P,ba=new P;class Yl{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new le(512,512),this.mapType=Qt,this.map=null,this.mapPass=null,this.matrix=new lt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Fo,this._frameExtents=new le(1,1),this._viewportCount=1,this._viewports=[new tt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;Aa.setFromMatrixPosition(e.matrixWorld),t.position.copy(Aa),ba.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(ba),t.updateMatrixWorld(),Es.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Es,t.coordinateSystem,t.reversedDepth),t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Es)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class au extends Yl{constructor(){super(new Rt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,i=Nr*2*e.angle*this.focus,r=this.mapSize.width/this.mapSize.height*this.aspect,s=e.distance||t.far;(i!==t.fov||r!==t.aspect||s!==t.far)&&(t.fov=i,t.aspect=r,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class lu extends Wr{constructor(e,t,i=0,r=Math.PI/3,s=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(vt.DEFAULT_UP),this.updateMatrix(),this.target=new vt,this.distance=i,this.angle=r,this.penumbra=s,this.decay=o,this.map=null,this.shadow=new au}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const wa=new lt,Pi=new P,Ts=new P;class cu extends Yl{constructor(){super(new Rt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new le(4,2),this._viewportCount=6,this._viewports=[new tt(2,1,1,1),new tt(0,1,1,1),new tt(3,1,1,1),new tt(1,1,1,1),new tt(3,0,1,1),new tt(1,0,1,1)],this._cubeDirections=[new P(1,0,0),new P(-1,0,0),new P(0,0,1),new P(0,0,-1),new P(0,1,0),new P(0,-1,0)],this._cubeUps=[new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,0,1),new P(0,0,-1)]}updateMatrices(e,t=0){const i=this.camera,r=this.matrix,s=e.distance||i.far;s!==i.far&&(i.far=s,i.updateProjectionMatrix()),Pi.setFromMatrixPosition(e.matrixWorld),i.position.copy(Pi),Ts.copy(i.position),Ts.add(this._cubeDirections[t]),i.up.copy(this._cubeUps[t]),i.lookAt(Ts),i.updateMatrixWorld(),r.makeTranslation(-Pi.x,-Pi.y,-Pi.z),wa.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(wa,i.coordinateSystem,i.reversedDepth)}}class hu extends Wr{constructor(e,t,i=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=r,this.shadow=new cu}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class uu extends Dl{constructor(e=-1,t=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,o=i+e,a=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class fu extends Wr{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class du extends Rt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}function Ra(n,e,t,i){const r=pu(i);switch(t){case xl:return n*e;case Sl:return n*e/r.components*r.byteLength;case Co:return n*e/r.components*r.byteLength;case yl:return n*e*2/r.components*r.byteLength;case Po:return n*e*2/r.components*r.byteLength;case Ml:return n*e*3/r.components*r.byteLength;case Xt:return n*e*4/r.components*r.byteLength;case Lo:return n*e*4/r.components*r.byteLength;case Ar:case br:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case wr:case Rr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ys:case Ks:return Math.max(n,16)*Math.max(e,8)/4;case qs:case Zs:return Math.max(n,8)*Math.max(e,8)/2;case Js:case $s:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case js:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Qs:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case eo:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case to:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case no:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case io:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case ro:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case so:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case oo:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case ao:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case lo:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case co:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case ho:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case uo:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case fo:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case po:case mo:case go:return Math.ceil(n/4)*Math.ceil(e/4)*16;case _o:case vo:return Math.ceil(n/4)*Math.ceil(e/4)*8;case xo:case Mo:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function pu(n){switch(n){case Qt:case ml:return{byteLength:1,components:1};case Oi:case gl:case qi:return{byteLength:2,components:1};case wo:case Ro:return{byteLength:2,components:4};case Gn:case bo:case un:return{byteLength:4,components:1};case _l:case vl:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ao}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ao);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Zl(){let n=null,e=!1,t=null,i=null;function r(s,o){t(s,o),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function mu(n){const e=new WeakMap;function t(a,l){const c=a.array,h=a.usage,u=c.byteLength,f=n.createBuffer();n.bindBuffer(l,f),n.bufferData(l,c,h),a.onUploadCallback();let p;if(c instanceof Float32Array)p=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=n.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=n.SHORT;else if(c instanceof Uint32Array)p=n.UNSIGNED_INT;else if(c instanceof Int32Array)p=n.INT;else if(c instanceof Int8Array)p=n.BYTE;else if(c instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function i(a,l,c){const h=l.array,u=l.updateRanges;if(n.bindBuffer(c,a),u.length===0)n.bufferSubData(c,0,h);else{u.sort((p,m)=>p.start-m.start);let f=0;for(let p=1;p<u.length;p++){const m=u[f],_=u[p];_.start<=m.start+m.count+1?m.count=Math.max(m.count,_.start+_.count-m.start):(++f,u[f]=_)}u.length=f+1;for(let p=0,m=u.length;p<m;p++){const _=u[p];n.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(n.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:r,remove:s,update:o}}var gu=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,_u=`#ifdef USE_ALPHAHASH
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
#endif`,vu=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,xu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Mu=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Su=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,yu=`#ifdef USE_AOMAP
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
#endif`,Eu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Tu=`#ifdef USE_BATCHING
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
#endif`,Au=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,bu=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,wu=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Ru=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Cu=`#ifdef USE_IRIDESCENCE
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
#endif`,Pu=`#ifdef USE_BUMPMAP
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
#endif`,Lu=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Du=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Iu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Uu=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Nu=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Fu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Ou=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Bu=`#if defined( USE_COLOR_ALPHA )
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
#endif`,zu=`#define PI 3.141592653589793
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
} // validated`,ku=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Hu=`vec3 transformedNormal = objectNormal;
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
#endif`,Vu=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Gu=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Wu=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Xu=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,qu="gl_FragColor = linearToOutputTexel( gl_FragColor );",Yu=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Zu=`#ifdef USE_ENVMAP
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
#endif`,Ku=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Ju=`#ifdef USE_ENVMAP
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
#endif`,$u=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ju=`#ifdef USE_ENVMAP
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
#endif`,Qu=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ef=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,tf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,nf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,rf=`#ifdef USE_GRADIENTMAP
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
}`,sf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,of=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,af=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lf=`uniform bool receiveShadow;
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
#endif`,cf=`#ifdef USE_ENVMAP
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
#endif`,hf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,uf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,ff=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,df=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,pf=`PhysicalMaterial material;
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
#endif`,mf=`struct PhysicalMaterial {
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
}`,gf=`
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
#endif`,_f=`#if defined( RE_IndirectDiffuse )
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
#endif`,vf=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,xf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Mf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Sf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,yf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Ef=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Tf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Af=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,bf=`#if defined( USE_POINTS_UV )
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
#endif`,wf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Rf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Cf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Pf=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Lf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Df=`#ifdef USE_MORPHTARGETS
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
#endif`,If=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Uf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Nf=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Ff=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Of=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Bf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,zf=`#ifdef USE_NORMALMAP
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
#endif`,kf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Hf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Vf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Gf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Wf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Xf=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,qf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Yf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Zf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Kf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Jf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,$f=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,jf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Qf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,ed=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,td=`float getShadowMask() {
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
}`,nd=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,id=`#ifdef USE_SKINNING
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
#endif`,rd=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,sd=`#ifdef USE_SKINNING
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
#endif`,od=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,ad=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,ld=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,cd=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,hd=`#ifdef USE_TRANSMISSION
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
#endif`,ud=`#ifdef USE_TRANSMISSION
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
#endif`,fd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,dd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,pd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,md=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const gd=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,_d=`uniform sampler2D t2D;
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
}`,vd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,xd=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Md=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Sd=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,yd=`#include <common>
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
}`,Ed=`#if DEPTH_PACKING == 3200
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
}`,Td=`#define DISTANCE
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
}`,Ad=`#define DISTANCE
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
}`,bd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,wd=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Rd=`uniform float scale;
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
}`,Cd=`uniform vec3 diffuse;
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
}`,Pd=`#include <common>
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
}`,Ld=`uniform vec3 diffuse;
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
}`,Dd=`#define LAMBERT
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
}`,Id=`#define LAMBERT
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
}`,Ud=`#define MATCAP
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
}`,Nd=`#define MATCAP
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
}`,Fd=`#define NORMAL
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
}`,Od=`#define NORMAL
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
}`,Bd=`#define PHONG
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
}`,zd=`#define PHONG
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
}`,kd=`#define STANDARD
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
}`,Hd=`#define STANDARD
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
}`,Vd=`#define TOON
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
}`,Gd=`#define TOON
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
}`,Wd=`uniform float size;
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
}`,Xd=`uniform vec3 diffuse;
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
}`,qd=`#include <common>
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
}`,Yd=`uniform vec3 color;
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
}`,Zd=`uniform float rotation;
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
}`,Kd=`uniform vec3 diffuse;
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
}`,Ve={alphahash_fragment:gu,alphahash_pars_fragment:_u,alphamap_fragment:vu,alphamap_pars_fragment:xu,alphatest_fragment:Mu,alphatest_pars_fragment:Su,aomap_fragment:yu,aomap_pars_fragment:Eu,batching_pars_vertex:Tu,batching_vertex:Au,begin_vertex:bu,beginnormal_vertex:wu,bsdfs:Ru,iridescence_fragment:Cu,bumpmap_pars_fragment:Pu,clipping_planes_fragment:Lu,clipping_planes_pars_fragment:Du,clipping_planes_pars_vertex:Iu,clipping_planes_vertex:Uu,color_fragment:Nu,color_pars_fragment:Fu,color_pars_vertex:Ou,color_vertex:Bu,common:zu,cube_uv_reflection_fragment:ku,defaultnormal_vertex:Hu,displacementmap_pars_vertex:Vu,displacementmap_vertex:Gu,emissivemap_fragment:Wu,emissivemap_pars_fragment:Xu,colorspace_fragment:qu,colorspace_pars_fragment:Yu,envmap_fragment:Zu,envmap_common_pars_fragment:Ku,envmap_pars_fragment:Ju,envmap_pars_vertex:$u,envmap_physical_pars_fragment:cf,envmap_vertex:ju,fog_vertex:Qu,fog_pars_vertex:ef,fog_fragment:tf,fog_pars_fragment:nf,gradientmap_pars_fragment:rf,lightmap_pars_fragment:sf,lights_lambert_fragment:of,lights_lambert_pars_fragment:af,lights_pars_begin:lf,lights_toon_fragment:hf,lights_toon_pars_fragment:uf,lights_phong_fragment:ff,lights_phong_pars_fragment:df,lights_physical_fragment:pf,lights_physical_pars_fragment:mf,lights_fragment_begin:gf,lights_fragment_maps:_f,lights_fragment_end:vf,logdepthbuf_fragment:xf,logdepthbuf_pars_fragment:Mf,logdepthbuf_pars_vertex:Sf,logdepthbuf_vertex:yf,map_fragment:Ef,map_pars_fragment:Tf,map_particle_fragment:Af,map_particle_pars_fragment:bf,metalnessmap_fragment:wf,metalnessmap_pars_fragment:Rf,morphinstance_vertex:Cf,morphcolor_vertex:Pf,morphnormal_vertex:Lf,morphtarget_pars_vertex:Df,morphtarget_vertex:If,normal_fragment_begin:Uf,normal_fragment_maps:Nf,normal_pars_fragment:Ff,normal_pars_vertex:Of,normal_vertex:Bf,normalmap_pars_fragment:zf,clearcoat_normal_fragment_begin:kf,clearcoat_normal_fragment_maps:Hf,clearcoat_pars_fragment:Vf,iridescence_pars_fragment:Gf,opaque_fragment:Wf,packing:Xf,premultiplied_alpha_fragment:qf,project_vertex:Yf,dithering_fragment:Zf,dithering_pars_fragment:Kf,roughnessmap_fragment:Jf,roughnessmap_pars_fragment:$f,shadowmap_pars_fragment:jf,shadowmap_pars_vertex:Qf,shadowmap_vertex:ed,shadowmask_pars_fragment:td,skinbase_vertex:nd,skinning_pars_vertex:id,skinning_vertex:rd,skinnormal_vertex:sd,specularmap_fragment:od,specularmap_pars_fragment:ad,tonemapping_fragment:ld,tonemapping_pars_fragment:cd,transmission_fragment:hd,transmission_pars_fragment:ud,uv_pars_fragment:fd,uv_pars_vertex:dd,uv_vertex:pd,worldpos_vertex:md,background_vert:gd,background_frag:_d,backgroundCube_vert:vd,backgroundCube_frag:xd,cube_vert:Md,cube_frag:Sd,depth_vert:yd,depth_frag:Ed,distanceRGBA_vert:Td,distanceRGBA_frag:Ad,equirect_vert:bd,equirect_frag:wd,linedashed_vert:Rd,linedashed_frag:Cd,meshbasic_vert:Pd,meshbasic_frag:Ld,meshlambert_vert:Dd,meshlambert_frag:Id,meshmatcap_vert:Ud,meshmatcap_frag:Nd,meshnormal_vert:Fd,meshnormal_frag:Od,meshphong_vert:Bd,meshphong_frag:zd,meshphysical_vert:kd,meshphysical_frag:Hd,meshtoon_vert:Vd,meshtoon_frag:Gd,points_vert:Wd,points_frag:Xd,shadow_vert:qd,shadow_frag:Yd,sprite_vert:Zd,sprite_frag:Kd},de={common:{diffuse:{value:new We(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new He}},envmap:{envMap:{value:null},envMapRotation:{value:new He},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new He}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new He}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new He},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new He},normalScale:{value:new le(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new He},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new He}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new He}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new He}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new We(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new We(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0},uvTransform:{value:new He}},sprite:{diffuse:{value:new We(16777215)},opacity:{value:1},center:{value:new le(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}}},Kt={basic:{uniforms:yt([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.fog]),vertexShader:Ve.meshbasic_vert,fragmentShader:Ve.meshbasic_frag},lambert:{uniforms:yt([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.fog,de.lights,{emissive:{value:new We(0)}}]),vertexShader:Ve.meshlambert_vert,fragmentShader:Ve.meshlambert_frag},phong:{uniforms:yt([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.fog,de.lights,{emissive:{value:new We(0)},specular:{value:new We(1118481)},shininess:{value:30}}]),vertexShader:Ve.meshphong_vert,fragmentShader:Ve.meshphong_frag},standard:{uniforms:yt([de.common,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.roughnessmap,de.metalnessmap,de.fog,de.lights,{emissive:{value:new We(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag},toon:{uniforms:yt([de.common,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.gradientmap,de.fog,de.lights,{emissive:{value:new We(0)}}]),vertexShader:Ve.meshtoon_vert,fragmentShader:Ve.meshtoon_frag},matcap:{uniforms:yt([de.common,de.bumpmap,de.normalmap,de.displacementmap,de.fog,{matcap:{value:null}}]),vertexShader:Ve.meshmatcap_vert,fragmentShader:Ve.meshmatcap_frag},points:{uniforms:yt([de.points,de.fog]),vertexShader:Ve.points_vert,fragmentShader:Ve.points_frag},dashed:{uniforms:yt([de.common,de.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ve.linedashed_vert,fragmentShader:Ve.linedashed_frag},depth:{uniforms:yt([de.common,de.displacementmap]),vertexShader:Ve.depth_vert,fragmentShader:Ve.depth_frag},normal:{uniforms:yt([de.common,de.bumpmap,de.normalmap,de.displacementmap,{opacity:{value:1}}]),vertexShader:Ve.meshnormal_vert,fragmentShader:Ve.meshnormal_frag},sprite:{uniforms:yt([de.sprite,de.fog]),vertexShader:Ve.sprite_vert,fragmentShader:Ve.sprite_frag},background:{uniforms:{uvTransform:{value:new He},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ve.background_vert,fragmentShader:Ve.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new He}},vertexShader:Ve.backgroundCube_vert,fragmentShader:Ve.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ve.cube_vert,fragmentShader:Ve.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ve.equirect_vert,fragmentShader:Ve.equirect_frag},distanceRGBA:{uniforms:yt([de.common,de.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ve.distanceRGBA_vert,fragmentShader:Ve.distanceRGBA_frag},shadow:{uniforms:yt([de.lights,de.fog,{color:{value:new We(0)},opacity:{value:1}}]),vertexShader:Ve.shadow_vert,fragmentShader:Ve.shadow_frag}};Kt.physical={uniforms:yt([Kt.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new He},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new He},clearcoatNormalScale:{value:new le(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new He},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new He},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new He},sheen:{value:0},sheenColor:{value:new We(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new He},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new He},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new He},transmissionSamplerSize:{value:new le},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new He},attenuationDistance:{value:0},attenuationColor:{value:new We(0)},specularColor:{value:new We(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new He},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new He},anisotropyVector:{value:new le},anisotropyMap:{value:null},anisotropyMapTransform:{value:new He}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag};const Sr={r:0,b:0,g:0},Un=new Yt,Jd=new lt;function $d(n,e,t,i,r,s,o){const a=new We(0);let l=s===!0?0:1,c,h,u=null,f=0,p=null;function m(E){let x=E.isScene===!0?E.background:null;return x&&x.isTexture&&(x=(E.backgroundBlurriness>0?t:e).get(x)),x}function _(E){let x=!1;const R=m(E);R===null?d(a,l):R&&R.isColor&&(d(R,1),x=!0);const b=n.xr.getEnvironmentBlendMode();b==="additive"?i.buffers.color.setClear(0,0,0,1,o):b==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||x)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function g(E,x){const R=m(x);R&&(R.isCubeTexture||R.mapping===Hr)?(h===void 0&&(h=new jt(new Xn(1,1,1),new bn({name:"BackgroundCubeMaterial",uniforms:vi(Kt.backgroundCube.uniforms),vertexShader:Kt.backgroundCube.vertexShader,fragmentShader:Kt.backgroundCube.fragmentShader,side:Ct,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(b,C,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(h)),Un.copy(x.backgroundRotation),Un.x*=-1,Un.y*=-1,Un.z*=-1,R.isCubeTexture&&R.isRenderTargetTexture===!1&&(Un.y*=-1,Un.z*=-1),h.material.uniforms.envMap.value=R,h.material.uniforms.flipEnvMap.value=R.isCubeTexture&&R.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Jd.makeRotationFromEuler(Un)),h.material.toneMapped=Je.getTransfer(R.colorSpace)!==et,(u!==R||f!==R.version||p!==n.toneMapping)&&(h.material.needsUpdate=!0,u=R,f=R.version,p=n.toneMapping),h.layers.enableAll(),E.unshift(h,h.geometry,h.material,0,0,null)):R&&R.isTexture&&(c===void 0&&(c=new jt(new Ji(2,2),new bn({name:"BackgroundMaterial",uniforms:vi(Kt.background.uniforms),vertexShader:Kt.background.vertexShader,fragmentShader:Kt.background.fragmentShader,side:An,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=R,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=Je.getTransfer(R.colorSpace)!==et,R.matrixAutoUpdate===!0&&R.updateMatrix(),c.material.uniforms.uvTransform.value.copy(R.matrix),(u!==R||f!==R.version||p!==n.toneMapping)&&(c.material.needsUpdate=!0,u=R,f=R.version,p=n.toneMapping),c.layers.enableAll(),E.unshift(c,c.geometry,c.material,0,0,null))}function d(E,x){E.getRGB(Sr,Ll(n)),i.buffers.color.setClear(Sr.r,Sr.g,Sr.b,x,o)}function A(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(E,x=1){a.set(E),l=x,d(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(E){l=E,d(a,l)},render:_,addToRenderList:g,dispose:A}}function jd(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=f(null);let s=r,o=!1;function a(S,L,O,k,q){let V=!1;const X=u(k,O,L);s!==X&&(s=X,c(s.object)),V=p(S,k,O,q),V&&m(S,k,O,q),q!==null&&e.update(q,n.ELEMENT_ARRAY_BUFFER),(V||o)&&(o=!1,x(S,L,O,k),q!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(q).buffer))}function l(){return n.createVertexArray()}function c(S){return n.bindVertexArray(S)}function h(S){return n.deleteVertexArray(S)}function u(S,L,O){const k=O.wireframe===!0;let q=i[S.id];q===void 0&&(q={},i[S.id]=q);let V=q[L.id];V===void 0&&(V={},q[L.id]=V);let X=V[k];return X===void 0&&(X=f(l()),V[k]=X),X}function f(S){const L=[],O=[],k=[];for(let q=0;q<t;q++)L[q]=0,O[q]=0,k[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:O,attributeDivisors:k,object:S,attributes:{},index:null}}function p(S,L,O,k){const q=s.attributes,V=L.attributes;let X=0;const j=O.getAttributes();for(const G in j)if(j[G].location>=0){const _e=q[G];let Me=V[G];if(Me===void 0&&(G==="instanceMatrix"&&S.instanceMatrix&&(Me=S.instanceMatrix),G==="instanceColor"&&S.instanceColor&&(Me=S.instanceColor)),_e===void 0||_e.attribute!==Me||Me&&_e.data!==Me.data)return!0;X++}return s.attributesNum!==X||s.index!==k}function m(S,L,O,k){const q={},V=L.attributes;let X=0;const j=O.getAttributes();for(const G in j)if(j[G].location>=0){let _e=V[G];_e===void 0&&(G==="instanceMatrix"&&S.instanceMatrix&&(_e=S.instanceMatrix),G==="instanceColor"&&S.instanceColor&&(_e=S.instanceColor));const Me={};Me.attribute=_e,_e&&_e.data&&(Me.data=_e.data),q[G]=Me,X++}s.attributes=q,s.attributesNum=X,s.index=k}function _(){const S=s.newAttributes;for(let L=0,O=S.length;L<O;L++)S[L]=0}function g(S){d(S,0)}function d(S,L){const O=s.newAttributes,k=s.enabledAttributes,q=s.attributeDivisors;O[S]=1,k[S]===0&&(n.enableVertexAttribArray(S),k[S]=1),q[S]!==L&&(n.vertexAttribDivisor(S,L),q[S]=L)}function A(){const S=s.newAttributes,L=s.enabledAttributes;for(let O=0,k=L.length;O<k;O++)L[O]!==S[O]&&(n.disableVertexAttribArray(O),L[O]=0)}function E(S,L,O,k,q,V,X){X===!0?n.vertexAttribIPointer(S,L,O,q,V):n.vertexAttribPointer(S,L,O,k,q,V)}function x(S,L,O,k){_();const q=k.attributes,V=O.getAttributes(),X=L.defaultAttributeValues;for(const j in V){const G=V[j];if(G.location>=0){let ue=q[j];if(ue===void 0&&(j==="instanceMatrix"&&S.instanceMatrix&&(ue=S.instanceMatrix),j==="instanceColor"&&S.instanceColor&&(ue=S.instanceColor)),ue!==void 0){const _e=ue.normalized,Me=ue.itemSize,ze=e.get(ue);if(ze===void 0)continue;const Ye=ze.buffer,je=ze.type,Ze=ze.bytesPerElement,Y=je===n.INT||je===n.UNSIGNED_INT||ue.gpuType===bo;if(ue.isInterleavedBufferAttribute){const te=ue.data,xe=te.stride,Ce=ue.offset;if(te.isInstancedInterleavedBuffer){for(let Ee=0;Ee<G.locationSize;Ee++)d(G.location+Ee,te.meshPerAttribute);S.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=te.meshPerAttribute*te.count)}else for(let Ee=0;Ee<G.locationSize;Ee++)g(G.location+Ee);n.bindBuffer(n.ARRAY_BUFFER,Ye);for(let Ee=0;Ee<G.locationSize;Ee++)E(G.location+Ee,Me/G.locationSize,je,_e,xe*Ze,(Ce+Me/G.locationSize*Ee)*Ze,Y)}else{if(ue.isInstancedBufferAttribute){for(let te=0;te<G.locationSize;te++)d(G.location+te,ue.meshPerAttribute);S.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=ue.meshPerAttribute*ue.count)}else for(let te=0;te<G.locationSize;te++)g(G.location+te);n.bindBuffer(n.ARRAY_BUFFER,Ye);for(let te=0;te<G.locationSize;te++)E(G.location+te,Me/G.locationSize,je,_e,Me*Ze,Me/G.locationSize*te*Ze,Y)}}else if(X!==void 0){const _e=X[j];if(_e!==void 0)switch(_e.length){case 2:n.vertexAttrib2fv(G.location,_e);break;case 3:n.vertexAttrib3fv(G.location,_e);break;case 4:n.vertexAttrib4fv(G.location,_e);break;default:n.vertexAttrib1fv(G.location,_e)}}}}A()}function R(){I();for(const S in i){const L=i[S];for(const O in L){const k=L[O];for(const q in k)h(k[q].object),delete k[q];delete L[O]}delete i[S]}}function b(S){if(i[S.id]===void 0)return;const L=i[S.id];for(const O in L){const k=L[O];for(const q in k)h(k[q].object),delete k[q];delete L[O]}delete i[S.id]}function C(S){for(const L in i){const O=i[L];if(O[S.id]===void 0)continue;const k=O[S.id];for(const q in k)h(k[q].object),delete k[q];delete O[S.id]}}function I(){y(),o=!0,s!==r&&(s=r,c(s.object))}function y(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:I,resetDefaultState:y,dispose:R,releaseStatesOfGeometry:b,releaseStatesOfProgram:C,initAttributes:_,enableAttribute:g,disableUnusedAttributes:A}}function Qd(n,e,t){let i;function r(c){i=c}function s(c,h){n.drawArrays(i,c,h),t.update(h,i,1)}function o(c,h,u){u!==0&&(n.drawArraysInstanced(i,c,h,u),t.update(h,i,u))}function a(c,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,h,0,u);let p=0;for(let m=0;m<u;m++)p+=h[m];t.update(p,i,1)}function l(c,h,u,f){if(u===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<c.length;m++)o(c[m],h[m],f[m]);else{p.multiDrawArraysInstancedWEBGL(i,c,0,h,0,f,0,u);let m=0;for(let _=0;_<u;_++)m+=h[_]*f[_];t.update(m,i,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function ep(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(C){return!(C!==Xt&&i.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(C){const I=C===qi&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==Qt&&i.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==un&&!I)}function l(C){if(C==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=t.logarithmicDepthBuffer===!0,f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),m=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),d=n.getParameter(n.MAX_VERTEX_ATTRIBS),A=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),E=n.getParameter(n.MAX_VARYING_VECTORS),x=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),R=m>0,b=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:m,maxTextureSize:_,maxCubemapSize:g,maxAttributes:d,maxVertexUniforms:A,maxVaryings:E,maxFragmentUniforms:x,vertexTextures:R,maxSamples:b}}function tp(n){const e=this;let t=null,i=0,r=!1,s=!1;const o=new On,a=new He,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const p=u.length!==0||f||i!==0||r;return r=f,i=u.length,p},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,f){t=h(u,f,0)},this.setState=function(u,f,p){const m=u.clippingPlanes,_=u.clipIntersection,g=u.clipShadows,d=n.get(u);if(!r||m===null||m.length===0||s&&!g)s?h(null):c();else{const A=s?0:i,E=A*4;let x=d.clippingState||null;l.value=x,x=h(m,f,E,p);for(let R=0;R!==E;++R)x[R]=t[R];d.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=A}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(u,f,p,m){const _=u!==null?u.length:0;let g=null;if(_!==0){if(g=l.value,m!==!0||g===null){const d=p+_*4,A=f.matrixWorldInverse;a.getNormalMatrix(A),(g===null||g.length<d)&&(g=new Float32Array(d));for(let E=0,x=p;E!==_;++E,x+=4)o.copy(u[E]).applyMatrix4(A,a),o.normal.toArray(g,x),g[x+3]=o.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,g}}function np(n){let e=new WeakMap;function t(o,a){return a===Gs?o.mapping=mi:a===Ws&&(o.mapping=gi),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===Gs||a===Ws)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new Sh(l.height);return c.fromEquirectangularTexture(n,o),e.set(o,c),o.addEventListener("dispose",r),t(c.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}const ci=4,Ca=[.125,.215,.35,.446,.526,.582],kn=20,As=new uu,Pa=new We;let bs=null,ws=0,Rs=0,Cs=!1;const Bn=(1+Math.sqrt(5))/2,ai=1/Bn,La=[new P(-Bn,ai,0),new P(Bn,ai,0),new P(-ai,0,Bn),new P(ai,0,Bn),new P(0,Bn,-ai),new P(0,Bn,ai),new P(-1,1,-1),new P(1,1,-1),new P(-1,1,1),new P(1,1,1)],ip=new P;class Da{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,r=100,s={}){const{size:o=256,position:a=ip}=s;bs=this._renderer.getRenderTarget(),ws=this._renderer.getActiveCubeFace(),Rs=this._renderer.getActiveMipmapLevel(),Cs=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,r,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Na(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ua(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(bs,ws,Rs),this._renderer.xr.enabled=Cs,e.scissorTest=!1,yr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===mi||e.mapping===gi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),bs=this._renderer.getRenderTarget(),ws=this._renderer.getActiveCubeFace(),Rs=this._renderer.getActiveMipmapLevel(),Cs=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Jt,minFilter:Jt,generateMipmaps:!1,type:qi,format:Xt,colorSpace:_i,depthBuffer:!1},r=Ia(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ia(e,t,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=rp(s)),this._blurMaterial=sp(s,e,t)}return r}_compileMaterial(e){const t=new jt(this._lodPlanes[0],e);this._renderer.compile(t,As)}_sceneToCubeUV(e,t,i,r,s){const l=new Rt(90,1,t,i),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,p=u.toneMapping;u.getClearColor(Pa),u.toneMapping=En,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(r),u.clearDepth(),u.setRenderTarget(null));const _=new Uo({name:"PMREM.Background",side:Ct,depthWrite:!1,depthTest:!1}),g=new jt(new Xn,_);let d=!1;const A=e.background;A?A.isColor&&(_.color.copy(A),e.background=null,d=!0):(_.color.copy(Pa),d=!0);for(let E=0;E<6;E++){const x=E%3;x===0?(l.up.set(0,c[E],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+h[E],s.y,s.z)):x===1?(l.up.set(0,0,c[E]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+h[E],s.z)):(l.up.set(0,c[E],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+h[E]));const R=this._cubeSize;yr(r,x*R,E>2?R:0,R,R),u.setRenderTarget(r),d&&u.render(g,l),u.render(e,l)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=p,u.autoClear=f,e.background=A}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===mi||e.mapping===gi;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Na()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ua());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new jt(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;yr(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(o,As)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=La[(r-s-1)%La.length];this._blur(e,s-1,s,o,a)}t.autoClear=i}_blur(e,t,i,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,r,"latitudinal",s),this._halfBlur(o,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new jt(this._lodPlanes[r],c),f=c.uniforms,p=this._sizeLods[i]-1,m=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*kn-1),_=s/m,g=isFinite(s)?1+Math.floor(h*_):kn;g>kn&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${kn}`);const d=[];let A=0;for(let C=0;C<kn;++C){const I=C/_,y=Math.exp(-I*I/2);d.push(y),C===0?A+=y:C<g&&(A+=2*y)}for(let C=0;C<d.length;C++)d[C]=d[C]/A;f.envMap.value=e.texture,f.samples.value=g,f.weights.value=d,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:E}=this;f.dTheta.value=m,f.mipInt.value=E-i;const x=this._sizeLods[r],R=3*x*(r>E-ci?r-E+ci:0),b=4*(this._cubeSize-x);yr(t,R,b,3*x,2*x),l.setRenderTarget(t),l.render(u,As)}}function rp(n){const e=[],t=[],i=[];let r=n;const s=n-ci+1+Ca.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);t.push(a);let l=1/a;o>n-ci?l=Ca[o-n+ci-1]:o===0&&(l=0),i.push(l);const c=1/(a-2),h=-c,u=1+c,f=[h,h,u,h,u,u,h,h,u,u,h,u],p=6,m=6,_=3,g=2,d=1,A=new Float32Array(_*m*p),E=new Float32Array(g*m*p),x=new Float32Array(d*m*p);for(let b=0;b<p;b++){const C=b%3*2/3-1,I=b>2?0:-1,y=[C,I,0,C+2/3,I,0,C+2/3,I+1,0,C,I,0,C+2/3,I+1,0,C,I+1,0];A.set(y,_*m*b),E.set(f,g*m*b);const S=[b,b,b,b,b,b];x.set(S,d*m*b)}const R=new At;R.setAttribute("position",new kt(A,_)),R.setAttribute("uv",new kt(E,g)),R.setAttribute("faceIndex",new kt(x,d)),e.push(R),r>ci&&r--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function Ia(n,e,t){const i=new Wn(n,e,t);return i.texture.mapping=Hr,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function yr(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function sp(n,e,t){const i=new Float32Array(kn),r=new P(0,1,0);return new bn({name:"SphericalGaussianBlur",defines:{n:kn,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Vo(),fragmentShader:`

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
		`,blending:yn,depthTest:!1,depthWrite:!1})}function Ua(){return new bn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Vo(),fragmentShader:`

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
		`,blending:yn,depthTest:!1,depthWrite:!1})}function Na(){return new bn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Vo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:yn,depthTest:!1,depthWrite:!1})}function Vo(){return`

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
	`}function op(n){let e=new WeakMap,t=null;function i(a){if(a&&a.isTexture){const l=a.mapping,c=l===Gs||l===Ws,h=l===mi||l===gi;if(c||h){let u=e.get(a);const f=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return t===null&&(t=new Da(n)),u=c?t.fromEquirectangular(a,u):t.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),u.texture;if(u!==void 0)return u.texture;{const p=a.image;return c&&p&&p.height>0||h&&p&&r(p)?(t===null&&(t=new Da(n)),u=c?t.fromEquirectangular(a):t.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),a.addEventListener("dispose",s),u.texture):null}}}return a}function r(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:o}}function ap(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const r=t(i);return r===null&&Hi("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function lp(n,e,t,i){const r={},s=new WeakMap;function o(u){const f=u.target;f.index!==null&&e.remove(f.index);for(const m in f.attributes)e.remove(f.attributes[m]);f.removeEventListener("dispose",o),delete r[f.id];const p=s.get(f);p&&(e.remove(p),s.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(u,f){return r[f.id]===!0||(f.addEventListener("dispose",o),r[f.id]=!0,t.memory.geometries++),f}function l(u){const f=u.attributes;for(const p in f)e.update(f[p],n.ARRAY_BUFFER)}function c(u){const f=[],p=u.index,m=u.attributes.position;let _=0;if(p!==null){const A=p.array;_=p.version;for(let E=0,x=A.length;E<x;E+=3){const R=A[E+0],b=A[E+1],C=A[E+2];f.push(R,b,b,C,C,R)}}else if(m!==void 0){const A=m.array;_=m.version;for(let E=0,x=A.length/3-1;E<x;E+=3){const R=E+0,b=E+1,C=E+2;f.push(R,b,b,C,C,R)}}else return;const g=new(Al(f)?Pl:Cl)(f,1);g.version=_;const d=s.get(u);d&&e.remove(d),s.set(u,g)}function h(u){const f=s.get(u);if(f){const p=u.index;p!==null&&f.version<p.version&&c(u)}else c(u);return s.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function cp(n,e,t){let i;function r(f){i=f}let s,o;function a(f){s=f.type,o=f.bytesPerElement}function l(f,p){n.drawElements(i,p,s,f*o),t.update(p,i,1)}function c(f,p,m){m!==0&&(n.drawElementsInstanced(i,p,s,f*o,m),t.update(p,i,m))}function h(f,p,m){if(m===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,s,f,0,m);let g=0;for(let d=0;d<m;d++)g+=p[d];t.update(g,i,1)}function u(f,p,m,_){if(m===0)return;const g=e.get("WEBGL_multi_draw");if(g===null)for(let d=0;d<f.length;d++)c(f[d]/o,p[d],_[d]);else{g.multiDrawElementsInstancedWEBGL(i,p,0,s,f,0,_,0,m);let d=0;for(let A=0;A<m;A++)d+=p[A]*_[A];t.update(d,i,1)}}this.setMode=r,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function hp(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=a*(s/3);break;case n.LINES:t.lines+=a*(s/2);break;case n.LINE_STRIP:t.lines+=a*(s-1);break;case n.LINE_LOOP:t.lines+=a*s;break;case n.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function up(n,e,t){const i=new WeakMap,r=new tt;function s(o,a,l){const c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let f=i.get(a);if(f===void 0||f.count!==u){let S=function(){I.dispose(),i.delete(a),a.removeEventListener("dispose",S)};var p=S;f!==void 0&&f.texture.dispose();const m=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,g=a.morphAttributes.color!==void 0,d=a.morphAttributes.position||[],A=a.morphAttributes.normal||[],E=a.morphAttributes.color||[];let x=0;m===!0&&(x=1),_===!0&&(x=2),g===!0&&(x=3);let R=a.attributes.position.count*x,b=1;R>e.maxTextureSize&&(b=Math.ceil(R/e.maxTextureSize),R=e.maxTextureSize);const C=new Float32Array(R*b*4*u),I=new bl(C,R,b,u);I.type=un,I.needsUpdate=!0;const y=x*4;for(let L=0;L<u;L++){const O=d[L],k=A[L],q=E[L],V=R*b*4*L;for(let X=0;X<O.count;X++){const j=X*y;m===!0&&(r.fromBufferAttribute(O,X),C[V+j+0]=r.x,C[V+j+1]=r.y,C[V+j+2]=r.z,C[V+j+3]=0),_===!0&&(r.fromBufferAttribute(k,X),C[V+j+4]=r.x,C[V+j+5]=r.y,C[V+j+6]=r.z,C[V+j+7]=0),g===!0&&(r.fromBufferAttribute(q,X),C[V+j+8]=r.x,C[V+j+9]=r.y,C[V+j+10]=r.z,C[V+j+11]=q.itemSize===4?r.w:1)}}f={count:u,texture:I,size:new le(R,b)},i.set(a,f),a.addEventListener("dispose",S)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let m=0;for(let g=0;g<c.length;g++)m+=c[g];const _=a.morphTargetsRelative?1:1-m;l.getUniforms().setValue(n,"morphTargetBaseInfluence",_),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",f.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:s}}function fp(n,e,t,i){let r=new WeakMap;function s(l){const c=i.render.frame,h=l.geometry,u=e.get(l,h);if(r.get(u)!==c&&(e.update(u),r.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==c&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;r.get(f)!==c&&(f.update(),r.set(f,c))}return u}function o(){r=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:o}}const Kl=new Tt,Fa=new Nl(1,1),Jl=new bl,$l=new ih,jl=new Il,Oa=[],Ba=[],za=new Float32Array(16),ka=new Float32Array(9),Ha=new Float32Array(4);function Ei(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=Oa[r];if(s===void 0&&(s=new Float32Array(r),Oa[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(s,a)}return s}function mt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function gt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Xr(n,e){let t=Ba[e];t===void 0&&(t=new Int32Array(e),Ba[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function dp(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function pp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(mt(t,e))return;n.uniform2fv(this.addr,e),gt(t,e)}}function mp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(mt(t,e))return;n.uniform3fv(this.addr,e),gt(t,e)}}function gp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(mt(t,e))return;n.uniform4fv(this.addr,e),gt(t,e)}}function _p(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(mt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),gt(t,e)}else{if(mt(t,i))return;Ha.set(i),n.uniformMatrix2fv(this.addr,!1,Ha),gt(t,i)}}function vp(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(mt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),gt(t,e)}else{if(mt(t,i))return;ka.set(i),n.uniformMatrix3fv(this.addr,!1,ka),gt(t,i)}}function xp(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(mt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),gt(t,e)}else{if(mt(t,i))return;za.set(i),n.uniformMatrix4fv(this.addr,!1,za),gt(t,i)}}function Mp(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function Sp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(mt(t,e))return;n.uniform2iv(this.addr,e),gt(t,e)}}function yp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(mt(t,e))return;n.uniform3iv(this.addr,e),gt(t,e)}}function Ep(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(mt(t,e))return;n.uniform4iv(this.addr,e),gt(t,e)}}function Tp(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function Ap(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(mt(t,e))return;n.uniform2uiv(this.addr,e),gt(t,e)}}function bp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(mt(t,e))return;n.uniform3uiv(this.addr,e),gt(t,e)}}function wp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(mt(t,e))return;n.uniform4uiv(this.addr,e),gt(t,e)}}function Rp(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(Fa.compareFunction=Tl,s=Fa):s=Kl,t.setTexture2D(e||s,r)}function Cp(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||$l,r)}function Pp(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||jl,r)}function Lp(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||Jl,r)}function Dp(n){switch(n){case 5126:return dp;case 35664:return pp;case 35665:return mp;case 35666:return gp;case 35674:return _p;case 35675:return vp;case 35676:return xp;case 5124:case 35670:return Mp;case 35667:case 35671:return Sp;case 35668:case 35672:return yp;case 35669:case 35673:return Ep;case 5125:return Tp;case 36294:return Ap;case 36295:return bp;case 36296:return wp;case 35678:case 36198:case 36298:case 36306:case 35682:return Rp;case 35679:case 36299:case 36307:return Cp;case 35680:case 36300:case 36308:case 36293:return Pp;case 36289:case 36303:case 36311:case 36292:return Lp}}function Ip(n,e){n.uniform1fv(this.addr,e)}function Up(n,e){const t=Ei(e,this.size,2);n.uniform2fv(this.addr,t)}function Np(n,e){const t=Ei(e,this.size,3);n.uniform3fv(this.addr,t)}function Fp(n,e){const t=Ei(e,this.size,4);n.uniform4fv(this.addr,t)}function Op(n,e){const t=Ei(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function Bp(n,e){const t=Ei(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function zp(n,e){const t=Ei(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function kp(n,e){n.uniform1iv(this.addr,e)}function Hp(n,e){n.uniform2iv(this.addr,e)}function Vp(n,e){n.uniform3iv(this.addr,e)}function Gp(n,e){n.uniform4iv(this.addr,e)}function Wp(n,e){n.uniform1uiv(this.addr,e)}function Xp(n,e){n.uniform2uiv(this.addr,e)}function qp(n,e){n.uniform3uiv(this.addr,e)}function Yp(n,e){n.uniform4uiv(this.addr,e)}function Zp(n,e,t){const i=this.cache,r=e.length,s=Xr(t,r);mt(i,s)||(n.uniform1iv(this.addr,s),gt(i,s));for(let o=0;o!==r;++o)t.setTexture2D(e[o]||Kl,s[o])}function Kp(n,e,t){const i=this.cache,r=e.length,s=Xr(t,r);mt(i,s)||(n.uniform1iv(this.addr,s),gt(i,s));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||$l,s[o])}function Jp(n,e,t){const i=this.cache,r=e.length,s=Xr(t,r);mt(i,s)||(n.uniform1iv(this.addr,s),gt(i,s));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||jl,s[o])}function $p(n,e,t){const i=this.cache,r=e.length,s=Xr(t,r);mt(i,s)||(n.uniform1iv(this.addr,s),gt(i,s));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||Jl,s[o])}function jp(n){switch(n){case 5126:return Ip;case 35664:return Up;case 35665:return Np;case 35666:return Fp;case 35674:return Op;case 35675:return Bp;case 35676:return zp;case 5124:case 35670:return kp;case 35667:case 35671:return Hp;case 35668:case 35672:return Vp;case 35669:case 35673:return Gp;case 5125:return Wp;case 36294:return Xp;case 36295:return qp;case 36296:return Yp;case 35678:case 36198:case 36298:case 36306:case 35682:return Zp;case 35679:case 36299:case 36307:return Kp;case 35680:case 36300:case 36308:case 36293:return Jp;case 36289:case 36303:case 36311:case 36292:return $p}}class Qp{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Dp(t.type)}}class em{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=jp(t.type)}}class tm{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,t[a.id],i)}}}const Ps=/(\w+)(\])?(\[|\.)?/g;function Va(n,e){n.seq.push(e),n.map[e.id]=e}function nm(n,e,t){const i=n.name,r=i.length;for(Ps.lastIndex=0;;){const s=Ps.exec(i),o=Ps.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){Va(t,c===void 0?new Qp(a,n,e):new em(a,n,e));break}else{let u=t.map[a];u===void 0&&(u=new tm(a),Va(t,u)),t=u}}}class Cr{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(t,r),o=e.getUniformLocation(t,s.name);nm(s,o,this)}}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,o=t.length;s!==o;++s){const a=t[s],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in t&&i.push(o)}return i}}function Ga(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const im=37297;let rm=0;function sm(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=r;o<s;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}const Wa=new He;function om(n){Je._getMatrix(Wa,Je.workingColorSpace,n);const e=`mat3( ${Wa.elements.map(t=>t.toFixed(4))} )`;switch(Je.getTransfer(n)){case Ir:return[e,"LinearTransferOETF"];case et:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Xa(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),s=(n.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const o=/ERROR: 0:(\d+)/.exec(s);if(o){const a=parseInt(o[1]);return t.toUpperCase()+`

`+s+`

`+sm(n.getShaderSource(e),a)}else return s}function am(n,e){const t=om(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function lm(n,e){let t;switch(e){case Dc:t="Linear";break;case Ic:t="Reinhard";break;case Uc:t="Cineon";break;case dl:t="ACESFilmic";break;case Fc:t="AgX";break;case Oc:t="Neutral";break;case Nc:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Er=new P;function cm(){Je.getLuminanceCoefficients(Er);const n=Er.x.toFixed(4),e=Er.y.toFixed(4),t=Er.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function hm(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ui).join(`
`)}function um(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function fm(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),o=s.name;let a=1;s.type===n.FLOAT_MAT2&&(a=2),s.type===n.FLOAT_MAT3&&(a=3),s.type===n.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function Ui(n){return n!==""}function qa(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Ya(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const dm=/^[ \t]*#include +<([\w\d./]+)>/gm;function Eo(n){return n.replace(dm,mm)}const pm=new Map;function mm(n,e){let t=Ve[e];if(t===void 0){const i=pm.get(e);if(i!==void 0)t=Ve[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Eo(t)}const gm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Za(n){return n.replace(gm,_m)}function _m(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Ka(n){let e=`precision ${n.precision} float;
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
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function vm(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===hl?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===ul?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===ln&&(e="SHADOWMAP_TYPE_VSM"),e}function xm(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case mi:case gi:e="ENVMAP_TYPE_CUBE";break;case Hr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Mm(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case gi:e="ENVMAP_MODE_REFRACTION";break}return e}function Sm(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case fl:e="ENVMAP_BLENDING_MULTIPLY";break;case Pc:e="ENVMAP_BLENDING_MIX";break;case Lc:e="ENVMAP_BLENDING_ADD";break}return e}function ym(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function Em(n,e,t,i){const r=n.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=vm(t),c=xm(t),h=Mm(t),u=Sm(t),f=ym(t),p=hm(t),m=um(s),_=r.createProgram();let g,d,A=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Ui).join(`
`),g.length>0&&(g+=`
`),d=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Ui).join(`
`),d.length>0&&(d+=`
`)):(g=[Ka(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ui).join(`
`),d=[Ka(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==En?"#define TONE_MAPPING":"",t.toneMapping!==En?Ve.tonemapping_pars_fragment:"",t.toneMapping!==En?lm("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ve.colorspace_pars_fragment,am("linearToOutputTexel",t.outputColorSpace),cm(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ui).join(`
`)),o=Eo(o),o=qa(o,t),o=Ya(o,t),a=Eo(a),a=qa(a,t),a=Ya(a,t),o=Za(o),a=Za(a),t.isRawShaderMaterial!==!0&&(A=`#version 300 es
`,g=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,d=["#define varying in",t.glslVersion===na?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===na?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const E=A+g+o,x=A+d+a,R=Ga(r,r.VERTEX_SHADER,E),b=Ga(r,r.FRAGMENT_SHADER,x);r.attachShader(_,R),r.attachShader(_,b),t.index0AttributeName!==void 0?r.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_);function C(L){if(n.debug.checkShaderErrors){const O=r.getProgramInfoLog(_)||"",k=r.getShaderInfoLog(R)||"",q=r.getShaderInfoLog(b)||"",V=O.trim(),X=k.trim(),j=q.trim();let G=!0,ue=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if(G=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,_,R,b);else{const _e=Xa(r,R,"vertex"),Me=Xa(r,b,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+V+`
`+_e+`
`+Me)}else V!==""?console.warn("THREE.WebGLProgram: Program Info Log:",V):(X===""||j==="")&&(ue=!1);ue&&(L.diagnostics={runnable:G,programLog:V,vertexShader:{log:X,prefix:g},fragmentShader:{log:j,prefix:d}})}r.deleteShader(R),r.deleteShader(b),I=new Cr(r,_),y=fm(r,_)}let I;this.getUniforms=function(){return I===void 0&&C(this),I};let y;this.getAttributes=function(){return y===void 0&&C(this),y};let S=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=r.getProgramParameter(_,im)),S},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=rm++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=R,this.fragmentShader=b,this}let Tm=0;class Am{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new bm(e),t.set(e,i)),i}}class bm{constructor(e){this.id=Tm++,this.code=e,this.usedTimes=0}}function wm(n,e,t,i,r,s,o){const a=new wl,l=new Am,c=new Set,h=[],u=r.logarithmicDepthBuffer,f=r.vertexTextures;let p=r.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(y){return c.add(y),y===0?"uv":`uv${y}`}function g(y,S,L,O,k){const q=O.fog,V=k.geometry,X=y.isMeshStandardMaterial?O.environment:null,j=(y.isMeshStandardMaterial?t:e).get(y.envMap||X),G=j&&j.mapping===Hr?j.image.height:null,ue=m[y.type];y.precision!==null&&(p=r.getMaxPrecision(y.precision),p!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",p,"instead."));const _e=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,Me=_e!==void 0?_e.length:0;let ze=0;V.morphAttributes.position!==void 0&&(ze=1),V.morphAttributes.normal!==void 0&&(ze=2),V.morphAttributes.color!==void 0&&(ze=3);let Ye,je,Ze,Y;if(ue){const $e=Kt[ue];Ye=$e.vertexShader,je=$e.fragmentShader}else Ye=y.vertexShader,je=y.fragmentShader,l.update(y),Ze=l.getVertexShaderID(y),Y=l.getFragmentShaderID(y);const te=n.getRenderTarget(),xe=n.state.buffers.depth.getReversed(),Ce=k.isInstancedMesh===!0,Ee=k.isBatchedMesh===!0,Xe=!!y.map,rt=!!y.matcap,w=!!j,ee=!!y.aoMap,J=!!y.lightMap,K=!!y.bumpMap,Z=!!y.normalMap,ce=!!y.displacementMap,ne=!!y.emissiveMap,he=!!y.metalnessMap,Oe=!!y.roughnessMap,Fe=y.anisotropy>0,T=y.clearcoat>0,v=y.dispersion>0,F=y.iridescence>0,H=y.sheen>0,Q=y.transmission>0,W=Fe&&!!y.anisotropyMap,we=T&&!!y.clearcoatMap,ae=T&&!!y.clearcoatNormalMap,Te=T&&!!y.clearcoatRoughnessMap,Ae=F&&!!y.iridescenceMap,ie=F&&!!y.iridescenceThicknessMap,ge=H&&!!y.sheenColorMap,Ue=H&&!!y.sheenRoughnessMap,Re=!!y.specularMap,pe=!!y.specularColorMap,ke=!!y.specularIntensityMap,D=Q&&!!y.transmissionMap,oe=Q&&!!y.thicknessMap,fe=!!y.gradientMap,Se=!!y.alphaMap,re=y.alphaTest>0,$=!!y.alphaHash,be=!!y.extensions;let Be=En;y.toneMapped&&(te===null||te.isXRRenderTarget===!0)&&(Be=n.toneMapping);const st={shaderID:ue,shaderType:y.type,shaderName:y.name,vertexShader:Ye,fragmentShader:je,defines:y.defines,customVertexShaderID:Ze,customFragmentShaderID:Y,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:p,batching:Ee,batchingColor:Ee&&k._colorsTexture!==null,instancing:Ce,instancingColor:Ce&&k.instanceColor!==null,instancingMorph:Ce&&k.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:te===null?n.outputColorSpace:te.isXRRenderTarget===!0?te.texture.colorSpace:_i,alphaToCoverage:!!y.alphaToCoverage,map:Xe,matcap:rt,envMap:w,envMapMode:w&&j.mapping,envMapCubeUVHeight:G,aoMap:ee,lightMap:J,bumpMap:K,normalMap:Z,displacementMap:f&&ce,emissiveMap:ne,normalMapObjectSpace:Z&&y.normalMapType===Hc,normalMapTangentSpace:Z&&y.normalMapType===El,metalnessMap:he,roughnessMap:Oe,anisotropy:Fe,anisotropyMap:W,clearcoat:T,clearcoatMap:we,clearcoatNormalMap:ae,clearcoatRoughnessMap:Te,dispersion:v,iridescence:F,iridescenceMap:Ae,iridescenceThicknessMap:ie,sheen:H,sheenColorMap:ge,sheenRoughnessMap:Ue,specularMap:Re,specularColorMap:pe,specularIntensityMap:ke,transmission:Q,transmissionMap:D,thicknessMap:oe,gradientMap:fe,opaque:y.transparent===!1&&y.blending===hi&&y.alphaToCoverage===!1,alphaMap:Se,alphaTest:re,alphaHash:$,combine:y.combine,mapUv:Xe&&_(y.map.channel),aoMapUv:ee&&_(y.aoMap.channel),lightMapUv:J&&_(y.lightMap.channel),bumpMapUv:K&&_(y.bumpMap.channel),normalMapUv:Z&&_(y.normalMap.channel),displacementMapUv:ce&&_(y.displacementMap.channel),emissiveMapUv:ne&&_(y.emissiveMap.channel),metalnessMapUv:he&&_(y.metalnessMap.channel),roughnessMapUv:Oe&&_(y.roughnessMap.channel),anisotropyMapUv:W&&_(y.anisotropyMap.channel),clearcoatMapUv:we&&_(y.clearcoatMap.channel),clearcoatNormalMapUv:ae&&_(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Te&&_(y.clearcoatRoughnessMap.channel),iridescenceMapUv:Ae&&_(y.iridescenceMap.channel),iridescenceThicknessMapUv:ie&&_(y.iridescenceThicknessMap.channel),sheenColorMapUv:ge&&_(y.sheenColorMap.channel),sheenRoughnessMapUv:Ue&&_(y.sheenRoughnessMap.channel),specularMapUv:Re&&_(y.specularMap.channel),specularColorMapUv:pe&&_(y.specularColorMap.channel),specularIntensityMapUv:ke&&_(y.specularIntensityMap.channel),transmissionMapUv:D&&_(y.transmissionMap.channel),thicknessMapUv:oe&&_(y.thicknessMap.channel),alphaMapUv:Se&&_(y.alphaMap.channel),vertexTangents:!!V.attributes.tangent&&(Z||Fe),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!V.attributes.uv&&(Xe||Se),fog:!!q,useFog:y.fog===!0,fogExp2:!!q&&q.isFogExp2,flatShading:y.flatShading===!0&&y.wireframe===!1,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:xe,skinning:k.isSkinnedMesh===!0,morphTargets:V.morphAttributes.position!==void 0,morphNormals:V.morphAttributes.normal!==void 0,morphColors:V.morphAttributes.color!==void 0,morphTargetsCount:Me,morphTextureStride:ze,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:y.dithering,shadowMapEnabled:n.shadowMap.enabled&&L.length>0,shadowMapType:n.shadowMap.type,toneMapping:Be,decodeVideoTexture:Xe&&y.map.isVideoTexture===!0&&Je.getTransfer(y.map.colorSpace)===et,decodeVideoTextureEmissive:ne&&y.emissiveMap.isVideoTexture===!0&&Je.getTransfer(y.emissiveMap.colorSpace)===et,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===cn,flipSided:y.side===Ct,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:be&&y.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(be&&y.extensions.multiDraw===!0||Ee)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return st.vertexUv1s=c.has(1),st.vertexUv2s=c.has(2),st.vertexUv3s=c.has(3),c.clear(),st}function d(y){const S=[];if(y.shaderID?S.push(y.shaderID):(S.push(y.customVertexShaderID),S.push(y.customFragmentShaderID)),y.defines!==void 0)for(const L in y.defines)S.push(L),S.push(y.defines[L]);return y.isRawShaderMaterial===!1&&(A(S,y),E(S,y),S.push(n.outputColorSpace)),S.push(y.customProgramCacheKey),S.join()}function A(y,S){y.push(S.precision),y.push(S.outputColorSpace),y.push(S.envMapMode),y.push(S.envMapCubeUVHeight),y.push(S.mapUv),y.push(S.alphaMapUv),y.push(S.lightMapUv),y.push(S.aoMapUv),y.push(S.bumpMapUv),y.push(S.normalMapUv),y.push(S.displacementMapUv),y.push(S.emissiveMapUv),y.push(S.metalnessMapUv),y.push(S.roughnessMapUv),y.push(S.anisotropyMapUv),y.push(S.clearcoatMapUv),y.push(S.clearcoatNormalMapUv),y.push(S.clearcoatRoughnessMapUv),y.push(S.iridescenceMapUv),y.push(S.iridescenceThicknessMapUv),y.push(S.sheenColorMapUv),y.push(S.sheenRoughnessMapUv),y.push(S.specularMapUv),y.push(S.specularColorMapUv),y.push(S.specularIntensityMapUv),y.push(S.transmissionMapUv),y.push(S.thicknessMapUv),y.push(S.combine),y.push(S.fogExp2),y.push(S.sizeAttenuation),y.push(S.morphTargetsCount),y.push(S.morphAttributeCount),y.push(S.numDirLights),y.push(S.numPointLights),y.push(S.numSpotLights),y.push(S.numSpotLightMaps),y.push(S.numHemiLights),y.push(S.numRectAreaLights),y.push(S.numDirLightShadows),y.push(S.numPointLightShadows),y.push(S.numSpotLightShadows),y.push(S.numSpotLightShadowsWithMaps),y.push(S.numLightProbes),y.push(S.shadowMapType),y.push(S.toneMapping),y.push(S.numClippingPlanes),y.push(S.numClipIntersection),y.push(S.depthPacking)}function E(y,S){a.disableAll(),S.supportsVertexTextures&&a.enable(0),S.instancing&&a.enable(1),S.instancingColor&&a.enable(2),S.instancingMorph&&a.enable(3),S.matcap&&a.enable(4),S.envMap&&a.enable(5),S.normalMapObjectSpace&&a.enable(6),S.normalMapTangentSpace&&a.enable(7),S.clearcoat&&a.enable(8),S.iridescence&&a.enable(9),S.alphaTest&&a.enable(10),S.vertexColors&&a.enable(11),S.vertexAlphas&&a.enable(12),S.vertexUv1s&&a.enable(13),S.vertexUv2s&&a.enable(14),S.vertexUv3s&&a.enable(15),S.vertexTangents&&a.enable(16),S.anisotropy&&a.enable(17),S.alphaHash&&a.enable(18),S.batching&&a.enable(19),S.dispersion&&a.enable(20),S.batchingColor&&a.enable(21),S.gradientMap&&a.enable(22),y.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reversedDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.decodeVideoTextureEmissive&&a.enable(20),S.alphaToCoverage&&a.enable(21),y.push(a.mask)}function x(y){const S=m[y.type];let L;if(S){const O=Kt[S];L=_h.clone(O.uniforms)}else L=y.uniforms;return L}function R(y,S){let L;for(let O=0,k=h.length;O<k;O++){const q=h[O];if(q.cacheKey===S){L=q,++L.usedTimes;break}}return L===void 0&&(L=new Em(n,S,y,s),h.push(L)),L}function b(y){if(--y.usedTimes===0){const S=h.indexOf(y);h[S]=h[h.length-1],h.pop(),y.destroy()}}function C(y){l.remove(y)}function I(){l.dispose()}return{getParameters:g,getProgramCacheKey:d,getUniforms:x,acquireProgram:R,releaseProgram:b,releaseShaderCache:C,programs:h,dispose:I}}function Rm(){let n=new WeakMap;function e(o){return n.has(o)}function t(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function r(o,a,l){n.get(o)[a]=l}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function Cm(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function Ja(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function $a(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function o(u,f,p,m,_,g){let d=n[e];return d===void 0?(d={id:u.id,object:u,geometry:f,material:p,groupOrder:m,renderOrder:u.renderOrder,z:_,group:g},n[e]=d):(d.id=u.id,d.object=u,d.geometry=f,d.material=p,d.groupOrder=m,d.renderOrder=u.renderOrder,d.z=_,d.group=g),e++,d}function a(u,f,p,m,_,g){const d=o(u,f,p,m,_,g);p.transmission>0?i.push(d):p.transparent===!0?r.push(d):t.push(d)}function l(u,f,p,m,_,g){const d=o(u,f,p,m,_,g);p.transmission>0?i.unshift(d):p.transparent===!0?r.unshift(d):t.unshift(d)}function c(u,f){t.length>1&&t.sort(u||Cm),i.length>1&&i.sort(f||Ja),r.length>1&&r.sort(f||Ja)}function h(){for(let u=e,f=n.length;u<f;u++){const p=n[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:a,unshift:l,finish:h,sort:c}}function Pm(){let n=new WeakMap;function e(i,r){const s=n.get(i);let o;return s===void 0?(o=new $a,n.set(i,[o])):r>=s.length?(o=new $a,s.push(o)):o=s[r],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function Lm(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new P,color:new We};break;case"SpotLight":t={position:new P,direction:new P,color:new We,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new P,color:new We,distance:0,decay:0};break;case"HemisphereLight":t={direction:new P,skyColor:new We,groundColor:new We};break;case"RectAreaLight":t={color:new We,position:new P,halfWidth:new P,halfHeight:new P};break}return n[e.id]=t,t}}}function Dm(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new le};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new le};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new le,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let Im=0;function Um(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function Nm(n){const e=new Lm,t=Dm(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new P);const r=new P,s=new lt,o=new lt;function a(c){let h=0,u=0,f=0;for(let y=0;y<9;y++)i.probe[y].set(0,0,0);let p=0,m=0,_=0,g=0,d=0,A=0,E=0,x=0,R=0,b=0,C=0;c.sort(Um);for(let y=0,S=c.length;y<S;y++){const L=c[y],O=L.color,k=L.intensity,q=L.distance,V=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)h+=O.r*k,u+=O.g*k,f+=O.b*k;else if(L.isLightProbe){for(let X=0;X<9;X++)i.probe[X].addScaledVector(L.sh.coefficients[X],k);C++}else if(L.isDirectionalLight){const X=e.get(L);if(X.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const j=L.shadow,G=t.get(L);G.shadowIntensity=j.intensity,G.shadowBias=j.bias,G.shadowNormalBias=j.normalBias,G.shadowRadius=j.radius,G.shadowMapSize=j.mapSize,i.directionalShadow[p]=G,i.directionalShadowMap[p]=V,i.directionalShadowMatrix[p]=L.shadow.matrix,A++}i.directional[p]=X,p++}else if(L.isSpotLight){const X=e.get(L);X.position.setFromMatrixPosition(L.matrixWorld),X.color.copy(O).multiplyScalar(k),X.distance=q,X.coneCos=Math.cos(L.angle),X.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),X.decay=L.decay,i.spot[_]=X;const j=L.shadow;if(L.map&&(i.spotLightMap[R]=L.map,R++,j.updateMatrices(L),L.castShadow&&b++),i.spotLightMatrix[_]=j.matrix,L.castShadow){const G=t.get(L);G.shadowIntensity=j.intensity,G.shadowBias=j.bias,G.shadowNormalBias=j.normalBias,G.shadowRadius=j.radius,G.shadowMapSize=j.mapSize,i.spotShadow[_]=G,i.spotShadowMap[_]=V,x++}_++}else if(L.isRectAreaLight){const X=e.get(L);X.color.copy(O).multiplyScalar(k),X.halfWidth.set(L.width*.5,0,0),X.halfHeight.set(0,L.height*.5,0),i.rectArea[g]=X,g++}else if(L.isPointLight){const X=e.get(L);if(X.color.copy(L.color).multiplyScalar(L.intensity),X.distance=L.distance,X.decay=L.decay,L.castShadow){const j=L.shadow,G=t.get(L);G.shadowIntensity=j.intensity,G.shadowBias=j.bias,G.shadowNormalBias=j.normalBias,G.shadowRadius=j.radius,G.shadowMapSize=j.mapSize,G.shadowCameraNear=j.camera.near,G.shadowCameraFar=j.camera.far,i.pointShadow[m]=G,i.pointShadowMap[m]=V,i.pointShadowMatrix[m]=L.shadow.matrix,E++}i.point[m]=X,m++}else if(L.isHemisphereLight){const X=e.get(L);X.skyColor.copy(L.color).multiplyScalar(k),X.groundColor.copy(L.groundColor).multiplyScalar(k),i.hemi[d]=X,d++}}g>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=de.LTC_FLOAT_1,i.rectAreaLTC2=de.LTC_FLOAT_2):(i.rectAreaLTC1=de.LTC_HALF_1,i.rectAreaLTC2=de.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=u,i.ambient[2]=f;const I=i.hash;(I.directionalLength!==p||I.pointLength!==m||I.spotLength!==_||I.rectAreaLength!==g||I.hemiLength!==d||I.numDirectionalShadows!==A||I.numPointShadows!==E||I.numSpotShadows!==x||I.numSpotMaps!==R||I.numLightProbes!==C)&&(i.directional.length=p,i.spot.length=_,i.rectArea.length=g,i.point.length=m,i.hemi.length=d,i.directionalShadow.length=A,i.directionalShadowMap.length=A,i.pointShadow.length=E,i.pointShadowMap.length=E,i.spotShadow.length=x,i.spotShadowMap.length=x,i.directionalShadowMatrix.length=A,i.pointShadowMatrix.length=E,i.spotLightMatrix.length=x+R-b,i.spotLightMap.length=R,i.numSpotLightShadowsWithMaps=b,i.numLightProbes=C,I.directionalLength=p,I.pointLength=m,I.spotLength=_,I.rectAreaLength=g,I.hemiLength=d,I.numDirectionalShadows=A,I.numPointShadows=E,I.numSpotShadows=x,I.numSpotMaps=R,I.numLightProbes=C,i.version=Im++)}function l(c,h){let u=0,f=0,p=0,m=0,_=0;const g=h.matrixWorldInverse;for(let d=0,A=c.length;d<A;d++){const E=c[d];if(E.isDirectionalLight){const x=i.directional[u];x.direction.setFromMatrixPosition(E.matrixWorld),r.setFromMatrixPosition(E.target.matrixWorld),x.direction.sub(r),x.direction.transformDirection(g),u++}else if(E.isSpotLight){const x=i.spot[p];x.position.setFromMatrixPosition(E.matrixWorld),x.position.applyMatrix4(g),x.direction.setFromMatrixPosition(E.matrixWorld),r.setFromMatrixPosition(E.target.matrixWorld),x.direction.sub(r),x.direction.transformDirection(g),p++}else if(E.isRectAreaLight){const x=i.rectArea[m];x.position.setFromMatrixPosition(E.matrixWorld),x.position.applyMatrix4(g),o.identity(),s.copy(E.matrixWorld),s.premultiply(g),o.extractRotation(s),x.halfWidth.set(E.width*.5,0,0),x.halfHeight.set(0,E.height*.5,0),x.halfWidth.applyMatrix4(o),x.halfHeight.applyMatrix4(o),m++}else if(E.isPointLight){const x=i.point[f];x.position.setFromMatrixPosition(E.matrixWorld),x.position.applyMatrix4(g),f++}else if(E.isHemisphereLight){const x=i.hemi[_];x.direction.setFromMatrixPosition(E.matrixWorld),x.direction.transformDirection(g),_++}}}return{setup:a,setupView:l,state:i}}function ja(n){const e=new Nm(n),t=[],i=[];function r(h){c.camera=h,t.length=0,i.length=0}function s(h){t.push(h)}function o(h){i.push(h)}function a(){e.setup(t)}function l(h){e.setupView(t,h)}const c={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function Fm(n){let e=new WeakMap;function t(r,s=0){const o=e.get(r);let a;return o===void 0?(a=new ja(n),e.set(r,[a])):s>=o.length?(a=new ja(n),o.push(a)):a=o[s],a}function i(){e=new WeakMap}return{get:t,dispose:i}}const Om=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Bm=`uniform sampler2D shadow_pass;
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
}`;function zm(n,e,t){let i=new Fo;const r=new le,s=new le,o=new tt,a=new ru({depthPacking:kc}),l=new su,c={},h=t.maxTextureSize,u={[An]:Ct,[Ct]:An,[cn]:cn},f=new bn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new le},radius:{value:4}},vertexShader:Om,fragmentShader:Bm}),p=f.clone();p.defines.HORIZONTAL_PASS=1;const m=new At;m.setAttribute("position",new kt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new jt(m,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=hl;let d=this.type;this.render=function(b,C,I){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||b.length===0)return;const y=n.getRenderTarget(),S=n.getActiveCubeFace(),L=n.getActiveMipmapLevel(),O=n.state;O.setBlending(yn),O.buffers.depth.getReversed()===!0?O.buffers.color.setClear(0,0,0,0):O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);const k=d!==ln&&this.type===ln,q=d===ln&&this.type!==ln;for(let V=0,X=b.length;V<X;V++){const j=b[V],G=j.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",j,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;r.copy(G.mapSize);const ue=G.getFrameExtents();if(r.multiply(ue),s.copy(G.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(s.x=Math.floor(h/ue.x),r.x=s.x*ue.x,G.mapSize.x=s.x),r.y>h&&(s.y=Math.floor(h/ue.y),r.y=s.y*ue.y,G.mapSize.y=s.y)),G.map===null||k===!0||q===!0){const Me=this.type!==ln?{minFilter:qt,magFilter:qt}:{};G.map!==null&&G.map.dispose(),G.map=new Wn(r.x,r.y,Me),G.map.texture.name=j.name+".shadowMap",G.camera.updateProjectionMatrix()}n.setRenderTarget(G.map),n.clear();const _e=G.getViewportCount();for(let Me=0;Me<_e;Me++){const ze=G.getViewport(Me);o.set(s.x*ze.x,s.y*ze.y,s.x*ze.z,s.y*ze.w),O.viewport(o),G.updateMatrices(j,Me),i=G.getFrustum(),x(C,I,G.camera,j,this.type)}G.isPointLightShadow!==!0&&this.type===ln&&A(G,I),G.needsUpdate=!1}d=this.type,g.needsUpdate=!1,n.setRenderTarget(y,S,L)};function A(b,C){const I=e.update(_);f.defines.VSM_SAMPLES!==b.blurSamples&&(f.defines.VSM_SAMPLES=b.blurSamples,p.defines.VSM_SAMPLES=b.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new Wn(r.x,r.y)),f.uniforms.shadow_pass.value=b.map.texture,f.uniforms.resolution.value=b.mapSize,f.uniforms.radius.value=b.radius,n.setRenderTarget(b.mapPass),n.clear(),n.renderBufferDirect(C,null,I,f,_,null),p.uniforms.shadow_pass.value=b.mapPass.texture,p.uniforms.resolution.value=b.mapSize,p.uniforms.radius.value=b.radius,n.setRenderTarget(b.map),n.clear(),n.renderBufferDirect(C,null,I,p,_,null)}function E(b,C,I,y){let S=null;const L=I.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(L!==void 0)S=L;else if(S=I.isPointLight===!0?l:a,n.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const O=S.uuid,k=C.uuid;let q=c[O];q===void 0&&(q={},c[O]=q);let V=q[k];V===void 0&&(V=S.clone(),q[k]=V,C.addEventListener("dispose",R)),S=V}if(S.visible=C.visible,S.wireframe=C.wireframe,y===ln?S.side=C.shadowSide!==null?C.shadowSide:C.side:S.side=C.shadowSide!==null?C.shadowSide:u[C.side],S.alphaMap=C.alphaMap,S.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,S.map=C.map,S.clipShadows=C.clipShadows,S.clippingPlanes=C.clippingPlanes,S.clipIntersection=C.clipIntersection,S.displacementMap=C.displacementMap,S.displacementScale=C.displacementScale,S.displacementBias=C.displacementBias,S.wireframeLinewidth=C.wireframeLinewidth,S.linewidth=C.linewidth,I.isPointLight===!0&&S.isMeshDistanceMaterial===!0){const O=n.properties.get(S);O.light=I}return S}function x(b,C,I,y,S){if(b.visible===!1)return;if(b.layers.test(C.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&S===ln)&&(!b.frustumCulled||i.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,b.matrixWorld);const k=e.update(b),q=b.material;if(Array.isArray(q)){const V=k.groups;for(let X=0,j=V.length;X<j;X++){const G=V[X],ue=q[G.materialIndex];if(ue&&ue.visible){const _e=E(b,ue,y,S);b.onBeforeShadow(n,b,C,I,k,_e,G),n.renderBufferDirect(I,null,k,_e,b,G),b.onAfterShadow(n,b,C,I,k,_e,G)}}}else if(q.visible){const V=E(b,q,y,S);b.onBeforeShadow(n,b,C,I,k,V,null),n.renderBufferDirect(I,null,k,V,b,null),b.onAfterShadow(n,b,C,I,k,V,null)}}const O=b.children;for(let k=0,q=O.length;k<q;k++)x(O[k],C,I,y,S)}function R(b){b.target.removeEventListener("dispose",R);for(const I in c){const y=c[I],S=b.target.uuid;S in y&&(y[S].dispose(),delete y[S])}}}const km={[Fs]:Os,[Bs]:Hs,[zs]:Vs,[pi]:ks,[Os]:Fs,[Hs]:Bs,[Vs]:zs,[ks]:pi};function Hm(n,e){function t(){let D=!1;const oe=new tt;let fe=null;const Se=new tt(0,0,0,0);return{setMask:function(re){fe!==re&&!D&&(n.colorMask(re,re,re,re),fe=re)},setLocked:function(re){D=re},setClear:function(re,$,be,Be,st){st===!0&&(re*=Be,$*=Be,be*=Be),oe.set(re,$,be,Be),Se.equals(oe)===!1&&(n.clearColor(re,$,be,Be),Se.copy(oe))},reset:function(){D=!1,fe=null,Se.set(-1,0,0,0)}}}function i(){let D=!1,oe=!1,fe=null,Se=null,re=null;return{setReversed:function($){if(oe!==$){const be=e.get("EXT_clip_control");$?be.clipControlEXT(be.LOWER_LEFT_EXT,be.ZERO_TO_ONE_EXT):be.clipControlEXT(be.LOWER_LEFT_EXT,be.NEGATIVE_ONE_TO_ONE_EXT),oe=$;const Be=re;re=null,this.setClear(Be)}},getReversed:function(){return oe},setTest:function($){$?te(n.DEPTH_TEST):xe(n.DEPTH_TEST)},setMask:function($){fe!==$&&!D&&(n.depthMask($),fe=$)},setFunc:function($){if(oe&&($=km[$]),Se!==$){switch($){case Fs:n.depthFunc(n.NEVER);break;case Os:n.depthFunc(n.ALWAYS);break;case Bs:n.depthFunc(n.LESS);break;case pi:n.depthFunc(n.LEQUAL);break;case zs:n.depthFunc(n.EQUAL);break;case ks:n.depthFunc(n.GEQUAL);break;case Hs:n.depthFunc(n.GREATER);break;case Vs:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Se=$}},setLocked:function($){D=$},setClear:function($){re!==$&&(oe&&($=1-$),n.clearDepth($),re=$)},reset:function(){D=!1,fe=null,Se=null,re=null,oe=!1}}}function r(){let D=!1,oe=null,fe=null,Se=null,re=null,$=null,be=null,Be=null,st=null;return{setTest:function($e){D||($e?te(n.STENCIL_TEST):xe(n.STENCIL_TEST))},setMask:function($e){oe!==$e&&!D&&(n.stencilMask($e),oe=$e)},setFunc:function($e,tn,Zt){(fe!==$e||Se!==tn||re!==Zt)&&(n.stencilFunc($e,tn,Zt),fe=$e,Se=tn,re=Zt)},setOp:function($e,tn,Zt){($!==$e||be!==tn||Be!==Zt)&&(n.stencilOp($e,tn,Zt),$=$e,be=tn,Be=Zt)},setLocked:function($e){D=$e},setClear:function($e){st!==$e&&(n.clearStencil($e),st=$e)},reset:function(){D=!1,oe=null,fe=null,Se=null,re=null,$=null,be=null,Be=null,st=null}}}const s=new t,o=new i,a=new r,l=new WeakMap,c=new WeakMap;let h={},u={},f=new WeakMap,p=[],m=null,_=!1,g=null,d=null,A=null,E=null,x=null,R=null,b=null,C=new We(0,0,0),I=0,y=!1,S=null,L=null,O=null,k=null,q=null;const V=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,j=0;const G=n.getParameter(n.VERSION);G.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec(G)[1]),X=j>=1):G.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),X=j>=2);let ue=null,_e={};const Me=n.getParameter(n.SCISSOR_BOX),ze=n.getParameter(n.VIEWPORT),Ye=new tt().fromArray(Me),je=new tt().fromArray(ze);function Ze(D,oe,fe,Se){const re=new Uint8Array(4),$=n.createTexture();n.bindTexture(D,$),n.texParameteri(D,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(D,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let be=0;be<fe;be++)D===n.TEXTURE_3D||D===n.TEXTURE_2D_ARRAY?n.texImage3D(oe,0,n.RGBA,1,1,Se,0,n.RGBA,n.UNSIGNED_BYTE,re):n.texImage2D(oe+be,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,re);return $}const Y={};Y[n.TEXTURE_2D]=Ze(n.TEXTURE_2D,n.TEXTURE_2D,1),Y[n.TEXTURE_CUBE_MAP]=Ze(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),Y[n.TEXTURE_2D_ARRAY]=Ze(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Y[n.TEXTURE_3D]=Ze(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),te(n.DEPTH_TEST),o.setFunc(pi),K(!1),Z(Jo),te(n.CULL_FACE),ee(yn);function te(D){h[D]!==!0&&(n.enable(D),h[D]=!0)}function xe(D){h[D]!==!1&&(n.disable(D),h[D]=!1)}function Ce(D,oe){return u[D]!==oe?(n.bindFramebuffer(D,oe),u[D]=oe,D===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=oe),D===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=oe),!0):!1}function Ee(D,oe){let fe=p,Se=!1;if(D){fe=f.get(oe),fe===void 0&&(fe=[],f.set(oe,fe));const re=D.textures;if(fe.length!==re.length||fe[0]!==n.COLOR_ATTACHMENT0){for(let $=0,be=re.length;$<be;$++)fe[$]=n.COLOR_ATTACHMENT0+$;fe.length=re.length,Se=!0}}else fe[0]!==n.BACK&&(fe[0]=n.BACK,Se=!0);Se&&n.drawBuffers(fe)}function Xe(D){return m!==D?(n.useProgram(D),m=D,!0):!1}const rt={[zn]:n.FUNC_ADD,[dc]:n.FUNC_SUBTRACT,[pc]:n.FUNC_REVERSE_SUBTRACT};rt[mc]=n.MIN,rt[gc]=n.MAX;const w={[_c]:n.ZERO,[vc]:n.ONE,[xc]:n.SRC_COLOR,[Us]:n.SRC_ALPHA,[Ac]:n.SRC_ALPHA_SATURATE,[Ec]:n.DST_COLOR,[Sc]:n.DST_ALPHA,[Mc]:n.ONE_MINUS_SRC_COLOR,[Ns]:n.ONE_MINUS_SRC_ALPHA,[Tc]:n.ONE_MINUS_DST_COLOR,[yc]:n.ONE_MINUS_DST_ALPHA,[bc]:n.CONSTANT_COLOR,[wc]:n.ONE_MINUS_CONSTANT_COLOR,[Rc]:n.CONSTANT_ALPHA,[Cc]:n.ONE_MINUS_CONSTANT_ALPHA};function ee(D,oe,fe,Se,re,$,be,Be,st,$e){if(D===yn){_===!0&&(xe(n.BLEND),_=!1);return}if(_===!1&&(te(n.BLEND),_=!0),D!==fc){if(D!==g||$e!==y){if((d!==zn||x!==zn)&&(n.blendEquation(n.FUNC_ADD),d=zn,x=zn),$e)switch(D){case hi:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case $o:n.blendFunc(n.ONE,n.ONE);break;case jo:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Qo:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case hi:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case $o:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case jo:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Qo:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}A=null,E=null,R=null,b=null,C.set(0,0,0),I=0,g=D,y=$e}return}re=re||oe,$=$||fe,be=be||Se,(oe!==d||re!==x)&&(n.blendEquationSeparate(rt[oe],rt[re]),d=oe,x=re),(fe!==A||Se!==E||$!==R||be!==b)&&(n.blendFuncSeparate(w[fe],w[Se],w[$],w[be]),A=fe,E=Se,R=$,b=be),(Be.equals(C)===!1||st!==I)&&(n.blendColor(Be.r,Be.g,Be.b,st),C.copy(Be),I=st),g=D,y=!1}function J(D,oe){D.side===cn?xe(n.CULL_FACE):te(n.CULL_FACE);let fe=D.side===Ct;oe&&(fe=!fe),K(fe),D.blending===hi&&D.transparent===!1?ee(yn):ee(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),o.setFunc(D.depthFunc),o.setTest(D.depthTest),o.setMask(D.depthWrite),s.setMask(D.colorWrite);const Se=D.stencilWrite;a.setTest(Se),Se&&(a.setMask(D.stencilWriteMask),a.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),a.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),ne(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?te(n.SAMPLE_ALPHA_TO_COVERAGE):xe(n.SAMPLE_ALPHA_TO_COVERAGE)}function K(D){S!==D&&(D?n.frontFace(n.CW):n.frontFace(n.CCW),S=D)}function Z(D){D!==hc?(te(n.CULL_FACE),D!==L&&(D===Jo?n.cullFace(n.BACK):D===uc?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):xe(n.CULL_FACE),L=D}function ce(D){D!==O&&(X&&n.lineWidth(D),O=D)}function ne(D,oe,fe){D?(te(n.POLYGON_OFFSET_FILL),(k!==oe||q!==fe)&&(n.polygonOffset(oe,fe),k=oe,q=fe)):xe(n.POLYGON_OFFSET_FILL)}function he(D){D?te(n.SCISSOR_TEST):xe(n.SCISSOR_TEST)}function Oe(D){D===void 0&&(D=n.TEXTURE0+V-1),ue!==D&&(n.activeTexture(D),ue=D)}function Fe(D,oe,fe){fe===void 0&&(ue===null?fe=n.TEXTURE0+V-1:fe=ue);let Se=_e[fe];Se===void 0&&(Se={type:void 0,texture:void 0},_e[fe]=Se),(Se.type!==D||Se.texture!==oe)&&(ue!==fe&&(n.activeTexture(fe),ue=fe),n.bindTexture(D,oe||Y[D]),Se.type=D,Se.texture=oe)}function T(){const D=_e[ue];D!==void 0&&D.type!==void 0&&(n.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function v(){try{n.compressedTexImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function F(){try{n.compressedTexImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function H(){try{n.texSubImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Q(){try{n.texSubImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function W(){try{n.compressedTexSubImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function we(){try{n.compressedTexSubImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ae(){try{n.texStorage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Te(){try{n.texStorage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ae(){try{n.texImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ie(){try{n.texImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ge(D){Ye.equals(D)===!1&&(n.scissor(D.x,D.y,D.z,D.w),Ye.copy(D))}function Ue(D){je.equals(D)===!1&&(n.viewport(D.x,D.y,D.z,D.w),je.copy(D))}function Re(D,oe){let fe=c.get(oe);fe===void 0&&(fe=new WeakMap,c.set(oe,fe));let Se=fe.get(D);Se===void 0&&(Se=n.getUniformBlockIndex(oe,D.name),fe.set(D,Se))}function pe(D,oe){const Se=c.get(oe).get(D);l.get(oe)!==Se&&(n.uniformBlockBinding(oe,Se,D.__bindingPointIndex),l.set(oe,Se))}function ke(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),h={},ue=null,_e={},u={},f=new WeakMap,p=[],m=null,_=!1,g=null,d=null,A=null,E=null,x=null,R=null,b=null,C=new We(0,0,0),I=0,y=!1,S=null,L=null,O=null,k=null,q=null,Ye.set(0,0,n.canvas.width,n.canvas.height),je.set(0,0,n.canvas.width,n.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:te,disable:xe,bindFramebuffer:Ce,drawBuffers:Ee,useProgram:Xe,setBlending:ee,setMaterial:J,setFlipSided:K,setCullFace:Z,setLineWidth:ce,setPolygonOffset:ne,setScissorTest:he,activeTexture:Oe,bindTexture:Fe,unbindTexture:T,compressedTexImage2D:v,compressedTexImage3D:F,texImage2D:Ae,texImage3D:ie,updateUBOMapping:Re,uniformBlockBinding:pe,texStorage2D:ae,texStorage3D:Te,texSubImage2D:H,texSubImage3D:Q,compressedTexSubImage2D:W,compressedTexSubImage3D:we,scissor:ge,viewport:Ue,reset:ke}}function Vm(n,e,t,i,r,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new le,h=new WeakMap;let u;const f=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(T,v){return p?new OffscreenCanvas(T,v):Fr("canvas")}function _(T,v,F){let H=1;const Q=Fe(T);if((Q.width>F||Q.height>F)&&(H=F/Math.max(Q.width,Q.height)),H<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const W=Math.floor(H*Q.width),we=Math.floor(H*Q.height);u===void 0&&(u=m(W,we));const ae=v?m(W,we):u;return ae.width=W,ae.height=we,ae.getContext("2d").drawImage(T,0,0,W,we),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+W+"x"+we+")."),ae}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),T;return T}function g(T){return T.generateMipmaps}function d(T){n.generateMipmap(T)}function A(T){return T.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?n.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function E(T,v,F,H,Q=!1){if(T!==null){if(n[T]!==void 0)return n[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let W=v;if(v===n.RED&&(F===n.FLOAT&&(W=n.R32F),F===n.HALF_FLOAT&&(W=n.R16F),F===n.UNSIGNED_BYTE&&(W=n.R8)),v===n.RED_INTEGER&&(F===n.UNSIGNED_BYTE&&(W=n.R8UI),F===n.UNSIGNED_SHORT&&(W=n.R16UI),F===n.UNSIGNED_INT&&(W=n.R32UI),F===n.BYTE&&(W=n.R8I),F===n.SHORT&&(W=n.R16I),F===n.INT&&(W=n.R32I)),v===n.RG&&(F===n.FLOAT&&(W=n.RG32F),F===n.HALF_FLOAT&&(W=n.RG16F),F===n.UNSIGNED_BYTE&&(W=n.RG8)),v===n.RG_INTEGER&&(F===n.UNSIGNED_BYTE&&(W=n.RG8UI),F===n.UNSIGNED_SHORT&&(W=n.RG16UI),F===n.UNSIGNED_INT&&(W=n.RG32UI),F===n.BYTE&&(W=n.RG8I),F===n.SHORT&&(W=n.RG16I),F===n.INT&&(W=n.RG32I)),v===n.RGB_INTEGER&&(F===n.UNSIGNED_BYTE&&(W=n.RGB8UI),F===n.UNSIGNED_SHORT&&(W=n.RGB16UI),F===n.UNSIGNED_INT&&(W=n.RGB32UI),F===n.BYTE&&(W=n.RGB8I),F===n.SHORT&&(W=n.RGB16I),F===n.INT&&(W=n.RGB32I)),v===n.RGBA_INTEGER&&(F===n.UNSIGNED_BYTE&&(W=n.RGBA8UI),F===n.UNSIGNED_SHORT&&(W=n.RGBA16UI),F===n.UNSIGNED_INT&&(W=n.RGBA32UI),F===n.BYTE&&(W=n.RGBA8I),F===n.SHORT&&(W=n.RGBA16I),F===n.INT&&(W=n.RGBA32I)),v===n.RGB&&(F===n.UNSIGNED_INT_5_9_9_9_REV&&(W=n.RGB9_E5),F===n.UNSIGNED_INT_10F_11F_11F_REV&&(W=n.R11F_G11F_B10F)),v===n.RGBA){const we=Q?Ir:Je.getTransfer(H);F===n.FLOAT&&(W=n.RGBA32F),F===n.HALF_FLOAT&&(W=n.RGBA16F),F===n.UNSIGNED_BYTE&&(W=we===et?n.SRGB8_ALPHA8:n.RGBA8),F===n.UNSIGNED_SHORT_4_4_4_4&&(W=n.RGBA4),F===n.UNSIGNED_SHORT_5_5_5_1&&(W=n.RGB5_A1)}return(W===n.R16F||W===n.R32F||W===n.RG16F||W===n.RG32F||W===n.RGBA16F||W===n.RGBA32F)&&e.get("EXT_color_buffer_float"),W}function x(T,v){let F;return T?v===null||v===Gn||v===Bi?F=n.DEPTH24_STENCIL8:v===un?F=n.DEPTH32F_STENCIL8:v===Oi&&(F=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===Gn||v===Bi?F=n.DEPTH_COMPONENT24:v===un?F=n.DEPTH_COMPONENT32F:v===Oi&&(F=n.DEPTH_COMPONENT16),F}function R(T,v){return g(T)===!0||T.isFramebufferTexture&&T.minFilter!==qt&&T.minFilter!==Jt?Math.log2(Math.max(v.width,v.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?v.mipmaps.length:1}function b(T){const v=T.target;v.removeEventListener("dispose",b),I(v),v.isVideoTexture&&h.delete(v)}function C(T){const v=T.target;v.removeEventListener("dispose",C),S(v)}function I(T){const v=i.get(T);if(v.__webglInit===void 0)return;const F=T.source,H=f.get(F);if(H){const Q=H[v.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&y(T),Object.keys(H).length===0&&f.delete(F)}i.remove(T)}function y(T){const v=i.get(T);n.deleteTexture(v.__webglTexture);const F=T.source,H=f.get(F);delete H[v.__cacheKey],o.memory.textures--}function S(T){const v=i.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),i.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let H=0;H<6;H++){if(Array.isArray(v.__webglFramebuffer[H]))for(let Q=0;Q<v.__webglFramebuffer[H].length;Q++)n.deleteFramebuffer(v.__webglFramebuffer[H][Q]);else n.deleteFramebuffer(v.__webglFramebuffer[H]);v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer[H])}else{if(Array.isArray(v.__webglFramebuffer))for(let H=0;H<v.__webglFramebuffer.length;H++)n.deleteFramebuffer(v.__webglFramebuffer[H]);else n.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&n.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let H=0;H<v.__webglColorRenderbuffer.length;H++)v.__webglColorRenderbuffer[H]&&n.deleteRenderbuffer(v.__webglColorRenderbuffer[H]);v.__webglDepthRenderbuffer&&n.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const F=T.textures;for(let H=0,Q=F.length;H<Q;H++){const W=i.get(F[H]);W.__webglTexture&&(n.deleteTexture(W.__webglTexture),o.memory.textures--),i.remove(F[H])}i.remove(T)}let L=0;function O(){L=0}function k(){const T=L;return T>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+r.maxTextures),L+=1,T}function q(T){const v=[];return v.push(T.wrapS),v.push(T.wrapT),v.push(T.wrapR||0),v.push(T.magFilter),v.push(T.minFilter),v.push(T.anisotropy),v.push(T.internalFormat),v.push(T.format),v.push(T.type),v.push(T.generateMipmaps),v.push(T.premultiplyAlpha),v.push(T.flipY),v.push(T.unpackAlignment),v.push(T.colorSpace),v.join()}function V(T,v){const F=i.get(T);if(T.isVideoTexture&&he(T),T.isRenderTargetTexture===!1&&T.isExternalTexture!==!0&&T.version>0&&F.__version!==T.version){const H=T.image;if(H===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(H.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Y(F,T,v);return}}else T.isExternalTexture&&(F.__webglTexture=T.sourceTexture?T.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,F.__webglTexture,n.TEXTURE0+v)}function X(T,v){const F=i.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&F.__version!==T.version){Y(F,T,v);return}t.bindTexture(n.TEXTURE_2D_ARRAY,F.__webglTexture,n.TEXTURE0+v)}function j(T,v){const F=i.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&F.__version!==T.version){Y(F,T,v);return}t.bindTexture(n.TEXTURE_3D,F.__webglTexture,n.TEXTURE0+v)}function G(T,v){const F=i.get(T);if(T.version>0&&F.__version!==T.version){te(F,T,v);return}t.bindTexture(n.TEXTURE_CUBE_MAP,F.__webglTexture,n.TEXTURE0+v)}const ue={[Dr]:n.REPEAT,[Hn]:n.CLAMP_TO_EDGE,[Xs]:n.MIRRORED_REPEAT},_e={[qt]:n.NEAREST,[Bc]:n.NEAREST_MIPMAP_NEAREST,[Qi]:n.NEAREST_MIPMAP_LINEAR,[Jt]:n.LINEAR,[Kr]:n.LINEAR_MIPMAP_NEAREST,[Vn]:n.LINEAR_MIPMAP_LINEAR},Me={[Vc]:n.NEVER,[Zc]:n.ALWAYS,[Gc]:n.LESS,[Tl]:n.LEQUAL,[Wc]:n.EQUAL,[Yc]:n.GEQUAL,[Xc]:n.GREATER,[qc]:n.NOTEQUAL};function ze(T,v){if(v.type===un&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===Jt||v.magFilter===Kr||v.magFilter===Qi||v.magFilter===Vn||v.minFilter===Jt||v.minFilter===Kr||v.minFilter===Qi||v.minFilter===Vn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(T,n.TEXTURE_WRAP_S,ue[v.wrapS]),n.texParameteri(T,n.TEXTURE_WRAP_T,ue[v.wrapT]),(T===n.TEXTURE_3D||T===n.TEXTURE_2D_ARRAY)&&n.texParameteri(T,n.TEXTURE_WRAP_R,ue[v.wrapR]),n.texParameteri(T,n.TEXTURE_MAG_FILTER,_e[v.magFilter]),n.texParameteri(T,n.TEXTURE_MIN_FILTER,_e[v.minFilter]),v.compareFunction&&(n.texParameteri(T,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(T,n.TEXTURE_COMPARE_FUNC,Me[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===qt||v.minFilter!==Qi&&v.minFilter!==Vn||v.type===un&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||i.get(v).__currentAnisotropy){const F=e.get("EXT_texture_filter_anisotropic");n.texParameterf(T,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,r.getMaxAnisotropy())),i.get(v).__currentAnisotropy=v.anisotropy}}}function Ye(T,v){let F=!1;T.__webglInit===void 0&&(T.__webglInit=!0,v.addEventListener("dispose",b));const H=v.source;let Q=f.get(H);Q===void 0&&(Q={},f.set(H,Q));const W=q(v);if(W!==T.__cacheKey){Q[W]===void 0&&(Q[W]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,F=!0),Q[W].usedTimes++;const we=Q[T.__cacheKey];we!==void 0&&(Q[T.__cacheKey].usedTimes--,we.usedTimes===0&&y(v)),T.__cacheKey=W,T.__webglTexture=Q[W].texture}return F}function je(T,v,F){return Math.floor(Math.floor(T/F)/v)}function Ze(T,v,F,H){const W=T.updateRanges;if(W.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,v.width,v.height,F,H,v.data);else{W.sort((ie,ge)=>ie.start-ge.start);let we=0;for(let ie=1;ie<W.length;ie++){const ge=W[we],Ue=W[ie],Re=ge.start+ge.count,pe=je(Ue.start,v.width,4),ke=je(ge.start,v.width,4);Ue.start<=Re+1&&pe===ke&&je(Ue.start+Ue.count-1,v.width,4)===pe?ge.count=Math.max(ge.count,Ue.start+Ue.count-ge.start):(++we,W[we]=Ue)}W.length=we+1;const ae=n.getParameter(n.UNPACK_ROW_LENGTH),Te=n.getParameter(n.UNPACK_SKIP_PIXELS),Ae=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,v.width);for(let ie=0,ge=W.length;ie<ge;ie++){const Ue=W[ie],Re=Math.floor(Ue.start/4),pe=Math.ceil(Ue.count/4),ke=Re%v.width,D=Math.floor(Re/v.width),oe=pe,fe=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,ke),n.pixelStorei(n.UNPACK_SKIP_ROWS,D),t.texSubImage2D(n.TEXTURE_2D,0,ke,D,oe,fe,F,H,v.data)}T.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,ae),n.pixelStorei(n.UNPACK_SKIP_PIXELS,Te),n.pixelStorei(n.UNPACK_SKIP_ROWS,Ae)}}function Y(T,v,F){let H=n.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(H=n.TEXTURE_2D_ARRAY),v.isData3DTexture&&(H=n.TEXTURE_3D);const Q=Ye(T,v),W=v.source;t.bindTexture(H,T.__webglTexture,n.TEXTURE0+F);const we=i.get(W);if(W.version!==we.__version||Q===!0){t.activeTexture(n.TEXTURE0+F);const ae=Je.getPrimaries(Je.workingColorSpace),Te=v.colorSpace===Sn?null:Je.getPrimaries(v.colorSpace),Ae=v.colorSpace===Sn||ae===Te?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ae);let ie=_(v.image,!1,r.maxTextureSize);ie=Oe(v,ie);const ge=s.convert(v.format,v.colorSpace),Ue=s.convert(v.type);let Re=E(v.internalFormat,ge,Ue,v.colorSpace,v.isVideoTexture);ze(H,v);let pe;const ke=v.mipmaps,D=v.isVideoTexture!==!0,oe=we.__version===void 0||Q===!0,fe=W.dataReady,Se=R(v,ie);if(v.isDepthTexture)Re=x(v.format===ki,v.type),oe&&(D?t.texStorage2D(n.TEXTURE_2D,1,Re,ie.width,ie.height):t.texImage2D(n.TEXTURE_2D,0,Re,ie.width,ie.height,0,ge,Ue,null));else if(v.isDataTexture)if(ke.length>0){D&&oe&&t.texStorage2D(n.TEXTURE_2D,Se,Re,ke[0].width,ke[0].height);for(let re=0,$=ke.length;re<$;re++)pe=ke[re],D?fe&&t.texSubImage2D(n.TEXTURE_2D,re,0,0,pe.width,pe.height,ge,Ue,pe.data):t.texImage2D(n.TEXTURE_2D,re,Re,pe.width,pe.height,0,ge,Ue,pe.data);v.generateMipmaps=!1}else D?(oe&&t.texStorage2D(n.TEXTURE_2D,Se,Re,ie.width,ie.height),fe&&Ze(v,ie,ge,Ue)):t.texImage2D(n.TEXTURE_2D,0,Re,ie.width,ie.height,0,ge,Ue,ie.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){D&&oe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Se,Re,ke[0].width,ke[0].height,ie.depth);for(let re=0,$=ke.length;re<$;re++)if(pe=ke[re],v.format!==Xt)if(ge!==null)if(D){if(fe)if(v.layerUpdates.size>0){const be=Ra(pe.width,pe.height,v.format,v.type);for(const Be of v.layerUpdates){const st=pe.data.subarray(Be*be/pe.data.BYTES_PER_ELEMENT,(Be+1)*be/pe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,re,0,0,Be,pe.width,pe.height,1,ge,st)}v.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,re,0,0,0,pe.width,pe.height,ie.depth,ge,pe.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,re,Re,pe.width,pe.height,ie.depth,0,pe.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else D?fe&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,re,0,0,0,pe.width,pe.height,ie.depth,ge,Ue,pe.data):t.texImage3D(n.TEXTURE_2D_ARRAY,re,Re,pe.width,pe.height,ie.depth,0,ge,Ue,pe.data)}else{D&&oe&&t.texStorage2D(n.TEXTURE_2D,Se,Re,ke[0].width,ke[0].height);for(let re=0,$=ke.length;re<$;re++)pe=ke[re],v.format!==Xt?ge!==null?D?fe&&t.compressedTexSubImage2D(n.TEXTURE_2D,re,0,0,pe.width,pe.height,ge,pe.data):t.compressedTexImage2D(n.TEXTURE_2D,re,Re,pe.width,pe.height,0,pe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):D?fe&&t.texSubImage2D(n.TEXTURE_2D,re,0,0,pe.width,pe.height,ge,Ue,pe.data):t.texImage2D(n.TEXTURE_2D,re,Re,pe.width,pe.height,0,ge,Ue,pe.data)}else if(v.isDataArrayTexture)if(D){if(oe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Se,Re,ie.width,ie.height,ie.depth),fe)if(v.layerUpdates.size>0){const re=Ra(ie.width,ie.height,v.format,v.type);for(const $ of v.layerUpdates){const be=ie.data.subarray($*re/ie.data.BYTES_PER_ELEMENT,($+1)*re/ie.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,$,ie.width,ie.height,1,ge,Ue,be)}v.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ie.width,ie.height,ie.depth,ge,Ue,ie.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Re,ie.width,ie.height,ie.depth,0,ge,Ue,ie.data);else if(v.isData3DTexture)D?(oe&&t.texStorage3D(n.TEXTURE_3D,Se,Re,ie.width,ie.height,ie.depth),fe&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ie.width,ie.height,ie.depth,ge,Ue,ie.data)):t.texImage3D(n.TEXTURE_3D,0,Re,ie.width,ie.height,ie.depth,0,ge,Ue,ie.data);else if(v.isFramebufferTexture){if(oe)if(D)t.texStorage2D(n.TEXTURE_2D,Se,Re,ie.width,ie.height);else{let re=ie.width,$=ie.height;for(let be=0;be<Se;be++)t.texImage2D(n.TEXTURE_2D,be,Re,re,$,0,ge,Ue,null),re>>=1,$>>=1}}else if(ke.length>0){if(D&&oe){const re=Fe(ke[0]);t.texStorage2D(n.TEXTURE_2D,Se,Re,re.width,re.height)}for(let re=0,$=ke.length;re<$;re++)pe=ke[re],D?fe&&t.texSubImage2D(n.TEXTURE_2D,re,0,0,ge,Ue,pe):t.texImage2D(n.TEXTURE_2D,re,Re,ge,Ue,pe);v.generateMipmaps=!1}else if(D){if(oe){const re=Fe(ie);t.texStorage2D(n.TEXTURE_2D,Se,Re,re.width,re.height)}fe&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,ge,Ue,ie)}else t.texImage2D(n.TEXTURE_2D,0,Re,ge,Ue,ie);g(v)&&d(H),we.__version=W.version,v.onUpdate&&v.onUpdate(v)}T.__version=v.version}function te(T,v,F){if(v.image.length!==6)return;const H=Ye(T,v),Q=v.source;t.bindTexture(n.TEXTURE_CUBE_MAP,T.__webglTexture,n.TEXTURE0+F);const W=i.get(Q);if(Q.version!==W.__version||H===!0){t.activeTexture(n.TEXTURE0+F);const we=Je.getPrimaries(Je.workingColorSpace),ae=v.colorSpace===Sn?null:Je.getPrimaries(v.colorSpace),Te=v.colorSpace===Sn||we===ae?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Te);const Ae=v.isCompressedTexture||v.image[0].isCompressedTexture,ie=v.image[0]&&v.image[0].isDataTexture,ge=[];for(let $=0;$<6;$++)!Ae&&!ie?ge[$]=_(v.image[$],!0,r.maxCubemapSize):ge[$]=ie?v.image[$].image:v.image[$],ge[$]=Oe(v,ge[$]);const Ue=ge[0],Re=s.convert(v.format,v.colorSpace),pe=s.convert(v.type),ke=E(v.internalFormat,Re,pe,v.colorSpace),D=v.isVideoTexture!==!0,oe=W.__version===void 0||H===!0,fe=Q.dataReady;let Se=R(v,Ue);ze(n.TEXTURE_CUBE_MAP,v);let re;if(Ae){D&&oe&&t.texStorage2D(n.TEXTURE_CUBE_MAP,Se,ke,Ue.width,Ue.height);for(let $=0;$<6;$++){re=ge[$].mipmaps;for(let be=0;be<re.length;be++){const Be=re[be];v.format!==Xt?Re!==null?D?fe&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,be,0,0,Be.width,Be.height,Re,Be.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,be,ke,Be.width,Be.height,0,Be.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):D?fe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,be,0,0,Be.width,Be.height,Re,pe,Be.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,be,ke,Be.width,Be.height,0,Re,pe,Be.data)}}}else{if(re=v.mipmaps,D&&oe){re.length>0&&Se++;const $=Fe(ge[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,Se,ke,$.width,$.height)}for(let $=0;$<6;$++)if(ie){D?fe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,ge[$].width,ge[$].height,Re,pe,ge[$].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,ke,ge[$].width,ge[$].height,0,Re,pe,ge[$].data);for(let be=0;be<re.length;be++){const st=re[be].image[$].image;D?fe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,be+1,0,0,st.width,st.height,Re,pe,st.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,be+1,ke,st.width,st.height,0,Re,pe,st.data)}}else{D?fe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,Re,pe,ge[$]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,ke,Re,pe,ge[$]);for(let be=0;be<re.length;be++){const Be=re[be];D?fe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,be+1,0,0,Re,pe,Be.image[$]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,be+1,ke,Re,pe,Be.image[$])}}}g(v)&&d(n.TEXTURE_CUBE_MAP),W.__version=Q.version,v.onUpdate&&v.onUpdate(v)}T.__version=v.version}function xe(T,v,F,H,Q,W){const we=s.convert(F.format,F.colorSpace),ae=s.convert(F.type),Te=E(F.internalFormat,we,ae,F.colorSpace),Ae=i.get(v),ie=i.get(F);if(ie.__renderTarget=v,!Ae.__hasExternalTextures){const ge=Math.max(1,v.width>>W),Ue=Math.max(1,v.height>>W);Q===n.TEXTURE_3D||Q===n.TEXTURE_2D_ARRAY?t.texImage3D(Q,W,Te,ge,Ue,v.depth,0,we,ae,null):t.texImage2D(Q,W,Te,ge,Ue,0,we,ae,null)}t.bindFramebuffer(n.FRAMEBUFFER,T),ne(v)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,H,Q,ie.__webglTexture,0,ce(v)):(Q===n.TEXTURE_2D||Q>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,H,Q,ie.__webglTexture,W),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Ce(T,v,F){if(n.bindRenderbuffer(n.RENDERBUFFER,T),v.depthBuffer){const H=v.depthTexture,Q=H&&H.isDepthTexture?H.type:null,W=x(v.stencilBuffer,Q),we=v.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ae=ce(v);ne(v)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ae,W,v.width,v.height):F?n.renderbufferStorageMultisample(n.RENDERBUFFER,ae,W,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,W,v.width,v.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,we,n.RENDERBUFFER,T)}else{const H=v.textures;for(let Q=0;Q<H.length;Q++){const W=H[Q],we=s.convert(W.format,W.colorSpace),ae=s.convert(W.type),Te=E(W.internalFormat,we,ae,W.colorSpace),Ae=ce(v);F&&ne(v)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Ae,Te,v.width,v.height):ne(v)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Ae,Te,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,Te,v.width,v.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Ee(T,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,T),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const H=i.get(v.depthTexture);H.__renderTarget=v,(!H.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),V(v.depthTexture,0);const Q=H.__webglTexture,W=ce(v);if(v.depthTexture.format===zi)ne(v)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,Q,0,W):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,Q,0);else if(v.depthTexture.format===ki)ne(v)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,Q,0,W):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,Q,0);else throw new Error("Unknown depthTexture format")}function Xe(T){const v=i.get(T),F=T.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==T.depthTexture){const H=T.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),H){const Q=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,H.removeEventListener("dispose",Q)};H.addEventListener("dispose",Q),v.__depthDisposeCallback=Q}v.__boundDepthTexture=H}if(T.depthTexture&&!v.__autoAllocateDepthBuffer){if(F)throw new Error("target.depthTexture not supported in Cube render targets");const H=T.texture.mipmaps;H&&H.length>0?Ee(v.__webglFramebuffer[0],T):Ee(v.__webglFramebuffer,T)}else if(F){v.__webglDepthbuffer=[];for(let H=0;H<6;H++)if(t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[H]),v.__webglDepthbuffer[H]===void 0)v.__webglDepthbuffer[H]=n.createRenderbuffer(),Ce(v.__webglDepthbuffer[H],T,!1);else{const Q=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,W=v.__webglDepthbuffer[H];n.bindRenderbuffer(n.RENDERBUFFER,W),n.framebufferRenderbuffer(n.FRAMEBUFFER,Q,n.RENDERBUFFER,W)}}else{const H=T.texture.mipmaps;if(H&&H.length>0?t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=n.createRenderbuffer(),Ce(v.__webglDepthbuffer,T,!1);else{const Q=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,W=v.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,W),n.framebufferRenderbuffer(n.FRAMEBUFFER,Q,n.RENDERBUFFER,W)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function rt(T,v,F){const H=i.get(T);v!==void 0&&xe(H.__webglFramebuffer,T,T.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),F!==void 0&&Xe(T)}function w(T){const v=T.texture,F=i.get(T),H=i.get(v);T.addEventListener("dispose",C);const Q=T.textures,W=T.isWebGLCubeRenderTarget===!0,we=Q.length>1;if(we||(H.__webglTexture===void 0&&(H.__webglTexture=n.createTexture()),H.__version=v.version,o.memory.textures++),W){F.__webglFramebuffer=[];for(let ae=0;ae<6;ae++)if(v.mipmaps&&v.mipmaps.length>0){F.__webglFramebuffer[ae]=[];for(let Te=0;Te<v.mipmaps.length;Te++)F.__webglFramebuffer[ae][Te]=n.createFramebuffer()}else F.__webglFramebuffer[ae]=n.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){F.__webglFramebuffer=[];for(let ae=0;ae<v.mipmaps.length;ae++)F.__webglFramebuffer[ae]=n.createFramebuffer()}else F.__webglFramebuffer=n.createFramebuffer();if(we)for(let ae=0,Te=Q.length;ae<Te;ae++){const Ae=i.get(Q[ae]);Ae.__webglTexture===void 0&&(Ae.__webglTexture=n.createTexture(),o.memory.textures++)}if(T.samples>0&&ne(T)===!1){F.__webglMultisampledFramebuffer=n.createFramebuffer(),F.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let ae=0;ae<Q.length;ae++){const Te=Q[ae];F.__webglColorRenderbuffer[ae]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,F.__webglColorRenderbuffer[ae]);const Ae=s.convert(Te.format,Te.colorSpace),ie=s.convert(Te.type),ge=E(Te.internalFormat,Ae,ie,Te.colorSpace,T.isXRRenderTarget===!0),Ue=ce(T);n.renderbufferStorageMultisample(n.RENDERBUFFER,Ue,ge,T.width,T.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ae,n.RENDERBUFFER,F.__webglColorRenderbuffer[ae])}n.bindRenderbuffer(n.RENDERBUFFER,null),T.depthBuffer&&(F.__webglDepthRenderbuffer=n.createRenderbuffer(),Ce(F.__webglDepthRenderbuffer,T,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(W){t.bindTexture(n.TEXTURE_CUBE_MAP,H.__webglTexture),ze(n.TEXTURE_CUBE_MAP,v);for(let ae=0;ae<6;ae++)if(v.mipmaps&&v.mipmaps.length>0)for(let Te=0;Te<v.mipmaps.length;Te++)xe(F.__webglFramebuffer[ae][Te],T,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Te);else xe(F.__webglFramebuffer[ae],T,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0);g(v)&&d(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(we){for(let ae=0,Te=Q.length;ae<Te;ae++){const Ae=Q[ae],ie=i.get(Ae);let ge=n.TEXTURE_2D;(T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(ge=T.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ge,ie.__webglTexture),ze(ge,Ae),xe(F.__webglFramebuffer,T,Ae,n.COLOR_ATTACHMENT0+ae,ge,0),g(Ae)&&d(ge)}t.unbindTexture()}else{let ae=n.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(ae=T.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ae,H.__webglTexture),ze(ae,v),v.mipmaps&&v.mipmaps.length>0)for(let Te=0;Te<v.mipmaps.length;Te++)xe(F.__webglFramebuffer[Te],T,v,n.COLOR_ATTACHMENT0,ae,Te);else xe(F.__webglFramebuffer,T,v,n.COLOR_ATTACHMENT0,ae,0);g(v)&&d(ae),t.unbindTexture()}T.depthBuffer&&Xe(T)}function ee(T){const v=T.textures;for(let F=0,H=v.length;F<H;F++){const Q=v[F];if(g(Q)){const W=A(T),we=i.get(Q).__webglTexture;t.bindTexture(W,we),d(W),t.unbindTexture()}}}const J=[],K=[];function Z(T){if(T.samples>0){if(ne(T)===!1){const v=T.textures,F=T.width,H=T.height;let Q=n.COLOR_BUFFER_BIT;const W=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,we=i.get(T),ae=v.length>1;if(ae)for(let Ae=0;Ae<v.length;Ae++)t.bindFramebuffer(n.FRAMEBUFFER,we.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ae,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,we.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ae,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,we.__webglMultisampledFramebuffer);const Te=T.texture.mipmaps;Te&&Te.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,we.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,we.__webglFramebuffer);for(let Ae=0;Ae<v.length;Ae++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(Q|=n.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(Q|=n.STENCIL_BUFFER_BIT)),ae){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,we.__webglColorRenderbuffer[Ae]);const ie=i.get(v[Ae]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,ie,0)}n.blitFramebuffer(0,0,F,H,0,0,F,H,Q,n.NEAREST),l===!0&&(J.length=0,K.length=0,J.push(n.COLOR_ATTACHMENT0+Ae),T.depthBuffer&&T.resolveDepthBuffer===!1&&(J.push(W),K.push(W),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,K)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,J))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ae)for(let Ae=0;Ae<v.length;Ae++){t.bindFramebuffer(n.FRAMEBUFFER,we.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ae,n.RENDERBUFFER,we.__webglColorRenderbuffer[Ae]);const ie=i.get(v[Ae]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,we.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ae,n.TEXTURE_2D,ie,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,we.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&l){const v=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[v])}}}function ce(T){return Math.min(r.maxSamples,T.samples)}function ne(T){const v=i.get(T);return T.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function he(T){const v=o.render.frame;h.get(T)!==v&&(h.set(T,v),T.update())}function Oe(T,v){const F=T.colorSpace,H=T.format,Q=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||F!==_i&&F!==Sn&&(Je.getTransfer(F)===et?(H!==Xt||Q!==Qt)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",F)),v}function Fe(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(c.width=T.naturalWidth||T.width,c.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(c.width=T.displayWidth,c.height=T.displayHeight):(c.width=T.width,c.height=T.height),c}this.allocateTextureUnit=k,this.resetTextureUnits=O,this.setTexture2D=V,this.setTexture2DArray=X,this.setTexture3D=j,this.setTextureCube=G,this.rebindTextures=rt,this.setupRenderTarget=w,this.updateRenderTargetMipmap=ee,this.updateMultisampleRenderTarget=Z,this.setupDepthRenderbuffer=Xe,this.setupFrameBufferTexture=xe,this.useMultisampledRTT=ne}function Gm(n,e){function t(i,r=Sn){let s;const o=Je.getTransfer(r);if(i===Qt)return n.UNSIGNED_BYTE;if(i===wo)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Ro)return n.UNSIGNED_SHORT_5_5_5_1;if(i===_l)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===vl)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===ml)return n.BYTE;if(i===gl)return n.SHORT;if(i===Oi)return n.UNSIGNED_SHORT;if(i===bo)return n.INT;if(i===Gn)return n.UNSIGNED_INT;if(i===un)return n.FLOAT;if(i===qi)return n.HALF_FLOAT;if(i===xl)return n.ALPHA;if(i===Ml)return n.RGB;if(i===Xt)return n.RGBA;if(i===zi)return n.DEPTH_COMPONENT;if(i===ki)return n.DEPTH_STENCIL;if(i===Sl)return n.RED;if(i===Co)return n.RED_INTEGER;if(i===yl)return n.RG;if(i===Po)return n.RG_INTEGER;if(i===Lo)return n.RGBA_INTEGER;if(i===Ar||i===br||i===wr||i===Rr)if(o===et)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Ar)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===br)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===wr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Rr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Ar)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===br)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===wr)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Rr)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===qs||i===Ys||i===Zs||i===Ks)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===qs)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Ys)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Zs)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Ks)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Js||i===$s||i===js)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Js||i===$s)return o===et?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===js)return o===et?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Qs||i===eo||i===to||i===no||i===io||i===ro||i===so||i===oo||i===ao||i===lo||i===co||i===ho||i===uo||i===fo)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Qs)return o===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===eo)return o===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===to)return o===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===no)return o===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===io)return o===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===ro)return o===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===so)return o===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===oo)return o===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===ao)return o===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===lo)return o===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===co)return o===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===ho)return o===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===uo)return o===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===fo)return o===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===po||i===mo||i===go)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===po)return o===et?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===mo)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===go)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===_o||i===vo||i===xo||i===Mo)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===_o)return s.COMPRESSED_RED_RGTC1_EXT;if(i===vo)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===xo)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Mo)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Bi?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const Wm=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Xm=`
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

}`;class qm{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new Fl(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new bn({vertexShader:Wm,fragmentShader:Xm,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new jt(new Ji(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Ym extends Mi{constructor(e,t){super();const i=this;let r=null,s=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,f=null,p=null,m=null;const _=typeof XRWebGLBinding<"u",g=new qm,d={},A=t.getContextAttributes();let E=null,x=null;const R=[],b=[],C=new le;let I=null;const y=new Rt;y.viewport=new tt;const S=new Rt;S.viewport=new tt;const L=[y,S],O=new du;let k=null,q=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let te=R[Y];return te===void 0&&(te=new vs,R[Y]=te),te.getTargetRaySpace()},this.getControllerGrip=function(Y){let te=R[Y];return te===void 0&&(te=new vs,R[Y]=te),te.getGripSpace()},this.getHand=function(Y){let te=R[Y];return te===void 0&&(te=new vs,R[Y]=te),te.getHandSpace()};function V(Y){const te=b.indexOf(Y.inputSource);if(te===-1)return;const xe=R[te];xe!==void 0&&(xe.update(Y.inputSource,Y.frame,c||o),xe.dispatchEvent({type:Y.type,data:Y.inputSource}))}function X(){r.removeEventListener("select",V),r.removeEventListener("selectstart",V),r.removeEventListener("selectend",V),r.removeEventListener("squeeze",V),r.removeEventListener("squeezestart",V),r.removeEventListener("squeezeend",V),r.removeEventListener("end",X),r.removeEventListener("inputsourceschange",j);for(let Y=0;Y<R.length;Y++){const te=b[Y];te!==null&&(b[Y]=null,R[Y].disconnect(te))}k=null,q=null,g.reset();for(const Y in d)delete d[Y];e.setRenderTarget(E),p=null,f=null,u=null,r=null,x=null,Ze.stop(),i.isPresenting=!1,e.setPixelRatio(I),e.setSize(C.width,C.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){s=Y,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){a=Y,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(Y){c=Y},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return u===null&&_&&(u=new XRWebGLBinding(r,t)),u},this.getFrame=function(){return m},this.getSession=function(){return r},this.setSession=async function(Y){if(r=Y,r!==null){if(E=e.getRenderTarget(),r.addEventListener("select",V),r.addEventListener("selectstart",V),r.addEventListener("selectend",V),r.addEventListener("squeeze",V),r.addEventListener("squeezestart",V),r.addEventListener("squeezeend",V),r.addEventListener("end",X),r.addEventListener("inputsourceschange",j),A.xrCompatible!==!0&&await t.makeXRCompatible(),I=e.getPixelRatio(),e.getSize(C),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let xe=null,Ce=null,Ee=null;A.depth&&(Ee=A.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,xe=A.stencil?ki:zi,Ce=A.stencil?Bi:Gn);const Xe={colorFormat:t.RGBA8,depthFormat:Ee,scaleFactor:s};u=this.getBinding(),f=u.createProjectionLayer(Xe),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),x=new Wn(f.textureWidth,f.textureHeight,{format:Xt,type:Qt,depthTexture:new Nl(f.textureWidth,f.textureHeight,Ce,void 0,void 0,void 0,void 0,void 0,void 0,xe),stencilBuffer:A.stencil,colorSpace:e.outputColorSpace,samples:A.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const xe={antialias:A.antialias,alpha:!0,depth:A.depth,stencil:A.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,t,xe),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),x=new Wn(p.framebufferWidth,p.framebufferHeight,{format:Xt,type:Qt,colorSpace:e.outputColorSpace,stencilBuffer:A.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),Ze.setContext(r),Ze.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function j(Y){for(let te=0;te<Y.removed.length;te++){const xe=Y.removed[te],Ce=b.indexOf(xe);Ce>=0&&(b[Ce]=null,R[Ce].disconnect(xe))}for(let te=0;te<Y.added.length;te++){const xe=Y.added[te];let Ce=b.indexOf(xe);if(Ce===-1){for(let Xe=0;Xe<R.length;Xe++)if(Xe>=b.length){b.push(xe),Ce=Xe;break}else if(b[Xe]===null){b[Xe]=xe,Ce=Xe;break}if(Ce===-1)break}const Ee=R[Ce];Ee&&Ee.connect(xe)}}const G=new P,ue=new P;function _e(Y,te,xe){G.setFromMatrixPosition(te.matrixWorld),ue.setFromMatrixPosition(xe.matrixWorld);const Ce=G.distanceTo(ue),Ee=te.projectionMatrix.elements,Xe=xe.projectionMatrix.elements,rt=Ee[14]/(Ee[10]-1),w=Ee[14]/(Ee[10]+1),ee=(Ee[9]+1)/Ee[5],J=(Ee[9]-1)/Ee[5],K=(Ee[8]-1)/Ee[0],Z=(Xe[8]+1)/Xe[0],ce=rt*K,ne=rt*Z,he=Ce/(-K+Z),Oe=he*-K;if(te.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(Oe),Y.translateZ(he),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),Ee[10]===-1)Y.projectionMatrix.copy(te.projectionMatrix),Y.projectionMatrixInverse.copy(te.projectionMatrixInverse);else{const Fe=rt+he,T=w+he,v=ce-Oe,F=ne+(Ce-Oe),H=ee*w/T*Fe,Q=J*w/T*Fe;Y.projectionMatrix.makePerspective(v,F,H,Q,Fe,T),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function Me(Y,te){te===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(te.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(r===null)return;let te=Y.near,xe=Y.far;g.texture!==null&&(g.depthNear>0&&(te=g.depthNear),g.depthFar>0&&(xe=g.depthFar)),O.near=S.near=y.near=te,O.far=S.far=y.far=xe,(k!==O.near||q!==O.far)&&(r.updateRenderState({depthNear:O.near,depthFar:O.far}),k=O.near,q=O.far),O.layers.mask=Y.layers.mask|6,y.layers.mask=O.layers.mask&3,S.layers.mask=O.layers.mask&5;const Ce=Y.parent,Ee=O.cameras;Me(O,Ce);for(let Xe=0;Xe<Ee.length;Xe++)Me(Ee[Xe],Ce);Ee.length===2?_e(O,y,S):O.projectionMatrix.copy(y.projectionMatrix),ze(Y,O,Ce)};function ze(Y,te,xe){xe===null?Y.matrix.copy(te.matrixWorld):(Y.matrix.copy(xe.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(te.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(te.projectionMatrix),Y.projectionMatrixInverse.copy(te.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=Nr*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(!(f===null&&p===null))return l},this.setFoveation=function(Y){l=Y,f!==null&&(f.fixedFoveation=Y),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=Y)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(O)},this.getCameraTexture=function(Y){return d[Y]};let Ye=null;function je(Y,te){if(h=te.getViewerPose(c||o),m=te,h!==null){const xe=h.views;p!==null&&(e.setRenderTargetFramebuffer(x,p.framebuffer),e.setRenderTarget(x));let Ce=!1;xe.length!==O.cameras.length&&(O.cameras.length=0,Ce=!0);for(let w=0;w<xe.length;w++){const ee=xe[w];let J=null;if(p!==null)J=p.getViewport(ee);else{const Z=u.getViewSubImage(f,ee);J=Z.viewport,w===0&&(e.setRenderTargetTextures(x,Z.colorTexture,Z.depthStencilTexture),e.setRenderTarget(x))}let K=L[w];K===void 0&&(K=new Rt,K.layers.enable(w),K.viewport=new tt,L[w]=K),K.matrix.fromArray(ee.transform.matrix),K.matrix.decompose(K.position,K.quaternion,K.scale),K.projectionMatrix.fromArray(ee.projectionMatrix),K.projectionMatrixInverse.copy(K.projectionMatrix).invert(),K.viewport.set(J.x,J.y,J.width,J.height),w===0&&(O.matrix.copy(K.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),Ce===!0&&O.cameras.push(K)}const Ee=r.enabledFeatures;if(Ee&&Ee.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&_){u=i.getBinding();const w=u.getDepthInformation(xe[0]);w&&w.isValid&&w.texture&&g.init(w,r.renderState)}if(Ee&&Ee.includes("camera-access")&&_){e.state.unbindTexture(),u=i.getBinding();for(let w=0;w<xe.length;w++){const ee=xe[w].camera;if(ee){let J=d[ee];J||(J=new Fl,d[ee]=J);const K=u.getCameraImage(ee);J.sourceTexture=K}}}}for(let xe=0;xe<R.length;xe++){const Ce=b[xe],Ee=R[xe];Ce!==null&&Ee!==void 0&&Ee.update(Ce,te,c||o)}Ye&&Ye(Y,te),te.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:te}),m=null}const Ze=new Zl;Ze.setAnimationLoop(je),this.setAnimationLoop=function(Y){Ye=Y},this.dispose=function(){}}}const Nn=new Yt,Zm=new lt;function Km(n,e){function t(g,d){g.matrixAutoUpdate===!0&&g.updateMatrix(),d.value.copy(g.matrix)}function i(g,d){d.color.getRGB(g.fogColor.value,Ll(n)),d.isFog?(g.fogNear.value=d.near,g.fogFar.value=d.far):d.isFogExp2&&(g.fogDensity.value=d.density)}function r(g,d,A,E,x){d.isMeshBasicMaterial||d.isMeshLambertMaterial?s(g,d):d.isMeshToonMaterial?(s(g,d),u(g,d)):d.isMeshPhongMaterial?(s(g,d),h(g,d)):d.isMeshStandardMaterial?(s(g,d),f(g,d),d.isMeshPhysicalMaterial&&p(g,d,x)):d.isMeshMatcapMaterial?(s(g,d),m(g,d)):d.isMeshDepthMaterial?s(g,d):d.isMeshDistanceMaterial?(s(g,d),_(g,d)):d.isMeshNormalMaterial?s(g,d):d.isLineBasicMaterial?(o(g,d),d.isLineDashedMaterial&&a(g,d)):d.isPointsMaterial?l(g,d,A,E):d.isSpriteMaterial?c(g,d):d.isShadowMaterial?(g.color.value.copy(d.color),g.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function s(g,d){g.opacity.value=d.opacity,d.color&&g.diffuse.value.copy(d.color),d.emissive&&g.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(g.map.value=d.map,t(d.map,g.mapTransform)),d.alphaMap&&(g.alphaMap.value=d.alphaMap,t(d.alphaMap,g.alphaMapTransform)),d.bumpMap&&(g.bumpMap.value=d.bumpMap,t(d.bumpMap,g.bumpMapTransform),g.bumpScale.value=d.bumpScale,d.side===Ct&&(g.bumpScale.value*=-1)),d.normalMap&&(g.normalMap.value=d.normalMap,t(d.normalMap,g.normalMapTransform),g.normalScale.value.copy(d.normalScale),d.side===Ct&&g.normalScale.value.negate()),d.displacementMap&&(g.displacementMap.value=d.displacementMap,t(d.displacementMap,g.displacementMapTransform),g.displacementScale.value=d.displacementScale,g.displacementBias.value=d.displacementBias),d.emissiveMap&&(g.emissiveMap.value=d.emissiveMap,t(d.emissiveMap,g.emissiveMapTransform)),d.specularMap&&(g.specularMap.value=d.specularMap,t(d.specularMap,g.specularMapTransform)),d.alphaTest>0&&(g.alphaTest.value=d.alphaTest);const A=e.get(d),E=A.envMap,x=A.envMapRotation;E&&(g.envMap.value=E,Nn.copy(x),Nn.x*=-1,Nn.y*=-1,Nn.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(Nn.y*=-1,Nn.z*=-1),g.envMapRotation.value.setFromMatrix4(Zm.makeRotationFromEuler(Nn)),g.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=d.reflectivity,g.ior.value=d.ior,g.refractionRatio.value=d.refractionRatio),d.lightMap&&(g.lightMap.value=d.lightMap,g.lightMapIntensity.value=d.lightMapIntensity,t(d.lightMap,g.lightMapTransform)),d.aoMap&&(g.aoMap.value=d.aoMap,g.aoMapIntensity.value=d.aoMapIntensity,t(d.aoMap,g.aoMapTransform))}function o(g,d){g.diffuse.value.copy(d.color),g.opacity.value=d.opacity,d.map&&(g.map.value=d.map,t(d.map,g.mapTransform))}function a(g,d){g.dashSize.value=d.dashSize,g.totalSize.value=d.dashSize+d.gapSize,g.scale.value=d.scale}function l(g,d,A,E){g.diffuse.value.copy(d.color),g.opacity.value=d.opacity,g.size.value=d.size*A,g.scale.value=E*.5,d.map&&(g.map.value=d.map,t(d.map,g.uvTransform)),d.alphaMap&&(g.alphaMap.value=d.alphaMap,t(d.alphaMap,g.alphaMapTransform)),d.alphaTest>0&&(g.alphaTest.value=d.alphaTest)}function c(g,d){g.diffuse.value.copy(d.color),g.opacity.value=d.opacity,g.rotation.value=d.rotation,d.map&&(g.map.value=d.map,t(d.map,g.mapTransform)),d.alphaMap&&(g.alphaMap.value=d.alphaMap,t(d.alphaMap,g.alphaMapTransform)),d.alphaTest>0&&(g.alphaTest.value=d.alphaTest)}function h(g,d){g.specular.value.copy(d.specular),g.shininess.value=Math.max(d.shininess,1e-4)}function u(g,d){d.gradientMap&&(g.gradientMap.value=d.gradientMap)}function f(g,d){g.metalness.value=d.metalness,d.metalnessMap&&(g.metalnessMap.value=d.metalnessMap,t(d.metalnessMap,g.metalnessMapTransform)),g.roughness.value=d.roughness,d.roughnessMap&&(g.roughnessMap.value=d.roughnessMap,t(d.roughnessMap,g.roughnessMapTransform)),d.envMap&&(g.envMapIntensity.value=d.envMapIntensity)}function p(g,d,A){g.ior.value=d.ior,d.sheen>0&&(g.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),g.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(g.sheenColorMap.value=d.sheenColorMap,t(d.sheenColorMap,g.sheenColorMapTransform)),d.sheenRoughnessMap&&(g.sheenRoughnessMap.value=d.sheenRoughnessMap,t(d.sheenRoughnessMap,g.sheenRoughnessMapTransform))),d.clearcoat>0&&(g.clearcoat.value=d.clearcoat,g.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(g.clearcoatMap.value=d.clearcoatMap,t(d.clearcoatMap,g.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,t(d.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(g.clearcoatNormalMap.value=d.clearcoatNormalMap,t(d.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===Ct&&g.clearcoatNormalScale.value.negate())),d.dispersion>0&&(g.dispersion.value=d.dispersion),d.iridescence>0&&(g.iridescence.value=d.iridescence,g.iridescenceIOR.value=d.iridescenceIOR,g.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(g.iridescenceMap.value=d.iridescenceMap,t(d.iridescenceMap,g.iridescenceMapTransform)),d.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=d.iridescenceThicknessMap,t(d.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),d.transmission>0&&(g.transmission.value=d.transmission,g.transmissionSamplerMap.value=A.texture,g.transmissionSamplerSize.value.set(A.width,A.height),d.transmissionMap&&(g.transmissionMap.value=d.transmissionMap,t(d.transmissionMap,g.transmissionMapTransform)),g.thickness.value=d.thickness,d.thicknessMap&&(g.thicknessMap.value=d.thicknessMap,t(d.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=d.attenuationDistance,g.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(g.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(g.anisotropyMap.value=d.anisotropyMap,t(d.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=d.specularIntensity,g.specularColor.value.copy(d.specularColor),d.specularColorMap&&(g.specularColorMap.value=d.specularColorMap,t(d.specularColorMap,g.specularColorMapTransform)),d.specularIntensityMap&&(g.specularIntensityMap.value=d.specularIntensityMap,t(d.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,d){d.matcap&&(g.matcap.value=d.matcap)}function _(g,d){const A=e.get(d).light;g.referencePosition.value.setFromMatrixPosition(A.matrixWorld),g.nearDistance.value=A.shadow.camera.near,g.farDistance.value=A.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function Jm(n,e,t,i){let r={},s={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(A,E){const x=E.program;i.uniformBlockBinding(A,x)}function c(A,E){let x=r[A.id];x===void 0&&(m(A),x=h(A),r[A.id]=x,A.addEventListener("dispose",g));const R=E.program;i.updateUBOMapping(A,R);const b=e.render.frame;s[A.id]!==b&&(f(A),s[A.id]=b)}function h(A){const E=u();A.__bindingPointIndex=E;const x=n.createBuffer(),R=A.__size,b=A.usage;return n.bindBuffer(n.UNIFORM_BUFFER,x),n.bufferData(n.UNIFORM_BUFFER,R,b),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,E,x),x}function u(){for(let A=0;A<a;A++)if(o.indexOf(A)===-1)return o.push(A),A;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(A){const E=r[A.id],x=A.uniforms,R=A.__cache;n.bindBuffer(n.UNIFORM_BUFFER,E);for(let b=0,C=x.length;b<C;b++){const I=Array.isArray(x[b])?x[b]:[x[b]];for(let y=0,S=I.length;y<S;y++){const L=I[y];if(p(L,b,y,R)===!0){const O=L.__offset,k=Array.isArray(L.value)?L.value:[L.value];let q=0;for(let V=0;V<k.length;V++){const X=k[V],j=_(X);typeof X=="number"||typeof X=="boolean"?(L.__data[0]=X,n.bufferSubData(n.UNIFORM_BUFFER,O+q,L.__data)):X.isMatrix3?(L.__data[0]=X.elements[0],L.__data[1]=X.elements[1],L.__data[2]=X.elements[2],L.__data[3]=0,L.__data[4]=X.elements[3],L.__data[5]=X.elements[4],L.__data[6]=X.elements[5],L.__data[7]=0,L.__data[8]=X.elements[6],L.__data[9]=X.elements[7],L.__data[10]=X.elements[8],L.__data[11]=0):(X.toArray(L.__data,q),q+=j.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,O,L.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(A,E,x,R){const b=A.value,C=E+"_"+x;if(R[C]===void 0)return typeof b=="number"||typeof b=="boolean"?R[C]=b:R[C]=b.clone(),!0;{const I=R[C];if(typeof b=="number"||typeof b=="boolean"){if(I!==b)return R[C]=b,!0}else if(I.equals(b)===!1)return I.copy(b),!0}return!1}function m(A){const E=A.uniforms;let x=0;const R=16;for(let C=0,I=E.length;C<I;C++){const y=Array.isArray(E[C])?E[C]:[E[C]];for(let S=0,L=y.length;S<L;S++){const O=y[S],k=Array.isArray(O.value)?O.value:[O.value];for(let q=0,V=k.length;q<V;q++){const X=k[q],j=_(X),G=x%R,ue=G%j.boundary,_e=G+ue;x+=ue,_e!==0&&R-_e<j.storage&&(x+=R-_e),O.__data=new Float32Array(j.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=x,x+=j.storage}}}const b=x%R;return b>0&&(x+=R-b),A.__size=x,A.__cache={},this}function _(A){const E={boundary:0,storage:0};return typeof A=="number"||typeof A=="boolean"?(E.boundary=4,E.storage=4):A.isVector2?(E.boundary=8,E.storage=8):A.isVector3||A.isColor?(E.boundary=16,E.storage=12):A.isVector4?(E.boundary=16,E.storage=16):A.isMatrix3?(E.boundary=48,E.storage=48):A.isMatrix4?(E.boundary=64,E.storage=64):A.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",A),E}function g(A){const E=A.target;E.removeEventListener("dispose",g);const x=o.indexOf(E.__bindingPointIndex);o.splice(x,1),n.deleteBuffer(r[E.id]),delete r[E.id],delete s[E.id]}function d(){for(const A in r)n.deleteBuffer(r[A]);o=[],r={},s={}}return{bind:l,update:c,dispose:d}}class $m{constructor(e={}){const{canvas:t=Jc(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=o;const m=new Uint32Array(4),_=new Int32Array(4);let g=null,d=null;const A=[],E=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=En,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const x=this;let R=!1;this._outputColorSpace=Et;let b=0,C=0,I=null,y=-1,S=null;const L=new tt,O=new tt;let k=null;const q=new We(0);let V=0,X=t.width,j=t.height,G=1,ue=null,_e=null;const Me=new tt(0,0,X,j),ze=new tt(0,0,X,j);let Ye=!1;const je=new Fo;let Ze=!1,Y=!1;const te=new lt,xe=new P,Ce=new tt,Ee={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Xe=!1;function rt(){return I===null?G:1}let w=i;function ee(M,U){return t.getContext(M,U)}try{const M={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Ao}`),t.addEventListener("webglcontextlost",fe,!1),t.addEventListener("webglcontextrestored",Se,!1),t.addEventListener("webglcontextcreationerror",re,!1),w===null){const U="webgl2";if(w=ee(U,M),w===null)throw ee(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(M){throw console.error("THREE.WebGLRenderer: "+M.message),M}let J,K,Z,ce,ne,he,Oe,Fe,T,v,F,H,Q,W,we,ae,Te,Ae,ie,ge,Ue,Re,pe,ke;function D(){J=new ap(w),J.init(),Re=new Gm(w,J),K=new ep(w,J,e,Re),Z=new Hm(w,J),K.reversedDepthBuffer&&f&&Z.buffers.depth.setReversed(!0),ce=new hp(w),ne=new Rm,he=new Vm(w,J,Z,ne,K,Re,ce),Oe=new np(x),Fe=new op(x),T=new mu(w),pe=new jd(w,T),v=new lp(w,T,ce,pe),F=new fp(w,v,T,ce),ie=new up(w,K,he),ae=new tp(ne),H=new wm(x,Oe,Fe,J,K,pe,ae),Q=new Km(x,ne),W=new Pm,we=new Fm(J),Ae=new $d(x,Oe,Fe,Z,F,p,l),Te=new zm(x,F,K),ke=new Jm(w,ce,K,Z),ge=new Qd(w,J,ce),Ue=new cp(w,J,ce),ce.programs=H.programs,x.capabilities=K,x.extensions=J,x.properties=ne,x.renderLists=W,x.shadowMap=Te,x.state=Z,x.info=ce}D();const oe=new Ym(x,w);this.xr=oe,this.getContext=function(){return w},this.getContextAttributes=function(){return w.getContextAttributes()},this.forceContextLoss=function(){const M=J.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){const M=J.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(M){M!==void 0&&(G=M,this.setSize(X,j,!1))},this.getSize=function(M){return M.set(X,j)},this.setSize=function(M,U,B=!0){if(oe.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}X=M,j=U,t.width=Math.floor(M*G),t.height=Math.floor(U*G),B===!0&&(t.style.width=M+"px",t.style.height=U+"px"),this.setViewport(0,0,M,U)},this.getDrawingBufferSize=function(M){return M.set(X*G,j*G).floor()},this.setDrawingBufferSize=function(M,U,B){X=M,j=U,G=B,t.width=Math.floor(M*B),t.height=Math.floor(U*B),this.setViewport(0,0,M,U)},this.getCurrentViewport=function(M){return M.copy(L)},this.getViewport=function(M){return M.copy(Me)},this.setViewport=function(M,U,B,z){M.isVector4?Me.set(M.x,M.y,M.z,M.w):Me.set(M,U,B,z),Z.viewport(L.copy(Me).multiplyScalar(G).round())},this.getScissor=function(M){return M.copy(ze)},this.setScissor=function(M,U,B,z){M.isVector4?ze.set(M.x,M.y,M.z,M.w):ze.set(M,U,B,z),Z.scissor(O.copy(ze).multiplyScalar(G).round())},this.getScissorTest=function(){return Ye},this.setScissorTest=function(M){Z.setScissorTest(Ye=M)},this.setOpaqueSort=function(M){ue=M},this.setTransparentSort=function(M){_e=M},this.getClearColor=function(M){return M.copy(Ae.getClearColor())},this.setClearColor=function(){Ae.setClearColor(...arguments)},this.getClearAlpha=function(){return Ae.getClearAlpha()},this.setClearAlpha=function(){Ae.setClearAlpha(...arguments)},this.clear=function(M=!0,U=!0,B=!0){let z=0;if(M){let N=!1;if(I!==null){const se=I.texture.format;N=se===Lo||se===Po||se===Co}if(N){const se=I.texture.type,me=se===Qt||se===Gn||se===Oi||se===Bi||se===wo||se===Ro,ye=Ae.getClearColor(),ve=Ae.getClearAlpha(),Ie=ye.r,Ne=ye.g,Pe=ye.b;me?(m[0]=Ie,m[1]=Ne,m[2]=Pe,m[3]=ve,w.clearBufferuiv(w.COLOR,0,m)):(_[0]=Ie,_[1]=Ne,_[2]=Pe,_[3]=ve,w.clearBufferiv(w.COLOR,0,_))}else z|=w.COLOR_BUFFER_BIT}U&&(z|=w.DEPTH_BUFFER_BIT),B&&(z|=w.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),w.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",fe,!1),t.removeEventListener("webglcontextrestored",Se,!1),t.removeEventListener("webglcontextcreationerror",re,!1),Ae.dispose(),W.dispose(),we.dispose(),ne.dispose(),Oe.dispose(),Fe.dispose(),F.dispose(),pe.dispose(),ke.dispose(),H.dispose(),oe.dispose(),oe.removeEventListener("sessionstart",Zt),oe.removeEventListener("sessionend",Wo),Rn.stop()};function fe(M){M.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),R=!0}function Se(){console.log("THREE.WebGLRenderer: Context Restored."),R=!1;const M=ce.autoReset,U=Te.enabled,B=Te.autoUpdate,z=Te.needsUpdate,N=Te.type;D(),ce.autoReset=M,Te.enabled=U,Te.autoUpdate=B,Te.needsUpdate=z,Te.type=N}function re(M){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function $(M){const U=M.target;U.removeEventListener("dispose",$),be(U)}function be(M){Be(M),ne.remove(M)}function Be(M){const U=ne.get(M).programs;U!==void 0&&(U.forEach(function(B){H.releaseProgram(B)}),M.isShaderMaterial&&H.releaseShaderCache(M))}this.renderBufferDirect=function(M,U,B,z,N,se){U===null&&(U=Ee);const me=N.isMesh&&N.matrixWorld.determinant()<0,ye=rc(M,U,B,z,N);Z.setMaterial(z,me);let ve=B.index,Ie=1;if(z.wireframe===!0){if(ve=v.getWireframeAttribute(B),ve===void 0)return;Ie=2}const Ne=B.drawRange,Pe=B.attributes.position;let qe=Ne.start*Ie,Qe=(Ne.start+Ne.count)*Ie;se!==null&&(qe=Math.max(qe,se.start*Ie),Qe=Math.min(Qe,(se.start+se.count)*Ie)),ve!==null?(qe=Math.max(qe,0),Qe=Math.min(Qe,ve.count)):Pe!=null&&(qe=Math.max(qe,0),Qe=Math.min(Qe,Pe.count));const ft=Qe-qe;if(ft<0||ft===1/0)return;pe.setup(N,z,ye,B,ve);let at,nt=ge;if(ve!==null&&(at=T.get(ve),nt=Ue,nt.setIndex(at)),N.isMesh)z.wireframe===!0?(Z.setLineWidth(z.wireframeLinewidth*rt()),nt.setMode(w.LINES)):nt.setMode(w.TRIANGLES);else if(N.isLine){let Le=z.linewidth;Le===void 0&&(Le=1),Z.setLineWidth(Le*rt()),N.isLineSegments?nt.setMode(w.LINES):N.isLineLoop?nt.setMode(w.LINE_LOOP):nt.setMode(w.LINE_STRIP)}else N.isPoints?nt.setMode(w.POINTS):N.isSprite&&nt.setMode(w.TRIANGLES);if(N.isBatchedMesh)if(N._multiDrawInstances!==null)Hi("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),nt.renderMultiDrawInstances(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount,N._multiDrawInstances);else if(J.get("WEBGL_multi_draw"))nt.renderMultiDraw(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount);else{const Le=N._multiDrawStarts,ct=N._multiDrawCounts,Ke=N._multiDrawCount,Pt=ve?T.get(ve).bytesPerElement:1,Yn=ne.get(z).currentProgram.getUniforms();for(let Lt=0;Lt<Ke;Lt++)Yn.setValue(w,"_gl_DrawID",Lt),nt.render(Le[Lt]/Pt,ct[Lt])}else if(N.isInstancedMesh)nt.renderInstances(qe,ft,N.count);else if(B.isInstancedBufferGeometry){const Le=B._maxInstanceCount!==void 0?B._maxInstanceCount:1/0,ct=Math.min(B.instanceCount,Le);nt.renderInstances(qe,ft,ct)}else nt.render(qe,ft)};function st(M,U,B){M.transparent===!0&&M.side===cn&&M.forceSinglePass===!1?(M.side=Ct,M.needsUpdate=!0,ji(M,U,B),M.side=An,M.needsUpdate=!0,ji(M,U,B),M.side=cn):ji(M,U,B)}this.compile=function(M,U,B=null){B===null&&(B=M),d=we.get(B),d.init(U),E.push(d),B.traverseVisible(function(N){N.isLight&&N.layers.test(U.layers)&&(d.pushLight(N),N.castShadow&&d.pushShadow(N))}),M!==B&&M.traverseVisible(function(N){N.isLight&&N.layers.test(U.layers)&&(d.pushLight(N),N.castShadow&&d.pushShadow(N))}),d.setupLights();const z=new Set;return M.traverse(function(N){if(!(N.isMesh||N.isPoints||N.isLine||N.isSprite))return;const se=N.material;if(se)if(Array.isArray(se))for(let me=0;me<se.length;me++){const ye=se[me];st(ye,B,N),z.add(ye)}else st(se,B,N),z.add(se)}),d=E.pop(),z},this.compileAsync=function(M,U,B=null){const z=this.compile(M,U,B);return new Promise(N=>{function se(){if(z.forEach(function(me){ne.get(me).currentProgram.isReady()&&z.delete(me)}),z.size===0){N(M);return}setTimeout(se,10)}J.get("KHR_parallel_shader_compile")!==null?se():setTimeout(se,10)})};let $e=null;function tn(M){$e&&$e(M)}function Zt(){Rn.stop()}function Wo(){Rn.start()}const Rn=new Zl;Rn.setAnimationLoop(tn),typeof self<"u"&&Rn.setContext(self),this.setAnimationLoop=function(M){$e=M,oe.setAnimationLoop(M),M===null?Rn.stop():Rn.start()},oe.addEventListener("sessionstart",Zt),oe.addEventListener("sessionend",Wo),this.render=function(M,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),oe.enabled===!0&&oe.isPresenting===!0&&(oe.cameraAutoUpdate===!0&&oe.updateCamera(U),U=oe.getCamera()),M.isScene===!0&&M.onBeforeRender(x,M,U,I),d=we.get(M,E.length),d.init(U),E.push(d),te.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),je.setFromProjectionMatrix(te,$t,U.reversedDepth),Y=this.localClippingEnabled,Ze=ae.init(this.clippingPlanes,Y),g=W.get(M,A.length),g.init(),A.push(g),oe.enabled===!0&&oe.isPresenting===!0){const se=x.xr.getDepthSensingMesh();se!==null&&Yr(se,U,-1/0,x.sortObjects)}Yr(M,U,0,x.sortObjects),g.finish(),x.sortObjects===!0&&g.sort(ue,_e),Xe=oe.enabled===!1||oe.isPresenting===!1||oe.hasDepthSensing()===!1,Xe&&Ae.addToRenderList(g,M),this.info.render.frame++,Ze===!0&&ae.beginShadows();const B=d.state.shadowsArray;Te.render(B,M,U),Ze===!0&&ae.endShadows(),this.info.autoReset===!0&&this.info.reset();const z=g.opaque,N=g.transmissive;if(d.setupLights(),U.isArrayCamera){const se=U.cameras;if(N.length>0)for(let me=0,ye=se.length;me<ye;me++){const ve=se[me];qo(z,N,M,ve)}Xe&&Ae.render(M);for(let me=0,ye=se.length;me<ye;me++){const ve=se[me];Xo(g,M,ve,ve.viewport)}}else N.length>0&&qo(z,N,M,U),Xe&&Ae.render(M),Xo(g,M,U);I!==null&&C===0&&(he.updateMultisampleRenderTarget(I),he.updateRenderTargetMipmap(I)),M.isScene===!0&&M.onAfterRender(x,M,U),pe.resetDefaultState(),y=-1,S=null,E.pop(),E.length>0?(d=E[E.length-1],Ze===!0&&ae.setGlobalState(x.clippingPlanes,d.state.camera)):d=null,A.pop(),A.length>0?g=A[A.length-1]:g=null};function Yr(M,U,B,z){if(M.visible===!1)return;if(M.layers.test(U.layers)){if(M.isGroup)B=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(U);else if(M.isLight)d.pushLight(M),M.castShadow&&d.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||je.intersectsSprite(M)){z&&Ce.setFromMatrixPosition(M.matrixWorld).applyMatrix4(te);const me=F.update(M),ye=M.material;ye.visible&&g.push(M,me,ye,B,Ce.z,null)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||je.intersectsObject(M))){const me=F.update(M),ye=M.material;if(z&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),Ce.copy(M.boundingSphere.center)):(me.boundingSphere===null&&me.computeBoundingSphere(),Ce.copy(me.boundingSphere.center)),Ce.applyMatrix4(M.matrixWorld).applyMatrix4(te)),Array.isArray(ye)){const ve=me.groups;for(let Ie=0,Ne=ve.length;Ie<Ne;Ie++){const Pe=ve[Ie],qe=ye[Pe.materialIndex];qe&&qe.visible&&g.push(M,me,qe,B,Ce.z,Pe)}}else ye.visible&&g.push(M,me,ye,B,Ce.z,null)}}const se=M.children;for(let me=0,ye=se.length;me<ye;me++)Yr(se[me],U,B,z)}function Xo(M,U,B,z){const N=M.opaque,se=M.transmissive,me=M.transparent;d.setupLightsView(B),Ze===!0&&ae.setGlobalState(x.clippingPlanes,B),z&&Z.viewport(L.copy(z)),N.length>0&&$i(N,U,B),se.length>0&&$i(se,U,B),me.length>0&&$i(me,U,B),Z.buffers.depth.setTest(!0),Z.buffers.depth.setMask(!0),Z.buffers.color.setMask(!0),Z.setPolygonOffset(!1)}function qo(M,U,B,z){if((B.isScene===!0?B.overrideMaterial:null)!==null)return;d.state.transmissionRenderTarget[z.id]===void 0&&(d.state.transmissionRenderTarget[z.id]=new Wn(1,1,{generateMipmaps:!0,type:J.has("EXT_color_buffer_half_float")||J.has("EXT_color_buffer_float")?qi:Qt,minFilter:Vn,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Je.workingColorSpace}));const se=d.state.transmissionRenderTarget[z.id],me=z.viewport||L;se.setSize(me.z*x.transmissionResolutionScale,me.w*x.transmissionResolutionScale);const ye=x.getRenderTarget(),ve=x.getActiveCubeFace(),Ie=x.getActiveMipmapLevel();x.setRenderTarget(se),x.getClearColor(q),V=x.getClearAlpha(),V<1&&x.setClearColor(16777215,.5),x.clear(),Xe&&Ae.render(B);const Ne=x.toneMapping;x.toneMapping=En;const Pe=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),d.setupLightsView(z),Ze===!0&&ae.setGlobalState(x.clippingPlanes,z),$i(M,B,z),he.updateMultisampleRenderTarget(se),he.updateRenderTargetMipmap(se),J.has("WEBGL_multisampled_render_to_texture")===!1){let qe=!1;for(let Qe=0,ft=U.length;Qe<ft;Qe++){const at=U[Qe],nt=at.object,Le=at.geometry,ct=at.material,Ke=at.group;if(ct.side===cn&&nt.layers.test(z.layers)){const Pt=ct.side;ct.side=Ct,ct.needsUpdate=!0,Yo(nt,B,z,Le,ct,Ke),ct.side=Pt,ct.needsUpdate=!0,qe=!0}}qe===!0&&(he.updateMultisampleRenderTarget(se),he.updateRenderTargetMipmap(se))}x.setRenderTarget(ye,ve,Ie),x.setClearColor(q,V),Pe!==void 0&&(z.viewport=Pe),x.toneMapping=Ne}function $i(M,U,B){const z=U.isScene===!0?U.overrideMaterial:null;for(let N=0,se=M.length;N<se;N++){const me=M[N],ye=me.object,ve=me.geometry,Ie=me.group;let Ne=me.material;Ne.allowOverride===!0&&z!==null&&(Ne=z),ye.layers.test(B.layers)&&Yo(ye,U,B,ve,Ne,Ie)}}function Yo(M,U,B,z,N,se){M.onBeforeRender(x,U,B,z,N,se),M.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),N.onBeforeRender(x,U,B,z,M,se),N.transparent===!0&&N.side===cn&&N.forceSinglePass===!1?(N.side=Ct,N.needsUpdate=!0,x.renderBufferDirect(B,U,z,N,M,se),N.side=An,N.needsUpdate=!0,x.renderBufferDirect(B,U,z,N,M,se),N.side=cn):x.renderBufferDirect(B,U,z,N,M,se),M.onAfterRender(x,U,B,z,N,se)}function ji(M,U,B){U.isScene!==!0&&(U=Ee);const z=ne.get(M),N=d.state.lights,se=d.state.shadowsArray,me=N.state.version,ye=H.getParameters(M,N.state,se,U,B),ve=H.getProgramCacheKey(ye);let Ie=z.programs;z.environment=M.isMeshStandardMaterial?U.environment:null,z.fog=U.fog,z.envMap=(M.isMeshStandardMaterial?Fe:Oe).get(M.envMap||z.environment),z.envMapRotation=z.environment!==null&&M.envMap===null?U.environmentRotation:M.envMapRotation,Ie===void 0&&(M.addEventListener("dispose",$),Ie=new Map,z.programs=Ie);let Ne=Ie.get(ve);if(Ne!==void 0){if(z.currentProgram===Ne&&z.lightsStateVersion===me)return Ko(M,ye),Ne}else ye.uniforms=H.getUniforms(M),M.onBeforeCompile(ye,x),Ne=H.acquireProgram(ye,ve),Ie.set(ve,Ne),z.uniforms=ye.uniforms;const Pe=z.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(Pe.clippingPlanes=ae.uniform),Ko(M,ye),z.needsLights=oc(M),z.lightsStateVersion=me,z.needsLights&&(Pe.ambientLightColor.value=N.state.ambient,Pe.lightProbe.value=N.state.probe,Pe.directionalLights.value=N.state.directional,Pe.directionalLightShadows.value=N.state.directionalShadow,Pe.spotLights.value=N.state.spot,Pe.spotLightShadows.value=N.state.spotShadow,Pe.rectAreaLights.value=N.state.rectArea,Pe.ltc_1.value=N.state.rectAreaLTC1,Pe.ltc_2.value=N.state.rectAreaLTC2,Pe.pointLights.value=N.state.point,Pe.pointLightShadows.value=N.state.pointShadow,Pe.hemisphereLights.value=N.state.hemi,Pe.directionalShadowMap.value=N.state.directionalShadowMap,Pe.directionalShadowMatrix.value=N.state.directionalShadowMatrix,Pe.spotShadowMap.value=N.state.spotShadowMap,Pe.spotLightMatrix.value=N.state.spotLightMatrix,Pe.spotLightMap.value=N.state.spotLightMap,Pe.pointShadowMap.value=N.state.pointShadowMap,Pe.pointShadowMatrix.value=N.state.pointShadowMatrix),z.currentProgram=Ne,z.uniformsList=null,Ne}function Zo(M){if(M.uniformsList===null){const U=M.currentProgram.getUniforms();M.uniformsList=Cr.seqWithValue(U.seq,M.uniforms)}return M.uniformsList}function Ko(M,U){const B=ne.get(M);B.outputColorSpace=U.outputColorSpace,B.batching=U.batching,B.batchingColor=U.batchingColor,B.instancing=U.instancing,B.instancingColor=U.instancingColor,B.instancingMorph=U.instancingMorph,B.skinning=U.skinning,B.morphTargets=U.morphTargets,B.morphNormals=U.morphNormals,B.morphColors=U.morphColors,B.morphTargetsCount=U.morphTargetsCount,B.numClippingPlanes=U.numClippingPlanes,B.numIntersection=U.numClipIntersection,B.vertexAlphas=U.vertexAlphas,B.vertexTangents=U.vertexTangents,B.toneMapping=U.toneMapping}function rc(M,U,B,z,N){U.isScene!==!0&&(U=Ee),he.resetTextureUnits();const se=U.fog,me=z.isMeshStandardMaterial?U.environment:null,ye=I===null?x.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:_i,ve=(z.isMeshStandardMaterial?Fe:Oe).get(z.envMap||me),Ie=z.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,Ne=!!B.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),Pe=!!B.morphAttributes.position,qe=!!B.morphAttributes.normal,Qe=!!B.morphAttributes.color;let ft=En;z.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(ft=x.toneMapping);const at=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,nt=at!==void 0?at.length:0,Le=ne.get(z),ct=d.state.lights;if(Ze===!0&&(Y===!0||M!==S)){const St=M===S&&z.id===y;ae.setState(z,M,St)}let Ke=!1;z.version===Le.__version?(Le.needsLights&&Le.lightsStateVersion!==ct.state.version||Le.outputColorSpace!==ye||N.isBatchedMesh&&Le.batching===!1||!N.isBatchedMesh&&Le.batching===!0||N.isBatchedMesh&&Le.batchingColor===!0&&N.colorTexture===null||N.isBatchedMesh&&Le.batchingColor===!1&&N.colorTexture!==null||N.isInstancedMesh&&Le.instancing===!1||!N.isInstancedMesh&&Le.instancing===!0||N.isSkinnedMesh&&Le.skinning===!1||!N.isSkinnedMesh&&Le.skinning===!0||N.isInstancedMesh&&Le.instancingColor===!0&&N.instanceColor===null||N.isInstancedMesh&&Le.instancingColor===!1&&N.instanceColor!==null||N.isInstancedMesh&&Le.instancingMorph===!0&&N.morphTexture===null||N.isInstancedMesh&&Le.instancingMorph===!1&&N.morphTexture!==null||Le.envMap!==ve||z.fog===!0&&Le.fog!==se||Le.numClippingPlanes!==void 0&&(Le.numClippingPlanes!==ae.numPlanes||Le.numIntersection!==ae.numIntersection)||Le.vertexAlphas!==Ie||Le.vertexTangents!==Ne||Le.morphTargets!==Pe||Le.morphNormals!==qe||Le.morphColors!==Qe||Le.toneMapping!==ft||Le.morphTargetsCount!==nt)&&(Ke=!0):(Ke=!0,Le.__version=z.version);let Pt=Le.currentProgram;Ke===!0&&(Pt=ji(z,U,N));let Yn=!1,Lt=!1,Ti=!1;const ht=Pt.getUniforms(),Ft=Le.uniforms;if(Z.useProgram(Pt.program)&&(Yn=!0,Lt=!0,Ti=!0),z.id!==y&&(y=z.id,Lt=!0),Yn||S!==M){Z.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),ht.setValue(w,"projectionMatrix",M.projectionMatrix),ht.setValue(w,"viewMatrix",M.matrixWorldInverse);const bt=ht.map.cameraPosition;bt!==void 0&&bt.setValue(w,xe.setFromMatrixPosition(M.matrixWorld)),K.logarithmicDepthBuffer&&ht.setValue(w,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&ht.setValue(w,"isOrthographic",M.isOrthographicCamera===!0),S!==M&&(S=M,Lt=!0,Ti=!0)}if(N.isSkinnedMesh){ht.setOptional(w,N,"bindMatrix"),ht.setOptional(w,N,"bindMatrixInverse");const St=N.skeleton;St&&(St.boneTexture===null&&St.computeBoneTexture(),ht.setValue(w,"boneTexture",St.boneTexture,he))}N.isBatchedMesh&&(ht.setOptional(w,N,"batchingTexture"),ht.setValue(w,"batchingTexture",N._matricesTexture,he),ht.setOptional(w,N,"batchingIdTexture"),ht.setValue(w,"batchingIdTexture",N._indirectTexture,he),ht.setOptional(w,N,"batchingColorTexture"),N._colorsTexture!==null&&ht.setValue(w,"batchingColorTexture",N._colorsTexture,he));const Ot=B.morphAttributes;if((Ot.position!==void 0||Ot.normal!==void 0||Ot.color!==void 0)&&ie.update(N,B,Pt),(Lt||Le.receiveShadow!==N.receiveShadow)&&(Le.receiveShadow=N.receiveShadow,ht.setValue(w,"receiveShadow",N.receiveShadow)),z.isMeshGouraudMaterial&&z.envMap!==null&&(Ft.envMap.value=ve,Ft.flipEnvMap.value=ve.isCubeTexture&&ve.isRenderTargetTexture===!1?-1:1),z.isMeshStandardMaterial&&z.envMap===null&&U.environment!==null&&(Ft.envMapIntensity.value=U.environmentIntensity),Lt&&(ht.setValue(w,"toneMappingExposure",x.toneMappingExposure),Le.needsLights&&sc(Ft,Ti),se&&z.fog===!0&&Q.refreshFogUniforms(Ft,se),Q.refreshMaterialUniforms(Ft,z,G,j,d.state.transmissionRenderTarget[M.id]),Cr.upload(w,Zo(Le),Ft,he)),z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(Cr.upload(w,Zo(Le),Ft,he),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&ht.setValue(w,"center",N.center),ht.setValue(w,"modelViewMatrix",N.modelViewMatrix),ht.setValue(w,"normalMatrix",N.normalMatrix),ht.setValue(w,"modelMatrix",N.matrixWorld),z.isShaderMaterial||z.isRawShaderMaterial){const St=z.uniformsGroups;for(let bt=0,Zr=St.length;bt<Zr;bt++){const Cn=St[bt];ke.update(Cn,Pt),ke.bind(Cn,Pt)}}return Pt}function sc(M,U){M.ambientLightColor.needsUpdate=U,M.lightProbe.needsUpdate=U,M.directionalLights.needsUpdate=U,M.directionalLightShadows.needsUpdate=U,M.pointLights.needsUpdate=U,M.pointLightShadows.needsUpdate=U,M.spotLights.needsUpdate=U,M.spotLightShadows.needsUpdate=U,M.rectAreaLights.needsUpdate=U,M.hemisphereLights.needsUpdate=U}function oc(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return b},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(M,U,B){const z=ne.get(M);z.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,z.__autoAllocateDepthBuffer===!1&&(z.__useRenderToTexture=!1),ne.get(M.texture).__webglTexture=U,ne.get(M.depthTexture).__webglTexture=z.__autoAllocateDepthBuffer?void 0:B,z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,U){const B=ne.get(M);B.__webglFramebuffer=U,B.__useDefaultFramebuffer=U===void 0};const ac=w.createFramebuffer();this.setRenderTarget=function(M,U=0,B=0){I=M,b=U,C=B;let z=!0,N=null,se=!1,me=!1;if(M){const ve=ne.get(M);if(ve.__useDefaultFramebuffer!==void 0)Z.bindFramebuffer(w.FRAMEBUFFER,null),z=!1;else if(ve.__webglFramebuffer===void 0)he.setupRenderTarget(M);else if(ve.__hasExternalTextures)he.rebindTextures(M,ne.get(M.texture).__webglTexture,ne.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){const Pe=M.depthTexture;if(ve.__boundDepthTexture!==Pe){if(Pe!==null&&ne.has(Pe)&&(M.width!==Pe.image.width||M.height!==Pe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");he.setupDepthRenderbuffer(M)}}const Ie=M.texture;(Ie.isData3DTexture||Ie.isDataArrayTexture||Ie.isCompressedArrayTexture)&&(me=!0);const Ne=ne.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(Ne[U])?N=Ne[U][B]:N=Ne[U],se=!0):M.samples>0&&he.useMultisampledRTT(M)===!1?N=ne.get(M).__webglMultisampledFramebuffer:Array.isArray(Ne)?N=Ne[B]:N=Ne,L.copy(M.viewport),O.copy(M.scissor),k=M.scissorTest}else L.copy(Me).multiplyScalar(G).floor(),O.copy(ze).multiplyScalar(G).floor(),k=Ye;if(B!==0&&(N=ac),Z.bindFramebuffer(w.FRAMEBUFFER,N)&&z&&Z.drawBuffers(M,N),Z.viewport(L),Z.scissor(O),Z.setScissorTest(k),se){const ve=ne.get(M.texture);w.framebufferTexture2D(w.FRAMEBUFFER,w.COLOR_ATTACHMENT0,w.TEXTURE_CUBE_MAP_POSITIVE_X+U,ve.__webglTexture,B)}else if(me){const ve=U;for(let Ie=0;Ie<M.textures.length;Ie++){const Ne=ne.get(M.textures[Ie]);w.framebufferTextureLayer(w.FRAMEBUFFER,w.COLOR_ATTACHMENT0+Ie,Ne.__webglTexture,B,ve)}}else if(M!==null&&B!==0){const ve=ne.get(M.texture);w.framebufferTexture2D(w.FRAMEBUFFER,w.COLOR_ATTACHMENT0,w.TEXTURE_2D,ve.__webglTexture,B)}y=-1},this.readRenderTargetPixels=function(M,U,B,z,N,se,me,ye=0){if(!(M&&M.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ve=ne.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&me!==void 0&&(ve=ve[me]),ve){Z.bindFramebuffer(w.FRAMEBUFFER,ve);try{const Ie=M.textures[ye],Ne=Ie.format,Pe=Ie.type;if(!K.textureFormatReadable(Ne)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!K.textureTypeReadable(Pe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=M.width-z&&B>=0&&B<=M.height-N&&(M.textures.length>1&&w.readBuffer(w.COLOR_ATTACHMENT0+ye),w.readPixels(U,B,z,N,Re.convert(Ne),Re.convert(Pe),se))}finally{const Ie=I!==null?ne.get(I).__webglFramebuffer:null;Z.bindFramebuffer(w.FRAMEBUFFER,Ie)}}},this.readRenderTargetPixelsAsync=async function(M,U,B,z,N,se,me,ye=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ve=ne.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&me!==void 0&&(ve=ve[me]),ve)if(U>=0&&U<=M.width-z&&B>=0&&B<=M.height-N){Z.bindFramebuffer(w.FRAMEBUFFER,ve);const Ie=M.textures[ye],Ne=Ie.format,Pe=Ie.type;if(!K.textureFormatReadable(Ne))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!K.textureTypeReadable(Pe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const qe=w.createBuffer();w.bindBuffer(w.PIXEL_PACK_BUFFER,qe),w.bufferData(w.PIXEL_PACK_BUFFER,se.byteLength,w.STREAM_READ),M.textures.length>1&&w.readBuffer(w.COLOR_ATTACHMENT0+ye),w.readPixels(U,B,z,N,Re.convert(Ne),Re.convert(Pe),0);const Qe=I!==null?ne.get(I).__webglFramebuffer:null;Z.bindFramebuffer(w.FRAMEBUFFER,Qe);const ft=w.fenceSync(w.SYNC_GPU_COMMANDS_COMPLETE,0);return w.flush(),await $c(w,ft,4),w.bindBuffer(w.PIXEL_PACK_BUFFER,qe),w.getBufferSubData(w.PIXEL_PACK_BUFFER,0,se),w.deleteBuffer(qe),w.deleteSync(ft),se}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,U=null,B=0){const z=Math.pow(2,-B),N=Math.floor(M.image.width*z),se=Math.floor(M.image.height*z),me=U!==null?U.x:0,ye=U!==null?U.y:0;he.setTexture2D(M,0),w.copyTexSubImage2D(w.TEXTURE_2D,B,0,0,me,ye,N,se),Z.unbindTexture()};const lc=w.createFramebuffer(),cc=w.createFramebuffer();this.copyTextureToTexture=function(M,U,B=null,z=null,N=0,se=null){se===null&&(N!==0?(Hi("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),se=N,N=0):se=0);let me,ye,ve,Ie,Ne,Pe,qe,Qe,ft;const at=M.isCompressedTexture?M.mipmaps[se]:M.image;if(B!==null)me=B.max.x-B.min.x,ye=B.max.y-B.min.y,ve=B.isBox3?B.max.z-B.min.z:1,Ie=B.min.x,Ne=B.min.y,Pe=B.isBox3?B.min.z:0;else{const Ot=Math.pow(2,-N);me=Math.floor(at.width*Ot),ye=Math.floor(at.height*Ot),M.isDataArrayTexture?ve=at.depth:M.isData3DTexture?ve=Math.floor(at.depth*Ot):ve=1,Ie=0,Ne=0,Pe=0}z!==null?(qe=z.x,Qe=z.y,ft=z.z):(qe=0,Qe=0,ft=0);const nt=Re.convert(U.format),Le=Re.convert(U.type);let ct;U.isData3DTexture?(he.setTexture3D(U,0),ct=w.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(he.setTexture2DArray(U,0),ct=w.TEXTURE_2D_ARRAY):(he.setTexture2D(U,0),ct=w.TEXTURE_2D),w.pixelStorei(w.UNPACK_FLIP_Y_WEBGL,U.flipY),w.pixelStorei(w.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),w.pixelStorei(w.UNPACK_ALIGNMENT,U.unpackAlignment);const Ke=w.getParameter(w.UNPACK_ROW_LENGTH),Pt=w.getParameter(w.UNPACK_IMAGE_HEIGHT),Yn=w.getParameter(w.UNPACK_SKIP_PIXELS),Lt=w.getParameter(w.UNPACK_SKIP_ROWS),Ti=w.getParameter(w.UNPACK_SKIP_IMAGES);w.pixelStorei(w.UNPACK_ROW_LENGTH,at.width),w.pixelStorei(w.UNPACK_IMAGE_HEIGHT,at.height),w.pixelStorei(w.UNPACK_SKIP_PIXELS,Ie),w.pixelStorei(w.UNPACK_SKIP_ROWS,Ne),w.pixelStorei(w.UNPACK_SKIP_IMAGES,Pe);const ht=M.isDataArrayTexture||M.isData3DTexture,Ft=U.isDataArrayTexture||U.isData3DTexture;if(M.isDepthTexture){const Ot=ne.get(M),St=ne.get(U),bt=ne.get(Ot.__renderTarget),Zr=ne.get(St.__renderTarget);Z.bindFramebuffer(w.READ_FRAMEBUFFER,bt.__webglFramebuffer),Z.bindFramebuffer(w.DRAW_FRAMEBUFFER,Zr.__webglFramebuffer);for(let Cn=0;Cn<ve;Cn++)ht&&(w.framebufferTextureLayer(w.READ_FRAMEBUFFER,w.COLOR_ATTACHMENT0,ne.get(M).__webglTexture,N,Pe+Cn),w.framebufferTextureLayer(w.DRAW_FRAMEBUFFER,w.COLOR_ATTACHMENT0,ne.get(U).__webglTexture,se,ft+Cn)),w.blitFramebuffer(Ie,Ne,me,ye,qe,Qe,me,ye,w.DEPTH_BUFFER_BIT,w.NEAREST);Z.bindFramebuffer(w.READ_FRAMEBUFFER,null),Z.bindFramebuffer(w.DRAW_FRAMEBUFFER,null)}else if(N!==0||M.isRenderTargetTexture||ne.has(M)){const Ot=ne.get(M),St=ne.get(U);Z.bindFramebuffer(w.READ_FRAMEBUFFER,lc),Z.bindFramebuffer(w.DRAW_FRAMEBUFFER,cc);for(let bt=0;bt<ve;bt++)ht?w.framebufferTextureLayer(w.READ_FRAMEBUFFER,w.COLOR_ATTACHMENT0,Ot.__webglTexture,N,Pe+bt):w.framebufferTexture2D(w.READ_FRAMEBUFFER,w.COLOR_ATTACHMENT0,w.TEXTURE_2D,Ot.__webglTexture,N),Ft?w.framebufferTextureLayer(w.DRAW_FRAMEBUFFER,w.COLOR_ATTACHMENT0,St.__webglTexture,se,ft+bt):w.framebufferTexture2D(w.DRAW_FRAMEBUFFER,w.COLOR_ATTACHMENT0,w.TEXTURE_2D,St.__webglTexture,se),N!==0?w.blitFramebuffer(Ie,Ne,me,ye,qe,Qe,me,ye,w.COLOR_BUFFER_BIT,w.NEAREST):Ft?w.copyTexSubImage3D(ct,se,qe,Qe,ft+bt,Ie,Ne,me,ye):w.copyTexSubImage2D(ct,se,qe,Qe,Ie,Ne,me,ye);Z.bindFramebuffer(w.READ_FRAMEBUFFER,null),Z.bindFramebuffer(w.DRAW_FRAMEBUFFER,null)}else Ft?M.isDataTexture||M.isData3DTexture?w.texSubImage3D(ct,se,qe,Qe,ft,me,ye,ve,nt,Le,at.data):U.isCompressedArrayTexture?w.compressedTexSubImage3D(ct,se,qe,Qe,ft,me,ye,ve,nt,at.data):w.texSubImage3D(ct,se,qe,Qe,ft,me,ye,ve,nt,Le,at):M.isDataTexture?w.texSubImage2D(w.TEXTURE_2D,se,qe,Qe,me,ye,nt,Le,at.data):M.isCompressedTexture?w.compressedTexSubImage2D(w.TEXTURE_2D,se,qe,Qe,at.width,at.height,nt,at.data):w.texSubImage2D(w.TEXTURE_2D,se,qe,Qe,me,ye,nt,Le,at);w.pixelStorei(w.UNPACK_ROW_LENGTH,Ke),w.pixelStorei(w.UNPACK_IMAGE_HEIGHT,Pt),w.pixelStorei(w.UNPACK_SKIP_PIXELS,Yn),w.pixelStorei(w.UNPACK_SKIP_ROWS,Lt),w.pixelStorei(w.UNPACK_SKIP_IMAGES,Ti),se===0&&U.generateMipmaps&&w.generateMipmap(ct),Z.unbindTexture()},this.initRenderTarget=function(M){ne.get(M).__webglFramebuffer===void 0&&he.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?he.setTextureCube(M,0):M.isData3DTexture?he.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?he.setTexture2DArray(M,0):he.setTexture2D(M,0),Z.unbindTexture()},this.resetState=function(){b=0,C=0,I=null,Z.reset(),pe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return $t}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Je._getDrawingBufferColorSpace(e),t.unpackColorSpace=Je._getUnpackColorSpace()}}function zr(n=89121){return()=>{n|=0,n=n+1831565813|0;let e=Math.imul(n^n>>>15,1|n);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function jm(n,e,t=512){const i=zr(e),r=document.createElement("canvas");r.width=r.height=t;const s=r.getContext("2d"),o=s.createImageData(t,t),a={stone:[137,126,105],wood:[120,82,44],iron:[63,64,60],cloth:[157,143,109],plaster:[174,160,132],leather:[106,54,30],slate:[99,102,94]},l=a[n]||a.stone;for(let h=0;h<t;h++)for(let u=0;u<t;u++){let f=(i()-.5)*21;n==="wood"&&(f+=11*Math.sin(h*.2+Math.sin(u*.009)*3)+6*Math.sin(h*.69+Math.sin(u*.018)*2)+7*Math.sin(h*.027+u*.002)),(n==="stone"||n==="slate")&&(f+=8*Math.sin(u*.023+h*.015)*Math.cos(h*.043)+6*Math.cos(h*.013-u*.049)),n==="cloth"&&(f+=(u%4===0?-14:3)+(h%4===0?-12:3)+4*Math.sin(u*.042)),n==="leather"&&(f+=Math.sin(u*.79+h*.5)*4);const p=(h*t+u)*4;for(let m=0;m<3;m++)o.data[p+m]=Math.max(0,Math.min(255,l[m]+f));o.data[p+3]=255}if(s.putImageData(o,0,0),n==="wood"){for(let h=0;h<210;h++){const u=i()*t;s.strokeStyle=`rgba(${i()>.4?"44,25,13":"201,158,91"},${.06+i()*.15})`,s.lineWidth=.4+i()*1.6,s.beginPath(),s.moveTo(0,u);for(let f=0;f<=t;f+=16)s.lineTo(f,u+Math.sin(f*.022+h)*3);s.stroke()}for(let h=0;h<7;h++){const u=i()*t,f=i()*t;for(let p=1;p<8;p++)s.strokeStyle=`rgba(50,26,13,${.12-p*.008})`,s.beginPath(),s.ellipse(u,f,8+p*5,2+p*1.5,.04,0,Math.PI*2),s.stroke()}s.strokeStyle="#291d1380",s.lineWidth=1.5;for(let h=0;h<14;h++){const u=i()*t,f=i()*t;s.beginPath(),s.moveTo(u,f),s.lineTo(u+15+i()*120,f+i()*3),s.stroke()}}if(n==="stone"||n==="slate"||n==="plaster"){for(let h=0;h<650;h++){const u=i()*t,f=i()*t,p=.5+i()*4;s.fillStyle=i()>.55?"#382d241a":"#ece5ce19",s.beginPath(),s.ellipse(u,f,p,p*.6,i()*6,0,Math.PI*2),s.fill()}for(let h=0;h<6;h++){let u=i()*t,f=i()*t;s.lineWidth=.5,s.strokeStyle="#292b2535",s.beginPath(),s.moveTo(u,f);for(let p=0;p<7;p++)u+=i()*28-14,f+=4+i()*16,s.lineTo(u,f);s.stroke()}}if(n==="iron")for(let h=0;h<800;h++){s.fillStyle=i()<.2?"#b361292c":"#aaa89714";const u=i()*3+1;s.beginPath(),s.arc(i()*t,i()*t,u,0,7),s.fill()}const c=new Ul(r);return c.colorSpace=Et,c.wrapS=c.wrapT=Dr,c.anisotropy=4,c}function Ut(n,e={}){return new yi({color:n,roughness:.83,...e})}function Qm(){const n={};["stone","wood","iron","cloth","plaster","leather","slate"].forEach((o,a)=>n[o]=jm(o,177+a*73));const e=n.wood.clone();e.center.set(.5,.5),e.rotation=Math.PI/2,e.needsUpdate=!0;const t=(o,a,l={})=>Ut(a,{map:n[o],bumpMap:n[o],bumpScale:o==="stone"?.075:o==="cloth"?.012:.028,...l}),i=wn((o,a,l)=>{const c=o.createLinearGradient(0,0,0,l);c.addColorStop(0,"#7896a5"),c.addColorStop(.55,"#b5c4bf"),c.addColorStop(1,"#647d75"),o.fillStyle=c,o.fillRect(0,0,a,l),o.strokeStyle="#425b5c55",o.lineWidth=4,o.beginPath(),o.moveTo(a*.1,l),o.bezierCurveTo(a*.25,l*.8,a*.05,l*.49,a*.22,l*.2),o.moveTo(a*.14,l*.65),o.lineTo(a*.02,l*.43),o.moveTo(a*.18,l*.48),o.lineTo(a*.39,l*.23),o.stroke();for(let u=0;u<l;u+=8)o.fillStyle=`rgba(207,216,196,${.02+u%17*.005})`,o.fillRect(0,u,a,2);const h=zr(465);for(let u=0;u<550;u++)o.fillStyle=h()>.5?"#d9dfc51c":"#182c3718",o.beginPath(),o.arc(h()*a,h()*l,.5+h()*1.8,0,7),o.fill()},512,512),r=wn((o,a,l)=>{o.fillStyle="#aa8b50",o.fillRect(0,0,a,l);const c=zr(1305);for(let h=0;h<2e3;h++){const u=c()*a,f=c()*l,p=c()*6.28,m=8+c()*37;o.lineWidth=1+c()*2,o.strokeStyle=["#d7bb75","#806333","#c4a65a","#ad8743"][Math.floor(c()*4)],o.beginPath(),o.moveTo(u,f),o.lineTo(u+Math.cos(p)*m,f+Math.sin(p)*m),o.stroke()}},512,512);return{stone:Array.from({length:7},(o,a)=>t("stone",new We().setHSL(.095,.095,.51+a*.043))),darkStone:t("stone","#635b4d"),mortar:t("plaster","#746b56",{bumpScale:.04}),plaster:t("plaster","#d7c4a3"),soot:t("stone","#252422"),floor:Array.from({length:6},(o,a)=>t("slate",new We().setHSL(.1,.1,.61+a*.035))),wood:Array.from({length:7},(o,a)=>t("wood",new We().setHSL(.076,.24,.47+a*.038))),darkWood:t("wood","#624225"),uprightWood:t("wood","#947250",{map:e,bumpMap:e}),paleWood:t("wood","#d3aa76"),iron:t("iron","#969489",{metalness:.76,roughness:.46}),blackIron:t("iron","#4a4942",{metalness:.65,roughness:.62}),brass:t("iron","#d8aa54",{metalness:.74,roughness:.37}),cloth:t("cloth","#ded0a9"),blanket:t("cloth","#536865"),burgundy:t("cloth","#793c31"),rug:t("cloth","#955d39"),leather:t("leather","#ad8056"),darkLeather:t("leather","#6b4933"),paper:t("plaster","#e4d2a7",{bumpScale:.005}),ceramic:Ut("#d6c2a0",{roughness:.32}),greenCeramic:Ut("#627b6b",{roughness:.28}),pear:Ut("#a0a16a",{roughness:.52}),wax:Ut("#edcea1"),cork:t("wood","#d5b584"),straw:Array.from({length:6},(o,a)=>Ut(new We().setHSL(.112,.37,.36+a*.052))),strawMass:Ut("#d4c290",{map:r,bumpMap:r,bumpScale:.035,roughness:1}),amberGlass:Ut("#b47e35",{roughness:.16,metalness:.12,transparent:!0,opacity:.63}),water:Ut("#44595a",{metalness:.65,roughness:.19,transparent:!0,opacity:.88}),ember:Ut("#a65318",{emissive:"#f68028",emissiveIntensity:2.1}),lamp:Ut("#f7cc84",{emissive:"#ffc473",emissiveIntensity:2.7,roughness:.6}),blueWindow:Ut("#ffffff",{map:i,emissiveMap:i,emissive:"#d3e3da",emissiveIntensity:.5,roughness:1}),dark:Ut("#201d16")}}function wn(n,e=512,t=512){const i=document.createElement("canvas");i.width=e,i.height=t,n(i.getContext("2d"),e,t);const r=new Ul(i);return r.colorSpace=Et,r.anisotropy=4,r}function To(n,e=512,t=512){return new yi({map:wn(n,e,t),transparent:!0,roughness:.94,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2})}function eg(n,e=!1){const t=n[0].index!==null,i=new Set(Object.keys(n[0].attributes)),r=new Set(Object.keys(n[0].morphAttributes)),s={},o={},a=n[0].morphTargetsRelative,l=new At;let c=0;for(let h=0;h<n.length;++h){const u=n[h];let f=0;if(t!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const p in u.attributes){if(!i.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+p+'" attribute exists among all geometries, or in none of them.'),null;s[p]===void 0&&(s[p]=[]),s[p].push(u.attributes[p]),f++}if(f!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const p in u.morphAttributes){if(!r.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[p]===void 0&&(o[p]=[]),o[p].push(u.morphAttributes[p])}if(e){let p;if(t)p=u.index.count;else if(u.attributes.position!==void 0)p=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,p,h),c+=p}}if(t){let h=0;const u=[];for(let f=0;f<n.length;++f){const p=n[f].index;for(let m=0;m<p.count;++m)u.push(p.getX(m)+h);h+=n[f].attributes.position.count}l.setIndex(u)}for(const h in s){const u=Qa(s[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,u)}for(const h in o){const u=o[h][0].length;if(u===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let f=0;f<u;++f){const p=[];for(let _=0;_<o[h].length;++_)p.push(o[h][_][f]);const m=Qa(p);if(!m)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(m)}}return l}function Qa(n){let e,t,i,r=-1,s=0;for(let c=0;c<n.length;++c){const h=n[c];if(e===void 0&&(e=h.array.constructor),e!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=h.itemSize),t!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=h.normalized),i!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(r===-1&&(r=h.gpuType),r!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;s+=h.count*t}const o=new e(s),a=new kt(o,t,i);let l=0;for(let c=0;c<n.length;++c){const h=n[c];if(h.isInterleavedBufferAttribute){const u=l/t;for(let f=0,p=h.count;f<p;f++)for(let m=0;m<t;m++){const _=h.getComponent(f,m);a.setComponent(f+u,m,_)}}else o.set(h.array,l);l+=h.count*t}return r!==void 0&&(a.gpuType=r),a}class tg{constructor(e,t){this.scene=e,this.m=t,this.batches=new Map,this.colliders=[],this.interactions=[],this.rng=zr(32951),this.matrix=new lt,this.q=new Tn,this.euler=new Yt}random(e=0,t=1){return e+this.rng()*(t-e)}add(e,t,i=[0,0,0],r=[0,0,0],s=[1,1,1],o=!0){if(e.index){const l=e;e=e.toNonIndexed(),l.dispose()}this.euler.set(...r),this.q.setFromEuler(this.euler),this.matrix.compose(new P(...i),this.q,new P(...s)),e.applyMatrix4(this.matrix),e.attributes.uv||e.setAttribute("uv",new kt(new Float32Array(e.attributes.position.count*2),2));const a=`${t.uuid}:${o}`;this.batches.has(a)||this.batches.set(a,{material:t,shadow:o,geometries:[]}),this.batches.get(a).geometries.push(e)}box(e,t,i,r,s,o,a,l=[0,0,0],c=!0){this.add(new Xn(r,s,o),a,[e,t,i],l,[1,1,1],c)}stoneBox(e,t,i,r,s,o,a){const l=Math.min(.016,r*.12,s*.12,o*.12),c=new Vr;c.moveTo(-r/2+l,-s/2+l),c.lineTo(r/2-l,-s/2+l),c.lineTo(r/2-l,s/2-l),c.lineTo(-r/2+l,s/2-l),c.closePath();const h=new Ki(c,{depth:o-l*2,steps:1,bevelEnabled:!0,bevelThickness:l,bevelSize:l,bevelSegments:1});h.translate(0,0,-o/2+l),this.add(h,a,[e,t,i])}sphere(e,t,i,r,s,o,a,l=14){this.add(new Gr(1,l,Math.max(6,l/2)),a,[e,t,i],[0,0,0],[r,s,o])}cylinder(e,t,i,r,s,o,a,l=12,c=[0,0,0]){this.add(new Or(r,s,o,l),a,[e,t,i],c)}ring(e,t,i,r,s,o,a=[0,0,0],l=24){this.add(new ko(r,s,6,l),o,[e,t,i],a)}beam(e,t,i,r,s){const o=new P(...e),a=new P(...t),l=a.clone().sub(o),c=o.clone().add(a).multiplyScalar(.5),h=new Xn(i,l.length(),r);h.applyQuaternion(new Tn().setFromUnitVectors(new P(0,1,0),l.normalize())),h.translate(...c.toArray()),this.add(h,s)}pole(e,t,i,r,s=10){const o=new P(...e),a=new P(...t),l=a.clone().sub(o),c=o.clone().add(a).multiplyScalar(.5),h=new Or(i,i,l.length(),s);h.applyQuaternion(new Tn().setFromUnitVectors(new P(0,1,0),l.normalize())),h.translate(...c.toArray()),this.add(h,r)}rope(e,t=.02,i=this.m.darkLeather,r=30){const s=new Ol(e.map(o=>new P(...o)));this.add(new Ho(s,r,t,5,!1),i)}plane(e,t,i,r,s,o,a=[0,0,0]){this.add(new Ji(r,s),o,[e,t,i],a,[1,1,1],!1)}collide(e,t,i,r,s="structure"){this.colliders.push({minX:e-i/2,maxX:e+i/2,minZ:t-r/2,maxZ:t+r/2,name:s})}inspect(e,t,i,r,s,o="KEEPER'S NOTES",a=2.8){this.interactions.push({position:new P(e,t,i),title:r,copy:s,kind:o,reach:a})}contact(e,t,i,r,s=.026,o=.33){if(!this.contactMaterial){const a=wn((l,c,h)=>{const u=l.createRadialGradient(c/2,h/2,0,c/2,h/2,c/2);u.addColorStop(0,"rgba(22,15,9,.72)"),u.addColorStop(.5,"rgba(22,15,9,.4)"),u.addColorStop(1,"rgba(22,15,9,0)"),l.fillStyle=u,l.fillRect(0,0,c,h)},128,128);this.contactMaterial=new Uo({map:a,transparent:!0,depthWrite:!1,opacity:o,polygonOffset:!0,polygonOffsetFactor:-1})}this.plane(e,s,t,i,r,this.contactMaterial,[-Math.PI/2,0,0])}plaque(e,t,i,r,s,o,a=[0,0,0],l={}){const c=wn((u,f,p)=>{u.fillStyle=l.bg||"#433525",u.fillRect(0,0,f,p),u.strokeStyle=l.ink||"#d3b478",u.lineWidth=3,u.strokeRect(12,12,f-24,p-24),u.textAlign="center",u.textBaseline="middle",o.forEach((m,_)=>{u.font=`${_===0?34:23}px Georgia`,u.fillStyle=l.ink||"#d3b478",u.fillText(m,f/2,p*(_+1)/(o.length+1),f-40)})},512,Math.max(128,Math.round(512*s/r))),h=new yi({map:c,roughness:.87});this.plane(e,t,i,r,s,h,a)}light(e,t,i,r,s,o,a=2){const l=new hu(r,s,o,a);return l.position.set(e,t,i),this.scene.add(l),l}finish(){let e=0,t=0;for(const{material:i,shadow:r,geometries:s}of this.batches.values()){if(!s.length)continue;const o=eg(s,!1);if(!o)throw new Error("Geometry batch could not be merged.");const a=new jt(o,i);a.castShadow=r,a.receiveShadow=!0,a.name=`Static ${i.type} batch`,a.geometry.computeBoundingSphere(),this.scene.add(a),e+=o.attributes.position.count,t+=s.length;for(const l of s)l.dispose()}return this.batches.clear(),{staticBatches:this.scene.children.filter(i=>i.isMesh).length,sourcePieces:t,vertices:e,colliders:this.colliders,interactions:this.interactions}}}const De=Math.PI;function ng(n,e,t,i,r,s,o=.5,a=0,l=!1){const c=Math.ceil(s/.55),h=s/c;for(let u=0;u<c;u++){let f=i,p=!0;for(;f<r-.03;){const m=r-f,_=p&&u%2?.63:n.random(.92,1.45),g=m>_&&m-_<.3?m:Math.min(m,_);p=!1;const d=l?n.m.darkStone:n.m.stone[Math.floor(n.random(0,7))],A=f+g/2,E=a+(u+.5)*h;e==="x"?n.stoneBox(A,E,t,g-.018,h-.018,o+n.random(-.035,.035),d):n.stoneBox(t,E,A,o+n.random(-.035,.035),h-.018,g-.018,d),f+=g}}}function xn(n,e,t,i,r,s,o=.5,a=0,l=!0){e==="x"?(n.box((i+r)/2,a+s/2,t,r-i,s,o*.94,n.m.mortar),l&&n.collide((i+r)/2,t,r-i,o,"wall")):(n.box(t,a+s/2,(i+r)/2,o*.94,s,r-i,n.m.mortar),l&&n.collide(t,(i+r)/2,o,r-i,"wall")),ng(n,e,t,i,r,s,o,a)}function Go(n,e,t,i,r=.035,s=[0,0,0]){n.cylinder(e,t,i,r,r,.028,n.m.blackIron,6,s)}function Xi(n,e,t,i,r=1,s=!1,o=7){const a=n.m,l=r;s&&(n.box(e,t+.08*l,i-.13*l,.17*l,.5*l,.045*l,a.blackIron),n.beam([e,t-.2*l,i-.1*l],[e,t-.1*l,i+.18*l],.035*l,.035*l,a.blackIron)),n.cylinder(e,t-.21*l,i,.18*l,.16*l,.08*l,a.blackIron),n.cylinder(e,t-.1*l,i,.14*l,.12*l,.16*l,a.brass),n.cylinder(e,t+.1*l,i,.13*l,.13*l,.26*l,a.lamp,10);for(let c=0;c<4;c++){const h=De/4+c*De/2;n.pole([e+Math.cos(h)*.147*l,t-.06*l,i+Math.sin(h)*.147*l],[e+Math.cos(h)*.147*l,t+.28*l,i+Math.sin(h)*.147*l],.016*l,a.blackIron)}n.cylinder(e,t+.28*l,i,.06*l,.19*l,.09*l,a.blackIron),n.ring(e,t+.4*l,i,.065*l,.015*l,a.blackIron),n.light(e,t+.13*l,i+(s?.2:0),"#ffd59b",o,6.5*l)}function el(n,e,t,i,r,s,o=.5){const a=n.m;for(const l of[-1,1]){n.box(e+l*(i/2+.065),r/2,t,.16,r,o+.1,s),n.box(e+l*(i/2+.065),.13,t,.25,.26,o+.2,a.darkStone);for(let c=.4;c<r;c+=.7)n.box(e+l*(i/2+.065),c,t+o/2+.057,.17,.11,.025,a.blackIron),Go(n,e+l*(i/2+.065),c,t+o/2+.08,.025,[De/2,0,0])}n.box(e,r+.085,t,i+.35,.22,o+.1,s),n.box(e,.025,t,i,.05,o+.1,a.darkWood)}function tl(n,e){const t=n.m,i=6.1,r=3.9,s=4.5;for(const a of[-1,1]){const l=a*6.35;n.box(l,.28,e,1.6,.56,1.55,t.darkStone),n.collide(l,e,1.55,1.5,"roost pier");for(let c=0;c<6;c++)n.box(l,.56+.59*(c+.5),e,1.08-c*.025,.58,1.05,t.stone[(c+2)%7]);n.box(l,4.24,e,1.38,.55,1.33,t.darkStone),n.box(l,1.85,e+.546,1.1,.25,.07,t.blackIron);for(const c of[-.38,.38])Go(n,l+c,1.85,e+.594,.055,[De/2,0,0])}const o=21;for(let a=0;a<o;a++){const l=a*De/o+.004,c=(a+1)*De/o-.004,h=new Vr;h.moveTo(Math.cos(l)*i,s+Math.sin(l)*r),h.lineTo(Math.cos(c)*i,s+Math.sin(c)*r),h.lineTo(Math.cos(c)*(i+.5),s+Math.sin(c)*(r+.49)),h.lineTo(Math.cos(l)*(i+.5),s+Math.sin(l)*(r+.49)),h.closePath();const u=new Ki(h,{depth:1,bevelEnabled:!0,bevelSize:.018,bevelThickness:.018,bevelSegments:1,steps:1});n.add(u,t.stone[(a+2)%7],[0,0,e-.5])}n.pole([-6.3,4.5,e],[6.3,4.5,e],.042,t.blackIron,8)}function ig(n=1){return To((e,t,i)=>{e.clearRect(0,0,t,i);for(let r=0;r<4;r++){const s=t*(.16+r*.22);e.lineWidth=7+r,e.strokeStyle="#272117bb",e.beginPath(),e.moveTo(s+33,35+n*r*13%90),e.bezierCurveTo(s-22,i*.36,s+28,i*.69,s-27,i-30-r*30),e.stroke(),e.lineWidth=2,e.strokeStyle="#e3cba26b",e.translate(5,0),e.stroke(),e.translate(-5,0)}})}function rg(n){const e=n.m;n.box(0,-.13,.95,5.7,.26,7.5,e.darkWood);for(let s=-2.73;s<2.8;s+=.255)for(let o=-2.8;o<4.7;o+=1.875){n.box(s,-.015+n.random(-.003,.003),o+.935,1.855,.045,.243,e.wood[Math.floor(n.random(1,7))],[0,De/2,0],!1);for(const a of[.08,1.78])n.cylinder(s-.075,.011,o+a,.008,.008,.012,e.blackIron,6)}for(const s of[-2.85,2.85])n.box(s,1.5,.95,.35,3,7.5,e.plaster),n.collide(s,.95,.35,7.5,"bedroom wall");n.box(0,1.5,4.7,6.05,3,.36,e.plaster),n.collide(0,4.7,6.1,.36,"entrance wall"),n.box(-1.175,1.5,-2.8,3.35,3,.34,e.plaster),n.collide(-1.175,-2.8,3.35,.34,"bedroom doorway wall"),n.box(2.45,1.5,-2.8,.8,3,.34,e.plaster),n.collide(2.45,-2.8,.8,.34,"bedroom doorway wall"),n.box(1.275,2.7,-2.8,1.55,.6,.34,e.plaster),el(n,1.275,-2.8,1.55,2.4,e.darkWood,.36),n.box(0,3.04,.95,6.1,.18,7.8,e.darkWood);for(let s=-2.45;s<4.7;s+=1.85){n.box(0,2.84,s,5.55,.22,.22,e.darkWood);for(const o of[-2.61,2.61])n.box(o,2.65,s,.24,.5,.24,e.darkWood)}for(const s of[-2.61,2.61])n.box(s,.16,.95,.15,.3,7.5,e.darkWood),n.box(s,1.01,.95,.075,.11,7.5,e.darkWood);for(const s of[-2.61,4.5])n.box(0,.16,s,5.5,.3,.15,e.darkWood);for(const s of[-1.85,.35,2.55])for(const o of[-2.64,2.64]){n.box(o,.52,s,.07,1.05,.1,e.wood[2]);for(let a=0;a<1.95&&s+a<4.5;a+=.22)n.box(o,.5,s+a,.05,.92,.21,e.wood[3],[0,0,0],!1)}n.box(1.2,1.25,4.49,1.48,2.5,.1,e.darkWood);for(let s=.54;s<1.9;s+=.17)n.box(s,1.23,4.423,.157,2.37,.04,e.wood[2]);for(const s of[.55,1.75])n.box(1.2,s,4.39,1.43,.085,.035,e.blackIron);n.ring(1.65,1.24,4.35,.075,.015,e.brass),n.plaque(1.2,2.76,4.49,.85,.2,["KEEPER"],[0,De,0]);const t=-1.65;n.box(t,2.07,4.47,1.35,1.4,.15,e.darkWood),n.plane(t,2.08,4.379,1.16,1.24,e.blueWindow,[0,De,0]);for(const s of[-.59,0,.59])n.box(t+s,2.08,4.34,.045,1.27,.045,e.blackIron);for(const s of[1.45,1.85,2.28,2.71])n.box(t,s,4.34,1.22,.035,.05,e.blackIron);n.box(t,1.42,4.18,1.6,.1,.44,e.wood[3]),n.light(t,2.1,3.8,"#acc9db",8,6.3),n.box(1.85,-.13,-6.55,3.7,.26,7.5,e.mortar);for(let s=-10.3;s<-2.8;s+=.75)for(let o=.25;o<3.65;o+=.67)n.box(o+.32,-.008,s+.37,.64,.075,.72,e.floor[Math.floor(n.random(0,6))],[0,n.random(-.005,.005),0],!1);xn(n,"z",.05,-10.3,-2.8,3.05,.4),xn(n,"z",3.65,-10.3,-2.8,3.05,.4),n.box(1.85,3.13,-6.55,3.8,.16,7.5,e.darkWood);for(let s=-9.7;s<-3;s+=1.55){n.box(1.85,2.97,s,3.7,.2,.22,e.darkWood);for(const o of[.3,3.42])n.box(o,2.53,s,.15,.85,.2,e.darkWood)}n.box(0,-.2,-17.15,15.4,.4,14.3,e.mortar);for(let s=-24;s<-10.3;s+=1)for(let o=-7.35;o<7.35;o+=1.05){const a=Math.min(1.05,7.4-o),l=Math.min(1,-10.3-s);n.box(o+a/2,-.025+n.random(-.005,.005),s+l/2,a-.022,.07,l-.024,e.floor[Math.floor(n.random(0,6))],[0,n.random(-.003,.003),0],!1)}xn(n,"x",-10.3,-7.65,.55,8.8,.55),xn(n,"x",-10.3,2.7,7.65,8.8,.55),xn(n,"x",-10.3,.55,2.7,6.08,.55,2.72,!1),el(n,1.625,-10.3,2.15,2.72,e.darkWood,.55),xn(n,"z",-7.65,-24.35,-10.3,8.8,.55),xn(n,"z",7.65,-24.35,-10.3,8.8,.55),xn(n,"x",-24.35,-7.65,7.65,8.8,.6);for(const s of[-10.3,-24.35]){const o=new Vr;o.moveTo(-7.65,8.73),o.lineTo(7.65,8.73),o.lineTo(0,10.96),o.closePath(),n.add(new Ki(o,{depth:.5,bevelEnabled:!1}),e.darkStone,[0,0,s-.25]),n.box(0,8.76,s,15.3,.24,.34,e.darkWood)}tl(n,-12.25),tl(n,-22.65);const i=Math.atan2(2.25,7.7);for(const s of[-1,1])n.box(s*3.82,9.82,-17.3,8.04,.22,14.7,e.soot,[0,0,s*-i]);for(let s=-23.8;s<-10.3;s+=.62)for(const o of[-1,1])n.beam([o*.03,10.85,s],[o*7.7,8.6,s],.11,.17,e.darkWood);for(const s of[-16.3,-19.6]){n.box(0,6,s,14.8,.44,.44,e.darkWood),n.beam([-7,6,s],[0,10.5,s],.43,.44,e.darkWood),n.beam([7,6,s],[0,10.5,s],.43,.44,e.darkWood),n.box(0,8.17,s,.4,4.38,.44,e.darkWood);for(const o of[-1,1])n.beam([o*3.6,6,s],[o*.15,8.8,s],.25,.29,e.wood[1]),n.box(o*6.9,5.35,s,.55,1.55,.56,e.darkWood),n.box(o*6.9,5.8,s+.31,.58,.24,.08,e.blackIron);n.box(0,6,s+.25,.8,.5,.07,e.blackIron);for(const o of[-.28,.28])for(const a of[5.86,6.14])Go(n,o,a,s+.3,.046,[De/2,0,0])}for(const s of[-4.2,0,4.2]){n.box(s,6.2,-24.03,1.05,2.6,.16,e.darkStone),n.plane(s,6.2,-23.93,.72,2.23,e.blueWindow);for(const o of[-.3,0,.3])n.box(s+o,6.2,-23.88,.045,2.28,.06,e.blackIron);for(let o=5.15;o<=7.25;o+=.35)n.box(s,o,-23.86,.75,.033,.05,e.blackIron);n.box(s,4.99,-23.82,1.15,.16,.42,e.darkStone)}for(const s of[-5.43,4.05])for(let o=-22;o<-14;o+=.52)n.box(s,.018,o,.075,.008,.36,e.darkStone,[0,0,0],!1);for(let s=-5.4;s<4.1;s+=.5)n.box(s,.018,-15.35,.36,.008,.075,e.darkStone,[0,0,0],!1);const r=ig(4);n.plane(-7.346,2.6,-17.9,3.25,4.3,r,[0,De/2,0]),n.plane(-3.6,3.2,-24.028,3.5,4.7,r),n.plane(7.346,1.92,-14.9,2.2,2.8,r,[0,-De/2,0]),n.plaque(1.63,3.18,-9.98,1.7,.3,["ROOST · RING BEFORE ENTRY"]),n.plaque(1.63,3.18,-10.62,1.7,.3,["KEEPER’S QUARTERS"],[0,De,0]),n.inspect(-7.15,2,-17.9,"A familiar stretch","Four furrows, longer than your arm. She stretches against this pier every morning. The iron shoe was added after the third repair.","MARKS IN THE STONE",3.2),Xi(n,2.96,2.02,-10.78,.85,!0,11)}function qr(n,e,t,i,r,s,o=16){n.add(new zo(r.map(a=>new le(...a)),o),s,[e,t,i])}function fi(n,e,t,i,r=1,s=n.m.ceramic,o=!1){qr(n,e,t,i,[[.04*r,0],[.12*r,.02*r],[.145*r,.16*r],[.12*r,.25*r],[.09*r,.28*r],[.09*r,.3*r]],s),n.cylinder(e,t+.272*r,i,.086*r,.086*r,.005*r,n.m.dark,16),o&&n.cylinder(e,t+.31*r,i,.1*r,.1*r,.055*r,n.m.cork)}function Ql(n,e,t,i,r=1){qr(n,e,t,i,[[.07,0],[.085,.02],[.085,.14],[.078,.15],[.069,.14],[.066,.025]],n.m.greenCeramic),n.ring(e+.1,t+.09,i,.044,.012,n.m.greenCeramic,[0,De/2,0]),n.cylinder(e,t+.115,i,.066,.066,.005,n.m.dark,16)}function ec(n,e,t,i,r,s,o,a,l=0){n.box(e,t+o/2,i,r,o,s,a,[0,l,0]),n.box(e,t+o/2,i,r-.025,o-.022,s-.018,n.m.paper,[0,l,0]),n.box(e-Math.cos(l)*(r/2-.012),t+o/2,i+Math.sin(l)*(r/2-.012),.035,o,s,a,[0,l,0])}function sg(n,e,t,i){n.box(e,t,i,.62,.035,.41,n.m.darkLeather,[0,-.17,0]);const r=wn((o,a,l)=>{o.fillStyle="#dcc69e",o.fillRect(0,0,a,l),o.fillStyle="#685438",o.font="italic 24px Georgia",o.fillText("Ember — autumn care",22,42),o.strokeStyle="#8b75534d",o.lineWidth=1;for(let c=66;c<l-12;c+=28)o.beginPath(),o.moveTo(20,c),o.lineTo(a-22,c),o.stroke();o.font="19px Georgia",["Morning: clean the water","Brush behind the left wing","Check the old harness seam","Warm stones before dusk","Extra pear. She was patient."].forEach((c,h)=>o.fillText(c,25,93+h*28)),o.strokeStyle="#594530",o.lineWidth=2,o.beginPath(),o.moveTo(a*.79,l*.82),o.quadraticCurveTo(a*.9,l*.5,a*.87,l*.33),o.quadraticCurveTo(a*.7,l*.35,a*.78,l*.7),o.lineTo(a*.69,l*.76),o.stroke()},768,512),s=new yi({map:r,roughness:1});n.plane(e,t+.025,i,.58,.38,s,[-De/2,0,.17]),n.box(e,t+.027,i,.013,.01,.39,n.m.darkLeather,[0,-.17,0]),n.inspect(e,t,i,"The daily ledger","Water first. Brush behind the left wing. Check the old harness seam. Warm the stones before dusk. The last line, squeezed beneath the others: “Extra pear. She was patient.”")}function nl(n,e,t,i,r,s,o,a,l=0){const c=new Gr(1,24,12),h=c.attributes.position;for(let u=0;u<h.count;u++){const f=h.getX(u),p=h.getY(u),m=h.getZ(u);h.setXYZ(u,f*r/2,p*o/2+Math.sin(f*12+l)*Math.cos(m*9)*.016,m*s/2)}c.computeVertexNormals(),n.add(c,a,[e,t,i])}function di(n,e,t,i,r,s,o,a=0,l=[0,0,0]){const u=[],f=[],p=[];for(let _=0;_<=20;_++)for(let g=0;g<=22;g++){const d=g/22,A=_/20,E=(d-.5)*r,x=(A-.5)*s;let R=.055*Math.sin(d*32+A*7+a)+.026*Math.sin(A*51+d*4);const b=Math.max(Math.abs(d-.5)-.38,0)+Math.max(Math.abs(A-.5)-.43,0);R-=b*2,u.push(E,R,x),f.push(d*3,A*3)}for(let _=0;_<20;_++)for(let g=0;g<22;g++){const d=_*23+g,A=d+22+1;p.push(d,A,d+1,d+1,A,A+1)}const m=new At;m.setAttribute("position",new ot(u,3)),m.setAttribute("uv",new ot(f,2)),m.setIndex(p),m.computeVertexNormals(),n.add(m,o,[e,t,i],l)}function og(n,e,t,i=1){n.cylinder(e,.48*i,t,.24*i,.25*i,.07*i,n.m.wood[3],14);for(let r=0;r<3;r++){const s=r*De*2/3;n.beam([e+Math.cos(s)*.2*i,.025,t+Math.sin(s)*.2*i],[e+Math.cos(s)*.15*i,.47*i,t+Math.sin(s)*.15*i],.055*i,.055*i,n.m.darkWood)}n.ring(e,.18*i,t,.16*i,.017*i,n.m.darkWood,[De/2,0,0]),n.collide(e,t,.5*i,.5*i,"stool")}function ag(n,e,t){for(const i of[-.12,.13]){n.sphere(e+i,.09,t,.09,.09,.2,n.m.darkLeather),n.cylinder(e+i,.22,t+.08,.065,.09,.3,n.m.leather,10),n.cylinder(e+i,.373,t+.08,.064,.064,.01,n.m.dark,10);for(let r=.17;r<.36;r+=.045)n.box(e+i,r,t-.005,.095,.012,.015,n.m.darkLeather)}}function lg(n,e,t,i,r,s,o=0){const a=wn((h,u,f)=>{h.fillStyle="#bfac80",h.fillRect(0,0,u,f),h.fillStyle="#8f9172",h.beginPath(),h.ellipse(u*.58,f*.67,u*.34,f*.11,-.1,0,De*2),h.fill(),h.strokeStyle="#554b35",h.lineWidth=5,h.lineJoin="round",h.beginPath(),h.moveTo(u*.18,f*.7),h.bezierCurveTo(u*.45,f*.86,u*.82,f*.76,u*.8,f*.45),h.lineTo(u*.91,f*.38),h.lineTo(u*.79,f*.32),h.lineTo(u*.73,f*.16),h.lineTo(u*.65,f*.42),h.quadraticCurveTo(u*.53,f*.29,u*.48,f*.53),h.lineTo(u*.29,f*.26),h.lineTo(u*.33,f*.58),h.quadraticCurveTo(u*.17,f*.54,u*.18,f*.7),h.stroke(),h.fillStyle="#3d3528",h.beginPath(),h.arc(u*.785,f*.365,3,0,7),h.fill(),h.font="italic 26px Georgia",h.fillText("Ember, age two",u*.25,f*.93)},512,512),l=new yi({map:a,roughness:1});n.plane(e,t,i,r,s,l,[0,o,0]);const c=new P(Math.cos(o),0,-Math.sin(o));for(const h of[-1,1])n.box(e+c.x*h*(r/2+.027),t,i+c.z*h*(r/2+.027),.07,s+.12,.06,n.m.darkWood,[0,o,0]);for(const h of[-s/2-.025,s/2+.025])n.box(e,t+h,i,r+.12,.07,.06,n.m.darkWood,[0,o,0])}function tc(n,e,t,i,r=.46,s=.22,o=0){n.box(e,t,i,r,.07,s,n.m.paleWood,[0,o,0]);for(let a=-r/2+.03;a<r/2;a+=.035)for(let l=-s/2+.02;l<s/2;l+=.032){const c=a*Math.cos(o)+l*Math.sin(o),h=-a*Math.sin(o)+l*Math.cos(o);n.cylinder(e+c,t+.1+n.random(0,.01),i+h,.008,.01,.14,n.m.straw[1],5)}n.ring(e,t-.06,i,.12,.022,n.m.darkLeather,[De/2,0,0])}function nc(n,e,t,i,r=1){const s=n.m;for(let o=0;o<14;o++){const a=o*De*2/14,l=.19*r;n.box(e+Math.sin(a)*l,t+.19*r,i+Math.cos(a)*l,.084*r,.35*r,.035*r,s.wood[o%7],[0,a,0])}n.cylinder(e,t+.03*r,i,.18*r,.16*r,.05*r,s.darkWood,14),n.cylinder(e,t+.08*r,i,.17*r,.17*r,.01*r,s.dark,14);for(const o of[.09,.28])n.ring(e,t+o*r,i,.203*r,.015*r,s.blackIron,[De/2,0,0]);n.rope([[e-.2*r,t+.28*r,i],[e-.16*r,t+.51*r,i],[e,t+.59*r,i],[e+.16*r,t+.51*r,i],[e+.2*r,t+.28*r,i]],.013*r,s.blackIron,14)}function il(n,e,t,i=.36,r=.82){const s=n.m;qr(n,e,0,t,[[i*.83,.025],[i,.19*r],[i*1.04,.5*r],[i,.82*r],[i*.85,r]],s.wood[2],18);for(const o of[.09,.34,.73])n.ring(e,o*r,t,i*(o===.34?1.042:.91),.026,s.blackIron,[De/2,0,0],24);n.cylinder(e,r+.01,t,i*.85,i*.85,.035,s.wood[4],18);for(let o=-2;o<3;o++)n.box(e+o*i*.3,r+.031,t,.008,.006,i*1.48,s.darkWood);n.collide(e,t,i*2.12,i*2.12,"barrel")}function cg(n,e,t,i,r,s){n.box(e,t,i,r,.09,s,n.m.wood[3]);for(const o of[-1,1])n.beam([e+o*(r/2-.11),t-.34,i+s/2-.03],[e+o*(r/2-.11),t-.045,i-s/2+.05],.045,.045,n.m.blackIron)}function hg(n){const e=n.m,t=-1.55,i=2.2;for(const a of[t-.77,t+.77])for(const l of[i-1.2,i+1.2])n.box(a,.34,l,.12,.68,.12,e.darkWood);for(const a of[t-.77,t+.77])n.box(a,.4,i,.11,.22,2.54,e.wood[2]);for(const a of[i-1.2,i+1.2])n.box(t,.39,a,1.6,.23,.11,e.wood[2]);for(let a=i-1.15;a<i+1.15;a+=.2)n.box(t,.44,a,1.49,.055,.1,e.paleWood);n.box(t,.69,i-1.2,1.68,.82,.1,e.darkWood);for(let a=t-.7;a<t+.76;a+=.19)n.box(a,.82,i-1.262,.15,.54,.03,e.wood[4]);nl(n,t,.61,i,1.54,2.36,.32,e.cloth,3),di(n,t,.77,i+.22,1.62,1.93,e.blanket,3),nl(n,t,.8,i-.78,.98,.44,.21,e.cloth);for(let a=i-.45;a<i+1.12;a+=.25)for(let l=t-.66;l<t+.72;l+=.26)n.box(l,.815+Math.sin(a*6+l*9)*.025,a,.005,.005,.17,e.cloth,[0,0,0],!1);n.collide(t,i,1.77,2.67,"bed"),n.contact(t,i,2.1,3),n.inspect(t,.8,i-.5,"The narrow bed","The quilt has been repaired with sailcloth from an old wing sling. A larger patch hangs over the foot of the bed. Even off duty, the keeper sleeps within earshot of the roost.");const r=wn((a,l,c)=>{a.fillStyle="#75503a",a.fillRect(0,0,l,c),a.strokeStyle="#c4a475",a.lineWidth=20,a.strokeRect(38,38,l-76,c-76),a.lineWidth=4,a.strokeRect(66,66,l-132,c-132);for(let h=100;h<c-75;h+=74)for(let u=105;u<l-75;u+=75)a.fillStyle="#b49563",a.beginPath(),a.moveTo(u,h-20),a.lineTo(u+14,h),a.lineTo(u,h+20),a.lineTo(u-14,h),a.closePath(),a.fill();for(let h=0;h<c;h+=3)a.fillStyle=h%2?"#c7ba8d16":"#21170c25",a.fillRect(0,h,l,1);a.fillStyle="#bba88015",a.beginPath(),a.ellipse(l/2,c/2,l*.4,c*.34,0,0,7),a.fill()},512,768);n.plane(.02,.025,1.13,1.31,2.3,new yi({map:r,roughness:1}),[-De/2,0,0]);for(let a=-.6;a<.67;a+=.037)for(const l of[-.055,2.315])n.box(a,.026,l,.012,.009,.085,e.cloth,[0,n.random(-.2,.2),0],!1);n.box(-1.53,.3,.28,1.12,.58,.48,e.wood[3]),n.box(-1.53,.6,.28,1.16,.065,.52,e.wood[4]),n.box(-1.53,.28,.535,.13,.33,.025,e.blackIron),n.ring(-1.53,.4,.56,.043,.011,e.brass),n.collide(-1.53,.28,1.15,.53,"bedside chest"),ec(n,-1.78,.64,.22,.23,.32,.075,e.burgundy,.18),n.cylinder(-1.22,.69,.3,.055,.06,.1,e.wax,10),n.box(-1.22,.75,.3,.012,.023,.013,e.dark),n.contact(-1.53,.28,1.43,.79);const s=2.19,o=1.68;n.box(s,.8,o,.95,.09,1.76,e.wood[4]);for(const a of[s-.34,s+.34])for(const l of[o-.72,o+.72])n.box(a,.4,l,.075,.77,.075,e.darkWood);n.box(s+.21,.53,o-.33,.46,.48,.71,e.wood[2]);for(const a of[.42,.64])n.box(s-.03,a,o-.33,.025,.17,.64,e.wood[4]),n.sphere(s-.055,a,o-.33,.027,.027,.027,e.brass,8);n.collide(s,o,.95,1.76,"writing desk"),sg(n,s-.1,.86,o+.13),Xi(n,s+.07,1.07,o-.58,.55,!1,10),Ql(n,s-.22,.854,o+.63),n.contact(s,o,1.38,2.14),n.contact(1.15,1.75,.72,.72),n.pole([s-.34,.88,o-.06],[s+.1,.88,o-.25],.008,e.paleWood,6),n.sphere(s-.29,.88,o-.62,.06,.07,.063,e.pear),n.sphere(s-.17,.89,o-.68,.038,.052,.042,e.pear),n.ring(s-.37,.867,o+.55,.04,.009,e.brass,[De/2,0,0]),n.ring(s-.32,.867,o+.58,.04,.009,e.brass,[De/2,0,0]),og(n,1.15,1.75,.93),ag(n,1.12,3.58),lg(n,2.635,1.96,1.67,.61,.67,-De/2),n.inspect(2.4,1.8,1.7,"Before the great wings","A faded drawing of Ember curled in a washbasin. The frame has been carefully polished; the desk beneath it has not. The paper is dated twenty-three years ago.","A SMALL PORTRAIT"),n.box(-2.05,1.08,-1.65,1.1,2.12,.65,e.darkWood);for(const a of[-2.31,-1.79])n.box(a,1.12,-1.305,.49,1.94,.055,e.uprightWood),n.sphere(a+(a<-2?.17:-.17),1,-1.257,.028,.028,.024,e.brass,8);n.box(-2.05,2.18,-1.65,1.2,.1,.75,e.wood[2]),n.collide(-2.05,-1.65,1.2,.78,"wardrobe"),n.contact(-2.05,-1.65,1.45,1.01),n.box(-.62,.78,-2.28,.77,.08,.63,e.wood[3]);for(const a of[-.93,-.3])for(const l of[-2.52,-2.05])n.box(a,.38,l,.045,.75,.045,e.darkWood);qr(n,-.62,.83,-2.28,[[.02,0],[.16,.02],[.26,.16],[.25,.18],[.22,.16],[.08,.055]],e.ceramic,24),n.cylinder(-.62,.9,-2.28,.17,.17,.007,e.water,24),fi(n,-.2,.83,-2.35,.47,e.greenCeramic),n.collide(-.62,-2.28,.8,.65,"washstand"),n.box(-.58,1.6,-2.595,.59,.04,.035,e.darkWood),di(n,-.58,1.3,-2.51,.4,.62,e.cloth,2,[De/2,0,0]),cg(n,-.7,2,-2.47,.85,.27),fi(n,-.98,2.05,-2.46,.48,e.ceramic,!0),fi(n,-.63,2.05,-2.46,.6,e.greenCeramic,!0),n.plaque(1.26,2.64,-2.595,1,.18,["THE NIGHT SHIFT"]),Xi(n,-.25,2.4,-.5,.45,!1,9),n.pole([-.25,2.6,-.5],[-.25,2.91,-.5],.012,e.blackIron)}function ug(n){const e=n.m;n.box(.31,2,-3.65,.08,.1,.68,e.darkWood),n.pole([.32,1.96,-3.65],[.53,1.96,-3.65],.016,e.blackIron),n.rope([[.53,1.98,-3.65],[.57,1.84,-3.87],[.59,1.68,-3.65],[.57,1.84,-3.42],[.53,1.98,-3.65]],.015,e.darkLeather,20),di(n,.55,1.25,-3.65,.92,.55,e.blanket,7,[0,0,-De/2]),n.box(.59,1.37,-3.65,.025,.04,.59,e.darkLeather),n.box(.605,1.12,-3.65,.025,.2,.21,e.darkLeather);const t=3.07,i=-4.65;n.box(t,.46,i,.68,.9,2.1,e.darkWood),n.box(t,.97,i,.8,.09,2.25,e.wood[4]),n.collide(t,i,.82,2.26,"service cabinet"),n.contact(t,i,1.2,2.55);for(const r of[i-.71,i,i+.71])n.box(2.704,.48,r,.04,.7,.65,e.wood[3]),n.ring(2.674,.67,r,.036,.009,e.brass,[0,De/2,0]);for(const r of[1.5,2.18]){n.box(3.24,r,i,.5,.07,2.16,e.wood[3]);for(let s=i-.9;s<i+1;s+=.3)fi(n,3.24,r+.045,s,n.random(.55,.92),s>-4.5?e.greenCeramic:e.ceramic,!0)}for(const r of[i-.91,i+.91])n.box(3.43,1.55,r,.08,1.48,.08,e.darkWood);n.plaque(2.664,1.09,-4.65,.34,.17,["SALVES"],[0,-De/2,0]),tc(n,2.97,1.05,-4.04,.4,.22,.12),fi(n,2.96,1.02,-5.25,.6,e.greenCeramic,!0),n.box(2.93,1.025,-4.72,.37,.055,.36,e.cloth,[0,.12,0]),n.inspect(2.9,1.3,-4.8,"Salves and wing linen","Cooling salve, clean linen and a jar of honey. The cabinet is ordered by use, not size. A fresh square of linen waits beside the brush; the old pieces are washed and used again.","THE SERVICE CABINET"),n.box(.306,1.78,-5.48,.08,.17,2.5,e.darkWood);for(let r=-6.46;r<-4.35;r+=.4)n.pole([.38,1.72,r],[.55,1.72,r],.022,e.blackIron),n.ring(.53,1.71,r,.048,.012,e.blackIron,[0,De/2,0]);n.pole([.42,.12,-4.45],[.5,1.88,-4.52],.03,e.wood[4]),n.box(.47,.18,-4.45,.26,.31,.045,e.blackIron,[0,De/2,0]),n.pole([.47,.1,-4.93],[.47,1.91,-4.93],.025,e.paleWood);for(let r=-5.11;r<-4.72;r+=.04)n.pole([.48,.05,r],[.48,.37,-4.93],.014,e.straw[2],5);n.pole([.5,.18,-5.49],[.5,1.89,-5.49],.028,e.wood[3]),n.box(.5,.31,-5.49,.25,.12,.47,e.paleWood);for(let r=-5.71;r<-5.27;r+=.035)n.pole([.51,.27,r],[.59,.04,r],.009,e.straw[1],5);n.pole([.48,.2,-6],[.5,1.9,-6],.027,e.paleWood),n.box(.5,.24,-6,.21,.09,.57,e.blackIron);for(let r=-6.25;r<-5.74;r+=.068)n.pole([.5,.23,r],[.5,.08,r],.013,e.blackIron,5);n.collide(.49,-5.5,.53,2.5,"tool rack"),n.inspect(.5,1.2,-5.45,"The morning tools","A broad rake for yesterday’s straw, a soft brush for the wing joints, and a scraper for the hearth. Their handles shine where the same hands have held them for years.","DAILY WORK"),n.box(.305,2.43,-8.17,.1,.14,2.2,e.darkWood);for(const r of[-8.95,-7.38])n.pole([.33,2.4,r],[.67,2.4,r],.03,e.blackIron);for(const r of[-8.9,-7.43]){n.rope([[.6,2.4,r],[.62,1.93,r+.1],[.68,.8,r+.12],[.68,.6,r-.02],[.63,1.44,r-.11],[.6,2.4,r]],.06,e.leather,26),n.box(.77,1.51,r,.042,.3,.15,e.brass);for(let s=1.36;s<1.67;s+=.065)n.box(.797,s,r,.014,.008,.145,e.darkLeather)}n.box(.51,1.34,-8.16,.2,1.26,1.15,e.darkLeather),n.box(.625,1.35,-8.16,.035,1.03,.91,e.burgundy);for(let r=-8.61;r<-7.68;r+=.095)for(const s of[.86,1.87])n.box(.653,s,r,.018,.035,.022,e.cloth);n.rope([[.6,2.4,-8.3],[.8,2,-8.3],[.8,1.8,-8.3],[.6,1.64,-8.3]],.034,e.darkLeather,18),n.collide(.54,-8.15,.64,2.1,"hanging harness"),n.inspect(.62,1.5,-8.16,"The old flying harness","The buckles are much wider than a human hand. New linen pads the wing roots; one leather strap has three neat repairs. A brass tag reads: EMBER — LEFT SIDE FIRST."),n.box(3.12,.4,-8.47,.65,.8,1.52,e.wood[2]),n.collide(3.12,-8.47,.78,1.6,"linen chest");for(let r=.84;r<1.15;r+=.09)n.box(3.1,r,-8.45,.53,.085,1.26,r<1?e.cloth:e.burgundy,[0,n.random(-.03,.03),0]);for(const r of[-7.78,-9]){n.box(3.42,1.65,r,.06,.19,.15,e.blackIron);for(let s=0;s<5;s++)n.ring(3.25-s*.012,1.42,r,.18+s*.007,.016,e.darkLeather,[0,De/2,0])}n.plaque(2.713,1.33,-8.45,.65,.17,["CLEAN WING LINEN"],[0,-De/2,0]),Xi(n,1.85,2.5,-6.65,.66,!1,15),n.pole([1.85,2.91,-6.65],[1.85,2.75,-6.65],.014,e.blackIron),n.cylinder(.86,2.17,-9.96,.055,.13,.2,e.brass,16),n.sphere(.86,2.08,-9.96,.025,.025,.025,e.blackIron,8),n.rope([[.86,2.05,-9.96],[.9,1.83,-9.91],[.87,1.44,-9.94]],.012,e.darkLeather,12),n.ring(.87,1.39,-9.94,.045,.016,e.paleWood),n.inspect(.87,1.75,-9.94,"One bell, then wait","A gentle ring before entering. Not because she is dangerous: because waking anyone by surprise is unkind. The floor is kept clear all the way around her resting deck.","THE KEEPER’S RULE",2.4),n.box(3.18,1.76,-9.993,.2,.64,.043,e.darkWood),n.box(3.18,1.76,-9.965,.048,.45,.025,e.paper),n.cylinder(3.18,1.7,-9.94,.013,.013,.35,e.brass,8),n.sphere(3.18,1.49,-9.93,.035,.035,.014,e.brass,10);for(let r=1.55;r<1.97;r+=.07)n.box(3.23,r,-9.93,.03,.007,.008,e.blackIron);nc(n,3.07,0,-6.66,1.1),n.collide(3.07,-6.66,.55,.55,"bucket")}function fg(n,e,t,i,r,s){const o=n.m;n.sphere(e,t-.04,i,r,.27,s,o.strawMass,32);for(let a=0;a<1650;a++){const l=n.random(0,De*2),c=Math.sqrt(n.random()),h=e+Math.cos(l)*r*c,u=i+Math.sin(l)*s*c,f=t+.21*Math.sqrt(1-c*c)+n.random(0,.075),p=n.random(.08,.42),m=n.random(0,De*2);n.box(h,f,u,.012,n.random(.008,.019),p,o.straw[Math.floor(n.random(0,6))],[n.random(-.12,.12),m,n.random(-.12,.12)],!1)}for(let a=0;a<75;a++){const l=e+n.random(-r*.8,r*.8),c=i+s+n.random(.58,1.05);n.box(l,.031,c,.014,.011,n.random(.12,.35),o.straw[a%6],[0,n.random(0,6.3),0],!1)}}function dg(n){const e=n.m,t=-.6,i=-19.78,r=7.6,s=4.45;n.box(0,2.83,-24,6.35,5.66,.21,e.darkWood);for(let m=-2.97;m<3.15;m+=.54)n.box(m,2.82,-23.861,.515,5.45,.09,e.uprightWood);for(const m of[-1,1]){n.stoneBox(m*3.31,2.9,-23.98,.38,5.8,.47,e.darkStone);for(const _ of[.76,2.8,4.75]){n.box(m*1.91,_,-23.783,2.43,.19,.07,e.blackIron),n.cylinder(m*3.04,_,-23.7,.09,.09,.38,e.iron,12);for(let g=.81;g<3.12;g+=.44)n.cylinder(m*g,_,-23.727,.039,.039,.025,e.brass,6,[De/2,0,0])}n.ring(m*.49,1.92,-23.69,.22,.04,e.iron)}n.box(0,5.72,-23.95,6.95,.36,.57,e.darkWood),n.box(0,1.35,-23.66,6.12,.22,.22,e.darkWood),n.box(0,1.33,-23.5,.42,.38,.08,e.blackIron),n.ring(0,1.18,-23.43,.075,.02,e.brass),n.collide(0,-23.96,6.5,.27,"closed flight gate"),n.plaque(0,5.23,-23.785,1.91,.35,["THE WINTER GATE"]),n.inspect(1.8,2.1,-23.7,"The winter gate","Two oak leaves, each taller than the entire keeper’s room. In fine weather they open to the landing ledge. Tonight the great bar is in place, keeping the warmth around an old friend.","BUILT FOR HER",3.3);const o=-1.33,a=-12.9;n.box(o,.49,a,.55,.09,.54,e.wood[3]);for(const m of[o-.22,o+.22])for(const _ of[a-.21,a+.21])n.box(m,.245,_,.05,.49,.05,e.darkWood);for(const m of[o-.23,o+.23])n.box(m,.74,a+.24,.05,1.02,.05,e.darkWood);for(const m of[.8,1])n.box(o,m,a+.24,.51,.1,.04,e.wood[3]);di(n,o,.58,a,.49,.45,e.rug,2),n.collide(o,a,.64,.69,"keeper’s chair"),n.contact(o,a,.9,.9),n.cylinder(-2.15,.59,-12.98,.28,.29,.06,e.wood[4],16),n.cylinder(-2.15,.3,-12.98,.075,.09,.58,e.darkWood,10);for(let m=0;m<3;m++){const _=m*De*2/3;n.beam([-2.15,.17,-12.98],[-2.15+Math.cos(_)*.24,.026,-12.98+Math.sin(_)*.24],.045,.045,e.darkWood)}ec(n,-2.19,.63,-12.95,.24,.31,.047,e.blanket,.14),Ql(n,-2.07,.63,-13.12),n.collide(-2.15,-12.98,.62,.62,"night-watch table"),n.contact(-2.15,-12.98,.85,.85),n.inspect(o,.8,a,"The night watch","A cushion, a book and a cup gone cold. The chair faces the resting deck, close enough to hear a change in breathing. The little doorway is only a few steps behind.","A PLACE TO KEEP COMPANY",2.6);for(const m of[t-r/2+.45,t,t+r/2-.45])for(const _ of[i-s/2+.32,i+s/2-.32]){n.box(m,.23,_,.85,.46,.95,e.darkStone),n.box(m,.48,_,.52,.3,.64,e.wood[1]),n.box(m,.57,_+.34,.55,.26,.06,e.blackIron);for(const g of[-.17,.17])n.cylinder(m+g,.58,_+.384,.04,.04,.025,e.blackIron,6,[De/2,0,0])}for(const m of[t-r/2+.18,t,t+r/2-.18])n.box(m,.64,i,.34,.32,s,e.darkWood);for(const m of[i-s/2+.16,i+s/2-.16])n.box(t,.69,m,r,.38,.31,e.wood[2]);for(let m=i-s/2+.2;m<i+s/2;m+=.31){n.box(t,.92,m,r,.17,.29,e.wood[Math.floor(n.random(0,7))]);for(const _ of[t-r/2+.2,t+r/2-.2])n.cylinder(_,1.011,m,.021,.021,.018,e.blackIron,6)}for(const m of[t-r/2+.45,t,t+r/2-.45]){n.box(m,.71,i+s/2+.015,.24,.4,.08,e.blackIron);for(const _ of[.6,.82])for(const g of[-.065,.065])n.cylinder(m+g,_,i+s/2+.065,.025,.025,.025,e.brass,6,[De/2,0,0]);n.beam([m-.37,.24,i+s/2-.2],[m+.4,.7,i+s/2-.2],.15,.13,e.darkWood)}n.collide(t,i,r+.12,s+.12,"dragon resting deck"),n.contact(t,i,r+1,s+1),fg(n,t-.3,1.14,i-.04,3.35,1.7),di(n,t+1.4,1.51,i+.57,3.07,2.31,e.burgundy,1);for(let m=t+.01;m<t+2.79;m+=.2)n.box(m,1.495,i+1.6,.065,.014,.025,e.cloth,[0,0,0],!1);di(n,t+1.75,1.565,i+.36,.77,.82,e.rug,2),n.inspect(t,.8,i+s/2+.1,"A bed built like a bridge","Six stone shoes, three oak joists, and iron knees through the front beam. The boards are replaced one at a time. The burgundy blanket began as two old winter cloaks; it now covers only a shoulder.","THE RESTING DECK",4.1);for(let m=0;m<4;m++)n.beam([t-2.2+m*.3,.86,i+s/2+.16],[t-1.9+m*.3,.5,i+s/2+.16],.021,.011,e.dark);const l=To((m,_,g)=>{for(let d=0;d<3;d++)m.lineWidth=5,m.strokeStyle="#392d2090",m.beginPath(),m.moveTo(_*.15+d*_*.19,g*.14),m.bezierCurveTo(_*.2+d*_*.19,g*.4,_*.43+d*_*.15,g*.48,_*.4+d*_*.15,g*.89),m.stroke(),m.lineWidth=1,m.strokeStyle="#e4d3af70",m.translate(4,0),m.stroke(),m.translate(-4,0)},512,512);n.plane(t-.28,.024,-16.66,2.48,1.4,l,[-De/2,0,0]);for(const m of[-1,1]){const _=t+m*3.35,g=i-1.9;n.box(_,.21,g,1.15,.42,1.15,e.darkStone),n.box(_,2.05,g,.58,3.7,.62,e.darkWood);for(const d of[.75,3.45]){n.box(_,d,g+.34,.67,.24,.08,e.blackIron),n.box(_,d,g-.34,.67,.24,.08,e.blackIron);for(const A of[-.2,.2])n.cylinder(_+A,d,g+.39,.049,.049,.03,e.blackIron,6,[De/2,0,0])}n.beam([_,1.02,g+.1],[_-m*1.02,3.55,g+.08],.24,.25,e.wood[2]),n.beam([_,.65,g-1],[_,3.7,g],.23,.26,e.darkWood),n.collide(_,g,1.1,1.15,"perch support")}n.cylinder(t,3.95,i-1.9,.38,.43,9.2,e.wood[3],18,[0,0,De/2]);for(const m of[t-3.35,t+3.35])n.ring(m,3.95,i-1.9,.428,.047,e.blackIron,[0,De/2,0]);for(let m=t-2.7;m<t+2.72;m+=.072)n.ring(m,3.95,i-1.9,.394,.022,e.darkLeather,[0,De/2,0],16);for(let m=0;m<10;m++)n.box(t+n.random(-2.5,2.5),4.295,i-1.9+n.random(-.12,.12),n.random(.12,.33),.008,.016,e.paleWood,[0,n.random(-.3,.3),0],!1);n.inspect(t+3.36,2.2,i-1.9,"The waiting perch","Oak thicker than the keeper’s waist, wrapped with replaceable leather to protect the talons. Great straps hold it to the uprights. Below, old scrape marks record years of landings.","THE PERCH",4.4);const c=5.66,h=-20.5;n.box(c,.19,h,1.62,.38,4.1,e.darkWood),n.box(c,.31,h,1.48,.055,3.88,e.blackIron);for(const m of[c-.73,c+.73])n.box(m,.57,h,.08,.72,4,e.blackIron);for(const m of[h-1.96,h+1.96])n.box(c,.57,m,1.54,.72,.08,e.blackIron);n.box(c,.89,h,1.27,.024,3.7,e.water,[0,0,0],!1);for(const m of[c-.75,c+.75])n.box(m,.93,h,.15,.16,4.05,e.iron);for(const m of[h-1.94,h+1.94])n.box(c,.93,m,1.6,.16,.15,e.iron);for(let m=h-1.7;m<h+1.8;m+=.28)n.sphere(c-.829,.57,m,.024,.024,.024,e.brass,8),n.box(c-.85,.37,m,.04,.61,.2,e.wood[2]);n.ring(c-.89,.64,h+1.45,.15,.027,e.blackIron,[0,De/2,0]),n.collide(c,h,1.8,4.16,"water trough"),n.contact(c,h,2.25,4.7),n.inspect(c-.8,.8,h+1.15,"Fresh water, twice a day","The old copper kettle on the rim is the keeper’s. The trough takes forty of them. A low drain and a long-handled brush make the daily cleaning possible.","A SHARED ROUTINE",3.1),fi(n,c-.35,1.03,h+1.85,.85,e.brass),n.pole([c-.67,1.17,h+1.9],[c-.5,1.22,h+1.85],.03,e.brass),n.box(7.33,2.2,-17,.1,1.03,.82,e.blackIron);for(const m of[1.85,2.55])for(const _ of[-17.26,-16.74])n.cylinder(7.255,m,_,.069,.069,.04,e.iron,6,[0,0,De/2]);n.ring(7.18,2.19,-17,.37,.066,e.iron,[0,De/2,0]);for(let m=0;m<8;m++)n.ring(7-m*.115,1.96-m*.115,-17,.095,.022,e.blackIron,m%2?[0,De/2,0]:[0,0,0],14);n.inspect(7,2,-17,"A fitting made for giants","The iron eye is half a metre across. It holds the wing sling when a torn membrane needs dressing; the short chain is folded out of the keeper’s walking lane.","ROOST HARDWARE",3.3);const u=-6.63,f=-21.26;n.box(u,.16,f,1.65,.32,3,e.darkStone),n.box(-7.18,1.1,f,.39,1.84,2.7,e.soot);for(const m of[f-1.35,f+1.35])n.box(u,.81,m,1.65,1.38,.28,e.darkStone);n.box(u,1.61,f,1.73,.34,3.1,e.darkStone),n.box(-6.99,3.6,f,.71,3.8,2.45,e.soot),n.box(u-.15,.34,f,1.1,.08,2.56,e.ember,[0,0,0],!1);for(let m=f-1.17;m<f+1.2;m+=.18)n.pole([u-.6,.5,m],[u+.6,.5,m],.021,e.blackIron,6);for(let m=f-1.2;m<f+1.22;m+=.22)n.pole([u+.81,.46,m],[u+.81,1.42,m],.026,e.blackIron,6);n.box(u+.81,1.12,f,.05,.055,2.65,e.blackIron),n.box(u+.81,.63,f,.05,.055,2.65,e.blackIron),n.collide(u,f,1.9,3.24,"warming hearth"),n.light(-5.85,1.2,f,"#ffb262",83,16),n.light(-5.52,3.1,-20.8,"#ffc281",34,17);const p=To((m,_,g)=>{const d=m.createRadialGradient(_*.5,g*.73,0,_*.5,g*.55,_*.6);d.addColorStop(0,"#211b18a9"),d.addColorStop(.5,"#30231c7b"),d.addColorStop(1,"#24191300"),m.fillStyle=d,m.fillRect(0,0,_,g)});n.plane(-7.344,3.4,f,4.5,6.4,p,[0,De/2,0]),n.inspect(-5.8,1.1,f,"Warm stones for old bones","The hearth is banked with ceramic heat bricks. Its light falls under the resting deck and up the ribs of the roof. Soot records a hotter youth; these days Ember likes an even, gentle warmth.","THE WARMING HEARTH",3.3),n.box(-5.56,.82,-14.73,1.39,.09,.68,e.wood[4]);for(const m of[-6.11,-5.01])for(const _ of[-14.95,-14.5])n.box(m,.42,_,.085,.83,.085,e.darkWood);n.collide(-5.56,-14.73,1.48,.78,"roost care bench"),tc(n,-5.25,.9,-14.7,.63,.31,.11),nc(n,-5.98,.9,-14.73,.69),n.box(-5.63,.11,-15.6,1.17,.22,.59,e.wood[3]);for(let m=0;m<11;m++){const _=-6.1+m%4*.25,g=-15.79+Math.floor(m/4)*.18;n.sphere(_,.29,g,.108,.13,.096,e.pear,10),n.sphere(_,.41,g,.043,.064,.043,e.pear,8),n.pole([_,.45,g],[_+.013,.48,g],.007,e.darkWood,5)}n.inspect(-5.62,.7,-14.73,"The pear basket","A soft brush, a fresh bucket, and pears saved from the kitchen. The keeper leaves this bench within reach of the little doorway. No need to cross the whole roost with an armful of gear.","AFFECTION, IN PRACTICE",3),il(n,-6.45,-17.03,.38,.84),il(n,-6.42,-18,.3,.7);for(const m of[-19.58,-22.89])n.box(-5.51,.46,m,.08,.92,.08,e.blackIron),n.sphere(-5.51,.94,m,.06,.06,.06,e.brass,10);n.pole([-5.51,.77,-19.58],[-5.51,.77,-22.89],.025,e.blackIron),n.collide(-5.51,-21.24,.1,3.4,"hearth rail"),Xi(n,5.6,2.72,-14,1.08,!1,27),n.pole([5.6,6,-14],[5.6,3.2,-14],.017,e.blackIron),n.light(1.1,5.8,-21.8,"#c0c6b2",58,18),n.plaque(-.75,1.65,-10.628,1.34,.38,["EMBER","REST WELL, OLD FRIEND"],[0,De,0])}function pg(){const n=new Eh;n.background=new We("#181813"),n.fog=new No("#292119",.017);const e=Qm(),t=new tg(n,e);n.add(new ou("#c9c8b5","#473425",.72)),n.add(new fu("#e4c59a",.19)),rg(t),hg(t),ug(t),dg(t);const i=new lu("#ffd096",330,29,.89,.65,2);i.position.set(-1.1,7.9,-16.6),i.target.position.set(-.6,.6,-19.8),i.castShadow=!0,i.shadow.mapSize.set(2048,2048),i.shadow.bias=-16e-5,i.shadow.normalBias=.035,i.shadow.camera.near=.7,i.shadow.camera.far=29,n.add(i,i.target);const r=t.finish();return{scene:n,...r}}const Mn={x:1.19,y:1.64,z:3.75,yaw:.26,pitch:-.025},mg=.24;function rl(n,e,t=mg){for(let i=0;i<4;i++){let r=!1;for(const s of e){const o=Math.max(s.minX,Math.min(s.maxX,n.x)),a=Math.max(s.minZ,Math.min(s.maxZ,n.z)),l=n.x-o,c=n.z-a,h=l*l+c*c;if(!(h>=t*t))if(r=!0,h>1e-7){const u=Math.sqrt(h),f=(t-u+1e-5)/u;n.x+=l*f,n.z+=c*f}else{const u=[{d:Math.abs(n.x-s.minX),axis:"x",value:s.minX-t-1e-5},{d:Math.abs(n.x-s.maxX),axis:"x",value:s.maxX+t+1e-5},{d:Math.abs(n.z-s.minZ),axis:"z",value:s.minZ-t-1e-5},{d:Math.abs(n.z-s.maxZ),axis:"z",value:s.maxZ+t+1e-5}];u.sort((f,p)=>f.d-p.d),n[u[0].axis]=u[0].value}}if(!r)break}return n}function gg(n,e,t,i=.001){let r=0,s=1-i;for(const[o,a,l]of[["x",t.minX,t.maxX],["z",t.minZ,t.maxZ]]){const c=e[o]-n[o];if(Math.abs(c)<1e-8){if(n[o]<a||n[o]>l)return!1}else{let h=(a-n[o])/c,u=(l-n[o])/c;if(h>u&&([h,u]=[u,h]),r=Math.max(r,h),s=Math.min(s,u),r>s)return!1}}return s>=0&&r<1-i}class _g{constructor(e,t,i,r={}){this.camera=e,this.canvas=t,this.colliders=i,this.callbacks=r,this.keys=new Set,this.active=!1,this.dragging=!1,this.fallback=!1,this.yaw=Mn.yaw,this.pitch=Mn.pitch,this.velocity=new le,this.reset(),document.addEventListener("keydown",s=>{["KeyW","KeyA","KeyS","KeyD","ArrowUp","ArrowDown","ArrowLeft","ArrowRight","ShiftLeft","ShiftRight"].includes(s.code)&&(this.keys.add(s.code),this.active&&s.preventDefault()),s.code==="KeyR"&&!s.repeat&&this.reset(),s.code==="KeyE"&&!s.repeat&&this.active&&r.inspect?.(),s.code==="KeyP"&&!s.repeat&&r.quality?.(),s.code==="F3"&&(s.preventDefault(),s.repeat||r.stats?.()),s.code==="Escape"&&this.active&&this.fallback&&this.pause()}),document.addEventListener("keyup",s=>this.keys.delete(s.code)),window.addEventListener("blur",()=>this.pause()),document.addEventListener("visibilitychange",()=>{document.hidden&&this.pause()}),document.addEventListener("mousemove",s=>{this.active&&(document.pointerLockElement===t||this.dragging)&&this.look(s.movementX,s.movementY)}),t.addEventListener("pointerdown",s=>{this.active&&this.fallback&&s.button===0&&(this.dragging=!0,t.setPointerCapture(s.pointerId))}),t.addEventListener("pointerup",()=>this.dragging=!1),document.addEventListener("pointerlockchange",()=>{document.pointerLockElement===t?(this.active=!0,this.fallback=!1,r.active?.(!0)):this.fallback||this.pause(!1)}),document.addEventListener("pointerlockerror",()=>this.useFallback())}start(){this.active=!0,this.keys.clear(),this.velocity.set(0,0),this.callbacks.active?.(!0);try{const e=this.canvas.requestPointerLock();e?.catch&&e.catch(()=>this.useFallback())}catch{this.useFallback()}}useFallback(){this.fallback=!0,this.active=!0,this.callbacks.active?.(!0),this.callbacks.message?.("Mouse lock unavailable — hold the left mouse button to look.")}pause(e=!0){this.active=!1,this.keys.clear(),this.velocity.set(0,0),this.dragging=!1,this.callbacks.active?.(!1),e&&document.pointerLockElement===this.canvas&&document.exitPointerLock()}look(e,t){this.yaw-=e*.002,this.pitch-=t*.002,this.pitch=Math.max(-1.4,Math.min(1.4,this.pitch)),this.applyLook()}applyLook(){this.camera.rotation.set(this.pitch,this.yaw,0,"YXZ")}reset(){this.camera.position.set(Mn.x,Mn.y,Mn.z),this.yaw=Mn.yaw,this.pitch=Mn.pitch,this.velocity.set(0,0),this.keys.clear(),this.applyLook(),this.callbacks.message?.("Returned to the entrance.")}update(e){if(!this.active)return;e=Math.min(e,.05);const t=(this.keys.has("KeyW")||this.keys.has("ArrowUp")?1:0)-(this.keys.has("KeyS")||this.keys.has("ArrowDown")?1:0),i=(this.keys.has("KeyD")||this.keys.has("ArrowRight")?1:0)-(this.keys.has("KeyA")||this.keys.has("ArrowLeft")?1:0),r=Math.hypot(t,i),s=this.keys.has("ShiftLeft")||this.keys.has("ShiftRight")?3.25:2.05;let o=0,a=0;r&&(o=(-Math.sin(this.yaw)*t+Math.cos(this.yaw)*i)/r*s,a=(-Math.cos(this.yaw)*t-Math.sin(this.yaw)*i)/r*s);const l=1-Math.exp(-e*22);this.velocity.x+=(o-this.velocity.x)*l,this.velocity.y+=(a-this.velocity.y)*l;const c=Math.hypot(this.velocity.x,this.velocity.y)*e,h=Math.max(1,Math.ceil(c/.06));for(let u=0;u<h;u++)this.camera.position.x+=this.velocity.x*e/h,rl(this.camera.position,this.colliders),this.camera.position.z+=this.velocity.y*e/h,rl(this.camera.position,this.colliders);this.camera.position.y=Mn.y}}const it=n=>document.getElementById(n),Ls=it("scene");let dt,zt,Fn,Nt,kr=!1,hn=null,Li=!1,Pr=!1,sl=0;const Tr=new Float32Array(180);let Ds=0,Di=0;const ol=new P,Is=new P;let al;function ic(n){it("toast").textContent=n,it("toast").hidden=!1,clearTimeout(al),al=setTimeout(()=>it("toast").hidden=!0,3300)}function Lr(){kr=!1,it("inspection").hidden=!0}function vg(){if(kr){Lr();return}hn&&(kr=!0,it("note-kind").textContent=hn.kind,it("note-title").textContent=hn.title,it("note-copy").textContent=hn.copy,it("inspection").hidden=!1)}function ll(){Li=!Li,dt.setPixelRatio(Math.min(window.devicePixelRatio||1,Li?1:1.5)),dt.setSize(window.innerWidth,window.innerHeight,!1),it("quality").textContent=`Detail: ${Li?"standard":"high"}`,ic(Li?"Standard detail · lower pixel density":"High detail · pixel density capped at 1.5")}function xg(){if(hn=null,kr){it("hint").hidden=!0;return}Nt.getWorldDirection(ol);let n=-1/0;for(const e of zt.interactions){Is.copy(e.position).sub(Nt.position);const t=Is.length();if(t>e.reach||t<.1)continue;const i=Is.normalize().dot(ol);if(i<.83||zt.colliders.some(s=>s.name.includes("wall")&&gg(Nt.position,e.position,s)))continue;const r=i*4-t*.3;r>n&&(hn=e,n=r)}it("hint").hidden=!hn,hn&&(it("hint-text").textContent=hn.title)}function Mg(){dt&&(Nt.aspect=window.innerWidth/window.innerHeight,Nt.updateProjectionMatrix(),dt.setSize(window.innerWidth,window.innerHeight,!1))}function Sg(){Pr=!Pr,it("diagnostics").hidden=!Pr}function cl(n){it("loading").hidden=!0,it("welcome").hidden=!0,it("error").hidden=!1,it("error").textContent=`Ember Rest could not start.

`+(n?.message||n)+`

Use a current desktop browser with WebGL2 enabled. Launch the included local build through npm run dev.`,console.error(n)}async function yg(){try{let i=function(r){const s=r-t;if(t=r,Tr[Ds]=s,Ds=(Ds+1)%Tr.length,Di=Math.min(Di+1,Tr.length),Fn.update(s/1e3),r-sl>150&&(sl=r,it("zone").textContent=Nt.position.z<-10.35?"THE WARM ROOST":Nt.position.z<-2.8?"THE SERVICE PASSAGE":"THE KEEPER’S ROOM",Fn.active&&xg(),Pr&&Di)){const o=Array.from(Tr.slice(0,Di)).sort((l,c)=>l-c),a=o.reduce((l,c)=>l+c,0)/o.length;e.textContent=`FRAME INTERVALS · last ${Di}
Mean ${a.toFixed(1)} ms · p95 ${o[Math.floor((o.length-1)*.95)].toFixed(1)} ms
${dt.info.render.calls} draw calls · ${(dt.info.render.triangles/1e3).toFixed(1)}k triangles
Pixel ratio ${dt.getPixelRatio().toFixed(2)}
F3 · hide diagnostics`}dt.render(zt.scene,Nt),requestAnimationFrame(i)};var n=i;await new Promise(r=>requestAnimationFrame(r)),dt=new $m({canvas:Ls,antialias:!0,powerPreference:"high-performance",alpha:!1}),dt.setPixelRatio(Math.min(window.devicePixelRatio||1,1.5)),dt.setSize(window.innerWidth,window.innerHeight,!1),dt.outputColorSpace=Et,dt.toneMapping=dl,dt.toneMappingExposure=1.25,dt.shadowMap.enabled=!0,dt.shadowMap.type=ul,dt.shadowMap.autoUpdate=!1,dt.shadowMap.needsUpdate=!0,zt=pg(),Nt=new Rt(67,window.innerWidth/window.innerHeight,.06,65),Fn=new _g(Nt,Ls,zt.colliders,{active:r=>{it("welcome").hidden=r,it("hud").hidden=!r,r||Lr()},message:ic,inspect:vg,quality:ll,stats:Sg});const e=document.createElement("div");e.id="diagnostics",e.hidden=!0,e.style.cssText="position:fixed;right:28px;top:24px;white-space:pre;font:11px/1.65 monospace;background:#16120edd;border:1px solid #80644370;padding:12px 15px;color:#d9c6a0;",it("hud").appendChild(e),it("enter").addEventListener("click",()=>Fn.start()),it("reset").addEventListener("click",()=>Fn.reset()),it("quality").addEventListener("click",ll),it("close-note").addEventListener("click",Lr),window.addEventListener("resize",Mg),document.addEventListener("keydown",r=>{r.code==="Escape"&&Lr()}),Ls.addEventListener("webglcontextlost",r=>{r.preventDefault(),Fn.pause(),cl("The graphics context was lost. Reload the page to restart the scene.")}),await dt.compileAsync(zt.scene,Nt),dt.render(zt.scene,Nt),it("loading").hidden=!0;let t=performance.now();requestAnimationFrame(i),window.emberRest={getInfo:()=>({staticBatches:zt.staticBatches,sourcePieces:zt.sourcePieces,vertices:zt.vertices,colliders:zt.colliders.length,authoredNotes:zt.interactions.length,pixelRatio:dt.getPixelRatio(),position:Nt.position.toArray()}),reset:()=>Fn.reset()}}catch(e){cl(e)}}yg();

(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Mo="180",pc=0,Ko=1,mc=2,hl=1,fl=2,hn=3,Cn=0,Lt=1,Pt=2,bn=0,pi=1,$o=2,jo=3,Qo=4,gc=5,Hn=100,_c=101,xc=102,vc=103,Mc=104,Sc=200,yc=201,Ec=202,bc=203,Ps=204,Ls=205,Tc=206,Ac=207,Rc=208,Cc=209,wc=210,Pc=211,Lc=212,Dc=213,Ic=214,Ds=0,Is=1,Us=2,gi=3,Ns=4,Fs=5,Os=6,Bs=7,dl=0,Uc=1,Nc=2,Tn=0,Fc=1,Oc=2,Bc=3,pl=4,zc=5,kc=6,Hc=7,ml=300,_i=301,xi=302,zs=303,ks=304,Br=306,Dr=1e3,Gn=1001,Hs=1002,Yt=1003,Vc=1004,Qi=1005,Qt=1006,Gr=1007,Wn=1008,nn=1009,gl=1010,_l=1011,zi=1012,So=1013,Xn=1014,dn=1015,Zi=1016,yo=1017,Eo=1018,ki=1020,xl=35902,vl=35899,Ml=1021,Sl=1022,qt=1023,Hi=1026,Vi=1027,yl=1028,bo=1029,El=1030,To=1031,Ao=1033,Ar=33776,Rr=33777,Cr=33778,wr=33779,Vs=35840,Gs=35841,Ws=35842,Xs=35843,qs=36196,Ys=37492,Zs=37496,Js=37808,Ks=37809,$s=37810,js=37811,Qs=37812,eo=37813,to=37814,no=37815,io=37816,ro=37817,so=37818,oo=37819,ao=37820,lo=37821,co=36492,uo=36494,ho=36495,fo=36283,po=36284,mo=36285,go=36286,Gc=3200,Wc=3201,bl=0,Xc=1,fn="",wt="srgb",vi="srgb-linear",Ir="linear",tt="srgb",$n=7680,ea=519,qc=512,Yc=513,Zc=514,Tl=515,Jc=516,Kc=517,$c=518,jc=519,ta=35044,na="300 es",en=2e3,Ur=2001;class yi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const Mt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let ia=1234567;const Ui=Math.PI/180,Gi=180/Math.PI;function Zn(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Mt[n&255]+Mt[n>>8&255]+Mt[n>>16&255]+Mt[n>>24&255]+"-"+Mt[e&255]+Mt[e>>8&255]+"-"+Mt[e>>16&15|64]+Mt[e>>24&255]+"-"+Mt[t&63|128]+Mt[t>>8&255]+"-"+Mt[t>>16&255]+Mt[t>>24&255]+Mt[i&255]+Mt[i>>8&255]+Mt[i>>16&255]+Mt[i>>24&255]).toLowerCase()}function Ge(n,e,t){return Math.max(e,Math.min(t,n))}function Ro(n,e){return(n%e+e)%e}function Qc(n,e,t,i,r){return i+(n-e)*(r-i)/(t-e)}function eu(n,e,t){return n!==e?(t-n)/(e-n):0}function Ni(n,e,t){return(1-t)*n+t*e}function tu(n,e,t,i){return Ni(n,e,1-Math.exp(-t*i))}function nu(n,e=1){return e-Math.abs(Ro(n,e*2)-e)}function iu(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function ru(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function su(n,e){return n+Math.floor(Math.random()*(e-n+1))}function ou(n,e){return n+Math.random()*(e-n)}function au(n){return n*(.5-Math.random())}function lu(n){n!==void 0&&(ia=n);let e=ia+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function cu(n){return n*Ui}function uu(n){return n*Gi}function hu(n){return(n&n-1)===0&&n!==0}function fu(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function du(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function pu(n,e,t,i,r){const s=Math.cos,o=Math.sin,a=s(t/2),l=o(t/2),c=s((e+i)/2),u=o((e+i)/2),h=s((e-i)/2),f=o((e-i)/2),d=s((i-e)/2),g=o((i-e)/2);switch(r){case"XYX":n.set(a*u,l*h,l*f,a*c);break;case"YZY":n.set(l*f,a*u,l*h,a*c);break;case"ZXZ":n.set(l*h,l*f,a*u,a*c);break;case"XZX":n.set(a*u,l*g,l*d,a*c);break;case"YXY":n.set(l*d,a*u,l*g,a*c);break;case"ZYZ":n.set(l*g,l*d,a*u,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function hi(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function bt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const mu={DEG2RAD:Ui,RAD2DEG:Gi,generateUUID:Zn,clamp:Ge,euclideanModulo:Ro,mapLinear:Qc,inverseLerp:eu,lerp:Ni,damp:tu,pingpong:nu,smoothstep:iu,smootherstep:ru,randInt:su,randFloat:ou,randFloatSpread:au,seededRandom:lu,degToRad:cu,radToDeg:uu,isPowerOfTwo:hu,ceilPowerOfTwo:fu,floorPowerOfTwo:du,setQuaternionFromProperEuler:pu,normalize:bt,denormalize:hi};class le{constructor(e=0,t=0){le.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ge(this.x,e.x,t.x),this.y=Ge(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ge(this.x,e,t),this.y=Ge(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ge(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ge(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class An{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,o,a){let l=i[r+0],c=i[r+1],u=i[r+2],h=i[r+3];const f=s[o+0],d=s[o+1],g=s[o+2],x=s[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h;return}if(a===1){e[t+0]=f,e[t+1]=d,e[t+2]=g,e[t+3]=x;return}if(h!==x||l!==f||c!==d||u!==g){let m=1-a;const p=l*f+c*d+u*g+h*x,T=p>=0?1:-1,E=1-p*p;if(E>Number.EPSILON){const C=Math.sqrt(E),R=Math.atan2(C,p*T);m=Math.sin(m*R)/C,a=Math.sin(a*R)/C}const v=a*T;if(l=l*m+f*v,c=c*m+d*v,u=u*m+g*v,h=h*m+x*v,m===1-a){const C=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=C,c*=C,u*=C,h*=C}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,i,r,s,o){const a=i[r],l=i[r+1],c=i[r+2],u=i[r+3],h=s[o],f=s[o+1],d=s[o+2],g=s[o+3];return e[t]=a*g+u*h+l*d-c*f,e[t+1]=l*g+u*f+c*h-a*d,e[t+2]=c*g+u*d+a*f-l*h,e[t+3]=u*g-a*h-l*f-c*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(i/2),u=a(r/2),h=a(s/2),f=l(i/2),d=l(r/2),g=l(s/2);switch(o){case"XYZ":this._x=f*u*h+c*d*g,this._y=c*d*h-f*u*g,this._z=c*u*g+f*d*h,this._w=c*u*h-f*d*g;break;case"YXZ":this._x=f*u*h+c*d*g,this._y=c*d*h-f*u*g,this._z=c*u*g-f*d*h,this._w=c*u*h+f*d*g;break;case"ZXY":this._x=f*u*h-c*d*g,this._y=c*d*h+f*u*g,this._z=c*u*g+f*d*h,this._w=c*u*h-f*d*g;break;case"ZYX":this._x=f*u*h-c*d*g,this._y=c*d*h+f*u*g,this._z=c*u*g-f*d*h,this._w=c*u*h+f*d*g;break;case"YZX":this._x=f*u*h+c*d*g,this._y=c*d*h+f*u*g,this._z=c*u*g-f*d*h,this._w=c*u*h-f*d*g;break;case"XZY":this._x=f*u*h-c*d*g,this._y=c*d*h-f*u*g,this._z=c*u*g+f*d*h,this._w=c*u*h+f*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],h=t[10],f=i+a+h;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(u-l)*d,this._y=(s-c)*d,this._z=(o-r)*d}else if(i>a&&i>h){const d=2*Math.sqrt(1+i-a-h);this._w=(u-l)/d,this._x=.25*d,this._y=(r+o)/d,this._z=(s+c)/d}else if(a>h){const d=2*Math.sqrt(1+a-i-h);this._w=(s-c)/d,this._x=(r+o)/d,this._y=.25*d,this._z=(l+u)/d}else{const d=2*Math.sqrt(1+h-i-a);this._w=(o-r)/d,this._x=(s+c)/d,this._y=(l+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ge(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+o*a+r*c-s*l,this._y=r*u+o*l+s*a-i*c,this._z=s*u+o*c+i*l-r*a,this._w=o*u-i*a-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,o=this._w;let a=o*e._w+i*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=i,this._y=r,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const d=1-t;return this._w=d*o+t*this._w,this._x=d*i+t*this._x,this._y=d*r+t*this._y,this._z=d*s+t*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),h=Math.sin((1-t)*u)/c,f=Math.sin(t*u)/c;return this._w=o*h+this._w*f,this._x=i*h+this._x*f,this._y=r*h+this._y*f,this._z=s*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class w{constructor(e=0,t=0,i=0){w.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(ra.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(ra.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*r-a*i),u=2*(a*t-s*r),h=2*(s*i-o*t);return this.x=t+l*c+o*h-a*u,this.y=i+l*u+a*c-s*h,this.z=r+l*h+s*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ge(this.x,e.x,t.x),this.y=Ge(this.y,e.y,t.y),this.z=Ge(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ge(this.x,e,t),this.y=Ge(this.y,e,t),this.z=Ge(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ge(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=r*l-s*a,this.y=s*o-i*l,this.z=i*a-r*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Wr.copy(this).projectOnVector(e),this.sub(Wr)}reflect(e){return this.sub(Wr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ge(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Wr=new w,ra=new An;class He{constructor(e,t,i,r,s,o,a,l,c){He.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,l,c)}set(e,t,i,r,s,o,a,l,c){const u=this.elements;return u[0]=e,u[1]=r,u[2]=a,u[3]=t,u[4]=s,u[5]=l,u[6]=i,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],u=i[4],h=i[7],f=i[2],d=i[5],g=i[8],x=r[0],m=r[3],p=r[6],T=r[1],E=r[4],v=r[7],C=r[2],R=r[5],P=r[8];return s[0]=o*x+a*T+l*C,s[3]=o*m+a*E+l*R,s[6]=o*p+a*v+l*P,s[1]=c*x+u*T+h*C,s[4]=c*m+u*E+h*R,s[7]=c*p+u*v+h*P,s[2]=f*x+d*T+g*C,s[5]=f*m+d*E+g*R,s[8]=f*p+d*v+g*P,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-i*s*u+i*a*l+r*s*c-r*o*l}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],h=u*o-a*c,f=a*l-u*s,d=c*s-o*l,g=t*h+i*f+r*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/g;return e[0]=h*x,e[1]=(r*c-u*i)*x,e[2]=(a*i-r*o)*x,e[3]=f*x,e[4]=(u*t-r*l)*x,e[5]=(r*s-a*t)*x,e[6]=d*x,e[7]=(i*l-c*t)*x,e[8]=(o*t-i*s)*x,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*o+c*a)+o+e,-r*c,r*l,-r*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Xr.makeScale(e,t)),this}rotate(e){return this.premultiply(Xr.makeRotation(-e)),this}translate(e,t){return this.premultiply(Xr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Xr=new He;function Al(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Nr(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function gu(){const n=Nr("canvas");return n.style.display="block",n}const sa={};function Wi(n){n in sa||(sa[n]=!0,console.warn(n))}function _u(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}const oa=new He().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),aa=new He().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function xu(){const n={enabled:!0,workingColorSpace:vi,spaces:{},convert:function(r,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===tt&&(r.r=mn(r.r),r.g=mn(r.g),r.b=mn(r.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===tt&&(r.r=mi(r.r),r.g=mi(r.g),r.b=mi(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===fn?Ir:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,o){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Wi("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Wi("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[vi]:{primaries:e,whitePoint:i,transfer:Ir,toXYZ:oa,fromXYZ:aa,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:wt},outputColorSpaceConfig:{drawingBufferColorSpace:wt}},[wt]:{primaries:e,whitePoint:i,transfer:tt,toXYZ:oa,fromXYZ:aa,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:wt}}}),n}const Ke=xu();function mn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function mi(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let jn;class vu{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{jn===void 0&&(jn=Nr("canvas")),jn.width=e.width,jn.height=e.height;const r=jn.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=jn}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Nr("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=mn(s[o]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(mn(t[i]/255)*255):t[i]=mn(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Mu=0;class Co{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Mu++}),this.uuid=Zn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(qr(r[o].image)):s.push(qr(r[o]))}else s=qr(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function qr(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?vu.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Su=0;const Yr=new w;class At extends yi{constructor(e=At.DEFAULT_IMAGE,t=At.DEFAULT_MAPPING,i=Gn,r=Gn,s=Qt,o=Wn,a=qt,l=nn,c=At.DEFAULT_ANISOTROPY,u=fn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Su++}),this.uuid=Zn(),this.name="",this.source=new Co(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new le(0,0),this.repeat=new le(1,1),this.center=new le(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new He,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Yr).x}get height(){return this.source.getSize(Yr).y}get depth(){return this.source.getSize(Yr).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==ml)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Dr:e.x=e.x-Math.floor(e.x);break;case Gn:e.x=e.x<0?0:1;break;case Hs:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Dr:e.y=e.y-Math.floor(e.y);break;case Gn:e.y=e.y<0?0:1;break;case Hs:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}At.DEFAULT_IMAGE=null;At.DEFAULT_MAPPING=ml;At.DEFAULT_ANISOTROPY=1;class nt{constructor(e=0,t=0,i=0,r=1){nt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*t+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*t+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*t+o[7]*i+o[11]*r+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const l=e.elements,c=l[0],u=l[4],h=l[8],f=l[1],d=l[5],g=l[9],x=l[2],m=l[6],p=l[10];if(Math.abs(u-f)<.01&&Math.abs(h-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+x)<.1&&Math.abs(g+m)<.1&&Math.abs(c+d+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const E=(c+1)/2,v=(d+1)/2,C=(p+1)/2,R=(u+f)/4,P=(h+x)/4,I=(g+m)/4;return E>v&&E>C?E<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(E),r=R/i,s=P/i):v>C?v<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(v),i=R/r,s=I/r):C<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(C),i=P/s,r=I/s),this.set(i,r,s,t),this}let T=Math.sqrt((m-g)*(m-g)+(h-x)*(h-x)+(f-u)*(f-u));return Math.abs(T)<.001&&(T=1),this.x=(m-g)/T,this.y=(h-x)/T,this.z=(f-u)/T,this.w=Math.acos((c+d+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ge(this.x,e.x,t.x),this.y=Ge(this.y,e.y,t.y),this.z=Ge(this.z,e.z,t.z),this.w=Ge(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ge(this.x,e,t),this.y=Ge(this.y,e,t),this.z=Ge(this.z,e,t),this.w=Ge(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ge(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class yu extends yi{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Qt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new nt(0,0,e,t),this.scissorTest=!1,this.viewport=new nt(0,0,e,t);const r={width:e,height:t,depth:i.depth},s=new At(r);this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){const t={minFilter:Qt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isArrayTexture=this.textures[r].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new Co(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class qn extends yu{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Rl extends At{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Yt,this.minFilter=Yt,this.wrapR=Gn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Eu extends At{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Yt,this.minFilter=Yt,this.wrapR=Gn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ji{constructor(e=new w(1/0,1/0,1/0),t=new w(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Vt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Vt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Vt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Vt):Vt.fromBufferAttribute(s,o),Vt.applyMatrix4(e.matrixWorld),this.expandByPoint(Vt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),er.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),er.copy(i.boundingBox)),er.applyMatrix4(e.matrixWorld),this.union(er)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Vt),Vt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ti),tr.subVectors(this.max,Ti),Qn.subVectors(e.a,Ti),ei.subVectors(e.b,Ti),ti.subVectors(e.c,Ti),_n.subVectors(ei,Qn),xn.subVectors(ti,ei),Dn.subVectors(Qn,ti);let t=[0,-_n.z,_n.y,0,-xn.z,xn.y,0,-Dn.z,Dn.y,_n.z,0,-_n.x,xn.z,0,-xn.x,Dn.z,0,-Dn.x,-_n.y,_n.x,0,-xn.y,xn.x,0,-Dn.y,Dn.x,0];return!Zr(t,Qn,ei,ti,tr)||(t=[1,0,0,0,1,0,0,0,1],!Zr(t,Qn,ei,ti,tr))?!1:(nr.crossVectors(_n,xn),t=[nr.x,nr.y,nr.z],Zr(t,Qn,ei,ti,tr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Vt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Vt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(on[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),on[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),on[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),on[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),on[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),on[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),on[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),on[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(on),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const on=[new w,new w,new w,new w,new w,new w,new w,new w],Vt=new w,er=new Ji,Qn=new w,ei=new w,ti=new w,_n=new w,xn=new w,Dn=new w,Ti=new w,tr=new w,nr=new w,In=new w;function Zr(n,e,t,i,r){for(let s=0,o=n.length-3;s<=o;s+=3){In.fromArray(n,s);const a=r.x*Math.abs(In.x)+r.y*Math.abs(In.y)+r.z*Math.abs(In.z),l=e.dot(In),c=t.dot(In),u=i.dot(In);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const bu=new Ji,Ai=new w,Jr=new w;class wo{constructor(e=new w,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):bu.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ai.subVectors(e,this.center);const t=Ai.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(Ai,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Jr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ai.copy(e.center).add(Jr)),this.expandByPoint(Ai.copy(e.center).sub(Jr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const an=new w,Kr=new w,ir=new w,vn=new w,$r=new w,rr=new w,jr=new w;class Tu{constructor(e=new w,t=new w(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,an)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=an.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(an.copy(this.origin).addScaledVector(this.direction,t),an.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){Kr.copy(e).add(t).multiplyScalar(.5),ir.copy(t).sub(e).normalize(),vn.copy(this.origin).sub(Kr);const s=e.distanceTo(t)*.5,o=-this.direction.dot(ir),a=vn.dot(this.direction),l=-vn.dot(ir),c=vn.lengthSq(),u=Math.abs(1-o*o);let h,f,d,g;if(u>0)if(h=o*l-a,f=o*a-l,g=s*u,h>=0)if(f>=-g)if(f<=g){const x=1/u;h*=x,f*=x,d=h*(h+o*f+2*a)+f*(o*h+f+2*l)+c}else f=s,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*l)+c;else f=-s,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*l)+c;else f<=-g?(h=Math.max(0,-(-o*s+a)),f=h>0?-s:Math.min(Math.max(-s,-l),s),d=-h*h+f*(f+2*l)+c):f<=g?(h=0,f=Math.min(Math.max(-s,-l),s),d=f*(f+2*l)+c):(h=Math.max(0,-(o*s+a)),f=h>0?s:Math.min(Math.max(-s,-l),s),d=-h*h+f*(f+2*l)+c);else f=o>0?-s:s,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(Kr).addScaledVector(ir,f),d}intersectSphere(e,t){an.subVectors(e.center,this.origin);const i=an.dot(this.direction),r=an.dot(an)-i*i,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return c>=0?(i=(e.min.x-f.x)*c,r=(e.max.x-f.x)*c):(i=(e.max.x-f.x)*c,r=(e.min.x-f.x)*c),u>=0?(s=(e.min.y-f.y)*u,o=(e.max.y-f.y)*u):(s=(e.max.y-f.y)*u,o=(e.min.y-f.y)*u),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),h>=0?(a=(e.min.z-f.z)*h,l=(e.max.z-f.z)*h):(a=(e.max.z-f.z)*h,l=(e.min.z-f.z)*h),i>l||a>r)||((a>i||i!==i)&&(i=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,an)!==null}intersectTriangle(e,t,i,r,s){$r.subVectors(t,e),rr.subVectors(i,e),jr.crossVectors($r,rr);let o=this.direction.dot(jr),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;vn.subVectors(this.origin,e);const l=a*this.direction.dot(rr.crossVectors(vn,rr));if(l<0)return null;const c=a*this.direction.dot($r.cross(vn));if(c<0||l+c>o)return null;const u=-a*vn.dot(jr);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class at{constructor(e,t,i,r,s,o,a,l,c,u,h,f,d,g,x,m){at.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,l,c,u,h,f,d,g,x,m)}set(e,t,i,r,s,o,a,l,c,u,h,f,d,g,x,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=i,p[12]=r,p[1]=s,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=u,p[10]=h,p[14]=f,p[3]=d,p[7]=g,p[11]=x,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new at().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,r=1/ni.setFromMatrixColumn(e,0).length(),s=1/ni.setFromMatrixColumn(e,1).length(),o=1/ni.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){const f=o*u,d=o*h,g=a*u,x=a*h;t[0]=l*u,t[4]=-l*h,t[8]=c,t[1]=d+g*c,t[5]=f-x*c,t[9]=-a*l,t[2]=x-f*c,t[6]=g+d*c,t[10]=o*l}else if(e.order==="YXZ"){const f=l*u,d=l*h,g=c*u,x=c*h;t[0]=f+x*a,t[4]=g*a-d,t[8]=o*c,t[1]=o*h,t[5]=o*u,t[9]=-a,t[2]=d*a-g,t[6]=x+f*a,t[10]=o*l}else if(e.order==="ZXY"){const f=l*u,d=l*h,g=c*u,x=c*h;t[0]=f-x*a,t[4]=-o*h,t[8]=g+d*a,t[1]=d+g*a,t[5]=o*u,t[9]=x-f*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const f=o*u,d=o*h,g=a*u,x=a*h;t[0]=l*u,t[4]=g*c-d,t[8]=f*c+x,t[1]=l*h,t[5]=x*c+f,t[9]=d*c-g,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const f=o*l,d=o*c,g=a*l,x=a*c;t[0]=l*u,t[4]=x-f*h,t[8]=g*h+d,t[1]=h,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=d*h+g,t[10]=f-x*h}else if(e.order==="XZY"){const f=o*l,d=o*c,g=a*l,x=a*c;t[0]=l*u,t[4]=-h,t[8]=c*u,t[1]=f*h+x,t[5]=o*u,t[9]=d*h-g,t[2]=g*h-d,t[6]=a*u,t[10]=x*h+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Au,e,Ru)}lookAt(e,t,i){const r=this.elements;return Ut.subVectors(e,t),Ut.lengthSq()===0&&(Ut.z=1),Ut.normalize(),Mn.crossVectors(i,Ut),Mn.lengthSq()===0&&(Math.abs(i.z)===1?Ut.x+=1e-4:Ut.z+=1e-4,Ut.normalize(),Mn.crossVectors(i,Ut)),Mn.normalize(),sr.crossVectors(Ut,Mn),r[0]=Mn.x,r[4]=sr.x,r[8]=Ut.x,r[1]=Mn.y,r[5]=sr.y,r[9]=Ut.y,r[2]=Mn.z,r[6]=sr.z,r[10]=Ut.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],u=i[1],h=i[5],f=i[9],d=i[13],g=i[2],x=i[6],m=i[10],p=i[14],T=i[3],E=i[7],v=i[11],C=i[15],R=r[0],P=r[4],I=r[8],y=r[12],S=r[1],L=r[5],O=r[9],k=r[13],q=r[2],V=r[6],X=r[10],j=r[14],G=r[3],he=r[7],_e=r[11],Me=r[15];return s[0]=o*R+a*S+l*q+c*G,s[4]=o*P+a*L+l*V+c*he,s[8]=o*I+a*O+l*X+c*_e,s[12]=o*y+a*k+l*j+c*Me,s[1]=u*R+h*S+f*q+d*G,s[5]=u*P+h*L+f*V+d*he,s[9]=u*I+h*O+f*X+d*_e,s[13]=u*y+h*k+f*j+d*Me,s[2]=g*R+x*S+m*q+p*G,s[6]=g*P+x*L+m*V+p*he,s[10]=g*I+x*O+m*X+p*_e,s[14]=g*y+x*k+m*j+p*Me,s[3]=T*R+E*S+v*q+C*G,s[7]=T*P+E*L+v*V+C*he,s[11]=T*I+E*O+v*X+C*_e,s[15]=T*y+E*k+v*j+C*Me,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],h=e[6],f=e[10],d=e[14],g=e[3],x=e[7],m=e[11],p=e[15];return g*(+s*l*h-r*c*h-s*a*f+i*c*f+r*a*d-i*l*d)+x*(+t*l*d-t*c*f+s*o*f-r*o*d+r*c*u-s*l*u)+m*(+t*c*h-t*a*d-s*o*h+i*o*d+s*a*u-i*c*u)+p*(-r*a*u-t*l*h+t*a*f+r*o*h-i*o*f+i*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],h=e[9],f=e[10],d=e[11],g=e[12],x=e[13],m=e[14],p=e[15],T=h*m*c-x*f*c+x*l*d-a*m*d-h*l*p+a*f*p,E=g*f*c-u*m*c-g*l*d+o*m*d+u*l*p-o*f*p,v=u*x*c-g*h*c+g*a*d-o*x*d-u*a*p+o*h*p,C=g*h*l-u*x*l-g*a*f+o*x*f+u*a*m-o*h*m,R=t*T+i*E+r*v+s*C;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const P=1/R;return e[0]=T*P,e[1]=(x*f*s-h*m*s-x*r*d+i*m*d+h*r*p-i*f*p)*P,e[2]=(a*m*s-x*l*s+x*r*c-i*m*c-a*r*p+i*l*p)*P,e[3]=(h*l*s-a*f*s-h*r*c+i*f*c+a*r*d-i*l*d)*P,e[4]=E*P,e[5]=(u*m*s-g*f*s+g*r*d-t*m*d-u*r*p+t*f*p)*P,e[6]=(g*l*s-o*m*s-g*r*c+t*m*c+o*r*p-t*l*p)*P,e[7]=(o*f*s-u*l*s+u*r*c-t*f*c-o*r*d+t*l*d)*P,e[8]=v*P,e[9]=(g*h*s-u*x*s-g*i*d+t*x*d+u*i*p-t*h*p)*P,e[10]=(o*x*s-g*a*s+g*i*c-t*x*c-o*i*p+t*a*p)*P,e[11]=(u*a*s-o*h*s-u*i*c+t*h*c+o*i*d-t*a*d)*P,e[12]=C*P,e[13]=(u*x*r-g*h*r+g*i*f-t*x*f-u*i*m+t*h*m)*P,e[14]=(g*a*r-o*x*r-g*i*l+t*x*l+o*i*m-t*a*m)*P,e[15]=(o*h*r-u*a*r+u*i*l-t*h*l-o*i*f+t*a*f)*P,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,o=e.x,a=e.y,l=e.z,c=s*o,u=s*a;return this.set(c*o+i,c*a-r*l,c*l+r*a,0,c*a+r*l,u*a+i,u*l-r*o,0,c*l-r*a,u*l+r*o,s*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,c=s+s,u=o+o,h=a+a,f=s*c,d=s*u,g=s*h,x=o*u,m=o*h,p=a*h,T=l*c,E=l*u,v=l*h,C=i.x,R=i.y,P=i.z;return r[0]=(1-(x+p))*C,r[1]=(d+v)*C,r[2]=(g-E)*C,r[3]=0,r[4]=(d-v)*R,r[5]=(1-(f+p))*R,r[6]=(m+T)*R,r[7]=0,r[8]=(g+E)*P,r[9]=(m-T)*P,r[10]=(1-(f+x))*P,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;let s=ni.set(r[0],r[1],r[2]).length();const o=ni.set(r[4],r[5],r[6]).length(),a=ni.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],Gt.copy(this);const c=1/s,u=1/o,h=1/a;return Gt.elements[0]*=c,Gt.elements[1]*=c,Gt.elements[2]*=c,Gt.elements[4]*=u,Gt.elements[5]*=u,Gt.elements[6]*=u,Gt.elements[8]*=h,Gt.elements[9]*=h,Gt.elements[10]*=h,t.setFromRotationMatrix(Gt),i.x=s,i.y=o,i.z=a,this}makePerspective(e,t,i,r,s,o,a=en,l=!1){const c=this.elements,u=2*s/(t-e),h=2*s/(i-r),f=(t+e)/(t-e),d=(i+r)/(i-r);let g,x;if(l)g=s/(o-s),x=o*s/(o-s);else if(a===en)g=-(o+s)/(o-s),x=-2*o*s/(o-s);else if(a===Ur)g=-o/(o-s),x=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=h,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=x,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,r,s,o,a=en,l=!1){const c=this.elements,u=2/(t-e),h=2/(i-r),f=-(t+e)/(t-e),d=-(i+r)/(i-r);let g,x;if(l)g=1/(o-s),x=o/(o-s);else if(a===en)g=-2/(o-s),x=-(o+s)/(o-s);else if(a===Ur)g=-1/(o-s),x=-s/(o-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=0,c[12]=f,c[1]=0,c[5]=h,c[9]=0,c[13]=d,c[2]=0,c[6]=0,c[10]=g,c[14]=x,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const ni=new w,Gt=new at,Au=new w(0,0,0),Ru=new w(1,1,1),Mn=new w,sr=new w,Ut=new w,la=new at,ca=new An;class Ht{constructor(e=0,t=0,i=0,r=Ht.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],u=r[9],h=r[2],f=r[6],d=r[10];switch(t){case"XYZ":this._y=Math.asin(Ge(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ge(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ge(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,d),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Ge(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Ge(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-Ge(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return la.makeRotationFromQuaternion(e),this.setFromRotationMatrix(la,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return ca.setFromEuler(this),this.setFromQuaternion(ca,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ht.DEFAULT_ORDER="XYZ";class Cl{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Cu=0;const ua=new w,ii=new An,ln=new at,or=new w,Ri=new w,wu=new w,Pu=new An,ha=new w(1,0,0),fa=new w(0,1,0),da=new w(0,0,1),pa={type:"added"},Lu={type:"removed"},ri={type:"childadded",child:null},Qr={type:"childremoved",child:null};class vt extends yi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Cu++}),this.uuid=Zn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=vt.DEFAULT_UP.clone();const e=new w,t=new Ht,i=new An,r=new w(1,1,1);function s(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new at},normalMatrix:{value:new He}}),this.matrix=new at,this.matrixWorld=new at,this.matrixAutoUpdate=vt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=vt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Cl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ii.setFromAxisAngle(e,t),this.quaternion.multiply(ii),this}rotateOnWorldAxis(e,t){return ii.setFromAxisAngle(e,t),this.quaternion.premultiply(ii),this}rotateX(e){return this.rotateOnAxis(ha,e)}rotateY(e){return this.rotateOnAxis(fa,e)}rotateZ(e){return this.rotateOnAxis(da,e)}translateOnAxis(e,t){return ua.copy(e).applyQuaternion(this.quaternion),this.position.add(ua.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(ha,e)}translateY(e){return this.translateOnAxis(fa,e)}translateZ(e){return this.translateOnAxis(da,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ln.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?or.copy(e):or.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Ri.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ln.lookAt(Ri,or,this.up):ln.lookAt(or,Ri,this.up),this.quaternion.setFromRotationMatrix(ln),r&&(ln.extractRotation(r.matrixWorld),ii.setFromRotationMatrix(ln),this.quaternion.premultiply(ii.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(pa),ri.child=e,this.dispatchEvent(ri),ri.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Lu),Qr.child=e,this.dispatchEvent(Qr),Qr.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ln.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ln.multiply(e.parent.matrixWorld)),e.applyMatrix4(ln),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(pa),ri.child=e,this.dispatchEvent(ri),ri.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ri,e,wu),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ri,Pu,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(a=>({...a})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];s(e.shapes,h)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),h=o(e.shapes),f=o(e.skeletons),d=o(e.animations),g=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),h.length>0&&(i.shapes=h),f.length>0&&(i.skeletons=f),d.length>0&&(i.animations=d),g.length>0&&(i.nodes=g)}return i.object=r,i;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}vt.DEFAULT_UP=new w(0,1,0);vt.DEFAULT_MATRIX_AUTO_UPDATE=!0;vt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Wt=new w,cn=new w,es=new w,un=new w,si=new w,oi=new w,ma=new w,ts=new w,ns=new w,is=new w,rs=new nt,ss=new nt,os=new nt;class Xt{constructor(e=new w,t=new w,i=new w){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),Wt.subVectors(e,t),r.cross(Wt);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){Wt.subVectors(r,t),cn.subVectors(i,t),es.subVectors(e,t);const o=Wt.dot(Wt),a=Wt.dot(cn),l=Wt.dot(es),c=cn.dot(cn),u=cn.dot(es),h=o*c-a*a;if(h===0)return s.set(0,0,0),null;const f=1/h,d=(c*l-a*u)*f,g=(o*u-a*l)*f;return s.set(1-d-g,g,d)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,un)===null?!1:un.x>=0&&un.y>=0&&un.x+un.y<=1}static getInterpolation(e,t,i,r,s,o,a,l){return this.getBarycoord(e,t,i,r,un)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,un.x),l.addScaledVector(o,un.y),l.addScaledVector(a,un.z),l)}static getInterpolatedAttribute(e,t,i,r,s,o){return rs.setScalar(0),ss.setScalar(0),os.setScalar(0),rs.fromBufferAttribute(e,t),ss.fromBufferAttribute(e,i),os.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(rs,s.x),o.addScaledVector(ss,s.y),o.addScaledVector(os,s.z),o}static isFrontFacing(e,t,i,r){return Wt.subVectors(i,t),cn.subVectors(e,t),Wt.cross(cn).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Wt.subVectors(this.c,this.b),cn.subVectors(this.a,this.b),Wt.cross(cn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Xt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Xt.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return Xt.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return Xt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Xt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let o,a;si.subVectors(r,i),oi.subVectors(s,i),ts.subVectors(e,i);const l=si.dot(ts),c=oi.dot(ts);if(l<=0&&c<=0)return t.copy(i);ns.subVectors(e,r);const u=si.dot(ns),h=oi.dot(ns);if(u>=0&&h<=u)return t.copy(r);const f=l*h-u*c;if(f<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(i).addScaledVector(si,o);is.subVectors(e,s);const d=si.dot(is),g=oi.dot(is);if(g>=0&&d<=g)return t.copy(s);const x=d*c-l*g;if(x<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(i).addScaledVector(oi,a);const m=u*g-d*h;if(m<=0&&h-u>=0&&d-g>=0)return ma.subVectors(s,r),a=(h-u)/(h-u+(d-g)),t.copy(r).addScaledVector(ma,a);const p=1/(m+x+f);return o=x*p,a=f*p,t.copy(i).addScaledVector(si,o).addScaledVector(oi,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const wl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Sn={h:0,s:0,l:0},ar={h:0,s:0,l:0};function as(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class qe{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=wt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ke.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=Ke.workingColorSpace){return this.r=e,this.g=t,this.b=i,Ke.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=Ke.workingColorSpace){if(e=Ro(e,1),t=Ge(t,0,1),i=Ge(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,o=2*i-s;this.r=as(o,s,e+1/3),this.g=as(o,s,e),this.b=as(o,s,e-1/3)}return Ke.colorSpaceToWorking(this,r),this}setStyle(e,t=wt){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=wt){const i=wl[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=mn(e.r),this.g=mn(e.g),this.b=mn(e.b),this}copyLinearToSRGB(e){return this.r=mi(e.r),this.g=mi(e.g),this.b=mi(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=wt){return Ke.workingToColorSpace(St.copy(this),e),Math.round(Ge(St.r*255,0,255))*65536+Math.round(Ge(St.g*255,0,255))*256+Math.round(Ge(St.b*255,0,255))}getHexString(e=wt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ke.workingColorSpace){Ke.workingToColorSpace(St.copy(this),t);const i=St.r,r=St.g,s=St.b,o=Math.max(i,r,s),a=Math.min(i,r,s);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const h=o-a;switch(c=u<=.5?h/(o+a):h/(2-o-a),o){case i:l=(r-s)/h+(r<s?6:0);break;case r:l=(s-i)/h+2;break;case s:l=(i-r)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=Ke.workingColorSpace){return Ke.workingToColorSpace(St.copy(this),t),e.r=St.r,e.g=St.g,e.b=St.b,e}getStyle(e=wt){Ke.workingToColorSpace(St.copy(this),e);const t=St.r,i=St.g,r=St.b;return e!==wt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(Sn),this.setHSL(Sn.h+e,Sn.s+t,Sn.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Sn),e.getHSL(ar);const i=Ni(Sn.h,ar.h,t),r=Ni(Sn.s,ar.s,t),s=Ni(Sn.l,ar.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const St=new qe;qe.NAMES=wl;let Du=0;class Ki extends yi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Du++}),this.uuid=Zn(),this.name="",this.type="Material",this.blending=pi,this.side=Cn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ps,this.blendDst=Ls,this.blendEquation=Hn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new qe(0,0,0),this.blendAlpha=0,this.depthFunc=gi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ea,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=$n,this.stencilZFail=$n,this.stencilZPass=$n,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==pi&&(i.blending=this.blending),this.side!==Cn&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Ps&&(i.blendSrc=this.blendSrc),this.blendDst!==Ls&&(i.blendDst=this.blendDst),this.blendEquation!==Hn&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==gi&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ea&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==$n&&(i.stencilFail=this.stencilFail),this.stencilZFail!==$n&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==$n&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(t){const s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Rn extends Ki{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new qe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ht,this.combine=dl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const mt=new w,lr=new le;let Iu=0;class Zt{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Iu++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=ta,this.updateRanges=[],this.gpuType=dn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)lr.fromBufferAttribute(this,t),lr.applyMatrix3(e),this.setXY(t,lr.x,lr.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)mt.fromBufferAttribute(this,t),mt.applyMatrix3(e),this.setXYZ(t,mt.x,mt.y,mt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)mt.fromBufferAttribute(this,t),mt.applyMatrix4(e),this.setXYZ(t,mt.x,mt.y,mt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)mt.fromBufferAttribute(this,t),mt.applyNormalMatrix(e),this.setXYZ(t,mt.x,mt.y,mt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)mt.fromBufferAttribute(this,t),mt.transformDirection(e),this.setXYZ(t,mt.x,mt.y,mt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=hi(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=bt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=hi(t,this.array)),t}setX(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=hi(t,this.array)),t}setY(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=hi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=hi(t,this.array)),t}setW(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=bt(t,this.array),i=bt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=bt(t,this.array),i=bt(i,this.array),r=bt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=bt(t,this.array),i=bt(i,this.array),r=bt(r,this.array),s=bt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==ta&&(e.usage=this.usage),e}}class Pl extends Zt{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Ll extends Zt{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class je extends Zt{constructor(e,t,i){super(new Float32Array(e),t,i)}}let Uu=0;const zt=new at,ls=new vt,ai=new w,Nt=new Ji,Ci=new Ji,xt=new w;class yt extends yi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Uu++}),this.uuid=Zn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Al(e)?Ll:Pl)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new He().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return zt.makeRotationFromQuaternion(e),this.applyMatrix4(zt),this}rotateX(e){return zt.makeRotationX(e),this.applyMatrix4(zt),this}rotateY(e){return zt.makeRotationY(e),this.applyMatrix4(zt),this}rotateZ(e){return zt.makeRotationZ(e),this.applyMatrix4(zt),this}translate(e,t,i){return zt.makeTranslation(e,t,i),this.applyMatrix4(zt),this}scale(e,t,i){return zt.makeScale(e,t,i),this.applyMatrix4(zt),this}lookAt(e){return ls.lookAt(e),ls.updateMatrix(),this.applyMatrix4(ls.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ai).negate(),this.translate(ai.x,ai.y,ai.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const o=e[r];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new je(i,3))}else{const i=Math.min(e.length,t.count);for(let r=0;r<i;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ji);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new w(-1/0,-1/0,-1/0),new w(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];Nt.setFromBufferAttribute(s),this.morphTargetsRelative?(xt.addVectors(this.boundingBox.min,Nt.min),this.boundingBox.expandByPoint(xt),xt.addVectors(this.boundingBox.max,Nt.max),this.boundingBox.expandByPoint(xt)):(this.boundingBox.expandByPoint(Nt.min),this.boundingBox.expandByPoint(Nt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new wo);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new w,1/0);return}if(e){const i=this.boundingSphere.center;if(Nt.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];Ci.setFromBufferAttribute(a),this.morphTargetsRelative?(xt.addVectors(Nt.min,Ci.min),Nt.expandByPoint(xt),xt.addVectors(Nt.max,Ci.max),Nt.expandByPoint(xt)):(Nt.expandByPoint(Ci.min),Nt.expandByPoint(Ci.max))}Nt.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)xt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(xt));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)xt.fromBufferAttribute(a,c),l&&(ai.fromBufferAttribute(e,c),xt.add(ai)),r=Math.max(r,i.distanceToSquared(xt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Zt(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let I=0;I<i.count;I++)a[I]=new w,l[I]=new w;const c=new w,u=new w,h=new w,f=new le,d=new le,g=new le,x=new w,m=new w;function p(I,y,S){c.fromBufferAttribute(i,I),u.fromBufferAttribute(i,y),h.fromBufferAttribute(i,S),f.fromBufferAttribute(s,I),d.fromBufferAttribute(s,y),g.fromBufferAttribute(s,S),u.sub(c),h.sub(c),d.sub(f),g.sub(f);const L=1/(d.x*g.y-g.x*d.y);isFinite(L)&&(x.copy(u).multiplyScalar(g.y).addScaledVector(h,-d.y).multiplyScalar(L),m.copy(h).multiplyScalar(d.x).addScaledVector(u,-g.x).multiplyScalar(L),a[I].add(x),a[y].add(x),a[S].add(x),l[I].add(m),l[y].add(m),l[S].add(m))}let T=this.groups;T.length===0&&(T=[{start:0,count:e.count}]);for(let I=0,y=T.length;I<y;++I){const S=T[I],L=S.start,O=S.count;for(let k=L,q=L+O;k<q;k+=3)p(e.getX(k+0),e.getX(k+1),e.getX(k+2))}const E=new w,v=new w,C=new w,R=new w;function P(I){C.fromBufferAttribute(r,I),R.copy(C);const y=a[I];E.copy(y),E.sub(C.multiplyScalar(C.dot(y))).normalize(),v.crossVectors(R,y);const L=v.dot(l[I])<0?-1:1;o.setXYZW(I,E.x,E.y,E.z,L)}for(let I=0,y=T.length;I<y;++I){const S=T[I],L=S.start,O=S.count;for(let k=L,q=L+O;k<q;k+=3)P(e.getX(k+0)),P(e.getX(k+1)),P(e.getX(k+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Zt(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let f=0,d=i.count;f<d;f++)i.setXYZ(f,0,0,0);const r=new w,s=new w,o=new w,a=new w,l=new w,c=new w,u=new w,h=new w;if(e)for(let f=0,d=e.count;f<d;f+=3){const g=e.getX(f+0),x=e.getX(f+1),m=e.getX(f+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,x),o.fromBufferAttribute(t,m),u.subVectors(o,s),h.subVectors(r,s),u.cross(h),a.fromBufferAttribute(i,g),l.fromBufferAttribute(i,x),c.fromBufferAttribute(i,m),a.add(u),l.add(u),c.add(u),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(x,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,d=t.count;f<d;f+=3)r.fromBufferAttribute(t,f+0),s.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),u.subVectors(o,s),h.subVectors(r,s),u.cross(h),i.setXYZ(f+0,u.x,u.y,u.z),i.setXYZ(f+1,u.x,u.y,u.z),i.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)xt.fromBufferAttribute(e,t),xt.normalize(),e.setXYZ(t,xt.x,xt.y,xt.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,h=a.normalized,f=new c.constructor(l.length*u);let d=0,g=0;for(let x=0,m=l.length;x<m;x++){a.isInterleavedBufferAttribute?d=l[x]*a.data.stride+a.offset:d=l[x]*u;for(let p=0;p<u;p++)f[g++]=c[d++]}return new Zt(f,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new yt,i=this.index.array,r=this.attributes;for(const a in r){const l=r[a],c=e(l,i);t.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let u=0,h=c.length;u<h;u++){const f=c[u],d=e(f,i);l.push(d)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,f=c.length;h<f;h++){const d=c[h];u.push(d.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],h=s[c];for(let f=0,d=h.length;f<d;f++)u.push(h[f].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const h=o[c];this.addGroup(h.start,h.count,h.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const ga=new at,Un=new Tu,cr=new wo,_a=new w,ur=new w,hr=new w,fr=new w,cs=new w,dr=new w,xa=new w,pr=new w;class tn extends vt{constructor(e=new yt,t=new Rn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){dr.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=a[l],h=s[l];u!==0&&(cs.fromBufferAttribute(h,e),o?dr.addScaledVector(cs,u):dr.addScaledVector(cs.sub(t),u))}t.add(dr)}return t}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),cr.copy(i.boundingSphere),cr.applyMatrix4(s),Un.copy(e.ray).recast(e.near),!(cr.containsPoint(Un.origin)===!1&&(Un.intersectSphere(cr,_a)===null||Un.origin.distanceToSquared(_a)>(e.far-e.near)**2))&&(ga.copy(s).invert(),Un.copy(e.ray).applyMatrix4(ga),!(i.boundingBox!==null&&Un.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Un)))}_computeIntersections(e,t,i){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,h=s.attributes.normal,f=s.groups,d=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,x=f.length;g<x;g++){const m=f[g],p=o[m.materialIndex],T=Math.max(m.start,d.start),E=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let v=T,C=E;v<C;v+=3){const R=a.getX(v),P=a.getX(v+1),I=a.getX(v+2);r=mr(this,p,e,i,c,u,h,R,P,I),r&&(r.faceIndex=Math.floor(v/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,d.start),x=Math.min(a.count,d.start+d.count);for(let m=g,p=x;m<p;m+=3){const T=a.getX(m),E=a.getX(m+1),v=a.getX(m+2);r=mr(this,o,e,i,c,u,h,T,E,v),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,x=f.length;g<x;g++){const m=f[g],p=o[m.materialIndex],T=Math.max(m.start,d.start),E=Math.min(l.count,Math.min(m.start+m.count,d.start+d.count));for(let v=T,C=E;v<C;v+=3){const R=v,P=v+1,I=v+2;r=mr(this,p,e,i,c,u,h,R,P,I),r&&(r.faceIndex=Math.floor(v/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,d.start),x=Math.min(l.count,d.start+d.count);for(let m=g,p=x;m<p;m+=3){const T=m,E=m+1,v=m+2;r=mr(this,o,e,i,c,u,h,T,E,v),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}}function Nu(n,e,t,i,r,s,o,a){let l;if(e.side===Lt?l=i.intersectTriangle(o,s,r,!0,a):l=i.intersectTriangle(r,s,o,e.side===Cn,a),l===null)return null;pr.copy(a),pr.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(pr);return c<t.near||c>t.far?null:{distance:c,point:pr.clone(),object:n}}function mr(n,e,t,i,r,s,o,a,l,c){n.getVertexPosition(a,ur),n.getVertexPosition(l,hr),n.getVertexPosition(c,fr);const u=Nu(n,e,t,i,ur,hr,fr,xa);if(u){const h=new w;Xt.getBarycoord(xa,ur,hr,fr,h),r&&(u.uv=Xt.getInterpolatedAttribute(r,a,l,c,h,new le)),s&&(u.uv1=Xt.getInterpolatedAttribute(s,a,l,c,h,new le)),o&&(u.normal=Xt.getInterpolatedAttribute(o,a,l,c,h,new w),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new w,materialIndex:0};Xt.getNormal(ur,hr,fr,f.normal),u.face=f,u.barycoord=h}return u}class Jn extends yt{constructor(e=1,t=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],u=[],h=[];let f=0,d=0;g("z","y","x",-1,-1,i,t,e,o,s,0),g("z","y","x",1,-1,i,t,-e,o,s,1),g("x","z","y",1,1,e,i,t,r,o,2),g("x","z","y",1,-1,e,i,-t,r,o,3),g("x","y","z",1,-1,e,t,i,r,s,4),g("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new je(c,3)),this.setAttribute("normal",new je(u,3)),this.setAttribute("uv",new je(h,2));function g(x,m,p,T,E,v,C,R,P,I,y){const S=v/P,L=C/I,O=v/2,k=C/2,q=R/2,V=P+1,X=I+1;let j=0,G=0;const he=new w;for(let _e=0;_e<X;_e++){const Me=_e*L-k;for(let ze=0;ze<V;ze++){const Ye=ze*S-O;he[x]=Ye*T,he[m]=Me*E,he[p]=q,c.push(he.x,he.y,he.z),he[x]=0,he[m]=0,he[p]=R>0?1:-1,u.push(he.x,he.y,he.z),h.push(ze/P),h.push(1-_e/I),j+=1}}for(let _e=0;_e<I;_e++)for(let Me=0;Me<P;Me++){const ze=f+Me+V*_e,Ye=f+Me+V*(_e+1),Qe=f+(Me+1)+V*(_e+1),Ze=f+(Me+1)+V*_e;l.push(ze,Ye,Ze),l.push(Ye,Qe,Ze),G+=6}a.addGroup(d,G,y),d+=G,f+=j}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Jn(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Mi(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone():Array.isArray(r)?e[t][i]=r.slice():e[t][i]=r}}return e}function Tt(n){const e={};for(let t=0;t<n.length;t++){const i=Mi(n[t]);for(const r in i)e[r]=i[r]}return e}function Fu(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Dl(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ke.workingColorSpace}const Ou={clone:Mi,merge:Tt};var Bu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,zu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class wn extends Ki{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Bu,this.fragmentShader=zu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Mi(e.uniforms),this.uniformsGroups=Fu(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class Il extends vt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new at,this.projectionMatrix=new at,this.projectionMatrixInverse=new at,this.coordinateSystem=en,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const yn=new w,va=new le,Ma=new le;class Ft extends Il{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Gi*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Ui*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Gi*2*Math.atan(Math.tan(Ui*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){yn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(yn.x,yn.y).multiplyScalar(-e/yn.z),yn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(yn.x,yn.y).multiplyScalar(-e/yn.z)}getViewSize(e,t){return this.getViewBounds(e,va,Ma),t.subVectors(Ma,va)}setViewOffset(e,t,i,r,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Ui*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,t-=o.offsetY*i/c,r*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const li=-90,ci=1;class ku extends vt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Ft(li,ci,e,t);r.layers=this.layers,this.add(r);const s=new Ft(li,ci,e,t);s.layers=this.layers,this.add(s);const o=new Ft(li,ci,e,t);o.layers=this.layers,this.add(o);const a=new Ft(li,ci,e,t);a.layers=this.layers,this.add(a);const l=new Ft(li,ci,e,t);l.layers=this.layers,this.add(l);const c=new Ft(li,ci,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,o,a,l]=t;for(const c of t)this.remove(c);if(e===en)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Ur)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,u]=this.children,h=e.getRenderTarget(),f=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(t,s),e.setRenderTarget(i,1,r),e.render(t,o),e.setRenderTarget(i,2,r),e.render(t,a),e.setRenderTarget(i,3,r),e.render(t,l),e.setRenderTarget(i,4,r),e.render(t,c),i.texture.generateMipmaps=x,e.setRenderTarget(i,5,r),e.render(t,u),e.setRenderTarget(h,f,d),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class Ul extends At{constructor(e=[],t=_i,i,r,s,o,a,l,c,u){super(e,t,i,r,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Hu extends qn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new Ul(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Jn(5,5,5),s=new wn({name:"CubemapFromEquirect",uniforms:Mi(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Lt,blending:bn});s.uniforms.tEquirect.value=t;const o=new tn(r,s),a=t.minFilter;return t.minFilter===Wn&&(t.minFilter=Qt),new ku(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,r);e.setRenderTarget(s)}}class gr extends vt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Vu={type:"move"};class us{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new gr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new gr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new w,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new w),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new gr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new w,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new w),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const x of e.hand.values()){const m=t.getJointPose(x,i),p=this._getHandJoint(c,x);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],f=u.position.distanceTo(h.position),d=.02,g=.005;c.inputState.pinching&&f>d+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=d-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Vu)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new gr;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class Po{constructor(e,t=1,i=1e3){this.isFog=!0,this.name="",this.color=new qe(e),this.near=t,this.far=i}clone(){return new Po(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Gu extends vt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ht,this.environmentIntensity=1,this.environmentRotation=new Ht,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const hs=new w,Wu=new w,Xu=new He;class zn{constructor(e=new w(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=hs.subVectors(i,t).cross(Wu.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(hs),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||Xu.getNormalMatrix(e),r=this.coplanarPoint(hs).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Nn=new wo,qu=new le(.5,.5),_r=new w;class Lo{constructor(e=new zn,t=new zn,i=new zn,r=new zn,s=new zn,o=new zn){this.planes=[e,t,i,r,s,o]}set(e,t,i,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=en,i=!1){const r=this.planes,s=e.elements,o=s[0],a=s[1],l=s[2],c=s[3],u=s[4],h=s[5],f=s[6],d=s[7],g=s[8],x=s[9],m=s[10],p=s[11],T=s[12],E=s[13],v=s[14],C=s[15];if(r[0].setComponents(c-o,d-u,p-g,C-T).normalize(),r[1].setComponents(c+o,d+u,p+g,C+T).normalize(),r[2].setComponents(c+a,d+h,p+x,C+E).normalize(),r[3].setComponents(c-a,d-h,p-x,C-E).normalize(),i)r[4].setComponents(l,f,m,v).normalize(),r[5].setComponents(c-l,d-f,p-m,C-v).normalize();else if(r[4].setComponents(c-l,d-f,p-m,C-v).normalize(),t===en)r[5].setComponents(c+l,d+f,p+m,C+v).normalize();else if(t===Ur)r[5].setComponents(l,f,m,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Nn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Nn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Nn)}intersectsSprite(e){Nn.center.set(0,0,0);const t=qu.distanceTo(e.center);return Nn.radius=.7071067811865476+t,Nn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Nn)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(_r.x=r.normal.x>0?e.max.x:e.min.x,_r.y=r.normal.y>0?e.max.y:e.min.y,_r.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(_r)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Nl extends At{constructor(e,t,i,r,s,o,a,l,c){super(e,t,i,r,s,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Fl extends At{constructor(e,t,i=Xn,r,s,o,a=Yt,l=Yt,c,u=Hi,h=1){if(u!==Hi&&u!==Vi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:e,height:t,depth:h};super(f,r,s,o,a,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Co(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Ol extends At{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Do extends yt{constructor(e=1,t=32,i=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:r},t=Math.max(3,t);const s=[],o=[],a=[],l=[],c=new w,u=new le;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let h=0,f=3;h<=t;h++,f+=3){const d=i+h/t*r;c.x=e*Math.cos(d),c.y=e*Math.sin(d),o.push(c.x,c.y,c.z),a.push(0,0,1),u.x=(o[f]/e+1)/2,u.y=(o[f+1]/e+1)/2,l.push(u.x,u.y)}for(let h=1;h<=t;h++)s.push(h,h+1,0);this.setIndex(s),this.setAttribute("position",new je(o,3)),this.setAttribute("normal",new je(a,3)),this.setAttribute("uv",new je(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Do(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Fr extends yt{constructor(e=1,t=1,i=1,r=32,s=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const u=[],h=[],f=[],d=[];let g=0;const x=[],m=i/2;let p=0;T(),o===!1&&(e>0&&E(!0),t>0&&E(!1)),this.setIndex(u),this.setAttribute("position",new je(h,3)),this.setAttribute("normal",new je(f,3)),this.setAttribute("uv",new je(d,2));function T(){const v=new w,C=new w;let R=0;const P=(t-e)/i;for(let I=0;I<=s;I++){const y=[],S=I/s,L=S*(t-e)+e;for(let O=0;O<=r;O++){const k=O/r,q=k*l+a,V=Math.sin(q),X=Math.cos(q);C.x=L*V,C.y=-S*i+m,C.z=L*X,h.push(C.x,C.y,C.z),v.set(V,P,X).normalize(),f.push(v.x,v.y,v.z),d.push(k,1-S),y.push(g++)}x.push(y)}for(let I=0;I<r;I++)for(let y=0;y<s;y++){const S=x[y][I],L=x[y+1][I],O=x[y+1][I+1],k=x[y][I+1];(e>0||y!==0)&&(u.push(S,L,k),R+=3),(t>0||y!==s-1)&&(u.push(L,O,k),R+=3)}c.addGroup(p,R,0),p+=R}function E(v){const C=g,R=new le,P=new w;let I=0;const y=v===!0?e:t,S=v===!0?1:-1;for(let O=1;O<=r;O++)h.push(0,m*S,0),f.push(0,S,0),d.push(.5,.5),g++;const L=g;for(let O=0;O<=r;O++){const q=O/r*l+a,V=Math.cos(q),X=Math.sin(q);P.x=y*X,P.y=m*S,P.z=y*V,h.push(P.x,P.y,P.z),f.push(0,S,0),R.x=V*.5+.5,R.y=X*.5*S+.5,d.push(R.x,R.y),g++}for(let O=0;O<r;O++){const k=C+O,q=L+O;v===!0?u.push(q,q+1,k):u.push(q+1,q,k),I+=3}c.addGroup(p,I,v===!0?1:2),p+=I}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Fr(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class rn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){const i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let i,r=this.getPoint(0),s=0;t.push(0);for(let o=1;o<=e;o++)i=this.getPoint(o/e),s+=i.distanceTo(r),t.push(s),r=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const i=this.getLengths();let r=0;const s=i.length;let o;t?o=t:o=e*i[s-1];let a=0,l=s-1,c;for(;a<=l;)if(r=Math.floor(a+(l-a)/2),c=i[r]-o,c<0)a=r+1;else if(c>0)l=r-1;else{l=r;break}if(r=l,i[r]===o)return r/(s-1);const u=i[r],f=i[r+1]-u,d=(o-u)/f;return(r+d)/(s-1)}getTangent(e,t){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);const o=this.getPoint(r),a=this.getPoint(s),l=t||(o.isVector2?new le:new w);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){const i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t=!1){const i=new w,r=[],s=[],o=[],a=new w,l=new at;for(let d=0;d<=e;d++){const g=d/e;r[d]=this.getTangentAt(g,new w)}s[0]=new w,o[0]=new w;let c=Number.MAX_VALUE;const u=Math.abs(r[0].x),h=Math.abs(r[0].y),f=Math.abs(r[0].z);u<=c&&(c=u,i.set(1,0,0)),h<=c&&(c=h,i.set(0,1,0)),f<=c&&i.set(0,0,1),a.crossVectors(r[0],i).normalize(),s[0].crossVectors(r[0],a),o[0].crossVectors(r[0],s[0]);for(let d=1;d<=e;d++){if(s[d]=s[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(r[d-1],r[d]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(Ge(r[d-1].dot(r[d]),-1,1));s[d].applyMatrix4(l.makeRotationAxis(a,g))}o[d].crossVectors(r[d],s[d])}if(t===!0){let d=Math.acos(Ge(s[0].dot(s[e]),-1,1));d/=e,r[0].dot(a.crossVectors(s[0],s[e]))>0&&(d=-d);for(let g=1;g<=e;g++)s[g].applyMatrix4(l.makeRotationAxis(r[g],d*g)),o[g].crossVectors(r[g],s[g])}return{tangents:r,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Io extends rn{constructor(e=0,t=0,i=1,r=1,s=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,t=new le){const i=t,r=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(o?s=0:s=r),this.aClockwise===!0&&!o&&(s===r?s=-r:s=s-r);const a=this.aStartAngle+e*s;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),f=l-this.aX,d=c-this.aY;l=f*u-d*h+this.aX,c=f*h+d*u+this.aY}return i.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class Yu extends Io{constructor(e,t,i,r,s,o){super(e,t,i,i,r,s,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Uo(){let n=0,e=0,t=0,i=0;function r(s,o,a,l){n=s,e=a,t=-3*s+3*o-2*a-l,i=2*s-2*o+a+l}return{initCatmullRom:function(s,o,a,l,c){r(o,a,c*(a-s),c*(l-o))},initNonuniformCatmullRom:function(s,o,a,l,c,u,h){let f=(o-s)/c-(a-s)/(c+u)+(a-o)/u,d=(a-o)/u-(l-o)/(u+h)+(l-a)/h;f*=u,d*=u,r(o,a,f,d)},calc:function(s){const o=s*s,a=o*s;return n+e*s+t*o+i*a}}}const xr=new w,fs=new Uo,ds=new Uo,ps=new Uo;class Bl extends rn{constructor(e=[],t=!1,i="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=r}getPoint(e,t=new w){const i=t,r=this.points,s=r.length,o=(s-(this.closed?0:1))*e;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:l===0&&a===s-1&&(a=s-2,l=1);let c,u;this.closed||a>0?c=r[(a-1)%s]:(xr.subVectors(r[0],r[1]).add(r[0]),c=xr);const h=r[a%s],f=r[(a+1)%s];if(this.closed||a+2<s?u=r[(a+2)%s]:(xr.subVectors(r[s-1],r[s-2]).add(r[s-1]),u=xr),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(h),d),x=Math.pow(h.distanceToSquared(f),d),m=Math.pow(f.distanceToSquared(u),d);x<1e-4&&(x=1),g<1e-4&&(g=x),m<1e-4&&(m=x),fs.initNonuniformCatmullRom(c.x,h.x,f.x,u.x,g,x,m),ds.initNonuniformCatmullRom(c.y,h.y,f.y,u.y,g,x,m),ps.initNonuniformCatmullRom(c.z,h.z,f.z,u.z,g,x,m)}else this.curveType==="catmullrom"&&(fs.initCatmullRom(c.x,h.x,f.x,u.x,this.tension),ds.initCatmullRom(c.y,h.y,f.y,u.y,this.tension),ps.initCatmullRom(c.z,h.z,f.z,u.z,this.tension));return i.set(fs.calc(l),ds.calc(l),ps.calc(l)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(new w().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Sa(n,e,t,i,r){const s=(i-e)*.5,o=(r-t)*.5,a=n*n,l=n*a;return(2*t-2*i+s+o)*l+(-3*t+3*i-2*s-o)*a+s*n+t}function Zu(n,e){const t=1-n;return t*t*e}function Ju(n,e){return 2*(1-n)*n*e}function Ku(n,e){return n*n*e}function Fi(n,e,t,i){return Zu(n,e)+Ju(n,t)+Ku(n,i)}function $u(n,e){const t=1-n;return t*t*t*e}function ju(n,e){const t=1-n;return 3*t*t*n*e}function Qu(n,e){return 3*(1-n)*n*n*e}function eh(n,e){return n*n*n*e}function Oi(n,e,t,i,r){return $u(n,e)+ju(n,t)+Qu(n,i)+eh(n,r)}class zl extends rn{constructor(e=new le,t=new le,i=new le,r=new le){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=r}getPoint(e,t=new le){const i=t,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return i.set(Oi(e,r.x,s.x,o.x,a.x),Oi(e,r.y,s.y,o.y,a.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class th extends rn{constructor(e=new w,t=new w,i=new w,r=new w){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=r}getPoint(e,t=new w){const i=t,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return i.set(Oi(e,r.x,s.x,o.x,a.x),Oi(e,r.y,s.y,o.y,a.y),Oi(e,r.z,s.z,o.z,a.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class kl extends rn{constructor(e=new le,t=new le){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new le){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new le){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class nh extends rn{constructor(e=new w,t=new w){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new w){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new w){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Hl extends rn{constructor(e=new le,t=new le,i=new le){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new le){const i=t,r=this.v0,s=this.v1,o=this.v2;return i.set(Fi(e,r.x,s.x,o.x),Fi(e,r.y,s.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Vl extends rn{constructor(e=new w,t=new w,i=new w){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new w){const i=t,r=this.v0,s=this.v1,o=this.v2;return i.set(Fi(e,r.x,s.x,o.x),Fi(e,r.y,s.y,o.y),Fi(e,r.z,s.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Gl extends rn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new le){const i=t,r=this.points,s=(r.length-1)*e,o=Math.floor(s),a=s-o,l=r[o===0?o:o-1],c=r[o],u=r[o>r.length-2?r.length-1:o+1],h=r[o>r.length-3?r.length-1:o+2];return i.set(Sa(a,l.x,c.x,u.x,h.x),Sa(a,l.y,c.y,u.y,h.y)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const r=this.points[t];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(new le().fromArray(r))}return this}}var Or=Object.freeze({__proto__:null,ArcCurve:Yu,CatmullRomCurve3:Bl,CubicBezierCurve:zl,CubicBezierCurve3:th,EllipseCurve:Io,LineCurve:kl,LineCurve3:nh,QuadraticBezierCurve:Hl,QuadraticBezierCurve3:Vl,SplineCurve:Gl});class ih extends rn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Or[i](t,e))}return this}getPoint(e,t){const i=e*this.getLength(),r=this.getCurveLengths();let s=0;for(;s<r.length;){if(r[s]>=i){const o=r[s]-i,a=this.curves[s],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,t)}s++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let i=0,r=this.curves.length;i<r;i++)t+=this.curves[i].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let i;for(let r=0,s=this.curves;r<s.length;r++){const o=s[r],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,l=o.getPoints(a);for(let c=0;c<l.length;c++){const u=l[c];i&&i.equals(u)||(t.push(u),i=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const r=e.curves[t];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,i=this.curves.length;t<i;t++){const r=this.curves[t];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const r=e.curves[t];this.curves.push(new Or[r.type]().fromJSON(r))}return this}}class ya extends ih{constructor(e){super(),this.type="Path",this.currentPoint=new le,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,i=e.length;t<i;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const i=new kl(this.currentPoint.clone(),new le(e,t));return this.curves.push(i),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,i,r){const s=new Hl(this.currentPoint.clone(),new le(e,t),new le(i,r));return this.curves.push(s),this.currentPoint.set(i,r),this}bezierCurveTo(e,t,i,r,s,o){const a=new zl(this.currentPoint.clone(),new le(e,t),new le(i,r),new le(s,o));return this.curves.push(a),this.currentPoint.set(s,o),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),i=new Gl(t);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,i,r,s,o){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,t+l,i,r,s,o),this}absarc(e,t,i,r,s,o){return this.absellipse(e,t,i,i,r,s,o),this}ellipse(e,t,i,r,s,o,a,l){const c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+c,t+u,i,r,s,o,a,l),this}absellipse(e,t,i,r,s,o,a,l){const c=new Io(e,t,i,r,s,o,a,l);if(this.curves.length>0){const h=c.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(c);const u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class Wl extends ya{constructor(e){super(e),this.uuid=Zn(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let i=0,r=this.holes.length;i<r;i++)t[i]=this.holes[i].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){const r=e.holes[t];this.holes.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,i=this.holes.length;t<i;t++){const r=this.holes[t];e.holes.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){const r=e.holes[t];this.holes.push(new ya().fromJSON(r))}return this}}function rh(n,e,t=2){const i=e&&e.length,r=i?e[0]*t:n.length;let s=Xl(n,0,r,t,!0);const o=[];if(!s||s.next===s.prev)return o;let a,l,c;if(i&&(s=ch(n,e,s,t)),n.length>80*t){a=1/0,l=1/0;let u=-1/0,h=-1/0;for(let f=t;f<r;f+=t){const d=n[f],g=n[f+1];d<a&&(a=d),g<l&&(l=g),d>u&&(u=d),g>h&&(h=g)}c=Math.max(u-a,h-l),c=c!==0?32767/c:0}return Xi(s,o,t,a,l,c,0),o}function Xl(n,e,t,i,r){let s;if(r===Mh(n,e,t,i)>0)for(let o=e;o<t;o+=i)s=Ea(o/i|0,n[o],n[o+1],s);else for(let o=t-i;o>=e;o-=i)s=Ea(o/i|0,n[o],n[o+1],s);return s&&Si(s,s.next)&&(Yi(s),s=s.next),s}function Yn(n,e){if(!n)return n;e||(e=n);let t=n,i;do if(i=!1,!t.steiner&&(Si(t,t.next)||ft(t.prev,t,t.next)===0)){if(Yi(t),t=e=t.prev,t===t.next)break;i=!0}else t=t.next;while(i||t!==e);return e}function Xi(n,e,t,i,r,s,o){if(!n)return;!o&&s&&ph(n,i,r,s);let a=n;for(;n.prev!==n.next;){const l=n.prev,c=n.next;if(s?oh(n,i,r,s):sh(n)){e.push(l.i,n.i,c.i),Yi(n),n=c.next,a=c.next;continue}if(n=c,n===a){o?o===1?(n=ah(Yn(n),e),Xi(n,e,t,i,r,s,2)):o===2&&lh(n,e,t,i,r,s):Xi(Yn(n),e,t,i,r,s,1);break}}}function sh(n){const e=n.prev,t=n,i=n.next;if(ft(e,t,i)>=0)return!1;const r=e.x,s=t.x,o=i.x,a=e.y,l=t.y,c=i.y,u=Math.min(r,s,o),h=Math.min(a,l,c),f=Math.max(r,s,o),d=Math.max(a,l,c);let g=i.next;for(;g!==e;){if(g.x>=u&&g.x<=f&&g.y>=h&&g.y<=d&&Di(r,a,s,l,o,c,g.x,g.y)&&ft(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function oh(n,e,t,i){const r=n.prev,s=n,o=n.next;if(ft(r,s,o)>=0)return!1;const a=r.x,l=s.x,c=o.x,u=r.y,h=s.y,f=o.y,d=Math.min(a,l,c),g=Math.min(u,h,f),x=Math.max(a,l,c),m=Math.max(u,h,f),p=_o(d,g,e,t,i),T=_o(x,m,e,t,i);let E=n.prevZ,v=n.nextZ;for(;E&&E.z>=p&&v&&v.z<=T;){if(E.x>=d&&E.x<=x&&E.y>=g&&E.y<=m&&E!==r&&E!==o&&Di(a,u,l,h,c,f,E.x,E.y)&&ft(E.prev,E,E.next)>=0||(E=E.prevZ,v.x>=d&&v.x<=x&&v.y>=g&&v.y<=m&&v!==r&&v!==o&&Di(a,u,l,h,c,f,v.x,v.y)&&ft(v.prev,v,v.next)>=0))return!1;v=v.nextZ}for(;E&&E.z>=p;){if(E.x>=d&&E.x<=x&&E.y>=g&&E.y<=m&&E!==r&&E!==o&&Di(a,u,l,h,c,f,E.x,E.y)&&ft(E.prev,E,E.next)>=0)return!1;E=E.prevZ}for(;v&&v.z<=T;){if(v.x>=d&&v.x<=x&&v.y>=g&&v.y<=m&&v!==r&&v!==o&&Di(a,u,l,h,c,f,v.x,v.y)&&ft(v.prev,v,v.next)>=0)return!1;v=v.nextZ}return!0}function ah(n,e){let t=n;do{const i=t.prev,r=t.next.next;!Si(i,r)&&Yl(i,t,t.next,r)&&qi(i,r)&&qi(r,i)&&(e.push(i.i,t.i,r.i),Yi(t),Yi(t.next),t=n=r),t=t.next}while(t!==n);return Yn(t)}function lh(n,e,t,i,r,s){let o=n;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&_h(o,a)){let l=Zl(o,a);o=Yn(o,o.next),l=Yn(l,l.next),Xi(o,e,t,i,r,s,0),Xi(l,e,t,i,r,s,0);return}a=a.next}o=o.next}while(o!==n)}function ch(n,e,t,i){const r=[];for(let s=0,o=e.length;s<o;s++){const a=e[s]*i,l=s<o-1?e[s+1]*i:n.length,c=Xl(n,a,l,i,!1);c===c.next&&(c.steiner=!0),r.push(gh(c))}r.sort(uh);for(let s=0;s<r.length;s++)t=hh(r[s],t);return t}function uh(n,e){let t=n.x-e.x;if(t===0&&(t=n.y-e.y,t===0)){const i=(n.next.y-n.y)/(n.next.x-n.x),r=(e.next.y-e.y)/(e.next.x-e.x);t=i-r}return t}function hh(n,e){const t=fh(n,e);if(!t)return e;const i=Zl(t,n);return Yn(i,i.next),Yn(t,t.next)}function fh(n,e){let t=e;const i=n.x,r=n.y;let s=-1/0,o;if(Si(n,t))return t;do{if(Si(n,t.next))return t.next;if(r<=t.y&&r>=t.next.y&&t.next.y!==t.y){const h=t.x+(r-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(h<=i&&h>s&&(s=h,o=t.x<t.next.x?t:t.next,h===i))return o}t=t.next}while(t!==e);if(!o)return null;const a=o,l=o.x,c=o.y;let u=1/0;t=o;do{if(i>=t.x&&t.x>=l&&i!==t.x&&ql(r<c?i:s,r,l,c,r<c?s:i,r,t.x,t.y)){const h=Math.abs(r-t.y)/(i-t.x);qi(t,n)&&(h<u||h===u&&(t.x>o.x||t.x===o.x&&dh(o,t)))&&(o=t,u=h)}t=t.next}while(t!==a);return o}function dh(n,e){return ft(n.prev,n,e.prev)<0&&ft(e.next,n,n.next)<0}function ph(n,e,t,i){let r=n;do r.z===0&&(r.z=_o(r.x,r.y,e,t,i)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==n);r.prevZ.nextZ=null,r.prevZ=null,mh(r)}function mh(n){let e,t=1;do{let i=n,r;n=null;let s=null;for(e=0;i;){e++;let o=i,a=0;for(let c=0;c<t&&(a++,o=o.nextZ,!!o);c++);let l=t;for(;a>0||l>0&&o;)a!==0&&(l===0||!o||i.z<=o.z)?(r=i,i=i.nextZ,a--):(r=o,o=o.nextZ,l--),s?s.nextZ=r:n=r,r.prevZ=s,s=r;i=o}s.nextZ=null,t*=2}while(e>1);return n}function _o(n,e,t,i,r){return n=(n-t)*r|0,e=(e-i)*r|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,n|e<<1}function gh(n){let e=n,t=n;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==n);return t}function ql(n,e,t,i,r,s,o,a){return(r-o)*(e-a)>=(n-o)*(s-a)&&(n-o)*(i-a)>=(t-o)*(e-a)&&(t-o)*(s-a)>=(r-o)*(i-a)}function Di(n,e,t,i,r,s,o,a){return!(n===o&&e===a)&&ql(n,e,t,i,r,s,o,a)}function _h(n,e){return n.next.i!==e.i&&n.prev.i!==e.i&&!xh(n,e)&&(qi(n,e)&&qi(e,n)&&vh(n,e)&&(ft(n.prev,n,e.prev)||ft(n,e.prev,e))||Si(n,e)&&ft(n.prev,n,n.next)>0&&ft(e.prev,e,e.next)>0)}function ft(n,e,t){return(e.y-n.y)*(t.x-e.x)-(e.x-n.x)*(t.y-e.y)}function Si(n,e){return n.x===e.x&&n.y===e.y}function Yl(n,e,t,i){const r=Mr(ft(n,e,t)),s=Mr(ft(n,e,i)),o=Mr(ft(t,i,n)),a=Mr(ft(t,i,e));return!!(r!==s&&o!==a||r===0&&vr(n,t,e)||s===0&&vr(n,i,e)||o===0&&vr(t,n,i)||a===0&&vr(t,e,i))}function vr(n,e,t){return e.x<=Math.max(n.x,t.x)&&e.x>=Math.min(n.x,t.x)&&e.y<=Math.max(n.y,t.y)&&e.y>=Math.min(n.y,t.y)}function Mr(n){return n>0?1:n<0?-1:0}function xh(n,e){let t=n;do{if(t.i!==n.i&&t.next.i!==n.i&&t.i!==e.i&&t.next.i!==e.i&&Yl(t,t.next,n,e))return!0;t=t.next}while(t!==n);return!1}function qi(n,e){return ft(n.prev,n,n.next)<0?ft(n,e,n.next)>=0&&ft(n,n.prev,e)>=0:ft(n,e,n.prev)<0||ft(n,n.next,e)<0}function vh(n,e){let t=n,i=!1;const r=(n.x+e.x)/2,s=(n.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&r<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(i=!i),t=t.next;while(t!==n);return i}function Zl(n,e){const t=xo(n.i,n.x,n.y),i=xo(e.i,e.x,e.y),r=n.next,s=e.prev;return n.next=e,e.prev=n,t.next=r,r.prev=t,i.next=t,t.prev=i,s.next=i,i.prev=s,i}function Ea(n,e,t,i){const r=xo(n,e,t);return i?(r.next=i.next,r.prev=i,i.next.prev=r,i.next=r):(r.prev=r,r.next=r),r}function Yi(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function xo(n,e,t){return{i:n,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Mh(n,e,t,i){let r=0;for(let s=e,o=t-i;s<t;s+=i)r+=(n[o]-n[s])*(n[s+1]+n[o+1]),o=s;return r}class Sh{static triangulate(e,t,i=2){return rh(e,t,i)}}class fi{static area(e){const t=e.length;let i=0;for(let r=t-1,s=0;s<t;r=s++)i+=e[r].x*e[s].y-e[s].x*e[r].y;return i*.5}static isClockWise(e){return fi.area(e)<0}static triangulateShape(e,t){const i=[],r=[],s=[];ba(e),Ta(i,e);let o=e.length;t.forEach(ba);for(let l=0;l<t.length;l++)r.push(o),o+=t[l].length,Ta(i,t[l]);const a=Sh.triangulate(i,r);for(let l=0;l<a.length;l+=3)s.push(a.slice(l,l+3));return s}}function ba(n){const e=n.length;e>2&&n[e-1].equals(n[0])&&n.pop()}function Ta(n,e){for(let t=0;t<e.length;t++)n.push(e[t].x),n.push(e[t].y)}class No extends yt{constructor(e=new Wl([new le(.5,.5),new le(-.5,.5),new le(-.5,-.5),new le(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const i=this,r=[],s=[];for(let a=0,l=e.length;a<l;a++){const c=e[a];o(c)}this.setAttribute("position",new je(r,3)),this.setAttribute("uv",new je(s,2)),this.computeVertexNormals();function o(a){const l=[],c=t.curveSegments!==void 0?t.curveSegments:12,u=t.steps!==void 0?t.steps:1,h=t.depth!==void 0?t.depth:1;let f=t.bevelEnabled!==void 0?t.bevelEnabled:!0,d=t.bevelThickness!==void 0?t.bevelThickness:.2,g=t.bevelSize!==void 0?t.bevelSize:d-.1,x=t.bevelOffset!==void 0?t.bevelOffset:0,m=t.bevelSegments!==void 0?t.bevelSegments:3;const p=t.extrudePath,T=t.UVGenerator!==void 0?t.UVGenerator:yh;let E,v=!1,C,R,P,I;p&&(E=p.getSpacedPoints(u),v=!0,f=!1,C=p.computeFrenetFrames(u,!1),R=new w,P=new w,I=new w),f||(m=0,d=0,g=0,x=0);const y=a.extractPoints(c);let S=y.shape;const L=y.holes;if(!fi.isClockWise(S)){S=S.reverse();for(let ee=0,K=L.length;ee<K;ee++){const J=L[ee];fi.isClockWise(J)&&(L[ee]=J.reverse())}}function k(ee){const J=10000000000000001e-36;let Z=ee[0];for(let ce=1;ce<=ee.length;ce++){const ne=ce%ee.length,ue=ee[ne],Fe=ue.x-Z.x,Ne=ue.y-Z.y,b=Fe*Fe+Ne*Ne,_=Math.max(Math.abs(ue.x),Math.abs(ue.y),Math.abs(Z.x),Math.abs(Z.y)),F=J*_*_;if(b<=F){ee.splice(ne,1),ce--;continue}Z=ue}}k(S),L.forEach(k);const q=L.length,V=S;for(let ee=0;ee<q;ee++){const K=L[ee];S=S.concat(K)}function X(ee,K,J){return K||console.error("THREE.ExtrudeGeometry: vec does not exist"),ee.clone().addScaledVector(K,J)}const j=S.length;function G(ee,K,J){let Z,ce,ne;const ue=ee.x-K.x,Fe=ee.y-K.y,Ne=J.x-ee.x,b=J.y-ee.y,_=ue*ue+Fe*Fe,F=ue*b-Fe*Ne;if(Math.abs(F)>Number.EPSILON){const H=Math.sqrt(_),Q=Math.sqrt(Ne*Ne+b*b),W=K.x-Fe/H,Re=K.y+ue/H,ae=J.x-b/Q,be=J.y+Ne/Q,Te=((ae-W)*b-(be-Re)*Ne)/(ue*b-Fe*Ne);Z=W+ue*Te-ee.x,ce=Re+Fe*Te-ee.y;const ie=Z*Z+ce*ce;if(ie<=2)return new le(Z,ce);ne=Math.sqrt(ie/2)}else{let H=!1;ue>Number.EPSILON?Ne>Number.EPSILON&&(H=!0):ue<-Number.EPSILON?Ne<-Number.EPSILON&&(H=!0):Math.sign(Fe)===Math.sign(b)&&(H=!0),H?(Z=-Fe,ce=ue,ne=Math.sqrt(_)):(Z=ue,ce=Fe,ne=Math.sqrt(_/2))}return new le(Z/ne,ce/ne)}const he=[];for(let ee=0,K=V.length,J=K-1,Z=ee+1;ee<K;ee++,J++,Z++)J===K&&(J=0),Z===K&&(Z=0),he[ee]=G(V[ee],V[J],V[Z]);const _e=[];let Me,ze=he.concat();for(let ee=0,K=q;ee<K;ee++){const J=L[ee];Me=[];for(let Z=0,ce=J.length,ne=ce-1,ue=Z+1;Z<ce;Z++,ne++,ue++)ne===ce&&(ne=0),ue===ce&&(ue=0),Me[Z]=G(J[Z],J[ne],J[ue]);_e.push(Me),ze=ze.concat(Me)}let Ye;if(m===0)Ye=fi.triangulateShape(V,L);else{const ee=[],K=[];for(let J=0;J<m;J++){const Z=J/m,ce=d*Math.cos(Z*Math.PI/2),ne=g*Math.sin(Z*Math.PI/2)+x;for(let ue=0,Fe=V.length;ue<Fe;ue++){const Ne=X(V[ue],he[ue],ne);we(Ne.x,Ne.y,-ce),Z===0&&ee.push(Ne)}for(let ue=0,Fe=q;ue<Fe;ue++){const Ne=L[ue];Me=_e[ue];const b=[];for(let _=0,F=Ne.length;_<F;_++){const H=X(Ne[_],Me[_],ne);we(H.x,H.y,-ce),Z===0&&b.push(H)}Z===0&&K.push(b)}}Ye=fi.triangulateShape(ee,K)}const Qe=Ye.length,Ze=g+x;for(let ee=0;ee<j;ee++){const K=f?X(S[ee],ze[ee],Ze):S[ee];v?(P.copy(C.normals[0]).multiplyScalar(K.x),R.copy(C.binormals[0]).multiplyScalar(K.y),I.copy(E[0]).add(P).add(R),we(I.x,I.y,I.z)):we(K.x,K.y,0)}for(let ee=1;ee<=u;ee++)for(let K=0;K<j;K++){const J=f?X(S[K],ze[K],Ze):S[K];v?(P.copy(C.normals[ee]).multiplyScalar(J.x),R.copy(C.binormals[ee]).multiplyScalar(J.y),I.copy(E[ee]).add(P).add(R),we(I.x,I.y,I.z)):we(J.x,J.y,h/u*ee)}for(let ee=m-1;ee>=0;ee--){const K=ee/m,J=d*Math.cos(K*Math.PI/2),Z=g*Math.sin(K*Math.PI/2)+x;for(let ce=0,ne=V.length;ce<ne;ce++){const ue=X(V[ce],he[ce],Z);we(ue.x,ue.y,h+J)}for(let ce=0,ne=L.length;ce<ne;ce++){const ue=L[ce];Me=_e[ce];for(let Fe=0,Ne=ue.length;Fe<Ne;Fe++){const b=X(ue[Fe],Me[Fe],Z);v?we(b.x,b.y+E[u-1].y,E[u-1].x+J):we(b.x,b.y,h+J)}}}Y(),te();function Y(){const ee=r.length/3;if(f){let K=0,J=j*K;for(let Z=0;Z<Qe;Z++){const ce=Ye[Z];Ee(ce[2]+J,ce[1]+J,ce[0]+J)}K=u+m*2,J=j*K;for(let Z=0;Z<Qe;Z++){const ce=Ye[Z];Ee(ce[0]+J,ce[1]+J,ce[2]+J)}}else{for(let K=0;K<Qe;K++){const J=Ye[K];Ee(J[2],J[1],J[0])}for(let K=0;K<Qe;K++){const J=Ye[K];Ee(J[0]+j*u,J[1]+j*u,J[2]+j*u)}}i.addGroup(ee,r.length/3-ee,0)}function te(){const ee=r.length/3;let K=0;ve(V,K),K+=V.length;for(let J=0,Z=L.length;J<Z;J++){const ce=L[J];ve(ce,K),K+=ce.length}i.addGroup(ee,r.length/3-ee,1)}function ve(ee,K){let J=ee.length;for(;--J>=0;){const Z=J;let ce=J-1;ce<0&&(ce=ee.length-1);for(let ne=0,ue=u+m*2;ne<ue;ne++){const Fe=j*ne,Ne=j*(ne+1),b=K+Z+Fe,_=K+ce+Fe,F=K+ce+Ne,H=K+Z+Ne;We(b,_,F,H)}}}function we(ee,K,J){l.push(ee),l.push(K),l.push(J)}function Ee(ee,K,J){st(ee),st(K),st(J);const Z=r.length/3,ce=T.generateTopUV(i,r,Z-3,Z-2,Z-1);A(ce[0]),A(ce[1]),A(ce[2])}function We(ee,K,J,Z){st(ee),st(K),st(Z),st(K),st(J),st(Z);const ce=r.length/3,ne=T.generateSideWallUV(i,r,ce-6,ce-3,ce-2,ce-1);A(ne[0]),A(ne[1]),A(ne[3]),A(ne[1]),A(ne[2]),A(ne[3])}function st(ee){r.push(l[ee*3+0]),r.push(l[ee*3+1]),r.push(l[ee*3+2])}function A(ee){s.push(ee.x),s.push(ee.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,i=this.parameters.options;return Eh(t,i,e)}static fromJSON(e,t){const i=[];for(let s=0,o=e.shapes.length;s<o;s++){const a=t[e.shapes[s]];i.push(a)}const r=e.options.extrudePath;return r!==void 0&&(e.options.extrudePath=new Or[r.type]().fromJSON(r)),new No(i,e.options)}}const yh={generateTopUV:function(n,e,t,i,r){const s=e[t*3],o=e[t*3+1],a=e[i*3],l=e[i*3+1],c=e[r*3],u=e[r*3+1];return[new le(s,o),new le(a,l),new le(c,u)]},generateSideWallUV:function(n,e,t,i,r,s){const o=e[t*3],a=e[t*3+1],l=e[t*3+2],c=e[i*3],u=e[i*3+1],h=e[i*3+2],f=e[r*3],d=e[r*3+1],g=e[r*3+2],x=e[s*3],m=e[s*3+1],p=e[s*3+2];return Math.abs(a-u)<Math.abs(o-c)?[new le(o,1-l),new le(c,1-h),new le(f,1-g),new le(x,1-p)]:[new le(a,1-l),new le(u,1-h),new le(d,1-g),new le(m,1-p)]}};function Eh(n,e,t){if(t.shapes=[],Array.isArray(n))for(let i=0,r=n.length;i<r;i++){const s=n[i];t.shapes.push(s.uuid)}else t.shapes.push(n.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class Fo extends yt{constructor(e=[new le(0,-.5),new le(.5,0),new le(0,.5)],t=12,i=0,r=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:i,phiLength:r},t=Math.floor(t),r=Ge(r,0,Math.PI*2);const s=[],o=[],a=[],l=[],c=[],u=1/t,h=new w,f=new le,d=new w,g=new w,x=new w;let m=0,p=0;for(let T=0;T<=e.length-1;T++)switch(T){case 0:m=e[T+1].x-e[T].x,p=e[T+1].y-e[T].y,d.x=p*1,d.y=-m,d.z=p*0,x.copy(d),d.normalize(),l.push(d.x,d.y,d.z);break;case e.length-1:l.push(x.x,x.y,x.z);break;default:m=e[T+1].x-e[T].x,p=e[T+1].y-e[T].y,d.x=p*1,d.y=-m,d.z=p*0,g.copy(d),d.x+=x.x,d.y+=x.y,d.z+=x.z,d.normalize(),l.push(d.x,d.y,d.z),x.copy(g)}for(let T=0;T<=t;T++){const E=i+T*u*r,v=Math.sin(E),C=Math.cos(E);for(let R=0;R<=e.length-1;R++){h.x=e[R].x*v,h.y=e[R].y,h.z=e[R].x*C,o.push(h.x,h.y,h.z),f.x=T/t,f.y=R/(e.length-1),a.push(f.x,f.y);const P=l[3*R+0]*v,I=l[3*R+1],y=l[3*R+0]*C;c.push(P,I,y)}}for(let T=0;T<t;T++)for(let E=0;E<e.length-1;E++){const v=E+T*e.length,C=v,R=v+e.length,P=v+e.length+1,I=v+1;s.push(C,R,I),s.push(P,I,R)}this.setIndex(s),this.setAttribute("position",new je(o,3)),this.setAttribute("uv",new je(a,2)),this.setAttribute("normal",new je(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Fo(e.points,e.segments,e.phiStart,e.phiLength)}}class gn extends yt{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,o=t/2,a=Math.floor(i),l=Math.floor(r),c=a+1,u=l+1,h=e/a,f=t/l,d=[],g=[],x=[],m=[];for(let p=0;p<u;p++){const T=p*f-o;for(let E=0;E<c;E++){const v=E*h-s;g.push(v,-T,0),x.push(0,0,1),m.push(E/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let T=0;T<a;T++){const E=T+c*p,v=T+c*(p+1),C=T+1+c*(p+1),R=T+1+c*p;d.push(E,v,R),d.push(v,C,R)}this.setIndex(d),this.setAttribute("position",new je(g,3)),this.setAttribute("normal",new je(x,3)),this.setAttribute("uv",new je(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new gn(e.width,e.height,e.widthSegments,e.heightSegments)}}class Oo extends yt{constructor(e=1,t=32,i=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(o+a,Math.PI);let c=0;const u=[],h=new w,f=new w,d=[],g=[],x=[],m=[];for(let p=0;p<=i;p++){const T=[],E=p/i;let v=0;p===0&&o===0?v=.5/t:p===i&&l===Math.PI&&(v=-.5/t);for(let C=0;C<=t;C++){const R=C/t;h.x=-e*Math.cos(r+R*s)*Math.sin(o+E*a),h.y=e*Math.cos(o+E*a),h.z=e*Math.sin(r+R*s)*Math.sin(o+E*a),g.push(h.x,h.y,h.z),f.copy(h).normalize(),x.push(f.x,f.y,f.z),m.push(R+v,1-E),T.push(c++)}u.push(T)}for(let p=0;p<i;p++)for(let T=0;T<t;T++){const E=u[p][T+1],v=u[p][T],C=u[p+1][T],R=u[p+1][T+1];(p!==0||o>0)&&d.push(E,v,R),(p!==i-1||l<Math.PI)&&d.push(v,C,R)}this.setIndex(d),this.setAttribute("position",new je(g,3)),this.setAttribute("normal",new je(x,3)),this.setAttribute("uv",new je(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Oo(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Bo extends yt{constructor(e=1,t=.4,i=12,r=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:r,arc:s},i=Math.floor(i),r=Math.floor(r);const o=[],a=[],l=[],c=[],u=new w,h=new w,f=new w;for(let d=0;d<=i;d++)for(let g=0;g<=r;g++){const x=g/r*s,m=d/i*Math.PI*2;h.x=(e+t*Math.cos(m))*Math.cos(x),h.y=(e+t*Math.cos(m))*Math.sin(x),h.z=t*Math.sin(m),a.push(h.x,h.y,h.z),u.x=e*Math.cos(x),u.y=e*Math.sin(x),f.subVectors(h,u).normalize(),l.push(f.x,f.y,f.z),c.push(g/r),c.push(d/i)}for(let d=1;d<=i;d++)for(let g=1;g<=r;g++){const x=(r+1)*d+g-1,m=(r+1)*(d-1)+g-1,p=(r+1)*(d-1)+g,T=(r+1)*d+g;o.push(x,m,T),o.push(m,p,T)}this.setIndex(o),this.setAttribute("position",new je(a,3)),this.setAttribute("normal",new je(l,3)),this.setAttribute("uv",new je(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Bo(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class zo extends yt{constructor(e=new Vl(new w(-1,-1,0),new w(-1,1,0),new w(1,1,0)),t=64,i=1,r=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:i,radialSegments:r,closed:s};const o=e.computeFrenetFrames(t,s);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const a=new w,l=new w,c=new le;let u=new w;const h=[],f=[],d=[],g=[];x(),this.setIndex(g),this.setAttribute("position",new je(h,3)),this.setAttribute("normal",new je(f,3)),this.setAttribute("uv",new je(d,2));function x(){for(let E=0;E<t;E++)m(E);m(s===!1?t:0),T(),p()}function m(E){u=e.getPointAt(E/t,u);const v=o.normals[E],C=o.binormals[E];for(let R=0;R<=r;R++){const P=R/r*Math.PI*2,I=Math.sin(P),y=-Math.cos(P);l.x=y*v.x+I*C.x,l.y=y*v.y+I*C.y,l.z=y*v.z+I*C.z,l.normalize(),f.push(l.x,l.y,l.z),a.x=u.x+i*l.x,a.y=u.y+i*l.y,a.z=u.z+i*l.z,h.push(a.x,a.y,a.z)}}function p(){for(let E=1;E<=t;E++)for(let v=1;v<=r;v++){const C=(r+1)*(E-1)+(v-1),R=(r+1)*E+(v-1),P=(r+1)*E+v,I=(r+1)*(E-1)+v;g.push(C,R,I),g.push(R,P,I)}}function T(){for(let E=0;E<=t;E++)for(let v=0;v<=r;v++)c.x=E/t,c.y=v/r,d.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new zo(new Or[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}class ko extends Ki{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new qe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new qe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=bl,this.normalScale=new le(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ht,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class bh extends Ki{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Gc,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Th extends Ki{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class zr extends vt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new qe(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class Ah extends zr{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(vt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new qe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const ms=new at,Aa=new w,Ra=new w;class Jl{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new le(512,512),this.mapType=nn,this.map=null,this.mapPass=null,this.matrix=new at,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Lo,this._frameExtents=new le(1,1),this._viewportCount=1,this._viewports=[new nt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;Aa.setFromMatrixPosition(e.matrixWorld),t.position.copy(Aa),Ra.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Ra),t.updateMatrixWorld(),ms.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ms,t.coordinateSystem,t.reversedDepth),t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(ms)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Ca=new at,wi=new w,gs=new w;class Rh extends Jl{constructor(){super(new Ft(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new le(4,2),this._viewportCount=6,this._viewports=[new nt(2,1,1,1),new nt(0,1,1,1),new nt(3,1,1,1),new nt(1,1,1,1),new nt(3,0,1,1),new nt(1,0,1,1)],this._cubeDirections=[new w(1,0,0),new w(-1,0,0),new w(0,0,1),new w(0,0,-1),new w(0,1,0),new w(0,-1,0)],this._cubeUps=[new w(0,1,0),new w(0,1,0),new w(0,1,0),new w(0,1,0),new w(0,0,1),new w(0,0,-1)]}updateMatrices(e,t=0){const i=this.camera,r=this.matrix,s=e.distance||i.far;s!==i.far&&(i.far=s,i.updateProjectionMatrix()),wi.setFromMatrixPosition(e.matrixWorld),i.position.copy(wi),gs.copy(i.position),gs.add(this._cubeDirections[t]),i.up.copy(this._cubeUps[t]),i.lookAt(gs),i.updateMatrixWorld(),r.makeTranslation(-wi.x,-wi.y,-wi.z),Ca.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ca,i.coordinateSystem,i.reversedDepth)}}class _s extends zr{constructor(e,t,i=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=r,this.shadow=new Rh}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Kl extends Il{constructor(e=-1,t=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,o=i+e,a=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Ch extends Jl{constructor(){super(new Kl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class wh extends zr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(vt.DEFAULT_UP),this.updateMatrix(),this.target=new vt,this.shadow=new Ch}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Ph extends zr{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class Lh extends Ft{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}function wa(n,e,t,i){const r=Dh(i);switch(t){case Ml:return n*e;case yl:return n*e/r.components*r.byteLength;case bo:return n*e/r.components*r.byteLength;case El:return n*e*2/r.components*r.byteLength;case To:return n*e*2/r.components*r.byteLength;case Sl:return n*e*3/r.components*r.byteLength;case qt:return n*e*4/r.components*r.byteLength;case Ao:return n*e*4/r.components*r.byteLength;case Ar:case Rr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Cr:case wr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Gs:case Xs:return Math.max(n,16)*Math.max(e,8)/4;case Vs:case Ws:return Math.max(n,8)*Math.max(e,8)/2;case qs:case Ys:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Zs:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Js:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ks:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case $s:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case js:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Qs:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case eo:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case to:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case no:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case io:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case ro:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case so:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case oo:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case ao:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case lo:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case co:case uo:case ho:return Math.ceil(n/4)*Math.ceil(e/4)*16;case fo:case po:return Math.ceil(n/4)*Math.ceil(e/4)*8;case mo:case go:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Dh(n){switch(n){case nn:case gl:return{byteLength:1,components:1};case zi:case _l:case Zi:return{byteLength:2,components:1};case yo:case Eo:return{byteLength:2,components:4};case Xn:case So:case dn:return{byteLength:4,components:1};case xl:case vl:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Mo}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Mo);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function $l(){let n=null,e=!1,t=null,i=null;function r(s,o){t(s,o),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function Ih(n){const e=new WeakMap;function t(a,l){const c=a.array,u=a.usage,h=c.byteLength,f=n.createBuffer();n.bindBuffer(l,f),n.bufferData(l,c,u),a.onUploadCallback();let d;if(c instanceof Float32Array)d=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)d=n.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?d=n.HALF_FLOAT:d=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=n.SHORT;else if(c instanceof Uint32Array)d=n.UNSIGNED_INT;else if(c instanceof Int32Array)d=n.INT;else if(c instanceof Int8Array)d=n.BYTE;else if(c instanceof Uint8Array)d=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:h}}function i(a,l,c){const u=l.array,h=l.updateRanges;if(n.bindBuffer(c,a),h.length===0)n.bufferSubData(c,0,u);else{h.sort((d,g)=>d.start-g.start);let f=0;for(let d=1;d<h.length;d++){const g=h[f],x=h[d];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++f,h[f]=x)}h.length=f+1;for(let d=0,g=h.length;d<g;d++){const x=h[d];n.bufferSubData(c,x.start*u.BYTES_PER_ELEMENT,u,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(n.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:r,remove:s,update:o}}var Uh=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Nh=`#ifdef USE_ALPHAHASH
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
#endif`,Fh=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Oh=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Bh=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,zh=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,kh=`#ifdef USE_AOMAP
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
#endif`,Hh=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Vh=`#ifdef USE_BATCHING
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
#endif`,Gh=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Wh=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Xh=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,qh=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Yh=`#ifdef USE_IRIDESCENCE
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
#endif`,Zh=`#ifdef USE_BUMPMAP
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
#endif`,Jh=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Kh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,$h=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,jh=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Qh=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,ef=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,tf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,nf=`#if defined( USE_COLOR_ALPHA )
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
#endif`,rf=`#define PI 3.141592653589793
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
} // validated`,sf=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,of=`vec3 transformedNormal = objectNormal;
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
#endif`,af=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,lf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,cf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,uf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,hf="gl_FragColor = linearToOutputTexel( gl_FragColor );",ff=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,df=`#ifdef USE_ENVMAP
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
#endif`,pf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,mf=`#ifdef USE_ENVMAP
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
#endif`,gf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,_f=`#ifdef USE_ENVMAP
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
#endif`,xf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,vf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Mf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Sf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,yf=`#ifdef USE_GRADIENTMAP
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
}`,Ef=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,bf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Tf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Af=`uniform bool receiveShadow;
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
#endif`,Rf=`#ifdef USE_ENVMAP
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
#endif`,Cf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,wf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Pf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Lf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Df=`PhysicalMaterial material;
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
#endif`,If=`struct PhysicalMaterial {
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
}`,Uf=`
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
#endif`,Nf=`#if defined( RE_IndirectDiffuse )
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
#endif`,Ff=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Of=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Bf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,zf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,kf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Hf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Vf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Gf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Wf=`#if defined( USE_POINTS_UV )
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
#endif`,Xf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,qf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Yf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Zf=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Jf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Kf=`#ifdef USE_MORPHTARGETS
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
#endif`,$f=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,jf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Qf=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,ed=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,td=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,nd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,id=`#ifdef USE_NORMALMAP
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
#endif`,rd=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,sd=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,od=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,ad=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,ld=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,cd=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,ud=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,hd=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,fd=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dd=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,pd=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,md=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,gd=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,_d=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,xd=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,vd=`float getShadowMask() {
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
}`,Md=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Sd=`#ifdef USE_SKINNING
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
#endif`,yd=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Ed=`#ifdef USE_SKINNING
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
#endif`,bd=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Td=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Ad=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Rd=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Cd=`#ifdef USE_TRANSMISSION
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
#endif`,wd=`#ifdef USE_TRANSMISSION
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
#endif`,Pd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ld=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Dd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Id=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Ud=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Nd=`uniform sampler2D t2D;
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
}`,Fd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Od=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Bd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,zd=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,kd=`#include <common>
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
}`,Hd=`#if DEPTH_PACKING == 3200
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
}`,Vd=`#define DISTANCE
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
}`,Gd=`#define DISTANCE
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
}`,Wd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Xd=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,qd=`uniform float scale;
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
}`,Yd=`uniform vec3 diffuse;
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
}`,Zd=`#include <common>
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
}`,Jd=`uniform vec3 diffuse;
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
}`,Kd=`#define LAMBERT
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
}`,$d=`#define LAMBERT
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
}`,jd=`#define MATCAP
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
}`,Qd=`#define MATCAP
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
}`,ep=`#define NORMAL
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
}`,tp=`#define NORMAL
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
}`,np=`#define PHONG
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
}`,ip=`#define PHONG
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
}`,rp=`#define STANDARD
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
}`,sp=`#define STANDARD
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
}`,op=`#define TOON
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
}`,ap=`#define TOON
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
}`,lp=`uniform float size;
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
}`,cp=`uniform vec3 diffuse;
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
}`,up=`#include <common>
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
}`,hp=`uniform vec3 color;
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
}`,fp=`uniform float rotation;
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
}`,dp=`uniform vec3 diffuse;
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
}`,Ve={alphahash_fragment:Uh,alphahash_pars_fragment:Nh,alphamap_fragment:Fh,alphamap_pars_fragment:Oh,alphatest_fragment:Bh,alphatest_pars_fragment:zh,aomap_fragment:kh,aomap_pars_fragment:Hh,batching_pars_vertex:Vh,batching_vertex:Gh,begin_vertex:Wh,beginnormal_vertex:Xh,bsdfs:qh,iridescence_fragment:Yh,bumpmap_pars_fragment:Zh,clipping_planes_fragment:Jh,clipping_planes_pars_fragment:Kh,clipping_planes_pars_vertex:$h,clipping_planes_vertex:jh,color_fragment:Qh,color_pars_fragment:ef,color_pars_vertex:tf,color_vertex:nf,common:rf,cube_uv_reflection_fragment:sf,defaultnormal_vertex:of,displacementmap_pars_vertex:af,displacementmap_vertex:lf,emissivemap_fragment:cf,emissivemap_pars_fragment:uf,colorspace_fragment:hf,colorspace_pars_fragment:ff,envmap_fragment:df,envmap_common_pars_fragment:pf,envmap_pars_fragment:mf,envmap_pars_vertex:gf,envmap_physical_pars_fragment:Rf,envmap_vertex:_f,fog_vertex:xf,fog_pars_vertex:vf,fog_fragment:Mf,fog_pars_fragment:Sf,gradientmap_pars_fragment:yf,lightmap_pars_fragment:Ef,lights_lambert_fragment:bf,lights_lambert_pars_fragment:Tf,lights_pars_begin:Af,lights_toon_fragment:Cf,lights_toon_pars_fragment:wf,lights_phong_fragment:Pf,lights_phong_pars_fragment:Lf,lights_physical_fragment:Df,lights_physical_pars_fragment:If,lights_fragment_begin:Uf,lights_fragment_maps:Nf,lights_fragment_end:Ff,logdepthbuf_fragment:Of,logdepthbuf_pars_fragment:Bf,logdepthbuf_pars_vertex:zf,logdepthbuf_vertex:kf,map_fragment:Hf,map_pars_fragment:Vf,map_particle_fragment:Gf,map_particle_pars_fragment:Wf,metalnessmap_fragment:Xf,metalnessmap_pars_fragment:qf,morphinstance_vertex:Yf,morphcolor_vertex:Zf,morphnormal_vertex:Jf,morphtarget_pars_vertex:Kf,morphtarget_vertex:$f,normal_fragment_begin:jf,normal_fragment_maps:Qf,normal_pars_fragment:ed,normal_pars_vertex:td,normal_vertex:nd,normalmap_pars_fragment:id,clearcoat_normal_fragment_begin:rd,clearcoat_normal_fragment_maps:sd,clearcoat_pars_fragment:od,iridescence_pars_fragment:ad,opaque_fragment:ld,packing:cd,premultiplied_alpha_fragment:ud,project_vertex:hd,dithering_fragment:fd,dithering_pars_fragment:dd,roughnessmap_fragment:pd,roughnessmap_pars_fragment:md,shadowmap_pars_fragment:gd,shadowmap_pars_vertex:_d,shadowmap_vertex:xd,shadowmask_pars_fragment:vd,skinbase_vertex:Md,skinning_pars_vertex:Sd,skinning_vertex:yd,skinnormal_vertex:Ed,specularmap_fragment:bd,specularmap_pars_fragment:Td,tonemapping_fragment:Ad,tonemapping_pars_fragment:Rd,transmission_fragment:Cd,transmission_pars_fragment:wd,uv_pars_fragment:Pd,uv_pars_vertex:Ld,uv_vertex:Dd,worldpos_vertex:Id,background_vert:Ud,background_frag:Nd,backgroundCube_vert:Fd,backgroundCube_frag:Od,cube_vert:Bd,cube_frag:zd,depth_vert:kd,depth_frag:Hd,distanceRGBA_vert:Vd,distanceRGBA_frag:Gd,equirect_vert:Wd,equirect_frag:Xd,linedashed_vert:qd,linedashed_frag:Yd,meshbasic_vert:Zd,meshbasic_frag:Jd,meshlambert_vert:Kd,meshlambert_frag:$d,meshmatcap_vert:jd,meshmatcap_frag:Qd,meshnormal_vert:ep,meshnormal_frag:tp,meshphong_vert:np,meshphong_frag:ip,meshphysical_vert:rp,meshphysical_frag:sp,meshtoon_vert:op,meshtoon_frag:ap,points_vert:lp,points_frag:cp,shadow_vert:up,shadow_frag:hp,sprite_vert:fp,sprite_frag:dp},de={common:{diffuse:{value:new qe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new He}},envmap:{envMap:{value:null},envMapRotation:{value:new He},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new He}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new He}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new He},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new He},normalScale:{value:new le(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new He},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new He}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new He}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new He}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new qe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new qe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0},uvTransform:{value:new He}},sprite:{diffuse:{value:new qe(16777215)},opacity:{value:1},center:{value:new le(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}}},jt={basic:{uniforms:Tt([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.fog]),vertexShader:Ve.meshbasic_vert,fragmentShader:Ve.meshbasic_frag},lambert:{uniforms:Tt([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.fog,de.lights,{emissive:{value:new qe(0)}}]),vertexShader:Ve.meshlambert_vert,fragmentShader:Ve.meshlambert_frag},phong:{uniforms:Tt([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.fog,de.lights,{emissive:{value:new qe(0)},specular:{value:new qe(1118481)},shininess:{value:30}}]),vertexShader:Ve.meshphong_vert,fragmentShader:Ve.meshphong_frag},standard:{uniforms:Tt([de.common,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.roughnessmap,de.metalnessmap,de.fog,de.lights,{emissive:{value:new qe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag},toon:{uniforms:Tt([de.common,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.gradientmap,de.fog,de.lights,{emissive:{value:new qe(0)}}]),vertexShader:Ve.meshtoon_vert,fragmentShader:Ve.meshtoon_frag},matcap:{uniforms:Tt([de.common,de.bumpmap,de.normalmap,de.displacementmap,de.fog,{matcap:{value:null}}]),vertexShader:Ve.meshmatcap_vert,fragmentShader:Ve.meshmatcap_frag},points:{uniforms:Tt([de.points,de.fog]),vertexShader:Ve.points_vert,fragmentShader:Ve.points_frag},dashed:{uniforms:Tt([de.common,de.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ve.linedashed_vert,fragmentShader:Ve.linedashed_frag},depth:{uniforms:Tt([de.common,de.displacementmap]),vertexShader:Ve.depth_vert,fragmentShader:Ve.depth_frag},normal:{uniforms:Tt([de.common,de.bumpmap,de.normalmap,de.displacementmap,{opacity:{value:1}}]),vertexShader:Ve.meshnormal_vert,fragmentShader:Ve.meshnormal_frag},sprite:{uniforms:Tt([de.sprite,de.fog]),vertexShader:Ve.sprite_vert,fragmentShader:Ve.sprite_frag},background:{uniforms:{uvTransform:{value:new He},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ve.background_vert,fragmentShader:Ve.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new He}},vertexShader:Ve.backgroundCube_vert,fragmentShader:Ve.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ve.cube_vert,fragmentShader:Ve.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ve.equirect_vert,fragmentShader:Ve.equirect_frag},distanceRGBA:{uniforms:Tt([de.common,de.displacementmap,{referencePosition:{value:new w},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ve.distanceRGBA_vert,fragmentShader:Ve.distanceRGBA_frag},shadow:{uniforms:Tt([de.lights,de.fog,{color:{value:new qe(0)},opacity:{value:1}}]),vertexShader:Ve.shadow_vert,fragmentShader:Ve.shadow_frag}};jt.physical={uniforms:Tt([jt.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new He},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new He},clearcoatNormalScale:{value:new le(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new He},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new He},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new He},sheen:{value:0},sheenColor:{value:new qe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new He},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new He},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new He},transmissionSamplerSize:{value:new le},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new He},attenuationDistance:{value:0},attenuationColor:{value:new qe(0)},specularColor:{value:new qe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new He},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new He},anisotropyVector:{value:new le},anisotropyMap:{value:null},anisotropyMapTransform:{value:new He}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag};const Sr={r:0,b:0,g:0},Fn=new Ht,pp=new at;function mp(n,e,t,i,r,s,o){const a=new qe(0);let l=s===!0?0:1,c,u,h=null,f=0,d=null;function g(E){let v=E.isScene===!0?E.background:null;return v&&v.isTexture&&(v=(E.backgroundBlurriness>0?t:e).get(v)),v}function x(E){let v=!1;const C=g(E);C===null?p(a,l):C&&C.isColor&&(p(C,1),v=!0);const R=n.xr.getEnvironmentBlendMode();R==="additive"?i.buffers.color.setClear(0,0,0,1,o):R==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||v)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(E,v){const C=g(v);C&&(C.isCubeTexture||C.mapping===Br)?(u===void 0&&(u=new tn(new Jn(1,1,1),new wn({name:"BackgroundCubeMaterial",uniforms:Mi(jt.backgroundCube.uniforms),vertexShader:jt.backgroundCube.vertexShader,fragmentShader:jt.backgroundCube.fragmentShader,side:Lt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(R,P,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),Fn.copy(v.backgroundRotation),Fn.x*=-1,Fn.y*=-1,Fn.z*=-1,C.isCubeTexture&&C.isRenderTargetTexture===!1&&(Fn.y*=-1,Fn.z*=-1),u.material.uniforms.envMap.value=C,u.material.uniforms.flipEnvMap.value=C.isCubeTexture&&C.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(pp.makeRotationFromEuler(Fn)),u.material.toneMapped=Ke.getTransfer(C.colorSpace)!==tt,(h!==C||f!==C.version||d!==n.toneMapping)&&(u.material.needsUpdate=!0,h=C,f=C.version,d=n.toneMapping),u.layers.enableAll(),E.unshift(u,u.geometry,u.material,0,0,null)):C&&C.isTexture&&(c===void 0&&(c=new tn(new gn(2,2),new wn({name:"BackgroundMaterial",uniforms:Mi(jt.background.uniforms),vertexShader:jt.background.vertexShader,fragmentShader:jt.background.fragmentShader,side:Cn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=C,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.toneMapped=Ke.getTransfer(C.colorSpace)!==tt,C.matrixAutoUpdate===!0&&C.updateMatrix(),c.material.uniforms.uvTransform.value.copy(C.matrix),(h!==C||f!==C.version||d!==n.toneMapping)&&(c.material.needsUpdate=!0,h=C,f=C.version,d=n.toneMapping),c.layers.enableAll(),E.unshift(c,c.geometry,c.material,0,0,null))}function p(E,v){E.getRGB(Sr,Dl(n)),i.buffers.color.setClear(Sr.r,Sr.g,Sr.b,v,o)}function T(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(E,v=1){a.set(E),l=v,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(E){l=E,p(a,l)},render:x,addToRenderList:m,dispose:T}}function gp(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=f(null);let s=r,o=!1;function a(S,L,O,k,q){let V=!1;const X=h(k,O,L);s!==X&&(s=X,c(s.object)),V=d(S,k,O,q),V&&g(S,k,O,q),q!==null&&e.update(q,n.ELEMENT_ARRAY_BUFFER),(V||o)&&(o=!1,v(S,L,O,k),q!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(q).buffer))}function l(){return n.createVertexArray()}function c(S){return n.bindVertexArray(S)}function u(S){return n.deleteVertexArray(S)}function h(S,L,O){const k=O.wireframe===!0;let q=i[S.id];q===void 0&&(q={},i[S.id]=q);let V=q[L.id];V===void 0&&(V={},q[L.id]=V);let X=V[k];return X===void 0&&(X=f(l()),V[k]=X),X}function f(S){const L=[],O=[],k=[];for(let q=0;q<t;q++)L[q]=0,O[q]=0,k[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:O,attributeDivisors:k,object:S,attributes:{},index:null}}function d(S,L,O,k){const q=s.attributes,V=L.attributes;let X=0;const j=O.getAttributes();for(const G in j)if(j[G].location>=0){const _e=q[G];let Me=V[G];if(Me===void 0&&(G==="instanceMatrix"&&S.instanceMatrix&&(Me=S.instanceMatrix),G==="instanceColor"&&S.instanceColor&&(Me=S.instanceColor)),_e===void 0||_e.attribute!==Me||Me&&_e.data!==Me.data)return!0;X++}return s.attributesNum!==X||s.index!==k}function g(S,L,O,k){const q={},V=L.attributes;let X=0;const j=O.getAttributes();for(const G in j)if(j[G].location>=0){let _e=V[G];_e===void 0&&(G==="instanceMatrix"&&S.instanceMatrix&&(_e=S.instanceMatrix),G==="instanceColor"&&S.instanceColor&&(_e=S.instanceColor));const Me={};Me.attribute=_e,_e&&_e.data&&(Me.data=_e.data),q[G]=Me,X++}s.attributes=q,s.attributesNum=X,s.index=k}function x(){const S=s.newAttributes;for(let L=0,O=S.length;L<O;L++)S[L]=0}function m(S){p(S,0)}function p(S,L){const O=s.newAttributes,k=s.enabledAttributes,q=s.attributeDivisors;O[S]=1,k[S]===0&&(n.enableVertexAttribArray(S),k[S]=1),q[S]!==L&&(n.vertexAttribDivisor(S,L),q[S]=L)}function T(){const S=s.newAttributes,L=s.enabledAttributes;for(let O=0,k=L.length;O<k;O++)L[O]!==S[O]&&(n.disableVertexAttribArray(O),L[O]=0)}function E(S,L,O,k,q,V,X){X===!0?n.vertexAttribIPointer(S,L,O,q,V):n.vertexAttribPointer(S,L,O,k,q,V)}function v(S,L,O,k){x();const q=k.attributes,V=O.getAttributes(),X=L.defaultAttributeValues;for(const j in V){const G=V[j];if(G.location>=0){let he=q[j];if(he===void 0&&(j==="instanceMatrix"&&S.instanceMatrix&&(he=S.instanceMatrix),j==="instanceColor"&&S.instanceColor&&(he=S.instanceColor)),he!==void 0){const _e=he.normalized,Me=he.itemSize,ze=e.get(he);if(ze===void 0)continue;const Ye=ze.buffer,Qe=ze.type,Ze=ze.bytesPerElement,Y=Qe===n.INT||Qe===n.UNSIGNED_INT||he.gpuType===So;if(he.isInterleavedBufferAttribute){const te=he.data,ve=te.stride,we=he.offset;if(te.isInstancedInterleavedBuffer){for(let Ee=0;Ee<G.locationSize;Ee++)p(G.location+Ee,te.meshPerAttribute);S.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=te.meshPerAttribute*te.count)}else for(let Ee=0;Ee<G.locationSize;Ee++)m(G.location+Ee);n.bindBuffer(n.ARRAY_BUFFER,Ye);for(let Ee=0;Ee<G.locationSize;Ee++)E(G.location+Ee,Me/G.locationSize,Qe,_e,ve*Ze,(we+Me/G.locationSize*Ee)*Ze,Y)}else{if(he.isInstancedBufferAttribute){for(let te=0;te<G.locationSize;te++)p(G.location+te,he.meshPerAttribute);S.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=he.meshPerAttribute*he.count)}else for(let te=0;te<G.locationSize;te++)m(G.location+te);n.bindBuffer(n.ARRAY_BUFFER,Ye);for(let te=0;te<G.locationSize;te++)E(G.location+te,Me/G.locationSize,Qe,_e,Me*Ze,Me/G.locationSize*te*Ze,Y)}}else if(X!==void 0){const _e=X[j];if(_e!==void 0)switch(_e.length){case 2:n.vertexAttrib2fv(G.location,_e);break;case 3:n.vertexAttrib3fv(G.location,_e);break;case 4:n.vertexAttrib4fv(G.location,_e);break;default:n.vertexAttrib1fv(G.location,_e)}}}}T()}function C(){I();for(const S in i){const L=i[S];for(const O in L){const k=L[O];for(const q in k)u(k[q].object),delete k[q];delete L[O]}delete i[S]}}function R(S){if(i[S.id]===void 0)return;const L=i[S.id];for(const O in L){const k=L[O];for(const q in k)u(k[q].object),delete k[q];delete L[O]}delete i[S.id]}function P(S){for(const L in i){const O=i[L];if(O[S.id]===void 0)continue;const k=O[S.id];for(const q in k)u(k[q].object),delete k[q];delete O[S.id]}}function I(){y(),o=!0,s!==r&&(s=r,c(s.object))}function y(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:I,resetDefaultState:y,dispose:C,releaseStatesOfGeometry:R,releaseStatesOfProgram:P,initAttributes:x,enableAttribute:m,disableUnusedAttributes:T}}function _p(n,e,t){let i;function r(c){i=c}function s(c,u){n.drawArrays(i,c,u),t.update(u,i,1)}function o(c,u,h){h!==0&&(n.drawArraysInstanced(i,c,u,h),t.update(u,i,h))}function a(c,u,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,u,0,h);let d=0;for(let g=0;g<h;g++)d+=u[g];t.update(d,i,1)}function l(c,u,h,f){if(h===0)return;const d=e.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<c.length;g++)o(c[g],u[g],f[g]);else{d.multiDrawArraysInstancedWEBGL(i,c,0,u,0,f,0,h);let g=0;for(let x=0;x<h;x++)g+=u[x]*f[x];t.update(g,i,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function xp(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const P=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(P){return!(P!==qt&&i.convert(P)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(P){const I=P===Zi&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(P!==nn&&i.convert(P)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==dn&&!I)}function l(P){if(P==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const h=t.logarithmicDepthBuffer===!0,f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),d=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),T=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),E=n.getParameter(n.MAX_VARYING_VECTORS),v=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),C=g>0,R=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:h,reversedDepthBuffer:f,maxTextures:d,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:T,maxVaryings:E,maxFragmentUniforms:v,vertexTextures:C,maxSamples:R}}function vp(n){const e=this;let t=null,i=0,r=!1,s=!1;const o=new zn,a=new He,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const d=h.length!==0||f||i!==0||r;return r=f,i=h.length,d},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,f){t=u(h,f,0)},this.setState=function(h,f,d){const g=h.clippingPlanes,x=h.clipIntersection,m=h.clipShadows,p=n.get(h);if(!r||g===null||g.length===0||s&&!m)s?u(null):c();else{const T=s?0:i,E=T*4;let v=p.clippingState||null;l.value=v,v=u(g,f,E,d);for(let C=0;C!==E;++C)v[C]=t[C];p.clippingState=v,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=T}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(h,f,d,g){const x=h!==null?h.length:0;let m=null;if(x!==0){if(m=l.value,g!==!0||m===null){const p=d+x*4,T=f.matrixWorldInverse;a.getNormalMatrix(T),(m===null||m.length<p)&&(m=new Float32Array(p));for(let E=0,v=d;E!==x;++E,v+=4)o.copy(h[E]).applyMatrix4(T,a),o.normal.toArray(m,v),m[v+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,m}}function Mp(n){let e=new WeakMap;function t(o,a){return a===zs?o.mapping=_i:a===ks&&(o.mapping=xi),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===zs||a===ks)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new Hu(l.height);return c.fromEquirectangularTexture(n,o),e.set(o,c),o.addEventListener("dispose",r),t(c.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}const di=4,Pa=[.125,.215,.35,.446,.526,.582],Vn=20,xs=new Kl,La=new qe;let vs=null,Ms=0,Ss=0,ys=!1;const kn=(1+Math.sqrt(5))/2,ui=1/kn,Da=[new w(-kn,ui,0),new w(kn,ui,0),new w(-ui,0,kn),new w(ui,0,kn),new w(0,kn,-ui),new w(0,kn,ui),new w(-1,1,-1),new w(1,1,-1),new w(-1,1,1),new w(1,1,1)],Sp=new w;class Ia{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,r=100,s={}){const{size:o=256,position:a=Sp}=s;vs=this._renderer.getRenderTarget(),Ms=this._renderer.getActiveCubeFace(),Ss=this._renderer.getActiveMipmapLevel(),ys=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,r,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Fa(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Na(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(vs,Ms,Ss),this._renderer.xr.enabled=ys,e.scissorTest=!1,yr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===_i||e.mapping===xi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),vs=this._renderer.getRenderTarget(),Ms=this._renderer.getActiveCubeFace(),Ss=this._renderer.getActiveMipmapLevel(),ys=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Qt,minFilter:Qt,generateMipmaps:!1,type:Zi,format:qt,colorSpace:vi,depthBuffer:!1},r=Ua(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ua(e,t,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=yp(s)),this._blurMaterial=Ep(s,e,t)}return r}_compileMaterial(e){const t=new tn(this._lodPlanes[0],e);this._renderer.compile(t,xs)}_sceneToCubeUV(e,t,i,r,s){const l=new Ft(90,1,t,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],h=this._renderer,f=h.autoClear,d=h.toneMapping;h.getClearColor(La),h.toneMapping=Tn,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(r),h.clearDepth(),h.setRenderTarget(null));const x=new Rn({name:"PMREM.Background",side:Lt,depthWrite:!1,depthTest:!1}),m=new tn(new Jn,x);let p=!1;const T=e.background;T?T.isColor&&(x.color.copy(T),e.background=null,p=!0):(x.color.copy(La),p=!0);for(let E=0;E<6;E++){const v=E%3;v===0?(l.up.set(0,c[E],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[E],s.y,s.z)):v===1?(l.up.set(0,0,c[E]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[E],s.z)):(l.up.set(0,c[E],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[E]));const C=this._cubeSize;yr(r,v*C,E>2?C:0,C,C),h.setRenderTarget(r),p&&h.render(m,l),h.render(e,l)}m.geometry.dispose(),m.material.dispose(),h.toneMapping=d,h.autoClear=f,e.background=T}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===_i||e.mapping===xi;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Fa()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Na());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new tn(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;yr(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(o,xs)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=Da[(r-s-1)%Da.length];this._blur(e,s-1,s,o,a)}t.autoClear=i}_blur(e,t,i,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,r,"latitudinal",s),this._halfBlur(o,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new tn(this._lodPlanes[r],c),f=c.uniforms,d=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*d):2*Math.PI/(2*Vn-1),x=s/g,m=isFinite(s)?1+Math.floor(u*x):Vn;m>Vn&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Vn}`);const p=[];let T=0;for(let P=0;P<Vn;++P){const I=P/x,y=Math.exp(-I*I/2);p.push(y),P===0?T+=y:P<m&&(T+=2*y)}for(let P=0;P<p.length;P++)p[P]=p[P]/T;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:E}=this;f.dTheta.value=g,f.mipInt.value=E-i;const v=this._sizeLods[r],C=3*v*(r>E-di?r-E+di:0),R=4*(this._cubeSize-v);yr(t,C,R,3*v,2*v),l.setRenderTarget(t),l.render(h,xs)}}function yp(n){const e=[],t=[],i=[];let r=n;const s=n-di+1+Pa.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);t.push(a);let l=1/a;o>n-di?l=Pa[o-n+di-1]:o===0&&(l=0),i.push(l);const c=1/(a-2),u=-c,h=1+c,f=[u,u,h,u,h,h,u,u,h,h,u,h],d=6,g=6,x=3,m=2,p=1,T=new Float32Array(x*g*d),E=new Float32Array(m*g*d),v=new Float32Array(p*g*d);for(let R=0;R<d;R++){const P=R%3*2/3-1,I=R>2?0:-1,y=[P,I,0,P+2/3,I,0,P+2/3,I+1,0,P,I,0,P+2/3,I+1,0,P,I+1,0];T.set(y,x*g*R),E.set(f,m*g*R);const S=[R,R,R,R,R,R];v.set(S,p*g*R)}const C=new yt;C.setAttribute("position",new Zt(T,x)),C.setAttribute("uv",new Zt(E,m)),C.setAttribute("faceIndex",new Zt(v,p)),e.push(C),r>di&&r--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function Ua(n,e,t){const i=new qn(n,e,t);return i.texture.mapping=Br,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function yr(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function Ep(n,e,t){const i=new Float32Array(Vn),r=new w(0,1,0);return new wn({name:"SphericalGaussianBlur",defines:{n:Vn,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Ho(),fragmentShader:`

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
		`,blending:bn,depthTest:!1,depthWrite:!1})}function Na(){return new wn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ho(),fragmentShader:`

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
		`,blending:bn,depthTest:!1,depthWrite:!1})}function Fa(){return new wn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ho(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:bn,depthTest:!1,depthWrite:!1})}function Ho(){return`

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
	`}function bp(n){let e=new WeakMap,t=null;function i(a){if(a&&a.isTexture){const l=a.mapping,c=l===zs||l===ks,u=l===_i||l===xi;if(c||u){let h=e.get(a);const f=h!==void 0?h.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return t===null&&(t=new Ia(n)),h=c?t.fromEquirectangular(a,h):t.fromCubemap(a,h),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),h.texture;if(h!==void 0)return h.texture;{const d=a.image;return c&&d&&d.height>0||u&&d&&r(d)?(t===null&&(t=new Ia(n)),h=c?t.fromEquirectangular(a):t.fromCubemap(a),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),a.addEventListener("dispose",s),h.texture):null}}}return a}function r(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:o}}function Tp(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const r=t(i);return r===null&&Wi("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function Ap(n,e,t,i){const r={},s=new WeakMap;function o(h){const f=h.target;f.index!==null&&e.remove(f.index);for(const g in f.attributes)e.remove(f.attributes[g]);f.removeEventListener("dispose",o),delete r[f.id];const d=s.get(f);d&&(e.remove(d),s.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(h,f){return r[f.id]===!0||(f.addEventListener("dispose",o),r[f.id]=!0,t.memory.geometries++),f}function l(h){const f=h.attributes;for(const d in f)e.update(f[d],n.ARRAY_BUFFER)}function c(h){const f=[],d=h.index,g=h.attributes.position;let x=0;if(d!==null){const T=d.array;x=d.version;for(let E=0,v=T.length;E<v;E+=3){const C=T[E+0],R=T[E+1],P=T[E+2];f.push(C,R,R,P,P,C)}}else if(g!==void 0){const T=g.array;x=g.version;for(let E=0,v=T.length/3-1;E<v;E+=3){const C=E+0,R=E+1,P=E+2;f.push(C,R,R,P,P,C)}}else return;const m=new(Al(f)?Ll:Pl)(f,1);m.version=x;const p=s.get(h);p&&e.remove(p),s.set(h,m)}function u(h){const f=s.get(h);if(f){const d=h.index;d!==null&&f.version<d.version&&c(h)}else c(h);return s.get(h)}return{get:a,update:l,getWireframeAttribute:u}}function Rp(n,e,t){let i;function r(f){i=f}let s,o;function a(f){s=f.type,o=f.bytesPerElement}function l(f,d){n.drawElements(i,d,s,f*o),t.update(d,i,1)}function c(f,d,g){g!==0&&(n.drawElementsInstanced(i,d,s,f*o,g),t.update(d,i,g))}function u(f,d,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,s,f,0,g);let m=0;for(let p=0;p<g;p++)m+=d[p];t.update(m,i,1)}function h(f,d,g,x){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<f.length;p++)c(f[p]/o,d[p],x[p]);else{m.multiDrawElementsInstancedWEBGL(i,d,0,s,f,0,x,0,g);let p=0;for(let T=0;T<g;T++)p+=d[T]*x[T];t.update(p,i,1)}}this.setMode=r,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function Cp(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=a*(s/3);break;case n.LINES:t.lines+=a*(s/2);break;case n.LINE_STRIP:t.lines+=a*(s-1);break;case n.LINE_LOOP:t.lines+=a*s;break;case n.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function wp(n,e,t){const i=new WeakMap,r=new nt;function s(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=u!==void 0?u.length:0;let f=i.get(a);if(f===void 0||f.count!==h){let S=function(){I.dispose(),i.delete(a),a.removeEventListener("dispose",S)};var d=S;f!==void 0&&f.texture.dispose();const g=a.morphAttributes.position!==void 0,x=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],T=a.morphAttributes.normal||[],E=a.morphAttributes.color||[];let v=0;g===!0&&(v=1),x===!0&&(v=2),m===!0&&(v=3);let C=a.attributes.position.count*v,R=1;C>e.maxTextureSize&&(R=Math.ceil(C/e.maxTextureSize),C=e.maxTextureSize);const P=new Float32Array(C*R*4*h),I=new Rl(P,C,R,h);I.type=dn,I.needsUpdate=!0;const y=v*4;for(let L=0;L<h;L++){const O=p[L],k=T[L],q=E[L],V=C*R*4*L;for(let X=0;X<O.count;X++){const j=X*y;g===!0&&(r.fromBufferAttribute(O,X),P[V+j+0]=r.x,P[V+j+1]=r.y,P[V+j+2]=r.z,P[V+j+3]=0),x===!0&&(r.fromBufferAttribute(k,X),P[V+j+4]=r.x,P[V+j+5]=r.y,P[V+j+6]=r.z,P[V+j+7]=0),m===!0&&(r.fromBufferAttribute(q,X),P[V+j+8]=r.x,P[V+j+9]=r.y,P[V+j+10]=r.z,P[V+j+11]=q.itemSize===4?r.w:1)}}f={count:h,texture:I,size:new le(C,R)},i.set(a,f),a.addEventListener("dispose",S)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const x=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(n,"morphTargetBaseInfluence",x),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",f.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:s}}function Pp(n,e,t,i){let r=new WeakMap;function s(l){const c=i.render.frame,u=l.geometry,h=e.get(l,u);if(r.get(h)!==c&&(e.update(h),r.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==c&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;r.get(f)!==c&&(f.update(),r.set(f,c))}return h}function o(){r=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:o}}const jl=new At,Oa=new Fl(1,1),Ql=new Rl,ec=new Eu,tc=new Ul,Ba=[],za=[],ka=new Float32Array(16),Ha=new Float32Array(9),Va=new Float32Array(4);function Ei(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=Ba[r];if(s===void 0&&(s=new Float32Array(r),Ba[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(s,a)}return s}function gt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function _t(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function kr(n,e){let t=za[e];t===void 0&&(t=new Int32Array(e),za[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function Lp(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function Dp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(gt(t,e))return;n.uniform2fv(this.addr,e),_t(t,e)}}function Ip(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(gt(t,e))return;n.uniform3fv(this.addr,e),_t(t,e)}}function Up(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(gt(t,e))return;n.uniform4fv(this.addr,e),_t(t,e)}}function Np(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(gt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),_t(t,e)}else{if(gt(t,i))return;Va.set(i),n.uniformMatrix2fv(this.addr,!1,Va),_t(t,i)}}function Fp(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(gt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),_t(t,e)}else{if(gt(t,i))return;Ha.set(i),n.uniformMatrix3fv(this.addr,!1,Ha),_t(t,i)}}function Op(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(gt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),_t(t,e)}else{if(gt(t,i))return;ka.set(i),n.uniformMatrix4fv(this.addr,!1,ka),_t(t,i)}}function Bp(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function zp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(gt(t,e))return;n.uniform2iv(this.addr,e),_t(t,e)}}function kp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(gt(t,e))return;n.uniform3iv(this.addr,e),_t(t,e)}}function Hp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(gt(t,e))return;n.uniform4iv(this.addr,e),_t(t,e)}}function Vp(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function Gp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(gt(t,e))return;n.uniform2uiv(this.addr,e),_t(t,e)}}function Wp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(gt(t,e))return;n.uniform3uiv(this.addr,e),_t(t,e)}}function Xp(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(gt(t,e))return;n.uniform4uiv(this.addr,e),_t(t,e)}}function qp(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(Oa.compareFunction=Tl,s=Oa):s=jl,t.setTexture2D(e||s,r)}function Yp(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||ec,r)}function Zp(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||tc,r)}function Jp(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||Ql,r)}function Kp(n){switch(n){case 5126:return Lp;case 35664:return Dp;case 35665:return Ip;case 35666:return Up;case 35674:return Np;case 35675:return Fp;case 35676:return Op;case 5124:case 35670:return Bp;case 35667:case 35671:return zp;case 35668:case 35672:return kp;case 35669:case 35673:return Hp;case 5125:return Vp;case 36294:return Gp;case 36295:return Wp;case 36296:return Xp;case 35678:case 36198:case 36298:case 36306:case 35682:return qp;case 35679:case 36299:case 36307:return Yp;case 35680:case 36300:case 36308:case 36293:return Zp;case 36289:case 36303:case 36311:case 36292:return Jp}}function $p(n,e){n.uniform1fv(this.addr,e)}function jp(n,e){const t=Ei(e,this.size,2);n.uniform2fv(this.addr,t)}function Qp(n,e){const t=Ei(e,this.size,3);n.uniform3fv(this.addr,t)}function em(n,e){const t=Ei(e,this.size,4);n.uniform4fv(this.addr,t)}function tm(n,e){const t=Ei(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function nm(n,e){const t=Ei(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function im(n,e){const t=Ei(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function rm(n,e){n.uniform1iv(this.addr,e)}function sm(n,e){n.uniform2iv(this.addr,e)}function om(n,e){n.uniform3iv(this.addr,e)}function am(n,e){n.uniform4iv(this.addr,e)}function lm(n,e){n.uniform1uiv(this.addr,e)}function cm(n,e){n.uniform2uiv(this.addr,e)}function um(n,e){n.uniform3uiv(this.addr,e)}function hm(n,e){n.uniform4uiv(this.addr,e)}function fm(n,e,t){const i=this.cache,r=e.length,s=kr(t,r);gt(i,s)||(n.uniform1iv(this.addr,s),_t(i,s));for(let o=0;o!==r;++o)t.setTexture2D(e[o]||jl,s[o])}function dm(n,e,t){const i=this.cache,r=e.length,s=kr(t,r);gt(i,s)||(n.uniform1iv(this.addr,s),_t(i,s));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||ec,s[o])}function pm(n,e,t){const i=this.cache,r=e.length,s=kr(t,r);gt(i,s)||(n.uniform1iv(this.addr,s),_t(i,s));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||tc,s[o])}function mm(n,e,t){const i=this.cache,r=e.length,s=kr(t,r);gt(i,s)||(n.uniform1iv(this.addr,s),_t(i,s));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||Ql,s[o])}function gm(n){switch(n){case 5126:return $p;case 35664:return jp;case 35665:return Qp;case 35666:return em;case 35674:return tm;case 35675:return nm;case 35676:return im;case 5124:case 35670:return rm;case 35667:case 35671:return sm;case 35668:case 35672:return om;case 35669:case 35673:return am;case 5125:return lm;case 36294:return cm;case 36295:return um;case 36296:return hm;case 35678:case 36198:case 36298:case 36306:case 35682:return fm;case 35679:case 36299:case 36307:return dm;case 35680:case 36300:case 36308:case 36293:return pm;case 36289:case 36303:case 36311:case 36292:return mm}}class _m{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Kp(t.type)}}class xm{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=gm(t.type)}}class vm{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,t[a.id],i)}}}const Es=/(\w+)(\])?(\[|\.)?/g;function Ga(n,e){n.seq.push(e),n.map[e.id]=e}function Mm(n,e,t){const i=n.name,r=i.length;for(Es.lastIndex=0;;){const s=Es.exec(i),o=Es.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){Ga(t,c===void 0?new _m(a,n,e):new xm(a,n,e));break}else{let h=t.map[a];h===void 0&&(h=new vm(a),Ga(t,h)),t=h}}}class Pr{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(t,r),o=e.getUniformLocation(t,s.name);Mm(s,o,this)}}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,o=t.length;s!==o;++s){const a=t[s],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in t&&i.push(o)}return i}}function Wa(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const Sm=37297;let ym=0;function Em(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=r;o<s;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}const Xa=new He;function bm(n){Ke._getMatrix(Xa,Ke.workingColorSpace,n);const e=`mat3( ${Xa.elements.map(t=>t.toFixed(4))} )`;switch(Ke.getTransfer(n)){case Ir:return[e,"LinearTransferOETF"];case tt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function qa(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),s=(n.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const o=/ERROR: 0:(\d+)/.exec(s);if(o){const a=parseInt(o[1]);return t.toUpperCase()+`

`+s+`

`+Em(n.getShaderSource(e),a)}else return s}function Tm(n,e){const t=bm(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Am(n,e){let t;switch(e){case Fc:t="Linear";break;case Oc:t="Reinhard";break;case Bc:t="Cineon";break;case pl:t="ACESFilmic";break;case kc:t="AgX";break;case Hc:t="Neutral";break;case zc:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Er=new w;function Rm(){Ke.getLuminanceCoefficients(Er);const n=Er.x.toFixed(4),e=Er.y.toFixed(4),t=Er.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Cm(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ii).join(`
`)}function wm(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function Pm(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),o=s.name;let a=1;s.type===n.FLOAT_MAT2&&(a=2),s.type===n.FLOAT_MAT3&&(a=3),s.type===n.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function Ii(n){return n!==""}function Ya(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Za(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Lm=/^[ \t]*#include +<([\w\d./]+)>/gm;function vo(n){return n.replace(Lm,Im)}const Dm=new Map;function Im(n,e){let t=Ve[e];if(t===void 0){const i=Dm.get(e);if(i!==void 0)t=Ve[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return vo(t)}const Um=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ja(n){return n.replace(Um,Nm)}function Nm(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Ka(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}function Fm(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===hl?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===fl?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===hn&&(e="SHADOWMAP_TYPE_VSM"),e}function Om(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case _i:case xi:e="ENVMAP_TYPE_CUBE";break;case Br:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Bm(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case xi:e="ENVMAP_MODE_REFRACTION";break}return e}function zm(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case dl:e="ENVMAP_BLENDING_MULTIPLY";break;case Uc:e="ENVMAP_BLENDING_MIX";break;case Nc:e="ENVMAP_BLENDING_ADD";break}return e}function km(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function Hm(n,e,t,i){const r=n.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=Fm(t),c=Om(t),u=Bm(t),h=zm(t),f=km(t),d=Cm(t),g=wm(s),x=r.createProgram();let m,p,T=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Ii).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Ii).join(`
`),p.length>0&&(p+=`
`)):(m=[Ka(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ii).join(`
`),p=[Ka(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Tn?"#define TONE_MAPPING":"",t.toneMapping!==Tn?Ve.tonemapping_pars_fragment:"",t.toneMapping!==Tn?Am("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ve.colorspace_pars_fragment,Tm("linearToOutputTexel",t.outputColorSpace),Rm(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ii).join(`
`)),o=vo(o),o=Ya(o,t),o=Za(o,t),a=vo(a),a=Ya(a,t),a=Za(a,t),o=Ja(o),a=Ja(a),t.isRawShaderMaterial!==!0&&(T=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===na?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===na?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const E=T+m+o,v=T+p+a,C=Wa(r,r.VERTEX_SHADER,E),R=Wa(r,r.FRAGMENT_SHADER,v);r.attachShader(x,C),r.attachShader(x,R),t.index0AttributeName!==void 0?r.bindAttribLocation(x,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(x,0,"position"),r.linkProgram(x);function P(L){if(n.debug.checkShaderErrors){const O=r.getProgramInfoLog(x)||"",k=r.getShaderInfoLog(C)||"",q=r.getShaderInfoLog(R)||"",V=O.trim(),X=k.trim(),j=q.trim();let G=!0,he=!0;if(r.getProgramParameter(x,r.LINK_STATUS)===!1)if(G=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,x,C,R);else{const _e=qa(r,C,"vertex"),Me=qa(r,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(x,r.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+V+`
`+_e+`
`+Me)}else V!==""?console.warn("THREE.WebGLProgram: Program Info Log:",V):(X===""||j==="")&&(he=!1);he&&(L.diagnostics={runnable:G,programLog:V,vertexShader:{log:X,prefix:m},fragmentShader:{log:j,prefix:p}})}r.deleteShader(C),r.deleteShader(R),I=new Pr(r,x),y=Pm(r,x)}let I;this.getUniforms=function(){return I===void 0&&P(this),I};let y;this.getAttributes=function(){return y===void 0&&P(this),y};let S=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=r.getProgramParameter(x,Sm)),S},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=ym++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=C,this.fragmentShader=R,this}let Vm=0;class Gm{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new Wm(e),t.set(e,i)),i}}class Wm{constructor(e){this.id=Vm++,this.code=e,this.usedTimes=0}}function Xm(n,e,t,i,r,s,o){const a=new Cl,l=new Gm,c=new Set,u=[],h=r.logarithmicDepthBuffer,f=r.vertexTextures;let d=r.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(y){return c.add(y),y===0?"uv":`uv${y}`}function m(y,S,L,O,k){const q=O.fog,V=k.geometry,X=y.isMeshStandardMaterial?O.environment:null,j=(y.isMeshStandardMaterial?t:e).get(y.envMap||X),G=j&&j.mapping===Br?j.image.height:null,he=g[y.type];y.precision!==null&&(d=r.getMaxPrecision(y.precision),d!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",d,"instead."));const _e=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,Me=_e!==void 0?_e.length:0;let ze=0;V.morphAttributes.position!==void 0&&(ze=1),V.morphAttributes.normal!==void 0&&(ze=2),V.morphAttributes.color!==void 0&&(ze=3);let Ye,Qe,Ze,Y;if(he){const $e=jt[he];Ye=$e.vertexShader,Qe=$e.fragmentShader}else Ye=y.vertexShader,Qe=y.fragmentShader,l.update(y),Ze=l.getVertexShaderID(y),Y=l.getFragmentShaderID(y);const te=n.getRenderTarget(),ve=n.state.buffers.depth.getReversed(),we=k.isInstancedMesh===!0,Ee=k.isBatchedMesh===!0,We=!!y.map,st=!!y.matcap,A=!!j,ee=!!y.aoMap,K=!!y.lightMap,J=!!y.bumpMap,Z=!!y.normalMap,ce=!!y.displacementMap,ne=!!y.emissiveMap,ue=!!y.metalnessMap,Fe=!!y.roughnessMap,Ne=y.anisotropy>0,b=y.clearcoat>0,_=y.dispersion>0,F=y.iridescence>0,H=y.sheen>0,Q=y.transmission>0,W=Ne&&!!y.anisotropyMap,Re=b&&!!y.clearcoatMap,ae=b&&!!y.clearcoatNormalMap,be=b&&!!y.clearcoatRoughnessMap,Te=F&&!!y.iridescenceMap,ie=F&&!!y.iridescenceThicknessMap,ge=H&&!!y.sheenColorMap,Ie=H&&!!y.sheenRoughnessMap,Ce=!!y.specularMap,pe=!!y.specularColorMap,ke=!!y.specularIntensityMap,D=Q&&!!y.transmissionMap,oe=Q&&!!y.thicknessMap,fe=!!y.gradientMap,Se=!!y.alphaMap,re=y.alphaTest>0,$=!!y.alphaHash,Ae=!!y.extensions;let Oe=Tn;y.toneMapped&&(te===null||te.isXRRenderTarget===!0)&&(Oe=n.toneMapping);const ot={shaderID:he,shaderType:y.type,shaderName:y.name,vertexShader:Ye,fragmentShader:Qe,defines:y.defines,customVertexShaderID:Ze,customFragmentShaderID:Y,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:d,batching:Ee,batchingColor:Ee&&k._colorsTexture!==null,instancing:we,instancingColor:we&&k.instanceColor!==null,instancingMorph:we&&k.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:te===null?n.outputColorSpace:te.isXRRenderTarget===!0?te.texture.colorSpace:vi,alphaToCoverage:!!y.alphaToCoverage,map:We,matcap:st,envMap:A,envMapMode:A&&j.mapping,envMapCubeUVHeight:G,aoMap:ee,lightMap:K,bumpMap:J,normalMap:Z,displacementMap:f&&ce,emissiveMap:ne,normalMapObjectSpace:Z&&y.normalMapType===Xc,normalMapTangentSpace:Z&&y.normalMapType===bl,metalnessMap:ue,roughnessMap:Fe,anisotropy:Ne,anisotropyMap:W,clearcoat:b,clearcoatMap:Re,clearcoatNormalMap:ae,clearcoatRoughnessMap:be,dispersion:_,iridescence:F,iridescenceMap:Te,iridescenceThicknessMap:ie,sheen:H,sheenColorMap:ge,sheenRoughnessMap:Ie,specularMap:Ce,specularColorMap:pe,specularIntensityMap:ke,transmission:Q,transmissionMap:D,thicknessMap:oe,gradientMap:fe,opaque:y.transparent===!1&&y.blending===pi&&y.alphaToCoverage===!1,alphaMap:Se,alphaTest:re,alphaHash:$,combine:y.combine,mapUv:We&&x(y.map.channel),aoMapUv:ee&&x(y.aoMap.channel),lightMapUv:K&&x(y.lightMap.channel),bumpMapUv:J&&x(y.bumpMap.channel),normalMapUv:Z&&x(y.normalMap.channel),displacementMapUv:ce&&x(y.displacementMap.channel),emissiveMapUv:ne&&x(y.emissiveMap.channel),metalnessMapUv:ue&&x(y.metalnessMap.channel),roughnessMapUv:Fe&&x(y.roughnessMap.channel),anisotropyMapUv:W&&x(y.anisotropyMap.channel),clearcoatMapUv:Re&&x(y.clearcoatMap.channel),clearcoatNormalMapUv:ae&&x(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:be&&x(y.clearcoatRoughnessMap.channel),iridescenceMapUv:Te&&x(y.iridescenceMap.channel),iridescenceThicknessMapUv:ie&&x(y.iridescenceThicknessMap.channel),sheenColorMapUv:ge&&x(y.sheenColorMap.channel),sheenRoughnessMapUv:Ie&&x(y.sheenRoughnessMap.channel),specularMapUv:Ce&&x(y.specularMap.channel),specularColorMapUv:pe&&x(y.specularColorMap.channel),specularIntensityMapUv:ke&&x(y.specularIntensityMap.channel),transmissionMapUv:D&&x(y.transmissionMap.channel),thicknessMapUv:oe&&x(y.thicknessMap.channel),alphaMapUv:Se&&x(y.alphaMap.channel),vertexTangents:!!V.attributes.tangent&&(Z||Ne),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!V.attributes.uv&&(We||Se),fog:!!q,useFog:y.fog===!0,fogExp2:!!q&&q.isFogExp2,flatShading:y.flatShading===!0&&y.wireframe===!1,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:ve,skinning:k.isSkinnedMesh===!0,morphTargets:V.morphAttributes.position!==void 0,morphNormals:V.morphAttributes.normal!==void 0,morphColors:V.morphAttributes.color!==void 0,morphTargetsCount:Me,morphTextureStride:ze,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:y.dithering,shadowMapEnabled:n.shadowMap.enabled&&L.length>0,shadowMapType:n.shadowMap.type,toneMapping:Oe,decodeVideoTexture:We&&y.map.isVideoTexture===!0&&Ke.getTransfer(y.map.colorSpace)===tt,decodeVideoTextureEmissive:ne&&y.emissiveMap.isVideoTexture===!0&&Ke.getTransfer(y.emissiveMap.colorSpace)===tt,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===Pt,flipSided:y.side===Lt,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:Ae&&y.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ae&&y.extensions.multiDraw===!0||Ee)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return ot.vertexUv1s=c.has(1),ot.vertexUv2s=c.has(2),ot.vertexUv3s=c.has(3),c.clear(),ot}function p(y){const S=[];if(y.shaderID?S.push(y.shaderID):(S.push(y.customVertexShaderID),S.push(y.customFragmentShaderID)),y.defines!==void 0)for(const L in y.defines)S.push(L),S.push(y.defines[L]);return y.isRawShaderMaterial===!1&&(T(S,y),E(S,y),S.push(n.outputColorSpace)),S.push(y.customProgramCacheKey),S.join()}function T(y,S){y.push(S.precision),y.push(S.outputColorSpace),y.push(S.envMapMode),y.push(S.envMapCubeUVHeight),y.push(S.mapUv),y.push(S.alphaMapUv),y.push(S.lightMapUv),y.push(S.aoMapUv),y.push(S.bumpMapUv),y.push(S.normalMapUv),y.push(S.displacementMapUv),y.push(S.emissiveMapUv),y.push(S.metalnessMapUv),y.push(S.roughnessMapUv),y.push(S.anisotropyMapUv),y.push(S.clearcoatMapUv),y.push(S.clearcoatNormalMapUv),y.push(S.clearcoatRoughnessMapUv),y.push(S.iridescenceMapUv),y.push(S.iridescenceThicknessMapUv),y.push(S.sheenColorMapUv),y.push(S.sheenRoughnessMapUv),y.push(S.specularMapUv),y.push(S.specularColorMapUv),y.push(S.specularIntensityMapUv),y.push(S.transmissionMapUv),y.push(S.thicknessMapUv),y.push(S.combine),y.push(S.fogExp2),y.push(S.sizeAttenuation),y.push(S.morphTargetsCount),y.push(S.morphAttributeCount),y.push(S.numDirLights),y.push(S.numPointLights),y.push(S.numSpotLights),y.push(S.numSpotLightMaps),y.push(S.numHemiLights),y.push(S.numRectAreaLights),y.push(S.numDirLightShadows),y.push(S.numPointLightShadows),y.push(S.numSpotLightShadows),y.push(S.numSpotLightShadowsWithMaps),y.push(S.numLightProbes),y.push(S.shadowMapType),y.push(S.toneMapping),y.push(S.numClippingPlanes),y.push(S.numClipIntersection),y.push(S.depthPacking)}function E(y,S){a.disableAll(),S.supportsVertexTextures&&a.enable(0),S.instancing&&a.enable(1),S.instancingColor&&a.enable(2),S.instancingMorph&&a.enable(3),S.matcap&&a.enable(4),S.envMap&&a.enable(5),S.normalMapObjectSpace&&a.enable(6),S.normalMapTangentSpace&&a.enable(7),S.clearcoat&&a.enable(8),S.iridescence&&a.enable(9),S.alphaTest&&a.enable(10),S.vertexColors&&a.enable(11),S.vertexAlphas&&a.enable(12),S.vertexUv1s&&a.enable(13),S.vertexUv2s&&a.enable(14),S.vertexUv3s&&a.enable(15),S.vertexTangents&&a.enable(16),S.anisotropy&&a.enable(17),S.alphaHash&&a.enable(18),S.batching&&a.enable(19),S.dispersion&&a.enable(20),S.batchingColor&&a.enable(21),S.gradientMap&&a.enable(22),y.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reversedDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.decodeVideoTextureEmissive&&a.enable(20),S.alphaToCoverage&&a.enable(21),y.push(a.mask)}function v(y){const S=g[y.type];let L;if(S){const O=jt[S];L=Ou.clone(O.uniforms)}else L=y.uniforms;return L}function C(y,S){let L;for(let O=0,k=u.length;O<k;O++){const q=u[O];if(q.cacheKey===S){L=q,++L.usedTimes;break}}return L===void 0&&(L=new Hm(n,S,y,s),u.push(L)),L}function R(y){if(--y.usedTimes===0){const S=u.indexOf(y);u[S]=u[u.length-1],u.pop(),y.destroy()}}function P(y){l.remove(y)}function I(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:v,acquireProgram:C,releaseProgram:R,releaseShaderCache:P,programs:u,dispose:I}}function qm(){let n=new WeakMap;function e(o){return n.has(o)}function t(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function r(o,a,l){n.get(o)[a]=l}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function Ym(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function $a(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function ja(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function o(h,f,d,g,x,m){let p=n[e];return p===void 0?(p={id:h.id,object:h,geometry:f,material:d,groupOrder:g,renderOrder:h.renderOrder,z:x,group:m},n[e]=p):(p.id=h.id,p.object=h,p.geometry=f,p.material=d,p.groupOrder=g,p.renderOrder=h.renderOrder,p.z=x,p.group=m),e++,p}function a(h,f,d,g,x,m){const p=o(h,f,d,g,x,m);d.transmission>0?i.push(p):d.transparent===!0?r.push(p):t.push(p)}function l(h,f,d,g,x,m){const p=o(h,f,d,g,x,m);d.transmission>0?i.unshift(p):d.transparent===!0?r.unshift(p):t.unshift(p)}function c(h,f){t.length>1&&t.sort(h||Ym),i.length>1&&i.sort(f||$a),r.length>1&&r.sort(f||$a)}function u(){for(let h=e,f=n.length;h<f;h++){const d=n[h];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:a,unshift:l,finish:u,sort:c}}function Zm(){let n=new WeakMap;function e(i,r){const s=n.get(i);let o;return s===void 0?(o=new ja,n.set(i,[o])):r>=s.length?(o=new ja,s.push(o)):o=s[r],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function Jm(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new w,color:new qe};break;case"SpotLight":t={position:new w,direction:new w,color:new qe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new w,color:new qe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new w,skyColor:new qe,groundColor:new qe};break;case"RectAreaLight":t={color:new qe,position:new w,halfWidth:new w,halfHeight:new w};break}return n[e.id]=t,t}}}function Km(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new le};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new le};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new le,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let $m=0;function jm(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function Qm(n){const e=new Jm,t=Km(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new w);const r=new w,s=new at,o=new at;function a(c){let u=0,h=0,f=0;for(let y=0;y<9;y++)i.probe[y].set(0,0,0);let d=0,g=0,x=0,m=0,p=0,T=0,E=0,v=0,C=0,R=0,P=0;c.sort(jm);for(let y=0,S=c.length;y<S;y++){const L=c[y],O=L.color,k=L.intensity,q=L.distance,V=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)u+=O.r*k,h+=O.g*k,f+=O.b*k;else if(L.isLightProbe){for(let X=0;X<9;X++)i.probe[X].addScaledVector(L.sh.coefficients[X],k);P++}else if(L.isDirectionalLight){const X=e.get(L);if(X.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const j=L.shadow,G=t.get(L);G.shadowIntensity=j.intensity,G.shadowBias=j.bias,G.shadowNormalBias=j.normalBias,G.shadowRadius=j.radius,G.shadowMapSize=j.mapSize,i.directionalShadow[d]=G,i.directionalShadowMap[d]=V,i.directionalShadowMatrix[d]=L.shadow.matrix,T++}i.directional[d]=X,d++}else if(L.isSpotLight){const X=e.get(L);X.position.setFromMatrixPosition(L.matrixWorld),X.color.copy(O).multiplyScalar(k),X.distance=q,X.coneCos=Math.cos(L.angle),X.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),X.decay=L.decay,i.spot[x]=X;const j=L.shadow;if(L.map&&(i.spotLightMap[C]=L.map,C++,j.updateMatrices(L),L.castShadow&&R++),i.spotLightMatrix[x]=j.matrix,L.castShadow){const G=t.get(L);G.shadowIntensity=j.intensity,G.shadowBias=j.bias,G.shadowNormalBias=j.normalBias,G.shadowRadius=j.radius,G.shadowMapSize=j.mapSize,i.spotShadow[x]=G,i.spotShadowMap[x]=V,v++}x++}else if(L.isRectAreaLight){const X=e.get(L);X.color.copy(O).multiplyScalar(k),X.halfWidth.set(L.width*.5,0,0),X.halfHeight.set(0,L.height*.5,0),i.rectArea[m]=X,m++}else if(L.isPointLight){const X=e.get(L);if(X.color.copy(L.color).multiplyScalar(L.intensity),X.distance=L.distance,X.decay=L.decay,L.castShadow){const j=L.shadow,G=t.get(L);G.shadowIntensity=j.intensity,G.shadowBias=j.bias,G.shadowNormalBias=j.normalBias,G.shadowRadius=j.radius,G.shadowMapSize=j.mapSize,G.shadowCameraNear=j.camera.near,G.shadowCameraFar=j.camera.far,i.pointShadow[g]=G,i.pointShadowMap[g]=V,i.pointShadowMatrix[g]=L.shadow.matrix,E++}i.point[g]=X,g++}else if(L.isHemisphereLight){const X=e.get(L);X.skyColor.copy(L.color).multiplyScalar(k),X.groundColor.copy(L.groundColor).multiplyScalar(k),i.hemi[p]=X,p++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=de.LTC_FLOAT_1,i.rectAreaLTC2=de.LTC_FLOAT_2):(i.rectAreaLTC1=de.LTC_HALF_1,i.rectAreaLTC2=de.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=h,i.ambient[2]=f;const I=i.hash;(I.directionalLength!==d||I.pointLength!==g||I.spotLength!==x||I.rectAreaLength!==m||I.hemiLength!==p||I.numDirectionalShadows!==T||I.numPointShadows!==E||I.numSpotShadows!==v||I.numSpotMaps!==C||I.numLightProbes!==P)&&(i.directional.length=d,i.spot.length=x,i.rectArea.length=m,i.point.length=g,i.hemi.length=p,i.directionalShadow.length=T,i.directionalShadowMap.length=T,i.pointShadow.length=E,i.pointShadowMap.length=E,i.spotShadow.length=v,i.spotShadowMap.length=v,i.directionalShadowMatrix.length=T,i.pointShadowMatrix.length=E,i.spotLightMatrix.length=v+C-R,i.spotLightMap.length=C,i.numSpotLightShadowsWithMaps=R,i.numLightProbes=P,I.directionalLength=d,I.pointLength=g,I.spotLength=x,I.rectAreaLength=m,I.hemiLength=p,I.numDirectionalShadows=T,I.numPointShadows=E,I.numSpotShadows=v,I.numSpotMaps=C,I.numLightProbes=P,i.version=$m++)}function l(c,u){let h=0,f=0,d=0,g=0,x=0;const m=u.matrixWorldInverse;for(let p=0,T=c.length;p<T;p++){const E=c[p];if(E.isDirectionalLight){const v=i.directional[h];v.direction.setFromMatrixPosition(E.matrixWorld),r.setFromMatrixPosition(E.target.matrixWorld),v.direction.sub(r),v.direction.transformDirection(m),h++}else if(E.isSpotLight){const v=i.spot[d];v.position.setFromMatrixPosition(E.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(E.matrixWorld),r.setFromMatrixPosition(E.target.matrixWorld),v.direction.sub(r),v.direction.transformDirection(m),d++}else if(E.isRectAreaLight){const v=i.rectArea[g];v.position.setFromMatrixPosition(E.matrixWorld),v.position.applyMatrix4(m),o.identity(),s.copy(E.matrixWorld),s.premultiply(m),o.extractRotation(s),v.halfWidth.set(E.width*.5,0,0),v.halfHeight.set(0,E.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),g++}else if(E.isPointLight){const v=i.point[f];v.position.setFromMatrixPosition(E.matrixWorld),v.position.applyMatrix4(m),f++}else if(E.isHemisphereLight){const v=i.hemi[x];v.direction.setFromMatrixPosition(E.matrixWorld),v.direction.transformDirection(m),x++}}}return{setup:a,setupView:l,state:i}}function Qa(n){const e=new Qm(n),t=[],i=[];function r(u){c.camera=u,t.length=0,i.length=0}function s(u){t.push(u)}function o(u){i.push(u)}function a(){e.setup(t)}function l(u){e.setupView(t,u)}const c={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function e0(n){let e=new WeakMap;function t(r,s=0){const o=e.get(r);let a;return o===void 0?(a=new Qa(n),e.set(r,[a])):s>=o.length?(a=new Qa(n),o.push(a)):a=o[s],a}function i(){e=new WeakMap}return{get:t,dispose:i}}const t0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,n0=`uniform sampler2D shadow_pass;
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
}`;function i0(n,e,t){let i=new Lo;const r=new le,s=new le,o=new nt,a=new bh({depthPacking:Wc}),l=new Th,c={},u=t.maxTextureSize,h={[Cn]:Lt,[Lt]:Cn,[Pt]:Pt},f=new wn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new le},radius:{value:4}},vertexShader:t0,fragmentShader:n0}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const g=new yt;g.setAttribute("position",new Zt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new tn(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=hl;let p=this.type;this.render=function(R,P,I){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||R.length===0)return;const y=n.getRenderTarget(),S=n.getActiveCubeFace(),L=n.getActiveMipmapLevel(),O=n.state;O.setBlending(bn),O.buffers.depth.getReversed()===!0?O.buffers.color.setClear(0,0,0,0):O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);const k=p!==hn&&this.type===hn,q=p===hn&&this.type!==hn;for(let V=0,X=R.length;V<X;V++){const j=R[V],G=j.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",j,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;r.copy(G.mapSize);const he=G.getFrameExtents();if(r.multiply(he),s.copy(G.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/he.x),r.x=s.x*he.x,G.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/he.y),r.y=s.y*he.y,G.mapSize.y=s.y)),G.map===null||k===!0||q===!0){const Me=this.type!==hn?{minFilter:Yt,magFilter:Yt}:{};G.map!==null&&G.map.dispose(),G.map=new qn(r.x,r.y,Me),G.map.texture.name=j.name+".shadowMap",G.camera.updateProjectionMatrix()}n.setRenderTarget(G.map),n.clear();const _e=G.getViewportCount();for(let Me=0;Me<_e;Me++){const ze=G.getViewport(Me);o.set(s.x*ze.x,s.y*ze.y,s.x*ze.z,s.y*ze.w),O.viewport(o),G.updateMatrices(j,Me),i=G.getFrustum(),v(P,I,G.camera,j,this.type)}G.isPointLightShadow!==!0&&this.type===hn&&T(G,I),G.needsUpdate=!1}p=this.type,m.needsUpdate=!1,n.setRenderTarget(y,S,L)};function T(R,P){const I=e.update(x);f.defines.VSM_SAMPLES!==R.blurSamples&&(f.defines.VSM_SAMPLES=R.blurSamples,d.defines.VSM_SAMPLES=R.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new qn(r.x,r.y)),f.uniforms.shadow_pass.value=R.map.texture,f.uniforms.resolution.value=R.mapSize,f.uniforms.radius.value=R.radius,n.setRenderTarget(R.mapPass),n.clear(),n.renderBufferDirect(P,null,I,f,x,null),d.uniforms.shadow_pass.value=R.mapPass.texture,d.uniforms.resolution.value=R.mapSize,d.uniforms.radius.value=R.radius,n.setRenderTarget(R.map),n.clear(),n.renderBufferDirect(P,null,I,d,x,null)}function E(R,P,I,y){let S=null;const L=I.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(L!==void 0)S=L;else if(S=I.isPointLight===!0?l:a,n.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){const O=S.uuid,k=P.uuid;let q=c[O];q===void 0&&(q={},c[O]=q);let V=q[k];V===void 0&&(V=S.clone(),q[k]=V,P.addEventListener("dispose",C)),S=V}if(S.visible=P.visible,S.wireframe=P.wireframe,y===hn?S.side=P.shadowSide!==null?P.shadowSide:P.side:S.side=P.shadowSide!==null?P.shadowSide:h[P.side],S.alphaMap=P.alphaMap,S.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,S.map=P.map,S.clipShadows=P.clipShadows,S.clippingPlanes=P.clippingPlanes,S.clipIntersection=P.clipIntersection,S.displacementMap=P.displacementMap,S.displacementScale=P.displacementScale,S.displacementBias=P.displacementBias,S.wireframeLinewidth=P.wireframeLinewidth,S.linewidth=P.linewidth,I.isPointLight===!0&&S.isMeshDistanceMaterial===!0){const O=n.properties.get(S);O.light=I}return S}function v(R,P,I,y,S){if(R.visible===!1)return;if(R.layers.test(P.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&S===hn)&&(!R.frustumCulled||i.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,R.matrixWorld);const k=e.update(R),q=R.material;if(Array.isArray(q)){const V=k.groups;for(let X=0,j=V.length;X<j;X++){const G=V[X],he=q[G.materialIndex];if(he&&he.visible){const _e=E(R,he,y,S);R.onBeforeShadow(n,R,P,I,k,_e,G),n.renderBufferDirect(I,null,k,_e,R,G),R.onAfterShadow(n,R,P,I,k,_e,G)}}}else if(q.visible){const V=E(R,q,y,S);R.onBeforeShadow(n,R,P,I,k,V,null),n.renderBufferDirect(I,null,k,V,R,null),R.onAfterShadow(n,R,P,I,k,V,null)}}const O=R.children;for(let k=0,q=O.length;k<q;k++)v(O[k],P,I,y,S)}function C(R){R.target.removeEventListener("dispose",C);for(const I in c){const y=c[I],S=R.target.uuid;S in y&&(y[S].dispose(),delete y[S])}}}const r0={[Ds]:Is,[Us]:Os,[Ns]:Bs,[gi]:Fs,[Is]:Ds,[Os]:Us,[Bs]:Ns,[Fs]:gi};function s0(n,e){function t(){let D=!1;const oe=new nt;let fe=null;const Se=new nt(0,0,0,0);return{setMask:function(re){fe!==re&&!D&&(n.colorMask(re,re,re,re),fe=re)},setLocked:function(re){D=re},setClear:function(re,$,Ae,Oe,ot){ot===!0&&(re*=Oe,$*=Oe,Ae*=Oe),oe.set(re,$,Ae,Oe),Se.equals(oe)===!1&&(n.clearColor(re,$,Ae,Oe),Se.copy(oe))},reset:function(){D=!1,fe=null,Se.set(-1,0,0,0)}}}function i(){let D=!1,oe=!1,fe=null,Se=null,re=null;return{setReversed:function($){if(oe!==$){const Ae=e.get("EXT_clip_control");$?Ae.clipControlEXT(Ae.LOWER_LEFT_EXT,Ae.ZERO_TO_ONE_EXT):Ae.clipControlEXT(Ae.LOWER_LEFT_EXT,Ae.NEGATIVE_ONE_TO_ONE_EXT),oe=$;const Oe=re;re=null,this.setClear(Oe)}},getReversed:function(){return oe},setTest:function($){$?te(n.DEPTH_TEST):ve(n.DEPTH_TEST)},setMask:function($){fe!==$&&!D&&(n.depthMask($),fe=$)},setFunc:function($){if(oe&&($=r0[$]),Se!==$){switch($){case Ds:n.depthFunc(n.NEVER);break;case Is:n.depthFunc(n.ALWAYS);break;case Us:n.depthFunc(n.LESS);break;case gi:n.depthFunc(n.LEQUAL);break;case Ns:n.depthFunc(n.EQUAL);break;case Fs:n.depthFunc(n.GEQUAL);break;case Os:n.depthFunc(n.GREATER);break;case Bs:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Se=$}},setLocked:function($){D=$},setClear:function($){re!==$&&(oe&&($=1-$),n.clearDepth($),re=$)},reset:function(){D=!1,fe=null,Se=null,re=null,oe=!1}}}function r(){let D=!1,oe=null,fe=null,Se=null,re=null,$=null,Ae=null,Oe=null,ot=null;return{setTest:function($e){D||($e?te(n.STENCIL_TEST):ve(n.STENCIL_TEST))},setMask:function($e){oe!==$e&&!D&&(n.stencilMask($e),oe=$e)},setFunc:function($e,sn,$t){(fe!==$e||Se!==sn||re!==$t)&&(n.stencilFunc($e,sn,$t),fe=$e,Se=sn,re=$t)},setOp:function($e,sn,$t){($!==$e||Ae!==sn||Oe!==$t)&&(n.stencilOp($e,sn,$t),$=$e,Ae=sn,Oe=$t)},setLocked:function($e){D=$e},setClear:function($e){ot!==$e&&(n.clearStencil($e),ot=$e)},reset:function(){D=!1,oe=null,fe=null,Se=null,re=null,$=null,Ae=null,Oe=null,ot=null}}}const s=new t,o=new i,a=new r,l=new WeakMap,c=new WeakMap;let u={},h={},f=new WeakMap,d=[],g=null,x=!1,m=null,p=null,T=null,E=null,v=null,C=null,R=null,P=new qe(0,0,0),I=0,y=!1,S=null,L=null,O=null,k=null,q=null;const V=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,j=0;const G=n.getParameter(n.VERSION);G.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec(G)[1]),X=j>=1):G.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),X=j>=2);let he=null,_e={};const Me=n.getParameter(n.SCISSOR_BOX),ze=n.getParameter(n.VIEWPORT),Ye=new nt().fromArray(Me),Qe=new nt().fromArray(ze);function Ze(D,oe,fe,Se){const re=new Uint8Array(4),$=n.createTexture();n.bindTexture(D,$),n.texParameteri(D,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(D,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Ae=0;Ae<fe;Ae++)D===n.TEXTURE_3D||D===n.TEXTURE_2D_ARRAY?n.texImage3D(oe,0,n.RGBA,1,1,Se,0,n.RGBA,n.UNSIGNED_BYTE,re):n.texImage2D(oe+Ae,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,re);return $}const Y={};Y[n.TEXTURE_2D]=Ze(n.TEXTURE_2D,n.TEXTURE_2D,1),Y[n.TEXTURE_CUBE_MAP]=Ze(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),Y[n.TEXTURE_2D_ARRAY]=Ze(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Y[n.TEXTURE_3D]=Ze(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),te(n.DEPTH_TEST),o.setFunc(gi),J(!1),Z(Ko),te(n.CULL_FACE),ee(bn);function te(D){u[D]!==!0&&(n.enable(D),u[D]=!0)}function ve(D){u[D]!==!1&&(n.disable(D),u[D]=!1)}function we(D,oe){return h[D]!==oe?(n.bindFramebuffer(D,oe),h[D]=oe,D===n.DRAW_FRAMEBUFFER&&(h[n.FRAMEBUFFER]=oe),D===n.FRAMEBUFFER&&(h[n.DRAW_FRAMEBUFFER]=oe),!0):!1}function Ee(D,oe){let fe=d,Se=!1;if(D){fe=f.get(oe),fe===void 0&&(fe=[],f.set(oe,fe));const re=D.textures;if(fe.length!==re.length||fe[0]!==n.COLOR_ATTACHMENT0){for(let $=0,Ae=re.length;$<Ae;$++)fe[$]=n.COLOR_ATTACHMENT0+$;fe.length=re.length,Se=!0}}else fe[0]!==n.BACK&&(fe[0]=n.BACK,Se=!0);Se&&n.drawBuffers(fe)}function We(D){return g!==D?(n.useProgram(D),g=D,!0):!1}const st={[Hn]:n.FUNC_ADD,[_c]:n.FUNC_SUBTRACT,[xc]:n.FUNC_REVERSE_SUBTRACT};st[vc]=n.MIN,st[Mc]=n.MAX;const A={[Sc]:n.ZERO,[yc]:n.ONE,[Ec]:n.SRC_COLOR,[Ps]:n.SRC_ALPHA,[wc]:n.SRC_ALPHA_SATURATE,[Rc]:n.DST_COLOR,[Tc]:n.DST_ALPHA,[bc]:n.ONE_MINUS_SRC_COLOR,[Ls]:n.ONE_MINUS_SRC_ALPHA,[Cc]:n.ONE_MINUS_DST_COLOR,[Ac]:n.ONE_MINUS_DST_ALPHA,[Pc]:n.CONSTANT_COLOR,[Lc]:n.ONE_MINUS_CONSTANT_COLOR,[Dc]:n.CONSTANT_ALPHA,[Ic]:n.ONE_MINUS_CONSTANT_ALPHA};function ee(D,oe,fe,Se,re,$,Ae,Oe,ot,$e){if(D===bn){x===!0&&(ve(n.BLEND),x=!1);return}if(x===!1&&(te(n.BLEND),x=!0),D!==gc){if(D!==m||$e!==y){if((p!==Hn||v!==Hn)&&(n.blendEquation(n.FUNC_ADD),p=Hn,v=Hn),$e)switch(D){case pi:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case $o:n.blendFunc(n.ONE,n.ONE);break;case jo:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Qo:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case pi:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case $o:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case jo:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Qo:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}T=null,E=null,C=null,R=null,P.set(0,0,0),I=0,m=D,y=$e}return}re=re||oe,$=$||fe,Ae=Ae||Se,(oe!==p||re!==v)&&(n.blendEquationSeparate(st[oe],st[re]),p=oe,v=re),(fe!==T||Se!==E||$!==C||Ae!==R)&&(n.blendFuncSeparate(A[fe],A[Se],A[$],A[Ae]),T=fe,E=Se,C=$,R=Ae),(Oe.equals(P)===!1||ot!==I)&&(n.blendColor(Oe.r,Oe.g,Oe.b,ot),P.copy(Oe),I=ot),m=D,y=!1}function K(D,oe){D.side===Pt?ve(n.CULL_FACE):te(n.CULL_FACE);let fe=D.side===Lt;oe&&(fe=!fe),J(fe),D.blending===pi&&D.transparent===!1?ee(bn):ee(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),o.setFunc(D.depthFunc),o.setTest(D.depthTest),o.setMask(D.depthWrite),s.setMask(D.colorWrite);const Se=D.stencilWrite;a.setTest(Se),Se&&(a.setMask(D.stencilWriteMask),a.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),a.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),ne(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?te(n.SAMPLE_ALPHA_TO_COVERAGE):ve(n.SAMPLE_ALPHA_TO_COVERAGE)}function J(D){S!==D&&(D?n.frontFace(n.CW):n.frontFace(n.CCW),S=D)}function Z(D){D!==pc?(te(n.CULL_FACE),D!==L&&(D===Ko?n.cullFace(n.BACK):D===mc?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):ve(n.CULL_FACE),L=D}function ce(D){D!==O&&(X&&n.lineWidth(D),O=D)}function ne(D,oe,fe){D?(te(n.POLYGON_OFFSET_FILL),(k!==oe||q!==fe)&&(n.polygonOffset(oe,fe),k=oe,q=fe)):ve(n.POLYGON_OFFSET_FILL)}function ue(D){D?te(n.SCISSOR_TEST):ve(n.SCISSOR_TEST)}function Fe(D){D===void 0&&(D=n.TEXTURE0+V-1),he!==D&&(n.activeTexture(D),he=D)}function Ne(D,oe,fe){fe===void 0&&(he===null?fe=n.TEXTURE0+V-1:fe=he);let Se=_e[fe];Se===void 0&&(Se={type:void 0,texture:void 0},_e[fe]=Se),(Se.type!==D||Se.texture!==oe)&&(he!==fe&&(n.activeTexture(fe),he=fe),n.bindTexture(D,oe||Y[D]),Se.type=D,Se.texture=oe)}function b(){const D=_e[he];D!==void 0&&D.type!==void 0&&(n.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function _(){try{n.compressedTexImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function F(){try{n.compressedTexImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function H(){try{n.texSubImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Q(){try{n.texSubImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function W(){try{n.compressedTexSubImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Re(){try{n.compressedTexSubImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ae(){try{n.texStorage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function be(){try{n.texStorage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Te(){try{n.texImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ie(){try{n.texImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ge(D){Ye.equals(D)===!1&&(n.scissor(D.x,D.y,D.z,D.w),Ye.copy(D))}function Ie(D){Qe.equals(D)===!1&&(n.viewport(D.x,D.y,D.z,D.w),Qe.copy(D))}function Ce(D,oe){let fe=c.get(oe);fe===void 0&&(fe=new WeakMap,c.set(oe,fe));let Se=fe.get(D);Se===void 0&&(Se=n.getUniformBlockIndex(oe,D.name),fe.set(D,Se))}function pe(D,oe){const Se=c.get(oe).get(D);l.get(oe)!==Se&&(n.uniformBlockBinding(oe,Se,D.__bindingPointIndex),l.set(oe,Se))}function ke(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},he=null,_e={},h={},f=new WeakMap,d=[],g=null,x=!1,m=null,p=null,T=null,E=null,v=null,C=null,R=null,P=new qe(0,0,0),I=0,y=!1,S=null,L=null,O=null,k=null,q=null,Ye.set(0,0,n.canvas.width,n.canvas.height),Qe.set(0,0,n.canvas.width,n.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:te,disable:ve,bindFramebuffer:we,drawBuffers:Ee,useProgram:We,setBlending:ee,setMaterial:K,setFlipSided:J,setCullFace:Z,setLineWidth:ce,setPolygonOffset:ne,setScissorTest:ue,activeTexture:Fe,bindTexture:Ne,unbindTexture:b,compressedTexImage2D:_,compressedTexImage3D:F,texImage2D:Te,texImage3D:ie,updateUBOMapping:Ce,uniformBlockBinding:pe,texStorage2D:ae,texStorage3D:be,texSubImage2D:H,texSubImage3D:Q,compressedTexSubImage2D:W,compressedTexSubImage3D:Re,scissor:ge,viewport:Ie,reset:ke}}function o0(n,e,t,i,r,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new le,u=new WeakMap;let h;const f=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(b,_){return d?new OffscreenCanvas(b,_):Nr("canvas")}function x(b,_,F){let H=1;const Q=Ne(b);if((Q.width>F||Q.height>F)&&(H=F/Math.max(Q.width,Q.height)),H<1)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap||typeof VideoFrame<"u"&&b instanceof VideoFrame){const W=Math.floor(H*Q.width),Re=Math.floor(H*Q.height);h===void 0&&(h=g(W,Re));const ae=_?g(W,Re):h;return ae.width=W,ae.height=Re,ae.getContext("2d").drawImage(b,0,0,W,Re),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+W+"x"+Re+")."),ae}else return"data"in b&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),b;return b}function m(b){return b.generateMipmaps}function p(b){n.generateMipmap(b)}function T(b){return b.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:b.isWebGL3DRenderTarget?n.TEXTURE_3D:b.isWebGLArrayRenderTarget||b.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function E(b,_,F,H,Q=!1){if(b!==null){if(n[b]!==void 0)return n[b];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let W=_;if(_===n.RED&&(F===n.FLOAT&&(W=n.R32F),F===n.HALF_FLOAT&&(W=n.R16F),F===n.UNSIGNED_BYTE&&(W=n.R8)),_===n.RED_INTEGER&&(F===n.UNSIGNED_BYTE&&(W=n.R8UI),F===n.UNSIGNED_SHORT&&(W=n.R16UI),F===n.UNSIGNED_INT&&(W=n.R32UI),F===n.BYTE&&(W=n.R8I),F===n.SHORT&&(W=n.R16I),F===n.INT&&(W=n.R32I)),_===n.RG&&(F===n.FLOAT&&(W=n.RG32F),F===n.HALF_FLOAT&&(W=n.RG16F),F===n.UNSIGNED_BYTE&&(W=n.RG8)),_===n.RG_INTEGER&&(F===n.UNSIGNED_BYTE&&(W=n.RG8UI),F===n.UNSIGNED_SHORT&&(W=n.RG16UI),F===n.UNSIGNED_INT&&(W=n.RG32UI),F===n.BYTE&&(W=n.RG8I),F===n.SHORT&&(W=n.RG16I),F===n.INT&&(W=n.RG32I)),_===n.RGB_INTEGER&&(F===n.UNSIGNED_BYTE&&(W=n.RGB8UI),F===n.UNSIGNED_SHORT&&(W=n.RGB16UI),F===n.UNSIGNED_INT&&(W=n.RGB32UI),F===n.BYTE&&(W=n.RGB8I),F===n.SHORT&&(W=n.RGB16I),F===n.INT&&(W=n.RGB32I)),_===n.RGBA_INTEGER&&(F===n.UNSIGNED_BYTE&&(W=n.RGBA8UI),F===n.UNSIGNED_SHORT&&(W=n.RGBA16UI),F===n.UNSIGNED_INT&&(W=n.RGBA32UI),F===n.BYTE&&(W=n.RGBA8I),F===n.SHORT&&(W=n.RGBA16I),F===n.INT&&(W=n.RGBA32I)),_===n.RGB&&(F===n.UNSIGNED_INT_5_9_9_9_REV&&(W=n.RGB9_E5),F===n.UNSIGNED_INT_10F_11F_11F_REV&&(W=n.R11F_G11F_B10F)),_===n.RGBA){const Re=Q?Ir:Ke.getTransfer(H);F===n.FLOAT&&(W=n.RGBA32F),F===n.HALF_FLOAT&&(W=n.RGBA16F),F===n.UNSIGNED_BYTE&&(W=Re===tt?n.SRGB8_ALPHA8:n.RGBA8),F===n.UNSIGNED_SHORT_4_4_4_4&&(W=n.RGBA4),F===n.UNSIGNED_SHORT_5_5_5_1&&(W=n.RGB5_A1)}return(W===n.R16F||W===n.R32F||W===n.RG16F||W===n.RG32F||W===n.RGBA16F||W===n.RGBA32F)&&e.get("EXT_color_buffer_float"),W}function v(b,_){let F;return b?_===null||_===Xn||_===ki?F=n.DEPTH24_STENCIL8:_===dn?F=n.DEPTH32F_STENCIL8:_===zi&&(F=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===Xn||_===ki?F=n.DEPTH_COMPONENT24:_===dn?F=n.DEPTH_COMPONENT32F:_===zi&&(F=n.DEPTH_COMPONENT16),F}function C(b,_){return m(b)===!0||b.isFramebufferTexture&&b.minFilter!==Yt&&b.minFilter!==Qt?Math.log2(Math.max(_.width,_.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?_.mipmaps.length:1}function R(b){const _=b.target;_.removeEventListener("dispose",R),I(_),_.isVideoTexture&&u.delete(_)}function P(b){const _=b.target;_.removeEventListener("dispose",P),S(_)}function I(b){const _=i.get(b);if(_.__webglInit===void 0)return;const F=b.source,H=f.get(F);if(H){const Q=H[_.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&y(b),Object.keys(H).length===0&&f.delete(F)}i.remove(b)}function y(b){const _=i.get(b);n.deleteTexture(_.__webglTexture);const F=b.source,H=f.get(F);delete H[_.__cacheKey],o.memory.textures--}function S(b){const _=i.get(b);if(b.depthTexture&&(b.depthTexture.dispose(),i.remove(b.depthTexture)),b.isWebGLCubeRenderTarget)for(let H=0;H<6;H++){if(Array.isArray(_.__webglFramebuffer[H]))for(let Q=0;Q<_.__webglFramebuffer[H].length;Q++)n.deleteFramebuffer(_.__webglFramebuffer[H][Q]);else n.deleteFramebuffer(_.__webglFramebuffer[H]);_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer[H])}else{if(Array.isArray(_.__webglFramebuffer))for(let H=0;H<_.__webglFramebuffer.length;H++)n.deleteFramebuffer(_.__webglFramebuffer[H]);else n.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&n.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let H=0;H<_.__webglColorRenderbuffer.length;H++)_.__webglColorRenderbuffer[H]&&n.deleteRenderbuffer(_.__webglColorRenderbuffer[H]);_.__webglDepthRenderbuffer&&n.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const F=b.textures;for(let H=0,Q=F.length;H<Q;H++){const W=i.get(F[H]);W.__webglTexture&&(n.deleteTexture(W.__webglTexture),o.memory.textures--),i.remove(F[H])}i.remove(b)}let L=0;function O(){L=0}function k(){const b=L;return b>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+r.maxTextures),L+=1,b}function q(b){const _=[];return _.push(b.wrapS),_.push(b.wrapT),_.push(b.wrapR||0),_.push(b.magFilter),_.push(b.minFilter),_.push(b.anisotropy),_.push(b.internalFormat),_.push(b.format),_.push(b.type),_.push(b.generateMipmaps),_.push(b.premultiplyAlpha),_.push(b.flipY),_.push(b.unpackAlignment),_.push(b.colorSpace),_.join()}function V(b,_){const F=i.get(b);if(b.isVideoTexture&&ue(b),b.isRenderTargetTexture===!1&&b.isExternalTexture!==!0&&b.version>0&&F.__version!==b.version){const H=b.image;if(H===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(H.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Y(F,b,_);return}}else b.isExternalTexture&&(F.__webglTexture=b.sourceTexture?b.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,F.__webglTexture,n.TEXTURE0+_)}function X(b,_){const F=i.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&F.__version!==b.version){Y(F,b,_);return}t.bindTexture(n.TEXTURE_2D_ARRAY,F.__webglTexture,n.TEXTURE0+_)}function j(b,_){const F=i.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&F.__version!==b.version){Y(F,b,_);return}t.bindTexture(n.TEXTURE_3D,F.__webglTexture,n.TEXTURE0+_)}function G(b,_){const F=i.get(b);if(b.version>0&&F.__version!==b.version){te(F,b,_);return}t.bindTexture(n.TEXTURE_CUBE_MAP,F.__webglTexture,n.TEXTURE0+_)}const he={[Dr]:n.REPEAT,[Gn]:n.CLAMP_TO_EDGE,[Hs]:n.MIRRORED_REPEAT},_e={[Yt]:n.NEAREST,[Vc]:n.NEAREST_MIPMAP_NEAREST,[Qi]:n.NEAREST_MIPMAP_LINEAR,[Qt]:n.LINEAR,[Gr]:n.LINEAR_MIPMAP_NEAREST,[Wn]:n.LINEAR_MIPMAP_LINEAR},Me={[qc]:n.NEVER,[jc]:n.ALWAYS,[Yc]:n.LESS,[Tl]:n.LEQUAL,[Zc]:n.EQUAL,[$c]:n.GEQUAL,[Jc]:n.GREATER,[Kc]:n.NOTEQUAL};function ze(b,_){if(_.type===dn&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===Qt||_.magFilter===Gr||_.magFilter===Qi||_.magFilter===Wn||_.minFilter===Qt||_.minFilter===Gr||_.minFilter===Qi||_.minFilter===Wn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(b,n.TEXTURE_WRAP_S,he[_.wrapS]),n.texParameteri(b,n.TEXTURE_WRAP_T,he[_.wrapT]),(b===n.TEXTURE_3D||b===n.TEXTURE_2D_ARRAY)&&n.texParameteri(b,n.TEXTURE_WRAP_R,he[_.wrapR]),n.texParameteri(b,n.TEXTURE_MAG_FILTER,_e[_.magFilter]),n.texParameteri(b,n.TEXTURE_MIN_FILTER,_e[_.minFilter]),_.compareFunction&&(n.texParameteri(b,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(b,n.TEXTURE_COMPARE_FUNC,Me[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Yt||_.minFilter!==Qi&&_.minFilter!==Wn||_.type===dn&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||i.get(_).__currentAnisotropy){const F=e.get("EXT_texture_filter_anisotropic");n.texParameterf(b,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,r.getMaxAnisotropy())),i.get(_).__currentAnisotropy=_.anisotropy}}}function Ye(b,_){let F=!1;b.__webglInit===void 0&&(b.__webglInit=!0,_.addEventListener("dispose",R));const H=_.source;let Q=f.get(H);Q===void 0&&(Q={},f.set(H,Q));const W=q(_);if(W!==b.__cacheKey){Q[W]===void 0&&(Q[W]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,F=!0),Q[W].usedTimes++;const Re=Q[b.__cacheKey];Re!==void 0&&(Q[b.__cacheKey].usedTimes--,Re.usedTimes===0&&y(_)),b.__cacheKey=W,b.__webglTexture=Q[W].texture}return F}function Qe(b,_,F){return Math.floor(Math.floor(b/F)/_)}function Ze(b,_,F,H){const W=b.updateRanges;if(W.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,_.width,_.height,F,H,_.data);else{W.sort((ie,ge)=>ie.start-ge.start);let Re=0;for(let ie=1;ie<W.length;ie++){const ge=W[Re],Ie=W[ie],Ce=ge.start+ge.count,pe=Qe(Ie.start,_.width,4),ke=Qe(ge.start,_.width,4);Ie.start<=Ce+1&&pe===ke&&Qe(Ie.start+Ie.count-1,_.width,4)===pe?ge.count=Math.max(ge.count,Ie.start+Ie.count-ge.start):(++Re,W[Re]=Ie)}W.length=Re+1;const ae=n.getParameter(n.UNPACK_ROW_LENGTH),be=n.getParameter(n.UNPACK_SKIP_PIXELS),Te=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,_.width);for(let ie=0,ge=W.length;ie<ge;ie++){const Ie=W[ie],Ce=Math.floor(Ie.start/4),pe=Math.ceil(Ie.count/4),ke=Ce%_.width,D=Math.floor(Ce/_.width),oe=pe,fe=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,ke),n.pixelStorei(n.UNPACK_SKIP_ROWS,D),t.texSubImage2D(n.TEXTURE_2D,0,ke,D,oe,fe,F,H,_.data)}b.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,ae),n.pixelStorei(n.UNPACK_SKIP_PIXELS,be),n.pixelStorei(n.UNPACK_SKIP_ROWS,Te)}}function Y(b,_,F){let H=n.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(H=n.TEXTURE_2D_ARRAY),_.isData3DTexture&&(H=n.TEXTURE_3D);const Q=Ye(b,_),W=_.source;t.bindTexture(H,b.__webglTexture,n.TEXTURE0+F);const Re=i.get(W);if(W.version!==Re.__version||Q===!0){t.activeTexture(n.TEXTURE0+F);const ae=Ke.getPrimaries(Ke.workingColorSpace),be=_.colorSpace===fn?null:Ke.getPrimaries(_.colorSpace),Te=_.colorSpace===fn||ae===be?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Te);let ie=x(_.image,!1,r.maxTextureSize);ie=Fe(_,ie);const ge=s.convert(_.format,_.colorSpace),Ie=s.convert(_.type);let Ce=E(_.internalFormat,ge,Ie,_.colorSpace,_.isVideoTexture);ze(H,_);let pe;const ke=_.mipmaps,D=_.isVideoTexture!==!0,oe=Re.__version===void 0||Q===!0,fe=W.dataReady,Se=C(_,ie);if(_.isDepthTexture)Ce=v(_.format===Vi,_.type),oe&&(D?t.texStorage2D(n.TEXTURE_2D,1,Ce,ie.width,ie.height):t.texImage2D(n.TEXTURE_2D,0,Ce,ie.width,ie.height,0,ge,Ie,null));else if(_.isDataTexture)if(ke.length>0){D&&oe&&t.texStorage2D(n.TEXTURE_2D,Se,Ce,ke[0].width,ke[0].height);for(let re=0,$=ke.length;re<$;re++)pe=ke[re],D?fe&&t.texSubImage2D(n.TEXTURE_2D,re,0,0,pe.width,pe.height,ge,Ie,pe.data):t.texImage2D(n.TEXTURE_2D,re,Ce,pe.width,pe.height,0,ge,Ie,pe.data);_.generateMipmaps=!1}else D?(oe&&t.texStorage2D(n.TEXTURE_2D,Se,Ce,ie.width,ie.height),fe&&Ze(_,ie,ge,Ie)):t.texImage2D(n.TEXTURE_2D,0,Ce,ie.width,ie.height,0,ge,Ie,ie.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){D&&oe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Se,Ce,ke[0].width,ke[0].height,ie.depth);for(let re=0,$=ke.length;re<$;re++)if(pe=ke[re],_.format!==qt)if(ge!==null)if(D){if(fe)if(_.layerUpdates.size>0){const Ae=wa(pe.width,pe.height,_.format,_.type);for(const Oe of _.layerUpdates){const ot=pe.data.subarray(Oe*Ae/pe.data.BYTES_PER_ELEMENT,(Oe+1)*Ae/pe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,re,0,0,Oe,pe.width,pe.height,1,ge,ot)}_.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,re,0,0,0,pe.width,pe.height,ie.depth,ge,pe.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,re,Ce,pe.width,pe.height,ie.depth,0,pe.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else D?fe&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,re,0,0,0,pe.width,pe.height,ie.depth,ge,Ie,pe.data):t.texImage3D(n.TEXTURE_2D_ARRAY,re,Ce,pe.width,pe.height,ie.depth,0,ge,Ie,pe.data)}else{D&&oe&&t.texStorage2D(n.TEXTURE_2D,Se,Ce,ke[0].width,ke[0].height);for(let re=0,$=ke.length;re<$;re++)pe=ke[re],_.format!==qt?ge!==null?D?fe&&t.compressedTexSubImage2D(n.TEXTURE_2D,re,0,0,pe.width,pe.height,ge,pe.data):t.compressedTexImage2D(n.TEXTURE_2D,re,Ce,pe.width,pe.height,0,pe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):D?fe&&t.texSubImage2D(n.TEXTURE_2D,re,0,0,pe.width,pe.height,ge,Ie,pe.data):t.texImage2D(n.TEXTURE_2D,re,Ce,pe.width,pe.height,0,ge,Ie,pe.data)}else if(_.isDataArrayTexture)if(D){if(oe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Se,Ce,ie.width,ie.height,ie.depth),fe)if(_.layerUpdates.size>0){const re=wa(ie.width,ie.height,_.format,_.type);for(const $ of _.layerUpdates){const Ae=ie.data.subarray($*re/ie.data.BYTES_PER_ELEMENT,($+1)*re/ie.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,$,ie.width,ie.height,1,ge,Ie,Ae)}_.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ie.width,ie.height,ie.depth,ge,Ie,ie.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Ce,ie.width,ie.height,ie.depth,0,ge,Ie,ie.data);else if(_.isData3DTexture)D?(oe&&t.texStorage3D(n.TEXTURE_3D,Se,Ce,ie.width,ie.height,ie.depth),fe&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ie.width,ie.height,ie.depth,ge,Ie,ie.data)):t.texImage3D(n.TEXTURE_3D,0,Ce,ie.width,ie.height,ie.depth,0,ge,Ie,ie.data);else if(_.isFramebufferTexture){if(oe)if(D)t.texStorage2D(n.TEXTURE_2D,Se,Ce,ie.width,ie.height);else{let re=ie.width,$=ie.height;for(let Ae=0;Ae<Se;Ae++)t.texImage2D(n.TEXTURE_2D,Ae,Ce,re,$,0,ge,Ie,null),re>>=1,$>>=1}}else if(ke.length>0){if(D&&oe){const re=Ne(ke[0]);t.texStorage2D(n.TEXTURE_2D,Se,Ce,re.width,re.height)}for(let re=0,$=ke.length;re<$;re++)pe=ke[re],D?fe&&t.texSubImage2D(n.TEXTURE_2D,re,0,0,ge,Ie,pe):t.texImage2D(n.TEXTURE_2D,re,Ce,ge,Ie,pe);_.generateMipmaps=!1}else if(D){if(oe){const re=Ne(ie);t.texStorage2D(n.TEXTURE_2D,Se,Ce,re.width,re.height)}fe&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,ge,Ie,ie)}else t.texImage2D(n.TEXTURE_2D,0,Ce,ge,Ie,ie);m(_)&&p(H),Re.__version=W.version,_.onUpdate&&_.onUpdate(_)}b.__version=_.version}function te(b,_,F){if(_.image.length!==6)return;const H=Ye(b,_),Q=_.source;t.bindTexture(n.TEXTURE_CUBE_MAP,b.__webglTexture,n.TEXTURE0+F);const W=i.get(Q);if(Q.version!==W.__version||H===!0){t.activeTexture(n.TEXTURE0+F);const Re=Ke.getPrimaries(Ke.workingColorSpace),ae=_.colorSpace===fn?null:Ke.getPrimaries(_.colorSpace),be=_.colorSpace===fn||Re===ae?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,be);const Te=_.isCompressedTexture||_.image[0].isCompressedTexture,ie=_.image[0]&&_.image[0].isDataTexture,ge=[];for(let $=0;$<6;$++)!Te&&!ie?ge[$]=x(_.image[$],!0,r.maxCubemapSize):ge[$]=ie?_.image[$].image:_.image[$],ge[$]=Fe(_,ge[$]);const Ie=ge[0],Ce=s.convert(_.format,_.colorSpace),pe=s.convert(_.type),ke=E(_.internalFormat,Ce,pe,_.colorSpace),D=_.isVideoTexture!==!0,oe=W.__version===void 0||H===!0,fe=Q.dataReady;let Se=C(_,Ie);ze(n.TEXTURE_CUBE_MAP,_);let re;if(Te){D&&oe&&t.texStorage2D(n.TEXTURE_CUBE_MAP,Se,ke,Ie.width,Ie.height);for(let $=0;$<6;$++){re=ge[$].mipmaps;for(let Ae=0;Ae<re.length;Ae++){const Oe=re[Ae];_.format!==qt?Ce!==null?D?fe&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,Ae,0,0,Oe.width,Oe.height,Ce,Oe.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,Ae,ke,Oe.width,Oe.height,0,Oe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):D?fe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,Ae,0,0,Oe.width,Oe.height,Ce,pe,Oe.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,Ae,ke,Oe.width,Oe.height,0,Ce,pe,Oe.data)}}}else{if(re=_.mipmaps,D&&oe){re.length>0&&Se++;const $=Ne(ge[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,Se,ke,$.width,$.height)}for(let $=0;$<6;$++)if(ie){D?fe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,ge[$].width,ge[$].height,Ce,pe,ge[$].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,ke,ge[$].width,ge[$].height,0,Ce,pe,ge[$].data);for(let Ae=0;Ae<re.length;Ae++){const ot=re[Ae].image[$].image;D?fe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,Ae+1,0,0,ot.width,ot.height,Ce,pe,ot.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,Ae+1,ke,ot.width,ot.height,0,Ce,pe,ot.data)}}else{D?fe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,Ce,pe,ge[$]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,ke,Ce,pe,ge[$]);for(let Ae=0;Ae<re.length;Ae++){const Oe=re[Ae];D?fe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,Ae+1,0,0,Ce,pe,Oe.image[$]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,Ae+1,ke,Ce,pe,Oe.image[$])}}}m(_)&&p(n.TEXTURE_CUBE_MAP),W.__version=Q.version,_.onUpdate&&_.onUpdate(_)}b.__version=_.version}function ve(b,_,F,H,Q,W){const Re=s.convert(F.format,F.colorSpace),ae=s.convert(F.type),be=E(F.internalFormat,Re,ae,F.colorSpace),Te=i.get(_),ie=i.get(F);if(ie.__renderTarget=_,!Te.__hasExternalTextures){const ge=Math.max(1,_.width>>W),Ie=Math.max(1,_.height>>W);Q===n.TEXTURE_3D||Q===n.TEXTURE_2D_ARRAY?t.texImage3D(Q,W,be,ge,Ie,_.depth,0,Re,ae,null):t.texImage2D(Q,W,be,ge,Ie,0,Re,ae,null)}t.bindFramebuffer(n.FRAMEBUFFER,b),ne(_)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,H,Q,ie.__webglTexture,0,ce(_)):(Q===n.TEXTURE_2D||Q>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,H,Q,ie.__webglTexture,W),t.bindFramebuffer(n.FRAMEBUFFER,null)}function we(b,_,F){if(n.bindRenderbuffer(n.RENDERBUFFER,b),_.depthBuffer){const H=_.depthTexture,Q=H&&H.isDepthTexture?H.type:null,W=v(_.stencilBuffer,Q),Re=_.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ae=ce(_);ne(_)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ae,W,_.width,_.height):F?n.renderbufferStorageMultisample(n.RENDERBUFFER,ae,W,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,W,_.width,_.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Re,n.RENDERBUFFER,b)}else{const H=_.textures;for(let Q=0;Q<H.length;Q++){const W=H[Q],Re=s.convert(W.format,W.colorSpace),ae=s.convert(W.type),be=E(W.internalFormat,Re,ae,W.colorSpace),Te=ce(_);F&&ne(_)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Te,be,_.width,_.height):ne(_)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Te,be,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,be,_.width,_.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Ee(b,_){if(_&&_.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,b),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const H=i.get(_.depthTexture);H.__renderTarget=_,(!H.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),V(_.depthTexture,0);const Q=H.__webglTexture,W=ce(_);if(_.depthTexture.format===Hi)ne(_)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,Q,0,W):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,Q,0);else if(_.depthTexture.format===Vi)ne(_)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,Q,0,W):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,Q,0);else throw new Error("Unknown depthTexture format")}function We(b){const _=i.get(b),F=b.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==b.depthTexture){const H=b.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),H){const Q=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,H.removeEventListener("dispose",Q)};H.addEventListener("dispose",Q),_.__depthDisposeCallback=Q}_.__boundDepthTexture=H}if(b.depthTexture&&!_.__autoAllocateDepthBuffer){if(F)throw new Error("target.depthTexture not supported in Cube render targets");const H=b.texture.mipmaps;H&&H.length>0?Ee(_.__webglFramebuffer[0],b):Ee(_.__webglFramebuffer,b)}else if(F){_.__webglDepthbuffer=[];for(let H=0;H<6;H++)if(t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[H]),_.__webglDepthbuffer[H]===void 0)_.__webglDepthbuffer[H]=n.createRenderbuffer(),we(_.__webglDepthbuffer[H],b,!1);else{const Q=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,W=_.__webglDepthbuffer[H];n.bindRenderbuffer(n.RENDERBUFFER,W),n.framebufferRenderbuffer(n.FRAMEBUFFER,Q,n.RENDERBUFFER,W)}}else{const H=b.texture.mipmaps;if(H&&H.length>0?t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=n.createRenderbuffer(),we(_.__webglDepthbuffer,b,!1);else{const Q=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,W=_.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,W),n.framebufferRenderbuffer(n.FRAMEBUFFER,Q,n.RENDERBUFFER,W)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function st(b,_,F){const H=i.get(b);_!==void 0&&ve(H.__webglFramebuffer,b,b.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),F!==void 0&&We(b)}function A(b){const _=b.texture,F=i.get(b),H=i.get(_);b.addEventListener("dispose",P);const Q=b.textures,W=b.isWebGLCubeRenderTarget===!0,Re=Q.length>1;if(Re||(H.__webglTexture===void 0&&(H.__webglTexture=n.createTexture()),H.__version=_.version,o.memory.textures++),W){F.__webglFramebuffer=[];for(let ae=0;ae<6;ae++)if(_.mipmaps&&_.mipmaps.length>0){F.__webglFramebuffer[ae]=[];for(let be=0;be<_.mipmaps.length;be++)F.__webglFramebuffer[ae][be]=n.createFramebuffer()}else F.__webglFramebuffer[ae]=n.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){F.__webglFramebuffer=[];for(let ae=0;ae<_.mipmaps.length;ae++)F.__webglFramebuffer[ae]=n.createFramebuffer()}else F.__webglFramebuffer=n.createFramebuffer();if(Re)for(let ae=0,be=Q.length;ae<be;ae++){const Te=i.get(Q[ae]);Te.__webglTexture===void 0&&(Te.__webglTexture=n.createTexture(),o.memory.textures++)}if(b.samples>0&&ne(b)===!1){F.__webglMultisampledFramebuffer=n.createFramebuffer(),F.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let ae=0;ae<Q.length;ae++){const be=Q[ae];F.__webglColorRenderbuffer[ae]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,F.__webglColorRenderbuffer[ae]);const Te=s.convert(be.format,be.colorSpace),ie=s.convert(be.type),ge=E(be.internalFormat,Te,ie,be.colorSpace,b.isXRRenderTarget===!0),Ie=ce(b);n.renderbufferStorageMultisample(n.RENDERBUFFER,Ie,ge,b.width,b.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ae,n.RENDERBUFFER,F.__webglColorRenderbuffer[ae])}n.bindRenderbuffer(n.RENDERBUFFER,null),b.depthBuffer&&(F.__webglDepthRenderbuffer=n.createRenderbuffer(),we(F.__webglDepthRenderbuffer,b,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(W){t.bindTexture(n.TEXTURE_CUBE_MAP,H.__webglTexture),ze(n.TEXTURE_CUBE_MAP,_);for(let ae=0;ae<6;ae++)if(_.mipmaps&&_.mipmaps.length>0)for(let be=0;be<_.mipmaps.length;be++)ve(F.__webglFramebuffer[ae][be],b,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,be);else ve(F.__webglFramebuffer[ae],b,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0);m(_)&&p(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Re){for(let ae=0,be=Q.length;ae<be;ae++){const Te=Q[ae],ie=i.get(Te);let ge=n.TEXTURE_2D;(b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(ge=b.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ge,ie.__webglTexture),ze(ge,Te),ve(F.__webglFramebuffer,b,Te,n.COLOR_ATTACHMENT0+ae,ge,0),m(Te)&&p(ge)}t.unbindTexture()}else{let ae=n.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(ae=b.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ae,H.__webglTexture),ze(ae,_),_.mipmaps&&_.mipmaps.length>0)for(let be=0;be<_.mipmaps.length;be++)ve(F.__webglFramebuffer[be],b,_,n.COLOR_ATTACHMENT0,ae,be);else ve(F.__webglFramebuffer,b,_,n.COLOR_ATTACHMENT0,ae,0);m(_)&&p(ae),t.unbindTexture()}b.depthBuffer&&We(b)}function ee(b){const _=b.textures;for(let F=0,H=_.length;F<H;F++){const Q=_[F];if(m(Q)){const W=T(b),Re=i.get(Q).__webglTexture;t.bindTexture(W,Re),p(W),t.unbindTexture()}}}const K=[],J=[];function Z(b){if(b.samples>0){if(ne(b)===!1){const _=b.textures,F=b.width,H=b.height;let Q=n.COLOR_BUFFER_BIT;const W=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Re=i.get(b),ae=_.length>1;if(ae)for(let Te=0;Te<_.length;Te++)t.bindFramebuffer(n.FRAMEBUFFER,Re.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Te,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,Re.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Te,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,Re.__webglMultisampledFramebuffer);const be=b.texture.mipmaps;be&&be.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Re.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Re.__webglFramebuffer);for(let Te=0;Te<_.length;Te++){if(b.resolveDepthBuffer&&(b.depthBuffer&&(Q|=n.DEPTH_BUFFER_BIT),b.stencilBuffer&&b.resolveStencilBuffer&&(Q|=n.STENCIL_BUFFER_BIT)),ae){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Re.__webglColorRenderbuffer[Te]);const ie=i.get(_[Te]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,ie,0)}n.blitFramebuffer(0,0,F,H,0,0,F,H,Q,n.NEAREST),l===!0&&(K.length=0,J.length=0,K.push(n.COLOR_ATTACHMENT0+Te),b.depthBuffer&&b.resolveDepthBuffer===!1&&(K.push(W),J.push(W),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,J)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,K))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ae)for(let Te=0;Te<_.length;Te++){t.bindFramebuffer(n.FRAMEBUFFER,Re.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Te,n.RENDERBUFFER,Re.__webglColorRenderbuffer[Te]);const ie=i.get(_[Te]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,Re.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Te,n.TEXTURE_2D,ie,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Re.__webglMultisampledFramebuffer)}else if(b.depthBuffer&&b.resolveDepthBuffer===!1&&l){const _=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[_])}}}function ce(b){return Math.min(r.maxSamples,b.samples)}function ne(b){const _=i.get(b);return b.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function ue(b){const _=o.render.frame;u.get(b)!==_&&(u.set(b,_),b.update())}function Fe(b,_){const F=b.colorSpace,H=b.format,Q=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||F!==vi&&F!==fn&&(Ke.getTransfer(F)===tt?(H!==qt||Q!==nn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",F)),_}function Ne(b){return typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement?(c.width=b.naturalWidth||b.width,c.height=b.naturalHeight||b.height):typeof VideoFrame<"u"&&b instanceof VideoFrame?(c.width=b.displayWidth,c.height=b.displayHeight):(c.width=b.width,c.height=b.height),c}this.allocateTextureUnit=k,this.resetTextureUnits=O,this.setTexture2D=V,this.setTexture2DArray=X,this.setTexture3D=j,this.setTextureCube=G,this.rebindTextures=st,this.setupRenderTarget=A,this.updateRenderTargetMipmap=ee,this.updateMultisampleRenderTarget=Z,this.setupDepthRenderbuffer=We,this.setupFrameBufferTexture=ve,this.useMultisampledRTT=ne}function a0(n,e){function t(i,r=fn){let s;const o=Ke.getTransfer(r);if(i===nn)return n.UNSIGNED_BYTE;if(i===yo)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Eo)return n.UNSIGNED_SHORT_5_5_5_1;if(i===xl)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===vl)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===gl)return n.BYTE;if(i===_l)return n.SHORT;if(i===zi)return n.UNSIGNED_SHORT;if(i===So)return n.INT;if(i===Xn)return n.UNSIGNED_INT;if(i===dn)return n.FLOAT;if(i===Zi)return n.HALF_FLOAT;if(i===Ml)return n.ALPHA;if(i===Sl)return n.RGB;if(i===qt)return n.RGBA;if(i===Hi)return n.DEPTH_COMPONENT;if(i===Vi)return n.DEPTH_STENCIL;if(i===yl)return n.RED;if(i===bo)return n.RED_INTEGER;if(i===El)return n.RG;if(i===To)return n.RG_INTEGER;if(i===Ao)return n.RGBA_INTEGER;if(i===Ar||i===Rr||i===Cr||i===wr)if(o===tt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Ar)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Rr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Cr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===wr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Ar)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Rr)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Cr)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===wr)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Vs||i===Gs||i===Ws||i===Xs)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Vs)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Gs)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Ws)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Xs)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===qs||i===Ys||i===Zs)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===qs||i===Ys)return o===tt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Zs)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Js||i===Ks||i===$s||i===js||i===Qs||i===eo||i===to||i===no||i===io||i===ro||i===so||i===oo||i===ao||i===lo)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Js)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Ks)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===$s)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===js)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Qs)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===eo)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===to)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===no)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===io)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===ro)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===so)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===oo)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===ao)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===lo)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===co||i===uo||i===ho)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===co)return o===tt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===uo)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===ho)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===fo||i===po||i===mo||i===go)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===fo)return s.COMPRESSED_RED_RGTC1_EXT;if(i===po)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===mo)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===go)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===ki?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const l0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,c0=`
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

}`;class u0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new Ol(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new wn({vertexShader:l0,fragmentShader:c0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new tn(new gn(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class h0 extends yi{constructor(e,t){super();const i=this;let r=null,s=1,o=null,a="local-floor",l=1,c=null,u=null,h=null,f=null,d=null,g=null;const x=typeof XRWebGLBinding<"u",m=new u0,p={},T=t.getContextAttributes();let E=null,v=null;const C=[],R=[],P=new le;let I=null;const y=new Ft;y.viewport=new nt;const S=new Ft;S.viewport=new nt;const L=[y,S],O=new Lh;let k=null,q=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let te=C[Y];return te===void 0&&(te=new us,C[Y]=te),te.getTargetRaySpace()},this.getControllerGrip=function(Y){let te=C[Y];return te===void 0&&(te=new us,C[Y]=te),te.getGripSpace()},this.getHand=function(Y){let te=C[Y];return te===void 0&&(te=new us,C[Y]=te),te.getHandSpace()};function V(Y){const te=R.indexOf(Y.inputSource);if(te===-1)return;const ve=C[te];ve!==void 0&&(ve.update(Y.inputSource,Y.frame,c||o),ve.dispatchEvent({type:Y.type,data:Y.inputSource}))}function X(){r.removeEventListener("select",V),r.removeEventListener("selectstart",V),r.removeEventListener("selectend",V),r.removeEventListener("squeeze",V),r.removeEventListener("squeezestart",V),r.removeEventListener("squeezeend",V),r.removeEventListener("end",X),r.removeEventListener("inputsourceschange",j);for(let Y=0;Y<C.length;Y++){const te=R[Y];te!==null&&(R[Y]=null,C[Y].disconnect(te))}k=null,q=null,m.reset();for(const Y in p)delete p[Y];e.setRenderTarget(E),d=null,f=null,h=null,r=null,v=null,Ze.stop(),i.isPresenting=!1,e.setPixelRatio(I),e.setSize(P.width,P.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){s=Y,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){a=Y,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(Y){c=Y},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return h===null&&x&&(h=new XRWebGLBinding(r,t)),h},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(Y){if(r=Y,r!==null){if(E=e.getRenderTarget(),r.addEventListener("select",V),r.addEventListener("selectstart",V),r.addEventListener("selectend",V),r.addEventListener("squeeze",V),r.addEventListener("squeezestart",V),r.addEventListener("squeezeend",V),r.addEventListener("end",X),r.addEventListener("inputsourceschange",j),T.xrCompatible!==!0&&await t.makeXRCompatible(),I=e.getPixelRatio(),e.getSize(P),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let ve=null,we=null,Ee=null;T.depth&&(Ee=T.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ve=T.stencil?Vi:Hi,we=T.stencil?ki:Xn);const We={colorFormat:t.RGBA8,depthFormat:Ee,scaleFactor:s};h=this.getBinding(),f=h.createProjectionLayer(We),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),v=new qn(f.textureWidth,f.textureHeight,{format:qt,type:nn,depthTexture:new Fl(f.textureWidth,f.textureHeight,we,void 0,void 0,void 0,void 0,void 0,void 0,ve),stencilBuffer:T.stencil,colorSpace:e.outputColorSpace,samples:T.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const ve={antialias:T.antialias,alpha:!0,depth:T.depth,stencil:T.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(r,t,ve),r.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),v=new qn(d.framebufferWidth,d.framebufferHeight,{format:qt,type:nn,colorSpace:e.outputColorSpace,stencilBuffer:T.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),Ze.setContext(r),Ze.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function j(Y){for(let te=0;te<Y.removed.length;te++){const ve=Y.removed[te],we=R.indexOf(ve);we>=0&&(R[we]=null,C[we].disconnect(ve))}for(let te=0;te<Y.added.length;te++){const ve=Y.added[te];let we=R.indexOf(ve);if(we===-1){for(let We=0;We<C.length;We++)if(We>=R.length){R.push(ve),we=We;break}else if(R[We]===null){R[We]=ve,we=We;break}if(we===-1)break}const Ee=C[we];Ee&&Ee.connect(ve)}}const G=new w,he=new w;function _e(Y,te,ve){G.setFromMatrixPosition(te.matrixWorld),he.setFromMatrixPosition(ve.matrixWorld);const we=G.distanceTo(he),Ee=te.projectionMatrix.elements,We=ve.projectionMatrix.elements,st=Ee[14]/(Ee[10]-1),A=Ee[14]/(Ee[10]+1),ee=(Ee[9]+1)/Ee[5],K=(Ee[9]-1)/Ee[5],J=(Ee[8]-1)/Ee[0],Z=(We[8]+1)/We[0],ce=st*J,ne=st*Z,ue=we/(-J+Z),Fe=ue*-J;if(te.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(Fe),Y.translateZ(ue),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),Ee[10]===-1)Y.projectionMatrix.copy(te.projectionMatrix),Y.projectionMatrixInverse.copy(te.projectionMatrixInverse);else{const Ne=st+ue,b=A+ue,_=ce-Fe,F=ne+(we-Fe),H=ee*A/b*Ne,Q=K*A/b*Ne;Y.projectionMatrix.makePerspective(_,F,H,Q,Ne,b),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function Me(Y,te){te===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(te.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(r===null)return;let te=Y.near,ve=Y.far;m.texture!==null&&(m.depthNear>0&&(te=m.depthNear),m.depthFar>0&&(ve=m.depthFar)),O.near=S.near=y.near=te,O.far=S.far=y.far=ve,(k!==O.near||q!==O.far)&&(r.updateRenderState({depthNear:O.near,depthFar:O.far}),k=O.near,q=O.far),O.layers.mask=Y.layers.mask|6,y.layers.mask=O.layers.mask&3,S.layers.mask=O.layers.mask&5;const we=Y.parent,Ee=O.cameras;Me(O,we);for(let We=0;We<Ee.length;We++)Me(Ee[We],we);Ee.length===2?_e(O,y,S):O.projectionMatrix.copy(y.projectionMatrix),ze(Y,O,we)};function ze(Y,te,ve){ve===null?Y.matrix.copy(te.matrixWorld):(Y.matrix.copy(ve.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(te.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(te.projectionMatrix),Y.projectionMatrixInverse.copy(te.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=Gi*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(!(f===null&&d===null))return l},this.setFoveation=function(Y){l=Y,f!==null&&(f.fixedFoveation=Y),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=Y)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(O)},this.getCameraTexture=function(Y){return p[Y]};let Ye=null;function Qe(Y,te){if(u=te.getViewerPose(c||o),g=te,u!==null){const ve=u.views;d!==null&&(e.setRenderTargetFramebuffer(v,d.framebuffer),e.setRenderTarget(v));let we=!1;ve.length!==O.cameras.length&&(O.cameras.length=0,we=!0);for(let A=0;A<ve.length;A++){const ee=ve[A];let K=null;if(d!==null)K=d.getViewport(ee);else{const Z=h.getViewSubImage(f,ee);K=Z.viewport,A===0&&(e.setRenderTargetTextures(v,Z.colorTexture,Z.depthStencilTexture),e.setRenderTarget(v))}let J=L[A];J===void 0&&(J=new Ft,J.layers.enable(A),J.viewport=new nt,L[A]=J),J.matrix.fromArray(ee.transform.matrix),J.matrix.decompose(J.position,J.quaternion,J.scale),J.projectionMatrix.fromArray(ee.projectionMatrix),J.projectionMatrixInverse.copy(J.projectionMatrix).invert(),J.viewport.set(K.x,K.y,K.width,K.height),A===0&&(O.matrix.copy(J.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),we===!0&&O.cameras.push(J)}const Ee=r.enabledFeatures;if(Ee&&Ee.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&x){h=i.getBinding();const A=h.getDepthInformation(ve[0]);A&&A.isValid&&A.texture&&m.init(A,r.renderState)}if(Ee&&Ee.includes("camera-access")&&x){e.state.unbindTexture(),h=i.getBinding();for(let A=0;A<ve.length;A++){const ee=ve[A].camera;if(ee){let K=p[ee];K||(K=new Ol,p[ee]=K);const J=h.getCameraImage(ee);K.sourceTexture=J}}}}for(let ve=0;ve<C.length;ve++){const we=R[ve],Ee=C[ve];we!==null&&Ee!==void 0&&Ee.update(we,te,c||o)}Ye&&Ye(Y,te),te.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:te}),g=null}const Ze=new $l;Ze.setAnimationLoop(Qe),this.setAnimationLoop=function(Y){Ye=Y},this.dispose=function(){}}}const On=new Ht,f0=new at;function d0(n,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,Dl(n)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function r(m,p,T,E,v){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(m,p):p.isMeshToonMaterial?(s(m,p),h(m,p)):p.isMeshPhongMaterial?(s(m,p),u(m,p)):p.isMeshStandardMaterial?(s(m,p),f(m,p),p.isMeshPhysicalMaterial&&d(m,p,v)):p.isMeshMatcapMaterial?(s(m,p),g(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),x(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,T,E):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Lt&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Lt&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const T=e.get(p),E=T.envMap,v=T.envMapRotation;E&&(m.envMap.value=E,On.copy(v),On.x*=-1,On.y*=-1,On.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(On.y*=-1,On.z*=-1),m.envMapRotation.value.setFromMatrix4(f0.makeRotationFromEuler(On)),m.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,T,E){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*T,m.scale.value=E*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function h(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,T){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Lt&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=T.texture,m.transmissionSamplerSize.value.set(T.width,T.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function x(m,p){const T=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(T.matrixWorld),m.nearDistance.value=T.shadow.camera.near,m.farDistance.value=T.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function p0(n,e,t,i){let r={},s={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(T,E){const v=E.program;i.uniformBlockBinding(T,v)}function c(T,E){let v=r[T.id];v===void 0&&(g(T),v=u(T),r[T.id]=v,T.addEventListener("dispose",m));const C=E.program;i.updateUBOMapping(T,C);const R=e.render.frame;s[T.id]!==R&&(f(T),s[T.id]=R)}function u(T){const E=h();T.__bindingPointIndex=E;const v=n.createBuffer(),C=T.__size,R=T.usage;return n.bindBuffer(n.UNIFORM_BUFFER,v),n.bufferData(n.UNIFORM_BUFFER,C,R),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,E,v),v}function h(){for(let T=0;T<a;T++)if(o.indexOf(T)===-1)return o.push(T),T;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(T){const E=r[T.id],v=T.uniforms,C=T.__cache;n.bindBuffer(n.UNIFORM_BUFFER,E);for(let R=0,P=v.length;R<P;R++){const I=Array.isArray(v[R])?v[R]:[v[R]];for(let y=0,S=I.length;y<S;y++){const L=I[y];if(d(L,R,y,C)===!0){const O=L.__offset,k=Array.isArray(L.value)?L.value:[L.value];let q=0;for(let V=0;V<k.length;V++){const X=k[V],j=x(X);typeof X=="number"||typeof X=="boolean"?(L.__data[0]=X,n.bufferSubData(n.UNIFORM_BUFFER,O+q,L.__data)):X.isMatrix3?(L.__data[0]=X.elements[0],L.__data[1]=X.elements[1],L.__data[2]=X.elements[2],L.__data[3]=0,L.__data[4]=X.elements[3],L.__data[5]=X.elements[4],L.__data[6]=X.elements[5],L.__data[7]=0,L.__data[8]=X.elements[6],L.__data[9]=X.elements[7],L.__data[10]=X.elements[8],L.__data[11]=0):(X.toArray(L.__data,q),q+=j.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,O,L.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function d(T,E,v,C){const R=T.value,P=E+"_"+v;if(C[P]===void 0)return typeof R=="number"||typeof R=="boolean"?C[P]=R:C[P]=R.clone(),!0;{const I=C[P];if(typeof R=="number"||typeof R=="boolean"){if(I!==R)return C[P]=R,!0}else if(I.equals(R)===!1)return I.copy(R),!0}return!1}function g(T){const E=T.uniforms;let v=0;const C=16;for(let P=0,I=E.length;P<I;P++){const y=Array.isArray(E[P])?E[P]:[E[P]];for(let S=0,L=y.length;S<L;S++){const O=y[S],k=Array.isArray(O.value)?O.value:[O.value];for(let q=0,V=k.length;q<V;q++){const X=k[q],j=x(X),G=v%C,he=G%j.boundary,_e=G+he;v+=he,_e!==0&&C-_e<j.storage&&(v+=C-_e),O.__data=new Float32Array(j.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=v,v+=j.storage}}}const R=v%C;return R>0&&(v+=C-R),T.__size=v,T.__cache={},this}function x(T){const E={boundary:0,storage:0};return typeof T=="number"||typeof T=="boolean"?(E.boundary=4,E.storage=4):T.isVector2?(E.boundary=8,E.storage=8):T.isVector3||T.isColor?(E.boundary=16,E.storage=12):T.isVector4?(E.boundary=16,E.storage=16):T.isMatrix3?(E.boundary=48,E.storage=48):T.isMatrix4?(E.boundary=64,E.storage=64):T.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",T),E}function m(T){const E=T.target;E.removeEventListener("dispose",m);const v=o.indexOf(E.__bindingPointIndex);o.splice(v,1),n.deleteBuffer(r[E.id]),delete r[E.id],delete s[E.id]}function p(){for(const T in r)n.deleteBuffer(r[T]);o=[],r={},s={}}return{bind:l,update:c,dispose:p}}class m0{constructor(e={}){const{canvas:t=gu(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let d;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=i.getContextAttributes().alpha}else d=o;const g=new Uint32Array(4),x=new Int32Array(4);let m=null,p=null;const T=[],E=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Tn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const v=this;let C=!1;this._outputColorSpace=wt;let R=0,P=0,I=null,y=-1,S=null;const L=new nt,O=new nt;let k=null;const q=new qe(0);let V=0,X=t.width,j=t.height,G=1,he=null,_e=null;const Me=new nt(0,0,X,j),ze=new nt(0,0,X,j);let Ye=!1;const Qe=new Lo;let Ze=!1,Y=!1;const te=new at,ve=new w,we=new nt,Ee={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let We=!1;function st(){return I===null?G:1}let A=i;function ee(M,U){return t.getContext(M,U)}try{const M={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Mo}`),t.addEventListener("webglcontextlost",fe,!1),t.addEventListener("webglcontextrestored",Se,!1),t.addEventListener("webglcontextcreationerror",re,!1),A===null){const U="webgl2";if(A=ee(U,M),A===null)throw ee(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(M){throw console.error("THREE.WebGLRenderer: "+M.message),M}let K,J,Z,ce,ne,ue,Fe,Ne,b,_,F,H,Q,W,Re,ae,be,Te,ie,ge,Ie,Ce,pe,ke;function D(){K=new Tp(A),K.init(),Ce=new a0(A,K),J=new xp(A,K,e,Ce),Z=new s0(A,K),J.reversedDepthBuffer&&f&&Z.buffers.depth.setReversed(!0),ce=new Cp(A),ne=new qm,ue=new o0(A,K,Z,ne,J,Ce,ce),Fe=new Mp(v),Ne=new bp(v),b=new Ih(A),pe=new gp(A,b),_=new Ap(A,b,ce,pe),F=new Pp(A,_,b,ce),ie=new wp(A,J,ue),ae=new vp(ne),H=new Xm(v,Fe,Ne,K,J,pe,ae),Q=new d0(v,ne),W=new Zm,Re=new e0(K),Te=new mp(v,Fe,Ne,Z,F,d,l),be=new i0(v,F,J),ke=new p0(A,ce,J,Z),ge=new _p(A,K,ce),Ie=new Rp(A,K,ce),ce.programs=H.programs,v.capabilities=J,v.extensions=K,v.properties=ne,v.renderLists=W,v.shadowMap=be,v.state=Z,v.info=ce}D();const oe=new h0(v,A);this.xr=oe,this.getContext=function(){return A},this.getContextAttributes=function(){return A.getContextAttributes()},this.forceContextLoss=function(){const M=K.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){const M=K.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(M){M!==void 0&&(G=M,this.setSize(X,j,!1))},this.getSize=function(M){return M.set(X,j)},this.setSize=function(M,U,B=!0){if(oe.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}X=M,j=U,t.width=Math.floor(M*G),t.height=Math.floor(U*G),B===!0&&(t.style.width=M+"px",t.style.height=U+"px"),this.setViewport(0,0,M,U)},this.getDrawingBufferSize=function(M){return M.set(X*G,j*G).floor()},this.setDrawingBufferSize=function(M,U,B){X=M,j=U,G=B,t.width=Math.floor(M*B),t.height=Math.floor(U*B),this.setViewport(0,0,M,U)},this.getCurrentViewport=function(M){return M.copy(L)},this.getViewport=function(M){return M.copy(Me)},this.setViewport=function(M,U,B,z){M.isVector4?Me.set(M.x,M.y,M.z,M.w):Me.set(M,U,B,z),Z.viewport(L.copy(Me).multiplyScalar(G).round())},this.getScissor=function(M){return M.copy(ze)},this.setScissor=function(M,U,B,z){M.isVector4?ze.set(M.x,M.y,M.z,M.w):ze.set(M,U,B,z),Z.scissor(O.copy(ze).multiplyScalar(G).round())},this.getScissorTest=function(){return Ye},this.setScissorTest=function(M){Z.setScissorTest(Ye=M)},this.setOpaqueSort=function(M){he=M},this.setTransparentSort=function(M){_e=M},this.getClearColor=function(M){return M.copy(Te.getClearColor())},this.setClearColor=function(){Te.setClearColor(...arguments)},this.getClearAlpha=function(){return Te.getClearAlpha()},this.setClearAlpha=function(){Te.setClearAlpha(...arguments)},this.clear=function(M=!0,U=!0,B=!0){let z=0;if(M){let N=!1;if(I!==null){const se=I.texture.format;N=se===Ao||se===To||se===bo}if(N){const se=I.texture.type,me=se===nn||se===Xn||se===zi||se===ki||se===yo||se===Eo,ye=Te.getClearColor(),xe=Te.getClearAlpha(),De=ye.r,Ue=ye.g,Pe=ye.b;me?(g[0]=De,g[1]=Ue,g[2]=Pe,g[3]=xe,A.clearBufferuiv(A.COLOR,0,g)):(x[0]=De,x[1]=Ue,x[2]=Pe,x[3]=xe,A.clearBufferiv(A.COLOR,0,x))}else z|=A.COLOR_BUFFER_BIT}U&&(z|=A.DEPTH_BUFFER_BIT),B&&(z|=A.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),A.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",fe,!1),t.removeEventListener("webglcontextrestored",Se,!1),t.removeEventListener("webglcontextcreationerror",re,!1),Te.dispose(),W.dispose(),Re.dispose(),ne.dispose(),Fe.dispose(),Ne.dispose(),F.dispose(),pe.dispose(),ke.dispose(),H.dispose(),oe.dispose(),oe.removeEventListener("sessionstart",$t),oe.removeEventListener("sessionend",Wo),Pn.stop()};function fe(M){M.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function Se(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;const M=ce.autoReset,U=be.enabled,B=be.autoUpdate,z=be.needsUpdate,N=be.type;D(),ce.autoReset=M,be.enabled=U,be.autoUpdate=B,be.needsUpdate=z,be.type=N}function re(M){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function $(M){const U=M.target;U.removeEventListener("dispose",$),Ae(U)}function Ae(M){Oe(M),ne.remove(M)}function Oe(M){const U=ne.get(M).programs;U!==void 0&&(U.forEach(function(B){H.releaseProgram(B)}),M.isShaderMaterial&&H.releaseShaderCache(M))}this.renderBufferDirect=function(M,U,B,z,N,se){U===null&&(U=Ee);const me=N.isMesh&&N.matrixWorld.determinant()<0,ye=lc(M,U,B,z,N);Z.setMaterial(z,me);let xe=B.index,De=1;if(z.wireframe===!0){if(xe=_.getWireframeAttribute(B),xe===void 0)return;De=2}const Ue=B.drawRange,Pe=B.attributes.position;let Xe=Ue.start*De,et=(Ue.start+Ue.count)*De;se!==null&&(Xe=Math.max(Xe,se.start*De),et=Math.min(et,(se.start+se.count)*De)),xe!==null?(Xe=Math.max(Xe,0),et=Math.min(et,xe.count)):Pe!=null&&(Xe=Math.max(Xe,0),et=Math.min(et,Pe.count));const dt=et-Xe;if(dt<0||dt===1/0)return;pe.setup(N,z,ye,B,xe);let lt,rt=ge;if(xe!==null&&(lt=b.get(xe),rt=Ie,rt.setIndex(lt)),N.isMesh)z.wireframe===!0?(Z.setLineWidth(z.wireframeLinewidth*st()),rt.setMode(A.LINES)):rt.setMode(A.TRIANGLES);else if(N.isLine){let Le=z.linewidth;Le===void 0&&(Le=1),Z.setLineWidth(Le*st()),N.isLineSegments?rt.setMode(A.LINES):N.isLineLoop?rt.setMode(A.LINE_LOOP):rt.setMode(A.LINE_STRIP)}else N.isPoints?rt.setMode(A.POINTS):N.isSprite&&rt.setMode(A.TRIANGLES);if(N.isBatchedMesh)if(N._multiDrawInstances!==null)Wi("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),rt.renderMultiDrawInstances(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount,N._multiDrawInstances);else if(K.get("WEBGL_multi_draw"))rt.renderMultiDraw(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount);else{const Le=N._multiDrawStarts,ut=N._multiDrawCounts,Je=N._multiDrawCount,Dt=xe?b.get(xe).bytesPerElement:1,Kn=ne.get(z).currentProgram.getUniforms();for(let It=0;It<Je;It++)Kn.setValue(A,"_gl_DrawID",It),rt.render(Le[It]/Dt,ut[It])}else if(N.isInstancedMesh)rt.renderInstances(Xe,dt,N.count);else if(B.isInstancedBufferGeometry){const Le=B._maxInstanceCount!==void 0?B._maxInstanceCount:1/0,ut=Math.min(B.instanceCount,Le);rt.renderInstances(Xe,dt,ut)}else rt.render(Xe,dt)};function ot(M,U,B){M.transparent===!0&&M.side===Pt&&M.forceSinglePass===!1?(M.side=Lt,M.needsUpdate=!0,ji(M,U,B),M.side=Cn,M.needsUpdate=!0,ji(M,U,B),M.side=Pt):ji(M,U,B)}this.compile=function(M,U,B=null){B===null&&(B=M),p=Re.get(B),p.init(U),E.push(p),B.traverseVisible(function(N){N.isLight&&N.layers.test(U.layers)&&(p.pushLight(N),N.castShadow&&p.pushShadow(N))}),M!==B&&M.traverseVisible(function(N){N.isLight&&N.layers.test(U.layers)&&(p.pushLight(N),N.castShadow&&p.pushShadow(N))}),p.setupLights();const z=new Set;return M.traverse(function(N){if(!(N.isMesh||N.isPoints||N.isLine||N.isSprite))return;const se=N.material;if(se)if(Array.isArray(se))for(let me=0;me<se.length;me++){const ye=se[me];ot(ye,B,N),z.add(ye)}else ot(se,B,N),z.add(se)}),p=E.pop(),z},this.compileAsync=function(M,U,B=null){const z=this.compile(M,U,B);return new Promise(N=>{function se(){if(z.forEach(function(me){ne.get(me).currentProgram.isReady()&&z.delete(me)}),z.size===0){N(M);return}setTimeout(se,10)}K.get("KHR_parallel_shader_compile")!==null?se():setTimeout(se,10)})};let $e=null;function sn(M){$e&&$e(M)}function $t(){Pn.stop()}function Wo(){Pn.start()}const Pn=new $l;Pn.setAnimationLoop(sn),typeof self<"u"&&Pn.setContext(self),this.setAnimationLoop=function(M){$e=M,oe.setAnimationLoop(M),M===null?Pn.stop():Pn.start()},oe.addEventListener("sessionstart",$t),oe.addEventListener("sessionend",Wo),this.render=function(M,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),oe.enabled===!0&&oe.isPresenting===!0&&(oe.cameraAutoUpdate===!0&&oe.updateCamera(U),U=oe.getCamera()),M.isScene===!0&&M.onBeforeRender(v,M,U,I),p=Re.get(M,E.length),p.init(U),E.push(p),te.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),Qe.setFromProjectionMatrix(te,en,U.reversedDepth),Y=this.localClippingEnabled,Ze=ae.init(this.clippingPlanes,Y),m=W.get(M,T.length),m.init(),T.push(m),oe.enabled===!0&&oe.isPresenting===!0){const se=v.xr.getDepthSensingMesh();se!==null&&Hr(se,U,-1/0,v.sortObjects)}Hr(M,U,0,v.sortObjects),m.finish(),v.sortObjects===!0&&m.sort(he,_e),We=oe.enabled===!1||oe.isPresenting===!1||oe.hasDepthSensing()===!1,We&&Te.addToRenderList(m,M),this.info.render.frame++,Ze===!0&&ae.beginShadows();const B=p.state.shadowsArray;be.render(B,M,U),Ze===!0&&ae.endShadows(),this.info.autoReset===!0&&this.info.reset();const z=m.opaque,N=m.transmissive;if(p.setupLights(),U.isArrayCamera){const se=U.cameras;if(N.length>0)for(let me=0,ye=se.length;me<ye;me++){const xe=se[me];qo(z,N,M,xe)}We&&Te.render(M);for(let me=0,ye=se.length;me<ye;me++){const xe=se[me];Xo(m,M,xe,xe.viewport)}}else N.length>0&&qo(z,N,M,U),We&&Te.render(M),Xo(m,M,U);I!==null&&P===0&&(ue.updateMultisampleRenderTarget(I),ue.updateRenderTargetMipmap(I)),M.isScene===!0&&M.onAfterRender(v,M,U),pe.resetDefaultState(),y=-1,S=null,E.pop(),E.length>0?(p=E[E.length-1],Ze===!0&&ae.setGlobalState(v.clippingPlanes,p.state.camera)):p=null,T.pop(),T.length>0?m=T[T.length-1]:m=null};function Hr(M,U,B,z){if(M.visible===!1)return;if(M.layers.test(U.layers)){if(M.isGroup)B=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(U);else if(M.isLight)p.pushLight(M),M.castShadow&&p.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||Qe.intersectsSprite(M)){z&&we.setFromMatrixPosition(M.matrixWorld).applyMatrix4(te);const me=F.update(M),ye=M.material;ye.visible&&m.push(M,me,ye,B,we.z,null)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||Qe.intersectsObject(M))){const me=F.update(M),ye=M.material;if(z&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),we.copy(M.boundingSphere.center)):(me.boundingSphere===null&&me.computeBoundingSphere(),we.copy(me.boundingSphere.center)),we.applyMatrix4(M.matrixWorld).applyMatrix4(te)),Array.isArray(ye)){const xe=me.groups;for(let De=0,Ue=xe.length;De<Ue;De++){const Pe=xe[De],Xe=ye[Pe.materialIndex];Xe&&Xe.visible&&m.push(M,me,Xe,B,we.z,Pe)}}else ye.visible&&m.push(M,me,ye,B,we.z,null)}}const se=M.children;for(let me=0,ye=se.length;me<ye;me++)Hr(se[me],U,B,z)}function Xo(M,U,B,z){const N=M.opaque,se=M.transmissive,me=M.transparent;p.setupLightsView(B),Ze===!0&&ae.setGlobalState(v.clippingPlanes,B),z&&Z.viewport(L.copy(z)),N.length>0&&$i(N,U,B),se.length>0&&$i(se,U,B),me.length>0&&$i(me,U,B),Z.buffers.depth.setTest(!0),Z.buffers.depth.setMask(!0),Z.buffers.color.setMask(!0),Z.setPolygonOffset(!1)}function qo(M,U,B,z){if((B.isScene===!0?B.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[z.id]===void 0&&(p.state.transmissionRenderTarget[z.id]=new qn(1,1,{generateMipmaps:!0,type:K.has("EXT_color_buffer_half_float")||K.has("EXT_color_buffer_float")?Zi:nn,minFilter:Wn,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ke.workingColorSpace}));const se=p.state.transmissionRenderTarget[z.id],me=z.viewport||L;se.setSize(me.z*v.transmissionResolutionScale,me.w*v.transmissionResolutionScale);const ye=v.getRenderTarget(),xe=v.getActiveCubeFace(),De=v.getActiveMipmapLevel();v.setRenderTarget(se),v.getClearColor(q),V=v.getClearAlpha(),V<1&&v.setClearColor(16777215,.5),v.clear(),We&&Te.render(B);const Ue=v.toneMapping;v.toneMapping=Tn;const Pe=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),p.setupLightsView(z),Ze===!0&&ae.setGlobalState(v.clippingPlanes,z),$i(M,B,z),ue.updateMultisampleRenderTarget(se),ue.updateRenderTargetMipmap(se),K.has("WEBGL_multisampled_render_to_texture")===!1){let Xe=!1;for(let et=0,dt=U.length;et<dt;et++){const lt=U[et],rt=lt.object,Le=lt.geometry,ut=lt.material,Je=lt.group;if(ut.side===Pt&&rt.layers.test(z.layers)){const Dt=ut.side;ut.side=Lt,ut.needsUpdate=!0,Yo(rt,B,z,Le,ut,Je),ut.side=Dt,ut.needsUpdate=!0,Xe=!0}}Xe===!0&&(ue.updateMultisampleRenderTarget(se),ue.updateRenderTargetMipmap(se))}v.setRenderTarget(ye,xe,De),v.setClearColor(q,V),Pe!==void 0&&(z.viewport=Pe),v.toneMapping=Ue}function $i(M,U,B){const z=U.isScene===!0?U.overrideMaterial:null;for(let N=0,se=M.length;N<se;N++){const me=M[N],ye=me.object,xe=me.geometry,De=me.group;let Ue=me.material;Ue.allowOverride===!0&&z!==null&&(Ue=z),ye.layers.test(B.layers)&&Yo(ye,U,B,xe,Ue,De)}}function Yo(M,U,B,z,N,se){M.onBeforeRender(v,U,B,z,N,se),M.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),N.onBeforeRender(v,U,B,z,M,se),N.transparent===!0&&N.side===Pt&&N.forceSinglePass===!1?(N.side=Lt,N.needsUpdate=!0,v.renderBufferDirect(B,U,z,N,M,se),N.side=Cn,N.needsUpdate=!0,v.renderBufferDirect(B,U,z,N,M,se),N.side=Pt):v.renderBufferDirect(B,U,z,N,M,se),M.onAfterRender(v,U,B,z,N,se)}function ji(M,U,B){U.isScene!==!0&&(U=Ee);const z=ne.get(M),N=p.state.lights,se=p.state.shadowsArray,me=N.state.version,ye=H.getParameters(M,N.state,se,U,B),xe=H.getProgramCacheKey(ye);let De=z.programs;z.environment=M.isMeshStandardMaterial?U.environment:null,z.fog=U.fog,z.envMap=(M.isMeshStandardMaterial?Ne:Fe).get(M.envMap||z.environment),z.envMapRotation=z.environment!==null&&M.envMap===null?U.environmentRotation:M.envMapRotation,De===void 0&&(M.addEventListener("dispose",$),De=new Map,z.programs=De);let Ue=De.get(xe);if(Ue!==void 0){if(z.currentProgram===Ue&&z.lightsStateVersion===me)return Jo(M,ye),Ue}else ye.uniforms=H.getUniforms(M),M.onBeforeCompile(ye,v),Ue=H.acquireProgram(ye,xe),De.set(xe,Ue),z.uniforms=ye.uniforms;const Pe=z.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(Pe.clippingPlanes=ae.uniform),Jo(M,ye),z.needsLights=uc(M),z.lightsStateVersion=me,z.needsLights&&(Pe.ambientLightColor.value=N.state.ambient,Pe.lightProbe.value=N.state.probe,Pe.directionalLights.value=N.state.directional,Pe.directionalLightShadows.value=N.state.directionalShadow,Pe.spotLights.value=N.state.spot,Pe.spotLightShadows.value=N.state.spotShadow,Pe.rectAreaLights.value=N.state.rectArea,Pe.ltc_1.value=N.state.rectAreaLTC1,Pe.ltc_2.value=N.state.rectAreaLTC2,Pe.pointLights.value=N.state.point,Pe.pointLightShadows.value=N.state.pointShadow,Pe.hemisphereLights.value=N.state.hemi,Pe.directionalShadowMap.value=N.state.directionalShadowMap,Pe.directionalShadowMatrix.value=N.state.directionalShadowMatrix,Pe.spotShadowMap.value=N.state.spotShadowMap,Pe.spotLightMatrix.value=N.state.spotLightMatrix,Pe.spotLightMap.value=N.state.spotLightMap,Pe.pointShadowMap.value=N.state.pointShadowMap,Pe.pointShadowMatrix.value=N.state.pointShadowMatrix),z.currentProgram=Ue,z.uniformsList=null,Ue}function Zo(M){if(M.uniformsList===null){const U=M.currentProgram.getUniforms();M.uniformsList=Pr.seqWithValue(U.seq,M.uniforms)}return M.uniformsList}function Jo(M,U){const B=ne.get(M);B.outputColorSpace=U.outputColorSpace,B.batching=U.batching,B.batchingColor=U.batchingColor,B.instancing=U.instancing,B.instancingColor=U.instancingColor,B.instancingMorph=U.instancingMorph,B.skinning=U.skinning,B.morphTargets=U.morphTargets,B.morphNormals=U.morphNormals,B.morphColors=U.morphColors,B.morphTargetsCount=U.morphTargetsCount,B.numClippingPlanes=U.numClippingPlanes,B.numIntersection=U.numClipIntersection,B.vertexAlphas=U.vertexAlphas,B.vertexTangents=U.vertexTangents,B.toneMapping=U.toneMapping}function lc(M,U,B,z,N){U.isScene!==!0&&(U=Ee),ue.resetTextureUnits();const se=U.fog,me=z.isMeshStandardMaterial?U.environment:null,ye=I===null?v.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:vi,xe=(z.isMeshStandardMaterial?Ne:Fe).get(z.envMap||me),De=z.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,Ue=!!B.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),Pe=!!B.morphAttributes.position,Xe=!!B.morphAttributes.normal,et=!!B.morphAttributes.color;let dt=Tn;z.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(dt=v.toneMapping);const lt=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,rt=lt!==void 0?lt.length:0,Le=ne.get(z),ut=p.state.lights;if(Ze===!0&&(Y===!0||M!==S)){const Et=M===S&&z.id===y;ae.setState(z,M,Et)}let Je=!1;z.version===Le.__version?(Le.needsLights&&Le.lightsStateVersion!==ut.state.version||Le.outputColorSpace!==ye||N.isBatchedMesh&&Le.batching===!1||!N.isBatchedMesh&&Le.batching===!0||N.isBatchedMesh&&Le.batchingColor===!0&&N.colorTexture===null||N.isBatchedMesh&&Le.batchingColor===!1&&N.colorTexture!==null||N.isInstancedMesh&&Le.instancing===!1||!N.isInstancedMesh&&Le.instancing===!0||N.isSkinnedMesh&&Le.skinning===!1||!N.isSkinnedMesh&&Le.skinning===!0||N.isInstancedMesh&&Le.instancingColor===!0&&N.instanceColor===null||N.isInstancedMesh&&Le.instancingColor===!1&&N.instanceColor!==null||N.isInstancedMesh&&Le.instancingMorph===!0&&N.morphTexture===null||N.isInstancedMesh&&Le.instancingMorph===!1&&N.morphTexture!==null||Le.envMap!==xe||z.fog===!0&&Le.fog!==se||Le.numClippingPlanes!==void 0&&(Le.numClippingPlanes!==ae.numPlanes||Le.numIntersection!==ae.numIntersection)||Le.vertexAlphas!==De||Le.vertexTangents!==Ue||Le.morphTargets!==Pe||Le.morphNormals!==Xe||Le.morphColors!==et||Le.toneMapping!==dt||Le.morphTargetsCount!==rt)&&(Je=!0):(Je=!0,Le.__version=z.version);let Dt=Le.currentProgram;Je===!0&&(Dt=ji(z,U,N));let Kn=!1,It=!1,bi=!1;const ht=Dt.getUniforms(),Ot=Le.uniforms;if(Z.useProgram(Dt.program)&&(Kn=!0,It=!0,bi=!0),z.id!==y&&(y=z.id,It=!0),Kn||S!==M){Z.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),ht.setValue(A,"projectionMatrix",M.projectionMatrix),ht.setValue(A,"viewMatrix",M.matrixWorldInverse);const Rt=ht.map.cameraPosition;Rt!==void 0&&Rt.setValue(A,ve.setFromMatrixPosition(M.matrixWorld)),J.logarithmicDepthBuffer&&ht.setValue(A,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&ht.setValue(A,"isOrthographic",M.isOrthographicCamera===!0),S!==M&&(S=M,It=!0,bi=!0)}if(N.isSkinnedMesh){ht.setOptional(A,N,"bindMatrix"),ht.setOptional(A,N,"bindMatrixInverse");const Et=N.skeleton;Et&&(Et.boneTexture===null&&Et.computeBoneTexture(),ht.setValue(A,"boneTexture",Et.boneTexture,ue))}N.isBatchedMesh&&(ht.setOptional(A,N,"batchingTexture"),ht.setValue(A,"batchingTexture",N._matricesTexture,ue),ht.setOptional(A,N,"batchingIdTexture"),ht.setValue(A,"batchingIdTexture",N._indirectTexture,ue),ht.setOptional(A,N,"batchingColorTexture"),N._colorsTexture!==null&&ht.setValue(A,"batchingColorTexture",N._colorsTexture,ue));const Bt=B.morphAttributes;if((Bt.position!==void 0||Bt.normal!==void 0||Bt.color!==void 0)&&ie.update(N,B,Dt),(It||Le.receiveShadow!==N.receiveShadow)&&(Le.receiveShadow=N.receiveShadow,ht.setValue(A,"receiveShadow",N.receiveShadow)),z.isMeshGouraudMaterial&&z.envMap!==null&&(Ot.envMap.value=xe,Ot.flipEnvMap.value=xe.isCubeTexture&&xe.isRenderTargetTexture===!1?-1:1),z.isMeshStandardMaterial&&z.envMap===null&&U.environment!==null&&(Ot.envMapIntensity.value=U.environmentIntensity),It&&(ht.setValue(A,"toneMappingExposure",v.toneMappingExposure),Le.needsLights&&cc(Ot,bi),se&&z.fog===!0&&Q.refreshFogUniforms(Ot,se),Q.refreshMaterialUniforms(Ot,z,G,j,p.state.transmissionRenderTarget[M.id]),Pr.upload(A,Zo(Le),Ot,ue)),z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(Pr.upload(A,Zo(Le),Ot,ue),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&ht.setValue(A,"center",N.center),ht.setValue(A,"modelViewMatrix",N.modelViewMatrix),ht.setValue(A,"normalMatrix",N.normalMatrix),ht.setValue(A,"modelMatrix",N.matrixWorld),z.isShaderMaterial||z.isRawShaderMaterial){const Et=z.uniformsGroups;for(let Rt=0,Vr=Et.length;Rt<Vr;Rt++){const Ln=Et[Rt];ke.update(Ln,Dt),ke.bind(Ln,Dt)}}return Dt}function cc(M,U){M.ambientLightColor.needsUpdate=U,M.lightProbe.needsUpdate=U,M.directionalLights.needsUpdate=U,M.directionalLightShadows.needsUpdate=U,M.pointLights.needsUpdate=U,M.pointLightShadows.needsUpdate=U,M.spotLights.needsUpdate=U,M.spotLightShadows.needsUpdate=U,M.rectAreaLights.needsUpdate=U,M.hemisphereLights.needsUpdate=U}function uc(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return P},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(M,U,B){const z=ne.get(M);z.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,z.__autoAllocateDepthBuffer===!1&&(z.__useRenderToTexture=!1),ne.get(M.texture).__webglTexture=U,ne.get(M.depthTexture).__webglTexture=z.__autoAllocateDepthBuffer?void 0:B,z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,U){const B=ne.get(M);B.__webglFramebuffer=U,B.__useDefaultFramebuffer=U===void 0};const hc=A.createFramebuffer();this.setRenderTarget=function(M,U=0,B=0){I=M,R=U,P=B;let z=!0,N=null,se=!1,me=!1;if(M){const xe=ne.get(M);if(xe.__useDefaultFramebuffer!==void 0)Z.bindFramebuffer(A.FRAMEBUFFER,null),z=!1;else if(xe.__webglFramebuffer===void 0)ue.setupRenderTarget(M);else if(xe.__hasExternalTextures)ue.rebindTextures(M,ne.get(M.texture).__webglTexture,ne.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){const Pe=M.depthTexture;if(xe.__boundDepthTexture!==Pe){if(Pe!==null&&ne.has(Pe)&&(M.width!==Pe.image.width||M.height!==Pe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");ue.setupDepthRenderbuffer(M)}}const De=M.texture;(De.isData3DTexture||De.isDataArrayTexture||De.isCompressedArrayTexture)&&(me=!0);const Ue=ne.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(Ue[U])?N=Ue[U][B]:N=Ue[U],se=!0):M.samples>0&&ue.useMultisampledRTT(M)===!1?N=ne.get(M).__webglMultisampledFramebuffer:Array.isArray(Ue)?N=Ue[B]:N=Ue,L.copy(M.viewport),O.copy(M.scissor),k=M.scissorTest}else L.copy(Me).multiplyScalar(G).floor(),O.copy(ze).multiplyScalar(G).floor(),k=Ye;if(B!==0&&(N=hc),Z.bindFramebuffer(A.FRAMEBUFFER,N)&&z&&Z.drawBuffers(M,N),Z.viewport(L),Z.scissor(O),Z.setScissorTest(k),se){const xe=ne.get(M.texture);A.framebufferTexture2D(A.FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.TEXTURE_CUBE_MAP_POSITIVE_X+U,xe.__webglTexture,B)}else if(me){const xe=U;for(let De=0;De<M.textures.length;De++){const Ue=ne.get(M.textures[De]);A.framebufferTextureLayer(A.FRAMEBUFFER,A.COLOR_ATTACHMENT0+De,Ue.__webglTexture,B,xe)}}else if(M!==null&&B!==0){const xe=ne.get(M.texture);A.framebufferTexture2D(A.FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.TEXTURE_2D,xe.__webglTexture,B)}y=-1},this.readRenderTargetPixels=function(M,U,B,z,N,se,me,ye=0){if(!(M&&M.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let xe=ne.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&me!==void 0&&(xe=xe[me]),xe){Z.bindFramebuffer(A.FRAMEBUFFER,xe);try{const De=M.textures[ye],Ue=De.format,Pe=De.type;if(!J.textureFormatReadable(Ue)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!J.textureTypeReadable(Pe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=M.width-z&&B>=0&&B<=M.height-N&&(M.textures.length>1&&A.readBuffer(A.COLOR_ATTACHMENT0+ye),A.readPixels(U,B,z,N,Ce.convert(Ue),Ce.convert(Pe),se))}finally{const De=I!==null?ne.get(I).__webglFramebuffer:null;Z.bindFramebuffer(A.FRAMEBUFFER,De)}}},this.readRenderTargetPixelsAsync=async function(M,U,B,z,N,se,me,ye=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let xe=ne.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&me!==void 0&&(xe=xe[me]),xe)if(U>=0&&U<=M.width-z&&B>=0&&B<=M.height-N){Z.bindFramebuffer(A.FRAMEBUFFER,xe);const De=M.textures[ye],Ue=De.format,Pe=De.type;if(!J.textureFormatReadable(Ue))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!J.textureTypeReadable(Pe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Xe=A.createBuffer();A.bindBuffer(A.PIXEL_PACK_BUFFER,Xe),A.bufferData(A.PIXEL_PACK_BUFFER,se.byteLength,A.STREAM_READ),M.textures.length>1&&A.readBuffer(A.COLOR_ATTACHMENT0+ye),A.readPixels(U,B,z,N,Ce.convert(Ue),Ce.convert(Pe),0);const et=I!==null?ne.get(I).__webglFramebuffer:null;Z.bindFramebuffer(A.FRAMEBUFFER,et);const dt=A.fenceSync(A.SYNC_GPU_COMMANDS_COMPLETE,0);return A.flush(),await _u(A,dt,4),A.bindBuffer(A.PIXEL_PACK_BUFFER,Xe),A.getBufferSubData(A.PIXEL_PACK_BUFFER,0,se),A.deleteBuffer(Xe),A.deleteSync(dt),se}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,U=null,B=0){const z=Math.pow(2,-B),N=Math.floor(M.image.width*z),se=Math.floor(M.image.height*z),me=U!==null?U.x:0,ye=U!==null?U.y:0;ue.setTexture2D(M,0),A.copyTexSubImage2D(A.TEXTURE_2D,B,0,0,me,ye,N,se),Z.unbindTexture()};const fc=A.createFramebuffer(),dc=A.createFramebuffer();this.copyTextureToTexture=function(M,U,B=null,z=null,N=0,se=null){se===null&&(N!==0?(Wi("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),se=N,N=0):se=0);let me,ye,xe,De,Ue,Pe,Xe,et,dt;const lt=M.isCompressedTexture?M.mipmaps[se]:M.image;if(B!==null)me=B.max.x-B.min.x,ye=B.max.y-B.min.y,xe=B.isBox3?B.max.z-B.min.z:1,De=B.min.x,Ue=B.min.y,Pe=B.isBox3?B.min.z:0;else{const Bt=Math.pow(2,-N);me=Math.floor(lt.width*Bt),ye=Math.floor(lt.height*Bt),M.isDataArrayTexture?xe=lt.depth:M.isData3DTexture?xe=Math.floor(lt.depth*Bt):xe=1,De=0,Ue=0,Pe=0}z!==null?(Xe=z.x,et=z.y,dt=z.z):(Xe=0,et=0,dt=0);const rt=Ce.convert(U.format),Le=Ce.convert(U.type);let ut;U.isData3DTexture?(ue.setTexture3D(U,0),ut=A.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(ue.setTexture2DArray(U,0),ut=A.TEXTURE_2D_ARRAY):(ue.setTexture2D(U,0),ut=A.TEXTURE_2D),A.pixelStorei(A.UNPACK_FLIP_Y_WEBGL,U.flipY),A.pixelStorei(A.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),A.pixelStorei(A.UNPACK_ALIGNMENT,U.unpackAlignment);const Je=A.getParameter(A.UNPACK_ROW_LENGTH),Dt=A.getParameter(A.UNPACK_IMAGE_HEIGHT),Kn=A.getParameter(A.UNPACK_SKIP_PIXELS),It=A.getParameter(A.UNPACK_SKIP_ROWS),bi=A.getParameter(A.UNPACK_SKIP_IMAGES);A.pixelStorei(A.UNPACK_ROW_LENGTH,lt.width),A.pixelStorei(A.UNPACK_IMAGE_HEIGHT,lt.height),A.pixelStorei(A.UNPACK_SKIP_PIXELS,De),A.pixelStorei(A.UNPACK_SKIP_ROWS,Ue),A.pixelStorei(A.UNPACK_SKIP_IMAGES,Pe);const ht=M.isDataArrayTexture||M.isData3DTexture,Ot=U.isDataArrayTexture||U.isData3DTexture;if(M.isDepthTexture){const Bt=ne.get(M),Et=ne.get(U),Rt=ne.get(Bt.__renderTarget),Vr=ne.get(Et.__renderTarget);Z.bindFramebuffer(A.READ_FRAMEBUFFER,Rt.__webglFramebuffer),Z.bindFramebuffer(A.DRAW_FRAMEBUFFER,Vr.__webglFramebuffer);for(let Ln=0;Ln<xe;Ln++)ht&&(A.framebufferTextureLayer(A.READ_FRAMEBUFFER,A.COLOR_ATTACHMENT0,ne.get(M).__webglTexture,N,Pe+Ln),A.framebufferTextureLayer(A.DRAW_FRAMEBUFFER,A.COLOR_ATTACHMENT0,ne.get(U).__webglTexture,se,dt+Ln)),A.blitFramebuffer(De,Ue,me,ye,Xe,et,me,ye,A.DEPTH_BUFFER_BIT,A.NEAREST);Z.bindFramebuffer(A.READ_FRAMEBUFFER,null),Z.bindFramebuffer(A.DRAW_FRAMEBUFFER,null)}else if(N!==0||M.isRenderTargetTexture||ne.has(M)){const Bt=ne.get(M),Et=ne.get(U);Z.bindFramebuffer(A.READ_FRAMEBUFFER,fc),Z.bindFramebuffer(A.DRAW_FRAMEBUFFER,dc);for(let Rt=0;Rt<xe;Rt++)ht?A.framebufferTextureLayer(A.READ_FRAMEBUFFER,A.COLOR_ATTACHMENT0,Bt.__webglTexture,N,Pe+Rt):A.framebufferTexture2D(A.READ_FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.TEXTURE_2D,Bt.__webglTexture,N),Ot?A.framebufferTextureLayer(A.DRAW_FRAMEBUFFER,A.COLOR_ATTACHMENT0,Et.__webglTexture,se,dt+Rt):A.framebufferTexture2D(A.DRAW_FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.TEXTURE_2D,Et.__webglTexture,se),N!==0?A.blitFramebuffer(De,Ue,me,ye,Xe,et,me,ye,A.COLOR_BUFFER_BIT,A.NEAREST):Ot?A.copyTexSubImage3D(ut,se,Xe,et,dt+Rt,De,Ue,me,ye):A.copyTexSubImage2D(ut,se,Xe,et,De,Ue,me,ye);Z.bindFramebuffer(A.READ_FRAMEBUFFER,null),Z.bindFramebuffer(A.DRAW_FRAMEBUFFER,null)}else Ot?M.isDataTexture||M.isData3DTexture?A.texSubImage3D(ut,se,Xe,et,dt,me,ye,xe,rt,Le,lt.data):U.isCompressedArrayTexture?A.compressedTexSubImage3D(ut,se,Xe,et,dt,me,ye,xe,rt,lt.data):A.texSubImage3D(ut,se,Xe,et,dt,me,ye,xe,rt,Le,lt):M.isDataTexture?A.texSubImage2D(A.TEXTURE_2D,se,Xe,et,me,ye,rt,Le,lt.data):M.isCompressedTexture?A.compressedTexSubImage2D(A.TEXTURE_2D,se,Xe,et,lt.width,lt.height,rt,lt.data):A.texSubImage2D(A.TEXTURE_2D,se,Xe,et,me,ye,rt,Le,lt);A.pixelStorei(A.UNPACK_ROW_LENGTH,Je),A.pixelStorei(A.UNPACK_IMAGE_HEIGHT,Dt),A.pixelStorei(A.UNPACK_SKIP_PIXELS,Kn),A.pixelStorei(A.UNPACK_SKIP_ROWS,It),A.pixelStorei(A.UNPACK_SKIP_IMAGES,bi),se===0&&U.generateMipmaps&&A.generateMipmap(ut),Z.unbindTexture()},this.initRenderTarget=function(M){ne.get(M).__webglFramebuffer===void 0&&ue.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?ue.setTextureCube(M,0):M.isData3DTexture?ue.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?ue.setTexture2DArray(M,0):ue.setTexture2D(M,0),Z.unbindTexture()},this.resetState=function(){R=0,P=0,I=null,Z.reset(),pe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return en}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Ke._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ke._getUnpackColorSpace()}}let bs=746291;function it(){return bs=Math.imul(bs,1664525)+1013904223>>>0,bs/4294967296}function Be(n,e){return n+(e-n)*it()}function Jt(n=512){const e=document.createElement("canvas");return e.width=e.height=n,[e,e.getContext("2d")]}function Kt(n,e=1,t=!0){const i=new Nl(n);return i.wrapS=i.wrapT=Dr,i.repeat.set(e,e),i.colorSpace=t?wt:fn,i.anisotropy=4,i}function g0(){const[n,e]=Jt();e.fillStyle="#907052",e.fillRect(0,0,512,512);for(let t=0;t<750;t++){const i=it()*512;e.beginPath(),e.moveTo(i,-10);for(let r=0;r<=530;r+=16)e.lineTo(i+Math.sin(r*.025+t)*Be(.3,2),r);e.strokeStyle=t%4===0?"rgba(230,193,137,.14)":"rgba(55,29,12,.13)",e.lineWidth=Be(.3,1.8),e.stroke()}for(let t=0;t<5;t++){const i=Be(20,490),r=Be(30,480);for(let s=1;s<9;s++)e.beginPath(),e.ellipse(i,r,s*2,s*5,0,0,Math.PI*2),e.strokeStyle=`rgba(62,35,19,${.14-s*.011})`,e.stroke()}for(let t=0;t<1800;t++)e.fillStyle=it()>.5?"#ffffff0b":"#28130512",e.fillRect(it()*512,it()*512,Be(.5,1.5),Be(1,6));return Kt(n)}function _0(){const[n,e]=Jt();e.fillStyle="#dfd9c9",e.fillRect(0,0,512,512);for(let t=0;t<512;t+=3)e.fillStyle=t%6===0?"#77766e30":"#fff7",e.fillRect(t,0,1,512),e.fillRect(0,t,512,1);for(let t=0;t<12e3;t++){const i=Math.floor(Be(110,255));e.fillStyle=`rgba(${i},${i},${i},.11)`,e.fillRect(it()*512,it()*512,1,2)}return Kt(n,3)}function x0(){const[n,e]=Jt();e.fillStyle="#e5d8bd",e.fillRect(0,0,512,512);for(let t=0;t<2e3;t++){const i=Be(1,20);e.beginPath(),e.arc(it()*512,it()*512,i,0,Math.PI*2),e.fillStyle=it()>.45?"rgba(118,102,74,.015)":"rgba(255,250,232,.04)",e.fill()}for(let t=0;t<3500;t++)e.fillStyle="#765a3410",e.fillRect(it()*512,it()*512,1,1);return Kt(n,2)}function v0(){const[n,e]=Jt();e.fillStyle="#ead6a4",e.fillRect(0,0,512,512);for(let i=0;i<7e3;i++)e.fillStyle=it()>.5?"#74552713":"#fff9df25",e.fillRect(it()*512,it()*512,Be(.5,2),Be(.5,2));const t=e.createRadialGradient(250,260,100,256,256,370);return t.addColorStop(0,"#b7a66d00"),t.addColorStop(1,"#88643150"),e.fillStyle=t,e.fillRect(0,0,512,512),Kt(n)}function Ts(n,e,t,i,r){n.save(),n.translate(e,t),n.scale(i,i),n.fillStyle=r,n.beginPath(),n.moveTo(-20,-9),n.quadraticCurveTo(-3,-8,0,0),n.quadraticCurveTo(7,-9,22,-10),n.lineTo(10,4),n.lineTo(3,4),n.lineTo(4,15),n.lineTo(0,9),n.lineTo(-5,16),n.lineTo(-3,3),n.lineTo(-10,3),n.closePath(),n.fill(),n.restore()}function M0(){const[n,e]=Jt(1024);e.fillStyle="#2f666b",e.fillRect(0,0,1024,1024);for(let t=0;t<1024;t+=3)e.fillStyle="#fff1",e.fillRect(t,0,1,1024),e.fillStyle="#071f2413",e.fillRect(0,t,1024,1);for(let t=0;t<8;t++)for(let i=0;i<8;i++){const r=64+i*128,s=64+t*128;e.save(),e.translate(r,s),e.rotate(Math.PI/4),e.strokeStyle="#91afa267",e.lineWidth=1.4,e.setLineDash([2,5]),e.strokeRect(-44,-44,88,88),e.restore()}e.fillStyle="#c8b577",e.fillRect(65,0,7,1024),e.fillRect(952,0,7,1024),e.fillRect(0,923,1024,7);for(let t=60;t<950;t+=95)Ts(e,40,t,.8,"#d2c494"),Ts(e,984,t,.8,"#d2c494");for(let t=0;t<13;t++)Ts(e,80+t*72,976,.85,"#d4bf89");return e.fillStyle="#99734e",e.fillRect(595,655,110,105),e.strokeStyle="#e8c9a0",e.lineWidth=2,e.setLineDash([4,5]),e.strokeRect(600,660,100,95),Kt(n)}function S0(){const[n,e]=Jt(1024);e.fillStyle="#9e6147",e.fillRect(0,0,1024,1024);for(let t=0;t<4;t++)e.strokeStyle=["#dbbe8c","#395c5b","#d2ae76","#542f26"][t],e.lineWidth=9,e.strokeRect(25+t*18,25+t*18,974-t*36,974-t*36);for(let t=0;t<9;t++)for(let i=0;i<6;i++){const r=150+i*145,s=135+t*92;e.strokeStyle="#e3c490",e.lineWidth=3,e.beginPath(),e.moveTo(r-24,s),e.lineTo(r,s-26),e.lineTo(r+24,s),e.lineTo(r,s+26),e.closePath(),e.stroke(),e.fillStyle="#324f4e",e.fillRect(r-5,s-5,10,10)}for(let t=0;t<1024;t+=3)e.fillStyle="#27151313",e.fillRect(0,t,1024,1);for(let t=0;t<5e3;t++)e.fillStyle="#ecd4ac0d",e.fillRect(it()*1024,it()*1024,2,3);return Kt(n)}function y0(){const[n,e]=Jt(1024);e.fillStyle="#dfcea0",e.fillRect(0,0,1024,1024);for(let r=0;r<7e3;r++)e.fillStyle="#543e2410",e.fillRect(it()*1024,it()*1024,1,2);const t=e.createRadialGradient(550,500,250,512,512,710);t.addColorStop(0,"#b5975200"),t.addColorStop(1,"#9a713c88"),e.fillStyle=t,e.fillRect(0,0,1024,1024),e.strokeStyle="#7e866336",e.lineWidth=1;for(let r=40;r<1024;r+=80)e.beginPath(),e.moveTo(r,30),e.lineTo(r,994),e.moveTo(30,r),e.lineTo(994,r),e.stroke();const i=()=>{e.beginPath(),e.moveTo(700,-30),e.bezierCurveTo(600,140,790,230,615,345),e.bezierCurveTo(490,430,630,550,425,625),e.bezierCurveTo(300,675,485,810,220,1040)};i(),e.strokeStyle="#769593",e.lineWidth=75,e.stroke(),i(),e.strokeStyle="#a2b8aa",e.lineWidth=48,e.stroke();for(let r=0;r<21;r++){let s=Be(110,920),o=Be(85,900);e.strokeStyle="#7f855c",e.lineWidth=1.8;for(let a=0;a<4;a++){e.beginPath();for(let l=0;l<=40;l++){let c=l/40*Math.PI*2,u=(14+a*10)*(1+.16*Math.sin(c*5+r)),h=s+Math.cos(c)*u*1.5,f=o+Math.sin(c)*u;l?e.lineTo(h,f):e.moveTo(h,f)}e.stroke()}}for(let r=0;r<280;r++){let s=Be(50,975),o=Be(50,975);e.strokeStyle="#64704c66",e.lineWidth=1,e.beginPath(),e.moveTo(s,o+5),e.lineTo(s,o-5),e.moveTo(s,o),e.lineTo(s-4,o-3),e.moveTo(s,o+1),e.lineTo(s+4,o-3),e.stroke()}e.strokeStyle="#9a5041",e.lineWidth=4,e.setLineDash([9,7]),e.beginPath(),e.moveTo(110,830),e.bezierCurveTo(400,650,270,460,535,450),e.bezierCurveTo(840,440,810,190,900,85),e.stroke(),e.setLineDash([]);for(const[r,s]of[[115,827],[310,650],[535,450],[798,264],[900,85]]){e.fillStyle="#714936",e.fillRect(r-8,s-8,16,16),e.fillStyle="#ece2bb",e.fillRect(r-4,s-4,8,8),e.strokeStyle="#715335";for(let o=0;o<3;o++)e.beginPath(),e.moveTo(r+16,s-3+o*6),e.lineTo(r+Be(30,65),s-3+o*6),e.stroke()}e.save(),e.translate(155,150);for(let r=0;r<8;r++)e.rotate(Math.PI/4),e.fillStyle=r%2?"#a89971":"#525e50",e.beginPath(),e.moveTo(0,-80),e.lineTo(10,0),e.lineTo(-10,0),e.fill();return e.restore(),e.strokeStyle="#715c3c",e.lineWidth=3,e.strokeRect(22,22,980,980),Kt(n)}function E0(){const[n,e]=Jt(),t=e.createLinearGradient(0,0,0,512);t.addColorStop(0,"#6a8790"),t.addColorStop(.6,"#c3a77f"),t.addColorStop(1,"#507778"),e.fillStyle=t,e.fillRect(0,0,512,512),e.fillStyle="#cfba86",e.beginPath(),e.arc(372,133,36,0,7),e.fill();for(let i=0;i<12;i++){let r=i*48;e.fillStyle=i%2?"#556963":"#3e5a5a",e.fillRect(r,235+it()*30,38,110),e.beginPath(),e.moveTo(r-8,245),e.lineTo(r+20,Be(174,216)),e.lineTo(r+47,245),e.fill(),e.fillStyle="#bea477",e.fillRect(r+13,266,8,16)}e.fillStyle="#283f43",e.beginPath(),e.ellipse(268,391,123,17,-.08,0,7),e.fill();for(const i of[223,292])e.beginPath(),e.arc(i,340,11,0,7),e.fill(),e.fillRect(i-8,349,16,30);e.strokeStyle="#d6c59b55";for(let i=0;i<60;i++){let r=Be(370,510),s=it()*512;e.beginPath(),e.moveTo(s,r),e.lineTo(s+Be(10,40),r),e.stroke()}return Kt(n)}function b0(){const[n,e]=Jt(),t=e.createLinearGradient(0,0,0,512);t.addColorStop(0,"#b9cfd0"),t.addColorStop(.62,"#e9dbb4"),t.addColorStop(.63,"#bbc8ad"),t.addColorStop(1,"#9fb7ac"),e.fillStyle=t,e.fillRect(0,0,512,512),e.fillStyle="#adbaa688",e.beginPath(),e.moveTo(0,327);for(let i=0;i<=32;i++)e.lineTo(i*16,309+Math.sin(i*.3)*8+Math.sin(i*.81)*6);e.lineTo(512,365),e.lineTo(0,365),e.fill();for(let i=0;i<40;i++){let r=it()*512,s=Be(380,510);e.strokeStyle="#6f89794a",e.lineWidth=1,e.beginPath(),e.moveTo(r,512),e.quadraticCurveTo(r+Be(-10,10),s+25,r+Be(-5,5),s),e.stroke(),e.fillStyle="#80917a66",e.fillRect(r-1,s-8,3,13)}for(let i=0;i<40;i++){e.strokeStyle="#edf0d526";let r=Be(355,505),s=it()*512;e.beginPath(),e.moveTo(s,r),e.lineTo(s+Be(20,70),r),e.stroke()}return Kt(n)}function T0(){const[n,e]=Jt();e.fillStyle="#d7c69e",e.fillRect(0,0,512,512),e.fillStyle="#acbdb0",e.fillRect(0,240,512,272),e.fillStyle="#849282",e.beginPath(),e.moveTo(0,264),e.quadraticCurveTo(140,164,280,255),e.quadraticCurveTo(420,222,512,250),e.lineTo(512,300),e.lineTo(0,300),e.fill(),e.fillStyle="#735845",e.beginPath(),e.moveTo(38,407),e.quadraticCurveTo(244,440,479,384),e.quadraticCurveTo(439,462,130,468),e.fill();for(const[t,i,r,s,o]of[[202,186,1,"#986549","#c5c0a9"],[326,240,.76,"#3f6a6b","#534439"]])e.save(),e.translate(t,i),e.scale(r,r),e.fillStyle=o,e.beginPath(),e.ellipse(0,-14,44,57,0,0,Math.PI*2),e.fill(),e.fillStyle="#c6a381",e.beginPath(),e.ellipse(0,-4,33,43,0,0,Math.PI*2),e.fill(),e.fillStyle=o,e.beginPath(),e.moveTo(-34,-5),e.quadraticCurveTo(-40,-66,6,-60),e.quadraticCurveTo(41,-47,33,-13),e.lineTo(12,-35),e.lineTo(-27,-31),e.fill(),e.fillStyle=s,e.beginPath(),e.moveTo(-31,42),e.lineTo(30,42),e.lineTo(49,190),e.lineTo(-47,190),e.closePath(),e.fill(),e.strokeStyle="#b6a178",e.lineWidth=6,e.beginPath(),e.moveTo(-4,42),e.lineTo(3,183),e.stroke(),e.fillStyle="#403f35",e.beginPath(),e.arc(-10,-4,2.8,0,7),e.arc(12,-4,2.8,0,7),e.fill(),e.strokeStyle="#8c6750",e.lineWidth=2,e.beginPath(),e.moveTo(-7,17),e.quadraticCurveTo(0,23,10,16),e.stroke(),e.restore();e.strokeStyle="#ead8ad99",e.lineWidth=2;for(let t=0;t<30;t++){const i=Be(310,508),r=it()*512;e.beginPath(),e.moveTo(r,i),e.lineTo(r+Be(12,40),i),e.stroke()}return e.strokeStyle="#ece0bc",e.lineWidth=17,e.strokeRect(10,10,492,492),Kt(n)}function A0(){const[n,e]=Jt();e.fillStyle="#c9c6bc",e.fillRect(0,0,512,512);for(let t=0;t<1400;t++){e.strokeStyle=it()>.5?"#fff2":"#3d382a16",e.lineWidth=.4;const i=it()*512,r=it()*512;e.beginPath(),e.moveTo(r,i),e.lineTo(r+Be(15,150),i+Be(-.4,.4)),e.stroke()}return Kt(n)}function R0(){const n=g0(),e=_0(),t=x0(),i=v0(),r=A0(),s=(l,c={})=>new ko({color:l,roughness:.8,...c}),o=l=>s(l,{map:e,bumpMap:e,bumpScale:.012,roughness:1}),a={oak:s("#af936f",{map:n,bumpMap:n,bumpScale:.014}),darkWood:s("#624a38",{map:n,bumpMap:n,bumpScale:.012}),lightWood:s("#c6af86",{map:n,bumpMap:n,bumpScale:.01}),trim:s("#426162",{map:n,bumpMap:n,bumpScale:.008}),edge:s("#907751",{map:n}),wall:s("#fff0d4",{map:t,bumpMap:t,bumpScale:.018}),studyWall:s("#d9dcc4",{map:t,bumpMap:t,bumpScale:.016}),ceiling:s("#e2dac3",{map:t}),brass:s("#bc9a54",{metalness:.72,roughness:.34,bumpMap:r,bumpScale:.003}),iron:s("#303b39",{metalness:.55,roughness:.57,bumpMap:r,bumpScale:.004}),copper:s("#ab6446",{metalness:.62,roughness:.4,bumpMap:r,bumpScale:.003}),linen:o("#e9ddbb"),cream:o("#d8c9a4"),teal:o("#3f7177"),clay:o("#b57555"),olive:o("#6b7652"),navy:o("#354950"),ochre:o("#be9b55"),rose:o("#a06c63"),quilt:s("#ffffff",{map:M0(),bumpMap:e,bumpScale:.014,roughness:1}),rug:s("#ffffff",{map:S0(),bumpMap:e,bumpScale:.012,roughness:1}),leather:s("#724632",{map:n,bumpMap:e,bumpScale:.015,roughness:.88}),leatherDark:s("#3c3831",{bumpMap:e,bumpScale:.009,roughness:.88}),paper:s("#ffffff",{map:i,roughness:1,side:Pt}),map:s("#ffffff",{map:y0(),roughness:1,side:Pt}),portrait:s("#ffffff",{map:E0(),roughness:.93}),family:s("#ffffff",{map:T0(),roughness:.93}),ceramic:s("#d8d0ab",{roughness:.35}),glaze:s("#547975",{roughness:.27}),ink:s("#314643",{roughness:.9}),redWax:s("#913f34",{roughness:.6}),leaf:s("#627248",{roughness:.95,side:Pt}),stem:s("#756848"),flower:s("#d5b888"),window:new Rn({color:"#d9e5d8",transparent:!0,opacity:.18,side:Pt,depthWrite:!1}),sky:new Rn({map:b0(),color:"#ffffff"}),flame:new Rn({color:"#ffe4a6"})};return a.quilt.map.flipY=!1,a.map.map.flipY=!1,a.window.forceSinglePass=!0,a.floor=Array.from({length:8},(l,c)=>s(new qe("#bca17b").multiplyScalar(.86+c*.035),{map:n,bumpMap:n,bumpScale:.01})),a}const Pi=new w;function kt(n,e,t,i,r,s){const o=2*Math.PI*r/4,a=Math.max(s-2*r,0),l=Math.PI/4;Pi.copy(e),Pi[i]=0,Pi.normalize();const c=.5*o/(o+a),u=1-Pi.angleTo(n)/l;return Math.sign(Pi[t])===1?u*c:a/(o+a)+c+c*(1-u)}class Vo extends Jn{constructor(e=1,t=1,i=1,r=2,s=.1){const o=r*2+1;if(s=Math.min(e/2,t/2,i/2,s),super(1,1,1,o,o,o),this.type="RoundedBoxGeometry",this.parameters={width:e,height:t,depth:i,segments:r,radius:s},o===1)return;const a=this.toNonIndexed();this.index=null,this.attributes.position=a.attributes.position,this.attributes.normal=a.attributes.normal,this.attributes.uv=a.attributes.uv;const l=new w,c=new w,u=new w(e,t,i).divideScalar(2).subScalar(s),h=this.attributes.position.array,f=this.attributes.normal.array,d=this.attributes.uv.array,g=h.length/6,x=new w,m=.5/o;for(let p=0,T=0;p<h.length;p+=3,T+=2)switch(l.fromArray(h,p),c.copy(l),c.x-=Math.sign(c.x)*m,c.y-=Math.sign(c.y)*m,c.z-=Math.sign(c.z)*m,c.normalize(),h[p+0]=u.x*Math.sign(l.x)+c.x*s,h[p+1]=u.y*Math.sign(l.y)+c.y*s,h[p+2]=u.z*Math.sign(l.z)+c.z*s,f[p+0]=c.x,f[p+1]=c.y,f[p+2]=c.z,Math.floor(p/g)){case 0:x.set(1,0,0),d[T+0]=kt(x,c,"z","y",s,i),d[T+1]=1-kt(x,c,"y","z",s,t);break;case 1:x.set(-1,0,0),d[T+0]=1-kt(x,c,"z","y",s,i),d[T+1]=1-kt(x,c,"y","z",s,t);break;case 2:x.set(0,1,0),d[T+0]=1-kt(x,c,"x","z",s,e),d[T+1]=kt(x,c,"z","x",s,i);break;case 3:x.set(0,-1,0),d[T+0]=1-kt(x,c,"x","z",s,e),d[T+1]=1-kt(x,c,"z","x",s,i);break;case 4:x.set(0,0,1),d[T+0]=1-kt(x,c,"x","y",s,e),d[T+1]=1-kt(x,c,"y","x",s,t);break;case 5:x.set(0,0,-1),d[T+0]=kt(x,c,"x","y",s,e),d[T+1]=1-kt(x,c,"y","x",s,t);break}}static fromJSON(e){return new Vo(e.width,e.height,e.depth,e.segments,e.radius)}}function C0(n,e=!1){const t=n[0].index!==null,i=new Set(Object.keys(n[0].attributes)),r=new Set(Object.keys(n[0].morphAttributes)),s={},o={},a=n[0].morphTargetsRelative,l=new yt;let c=0;for(let u=0;u<n.length;++u){const h=n[u];let f=0;if(t!==(h.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const d in h.attributes){if(!i.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;s[d]===void 0&&(s[d]=[]),s[d].push(h.attributes[d]),f++}if(f!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(a!==h.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const d in h.morphAttributes){if(!r.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;o[d]===void 0&&(o[d]=[]),o[d].push(h.morphAttributes[d])}if(e){let d;if(t)d=h.index.count;else if(h.attributes.position!==void 0)d=h.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,d,u),c+=d}}if(t){let u=0;const h=[];for(let f=0;f<n.length;++f){const d=n[f].index;for(let g=0;g<d.count;++g)h.push(d.getX(g)+u);u+=n[f].attributes.position.count}l.setIndex(h)}for(const u in s){const h=el(s[u]);if(!h)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;l.setAttribute(u,h)}for(const u in o){const h=o[u][0].length;if(h===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[u]=[];for(let f=0;f<h;++f){const d=[];for(let x=0;x<o[u].length;++x)d.push(o[u][x][f]);const g=el(d);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;l.morphAttributes[u].push(g)}}return l}function el(n){let e,t,i,r=-1,s=0;for(let c=0;c<n.length;++c){const u=n[c];if(e===void 0&&(e=u.array.constructor),e!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=u.itemSize),t!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=u.normalized),i!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(r===-1&&(r=u.gpuType),r!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;s+=u.count*t}const o=new e(s),a=new Zt(o,t,i);let l=0;for(let c=0;c<n.length;++c){const u=n[c];if(u.isInterleavedBufferAttribute){const h=l/t;for(let f=0,d=u.count;f<d;f++)for(let g=0;g<t;g++){const x=u.getComponent(f,g);a.setComponent(f+h,g,x)}}else o.set(u.array,l);l+=u.count*t}return r!==void 0&&(a.gpuType=r),a}class w0{constructor(e,t){this.scene=e,this.m=t,this.pools=new Map,this.matrix=new at,this.stack=[],this.colliders=[],this.objects=0}at(e,t,i,r=[1,1,1]){this.stack.push(this.matrix.clone());const s=new at().compose(new w(...e),new An().setFromEuler(new Ht(...t||[0,0,0])),new w(...r));this.matrix.multiply(s),i(),this.matrix=this.stack.pop()}add(e,t,i=[0,0,0],r=[0,0,0],s=[1,1,1],o=!0){const a=typeof t=="string"?this.m[t]:t;let l=e.index?e.toNonIndexed():e.clone();e!==l&&e.dispose();const c=new at().compose(new w(...i),new An().setFromEuler(new Ht(...r)),new w(...s));c.premultiply(this.matrix),l.applyMatrix4(c);for(const u of Object.keys(l.attributes))["position","normal","uv"].includes(u)||l.deleteAttribute(u);l.getAttribute("uv")||l.setAttribute("uv",new je(new Float32Array(l.getAttribute("position").count*2),2)),this.pools.has(a)||this.pools.set(a,{geometry:[],shadow:o}),this.pools.get(a).geometry.push(l),this.objects++}box(e,t,i,r,s,o,a="oak",l=0,c=[0,0,0]){this.add(l?new Vo(e,t,i,l>.035?2:1,Math.min(l,e/3,t/3,i/3)):new Jn(e,t,i),a,[r,s,o],c)}sphere(e,t,i,r,s,o,a="brass",l=12){this.add(new Oo(1,l,Math.max(6,Math.floor(l*.65))),a,[r,s,o],[0,0,0],[e,t,i])}cyl(e,t,i,r,s,o,a="oak",l=[0,0,0],c=12){this.add(new Fr(e,t,i,c),a,[r,s,o],l)}torus(e,t,i,r,s,o="brass",a=[0,0,0],l=Math.PI*2){this.add(new Bo(e,t,6,24,l),o,[i,r,s],a)}lathe(e,t,i,r,s="ceramic",o=28){this.add(new Fo(e.map(a=>new le(...a)),o),s,[t,i,r])}line(e,t=.01,i="brass",r=20){const s=e.map(o=>new w(...o));this.add(new zo(new Bl(s),r,t,5,!1),i)}rod(e,t,i,r="oak",s=10){const o=new w(...e),a=new w(...t),l=a.clone().sub(o),c=o.clone().add(a).multiplyScalar(.5),u=new An().setFromUnitVectors(new w(0,1,0),l.clone().normalize());let h=new Fr(i,i,l.length(),s);h.applyQuaternion(u),this.add(h,r,c.toArray())}surface(e,t,i,r,s=[0,0,0],o=[0,0,0]){const a=[],l=[],c=[];for(let h=0;h<=t;h++)for(let f=0;f<=e;f++){const d=f/e,g=h/t;a.push(...i(d,g)),l.push(d,g)}for(let h=0;h<t;h++)for(let f=0;f<e;f++){let d=h*(e+1)+f,g=d+1,x=d+e+1,m=x+1;c.push(d,x,g,g,x,m)}const u=new yt;u.setAttribute("position",new je(a,3)),u.setAttribute("uv",new je(l,2)),u.setIndex(c),u.computeVertexNormals(),this.add(u,r,s,o)}collider(e,t,i,r,s="furniture"){const o=new w(e,0,t).applyMatrix4(this.matrix);this.colliders.push({minX:o.x-i/2,maxX:o.x+i/2,minZ:o.z-r/2,maxZ:o.z+r/2,label:s})}finish(){for(const[e,t]of this.pools){const i=C0(t.geometry,!1);if(!i)throw new Error("Unable to merge scene material");const r=new tn(i,e);r.castShadow=t.shadow&&!e.transparent&&!(e instanceof Rn),r.receiveShadow=!(e instanceof Rn),r.frustumCulled=!0,this.scene.add(r),t.geometry.forEach(s=>s.dispose())}return{parts:this.objects,batches:this.pools.size,colliders:this.colliders}}}function Bi(n,e,t,i,r,s,o,a="darkWood"){n.box(e+.12,t+.12,.07,i,r,s,a,.025),n.add(new gn(e,t),o,[i,r,s+.039]);for(const l of[-1,1])n.box(.035,t+.045,.025,i+l*(e/2+.018),r,s+.05,"brass",.007)}function Go(n,e,t,i,r=1,s="brass",o=[0,0,0]){const a=new Wl;a.moveTo(-.1,.045),a.quadraticCurveTo(-.015,.04,0,0),a.quadraticCurveTo(.035,.045,.11,.05),a.lineTo(.05,-.02),a.lineTo(.015,-.02),a.lineTo(.02,-.07),a.lineTo(0,-.042),a.lineTo(-.025,-.078),a.lineTo(-.015,-.015),a.lineTo(-.05,-.015),a.closePath(),n.add(new No(a,{depth:.004,bevelEnabled:!1,curveSegments:8}),s,[e,t,i],o,[r,r,r])}function nc(n,e,t,i,r=.12,s=.24,o=.18,a="teal",l=0){n.at([e,t,i],[0,l,0],()=>{n.box(r,s-.015,o,0,0,0,"paper",.006);for(let c of[-1,1])n.box(.008,s+.014,o+.02,c*(r/2+.003),0,0,a,.002);n.box(r+.016,s+.014,.015,0,0,o/2+.011,a,.003);for(let c of[-.32,.32])n.box(r+.018,.007,.005,0,s*c,o/2+.02,"brass")})}function ic(n,e,t,i,r=.28,s=.21,o=.055,a="teal",l=0){n.at([e,t,i],[0,l,0],()=>{n.box(r,o,s,0,0,0,"paper",.005);for(let c of[-1,1])n.box(r+.025,.01,s+.025,0,c*(o/2+.005),0,a,.003);n.box(.012,o+.02,s+.025,-r/2-.01,0,0,a,.002)})}function rc(n,e,t,i,r="ceramic",s=.067){n.cyl(s,s*.72,.12,e,t+.06,i,r,[0,0,0],24),n.cyl(s*.88,s*.88,.006,e,t+.122,i,"leatherDark",[0,0,0],24),n.torus(s,.007,e,t+.125,i,r,[Math.PI/2,0,0]),n.torus(s*.58,.012,e+s+.019,t+.064,i,r,[0,0,0])}function tl(n,e,t,i,r=1){n.sphere(.1*r,.13*r,.1*r,e,t+.13*r,i,"glaze",20),n.cyl(.052*r,.07*r,.12*r,e,t+.28*r,i,"glaze"),n.torus(.052*r,.006*r,e,t+.344*r,i,"ceramic",[Math.PI/2,0,0]);for(let s=0;s<7;s++){let o=e+Be(-.16,.16)*r,a=i+Be(-.11,.11)*r,l=t+Be(.57,.73)*r;n.line([[e,t+.29*r,i],[o*.3+e*.7,t+.46*r,a],[o,l,a]],.0035*r,"stem",8);for(let c=0;c<3;c++)n.sphere(.013*r,.023*r,.008*r,o+Be(-.03,.03)*r,l-c*.034*r,a,"flower",8)}}function sc(n,e,t,i,r=1){n.at([e,t,i],[0,0,0],()=>{n.cyl(.1*r,.12*r,.055*r,0,.025*r,0,"brass"),n.cyl(.11*r,.045*r,.08*r,0,.37*r,0,"brass");for(const s of[-1,1])for(const o of[-1,1])n.rod([s*.077*r,.045*r,o*.077*r],[s*.077*r,.34*r,o*.077*r],.007*r,"brass");n.cyl(.036*r,.038*r,.14*r,0,.12*r,0,"cream"),n.sphere(.016*r,.041*r,.015*r,0,.23*r,0,"flame"),n.torus(.053*r,.009*r,0,.45*r,0,"iron")})}function As(n,e,t,i,r=.75,s=.5,o="linen",a=0){n.at([e,t,i],[0,a,0],()=>{n.surface(30,18,(c,u)=>{const h=-c*Math.PI*2,f=u*Math.PI,d=Math.sin(f)*Math.cos(h),g=Math.sin(f)*Math.sin(h),x=Math.cos(f),m=p=>Math.sign(p)*Math.pow(Math.abs(p),.5);return[m(d)*r/2,m(x)*.105+Math.sin(h*13)*.006*(1-Math.abs(x)),m(g)*s/2]},o);const l=[];for(let c=0;c<=48;c++){let u=c/48*Math.PI*2;l.push([Math.sign(Math.cos(u))*Math.pow(Math.abs(Math.cos(u)),.45)*r*.496,0,Math.sign(Math.sin(u))*Math.pow(Math.abs(Math.sin(u)),.45)*s*.496])}n.line(l,.004,"cream",64)})}function Li(n,e,t,i,r=.43,s=.35,o="linen",a=0){n.at([e,t,i],[0,a,0],()=>{n.box(r,.065,s,0,.03,0,o,.024),n.box(r*.97,.035,s*.93,-.002,.069,-.008,o,.014),n.line([[-r*.42,.049,s/2+.003],[-.05,.054,s/2+.006],[r*.42,.047,s/2+.003]],.003,"cream",10)})}function nl(n,e,t,i,r=0,s="leather"){n.at([e,t,i],[0,r,0],()=>{n.box(.19,.035,.35,0,.02,-.045,"leatherDark",.03),n.sphere(.1,.087,.2,0,.08,-.054,s,16),n.cyl(.077,.093,.3,0,.23,.056,s,[0,0,0],16),n.torus(.077,.009,0,.385,.056,"leatherDark",[Math.PI/2,0,0]),n.cyl(.067,.067,.006,0,.384,.056,"leatherDark",[0,0,0],16),n.box(.145,.031,.013,0,.315,-.024,"leatherDark",.004),n.box(.028,.032,.01,.043,.315,-.033,"brass",.003);for(let o=0;o<4;o++)n.line([[-.027,.165+o*.031,-.026],[.027,.184+o*.031,-.032]],.0025,"cream",4)})}function P0(n,e,t,i,r=0){n.at([e,t,i],[0,r,0],()=>{n.box(.4,.34,.15,0,.19,0,"leather",.048),n.box(.43,.22,.055,0,.285,.075,"leatherDark",.025);for(let s of[-1,1])n.box(.026,.18,.012,s*.125,.2,.11,"leather"),n.box(.038,.04,.013,s*.125,.16,.12,"brass",.004);n.line([[-.17,.37,0],[-.26,.58,-.01],[.01,.79,-.015],[.23,.58,-.01],[.17,.37,0]],.014,"leather",24),n.box(.078,.065,.009,0,.28,.109,"brass",.012)})}function L0(n,e,t,i=0){n.at([e,0,t],[0,i,0],()=>{for(let r of[-1,1])for(let s of[-1,1])n.box(.055,.45,.055,r*.2,.235,s*.19,"darkWood",.012),n.cyl(.04,.04,.018,r*.2,.05,s*.19,"brass");n.box(.51,.055,.49,0,.49,0,"oak",.026),n.box(.47,.042,.43,0,.536,0,"olive",.017);for(let r of[-1,1])n.box(.049,.58,.049,r*.21,.77,.21,"darkWood",.01);for(let r of[-.13,0,.13])n.box(.03,.34,.03,r,.84,.21,"oak",.007);n.box(.49,.07,.07,0,1.06,.21,"oak",.02),n.box(.42,.028,.034,0,.2,-.19,"oak"),n.box(.034,.028,.38,-.2,.2,0,"oak"),n.box(.034,.028,.38,.2,.2,0,"oak")}),n.collider(e,t,.58,.6,"chair")}function D0(n,e,t,i,r="teal",s=1.23,o=0){n.at([e,t,i],[0,o,0],()=>{n.line([[0,.16,0],[.017,.24,0],[-.028,.29,0],[-.058,.25,0]],.008,"brass",12),n.rod([-.23,-.08,0],[0,.1,0],.015,"lightWood"),n.rod([0,.1,0],[.23,-.08,0],.015,"lightWood"),n.rod([-.23,-.08,0],[.23,-.08,0],.013,"lightWood");const a=new ko({color:n.m[r].color,map:n.m[r].map,bumpMap:n.m[r].bumpMap,bumpScale:.009,roughness:1,side:Pt});for(const l of[-1,1])n.surface(22,28,(c,u)=>{const h=-u*s;let f=.22+Math.sin(Math.min(u*3,1)*Math.PI/2)*.025+u*.105,d=(c-.5)*2*f,g=Math.sin(c*Math.PI*14+u*1.8)*(.009+.025*u),x=l*(.055+Math.sin(c*Math.PI)*.035+g),m=u<.11?Math.max(0,1-Math.abs(c-.5)*7)*(.085-u*.7):0;return[d,h-m,x]},a);for(const l of[-1,1])n.surface(12,18,(c,u)=>{let h=c*Math.PI*2,f=-.04-u*s*.55;return[l*(.2+u*.18+Math.sin(u*Math.PI)*.035)+Math.cos(h)*(.092-u*.03),f,Math.sin(h)*(.086-u*.018)+Math.sin(u*17+h*5)*.009]},a),n.torus(.066,.008,l*.38,-s*.58,0,r,[Math.PI/2,0,0]);n.box(.038,s*.83,.008,.03,-s*.49,.099,"cream",.003);for(let l=0;l<6;l++)n.sphere(.011,.011,.006,.03,-.16-l*s*.11,.11,"brass",8);n.box(.16,.1,.015,-.13,-s*.5,.094,r,.015),n.line([[-.205,-s*.456,.107],[-.13,-s*.47,.108],[-.052,-s*.456,.107]],.003,"cream",8),r==="teal"&&Go(n,-.12,-.22,.094,.32,"brass");for(let l of[-1,1])n.box(.065,.1,.055,l*.045,-.053,.05,"cream",.012,[0,0,l*.38]);s>1.2&&(n.box(.58,.035,.2,0,-s*.45,.014,"leather",.007),n.box(.06,.055,.018,.02,-s*.45,.126,"brass",.006),n.box(.105,.125,.008,.19,-s*.76,.087,"clay",.003))},[.78,1,1])}const I0={west:-3.3,east:6,north:-3,south:3.4,divide:3.1,height:3.05};function U0(){const n=document.createElement("canvas");n.width=n.height=128;const e=n.getContext("2d"),t=e.createRadialGradient(64,64,6,64,64,63);t.addColorStop(0,"rgba(25,22,16,.30)"),t.addColorStop(.5,"rgba(25,22,16,.19)"),t.addColorStop(1,"rgba(25,22,16,0)"),e.fillStyle=t,e.fillRect(0,0,128,128);const i=new Nl(n);return new Rn({map:i,transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-1})}function pn(n,e,t,i,r,s=.014){n.add(new gn(i,r),n.m.contact,[e,s,t],[-Math.PI/2,0,0],[1,1,1],!1)}function N0(n){const{west:e,east:t,north:i,south:r,divide:s,height:o}=I0;n.box(t-e+.2,.16,r-i+.2,(t+e)/2,-.1,(r+i)/2,"darkWood");let a=0;for(let u=e+.145;u<t;u+=.29){let h=0;for(let f=i-.6+a%3*.52;f<r;f+=1.6){let d=Math.max(i,f),g=Math.min(r,f+1.595);if(!(g<=d)){n.box(.283,.065,g-d,u,-.024,(d+g)/2,n.m.floor[(a+h*3)%8],.004);for(const x of[d+.055,g-.055])x>i&&x<r&&(n.cyl(.003,.003,.002,u-.09,.011,x,"iron",[0,0,0],6),n.cyl(.003,.003,.002,u+.09,.011,x,"iron",[0,0,0],6));h++}}a++}n.box(t-e,.1,r-i,(t+e)/2,o+.05,(r+i)/2,"ceiling");function l(u,h,f,d,g="wall",x=!0){let m=f-h;if(!(m<=0)){n.box(.2,x?o:1.01,m,u,x?o/2:.505,(h+f)/2,g),n.box(.025,.83,m-.035,u+d*.113,.47,(h+f)/2,"trim");for(let p=h+.07;p<=f;p+=.65)n.box(.048,.75,.035,u+d*.14,.47,p,"trim",.003);for(let p of[.08,.91,1])n.box(.05,p===.08?.12:.045,m,u+d*.14,p,(h+f)/2,"darkWood",.008);x&&n.box(.09,.12,m,u+d*.12,o-.14,(h+f)/2,"darkWood",.006),n.collider(u,(h+f)/2,.2,m,"wall")}}function c(u,h,f,d,g="wall",x=!0){let m=f-h;if(!(m<=0)){n.box(m,x?o:1.01,.2,(h+f)/2,x?o/2:.505,u,g),n.box(m-.035,.83,.025,(h+f)/2,.47,u+d*.113,"trim");for(let p=h+.07;p<=f;p+=.65)n.box(.035,.75,.048,p,.47,u+d*.14,"trim",.003);for(let p of[.08,.91,1])n.box(m,p===.08?.12:.045,.05,(h+f)/2,p,u+d*.14,"darkWood",.008);x&&n.box(m,.12,.09,(h+f)/2,o-.14,u+d*.12,"darkWood",.006),n.collider((h+f)/2,u,m,.2,"wall")}}l(e,i,-2.18,1),l(e,.17,r,1),l(e,-2.18,.17,1,"wall",!1),n.box(.2,.48,2.35,e,2.81,-1.005,"wall"),l(t,i,r,-1),c(r,e,t,-1),c(i,e,4.02,1),c(i,5.7,t,1),c(i,4.02,5.7,1,"studyWall",!1),n.box(1.68,.48,.2,4.86,2.81,i,"studyWall");for(const[u,h]of[[i,-2.43],[-.96,1.02],[2.45,r]]){l(s,u,h,-1),n.box(.03,.81,h-u-.035,s+.115,.47,(u+h)/2,"trim");for(let f of[.08,1])n.box(.07,f===.08?.12:.045,h-u,s+.14,f,(u+h)/2,"darkWood")}for(const u of[-1.695,1.735]){n.box(.22,.66,1.43,s,2.72,u,"wall");for(const h of[u-.72,u+.72])n.box(.3,2.41,.1,s,1.205,h,"darkWood",.01),n.box(.32,.08,.16,s,2.39,h,"lightWood",.01);n.box(.32,.11,1.53,s,2.38,u,"darkWood",.008),n.box(.26,.012,1.38,s,.016,u,"brass")}c(0,s,3.83,-1,"studyWall"),c(0,5.26,t,-1,"studyWall"),n.box(1.43,.67,.2,4.545,2.715,0,"studyWall");for(const u of[3.83,5.26])n.box(.1,2.4,.3,u,1.2,0,"darkWood",.01);n.box(1.56,.1,.3,4.545,2.38,0,"darkWood",.01),n.box(1.35,.012,.27,4.545,.016,0,"brass");for(const u of[-2.9,-.5,2.8,5.65]){n.box(.15,.2,r-i,u,2.93,(r+i)/2,"darkWood",.01);for(const h of[i+.16,r-.16])n.box(.17,.3,.13,u,2.73,h,"oak",.015)}for(const u of[-2.78,.24,3.15])n.box(t-e,.13,.11,(t+e)/2,2.86,u,"oak",.008);n.box(1.1,2.25,.072,.55,1.16,r-.128,"darkWood",.025);for(const u of[.2,.9])for(const h of[.66,1.52])n.box(.3,.62,.022,u,h,r-.17,"oak",.008),n.box(.25,.56,.012,u,h,r-.184,"darkWood",.006);for(const u of[-.06,1.16])n.box(.11,2.38,.12,u,1.19,r-.19,"oak",.012);n.box(1.32,.11,.12,.55,2.39,r-.19,"oak",.01),n.box(.063,.22,.018,.99,1.09,r-.225,"brass",.01),n.sphere(.026,.026,.035,.99,1.11,r-.254,"brass");for(const u of[.3,1.95])n.box(.08,.13,.02,.03,u,r-.212,"iron",.009);n.at([e+.115,0,-1.005],[0,Math.PI/2,0],()=>{il(n,2.35,1.53,1.8),n.box(2.52,.09,.3,0,1.02,.025,"oak",.022),n.box(2.5,.035,.19,0,1.1,.02,"lightWood",.01)}),n.at([4.86,0,i+.115],[0,0,0],()=>{il(n,1.68,1.53,1.8),n.box(1.9,.075,.31,0,1.04,.02,"oak",.02)});for(const u of[-2.2,.19])n.surface(22,24,(h,f)=>[.06*Math.sin(h*8*Math.PI)+.02*Math.sin(f*10),2.65-f*1.58,u+(h-.5)*.4],"linen",[e+.26,0,0]),n.box(.13,.048,.33,e+.27,1.65,u,"ochre",.006);n.rod([e+.33,2.71,-2.36],[e+.33,2.71,.35],.018,"brass");for(const u of[-2.36,.35])n.sphere(.038,.038,.038,e+.33,2.71,u,"brass")}function il(n,e,t,i){n.box(e-.07,t-.06,.025,0,i,-.085,"sky");for(const r of[-1,1])n.box(.073,t+.2,.11,r*(e/2+.015),i,.018,"oak",.008),n.box(e+.2,.075,.11,0,i+r*(t/2+.02),.018,"oak",.008);n.box(.065,t,.075,0,i,.025,"oak",.007),n.box(e,.057,.075,0,i-.01,.025,"oak",.007);for(const r of[-1,1])n.box(.032,t,.05,r*e/4,i,.018,"lightWood",.005);for(let r=0;r<4;r++)for(let s=0;s<2;s++)n.add(new gn(e/4-.048,t/2-.062),"window",[-e/2+(r+.5)*e/4,i-t/2+(s+.5)*t/2,.01]);n.box(.07,.035,.04,.075,i-.05,.077,"brass",.008)}function F0(n){for(const i of[-1,1])for(const r of[-1,1]){const s=-1.18+i*1.03,o=-1.1+r*1.24;n.box(.11,.6,.11,s,.31,o,"darkWood",.013),n.cyl(.065,.055,.055,s,.44,o,"oak"),n.cyl(.07,.058,.06,s,.17,o,"oak"),r<0&&(n.box(.1,.91,.1,s,.99,o,"oak",.014),n.sphere(.075,.085,.075,s,1.47,o,"oak"),n.cyl(.08,.07,.032,s,1.37,o,"brass"))}for(const i of[-1,1])n.box(.08,.21,2.5,-1.18+i*1.04,.46,-1.1,"oak",.012),n.box(.1,.045,2.48,-1.18+i*1.045,.59,-1.1,"lightWood",.008);n.box(2.06,.19,.09,-1.18,.47,-1.1+1.25,"oak",.012);for(let i=0;i<9;i++)n.box(1.93,.065,.08,-1.18,.46,-1.1-1.1+i*.28,"lightWood");n.box(2,.41,.07,-1.18,1.13,-1.1-1.25,"darkWood",.025);for(const i of[-1.18-.69,-1.18,-1.18+.69])n.box(.58,.35,.012,i,1.13,-1.1-1.203,"oak",.045);n.line([[-1.18-.97,1.35,-1.1-1.24],[-1.18-.45,1.48,-1.1-1.24],[-1.18,1.55,-1.1-1.24],[-1.18+.45,1.48,-1.1-1.24],[-1.18+.97,1.35,-1.1-1.24]],.047,"oak",32),Go(n,-1.18,1.16,-1.1-1.187,1,"brass"),n.box(1.96,.21,2.43,-1.18,.64,-1.1,"linen",.09),n.box(1.94,.026,2.36,-1.18,.758,-1.1,"cream",.012),n.surface(54,64,(i,r)=>{const s=(i-.5)*2.48,o=-.74+r*2.24,a=Math.max(0,Math.abs(s)-.94),l=Math.max(0,o-1.11);let c=.805-Math.max(a*1.47,l*1.45);return c+=.014*Math.sin(s*18+o*3)+.017*Math.sin(o*14+s*2),c+=.025*Math.sin(i*29)*Math.pow(Math.min(a*5,1),.4),[-1.18+s,c,-1.1+o]},"quilt"),n.surface(45,8,(i,r)=>{let s=(i-.5)*1.95;return[-1.18+s,.83+Math.sin(r*Math.PI)*.035+Math.sin(s*17)*.009,-1.1-.83+r*.18]},"cream"),As(n,-1.18-.48,.87,-1.1-.96,.83,.44,"linen",-.055),As(n,-1.18+.46,.88,-1.1-.97,.83,.44,"linen",.05),As(n,-1.18+.62,.84,-1.1-.55,.37,.34,"ochre",.22),n.collider(-1.18,-1.1,2.2,2.65,"bed"),pn(n,-1.18,-1.1,2.6,3.1,.031),n.box(3.8,.012,3.4,-.72,.021,.3,"rug",.004);for(let i=0;i<57;i++)for(let r of[-1,1])n.line([[-2.53+i*.066,.03,.3+r*1.7],[-2.53+i*.066+Be(-.008,.008),.025,.3+r*1.77]],.003,"cream",3);rl(n,.34,-1.81),rl(n,-2.66,-1.81),sc(n,.4,.74,-1.94,.8),rc(n,.19,.747,-1.7,"glaze",.065),n.cyl(.11,.11,.017,.19,.738,-1.7,"ceramic",[0,0,0],24),ic(n,.49,.77,-1.74,.24,.17,.045,"clay",-.13),n.box(.013,.003,.19,.53,.805,-1.74,"ochre",.001),n.line([[.54,.806,-1.645],[.58,.797,-1.58],[.61,.74,-1.54]],.004,"ochre",8),n.cyl(.062,.062,.014,.13,.745,-1.96,"ceramic",[0,0,0],18),n.torus(.018,.003,.13,.756,-1.97,"brass",[Math.PI/2,0,0]),n.rod([.13,.756,-1.958],[.13,.756,-1.917],.003,"brass",6),n.box(.011,.005,.003,.134,.756,-1.925,"brass"),n.cyl(.015,.015,.004,.16,.756,-1.97,"teal",[0,0,0],12),n.at([-2.69,.738,-1.73],[0,.18,0],()=>{for(const i of[-.1,.1])n.box(.042,.023,.07,i,.012,0,"oak",.005);n.sphere(.2,.044,.069,0,.05,0,"darkWood"),n.box(.22,.035,.1,0,.086,0,"oak",.007),n.box(.038,.04,.05,.07,.125,0,"clay",.004),n.rod([-.07,.085,0],[-.07,.27,0],.006,"oak"),n.add(new gn(.12,.14),"linen",[-.002,.2,.005],[0,.1,-.13]),n.rod([-.24,.06,.03],[.23,.06,.03],.005,"brass")}),n.at([-2.53,.944,-1.98],[-.13,.08,0],()=>{Bi(n,.27,.29,0,0,0,"family","oak"),n.box(.02,.14,.07,0,-.13,-.08,"darkWood",.005,[.35,0,0])}),tl(n,-2.84,.74,-1.97,.65),n.at([-.9,0,1.05],[0,0,0],()=>{n.box(1.49,.45,.55,0,.25,0,"darkWood",.03),n.box(1.53,.065,.59,0,.51,0,"oak",.025);for(let i of[-1,1])n.box(.07,.45,.012,i*.47,.27,.285,"leather"),n.box(.07,.015,.58,i*.47,.553,0,"leather"),n.box(.092,.06,.02,i*.47,.43,.297,"brass",.006),n.box(.028,.43,.05,i*.72,.26,.27,"iron",.004);n.box(.14,.13,.015,0,.39,.298,"brass",.012),n.torus(.052,.009,0,.35,.321,"iron",[0,0,0],Math.PI),n.box(.18,.043,.035,0,.27,.319,"iron",.008),n.surface(22,24,(i,r)=>{let s=-.55+i*.72,o=-.25+r*.78,a=.57-Math.max(0,o-.26)*1;return[s,a+Math.sin(i*22+r)*.012,o]},"rose")}),n.collider(-.9,1.05,1.55,.63,"travel trunk"),pn(n,-.9,1.05,1.8,.9,.031);for(let i=0;i<4;i++)n.line([[-.13-i*.03,.547,1.24+i*.009],[-.19-i*.028,.547,1.245+i*.011]],.002,"lightWood",3);n.at([-2.7,0,1.77],[0,Math.PI/2,0],()=>{for(let i of[-.39,.39])for(let r of[-.2,.2])n.box(.06,.42,.06,i,.21,r,"oak",.01);n.box(.95,.06,.56,0,.44,0,"oak",.025),n.box(.9,.08,.51,0,.51,0,"olive",.025),n.surface(26,18,(i,r)=>{let s=(i-.5)*.88,o=(r-.5)*.62,a=.57-Math.max(0,o-.2)*2.2;return[s,a+Math.sin(i*18)*.016,o]},"ochre"),n.torus(.094,.009,-.24,.6,-.03,"oak",[-Math.PI/2,.13,0]),n.cyl(.039,.039,.077,.25,.6,-.09,"rose");for(let i of[.56,.64])n.cyl(.053,.053,.013,.25,i,-.09,"lightWood");n.rod([.12,.58,.06],[.27,.6,.11],.002,"brass")}),n.collider(-2.7,1.77,.6,1,"mending bench"),pn(n,-2.7,1.77,.9,1.3),n.at([-2.7,0,1.77],[0,Math.PI/2,0],()=>{n.torus(.094,.007,-.24,.6,-.03,"darkWood",[-Math.PI/2,.13,0]),n.add(new Do(.085,24),"linen",[-.24,.598,-.03],[-Math.PI/2,0,0]);for(let i=0;i<5;i++)n.line([[-.27+i*.014,.604,-.058],[-.255+i*.014,.604,-.015]],.0015,"teal",3);n.line([[.25,.575,-.09],[.18,.591,.01],[.14,.59,.13],[.08,.58,.17]],.002,"rose",18)});for(let i of[-1,1])n.at([.23+i*.12,0,.68],[0,.1+i*.1,0],()=>{n.box(.15,.022,.27,0,.025,0,"leatherDark",.027),n.sphere(.075,.043,.104,0,.057,-.05,"cream")});n.at([1.73,0,-2.82],[0,0,0],()=>{n.box(1.47,.065,.29,0,1.58,0,"oak",.014);for(let i of[-1,1])n.box(.055,.27,.14,i*.52,1.44,-.02,"iron",.012),n.rod([i*.52,1.32,-.1],[i*.52,1.54,.11],.009,"iron");for(let i=0;i<4;i++)nc(n,-.57+i*.1,1.76,0,.074,.28,.16,["teal","ochre","clay","olive"][i],.03);tl(n,.48,1.615,0,.63),n.sphere(.09,.13,.09,.16,1.74,.01,"ceramic",16),n.cyl(.088,.088,.025,.16,1.88,.01,"oak")}),Bi(n,.82,.56,1.7,2.2,-2.79,"portrait","oak"),n.at([2.19,0,3.22],[0,Math.PI,0],()=>{n.box(1.17,.12,.06,0,1.72,0,"oak",.01);for(let i of[-.42,0,.42])n.line([[i,1.72,.035],[i,1.62,.11],[i,1.65,.15]],.011,"brass",8),n.sphere(.018,.018,.018,i,1.65,.15,"brass");P0(n,-.31,.91,.14,0),n.surface(16,26,(i,r)=>[.23+(i-.5)*.18,1.7-r*.87,.15+Math.sin(r*8+i*7)*.018],"clay")}),n.cyl(.095,.065,.18,-3.03,1.2,-1.9,"clay"),n.cyl(.086,.086,.012,-3.03,1.296,-1.9,"darkWood");for(let i=0;i<12;i++){let r=i*2.399,s=-3.03+Math.cos(r)*.12,o=-1.9+Math.sin(r)*.12,a=1.45+it()*.16;n.rod([-3.03,1.27,-1.9],[s,a,o],.003,"stem"),n.sphere(.035,.075,.012,s,a,o,"leaf",8)}n.sphere(.072,.13,.072,-3.04,1.24,-.33,"glaze",20),n.cyl(.037,.035,.09,-3.04,1.38,-.33,"glaze"),n.torus(.068,.012,-3.08,1.32,-.33,"glaze",[0,0,0]),n.sphere(.12,.025,.12,-3.05,1.107,-.73,"ceramic",20);for(let i=0;i<6;i++)n.sphere(Be(.015,.024),.012,Be(.014,.022),-3.05+Be(-.07,.07),1.13,-.73+Be(-.06,.06),i%2?"oak":"ink",10);n.at([2.7,0,.05],[0,-Math.PI/2,0],()=>{for(let i of[-.45,.45])for(let r of[-.17,.17])n.box(.055,.77,.055,i,.395,r,"oak",.011);n.box(1.1,.058,.47,0,.805,0,"oak",.016),n.box(1,.045,.39,0,.2,0,"darkWood",.011),n.box(1.03,.09,.028,0,.73,.205,"darkWood",.009),n.lathe([[0,.018],[.06,.01],[.14,.025],[.2,.1],[.215,.14],[.222,.15],[.208,.156],[.192,.135],[.17,.095],[.1,.058],[0,.055]],-.12,.838,.015,"ceramic",32),n.torus(.212,.007,-.12,.986,.015,"glaze",[Math.PI/2,0,0]),n.cyl(.16,.16,.003,-.12,.935,.015,"glaze",[0,0,0],32),n.lathe([[0,0],[.07,0],[.105,.04],[.122,.17],[.108,.25],[.061,.32],[.045,.41],[.065,.435],[.054,.444],[.034,.42],[.034,.33],[.08,.25],[.085,.1],[0,.05]],.33,.838,-.015,"glaze",28),n.torus(.087,.013,.436,1.062,-.015,"glaze",[0,0,0]),n.box(.12,.022,.06,.37,.857,.16,"lightWood",.015);for(let i=0;i<8;i++)n.box(.005,.029,.048,.32+i*.012,.865,.162,"leatherDark",.002);n.rod([-.47,.64,.3],[.06,.64,.3],.013,"brass");for(let i of[-.47,.06])n.rod([i,.64,.19],[i,.64,.3],.01,"brass");n.surface(20,28,(i,r)=>{let s=.64-r*.34;return[-.35+i*.28,s,.32+Math.sin(r*9+i*15)*.01]},"linen");for(let i=0;i<10;i++)n.line([[-.347+i*.028,.3,.326],[-.347+i*.028,.267,.33]],.002,"cream",3);n.lathe([[0,0],[.12,0],[.15,.24],[.153,.265],[.136,.265],[.122,.03],[0,.028]],.15,.225,0,"copper",24),n.torus(.133,.008,.15,.52,0,"iron",[0,0,0],Math.PI),n.box(.35,.07,.25,-.29,.255,-.03,"linen",.023),n.box(.14,.026,.068,-.29,.307,-.025,"cream",.01)}),n.collider(2.7,.05,.54,1.14,"washstand"),pn(n,2.7,.05,.82,1.45),n.at([2.965,0,.06],[0,-Math.PI/2,0],()=>{Bi(n,.52,.64,0,1.7,0,"paper","oak");for(let i=0;i<4;i++){const r=-.17+i*.11;n.line([[r,1.46,.05],[r+.02,1.72,.05],[r-.02,1.91,.05]],.003,"stem",8),n.sphere(.018,.042,.007,r,1.86,.053,"leaf",8),n.sphere(.02,.045,.007,r+.01,1.67,.053,"leaf",8)}n.box(.75,.068,.05,0,2.17,0,"oak",.009);for(let i of[-.27,0,.27])n.line([[i,2.17,.026],[i,2.1,.065],[i,2.12,.095]],.007,"brass",8)})}function rl(n,e,t){n.box(.55,.075,.49,e,.7,t,"oak",.016),n.box(.48,.51,.43,e,.415,t,"darkWood",.012),n.box(.43,.16,.026,e,.565,t+.225,"oak",.009),n.box(.43,.2,.026,e,.344,t+.225,"oak",.009);for(let i of[.34,.56])n.box(.06,.026,.016,e,i,t+.248,"brass",.006),n.torus(.023,.004,e,i-.014,t+.26,"brass",[0,0,0],Math.PI);for(const i of[-1,1])for(const r of[-1,1])n.box(.051,.13,.051,e+i*.205,.085,t+r*.17,"oak",.008);n.collider(e,t,.59,.54,"bedside cabinet"),pn(n,e,t,.85,.73)}function O0(n){n.box(.07,2.44,2.93,5.91,1.26,1.79,"darkWood",.01);for(const r of[.31,1.96,3.25])n.box(.72,2.43,.07,5.56,1.26,r,"oak",.013),n.box(.09,2.48,.11,5.19,1.26,r,"darkWood",.012),n.box(.11,.08,.13,5.19,2.47,r,"lightWood",.012);for(const r of[.12,2.44])n.box(.77,.075,3.02,5.54,r,1.79,"oak",.014),n.box(.06,.055,3.03,5.19-.04,r+.01,1.79,"lightWood",.006);n.rod([5.55,2.18,.42],[5.55,2.18,1.86],.018,"brass");for(const r of[.42,1.86])n.box(.025,.12,.09,5.55,2.18,r,"iron",.005);for(const[r,s,o]of[[0,"olive",1.15],[1,"navy",1.08],[2,"linen",.92],[3,"clay",1.03],[4,"teal",1.29]])D0(n,5.55,1.92,.58+r*.255,s,o,r===4?-.48:-.08+r*.035);for(let r=0;r<3;r++)Li(n,5.54,2.49+r*.07,.91,.47,.63,["cream","olive","clay"][r],Math.PI/2);n.box(.52,.25,.69,5.56,2.59,2.54,"cream",.025),n.box(.018,.25,.69,5.37,2.59,2.54,"leather"),n.box(.018,.25,.69,5.75,2.59,2.54,"leather"),n.box(.006,.067,.11,5.293,2.59,2.54,"paper",.005),n.box(.71,.065,1.56,5.56,.23,1.13,"oak",.012);for(let r=0;r<2;r++)nl(n,5.5,.263,.69+r*.235,Math.PI/2,"leather"),nl(n,5.66,.263,1.34+r*.23,Math.PI/2,"leatherDark");for(const r of[.51,.96,1.42,1.9])n.box(.71,.055,1.21,5.56,r,2.6,"oak",.009),n.box(.028,.048,1.2,5.19,r,2.6,"lightWood",.004);for(let r=0;r<2;r++)for(let s=0;s<3;s++)Li(n,5.54,1.46+s*.075,2.28+r*.61,.51,.46,["linen","clay","olive"][(s+r)%3],Math.PI/2);for(let r=0;r<2;r++)for(let s=0;s<3;s++)Li(n,5.55,1+s*.07,2.27+r*.61,.51,.46,["teal","cream","ochre"][(s+r)%3],Math.PI/2);for(let r=0;r<3;r++)n.cyl(.085,.085,.4,5.51,1.99,2.26+r*.31,["cream","rose","ochre"][r],[0,0,Math.PI/2],16),n.torus(.088,.007,5.3,1.99,2.26+r*.31,"leather",[0,Math.PI/2,0]);for(const r of[.51,.96,1.42,1.9])for(const s of[2.04,3.15])n.sphere(.009,.009,.009,5.27,r-.033,s,"brass",8);for(const r of[2.26,2.57,2.88])n.torus(.052,.003,5.303,1.99,r,"cream",[0,Math.PI/2,0]),n.torus(.025,.003,5.3,1.99,r,"cream",[0,Math.PI/2,0]);for(const r of[2.27,2.91]){n.box(.54,.27,.48,5.52,.68,r,"cream",.021);for(let s=0;s<8;s++)n.box(.007,.25,.48,5.255+s*.075,.68,r,"ochre",.002),n.box(.53,.008,.5,5.52,.565+s*.031,r,"ochre",.002);n.box(.011,.046,.1,5.239,.72,r,"leatherDark",.01)}for(const r of[2.29,2.91])n.box(.66,.23,.54,5.51,.3,r,"oak",.009),n.box(.055,.045,.12,5.16,.3,r,"brass",.006),n.box(.006,.07,.13,5.16,.4,r,"paper",.003);n.collider(5.58,1.79,.87,3.05,"open wardrobe"),pn(n,5.58,1.79,1.14,3.4),n.at([4.19,0,2.98],[0,0,0],()=>{for(let r of[-1,1])for(let s of[-1,1])n.box(.055,.38,.055,r*.42,.2,s*.18,"oak",.008);n.box(1,.055,.48,0,.42,0,"oak",.016),n.box(.95,.038,.43,0,.463,0,"clay",.014),Li(n,-.25,.484,0,.39,.34,"linen",-.08),Li(n,-.25,.563,0,.33,.27,"olive",.04),n.box(.13,.035,.055,.26,.51,.1,"darkWood",.012);for(let r=0;r<7;r++)for(let s=0;s<3;s++)n.rod([.205+r*.016,.49,.09+s*.014],[.205+r*.016,.47,.09+s*.014],.002,"cream",4)}),n.collider(4.19,2.98,1.06,.54,"dressing bench"),pn(n,4.19,2.98,1.4,.85);const i=new ko({color:"#a5b8af",metalness:.83,roughness:.19});n.at([3.245,0,2.98],[0,Math.PI/2,0],()=>{Bi(n,.48,1.22,0,1.64,0,i,"oak"),n.box(.37,.032,.1,0,1.05,.07,"oak",.009),n.cyl(.027,.027,.08,-.12,1.104,.07,"glaze"),n.box(.09,.014,.04,.06,1.08,.08,"brass",.004)}),n.at([4.36,1.89,3.25],[.3,0,0],()=>{n.sphere(.19,.1,.16,0,0,0,"ochre",18),n.cyl(.245,.245,.023,0,-.041,0,"ochre",[0,0,0],24),n.torus(.157,.012,0,-.007,0,"leather",[Math.PI/2,0,0]),n.line([[.04,.06,.08],[.08,.13,.12],[.09,.21,.1]],.004,"cream",10)}),n.at([3.25,0,.57],[0,Math.PI/2,0],()=>{n.box(.39,.11,.06,0,1.65,0,"oak",.006);for(const r of[-.1,.1])n.line([[r,1.66,.035],[r,1.59,.09],[r,1.63,.11]],.008,"brass",8);n.line([[-.1,1.6,.09],[-.22,1.22,.13],[-.1,.87,.13],[.07,1.19,.13],[-.1,1.6,.09]],.021,"leather",24),n.box(.12,.09,.02,-.13,1.4,.16,"brass",.01)}),n.box(1.1,.01,2.25,4.19,.019,1.51,"rug",.003)}function B0(n){n.box(2.22,.075,.79,4.68,.825,-2.46,"oak",.014);for(let i of[-1,1]){let r=4.68+i*.8;n.box(.065,.71,.51,r,.42,-2.46,"darkWood",.012),n.box(.27,.055,.68,r,.048,-2.46,"oak",.012),n.box(.3,.048,.6,r,.767,-2.46,"oak",.008),n.cyl(.023,.023,.014,r+.04,.66,-2.46+.272,"lightWood",[Math.PI/2,0,0])}n.box(1.69,.084,.06,4.68,.29,-2.46,"oak",.012),n.box(.065,.14,.033,4.68-.75,.29,-2.46+.047,"lightWood",.006),n.box(.065,.14,.033,4.68+.75,.29,-2.46+.047,"lightWood",.006);for(let i=0;i<7;i++){let r=4.68+Be(-1.04,1.04);n.line([[r,.865,-2.46+.355],[r+Be(.025,.08),.865,-2.46+.354]],.0018,"lightWood",3)}for(const i of[4.68-.95,4.68+.95])for(const r of[-2.46-.25,-2.46+.25])n.cyl(.006,.006,.003,i,.865,r,"darkWood",[0,0,0],8);n.box(.57,.15,.55,4.68-.59,.7,-2.46,"darkWood",.01),n.box(.55,.145,.025,4.68-.59,.7,-2.46+.292,"oak",.008),n.torus(.028,.005,4.68-.59,.68,-2.46+.313,"brass",[0,0,0],Math.PI),n.torus(.071,.0015,4.68-.87,.866,-2.46+.2,"darkWood",[Math.PI/2,0,0]),n.torus(.067,.001,4.68-.867,.866,-2.46+.198,"edge",[Math.PI/2,0,0]),n.collider(4.68,-2.46,2.26,.86,"map desk"),pn(n,4.68,-2.46,2.65,1.1),n.surface(42,34,(i,r)=>{let s=(i-.5)*1.31,o=(r-.5)*.61,a=.879+.004*Math.sin(i*12+r*7)+.04*Math.pow(Math.abs(i-.5)*2,16);return[4.68+s,a,-2.46+o]},"map");for(const i of[[-.53,.2],[.54,-.2]])n.sphere(.035,.017,.028,4.68+i[0],.911,-2.46+i[1],"ink",10);for(const i of[[-.28,.14],[.04,-.02],[.31,-.17]])n.cyl(.005,.005,.045,4.68+i[0],.906,-2.46+i[1],"brass",[0,0,0],6),n.sphere(.017,.016,.017,4.68+i[0],.933,-2.46+i[1],"redWax",8);n.line([[4.68-.28,.939,-2.46+.14],[4.68-.13,.94,-2.46+.07],[4.68+.04,.939,-2.46-.02],[4.68+.31,.939,-2.46-.17]],.0025,"redWax",12),n.rod([4.68+.2,.95,-2.46+.28],[4.68+.29,.9,-2.46+.15],.008,"brass"),n.rod([4.68+.2,.95,-2.46+.28],[4.68+.1,.9,-2.46+.19],.008,"brass"),n.sphere(.013,.013,.01,4.68+.2,.953,-2.46+.28,"brass"),n.cyl(.082,.082,.027,4.68-.87,.882,-2.46+.08,"brass",[0,0,0],24),n.cyl(.069,.069,.005,4.68-.87,.899,-2.46+.08,"cream",[0,0,0],24);for(let i=0;i<8;i++){let r=i*Math.PI/4;n.rod([4.68-.87+Math.sin(r)*.049,.904,-2.46+.08+Math.cos(r)*.049],[4.68-.87+Math.sin(r)*.065,.904,-2.46+.08+Math.cos(r)*.065],.0025,"ink",4)}n.rod([4.68-.895,.91,-2.46+.13],[4.68-.845,.91,-2.46+.03],.004,"redWax"),n.cyl(.078,.078,.012,4.68-.87,.95,-2.46-.02,"brass",[Math.PI*.38,0,0],24),n.at([4.68+.88,.865,-2.46+.11],[0,.12,0],()=>{for(let i=0;i<4;i++)n.box(.24,.006,.17,0,.005+i*.008,0,"paper",.003,[0,i*.02,0]);n.box(.26,.012,.016,0,.04,0,"rose",.002),n.sphere(.021,.004,.022,.035,.051,0,"redWax",12),n.box(.025,.008,.16,0,.042,0,"rose",.002)}),Go(n,4.68+.935,.919,-2.46+.114,.12,"brass",[-Math.PI/2,0,0]),n.cyl(.04,.047,.082,4.68+.85,.905,-2.46-.2,"ink",[0,0,0],16),n.cyl(.042,.042,.016,4.68+.85,.953,-2.46-.2,"brass"),n.rod([4.68+.85,.958,-2.46-.2],[4.68+.89,1.23,-2.46-.22],.003,"cream"),n.surface(8,18,(i,r)=>[4.68+.885+(i-.5)*.06*Math.sin(r*Math.PI),1.12+r*.17,-2.46-.22+Math.sin(r*2)*.014],"linen"),rc(n,4.68-.87,.866,-2.46-.24,"glaze",.062),ic(n,4.68-.36,.9,-2.46-.27,.3,.17,.055,"teal",.04),n.cyl(.032,.032,.34,4.68+.42,.906,-2.46-.3,"paper",[0,0,Math.PI/2],16);for(const i of[-1,1])n.sphere(.043,.043,.043,4.68+.42+i*.19,.906,-2.46-.3,"oak");L0(n,4.55,-1.34,-.08),n.at([5.68,0,-.76],[0,-Math.PI/2,0],()=>{n.box(.95,1.17,.33,0,.6,-.04,"darkWood",.01);for(let i of[.08,.43,.81,1.19])n.box(1.01,.038,.39,0,i,0,"oak",.007);for(let i of[-.48,0,.48])n.box(.035,1.13,.38,i,.62,0,"oak");for(let i=0;i<4;i++)nc(n,-.41+i*.09,1.01,.09,.068,.32,.23,["clay","olive","ochre","teal"][i],.04);for(let i=0;i<3;i++)n.cyl(.043,.043,.27,.12+i*.105,.51,.04,"paper",[Math.PI/2,0,0],12),n.torus(.041,.004,.12+i*.105,.51,.185,"leather");n.box(.33,.22,.29,-.23,.225,.02,"leather",.018),n.box(.09,.039,.018,-.23,.27,.175,"brass",.004),sc(n,.21,1.21,0,.68)}),n.collider(5.71,-.76,.51,1.09,"study cubbies"),pn(n,5.71,-.76,.75,1.4),n.at([5.85,0,-1.81],[0,-Math.PI/2,0],()=>{n.box(1.06,.75,.06,0,1.84,0,"darkWood",.018),n.box(.97,.66,.02,0,1.84,.04,"cream",.005);for(const[i,r,s,o,a]of[[-.24,1.91,.35,.43,-.08],[.24,1.98,.38,.31,.09],[.21,1.64,.31,.22,-.12]])n.add(new gn(s,o),"map",[i,r,.061],[0,0,a]),n.sphere(.013,.013,.009,i,r+o*.4,.075,"brass",8);n.line([[-.25,2.07,.083],[.2,2.04,.083],[.21,1.72,.083],[-.32,1.77,.083]],.003,"redWax",15)}),n.at([3.97,1.81,-2.83],[Math.PI/2,0,0],()=>{n.cyl(.205,.205,.018,0,0,0,"oak",[0,0,0],32),n.cyl(.175,.175,.021,0,.009,0,"brass",[0,0,0],32),n.cyl(.155,.155,.024,0,.015,0,"cream",[0,0,0],32);for(let i=0;i<16;i++){let r=i*Math.PI/8;n.rod([Math.sin(r)*.126,.03,Math.cos(r)*.126],[Math.sin(r)*.151,.03,Math.cos(r)*.151],.0025,"ink",4)}n.rod([-.07,.033,.095],[.09,.033,-.12],.007,"brass")}),n.lathe([[0,0],[.15,0],[.19,.36],[.193,.37],[.17,.37],[.135,.025],[0,.025]],3.62,.017,-2.66,"leather",24),n.torus(.19,.012,3.62,.386,-2.66,"brass",[Math.PI/2,0,0]);for(let i=0;i<5;i++){const r=3.62+Be(-.1,.1),s=-2.66+Be(-.1,.1);n.cyl(.045,.045,Be(.55,.76),r,.6,s,"paper",[Be(-.1,.1),0,Be(-.12,.12)],12)}n.collider(3.62,-2.66,.46,.44,"map-roll basket"),n.at([4.58,2.62,-.115],[0,Math.PI,0],()=>{Bi(n,.6,.28,0,0,0,"paper","oak");for(let i=0;i<3;i++)n.rod([-.18+i*.18,-.1,.05],[-.15+i*.18,.09,.05],.003,"stem"),n.sphere(.02,.034,.006,-.16+i*.18,.06,.056,"leaf",8)})}function Rs(n,e,t,i,r=0){n.at([e,t,i],[0,r,0],()=>{n.box(.14,.23,.04,0,0,0,"brass",.035),n.line([[0,-.05,.015],[0,-.1,.18],[0,.01,.21]],.012,"brass",10),n.cyl(.1,.15,.17,0,.18,.21,"cream",[0,0,0],20),n.sphere(.042,.032,.042,0,.084,.21,"flame",12),n.cyl(.08,.07,.024,0,.086,.21,"brass")})}function z0(){const n=new Gu;n.background=new qe("#b9c5bc"),n.fog=new Po("#d9ccb2",13,24);const e=R0();e.contact=U0();const t=new w0(n,e);N0(t),F0(t),O0(t),B0(t),Rs(t,.76,1.94,-2.84),Rs(t,4.44,2.04,3.25,Math.PI),Rs(t,3.24,1.85,-.53,Math.PI/2);const i=t.finish();n.add(new Ah("#d8e5df","#705238",1.5)),n.add(new Ph("#ead9bb",.27));const r=new wh("#ffe3b1",3.5);r.position.set(-8,4.2,1.3),r.target.position.set(.1,.3,-.55),r.castShadow=!0,r.shadow.mapSize.set(2048,2048),r.shadow.camera.left=-6.5,r.shadow.camera.right=6.5,r.shadow.camera.top=5,r.shadow.camera.bottom=-5,r.shadow.camera.near=.5,r.shadow.camera.far=20,r.shadow.bias=-25e-5,r.shadow.normalBias=.025,r.shadow.radius=2,n.add(r,r.target);for(const[a,l,c,u]of[[.76,2,-2.57,4],[4.44,2.11,3.03,3],[3.48,1.9,-.53,2],[.4,1.03,-1.94,1.3],[5.65,1.44,-.93,1.2]]){const h=new _s("#ffc780",u,4.2,2);h.position.set(a,l,c),n.add(h)}const s=new _s("#b7ced6",2.6,8,2);s.position.set(-2.8,2.18,-.7),n.add(s);const o=new _s("#e7e4c9",3.2,5,2);return o.position.set(4.85,2.17,-2.5),n.add(o),{scene:n,colliders:i.colliders,sun:r,stats:{sourceParts:i.parts,staticBatches:i.batches},materials:e}}const oc=.205,ac=1.62,Bn={x:.56,y:ac,z:2.82,yaw:.39,pitch:-.1};function k0(n,e,t,i=oc){const r=Math.max(t.minX,Math.min(t.maxX,n)),s=Math.max(t.minZ,Math.min(t.maxZ,e));return(n-r)**2+(e-s)**2<i*i}function sl(n,e,t,i=oc){return!t.some(r=>k0(n,e,r,i))}function H0(n,e,t,i){const r=Math.max(1,Math.ceil(Math.hypot(e,t)/.07));for(let s=0;s<r;s++){const o=n.x+e/r;sl(o,n.z,i)&&(n.x=o);const a=n.z+t/r;sl(n.x,a,i)&&(n.z=a)}return n}class V0{constructor(e,t,i,r){this.camera=e,this.canvas=t,this.colliders=i,this.onLock=r,this.keys=new Set,this.yaw=Bn.yaw,this.pitch=Bn.pitch,this.sensitivity=1,this.locked=!1,this.walkPhase=0,this.speed=0,this.lastRoom="",this.camera.rotation.order="YXZ",this.reset(),this.keydown=s=>{["KeyW","KeyA","KeyS","KeyD","ArrowUp","ArrowDown","ArrowLeft","ArrowRight","ShiftLeft","ShiftRight","KeyR"].includes(s.code)&&this.locked&&(s.preventDefault(),this.keys.add(s.code),s.code==="KeyR"&&this.reset())},this.keyup=s=>this.keys.delete(s.code),this.look=s=>{this.locked&&(this.yaw-=s.movementX*.00165*this.sensitivity,this.pitch=Math.max(-1.42,Math.min(1.42,this.pitch-s.movementY*.00165*this.sensitivity)),this.applyLook())},this.lockChange=()=>{this.locked=document.pointerLockElement===this.canvas,this.keys.clear(),this.speed=0,r(this.locked)},this.blur=()=>{this.keys.clear(),this.speed=0,document.pointerLockElement&&document.exitPointerLock()},document.addEventListener("keydown",this.keydown),document.addEventListener("keyup",this.keyup),document.addEventListener("mousemove",this.look),document.addEventListener("pointerlockchange",this.lockChange),window.addEventListener("blur",this.blur),document.addEventListener("visibilitychange",()=>{document.hidden&&this.blur()})}applyLook(){this.camera.rotation.set(this.pitch,this.yaw,0,"YXZ")}reset(){this.camera.position.set(Bn.x,Bn.y,Bn.z),this.yaw=Bn.yaw,this.pitch=Bn.pitch,this.walkPhase=0,this.speed=0,this.keys.clear(),this.applyLook()}async capture(){try{await this.canvas.requestPointerLock()}catch{document.getElementById("lock-message").textContent="Mouse capture was blocked. Try opening the launch address directly in a desktop browser."}}update(e){if(!this.locked)return;let t=Number(this.keys.has("KeyW")||this.keys.has("ArrowUp"))-Number(this.keys.has("KeyS")||this.keys.has("ArrowDown")),i=Number(this.keys.has("KeyD")||this.keys.has("ArrowRight"))-Number(this.keys.has("KeyA")||this.keys.has("ArrowLeft")),r=t||i,s=r?this.keys.has("ShiftLeft")||this.keys.has("ShiftRight")?2.5:1.55:0;if(this.speed=mu.damp(this.speed,s,14,e),r){let o=Math.hypot(i,t);t/=o,i/=o;const a=Math.sin(this.yaw),l=Math.cos(this.yaw);H0(this.camera.position,(i*l-t*a)*this.speed*e,(-t*l-i*a)*this.speed*e,this.colliders),this.walkPhase+=e*this.speed*5.4}this.camera.position.y=ac+Math.sin(this.walkPhase)*.004*Math.min(this.speed,1)}dispose(){document.removeEventListener("keydown",this.keydown),document.removeEventListener("keyup",this.keyup),document.removeEventListener("mousemove",this.look),document.removeEventListener("pointerlockchange",this.lockChange),window.removeEventListener("blur",this.blur)}}const ct=n=>document.getElementById(n);let pt,Ct,ol,En,Lr=0,br=0,al=0,ll=!1,cl=0;const Tr=new Float32Array(180);let Cs=0,ws=0;function ul(n){ct("error").classList.remove("hidden"),ct("error").textContent=n}try{let e=function(){const r=ct("quality").value,s=r==="high"?1.75:r==="low"?1:1.35,a=Math.sqrt((r==="high"?45e5:r==="low"?13e5:25e5)/(window.innerWidth*window.innerHeight));pt.setPixelRatio(Math.min(window.devicePixelRatio||1,s,a)),pt.setSize(window.innerWidth,window.innerHeight,!1),En.aspect=window.innerWidth/window.innerHeight,En.updateProjectionMatrix()},t=function(){const r=ct("quality").value;n.sun.shadow.mapSize.set(r==="high"?3072:r==="low"?1024:2048,r==="high"?3072:r==="low"?1024:2048),n.sun.shadow.map&&(n.sun.shadow.map.dispose(),n.sun.shadow.map=null),pt.shadowMap.needsUpdate=!0,e()},i=function(r){if(Lr=requestAnimationFrame(i),document.hidden){br=0;return}const s=br?r-br:16.67;br=r;const o=Math.min(s/1e3,.05);if(Ct.update(o),al+=o,pt.render(ol,En),Ct.locked){let a=En.position.x<3.1?"Mira's bedroom":En.position.z>0?"The walk-in wardrobe":"The map study";a!==Ct.lastRoom&&(ct("room-name").textContent=a,Ct.lastRoom=a)}if(al>18&&(ct("hint").style.opacity=".45"),s>0&&s<500&&(Tr[ws]=s,ws=(ws+1)%Tr.length,Cs=Math.min(Cs+1,Tr.length)),ct("metrics-toggle").checked&&r-cl>500){cl=r;const a=Array.from(Tr.subarray(0,Cs)).sort((u,h)=>u-h),l=a.reduce((u,h)=>u+h,0)/Math.max(1,a.length),c=a[Math.floor((a.length-1)*.95)]||0;ct("metrics").innerHTML=`Live browser frame timing<br />Mean ${l.toFixed(1)} ms · p95 ${c.toFixed(1)} ms<br />${pt.info.render.calls} draw calls · ${(pt.info.render.triangles/1e3).toFixed(0)}k triangles<br />${pt.domElement.width} × ${pt.domElement.height}<br /><span style="opacity:.65">Includes display scheduling</span>`}};var G0=e,W0=t,X0=i;pt=new m0({canvas:ct("scene"),antialias:!0,alpha:!1,powerPreference:"high-performance"}),pt.outputColorSpace=wt,pt.toneMapping=pl,pt.toneMappingExposure=1.08,pt.shadowMap.enabled=!0,pt.shadowMap.type=fl;const n=z0();ol=n.scene,En=new Ft(65,1,.065,28),Ct=new V0(En,ct("scene"),n.colliders,r=>{ll&&(ct("pause").classList.toggle("hidden",r),ct("hud").classList.toggle("hidden",!r))}),e(),window.addEventListener("resize",e),pt.shadowMap.autoUpdate=!1,pt.shadowMap.needsUpdate=!0,ct("quality").addEventListener("change",t),ct("sensitivity").addEventListener("input",()=>Ct.sensitivity=Number(ct("sensitivity").value)),ct("enter").addEventListener("click",()=>{ll=!0,ct("veil").classList.add("hidden"),ct("pause").classList.remove("hidden"),Ct.capture()}),ct("resume").addEventListener("click",()=>Ct.capture()),ct("reset").addEventListener("click",()=>{Ct.reset(),Ct.capture()}),ct("metrics-toggle").addEventListener("change",()=>{ct("metrics").classList.toggle("hidden",!ct("metrics-toggle").checked)}),document.addEventListener("pointerlockerror",()=>{ct("lock-message").textContent="Mouse capture was blocked. Click Keep exploring again, or open this scene directly in a desktop browser."}),ct("scene").addEventListener("webglcontextlost",r=>{r.preventDefault(),cancelAnimationFrame(Lr),document.pointerLockElement&&document.exitPointerLock(),ul("The graphics context was interrupted. Reload this page to return to the entrance.")}),Lr=requestAnimationFrame(i),window.larkspur={version:"1.0.0",get position(){return En.position.toArray()},get geometry(){return n.stats},get renderInfo(){return{calls:pt.info.render.calls,triangles:pt.info.render.triangles}},reset:()=>Ct.reset()}}catch(n){ul(`The room could not initialize. ${n.message}. This scene requires a desktop browser with WebGL 2 enabled.`),console.error(n)}window.addEventListener("pagehide",()=>{cancelAnimationFrame(Lr),Ct==null||Ct.dispose(),pt==null||pt.dispose()});

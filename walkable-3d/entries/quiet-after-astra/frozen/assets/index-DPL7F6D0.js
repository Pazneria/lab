(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=e(r);fetch(r.href,s)}})();/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const oa="180",au=0,Va=1,lu=2,sc=1,oc=2,wn=3,Yn=0,ze=1,Be=2,Xn=0,Ni=1,Wa=2,Xa=3,qa=4,cu=5,ri=100,uu=101,hu=102,fu=103,du=104,pu=200,mu=201,gu=202,_u=203,lo=204,co=205,vu=206,xu=207,Mu=208,Su=209,yu=210,Eu=211,Tu=212,bu=213,Au=214,uo=0,ho=1,fo=2,Oi=3,po=4,mo=5,go=6,_o=7,ac=0,wu=1,Ru=2,qn=0,Cu=1,Pu=2,Lu=3,lc=4,Du=5,Uu=6,Iu=7,cc=300,Bi=301,zi=302,vo=303,xo=304,ds=306,is=1e3,oi=1001,Mo=1002,hn=1003,Nu=1004,br=1005,gn=1006,bs=1007,ai=1008,vn=1009,uc=1010,hc=1011,cr=1012,aa=1013,ui=1014,Cn=1015,xr=1016,la=1017,ca=1018,ur=1020,fc=35902,dc=35899,pc=1021,mc=1022,un=1023,hr=1026,fr=1027,gc=1028,ua=1029,_c=1030,ha=1031,fa=1033,Kr=33776,$r=33777,jr=33778,Qr=33779,So=35840,yo=35841,Eo=35842,To=35843,bo=36196,Ao=37492,wo=37496,Ro=37808,Co=37809,Po=37810,Lo=37811,Do=37812,Uo=37813,Io=37814,No=37815,Fo=37816,Oo=37817,Bo=37818,zo=37819,ko=37820,Ho=37821,Go=36492,Vo=36494,Wo=36495,Xo=36283,qo=36284,Yo=36285,Zo=36286,Fu=3200,Ou=3201,vc=0,Bu=1,Vn="",Oe="srgb",ki="srgb-linear",rs="linear",ne="srgb",_i=7680,Ya=519,zu=512,ku=513,Hu=514,xc=515,Gu=516,Vu=517,Wu=518,Xu=519,Za=35044,Ja="300 es",_n=2e3,ss=2001;class Wi{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const r=n[t];if(r!==void 0){const s=r.indexOf(e);s!==-1&&r.splice(s,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const r=n.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,t);t.target=null}}}const Pe=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Ka=1234567;const ir=Math.PI/180,dr=180/Math.PI;function pi(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Pe[i&255]+Pe[i>>8&255]+Pe[i>>16&255]+Pe[i>>24&255]+"-"+Pe[t&255]+Pe[t>>8&255]+"-"+Pe[t>>16&15|64]+Pe[t>>24&255]+"-"+Pe[e&63|128]+Pe[e>>8&255]+"-"+Pe[e>>16&255]+Pe[e>>24&255]+Pe[n&255]+Pe[n>>8&255]+Pe[n>>16&255]+Pe[n>>24&255]).toLowerCase()}function Vt(i,t,e){return Math.max(t,Math.min(e,i))}function da(i,t){return(i%t+t)%t}function qu(i,t,e,n,r){return n+(i-t)*(r-n)/(e-t)}function Yu(i,t,e){return i!==t?(e-i)/(t-i):0}function rr(i,t,e){return(1-e)*i+e*t}function Zu(i,t,e,n){return rr(i,t,1-Math.exp(-e*n))}function Ju(i,t=1){return t-Math.abs(da(i,t*2)-t)}function Ku(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function $u(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function ju(i,t){return i+Math.floor(Math.random()*(t-i+1))}function Qu(i,t){return i+Math.random()*(t-i)}function th(i){return i*(.5-Math.random())}function eh(i){i!==void 0&&(Ka=i);let t=Ka+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function nh(i){return i*ir}function ih(i){return i*dr}function rh(i){return(i&i-1)===0&&i!==0}function sh(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function oh(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function ah(i,t,e,n,r){const s=Math.cos,o=Math.sin,a=s(e/2),c=o(e/2),l=s((t+n)/2),u=o((t+n)/2),h=s((t-n)/2),m=o((t-n)/2),p=s((n-t)/2),g=o((n-t)/2);switch(r){case"XYX":i.set(a*u,c*h,c*m,a*l);break;case"YZY":i.set(c*m,a*u,c*h,a*l);break;case"ZXZ":i.set(c*h,c*m,a*u,a*l);break;case"XZX":i.set(a*u,c*g,c*p,a*l);break;case"YXY":i.set(c*p,a*u,c*g,a*l);break;case"ZYZ":i.set(c*g,c*p,a*u,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function Li(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Ne(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const ts={DEG2RAD:ir,RAD2DEG:dr,generateUUID:pi,clamp:Vt,euclideanModulo:da,mapLinear:qu,inverseLerp:Yu,lerp:rr,damp:Zu,pingpong:Ju,smoothstep:Ku,smootherstep:$u,randInt:ju,randFloat:Qu,randFloatSpread:th,seededRandom:eh,degToRad:nh,radToDeg:ih,isPowerOfTwo:rh,ceilPowerOfTwo:sh,floorPowerOfTwo:oh,setQuaternionFromProperEuler:ah,normalize:Ne,denormalize:Li};class ft{constructor(t=0,e=0){ft.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6],this.y=r[1]*e+r[4]*n+r[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Vt(this.x,t.x,e.x),this.y=Vt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Vt(this.x,t,e),this.y=Vt(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Vt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Vt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),r=Math.sin(e),s=this.x-t.x,o=this.y-t.y;return this.x=s*n-o*r+t.x,this.y=s*r+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Mr{constructor(t=0,e=0,n=0,r=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=r}static slerpFlat(t,e,n,r,s,o,a){let c=n[r+0],l=n[r+1],u=n[r+2],h=n[r+3];const m=s[o+0],p=s[o+1],g=s[o+2],_=s[o+3];if(a===0){t[e+0]=c,t[e+1]=l,t[e+2]=u,t[e+3]=h;return}if(a===1){t[e+0]=m,t[e+1]=p,t[e+2]=g,t[e+3]=_;return}if(h!==_||c!==m||l!==p||u!==g){let d=1-a;const f=c*m+l*p+u*g+h*_,b=f>=0?1:-1,y=1-f*f;if(y>Number.EPSILON){const C=Math.sqrt(y),w=Math.atan2(C,f*b);d=Math.sin(d*w)/C,a=Math.sin(a*w)/C}const M=a*b;if(c=c*d+m*M,l=l*d+p*M,u=u*d+g*M,h=h*d+_*M,d===1-a){const C=1/Math.sqrt(c*c+l*l+u*u+h*h);c*=C,l*=C,u*=C,h*=C}}t[e]=c,t[e+1]=l,t[e+2]=u,t[e+3]=h}static multiplyQuaternionsFlat(t,e,n,r,s,o){const a=n[r],c=n[r+1],l=n[r+2],u=n[r+3],h=s[o],m=s[o+1],p=s[o+2],g=s[o+3];return t[e]=a*g+u*h+c*p-l*m,t[e+1]=c*g+u*m+l*h-a*p,t[e+2]=l*g+u*p+a*m-c*h,t[e+3]=u*g-a*h-c*m-l*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,r){return this._x=t,this._y=e,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,r=t._y,s=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),u=a(r/2),h=a(s/2),m=c(n/2),p=c(r/2),g=c(s/2);switch(o){case"XYZ":this._x=m*u*h+l*p*g,this._y=l*p*h-m*u*g,this._z=l*u*g+m*p*h,this._w=l*u*h-m*p*g;break;case"YXZ":this._x=m*u*h+l*p*g,this._y=l*p*h-m*u*g,this._z=l*u*g-m*p*h,this._w=l*u*h+m*p*g;break;case"ZXY":this._x=m*u*h-l*p*g,this._y=l*p*h+m*u*g,this._z=l*u*g+m*p*h,this._w=l*u*h-m*p*g;break;case"ZYX":this._x=m*u*h-l*p*g,this._y=l*p*h+m*u*g,this._z=l*u*g-m*p*h,this._w=l*u*h+m*p*g;break;case"YZX":this._x=m*u*h+l*p*g,this._y=l*p*h+m*u*g,this._z=l*u*g-m*p*h,this._w=l*u*h-m*p*g;break;case"XZY":this._x=m*u*h-l*p*g,this._y=l*p*h-m*u*g,this._z=l*u*g+m*p*h,this._w=l*u*h+m*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,r=Math.sin(n);return this._x=t.x*r,this._y=t.y*r,this._z=t.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],r=e[4],s=e[8],o=e[1],a=e[5],c=e[9],l=e[2],u=e[6],h=e[10],m=n+a+h;if(m>0){const p=.5/Math.sqrt(m+1);this._w=.25/p,this._x=(u-c)*p,this._y=(s-l)*p,this._z=(o-r)*p}else if(n>a&&n>h){const p=2*Math.sqrt(1+n-a-h);this._w=(u-c)/p,this._x=.25*p,this._y=(r+o)/p,this._z=(s+l)/p}else if(a>h){const p=2*Math.sqrt(1+a-n-h);this._w=(s-l)/p,this._x=(r+o)/p,this._y=.25*p,this._z=(c+u)/p}else{const p=2*Math.sqrt(1+h-n-a);this._w=(o-r)/p,this._x=(s+l)/p,this._y=(c+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Vt(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const r=Math.min(1,e/n);return this.slerp(t,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,r=t._y,s=t._z,o=t._w,a=e._x,c=e._y,l=e._z,u=e._w;return this._x=n*u+o*a+r*l-s*c,this._y=r*u+o*c+s*a-n*l,this._z=s*u+o*l+n*c-r*a,this._w=o*u-n*a-r*c-s*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,r=this._y,s=this._z,o=this._w;let a=o*t._w+n*t._x+r*t._y+s*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=r,this._z=s,this;const c=1-a*a;if(c<=Number.EPSILON){const p=1-e;return this._w=p*o+e*this._w,this._x=p*n+e*this._x,this._y=p*r+e*this._y,this._z=p*s+e*this._z,this.normalize(),this}const l=Math.sqrt(c),u=Math.atan2(l,a),h=Math.sin((1-e)*u)/l,m=Math.sin(e*u)/l;return this._w=o*h+this._w*m,this._x=n*h+this._x*m,this._y=r*h+this._y*m,this._z=s*h+this._z*m,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(t),r*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class L{constructor(t=0,e=0,n=0){L.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion($a.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion($a.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6]*r,this.y=s[1]*e+s[4]*n+s[7]*r,this.z=s[2]*e+s[5]*n+s[8]*r,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,r=this.z,s=t.elements,o=1/(s[3]*e+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*e+s[4]*n+s[8]*r+s[12])*o,this.y=(s[1]*e+s[5]*n+s[9]*r+s[13])*o,this.z=(s[2]*e+s[6]*n+s[10]*r+s[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,r=this.z,s=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*r-a*n),u=2*(a*e-s*r),h=2*(s*n-o*e);return this.x=e+c*l+o*h-a*u,this.y=n+c*u+a*l-s*h,this.z=r+c*h+s*u-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*r,this.y=s[1]*e+s[5]*n+s[9]*r,this.z=s[2]*e+s[6]*n+s[10]*r,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Vt(this.x,t.x,e.x),this.y=Vt(this.y,t.y,e.y),this.z=Vt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Vt(this.x,t,e),this.y=Vt(this.y,t,e),this.z=Vt(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Vt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,r=t.y,s=t.z,o=e.x,a=e.y,c=e.z;return this.x=r*c-s*a,this.y=s*o-n*c,this.z=n*a-r*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return As.copy(this).projectOnVector(t),this.sub(As)}reflect(t){return this.sub(As.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Vt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,r=this.z-t.z;return e*e+n*n+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const r=Math.sin(e)*t;return this.x=r*Math.sin(n),this.y=Math.cos(e)*t,this.z=r*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),r=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=r,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const As=new L,$a=new Mr;class Bt{constructor(t,e,n,r,s,o,a,c,l){Bt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,r,s,o,a,c,l)}set(t,e,n,r,s,o,a,c,l){const u=this.elements;return u[0]=t,u[1]=r,u[2]=a,u[3]=e,u[4]=s,u[5]=c,u[6]=n,u[7]=o,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,r=e.elements,s=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],u=n[4],h=n[7],m=n[2],p=n[5],g=n[8],_=r[0],d=r[3],f=r[6],b=r[1],y=r[4],M=r[7],C=r[2],w=r[5],P=r[8];return s[0]=o*_+a*b+c*C,s[3]=o*d+a*y+c*w,s[6]=o*f+a*M+c*P,s[1]=l*_+u*b+h*C,s[4]=l*d+u*y+h*w,s[7]=l*f+u*M+h*P,s[2]=m*_+p*b+g*C,s[5]=m*d+p*y+g*w,s[8]=m*f+p*M+g*P,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],r=t[2],s=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8];return e*o*u-e*a*l-n*s*u+n*a*c+r*s*l-r*o*c}invert(){const t=this.elements,e=t[0],n=t[1],r=t[2],s=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8],h=u*o-a*l,m=a*c-u*s,p=l*s-o*c,g=e*h+n*m+r*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=h*_,t[1]=(r*l-u*n)*_,t[2]=(a*n-r*o)*_,t[3]=m*_,t[4]=(u*e-r*c)*_,t[5]=(r*s-a*e)*_,t[6]=p*_,t[7]=(n*c-l*e)*_,t[8]=(o*e-n*s)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,r,s,o,a){const c=Math.cos(s),l=Math.sin(s);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-r*l,r*c,-r*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(ws.makeScale(t,e)),this}rotate(t){return this.premultiply(ws.makeRotation(-t)),this}translate(t,e){return this.premultiply(ws.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let r=0;r<9;r++)if(e[r]!==n[r])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const ws=new Bt;function Mc(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function os(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function lh(){const i=os("canvas");return i.style.display="block",i}const ja={};function pr(i){i in ja||(ja[i]=!0,console.warn(i))}function ch(i,t,e){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:n()}}setTimeout(s,e)})}const Qa=new Bt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),tl=new Bt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function uh(){const i={enabled:!0,workingColorSpace:ki,spaces:{},convert:function(r,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===ne&&(r.r=Ln(r.r),r.g=Ln(r.g),r.b=Ln(r.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===ne&&(r.r=Fi(r.r),r.g=Fi(r.g),r.b=Fi(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Vn?rs:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,o){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return pr("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return pr("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(r,s)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[ki]:{primaries:t,whitePoint:n,transfer:rs,toXYZ:Qa,fromXYZ:tl,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Oe},outputColorSpaceConfig:{drawingBufferColorSpace:Oe}},[Oe]:{primaries:t,whitePoint:n,transfer:ne,toXYZ:Qa,fromXYZ:tl,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Oe}}}),i}const $t=uh();function Ln(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Fi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let vi;class hh{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{vi===void 0&&(vi=os("canvas")),vi.width=t.width,vi.height=t.height;const r=vi.getContext("2d");t instanceof ImageData?r.putImageData(t,0,0):r.drawImage(t,0,0,t.width,t.height),n=vi}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=os("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const r=n.getImageData(0,0,t.width,t.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=Ln(s[o]/255)*255;return n.putImageData(r,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Ln(e[n]/255)*255):e[n]=Ln(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let fh=0;class pa{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:fh++}),this.uuid=pi(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(Rs(r[o].image)):s.push(Rs(r[o]))}else s=Rs(r);n.url=s}return e||(t.images[this.uuid]=n),n}}function Rs(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?hh.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let dh=0;const Cs=new L;class ke extends Wi{constructor(t=ke.DEFAULT_IMAGE,e=ke.DEFAULT_MAPPING,n=oi,r=oi,s=gn,o=ai,a=un,c=vn,l=ke.DEFAULT_ANISOTROPY,u=Vn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:dh++}),this.uuid=pi(),this.name="",this.source=new pa(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new ft(0,0),this.repeat=new ft(1,1),this.center=new ft(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Bt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Cs).x}get height(){return this.source.getSize(Cs).y}get depth(){return this.source.getSize(Cs).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const r=this[e];if(r===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==cc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case is:t.x=t.x-Math.floor(t.x);break;case oi:t.x=t.x<0?0:1;break;case Mo:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case is:t.y=t.y-Math.floor(t.y);break;case oi:t.y=t.y<0?0:1;break;case Mo:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}ke.DEFAULT_IMAGE=null;ke.DEFAULT_MAPPING=cc;ke.DEFAULT_ANISOTROPY=1;class ie{constructor(t=0,e=0,n=0,r=1){ie.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=r}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,r){return this.x=t,this.y=e,this.z=n,this.w=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,r=this.z,s=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*r+o[12]*s,this.y=o[1]*e+o[5]*n+o[9]*r+o[13]*s,this.z=o[2]*e+o[6]*n+o[10]*r+o[14]*s,this.w=o[3]*e+o[7]*n+o[11]*r+o[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,r,s;const c=t.elements,l=c[0],u=c[4],h=c[8],m=c[1],p=c[5],g=c[9],_=c[2],d=c[6],f=c[10];if(Math.abs(u-m)<.01&&Math.abs(h-_)<.01&&Math.abs(g-d)<.01){if(Math.abs(u+m)<.1&&Math.abs(h+_)<.1&&Math.abs(g+d)<.1&&Math.abs(l+p+f-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const y=(l+1)/2,M=(p+1)/2,C=(f+1)/2,w=(u+m)/4,P=(h+_)/4,I=(g+d)/4;return y>M&&y>C?y<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(y),r=w/n,s=P/n):M>C?M<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(M),n=w/r,s=I/r):C<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(C),n=P/s,r=I/s),this.set(n,r,s,e),this}let b=Math.sqrt((d-g)*(d-g)+(h-_)*(h-_)+(m-u)*(m-u));return Math.abs(b)<.001&&(b=1),this.x=(d-g)/b,this.y=(h-_)/b,this.z=(m-u)/b,this.w=Math.acos((l+p+f-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Vt(this.x,t.x,e.x),this.y=Vt(this.y,t.y,e.y),this.z=Vt(this.z,t.z,e.z),this.w=Vt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Vt(this.x,t,e),this.y=Vt(this.y,t,e),this.z=Vt(this.z,t,e),this.w=Vt(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Vt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class ph extends Wi{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:gn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new ie(0,0,t,e),this.scissorTest=!1,this.viewport=new ie(0,0,t,e);const r={width:t,height:e,depth:n.depth},s=new ke(r);this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(t={}){const e={minFilter:gn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=t,this.textures[r].image.height=e,this.textures[r].image.depth=n,this.textures[r].isArrayTexture=this.textures[r].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const r=Object.assign({},t.textures[e].image);this.textures[e].source=new pa(r)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class hi extends ph{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Sc extends ke{constructor(t=null,e=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:r},this.magFilter=hn,this.minFilter=hn,this.wrapR=oi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class mh extends ke{constructor(t=null,e=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:r},this.magFilter=hn,this.minFilter=hn,this.wrapR=oi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Sr{constructor(t=new L(1/0,1/0,1/0),e=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(rn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(rn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=rn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const s=n.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,rn):rn.fromBufferAttribute(s,o),rn.applyMatrix4(t.matrixWorld),this.expandByPoint(rn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ar.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ar.copy(n.boundingBox)),Ar.applyMatrix4(t.matrixWorld),this.union(Ar)}const r=t.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,rn),rn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Zi),wr.subVectors(this.max,Zi),xi.subVectors(t.a,Zi),Mi.subVectors(t.b,Zi),Si.subVectors(t.c,Zi),On.subVectors(Mi,xi),Bn.subVectors(Si,Mi),Kn.subVectors(xi,Si);let e=[0,-On.z,On.y,0,-Bn.z,Bn.y,0,-Kn.z,Kn.y,On.z,0,-On.x,Bn.z,0,-Bn.x,Kn.z,0,-Kn.x,-On.y,On.x,0,-Bn.y,Bn.x,0,-Kn.y,Kn.x,0];return!Ps(e,xi,Mi,Si,wr)||(e=[1,0,0,0,1,0,0,0,1],!Ps(e,xi,Mi,Si,wr))?!1:(Rr.crossVectors(On,Bn),e=[Rr.x,Rr.y,Rr.z],Ps(e,xi,Mi,Si,wr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,rn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(rn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(yn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),yn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),yn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),yn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),yn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),yn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),yn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),yn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(yn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const yn=[new L,new L,new L,new L,new L,new L,new L,new L],rn=new L,Ar=new Sr,xi=new L,Mi=new L,Si=new L,On=new L,Bn=new L,Kn=new L,Zi=new L,wr=new L,Rr=new L,$n=new L;function Ps(i,t,e,n,r){for(let s=0,o=i.length-3;s<=o;s+=3){$n.fromArray(i,s);const a=r.x*Math.abs($n.x)+r.y*Math.abs($n.y)+r.z*Math.abs($n.z),c=t.dot($n),l=e.dot($n),u=n.dot($n);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}const gh=new Sr,Ji=new L,Ls=new L;class ma{constructor(t=new L,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):gh.setFromPoints(t).getCenter(n);let r=0;for(let s=0,o=t.length;s<o;s++)r=Math.max(r,n.distanceToSquared(t[s]));return this.radius=Math.sqrt(r),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ji.subVectors(t,this.center);const e=Ji.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),r=(n-this.radius)*.5;this.center.addScaledVector(Ji,r/n),this.radius+=r}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Ls.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ji.copy(t.center).add(Ls)),this.expandByPoint(Ji.copy(t.center).sub(Ls))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}const En=new L,Ds=new L,Cr=new L,zn=new L,Us=new L,Pr=new L,Is=new L;class _h{constructor(t=new L,e=new L(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,En)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=En.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(En.copy(this.origin).addScaledVector(this.direction,e),En.distanceToSquared(t))}distanceSqToSegment(t,e,n,r){Ds.copy(t).add(e).multiplyScalar(.5),Cr.copy(e).sub(t).normalize(),zn.copy(this.origin).sub(Ds);const s=t.distanceTo(e)*.5,o=-this.direction.dot(Cr),a=zn.dot(this.direction),c=-zn.dot(Cr),l=zn.lengthSq(),u=Math.abs(1-o*o);let h,m,p,g;if(u>0)if(h=o*c-a,m=o*a-c,g=s*u,h>=0)if(m>=-g)if(m<=g){const _=1/u;h*=_,m*=_,p=h*(h+o*m+2*a)+m*(o*h+m+2*c)+l}else m=s,h=Math.max(0,-(o*m+a)),p=-h*h+m*(m+2*c)+l;else m=-s,h=Math.max(0,-(o*m+a)),p=-h*h+m*(m+2*c)+l;else m<=-g?(h=Math.max(0,-(-o*s+a)),m=h>0?-s:Math.min(Math.max(-s,-c),s),p=-h*h+m*(m+2*c)+l):m<=g?(h=0,m=Math.min(Math.max(-s,-c),s),p=m*(m+2*c)+l):(h=Math.max(0,-(o*s+a)),m=h>0?s:Math.min(Math.max(-s,-c),s),p=-h*h+m*(m+2*c)+l);else m=o>0?-s:s,h=Math.max(0,-(o*m+a)),p=-h*h+m*(m+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(Ds).addScaledVector(Cr,m),p}intersectSphere(t,e){En.subVectors(t.center,this.origin);const n=En.dot(this.direction),r=En.dot(En)-n*n,s=t.radius*t.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,r,s,o,a,c;const l=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,m=this.origin;return l>=0?(n=(t.min.x-m.x)*l,r=(t.max.x-m.x)*l):(n=(t.max.x-m.x)*l,r=(t.min.x-m.x)*l),u>=0?(s=(t.min.y-m.y)*u,o=(t.max.y-m.y)*u):(s=(t.max.y-m.y)*u,o=(t.min.y-m.y)*u),n>o||s>r||((s>n||isNaN(n))&&(n=s),(o<r||isNaN(r))&&(r=o),h>=0?(a=(t.min.z-m.z)*h,c=(t.max.z-m.z)*h):(a=(t.max.z-m.z)*h,c=(t.min.z-m.z)*h),n>c||a>r)||((a>n||n!==n)&&(n=a),(c<r||r!==r)&&(r=c),r<0)?null:this.at(n>=0?n:r,e)}intersectsBox(t){return this.intersectBox(t,En)!==null}intersectTriangle(t,e,n,r,s){Us.subVectors(e,t),Pr.subVectors(n,t),Is.crossVectors(Us,Pr);let o=this.direction.dot(Is),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;zn.subVectors(this.origin,t);const c=a*this.direction.dot(Pr.crossVectors(zn,Pr));if(c<0)return null;const l=a*this.direction.dot(Us.cross(zn));if(l<0||c+l>o)return null;const u=-a*zn.dot(Is);return u<0?null:this.at(u/o,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class me{constructor(t,e,n,r,s,o,a,c,l,u,h,m,p,g,_,d){me.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,r,s,o,a,c,l,u,h,m,p,g,_,d)}set(t,e,n,r,s,o,a,c,l,u,h,m,p,g,_,d){const f=this.elements;return f[0]=t,f[4]=e,f[8]=n,f[12]=r,f[1]=s,f[5]=o,f[9]=a,f[13]=c,f[2]=l,f[6]=u,f[10]=h,f[14]=m,f[3]=p,f[7]=g,f[11]=_,f[15]=d,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new me().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,r=1/yi.setFromMatrixColumn(t,0).length(),s=1/yi.setFromMatrixColumn(t,1).length(),o=1/yi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*r,e[1]=n[1]*r,e[2]=n[2]*r,e[3]=0,e[4]=n[4]*s,e[5]=n[5]*s,e[6]=n[6]*s,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,r=t.y,s=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(r),l=Math.sin(r),u=Math.cos(s),h=Math.sin(s);if(t.order==="XYZ"){const m=o*u,p=o*h,g=a*u,_=a*h;e[0]=c*u,e[4]=-c*h,e[8]=l,e[1]=p+g*l,e[5]=m-_*l,e[9]=-a*c,e[2]=_-m*l,e[6]=g+p*l,e[10]=o*c}else if(t.order==="YXZ"){const m=c*u,p=c*h,g=l*u,_=l*h;e[0]=m+_*a,e[4]=g*a-p,e[8]=o*l,e[1]=o*h,e[5]=o*u,e[9]=-a,e[2]=p*a-g,e[6]=_+m*a,e[10]=o*c}else if(t.order==="ZXY"){const m=c*u,p=c*h,g=l*u,_=l*h;e[0]=m-_*a,e[4]=-o*h,e[8]=g+p*a,e[1]=p+g*a,e[5]=o*u,e[9]=_-m*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){const m=o*u,p=o*h,g=a*u,_=a*h;e[0]=c*u,e[4]=g*l-p,e[8]=m*l+_,e[1]=c*h,e[5]=_*l+m,e[9]=p*l-g,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){const m=o*c,p=o*l,g=a*c,_=a*l;e[0]=c*u,e[4]=_-m*h,e[8]=g*h+p,e[1]=h,e[5]=o*u,e[9]=-a*u,e[2]=-l*u,e[6]=p*h+g,e[10]=m-_*h}else if(t.order==="XZY"){const m=o*c,p=o*l,g=a*c,_=a*l;e[0]=c*u,e[4]=-h,e[8]=l*u,e[1]=m*h+_,e[5]=o*u,e[9]=p*h-g,e[2]=g*h-p,e[6]=a*u,e[10]=_*h+m}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(vh,t,xh)}lookAt(t,e,n){const r=this.elements;return qe.subVectors(t,e),qe.lengthSq()===0&&(qe.z=1),qe.normalize(),kn.crossVectors(n,qe),kn.lengthSq()===0&&(Math.abs(n.z)===1?qe.x+=1e-4:qe.z+=1e-4,qe.normalize(),kn.crossVectors(n,qe)),kn.normalize(),Lr.crossVectors(qe,kn),r[0]=kn.x,r[4]=Lr.x,r[8]=qe.x,r[1]=kn.y,r[5]=Lr.y,r[9]=qe.y,r[2]=kn.z,r[6]=Lr.z,r[10]=qe.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,r=e.elements,s=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],u=n[1],h=n[5],m=n[9],p=n[13],g=n[2],_=n[6],d=n[10],f=n[14],b=n[3],y=n[7],M=n[11],C=n[15],w=r[0],P=r[4],I=r[8],E=r[12],T=r[1],D=r[5],B=r[9],V=r[13],J=r[2],Y=r[6],Z=r[10],Q=r[14],W=r[3],lt=r[7],dt=r[11],At=r[15];return s[0]=o*w+a*T+c*J+l*W,s[4]=o*P+a*D+c*Y+l*lt,s[8]=o*I+a*B+c*Z+l*dt,s[12]=o*E+a*V+c*Q+l*At,s[1]=u*w+h*T+m*J+p*W,s[5]=u*P+h*D+m*Y+p*lt,s[9]=u*I+h*B+m*Z+p*dt,s[13]=u*E+h*V+m*Q+p*At,s[2]=g*w+_*T+d*J+f*W,s[6]=g*P+_*D+d*Y+f*lt,s[10]=g*I+_*B+d*Z+f*dt,s[14]=g*E+_*V+d*Q+f*At,s[3]=b*w+y*T+M*J+C*W,s[7]=b*P+y*D+M*Y+C*lt,s[11]=b*I+y*B+M*Z+C*dt,s[15]=b*E+y*V+M*Q+C*At,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],r=t[8],s=t[12],o=t[1],a=t[5],c=t[9],l=t[13],u=t[2],h=t[6],m=t[10],p=t[14],g=t[3],_=t[7],d=t[11],f=t[15];return g*(+s*c*h-r*l*h-s*a*m+n*l*m+r*a*p-n*c*p)+_*(+e*c*p-e*l*m+s*o*m-r*o*p+r*l*u-s*c*u)+d*(+e*l*h-e*a*p-s*o*h+n*o*p+s*a*u-n*l*u)+f*(-r*a*u-e*c*h+e*a*m+r*o*h-n*o*m+n*c*u)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const r=this.elements;return t.isVector3?(r[12]=t.x,r[13]=t.y,r[14]=t.z):(r[12]=t,r[13]=e,r[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],r=t[2],s=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8],h=t[9],m=t[10],p=t[11],g=t[12],_=t[13],d=t[14],f=t[15],b=h*d*l-_*m*l+_*c*p-a*d*p-h*c*f+a*m*f,y=g*m*l-u*d*l-g*c*p+o*d*p+u*c*f-o*m*f,M=u*_*l-g*h*l+g*a*p-o*_*p-u*a*f+o*h*f,C=g*h*c-u*_*c-g*a*m+o*_*m+u*a*d-o*h*d,w=e*b+n*y+r*M+s*C;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const P=1/w;return t[0]=b*P,t[1]=(_*m*s-h*d*s-_*r*p+n*d*p+h*r*f-n*m*f)*P,t[2]=(a*d*s-_*c*s+_*r*l-n*d*l-a*r*f+n*c*f)*P,t[3]=(h*c*s-a*m*s-h*r*l+n*m*l+a*r*p-n*c*p)*P,t[4]=y*P,t[5]=(u*d*s-g*m*s+g*r*p-e*d*p-u*r*f+e*m*f)*P,t[6]=(g*c*s-o*d*s-g*r*l+e*d*l+o*r*f-e*c*f)*P,t[7]=(o*m*s-u*c*s+u*r*l-e*m*l-o*r*p+e*c*p)*P,t[8]=M*P,t[9]=(g*h*s-u*_*s-g*n*p+e*_*p+u*n*f-e*h*f)*P,t[10]=(o*_*s-g*a*s+g*n*l-e*_*l-o*n*f+e*a*f)*P,t[11]=(u*a*s-o*h*s-u*n*l+e*h*l+o*n*p-e*a*p)*P,t[12]=C*P,t[13]=(u*_*r-g*h*r+g*n*m-e*_*m-u*n*d+e*h*d)*P,t[14]=(g*a*r-o*_*r-g*n*c+e*_*c+o*n*d-e*a*d)*P,t[15]=(o*h*r-u*a*r+u*n*c-e*h*c-o*n*m+e*a*m)*P,this}scale(t){const e=this.elements,n=t.x,r=t.y,s=t.z;return e[0]*=n,e[4]*=r,e[8]*=s,e[1]*=n,e[5]*=r,e[9]*=s,e[2]*=n,e[6]*=r,e[10]*=s,e[3]*=n,e[7]*=r,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],r=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,r))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),r=Math.sin(e),s=1-n,o=t.x,a=t.y,c=t.z,l=s*o,u=s*a;return this.set(l*o+n,l*a-r*c,l*c+r*a,0,l*a+r*c,u*a+n,u*c-r*o,0,l*c-r*a,u*c+r*o,s*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,r,s,o){return this.set(1,n,s,0,t,1,o,0,e,r,1,0,0,0,0,1),this}compose(t,e,n){const r=this.elements,s=e._x,o=e._y,a=e._z,c=e._w,l=s+s,u=o+o,h=a+a,m=s*l,p=s*u,g=s*h,_=o*u,d=o*h,f=a*h,b=c*l,y=c*u,M=c*h,C=n.x,w=n.y,P=n.z;return r[0]=(1-(_+f))*C,r[1]=(p+M)*C,r[2]=(g-y)*C,r[3]=0,r[4]=(p-M)*w,r[5]=(1-(m+f))*w,r[6]=(d+b)*w,r[7]=0,r[8]=(g+y)*P,r[9]=(d-b)*P,r[10]=(1-(m+_))*P,r[11]=0,r[12]=t.x,r[13]=t.y,r[14]=t.z,r[15]=1,this}decompose(t,e,n){const r=this.elements;let s=yi.set(r[0],r[1],r[2]).length();const o=yi.set(r[4],r[5],r[6]).length(),a=yi.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),t.x=r[12],t.y=r[13],t.z=r[14],sn.copy(this);const l=1/s,u=1/o,h=1/a;return sn.elements[0]*=l,sn.elements[1]*=l,sn.elements[2]*=l,sn.elements[4]*=u,sn.elements[5]*=u,sn.elements[6]*=u,sn.elements[8]*=h,sn.elements[9]*=h,sn.elements[10]*=h,e.setFromRotationMatrix(sn),n.x=s,n.y=o,n.z=a,this}makePerspective(t,e,n,r,s,o,a=_n,c=!1){const l=this.elements,u=2*s/(e-t),h=2*s/(n-r),m=(e+t)/(e-t),p=(n+r)/(n-r);let g,_;if(c)g=s/(o-s),_=o*s/(o-s);else if(a===_n)g=-(o+s)/(o-s),_=-2*o*s/(o-s);else if(a===ss)g=-o/(o-s),_=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=m,l[12]=0,l[1]=0,l[5]=h,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,r,s,o,a=_n,c=!1){const l=this.elements,u=2/(e-t),h=2/(n-r),m=-(e+t)/(e-t),p=-(n+r)/(n-r);let g,_;if(c)g=1/(o-s),_=o/(o-s);else if(a===_n)g=-2/(o-s),_=-(o+s)/(o-s);else if(a===ss)g=-1/(o-s),_=-s/(o-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=0,l[12]=m,l[1]=0,l[5]=h,l[9]=0,l[13]=p,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let r=0;r<16;r++)if(e[r]!==n[r])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const yi=new L,sn=new me,vh=new L(0,0,0),xh=new L(1,1,1),kn=new L,Lr=new L,qe=new L,el=new me,nl=new Mr;class xn{constructor(t=0,e=0,n=0,r=xn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=r}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,r=this._order){return this._x=t,this._y=e,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const r=t.elements,s=r[0],o=r[4],a=r[8],c=r[1],l=r[5],u=r[9],h=r[2],m=r[6],p=r[10];switch(e){case"XYZ":this._y=Math.asin(Vt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(m,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Vt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(Vt(m,-1,1)),Math.abs(m)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-Vt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(m,p),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Vt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-Vt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(m,l),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return el.makeRotationFromQuaternion(t),this.setFromRotationMatrix(el,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return nl.setFromEuler(this),this.setFromQuaternion(nl,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}xn.DEFAULT_ORDER="XYZ";class yc{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Mh=0;const il=new L,Ei=new Mr,Tn=new me,Dr=new L,Ki=new L,Sh=new L,yh=new Mr,rl=new L(1,0,0),sl=new L(0,1,0),ol=new L(0,0,1),al={type:"added"},Eh={type:"removed"},Ti={type:"childadded",child:null},Ns={type:"childremoved",child:null};class Re extends Wi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Mh++}),this.uuid=pi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Re.DEFAULT_UP.clone();const t=new L,e=new xn,n=new Mr,r=new L(1,1,1);function s(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new me},normalMatrix:{value:new Bt}}),this.matrix=new me,this.matrixWorld=new me,this.matrixAutoUpdate=Re.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Re.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new yc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Ei.setFromAxisAngle(t,e),this.quaternion.multiply(Ei),this}rotateOnWorldAxis(t,e){return Ei.setFromAxisAngle(t,e),this.quaternion.premultiply(Ei),this}rotateX(t){return this.rotateOnAxis(rl,t)}rotateY(t){return this.rotateOnAxis(sl,t)}rotateZ(t){return this.rotateOnAxis(ol,t)}translateOnAxis(t,e){return il.copy(t).applyQuaternion(this.quaternion),this.position.add(il.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(rl,t)}translateY(t){return this.translateOnAxis(sl,t)}translateZ(t){return this.translateOnAxis(ol,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Tn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Dr.copy(t):Dr.set(t,e,n);const r=this.parent;this.updateWorldMatrix(!0,!1),Ki.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Tn.lookAt(Ki,Dr,this.up):Tn.lookAt(Dr,Ki,this.up),this.quaternion.setFromRotationMatrix(Tn),r&&(Tn.extractRotation(r.matrixWorld),Ei.setFromRotationMatrix(Tn),this.quaternion.premultiply(Ei.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(al),Ti.child=t,this.dispatchEvent(Ti),Ti.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Eh),Ns.child=t,this.dispatchEvent(Ns),Ns.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Tn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Tn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Tn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(al),Ti.child=t,this.dispatchEvent(Ti),Ti.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,r=this.children.length;n<r;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ki,t,Sh),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ki,yh,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(a=>({...a})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(t),r.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const h=c[l];s(t.shapes,h)}else s(t.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(s(t.materials,this.material[c]));r.material=a}else r.material=s(t.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];r.animations.push(s(t.animations,c))}}if(e){const a=o(t.geometries),c=o(t.materials),l=o(t.textures),u=o(t.images),h=o(t.shapes),m=o(t.skeletons),p=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),m.length>0&&(n.skeletons=m),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=r,n;function o(a){const c=[];for(const l in a){const u=a[l];delete u.metadata,c.push(u)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const r=t.children[n];this.add(r.clone())}return this}}Re.DEFAULT_UP=new L(0,1,0);Re.DEFAULT_MATRIX_AUTO_UPDATE=!0;Re.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const on=new L,bn=new L,Fs=new L,An=new L,bi=new L,Ai=new L,ll=new L,Os=new L,Bs=new L,zs=new L,ks=new ie,Hs=new ie,Gs=new ie;class ln{constructor(t=new L,e=new L,n=new L){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,r){r.subVectors(n,e),on.subVectors(t,e),r.cross(on);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(t,e,n,r,s){on.subVectors(r,e),bn.subVectors(n,e),Fs.subVectors(t,e);const o=on.dot(on),a=on.dot(bn),c=on.dot(Fs),l=bn.dot(bn),u=bn.dot(Fs),h=o*l-a*a;if(h===0)return s.set(0,0,0),null;const m=1/h,p=(l*c-a*u)*m,g=(o*u-a*c)*m;return s.set(1-p-g,g,p)}static containsPoint(t,e,n,r){return this.getBarycoord(t,e,n,r,An)===null?!1:An.x>=0&&An.y>=0&&An.x+An.y<=1}static getInterpolation(t,e,n,r,s,o,a,c){return this.getBarycoord(t,e,n,r,An)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,An.x),c.addScaledVector(o,An.y),c.addScaledVector(a,An.z),c)}static getInterpolatedAttribute(t,e,n,r,s,o){return ks.setScalar(0),Hs.setScalar(0),Gs.setScalar(0),ks.fromBufferAttribute(t,e),Hs.fromBufferAttribute(t,n),Gs.fromBufferAttribute(t,r),o.setScalar(0),o.addScaledVector(ks,s.x),o.addScaledVector(Hs,s.y),o.addScaledVector(Gs,s.z),o}static isFrontFacing(t,e,n,r){return on.subVectors(n,e),bn.subVectors(t,e),on.cross(bn).dot(r)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,r){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[r]),this}setFromAttributeAndIndices(t,e,n,r){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,r),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return on.subVectors(this.c,this.b),bn.subVectors(this.a,this.b),on.cross(bn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return ln.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return ln.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,r,s){return ln.getInterpolation(t,this.a,this.b,this.c,e,n,r,s)}containsPoint(t){return ln.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return ln.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,r=this.b,s=this.c;let o,a;bi.subVectors(r,n),Ai.subVectors(s,n),Os.subVectors(t,n);const c=bi.dot(Os),l=Ai.dot(Os);if(c<=0&&l<=0)return e.copy(n);Bs.subVectors(t,r);const u=bi.dot(Bs),h=Ai.dot(Bs);if(u>=0&&h<=u)return e.copy(r);const m=c*h-u*l;if(m<=0&&c>=0&&u<=0)return o=c/(c-u),e.copy(n).addScaledVector(bi,o);zs.subVectors(t,s);const p=bi.dot(zs),g=Ai.dot(zs);if(g>=0&&p<=g)return e.copy(s);const _=p*l-c*g;if(_<=0&&l>=0&&g<=0)return a=l/(l-g),e.copy(n).addScaledVector(Ai,a);const d=u*g-p*h;if(d<=0&&h-u>=0&&p-g>=0)return ll.subVectors(s,r),a=(h-u)/(h-u+(p-g)),e.copy(r).addScaledVector(ll,a);const f=1/(d+_+m);return o=_*f,a=m*f,e.copy(n).addScaledVector(bi,o).addScaledVector(Ai,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Ec={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Hn={h:0,s:0,l:0},Ur={h:0,s:0,l:0};function Vs(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Xt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const r=t;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Oe){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,$t.colorSpaceToWorking(this,e),this}setRGB(t,e,n,r=$t.workingColorSpace){return this.r=t,this.g=e,this.b=n,$t.colorSpaceToWorking(this,r),this}setHSL(t,e,n,r=$t.workingColorSpace){if(t=da(t,1),e=Vt(e,0,1),n=Vt(n,0,1),e===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+e):n+e-n*e,o=2*n-s;this.r=Vs(o,s,t+1/3),this.g=Vs(o,s,t),this.b=Vs(o,s,t-1/3)}return $t.colorSpaceToWorking(this,r),this}setStyle(t,e=Oe){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(s,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Oe){const n=Ec[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ln(t.r),this.g=Ln(t.g),this.b=Ln(t.b),this}copyLinearToSRGB(t){return this.r=Fi(t.r),this.g=Fi(t.g),this.b=Fi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Oe){return $t.workingToColorSpace(Le.copy(this),t),Math.round(Vt(Le.r*255,0,255))*65536+Math.round(Vt(Le.g*255,0,255))*256+Math.round(Vt(Le.b*255,0,255))}getHexString(t=Oe){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=$t.workingColorSpace){$t.workingToColorSpace(Le.copy(this),e);const n=Le.r,r=Le.g,s=Le.b,o=Math.max(n,r,s),a=Math.min(n,r,s);let c,l;const u=(a+o)/2;if(a===o)c=0,l=0;else{const h=o-a;switch(l=u<=.5?h/(o+a):h/(2-o-a),o){case n:c=(r-s)/h+(r<s?6:0);break;case r:c=(s-n)/h+2;break;case s:c=(n-r)/h+4;break}c/=6}return t.h=c,t.s=l,t.l=u,t}getRGB(t,e=$t.workingColorSpace){return $t.workingToColorSpace(Le.copy(this),e),t.r=Le.r,t.g=Le.g,t.b=Le.b,t}getStyle(t=Oe){$t.workingToColorSpace(Le.copy(this),t);const e=Le.r,n=Le.g,r=Le.b;return t!==Oe?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(t,e,n){return this.getHSL(Hn),this.setHSL(Hn.h+t,Hn.s+e,Hn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Hn),t.getHSL(Ur);const n=rr(Hn.h,Ur.h,e),r=rr(Hn.s,Ur.s,e),s=rr(Hn.l,Ur.l,e);return this.setHSL(n,r,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,r=this.b,s=t.elements;return this.r=s[0]*e+s[3]*n+s[6]*r,this.g=s[1]*e+s[4]*n+s[7]*r,this.b=s[2]*e+s[5]*n+s[8]*r,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Le=new Xt;Xt.NAMES=Ec;let Th=0;class yr extends Wi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Th++}),this.uuid=pi(),this.name="",this.type="Material",this.blending=Ni,this.side=Yn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=lo,this.blendDst=co,this.blendEquation=ri,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Xt(0,0,0),this.blendAlpha=0,this.depthFunc=Oi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ya,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=_i,this.stencilZFail=_i,this.stencilZPass=_i,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const r=this[e];if(r===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ni&&(n.blending=this.blending),this.side!==Yn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==lo&&(n.blendSrc=this.blendSrc),this.blendDst!==co&&(n.blendDst=this.blendDst),this.blendEquation!==ri&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Oi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ya&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==_i&&(n.stencilFail=this.stencilFail),this.stencilZFail!==_i&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==_i&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const o=[];for(const a in s){const c=s[a];delete c.metadata,o.push(c)}return o}if(e){const s=r(t.textures),o=r(t.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const r=e.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=e[s].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class mr extends yr{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Xt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new xn,this.combine=ac,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Me=new L,Ir=new ft;let bh=0;class fn{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:bh++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Za,this.updateRanges=[],this.gpuType=Cn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[t+r]=e.array[n+r];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Ir.fromBufferAttribute(this,e),Ir.applyMatrix3(t),this.setXY(e,Ir.x,Ir.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Me.fromBufferAttribute(this,e),Me.applyMatrix3(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Me.fromBufferAttribute(this,e),Me.applyMatrix4(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Me.fromBufferAttribute(this,e),Me.applyNormalMatrix(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Me.fromBufferAttribute(this,e),Me.transformDirection(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Li(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Ne(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Li(e,this.array)),e}setX(t,e){return this.normalized&&(e=Ne(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Li(e,this.array)),e}setY(t,e){return this.normalized&&(e=Ne(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Li(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Ne(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Li(e,this.array)),e}setW(t,e){return this.normalized&&(e=Ne(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Ne(e,this.array),n=Ne(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,r){return t*=this.itemSize,this.normalized&&(e=Ne(e,this.array),n=Ne(n,this.array),r=Ne(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=r,this}setXYZW(t,e,n,r,s){return t*=this.itemSize,this.normalized&&(e=Ne(e,this.array),n=Ne(n,this.array),r=Ne(r,this.array),s=Ne(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=r,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Za&&(t.usage=this.usage),t}}class Tc extends fn{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class bc extends fn{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class te extends fn{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Ah=0;const Qe=new me,Ws=new Re,wi=new L,Ye=new Sr,$i=new Sr,Ae=new L;class Ue extends Wi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Ah++}),this.uuid=pi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Mc(t)?bc:Tc)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Bt().getNormalMatrix(t);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(t),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Qe.makeRotationFromQuaternion(t),this.applyMatrix4(Qe),this}rotateX(t){return Qe.makeRotationX(t),this.applyMatrix4(Qe),this}rotateY(t){return Qe.makeRotationY(t),this.applyMatrix4(Qe),this}rotateZ(t){return Qe.makeRotationZ(t),this.applyMatrix4(Qe),this}translate(t,e,n){return Qe.makeTranslation(t,e,n),this.applyMatrix4(Qe),this}scale(t,e,n){return Qe.makeScale(t,e,n),this.applyMatrix4(Qe),this}lookAt(t){return Ws.lookAt(t),Ws.updateMatrix(),this.applyMatrix4(Ws.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(wi).negate(),this.translate(wi.x,wi.y,wi.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let r=0,s=t.length;r<s;r++){const o=t[r];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new te(n,3))}else{const n=Math.min(t.length,e.count);for(let r=0;r<n;r++){const s=t[r];e.setXYZ(r,s.x,s.y,s.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Sr);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,r=e.length;n<r;n++){const s=e[n];Ye.setFromBufferAttribute(s),this.morphTargetsRelative?(Ae.addVectors(this.boundingBox.min,Ye.min),this.boundingBox.expandByPoint(Ae),Ae.addVectors(this.boundingBox.max,Ye.max),this.boundingBox.expandByPoint(Ae)):(this.boundingBox.expandByPoint(Ye.min),this.boundingBox.expandByPoint(Ye.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ma);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(t){const n=this.boundingSphere.center;if(Ye.setFromBufferAttribute(t),e)for(let s=0,o=e.length;s<o;s++){const a=e[s];$i.setFromBufferAttribute(a),this.morphTargetsRelative?(Ae.addVectors(Ye.min,$i.min),Ye.expandByPoint(Ae),Ae.addVectors(Ye.max,$i.max),Ye.expandByPoint(Ae)):(Ye.expandByPoint($i.min),Ye.expandByPoint($i.max))}Ye.getCenter(n);let r=0;for(let s=0,o=t.count;s<o;s++)Ae.fromBufferAttribute(t,s),r=Math.max(r,n.distanceToSquared(Ae));if(e)for(let s=0,o=e.length;s<o;s++){const a=e[s],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)Ae.fromBufferAttribute(a,l),c&&(wi.fromBufferAttribute(t,l),Ae.add(wi)),r=Math.max(r,n.distanceToSquared(Ae))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,r=e.normal,s=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new fn(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let I=0;I<n.count;I++)a[I]=new L,c[I]=new L;const l=new L,u=new L,h=new L,m=new ft,p=new ft,g=new ft,_=new L,d=new L;function f(I,E,T){l.fromBufferAttribute(n,I),u.fromBufferAttribute(n,E),h.fromBufferAttribute(n,T),m.fromBufferAttribute(s,I),p.fromBufferAttribute(s,E),g.fromBufferAttribute(s,T),u.sub(l),h.sub(l),p.sub(m),g.sub(m);const D=1/(p.x*g.y-g.x*p.y);isFinite(D)&&(_.copy(u).multiplyScalar(g.y).addScaledVector(h,-p.y).multiplyScalar(D),d.copy(h).multiplyScalar(p.x).addScaledVector(u,-g.x).multiplyScalar(D),a[I].add(_),a[E].add(_),a[T].add(_),c[I].add(d),c[E].add(d),c[T].add(d))}let b=this.groups;b.length===0&&(b=[{start:0,count:t.count}]);for(let I=0,E=b.length;I<E;++I){const T=b[I],D=T.start,B=T.count;for(let V=D,J=D+B;V<J;V+=3)f(t.getX(V+0),t.getX(V+1),t.getX(V+2))}const y=new L,M=new L,C=new L,w=new L;function P(I){C.fromBufferAttribute(r,I),w.copy(C);const E=a[I];y.copy(E),y.sub(C.multiplyScalar(C.dot(E))).normalize(),M.crossVectors(w,E);const D=M.dot(c[I])<0?-1:1;o.setXYZW(I,y.x,y.y,y.z,D)}for(let I=0,E=b.length;I<E;++I){const T=b[I],D=T.start,B=T.count;for(let V=D,J=D+B;V<J;V+=3)P(t.getX(V+0)),P(t.getX(V+1)),P(t.getX(V+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new fn(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let m=0,p=n.count;m<p;m++)n.setXYZ(m,0,0,0);const r=new L,s=new L,o=new L,a=new L,c=new L,l=new L,u=new L,h=new L;if(t)for(let m=0,p=t.count;m<p;m+=3){const g=t.getX(m+0),_=t.getX(m+1),d=t.getX(m+2);r.fromBufferAttribute(e,g),s.fromBufferAttribute(e,_),o.fromBufferAttribute(e,d),u.subVectors(o,s),h.subVectors(r,s),u.cross(h),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,d),a.add(u),c.add(u),l.add(u),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(d,l.x,l.y,l.z)}else for(let m=0,p=e.count;m<p;m+=3)r.fromBufferAttribute(e,m+0),s.fromBufferAttribute(e,m+1),o.fromBufferAttribute(e,m+2),u.subVectors(o,s),h.subVectors(r,s),u.cross(h),n.setXYZ(m+0,u.x,u.y,u.z),n.setXYZ(m+1,u.x,u.y,u.z),n.setXYZ(m+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ae.fromBufferAttribute(t,e),Ae.normalize(),t.setXYZ(e,Ae.x,Ae.y,Ae.z)}toNonIndexed(){function t(a,c){const l=a.array,u=a.itemSize,h=a.normalized,m=new l.constructor(c.length*u);let p=0,g=0;for(let _=0,d=c.length;_<d;_++){a.isInterleavedBufferAttribute?p=c[_]*a.data.stride+a.offset:p=c[_]*u;for(let f=0;f<u;f++)m[g++]=l[p++]}return new fn(m,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Ue,n=this.index.array,r=this.attributes;for(const a in r){const c=r[a],l=t(c,n);e.setAttribute(a,l)}const s=this.morphAttributes;for(const a in s){const c=[],l=s[a];for(let u=0,h=l.length;u<h;u++){const m=l[u],p=t(m,n);c.push(p)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const r={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let h=0,m=l.length;h<m;h++){const p=l[h];u.push(p.toJSON(t.data))}u.length>0&&(r[c]=u,s=!0)}s&&(t.data.morphAttributes=r,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const r=t.attributes;for(const l in r){const u=r[l];this.setAttribute(l,u.clone(e))}const s=t.morphAttributes;for(const l in s){const u=[],h=s[l];for(let m=0,p=h.length;m<p;m++)u.push(h[m].clone(e));this.morphAttributes[l]=u}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let l=0,u=o.length;l<u;l++){const h=o[l];this.addGroup(h.start,h.count,h.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const cl=new me,jn=new _h,Nr=new ma,ul=new L,Fr=new L,Or=new L,Br=new L,Xs=new L,zr=new L,hl=new L,kr=new L;class nn extends Re{constructor(t=new Ue,e=new mr){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const r=e[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(t,e){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(r,t);const a=this.morphTargetInfluences;if(s&&a){zr.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const u=a[c],h=s[c];u!==0&&(Xs.fromBufferAttribute(h,t),o?zr.addScaledVector(Xs,u):zr.addScaledVector(Xs.sub(e),u))}e.add(zr)}return e}raycast(t,e){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Nr.copy(n.boundingSphere),Nr.applyMatrix4(s),jn.copy(t.ray).recast(t.near),!(Nr.containsPoint(jn.origin)===!1&&(jn.intersectSphere(Nr,ul)===null||jn.origin.distanceToSquared(ul)>(t.far-t.near)**2))&&(cl.copy(s).invert(),jn.copy(t.ray).applyMatrix4(cl),!(n.boundingBox!==null&&jn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,jn)))}_computeIntersections(t,e,n){let r;const s=this.geometry,o=this.material,a=s.index,c=s.attributes.position,l=s.attributes.uv,u=s.attributes.uv1,h=s.attributes.normal,m=s.groups,p=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=m.length;g<_;g++){const d=m[g],f=o[d.materialIndex],b=Math.max(d.start,p.start),y=Math.min(a.count,Math.min(d.start+d.count,p.start+p.count));for(let M=b,C=y;M<C;M+=3){const w=a.getX(M),P=a.getX(M+1),I=a.getX(M+2);r=Hr(this,f,t,n,l,u,h,w,P,I),r&&(r.faceIndex=Math.floor(M/3),r.face.materialIndex=d.materialIndex,e.push(r))}}else{const g=Math.max(0,p.start),_=Math.min(a.count,p.start+p.count);for(let d=g,f=_;d<f;d+=3){const b=a.getX(d),y=a.getX(d+1),M=a.getX(d+2);r=Hr(this,o,t,n,l,u,h,b,y,M),r&&(r.faceIndex=Math.floor(d/3),e.push(r))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,_=m.length;g<_;g++){const d=m[g],f=o[d.materialIndex],b=Math.max(d.start,p.start),y=Math.min(c.count,Math.min(d.start+d.count,p.start+p.count));for(let M=b,C=y;M<C;M+=3){const w=M,P=M+1,I=M+2;r=Hr(this,f,t,n,l,u,h,w,P,I),r&&(r.faceIndex=Math.floor(M/3),r.face.materialIndex=d.materialIndex,e.push(r))}}else{const g=Math.max(0,p.start),_=Math.min(c.count,p.start+p.count);for(let d=g,f=_;d<f;d+=3){const b=d,y=d+1,M=d+2;r=Hr(this,o,t,n,l,u,h,b,y,M),r&&(r.faceIndex=Math.floor(d/3),e.push(r))}}}}function wh(i,t,e,n,r,s,o,a){let c;if(t.side===ze?c=n.intersectTriangle(o,s,r,!0,a):c=n.intersectTriangle(r,s,o,t.side===Yn,a),c===null)return null;kr.copy(a),kr.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(kr);return l<e.near||l>e.far?null:{distance:l,point:kr.clone(),object:i}}function Hr(i,t,e,n,r,s,o,a,c,l){i.getVertexPosition(a,Fr),i.getVertexPosition(c,Or),i.getVertexPosition(l,Br);const u=wh(i,t,e,n,Fr,Or,Br,hl);if(u){const h=new L;ln.getBarycoord(hl,Fr,Or,Br,h),r&&(u.uv=ln.getInterpolatedAttribute(r,a,c,l,h,new ft)),s&&(u.uv1=ln.getInterpolatedAttribute(s,a,c,l,h,new ft)),o&&(u.normal=ln.getInterpolatedAttribute(o,a,c,l,h,new L),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const m={a,b:c,c:l,normal:new L,materialIndex:0};ln.getNormal(Fr,Or,Br,m.normal),u.face=m,u.barycoord=h}return u}class mi extends Ue{constructor(t=1,e=1,n=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const c=[],l=[],u=[],h=[];let m=0,p=0;g("z","y","x",-1,-1,n,e,t,o,s,0),g("z","y","x",1,-1,n,e,-t,o,s,1),g("x","z","y",1,1,t,n,e,r,o,2),g("x","z","y",1,-1,t,n,-e,r,o,3),g("x","y","z",1,-1,t,e,n,r,s,4),g("x","y","z",-1,-1,t,e,-n,r,s,5),this.setIndex(c),this.setAttribute("position",new te(l,3)),this.setAttribute("normal",new te(u,3)),this.setAttribute("uv",new te(h,2));function g(_,d,f,b,y,M,C,w,P,I,E){const T=M/P,D=C/I,B=M/2,V=C/2,J=w/2,Y=P+1,Z=I+1;let Q=0,W=0;const lt=new L;for(let dt=0;dt<Z;dt++){const At=dt*D-V;for(let Wt=0;Wt<Y;Wt++){const se=Wt*T-B;lt[_]=se*b,lt[d]=At*y,lt[f]=J,l.push(lt.x,lt.y,lt.z),lt[_]=0,lt[d]=0,lt[f]=w>0?1:-1,u.push(lt.x,lt.y,lt.z),h.push(Wt/P),h.push(1-dt/I),Q+=1}}for(let dt=0;dt<I;dt++)for(let At=0;At<P;At++){const Wt=m+At+Y*dt,se=m+At+Y*(dt+1),le=m+(At+1)+Y*(dt+1),jt=m+(At+1)+Y*dt;c.push(Wt,se,jt),c.push(se,le,jt),W+=6}a.addGroup(p,W,E),p+=W,m+=Q}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new mi(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Hi(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const r=i[e][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=r.clone():Array.isArray(r)?t[e][n]=r.slice():t[e][n]=r}}return t}function Fe(i){const t={};for(let e=0;e<i.length;e++){const n=Hi(i[e]);for(const r in n)t[r]=n[r]}return t}function Rh(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Ac(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:$t.workingColorSpace}const Ch={clone:Hi,merge:Fe};var Ph=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Lh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Un extends yr{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Ph,this.fragmentShader=Lh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Hi(t.uniforms),this.uniformsGroups=Rh(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?e.uniforms[r]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[r]={type:"m4",value:o.toArray()}:e.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class wc extends Re{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new me,this.projectionMatrix=new me,this.projectionMatrixInverse=new me,this.coordinateSystem=_n,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Gn=new L,fl=new ft,dl=new ft;class Ze extends wc{constructor(t=50,e=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=dr*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(ir*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return dr*2*Math.atan(Math.tan(ir*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Gn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Gn.x,Gn.y).multiplyScalar(-t/Gn.z),Gn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Gn.x,Gn.y).multiplyScalar(-t/Gn.z)}getViewSize(t,e){return this.getViewBounds(t,fl,dl),e.subVectors(dl,fl)}setViewOffset(t,e,n,r,s,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(ir*.5*this.fov)/this.zoom,n=2*e,r=this.aspect*n,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;s+=o.offsetX*r/c,e-=o.offsetY*n/l,r*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(s+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Ri=-90,Ci=1;class Dh extends Re{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Ze(Ri,Ci,t,e);r.layers=this.layers,this.add(r);const s=new Ze(Ri,Ci,t,e);s.layers=this.layers,this.add(s);const o=new Ze(Ri,Ci,t,e);o.layers=this.layers,this.add(o);const a=new Ze(Ri,Ci,t,e);a.layers=this.layers,this.add(a);const c=new Ze(Ri,Ci,t,e);c.layers=this.layers,this.add(c);const l=new Ze(Ri,Ci,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,r,s,o,a,c]=e;for(const l of e)this.remove(l);if(t===_n)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===ss)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,c,l,u]=this.children,h=t.getRenderTarget(),m=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,r),t.render(e,s),t.setRenderTarget(n,1,r),t.render(e,o),t.setRenderTarget(n,2,r),t.render(e,a),t.setRenderTarget(n,3,r),t.render(e,c),t.setRenderTarget(n,4,r),t.render(e,l),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,r),t.render(e,u),t.setRenderTarget(h,m,p),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Rc extends ke{constructor(t=[],e=Bi,n,r,s,o,a,c,l,u){super(t,e,n,r,s,o,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Uh extends hi{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},r=[n,n,n,n,n,n];this.texture=new Rc(r),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new mi(5,5,5),s=new Un({name:"CubemapFromEquirect",uniforms:Hi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:ze,blending:Xn});s.uniforms.tEquirect.value=e;const o=new nn(r,s),a=e.minFilter;return e.minFilter===ai&&(e.minFilter=gn),new Dh(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,r=!0){const s=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,r);t.setRenderTarget(s)}}class Pn extends Re{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Ih={type:"move"};class qs{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Pn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Pn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Pn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let r=null,s=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(const _ of t.hand.values()){const d=e.getJointPose(_,n),f=this._getHandJoint(l,_);d!==null&&(f.matrix.fromArray(d.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=d.radius),f.visible=d!==null}const u=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],m=u.position.distanceTo(h.position),p=.02,g=.005;l.inputState.pinching&&m>p+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&m<=p-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(r=e.getPose(t.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Ih)))}return a!==null&&(a.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Pn;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}class ga{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new Xt(t),this.density=e}clone(){return new ga(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Nh extends Re{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new xn,this.environmentIntensity=1,this.environmentRotation=new xn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}const Ys=new L,Fh=new L,Oh=new Bt;class ni{constructor(t=new L(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,r){return this.normal.set(t,e,n),this.constant=r,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const r=Ys.subVectors(n,e).cross(Fh.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(r,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Ys),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:e.copy(t.start).addScaledVector(n,s)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Oh.getNormalMatrix(t),r=this.coplanarPoint(Ys).applyMatrix4(t),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Qn=new ma,Bh=new ft(.5,.5),Gr=new L;class _a{constructor(t=new ni,e=new ni,n=new ni,r=new ni,s=new ni,o=new ni){this.planes=[t,e,n,r,s,o]}set(t,e,n,r,s,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=_n,n=!1){const r=this.planes,s=t.elements,o=s[0],a=s[1],c=s[2],l=s[3],u=s[4],h=s[5],m=s[6],p=s[7],g=s[8],_=s[9],d=s[10],f=s[11],b=s[12],y=s[13],M=s[14],C=s[15];if(r[0].setComponents(l-o,p-u,f-g,C-b).normalize(),r[1].setComponents(l+o,p+u,f+g,C+b).normalize(),r[2].setComponents(l+a,p+h,f+_,C+y).normalize(),r[3].setComponents(l-a,p-h,f-_,C-y).normalize(),n)r[4].setComponents(c,m,d,M).normalize(),r[5].setComponents(l-c,p-m,f-d,C-M).normalize();else if(r[4].setComponents(l-c,p-m,f-d,C-M).normalize(),e===_n)r[5].setComponents(l+c,p+m,f+d,C+M).normalize();else if(e===ss)r[5].setComponents(c,m,d,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Qn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Qn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Qn)}intersectsSprite(t){Qn.center.set(0,0,0);const e=Bh.distanceTo(t.center);return Qn.radius=.7071067811865476+e,Qn.applyMatrix4(t.matrixWorld),this.intersectsSphere(Qn)}intersectsSphere(t){const e=this.planes,n=t.center,r=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const r=e[n];if(Gr.x=r.normal.x>0?t.max.x:t.min.x,Gr.y=r.normal.y>0?t.max.y:t.min.y,Gr.z=r.normal.z>0?t.max.z:t.min.z,r.distanceToPoint(Gr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class va extends ke{constructor(t,e,n,r,s,o,a,c,l){super(t,e,n,r,s,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Cc extends ke{constructor(t,e,n=ui,r,s,o,a=hn,c=hn,l,u=hr,h=1){if(u!==hr&&u!==fr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const m={width:t,height:e,depth:h};super(m,r,s,o,a,c,u,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new pa(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class Pc extends ke{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class xa extends Ue{constructor(t=1,e=32,n=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:r},e=Math.max(3,e);const s=[],o=[],a=[],c=[],l=new L,u=new ft;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let h=0,m=3;h<=e;h++,m+=3){const p=n+h/e*r;l.x=t*Math.cos(p),l.y=t*Math.sin(p),o.push(l.x,l.y,l.z),a.push(0,0,1),u.x=(o[m]/t+1)/2,u.y=(o[m+1]/t+1)/2,c.push(u.x,u.y)}for(let h=1;h<=e;h++)s.push(h,h+1,0);this.setIndex(s),this.setAttribute("position",new te(o,3)),this.setAttribute("normal",new te(a,3)),this.setAttribute("uv",new te(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new xa(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Ma extends Ue{constructor(t=1,e=1,n=1,r=32,s=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:c};const l=this;r=Math.floor(r),s=Math.floor(s);const u=[],h=[],m=[],p=[];let g=0;const _=[],d=n/2;let f=0;b(),o===!1&&(t>0&&y(!0),e>0&&y(!1)),this.setIndex(u),this.setAttribute("position",new te(h,3)),this.setAttribute("normal",new te(m,3)),this.setAttribute("uv",new te(p,2));function b(){const M=new L,C=new L;let w=0;const P=(e-t)/n;for(let I=0;I<=s;I++){const E=[],T=I/s,D=T*(e-t)+t;for(let B=0;B<=r;B++){const V=B/r,J=V*c+a,Y=Math.sin(J),Z=Math.cos(J);C.x=D*Y,C.y=-T*n+d,C.z=D*Z,h.push(C.x,C.y,C.z),M.set(Y,P,Z).normalize(),m.push(M.x,M.y,M.z),p.push(V,1-T),E.push(g++)}_.push(E)}for(let I=0;I<r;I++)for(let E=0;E<s;E++){const T=_[E][I],D=_[E+1][I],B=_[E+1][I+1],V=_[E][I+1];(t>0||E!==0)&&(u.push(T,D,V),w+=3),(e>0||E!==s-1)&&(u.push(D,B,V),w+=3)}l.addGroup(f,w,0),f+=w}function y(M){const C=g,w=new ft,P=new L;let I=0;const E=M===!0?t:e,T=M===!0?1:-1;for(let B=1;B<=r;B++)h.push(0,d*T,0),m.push(0,T,0),p.push(.5,.5),g++;const D=g;for(let B=0;B<=r;B++){const J=B/r*c+a,Y=Math.cos(J),Z=Math.sin(J);P.x=E*Z,P.y=d*T,P.z=E*Y,h.push(P.x,P.y,P.z),m.push(0,T,0),w.x=Y*.5+.5,w.y=Z*.5*T+.5,p.push(w.x,w.y),g++}for(let B=0;B<r;B++){const V=C+B,J=D+B;M===!0?u.push(J,J+1,V):u.push(J+1,J,V),I+=3}l.addGroup(f,I,M===!0?1:2),f+=I}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ma(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Mn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,r=this.getPoint(0),s=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),s+=n.distanceTo(r),e.push(s),r=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){const n=this.getLengths();let r=0;const s=n.length;let o;e?o=e:o=t*n[s-1];let a=0,c=s-1,l;for(;a<=c;)if(r=Math.floor(a+(c-a)/2),l=n[r]-o,l<0)a=r+1;else if(l>0)c=r-1;else{c=r;break}if(r=c,n[r]===o)return r/(s-1);const u=n[r],m=n[r+1]-u,p=(o-u)/m;return(r+p)/(s-1)}getTangent(t,e){let r=t-1e-4,s=t+1e-4;r<0&&(r=0),s>1&&(s=1);const o=this.getPoint(r),a=this.getPoint(s),c=e||(o.isVector2?new ft:new L);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){const n=new L,r=[],s=[],o=[],a=new L,c=new me;for(let p=0;p<=t;p++){const g=p/t;r[p]=this.getTangentAt(g,new L)}s[0]=new L,o[0]=new L;let l=Number.MAX_VALUE;const u=Math.abs(r[0].x),h=Math.abs(r[0].y),m=Math.abs(r[0].z);u<=l&&(l=u,n.set(1,0,0)),h<=l&&(l=h,n.set(0,1,0)),m<=l&&n.set(0,0,1),a.crossVectors(r[0],n).normalize(),s[0].crossVectors(r[0],a),o[0].crossVectors(r[0],s[0]);for(let p=1;p<=t;p++){if(s[p]=s[p-1].clone(),o[p]=o[p-1].clone(),a.crossVectors(r[p-1],r[p]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(Vt(r[p-1].dot(r[p]),-1,1));s[p].applyMatrix4(c.makeRotationAxis(a,g))}o[p].crossVectors(r[p],s[p])}if(e===!0){let p=Math.acos(Vt(s[0].dot(s[t]),-1,1));p/=t,r[0].dot(a.crossVectors(s[0],s[t]))>0&&(p=-p);for(let g=1;g<=t;g++)s[g].applyMatrix4(c.makeRotationAxis(r[g],p*g)),o[g].crossVectors(r[g],s[g])}return{tangents:r,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Sa extends Mn{constructor(t=0,e=0,n=1,r=1,s=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(t,e=new ft){const n=e,r=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(o?s=0:s=r),this.aClockwise===!0&&!o&&(s===r?s=-r:s=s-r);const a=this.aStartAngle+t*s;let c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),m=c-this.aX,p=l-this.aY;c=m*u-p*h+this.aX,l=m*h+p*u+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class zh extends Sa{constructor(t,e,n,r,s,o){super(t,e,n,n,r,s,o),this.isArcCurve=!0,this.type="ArcCurve"}}function ya(){let i=0,t=0,e=0,n=0;function r(s,o,a,c){i=s,t=a,e=-3*s+3*o-2*a-c,n=2*s-2*o+a+c}return{initCatmullRom:function(s,o,a,c,l){r(o,a,l*(a-s),l*(c-o))},initNonuniformCatmullRom:function(s,o,a,c,l,u,h){let m=(o-s)/l-(a-s)/(l+u)+(a-o)/u,p=(a-o)/u-(c-o)/(u+h)+(c-a)/h;m*=u,p*=u,r(o,a,m,p)},calc:function(s){const o=s*s,a=o*s;return i+t*s+e*o+n*a}}}const Vr=new L,Zs=new ya,Js=new ya,Ks=new ya;class Ea extends Mn{constructor(t=[],e=!1,n="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=r}getPoint(t,e=new L){const n=e,r=this.points,s=r.length,o=(s-(this.closed?0:1))*t;let a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:c===0&&a===s-1&&(a=s-2,c=1);let l,u;this.closed||a>0?l=r[(a-1)%s]:(Vr.subVectors(r[0],r[1]).add(r[0]),l=Vr);const h=r[a%s],m=r[(a+1)%s];if(this.closed||a+2<s?u=r[(a+2)%s]:(Vr.subVectors(r[s-1],r[s-2]).add(r[s-1]),u=Vr),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let g=Math.pow(l.distanceToSquared(h),p),_=Math.pow(h.distanceToSquared(m),p),d=Math.pow(m.distanceToSquared(u),p);_<1e-4&&(_=1),g<1e-4&&(g=_),d<1e-4&&(d=_),Zs.initNonuniformCatmullRom(l.x,h.x,m.x,u.x,g,_,d),Js.initNonuniformCatmullRom(l.y,h.y,m.y,u.y,g,_,d),Ks.initNonuniformCatmullRom(l.z,h.z,m.z,u.z,g,_,d)}else this.curveType==="catmullrom"&&(Zs.initCatmullRom(l.x,h.x,m.x,u.x,this.tension),Js.initCatmullRom(l.y,h.y,m.y,u.y,this.tension),Ks.initCatmullRom(l.z,h.z,m.z,u.z,this.tension));return n.set(Zs.calc(c),Js.calc(c),Ks.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const r=t.points[e];this.points.push(r.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const r=this.points[e];t.points.push(r.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const r=t.points[e];this.points.push(new L().fromArray(r))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function pl(i,t,e,n,r){const s=(n-t)*.5,o=(r-e)*.5,a=i*i,c=i*a;return(2*e-2*n+s+o)*c+(-3*e+3*n-2*s-o)*a+s*i+e}function kh(i,t){const e=1-i;return e*e*t}function Hh(i,t){return 2*(1-i)*i*t}function Gh(i,t){return i*i*t}function sr(i,t,e,n){return kh(i,t)+Hh(i,e)+Gh(i,n)}function Vh(i,t){const e=1-i;return e*e*e*t}function Wh(i,t){const e=1-i;return 3*e*e*i*t}function Xh(i,t){return 3*(1-i)*i*i*t}function qh(i,t){return i*i*i*t}function or(i,t,e,n,r){return Vh(i,t)+Wh(i,e)+Xh(i,n)+qh(i,r)}class Lc extends Mn{constructor(t=new ft,e=new ft,n=new ft,r=new ft){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=r}getPoint(t,e=new ft){const n=e,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(or(t,r.x,s.x,o.x,a.x),or(t,r.y,s.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Yh extends Mn{constructor(t=new L,e=new L,n=new L,r=new L){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=r}getPoint(t,e=new L){const n=e,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(or(t,r.x,s.x,o.x,a.x),or(t,r.y,s.y,o.y,a.y),or(t,r.z,s.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Dc extends Mn{constructor(t=new ft,e=new ft){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new ft){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new ft){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Zh extends Mn{constructor(t=new L,e=new L){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new L){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new L){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Uc extends Mn{constructor(t=new ft,e=new ft,n=new ft){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new ft){const n=e,r=this.v0,s=this.v1,o=this.v2;return n.set(sr(t,r.x,s.x,o.x),sr(t,r.y,s.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Ic extends Mn{constructor(t=new L,e=new L,n=new L){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new L){const n=e,r=this.v0,s=this.v1,o=this.v2;return n.set(sr(t,r.x,s.x,o.x),sr(t,r.y,s.y,o.y),sr(t,r.z,s.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Nc extends Mn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new ft){const n=e,r=this.points,s=(r.length-1)*t,o=Math.floor(s),a=s-o,c=r[o===0?o:o-1],l=r[o],u=r[o>r.length-2?r.length-1:o+1],h=r[o>r.length-3?r.length-1:o+2];return n.set(pl(a,c.x,l.x,u.x,h.x),pl(a,c.y,l.y,u.y,h.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const r=t.points[e];this.points.push(r.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const r=this.points[e];t.points.push(r.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const r=t.points[e];this.points.push(new ft().fromArray(r))}return this}}var Jo=Object.freeze({__proto__:null,ArcCurve:zh,CatmullRomCurve3:Ea,CubicBezierCurve:Lc,CubicBezierCurve3:Yh,EllipseCurve:Sa,LineCurve:Dc,LineCurve3:Zh,QuadraticBezierCurve:Uc,QuadraticBezierCurve3:Ic,SplineCurve:Nc});class Jh extends Mn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Jo[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),r=this.getCurveLengths();let s=0;for(;s<r.length;){if(r[s]>=n){const o=r[s]-n,a=this.curves[s],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,e)}s++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,r=this.curves.length;n<r;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let r=0,s=this.curves;r<s.length;r++){const o=s[r],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,c=o.getPoints(a);for(let l=0;l<c.length;l++){const u=c[l];n&&n.equals(u)||(e.push(u),n=u)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const r=t.curves[e];this.curves.push(r.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const r=this.curves[e];t.curves.push(r.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const r=t.curves[e];this.curves.push(new Jo[r.type]().fromJSON(r))}return this}}class ml extends Jh{constructor(t){super(),this.type="Path",this.currentPoint=new ft,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new Dc(this.currentPoint.clone(),new ft(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,r){const s=new Uc(this.currentPoint.clone(),new ft(t,e),new ft(n,r));return this.curves.push(s),this.currentPoint.set(n,r),this}bezierCurveTo(t,e,n,r,s,o){const a=new Lc(this.currentPoint.clone(),new ft(t,e),new ft(n,r),new ft(s,o));return this.curves.push(a),this.currentPoint.set(s,o),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new Nc(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,r,s,o){const a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,e+c,n,r,s,o),this}absarc(t,e,n,r,s,o){return this.absellipse(t,e,n,n,r,s,o),this}ellipse(t,e,n,r,s,o,a,c){const l=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(t+l,e+u,n,r,s,o,a,c),this}absellipse(t,e,n,r,s,o,a,c){const l=new Sa(t,e,n,r,s,o,a,c);if(this.curves.length>0){const h=l.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(l);const u=l.getPoint(1);return this.currentPoint.copy(u),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class Fc extends ml{constructor(t){super(t),this.uuid=pi(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,r=this.holes.length;n<r;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const r=t.holes[e];this.holes.push(r.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const r=this.holes[e];t.holes.push(r.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const r=t.holes[e];this.holes.push(new ml().fromJSON(r))}return this}}function Kh(i,t,e=2){const n=t&&t.length,r=n?t[0]*e:i.length;let s=Oc(i,0,r,e,!0);const o=[];if(!s||s.next===s.prev)return o;let a,c,l;if(n&&(s=ef(i,t,s,e)),i.length>80*e){a=1/0,c=1/0;let u=-1/0,h=-1/0;for(let m=e;m<r;m+=e){const p=i[m],g=i[m+1];p<a&&(a=p),g<c&&(c=g),p>u&&(u=p),g>h&&(h=g)}l=Math.max(u-a,h-c),l=l!==0?32767/l:0}return gr(s,o,e,a,c,l,0),o}function Oc(i,t,e,n,r){let s;if(r===df(i,t,e,n)>0)for(let o=t;o<e;o+=n)s=gl(o/n|0,i[o],i[o+1],s);else for(let o=e-n;o>=t;o-=n)s=gl(o/n|0,i[o],i[o+1],s);return s&&Gi(s,s.next)&&(vr(s),s=s.next),s}function fi(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(Gi(e,e.next)||pe(e.prev,e,e.next)===0)){if(vr(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function gr(i,t,e,n,r,s,o){if(!i)return;!o&&s&&af(i,n,r,s);let a=i;for(;i.prev!==i.next;){const c=i.prev,l=i.next;if(s?jh(i,n,r,s):$h(i)){t.push(c.i,i.i,l.i),vr(i),i=l.next,a=l.next;continue}if(i=l,i===a){o?o===1?(i=Qh(fi(i),t),gr(i,t,e,n,r,s,2)):o===2&&tf(i,t,e,n,r,s):gr(fi(i),t,e,n,r,s,1);break}}}function $h(i){const t=i.prev,e=i,n=i.next;if(pe(t,e,n)>=0)return!1;const r=t.x,s=e.x,o=n.x,a=t.y,c=e.y,l=n.y,u=Math.min(r,s,o),h=Math.min(a,c,l),m=Math.max(r,s,o),p=Math.max(a,c,l);let g=n.next;for(;g!==t;){if(g.x>=u&&g.x<=m&&g.y>=h&&g.y<=p&&er(r,a,s,c,o,l,g.x,g.y)&&pe(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function jh(i,t,e,n){const r=i.prev,s=i,o=i.next;if(pe(r,s,o)>=0)return!1;const a=r.x,c=s.x,l=o.x,u=r.y,h=s.y,m=o.y,p=Math.min(a,c,l),g=Math.min(u,h,m),_=Math.max(a,c,l),d=Math.max(u,h,m),f=Ko(p,g,t,e,n),b=Ko(_,d,t,e,n);let y=i.prevZ,M=i.nextZ;for(;y&&y.z>=f&&M&&M.z<=b;){if(y.x>=p&&y.x<=_&&y.y>=g&&y.y<=d&&y!==r&&y!==o&&er(a,u,c,h,l,m,y.x,y.y)&&pe(y.prev,y,y.next)>=0||(y=y.prevZ,M.x>=p&&M.x<=_&&M.y>=g&&M.y<=d&&M!==r&&M!==o&&er(a,u,c,h,l,m,M.x,M.y)&&pe(M.prev,M,M.next)>=0))return!1;M=M.nextZ}for(;y&&y.z>=f;){if(y.x>=p&&y.x<=_&&y.y>=g&&y.y<=d&&y!==r&&y!==o&&er(a,u,c,h,l,m,y.x,y.y)&&pe(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;M&&M.z<=b;){if(M.x>=p&&M.x<=_&&M.y>=g&&M.y<=d&&M!==r&&M!==o&&er(a,u,c,h,l,m,M.x,M.y)&&pe(M.prev,M,M.next)>=0)return!1;M=M.nextZ}return!0}function Qh(i,t){let e=i;do{const n=e.prev,r=e.next.next;!Gi(n,r)&&zc(n,e,e.next,r)&&_r(n,r)&&_r(r,n)&&(t.push(n.i,e.i,r.i),vr(e),vr(e.next),e=i=r),e=e.next}while(e!==i);return fi(e)}function tf(i,t,e,n,r,s){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&uf(o,a)){let c=kc(o,a);o=fi(o,o.next),c=fi(c,c.next),gr(o,t,e,n,r,s,0),gr(c,t,e,n,r,s,0);return}a=a.next}o=o.next}while(o!==i)}function ef(i,t,e,n){const r=[];for(let s=0,o=t.length;s<o;s++){const a=t[s]*n,c=s<o-1?t[s+1]*n:i.length,l=Oc(i,a,c,n,!1);l===l.next&&(l.steiner=!0),r.push(cf(l))}r.sort(nf);for(let s=0;s<r.length;s++)e=rf(r[s],e);return e}function nf(i,t){let e=i.x-t.x;if(e===0&&(e=i.y-t.y,e===0)){const n=(i.next.y-i.y)/(i.next.x-i.x),r=(t.next.y-t.y)/(t.next.x-t.x);e=n-r}return e}function rf(i,t){const e=sf(i,t);if(!e)return t;const n=kc(e,i);return fi(n,n.next),fi(e,e.next)}function sf(i,t){let e=t;const n=i.x,r=i.y;let s=-1/0,o;if(Gi(i,e))return e;do{if(Gi(i,e.next))return e.next;if(r<=e.y&&r>=e.next.y&&e.next.y!==e.y){const h=e.x+(r-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(h<=n&&h>s&&(s=h,o=e.x<e.next.x?e:e.next,h===n))return o}e=e.next}while(e!==t);if(!o)return null;const a=o,c=o.x,l=o.y;let u=1/0;e=o;do{if(n>=e.x&&e.x>=c&&n!==e.x&&Bc(r<l?n:s,r,c,l,r<l?s:n,r,e.x,e.y)){const h=Math.abs(r-e.y)/(n-e.x);_r(e,i)&&(h<u||h===u&&(e.x>o.x||e.x===o.x&&of(o,e)))&&(o=e,u=h)}e=e.next}while(e!==a);return o}function of(i,t){return pe(i.prev,i,t.prev)<0&&pe(t.next,i,i.next)<0}function af(i,t,e,n){let r=i;do r.z===0&&(r.z=Ko(r.x,r.y,t,e,n)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==i);r.prevZ.nextZ=null,r.prevZ=null,lf(r)}function lf(i){let t,e=1;do{let n=i,r;i=null;let s=null;for(t=0;n;){t++;let o=n,a=0;for(let l=0;l<e&&(a++,o=o.nextZ,!!o);l++);let c=e;for(;a>0||c>0&&o;)a!==0&&(c===0||!o||n.z<=o.z)?(r=n,n=n.nextZ,a--):(r=o,o=o.nextZ,c--),s?s.nextZ=r:i=r,r.prevZ=s,s=r;n=o}s.nextZ=null,e*=2}while(t>1);return i}function Ko(i,t,e,n,r){return i=(i-e)*r|0,t=(t-n)*r|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function cf(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function Bc(i,t,e,n,r,s,o,a){return(r-o)*(t-a)>=(i-o)*(s-a)&&(i-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(s-a)>=(r-o)*(n-a)}function er(i,t,e,n,r,s,o,a){return!(i===o&&t===a)&&Bc(i,t,e,n,r,s,o,a)}function uf(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!hf(i,t)&&(_r(i,t)&&_r(t,i)&&ff(i,t)&&(pe(i.prev,i,t.prev)||pe(i,t.prev,t))||Gi(i,t)&&pe(i.prev,i,i.next)>0&&pe(t.prev,t,t.next)>0)}function pe(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function Gi(i,t){return i.x===t.x&&i.y===t.y}function zc(i,t,e,n){const r=Xr(pe(i,t,e)),s=Xr(pe(i,t,n)),o=Xr(pe(e,n,i)),a=Xr(pe(e,n,t));return!!(r!==s&&o!==a||r===0&&Wr(i,e,t)||s===0&&Wr(i,n,t)||o===0&&Wr(e,i,n)||a===0&&Wr(e,t,n))}function Wr(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function Xr(i){return i>0?1:i<0?-1:0}function hf(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&zc(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function _r(i,t){return pe(i.prev,i,i.next)<0?pe(i,t,i.next)>=0&&pe(i,i.prev,t)>=0:pe(i,t,i.prev)<0||pe(i,i.next,t)<0}function ff(i,t){let e=i,n=!1;const r=(i.x+t.x)/2,s=(i.y+t.y)/2;do e.y>s!=e.next.y>s&&e.next.y!==e.y&&r<(e.next.x-e.x)*(s-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function kc(i,t){const e=$o(i.i,i.x,i.y),n=$o(t.i,t.x,t.y),r=i.next,s=t.prev;return i.next=t,t.prev=i,e.next=r,r.prev=e,n.next=e,e.prev=n,s.next=n,n.prev=s,n}function gl(i,t,e,n){const r=$o(i,t,e);return n?(r.next=n.next,r.prev=n,n.next.prev=r,n.next=r):(r.prev=r,r.next=r),r}function vr(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function $o(i,t,e){return{i,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function df(i,t,e,n){let r=0;for(let s=t,o=e-n;s<e;s+=n)r+=(i[o]-i[s])*(i[s+1]+i[o+1]),o=s;return r}class pf{static triangulate(t,e,n=2){return Kh(t,e,n)}}class ar{static area(t){const e=t.length;let n=0;for(let r=e-1,s=0;s<e;r=s++)n+=t[r].x*t[s].y-t[s].x*t[r].y;return n*.5}static isClockWise(t){return ar.area(t)<0}static triangulateShape(t,e){const n=[],r=[],s=[];_l(t),vl(n,t);let o=t.length;e.forEach(_l);for(let c=0;c<e.length;c++)r.push(o),o+=e[c].length,vl(n,e[c]);const a=pf.triangulate(n,r);for(let c=0;c<a.length;c+=3)s.push(a.slice(c,c+3));return s}}function _l(i){const t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function vl(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}class Ta extends Ue{constructor(t=[new ft(0,-.5),new ft(.5,0),new ft(0,.5)],e=12,n=0,r=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:r},e=Math.floor(e),r=Vt(r,0,Math.PI*2);const s=[],o=[],a=[],c=[],l=[],u=1/e,h=new L,m=new ft,p=new L,g=new L,_=new L;let d=0,f=0;for(let b=0;b<=t.length-1;b++)switch(b){case 0:d=t[b+1].x-t[b].x,f=t[b+1].y-t[b].y,p.x=f*1,p.y=-d,p.z=f*0,_.copy(p),p.normalize(),c.push(p.x,p.y,p.z);break;case t.length-1:c.push(_.x,_.y,_.z);break;default:d=t[b+1].x-t[b].x,f=t[b+1].y-t[b].y,p.x=f*1,p.y=-d,p.z=f*0,g.copy(p),p.x+=_.x,p.y+=_.y,p.z+=_.z,p.normalize(),c.push(p.x,p.y,p.z),_.copy(g)}for(let b=0;b<=e;b++){const y=n+b*u*r,M=Math.sin(y),C=Math.cos(y);for(let w=0;w<=t.length-1;w++){h.x=t[w].x*M,h.y=t[w].y,h.z=t[w].x*C,o.push(h.x,h.y,h.z),m.x=b/e,m.y=w/(t.length-1),a.push(m.x,m.y);const P=c[3*w+0]*M,I=c[3*w+1],E=c[3*w+0]*C;l.push(P,I,E)}}for(let b=0;b<e;b++)for(let y=0;y<t.length-1;y++){const M=y+b*t.length,C=M,w=M+t.length,P=M+t.length+1,I=M+1;s.push(C,w,I),s.push(P,I,w)}this.setIndex(s),this.setAttribute("position",new te(o,3)),this.setAttribute("uv",new te(a,2)),this.setAttribute("normal",new te(l,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ta(t.points,t.segments,t.phiStart,t.phiLength)}}class He extends Ue{constructor(t=1,e=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:r};const s=t/2,o=e/2,a=Math.floor(n),c=Math.floor(r),l=a+1,u=c+1,h=t/a,m=e/c,p=[],g=[],_=[],d=[];for(let f=0;f<u;f++){const b=f*m-o;for(let y=0;y<l;y++){const M=y*h-s;g.push(M,-b,0),_.push(0,0,1),d.push(y/a),d.push(1-f/c)}}for(let f=0;f<c;f++)for(let b=0;b<a;b++){const y=b+l*f,M=b+l*(f+1),C=b+1+l*(f+1),w=b+1+l*f;p.push(y,M,w),p.push(M,C,w)}this.setIndex(p),this.setAttribute("position",new te(g,3)),this.setAttribute("normal",new te(_,3)),this.setAttribute("uv",new te(d,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new He(t.width,t.height,t.widthSegments,t.heightSegments)}}class ba extends Ue{constructor(t=new Fc([new ft(0,.5),new ft(-.5,-.5),new ft(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};const n=[],r=[],s=[],o=[];let a=0,c=0;if(Array.isArray(t)===!1)l(t);else for(let u=0;u<t.length;u++)l(t[u]),this.addGroup(a,c,u),a+=c,c=0;this.setIndex(n),this.setAttribute("position",new te(r,3)),this.setAttribute("normal",new te(s,3)),this.setAttribute("uv",new te(o,2));function l(u){const h=r.length/3,m=u.extractPoints(e);let p=m.shape;const g=m.holes;ar.isClockWise(p)===!1&&(p=p.reverse());for(let d=0,f=g.length;d<f;d++){const b=g[d];ar.isClockWise(b)===!0&&(g[d]=b.reverse())}const _=ar.triangulateShape(p,g);for(let d=0,f=g.length;d<f;d++){const b=g[d];p=p.concat(b)}for(let d=0,f=p.length;d<f;d++){const b=p[d];r.push(b.x,b.y,0),s.push(0,0,1),o.push(b.x,b.y)}for(let d=0,f=_.length;d<f;d++){const b=_[d],y=b[0]+h,M=b[1]+h,C=b[2]+h;n.push(y,M,C),c+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes;return mf(e,t)}static fromJSON(t,e){const n=[];for(let r=0,s=t.shapes.length;r<s;r++){const o=e[t.shapes[r]];n.push(o)}return new ba(n,t.curveSegments)}}function mf(i,t){if(t.shapes=[],Array.isArray(i))for(let e=0,n=i.length;e<n;e++){const r=i[e];t.shapes.push(r.uuid)}else t.shapes.push(i.uuid);return t}class ps extends Ue{constructor(t=1,e=32,n=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(o+a,Math.PI);let l=0;const u=[],h=new L,m=new L,p=[],g=[],_=[],d=[];for(let f=0;f<=n;f++){const b=[],y=f/n;let M=0;f===0&&o===0?M=.5/e:f===n&&c===Math.PI&&(M=-.5/e);for(let C=0;C<=e;C++){const w=C/e;h.x=-t*Math.cos(r+w*s)*Math.sin(o+y*a),h.y=t*Math.cos(o+y*a),h.z=t*Math.sin(r+w*s)*Math.sin(o+y*a),g.push(h.x,h.y,h.z),m.copy(h).normalize(),_.push(m.x,m.y,m.z),d.push(w+M,1-y),b.push(l++)}u.push(b)}for(let f=0;f<n;f++)for(let b=0;b<e;b++){const y=u[f][b+1],M=u[f][b],C=u[f+1][b],w=u[f+1][b+1];(f!==0||o>0)&&p.push(y,M,w),(f!==n-1||c<Math.PI)&&p.push(M,C,w)}this.setIndex(p),this.setAttribute("position",new te(g,3)),this.setAttribute("normal",new te(_,3)),this.setAttribute("uv",new te(d,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ps(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class ms extends Ue{constructor(t=1,e=.4,n=12,r=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:r,arc:s},n=Math.floor(n),r=Math.floor(r);const o=[],a=[],c=[],l=[],u=new L,h=new L,m=new L;for(let p=0;p<=n;p++)for(let g=0;g<=r;g++){const _=g/r*s,d=p/n*Math.PI*2;h.x=(t+e*Math.cos(d))*Math.cos(_),h.y=(t+e*Math.cos(d))*Math.sin(_),h.z=e*Math.sin(d),a.push(h.x,h.y,h.z),u.x=t*Math.cos(_),u.y=t*Math.sin(_),m.subVectors(h,u).normalize(),c.push(m.x,m.y,m.z),l.push(g/r),l.push(p/n)}for(let p=1;p<=n;p++)for(let g=1;g<=r;g++){const _=(r+1)*p+g-1,d=(r+1)*(p-1)+g-1,f=(r+1)*(p-1)+g,b=(r+1)*p+g;o.push(_,d,b),o.push(d,f,b)}this.setIndex(o),this.setAttribute("position",new te(a,3)),this.setAttribute("normal",new te(c,3)),this.setAttribute("uv",new te(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ms(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class gs extends Ue{constructor(t=new Ic(new L(-1,-1,0),new L(-1,1,0),new L(1,1,0)),e=64,n=1,r=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:r,closed:s};const o=t.computeFrenetFrames(e,s);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const a=new L,c=new L,l=new ft;let u=new L;const h=[],m=[],p=[],g=[];_(),this.setIndex(g),this.setAttribute("position",new te(h,3)),this.setAttribute("normal",new te(m,3)),this.setAttribute("uv",new te(p,2));function _(){for(let y=0;y<e;y++)d(y);d(s===!1?e:0),b(),f()}function d(y){u=t.getPointAt(y/e,u);const M=o.normals[y],C=o.binormals[y];for(let w=0;w<=r;w++){const P=w/r*Math.PI*2,I=Math.sin(P),E=-Math.cos(P);c.x=E*M.x+I*C.x,c.y=E*M.y+I*C.y,c.z=E*M.z+I*C.z,c.normalize(),m.push(c.x,c.y,c.z),a.x=u.x+n*c.x,a.y=u.y+n*c.y,a.z=u.z+n*c.z,h.push(a.x,a.y,a.z)}}function f(){for(let y=1;y<=e;y++)for(let M=1;M<=r;M++){const C=(r+1)*(y-1)+(M-1),w=(r+1)*y+(M-1),P=(r+1)*y+M,I=(r+1)*(y-1)+M;g.push(C,w,I),g.push(w,P,I)}}function b(){for(let y=0;y<=e;y++)for(let M=0;M<=r;M++)l.x=y/e,l.y=M/r,p.push(l.x,l.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new gs(new Jo[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}class as extends yr{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Xt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Xt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=vc,this.normalScale=new ft(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new xn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class gf extends yr{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Fu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class _f extends yr{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Aa extends Re{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Xt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class vf extends Aa{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Re.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Xt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const $s=new me,xl=new L,Ml=new L;class Hc{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ft(512,512),this.mapType=vn,this.map=null,this.mapPass=null,this.matrix=new me,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new _a,this._frameExtents=new ft(1,1),this._viewportCount=1,this._viewports=[new ie(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;xl.setFromMatrixPosition(t.matrixWorld),e.position.copy(xl),Ml.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Ml),e.updateMatrixWorld(),$s.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix($s,e.coordinateSystem,e.reversedDepth),e.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply($s)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const Sl=new me,ji=new L,js=new L;class xf extends Hc{constructor(){super(new Ze(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ft(4,2),this._viewportCount=6,this._viewports=[new ie(2,1,1,1),new ie(0,1,1,1),new ie(3,1,1,1),new ie(1,1,1,1),new ie(3,0,1,1),new ie(1,0,1,1)],this._cubeDirections=[new L(1,0,0),new L(-1,0,0),new L(0,0,1),new L(0,0,-1),new L(0,1,0),new L(0,-1,0)],this._cubeUps=[new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,0,1),new L(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,r=this.matrix,s=t.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),ji.setFromMatrixPosition(t.matrixWorld),n.position.copy(ji),js.copy(n.position),js.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(js),n.updateMatrixWorld(),r.makeTranslation(-ji.x,-ji.y,-ji.z),Sl.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Sl,n.coordinateSystem,n.reversedDepth)}}class ls extends Aa{constructor(t,e,n=0,r=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=r,this.shadow=new xf}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class Gc extends wc{constructor(t=-1,e=1,n=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-t,o=n+t,a=r+e,c=r-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,o=s+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class Mf extends Hc{constructor(){super(new Gc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Sf extends Aa{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Re.DEFAULT_UP),this.updateMatrix(),this.target=new Re,this.shadow=new Mf}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class yf extends Ze{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}function yl(i,t,e,n){const r=Ef(n);switch(e){case pc:return i*t;case gc:return i*t/r.components*r.byteLength;case ua:return i*t/r.components*r.byteLength;case _c:return i*t*2/r.components*r.byteLength;case ha:return i*t*2/r.components*r.byteLength;case mc:return i*t*3/r.components*r.byteLength;case un:return i*t*4/r.components*r.byteLength;case fa:return i*t*4/r.components*r.byteLength;case Kr:case $r:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case jr:case Qr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case yo:case To:return Math.max(i,16)*Math.max(t,8)/4;case So:case Eo:return Math.max(i,8)*Math.max(t,8)/2;case bo:case Ao:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case wo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ro:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Co:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Po:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Lo:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Do:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Uo:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Io:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case No:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Fo:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Oo:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Bo:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case zo:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case ko:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Ho:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Go:case Vo:case Wo:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Xo:case qo:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Yo:case Zo:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Ef(i){switch(i){case vn:case uc:return{byteLength:1,components:1};case cr:case hc:case xr:return{byteLength:2,components:1};case la:case ca:return{byteLength:2,components:4};case ui:case aa:case Cn:return{byteLength:4,components:1};case fc:case dc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:oa}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=oa);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Vc(){let i=null,t=!1,e=null,n=null;function r(s,o){e(s,o),n=i.requestAnimationFrame(r)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(r),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){i=s}}}function Tf(i){const t=new WeakMap;function e(a,c){const l=a.array,u=a.usage,h=l.byteLength,m=i.createBuffer();i.bindBuffer(c,m),i.bufferData(c,l,u),a.onUploadCallback();let p;if(l instanceof Float32Array)p=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)p=i.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=i.SHORT;else if(l instanceof Uint32Array)p=i.UNSIGNED_INT;else if(l instanceof Int32Array)p=i.INT;else if(l instanceof Int8Array)p=i.BYTE;else if(l instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:m,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:h}}function n(a,c,l){const u=c.array,h=c.updateRanges;if(i.bindBuffer(l,a),h.length===0)i.bufferSubData(l,0,u);else{h.sort((p,g)=>p.start-g.start);let m=0;for(let p=1;p<h.length;p++){const g=h[m],_=h[p];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++m,h[m]=_)}h.length=m+1;for(let p=0,g=h.length;p<g;p++){const _=h[p];i.bufferSubData(l,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=t.get(a);c&&(i.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=t.get(a);(!u||u.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:r,remove:s,update:o}}var bf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Af=`#ifdef USE_ALPHAHASH
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
#endif`,wf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Rf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Cf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Pf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Lf=`#ifdef USE_AOMAP
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
#endif`,Df=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Uf=`#ifdef USE_BATCHING
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
#endif`,If=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Nf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Ff=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Of=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Bf=`#ifdef USE_IRIDESCENCE
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
#endif`,zf=`#ifdef USE_BUMPMAP
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
#endif`,kf=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Hf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Gf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Vf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Wf=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Xf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,qf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Yf=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Zf=`#define PI 3.141592653589793
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
} // validated`,Jf=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Kf=`vec3 transformedNormal = objectNormal;
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
#endif`,$f=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,jf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Qf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,td=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,ed="gl_FragColor = linearToOutputTexel( gl_FragColor );",nd=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,id=`#ifdef USE_ENVMAP
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
#endif`,rd=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,sd=`#ifdef USE_ENVMAP
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
#endif`,od=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ad=`#ifdef USE_ENVMAP
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
#endif`,ld=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,cd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ud=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,hd=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,fd=`#ifdef USE_GRADIENTMAP
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
}`,dd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,pd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,md=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,gd=`uniform bool receiveShadow;
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
#endif`,_d=`#ifdef USE_ENVMAP
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
#endif`,vd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,xd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Md=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Sd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,yd=`PhysicalMaterial material;
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
#endif`,Ed=`struct PhysicalMaterial {
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
}`,Td=`
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
#endif`,bd=`#if defined( RE_IndirectDiffuse )
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
#endif`,Ad=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,wd=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Rd=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Cd=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Pd=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Ld=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Dd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Ud=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Id=`#if defined( USE_POINTS_UV )
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
#endif`,Nd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Fd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Od=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Bd=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,zd=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,kd=`#ifdef USE_MORPHTARGETS
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
#endif`,Hd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Gd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Vd=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Wd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Xd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,qd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Yd=`#ifdef USE_NORMALMAP
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
#endif`,Zd=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Jd=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Kd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,$d=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,jd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Qd=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,tp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,ep=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,np=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,ip=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,rp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,sp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,op=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,ap=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,lp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,cp=`float getShadowMask() {
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
}`,up=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,hp=`#ifdef USE_SKINNING
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
#endif`,fp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,dp=`#ifdef USE_SKINNING
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
#endif`,pp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,mp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,gp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,_p=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,vp=`#ifdef USE_TRANSMISSION
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
#endif`,xp=`#ifdef USE_TRANSMISSION
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
#endif`,Mp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Sp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,yp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ep=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Tp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,bp=`uniform sampler2D t2D;
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
}`,Ap=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,wp=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Rp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Cp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Pp=`#include <common>
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
}`,Lp=`#if DEPTH_PACKING == 3200
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
}`,Dp=`#define DISTANCE
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
}`,Up=`#define DISTANCE
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
}`,Ip=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Np=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Fp=`uniform float scale;
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
}`,Op=`uniform vec3 diffuse;
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
}`,Bp=`#include <common>
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
}`,zp=`uniform vec3 diffuse;
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
}`,kp=`#define LAMBERT
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
}`,Hp=`#define LAMBERT
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
}`,Gp=`#define MATCAP
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
}`,Vp=`#define MATCAP
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
}`,Wp=`#define NORMAL
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
}`,Xp=`#define NORMAL
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
}`,qp=`#define PHONG
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
}`,Yp=`#define PHONG
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
}`,Zp=`#define STANDARD
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
}`,Jp=`#define STANDARD
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
}`,Kp=`#define TOON
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
}`,$p=`#define TOON
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
}`,jp=`uniform float size;
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
}`,Qp=`uniform vec3 diffuse;
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
}`,tm=`#include <common>
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
}`,em=`uniform vec3 color;
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
}`,nm=`uniform float rotation;
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
}`,im=`uniform vec3 diffuse;
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
}`,kt={alphahash_fragment:bf,alphahash_pars_fragment:Af,alphamap_fragment:wf,alphamap_pars_fragment:Rf,alphatest_fragment:Cf,alphatest_pars_fragment:Pf,aomap_fragment:Lf,aomap_pars_fragment:Df,batching_pars_vertex:Uf,batching_vertex:If,begin_vertex:Nf,beginnormal_vertex:Ff,bsdfs:Of,iridescence_fragment:Bf,bumpmap_pars_fragment:zf,clipping_planes_fragment:kf,clipping_planes_pars_fragment:Hf,clipping_planes_pars_vertex:Gf,clipping_planes_vertex:Vf,color_fragment:Wf,color_pars_fragment:Xf,color_pars_vertex:qf,color_vertex:Yf,common:Zf,cube_uv_reflection_fragment:Jf,defaultnormal_vertex:Kf,displacementmap_pars_vertex:$f,displacementmap_vertex:jf,emissivemap_fragment:Qf,emissivemap_pars_fragment:td,colorspace_fragment:ed,colorspace_pars_fragment:nd,envmap_fragment:id,envmap_common_pars_fragment:rd,envmap_pars_fragment:sd,envmap_pars_vertex:od,envmap_physical_pars_fragment:_d,envmap_vertex:ad,fog_vertex:ld,fog_pars_vertex:cd,fog_fragment:ud,fog_pars_fragment:hd,gradientmap_pars_fragment:fd,lightmap_pars_fragment:dd,lights_lambert_fragment:pd,lights_lambert_pars_fragment:md,lights_pars_begin:gd,lights_toon_fragment:vd,lights_toon_pars_fragment:xd,lights_phong_fragment:Md,lights_phong_pars_fragment:Sd,lights_physical_fragment:yd,lights_physical_pars_fragment:Ed,lights_fragment_begin:Td,lights_fragment_maps:bd,lights_fragment_end:Ad,logdepthbuf_fragment:wd,logdepthbuf_pars_fragment:Rd,logdepthbuf_pars_vertex:Cd,logdepthbuf_vertex:Pd,map_fragment:Ld,map_pars_fragment:Dd,map_particle_fragment:Ud,map_particle_pars_fragment:Id,metalnessmap_fragment:Nd,metalnessmap_pars_fragment:Fd,morphinstance_vertex:Od,morphcolor_vertex:Bd,morphnormal_vertex:zd,morphtarget_pars_vertex:kd,morphtarget_vertex:Hd,normal_fragment_begin:Gd,normal_fragment_maps:Vd,normal_pars_fragment:Wd,normal_pars_vertex:Xd,normal_vertex:qd,normalmap_pars_fragment:Yd,clearcoat_normal_fragment_begin:Zd,clearcoat_normal_fragment_maps:Jd,clearcoat_pars_fragment:Kd,iridescence_pars_fragment:$d,opaque_fragment:jd,packing:Qd,premultiplied_alpha_fragment:tp,project_vertex:ep,dithering_fragment:np,dithering_pars_fragment:ip,roughnessmap_fragment:rp,roughnessmap_pars_fragment:sp,shadowmap_pars_fragment:op,shadowmap_pars_vertex:ap,shadowmap_vertex:lp,shadowmask_pars_fragment:cp,skinbase_vertex:up,skinning_pars_vertex:hp,skinning_vertex:fp,skinnormal_vertex:dp,specularmap_fragment:pp,specularmap_pars_fragment:mp,tonemapping_fragment:gp,tonemapping_pars_fragment:_p,transmission_fragment:vp,transmission_pars_fragment:xp,uv_pars_fragment:Mp,uv_pars_vertex:Sp,uv_vertex:yp,worldpos_vertex:Ep,background_vert:Tp,background_frag:bp,backgroundCube_vert:Ap,backgroundCube_frag:wp,cube_vert:Rp,cube_frag:Cp,depth_vert:Pp,depth_frag:Lp,distanceRGBA_vert:Dp,distanceRGBA_frag:Up,equirect_vert:Ip,equirect_frag:Np,linedashed_vert:Fp,linedashed_frag:Op,meshbasic_vert:Bp,meshbasic_frag:zp,meshlambert_vert:kp,meshlambert_frag:Hp,meshmatcap_vert:Gp,meshmatcap_frag:Vp,meshnormal_vert:Wp,meshnormal_frag:Xp,meshphong_vert:qp,meshphong_frag:Yp,meshphysical_vert:Zp,meshphysical_frag:Jp,meshtoon_vert:Kp,meshtoon_frag:$p,points_vert:jp,points_frag:Qp,shadow_vert:tm,shadow_frag:em,sprite_vert:nm,sprite_frag:im},at={common:{diffuse:{value:new Xt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Bt},alphaMap:{value:null},alphaMapTransform:{value:new Bt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Bt}},envmap:{envMap:{value:null},envMapRotation:{value:new Bt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Bt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Bt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Bt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Bt},normalScale:{value:new ft(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Bt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Bt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Bt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Bt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Xt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Xt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Bt},alphaTest:{value:0},uvTransform:{value:new Bt}},sprite:{diffuse:{value:new Xt(16777215)},opacity:{value:1},center:{value:new ft(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Bt},alphaMap:{value:null},alphaMapTransform:{value:new Bt},alphaTest:{value:0}}},mn={basic:{uniforms:Fe([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.fog]),vertexShader:kt.meshbasic_vert,fragmentShader:kt.meshbasic_frag},lambert:{uniforms:Fe([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.fog,at.lights,{emissive:{value:new Xt(0)}}]),vertexShader:kt.meshlambert_vert,fragmentShader:kt.meshlambert_frag},phong:{uniforms:Fe([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.fog,at.lights,{emissive:{value:new Xt(0)},specular:{value:new Xt(1118481)},shininess:{value:30}}]),vertexShader:kt.meshphong_vert,fragmentShader:kt.meshphong_frag},standard:{uniforms:Fe([at.common,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.roughnessmap,at.metalnessmap,at.fog,at.lights,{emissive:{value:new Xt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:kt.meshphysical_vert,fragmentShader:kt.meshphysical_frag},toon:{uniforms:Fe([at.common,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.gradientmap,at.fog,at.lights,{emissive:{value:new Xt(0)}}]),vertexShader:kt.meshtoon_vert,fragmentShader:kt.meshtoon_frag},matcap:{uniforms:Fe([at.common,at.bumpmap,at.normalmap,at.displacementmap,at.fog,{matcap:{value:null}}]),vertexShader:kt.meshmatcap_vert,fragmentShader:kt.meshmatcap_frag},points:{uniforms:Fe([at.points,at.fog]),vertexShader:kt.points_vert,fragmentShader:kt.points_frag},dashed:{uniforms:Fe([at.common,at.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:kt.linedashed_vert,fragmentShader:kt.linedashed_frag},depth:{uniforms:Fe([at.common,at.displacementmap]),vertexShader:kt.depth_vert,fragmentShader:kt.depth_frag},normal:{uniforms:Fe([at.common,at.bumpmap,at.normalmap,at.displacementmap,{opacity:{value:1}}]),vertexShader:kt.meshnormal_vert,fragmentShader:kt.meshnormal_frag},sprite:{uniforms:Fe([at.sprite,at.fog]),vertexShader:kt.sprite_vert,fragmentShader:kt.sprite_frag},background:{uniforms:{uvTransform:{value:new Bt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:kt.background_vert,fragmentShader:kt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Bt}},vertexShader:kt.backgroundCube_vert,fragmentShader:kt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:kt.cube_vert,fragmentShader:kt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:kt.equirect_vert,fragmentShader:kt.equirect_frag},distanceRGBA:{uniforms:Fe([at.common,at.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:kt.distanceRGBA_vert,fragmentShader:kt.distanceRGBA_frag},shadow:{uniforms:Fe([at.lights,at.fog,{color:{value:new Xt(0)},opacity:{value:1}}]),vertexShader:kt.shadow_vert,fragmentShader:kt.shadow_frag}};mn.physical={uniforms:Fe([mn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Bt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Bt},clearcoatNormalScale:{value:new ft(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Bt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Bt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Bt},sheen:{value:0},sheenColor:{value:new Xt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Bt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Bt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Bt},transmissionSamplerSize:{value:new ft},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Bt},attenuationDistance:{value:0},attenuationColor:{value:new Xt(0)},specularColor:{value:new Xt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Bt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Bt},anisotropyVector:{value:new ft},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Bt}}]),vertexShader:kt.meshphysical_vert,fragmentShader:kt.meshphysical_frag};const qr={r:0,b:0,g:0},ti=new xn,rm=new me;function sm(i,t,e,n,r,s,o){const a=new Xt(0);let c=s===!0?0:1,l,u,h=null,m=0,p=null;function g(y){let M=y.isScene===!0?y.background:null;return M&&M.isTexture&&(M=(y.backgroundBlurriness>0?e:t).get(M)),M}function _(y){let M=!1;const C=g(y);C===null?f(a,c):C&&C.isColor&&(f(C,1),M=!0);const w=i.xr.getEnvironmentBlendMode();w==="additive"?n.buffers.color.setClear(0,0,0,1,o):w==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||M)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function d(y,M){const C=g(M);C&&(C.isCubeTexture||C.mapping===ds)?(u===void 0&&(u=new nn(new mi(1,1,1),new Un({name:"BackgroundCubeMaterial",uniforms:Hi(mn.backgroundCube.uniforms),vertexShader:mn.backgroundCube.vertexShader,fragmentShader:mn.backgroundCube.fragmentShader,side:ze,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(w,P,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),ti.copy(M.backgroundRotation),ti.x*=-1,ti.y*=-1,ti.z*=-1,C.isCubeTexture&&C.isRenderTargetTexture===!1&&(ti.y*=-1,ti.z*=-1),u.material.uniforms.envMap.value=C,u.material.uniforms.flipEnvMap.value=C.isCubeTexture&&C.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(rm.makeRotationFromEuler(ti)),u.material.toneMapped=$t.getTransfer(C.colorSpace)!==ne,(h!==C||m!==C.version||p!==i.toneMapping)&&(u.material.needsUpdate=!0,h=C,m=C.version,p=i.toneMapping),u.layers.enableAll(),y.unshift(u,u.geometry,u.material,0,0,null)):C&&C.isTexture&&(l===void 0&&(l=new nn(new He(2,2),new Un({name:"BackgroundMaterial",uniforms:Hi(mn.background.uniforms),vertexShader:mn.background.vertexShader,fragmentShader:mn.background.fragmentShader,side:Yn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(l)),l.material.uniforms.t2D.value=C,l.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,l.material.toneMapped=$t.getTransfer(C.colorSpace)!==ne,C.matrixAutoUpdate===!0&&C.updateMatrix(),l.material.uniforms.uvTransform.value.copy(C.matrix),(h!==C||m!==C.version||p!==i.toneMapping)&&(l.material.needsUpdate=!0,h=C,m=C.version,p=i.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null))}function f(y,M){y.getRGB(qr,Ac(i)),n.buffers.color.setClear(qr.r,qr.g,qr.b,M,o)}function b(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(y,M=1){a.set(y),c=M,f(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(y){c=y,f(a,c)},render:_,addToRenderList:d,dispose:b}}function om(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=m(null);let s=r,o=!1;function a(T,D,B,V,J){let Y=!1;const Z=h(V,B,D);s!==Z&&(s=Z,l(s.object)),Y=p(T,V,B,J),Y&&g(T,V,B,J),J!==null&&t.update(J,i.ELEMENT_ARRAY_BUFFER),(Y||o)&&(o=!1,M(T,D,B,V),J!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(J).buffer))}function c(){return i.createVertexArray()}function l(T){return i.bindVertexArray(T)}function u(T){return i.deleteVertexArray(T)}function h(T,D,B){const V=B.wireframe===!0;let J=n[T.id];J===void 0&&(J={},n[T.id]=J);let Y=J[D.id];Y===void 0&&(Y={},J[D.id]=Y);let Z=Y[V];return Z===void 0&&(Z=m(c()),Y[V]=Z),Z}function m(T){const D=[],B=[],V=[];for(let J=0;J<e;J++)D[J]=0,B[J]=0,V[J]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:B,attributeDivisors:V,object:T,attributes:{},index:null}}function p(T,D,B,V){const J=s.attributes,Y=D.attributes;let Z=0;const Q=B.getAttributes();for(const W in Q)if(Q[W].location>=0){const dt=J[W];let At=Y[W];if(At===void 0&&(W==="instanceMatrix"&&T.instanceMatrix&&(At=T.instanceMatrix),W==="instanceColor"&&T.instanceColor&&(At=T.instanceColor)),dt===void 0||dt.attribute!==At||At&&dt.data!==At.data)return!0;Z++}return s.attributesNum!==Z||s.index!==V}function g(T,D,B,V){const J={},Y=D.attributes;let Z=0;const Q=B.getAttributes();for(const W in Q)if(Q[W].location>=0){let dt=Y[W];dt===void 0&&(W==="instanceMatrix"&&T.instanceMatrix&&(dt=T.instanceMatrix),W==="instanceColor"&&T.instanceColor&&(dt=T.instanceColor));const At={};At.attribute=dt,dt&&dt.data&&(At.data=dt.data),J[W]=At,Z++}s.attributes=J,s.attributesNum=Z,s.index=V}function _(){const T=s.newAttributes;for(let D=0,B=T.length;D<B;D++)T[D]=0}function d(T){f(T,0)}function f(T,D){const B=s.newAttributes,V=s.enabledAttributes,J=s.attributeDivisors;B[T]=1,V[T]===0&&(i.enableVertexAttribArray(T),V[T]=1),J[T]!==D&&(i.vertexAttribDivisor(T,D),J[T]=D)}function b(){const T=s.newAttributes,D=s.enabledAttributes;for(let B=0,V=D.length;B<V;B++)D[B]!==T[B]&&(i.disableVertexAttribArray(B),D[B]=0)}function y(T,D,B,V,J,Y,Z){Z===!0?i.vertexAttribIPointer(T,D,B,J,Y):i.vertexAttribPointer(T,D,B,V,J,Y)}function M(T,D,B,V){_();const J=V.attributes,Y=B.getAttributes(),Z=D.defaultAttributeValues;for(const Q in Y){const W=Y[Q];if(W.location>=0){let lt=J[Q];if(lt===void 0&&(Q==="instanceMatrix"&&T.instanceMatrix&&(lt=T.instanceMatrix),Q==="instanceColor"&&T.instanceColor&&(lt=T.instanceColor)),lt!==void 0){const dt=lt.normalized,At=lt.itemSize,Wt=t.get(lt);if(Wt===void 0)continue;const se=Wt.buffer,le=Wt.type,jt=Wt.bytesPerElement,K=le===i.INT||le===i.UNSIGNED_INT||lt.gpuType===aa;if(lt.isInterleavedBufferAttribute){const tt=lt.data,gt=tt.stride,It=lt.offset;if(tt.isInstancedInterleavedBuffer){for(let bt=0;bt<W.locationSize;bt++)f(W.location+bt,tt.meshPerAttribute);T.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=tt.meshPerAttribute*tt.count)}else for(let bt=0;bt<W.locationSize;bt++)d(W.location+bt);i.bindBuffer(i.ARRAY_BUFFER,se);for(let bt=0;bt<W.locationSize;bt++)y(W.location+bt,At/W.locationSize,le,dt,gt*jt,(It+At/W.locationSize*bt)*jt,K)}else{if(lt.isInstancedBufferAttribute){for(let tt=0;tt<W.locationSize;tt++)f(W.location+tt,lt.meshPerAttribute);T.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=lt.meshPerAttribute*lt.count)}else for(let tt=0;tt<W.locationSize;tt++)d(W.location+tt);i.bindBuffer(i.ARRAY_BUFFER,se);for(let tt=0;tt<W.locationSize;tt++)y(W.location+tt,At/W.locationSize,le,dt,At*jt,At/W.locationSize*tt*jt,K)}}else if(Z!==void 0){const dt=Z[Q];if(dt!==void 0)switch(dt.length){case 2:i.vertexAttrib2fv(W.location,dt);break;case 3:i.vertexAttrib3fv(W.location,dt);break;case 4:i.vertexAttrib4fv(W.location,dt);break;default:i.vertexAttrib1fv(W.location,dt)}}}}b()}function C(){I();for(const T in n){const D=n[T];for(const B in D){const V=D[B];for(const J in V)u(V[J].object),delete V[J];delete D[B]}delete n[T]}}function w(T){if(n[T.id]===void 0)return;const D=n[T.id];for(const B in D){const V=D[B];for(const J in V)u(V[J].object),delete V[J];delete D[B]}delete n[T.id]}function P(T){for(const D in n){const B=n[D];if(B[T.id]===void 0)continue;const V=B[T.id];for(const J in V)u(V[J].object),delete V[J];delete B[T.id]}}function I(){E(),o=!0,s!==r&&(s=r,l(s.object))}function E(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:I,resetDefaultState:E,dispose:C,releaseStatesOfGeometry:w,releaseStatesOfProgram:P,initAttributes:_,enableAttribute:d,disableUnusedAttributes:b}}function am(i,t,e){let n;function r(l){n=l}function s(l,u){i.drawArrays(n,l,u),e.update(u,n,1)}function o(l,u,h){h!==0&&(i.drawArraysInstanced(n,l,u,h),e.update(u,n,h))}function a(l,u,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,u,0,h);let p=0;for(let g=0;g<h;g++)p+=u[g];e.update(p,n,1)}function c(l,u,h,m){if(h===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<l.length;g++)o(l[g],u[g],m[g]);else{p.multiDrawArraysInstancedWEBGL(n,l,0,u,0,m,0,h);let g=0;for(let _=0;_<h;_++)g+=u[_]*m[_];e.update(g,n,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function lm(i,t,e,n){let r;function s(){if(r!==void 0)return r;if(t.has("EXT_texture_filter_anisotropic")===!0){const P=t.get("EXT_texture_filter_anisotropic");r=i.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(P){return!(P!==un&&n.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(P){const I=P===xr&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(P!==vn&&n.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==Cn&&!I)}function c(P){if(P==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const u=c(l);u!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const h=e.logarithmicDepthBuffer===!0,m=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),d=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),f=i.getParameter(i.MAX_VERTEX_ATTRIBS),b=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),y=i.getParameter(i.MAX_VARYING_VECTORS),M=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),C=g>0,w=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:h,reversedDepthBuffer:m,maxTextures:p,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:d,maxAttributes:f,maxVertexUniforms:b,maxVaryings:y,maxFragmentUniforms:M,vertexTextures:C,maxSamples:w}}function cm(i){const t=this;let e=null,n=0,r=!1,s=!1;const o=new ni,a=new Bt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,m){const p=h.length!==0||m||n!==0||r;return r=m,n=h.length,p},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,m){e=u(h,m,0)},this.setState=function(h,m,p){const g=h.clippingPlanes,_=h.clipIntersection,d=h.clipShadows,f=i.get(h);if(!r||g===null||g.length===0||s&&!d)s?u(null):l();else{const b=s?0:n,y=b*4;let M=f.clippingState||null;c.value=M,M=u(g,m,y,p);for(let C=0;C!==y;++C)M[C]=e[C];f.clippingState=M,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=b}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function u(h,m,p,g){const _=h!==null?h.length:0;let d=null;if(_!==0){if(d=c.value,g!==!0||d===null){const f=p+_*4,b=m.matrixWorldInverse;a.getNormalMatrix(b),(d===null||d.length<f)&&(d=new Float32Array(f));for(let y=0,M=p;y!==_;++y,M+=4)o.copy(h[y]).applyMatrix4(b,a),o.normal.toArray(d,M),d[M+3]=o.constant}c.value=d,c.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,d}}function um(i){let t=new WeakMap;function e(o,a){return a===vo?o.mapping=Bi:a===xo&&(o.mapping=zi),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===vo||a===xo)if(t.has(o)){const c=t.get(o).texture;return e(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new Uh(c.height);return l.fromEquirectangularTexture(i,o),t.set(o,l),o.addEventListener("dispose",r),e(l.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function s(){t=new WeakMap}return{get:n,dispose:s}}const Ui=4,El=[.125,.215,.35,.446,.526,.582],si=20,Qs=new Gc,Tl=new Xt;let to=null,eo=0,no=0,io=!1;const ii=(1+Math.sqrt(5))/2,Pi=1/ii,bl=[new L(-ii,Pi,0),new L(ii,Pi,0),new L(-Pi,0,ii),new L(Pi,0,ii),new L(0,ii,-Pi),new L(0,ii,Pi),new L(-1,1,-1),new L(1,1,-1),new L(-1,1,1),new L(1,1,1)],hm=new L;class Al{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,r=100,s={}){const{size:o=256,position:a=hm}=s;to=this._renderer.getRenderTarget(),eo=this._renderer.getActiveCubeFace(),no=this._renderer.getActiveMipmapLevel(),io=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,n,r,c,a),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Cl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Rl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(to,eo,no),this._renderer.xr.enabled=io,t.scissorTest=!1,Yr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Bi||t.mapping===zi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),to=this._renderer.getRenderTarget(),eo=this._renderer.getActiveCubeFace(),no=this._renderer.getActiveMipmapLevel(),io=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:gn,minFilter:gn,generateMipmaps:!1,type:xr,format:un,colorSpace:ki,depthBuffer:!1},r=wl(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=wl(t,e,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=fm(s)),this._blurMaterial=dm(s,t,e)}return r}_compileMaterial(t){const e=new nn(this._lodPlanes[0],t);this._renderer.compile(e,Qs)}_sceneToCubeUV(t,e,n,r,s){const c=new Ze(90,1,e,n),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],h=this._renderer,m=h.autoClear,p=h.toneMapping;h.getClearColor(Tl),h.toneMapping=qn,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(r),h.clearDepth(),h.setRenderTarget(null));const _=new mr({name:"PMREM.Background",side:ze,depthWrite:!1,depthTest:!1}),d=new nn(new mi,_);let f=!1;const b=t.background;b?b.isColor&&(_.color.copy(b),t.background=null,f=!0):(_.color.copy(Tl),f=!0);for(let y=0;y<6;y++){const M=y%3;M===0?(c.up.set(0,l[y],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x+u[y],s.y,s.z)):M===1?(c.up.set(0,0,l[y]),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y+u[y],s.z)):(c.up.set(0,l[y],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y,s.z+u[y]));const C=this._cubeSize;Yr(r,M*C,y>2?C:0,C,C),h.setRenderTarget(r),f&&h.render(d,c),h.render(t,c)}d.geometry.dispose(),d.material.dispose(),h.toneMapping=p,h.autoClear=m,t.background=b}_textureToCubeUV(t,e){const n=this._renderer,r=t.mapping===Bi||t.mapping===zi;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Cl()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Rl());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new nn(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=t;const c=this._cubeSize;Yr(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(o,Qs)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=bl[(r-s-1)%bl.length];this._blur(t,s-1,s,o,a)}e.autoClear=n}_blur(t,e,n,r,s){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,r,"latitudinal",s),this._halfBlur(o,t,n,n,r,"longitudinal",s)}_halfBlur(t,e,n,r,s,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new nn(this._lodPlanes[r],l),m=l.uniforms,p=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*si-1),_=s/g,d=isFinite(s)?1+Math.floor(u*_):si;d>si&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${d} samples when the maximum is set to ${si}`);const f=[];let b=0;for(let P=0;P<si;++P){const I=P/_,E=Math.exp(-I*I/2);f.push(E),P===0?b+=E:P<d&&(b+=2*E)}for(let P=0;P<f.length;P++)f[P]=f[P]/b;m.envMap.value=t.texture,m.samples.value=d,m.weights.value=f,m.latitudinal.value=o==="latitudinal",a&&(m.poleAxis.value=a);const{_lodMax:y}=this;m.dTheta.value=g,m.mipInt.value=y-n;const M=this._sizeLods[r],C=3*M*(r>y-Ui?r-y+Ui:0),w=4*(this._cubeSize-M);Yr(e,C,w,3*M,2*M),c.setRenderTarget(e),c.render(h,Qs)}}function fm(i){const t=[],e=[],n=[];let r=i;const s=i-Ui+1+El.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);e.push(a);let c=1/a;o>i-Ui?c=El[o-i+Ui-1]:o===0&&(c=0),n.push(c);const l=1/(a-2),u=-l,h=1+l,m=[u,u,h,u,h,h,u,u,h,h,u,h],p=6,g=6,_=3,d=2,f=1,b=new Float32Array(_*g*p),y=new Float32Array(d*g*p),M=new Float32Array(f*g*p);for(let w=0;w<p;w++){const P=w%3*2/3-1,I=w>2?0:-1,E=[P,I,0,P+2/3,I,0,P+2/3,I+1,0,P,I,0,P+2/3,I+1,0,P,I+1,0];b.set(E,_*g*w),y.set(m,d*g*w);const T=[w,w,w,w,w,w];M.set(T,f*g*w)}const C=new Ue;C.setAttribute("position",new fn(b,_)),C.setAttribute("uv",new fn(y,d)),C.setAttribute("faceIndex",new fn(M,f)),t.push(C),r>Ui&&r--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function wl(i,t,e){const n=new hi(i,t,e);return n.texture.mapping=ds,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Yr(i,t,e,n,r){i.viewport.set(t,e,n,r),i.scissor.set(t,e,n,r)}function dm(i,t,e){const n=new Float32Array(si),r=new L(0,1,0);return new Un({name:"SphericalGaussianBlur",defines:{n:si,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:wa(),fragmentShader:`

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
		`,blending:Xn,depthTest:!1,depthWrite:!1})}function Rl(){return new Un({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:wa(),fragmentShader:`

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
		`,blending:Xn,depthTest:!1,depthWrite:!1})}function Cl(){return new Un({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:wa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Xn,depthTest:!1,depthWrite:!1})}function wa(){return`

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
	`}function pm(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===vo||c===xo,u=c===Bi||c===zi;if(l||u){let h=t.get(a);const m=h!==void 0?h.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==m)return e===null&&(e=new Al(i)),h=l?e.fromEquirectangular(a,h):e.fromCubemap(a,h),h.texture.pmremVersion=a.pmremVersion,t.set(a,h),h.texture;if(h!==void 0)return h.texture;{const p=a.image;return l&&p&&p.height>0||u&&p&&r(p)?(e===null&&(e=new Al(i)),h=l?e.fromEquirectangular(a):e.fromCubemap(a),h.texture.pmremVersion=a.pmremVersion,t.set(a,h),a.addEventListener("dispose",s),h.texture):null}}}return a}function r(a){let c=0;const l=6;for(let u=0;u<l;u++)a[u]!==void 0&&c++;return c===l}function s(a){const c=a.target;c.removeEventListener("dispose",s);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function mm(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return t[n]=r,r}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const r=e(n);return r===null&&pr("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function gm(i,t,e,n){const r={},s=new WeakMap;function o(h){const m=h.target;m.index!==null&&t.remove(m.index);for(const g in m.attributes)t.remove(m.attributes[g]);m.removeEventListener("dispose",o),delete r[m.id];const p=s.get(m);p&&(t.remove(p),s.delete(m)),n.releaseStatesOfGeometry(m),m.isInstancedBufferGeometry===!0&&delete m._maxInstanceCount,e.memory.geometries--}function a(h,m){return r[m.id]===!0||(m.addEventListener("dispose",o),r[m.id]=!0,e.memory.geometries++),m}function c(h){const m=h.attributes;for(const p in m)t.update(m[p],i.ARRAY_BUFFER)}function l(h){const m=[],p=h.index,g=h.attributes.position;let _=0;if(p!==null){const b=p.array;_=p.version;for(let y=0,M=b.length;y<M;y+=3){const C=b[y+0],w=b[y+1],P=b[y+2];m.push(C,w,w,P,P,C)}}else if(g!==void 0){const b=g.array;_=g.version;for(let y=0,M=b.length/3-1;y<M;y+=3){const C=y+0,w=y+1,P=y+2;m.push(C,w,w,P,P,C)}}else return;const d=new(Mc(m)?bc:Tc)(m,1);d.version=_;const f=s.get(h);f&&t.remove(f),s.set(h,d)}function u(h){const m=s.get(h);if(m){const p=h.index;p!==null&&m.version<p.version&&l(h)}else l(h);return s.get(h)}return{get:a,update:c,getWireframeAttribute:u}}function _m(i,t,e){let n;function r(m){n=m}let s,o;function a(m){s=m.type,o=m.bytesPerElement}function c(m,p){i.drawElements(n,p,s,m*o),e.update(p,n,1)}function l(m,p,g){g!==0&&(i.drawElementsInstanced(n,p,s,m*o,g),e.update(p,n,g))}function u(m,p,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,s,m,0,g);let d=0;for(let f=0;f<g;f++)d+=p[f];e.update(d,n,1)}function h(m,p,g,_){if(g===0)return;const d=t.get("WEBGL_multi_draw");if(d===null)for(let f=0;f<m.length;f++)l(m[f]/o,p[f],_[f]);else{d.multiDrawElementsInstancedWEBGL(n,p,0,s,m,0,_,0,g);let f=0;for(let b=0;b<g;b++)f+=p[b]*_[b];e.update(f,n,1)}}this.setMode=r,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function vm(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(s/3);break;case i.LINES:e.lines+=a*(s/2);break;case i.LINE_STRIP:e.lines+=a*(s-1);break;case i.LINE_LOOP:e.lines+=a*s;break;case i.POINTS:e.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:r,update:n}}function xm(i,t,e){const n=new WeakMap,r=new ie;function s(o,a,c){const l=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=u!==void 0?u.length:0;let m=n.get(a);if(m===void 0||m.count!==h){let T=function(){I.dispose(),n.delete(a),a.removeEventListener("dispose",T)};var p=T;m!==void 0&&m.texture.dispose();const g=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,d=a.morphAttributes.color!==void 0,f=a.morphAttributes.position||[],b=a.morphAttributes.normal||[],y=a.morphAttributes.color||[];let M=0;g===!0&&(M=1),_===!0&&(M=2),d===!0&&(M=3);let C=a.attributes.position.count*M,w=1;C>t.maxTextureSize&&(w=Math.ceil(C/t.maxTextureSize),C=t.maxTextureSize);const P=new Float32Array(C*w*4*h),I=new Sc(P,C,w,h);I.type=Cn,I.needsUpdate=!0;const E=M*4;for(let D=0;D<h;D++){const B=f[D],V=b[D],J=y[D],Y=C*w*4*D;for(let Z=0;Z<B.count;Z++){const Q=Z*E;g===!0&&(r.fromBufferAttribute(B,Z),P[Y+Q+0]=r.x,P[Y+Q+1]=r.y,P[Y+Q+2]=r.z,P[Y+Q+3]=0),_===!0&&(r.fromBufferAttribute(V,Z),P[Y+Q+4]=r.x,P[Y+Q+5]=r.y,P[Y+Q+6]=r.z,P[Y+Q+7]=0),d===!0&&(r.fromBufferAttribute(J,Z),P[Y+Q+8]=r.x,P[Y+Q+9]=r.y,P[Y+Q+10]=r.z,P[Y+Q+11]=J.itemSize===4?r.w:1)}}m={count:h,texture:I,size:new ft(C,w)},n.set(a,m),a.addEventListener("dispose",T)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let g=0;for(let d=0;d<l.length;d++)g+=l[d];const _=a.morphTargetsRelative?1:1-g;c.getUniforms().setValue(i,"morphTargetBaseInfluence",_),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",m.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",m.size)}return{update:s}}function Mm(i,t,e,n){let r=new WeakMap;function s(c){const l=n.render.frame,u=c.geometry,h=t.get(c,u);if(r.get(h)!==l&&(t.update(h),r.set(h,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),r.get(c)!==l&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,l))),c.isSkinnedMesh){const m=c.skeleton;r.get(m)!==l&&(m.update(),r.set(m,l))}return h}function o(){r=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:s,dispose:o}}const Wc=new ke,Pl=new Cc(1,1),Xc=new Sc,qc=new mh,Yc=new Rc,Ll=[],Dl=[],Ul=new Float32Array(16),Il=new Float32Array(9),Nl=new Float32Array(4);function Xi(i,t,e){const n=i[0];if(n<=0||n>0)return i;const r=t*e;let s=Ll[r];if(s===void 0&&(s=new Float32Array(r),Ll[r]=s),t!==0){n.toArray(s,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(s,a)}return s}function Ee(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Te(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function _s(i,t){let e=Dl[t];e===void 0&&(e=new Int32Array(t),Dl[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Sm(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function ym(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ee(e,t))return;i.uniform2fv(this.addr,t),Te(e,t)}}function Em(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ee(e,t))return;i.uniform3fv(this.addr,t),Te(e,t)}}function Tm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ee(e,t))return;i.uniform4fv(this.addr,t),Te(e,t)}}function bm(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ee(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Te(e,t)}else{if(Ee(e,n))return;Nl.set(n),i.uniformMatrix2fv(this.addr,!1,Nl),Te(e,n)}}function Am(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ee(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Te(e,t)}else{if(Ee(e,n))return;Il.set(n),i.uniformMatrix3fv(this.addr,!1,Il),Te(e,n)}}function wm(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ee(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Te(e,t)}else{if(Ee(e,n))return;Ul.set(n),i.uniformMatrix4fv(this.addr,!1,Ul),Te(e,n)}}function Rm(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Cm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ee(e,t))return;i.uniform2iv(this.addr,t),Te(e,t)}}function Pm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ee(e,t))return;i.uniform3iv(this.addr,t),Te(e,t)}}function Lm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ee(e,t))return;i.uniform4iv(this.addr,t),Te(e,t)}}function Dm(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Um(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ee(e,t))return;i.uniform2uiv(this.addr,t),Te(e,t)}}function Im(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ee(e,t))return;i.uniform3uiv(this.addr,t),Te(e,t)}}function Nm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ee(e,t))return;i.uniform4uiv(this.addr,t),Te(e,t)}}function Fm(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_2D_SHADOW?(Pl.compareFunction=xc,s=Pl):s=Wc,e.setTexture2D(t||s,r)}function Om(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTexture3D(t||qc,r)}function Bm(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTextureCube(t||Yc,r)}function zm(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTexture2DArray(t||Xc,r)}function km(i){switch(i){case 5126:return Sm;case 35664:return ym;case 35665:return Em;case 35666:return Tm;case 35674:return bm;case 35675:return Am;case 35676:return wm;case 5124:case 35670:return Rm;case 35667:case 35671:return Cm;case 35668:case 35672:return Pm;case 35669:case 35673:return Lm;case 5125:return Dm;case 36294:return Um;case 36295:return Im;case 36296:return Nm;case 35678:case 36198:case 36298:case 36306:case 35682:return Fm;case 35679:case 36299:case 36307:return Om;case 35680:case 36300:case 36308:case 36293:return Bm;case 36289:case 36303:case 36311:case 36292:return zm}}function Hm(i,t){i.uniform1fv(this.addr,t)}function Gm(i,t){const e=Xi(t,this.size,2);i.uniform2fv(this.addr,e)}function Vm(i,t){const e=Xi(t,this.size,3);i.uniform3fv(this.addr,e)}function Wm(i,t){const e=Xi(t,this.size,4);i.uniform4fv(this.addr,e)}function Xm(i,t){const e=Xi(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function qm(i,t){const e=Xi(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Ym(i,t){const e=Xi(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Zm(i,t){i.uniform1iv(this.addr,t)}function Jm(i,t){i.uniform2iv(this.addr,t)}function Km(i,t){i.uniform3iv(this.addr,t)}function $m(i,t){i.uniform4iv(this.addr,t)}function jm(i,t){i.uniform1uiv(this.addr,t)}function Qm(i,t){i.uniform2uiv(this.addr,t)}function t0(i,t){i.uniform3uiv(this.addr,t)}function e0(i,t){i.uniform4uiv(this.addr,t)}function n0(i,t,e){const n=this.cache,r=t.length,s=_s(e,r);Ee(n,s)||(i.uniform1iv(this.addr,s),Te(n,s));for(let o=0;o!==r;++o)e.setTexture2D(t[o]||Wc,s[o])}function i0(i,t,e){const n=this.cache,r=t.length,s=_s(e,r);Ee(n,s)||(i.uniform1iv(this.addr,s),Te(n,s));for(let o=0;o!==r;++o)e.setTexture3D(t[o]||qc,s[o])}function r0(i,t,e){const n=this.cache,r=t.length,s=_s(e,r);Ee(n,s)||(i.uniform1iv(this.addr,s),Te(n,s));for(let o=0;o!==r;++o)e.setTextureCube(t[o]||Yc,s[o])}function s0(i,t,e){const n=this.cache,r=t.length,s=_s(e,r);Ee(n,s)||(i.uniform1iv(this.addr,s),Te(n,s));for(let o=0;o!==r;++o)e.setTexture2DArray(t[o]||Xc,s[o])}function o0(i){switch(i){case 5126:return Hm;case 35664:return Gm;case 35665:return Vm;case 35666:return Wm;case 35674:return Xm;case 35675:return qm;case 35676:return Ym;case 5124:case 35670:return Zm;case 35667:case 35671:return Jm;case 35668:case 35672:return Km;case 35669:case 35673:return $m;case 5125:return jm;case 36294:return Qm;case 36295:return t0;case 36296:return e0;case 35678:case 36198:case 36298:case 36306:case 35682:return n0;case 35679:case 36299:case 36307:return i0;case 35680:case 36300:case 36308:case 36293:return r0;case 36289:case 36303:case 36311:case 36292:return s0}}class a0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=km(e.type)}}class l0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=o0(e.type)}}class c0{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(t,e[a.id],n)}}}const ro=/(\w+)(\])?(\[|\.)?/g;function Fl(i,t){i.seq.push(t),i.map[t.id]=t}function u0(i,t,e){const n=i.name,r=n.length;for(ro.lastIndex=0;;){const s=ro.exec(n),o=ro.lastIndex;let a=s[1];const c=s[2]==="]",l=s[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===r){Fl(e,l===void 0?new a0(a,i,t):new l0(a,i,t));break}else{let h=e.map[a];h===void 0&&(h=new c0(a),Fl(e,h)),e=h}}}class es{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){const s=t.getActiveUniform(e,r),o=t.getUniformLocation(e,s.name);u0(s,o,this)}}setValue(t,e,n,r){const s=this.map[e];s!==void 0&&s.setValue(t,n,r)}setOptional(t,e,n){const r=e[n];r!==void 0&&this.setValue(t,n,r)}static upload(t,e,n,r){for(let s=0,o=e.length;s!==o;++s){const a=e[s],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,r)}}static seqWithValue(t,e){const n=[];for(let r=0,s=t.length;r!==s;++r){const o=t[r];o.id in e&&n.push(o)}return n}}function Ol(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const h0=37297;let f0=0;function d0(i,t){const e=i.split(`
`),n=[],r=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let o=r;o<s;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const Bl=new Bt;function p0(i){$t._getMatrix(Bl,$t.workingColorSpace,i);const t=`mat3( ${Bl.elements.map(e=>e.toFixed(4))} )`;switch($t.getTransfer(i)){case rs:return[t,"LinearTransferOETF"];case ne:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function zl(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),s=(i.getShaderInfoLog(t)||"").trim();if(n&&s==="")return"";const o=/ERROR: 0:(\d+)/.exec(s);if(o){const a=parseInt(o[1]);return e.toUpperCase()+`

`+s+`

`+d0(i.getShaderSource(t),a)}else return s}function m0(i,t){const e=p0(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function g0(i,t){let e;switch(t){case Cu:e="Linear";break;case Pu:e="Reinhard";break;case Lu:e="Cineon";break;case lc:e="ACESFilmic";break;case Uu:e="AgX";break;case Iu:e="Neutral";break;case Du:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Zr=new L;function _0(){$t.getLuminanceCoefficients(Zr);const i=Zr.x.toFixed(4),t=Zr.y.toFixed(4),e=Zr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function v0(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(nr).join(`
`)}function x0(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function M0(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(t,r),o=s.name;let a=1;s.type===i.FLOAT_MAT2&&(a=2),s.type===i.FLOAT_MAT3&&(a=3),s.type===i.FLOAT_MAT4&&(a=4),e[o]={type:s.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function nr(i){return i!==""}function kl(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Hl(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const S0=/^[ \t]*#include +<([\w\d./]+)>/gm;function jo(i){return i.replace(S0,E0)}const y0=new Map;function E0(i,t){let e=kt[t];if(e===void 0){const n=y0.get(t);if(n!==void 0)e=kt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return jo(e)}const T0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Gl(i){return i.replace(T0,b0)}function b0(i,t,e,n){let r="";for(let s=parseInt(t);s<parseInt(e);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Vl(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}function A0(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===sc?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===oc?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===wn&&(t="SHADOWMAP_TYPE_VSM"),t}function w0(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Bi:case zi:t="ENVMAP_TYPE_CUBE";break;case ds:t="ENVMAP_TYPE_CUBE_UV";break}return t}function R0(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case zi:t="ENVMAP_MODE_REFRACTION";break}return t}function C0(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case ac:t="ENVMAP_BLENDING_MULTIPLY";break;case wu:t="ENVMAP_BLENDING_MIX";break;case Ru:t="ENVMAP_BLENDING_ADD";break}return t}function P0(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function L0(i,t,e,n){const r=i.getContext(),s=e.defines;let o=e.vertexShader,a=e.fragmentShader;const c=A0(e),l=w0(e),u=R0(e),h=C0(e),m=P0(e),p=v0(e),g=x0(s),_=r.createProgram();let d,f,b=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(d=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(nr).join(`
`),d.length>0&&(d+=`
`),f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(nr).join(`
`),f.length>0&&(f+=`
`)):(d=[Vl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(nr).join(`
`),f=[Vl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+u:"",e.envMap?"#define "+h:"",m?"#define CUBEUV_TEXEL_WIDTH "+m.texelWidth:"",m?"#define CUBEUV_TEXEL_HEIGHT "+m.texelHeight:"",m?"#define CUBEUV_MAX_MIP "+m.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==qn?"#define TONE_MAPPING":"",e.toneMapping!==qn?kt.tonemapping_pars_fragment:"",e.toneMapping!==qn?g0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",kt.colorspace_pars_fragment,m0("linearToOutputTexel",e.outputColorSpace),_0(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(nr).join(`
`)),o=jo(o),o=kl(o,e),o=Hl(o,e),a=jo(a),a=kl(a,e),a=Hl(a,e),o=Gl(o),a=Gl(a),e.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,d=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+d,f=["#define varying in",e.glslVersion===Ja?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Ja?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const y=b+d+o,M=b+f+a,C=Ol(r,r.VERTEX_SHADER,y),w=Ol(r,r.FRAGMENT_SHADER,M);r.attachShader(_,C),r.attachShader(_,w),e.index0AttributeName!==void 0?r.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_);function P(D){if(i.debug.checkShaderErrors){const B=r.getProgramInfoLog(_)||"",V=r.getShaderInfoLog(C)||"",J=r.getShaderInfoLog(w)||"",Y=B.trim(),Z=V.trim(),Q=J.trim();let W=!0,lt=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if(W=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,_,C,w);else{const dt=zl(r,C,"vertex"),At=zl(r,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+Y+`
`+dt+`
`+At)}else Y!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Y):(Z===""||Q==="")&&(lt=!1);lt&&(D.diagnostics={runnable:W,programLog:Y,vertexShader:{log:Z,prefix:d},fragmentShader:{log:Q,prefix:f}})}r.deleteShader(C),r.deleteShader(w),I=new es(r,_),E=M0(r,_)}let I;this.getUniforms=function(){return I===void 0&&P(this),I};let E;this.getAttributes=function(){return E===void 0&&P(this),E};let T=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return T===!1&&(T=r.getProgramParameter(_,h0)),T},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=f0++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=C,this.fragmentShader=w,this}let D0=0;class U0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,r=this._getShaderStage(e),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new I0(t),e.set(t,n)),n}}class I0{constructor(t){this.id=D0++,this.code=t,this.usedTimes=0}}function N0(i,t,e,n,r,s,o){const a=new yc,c=new U0,l=new Set,u=[],h=r.logarithmicDepthBuffer,m=r.vertexTextures;let p=r.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(E){return l.add(E),E===0?"uv":`uv${E}`}function d(E,T,D,B,V){const J=B.fog,Y=V.geometry,Z=E.isMeshStandardMaterial?B.environment:null,Q=(E.isMeshStandardMaterial?e:t).get(E.envMap||Z),W=Q&&Q.mapping===ds?Q.image.height:null,lt=g[E.type];E.precision!==null&&(p=r.getMaxPrecision(E.precision),p!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",p,"instead."));const dt=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,At=dt!==void 0?dt.length:0;let Wt=0;Y.morphAttributes.position!==void 0&&(Wt=1),Y.morphAttributes.normal!==void 0&&(Wt=2),Y.morphAttributes.color!==void 0&&(Wt=3);let se,le,jt,K;if(lt){const Qt=mn[lt];se=Qt.vertexShader,le=Qt.fragmentShader}else se=E.vertexShader,le=E.fragmentShader,c.update(E),jt=c.getVertexShaderID(E),K=c.getFragmentShaderID(E);const tt=i.getRenderTarget(),gt=i.state.buffers.depth.getReversed(),It=V.isInstancedMesh===!0,bt=V.isBatchedMesh===!0,Zt=!!E.map,Ce=!!E.matcap,R=!!Q,ce=!!E.aoMap,Ft=!!E.lightMap,Dt=!!E.bumpMap,xt=!!E.normalMap,ue=!!E.displacementMap,Mt=!!E.emissiveMap,zt=!!E.metalnessMap,be=!!E.roughnessMap,xe=E.anisotropy>0,A=E.clearcoat>0,v=E.dispersion>0,O=E.iridescence>0,q=E.sheen>0,j=E.transmission>0,X=xe&&!!E.anisotropyMap,Tt=A&&!!E.clearcoatMap,st=A&&!!E.clearcoatNormalMap,St=A&&!!E.clearcoatRoughnessMap,yt=O&&!!E.iridescenceMap,it=O&&!!E.iridescenceThicknessMap,ht=q&&!!E.sheenColorMap,Lt=q&&!!E.sheenRoughnessMap,Et=!!E.specularMap,ct=!!E.specularColorMap,Ot=!!E.specularIntensityMap,U=j&&!!E.transmissionMap,rt=j&&!!E.thicknessMap,ot=!!E.gradientMap,mt=!!E.alphaMap,et=E.alphaTest>0,$=!!E.alphaHash,vt=!!E.extensions;let Nt=qn;E.toneMapped&&(tt===null||tt.isXRRenderTarget===!0)&&(Nt=i.toneMapping);const oe={shaderID:lt,shaderType:E.type,shaderName:E.name,vertexShader:se,fragmentShader:le,defines:E.defines,customVertexShaderID:jt,customFragmentShaderID:K,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:p,batching:bt,batchingColor:bt&&V._colorsTexture!==null,instancing:It,instancingColor:It&&V.instanceColor!==null,instancingMorph:It&&V.morphTexture!==null,supportsVertexTextures:m,outputColorSpace:tt===null?i.outputColorSpace:tt.isXRRenderTarget===!0?tt.texture.colorSpace:ki,alphaToCoverage:!!E.alphaToCoverage,map:Zt,matcap:Ce,envMap:R,envMapMode:R&&Q.mapping,envMapCubeUVHeight:W,aoMap:ce,lightMap:Ft,bumpMap:Dt,normalMap:xt,displacementMap:m&&ue,emissiveMap:Mt,normalMapObjectSpace:xt&&E.normalMapType===Bu,normalMapTangentSpace:xt&&E.normalMapType===vc,metalnessMap:zt,roughnessMap:be,anisotropy:xe,anisotropyMap:X,clearcoat:A,clearcoatMap:Tt,clearcoatNormalMap:st,clearcoatRoughnessMap:St,dispersion:v,iridescence:O,iridescenceMap:yt,iridescenceThicknessMap:it,sheen:q,sheenColorMap:ht,sheenRoughnessMap:Lt,specularMap:Et,specularColorMap:ct,specularIntensityMap:Ot,transmission:j,transmissionMap:U,thicknessMap:rt,gradientMap:ot,opaque:E.transparent===!1&&E.blending===Ni&&E.alphaToCoverage===!1,alphaMap:mt,alphaTest:et,alphaHash:$,combine:E.combine,mapUv:Zt&&_(E.map.channel),aoMapUv:ce&&_(E.aoMap.channel),lightMapUv:Ft&&_(E.lightMap.channel),bumpMapUv:Dt&&_(E.bumpMap.channel),normalMapUv:xt&&_(E.normalMap.channel),displacementMapUv:ue&&_(E.displacementMap.channel),emissiveMapUv:Mt&&_(E.emissiveMap.channel),metalnessMapUv:zt&&_(E.metalnessMap.channel),roughnessMapUv:be&&_(E.roughnessMap.channel),anisotropyMapUv:X&&_(E.anisotropyMap.channel),clearcoatMapUv:Tt&&_(E.clearcoatMap.channel),clearcoatNormalMapUv:st&&_(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:St&&_(E.clearcoatRoughnessMap.channel),iridescenceMapUv:yt&&_(E.iridescenceMap.channel),iridescenceThicknessMapUv:it&&_(E.iridescenceThicknessMap.channel),sheenColorMapUv:ht&&_(E.sheenColorMap.channel),sheenRoughnessMapUv:Lt&&_(E.sheenRoughnessMap.channel),specularMapUv:Et&&_(E.specularMap.channel),specularColorMapUv:ct&&_(E.specularColorMap.channel),specularIntensityMapUv:Ot&&_(E.specularIntensityMap.channel),transmissionMapUv:U&&_(E.transmissionMap.channel),thicknessMapUv:rt&&_(E.thicknessMap.channel),alphaMapUv:mt&&_(E.alphaMap.channel),vertexTangents:!!Y.attributes.tangent&&(xt||xe),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,pointsUvs:V.isPoints===!0&&!!Y.attributes.uv&&(Zt||mt),fog:!!J,useFog:E.fog===!0,fogExp2:!!J&&J.isFogExp2,flatShading:E.flatShading===!0&&E.wireframe===!1,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:gt,skinning:V.isSkinnedMesh===!0,morphTargets:Y.morphAttributes.position!==void 0,morphNormals:Y.morphAttributes.normal!==void 0,morphColors:Y.morphAttributes.color!==void 0,morphTargetsCount:At,morphTextureStride:Wt,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:E.dithering,shadowMapEnabled:i.shadowMap.enabled&&D.length>0,shadowMapType:i.shadowMap.type,toneMapping:Nt,decodeVideoTexture:Zt&&E.map.isVideoTexture===!0&&$t.getTransfer(E.map.colorSpace)===ne,decodeVideoTextureEmissive:Mt&&E.emissiveMap.isVideoTexture===!0&&$t.getTransfer(E.emissiveMap.colorSpace)===ne,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===Be,flipSided:E.side===ze,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:vt&&E.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(vt&&E.extensions.multiDraw===!0||bt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return oe.vertexUv1s=l.has(1),oe.vertexUv2s=l.has(2),oe.vertexUv3s=l.has(3),l.clear(),oe}function f(E){const T=[];if(E.shaderID?T.push(E.shaderID):(T.push(E.customVertexShaderID),T.push(E.customFragmentShaderID)),E.defines!==void 0)for(const D in E.defines)T.push(D),T.push(E.defines[D]);return E.isRawShaderMaterial===!1&&(b(T,E),y(T,E),T.push(i.outputColorSpace)),T.push(E.customProgramCacheKey),T.join()}function b(E,T){E.push(T.precision),E.push(T.outputColorSpace),E.push(T.envMapMode),E.push(T.envMapCubeUVHeight),E.push(T.mapUv),E.push(T.alphaMapUv),E.push(T.lightMapUv),E.push(T.aoMapUv),E.push(T.bumpMapUv),E.push(T.normalMapUv),E.push(T.displacementMapUv),E.push(T.emissiveMapUv),E.push(T.metalnessMapUv),E.push(T.roughnessMapUv),E.push(T.anisotropyMapUv),E.push(T.clearcoatMapUv),E.push(T.clearcoatNormalMapUv),E.push(T.clearcoatRoughnessMapUv),E.push(T.iridescenceMapUv),E.push(T.iridescenceThicknessMapUv),E.push(T.sheenColorMapUv),E.push(T.sheenRoughnessMapUv),E.push(T.specularMapUv),E.push(T.specularColorMapUv),E.push(T.specularIntensityMapUv),E.push(T.transmissionMapUv),E.push(T.thicknessMapUv),E.push(T.combine),E.push(T.fogExp2),E.push(T.sizeAttenuation),E.push(T.morphTargetsCount),E.push(T.morphAttributeCount),E.push(T.numDirLights),E.push(T.numPointLights),E.push(T.numSpotLights),E.push(T.numSpotLightMaps),E.push(T.numHemiLights),E.push(T.numRectAreaLights),E.push(T.numDirLightShadows),E.push(T.numPointLightShadows),E.push(T.numSpotLightShadows),E.push(T.numSpotLightShadowsWithMaps),E.push(T.numLightProbes),E.push(T.shadowMapType),E.push(T.toneMapping),E.push(T.numClippingPlanes),E.push(T.numClipIntersection),E.push(T.depthPacking)}function y(E,T){a.disableAll(),T.supportsVertexTextures&&a.enable(0),T.instancing&&a.enable(1),T.instancingColor&&a.enable(2),T.instancingMorph&&a.enable(3),T.matcap&&a.enable(4),T.envMap&&a.enable(5),T.normalMapObjectSpace&&a.enable(6),T.normalMapTangentSpace&&a.enable(7),T.clearcoat&&a.enable(8),T.iridescence&&a.enable(9),T.alphaTest&&a.enable(10),T.vertexColors&&a.enable(11),T.vertexAlphas&&a.enable(12),T.vertexUv1s&&a.enable(13),T.vertexUv2s&&a.enable(14),T.vertexUv3s&&a.enable(15),T.vertexTangents&&a.enable(16),T.anisotropy&&a.enable(17),T.alphaHash&&a.enable(18),T.batching&&a.enable(19),T.dispersion&&a.enable(20),T.batchingColor&&a.enable(21),T.gradientMap&&a.enable(22),E.push(a.mask),a.disableAll(),T.fog&&a.enable(0),T.useFog&&a.enable(1),T.flatShading&&a.enable(2),T.logarithmicDepthBuffer&&a.enable(3),T.reversedDepthBuffer&&a.enable(4),T.skinning&&a.enable(5),T.morphTargets&&a.enable(6),T.morphNormals&&a.enable(7),T.morphColors&&a.enable(8),T.premultipliedAlpha&&a.enable(9),T.shadowMapEnabled&&a.enable(10),T.doubleSided&&a.enable(11),T.flipSided&&a.enable(12),T.useDepthPacking&&a.enable(13),T.dithering&&a.enable(14),T.transmission&&a.enable(15),T.sheen&&a.enable(16),T.opaque&&a.enable(17),T.pointsUvs&&a.enable(18),T.decodeVideoTexture&&a.enable(19),T.decodeVideoTextureEmissive&&a.enable(20),T.alphaToCoverage&&a.enable(21),E.push(a.mask)}function M(E){const T=g[E.type];let D;if(T){const B=mn[T];D=Ch.clone(B.uniforms)}else D=E.uniforms;return D}function C(E,T){let D;for(let B=0,V=u.length;B<V;B++){const J=u[B];if(J.cacheKey===T){D=J,++D.usedTimes;break}}return D===void 0&&(D=new L0(i,T,E,s),u.push(D)),D}function w(E){if(--E.usedTimes===0){const T=u.indexOf(E);u[T]=u[u.length-1],u.pop(),E.destroy()}}function P(E){c.remove(E)}function I(){c.dispose()}return{getParameters:d,getProgramCacheKey:f,getUniforms:M,acquireProgram:C,releaseProgram:w,releaseShaderCache:P,programs:u,dispose:I}}function F0(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function r(o,a,c){i.get(o)[a]=c}function s(){i=new WeakMap}return{has:t,get:e,remove:n,update:r,dispose:s}}function O0(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function Wl(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Xl(){const i=[];let t=0;const e=[],n=[],r=[];function s(){t=0,e.length=0,n.length=0,r.length=0}function o(h,m,p,g,_,d){let f=i[t];return f===void 0?(f={id:h.id,object:h,geometry:m,material:p,groupOrder:g,renderOrder:h.renderOrder,z:_,group:d},i[t]=f):(f.id=h.id,f.object=h,f.geometry=m,f.material=p,f.groupOrder=g,f.renderOrder=h.renderOrder,f.z=_,f.group=d),t++,f}function a(h,m,p,g,_,d){const f=o(h,m,p,g,_,d);p.transmission>0?n.push(f):p.transparent===!0?r.push(f):e.push(f)}function c(h,m,p,g,_,d){const f=o(h,m,p,g,_,d);p.transmission>0?n.unshift(f):p.transparent===!0?r.unshift(f):e.unshift(f)}function l(h,m){e.length>1&&e.sort(h||O0),n.length>1&&n.sort(m||Wl),r.length>1&&r.sort(m||Wl)}function u(){for(let h=t,m=i.length;h<m;h++){const p=i[h];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:n,transparent:r,init:s,push:a,unshift:c,finish:u,sort:l}}function B0(){let i=new WeakMap;function t(n,r){const s=i.get(n);let o;return s===void 0?(o=new Xl,i.set(n,[o])):r>=s.length?(o=new Xl,s.push(o)):o=s[r],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function z0(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new L,color:new Xt};break;case"SpotLight":e={position:new L,direction:new L,color:new Xt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new L,color:new Xt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new L,skyColor:new Xt,groundColor:new Xt};break;case"RectAreaLight":e={color:new Xt,position:new L,halfWidth:new L,halfHeight:new L};break}return i[t.id]=e,e}}}function k0(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ft};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ft};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ft,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let H0=0;function G0(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function V0(i){const t=new z0,e=k0(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new L);const r=new L,s=new me,o=new me;function a(l){let u=0,h=0,m=0;for(let E=0;E<9;E++)n.probe[E].set(0,0,0);let p=0,g=0,_=0,d=0,f=0,b=0,y=0,M=0,C=0,w=0,P=0;l.sort(G0);for(let E=0,T=l.length;E<T;E++){const D=l[E],B=D.color,V=D.intensity,J=D.distance,Y=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)u+=B.r*V,h+=B.g*V,m+=B.b*V;else if(D.isLightProbe){for(let Z=0;Z<9;Z++)n.probe[Z].addScaledVector(D.sh.coefficients[Z],V);P++}else if(D.isDirectionalLight){const Z=t.get(D);if(Z.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const Q=D.shadow,W=e.get(D);W.shadowIntensity=Q.intensity,W.shadowBias=Q.bias,W.shadowNormalBias=Q.normalBias,W.shadowRadius=Q.radius,W.shadowMapSize=Q.mapSize,n.directionalShadow[p]=W,n.directionalShadowMap[p]=Y,n.directionalShadowMatrix[p]=D.shadow.matrix,b++}n.directional[p]=Z,p++}else if(D.isSpotLight){const Z=t.get(D);Z.position.setFromMatrixPosition(D.matrixWorld),Z.color.copy(B).multiplyScalar(V),Z.distance=J,Z.coneCos=Math.cos(D.angle),Z.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),Z.decay=D.decay,n.spot[_]=Z;const Q=D.shadow;if(D.map&&(n.spotLightMap[C]=D.map,C++,Q.updateMatrices(D),D.castShadow&&w++),n.spotLightMatrix[_]=Q.matrix,D.castShadow){const W=e.get(D);W.shadowIntensity=Q.intensity,W.shadowBias=Q.bias,W.shadowNormalBias=Q.normalBias,W.shadowRadius=Q.radius,W.shadowMapSize=Q.mapSize,n.spotShadow[_]=W,n.spotShadowMap[_]=Y,M++}_++}else if(D.isRectAreaLight){const Z=t.get(D);Z.color.copy(B).multiplyScalar(V),Z.halfWidth.set(D.width*.5,0,0),Z.halfHeight.set(0,D.height*.5,0),n.rectArea[d]=Z,d++}else if(D.isPointLight){const Z=t.get(D);if(Z.color.copy(D.color).multiplyScalar(D.intensity),Z.distance=D.distance,Z.decay=D.decay,D.castShadow){const Q=D.shadow,W=e.get(D);W.shadowIntensity=Q.intensity,W.shadowBias=Q.bias,W.shadowNormalBias=Q.normalBias,W.shadowRadius=Q.radius,W.shadowMapSize=Q.mapSize,W.shadowCameraNear=Q.camera.near,W.shadowCameraFar=Q.camera.far,n.pointShadow[g]=W,n.pointShadowMap[g]=Y,n.pointShadowMatrix[g]=D.shadow.matrix,y++}n.point[g]=Z,g++}else if(D.isHemisphereLight){const Z=t.get(D);Z.skyColor.copy(D.color).multiplyScalar(V),Z.groundColor.copy(D.groundColor).multiplyScalar(V),n.hemi[f]=Z,f++}}d>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=at.LTC_FLOAT_1,n.rectAreaLTC2=at.LTC_FLOAT_2):(n.rectAreaLTC1=at.LTC_HALF_1,n.rectAreaLTC2=at.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=m;const I=n.hash;(I.directionalLength!==p||I.pointLength!==g||I.spotLength!==_||I.rectAreaLength!==d||I.hemiLength!==f||I.numDirectionalShadows!==b||I.numPointShadows!==y||I.numSpotShadows!==M||I.numSpotMaps!==C||I.numLightProbes!==P)&&(n.directional.length=p,n.spot.length=_,n.rectArea.length=d,n.point.length=g,n.hemi.length=f,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=M,n.spotShadowMap.length=M,n.directionalShadowMatrix.length=b,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=M+C-w,n.spotLightMap.length=C,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=P,I.directionalLength=p,I.pointLength=g,I.spotLength=_,I.rectAreaLength=d,I.hemiLength=f,I.numDirectionalShadows=b,I.numPointShadows=y,I.numSpotShadows=M,I.numSpotMaps=C,I.numLightProbes=P,n.version=H0++)}function c(l,u){let h=0,m=0,p=0,g=0,_=0;const d=u.matrixWorldInverse;for(let f=0,b=l.length;f<b;f++){const y=l[f];if(y.isDirectionalLight){const M=n.directional[h];M.direction.setFromMatrixPosition(y.matrixWorld),r.setFromMatrixPosition(y.target.matrixWorld),M.direction.sub(r),M.direction.transformDirection(d),h++}else if(y.isSpotLight){const M=n.spot[p];M.position.setFromMatrixPosition(y.matrixWorld),M.position.applyMatrix4(d),M.direction.setFromMatrixPosition(y.matrixWorld),r.setFromMatrixPosition(y.target.matrixWorld),M.direction.sub(r),M.direction.transformDirection(d),p++}else if(y.isRectAreaLight){const M=n.rectArea[g];M.position.setFromMatrixPosition(y.matrixWorld),M.position.applyMatrix4(d),o.identity(),s.copy(y.matrixWorld),s.premultiply(d),o.extractRotation(s),M.halfWidth.set(y.width*.5,0,0),M.halfHeight.set(0,y.height*.5,0),M.halfWidth.applyMatrix4(o),M.halfHeight.applyMatrix4(o),g++}else if(y.isPointLight){const M=n.point[m];M.position.setFromMatrixPosition(y.matrixWorld),M.position.applyMatrix4(d),m++}else if(y.isHemisphereLight){const M=n.hemi[_];M.direction.setFromMatrixPosition(y.matrixWorld),M.direction.transformDirection(d),_++}}}return{setup:a,setupView:c,state:n}}function ql(i){const t=new V0(i),e=[],n=[];function r(u){l.camera=u,e.length=0,n.length=0}function s(u){e.push(u)}function o(u){n.push(u)}function a(){t.setup(e)}function c(u){t.setupView(e,u)}const l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:r,state:l,setupLights:a,setupLightsView:c,pushLight:s,pushShadow:o}}function W0(i){let t=new WeakMap;function e(r,s=0){const o=t.get(r);let a;return o===void 0?(a=new ql(i),t.set(r,[a])):s>=o.length?(a=new ql(i),o.push(a)):a=o[s],a}function n(){t=new WeakMap}return{get:e,dispose:n}}const X0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,q0=`uniform sampler2D shadow_pass;
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
}`;function Y0(i,t,e){let n=new _a;const r=new ft,s=new ft,o=new ie,a=new gf({depthPacking:Ou}),c=new _f,l={},u=e.maxTextureSize,h={[Yn]:ze,[ze]:Yn,[Be]:Be},m=new Un({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ft},radius:{value:4}},vertexShader:X0,fragmentShader:q0}),p=m.clone();p.defines.HORIZONTAL_PASS=1;const g=new Ue;g.setAttribute("position",new fn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new nn(g,m),d=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=sc;let f=this.type;this.render=function(w,P,I){if(d.enabled===!1||d.autoUpdate===!1&&d.needsUpdate===!1||w.length===0)return;const E=i.getRenderTarget(),T=i.getActiveCubeFace(),D=i.getActiveMipmapLevel(),B=i.state;B.setBlending(Xn),B.buffers.depth.getReversed()===!0?B.buffers.color.setClear(0,0,0,0):B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);const V=f!==wn&&this.type===wn,J=f===wn&&this.type!==wn;for(let Y=0,Z=w.length;Y<Z;Y++){const Q=w[Y],W=Q.shadow;if(W===void 0){console.warn("THREE.WebGLShadowMap:",Q,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;r.copy(W.mapSize);const lt=W.getFrameExtents();if(r.multiply(lt),s.copy(W.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/lt.x),r.x=s.x*lt.x,W.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/lt.y),r.y=s.y*lt.y,W.mapSize.y=s.y)),W.map===null||V===!0||J===!0){const At=this.type!==wn?{minFilter:hn,magFilter:hn}:{};W.map!==null&&W.map.dispose(),W.map=new hi(r.x,r.y,At),W.map.texture.name=Q.name+".shadowMap",W.camera.updateProjectionMatrix()}i.setRenderTarget(W.map),i.clear();const dt=W.getViewportCount();for(let At=0;At<dt;At++){const Wt=W.getViewport(At);o.set(s.x*Wt.x,s.y*Wt.y,s.x*Wt.z,s.y*Wt.w),B.viewport(o),W.updateMatrices(Q,At),n=W.getFrustum(),M(P,I,W.camera,Q,this.type)}W.isPointLightShadow!==!0&&this.type===wn&&b(W,I),W.needsUpdate=!1}f=this.type,d.needsUpdate=!1,i.setRenderTarget(E,T,D)};function b(w,P){const I=t.update(_);m.defines.VSM_SAMPLES!==w.blurSamples&&(m.defines.VSM_SAMPLES=w.blurSamples,p.defines.VSM_SAMPLES=w.blurSamples,m.needsUpdate=!0,p.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new hi(r.x,r.y)),m.uniforms.shadow_pass.value=w.map.texture,m.uniforms.resolution.value=w.mapSize,m.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(P,null,I,m,_,null),p.uniforms.shadow_pass.value=w.mapPass.texture,p.uniforms.resolution.value=w.mapSize,p.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(P,null,I,p,_,null)}function y(w,P,I,E){let T=null;const D=I.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(D!==void 0)T=D;else if(T=I.isPointLight===!0?c:a,i.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){const B=T.uuid,V=P.uuid;let J=l[B];J===void 0&&(J={},l[B]=J);let Y=J[V];Y===void 0&&(Y=T.clone(),J[V]=Y,P.addEventListener("dispose",C)),T=Y}if(T.visible=P.visible,T.wireframe=P.wireframe,E===wn?T.side=P.shadowSide!==null?P.shadowSide:P.side:T.side=P.shadowSide!==null?P.shadowSide:h[P.side],T.alphaMap=P.alphaMap,T.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,T.map=P.map,T.clipShadows=P.clipShadows,T.clippingPlanes=P.clippingPlanes,T.clipIntersection=P.clipIntersection,T.displacementMap=P.displacementMap,T.displacementScale=P.displacementScale,T.displacementBias=P.displacementBias,T.wireframeLinewidth=P.wireframeLinewidth,T.linewidth=P.linewidth,I.isPointLight===!0&&T.isMeshDistanceMaterial===!0){const B=i.properties.get(T);B.light=I}return T}function M(w,P,I,E,T){if(w.visible===!1)return;if(w.layers.test(P.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&T===wn)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,w.matrixWorld);const V=t.update(w),J=w.material;if(Array.isArray(J)){const Y=V.groups;for(let Z=0,Q=Y.length;Z<Q;Z++){const W=Y[Z],lt=J[W.materialIndex];if(lt&&lt.visible){const dt=y(w,lt,E,T);w.onBeforeShadow(i,w,P,I,V,dt,W),i.renderBufferDirect(I,null,V,dt,w,W),w.onAfterShadow(i,w,P,I,V,dt,W)}}}else if(J.visible){const Y=y(w,J,E,T);w.onBeforeShadow(i,w,P,I,V,Y,null),i.renderBufferDirect(I,null,V,Y,w,null),w.onAfterShadow(i,w,P,I,V,Y,null)}}const B=w.children;for(let V=0,J=B.length;V<J;V++)M(B[V],P,I,E,T)}function C(w){w.target.removeEventListener("dispose",C);for(const I in l){const E=l[I],T=w.target.uuid;T in E&&(E[T].dispose(),delete E[T])}}}const Z0={[uo]:ho,[fo]:go,[po]:_o,[Oi]:mo,[ho]:uo,[go]:fo,[_o]:po,[mo]:Oi};function J0(i,t){function e(){let U=!1;const rt=new ie;let ot=null;const mt=new ie(0,0,0,0);return{setMask:function(et){ot!==et&&!U&&(i.colorMask(et,et,et,et),ot=et)},setLocked:function(et){U=et},setClear:function(et,$,vt,Nt,oe){oe===!0&&(et*=Nt,$*=Nt,vt*=Nt),rt.set(et,$,vt,Nt),mt.equals(rt)===!1&&(i.clearColor(et,$,vt,Nt),mt.copy(rt))},reset:function(){U=!1,ot=null,mt.set(-1,0,0,0)}}}function n(){let U=!1,rt=!1,ot=null,mt=null,et=null;return{setReversed:function($){if(rt!==$){const vt=t.get("EXT_clip_control");$?vt.clipControlEXT(vt.LOWER_LEFT_EXT,vt.ZERO_TO_ONE_EXT):vt.clipControlEXT(vt.LOWER_LEFT_EXT,vt.NEGATIVE_ONE_TO_ONE_EXT),rt=$;const Nt=et;et=null,this.setClear(Nt)}},getReversed:function(){return rt},setTest:function($){$?tt(i.DEPTH_TEST):gt(i.DEPTH_TEST)},setMask:function($){ot!==$&&!U&&(i.depthMask($),ot=$)},setFunc:function($){if(rt&&($=Z0[$]),mt!==$){switch($){case uo:i.depthFunc(i.NEVER);break;case ho:i.depthFunc(i.ALWAYS);break;case fo:i.depthFunc(i.LESS);break;case Oi:i.depthFunc(i.LEQUAL);break;case po:i.depthFunc(i.EQUAL);break;case mo:i.depthFunc(i.GEQUAL);break;case go:i.depthFunc(i.GREATER);break;case _o:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}mt=$}},setLocked:function($){U=$},setClear:function($){et!==$&&(rt&&($=1-$),i.clearDepth($),et=$)},reset:function(){U=!1,ot=null,mt=null,et=null,rt=!1}}}function r(){let U=!1,rt=null,ot=null,mt=null,et=null,$=null,vt=null,Nt=null,oe=null;return{setTest:function(Qt){U||(Qt?tt(i.STENCIL_TEST):gt(i.STENCIL_TEST))},setMask:function(Qt){rt!==Qt&&!U&&(i.stencilMask(Qt),rt=Qt)},setFunc:function(Qt,Sn,dn){(ot!==Qt||mt!==Sn||et!==dn)&&(i.stencilFunc(Qt,Sn,dn),ot=Qt,mt=Sn,et=dn)},setOp:function(Qt,Sn,dn){($!==Qt||vt!==Sn||Nt!==dn)&&(i.stencilOp(Qt,Sn,dn),$=Qt,vt=Sn,Nt=dn)},setLocked:function(Qt){U=Qt},setClear:function(Qt){oe!==Qt&&(i.clearStencil(Qt),oe=Qt)},reset:function(){U=!1,rt=null,ot=null,mt=null,et=null,$=null,vt=null,Nt=null,oe=null}}}const s=new e,o=new n,a=new r,c=new WeakMap,l=new WeakMap;let u={},h={},m=new WeakMap,p=[],g=null,_=!1,d=null,f=null,b=null,y=null,M=null,C=null,w=null,P=new Xt(0,0,0),I=0,E=!1,T=null,D=null,B=null,V=null,J=null;const Y=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Z=!1,Q=0;const W=i.getParameter(i.VERSION);W.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(W)[1]),Z=Q>=1):W.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),Z=Q>=2);let lt=null,dt={};const At=i.getParameter(i.SCISSOR_BOX),Wt=i.getParameter(i.VIEWPORT),se=new ie().fromArray(At),le=new ie().fromArray(Wt);function jt(U,rt,ot,mt){const et=new Uint8Array(4),$=i.createTexture();i.bindTexture(U,$),i.texParameteri(U,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(U,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let vt=0;vt<ot;vt++)U===i.TEXTURE_3D||U===i.TEXTURE_2D_ARRAY?i.texImage3D(rt,0,i.RGBA,1,1,mt,0,i.RGBA,i.UNSIGNED_BYTE,et):i.texImage2D(rt+vt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,et);return $}const K={};K[i.TEXTURE_2D]=jt(i.TEXTURE_2D,i.TEXTURE_2D,1),K[i.TEXTURE_CUBE_MAP]=jt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),K[i.TEXTURE_2D_ARRAY]=jt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),K[i.TEXTURE_3D]=jt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),tt(i.DEPTH_TEST),o.setFunc(Oi),Dt(!1),xt(Va),tt(i.CULL_FACE),ce(Xn);function tt(U){u[U]!==!0&&(i.enable(U),u[U]=!0)}function gt(U){u[U]!==!1&&(i.disable(U),u[U]=!1)}function It(U,rt){return h[U]!==rt?(i.bindFramebuffer(U,rt),h[U]=rt,U===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=rt),U===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=rt),!0):!1}function bt(U,rt){let ot=p,mt=!1;if(U){ot=m.get(rt),ot===void 0&&(ot=[],m.set(rt,ot));const et=U.textures;if(ot.length!==et.length||ot[0]!==i.COLOR_ATTACHMENT0){for(let $=0,vt=et.length;$<vt;$++)ot[$]=i.COLOR_ATTACHMENT0+$;ot.length=et.length,mt=!0}}else ot[0]!==i.BACK&&(ot[0]=i.BACK,mt=!0);mt&&i.drawBuffers(ot)}function Zt(U){return g!==U?(i.useProgram(U),g=U,!0):!1}const Ce={[ri]:i.FUNC_ADD,[uu]:i.FUNC_SUBTRACT,[hu]:i.FUNC_REVERSE_SUBTRACT};Ce[fu]=i.MIN,Ce[du]=i.MAX;const R={[pu]:i.ZERO,[mu]:i.ONE,[gu]:i.SRC_COLOR,[lo]:i.SRC_ALPHA,[yu]:i.SRC_ALPHA_SATURATE,[Mu]:i.DST_COLOR,[vu]:i.DST_ALPHA,[_u]:i.ONE_MINUS_SRC_COLOR,[co]:i.ONE_MINUS_SRC_ALPHA,[Su]:i.ONE_MINUS_DST_COLOR,[xu]:i.ONE_MINUS_DST_ALPHA,[Eu]:i.CONSTANT_COLOR,[Tu]:i.ONE_MINUS_CONSTANT_COLOR,[bu]:i.CONSTANT_ALPHA,[Au]:i.ONE_MINUS_CONSTANT_ALPHA};function ce(U,rt,ot,mt,et,$,vt,Nt,oe,Qt){if(U===Xn){_===!0&&(gt(i.BLEND),_=!1);return}if(_===!1&&(tt(i.BLEND),_=!0),U!==cu){if(U!==d||Qt!==E){if((f!==ri||M!==ri)&&(i.blendEquation(i.FUNC_ADD),f=ri,M=ri),Qt)switch(U){case Ni:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Wa:i.blendFunc(i.ONE,i.ONE);break;case Xa:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case qa:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case Ni:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Wa:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Xa:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case qa:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}b=null,y=null,C=null,w=null,P.set(0,0,0),I=0,d=U,E=Qt}return}et=et||rt,$=$||ot,vt=vt||mt,(rt!==f||et!==M)&&(i.blendEquationSeparate(Ce[rt],Ce[et]),f=rt,M=et),(ot!==b||mt!==y||$!==C||vt!==w)&&(i.blendFuncSeparate(R[ot],R[mt],R[$],R[vt]),b=ot,y=mt,C=$,w=vt),(Nt.equals(P)===!1||oe!==I)&&(i.blendColor(Nt.r,Nt.g,Nt.b,oe),P.copy(Nt),I=oe),d=U,E=!1}function Ft(U,rt){U.side===Be?gt(i.CULL_FACE):tt(i.CULL_FACE);let ot=U.side===ze;rt&&(ot=!ot),Dt(ot),U.blending===Ni&&U.transparent===!1?ce(Xn):ce(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),o.setFunc(U.depthFunc),o.setTest(U.depthTest),o.setMask(U.depthWrite),s.setMask(U.colorWrite);const mt=U.stencilWrite;a.setTest(mt),mt&&(a.setMask(U.stencilWriteMask),a.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),a.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),Mt(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?tt(i.SAMPLE_ALPHA_TO_COVERAGE):gt(i.SAMPLE_ALPHA_TO_COVERAGE)}function Dt(U){T!==U&&(U?i.frontFace(i.CW):i.frontFace(i.CCW),T=U)}function xt(U){U!==au?(tt(i.CULL_FACE),U!==D&&(U===Va?i.cullFace(i.BACK):U===lu?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):gt(i.CULL_FACE),D=U}function ue(U){U!==B&&(Z&&i.lineWidth(U),B=U)}function Mt(U,rt,ot){U?(tt(i.POLYGON_OFFSET_FILL),(V!==rt||J!==ot)&&(i.polygonOffset(rt,ot),V=rt,J=ot)):gt(i.POLYGON_OFFSET_FILL)}function zt(U){U?tt(i.SCISSOR_TEST):gt(i.SCISSOR_TEST)}function be(U){U===void 0&&(U=i.TEXTURE0+Y-1),lt!==U&&(i.activeTexture(U),lt=U)}function xe(U,rt,ot){ot===void 0&&(lt===null?ot=i.TEXTURE0+Y-1:ot=lt);let mt=dt[ot];mt===void 0&&(mt={type:void 0,texture:void 0},dt[ot]=mt),(mt.type!==U||mt.texture!==rt)&&(lt!==ot&&(i.activeTexture(ot),lt=ot),i.bindTexture(U,rt||K[U]),mt.type=U,mt.texture=rt)}function A(){const U=dt[lt];U!==void 0&&U.type!==void 0&&(i.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function v(){try{i.compressedTexImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function O(){try{i.compressedTexImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function q(){try{i.texSubImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function j(){try{i.texSubImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function X(){try{i.compressedTexSubImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Tt(){try{i.compressedTexSubImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function st(){try{i.texStorage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function St(){try{i.texStorage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function yt(){try{i.texImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function it(){try{i.texImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ht(U){se.equals(U)===!1&&(i.scissor(U.x,U.y,U.z,U.w),se.copy(U))}function Lt(U){le.equals(U)===!1&&(i.viewport(U.x,U.y,U.z,U.w),le.copy(U))}function Et(U,rt){let ot=l.get(rt);ot===void 0&&(ot=new WeakMap,l.set(rt,ot));let mt=ot.get(U);mt===void 0&&(mt=i.getUniformBlockIndex(rt,U.name),ot.set(U,mt))}function ct(U,rt){const mt=l.get(rt).get(U);c.get(rt)!==mt&&(i.uniformBlockBinding(rt,mt,U.__bindingPointIndex),c.set(rt,mt))}function Ot(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},lt=null,dt={},h={},m=new WeakMap,p=[],g=null,_=!1,d=null,f=null,b=null,y=null,M=null,C=null,w=null,P=new Xt(0,0,0),I=0,E=!1,T=null,D=null,B=null,V=null,J=null,se.set(0,0,i.canvas.width,i.canvas.height),le.set(0,0,i.canvas.width,i.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:tt,disable:gt,bindFramebuffer:It,drawBuffers:bt,useProgram:Zt,setBlending:ce,setMaterial:Ft,setFlipSided:Dt,setCullFace:xt,setLineWidth:ue,setPolygonOffset:Mt,setScissorTest:zt,activeTexture:be,bindTexture:xe,unbindTexture:A,compressedTexImage2D:v,compressedTexImage3D:O,texImage2D:yt,texImage3D:it,updateUBOMapping:Et,uniformBlockBinding:ct,texStorage2D:st,texStorage3D:St,texSubImage2D:q,texSubImage3D:j,compressedTexSubImage2D:X,compressedTexSubImage3D:Tt,scissor:ht,viewport:Lt,reset:Ot}}function K0(i,t,e,n,r,s,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new ft,u=new WeakMap;let h;const m=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(A,v){return p?new OffscreenCanvas(A,v):os("canvas")}function _(A,v,O){let q=1;const j=xe(A);if((j.width>O||j.height>O)&&(q=O/Math.max(j.width,j.height)),q<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const X=Math.floor(q*j.width),Tt=Math.floor(q*j.height);h===void 0&&(h=g(X,Tt));const st=v?g(X,Tt):h;return st.width=X,st.height=Tt,st.getContext("2d").drawImage(A,0,0,X,Tt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+j.width+"x"+j.height+") to ("+X+"x"+Tt+")."),st}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+j.width+"x"+j.height+")."),A;return A}function d(A){return A.generateMipmaps}function f(A){i.generateMipmap(A)}function b(A){return A.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?i.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function y(A,v,O,q,j=!1){if(A!==null){if(i[A]!==void 0)return i[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let X=v;if(v===i.RED&&(O===i.FLOAT&&(X=i.R32F),O===i.HALF_FLOAT&&(X=i.R16F),O===i.UNSIGNED_BYTE&&(X=i.R8)),v===i.RED_INTEGER&&(O===i.UNSIGNED_BYTE&&(X=i.R8UI),O===i.UNSIGNED_SHORT&&(X=i.R16UI),O===i.UNSIGNED_INT&&(X=i.R32UI),O===i.BYTE&&(X=i.R8I),O===i.SHORT&&(X=i.R16I),O===i.INT&&(X=i.R32I)),v===i.RG&&(O===i.FLOAT&&(X=i.RG32F),O===i.HALF_FLOAT&&(X=i.RG16F),O===i.UNSIGNED_BYTE&&(X=i.RG8)),v===i.RG_INTEGER&&(O===i.UNSIGNED_BYTE&&(X=i.RG8UI),O===i.UNSIGNED_SHORT&&(X=i.RG16UI),O===i.UNSIGNED_INT&&(X=i.RG32UI),O===i.BYTE&&(X=i.RG8I),O===i.SHORT&&(X=i.RG16I),O===i.INT&&(X=i.RG32I)),v===i.RGB_INTEGER&&(O===i.UNSIGNED_BYTE&&(X=i.RGB8UI),O===i.UNSIGNED_SHORT&&(X=i.RGB16UI),O===i.UNSIGNED_INT&&(X=i.RGB32UI),O===i.BYTE&&(X=i.RGB8I),O===i.SHORT&&(X=i.RGB16I),O===i.INT&&(X=i.RGB32I)),v===i.RGBA_INTEGER&&(O===i.UNSIGNED_BYTE&&(X=i.RGBA8UI),O===i.UNSIGNED_SHORT&&(X=i.RGBA16UI),O===i.UNSIGNED_INT&&(X=i.RGBA32UI),O===i.BYTE&&(X=i.RGBA8I),O===i.SHORT&&(X=i.RGBA16I),O===i.INT&&(X=i.RGBA32I)),v===i.RGB&&(O===i.UNSIGNED_INT_5_9_9_9_REV&&(X=i.RGB9_E5),O===i.UNSIGNED_INT_10F_11F_11F_REV&&(X=i.R11F_G11F_B10F)),v===i.RGBA){const Tt=j?rs:$t.getTransfer(q);O===i.FLOAT&&(X=i.RGBA32F),O===i.HALF_FLOAT&&(X=i.RGBA16F),O===i.UNSIGNED_BYTE&&(X=Tt===ne?i.SRGB8_ALPHA8:i.RGBA8),O===i.UNSIGNED_SHORT_4_4_4_4&&(X=i.RGBA4),O===i.UNSIGNED_SHORT_5_5_5_1&&(X=i.RGB5_A1)}return(X===i.R16F||X===i.R32F||X===i.RG16F||X===i.RG32F||X===i.RGBA16F||X===i.RGBA32F)&&t.get("EXT_color_buffer_float"),X}function M(A,v){let O;return A?v===null||v===ui||v===ur?O=i.DEPTH24_STENCIL8:v===Cn?O=i.DEPTH32F_STENCIL8:v===cr&&(O=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===ui||v===ur?O=i.DEPTH_COMPONENT24:v===Cn?O=i.DEPTH_COMPONENT32F:v===cr&&(O=i.DEPTH_COMPONENT16),O}function C(A,v){return d(A)===!0||A.isFramebufferTexture&&A.minFilter!==hn&&A.minFilter!==gn?Math.log2(Math.max(v.width,v.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?v.mipmaps.length:1}function w(A){const v=A.target;v.removeEventListener("dispose",w),I(v),v.isVideoTexture&&u.delete(v)}function P(A){const v=A.target;v.removeEventListener("dispose",P),T(v)}function I(A){const v=n.get(A);if(v.__webglInit===void 0)return;const O=A.source,q=m.get(O);if(q){const j=q[v.__cacheKey];j.usedTimes--,j.usedTimes===0&&E(A),Object.keys(q).length===0&&m.delete(O)}n.remove(A)}function E(A){const v=n.get(A);i.deleteTexture(v.__webglTexture);const O=A.source,q=m.get(O);delete q[v.__cacheKey],o.memory.textures--}function T(A){const v=n.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),n.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(v.__webglFramebuffer[q]))for(let j=0;j<v.__webglFramebuffer[q].length;j++)i.deleteFramebuffer(v.__webglFramebuffer[q][j]);else i.deleteFramebuffer(v.__webglFramebuffer[q]);v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer[q])}else{if(Array.isArray(v.__webglFramebuffer))for(let q=0;q<v.__webglFramebuffer.length;q++)i.deleteFramebuffer(v.__webglFramebuffer[q]);else i.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&i.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let q=0;q<v.__webglColorRenderbuffer.length;q++)v.__webglColorRenderbuffer[q]&&i.deleteRenderbuffer(v.__webglColorRenderbuffer[q]);v.__webglDepthRenderbuffer&&i.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const O=A.textures;for(let q=0,j=O.length;q<j;q++){const X=n.get(O[q]);X.__webglTexture&&(i.deleteTexture(X.__webglTexture),o.memory.textures--),n.remove(O[q])}n.remove(A)}let D=0;function B(){D=0}function V(){const A=D;return A>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+r.maxTextures),D+=1,A}function J(A){const v=[];return v.push(A.wrapS),v.push(A.wrapT),v.push(A.wrapR||0),v.push(A.magFilter),v.push(A.minFilter),v.push(A.anisotropy),v.push(A.internalFormat),v.push(A.format),v.push(A.type),v.push(A.generateMipmaps),v.push(A.premultiplyAlpha),v.push(A.flipY),v.push(A.unpackAlignment),v.push(A.colorSpace),v.join()}function Y(A,v){const O=n.get(A);if(A.isVideoTexture&&zt(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&O.__version!==A.version){const q=A.image;if(q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{K(O,A,v);return}}else A.isExternalTexture&&(O.__webglTexture=A.sourceTexture?A.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,O.__webglTexture,i.TEXTURE0+v)}function Z(A,v){const O=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&O.__version!==A.version){K(O,A,v);return}e.bindTexture(i.TEXTURE_2D_ARRAY,O.__webglTexture,i.TEXTURE0+v)}function Q(A,v){const O=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&O.__version!==A.version){K(O,A,v);return}e.bindTexture(i.TEXTURE_3D,O.__webglTexture,i.TEXTURE0+v)}function W(A,v){const O=n.get(A);if(A.version>0&&O.__version!==A.version){tt(O,A,v);return}e.bindTexture(i.TEXTURE_CUBE_MAP,O.__webglTexture,i.TEXTURE0+v)}const lt={[is]:i.REPEAT,[oi]:i.CLAMP_TO_EDGE,[Mo]:i.MIRRORED_REPEAT},dt={[hn]:i.NEAREST,[Nu]:i.NEAREST_MIPMAP_NEAREST,[br]:i.NEAREST_MIPMAP_LINEAR,[gn]:i.LINEAR,[bs]:i.LINEAR_MIPMAP_NEAREST,[ai]:i.LINEAR_MIPMAP_LINEAR},At={[zu]:i.NEVER,[Xu]:i.ALWAYS,[ku]:i.LESS,[xc]:i.LEQUAL,[Hu]:i.EQUAL,[Wu]:i.GEQUAL,[Gu]:i.GREATER,[Vu]:i.NOTEQUAL};function Wt(A,v){if(v.type===Cn&&t.has("OES_texture_float_linear")===!1&&(v.magFilter===gn||v.magFilter===bs||v.magFilter===br||v.magFilter===ai||v.minFilter===gn||v.minFilter===bs||v.minFilter===br||v.minFilter===ai)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(A,i.TEXTURE_WRAP_S,lt[v.wrapS]),i.texParameteri(A,i.TEXTURE_WRAP_T,lt[v.wrapT]),(A===i.TEXTURE_3D||A===i.TEXTURE_2D_ARRAY)&&i.texParameteri(A,i.TEXTURE_WRAP_R,lt[v.wrapR]),i.texParameteri(A,i.TEXTURE_MAG_FILTER,dt[v.magFilter]),i.texParameteri(A,i.TEXTURE_MIN_FILTER,dt[v.minFilter]),v.compareFunction&&(i.texParameteri(A,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(A,i.TEXTURE_COMPARE_FUNC,At[v.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===hn||v.minFilter!==br&&v.minFilter!==ai||v.type===Cn&&t.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){const O=t.get("EXT_texture_filter_anisotropic");i.texParameterf(A,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,r.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function se(A,v){let O=!1;A.__webglInit===void 0&&(A.__webglInit=!0,v.addEventListener("dispose",w));const q=v.source;let j=m.get(q);j===void 0&&(j={},m.set(q,j));const X=J(v);if(X!==A.__cacheKey){j[X]===void 0&&(j[X]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,O=!0),j[X].usedTimes++;const Tt=j[A.__cacheKey];Tt!==void 0&&(j[A.__cacheKey].usedTimes--,Tt.usedTimes===0&&E(v)),A.__cacheKey=X,A.__webglTexture=j[X].texture}return O}function le(A,v,O){return Math.floor(Math.floor(A/O)/v)}function jt(A,v,O,q){const X=A.updateRanges;if(X.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,v.width,v.height,O,q,v.data);else{X.sort((it,ht)=>it.start-ht.start);let Tt=0;for(let it=1;it<X.length;it++){const ht=X[Tt],Lt=X[it],Et=ht.start+ht.count,ct=le(Lt.start,v.width,4),Ot=le(ht.start,v.width,4);Lt.start<=Et+1&&ct===Ot&&le(Lt.start+Lt.count-1,v.width,4)===ct?ht.count=Math.max(ht.count,Lt.start+Lt.count-ht.start):(++Tt,X[Tt]=Lt)}X.length=Tt+1;const st=i.getParameter(i.UNPACK_ROW_LENGTH),St=i.getParameter(i.UNPACK_SKIP_PIXELS),yt=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,v.width);for(let it=0,ht=X.length;it<ht;it++){const Lt=X[it],Et=Math.floor(Lt.start/4),ct=Math.ceil(Lt.count/4),Ot=Et%v.width,U=Math.floor(Et/v.width),rt=ct,ot=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,Ot),i.pixelStorei(i.UNPACK_SKIP_ROWS,U),e.texSubImage2D(i.TEXTURE_2D,0,Ot,U,rt,ot,O,q,v.data)}A.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,st),i.pixelStorei(i.UNPACK_SKIP_PIXELS,St),i.pixelStorei(i.UNPACK_SKIP_ROWS,yt)}}function K(A,v,O){let q=i.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(q=i.TEXTURE_2D_ARRAY),v.isData3DTexture&&(q=i.TEXTURE_3D);const j=se(A,v),X=v.source;e.bindTexture(q,A.__webglTexture,i.TEXTURE0+O);const Tt=n.get(X);if(X.version!==Tt.__version||j===!0){e.activeTexture(i.TEXTURE0+O);const st=$t.getPrimaries($t.workingColorSpace),St=v.colorSpace===Vn?null:$t.getPrimaries(v.colorSpace),yt=v.colorSpace===Vn||st===St?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,yt);let it=_(v.image,!1,r.maxTextureSize);it=be(v,it);const ht=s.convert(v.format,v.colorSpace),Lt=s.convert(v.type);let Et=y(v.internalFormat,ht,Lt,v.colorSpace,v.isVideoTexture);Wt(q,v);let ct;const Ot=v.mipmaps,U=v.isVideoTexture!==!0,rt=Tt.__version===void 0||j===!0,ot=X.dataReady,mt=C(v,it);if(v.isDepthTexture)Et=M(v.format===fr,v.type),rt&&(U?e.texStorage2D(i.TEXTURE_2D,1,Et,it.width,it.height):e.texImage2D(i.TEXTURE_2D,0,Et,it.width,it.height,0,ht,Lt,null));else if(v.isDataTexture)if(Ot.length>0){U&&rt&&e.texStorage2D(i.TEXTURE_2D,mt,Et,Ot[0].width,Ot[0].height);for(let et=0,$=Ot.length;et<$;et++)ct=Ot[et],U?ot&&e.texSubImage2D(i.TEXTURE_2D,et,0,0,ct.width,ct.height,ht,Lt,ct.data):e.texImage2D(i.TEXTURE_2D,et,Et,ct.width,ct.height,0,ht,Lt,ct.data);v.generateMipmaps=!1}else U?(rt&&e.texStorage2D(i.TEXTURE_2D,mt,Et,it.width,it.height),ot&&jt(v,it,ht,Lt)):e.texImage2D(i.TEXTURE_2D,0,Et,it.width,it.height,0,ht,Lt,it.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){U&&rt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,mt,Et,Ot[0].width,Ot[0].height,it.depth);for(let et=0,$=Ot.length;et<$;et++)if(ct=Ot[et],v.format!==un)if(ht!==null)if(U){if(ot)if(v.layerUpdates.size>0){const vt=yl(ct.width,ct.height,v.format,v.type);for(const Nt of v.layerUpdates){const oe=ct.data.subarray(Nt*vt/ct.data.BYTES_PER_ELEMENT,(Nt+1)*vt/ct.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,et,0,0,Nt,ct.width,ct.height,1,ht,oe)}v.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,et,0,0,0,ct.width,ct.height,it.depth,ht,ct.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,et,Et,ct.width,ct.height,it.depth,0,ct.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else U?ot&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,et,0,0,0,ct.width,ct.height,it.depth,ht,Lt,ct.data):e.texImage3D(i.TEXTURE_2D_ARRAY,et,Et,ct.width,ct.height,it.depth,0,ht,Lt,ct.data)}else{U&&rt&&e.texStorage2D(i.TEXTURE_2D,mt,Et,Ot[0].width,Ot[0].height);for(let et=0,$=Ot.length;et<$;et++)ct=Ot[et],v.format!==un?ht!==null?U?ot&&e.compressedTexSubImage2D(i.TEXTURE_2D,et,0,0,ct.width,ct.height,ht,ct.data):e.compressedTexImage2D(i.TEXTURE_2D,et,Et,ct.width,ct.height,0,ct.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):U?ot&&e.texSubImage2D(i.TEXTURE_2D,et,0,0,ct.width,ct.height,ht,Lt,ct.data):e.texImage2D(i.TEXTURE_2D,et,Et,ct.width,ct.height,0,ht,Lt,ct.data)}else if(v.isDataArrayTexture)if(U){if(rt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,mt,Et,it.width,it.height,it.depth),ot)if(v.layerUpdates.size>0){const et=yl(it.width,it.height,v.format,v.type);for(const $ of v.layerUpdates){const vt=it.data.subarray($*et/it.data.BYTES_PER_ELEMENT,($+1)*et/it.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,$,it.width,it.height,1,ht,Lt,vt)}v.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,it.width,it.height,it.depth,ht,Lt,it.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Et,it.width,it.height,it.depth,0,ht,Lt,it.data);else if(v.isData3DTexture)U?(rt&&e.texStorage3D(i.TEXTURE_3D,mt,Et,it.width,it.height,it.depth),ot&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,it.width,it.height,it.depth,ht,Lt,it.data)):e.texImage3D(i.TEXTURE_3D,0,Et,it.width,it.height,it.depth,0,ht,Lt,it.data);else if(v.isFramebufferTexture){if(rt)if(U)e.texStorage2D(i.TEXTURE_2D,mt,Et,it.width,it.height);else{let et=it.width,$=it.height;for(let vt=0;vt<mt;vt++)e.texImage2D(i.TEXTURE_2D,vt,Et,et,$,0,ht,Lt,null),et>>=1,$>>=1}}else if(Ot.length>0){if(U&&rt){const et=xe(Ot[0]);e.texStorage2D(i.TEXTURE_2D,mt,Et,et.width,et.height)}for(let et=0,$=Ot.length;et<$;et++)ct=Ot[et],U?ot&&e.texSubImage2D(i.TEXTURE_2D,et,0,0,ht,Lt,ct):e.texImage2D(i.TEXTURE_2D,et,Et,ht,Lt,ct);v.generateMipmaps=!1}else if(U){if(rt){const et=xe(it);e.texStorage2D(i.TEXTURE_2D,mt,Et,et.width,et.height)}ot&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,ht,Lt,it)}else e.texImage2D(i.TEXTURE_2D,0,Et,ht,Lt,it);d(v)&&f(q),Tt.__version=X.version,v.onUpdate&&v.onUpdate(v)}A.__version=v.version}function tt(A,v,O){if(v.image.length!==6)return;const q=se(A,v),j=v.source;e.bindTexture(i.TEXTURE_CUBE_MAP,A.__webglTexture,i.TEXTURE0+O);const X=n.get(j);if(j.version!==X.__version||q===!0){e.activeTexture(i.TEXTURE0+O);const Tt=$t.getPrimaries($t.workingColorSpace),st=v.colorSpace===Vn?null:$t.getPrimaries(v.colorSpace),St=v.colorSpace===Vn||Tt===st?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,St);const yt=v.isCompressedTexture||v.image[0].isCompressedTexture,it=v.image[0]&&v.image[0].isDataTexture,ht=[];for(let $=0;$<6;$++)!yt&&!it?ht[$]=_(v.image[$],!0,r.maxCubemapSize):ht[$]=it?v.image[$].image:v.image[$],ht[$]=be(v,ht[$]);const Lt=ht[0],Et=s.convert(v.format,v.colorSpace),ct=s.convert(v.type),Ot=y(v.internalFormat,Et,ct,v.colorSpace),U=v.isVideoTexture!==!0,rt=X.__version===void 0||q===!0,ot=j.dataReady;let mt=C(v,Lt);Wt(i.TEXTURE_CUBE_MAP,v);let et;if(yt){U&&rt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,mt,Ot,Lt.width,Lt.height);for(let $=0;$<6;$++){et=ht[$].mipmaps;for(let vt=0;vt<et.length;vt++){const Nt=et[vt];v.format!==un?Et!==null?U?ot&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,vt,0,0,Nt.width,Nt.height,Et,Nt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,vt,Ot,Nt.width,Nt.height,0,Nt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):U?ot&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,vt,0,0,Nt.width,Nt.height,Et,ct,Nt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,vt,Ot,Nt.width,Nt.height,0,Et,ct,Nt.data)}}}else{if(et=v.mipmaps,U&&rt){et.length>0&&mt++;const $=xe(ht[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,mt,Ot,$.width,$.height)}for(let $=0;$<6;$++)if(it){U?ot&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,ht[$].width,ht[$].height,Et,ct,ht[$].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,Ot,ht[$].width,ht[$].height,0,Et,ct,ht[$].data);for(let vt=0;vt<et.length;vt++){const oe=et[vt].image[$].image;U?ot&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,vt+1,0,0,oe.width,oe.height,Et,ct,oe.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,vt+1,Ot,oe.width,oe.height,0,Et,ct,oe.data)}}else{U?ot&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,Et,ct,ht[$]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,Ot,Et,ct,ht[$]);for(let vt=0;vt<et.length;vt++){const Nt=et[vt];U?ot&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,vt+1,0,0,Et,ct,Nt.image[$]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,vt+1,Ot,Et,ct,Nt.image[$])}}}d(v)&&f(i.TEXTURE_CUBE_MAP),X.__version=j.version,v.onUpdate&&v.onUpdate(v)}A.__version=v.version}function gt(A,v,O,q,j,X){const Tt=s.convert(O.format,O.colorSpace),st=s.convert(O.type),St=y(O.internalFormat,Tt,st,O.colorSpace),yt=n.get(v),it=n.get(O);if(it.__renderTarget=v,!yt.__hasExternalTextures){const ht=Math.max(1,v.width>>X),Lt=Math.max(1,v.height>>X);j===i.TEXTURE_3D||j===i.TEXTURE_2D_ARRAY?e.texImage3D(j,X,St,ht,Lt,v.depth,0,Tt,st,null):e.texImage2D(j,X,St,ht,Lt,0,Tt,st,null)}e.bindFramebuffer(i.FRAMEBUFFER,A),Mt(v)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,q,j,it.__webglTexture,0,ue(v)):(j===i.TEXTURE_2D||j>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&j<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,q,j,it.__webglTexture,X),e.bindFramebuffer(i.FRAMEBUFFER,null)}function It(A,v,O){if(i.bindRenderbuffer(i.RENDERBUFFER,A),v.depthBuffer){const q=v.depthTexture,j=q&&q.isDepthTexture?q.type:null,X=M(v.stencilBuffer,j),Tt=v.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,st=ue(v);Mt(v)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,st,X,v.width,v.height):O?i.renderbufferStorageMultisample(i.RENDERBUFFER,st,X,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,X,v.width,v.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Tt,i.RENDERBUFFER,A)}else{const q=v.textures;for(let j=0;j<q.length;j++){const X=q[j],Tt=s.convert(X.format,X.colorSpace),st=s.convert(X.type),St=y(X.internalFormat,Tt,st,X.colorSpace),yt=ue(v);O&&Mt(v)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,yt,St,v.width,v.height):Mt(v)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,yt,St,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,St,v.width,v.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function bt(A,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,A),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const q=n.get(v.depthTexture);q.__renderTarget=v,(!q.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),Y(v.depthTexture,0);const j=q.__webglTexture,X=ue(v);if(v.depthTexture.format===hr)Mt(v)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,j,0,X):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,j,0);else if(v.depthTexture.format===fr)Mt(v)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,j,0,X):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,j,0);else throw new Error("Unknown depthTexture format")}function Zt(A){const v=n.get(A),O=A.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==A.depthTexture){const q=A.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),q){const j=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,q.removeEventListener("dispose",j)};q.addEventListener("dispose",j),v.__depthDisposeCallback=j}v.__boundDepthTexture=q}if(A.depthTexture&&!v.__autoAllocateDepthBuffer){if(O)throw new Error("target.depthTexture not supported in Cube render targets");const q=A.texture.mipmaps;q&&q.length>0?bt(v.__webglFramebuffer[0],A):bt(v.__webglFramebuffer,A)}else if(O){v.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(e.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[q]),v.__webglDepthbuffer[q]===void 0)v.__webglDepthbuffer[q]=i.createRenderbuffer(),It(v.__webglDepthbuffer[q],A,!1);else{const j=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,X=v.__webglDepthbuffer[q];i.bindRenderbuffer(i.RENDERBUFFER,X),i.framebufferRenderbuffer(i.FRAMEBUFFER,j,i.RENDERBUFFER,X)}}else{const q=A.texture.mipmaps;if(q&&q.length>0?e.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=i.createRenderbuffer(),It(v.__webglDepthbuffer,A,!1);else{const j=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,X=v.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,X),i.framebufferRenderbuffer(i.FRAMEBUFFER,j,i.RENDERBUFFER,X)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Ce(A,v,O){const q=n.get(A);v!==void 0&&gt(q.__webglFramebuffer,A,A.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),O!==void 0&&Zt(A)}function R(A){const v=A.texture,O=n.get(A),q=n.get(v);A.addEventListener("dispose",P);const j=A.textures,X=A.isWebGLCubeRenderTarget===!0,Tt=j.length>1;if(Tt||(q.__webglTexture===void 0&&(q.__webglTexture=i.createTexture()),q.__version=v.version,o.memory.textures++),X){O.__webglFramebuffer=[];for(let st=0;st<6;st++)if(v.mipmaps&&v.mipmaps.length>0){O.__webglFramebuffer[st]=[];for(let St=0;St<v.mipmaps.length;St++)O.__webglFramebuffer[st][St]=i.createFramebuffer()}else O.__webglFramebuffer[st]=i.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){O.__webglFramebuffer=[];for(let st=0;st<v.mipmaps.length;st++)O.__webglFramebuffer[st]=i.createFramebuffer()}else O.__webglFramebuffer=i.createFramebuffer();if(Tt)for(let st=0,St=j.length;st<St;st++){const yt=n.get(j[st]);yt.__webglTexture===void 0&&(yt.__webglTexture=i.createTexture(),o.memory.textures++)}if(A.samples>0&&Mt(A)===!1){O.__webglMultisampledFramebuffer=i.createFramebuffer(),O.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let st=0;st<j.length;st++){const St=j[st];O.__webglColorRenderbuffer[st]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,O.__webglColorRenderbuffer[st]);const yt=s.convert(St.format,St.colorSpace),it=s.convert(St.type),ht=y(St.internalFormat,yt,it,St.colorSpace,A.isXRRenderTarget===!0),Lt=ue(A);i.renderbufferStorageMultisample(i.RENDERBUFFER,Lt,ht,A.width,A.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+st,i.RENDERBUFFER,O.__webglColorRenderbuffer[st])}i.bindRenderbuffer(i.RENDERBUFFER,null),A.depthBuffer&&(O.__webglDepthRenderbuffer=i.createRenderbuffer(),It(O.__webglDepthRenderbuffer,A,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(X){e.bindTexture(i.TEXTURE_CUBE_MAP,q.__webglTexture),Wt(i.TEXTURE_CUBE_MAP,v);for(let st=0;st<6;st++)if(v.mipmaps&&v.mipmaps.length>0)for(let St=0;St<v.mipmaps.length;St++)gt(O.__webglFramebuffer[st][St],A,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+st,St);else gt(O.__webglFramebuffer[st],A,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+st,0);d(v)&&f(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Tt){for(let st=0,St=j.length;st<St;st++){const yt=j[st],it=n.get(yt);let ht=i.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(ht=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(ht,it.__webglTexture),Wt(ht,yt),gt(O.__webglFramebuffer,A,yt,i.COLOR_ATTACHMENT0+st,ht,0),d(yt)&&f(ht)}e.unbindTexture()}else{let st=i.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(st=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(st,q.__webglTexture),Wt(st,v),v.mipmaps&&v.mipmaps.length>0)for(let St=0;St<v.mipmaps.length;St++)gt(O.__webglFramebuffer[St],A,v,i.COLOR_ATTACHMENT0,st,St);else gt(O.__webglFramebuffer,A,v,i.COLOR_ATTACHMENT0,st,0);d(v)&&f(st),e.unbindTexture()}A.depthBuffer&&Zt(A)}function ce(A){const v=A.textures;for(let O=0,q=v.length;O<q;O++){const j=v[O];if(d(j)){const X=b(A),Tt=n.get(j).__webglTexture;e.bindTexture(X,Tt),f(X),e.unbindTexture()}}}const Ft=[],Dt=[];function xt(A){if(A.samples>0){if(Mt(A)===!1){const v=A.textures,O=A.width,q=A.height;let j=i.COLOR_BUFFER_BIT;const X=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Tt=n.get(A),st=v.length>1;if(st)for(let yt=0;yt<v.length;yt++)e.bindFramebuffer(i.FRAMEBUFFER,Tt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+yt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Tt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+yt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Tt.__webglMultisampledFramebuffer);const St=A.texture.mipmaps;St&&St.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Tt.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Tt.__webglFramebuffer);for(let yt=0;yt<v.length;yt++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(j|=i.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(j|=i.STENCIL_BUFFER_BIT)),st){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Tt.__webglColorRenderbuffer[yt]);const it=n.get(v[yt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,it,0)}i.blitFramebuffer(0,0,O,q,0,0,O,q,j,i.NEAREST),c===!0&&(Ft.length=0,Dt.length=0,Ft.push(i.COLOR_ATTACHMENT0+yt),A.depthBuffer&&A.resolveDepthBuffer===!1&&(Ft.push(X),Dt.push(X),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Dt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Ft))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),st)for(let yt=0;yt<v.length;yt++){e.bindFramebuffer(i.FRAMEBUFFER,Tt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+yt,i.RENDERBUFFER,Tt.__webglColorRenderbuffer[yt]);const it=n.get(v[yt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Tt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+yt,i.TEXTURE_2D,it,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Tt.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&c){const v=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[v])}}}function ue(A){return Math.min(r.maxSamples,A.samples)}function Mt(A){const v=n.get(A);return A.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function zt(A){const v=o.render.frame;u.get(A)!==v&&(u.set(A,v),A.update())}function be(A,v){const O=A.colorSpace,q=A.format,j=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||O!==ki&&O!==Vn&&($t.getTransfer(O)===ne?(q!==un||j!==vn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",O)),v}function xe(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(l.width=A.naturalWidth||A.width,l.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(l.width=A.displayWidth,l.height=A.displayHeight):(l.width=A.width,l.height=A.height),l}this.allocateTextureUnit=V,this.resetTextureUnits=B,this.setTexture2D=Y,this.setTexture2DArray=Z,this.setTexture3D=Q,this.setTextureCube=W,this.rebindTextures=Ce,this.setupRenderTarget=R,this.updateRenderTargetMipmap=ce,this.updateMultisampleRenderTarget=xt,this.setupDepthRenderbuffer=Zt,this.setupFrameBufferTexture=gt,this.useMultisampledRTT=Mt}function $0(i,t){function e(n,r=Vn){let s;const o=$t.getTransfer(r);if(n===vn)return i.UNSIGNED_BYTE;if(n===la)return i.UNSIGNED_SHORT_4_4_4_4;if(n===ca)return i.UNSIGNED_SHORT_5_5_5_1;if(n===fc)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===dc)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===uc)return i.BYTE;if(n===hc)return i.SHORT;if(n===cr)return i.UNSIGNED_SHORT;if(n===aa)return i.INT;if(n===ui)return i.UNSIGNED_INT;if(n===Cn)return i.FLOAT;if(n===xr)return i.HALF_FLOAT;if(n===pc)return i.ALPHA;if(n===mc)return i.RGB;if(n===un)return i.RGBA;if(n===hr)return i.DEPTH_COMPONENT;if(n===fr)return i.DEPTH_STENCIL;if(n===gc)return i.RED;if(n===ua)return i.RED_INTEGER;if(n===_c)return i.RG;if(n===ha)return i.RG_INTEGER;if(n===fa)return i.RGBA_INTEGER;if(n===Kr||n===$r||n===jr||n===Qr)if(o===ne)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Kr)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===$r)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===jr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Qr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Kr)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===$r)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===jr)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Qr)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===So||n===yo||n===Eo||n===To)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===So)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===yo)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Eo)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===To)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===bo||n===Ao||n===wo)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(n===bo||n===Ao)return o===ne?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===wo)return o===ne?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Ro||n===Co||n===Po||n===Lo||n===Do||n===Uo||n===Io||n===No||n===Fo||n===Oo||n===Bo||n===zo||n===ko||n===Ho)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Ro)return o===ne?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Co)return o===ne?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Po)return o===ne?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Lo)return o===ne?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Do)return o===ne?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Uo)return o===ne?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Io)return o===ne?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===No)return o===ne?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Fo)return o===ne?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Oo)return o===ne?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Bo)return o===ne?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===zo)return o===ne?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ko)return o===ne?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ho)return o===ne?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Go||n===Vo||n===Wo)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(n===Go)return o===ne?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Vo)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Wo)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Xo||n===qo||n===Yo||n===Zo)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(n===Xo)return s.COMPRESSED_RED_RGTC1_EXT;if(n===qo)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Yo)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Zo)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ur?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}const j0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Q0=`
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

}`;class tg{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new Pc(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Un({vertexShader:j0,fragmentShader:Q0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new nn(new He(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class eg extends Wi{constructor(t,e){super();const n=this;let r=null,s=1,o=null,a="local-floor",c=1,l=null,u=null,h=null,m=null,p=null,g=null;const _=typeof XRWebGLBinding<"u",d=new tg,f={},b=e.getContextAttributes();let y=null,M=null;const C=[],w=[],P=new ft;let I=null;const E=new Ze;E.viewport=new ie;const T=new Ze;T.viewport=new ie;const D=[E,T],B=new yf;let V=null,J=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let tt=C[K];return tt===void 0&&(tt=new qs,C[K]=tt),tt.getTargetRaySpace()},this.getControllerGrip=function(K){let tt=C[K];return tt===void 0&&(tt=new qs,C[K]=tt),tt.getGripSpace()},this.getHand=function(K){let tt=C[K];return tt===void 0&&(tt=new qs,C[K]=tt),tt.getHandSpace()};function Y(K){const tt=w.indexOf(K.inputSource);if(tt===-1)return;const gt=C[tt];gt!==void 0&&(gt.update(K.inputSource,K.frame,l||o),gt.dispatchEvent({type:K.type,data:K.inputSource}))}function Z(){r.removeEventListener("select",Y),r.removeEventListener("selectstart",Y),r.removeEventListener("selectend",Y),r.removeEventListener("squeeze",Y),r.removeEventListener("squeezestart",Y),r.removeEventListener("squeezeend",Y),r.removeEventListener("end",Z),r.removeEventListener("inputsourceschange",Q);for(let K=0;K<C.length;K++){const tt=w[K];tt!==null&&(w[K]=null,C[K].disconnect(tt))}V=null,J=null,d.reset();for(const K in f)delete f[K];t.setRenderTarget(y),p=null,m=null,h=null,r=null,M=null,jt.stop(),n.isPresenting=!1,t.setPixelRatio(I),t.setSize(P.width,P.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){s=K,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){a=K,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(K){l=K},this.getBaseLayer=function(){return m!==null?m:p},this.getBinding=function(){return h===null&&_&&(h=new XRWebGLBinding(r,e)),h},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(K){if(r=K,r!==null){if(y=t.getRenderTarget(),r.addEventListener("select",Y),r.addEventListener("selectstart",Y),r.addEventListener("selectend",Y),r.addEventListener("squeeze",Y),r.addEventListener("squeezestart",Y),r.addEventListener("squeezeend",Y),r.addEventListener("end",Z),r.addEventListener("inputsourceschange",Q),b.xrCompatible!==!0&&await e.makeXRCompatible(),I=t.getPixelRatio(),t.getSize(P),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let gt=null,It=null,bt=null;b.depth&&(bt=b.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,gt=b.stencil?fr:hr,It=b.stencil?ur:ui);const Zt={colorFormat:e.RGBA8,depthFormat:bt,scaleFactor:s};h=this.getBinding(),m=h.createProjectionLayer(Zt),r.updateRenderState({layers:[m]}),t.setPixelRatio(1),t.setSize(m.textureWidth,m.textureHeight,!1),M=new hi(m.textureWidth,m.textureHeight,{format:un,type:vn,depthTexture:new Cc(m.textureWidth,m.textureHeight,It,void 0,void 0,void 0,void 0,void 0,void 0,gt),stencilBuffer:b.stencil,colorSpace:t.outputColorSpace,samples:b.antialias?4:0,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1})}else{const gt={antialias:b.antialias,alpha:!0,depth:b.depth,stencil:b.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,e,gt),r.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),M=new hi(p.framebufferWidth,p.framebufferHeight,{format:un,type:vn,colorSpace:t.outputColorSpace,stencilBuffer:b.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await r.requestReferenceSpace(a),jt.setContext(r),jt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return d.getDepthTexture()};function Q(K){for(let tt=0;tt<K.removed.length;tt++){const gt=K.removed[tt],It=w.indexOf(gt);It>=0&&(w[It]=null,C[It].disconnect(gt))}for(let tt=0;tt<K.added.length;tt++){const gt=K.added[tt];let It=w.indexOf(gt);if(It===-1){for(let Zt=0;Zt<C.length;Zt++)if(Zt>=w.length){w.push(gt),It=Zt;break}else if(w[Zt]===null){w[Zt]=gt,It=Zt;break}if(It===-1)break}const bt=C[It];bt&&bt.connect(gt)}}const W=new L,lt=new L;function dt(K,tt,gt){W.setFromMatrixPosition(tt.matrixWorld),lt.setFromMatrixPosition(gt.matrixWorld);const It=W.distanceTo(lt),bt=tt.projectionMatrix.elements,Zt=gt.projectionMatrix.elements,Ce=bt[14]/(bt[10]-1),R=bt[14]/(bt[10]+1),ce=(bt[9]+1)/bt[5],Ft=(bt[9]-1)/bt[5],Dt=(bt[8]-1)/bt[0],xt=(Zt[8]+1)/Zt[0],ue=Ce*Dt,Mt=Ce*xt,zt=It/(-Dt+xt),be=zt*-Dt;if(tt.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(be),K.translateZ(zt),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert(),bt[10]===-1)K.projectionMatrix.copy(tt.projectionMatrix),K.projectionMatrixInverse.copy(tt.projectionMatrixInverse);else{const xe=Ce+zt,A=R+zt,v=ue-be,O=Mt+(It-be),q=ce*R/A*xe,j=Ft*R/A*xe;K.projectionMatrix.makePerspective(v,O,q,j,xe,A),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}}function At(K,tt){tt===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(tt.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(r===null)return;let tt=K.near,gt=K.far;d.texture!==null&&(d.depthNear>0&&(tt=d.depthNear),d.depthFar>0&&(gt=d.depthFar)),B.near=T.near=E.near=tt,B.far=T.far=E.far=gt,(V!==B.near||J!==B.far)&&(r.updateRenderState({depthNear:B.near,depthFar:B.far}),V=B.near,J=B.far),B.layers.mask=K.layers.mask|6,E.layers.mask=B.layers.mask&3,T.layers.mask=B.layers.mask&5;const It=K.parent,bt=B.cameras;At(B,It);for(let Zt=0;Zt<bt.length;Zt++)At(bt[Zt],It);bt.length===2?dt(B,E,T):B.projectionMatrix.copy(E.projectionMatrix),Wt(K,B,It)};function Wt(K,tt,gt){gt===null?K.matrix.copy(tt.matrixWorld):(K.matrix.copy(gt.matrixWorld),K.matrix.invert(),K.matrix.multiply(tt.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(tt.projectionMatrix),K.projectionMatrixInverse.copy(tt.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=dr*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return B},this.getFoveation=function(){if(!(m===null&&p===null))return c},this.setFoveation=function(K){c=K,m!==null&&(m.fixedFoveation=K),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=K)},this.hasDepthSensing=function(){return d.texture!==null},this.getDepthSensingMesh=function(){return d.getMesh(B)},this.getCameraTexture=function(K){return f[K]};let se=null;function le(K,tt){if(u=tt.getViewerPose(l||o),g=tt,u!==null){const gt=u.views;p!==null&&(t.setRenderTargetFramebuffer(M,p.framebuffer),t.setRenderTarget(M));let It=!1;gt.length!==B.cameras.length&&(B.cameras.length=0,It=!0);for(let R=0;R<gt.length;R++){const ce=gt[R];let Ft=null;if(p!==null)Ft=p.getViewport(ce);else{const xt=h.getViewSubImage(m,ce);Ft=xt.viewport,R===0&&(t.setRenderTargetTextures(M,xt.colorTexture,xt.depthStencilTexture),t.setRenderTarget(M))}let Dt=D[R];Dt===void 0&&(Dt=new Ze,Dt.layers.enable(R),Dt.viewport=new ie,D[R]=Dt),Dt.matrix.fromArray(ce.transform.matrix),Dt.matrix.decompose(Dt.position,Dt.quaternion,Dt.scale),Dt.projectionMatrix.fromArray(ce.projectionMatrix),Dt.projectionMatrixInverse.copy(Dt.projectionMatrix).invert(),Dt.viewport.set(Ft.x,Ft.y,Ft.width,Ft.height),R===0&&(B.matrix.copy(Dt.matrix),B.matrix.decompose(B.position,B.quaternion,B.scale)),It===!0&&B.cameras.push(Dt)}const bt=r.enabledFeatures;if(bt&&bt.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&_){h=n.getBinding();const R=h.getDepthInformation(gt[0]);R&&R.isValid&&R.texture&&d.init(R,r.renderState)}if(bt&&bt.includes("camera-access")&&_){t.state.unbindTexture(),h=n.getBinding();for(let R=0;R<gt.length;R++){const ce=gt[R].camera;if(ce){let Ft=f[ce];Ft||(Ft=new Pc,f[ce]=Ft);const Dt=h.getCameraImage(ce);Ft.sourceTexture=Dt}}}}for(let gt=0;gt<C.length;gt++){const It=w[gt],bt=C[gt];It!==null&&bt!==void 0&&bt.update(It,tt,l||o)}se&&se(K,tt),tt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:tt}),g=null}const jt=new Vc;jt.setAnimationLoop(le),this.setAnimationLoop=function(K){se=K},this.dispose=function(){}}}const ei=new xn,ng=new me;function ig(i,t){function e(d,f){d.matrixAutoUpdate===!0&&d.updateMatrix(),f.value.copy(d.matrix)}function n(d,f){f.color.getRGB(d.fogColor.value,Ac(i)),f.isFog?(d.fogNear.value=f.near,d.fogFar.value=f.far):f.isFogExp2&&(d.fogDensity.value=f.density)}function r(d,f,b,y,M){f.isMeshBasicMaterial||f.isMeshLambertMaterial?s(d,f):f.isMeshToonMaterial?(s(d,f),h(d,f)):f.isMeshPhongMaterial?(s(d,f),u(d,f)):f.isMeshStandardMaterial?(s(d,f),m(d,f),f.isMeshPhysicalMaterial&&p(d,f,M)):f.isMeshMatcapMaterial?(s(d,f),g(d,f)):f.isMeshDepthMaterial?s(d,f):f.isMeshDistanceMaterial?(s(d,f),_(d,f)):f.isMeshNormalMaterial?s(d,f):f.isLineBasicMaterial?(o(d,f),f.isLineDashedMaterial&&a(d,f)):f.isPointsMaterial?c(d,f,b,y):f.isSpriteMaterial?l(d,f):f.isShadowMaterial?(d.color.value.copy(f.color),d.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function s(d,f){d.opacity.value=f.opacity,f.color&&d.diffuse.value.copy(f.color),f.emissive&&d.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(d.map.value=f.map,e(f.map,d.mapTransform)),f.alphaMap&&(d.alphaMap.value=f.alphaMap,e(f.alphaMap,d.alphaMapTransform)),f.bumpMap&&(d.bumpMap.value=f.bumpMap,e(f.bumpMap,d.bumpMapTransform),d.bumpScale.value=f.bumpScale,f.side===ze&&(d.bumpScale.value*=-1)),f.normalMap&&(d.normalMap.value=f.normalMap,e(f.normalMap,d.normalMapTransform),d.normalScale.value.copy(f.normalScale),f.side===ze&&d.normalScale.value.negate()),f.displacementMap&&(d.displacementMap.value=f.displacementMap,e(f.displacementMap,d.displacementMapTransform),d.displacementScale.value=f.displacementScale,d.displacementBias.value=f.displacementBias),f.emissiveMap&&(d.emissiveMap.value=f.emissiveMap,e(f.emissiveMap,d.emissiveMapTransform)),f.specularMap&&(d.specularMap.value=f.specularMap,e(f.specularMap,d.specularMapTransform)),f.alphaTest>0&&(d.alphaTest.value=f.alphaTest);const b=t.get(f),y=b.envMap,M=b.envMapRotation;y&&(d.envMap.value=y,ei.copy(M),ei.x*=-1,ei.y*=-1,ei.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(ei.y*=-1,ei.z*=-1),d.envMapRotation.value.setFromMatrix4(ng.makeRotationFromEuler(ei)),d.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,d.reflectivity.value=f.reflectivity,d.ior.value=f.ior,d.refractionRatio.value=f.refractionRatio),f.lightMap&&(d.lightMap.value=f.lightMap,d.lightMapIntensity.value=f.lightMapIntensity,e(f.lightMap,d.lightMapTransform)),f.aoMap&&(d.aoMap.value=f.aoMap,d.aoMapIntensity.value=f.aoMapIntensity,e(f.aoMap,d.aoMapTransform))}function o(d,f){d.diffuse.value.copy(f.color),d.opacity.value=f.opacity,f.map&&(d.map.value=f.map,e(f.map,d.mapTransform))}function a(d,f){d.dashSize.value=f.dashSize,d.totalSize.value=f.dashSize+f.gapSize,d.scale.value=f.scale}function c(d,f,b,y){d.diffuse.value.copy(f.color),d.opacity.value=f.opacity,d.size.value=f.size*b,d.scale.value=y*.5,f.map&&(d.map.value=f.map,e(f.map,d.uvTransform)),f.alphaMap&&(d.alphaMap.value=f.alphaMap,e(f.alphaMap,d.alphaMapTransform)),f.alphaTest>0&&(d.alphaTest.value=f.alphaTest)}function l(d,f){d.diffuse.value.copy(f.color),d.opacity.value=f.opacity,d.rotation.value=f.rotation,f.map&&(d.map.value=f.map,e(f.map,d.mapTransform)),f.alphaMap&&(d.alphaMap.value=f.alphaMap,e(f.alphaMap,d.alphaMapTransform)),f.alphaTest>0&&(d.alphaTest.value=f.alphaTest)}function u(d,f){d.specular.value.copy(f.specular),d.shininess.value=Math.max(f.shininess,1e-4)}function h(d,f){f.gradientMap&&(d.gradientMap.value=f.gradientMap)}function m(d,f){d.metalness.value=f.metalness,f.metalnessMap&&(d.metalnessMap.value=f.metalnessMap,e(f.metalnessMap,d.metalnessMapTransform)),d.roughness.value=f.roughness,f.roughnessMap&&(d.roughnessMap.value=f.roughnessMap,e(f.roughnessMap,d.roughnessMapTransform)),f.envMap&&(d.envMapIntensity.value=f.envMapIntensity)}function p(d,f,b){d.ior.value=f.ior,f.sheen>0&&(d.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),d.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(d.sheenColorMap.value=f.sheenColorMap,e(f.sheenColorMap,d.sheenColorMapTransform)),f.sheenRoughnessMap&&(d.sheenRoughnessMap.value=f.sheenRoughnessMap,e(f.sheenRoughnessMap,d.sheenRoughnessMapTransform))),f.clearcoat>0&&(d.clearcoat.value=f.clearcoat,d.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(d.clearcoatMap.value=f.clearcoatMap,e(f.clearcoatMap,d.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(d.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,e(f.clearcoatRoughnessMap,d.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(d.clearcoatNormalMap.value=f.clearcoatNormalMap,e(f.clearcoatNormalMap,d.clearcoatNormalMapTransform),d.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===ze&&d.clearcoatNormalScale.value.negate())),f.dispersion>0&&(d.dispersion.value=f.dispersion),f.iridescence>0&&(d.iridescence.value=f.iridescence,d.iridescenceIOR.value=f.iridescenceIOR,d.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],d.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(d.iridescenceMap.value=f.iridescenceMap,e(f.iridescenceMap,d.iridescenceMapTransform)),f.iridescenceThicknessMap&&(d.iridescenceThicknessMap.value=f.iridescenceThicknessMap,e(f.iridescenceThicknessMap,d.iridescenceThicknessMapTransform))),f.transmission>0&&(d.transmission.value=f.transmission,d.transmissionSamplerMap.value=b.texture,d.transmissionSamplerSize.value.set(b.width,b.height),f.transmissionMap&&(d.transmissionMap.value=f.transmissionMap,e(f.transmissionMap,d.transmissionMapTransform)),d.thickness.value=f.thickness,f.thicknessMap&&(d.thicknessMap.value=f.thicknessMap,e(f.thicknessMap,d.thicknessMapTransform)),d.attenuationDistance.value=f.attenuationDistance,d.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(d.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(d.anisotropyMap.value=f.anisotropyMap,e(f.anisotropyMap,d.anisotropyMapTransform))),d.specularIntensity.value=f.specularIntensity,d.specularColor.value.copy(f.specularColor),f.specularColorMap&&(d.specularColorMap.value=f.specularColorMap,e(f.specularColorMap,d.specularColorMapTransform)),f.specularIntensityMap&&(d.specularIntensityMap.value=f.specularIntensityMap,e(f.specularIntensityMap,d.specularIntensityMapTransform))}function g(d,f){f.matcap&&(d.matcap.value=f.matcap)}function _(d,f){const b=t.get(f).light;d.referencePosition.value.setFromMatrixPosition(b.matrixWorld),d.nearDistance.value=b.shadow.camera.near,d.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function rg(i,t,e,n){let r={},s={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(b,y){const M=y.program;n.uniformBlockBinding(b,M)}function l(b,y){let M=r[b.id];M===void 0&&(g(b),M=u(b),r[b.id]=M,b.addEventListener("dispose",d));const C=y.program;n.updateUBOMapping(b,C);const w=t.render.frame;s[b.id]!==w&&(m(b),s[b.id]=w)}function u(b){const y=h();b.__bindingPointIndex=y;const M=i.createBuffer(),C=b.__size,w=b.usage;return i.bindBuffer(i.UNIFORM_BUFFER,M),i.bufferData(i.UNIFORM_BUFFER,C,w),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,y,M),M}function h(){for(let b=0;b<a;b++)if(o.indexOf(b)===-1)return o.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function m(b){const y=r[b.id],M=b.uniforms,C=b.__cache;i.bindBuffer(i.UNIFORM_BUFFER,y);for(let w=0,P=M.length;w<P;w++){const I=Array.isArray(M[w])?M[w]:[M[w]];for(let E=0,T=I.length;E<T;E++){const D=I[E];if(p(D,w,E,C)===!0){const B=D.__offset,V=Array.isArray(D.value)?D.value:[D.value];let J=0;for(let Y=0;Y<V.length;Y++){const Z=V[Y],Q=_(Z);typeof Z=="number"||typeof Z=="boolean"?(D.__data[0]=Z,i.bufferSubData(i.UNIFORM_BUFFER,B+J,D.__data)):Z.isMatrix3?(D.__data[0]=Z.elements[0],D.__data[1]=Z.elements[1],D.__data[2]=Z.elements[2],D.__data[3]=0,D.__data[4]=Z.elements[3],D.__data[5]=Z.elements[4],D.__data[6]=Z.elements[5],D.__data[7]=0,D.__data[8]=Z.elements[6],D.__data[9]=Z.elements[7],D.__data[10]=Z.elements[8],D.__data[11]=0):(Z.toArray(D.__data,J),J+=Q.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,B,D.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(b,y,M,C){const w=b.value,P=y+"_"+M;if(C[P]===void 0)return typeof w=="number"||typeof w=="boolean"?C[P]=w:C[P]=w.clone(),!0;{const I=C[P];if(typeof w=="number"||typeof w=="boolean"){if(I!==w)return C[P]=w,!0}else if(I.equals(w)===!1)return I.copy(w),!0}return!1}function g(b){const y=b.uniforms;let M=0;const C=16;for(let P=0,I=y.length;P<I;P++){const E=Array.isArray(y[P])?y[P]:[y[P]];for(let T=0,D=E.length;T<D;T++){const B=E[T],V=Array.isArray(B.value)?B.value:[B.value];for(let J=0,Y=V.length;J<Y;J++){const Z=V[J],Q=_(Z),W=M%C,lt=W%Q.boundary,dt=W+lt;M+=lt,dt!==0&&C-dt<Q.storage&&(M+=C-dt),B.__data=new Float32Array(Q.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=M,M+=Q.storage}}}const w=M%C;return w>0&&(M+=C-w),b.__size=M,b.__cache={},this}function _(b){const y={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(y.boundary=4,y.storage=4):b.isVector2?(y.boundary=8,y.storage=8):b.isVector3||b.isColor?(y.boundary=16,y.storage=12):b.isVector4?(y.boundary=16,y.storage=16):b.isMatrix3?(y.boundary=48,y.storage=48):b.isMatrix4?(y.boundary=64,y.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),y}function d(b){const y=b.target;y.removeEventListener("dispose",d);const M=o.indexOf(y.__bindingPointIndex);o.splice(M,1),i.deleteBuffer(r[y.id]),delete r[y.id],delete s[y.id]}function f(){for(const b in r)i.deleteBuffer(r[b]);o=[],r={},s={}}return{bind:c,update:l,dispose:f}}class sg{constructor(t={}){const{canvas:e=lh(),context:n=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:m=!1}=t;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=o;const g=new Uint32Array(4),_=new Int32Array(4);let d=null,f=null;const b=[],y=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=qn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const M=this;let C=!1;this._outputColorSpace=Oe;let w=0,P=0,I=null,E=-1,T=null;const D=new ie,B=new ie;let V=null;const J=new Xt(0);let Y=0,Z=e.width,Q=e.height,W=1,lt=null,dt=null;const At=new ie(0,0,Z,Q),Wt=new ie(0,0,Z,Q);let se=!1;const le=new _a;let jt=!1,K=!1;const tt=new me,gt=new L,It=new ie,bt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Zt=!1;function Ce(){return I===null?W:1}let R=n;function ce(S,N){return e.getContext(S,N)}try{const S={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${oa}`),e.addEventListener("webglcontextlost",ot,!1),e.addEventListener("webglcontextrestored",mt,!1),e.addEventListener("webglcontextcreationerror",et,!1),R===null){const N="webgl2";if(R=ce(N,S),R===null)throw ce(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(S){throw console.error("THREE.WebGLRenderer: "+S.message),S}let Ft,Dt,xt,ue,Mt,zt,be,xe,A,v,O,q,j,X,Tt,st,St,yt,it,ht,Lt,Et,ct,Ot;function U(){Ft=new mm(R),Ft.init(),Et=new $0(R,Ft),Dt=new lm(R,Ft,t,Et),xt=new J0(R,Ft),Dt.reversedDepthBuffer&&m&&xt.buffers.depth.setReversed(!0),ue=new vm(R),Mt=new F0,zt=new K0(R,Ft,xt,Mt,Dt,Et,ue),be=new um(M),xe=new pm(M),A=new Tf(R),ct=new om(R,A),v=new gm(R,A,ue,ct),O=new Mm(R,v,A,ue),it=new xm(R,Dt,zt),st=new cm(Mt),q=new N0(M,be,xe,Ft,Dt,ct,st),j=new ig(M,Mt),X=new B0,Tt=new W0(Ft),yt=new sm(M,be,xe,xt,O,p,c),St=new Y0(M,O,Dt),Ot=new rg(R,ue,Dt,xt),ht=new am(R,Ft,ue),Lt=new _m(R,Ft,ue),ue.programs=q.programs,M.capabilities=Dt,M.extensions=Ft,M.properties=Mt,M.renderLists=X,M.shadowMap=St,M.state=xt,M.info=ue}U();const rt=new eg(M,R);this.xr=rt,this.getContext=function(){return R},this.getContextAttributes=function(){return R.getContextAttributes()},this.forceContextLoss=function(){const S=Ft.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=Ft.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return W},this.setPixelRatio=function(S){S!==void 0&&(W=S,this.setSize(Z,Q,!1))},this.getSize=function(S){return S.set(Z,Q)},this.setSize=function(S,N,z=!0){if(rt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Z=S,Q=N,e.width=Math.floor(S*W),e.height=Math.floor(N*W),z===!0&&(e.style.width=S+"px",e.style.height=N+"px"),this.setViewport(0,0,S,N)},this.getDrawingBufferSize=function(S){return S.set(Z*W,Q*W).floor()},this.setDrawingBufferSize=function(S,N,z){Z=S,Q=N,W=z,e.width=Math.floor(S*z),e.height=Math.floor(N*z),this.setViewport(0,0,S,N)},this.getCurrentViewport=function(S){return S.copy(D)},this.getViewport=function(S){return S.copy(At)},this.setViewport=function(S,N,z,k){S.isVector4?At.set(S.x,S.y,S.z,S.w):At.set(S,N,z,k),xt.viewport(D.copy(At).multiplyScalar(W).round())},this.getScissor=function(S){return S.copy(Wt)},this.setScissor=function(S,N,z,k){S.isVector4?Wt.set(S.x,S.y,S.z,S.w):Wt.set(S,N,z,k),xt.scissor(B.copy(Wt).multiplyScalar(W).round())},this.getScissorTest=function(){return se},this.setScissorTest=function(S){xt.setScissorTest(se=S)},this.setOpaqueSort=function(S){lt=S},this.setTransparentSort=function(S){dt=S},this.getClearColor=function(S){return S.copy(yt.getClearColor())},this.setClearColor=function(){yt.setClearColor(...arguments)},this.getClearAlpha=function(){return yt.getClearAlpha()},this.setClearAlpha=function(){yt.setClearAlpha(...arguments)},this.clear=function(S=!0,N=!0,z=!0){let k=0;if(S){let F=!1;if(I!==null){const nt=I.texture.format;F=nt===fa||nt===ha||nt===ua}if(F){const nt=I.texture.type,ut=nt===vn||nt===ui||nt===cr||nt===ur||nt===la||nt===ca,_t=yt.getClearColor(),pt=yt.getClearAlpha(),Pt=_t.r,Ut=_t.g,Rt=_t.b;ut?(g[0]=Pt,g[1]=Ut,g[2]=Rt,g[3]=pt,R.clearBufferuiv(R.COLOR,0,g)):(_[0]=Pt,_[1]=Ut,_[2]=Rt,_[3]=pt,R.clearBufferiv(R.COLOR,0,_))}else k|=R.COLOR_BUFFER_BIT}N&&(k|=R.DEPTH_BUFFER_BIT),z&&(k|=R.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),R.clear(k)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",ot,!1),e.removeEventListener("webglcontextrestored",mt,!1),e.removeEventListener("webglcontextcreationerror",et,!1),yt.dispose(),X.dispose(),Tt.dispose(),Mt.dispose(),be.dispose(),xe.dispose(),O.dispose(),ct.dispose(),Ot.dispose(),q.dispose(),rt.dispose(),rt.removeEventListener("sessionstart",dn),rt.removeEventListener("sessionend",Oa),Zn.stop()};function ot(S){S.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function mt(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;const S=ue.autoReset,N=St.enabled,z=St.autoUpdate,k=St.needsUpdate,F=St.type;U(),ue.autoReset=S,St.enabled=N,St.autoUpdate=z,St.needsUpdate=k,St.type=F}function et(S){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function $(S){const N=S.target;N.removeEventListener("dispose",$),vt(N)}function vt(S){Nt(S),Mt.remove(S)}function Nt(S){const N=Mt.get(S).programs;N!==void 0&&(N.forEach(function(z){q.releaseProgram(z)}),S.isShaderMaterial&&q.releaseShaderCache(S))}this.renderBufferDirect=function(S,N,z,k,F,nt){N===null&&(N=bt);const ut=F.isMesh&&F.matrixWorld.determinant()<0,_t=eu(S,N,z,k,F);xt.setMaterial(k,ut);let pt=z.index,Pt=1;if(k.wireframe===!0){if(pt=v.getWireframeAttribute(z),pt===void 0)return;Pt=2}const Ut=z.drawRange,Rt=z.attributes.position;let qt=Ut.start*Pt,ee=(Ut.start+Ut.count)*Pt;nt!==null&&(qt=Math.max(qt,nt.start*Pt),ee=Math.min(ee,(nt.start+nt.count)*Pt)),pt!==null?(qt=Math.max(qt,0),ee=Math.min(ee,pt.count)):Rt!=null&&(qt=Math.max(qt,0),ee=Math.min(ee,Rt.count));const ge=ee-qt;if(ge<0||ge===1/0)return;ct.setup(F,k,_t,z,pt);let ae,re=ht;if(pt!==null&&(ae=A.get(pt),re=Lt,re.setIndex(ae)),F.isMesh)k.wireframe===!0?(xt.setLineWidth(k.wireframeLinewidth*Ce()),re.setMode(R.LINES)):re.setMode(R.TRIANGLES);else if(F.isLine){let Ct=k.linewidth;Ct===void 0&&(Ct=1),xt.setLineWidth(Ct*Ce()),F.isLineSegments?re.setMode(R.LINES):F.isLineLoop?re.setMode(R.LINE_LOOP):re.setMode(R.LINE_STRIP)}else F.isPoints?re.setMode(R.POINTS):F.isSprite&&re.setMode(R.TRIANGLES);if(F.isBatchedMesh)if(F._multiDrawInstances!==null)pr("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),re.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances);else if(Ft.get("WEBGL_multi_draw"))re.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else{const Ct=F._multiDrawStarts,fe=F._multiDrawCounts,Kt=F._multiDrawCount,We=pt?A.get(pt).bytesPerElement:1,gi=Mt.get(k).currentProgram.getUniforms();for(let Xe=0;Xe<Kt;Xe++)gi.setValue(R,"_gl_DrawID",Xe),re.render(Ct[Xe]/We,fe[Xe])}else if(F.isInstancedMesh)re.renderInstances(qt,ge,F.count);else if(z.isInstancedBufferGeometry){const Ct=z._maxInstanceCount!==void 0?z._maxInstanceCount:1/0,fe=Math.min(z.instanceCount,Ct);re.renderInstances(qt,ge,fe)}else re.render(qt,ge)};function oe(S,N,z){S.transparent===!0&&S.side===Be&&S.forceSinglePass===!1?(S.side=ze,S.needsUpdate=!0,Tr(S,N,z),S.side=Yn,S.needsUpdate=!0,Tr(S,N,z),S.side=Be):Tr(S,N,z)}this.compile=function(S,N,z=null){z===null&&(z=S),f=Tt.get(z),f.init(N),y.push(f),z.traverseVisible(function(F){F.isLight&&F.layers.test(N.layers)&&(f.pushLight(F),F.castShadow&&f.pushShadow(F))}),S!==z&&S.traverseVisible(function(F){F.isLight&&F.layers.test(N.layers)&&(f.pushLight(F),F.castShadow&&f.pushShadow(F))}),f.setupLights();const k=new Set;return S.traverse(function(F){if(!(F.isMesh||F.isPoints||F.isLine||F.isSprite))return;const nt=F.material;if(nt)if(Array.isArray(nt))for(let ut=0;ut<nt.length;ut++){const _t=nt[ut];oe(_t,z,F),k.add(_t)}else oe(nt,z,F),k.add(nt)}),f=y.pop(),k},this.compileAsync=function(S,N,z=null){const k=this.compile(S,N,z);return new Promise(F=>{function nt(){if(k.forEach(function(ut){Mt.get(ut).currentProgram.isReady()&&k.delete(ut)}),k.size===0){F(S);return}setTimeout(nt,10)}Ft.get("KHR_parallel_shader_compile")!==null?nt():setTimeout(nt,10)})};let Qt=null;function Sn(S){Qt&&Qt(S)}function dn(){Zn.stop()}function Oa(){Zn.start()}const Zn=new Vc;Zn.setAnimationLoop(Sn),typeof self<"u"&&Zn.setContext(self),this.setAnimationLoop=function(S){Qt=S,rt.setAnimationLoop(S),S===null?Zn.stop():Zn.start()},rt.addEventListener("sessionstart",dn),rt.addEventListener("sessionend",Oa),this.render=function(S,N){if(N!==void 0&&N.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),rt.enabled===!0&&rt.isPresenting===!0&&(rt.cameraAutoUpdate===!0&&rt.updateCamera(N),N=rt.getCamera()),S.isScene===!0&&S.onBeforeRender(M,S,N,I),f=Tt.get(S,y.length),f.init(N),y.push(f),tt.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),le.setFromProjectionMatrix(tt,_n,N.reversedDepth),K=this.localClippingEnabled,jt=st.init(this.clippingPlanes,K),d=X.get(S,b.length),d.init(),b.push(d),rt.enabled===!0&&rt.isPresenting===!0){const nt=M.xr.getDepthSensingMesh();nt!==null&&Es(nt,N,-1/0,M.sortObjects)}Es(S,N,0,M.sortObjects),d.finish(),M.sortObjects===!0&&d.sort(lt,dt),Zt=rt.enabled===!1||rt.isPresenting===!1||rt.hasDepthSensing()===!1,Zt&&yt.addToRenderList(d,S),this.info.render.frame++,jt===!0&&st.beginShadows();const z=f.state.shadowsArray;St.render(z,S,N),jt===!0&&st.endShadows(),this.info.autoReset===!0&&this.info.reset();const k=d.opaque,F=d.transmissive;if(f.setupLights(),N.isArrayCamera){const nt=N.cameras;if(F.length>0)for(let ut=0,_t=nt.length;ut<_t;ut++){const pt=nt[ut];za(k,F,S,pt)}Zt&&yt.render(S);for(let ut=0,_t=nt.length;ut<_t;ut++){const pt=nt[ut];Ba(d,S,pt,pt.viewport)}}else F.length>0&&za(k,F,S,N),Zt&&yt.render(S),Ba(d,S,N);I!==null&&P===0&&(zt.updateMultisampleRenderTarget(I),zt.updateRenderTargetMipmap(I)),S.isScene===!0&&S.onAfterRender(M,S,N),ct.resetDefaultState(),E=-1,T=null,y.pop(),y.length>0?(f=y[y.length-1],jt===!0&&st.setGlobalState(M.clippingPlanes,f.state.camera)):f=null,b.pop(),b.length>0?d=b[b.length-1]:d=null};function Es(S,N,z,k){if(S.visible===!1)return;if(S.layers.test(N.layers)){if(S.isGroup)z=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(N);else if(S.isLight)f.pushLight(S),S.castShadow&&f.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||le.intersectsSprite(S)){k&&It.setFromMatrixPosition(S.matrixWorld).applyMatrix4(tt);const ut=O.update(S),_t=S.material;_t.visible&&d.push(S,ut,_t,z,It.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||le.intersectsObject(S))){const ut=O.update(S),_t=S.material;if(k&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),It.copy(S.boundingSphere.center)):(ut.boundingSphere===null&&ut.computeBoundingSphere(),It.copy(ut.boundingSphere.center)),It.applyMatrix4(S.matrixWorld).applyMatrix4(tt)),Array.isArray(_t)){const pt=ut.groups;for(let Pt=0,Ut=pt.length;Pt<Ut;Pt++){const Rt=pt[Pt],qt=_t[Rt.materialIndex];qt&&qt.visible&&d.push(S,ut,qt,z,It.z,Rt)}}else _t.visible&&d.push(S,ut,_t,z,It.z,null)}}const nt=S.children;for(let ut=0,_t=nt.length;ut<_t;ut++)Es(nt[ut],N,z,k)}function Ba(S,N,z,k){const F=S.opaque,nt=S.transmissive,ut=S.transparent;f.setupLightsView(z),jt===!0&&st.setGlobalState(M.clippingPlanes,z),k&&xt.viewport(D.copy(k)),F.length>0&&Er(F,N,z),nt.length>0&&Er(nt,N,z),ut.length>0&&Er(ut,N,z),xt.buffers.depth.setTest(!0),xt.buffers.depth.setMask(!0),xt.buffers.color.setMask(!0),xt.setPolygonOffset(!1)}function za(S,N,z,k){if((z.isScene===!0?z.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[k.id]===void 0&&(f.state.transmissionRenderTarget[k.id]=new hi(1,1,{generateMipmaps:!0,type:Ft.has("EXT_color_buffer_half_float")||Ft.has("EXT_color_buffer_float")?xr:vn,minFilter:ai,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:$t.workingColorSpace}));const nt=f.state.transmissionRenderTarget[k.id],ut=k.viewport||D;nt.setSize(ut.z*M.transmissionResolutionScale,ut.w*M.transmissionResolutionScale);const _t=M.getRenderTarget(),pt=M.getActiveCubeFace(),Pt=M.getActiveMipmapLevel();M.setRenderTarget(nt),M.getClearColor(J),Y=M.getClearAlpha(),Y<1&&M.setClearColor(16777215,.5),M.clear(),Zt&&yt.render(z);const Ut=M.toneMapping;M.toneMapping=qn;const Rt=k.viewport;if(k.viewport!==void 0&&(k.viewport=void 0),f.setupLightsView(k),jt===!0&&st.setGlobalState(M.clippingPlanes,k),Er(S,z,k),zt.updateMultisampleRenderTarget(nt),zt.updateRenderTargetMipmap(nt),Ft.has("WEBGL_multisampled_render_to_texture")===!1){let qt=!1;for(let ee=0,ge=N.length;ee<ge;ee++){const ae=N[ee],re=ae.object,Ct=ae.geometry,fe=ae.material,Kt=ae.group;if(fe.side===Be&&re.layers.test(k.layers)){const We=fe.side;fe.side=ze,fe.needsUpdate=!0,ka(re,z,k,Ct,fe,Kt),fe.side=We,fe.needsUpdate=!0,qt=!0}}qt===!0&&(zt.updateMultisampleRenderTarget(nt),zt.updateRenderTargetMipmap(nt))}M.setRenderTarget(_t,pt,Pt),M.setClearColor(J,Y),Rt!==void 0&&(k.viewport=Rt),M.toneMapping=Ut}function Er(S,N,z){const k=N.isScene===!0?N.overrideMaterial:null;for(let F=0,nt=S.length;F<nt;F++){const ut=S[F],_t=ut.object,pt=ut.geometry,Pt=ut.group;let Ut=ut.material;Ut.allowOverride===!0&&k!==null&&(Ut=k),_t.layers.test(z.layers)&&ka(_t,N,z,pt,Ut,Pt)}}function ka(S,N,z,k,F,nt){S.onBeforeRender(M,N,z,k,F,nt),S.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),F.onBeforeRender(M,N,z,k,S,nt),F.transparent===!0&&F.side===Be&&F.forceSinglePass===!1?(F.side=ze,F.needsUpdate=!0,M.renderBufferDirect(z,N,k,F,S,nt),F.side=Yn,F.needsUpdate=!0,M.renderBufferDirect(z,N,k,F,S,nt),F.side=Be):M.renderBufferDirect(z,N,k,F,S,nt),S.onAfterRender(M,N,z,k,F,nt)}function Tr(S,N,z){N.isScene!==!0&&(N=bt);const k=Mt.get(S),F=f.state.lights,nt=f.state.shadowsArray,ut=F.state.version,_t=q.getParameters(S,F.state,nt,N,z),pt=q.getProgramCacheKey(_t);let Pt=k.programs;k.environment=S.isMeshStandardMaterial?N.environment:null,k.fog=N.fog,k.envMap=(S.isMeshStandardMaterial?xe:be).get(S.envMap||k.environment),k.envMapRotation=k.environment!==null&&S.envMap===null?N.environmentRotation:S.envMapRotation,Pt===void 0&&(S.addEventListener("dispose",$),Pt=new Map,k.programs=Pt);let Ut=Pt.get(pt);if(Ut!==void 0){if(k.currentProgram===Ut&&k.lightsStateVersion===ut)return Ga(S,_t),Ut}else _t.uniforms=q.getUniforms(S),S.onBeforeCompile(_t,M),Ut=q.acquireProgram(_t,pt),Pt.set(pt,Ut),k.uniforms=_t.uniforms;const Rt=k.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Rt.clippingPlanes=st.uniform),Ga(S,_t),k.needsLights=iu(S),k.lightsStateVersion=ut,k.needsLights&&(Rt.ambientLightColor.value=F.state.ambient,Rt.lightProbe.value=F.state.probe,Rt.directionalLights.value=F.state.directional,Rt.directionalLightShadows.value=F.state.directionalShadow,Rt.spotLights.value=F.state.spot,Rt.spotLightShadows.value=F.state.spotShadow,Rt.rectAreaLights.value=F.state.rectArea,Rt.ltc_1.value=F.state.rectAreaLTC1,Rt.ltc_2.value=F.state.rectAreaLTC2,Rt.pointLights.value=F.state.point,Rt.pointLightShadows.value=F.state.pointShadow,Rt.hemisphereLights.value=F.state.hemi,Rt.directionalShadowMap.value=F.state.directionalShadowMap,Rt.directionalShadowMatrix.value=F.state.directionalShadowMatrix,Rt.spotShadowMap.value=F.state.spotShadowMap,Rt.spotLightMatrix.value=F.state.spotLightMatrix,Rt.spotLightMap.value=F.state.spotLightMap,Rt.pointShadowMap.value=F.state.pointShadowMap,Rt.pointShadowMatrix.value=F.state.pointShadowMatrix),k.currentProgram=Ut,k.uniformsList=null,Ut}function Ha(S){if(S.uniformsList===null){const N=S.currentProgram.getUniforms();S.uniformsList=es.seqWithValue(N.seq,S.uniforms)}return S.uniformsList}function Ga(S,N){const z=Mt.get(S);z.outputColorSpace=N.outputColorSpace,z.batching=N.batching,z.batchingColor=N.batchingColor,z.instancing=N.instancing,z.instancingColor=N.instancingColor,z.instancingMorph=N.instancingMorph,z.skinning=N.skinning,z.morphTargets=N.morphTargets,z.morphNormals=N.morphNormals,z.morphColors=N.morphColors,z.morphTargetsCount=N.morphTargetsCount,z.numClippingPlanes=N.numClippingPlanes,z.numIntersection=N.numClipIntersection,z.vertexAlphas=N.vertexAlphas,z.vertexTangents=N.vertexTangents,z.toneMapping=N.toneMapping}function eu(S,N,z,k,F){N.isScene!==!0&&(N=bt),zt.resetTextureUnits();const nt=N.fog,ut=k.isMeshStandardMaterial?N.environment:null,_t=I===null?M.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:ki,pt=(k.isMeshStandardMaterial?xe:be).get(k.envMap||ut),Pt=k.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,Ut=!!z.attributes.tangent&&(!!k.normalMap||k.anisotropy>0),Rt=!!z.morphAttributes.position,qt=!!z.morphAttributes.normal,ee=!!z.morphAttributes.color;let ge=qn;k.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(ge=M.toneMapping);const ae=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,re=ae!==void 0?ae.length:0,Ct=Mt.get(k),fe=f.state.lights;if(jt===!0&&(K===!0||S!==T)){const Ie=S===T&&k.id===E;st.setState(k,S,Ie)}let Kt=!1;k.version===Ct.__version?(Ct.needsLights&&Ct.lightsStateVersion!==fe.state.version||Ct.outputColorSpace!==_t||F.isBatchedMesh&&Ct.batching===!1||!F.isBatchedMesh&&Ct.batching===!0||F.isBatchedMesh&&Ct.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&Ct.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&Ct.instancing===!1||!F.isInstancedMesh&&Ct.instancing===!0||F.isSkinnedMesh&&Ct.skinning===!1||!F.isSkinnedMesh&&Ct.skinning===!0||F.isInstancedMesh&&Ct.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&Ct.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&Ct.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&Ct.instancingMorph===!1&&F.morphTexture!==null||Ct.envMap!==pt||k.fog===!0&&Ct.fog!==nt||Ct.numClippingPlanes!==void 0&&(Ct.numClippingPlanes!==st.numPlanes||Ct.numIntersection!==st.numIntersection)||Ct.vertexAlphas!==Pt||Ct.vertexTangents!==Ut||Ct.morphTargets!==Rt||Ct.morphNormals!==qt||Ct.morphColors!==ee||Ct.toneMapping!==ge||Ct.morphTargetsCount!==re)&&(Kt=!0):(Kt=!0,Ct.__version=k.version);let We=Ct.currentProgram;Kt===!0&&(We=Tr(k,N,F));let gi=!1,Xe=!1,Yi=!1;const de=We.getUniforms(),$e=Ct.uniforms;if(xt.useProgram(We.program)&&(gi=!0,Xe=!0,Yi=!0),k.id!==E&&(E=k.id,Xe=!0),gi||T!==S){xt.buffers.depth.getReversed()&&S.reversedDepth!==!0&&(S._reversedDepth=!0,S.updateProjectionMatrix()),de.setValue(R,"projectionMatrix",S.projectionMatrix),de.setValue(R,"viewMatrix",S.matrixWorldInverse);const Ge=de.map.cameraPosition;Ge!==void 0&&Ge.setValue(R,gt.setFromMatrixPosition(S.matrixWorld)),Dt.logarithmicDepthBuffer&&de.setValue(R,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial)&&de.setValue(R,"isOrthographic",S.isOrthographicCamera===!0),T!==S&&(T=S,Xe=!0,Yi=!0)}if(F.isSkinnedMesh){de.setOptional(R,F,"bindMatrix"),de.setOptional(R,F,"bindMatrixInverse");const Ie=F.skeleton;Ie&&(Ie.boneTexture===null&&Ie.computeBoneTexture(),de.setValue(R,"boneTexture",Ie.boneTexture,zt))}F.isBatchedMesh&&(de.setOptional(R,F,"batchingTexture"),de.setValue(R,"batchingTexture",F._matricesTexture,zt),de.setOptional(R,F,"batchingIdTexture"),de.setValue(R,"batchingIdTexture",F._indirectTexture,zt),de.setOptional(R,F,"batchingColorTexture"),F._colorsTexture!==null&&de.setValue(R,"batchingColorTexture",F._colorsTexture,zt));const je=z.morphAttributes;if((je.position!==void 0||je.normal!==void 0||je.color!==void 0)&&it.update(F,z,We),(Xe||Ct.receiveShadow!==F.receiveShadow)&&(Ct.receiveShadow=F.receiveShadow,de.setValue(R,"receiveShadow",F.receiveShadow)),k.isMeshGouraudMaterial&&k.envMap!==null&&($e.envMap.value=pt,$e.flipEnvMap.value=pt.isCubeTexture&&pt.isRenderTargetTexture===!1?-1:1),k.isMeshStandardMaterial&&k.envMap===null&&N.environment!==null&&($e.envMapIntensity.value=N.environmentIntensity),Xe&&(de.setValue(R,"toneMappingExposure",M.toneMappingExposure),Ct.needsLights&&nu($e,Yi),nt&&k.fog===!0&&j.refreshFogUniforms($e,nt),j.refreshMaterialUniforms($e,k,W,Q,f.state.transmissionRenderTarget[S.id]),es.upload(R,Ha(Ct),$e,zt)),k.isShaderMaterial&&k.uniformsNeedUpdate===!0&&(es.upload(R,Ha(Ct),$e,zt),k.uniformsNeedUpdate=!1),k.isSpriteMaterial&&de.setValue(R,"center",F.center),de.setValue(R,"modelViewMatrix",F.modelViewMatrix),de.setValue(R,"normalMatrix",F.normalMatrix),de.setValue(R,"modelMatrix",F.matrixWorld),k.isShaderMaterial||k.isRawShaderMaterial){const Ie=k.uniformsGroups;for(let Ge=0,Ts=Ie.length;Ge<Ts;Ge++){const Jn=Ie[Ge];Ot.update(Jn,We),Ot.bind(Jn,We)}}return We}function nu(S,N){S.ambientLightColor.needsUpdate=N,S.lightProbe.needsUpdate=N,S.directionalLights.needsUpdate=N,S.directionalLightShadows.needsUpdate=N,S.pointLights.needsUpdate=N,S.pointLightShadows.needsUpdate=N,S.spotLights.needsUpdate=N,S.spotLightShadows.needsUpdate=N,S.rectAreaLights.needsUpdate=N,S.hemisphereLights.needsUpdate=N}function iu(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return P},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(S,N,z){const k=Mt.get(S);k.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,k.__autoAllocateDepthBuffer===!1&&(k.__useRenderToTexture=!1),Mt.get(S.texture).__webglTexture=N,Mt.get(S.depthTexture).__webglTexture=k.__autoAllocateDepthBuffer?void 0:z,k.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,N){const z=Mt.get(S);z.__webglFramebuffer=N,z.__useDefaultFramebuffer=N===void 0};const ru=R.createFramebuffer();this.setRenderTarget=function(S,N=0,z=0){I=S,w=N,P=z;let k=!0,F=null,nt=!1,ut=!1;if(S){const pt=Mt.get(S);if(pt.__useDefaultFramebuffer!==void 0)xt.bindFramebuffer(R.FRAMEBUFFER,null),k=!1;else if(pt.__webglFramebuffer===void 0)zt.setupRenderTarget(S);else if(pt.__hasExternalTextures)zt.rebindTextures(S,Mt.get(S.texture).__webglTexture,Mt.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const Rt=S.depthTexture;if(pt.__boundDepthTexture!==Rt){if(Rt!==null&&Mt.has(Rt)&&(S.width!==Rt.image.width||S.height!==Rt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");zt.setupDepthRenderbuffer(S)}}const Pt=S.texture;(Pt.isData3DTexture||Pt.isDataArrayTexture||Pt.isCompressedArrayTexture)&&(ut=!0);const Ut=Mt.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Ut[N])?F=Ut[N][z]:F=Ut[N],nt=!0):S.samples>0&&zt.useMultisampledRTT(S)===!1?F=Mt.get(S).__webglMultisampledFramebuffer:Array.isArray(Ut)?F=Ut[z]:F=Ut,D.copy(S.viewport),B.copy(S.scissor),V=S.scissorTest}else D.copy(At).multiplyScalar(W).floor(),B.copy(Wt).multiplyScalar(W).floor(),V=se;if(z!==0&&(F=ru),xt.bindFramebuffer(R.FRAMEBUFFER,F)&&k&&xt.drawBuffers(S,F),xt.viewport(D),xt.scissor(B),xt.setScissorTest(V),nt){const pt=Mt.get(S.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_CUBE_MAP_POSITIVE_X+N,pt.__webglTexture,z)}else if(ut){const pt=N;for(let Pt=0;Pt<S.textures.length;Pt++){const Ut=Mt.get(S.textures[Pt]);R.framebufferTextureLayer(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0+Pt,Ut.__webglTexture,z,pt)}}else if(S!==null&&z!==0){const pt=Mt.get(S.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,pt.__webglTexture,z)}E=-1},this.readRenderTargetPixels=function(S,N,z,k,F,nt,ut,_t=0){if(!(S&&S.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let pt=Mt.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&ut!==void 0&&(pt=pt[ut]),pt){xt.bindFramebuffer(R.FRAMEBUFFER,pt);try{const Pt=S.textures[_t],Ut=Pt.format,Rt=Pt.type;if(!Dt.textureFormatReadable(Ut)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Dt.textureTypeReadable(Rt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=S.width-k&&z>=0&&z<=S.height-F&&(S.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+_t),R.readPixels(N,z,k,F,Et.convert(Ut),Et.convert(Rt),nt))}finally{const Pt=I!==null?Mt.get(I).__webglFramebuffer:null;xt.bindFramebuffer(R.FRAMEBUFFER,Pt)}}},this.readRenderTargetPixelsAsync=async function(S,N,z,k,F,nt,ut,_t=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let pt=Mt.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&ut!==void 0&&(pt=pt[ut]),pt)if(N>=0&&N<=S.width-k&&z>=0&&z<=S.height-F){xt.bindFramebuffer(R.FRAMEBUFFER,pt);const Pt=S.textures[_t],Ut=Pt.format,Rt=Pt.type;if(!Dt.textureFormatReadable(Ut))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Dt.textureTypeReadable(Rt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const qt=R.createBuffer();R.bindBuffer(R.PIXEL_PACK_BUFFER,qt),R.bufferData(R.PIXEL_PACK_BUFFER,nt.byteLength,R.STREAM_READ),S.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+_t),R.readPixels(N,z,k,F,Et.convert(Ut),Et.convert(Rt),0);const ee=I!==null?Mt.get(I).__webglFramebuffer:null;xt.bindFramebuffer(R.FRAMEBUFFER,ee);const ge=R.fenceSync(R.SYNC_GPU_COMMANDS_COMPLETE,0);return R.flush(),await ch(R,ge,4),R.bindBuffer(R.PIXEL_PACK_BUFFER,qt),R.getBufferSubData(R.PIXEL_PACK_BUFFER,0,nt),R.deleteBuffer(qt),R.deleteSync(ge),nt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,N=null,z=0){const k=Math.pow(2,-z),F=Math.floor(S.image.width*k),nt=Math.floor(S.image.height*k),ut=N!==null?N.x:0,_t=N!==null?N.y:0;zt.setTexture2D(S,0),R.copyTexSubImage2D(R.TEXTURE_2D,z,0,0,ut,_t,F,nt),xt.unbindTexture()};const su=R.createFramebuffer(),ou=R.createFramebuffer();this.copyTextureToTexture=function(S,N,z=null,k=null,F=0,nt=null){nt===null&&(F!==0?(pr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),nt=F,F=0):nt=0);let ut,_t,pt,Pt,Ut,Rt,qt,ee,ge;const ae=S.isCompressedTexture?S.mipmaps[nt]:S.image;if(z!==null)ut=z.max.x-z.min.x,_t=z.max.y-z.min.y,pt=z.isBox3?z.max.z-z.min.z:1,Pt=z.min.x,Ut=z.min.y,Rt=z.isBox3?z.min.z:0;else{const je=Math.pow(2,-F);ut=Math.floor(ae.width*je),_t=Math.floor(ae.height*je),S.isDataArrayTexture?pt=ae.depth:S.isData3DTexture?pt=Math.floor(ae.depth*je):pt=1,Pt=0,Ut=0,Rt=0}k!==null?(qt=k.x,ee=k.y,ge=k.z):(qt=0,ee=0,ge=0);const re=Et.convert(N.format),Ct=Et.convert(N.type);let fe;N.isData3DTexture?(zt.setTexture3D(N,0),fe=R.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(zt.setTexture2DArray(N,0),fe=R.TEXTURE_2D_ARRAY):(zt.setTexture2D(N,0),fe=R.TEXTURE_2D),R.pixelStorei(R.UNPACK_FLIP_Y_WEBGL,N.flipY),R.pixelStorei(R.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),R.pixelStorei(R.UNPACK_ALIGNMENT,N.unpackAlignment);const Kt=R.getParameter(R.UNPACK_ROW_LENGTH),We=R.getParameter(R.UNPACK_IMAGE_HEIGHT),gi=R.getParameter(R.UNPACK_SKIP_PIXELS),Xe=R.getParameter(R.UNPACK_SKIP_ROWS),Yi=R.getParameter(R.UNPACK_SKIP_IMAGES);R.pixelStorei(R.UNPACK_ROW_LENGTH,ae.width),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,ae.height),R.pixelStorei(R.UNPACK_SKIP_PIXELS,Pt),R.pixelStorei(R.UNPACK_SKIP_ROWS,Ut),R.pixelStorei(R.UNPACK_SKIP_IMAGES,Rt);const de=S.isDataArrayTexture||S.isData3DTexture,$e=N.isDataArrayTexture||N.isData3DTexture;if(S.isDepthTexture){const je=Mt.get(S),Ie=Mt.get(N),Ge=Mt.get(je.__renderTarget),Ts=Mt.get(Ie.__renderTarget);xt.bindFramebuffer(R.READ_FRAMEBUFFER,Ge.__webglFramebuffer),xt.bindFramebuffer(R.DRAW_FRAMEBUFFER,Ts.__webglFramebuffer);for(let Jn=0;Jn<pt;Jn++)de&&(R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,Mt.get(S).__webglTexture,F,Rt+Jn),R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,Mt.get(N).__webglTexture,nt,ge+Jn)),R.blitFramebuffer(Pt,Ut,ut,_t,qt,ee,ut,_t,R.DEPTH_BUFFER_BIT,R.NEAREST);xt.bindFramebuffer(R.READ_FRAMEBUFFER,null),xt.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else if(F!==0||S.isRenderTargetTexture||Mt.has(S)){const je=Mt.get(S),Ie=Mt.get(N);xt.bindFramebuffer(R.READ_FRAMEBUFFER,su),xt.bindFramebuffer(R.DRAW_FRAMEBUFFER,ou);for(let Ge=0;Ge<pt;Ge++)de?R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,je.__webglTexture,F,Rt+Ge):R.framebufferTexture2D(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,je.__webglTexture,F),$e?R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,Ie.__webglTexture,nt,ge+Ge):R.framebufferTexture2D(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,Ie.__webglTexture,nt),F!==0?R.blitFramebuffer(Pt,Ut,ut,_t,qt,ee,ut,_t,R.COLOR_BUFFER_BIT,R.NEAREST):$e?R.copyTexSubImage3D(fe,nt,qt,ee,ge+Ge,Pt,Ut,ut,_t):R.copyTexSubImage2D(fe,nt,qt,ee,Pt,Ut,ut,_t);xt.bindFramebuffer(R.READ_FRAMEBUFFER,null),xt.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else $e?S.isDataTexture||S.isData3DTexture?R.texSubImage3D(fe,nt,qt,ee,ge,ut,_t,pt,re,Ct,ae.data):N.isCompressedArrayTexture?R.compressedTexSubImage3D(fe,nt,qt,ee,ge,ut,_t,pt,re,ae.data):R.texSubImage3D(fe,nt,qt,ee,ge,ut,_t,pt,re,Ct,ae):S.isDataTexture?R.texSubImage2D(R.TEXTURE_2D,nt,qt,ee,ut,_t,re,Ct,ae.data):S.isCompressedTexture?R.compressedTexSubImage2D(R.TEXTURE_2D,nt,qt,ee,ae.width,ae.height,re,ae.data):R.texSubImage2D(R.TEXTURE_2D,nt,qt,ee,ut,_t,re,Ct,ae);R.pixelStorei(R.UNPACK_ROW_LENGTH,Kt),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,We),R.pixelStorei(R.UNPACK_SKIP_PIXELS,gi),R.pixelStorei(R.UNPACK_SKIP_ROWS,Xe),R.pixelStorei(R.UNPACK_SKIP_IMAGES,Yi),nt===0&&N.generateMipmaps&&R.generateMipmap(fe),xt.unbindTexture()},this.initRenderTarget=function(S){Mt.get(S).__webglFramebuffer===void 0&&zt.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?zt.setTextureCube(S,0):S.isData3DTexture?zt.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?zt.setTexture2DArray(S,0):zt.setTexture2D(S,0),xt.unbindTexture()},this.resetState=function(){w=0,P=0,I=null,xt.reset(),ct.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return _n}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=$t._getDrawingBufferColorSpace(t),e.unpackColorSpace=$t._getUnpackColorSpace()}}const Qi=new L;function tn(i,t,e,n,r,s){const o=2*Math.PI*r/4,a=Math.max(s-2*r,0),c=Math.PI/4;Qi.copy(t),Qi[n]=0,Qi.normalize();const l=.5*o/(o+a),u=1-Qi.angleTo(i)/c;return Math.sign(Qi[e])===1?u*l:a/(o+a)+l+l*(1-u)}class Ra extends mi{constructor(t=1,e=1,n=1,r=2,s=.1){const o=r*2+1;if(s=Math.min(t/2,e/2,n/2,s),super(1,1,1,o,o,o),this.type="RoundedBoxGeometry",this.parameters={width:t,height:e,depth:n,segments:r,radius:s},o===1)return;const a=this.toNonIndexed();this.index=null,this.attributes.position=a.attributes.position,this.attributes.normal=a.attributes.normal,this.attributes.uv=a.attributes.uv;const c=new L,l=new L,u=new L(t,e,n).divideScalar(2).subScalar(s),h=this.attributes.position.array,m=this.attributes.normal.array,p=this.attributes.uv.array,g=h.length/6,_=new L,d=.5/o;for(let f=0,b=0;f<h.length;f+=3,b+=2)switch(c.fromArray(h,f),l.copy(c),l.x-=Math.sign(l.x)*d,l.y-=Math.sign(l.y)*d,l.z-=Math.sign(l.z)*d,l.normalize(),h[f+0]=u.x*Math.sign(c.x)+l.x*s,h[f+1]=u.y*Math.sign(c.y)+l.y*s,h[f+2]=u.z*Math.sign(c.z)+l.z*s,m[f+0]=l.x,m[f+1]=l.y,m[f+2]=l.z,Math.floor(f/g)){case 0:_.set(1,0,0),p[b+0]=tn(_,l,"z","y",s,n),p[b+1]=1-tn(_,l,"y","z",s,e);break;case 1:_.set(-1,0,0),p[b+0]=1-tn(_,l,"z","y",s,n),p[b+1]=1-tn(_,l,"y","z",s,e);break;case 2:_.set(0,1,0),p[b+0]=1-tn(_,l,"x","z",s,t),p[b+1]=tn(_,l,"z","x",s,n);break;case 3:_.set(0,-1,0),p[b+0]=1-tn(_,l,"x","z",s,t),p[b+1]=1-tn(_,l,"z","x",s,n);break;case 4:_.set(0,0,1),p[b+0]=1-tn(_,l,"x","y",s,t),p[b+1]=1-tn(_,l,"y","x",s,e);break;case 5:_.set(0,0,-1),p[b+0]=tn(_,l,"x","y",s,t),p[b+1]=1-tn(_,l,"y","x",s,e);break}}static fromJSON(t){return new Ra(t.width,t.height,t.depth,t.segments,t.radius)}}function og(i,t=!1){const e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),r=new Set(Object.keys(i[0].morphAttributes)),s={},o={},a=i[0].morphTargetsRelative,c=new Ue;let l=0;for(let u=0;u<i.length;++u){const h=i[u];let m=0;if(e!==(h.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const p in h.attributes){if(!n.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+p+'" attribute exists among all geometries, or in none of them.'),null;s[p]===void 0&&(s[p]=[]),s[p].push(h.attributes[p]),m++}if(m!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(a!==h.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const p in h.morphAttributes){if(!r.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;o[p]===void 0&&(o[p]=[]),o[p].push(h.morphAttributes[p])}if(t){let p;if(e)p=h.index.count;else if(h.attributes.position!==void 0)p=h.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,p,u),l+=p}}if(e){let u=0;const h=[];for(let m=0;m<i.length;++m){const p=i[m].index;for(let g=0;g<p.count;++g)h.push(p.getX(g)+u);u+=i[m].attributes.position.count}c.setIndex(h)}for(const u in s){const h=Yl(s[u]);if(!h)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;c.setAttribute(u,h)}for(const u in o){const h=o[u][0].length;if(h===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[u]=[];for(let m=0;m<h;++m){const p=[];for(let _=0;_<o[u].length;++_)p.push(o[u][_][m]);const g=Yl(p);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;c.morphAttributes[u].push(g)}}return c}function Yl(i){let t,e,n,r=-1,s=0;for(let l=0;l<i.length;++l){const u=i[l];if(t===void 0&&(t=u.array.constructor),t!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=u.itemSize),e!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=u.normalized),n!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(r===-1&&(r=u.gpuType),r!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;s+=u.count*e}const o=new t(s),a=new fn(o,e,n);let c=0;for(let l=0;l<i.length;++l){const u=i[l];if(u.isInterleavedBufferAttribute){const h=c/e;for(let m=0,p=u.count;m<p;m++)for(let g=0;g<e;g++){const _=u.getComponent(m,g);a.setComponent(m+h,g,_)}}else o.set(u.array,c);c+=u.count*e}return r!==void 0&&(a.gpuType=r),a}function Zc(i=19){let t=i;return()=>(t=Math.imul(t,1664525)+1013904223|0,(t>>>0)/4294967296)}const Gt=Zc(442);function Nn(i,t){const e=document.createElement("canvas");e.width=e.height=i,t(e.getContext("2d"),i);const n=new va(e);return n.colorSpace=Oe,n.wrapS=n.wrapT=is,n.anisotropy=4,n}function Fn(i,t,e,n,r=.15){i.globalAlpha=r;for(let s=0;s<e;s++){i.fillStyle=n[Math.floor(Gt()*n.length)];const o=1+Gt()*2;i.fillRect(Gt()*t,Gt()*t,o,o)}i.globalAlpha=1}function ag(){return Nn(512,(i,t)=>{i.fillStyle="#927354",i.fillRect(0,0,t,t);for(let e=0;e<360;e++){const n=Gt()*t,r=.025+Gt()*.11;i.strokeStyle=Gt()>.5?`rgba(35,17,8,${r})`:`rgba(236,196,127,${r})`,i.lineWidth=.3+Gt()*2.8,i.beginPath(),i.moveTo(n,0);for(let s=0;s<=t;s+=16)i.lineTo(n+Math.sin(s*.015+n)*3+Math.sin(s*.045+n)*1.5,s);i.stroke()}for(let e=0;e<5;e++){const n=Gt()*t,r=Gt()*t;for(let s=1;s<10;s++)i.strokeStyle=`rgba(48,28,17,${.22-s*.018})`,i.lineWidth=1,i.beginPath(),i.ellipse(n,r,1+s*1.8,5+s*5,.08,0,Math.PI*2),i.stroke()}for(let e=0;e<60;e++)i.fillStyle=`rgba(240,218,162,${Gt()*.15})`,i.fillRect(Gt()*t,Gt()*t,.6+Gt(),8+Gt()*65);Fn(i,t,2e4,["#f4ddab","#392b20"],.13)})}function lg(){return Nn(512,(i,t)=>{i.fillStyle="#d5c6ab",i.fillRect(0,0,t,t);for(let e=0;e<350;e++){const n=Gt()*t,r=Gt()*t,s=6+Gt()*48,o=i.createRadialGradient(n,r,0,n,r,s);o.addColorStop(0,Gt()>.5?"#fff8df15":"#4a463110"),o.addColorStop(1,"transparent"),i.fillStyle=o,i.fillRect(n-s,r-s,s*2,s*2)}Fn(i,t,35e3,["#594b39","#fff3d5","#8c856e"],.1),i.strokeStyle="#756c5426",i.lineWidth=.75,i.beginPath(),i.moveTo(190,0),i.lineTo(194,31),i.lineTo(186,45),i.lineTo(190,79),i.lineTo(180,91),i.lineTo(177,123),i.stroke()})}function cg(){return Nn(256,(i,t)=>{i.fillStyle="#b1a68e",i.fillRect(0,0,t,t);for(let e=0;e<t;e+=3)i.fillStyle=e%6?"#e8dfc13a":"#251f1845",i.fillRect(e,0,1,t),i.fillRect(0,e,t,1);for(let e=0;e<t;e+=12)for(let n=0;n<t;n+=12)i.strokeStyle="#fff8dc23",i.lineWidth=1,i.beginPath(),i.moveTo(n,e),i.lineTo(n+6,e+6),i.lineTo(n+12,e),i.stroke();Fn(i,t,9e3,["#1d1b18","#ffffed"],.15)})}function ug(){return Nn(512,(i,t)=>{i.fillStyle="#ac9275",i.fillRect(0,0,t,t),Fn(i,t,45e3,["#2d1d13","#ffdaa8","#68432d"],.2);for(let e=0;e<1300;e++){const n=Gt()*t,r=Gt()*t;i.strokeStyle="#33241c18",i.lineWidth=.7,i.beginPath(),i.moveTo(n,r),i.lineTo(n+2+Gt()*5,r-1+Gt()*4),i.stroke()}for(let e=0;e<90;e++){i.strokeStyle="#ebd0a129",i.lineWidth=.3+Gt(),i.beginPath();const n=Gt()*t,r=Gt()*t;i.moveTo(n,r),i.lineTo(n+Gt()*14,r+Gt()*5),i.stroke()}})}function hg(){return Nn(256,(i,t)=>{i.fillStyle="#c0b99a",i.fillRect(0,0,t,t),Fn(i,t,16e3,["#243d33","#404638","#e9d694"],.3);for(let e=0;e<100;e++)i.fillStyle="#193d2f11",i.beginPath(),i.arc(Gt()*t,Gt()*t,2+Gt()*12,0,Math.PI*2),i.fill()})}function fg(){return Nn(1024,(i,t)=>{i.fillStyle="#7e392d",i.fillRect(0,0,t,t);const e=[[22,"#c29b58"],[39,"#343f3b"],[75,"#b59b67"],[82,"#543b2d"],[101,"#4b6861"],[143,"#d0ac67"],[150,"#405b55"]];for(const[s,o]of e)i.fillStyle=o,i.fillRect(s,s,t-s*2,t-s*2);const n=(s,o,a,c)=>{i.fillStyle=c,i.beginPath(),i.moveTo(s,o-a),i.lineTo(s+a,o),i.lineTo(s,o+a),i.lineTo(s-a,o),i.closePath(),i.fill()};n(512,512,290,"#b2925d"),n(512,512,270,"#643e32"),n(512,512,240,"#d1b37b"),n(512,512,216,"#365048"),n(512,512,95,"#b49863"),n(512,512,66,"#854936");for(let s=0;s<8;s++){const o=s*Math.PI/4;i.save(),i.translate(512,512),i.rotate(o),i.fillStyle="#c4a477",i.beginPath(),i.moveTo(-14,-118),i.lineTo(0,-202),i.lineTo(14,-118),i.lineTo(0,-142),i.fill(),i.restore()}for(let s=180;s<880;s+=83)n(s,119,18,"#ae8c54"),n(s,905,18,"#ae8c54"),n(119,s,18,"#ae8c54"),n(905,s,18,"#ae8c54");for(let s=0;s<1024;s+=3)i.fillStyle=s%6?"#ebd8af1a":"#0d191e1a",i.fillRect(s,0,1,t),i.fillRect(0,s,t,1);Fn(i,t,65e3,["#d7c395","#26352f"],.18);const r=i.createRadialGradient(500,610,100,500,610,650);r.addColorStop(0,"#d4c6a823"),r.addColorStop(1,"transparent"),i.fillStyle=r,i.fillRect(0,0,t,t)})}function dg(){return Nn(512,(i,t)=>{i.fillStyle="#536260",i.fillRect(0,0,t,t);for(let e=0;e<9;e++)i.fillStyle=e%2?"#2e464621":"#a5ac8c26",i.fillRect(e*60,0,57,t),i.fillStyle="#112e322c",i.fillRect(e*60,0,2,t);i.save(),i.translate(256,250),i.fillStyle="#cfb77b";for(let e=0;e<8;e++)i.save(),i.rotate(e*Math.PI/4),i.beginPath(),i.moveTo(0,-160),i.lineTo(16,-31),i.lineTo(0,-8),i.lineTo(-16,-31),i.closePath(),i.fill(),i.restore();i.strokeStyle="#cdb477",i.lineWidth=8,i.beginPath(),i.arc(0,0,90,0,Math.PI*2),i.stroke(),i.restore(),Fn(i,t,4e4,["#c4bea0","#384b46","#182b2a"],.28);for(let e=0;e<55;e++){i.strokeStyle="#bead7955",i.lineWidth=.5+Gt()*2;const n=Gt()*t,r=Gt()*t;i.beginPath(),i.moveTo(n,r),i.lineTo(n+10+Gt()*65,r+8+Gt()*13),i.stroke()}i.strokeStyle="#b6a27655",i.lineWidth=3,i.beginPath(),i.arc(140,290,39,0,Math.PI*2),i.stroke()})}function Zl(i=!1){return Nn(512,(t,e)=>{if(t.fillStyle="#d8c290",t.fillRect(0,0,e,e),Fn(t,e,18e3,["#765a33","#fff1c5"],.11),i){t.strokeStyle="#6f765c",t.lineWidth=3,t.beginPath(),t.moveTo(90,0);for(let n=0;n<530;n+=15)t.lineTo(200+Math.sin(n*.018)*100+Math.cos(n*.047)*18,n);t.stroke();for(let n=0;n<35;n++){const r=250+Gt()*210,s=20+Gt()*450;t.strokeStyle="#6a624d88",t.lineWidth=1,t.beginPath(),t.moveTo(r-13,s+12),t.lineTo(r,s-10),t.lineTo(r+14,s+12),t.stroke()}t.setLineDash([3,6]),t.strokeStyle="#9e4636",t.beginPath(),t.moveTo(100,480),t.bezierCurveTo(90,270,350,400,350,110),t.stroke(),t.setLineDash([]);for(const[n,r]of[[108,434],[162,351],[271,326],[319,190],[351,104]])t.strokeStyle="#734739",t.beginPath(),t.arc(n,r,5,0,Math.PI*2),t.stroke();t.fillStyle="#64563d",t.font="italic 21px Georgia",t.fillText("The Old North Road",30,40),t.font="12px Georgia",t.fillText("home",78,471),t.strokeStyle="#8f764e60",t.strokeRect(13,13,486,486)}else{t.strokeStyle="#72614650";for(let n=50;n<450;n+=26)t.beginPath(),t.moveTo(32,n),t.bezierCurveTo(100,n-6,180,n+4,260+Gt()*170,n),t.stroke()}})}function Jl(i=0){return Nn(256,(t,e)=>{const n=t.createLinearGradient(0,0,e,e);n.addColorStop(0,i?"#656850":"#546c67"),n.addColorStop(1,"#293a36"),t.fillStyle=n,t.fillRect(0,0,e,e),t.fillStyle=i?"#b29b73":"#979d91",t.beginPath(),t.arc(70,70,40,0,Math.PI*2),t.fill(),t.fillStyle=i?"#474b35":"#546863",t.beginPath(),t.moveTo(0,230),t.lineTo(54,132),t.lineTo(93,156),t.lineTo(176,85),t.lineTo(256,182),t.lineTo(256,256),t.lineTo(0,256),t.fill();const r=(s,o,a,c,l)=>{t.fillStyle=c,t.beginPath(),t.ellipse(s,o+66,34,61,0,0,Math.PI*2),t.fill(),t.fillStyle=a,t.beginPath(),t.ellipse(s,o+5,18,25,-.08,0,Math.PI*2),t.fill(),t.fillStyle=l,t.beginPath(),t.ellipse(s-3,o-11,22,13,-.13,0,Math.PI*2),t.fill(),t.fillRect(s-23,o-10,46,5),t.fillStyle="#463a28",t.fillRect(s+4,o+4,2,2)};i===0?(r(79,124,"#bb9974","#683f34","#494639"),r(137,114,"#b59c7a","#6b7054","#aaa183"),r(188,141,"#9c7254","#665138","#403c30")):(r(126,94,"#c2a27b","#8d5840","#695c44"),t.strokeStyle="#c7b680",t.lineWidth=6,t.beginPath(),t.moveTo(98,135),t.lineTo(158,175),t.stroke()),Fn(t,e,12e3,["#e9d5a8","#302d23"],.1),t.fillStyle="#d9c69e",t.fillRect(12,225,232,20),t.fillStyle="#514b3a",t.font="italic 10px Georgia",t.textAlign="center",t.fillText(i?"Mara, before the orchard":"One last crossing · 1187",128,239)})}function pg(){const i=ag(),t=lg(),e=cg(),n=ug(),r=hg(),s=(a,c={})=>new as({color:a,roughness:.85,...c}),o=(a,c,l,u=.02,h={})=>s(a,{map:c,bumpMap:c,bumpScale:u,roughness:l,...h});return{timber:o("#524033",i,.84,.035),edgeWood:o("#8b6947",i,.75,.022),oak:o("#b99462",i,.72,.024),floor:o("#b99a70",i,.87,.025),floorDark:o("#a88964",i,.88,.025),plaster:o("#eee1c6",t,.99,.035),patch:o("#e0cfaa",t,1,.02),sagePlaster:o("#83958a",t,.95,.02),leather:o("#915b32",n,.72,.027),leatherDark:o("#64442b",n,.85,.018),leatherEdge:o("#b3844e",n,.8,.018),wool:o("#aaa485",e,.98,.045),tealWool:o("#597b75",e,.97,.05),rustWool:o("#a35f43",e,.98,.045),cream:o("#eae2c3",e,.97,.036),darkCloth:o("#444f3c",e,.98,.036),brass:o("#b99d5b",r,.53,.007,{metalness:.7}),iron:o("#555750",r,.73,.01,{metalness:.65}),steel:o("#93978e",r,.48,.005,{metalness:.75}),copper:o("#af7047",r,.47,.01,{metalness:.7}),rug:s("#ffffff",{map:fg(),roughness:1,bumpMap:e,bumpScale:.024}),shield:s("#ffffff",{map:dg(),roughness:.75,bumpMap:i,bumpScale:.012}),paper:s("#e5d4aa",{map:Zl(),roughness:1}),map:s("#ffffff",{map:Zl(!0),roughness:1}),envelope:s("#dfd1ae"),wax:s("#833f30",{roughness:.54}),ceramic:s("#a8b4a0",{roughness:.31}),creamCeramic:s("#e5d8b7",{roughness:.37}),blueCeramic:s("#496c74",{roughness:.33}),terracotta:o("#b86e49",t,.92,.018),soil:s("#352f23"),leaf:s("#64774a",{roughness:.94,side:Be}),leafLight:s("#81905a",{roughness:.96,side:Be}),stem:s("#535c36"),lavender:s("#8d7c98"),stone:o("#7c7d6b",t,.98,.06),hearth:o("#56554b",t,.94,.06),brick:o("#885b43",t,.99,.04),black:s("#25271f"),coal:s("#34352b"),flame:new mr({color:"#ffd082"}),ember:new mr({color:"#d86d30"}),lamp:new as({color:"#ffdda3",emissive:"#ffd090",emissiveIntensity:1.8,roughness:.5}),glass:s("#adc5bd",{transparent:!0,opacity:.2,roughness:.12,metalness:.1,depthWrite:!1}),tea:s("#514129",{roughness:.15}),bookRed:o("#8b5141",n,.85,.008),bookGreen:o("#596851",n,.85,.008),bookBlue:o("#4f6467",n,.85,.008),bookOchre:o("#b09156",n,.85,.008),bookPages:s("#cbbb93")}}const Ca=1.64,mg=.2,Wn={x:-2.63,z:2.86,yaw:-.66,pitch:-.1},gg=[{x0:-4,x1:3.5,z0:-3.5,z1:3.8,name:"living"},{x0:3.5,x1:6.2,z0:-3.5,z1:1.2,name:"study"},{x0:-.5,x1:6.2,z0:-5.1,z1:-3.5,name:"balcony"}],Pa=[];function ye(i,t,e,n,r=0,s="furniture"){Pa.push({x:i,z:t,hx:e/2,hz:n/2,angle:r,label:s})}function Kl(i,t){return gg.some(e=>i>=e.x0&&i<=e.x1&&t>=e.z0&&t<=e.z1)}function $l(i,t,e=mg){if(!Kl(i,t))return!1;for(let n=0;n<12;n++){const r=n*Math.PI/6;if(!Kl(i+Math.cos(r)*e,t+Math.sin(r)*e))return!1}for(const n of Pa){const r=Math.cos(n.angle),s=Math.sin(n.angle),o=i-n.x,a=t-n.z,c=r*o-s*a,l=s*o+r*a,u=Math.max(Math.abs(c)-n.hx,0),h=Math.max(Math.abs(l)-n.hz,0);if(u*u+h*h<e*e-1e-9)return!1}return!0}function _g(i,t,e){const n=Math.max(1,Math.ceil(Math.hypot(t,e)/.065));for(let r=0;r<n;r++)$l(i.x+t/n,i.z)&&(i.x+=t/n),$l(i.x,i.z+e/n)&&(i.z+=e/n)}function vg(i,t){return t<-3.48?"balcony":i>3.52?"study":"living"}function xg(){Pa.length=0;const i=(t,e,n,r,s)=>ye(t,e,n,r,0,s);i(-4,.15,.18,7.3,"west wall"),i(-.25,3.8,7.5,.18,"entrance wall"),i(-1.975,-3.5,4.05,.18,"north wall west"),i(1.725,-3.5,.35,.18,"balcony door jamb"),i(2.5,-3.5,1.2,.18,"window sill wall"),i(3.3,-3.5,.4,.18,"north wall east"),i(3.5,-2.075,.18,2.85,"study partition north"),i(3.5,2.475,.18,2.65,"study partition south"),i(6.2,-1.15,.18,4.7,"study east"),i(4.85,1.2,2.7,.18,"study south"),i(3.825,-3.5,.65,.18,"study north west"),i(5.875,-3.5,.65,.18,"study north east"),i(2.85,-5.1,6.7,.15,"balcony rail"),i(-.5,-4.3,.14,1.6,"balcony west rail"),i(6.2,-4.3,.14,1.6,"balcony east rail"),ye(.025+.36*Math.cos(-Math.PI*.4),-3.43-.36*Math.sin(-Math.PI*.4),.72,.1,-Math.PI*.4,"open balcony door"),ye(-2.6,-1.95,1.78,2.45,0,"bed"),ye(-3.46,-.29,.65,.59,0,"bedside chest"),ye(-1.72,.56,.92,.98,-Math.PI/2+.12,"reading chair"),ye(.2,2.64,2.04,.91,0,"settle"),ye(-.02,.47,1.24,1.24,0,"shield tea table"),ye(1.67,1.65,.6,.55,.15,"footstool"),ye(3.12,2.47,.71,1.91,0,"hearth"),ye(-3.6,1.67,.55,1.05,0,"entry cupboard"),ye(-3.6,.9,.33,.33,0,"walking stick stand"),ye(2.85,-2.56,.9,.6,0,"blanket chest"),ye(5.7,-1.54,.82,1.97,0,"study desk"),ye(4.71,-1.37,.48,.5,-Math.PI/2,"desk chair"),ye(4.93,.89,2.04,.43,0,"storage shelves"),ye(3.79,-2.25,.39,1.39,0,"map cabinet"),ye(5.91,-4.22,.49,1.1,0,"balcony bench"),ye(-.2,-4.77,.43,.4,0,"rosemary pot"),ye(1.9,-4.84,.46,.35,0,"lavender pot")}const Ht=Math.PI,en=Zc(179);let Yt,x,La,Da,di,lr;const G=(i,t,e)=>new L(i,t,e);function vs(i,t){return lr.has(i)||lr.set(i,t()),lr.get(i)}function ve(i,t,e=0,n=0,r=0,s=0,o=0,a=0,c=Yt){const l=new nn(i,t);return l.position.set(e,n,r),l.rotation.set(s,o,a),l.castShadow=!0,l.receiveShadow=!0,c.add(l),(t.transparent?Da:La).push(l),l}function H(i,t,e,n,r,s,o=x.timber,a=0,c=Yt,l=0){const u=[x.timber,x.edgeWood,x.oak,x.floor,x.floorDark].includes(o),h=`b:${n}:${r}:${s}:${l}:${u}`,m=vs(h,()=>{const p=l?new Ra(n,r,s,2,l):new mi(n,r,s);if(u){const g=[n,r,s],_=g.indexOf(Math.max(...g)),d=p.attributes.position,f=p.attributes.normal,b=p.attributes.uv;for(let y=0;y<d.count;y++){const M=[d.getX(y),d.getY(y),d.getZ(y)],C=[Math.abs(f.getX(y)),Math.abs(f.getY(y)),Math.abs(f.getZ(y))],w=C.indexOf(Math.max(...C)),P=w===_?(_+1)%3:_,I=[0,1,2].find(E=>E!==w&&E!==P);b.setXY(y,M[I]/g[I]+.5,M[P]/g[P]+.5)}}return p});return ve(m,o,i,t,e,0,a,0,c)}function he(i,t,e,n,r,s,o=x.brass,a=16,c=Yt){return ve(vs(`c:${n}:${r}:${s}:${a}`,()=>new Ma(n,r,s,a)),o,i,t,e,0,0,0,c)}function Jt(i,t,e,n,r,s,o,a=Yt){const c=ve(vs("sphere",()=>new ps(1,16,10)),o,i,t,e,0,0,0,a);return c.scale.set(n,r,s),c}function we(i,t,e,n,r,s=x.brass,o=Ht/2,a=0,c=Yt){return ve(vs(`t:${n}:${r}`,()=>new ms(n,r,6,32)),s,i,t,e,o,a,0,c)}function wt(i,t,e,n=x.timber,r=Yt,s=e){const o=new L().subVectors(t,i),a=he(0,0,0,s,e,o.length(),n,10,r);return a.position.copy(i).add(t).multiplyScalar(.5),a.quaternion.setFromUnitVectors(G(0,1,0),o.normalize()),a}function Se(i=0,t=0,e=0,n=0){const r=new Pn;return r.position.set(i,t,e),r.rotation.y=n,Yt.add(r),r}function Je(i,t,e,n,r,s=Yt,o=24){return ve(new Ta(n.map(([a,c])=>new ft(a,c)),o),r,i,t,e,0,0,0,s)}function xs(i,t,e,n,r,s=Yt){return ve(new xa(n,48),r,i,t,e,-Ht/2,0,0,s)}function Mg(i,t,e,n="#d7c99e",r="#354537"){const s=document.createElement("canvas");s.width=512,s.height=128;const o=s.getContext("2d");o.fillStyle=r,o.fillRect(0,0,512,128),o.fillStyle=n,o.textAlign="center",o.textBaseline="middle",o.font="36px Georgia",o.fillText(i,256,68);const a=new va(s);return a.colorSpace=Oe,new as({map:a,roughness:.95})}function Jr(i,t,e,n,r,s=0){const o=new Fc;return o.moveTo(-n/2,-r/2),o.lineTo(n*.32,-r*.48),o.lineTo(n/2,-r*.12),o.lineTo(n*.43,r*.5),o.lineTo(-n*.3,r*.43),o.lineTo(-n*.52,r*.2),o.closePath(),ve(new ba(o),x.patch,i,t,e,0,s)}let so;function cn(i,t,e,n,r=.24){if(!so){const a=document.createElement("canvas");a.width=a.height=64;const c=a.getContext("2d"),l=c.createRadialGradient(32,32,1,32,32,32);l.addColorStop(0,"#1c2117bf"),l.addColorStop(.5,"#1c211775"),l.addColorStop(1,"#1c211700"),c.fillStyle=l,c.fillRect(0,0,64,64),so=new mr({map:new va(a),transparent:!0,depthWrite:!1,opacity:1,polygonOffset:!0,polygonOffsetFactor:-1})}const s=so.clone();s.opacity=r;const o=ve(new He(e,n),s,i,.018,t,-Ht/2);o.castShadow=!1,o.renderOrder=1}function oo(i,t,e,n,r=!1){H((i+t)/2,-.1,(e+n)/2,t-i,.18,n-e,x.timber);const s=.235;let o=0;for(let a=i;a<t-.01;a+=s,o++){const c=Math.min(s-.012,t-a);let l=e,u=0;for(;l<n-.01;){const h=Math.min(u===0?.5+o%4*.41:1.38+o%3*.24,n-l);if(H(a+c/2,-.021,l+h/2,c,.042,h-.009,r?x.floorDark:en()>.32?x.floor:x.floorDark),u%2===0)for(const m of[l+.035,l+h-.04])he(a+.035,.001,m,.009,.009,.003,x.iron,6),he(a+c-.03,.001,m,.009,.009,.003,x.iron,6);l+=h,u++}}}function an(i,t,e,n,r=x.plaster,s=3.05){H(i,s/2,t,e,s,n,r),e>n?(H(i,.105,t,e,.21,n+.045,x.timber),H(i,.66,t,e,.055,n+.055,x.edgeWood),H(i,2.89,t,e,.19,n+.08,x.timber)):(H(i,.105,t,e+.045,.21,n,x.timber),H(i,.66,t,e+.055,.055,n,x.edgeWood),H(i,2.89,t,e+.08,.19,n,x.timber))}function jl(i,t,e=3.02,n=.16){H(i,e/2,t,n,e,n,x.timber),H(i,.14,t,n+.055,.22,n+.055,x.edgeWood),H(i,e-.18,t,n+.07,.13,n+.07,x.edgeWood)}function ao(i,t,e,n=0,r=2.48){const s=Se(i,0,t,n);for(const o of[-1,1])H(o*(e/2+.075),r/2,0,.15,r,.25,x.timber,0,s),H(o*(e/2+.075),.13,0,.2,.25,.29,x.edgeWood,0,s),H(o*(e/2+.075),r-.08,0,.21,.15,.3,x.edgeWood,0,s);H(0,r+.07,0,e+.46,.2,.25,x.timber,0,s),H(0,.025,0,e,.045,.27,x.oak,0,s);for(const o of[-1,1])wt(G(o*(e/2+.06),r-.32,-.14),G(o*(e/2-.26),r+.015,-.14),.025,x.edgeWood,s)}function Sg(){oo(-4,3.5,-3.5,3.8),oo(3.5,6.2,-3.5,1.2),oo(-.5,6.2,-5.1,-3.5,!0),an(-4,.15,.18,7.3),an(-.25,3.8,7.5,.18),an(-1.975,-3.5,4.05,.18),an(1.725,-3.5,.35,.18),an(3.3,-3.5,.4,.18),H(.8,2.785,-3.5,1.5,.53,.18,x.plaster),ao(.8,-3.5,1.5),H(2.5,.47,-3.5,1.2,.94,.18,x.sagePlaster),H(2.5,2.84,-3.5,1.2,.42,.18,x.plaster);for(const e of[1.91,3.09])H(e,1.81,-3.5,.1,1.8,.2,x.timber);for(const e of[.97,2.62])H(2.5,e,-3.5,1.31,.09,.25,x.timber);H(2.5,.99,-3.36,1.44,.09,.42,x.oak),H(2.5,1.8,-3.52,.045,1.56,.07,x.edgeWood),H(2.5,1.82,-3.52,1.1,.045,.07,x.edgeWood);for(const e of[2.2,2.8])for(const n of[1.4,2.23])H(e,n,-3.51,.53,.77,.012,x.glass);an(3.5,-2.075,.18,2.85),an(3.5,2.475,.18,2.65),H(3.5,2.81,.25,.18,.48,1.8,x.plaster),ao(3.5,.25,1.8,Ht/2),an(6.2,-1.15,.18,4.7,x.sagePlaster),an(4.85,1.2,2.7,.18,x.sagePlaster),an(3.825,-3.5,.65,.18,x.sagePlaster),an(5.875,-3.5,.65,.18,x.sagePlaster),H(4.85,2.8,-3.5,1.4,.5,.18,x.sagePlaster),ao(4.85,-3.5,1.4),H(-.25,3.1,.15,7.7,.16,7.5,x.plaster),H(4.85,3,-1.15,2.7,.14,4.7,x.sagePlaster);for(const e of[-3.35,-1.2,1.1,3.64])H(-.25,2.93,e,7.66,.23,.19,x.timber);for(const e of[-3.86,-1.4,1.12,3.38])H(e,3.01,.14,.14,.12,7.22,x.edgeWood);for(const e of[-3.36,-.92,1.08])H(4.85,2.87,e,2.72,.2,.18,x.timber);for(const[e,n]of[[-3.89,-3.38],[-3.89,3.66],[3.4,3.65],[3.4,-3.38],[6.09,1.09],[6.09,-3.39]])jl(e,n);for(const e of[-1.15,1.16])H(-3.89,1.5,e,.16,2.86,.16,x.timber),wt(G(-3.8,2.4,e),G(-3.19,2.83,e),.065,x.timber);Jr(-2.98,1.66,-3.397,.65,.58),Jr(-3.895,1.1,2.78,.38,.57,Ht/2),Jr(3.392,2.1,1.48,.62,.29,-Ht/2),Jr(-.8,1.25,3.693,.48,.63,Ht);const i=Se(-2.64,0,3.682,0);H(0,1.1,0,1.14,2.2,.075,x.timber,0,i);for(let e=0;e<6;e++)H(-.48+e*.193,1.1,-.052,.184,2.08,.033,x.oak,0,i);for(const e of[.39,1.82])H(0,e,-.075,1.09,.1,.035,x.iron,0,i);for(const e of[-1,1])H(e*.64,1.18,0,.14,2.36,.22,x.timber,0,i);H(0,2.34,0,1.42,.15,.22,x.timber,0,i),Jt(-.35,1.01,-.119,.04,.04,.032,x.brass,i),we(-.35,.97,-.133,.055,.012,x.brass,0,0,i),ve(new He(.24,.1),Mg("17"),0,1.69,-.093,0,Ht,0,i),H(-2.64,.025,3.3,1.08,.035,.6,x.darkCloth),H(2.85,3.01,-4.3,6.95,.16,1.9,x.timber),H(2.85,3.105,-4.3,6.95,.04,1.9,x.edgeWood);for(const e of[-.43,1.72,3.85,6.12])jl(e,-5.03,3.04,.14),H(e,2.89,-4.3,.13,.16,1.68,x.edgeWood),e<6&&wt(G(e,2.38,-5.03),G(e+.32,2.88,-5.03),.045,x.edgeWood),e>0&&wt(G(e,2.38,-5.03),G(e-.32,2.88,-5.03),.045,x.edgeWood);for(const e of[.12,.38,1.12])H(2.85,e,-5.05,6.7,e===1.12?.11:.08,.13,x.timber);for(let e=-.3;e<6.14;e+=.28)H(e,.73,-5.05,.038,.75,.045,x.edgeWood),Jt(e,.72,-5.05,.052,.062,.052,x.oak);for(const e of[-.45,6.15]){for(const n of[.12,1.12])H(e,n,-4.29,.13,.1,1.58,x.timber);for(let n=-4.88;n<-3.6;n+=.28)H(e,.67,n,.05,.86,.05,x.edgeWood)}const t=Se(.025,0,-3.43,-Ht*.4);for(const e of[.07,.65])H(e,1.18,0,.08,2.31,.065,x.edgeWood,0,t);for(const e of[.14,1.02,2.3])H(.36,e,0,.64,.09,.065,x.edgeWood,0,t);H(.36,.56,0,.51,.81,.045,x.timber,0,t),H(.36,1.66,0,.5,1.18,.01,x.glass,0,t),H(.36,1.68,-.016,.036,1.16,.03,x.oak,0,t)}function tr(i,t,e=Yt,n=x.cream){const r=t.clone().sub(i),s=Math.floor(r.length()/.045);for(let o=0;o<s;o++){const a=i.clone().addScaledVector(r,o/s),c=a.clone().addScaledVector(r,.016/r.length());wt(a,c,.003,n,e)}}function Rn(i,t,e,n,r,s,o=Yt,a=.18){const c=H(i,t,e,n,a,r,s,0,o,.065);for(const l of[-1,1])wt(G(i-n*.45,t,e+l*r*.44),G(i+n*.45,t,e+l*r*.44),.008,s,o);return c}function yg(i,t,e=0){const n=Se(i,0,t,e);for(const s of[-.34,.34])for(const o of[-.32,.32])wt(G(s,.06,o),G(s*.88,.47,o*.9),.049,x.edgeWood,n),Jt(s,.065,o,.06,.035,.06,x.timber,n);H(0,.43,0,.81,.16,.79,x.timber,0,n,.035),Rn(0,.57,-.025,.73,.72,x.leather,n,.22);const r=H(0,.97,.33,.81,.87,.2,x.leather,0,n,.06);r.rotation.x=-.1;for(const s of[-.43,.43])H(s,.78,0,.16,.16,.89,x.leather,0,n,.055),wt(G(s,.43,-.28),G(s,.75,-.29),.045,x.edgeWood,n);for(const s of[.86,1.1])for(const o of[-.22,0,.22])Jt(o,s,.2205-.1*(s-.97),.014,.014,.008,x.leatherDark,n);return tr(G(-.33,.624,-.365),G(.33,.624,-.365),n,x.leatherEdge),tr(G(-.355,.69,.246),G(-.355,1.32,.185),n,x.leatherEdge),tr(G(.355,.69,.246),G(.355,1.32,.185),n,x.leatherEdge),H(.43,.864,-.13,.1,.009,.16,x.leatherDark,.04,n,.005),tr(G(.387,.871,-.205),G(.473,.871,-.205),n,x.leatherEdge),tr(G(.387,.871,-.055),G(.473,.871,-.055),n,x.leatherEdge),cn(i,t,1.3,1.3,.47),n}function ci(i,t,e,n,r,s,o=Yt){for(let a=0;a<3;a++)H(i,t+a*.035,e,n,.055,r-a*.01,s,0,o,.025);for(let a=0;a<12;a++)wt(G(i-n/2+.035+a*n/12,t+.03,e-r/2),G(i-n/2+.036+a*n/12,t+.01,e-r/2-.07),.008,x.cream,o)}function Eg(i,t,e,n,r,s,o=Yt,a=.25){const c=new He(n,r,28,28),l=c.attributes.position;for(let h=0;h<l.count;h++){const m=l.getX(h),p=l.getY(h);let g=Math.sin(m*15+p*2)*.009+Math.sin(p*8)*.011;const _=Math.max(0,(Math.abs(m)-n*.43)/(n*.07));g-=_*_*a,l.setXYZ(h,m,-p,g)}c.computeVertexNormals();const u=ve(c,s,i,t,e,-Ht/2,0,0,o);return u.material=s.clone(),u.material.side=Be,u}function Qo(i,t){const e=t-.22,n=Math.max(0,(Math.abs(i)-1.81*.43)/(1.81*.07));return .728+Math.sin(i*15+e*2)*.009+Math.sin(e*8)*.011-n*n*.32}function Ql(i,t,e,n,r,s){const o=new He(e,n,28,4),a=o.attributes.position;for(let c=0;c<a.count;c++){const l=i+a.getX(c),u=t-a.getY(c);a.setZ(c,Qo(l,u)-.728+.002)}o.computeVertexNormals(),ve(o,r,i,.728,t,-Ht/2,0,0,s)}function ns(i,t,e,n=x.creamCeramic,r=Yt,s=0){const o=new Pn;return o.position.set(i,t,e),o.rotation.y=s,r.add(o),Je(0,0,0,[[.045,0],[.065,.01],[.068,.125],[.064,.137],[.057,.134],[.058,.025],[.045,.02]],n,o,20),xs(0,.115,0,.055,x.tea,o),we(.086,.077,0,.04,.01,n,0,Ht/2,o),o}function cs(i,t,e,n,r=x.ceramic,s=Yt){Je(i,t,e,[[0,0],[n*.54,.01],[n*.9,n*.45],[n,n*.75],[n*.96,n*.81],[n*.88,n*.67],[n*.53,.038],[0,.032]],r,s,24)}function Di(i,t,e,n,r,s,o=x.bookGreen,a=Yt,c=0,l=!1){const u=new Pn;u.position.set(i,t+(l?n/2:0),e),u.rotation.y=c,l&&(u.rotation.z=Ht/2),a.add(u),H(0,r/2,0,n*.83,r*.95,s*.92,x.bookPages,0,u);for(const h of[-1,1])H(h*(n/2-.006),r/2,0,.014,r,s,o,0,u,.004);H(0,r/2,-s/2,n,r,.033,o,0,u,.008);for(const h of[.055,r-.052])H(0,h,-s/2-.018,n+.003,.014,.005,x.brass,0,u);for(const h of[r*.48,r*.53,r*.58])H(0,h,-s/2-.018,n*.62,.005,.004,x.brass,0,u);return u}function us(i,t,e,n=.24,r=.3,s=Yt){Je(i,t,e,[[n*.72,0],[n*.8,.02],[n,r],[n*.94,r+.02],[n*.88,.06]],x.oak,s,20);for(let o=0;o<9;o++)we(i,t+o*r/9+.025,e,n*.8+o*.2*n/9,.009,x.edgeWood,Ht/2,0,s);for(let o=0;o<22;o++){const a=o*2*Ht/22;wt(G(i+Math.sin(a)*n*.79,t+.02,e+Math.cos(a)*n*.79),G(i+Math.sin(a)*n*.995,t+r,e+Math.cos(a)*n*.995),.009,x.oak,s)}}function ta(i,t,e,n=.17,r=.52,s="herb",o=Yt){Je(i,t,e,[[n*.65,0],[n*.74,.03],[n*.96,n*1.25],[n*1.04,n*1.3],[n*1.05,n*1.44],[n*.89,n*1.44],[n*.86,n*1.28]],x.terracotta,o,20),xs(i,t+n*1.31,e,n*.85,x.soil,o);const a=t+n*1.34;for(let c=0;c<(s==="lavender"?15:18);c++){const l=c*2.399,u=(.35+en()*.65)*n,h=i+Math.cos(l)*u*.4,m=e+Math.sin(l)*u*.4,p=a+r*(.5+en()*.5),g=i+Math.cos(l)*u*1.5,_=e+Math.sin(l)*u*1.5;wt(G(h,a,m),G(g,p,_),.005,x.stem,o);for(let d=0;d<4;d++){const f=.25+d*.17,b=ts.lerp(h,g,f),y=ts.lerp(m,_,f),M=ts.lerp(a,p,f);Jt(b+Math.cos(l+d)*.04,M,y+Math.sin(l+d)*.04,.017,.014,.066,d%2?x.leaf:x.leafLight,o).rotation.set(.4,l+d,.3)}if(s==="lavender")for(let d=0;d<3;d++)Jt(g,p+d*.023,_,.016,.022,.016,x.lavender,o)}}function Tg(i,t,e,n=Yt,r=.95){const s=new Pn;s.position.set(i,t,e),s.scale.setScalar(r),n.add(s),Je(0,0,0,[[.12,.015],[.18,.05],[.205,.15],[.18,.25],[.1,.28]],x.copper,s),he(0,.279,0,.117,.1,.023,x.brass,24,s),Jt(0,.305,0,.036,.03,.036,x.timber,s),wt(G(.12,.12,0),G(.31,.25,0),.047,x.copper,s,.03),he(.316,.258,0,.031,.027,.045,x.copper,16,s);const o=new Ea([G(-.17,.17,0),G(-.2,.37,0),G(0,.46,0),G(.2,.36,0),G(.17,.19,0)]);return ve(new gs(o,18,.019,7,!1),x.iron,0,0,0,0,0,0,s),s}function tc(i,t,e,n,r,s,o=0){const a=Se(i,t,e,o);H(0,0,0,n+.09,r+.09,.07,x.timber,0,a,.012),H(0,0,-.041,n+.032,r+.032,.012,x.brass,0,a);const c=new as({map:s,roughness:.91});ve(new He(n,r),c,0,0,-.05,0,Ht,0,a);for(const l of[-1,1])for(const u of[-1,1])Jt(l*(n/2+.022),u*(r/2+.022),-.055,.014,.014,.009,x.brass,a);return a}function bg(){const i=H(.03,.014,1,3.55,.018,3.38,x.rug,0,Yt,.005);i.castShadow=!1;for(const d of[-.71,2.71])for(let f=-1.73;f<1.81;f+=.052)wt(G(f,.025,d),G(f+.011,.025,d+(d<0?-.09:.09)),.006,x.wool);const t=Se(-2.6,0,-1.95);for(const d of[-.79,.79])for(const f of[-1.13,1.13])he(d,.42,f,.052,.065,.81,x.edgeWood,12,t),Jt(d,.84,f,.082,.1,.082,x.oak,t);H(0,.37,0,1.7,.28,2.31,x.timber,0,t,.025),H(0,.57,0,1.58,.23,2.22,x.cream,0,t,.075),H(0,.99,-1.17,1.58,.56,.1,x.edgeWood,0,t,.034),H(0,.96,-1.109,1.4,.36,.018,x.oak,0,t,.008);for(const d of[-.53,-.265,0,.265,.53])H(d,.98,-1.095,.023,.33,.01,x.timber,0,t);H(0,.63,1.17,1.61,.21,.09,x.edgeWood,0,t,.027),Rn(-.37,.751,-.74,.68,.47,x.cream,t,.16).rotation.y=.055,Rn(.36,.753,-.75,.66,.47,x.cream,t,.16).rotation.y=-.05,Eg(0,.728,.22,1.81,1.6,x.tealWool,t,.32);for(let d=0;d<5;d++)Ql(0,-.3+d*.27,1.76,.026,d%2?x.wool:x.rustWool,t);Ql(.36,.62,.27,.25,x.rustWool,t);for(const d of[.5,.74])for(let f=.233;f<.49;f+=.03)wt(G(f,Qo(f,d)+.006,d),G(f+.013,Qo(f+.013,d)+.006,d),.0025,x.cream,t);ci(0,.795,.8,1.42,.39,x.wool,t),cn(-2.6,-1.95,2.2,2.85,.6),H(-3.46,.3,-.29,.63,.56,.55,x.edgeWood,0,Yt,.025),H(-3.46,.6,-.29,.68,.07,.6,x.oak,0,Yt,.02);for(const d of[.22,.45])H(-3.46,d,0,.52,.17,.04,x.timber,0,Yt,.012),Jt(-3.46,d,.029,.025,.025,.018,x.brass);Di(-3.57,.651,-.23,.07,.24,.17,x.bookRed,Yt,.15,!0),ns(-3.33,.636,-.21,x.blueCeramic,Yt,1);const e=yg(-1.72,.56,-Ht/2+.12);ci(.02,.66,.07,.54,.38,x.rustWool,e);const n=new He(.45,.9,12,20),r=n.attributes.position;for(let d=0;d<r.count;d++){const f=r.getX(d),b=(r.getY(d)+.45)/.9;r.setXYZ(d,f,.87-b*.66,-.055-Math.sin(b*Ht)*.025+Math.sin(f*33)*.01)}n.computeVertexNormals();const s=x.tealWool.clone();s.side=Be,ve(n,s,-.44,0,0,0,Ht/2,0,e);const o=Se(.2,0,2.64);for(const d of[-.89,.89])for(const f of[-.32,.32])wt(G(d,.055,f),G(d*.97,.4,f),.052,x.timber,o);H(0,.4,0,1.96,.18,.81,x.edgeWood,0,o,.025),H(0,.8,.34,1.97,.72,.1,x.timber,0,o,.035);for(let d=-.81;d<.9;d+=.2)H(d,.83,.35,.082,.64,.08,x.edgeWood,0,o);for(const d of[-1,1])H(d,.7,0,.12,.12,.88,x.oak,0,o,.035),wt(G(d,.42,-.29),G(d,.7,-.29),.036,x.timber,o);Rn(-.49,.555,-.02,.91,.73,x.wool,o,.18),Rn(.48,.555,-.02,.91,.73,x.wool,o,.18);const a=Rn(-.59,.87,.19,.53,.18,x.tealWool,o,.48);a.rotation.z=.16;const c=Rn(.71,.82,.16,.4,.2,x.rustWool,o,.39);c.rotation.z=-.22;for(let d=-2;d<3;d++)wt(G(-.57+d*.043,.73,.08),G(-.57+d*.043,.99,.08),.006,x.cream,o);cn(.2,2.64,2.4,1.4,.46);const l=Se(-.02,0,.47);for(let d=0;d<3;d++){const f=d*Ht*2/3+.2;wt(G(Math.sin(f)*.47,.05,Math.cos(f)*.47),G(Math.sin(f)*.36,.55,Math.cos(f)*.36),.043,x.edgeWood,l)}he(0,.551,0,.64,.61,.066,x.timber,48,l),xs(0,.588,0,.612,x.shield,l);const u=new ms(.623,.022,8,96),h=u.attributes.position;for(let d=0;d<h.count;d++){const f=Math.atan2(h.getY(d),h.getX(d)),b=Math.exp(-Math.pow((f-.54)/.115,2))*.017+Math.exp(-Math.pow((f+1.87)/.08,2))*.012,y=Math.hypot(h.getX(d),h.getY(d));h.setXYZ(d,h.getX(d)*(1-b/y),h.getY(d)*(1-b/y),h.getZ(d)+Math.sin(f*7)*.002)}u.computeVertexNormals(),ve(u,x.iron,0,.586,0,Ht/2,0,0,l);for(let d=0;d<20;d++){const f=d*2*Ht/20;Jt(Math.sin(f)*.59,.59,Math.cos(f)*.59,.015,.012,.015,x.brass,l)}Jt(0,.588,0,.135,.045,.135,x.iron,l);for(let d=0;d<5;d++)H((d-2)*.048,.643,0,.026,.024,.27,x.oak,0,l);Tg(-.01,.658,.02,l,.67),ns(-.3,.59,.25,x.creamCeramic,l,.5),ns(.33,.59,-.17,x.blueCeramic,l,2.8),cs(.2,.59,.3,.106,x.creamCeramic,l);for(let d=0;d<4;d++)Jt(.18+d%2*.04,.641,.28+Math.floor(d/2)*.04,.037,.012,.037,x.oak,l);H(-.33,.603,-.24,.24,.017,.22,x.cream,-.1,l),wt(G(-.4,.621,-.24),G(-.2,.621,-.25),.009,x.brass,l);for(const d of[-.22,.22]){const f=new Ea([G(d,.514,-.15),G(d,.37,-.1),G(d,.34,.05),G(d,.513,.18)]);ve(new gs(f,14,.019,6,!1),x.leatherDark,0,0,0,0,0,0,l);for(const b of[-.15,.18])Jt(d,.512,b,.025,.012,.025,x.brass,l)}cn(-.02,.47,1.7,1.7,.32),di.push({position:G(-.02,.65,.47),range:2,title:"Stormward, off duty",copy:"The shield that crossed the salt flats. These days, it mostly carries the tea."});const m=Se(1.67,0,1.65,.15);for(const d of[-.22,.22])for(const f of[-.19,.19])wt(G(d,.04,f),G(d,.33,f),.032,x.oak,m);Rn(0,.38,0,.61,.56,x.tealWool,m,.16),cn(1.67,1.65,.9,.8,.31),us(1.61,.02,2.83,.21,.26),Jt(1.55,.27,2.85,.09,.08,.09,x.rustWool),Jt(1.67,.26,2.81,.08,.07,.08,x.cream),wt(G(1.51,.22,2.75),G(1.7,.52,2.91),.008,x.oak),wt(G(1.66,.21,2.78),G(1.5,.51,2.84),.008,x.oak),H(2.85,.28,-2.56,.88,.5,.56,x.edgeWood,0,Yt,.022),H(2.85,.565,-2.56,.94,.075,.62,x.oak,0,Yt,.025);for(const d of[2.57,3.13])H(d,.3,-2.259,.045,.4,.02,x.iron);H(2.85,.47,-2.231,.07,.1,.025,x.brass),ci(2.85,.64,-2.56,.73,.48,x.rustWool),cn(2.85,-2.56,1.2,.88,.35),ta(2.8,1.05,-3.35,.13,.3),cs(2.19,1.05,-3.35,.11,x.blueCeramic),tc(-1.7,1.8,3.672,.63,.48,Jl(0)),tc(-.84,1.93,3.672,.37,.5,Jl(1)),di.push({position:G(-1.31,1.85,3.5),range:1.8,title:"The ones who came home",copy:"Three companions, one last crossing. The small frame is newer."}),wt(G(-3.82,2.55,-.91),G(-1.73,2.55,-.91),.019,x.iron);const p=new He(.49,1.68,20,20),g=p.attributes.position;for(let d=0;d<g.count;d++)g.setZ(d,Math.sin(g.getX(d)*49)*.04);p.computeVertexNormals();const _=x.cream.clone();_.side=Be,ve(p,_,-3.61,1.67,-.91);for(let d=0;d<6;d++)we(-3.82+d*.082,2.53,-.91,.025,.006,x.brass,0)}function Ag(){const i=Se(3.18,0,2.47,Ht/2);H(0,.05,-.12,1.89,.1,1,x.hearth,0,i,.018),H(0,.7,.21,1.54,1.32,.44,x.brick,0,i),H(0,.55,-.027,1.14,.92,.035,x.black,0,i);for(const n of[-.68,.68])for(let r=0;r<5;r++)H(n,.14+r*.19,-.13,.25,.178,.57,r%2?x.stone:x.hearth,0,i,.018);H(0,1.08,-.12,1.52,.23,.58,x.stone,0,i,.024),H(0,1.25,-.13,1.91,.15,.69,x.timber,0,i,.026),H(0,1.38,.1,1.28,.13,.34,x.patch,0,i),H(0,2.14,.22,1.28,1.48,.32,x.plaster,0,i);for(let n=0;n<7;n++)wt(G(-.5+n*.16,.16,-.32),G(-.5+n*.16,.48,-.32),.015,x.iron,i);wt(G(-.56,.34,-.33),G(.56,.34,-.33),.018,x.iron,i);for(let n=0;n<4;n++)wt(G(-.43,.19+n*.053,-.13+n*.045),G(.42,.2+n*.025,.02+n*.065),.062,x.coal,i);for(let n=0;n<15;n++)Jt(-.39+en()*.77,.17+en()*.035,-.25+en()*.29,.02+en()*.018,.012,.025,x.ember,i);for(let n=0;n<7;n++){const r=Jt(-.35+n*.11,.28+en()*.09,-.12,.027,.1+en()*.07,.023,x.flame,i);r.rotation.z=(en()-.5)*.4}H(0,1.48,-.14,.4,.3,.16,x.edgeWood,0,i,.075),he(0,1.35,-.14,.25,.25,.045,x.timber,24,i);const t=he(0,1.5,-.23,.12,.12,.016,x.creamCeramic,32,i);t.rotation.x=Ht/2,we(0,1.5,-.241,.123,.011,x.brass,0,0,i),wt(G(0,1.5,-.257),G(.061,1.56,-.257),.006,x.timber,i),wt(G(0,1.5,-.258),G(-.055,1.485,-.258),.005,x.timber,i),Jt(0,1.5,-.261,.012,.012,.005,x.brass,i);for(const n of[-.68,.68])he(n,1.36,-.11,.075,.1,.06,x.brass,16,i),he(n,1.51,-.11,.023,.033,.26,x.brass,14,i),he(n,1.7,-.11,.04,.04,.2,x.cream,16,i),Jt(n,1.829,-.11,.02,.037,.02,x.flame,i);wt(G(.96,.11,.04),G(.96,.83,.04),.012,x.iron,i),we(.96,.86,.04,.039,.01,x.iron,0,0,i),H(.96,.12,.04,.085,.12,.026,x.iron,0,i),us(-1,.02,.08,.21,.3,i);for(let n=0;n<5;n++)wt(G(-1.15+n*.06,.11,.08),G(-1.09+n*.04,.49,.11),.025,x.edgeWood,i);for(const n of[2.18,2.47])Jt(2.38,.071,n,.19,.065,.091,x.leather),Jt(2.43,.094,n,.09,.028,.061,x.leatherDark);cn(2.91,2.47,1.35,2.18,.5);const e=new ls("#ffae63",16,6,2);e.position.set(2.68,.65,2.47),Yt.add(e)}function wg(){const i=Se(-3.6,0,1.67,-Ht/2);H(0,.45,0,1,.8,.51,x.timber,0,i,.016),H(0,.88,0,1.08,.07,.57,x.oak,0,i,.015);for(const s of[-.24,.24])H(s,.48,-.272,.44,.63,.03,x.edgeWood,0,i,.009),H(s,.49,-.294,.32,.49,.014,x.oak,0,i),Jt(s+(s<0?.13:-.13),.57,-.32,.02,.02,.015,x.brass,i);cs(-.29,.925,-.07,.12,x.blueCeramic,i);for(let s=0;s<4;s++)we(-.31+s*.019,.955,-.08,.021,.004,x.brass,Ht/2,0,i);H(.26,.927,-.03,.27,.016,.19,x.envelope,-.12,i);const t=new Ue;t.setAttribute("position",new te([.128,.939,-.122,.26,.94,.013,.39,.939,-.122],3)),t.computeVertexNormals(),ve(t,x.paper,0,0,0,0,0,0,i),he(.26,.947,-.008,.025,.025,.006,x.wax,20,i),di.push({position:G(-3.6,1,1.7),range:1.55,title:"It can wait until morning",copy:"An unopened letter, set beside the house keys. No boots packed beneath it."}),H(0,1.93,.11,1.15,.12,.12,x.edgeWood,0,i);for(const s of[-.43,-.12,.19,.45])wt(G(s,1.94,.06),G(s,1.86,-.02),.011,x.iron,i),Jt(s,1.864,-.03,.019,.015,.015,x.brass,i);H(-.34,1.41,-.01,.35,.34,.15,x.leather,0,i,.045),H(-.34,1.52,-.1,.37,.2,.034,x.leatherDark,0,i,.025),H(-.34,1.43,-.129,.037,.11,.014,x.leatherEdge,0,i),we(-.34,1.45,-.145,.025,.006,x.brass,0,0,i),wt(G(-.47,1.58,.01),G(-.43,1.87,-.03),.013,x.leather,i),wt(G(-.18,1.58,.01),G(-.43,1.87,-.03),.013,x.leather,i);const e=new He(.52,.91,14,16),n=e.attributes.position;for(let s=0;s<n.count;s++){const o=n.getY(s),a=(o+.455)/.91;n.setX(s,n.getX(s)*(.68+(1-a)*.5)),n.setZ(s,Math.sin(n.getX(s)*32)*.037+.05*(1-a))}e.computeVertexNormals();const r=x.darkCloth.clone();r.side=Be,ve(e,r,.34,1.37,-.08,0,0,0,i),Je(-.77,.02,0,[[.14,0],[.16,.05],[.16,.37],[.14,.39],[.125,.37],[.125,.04]],x.blueCeramic,i),wt(G(-.77,.06,0),G(-.82,1.3,0),.018,x.edgeWood,i),we(-.77,1.3,0,.052,.018,x.edgeWood,0,0,i),cn(-3.6,1.67,.94,1.35,.46)}function Rg(i,t,e,n=Yt){he(i,t+.025,e,.12,.14,.05,x.brass,24,n),wt(G(i,t+.05,e),G(i,t+.38,e),.025,x.brass,n),Je(i,t+.33,e,[[.21,0],[.22,.03],[.13,.2],[.055,.23]],x.darkCloth,n),Je(i,t+.33,e,[[.208,.004],[.126,.19],[.055,.219]],x.lamp,n),we(i,t+.346,e,.214,.009,x.brass,Ht/2,0,n)}function Cg(){const i=Se(5.7,0,-1.54,Ht/2);H(0,.79,0,1.95,.085,.81,x.oak,0,i,.023);for(const l of[-.83,.83])for(const u of[-.29,.29])H(l,.4,u,.075,.74,.075,x.timber,0,i,.01),H(l,.105,u,.1,.08,.1,x.edgeWood,0,i);H(0,.647,.05,1.74,.18,.59,x.edgeWood,0,i);for(const l of[-.43,.43])H(l,.654,-.266,.8,.14,.035,x.timber,0,i,.008),we(l,.662,-.3,.031,.007,x.brass,0,0,i);wt(G(-.82,.23,.2),G(.82,.23,.2),.028,x.timber,i),H(-.02,.839,-.02,.85,.012,.59,x.leatherDark,.02,i,.008),ve(new He(.69,.49),x.map,-.09,.85,-.055,-Ht/2,0,-.1,i),he(-.25,.872,.1,.058,.058,.025,x.brass,24,i),we(-.25,.888,.1,.045,.008,x.iron,Ht/2,0,i),wt(G(-.276,.895,.081),G(-.227,.895,.122),.004,x.wax,i),H(.21,.856,.1,.1,.024,.14,x.envelope,.06,i),Je(.43,.837,-.06,[[.045,0],[.05,.02],[.048,.07],[.025,.09],[.025,.12]],x.blueCeramic,i,16),he(.43,.958,-.06,.028,.028,.015,x.brass,16,i),wt(G(.43,.95,-.06),G(.55,1.23,.01),.004,x.edgeWood,i);const t=Jt(.526,1.17,-.006,.023,.09,.007,x.cream,i);t.rotation.z=-.35;for(const l of[-.15,-.048])we(l,.868,-.21,.042,.004,x.brass,Ht/2,0,i);wt(G(-.11,.868,-.21),G(-.086,.868,-.21),.004,x.brass,i),wt(G(-.19,.868,-.21),G(-.22,.868,-.32),.004,x.brass,i),wt(G(-.4,.861,-.25),G(.25,.861,-.27),.006,x.oak,i),Rg(.68,.84,.05,i),ns(-.73,.837,-.16,x.blueCeramic,i,2),Di(-.55,.841,.21,.052,.31,.22,x.bookRed,i,0,!0),Di(-.51,.9,.21,.046,.29,.2,x.bookOchre,i,.08,!0);const e=Se(4.71,0,-1.37,-Ht/2);for(const l of[-.2,.2])for(const u of[-.2,.2])wt(G(l,.035,u),G(l,.46,u),.026,x.edgeWood,e);H(0,.47,0,.51,.06,.5,x.oak,0,e,.024),Rn(0,.526,0,.46,.44,x.rustWool,e,.065);for(const l of[-.2,.2])wt(G(l,.44,.21),G(l,.97,.23),.023,x.edgeWood,e);H(0,.91,.23,.47,.15,.052,x.oak,0,e,.017);for(const l of[-.13,0,.13])wt(G(l,.56,.22),G(l,.86,.23),.012,x.edgeWood,e);cn(5.7,-1.54,1.22,2.31,.4),cn(4.71,-1.37,.83,.86,.3);const n=new ls("#ffd5a0",8,4.1,2);n.position.set(5.6,1.36,-2.2),Yt.add(n),di.push({position:G(5.5,.95,-1.55),range:1.75,title:"A route worth remembering",copy:"The maps are still in use. The journeys are becoming a book, a page at a time."});const r=Se(3.79,0,-2.25,-Ht/2);H(0,.5,0,1.38,.96,.35,x.timber,0,r,.014),H(0,1.015,0,1.45,.07,.4,x.oak,0,r,.018);for(let l=0;l<6;l++){const u=.15+l*.145;H(0,u,-.19,1.23,.116,.03,x.edgeWood,0,r,.006);for(const h of[-.41,.41])H(h,u,-.212,.1,.03,.011,x.brass,0,r),we(h,u-.019,-.224,.019,.004,x.iron,0,0,r)}for(let l=0;l<3;l++){const u=he(-.4+l*.28,1.105,.02,.05,.05,.31,x.envelope,16,r);u.rotation.z=Ht/2,we(-.4+l*.28,1.105,.02,.052,.008,x.leatherDark,0,Ht/2,r)}const s=Se(4.93,0,.89);for(const l of[-.97,.97])H(l,1.17,.11,.065,2.32,.42,x.timber,0,s);for(const l of[.12,.65,1.17,1.76,2.3])H(0,l,0,2.03,.067,.44,x.edgeWood,0,s,.009),H(0,l+.005,-.238,2.04,.085,.034,x.oak,0,s);H(0,1.18,.203,1.88,2.19,.027,x.timber,0,s),us(-.6,.16,-.04,.24,.31,s),us(.45,.16,-.04,.3,.31,s),ci(-.53,.69,-.015,.63,.33,x.cream,s),ci(.13,.69,-.015,.51,.32,x.tealWool,s),H(.66,.87,0,.36,.31,.29,x.leatherDark,0,s,.032),H(.66,.91,-.16,.048,.21,.027,x.leatherEdge,0,s),H(.66,.95,-.18,.08,.07,.015,x.brass,0,s);const o=[x.bookGreen,x.bookRed,x.bookBlue,x.bookOchre];let a=-.84;for(let l=0;l<9;l++){const u=.072+l%3*.024;Di(a,1.205,-.014,u,.3+l%4*.035,.27,o[l%4],s),a+=u+.019}Je(.49,1.21,0,[[.1,0],[.14,.035],[.14,.24],[.08,.29],[.06,.33]],x.ceramic,s),he(.49,1.548,0,.075,.066,.032,x.oak,20,s),cs(.8,1.21,.02,.11,x.blueCeramic,s);for(const l of[-.71,-.33])Je(l,1.795,0,[[.08,0],[.105,.05],[.095,.26],[.068,.3]],x.creamCeramic,s),he(l,2.1,0,.077,.07,.033,x.edgeWood,20,s),H(l,1.97,-.092,.085,.09,.008,x.envelope,0,s);Di(.16,1.8,.04,.07,.33,.25,x.bookBlue,s,0,!0),Di(.2,1.87,.04,.05,.34,.22,x.bookGreen,s,.05,!0),Jt(.64,1.92,.015,.13,.12,.1,x.stone,s),wt(G(.64,2.04,.02),G(.73,2.17,.02),.025,x.stone,s),H(.55,2.54,0,.49,.44,.32,x.leather,0,s,.075),H(.55,2.66,-.13,.52,.22,.1,x.leatherDark,0,s,.04);for(const l of[.38,.71])H(l,2.54,-.21,.044,.32,.016,x.leatherEdge,0,s),H(l,2.58,-.225,.067,.061,.014,x.brass,0,s);ci(-.38,2.36,0,.66,.35,x.darkCloth,s),cn(4.93,.89,2.3,.7,.45);const c=Se(6.087,1.98,-1.52,Ht/2);H(0,0,0,1.45,.98,.045,x.timber,0,c),H(0,0,-.03,1.32,.85,.02,x.darkCloth,0,c),ve(new He(.48,.57),x.map,-.29,.03,-.044,0,Ht,0,c),ve(new He(.4,.24),x.paper,.29,.16,-.046,0,Ht,0,c);for(const[l,u]of[[-.49,.29],[-.09,.29],[.13,.255],[.45,.255]])Jt(l,u,-.055,.012,.012,.007,x.brass,c);H(.29,-.2,-.045,.39,.23,.01,x.envelope,0,c),wt(G(.3,-.28,-.054),G(.25,-.13,-.054),.004,x.stem,c);for(let l=0;l<5;l++){const u=Jt(.28+(l%2?.02:-.02),-.25+l*.023,-.06,.034,.013,.003,x.leaf,c);u.rotation.z=.4}Jc(3.65,1.94,-.85,1)}function Jc(i,t,e,n=1){const r=Se(i,t,e);r.scale.setScalar(n),he(0,0,0,.115,.13,.07,x.iron,16,r),he(0,.32,0,.13,.115,.07,x.iron,16,r),he(0,.39,0,.04,.12,.1,x.iron,16,r),we(0,.49,0,.052,.012,x.iron,0,0,r),H(0,.17,0,.12,.25,.12,x.lamp,0,r,.02);for(const s of[-.084,.084])for(const o of[-.084,.084])wt(G(s,.015,o),G(s,.33,o),.009,x.iron,r)}function Pg(){ta(-.2,.02,-4.77,.21,.57,"herb"),ta(1.9,.02,-4.84,.22,.57,"lavender");const i=Se(3.25,.02,-4.85,.1);Jt(0,.11,0,.12,.09,.22,x.leather,i),H(0,.28,.065,.17,.34,.18,x.leatherDark,0,i,.027),xs(0,.455,.065,.075,x.soil,i);for(let r=0;r<7;r++){const s=r*2.4;wt(G(0,.46,.065),G(Math.cos(s)*.1,.64+en()*.12,.065+Math.sin(s)*.1),.004,x.stem,i),Jt(Math.cos(s)*.1,.66,.065+Math.sin(s)*.1,.018,.045,.012,x.leaf,i)}for(let r=0;r<4;r++)wt(G(-.06,.2+r*.05,-.034),G(.06,.22+r*.05,-.034),.006,x.cream,i);const t=Se(5.91,0,-4.22,Ht/2);for(const r of[-.43,.43])for(const s of[-.16,.16])H(r,.23,s,.052,.46,.052,x.timber,0,t);H(0,.48,0,1.1,.07,.48,x.oak,0,t,.018),ci(0,.53,0,.58,.38,x.tealWool,t);const e=Se(4.48,.45,-4.82);he(0,.12,0,.1,.13,.24,x.copper,24,e),wt(G(.07,.12,0),G(.3,.23,0),.03,x.copper,e,.016);const n=he(.31,.238,0,.045,.022,.04,x.brass,16,e);n.rotation.z=-.75,we(-.1,.17,0,.09,.012,x.iron,0,Ht/2,e),H(4.5,.43,-4.83,.61,.04,.32,x.edgeWood);for(const r of[1.55,3.8]){wt(G(r,2.88,-3.89),G(r,2.52,-3.89),.006,x.cream);for(let s=0;s<8;s++){const o=s*2.4;wt(G(r,2.55,-3.89),G(r+Math.cos(o)*.07,2.23-en()*.12,-3.89+Math.sin(o)*.07),.007,x.stem),Jt(r+Math.cos(o)*.07,2.24,-3.89+Math.sin(o)*.07,.033,.1,.035,x.leaf)}}Jc(.03,2.27,-4.68,.68);for(let r=0;r<40;r++){const s=r/39,o=-.43+Math.sin(s*8)*.09,a=.25+s*2.5,c=-5.01+Math.cos(s*7)*.035;Jt(o,a,c,.1,.035,.035,r%3?x.leaf:x.leafLight).rotation.set(.2,s*4,s*12),r>0&&wt(G(o,a,c),G(-.43+Math.sin((s-.025)*8)*.09,a-.07,-5.01),.005,x.stem)}di.push({position:G(2.6,1.45,-4.4),range:3.8,title:"Above the Copper Kettle",copy:"The herbs get the last light. The room is waiting behind you."})}function Lg(i){i.background=new Xt("#bbc9bc"),i.fog=new ga("#bbc9bc",.008);const t=new vf("#d3e4e3","#847254",1.15);i.add(t);const e=new Sf("#ffdaa0",3.5);e.position.set(2.8,4.2,-10),e.target.position.set(1,.3,1.6),e.castShadow=!0,e.shadow.mapSize.set(2048,2048),Object.assign(e.shadow.camera,{left:-10,right:10,top:8,bottom:-8,near:.5,far:30}),e.shadow.bias=-18e-5,e.shadow.normalBias=.035,e.shadow.radius=2,i.add(e,e.target);const n=new ls("#ffdfaf",12,8,2);n.position.set(-.9,2.45,.6),i.add(n);const r=new ls("#c8e0df",10,9,2);r.position.set(1.6,2.1,-4.6),i.add(r),wt(G(-.7,2.98,.65),G(-.7,2.57,.65),.008,x.iron),Je(-.7,2.33,.65,[[.32,0],[.3,.07],[.16,.23],[.04,.27]],x.copper),Je(-.7,2.331,.65,[[.313,0],[.292,.07],[.155,.223]],x.lamp),Jt(-.7,2.4,.65,.058,.07,.058,x.lamp);const s=new ps(70,24,12),o=new Un({side:ze,depthWrite:!1,uniforms:{top:{value:new Xt("#89a8af")},horizon:{value:new Xt("#ebd3ac")},bottom:{value:new Xt("#9faaa0")}},vertexShader:"varying vec3 vPosition; void main(){vPosition=position; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}",fragmentShader:`varying vec3 vPosition; uniform vec3 top; uniform vec3 horizon; uniform vec3 bottom; void main(){float h=normalize(vPosition).y; vec3 c=h>0.0?mix(horizon,top,smoothstep(0.0,0.65,h)):mix(horizon,bottom,smoothstep(0.0,0.5,-h)); gl_FragColor=vec4(c,1.0);
 #include <tonemapping_fragment>
 #include <colorspace_fragment>
}`}),a=new nn(s,o);return i.add(a),{sun:e}}function Dg(){Yt.updateMatrixWorld(!0);const i=new Map;for(const e of La){const n=e.material.uuid;i.has(n)||i.set(n,{material:e.material,geometries:[]});let r=e.geometry.clone();r.index&&(r=r.toNonIndexed()),r.getAttribute("uv")||r.setAttribute("uv",new te(new Float32Array(r.getAttribute("position").count*2),2));for(const s of Object.keys(r.attributes))["position","normal","uv"].includes(s)||r.deleteAttribute(s);r.getAttribute("normal")||r.computeVertexNormals(),r.applyMatrix4(e.matrixWorld),i.get(n).geometries.push(r),e.removeFromParent()}let t=0;for(const e of i.values()){const n=og(e.geometries,!1);if(!n)throw new Error("A static geometry batch could not be assembled.");n.computeBoundingSphere(),t+=n.getAttribute("position").count/3;const r=new nn(n,e.material);r.castShadow=!0,r.receiveShadow=!0,Yt.add(r);for(const s of e.geometries)s.dispose()}for(const e of lr.values())e.dispose();return{staticBatches:i.size,triangles:t,transparentMeshes:Da.length}}function Ug(i){Yt=new Pn,Yt.name="The Quiet After",i.add(Yt),La=[],Da=[],di=[],lr=new Map,x=pg(),xg(),Sg(),bg(),Ag(),wg(),Cg(),Pg();const t=Lg(i),e=Dg();return{root:Yt,annotations:di,stats:e,...t}}const _e=i=>document.getElementById(i),In=_e("scene"),Ua=_e("enter"),Ig=_e("welcome"),Kc=_e("pause"),$c=_e("hud");Ua.disabled=!0;let Ve,ea,Dn,na,Ke=!1,Ia=!1,Ms=!1,ia=!1,li=Wn.yaw,hs=Wn.pitch,Ii=0,ec=0,fs=0,ra=1,sa=0,jc="balanced";const De=new Set,Vi=new L(Wn.x,Ca,Wn.z),pn=new ft,nc=new L,ic={living:["The sitting room","A good place to stop."],study:["The little study","Some journeys become stories."],balcony:["The covered balcony","The last light of the afternoon."]};let rc="";function Ss(i){_e("error").textContent=i,_e("error").classList.remove("hidden")}window.addEventListener("error",i=>Ss(`The room could not finish loading: ${i.message}. Try reloading, or use a browser with WebGL 2 enabled.`));window.addEventListener("unhandledrejection",i=>{String(i.reason).includes("pointer")||Ss(`A loading error occurred: ${i.reason?.message||i.reason}`)});function Na(i){jc=i;const t={low:1,balanced:1.25,high:1.75};Ve.setPixelRatio(Math.min(window.devicePixelRatio||1,t[i])),Ve.setSize(window.innerWidth,window.innerHeight,!1),Ve.shadowMap.enabled=i!=="low",Ve.shadowMap.needsUpdate=!0,fs=0}function ys(){Vi.set(Wn.x,Ca,Wn.z),li=Wn.yaw,hs=Wn.pitch,pn.set(0,0),De.clear(),sa=0,Qc(0)}function Qc(i){Dn.rotation.order="YXZ",Dn.rotation.set(hs,li,0);const t=pn.length()>.05;t&&Ke&&(sa+=i*8);const e=t&&Ke?Math.sin(sa)*.008:0;Dn.position.set(Vi.x,Ca+e,Vi.z)}function qi(){Ke=!1,Ms=!1,De.clear(),pn.set(0,0),Ia&&(Kc.classList.remove("hidden"),$c.classList.add("hidden"),_e("masthead").style.opacity=".7"),document.pointerLockElement===In&&document.exitPointerLock()}async function Fa(){Ia=!0,Ke=!0,Ig.classList.add("hidden"),Kc.classList.add("hidden"),$c.classList.remove("hidden"),_e("masthead").style.opacity=".68",In.focus(),ia=!0;try{await In.requestPointerLock()}catch{}ia=!1,Ii=performance.now(),fs=0}function Ng(i,t){li-=i*.002*ra,hs=ts.clamp(hs-t*.002*ra,-1.45,1.45)}function Fg(i){if(i-ec<180)return;ec=i;const t=vg(Vi.x,Vi.z);t!==rc&&(rc=t,_e("room-name").textContent=ic[t][0],_e("room-subtitle").textContent=ic[t][1]),Dn.getWorldDirection(nc);let e=null,n=1/0;for(const s of na.annotations){const o=s.position.clone().sub(Dn.position),a=o.length(),c=nc.dot(o.normalize());a<s.range&&c>.76&&a<n&&(e=s,n=a)}_e("object-note").classList.toggle("visible",!!e),e&&(_e("object-heading").textContent=e.title,_e("object-copy").textContent=e.copy)}function tu(i){if(requestAnimationFrame(tu),document.hidden){Ii=i;return}if(!Ke&&i-fs<80){Ii=i;return}const t=Math.min(.04,Math.max(0,(i-(Ii||i))/1e3));if(Ii=i,fs=i,Ke){const e=(De.has("KeyW")||De.has("ArrowUp")?1:0)-(De.has("KeyS")||De.has("ArrowDown")?1:0),n=(De.has("KeyD")||De.has("ArrowRight")?1:0)-(De.has("KeyA")||De.has("ArrowLeft")?1:0),r=new ft(n,e);r.lengthSq()>1&&r.normalize();const s=De.has("ShiftLeft")||De.has("ShiftRight")?2.45:1.72,o=1-Math.exp(-16*t);pn.lerp(r.multiplyScalar(s),o),pn.lengthSq()<1e-4&&pn.set(0,0);const a=(pn.x*Math.cos(li)-pn.y*Math.sin(li))*t,c=(-pn.x*Math.sin(li)-pn.y*Math.cos(li))*t;_g(Vi,a,c),Qc(t),Fg(i)}Ve.render(ea,Dn)}function Og(){Ve=new sg({canvas:In,antialias:!0,alpha:!1,powerPreference:"high-performance"}),Ve.outputColorSpace=Oe,Ve.toneMapping=lc,Ve.toneMappingExposure=1.05,Ve.shadowMap.enabled=!0,Ve.shadowMap.type=oc,Ve.shadowMap.autoUpdate=!1,Ve.shadowMap.needsUpdate=!0,ea=new Nh,Dn=new Ze(66,window.innerWidth/window.innerHeight,.055,100),na=Ug(ea),ys(),Na("balanced"),console.info("The Quiet After — assembled scene",na.stats),_e("loading").textContent="Your room is ready.",Ua.disabled=!1,In.tabIndex=0,requestAnimationFrame(tu)}Ua.addEventListener("click",Fa);_e("resume").addEventListener("click",Fa);_e("reset-menu").addEventListener("click",()=>{ys(),Fa()});_e("reset-hud").addEventListener("click",ys);_e("pause-hud").addEventListener("click",qi);_e("sensitivity").addEventListener("input",i=>{ra=Number(i.target.value)});_e("quality").addEventListener("change",i=>Na(i.target.value));document.addEventListener("pointerlockchange",()=>{!document.pointerLockElement&&Ke&&!ia&&qi()});document.addEventListener("mousemove",i=>{Ke&&(document.pointerLockElement===In||Ms)&&Ng(i.movementX,i.movementY)});In.addEventListener("mousedown",i=>{Ke&&i.button===0&&(Ms=!0,In.focus())});window.addEventListener("mouseup",()=>Ms=!1);window.addEventListener("keydown",i=>{if(i.code==="Escape"){Ke&&qi();return}if(i.code==="KeyR"&&Ia){ys(),i.preventDefault();return}Ke&&["KeyW","KeyA","KeyS","KeyD","ArrowUp","ArrowDown","ArrowLeft","ArrowRight","ShiftLeft","ShiftRight"].includes(i.code)&&(De.add(i.code),i.preventDefault())});window.addEventListener("keyup",i=>De.delete(i.code));window.addEventListener("blur",()=>{De.clear(),Ke&&qi()});document.addEventListener("visibilitychange",()=>{De.clear(),Ii=performance.now(),document.hidden&&Ke&&qi()});window.addEventListener("resize",()=>{Ve&&(Dn.aspect=window.innerWidth/window.innerHeight,Dn.updateProjectionMatrix(),Na(jc))});In.addEventListener("webglcontextlost",i=>{i.preventDefault(),qi(),Ss("The graphics context was interrupted. Reload this page to restore the room.")});setTimeout(()=>{try{Og()}catch(i){_e("loading").textContent="The room could not load.",Ss(`${i.message}. A desktop browser with WebGL 2 is required.`),console.error(i)}},60);

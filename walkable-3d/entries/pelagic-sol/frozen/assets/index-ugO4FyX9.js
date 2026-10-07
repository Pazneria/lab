(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ha="180",ch=0,Ha=1,hh=2,Ql=1,ec=2,wn=3,Yn=0,Ot=1,qt=2,Wn=0,Ui=1,Va=2,Ga=3,Wa=4,uh=5,si=100,fh=101,dh=102,ph=103,mh=104,gh=200,_h=201,vh=202,xh=203,uo=204,fo=205,Mh=206,Sh=207,yh=208,Eh=209,Th=210,bh=211,Ah=212,wh=213,Rh=214,po=0,mo=1,go=2,Oi=3,_o=4,vo=5,xo=6,Mo=7,ua=0,Ch=1,Ph=2,Xn=0,Lh=1,Ih=2,Dh=3,tc=4,Uh=5,Nh=6,Fh=7,nc=300,Bi=301,zi=302,So=303,yo=304,vs=306,us=1e3,ai=1001,Eo=1002,Jt=1003,Oh=1004,Ir=1005,pn=1006,As=1007,li=1008,_n=1009,ic=1010,rc=1011,gr=1012,fa=1013,ci=1014,mn=1015,Ar=1016,da=1017,pa=1018,_r=1020,sc=35902,oc=35899,ac=1021,lc=1022,ln=1023,vr=1026,xr=1027,ma=1028,ga=1029,cc=1030,_a=1031,va=1033,os=33776,as=33777,ls=33778,cs=33779,To=35840,bo=35841,Ao=35842,wo=35843,Ro=36196,Co=37492,Po=37496,Lo=37808,Io=37809,Do=37810,Uo=37811,No=37812,Fo=37813,Oo=37814,Bo=37815,zo=37816,ko=37817,Ho=37818,Vo=37819,Go=37820,Wo=37821,Xo=36492,qo=36494,Yo=36495,Jo=36283,Zo=36284,Ko=36285,$o=36286,Bh=3200,zh=3201,xa=0,kh=1,kn="",Ut="srgb",ki="srgb-linear",fs="linear",at="srgb",gi=7680,Xa=519,Hh=512,Vh=513,Gh=514,hc=515,Wh=516,Xh=517,qh=518,Yh=519,qa=35044,Jh=35048,Ya="300 es",gn=2e3,ds=2001;class Wi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const r=n[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const r=n.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const Rt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ws=Math.PI/180,ps=180/Math.PI;function Xi(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Rt[i&255]+Rt[i>>8&255]+Rt[i>>16&255]+Rt[i>>24&255]+"-"+Rt[e&255]+Rt[e>>8&255]+"-"+Rt[e>>16&15|64]+Rt[e>>24&255]+"-"+Rt[t&63|128]+Rt[t>>8&255]+"-"+Rt[t>>16&255]+Rt[t>>24&255]+Rt[n&255]+Rt[n>>8&255]+Rt[n>>16&255]+Rt[n>>24&255]).toLowerCase()}function qe(i,e,t){return Math.max(e,Math.min(t,i))}function Zh(i,e){return(i%e+e)%e}function Rs(i,e,t){return(1-t)*i+t*e}function $i(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function kt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}class ue{constructor(e=0,t=0){ue.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=qe(this.x,e.x,t.x),this.y=qe(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=qe(this.x,e,t),this.y=qe(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(qe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(qe(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*n-o*r+e.x,this.y=s*r+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class qi{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,o,a){let c=n[r+0],l=n[r+1],h=n[r+2],f=n[r+3];const p=s[o+0],u=s[o+1],g=s[o+2],_=s[o+3];if(a===0){e[t+0]=c,e[t+1]=l,e[t+2]=h,e[t+3]=f;return}if(a===1){e[t+0]=p,e[t+1]=u,e[t+2]=g,e[t+3]=_;return}if(f!==_||c!==p||l!==u||h!==g){let m=1-a;const d=c*p+l*u+h*g+f*_,b=d>=0?1:-1,y=1-d*d;if(y>Number.EPSILON){const C=Math.sqrt(y),w=Math.atan2(C,d*b);m=Math.sin(m*w)/C,a=Math.sin(a*w)/C}const x=a*b;if(c=c*m+p*x,l=l*m+u*x,h=h*m+g*x,f=f*m+_*x,m===1-a){const C=1/Math.sqrt(c*c+l*l+h*h+f*f);c*=C,l*=C,h*=C,f*=C}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=f}static multiplyQuaternionsFlat(e,t,n,r,s,o){const a=n[r],c=n[r+1],l=n[r+2],h=n[r+3],f=s[o],p=s[o+1],u=s[o+2],g=s[o+3];return e[t]=a*g+h*f+c*u-l*p,e[t+1]=c*g+h*p+l*f-a*u,e[t+2]=l*g+h*u+a*p-c*f,e[t+3]=h*g-a*f-c*p-l*u,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(r/2),f=a(s/2),p=c(n/2),u=c(r/2),g=c(s/2);switch(o){case"XYZ":this._x=p*h*f+l*u*g,this._y=l*u*f-p*h*g,this._z=l*h*g+p*u*f,this._w=l*h*f-p*u*g;break;case"YXZ":this._x=p*h*f+l*u*g,this._y=l*u*f-p*h*g,this._z=l*h*g-p*u*f,this._w=l*h*f+p*u*g;break;case"ZXY":this._x=p*h*f-l*u*g,this._y=l*u*f+p*h*g,this._z=l*h*g+p*u*f,this._w=l*h*f-p*u*g;break;case"ZYX":this._x=p*h*f-l*u*g,this._y=l*u*f+p*h*g,this._z=l*h*g-p*u*f,this._w=l*h*f+p*u*g;break;case"YZX":this._x=p*h*f+l*u*g,this._y=l*u*f+p*h*g,this._z=l*h*g-p*u*f,this._w=l*h*f-p*u*g;break;case"XZY":this._x=p*h*f-l*u*g,this._y=l*u*f-p*h*g,this._z=l*h*g+p*u*f,this._w=l*h*f+p*u*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],r=t[4],s=t[8],o=t[1],a=t[5],c=t[9],l=t[2],h=t[6],f=t[10],p=n+a+f;if(p>0){const u=.5/Math.sqrt(p+1);this._w=.25/u,this._x=(h-c)*u,this._y=(s-l)*u,this._z=(o-r)*u}else if(n>a&&n>f){const u=2*Math.sqrt(1+n-a-f);this._w=(h-c)/u,this._x=.25*u,this._y=(r+o)/u,this._z=(s+l)/u}else if(a>f){const u=2*Math.sqrt(1+a-n-f);this._w=(s-l)/u,this._x=(r+o)/u,this._y=.25*u,this._z=(c+h)/u}else{const u=2*Math.sqrt(1+f-n-a);this._w=(o-r)/u,this._x=(s+l)/u,this._y=(c+h)/u,this._z=.25*u}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(qe(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,r=e._y,s=e._z,o=e._w,a=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+o*a+r*l-s*c,this._y=r*h+o*c+s*a-n*l,this._z=s*h+o*l+n*c-r*a,this._w=o*h-n*a-r*c-s*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,r=this._y,s=this._z,o=this._w;let a=o*e._w+n*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=r,this._z=s,this;const c=1-a*a;if(c<=Number.EPSILON){const u=1-t;return this._w=u*o+t*this._w,this._x=u*n+t*this._x,this._y=u*r+t*this._y,this._z=u*s+t*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,a),f=Math.sin((1-t)*h)/l,p=Math.sin(t*h)/l;return this._w=o*f+this._w*p,this._x=n*f+this._x*p,this._y=r*f+this._y*p,this._z=s*f+this._z*p,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class L{constructor(e=0,t=0,n=0){L.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Ja.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ja.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=e.elements,o=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*o,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*o,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,r=this.z,s=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*r-a*n),h=2*(a*t-s*r),f=2*(s*n-o*t);return this.x=t+c*l+o*f-a*h,this.y=n+c*h+a*l-s*f,this.z=r+c*f+s*h-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=qe(this.x,e.x,t.x),this.y=qe(this.y,e.y,t.y),this.z=qe(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=qe(this.x,e,t),this.y=qe(this.y,e,t),this.z=qe(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(qe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,r=e.y,s=e.z,o=t.x,a=t.y,c=t.z;return this.x=r*c-s*a,this.y=s*o-n*c,this.z=n*a-r*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Cs.copy(this).projectOnVector(e),this.sub(Cs)}reflect(e){return this.sub(Cs.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(qe(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Cs=new L,Ja=new qi;class Ge{constructor(e,t,n,r,s,o,a,c,l){Ge.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,o,a,c,l)}set(e,t,n,r,s,o,a,c,l){const h=this.elements;return h[0]=e,h[1]=r,h[2]=a,h[3]=t,h[4]=s,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],f=n[7],p=n[2],u=n[5],g=n[8],_=r[0],m=r[3],d=r[6],b=r[1],y=r[4],x=r[7],C=r[2],w=r[5],P=r[8];return s[0]=o*_+a*b+c*C,s[3]=o*m+a*y+c*w,s[6]=o*d+a*x+c*P,s[1]=l*_+h*b+f*C,s[4]=l*m+h*y+f*w,s[7]=l*d+h*x+f*P,s[2]=p*_+u*b+g*C,s[5]=p*m+u*y+g*w,s[8]=p*d+u*x+g*P,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8];return t*o*h-t*a*l-n*s*h+n*a*c+r*s*l-r*o*c}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],f=h*o-a*l,p=a*c-h*s,u=l*s-o*c,g=t*f+n*p+r*u;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=f*_,e[1]=(r*l-h*n)*_,e[2]=(a*n-r*o)*_,e[3]=p*_,e[4]=(h*t-r*c)*_,e[5]=(r*s-a*t)*_,e[6]=u*_,e[7]=(n*c-l*t)*_,e[8]=(o*t-n*s)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,o,a){const c=Math.cos(s),l=Math.sin(s);return this.set(n*c,n*l,-n*(c*o+l*a)+o+e,-r*l,r*c,-r*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Ps.makeScale(e,t)),this}rotate(e){return this.premultiply(Ps.makeRotation(-e)),this}translate(e,t){return this.premultiply(Ps.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Ps=new Ge;function uc(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function ms(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Kh(){const i=ms("canvas");return i.style.display="block",i}const Za={};function Mr(i){i in Za||(Za[i]=!0,console.warn(i))}function $h(i,e,t){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}const Ka=new Ge().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),$a=new Ge().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function jh(){const i={enabled:!0,workingColorSpace:ki,spaces:{},convert:function(r,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===at&&(r.r=Cn(r.r),r.g=Cn(r.g),r.b=Cn(r.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===at&&(r.r=Ni(r.r),r.g=Ni(r.g),r.b=Ni(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===kn?fs:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,o){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Mr("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Mr("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[ki]:{primaries:e,whitePoint:n,transfer:fs,toXYZ:Ka,fromXYZ:$a,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Ut},outputColorSpaceConfig:{drawingBufferColorSpace:Ut}},[Ut]:{primaries:e,whitePoint:n,transfer:at,toXYZ:Ka,fromXYZ:$a,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Ut}}}),i}const tt=jh();function Cn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Ni(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let _i;class Qh{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{_i===void 0&&(_i=ms("canvas")),_i.width=e.width,_i.height=e.height;const r=_i.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),n=_i}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=ms("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=Cn(s[o]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Cn(t[n]/255)*255):t[n]=Cn(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let eu=0;class Ma{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:eu++}),this.uuid=Xi(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(Ls(r[o].image)):s.push(Ls(r[o]))}else s=Ls(r);n.url=s}return t||(e.images[this.uuid]=n),n}}function Ls(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Qh.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let tu=0;const Is=new L;class Pt extends Wi{constructor(e=Pt.DEFAULT_IMAGE,t=Pt.DEFAULT_MAPPING,n=ai,r=ai,s=pn,o=li,a=ln,c=_n,l=Pt.DEFAULT_ANISOTROPY,h=kn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:tu++}),this.uuid=Xi(),this.name="",this.source=new Ma(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new ue(0,0),this.repeat=new ue(1,1),this.center=new ue(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ge,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Is).x}get height(){return this.source.getSize(Is).y}get depth(){return this.source.getSize(Is).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==nc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case us:e.x=e.x-Math.floor(e.x);break;case ai:e.x=e.x<0?0:1;break;case Eo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case us:e.y=e.y-Math.floor(e.y);break;case ai:e.y=e.y<0?0:1;break;case Eo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Pt.DEFAULT_IMAGE=null;Pt.DEFAULT_MAPPING=nc;Pt.DEFAULT_ANISOTROPY=1;class lt{constructor(e=0,t=0,n=0,r=1){lt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*r+o[12]*s,this.y=o[1]*t+o[5]*n+o[9]*r+o[13]*s,this.z=o[2]*t+o[6]*n+o[10]*r+o[14]*s,this.w=o[3]*t+o[7]*n+o[11]*r+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s;const c=e.elements,l=c[0],h=c[4],f=c[8],p=c[1],u=c[5],g=c[9],_=c[2],m=c[6],d=c[10];if(Math.abs(h-p)<.01&&Math.abs(f-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+p)<.1&&Math.abs(f+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+u+d-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const y=(l+1)/2,x=(u+1)/2,C=(d+1)/2,w=(h+p)/4,P=(f+_)/4,D=(g+m)/4;return y>x&&y>C?y<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(y),r=w/n,s=P/n):x>C?x<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(x),n=w/r,s=D/r):C<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(C),n=P/s,r=D/s),this.set(n,r,s,t),this}let b=Math.sqrt((m-g)*(m-g)+(f-_)*(f-_)+(p-h)*(p-h));return Math.abs(b)<.001&&(b=1),this.x=(m-g)/b,this.y=(f-_)/b,this.z=(p-h)/b,this.w=Math.acos((l+u+d-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=qe(this.x,e.x,t.x),this.y=qe(this.y,e.y,t.y),this.z=qe(this.z,e.z,t.z),this.w=qe(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=qe(this.x,e,t),this.y=qe(this.y,e,t),this.z=qe(this.z,e,t),this.w=qe(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(qe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class nu extends Wi{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:pn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new lt(0,0,e,t),this.scissorTest=!1,this.viewport=new lt(0,0,e,t);const r={width:e,height:t,depth:n.depth},s=new Pt(r);this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:pn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isArrayTexture=this.textures[r].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new Ma(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class hi extends nu{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class fc extends Pt{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Jt,this.minFilter=Jt,this.wrapR=ai,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class iu extends Pt{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Jt,this.minFilter=Jt,this.wrapR=ai,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class di{constructor(e=new L(1/0,1/0,1/0),t=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(rn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(rn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=rn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,rn):rn.fromBufferAttribute(s,o),rn.applyMatrix4(e.matrixWorld),this.expandByPoint(rn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Dr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Dr.copy(n.boundingBox)),Dr.applyMatrix4(e.matrixWorld),this.union(Dr)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,rn),rn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ji),Ur.subVectors(this.max,ji),vi.subVectors(e.a,ji),xi.subVectors(e.b,ji),Mi.subVectors(e.c,ji),Dn.subVectors(xi,vi),Un.subVectors(Mi,xi),$n.subVectors(vi,Mi);let t=[0,-Dn.z,Dn.y,0,-Un.z,Un.y,0,-$n.z,$n.y,Dn.z,0,-Dn.x,Un.z,0,-Un.x,$n.z,0,-$n.x,-Dn.y,Dn.x,0,-Un.y,Un.x,0,-$n.y,$n.x,0];return!Ds(t,vi,xi,Mi,Ur)||(t=[1,0,0,0,1,0,0,0,1],!Ds(t,vi,xi,Mi,Ur))?!1:(Nr.crossVectors(Dn,Un),t=[Nr.x,Nr.y,Nr.z],Ds(t,vi,xi,Mi,Ur))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,rn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(rn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Sn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Sn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Sn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Sn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Sn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Sn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Sn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Sn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Sn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Sn=[new L,new L,new L,new L,new L,new L,new L,new L],rn=new L,Dr=new di,vi=new L,xi=new L,Mi=new L,Dn=new L,Un=new L,$n=new L,ji=new L,Ur=new L,Nr=new L,jn=new L;function Ds(i,e,t,n,r){for(let s=0,o=i.length-3;s<=o;s+=3){jn.fromArray(i,s);const a=r.x*Math.abs(jn.x)+r.y*Math.abs(jn.y)+r.z*Math.abs(jn.z),c=e.dot(jn),l=t.dot(jn),h=n.dot(jn);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}const ru=new di,Qi=new L,Us=new L;class Yi{constructor(e=new L,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):ru.setFromPoints(e).getCenter(n);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Qi.subVectors(e,this.center);const t=Qi.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(Qi,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Us.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Qi.copy(e.center).add(Us)),this.expandByPoint(Qi.copy(e.center).sub(Us))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const yn=new L,Ns=new L,Fr=new L,Nn=new L,Fs=new L,Or=new L,Os=new L;class dc{constructor(e=new L,t=new L(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,yn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=yn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(yn.copy(this.origin).addScaledVector(this.direction,t),yn.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Ns.copy(e).add(t).multiplyScalar(.5),Fr.copy(t).sub(e).normalize(),Nn.copy(this.origin).sub(Ns);const s=e.distanceTo(t)*.5,o=-this.direction.dot(Fr),a=Nn.dot(this.direction),c=-Nn.dot(Fr),l=Nn.lengthSq(),h=Math.abs(1-o*o);let f,p,u,g;if(h>0)if(f=o*c-a,p=o*a-c,g=s*h,f>=0)if(p>=-g)if(p<=g){const _=1/h;f*=_,p*=_,u=f*(f+o*p+2*a)+p*(o*f+p+2*c)+l}else p=s,f=Math.max(0,-(o*p+a)),u=-f*f+p*(p+2*c)+l;else p=-s,f=Math.max(0,-(o*p+a)),u=-f*f+p*(p+2*c)+l;else p<=-g?(f=Math.max(0,-(-o*s+a)),p=f>0?-s:Math.min(Math.max(-s,-c),s),u=-f*f+p*(p+2*c)+l):p<=g?(f=0,p=Math.min(Math.max(-s,-c),s),u=p*(p+2*c)+l):(f=Math.max(0,-(o*s+a)),p=f>0?s:Math.min(Math.max(-s,-c),s),u=-f*f+p*(p+2*c)+l);else p=o>0?-s:s,f=Math.max(0,-(o*p+a)),u=-f*f+p*(p+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(Ns).addScaledVector(Fr,p),u}intersectSphere(e,t){yn.subVectors(e.center,this.origin);const n=yn.dot(this.direction),r=yn.dot(yn)-n*n,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,o,a,c;const l=1/this.direction.x,h=1/this.direction.y,f=1/this.direction.z,p=this.origin;return l>=0?(n=(e.min.x-p.x)*l,r=(e.max.x-p.x)*l):(n=(e.max.x-p.x)*l,r=(e.min.x-p.x)*l),h>=0?(s=(e.min.y-p.y)*h,o=(e.max.y-p.y)*h):(s=(e.max.y-p.y)*h,o=(e.min.y-p.y)*h),n>o||s>r||((s>n||isNaN(n))&&(n=s),(o<r||isNaN(r))&&(r=o),f>=0?(a=(e.min.z-p.z)*f,c=(e.max.z-p.z)*f):(a=(e.max.z-p.z)*f,c=(e.min.z-p.z)*f),n>c||a>r)||((a>n||n!==n)&&(n=a),(c<r||r!==r)&&(r=c),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,yn)!==null}intersectTriangle(e,t,n,r,s){Fs.subVectors(t,e),Or.subVectors(n,e),Os.crossVectors(Fs,Or);let o=this.direction.dot(Os),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Nn.subVectors(this.origin,e);const c=a*this.direction.dot(Or.crossVectors(Nn,Or));if(c<0)return null;const l=a*this.direction.dot(Fs.cross(Nn));if(l<0||c+l>o)return null;const h=-a*Nn.dot(Os);return h<0?null:this.at(h/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ht{constructor(e,t,n,r,s,o,a,c,l,h,f,p,u,g,_,m){ht.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,o,a,c,l,h,f,p,u,g,_,m)}set(e,t,n,r,s,o,a,c,l,h,f,p,u,g,_,m){const d=this.elements;return d[0]=e,d[4]=t,d[8]=n,d[12]=r,d[1]=s,d[5]=o,d[9]=a,d[13]=c,d[2]=l,d[6]=h,d[10]=f,d[14]=p,d[3]=u,d[7]=g,d[11]=_,d[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ht().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,r=1/Si.setFromMatrixColumn(e,0).length(),s=1/Si.setFromMatrixColumn(e,1).length(),o=1/Si.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,r=e.y,s=e.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(r),l=Math.sin(r),h=Math.cos(s),f=Math.sin(s);if(e.order==="XYZ"){const p=o*h,u=o*f,g=a*h,_=a*f;t[0]=c*h,t[4]=-c*f,t[8]=l,t[1]=u+g*l,t[5]=p-_*l,t[9]=-a*c,t[2]=_-p*l,t[6]=g+u*l,t[10]=o*c}else if(e.order==="YXZ"){const p=c*h,u=c*f,g=l*h,_=l*f;t[0]=p+_*a,t[4]=g*a-u,t[8]=o*l,t[1]=o*f,t[5]=o*h,t[9]=-a,t[2]=u*a-g,t[6]=_+p*a,t[10]=o*c}else if(e.order==="ZXY"){const p=c*h,u=c*f,g=l*h,_=l*f;t[0]=p-_*a,t[4]=-o*f,t[8]=g+u*a,t[1]=u+g*a,t[5]=o*h,t[9]=_-p*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){const p=o*h,u=o*f,g=a*h,_=a*f;t[0]=c*h,t[4]=g*l-u,t[8]=p*l+_,t[1]=c*f,t[5]=_*l+p,t[9]=u*l-g,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){const p=o*c,u=o*l,g=a*c,_=a*l;t[0]=c*h,t[4]=_-p*f,t[8]=g*f+u,t[1]=f,t[5]=o*h,t[9]=-a*h,t[2]=-l*h,t[6]=u*f+g,t[10]=p-_*f}else if(e.order==="XZY"){const p=o*c,u=o*l,g=a*c,_=a*l;t[0]=c*h,t[4]=-f,t[8]=l*h,t[1]=p*f+_,t[5]=o*h,t[9]=u*f-g,t[2]=g*f-u,t[6]=a*h,t[10]=_*f+p}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(su,e,ou)}lookAt(e,t,n){const r=this.elements;return Wt.subVectors(e,t),Wt.lengthSq()===0&&(Wt.z=1),Wt.normalize(),Fn.crossVectors(n,Wt),Fn.lengthSq()===0&&(Math.abs(n.z)===1?Wt.x+=1e-4:Wt.z+=1e-4,Wt.normalize(),Fn.crossVectors(n,Wt)),Fn.normalize(),Br.crossVectors(Wt,Fn),r[0]=Fn.x,r[4]=Br.x,r[8]=Wt.x,r[1]=Fn.y,r[5]=Br.y,r[9]=Wt.y,r[2]=Fn.z,r[6]=Br.z,r[10]=Wt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],f=n[5],p=n[9],u=n[13],g=n[2],_=n[6],m=n[10],d=n[14],b=n[3],y=n[7],x=n[11],C=n[15],w=r[0],P=r[4],D=r[8],T=r[12],S=r[1],I=r[5],B=r[9],H=r[13],J=r[2],G=r[6],Y=r[10],ee=r[14],W=r[3],pe=r[7],Me=r[11],Ee=r[15];return s[0]=o*w+a*S+c*J+l*W,s[4]=o*P+a*I+c*G+l*pe,s[8]=o*D+a*B+c*Y+l*Me,s[12]=o*T+a*H+c*ee+l*Ee,s[1]=h*w+f*S+p*J+u*W,s[5]=h*P+f*I+p*G+u*pe,s[9]=h*D+f*B+p*Y+u*Me,s[13]=h*T+f*H+p*ee+u*Ee,s[2]=g*w+_*S+m*J+d*W,s[6]=g*P+_*I+m*G+d*pe,s[10]=g*D+_*B+m*Y+d*Me,s[14]=g*T+_*H+m*ee+d*Ee,s[3]=b*w+y*S+x*J+C*W,s[7]=b*P+y*I+x*G+C*pe,s[11]=b*D+y*B+x*Y+C*Me,s[15]=b*T+y*H+x*ee+C*Ee,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],o=e[1],a=e[5],c=e[9],l=e[13],h=e[2],f=e[6],p=e[10],u=e[14],g=e[3],_=e[7],m=e[11],d=e[15];return g*(+s*c*f-r*l*f-s*a*p+n*l*p+r*a*u-n*c*u)+_*(+t*c*u-t*l*p+s*o*p-r*o*u+r*l*h-s*c*h)+m*(+t*l*f-t*a*u-s*o*f+n*o*u+s*a*h-n*l*h)+d*(-r*a*h-t*c*f+t*a*p+r*o*f-n*o*p+n*c*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],f=e[9],p=e[10],u=e[11],g=e[12],_=e[13],m=e[14],d=e[15],b=f*m*l-_*p*l+_*c*u-a*m*u-f*c*d+a*p*d,y=g*p*l-h*m*l-g*c*u+o*m*u+h*c*d-o*p*d,x=h*_*l-g*f*l+g*a*u-o*_*u-h*a*d+o*f*d,C=g*f*c-h*_*c-g*a*p+o*_*p+h*a*m-o*f*m,w=t*b+n*y+r*x+s*C;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const P=1/w;return e[0]=b*P,e[1]=(_*p*s-f*m*s-_*r*u+n*m*u+f*r*d-n*p*d)*P,e[2]=(a*m*s-_*c*s+_*r*l-n*m*l-a*r*d+n*c*d)*P,e[3]=(f*c*s-a*p*s-f*r*l+n*p*l+a*r*u-n*c*u)*P,e[4]=y*P,e[5]=(h*m*s-g*p*s+g*r*u-t*m*u-h*r*d+t*p*d)*P,e[6]=(g*c*s-o*m*s-g*r*l+t*m*l+o*r*d-t*c*d)*P,e[7]=(o*p*s-h*c*s+h*r*l-t*p*l-o*r*u+t*c*u)*P,e[8]=x*P,e[9]=(g*f*s-h*_*s-g*n*u+t*_*u+h*n*d-t*f*d)*P,e[10]=(o*_*s-g*a*s+g*n*l-t*_*l-o*n*d+t*a*d)*P,e[11]=(h*a*s-o*f*s-h*n*l+t*f*l+o*n*u-t*a*u)*P,e[12]=C*P,e[13]=(h*_*r-g*f*r+g*n*p-t*_*p-h*n*m+t*f*m)*P,e[14]=(g*a*r-o*_*r-g*n*c+t*_*c+o*n*m-t*a*m)*P,e[15]=(o*f*r-h*a*r+h*n*c-t*f*c-o*n*p+t*a*p)*P,this}scale(e){const t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),r=Math.sin(t),s=1-n,o=e.x,a=e.y,c=e.z,l=s*o,h=s*a;return this.set(l*o+n,l*a-r*c,l*c+r*a,0,l*a+r*c,h*a+n,h*c-r*o,0,l*c-r*a,h*c+r*o,s*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,o){return this.set(1,n,s,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){const r=this.elements,s=t._x,o=t._y,a=t._z,c=t._w,l=s+s,h=o+o,f=a+a,p=s*l,u=s*h,g=s*f,_=o*h,m=o*f,d=a*f,b=c*l,y=c*h,x=c*f,C=n.x,w=n.y,P=n.z;return r[0]=(1-(_+d))*C,r[1]=(u+x)*C,r[2]=(g-y)*C,r[3]=0,r[4]=(u-x)*w,r[5]=(1-(p+d))*w,r[6]=(m+b)*w,r[7]=0,r[8]=(g+y)*P,r[9]=(m-b)*P,r[10]=(1-(p+_))*P,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){const r=this.elements;let s=Si.set(r[0],r[1],r[2]).length();const o=Si.set(r[4],r[5],r[6]).length(),a=Si.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],sn.copy(this);const l=1/s,h=1/o,f=1/a;return sn.elements[0]*=l,sn.elements[1]*=l,sn.elements[2]*=l,sn.elements[4]*=h,sn.elements[5]*=h,sn.elements[6]*=h,sn.elements[8]*=f,sn.elements[9]*=f,sn.elements[10]*=f,t.setFromRotationMatrix(sn),n.x=s,n.y=o,n.z=a,this}makePerspective(e,t,n,r,s,o,a=gn,c=!1){const l=this.elements,h=2*s/(t-e),f=2*s/(n-r),p=(t+e)/(t-e),u=(n+r)/(n-r);let g,_;if(c)g=s/(o-s),_=o*s/(o-s);else if(a===gn)g=-(o+s)/(o-s),_=-2*o*s/(o-s);else if(a===ds)g=-o/(o-s),_=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=p,l[12]=0,l[1]=0,l[5]=f,l[9]=u,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,r,s,o,a=gn,c=!1){const l=this.elements,h=2/(t-e),f=2/(n-r),p=-(t+e)/(t-e),u=-(n+r)/(n-r);let g,_;if(c)g=1/(o-s),_=o/(o-s);else if(a===gn)g=-2/(o-s),_=-(o+s)/(o-s);else if(a===ds)g=-1/(o-s),_=-s/(o-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=0,l[12]=p,l[1]=0,l[5]=f,l[9]=0,l[13]=u,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Si=new L,sn=new ht,su=new L(0,0,0),ou=new L(1,1,1),Fn=new L,Br=new L,Wt=new L,ja=new ht,Qa=new qi;class cn{constructor(e=0,t=0,n=0,r=cn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],c=r[1],l=r[5],h=r[9],f=r[2],p=r[6],u=r[10];switch(t){case"XYZ":this._y=Math.asin(qe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,u),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(p,l),this._z=0);break;case"YXZ":this._x=Math.asin(-qe(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,u),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(qe(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(-f,u),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-qe(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(p,u),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(qe(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(a,u));break;case"XZY":this._z=Math.asin(-qe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(p,l),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-h,u),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return ja.makeRotationFromQuaternion(e),this.setFromRotationMatrix(ja,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Qa.setFromEuler(this),this.setFromQuaternion(Qa,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}cn.DEFAULT_ORDER="XYZ";class pc{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let au=0;const el=new L,yi=new qi,En=new ht,zr=new L,er=new L,lu=new L,cu=new qi,tl=new L(1,0,0),nl=new L(0,1,0),il=new L(0,0,1),rl={type:"added"},hu={type:"removed"},Ei={type:"childadded",child:null},Bs={type:"childremoved",child:null};class pt extends Wi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:au++}),this.uuid=Xi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=pt.DEFAULT_UP.clone();const e=new L,t=new cn,n=new qi,r=new L(1,1,1);function s(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new ht},normalMatrix:{value:new Ge}}),this.matrix=new ht,this.matrixWorld=new ht,this.matrixAutoUpdate=pt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=pt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new pc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return yi.setFromAxisAngle(e,t),this.quaternion.multiply(yi),this}rotateOnWorldAxis(e,t){return yi.setFromAxisAngle(e,t),this.quaternion.premultiply(yi),this}rotateX(e){return this.rotateOnAxis(tl,e)}rotateY(e){return this.rotateOnAxis(nl,e)}rotateZ(e){return this.rotateOnAxis(il,e)}translateOnAxis(e,t){return el.copy(e).applyQuaternion(this.quaternion),this.position.add(el.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(tl,e)}translateY(e){return this.translateOnAxis(nl,e)}translateZ(e){return this.translateOnAxis(il,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(En.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?zr.copy(e):zr.set(e,t,n);const r=this.parent;this.updateWorldMatrix(!0,!1),er.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?En.lookAt(er,zr,this.up):En.lookAt(zr,er,this.up),this.quaternion.setFromRotationMatrix(En),r&&(En.extractRotation(r.matrixWorld),yi.setFromRotationMatrix(En),this.quaternion.premultiply(yi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(rl),Ei.child=e,this.dispatchEvent(Ei),Ei.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(hu),Bs.child=e,this.dispatchEvent(Bs),Bs.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),En.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),En.multiply(e.parent.matrixWorld)),e.applyMatrix4(En),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(rl),Ei.child=e,this.dispatchEvent(Ei),Ei.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(er,e,lu),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(er,cu,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(a=>({...a})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const f=c[l];s(e.shapes,f)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(s(e.materials,this.material[c]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];r.animations.push(s(e.animations,c))}}if(t){const a=o(e.geometries),c=o(e.materials),l=o(e.textures),h=o(e.images),f=o(e.shapes),p=o(e.skeletons),u=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),f.length>0&&(n.shapes=f),p.length>0&&(n.skeletons=p),u.length>0&&(n.animations=u),g.length>0&&(n.nodes=g)}return n.object=r,n;function o(a){const c=[];for(const l in a){const h=a[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const r=e.children[n];this.add(r.clone())}return this}}pt.DEFAULT_UP=new L(0,1,0);pt.DEFAULT_MATRIX_AUTO_UPDATE=!0;pt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const on=new L,Tn=new L,zs=new L,bn=new L,Ti=new L,bi=new L,sl=new L,ks=new L,Hs=new L,Vs=new L,Gs=new lt,Ws=new lt,Xs=new lt;class an{constructor(e=new L,t=new L,n=new L){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),on.subVectors(e,t),r.cross(on);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){on.subVectors(r,t),Tn.subVectors(n,t),zs.subVectors(e,t);const o=on.dot(on),a=on.dot(Tn),c=on.dot(zs),l=Tn.dot(Tn),h=Tn.dot(zs),f=o*l-a*a;if(f===0)return s.set(0,0,0),null;const p=1/f,u=(l*c-a*h)*p,g=(o*h-a*c)*p;return s.set(1-u-g,g,u)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,bn)===null?!1:bn.x>=0&&bn.y>=0&&bn.x+bn.y<=1}static getInterpolation(e,t,n,r,s,o,a,c){return this.getBarycoord(e,t,n,r,bn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,bn.x),c.addScaledVector(o,bn.y),c.addScaledVector(a,bn.z),c)}static getInterpolatedAttribute(e,t,n,r,s,o){return Gs.setScalar(0),Ws.setScalar(0),Xs.setScalar(0),Gs.fromBufferAttribute(e,t),Ws.fromBufferAttribute(e,n),Xs.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(Gs,s.x),o.addScaledVector(Ws,s.y),o.addScaledVector(Xs,s.z),o}static isFrontFacing(e,t,n,r){return on.subVectors(n,t),Tn.subVectors(e,t),on.cross(Tn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return on.subVectors(this.c,this.b),Tn.subVectors(this.a,this.b),on.cross(Tn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return an.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return an.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,s){return an.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return an.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return an.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,r=this.b,s=this.c;let o,a;Ti.subVectors(r,n),bi.subVectors(s,n),ks.subVectors(e,n);const c=Ti.dot(ks),l=bi.dot(ks);if(c<=0&&l<=0)return t.copy(n);Hs.subVectors(e,r);const h=Ti.dot(Hs),f=bi.dot(Hs);if(h>=0&&f<=h)return t.copy(r);const p=c*f-h*l;if(p<=0&&c>=0&&h<=0)return o=c/(c-h),t.copy(n).addScaledVector(Ti,o);Vs.subVectors(e,s);const u=Ti.dot(Vs),g=bi.dot(Vs);if(g>=0&&u<=g)return t.copy(s);const _=u*l-c*g;if(_<=0&&l>=0&&g<=0)return a=l/(l-g),t.copy(n).addScaledVector(bi,a);const m=h*g-u*f;if(m<=0&&f-h>=0&&u-g>=0)return sl.subVectors(s,r),a=(f-h)/(f-h+(u-g)),t.copy(r).addScaledVector(sl,a);const d=1/(m+_+p);return o=_*d,a=p*d,t.copy(n).addScaledVector(Ti,o).addScaledVector(bi,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const mc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},On={h:0,s:0,l:0},kr={h:0,s:0,l:0};function qs(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Xe{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Ut){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,tt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=tt.workingColorSpace){return this.r=e,this.g=t,this.b=n,tt.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=tt.workingColorSpace){if(e=Zh(e,1),t=qe(t,0,1),n=qe(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,o=2*n-s;this.r=qs(o,s,e+1/3),this.g=qs(o,s,e),this.b=qs(o,s,e-1/3)}return tt.colorSpaceToWorking(this,r),this}setStyle(e,t=Ut){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Ut){const n=mc[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Cn(e.r),this.g=Cn(e.g),this.b=Cn(e.b),this}copyLinearToSRGB(e){return this.r=Ni(e.r),this.g=Ni(e.g),this.b=Ni(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ut){return tt.workingToColorSpace(Ct.copy(this),e),Math.round(qe(Ct.r*255,0,255))*65536+Math.round(qe(Ct.g*255,0,255))*256+Math.round(qe(Ct.b*255,0,255))}getHexString(e=Ut){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=tt.workingColorSpace){tt.workingToColorSpace(Ct.copy(this),t);const n=Ct.r,r=Ct.g,s=Ct.b,o=Math.max(n,r,s),a=Math.min(n,r,s);let c,l;const h=(a+o)/2;if(a===o)c=0,l=0;else{const f=o-a;switch(l=h<=.5?f/(o+a):f/(2-o-a),o){case n:c=(r-s)/f+(r<s?6:0);break;case r:c=(s-n)/f+2;break;case s:c=(n-r)/f+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=tt.workingColorSpace){return tt.workingToColorSpace(Ct.copy(this),t),e.r=Ct.r,e.g=Ct.g,e.b=Ct.b,e}getStyle(e=Ut){tt.workingToColorSpace(Ct.copy(this),e);const t=Ct.r,n=Ct.g,r=Ct.b;return e!==Ut?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(On),this.setHSL(On.h+e,On.s+t,On.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(On),e.getHSL(kr);const n=Rs(On.h,kr.h,t),r=Rs(On.s,kr.s,t),s=Rs(On.l,kr.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ct=new Xe;Xe.NAMES=mc;let uu=0;class pi extends Wi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:uu++}),this.uuid=Xi(),this.name="",this.type="Material",this.blending=Ui,this.side=Yn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=uo,this.blendDst=fo,this.blendEquation=si,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Xe(0,0,0),this.blendAlpha=0,this.depthFunc=Oi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Xa,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=gi,this.stencilZFail=gi,this.stencilZPass=gi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ui&&(n.blending=this.blending),this.side!==Yn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==uo&&(n.blendSrc=this.blendSrc),this.blendDst!==fo&&(n.blendDst=this.blendDst),this.blendEquation!==si&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Oi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Xa&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==gi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==gi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==gi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const o=[];for(const a in s){const c=s[a];delete c.metadata,o.push(c)}return o}if(t){const s=r(e.textures),o=r(e.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class ui extends pi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Xe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new cn,this.combine=ua,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const yt=new L,Hr=new ue;let fu=0;class en{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:fu++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=qa,this.updateRanges=[],this.gpuType=mn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Hr.fromBufferAttribute(this,t),Hr.applyMatrix3(e),this.setXY(t,Hr.x,Hr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)yt.fromBufferAttribute(this,t),yt.applyMatrix3(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)yt.fromBufferAttribute(this,t),yt.applyMatrix4(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)yt.fromBufferAttribute(this,t),yt.applyNormalMatrix(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)yt.fromBufferAttribute(this,t),yt.transformDirection(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=$i(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=kt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=$i(t,this.array)),t}setX(e,t){return this.normalized&&(t=kt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=$i(t,this.array)),t}setY(e,t){return this.normalized&&(t=kt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=$i(t,this.array)),t}setZ(e,t){return this.normalized&&(t=kt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=$i(t,this.array)),t}setW(e,t){return this.normalized&&(t=kt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=kt(t,this.array),n=kt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=kt(t,this.array),n=kt(n,this.array),r=kt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=kt(t,this.array),n=kt(n,this.array),r=kt(r,this.array),s=kt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==qa&&(e.usage=this.usage),e}}class gc extends en{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class _c extends en{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class nt extends en{constructor(e,t,n){super(new Float32Array(e),t,n)}}let du=0;const $t=new ht,Ys=new pt,Ai=new L,Xt=new di,tr=new di,wt=new L;class Et extends Wi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:du++}),this.uuid=Xi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(uc(e)?_c:gc)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Ge().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return $t.makeRotationFromQuaternion(e),this.applyMatrix4($t),this}rotateX(e){return $t.makeRotationX(e),this.applyMatrix4($t),this}rotateY(e){return $t.makeRotationY(e),this.applyMatrix4($t),this}rotateZ(e){return $t.makeRotationZ(e),this.applyMatrix4($t),this}translate(e,t,n){return $t.makeTranslation(e,t,n),this.applyMatrix4($t),this}scale(e,t,n){return $t.makeScale(e,t,n),this.applyMatrix4($t),this}lookAt(e){return Ys.lookAt(e),Ys.updateMatrix(),this.applyMatrix4(Ys.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ai).negate(),this.translate(Ai.x,Ai.y,Ai.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let r=0,s=e.length;r<s;r++){const o=e[r];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new nt(n,3))}else{const n=Math.min(e.length,t.count);for(let r=0;r<n;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new di);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){const s=t[n];Xt.setFromBufferAttribute(s),this.morphTargetsRelative?(wt.addVectors(this.boundingBox.min,Xt.min),this.boundingBox.expandByPoint(wt),wt.addVectors(this.boundingBox.max,Xt.max),this.boundingBox.expandByPoint(wt)):(this.boundingBox.expandByPoint(Xt.min),this.boundingBox.expandByPoint(Xt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Yi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(e){const n=this.boundingSphere.center;if(Xt.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];tr.setFromBufferAttribute(a),this.morphTargetsRelative?(wt.addVectors(Xt.min,tr.min),Xt.expandByPoint(wt),wt.addVectors(Xt.max,tr.max),Xt.expandByPoint(wt)):(Xt.expandByPoint(tr.min),Xt.expandByPoint(tr.max))}Xt.getCenter(n);let r=0;for(let s=0,o=e.count;s<o;s++)wt.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(wt));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)wt.fromBufferAttribute(a,l),c&&(Ai.fromBufferAttribute(e,l),wt.add(Ai)),r=Math.max(r,n.distanceToSquared(wt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new en(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let D=0;D<n.count;D++)a[D]=new L,c[D]=new L;const l=new L,h=new L,f=new L,p=new ue,u=new ue,g=new ue,_=new L,m=new L;function d(D,T,S){l.fromBufferAttribute(n,D),h.fromBufferAttribute(n,T),f.fromBufferAttribute(n,S),p.fromBufferAttribute(s,D),u.fromBufferAttribute(s,T),g.fromBufferAttribute(s,S),h.sub(l),f.sub(l),u.sub(p),g.sub(p);const I=1/(u.x*g.y-g.x*u.y);isFinite(I)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(f,-u.y).multiplyScalar(I),m.copy(f).multiplyScalar(u.x).addScaledVector(h,-g.x).multiplyScalar(I),a[D].add(_),a[T].add(_),a[S].add(_),c[D].add(m),c[T].add(m),c[S].add(m))}let b=this.groups;b.length===0&&(b=[{start:0,count:e.count}]);for(let D=0,T=b.length;D<T;++D){const S=b[D],I=S.start,B=S.count;for(let H=I,J=I+B;H<J;H+=3)d(e.getX(H+0),e.getX(H+1),e.getX(H+2))}const y=new L,x=new L,C=new L,w=new L;function P(D){C.fromBufferAttribute(r,D),w.copy(C);const T=a[D];y.copy(T),y.sub(C.multiplyScalar(C.dot(T))).normalize(),x.crossVectors(w,T);const I=x.dot(c[D])<0?-1:1;o.setXYZW(D,y.x,y.y,y.z,I)}for(let D=0,T=b.length;D<T;++D){const S=b[D],I=S.start,B=S.count;for(let H=I,J=I+B;H<J;H+=3)P(e.getX(H+0)),P(e.getX(H+1)),P(e.getX(H+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new en(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let p=0,u=n.count;p<u;p++)n.setXYZ(p,0,0,0);const r=new L,s=new L,o=new L,a=new L,c=new L,l=new L,h=new L,f=new L;if(e)for(let p=0,u=e.count;p<u;p+=3){const g=e.getX(p+0),_=e.getX(p+1),m=e.getX(p+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,_),o.fromBufferAttribute(t,m),h.subVectors(o,s),f.subVectors(r,s),h.cross(f),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,m),a.add(h),c.add(h),l.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let p=0,u=t.count;p<u;p+=3)r.fromBufferAttribute(t,p+0),s.fromBufferAttribute(t,p+1),o.fromBufferAttribute(t,p+2),h.subVectors(o,s),f.subVectors(r,s),h.cross(f),n.setXYZ(p+0,h.x,h.y,h.z),n.setXYZ(p+1,h.x,h.y,h.z),n.setXYZ(p+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)wt.fromBufferAttribute(e,t),wt.normalize(),e.setXYZ(t,wt.x,wt.y,wt.z)}toNonIndexed(){function e(a,c){const l=a.array,h=a.itemSize,f=a.normalized,p=new l.constructor(c.length*h);let u=0,g=0;for(let _=0,m=c.length;_<m;_++){a.isInterleavedBufferAttribute?u=c[_]*a.data.stride+a.offset:u=c[_]*h;for(let d=0;d<h;d++)p[g++]=l[u++]}return new en(p,h,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Et,n=this.index.array,r=this.attributes;for(const a in r){const c=r[a],l=e(c,n);t.setAttribute(a,l)}const s=this.morphAttributes;for(const a in s){const c=[],l=s[a];for(let h=0,f=l.length;h<f;h++){const p=l[h],u=e(p,n);c.push(u)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const r={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let f=0,p=l.length;f<p;f++){const u=l[f];h.push(u.toJSON(e.data))}h.length>0&&(r[c]=h,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const r=e.attributes;for(const l in r){const h=r[l];this.setAttribute(l,h.clone(t))}const s=e.morphAttributes;for(const l in s){const h=[],f=s[l];for(let p=0,u=f.length;p<u;p++)h.push(f[p].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let l=0,h=o.length;l<h;l++){const f=o[l];this.addGroup(f.start,f.count,f.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const ol=new ht,Qn=new dc,Vr=new Yi,al=new L,Gr=new L,Wr=new L,Xr=new L,Js=new L,qr=new L,ll=new L,Yr=new L;class st extends pt{constructor(e=new Et,t=new ui){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){qr.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const h=a[c],f=s[c];h!==0&&(Js.fromBufferAttribute(f,e),o?qr.addScaledVector(Js,h):qr.addScaledVector(Js.sub(t),h))}t.add(qr)}return t}raycast(e,t){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Vr.copy(n.boundingSphere),Vr.applyMatrix4(s),Qn.copy(e.ray).recast(e.near),!(Vr.containsPoint(Qn.origin)===!1&&(Qn.intersectSphere(Vr,al)===null||Qn.origin.distanceToSquared(al)>(e.far-e.near)**2))&&(ol.copy(s).invert(),Qn.copy(e.ray).applyMatrix4(ol),!(n.boundingBox!==null&&Qn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Qn)))}_computeIntersections(e,t,n){let r;const s=this.geometry,o=this.material,a=s.index,c=s.attributes.position,l=s.attributes.uv,h=s.attributes.uv1,f=s.attributes.normal,p=s.groups,u=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=p.length;g<_;g++){const m=p[g],d=o[m.materialIndex],b=Math.max(m.start,u.start),y=Math.min(a.count,Math.min(m.start+m.count,u.start+u.count));for(let x=b,C=y;x<C;x+=3){const w=a.getX(x),P=a.getX(x+1),D=a.getX(x+2);r=Jr(this,d,e,n,l,h,f,w,P,D),r&&(r.faceIndex=Math.floor(x/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,u.start),_=Math.min(a.count,u.start+u.count);for(let m=g,d=_;m<d;m+=3){const b=a.getX(m),y=a.getX(m+1),x=a.getX(m+2);r=Jr(this,o,e,n,l,h,f,b,y,x),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,_=p.length;g<_;g++){const m=p[g],d=o[m.materialIndex],b=Math.max(m.start,u.start),y=Math.min(c.count,Math.min(m.start+m.count,u.start+u.count));for(let x=b,C=y;x<C;x+=3){const w=x,P=x+1,D=x+2;r=Jr(this,d,e,n,l,h,f,w,P,D),r&&(r.faceIndex=Math.floor(x/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,u.start),_=Math.min(c.count,u.start+u.count);for(let m=g,d=_;m<d;m+=3){const b=m,y=m+1,x=m+2;r=Jr(this,o,e,n,l,h,f,b,y,x),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}}function pu(i,e,t,n,r,s,o,a){let c;if(e.side===Ot?c=n.intersectTriangle(o,s,r,!0,a):c=n.intersectTriangle(r,s,o,e.side===Yn,a),c===null)return null;Yr.copy(a),Yr.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(Yr);return l<t.near||l>t.far?null:{distance:l,point:Yr.clone(),object:i}}function Jr(i,e,t,n,r,s,o,a,c,l){i.getVertexPosition(a,Gr),i.getVertexPosition(c,Wr),i.getVertexPosition(l,Xr);const h=pu(i,e,t,n,Gr,Wr,Xr,ll);if(h){const f=new L;an.getBarycoord(ll,Gr,Wr,Xr,f),r&&(h.uv=an.getInterpolatedAttribute(r,a,c,l,f,new ue)),s&&(h.uv1=an.getInterpolatedAttribute(s,a,c,l,f,new ue)),o&&(h.normal=an.getInterpolatedAttribute(o,a,c,l,f,new L),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const p={a,b:c,c:l,normal:new L,materialIndex:0};an.getNormal(Gr,Wr,Xr,p.normal),h.face=p,h.barycoord=f}return h}class vn extends Et{constructor(e=1,t=1,n=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const c=[],l=[],h=[],f=[];let p=0,u=0;g("z","y","x",-1,-1,n,t,e,o,s,0),g("z","y","x",1,-1,n,t,-e,o,s,1),g("x","z","y",1,1,e,n,t,r,o,2),g("x","z","y",1,-1,e,n,-t,r,o,3),g("x","y","z",1,-1,e,t,n,r,s,4),g("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(c),this.setAttribute("position",new nt(l,3)),this.setAttribute("normal",new nt(h,3)),this.setAttribute("uv",new nt(f,2));function g(_,m,d,b,y,x,C,w,P,D,T){const S=x/P,I=C/D,B=x/2,H=C/2,J=w/2,G=P+1,Y=D+1;let ee=0,W=0;const pe=new L;for(let Me=0;Me<Y;Me++){const Ee=Me*I-H;for(let He=0;He<G;He++){const Ke=He*S-B;pe[_]=Ke*b,pe[m]=Ee*y,pe[d]=J,l.push(pe.x,pe.y,pe.z),pe[_]=0,pe[m]=0,pe[d]=w>0?1:-1,h.push(pe.x,pe.y,pe.z),f.push(He/P),f.push(1-Me/D),ee+=1}}for(let Me=0;Me<D;Me++)for(let Ee=0;Ee<P;Ee++){const He=p+Ee+G*Me,Ke=p+Ee+G*(Me+1),rt=p+(Ee+1)+G*(Me+1),je=p+(Ee+1)+G*Me;c.push(He,Ke,je),c.push(Ke,rt,je),W+=6}a.addGroup(u,W,T),u+=W,p+=ee}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new vn(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Hi(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const r=i[t][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone():Array.isArray(r)?e[t][n]=r.slice():e[t][n]=r}}return e}function It(i){const e={};for(let t=0;t<i.length;t++){const n=Hi(i[t]);for(const r in n)e[r]=n[r]}return e}function mu(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function vc(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:tt.workingColorSpace}const gu={clone:Hi,merge:It};var _u=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,vu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Jn extends pi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=_u,this.fragmentShader=vu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Hi(e.uniforms),this.uniformsGroups=mu(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class xc extends pt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ht,this.projectionMatrix=new ht,this.projectionMatrixInverse=new ht,this.coordinateSystem=gn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Bn=new L,cl=new ue,hl=new ue;class Ht extends xc{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=ps*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ws*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ps*2*Math.atan(Math.tan(ws*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Bn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Bn.x,Bn.y).multiplyScalar(-e/Bn.z),Bn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Bn.x,Bn.y).multiplyScalar(-e/Bn.z)}getViewSize(e,t){return this.getViewBounds(e,cl,hl),t.subVectors(hl,cl)}setViewOffset(e,t,n,r,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(ws*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;s+=o.offsetX*r/c,t-=o.offsetY*n/l,r*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const wi=-90,Ri=1;class xu extends pt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Ht(wi,Ri,e,t);r.layers=this.layers,this.add(r);const s=new Ht(wi,Ri,e,t);s.layers=this.layers,this.add(s);const o=new Ht(wi,Ri,e,t);o.layers=this.layers,this.add(o);const a=new Ht(wi,Ri,e,t);a.layers=this.layers,this.add(a);const c=new Ht(wi,Ri,e,t);c.layers=this.layers,this.add(c);const l=new Ht(wi,Ri,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,r,s,o,a,c]=t;for(const l of t)this.remove(l);if(e===gn)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===ds)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,c,l,h]=this.children,f=e.getRenderTarget(),p=e.getActiveCubeFace(),u=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,r),e.render(t,s),e.setRenderTarget(n,1,r),e.render(t,o),e.setRenderTarget(n,2,r),e.render(t,a),e.setRenderTarget(n,3,r),e.render(t,c),e.setRenderTarget(n,4,r),e.render(t,l),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,r),e.render(t,h),e.setRenderTarget(f,p,u),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Mc extends Pt{constructor(e=[],t=Bi,n,r,s,o,a,c,l,h){super(e,t,n,r,s,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Mu extends hi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Mc(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new vn(5,5,5),s=new Jn({name:"CubemapFromEquirect",uniforms:Hi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ot,blending:Wn});s.uniforms.tEquirect.value=t;const o=new st(r,s),a=t.minFilter;return t.minFilter===li&&(t.minFilter=pn),new xu(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,r);e.setRenderTarget(s)}}class lr extends pt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Su={type:"move"};class Zs{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new lr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new lr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new lr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,n),d=this._getHandJoint(l,_);m!==null&&(d.matrix.fromArray(m.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=m.radius),d.visible=m!==null}const h=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],p=h.position.distanceTo(f.position),u=.02,g=.005;l.inputState.pinching&&p>u+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&p<=u-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Su)))}return a!==null&&(a.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new lr;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class Sa{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new Xe(e),this.near=t,this.far=n}clone(){return new Sa(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Sc extends pt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new cn,this.environmentIntensity=1,this.environmentRotation=new cn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class yu extends Pt{constructor(e=null,t=1,n=1,r,s,o,a,c,l=Jt,h=Jt,f,p){super(null,o,a,c,l,h,r,s,f,p),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ul extends en{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Ci=new ht,fl=new ht,Zr=[],dl=new di,Eu=new ht,nr=new st,ir=new Yi;class xs extends st{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new ul(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<n;r++)this.setMatrixAt(r,Eu)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new di),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ci),dl.copy(e.boundingBox).applyMatrix4(Ci),this.boundingBox.union(dl)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Yi),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ci),ir.copy(e.boundingSphere).applyMatrix4(Ci),this.boundingSphere.union(ir)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,s=n.length+1,o=e*s+1;for(let a=0;a<n.length;a++)n[a]=r[o+a]}raycast(e,t){const n=this.matrixWorld,r=this.count;if(nr.geometry=this.geometry,nr.material=this.material,nr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ir.copy(this.boundingSphere),ir.applyMatrix4(n),e.ray.intersectsSphere(ir)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,Ci),fl.multiplyMatrices(n,Ci),nr.matrixWorld=fl,nr.raycast(e,Zr);for(let o=0,a=Zr.length;o<a;o++){const c=Zr[o];c.instanceId=s,c.object=this,t.push(c)}Zr.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new ul(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new yu(new Float32Array(r*this.count),r,this.count,ma,mn));const s=this.morphTexture.source.data.data;let o=0;for(let l=0;l<n.length;l++)o+=n[l];const a=this.geometry.morphTargetsRelative?1:1-o,c=r*e;s[c]=a,s.set(n,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Ks=new L,Tu=new L,bu=new Ge;class ii{constructor(e=new L(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const r=Ks.subVectors(n,t).cross(Tu.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Ks),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||bu.getNormalMatrix(e),r=this.coplanarPoint(Ks).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ei=new Yi,Au=new ue(.5,.5),Kr=new L;class ya{constructor(e=new ii,t=new ii,n=new ii,r=new ii,s=new ii,o=new ii){this.planes=[e,t,n,r,s,o]}set(e,t,n,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=gn,n=!1){const r=this.planes,s=e.elements,o=s[0],a=s[1],c=s[2],l=s[3],h=s[4],f=s[5],p=s[6],u=s[7],g=s[8],_=s[9],m=s[10],d=s[11],b=s[12],y=s[13],x=s[14],C=s[15];if(r[0].setComponents(l-o,u-h,d-g,C-b).normalize(),r[1].setComponents(l+o,u+h,d+g,C+b).normalize(),r[2].setComponents(l+a,u+f,d+_,C+y).normalize(),r[3].setComponents(l-a,u-f,d-_,C-y).normalize(),n)r[4].setComponents(c,p,m,x).normalize(),r[5].setComponents(l-c,u-p,d-m,C-x).normalize();else if(r[4].setComponents(l-c,u-p,d-m,C-x).normalize(),t===gn)r[5].setComponents(l+c,u+p,d+m,C+x).normalize();else if(t===ds)r[5].setComponents(c,p,m,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ei.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ei.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ei)}intersectsSprite(e){ei.center.set(0,0,0);const t=Au.distanceTo(e.center);return ei.radius=.7071067811865476+t,ei.applyMatrix4(e.matrixWorld),this.intersectsSphere(ei)}intersectsSphere(e){const t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const r=t[n];if(Kr.x=r.normal.x>0?e.max.x:e.min.x,Kr.y=r.normal.y>0?e.max.y:e.min.y,Kr.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Kr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class yc extends pi{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Xe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const pl=new ht,jo=new dc,$r=new Yi,jr=new L;class wu extends pt{constructor(e=new Et,t=new yc){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),$r.copy(n.boundingSphere),$r.applyMatrix4(r),$r.radius+=s,e.ray.intersectsSphere($r)===!1)return;pl.copy(r).invert(),jo.copy(e.ray).applyMatrix4(pl);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,f=n.attributes.position;if(l!==null){const p=Math.max(0,o.start),u=Math.min(l.count,o.start+o.count);for(let g=p,_=u;g<_;g++){const m=l.getX(g);jr.fromBufferAttribute(f,m),ml(jr,m,c,r,e,t,this)}}else{const p=Math.max(0,o.start),u=Math.min(f.count,o.start+o.count);for(let g=p,_=u;g<_;g++)jr.fromBufferAttribute(f,g),ml(jr,g,c,r,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function ml(i,e,t,n,r,s,o){const a=jo.distanceSqToPoint(i);if(a<t){const c=new L;jo.closestPointToPoint(i,c),c.applyMatrix4(n);const l=r.ray.origin.distanceTo(c);if(l<r.near||l>r.far)return;s.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class Ec extends Pt{constructor(e,t,n,r,s,o,a,c,l){super(e,t,n,r,s,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Tc extends Pt{constructor(e,t,n=ci,r,s,o,a=Jt,c=Jt,l,h=vr,f=1){if(h!==vr&&h!==xr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const p={width:e,height:t,depth:f};super(p,r,s,o,a,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Ma(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class bc extends Pt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Ms extends Et{constructor(e=1,t=1,n=1,r=32,s=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:c};const l=this;r=Math.floor(r),s=Math.floor(s);const h=[],f=[],p=[],u=[];let g=0;const _=[],m=n/2;let d=0;b(),o===!1&&(e>0&&y(!0),t>0&&y(!1)),this.setIndex(h),this.setAttribute("position",new nt(f,3)),this.setAttribute("normal",new nt(p,3)),this.setAttribute("uv",new nt(u,2));function b(){const x=new L,C=new L;let w=0;const P=(t-e)/n;for(let D=0;D<=s;D++){const T=[],S=D/s,I=S*(t-e)+e;for(let B=0;B<=r;B++){const H=B/r,J=H*c+a,G=Math.sin(J),Y=Math.cos(J);C.x=I*G,C.y=-S*n+m,C.z=I*Y,f.push(C.x,C.y,C.z),x.set(G,P,Y).normalize(),p.push(x.x,x.y,x.z),u.push(H,1-S),T.push(g++)}_.push(T)}for(let D=0;D<r;D++)for(let T=0;T<s;T++){const S=_[T][D],I=_[T+1][D],B=_[T+1][D+1],H=_[T][D+1];(e>0||T!==0)&&(h.push(S,I,H),w+=3),(t>0||T!==s-1)&&(h.push(I,B,H),w+=3)}l.addGroup(d,w,0),d+=w}function y(x){const C=g,w=new ue,P=new L;let D=0;const T=x===!0?e:t,S=x===!0?1:-1;for(let B=1;B<=r;B++)f.push(0,m*S,0),p.push(0,S,0),u.push(.5,.5),g++;const I=g;for(let B=0;B<=r;B++){const J=B/r*c+a,G=Math.cos(J),Y=Math.sin(J);P.x=T*Y,P.y=m*S,P.z=T*G,f.push(P.x,P.y,P.z),p.push(0,S,0),w.x=G*.5+.5,w.y=Y*.5*S+.5,u.push(w.x,w.y),g++}for(let B=0;B<r;B++){const H=C+B,J=I+B;x===!0?h.push(J,J+1,H):h.push(J+1,J,H),D+=3}l.addGroup(d,D,x===!0?1:2),d+=D}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ms(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Ea extends Ms{constructor(e=1,t=1,n=32,r=1,s=!1,o=0,a=Math.PI*2){super(0,e,t,n,r,s,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:s,thetaStart:o,thetaLength:a}}static fromJSON(e){return new Ea(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Ta extends Et{constructor(e=[],t=[],n=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:r};const s=[],o=[];a(r),l(n),h(),this.setAttribute("position",new nt(s,3)),this.setAttribute("normal",new nt(s.slice(),3)),this.setAttribute("uv",new nt(o,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function a(b){const y=new L,x=new L,C=new L;for(let w=0;w<t.length;w+=3)u(t[w+0],y),u(t[w+1],x),u(t[w+2],C),c(y,x,C,b)}function c(b,y,x,C){const w=C+1,P=[];for(let D=0;D<=w;D++){P[D]=[];const T=b.clone().lerp(x,D/w),S=y.clone().lerp(x,D/w),I=w-D;for(let B=0;B<=I;B++)B===0&&D===w?P[D][B]=T:P[D][B]=T.clone().lerp(S,B/I)}for(let D=0;D<w;D++)for(let T=0;T<2*(w-D)-1;T++){const S=Math.floor(T/2);T%2===0?(p(P[D][S+1]),p(P[D+1][S]),p(P[D][S])):(p(P[D][S+1]),p(P[D+1][S+1]),p(P[D+1][S]))}}function l(b){const y=new L;for(let x=0;x<s.length;x+=3)y.x=s[x+0],y.y=s[x+1],y.z=s[x+2],y.normalize().multiplyScalar(b),s[x+0]=y.x,s[x+1]=y.y,s[x+2]=y.z}function h(){const b=new L;for(let y=0;y<s.length;y+=3){b.x=s[y+0],b.y=s[y+1],b.z=s[y+2];const x=m(b)/2/Math.PI+.5,C=d(b)/Math.PI+.5;o.push(x,1-C)}g(),f()}function f(){for(let b=0;b<o.length;b+=6){const y=o[b+0],x=o[b+2],C=o[b+4],w=Math.max(y,x,C),P=Math.min(y,x,C);w>.9&&P<.1&&(y<.2&&(o[b+0]+=1),x<.2&&(o[b+2]+=1),C<.2&&(o[b+4]+=1))}}function p(b){s.push(b.x,b.y,b.z)}function u(b,y){const x=b*3;y.x=e[x+0],y.y=e[x+1],y.z=e[x+2]}function g(){const b=new L,y=new L,x=new L,C=new L,w=new ue,P=new ue,D=new ue;for(let T=0,S=0;T<s.length;T+=9,S+=6){b.set(s[T+0],s[T+1],s[T+2]),y.set(s[T+3],s[T+4],s[T+5]),x.set(s[T+6],s[T+7],s[T+8]),w.set(o[S+0],o[S+1]),P.set(o[S+2],o[S+3]),D.set(o[S+4],o[S+5]),C.copy(b).add(y).add(x).divideScalar(3);const I=m(C);_(w,S+0,b,I),_(P,S+2,y,I),_(D,S+4,x,I)}}function _(b,y,x,C){C<0&&b.x===1&&(o[y]=b.x-1),x.x===0&&x.z===0&&(o[y]=C/2/Math.PI+.5)}function m(b){return Math.atan2(b.z,-b.x)}function d(b){return Math.atan2(-b.y,Math.sqrt(b.x*b.x+b.z*b.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ta(e.vertices,e.indices,e.radius,e.details)}}class xn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,r=this.getPoint(0),s=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),s+=n.distanceTo(r),t.push(s),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const n=this.getLengths();let r=0;const s=n.length;let o;t?o=t:o=e*n[s-1];let a=0,c=s-1,l;for(;a<=c;)if(r=Math.floor(a+(c-a)/2),l=n[r]-o,l<0)a=r+1;else if(l>0)c=r-1;else{c=r;break}if(r=c,n[r]===o)return r/(s-1);const h=n[r],p=n[r+1]-h,u=(o-h)/p;return(r+u)/(s-1)}getTangent(e,t){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);const o=this.getPoint(r),a=this.getPoint(s),c=t||(o.isVector2?new ue:new L);return c.copy(a).sub(o).normalize(),c}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){const n=new L,r=[],s=[],o=[],a=new L,c=new ht;for(let u=0;u<=e;u++){const g=u/e;r[u]=this.getTangentAt(g,new L)}s[0]=new L,o[0]=new L;let l=Number.MAX_VALUE;const h=Math.abs(r[0].x),f=Math.abs(r[0].y),p=Math.abs(r[0].z);h<=l&&(l=h,n.set(1,0,0)),f<=l&&(l=f,n.set(0,1,0)),p<=l&&n.set(0,0,1),a.crossVectors(r[0],n).normalize(),s[0].crossVectors(r[0],a),o[0].crossVectors(r[0],s[0]);for(let u=1;u<=e;u++){if(s[u]=s[u-1].clone(),o[u]=o[u-1].clone(),a.crossVectors(r[u-1],r[u]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(qe(r[u-1].dot(r[u]),-1,1));s[u].applyMatrix4(c.makeRotationAxis(a,g))}o[u].crossVectors(r[u],s[u])}if(t===!0){let u=Math.acos(qe(s[0].dot(s[e]),-1,1));u/=e,r[0].dot(a.crossVectors(s[0],s[e]))>0&&(u=-u);for(let g=1;g<=e;g++)s[g].applyMatrix4(c.makeRotationAxis(r[g],u*g)),o[g].crossVectors(r[g],s[g])}return{tangents:r,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class ba extends xn{constructor(e=0,t=0,n=1,r=1,s=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(e,t=new ue){const n=t,r=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(o?s=0:s=r),this.aClockwise===!0&&!o&&(s===r?s=-r:s=s-r);const a=this.aStartAngle+e*s;let c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),f=Math.sin(this.aRotation),p=c-this.aX,u=l-this.aY;c=p*h-u*f+this.aX,l=p*f+u*h+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class Ru extends ba{constructor(e,t,n,r,s,o){super(e,t,n,n,r,s,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Aa(){let i=0,e=0,t=0,n=0;function r(s,o,a,c){i=s,e=a,t=-3*s+3*o-2*a-c,n=2*s-2*o+a+c}return{initCatmullRom:function(s,o,a,c,l){r(o,a,l*(a-s),l*(c-o))},initNonuniformCatmullRom:function(s,o,a,c,l,h,f){let p=(o-s)/l-(a-s)/(l+h)+(a-o)/h,u=(a-o)/h-(c-o)/(h+f)+(c-a)/f;p*=h,u*=h,r(o,a,p,u)},calc:function(s){const o=s*s,a=o*s;return i+e*s+t*o+n*a}}}const Qr=new L,$s=new Aa,js=new Aa,Qs=new Aa;class Ac extends xn{constructor(e=[],t=!1,n="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new L){const n=t,r=this.points,s=r.length,o=(s-(this.closed?0:1))*e;let a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:c===0&&a===s-1&&(a=s-2,c=1);let l,h;this.closed||a>0?l=r[(a-1)%s]:(Qr.subVectors(r[0],r[1]).add(r[0]),l=Qr);const f=r[a%s],p=r[(a+1)%s];if(this.closed||a+2<s?h=r[(a+2)%s]:(Qr.subVectors(r[s-1],r[s-2]).add(r[s-1]),h=Qr),this.curveType==="centripetal"||this.curveType==="chordal"){const u=this.curveType==="chordal"?.5:.25;let g=Math.pow(l.distanceToSquared(f),u),_=Math.pow(f.distanceToSquared(p),u),m=Math.pow(p.distanceToSquared(h),u);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),$s.initNonuniformCatmullRom(l.x,f.x,p.x,h.x,g,_,m),js.initNonuniformCatmullRom(l.y,f.y,p.y,h.y,g,_,m),Qs.initNonuniformCatmullRom(l.z,f.z,p.z,h.z,g,_,m)}else this.curveType==="catmullrom"&&($s.initCatmullRom(l.x,f.x,p.x,h.x,this.tension),js.initCatmullRom(l.y,f.y,p.y,h.y,this.tension),Qs.initCatmullRom(l.z,f.z,p.z,h.z,this.tension));return n.set($s.calc(c),js.calc(c),Qs.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const r=e.points[t];this.points.push(new L().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function gl(i,e,t,n,r){const s=(n-e)*.5,o=(r-t)*.5,a=i*i,c=i*a;return(2*t-2*n+s+o)*c+(-3*t+3*n-2*s-o)*a+s*i+t}function Cu(i,e){const t=1-i;return t*t*e}function Pu(i,e){return 2*(1-i)*i*e}function Lu(i,e){return i*i*e}function dr(i,e,t,n){return Cu(i,e)+Pu(i,t)+Lu(i,n)}function Iu(i,e){const t=1-i;return t*t*t*e}function Du(i,e){const t=1-i;return 3*t*t*i*e}function Uu(i,e){return 3*(1-i)*i*i*e}function Nu(i,e){return i*i*i*e}function pr(i,e,t,n,r){return Iu(i,e)+Du(i,t)+Uu(i,n)+Nu(i,r)}class wc extends xn{constructor(e=new ue,t=new ue,n=new ue,r=new ue){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new ue){const n=t,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(pr(e,r.x,s.x,o.x,a.x),pr(e,r.y,s.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Fu extends xn{constructor(e=new L,t=new L,n=new L,r=new L){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new L){const n=t,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(pr(e,r.x,s.x,o.x,a.x),pr(e,r.y,s.y,o.y,a.y),pr(e,r.z,s.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Rc extends xn{constructor(e=new ue,t=new ue){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ue){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ue){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Ou extends xn{constructor(e=new L,t=new L){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new L){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new L){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Cc extends xn{constructor(e=new ue,t=new ue,n=new ue){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ue){const n=t,r=this.v0,s=this.v1,o=this.v2;return n.set(dr(e,r.x,s.x,o.x),dr(e,r.y,s.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Pc extends xn{constructor(e=new L,t=new L,n=new L){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new L){const n=t,r=this.v0,s=this.v1,o=this.v2;return n.set(dr(e,r.x,s.x,o.x),dr(e,r.y,s.y,o.y),dr(e,r.z,s.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Lc extends xn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ue){const n=t,r=this.points,s=(r.length-1)*e,o=Math.floor(s),a=s-o,c=r[o===0?o:o-1],l=r[o],h=r[o>r.length-2?r.length-1:o+1],f=r[o>r.length-3?r.length-1:o+2];return n.set(gl(a,c.x,l.x,h.x,f.x),gl(a,c.y,l.y,h.y,f.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const r=e.points[t];this.points.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const r=this.points[t];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const r=e.points[t];this.points.push(new ue().fromArray(r))}return this}}var gs=Object.freeze({__proto__:null,ArcCurve:Ru,CatmullRomCurve3:Ac,CubicBezierCurve:wc,CubicBezierCurve3:Fu,EllipseCurve:ba,LineCurve:Rc,LineCurve3:Ou,QuadraticBezierCurve:Cc,QuadraticBezierCurve3:Pc,SplineCurve:Lc});class Bu extends xn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new gs[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),r=this.getCurveLengths();let s=0;for(;s<r.length;){if(r[s]>=n){const o=r[s]-n,a=this.curves[s],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,t)}s++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,r=this.curves.length;n<r;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let r=0,s=this.curves;r<s.length;r++){const o=s[r],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,c=o.getPoints(a);for(let l=0;l<c.length;l++){const h=c[l];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const r=e.curves[t];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const r=this.curves[t];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const r=e.curves[t];this.curves.push(new gs[r.type]().fromJSON(r))}return this}}class Qo extends Bu{constructor(e){super(),this.type="Path",this.currentPoint=new ue,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new Rc(this.currentPoint.clone(),new ue(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,r){const s=new Cc(this.currentPoint.clone(),new ue(e,t),new ue(n,r));return this.curves.push(s),this.currentPoint.set(n,r),this}bezierCurveTo(e,t,n,r,s,o){const a=new wc(this.currentPoint.clone(),new ue(e,t),new ue(n,r),new ue(s,o));return this.curves.push(a),this.currentPoint.set(s,o),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new Lc(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,r,s,o){const a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+a,t+c,n,r,s,o),this}absarc(e,t,n,r,s,o){return this.absellipse(e,t,n,n,r,s,o),this}ellipse(e,t,n,r,s,o,a,c){const l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+l,t+h,n,r,s,o,a,c),this}absellipse(e,t,n,r,s,o,a,c){const l=new ba(e,t,n,r,s,o,a,c);if(this.curves.length>0){const f=l.getPoint(0);f.equals(this.currentPoint)||this.lineTo(f.x,f.y)}this.curves.push(l);const h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class Ss extends Qo{constructor(e){super(e),this.uuid=Xi(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,r=this.holes.length;n<r;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const r=e.holes[t];this.holes.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const r=this.holes[t];e.holes.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const r=e.holes[t];this.holes.push(new Qo().fromJSON(r))}return this}}function zu(i,e,t=2){const n=e&&e.length,r=n?e[0]*t:i.length;let s=Ic(i,0,r,t,!0);const o=[];if(!s||s.next===s.prev)return o;let a,c,l;if(n&&(s=Wu(i,e,s,t)),i.length>80*t){a=1/0,c=1/0;let h=-1/0,f=-1/0;for(let p=t;p<r;p+=t){const u=i[p],g=i[p+1];u<a&&(a=u),g<c&&(c=g),u>h&&(h=u),g>f&&(f=g)}l=Math.max(h-a,f-c),l=l!==0?32767/l:0}return Sr(s,o,t,a,c,l,0),o}function Ic(i,e,t,n,r){let s;if(r===tf(i,e,t,n)>0)for(let o=e;o<t;o+=n)s=_l(o/n|0,i[o],i[o+1],s);else for(let o=t-n;o>=e;o-=n)s=_l(o/n|0,i[o],i[o+1],s);return s&&Vi(s,s.next)&&(Er(s),s=s.next),s}function fi(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(Vi(t,t.next)||_t(t.prev,t,t.next)===0)){if(Er(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function Sr(i,e,t,n,r,s,o){if(!i)return;!o&&s&&Zu(i,n,r,s);let a=i;for(;i.prev!==i.next;){const c=i.prev,l=i.next;if(s?Hu(i,n,r,s):ku(i)){e.push(c.i,i.i,l.i),Er(i),i=l.next,a=l.next;continue}if(i=l,i===a){o?o===1?(i=Vu(fi(i),e),Sr(i,e,t,n,r,s,2)):o===2&&Gu(i,e,t,n,r,s):Sr(fi(i),e,t,n,r,s,1);break}}}function ku(i){const e=i.prev,t=i,n=i.next;if(_t(e,t,n)>=0)return!1;const r=e.x,s=t.x,o=n.x,a=e.y,c=t.y,l=n.y,h=Math.min(r,s,o),f=Math.min(a,c,l),p=Math.max(r,s,o),u=Math.max(a,c,l);let g=n.next;for(;g!==e;){if(g.x>=h&&g.x<=p&&g.y>=f&&g.y<=u&&cr(r,a,s,c,o,l,g.x,g.y)&&_t(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function Hu(i,e,t,n){const r=i.prev,s=i,o=i.next;if(_t(r,s,o)>=0)return!1;const a=r.x,c=s.x,l=o.x,h=r.y,f=s.y,p=o.y,u=Math.min(a,c,l),g=Math.min(h,f,p),_=Math.max(a,c,l),m=Math.max(h,f,p),d=ea(u,g,e,t,n),b=ea(_,m,e,t,n);let y=i.prevZ,x=i.nextZ;for(;y&&y.z>=d&&x&&x.z<=b;){if(y.x>=u&&y.x<=_&&y.y>=g&&y.y<=m&&y!==r&&y!==o&&cr(a,h,c,f,l,p,y.x,y.y)&&_t(y.prev,y,y.next)>=0||(y=y.prevZ,x.x>=u&&x.x<=_&&x.y>=g&&x.y<=m&&x!==r&&x!==o&&cr(a,h,c,f,l,p,x.x,x.y)&&_t(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;y&&y.z>=d;){if(y.x>=u&&y.x<=_&&y.y>=g&&y.y<=m&&y!==r&&y!==o&&cr(a,h,c,f,l,p,y.x,y.y)&&_t(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;x&&x.z<=b;){if(x.x>=u&&x.x<=_&&x.y>=g&&x.y<=m&&x!==r&&x!==o&&cr(a,h,c,f,l,p,x.x,x.y)&&_t(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function Vu(i,e){let t=i;do{const n=t.prev,r=t.next.next;!Vi(n,r)&&Uc(n,t,t.next,r)&&yr(n,r)&&yr(r,n)&&(e.push(n.i,t.i,r.i),Er(t),Er(t.next),t=i=r),t=t.next}while(t!==i);return fi(t)}function Gu(i,e,t,n,r,s){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&ju(o,a)){let c=Nc(o,a);o=fi(o,o.next),c=fi(c,c.next),Sr(o,e,t,n,r,s,0),Sr(c,e,t,n,r,s,0);return}a=a.next}o=o.next}while(o!==i)}function Wu(i,e,t,n){const r=[];for(let s=0,o=e.length;s<o;s++){const a=e[s]*n,c=s<o-1?e[s+1]*n:i.length,l=Ic(i,a,c,n,!1);l===l.next&&(l.steiner=!0),r.push($u(l))}r.sort(Xu);for(let s=0;s<r.length;s++)t=qu(r[s],t);return t}function Xu(i,e){let t=i.x-e.x;if(t===0&&(t=i.y-e.y,t===0)){const n=(i.next.y-i.y)/(i.next.x-i.x),r=(e.next.y-e.y)/(e.next.x-e.x);t=n-r}return t}function qu(i,e){const t=Yu(i,e);if(!t)return e;const n=Nc(t,i);return fi(n,n.next),fi(t,t.next)}function Yu(i,e){let t=e;const n=i.x,r=i.y;let s=-1/0,o;if(Vi(i,t))return t;do{if(Vi(i,t.next))return t.next;if(r<=t.y&&r>=t.next.y&&t.next.y!==t.y){const f=t.x+(r-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(f<=n&&f>s&&(s=f,o=t.x<t.next.x?t:t.next,f===n))return o}t=t.next}while(t!==e);if(!o)return null;const a=o,c=o.x,l=o.y;let h=1/0;t=o;do{if(n>=t.x&&t.x>=c&&n!==t.x&&Dc(r<l?n:s,r,c,l,r<l?s:n,r,t.x,t.y)){const f=Math.abs(r-t.y)/(n-t.x);yr(t,i)&&(f<h||f===h&&(t.x>o.x||t.x===o.x&&Ju(o,t)))&&(o=t,h=f)}t=t.next}while(t!==a);return o}function Ju(i,e){return _t(i.prev,i,e.prev)<0&&_t(e.next,i,i.next)<0}function Zu(i,e,t,n){let r=i;do r.z===0&&(r.z=ea(r.x,r.y,e,t,n)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==i);r.prevZ.nextZ=null,r.prevZ=null,Ku(r)}function Ku(i){let e,t=1;do{let n=i,r;i=null;let s=null;for(e=0;n;){e++;let o=n,a=0;for(let l=0;l<t&&(a++,o=o.nextZ,!!o);l++);let c=t;for(;a>0||c>0&&o;)a!==0&&(c===0||!o||n.z<=o.z)?(r=n,n=n.nextZ,a--):(r=o,o=o.nextZ,c--),s?s.nextZ=r:i=r,r.prevZ=s,s=r;n=o}s.nextZ=null,t*=2}while(e>1);return i}function ea(i,e,t,n,r){return i=(i-t)*r|0,e=(e-n)*r|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function $u(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function Dc(i,e,t,n,r,s,o,a){return(r-o)*(e-a)>=(i-o)*(s-a)&&(i-o)*(n-a)>=(t-o)*(e-a)&&(t-o)*(s-a)>=(r-o)*(n-a)}function cr(i,e,t,n,r,s,o,a){return!(i===o&&e===a)&&Dc(i,e,t,n,r,s,o,a)}function ju(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!Qu(i,e)&&(yr(i,e)&&yr(e,i)&&ef(i,e)&&(_t(i.prev,i,e.prev)||_t(i,e.prev,e))||Vi(i,e)&&_t(i.prev,i,i.next)>0&&_t(e.prev,e,e.next)>0)}function _t(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function Vi(i,e){return i.x===e.x&&i.y===e.y}function Uc(i,e,t,n){const r=ts(_t(i,e,t)),s=ts(_t(i,e,n)),o=ts(_t(t,n,i)),a=ts(_t(t,n,e));return!!(r!==s&&o!==a||r===0&&es(i,t,e)||s===0&&es(i,n,e)||o===0&&es(t,i,n)||a===0&&es(t,e,n))}function es(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function ts(i){return i>0?1:i<0?-1:0}function Qu(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&Uc(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function yr(i,e){return _t(i.prev,i,i.next)<0?_t(i,e,i.next)>=0&&_t(i,i.prev,e)>=0:_t(i,e,i.prev)<0||_t(i,i.next,e)<0}function ef(i,e){let t=i,n=!1;const r=(i.x+e.x)/2,s=(i.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&r<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function Nc(i,e){const t=ta(i.i,i.x,i.y),n=ta(e.i,e.x,e.y),r=i.next,s=e.prev;return i.next=e,e.prev=i,t.next=r,r.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function _l(i,e,t,n){const r=ta(i,e,t);return n?(r.next=n.next,r.prev=n,n.next.prev=r,n.next=r):(r.prev=r,r.next=r),r}function Er(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function ta(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function tf(i,e,t,n){let r=0;for(let s=e,o=t-n;s<t;s+=n)r+=(i[o]-i[s])*(i[s+1]+i[o+1]),o=s;return r}class nf{static triangulate(e,t,n=2){return zu(e,t,n)}}class Rn{static area(e){const t=e.length;let n=0;for(let r=t-1,s=0;s<t;r=s++)n+=e[r].x*e[s].y-e[s].x*e[r].y;return n*.5}static isClockWise(e){return Rn.area(e)<0}static triangulateShape(e,t){const n=[],r=[],s=[];vl(e),xl(n,e);let o=e.length;t.forEach(vl);for(let c=0;c<t.length;c++)r.push(o),o+=t[c].length,xl(n,t[c]);const a=nf.triangulate(n,r);for(let c=0;c<a.length;c+=3)s.push(a.slice(c,c+3));return s}}function vl(i){const e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function xl(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}class wr extends Et{constructor(e=new Ss([new ue(.5,.5),new ue(-.5,.5),new ue(-.5,-.5),new ue(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const n=this,r=[],s=[];for(let a=0,c=e.length;a<c;a++){const l=e[a];o(l)}this.setAttribute("position",new nt(r,3)),this.setAttribute("uv",new nt(s,2)),this.computeVertexNormals();function o(a){const c=[],l=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,f=t.depth!==void 0?t.depth:1;let p=t.bevelEnabled!==void 0?t.bevelEnabled:!0,u=t.bevelThickness!==void 0?t.bevelThickness:.2,g=t.bevelSize!==void 0?t.bevelSize:u-.1,_=t.bevelOffset!==void 0?t.bevelOffset:0,m=t.bevelSegments!==void 0?t.bevelSegments:3;const d=t.extrudePath,b=t.UVGenerator!==void 0?t.UVGenerator:rf;let y,x=!1,C,w,P,D;d&&(y=d.getSpacedPoints(h),x=!0,p=!1,C=d.computeFrenetFrames(h,!1),w=new L,P=new L,D=new L),p||(m=0,u=0,g=0,_=0);const T=a.extractPoints(l);let S=T.shape;const I=T.holes;if(!Rn.isClockWise(S)){S=S.reverse();for(let ie=0,j=I.length;ie<j;ie++){const $=I[ie];Rn.isClockWise($)&&(I[ie]=$.reverse())}}function H(ie){const $=10000000000000001e-36;let K=ie[0];for(let fe=1;fe<=ie.length;fe++){const se=fe%ie.length,de=ie[se],ze=de.x-K.x,Be=de.y-K.y,A=ze*ze+Be*Be,v=Math.max(Math.abs(de.x),Math.abs(de.y),Math.abs(K.x),Math.abs(K.y)),O=$*v*v;if(A<=O){ie.splice(se,1),fe--;continue}K=de}}H(S),I.forEach(H);const J=I.length,G=S;for(let ie=0;ie<J;ie++){const j=I[ie];S=S.concat(j)}function Y(ie,j,$){return j||console.error("THREE.ExtrudeGeometry: vec does not exist"),ie.clone().addScaledVector(j,$)}const ee=S.length;function W(ie,j,$){let K,fe,se;const de=ie.x-j.x,ze=ie.y-j.y,Be=$.x-ie.x,A=$.y-ie.y,v=de*de+ze*ze,O=de*A-ze*Be;if(Math.abs(O)>Number.EPSILON){const V=Math.sqrt(v),ne=Math.sqrt(Be*Be+A*A),X=j.x-ze/V,Pe=j.y+de/V,he=$.x-A/ne,we=$.y+Be/ne,Re=((he-X)*A-(we-Pe)*Be)/(de*A-ze*Be);K=X+de*Re-ie.x,fe=Pe+ze*Re-ie.y;const oe=K*K+fe*fe;if(oe<=2)return new ue(K,fe);se=Math.sqrt(oe/2)}else{let V=!1;de>Number.EPSILON?Be>Number.EPSILON&&(V=!0):de<-Number.EPSILON?Be<-Number.EPSILON&&(V=!0):Math.sign(ze)===Math.sign(A)&&(V=!0),V?(K=-ze,fe=de,se=Math.sqrt(v)):(K=de,fe=ze,se=Math.sqrt(v/2))}return new ue(K/se,fe/se)}const pe=[];for(let ie=0,j=G.length,$=j-1,K=ie+1;ie<j;ie++,$++,K++)$===j&&($=0),K===j&&(K=0),pe[ie]=W(G[ie],G[$],G[K]);const Me=[];let Ee,He=pe.concat();for(let ie=0,j=J;ie<j;ie++){const $=I[ie];Ee=[];for(let K=0,fe=$.length,se=fe-1,de=K+1;K<fe;K++,se++,de++)se===fe&&(se=0),de===fe&&(de=0),Ee[K]=W($[K],$[se],$[de]);Me.push(Ee),He=He.concat(Ee)}let Ke;if(m===0)Ke=Rn.triangulateShape(G,I);else{const ie=[],j=[];for(let $=0;$<m;$++){const K=$/m,fe=u*Math.cos(K*Math.PI/2),se=g*Math.sin(K*Math.PI/2)+_;for(let de=0,ze=G.length;de<ze;de++){const Be=Y(G[de],pe[de],se);Ie(Be.x,Be.y,-fe),K===0&&ie.push(Be)}for(let de=0,ze=J;de<ze;de++){const Be=I[de];Ee=Me[de];const A=[];for(let v=0,O=Be.length;v<O;v++){const V=Y(Be[v],Ee[v],se);Ie(V.x,V.y,-fe),K===0&&A.push(V)}K===0&&j.push(A)}}Ke=Rn.triangulateShape(ie,j)}const rt=Ke.length,je=g+_;for(let ie=0;ie<ee;ie++){const j=p?Y(S[ie],He[ie],je):S[ie];x?(P.copy(C.normals[0]).multiplyScalar(j.x),w.copy(C.binormals[0]).multiplyScalar(j.y),D.copy(y[0]).add(P).add(w),Ie(D.x,D.y,D.z)):Ie(j.x,j.y,0)}for(let ie=1;ie<=h;ie++)for(let j=0;j<ee;j++){const $=p?Y(S[j],He[j],je):S[j];x?(P.copy(C.normals[ie]).multiplyScalar($.x),w.copy(C.binormals[ie]).multiplyScalar($.y),D.copy(y[ie]).add(P).add(w),Ie(D.x,D.y,D.z)):Ie($.x,$.y,f/h*ie)}for(let ie=m-1;ie>=0;ie--){const j=ie/m,$=u*Math.cos(j*Math.PI/2),K=g*Math.sin(j*Math.PI/2)+_;for(let fe=0,se=G.length;fe<se;fe++){const de=Y(G[fe],pe[fe],K);Ie(de.x,de.y,f+$)}for(let fe=0,se=I.length;fe<se;fe++){const de=I[fe];Ee=Me[fe];for(let ze=0,Be=de.length;ze<Be;ze++){const A=Y(de[ze],Ee[ze],K);x?Ie(A.x,A.y+y[h-1].y,y[h-1].x+$):Ie(A.x,A.y,f+$)}}}Z(),re();function Z(){const ie=r.length/3;if(p){let j=0,$=ee*j;for(let K=0;K<rt;K++){const fe=Ke[K];Ae(fe[2]+$,fe[1]+$,fe[0]+$)}j=h+m*2,$=ee*j;for(let K=0;K<rt;K++){const fe=Ke[K];Ae(fe[0]+$,fe[1]+$,fe[2]+$)}}else{for(let j=0;j<rt;j++){const $=Ke[j];Ae($[2],$[1],$[0])}for(let j=0;j<rt;j++){const $=Ke[j];Ae($[0]+ee*h,$[1]+ee*h,$[2]+ee*h)}}n.addGroup(ie,r.length/3-ie,0)}function re(){const ie=r.length/3;let j=0;ye(G,j),j+=G.length;for(let $=0,K=I.length;$<K;$++){const fe=I[$];ye(fe,j),j+=fe.length}n.addGroup(ie,r.length/3-ie,1)}function ye(ie,j){let $=ie.length;for(;--$>=0;){const K=$;let fe=$-1;fe<0&&(fe=ie.length-1);for(let se=0,de=h+m*2;se<de;se++){const ze=ee*se,Be=ee*(se+1),A=j+K+ze,v=j+fe+ze,O=j+fe+Be,V=j+K+Be;Ye(A,v,O,V)}}}function Ie(ie,j,$){c.push(ie),c.push(j),c.push($)}function Ae(ie,j,$){ut(ie),ut(j),ut($);const K=r.length/3,fe=b.generateTopUV(n,r,K-3,K-2,K-1);R(fe[0]),R(fe[1]),R(fe[2])}function Ye(ie,j,$,K){ut(ie),ut(j),ut(K),ut(j),ut($),ut(K);const fe=r.length/3,se=b.generateSideWallUV(n,r,fe-6,fe-3,fe-2,fe-1);R(se[0]),R(se[1]),R(se[3]),R(se[1]),R(se[2]),R(se[3])}function ut(ie){r.push(c[ie*3+0]),r.push(c[ie*3+1]),r.push(c[ie*3+2])}function R(ie){s.push(ie.x),s.push(ie.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return sf(t,n,e)}static fromJSON(e,t){const n=[];for(let s=0,o=e.shapes.length;s<o;s++){const a=t[e.shapes[s]];n.push(a)}const r=e.options.extrudePath;return r!==void 0&&(e.options.extrudePath=new gs[r.type]().fromJSON(r)),new wr(n,e.options)}}const rf={generateTopUV:function(i,e,t,n,r){const s=e[t*3],o=e[t*3+1],a=e[n*3],c=e[n*3+1],l=e[r*3],h=e[r*3+1];return[new ue(s,o),new ue(a,c),new ue(l,h)]},generateSideWallUV:function(i,e,t,n,r,s){const o=e[t*3],a=e[t*3+1],c=e[t*3+2],l=e[n*3],h=e[n*3+1],f=e[n*3+2],p=e[r*3],u=e[r*3+1],g=e[r*3+2],_=e[s*3],m=e[s*3+1],d=e[s*3+2];return Math.abs(a-h)<Math.abs(o-l)?[new ue(o,1-c),new ue(l,1-f),new ue(p,1-g),new ue(_,1-d)]:[new ue(a,1-c),new ue(h,1-f),new ue(u,1-g),new ue(m,1-d)]}};function sf(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,r=i.length;n<r;n++){const s=i[n];t.shapes.push(s.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class wa extends Ta{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,r=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(r,s,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new wa(e.radius,e.detail)}}class Ln extends Et{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};const s=e/2,o=t/2,a=Math.floor(n),c=Math.floor(r),l=a+1,h=c+1,f=e/a,p=t/c,u=[],g=[],_=[],m=[];for(let d=0;d<h;d++){const b=d*p-o;for(let y=0;y<l;y++){const x=y*f-s;g.push(x,-b,0),_.push(0,0,1),m.push(y/a),m.push(1-d/c)}}for(let d=0;d<c;d++)for(let b=0;b<a;b++){const y=b+l*d,x=b+l*(d+1),C=b+1+l*(d+1),w=b+1+l*d;u.push(y,x,w),u.push(x,C,w)}this.setIndex(u),this.setAttribute("position",new nt(g,3)),this.setAttribute("normal",new nt(_,3)),this.setAttribute("uv",new nt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ln(e.width,e.height,e.widthSegments,e.heightSegments)}}class Ra extends Et{constructor(e=new Ss([new ue(0,.5),new ue(-.5,-.5),new ue(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};const n=[],r=[],s=[],o=[];let a=0,c=0;if(Array.isArray(e)===!1)l(e);else for(let h=0;h<e.length;h++)l(e[h]),this.addGroup(a,c,h),a+=c,c=0;this.setIndex(n),this.setAttribute("position",new nt(r,3)),this.setAttribute("normal",new nt(s,3)),this.setAttribute("uv",new nt(o,2));function l(h){const f=r.length/3,p=h.extractPoints(t);let u=p.shape;const g=p.holes;Rn.isClockWise(u)===!1&&(u=u.reverse());for(let m=0,d=g.length;m<d;m++){const b=g[m];Rn.isClockWise(b)===!0&&(g[m]=b.reverse())}const _=Rn.triangulateShape(u,g);for(let m=0,d=g.length;m<d;m++){const b=g[m];u=u.concat(b)}for(let m=0,d=u.length;m<d;m++){const b=u[m];r.push(b.x,b.y,0),s.push(0,0,1),o.push(b.x,b.y)}for(let m=0,d=_.length;m<d;m++){const b=_[m],y=b[0]+f,x=b[1]+f,C=b[2]+f;n.push(y,x,C),c+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes;return of(t,e)}static fromJSON(e,t){const n=[];for(let r=0,s=e.shapes.length;r<s;r++){const o=t[e.shapes[r]];n.push(o)}return new Ra(n,e.curveSegments)}}function of(i,e){if(e.shapes=[],Array.isArray(i))for(let t=0,n=i.length;t<n;t++){const r=i[t];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e}class Ji extends Et{constructor(e=1,t=32,n=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const c=Math.min(o+a,Math.PI);let l=0;const h=[],f=new L,p=new L,u=[],g=[],_=[],m=[];for(let d=0;d<=n;d++){const b=[],y=d/n;let x=0;d===0&&o===0?x=.5/t:d===n&&c===Math.PI&&(x=-.5/t);for(let C=0;C<=t;C++){const w=C/t;f.x=-e*Math.cos(r+w*s)*Math.sin(o+y*a),f.y=e*Math.cos(o+y*a),f.z=e*Math.sin(r+w*s)*Math.sin(o+y*a),g.push(f.x,f.y,f.z),p.copy(f).normalize(),_.push(p.x,p.y,p.z),m.push(w+x,1-y),b.push(l++)}h.push(b)}for(let d=0;d<n;d++)for(let b=0;b<t;b++){const y=h[d][b+1],x=h[d][b],C=h[d+1][b],w=h[d+1][b+1];(d!==0||o>0)&&u.push(y,x,w),(d!==n-1||c<Math.PI)&&u.push(x,C,w)}this.setIndex(u),this.setAttribute("position",new nt(g,3)),this.setAttribute("normal",new nt(_,3)),this.setAttribute("uv",new nt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ji(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Ca extends Et{constructor(e=1,t=.4,n=12,r=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:s},n=Math.floor(n),r=Math.floor(r);const o=[],a=[],c=[],l=[],h=new L,f=new L,p=new L;for(let u=0;u<=n;u++)for(let g=0;g<=r;g++){const _=g/r*s,m=u/n*Math.PI*2;f.x=(e+t*Math.cos(m))*Math.cos(_),f.y=(e+t*Math.cos(m))*Math.sin(_),f.z=t*Math.sin(m),a.push(f.x,f.y,f.z),h.x=e*Math.cos(_),h.y=e*Math.sin(_),p.subVectors(f,h).normalize(),c.push(p.x,p.y,p.z),l.push(g/r),l.push(u/n)}for(let u=1;u<=n;u++)for(let g=1;g<=r;g++){const _=(r+1)*u+g-1,m=(r+1)*(u-1)+g-1,d=(r+1)*(u-1)+g,b=(r+1)*u+g;o.push(_,m,b),o.push(m,d,b)}this.setIndex(o),this.setAttribute("position",new nt(a,3)),this.setAttribute("normal",new nt(c,3)),this.setAttribute("uv",new nt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ca(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Pa extends Et{constructor(e=new Pc(new L(-1,-1,0),new L(-1,1,0),new L(1,1,0)),t=64,n=1,r=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:r,closed:s};const o=e.computeFrenetFrames(t,s);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const a=new L,c=new L,l=new ue;let h=new L;const f=[],p=[],u=[],g=[];_(),this.setIndex(g),this.setAttribute("position",new nt(f,3)),this.setAttribute("normal",new nt(p,3)),this.setAttribute("uv",new nt(u,2));function _(){for(let y=0;y<t;y++)m(y);m(s===!1?t:0),b(),d()}function m(y){h=e.getPointAt(y/t,h);const x=o.normals[y],C=o.binormals[y];for(let w=0;w<=r;w++){const P=w/r*Math.PI*2,D=Math.sin(P),T=-Math.cos(P);c.x=T*x.x+D*C.x,c.y=T*x.y+D*C.y,c.z=T*x.z+D*C.z,c.normalize(),p.push(c.x,c.y,c.z),a.x=h.x+n*c.x,a.y=h.y+n*c.y,a.z=h.z+n*c.z,f.push(a.x,a.y,a.z)}}function d(){for(let y=1;y<=t;y++)for(let x=1;x<=r;x++){const C=(r+1)*(y-1)+(x-1),w=(r+1)*y+(x-1),P=(r+1)*y+x,D=(r+1)*(y-1)+x;g.push(C,w,D),g.push(w,P,D)}}function b(){for(let y=0;y<=t;y++)for(let x=0;x<=r;x++)l.x=y/t,l.y=x/r,u.push(l.x,l.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new Pa(new gs[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}class tn extends pi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Xe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Xe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=xa,this.normalScale=new ue(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new cn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class af extends tn{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ue(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return qe(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Xe(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Xe(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Xe(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class lf extends pi{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Xe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Xe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=xa,this.normalScale=new ue(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new cn,this.combine=ua,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class cf extends pi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Bh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class hf extends pi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Rr extends pt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Xe(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class uf extends Rr{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(pt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Xe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const eo=new ht,Ml=new L,Sl=new L;class La{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ue(512,512),this.mapType=_n,this.map=null,this.mapPass=null,this.matrix=new ht,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ya,this._frameExtents=new ue(1,1),this._viewportCount=1,this._viewports=[new lt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Ml.setFromMatrixPosition(e.matrixWorld),t.position.copy(Ml),Sl.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Sl),t.updateMatrixWorld(),eo.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(eo,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(eo)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class ff extends La{constructor(){super(new Ht(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,n=ps*2*e.angle*this.focus,r=this.mapSize.width/this.mapSize.height*this.aspect,s=e.distance||t.far;(n!==t.fov||r!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=r,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class df extends Rr{constructor(e,t,n=0,r=Math.PI/3,s=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(pt.DEFAULT_UP),this.updateMatrix(),this.target=new pt,this.distance=n,this.angle=r,this.penumbra=s,this.decay=o,this.map=null,this.shadow=new ff}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const yl=new ht,rr=new L,to=new L;class pf extends La{constructor(){super(new Ht(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ue(4,2),this._viewportCount=6,this._viewports=[new lt(2,1,1,1),new lt(0,1,1,1),new lt(3,1,1,1),new lt(1,1,1,1),new lt(3,0,1,1),new lt(1,0,1,1)],this._cubeDirections=[new L(1,0,0),new L(-1,0,0),new L(0,0,1),new L(0,0,-1),new L(0,1,0),new L(0,-1,0)],this._cubeUps=[new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,0,1),new L(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,r=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),rr.setFromMatrixPosition(e.matrixWorld),n.position.copy(rr),to.copy(n.position),to.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(to),n.updateMatrixWorld(),r.makeTranslation(-rr.x,-rr.y,-rr.z),yl.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(yl,n.coordinateSystem,n.reversedDepth)}}class Fc extends Rr{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=r,this.shadow=new pf}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Oc extends xc{constructor(e=-1,t=1,n=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-e,o=n+e,a=r+t,c=r-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,o=s+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class mf extends La{constructor(){super(new Oc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class gf extends Rr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(pt.DEFAULT_UP),this.updateMatrix(),this.target=new pt,this.shadow=new mf}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class _f extends Rr{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class vf extends Ht{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}function El(i,e,t,n){const r=xf(n);switch(t){case ac:return i*e;case ma:return i*e/r.components*r.byteLength;case ga:return i*e/r.components*r.byteLength;case cc:return i*e*2/r.components*r.byteLength;case _a:return i*e*2/r.components*r.byteLength;case lc:return i*e*3/r.components*r.byteLength;case ln:return i*e*4/r.components*r.byteLength;case va:return i*e*4/r.components*r.byteLength;case os:case as:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case ls:case cs:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case bo:case wo:return Math.max(i,16)*Math.max(e,8)/4;case To:case Ao:return Math.max(i,8)*Math.max(e,8)/2;case Ro:case Co:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Po:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Lo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Io:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Do:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Uo:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case No:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Fo:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Oo:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Bo:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case zo:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case ko:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Ho:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Vo:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Go:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Wo:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Xo:case qo:case Yo:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Jo:case Zo:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Ko:case $o:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function xf(i){switch(i){case _n:case ic:return{byteLength:1,components:1};case gr:case rc:case Ar:return{byteLength:2,components:1};case da:case pa:return{byteLength:2,components:4};case ci:case fa:case mn:return{byteLength:4,components:1};case sc:case oc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ha}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ha);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Bc(){let i=null,e=!1,t=null,n=null;function r(s,o){t(s,o),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function Mf(i){const e=new WeakMap;function t(a,c){const l=a.array,h=a.usage,f=l.byteLength,p=i.createBuffer();i.bindBuffer(c,p),i.bufferData(c,l,h),a.onUploadCallback();let u;if(l instanceof Float32Array)u=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)u=i.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?u=i.HALF_FLOAT:u=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)u=i.SHORT;else if(l instanceof Uint32Array)u=i.UNSIGNED_INT;else if(l instanceof Int32Array)u=i.INT;else if(l instanceof Int8Array)u=i.BYTE;else if(l instanceof Uint8Array)u=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)u=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:p,type:u,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:f}}function n(a,c,l){const h=c.array,f=c.updateRanges;if(i.bindBuffer(l,a),f.length===0)i.bufferSubData(l,0,h);else{f.sort((u,g)=>u.start-g.start);let p=0;for(let u=1;u<f.length;u++){const g=f[p],_=f[u];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++p,f[p]=_)}f.length=p+1;for(let u=0,g=f.length;u<g;u++){const _=f[u];i.bufferSubData(l,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=e.get(a);c&&(i.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:r,remove:s,update:o}}var Sf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,yf=`#ifdef USE_ALPHAHASH
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
#endif`,Ef=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Tf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,bf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Af=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,wf=`#ifdef USE_AOMAP
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
#endif`,Rf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Cf=`#ifdef USE_BATCHING
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
#endif`,Pf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Lf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,If=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Df=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Uf=`#ifdef USE_IRIDESCENCE
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
#endif`,Nf=`#ifdef USE_BUMPMAP
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
#endif`,Ff=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Of=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Bf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,zf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,kf=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Hf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Vf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Gf=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Wf=`#define PI 3.141592653589793
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
} // validated`,Xf=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,qf=`vec3 transformedNormal = objectNormal;
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
#endif`,Yf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Jf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Zf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Kf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,$f="gl_FragColor = linearToOutputTexel( gl_FragColor );",jf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Qf=`#ifdef USE_ENVMAP
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
#endif`,ed=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,td=`#ifdef USE_ENVMAP
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
#endif`,nd=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,id=`#ifdef USE_ENVMAP
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
#endif`,rd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,sd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,od=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ad=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,ld=`#ifdef USE_GRADIENTMAP
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
}`,cd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,hd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ud=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,fd=`uniform bool receiveShadow;
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
#endif`,dd=`#ifdef USE_ENVMAP
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
#endif`,pd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,md=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,gd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,_d=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,vd=`PhysicalMaterial material;
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
#endif`,xd=`struct PhysicalMaterial {
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
}`,Md=`
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
#endif`,Sd=`#if defined( RE_IndirectDiffuse )
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
#endif`,yd=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Ed=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Td=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,bd=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ad=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,wd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Rd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Cd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Pd=`#if defined( USE_POINTS_UV )
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
#endif`,Ld=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Id=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Dd=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Ud=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Nd=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Fd=`#ifdef USE_MORPHTARGETS
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
#endif`,Od=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Bd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,zd=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,kd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Hd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Vd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Gd=`#ifdef USE_NORMALMAP
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
#endif`,Wd=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Xd=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,qd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Yd=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Jd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Zd=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Kd=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,$d=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,jd=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Qd=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,ep=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,tp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,np=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,ip=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,rp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,sp=`float getShadowMask() {
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
}`,op=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,ap=`#ifdef USE_SKINNING
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
#endif`,lp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,cp=`#ifdef USE_SKINNING
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
#endif`,hp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,up=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,fp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,dp=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,pp=`#ifdef USE_TRANSMISSION
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
#endif`,mp=`#ifdef USE_TRANSMISSION
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
#endif`,gp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,_p=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,vp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,xp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Mp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Sp=`uniform sampler2D t2D;
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
}`,yp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ep=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Tp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,bp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ap=`#include <common>
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
}`,wp=`#if DEPTH_PACKING == 3200
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
}`,Rp=`#define DISTANCE
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
}`,Cp=`#define DISTANCE
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
}`,Pp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Lp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ip=`uniform float scale;
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
}`,Dp=`uniform vec3 diffuse;
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
}`,Up=`#include <common>
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
}`,Np=`uniform vec3 diffuse;
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
}`,Fp=`#define LAMBERT
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
}`,Op=`#define LAMBERT
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
}`,Bp=`#define MATCAP
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
}`,zp=`#define MATCAP
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
}`,kp=`#define NORMAL
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
}`,Hp=`#define NORMAL
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
}`,Vp=`#define PHONG
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
}`,Gp=`#define PHONG
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
}`,Wp=`#define STANDARD
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
}`,Xp=`#define STANDARD
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
}`,qp=`#define TOON
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
}`,Yp=`#define TOON
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
}`,Jp=`uniform float size;
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
}`,Zp=`uniform vec3 diffuse;
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
}`,Kp=`#include <common>
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
}`,$p=`uniform vec3 color;
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
}`,jp=`uniform float rotation;
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
}`,Qp=`uniform vec3 diffuse;
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
}`,We={alphahash_fragment:Sf,alphahash_pars_fragment:yf,alphamap_fragment:Ef,alphamap_pars_fragment:Tf,alphatest_fragment:bf,alphatest_pars_fragment:Af,aomap_fragment:wf,aomap_pars_fragment:Rf,batching_pars_vertex:Cf,batching_vertex:Pf,begin_vertex:Lf,beginnormal_vertex:If,bsdfs:Df,iridescence_fragment:Uf,bumpmap_pars_fragment:Nf,clipping_planes_fragment:Ff,clipping_planes_pars_fragment:Of,clipping_planes_pars_vertex:Bf,clipping_planes_vertex:zf,color_fragment:kf,color_pars_fragment:Hf,color_pars_vertex:Vf,color_vertex:Gf,common:Wf,cube_uv_reflection_fragment:Xf,defaultnormal_vertex:qf,displacementmap_pars_vertex:Yf,displacementmap_vertex:Jf,emissivemap_fragment:Zf,emissivemap_pars_fragment:Kf,colorspace_fragment:$f,colorspace_pars_fragment:jf,envmap_fragment:Qf,envmap_common_pars_fragment:ed,envmap_pars_fragment:td,envmap_pars_vertex:nd,envmap_physical_pars_fragment:dd,envmap_vertex:id,fog_vertex:rd,fog_pars_vertex:sd,fog_fragment:od,fog_pars_fragment:ad,gradientmap_pars_fragment:ld,lightmap_pars_fragment:cd,lights_lambert_fragment:hd,lights_lambert_pars_fragment:ud,lights_pars_begin:fd,lights_toon_fragment:pd,lights_toon_pars_fragment:md,lights_phong_fragment:gd,lights_phong_pars_fragment:_d,lights_physical_fragment:vd,lights_physical_pars_fragment:xd,lights_fragment_begin:Md,lights_fragment_maps:Sd,lights_fragment_end:yd,logdepthbuf_fragment:Ed,logdepthbuf_pars_fragment:Td,logdepthbuf_pars_vertex:bd,logdepthbuf_vertex:Ad,map_fragment:wd,map_pars_fragment:Rd,map_particle_fragment:Cd,map_particle_pars_fragment:Pd,metalnessmap_fragment:Ld,metalnessmap_pars_fragment:Id,morphinstance_vertex:Dd,morphcolor_vertex:Ud,morphnormal_vertex:Nd,morphtarget_pars_vertex:Fd,morphtarget_vertex:Od,normal_fragment_begin:Bd,normal_fragment_maps:zd,normal_pars_fragment:kd,normal_pars_vertex:Hd,normal_vertex:Vd,normalmap_pars_fragment:Gd,clearcoat_normal_fragment_begin:Wd,clearcoat_normal_fragment_maps:Xd,clearcoat_pars_fragment:qd,iridescence_pars_fragment:Yd,opaque_fragment:Jd,packing:Zd,premultiplied_alpha_fragment:Kd,project_vertex:$d,dithering_fragment:jd,dithering_pars_fragment:Qd,roughnessmap_fragment:ep,roughnessmap_pars_fragment:tp,shadowmap_pars_fragment:np,shadowmap_pars_vertex:ip,shadowmap_vertex:rp,shadowmask_pars_fragment:sp,skinbase_vertex:op,skinning_pars_vertex:ap,skinning_vertex:lp,skinnormal_vertex:cp,specularmap_fragment:hp,specularmap_pars_fragment:up,tonemapping_fragment:fp,tonemapping_pars_fragment:dp,transmission_fragment:pp,transmission_pars_fragment:mp,uv_pars_fragment:gp,uv_pars_vertex:_p,uv_vertex:vp,worldpos_vertex:xp,background_vert:Mp,background_frag:Sp,backgroundCube_vert:yp,backgroundCube_frag:Ep,cube_vert:Tp,cube_frag:bp,depth_vert:Ap,depth_frag:wp,distanceRGBA_vert:Rp,distanceRGBA_frag:Cp,equirect_vert:Pp,equirect_frag:Lp,linedashed_vert:Ip,linedashed_frag:Dp,meshbasic_vert:Up,meshbasic_frag:Np,meshlambert_vert:Fp,meshlambert_frag:Op,meshmatcap_vert:Bp,meshmatcap_frag:zp,meshnormal_vert:kp,meshnormal_frag:Hp,meshphong_vert:Vp,meshphong_frag:Gp,meshphysical_vert:Wp,meshphysical_frag:Xp,meshtoon_vert:qp,meshtoon_frag:Yp,points_vert:Jp,points_frag:Zp,shadow_vert:Kp,shadow_frag:$p,sprite_vert:jp,sprite_frag:Qp},ge={common:{diffuse:{value:new Xe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ge},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ge}},envmap:{envMap:{value:null},envMapRotation:{value:new Ge},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ge}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ge}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ge},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ge},normalScale:{value:new ue(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ge},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ge}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ge}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ge}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Xe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Xe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0},uvTransform:{value:new Ge}},sprite:{diffuse:{value:new Xe(16777215)},opacity:{value:1},center:{value:new ue(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ge},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0}}},dn={basic:{uniforms:It([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.fog]),vertexShader:We.meshbasic_vert,fragmentShader:We.meshbasic_frag},lambert:{uniforms:It([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,ge.lights,{emissive:{value:new Xe(0)}}]),vertexShader:We.meshlambert_vert,fragmentShader:We.meshlambert_frag},phong:{uniforms:It([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,ge.lights,{emissive:{value:new Xe(0)},specular:{value:new Xe(1118481)},shininess:{value:30}}]),vertexShader:We.meshphong_vert,fragmentShader:We.meshphong_frag},standard:{uniforms:It([ge.common,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.roughnessmap,ge.metalnessmap,ge.fog,ge.lights,{emissive:{value:new Xe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag},toon:{uniforms:It([ge.common,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.gradientmap,ge.fog,ge.lights,{emissive:{value:new Xe(0)}}]),vertexShader:We.meshtoon_vert,fragmentShader:We.meshtoon_frag},matcap:{uniforms:It([ge.common,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,{matcap:{value:null}}]),vertexShader:We.meshmatcap_vert,fragmentShader:We.meshmatcap_frag},points:{uniforms:It([ge.points,ge.fog]),vertexShader:We.points_vert,fragmentShader:We.points_frag},dashed:{uniforms:It([ge.common,ge.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:We.linedashed_vert,fragmentShader:We.linedashed_frag},depth:{uniforms:It([ge.common,ge.displacementmap]),vertexShader:We.depth_vert,fragmentShader:We.depth_frag},normal:{uniforms:It([ge.common,ge.bumpmap,ge.normalmap,ge.displacementmap,{opacity:{value:1}}]),vertexShader:We.meshnormal_vert,fragmentShader:We.meshnormal_frag},sprite:{uniforms:It([ge.sprite,ge.fog]),vertexShader:We.sprite_vert,fragmentShader:We.sprite_frag},background:{uniforms:{uvTransform:{value:new Ge},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:We.background_vert,fragmentShader:We.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ge}},vertexShader:We.backgroundCube_vert,fragmentShader:We.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:We.cube_vert,fragmentShader:We.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:We.equirect_vert,fragmentShader:We.equirect_frag},distanceRGBA:{uniforms:It([ge.common,ge.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:We.distanceRGBA_vert,fragmentShader:We.distanceRGBA_frag},shadow:{uniforms:It([ge.lights,ge.fog,{color:{value:new Xe(0)},opacity:{value:1}}]),vertexShader:We.shadow_vert,fragmentShader:We.shadow_frag}};dn.physical={uniforms:It([dn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ge},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ge},clearcoatNormalScale:{value:new ue(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ge},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ge},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ge},sheen:{value:0},sheenColor:{value:new Xe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ge},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ge},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ge},transmissionSamplerSize:{value:new ue},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ge},attenuationDistance:{value:0},attenuationColor:{value:new Xe(0)},specularColor:{value:new Xe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ge},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ge},anisotropyVector:{value:new ue},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ge}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag};const ns={r:0,b:0,g:0},ti=new cn,em=new ht;function tm(i,e,t,n,r,s,o){const a=new Xe(0);let c=s===!0?0:1,l,h,f=null,p=0,u=null;function g(y){let x=y.isScene===!0?y.background:null;return x&&x.isTexture&&(x=(y.backgroundBlurriness>0?t:e).get(x)),x}function _(y){let x=!1;const C=g(y);C===null?d(a,c):C&&C.isColor&&(d(C,1),x=!0);const w=i.xr.getEnvironmentBlendMode();w==="additive"?n.buffers.color.setClear(0,0,0,1,o):w==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(y,x){const C=g(x);C&&(C.isCubeTexture||C.mapping===vs)?(h===void 0&&(h=new st(new vn(1,1,1),new Jn({name:"BackgroundCubeMaterial",uniforms:Hi(dn.backgroundCube.uniforms),vertexShader:dn.backgroundCube.vertexShader,fragmentShader:dn.backgroundCube.fragmentShader,side:Ot,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(w,P,D){this.matrixWorld.copyPosition(D.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(h)),ti.copy(x.backgroundRotation),ti.x*=-1,ti.y*=-1,ti.z*=-1,C.isCubeTexture&&C.isRenderTargetTexture===!1&&(ti.y*=-1,ti.z*=-1),h.material.uniforms.envMap.value=C,h.material.uniforms.flipEnvMap.value=C.isCubeTexture&&C.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(em.makeRotationFromEuler(ti)),h.material.toneMapped=tt.getTransfer(C.colorSpace)!==at,(f!==C||p!==C.version||u!==i.toneMapping)&&(h.material.needsUpdate=!0,f=C,p=C.version,u=i.toneMapping),h.layers.enableAll(),y.unshift(h,h.geometry,h.material,0,0,null)):C&&C.isTexture&&(l===void 0&&(l=new st(new Ln(2,2),new Jn({name:"BackgroundMaterial",uniforms:Hi(dn.background.uniforms),vertexShader:dn.background.vertexShader,fragmentShader:dn.background.fragmentShader,side:Yn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(l)),l.material.uniforms.t2D.value=C,l.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,l.material.toneMapped=tt.getTransfer(C.colorSpace)!==at,C.matrixAutoUpdate===!0&&C.updateMatrix(),l.material.uniforms.uvTransform.value.copy(C.matrix),(f!==C||p!==C.version||u!==i.toneMapping)&&(l.material.needsUpdate=!0,f=C,p=C.version,u=i.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null))}function d(y,x){y.getRGB(ns,vc(i)),n.buffers.color.setClear(ns.r,ns.g,ns.b,x,o)}function b(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(y,x=1){a.set(y),c=x,d(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(y){c=y,d(a,c)},render:_,addToRenderList:m,dispose:b}}function nm(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=p(null);let s=r,o=!1;function a(S,I,B,H,J){let G=!1;const Y=f(H,B,I);s!==Y&&(s=Y,l(s.object)),G=u(S,H,B,J),G&&g(S,H,B,J),J!==null&&e.update(J,i.ELEMENT_ARRAY_BUFFER),(G||o)&&(o=!1,x(S,I,B,H),J!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(J).buffer))}function c(){return i.createVertexArray()}function l(S){return i.bindVertexArray(S)}function h(S){return i.deleteVertexArray(S)}function f(S,I,B){const H=B.wireframe===!0;let J=n[S.id];J===void 0&&(J={},n[S.id]=J);let G=J[I.id];G===void 0&&(G={},J[I.id]=G);let Y=G[H];return Y===void 0&&(Y=p(c()),G[H]=Y),Y}function p(S){const I=[],B=[],H=[];for(let J=0;J<t;J++)I[J]=0,B[J]=0,H[J]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:B,attributeDivisors:H,object:S,attributes:{},index:null}}function u(S,I,B,H){const J=s.attributes,G=I.attributes;let Y=0;const ee=B.getAttributes();for(const W in ee)if(ee[W].location>=0){const Me=J[W];let Ee=G[W];if(Ee===void 0&&(W==="instanceMatrix"&&S.instanceMatrix&&(Ee=S.instanceMatrix),W==="instanceColor"&&S.instanceColor&&(Ee=S.instanceColor)),Me===void 0||Me.attribute!==Ee||Ee&&Me.data!==Ee.data)return!0;Y++}return s.attributesNum!==Y||s.index!==H}function g(S,I,B,H){const J={},G=I.attributes;let Y=0;const ee=B.getAttributes();for(const W in ee)if(ee[W].location>=0){let Me=G[W];Me===void 0&&(W==="instanceMatrix"&&S.instanceMatrix&&(Me=S.instanceMatrix),W==="instanceColor"&&S.instanceColor&&(Me=S.instanceColor));const Ee={};Ee.attribute=Me,Me&&Me.data&&(Ee.data=Me.data),J[W]=Ee,Y++}s.attributes=J,s.attributesNum=Y,s.index=H}function _(){const S=s.newAttributes;for(let I=0,B=S.length;I<B;I++)S[I]=0}function m(S){d(S,0)}function d(S,I){const B=s.newAttributes,H=s.enabledAttributes,J=s.attributeDivisors;B[S]=1,H[S]===0&&(i.enableVertexAttribArray(S),H[S]=1),J[S]!==I&&(i.vertexAttribDivisor(S,I),J[S]=I)}function b(){const S=s.newAttributes,I=s.enabledAttributes;for(let B=0,H=I.length;B<H;B++)I[B]!==S[B]&&(i.disableVertexAttribArray(B),I[B]=0)}function y(S,I,B,H,J,G,Y){Y===!0?i.vertexAttribIPointer(S,I,B,J,G):i.vertexAttribPointer(S,I,B,H,J,G)}function x(S,I,B,H){_();const J=H.attributes,G=B.getAttributes(),Y=I.defaultAttributeValues;for(const ee in G){const W=G[ee];if(W.location>=0){let pe=J[ee];if(pe===void 0&&(ee==="instanceMatrix"&&S.instanceMatrix&&(pe=S.instanceMatrix),ee==="instanceColor"&&S.instanceColor&&(pe=S.instanceColor)),pe!==void 0){const Me=pe.normalized,Ee=pe.itemSize,He=e.get(pe);if(He===void 0)continue;const Ke=He.buffer,rt=He.type,je=He.bytesPerElement,Z=rt===i.INT||rt===i.UNSIGNED_INT||pe.gpuType===fa;if(pe.isInterleavedBufferAttribute){const re=pe.data,ye=re.stride,Ie=pe.offset;if(re.isInstancedInterleavedBuffer){for(let Ae=0;Ae<W.locationSize;Ae++)d(W.location+Ae,re.meshPerAttribute);S.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let Ae=0;Ae<W.locationSize;Ae++)m(W.location+Ae);i.bindBuffer(i.ARRAY_BUFFER,Ke);for(let Ae=0;Ae<W.locationSize;Ae++)y(W.location+Ae,Ee/W.locationSize,rt,Me,ye*je,(Ie+Ee/W.locationSize*Ae)*je,Z)}else{if(pe.isInstancedBufferAttribute){for(let re=0;re<W.locationSize;re++)d(W.location+re,pe.meshPerAttribute);S.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=pe.meshPerAttribute*pe.count)}else for(let re=0;re<W.locationSize;re++)m(W.location+re);i.bindBuffer(i.ARRAY_BUFFER,Ke);for(let re=0;re<W.locationSize;re++)y(W.location+re,Ee/W.locationSize,rt,Me,Ee*je,Ee/W.locationSize*re*je,Z)}}else if(Y!==void 0){const Me=Y[ee];if(Me!==void 0)switch(Me.length){case 2:i.vertexAttrib2fv(W.location,Me);break;case 3:i.vertexAttrib3fv(W.location,Me);break;case 4:i.vertexAttrib4fv(W.location,Me);break;default:i.vertexAttrib1fv(W.location,Me)}}}}b()}function C(){D();for(const S in n){const I=n[S];for(const B in I){const H=I[B];for(const J in H)h(H[J].object),delete H[J];delete I[B]}delete n[S]}}function w(S){if(n[S.id]===void 0)return;const I=n[S.id];for(const B in I){const H=I[B];for(const J in H)h(H[J].object),delete H[J];delete I[B]}delete n[S.id]}function P(S){for(const I in n){const B=n[I];if(B[S.id]===void 0)continue;const H=B[S.id];for(const J in H)h(H[J].object),delete H[J];delete B[S.id]}}function D(){T(),o=!0,s!==r&&(s=r,l(s.object))}function T(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:D,resetDefaultState:T,dispose:C,releaseStatesOfGeometry:w,releaseStatesOfProgram:P,initAttributes:_,enableAttribute:m,disableUnusedAttributes:b}}function im(i,e,t){let n;function r(l){n=l}function s(l,h){i.drawArrays(n,l,h),t.update(h,n,1)}function o(l,h,f){f!==0&&(i.drawArraysInstanced(n,l,h,f),t.update(h,n,f))}function a(l,h,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,f);let u=0;for(let g=0;g<f;g++)u+=h[g];t.update(u,n,1)}function c(l,h,f,p){if(f===0)return;const u=e.get("WEBGL_multi_draw");if(u===null)for(let g=0;g<l.length;g++)o(l[g],h[g],p[g]);else{u.multiDrawArraysInstancedWEBGL(n,l,0,h,0,p,0,f);let g=0;for(let _=0;_<f;_++)g+=h[_]*p[_];t.update(g,n,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function rm(i,e,t,n){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const P=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(P){return!(P!==ln&&n.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(P){const D=P===Ar&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(P!==_n&&n.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==mn&&!D)}function c(P){if(P==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const f=t.logarithmicDepthBuffer===!0,p=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),u=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),d=i.getParameter(i.MAX_VERTEX_ATTRIBS),b=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),y=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),C=g>0,w=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:f,reversedDepthBuffer:p,maxTextures:u,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:d,maxVertexUniforms:b,maxVaryings:y,maxFragmentUniforms:x,vertexTextures:C,maxSamples:w}}function sm(i){const e=this;let t=null,n=0,r=!1,s=!1;const o=new ii,a=new Ge,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,p){const u=f.length!==0||p||n!==0||r;return r=p,n=f.length,u},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,p){t=h(f,p,0)},this.setState=function(f,p,u){const g=f.clippingPlanes,_=f.clipIntersection,m=f.clipShadows,d=i.get(f);if(!r||g===null||g.length===0||s&&!m)s?h(null):l();else{const b=s?0:n,y=b*4;let x=d.clippingState||null;c.value=x,x=h(g,p,y,u);for(let C=0;C!==y;++C)x[C]=t[C];d.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=b}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(f,p,u,g){const _=f!==null?f.length:0;let m=null;if(_!==0){if(m=c.value,g!==!0||m===null){const d=u+_*4,b=p.matrixWorldInverse;a.getNormalMatrix(b),(m===null||m.length<d)&&(m=new Float32Array(d));for(let y=0,x=u;y!==_;++y,x+=4)o.copy(f[y]).applyMatrix4(b,a),o.normal.toArray(m,x),m[x+3]=o.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function om(i){let e=new WeakMap;function t(o,a){return a===So?o.mapping=Bi:a===yo&&(o.mapping=zi),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===So||a===yo)if(e.has(o)){const c=e.get(o).texture;return t(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new Mu(c.height);return l.fromEquirectangularTexture(i,o),e.set(o,l),o.addEventListener("dispose",r),t(l.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}const Ii=4,Tl=[.125,.215,.35,.446,.526,.582],oi=20,no=new Oc,bl=new Xe;let io=null,ro=0,so=0,oo=!1;const ri=(1+Math.sqrt(5))/2,Pi=1/ri,Al=[new L(-ri,Pi,0),new L(ri,Pi,0),new L(-Pi,0,ri),new L(Pi,0,ri),new L(0,ri,-Pi),new L(0,ri,Pi),new L(-1,1,-1),new L(1,1,-1),new L(-1,1,1),new L(1,1,1)],am=new L;class na{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,r=100,s={}){const{size:o=256,position:a=am}=s;io=this._renderer.getRenderTarget(),ro=this._renderer.getActiveCubeFace(),so=this._renderer.getActiveMipmapLevel(),oo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,r,c,a),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Cl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Rl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(io,ro,so),this._renderer.xr.enabled=oo,e.scissorTest=!1,is(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Bi||e.mapping===zi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),io=this._renderer.getRenderTarget(),ro=this._renderer.getActiveCubeFace(),so=this._renderer.getActiveMipmapLevel(),oo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:pn,minFilter:pn,generateMipmaps:!1,type:Ar,format:ln,colorSpace:ki,depthBuffer:!1},r=wl(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=wl(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=lm(s)),this._blurMaterial=cm(s,e,t)}return r}_compileMaterial(e){const t=new st(this._lodPlanes[0],e);this._renderer.compile(t,no)}_sceneToCubeUV(e,t,n,r,s){const c=new Ht(90,1,t,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],f=this._renderer,p=f.autoClear,u=f.toneMapping;f.getClearColor(bl),f.toneMapping=Xn,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(r),f.clearDepth(),f.setRenderTarget(null));const _=new ui({name:"PMREM.Background",side:Ot,depthWrite:!1,depthTest:!1}),m=new st(new vn,_);let d=!1;const b=e.background;b?b.isColor&&(_.color.copy(b),e.background=null,d=!0):(_.color.copy(bl),d=!0);for(let y=0;y<6;y++){const x=y%3;x===0?(c.up.set(0,l[y],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x+h[y],s.y,s.z)):x===1?(c.up.set(0,0,l[y]),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y+h[y],s.z)):(c.up.set(0,l[y],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y,s.z+h[y]));const C=this._cubeSize;is(r,x*C,y>2?C:0,C,C),f.setRenderTarget(r),d&&f.render(m,c),f.render(e,c)}m.geometry.dispose(),m.material.dispose(),f.toneMapping=u,f.autoClear=p,e.background=b}_textureToCubeUV(e,t){const n=this._renderer,r=e.mapping===Bi||e.mapping===zi;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Cl()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Rl());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new st(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const c=this._cubeSize;is(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(o,no)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=Al[(r-s-1)%Al.length];this._blur(e,s-1,s,o,a)}t.autoClear=n}_blur(e,t,n,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,r,"latitudinal",s),this._halfBlur(o,e,n,n,r,"longitudinal",s)}_halfBlur(e,t,n,r,s,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,f=new st(this._lodPlanes[r],l),p=l.uniforms,u=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*u):2*Math.PI/(2*oi-1),_=s/g,m=isFinite(s)?1+Math.floor(h*_):oi;m>oi&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${oi}`);const d=[];let b=0;for(let P=0;P<oi;++P){const D=P/_,T=Math.exp(-D*D/2);d.push(T),P===0?b+=T:P<m&&(b+=2*T)}for(let P=0;P<d.length;P++)d[P]=d[P]/b;p.envMap.value=e.texture,p.samples.value=m,p.weights.value=d,p.latitudinal.value=o==="latitudinal",a&&(p.poleAxis.value=a);const{_lodMax:y}=this;p.dTheta.value=g,p.mipInt.value=y-n;const x=this._sizeLods[r],C=3*x*(r>y-Ii?r-y+Ii:0),w=4*(this._cubeSize-x);is(t,C,w,3*x,2*x),c.setRenderTarget(t),c.render(f,no)}}function lm(i){const e=[],t=[],n=[];let r=i;const s=i-Ii+1+Tl.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);t.push(a);let c=1/a;o>i-Ii?c=Tl[o-i+Ii-1]:o===0&&(c=0),n.push(c);const l=1/(a-2),h=-l,f=1+l,p=[h,h,f,h,f,f,h,h,f,f,h,f],u=6,g=6,_=3,m=2,d=1,b=new Float32Array(_*g*u),y=new Float32Array(m*g*u),x=new Float32Array(d*g*u);for(let w=0;w<u;w++){const P=w%3*2/3-1,D=w>2?0:-1,T=[P,D,0,P+2/3,D,0,P+2/3,D+1,0,P,D,0,P+2/3,D+1,0,P,D+1,0];b.set(T,_*g*w),y.set(p,m*g*w);const S=[w,w,w,w,w,w];x.set(S,d*g*w)}const C=new Et;C.setAttribute("position",new en(b,_)),C.setAttribute("uv",new en(y,m)),C.setAttribute("faceIndex",new en(x,d)),e.push(C),r>Ii&&r--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function wl(i,e,t){const n=new hi(i,e,t);return n.texture.mapping=vs,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function is(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function cm(i,e,t){const n=new Float32Array(oi),r=new L(0,1,0);return new Jn({name:"SphericalGaussianBlur",defines:{n:oi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Ia(),fragmentShader:`

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
		`,blending:Wn,depthTest:!1,depthWrite:!1})}function Rl(){return new Jn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ia(),fragmentShader:`

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
		`,blending:Wn,depthTest:!1,depthWrite:!1})}function Cl(){return new Jn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ia(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Wn,depthTest:!1,depthWrite:!1})}function Ia(){return`

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
	`}function hm(i){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===So||c===yo,h=c===Bi||c===zi;if(l||h){let f=e.get(a);const p=f!==void 0?f.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==p)return t===null&&(t=new na(i)),f=l?t.fromEquirectangular(a,f):t.fromCubemap(a,f),f.texture.pmremVersion=a.pmremVersion,e.set(a,f),f.texture;if(f!==void 0)return f.texture;{const u=a.image;return l&&u&&u.height>0||h&&u&&r(u)?(t===null&&(t=new na(i)),f=l?t.fromEquirectangular(a):t.fromCubemap(a),f.texture.pmremVersion=a.pmremVersion,e.set(a,f),a.addEventListener("dispose",s),f.texture):null}}}return a}function r(a){let c=0;const l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function s(a){const c=a.target;c.removeEventListener("dispose",s);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function um(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const r=t(n);return r===null&&Mr("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function fm(i,e,t,n){const r={},s=new WeakMap;function o(f){const p=f.target;p.index!==null&&e.remove(p.index);for(const g in p.attributes)e.remove(p.attributes[g]);p.removeEventListener("dispose",o),delete r[p.id];const u=s.get(p);u&&(e.remove(u),s.delete(p)),n.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,t.memory.geometries--}function a(f,p){return r[p.id]===!0||(p.addEventListener("dispose",o),r[p.id]=!0,t.memory.geometries++),p}function c(f){const p=f.attributes;for(const u in p)e.update(p[u],i.ARRAY_BUFFER)}function l(f){const p=[],u=f.index,g=f.attributes.position;let _=0;if(u!==null){const b=u.array;_=u.version;for(let y=0,x=b.length;y<x;y+=3){const C=b[y+0],w=b[y+1],P=b[y+2];p.push(C,w,w,P,P,C)}}else if(g!==void 0){const b=g.array;_=g.version;for(let y=0,x=b.length/3-1;y<x;y+=3){const C=y+0,w=y+1,P=y+2;p.push(C,w,w,P,P,C)}}else return;const m=new(uc(p)?_c:gc)(p,1);m.version=_;const d=s.get(f);d&&e.remove(d),s.set(f,m)}function h(f){const p=s.get(f);if(p){const u=f.index;u!==null&&p.version<u.version&&l(f)}else l(f);return s.get(f)}return{get:a,update:c,getWireframeAttribute:h}}function dm(i,e,t){let n;function r(p){n=p}let s,o;function a(p){s=p.type,o=p.bytesPerElement}function c(p,u){i.drawElements(n,u,s,p*o),t.update(u,n,1)}function l(p,u,g){g!==0&&(i.drawElementsInstanced(n,u,s,p*o,g),t.update(u,n,g))}function h(p,u,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,s,p,0,g);let m=0;for(let d=0;d<g;d++)m+=u[d];t.update(m,n,1)}function f(p,u,g,_){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let d=0;d<p.length;d++)l(p[d]/o,u[d],_[d]);else{m.multiDrawElementsInstancedWEBGL(n,u,0,s,p,0,_,0,g);let d=0;for(let b=0;b<g;b++)d+=u[b]*_[b];t.update(d,n,1)}}this.setMode=r,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=f}function pm(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(s/3);break;case i.LINES:t.lines+=a*(s/2);break;case i.LINE_STRIP:t.lines+=a*(s-1);break;case i.LINE_LOOP:t.lines+=a*s;break;case i.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function mm(i,e,t){const n=new WeakMap,r=new lt;function s(o,a,c){const l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,f=h!==void 0?h.length:0;let p=n.get(a);if(p===void 0||p.count!==f){let S=function(){D.dispose(),n.delete(a),a.removeEventListener("dispose",S)};var u=S;p!==void 0&&p.texture.dispose();const g=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,d=a.morphAttributes.position||[],b=a.morphAttributes.normal||[],y=a.morphAttributes.color||[];let x=0;g===!0&&(x=1),_===!0&&(x=2),m===!0&&(x=3);let C=a.attributes.position.count*x,w=1;C>e.maxTextureSize&&(w=Math.ceil(C/e.maxTextureSize),C=e.maxTextureSize);const P=new Float32Array(C*w*4*f),D=new fc(P,C,w,f);D.type=mn,D.needsUpdate=!0;const T=x*4;for(let I=0;I<f;I++){const B=d[I],H=b[I],J=y[I],G=C*w*4*I;for(let Y=0;Y<B.count;Y++){const ee=Y*T;g===!0&&(r.fromBufferAttribute(B,Y),P[G+ee+0]=r.x,P[G+ee+1]=r.y,P[G+ee+2]=r.z,P[G+ee+3]=0),_===!0&&(r.fromBufferAttribute(H,Y),P[G+ee+4]=r.x,P[G+ee+5]=r.y,P[G+ee+6]=r.z,P[G+ee+7]=0),m===!0&&(r.fromBufferAttribute(J,Y),P[G+ee+8]=r.x,P[G+ee+9]=r.y,P[G+ee+10]=r.z,P[G+ee+11]=J.itemSize===4?r.w:1)}}p={count:f,texture:D,size:new ue(C,w)},n.set(a,p),a.addEventListener("dispose",S)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let g=0;for(let m=0;m<l.length;m++)g+=l[m];const _=a.morphTargetsRelative?1:1-g;c.getUniforms().setValue(i,"morphTargetBaseInfluence",_),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",p.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",p.size)}return{update:s}}function gm(i,e,t,n){let r=new WeakMap;function s(c){const l=n.render.frame,h=c.geometry,f=e.get(c,h);if(r.get(f)!==l&&(e.update(f),r.set(f,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),r.get(c)!==l&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,l))),c.isSkinnedMesh){const p=c.skeleton;r.get(p)!==l&&(p.update(),r.set(p,l))}return f}function o(){r=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:s,dispose:o}}const zc=new Pt,Pl=new Tc(1,1),kc=new fc,Hc=new iu,Vc=new Mc,Ll=[],Il=[],Dl=new Float32Array(16),Ul=new Float32Array(9),Nl=new Float32Array(4);function Zi(i,e,t){const n=i[0];if(n<=0||n>0)return i;const r=e*t;let s=Ll[r];if(s===void 0&&(s=new Float32Array(r),Ll[r]=s),e!==0){n.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(s,a)}return s}function bt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function At(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function ys(i,e){let t=Il[e];t===void 0&&(t=new Int32Array(e),Il[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function _m(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function vm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(bt(t,e))return;i.uniform2fv(this.addr,e),At(t,e)}}function xm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(bt(t,e))return;i.uniform3fv(this.addr,e),At(t,e)}}function Mm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(bt(t,e))return;i.uniform4fv(this.addr,e),At(t,e)}}function Sm(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(bt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),At(t,e)}else{if(bt(t,n))return;Nl.set(n),i.uniformMatrix2fv(this.addr,!1,Nl),At(t,n)}}function ym(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(bt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),At(t,e)}else{if(bt(t,n))return;Ul.set(n),i.uniformMatrix3fv(this.addr,!1,Ul),At(t,n)}}function Em(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(bt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),At(t,e)}else{if(bt(t,n))return;Dl.set(n),i.uniformMatrix4fv(this.addr,!1,Dl),At(t,n)}}function Tm(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function bm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(bt(t,e))return;i.uniform2iv(this.addr,e),At(t,e)}}function Am(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(bt(t,e))return;i.uniform3iv(this.addr,e),At(t,e)}}function wm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(bt(t,e))return;i.uniform4iv(this.addr,e),At(t,e)}}function Rm(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Cm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(bt(t,e))return;i.uniform2uiv(this.addr,e),At(t,e)}}function Pm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(bt(t,e))return;i.uniform3uiv(this.addr,e),At(t,e)}}function Lm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(bt(t,e))return;i.uniform4uiv(this.addr,e),At(t,e)}}function Im(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_2D_SHADOW?(Pl.compareFunction=hc,s=Pl):s=zc,t.setTexture2D(e||s,r)}function Dm(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||Hc,r)}function Um(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||Vc,r)}function Nm(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||kc,r)}function Fm(i){switch(i){case 5126:return _m;case 35664:return vm;case 35665:return xm;case 35666:return Mm;case 35674:return Sm;case 35675:return ym;case 35676:return Em;case 5124:case 35670:return Tm;case 35667:case 35671:return bm;case 35668:case 35672:return Am;case 35669:case 35673:return wm;case 5125:return Rm;case 36294:return Cm;case 36295:return Pm;case 36296:return Lm;case 35678:case 36198:case 36298:case 36306:case 35682:return Im;case 35679:case 36299:case 36307:return Dm;case 35680:case 36300:case 36308:case 36293:return Um;case 36289:case 36303:case 36311:case 36292:return Nm}}function Om(i,e){i.uniform1fv(this.addr,e)}function Bm(i,e){const t=Zi(e,this.size,2);i.uniform2fv(this.addr,t)}function zm(i,e){const t=Zi(e,this.size,3);i.uniform3fv(this.addr,t)}function km(i,e){const t=Zi(e,this.size,4);i.uniform4fv(this.addr,t)}function Hm(i,e){const t=Zi(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Vm(i,e){const t=Zi(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Gm(i,e){const t=Zi(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Wm(i,e){i.uniform1iv(this.addr,e)}function Xm(i,e){i.uniform2iv(this.addr,e)}function qm(i,e){i.uniform3iv(this.addr,e)}function Ym(i,e){i.uniform4iv(this.addr,e)}function Jm(i,e){i.uniform1uiv(this.addr,e)}function Zm(i,e){i.uniform2uiv(this.addr,e)}function Km(i,e){i.uniform3uiv(this.addr,e)}function $m(i,e){i.uniform4uiv(this.addr,e)}function jm(i,e,t){const n=this.cache,r=e.length,s=ys(t,r);bt(n,s)||(i.uniform1iv(this.addr,s),At(n,s));for(let o=0;o!==r;++o)t.setTexture2D(e[o]||zc,s[o])}function Qm(i,e,t){const n=this.cache,r=e.length,s=ys(t,r);bt(n,s)||(i.uniform1iv(this.addr,s),At(n,s));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||Hc,s[o])}function e0(i,e,t){const n=this.cache,r=e.length,s=ys(t,r);bt(n,s)||(i.uniform1iv(this.addr,s),At(n,s));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||Vc,s[o])}function t0(i,e,t){const n=this.cache,r=e.length,s=ys(t,r);bt(n,s)||(i.uniform1iv(this.addr,s),At(n,s));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||kc,s[o])}function n0(i){switch(i){case 5126:return Om;case 35664:return Bm;case 35665:return zm;case 35666:return km;case 35674:return Hm;case 35675:return Vm;case 35676:return Gm;case 5124:case 35670:return Wm;case 35667:case 35671:return Xm;case 35668:case 35672:return qm;case 35669:case 35673:return Ym;case 5125:return Jm;case 36294:return Zm;case 36295:return Km;case 36296:return $m;case 35678:case 36198:case 36298:case 36306:case 35682:return jm;case 35679:case 36299:case 36307:return Qm;case 35680:case 36300:case 36308:case 36293:return e0;case 36289:case 36303:case 36311:case 36292:return t0}}class i0{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Fm(t.type)}}class r0{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=n0(t.type)}}class s0{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,t[a.id],n)}}}const ao=/(\w+)(\])?(\[|\.)?/g;function Fl(i,e){i.seq.push(e),i.map[e.id]=e}function o0(i,e,t){const n=i.name,r=n.length;for(ao.lastIndex=0;;){const s=ao.exec(n),o=ao.lastIndex;let a=s[1];const c=s[2]==="]",l=s[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===r){Fl(t,l===void 0?new i0(a,i,e):new r0(a,i,e));break}else{let f=t.map[a];f===void 0&&(f=new s0(a),Fl(t,f)),t=f}}}class hs{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){const s=e.getActiveUniform(t,r),o=e.getUniformLocation(t,s.name);o0(s,o,this)}}setValue(e,t,n,r){const s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){const r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,o=t.length;s!==o;++s){const a=t[s],c=n[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,r)}}static seqWithValue(e,t){const n=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in t&&n.push(o)}return n}}function Ol(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const a0=37297;let l0=0;function c0(i,e){const t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=r;o<s;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}const Bl=new Ge;function h0(i){tt._getMatrix(Bl,tt.workingColorSpace,i);const e=`mat3( ${Bl.elements.map(t=>t.toFixed(4))} )`;switch(tt.getTransfer(i)){case fs:return[e,"LinearTransferOETF"];case at:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function zl(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=(i.getShaderInfoLog(e)||"").trim();if(n&&s==="")return"";const o=/ERROR: 0:(\d+)/.exec(s);if(o){const a=parseInt(o[1]);return t.toUpperCase()+`

`+s+`

`+c0(i.getShaderSource(e),a)}else return s}function u0(i,e){const t=h0(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function f0(i,e){let t;switch(e){case Lh:t="Linear";break;case Ih:t="Reinhard";break;case Dh:t="Cineon";break;case tc:t="ACESFilmic";break;case Nh:t="AgX";break;case Fh:t="Neutral";break;case Uh:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const rs=new L;function d0(){tt.getLuminanceCoefficients(rs);const i=rs.x.toFixed(4),e=rs.y.toFixed(4),t=rs.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function p0(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(hr).join(`
`)}function m0(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function g0(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(e,r),o=s.name;let a=1;s.type===i.FLOAT_MAT2&&(a=2),s.type===i.FLOAT_MAT3&&(a=3),s.type===i.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function hr(i){return i!==""}function kl(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Hl(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const _0=/^[ \t]*#include +<([\w\d./]+)>/gm;function ia(i){return i.replace(_0,x0)}const v0=new Map;function x0(i,e){let t=We[e];if(t===void 0){const n=v0.get(e);if(n!==void 0)t=We[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return ia(t)}const M0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Vl(i){return i.replace(M0,S0)}function S0(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Gl(i){let e=`precision ${i.precision} float;
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
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function y0(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Ql?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===ec?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===wn&&(e="SHADOWMAP_TYPE_VSM"),e}function E0(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Bi:case zi:e="ENVMAP_TYPE_CUBE";break;case vs:e="ENVMAP_TYPE_CUBE_UV";break}return e}function T0(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case zi:e="ENVMAP_MODE_REFRACTION";break}return e}function b0(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case ua:e="ENVMAP_BLENDING_MULTIPLY";break;case Ch:e="ENVMAP_BLENDING_MIX";break;case Ph:e="ENVMAP_BLENDING_ADD";break}return e}function A0(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function w0(i,e,t,n){const r=i.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const c=y0(t),l=E0(t),h=T0(t),f=b0(t),p=A0(t),u=p0(t),g=m0(s),_=r.createProgram();let m,d,b=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(hr).join(`
`),m.length>0&&(m+=`
`),d=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(hr).join(`
`),d.length>0&&(d+=`
`)):(m=[Gl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(hr).join(`
`),d=[Gl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+f:"",p?"#define CUBEUV_TEXEL_WIDTH "+p.texelWidth:"",p?"#define CUBEUV_TEXEL_HEIGHT "+p.texelHeight:"",p?"#define CUBEUV_MAX_MIP "+p.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Xn?"#define TONE_MAPPING":"",t.toneMapping!==Xn?We.tonemapping_pars_fragment:"",t.toneMapping!==Xn?f0("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",We.colorspace_pars_fragment,u0("linearToOutputTexel",t.outputColorSpace),d0(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(hr).join(`
`)),o=ia(o),o=kl(o,t),o=Hl(o,t),a=ia(a),a=kl(a,t),a=Hl(a,t),o=Vl(o),a=Vl(a),t.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,m=[u,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,d=["#define varying in",t.glslVersion===Ya?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Ya?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const y=b+m+o,x=b+d+a,C=Ol(r,r.VERTEX_SHADER,y),w=Ol(r,r.FRAGMENT_SHADER,x);r.attachShader(_,C),r.attachShader(_,w),t.index0AttributeName!==void 0?r.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_);function P(I){if(i.debug.checkShaderErrors){const B=r.getProgramInfoLog(_)||"",H=r.getShaderInfoLog(C)||"",J=r.getShaderInfoLog(w)||"",G=B.trim(),Y=H.trim(),ee=J.trim();let W=!0,pe=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if(W=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,_,C,w);else{const Me=zl(r,C,"vertex"),Ee=zl(r,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+G+`
`+Me+`
`+Ee)}else G!==""?console.warn("THREE.WebGLProgram: Program Info Log:",G):(Y===""||ee==="")&&(pe=!1);pe&&(I.diagnostics={runnable:W,programLog:G,vertexShader:{log:Y,prefix:m},fragmentShader:{log:ee,prefix:d}})}r.deleteShader(C),r.deleteShader(w),D=new hs(r,_),T=g0(r,_)}let D;this.getUniforms=function(){return D===void 0&&P(this),D};let T;this.getAttributes=function(){return T===void 0&&P(this),T};let S=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=r.getProgramParameter(_,a0)),S},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=l0++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=C,this.fragmentShader=w,this}let R0=0;class C0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new P0(e),t.set(e,n)),n}}class P0{constructor(e){this.id=R0++,this.code=e,this.usedTimes=0}}function L0(i,e,t,n,r,s,o){const a=new pc,c=new C0,l=new Set,h=[],f=r.logarithmicDepthBuffer,p=r.vertexTextures;let u=r.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(T){return l.add(T),T===0?"uv":`uv${T}`}function m(T,S,I,B,H){const J=B.fog,G=H.geometry,Y=T.isMeshStandardMaterial?B.environment:null,ee=(T.isMeshStandardMaterial?t:e).get(T.envMap||Y),W=ee&&ee.mapping===vs?ee.image.height:null,pe=g[T.type];T.precision!==null&&(u=r.getMaxPrecision(T.precision),u!==T.precision&&console.warn("THREE.WebGLProgram.getParameters:",T.precision,"not supported, using",u,"instead."));const Me=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,Ee=Me!==void 0?Me.length:0;let He=0;G.morphAttributes.position!==void 0&&(He=1),G.morphAttributes.normal!==void 0&&(He=2),G.morphAttributes.color!==void 0&&(He=3);let Ke,rt,je,Z;if(pe){const it=dn[pe];Ke=it.vertexShader,rt=it.fragmentShader}else Ke=T.vertexShader,rt=T.fragmentShader,c.update(T),je=c.getVertexShaderID(T),Z=c.getFragmentShaderID(T);const re=i.getRenderTarget(),ye=i.state.buffers.depth.getReversed(),Ie=H.isInstancedMesh===!0,Ae=H.isBatchedMesh===!0,Ye=!!T.map,ut=!!T.matcap,R=!!ee,ie=!!T.aoMap,j=!!T.lightMap,$=!!T.bumpMap,K=!!T.normalMap,fe=!!T.displacementMap,se=!!T.emissiveMap,de=!!T.metalnessMap,ze=!!T.roughnessMap,Be=T.anisotropy>0,A=T.clearcoat>0,v=T.dispersion>0,O=T.iridescence>0,V=T.sheen>0,ne=T.transmission>0,X=Be&&!!T.anisotropyMap,Pe=A&&!!T.clearcoatMap,he=A&&!!T.clearcoatNormalMap,we=A&&!!T.clearcoatRoughnessMap,Re=O&&!!T.iridescenceMap,oe=O&&!!T.iridescenceThicknessMap,xe=V&&!!T.sheenColorMap,Fe=V&&!!T.sheenRoughnessMap,Le=!!T.specularMap,_e=!!T.specularColorMap,Ve=!!T.specularIntensityMap,U=ne&&!!T.transmissionMap,ce=ne&&!!T.thicknessMap,me=!!T.gradientMap,Te=!!T.alphaMap,ae=T.alphaTest>0,Q=!!T.alphaHash,Ce=!!T.extensions;let ke=Xn;T.toneMapped&&(re===null||re.isXRRenderTarget===!0)&&(ke=i.toneMapping);const ft={shaderID:pe,shaderType:T.type,shaderName:T.name,vertexShader:Ke,fragmentShader:rt,defines:T.defines,customVertexShaderID:je,customFragmentShaderID:Z,isRawShaderMaterial:T.isRawShaderMaterial===!0,glslVersion:T.glslVersion,precision:u,batching:Ae,batchingColor:Ae&&H._colorsTexture!==null,instancing:Ie,instancingColor:Ie&&H.instanceColor!==null,instancingMorph:Ie&&H.morphTexture!==null,supportsVertexTextures:p,outputColorSpace:re===null?i.outputColorSpace:re.isXRRenderTarget===!0?re.texture.colorSpace:ki,alphaToCoverage:!!T.alphaToCoverage,map:Ye,matcap:ut,envMap:R,envMapMode:R&&ee.mapping,envMapCubeUVHeight:W,aoMap:ie,lightMap:j,bumpMap:$,normalMap:K,displacementMap:p&&fe,emissiveMap:se,normalMapObjectSpace:K&&T.normalMapType===kh,normalMapTangentSpace:K&&T.normalMapType===xa,metalnessMap:de,roughnessMap:ze,anisotropy:Be,anisotropyMap:X,clearcoat:A,clearcoatMap:Pe,clearcoatNormalMap:he,clearcoatRoughnessMap:we,dispersion:v,iridescence:O,iridescenceMap:Re,iridescenceThicknessMap:oe,sheen:V,sheenColorMap:xe,sheenRoughnessMap:Fe,specularMap:Le,specularColorMap:_e,specularIntensityMap:Ve,transmission:ne,transmissionMap:U,thicknessMap:ce,gradientMap:me,opaque:T.transparent===!1&&T.blending===Ui&&T.alphaToCoverage===!1,alphaMap:Te,alphaTest:ae,alphaHash:Q,combine:T.combine,mapUv:Ye&&_(T.map.channel),aoMapUv:ie&&_(T.aoMap.channel),lightMapUv:j&&_(T.lightMap.channel),bumpMapUv:$&&_(T.bumpMap.channel),normalMapUv:K&&_(T.normalMap.channel),displacementMapUv:fe&&_(T.displacementMap.channel),emissiveMapUv:se&&_(T.emissiveMap.channel),metalnessMapUv:de&&_(T.metalnessMap.channel),roughnessMapUv:ze&&_(T.roughnessMap.channel),anisotropyMapUv:X&&_(T.anisotropyMap.channel),clearcoatMapUv:Pe&&_(T.clearcoatMap.channel),clearcoatNormalMapUv:he&&_(T.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:we&&_(T.clearcoatRoughnessMap.channel),iridescenceMapUv:Re&&_(T.iridescenceMap.channel),iridescenceThicknessMapUv:oe&&_(T.iridescenceThicknessMap.channel),sheenColorMapUv:xe&&_(T.sheenColorMap.channel),sheenRoughnessMapUv:Fe&&_(T.sheenRoughnessMap.channel),specularMapUv:Le&&_(T.specularMap.channel),specularColorMapUv:_e&&_(T.specularColorMap.channel),specularIntensityMapUv:Ve&&_(T.specularIntensityMap.channel),transmissionMapUv:U&&_(T.transmissionMap.channel),thicknessMapUv:ce&&_(T.thicknessMap.channel),alphaMapUv:Te&&_(T.alphaMap.channel),vertexTangents:!!G.attributes.tangent&&(K||Be),vertexColors:T.vertexColors,vertexAlphas:T.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,pointsUvs:H.isPoints===!0&&!!G.attributes.uv&&(Ye||Te),fog:!!J,useFog:T.fog===!0,fogExp2:!!J&&J.isFogExp2,flatShading:T.flatShading===!0&&T.wireframe===!1,sizeAttenuation:T.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:ye,skinning:H.isSkinnedMesh===!0,morphTargets:G.morphAttributes.position!==void 0,morphNormals:G.morphAttributes.normal!==void 0,morphColors:G.morphAttributes.color!==void 0,morphTargetsCount:Ee,morphTextureStride:He,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:T.dithering,shadowMapEnabled:i.shadowMap.enabled&&I.length>0,shadowMapType:i.shadowMap.type,toneMapping:ke,decodeVideoTexture:Ye&&T.map.isVideoTexture===!0&&tt.getTransfer(T.map.colorSpace)===at,decodeVideoTextureEmissive:se&&T.emissiveMap.isVideoTexture===!0&&tt.getTransfer(T.emissiveMap.colorSpace)===at,premultipliedAlpha:T.premultipliedAlpha,doubleSided:T.side===qt,flipSided:T.side===Ot,useDepthPacking:T.depthPacking>=0,depthPacking:T.depthPacking||0,index0AttributeName:T.index0AttributeName,extensionClipCullDistance:Ce&&T.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ce&&T.extensions.multiDraw===!0||Ae)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:T.customProgramCacheKey()};return ft.vertexUv1s=l.has(1),ft.vertexUv2s=l.has(2),ft.vertexUv3s=l.has(3),l.clear(),ft}function d(T){const S=[];if(T.shaderID?S.push(T.shaderID):(S.push(T.customVertexShaderID),S.push(T.customFragmentShaderID)),T.defines!==void 0)for(const I in T.defines)S.push(I),S.push(T.defines[I]);return T.isRawShaderMaterial===!1&&(b(S,T),y(S,T),S.push(i.outputColorSpace)),S.push(T.customProgramCacheKey),S.join()}function b(T,S){T.push(S.precision),T.push(S.outputColorSpace),T.push(S.envMapMode),T.push(S.envMapCubeUVHeight),T.push(S.mapUv),T.push(S.alphaMapUv),T.push(S.lightMapUv),T.push(S.aoMapUv),T.push(S.bumpMapUv),T.push(S.normalMapUv),T.push(S.displacementMapUv),T.push(S.emissiveMapUv),T.push(S.metalnessMapUv),T.push(S.roughnessMapUv),T.push(S.anisotropyMapUv),T.push(S.clearcoatMapUv),T.push(S.clearcoatNormalMapUv),T.push(S.clearcoatRoughnessMapUv),T.push(S.iridescenceMapUv),T.push(S.iridescenceThicknessMapUv),T.push(S.sheenColorMapUv),T.push(S.sheenRoughnessMapUv),T.push(S.specularMapUv),T.push(S.specularColorMapUv),T.push(S.specularIntensityMapUv),T.push(S.transmissionMapUv),T.push(S.thicknessMapUv),T.push(S.combine),T.push(S.fogExp2),T.push(S.sizeAttenuation),T.push(S.morphTargetsCount),T.push(S.morphAttributeCount),T.push(S.numDirLights),T.push(S.numPointLights),T.push(S.numSpotLights),T.push(S.numSpotLightMaps),T.push(S.numHemiLights),T.push(S.numRectAreaLights),T.push(S.numDirLightShadows),T.push(S.numPointLightShadows),T.push(S.numSpotLightShadows),T.push(S.numSpotLightShadowsWithMaps),T.push(S.numLightProbes),T.push(S.shadowMapType),T.push(S.toneMapping),T.push(S.numClippingPlanes),T.push(S.numClipIntersection),T.push(S.depthPacking)}function y(T,S){a.disableAll(),S.supportsVertexTextures&&a.enable(0),S.instancing&&a.enable(1),S.instancingColor&&a.enable(2),S.instancingMorph&&a.enable(3),S.matcap&&a.enable(4),S.envMap&&a.enable(5),S.normalMapObjectSpace&&a.enable(6),S.normalMapTangentSpace&&a.enable(7),S.clearcoat&&a.enable(8),S.iridescence&&a.enable(9),S.alphaTest&&a.enable(10),S.vertexColors&&a.enable(11),S.vertexAlphas&&a.enable(12),S.vertexUv1s&&a.enable(13),S.vertexUv2s&&a.enable(14),S.vertexUv3s&&a.enable(15),S.vertexTangents&&a.enable(16),S.anisotropy&&a.enable(17),S.alphaHash&&a.enable(18),S.batching&&a.enable(19),S.dispersion&&a.enable(20),S.batchingColor&&a.enable(21),S.gradientMap&&a.enable(22),T.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reversedDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.decodeVideoTextureEmissive&&a.enable(20),S.alphaToCoverage&&a.enable(21),T.push(a.mask)}function x(T){const S=g[T.type];let I;if(S){const B=dn[S];I=gu.clone(B.uniforms)}else I=T.uniforms;return I}function C(T,S){let I;for(let B=0,H=h.length;B<H;B++){const J=h[B];if(J.cacheKey===S){I=J,++I.usedTimes;break}}return I===void 0&&(I=new w0(i,S,T,s),h.push(I)),I}function w(T){if(--T.usedTimes===0){const S=h.indexOf(T);h[S]=h[h.length-1],h.pop(),T.destroy()}}function P(T){c.remove(T)}function D(){c.dispose()}return{getParameters:m,getProgramCacheKey:d,getUniforms:x,acquireProgram:C,releaseProgram:w,releaseShaderCache:P,programs:h,dispose:D}}function I0(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function r(o,a,c){i.get(o)[a]=c}function s(){i=new WeakMap}return{has:e,get:t,remove:n,update:r,dispose:s}}function D0(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Wl(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Xl(){const i=[];let e=0;const t=[],n=[],r=[];function s(){e=0,t.length=0,n.length=0,r.length=0}function o(f,p,u,g,_,m){let d=i[e];return d===void 0?(d={id:f.id,object:f,geometry:p,material:u,groupOrder:g,renderOrder:f.renderOrder,z:_,group:m},i[e]=d):(d.id=f.id,d.object=f,d.geometry=p,d.material=u,d.groupOrder=g,d.renderOrder=f.renderOrder,d.z=_,d.group=m),e++,d}function a(f,p,u,g,_,m){const d=o(f,p,u,g,_,m);u.transmission>0?n.push(d):u.transparent===!0?r.push(d):t.push(d)}function c(f,p,u,g,_,m){const d=o(f,p,u,g,_,m);u.transmission>0?n.unshift(d):u.transparent===!0?r.unshift(d):t.unshift(d)}function l(f,p){t.length>1&&t.sort(f||D0),n.length>1&&n.sort(p||Wl),r.length>1&&r.sort(p||Wl)}function h(){for(let f=e,p=i.length;f<p;f++){const u=i[f];if(u.id===null)break;u.id=null,u.object=null,u.geometry=null,u.material=null,u.group=null}}return{opaque:t,transmissive:n,transparent:r,init:s,push:a,unshift:c,finish:h,sort:l}}function U0(){let i=new WeakMap;function e(n,r){const s=i.get(n);let o;return s===void 0?(o=new Xl,i.set(n,[o])):r>=s.length?(o=new Xl,s.push(o)):o=s[r],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function N0(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new L,color:new Xe};break;case"SpotLight":t={position:new L,direction:new L,color:new Xe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new L,color:new Xe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new L,skyColor:new Xe,groundColor:new Xe};break;case"RectAreaLight":t={color:new Xe,position:new L,halfWidth:new L,halfHeight:new L};break}return i[e.id]=t,t}}}function F0(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ue};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ue};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ue,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let O0=0;function B0(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function z0(i){const e=new N0,t=F0(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new L);const r=new L,s=new ht,o=new ht;function a(l){let h=0,f=0,p=0;for(let T=0;T<9;T++)n.probe[T].set(0,0,0);let u=0,g=0,_=0,m=0,d=0,b=0,y=0,x=0,C=0,w=0,P=0;l.sort(B0);for(let T=0,S=l.length;T<S;T++){const I=l[T],B=I.color,H=I.intensity,J=I.distance,G=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)h+=B.r*H,f+=B.g*H,p+=B.b*H;else if(I.isLightProbe){for(let Y=0;Y<9;Y++)n.probe[Y].addScaledVector(I.sh.coefficients[Y],H);P++}else if(I.isDirectionalLight){const Y=e.get(I);if(Y.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const ee=I.shadow,W=t.get(I);W.shadowIntensity=ee.intensity,W.shadowBias=ee.bias,W.shadowNormalBias=ee.normalBias,W.shadowRadius=ee.radius,W.shadowMapSize=ee.mapSize,n.directionalShadow[u]=W,n.directionalShadowMap[u]=G,n.directionalShadowMatrix[u]=I.shadow.matrix,b++}n.directional[u]=Y,u++}else if(I.isSpotLight){const Y=e.get(I);Y.position.setFromMatrixPosition(I.matrixWorld),Y.color.copy(B).multiplyScalar(H),Y.distance=J,Y.coneCos=Math.cos(I.angle),Y.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),Y.decay=I.decay,n.spot[_]=Y;const ee=I.shadow;if(I.map&&(n.spotLightMap[C]=I.map,C++,ee.updateMatrices(I),I.castShadow&&w++),n.spotLightMatrix[_]=ee.matrix,I.castShadow){const W=t.get(I);W.shadowIntensity=ee.intensity,W.shadowBias=ee.bias,W.shadowNormalBias=ee.normalBias,W.shadowRadius=ee.radius,W.shadowMapSize=ee.mapSize,n.spotShadow[_]=W,n.spotShadowMap[_]=G,x++}_++}else if(I.isRectAreaLight){const Y=e.get(I);Y.color.copy(B).multiplyScalar(H),Y.halfWidth.set(I.width*.5,0,0),Y.halfHeight.set(0,I.height*.5,0),n.rectArea[m]=Y,m++}else if(I.isPointLight){const Y=e.get(I);if(Y.color.copy(I.color).multiplyScalar(I.intensity),Y.distance=I.distance,Y.decay=I.decay,I.castShadow){const ee=I.shadow,W=t.get(I);W.shadowIntensity=ee.intensity,W.shadowBias=ee.bias,W.shadowNormalBias=ee.normalBias,W.shadowRadius=ee.radius,W.shadowMapSize=ee.mapSize,W.shadowCameraNear=ee.camera.near,W.shadowCameraFar=ee.camera.far,n.pointShadow[g]=W,n.pointShadowMap[g]=G,n.pointShadowMatrix[g]=I.shadow.matrix,y++}n.point[g]=Y,g++}else if(I.isHemisphereLight){const Y=e.get(I);Y.skyColor.copy(I.color).multiplyScalar(H),Y.groundColor.copy(I.groundColor).multiplyScalar(H),n.hemi[d]=Y,d++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ge.LTC_FLOAT_1,n.rectAreaLTC2=ge.LTC_FLOAT_2):(n.rectAreaLTC1=ge.LTC_HALF_1,n.rectAreaLTC2=ge.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=f,n.ambient[2]=p;const D=n.hash;(D.directionalLength!==u||D.pointLength!==g||D.spotLength!==_||D.rectAreaLength!==m||D.hemiLength!==d||D.numDirectionalShadows!==b||D.numPointShadows!==y||D.numSpotShadows!==x||D.numSpotMaps!==C||D.numLightProbes!==P)&&(n.directional.length=u,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=d,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=b,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=x+C-w,n.spotLightMap.length=C,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=P,D.directionalLength=u,D.pointLength=g,D.spotLength=_,D.rectAreaLength=m,D.hemiLength=d,D.numDirectionalShadows=b,D.numPointShadows=y,D.numSpotShadows=x,D.numSpotMaps=C,D.numLightProbes=P,n.version=O0++)}function c(l,h){let f=0,p=0,u=0,g=0,_=0;const m=h.matrixWorldInverse;for(let d=0,b=l.length;d<b;d++){const y=l[d];if(y.isDirectionalLight){const x=n.directional[f];x.direction.setFromMatrixPosition(y.matrixWorld),r.setFromMatrixPosition(y.target.matrixWorld),x.direction.sub(r),x.direction.transformDirection(m),f++}else if(y.isSpotLight){const x=n.spot[u];x.position.setFromMatrixPosition(y.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(y.matrixWorld),r.setFromMatrixPosition(y.target.matrixWorld),x.direction.sub(r),x.direction.transformDirection(m),u++}else if(y.isRectAreaLight){const x=n.rectArea[g];x.position.setFromMatrixPosition(y.matrixWorld),x.position.applyMatrix4(m),o.identity(),s.copy(y.matrixWorld),s.premultiply(m),o.extractRotation(s),x.halfWidth.set(y.width*.5,0,0),x.halfHeight.set(0,y.height*.5,0),x.halfWidth.applyMatrix4(o),x.halfHeight.applyMatrix4(o),g++}else if(y.isPointLight){const x=n.point[p];x.position.setFromMatrixPosition(y.matrixWorld),x.position.applyMatrix4(m),p++}else if(y.isHemisphereLight){const x=n.hemi[_];x.direction.setFromMatrixPosition(y.matrixWorld),x.direction.transformDirection(m),_++}}}return{setup:a,setupView:c,state:n}}function ql(i){const e=new z0(i),t=[],n=[];function r(h){l.camera=h,t.length=0,n.length=0}function s(h){t.push(h)}function o(h){n.push(h)}function a(){e.setup(t)}function c(h){e.setupView(t,h)}const l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:l,setupLights:a,setupLightsView:c,pushLight:s,pushShadow:o}}function k0(i){let e=new WeakMap;function t(r,s=0){const o=e.get(r);let a;return o===void 0?(a=new ql(i),e.set(r,[a])):s>=o.length?(a=new ql(i),o.push(a)):a=o[s],a}function n(){e=new WeakMap}return{get:t,dispose:n}}const H0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,V0=`uniform sampler2D shadow_pass;
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
}`;function G0(i,e,t){let n=new ya;const r=new ue,s=new ue,o=new lt,a=new cf({depthPacking:zh}),c=new hf,l={},h=t.maxTextureSize,f={[Yn]:Ot,[Ot]:Yn,[qt]:qt},p=new Jn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ue},radius:{value:4}},vertexShader:H0,fragmentShader:V0}),u=p.clone();u.defines.HORIZONTAL_PASS=1;const g=new Et;g.setAttribute("position",new en(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new st(g,p),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ql;let d=this.type;this.render=function(w,P,D){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;const T=i.getRenderTarget(),S=i.getActiveCubeFace(),I=i.getActiveMipmapLevel(),B=i.state;B.setBlending(Wn),B.buffers.depth.getReversed()===!0?B.buffers.color.setClear(0,0,0,0):B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);const H=d!==wn&&this.type===wn,J=d===wn&&this.type!==wn;for(let G=0,Y=w.length;G<Y;G++){const ee=w[G],W=ee.shadow;if(W===void 0){console.warn("THREE.WebGLShadowMap:",ee,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;r.copy(W.mapSize);const pe=W.getFrameExtents();if(r.multiply(pe),s.copy(W.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(s.x=Math.floor(h/pe.x),r.x=s.x*pe.x,W.mapSize.x=s.x),r.y>h&&(s.y=Math.floor(h/pe.y),r.y=s.y*pe.y,W.mapSize.y=s.y)),W.map===null||H===!0||J===!0){const Ee=this.type!==wn?{minFilter:Jt,magFilter:Jt}:{};W.map!==null&&W.map.dispose(),W.map=new hi(r.x,r.y,Ee),W.map.texture.name=ee.name+".shadowMap",W.camera.updateProjectionMatrix()}i.setRenderTarget(W.map),i.clear();const Me=W.getViewportCount();for(let Ee=0;Ee<Me;Ee++){const He=W.getViewport(Ee);o.set(s.x*He.x,s.y*He.y,s.x*He.z,s.y*He.w),B.viewport(o),W.updateMatrices(ee,Ee),n=W.getFrustum(),x(P,D,W.camera,ee,this.type)}W.isPointLightShadow!==!0&&this.type===wn&&b(W,D),W.needsUpdate=!1}d=this.type,m.needsUpdate=!1,i.setRenderTarget(T,S,I)};function b(w,P){const D=e.update(_);p.defines.VSM_SAMPLES!==w.blurSamples&&(p.defines.VSM_SAMPLES=w.blurSamples,u.defines.VSM_SAMPLES=w.blurSamples,p.needsUpdate=!0,u.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new hi(r.x,r.y)),p.uniforms.shadow_pass.value=w.map.texture,p.uniforms.resolution.value=w.mapSize,p.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(P,null,D,p,_,null),u.uniforms.shadow_pass.value=w.mapPass.texture,u.uniforms.resolution.value=w.mapSize,u.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(P,null,D,u,_,null)}function y(w,P,D,T){let S=null;const I=D.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(I!==void 0)S=I;else if(S=D.isPointLight===!0?c:a,i.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){const B=S.uuid,H=P.uuid;let J=l[B];J===void 0&&(J={},l[B]=J);let G=J[H];G===void 0&&(G=S.clone(),J[H]=G,P.addEventListener("dispose",C)),S=G}if(S.visible=P.visible,S.wireframe=P.wireframe,T===wn?S.side=P.shadowSide!==null?P.shadowSide:P.side:S.side=P.shadowSide!==null?P.shadowSide:f[P.side],S.alphaMap=P.alphaMap,S.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,S.map=P.map,S.clipShadows=P.clipShadows,S.clippingPlanes=P.clippingPlanes,S.clipIntersection=P.clipIntersection,S.displacementMap=P.displacementMap,S.displacementScale=P.displacementScale,S.displacementBias=P.displacementBias,S.wireframeLinewidth=P.wireframeLinewidth,S.linewidth=P.linewidth,D.isPointLight===!0&&S.isMeshDistanceMaterial===!0){const B=i.properties.get(S);B.light=D}return S}function x(w,P,D,T,S){if(w.visible===!1)return;if(w.layers.test(P.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&S===wn)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(D.matrixWorldInverse,w.matrixWorld);const H=e.update(w),J=w.material;if(Array.isArray(J)){const G=H.groups;for(let Y=0,ee=G.length;Y<ee;Y++){const W=G[Y],pe=J[W.materialIndex];if(pe&&pe.visible){const Me=y(w,pe,T,S);w.onBeforeShadow(i,w,P,D,H,Me,W),i.renderBufferDirect(D,null,H,Me,w,W),w.onAfterShadow(i,w,P,D,H,Me,W)}}}else if(J.visible){const G=y(w,J,T,S);w.onBeforeShadow(i,w,P,D,H,G,null),i.renderBufferDirect(D,null,H,G,w,null),w.onAfterShadow(i,w,P,D,H,G,null)}}const B=w.children;for(let H=0,J=B.length;H<J;H++)x(B[H],P,D,T,S)}function C(w){w.target.removeEventListener("dispose",C);for(const D in l){const T=l[D],S=w.target.uuid;S in T&&(T[S].dispose(),delete T[S])}}}const W0={[po]:mo,[go]:xo,[_o]:Mo,[Oi]:vo,[mo]:po,[xo]:go,[Mo]:_o,[vo]:Oi};function X0(i,e){function t(){let U=!1;const ce=new lt;let me=null;const Te=new lt(0,0,0,0);return{setMask:function(ae){me!==ae&&!U&&(i.colorMask(ae,ae,ae,ae),me=ae)},setLocked:function(ae){U=ae},setClear:function(ae,Q,Ce,ke,ft){ft===!0&&(ae*=ke,Q*=ke,Ce*=ke),ce.set(ae,Q,Ce,ke),Te.equals(ce)===!1&&(i.clearColor(ae,Q,Ce,ke),Te.copy(ce))},reset:function(){U=!1,me=null,Te.set(-1,0,0,0)}}}function n(){let U=!1,ce=!1,me=null,Te=null,ae=null;return{setReversed:function(Q){if(ce!==Q){const Ce=e.get("EXT_clip_control");Q?Ce.clipControlEXT(Ce.LOWER_LEFT_EXT,Ce.ZERO_TO_ONE_EXT):Ce.clipControlEXT(Ce.LOWER_LEFT_EXT,Ce.NEGATIVE_ONE_TO_ONE_EXT),ce=Q;const ke=ae;ae=null,this.setClear(ke)}},getReversed:function(){return ce},setTest:function(Q){Q?re(i.DEPTH_TEST):ye(i.DEPTH_TEST)},setMask:function(Q){me!==Q&&!U&&(i.depthMask(Q),me=Q)},setFunc:function(Q){if(ce&&(Q=W0[Q]),Te!==Q){switch(Q){case po:i.depthFunc(i.NEVER);break;case mo:i.depthFunc(i.ALWAYS);break;case go:i.depthFunc(i.LESS);break;case Oi:i.depthFunc(i.LEQUAL);break;case _o:i.depthFunc(i.EQUAL);break;case vo:i.depthFunc(i.GEQUAL);break;case xo:i.depthFunc(i.GREATER);break;case Mo:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Te=Q}},setLocked:function(Q){U=Q},setClear:function(Q){ae!==Q&&(ce&&(Q=1-Q),i.clearDepth(Q),ae=Q)},reset:function(){U=!1,me=null,Te=null,ae=null,ce=!1}}}function r(){let U=!1,ce=null,me=null,Te=null,ae=null,Q=null,Ce=null,ke=null,ft=null;return{setTest:function(it){U||(it?re(i.STENCIL_TEST):ye(i.STENCIL_TEST))},setMask:function(it){ce!==it&&!U&&(i.stencilMask(it),ce=it)},setFunc:function(it,Mn,hn){(me!==it||Te!==Mn||ae!==hn)&&(i.stencilFunc(it,Mn,hn),me=it,Te=Mn,ae=hn)},setOp:function(it,Mn,hn){(Q!==it||Ce!==Mn||ke!==hn)&&(i.stencilOp(it,Mn,hn),Q=it,Ce=Mn,ke=hn)},setLocked:function(it){U=it},setClear:function(it){ft!==it&&(i.clearStencil(it),ft=it)},reset:function(){U=!1,ce=null,me=null,Te=null,ae=null,Q=null,Ce=null,ke=null,ft=null}}}const s=new t,o=new n,a=new r,c=new WeakMap,l=new WeakMap;let h={},f={},p=new WeakMap,u=[],g=null,_=!1,m=null,d=null,b=null,y=null,x=null,C=null,w=null,P=new Xe(0,0,0),D=0,T=!1,S=null,I=null,B=null,H=null,J=null;const G=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Y=!1,ee=0;const W=i.getParameter(i.VERSION);W.indexOf("WebGL")!==-1?(ee=parseFloat(/^WebGL (\d)/.exec(W)[1]),Y=ee>=1):W.indexOf("OpenGL ES")!==-1&&(ee=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),Y=ee>=2);let pe=null,Me={};const Ee=i.getParameter(i.SCISSOR_BOX),He=i.getParameter(i.VIEWPORT),Ke=new lt().fromArray(Ee),rt=new lt().fromArray(He);function je(U,ce,me,Te){const ae=new Uint8Array(4),Q=i.createTexture();i.bindTexture(U,Q),i.texParameteri(U,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(U,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ce=0;Ce<me;Ce++)U===i.TEXTURE_3D||U===i.TEXTURE_2D_ARRAY?i.texImage3D(ce,0,i.RGBA,1,1,Te,0,i.RGBA,i.UNSIGNED_BYTE,ae):i.texImage2D(ce+Ce,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ae);return Q}const Z={};Z[i.TEXTURE_2D]=je(i.TEXTURE_2D,i.TEXTURE_2D,1),Z[i.TEXTURE_CUBE_MAP]=je(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Z[i.TEXTURE_2D_ARRAY]=je(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Z[i.TEXTURE_3D]=je(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),re(i.DEPTH_TEST),o.setFunc(Oi),$(!1),K(Ha),re(i.CULL_FACE),ie(Wn);function re(U){h[U]!==!0&&(i.enable(U),h[U]=!0)}function ye(U){h[U]!==!1&&(i.disable(U),h[U]=!1)}function Ie(U,ce){return f[U]!==ce?(i.bindFramebuffer(U,ce),f[U]=ce,U===i.DRAW_FRAMEBUFFER&&(f[i.FRAMEBUFFER]=ce),U===i.FRAMEBUFFER&&(f[i.DRAW_FRAMEBUFFER]=ce),!0):!1}function Ae(U,ce){let me=u,Te=!1;if(U){me=p.get(ce),me===void 0&&(me=[],p.set(ce,me));const ae=U.textures;if(me.length!==ae.length||me[0]!==i.COLOR_ATTACHMENT0){for(let Q=0,Ce=ae.length;Q<Ce;Q++)me[Q]=i.COLOR_ATTACHMENT0+Q;me.length=ae.length,Te=!0}}else me[0]!==i.BACK&&(me[0]=i.BACK,Te=!0);Te&&i.drawBuffers(me)}function Ye(U){return g!==U?(i.useProgram(U),g=U,!0):!1}const ut={[si]:i.FUNC_ADD,[fh]:i.FUNC_SUBTRACT,[dh]:i.FUNC_REVERSE_SUBTRACT};ut[ph]=i.MIN,ut[mh]=i.MAX;const R={[gh]:i.ZERO,[_h]:i.ONE,[vh]:i.SRC_COLOR,[uo]:i.SRC_ALPHA,[Th]:i.SRC_ALPHA_SATURATE,[yh]:i.DST_COLOR,[Mh]:i.DST_ALPHA,[xh]:i.ONE_MINUS_SRC_COLOR,[fo]:i.ONE_MINUS_SRC_ALPHA,[Eh]:i.ONE_MINUS_DST_COLOR,[Sh]:i.ONE_MINUS_DST_ALPHA,[bh]:i.CONSTANT_COLOR,[Ah]:i.ONE_MINUS_CONSTANT_COLOR,[wh]:i.CONSTANT_ALPHA,[Rh]:i.ONE_MINUS_CONSTANT_ALPHA};function ie(U,ce,me,Te,ae,Q,Ce,ke,ft,it){if(U===Wn){_===!0&&(ye(i.BLEND),_=!1);return}if(_===!1&&(re(i.BLEND),_=!0),U!==uh){if(U!==m||it!==T){if((d!==si||x!==si)&&(i.blendEquation(i.FUNC_ADD),d=si,x=si),it)switch(U){case Ui:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Va:i.blendFunc(i.ONE,i.ONE);break;case Ga:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Wa:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case Ui:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Va:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Ga:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Wa:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}b=null,y=null,C=null,w=null,P.set(0,0,0),D=0,m=U,T=it}return}ae=ae||ce,Q=Q||me,Ce=Ce||Te,(ce!==d||ae!==x)&&(i.blendEquationSeparate(ut[ce],ut[ae]),d=ce,x=ae),(me!==b||Te!==y||Q!==C||Ce!==w)&&(i.blendFuncSeparate(R[me],R[Te],R[Q],R[Ce]),b=me,y=Te,C=Q,w=Ce),(ke.equals(P)===!1||ft!==D)&&(i.blendColor(ke.r,ke.g,ke.b,ft),P.copy(ke),D=ft),m=U,T=!1}function j(U,ce){U.side===qt?ye(i.CULL_FACE):re(i.CULL_FACE);let me=U.side===Ot;ce&&(me=!me),$(me),U.blending===Ui&&U.transparent===!1?ie(Wn):ie(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),o.setFunc(U.depthFunc),o.setTest(U.depthTest),o.setMask(U.depthWrite),s.setMask(U.colorWrite);const Te=U.stencilWrite;a.setTest(Te),Te&&(a.setMask(U.stencilWriteMask),a.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),a.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),se(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?re(i.SAMPLE_ALPHA_TO_COVERAGE):ye(i.SAMPLE_ALPHA_TO_COVERAGE)}function $(U){S!==U&&(U?i.frontFace(i.CW):i.frontFace(i.CCW),S=U)}function K(U){U!==ch?(re(i.CULL_FACE),U!==I&&(U===Ha?i.cullFace(i.BACK):U===hh?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ye(i.CULL_FACE),I=U}function fe(U){U!==B&&(Y&&i.lineWidth(U),B=U)}function se(U,ce,me){U?(re(i.POLYGON_OFFSET_FILL),(H!==ce||J!==me)&&(i.polygonOffset(ce,me),H=ce,J=me)):ye(i.POLYGON_OFFSET_FILL)}function de(U){U?re(i.SCISSOR_TEST):ye(i.SCISSOR_TEST)}function ze(U){U===void 0&&(U=i.TEXTURE0+G-1),pe!==U&&(i.activeTexture(U),pe=U)}function Be(U,ce,me){me===void 0&&(pe===null?me=i.TEXTURE0+G-1:me=pe);let Te=Me[me];Te===void 0&&(Te={type:void 0,texture:void 0},Me[me]=Te),(Te.type!==U||Te.texture!==ce)&&(pe!==me&&(i.activeTexture(me),pe=me),i.bindTexture(U,ce||Z[U]),Te.type=U,Te.texture=ce)}function A(){const U=Me[pe];U!==void 0&&U.type!==void 0&&(i.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function v(){try{i.compressedTexImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function O(){try{i.compressedTexImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function V(){try{i.texSubImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ne(){try{i.texSubImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function X(){try{i.compressedTexSubImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Pe(){try{i.compressedTexSubImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function he(){try{i.texStorage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function we(){try{i.texStorage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Re(){try{i.texImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function oe(){try{i.texImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function xe(U){Ke.equals(U)===!1&&(i.scissor(U.x,U.y,U.z,U.w),Ke.copy(U))}function Fe(U){rt.equals(U)===!1&&(i.viewport(U.x,U.y,U.z,U.w),rt.copy(U))}function Le(U,ce){let me=l.get(ce);me===void 0&&(me=new WeakMap,l.set(ce,me));let Te=me.get(U);Te===void 0&&(Te=i.getUniformBlockIndex(ce,U.name),me.set(U,Te))}function _e(U,ce){const Te=l.get(ce).get(U);c.get(ce)!==Te&&(i.uniformBlockBinding(ce,Te,U.__bindingPointIndex),c.set(ce,Te))}function Ve(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},pe=null,Me={},f={},p=new WeakMap,u=[],g=null,_=!1,m=null,d=null,b=null,y=null,x=null,C=null,w=null,P=new Xe(0,0,0),D=0,T=!1,S=null,I=null,B=null,H=null,J=null,Ke.set(0,0,i.canvas.width,i.canvas.height),rt.set(0,0,i.canvas.width,i.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:re,disable:ye,bindFramebuffer:Ie,drawBuffers:Ae,useProgram:Ye,setBlending:ie,setMaterial:j,setFlipSided:$,setCullFace:K,setLineWidth:fe,setPolygonOffset:se,setScissorTest:de,activeTexture:ze,bindTexture:Be,unbindTexture:A,compressedTexImage2D:v,compressedTexImage3D:O,texImage2D:Re,texImage3D:oe,updateUBOMapping:Le,uniformBlockBinding:_e,texStorage2D:he,texStorage3D:we,texSubImage2D:V,texSubImage3D:ne,compressedTexSubImage2D:X,compressedTexSubImage3D:Pe,scissor:xe,viewport:Fe,reset:Ve}}function q0(i,e,t,n,r,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new ue,h=new WeakMap;let f;const p=new WeakMap;let u=!1;try{u=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(A,v){return u?new OffscreenCanvas(A,v):ms("canvas")}function _(A,v,O){let V=1;const ne=Be(A);if((ne.width>O||ne.height>O)&&(V=O/Math.max(ne.width,ne.height)),V<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const X=Math.floor(V*ne.width),Pe=Math.floor(V*ne.height);f===void 0&&(f=g(X,Pe));const he=v?g(X,Pe):f;return he.width=X,he.height=Pe,he.getContext("2d").drawImage(A,0,0,X,Pe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ne.width+"x"+ne.height+") to ("+X+"x"+Pe+")."),he}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ne.width+"x"+ne.height+")."),A;return A}function m(A){return A.generateMipmaps}function d(A){i.generateMipmap(A)}function b(A){return A.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?i.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function y(A,v,O,V,ne=!1){if(A!==null){if(i[A]!==void 0)return i[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let X=v;if(v===i.RED&&(O===i.FLOAT&&(X=i.R32F),O===i.HALF_FLOAT&&(X=i.R16F),O===i.UNSIGNED_BYTE&&(X=i.R8)),v===i.RED_INTEGER&&(O===i.UNSIGNED_BYTE&&(X=i.R8UI),O===i.UNSIGNED_SHORT&&(X=i.R16UI),O===i.UNSIGNED_INT&&(X=i.R32UI),O===i.BYTE&&(X=i.R8I),O===i.SHORT&&(X=i.R16I),O===i.INT&&(X=i.R32I)),v===i.RG&&(O===i.FLOAT&&(X=i.RG32F),O===i.HALF_FLOAT&&(X=i.RG16F),O===i.UNSIGNED_BYTE&&(X=i.RG8)),v===i.RG_INTEGER&&(O===i.UNSIGNED_BYTE&&(X=i.RG8UI),O===i.UNSIGNED_SHORT&&(X=i.RG16UI),O===i.UNSIGNED_INT&&(X=i.RG32UI),O===i.BYTE&&(X=i.RG8I),O===i.SHORT&&(X=i.RG16I),O===i.INT&&(X=i.RG32I)),v===i.RGB_INTEGER&&(O===i.UNSIGNED_BYTE&&(X=i.RGB8UI),O===i.UNSIGNED_SHORT&&(X=i.RGB16UI),O===i.UNSIGNED_INT&&(X=i.RGB32UI),O===i.BYTE&&(X=i.RGB8I),O===i.SHORT&&(X=i.RGB16I),O===i.INT&&(X=i.RGB32I)),v===i.RGBA_INTEGER&&(O===i.UNSIGNED_BYTE&&(X=i.RGBA8UI),O===i.UNSIGNED_SHORT&&(X=i.RGBA16UI),O===i.UNSIGNED_INT&&(X=i.RGBA32UI),O===i.BYTE&&(X=i.RGBA8I),O===i.SHORT&&(X=i.RGBA16I),O===i.INT&&(X=i.RGBA32I)),v===i.RGB&&(O===i.UNSIGNED_INT_5_9_9_9_REV&&(X=i.RGB9_E5),O===i.UNSIGNED_INT_10F_11F_11F_REV&&(X=i.R11F_G11F_B10F)),v===i.RGBA){const Pe=ne?fs:tt.getTransfer(V);O===i.FLOAT&&(X=i.RGBA32F),O===i.HALF_FLOAT&&(X=i.RGBA16F),O===i.UNSIGNED_BYTE&&(X=Pe===at?i.SRGB8_ALPHA8:i.RGBA8),O===i.UNSIGNED_SHORT_4_4_4_4&&(X=i.RGBA4),O===i.UNSIGNED_SHORT_5_5_5_1&&(X=i.RGB5_A1)}return(X===i.R16F||X===i.R32F||X===i.RG16F||X===i.RG32F||X===i.RGBA16F||X===i.RGBA32F)&&e.get("EXT_color_buffer_float"),X}function x(A,v){let O;return A?v===null||v===ci||v===_r?O=i.DEPTH24_STENCIL8:v===mn?O=i.DEPTH32F_STENCIL8:v===gr&&(O=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===ci||v===_r?O=i.DEPTH_COMPONENT24:v===mn?O=i.DEPTH_COMPONENT32F:v===gr&&(O=i.DEPTH_COMPONENT16),O}function C(A,v){return m(A)===!0||A.isFramebufferTexture&&A.minFilter!==Jt&&A.minFilter!==pn?Math.log2(Math.max(v.width,v.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?v.mipmaps.length:1}function w(A){const v=A.target;v.removeEventListener("dispose",w),D(v),v.isVideoTexture&&h.delete(v)}function P(A){const v=A.target;v.removeEventListener("dispose",P),S(v)}function D(A){const v=n.get(A);if(v.__webglInit===void 0)return;const O=A.source,V=p.get(O);if(V){const ne=V[v.__cacheKey];ne.usedTimes--,ne.usedTimes===0&&T(A),Object.keys(V).length===0&&p.delete(O)}n.remove(A)}function T(A){const v=n.get(A);i.deleteTexture(v.__webglTexture);const O=A.source,V=p.get(O);delete V[v.__cacheKey],o.memory.textures--}function S(A){const v=n.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),n.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let V=0;V<6;V++){if(Array.isArray(v.__webglFramebuffer[V]))for(let ne=0;ne<v.__webglFramebuffer[V].length;ne++)i.deleteFramebuffer(v.__webglFramebuffer[V][ne]);else i.deleteFramebuffer(v.__webglFramebuffer[V]);v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer[V])}else{if(Array.isArray(v.__webglFramebuffer))for(let V=0;V<v.__webglFramebuffer.length;V++)i.deleteFramebuffer(v.__webglFramebuffer[V]);else i.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&i.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let V=0;V<v.__webglColorRenderbuffer.length;V++)v.__webglColorRenderbuffer[V]&&i.deleteRenderbuffer(v.__webglColorRenderbuffer[V]);v.__webglDepthRenderbuffer&&i.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const O=A.textures;for(let V=0,ne=O.length;V<ne;V++){const X=n.get(O[V]);X.__webglTexture&&(i.deleteTexture(X.__webglTexture),o.memory.textures--),n.remove(O[V])}n.remove(A)}let I=0;function B(){I=0}function H(){const A=I;return A>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+r.maxTextures),I+=1,A}function J(A){const v=[];return v.push(A.wrapS),v.push(A.wrapT),v.push(A.wrapR||0),v.push(A.magFilter),v.push(A.minFilter),v.push(A.anisotropy),v.push(A.internalFormat),v.push(A.format),v.push(A.type),v.push(A.generateMipmaps),v.push(A.premultiplyAlpha),v.push(A.flipY),v.push(A.unpackAlignment),v.push(A.colorSpace),v.join()}function G(A,v){const O=n.get(A);if(A.isVideoTexture&&de(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&O.__version!==A.version){const V=A.image;if(V===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(V.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Z(O,A,v);return}}else A.isExternalTexture&&(O.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,O.__webglTexture,i.TEXTURE0+v)}function Y(A,v){const O=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&O.__version!==A.version){Z(O,A,v);return}t.bindTexture(i.TEXTURE_2D_ARRAY,O.__webglTexture,i.TEXTURE0+v)}function ee(A,v){const O=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&O.__version!==A.version){Z(O,A,v);return}t.bindTexture(i.TEXTURE_3D,O.__webglTexture,i.TEXTURE0+v)}function W(A,v){const O=n.get(A);if(A.version>0&&O.__version!==A.version){re(O,A,v);return}t.bindTexture(i.TEXTURE_CUBE_MAP,O.__webglTexture,i.TEXTURE0+v)}const pe={[us]:i.REPEAT,[ai]:i.CLAMP_TO_EDGE,[Eo]:i.MIRRORED_REPEAT},Me={[Jt]:i.NEAREST,[Oh]:i.NEAREST_MIPMAP_NEAREST,[Ir]:i.NEAREST_MIPMAP_LINEAR,[pn]:i.LINEAR,[As]:i.LINEAR_MIPMAP_NEAREST,[li]:i.LINEAR_MIPMAP_LINEAR},Ee={[Hh]:i.NEVER,[Yh]:i.ALWAYS,[Vh]:i.LESS,[hc]:i.LEQUAL,[Gh]:i.EQUAL,[qh]:i.GEQUAL,[Wh]:i.GREATER,[Xh]:i.NOTEQUAL};function He(A,v){if(v.type===mn&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===pn||v.magFilter===As||v.magFilter===Ir||v.magFilter===li||v.minFilter===pn||v.minFilter===As||v.minFilter===Ir||v.minFilter===li)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(A,i.TEXTURE_WRAP_S,pe[v.wrapS]),i.texParameteri(A,i.TEXTURE_WRAP_T,pe[v.wrapT]),(A===i.TEXTURE_3D||A===i.TEXTURE_2D_ARRAY)&&i.texParameteri(A,i.TEXTURE_WRAP_R,pe[v.wrapR]),i.texParameteri(A,i.TEXTURE_MAG_FILTER,Me[v.magFilter]),i.texParameteri(A,i.TEXTURE_MIN_FILTER,Me[v.minFilter]),v.compareFunction&&(i.texParameteri(A,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(A,i.TEXTURE_COMPARE_FUNC,Ee[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Jt||v.minFilter!==Ir&&v.minFilter!==li||v.type===mn&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){const O=e.get("EXT_texture_filter_anisotropic");i.texParameterf(A,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,r.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function Ke(A,v){let O=!1;A.__webglInit===void 0&&(A.__webglInit=!0,v.addEventListener("dispose",w));const V=v.source;let ne=p.get(V);ne===void 0&&(ne={},p.set(V,ne));const X=J(v);if(X!==A.__cacheKey){ne[X]===void 0&&(ne[X]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,O=!0),ne[X].usedTimes++;const Pe=ne[A.__cacheKey];Pe!==void 0&&(ne[A.__cacheKey].usedTimes--,Pe.usedTimes===0&&T(v)),A.__cacheKey=X,A.__webglTexture=ne[X].texture}return O}function rt(A,v,O){return Math.floor(Math.floor(A/O)/v)}function je(A,v,O,V){const X=A.updateRanges;if(X.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,v.width,v.height,O,V,v.data);else{X.sort((oe,xe)=>oe.start-xe.start);let Pe=0;for(let oe=1;oe<X.length;oe++){const xe=X[Pe],Fe=X[oe],Le=xe.start+xe.count,_e=rt(Fe.start,v.width,4),Ve=rt(xe.start,v.width,4);Fe.start<=Le+1&&_e===Ve&&rt(Fe.start+Fe.count-1,v.width,4)===_e?xe.count=Math.max(xe.count,Fe.start+Fe.count-xe.start):(++Pe,X[Pe]=Fe)}X.length=Pe+1;const he=i.getParameter(i.UNPACK_ROW_LENGTH),we=i.getParameter(i.UNPACK_SKIP_PIXELS),Re=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,v.width);for(let oe=0,xe=X.length;oe<xe;oe++){const Fe=X[oe],Le=Math.floor(Fe.start/4),_e=Math.ceil(Fe.count/4),Ve=Le%v.width,U=Math.floor(Le/v.width),ce=_e,me=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,Ve),i.pixelStorei(i.UNPACK_SKIP_ROWS,U),t.texSubImage2D(i.TEXTURE_2D,0,Ve,U,ce,me,O,V,v.data)}A.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,he),i.pixelStorei(i.UNPACK_SKIP_PIXELS,we),i.pixelStorei(i.UNPACK_SKIP_ROWS,Re)}}function Z(A,v,O){let V=i.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(V=i.TEXTURE_2D_ARRAY),v.isData3DTexture&&(V=i.TEXTURE_3D);const ne=Ke(A,v),X=v.source;t.bindTexture(V,A.__webglTexture,i.TEXTURE0+O);const Pe=n.get(X);if(X.version!==Pe.__version||ne===!0){t.activeTexture(i.TEXTURE0+O);const he=tt.getPrimaries(tt.workingColorSpace),we=v.colorSpace===kn?null:tt.getPrimaries(v.colorSpace),Re=v.colorSpace===kn||he===we?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Re);let oe=_(v.image,!1,r.maxTextureSize);oe=ze(v,oe);const xe=s.convert(v.format,v.colorSpace),Fe=s.convert(v.type);let Le=y(v.internalFormat,xe,Fe,v.colorSpace,v.isVideoTexture);He(V,v);let _e;const Ve=v.mipmaps,U=v.isVideoTexture!==!0,ce=Pe.__version===void 0||ne===!0,me=X.dataReady,Te=C(v,oe);if(v.isDepthTexture)Le=x(v.format===xr,v.type),ce&&(U?t.texStorage2D(i.TEXTURE_2D,1,Le,oe.width,oe.height):t.texImage2D(i.TEXTURE_2D,0,Le,oe.width,oe.height,0,xe,Fe,null));else if(v.isDataTexture)if(Ve.length>0){U&&ce&&t.texStorage2D(i.TEXTURE_2D,Te,Le,Ve[0].width,Ve[0].height);for(let ae=0,Q=Ve.length;ae<Q;ae++)_e=Ve[ae],U?me&&t.texSubImage2D(i.TEXTURE_2D,ae,0,0,_e.width,_e.height,xe,Fe,_e.data):t.texImage2D(i.TEXTURE_2D,ae,Le,_e.width,_e.height,0,xe,Fe,_e.data);v.generateMipmaps=!1}else U?(ce&&t.texStorage2D(i.TEXTURE_2D,Te,Le,oe.width,oe.height),me&&je(v,oe,xe,Fe)):t.texImage2D(i.TEXTURE_2D,0,Le,oe.width,oe.height,0,xe,Fe,oe.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){U&&ce&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Te,Le,Ve[0].width,Ve[0].height,oe.depth);for(let ae=0,Q=Ve.length;ae<Q;ae++)if(_e=Ve[ae],v.format!==ln)if(xe!==null)if(U){if(me)if(v.layerUpdates.size>0){const Ce=El(_e.width,_e.height,v.format,v.type);for(const ke of v.layerUpdates){const ft=_e.data.subarray(ke*Ce/_e.data.BYTES_PER_ELEMENT,(ke+1)*Ce/_e.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ae,0,0,ke,_e.width,_e.height,1,xe,ft)}v.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ae,0,0,0,_e.width,_e.height,oe.depth,xe,_e.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ae,Le,_e.width,_e.height,oe.depth,0,_e.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else U?me&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ae,0,0,0,_e.width,_e.height,oe.depth,xe,Fe,_e.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ae,Le,_e.width,_e.height,oe.depth,0,xe,Fe,_e.data)}else{U&&ce&&t.texStorage2D(i.TEXTURE_2D,Te,Le,Ve[0].width,Ve[0].height);for(let ae=0,Q=Ve.length;ae<Q;ae++)_e=Ve[ae],v.format!==ln?xe!==null?U?me&&t.compressedTexSubImage2D(i.TEXTURE_2D,ae,0,0,_e.width,_e.height,xe,_e.data):t.compressedTexImage2D(i.TEXTURE_2D,ae,Le,_e.width,_e.height,0,_e.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):U?me&&t.texSubImage2D(i.TEXTURE_2D,ae,0,0,_e.width,_e.height,xe,Fe,_e.data):t.texImage2D(i.TEXTURE_2D,ae,Le,_e.width,_e.height,0,xe,Fe,_e.data)}else if(v.isDataArrayTexture)if(U){if(ce&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Te,Le,oe.width,oe.height,oe.depth),me)if(v.layerUpdates.size>0){const ae=El(oe.width,oe.height,v.format,v.type);for(const Q of v.layerUpdates){const Ce=oe.data.subarray(Q*ae/oe.data.BYTES_PER_ELEMENT,(Q+1)*ae/oe.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Q,oe.width,oe.height,1,xe,Fe,Ce)}v.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,oe.width,oe.height,oe.depth,xe,Fe,oe.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Le,oe.width,oe.height,oe.depth,0,xe,Fe,oe.data);else if(v.isData3DTexture)U?(ce&&t.texStorage3D(i.TEXTURE_3D,Te,Le,oe.width,oe.height,oe.depth),me&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,oe.width,oe.height,oe.depth,xe,Fe,oe.data)):t.texImage3D(i.TEXTURE_3D,0,Le,oe.width,oe.height,oe.depth,0,xe,Fe,oe.data);else if(v.isFramebufferTexture){if(ce)if(U)t.texStorage2D(i.TEXTURE_2D,Te,Le,oe.width,oe.height);else{let ae=oe.width,Q=oe.height;for(let Ce=0;Ce<Te;Ce++)t.texImage2D(i.TEXTURE_2D,Ce,Le,ae,Q,0,xe,Fe,null),ae>>=1,Q>>=1}}else if(Ve.length>0){if(U&&ce){const ae=Be(Ve[0]);t.texStorage2D(i.TEXTURE_2D,Te,Le,ae.width,ae.height)}for(let ae=0,Q=Ve.length;ae<Q;ae++)_e=Ve[ae],U?me&&t.texSubImage2D(i.TEXTURE_2D,ae,0,0,xe,Fe,_e):t.texImage2D(i.TEXTURE_2D,ae,Le,xe,Fe,_e);v.generateMipmaps=!1}else if(U){if(ce){const ae=Be(oe);t.texStorage2D(i.TEXTURE_2D,Te,Le,ae.width,ae.height)}me&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,xe,Fe,oe)}else t.texImage2D(i.TEXTURE_2D,0,Le,xe,Fe,oe);m(v)&&d(V),Pe.__version=X.version,v.onUpdate&&v.onUpdate(v)}A.__version=v.version}function re(A,v,O){if(v.image.length!==6)return;const V=Ke(A,v),ne=v.source;t.bindTexture(i.TEXTURE_CUBE_MAP,A.__webglTexture,i.TEXTURE0+O);const X=n.get(ne);if(ne.version!==X.__version||V===!0){t.activeTexture(i.TEXTURE0+O);const Pe=tt.getPrimaries(tt.workingColorSpace),he=v.colorSpace===kn?null:tt.getPrimaries(v.colorSpace),we=v.colorSpace===kn||Pe===he?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,we);const Re=v.isCompressedTexture||v.image[0].isCompressedTexture,oe=v.image[0]&&v.image[0].isDataTexture,xe=[];for(let Q=0;Q<6;Q++)!Re&&!oe?xe[Q]=_(v.image[Q],!0,r.maxCubemapSize):xe[Q]=oe?v.image[Q].image:v.image[Q],xe[Q]=ze(v,xe[Q]);const Fe=xe[0],Le=s.convert(v.format,v.colorSpace),_e=s.convert(v.type),Ve=y(v.internalFormat,Le,_e,v.colorSpace),U=v.isVideoTexture!==!0,ce=X.__version===void 0||V===!0,me=ne.dataReady;let Te=C(v,Fe);He(i.TEXTURE_CUBE_MAP,v);let ae;if(Re){U&&ce&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Te,Ve,Fe.width,Fe.height);for(let Q=0;Q<6;Q++){ae=xe[Q].mipmaps;for(let Ce=0;Ce<ae.length;Ce++){const ke=ae[Ce];v.format!==ln?Le!==null?U?me&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Ce,0,0,ke.width,ke.height,Le,ke.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Ce,Ve,ke.width,ke.height,0,ke.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):U?me&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Ce,0,0,ke.width,ke.height,Le,_e,ke.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Ce,Ve,ke.width,ke.height,0,Le,_e,ke.data)}}}else{if(ae=v.mipmaps,U&&ce){ae.length>0&&Te++;const Q=Be(xe[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Te,Ve,Q.width,Q.height)}for(let Q=0;Q<6;Q++)if(oe){U?me&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,xe[Q].width,xe[Q].height,Le,_e,xe[Q].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Ve,xe[Q].width,xe[Q].height,0,Le,_e,xe[Q].data);for(let Ce=0;Ce<ae.length;Ce++){const ft=ae[Ce].image[Q].image;U?me&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Ce+1,0,0,ft.width,ft.height,Le,_e,ft.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Ce+1,Ve,ft.width,ft.height,0,Le,_e,ft.data)}}else{U?me&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,Le,_e,xe[Q]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Ve,Le,_e,xe[Q]);for(let Ce=0;Ce<ae.length;Ce++){const ke=ae[Ce];U?me&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Ce+1,0,0,Le,_e,ke.image[Q]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Ce+1,Ve,Le,_e,ke.image[Q])}}}m(v)&&d(i.TEXTURE_CUBE_MAP),X.__version=ne.version,v.onUpdate&&v.onUpdate(v)}A.__version=v.version}function ye(A,v,O,V,ne,X){const Pe=s.convert(O.format,O.colorSpace),he=s.convert(O.type),we=y(O.internalFormat,Pe,he,O.colorSpace),Re=n.get(v),oe=n.get(O);if(oe.__renderTarget=v,!Re.__hasExternalTextures){const xe=Math.max(1,v.width>>X),Fe=Math.max(1,v.height>>X);ne===i.TEXTURE_3D||ne===i.TEXTURE_2D_ARRAY?t.texImage3D(ne,X,we,xe,Fe,v.depth,0,Pe,he,null):t.texImage2D(ne,X,we,xe,Fe,0,Pe,he,null)}t.bindFramebuffer(i.FRAMEBUFFER,A),se(v)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,V,ne,oe.__webglTexture,0,fe(v)):(ne===i.TEXTURE_2D||ne>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ne<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,V,ne,oe.__webglTexture,X),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ie(A,v,O){if(i.bindRenderbuffer(i.RENDERBUFFER,A),v.depthBuffer){const V=v.depthTexture,ne=V&&V.isDepthTexture?V.type:null,X=x(v.stencilBuffer,ne),Pe=v.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,he=fe(v);se(v)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,he,X,v.width,v.height):O?i.renderbufferStorageMultisample(i.RENDERBUFFER,he,X,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,X,v.width,v.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Pe,i.RENDERBUFFER,A)}else{const V=v.textures;for(let ne=0;ne<V.length;ne++){const X=V[ne],Pe=s.convert(X.format,X.colorSpace),he=s.convert(X.type),we=y(X.internalFormat,Pe,he,X.colorSpace),Re=fe(v);O&&se(v)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Re,we,v.width,v.height):se(v)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Re,we,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,we,v.width,v.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ae(A,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,A),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const V=n.get(v.depthTexture);V.__renderTarget=v,(!V.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),G(v.depthTexture,0);const ne=V.__webglTexture,X=fe(v);if(v.depthTexture.format===vr)se(v)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ne,0,X):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ne,0);else if(v.depthTexture.format===xr)se(v)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ne,0,X):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ne,0);else throw new Error("Unknown depthTexture format")}function Ye(A){const v=n.get(A),O=A.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==A.depthTexture){const V=A.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),V){const ne=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,V.removeEventListener("dispose",ne)};V.addEventListener("dispose",ne),v.__depthDisposeCallback=ne}v.__boundDepthTexture=V}if(A.depthTexture&&!v.__autoAllocateDepthBuffer){if(O)throw new Error("target.depthTexture not supported in Cube render targets");const V=A.texture.mipmaps;V&&V.length>0?Ae(v.__webglFramebuffer[0],A):Ae(v.__webglFramebuffer,A)}else if(O){v.__webglDepthbuffer=[];for(let V=0;V<6;V++)if(t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[V]),v.__webglDepthbuffer[V]===void 0)v.__webglDepthbuffer[V]=i.createRenderbuffer(),Ie(v.__webglDepthbuffer[V],A,!1);else{const ne=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,X=v.__webglDepthbuffer[V];i.bindRenderbuffer(i.RENDERBUFFER,X),i.framebufferRenderbuffer(i.FRAMEBUFFER,ne,i.RENDERBUFFER,X)}}else{const V=A.texture.mipmaps;if(V&&V.length>0?t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=i.createRenderbuffer(),Ie(v.__webglDepthbuffer,A,!1);else{const ne=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,X=v.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,X),i.framebufferRenderbuffer(i.FRAMEBUFFER,ne,i.RENDERBUFFER,X)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function ut(A,v,O){const V=n.get(A);v!==void 0&&ye(V.__webglFramebuffer,A,A.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),O!==void 0&&Ye(A)}function R(A){const v=A.texture,O=n.get(A),V=n.get(v);A.addEventListener("dispose",P);const ne=A.textures,X=A.isWebGLCubeRenderTarget===!0,Pe=ne.length>1;if(Pe||(V.__webglTexture===void 0&&(V.__webglTexture=i.createTexture()),V.__version=v.version,o.memory.textures++),X){O.__webglFramebuffer=[];for(let he=0;he<6;he++)if(v.mipmaps&&v.mipmaps.length>0){O.__webglFramebuffer[he]=[];for(let we=0;we<v.mipmaps.length;we++)O.__webglFramebuffer[he][we]=i.createFramebuffer()}else O.__webglFramebuffer[he]=i.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){O.__webglFramebuffer=[];for(let he=0;he<v.mipmaps.length;he++)O.__webglFramebuffer[he]=i.createFramebuffer()}else O.__webglFramebuffer=i.createFramebuffer();if(Pe)for(let he=0,we=ne.length;he<we;he++){const Re=n.get(ne[he]);Re.__webglTexture===void 0&&(Re.__webglTexture=i.createTexture(),o.memory.textures++)}if(A.samples>0&&se(A)===!1){O.__webglMultisampledFramebuffer=i.createFramebuffer(),O.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let he=0;he<ne.length;he++){const we=ne[he];O.__webglColorRenderbuffer[he]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,O.__webglColorRenderbuffer[he]);const Re=s.convert(we.format,we.colorSpace),oe=s.convert(we.type),xe=y(we.internalFormat,Re,oe,we.colorSpace,A.isXRRenderTarget===!0),Fe=fe(A);i.renderbufferStorageMultisample(i.RENDERBUFFER,Fe,xe,A.width,A.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+he,i.RENDERBUFFER,O.__webglColorRenderbuffer[he])}i.bindRenderbuffer(i.RENDERBUFFER,null),A.depthBuffer&&(O.__webglDepthRenderbuffer=i.createRenderbuffer(),Ie(O.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(X){t.bindTexture(i.TEXTURE_CUBE_MAP,V.__webglTexture),He(i.TEXTURE_CUBE_MAP,v);for(let he=0;he<6;he++)if(v.mipmaps&&v.mipmaps.length>0)for(let we=0;we<v.mipmaps.length;we++)ye(O.__webglFramebuffer[he][we],A,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+he,we);else ye(O.__webglFramebuffer[he],A,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+he,0);m(v)&&d(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Pe){for(let he=0,we=ne.length;he<we;he++){const Re=ne[he],oe=n.get(Re);let xe=i.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(xe=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(xe,oe.__webglTexture),He(xe,Re),ye(O.__webglFramebuffer,A,Re,i.COLOR_ATTACHMENT0+he,xe,0),m(Re)&&d(xe)}t.unbindTexture()}else{let he=i.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(he=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(he,V.__webglTexture),He(he,v),v.mipmaps&&v.mipmaps.length>0)for(let we=0;we<v.mipmaps.length;we++)ye(O.__webglFramebuffer[we],A,v,i.COLOR_ATTACHMENT0,he,we);else ye(O.__webglFramebuffer,A,v,i.COLOR_ATTACHMENT0,he,0);m(v)&&d(he),t.unbindTexture()}A.depthBuffer&&Ye(A)}function ie(A){const v=A.textures;for(let O=0,V=v.length;O<V;O++){const ne=v[O];if(m(ne)){const X=b(A),Pe=n.get(ne).__webglTexture;t.bindTexture(X,Pe),d(X),t.unbindTexture()}}}const j=[],$=[];function K(A){if(A.samples>0){if(se(A)===!1){const v=A.textures,O=A.width,V=A.height;let ne=i.COLOR_BUFFER_BIT;const X=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Pe=n.get(A),he=v.length>1;if(he)for(let Re=0;Re<v.length;Re++)t.bindFramebuffer(i.FRAMEBUFFER,Pe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Re,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Pe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Re,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Pe.__webglMultisampledFramebuffer);const we=A.texture.mipmaps;we&&we.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Pe.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Pe.__webglFramebuffer);for(let Re=0;Re<v.length;Re++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(ne|=i.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(ne|=i.STENCIL_BUFFER_BIT)),he){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Pe.__webglColorRenderbuffer[Re]);const oe=n.get(v[Re]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,oe,0)}i.blitFramebuffer(0,0,O,V,0,0,O,V,ne,i.NEAREST),c===!0&&(j.length=0,$.length=0,j.push(i.COLOR_ATTACHMENT0+Re),A.depthBuffer&&A.resolveDepthBuffer===!1&&(j.push(X),$.push(X),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,$)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,j))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),he)for(let Re=0;Re<v.length;Re++){t.bindFramebuffer(i.FRAMEBUFFER,Pe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Re,i.RENDERBUFFER,Pe.__webglColorRenderbuffer[Re]);const oe=n.get(v[Re]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Pe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Re,i.TEXTURE_2D,oe,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Pe.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&c){const v=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[v])}}}function fe(A){return Math.min(r.maxSamples,A.samples)}function se(A){const v=n.get(A);return A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function de(A){const v=o.render.frame;h.get(A)!==v&&(h.set(A,v),A.update())}function ze(A,v){const O=A.colorSpace,V=A.format,ne=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||O!==ki&&O!==kn&&(tt.getTransfer(O)===at?(V!==ln||ne!==_n)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",O)),v}function Be(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(l.width=A.naturalWidth||A.width,l.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(l.width=A.displayWidth,l.height=A.displayHeight):(l.width=A.width,l.height=A.height),l}this.allocateTextureUnit=H,this.resetTextureUnits=B,this.setTexture2D=G,this.setTexture2DArray=Y,this.setTexture3D=ee,this.setTextureCube=W,this.rebindTextures=ut,this.setupRenderTarget=R,this.updateRenderTargetMipmap=ie,this.updateMultisampleRenderTarget=K,this.setupDepthRenderbuffer=Ye,this.setupFrameBufferTexture=ye,this.useMultisampledRTT=se}function Y0(i,e){function t(n,r=kn){let s;const o=tt.getTransfer(r);if(n===_n)return i.UNSIGNED_BYTE;if(n===da)return i.UNSIGNED_SHORT_4_4_4_4;if(n===pa)return i.UNSIGNED_SHORT_5_5_5_1;if(n===sc)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===oc)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===ic)return i.BYTE;if(n===rc)return i.SHORT;if(n===gr)return i.UNSIGNED_SHORT;if(n===fa)return i.INT;if(n===ci)return i.UNSIGNED_INT;if(n===mn)return i.FLOAT;if(n===Ar)return i.HALF_FLOAT;if(n===ac)return i.ALPHA;if(n===lc)return i.RGB;if(n===ln)return i.RGBA;if(n===vr)return i.DEPTH_COMPONENT;if(n===xr)return i.DEPTH_STENCIL;if(n===ma)return i.RED;if(n===ga)return i.RED_INTEGER;if(n===cc)return i.RG;if(n===_a)return i.RG_INTEGER;if(n===va)return i.RGBA_INTEGER;if(n===os||n===as||n===ls||n===cs)if(o===at)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===os)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===as)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ls)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===cs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===os)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===as)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ls)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===cs)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===To||n===bo||n===Ao||n===wo)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===To)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===bo)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ao)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===wo)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ro||n===Co||n===Po)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Ro||n===Co)return o===at?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Po)return o===at?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Lo||n===Io||n===Do||n===Uo||n===No||n===Fo||n===Oo||n===Bo||n===zo||n===ko||n===Ho||n===Vo||n===Go||n===Wo)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Lo)return o===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Io)return o===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Do)return o===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Uo)return o===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===No)return o===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Fo)return o===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Oo)return o===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Bo)return o===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===zo)return o===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===ko)return o===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ho)return o===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Vo)return o===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Go)return o===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Wo)return o===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Xo||n===qo||n===Yo)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===Xo)return o===at?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===qo)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Yo)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Jo||n===Zo||n===Ko||n===$o)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===Jo)return s.COMPRESSED_RED_RGTC1_EXT;if(n===Zo)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ko)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===$o)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===_r?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const J0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Z0=`
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

}`;class K0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new bc(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Jn({vertexShader:J0,fragmentShader:Z0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new st(new Ln(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class $0 extends Wi{constructor(e,t){super();const n=this;let r=null,s=1,o=null,a="local-floor",c=1,l=null,h=null,f=null,p=null,u=null,g=null;const _=typeof XRWebGLBinding<"u",m=new K0,d={},b=t.getContextAttributes();let y=null,x=null;const C=[],w=[],P=new ue;let D=null;const T=new Ht;T.viewport=new lt;const S=new Ht;S.viewport=new lt;const I=[T,S],B=new vf;let H=null,J=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let re=C[Z];return re===void 0&&(re=new Zs,C[Z]=re),re.getTargetRaySpace()},this.getControllerGrip=function(Z){let re=C[Z];return re===void 0&&(re=new Zs,C[Z]=re),re.getGripSpace()},this.getHand=function(Z){let re=C[Z];return re===void 0&&(re=new Zs,C[Z]=re),re.getHandSpace()};function G(Z){const re=w.indexOf(Z.inputSource);if(re===-1)return;const ye=C[re];ye!==void 0&&(ye.update(Z.inputSource,Z.frame,l||o),ye.dispatchEvent({type:Z.type,data:Z.inputSource}))}function Y(){r.removeEventListener("select",G),r.removeEventListener("selectstart",G),r.removeEventListener("selectend",G),r.removeEventListener("squeeze",G),r.removeEventListener("squeezestart",G),r.removeEventListener("squeezeend",G),r.removeEventListener("end",Y),r.removeEventListener("inputsourceschange",ee);for(let Z=0;Z<C.length;Z++){const re=w[Z];re!==null&&(w[Z]=null,C[Z].disconnect(re))}H=null,J=null,m.reset();for(const Z in d)delete d[Z];e.setRenderTarget(y),u=null,p=null,f=null,r=null,x=null,je.stop(),n.isPresenting=!1,e.setPixelRatio(D),e.setSize(P.width,P.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){s=Z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){a=Z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(Z){l=Z},this.getBaseLayer=function(){return p!==null?p:u},this.getBinding=function(){return f===null&&_&&(f=new XRWebGLBinding(r,t)),f},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(Z){if(r=Z,r!==null){if(y=e.getRenderTarget(),r.addEventListener("select",G),r.addEventListener("selectstart",G),r.addEventListener("selectend",G),r.addEventListener("squeeze",G),r.addEventListener("squeezestart",G),r.addEventListener("squeezeend",G),r.addEventListener("end",Y),r.addEventListener("inputsourceschange",ee),b.xrCompatible!==!0&&await t.makeXRCompatible(),D=e.getPixelRatio(),e.getSize(P),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let ye=null,Ie=null,Ae=null;b.depth&&(Ae=b.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ye=b.stencil?xr:vr,Ie=b.stencil?_r:ci);const Ye={colorFormat:t.RGBA8,depthFormat:Ae,scaleFactor:s};f=this.getBinding(),p=f.createProjectionLayer(Ye),r.updateRenderState({layers:[p]}),e.setPixelRatio(1),e.setSize(p.textureWidth,p.textureHeight,!1),x=new hi(p.textureWidth,p.textureHeight,{format:ln,type:_n,depthTexture:new Tc(p.textureWidth,p.textureHeight,Ie,void 0,void 0,void 0,void 0,void 0,void 0,ye),stencilBuffer:b.stencil,colorSpace:e.outputColorSpace,samples:b.antialias?4:0,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}else{const ye={antialias:b.antialias,alpha:!0,depth:b.depth,stencil:b.stencil,framebufferScaleFactor:s};u=new XRWebGLLayer(r,t,ye),r.updateRenderState({baseLayer:u}),e.setPixelRatio(1),e.setSize(u.framebufferWidth,u.framebufferHeight,!1),x=new hi(u.framebufferWidth,u.framebufferHeight,{format:ln,type:_n,colorSpace:e.outputColorSpace,stencilBuffer:b.stencil,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await r.requestReferenceSpace(a),je.setContext(r),je.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function ee(Z){for(let re=0;re<Z.removed.length;re++){const ye=Z.removed[re],Ie=w.indexOf(ye);Ie>=0&&(w[Ie]=null,C[Ie].disconnect(ye))}for(let re=0;re<Z.added.length;re++){const ye=Z.added[re];let Ie=w.indexOf(ye);if(Ie===-1){for(let Ye=0;Ye<C.length;Ye++)if(Ye>=w.length){w.push(ye),Ie=Ye;break}else if(w[Ye]===null){w[Ye]=ye,Ie=Ye;break}if(Ie===-1)break}const Ae=C[Ie];Ae&&Ae.connect(ye)}}const W=new L,pe=new L;function Me(Z,re,ye){W.setFromMatrixPosition(re.matrixWorld),pe.setFromMatrixPosition(ye.matrixWorld);const Ie=W.distanceTo(pe),Ae=re.projectionMatrix.elements,Ye=ye.projectionMatrix.elements,ut=Ae[14]/(Ae[10]-1),R=Ae[14]/(Ae[10]+1),ie=(Ae[9]+1)/Ae[5],j=(Ae[9]-1)/Ae[5],$=(Ae[8]-1)/Ae[0],K=(Ye[8]+1)/Ye[0],fe=ut*$,se=ut*K,de=Ie/(-$+K),ze=de*-$;if(re.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(ze),Z.translateZ(de),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),Ae[10]===-1)Z.projectionMatrix.copy(re.projectionMatrix),Z.projectionMatrixInverse.copy(re.projectionMatrixInverse);else{const Be=ut+de,A=R+de,v=fe-ze,O=se+(Ie-ze),V=ie*R/A*Be,ne=j*R/A*Be;Z.projectionMatrix.makePerspective(v,O,V,ne,Be,A),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function Ee(Z,re){re===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(re.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(r===null)return;let re=Z.near,ye=Z.far;m.texture!==null&&(m.depthNear>0&&(re=m.depthNear),m.depthFar>0&&(ye=m.depthFar)),B.near=S.near=T.near=re,B.far=S.far=T.far=ye,(H!==B.near||J!==B.far)&&(r.updateRenderState({depthNear:B.near,depthFar:B.far}),H=B.near,J=B.far),B.layers.mask=Z.layers.mask|6,T.layers.mask=B.layers.mask&3,S.layers.mask=B.layers.mask&5;const Ie=Z.parent,Ae=B.cameras;Ee(B,Ie);for(let Ye=0;Ye<Ae.length;Ye++)Ee(Ae[Ye],Ie);Ae.length===2?Me(B,T,S):B.projectionMatrix.copy(T.projectionMatrix),He(Z,B,Ie)};function He(Z,re,ye){ye===null?Z.matrix.copy(re.matrixWorld):(Z.matrix.copy(ye.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(re.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(re.projectionMatrix),Z.projectionMatrixInverse.copy(re.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=ps*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return B},this.getFoveation=function(){if(!(p===null&&u===null))return c},this.setFoveation=function(Z){c=Z,p!==null&&(p.fixedFoveation=Z),u!==null&&u.fixedFoveation!==void 0&&(u.fixedFoveation=Z)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(B)},this.getCameraTexture=function(Z){return d[Z]};let Ke=null;function rt(Z,re){if(h=re.getViewerPose(l||o),g=re,h!==null){const ye=h.views;u!==null&&(e.setRenderTargetFramebuffer(x,u.framebuffer),e.setRenderTarget(x));let Ie=!1;ye.length!==B.cameras.length&&(B.cameras.length=0,Ie=!0);for(let R=0;R<ye.length;R++){const ie=ye[R];let j=null;if(u!==null)j=u.getViewport(ie);else{const K=f.getViewSubImage(p,ie);j=K.viewport,R===0&&(e.setRenderTargetTextures(x,K.colorTexture,K.depthStencilTexture),e.setRenderTarget(x))}let $=I[R];$===void 0&&($=new Ht,$.layers.enable(R),$.viewport=new lt,I[R]=$),$.matrix.fromArray(ie.transform.matrix),$.matrix.decompose($.position,$.quaternion,$.scale),$.projectionMatrix.fromArray(ie.projectionMatrix),$.projectionMatrixInverse.copy($.projectionMatrix).invert(),$.viewport.set(j.x,j.y,j.width,j.height),R===0&&(B.matrix.copy($.matrix),B.matrix.decompose(B.position,B.quaternion,B.scale)),Ie===!0&&B.cameras.push($)}const Ae=r.enabledFeatures;if(Ae&&Ae.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&_){f=n.getBinding();const R=f.getDepthInformation(ye[0]);R&&R.isValid&&R.texture&&m.init(R,r.renderState)}if(Ae&&Ae.includes("camera-access")&&_){e.state.unbindTexture(),f=n.getBinding();for(let R=0;R<ye.length;R++){const ie=ye[R].camera;if(ie){let j=d[ie];j||(j=new bc,d[ie]=j);const $=f.getCameraImage(ie);j.sourceTexture=$}}}}for(let ye=0;ye<C.length;ye++){const Ie=w[ye],Ae=C[ye];Ie!==null&&Ae!==void 0&&Ae.update(Ie,re,l||o)}Ke&&Ke(Z,re),re.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:re}),g=null}const je=new Bc;je.setAnimationLoop(rt),this.setAnimationLoop=function(Z){Ke=Z},this.dispose=function(){}}}const ni=new cn,j0=new ht;function Q0(i,e){function t(m,d){m.matrixAutoUpdate===!0&&m.updateMatrix(),d.value.copy(m.matrix)}function n(m,d){d.color.getRGB(m.fogColor.value,vc(i)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function r(m,d,b,y,x){d.isMeshBasicMaterial||d.isMeshLambertMaterial?s(m,d):d.isMeshToonMaterial?(s(m,d),f(m,d)):d.isMeshPhongMaterial?(s(m,d),h(m,d)):d.isMeshStandardMaterial?(s(m,d),p(m,d),d.isMeshPhysicalMaterial&&u(m,d,x)):d.isMeshMatcapMaterial?(s(m,d),g(m,d)):d.isMeshDepthMaterial?s(m,d):d.isMeshDistanceMaterial?(s(m,d),_(m,d)):d.isMeshNormalMaterial?s(m,d):d.isLineBasicMaterial?(o(m,d),d.isLineDashedMaterial&&a(m,d)):d.isPointsMaterial?c(m,d,b,y):d.isSpriteMaterial?l(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function s(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map,t(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.bumpMap&&(m.bumpMap.value=d.bumpMap,t(d.bumpMap,m.bumpMapTransform),m.bumpScale.value=d.bumpScale,d.side===Ot&&(m.bumpScale.value*=-1)),d.normalMap&&(m.normalMap.value=d.normalMap,t(d.normalMap,m.normalMapTransform),m.normalScale.value.copy(d.normalScale),d.side===Ot&&m.normalScale.value.negate()),d.displacementMap&&(m.displacementMap.value=d.displacementMap,t(d.displacementMap,m.displacementMapTransform),m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap,t(d.emissiveMap,m.emissiveMapTransform)),d.specularMap&&(m.specularMap.value=d.specularMap,t(d.specularMap,m.specularMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);const b=e.get(d),y=b.envMap,x=b.envMapRotation;y&&(m.envMap.value=y,ni.copy(x),ni.x*=-1,ni.y*=-1,ni.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(ni.y*=-1,ni.z*=-1),m.envMapRotation.value.setFromMatrix4(j0.makeRotationFromEuler(ni)),m.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap&&(m.lightMap.value=d.lightMap,m.lightMapIntensity.value=d.lightMapIntensity,t(d.lightMap,m.lightMapTransform)),d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity,t(d.aoMap,m.aoMapTransform))}function o(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,d.map&&(m.map.value=d.map,t(d.map,m.mapTransform))}function a(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function c(m,d,b,y){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*b,m.scale.value=y*.5,d.map&&(m.map.value=d.map,t(d.map,m.uvTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function l(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map,t(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function h(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function f(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function p(m,d){m.metalness.value=d.metalness,d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap,t(d.metalnessMap,m.metalnessMapTransform)),m.roughness.value=d.roughness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap,t(d.roughnessMap,m.roughnessMapTransform)),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function u(m,d,b){m.ior.value=d.ior,d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap,t(d.sheenColorMap,m.sheenColorMapTransform)),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap,t(d.sheenRoughnessMap,m.sheenRoughnessMapTransform))),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap,t(d.clearcoatMap,m.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,t(d.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(m.clearcoatNormalMap.value=d.clearcoatNormalMap,t(d.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===Ot&&m.clearcoatNormalScale.value.negate())),d.dispersion>0&&(m.dispersion.value=d.dispersion),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap,t(d.iridescenceMap,m.iridescenceMapTransform)),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap,t(d.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=b.texture,m.transmissionSamplerSize.value.set(b.width,b.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap,t(d.transmissionMap,m.transmissionMapTransform)),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap,t(d.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(m.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(m.anisotropyMap.value=d.anisotropyMap,t(d.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap,t(d.specularColorMap,m.specularColorMapTransform)),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap,t(d.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,d){d.matcap&&(m.matcap.value=d.matcap)}function _(m,d){const b=e.get(d).light;m.referencePosition.value.setFromMatrixPosition(b.matrixWorld),m.nearDistance.value=b.shadow.camera.near,m.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function eg(i,e,t,n){let r={},s={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(b,y){const x=y.program;n.uniformBlockBinding(b,x)}function l(b,y){let x=r[b.id];x===void 0&&(g(b),x=h(b),r[b.id]=x,b.addEventListener("dispose",m));const C=y.program;n.updateUBOMapping(b,C);const w=e.render.frame;s[b.id]!==w&&(p(b),s[b.id]=w)}function h(b){const y=f();b.__bindingPointIndex=y;const x=i.createBuffer(),C=b.__size,w=b.usage;return i.bindBuffer(i.UNIFORM_BUFFER,x),i.bufferData(i.UNIFORM_BUFFER,C,w),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,y,x),x}function f(){for(let b=0;b<a;b++)if(o.indexOf(b)===-1)return o.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function p(b){const y=r[b.id],x=b.uniforms,C=b.__cache;i.bindBuffer(i.UNIFORM_BUFFER,y);for(let w=0,P=x.length;w<P;w++){const D=Array.isArray(x[w])?x[w]:[x[w]];for(let T=0,S=D.length;T<S;T++){const I=D[T];if(u(I,w,T,C)===!0){const B=I.__offset,H=Array.isArray(I.value)?I.value:[I.value];let J=0;for(let G=0;G<H.length;G++){const Y=H[G],ee=_(Y);typeof Y=="number"||typeof Y=="boolean"?(I.__data[0]=Y,i.bufferSubData(i.UNIFORM_BUFFER,B+J,I.__data)):Y.isMatrix3?(I.__data[0]=Y.elements[0],I.__data[1]=Y.elements[1],I.__data[2]=Y.elements[2],I.__data[3]=0,I.__data[4]=Y.elements[3],I.__data[5]=Y.elements[4],I.__data[6]=Y.elements[5],I.__data[7]=0,I.__data[8]=Y.elements[6],I.__data[9]=Y.elements[7],I.__data[10]=Y.elements[8],I.__data[11]=0):(Y.toArray(I.__data,J),J+=ee.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,B,I.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function u(b,y,x,C){const w=b.value,P=y+"_"+x;if(C[P]===void 0)return typeof w=="number"||typeof w=="boolean"?C[P]=w:C[P]=w.clone(),!0;{const D=C[P];if(typeof w=="number"||typeof w=="boolean"){if(D!==w)return C[P]=w,!0}else if(D.equals(w)===!1)return D.copy(w),!0}return!1}function g(b){const y=b.uniforms;let x=0;const C=16;for(let P=0,D=y.length;P<D;P++){const T=Array.isArray(y[P])?y[P]:[y[P]];for(let S=0,I=T.length;S<I;S++){const B=T[S],H=Array.isArray(B.value)?B.value:[B.value];for(let J=0,G=H.length;J<G;J++){const Y=H[J],ee=_(Y),W=x%C,pe=W%ee.boundary,Me=W+pe;x+=pe,Me!==0&&C-Me<ee.storage&&(x+=C-Me),B.__data=new Float32Array(ee.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=x,x+=ee.storage}}}const w=x%C;return w>0&&(x+=C-w),b.__size=x,b.__cache={},this}function _(b){const y={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(y.boundary=4,y.storage=4):b.isVector2?(y.boundary=8,y.storage=8):b.isVector3||b.isColor?(y.boundary=16,y.storage=12):b.isVector4?(y.boundary=16,y.storage=16):b.isMatrix3?(y.boundary=48,y.storage=48):b.isMatrix4?(y.boundary=64,y.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),y}function m(b){const y=b.target;y.removeEventListener("dispose",m);const x=o.indexOf(y.__bindingPointIndex);o.splice(x,1),i.deleteBuffer(r[y.id]),delete r[y.id],delete s[y.id]}function d(){for(const b in r)i.deleteBuffer(r[b]);o=[],r={},s={}}return{bind:c,update:l,dispose:d}}class tg{constructor(e={}){const{canvas:t=Kh(),context:n=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:p=!1}=e;this.isWebGLRenderer=!0;let u;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");u=n.getContextAttributes().alpha}else u=o;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,d=null;const b=[],y=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Xn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const x=this;let C=!1;this._outputColorSpace=Ut;let w=0,P=0,D=null,T=-1,S=null;const I=new lt,B=new lt;let H=null;const J=new Xe(0);let G=0,Y=t.width,ee=t.height,W=1,pe=null,Me=null;const Ee=new lt(0,0,Y,ee),He=new lt(0,0,Y,ee);let Ke=!1;const rt=new ya;let je=!1,Z=!1;const re=new ht,ye=new L,Ie=new lt,Ae={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ye=!1;function ut(){return D===null?W:1}let R=n;function ie(M,N){return t.getContext(M,N)}try{const M={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${ha}`),t.addEventListener("webglcontextlost",me,!1),t.addEventListener("webglcontextrestored",Te,!1),t.addEventListener("webglcontextcreationerror",ae,!1),R===null){const N="webgl2";if(R=ie(N,M),R===null)throw ie(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(M){throw console.error("THREE.WebGLRenderer: "+M.message),M}let j,$,K,fe,se,de,ze,Be,A,v,O,V,ne,X,Pe,he,we,Re,oe,xe,Fe,Le,_e,Ve;function U(){j=new um(R),j.init(),Le=new Y0(R,j),$=new rm(R,j,e,Le),K=new X0(R,j),$.reversedDepthBuffer&&p&&K.buffers.depth.setReversed(!0),fe=new pm(R),se=new I0,de=new q0(R,j,K,se,$,Le,fe),ze=new om(x),Be=new hm(x),A=new Mf(R),_e=new nm(R,A),v=new fm(R,A,fe,_e),O=new gm(R,v,A,fe),oe=new mm(R,$,de),he=new sm(se),V=new L0(x,ze,Be,j,$,_e,he),ne=new Q0(x,se),X=new U0,Pe=new k0(j),Re=new tm(x,ze,Be,K,O,u,c),we=new G0(x,O,$),Ve=new eg(R,fe,$,K),xe=new im(R,j,fe),Fe=new dm(R,j,fe),fe.programs=V.programs,x.capabilities=$,x.extensions=j,x.properties=se,x.renderLists=X,x.shadowMap=we,x.state=K,x.info=fe}U();const ce=new $0(x,R);this.xr=ce,this.getContext=function(){return R},this.getContextAttributes=function(){return R.getContextAttributes()},this.forceContextLoss=function(){const M=j.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){const M=j.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return W},this.setPixelRatio=function(M){M!==void 0&&(W=M,this.setSize(Y,ee,!1))},this.getSize=function(M){return M.set(Y,ee)},this.setSize=function(M,N,z=!0){if(ce.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Y=M,ee=N,t.width=Math.floor(M*W),t.height=Math.floor(N*W),z===!0&&(t.style.width=M+"px",t.style.height=N+"px"),this.setViewport(0,0,M,N)},this.getDrawingBufferSize=function(M){return M.set(Y*W,ee*W).floor()},this.setDrawingBufferSize=function(M,N,z){Y=M,ee=N,W=z,t.width=Math.floor(M*z),t.height=Math.floor(N*z),this.setViewport(0,0,M,N)},this.getCurrentViewport=function(M){return M.copy(I)},this.getViewport=function(M){return M.copy(Ee)},this.setViewport=function(M,N,z,k){M.isVector4?Ee.set(M.x,M.y,M.z,M.w):Ee.set(M,N,z,k),K.viewport(I.copy(Ee).multiplyScalar(W).round())},this.getScissor=function(M){return M.copy(He)},this.setScissor=function(M,N,z,k){M.isVector4?He.set(M.x,M.y,M.z,M.w):He.set(M,N,z,k),K.scissor(B.copy(He).multiplyScalar(W).round())},this.getScissorTest=function(){return Ke},this.setScissorTest=function(M){K.setScissorTest(Ke=M)},this.setOpaqueSort=function(M){pe=M},this.setTransparentSort=function(M){Me=M},this.getClearColor=function(M){return M.copy(Re.getClearColor())},this.setClearColor=function(){Re.setClearColor(...arguments)},this.getClearAlpha=function(){return Re.getClearAlpha()},this.setClearAlpha=function(){Re.setClearAlpha(...arguments)},this.clear=function(M=!0,N=!0,z=!0){let k=0;if(M){let F=!1;if(D!==null){const le=D.texture.format;F=le===va||le===_a||le===ga}if(F){const le=D.texture.type,ve=le===_n||le===ci||le===gr||le===_r||le===da||le===pa,be=Re.getClearColor(),Se=Re.getClearAlpha(),Ne=be.r,Oe=be.g,De=be.b;ve?(g[0]=Ne,g[1]=Oe,g[2]=De,g[3]=Se,R.clearBufferuiv(R.COLOR,0,g)):(_[0]=Ne,_[1]=Oe,_[2]=De,_[3]=Se,R.clearBufferiv(R.COLOR,0,_))}else k|=R.COLOR_BUFFER_BIT}N&&(k|=R.DEPTH_BUFFER_BIT),z&&(k|=R.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),R.clear(k)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",me,!1),t.removeEventListener("webglcontextrestored",Te,!1),t.removeEventListener("webglcontextcreationerror",ae,!1),Re.dispose(),X.dispose(),Pe.dispose(),se.dispose(),ze.dispose(),Be.dispose(),O.dispose(),_e.dispose(),Ve.dispose(),V.dispose(),ce.dispose(),ce.removeEventListener("sessionstart",hn),ce.removeEventListener("sessionend",Na),Zn.stop()};function me(M){M.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function Te(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;const M=fe.autoReset,N=we.enabled,z=we.autoUpdate,k=we.needsUpdate,F=we.type;U(),fe.autoReset=M,we.enabled=N,we.autoUpdate=z,we.needsUpdate=k,we.type=F}function ae(M){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function Q(M){const N=M.target;N.removeEventListener("dispose",Q),Ce(N)}function Ce(M){ke(M),se.remove(M)}function ke(M){const N=se.get(M).programs;N!==void 0&&(N.forEach(function(z){V.releaseProgram(z)}),M.isShaderMaterial&&V.releaseShaderCache(M))}this.renderBufferDirect=function(M,N,z,k,F,le){N===null&&(N=Ae);const ve=F.isMesh&&F.matrixWorld.determinant()<0,be=ih(M,N,z,k,F);K.setMaterial(k,ve);let Se=z.index,Ne=1;if(k.wireframe===!0){if(Se=v.getWireframeAttribute(z),Se===void 0)return;Ne=2}const Oe=z.drawRange,De=z.attributes.position;let Je=Oe.start*Ne,ot=(Oe.start+Oe.count)*Ne;le!==null&&(Je=Math.max(Je,le.start*Ne),ot=Math.min(ot,(le.start+le.count)*Ne)),Se!==null?(Je=Math.max(Je,0),ot=Math.min(ot,Se.count)):De!=null&&(Je=Math.max(Je,0),ot=Math.min(ot,De.count));const vt=ot-Je;if(vt<0||vt===1/0)return;_e.setup(F,k,be,z,Se);let dt,ct=xe;if(Se!==null&&(dt=A.get(Se),ct=Fe,ct.setIndex(dt)),F.isMesh)k.wireframe===!0?(K.setLineWidth(k.wireframeLinewidth*ut()),ct.setMode(R.LINES)):ct.setMode(R.TRIANGLES);else if(F.isLine){let Ue=k.linewidth;Ue===void 0&&(Ue=1),K.setLineWidth(Ue*ut()),F.isLineSegments?ct.setMode(R.LINES):F.isLineLoop?ct.setMode(R.LINE_LOOP):ct.setMode(R.LINE_STRIP)}else F.isPoints?ct.setMode(R.POINTS):F.isSprite&&ct.setMode(R.TRIANGLES);if(F.isBatchedMesh)if(F._multiDrawInstances!==null)Mr("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ct.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances);else if(j.get("WEBGL_multi_draw"))ct.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else{const Ue=F._multiDrawStarts,mt=F._multiDrawCounts,et=F._multiDrawCount,Vt=Se?A.get(Se).bytesPerElement:1,mi=se.get(k).currentProgram.getUniforms();for(let Gt=0;Gt<et;Gt++)mi.setValue(R,"_gl_DrawID",Gt),ct.render(Ue[Gt]/Vt,mt[Gt])}else if(F.isInstancedMesh)ct.renderInstances(Je,vt,F.count);else if(z.isInstancedBufferGeometry){const Ue=z._maxInstanceCount!==void 0?z._maxInstanceCount:1/0,mt=Math.min(z.instanceCount,Ue);ct.renderInstances(Je,vt,mt)}else ct.render(Je,vt)};function ft(M,N,z){M.transparent===!0&&M.side===qt&&M.forceSinglePass===!1?(M.side=Ot,M.needsUpdate=!0,Lr(M,N,z),M.side=Yn,M.needsUpdate=!0,Lr(M,N,z),M.side=qt):Lr(M,N,z)}this.compile=function(M,N,z=null){z===null&&(z=M),d=Pe.get(z),d.init(N),y.push(d),z.traverseVisible(function(F){F.isLight&&F.layers.test(N.layers)&&(d.pushLight(F),F.castShadow&&d.pushShadow(F))}),M!==z&&M.traverseVisible(function(F){F.isLight&&F.layers.test(N.layers)&&(d.pushLight(F),F.castShadow&&d.pushShadow(F))}),d.setupLights();const k=new Set;return M.traverse(function(F){if(!(F.isMesh||F.isPoints||F.isLine||F.isSprite))return;const le=F.material;if(le)if(Array.isArray(le))for(let ve=0;ve<le.length;ve++){const be=le[ve];ft(be,z,F),k.add(be)}else ft(le,z,F),k.add(le)}),d=y.pop(),k},this.compileAsync=function(M,N,z=null){const k=this.compile(M,N,z);return new Promise(F=>{function le(){if(k.forEach(function(ve){se.get(ve).currentProgram.isReady()&&k.delete(ve)}),k.size===0){F(M);return}setTimeout(le,10)}j.get("KHR_parallel_shader_compile")!==null?le():setTimeout(le,10)})};let it=null;function Mn(M){it&&it(M)}function hn(){Zn.stop()}function Na(){Zn.start()}const Zn=new Bc;Zn.setAnimationLoop(Mn),typeof self<"u"&&Zn.setContext(self),this.setAnimationLoop=function(M){it=M,ce.setAnimationLoop(M),M===null?Zn.stop():Zn.start()},ce.addEventListener("sessionstart",hn),ce.addEventListener("sessionend",Na),this.render=function(M,N){if(N!==void 0&&N.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),ce.enabled===!0&&ce.isPresenting===!0&&(ce.cameraAutoUpdate===!0&&ce.updateCamera(N),N=ce.getCamera()),M.isScene===!0&&M.onBeforeRender(x,M,N,D),d=Pe.get(M,y.length),d.init(N),y.push(d),re.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),rt.setFromProjectionMatrix(re,gn,N.reversedDepth),Z=this.localClippingEnabled,je=he.init(this.clippingPlanes,Z),m=X.get(M,b.length),m.init(),b.push(m),ce.enabled===!0&&ce.isPresenting===!0){const le=x.xr.getDepthSensingMesh();le!==null&&Ts(le,N,-1/0,x.sortObjects)}Ts(M,N,0,x.sortObjects),m.finish(),x.sortObjects===!0&&m.sort(pe,Me),Ye=ce.enabled===!1||ce.isPresenting===!1||ce.hasDepthSensing()===!1,Ye&&Re.addToRenderList(m,M),this.info.render.frame++,je===!0&&he.beginShadows();const z=d.state.shadowsArray;we.render(z,M,N),je===!0&&he.endShadows(),this.info.autoReset===!0&&this.info.reset();const k=m.opaque,F=m.transmissive;if(d.setupLights(),N.isArrayCamera){const le=N.cameras;if(F.length>0)for(let ve=0,be=le.length;ve<be;ve++){const Se=le[ve];Oa(k,F,M,Se)}Ye&&Re.render(M);for(let ve=0,be=le.length;ve<be;ve++){const Se=le[ve];Fa(m,M,Se,Se.viewport)}}else F.length>0&&Oa(k,F,M,N),Ye&&Re.render(M),Fa(m,M,N);D!==null&&P===0&&(de.updateMultisampleRenderTarget(D),de.updateRenderTargetMipmap(D)),M.isScene===!0&&M.onAfterRender(x,M,N),_e.resetDefaultState(),T=-1,S=null,y.pop(),y.length>0?(d=y[y.length-1],je===!0&&he.setGlobalState(x.clippingPlanes,d.state.camera)):d=null,b.pop(),b.length>0?m=b[b.length-1]:m=null};function Ts(M,N,z,k){if(M.visible===!1)return;if(M.layers.test(N.layers)){if(M.isGroup)z=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(N);else if(M.isLight)d.pushLight(M),M.castShadow&&d.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||rt.intersectsSprite(M)){k&&Ie.setFromMatrixPosition(M.matrixWorld).applyMatrix4(re);const ve=O.update(M),be=M.material;be.visible&&m.push(M,ve,be,z,Ie.z,null)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||rt.intersectsObject(M))){const ve=O.update(M),be=M.material;if(k&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),Ie.copy(M.boundingSphere.center)):(ve.boundingSphere===null&&ve.computeBoundingSphere(),Ie.copy(ve.boundingSphere.center)),Ie.applyMatrix4(M.matrixWorld).applyMatrix4(re)),Array.isArray(be)){const Se=ve.groups;for(let Ne=0,Oe=Se.length;Ne<Oe;Ne++){const De=Se[Ne],Je=be[De.materialIndex];Je&&Je.visible&&m.push(M,ve,Je,z,Ie.z,De)}}else be.visible&&m.push(M,ve,be,z,Ie.z,null)}}const le=M.children;for(let ve=0,be=le.length;ve<be;ve++)Ts(le[ve],N,z,k)}function Fa(M,N,z,k){const F=M.opaque,le=M.transmissive,ve=M.transparent;d.setupLightsView(z),je===!0&&he.setGlobalState(x.clippingPlanes,z),k&&K.viewport(I.copy(k)),F.length>0&&Pr(F,N,z),le.length>0&&Pr(le,N,z),ve.length>0&&Pr(ve,N,z),K.buffers.depth.setTest(!0),K.buffers.depth.setMask(!0),K.buffers.color.setMask(!0),K.setPolygonOffset(!1)}function Oa(M,N,z,k){if((z.isScene===!0?z.overrideMaterial:null)!==null)return;d.state.transmissionRenderTarget[k.id]===void 0&&(d.state.transmissionRenderTarget[k.id]=new hi(1,1,{generateMipmaps:!0,type:j.has("EXT_color_buffer_half_float")||j.has("EXT_color_buffer_float")?Ar:_n,minFilter:li,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:tt.workingColorSpace}));const le=d.state.transmissionRenderTarget[k.id],ve=k.viewport||I;le.setSize(ve.z*x.transmissionResolutionScale,ve.w*x.transmissionResolutionScale);const be=x.getRenderTarget(),Se=x.getActiveCubeFace(),Ne=x.getActiveMipmapLevel();x.setRenderTarget(le),x.getClearColor(J),G=x.getClearAlpha(),G<1&&x.setClearColor(16777215,.5),x.clear(),Ye&&Re.render(z);const Oe=x.toneMapping;x.toneMapping=Xn;const De=k.viewport;if(k.viewport!==void 0&&(k.viewport=void 0),d.setupLightsView(k),je===!0&&he.setGlobalState(x.clippingPlanes,k),Pr(M,z,k),de.updateMultisampleRenderTarget(le),de.updateRenderTargetMipmap(le),j.has("WEBGL_multisampled_render_to_texture")===!1){let Je=!1;for(let ot=0,vt=N.length;ot<vt;ot++){const dt=N[ot],ct=dt.object,Ue=dt.geometry,mt=dt.material,et=dt.group;if(mt.side===qt&&ct.layers.test(k.layers)){const Vt=mt.side;mt.side=Ot,mt.needsUpdate=!0,Ba(ct,z,k,Ue,mt,et),mt.side=Vt,mt.needsUpdate=!0,Je=!0}}Je===!0&&(de.updateMultisampleRenderTarget(le),de.updateRenderTargetMipmap(le))}x.setRenderTarget(be,Se,Ne),x.setClearColor(J,G),De!==void 0&&(k.viewport=De),x.toneMapping=Oe}function Pr(M,N,z){const k=N.isScene===!0?N.overrideMaterial:null;for(let F=0,le=M.length;F<le;F++){const ve=M[F],be=ve.object,Se=ve.geometry,Ne=ve.group;let Oe=ve.material;Oe.allowOverride===!0&&k!==null&&(Oe=k),be.layers.test(z.layers)&&Ba(be,N,z,Se,Oe,Ne)}}function Ba(M,N,z,k,F,le){M.onBeforeRender(x,N,z,k,F,le),M.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),F.onBeforeRender(x,N,z,k,M,le),F.transparent===!0&&F.side===qt&&F.forceSinglePass===!1?(F.side=Ot,F.needsUpdate=!0,x.renderBufferDirect(z,N,k,F,M,le),F.side=Yn,F.needsUpdate=!0,x.renderBufferDirect(z,N,k,F,M,le),F.side=qt):x.renderBufferDirect(z,N,k,F,M,le),M.onAfterRender(x,N,z,k,F,le)}function Lr(M,N,z){N.isScene!==!0&&(N=Ae);const k=se.get(M),F=d.state.lights,le=d.state.shadowsArray,ve=F.state.version,be=V.getParameters(M,F.state,le,N,z),Se=V.getProgramCacheKey(be);let Ne=k.programs;k.environment=M.isMeshStandardMaterial?N.environment:null,k.fog=N.fog,k.envMap=(M.isMeshStandardMaterial?Be:ze).get(M.envMap||k.environment),k.envMapRotation=k.environment!==null&&M.envMap===null?N.environmentRotation:M.envMapRotation,Ne===void 0&&(M.addEventListener("dispose",Q),Ne=new Map,k.programs=Ne);let Oe=Ne.get(Se);if(Oe!==void 0){if(k.currentProgram===Oe&&k.lightsStateVersion===ve)return ka(M,be),Oe}else be.uniforms=V.getUniforms(M),M.onBeforeCompile(be,x),Oe=V.acquireProgram(be,Se),Ne.set(Se,Oe),k.uniforms=be.uniforms;const De=k.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(De.clippingPlanes=he.uniform),ka(M,be),k.needsLights=sh(M),k.lightsStateVersion=ve,k.needsLights&&(De.ambientLightColor.value=F.state.ambient,De.lightProbe.value=F.state.probe,De.directionalLights.value=F.state.directional,De.directionalLightShadows.value=F.state.directionalShadow,De.spotLights.value=F.state.spot,De.spotLightShadows.value=F.state.spotShadow,De.rectAreaLights.value=F.state.rectArea,De.ltc_1.value=F.state.rectAreaLTC1,De.ltc_2.value=F.state.rectAreaLTC2,De.pointLights.value=F.state.point,De.pointLightShadows.value=F.state.pointShadow,De.hemisphereLights.value=F.state.hemi,De.directionalShadowMap.value=F.state.directionalShadowMap,De.directionalShadowMatrix.value=F.state.directionalShadowMatrix,De.spotShadowMap.value=F.state.spotShadowMap,De.spotLightMatrix.value=F.state.spotLightMatrix,De.spotLightMap.value=F.state.spotLightMap,De.pointShadowMap.value=F.state.pointShadowMap,De.pointShadowMatrix.value=F.state.pointShadowMatrix),k.currentProgram=Oe,k.uniformsList=null,Oe}function za(M){if(M.uniformsList===null){const N=M.currentProgram.getUniforms();M.uniformsList=hs.seqWithValue(N.seq,M.uniforms)}return M.uniformsList}function ka(M,N){const z=se.get(M);z.outputColorSpace=N.outputColorSpace,z.batching=N.batching,z.batchingColor=N.batchingColor,z.instancing=N.instancing,z.instancingColor=N.instancingColor,z.instancingMorph=N.instancingMorph,z.skinning=N.skinning,z.morphTargets=N.morphTargets,z.morphNormals=N.morphNormals,z.morphColors=N.morphColors,z.morphTargetsCount=N.morphTargetsCount,z.numClippingPlanes=N.numClippingPlanes,z.numIntersection=N.numClipIntersection,z.vertexAlphas=N.vertexAlphas,z.vertexTangents=N.vertexTangents,z.toneMapping=N.toneMapping}function ih(M,N,z,k,F){N.isScene!==!0&&(N=Ae),de.resetTextureUnits();const le=N.fog,ve=k.isMeshStandardMaterial?N.environment:null,be=D===null?x.outputColorSpace:D.isXRRenderTarget===!0?D.texture.colorSpace:ki,Se=(k.isMeshStandardMaterial?Be:ze).get(k.envMap||ve),Ne=k.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,Oe=!!z.attributes.tangent&&(!!k.normalMap||k.anisotropy>0),De=!!z.morphAttributes.position,Je=!!z.morphAttributes.normal,ot=!!z.morphAttributes.color;let vt=Xn;k.toneMapped&&(D===null||D.isXRRenderTarget===!0)&&(vt=x.toneMapping);const dt=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,ct=dt!==void 0?dt.length:0,Ue=se.get(k),mt=d.state.lights;if(je===!0&&(Z===!0||M!==S)){const Lt=M===S&&k.id===T;he.setState(k,M,Lt)}let et=!1;k.version===Ue.__version?(Ue.needsLights&&Ue.lightsStateVersion!==mt.state.version||Ue.outputColorSpace!==be||F.isBatchedMesh&&Ue.batching===!1||!F.isBatchedMesh&&Ue.batching===!0||F.isBatchedMesh&&Ue.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&Ue.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&Ue.instancing===!1||!F.isInstancedMesh&&Ue.instancing===!0||F.isSkinnedMesh&&Ue.skinning===!1||!F.isSkinnedMesh&&Ue.skinning===!0||F.isInstancedMesh&&Ue.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&Ue.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&Ue.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&Ue.instancingMorph===!1&&F.morphTexture!==null||Ue.envMap!==Se||k.fog===!0&&Ue.fog!==le||Ue.numClippingPlanes!==void 0&&(Ue.numClippingPlanes!==he.numPlanes||Ue.numIntersection!==he.numIntersection)||Ue.vertexAlphas!==Ne||Ue.vertexTangents!==Oe||Ue.morphTargets!==De||Ue.morphNormals!==Je||Ue.morphColors!==ot||Ue.toneMapping!==vt||Ue.morphTargetsCount!==ct)&&(et=!0):(et=!0,Ue.__version=k.version);let Vt=Ue.currentProgram;et===!0&&(Vt=Lr(k,N,F));let mi=!1,Gt=!1,Ki=!1;const gt=Vt.getUniforms(),Zt=Ue.uniforms;if(K.useProgram(Vt.program)&&(mi=!0,Gt=!0,Ki=!0),k.id!==T&&(T=k.id,Gt=!0),mi||S!==M){K.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),gt.setValue(R,"projectionMatrix",M.projectionMatrix),gt.setValue(R,"viewMatrix",M.matrixWorldInverse);const zt=gt.map.cameraPosition;zt!==void 0&&zt.setValue(R,ye.setFromMatrixPosition(M.matrixWorld)),$.logarithmicDepthBuffer&&gt.setValue(R,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial)&&gt.setValue(R,"isOrthographic",M.isOrthographicCamera===!0),S!==M&&(S=M,Gt=!0,Ki=!0)}if(F.isSkinnedMesh){gt.setOptional(R,F,"bindMatrix"),gt.setOptional(R,F,"bindMatrixInverse");const Lt=F.skeleton;Lt&&(Lt.boneTexture===null&&Lt.computeBoneTexture(),gt.setValue(R,"boneTexture",Lt.boneTexture,de))}F.isBatchedMesh&&(gt.setOptional(R,F,"batchingTexture"),gt.setValue(R,"batchingTexture",F._matricesTexture,de),gt.setOptional(R,F,"batchingIdTexture"),gt.setValue(R,"batchingIdTexture",F._indirectTexture,de),gt.setOptional(R,F,"batchingColorTexture"),F._colorsTexture!==null&&gt.setValue(R,"batchingColorTexture",F._colorsTexture,de));const Kt=z.morphAttributes;if((Kt.position!==void 0||Kt.normal!==void 0||Kt.color!==void 0)&&oe.update(F,z,Vt),(Gt||Ue.receiveShadow!==F.receiveShadow)&&(Ue.receiveShadow=F.receiveShadow,gt.setValue(R,"receiveShadow",F.receiveShadow)),k.isMeshGouraudMaterial&&k.envMap!==null&&(Zt.envMap.value=Se,Zt.flipEnvMap.value=Se.isCubeTexture&&Se.isRenderTargetTexture===!1?-1:1),k.isMeshStandardMaterial&&k.envMap===null&&N.environment!==null&&(Zt.envMapIntensity.value=N.environmentIntensity),Gt&&(gt.setValue(R,"toneMappingExposure",x.toneMappingExposure),Ue.needsLights&&rh(Zt,Ki),le&&k.fog===!0&&ne.refreshFogUniforms(Zt,le),ne.refreshMaterialUniforms(Zt,k,W,ee,d.state.transmissionRenderTarget[M.id]),hs.upload(R,za(Ue),Zt,de)),k.isShaderMaterial&&k.uniformsNeedUpdate===!0&&(hs.upload(R,za(Ue),Zt,de),k.uniformsNeedUpdate=!1),k.isSpriteMaterial&&gt.setValue(R,"center",F.center),gt.setValue(R,"modelViewMatrix",F.modelViewMatrix),gt.setValue(R,"normalMatrix",F.normalMatrix),gt.setValue(R,"modelMatrix",F.matrixWorld),k.isShaderMaterial||k.isRawShaderMaterial){const Lt=k.uniformsGroups;for(let zt=0,bs=Lt.length;zt<bs;zt++){const Kn=Lt[zt];Ve.update(Kn,Vt),Ve.bind(Kn,Vt)}}return Vt}function rh(M,N){M.ambientLightColor.needsUpdate=N,M.lightProbe.needsUpdate=N,M.directionalLights.needsUpdate=N,M.directionalLightShadows.needsUpdate=N,M.pointLights.needsUpdate=N,M.pointLightShadows.needsUpdate=N,M.spotLights.needsUpdate=N,M.spotLightShadows.needsUpdate=N,M.rectAreaLights.needsUpdate=N,M.hemisphereLights.needsUpdate=N}function sh(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return P},this.getRenderTarget=function(){return D},this.setRenderTargetTextures=function(M,N,z){const k=se.get(M);k.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,k.__autoAllocateDepthBuffer===!1&&(k.__useRenderToTexture=!1),se.get(M.texture).__webglTexture=N,se.get(M.depthTexture).__webglTexture=k.__autoAllocateDepthBuffer?void 0:z,k.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,N){const z=se.get(M);z.__webglFramebuffer=N,z.__useDefaultFramebuffer=N===void 0};const oh=R.createFramebuffer();this.setRenderTarget=function(M,N=0,z=0){D=M,w=N,P=z;let k=!0,F=null,le=!1,ve=!1;if(M){const Se=se.get(M);if(Se.__useDefaultFramebuffer!==void 0)K.bindFramebuffer(R.FRAMEBUFFER,null),k=!1;else if(Se.__webglFramebuffer===void 0)de.setupRenderTarget(M);else if(Se.__hasExternalTextures)de.rebindTextures(M,se.get(M.texture).__webglTexture,se.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){const De=M.depthTexture;if(Se.__boundDepthTexture!==De){if(De!==null&&se.has(De)&&(M.width!==De.image.width||M.height!==De.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");de.setupDepthRenderbuffer(M)}}const Ne=M.texture;(Ne.isData3DTexture||Ne.isDataArrayTexture||Ne.isCompressedArrayTexture)&&(ve=!0);const Oe=se.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(Oe[N])?F=Oe[N][z]:F=Oe[N],le=!0):M.samples>0&&de.useMultisampledRTT(M)===!1?F=se.get(M).__webglMultisampledFramebuffer:Array.isArray(Oe)?F=Oe[z]:F=Oe,I.copy(M.viewport),B.copy(M.scissor),H=M.scissorTest}else I.copy(Ee).multiplyScalar(W).floor(),B.copy(He).multiplyScalar(W).floor(),H=Ke;if(z!==0&&(F=oh),K.bindFramebuffer(R.FRAMEBUFFER,F)&&k&&K.drawBuffers(M,F),K.viewport(I),K.scissor(B),K.setScissorTest(H),le){const Se=se.get(M.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_CUBE_MAP_POSITIVE_X+N,Se.__webglTexture,z)}else if(ve){const Se=N;for(let Ne=0;Ne<M.textures.length;Ne++){const Oe=se.get(M.textures[Ne]);R.framebufferTextureLayer(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0+Ne,Oe.__webglTexture,z,Se)}}else if(M!==null&&z!==0){const Se=se.get(M.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,Se.__webglTexture,z)}T=-1},this.readRenderTargetPixels=function(M,N,z,k,F,le,ve,be=0){if(!(M&&M.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Se=se.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&ve!==void 0&&(Se=Se[ve]),Se){K.bindFramebuffer(R.FRAMEBUFFER,Se);try{const Ne=M.textures[be],Oe=Ne.format,De=Ne.type;if(!$.textureFormatReadable(Oe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!$.textureTypeReadable(De)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=M.width-k&&z>=0&&z<=M.height-F&&(M.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+be),R.readPixels(N,z,k,F,Le.convert(Oe),Le.convert(De),le))}finally{const Ne=D!==null?se.get(D).__webglFramebuffer:null;K.bindFramebuffer(R.FRAMEBUFFER,Ne)}}},this.readRenderTargetPixelsAsync=async function(M,N,z,k,F,le,ve,be=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Se=se.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&ve!==void 0&&(Se=Se[ve]),Se)if(N>=0&&N<=M.width-k&&z>=0&&z<=M.height-F){K.bindFramebuffer(R.FRAMEBUFFER,Se);const Ne=M.textures[be],Oe=Ne.format,De=Ne.type;if(!$.textureFormatReadable(Oe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!$.textureTypeReadable(De))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Je=R.createBuffer();R.bindBuffer(R.PIXEL_PACK_BUFFER,Je),R.bufferData(R.PIXEL_PACK_BUFFER,le.byteLength,R.STREAM_READ),M.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+be),R.readPixels(N,z,k,F,Le.convert(Oe),Le.convert(De),0);const ot=D!==null?se.get(D).__webglFramebuffer:null;K.bindFramebuffer(R.FRAMEBUFFER,ot);const vt=R.fenceSync(R.SYNC_GPU_COMMANDS_COMPLETE,0);return R.flush(),await $h(R,vt,4),R.bindBuffer(R.PIXEL_PACK_BUFFER,Je),R.getBufferSubData(R.PIXEL_PACK_BUFFER,0,le),R.deleteBuffer(Je),R.deleteSync(vt),le}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,N=null,z=0){const k=Math.pow(2,-z),F=Math.floor(M.image.width*k),le=Math.floor(M.image.height*k),ve=N!==null?N.x:0,be=N!==null?N.y:0;de.setTexture2D(M,0),R.copyTexSubImage2D(R.TEXTURE_2D,z,0,0,ve,be,F,le),K.unbindTexture()};const ah=R.createFramebuffer(),lh=R.createFramebuffer();this.copyTextureToTexture=function(M,N,z=null,k=null,F=0,le=null){le===null&&(F!==0?(Mr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),le=F,F=0):le=0);let ve,be,Se,Ne,Oe,De,Je,ot,vt;const dt=M.isCompressedTexture?M.mipmaps[le]:M.image;if(z!==null)ve=z.max.x-z.min.x,be=z.max.y-z.min.y,Se=z.isBox3?z.max.z-z.min.z:1,Ne=z.min.x,Oe=z.min.y,De=z.isBox3?z.min.z:0;else{const Kt=Math.pow(2,-F);ve=Math.floor(dt.width*Kt),be=Math.floor(dt.height*Kt),M.isDataArrayTexture?Se=dt.depth:M.isData3DTexture?Se=Math.floor(dt.depth*Kt):Se=1,Ne=0,Oe=0,De=0}k!==null?(Je=k.x,ot=k.y,vt=k.z):(Je=0,ot=0,vt=0);const ct=Le.convert(N.format),Ue=Le.convert(N.type);let mt;N.isData3DTexture?(de.setTexture3D(N,0),mt=R.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(de.setTexture2DArray(N,0),mt=R.TEXTURE_2D_ARRAY):(de.setTexture2D(N,0),mt=R.TEXTURE_2D),R.pixelStorei(R.UNPACK_FLIP_Y_WEBGL,N.flipY),R.pixelStorei(R.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),R.pixelStorei(R.UNPACK_ALIGNMENT,N.unpackAlignment);const et=R.getParameter(R.UNPACK_ROW_LENGTH),Vt=R.getParameter(R.UNPACK_IMAGE_HEIGHT),mi=R.getParameter(R.UNPACK_SKIP_PIXELS),Gt=R.getParameter(R.UNPACK_SKIP_ROWS),Ki=R.getParameter(R.UNPACK_SKIP_IMAGES);R.pixelStorei(R.UNPACK_ROW_LENGTH,dt.width),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,dt.height),R.pixelStorei(R.UNPACK_SKIP_PIXELS,Ne),R.pixelStorei(R.UNPACK_SKIP_ROWS,Oe),R.pixelStorei(R.UNPACK_SKIP_IMAGES,De);const gt=M.isDataArrayTexture||M.isData3DTexture,Zt=N.isDataArrayTexture||N.isData3DTexture;if(M.isDepthTexture){const Kt=se.get(M),Lt=se.get(N),zt=se.get(Kt.__renderTarget),bs=se.get(Lt.__renderTarget);K.bindFramebuffer(R.READ_FRAMEBUFFER,zt.__webglFramebuffer),K.bindFramebuffer(R.DRAW_FRAMEBUFFER,bs.__webglFramebuffer);for(let Kn=0;Kn<Se;Kn++)gt&&(R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,se.get(M).__webglTexture,F,De+Kn),R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,se.get(N).__webglTexture,le,vt+Kn)),R.blitFramebuffer(Ne,Oe,ve,be,Je,ot,ve,be,R.DEPTH_BUFFER_BIT,R.NEAREST);K.bindFramebuffer(R.READ_FRAMEBUFFER,null),K.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else if(F!==0||M.isRenderTargetTexture||se.has(M)){const Kt=se.get(M),Lt=se.get(N);K.bindFramebuffer(R.READ_FRAMEBUFFER,ah),K.bindFramebuffer(R.DRAW_FRAMEBUFFER,lh);for(let zt=0;zt<Se;zt++)gt?R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,Kt.__webglTexture,F,De+zt):R.framebufferTexture2D(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,Kt.__webglTexture,F),Zt?R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,Lt.__webglTexture,le,vt+zt):R.framebufferTexture2D(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,Lt.__webglTexture,le),F!==0?R.blitFramebuffer(Ne,Oe,ve,be,Je,ot,ve,be,R.COLOR_BUFFER_BIT,R.NEAREST):Zt?R.copyTexSubImage3D(mt,le,Je,ot,vt+zt,Ne,Oe,ve,be):R.copyTexSubImage2D(mt,le,Je,ot,Ne,Oe,ve,be);K.bindFramebuffer(R.READ_FRAMEBUFFER,null),K.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else Zt?M.isDataTexture||M.isData3DTexture?R.texSubImage3D(mt,le,Je,ot,vt,ve,be,Se,ct,Ue,dt.data):N.isCompressedArrayTexture?R.compressedTexSubImage3D(mt,le,Je,ot,vt,ve,be,Se,ct,dt.data):R.texSubImage3D(mt,le,Je,ot,vt,ve,be,Se,ct,Ue,dt):M.isDataTexture?R.texSubImage2D(R.TEXTURE_2D,le,Je,ot,ve,be,ct,Ue,dt.data):M.isCompressedTexture?R.compressedTexSubImage2D(R.TEXTURE_2D,le,Je,ot,dt.width,dt.height,ct,dt.data):R.texSubImage2D(R.TEXTURE_2D,le,Je,ot,ve,be,ct,Ue,dt);R.pixelStorei(R.UNPACK_ROW_LENGTH,et),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,Vt),R.pixelStorei(R.UNPACK_SKIP_PIXELS,mi),R.pixelStorei(R.UNPACK_SKIP_ROWS,Gt),R.pixelStorei(R.UNPACK_SKIP_IMAGES,Ki),le===0&&N.generateMipmaps&&R.generateMipmap(mt),K.unbindTexture()},this.initRenderTarget=function(M){se.get(M).__webglFramebuffer===void 0&&de.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?de.setTextureCube(M,0):M.isData3DTexture?de.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?de.setTexture2DArray(M,0):de.setTexture2D(M,0),K.unbindTexture()},this.resetState=function(){w=0,P=0,D=null,K.reset(),_e.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return gn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=tt._getDrawingBufferColorSpace(e),t.unpackColorSpace=tt._getUnpackColorSpace()}}function Gc(i,e=!1){const t=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),r=new Set(Object.keys(i[0].morphAttributes)),s={},o={},a=i[0].morphTargetsRelative,c=new Et;let l=0;for(let h=0;h<i.length;++h){const f=i[h];let p=0;if(t!==(f.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const u in f.attributes){if(!n.has(u))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+u+'" attribute exists among all geometries, or in none of them.'),null;s[u]===void 0&&(s[u]=[]),s[u].push(f.attributes[u]),p++}if(p!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==f.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const u in f.morphAttributes){if(!r.has(u))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[u]===void 0&&(o[u]=[]),o[u].push(f.morphAttributes[u])}if(e){let u;if(t)u=f.index.count;else if(f.attributes.position!==void 0)u=f.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,u,h),l+=u}}if(t){let h=0;const f=[];for(let p=0;p<i.length;++p){const u=i[p].index;for(let g=0;g<u.count;++g)f.push(u.getX(g)+h);h+=i[p].attributes.position.count}c.setIndex(f)}for(const h in s){const f=Yl(s[h]);if(!f)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;c.setAttribute(h,f)}for(const h in o){const f=o[h][0].length;if(f===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[h]=[];for(let p=0;p<f;++p){const u=[];for(let _=0;_<o[h].length;++_)u.push(o[h][_][p]);const g=Yl(u);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;c.morphAttributes[h].push(g)}}return c}function Yl(i){let e,t,n,r=-1,s=0;for(let l=0;l<i.length;++l){const h=i[l];if(e===void 0&&(e=h.array.constructor),e!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=h.itemSize),t!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(r===-1&&(r=h.gpuType),r!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;s+=h.count*t}const o=new e(s),a=new en(o,t,n);let c=0;for(let l=0;l<i.length;++l){const h=i[l];if(h.isInterleavedBufferAttribute){const f=c/t;for(let p=0,u=h.count;p<u;p++)for(let g=0;g<t;g++){const _=h.getComponent(p,g);a.setComponent(p+f,g,_)}}else o.set(h.array,c);c+=h.count*t}return r!==void 0&&(a.gpuType=r),a}class ng extends Sc{constructor(){super();const e=new vn;e.deleteAttribute("uv");const t=new tn({side:Ot}),n=new tn,r=new Fc(16777215,900,28,2);r.position.set(.418,16.199,.3),this.add(r);const s=new st(e,t);s.position.set(-.757,13.219,.717),s.scale.set(31.713,28.305,28.591),this.add(s);const o=new xs(e,n,6),a=new pt;a.position.set(-10.906,2.009,1.846),a.rotation.set(0,-.195,0),a.scale.set(2.328,7.905,4.651),a.updateMatrix(),o.setMatrixAt(0,a.matrix),a.position.set(-5.607,-.754,-.758),a.rotation.set(0,.994,0),a.scale.set(1.97,1.534,3.955),a.updateMatrix(),o.setMatrixAt(1,a.matrix),a.position.set(6.167,.857,7.803),a.rotation.set(0,.561,0),a.scale.set(3.927,6.285,3.687),a.updateMatrix(),o.setMatrixAt(2,a.matrix),a.position.set(-2.017,.018,6.124),a.rotation.set(0,.333,0),a.scale.set(2.002,4.566,2.064),a.updateMatrix(),o.setMatrixAt(3,a.matrix),a.position.set(2.291,-.756,-2.621),a.rotation.set(0,-.286,0),a.scale.set(1.546,1.552,1.496),a.updateMatrix(),o.setMatrixAt(4,a.matrix),a.position.set(-2.193,-.369,-5.547),a.rotation.set(0,.516,0),a.scale.set(3.875,3.487,2.986),a.updateMatrix(),o.setMatrixAt(5,a.matrix),this.add(o);const c=new st(e,Li(50));c.position.set(-16.116,14.37,8.208),c.scale.set(.1,2.428,2.739),this.add(c);const l=new st(e,Li(50));l.position.set(-16.109,18.021,-8.207),l.scale.set(.1,2.425,2.751),this.add(l);const h=new st(e,Li(17));h.position.set(14.904,12.198,-1.832),h.scale.set(.15,4.265,6.331),this.add(h);const f=new st(e,Li(43));f.position.set(-.462,8.89,14.52),f.scale.set(4.38,5.441,.088),this.add(f);const p=new st(e,Li(20));p.position.set(3.235,11.486,-12.541),p.scale.set(2.5,2,.1),this.add(p);const u=new st(e,Li(100));u.position.set(0,20,0),u.scale.set(1,.1,1),this.add(u)}dispose(){const e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(const t of e)t.dispose()}}function Li(i){return new lf({color:0,emissive:16777215,emissiveIntensity:i})}const sr=new L;function jt(i,e,t,n,r,s){const o=2*Math.PI*r/4,a=Math.max(s-2*r,0),c=Math.PI/4;sr.copy(e),sr[n]=0,sr.normalize();const l=.5*o/(o+a),h=1-sr.angleTo(i)/c;return Math.sign(sr[t])===1?h*l:a/(o+a)+l+l*(1-h)}class Da extends vn{constructor(e=1,t=1,n=1,r=2,s=.1){const o=r*2+1;if(s=Math.min(e/2,t/2,n/2,s),super(1,1,1,o,o,o),this.type="RoundedBoxGeometry",this.parameters={width:e,height:t,depth:n,segments:r,radius:s},o===1)return;const a=this.toNonIndexed();this.index=null,this.attributes.position=a.attributes.position,this.attributes.normal=a.attributes.normal,this.attributes.uv=a.attributes.uv;const c=new L,l=new L,h=new L(e,t,n).divideScalar(2).subScalar(s),f=this.attributes.position.array,p=this.attributes.normal.array,u=this.attributes.uv.array,g=f.length/6,_=new L,m=.5/o;for(let d=0,b=0;d<f.length;d+=3,b+=2)switch(c.fromArray(f,d),l.copy(c),l.x-=Math.sign(l.x)*m,l.y-=Math.sign(l.y)*m,l.z-=Math.sign(l.z)*m,l.normalize(),f[d+0]=h.x*Math.sign(c.x)+l.x*s,f[d+1]=h.y*Math.sign(c.y)+l.y*s,f[d+2]=h.z*Math.sign(c.z)+l.z*s,p[d+0]=l.x,p[d+1]=l.y,p[d+2]=l.z,Math.floor(d/g)){case 0:_.set(1,0,0),u[b+0]=jt(_,l,"z","y",s,n),u[b+1]=1-jt(_,l,"y","z",s,t);break;case 1:_.set(-1,0,0),u[b+0]=1-jt(_,l,"z","y",s,n),u[b+1]=1-jt(_,l,"y","z",s,t);break;case 2:_.set(0,1,0),u[b+0]=1-jt(_,l,"x","z",s,e),u[b+1]=jt(_,l,"z","x",s,n);break;case 3:_.set(0,-1,0),u[b+0]=1-jt(_,l,"x","z",s,e),u[b+1]=1-jt(_,l,"z","x",s,n);break;case 4:_.set(0,0,1),u[b+0]=1-jt(_,l,"x","y",s,e),u[b+1]=1-jt(_,l,"y","x",s,t);break;case 5:_.set(0,0,-1),u[b+0]=jt(_,l,"x","y",s,e),u[b+1]=1-jt(_,l,"y","x",s,t);break}}static fromJSON(e){return new Da(e.width,e.height,e.depth,e.segments,e.radius)}}const Wc=1.64,ig=.23,Fi={x:0,z:6.25,yaw:.16},rg=[[-4.95,-4.7,-6.1,7.7],[4.7,4.95,-6.1,7.7],[-4.7,4.7,7.5,7.8],[-4.7,.5,-6.15,-5.9],[.5,4.7,-6.15,-5.46],[-4.7,-3.7,-.31,-.09],[-1.5,1.6,-.31,-.09],[3.4,4.7,-.31,-.09],[.29,.51,-5.9,-4.3],[.29,.51,-2.6,-.2],[-4.25,-2.75,2.35,5.45],[-1.95,-.35,3.2,4.35],[1.12,2.45,2.35,3.72],[2.4,4.25,4.8,7.22],[1.94,2.05,5.1,7.5],[3.95,4.57,4.08,4.68],[-4.55,-3.65,.35,1.68],[3.83,4.6,.42,2.08],[-3.7,-2.88,5.65,6.43],[-4.52,-3.33,-5.25,-1.03],[-3.1,-1.32,-5.77,-5.16],[-1.13,-.55,-2.03,-1.3],[3.76,4.49,-2.22,-1.01],[.56,.94,-5.49,-4.48],[4.28,4.61,-5.49,-4.48]];function Jl(i,e,t=ig){return rg.some(([n,r,s,o])=>{const a=i-Math.max(n,Math.min(r,i)),c=e-Math.max(s,Math.min(o,e));return a*a+c*c<t*t})}function sg(i,e,t){const n=Math.max(1,Math.ceil(Math.hypot(e,t)/.065));for(let r=0;r<n;r++){const s=i.x+e/n;Jl(s,i.z)||(i.x=s);const o=i.z+t/n;Jl(i.x,o)||(i.z=o)}return i}function og(i,e){return e>-.2?"LIVING QUARTERS":i<.4?"RESEARCH NOOK":"OBSERVATION"}const Ze=i=>document.getElementById(i),St=new Sc;St.background=new Xe("#041722");St.fog=new Sa("#041722",12,27);const qn=new Ht(68,innerWidth/innerHeight,.06,45);qn.rotation.order="YXZ";let Mt;try{Mt=new tg({antialias:!0,alpha:!1,powerPreference:"high-performance"})}catch(i){throw Ze("error").hidden=!1,Ze("error").textContent="A WebGL-capable desktop browser is required. "+i.message,i}Mt.setSize(innerWidth,innerHeight);Mt.setPixelRatio(Math.min(devicePixelRatio,1.5,Math.sqrt(3e6/(innerWidth*innerHeight))));Mt.outputColorSpace=Ut;Mt.toneMapping=tc;Mt.toneMappingExposure=1.1;Mt.shadowMap.enabled=!0;Mt.shadowMap.type=ec;Ze("scene").appendChild(Mt.domElement);const Xc=new na(Mt),qc=new ng,ag=Xc.fromScene(qc,.04);St.environment=ag.texture;St.environmentIntensity=.34;qc.dispose();Xc.dispose();let lo=4204;function Ft(){return lo=Math.imul(lo,1664525)+1013904223>>>0,lo/4294967296}const Qe=(i,e)=>i+(e-i)*Ft();function Gi(i,e,t=1){const n=document.createElement("canvas");n.width=n.height=i,e(n.getContext("2d"),i);const r=new Ec(n);return r.colorSpace=Ut,r.wrapS=r.wrapT=us,r.repeat.set(t,t),r.anisotropy=Math.min(4,Mt.capabilities.getMaxAnisotropy()),r}function lg(i,e="paint"){return Gi(256,(t,n)=>{t.fillStyle=i,t.fillRect(0,0,n,n);for(let r=0;r<18e3;r++){const s=Ft()>.5?255:0;t.fillStyle=`rgba(${s},${s},${s},${e==="fabric"?.08:.025})`,t.fillRect(Ft()*n,Ft()*n,1,1)}if(e==="fabric")for(let r=0;r<n;r+=3)t.strokeStyle=r%2?"#fff1":"#0002",t.lineWidth=1,t.beginPath(),t.moveTo(r,0),t.lineTo(r,n),t.stroke(),t.beginPath(),t.moveTo(0,r),t.lineTo(n,r),t.stroke();if(e==="wood")for(let r=0;r<150;r++){t.strokeStyle=Ft()>.5?"#ffdbaa15":"#1b0f1022",t.lineWidth=Qe(.4,1.6),t.beginPath();let s=Qe(0,n);t.moveTo(0,s);for(let o=0;o<=n;o+=8)t.lineTo(o,s+Math.sin(o*.04+r)*Qe(1,3));t.stroke()}if(e==="metal")for(let r=0;r<450;r++)t.fillStyle="#e6ecec0a",t.fillRect(Qe(0,n),Qe(0,n),Qe(10,90),.5)},e==="fabric"?3:1)}function $e(i,e=.7,t=0,n=null){const r=n?lg(i,n):null;return new tn({color:n?"#ffffff":i,map:r,roughness:e,metalness:t,bumpMap:n==="fabric"?r:null,bumpScale:n==="fabric"?.009:1})}const E={hull:$e("#91aba6",.63,.35,"paint"),wall:$e("#c4cbbc",.87,.12,"paint"),teal:$e("#326164",.65,.44,"paint"),dark:$e("#1d383e",.7,.55,"paint"),edge:$e("#638783",.48,.55,"metal"),steel:$e("#95aaa6",.29,.84,"metal"),bronze:$e("#967546",.38,.75,"metal"),rubber:$e("#152426",.94,.04,"paint"),black:$e("#111a1b",.66,.1),wood:$e("#725341",.54,.04,"wood"),oak:$e("#a78057",.6,.02,"wood"),floor:$e("#445b5c",.81,.28,"paint"),cream:$e("#d4c8ae",.95,0,"fabric"),sofa:$e("#a98b67",.97,0,"fabric"),olive:$e("#60736a",.98,0,"fabric"),rust:$e("#ab624a",.92,0,"fabric"),blanket:$e("#31585c",1,0,"fabric"),pillow:$e("#d4d2b8",.95,0,"fabric"),ceramic:$e("#e1dfc7",.28,0),blueCeramic:$e("#45818b",.26,.08),book:$e("#384d58",.85,0),redBook:$e("#965c46",.9,0),paper:$e("#d4caa9",.99,0),coral:$e("#45686a",.95,.02),reef:$e("#182f39",.98,0),kelp:$e("#254b47",.96,0),coralPurple:$e("#524652",.96,0),specimen:$e("#be9e74",.72,.05),screen:new ui({color:"#89c6b9"}),amber:new tn({color:"#f4d7a1",emissive:"#ffb755",emissiveIntensity:2.3,roughness:.4}),cool:new tn({color:"#a8cfd0",emissive:"#5babbf",emissiveIntensity:1.7,roughness:.4}),life:new ui({color:"#679d94"}),glass:new af({color:"#8bb5bb",transparent:!0,opacity:.12,roughness:.13,metalness:.1,envMapIntensity:.6,side:qt,depthWrite:!1}),jarGlass:new tn({color:"#a9c2af",transparent:!0,opacity:.22,roughness:.17,metalness:.14,depthWrite:!1})},cg=new Set([E.cream,E.sofa,E.olive,E.rust,E.blanket,E.pillow]),_s=new Map;function nn(i,e,t=[0,0,0],n=[0,0,0],r=[1,1,1],s=!0){const o=new pt;if(o.position.fromArray(t),o.rotation.set(...n),o.scale.fromArray(r),o.updateMatrix(),e.transparent){const h=new st(i,e);return h.applyMatrix4(o.matrix),h.renderOrder=2,St.add(h),h}const a=e.uuid+(s?"1":"0");let c=_s.get(a);c||(c={material:e,cast:s,geometries:[]},_s.set(a,c));const l=i.index?i.toNonIndexed():i;return l.applyMatrix4(o.matrix),c.geometries.push(l),l!==i&&i.dispose(),o}function q(i,e,t,n,r,s,o=E.hull,a=[0,0,0],c=!0){return nn(new vn(i,e,t),o,[n,r,s],a,[1,1,1],c)}function Tt(i,e,t,n,r,s,o,a,c=[0,0,0]){if(cg.has(a))return nn(new Da(i,e,t,2,Math.min(n,i*.48,e*.48,t*.48)),a,[r,s,o],c);const l=Tr(i,e,n),h=new wr(l,{depth:t,bevelEnabled:!0,bevelSegments:1,steps:1,bevelSize:.015,bevelThickness:.015,curveSegments:5});return h.translate(0,0,-t/2),nn(h,a,[r,s,o],c)}function Yt(i,e,t,n,r,s=[1,1,1],o=12){return nn(new Ji(i,o,8),r,[e,t,n],[0,0,0],s)}function te(i,e,t,n=E.steel,r=t,s=10,o=!0){const a=new L(...i),c=new L(...e),l=c.clone().sub(a),h=new Ms(r,t,l.length(),s,1),f=new qi().setFromUnitVectors(new L(0,1,0),l.normalize());return h.applyQuaternion(f),nn(h,n,a.add(c).multiplyScalar(.5).toArray(),[0,0,0],[1,1,1],o)}function Bt(i,e,t,n,r,s=E.steel,o=[0,0,0],a=Math.PI*2){return nn(new Ca(i,e,6,24,a),s,[t,n,r],o)}function Tr(i,e,t){t=Math.min(t,i*.499,e*.499);const n=new Ss,r=-i/2,s=-e/2;return n.moveTo(r+t,s),n.lineTo(r+i-t,s),n.quadraticCurveTo(r+i,s,r+i,s+t),n.lineTo(r+i,s+e-t),n.quadraticCurveTo(r+i,s+e,r+i-t,s+e),n.lineTo(r+t,s+e),n.quadraticCurveTo(r,s+e,r,s+e-t),n.lineTo(r,s+t),n.quadraticCurveTo(r,s,r+t,s),n}function un(i,e,t,n,r,s,o,a,c,l,h,f=!1,p=[0,0,0]){const u=Tr(i,e,t),g=Tr(n,r,s);u.holes.push(new Qo(g.getPoints(10).reverse()));const _=new wr(u,{depth:o,steps:1,bevelEnabled:!0,bevelSize:.012,bevelThickness:.012,bevelSegments:1,curveSegments:8});return _.translate(0,0,-o/2),nn(_,h,[a,c,l],p,[1,1,1],f)}function xt(i,e,t,n,r,s,o={}){const a=document.createElement("canvas");a.width=512,a.height=Math.max(128,Math.round(512*t/e));const c=a.getContext("2d");c.fillStyle=o.bg||"#243b3b",c.fillRect(0,0,a.width,a.height),o.border!==!1&&(c.strokeStyle=o.border||"#8b9b8a",c.lineWidth=3,c.strokeRect(9,9,a.width-18,a.height-18)),c.fillStyle=o.color||"#e1dbc4",c.textAlign="center",c.textBaseline="middle";const l=i.split(`
`);c.font=`${o.bold?"600":"400"} ${Math.min(a.height/(l.length+1)*.78,o.size||42)}px ${o.font||"monospace"}`,l.forEach((p,u)=>c.fillText(p,a.width/2,a.height*(u+1)/(l.length+1),a.width*.89));const h=new Ec(a);h.colorSpace=Ut,h.anisotropy=4;const f=new st(new Ln(e,t),new tn({map:h,roughness:.8,metalness:.12}));return f.position.set(n,r,s),o.rot&&f.rotation.set(...o.rot),St.add(f),f}const hg=Gi(128,(i,e)=>{const t=i.createRadialGradient(e/2,e/2,0,e/2,e/2,e/2);t.addColorStop(0,"rgba(0,8,10,.43)"),t.addColorStop(.6,"rgba(0,8,10,.15)"),t.addColorStop(1,"rgba(0,8,10,0)"),i.fillStyle=t,i.fillRect(0,0,e,e)}),ug=new ui({map:hg,transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-1});function Di(i,e,t,n,r=e>2.06&&e<5.62&&i>-2.84&&i<1.82?.052:.027){const s=new st(new Ln(t,n),ug);s.rotation.x=-Math.PI/2,s.position.set(i,r,e),s.renderOrder=1,St.add(s)}function ur(i,e,t=.38,n=.06){te([i,n,e],[i,n+t,e],.028,E.dark,.024),Yt(.036,i,n,e,E.rubber,[1,.4,1])}function Qt(i,e,t,n="z",r=.027){n==="z"?(te([i,e,t-.016],[i,e,t+.016],r,E.steel,r,6,!1),Bt(r*1.2,.005,i,e,t+.018,E.dark)):n==="x"?te([i-.016,e,t],[i+.016,e,t],r,E.steel,r,6,!1):te([i,e-.016,t],[i,e+.016,t],r,E.steel,r,6,!1)}function fg(){q(9.8,.18,13.9,0,-.11,.8,E.dark,[0,0,0],!1);for(let e=-4.7;e<4.69;e+=.94)for(let t=-5.9;t<7.49;t+=1.34){q(.923,.028,1.322,e+.47,.007,t+.67,E.floor,[0,0,0],!1);for(const n of[-.4,.4])for(const r of[-.58,.58])Qt(e+.47+n,.024,t+.67+r,"y",.012)}q(.23,3.16,13.62,-4.815,1.58,.8,E.wall,[0,0,0],!1),q(.23,3.16,13.62,4.815,1.58,.8,E.wall,[0,0,0],!1),q(9.63,3.16,.23,0,1.58,7.615,E.wall,[0,0,0],!1),q(5.12,3.16,.23,-2.15,1.58,-6.015,E.teal,[0,0,0],!1);for(const e of[-4.684,4.684])q(.035,.7,13.4,e,.35,.8,E.teal,[0,0,0],!1),q(.08,.12,13.4,e,.12,.8,E.dark,[0,0,0],!1),q(.055,.04,13.4,e,.73,.8,E.edge,[0,0,0],!1);q(9.4,.7,.04,0,.35,7.483,E.teal,[0,0,0],!1),q(5.1,.7,.04,-2.15,.35,-5.886,E.dark,[0,0,0],!1),q(9.63,.15,13.63,0,3.205,.8,E.hull,[0,0,0],!1);for(let e=-5.1;e<7.4;e+=1.85){q(9.4,.11,.09,0,3.075,e,E.edge,[0,0,0],!1),q(.06,2.45,.09,-4.665,1.86,e,E.edge,[0,0,0],!1),q(.06,2.45,.09,4.665,1.86,e,E.edge,[0,0,0],!1);for(let t=.88;t<3;t+=.5)Qt(-4.62,t,e,"x",.016),Qt(4.62,t,e,"x",.016)}for(const[e,t]of[[-4.7,-3.7],[-1.5,1.6],[3.4,4.7]])q(t-e,3.16,.22,(e+t)/2,1.58,-.2,E.hull,[0,0,0],!1),q(t-e,.65,.25,(e+t)/2,.325,-.2,E.teal,[0,0,0],!1);for(const[e,t,n]of[[-3.7,-1.5,"02 / FIELD LAB"],[1.6,3.4,"03 / OBSERVATION"]]){q(t-e,.65,.22,(e+t)/2,2.835,-.2,E.hull,[0,0,0],!1);for(const r of[e,t])q(.1,2.48,.32,r,1.24,-.2,E.dark,[0,0,0],!1),q(.028,2.42,.035,r+(r===e?.06:-.06),1.21,0,E.edge,[0,0,0],!1);q(t-e,.08,.34,(e+t)/2,2.48,-.2,E.dark,[0,0,0],!1),q(t-e,.02,.35,(e+t)/2,.024,-.2,E.steel,[0,0,0],!1),xt(n,Math.min(1.1,t-e-.3),.18,(e+t)/2,2.8,-.075,{size:36}),q(.42,.025,.12,(e+t)/2,2.47,-.07,E.cool,[0,0,0],!1)}for(const[e,t]of[[-5.9,-4.3],[-2.6,-.2]])q(.22,3.16,t-e,.4,1.58,(e+t)/2,E.hull,[0,0,0],!1);q(.22,.68,1.7,.4,2.82,-3.45,E.hull,[0,0,0],!1);for(const e of[-4.3,-2.6])q(.32,2.48,.1,.4,1.24,e,E.dark,[0,0,0],!1);q(.34,.08,1.7,.4,2.48,-3.45,E.dark,[0,0,0],!1),q(.32,.02,1.7,.4,.024,-3.45,E.steel,[0,0,0],!1),xt("OBS / 03",.7,.15,.225,2.8,-3.45,{rot:[0,-Math.PI/2,0],size:36});for(const e of[-4.35,-4.1,4.28]){te([e,2.87,-5.55],[e,2.87,7.15],e===-4.35?.065:.038,e===-4.1?E.bronze:E.edge,void 0,10,!1);for(let t=-5.2;t<7.1;t+=1.7)te([e,2.87,t-.055],[e,2.87,t+.055],e===-4.35?.081:.049,E.steel,void 0,10,!1),q(.035,.32,.06,e,3.015,t,E.dark,[0,0,0],!1)}te([-4.35,2.87,5.85],[-4.35,.95,5.85],.05,E.edge,void 0,10,!1),Bt(.105,.015,-4.27,1.12,5.85,E.redBook,[0,Math.PI/2,0]),te([-4.3,1.12,5.85],[-4.18,1.12,5.85],.019,E.steel),un(1.74,2.66,.3,1.46,2.38,.24,.18,0,1.34,7.39,E.dark),Tt(1.44,2.35,.14,.24,0,1.32,7.39,E.teal),un(1.43,2.34,.24,1.3,2.21,.2,.018,0,1.32,7.302,E.rubber),q(.5,.035,.06,0,1.12,7.26,E.steel),Bt(.18,.018,0,1.12,7.22,E.steel),te([0,.96,7.22],[0,1.28,7.22],.016,E.steel),te([-.16,1.12,7.22],[.16,1.12,7.22],.016,E.steel);for(const e of[-.85,.85])for(let t=.35;t<2.6;t+=.4)Qt(e,t,7.27);xt(`04
LIVING QUARTERS`,.62,.3,0,2.04,7.302,{rot:[0,Math.PI,0],bg:"#344f4b"}),xt("NEREID / 04",.63,.13,0,2.02,7.28,{rot:[0,Math.PI,0],size:36}),xt(`DRY HABITAT
176 m / SEA LEVEL −`,.72,.28,1.37,1.67,7.46,{rot:[0,Math.PI,0],size:36}),q(.38,.52,.055,1.4,.94,7.435,E.dark),Yt(.019,1.3,1.05,7.393,E.life),xt(`SEAL
NORMAL`,.22,.19,1.4,.91,7.397,{rot:[0,Math.PI,0],size:38});const i=$e("#788e80",.94,.12);for(let e=0;e<85;e++){const t=Qe(-5.4,7.1),n=Ft()>.5?-4.652:4.652;q(.008,Qe(.01,.04),Qe(.015,.095),n,Qe(.075,.16),t,i,[0,0,Qe(-.12,.12)],!1)}}fg();function ss(i,e,t,n=E.ceramic,r=0){te([i,e+.012,t],[i,e+.14,t],.066,n,.073,18),te([i,e+.145,t],[i,e+.15,t],.059,E.wood,.059,18),Bt(.067,.007,i,e+.153,t,n,[Math.PI/2,0,0]);const s=Math.cos(r)*.09,o=Math.sin(r)*.09;Bt(.043,.011,i+s,e+.086,t+o,n,[0,-r,0])}function Yc(i,e,t,n=.16,r=.26,s=.045,o=E.book,a=0){q(n,r,s,i,e,t,E.paper,[0,a,0]);for(const c of[-1,1])q(n+.012,r+.012,.008,i+Math.sin(a)*c*s/2,e,t+Math.cos(a)*c*s/2,o,[0,a,0]);q(.016,r,s+.012,i-n/2*Math.cos(a),e,t+n/2*Math.sin(a),o,[0,a,0])}function mr(i,e,t,n,r,s=E.book,o=0){q(n,.035,r,i,e,t,E.paper,[0,o,0]),q(n+.012,.005,r+.018,i,e+.02,t,s,[0,o,0]),q(n+.012,.005,r+.018,i,e-.02,t,s,[0,o,0])}function ra(i,e,t,n=.3){te([i,e-n*.6,t],[i,e+n*.6,t],n,E.cream,n*.64,24),Bt(n,.012,i,e-n*.61,t,E.bronze,[Math.PI/2,0,0]),Bt(n*.64,.008,i,e+n*.61,t,E.bronze,[Math.PI/2,0,0]),te([i,e-n*.58,t],[i,e-n*.57,t],n*.89,E.amber,n*.89,24,!1)}function Pn(i,e,t,n,r,s=6){const o=new Fc(i,e,s,2);return o.position.set(t,n,r),St.add(o),o}function dg(i="coast"){return Gi(512,(e,t)=>{if(e.fillStyle="#d7c29e",e.fillRect(0,0,t,t),i==="coast"){e.fillStyle="#d0a17f",e.fillRect(0,0,t,t*.45),e.fillStyle="#ead5a2",e.beginPath(),e.arc(356,133,48,0,Math.PI*2),e.fill(),e.fillStyle="#536f6b",e.fillRect(0,t*.47,t,t*.53);for(let n=0;n<85;n++)e.strokeStyle=`rgba(211,217,190,${Qe(.08,.3)})`,e.lineWidth=Qe(1,3),e.beginPath(),e.moveTo(Qe(0,t),Qe(260,512)),e.lineTo(Qe(0,t),Qe(260,512)),e.stroke();e.fillStyle="#314f4a",e.beginPath(),e.moveTo(0,205),e.lineTo(94,217),e.lineTo(135,305),e.lineTo(202,320),e.lineTo(217,380),e.lineTo(294,420),e.lineTo(295,512),e.lineTo(0,512),e.fill(),e.fillStyle="#8c8665",e.beginPath(),e.moveTo(0,193),e.lineTo(74,195),e.lineTo(98,224),e.lineTo(25,235),e.lineTo(0,270),e.fill(),e.strokeStyle="#233b3c",e.lineWidth=2;for(let n=0;n<4;n++){let r=pg(n);e.beginPath(),e.moveTo(r,92+n*17),e.quadraticCurveTo(r+9,82+n*17,r+18,92+n*17),e.quadraticCurveTo(r+27,82+n*17,r+36,92+n*17),e.stroke()}e.font="20px Georgia",e.fillStyle="#e3d5b6",e.fillText("HOME / WEST COAST",29,474)}else{e.strokeStyle="#405c4e",e.lineWidth=5,e.beginPath(),e.moveTo(250,450),e.bezierCurveTo(340,340,150,240,270,80),e.stroke();for(let n=0;n<9;n++){const r=410-n*36,s=250+Math.sin(n*1.1)*23,o=n%2?1:-1;e.fillStyle=n%2?"#82927a":"#506b58",e.beginPath(),e.moveTo(s,r),e.bezierCurveTo(s+o*130,r-35,s+o*100,r-90,s+o*18,r-48),e.quadraticCurveTo(s+o*30,r-15,s,r),e.fill()}e.fillStyle="#46594a",e.font="20px Georgia",e.fillText("Laminaria digitata",137,479)}for(let n=0;n<4e3;n++)e.fillStyle=Ft()>.5?"#fff08":"#00008",e.fillRect(Ft()*t,Ft()*t,1,1)})}function pg(i){return 238+i*47}function fr(i,e,t,n,r,s=0,o="coast"){const a=dg(o),c=new lr,l=new st(new vn(n+.1,r+.1,.065),E.wood);c.add(l);const h=new st(new vn(n+.06,r+.06,.068),E.paper);c.add(h);const f=new st(new Ln(n-.07,r-.07),new tn({map:a,roughness:.95}));f.position.z=.036,c.add(f),c.position.set(i,e,t),c.rotation.y=s,St.add(c)}function mg(){Di(-3.5,3.88,2.1,3.8);for(const u of[-4.01,-2.99])for(const g of[2.62,5.12])ur(u,g,.27);Tt(1.36,.24,3,.08,-3.55,.38,3.9,E.sofa),Tt(.24,.84,3.03,.08,-4.14,.74,3.9,E.sofa);for(const u of[2.39,5.41])Tt(1.4,.4,.23,.07,-3.54,.66,u,E.sofa);for(const u of[2.9,3.9,4.9]){Tt(1,.2,.92,.1,-3.48,.59,u,E.sofa),Tt(.18,.57,.94,.06,-3.96,.91,u,E.sofa,[0,0,-.11]);for(const g of[-3.94,-3.02])te([g,.685,u-.4],[g,.685,u+.4],.007,E.cream);for(const g of[u-.41,u+.41])te([-3.94,.685,g],[-3.02,.685,g],.007,E.cream)}Tt(.51,.5,.14,.085,-3.77,.96,2.95,E.rust,[0,Math.PI/2,-.18]),Tt(.55,.54,.16,.08,-3.78,.99,4.34,E.olive,[0,Math.PI/2,-.15]),q(.84,.025,.75,-3.23,.711,4.96,E.cream),q(.03,.3,.75,-2.813,.564,4.96,E.cream),q(1.17,.03,.28,-3.41,.874,5.3,E.cream);for(let u=4.59;u<5.35;u+=.075)q(.84,.004,.011,-3.23,.729,u,E.olive),q(.009,.28,.011,-2.79,.557,u,E.olive),te([-2.8,.42,u],[-2.8,.38,u+.015],.003,E.cream);const i=Gi(1024,(u,g)=>{u.fillStyle="#9b9a7d",u.fillRect(0,0,g,g),u.fillStyle="#697b70",u.fillRect(45,45,g-90,g-90),u.fillStyle="#aaa587",u.fillRect(70,70,g-140,g-140);for(let _=0;_<9;_++)for(let m=0;m<11;m++){const d=110+m*78,b=126+_*93;u.fillStyle=(_+m)%2?"#536962":"#b2b39a",u.beginPath(),u.moveTo(d,b-33),u.lineTo(d+24,b),u.lineTo(d,b+33),u.lineTo(d-24,b),u.closePath(),u.fill(),u.fillStyle="#c5bea0",u.fillRect(d-5,b-5,10,10)}for(let _=0;_<g;_+=3)u.fillStyle=_%2?"#fff13":"#001b1420",u.fillRect(0,_,g,1),u.fillRect(_,0,1,g);for(let _=0;_<18e3;_++)u.fillStyle="#fff06",u.fillRect(Ft()*g,Ft()*g,1,1)}),e=new tn({map:i,roughness:1});q(4.65,.018,3.47,-.51,.037,3.84,e);for(let u=-2.8;u<1.81;u+=.055)for(const g of[2.063,5.617])te([u,.043,g],[u+.014,.043,g+(g<3?-.08:.08)],.006,E.cream,void 0,5,!1);Di(-1.15,3.78,2,1.4),Tt(1.6,1.15,.09,.13,-1.15,.49,3.78,E.oak,[Math.PI/2,0,0]);for(const u of[-1.8,-.51])for(const g of[3.36,4.2])te([u,.07,g],[u,.45,g],.025,E.bronze),Yt(.03,u,.06,g,E.rubber,[1,.4,1]);mr(-1.38,.582,3.84,.44,.31,E.rust,-.13),xt(`FIELD NOTES
NEREID / 04`,.34,.24,-1.38,.605,3.84,{rot:[-Math.PI/2,0,-.13],bg:"#a76349",color:"#e0cfab",size:39}),te([-.69,.547,3.58],[-.69,.556,3.58],.118,E.wood,.118,18),ss(-.69,.56,3.58,E.ceramic,.35),q(.2,.007,.17,-.8,.551,4.05,E.paper,[0,.25,0]);const t=1.79,n=3.04;Di(t,n,1.65,1.6);for(const u of[1.28,2.27])for(const g of[2.5,3.55])ur(u,g,.38);Tt(1.18,.19,1.2,.08,t,.51,n,E.olive),Tt(.2,.78,1.23,.08,2.3,.85,n,E.olive,[0,0,.09]),Tt(.85,.17,.87,.07,1.71,.655,n,E.olive);for(const u of[2.44,3.64])q(1.22,.12,.1,t,.86,u,E.oak),q(.1,.43,.1,1.3,.64,u,E.oak);Tt(.44,.44,.13,.065,2.13,1.01,3.04,E.cream,[0,Math.PI/2,.07]);for(const[u,g]of[[-3.98,1.95],[-3.46,1.75],[-3.58,2.17]])te([u,.06,g],[-3.7,1.78,1.97],.017,E.oak);ra(-3.7,1.8,1.97,.3),Pn("#ffd39b",13,-3.7,1.63,1.97,5.5),fr(-4.652,1.85,3.78,1.42,.99,Math.PI/2,"coast"),fr(4.65,1.95,2.83,.65,.89,-Math.PI/2,"botanical"),q(.84,.82,1.28,-4.11,.49,1.02,E.wood),q(.92,.07,1.35,-4.1,.94,1.02,E.oak);for(const u of[.62,1.07,1.47])q(.045,.7,.39,-3.675,.48,u,E.teal),te([-3.63,.67,u-.08],[-3.63,.67,u+.08],.01,E.bronze);for(let u=0;u<6;u++)Yc(-4.02,1.13,.58+u*.095,.29,.28,.067,u%2?E.redBook:E.book,Math.PI/2);te([-4.09,1,1.4],[-4.09,1.19,1.4],.106,E.blueCeramic,.055,18);const r=$e("#63765c",.95,0);for(let u=0;u<9;u++){const g=u*.9;te([-4.09,1.18,1.4],[-4.09+Math.cos(g)*.1,1.4+Ft()*.12,1.4+Math.sin(g)*.1],.007,r),Yt(.07,-4.09+Math.cos(g)*.1,1.38+Ft()*.12,1.4+Math.sin(g)*.1,r,[.6,1.7,.24])}q(.56,.06,.6,-3.27,.67,6.02,E.oak);for(const u of[-3.48,-3.06])for(const g of[5.82,6.24])ur(u,g,.59);mr(-3.26,.734,6.03,.3,.41,E.book,.1),ss(-3.4,.71,5.87,E.blueCeramic,-.8),te([-4.64,1.82,6.9],[-4.33,1.82,6.9],.018,E.steel),Tt(.14,.78,.41,.06,-4.48,1.25,6.9,E.rust,[0,Math.PI/2,0]),te([-4.34,1.68,6.71],[-4.27,1.09,6.62],.08,E.rust,.052),te([-4.34,1.68,7.06],[-4.28,1.07,7.17],.08,E.rust,.052),q(.68,.86,1.6,4.22,.45,1.22,E.teal),q(.76,.055,1.68,4.22,.918,1.22,E.ceramic);for(const u of[.73,1.25,1.77])q(.027,.7,.48,3.865,.48,u,E.hull),te([3.83,.69,u-.08],[3.83,.69,u+.08],.009,E.bronze);q(.35,.009,.43,4.2,.952,.79,E.dark),un(.32,.4,.06,.24,.32,.04,.015,4.2,.96,.79,E.steel,!1,[Math.PI/2,0,0]),te([4.44,.95,.68],[4.44,1.21,.68],.018,E.steel),te([4.44,1.21,.68],[4.22,1.21,.68],.018,E.steel),te([4.22,1.21,.68],[4.22,1.15,.68],.018,E.steel),Yt(.13,4.15,1.08,1.41,E.ceramic,[1,1.1,1]),te([4.15,1.18,1.41],[4.15,1.205,1.41],.085,E.steel,.085,16),Yt(.023,4.15,1.23,1.41,E.black),te([4.02,1.1,1.41],[3.94,1.17,1.41],.031,E.ceramic,.018),Bt(.093,.015,4.25,1.14,1.41,E.black,[0,Math.PI/2,0],Math.PI),q(.2,.19,.2,4.25,1.05,1.85,E.wood),xt("TEA",.12,.07,4.14,1.07,1.85,{rot:[0,-Math.PI/2,0],size:45}),q(.37,.035,.18,4.48,1.75,1.31,E.oak),ss(4.47,1.78,1.21,E.blueCeramic,-Math.PI/2),ss(4.47,1.78,1.46,E.ceramic,-Math.PI/2),xt(`ON THE SURFACE
Rain. 12°C. Wind W 18.`,.86,.21,2.18,1.85,-.068,{bg:"#50635b",size:32}),Di(3.3,6.02,2.3,2.9);for(const u of[2.58,4.02])for(const g of[5,7.04])ur(u,g,.3);q(1.82,.24,2.35,3.32,.38,6.04,E.wood),Tt(1.76,.22,2.28,.1,3.32,.59,6.03,E.cream),q(1.84,.9,.12,3.32,.69,7.22,E.oak),Tt(.67,.18,.45,.1,2.91,.77,6.85,E.pillow,[0,.06,0]),Tt(.67,.18,.45,.1,3.73,.77,6.85,E.pillow,[0,-.09,0]),Tt(1.8,.12,1.6,.07,3.32,.773,5.76,E.blanket),q(.036,.34,1.58,2.42,.62,5.75,E.blanket),q(.036,.34,1.58,4.22,.62,5.75,E.blanket),q(1.8,.34,.04,3.32,.62,4.96,E.blanket),q(1.82,.058,.25,3.32,.86,6.43,E.olive);const s=$e("#617a76",1);for(let u=2.51;u<4.2;u+=.18)te([u,.839,5.07],[u,.839,6.39],.003,s,void 0,5);for(let u=5.1;u<6.35;u+=.18)te([2.5,.839,u],[4.14,.839,u],.003,s,void 0,5);q(.59,.53,.55,4.27,.33,4.38,E.oak),q(.61,.055,.58,4.27,.626,4.38,E.wood),te([4.27,.65,4.38],[4.27,1.06,4.38],.027,E.bronze),te([4.27,.65,4.38],[4.27,.67,4.38],.115,E.bronze,.115,16),ra(4.27,1.1,4.38,.16),Pn("#ffdca4",5,4.27,1.03,4.38,3.8),mr(4.27,.684,4.58,.21,.23,E.redBook,-.07),te([2,2.54,4.7],[2,2.54,7.37],.022,E.bronze);const o=[],a=[],c=[],l=46,h=4;for(let u=0;u<=h;u++)for(let g=0;g<=l;g++)o.push(1.97+Math.sin(g/l*Math.PI*18)*.055,2.44-u/h*2.05,5.12+g/l*2.27),a.push(g/l,u/h);for(let u=0;u<h;u++)for(let g=0;g<l;g++){const _=u*(l+1)+g;c.push(_,_+1,_+l+1,_+1,_+l+2,_+l+1)}const f=new Et;f.setAttribute("position",new nt(o,3)),f.setAttribute("uv",new nt(a,2)),f.setIndex(c),f.computeVertexNormals();const p=E.cream.clone();p.side=qt,nn(f,p);for(let u=5.15;u<7.35;u+=.14)Bt(.035,.005,2,2.51,u,E.bronze,[0,Math.PI/2,0]);fr(3.13,1.57,7.446,.46,.37,Math.PI,"coast"),fr(3.78,1.57,7.446,.35,.43,Math.PI,"botanical"),te([.25,2.02,-.05],[.25,2.02,.02],.22,E.bronze,.22,32),te([.25,2.02,.022],[.25,2.02,.03],.195,E.paper,.195,32);for(let u=0;u<12;u++){const g=u*Math.PI/6;q(.015,.036,.006,.25+Math.sin(g)*.162,2.02+Math.cos(g)*.162,.038,E.dark,[0,0,-g])}te([.25,2.02,.045],[.15,2.09,.045],.008,E.dark),te([.25,2.02,.045],[.36,1.99,.045],.006,E.dark),Yt(.018,.25,2.02,.048,E.bronze),xt(`RESIDENCE / 04
Please leave the kettle full.`,1.05,.25,-.2,1.5,-.058,{bg:"#aab5a4",color:"#314c47",size:33})}mg();function Jc(i,e,t,n=1,r=E.specimen){te([i,e,t],[i+.022*n,e+.22*n,t],.021*n,r,.01*n,7);for(const[s,o,a]of[[-.1,.02,.18],[.105,-.04,.24],[.03,.11,.17],[-.065,-.065,.23]])te([i,e+.08*n,t],[i+s*n,e+a*n,t+o*n],.013*n,r,.006*n,7),Yt(.018*n,i+s*n,e+a*n,t+o*n,r,[.8,.85,.8],8)}function co(i,e,t,n,r,s){te([i,e+.008,t],[i,e+.018,t],n,E.dark,n,16),te([i,e+.02,t],[i,e+r-.025,t],n*.98,E.jarGlass,n*.98,20,!1),Bt(n,.005,i,e+.026,t,E.steel,[Math.PI/2,0,0]),Bt(n,.005,i,e+r-.023,t,E.steel,[Math.PI/2,0,0]),te([i,e+r-.018,t],[i,e+r+.018,t],n*1.07,E.steel,n*1.07,20),Jc(i,e+.03,t,r*2.6,E.specimen),xt(s,n*1.7,r*.23,i+n+.001,e+r*.35,t,{rot:[0,Math.PI/2,0],bg:"#d2ceb3",color:"#314948",size:42,border:!1})}function Zc(i,e,t,n=.15,r="x"){const s=r==="x"||r==="-x",o=r==="-x"?-1:1,a=s?[o,0,0]:[0,0,1];te([i-a[0]*.04,e,t-a[2]*.04],[i+a[0]*.015,e,t+a[2]*.015],n,E.steel,n,24),te([i+a[0]*.018,e,t+a[2]*.018],[i+a[0]*.023,e,t+a[2]*.023],n*.87,E.paper,n*.87,24);for(let c=0;c<11;c++){const l=-2.25+c*.45,h=n*.68,f=n*.8;s?te([i+o*.029,e+Math.cos(l)*h,t+Math.sin(l)*h],[i+o*.029,e+Math.cos(l)*f,t+Math.sin(l)*f],.003,E.dark,void 0,5):te([i+Math.sin(l)*h,e+Math.cos(l)*h,t+.029],[i+Math.sin(l)*f,e+Math.cos(l)*f,t+.029],.003,E.dark,void 0,5)}s?te([i+o*.034,e,t],[i+o*.034,e+n*.55,t-n*.24],.004,E.rust):te([i,e,t+.034],[i-n*.25,e+n*.6,t+.034],.004,E.rust),Yt(.012,i+a[0]*.04,e,t+a[2]*.04,E.dark)}function gg(){const i=$e("#677a73",.53,.35,"paint");Di(-3.94,-3.13,1.7,4.6),q(1.14,.055,4.2,-3.94,.91,-3.13,E.steel),q(1.08,.035,4.13,-3.92,.955,-3.13,i);for(const s of[-5.16,-1.16])te([-4.39,.06,s],[-4.39,.88,s],.033,E.dark),te([-3.49,.06,s],[-3.49,.88,s],.033,E.dark),te([-4.39,.13,s],[-3.49,.13,s],.022,E.edge);te([-4.39,.3,-5.16],[-4.39,.3,-1.16],.022,E.edge);for(const s of[-4.7,-1.58]){q(.96,.73,.83,-4,.49,s,E.dark);for(let o=.27;o<.89;o+=.195)q(.027,.17,.78,-3.505,o,s,E.hull),te([-3.474,o+.02,s-.11],[-3.474,o+.02,s+.11],.01,E.steel),q(.015,.045,.11,-3.485,o-.035,s+.19,E.paper)}te([-3.72,.12,-2.73],[-3.72,.62,-2.73],.035,E.steel),te([-3.72,.62,-2.73],[-3.72,.69,-2.73],.21,E.rubber,.21,20);for(let s=0;s<4;s++){let o=s*Math.PI/2;te([-3.72,.2,-2.73],[-3.72+Math.cos(o)*.23,.06,-2.73+Math.sin(o)*.23],.02,E.dark)}Bt(.18,.014,-3.72,.28,-2.73,E.steel,[Math.PI/2,0,0]),q(.05,1.08,3.88,-4.64,1.93,-3.16,E.dark,[0,0,0],!1);for(let s=-4.95;s<-1.25;s+=.13)for(let o=1.5;o<2.43;o+=.13)te([-4.609,o,s],[-4.602,o,s],.015,E.black,.015,7,!1);for(const s of[-3.88,-3.66,-3.45])te([-4.58,2.08,s],[-4.48,2.08,s],.014,E.steel),te([-4.48,2.08,s],[-4.48,2.14,s],.014,E.steel),te([-4.46,2.03,s],[-4.46,1.68,s],.019,E.steel),Bt(.055,.012,-4.46,2.04,s,E.steel,[0,Math.PI/2,0]),q(.035,.07,.082,-4.46,1.65,s,E.steel);Zc(-4.54,2.14,-4.62,.17),xt("DRY / 1.01 bar",.38,.08,-4.49,1.87,-4.62,{rot:[0,Math.PI/2,0],bg:"#233c3d",size:40});for(const s of[1.61,2.52]){q(.46,.052,1.32,-4.4,s,-1.9,E.edge,[0,0,0],!1);for(const o of[-2.41,-1.38])q(.055,.35,.04,-4.585,s-.17,o,E.steel,[0,0,0],!1),te([-4.58,s-.28,o],[-4.18,s-.036,o],.015,E.steel)}q(.31,.23,.55,-4.37,2.665,-1.66,E.teal),q(.33,.026,.58,-4.37,2.795,-1.66,E.dark);for(const s of[-1.84,-1.49])q(.025,.095,.04,-4.197,2.73,s,E.bronze);xt("TRANSECT 07",.4,.08,-4.184,2.68,-1.66,{rot:[0,Math.PI/2,0],bg:"#355e5a",size:35});for(let s=-2.45;s<-2.08;s+=.072)Yc(-4.39,2.715,s,.3,.33,.055,Ft()>.5?E.book:E.redBook,Math.PI/2);for(let s=-2.27;s<-1.44;s+=.27)te([-4.39,1.65,s],[-4.39,1.85,s],.062,E.ceramic,.05,14),te([-4.39,1.85,s],[-4.39,1.9,s],.054,E.rubber,.054,14);co(-4,.99,-4.98,.1,.31,"07-C"),co(-3.87,.99,-4.68,.08,.26,"07-B"),co(-4.07,.99,-4.41,.085,.29,"06-A"),q(.43,.035,.64,-3.81,.994,-3.98,E.steel),q(.37,.007,.58,-3.81,1.016,-3.98,E.rubber);for(const s of[-4.017,-3.602])q(.018,.055,.64,s,1.032,-3.98,E.steel);for(const s of[-4.29,-3.67])q(.43,.055,.018,-3.81,1.032,s,E.steel);Jc(-3.84,1.026,-4.03,.7,E.specimen),Yt(.065,-3.79,1.05,-3.82,E.paper,[1,.45,.75]);for(let s=0;s<7;s++){const o=-1.2+s*.4;te([-3.8,1.075,-3.84],[-3.8+Math.sin(o)*.056,1.075,-3.84+Math.cos(o)*.06],.004,E.specimen,void 0,5)}xt("T07 / 176 m",.3,.07,-3.58,1.04,-4,{rot:[0,Math.PI/2,0],bg:"#bfc8b6",color:"#234541",size:38}),q(.28,.046,.36,-3.95,1.006,-3.19,E.black),te([-4.01,1.03,-3.26],[-4.01,1.24,-3.26],.047,E.steel),te([-4.01,1.24,-3.26],[-3.93,1.47,-3.26],.043,E.ceramic),te([-3.93,1.47,-3.26],[-3.8,1.48,-3.22],.043,E.ceramic),q(.26,.022,.23,-3.91,1.23,-3.13,E.black),q(.07,.009,.13,-3.86,1.248,-3.11,E.blueCeramic),te([-3.81,1.44,-3.22],[-3.81,1.29,-3.16],.027,E.steel,.018);for(const s of[-3.25,-3.17])te([-3.84,1.49,s],[-3.87,1.61,s],.03,E.black),te([-3.87,1.61,s],[-3.9,1.66,s],.026,E.rubber);te([-4.02,1.27,-3.33],[-4.02,1.27,-3.2],.051,E.black,.051,16),te([-3.93,1.037,-3.13],[-3.93,1.055,-3.13],.041,E.cool,.041,16,!1),mr(-3.94,1.006,-2.29,.43,.58,E.book,-.04);const e=Gi(512,(s,o)=>{s.fillStyle="#d6cfb4",s.fillRect(0,0,o,o),s.fillStyle="#384e4e",s.font="25px monospace",s.fillText("STATION 07 / 176 m",35,54),s.font="18px monospace",["sal. 35.1   temp. 7.6","03.10 / north transect","Caryophyllia sp.","substrate: basalt","sample C / preserve"].forEach((a,c)=>s.fillText(a,35,108+c*46)),s.strokeStyle="#6c826b",s.lineWidth=3,s.beginPath(),s.moveTo(280,450),s.bezierCurveTo(190,370,350,310,290,270),s.stroke();for(let a=0;a<5;a++)s.beginPath(),s.moveTo(280,390-a*20),s.lineTo(240+a%2*85,370-a*25),s.stroke();s.strokeStyle="#817e6333",s.lineWidth=1;for(let a=78;a<o;a+=23)s.beginPath(),s.moveTo(20,a),s.lineTo(490,a),s.stroke()}),t=new st(new Ln(.4,.54),new tn({map:e,roughness:1}));t.rotation.set(-Math.PI/2,0,-.04),t.position.set(-3.94,1.032,-2.29),St.add(t),te([-3.59,.999,-2.58],[-3.59,.999,-2.03],.009,E.bronze,void 0,6),te([-3.59,.999,-2.58],[-3.59,.999,-2.63],.009,E.black,0,6),te([-4.11,1,-1.87],[-3.72,1,-1.87],.012,E.steel),q(.033,.03,.14,-4.06,1.01,-1.92,E.steel),q(.033,.03,.1,-3.86,1.01,-1.915,E.steel),q(.14,.035,.2,-4.13,1.01,-1.36,E.olive,[0,.16,0]),q(.14,.035,.2,-4.06,1.045,-1.37,E.olive,[0,-.1,0]),te([-4.29,.99,-2.74],[-4.29,1.37,-2.74],.018,E.dark),te([-4.29,1.37,-2.74],[-3.99,1.65,-2.74],.018,E.dark),te([-3.99,1.65,-2.74],[-3.75,1.61,-2.74],.018,E.dark);for(const[s,o]of[[-4.29,1.37],[-3.99,1.65]])Yt(.038,s,o,-2.74,E.steel);te([-3.75,1.52,-2.74],[-3.75,1.62,-2.74],.11,E.teal,.075,18),te([-3.75,1.515,-2.74],[-3.75,1.519,-2.74],.091,E.amber,.091,18,!1),Pn("#ffdda9",5,-3.75,1.46,-2.74,3.7),q(1.72,2.05,.54,-2.2,1.12,-5.49,E.dark);for(const s of[-2.63,-1.77]){q(.81,1.97,.035,s,1.12,-5.191,E.hull),te([s+.25,.8,-5.157],[s+.25,1.18,-5.157],.012,E.steel);for(let o=0;o<6;o++)q(.47,.011,.01,s,1.7+o*.046,-5.161,E.dark);xt(s<-2?`SAMPLE BANK
C / 06–09`:`FIELD GEAR
DRY STORAGE`,.52,.2,s,1.36,-5.155,{size:38,bg:"#667f73"})}for(const s of[-2.75,-1.8])q(.63,.24,.43,s,2.285,-5.47,E.wood),q(.65,.022,.45,s,2.416,-5.47,E.dark),xt("N / ARCHIVE",.4,.075,s,2.295,-5.24,{size:38});q(.57,.63,.61,-.84,.37,-1.65,E.teal),q(.61,.04,.64,-.84,.715,-1.65,E.steel);for(let s=.23;s<.7;s+=.19)q(.52,.16,.02,-.84,s,-1.322,E.hull),te([-.94,s,-1.295],[-.74,s,-1.295],.009,E.steel);for(const s of[-1.02,-.67])for(const o of[-1.84,-1.47])Yt(.05,s,.06,o,E.rubber,[1,.5,1]);q(.08,.26,.05,-4.2,1.19,-5.08,E.dark),q(.04,.42,.55,-4.16,1.44,-5,E.dark);const n=Gi(512,(s,o)=>{s.fillStyle="#172f36",s.fillRect(0,0,o,o),s.strokeStyle="#64b2a1",s.lineWidth=3,s.beginPath();for(let a=0;a<400;a++){let c=270+Math.sin(a*.026)*32+Math.sin(a*.16)*5;a?s.lineTo(a+55,c):s.moveTo(a+55,c)}s.stroke(),s.fillStyle="#9acbb9",s.font="28px monospace",s.fillText("BENTHIC / STATION 07",35,60),s.font="24px monospace",s.fillText("DEPTH     176.2 m",35,118),s.fillText("TEMP        7.6 C",35,156),s.fillText("SALINITY   35.1",35,194),s.fillStyle="#657f7b",s.font="19px monospace",s.fillText("LAST LOG / 18:40",35,420),s.fillText("TRANSECT COMPLETE",35,458)}),r=new st(new Ln(.48,.35),new ui({map:n}));r.rotation.y=Math.PI/2,r.position.set(-4.133,1.445,-5),St.add(r),xt(`02
MARINE RESEARCH`,1.3,.42,-2.4,2.77,-5.864,{bg:"#315354",size:41}),xt(`SAMPLES / 07
No wet equipment beyond this point.`,1.22,.26,.267,1.7,-1.43,{rot:[0,-Math.PI/2,0],bg:"#738f85",color:"#213b3b",size:31}),te([-4.4,2.7,-5.71],[-.3,2.7,-5.71],.047,E.bronze);for(const s of[-3.7,-1.1])te([s,2.7,-5.71],[s,2.7,-5.5],.028,E.steel);Bt(.12,.015,-.65,2.7,-5.6,E.redBook),te([-.65,2.58,-5.6],[-.65,2.82,-5.6],.009,E.redBook),te([-.77,2.7,-5.6],[-.53,2.7,-5.6],.009,E.redBook)}gg();function _g(){const t=$e("#587b7d",.42,.66,"metal");q(.29,3.16,.8,.55,1.58,-5.9,E.teal,[0,0,0],!1),q(.27,3.16,.8,4.585,1.58,-5.9,E.teal,[0,0,0],!1),q(3.98,.29,.8,2.58,.145,-5.9,E.teal,[0,0,0],!1),q(3.98,.25,.8,2.58,3.035,-5.9,E.teal,[0,0,0],!1),un(3.76,2.63,.45,3.1,1.96,.285,.76,2.58,1.62,-5.9,t),un(3.95,2.76,.47,3.26,2.12,.33,.13,2.58,1.62,-5.435,E.hull),un(3.29,2.15,.33,3.1,1.96,.285,.047,2.58,1.62,-5.347,E.rubber),un(3.33,2.19,.34,3.285,2.145,.327,.036,2.58,1.62,-5.313,E.steel),un(3.16,2.02,.3,3.055,1.915,.264,.08,2.58,1.62,-6.165,E.rubber),un(3.18,2.04,.31,3.065,1.925,.266,.039,2.58,1.62,-6.11,E.steel);const n=new st(new Ra(Tr(3.065,1.925,.266),18),E.glass);n.position.set(2.58,1.62,-6.155),n.renderOrder=3,St.add(n),un(3.065,1.925,.266,3.035,1.895,.25,.11,2.58,1.62,-6.21,E.jarGlass),Tr(3.59,2.4,.37).getSpacedPoints(44).slice(0,-1).forEach(l=>Qt(2.58+l.x,1.62+l.y,-5.352,"z",.034));for(const l of[.67,4.49]){q(.23,3.08,.34,l,1.56,-5.23,E.dark,[0,0,0],!1),q(.09,2.9,.37,l,1.56,-5.2,E.edge,[0,0,0],!1),q(.43,.1,.8,l,.08,-5.03,E.steel,[0,0,0],!1),q(.43,.08,.62,l,3.07,-5.16,E.steel,[0,0,0],!1),te([l,.13,-4.53],[l,1.23,-5.16],.065,E.edge,.065,4,!1);const h=new Ss;h.moveTo(0,0),h.lineTo(.63,0),h.lineTo(.63,1.02),h.closePath(),nn(new wr(h,{depth:.105,bevelEnabled:!1}),E.teal,[l-.0525,.15,-4.53],[0,Math.PI/2,0],[1,1,1],!1);for(const[f,p]of[[.29,-4.76],[.29,-5.01],[.68,-5.03]])Qt(l-.068,f,p,"x",.023),Qt(l+.068,f,p,"x",.023);for(const f of[-.14,.14])for(const p of[-5.29,-4.73])Qt(l+f,.144,p,"y",.026);for(let f=.44;f<3;f+=.44)Qt(l,f,-5.012,"z",.026)}q(3.12,.085,.43,2.58,.596,-5.24,E.steel,[0,0,0],!1);for(const l of[1.06,4.1])te([l,.69,-5.07],[l,1.16,-5.07],.022,E.steel),te([l,.71,-5.07],[l,.71,-5.37],.022,E.steel),te([l,1.14,-5.07],[l,1.14,-5.37],.022,E.steel),te([l,.83,-5.07],[l,1.04,-5.07],.03,E.rubber);xt(`VIEWPORT / V-03
PRESSURE GLAZING · 110 mm
SLEEVE / 760 mm`,.8,.2,2.58,.4,-5.477,{bg:"#304b50",size:34}),xt("KEEP SEALS CLEAR",.8,.11,2.58,2.85,-5.354,{bg:"#91aaa0",color:"#264a4c",size:42});const o=new ui({color:"#bad6c9",transparent:!0,opacity:.045,depthWrite:!1,side:qt}),a=new Et;a.setAttribute("position",new nt([1.31,2.35,-6.146,1.48,2.35,-6.146,1.15,1.96,-6.146,1.31,2.35,-6.146,1.15,1.96,-6.146,1.08,1.96,-6.146],3));const c=new st(a,o);c.renderOrder=4,St.add(c),q(2.4,.028,.025,2.58,2.615,-5.94,E.cool,[0,0,0],!1),Pn("#7dbece",3,2.58,2.56,-5.87,4),Pn("#5296b4",18,2.7,2,-7.35,11),Di(4.15,-1.62,1.1,1.6);for(const l of[-2.07,-1.18])for(const h of[3.91,4.39])ur(h,l,.36);q(.67,.11,1.15,4.15,.46,-1.62,E.oak),Tt(.68,.12,1.13,.05,4.15,.58,-1.62,E.olive),q(.045,.18,.43,3.8,.51,-1.3,E.cream),q(.65,.03,.43,4.12,.67,-1.3,E.cream),mr(4.16,.676,-1.93,.27,.31,E.book,.14),te([4.6,1.63,-1.76],[4.36,1.79,-1.76],.013,E.bronze),ra(4.34,1.86,-1.76,.12),Pn("#eac397",2.4,4.32,1.8,-1.76,3),fr(4.653,2.07,-3.42,.66,.91,-Math.PI/2,"botanical"),xt(`03 / OBSERVATION
NORTH REEF · 176 m`,.97,.22,2.48,2.77,-.332,{rot:[0,Math.PI,0],bg:"#355859",size:36});for(const l of[3.47,3.59])te([l,.685,-5.09],[l,.69,-5.33],.045,E.black,.052,14);q(.16,.028,.11,3.53,.7,-5.17,E.dark),q(.05,.64,.39,4.637,1.43,-4.73,E.dark,[0,0,0],!1),Zc(4.585,1.55,-4.73,.117,"-x"),xt(`EXTERNAL
18.6 bar`,.27,.14,4.57,1.29,-4.73,{rot:[0,-Math.PI/2,0],bg:"#29494b",size:35});for(let l=-4.58;l<-2.4;l+=.65){q(.026,1.52,.59,4.67,1.72,l,E.hull,[0,0,0],!1);for(const h of[1.04,2.4])for(const f of[-.23,.23])Qt(4.64,h,l+f,"x",.017)}}_g();const Cr=[];function Zl(i,e,t,n,r,s){const o=new wa(1,1),a=o.attributes.position;for(let c=0;c<a.count;c++){const l=new L().fromBufferAttribute(a,c),h=1+.1*Math.sin(l.x*14+l.z*11)+.09*Math.cos(l.y*13);l.multiplyScalar(h),a.setXYZ(c,l.x,l.y,l.z)}o.computeVertexNormals(),nn(o,E.reef,[i,e,t],[Qe(-.4,.4),Qe(0,Math.PI),Qe(-.2,.2)],[n,r,s],!1)}function or(i,e,t,n=1,r=E.coral){const s=[i,e,t],o=[i+.07*n,e+.95*n,t+.1*n];te(s,o,.07*n,r,.035*n,7,!1);for(let a=0;a<7;a++){const c=.23+a*.1,l=a%2?1:-1,h=[i+.07*n*c,e+.95*n*c,t+.1*n*c],f=[h[0]+l*.33*n,h[1]+.36*n,h[2]+Math.sin(a)*.13*n];te(h,f,.031*n,r,.015*n,6,!1);for(const p of[-1,1])te(f,[f[0]+p*.13*n,f[1]+.22*n,f[2]+p*.1*n],.013*n,r,.005*n,6,!1)}}function Kl(i,e,t,n=1){te([i,e,t],[i,e+.32*n,t],.035*n,E.coralPurple,.022*n,7,!1);for(let r=-5;r<=5;r++){let s=r*.16;const o=[];for(let a=0;a<5;a++){const c=a/4;o.push([i+Math.sin(s)*c*n,e+.22*n+Math.cos(s)*c*n,t+Math.sin(c*3+r)*.04*n])}for(let a=0;a<4;a++)te(o[a],o[a+1],.013*n,E.coralPurple,.01*n,5,!1);for(let a=1;a<4;a++)for(const c of[-1,1]){const l=o[a];te(l,[l[0]+c*.13*n,l[1]+.13*n,l[2]],.006*n,E.coralPurple,.003*n,5,!1)}}}function vg(i,e,t,n){const r=[];for(let s=0;s<7;s++)r.push(new L(i+Math.sin(s*.64)*.13,e+s/6*n,t+Math.cos(s*.7)*.07));nn(new Pa(new Ac(r),16,.014,5,!1),E.kelp,[0,0,0],[0,0,0],[1,1,1],!1);for(let s=1;s<6;s++){const o=r[s],a=s%2?1:-1,c=new Ji(1,8,4);nn(c,E.kelp,[o.x+a*.12,o.y+.1,o.z],[0,.4,a*.4],[.07,.27,.009],!1)}}function ho(i,e,t,n,r){Cr.push({x:i,y:e,z:t,s:n,phase:r,turn:Math.floor(r*2)%2?Math.PI:0})}function xg(){q(21,.18,17,1,-1.3,-14.4,E.reef,[0,0,0],!1),[[-2.4,-.55,-10.1,2,.85,1.3],[.2,-.4,-11.6,1.8,1.1,1.4],[4.6,-.2,-10.65,1.7,1.3,1.4],[7.1,-.4,-12,2.4,1.45,1.7],[2.8,-.85,-9.8,1.3,.58,.85],[-3.6,.8,-14.2,2.1,2.4,1.3],[5.4,.4,-15.2,2.6,2,1.8],[1.5,-.6,-17.2,3.3,1.15,1.8]].forEach(r=>Zl(...r));for(let r=0;r<25;r++)Zl(Qe(-3,8),Qe(-1.15,-.95),Qe(-9.2,-17),Qe(.13,.46),Qe(.08,.22),Qe(.12,.35));or(-.1,.3,-11.4,1,E.coral),or(4.51,.8,-10.75,.7,E.coralPurple),or(6.4,.1,-12,.9,E.coral),or(1.7,-.45,-9.9,.45,E.specimen),or(5.7,.3,-14.6,1.1,E.coralPurple),Kl(.2,.52,-11,.9),Kl(4.97,.57,-10.22,.68);for(let r=0;r<13;r++)vg(Qe(-2.5,7.3),-.9,Qe(-11.5,-16.2),Qe(1.1,2.5));for(let r=0;r<22;r++){const s=r*2.399,o=4.25+Math.sin(s)*.7,a=-10.15+Math.cos(s)*.43,c=.47+Ft()*.27;Yt(.022,o,c,a,E.life,[1,.8,1],6)}for(let r=0;r<8;r++)ho(.8+r*.42,1.25+Math.sin(r)*.31,-12+Math.cos(r)*.8,Qe(.65,1),r*.81);ho(5.7,2.5,-15.4,1.3,2.7),ho(-.5,2.14,-14.4,.9,4.8);const i=[];for(let r=0;r<170;r++)i.push(Qe(-5,10),Qe(-.7,6),Qe(-7.5,-20));const e=new Et;e.setAttribute("position",new nt(i,3));const t=new wu(e,new yc({color:"#5b7e83",size:.012,transparent:!0,opacity:.37,depthWrite:!1,sizeAttenuation:!0}));St.add(t);const n=new gf("#6b9aa9",.43);n.position.set(-3,8,-12),n.target.position.set(2,0,-11),St.add(n,n.target)}xg();const Kc=new Ji(1,10,6).scale(.23,.085,.065).toNonIndexed(),$c=new Ea(.045,.13,3).translate(-.025,.09,0).toNonIndexed(),sa=new xs(Gc([Kc,$c]),$e("#405e64",.86,.15),Cr.length);Kc.dispose();$c.dispose();const Ua=new Et;Ua.setAttribute("position",new nt([-.18,0,0,-.35,.1,0,-.35,-.1,0],3));Ua.computeVertexNormals();const oa=new xs(Ua,new tn({color:"#345059",side:qt,roughness:1}),Cr.length),aa=new xs(new Ji(.012,5,4),E.black,Cr.length*2);for(const i of[sa,oa,aa])i.instanceMatrix.setUsage(Jh),i.frustumCulled=!1,St.add(i);const An=new pt,ar=new pt;function jc(i){Cr.forEach((e,t)=>{const n=i*.22+e.phase;An.position.set(e.x+Math.sin(n)*.28,e.y+Math.sin(n*1.6)*.055,e.z+Math.cos(n*.6)*.07),An.scale.setScalar(e.s),An.rotation.set(0,e.turn,0),An.updateMatrix(),sa.setMatrixAt(t,An.matrix);for(const r of[-1,1])ar.position.set(.15,.018,.058*r),ar.rotation.set(0,0,0),ar.scale.set(1,1,1),ar.updateMatrix(),aa.setMatrixAt(t*2+(r+1)/2,An.matrix.clone().multiply(ar.matrix));An.rotation.y+=Math.sin(i*1.5+e.phase)*.12,An.updateMatrix(),oa.setMatrixAt(t,An.matrix)}),sa.instanceMatrix.needsUpdate=oa.instanceMatrix.needsUpdate=aa.instanceMatrix.needsUpdate=!0}jc(0);function Mg(){q(.56,.22,6.4,1.06,3.005,3.8,E.hull,[0,0,0],!1);for(let i=.75;i<7;i+=1.27){q(.585,.015,.025,1.06,2.887,i,E.dark,[0,0,0],!1);for(const e of[.82,1.3])Qt(e,2.882,i,"y",.017)}for(const i of[1.45,5.4]){q(.43,.009,.63,1.06,2.88,i,E.dark,[0,0,0],!1);for(let e=0;e<13;e++)q(.44,.012,.019,1.06,2.87,i-.28+e*.045,E.edge,[0,0,0],!1)}te([-.6,2.92,3.5],[-.6,3.11,3.5],.4,E.dark,.4,32,!1),te([-.6,2.906,3.5],[-.6,2.912,3.5],.35,E.amber,.35,32,!1),Bt(.385,.016,-.6,2.913,3.5,E.bronze,[Math.PI/2,0,0]);for(const[i,e]of[[-2.15,-3.23],[2.58,-2.45],[0,6.43]]){q(.83,.075,.42,i,3.068,e,E.dark,[0,0,0],!1),q(.73,.016,.34,i,3.021,e,i<0?E.amber:E.cool,[0,0,0],!1);for(const t of[-.39,.39])for(const n of[-.17,.17])Qt(i+t,3.01,e+n,"y",.014)}for(const i of[-4.85,-1.11])q(9.36,.16,.14,0,3.065,i,E.dark,[0,0,0],!1);for(const[i,e]of[[-2.6,.32],[2.5,.32],[.65,-3.45]])q(.2,.012,.045,i,.04,e,E.cool,[0,0,0],!1)}Mg();St.add(new uf("#bbd3cc","#283c42",.91));St.add(new _f("#b3c4b5",.15));Pn("#ffe0b0",21,-2.05,2.8,-3.1,7);Pn("#d2e3d5",10,2.6,2.82,-2.55,6.8);Pn("#ffe3bb",6.5,0,2.8,6.5,5);const Nt=new df("#ffdda5",82,11,1.17,.65,2);Nt.position.set(-.6,2.87,3.5);Nt.target.position.set(-.6,0,3.5);Nt.castShadow=!0;Nt.shadow.mapSize.set(1024,1024);Nt.shadow.bias=-25e-5;Nt.shadow.normalBias=.025;Nt.shadow.camera.near=.15;Nt.shadow.camera.far=11;St.add(Nt,Nt.target);let Sg=0;for(const i of _s.values()){const e=Gc(i.geometries,!1);if(!e)throw new Error("A static geometry batch could not be merged.");e.computeBoundingSphere(),e.computeBoundingBox();const t=new st(e,i.material);t.castShadow=i.cast,t.receiveShadow=!0,St.add(t),Sg+=e.attributes.position.count/3,i.geometries.forEach(n=>n.dispose())}_s.clear();const Dt=new Set,fn=new ue(Fi.x,Fi.z);let Hn=Fi.yaw,br=-.035,In=!1,Vn=0,Gn=0,la=0,Qc=!1;function Es(){fn.set(Fi.x,Fi.z),Hn=Fi.yaw,br=-.035,Vn=Gn=0,la=0,qn.position.set(fn.x,Wc,fn.y),qn.rotation.set(br,Hn,0)}Es();function eh(){Dt.clear(),Vn=Gn=0,Ze("welcome").hidden=!1,Ze("crosshair").style.display="none",Ze("enter").textContent=Qc?"Resume exploration ↗":"Enter the apartment ↗"}Ze("enter").disabled=!1;Ze("enter").addEventListener("click",()=>{try{Mt.domElement.requestPointerLock()?.catch(e=>{Ze("status").textContent="Mouse capture was declined. Click Enter again to retry."})}catch{Ze("status").textContent="This browser does not support mouse capture. Use a desktop browser."}});document.addEventListener("pointerlockchange",()=>{In=document.pointerLockElement===Mt.domElement,In?(Qc=!0,Ze("welcome").hidden=!0,Ze("crosshair").style.display="block",zn.length=0):eh()});document.addEventListener("pointerlockerror",()=>{Ze("status").textContent="Click Enter to allow mouse capture. A desktop browser is required."});document.addEventListener("mousemove",i=>{In&&(Hn-=i.movementX*.002,br=Math.max(-1.45,Math.min(1.45,br-i.movementY*.002)))});document.addEventListener("keydown",i=>{i.target instanceof HTMLInputElement||i.target instanceof HTMLSelectElement||(i.code==="KeyR"&&(Es(),i.preventDefault()),In&&(i.code==="KeyF"&&(Ze("stats-toggle").checked=!Ze("stats-toggle").checked,Ze("stats").hidden=!Ze("stats-toggle").checked),["KeyW","KeyA","KeyS","KeyD","ArrowUp","ArrowDown","ArrowLeft","ArrowRight","ShiftLeft","ShiftRight","Space"].includes(i.code)&&i.preventDefault(),Dt.add(i.code)))});document.addEventListener("keyup",i=>Dt.delete(i.code));window.addEventListener("blur",()=>{Dt.clear(),Vn=Gn=0,In&&document.exitPointerLock()});document.addEventListener("visibilitychange",()=>{document.hidden&&(Dt.clear(),Vn=Gn=0,In&&document.exitPointerLock())});Ze("reset").addEventListener("click",Es);Ze("pause-reset").addEventListener("click",()=>{Es(),Ze("status").textContent="Reset to the entrance · Click Enter to capture the mouse"});Ze("settings").addEventListener("click",()=>{In?document.exitPointerLock():eh()});Ze("stats-toggle").addEventListener("change",()=>{Ze("stats").hidden=!Ze("stats-toggle").checked});function th(i){const e=i==="high",t=i==="low",n=e?6e6:t?15e5:3e6;Mt.setPixelRatio(Math.min(devicePixelRatio,e?2:t?1:1.5,Math.sqrt(n/(innerWidth*innerHeight)))),Mt.shadowMap.enabled=!t,Nt.shadow.mapSize.set(e?2048:1024,e?2048:1024),Nt.shadow.map&&(Nt.shadow.map.dispose(),Nt.shadow.map=null),Nt.shadow.needsUpdate=!0}Ze("quality").addEventListener("change",i=>th(i.target.value));window.addEventListener("resize",()=>{qn.aspect=innerWidth/innerHeight,qn.updateProjectionMatrix(),Mt.setSize(innerWidth,innerHeight),th(Ze("quality").value)});Mt.domElement.addEventListener("webglcontextlost",i=>{i.preventDefault(),Ze("error").hidden=!1,Ze("error").textContent="The graphics context was interrupted. Waiting for browser recovery…",In&&document.exitPointerLock()});Mt.domElement.addEventListener("webglcontextrestored",()=>{Ze("error").hidden=!0});Mt.domElement.addEventListener("contextmenu",i=>i.preventDefault());let ca=performance.now(),$l=0,jl=ca;const zn=[];function nh(i){const e=i-ca,t=Math.min(e/1e3,.05);if(ca=i,$l+=t,In){const n=(Dt.has("KeyW")||Dt.has("ArrowUp")?1:0)-(Dt.has("KeyS")||Dt.has("ArrowDown")?1:0),r=(Dt.has("KeyD")||Dt.has("ArrowRight")?1:0)-(Dt.has("KeyA")||Dt.has("ArrowLeft")?1:0),s=Math.hypot(n,r)||1,o=Dt.has("ShiftLeft")||Dt.has("ShiftRight")?2.65:1.7,a=(-Math.sin(Hn)*n+Math.cos(Hn)*r)/s*o,c=(-Math.cos(Hn)*n-Math.sin(Hn)*r)/s*o,l=1-Math.exp(-14*t);Vn+=(a-Vn)*l,Gn+=(c-Gn)*l;const h={x:fn.x,z:fn.y};sg(h,Vn*t,Gn*t),fn.set(h.x,h.z),(n||r)&&(la+=t*8),qn.position.set(fn.x,Wc+(Ze("bob").checked?Math.sin(la)*.009*Math.min(1,Math.hypot(Vn,Gn)):0),fn.y),qn.rotation.set(br,Hn,0),Ze("room-label").textContent=og(fn.x,fn.y),e<250&&(zn.push(e),zn.length>240&&zn.shift())}if(jc($l),Mt.render(St,qn),!Ze("stats").hidden&&i-jl>1e3){jl=i;const n=[...zn].sort((o,a)=>o-a),r=zn.reduce((o,a)=>o+a,0)/(zn.length||1),s=n[Math.floor(n.length*.95)]||0;Ze("stats").textContent=`FRAME INTERVAL / live
mean ${r.toFixed(1)} ms · p95 ${s.toFixed(1)} ms
${zn.length} recent frames
${Mt.info.render.calls} draw calls · ${Math.round(Mt.info.render.triangles/1e3)}k triangles
${Ze("quality").value} · F to toggle`}requestAnimationFrame(nh)}Ze("status").textContent="Ready · Local procedural assets · Desktop keyboard & mouse";requestAnimationFrame(nh);

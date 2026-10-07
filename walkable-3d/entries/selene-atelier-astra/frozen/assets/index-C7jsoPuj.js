(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=e(r);fetch(r.href,s)}})();/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Ro="180",rc=0,ea=1,sc=2,hl=1,ul=2,xn=3,yn=0,De=1,sn=2,Pn=0,vi=1,Ns=2,na=3,ia=4,oc=5,qn=100,ac=101,lc=102,cc=103,hc=104,uc=200,fc=201,dc=202,pc=203,Fs=204,Os=205,mc=206,gc=207,_c=208,vc=209,xc=210,Mc=211,Sc=212,yc=213,Ec=214,Bs=0,zs=1,ks=2,Mi=3,Hs=4,Gs=5,Vs=6,Ws=7,Co=0,Tc=1,bc=2,Ln=0,Ac=1,wc=2,Rc=3,fl=4,Cc=5,Pc=6,Lc=7,dl=300,Si=301,yi=302,Xs=303,qs=304,Wr=306,Or=1e3,Kn=1001,Ys=1002,Ve=1003,Ic=1004,rr=1005,an=1006,Zr=1007,Jn=1008,un=1009,pl=1010,ml=1011,Wi=1012,Po=1013,Zn=1014,ln=1015,ji=1016,Lo=1017,Io=1018,Xi=1020,gl=35902,_l=35899,vl=1021,xl=1022,tn=1023,qi=1026,Yi=1027,Do=1028,Uo=1029,Ml=1030,No=1031,Fo=1033,Lr=33776,Ir=33777,Dr=33778,Ur=33779,Ks=35840,Js=35841,Zs=35842,$s=35843,js=36196,Qs=37492,to=37496,eo=37808,no=37809,io=37810,ro=37811,so=37812,oo=37813,ao=37814,lo=37815,co=37816,ho=37817,uo=37818,fo=37819,po=37820,mo=37821,go=36492,_o=36494,vo=36495,xo=36283,Mo=36284,So=36285,yo=36286,Dc=3200,Uc=3201,Oo=0,Nc=1,Cn="",Ie="srgb",Ei="srgb-linear",Br="linear",ie="srgb",ei=7680,ra=519,Fc=512,Oc=513,Bc=514,Sl=515,zc=516,kc=517,Hc=518,Gc=519,sa=35044,oa="300 es",cn=2e3,zr=2001;class Ai{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const r=n[t];if(r!==void 0){const s=r.indexOf(e);s!==-1&&r.splice(s,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const r=n.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,t);t.target=null}}}const Te=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],$r=Math.PI/180,Eo=180/Math.PI;function wi(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Te[i&255]+Te[i>>8&255]+Te[i>>16&255]+Te[i>>24&255]+"-"+Te[t&255]+Te[t>>8&255]+"-"+Te[t>>16&15|64]+Te[t>>24&255]+"-"+Te[e&63|128]+Te[e>>8&255]+"-"+Te[e>>16&255]+Te[e>>24&255]+Te[n&255]+Te[n>>8&255]+Te[n>>16&255]+Te[n>>24&255]).toLowerCase()}function Yt(i,t,e){return Math.max(t,Math.min(e,i))}function Vc(i,t){return(i%t+t)%t}function jr(i,t,e){return(1-e)*i+e*t}function Li(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Ne(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}class at{constructor(t=0,e=0){at.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6],this.y=r[1]*e+r[4]*n+r[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Yt(this.x,t.x,e.x),this.y=Yt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Yt(this.x,t,e),this.y=Yt(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Yt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Yt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),r=Math.sin(e),s=this.x-t.x,o=this.y-t.y;return this.x=s*n-o*r+t.x,this.y=s*r+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Qi{constructor(t=0,e=0,n=0,r=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=r}static slerpFlat(t,e,n,r,s,o,a){let c=n[r+0],l=n[r+1],h=n[r+2],f=n[r+3];const m=s[o+0],p=s[o+1],g=s[o+2],x=s[o+3];if(a===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=f;return}if(a===1){t[e+0]=m,t[e+1]=p,t[e+2]=g,t[e+3]=x;return}if(f!==x||c!==m||l!==p||h!==g){let d=1-a;const u=c*m+l*p+h*g+f*x,S=u>=0?1:-1,y=1-u*u;if(y>Number.EPSILON){const R=Math.sqrt(y),C=Math.atan2(R,u*S);d=Math.sin(d*C)/R,a=Math.sin(a*C)/R}const _=a*S;if(c=c*d+m*_,l=l*d+p*_,h=h*d+g*_,f=f*d+x*_,d===1-a){const R=1/Math.sqrt(c*c+l*l+h*h+f*f);c*=R,l*=R,h*=R,f*=R}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=f}static multiplyQuaternionsFlat(t,e,n,r,s,o){const a=n[r],c=n[r+1],l=n[r+2],h=n[r+3],f=s[o],m=s[o+1],p=s[o+2],g=s[o+3];return t[e]=a*g+h*f+c*p-l*m,t[e+1]=c*g+h*m+l*f-a*p,t[e+2]=l*g+h*p+a*m-c*f,t[e+3]=h*g-a*f-c*m-l*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,r){return this._x=t,this._y=e,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,r=t._y,s=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(r/2),f=a(s/2),m=c(n/2),p=c(r/2),g=c(s/2);switch(o){case"XYZ":this._x=m*h*f+l*p*g,this._y=l*p*f-m*h*g,this._z=l*h*g+m*p*f,this._w=l*h*f-m*p*g;break;case"YXZ":this._x=m*h*f+l*p*g,this._y=l*p*f-m*h*g,this._z=l*h*g-m*p*f,this._w=l*h*f+m*p*g;break;case"ZXY":this._x=m*h*f-l*p*g,this._y=l*p*f+m*h*g,this._z=l*h*g+m*p*f,this._w=l*h*f-m*p*g;break;case"ZYX":this._x=m*h*f-l*p*g,this._y=l*p*f+m*h*g,this._z=l*h*g-m*p*f,this._w=l*h*f+m*p*g;break;case"YZX":this._x=m*h*f+l*p*g,this._y=l*p*f+m*h*g,this._z=l*h*g-m*p*f,this._w=l*h*f-m*p*g;break;case"XZY":this._x=m*h*f-l*p*g,this._y=l*p*f-m*h*g,this._z=l*h*g+m*p*f,this._w=l*h*f+m*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,r=Math.sin(n);return this._x=t.x*r,this._y=t.y*r,this._z=t.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],r=e[4],s=e[8],o=e[1],a=e[5],c=e[9],l=e[2],h=e[6],f=e[10],m=n+a+f;if(m>0){const p=.5/Math.sqrt(m+1);this._w=.25/p,this._x=(h-c)*p,this._y=(s-l)*p,this._z=(o-r)*p}else if(n>a&&n>f){const p=2*Math.sqrt(1+n-a-f);this._w=(h-c)/p,this._x=.25*p,this._y=(r+o)/p,this._z=(s+l)/p}else if(a>f){const p=2*Math.sqrt(1+a-n-f);this._w=(s-l)/p,this._x=(r+o)/p,this._y=.25*p,this._z=(c+h)/p}else{const p=2*Math.sqrt(1+f-n-a);this._w=(o-r)/p,this._x=(s+l)/p,this._y=(c+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Yt(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const r=Math.min(1,e/n);return this.slerp(t,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,r=t._y,s=t._z,o=t._w,a=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+o*a+r*l-s*c,this._y=r*h+o*c+s*a-n*l,this._z=s*h+o*l+n*c-r*a,this._w=o*h-n*a-r*c-s*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,r=this._y,s=this._z,o=this._w;let a=o*t._w+n*t._x+r*t._y+s*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=r,this._z=s,this;const c=1-a*a;if(c<=Number.EPSILON){const p=1-e;return this._w=p*o+e*this._w,this._x=p*n+e*this._x,this._y=p*r+e*this._y,this._z=p*s+e*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,a),f=Math.sin((1-e)*h)/l,m=Math.sin(e*h)/l;return this._w=o*f+this._w*m,this._x=n*f+this._x*m,this._y=r*f+this._y*m,this._z=s*f+this._z*m,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(t),r*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class D{constructor(t=0,e=0,n=0){D.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(aa.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(aa.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6]*r,this.y=s[1]*e+s[4]*n+s[7]*r,this.z=s[2]*e+s[5]*n+s[8]*r,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,r=this.z,s=t.elements,o=1/(s[3]*e+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*e+s[4]*n+s[8]*r+s[12])*o,this.y=(s[1]*e+s[5]*n+s[9]*r+s[13])*o,this.z=(s[2]*e+s[6]*n+s[10]*r+s[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,r=this.z,s=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*r-a*n),h=2*(a*e-s*r),f=2*(s*n-o*e);return this.x=e+c*l+o*f-a*h,this.y=n+c*h+a*l-s*f,this.z=r+c*f+s*h-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*r,this.y=s[1]*e+s[5]*n+s[9]*r,this.z=s[2]*e+s[6]*n+s[10]*r,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Yt(this.x,t.x,e.x),this.y=Yt(this.y,t.y,e.y),this.z=Yt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Yt(this.x,t,e),this.y=Yt(this.y,t,e),this.z=Yt(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Yt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,r=t.y,s=t.z,o=e.x,a=e.y,c=e.z;return this.x=r*c-s*a,this.y=s*o-n*c,this.z=n*a-r*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Qr.copy(this).projectOnVector(t),this.sub(Qr)}reflect(t){return this.sub(Qr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Yt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,r=this.z-t.z;return e*e+n*n+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const r=Math.sin(e)*t;return this.x=r*Math.sin(n),this.y=Math.cos(e)*t,this.z=r*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),r=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=r,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Qr=new D,aa=new Qi;class Wt{constructor(t,e,n,r,s,o,a,c,l){Wt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,r,s,o,a,c,l)}set(t,e,n,r,s,o,a,c,l){const h=this.elements;return h[0]=t,h[1]=r,h[2]=a,h[3]=e,h[4]=s,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,r=e.elements,s=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],f=n[7],m=n[2],p=n[5],g=n[8],x=r[0],d=r[3],u=r[6],S=r[1],y=r[4],_=r[7],R=r[2],C=r[5],w=r[8];return s[0]=o*x+a*S+c*R,s[3]=o*d+a*y+c*C,s[6]=o*u+a*_+c*w,s[1]=l*x+h*S+f*R,s[4]=l*d+h*y+f*C,s[7]=l*u+h*_+f*w,s[2]=m*x+p*S+g*R,s[5]=m*d+p*y+g*C,s[8]=m*u+p*_+g*w,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],r=t[2],s=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8];return e*o*h-e*a*l-n*s*h+n*a*c+r*s*l-r*o*c}invert(){const t=this.elements,e=t[0],n=t[1],r=t[2],s=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],f=h*o-a*l,m=a*c-h*s,p=l*s-o*c,g=e*f+n*m+r*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/g;return t[0]=f*x,t[1]=(r*l-h*n)*x,t[2]=(a*n-r*o)*x,t[3]=m*x,t[4]=(h*e-r*c)*x,t[5]=(r*s-a*e)*x,t[6]=p*x,t[7]=(n*c-l*e)*x,t[8]=(o*e-n*s)*x,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,r,s,o,a){const c=Math.cos(s),l=Math.sin(s);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-r*l,r*c,-r*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(ts.makeScale(t,e)),this}rotate(t){return this.premultiply(ts.makeRotation(-t)),this}translate(t,e){return this.premultiply(ts.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let r=0;r<9;r++)if(e[r]!==n[r])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const ts=new Wt;function yl(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function kr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Wc(){const i=kr("canvas");return i.style.display="block",i}const la={};function Ki(i){i in la||(la[i]=!0,console.warn(i))}function Xc(i,t,e){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:n()}}setTimeout(s,e)})}const ca=new Wt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ha=new Wt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function qc(){const i={enabled:!0,workingColorSpace:Ei,spaces:{},convert:function(r,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===ie&&(r.r=Sn(r.r),r.g=Sn(r.g),r.b=Sn(r.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===ie&&(r.r=xi(r.r),r.g=xi(r.g),r.b=xi(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Cn?Br:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,o){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Ki("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Ki("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(r,s)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Ei]:{primaries:t,whitePoint:n,transfer:Br,toXYZ:ca,fromXYZ:ha,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Ie},outputColorSpaceConfig:{drawingBufferColorSpace:Ie}},[Ie]:{primaries:t,whitePoint:n,transfer:ie,toXYZ:ca,fromXYZ:ha,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Ie}}}),i}const te=qc();function Sn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function xi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let ni;class Yc{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{ni===void 0&&(ni=kr("canvas")),ni.width=t.width,ni.height=t.height;const r=ni.getContext("2d");t instanceof ImageData?r.putImageData(t,0,0):r.drawImage(t,0,0,t.width,t.height),n=ni}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=kr("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const r=n.getImageData(0,0,t.width,t.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=Sn(s[o]/255)*255;return n.putImageData(r,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Sn(e[n]/255)*255):e[n]=Sn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Kc=0;class Bo{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Kc++}),this.uuid=wi(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(es(r[o].image)):s.push(es(r[o]))}else s=es(r);n.url=s}return e||(t.images[this.uuid]=n),n}}function es(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Yc.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Jc=0;const ns=new D;class we extends Ai{constructor(t=we.DEFAULT_IMAGE,e=we.DEFAULT_MAPPING,n=Kn,r=Kn,s=an,o=Jn,a=tn,c=un,l=we.DEFAULT_ANISOTROPY,h=Cn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Jc++}),this.uuid=wi(),this.name="",this.source=new Bo(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new at(0,0),this.repeat=new at(1,1),this.center=new at(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Wt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(ns).x}get height(){return this.source.getSize(ns).y}get depth(){return this.source.getSize(ns).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const r=this[e];if(r===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==dl)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Or:t.x=t.x-Math.floor(t.x);break;case Kn:t.x=t.x<0?0:1;break;case Ys:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Or:t.y=t.y-Math.floor(t.y);break;case Kn:t.y=t.y<0?0:1;break;case Ys:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}we.DEFAULT_IMAGE=null;we.DEFAULT_MAPPING=dl;we.DEFAULT_ANISOTROPY=1;class se{constructor(t=0,e=0,n=0,r=1){se.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=r}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,r){return this.x=t,this.y=e,this.z=n,this.w=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,r=this.z,s=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*r+o[12]*s,this.y=o[1]*e+o[5]*n+o[9]*r+o[13]*s,this.z=o[2]*e+o[6]*n+o[10]*r+o[14]*s,this.w=o[3]*e+o[7]*n+o[11]*r+o[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,r,s;const c=t.elements,l=c[0],h=c[4],f=c[8],m=c[1],p=c[5],g=c[9],x=c[2],d=c[6],u=c[10];if(Math.abs(h-m)<.01&&Math.abs(f-x)<.01&&Math.abs(g-d)<.01){if(Math.abs(h+m)<.1&&Math.abs(f+x)<.1&&Math.abs(g+d)<.1&&Math.abs(l+p+u-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const y=(l+1)/2,_=(p+1)/2,R=(u+1)/2,C=(h+m)/4,w=(f+x)/4,U=(g+d)/4;return y>_&&y>R?y<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(y),r=C/n,s=w/n):_>R?_<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(_),n=C/r,s=U/r):R<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(R),n=w/s,r=U/s),this.set(n,r,s,e),this}let S=Math.sqrt((d-g)*(d-g)+(f-x)*(f-x)+(m-h)*(m-h));return Math.abs(S)<.001&&(S=1),this.x=(d-g)/S,this.y=(f-x)/S,this.z=(m-h)/S,this.w=Math.acos((l+p+u-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Yt(this.x,t.x,e.x),this.y=Yt(this.y,t.y,e.y),this.z=Yt(this.z,t.z,e.z),this.w=Yt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Yt(this.x,t,e),this.y=Yt(this.y,t,e),this.z=Yt(this.z,t,e),this.w=Yt(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Yt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Zc extends Ai{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:an,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new se(0,0,t,e),this.scissorTest=!1,this.viewport=new se(0,0,t,e);const r={width:t,height:e,depth:n.depth},s=new we(r);this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(t={}){const e={minFilter:an,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=t,this.textures[r].image.height=e,this.textures[r].image.depth=n,this.textures[r].isArrayTexture=this.textures[r].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const r=Object.assign({},t.textures[e].image);this.textures[e].source=new Bo(r)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class $n extends Zc{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class El extends we{constructor(t=null,e=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:r},this.magFilter=Ve,this.minFilter=Ve,this.wrapR=Kn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class $c extends we{constructor(t=null,e=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:r},this.magFilter=Ve,this.minFilter=Ve,this.wrapR=Kn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Qn{constructor(t=new D(1/0,1/0,1/0),e=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Je.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Je.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Je.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const s=n.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Je):Je.fromBufferAttribute(s,o),Je.applyMatrix4(t.matrixWorld),this.expandByPoint(Je);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),sr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),sr.copy(n.boundingBox)),sr.applyMatrix4(t.matrixWorld),this.union(sr)}const r=t.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Je),Je.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Ii),or.subVectors(this.max,Ii),ii.subVectors(t.a,Ii),ri.subVectors(t.b,Ii),si.subVectors(t.c,Ii),En.subVectors(ri,ii),Tn.subVectors(si,ri),Bn.subVectors(ii,si);let e=[0,-En.z,En.y,0,-Tn.z,Tn.y,0,-Bn.z,Bn.y,En.z,0,-En.x,Tn.z,0,-Tn.x,Bn.z,0,-Bn.x,-En.y,En.x,0,-Tn.y,Tn.x,0,-Bn.y,Bn.x,0];return!is(e,ii,ri,si,or)||(e=[1,0,0,0,1,0,0,0,1],!is(e,ii,ri,si,or))?!1:(ar.crossVectors(En,Tn),e=[ar.x,ar.y,ar.z],is(e,ii,ri,si,or))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Je).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Je).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(pn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),pn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),pn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),pn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),pn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),pn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),pn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),pn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(pn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const pn=[new D,new D,new D,new D,new D,new D,new D,new D],Je=new D,sr=new Qn,ii=new D,ri=new D,si=new D,En=new D,Tn=new D,Bn=new D,Ii=new D,or=new D,ar=new D,zn=new D;function is(i,t,e,n,r){for(let s=0,o=i.length-3;s<=o;s+=3){zn.fromArray(i,s);const a=r.x*Math.abs(zn.x)+r.y*Math.abs(zn.y)+r.z*Math.abs(zn.z),c=t.dot(zn),l=e.dot(zn),h=n.dot(zn);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}const jc=new Qn,Di=new D,rs=new D;class tr{constructor(t=new D,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):jc.setFromPoints(t).getCenter(n);let r=0;for(let s=0,o=t.length;s<o;s++)r=Math.max(r,n.distanceToSquared(t[s]));return this.radius=Math.sqrt(r),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Di.subVectors(t,this.center);const e=Di.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),r=(n-this.radius)*.5;this.center.addScaledVector(Di,r/n),this.radius+=r}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(rs.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Di.copy(t.center).add(rs)),this.expandByPoint(Di.copy(t.center).sub(rs))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}const mn=new D,ss=new D,lr=new D,bn=new D,os=new D,cr=new D,as=new D;class Qc{constructor(t=new D,e=new D(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,mn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=mn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(mn.copy(this.origin).addScaledVector(this.direction,e),mn.distanceToSquared(t))}distanceSqToSegment(t,e,n,r){ss.copy(t).add(e).multiplyScalar(.5),lr.copy(e).sub(t).normalize(),bn.copy(this.origin).sub(ss);const s=t.distanceTo(e)*.5,o=-this.direction.dot(lr),a=bn.dot(this.direction),c=-bn.dot(lr),l=bn.lengthSq(),h=Math.abs(1-o*o);let f,m,p,g;if(h>0)if(f=o*c-a,m=o*a-c,g=s*h,f>=0)if(m>=-g)if(m<=g){const x=1/h;f*=x,m*=x,p=f*(f+o*m+2*a)+m*(o*f+m+2*c)+l}else m=s,f=Math.max(0,-(o*m+a)),p=-f*f+m*(m+2*c)+l;else m=-s,f=Math.max(0,-(o*m+a)),p=-f*f+m*(m+2*c)+l;else m<=-g?(f=Math.max(0,-(-o*s+a)),m=f>0?-s:Math.min(Math.max(-s,-c),s),p=-f*f+m*(m+2*c)+l):m<=g?(f=0,m=Math.min(Math.max(-s,-c),s),p=m*(m+2*c)+l):(f=Math.max(0,-(o*s+a)),m=f>0?s:Math.min(Math.max(-s,-c),s),p=-f*f+m*(m+2*c)+l);else m=o>0?-s:s,f=Math.max(0,-(o*m+a)),p=-f*f+m*(m+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(ss).addScaledVector(lr,m),p}intersectSphere(t,e){mn.subVectors(t.center,this.origin);const n=mn.dot(this.direction),r=mn.dot(mn)-n*n,s=t.radius*t.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,r,s,o,a,c;const l=1/this.direction.x,h=1/this.direction.y,f=1/this.direction.z,m=this.origin;return l>=0?(n=(t.min.x-m.x)*l,r=(t.max.x-m.x)*l):(n=(t.max.x-m.x)*l,r=(t.min.x-m.x)*l),h>=0?(s=(t.min.y-m.y)*h,o=(t.max.y-m.y)*h):(s=(t.max.y-m.y)*h,o=(t.min.y-m.y)*h),n>o||s>r||((s>n||isNaN(n))&&(n=s),(o<r||isNaN(r))&&(r=o),f>=0?(a=(t.min.z-m.z)*f,c=(t.max.z-m.z)*f):(a=(t.max.z-m.z)*f,c=(t.min.z-m.z)*f),n>c||a>r)||((a>n||n!==n)&&(n=a),(c<r||r!==r)&&(r=c),r<0)?null:this.at(n>=0?n:r,e)}intersectsBox(t){return this.intersectBox(t,mn)!==null}intersectTriangle(t,e,n,r,s){os.subVectors(e,t),cr.subVectors(n,t),as.crossVectors(os,cr);let o=this.direction.dot(as),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;bn.subVectors(this.origin,t);const c=a*this.direction.dot(cr.crossVectors(bn,cr));if(c<0)return null;const l=a*this.direction.dot(os.cross(bn));if(l<0||c+l>o)return null;const h=-a*bn.dot(as);return h<0?null:this.at(h/o,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ce{constructor(t,e,n,r,s,o,a,c,l,h,f,m,p,g,x,d){ce.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,r,s,o,a,c,l,h,f,m,p,g,x,d)}set(t,e,n,r,s,o,a,c,l,h,f,m,p,g,x,d){const u=this.elements;return u[0]=t,u[4]=e,u[8]=n,u[12]=r,u[1]=s,u[5]=o,u[9]=a,u[13]=c,u[2]=l,u[6]=h,u[10]=f,u[14]=m,u[3]=p,u[7]=g,u[11]=x,u[15]=d,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ce().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,r=1/oi.setFromMatrixColumn(t,0).length(),s=1/oi.setFromMatrixColumn(t,1).length(),o=1/oi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*r,e[1]=n[1]*r,e[2]=n[2]*r,e[3]=0,e[4]=n[4]*s,e[5]=n[5]*s,e[6]=n[6]*s,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,r=t.y,s=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(r),l=Math.sin(r),h=Math.cos(s),f=Math.sin(s);if(t.order==="XYZ"){const m=o*h,p=o*f,g=a*h,x=a*f;e[0]=c*h,e[4]=-c*f,e[8]=l,e[1]=p+g*l,e[5]=m-x*l,e[9]=-a*c,e[2]=x-m*l,e[6]=g+p*l,e[10]=o*c}else if(t.order==="YXZ"){const m=c*h,p=c*f,g=l*h,x=l*f;e[0]=m+x*a,e[4]=g*a-p,e[8]=o*l,e[1]=o*f,e[5]=o*h,e[9]=-a,e[2]=p*a-g,e[6]=x+m*a,e[10]=o*c}else if(t.order==="ZXY"){const m=c*h,p=c*f,g=l*h,x=l*f;e[0]=m-x*a,e[4]=-o*f,e[8]=g+p*a,e[1]=p+g*a,e[5]=o*h,e[9]=x-m*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){const m=o*h,p=o*f,g=a*h,x=a*f;e[0]=c*h,e[4]=g*l-p,e[8]=m*l+x,e[1]=c*f,e[5]=x*l+m,e[9]=p*l-g,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){const m=o*c,p=o*l,g=a*c,x=a*l;e[0]=c*h,e[4]=x-m*f,e[8]=g*f+p,e[1]=f,e[5]=o*h,e[9]=-a*h,e[2]=-l*h,e[6]=p*f+g,e[10]=m-x*f}else if(t.order==="XZY"){const m=o*c,p=o*l,g=a*c,x=a*l;e[0]=c*h,e[4]=-f,e[8]=l*h,e[1]=m*f+x,e[5]=o*h,e[9]=p*f-g,e[2]=g*f-p,e[6]=a*h,e[10]=x*f+m}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(th,t,eh)}lookAt(t,e,n){const r=this.elements;return Be.subVectors(t,e),Be.lengthSq()===0&&(Be.z=1),Be.normalize(),An.crossVectors(n,Be),An.lengthSq()===0&&(Math.abs(n.z)===1?Be.x+=1e-4:Be.z+=1e-4,Be.normalize(),An.crossVectors(n,Be)),An.normalize(),hr.crossVectors(Be,An),r[0]=An.x,r[4]=hr.x,r[8]=Be.x,r[1]=An.y,r[5]=hr.y,r[9]=Be.y,r[2]=An.z,r[6]=hr.z,r[10]=Be.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,r=e.elements,s=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],f=n[5],m=n[9],p=n[13],g=n[2],x=n[6],d=n[10],u=n[14],S=n[3],y=n[7],_=n[11],R=n[15],C=r[0],w=r[4],U=r[8],b=r[12],T=r[1],L=r[5],z=r[9],V=r[13],J=r[2],Y=r[6],X=r[10],j=r[14],M=r[3],I=r[7],O=r[11],H=r[15];return s[0]=o*C+a*T+c*J+l*M,s[4]=o*w+a*L+c*Y+l*I,s[8]=o*U+a*z+c*X+l*O,s[12]=o*b+a*V+c*j+l*H,s[1]=h*C+f*T+m*J+p*M,s[5]=h*w+f*L+m*Y+p*I,s[9]=h*U+f*z+m*X+p*O,s[13]=h*b+f*V+m*j+p*H,s[2]=g*C+x*T+d*J+u*M,s[6]=g*w+x*L+d*Y+u*I,s[10]=g*U+x*z+d*X+u*O,s[14]=g*b+x*V+d*j+u*H,s[3]=S*C+y*T+_*J+R*M,s[7]=S*w+y*L+_*Y+R*I,s[11]=S*U+y*z+_*X+R*O,s[15]=S*b+y*V+_*j+R*H,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],r=t[8],s=t[12],o=t[1],a=t[5],c=t[9],l=t[13],h=t[2],f=t[6],m=t[10],p=t[14],g=t[3],x=t[7],d=t[11],u=t[15];return g*(+s*c*f-r*l*f-s*a*m+n*l*m+r*a*p-n*c*p)+x*(+e*c*p-e*l*m+s*o*m-r*o*p+r*l*h-s*c*h)+d*(+e*l*f-e*a*p-s*o*f+n*o*p+s*a*h-n*l*h)+u*(-r*a*h-e*c*f+e*a*m+r*o*f-n*o*m+n*c*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const r=this.elements;return t.isVector3?(r[12]=t.x,r[13]=t.y,r[14]=t.z):(r[12]=t,r[13]=e,r[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],r=t[2],s=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],f=t[9],m=t[10],p=t[11],g=t[12],x=t[13],d=t[14],u=t[15],S=f*d*l-x*m*l+x*c*p-a*d*p-f*c*u+a*m*u,y=g*m*l-h*d*l-g*c*p+o*d*p+h*c*u-o*m*u,_=h*x*l-g*f*l+g*a*p-o*x*p-h*a*u+o*f*u,R=g*f*c-h*x*c-g*a*m+o*x*m+h*a*d-o*f*d,C=e*S+n*y+r*_+s*R;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const w=1/C;return t[0]=S*w,t[1]=(x*m*s-f*d*s-x*r*p+n*d*p+f*r*u-n*m*u)*w,t[2]=(a*d*s-x*c*s+x*r*l-n*d*l-a*r*u+n*c*u)*w,t[3]=(f*c*s-a*m*s-f*r*l+n*m*l+a*r*p-n*c*p)*w,t[4]=y*w,t[5]=(h*d*s-g*m*s+g*r*p-e*d*p-h*r*u+e*m*u)*w,t[6]=(g*c*s-o*d*s-g*r*l+e*d*l+o*r*u-e*c*u)*w,t[7]=(o*m*s-h*c*s+h*r*l-e*m*l-o*r*p+e*c*p)*w,t[8]=_*w,t[9]=(g*f*s-h*x*s-g*n*p+e*x*p+h*n*u-e*f*u)*w,t[10]=(o*x*s-g*a*s+g*n*l-e*x*l-o*n*u+e*a*u)*w,t[11]=(h*a*s-o*f*s-h*n*l+e*f*l+o*n*p-e*a*p)*w,t[12]=R*w,t[13]=(h*x*r-g*f*r+g*n*m-e*x*m-h*n*d+e*f*d)*w,t[14]=(g*a*r-o*x*r-g*n*c+e*x*c+o*n*d-e*a*d)*w,t[15]=(o*f*r-h*a*r+h*n*c-e*f*c-o*n*m+e*a*m)*w,this}scale(t){const e=this.elements,n=t.x,r=t.y,s=t.z;return e[0]*=n,e[4]*=r,e[8]*=s,e[1]*=n,e[5]*=r,e[9]*=s,e[2]*=n,e[6]*=r,e[10]*=s,e[3]*=n,e[7]*=r,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],r=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,r))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),r=Math.sin(e),s=1-n,o=t.x,a=t.y,c=t.z,l=s*o,h=s*a;return this.set(l*o+n,l*a-r*c,l*c+r*a,0,l*a+r*c,h*a+n,h*c-r*o,0,l*c-r*a,h*c+r*o,s*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,r,s,o){return this.set(1,n,s,0,t,1,o,0,e,r,1,0,0,0,0,1),this}compose(t,e,n){const r=this.elements,s=e._x,o=e._y,a=e._z,c=e._w,l=s+s,h=o+o,f=a+a,m=s*l,p=s*h,g=s*f,x=o*h,d=o*f,u=a*f,S=c*l,y=c*h,_=c*f,R=n.x,C=n.y,w=n.z;return r[0]=(1-(x+u))*R,r[1]=(p+_)*R,r[2]=(g-y)*R,r[3]=0,r[4]=(p-_)*C,r[5]=(1-(m+u))*C,r[6]=(d+S)*C,r[7]=0,r[8]=(g+y)*w,r[9]=(d-S)*w,r[10]=(1-(m+x))*w,r[11]=0,r[12]=t.x,r[13]=t.y,r[14]=t.z,r[15]=1,this}decompose(t,e,n){const r=this.elements;let s=oi.set(r[0],r[1],r[2]).length();const o=oi.set(r[4],r[5],r[6]).length(),a=oi.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),t.x=r[12],t.y=r[13],t.z=r[14],Ze.copy(this);const l=1/s,h=1/o,f=1/a;return Ze.elements[0]*=l,Ze.elements[1]*=l,Ze.elements[2]*=l,Ze.elements[4]*=h,Ze.elements[5]*=h,Ze.elements[6]*=h,Ze.elements[8]*=f,Ze.elements[9]*=f,Ze.elements[10]*=f,e.setFromRotationMatrix(Ze),n.x=s,n.y=o,n.z=a,this}makePerspective(t,e,n,r,s,o,a=cn,c=!1){const l=this.elements,h=2*s/(e-t),f=2*s/(n-r),m=(e+t)/(e-t),p=(n+r)/(n-r);let g,x;if(c)g=s/(o-s),x=o*s/(o-s);else if(a===cn)g=-(o+s)/(o-s),x=-2*o*s/(o-s);else if(a===zr)g=-o/(o-s),x=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=m,l[12]=0,l[1]=0,l[5]=f,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=x,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,r,s,o,a=cn,c=!1){const l=this.elements,h=2/(e-t),f=2/(n-r),m=-(e+t)/(e-t),p=-(n+r)/(n-r);let g,x;if(c)g=1/(o-s),x=o/(o-s);else if(a===cn)g=-2/(o-s),x=-(o+s)/(o-s);else if(a===zr)g=-1/(o-s),x=-s/(o-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=0,l[12]=m,l[1]=0,l[5]=f,l[9]=0,l[13]=p,l[2]=0,l[6]=0,l[10]=g,l[14]=x,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let r=0;r<16;r++)if(e[r]!==n[r])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const oi=new D,Ze=new ce,th=new D(0,0,0),eh=new D(1,1,1),An=new D,hr=new D,Be=new D,ua=new ce,fa=new Qi;class en{constructor(t=0,e=0,n=0,r=en.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=r}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,r=this._order){return this._x=t,this._y=e,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const r=t.elements,s=r[0],o=r[4],a=r[8],c=r[1],l=r[5],h=r[9],f=r[2],m=r[6],p=r[10];switch(e){case"XYZ":this._y=Math.asin(Yt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(m,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Yt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(Yt(m,-1,1)),Math.abs(m)<.9999999?(this._y=Math.atan2(-f,p),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-Yt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(m,p),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Yt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-Yt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(m,l),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return ua.makeRotationFromQuaternion(t),this.setFromRotationMatrix(ua,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return fa.setFromEuler(this),this.setFromQuaternion(fa,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}en.DEFAULT_ORDER="XYZ";class Tl{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let nh=0;const da=new D,ai=new Qi,gn=new ce,ur=new D,Ui=new D,ih=new D,rh=new Qi,pa=new D(1,0,0),ma=new D(0,1,0),ga=new D(0,0,1),_a={type:"added"},sh={type:"removed"},li={type:"childadded",child:null},ls={type:"childremoved",child:null};class ye extends Ai{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:nh++}),this.uuid=wi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ye.DEFAULT_UP.clone();const t=new D,e=new en,n=new Qi,r=new D(1,1,1);function s(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new ce},normalMatrix:{value:new Wt}}),this.matrix=new ce,this.matrixWorld=new ce,this.matrixAutoUpdate=ye.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ye.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Tl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return ai.setFromAxisAngle(t,e),this.quaternion.multiply(ai),this}rotateOnWorldAxis(t,e){return ai.setFromAxisAngle(t,e),this.quaternion.premultiply(ai),this}rotateX(t){return this.rotateOnAxis(pa,t)}rotateY(t){return this.rotateOnAxis(ma,t)}rotateZ(t){return this.rotateOnAxis(ga,t)}translateOnAxis(t,e){return da.copy(t).applyQuaternion(this.quaternion),this.position.add(da.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(pa,t)}translateY(t){return this.translateOnAxis(ma,t)}translateZ(t){return this.translateOnAxis(ga,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(gn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?ur.copy(t):ur.set(t,e,n);const r=this.parent;this.updateWorldMatrix(!0,!1),Ui.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?gn.lookAt(Ui,ur,this.up):gn.lookAt(ur,Ui,this.up),this.quaternion.setFromRotationMatrix(gn),r&&(gn.extractRotation(r.matrixWorld),ai.setFromRotationMatrix(gn),this.quaternion.premultiply(ai.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(_a),li.child=t,this.dispatchEvent(li),li.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(sh),ls.child=t,this.dispatchEvent(ls),ls.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),gn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),gn.multiply(t.parent.matrixWorld)),t.applyMatrix4(gn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(_a),li.child=t,this.dispatchEvent(li),li.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,r=this.children.length;n<r;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ui,t,ih),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ui,rh,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(a=>({...a})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(t),r.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const f=c[l];s(t.shapes,f)}else s(t.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(s(t.materials,this.material[c]));r.material=a}else r.material=s(t.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];r.animations.push(s(t.animations,c))}}if(e){const a=o(t.geometries),c=o(t.materials),l=o(t.textures),h=o(t.images),f=o(t.shapes),m=o(t.skeletons),p=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),f.length>0&&(n.shapes=f),m.length>0&&(n.skeletons=m),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=r,n;function o(a){const c=[];for(const l in a){const h=a[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const r=t.children[n];this.add(r.clone())}return this}}ye.DEFAULT_UP=new D(0,1,0);ye.DEFAULT_MATRIX_AUTO_UPDATE=!0;ye.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const $e=new D,_n=new D,cs=new D,vn=new D,ci=new D,hi=new D,va=new D,hs=new D,us=new D,fs=new D,ds=new se,ps=new se,ms=new se;class Qe{constructor(t=new D,e=new D,n=new D){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,r){r.subVectors(n,e),$e.subVectors(t,e),r.cross($e);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(t,e,n,r,s){$e.subVectors(r,e),_n.subVectors(n,e),cs.subVectors(t,e);const o=$e.dot($e),a=$e.dot(_n),c=$e.dot(cs),l=_n.dot(_n),h=_n.dot(cs),f=o*l-a*a;if(f===0)return s.set(0,0,0),null;const m=1/f,p=(l*c-a*h)*m,g=(o*h-a*c)*m;return s.set(1-p-g,g,p)}static containsPoint(t,e,n,r){return this.getBarycoord(t,e,n,r,vn)===null?!1:vn.x>=0&&vn.y>=0&&vn.x+vn.y<=1}static getInterpolation(t,e,n,r,s,o,a,c){return this.getBarycoord(t,e,n,r,vn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,vn.x),c.addScaledVector(o,vn.y),c.addScaledVector(a,vn.z),c)}static getInterpolatedAttribute(t,e,n,r,s,o){return ds.setScalar(0),ps.setScalar(0),ms.setScalar(0),ds.fromBufferAttribute(t,e),ps.fromBufferAttribute(t,n),ms.fromBufferAttribute(t,r),o.setScalar(0),o.addScaledVector(ds,s.x),o.addScaledVector(ps,s.y),o.addScaledVector(ms,s.z),o}static isFrontFacing(t,e,n,r){return $e.subVectors(n,e),_n.subVectors(t,e),$e.cross(_n).dot(r)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,r){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[r]),this}setFromAttributeAndIndices(t,e,n,r){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,r),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return $e.subVectors(this.c,this.b),_n.subVectors(this.a,this.b),$e.cross(_n).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Qe.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Qe.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,r,s){return Qe.getInterpolation(t,this.a,this.b,this.c,e,n,r,s)}containsPoint(t){return Qe.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Qe.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,r=this.b,s=this.c;let o,a;ci.subVectors(r,n),hi.subVectors(s,n),hs.subVectors(t,n);const c=ci.dot(hs),l=hi.dot(hs);if(c<=0&&l<=0)return e.copy(n);us.subVectors(t,r);const h=ci.dot(us),f=hi.dot(us);if(h>=0&&f<=h)return e.copy(r);const m=c*f-h*l;if(m<=0&&c>=0&&h<=0)return o=c/(c-h),e.copy(n).addScaledVector(ci,o);fs.subVectors(t,s);const p=ci.dot(fs),g=hi.dot(fs);if(g>=0&&p<=g)return e.copy(s);const x=p*l-c*g;if(x<=0&&l>=0&&g<=0)return a=l/(l-g),e.copy(n).addScaledVector(hi,a);const d=h*g-p*f;if(d<=0&&f-h>=0&&p-g>=0)return va.subVectors(s,r),a=(f-h)/(f-h+(p-g)),e.copy(r).addScaledVector(va,a);const u=1/(d+x+m);return o=x*u,a=m*u,e.copy(n).addScaledVector(ci,o).addScaledVector(hi,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const bl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},wn={h:0,s:0,l:0},fr={h:0,s:0,l:0};function gs(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class qt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const r=t;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ie){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,te.colorSpaceToWorking(this,e),this}setRGB(t,e,n,r=te.workingColorSpace){return this.r=t,this.g=e,this.b=n,te.colorSpaceToWorking(this,r),this}setHSL(t,e,n,r=te.workingColorSpace){if(t=Vc(t,1),e=Yt(e,0,1),n=Yt(n,0,1),e===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+e):n+e-n*e,o=2*n-s;this.r=gs(o,s,t+1/3),this.g=gs(o,s,t),this.b=gs(o,s,t-1/3)}return te.colorSpaceToWorking(this,r),this}setStyle(t,e=Ie){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(s,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ie){const n=bl[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Sn(t.r),this.g=Sn(t.g),this.b=Sn(t.b),this}copyLinearToSRGB(t){return this.r=xi(t.r),this.g=xi(t.g),this.b=xi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ie){return te.workingToColorSpace(be.copy(this),t),Math.round(Yt(be.r*255,0,255))*65536+Math.round(Yt(be.g*255,0,255))*256+Math.round(Yt(be.b*255,0,255))}getHexString(t=Ie){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=te.workingColorSpace){te.workingToColorSpace(be.copy(this),e);const n=be.r,r=be.g,s=be.b,o=Math.max(n,r,s),a=Math.min(n,r,s);let c,l;const h=(a+o)/2;if(a===o)c=0,l=0;else{const f=o-a;switch(l=h<=.5?f/(o+a):f/(2-o-a),o){case n:c=(r-s)/f+(r<s?6:0);break;case r:c=(s-n)/f+2;break;case s:c=(n-r)/f+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=te.workingColorSpace){return te.workingToColorSpace(be.copy(this),e),t.r=be.r,t.g=be.g,t.b=be.b,t}getStyle(t=Ie){te.workingToColorSpace(be.copy(this),t);const e=be.r,n=be.g,r=be.b;return t!==Ie?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(t,e,n){return this.getHSL(wn),this.setHSL(wn.h+t,wn.s+e,wn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(wn),t.getHSL(fr);const n=jr(wn.h,fr.h,e),r=jr(wn.s,fr.s,e),s=jr(wn.l,fr.l,e);return this.setHSL(n,r,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,r=this.b,s=t.elements;return this.r=s[0]*e+s[3]*n+s[6]*r,this.g=s[1]*e+s[4]*n+s[7]*r,this.b=s[2]*e+s[5]*n+s[8]*r,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const be=new qt;qt.NAMES=bl;let oh=0;class Ri extends Ai{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:oh++}),this.uuid=wi(),this.name="",this.type="Material",this.blending=vi,this.side=yn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Fs,this.blendDst=Os,this.blendEquation=qn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new qt(0,0,0),this.blendAlpha=0,this.depthFunc=Mi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ra,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ei,this.stencilZFail=ei,this.stencilZPass=ei,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const r=this[e];if(r===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==vi&&(n.blending=this.blending),this.side!==yn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Fs&&(n.blendSrc=this.blendSrc),this.blendDst!==Os&&(n.blendDst=this.blendDst),this.blendEquation!==qn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Mi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ra&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ei&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ei&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ei&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const o=[];for(const a in s){const c=s[a];delete c.metadata,o.push(c)}return o}if(e){const s=r(t.textures),o=r(t.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const r=e.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=e[s].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class hn extends Ri{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new qt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new en,this.combine=Co,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const _e=new D,dr=new at;let ah=0;class Ke{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:ah++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=sa,this.updateRanges=[],this.gpuType=ln,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[t+r]=e.array[n+r];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)dr.fromBufferAttribute(this,e),dr.applyMatrix3(t),this.setXY(e,dr.x,dr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)_e.fromBufferAttribute(this,e),_e.applyMatrix3(t),this.setXYZ(e,_e.x,_e.y,_e.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)_e.fromBufferAttribute(this,e),_e.applyMatrix4(t),this.setXYZ(e,_e.x,_e.y,_e.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)_e.fromBufferAttribute(this,e),_e.applyNormalMatrix(t),this.setXYZ(e,_e.x,_e.y,_e.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)_e.fromBufferAttribute(this,e),_e.transformDirection(t),this.setXYZ(e,_e.x,_e.y,_e.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Li(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Ne(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Li(e,this.array)),e}setX(t,e){return this.normalized&&(e=Ne(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Li(e,this.array)),e}setY(t,e){return this.normalized&&(e=Ne(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Li(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Ne(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Li(e,this.array)),e}setW(t,e){return this.normalized&&(e=Ne(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Ne(e,this.array),n=Ne(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,r){return t*=this.itemSize,this.normalized&&(e=Ne(e,this.array),n=Ne(n,this.array),r=Ne(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=r,this}setXYZW(t,e,n,r,s){return t*=this.itemSize,this.normalized&&(e=Ne(e,this.array),n=Ne(n,this.array),r=Ne(r,this.array),s=Ne(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=r,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==sa&&(t.usage=this.usage),t}}class Al extends Ke{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class wl extends Ke{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class $t extends Ke{constructor(t,e,n){super(new Float32Array(t),e,n)}}let lh=0;const qe=new ce,_s=new ye,ui=new D,ze=new Qn,Ni=new Qn,Me=new D;class Ee extends Ai{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:lh++}),this.uuid=wi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(yl(t)?wl:Al)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Wt().getNormalMatrix(t);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(t),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return qe.makeRotationFromQuaternion(t),this.applyMatrix4(qe),this}rotateX(t){return qe.makeRotationX(t),this.applyMatrix4(qe),this}rotateY(t){return qe.makeRotationY(t),this.applyMatrix4(qe),this}rotateZ(t){return qe.makeRotationZ(t),this.applyMatrix4(qe),this}translate(t,e,n){return qe.makeTranslation(t,e,n),this.applyMatrix4(qe),this}scale(t,e,n){return qe.makeScale(t,e,n),this.applyMatrix4(qe),this}lookAt(t){return _s.lookAt(t),_s.updateMatrix(),this.applyMatrix4(_s.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ui).negate(),this.translate(ui.x,ui.y,ui.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let r=0,s=t.length;r<s;r++){const o=t[r];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new $t(n,3))}else{const n=Math.min(t.length,e.count);for(let r=0;r<n;r++){const s=t[r];e.setXYZ(r,s.x,s.y,s.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Qn);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,r=e.length;n<r;n++){const s=e[n];ze.setFromBufferAttribute(s),this.morphTargetsRelative?(Me.addVectors(this.boundingBox.min,ze.min),this.boundingBox.expandByPoint(Me),Me.addVectors(this.boundingBox.max,ze.max),this.boundingBox.expandByPoint(Me)):(this.boundingBox.expandByPoint(ze.min),this.boundingBox.expandByPoint(ze.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new tr);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new D,1/0);return}if(t){const n=this.boundingSphere.center;if(ze.setFromBufferAttribute(t),e)for(let s=0,o=e.length;s<o;s++){const a=e[s];Ni.setFromBufferAttribute(a),this.morphTargetsRelative?(Me.addVectors(ze.min,Ni.min),ze.expandByPoint(Me),Me.addVectors(ze.max,Ni.max),ze.expandByPoint(Me)):(ze.expandByPoint(Ni.min),ze.expandByPoint(Ni.max))}ze.getCenter(n);let r=0;for(let s=0,o=t.count;s<o;s++)Me.fromBufferAttribute(t,s),r=Math.max(r,n.distanceToSquared(Me));if(e)for(let s=0,o=e.length;s<o;s++){const a=e[s],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)Me.fromBufferAttribute(a,l),c&&(ui.fromBufferAttribute(t,l),Me.add(ui)),r=Math.max(r,n.distanceToSquared(Me))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,r=e.normal,s=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ke(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let U=0;U<n.count;U++)a[U]=new D,c[U]=new D;const l=new D,h=new D,f=new D,m=new at,p=new at,g=new at,x=new D,d=new D;function u(U,b,T){l.fromBufferAttribute(n,U),h.fromBufferAttribute(n,b),f.fromBufferAttribute(n,T),m.fromBufferAttribute(s,U),p.fromBufferAttribute(s,b),g.fromBufferAttribute(s,T),h.sub(l),f.sub(l),p.sub(m),g.sub(m);const L=1/(p.x*g.y-g.x*p.y);isFinite(L)&&(x.copy(h).multiplyScalar(g.y).addScaledVector(f,-p.y).multiplyScalar(L),d.copy(f).multiplyScalar(p.x).addScaledVector(h,-g.x).multiplyScalar(L),a[U].add(x),a[b].add(x),a[T].add(x),c[U].add(d),c[b].add(d),c[T].add(d))}let S=this.groups;S.length===0&&(S=[{start:0,count:t.count}]);for(let U=0,b=S.length;U<b;++U){const T=S[U],L=T.start,z=T.count;for(let V=L,J=L+z;V<J;V+=3)u(t.getX(V+0),t.getX(V+1),t.getX(V+2))}const y=new D,_=new D,R=new D,C=new D;function w(U){R.fromBufferAttribute(r,U),C.copy(R);const b=a[U];y.copy(b),y.sub(R.multiplyScalar(R.dot(b))).normalize(),_.crossVectors(C,b);const L=_.dot(c[U])<0?-1:1;o.setXYZW(U,y.x,y.y,y.z,L)}for(let U=0,b=S.length;U<b;++U){const T=S[U],L=T.start,z=T.count;for(let V=L,J=L+z;V<J;V+=3)w(t.getX(V+0)),w(t.getX(V+1)),w(t.getX(V+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ke(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let m=0,p=n.count;m<p;m++)n.setXYZ(m,0,0,0);const r=new D,s=new D,o=new D,a=new D,c=new D,l=new D,h=new D,f=new D;if(t)for(let m=0,p=t.count;m<p;m+=3){const g=t.getX(m+0),x=t.getX(m+1),d=t.getX(m+2);r.fromBufferAttribute(e,g),s.fromBufferAttribute(e,x),o.fromBufferAttribute(e,d),h.subVectors(o,s),f.subVectors(r,s),h.cross(f),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,x),l.fromBufferAttribute(n,d),a.add(h),c.add(h),l.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(x,c.x,c.y,c.z),n.setXYZ(d,l.x,l.y,l.z)}else for(let m=0,p=e.count;m<p;m+=3)r.fromBufferAttribute(e,m+0),s.fromBufferAttribute(e,m+1),o.fromBufferAttribute(e,m+2),h.subVectors(o,s),f.subVectors(r,s),h.cross(f),n.setXYZ(m+0,h.x,h.y,h.z),n.setXYZ(m+1,h.x,h.y,h.z),n.setXYZ(m+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Me.fromBufferAttribute(t,e),Me.normalize(),t.setXYZ(e,Me.x,Me.y,Me.z)}toNonIndexed(){function t(a,c){const l=a.array,h=a.itemSize,f=a.normalized,m=new l.constructor(c.length*h);let p=0,g=0;for(let x=0,d=c.length;x<d;x++){a.isInterleavedBufferAttribute?p=c[x]*a.data.stride+a.offset:p=c[x]*h;for(let u=0;u<h;u++)m[g++]=l[p++]}return new Ke(m,h,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Ee,n=this.index.array,r=this.attributes;for(const a in r){const c=r[a],l=t(c,n);e.setAttribute(a,l)}const s=this.morphAttributes;for(const a in s){const c=[],l=s[a];for(let h=0,f=l.length;h<f;h++){const m=l[h],p=t(m,n);c.push(p)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const r={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let f=0,m=l.length;f<m;f++){const p=l[f];h.push(p.toJSON(t.data))}h.length>0&&(r[c]=h,s=!0)}s&&(t.data.morphAttributes=r,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const r=t.attributes;for(const l in r){const h=r[l];this.setAttribute(l,h.clone(e))}const s=t.morphAttributes;for(const l in s){const h=[],f=s[l];for(let m=0,p=f.length;m<p;m++)h.push(f[m].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let l=0,h=o.length;l<h;l++){const f=o[l];this.addGroup(f.start,f.count,f.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const xa=new ce,kn=new Qc,pr=new tr,Ma=new D,mr=new D,gr=new D,_r=new D,vs=new D,vr=new D,Sa=new D,xr=new D;class ge extends ye{constructor(t=new Ee,e=new hn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const r=e[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(t,e){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(r,t);const a=this.morphTargetInfluences;if(s&&a){vr.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const h=a[c],f=s[c];h!==0&&(vs.fromBufferAttribute(f,t),o?vr.addScaledVector(vs,h):vr.addScaledVector(vs.sub(e),h))}e.add(vr)}return e}raycast(t,e){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),pr.copy(n.boundingSphere),pr.applyMatrix4(s),kn.copy(t.ray).recast(t.near),!(pr.containsPoint(kn.origin)===!1&&(kn.intersectSphere(pr,Ma)===null||kn.origin.distanceToSquared(Ma)>(t.far-t.near)**2))&&(xa.copy(s).invert(),kn.copy(t.ray).applyMatrix4(xa),!(n.boundingBox!==null&&kn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,kn)))}_computeIntersections(t,e,n){let r;const s=this.geometry,o=this.material,a=s.index,c=s.attributes.position,l=s.attributes.uv,h=s.attributes.uv1,f=s.attributes.normal,m=s.groups,p=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,x=m.length;g<x;g++){const d=m[g],u=o[d.materialIndex],S=Math.max(d.start,p.start),y=Math.min(a.count,Math.min(d.start+d.count,p.start+p.count));for(let _=S,R=y;_<R;_+=3){const C=a.getX(_),w=a.getX(_+1),U=a.getX(_+2);r=Mr(this,u,t,n,l,h,f,C,w,U),r&&(r.faceIndex=Math.floor(_/3),r.face.materialIndex=d.materialIndex,e.push(r))}}else{const g=Math.max(0,p.start),x=Math.min(a.count,p.start+p.count);for(let d=g,u=x;d<u;d+=3){const S=a.getX(d),y=a.getX(d+1),_=a.getX(d+2);r=Mr(this,o,t,n,l,h,f,S,y,_),r&&(r.faceIndex=Math.floor(d/3),e.push(r))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,x=m.length;g<x;g++){const d=m[g],u=o[d.materialIndex],S=Math.max(d.start,p.start),y=Math.min(c.count,Math.min(d.start+d.count,p.start+p.count));for(let _=S,R=y;_<R;_+=3){const C=_,w=_+1,U=_+2;r=Mr(this,u,t,n,l,h,f,C,w,U),r&&(r.faceIndex=Math.floor(_/3),r.face.materialIndex=d.materialIndex,e.push(r))}}else{const g=Math.max(0,p.start),x=Math.min(c.count,p.start+p.count);for(let d=g,u=x;d<u;d+=3){const S=d,y=d+1,_=d+2;r=Mr(this,o,t,n,l,h,f,S,y,_),r&&(r.faceIndex=Math.floor(d/3),e.push(r))}}}}function ch(i,t,e,n,r,s,o,a){let c;if(t.side===De?c=n.intersectTriangle(o,s,r,!0,a):c=n.intersectTriangle(r,s,o,t.side===yn,a),c===null)return null;xr.copy(a),xr.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(xr);return l<e.near||l>e.far?null:{distance:l,point:xr.clone(),object:i}}function Mr(i,t,e,n,r,s,o,a,c,l){i.getVertexPosition(a,mr),i.getVertexPosition(c,gr),i.getVertexPosition(l,_r);const h=ch(i,t,e,n,mr,gr,_r,Sa);if(h){const f=new D;Qe.getBarycoord(Sa,mr,gr,_r,f),r&&(h.uv=Qe.getInterpolatedAttribute(r,a,c,l,f,new at)),s&&(h.uv1=Qe.getInterpolatedAttribute(s,a,c,l,f,new at)),o&&(h.normal=Qe.getInterpolatedAttribute(o,a,c,l,f,new D),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const m={a,b:c,c:l,normal:new D,materialIndex:0};Qe.getNormal(mr,gr,_r,m.normal),h.face=m,h.barycoord=f}return h}class Nn extends Ee{constructor(t=1,e=1,n=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const c=[],l=[],h=[],f=[];let m=0,p=0;g("z","y","x",-1,-1,n,e,t,o,s,0),g("z","y","x",1,-1,n,e,-t,o,s,1),g("x","z","y",1,1,t,n,e,r,o,2),g("x","z","y",1,-1,t,n,-e,r,o,3),g("x","y","z",1,-1,t,e,n,r,s,4),g("x","y","z",-1,-1,t,e,-n,r,s,5),this.setIndex(c),this.setAttribute("position",new $t(l,3)),this.setAttribute("normal",new $t(h,3)),this.setAttribute("uv",new $t(f,2));function g(x,d,u,S,y,_,R,C,w,U,b){const T=_/w,L=R/U,z=_/2,V=R/2,J=C/2,Y=w+1,X=U+1;let j=0,M=0;const I=new D;for(let O=0;O<X;O++){const H=O*L-V;for(let Z=0;Z<Y;Z++){const ot=Z*T-z;I[x]=ot*S,I[d]=H*y,I[u]=J,l.push(I.x,I.y,I.z),I[x]=0,I[d]=0,I[u]=C>0?1:-1,h.push(I.x,I.y,I.z),f.push(Z/w),f.push(1-O/U),j+=1}}for(let O=0;O<U;O++)for(let H=0;H<w;H++){const Z=m+H+Y*O,ot=m+H+Y*(O+1),gt=m+(H+1)+Y*(O+1),ct=m+(H+1)+Y*O;c.push(Z,ot,ct),c.push(ot,gt,ct),M+=6}a.addGroup(p,M,b),p+=M,m+=j}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Nn(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Ti(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const r=i[e][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=r.clone():Array.isArray(r)?t[e][n]=r.slice():t[e][n]=r}}return t}function Ce(i){const t={};for(let e=0;e<i.length;e++){const n=Ti(i[e]);for(const r in n)t[r]=n[r]}return t}function hh(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Rl(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:te.workingColorSpace}const uh={clone:Ti,merge:Ce};var fh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,dh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Un extends Ri{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=fh,this.fragmentShader=dh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ti(t.uniforms),this.uniformsGroups=hh(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?e.uniforms[r]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[r]={type:"m4",value:o.toArray()}:e.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Cl extends ye{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ce,this.projectionMatrix=new ce,this.projectionMatrixInverse=new ce,this.coordinateSystem=cn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Rn=new D,ya=new at,Ea=new at;class Ge extends Cl{constructor(t=50,e=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Eo*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan($r*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Eo*2*Math.atan(Math.tan($r*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Rn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Rn.x,Rn.y).multiplyScalar(-t/Rn.z),Rn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Rn.x,Rn.y).multiplyScalar(-t/Rn.z)}getViewSize(t,e){return this.getViewBounds(t,ya,Ea),e.subVectors(Ea,ya)}setViewOffset(t,e,n,r,s,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan($r*.5*this.fov)/this.zoom,n=2*e,r=this.aspect*n,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;s+=o.offsetX*r/c,e-=o.offsetY*n/l,r*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(s+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const fi=-90,di=1;class ph extends ye{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Ge(fi,di,t,e);r.layers=this.layers,this.add(r);const s=new Ge(fi,di,t,e);s.layers=this.layers,this.add(s);const o=new Ge(fi,di,t,e);o.layers=this.layers,this.add(o);const a=new Ge(fi,di,t,e);a.layers=this.layers,this.add(a);const c=new Ge(fi,di,t,e);c.layers=this.layers,this.add(c);const l=new Ge(fi,di,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,r,s,o,a,c]=e;for(const l of e)this.remove(l);if(t===cn)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===zr)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,c,l,h]=this.children,f=t.getRenderTarget(),m=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,r),t.render(e,s),t.setRenderTarget(n,1,r),t.render(e,o),t.setRenderTarget(n,2,r),t.render(e,a),t.setRenderTarget(n,3,r),t.render(e,c),t.setRenderTarget(n,4,r),t.render(e,l),n.texture.generateMipmaps=x,t.setRenderTarget(n,5,r),t.render(e,h),t.setRenderTarget(f,m,p),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Pl extends we{constructor(t=[],e=Si,n,r,s,o,a,c,l,h){super(t,e,n,r,s,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class mh extends $n{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},r=[n,n,n,n,n,n];this.texture=new Pl(r),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Nn(5,5,5),s=new Un({name:"CubemapFromEquirect",uniforms:Ti(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:De,blending:Pn});s.uniforms.tEquirect.value=e;const o=new ge(r,s),a=e.minFilter;return e.minFilter===Jn&&(e.minFilter=an),new ph(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,r=!0){const s=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,r);t.setRenderTarget(s)}}class Le extends ye{constructor(){super(),this.isGroup=!0,this.type="Group"}}const gh={type:"move"};class xs{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Le,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Le,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Le,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let r=null,s=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(const x of t.hand.values()){const d=e.getJointPose(x,n),u=this._getHandJoint(l,x);d!==null&&(u.matrix.fromArray(d.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,u.jointRadius=d.radius),u.visible=d!==null}const h=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],m=h.position.distanceTo(f.position),p=.02,g=.005;l.inputState.pinching&&m>p+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&m<=p-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(r=e.getPose(t.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(gh)))}return a!==null&&(a.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Le;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}class Ll extends ye{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new en,this.environmentIntensity=1,this.environmentRotation=new en,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class _h extends we{constructor(t=null,e=1,n=1,r,s,o,a,c,l=Ve,h=Ve,f,m){super(null,o,a,c,l,h,r,s,f,m),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ta extends Ke{constructor(t,e,n,r=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const pi=new ce,ba=new ce,Sr=[],Aa=new Qn,vh=new ce,Fi=new ge,Oi=new tr;class xh extends ge{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Ta(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<n;r++)this.setMatrixAt(r,vh)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Qn),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,pi),Aa.copy(t.boundingBox).applyMatrix4(pi),this.boundingBox.union(Aa)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new tr),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,pi),Oi.copy(t.boundingSphere).applyMatrix4(pi),this.boundingSphere.union(Oi)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,r=this.morphTexture.source.data.data,s=n.length+1,o=t*s+1;for(let a=0;a<n.length;a++)n[a]=r[o+a]}raycast(t,e){const n=this.matrixWorld,r=this.count;if(Fi.geometry=this.geometry,Fi.material=this.material,Fi.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Oi.copy(this.boundingSphere),Oi.applyMatrix4(n),t.ray.intersectsSphere(Oi)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,pi),ba.multiplyMatrices(n,pi),Fi.matrixWorld=ba,Fi.raycast(t,Sr);for(let o=0,a=Sr.length;o<a;o++){const c=Sr[o];c.instanceId=s,c.object=this,e.push(c)}Sr.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Ta(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new _h(new Float32Array(r*this.count),r,this.count,Do,ln));const s=this.morphTexture.source.data.data;let o=0;for(let l=0;l<n.length;l++)o+=n[l];const a=this.geometry.morphTargetsRelative?1:1-o,c=r*t;s[c]=a,s.set(n,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Ms=new D,Mh=new D,Sh=new Wt;class Wn{constructor(t=new D(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,r){return this.normal.set(t,e,n),this.constant=r,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const r=Ms.subVectors(n,e).cross(Mh.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(r,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Ms),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:e.copy(t.start).addScaledVector(n,s)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Sh.getNormalMatrix(t),r=this.coplanarPoint(Ms).applyMatrix4(t),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Hn=new tr,yh=new at(.5,.5),yr=new D;class zo{constructor(t=new Wn,e=new Wn,n=new Wn,r=new Wn,s=new Wn,o=new Wn){this.planes=[t,e,n,r,s,o]}set(t,e,n,r,s,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=cn,n=!1){const r=this.planes,s=t.elements,o=s[0],a=s[1],c=s[2],l=s[3],h=s[4],f=s[5],m=s[6],p=s[7],g=s[8],x=s[9],d=s[10],u=s[11],S=s[12],y=s[13],_=s[14],R=s[15];if(r[0].setComponents(l-o,p-h,u-g,R-S).normalize(),r[1].setComponents(l+o,p+h,u+g,R+S).normalize(),r[2].setComponents(l+a,p+f,u+x,R+y).normalize(),r[3].setComponents(l-a,p-f,u-x,R-y).normalize(),n)r[4].setComponents(c,m,d,_).normalize(),r[5].setComponents(l-c,p-m,u-d,R-_).normalize();else if(r[4].setComponents(l-c,p-m,u-d,R-_).normalize(),e===cn)r[5].setComponents(l+c,p+m,u+d,R+_).normalize();else if(e===zr)r[5].setComponents(c,m,d,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Hn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Hn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Hn)}intersectsSprite(t){Hn.center.set(0,0,0);const e=yh.distanceTo(t.center);return Hn.radius=.7071067811865476+e,Hn.applyMatrix4(t.matrixWorld),this.intersectsSphere(Hn)}intersectsSphere(t){const e=this.planes,n=t.center,r=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const r=e[n];if(yr.x=r.normal.x>0?t.max.x:t.min.x,yr.y=r.normal.y>0?t.max.y:t.min.y,yr.z=r.normal.z>0?t.max.z:t.min.z,r.distanceToPoint(yr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Il extends we{constructor(t,e,n,r,s,o,a,c,l){super(t,e,n,r,s,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Dl extends we{constructor(t,e,n=Zn,r,s,o,a=Ve,c=Ve,l,h=qi,f=1){if(h!==qi&&h!==Yi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const m={width:t,height:e,depth:f};super(m,r,s,o,a,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Bo(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class Ul extends we{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class Hr extends Ee{constructor(t=1,e=32,n=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:r},e=Math.max(3,e);const s=[],o=[],a=[],c=[],l=new D,h=new at;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let f=0,m=3;f<=e;f++,m+=3){const p=n+f/e*r;l.x=t*Math.cos(p),l.y=t*Math.sin(p),o.push(l.x,l.y,l.z),a.push(0,0,1),h.x=(o[m]/t+1)/2,h.y=(o[m+1]/t+1)/2,c.push(h.x,h.y)}for(let f=1;f<=e;f++)s.push(f,f+1,0);this.setIndex(s),this.setAttribute("position",new $t(o,3)),this.setAttribute("normal",new $t(a,3)),this.setAttribute("uv",new $t(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Hr(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class ko extends Ee{constructor(t=1,e=1,n=1,r=32,s=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:c};const l=this;r=Math.floor(r),s=Math.floor(s);const h=[],f=[],m=[],p=[];let g=0;const x=[],d=n/2;let u=0;S(),o===!1&&(t>0&&y(!0),e>0&&y(!1)),this.setIndex(h),this.setAttribute("position",new $t(f,3)),this.setAttribute("normal",new $t(m,3)),this.setAttribute("uv",new $t(p,2));function S(){const _=new D,R=new D;let C=0;const w=(e-t)/n;for(let U=0;U<=s;U++){const b=[],T=U/s,L=T*(e-t)+t;for(let z=0;z<=r;z++){const V=z/r,J=V*c+a,Y=Math.sin(J),X=Math.cos(J);R.x=L*Y,R.y=-T*n+d,R.z=L*X,f.push(R.x,R.y,R.z),_.set(Y,w,X).normalize(),m.push(_.x,_.y,_.z),p.push(V,1-T),b.push(g++)}x.push(b)}for(let U=0;U<r;U++)for(let b=0;b<s;b++){const T=x[b][U],L=x[b+1][U],z=x[b+1][U+1],V=x[b][U+1];(t>0||b!==0)&&(h.push(T,L,V),C+=3),(e>0||b!==s-1)&&(h.push(L,z,V),C+=3)}l.addGroup(u,C,0),u+=C}function y(_){const R=g,C=new at,w=new D;let U=0;const b=_===!0?t:e,T=_===!0?1:-1;for(let z=1;z<=r;z++)f.push(0,d*T,0),m.push(0,T,0),p.push(.5,.5),g++;const L=g;for(let z=0;z<=r;z++){const J=z/r*c+a,Y=Math.cos(J),X=Math.sin(J);w.x=b*X,w.y=d*T,w.z=b*Y,f.push(w.x,w.y,w.z),m.push(0,T,0),C.x=Y*.5+.5,C.y=X*.5*T+.5,p.push(C.x,C.y),g++}for(let z=0;z<r;z++){const V=R+z,J=L+z;_===!0?h.push(J,J+1,V):h.push(J+1,J,V),U+=3}l.addGroup(u,U,_===!0?1:2),u+=U}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ko(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class fn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,r=this.getPoint(0),s=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),s+=n.distanceTo(r),e.push(s),r=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){const n=this.getLengths();let r=0;const s=n.length;let o;e?o=e:o=t*n[s-1];let a=0,c=s-1,l;for(;a<=c;)if(r=Math.floor(a+(c-a)/2),l=n[r]-o,l<0)a=r+1;else if(l>0)c=r-1;else{c=r;break}if(r=c,n[r]===o)return r/(s-1);const h=n[r],m=n[r+1]-h,p=(o-h)/m;return(r+p)/(s-1)}getTangent(t,e){let r=t-1e-4,s=t+1e-4;r<0&&(r=0),s>1&&(s=1);const o=this.getPoint(r),a=this.getPoint(s),c=e||(o.isVector2?new at:new D);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){const n=new D,r=[],s=[],o=[],a=new D,c=new ce;for(let p=0;p<=t;p++){const g=p/t;r[p]=this.getTangentAt(g,new D)}s[0]=new D,o[0]=new D;let l=Number.MAX_VALUE;const h=Math.abs(r[0].x),f=Math.abs(r[0].y),m=Math.abs(r[0].z);h<=l&&(l=h,n.set(1,0,0)),f<=l&&(l=f,n.set(0,1,0)),m<=l&&n.set(0,0,1),a.crossVectors(r[0],n).normalize(),s[0].crossVectors(r[0],a),o[0].crossVectors(r[0],s[0]);for(let p=1;p<=t;p++){if(s[p]=s[p-1].clone(),o[p]=o[p-1].clone(),a.crossVectors(r[p-1],r[p]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(Yt(r[p-1].dot(r[p]),-1,1));s[p].applyMatrix4(c.makeRotationAxis(a,g))}o[p].crossVectors(r[p],s[p])}if(e===!0){let p=Math.acos(Yt(s[0].dot(s[t]),-1,1));p/=t,r[0].dot(a.crossVectors(s[0],s[t]))>0&&(p=-p);for(let g=1;g<=t;g++)s[g].applyMatrix4(c.makeRotationAxis(r[g],p*g)),o[g].crossVectors(r[g],s[g])}return{tangents:r,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Ho extends fn{constructor(t=0,e=0,n=1,r=1,s=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(t,e=new at){const n=e,r=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(o?s=0:s=r),this.aClockwise===!0&&!o&&(s===r?s=-r:s=s-r);const a=this.aStartAngle+t*s;let c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),f=Math.sin(this.aRotation),m=c-this.aX,p=l-this.aY;c=m*h-p*f+this.aX,l=m*f+p*h+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Eh extends Ho{constructor(t,e,n,r,s,o){super(t,e,n,n,r,s,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Go(){let i=0,t=0,e=0,n=0;function r(s,o,a,c){i=s,t=a,e=-3*s+3*o-2*a-c,n=2*s-2*o+a+c}return{initCatmullRom:function(s,o,a,c,l){r(o,a,l*(a-s),l*(c-o))},initNonuniformCatmullRom:function(s,o,a,c,l,h,f){let m=(o-s)/l-(a-s)/(l+h)+(a-o)/h,p=(a-o)/h-(c-o)/(h+f)+(c-a)/f;m*=h,p*=h,r(o,a,m,p)},calc:function(s){const o=s*s,a=o*s;return i+t*s+e*o+n*a}}}const Er=new D,Ss=new Go,ys=new Go,Es=new Go;class Nl extends fn{constructor(t=[],e=!1,n="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=r}getPoint(t,e=new D){const n=e,r=this.points,s=r.length,o=(s-(this.closed?0:1))*t;let a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:c===0&&a===s-1&&(a=s-2,c=1);let l,h;this.closed||a>0?l=r[(a-1)%s]:(Er.subVectors(r[0],r[1]).add(r[0]),l=Er);const f=r[a%s],m=r[(a+1)%s];if(this.closed||a+2<s?h=r[(a+2)%s]:(Er.subVectors(r[s-1],r[s-2]).add(r[s-1]),h=Er),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let g=Math.pow(l.distanceToSquared(f),p),x=Math.pow(f.distanceToSquared(m),p),d=Math.pow(m.distanceToSquared(h),p);x<1e-4&&(x=1),g<1e-4&&(g=x),d<1e-4&&(d=x),Ss.initNonuniformCatmullRom(l.x,f.x,m.x,h.x,g,x,d),ys.initNonuniformCatmullRom(l.y,f.y,m.y,h.y,g,x,d),Es.initNonuniformCatmullRom(l.z,f.z,m.z,h.z,g,x,d)}else this.curveType==="catmullrom"&&(Ss.initCatmullRom(l.x,f.x,m.x,h.x,this.tension),ys.initCatmullRom(l.y,f.y,m.y,h.y,this.tension),Es.initCatmullRom(l.z,f.z,m.z,h.z,this.tension));return n.set(Ss.calc(c),ys.calc(c),Es.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const r=t.points[e];this.points.push(r.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const r=this.points[e];t.points.push(r.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const r=t.points[e];this.points.push(new D().fromArray(r))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function wa(i,t,e,n,r){const s=(n-t)*.5,o=(r-e)*.5,a=i*i,c=i*a;return(2*e-2*n+s+o)*c+(-3*e+3*n-2*s-o)*a+s*i+e}function Th(i,t){const e=1-i;return e*e*t}function bh(i,t){return 2*(1-i)*i*t}function Ah(i,t){return i*i*t}function Gi(i,t,e,n){return Th(i,t)+bh(i,e)+Ah(i,n)}function wh(i,t){const e=1-i;return e*e*e*t}function Rh(i,t){const e=1-i;return 3*e*e*i*t}function Ch(i,t){return 3*(1-i)*i*i*t}function Ph(i,t){return i*i*i*t}function Vi(i,t,e,n,r){return wh(i,t)+Rh(i,e)+Ch(i,n)+Ph(i,r)}class Fl extends fn{constructor(t=new at,e=new at,n=new at,r=new at){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=r}getPoint(t,e=new at){const n=e,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(Vi(t,r.x,s.x,o.x,a.x),Vi(t,r.y,s.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Lh extends fn{constructor(t=new D,e=new D,n=new D,r=new D){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=r}getPoint(t,e=new D){const n=e,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(Vi(t,r.x,s.x,o.x,a.x),Vi(t,r.y,s.y,o.y,a.y),Vi(t,r.z,s.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Ol extends fn{constructor(t=new at,e=new at){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new at){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new at){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Ih extends fn{constructor(t=new D,e=new D){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new D){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new D){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Bl extends fn{constructor(t=new at,e=new at,n=new at){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new at){const n=e,r=this.v0,s=this.v1,o=this.v2;return n.set(Gi(t,r.x,s.x,o.x),Gi(t,r.y,s.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class zl extends fn{constructor(t=new D,e=new D,n=new D){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new D){const n=e,r=this.v0,s=this.v1,o=this.v2;return n.set(Gi(t,r.x,s.x,o.x),Gi(t,r.y,s.y,o.y),Gi(t,r.z,s.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class kl extends fn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new at){const n=e,r=this.points,s=(r.length-1)*t,o=Math.floor(s),a=s-o,c=r[o===0?o:o-1],l=r[o],h=r[o>r.length-2?r.length-1:o+1],f=r[o>r.length-3?r.length-1:o+2];return n.set(wa(a,c.x,l.x,h.x,f.x),wa(a,c.y,l.y,h.y,f.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const r=t.points[e];this.points.push(r.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const r=this.points[e];t.points.push(r.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const r=t.points[e];this.points.push(new at().fromArray(r))}return this}}var Gr=Object.freeze({__proto__:null,ArcCurve:Eh,CatmullRomCurve3:Nl,CubicBezierCurve:Fl,CubicBezierCurve3:Lh,EllipseCurve:Ho,LineCurve:Ol,LineCurve3:Ih,QuadraticBezierCurve:Bl,QuadraticBezierCurve3:zl,SplineCurve:kl});class Dh extends fn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Gr[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),r=this.getCurveLengths();let s=0;for(;s<r.length;){if(r[s]>=n){const o=r[s]-n,a=this.curves[s],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,e)}s++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,r=this.curves.length;n<r;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let r=0,s=this.curves;r<s.length;r++){const o=s[r],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,c=o.getPoints(a);for(let l=0;l<c.length;l++){const h=c[l];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const r=t.curves[e];this.curves.push(r.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const r=this.curves[e];t.curves.push(r.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const r=t.curves[e];this.curves.push(new Gr[r.type]().fromJSON(r))}return this}}class Ra extends Dh{constructor(t){super(),this.type="Path",this.currentPoint=new at,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new Ol(this.currentPoint.clone(),new at(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,r){const s=new Bl(this.currentPoint.clone(),new at(t,e),new at(n,r));return this.curves.push(s),this.currentPoint.set(n,r),this}bezierCurveTo(t,e,n,r,s,o){const a=new Fl(this.currentPoint.clone(),new at(t,e),new at(n,r),new at(s,o));return this.curves.push(a),this.currentPoint.set(s,o),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new kl(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,r,s,o){const a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,e+c,n,r,s,o),this}absarc(t,e,n,r,s,o){return this.absellipse(t,e,n,n,r,s,o),this}ellipse(t,e,n,r,s,o,a,c){const l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+l,e+h,n,r,s,o,a,c),this}absellipse(t,e,n,r,s,o,a,c){const l=new Ho(t,e,n,r,s,o,a,c);if(this.curves.length>0){const f=l.getPoint(0);f.equals(this.currentPoint)||this.lineTo(f.x,f.y)}this.curves.push(l);const h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class er extends Ra{constructor(t){super(t),this.uuid=wi(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,r=this.holes.length;n<r;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const r=t.holes[e];this.holes.push(r.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const r=this.holes[e];t.holes.push(r.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const r=t.holes[e];this.holes.push(new Ra().fromJSON(r))}return this}}function Uh(i,t,e=2){const n=t&&t.length,r=n?t[0]*e:i.length;let s=Hl(i,0,r,e,!0);const o=[];if(!s||s.next===s.prev)return o;let a,c,l;if(n&&(s=zh(i,t,s,e)),i.length>80*e){a=1/0,c=1/0;let h=-1/0,f=-1/0;for(let m=e;m<r;m+=e){const p=i[m],g=i[m+1];p<a&&(a=p),g<c&&(c=g),p>h&&(h=p),g>f&&(f=g)}l=Math.max(h-a,f-c),l=l!==0?32767/l:0}return Ji(s,o,e,a,c,l,0),o}function Hl(i,t,e,n,r){let s;if(r===Zh(i,t,e,n)>0)for(let o=t;o<e;o+=n)s=Ca(o/n|0,i[o],i[o+1],s);else for(let o=e-n;o>=t;o-=n)s=Ca(o/n|0,i[o],i[o+1],s);return s&&bi(s,s.next)&&($i(s),s=s.next),s}function jn(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(bi(e,e.next)||de(e.prev,e,e.next)===0)){if($i(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Ji(i,t,e,n,r,s,o){if(!i)return;!o&&s&&Wh(i,n,r,s);let a=i;for(;i.prev!==i.next;){const c=i.prev,l=i.next;if(s?Fh(i,n,r,s):Nh(i)){t.push(c.i,i.i,l.i),$i(i),i=l.next,a=l.next;continue}if(i=l,i===a){o?o===1?(i=Oh(jn(i),t),Ji(i,t,e,n,r,s,2)):o===2&&Bh(i,t,e,n,r,s):Ji(jn(i),t,e,n,r,s,1);break}}}function Nh(i){const t=i.prev,e=i,n=i.next;if(de(t,e,n)>=0)return!1;const r=t.x,s=e.x,o=n.x,a=t.y,c=e.y,l=n.y,h=Math.min(r,s,o),f=Math.min(a,c,l),m=Math.max(r,s,o),p=Math.max(a,c,l);let g=n.next;for(;g!==t;){if(g.x>=h&&g.x<=m&&g.y>=f&&g.y<=p&&ki(r,a,s,c,o,l,g.x,g.y)&&de(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function Fh(i,t,e,n){const r=i.prev,s=i,o=i.next;if(de(r,s,o)>=0)return!1;const a=r.x,c=s.x,l=o.x,h=r.y,f=s.y,m=o.y,p=Math.min(a,c,l),g=Math.min(h,f,m),x=Math.max(a,c,l),d=Math.max(h,f,m),u=To(p,g,t,e,n),S=To(x,d,t,e,n);let y=i.prevZ,_=i.nextZ;for(;y&&y.z>=u&&_&&_.z<=S;){if(y.x>=p&&y.x<=x&&y.y>=g&&y.y<=d&&y!==r&&y!==o&&ki(a,h,c,f,l,m,y.x,y.y)&&de(y.prev,y,y.next)>=0||(y=y.prevZ,_.x>=p&&_.x<=x&&_.y>=g&&_.y<=d&&_!==r&&_!==o&&ki(a,h,c,f,l,m,_.x,_.y)&&de(_.prev,_,_.next)>=0))return!1;_=_.nextZ}for(;y&&y.z>=u;){if(y.x>=p&&y.x<=x&&y.y>=g&&y.y<=d&&y!==r&&y!==o&&ki(a,h,c,f,l,m,y.x,y.y)&&de(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;_&&_.z<=S;){if(_.x>=p&&_.x<=x&&_.y>=g&&_.y<=d&&_!==r&&_!==o&&ki(a,h,c,f,l,m,_.x,_.y)&&de(_.prev,_,_.next)>=0)return!1;_=_.nextZ}return!0}function Oh(i,t){let e=i;do{const n=e.prev,r=e.next.next;!bi(n,r)&&Vl(n,e,e.next,r)&&Zi(n,r)&&Zi(r,n)&&(t.push(n.i,e.i,r.i),$i(e),$i(e.next),e=i=r),e=e.next}while(e!==i);return jn(e)}function Bh(i,t,e,n,r,s){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&Yh(o,a)){let c=Wl(o,a);o=jn(o,o.next),c=jn(c,c.next),Ji(o,t,e,n,r,s,0),Ji(c,t,e,n,r,s,0);return}a=a.next}o=o.next}while(o!==i)}function zh(i,t,e,n){const r=[];for(let s=0,o=t.length;s<o;s++){const a=t[s]*n,c=s<o-1?t[s+1]*n:i.length,l=Hl(i,a,c,n,!1);l===l.next&&(l.steiner=!0),r.push(qh(l))}r.sort(kh);for(let s=0;s<r.length;s++)e=Hh(r[s],e);return e}function kh(i,t){let e=i.x-t.x;if(e===0&&(e=i.y-t.y,e===0)){const n=(i.next.y-i.y)/(i.next.x-i.x),r=(t.next.y-t.y)/(t.next.x-t.x);e=n-r}return e}function Hh(i,t){const e=Gh(i,t);if(!e)return t;const n=Wl(e,i);return jn(n,n.next),jn(e,e.next)}function Gh(i,t){let e=t;const n=i.x,r=i.y;let s=-1/0,o;if(bi(i,e))return e;do{if(bi(i,e.next))return e.next;if(r<=e.y&&r>=e.next.y&&e.next.y!==e.y){const f=e.x+(r-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(f<=n&&f>s&&(s=f,o=e.x<e.next.x?e:e.next,f===n))return o}e=e.next}while(e!==t);if(!o)return null;const a=o,c=o.x,l=o.y;let h=1/0;e=o;do{if(n>=e.x&&e.x>=c&&n!==e.x&&Gl(r<l?n:s,r,c,l,r<l?s:n,r,e.x,e.y)){const f=Math.abs(r-e.y)/(n-e.x);Zi(e,i)&&(f<h||f===h&&(e.x>o.x||e.x===o.x&&Vh(o,e)))&&(o=e,h=f)}e=e.next}while(e!==a);return o}function Vh(i,t){return de(i.prev,i,t.prev)<0&&de(t.next,i,i.next)<0}function Wh(i,t,e,n){let r=i;do r.z===0&&(r.z=To(r.x,r.y,t,e,n)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==i);r.prevZ.nextZ=null,r.prevZ=null,Xh(r)}function Xh(i){let t,e=1;do{let n=i,r;i=null;let s=null;for(t=0;n;){t++;let o=n,a=0;for(let l=0;l<e&&(a++,o=o.nextZ,!!o);l++);let c=e;for(;a>0||c>0&&o;)a!==0&&(c===0||!o||n.z<=o.z)?(r=n,n=n.nextZ,a--):(r=o,o=o.nextZ,c--),s?s.nextZ=r:i=r,r.prevZ=s,s=r;n=o}s.nextZ=null,e*=2}while(t>1);return i}function To(i,t,e,n,r){return i=(i-e)*r|0,t=(t-n)*r|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function qh(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function Gl(i,t,e,n,r,s,o,a){return(r-o)*(t-a)>=(i-o)*(s-a)&&(i-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(s-a)>=(r-o)*(n-a)}function ki(i,t,e,n,r,s,o,a){return!(i===o&&t===a)&&Gl(i,t,e,n,r,s,o,a)}function Yh(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!Kh(i,t)&&(Zi(i,t)&&Zi(t,i)&&Jh(i,t)&&(de(i.prev,i,t.prev)||de(i,t.prev,t))||bi(i,t)&&de(i.prev,i,i.next)>0&&de(t.prev,t,t.next)>0)}function de(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function bi(i,t){return i.x===t.x&&i.y===t.y}function Vl(i,t,e,n){const r=br(de(i,t,e)),s=br(de(i,t,n)),o=br(de(e,n,i)),a=br(de(e,n,t));return!!(r!==s&&o!==a||r===0&&Tr(i,e,t)||s===0&&Tr(i,n,t)||o===0&&Tr(e,i,n)||a===0&&Tr(e,t,n))}function Tr(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function br(i){return i>0?1:i<0?-1:0}function Kh(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&Vl(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function Zi(i,t){return de(i.prev,i,i.next)<0?de(i,t,i.next)>=0&&de(i,i.prev,t)>=0:de(i,t,i.prev)<0||de(i,i.next,t)<0}function Jh(i,t){let e=i,n=!1;const r=(i.x+t.x)/2,s=(i.y+t.y)/2;do e.y>s!=e.next.y>s&&e.next.y!==e.y&&r<(e.next.x-e.x)*(s-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function Wl(i,t){const e=bo(i.i,i.x,i.y),n=bo(t.i,t.x,t.y),r=i.next,s=t.prev;return i.next=t,t.prev=i,e.next=r,r.prev=e,n.next=e,e.prev=n,s.next=n,n.prev=s,n}function Ca(i,t,e,n){const r=bo(i,t,e);return n?(r.next=n.next,r.prev=n,n.next.prev=r,n.next=r):(r.prev=r,r.next=r),r}function $i(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function bo(i,t,e){return{i,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Zh(i,t,e,n){let r=0;for(let s=t,o=e-n;s<e;s+=n)r+=(i[o]-i[s])*(i[s+1]+i[o+1]),o=s;return r}class $h{static triangulate(t,e,n=2){return Uh(t,e,n)}}class Mn{static area(t){const e=t.length;let n=0;for(let r=e-1,s=0;s<e;r=s++)n+=t[r].x*t[s].y-t[s].x*t[r].y;return n*.5}static isClockWise(t){return Mn.area(t)<0}static triangulateShape(t,e){const n=[],r=[],s=[];Pa(t),La(n,t);let o=t.length;e.forEach(Pa);for(let c=0;c<e.length;c++)r.push(o),o+=e[c].length,La(n,e[c]);const a=$h.triangulate(n,r);for(let c=0;c<a.length;c+=3)s.push(a.slice(c,c+3));return s}}function Pa(i){const t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function La(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}class Vo extends Ee{constructor(t=new er([new at(.5,.5),new at(-.5,.5),new at(-.5,-.5),new at(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,r=[],s=[];for(let a=0,c=t.length;a<c;a++){const l=t[a];o(l)}this.setAttribute("position",new $t(r,3)),this.setAttribute("uv",new $t(s,2)),this.computeVertexNormals();function o(a){const c=[],l=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,f=e.depth!==void 0?e.depth:1;let m=e.bevelEnabled!==void 0?e.bevelEnabled:!0,p=e.bevelThickness!==void 0?e.bevelThickness:.2,g=e.bevelSize!==void 0?e.bevelSize:p-.1,x=e.bevelOffset!==void 0?e.bevelOffset:0,d=e.bevelSegments!==void 0?e.bevelSegments:3;const u=e.extrudePath,S=e.UVGenerator!==void 0?e.UVGenerator:jh;let y,_=!1,R,C,w,U;u&&(y=u.getSpacedPoints(h),_=!0,m=!1,R=u.computeFrenetFrames(h,!1),C=new D,w=new D,U=new D),m||(d=0,p=0,g=0,x=0);const b=a.extractPoints(l);let T=b.shape;const L=b.holes;if(!Mn.isClockWise(T)){T=T.reverse();for(let st=0,et=L.length;st<et;st++){const tt=L[st];Mn.isClockWise(tt)&&(L[st]=tt.reverse())}}function V(st){const tt=10000000000000001e-36;let Q=st[0];for(let _t=1;_t<=st.length;_t++){const lt=_t%st.length,vt=st[lt],Ht=vt.x-Q.x,kt=vt.y-Q.y,A=Ht*Ht+kt*kt,v=Math.max(Math.abs(vt.x),Math.abs(vt.y),Math.abs(Q.x),Math.abs(Q.y)),k=tt*v*v;if(A<=k){st.splice(lt,1),_t--;continue}Q=vt}}V(T),L.forEach(V);const J=L.length,Y=T;for(let st=0;st<J;st++){const et=L[st];T=T.concat(et)}function X(st,et,tt){return et||console.error("THREE.ExtrudeGeometry: vec does not exist"),st.clone().addScaledVector(et,tt)}const j=T.length;function M(st,et,tt){let Q,_t,lt;const vt=st.x-et.x,Ht=st.y-et.y,kt=tt.x-st.x,A=tt.y-st.y,v=vt*vt+Ht*Ht,k=vt*A-Ht*kt;if(Math.abs(k)>Number.EPSILON){const K=Math.sqrt(v),rt=Math.sqrt(kt*kt+A*A),$=et.x-Ht/K,It=et.y+vt/K,mt=tt.x-A/rt,Ct=tt.y+kt/rt,Pt=((mt-$)*A-(Ct-It)*kt)/(vt*A-Ht*kt);Q=$+vt*Pt-st.x,_t=It+Ht*Pt-st.y;const ht=Q*Q+_t*_t;if(ht<=2)return new at(Q,_t);lt=Math.sqrt(ht/2)}else{let K=!1;vt>Number.EPSILON?kt>Number.EPSILON&&(K=!0):vt<-Number.EPSILON?kt<-Number.EPSILON&&(K=!0):Math.sign(Ht)===Math.sign(A)&&(K=!0),K?(Q=-Ht,_t=vt,lt=Math.sqrt(v)):(Q=vt,_t=Ht,lt=Math.sqrt(v/2))}return new at(Q/lt,_t/lt)}const I=[];for(let st=0,et=Y.length,tt=et-1,Q=st+1;st<et;st++,tt++,Q++)tt===et&&(tt=0),Q===et&&(Q=0),I[st]=M(Y[st],Y[tt],Y[Q]);const O=[];let H,Z=I.concat();for(let st=0,et=J;st<et;st++){const tt=L[st];H=[];for(let Q=0,_t=tt.length,lt=_t-1,vt=Q+1;Q<_t;Q++,lt++,vt++)lt===_t&&(lt=0),vt===_t&&(vt=0),H[Q]=M(tt[Q],tt[lt],tt[vt]);O.push(H),Z=Z.concat(H)}let ot;if(d===0)ot=Mn.triangulateShape(Y,L);else{const st=[],et=[];for(let tt=0;tt<d;tt++){const Q=tt/d,_t=p*Math.cos(Q*Math.PI/2),lt=g*Math.sin(Q*Math.PI/2)+x;for(let vt=0,Ht=Y.length;vt<Ht;vt++){const kt=X(Y[vt],I[vt],lt);Dt(kt.x,kt.y,-_t),Q===0&&st.push(kt)}for(let vt=0,Ht=J;vt<Ht;vt++){const kt=L[vt];H=O[vt];const A=[];for(let v=0,k=kt.length;v<k;v++){const K=X(kt[v],H[v],lt);Dt(K.x,K.y,-_t),Q===0&&A.push(K)}Q===0&&et.push(A)}}ot=Mn.triangulateShape(st,et)}const gt=ot.length,ct=g+x;for(let st=0;st<j;st++){const et=m?X(T[st],Z[st],ct):T[st];_?(w.copy(R.normals[0]).multiplyScalar(et.x),C.copy(R.binormals[0]).multiplyScalar(et.y),U.copy(y[0]).add(w).add(C),Dt(U.x,U.y,U.z)):Dt(et.x,et.y,0)}for(let st=1;st<=h;st++)for(let et=0;et<j;et++){const tt=m?X(T[et],Z[et],ct):T[et];_?(w.copy(R.normals[st]).multiplyScalar(tt.x),C.copy(R.binormals[st]).multiplyScalar(tt.y),U.copy(y[st]).add(w).add(C),Dt(U.x,U.y,U.z)):Dt(tt.x,tt.y,f/h*st)}for(let st=d-1;st>=0;st--){const et=st/d,tt=p*Math.cos(et*Math.PI/2),Q=g*Math.sin(et*Math.PI/2)+x;for(let _t=0,lt=Y.length;_t<lt;_t++){const vt=X(Y[_t],I[_t],Q);Dt(vt.x,vt.y,f+tt)}for(let _t=0,lt=L.length;_t<lt;_t++){const vt=L[_t];H=O[_t];for(let Ht=0,kt=vt.length;Ht<kt;Ht++){const A=X(vt[Ht],H[Ht],Q);_?Dt(A.x,A.y+y[h-1].y,y[h-1].x+tt):Dt(A.x,A.y,f+tt)}}}G(),it();function G(){const st=r.length/3;if(m){let et=0,tt=j*et;for(let Q=0;Q<gt;Q++){const _t=ot[Q];wt(_t[2]+tt,_t[1]+tt,_t[0]+tt)}et=h+d*2,tt=j*et;for(let Q=0;Q<gt;Q++){const _t=ot[Q];wt(_t[0]+tt,_t[1]+tt,_t[2]+tt)}}else{for(let et=0;et<gt;et++){const tt=ot[et];wt(tt[2],tt[1],tt[0])}for(let et=0;et<gt;et++){const tt=ot[et];wt(tt[0]+j*h,tt[1]+j*h,tt[2]+j*h)}}n.addGroup(st,r.length/3-st,0)}function it(){const st=r.length/3;let et=0;Tt(Y,et),et+=Y.length;for(let tt=0,Q=L.length;tt<Q;tt++){const _t=L[tt];Tt(_t,et),et+=_t.length}n.addGroup(st,r.length/3-st,1)}function Tt(st,et){let tt=st.length;for(;--tt>=0;){const Q=tt;let _t=tt-1;_t<0&&(_t=st.length-1);for(let lt=0,vt=h+d*2;lt<vt;lt++){const Ht=j*lt,kt=j*(lt+1),A=et+Q+Ht,v=et+_t+Ht,k=et+_t+kt,K=et+Q+kt;Kt(A,v,k,K)}}}function Dt(st,et,tt){c.push(st),c.push(et),c.push(tt)}function wt(st,et,tt){ae(st),ae(et),ae(tt);const Q=r.length/3,_t=S.generateTopUV(n,r,Q-3,Q-2,Q-1);P(_t[0]),P(_t[1]),P(_t[2])}function Kt(st,et,tt,Q){ae(st),ae(et),ae(Q),ae(et),ae(tt),ae(Q);const _t=r.length/3,lt=S.generateSideWallUV(n,r,_t-6,_t-3,_t-2,_t-1);P(lt[0]),P(lt[1]),P(lt[3]),P(lt[1]),P(lt[2]),P(lt[3])}function ae(st){r.push(c[st*3+0]),r.push(c[st*3+1]),r.push(c[st*3+2])}function P(st){s.push(st.x),s.push(st.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return Qh(e,n,t)}static fromJSON(t,e){const n=[];for(let s=0,o=t.shapes.length;s<o;s++){const a=e[t.shapes[s]];n.push(a)}const r=t.options.extrudePath;return r!==void 0&&(t.options.extrudePath=new Gr[r.type]().fromJSON(r)),new Vo(n,t.options)}}const jh={generateTopUV:function(i,t,e,n,r){const s=t[e*3],o=t[e*3+1],a=t[n*3],c=t[n*3+1],l=t[r*3],h=t[r*3+1];return[new at(s,o),new at(a,c),new at(l,h)]},generateSideWallUV:function(i,t,e,n,r,s){const o=t[e*3],a=t[e*3+1],c=t[e*3+2],l=t[n*3],h=t[n*3+1],f=t[n*3+2],m=t[r*3],p=t[r*3+1],g=t[r*3+2],x=t[s*3],d=t[s*3+1],u=t[s*3+2];return Math.abs(a-h)<Math.abs(o-l)?[new at(o,1-c),new at(l,1-f),new at(m,1-g),new at(x,1-u)]:[new at(a,1-c),new at(h,1-f),new at(p,1-g),new at(d,1-u)]}};function Qh(i,t,e){if(e.shapes=[],Array.isArray(i))for(let n=0,r=i.length;n<r;n++){const s=i[n];e.shapes.push(s.uuid)}else e.shapes.push(i.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class Xr extends Ee{constructor(t=[new at(0,-.5),new at(.5,0),new at(0,.5)],e=12,n=0,r=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:r},e=Math.floor(e),r=Yt(r,0,Math.PI*2);const s=[],o=[],a=[],c=[],l=[],h=1/e,f=new D,m=new at,p=new D,g=new D,x=new D;let d=0,u=0;for(let S=0;S<=t.length-1;S++)switch(S){case 0:d=t[S+1].x-t[S].x,u=t[S+1].y-t[S].y,p.x=u*1,p.y=-d,p.z=u*0,x.copy(p),p.normalize(),c.push(p.x,p.y,p.z);break;case t.length-1:c.push(x.x,x.y,x.z);break;default:d=t[S+1].x-t[S].x,u=t[S+1].y-t[S].y,p.x=u*1,p.y=-d,p.z=u*0,g.copy(p),p.x+=x.x,p.y+=x.y,p.z+=x.z,p.normalize(),c.push(p.x,p.y,p.z),x.copy(g)}for(let S=0;S<=e;S++){const y=n+S*h*r,_=Math.sin(y),R=Math.cos(y);for(let C=0;C<=t.length-1;C++){f.x=t[C].x*_,f.y=t[C].y,f.z=t[C].x*R,o.push(f.x,f.y,f.z),m.x=S/e,m.y=C/(t.length-1),a.push(m.x,m.y);const w=c[3*C+0]*_,U=c[3*C+1],b=c[3*C+0]*R;l.push(w,U,b)}}for(let S=0;S<e;S++)for(let y=0;y<t.length-1;y++){const _=y+S*t.length,R=_,C=_+t.length,w=_+t.length+1,U=_+1;s.push(R,C,U),s.push(w,U,C)}this.setIndex(s),this.setAttribute("position",new $t(o,3)),this.setAttribute("uv",new $t(a,2)),this.setAttribute("normal",new $t(l,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Xr(t.points,t.segments,t.phiStart,t.phiLength)}}class In extends Ee{constructor(t=1,e=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:r};const s=t/2,o=e/2,a=Math.floor(n),c=Math.floor(r),l=a+1,h=c+1,f=t/a,m=e/c,p=[],g=[],x=[],d=[];for(let u=0;u<h;u++){const S=u*m-o;for(let y=0;y<l;y++){const _=y*f-s;g.push(_,-S,0),x.push(0,0,1),d.push(y/a),d.push(1-u/c)}}for(let u=0;u<c;u++)for(let S=0;S<a;S++){const y=S+l*u,_=S+l*(u+1),R=S+1+l*(u+1),C=S+1+l*u;p.push(y,_,C),p.push(_,R,C)}this.setIndex(p),this.setAttribute("position",new $t(g,3)),this.setAttribute("normal",new $t(x,3)),this.setAttribute("uv",new $t(d,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new In(t.width,t.height,t.widthSegments,t.heightSegments)}}class qr extends Ee{constructor(t=new er([new at(0,.5),new at(-.5,-.5),new at(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};const n=[],r=[],s=[],o=[];let a=0,c=0;if(Array.isArray(t)===!1)l(t);else for(let h=0;h<t.length;h++)l(t[h]),this.addGroup(a,c,h),a+=c,c=0;this.setIndex(n),this.setAttribute("position",new $t(r,3)),this.setAttribute("normal",new $t(s,3)),this.setAttribute("uv",new $t(o,2));function l(h){const f=r.length/3,m=h.extractPoints(e);let p=m.shape;const g=m.holes;Mn.isClockWise(p)===!1&&(p=p.reverse());for(let d=0,u=g.length;d<u;d++){const S=g[d];Mn.isClockWise(S)===!0&&(g[d]=S.reverse())}const x=Mn.triangulateShape(p,g);for(let d=0,u=g.length;d<u;d++){const S=g[d];p=p.concat(S)}for(let d=0,u=p.length;d<u;d++){const S=p[d];r.push(S.x,S.y,0),s.push(0,0,1),o.push(S.x,S.y)}for(let d=0,u=x.length;d<u;d++){const S=x[d],y=S[0]+f,_=S[1]+f,R=S[2]+f;n.push(y,_,R),c+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes;return tu(e,t)}static fromJSON(t,e){const n=[];for(let r=0,s=t.shapes.length;r<s;r++){const o=e[t.shapes[r]];n.push(o)}return new qr(n,t.curveSegments)}}function tu(i,t){if(t.shapes=[],Array.isArray(i))for(let e=0,n=i.length;e<n;e++){const r=i[e];t.shapes.push(r.uuid)}else t.shapes.push(i.uuid);return t}class Wo extends Ee{constructor(t=1,e=32,n=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(o+a,Math.PI);let l=0;const h=[],f=new D,m=new D,p=[],g=[],x=[],d=[];for(let u=0;u<=n;u++){const S=[],y=u/n;let _=0;u===0&&o===0?_=.5/e:u===n&&c===Math.PI&&(_=-.5/e);for(let R=0;R<=e;R++){const C=R/e;f.x=-t*Math.cos(r+C*s)*Math.sin(o+y*a),f.y=t*Math.cos(o+y*a),f.z=t*Math.sin(r+C*s)*Math.sin(o+y*a),g.push(f.x,f.y,f.z),m.copy(f).normalize(),x.push(m.x,m.y,m.z),d.push(C+_,1-y),S.push(l++)}h.push(S)}for(let u=0;u<n;u++)for(let S=0;S<e;S++){const y=h[u][S+1],_=h[u][S],R=h[u+1][S],C=h[u+1][S+1];(u!==0||o>0)&&p.push(y,_,C),(u!==n-1||c<Math.PI)&&p.push(_,R,C)}this.setIndex(p),this.setAttribute("position",new $t(g,3)),this.setAttribute("normal",new $t(x,3)),this.setAttribute("uv",new $t(d,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Wo(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Xo extends Ee{constructor(t=1,e=.4,n=12,r=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:r,arc:s},n=Math.floor(n),r=Math.floor(r);const o=[],a=[],c=[],l=[],h=new D,f=new D,m=new D;for(let p=0;p<=n;p++)for(let g=0;g<=r;g++){const x=g/r*s,d=p/n*Math.PI*2;f.x=(t+e*Math.cos(d))*Math.cos(x),f.y=(t+e*Math.cos(d))*Math.sin(x),f.z=e*Math.sin(d),a.push(f.x,f.y,f.z),h.x=t*Math.cos(x),h.y=t*Math.sin(x),m.subVectors(f,h).normalize(),c.push(m.x,m.y,m.z),l.push(g/r),l.push(p/n)}for(let p=1;p<=n;p++)for(let g=1;g<=r;g++){const x=(r+1)*p+g-1,d=(r+1)*(p-1)+g-1,u=(r+1)*(p-1)+g,S=(r+1)*p+g;o.push(x,d,S),o.push(d,u,S)}this.setIndex(o),this.setAttribute("position",new $t(a,3)),this.setAttribute("normal",new $t(c,3)),this.setAttribute("uv",new $t(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Xo(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class qo extends Ee{constructor(t=new zl(new D(-1,-1,0),new D(-1,1,0),new D(1,1,0)),e=64,n=1,r=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:r,closed:s};const o=t.computeFrenetFrames(e,s);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const a=new D,c=new D,l=new at;let h=new D;const f=[],m=[],p=[],g=[];x(),this.setIndex(g),this.setAttribute("position",new $t(f,3)),this.setAttribute("normal",new $t(m,3)),this.setAttribute("uv",new $t(p,2));function x(){for(let y=0;y<e;y++)d(y);d(s===!1?e:0),S(),u()}function d(y){h=t.getPointAt(y/e,h);const _=o.normals[y],R=o.binormals[y];for(let C=0;C<=r;C++){const w=C/r*Math.PI*2,U=Math.sin(w),b=-Math.cos(w);c.x=b*_.x+U*R.x,c.y=b*_.y+U*R.y,c.z=b*_.z+U*R.z,c.normalize(),m.push(c.x,c.y,c.z),a.x=h.x+n*c.x,a.y=h.y+n*c.y,a.z=h.z+n*c.z,f.push(a.x,a.y,a.z)}}function u(){for(let y=1;y<=e;y++)for(let _=1;_<=r;_++){const R=(r+1)*(y-1)+(_-1),C=(r+1)*y+(_-1),w=(r+1)*y+_,U=(r+1)*(y-1)+_;g.push(R,C,U),g.push(C,w,U)}}function S(){for(let y=0;y<=e;y++)for(let _=0;_<=r;_++)l.x=y/e,l.y=_/r,p.push(l.x,l.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new qo(new Gr[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}class je extends Ri{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new qt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new qt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Oo,this.normalScale=new at(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new en,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class eu extends je{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new at(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Yt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new qt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new qt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new qt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class nu extends Ri{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new qt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new qt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Oo,this.normalScale=new at(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new en,this.combine=Co,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class iu extends Ri{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Dc,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class ru extends Ri{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Yo extends ye{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new qt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class su extends Yo{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ye.DEFAULT_UP),this.updateMatrix(),this.groundColor=new qt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Ts=new ce,Ia=new D,Da=new D;class Xl{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new at(512,512),this.mapType=un,this.map=null,this.mapPass=null,this.matrix=new ce,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new zo,this._frameExtents=new at(1,1),this._viewportCount=1,this._viewports=[new se(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Ia.setFromMatrixPosition(t.matrixWorld),e.position.copy(Ia),Da.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Da),e.updateMatrixWorld(),Ts.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ts,e.coordinateSystem,e.reversedDepth),e.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Ts)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const Ua=new ce,Bi=new D,bs=new D;class ou extends Xl{constructor(){super(new Ge(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new at(4,2),this._viewportCount=6,this._viewports=[new se(2,1,1,1),new se(0,1,1,1),new se(3,1,1,1),new se(1,1,1,1),new se(3,0,1,1),new se(1,0,1,1)],this._cubeDirections=[new D(1,0,0),new D(-1,0,0),new D(0,0,1),new D(0,0,-1),new D(0,1,0),new D(0,-1,0)],this._cubeUps=[new D(0,1,0),new D(0,1,0),new D(0,1,0),new D(0,1,0),new D(0,0,1),new D(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,r=this.matrix,s=t.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),Bi.setFromMatrixPosition(t.matrixWorld),n.position.copy(Bi),bs.copy(n.position),bs.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(bs),n.updateMatrixWorld(),r.makeTranslation(-Bi.x,-Bi.y,-Bi.z),Ua.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ua,n.coordinateSystem,n.reversedDepth)}}class Nr extends Yo{constructor(t,e,n=0,r=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=r,this.shadow=new ou}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class ql extends Cl{constructor(t=-1,e=1,n=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-t,o=n+t,a=r+e,c=r-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,o=s+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class au extends Xl{constructor(){super(new ql(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Na extends Yo{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ye.DEFAULT_UP),this.updateMatrix(),this.target=new ye,this.shadow=new au}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class lu extends Ge{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}function Fa(i,t,e,n){const r=cu(n);switch(e){case vl:return i*t;case Do:return i*t/r.components*r.byteLength;case Uo:return i*t/r.components*r.byteLength;case Ml:return i*t*2/r.components*r.byteLength;case No:return i*t*2/r.components*r.byteLength;case xl:return i*t*3/r.components*r.byteLength;case tn:return i*t*4/r.components*r.byteLength;case Fo:return i*t*4/r.components*r.byteLength;case Lr:case Ir:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Dr:case Ur:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Js:case $s:return Math.max(i,16)*Math.max(t,8)/4;case Ks:case Zs:return Math.max(i,8)*Math.max(t,8)/2;case js:case Qs:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case to:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case eo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case no:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case io:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case ro:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case so:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case oo:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case ao:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case lo:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case co:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case ho:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case uo:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case fo:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case po:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case mo:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case go:case _o:case vo:return Math.ceil(i/4)*Math.ceil(t/4)*16;case xo:case Mo:return Math.ceil(i/4)*Math.ceil(t/4)*8;case So:case yo:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function cu(i){switch(i){case un:case pl:return{byteLength:1,components:1};case Wi:case ml:case ji:return{byteLength:2,components:1};case Lo:case Io:return{byteLength:2,components:4};case Zn:case Po:case ln:return{byteLength:4,components:1};case gl:case _l:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ro}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ro);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Yl(){let i=null,t=!1,e=null,n=null;function r(s,o){e(s,o),n=i.requestAnimationFrame(r)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(r),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){i=s}}}function hu(i){const t=new WeakMap;function e(a,c){const l=a.array,h=a.usage,f=l.byteLength,m=i.createBuffer();i.bindBuffer(c,m),i.bufferData(c,l,h),a.onUploadCallback();let p;if(l instanceof Float32Array)p=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)p=i.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=i.SHORT;else if(l instanceof Uint32Array)p=i.UNSIGNED_INT;else if(l instanceof Int32Array)p=i.INT;else if(l instanceof Int8Array)p=i.BYTE;else if(l instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:m,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:f}}function n(a,c,l){const h=c.array,f=c.updateRanges;if(i.bindBuffer(l,a),f.length===0)i.bufferSubData(l,0,h);else{f.sort((p,g)=>p.start-g.start);let m=0;for(let p=1;p<f.length;p++){const g=f[m],x=f[p];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++m,f[m]=x)}f.length=m+1;for(let p=0,g=f.length;p<g;p++){const x=f[p];i.bufferSubData(l,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=t.get(a);c&&(i.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:r,remove:s,update:o}}var uu=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,fu=`#ifdef USE_ALPHAHASH
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
#endif`,du=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,pu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,mu=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,gu=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,_u=`#ifdef USE_AOMAP
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
#endif`,vu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,xu=`#ifdef USE_BATCHING
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
#endif`,Mu=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Su=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,yu=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Eu=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Tu=`#ifdef USE_IRIDESCENCE
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
#endif`,bu=`#ifdef USE_BUMPMAP
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
#endif`,Au=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,wu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Ru=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Cu=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Pu=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Lu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Iu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Du=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Uu=`#define PI 3.141592653589793
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
} // validated`,Nu=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Fu=`vec3 transformedNormal = objectNormal;
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
#endif`,Ou=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Bu=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,zu=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,ku=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Hu="gl_FragColor = linearToOutputTexel( gl_FragColor );",Gu=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Vu=`#ifdef USE_ENVMAP
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
#endif`,Wu=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Xu=`#ifdef USE_ENVMAP
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
#endif`,qu=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Yu=`#ifdef USE_ENVMAP
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
#endif`,Ku=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Ju=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Zu=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,$u=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,ju=`#ifdef USE_GRADIENTMAP
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
}`,Qu=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,tf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ef=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,nf=`uniform bool receiveShadow;
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
#endif`,rf=`#ifdef USE_ENVMAP
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
#endif`,sf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,of=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,af=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,cf=`PhysicalMaterial material;
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
#endif`,hf=`struct PhysicalMaterial {
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
#endif`,ff=`#if defined( RE_IndirectDiffuse )
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
#endif`,df=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,pf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,mf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,gf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,_f=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,vf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,xf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Mf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Sf=`#if defined( USE_POINTS_UV )
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
#endif`,yf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Ef=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Tf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,bf=`#if defined( USE_MORPHCOLORS )
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
#endif`,Rf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Cf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Pf=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Lf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,If=`#ifndef FLAT_SHADED
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
#endif`,Nf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Ff=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Of=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Bf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,zf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,kf=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Hf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Gf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Vf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Wf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Xf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,qf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Yf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Kf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Jf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Zf=`float getShadowMask() {
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
}`,$f=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,jf=`#ifdef USE_SKINNING
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
#endif`,Qf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,td=`#ifdef USE_SKINNING
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
#endif`,ed=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,nd=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,id=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,rd=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,sd=`#ifdef USE_TRANSMISSION
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
#endif`,od=`#ifdef USE_TRANSMISSION
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
#endif`,ad=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ld=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,cd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,hd=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
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
}`,fd=`uniform sampler2D t2D;
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
}`,dd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,pd=`#ifdef ENVMAP_TYPE_CUBE
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
}`,md=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,gd=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,_d=`#include <common>
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
}`,vd=`#if DEPTH_PACKING == 3200
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
}`,xd=`#define DISTANCE
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
}`,Md=`#define DISTANCE
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
}`,Sd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,yd=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ed=`uniform float scale;
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
}`,Td=`uniform vec3 diffuse;
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
}`,bd=`#include <common>
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
}`,Rd=`#define LAMBERT
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
}`,Cd=`#define MATCAP
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
}`,Pd=`#define MATCAP
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
}`,Ld=`#define NORMAL
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
}`,Id=`#define NORMAL
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
}`,Nd=`#define STANDARD
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
}`,Fd=`#define STANDARD
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
}`,Od=`#define TOON
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
}`,Bd=`#define TOON
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
}`,zd=`uniform float size;
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
}`,kd=`uniform vec3 diffuse;
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
}`,Hd=`#include <common>
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
}`,Gd=`uniform vec3 color;
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
}`,Vd=`uniform float rotation;
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
}`,Wd=`uniform vec3 diffuse;
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
}`,Xt={alphahash_fragment:uu,alphahash_pars_fragment:fu,alphamap_fragment:du,alphamap_pars_fragment:pu,alphatest_fragment:mu,alphatest_pars_fragment:gu,aomap_fragment:_u,aomap_pars_fragment:vu,batching_pars_vertex:xu,batching_vertex:Mu,begin_vertex:Su,beginnormal_vertex:yu,bsdfs:Eu,iridescence_fragment:Tu,bumpmap_pars_fragment:bu,clipping_planes_fragment:Au,clipping_planes_pars_fragment:wu,clipping_planes_pars_vertex:Ru,clipping_planes_vertex:Cu,color_fragment:Pu,color_pars_fragment:Lu,color_pars_vertex:Iu,color_vertex:Du,common:Uu,cube_uv_reflection_fragment:Nu,defaultnormal_vertex:Fu,displacementmap_pars_vertex:Ou,displacementmap_vertex:Bu,emissivemap_fragment:zu,emissivemap_pars_fragment:ku,colorspace_fragment:Hu,colorspace_pars_fragment:Gu,envmap_fragment:Vu,envmap_common_pars_fragment:Wu,envmap_pars_fragment:Xu,envmap_pars_vertex:qu,envmap_physical_pars_fragment:rf,envmap_vertex:Yu,fog_vertex:Ku,fog_pars_vertex:Ju,fog_fragment:Zu,fog_pars_fragment:$u,gradientmap_pars_fragment:ju,lightmap_pars_fragment:Qu,lights_lambert_fragment:tf,lights_lambert_pars_fragment:ef,lights_pars_begin:nf,lights_toon_fragment:sf,lights_toon_pars_fragment:of,lights_phong_fragment:af,lights_phong_pars_fragment:lf,lights_physical_fragment:cf,lights_physical_pars_fragment:hf,lights_fragment_begin:uf,lights_fragment_maps:ff,lights_fragment_end:df,logdepthbuf_fragment:pf,logdepthbuf_pars_fragment:mf,logdepthbuf_pars_vertex:gf,logdepthbuf_vertex:_f,map_fragment:vf,map_pars_fragment:xf,map_particle_fragment:Mf,map_particle_pars_fragment:Sf,metalnessmap_fragment:yf,metalnessmap_pars_fragment:Ef,morphinstance_vertex:Tf,morphcolor_vertex:bf,morphnormal_vertex:Af,morphtarget_pars_vertex:wf,morphtarget_vertex:Rf,normal_fragment_begin:Cf,normal_fragment_maps:Pf,normal_pars_fragment:Lf,normal_pars_vertex:If,normal_vertex:Df,normalmap_pars_fragment:Uf,clearcoat_normal_fragment_begin:Nf,clearcoat_normal_fragment_maps:Ff,clearcoat_pars_fragment:Of,iridescence_pars_fragment:Bf,opaque_fragment:zf,packing:kf,premultiplied_alpha_fragment:Hf,project_vertex:Gf,dithering_fragment:Vf,dithering_pars_fragment:Wf,roughnessmap_fragment:Xf,roughnessmap_pars_fragment:qf,shadowmap_pars_fragment:Yf,shadowmap_pars_vertex:Kf,shadowmap_vertex:Jf,shadowmask_pars_fragment:Zf,skinbase_vertex:$f,skinning_pars_vertex:jf,skinning_vertex:Qf,skinnormal_vertex:td,specularmap_fragment:ed,specularmap_pars_fragment:nd,tonemapping_fragment:id,tonemapping_pars_fragment:rd,transmission_fragment:sd,transmission_pars_fragment:od,uv_pars_fragment:ad,uv_pars_vertex:ld,uv_vertex:cd,worldpos_vertex:hd,background_vert:ud,background_frag:fd,backgroundCube_vert:dd,backgroundCube_frag:pd,cube_vert:md,cube_frag:gd,depth_vert:_d,depth_frag:vd,distanceRGBA_vert:xd,distanceRGBA_frag:Md,equirect_vert:Sd,equirect_frag:yd,linedashed_vert:Ed,linedashed_frag:Td,meshbasic_vert:bd,meshbasic_frag:Ad,meshlambert_vert:wd,meshlambert_frag:Rd,meshmatcap_vert:Cd,meshmatcap_frag:Pd,meshnormal_vert:Ld,meshnormal_frag:Id,meshphong_vert:Dd,meshphong_frag:Ud,meshphysical_vert:Nd,meshphysical_frag:Fd,meshtoon_vert:Od,meshtoon_frag:Bd,points_vert:zd,points_frag:kd,shadow_vert:Hd,shadow_frag:Gd,sprite_vert:Vd,sprite_frag:Wd},Mt={common:{diffuse:{value:new qt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Wt},alphaMap:{value:null},alphaMapTransform:{value:new Wt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Wt}},envmap:{envMap:{value:null},envMapRotation:{value:new Wt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Wt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Wt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Wt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Wt},normalScale:{value:new at(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Wt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Wt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Wt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Wt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new qt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new qt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Wt},alphaTest:{value:0},uvTransform:{value:new Wt}},sprite:{diffuse:{value:new qt(16777215)},opacity:{value:1},center:{value:new at(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Wt},alphaMap:{value:null},alphaMapTransform:{value:new Wt},alphaTest:{value:0}}},rn={basic:{uniforms:Ce([Mt.common,Mt.specularmap,Mt.envmap,Mt.aomap,Mt.lightmap,Mt.fog]),vertexShader:Xt.meshbasic_vert,fragmentShader:Xt.meshbasic_frag},lambert:{uniforms:Ce([Mt.common,Mt.specularmap,Mt.envmap,Mt.aomap,Mt.lightmap,Mt.emissivemap,Mt.bumpmap,Mt.normalmap,Mt.displacementmap,Mt.fog,Mt.lights,{emissive:{value:new qt(0)}}]),vertexShader:Xt.meshlambert_vert,fragmentShader:Xt.meshlambert_frag},phong:{uniforms:Ce([Mt.common,Mt.specularmap,Mt.envmap,Mt.aomap,Mt.lightmap,Mt.emissivemap,Mt.bumpmap,Mt.normalmap,Mt.displacementmap,Mt.fog,Mt.lights,{emissive:{value:new qt(0)},specular:{value:new qt(1118481)},shininess:{value:30}}]),vertexShader:Xt.meshphong_vert,fragmentShader:Xt.meshphong_frag},standard:{uniforms:Ce([Mt.common,Mt.envmap,Mt.aomap,Mt.lightmap,Mt.emissivemap,Mt.bumpmap,Mt.normalmap,Mt.displacementmap,Mt.roughnessmap,Mt.metalnessmap,Mt.fog,Mt.lights,{emissive:{value:new qt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Xt.meshphysical_vert,fragmentShader:Xt.meshphysical_frag},toon:{uniforms:Ce([Mt.common,Mt.aomap,Mt.lightmap,Mt.emissivemap,Mt.bumpmap,Mt.normalmap,Mt.displacementmap,Mt.gradientmap,Mt.fog,Mt.lights,{emissive:{value:new qt(0)}}]),vertexShader:Xt.meshtoon_vert,fragmentShader:Xt.meshtoon_frag},matcap:{uniforms:Ce([Mt.common,Mt.bumpmap,Mt.normalmap,Mt.displacementmap,Mt.fog,{matcap:{value:null}}]),vertexShader:Xt.meshmatcap_vert,fragmentShader:Xt.meshmatcap_frag},points:{uniforms:Ce([Mt.points,Mt.fog]),vertexShader:Xt.points_vert,fragmentShader:Xt.points_frag},dashed:{uniforms:Ce([Mt.common,Mt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Xt.linedashed_vert,fragmentShader:Xt.linedashed_frag},depth:{uniforms:Ce([Mt.common,Mt.displacementmap]),vertexShader:Xt.depth_vert,fragmentShader:Xt.depth_frag},normal:{uniforms:Ce([Mt.common,Mt.bumpmap,Mt.normalmap,Mt.displacementmap,{opacity:{value:1}}]),vertexShader:Xt.meshnormal_vert,fragmentShader:Xt.meshnormal_frag},sprite:{uniforms:Ce([Mt.sprite,Mt.fog]),vertexShader:Xt.sprite_vert,fragmentShader:Xt.sprite_frag},background:{uniforms:{uvTransform:{value:new Wt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Xt.background_vert,fragmentShader:Xt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Wt}},vertexShader:Xt.backgroundCube_vert,fragmentShader:Xt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Xt.cube_vert,fragmentShader:Xt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Xt.equirect_vert,fragmentShader:Xt.equirect_frag},distanceRGBA:{uniforms:Ce([Mt.common,Mt.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Xt.distanceRGBA_vert,fragmentShader:Xt.distanceRGBA_frag},shadow:{uniforms:Ce([Mt.lights,Mt.fog,{color:{value:new qt(0)},opacity:{value:1}}]),vertexShader:Xt.shadow_vert,fragmentShader:Xt.shadow_frag}};rn.physical={uniforms:Ce([rn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Wt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Wt},clearcoatNormalScale:{value:new at(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Wt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Wt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Wt},sheen:{value:0},sheenColor:{value:new qt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Wt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Wt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Wt},transmissionSamplerSize:{value:new at},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Wt},attenuationDistance:{value:0},attenuationColor:{value:new qt(0)},specularColor:{value:new qt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Wt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Wt},anisotropyVector:{value:new at},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Wt}}]),vertexShader:Xt.meshphysical_vert,fragmentShader:Xt.meshphysical_frag};const Ar={r:0,b:0,g:0},Gn=new en,Xd=new ce;function qd(i,t,e,n,r,s,o){const a=new qt(0);let c=s===!0?0:1,l,h,f=null,m=0,p=null;function g(y){let _=y.isScene===!0?y.background:null;return _&&_.isTexture&&(_=(y.backgroundBlurriness>0?e:t).get(_)),_}function x(y){let _=!1;const R=g(y);R===null?u(a,c):R&&R.isColor&&(u(R,1),_=!0);const C=i.xr.getEnvironmentBlendMode();C==="additive"?n.buffers.color.setClear(0,0,0,1,o):C==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||_)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function d(y,_){const R=g(_);R&&(R.isCubeTexture||R.mapping===Wr)?(h===void 0&&(h=new ge(new Nn(1,1,1),new Un({name:"BackgroundCubeMaterial",uniforms:Ti(rn.backgroundCube.uniforms),vertexShader:rn.backgroundCube.vertexShader,fragmentShader:rn.backgroundCube.fragmentShader,side:De,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(C,w,U){this.matrixWorld.copyPosition(U.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(h)),Gn.copy(_.backgroundRotation),Gn.x*=-1,Gn.y*=-1,Gn.z*=-1,R.isCubeTexture&&R.isRenderTargetTexture===!1&&(Gn.y*=-1,Gn.z*=-1),h.material.uniforms.envMap.value=R,h.material.uniforms.flipEnvMap.value=R.isCubeTexture&&R.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Xd.makeRotationFromEuler(Gn)),h.material.toneMapped=te.getTransfer(R.colorSpace)!==ie,(f!==R||m!==R.version||p!==i.toneMapping)&&(h.material.needsUpdate=!0,f=R,m=R.version,p=i.toneMapping),h.layers.enableAll(),y.unshift(h,h.geometry,h.material,0,0,null)):R&&R.isTexture&&(l===void 0&&(l=new ge(new In(2,2),new Un({name:"BackgroundMaterial",uniforms:Ti(rn.background.uniforms),vertexShader:rn.background.vertexShader,fragmentShader:rn.background.fragmentShader,side:yn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(l)),l.material.uniforms.t2D.value=R,l.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,l.material.toneMapped=te.getTransfer(R.colorSpace)!==ie,R.matrixAutoUpdate===!0&&R.updateMatrix(),l.material.uniforms.uvTransform.value.copy(R.matrix),(f!==R||m!==R.version||p!==i.toneMapping)&&(l.material.needsUpdate=!0,f=R,m=R.version,p=i.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null))}function u(y,_){y.getRGB(Ar,Rl(i)),n.buffers.color.setClear(Ar.r,Ar.g,Ar.b,_,o)}function S(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(y,_=1){a.set(y),c=_,u(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(y){c=y,u(a,c)},render:x,addToRenderList:d,dispose:S}}function Yd(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=m(null);let s=r,o=!1;function a(T,L,z,V,J){let Y=!1;const X=f(V,z,L);s!==X&&(s=X,l(s.object)),Y=p(T,V,z,J),Y&&g(T,V,z,J),J!==null&&t.update(J,i.ELEMENT_ARRAY_BUFFER),(Y||o)&&(o=!1,_(T,L,z,V),J!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(J).buffer))}function c(){return i.createVertexArray()}function l(T){return i.bindVertexArray(T)}function h(T){return i.deleteVertexArray(T)}function f(T,L,z){const V=z.wireframe===!0;let J=n[T.id];J===void 0&&(J={},n[T.id]=J);let Y=J[L.id];Y===void 0&&(Y={},J[L.id]=Y);let X=Y[V];return X===void 0&&(X=m(c()),Y[V]=X),X}function m(T){const L=[],z=[],V=[];for(let J=0;J<e;J++)L[J]=0,z[J]=0,V[J]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:z,attributeDivisors:V,object:T,attributes:{},index:null}}function p(T,L,z,V){const J=s.attributes,Y=L.attributes;let X=0;const j=z.getAttributes();for(const M in j)if(j[M].location>=0){const O=J[M];let H=Y[M];if(H===void 0&&(M==="instanceMatrix"&&T.instanceMatrix&&(H=T.instanceMatrix),M==="instanceColor"&&T.instanceColor&&(H=T.instanceColor)),O===void 0||O.attribute!==H||H&&O.data!==H.data)return!0;X++}return s.attributesNum!==X||s.index!==V}function g(T,L,z,V){const J={},Y=L.attributes;let X=0;const j=z.getAttributes();for(const M in j)if(j[M].location>=0){let O=Y[M];O===void 0&&(M==="instanceMatrix"&&T.instanceMatrix&&(O=T.instanceMatrix),M==="instanceColor"&&T.instanceColor&&(O=T.instanceColor));const H={};H.attribute=O,O&&O.data&&(H.data=O.data),J[M]=H,X++}s.attributes=J,s.attributesNum=X,s.index=V}function x(){const T=s.newAttributes;for(let L=0,z=T.length;L<z;L++)T[L]=0}function d(T){u(T,0)}function u(T,L){const z=s.newAttributes,V=s.enabledAttributes,J=s.attributeDivisors;z[T]=1,V[T]===0&&(i.enableVertexAttribArray(T),V[T]=1),J[T]!==L&&(i.vertexAttribDivisor(T,L),J[T]=L)}function S(){const T=s.newAttributes,L=s.enabledAttributes;for(let z=0,V=L.length;z<V;z++)L[z]!==T[z]&&(i.disableVertexAttribArray(z),L[z]=0)}function y(T,L,z,V,J,Y,X){X===!0?i.vertexAttribIPointer(T,L,z,J,Y):i.vertexAttribPointer(T,L,z,V,J,Y)}function _(T,L,z,V){x();const J=V.attributes,Y=z.getAttributes(),X=L.defaultAttributeValues;for(const j in Y){const M=Y[j];if(M.location>=0){let I=J[j];if(I===void 0&&(j==="instanceMatrix"&&T.instanceMatrix&&(I=T.instanceMatrix),j==="instanceColor"&&T.instanceColor&&(I=T.instanceColor)),I!==void 0){const O=I.normalized,H=I.itemSize,Z=t.get(I);if(Z===void 0)continue;const ot=Z.buffer,gt=Z.type,ct=Z.bytesPerElement,G=gt===i.INT||gt===i.UNSIGNED_INT||I.gpuType===Po;if(I.isInterleavedBufferAttribute){const it=I.data,Tt=it.stride,Dt=I.offset;if(it.isInstancedInterleavedBuffer){for(let wt=0;wt<M.locationSize;wt++)u(M.location+wt,it.meshPerAttribute);T.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=it.meshPerAttribute*it.count)}else for(let wt=0;wt<M.locationSize;wt++)d(M.location+wt);i.bindBuffer(i.ARRAY_BUFFER,ot);for(let wt=0;wt<M.locationSize;wt++)y(M.location+wt,H/M.locationSize,gt,O,Tt*ct,(Dt+H/M.locationSize*wt)*ct,G)}else{if(I.isInstancedBufferAttribute){for(let it=0;it<M.locationSize;it++)u(M.location+it,I.meshPerAttribute);T.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=I.meshPerAttribute*I.count)}else for(let it=0;it<M.locationSize;it++)d(M.location+it);i.bindBuffer(i.ARRAY_BUFFER,ot);for(let it=0;it<M.locationSize;it++)y(M.location+it,H/M.locationSize,gt,O,H*ct,H/M.locationSize*it*ct,G)}}else if(X!==void 0){const O=X[j];if(O!==void 0)switch(O.length){case 2:i.vertexAttrib2fv(M.location,O);break;case 3:i.vertexAttrib3fv(M.location,O);break;case 4:i.vertexAttrib4fv(M.location,O);break;default:i.vertexAttrib1fv(M.location,O)}}}}S()}function R(){U();for(const T in n){const L=n[T];for(const z in L){const V=L[z];for(const J in V)h(V[J].object),delete V[J];delete L[z]}delete n[T]}}function C(T){if(n[T.id]===void 0)return;const L=n[T.id];for(const z in L){const V=L[z];for(const J in V)h(V[J].object),delete V[J];delete L[z]}delete n[T.id]}function w(T){for(const L in n){const z=n[L];if(z[T.id]===void 0)continue;const V=z[T.id];for(const J in V)h(V[J].object),delete V[J];delete z[T.id]}}function U(){b(),o=!0,s!==r&&(s=r,l(s.object))}function b(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:U,resetDefaultState:b,dispose:R,releaseStatesOfGeometry:C,releaseStatesOfProgram:w,initAttributes:x,enableAttribute:d,disableUnusedAttributes:S}}function Kd(i,t,e){let n;function r(l){n=l}function s(l,h){i.drawArrays(n,l,h),e.update(h,n,1)}function o(l,h,f){f!==0&&(i.drawArraysInstanced(n,l,h,f),e.update(h,n,f))}function a(l,h,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,f);let p=0;for(let g=0;g<f;g++)p+=h[g];e.update(p,n,1)}function c(l,h,f,m){if(f===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<l.length;g++)o(l[g],h[g],m[g]);else{p.multiDrawArraysInstancedWEBGL(n,l,0,h,0,m,0,f);let g=0;for(let x=0;x<f;x++)g+=h[x]*m[x];e.update(g,n,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function Jd(i,t,e,n){let r;function s(){if(r!==void 0)return r;if(t.has("EXT_texture_filter_anisotropic")===!0){const w=t.get("EXT_texture_filter_anisotropic");r=i.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(w){return!(w!==tn&&n.convert(w)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(w){const U=w===ji&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(w!==un&&n.convert(w)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==ln&&!U)}function c(w){if(w==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const f=e.logarithmicDepthBuffer===!0,m=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),d=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),u=i.getParameter(i.MAX_VERTEX_ATTRIBS),S=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),y=i.getParameter(i.MAX_VARYING_VECTORS),_=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),R=g>0,C=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:f,reversedDepthBuffer:m,maxTextures:p,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:d,maxAttributes:u,maxVertexUniforms:S,maxVaryings:y,maxFragmentUniforms:_,vertexTextures:R,maxSamples:C}}function Zd(i){const t=this;let e=null,n=0,r=!1,s=!1;const o=new Wn,a=new Wt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,m){const p=f.length!==0||m||n!==0||r;return r=m,n=f.length,p},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,m){e=h(f,m,0)},this.setState=function(f,m,p){const g=f.clippingPlanes,x=f.clipIntersection,d=f.clipShadows,u=i.get(f);if(!r||g===null||g.length===0||s&&!d)s?h(null):l();else{const S=s?0:n,y=S*4;let _=u.clippingState||null;c.value=_,_=h(g,m,y,p);for(let R=0;R!==y;++R)_[R]=e[R];u.clippingState=_,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=S}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(f,m,p,g){const x=f!==null?f.length:0;let d=null;if(x!==0){if(d=c.value,g!==!0||d===null){const u=p+x*4,S=m.matrixWorldInverse;a.getNormalMatrix(S),(d===null||d.length<u)&&(d=new Float32Array(u));for(let y=0,_=p;y!==x;++y,_+=4)o.copy(f[y]).applyMatrix4(S,a),o.normal.toArray(d,_),d[_+3]=o.constant}c.value=d,c.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,d}}function $d(i){let t=new WeakMap;function e(o,a){return a===Xs?o.mapping=Si:a===qs&&(o.mapping=yi),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Xs||a===qs)if(t.has(o)){const c=t.get(o).texture;return e(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new mh(c.height);return l.fromEquirectangularTexture(i,o),t.set(o,l),o.addEventListener("dispose",r),e(l.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function s(){t=new WeakMap}return{get:n,dispose:s}}const _i=4,Oa=[.125,.215,.35,.446,.526,.582],Yn=20,As=new ql,Ba=new qt;let ws=null,Rs=0,Cs=0,Ps=!1;const Xn=(1+Math.sqrt(5))/2,mi=1/Xn,za=[new D(-Xn,mi,0),new D(Xn,mi,0),new D(-mi,0,Xn),new D(mi,0,Xn),new D(0,Xn,-mi),new D(0,Xn,mi),new D(-1,1,-1),new D(1,1,-1),new D(-1,1,1),new D(1,1,1)],jd=new D;class Ao{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,r=100,s={}){const{size:o=256,position:a=jd}=s;ws=this._renderer.getRenderTarget(),Rs=this._renderer.getActiveCubeFace(),Cs=this._renderer.getActiveMipmapLevel(),Ps=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,n,r,c,a),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ga(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ha(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(ws,Rs,Cs),this._renderer.xr.enabled=Ps,t.scissorTest=!1,wr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Si||t.mapping===yi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),ws=this._renderer.getRenderTarget(),Rs=this._renderer.getActiveCubeFace(),Cs=this._renderer.getActiveMipmapLevel(),Ps=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:an,minFilter:an,generateMipmaps:!1,type:ji,format:tn,colorSpace:Ei,depthBuffer:!1},r=ka(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ka(t,e,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Qd(s)),this._blurMaterial=tp(s,t,e)}return r}_compileMaterial(t){const e=new ge(this._lodPlanes[0],t);this._renderer.compile(e,As)}_sceneToCubeUV(t,e,n,r,s){const c=new Ge(90,1,e,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],f=this._renderer,m=f.autoClear,p=f.toneMapping;f.getClearColor(Ba),f.toneMapping=Ln,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(r),f.clearDepth(),f.setRenderTarget(null));const x=new hn({name:"PMREM.Background",side:De,depthWrite:!1,depthTest:!1}),d=new ge(new Nn,x);let u=!1;const S=t.background;S?S.isColor&&(x.color.copy(S),t.background=null,u=!0):(x.color.copy(Ba),u=!0);for(let y=0;y<6;y++){const _=y%3;_===0?(c.up.set(0,l[y],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x+h[y],s.y,s.z)):_===1?(c.up.set(0,0,l[y]),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y+h[y],s.z)):(c.up.set(0,l[y],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y,s.z+h[y]));const R=this._cubeSize;wr(r,_*R,y>2?R:0,R,R),f.setRenderTarget(r),u&&f.render(d,c),f.render(t,c)}d.geometry.dispose(),d.material.dispose(),f.toneMapping=p,f.autoClear=m,t.background=S}_textureToCubeUV(t,e){const n=this._renderer,r=t.mapping===Si||t.mapping===yi;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ga()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ha());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new ge(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=t;const c=this._cubeSize;wr(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(o,As)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=za[(r-s-1)%za.length];this._blur(t,s-1,s,o,a)}e.autoClear=n}_blur(t,e,n,r,s){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,r,"latitudinal",s),this._halfBlur(o,t,n,n,r,"longitudinal",s)}_halfBlur(t,e,n,r,s,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,f=new ge(this._lodPlanes[r],l),m=l.uniforms,p=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*Yn-1),x=s/g,d=isFinite(s)?1+Math.floor(h*x):Yn;d>Yn&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${d} samples when the maximum is set to ${Yn}`);const u=[];let S=0;for(let w=0;w<Yn;++w){const U=w/x,b=Math.exp(-U*U/2);u.push(b),w===0?S+=b:w<d&&(S+=2*b)}for(let w=0;w<u.length;w++)u[w]=u[w]/S;m.envMap.value=t.texture,m.samples.value=d,m.weights.value=u,m.latitudinal.value=o==="latitudinal",a&&(m.poleAxis.value=a);const{_lodMax:y}=this;m.dTheta.value=g,m.mipInt.value=y-n;const _=this._sizeLods[r],R=3*_*(r>y-_i?r-y+_i:0),C=4*(this._cubeSize-_);wr(e,R,C,3*_,2*_),c.setRenderTarget(e),c.render(f,As)}}function Qd(i){const t=[],e=[],n=[];let r=i;const s=i-_i+1+Oa.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);e.push(a);let c=1/a;o>i-_i?c=Oa[o-i+_i-1]:o===0&&(c=0),n.push(c);const l=1/(a-2),h=-l,f=1+l,m=[h,h,f,h,f,f,h,h,f,f,h,f],p=6,g=6,x=3,d=2,u=1,S=new Float32Array(x*g*p),y=new Float32Array(d*g*p),_=new Float32Array(u*g*p);for(let C=0;C<p;C++){const w=C%3*2/3-1,U=C>2?0:-1,b=[w,U,0,w+2/3,U,0,w+2/3,U+1,0,w,U,0,w+2/3,U+1,0,w,U+1,0];S.set(b,x*g*C),y.set(m,d*g*C);const T=[C,C,C,C,C,C];_.set(T,u*g*C)}const R=new Ee;R.setAttribute("position",new Ke(S,x)),R.setAttribute("uv",new Ke(y,d)),R.setAttribute("faceIndex",new Ke(_,u)),t.push(R),r>_i&&r--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function ka(i,t,e){const n=new $n(i,t,e);return n.texture.mapping=Wr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function wr(i,t,e,n,r){i.viewport.set(t,e,n,r),i.scissor.set(t,e,n,r)}function tp(i,t,e){const n=new Float32Array(Yn),r=new D(0,1,0);return new Un({name:"SphericalGaussianBlur",defines:{n:Yn,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Ko(),fragmentShader:`

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
		`,blending:Pn,depthTest:!1,depthWrite:!1})}function Ha(){return new Un({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ko(),fragmentShader:`

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
		`,blending:Pn,depthTest:!1,depthWrite:!1})}function Ga(){return new Un({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ko(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Pn,depthTest:!1,depthWrite:!1})}function Ko(){return`

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
	`}function ep(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===Xs||c===qs,h=c===Si||c===yi;if(l||h){let f=t.get(a);const m=f!==void 0?f.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==m)return e===null&&(e=new Ao(i)),f=l?e.fromEquirectangular(a,f):e.fromCubemap(a,f),f.texture.pmremVersion=a.pmremVersion,t.set(a,f),f.texture;if(f!==void 0)return f.texture;{const p=a.image;return l&&p&&p.height>0||h&&p&&r(p)?(e===null&&(e=new Ao(i)),f=l?e.fromEquirectangular(a):e.fromCubemap(a),f.texture.pmremVersion=a.pmremVersion,t.set(a,f),a.addEventListener("dispose",s),f.texture):null}}}return a}function r(a){let c=0;const l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function s(a){const c=a.target;c.removeEventListener("dispose",s);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function np(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return t[n]=r,r}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const r=e(n);return r===null&&Ki("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function ip(i,t,e,n){const r={},s=new WeakMap;function o(f){const m=f.target;m.index!==null&&t.remove(m.index);for(const g in m.attributes)t.remove(m.attributes[g]);m.removeEventListener("dispose",o),delete r[m.id];const p=s.get(m);p&&(t.remove(p),s.delete(m)),n.releaseStatesOfGeometry(m),m.isInstancedBufferGeometry===!0&&delete m._maxInstanceCount,e.memory.geometries--}function a(f,m){return r[m.id]===!0||(m.addEventListener("dispose",o),r[m.id]=!0,e.memory.geometries++),m}function c(f){const m=f.attributes;for(const p in m)t.update(m[p],i.ARRAY_BUFFER)}function l(f){const m=[],p=f.index,g=f.attributes.position;let x=0;if(p!==null){const S=p.array;x=p.version;for(let y=0,_=S.length;y<_;y+=3){const R=S[y+0],C=S[y+1],w=S[y+2];m.push(R,C,C,w,w,R)}}else if(g!==void 0){const S=g.array;x=g.version;for(let y=0,_=S.length/3-1;y<_;y+=3){const R=y+0,C=y+1,w=y+2;m.push(R,C,C,w,w,R)}}else return;const d=new(yl(m)?wl:Al)(m,1);d.version=x;const u=s.get(f);u&&t.remove(u),s.set(f,d)}function h(f){const m=s.get(f);if(m){const p=f.index;p!==null&&m.version<p.version&&l(f)}else l(f);return s.get(f)}return{get:a,update:c,getWireframeAttribute:h}}function rp(i,t,e){let n;function r(m){n=m}let s,o;function a(m){s=m.type,o=m.bytesPerElement}function c(m,p){i.drawElements(n,p,s,m*o),e.update(p,n,1)}function l(m,p,g){g!==0&&(i.drawElementsInstanced(n,p,s,m*o,g),e.update(p,n,g))}function h(m,p,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,s,m,0,g);let d=0;for(let u=0;u<g;u++)d+=p[u];e.update(d,n,1)}function f(m,p,g,x){if(g===0)return;const d=t.get("WEBGL_multi_draw");if(d===null)for(let u=0;u<m.length;u++)l(m[u]/o,p[u],x[u]);else{d.multiDrawElementsInstancedWEBGL(n,p,0,s,m,0,x,0,g);let u=0;for(let S=0;S<g;S++)u+=p[S]*x[S];e.update(u,n,1)}}this.setMode=r,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=f}function sp(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(s/3);break;case i.LINES:e.lines+=a*(s/2);break;case i.LINE_STRIP:e.lines+=a*(s-1);break;case i.LINE_LOOP:e.lines+=a*s;break;case i.POINTS:e.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:r,update:n}}function op(i,t,e){const n=new WeakMap,r=new se;function s(o,a,c){const l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,f=h!==void 0?h.length:0;let m=n.get(a);if(m===void 0||m.count!==f){let T=function(){U.dispose(),n.delete(a),a.removeEventListener("dispose",T)};var p=T;m!==void 0&&m.texture.dispose();const g=a.morphAttributes.position!==void 0,x=a.morphAttributes.normal!==void 0,d=a.morphAttributes.color!==void 0,u=a.morphAttributes.position||[],S=a.morphAttributes.normal||[],y=a.morphAttributes.color||[];let _=0;g===!0&&(_=1),x===!0&&(_=2),d===!0&&(_=3);let R=a.attributes.position.count*_,C=1;R>t.maxTextureSize&&(C=Math.ceil(R/t.maxTextureSize),R=t.maxTextureSize);const w=new Float32Array(R*C*4*f),U=new El(w,R,C,f);U.type=ln,U.needsUpdate=!0;const b=_*4;for(let L=0;L<f;L++){const z=u[L],V=S[L],J=y[L],Y=R*C*4*L;for(let X=0;X<z.count;X++){const j=X*b;g===!0&&(r.fromBufferAttribute(z,X),w[Y+j+0]=r.x,w[Y+j+1]=r.y,w[Y+j+2]=r.z,w[Y+j+3]=0),x===!0&&(r.fromBufferAttribute(V,X),w[Y+j+4]=r.x,w[Y+j+5]=r.y,w[Y+j+6]=r.z,w[Y+j+7]=0),d===!0&&(r.fromBufferAttribute(J,X),w[Y+j+8]=r.x,w[Y+j+9]=r.y,w[Y+j+10]=r.z,w[Y+j+11]=J.itemSize===4?r.w:1)}}m={count:f,texture:U,size:new at(R,C)},n.set(a,m),a.addEventListener("dispose",T)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let g=0;for(let d=0;d<l.length;d++)g+=l[d];const x=a.morphTargetsRelative?1:1-g;c.getUniforms().setValue(i,"morphTargetBaseInfluence",x),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",m.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",m.size)}return{update:s}}function ap(i,t,e,n){let r=new WeakMap;function s(c){const l=n.render.frame,h=c.geometry,f=t.get(c,h);if(r.get(f)!==l&&(t.update(f),r.set(f,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),r.get(c)!==l&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,l))),c.isSkinnedMesh){const m=c.skeleton;r.get(m)!==l&&(m.update(),r.set(m,l))}return f}function o(){r=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:s,dispose:o}}const Kl=new we,Va=new Dl(1,1),Jl=new El,Zl=new $c,$l=new Pl,Wa=[],Xa=[],qa=new Float32Array(16),Ya=new Float32Array(9),Ka=new Float32Array(4);function Ci(i,t,e){const n=i[0];if(n<=0||n>0)return i;const r=t*e;let s=Wa[r];if(s===void 0&&(s=new Float32Array(r),Wa[r]=s),t!==0){n.toArray(s,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(s,a)}return s}function ve(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function xe(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Yr(i,t){let e=Xa[t];e===void 0&&(e=new Int32Array(t),Xa[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function lp(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function cp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ve(e,t))return;i.uniform2fv(this.addr,t),xe(e,t)}}function hp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(ve(e,t))return;i.uniform3fv(this.addr,t),xe(e,t)}}function up(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ve(e,t))return;i.uniform4fv(this.addr,t),xe(e,t)}}function fp(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(ve(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),xe(e,t)}else{if(ve(e,n))return;Ka.set(n),i.uniformMatrix2fv(this.addr,!1,Ka),xe(e,n)}}function dp(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(ve(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),xe(e,t)}else{if(ve(e,n))return;Ya.set(n),i.uniformMatrix3fv(this.addr,!1,Ya),xe(e,n)}}function pp(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(ve(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),xe(e,t)}else{if(ve(e,n))return;qa.set(n),i.uniformMatrix4fv(this.addr,!1,qa),xe(e,n)}}function mp(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function gp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ve(e,t))return;i.uniform2iv(this.addr,t),xe(e,t)}}function _p(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ve(e,t))return;i.uniform3iv(this.addr,t),xe(e,t)}}function vp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ve(e,t))return;i.uniform4iv(this.addr,t),xe(e,t)}}function xp(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Mp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ve(e,t))return;i.uniform2uiv(this.addr,t),xe(e,t)}}function Sp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ve(e,t))return;i.uniform3uiv(this.addr,t),xe(e,t)}}function yp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ve(e,t))return;i.uniform4uiv(this.addr,t),xe(e,t)}}function Ep(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_2D_SHADOW?(Va.compareFunction=Sl,s=Va):s=Kl,e.setTexture2D(t||s,r)}function Tp(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTexture3D(t||Zl,r)}function bp(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTextureCube(t||$l,r)}function Ap(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTexture2DArray(t||Jl,r)}function wp(i){switch(i){case 5126:return lp;case 35664:return cp;case 35665:return hp;case 35666:return up;case 35674:return fp;case 35675:return dp;case 35676:return pp;case 5124:case 35670:return mp;case 35667:case 35671:return gp;case 35668:case 35672:return _p;case 35669:case 35673:return vp;case 5125:return xp;case 36294:return Mp;case 36295:return Sp;case 36296:return yp;case 35678:case 36198:case 36298:case 36306:case 35682:return Ep;case 35679:case 36299:case 36307:return Tp;case 35680:case 36300:case 36308:case 36293:return bp;case 36289:case 36303:case 36311:case 36292:return Ap}}function Rp(i,t){i.uniform1fv(this.addr,t)}function Cp(i,t){const e=Ci(t,this.size,2);i.uniform2fv(this.addr,e)}function Pp(i,t){const e=Ci(t,this.size,3);i.uniform3fv(this.addr,e)}function Lp(i,t){const e=Ci(t,this.size,4);i.uniform4fv(this.addr,e)}function Ip(i,t){const e=Ci(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Dp(i,t){const e=Ci(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Up(i,t){const e=Ci(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Np(i,t){i.uniform1iv(this.addr,t)}function Fp(i,t){i.uniform2iv(this.addr,t)}function Op(i,t){i.uniform3iv(this.addr,t)}function Bp(i,t){i.uniform4iv(this.addr,t)}function zp(i,t){i.uniform1uiv(this.addr,t)}function kp(i,t){i.uniform2uiv(this.addr,t)}function Hp(i,t){i.uniform3uiv(this.addr,t)}function Gp(i,t){i.uniform4uiv(this.addr,t)}function Vp(i,t,e){const n=this.cache,r=t.length,s=Yr(e,r);ve(n,s)||(i.uniform1iv(this.addr,s),xe(n,s));for(let o=0;o!==r;++o)e.setTexture2D(t[o]||Kl,s[o])}function Wp(i,t,e){const n=this.cache,r=t.length,s=Yr(e,r);ve(n,s)||(i.uniform1iv(this.addr,s),xe(n,s));for(let o=0;o!==r;++o)e.setTexture3D(t[o]||Zl,s[o])}function Xp(i,t,e){const n=this.cache,r=t.length,s=Yr(e,r);ve(n,s)||(i.uniform1iv(this.addr,s),xe(n,s));for(let o=0;o!==r;++o)e.setTextureCube(t[o]||$l,s[o])}function qp(i,t,e){const n=this.cache,r=t.length,s=Yr(e,r);ve(n,s)||(i.uniform1iv(this.addr,s),xe(n,s));for(let o=0;o!==r;++o)e.setTexture2DArray(t[o]||Jl,s[o])}function Yp(i){switch(i){case 5126:return Rp;case 35664:return Cp;case 35665:return Pp;case 35666:return Lp;case 35674:return Ip;case 35675:return Dp;case 35676:return Up;case 5124:case 35670:return Np;case 35667:case 35671:return Fp;case 35668:case 35672:return Op;case 35669:case 35673:return Bp;case 5125:return zp;case 36294:return kp;case 36295:return Hp;case 36296:return Gp;case 35678:case 36198:case 36298:case 36306:case 35682:return Vp;case 35679:case 36299:case 36307:return Wp;case 35680:case 36300:case 36308:case 36293:return Xp;case 36289:case 36303:case 36311:case 36292:return qp}}class Kp{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=wp(e.type)}}class Jp{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Yp(e.type)}}class Zp{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(t,e[a.id],n)}}}const Ls=/(\w+)(\])?(\[|\.)?/g;function Ja(i,t){i.seq.push(t),i.map[t.id]=t}function $p(i,t,e){const n=i.name,r=n.length;for(Ls.lastIndex=0;;){const s=Ls.exec(n),o=Ls.lastIndex;let a=s[1];const c=s[2]==="]",l=s[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===r){Ja(e,l===void 0?new Kp(a,i,t):new Jp(a,i,t));break}else{let f=e.map[a];f===void 0&&(f=new Zp(a),Ja(e,f)),e=f}}}class Fr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){const s=t.getActiveUniform(e,r),o=t.getUniformLocation(e,s.name);$p(s,o,this)}}setValue(t,e,n,r){const s=this.map[e];s!==void 0&&s.setValue(t,n,r)}setOptional(t,e,n){const r=e[n];r!==void 0&&this.setValue(t,n,r)}static upload(t,e,n,r){for(let s=0,o=e.length;s!==o;++s){const a=e[s],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,r)}}static seqWithValue(t,e){const n=[];for(let r=0,s=t.length;r!==s;++r){const o=t[r];o.id in e&&n.push(o)}return n}}function Za(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const jp=37297;let Qp=0;function tm(i,t){const e=i.split(`
`),n=[],r=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let o=r;o<s;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const $a=new Wt;function em(i){te._getMatrix($a,te.workingColorSpace,i);const t=`mat3( ${$a.elements.map(e=>e.toFixed(4))} )`;switch(te.getTransfer(i)){case Br:return[t,"LinearTransferOETF"];case ie:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function ja(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),s=(i.getShaderInfoLog(t)||"").trim();if(n&&s==="")return"";const o=/ERROR: 0:(\d+)/.exec(s);if(o){const a=parseInt(o[1]);return e.toUpperCase()+`

`+s+`

`+tm(i.getShaderSource(t),a)}else return s}function nm(i,t){const e=em(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function im(i,t){let e;switch(t){case Ac:e="Linear";break;case wc:e="Reinhard";break;case Rc:e="Cineon";break;case fl:e="ACESFilmic";break;case Pc:e="AgX";break;case Lc:e="Neutral";break;case Cc:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Rr=new D;function rm(){te.getLuminanceCoefficients(Rr);const i=Rr.x.toFixed(4),t=Rr.y.toFixed(4),e=Rr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function sm(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Hi).join(`
`)}function om(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function am(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(t,r),o=s.name;let a=1;s.type===i.FLOAT_MAT2&&(a=2),s.type===i.FLOAT_MAT3&&(a=3),s.type===i.FLOAT_MAT4&&(a=4),e[o]={type:s.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function Hi(i){return i!==""}function Qa(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function tl(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const lm=/^[ \t]*#include +<([\w\d./]+)>/gm;function wo(i){return i.replace(lm,hm)}const cm=new Map;function hm(i,t){let e=Xt[t];if(e===void 0){const n=cm.get(t);if(n!==void 0)e=Xt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return wo(e)}const um=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function el(i){return i.replace(um,fm)}function fm(i,t,e,n){let r="";for(let s=parseInt(t);s<parseInt(e);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function nl(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}function dm(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===hl?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===ul?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===xn&&(t="SHADOWMAP_TYPE_VSM"),t}function pm(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Si:case yi:t="ENVMAP_TYPE_CUBE";break;case Wr:t="ENVMAP_TYPE_CUBE_UV";break}return t}function mm(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case yi:t="ENVMAP_MODE_REFRACTION";break}return t}function gm(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Co:t="ENVMAP_BLENDING_MULTIPLY";break;case Tc:t="ENVMAP_BLENDING_MIX";break;case bc:t="ENVMAP_BLENDING_ADD";break}return t}function _m(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function vm(i,t,e,n){const r=i.getContext(),s=e.defines;let o=e.vertexShader,a=e.fragmentShader;const c=dm(e),l=pm(e),h=mm(e),f=gm(e),m=_m(e),p=sm(e),g=om(s),x=r.createProgram();let d,u,S=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(d=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Hi).join(`
`),d.length>0&&(d+=`
`),u=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Hi).join(`
`),u.length>0&&(u+=`
`)):(d=[nl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Hi).join(`
`),u=[nl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+f:"",m?"#define CUBEUV_TEXEL_WIDTH "+m.texelWidth:"",m?"#define CUBEUV_TEXEL_HEIGHT "+m.texelHeight:"",m?"#define CUBEUV_MAX_MIP "+m.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Ln?"#define TONE_MAPPING":"",e.toneMapping!==Ln?Xt.tonemapping_pars_fragment:"",e.toneMapping!==Ln?im("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Xt.colorspace_pars_fragment,nm("linearToOutputTexel",e.outputColorSpace),rm(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Hi).join(`
`)),o=wo(o),o=Qa(o,e),o=tl(o,e),a=wo(a),a=Qa(a,e),a=tl(a,e),o=el(o),a=el(a),e.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,d=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+d,u=["#define varying in",e.glslVersion===oa?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===oa?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+u);const y=S+d+o,_=S+u+a,R=Za(r,r.VERTEX_SHADER,y),C=Za(r,r.FRAGMENT_SHADER,_);r.attachShader(x,R),r.attachShader(x,C),e.index0AttributeName!==void 0?r.bindAttribLocation(x,0,e.index0AttributeName):e.morphTargets===!0&&r.bindAttribLocation(x,0,"position"),r.linkProgram(x);function w(L){if(i.debug.checkShaderErrors){const z=r.getProgramInfoLog(x)||"",V=r.getShaderInfoLog(R)||"",J=r.getShaderInfoLog(C)||"",Y=z.trim(),X=V.trim(),j=J.trim();let M=!0,I=!0;if(r.getProgramParameter(x,r.LINK_STATUS)===!1)if(M=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,x,R,C);else{const O=ja(r,R,"vertex"),H=ja(r,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(x,r.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+Y+`
`+O+`
`+H)}else Y!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Y):(X===""||j==="")&&(I=!1);I&&(L.diagnostics={runnable:M,programLog:Y,vertexShader:{log:X,prefix:d},fragmentShader:{log:j,prefix:u}})}r.deleteShader(R),r.deleteShader(C),U=new Fr(r,x),b=am(r,x)}let U;this.getUniforms=function(){return U===void 0&&w(this),U};let b;this.getAttributes=function(){return b===void 0&&w(this),b};let T=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return T===!1&&(T=r.getProgramParameter(x,jp)),T},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Qp++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=R,this.fragmentShader=C,this}let xm=0;class Mm{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,r=this._getShaderStage(e),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new Sm(t),e.set(t,n)),n}}class Sm{constructor(t){this.id=xm++,this.code=t,this.usedTimes=0}}function ym(i,t,e,n,r,s,o){const a=new Tl,c=new Mm,l=new Set,h=[],f=r.logarithmicDepthBuffer,m=r.vertexTextures;let p=r.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(b){return l.add(b),b===0?"uv":`uv${b}`}function d(b,T,L,z,V){const J=z.fog,Y=V.geometry,X=b.isMeshStandardMaterial?z.environment:null,j=(b.isMeshStandardMaterial?e:t).get(b.envMap||X),M=j&&j.mapping===Wr?j.image.height:null,I=g[b.type];b.precision!==null&&(p=r.getMaxPrecision(b.precision),p!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",p,"instead."));const O=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,H=O!==void 0?O.length:0;let Z=0;Y.morphAttributes.position!==void 0&&(Z=1),Y.morphAttributes.normal!==void 0&&(Z=2),Y.morphAttributes.color!==void 0&&(Z=3);let ot,gt,ct,G;if(I){const ee=rn[I];ot=ee.vertexShader,gt=ee.fragmentShader}else ot=b.vertexShader,gt=b.fragmentShader,c.update(b),ct=c.getVertexShaderID(b),G=c.getFragmentShaderID(b);const it=i.getRenderTarget(),Tt=i.state.buffers.depth.getReversed(),Dt=V.isInstancedMesh===!0,wt=V.isBatchedMesh===!0,Kt=!!b.map,ae=!!b.matcap,P=!!j,st=!!b.aoMap,et=!!b.lightMap,tt=!!b.bumpMap,Q=!!b.normalMap,_t=!!b.displacementMap,lt=!!b.emissiveMap,vt=!!b.metalnessMap,Ht=!!b.roughnessMap,kt=b.anisotropy>0,A=b.clearcoat>0,v=b.dispersion>0,k=b.iridescence>0,K=b.sheen>0,rt=b.transmission>0,$=kt&&!!b.anisotropyMap,It=A&&!!b.clearcoatMap,mt=A&&!!b.clearcoatNormalMap,Ct=A&&!!b.clearcoatRoughnessMap,Pt=k&&!!b.iridescenceMap,ht=k&&!!b.iridescenceThicknessMap,Et=K&&!!b.sheenColorMap,Bt=K&&!!b.sheenRoughnessMap,Ut=!!b.specularMap,St=!!b.specularColorMap,Vt=!!b.specularIntensityMap,N=rt&&!!b.transmissionMap,dt=rt&&!!b.thicknessMap,xt=!!b.gradientMap,At=!!b.alphaMap,ut=b.alphaTest>0,nt=!!b.alphaHash,Lt=!!b.extensions;let Gt=Ln;b.toneMapped&&(it===null||it.isXRRenderTarget===!0)&&(Gt=i.toneMapping);const le={shaderID:I,shaderType:b.type,shaderName:b.name,vertexShader:ot,fragmentShader:gt,defines:b.defines,customVertexShaderID:ct,customFragmentShaderID:G,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:p,batching:wt,batchingColor:wt&&V._colorsTexture!==null,instancing:Dt,instancingColor:Dt&&V.instanceColor!==null,instancingMorph:Dt&&V.morphTexture!==null,supportsVertexTextures:m,outputColorSpace:it===null?i.outputColorSpace:it.isXRRenderTarget===!0?it.texture.colorSpace:Ei,alphaToCoverage:!!b.alphaToCoverage,map:Kt,matcap:ae,envMap:P,envMapMode:P&&j.mapping,envMapCubeUVHeight:M,aoMap:st,lightMap:et,bumpMap:tt,normalMap:Q,displacementMap:m&&_t,emissiveMap:lt,normalMapObjectSpace:Q&&b.normalMapType===Nc,normalMapTangentSpace:Q&&b.normalMapType===Oo,metalnessMap:vt,roughnessMap:Ht,anisotropy:kt,anisotropyMap:$,clearcoat:A,clearcoatMap:It,clearcoatNormalMap:mt,clearcoatRoughnessMap:Ct,dispersion:v,iridescence:k,iridescenceMap:Pt,iridescenceThicknessMap:ht,sheen:K,sheenColorMap:Et,sheenRoughnessMap:Bt,specularMap:Ut,specularColorMap:St,specularIntensityMap:Vt,transmission:rt,transmissionMap:N,thicknessMap:dt,gradientMap:xt,opaque:b.transparent===!1&&b.blending===vi&&b.alphaToCoverage===!1,alphaMap:At,alphaTest:ut,alphaHash:nt,combine:b.combine,mapUv:Kt&&x(b.map.channel),aoMapUv:st&&x(b.aoMap.channel),lightMapUv:et&&x(b.lightMap.channel),bumpMapUv:tt&&x(b.bumpMap.channel),normalMapUv:Q&&x(b.normalMap.channel),displacementMapUv:_t&&x(b.displacementMap.channel),emissiveMapUv:lt&&x(b.emissiveMap.channel),metalnessMapUv:vt&&x(b.metalnessMap.channel),roughnessMapUv:Ht&&x(b.roughnessMap.channel),anisotropyMapUv:$&&x(b.anisotropyMap.channel),clearcoatMapUv:It&&x(b.clearcoatMap.channel),clearcoatNormalMapUv:mt&&x(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ct&&x(b.clearcoatRoughnessMap.channel),iridescenceMapUv:Pt&&x(b.iridescenceMap.channel),iridescenceThicknessMapUv:ht&&x(b.iridescenceThicknessMap.channel),sheenColorMapUv:Et&&x(b.sheenColorMap.channel),sheenRoughnessMapUv:Bt&&x(b.sheenRoughnessMap.channel),specularMapUv:Ut&&x(b.specularMap.channel),specularColorMapUv:St&&x(b.specularColorMap.channel),specularIntensityMapUv:Vt&&x(b.specularIntensityMap.channel),transmissionMapUv:N&&x(b.transmissionMap.channel),thicknessMapUv:dt&&x(b.thicknessMap.channel),alphaMapUv:At&&x(b.alphaMap.channel),vertexTangents:!!Y.attributes.tangent&&(Q||kt),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,pointsUvs:V.isPoints===!0&&!!Y.attributes.uv&&(Kt||At),fog:!!J,useFog:b.fog===!0,fogExp2:!!J&&J.isFogExp2,flatShading:b.flatShading===!0&&b.wireframe===!1,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:Tt,skinning:V.isSkinnedMesh===!0,morphTargets:Y.morphAttributes.position!==void 0,morphNormals:Y.morphAttributes.normal!==void 0,morphColors:Y.morphAttributes.color!==void 0,morphTargetsCount:H,morphTextureStride:Z,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:b.dithering,shadowMapEnabled:i.shadowMap.enabled&&L.length>0,shadowMapType:i.shadowMap.type,toneMapping:Gt,decodeVideoTexture:Kt&&b.map.isVideoTexture===!0&&te.getTransfer(b.map.colorSpace)===ie,decodeVideoTextureEmissive:lt&&b.emissiveMap.isVideoTexture===!0&&te.getTransfer(b.emissiveMap.colorSpace)===ie,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===sn,flipSided:b.side===De,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:Lt&&b.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Lt&&b.extensions.multiDraw===!0||wt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return le.vertexUv1s=l.has(1),le.vertexUv2s=l.has(2),le.vertexUv3s=l.has(3),l.clear(),le}function u(b){const T=[];if(b.shaderID?T.push(b.shaderID):(T.push(b.customVertexShaderID),T.push(b.customFragmentShaderID)),b.defines!==void 0)for(const L in b.defines)T.push(L),T.push(b.defines[L]);return b.isRawShaderMaterial===!1&&(S(T,b),y(T,b),T.push(i.outputColorSpace)),T.push(b.customProgramCacheKey),T.join()}function S(b,T){b.push(T.precision),b.push(T.outputColorSpace),b.push(T.envMapMode),b.push(T.envMapCubeUVHeight),b.push(T.mapUv),b.push(T.alphaMapUv),b.push(T.lightMapUv),b.push(T.aoMapUv),b.push(T.bumpMapUv),b.push(T.normalMapUv),b.push(T.displacementMapUv),b.push(T.emissiveMapUv),b.push(T.metalnessMapUv),b.push(T.roughnessMapUv),b.push(T.anisotropyMapUv),b.push(T.clearcoatMapUv),b.push(T.clearcoatNormalMapUv),b.push(T.clearcoatRoughnessMapUv),b.push(T.iridescenceMapUv),b.push(T.iridescenceThicknessMapUv),b.push(T.sheenColorMapUv),b.push(T.sheenRoughnessMapUv),b.push(T.specularMapUv),b.push(T.specularColorMapUv),b.push(T.specularIntensityMapUv),b.push(T.transmissionMapUv),b.push(T.thicknessMapUv),b.push(T.combine),b.push(T.fogExp2),b.push(T.sizeAttenuation),b.push(T.morphTargetsCount),b.push(T.morphAttributeCount),b.push(T.numDirLights),b.push(T.numPointLights),b.push(T.numSpotLights),b.push(T.numSpotLightMaps),b.push(T.numHemiLights),b.push(T.numRectAreaLights),b.push(T.numDirLightShadows),b.push(T.numPointLightShadows),b.push(T.numSpotLightShadows),b.push(T.numSpotLightShadowsWithMaps),b.push(T.numLightProbes),b.push(T.shadowMapType),b.push(T.toneMapping),b.push(T.numClippingPlanes),b.push(T.numClipIntersection),b.push(T.depthPacking)}function y(b,T){a.disableAll(),T.supportsVertexTextures&&a.enable(0),T.instancing&&a.enable(1),T.instancingColor&&a.enable(2),T.instancingMorph&&a.enable(3),T.matcap&&a.enable(4),T.envMap&&a.enable(5),T.normalMapObjectSpace&&a.enable(6),T.normalMapTangentSpace&&a.enable(7),T.clearcoat&&a.enable(8),T.iridescence&&a.enable(9),T.alphaTest&&a.enable(10),T.vertexColors&&a.enable(11),T.vertexAlphas&&a.enable(12),T.vertexUv1s&&a.enable(13),T.vertexUv2s&&a.enable(14),T.vertexUv3s&&a.enable(15),T.vertexTangents&&a.enable(16),T.anisotropy&&a.enable(17),T.alphaHash&&a.enable(18),T.batching&&a.enable(19),T.dispersion&&a.enable(20),T.batchingColor&&a.enable(21),T.gradientMap&&a.enable(22),b.push(a.mask),a.disableAll(),T.fog&&a.enable(0),T.useFog&&a.enable(1),T.flatShading&&a.enable(2),T.logarithmicDepthBuffer&&a.enable(3),T.reversedDepthBuffer&&a.enable(4),T.skinning&&a.enable(5),T.morphTargets&&a.enable(6),T.morphNormals&&a.enable(7),T.morphColors&&a.enable(8),T.premultipliedAlpha&&a.enable(9),T.shadowMapEnabled&&a.enable(10),T.doubleSided&&a.enable(11),T.flipSided&&a.enable(12),T.useDepthPacking&&a.enable(13),T.dithering&&a.enable(14),T.transmission&&a.enable(15),T.sheen&&a.enable(16),T.opaque&&a.enable(17),T.pointsUvs&&a.enable(18),T.decodeVideoTexture&&a.enable(19),T.decodeVideoTextureEmissive&&a.enable(20),T.alphaToCoverage&&a.enable(21),b.push(a.mask)}function _(b){const T=g[b.type];let L;if(T){const z=rn[T];L=uh.clone(z.uniforms)}else L=b.uniforms;return L}function R(b,T){let L;for(let z=0,V=h.length;z<V;z++){const J=h[z];if(J.cacheKey===T){L=J,++L.usedTimes;break}}return L===void 0&&(L=new vm(i,T,b,s),h.push(L)),L}function C(b){if(--b.usedTimes===0){const T=h.indexOf(b);h[T]=h[h.length-1],h.pop(),b.destroy()}}function w(b){c.remove(b)}function U(){c.dispose()}return{getParameters:d,getProgramCacheKey:u,getUniforms:_,acquireProgram:R,releaseProgram:C,releaseShaderCache:w,programs:h,dispose:U}}function Em(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function r(o,a,c){i.get(o)[a]=c}function s(){i=new WeakMap}return{has:t,get:e,remove:n,update:r,dispose:s}}function Tm(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function il(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function rl(){const i=[];let t=0;const e=[],n=[],r=[];function s(){t=0,e.length=0,n.length=0,r.length=0}function o(f,m,p,g,x,d){let u=i[t];return u===void 0?(u={id:f.id,object:f,geometry:m,material:p,groupOrder:g,renderOrder:f.renderOrder,z:x,group:d},i[t]=u):(u.id=f.id,u.object=f,u.geometry=m,u.material=p,u.groupOrder=g,u.renderOrder=f.renderOrder,u.z=x,u.group=d),t++,u}function a(f,m,p,g,x,d){const u=o(f,m,p,g,x,d);p.transmission>0?n.push(u):p.transparent===!0?r.push(u):e.push(u)}function c(f,m,p,g,x,d){const u=o(f,m,p,g,x,d);p.transmission>0?n.unshift(u):p.transparent===!0?r.unshift(u):e.unshift(u)}function l(f,m){e.length>1&&e.sort(f||Tm),n.length>1&&n.sort(m||il),r.length>1&&r.sort(m||il)}function h(){for(let f=t,m=i.length;f<m;f++){const p=i[f];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:n,transparent:r,init:s,push:a,unshift:c,finish:h,sort:l}}function bm(){let i=new WeakMap;function t(n,r){const s=i.get(n);let o;return s===void 0?(o=new rl,i.set(n,[o])):r>=s.length?(o=new rl,s.push(o)):o=s[r],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function Am(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new D,color:new qt};break;case"SpotLight":e={position:new D,direction:new D,color:new qt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new D,color:new qt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new D,skyColor:new qt,groundColor:new qt};break;case"RectAreaLight":e={color:new qt,position:new D,halfWidth:new D,halfHeight:new D};break}return i[t.id]=e,e}}}function wm(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new at};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new at};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new at,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let Rm=0;function Cm(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function Pm(i){const t=new Am,e=wm(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new D);const r=new D,s=new ce,o=new ce;function a(l){let h=0,f=0,m=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let p=0,g=0,x=0,d=0,u=0,S=0,y=0,_=0,R=0,C=0,w=0;l.sort(Cm);for(let b=0,T=l.length;b<T;b++){const L=l[b],z=L.color,V=L.intensity,J=L.distance,Y=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)h+=z.r*V,f+=z.g*V,m+=z.b*V;else if(L.isLightProbe){for(let X=0;X<9;X++)n.probe[X].addScaledVector(L.sh.coefficients[X],V);w++}else if(L.isDirectionalLight){const X=t.get(L);if(X.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const j=L.shadow,M=e.get(L);M.shadowIntensity=j.intensity,M.shadowBias=j.bias,M.shadowNormalBias=j.normalBias,M.shadowRadius=j.radius,M.shadowMapSize=j.mapSize,n.directionalShadow[p]=M,n.directionalShadowMap[p]=Y,n.directionalShadowMatrix[p]=L.shadow.matrix,S++}n.directional[p]=X,p++}else if(L.isSpotLight){const X=t.get(L);X.position.setFromMatrixPosition(L.matrixWorld),X.color.copy(z).multiplyScalar(V),X.distance=J,X.coneCos=Math.cos(L.angle),X.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),X.decay=L.decay,n.spot[x]=X;const j=L.shadow;if(L.map&&(n.spotLightMap[R]=L.map,R++,j.updateMatrices(L),L.castShadow&&C++),n.spotLightMatrix[x]=j.matrix,L.castShadow){const M=e.get(L);M.shadowIntensity=j.intensity,M.shadowBias=j.bias,M.shadowNormalBias=j.normalBias,M.shadowRadius=j.radius,M.shadowMapSize=j.mapSize,n.spotShadow[x]=M,n.spotShadowMap[x]=Y,_++}x++}else if(L.isRectAreaLight){const X=t.get(L);X.color.copy(z).multiplyScalar(V),X.halfWidth.set(L.width*.5,0,0),X.halfHeight.set(0,L.height*.5,0),n.rectArea[d]=X,d++}else if(L.isPointLight){const X=t.get(L);if(X.color.copy(L.color).multiplyScalar(L.intensity),X.distance=L.distance,X.decay=L.decay,L.castShadow){const j=L.shadow,M=e.get(L);M.shadowIntensity=j.intensity,M.shadowBias=j.bias,M.shadowNormalBias=j.normalBias,M.shadowRadius=j.radius,M.shadowMapSize=j.mapSize,M.shadowCameraNear=j.camera.near,M.shadowCameraFar=j.camera.far,n.pointShadow[g]=M,n.pointShadowMap[g]=Y,n.pointShadowMatrix[g]=L.shadow.matrix,y++}n.point[g]=X,g++}else if(L.isHemisphereLight){const X=t.get(L);X.skyColor.copy(L.color).multiplyScalar(V),X.groundColor.copy(L.groundColor).multiplyScalar(V),n.hemi[u]=X,u++}}d>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Mt.LTC_FLOAT_1,n.rectAreaLTC2=Mt.LTC_FLOAT_2):(n.rectAreaLTC1=Mt.LTC_HALF_1,n.rectAreaLTC2=Mt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=f,n.ambient[2]=m;const U=n.hash;(U.directionalLength!==p||U.pointLength!==g||U.spotLength!==x||U.rectAreaLength!==d||U.hemiLength!==u||U.numDirectionalShadows!==S||U.numPointShadows!==y||U.numSpotShadows!==_||U.numSpotMaps!==R||U.numLightProbes!==w)&&(n.directional.length=p,n.spot.length=x,n.rectArea.length=d,n.point.length=g,n.hemi.length=u,n.directionalShadow.length=S,n.directionalShadowMap.length=S,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=S,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=_+R-C,n.spotLightMap.length=R,n.numSpotLightShadowsWithMaps=C,n.numLightProbes=w,U.directionalLength=p,U.pointLength=g,U.spotLength=x,U.rectAreaLength=d,U.hemiLength=u,U.numDirectionalShadows=S,U.numPointShadows=y,U.numSpotShadows=_,U.numSpotMaps=R,U.numLightProbes=w,n.version=Rm++)}function c(l,h){let f=0,m=0,p=0,g=0,x=0;const d=h.matrixWorldInverse;for(let u=0,S=l.length;u<S;u++){const y=l[u];if(y.isDirectionalLight){const _=n.directional[f];_.direction.setFromMatrixPosition(y.matrixWorld),r.setFromMatrixPosition(y.target.matrixWorld),_.direction.sub(r),_.direction.transformDirection(d),f++}else if(y.isSpotLight){const _=n.spot[p];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(d),_.direction.setFromMatrixPosition(y.matrixWorld),r.setFromMatrixPosition(y.target.matrixWorld),_.direction.sub(r),_.direction.transformDirection(d),p++}else if(y.isRectAreaLight){const _=n.rectArea[g];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(d),o.identity(),s.copy(y.matrixWorld),s.premultiply(d),o.extractRotation(s),_.halfWidth.set(y.width*.5,0,0),_.halfHeight.set(0,y.height*.5,0),_.halfWidth.applyMatrix4(o),_.halfHeight.applyMatrix4(o),g++}else if(y.isPointLight){const _=n.point[m];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(d),m++}else if(y.isHemisphereLight){const _=n.hemi[x];_.direction.setFromMatrixPosition(y.matrixWorld),_.direction.transformDirection(d),x++}}}return{setup:a,setupView:c,state:n}}function sl(i){const t=new Pm(i),e=[],n=[];function r(h){l.camera=h,e.length=0,n.length=0}function s(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function c(h){t.setupView(e,h)}const l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:r,state:l,setupLights:a,setupLightsView:c,pushLight:s,pushShadow:o}}function Lm(i){let t=new WeakMap;function e(r,s=0){const o=t.get(r);let a;return o===void 0?(a=new sl(i),t.set(r,[a])):s>=o.length?(a=new sl(i),o.push(a)):a=o[s],a}function n(){t=new WeakMap}return{get:e,dispose:n}}const Im=`void main() {
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
}`;function Um(i,t,e){let n=new zo;const r=new at,s=new at,o=new se,a=new iu({depthPacking:Uc}),c=new ru,l={},h=e.maxTextureSize,f={[yn]:De,[De]:yn,[sn]:sn},m=new Un({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new at},radius:{value:4}},vertexShader:Im,fragmentShader:Dm}),p=m.clone();p.defines.HORIZONTAL_PASS=1;const g=new Ee;g.setAttribute("position",new Ke(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new ge(g,m),d=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=hl;let u=this.type;this.render=function(C,w,U){if(d.enabled===!1||d.autoUpdate===!1&&d.needsUpdate===!1||C.length===0)return;const b=i.getRenderTarget(),T=i.getActiveCubeFace(),L=i.getActiveMipmapLevel(),z=i.state;z.setBlending(Pn),z.buffers.depth.getReversed()===!0?z.buffers.color.setClear(0,0,0,0):z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);const V=u!==xn&&this.type===xn,J=u===xn&&this.type!==xn;for(let Y=0,X=C.length;Y<X;Y++){const j=C[Y],M=j.shadow;if(M===void 0){console.warn("THREE.WebGLShadowMap:",j,"has no shadow.");continue}if(M.autoUpdate===!1&&M.needsUpdate===!1)continue;r.copy(M.mapSize);const I=M.getFrameExtents();if(r.multiply(I),s.copy(M.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(s.x=Math.floor(h/I.x),r.x=s.x*I.x,M.mapSize.x=s.x),r.y>h&&(s.y=Math.floor(h/I.y),r.y=s.y*I.y,M.mapSize.y=s.y)),M.map===null||V===!0||J===!0){const H=this.type!==xn?{minFilter:Ve,magFilter:Ve}:{};M.map!==null&&M.map.dispose(),M.map=new $n(r.x,r.y,H),M.map.texture.name=j.name+".shadowMap",M.camera.updateProjectionMatrix()}i.setRenderTarget(M.map),i.clear();const O=M.getViewportCount();for(let H=0;H<O;H++){const Z=M.getViewport(H);o.set(s.x*Z.x,s.y*Z.y,s.x*Z.z,s.y*Z.w),z.viewport(o),M.updateMatrices(j,H),n=M.getFrustum(),_(w,U,M.camera,j,this.type)}M.isPointLightShadow!==!0&&this.type===xn&&S(M,U),M.needsUpdate=!1}u=this.type,d.needsUpdate=!1,i.setRenderTarget(b,T,L)};function S(C,w){const U=t.update(x);m.defines.VSM_SAMPLES!==C.blurSamples&&(m.defines.VSM_SAMPLES=C.blurSamples,p.defines.VSM_SAMPLES=C.blurSamples,m.needsUpdate=!0,p.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new $n(r.x,r.y)),m.uniforms.shadow_pass.value=C.map.texture,m.uniforms.resolution.value=C.mapSize,m.uniforms.radius.value=C.radius,i.setRenderTarget(C.mapPass),i.clear(),i.renderBufferDirect(w,null,U,m,x,null),p.uniforms.shadow_pass.value=C.mapPass.texture,p.uniforms.resolution.value=C.mapSize,p.uniforms.radius.value=C.radius,i.setRenderTarget(C.map),i.clear(),i.renderBufferDirect(w,null,U,p,x,null)}function y(C,w,U,b){let T=null;const L=U.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(L!==void 0)T=L;else if(T=U.isPointLight===!0?c:a,i.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0||w.alphaToCoverage===!0){const z=T.uuid,V=w.uuid;let J=l[z];J===void 0&&(J={},l[z]=J);let Y=J[V];Y===void 0&&(Y=T.clone(),J[V]=Y,w.addEventListener("dispose",R)),T=Y}if(T.visible=w.visible,T.wireframe=w.wireframe,b===xn?T.side=w.shadowSide!==null?w.shadowSide:w.side:T.side=w.shadowSide!==null?w.shadowSide:f[w.side],T.alphaMap=w.alphaMap,T.alphaTest=w.alphaToCoverage===!0?.5:w.alphaTest,T.map=w.map,T.clipShadows=w.clipShadows,T.clippingPlanes=w.clippingPlanes,T.clipIntersection=w.clipIntersection,T.displacementMap=w.displacementMap,T.displacementScale=w.displacementScale,T.displacementBias=w.displacementBias,T.wireframeLinewidth=w.wireframeLinewidth,T.linewidth=w.linewidth,U.isPointLight===!0&&T.isMeshDistanceMaterial===!0){const z=i.properties.get(T);z.light=U}return T}function _(C,w,U,b,T){if(C.visible===!1)return;if(C.layers.test(w.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&T===xn)&&(!C.frustumCulled||n.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(U.matrixWorldInverse,C.matrixWorld);const V=t.update(C),J=C.material;if(Array.isArray(J)){const Y=V.groups;for(let X=0,j=Y.length;X<j;X++){const M=Y[X],I=J[M.materialIndex];if(I&&I.visible){const O=y(C,I,b,T);C.onBeforeShadow(i,C,w,U,V,O,M),i.renderBufferDirect(U,null,V,O,C,M),C.onAfterShadow(i,C,w,U,V,O,M)}}}else if(J.visible){const Y=y(C,J,b,T);C.onBeforeShadow(i,C,w,U,V,Y,null),i.renderBufferDirect(U,null,V,Y,C,null),C.onAfterShadow(i,C,w,U,V,Y,null)}}const z=C.children;for(let V=0,J=z.length;V<J;V++)_(z[V],w,U,b,T)}function R(C){C.target.removeEventListener("dispose",R);for(const U in l){const b=l[U],T=C.target.uuid;T in b&&(b[T].dispose(),delete b[T])}}}const Nm={[Bs]:zs,[ks]:Vs,[Hs]:Ws,[Mi]:Gs,[zs]:Bs,[Vs]:ks,[Ws]:Hs,[Gs]:Mi};function Fm(i,t){function e(){let N=!1;const dt=new se;let xt=null;const At=new se(0,0,0,0);return{setMask:function(ut){xt!==ut&&!N&&(i.colorMask(ut,ut,ut,ut),xt=ut)},setLocked:function(ut){N=ut},setClear:function(ut,nt,Lt,Gt,le){le===!0&&(ut*=Gt,nt*=Gt,Lt*=Gt),dt.set(ut,nt,Lt,Gt),At.equals(dt)===!1&&(i.clearColor(ut,nt,Lt,Gt),At.copy(dt))},reset:function(){N=!1,xt=null,At.set(-1,0,0,0)}}}function n(){let N=!1,dt=!1,xt=null,At=null,ut=null;return{setReversed:function(nt){if(dt!==nt){const Lt=t.get("EXT_clip_control");nt?Lt.clipControlEXT(Lt.LOWER_LEFT_EXT,Lt.ZERO_TO_ONE_EXT):Lt.clipControlEXT(Lt.LOWER_LEFT_EXT,Lt.NEGATIVE_ONE_TO_ONE_EXT),dt=nt;const Gt=ut;ut=null,this.setClear(Gt)}},getReversed:function(){return dt},setTest:function(nt){nt?it(i.DEPTH_TEST):Tt(i.DEPTH_TEST)},setMask:function(nt){xt!==nt&&!N&&(i.depthMask(nt),xt=nt)},setFunc:function(nt){if(dt&&(nt=Nm[nt]),At!==nt){switch(nt){case Bs:i.depthFunc(i.NEVER);break;case zs:i.depthFunc(i.ALWAYS);break;case ks:i.depthFunc(i.LESS);break;case Mi:i.depthFunc(i.LEQUAL);break;case Hs:i.depthFunc(i.EQUAL);break;case Gs:i.depthFunc(i.GEQUAL);break;case Vs:i.depthFunc(i.GREATER);break;case Ws:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}At=nt}},setLocked:function(nt){N=nt},setClear:function(nt){ut!==nt&&(dt&&(nt=1-nt),i.clearDepth(nt),ut=nt)},reset:function(){N=!1,xt=null,At=null,ut=null,dt=!1}}}function r(){let N=!1,dt=null,xt=null,At=null,ut=null,nt=null,Lt=null,Gt=null,le=null;return{setTest:function(ee){N||(ee?it(i.STENCIL_TEST):Tt(i.STENCIL_TEST))},setMask:function(ee){dt!==ee&&!N&&(i.stencilMask(ee),dt=ee)},setFunc:function(ee,dn,nn){(xt!==ee||At!==dn||ut!==nn)&&(i.stencilFunc(ee,dn,nn),xt=ee,At=dn,ut=nn)},setOp:function(ee,dn,nn){(nt!==ee||Lt!==dn||Gt!==nn)&&(i.stencilOp(ee,dn,nn),nt=ee,Lt=dn,Gt=nn)},setLocked:function(ee){N=ee},setClear:function(ee){le!==ee&&(i.clearStencil(ee),le=ee)},reset:function(){N=!1,dt=null,xt=null,At=null,ut=null,nt=null,Lt=null,Gt=null,le=null}}}const s=new e,o=new n,a=new r,c=new WeakMap,l=new WeakMap;let h={},f={},m=new WeakMap,p=[],g=null,x=!1,d=null,u=null,S=null,y=null,_=null,R=null,C=null,w=new qt(0,0,0),U=0,b=!1,T=null,L=null,z=null,V=null,J=null;const Y=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,j=0;const M=i.getParameter(i.VERSION);M.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec(M)[1]),X=j>=1):M.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(M)[1]),X=j>=2);let I=null,O={};const H=i.getParameter(i.SCISSOR_BOX),Z=i.getParameter(i.VIEWPORT),ot=new se().fromArray(H),gt=new se().fromArray(Z);function ct(N,dt,xt,At){const ut=new Uint8Array(4),nt=i.createTexture();i.bindTexture(N,nt),i.texParameteri(N,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(N,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Lt=0;Lt<xt;Lt++)N===i.TEXTURE_3D||N===i.TEXTURE_2D_ARRAY?i.texImage3D(dt,0,i.RGBA,1,1,At,0,i.RGBA,i.UNSIGNED_BYTE,ut):i.texImage2D(dt+Lt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ut);return nt}const G={};G[i.TEXTURE_2D]=ct(i.TEXTURE_2D,i.TEXTURE_2D,1),G[i.TEXTURE_CUBE_MAP]=ct(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),G[i.TEXTURE_2D_ARRAY]=ct(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),G[i.TEXTURE_3D]=ct(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),it(i.DEPTH_TEST),o.setFunc(Mi),tt(!1),Q(ea),it(i.CULL_FACE),st(Pn);function it(N){h[N]!==!0&&(i.enable(N),h[N]=!0)}function Tt(N){h[N]!==!1&&(i.disable(N),h[N]=!1)}function Dt(N,dt){return f[N]!==dt?(i.bindFramebuffer(N,dt),f[N]=dt,N===i.DRAW_FRAMEBUFFER&&(f[i.FRAMEBUFFER]=dt),N===i.FRAMEBUFFER&&(f[i.DRAW_FRAMEBUFFER]=dt),!0):!1}function wt(N,dt){let xt=p,At=!1;if(N){xt=m.get(dt),xt===void 0&&(xt=[],m.set(dt,xt));const ut=N.textures;if(xt.length!==ut.length||xt[0]!==i.COLOR_ATTACHMENT0){for(let nt=0,Lt=ut.length;nt<Lt;nt++)xt[nt]=i.COLOR_ATTACHMENT0+nt;xt.length=ut.length,At=!0}}else xt[0]!==i.BACK&&(xt[0]=i.BACK,At=!0);At&&i.drawBuffers(xt)}function Kt(N){return g!==N?(i.useProgram(N),g=N,!0):!1}const ae={[qn]:i.FUNC_ADD,[ac]:i.FUNC_SUBTRACT,[lc]:i.FUNC_REVERSE_SUBTRACT};ae[cc]=i.MIN,ae[hc]=i.MAX;const P={[uc]:i.ZERO,[fc]:i.ONE,[dc]:i.SRC_COLOR,[Fs]:i.SRC_ALPHA,[xc]:i.SRC_ALPHA_SATURATE,[_c]:i.DST_COLOR,[mc]:i.DST_ALPHA,[pc]:i.ONE_MINUS_SRC_COLOR,[Os]:i.ONE_MINUS_SRC_ALPHA,[vc]:i.ONE_MINUS_DST_COLOR,[gc]:i.ONE_MINUS_DST_ALPHA,[Mc]:i.CONSTANT_COLOR,[Sc]:i.ONE_MINUS_CONSTANT_COLOR,[yc]:i.CONSTANT_ALPHA,[Ec]:i.ONE_MINUS_CONSTANT_ALPHA};function st(N,dt,xt,At,ut,nt,Lt,Gt,le,ee){if(N===Pn){x===!0&&(Tt(i.BLEND),x=!1);return}if(x===!1&&(it(i.BLEND),x=!0),N!==oc){if(N!==d||ee!==b){if((u!==qn||_!==qn)&&(i.blendEquation(i.FUNC_ADD),u=qn,_=qn),ee)switch(N){case vi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ns:i.blendFunc(i.ONE,i.ONE);break;case na:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case ia:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case vi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ns:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case na:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case ia:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}S=null,y=null,R=null,C=null,w.set(0,0,0),U=0,d=N,b=ee}return}ut=ut||dt,nt=nt||xt,Lt=Lt||At,(dt!==u||ut!==_)&&(i.blendEquationSeparate(ae[dt],ae[ut]),u=dt,_=ut),(xt!==S||At!==y||nt!==R||Lt!==C)&&(i.blendFuncSeparate(P[xt],P[At],P[nt],P[Lt]),S=xt,y=At,R=nt,C=Lt),(Gt.equals(w)===!1||le!==U)&&(i.blendColor(Gt.r,Gt.g,Gt.b,le),w.copy(Gt),U=le),d=N,b=!1}function et(N,dt){N.side===sn?Tt(i.CULL_FACE):it(i.CULL_FACE);let xt=N.side===De;dt&&(xt=!xt),tt(xt),N.blending===vi&&N.transparent===!1?st(Pn):st(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),o.setFunc(N.depthFunc),o.setTest(N.depthTest),o.setMask(N.depthWrite),s.setMask(N.colorWrite);const At=N.stencilWrite;a.setTest(At),At&&(a.setMask(N.stencilWriteMask),a.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),a.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),lt(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?it(i.SAMPLE_ALPHA_TO_COVERAGE):Tt(i.SAMPLE_ALPHA_TO_COVERAGE)}function tt(N){T!==N&&(N?i.frontFace(i.CW):i.frontFace(i.CCW),T=N)}function Q(N){N!==rc?(it(i.CULL_FACE),N!==L&&(N===ea?i.cullFace(i.BACK):N===sc?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Tt(i.CULL_FACE),L=N}function _t(N){N!==z&&(X&&i.lineWidth(N),z=N)}function lt(N,dt,xt){N?(it(i.POLYGON_OFFSET_FILL),(V!==dt||J!==xt)&&(i.polygonOffset(dt,xt),V=dt,J=xt)):Tt(i.POLYGON_OFFSET_FILL)}function vt(N){N?it(i.SCISSOR_TEST):Tt(i.SCISSOR_TEST)}function Ht(N){N===void 0&&(N=i.TEXTURE0+Y-1),I!==N&&(i.activeTexture(N),I=N)}function kt(N,dt,xt){xt===void 0&&(I===null?xt=i.TEXTURE0+Y-1:xt=I);let At=O[xt];At===void 0&&(At={type:void 0,texture:void 0},O[xt]=At),(At.type!==N||At.texture!==dt)&&(I!==xt&&(i.activeTexture(xt),I=xt),i.bindTexture(N,dt||G[N]),At.type=N,At.texture=dt)}function A(){const N=O[I];N!==void 0&&N.type!==void 0&&(i.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function v(){try{i.compressedTexImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function k(){try{i.compressedTexImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function K(){try{i.texSubImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function rt(){try{i.texSubImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function $(){try{i.compressedTexSubImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function It(){try{i.compressedTexSubImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function mt(){try{i.texStorage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Ct(){try{i.texStorage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Pt(){try{i.texImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ht(){try{i.texImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Et(N){ot.equals(N)===!1&&(i.scissor(N.x,N.y,N.z,N.w),ot.copy(N))}function Bt(N){gt.equals(N)===!1&&(i.viewport(N.x,N.y,N.z,N.w),gt.copy(N))}function Ut(N,dt){let xt=l.get(dt);xt===void 0&&(xt=new WeakMap,l.set(dt,xt));let At=xt.get(N);At===void 0&&(At=i.getUniformBlockIndex(dt,N.name),xt.set(N,At))}function St(N,dt){const At=l.get(dt).get(N);c.get(dt)!==At&&(i.uniformBlockBinding(dt,At,N.__bindingPointIndex),c.set(dt,At))}function Vt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},I=null,O={},f={},m=new WeakMap,p=[],g=null,x=!1,d=null,u=null,S=null,y=null,_=null,R=null,C=null,w=new qt(0,0,0),U=0,b=!1,T=null,L=null,z=null,V=null,J=null,ot.set(0,0,i.canvas.width,i.canvas.height),gt.set(0,0,i.canvas.width,i.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:it,disable:Tt,bindFramebuffer:Dt,drawBuffers:wt,useProgram:Kt,setBlending:st,setMaterial:et,setFlipSided:tt,setCullFace:Q,setLineWidth:_t,setPolygonOffset:lt,setScissorTest:vt,activeTexture:Ht,bindTexture:kt,unbindTexture:A,compressedTexImage2D:v,compressedTexImage3D:k,texImage2D:Pt,texImage3D:ht,updateUBOMapping:Ut,uniformBlockBinding:St,texStorage2D:mt,texStorage3D:Ct,texSubImage2D:K,texSubImage3D:rt,compressedTexSubImage2D:$,compressedTexSubImage3D:It,scissor:Et,viewport:Bt,reset:Vt}}function Om(i,t,e,n,r,s,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new at,h=new WeakMap;let f;const m=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(A,v){return p?new OffscreenCanvas(A,v):kr("canvas")}function x(A,v,k){let K=1;const rt=kt(A);if((rt.width>k||rt.height>k)&&(K=k/Math.max(rt.width,rt.height)),K<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const $=Math.floor(K*rt.width),It=Math.floor(K*rt.height);f===void 0&&(f=g($,It));const mt=v?g($,It):f;return mt.width=$,mt.height=It,mt.getContext("2d").drawImage(A,0,0,$,It),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+rt.width+"x"+rt.height+") to ("+$+"x"+It+")."),mt}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+rt.width+"x"+rt.height+")."),A;return A}function d(A){return A.generateMipmaps}function u(A){i.generateMipmap(A)}function S(A){return A.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?i.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function y(A,v,k,K,rt=!1){if(A!==null){if(i[A]!==void 0)return i[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let $=v;if(v===i.RED&&(k===i.FLOAT&&($=i.R32F),k===i.HALF_FLOAT&&($=i.R16F),k===i.UNSIGNED_BYTE&&($=i.R8)),v===i.RED_INTEGER&&(k===i.UNSIGNED_BYTE&&($=i.R8UI),k===i.UNSIGNED_SHORT&&($=i.R16UI),k===i.UNSIGNED_INT&&($=i.R32UI),k===i.BYTE&&($=i.R8I),k===i.SHORT&&($=i.R16I),k===i.INT&&($=i.R32I)),v===i.RG&&(k===i.FLOAT&&($=i.RG32F),k===i.HALF_FLOAT&&($=i.RG16F),k===i.UNSIGNED_BYTE&&($=i.RG8)),v===i.RG_INTEGER&&(k===i.UNSIGNED_BYTE&&($=i.RG8UI),k===i.UNSIGNED_SHORT&&($=i.RG16UI),k===i.UNSIGNED_INT&&($=i.RG32UI),k===i.BYTE&&($=i.RG8I),k===i.SHORT&&($=i.RG16I),k===i.INT&&($=i.RG32I)),v===i.RGB_INTEGER&&(k===i.UNSIGNED_BYTE&&($=i.RGB8UI),k===i.UNSIGNED_SHORT&&($=i.RGB16UI),k===i.UNSIGNED_INT&&($=i.RGB32UI),k===i.BYTE&&($=i.RGB8I),k===i.SHORT&&($=i.RGB16I),k===i.INT&&($=i.RGB32I)),v===i.RGBA_INTEGER&&(k===i.UNSIGNED_BYTE&&($=i.RGBA8UI),k===i.UNSIGNED_SHORT&&($=i.RGBA16UI),k===i.UNSIGNED_INT&&($=i.RGBA32UI),k===i.BYTE&&($=i.RGBA8I),k===i.SHORT&&($=i.RGBA16I),k===i.INT&&($=i.RGBA32I)),v===i.RGB&&(k===i.UNSIGNED_INT_5_9_9_9_REV&&($=i.RGB9_E5),k===i.UNSIGNED_INT_10F_11F_11F_REV&&($=i.R11F_G11F_B10F)),v===i.RGBA){const It=rt?Br:te.getTransfer(K);k===i.FLOAT&&($=i.RGBA32F),k===i.HALF_FLOAT&&($=i.RGBA16F),k===i.UNSIGNED_BYTE&&($=It===ie?i.SRGB8_ALPHA8:i.RGBA8),k===i.UNSIGNED_SHORT_4_4_4_4&&($=i.RGBA4),k===i.UNSIGNED_SHORT_5_5_5_1&&($=i.RGB5_A1)}return($===i.R16F||$===i.R32F||$===i.RG16F||$===i.RG32F||$===i.RGBA16F||$===i.RGBA32F)&&t.get("EXT_color_buffer_float"),$}function _(A,v){let k;return A?v===null||v===Zn||v===Xi?k=i.DEPTH24_STENCIL8:v===ln?k=i.DEPTH32F_STENCIL8:v===Wi&&(k=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===Zn||v===Xi?k=i.DEPTH_COMPONENT24:v===ln?k=i.DEPTH_COMPONENT32F:v===Wi&&(k=i.DEPTH_COMPONENT16),k}function R(A,v){return d(A)===!0||A.isFramebufferTexture&&A.minFilter!==Ve&&A.minFilter!==an?Math.log2(Math.max(v.width,v.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?v.mipmaps.length:1}function C(A){const v=A.target;v.removeEventListener("dispose",C),U(v),v.isVideoTexture&&h.delete(v)}function w(A){const v=A.target;v.removeEventListener("dispose",w),T(v)}function U(A){const v=n.get(A);if(v.__webglInit===void 0)return;const k=A.source,K=m.get(k);if(K){const rt=K[v.__cacheKey];rt.usedTimes--,rt.usedTimes===0&&b(A),Object.keys(K).length===0&&m.delete(k)}n.remove(A)}function b(A){const v=n.get(A);i.deleteTexture(v.__webglTexture);const k=A.source,K=m.get(k);delete K[v.__cacheKey],o.memory.textures--}function T(A){const v=n.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),n.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(v.__webglFramebuffer[K]))for(let rt=0;rt<v.__webglFramebuffer[K].length;rt++)i.deleteFramebuffer(v.__webglFramebuffer[K][rt]);else i.deleteFramebuffer(v.__webglFramebuffer[K]);v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer[K])}else{if(Array.isArray(v.__webglFramebuffer))for(let K=0;K<v.__webglFramebuffer.length;K++)i.deleteFramebuffer(v.__webglFramebuffer[K]);else i.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&i.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let K=0;K<v.__webglColorRenderbuffer.length;K++)v.__webglColorRenderbuffer[K]&&i.deleteRenderbuffer(v.__webglColorRenderbuffer[K]);v.__webglDepthRenderbuffer&&i.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const k=A.textures;for(let K=0,rt=k.length;K<rt;K++){const $=n.get(k[K]);$.__webglTexture&&(i.deleteTexture($.__webglTexture),o.memory.textures--),n.remove(k[K])}n.remove(A)}let L=0;function z(){L=0}function V(){const A=L;return A>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+r.maxTextures),L+=1,A}function J(A){const v=[];return v.push(A.wrapS),v.push(A.wrapT),v.push(A.wrapR||0),v.push(A.magFilter),v.push(A.minFilter),v.push(A.anisotropy),v.push(A.internalFormat),v.push(A.format),v.push(A.type),v.push(A.generateMipmaps),v.push(A.premultiplyAlpha),v.push(A.flipY),v.push(A.unpackAlignment),v.push(A.colorSpace),v.join()}function Y(A,v){const k=n.get(A);if(A.isVideoTexture&&vt(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&k.__version!==A.version){const K=A.image;if(K===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{G(k,A,v);return}}else A.isExternalTexture&&(k.__webglTexture=A.sourceTexture?A.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,k.__webglTexture,i.TEXTURE0+v)}function X(A,v){const k=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&k.__version!==A.version){G(k,A,v);return}e.bindTexture(i.TEXTURE_2D_ARRAY,k.__webglTexture,i.TEXTURE0+v)}function j(A,v){const k=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&k.__version!==A.version){G(k,A,v);return}e.bindTexture(i.TEXTURE_3D,k.__webglTexture,i.TEXTURE0+v)}function M(A,v){const k=n.get(A);if(A.version>0&&k.__version!==A.version){it(k,A,v);return}e.bindTexture(i.TEXTURE_CUBE_MAP,k.__webglTexture,i.TEXTURE0+v)}const I={[Or]:i.REPEAT,[Kn]:i.CLAMP_TO_EDGE,[Ys]:i.MIRRORED_REPEAT},O={[Ve]:i.NEAREST,[Ic]:i.NEAREST_MIPMAP_NEAREST,[rr]:i.NEAREST_MIPMAP_LINEAR,[an]:i.LINEAR,[Zr]:i.LINEAR_MIPMAP_NEAREST,[Jn]:i.LINEAR_MIPMAP_LINEAR},H={[Fc]:i.NEVER,[Gc]:i.ALWAYS,[Oc]:i.LESS,[Sl]:i.LEQUAL,[Bc]:i.EQUAL,[Hc]:i.GEQUAL,[zc]:i.GREATER,[kc]:i.NOTEQUAL};function Z(A,v){if(v.type===ln&&t.has("OES_texture_float_linear")===!1&&(v.magFilter===an||v.magFilter===Zr||v.magFilter===rr||v.magFilter===Jn||v.minFilter===an||v.minFilter===Zr||v.minFilter===rr||v.minFilter===Jn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(A,i.TEXTURE_WRAP_S,I[v.wrapS]),i.texParameteri(A,i.TEXTURE_WRAP_T,I[v.wrapT]),(A===i.TEXTURE_3D||A===i.TEXTURE_2D_ARRAY)&&i.texParameteri(A,i.TEXTURE_WRAP_R,I[v.wrapR]),i.texParameteri(A,i.TEXTURE_MAG_FILTER,O[v.magFilter]),i.texParameteri(A,i.TEXTURE_MIN_FILTER,O[v.minFilter]),v.compareFunction&&(i.texParameteri(A,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(A,i.TEXTURE_COMPARE_FUNC,H[v.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Ve||v.minFilter!==rr&&v.minFilter!==Jn||v.type===ln&&t.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){const k=t.get("EXT_texture_filter_anisotropic");i.texParameterf(A,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,r.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function ot(A,v){let k=!1;A.__webglInit===void 0&&(A.__webglInit=!0,v.addEventListener("dispose",C));const K=v.source;let rt=m.get(K);rt===void 0&&(rt={},m.set(K,rt));const $=J(v);if($!==A.__cacheKey){rt[$]===void 0&&(rt[$]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,k=!0),rt[$].usedTimes++;const It=rt[A.__cacheKey];It!==void 0&&(rt[A.__cacheKey].usedTimes--,It.usedTimes===0&&b(v)),A.__cacheKey=$,A.__webglTexture=rt[$].texture}return k}function gt(A,v,k){return Math.floor(Math.floor(A/k)/v)}function ct(A,v,k,K){const $=A.updateRanges;if($.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,v.width,v.height,k,K,v.data);else{$.sort((ht,Et)=>ht.start-Et.start);let It=0;for(let ht=1;ht<$.length;ht++){const Et=$[It],Bt=$[ht],Ut=Et.start+Et.count,St=gt(Bt.start,v.width,4),Vt=gt(Et.start,v.width,4);Bt.start<=Ut+1&&St===Vt&&gt(Bt.start+Bt.count-1,v.width,4)===St?Et.count=Math.max(Et.count,Bt.start+Bt.count-Et.start):(++It,$[It]=Bt)}$.length=It+1;const mt=i.getParameter(i.UNPACK_ROW_LENGTH),Ct=i.getParameter(i.UNPACK_SKIP_PIXELS),Pt=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,v.width);for(let ht=0,Et=$.length;ht<Et;ht++){const Bt=$[ht],Ut=Math.floor(Bt.start/4),St=Math.ceil(Bt.count/4),Vt=Ut%v.width,N=Math.floor(Ut/v.width),dt=St,xt=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,Vt),i.pixelStorei(i.UNPACK_SKIP_ROWS,N),e.texSubImage2D(i.TEXTURE_2D,0,Vt,N,dt,xt,k,K,v.data)}A.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,mt),i.pixelStorei(i.UNPACK_SKIP_PIXELS,Ct),i.pixelStorei(i.UNPACK_SKIP_ROWS,Pt)}}function G(A,v,k){let K=i.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(K=i.TEXTURE_2D_ARRAY),v.isData3DTexture&&(K=i.TEXTURE_3D);const rt=ot(A,v),$=v.source;e.bindTexture(K,A.__webglTexture,i.TEXTURE0+k);const It=n.get($);if($.version!==It.__version||rt===!0){e.activeTexture(i.TEXTURE0+k);const mt=te.getPrimaries(te.workingColorSpace),Ct=v.colorSpace===Cn?null:te.getPrimaries(v.colorSpace),Pt=v.colorSpace===Cn||mt===Ct?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Pt);let ht=x(v.image,!1,r.maxTextureSize);ht=Ht(v,ht);const Et=s.convert(v.format,v.colorSpace),Bt=s.convert(v.type);let Ut=y(v.internalFormat,Et,Bt,v.colorSpace,v.isVideoTexture);Z(K,v);let St;const Vt=v.mipmaps,N=v.isVideoTexture!==!0,dt=It.__version===void 0||rt===!0,xt=$.dataReady,At=R(v,ht);if(v.isDepthTexture)Ut=_(v.format===Yi,v.type),dt&&(N?e.texStorage2D(i.TEXTURE_2D,1,Ut,ht.width,ht.height):e.texImage2D(i.TEXTURE_2D,0,Ut,ht.width,ht.height,0,Et,Bt,null));else if(v.isDataTexture)if(Vt.length>0){N&&dt&&e.texStorage2D(i.TEXTURE_2D,At,Ut,Vt[0].width,Vt[0].height);for(let ut=0,nt=Vt.length;ut<nt;ut++)St=Vt[ut],N?xt&&e.texSubImage2D(i.TEXTURE_2D,ut,0,0,St.width,St.height,Et,Bt,St.data):e.texImage2D(i.TEXTURE_2D,ut,Ut,St.width,St.height,0,Et,Bt,St.data);v.generateMipmaps=!1}else N?(dt&&e.texStorage2D(i.TEXTURE_2D,At,Ut,ht.width,ht.height),xt&&ct(v,ht,Et,Bt)):e.texImage2D(i.TEXTURE_2D,0,Ut,ht.width,ht.height,0,Et,Bt,ht.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){N&&dt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,At,Ut,Vt[0].width,Vt[0].height,ht.depth);for(let ut=0,nt=Vt.length;ut<nt;ut++)if(St=Vt[ut],v.format!==tn)if(Et!==null)if(N){if(xt)if(v.layerUpdates.size>0){const Lt=Fa(St.width,St.height,v.format,v.type);for(const Gt of v.layerUpdates){const le=St.data.subarray(Gt*Lt/St.data.BYTES_PER_ELEMENT,(Gt+1)*Lt/St.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ut,0,0,Gt,St.width,St.height,1,Et,le)}v.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ut,0,0,0,St.width,St.height,ht.depth,Et,St.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ut,Ut,St.width,St.height,ht.depth,0,St.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else N?xt&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,ut,0,0,0,St.width,St.height,ht.depth,Et,Bt,St.data):e.texImage3D(i.TEXTURE_2D_ARRAY,ut,Ut,St.width,St.height,ht.depth,0,Et,Bt,St.data)}else{N&&dt&&e.texStorage2D(i.TEXTURE_2D,At,Ut,Vt[0].width,Vt[0].height);for(let ut=0,nt=Vt.length;ut<nt;ut++)St=Vt[ut],v.format!==tn?Et!==null?N?xt&&e.compressedTexSubImage2D(i.TEXTURE_2D,ut,0,0,St.width,St.height,Et,St.data):e.compressedTexImage2D(i.TEXTURE_2D,ut,Ut,St.width,St.height,0,St.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):N?xt&&e.texSubImage2D(i.TEXTURE_2D,ut,0,0,St.width,St.height,Et,Bt,St.data):e.texImage2D(i.TEXTURE_2D,ut,Ut,St.width,St.height,0,Et,Bt,St.data)}else if(v.isDataArrayTexture)if(N){if(dt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,At,Ut,ht.width,ht.height,ht.depth),xt)if(v.layerUpdates.size>0){const ut=Fa(ht.width,ht.height,v.format,v.type);for(const nt of v.layerUpdates){const Lt=ht.data.subarray(nt*ut/ht.data.BYTES_PER_ELEMENT,(nt+1)*ut/ht.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,nt,ht.width,ht.height,1,Et,Bt,Lt)}v.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ht.width,ht.height,ht.depth,Et,Bt,ht.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Ut,ht.width,ht.height,ht.depth,0,Et,Bt,ht.data);else if(v.isData3DTexture)N?(dt&&e.texStorage3D(i.TEXTURE_3D,At,Ut,ht.width,ht.height,ht.depth),xt&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ht.width,ht.height,ht.depth,Et,Bt,ht.data)):e.texImage3D(i.TEXTURE_3D,0,Ut,ht.width,ht.height,ht.depth,0,Et,Bt,ht.data);else if(v.isFramebufferTexture){if(dt)if(N)e.texStorage2D(i.TEXTURE_2D,At,Ut,ht.width,ht.height);else{let ut=ht.width,nt=ht.height;for(let Lt=0;Lt<At;Lt++)e.texImage2D(i.TEXTURE_2D,Lt,Ut,ut,nt,0,Et,Bt,null),ut>>=1,nt>>=1}}else if(Vt.length>0){if(N&&dt){const ut=kt(Vt[0]);e.texStorage2D(i.TEXTURE_2D,At,Ut,ut.width,ut.height)}for(let ut=0,nt=Vt.length;ut<nt;ut++)St=Vt[ut],N?xt&&e.texSubImage2D(i.TEXTURE_2D,ut,0,0,Et,Bt,St):e.texImage2D(i.TEXTURE_2D,ut,Ut,Et,Bt,St);v.generateMipmaps=!1}else if(N){if(dt){const ut=kt(ht);e.texStorage2D(i.TEXTURE_2D,At,Ut,ut.width,ut.height)}xt&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,Et,Bt,ht)}else e.texImage2D(i.TEXTURE_2D,0,Ut,Et,Bt,ht);d(v)&&u(K),It.__version=$.version,v.onUpdate&&v.onUpdate(v)}A.__version=v.version}function it(A,v,k){if(v.image.length!==6)return;const K=ot(A,v),rt=v.source;e.bindTexture(i.TEXTURE_CUBE_MAP,A.__webglTexture,i.TEXTURE0+k);const $=n.get(rt);if(rt.version!==$.__version||K===!0){e.activeTexture(i.TEXTURE0+k);const It=te.getPrimaries(te.workingColorSpace),mt=v.colorSpace===Cn?null:te.getPrimaries(v.colorSpace),Ct=v.colorSpace===Cn||It===mt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ct);const Pt=v.isCompressedTexture||v.image[0].isCompressedTexture,ht=v.image[0]&&v.image[0].isDataTexture,Et=[];for(let nt=0;nt<6;nt++)!Pt&&!ht?Et[nt]=x(v.image[nt],!0,r.maxCubemapSize):Et[nt]=ht?v.image[nt].image:v.image[nt],Et[nt]=Ht(v,Et[nt]);const Bt=Et[0],Ut=s.convert(v.format,v.colorSpace),St=s.convert(v.type),Vt=y(v.internalFormat,Ut,St,v.colorSpace),N=v.isVideoTexture!==!0,dt=$.__version===void 0||K===!0,xt=rt.dataReady;let At=R(v,Bt);Z(i.TEXTURE_CUBE_MAP,v);let ut;if(Pt){N&&dt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,At,Vt,Bt.width,Bt.height);for(let nt=0;nt<6;nt++){ut=Et[nt].mipmaps;for(let Lt=0;Lt<ut.length;Lt++){const Gt=ut[Lt];v.format!==tn?Ut!==null?N?xt&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Lt,0,0,Gt.width,Gt.height,Ut,Gt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Lt,Vt,Gt.width,Gt.height,0,Gt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):N?xt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Lt,0,0,Gt.width,Gt.height,Ut,St,Gt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Lt,Vt,Gt.width,Gt.height,0,Ut,St,Gt.data)}}}else{if(ut=v.mipmaps,N&&dt){ut.length>0&&At++;const nt=kt(Et[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,At,Vt,nt.width,nt.height)}for(let nt=0;nt<6;nt++)if(ht){N?xt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,0,0,Et[nt].width,Et[nt].height,Ut,St,Et[nt].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,Vt,Et[nt].width,Et[nt].height,0,Ut,St,Et[nt].data);for(let Lt=0;Lt<ut.length;Lt++){const le=ut[Lt].image[nt].image;N?xt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Lt+1,0,0,le.width,le.height,Ut,St,le.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Lt+1,Vt,le.width,le.height,0,Ut,St,le.data)}}else{N?xt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,0,0,Ut,St,Et[nt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,Vt,Ut,St,Et[nt]);for(let Lt=0;Lt<ut.length;Lt++){const Gt=ut[Lt];N?xt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Lt+1,0,0,Ut,St,Gt.image[nt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Lt+1,Vt,Ut,St,Gt.image[nt])}}}d(v)&&u(i.TEXTURE_CUBE_MAP),$.__version=rt.version,v.onUpdate&&v.onUpdate(v)}A.__version=v.version}function Tt(A,v,k,K,rt,$){const It=s.convert(k.format,k.colorSpace),mt=s.convert(k.type),Ct=y(k.internalFormat,It,mt,k.colorSpace),Pt=n.get(v),ht=n.get(k);if(ht.__renderTarget=v,!Pt.__hasExternalTextures){const Et=Math.max(1,v.width>>$),Bt=Math.max(1,v.height>>$);rt===i.TEXTURE_3D||rt===i.TEXTURE_2D_ARRAY?e.texImage3D(rt,$,Ct,Et,Bt,v.depth,0,It,mt,null):e.texImage2D(rt,$,Ct,Et,Bt,0,It,mt,null)}e.bindFramebuffer(i.FRAMEBUFFER,A),lt(v)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,K,rt,ht.__webglTexture,0,_t(v)):(rt===i.TEXTURE_2D||rt>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&rt<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,K,rt,ht.__webglTexture,$),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Dt(A,v,k){if(i.bindRenderbuffer(i.RENDERBUFFER,A),v.depthBuffer){const K=v.depthTexture,rt=K&&K.isDepthTexture?K.type:null,$=_(v.stencilBuffer,rt),It=v.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,mt=_t(v);lt(v)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,mt,$,v.width,v.height):k?i.renderbufferStorageMultisample(i.RENDERBUFFER,mt,$,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,$,v.width,v.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,It,i.RENDERBUFFER,A)}else{const K=v.textures;for(let rt=0;rt<K.length;rt++){const $=K[rt],It=s.convert($.format,$.colorSpace),mt=s.convert($.type),Ct=y($.internalFormat,It,mt,$.colorSpace),Pt=_t(v);k&&lt(v)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Pt,Ct,v.width,v.height):lt(v)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Pt,Ct,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,Ct,v.width,v.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function wt(A,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,A),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const K=n.get(v.depthTexture);K.__renderTarget=v,(!K.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),Y(v.depthTexture,0);const rt=K.__webglTexture,$=_t(v);if(v.depthTexture.format===qi)lt(v)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,rt,0,$):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,rt,0);else if(v.depthTexture.format===Yi)lt(v)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,rt,0,$):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,rt,0);else throw new Error("Unknown depthTexture format")}function Kt(A){const v=n.get(A),k=A.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==A.depthTexture){const K=A.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),K){const rt=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,K.removeEventListener("dispose",rt)};K.addEventListener("dispose",rt),v.__depthDisposeCallback=rt}v.__boundDepthTexture=K}if(A.depthTexture&&!v.__autoAllocateDepthBuffer){if(k)throw new Error("target.depthTexture not supported in Cube render targets");const K=A.texture.mipmaps;K&&K.length>0?wt(v.__webglFramebuffer[0],A):wt(v.__webglFramebuffer,A)}else if(k){v.__webglDepthbuffer=[];for(let K=0;K<6;K++)if(e.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[K]),v.__webglDepthbuffer[K]===void 0)v.__webglDepthbuffer[K]=i.createRenderbuffer(),Dt(v.__webglDepthbuffer[K],A,!1);else{const rt=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,$=v.__webglDepthbuffer[K];i.bindRenderbuffer(i.RENDERBUFFER,$),i.framebufferRenderbuffer(i.FRAMEBUFFER,rt,i.RENDERBUFFER,$)}}else{const K=A.texture.mipmaps;if(K&&K.length>0?e.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=i.createRenderbuffer(),Dt(v.__webglDepthbuffer,A,!1);else{const rt=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,$=v.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,$),i.framebufferRenderbuffer(i.FRAMEBUFFER,rt,i.RENDERBUFFER,$)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function ae(A,v,k){const K=n.get(A);v!==void 0&&Tt(K.__webglFramebuffer,A,A.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),k!==void 0&&Kt(A)}function P(A){const v=A.texture,k=n.get(A),K=n.get(v);A.addEventListener("dispose",w);const rt=A.textures,$=A.isWebGLCubeRenderTarget===!0,It=rt.length>1;if(It||(K.__webglTexture===void 0&&(K.__webglTexture=i.createTexture()),K.__version=v.version,o.memory.textures++),$){k.__webglFramebuffer=[];for(let mt=0;mt<6;mt++)if(v.mipmaps&&v.mipmaps.length>0){k.__webglFramebuffer[mt]=[];for(let Ct=0;Ct<v.mipmaps.length;Ct++)k.__webglFramebuffer[mt][Ct]=i.createFramebuffer()}else k.__webglFramebuffer[mt]=i.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){k.__webglFramebuffer=[];for(let mt=0;mt<v.mipmaps.length;mt++)k.__webglFramebuffer[mt]=i.createFramebuffer()}else k.__webglFramebuffer=i.createFramebuffer();if(It)for(let mt=0,Ct=rt.length;mt<Ct;mt++){const Pt=n.get(rt[mt]);Pt.__webglTexture===void 0&&(Pt.__webglTexture=i.createTexture(),o.memory.textures++)}if(A.samples>0&&lt(A)===!1){k.__webglMultisampledFramebuffer=i.createFramebuffer(),k.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let mt=0;mt<rt.length;mt++){const Ct=rt[mt];k.__webglColorRenderbuffer[mt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,k.__webglColorRenderbuffer[mt]);const Pt=s.convert(Ct.format,Ct.colorSpace),ht=s.convert(Ct.type),Et=y(Ct.internalFormat,Pt,ht,Ct.colorSpace,A.isXRRenderTarget===!0),Bt=_t(A);i.renderbufferStorageMultisample(i.RENDERBUFFER,Bt,Et,A.width,A.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+mt,i.RENDERBUFFER,k.__webglColorRenderbuffer[mt])}i.bindRenderbuffer(i.RENDERBUFFER,null),A.depthBuffer&&(k.__webglDepthRenderbuffer=i.createRenderbuffer(),Dt(k.__webglDepthRenderbuffer,A,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if($){e.bindTexture(i.TEXTURE_CUBE_MAP,K.__webglTexture),Z(i.TEXTURE_CUBE_MAP,v);for(let mt=0;mt<6;mt++)if(v.mipmaps&&v.mipmaps.length>0)for(let Ct=0;Ct<v.mipmaps.length;Ct++)Tt(k.__webglFramebuffer[mt][Ct],A,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+mt,Ct);else Tt(k.__webglFramebuffer[mt],A,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+mt,0);d(v)&&u(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(It){for(let mt=0,Ct=rt.length;mt<Ct;mt++){const Pt=rt[mt],ht=n.get(Pt);let Et=i.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(Et=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(Et,ht.__webglTexture),Z(Et,Pt),Tt(k.__webglFramebuffer,A,Pt,i.COLOR_ATTACHMENT0+mt,Et,0),d(Pt)&&u(Et)}e.unbindTexture()}else{let mt=i.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(mt=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(mt,K.__webglTexture),Z(mt,v),v.mipmaps&&v.mipmaps.length>0)for(let Ct=0;Ct<v.mipmaps.length;Ct++)Tt(k.__webglFramebuffer[Ct],A,v,i.COLOR_ATTACHMENT0,mt,Ct);else Tt(k.__webglFramebuffer,A,v,i.COLOR_ATTACHMENT0,mt,0);d(v)&&u(mt),e.unbindTexture()}A.depthBuffer&&Kt(A)}function st(A){const v=A.textures;for(let k=0,K=v.length;k<K;k++){const rt=v[k];if(d(rt)){const $=S(A),It=n.get(rt).__webglTexture;e.bindTexture($,It),u($),e.unbindTexture()}}}const et=[],tt=[];function Q(A){if(A.samples>0){if(lt(A)===!1){const v=A.textures,k=A.width,K=A.height;let rt=i.COLOR_BUFFER_BIT;const $=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,It=n.get(A),mt=v.length>1;if(mt)for(let Pt=0;Pt<v.length;Pt++)e.bindFramebuffer(i.FRAMEBUFFER,It.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Pt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,It.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Pt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,It.__webglMultisampledFramebuffer);const Ct=A.texture.mipmaps;Ct&&Ct.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,It.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,It.__webglFramebuffer);for(let Pt=0;Pt<v.length;Pt++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(rt|=i.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(rt|=i.STENCIL_BUFFER_BIT)),mt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,It.__webglColorRenderbuffer[Pt]);const ht=n.get(v[Pt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ht,0)}i.blitFramebuffer(0,0,k,K,0,0,k,K,rt,i.NEAREST),c===!0&&(et.length=0,tt.length=0,et.push(i.COLOR_ATTACHMENT0+Pt),A.depthBuffer&&A.resolveDepthBuffer===!1&&(et.push($),tt.push($),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,tt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,et))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),mt)for(let Pt=0;Pt<v.length;Pt++){e.bindFramebuffer(i.FRAMEBUFFER,It.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Pt,i.RENDERBUFFER,It.__webglColorRenderbuffer[Pt]);const ht=n.get(v[Pt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,It.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Pt,i.TEXTURE_2D,ht,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,It.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&c){const v=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[v])}}}function _t(A){return Math.min(r.maxSamples,A.samples)}function lt(A){const v=n.get(A);return A.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function vt(A){const v=o.render.frame;h.get(A)!==v&&(h.set(A,v),A.update())}function Ht(A,v){const k=A.colorSpace,K=A.format,rt=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||k!==Ei&&k!==Cn&&(te.getTransfer(k)===ie?(K!==tn||rt!==un)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",k)),v}function kt(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(l.width=A.naturalWidth||A.width,l.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(l.width=A.displayWidth,l.height=A.displayHeight):(l.width=A.width,l.height=A.height),l}this.allocateTextureUnit=V,this.resetTextureUnits=z,this.setTexture2D=Y,this.setTexture2DArray=X,this.setTexture3D=j,this.setTextureCube=M,this.rebindTextures=ae,this.setupRenderTarget=P,this.updateRenderTargetMipmap=st,this.updateMultisampleRenderTarget=Q,this.setupDepthRenderbuffer=Kt,this.setupFrameBufferTexture=Tt,this.useMultisampledRTT=lt}function Bm(i,t){function e(n,r=Cn){let s;const o=te.getTransfer(r);if(n===un)return i.UNSIGNED_BYTE;if(n===Lo)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Io)return i.UNSIGNED_SHORT_5_5_5_1;if(n===gl)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===_l)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===pl)return i.BYTE;if(n===ml)return i.SHORT;if(n===Wi)return i.UNSIGNED_SHORT;if(n===Po)return i.INT;if(n===Zn)return i.UNSIGNED_INT;if(n===ln)return i.FLOAT;if(n===ji)return i.HALF_FLOAT;if(n===vl)return i.ALPHA;if(n===xl)return i.RGB;if(n===tn)return i.RGBA;if(n===qi)return i.DEPTH_COMPONENT;if(n===Yi)return i.DEPTH_STENCIL;if(n===Do)return i.RED;if(n===Uo)return i.RED_INTEGER;if(n===Ml)return i.RG;if(n===No)return i.RG_INTEGER;if(n===Fo)return i.RGBA_INTEGER;if(n===Lr||n===Ir||n===Dr||n===Ur)if(o===ie)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Lr)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ir)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Dr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ur)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Lr)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ir)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Dr)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ur)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Ks||n===Js||n===Zs||n===$s)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===Ks)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Js)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Zs)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===$s)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===js||n===Qs||n===to)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(n===js||n===Qs)return o===ie?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===to)return o===ie?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===eo||n===no||n===io||n===ro||n===so||n===oo||n===ao||n===lo||n===co||n===ho||n===uo||n===fo||n===po||n===mo)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(n===eo)return o===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===no)return o===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===io)return o===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ro)return o===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===so)return o===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===oo)return o===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===ao)return o===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===lo)return o===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===co)return o===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===ho)return o===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===uo)return o===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===fo)return o===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===po)return o===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===mo)return o===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===go||n===_o||n===vo)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(n===go)return o===ie?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===_o)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===vo)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===xo||n===Mo||n===So||n===yo)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(n===xo)return s.COMPRESSED_RED_RGTC1_EXT;if(n===Mo)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===So)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===yo)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Xi?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}const zm=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,km=`
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

}`;class Hm{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new Ul(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Un({vertexShader:zm,fragmentShader:km,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new ge(new In(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Gm extends Ai{constructor(t,e){super();const n=this;let r=null,s=1,o=null,a="local-floor",c=1,l=null,h=null,f=null,m=null,p=null,g=null;const x=typeof XRWebGLBinding<"u",d=new Hm,u={},S=e.getContextAttributes();let y=null,_=null;const R=[],C=[],w=new at;let U=null;const b=new Ge;b.viewport=new se;const T=new Ge;T.viewport=new se;const L=[b,T],z=new lu;let V=null,J=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(G){let it=R[G];return it===void 0&&(it=new xs,R[G]=it),it.getTargetRaySpace()},this.getControllerGrip=function(G){let it=R[G];return it===void 0&&(it=new xs,R[G]=it),it.getGripSpace()},this.getHand=function(G){let it=R[G];return it===void 0&&(it=new xs,R[G]=it),it.getHandSpace()};function Y(G){const it=C.indexOf(G.inputSource);if(it===-1)return;const Tt=R[it];Tt!==void 0&&(Tt.update(G.inputSource,G.frame,l||o),Tt.dispatchEvent({type:G.type,data:G.inputSource}))}function X(){r.removeEventListener("select",Y),r.removeEventListener("selectstart",Y),r.removeEventListener("selectend",Y),r.removeEventListener("squeeze",Y),r.removeEventListener("squeezestart",Y),r.removeEventListener("squeezeend",Y),r.removeEventListener("end",X),r.removeEventListener("inputsourceschange",j);for(let G=0;G<R.length;G++){const it=C[G];it!==null&&(C[G]=null,R[G].disconnect(it))}V=null,J=null,d.reset();for(const G in u)delete u[G];t.setRenderTarget(y),p=null,m=null,f=null,r=null,_=null,ct.stop(),n.isPresenting=!1,t.setPixelRatio(U),t.setSize(w.width,w.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(G){s=G,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(G){a=G,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(G){l=G},this.getBaseLayer=function(){return m!==null?m:p},this.getBinding=function(){return f===null&&x&&(f=new XRWebGLBinding(r,e)),f},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(G){if(r=G,r!==null){if(y=t.getRenderTarget(),r.addEventListener("select",Y),r.addEventListener("selectstart",Y),r.addEventListener("selectend",Y),r.addEventListener("squeeze",Y),r.addEventListener("squeezestart",Y),r.addEventListener("squeezeend",Y),r.addEventListener("end",X),r.addEventListener("inputsourceschange",j),S.xrCompatible!==!0&&await e.makeXRCompatible(),U=t.getPixelRatio(),t.getSize(w),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let Tt=null,Dt=null,wt=null;S.depth&&(wt=S.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,Tt=S.stencil?Yi:qi,Dt=S.stencil?Xi:Zn);const Kt={colorFormat:e.RGBA8,depthFormat:wt,scaleFactor:s};f=this.getBinding(),m=f.createProjectionLayer(Kt),r.updateRenderState({layers:[m]}),t.setPixelRatio(1),t.setSize(m.textureWidth,m.textureHeight,!1),_=new $n(m.textureWidth,m.textureHeight,{format:tn,type:un,depthTexture:new Dl(m.textureWidth,m.textureHeight,Dt,void 0,void 0,void 0,void 0,void 0,void 0,Tt),stencilBuffer:S.stencil,colorSpace:t.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1})}else{const Tt={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,e,Tt),r.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),_=new $n(p.framebufferWidth,p.framebufferHeight,{format:tn,type:un,colorSpace:t.outputColorSpace,stencilBuffer:S.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await r.requestReferenceSpace(a),ct.setContext(r),ct.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return d.getDepthTexture()};function j(G){for(let it=0;it<G.removed.length;it++){const Tt=G.removed[it],Dt=C.indexOf(Tt);Dt>=0&&(C[Dt]=null,R[Dt].disconnect(Tt))}for(let it=0;it<G.added.length;it++){const Tt=G.added[it];let Dt=C.indexOf(Tt);if(Dt===-1){for(let Kt=0;Kt<R.length;Kt++)if(Kt>=C.length){C.push(Tt),Dt=Kt;break}else if(C[Kt]===null){C[Kt]=Tt,Dt=Kt;break}if(Dt===-1)break}const wt=R[Dt];wt&&wt.connect(Tt)}}const M=new D,I=new D;function O(G,it,Tt){M.setFromMatrixPosition(it.matrixWorld),I.setFromMatrixPosition(Tt.matrixWorld);const Dt=M.distanceTo(I),wt=it.projectionMatrix.elements,Kt=Tt.projectionMatrix.elements,ae=wt[14]/(wt[10]-1),P=wt[14]/(wt[10]+1),st=(wt[9]+1)/wt[5],et=(wt[9]-1)/wt[5],tt=(wt[8]-1)/wt[0],Q=(Kt[8]+1)/Kt[0],_t=ae*tt,lt=ae*Q,vt=Dt/(-tt+Q),Ht=vt*-tt;if(it.matrixWorld.decompose(G.position,G.quaternion,G.scale),G.translateX(Ht),G.translateZ(vt),G.matrixWorld.compose(G.position,G.quaternion,G.scale),G.matrixWorldInverse.copy(G.matrixWorld).invert(),wt[10]===-1)G.projectionMatrix.copy(it.projectionMatrix),G.projectionMatrixInverse.copy(it.projectionMatrixInverse);else{const kt=ae+vt,A=P+vt,v=_t-Ht,k=lt+(Dt-Ht),K=st*P/A*kt,rt=et*P/A*kt;G.projectionMatrix.makePerspective(v,k,K,rt,kt,A),G.projectionMatrixInverse.copy(G.projectionMatrix).invert()}}function H(G,it){it===null?G.matrixWorld.copy(G.matrix):G.matrixWorld.multiplyMatrices(it.matrixWorld,G.matrix),G.matrixWorldInverse.copy(G.matrixWorld).invert()}this.updateCamera=function(G){if(r===null)return;let it=G.near,Tt=G.far;d.texture!==null&&(d.depthNear>0&&(it=d.depthNear),d.depthFar>0&&(Tt=d.depthFar)),z.near=T.near=b.near=it,z.far=T.far=b.far=Tt,(V!==z.near||J!==z.far)&&(r.updateRenderState({depthNear:z.near,depthFar:z.far}),V=z.near,J=z.far),z.layers.mask=G.layers.mask|6,b.layers.mask=z.layers.mask&3,T.layers.mask=z.layers.mask&5;const Dt=G.parent,wt=z.cameras;H(z,Dt);for(let Kt=0;Kt<wt.length;Kt++)H(wt[Kt],Dt);wt.length===2?O(z,b,T):z.projectionMatrix.copy(b.projectionMatrix),Z(G,z,Dt)};function Z(G,it,Tt){Tt===null?G.matrix.copy(it.matrixWorld):(G.matrix.copy(Tt.matrixWorld),G.matrix.invert(),G.matrix.multiply(it.matrixWorld)),G.matrix.decompose(G.position,G.quaternion,G.scale),G.updateMatrixWorld(!0),G.projectionMatrix.copy(it.projectionMatrix),G.projectionMatrixInverse.copy(it.projectionMatrixInverse),G.isPerspectiveCamera&&(G.fov=Eo*2*Math.atan(1/G.projectionMatrix.elements[5]),G.zoom=1)}this.getCamera=function(){return z},this.getFoveation=function(){if(!(m===null&&p===null))return c},this.setFoveation=function(G){c=G,m!==null&&(m.fixedFoveation=G),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=G)},this.hasDepthSensing=function(){return d.texture!==null},this.getDepthSensingMesh=function(){return d.getMesh(z)},this.getCameraTexture=function(G){return u[G]};let ot=null;function gt(G,it){if(h=it.getViewerPose(l||o),g=it,h!==null){const Tt=h.views;p!==null&&(t.setRenderTargetFramebuffer(_,p.framebuffer),t.setRenderTarget(_));let Dt=!1;Tt.length!==z.cameras.length&&(z.cameras.length=0,Dt=!0);for(let P=0;P<Tt.length;P++){const st=Tt[P];let et=null;if(p!==null)et=p.getViewport(st);else{const Q=f.getViewSubImage(m,st);et=Q.viewport,P===0&&(t.setRenderTargetTextures(_,Q.colorTexture,Q.depthStencilTexture),t.setRenderTarget(_))}let tt=L[P];tt===void 0&&(tt=new Ge,tt.layers.enable(P),tt.viewport=new se,L[P]=tt),tt.matrix.fromArray(st.transform.matrix),tt.matrix.decompose(tt.position,tt.quaternion,tt.scale),tt.projectionMatrix.fromArray(st.projectionMatrix),tt.projectionMatrixInverse.copy(tt.projectionMatrix).invert(),tt.viewport.set(et.x,et.y,et.width,et.height),P===0&&(z.matrix.copy(tt.matrix),z.matrix.decompose(z.position,z.quaternion,z.scale)),Dt===!0&&z.cameras.push(tt)}const wt=r.enabledFeatures;if(wt&&wt.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&x){f=n.getBinding();const P=f.getDepthInformation(Tt[0]);P&&P.isValid&&P.texture&&d.init(P,r.renderState)}if(wt&&wt.includes("camera-access")&&x){t.state.unbindTexture(),f=n.getBinding();for(let P=0;P<Tt.length;P++){const st=Tt[P].camera;if(st){let et=u[st];et||(et=new Ul,u[st]=et);const tt=f.getCameraImage(st);et.sourceTexture=tt}}}}for(let Tt=0;Tt<R.length;Tt++){const Dt=C[Tt],wt=R[Tt];Dt!==null&&wt!==void 0&&wt.update(Dt,it,l||o)}ot&&ot(G,it),it.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:it}),g=null}const ct=new Yl;ct.setAnimationLoop(gt),this.setAnimationLoop=function(G){ot=G},this.dispose=function(){}}}const Vn=new en,Vm=new ce;function Wm(i,t){function e(d,u){d.matrixAutoUpdate===!0&&d.updateMatrix(),u.value.copy(d.matrix)}function n(d,u){u.color.getRGB(d.fogColor.value,Rl(i)),u.isFog?(d.fogNear.value=u.near,d.fogFar.value=u.far):u.isFogExp2&&(d.fogDensity.value=u.density)}function r(d,u,S,y,_){u.isMeshBasicMaterial||u.isMeshLambertMaterial?s(d,u):u.isMeshToonMaterial?(s(d,u),f(d,u)):u.isMeshPhongMaterial?(s(d,u),h(d,u)):u.isMeshStandardMaterial?(s(d,u),m(d,u),u.isMeshPhysicalMaterial&&p(d,u,_)):u.isMeshMatcapMaterial?(s(d,u),g(d,u)):u.isMeshDepthMaterial?s(d,u):u.isMeshDistanceMaterial?(s(d,u),x(d,u)):u.isMeshNormalMaterial?s(d,u):u.isLineBasicMaterial?(o(d,u),u.isLineDashedMaterial&&a(d,u)):u.isPointsMaterial?c(d,u,S,y):u.isSpriteMaterial?l(d,u):u.isShadowMaterial?(d.color.value.copy(u.color),d.opacity.value=u.opacity):u.isShaderMaterial&&(u.uniformsNeedUpdate=!1)}function s(d,u){d.opacity.value=u.opacity,u.color&&d.diffuse.value.copy(u.color),u.emissive&&d.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity),u.map&&(d.map.value=u.map,e(u.map,d.mapTransform)),u.alphaMap&&(d.alphaMap.value=u.alphaMap,e(u.alphaMap,d.alphaMapTransform)),u.bumpMap&&(d.bumpMap.value=u.bumpMap,e(u.bumpMap,d.bumpMapTransform),d.bumpScale.value=u.bumpScale,u.side===De&&(d.bumpScale.value*=-1)),u.normalMap&&(d.normalMap.value=u.normalMap,e(u.normalMap,d.normalMapTransform),d.normalScale.value.copy(u.normalScale),u.side===De&&d.normalScale.value.negate()),u.displacementMap&&(d.displacementMap.value=u.displacementMap,e(u.displacementMap,d.displacementMapTransform),d.displacementScale.value=u.displacementScale,d.displacementBias.value=u.displacementBias),u.emissiveMap&&(d.emissiveMap.value=u.emissiveMap,e(u.emissiveMap,d.emissiveMapTransform)),u.specularMap&&(d.specularMap.value=u.specularMap,e(u.specularMap,d.specularMapTransform)),u.alphaTest>0&&(d.alphaTest.value=u.alphaTest);const S=t.get(u),y=S.envMap,_=S.envMapRotation;y&&(d.envMap.value=y,Vn.copy(_),Vn.x*=-1,Vn.y*=-1,Vn.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Vn.y*=-1,Vn.z*=-1),d.envMapRotation.value.setFromMatrix4(Vm.makeRotationFromEuler(Vn)),d.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,d.reflectivity.value=u.reflectivity,d.ior.value=u.ior,d.refractionRatio.value=u.refractionRatio),u.lightMap&&(d.lightMap.value=u.lightMap,d.lightMapIntensity.value=u.lightMapIntensity,e(u.lightMap,d.lightMapTransform)),u.aoMap&&(d.aoMap.value=u.aoMap,d.aoMapIntensity.value=u.aoMapIntensity,e(u.aoMap,d.aoMapTransform))}function o(d,u){d.diffuse.value.copy(u.color),d.opacity.value=u.opacity,u.map&&(d.map.value=u.map,e(u.map,d.mapTransform))}function a(d,u){d.dashSize.value=u.dashSize,d.totalSize.value=u.dashSize+u.gapSize,d.scale.value=u.scale}function c(d,u,S,y){d.diffuse.value.copy(u.color),d.opacity.value=u.opacity,d.size.value=u.size*S,d.scale.value=y*.5,u.map&&(d.map.value=u.map,e(u.map,d.uvTransform)),u.alphaMap&&(d.alphaMap.value=u.alphaMap,e(u.alphaMap,d.alphaMapTransform)),u.alphaTest>0&&(d.alphaTest.value=u.alphaTest)}function l(d,u){d.diffuse.value.copy(u.color),d.opacity.value=u.opacity,d.rotation.value=u.rotation,u.map&&(d.map.value=u.map,e(u.map,d.mapTransform)),u.alphaMap&&(d.alphaMap.value=u.alphaMap,e(u.alphaMap,d.alphaMapTransform)),u.alphaTest>0&&(d.alphaTest.value=u.alphaTest)}function h(d,u){d.specular.value.copy(u.specular),d.shininess.value=Math.max(u.shininess,1e-4)}function f(d,u){u.gradientMap&&(d.gradientMap.value=u.gradientMap)}function m(d,u){d.metalness.value=u.metalness,u.metalnessMap&&(d.metalnessMap.value=u.metalnessMap,e(u.metalnessMap,d.metalnessMapTransform)),d.roughness.value=u.roughness,u.roughnessMap&&(d.roughnessMap.value=u.roughnessMap,e(u.roughnessMap,d.roughnessMapTransform)),u.envMap&&(d.envMapIntensity.value=u.envMapIntensity)}function p(d,u,S){d.ior.value=u.ior,u.sheen>0&&(d.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen),d.sheenRoughness.value=u.sheenRoughness,u.sheenColorMap&&(d.sheenColorMap.value=u.sheenColorMap,e(u.sheenColorMap,d.sheenColorMapTransform)),u.sheenRoughnessMap&&(d.sheenRoughnessMap.value=u.sheenRoughnessMap,e(u.sheenRoughnessMap,d.sheenRoughnessMapTransform))),u.clearcoat>0&&(d.clearcoat.value=u.clearcoat,d.clearcoatRoughness.value=u.clearcoatRoughness,u.clearcoatMap&&(d.clearcoatMap.value=u.clearcoatMap,e(u.clearcoatMap,d.clearcoatMapTransform)),u.clearcoatRoughnessMap&&(d.clearcoatRoughnessMap.value=u.clearcoatRoughnessMap,e(u.clearcoatRoughnessMap,d.clearcoatRoughnessMapTransform)),u.clearcoatNormalMap&&(d.clearcoatNormalMap.value=u.clearcoatNormalMap,e(u.clearcoatNormalMap,d.clearcoatNormalMapTransform),d.clearcoatNormalScale.value.copy(u.clearcoatNormalScale),u.side===De&&d.clearcoatNormalScale.value.negate())),u.dispersion>0&&(d.dispersion.value=u.dispersion),u.iridescence>0&&(d.iridescence.value=u.iridescence,d.iridescenceIOR.value=u.iridescenceIOR,d.iridescenceThicknessMinimum.value=u.iridescenceThicknessRange[0],d.iridescenceThicknessMaximum.value=u.iridescenceThicknessRange[1],u.iridescenceMap&&(d.iridescenceMap.value=u.iridescenceMap,e(u.iridescenceMap,d.iridescenceMapTransform)),u.iridescenceThicknessMap&&(d.iridescenceThicknessMap.value=u.iridescenceThicknessMap,e(u.iridescenceThicknessMap,d.iridescenceThicknessMapTransform))),u.transmission>0&&(d.transmission.value=u.transmission,d.transmissionSamplerMap.value=S.texture,d.transmissionSamplerSize.value.set(S.width,S.height),u.transmissionMap&&(d.transmissionMap.value=u.transmissionMap,e(u.transmissionMap,d.transmissionMapTransform)),d.thickness.value=u.thickness,u.thicknessMap&&(d.thicknessMap.value=u.thicknessMap,e(u.thicknessMap,d.thicknessMapTransform)),d.attenuationDistance.value=u.attenuationDistance,d.attenuationColor.value.copy(u.attenuationColor)),u.anisotropy>0&&(d.anisotropyVector.value.set(u.anisotropy*Math.cos(u.anisotropyRotation),u.anisotropy*Math.sin(u.anisotropyRotation)),u.anisotropyMap&&(d.anisotropyMap.value=u.anisotropyMap,e(u.anisotropyMap,d.anisotropyMapTransform))),d.specularIntensity.value=u.specularIntensity,d.specularColor.value.copy(u.specularColor),u.specularColorMap&&(d.specularColorMap.value=u.specularColorMap,e(u.specularColorMap,d.specularColorMapTransform)),u.specularIntensityMap&&(d.specularIntensityMap.value=u.specularIntensityMap,e(u.specularIntensityMap,d.specularIntensityMapTransform))}function g(d,u){u.matcap&&(d.matcap.value=u.matcap)}function x(d,u){const S=t.get(u).light;d.referencePosition.value.setFromMatrixPosition(S.matrixWorld),d.nearDistance.value=S.shadow.camera.near,d.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function Xm(i,t,e,n){let r={},s={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(S,y){const _=y.program;n.uniformBlockBinding(S,_)}function l(S,y){let _=r[S.id];_===void 0&&(g(S),_=h(S),r[S.id]=_,S.addEventListener("dispose",d));const R=y.program;n.updateUBOMapping(S,R);const C=t.render.frame;s[S.id]!==C&&(m(S),s[S.id]=C)}function h(S){const y=f();S.__bindingPointIndex=y;const _=i.createBuffer(),R=S.__size,C=S.usage;return i.bindBuffer(i.UNIFORM_BUFFER,_),i.bufferData(i.UNIFORM_BUFFER,R,C),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,y,_),_}function f(){for(let S=0;S<a;S++)if(o.indexOf(S)===-1)return o.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function m(S){const y=r[S.id],_=S.uniforms,R=S.__cache;i.bindBuffer(i.UNIFORM_BUFFER,y);for(let C=0,w=_.length;C<w;C++){const U=Array.isArray(_[C])?_[C]:[_[C]];for(let b=0,T=U.length;b<T;b++){const L=U[b];if(p(L,C,b,R)===!0){const z=L.__offset,V=Array.isArray(L.value)?L.value:[L.value];let J=0;for(let Y=0;Y<V.length;Y++){const X=V[Y],j=x(X);typeof X=="number"||typeof X=="boolean"?(L.__data[0]=X,i.bufferSubData(i.UNIFORM_BUFFER,z+J,L.__data)):X.isMatrix3?(L.__data[0]=X.elements[0],L.__data[1]=X.elements[1],L.__data[2]=X.elements[2],L.__data[3]=0,L.__data[4]=X.elements[3],L.__data[5]=X.elements[4],L.__data[6]=X.elements[5],L.__data[7]=0,L.__data[8]=X.elements[6],L.__data[9]=X.elements[7],L.__data[10]=X.elements[8],L.__data[11]=0):(X.toArray(L.__data,J),J+=j.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,z,L.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(S,y,_,R){const C=S.value,w=y+"_"+_;if(R[w]===void 0)return typeof C=="number"||typeof C=="boolean"?R[w]=C:R[w]=C.clone(),!0;{const U=R[w];if(typeof C=="number"||typeof C=="boolean"){if(U!==C)return R[w]=C,!0}else if(U.equals(C)===!1)return U.copy(C),!0}return!1}function g(S){const y=S.uniforms;let _=0;const R=16;for(let w=0,U=y.length;w<U;w++){const b=Array.isArray(y[w])?y[w]:[y[w]];for(let T=0,L=b.length;T<L;T++){const z=b[T],V=Array.isArray(z.value)?z.value:[z.value];for(let J=0,Y=V.length;J<Y;J++){const X=V[J],j=x(X),M=_%R,I=M%j.boundary,O=M+I;_+=I,O!==0&&R-O<j.storage&&(_+=R-O),z.__data=new Float32Array(j.storage/Float32Array.BYTES_PER_ELEMENT),z.__offset=_,_+=j.storage}}}const C=_%R;return C>0&&(_+=R-C),S.__size=_,S.__cache={},this}function x(S){const y={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(y.boundary=4,y.storage=4):S.isVector2?(y.boundary=8,y.storage=8):S.isVector3||S.isColor?(y.boundary=16,y.storage=12):S.isVector4?(y.boundary=16,y.storage=16):S.isMatrix3?(y.boundary=48,y.storage=48):S.isMatrix4?(y.boundary=64,y.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),y}function d(S){const y=S.target;y.removeEventListener("dispose",d);const _=o.indexOf(y.__bindingPointIndex);o.splice(_,1),i.deleteBuffer(r[y.id]),delete r[y.id],delete s[y.id]}function u(){for(const S in r)i.deleteBuffer(r[S]);o=[],r={},s={}}return{bind:c,update:l,dispose:u}}class qm{constructor(t={}){const{canvas:e=Wc(),context:n=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:m=!1}=t;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=o;const g=new Uint32Array(4),x=new Int32Array(4);let d=null,u=null;const S=[],y=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ln,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const _=this;let R=!1;this._outputColorSpace=Ie;let C=0,w=0,U=null,b=-1,T=null;const L=new se,z=new se;let V=null;const J=new qt(0);let Y=0,X=e.width,j=e.height,M=1,I=null,O=null;const H=new se(0,0,X,j),Z=new se(0,0,X,j);let ot=!1;const gt=new zo;let ct=!1,G=!1;const it=new ce,Tt=new D,Dt=new se,wt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Kt=!1;function ae(){return U===null?M:1}let P=n;function st(E,F){return e.getContext(E,F)}try{const E={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Ro}`),e.addEventListener("webglcontextlost",xt,!1),e.addEventListener("webglcontextrestored",At,!1),e.addEventListener("webglcontextcreationerror",ut,!1),P===null){const F="webgl2";if(P=st(F,E),P===null)throw st(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let et,tt,Q,_t,lt,vt,Ht,kt,A,v,k,K,rt,$,It,mt,Ct,Pt,ht,Et,Bt,Ut,St,Vt;function N(){et=new np(P),et.init(),Ut=new Bm(P,et),tt=new Jd(P,et,t,Ut),Q=new Fm(P,et),tt.reversedDepthBuffer&&m&&Q.buffers.depth.setReversed(!0),_t=new sp(P),lt=new Em,vt=new Om(P,et,Q,lt,tt,Ut,_t),Ht=new $d(_),kt=new ep(_),A=new hu(P),St=new Yd(P,A),v=new ip(P,A,_t,St),k=new ap(P,v,A,_t),ht=new op(P,tt,vt),mt=new Zd(lt),K=new ym(_,Ht,kt,et,tt,St,mt),rt=new Wm(_,lt),$=new bm,It=new Lm(et),Pt=new qd(_,Ht,kt,Q,k,p,c),Ct=new Um(_,k,tt),Vt=new Xm(P,_t,tt,Q),Et=new Kd(P,et,_t),Bt=new rp(P,et,_t),_t.programs=K.programs,_.capabilities=tt,_.extensions=et,_.properties=lt,_.renderLists=$,_.shadowMap=Ct,_.state=Q,_.info=_t}N();const dt=new Gm(_,P);this.xr=dt,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){const E=et.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=et.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return M},this.setPixelRatio=function(E){E!==void 0&&(M=E,this.setSize(X,j,!1))},this.getSize=function(E){return E.set(X,j)},this.setSize=function(E,F,W=!0){if(dt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}X=E,j=F,e.width=Math.floor(E*M),e.height=Math.floor(F*M),W===!0&&(e.style.width=E+"px",e.style.height=F+"px"),this.setViewport(0,0,E,F)},this.getDrawingBufferSize=function(E){return E.set(X*M,j*M).floor()},this.setDrawingBufferSize=function(E,F,W){X=E,j=F,M=W,e.width=Math.floor(E*W),e.height=Math.floor(F*W),this.setViewport(0,0,E,F)},this.getCurrentViewport=function(E){return E.copy(L)},this.getViewport=function(E){return E.copy(H)},this.setViewport=function(E,F,W,q){E.isVector4?H.set(E.x,E.y,E.z,E.w):H.set(E,F,W,q),Q.viewport(L.copy(H).multiplyScalar(M).round())},this.getScissor=function(E){return E.copy(Z)},this.setScissor=function(E,F,W,q){E.isVector4?Z.set(E.x,E.y,E.z,E.w):Z.set(E,F,W,q),Q.scissor(z.copy(Z).multiplyScalar(M).round())},this.getScissorTest=function(){return ot},this.setScissorTest=function(E){Q.setScissorTest(ot=E)},this.setOpaqueSort=function(E){I=E},this.setTransparentSort=function(E){O=E},this.getClearColor=function(E){return E.copy(Pt.getClearColor())},this.setClearColor=function(){Pt.setClearColor(...arguments)},this.getClearAlpha=function(){return Pt.getClearAlpha()},this.setClearAlpha=function(){Pt.setClearAlpha(...arguments)},this.clear=function(E=!0,F=!0,W=!0){let q=0;if(E){let B=!1;if(U!==null){const ft=U.texture.format;B=ft===Fo||ft===No||ft===Uo}if(B){const ft=U.texture.type,yt=ft===un||ft===Zn||ft===Wi||ft===Xi||ft===Lo||ft===Io,Rt=Pt.getClearColor(),bt=Pt.getClearAlpha(),Ot=Rt.r,zt=Rt.g,Nt=Rt.b;yt?(g[0]=Ot,g[1]=zt,g[2]=Nt,g[3]=bt,P.clearBufferuiv(P.COLOR,0,g)):(x[0]=Ot,x[1]=zt,x[2]=Nt,x[3]=bt,P.clearBufferiv(P.COLOR,0,x))}else q|=P.COLOR_BUFFER_BIT}F&&(q|=P.DEPTH_BUFFER_BIT),W&&(q|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),P.clear(q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",xt,!1),e.removeEventListener("webglcontextrestored",At,!1),e.removeEventListener("webglcontextcreationerror",ut,!1),Pt.dispose(),$.dispose(),It.dispose(),lt.dispose(),Ht.dispose(),kt.dispose(),k.dispose(),St.dispose(),Vt.dispose(),K.dispose(),dt.dispose(),dt.removeEventListener("sessionstart",nn),dt.removeEventListener("sessionend",Jo),Fn.stop()};function xt(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),R=!0}function At(){console.log("THREE.WebGLRenderer: Context Restored."),R=!1;const E=_t.autoReset,F=Ct.enabled,W=Ct.autoUpdate,q=Ct.needsUpdate,B=Ct.type;N(),_t.autoReset=E,Ct.enabled=F,Ct.autoUpdate=W,Ct.needsUpdate=q,Ct.type=B}function ut(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function nt(E){const F=E.target;F.removeEventListener("dispose",nt),Lt(F)}function Lt(E){Gt(E),lt.remove(E)}function Gt(E){const F=lt.get(E).programs;F!==void 0&&(F.forEach(function(W){K.releaseProgram(W)}),E.isShaderMaterial&&K.releaseShaderCache(E))}this.renderBufferDirect=function(E,F,W,q,B,ft){F===null&&(F=wt);const yt=B.isMesh&&B.matrixWorld.determinant()<0,Rt=jl(E,F,W,q,B);Q.setMaterial(q,yt);let bt=W.index,Ot=1;if(q.wireframe===!0){if(bt=v.getWireframeAttribute(W),bt===void 0)return;Ot=2}const zt=W.drawRange,Nt=W.attributes.position;let Jt=zt.start*Ot,ne=(zt.start+zt.count)*Ot;ft!==null&&(Jt=Math.max(Jt,ft.start*Ot),ne=Math.min(ne,(ft.start+ft.count)*Ot)),bt!==null?(Jt=Math.max(Jt,0),ne=Math.min(ne,bt.count)):Nt!=null&&(Jt=Math.max(Jt,0),ne=Math.min(ne,Nt.count));const pe=ne-Jt;if(pe<0||pe===1/0)return;St.setup(B,q,Rt,W,bt);let he,oe=Et;if(bt!==null&&(he=A.get(bt),oe=Bt,oe.setIndex(he)),B.isMesh)q.wireframe===!0?(Q.setLineWidth(q.wireframeLinewidth*ae()),oe.setMode(P.LINES)):oe.setMode(P.TRIANGLES);else if(B.isLine){let Ft=q.linewidth;Ft===void 0&&(Ft=1),Q.setLineWidth(Ft*ae()),B.isLineSegments?oe.setMode(P.LINES):B.isLineLoop?oe.setMode(P.LINE_LOOP):oe.setMode(P.LINE_STRIP)}else B.isPoints?oe.setMode(P.POINTS):B.isSprite&&oe.setMode(P.TRIANGLES);if(B.isBatchedMesh)if(B._multiDrawInstances!==null)Ki("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),oe.renderMultiDrawInstances(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount,B._multiDrawInstances);else if(et.get("WEBGL_multi_draw"))oe.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else{const Ft=B._multiDrawStarts,ue=B._multiDrawCounts,jt=B._multiDrawCount,Fe=bt?A.get(bt).bytesPerElement:1,ti=lt.get(q).currentProgram.getUniforms();for(let Oe=0;Oe<jt;Oe++)ti.setValue(P,"_gl_DrawID",Oe),oe.render(Ft[Oe]/Fe,ue[Oe])}else if(B.isInstancedMesh)oe.renderInstances(Jt,pe,B.count);else if(W.isInstancedBufferGeometry){const Ft=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,ue=Math.min(W.instanceCount,Ft);oe.renderInstances(Jt,pe,ue)}else oe.render(Jt,pe)};function le(E,F,W){E.transparent===!0&&E.side===sn&&E.forceSinglePass===!1?(E.side=De,E.needsUpdate=!0,ir(E,F,W),E.side=yn,E.needsUpdate=!0,ir(E,F,W),E.side=sn):ir(E,F,W)}this.compile=function(E,F,W=null){W===null&&(W=E),u=It.get(W),u.init(F),y.push(u),W.traverseVisible(function(B){B.isLight&&B.layers.test(F.layers)&&(u.pushLight(B),B.castShadow&&u.pushShadow(B))}),E!==W&&E.traverseVisible(function(B){B.isLight&&B.layers.test(F.layers)&&(u.pushLight(B),B.castShadow&&u.pushShadow(B))}),u.setupLights();const q=new Set;return E.traverse(function(B){if(!(B.isMesh||B.isPoints||B.isLine||B.isSprite))return;const ft=B.material;if(ft)if(Array.isArray(ft))for(let yt=0;yt<ft.length;yt++){const Rt=ft[yt];le(Rt,W,B),q.add(Rt)}else le(ft,W,B),q.add(ft)}),u=y.pop(),q},this.compileAsync=function(E,F,W=null){const q=this.compile(E,F,W);return new Promise(B=>{function ft(){if(q.forEach(function(yt){lt.get(yt).currentProgram.isReady()&&q.delete(yt)}),q.size===0){B(E);return}setTimeout(ft,10)}et.get("KHR_parallel_shader_compile")!==null?ft():setTimeout(ft,10)})};let ee=null;function dn(E){ee&&ee(E)}function nn(){Fn.stop()}function Jo(){Fn.start()}const Fn=new Yl;Fn.setAnimationLoop(dn),typeof self<"u"&&Fn.setContext(self),this.setAnimationLoop=function(E){ee=E,dt.setAnimationLoop(E),E===null?Fn.stop():Fn.start()},dt.addEventListener("sessionstart",nn),dt.addEventListener("sessionend",Jo),this.render=function(E,F){if(F!==void 0&&F.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),dt.enabled===!0&&dt.isPresenting===!0&&(dt.cameraAutoUpdate===!0&&dt.updateCamera(F),F=dt.getCamera()),E.isScene===!0&&E.onBeforeRender(_,E,F,U),u=It.get(E,y.length),u.init(F),y.push(u),it.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),gt.setFromProjectionMatrix(it,cn,F.reversedDepth),G=this.localClippingEnabled,ct=mt.init(this.clippingPlanes,G),d=$.get(E,S.length),d.init(),S.push(d),dt.enabled===!0&&dt.isPresenting===!0){const ft=_.xr.getDepthSensingMesh();ft!==null&&Kr(ft,F,-1/0,_.sortObjects)}Kr(E,F,0,_.sortObjects),d.finish(),_.sortObjects===!0&&d.sort(I,O),Kt=dt.enabled===!1||dt.isPresenting===!1||dt.hasDepthSensing()===!1,Kt&&Pt.addToRenderList(d,E),this.info.render.frame++,ct===!0&&mt.beginShadows();const W=u.state.shadowsArray;Ct.render(W,E,F),ct===!0&&mt.endShadows(),this.info.autoReset===!0&&this.info.reset();const q=d.opaque,B=d.transmissive;if(u.setupLights(),F.isArrayCamera){const ft=F.cameras;if(B.length>0)for(let yt=0,Rt=ft.length;yt<Rt;yt++){const bt=ft[yt];$o(q,B,E,bt)}Kt&&Pt.render(E);for(let yt=0,Rt=ft.length;yt<Rt;yt++){const bt=ft[yt];Zo(d,E,bt,bt.viewport)}}else B.length>0&&$o(q,B,E,F),Kt&&Pt.render(E),Zo(d,E,F);U!==null&&w===0&&(vt.updateMultisampleRenderTarget(U),vt.updateRenderTargetMipmap(U)),E.isScene===!0&&E.onAfterRender(_,E,F),St.resetDefaultState(),b=-1,T=null,y.pop(),y.length>0?(u=y[y.length-1],ct===!0&&mt.setGlobalState(_.clippingPlanes,u.state.camera)):u=null,S.pop(),S.length>0?d=S[S.length-1]:d=null};function Kr(E,F,W,q){if(E.visible===!1)return;if(E.layers.test(F.layers)){if(E.isGroup)W=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(F);else if(E.isLight)u.pushLight(E),E.castShadow&&u.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||gt.intersectsSprite(E)){q&&Dt.setFromMatrixPosition(E.matrixWorld).applyMatrix4(it);const yt=k.update(E),Rt=E.material;Rt.visible&&d.push(E,yt,Rt,W,Dt.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||gt.intersectsObject(E))){const yt=k.update(E),Rt=E.material;if(q&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),Dt.copy(E.boundingSphere.center)):(yt.boundingSphere===null&&yt.computeBoundingSphere(),Dt.copy(yt.boundingSphere.center)),Dt.applyMatrix4(E.matrixWorld).applyMatrix4(it)),Array.isArray(Rt)){const bt=yt.groups;for(let Ot=0,zt=bt.length;Ot<zt;Ot++){const Nt=bt[Ot],Jt=Rt[Nt.materialIndex];Jt&&Jt.visible&&d.push(E,yt,Jt,W,Dt.z,Nt)}}else Rt.visible&&d.push(E,yt,Rt,W,Dt.z,null)}}const ft=E.children;for(let yt=0,Rt=ft.length;yt<Rt;yt++)Kr(ft[yt],F,W,q)}function Zo(E,F,W,q){const B=E.opaque,ft=E.transmissive,yt=E.transparent;u.setupLightsView(W),ct===!0&&mt.setGlobalState(_.clippingPlanes,W),q&&Q.viewport(L.copy(q)),B.length>0&&nr(B,F,W),ft.length>0&&nr(ft,F,W),yt.length>0&&nr(yt,F,W),Q.buffers.depth.setTest(!0),Q.buffers.depth.setMask(!0),Q.buffers.color.setMask(!0),Q.setPolygonOffset(!1)}function $o(E,F,W,q){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;u.state.transmissionRenderTarget[q.id]===void 0&&(u.state.transmissionRenderTarget[q.id]=new $n(1,1,{generateMipmaps:!0,type:et.has("EXT_color_buffer_half_float")||et.has("EXT_color_buffer_float")?ji:un,minFilter:Jn,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:te.workingColorSpace}));const ft=u.state.transmissionRenderTarget[q.id],yt=q.viewport||L;ft.setSize(yt.z*_.transmissionResolutionScale,yt.w*_.transmissionResolutionScale);const Rt=_.getRenderTarget(),bt=_.getActiveCubeFace(),Ot=_.getActiveMipmapLevel();_.setRenderTarget(ft),_.getClearColor(J),Y=_.getClearAlpha(),Y<1&&_.setClearColor(16777215,.5),_.clear(),Kt&&Pt.render(W);const zt=_.toneMapping;_.toneMapping=Ln;const Nt=q.viewport;if(q.viewport!==void 0&&(q.viewport=void 0),u.setupLightsView(q),ct===!0&&mt.setGlobalState(_.clippingPlanes,q),nr(E,W,q),vt.updateMultisampleRenderTarget(ft),vt.updateRenderTargetMipmap(ft),et.has("WEBGL_multisampled_render_to_texture")===!1){let Jt=!1;for(let ne=0,pe=F.length;ne<pe;ne++){const he=F[ne],oe=he.object,Ft=he.geometry,ue=he.material,jt=he.group;if(ue.side===sn&&oe.layers.test(q.layers)){const Fe=ue.side;ue.side=De,ue.needsUpdate=!0,jo(oe,W,q,Ft,ue,jt),ue.side=Fe,ue.needsUpdate=!0,Jt=!0}}Jt===!0&&(vt.updateMultisampleRenderTarget(ft),vt.updateRenderTargetMipmap(ft))}_.setRenderTarget(Rt,bt,Ot),_.setClearColor(J,Y),Nt!==void 0&&(q.viewport=Nt),_.toneMapping=zt}function nr(E,F,W){const q=F.isScene===!0?F.overrideMaterial:null;for(let B=0,ft=E.length;B<ft;B++){const yt=E[B],Rt=yt.object,bt=yt.geometry,Ot=yt.group;let zt=yt.material;zt.allowOverride===!0&&q!==null&&(zt=q),Rt.layers.test(W.layers)&&jo(Rt,F,W,bt,zt,Ot)}}function jo(E,F,W,q,B,ft){E.onBeforeRender(_,F,W,q,B,ft),E.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),B.onBeforeRender(_,F,W,q,E,ft),B.transparent===!0&&B.side===sn&&B.forceSinglePass===!1?(B.side=De,B.needsUpdate=!0,_.renderBufferDirect(W,F,q,B,E,ft),B.side=yn,B.needsUpdate=!0,_.renderBufferDirect(W,F,q,B,E,ft),B.side=sn):_.renderBufferDirect(W,F,q,B,E,ft),E.onAfterRender(_,F,W,q,B,ft)}function ir(E,F,W){F.isScene!==!0&&(F=wt);const q=lt.get(E),B=u.state.lights,ft=u.state.shadowsArray,yt=B.state.version,Rt=K.getParameters(E,B.state,ft,F,W),bt=K.getProgramCacheKey(Rt);let Ot=q.programs;q.environment=E.isMeshStandardMaterial?F.environment:null,q.fog=F.fog,q.envMap=(E.isMeshStandardMaterial?kt:Ht).get(E.envMap||q.environment),q.envMapRotation=q.environment!==null&&E.envMap===null?F.environmentRotation:E.envMapRotation,Ot===void 0&&(E.addEventListener("dispose",nt),Ot=new Map,q.programs=Ot);let zt=Ot.get(bt);if(zt!==void 0){if(q.currentProgram===zt&&q.lightsStateVersion===yt)return ta(E,Rt),zt}else Rt.uniforms=K.getUniforms(E),E.onBeforeCompile(Rt,_),zt=K.acquireProgram(Rt,bt),Ot.set(bt,zt),q.uniforms=Rt.uniforms;const Nt=q.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Nt.clippingPlanes=mt.uniform),ta(E,Rt),q.needsLights=tc(E),q.lightsStateVersion=yt,q.needsLights&&(Nt.ambientLightColor.value=B.state.ambient,Nt.lightProbe.value=B.state.probe,Nt.directionalLights.value=B.state.directional,Nt.directionalLightShadows.value=B.state.directionalShadow,Nt.spotLights.value=B.state.spot,Nt.spotLightShadows.value=B.state.spotShadow,Nt.rectAreaLights.value=B.state.rectArea,Nt.ltc_1.value=B.state.rectAreaLTC1,Nt.ltc_2.value=B.state.rectAreaLTC2,Nt.pointLights.value=B.state.point,Nt.pointLightShadows.value=B.state.pointShadow,Nt.hemisphereLights.value=B.state.hemi,Nt.directionalShadowMap.value=B.state.directionalShadowMap,Nt.directionalShadowMatrix.value=B.state.directionalShadowMatrix,Nt.spotShadowMap.value=B.state.spotShadowMap,Nt.spotLightMatrix.value=B.state.spotLightMatrix,Nt.spotLightMap.value=B.state.spotLightMap,Nt.pointShadowMap.value=B.state.pointShadowMap,Nt.pointShadowMatrix.value=B.state.pointShadowMatrix),q.currentProgram=zt,q.uniformsList=null,zt}function Qo(E){if(E.uniformsList===null){const F=E.currentProgram.getUniforms();E.uniformsList=Fr.seqWithValue(F.seq,E.uniforms)}return E.uniformsList}function ta(E,F){const W=lt.get(E);W.outputColorSpace=F.outputColorSpace,W.batching=F.batching,W.batchingColor=F.batchingColor,W.instancing=F.instancing,W.instancingColor=F.instancingColor,W.instancingMorph=F.instancingMorph,W.skinning=F.skinning,W.morphTargets=F.morphTargets,W.morphNormals=F.morphNormals,W.morphColors=F.morphColors,W.morphTargetsCount=F.morphTargetsCount,W.numClippingPlanes=F.numClippingPlanes,W.numIntersection=F.numClipIntersection,W.vertexAlphas=F.vertexAlphas,W.vertexTangents=F.vertexTangents,W.toneMapping=F.toneMapping}function jl(E,F,W,q,B){F.isScene!==!0&&(F=wt),vt.resetTextureUnits();const ft=F.fog,yt=q.isMeshStandardMaterial?F.environment:null,Rt=U===null?_.outputColorSpace:U.isXRRenderTarget===!0?U.texture.colorSpace:Ei,bt=(q.isMeshStandardMaterial?kt:Ht).get(q.envMap||yt),Ot=q.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,zt=!!W.attributes.tangent&&(!!q.normalMap||q.anisotropy>0),Nt=!!W.morphAttributes.position,Jt=!!W.morphAttributes.normal,ne=!!W.morphAttributes.color;let pe=Ln;q.toneMapped&&(U===null||U.isXRRenderTarget===!0)&&(pe=_.toneMapping);const he=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,oe=he!==void 0?he.length:0,Ft=lt.get(q),ue=u.state.lights;if(ct===!0&&(G===!0||E!==T)){const Re=E===T&&q.id===b;mt.setState(q,E,Re)}let jt=!1;q.version===Ft.__version?(Ft.needsLights&&Ft.lightsStateVersion!==ue.state.version||Ft.outputColorSpace!==Rt||B.isBatchedMesh&&Ft.batching===!1||!B.isBatchedMesh&&Ft.batching===!0||B.isBatchedMesh&&Ft.batchingColor===!0&&B.colorTexture===null||B.isBatchedMesh&&Ft.batchingColor===!1&&B.colorTexture!==null||B.isInstancedMesh&&Ft.instancing===!1||!B.isInstancedMesh&&Ft.instancing===!0||B.isSkinnedMesh&&Ft.skinning===!1||!B.isSkinnedMesh&&Ft.skinning===!0||B.isInstancedMesh&&Ft.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&Ft.instancingColor===!1&&B.instanceColor!==null||B.isInstancedMesh&&Ft.instancingMorph===!0&&B.morphTexture===null||B.isInstancedMesh&&Ft.instancingMorph===!1&&B.morphTexture!==null||Ft.envMap!==bt||q.fog===!0&&Ft.fog!==ft||Ft.numClippingPlanes!==void 0&&(Ft.numClippingPlanes!==mt.numPlanes||Ft.numIntersection!==mt.numIntersection)||Ft.vertexAlphas!==Ot||Ft.vertexTangents!==zt||Ft.morphTargets!==Nt||Ft.morphNormals!==Jt||Ft.morphColors!==ne||Ft.toneMapping!==pe||Ft.morphTargetsCount!==oe)&&(jt=!0):(jt=!0,Ft.__version=q.version);let Fe=Ft.currentProgram;jt===!0&&(Fe=ir(q,F,B));let ti=!1,Oe=!1,Pi=!1;const fe=Fe.getUniforms(),We=Ft.uniforms;if(Q.useProgram(Fe.program)&&(ti=!0,Oe=!0,Pi=!0),q.id!==b&&(b=q.id,Oe=!0),ti||T!==E){Q.buffers.depth.getReversed()&&E.reversedDepth!==!0&&(E._reversedDepth=!0,E.updateProjectionMatrix()),fe.setValue(P,"projectionMatrix",E.projectionMatrix),fe.setValue(P,"viewMatrix",E.matrixWorldInverse);const Ue=fe.map.cameraPosition;Ue!==void 0&&Ue.setValue(P,Tt.setFromMatrixPosition(E.matrixWorld)),tt.logarithmicDepthBuffer&&fe.setValue(P,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(q.isMeshPhongMaterial||q.isMeshToonMaterial||q.isMeshLambertMaterial||q.isMeshBasicMaterial||q.isMeshStandardMaterial||q.isShaderMaterial)&&fe.setValue(P,"isOrthographic",E.isOrthographicCamera===!0),T!==E&&(T=E,Oe=!0,Pi=!0)}if(B.isSkinnedMesh){fe.setOptional(P,B,"bindMatrix"),fe.setOptional(P,B,"bindMatrixInverse");const Re=B.skeleton;Re&&(Re.boneTexture===null&&Re.computeBoneTexture(),fe.setValue(P,"boneTexture",Re.boneTexture,vt))}B.isBatchedMesh&&(fe.setOptional(P,B,"batchingTexture"),fe.setValue(P,"batchingTexture",B._matricesTexture,vt),fe.setOptional(P,B,"batchingIdTexture"),fe.setValue(P,"batchingIdTexture",B._indirectTexture,vt),fe.setOptional(P,B,"batchingColorTexture"),B._colorsTexture!==null&&fe.setValue(P,"batchingColorTexture",B._colorsTexture,vt));const Xe=W.morphAttributes;if((Xe.position!==void 0||Xe.normal!==void 0||Xe.color!==void 0)&&ht.update(B,W,Fe),(Oe||Ft.receiveShadow!==B.receiveShadow)&&(Ft.receiveShadow=B.receiveShadow,fe.setValue(P,"receiveShadow",B.receiveShadow)),q.isMeshGouraudMaterial&&q.envMap!==null&&(We.envMap.value=bt,We.flipEnvMap.value=bt.isCubeTexture&&bt.isRenderTargetTexture===!1?-1:1),q.isMeshStandardMaterial&&q.envMap===null&&F.environment!==null&&(We.envMapIntensity.value=F.environmentIntensity),Oe&&(fe.setValue(P,"toneMappingExposure",_.toneMappingExposure),Ft.needsLights&&Ql(We,Pi),ft&&q.fog===!0&&rt.refreshFogUniforms(We,ft),rt.refreshMaterialUniforms(We,q,M,j,u.state.transmissionRenderTarget[E.id]),Fr.upload(P,Qo(Ft),We,vt)),q.isShaderMaterial&&q.uniformsNeedUpdate===!0&&(Fr.upload(P,Qo(Ft),We,vt),q.uniformsNeedUpdate=!1),q.isSpriteMaterial&&fe.setValue(P,"center",B.center),fe.setValue(P,"modelViewMatrix",B.modelViewMatrix),fe.setValue(P,"normalMatrix",B.normalMatrix),fe.setValue(P,"modelMatrix",B.matrixWorld),q.isShaderMaterial||q.isRawShaderMaterial){const Re=q.uniformsGroups;for(let Ue=0,Jr=Re.length;Ue<Jr;Ue++){const On=Re[Ue];Vt.update(On,Fe),Vt.bind(On,Fe)}}return Fe}function Ql(E,F){E.ambientLightColor.needsUpdate=F,E.lightProbe.needsUpdate=F,E.directionalLights.needsUpdate=F,E.directionalLightShadows.needsUpdate=F,E.pointLights.needsUpdate=F,E.pointLightShadows.needsUpdate=F,E.spotLights.needsUpdate=F,E.spotLightShadows.needsUpdate=F,E.rectAreaLights.needsUpdate=F,E.hemisphereLights.needsUpdate=F}function tc(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return U},this.setRenderTargetTextures=function(E,F,W){const q=lt.get(E);q.__autoAllocateDepthBuffer=E.resolveDepthBuffer===!1,q.__autoAllocateDepthBuffer===!1&&(q.__useRenderToTexture=!1),lt.get(E.texture).__webglTexture=F,lt.get(E.depthTexture).__webglTexture=q.__autoAllocateDepthBuffer?void 0:W,q.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(E,F){const W=lt.get(E);W.__webglFramebuffer=F,W.__useDefaultFramebuffer=F===void 0};const ec=P.createFramebuffer();this.setRenderTarget=function(E,F=0,W=0){U=E,C=F,w=W;let q=!0,B=null,ft=!1,yt=!1;if(E){const bt=lt.get(E);if(bt.__useDefaultFramebuffer!==void 0)Q.bindFramebuffer(P.FRAMEBUFFER,null),q=!1;else if(bt.__webglFramebuffer===void 0)vt.setupRenderTarget(E);else if(bt.__hasExternalTextures)vt.rebindTextures(E,lt.get(E.texture).__webglTexture,lt.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const Nt=E.depthTexture;if(bt.__boundDepthTexture!==Nt){if(Nt!==null&&lt.has(Nt)&&(E.width!==Nt.image.width||E.height!==Nt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");vt.setupDepthRenderbuffer(E)}}const Ot=E.texture;(Ot.isData3DTexture||Ot.isDataArrayTexture||Ot.isCompressedArrayTexture)&&(yt=!0);const zt=lt.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(zt[F])?B=zt[F][W]:B=zt[F],ft=!0):E.samples>0&&vt.useMultisampledRTT(E)===!1?B=lt.get(E).__webglMultisampledFramebuffer:Array.isArray(zt)?B=zt[W]:B=zt,L.copy(E.viewport),z.copy(E.scissor),V=E.scissorTest}else L.copy(H).multiplyScalar(M).floor(),z.copy(Z).multiplyScalar(M).floor(),V=ot;if(W!==0&&(B=ec),Q.bindFramebuffer(P.FRAMEBUFFER,B)&&q&&Q.drawBuffers(E,B),Q.viewport(L),Q.scissor(z),Q.setScissorTest(V),ft){const bt=lt.get(E.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+F,bt.__webglTexture,W)}else if(yt){const bt=F;for(let Ot=0;Ot<E.textures.length;Ot++){const zt=lt.get(E.textures[Ot]);P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0+Ot,zt.__webglTexture,W,bt)}}else if(E!==null&&W!==0){const bt=lt.get(E.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,bt.__webglTexture,W)}b=-1},this.readRenderTargetPixels=function(E,F,W,q,B,ft,yt,Rt=0){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let bt=lt.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&yt!==void 0&&(bt=bt[yt]),bt){Q.bindFramebuffer(P.FRAMEBUFFER,bt);try{const Ot=E.textures[Rt],zt=Ot.format,Nt=Ot.type;if(!tt.textureFormatReadable(zt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!tt.textureTypeReadable(Nt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=E.width-q&&W>=0&&W<=E.height-B&&(E.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+Rt),P.readPixels(F,W,q,B,Ut.convert(zt),Ut.convert(Nt),ft))}finally{const Ot=U!==null?lt.get(U).__webglFramebuffer:null;Q.bindFramebuffer(P.FRAMEBUFFER,Ot)}}},this.readRenderTargetPixelsAsync=async function(E,F,W,q,B,ft,yt,Rt=0){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let bt=lt.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&yt!==void 0&&(bt=bt[yt]),bt)if(F>=0&&F<=E.width-q&&W>=0&&W<=E.height-B){Q.bindFramebuffer(P.FRAMEBUFFER,bt);const Ot=E.textures[Rt],zt=Ot.format,Nt=Ot.type;if(!tt.textureFormatReadable(zt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!tt.textureTypeReadable(Nt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Jt=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,Jt),P.bufferData(P.PIXEL_PACK_BUFFER,ft.byteLength,P.STREAM_READ),E.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+Rt),P.readPixels(F,W,q,B,Ut.convert(zt),Ut.convert(Nt),0);const ne=U!==null?lt.get(U).__webglFramebuffer:null;Q.bindFramebuffer(P.FRAMEBUFFER,ne);const pe=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await Xc(P,pe,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,Jt),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,ft),P.deleteBuffer(Jt),P.deleteSync(pe),ft}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(E,F=null,W=0){const q=Math.pow(2,-W),B=Math.floor(E.image.width*q),ft=Math.floor(E.image.height*q),yt=F!==null?F.x:0,Rt=F!==null?F.y:0;vt.setTexture2D(E,0),P.copyTexSubImage2D(P.TEXTURE_2D,W,0,0,yt,Rt,B,ft),Q.unbindTexture()};const nc=P.createFramebuffer(),ic=P.createFramebuffer();this.copyTextureToTexture=function(E,F,W=null,q=null,B=0,ft=null){ft===null&&(B!==0?(Ki("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ft=B,B=0):ft=0);let yt,Rt,bt,Ot,zt,Nt,Jt,ne,pe;const he=E.isCompressedTexture?E.mipmaps[ft]:E.image;if(W!==null)yt=W.max.x-W.min.x,Rt=W.max.y-W.min.y,bt=W.isBox3?W.max.z-W.min.z:1,Ot=W.min.x,zt=W.min.y,Nt=W.isBox3?W.min.z:0;else{const Xe=Math.pow(2,-B);yt=Math.floor(he.width*Xe),Rt=Math.floor(he.height*Xe),E.isDataArrayTexture?bt=he.depth:E.isData3DTexture?bt=Math.floor(he.depth*Xe):bt=1,Ot=0,zt=0,Nt=0}q!==null?(Jt=q.x,ne=q.y,pe=q.z):(Jt=0,ne=0,pe=0);const oe=Ut.convert(F.format),Ft=Ut.convert(F.type);let ue;F.isData3DTexture?(vt.setTexture3D(F,0),ue=P.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(vt.setTexture2DArray(F,0),ue=P.TEXTURE_2D_ARRAY):(vt.setTexture2D(F,0),ue=P.TEXTURE_2D),P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,F.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,F.unpackAlignment);const jt=P.getParameter(P.UNPACK_ROW_LENGTH),Fe=P.getParameter(P.UNPACK_IMAGE_HEIGHT),ti=P.getParameter(P.UNPACK_SKIP_PIXELS),Oe=P.getParameter(P.UNPACK_SKIP_ROWS),Pi=P.getParameter(P.UNPACK_SKIP_IMAGES);P.pixelStorei(P.UNPACK_ROW_LENGTH,he.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,he.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Ot),P.pixelStorei(P.UNPACK_SKIP_ROWS,zt),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Nt);const fe=E.isDataArrayTexture||E.isData3DTexture,We=F.isDataArrayTexture||F.isData3DTexture;if(E.isDepthTexture){const Xe=lt.get(E),Re=lt.get(F),Ue=lt.get(Xe.__renderTarget),Jr=lt.get(Re.__renderTarget);Q.bindFramebuffer(P.READ_FRAMEBUFFER,Ue.__webglFramebuffer),Q.bindFramebuffer(P.DRAW_FRAMEBUFFER,Jr.__webglFramebuffer);for(let On=0;On<bt;On++)fe&&(P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,lt.get(E).__webglTexture,B,Nt+On),P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,lt.get(F).__webglTexture,ft,pe+On)),P.blitFramebuffer(Ot,zt,yt,Rt,Jt,ne,yt,Rt,P.DEPTH_BUFFER_BIT,P.NEAREST);Q.bindFramebuffer(P.READ_FRAMEBUFFER,null),Q.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else if(B!==0||E.isRenderTargetTexture||lt.has(E)){const Xe=lt.get(E),Re=lt.get(F);Q.bindFramebuffer(P.READ_FRAMEBUFFER,nc),Q.bindFramebuffer(P.DRAW_FRAMEBUFFER,ic);for(let Ue=0;Ue<bt;Ue++)fe?P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Xe.__webglTexture,B,Nt+Ue):P.framebufferTexture2D(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,Xe.__webglTexture,B),We?P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Re.__webglTexture,ft,pe+Ue):P.framebufferTexture2D(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,Re.__webglTexture,ft),B!==0?P.blitFramebuffer(Ot,zt,yt,Rt,Jt,ne,yt,Rt,P.COLOR_BUFFER_BIT,P.NEAREST):We?P.copyTexSubImage3D(ue,ft,Jt,ne,pe+Ue,Ot,zt,yt,Rt):P.copyTexSubImage2D(ue,ft,Jt,ne,Ot,zt,yt,Rt);Q.bindFramebuffer(P.READ_FRAMEBUFFER,null),Q.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else We?E.isDataTexture||E.isData3DTexture?P.texSubImage3D(ue,ft,Jt,ne,pe,yt,Rt,bt,oe,Ft,he.data):F.isCompressedArrayTexture?P.compressedTexSubImage3D(ue,ft,Jt,ne,pe,yt,Rt,bt,oe,he.data):P.texSubImage3D(ue,ft,Jt,ne,pe,yt,Rt,bt,oe,Ft,he):E.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,ft,Jt,ne,yt,Rt,oe,Ft,he.data):E.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,ft,Jt,ne,he.width,he.height,oe,he.data):P.texSubImage2D(P.TEXTURE_2D,ft,Jt,ne,yt,Rt,oe,Ft,he);P.pixelStorei(P.UNPACK_ROW_LENGTH,jt),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,Fe),P.pixelStorei(P.UNPACK_SKIP_PIXELS,ti),P.pixelStorei(P.UNPACK_SKIP_ROWS,Oe),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Pi),ft===0&&F.generateMipmaps&&P.generateMipmap(ue),Q.unbindTexture()},this.initRenderTarget=function(E){lt.get(E).__webglFramebuffer===void 0&&vt.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?vt.setTextureCube(E,0):E.isData3DTexture?vt.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?vt.setTexture2DArray(E,0):vt.setTexture2D(E,0),Q.unbindTexture()},this.resetState=function(){C=0,w=0,U=null,Q.reset(),St.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return cn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=te._getDrawingBufferColorSpace(t),e.unpackColorSpace=te._getUnpackColorSpace()}}class Ym extends Ll{constructor(){super();const t=new Nn;t.deleteAttribute("uv");const e=new je({side:De}),n=new je,r=new Nr(16777215,900,28,2);r.position.set(.418,16.199,.3),this.add(r);const s=new ge(t,e);s.position.set(-.757,13.219,.717),s.scale.set(31.713,28.305,28.591),this.add(s);const o=new xh(t,n,6),a=new ye;a.position.set(-10.906,2.009,1.846),a.rotation.set(0,-.195,0),a.scale.set(2.328,7.905,4.651),a.updateMatrix(),o.setMatrixAt(0,a.matrix),a.position.set(-5.607,-.754,-.758),a.rotation.set(0,.994,0),a.scale.set(1.97,1.534,3.955),a.updateMatrix(),o.setMatrixAt(1,a.matrix),a.position.set(6.167,.857,7.803),a.rotation.set(0,.561,0),a.scale.set(3.927,6.285,3.687),a.updateMatrix(),o.setMatrixAt(2,a.matrix),a.position.set(-2.017,.018,6.124),a.rotation.set(0,.333,0),a.scale.set(2.002,4.566,2.064),a.updateMatrix(),o.setMatrixAt(3,a.matrix),a.position.set(2.291,-.756,-2.621),a.rotation.set(0,-.286,0),a.scale.set(1.546,1.552,1.496),a.updateMatrix(),o.setMatrixAt(4,a.matrix),a.position.set(-2.193,-.369,-5.547),a.rotation.set(0,.516,0),a.scale.set(3.875,3.487,2.986),a.updateMatrix(),o.setMatrixAt(5,a.matrix),this.add(o);const c=new ge(t,gi(50));c.position.set(-16.116,14.37,8.208),c.scale.set(.1,2.428,2.739),this.add(c);const l=new ge(t,gi(50));l.position.set(-16.109,18.021,-8.207),l.scale.set(.1,2.425,2.751),this.add(l);const h=new ge(t,gi(17));h.position.set(14.904,12.198,-1.832),h.scale.set(.15,4.265,6.331),this.add(h);const f=new ge(t,gi(43));f.position.set(-.462,8.89,14.52),f.scale.set(4.38,5.441,.088),this.add(f);const m=new ge(t,gi(20));m.position.set(3.235,11.486,-12.541),m.scale.set(2.5,2,.1),this.add(m);const p=new ge(t,gi(100));p.position.set(0,20,0),p.scale.set(1,.1,1),this.add(p)}dispose(){const t=new Set;this.traverse(e=>{e.isMesh&&(t.add(e.geometry),t.add(e.material))});for(const e of t)e.dispose()}}function gi(i){return new nu({color:0,emissive:16777215,emissiveIntensity:i})}let Is=417;function re(i=0,t=1){return Is=Is*1664525+1013904223>>>0,i+(t-i)*Is/4294967296}function Dn(i,t,e=1){const n=document.createElement("canvas");n.width=n.height=i;const r=n.getContext("2d");t(r,i);const s=new Il(n);return s.colorSpace=Ie,s.wrapS=s.wrapT=Or,s.repeat.set(e,e),s.anisotropy=4,s}function Cr(i,t){return Dn(512,(e,n)=>{e.fillStyle=i,e.fillRect(0,0,n,n);for(let r=0;r<2100;r++){let s=re(0,n),o=re(0,n);e.strokeStyle=r%3?t:"#e2b884",e.globalAlpha=re(.025,.14),e.lineWidth=re(.3,1.6),e.beginPath(),e.moveTo(s,o),e.bezierCurveTo(s+re(-12,12),o+35,s+re(-10,10),o+100,s+re(-9,9),o+re(110,350)),e.stroke()}e.globalAlpha=1;for(let r=0;r<4;r++){const s=re(0,n),o=re(0,n);e.strokeStyle=t,e.globalAlpha=.12;for(let a=2;a<16;a+=2)e.beginPath(),e.ellipse(o,s,a/3,a*2.7,.07,0,Math.PI*2),e.stroke()}},1)}function Km(i,t="plain",e="#bca672",n=1){return Dn(512,(r,s)=>{r.fillStyle=i,r.fillRect(0,0,s,s);for(let o=0;o<s;o+=2)r.strokeStyle=o%4?"#ffffff13":"#00000021",r.lineWidth=1,r.beginPath(),r.moveTo(o,0),r.lineTo(o,s),r.stroke(),r.strokeStyle=o%6?"#ffffff12":"#00000017",r.beginPath(),r.moveTo(0,o),r.lineTo(s,o),r.stroke();for(let o=0;o<5e3;o++)r.fillStyle=o%2?"#fff":"#000",r.globalAlpha=re(.01,.08),r.fillRect(re(0,s),re(0,s),re(1,3),1);if(r.globalAlpha=1,r.strokeStyle=e,r.fillStyle=e,t==="brocade")for(let o=-128;o<650;o+=128)for(let a=-128;a<650;a+=128){const c=a+o/128%2*64,l=o;r.save(),r.translate(c,l),r.globalAlpha=.68,r.lineWidth=1.5,r.beginPath(),r.moveTo(0,-49),r.bezierCurveTo(48,-12,45,22,0,51),r.bezierCurveTo(-45,22,-48,-12,0,-49),r.stroke();for(let h=0;h<5;h++)r.save(),r.rotate(h*Math.PI*2/5),r.beginPath(),r.ellipse(0,-14,6,17,0,0,Math.PI*2),r.stroke(),r.restore();r.beginPath(),r.arc(0,0,4,0,Math.PI*2),r.fill(),r.globalAlpha=.3;for(let h=0;h<Math.PI*2;h+=Math.PI/4)r.beginPath(),r.ellipse(Math.sin(h)*41,Math.cos(h)*41,2,5,-h,0,Math.PI*2),r.fill();r.restore()}else if(t==="stripe"){for(let o=0;o<s;o+=64)r.globalAlpha=.75,r.fillRect(o,0,12,s),r.globalAlpha=.35,r.fillRect(o+18,0,2,s);r.globalAlpha=1}else if(t==="check"){r.globalAlpha=.22;for(let o=0;o<s;o+=64)r.fillRect(o,0,22,s),r.fillRect(0,o,s,22);r.globalAlpha=.55,r.lineWidth=1;for(let o=0;o<s;o+=64)r.fillRect(o+27,0,1,s),r.fillRect(0,o+27,s,1);r.globalAlpha=1}else if(t==="stars"){r.globalAlpha=.75;for(let o=32;o<s;o+=96)for(let a=32;a<s;a+=96)r.save(),r.translate(a+(o%192?23:0),o),r.beginPath(),r.moveTo(0,-9),r.lineTo(2,-2),r.lineTo(8,0),r.lineTo(2,2),r.lineTo(0,9),r.lineTo(-2,2),r.lineTo(-8,0),r.lineTo(-2,-2),r.closePath(),r.fill(),r.restore();r.globalAlpha=1}},n)}function Jm(){const i={},t=(r,s=.65,o=0)=>new je({color:r,roughness:s,metalness:o});i.oak=new je({map:Cr("#97714b","#3c2d20"),roughness:.56}),i.oakLight=new je({map:Cr("#bb9160","#675037"),roughness:.49}),i.darkWood=new je({map:Cr("#394b49","#111f22"),roughness:.5}),i.floor=new je({map:Cr("#a7825c","#4a3729"),roughness:.72}),i.floor.map.center.set(.5,.5),i.floor.map.rotation=Math.PI/2,i.teal=t("#254b50",.55),i.tealDark=t("#12343d",.45),i.trim=t("#c9c8af",.69);const e=Dn(256,(r,s)=>{r.fillStyle="#e4dfcc",r.fillRect(0,0,s,s);for(let o=0;o<17e3;o++)r.fillStyle=o%2?"#746b55":"#fff",r.globalAlpha=re(.01,.07),r.fillRect(re(0,s),re(0,s),re(1,4),re(1,3))},4);i.plaster=new je({map:e,bumpMap:e,bumpScale:.012,roughness:.95}),i.stone=t("#bec5bd",.9),i.ceiling=t("#bec5ba",.98),i.gold=t("#b99b55",.32,.76),i.paleGold=t("#d0b87b",.4,.58),i.steel=t("#9ba9a7",.25,.85),i.iron=t("#233237",.52,.73),i.paper=t("#decfa8",.95),i.paperEdge=t("#baac87",1),i.chalk=t("#f1e5c9",.93),i.thread=t("#d7c392",.8),i.mirror=new je({color:"#9daea7",metalness:.75,roughness:.26}),i.window=new hn({map:Dn(512,(r,s)=>{const o=r.createLinearGradient(0,0,0,s);o.addColorStop(0,"#afc9cf"),o.addColorStop(.48,"#d4e6e4"),o.addColorStop(1,"#e7e9d9"),r.fillStyle=o,r.fillRect(0,0,s,s);for(let a=0;a<8;a++)r.fillStyle="#ffffff09",r.beginPath(),r.ellipse(re(0,s),re(0,s),re(100,250),re(9,23),-.07,0,Math.PI*2),r.fill()},1)}),i.windowLow=new hn({color:"#b2cfd2"}),i.glow=new hn({color:"#ffe1a6"}),i.black=t("#202929",.85);const n=(r,s,o,a,c,l,h)=>{i[r]=new eu({map:Km(s,o,a,h),roughness:c,sheen:l,sheenRoughness:.62,sheenColor:new qt(s).lerp(new qt("#fff0d6"),.38),side:sn})};return n("brocade","#124951","brocade","#b49a56",.68,.85,1.5),n("silk","#a75646","plain","#d3b27e",.4,1,2),n("ivory","#d5c9a9","plain","#fff",.93,.3,3),n("velvet","#203944","plain","#999",.94,1,3),n("linen","#9ea891","check","#dcd6ac",.98,.25,1.5),n("stripe","#aaa894","stripe","#d9d0ad",.78,.5,1),n("rose","#92616b","brocade","#b68d85",.74,.9,.65),n("blue","#557e8a","stars","#d0bd82",.59,.85,1),n("ochre","#ac8142","plain","#aaa",.88,.6,2),n("plum","#574456","brocade","#92776d",.85,.9,.75),n("sage","#788e83","plain","#999",.96,.35,3),n("canvas","#b5a080","plain","#ccc",1,0,3),i.rug=new je({map:Dn(512,(r,s)=>{r.fillStyle="#345154",r.fillRect(0,0,s,s),r.strokeStyle="#b99867";for(const[o,a]of[[241,5],[227,1],[97,2],[89,1]])r.lineWidth=a,r.beginPath(),r.arc(256,256,o,0,Math.PI*2),r.stroke();for(let o=0;o<Math.PI*2;o+=Math.PI/16)r.save(),r.translate(256+Math.sin(o)*185,256+Math.cos(o)*185),r.rotate(-o+Math.PI/4),r.globalAlpha=.42,r.strokeRect(-11,-11,22,22),r.restore();r.lineWidth=2;for(let o=0;o<Math.PI*2;o+=Math.PI/4)r.save(),r.translate(256,256),r.rotate(o),r.beginPath(),r.ellipse(0,-27,11,35,0,0,Math.PI*2),r.stroke(),r.restore();for(let o=0;o<512;o+=3)r.fillStyle="#00000015",r.fillRect(0,o,512,1)},1),roughness:1}),i}function Zm(i,t="",e={}){const n=document.createElement("canvas");n.width=e.width||1024,n.height=e.height||256;const r=n.getContext("2d");r.fillStyle=e.bg||"#24464b",r.fillRect(0,0,n.width,n.height),r.strokeStyle=e.ink||"#d5bc86",r.lineWidth=3,r.strokeRect(12,12,n.width-24,n.height-24),r.textAlign="center",r.fillStyle=e.ink||"#dfcda6",r.font=`${e.size||55}px Georgia`,r.fillText(i,n.width/2,n.height*(t?.46:.6)),t&&(r.font="23px sans-serif",r.fillText(t,n.width/2,n.height*.74));const s=new Il(n);return s.colorSpace=Ie,s.anisotropy=4,s}const zi=new D;function Ye(i,t,e,n,r,s){const o=2*Math.PI*r/4,a=Math.max(s-2*r,0),c=Math.PI/4;zi.copy(t),zi[n]=0,zi.normalize();const l=.5*o/(o+a),h=1-zi.angleTo(i)/c;return Math.sign(zi[e])===1?h*l:a/(o+a)+l+l*(1-h)}class Vr extends Nn{constructor(t=1,e=1,n=1,r=2,s=.1){const o=r*2+1;if(s=Math.min(t/2,e/2,n/2,s),super(1,1,1,o,o,o),this.type="RoundedBoxGeometry",this.parameters={width:t,height:e,depth:n,segments:r,radius:s},o===1)return;const a=this.toNonIndexed();this.index=null,this.attributes.position=a.attributes.position,this.attributes.normal=a.attributes.normal,this.attributes.uv=a.attributes.uv;const c=new D,l=new D,h=new D(t,e,n).divideScalar(2).subScalar(s),f=this.attributes.position.array,m=this.attributes.normal.array,p=this.attributes.uv.array,g=f.length/6,x=new D,d=.5/o;for(let u=0,S=0;u<f.length;u+=3,S+=2)switch(c.fromArray(f,u),l.copy(c),l.x-=Math.sign(l.x)*d,l.y-=Math.sign(l.y)*d,l.z-=Math.sign(l.z)*d,l.normalize(),f[u+0]=h.x*Math.sign(c.x)+l.x*s,f[u+1]=h.y*Math.sign(c.y)+l.y*s,f[u+2]=h.z*Math.sign(c.z)+l.z*s,m[u+0]=l.x,m[u+1]=l.y,m[u+2]=l.z,Math.floor(u/g)){case 0:x.set(1,0,0),p[S+0]=Ye(x,l,"z","y",s,n),p[S+1]=1-Ye(x,l,"y","z",s,e);break;case 1:x.set(-1,0,0),p[S+0]=1-Ye(x,l,"z","y",s,n),p[S+1]=1-Ye(x,l,"y","z",s,e);break;case 2:x.set(0,1,0),p[S+0]=1-Ye(x,l,"x","z",s,t),p[S+1]=Ye(x,l,"z","x",s,n);break;case 3:x.set(0,-1,0),p[S+0]=1-Ye(x,l,"x","z",s,t),p[S+1]=1-Ye(x,l,"z","x",s,n);break;case 4:x.set(0,0,1),p[S+0]=1-Ye(x,l,"x","y",s,t),p[S+1]=1-Ye(x,l,"y","x",s,e);break;case 5:x.set(0,0,-1),p[S+0]=Ye(x,l,"x","y",s,t),p[S+1]=1-Ye(x,l,"y","x",s,e);break}}static fromJSON(t){return new Vr(t.width,t.height,t.depth,t.segments,t.radius)}}function $m(i,t=!1){const e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),r=new Set(Object.keys(i[0].morphAttributes)),s={},o={},a=i[0].morphTargetsRelative,c=new Ee;let l=0;for(let h=0;h<i.length;++h){const f=i[h];let m=0;if(e!==(f.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const p in f.attributes){if(!n.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+p+'" attribute exists among all geometries, or in none of them.'),null;s[p]===void 0&&(s[p]=[]),s[p].push(f.attributes[p]),m++}if(m!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==f.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const p in f.morphAttributes){if(!r.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[p]===void 0&&(o[p]=[]),o[p].push(f.morphAttributes[p])}if(t){let p;if(e)p=f.index.count;else if(f.attributes.position!==void 0)p=f.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,p,h),l+=p}}if(e){let h=0;const f=[];for(let m=0;m<i.length;++m){const p=i[m].index;for(let g=0;g<p.count;++g)f.push(p.getX(g)+h);h+=i[m].attributes.position.count}c.setIndex(f)}for(const h in s){const f=ol(s[h]);if(!f)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;c.setAttribute(h,f)}for(const h in o){const f=o[h][0].length;if(f===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[h]=[];for(let m=0;m<f;++m){const p=[];for(let x=0;x<o[h].length;++x)p.push(o[h][x][m]);const g=ol(p);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;c.morphAttributes[h].push(g)}}return c}function ol(i){let t,e,n,r=-1,s=0;for(let l=0;l<i.length;++l){const h=i[l];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(r===-1&&(r=h.gpuType),r!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;s+=h.count*e}const o=new t(s),a=new Ke(o,e,n);let c=0;for(let l=0;l<i.length;++l){const h=i[l];if(h.isInterleavedBufferAttribute){const f=c/e;for(let m=0,p=h.count;m<p;m++)for(let g=0;g<e;g++){const x=h.getComponent(m,g);a.setComponent(m+f,g,x)}}else o.set(h.array,c);c+=h.count*e}return r!==void 0&&(a.gpuType=r),a}const on=Math.PI*2,jm=new Nn(1,1,1);function pt(i,t,e,n,r,s,o,a,c=0){const l=new ge(jm,t);return l.position.set(e,n,r),l.scale.set(s,o,a),l.rotation.y=c,i.add(l),l}function Se(i,t,e,n=0,r=0,s=0){const o=new ge(t,e);return o.position.set(n,r,s),i.add(o),o}function Qt(i,t,e,n,r,s,o,a,c=24){return Se(i,new ko(s,o,a,c),t,e,n,r)}function me(i,t,e,n,r,s,o=1,a=1,c=1){const l=Se(i,new Wo(s,s<.025?8:s<.08?12:20,s<.025?6:s<.08?8:14),t,e,n,r);return l.scale.set(o,a,c),l}function Zt(i,t,e,n,r=.012,s=8){const o=new D(...e),a=new D(...n),c=Qt(i,t,0,0,0,r,r,o.distanceTo(a),s);return c.position.copy(o).add(a).multiplyScalar(.5),c.quaternion.setFromUnitVectors(new D(0,1,0),a.sub(o).normalize()),c}function He(i,t,e,n=.01,r=!1,s=50){const o=new Nl(e.map(a=>new D(...a)),r);return Se(i,new qo(o,s,n,6,r),t)}function Pe(i,t,e,n,r,s,o=.015,a=0,c=0,l=0,h=on){const f=Se(i,new Xo(s,o,s<.025?4:6,s<.2?24:s<.6?40:64,h),t,e,n,r);return f.rotation.set(a,c,l),f}function Ae(i,t,e,n=30,r=24){const s=[],o=[],a=[];for(let l=0;l<=r;l++)for(let h=0;h<=n;h++)s.push(...e(h/n,l/r)),o.push(h/n,l/r);for(let l=0;l<r;l++)for(let h=0;h<n;h++){const f=l*(n+1)+h,m=f+n+1;a.push(f,m,f+1,m,m+1,f+1)}const c=new Ee;return c.setAttribute("position",new $t(s,3)),c.setAttribute("uv",new $t(o,2)),c.setIndex(a),c.computeVertexNormals(),Se(i,c,t)}function ke(i,t,e,n,r,s,o=1,a=.25,c=0,l={}){const h=new hn({map:Zm(t,e,l),side:yn}),f=Se(i,new In(o,a),h,n,r,s);return f.rotation.y=c,f}function Qm(i){i.updateMatrixWorld(!0);const t=new Map,e=[];i.traverse(r=>{if(r.isMesh&&!r.isInstancedMesh&&!Array.isArray(r.material)&&r.userData.batch!==!1){const s=r.material.uuid;t.has(s)||t.set(s,{mat:r.material,geos:[]});let o=r.geometry.index?r.geometry.toNonIndexed():r.geometry.clone();o.applyMatrix4(r.matrixWorld),o.attributes.uv||o.setAttribute("uv",new $t(new Float32Array(o.attributes.position.count*2),2));for(const a of Object.keys(o.attributes))["position","normal","uv"].includes(a)||o.deleteAttribute(a);t.get(s).geos.push(o),e.push(r)}});for(const r of e)r.removeFromParent();let n=0;for(const{mat:r,geos:s}of t.values()){const o=$m(s,!1);if(s.forEach(c=>c.dispose()),!o)throw new Error("Could not batch scene geometry");o.computeBoundingSphere();const a=new ge(o,r);a.castShadow=!r.userData.noShadow&&!r.transparent&&!(r instanceof hn),a.receiveShadow=!0,i.add(a),n+=o.attributes.position.count/3}return{batches:t.size,triangles:n}}function t0(i,t){const e=new Le;i.add(e);const n=[],r=[],s=(M,I,O,H,Z=4.45)=>{pt(e,t.plaster,M,Z/2,I,O,Z,H),n.push({type:"box",x:M,z:I,w:O,d:H})},o=(M,I,O,H)=>n.push({type:"box",x:M,z:I,w:O,d:H}),a=(M,I,O,H,Z,ot=2.4)=>r.push({position:new D(M,I,O),title:H,body:Z,r:ot}),c=(M,I,O,H=.72)=>{Qt(M,t.darkWood,I,H*.5,O,.045,.06,H,8),Qt(M,t.gold,I,.08,O,.055,.057,.09,8)};function l(M,I,O,H,Z=0){const ot=new Le;e.add(ot),ot.position.set(M,0,I),ot.rotation.y=Z,pt(ot,t.oak,0,.48,0,O,.13,H),pt(ot,t.velvet,0,.59,0,O-.08,.16,H-.05);for(const gt of[-O/2+.13,O/2-.13])for(const ct of[-H/2+.1,H/2-.1])c(ot,gt,ct,.45);for(let gt=0;gt<6;gt++)me(ot,t.paleGold,-O*.38+gt*O*.15,.68,0,.015);return Zt(ot,t.gold,[-O/2,.59,-H*.47],[O/2,.59,-H*.47],.011),o(M,I,Z?H:O,Z?O:H),ot}function h(M,I,O,H,Z,ot=0){const gt=new Le;gt.position.set(M,I,O),gt.rotation.y=ot,e.add(gt);for(const ct of[-H/2,H/2])pt(gt,t.oakLight,ct,0,0,.075,Z+.12,.085);for(const ct of[-Z/2,Z/2])pt(gt,t.oakLight,0,ct,0,H,.075,.085);for(const ct of[-H/2+.04,H/2-.04])pt(gt,t.gold,ct,0,.05,.012,Z,.01);return gt}function f(M,I,O){const Z=O/2,ot=new er;ot.moveTo(-Z,4.45),ot.lineTo(Z,4.45),ot.lineTo(Z,2.48);for(let G=0;G<=Math.PI+.001;G+=Math.PI/40)ot.lineTo(Math.cos(G)*Z,2.48+Math.sin(G)*Z);ot.lineTo(-Z,4.45);const gt=new Vo(ot,{depth:.22,bevelEnabled:!1});Se(e,gt,t.plaster,M,0,I-.11);for(const G of[-Z,Z])pt(e,t.trim,M+G,1.25,I,.12,2.5,.32),pt(e,t.darkWood,M+G,.12,I,.2,.24,.35);const ct=[];for(let G=0;G<=Math.PI+.001;G+=Math.PI/45)ct.push([M+Math.cos(G)*(Z+.055),2.48+Math.sin(G)*(Z+.055),I+.135]);He(e,t.trim,ct,.065,!1,48),pt(e,t.gold,M,3.64,I+.19,.09,.27,.045)}function m(M,I,O,H,Z,ot=0){const gt=new Le;e.add(gt),gt.position.set(M,I,O),gt.rotation.y=ot,pt(gt,t.window,0,0,-.11,H,Z,.04),pt(gt,t.windowLow,0,-Z*.22,-.084,H,.05,.01);for(const ct of[-H/2,H/2])pt(gt,t.trim,ct,0,0,.15,Z+.18,.23);for(const ct of[-Z/2,Z/2])pt(gt,t.trim,0,ct,0,H+.2,.15,.23);pt(gt,t.oakLight,0,-Z/2-.04,.14,H+.35,.09,.47);for(let ct=-H/2+.44;ct<H/2;ct+=.44)pt(gt,t.teal,ct,0,.015,.035,Z,.04);for(let ct=-Z/2+.62;ct<Z/2;ct+=.62)pt(gt,t.teal,0,ct,.02,H,.035,.04);for(let ct=-H/2+.22;ct<H/2;ct+=.44)Zt(gt,t.gold,[ct,-Z/2,0],[ct+.44,-Z/2+.44,0],.006);pt(gt,t.gold,H*.38,-Z*.24,.07,.026,.15,.03)}function p(M,I,O=3.35){Zt(e,t.iron,[M,4.35,I],[M,O+.25,I],.018),Qt(e,t.gold,M,O+.17,I,.06,.08,.13),Qt(e,t.tealDark,M,O,I,.1,.33,.26,32),Qt(e,t.glow,M,O-.134,I,.28,.28,.01,32),me(e,t.glow,M,O-.16,I,.07)}pt(e,t.darkWood,0,-.15,-.5,14,.3,17);for(let M=0;M<76;M++){let I=-8.88+M*.222;for(let O=-1;O<9;O++){let H=-6.92+O*1.72+(M%2?.86:0);const Z=Math.max(-6.96,H),ot=Math.min(6.96,H+1.7);ot>Z&&pt(e,M%9===0?t.oakLight:t.floor,(Z+ot)/2,.003,I,ot-Z,.036,.211)}}s(-7,-.5,.22,17.1),s(7,-.5,.22,17.1),s(0,-9,14,.22),s(0,8,14,.22);for(const M of[-6.86,6.86]){pt(e,t.teal,M,.52,-.5,.1,1.04,16.8),pt(e,t.oakLight,M,1.08,-.5,.15,.07,16.8),pt(e,t.darkWood,M,.11,-.5,.18,.2,16.8);for(let I=-8.6;I<8;I+=1.12)pt(e,t.trim,M-(M<0?-.06:.06),.55,I,.024,.67,.028)}for(const M of[-8.86,7.86])pt(e,t.teal,0,.52,M,13.7,1.04,.1),pt(e,t.oakLight,0,1.08,M,13.7,.07,.15),pt(e,t.darkWood,0,.1,M,13.7,.2,.16);pt(e,t.ceiling,0,4.52,-.5,14,.16,17);for(let M=-8.6;M<8;M+=3.3){pt(e,t.darkWood,0,4.35,M,14,.25,.17);for(const I of[-6.6,6.6])Zt(e,t.oakLight,[I,3.96,M],[I+(I<0?.45:-.45),4.29,M],.055)}for(const M of[-6.82,6.82])pt(e,t.trim,M,4.2,-.5,.22,.2,17);s(-6.1,1.7,1.8,.22),s(-.25,1.7,5.1,.22),s(6.2,1.7,1.6,.22),f(-4,1.7,2.4),f(3.85,1.7,3.1);for(const[M,I]of[[-6.1,1.8],[-.25,5.1],[6.2,1.6]]){pt(e,t.teal,M,.5,1.55,I,1,.075),pt(e,t.teal,M,.5,1.85,I,1,.075);for(const O of[1.49,1.91])pt(e,t.oakLight,M,1.04,O,I,.06,.1)}s(-1.4,-.9,.18,5.2),s(-1.4,-8.1,.18,1.8),pt(e,t.plaster,-1.4,3.9,-5.65,.18,1.1,3.1);for(const M of[-3.5,-7.2])pt(e,t.trim,-1.4,1.55,M,.3,3.1,.12);m(-6.78,2.56,4.7,2.7,2.6,Math.PI/2),m(-6.78,2.7,-4.18,2.4,2.75,Math.PI/2),m(3.5,2.68,-8.78,4.9,2.65,0),m(6.78,2.8,-2.25,2.8,2.5,-Math.PI/2),Zt(e,t.gold,[-6.48,3.99,3.03],[-6.48,3.99,6.39],.022);for(const M of[-1,1]){const I=4.71+M*1.52;Ae(e,t.stripe,(H,Z)=>{const ot=1-.53*Math.exp(-Math.pow((Z-.62)*5,2));return[-6.41-.055*Math.cos(H*on*4)*ot-.18*Math.sin(Z*Math.PI),3.92-Z*3.66,I+(H-.5)*.64*ot+M*.13*Math.sin(Z*Math.PI)]},26,32);const O=[];for(let H=0;H<=18;H++){const Z=H/18;O.push([-6.61+.03*Math.sin(Z*Math.PI),1.65,I+(Z-.5)*.34+M*.12])}He(e,t.gold,O,.012,!1,20),Zt(e,t.gold,[-6.4,1.65,I],[-6.29,1.25,I+M*.07],.013),Qt(e,t.ochre,-6.29,1.2,I+M*.07,.025,.055,.15,12),o(-6.48,I,.4,.71)}pt(e,t.darkWood,2,1.48,7.72,1.55,2.95,.13);for(const M of[1.57,2.42])for(const I of[.64,1.89])pt(e,t.teal,M,I,7.63,.62,1.03,.045),pt(e,t.oakLight,M,I+.49,7.59,.65,.027,.028);for(const M of[1.16,2.84])pt(e,t.trim,M,1.54,7.64,.13,3.15,.21);pt(e,t.trim,2,3.07,7.63,1.82,.15,.22),me(e,t.gold,2.52,1.11,7.49,.047),ke(e,"SELENE","TAILOR TO THE LUNAR COURT",2,2.56,7.54,1.02,.26,Math.PI),ke(e,"THE MOONWAKE COMMISSION","CORONATION MANTLE · WORK IN PROGRESS",-.1,2.39,1.835,2.5,.6,0),ke(e,"II · THE CLOTH ARCHIVE","REGISTERED WEAVES & DYESTUFFS",-4,3.93,1.9,1.85,.24),ke(e,"III · THE WORKROOM","THE SOVEREIGN’S MANTLE",3.85,4.06,1.9,2,.23);for(const[M,I]of[[-4,1.7],[3.85,1.7],[-1.4,-5.65]])Pe(e,t.gold,M,.033,I,.14,.012,Math.PI/2),pt(e,t.gold,M,.026,I,.05,.008,.3);for(const M of[-4,3.85])pt(e,t.oakLight,M,.04,1.7,M<0?2.4:3.1,.035,.24);Qt(e,t.darkWood,-3.05,.07,4.72,1.52,1.54,.14,80),Qt(e,t.oakLight,-3.05,.148,4.72,1.47,1.49,.035,80),Pe(e,t.gold,-3.05,.171,4.72,1.35,.012,Math.PI/2);const g=Se(e,new Hr(1.24,80),t.rug,-3.05,.17,4.72);g.rotation.x=-Math.PI/2;for(let M=0;M<24;M++){const I=M*on/24;pt(e,t.gold,-3.05+Math.sin(I)*1.43,.174,4.72+Math.cos(I)*1.43,.022,.006,.055,-I)}const x=h(-3.14,1.71,7.4,1.18,2.62,Math.PI);pt(x,t.mirror,0,0,-.03,1.12,2.54,.026);for(const M of[-1,1]){const I=h(-3.14+M*1.12,1.68,7.22,.85,2.5,Math.PI+M*.2);pt(I,t.mirror,0,0,-.03,.8,2.42,.026)}for(const M of[-4.25,-3.14,-2.03])Pe(e,t.gold,M,2.72,7.14,.14,.009,0,0,.3,Math.PI*1.5);l(5.8,4.75,2.2,.7,Math.PI/2),pt(e,t.velvet,6.19,1.02,4.75,.14,.71,2.18);for(const M of[3.68,5.83])pt(e,t.oakLight,5.86,.82,M,.81,.13,.11),Qt(e,t.oak,5.59,.72,M,.04,.04,.4);o(6.19,4.75,.17,2.22),Ae(e,t.ivory,(M,I)=>[5.62+M*.06,.92-I*.55,3.66+Math.sin(I*Math.PI)*.06],2,15);for(let M=0;M<12;M++)pt(e,t.iron,5.65,.9-M*.038,3.671,.025,.004,.006);const d=new Le;e.add(d),d.position.set(.23,0,5.76),pt(d,t.oakLight,0,.86,0,1.32,.08,.58);for(const M of[-.54,.54])for(const I of[-.2,.2])c(d,M,I,.83);pt(d,t.darkWood,0,.64,0,1.15,.29,.46),pt(d,t.oak,0,.65,.244,1.08,.2,.022),me(d,t.gold,0,.65,.28,.028),o(.23,5.76,1.32,.58),Pr(d,t,.36,.93,0,.12),al(d,t,-.31,.94,0,t.rose),Ds(d,t,-.04,.917,.09,.7),ke(e,"I · THE FITTING ROOM","MEASURE TWICE. CUT ONCE.",.1,3.18,1.835,1.58,.3),pt(e,t.oak,-5.7,.15,6.7,.7,.3,.5),pt(e,t.oakLight,-5.7,.31,6.7,.76,.05,.54),o(-5.7,6.7,.76,.54),p(-3.05,4.7,3.35),p(4.1,5.7,3.4),a(-3.05,1.1,4.7,"The fitting circle","A brass circle marks the hem. The low oak platform can be stepped onto; a three-part silvered glass gives the tailor a quiet, stylized backdrop.",2.6),a(.2,1.1,5.76,"Between fittings","A silk reel, shears and a tray for pins. The tape has been left on the settee arm for the next fitting.",1.5);function u(M,I,O,H=0){const Z=new Le;e.add(Z),Z.position.set(M,0,I),Z.rotation.y=H,pt(Z,t.darkWood,0,1.38,-.34,O,2.7,.1);for(const ot of[-O/2,O/2])pt(Z,t.oak,ot,1.4,0,.11,2.8,.78),pt(Z,t.gold,ot,1.38,.405,.016,2.63,.012);for(const ot of[.15,.75,1.35,1.95,2.55])pt(Z,t.oakLight,0,ot,0,O+.1,.075,.79),pt(Z,t.oak,0,ot+.04,.39,O+.1,.09,.045);pt(Z,t.oakLight,0,2.73,0,O+.26,.18,.85);for(let ot=1;ot<4;ot++)pt(Z,t.oak,(ot/4-.5)*O,1.36,-.02,.065,2.4,.7);return Z}const S=[t.brocade,t.ivory,t.blue,t.silk,t.linen,t.stripe,t.rose,t.ochre,t.plum,t.sage,t.velvet,t.canvas];function y(M,I,O,H,Z,ot=.115,gt=.6,ct="lying"){const G=Qt(M,Z,I,O,H,ot,ot,gt,24),it=ct==="lying"?"z":"y";if(it==="z"&&(G.rotation.x=Math.PI/2),it==="z"){const Tt=Qt(M,t.canvas,I,O,H+gt/2+.004,ot*.91,ot*.91,.014,24);Tt.rotation.x=Math.PI/2;const Dt=Qt(M,t.oakLight,I,O,H+gt/2+.014,.022,.022,.016,12);Dt.rotation.x=Math.PI/2;for(const wt of[.43,.65,.85])Pe(M,t.ivory,I,O,H+gt/2+.016,ot*wt,.0028)}else Qt(M,t.canvas,I,O+gt/2+.004,H,ot*.94,ot*.94,.013,24),Qt(M,t.oakLight,I,O+gt/2+.014,H,.022,.022,.025,12)}const _=u(-6.35,-1.2,3.1,Math.PI/2),R=u(-6.35,-7.06,3.08,Math.PI/2);for(const[M,I]of[[_,0],[R,1]]){for(let O=0;O<4;O++)for(let H=0;H<4;H++){const Z=(H/4-.375)*3.1,ot=.2+O*.6;if((H+O+I)%3===0){const gt=S[(H*2+O+I*4)%S.length],ct=gt===t.ivory||gt===t.silk?.049:gt===t.velvet?.098:.073;for(let G=0;G<3;G++){const it=ot+ct*.5+G*(ct+.007);Se(M,new Vr(.57,ct,.52,1,.012),gt,Z,it,.02),Zt(M,t.thread,[Z-.265,it-.008,.285],[Z+.265,it-.008,.285],.0025)}}else{const gt=S[(H+O*3+I*5)%S.length];for(let ct=0;ct<3;ct++)y(M,Z-.21+ct*.21,ot+.12,.03,gt,.094+(O+ct)%2*.014,.63);if(O!==3)for(let ct=0;ct<2;ct++)y(M,Z-.1+ct*.22,ot+.3,.01,gt,.106,.61)}}for(let O=0;O<4;O++)ke(M,["01  SILKS","02  BROCADES","03  LINENS","04  WOOLS"][O],I?"WINTER REGISTER":"COURT COLLECTION",(O/4-.375)*3.1,.43,.439,.54,.17,0,{width:512,height:160,size:44})}o(-6.35,-1.2,.86,3.3),o(-6.35,-7.06,.86,3.3),pt(e,t.darkWood,-6.27,.4,-4.18,.92,.8,2),pt(e,t.oakLight,-6.27,.83,-4.18,1.03,.08,2.1),o(-6.27,-4.18,1.03,2.1);for(let M=0;M<3;M++){const I=new Le;e.add(I),I.position.set(-6.13,1.02,-4.72+M*.5),I.rotation.y=Math.PI/2,y(I,0,0,0,S[M+4],.14,.68)}Zt(e,t.gold,[-1.69,2.5,-2.83],[-1.69,2.5,.85],.022);for(let M=0;M<5;M++){const I=-2.5+M*.72,O=[t.velvet,t.brocade,t.silk,t.ivory,t.stripe][M],H=[.12,.085,.052,.06,.078][M],Z=[1.55,2.3,3.8,2.8,2.05][M],ot=[1.42,1.54,1.4,1.49,1.46][M];Ae(e,O,(ct,G)=>[-1.82-H*Math.cos(ct*on*Z)*(.4+G*.6)-.035*Math.sin(G*Math.PI),2.36-G*ot+.008*Math.sin(ct*12)*G*G,I+(ct-.5)*.56],30,24);for(let ct=0;ct<4;ct++)Pe(e,t.gold,-1.77,2.46,I-.22+ct*.145,.045,.007,0,Math.PI/2);const gt=[];for(let ct=0;ct<=30;ct++){const G=ct/30;gt.push([-1.823-H*Math.cos(G*on*Z),2.36-ot+.008*Math.sin(G*12),I+(G-.5)*.56])}He(e,t.thread,gt,M===0?.006:.003,!1,30),ke(e,["VELVET","MOON BROCADE","SHOT SILK","TOILE / LINEN","TICKING"][M],"",-1.52,.64,I,.48,.13,-Math.PI/2,{bg:"#c7b58e",ink:"#3a4843",width:512,height:160,size:55})}o(-1.74,-.99,.46,3.78),a(-2,1.5,-1.1,"Five weights of moonlight","Dense velvet holds a heavy fold. Brocade carries a woven moon-flower. Shot silk catches the work light; plain toile exposes the shape before a precious cloth is cut.",2.1),a(-5.7,1.6,-6.6,"The cloth register","Bolts are grouped by weave and dye lot, with the cut ends facing the aisle. Folded linens sit flat; heavy wool rolls have wide cores.",2.2);const C=h(-3.9,2.03,-8.77,2.23,1.58);pt(C,t.canvas,0,0,-.02,2.18,1.53,.04);for(let M=0;M<3;M++)for(let I=0;I<6;I++){const O=-4.79+I*.35,H=2.53-M*.43;pt(e,t.paper,O,H,-8.716,.27,.34,.016),pt(e,S[(M*4+I)%12],O,H+.032,-8.702,.2,.2,.017),me(e,t.gold,O,H+.14,-8.682,.008)}ke(e,"THE DYE LIBRARY","SEA / SKY / EARTH",-3.9,3.08,-8.68,1.7,.25),pt(e,t.oakLight,-3.9,.93,-8.19,2.25,.09,.62);for(const M of[-4.85,-2.95])c(e,M,-8.19,.9);o(-3.9,-8.19,2.25,.62),ll(e,t,-3.65,1.02,-8.14,.46,.35),Pr(e,t,-4.55,1.015,-8.11,.105),p(-4.1,-2.2,3.38),p(-4.1,-6.5,3.36);const w=new Le;e.add(w),w.position.set(3.33,0,-7.1),pt(w,t.oakLight,0,.965,0,4.5,.145,1.31);for(let M=0;M<5;M++)pt(w,t.oak,(M-2)*.88,1.041,0,.008,.002,1.3);for(const M of[-2.02,2.02])for(const I of[-.49,.49])pt(w,t.darkWood,M,.48,I,.14,.96,.14),Qt(w,t.gold,M,.08,I,.075,.075,.085,8);pt(w,t.oak,0,.22,0,4.14,.085,1.06);for(const M of[-1.53,-.51,.51,1.53]){pt(w,t.darkWood,M,.73,.33,.99,.3,.56),pt(w,t.oak,M,.74,.649,.94,.24,.038),Zt(w,t.gold,[M-.1,.76,.69],[M+.1,.76,.69],.015);for(const I of[-1,1])me(w,t.gold,M+I*.1,.76,.673,.02)}o(3.33,-7.1,4.5,1.31),Ae(w,t.silk,(M,I)=>{const O=.5+M*1.22,H=-.57+I*1.66,Z=Math.max(0,H-.62);return[O,1.061-Math.pow(Z,1.3)*1.55+.017*Math.sin(M*25+I*3),Math.min(H,.67)+Math.sin(M*19)*Z*.055]},30,32);for(let M=0;M<3;M++)n0(w,t,-1.3+M*.42,1.062,-.15+M*.05,.42,.84,M*.27-.2,M);Ds(w,t,-.72,1.075,.35,1.25),pt(w,t.oakLight,-.61,1.076,-.48,2.38,.018,.072);for(let M=0;M<48;M++)pt(w,t.iron,-1.75+M*.048,1.087,-.485+(M%5?-.009:0),.003,.001,M%5?.022:.052);for(let M=0;M<6;M++)al(w,t,1.68+M%2*.22,1.08,-.36+Math.floor(M/2)*.22,[t.ivory,t.silk,t.brocade][M%3]);Pr(w,t,-1.87,1.09,.35,.115),me(w,t.rose,-1.55,1.13,.36,.1,1,.7,1);for(let M=0;M<12;M++){const I=M*2.4;Zt(w,t.steel,[-1.55+Math.cos(I)*.05,1.17,.36+Math.sin(I)*.05],[-1.55+Math.cos(I)*.085,1.23+re(0,.025),.36+Math.sin(I)*.085],.0025,5),me(w,t.ivory,-1.55+Math.cos(I)*.085,1.23,.36+Math.sin(I)*.085,.006)}pt(w,t.chalk,-.36,1.082,.39,.066,.017,.049,.25),Pe(w,t.oakLight,.02,1.081,.05,.225,.013,Math.PI/2),Pe(w,t.gold,.02,1.083,.05,.24,.005,Math.PI/2);const U=Se(w,new Hr(.215,40),t.brocade,.02,1.079,.05);U.rotation.x=-Math.PI/2,Pe(w,t.paleGold,.02,1.084,.05,.095,.008,Math.PI/2,0,.45,Math.PI*1.55),Zt(w,t.steel,[.24,1.09,.04],[.24,1.09,.11],.006,6),pt(w,t.gold,.24,1.089,.075,.04,.023,.035),He(w,t.thread,[[.05,1.088,.12],[.1,1.086,.2],[.28,1.07,.3],[.34,1.069,.44]],.002,!1,20),Zt(w,t.steel,[.3,1.082,.39],[.38,1.085,.46],.0022,5),Qt(w,t.steel,.4,1.097,-.22,.018,.025,.054,16);for(let M=0;M<6;M++)me(w,t.iron,.4+Math.sin(M)*.019,1.113,-.22+Math.cos(M)*.019,.0028);me(w,t.linen,-1.94,1.135,-.31,.105,1.25,.65,.85),pt(w,t.oakLight,-1.83,1.104,-.02,.22,.057,.1,.2);for(let M=0;M<3;M++)Se(w,new Vr(.85,.072,.8,1,.015),[t.ivory,t.blue,t.canvas][M],-1.3,.31+M*.078,0);for(let M=0;M<5;M++){const I=Qt(w,t.paper,.4+M*.23,.35,0,.093,.093,.9,16);I.rotation.x=Math.PI/2,Pe(w,t.paperEdge,.4+M*.23,.35,.455,.077,.012)}a(3,1.1,-6.45,"The cutting bench","The mantle’s paper pieces carry grain lines, notches and seam allowance. Shears, chalk, a wooden rule and a pinned cushion make this a working commission, not a display.",2.4),e0(e,t,5.24,1.05,-7.35),pt(e,t.darkWood,6.28,.7,-5.25,1,1.4,2.1),pt(e,t.oakLight,6.28,1.43,-5.25,1.13,.09,2.18),o(6.28,-5.25,1.13,2.18);for(let M=0;M<5;M++){pt(e,t.oak,5.761,.18+M*.25,-5.25,.032,.215,1.87);for(const I of[-5.8,-4.7])me(e,t.gold,5.721,.18+M*.25,I,.023)}ll(e,t,6.22,1.51,-5.74,.45,.61),Pr(e,t,6.19,1.52,-4.75,.14),Zt(e,t.iron,[6.18,.14,.48],[6.18,2.4,.48],.024),Zt(e,t.iron,[6.18,2.4,-.95],[6.18,2.4,1],.025);for(const M of[-.6,.1,.72])Zt(e,t.iron,[6,.12,M],[6.4,.12,M],.018),Pe(e,t.gold,6.18,2.33,M,.075,.007,0,Math.PI/2),Ae(e,t.ivory,(I,O)=>[6.14-.035*Math.sin(I*13),2.21-O*1.25,M+(I-.5)*.49*(1+O*.35)],14,16);o(6.18,-.05,.65,2.15);const b=h(6.76,2.05,-.9,1.48,1.08,-Math.PI/2);pt(b,t.paper,0,0,-.022,1.4,1,.028);const T=i0();Se(b,new In(1.4,1),new hn({map:T}),0,0,.008),ke(e,"MANTLE No. 07","APPROVED AT THE SECOND FITTING",6.71,2.91,-.9,1.45,.22,-Math.PI/2);const L=h(-1.24,2.07,-1.42,1.65,1.32,Math.PI/2);pt(L,t.darkWood,0,0,-.035,1.57,1.24,.04);const z=ke(L,"VII · MOONWAKE","CORONATION / THIRD MOON",-.28,.12,.028,.74,.39,0,{bg:"#dbcca8",ink:"#3c504d",width:1024,height:512,size:62});z.rotation.z=-.045;for(let M=0;M<4;M++)pt(L,t.paperEdge,-.25,-.13-M*.058,.034,.54-M*.027,.008,.004);for(const M of[-.18,.08,.36])me(L,t.gold,.5,M,.075,.025),Zt(L,t.gold,[.5,M,.08],[.5,M-.14,.1],.013);const V=Ds(L,t,.51,-.36,.11,.67);V.rotation.x=Math.PI/2,Pe(L,t.gold,-.53,.47,.034,.035,.006,0,0,0,Math.PI*1.55),p(1.9,-3.65,3.63),p(3,-7.2,3.55),a(6.3,1.6,-.85,"The second fitting","The finished side has been approved. The opposite side remains in toile while the tailor balances the radial collar and the long, shell-shaped train.",1.8);const J=Dn(128,(M,I)=>{const O=M.createRadialGradient(I/2,I/2,I*.05,I/2,I/2,I*.5);O.addColorStop(0,"rgba(20,31,28,.32)"),O.addColorStop(.65,"rgba(20,31,28,.12)"),O.addColorStop(1,"rgba(20,31,28,0)"),M.fillStyle=O,M.fillRect(0,0,I,I)}),Y=new hn({map:J,transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-1});for(const[M,I,O,H]of[[-3.05,4.72,3.4,3.4],[3.33,-7.1,5.1,2],[5.8,4.75,1.3,2.9],[6.28,-5.25,1.6,2.7],[2.1,-3.7,3.6,3.7]]){const Z=Se(e,new In(O,H),Y,M,.032,I);Z.rotation.x=-Math.PI/2,Z.userData.batch=!1}const X=Dn(256,(M,I)=>{const O=M.createLinearGradient(0,0,I,0);O.addColorStop(0,"rgba(212,237,240,0)"),O.addColorStop(.15,"rgba(212,237,240,.22)"),O.addColorStop(.65,"rgba(212,237,240,.14)"),O.addColorStop(1,"rgba(212,237,240,0)"),M.fillStyle=O,M.fillRect(0,0,I,I),M.globalCompositeOperation="destination-out";for(let H=0;H<=I;H+=I/6)M.fillRect(0,H-2,I,4);for(const H of[I*.35,I*.69])M.fillRect(H-2,0,4,I)}),j=new hn({map:X,transparent:!0,depthWrite:!1,blending:Ns,opacity:.45});for(const[M,I,O,H,Z]of[[-4.35,4.55,4.65,2.67,-.14],[-4.5,-4.24,4.5,2.4,-.14],[3.44,-6.24,4.7,3.1,.06]]){const ot=Se(e,new In(O,H),j,M,.026,I);ot.rotation.set(-Math.PI/2,0,Z),ot.userData.batch=!1}return{colliders:n,notes:r,root:e}}function al(i,t,e,n,r,s){Qt(i,t.oakLight,e,n+.075,r,.067,.067,.15,16),Qt(i,s,e,n+.075,r,.06,.06,.102,20),Qt(i,t.oakLight,e,n+.006,r,.076,.076,.015,20),Qt(i,t.oakLight,e,n+.144,r,.076,.076,.014,20),Qt(i,t.iron,e,n+.154,r,.012,.012,.006,12)}function Pr(i,t,e,n,r,s){const o=[new at(0,0),new at(s*.55,0),new at(s,.047),new at(s,.072),new at(s*.9,.071),new at(s*.62,.012),new at(0,.012)];Se(i,new Xr(o,28),t.gold,e,n,r);for(let a=0;a<9;a++)Zt(i,t.steel,[e+re(-s*.5,s*.5),n+.033,r+re(-s*.4,s*.4)],[e+re(-s*.5,s*.5),n+.034,r+re(-s*.4,s*.4)],.002,5)}function Ds(i,t,e,n,r,s=1){const o=new Le;i.add(o),o.position.set(e,n,r),o.scale.setScalar(s),o.rotation.y=.3;for(const a of[-1,1])Pe(o,t.gold,a*.065,.013,.08,.044,.01,Math.PI/2),Zt(o,t.steel,[a*.035,.014,.04],[-a*.041,.014,-.24],.009,6),pt(o,t.steel,-a*.021,.014,-.123,.027,.006,.23,a*.25);return me(o,t.gold,0,.027,-.033,.015),o}function ll(i,t,e,n,r,s,o){pt(i,t.tealDark,e,n,r,s,.055,o,.09),pt(i,t.paper,e,n+.036,r,s*.94,.04,o*.93,.09),pt(i,t.tealDark,e,n+.062,r,s,.012,o,.09),pt(i,t.gold,e,n+.07,r,s*.6,.003,.02,.09)}function e0(i,t,e,n,r){Qt(i,t.gold,e,n,r,.15,.18,.05,32),Zt(i,t.gold,[e,n,r],[e,n+.6,r],.022),Zt(i,t.gold,[e,n+.6,r],[e-.31,n+.88,r],.021),me(i,t.gold,e,n+.6,r,.05),Qt(i,t.tealDark,e-.31,n+.87,r,.085,.25,.22,32),Qt(i,t.glow,e-.31,n+.754,r,.217,.217,.01,32)}function n0(i,t,e,n,r,s,o,a,c=0){const l=new Le;i.add(l),l.position.set(e,n,r),l.rotation.y=a;const h=new er;h.moveTo(-s*.5,-o*.5),h.lineTo(s*.33,-o*.5),h.quadraticCurveTo(s*.1,-o*.1,s*.5,o*.18),h.lineTo(s*.42,o*.5),h.lineTo(-s*.5,o*.44),h.quadraticCurveTo(-s*.3,0,-s*.5,-o*.5);const f=new qr(h),m=Se(l,f,t.paper);m.rotation.x=-Math.PI/2;const p=h.getPoints(30).map(x=>[x.x,.002,-x.y]);He(l,t.paperEdge,p,.002,!0,40),Zt(l,t.iron,[0,.004,-o*.32],[0,.004,o*.28],.0018,4),Zt(l,t.iron,[0,.004,-o*.32],[-.026,.004,-o*.26],.0018,4),Zt(l,t.iron,[0,.004,-o*.32],[.026,.004,-o*.26],.0018,4);for(let x=0;x<6;x++)pt(l,t.iron,-s*.35,.004,-o*.32+x*o*.11,.018,.001,.003);const g=ke(l,`0${c+1}`,"",-.07,.006,.14,.12,.07,0,{bg:"#decfa8",ink:"#4c554c",width:256,height:128,size:60});return g.rotation.x=-Math.PI/2,l}function i0(){return Dn(512,(i,t)=>{i.fillStyle="#e3d7b5",i.fillRect(0,0,t,t),i.strokeStyle="#49605a",i.lineWidth=2,i.beginPath(),i.moveTo(250,90),i.lineTo(228,125),i.lineTo(200,153),i.lineTo(226,227),i.bezierCurveTo(217,290,177,379,107,433),i.quadraticCurveTo(258,476,399,432),i.bezierCurveTo(317,362,293,281,281,227),i.lineTo(307,153),i.lineTo(277,125),i.lineTo(269,90),i.stroke(),i.beginPath(),i.ellipse(259,74,20,28,0,0,Math.PI*2),i.stroke();for(let e=0;e<9;e++){const n=-Math.PI+e*Math.PI/8;i.beginPath(),i.moveTo(257,179),i.lineTo(257+Math.cos(n)*131,173+Math.sin(n)*110),i.stroke()}for(let e=0;e<7;e++)i.beginPath(),i.moveTo(232+e*7,230),i.lineTo(127+e*41,433),i.stroke();i.font="19px Georgia",i.fillText("Moonwake · VII",30,40),i.font="12px sans-serif",i.fillText("RADIAL COLLAR / HAND COUCHED GOLD",24,492),i.setLineDash([3,4]),i.beginPath(),i.moveTo(355,170),i.lineTo(459,129),i.moveTo(296,274),i.lineTo(446,258),i.stroke()},1)}function r0(i,t,e,n){const r=new Le;r.position.set(2.05,0,-3.63),r.rotation.y=-.17,i.add(r);const s=Qt(r,t.darkWood,0,.065,0,1.43,1.49,.13,96);s.scale.z=1.22;const o=Qt(r,t.oakLight,0,.135,0,1.42,1.43,.016,96);o.scale.z=1.22;const a=Pe(r,t.gold,0,.148,0,1.34,.012,Math.PI/2);a.scale.y=1.22,Qt(r,t.iron,0,.63,0,.033,.05,1.04,20),Qt(r,t.gold,0,.2,0,.17,.22,.07,32);for(let d=0;d<3;d++){const u=d*on/3;Zt(r,t.iron,[0,.31,0],[Math.sin(u)*.39,.17,Math.cos(u)*.39],.023),me(r,t.gold,Math.sin(u)*.39,.16,Math.cos(u)*.39,.037)}const c=[[.13,1.34],[.25,1.44],[.27,1.59],[.25,1.71],[.31,1.87],[.36,2],[.34,2.11],[.27,2.21],[.12,2.24],[.095,2.33]],l=Se(r,new Xr(c.map(([d,u])=>new at(d,u)),48),t.canvas);l.scale.z=.63,Qt(r,t.oakLight,0,2.36,0,.092,.093,.085,24),me(r,t.gold,0,2.425,0,.052,1,.55,1);const h=[[.36,1],[.6,.82],[.88,.63],[1.15,.44],[1.44,.28]];for(const[d,u]of h){const S=[];for(let y=0;y<80;y++){const _=y*on/80;S.push([Math.sin(_)*u,d,Math.cos(_)*u*(Math.cos(_)<0?1.23:.85)])}He(r,t.paleGold,S,.011,!0,80)}for(let d=0;d<10;d++){const u=d*on/10,S=h.map(([y,_])=>[Math.sin(u)*_,y,Math.cos(u)*_*(Math.cos(u)<0?1.23:.85)]);He(r,t.ivory,S,.018,!1,30)}function f(d,u,S=0){const y=1.57-u*1.29,_=.25+.83*Math.pow(u,1.45)+.052*Math.sin(d*19+u*.4)*Math.pow(u,.5)+S,R=Math.max(0,-Math.cos(d));return[Math.sin(d)*_,y-.045*Math.sin(d*5)*u*u,Math.cos(d)*_*(.87+R*.48)]}Ae(r,t.silk,(d,u)=>f(-3.12+d*3.48,u,-.032),64,32),Ae(r,t.silk,(d,u)=>f(1.73+d*1.4,u,-.02),28,32);const m=[[-3.1,-2.62],[-2.6,-2.11],[-2.09,-1.6],[-1.58,-1.09],[-1.07,-.58],[-.56,-.09],[-.07,.28]];for(let d=0;d<m.length;d++){const[u,S]=m[d];Ae(r,t.brocade,(R,C)=>f(u+(S-u)*R,C,.018),14,36);for(const R of[u+.012,S-.012]){const C=[];for(let w=0;w<=38;w++)C.push(f(R,w/38,.026));He(r,t.gold,C,.005,!1,38)}const y=[];for(let R=0;R<=22;R++)y.push(f(u+(S-u)*R/22,.968,.027));He(r,t.paleGold,y,.011,!1,22);const _=(u+S)/2;for(let R=0;R<3;R++){const C=.62+R*.1,w=f(_,C,.032),U=f(_+.023,C-.037,.034);Zt(r,t.gold,w,U,.004,5),me(r,t.paleGold,...w,.016,1,.6,1)}}Ae(r,t.ivory,(d,u)=>{const S=1.8+d*1.23,y=f(S,u,.035);return y[1]+=.018*Math.sin(d*57)*Math.pow(u,14),y},40,32);for(let d=0;d<28;d++){const u=1.81+d*1.21/27,S=f(u,1,.04);Zt(r,t.ivory,S,[S[0]+.006,S[1]-.026-d%3*.012,S[2]+.006],.0015,4)}Ae(r,t.silk,(d,u)=>{const S=.07+u*.9,y=f(.33+d*.48,S,.027);return y[0]+=.13*Math.sin(d*Math.PI)*Math.sin(u*Math.PI),y[2]+=.15*d*Math.sin(u*Math.PI),y},20,30);const p=[];for(let d=0;d<=35;d++){const u=f(.31,d/35,.04);p.push(u)}He(r,t.ivory,p,.009,!1,35);for(let d=0;d<33;d++){const u=f(.32,.025+d*.028,.05),S=f(.32,.037+d*.028,.05);Zt(r,t.ivory,u,S,.004,5)}for(let d=0;d<9;d++){const u=.42+d*.145,S=f(u,.015,.025);Zt(r,t.steel,[S[0],S[1]+.026,S[2]],[S[0]+.018,S[1]-.025,S[2]+.018],.0025,5),me(r,t.silk,S[0],S[1]+.029,S[2],.008)}ke(r,"07 / RIGHT SIDE","BASTE ONLY",.58,1.25,.29,.24,.14,.55,{width:512,height:256,size:50,bg:"#d7c9a5",ink:"#3b4948"}),Zt(r,t.thread,[.32,1.53,.17],[.58,1.31,.29],.0025,5);function g(d,u,S=0){const y=1.52+u*.69,_=.246+.09*Math.sin(u*Math.PI)+.019*u+S;return[Math.sin(d)*_,y,Math.cos(d)*_*.69]}Ae(r,t.brocade,(d,u)=>g(-Math.PI+d*(Math.PI+.32),u,.008),48,30),Ae(r,t.ivory,(d,u)=>g(.35+d*(Math.PI-.36),u,.006),36,30);for(const d of[-2.8,-2.1,-1.4,-.7,0,.6,1.3,2.1,2.8]){const u=[];for(let S=0;S<=28;S++)u.push(g(d,S/28,.019));He(r,d<.33?t.gold:t.paperEdge,u,.004,!1,28)}for(let d=0;d<10;d++){const u=1.61+d*.052;for(const S of[-.047,.047])Pe(r,t.gold,S,u,-.207,.008,.0027);Zt(r,t.thread,[-.045,u,-.219],[.045,u+.045,-.219],.0024,5),Zt(r,t.thread,[.045,u,-.22],[-.045,u+.045,-.22],.0024,5)}Ae(r,t.brocade,(d,u)=>{const S=d*on,y=.16+.045*Math.sin(u*Math.PI*2);return[-.32-u*.24,2.12-u*.38+Math.sin(S)*y,Math.cos(S)*y*.86]},32,24),Ae(r,t.silk,(d,u)=>{const S=d*on;return[-.54-u*.06,1.77+Math.sin(S)*.17,Math.cos(S)*.149]},32,5),Ae(r,t.ivory,(d,u)=>[.29+u*.28,2.14-u*.3+Math.sin(d*Math.PI)*.085,(d-.5)*.34+.015*Math.sin(u*10)],20,15);for(let d=0;d<6;d++)me(r,t.gold,.34+d*.033,2.12-d*.028,.13,.008);for(let d=0;d<13;d++){const u=-Math.PI*.56+d*Math.PI*1.12/12,S=Math.sin(u),y=Math.cos(u),_=.67+.15*Math.cos(u*2),R=[S*.14,2.1,-.135],C=[S*_,2.22+y*_,-.26-Math.abs(S)*.1],w=[C[0],C[1]+.055,C[2]-.025];if(Zt(r,t.gold,R,w,.009,7),me(r,t.paleGold,...w,.02),d<9){Ae(r,d<7?t.blue:t.silk,(b,T)=>{const L=Math.sin(T*Math.PI)*.105+.012*T,z=R[0]+(C[0]-R[0])*T+(b-.5)*L*2,V=R[1]+(C[1]-R[1])*T,J=R[2]+(C[2]-R[2])*T-.055*Math.sin(b*Math.PI)*Math.sin(T*Math.PI);return[z,V,J]},10,20);const U=[];for(let b=0;b<=20;b++){const T=b/20,L=Math.sin(T*Math.PI)*.105+.012*T;U.push([R[0]+(C[0]-R[0])*T+L,R[1]+(C[1]-R[1])*T,R[2]+(C[2]-R[2])*T])}He(r,t.gold,U,.004,!1,20)}}Pe(r,t.gold,-.09,2.08,.233,.065,.012,0,0,-.75,Math.PI*1.6),me(r,t.blue,-.09,2.08,.236,.034,1,1,.45);for(let d=0;d<3;d++){const u=[];for(let S=0;S<=22;S++){const y=S/22;u.push([-.28+y*.47,2.065-d*.051-Math.sin(y*Math.PI)*(.09+d*.017),.175+.078*Math.sin(y*Math.PI)])}He(r,t.gold,u,.0035,!1,24);for(let S=2;S<21;S+=3){const y=u[S];me(r,t.ivory,...y,.009)}}for(let d=0;d<8;d++){const u=.2+d*.091,S=f(-.68,u,.052),y=new er;for(let R=0;R<10;R++){const C=R*Math.PI/5,w=R%2?.011:.034,U=Math.sin(C)*w,b=Math.cos(C)*w;R?y.lineTo(U,b):y.moveTo(U,b)}y.closePath();const _=Se(r,new qr(y),t.gold,...S);_.rotation.y=-.68}Zt(r,t.gold,[-1.17,.17,.91],[-1.17,.84,.91],.016),Qt(r,t.darkWood,-1.17,.17,.91,.14,.16,.025);const x=ke(r,"THE MOONWAKE MANTLE","SILK · GOLDWORK · SPRING STEEL",-1.17,.9,.91,.61,.21,0,{width:1024,height:256,size:48});return x.rotation.x=-.23,e.push({type:"ellipse",x:2.05,z:-3.63,rx:1.57,rz:1.82}),n.push({position:new D(2.05,1.55,-3.63),title:"The Moonwake mantle",body:"A coronation garment for the Sovereign of the Tidal Court. Seven moon-flower gores, a shell-fan collar and hand-couched gold. Circle it to find the open right side and the laced stays.",r:3.45}),n.push({position:new D(2.94,1.14,-3.22),title:"Inside the unfinished side",body:"Spring-steel hoops carry the skirt. Linen tapes suspend them from the waist. Coral silk turns back at the open gore; pale basting and pins hold the toile for one final fitting.",r:2.4}),r}const s0=.24;function cl(i,t,e,n=s0){if(i<-6.64||i>6.64||t<-8.64||t>7.61)return!1;for(const r of e)if(r.type==="box"){const s=Math.max(r.x-r.w/2,Math.min(i,r.x+r.w/2)),o=Math.max(r.z-r.d/2,Math.min(t,r.z+r.d/2));if((s-i)**2+(o-t)**2<n*n)return!1}else if(r.type==="ellipse"&&((i-r.x)/(r.rx+n))**2+((t-r.z)/(r.rz+n))**2<1)return!1;return!0}function o0(i,t,e){const n=new Set,r=new at;let s=.82,o=-.045,a=!1,c=!1,l=!1,h=!1,f=.00165;const m=document.querySelector("#welcome"),p=document.querySelector("#pause");i.rotation.order="YXZ";const g=()=>{i.rotation.set(o,s,0,"YXZ")};function x(){i.position.set(2.05,1.68,6.9),s=.82,o=-.045,r.set(0,0),n.clear(),g()}function d(){a=!1,n.clear(),r.set(0,0)}function u(){d(),h&&(p.hidden=!1)}function S(){h=!0,m.hidden=!0,p.hidden=!0,a=!0;try{const _=t.requestPointerLock?.();_?.catch&&_.catch(()=>{a=!0})}catch{a=!0}}document.querySelector("#enter").addEventListener("click",S),document.querySelector("#resume").addEventListener("click",S),document.querySelector("#settings-button").addEventListener("click",()=>{document.pointerLockElement&&document.exitPointerLock(),u()}),document.querySelector("#reset-button").addEventListener("click",()=>{x(),S()}),document.querySelector("#sensitivity").addEventListener("input",_=>f=.00183*Number(_.target.value)),document.addEventListener("pointerlockchange",()=>{c=document.pointerLockElement===t,c?(a=!0,p.hidden=!0):h&&u()}),document.addEventListener("pointerlockerror",()=>{a=!0,p.hidden=!0}),window.addEventListener("keydown",_=>{if(!["INPUT","SELECT"].includes(document.activeElement?.tagName)){if(_.code==="KeyR"){x(),_.preventDefault();return}if(_.code==="Escape"&&!c){u();return}["KeyW","KeyA","KeyS","KeyD","ArrowUp","ArrowDown","ArrowLeft","ArrowRight","ShiftLeft","ShiftRight","KeyQ","KeyE"].includes(_.code)&&(_.preventDefault(),a&&n.add(_.code))}}),window.addEventListener("keyup",_=>n.delete(_.code)),window.addEventListener("blur",()=>{n.clear(),r.set(0,0),h&&(document.pointerLockElement&&document.exitPointerLock(),u())}),document.addEventListener("visibilitychange",()=>{document.hidden&&(n.clear(),r.set(0,0))}),t.addEventListener("pointerdown",_=>{a&&(c||(l=!0,t.setPointerCapture?.(_.pointerId)))}),window.addEventListener("pointerup",()=>l=!1),window.addEventListener("mousemove",_=>{!a||!c&&!l||(s-=_.movementX*f,o=Math.max(-1.22,Math.min(1.25,o-_.movementY*f)),g())});function y(_){if(!a)return;_=Math.min(_,.045),n.has("KeyQ")&&(s+=_*1.4),n.has("KeyE")&&(s-=_*1.4);const R=(n.has("KeyW")||n.has("ArrowUp")?1:0)-(n.has("KeyS")||n.has("ArrowDown")?1:0),C=(n.has("KeyD")||n.has("ArrowRight")?1:0)-(n.has("KeyA")||n.has("ArrowLeft")?1:0),w=n.has("ShiftLeft")||n.has("ShiftRight")?3.2:1.85,U=Math.hypot(R,C)||1,b=(C*Math.cos(s)-R*Math.sin(s))*w/U,T=(-R*Math.cos(s)-C*Math.sin(s))*w/U,L=1-Math.exp(-_*15);r.x+=(b-r.x)*L,r.y+=(T-r.y)*L;const z=r.x*_,V=r.y*_,J=Math.max(1,Math.ceil(Math.hypot(z,V)/.075));for(let j=0;j<J;j++)cl(i.position.x+z/J,i.position.z,e)&&(i.position.x+=z/J),cl(i.position.x,i.position.z+V/J,e)&&(i.position.z+=V/J);const X=1.68+(Math.hypot(i.position.x+3.05,i.position.z-4.72)<1.48?.16:0);i.position.y+=(X-i.position.y)*(1-Math.exp(-_*13)),g()}return x(),{update:y,reset:x,get active(){return a}}}const Us=document.querySelector("#scene");try{let u=function(){const X=d==="high"?1.75:d==="low"?1:1.25;i.setPixelRatio(Math.min(devicePixelRatio,X)),i.setSize(innerWidth,innerHeight),e.aspect=innerWidth/innerHeight,e.updateProjectionMatrix(),i.shadowMap.needsUpdate=!0},V=function(X){if(z+=X,z<.1)return;z=0;const j=e.position,M=j.z>1.7?0:j.x<-1.4?1:2;M!==C&&(S.textContent=R[M][0],y.textContent=R[M][1],_.textContent=R[M][2],C=M);const I=4+(j.x+7)/14*132,O=4+(j.z+9)/17*162;U.setAttribute("transform",`translate(${I.toFixed(1)} ${O.toFixed(1)}) rotate(${(-e.rotation.y*180/Math.PI).toFixed(1)})`),e.getWorldDirection(T);let H=null,Z=1/0;if(x.active&&document.querySelector("#show-notes").checked)for(const ot of p){L.copy(ot.position).sub(j);const gt=L.length();if(gt>ot.r||gt<.01)continue;const ct=L.multiplyScalar(1/gt).dot(T);if(ct<.75)continue;const G=gt*.4+(1-ct)*3;G<Z&&(H=ot,Z=G)}H!==w&&(b.hidden=!H,H&&(b.querySelector("h2").textContent=H.title,b.querySelector("p").textContent=H.body),w=H)},Y=function(X){const j=Math.min((X-J)/1e3,.05);J=X,document.hidden||(x.update(j),V(j),i.render(t,e)),requestAnimationFrame(Y)};var a0=u,l0=V,c0=Y;const i=new qm({canvas:Us,antialias:!0,powerPreference:"high-performance",alpha:!1});i.outputColorSpace=Ie,i.toneMapping=fl,i.toneMappingExposure=1.04,i.shadowMap.enabled=!0,i.shadowMap.type=ul,i.shadowMap.autoUpdate=!1;const t=new Ll;t.background=new qt("#bed1cf");const e=new Ge(66,innerWidth/innerHeight,.065,65),n=Jm();n.plaster.userData.noShadow=!0,n.ceiling.userData.noShadow=!0;const r=new Ym,s=new Ao(i),o=s.fromScene(r,.04);t.environment=o.texture,t.environmentIntensity=.32,r.dispose(),s.dispose(),t.add(new su("#cfebf3","#858267",1.35));const a=new Na("#d6ecff",3);a.position.set(-7,8,1),a.target.position.set(1,0,-2.5),a.castShadow=!0,a.shadow.mapSize.set(2048,2048),a.shadow.camera.left=-12,a.shadow.camera.right=12,a.shadow.camera.top=13,a.shadow.camera.bottom=-12,a.shadow.camera.near=.5,a.shadow.camera.far=30,a.shadow.bias=-35e-5,a.shadow.normalBias=.025,a.shadow.radius=2.5,t.add(a,a.target);const c=new Na("#c0e7ed",1.05);c.position.set(4,3,-10),c.target.position.set(2,1,-3),t.add(c,c.target);const l=new Nr("#ffc87a",33,8,2);l.position.set(2,3.13,-3.65),t.add(l);const h=new Nr("#ffce87",19,4.6,2);h.position.set(4.93,1.83,-7.35),t.add(h);const f=new Nr("#ffe0ac",13,6,2);f.position.set(-3.05,3.12,4.7),t.add(f);const{colliders:m,notes:p}=t0(t,n);r0(t,n,m,p);const g=Qm(t);i.shadowMap.needsUpdate=!0;const x=o0(e,Us,m);let d="balanced";document.querySelector("#quality").addEventListener("change",X=>{d=X.target.value,i.shadowMap.enabled=d!=="low",i.shadowMap.needsUpdate=!0,u()}),window.addEventListener("resize",u),u();const S=document.querySelector("#room-index"),y=document.querySelector("#room-title"),_=document.querySelector("#room-description"),R=[["01 / FITTING ROOM","A commission for the moon.","A quiet threshold, before the extraordinary."],["02 / THE CLOTH ARCHIVE","A library written in cloth.","Silk, brocade, linen. A different promise in every fold."],["03 / THE WORKROOM","The last unfinished seam.","Circle the mantle. The reverse tells another story."]];let C=-1,w=null;const U=document.querySelector("#map-player"),b=document.querySelector("#inspection");document.querySelector("#show-map").addEventListener("change",X=>document.querySelector("#map").hidden=!X.target.checked);const T=new D,L=new D;let z=0,J=performance.now();requestAnimationFrame(Y),window.atelier={name:"SELENE — The Moonwake Commission",geometry:g,reset:()=>x.reset(),get position(){return e.position.toArray()}},Us.addEventListener("webglcontextlost",X=>{X.preventDefault();const j=document.querySelector("#error");j.hidden=!1,j.textContent="The graphics context was interrupted. Reload this page to re-enter the atelier."})}catch(i){const t=document.querySelector("#error");t.hidden=!1,t.textContent=`The atelier could not start. A desktop browser with WebGL 2 is required. ${i.message}`,console.error(i)}

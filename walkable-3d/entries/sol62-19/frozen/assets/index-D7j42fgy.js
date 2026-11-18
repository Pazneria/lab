(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=e(r);fetch(r.href,s)}})();/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Uo="179",Pl=0,ha=1,Ll=2,Ac=1,Dl=2,dn=3,Rn=0,Re=1,Le=2,An=0,pi=1,zs=2,fa=3,da=4,Il=5,Hn=100,Ul=101,Nl=102,Fl=103,Ol=104,Bl=200,zl=201,kl=202,Hl=203,ks=204,Hs=205,Vl=206,Gl=207,Wl=208,Xl=209,ql=210,Yl=211,Zl=212,Jl=213,Kl=214,Vs=0,Gs=1,Ws=2,_i=3,Xs=4,qs=5,Ys=6,Zs=7,wc=0,$l=1,jl=2,wn=0,Ql=1,tu=2,eu=3,Rc=4,nu=5,iu=6,ru=7,Cc=300,vi=301,xi=302,zr=303,Js=304,qr=306,Wi=1e3,Gn=1001,Ks=1002,Be=1003,su=1004,sr=1005,$e=1006,ts=1007,Wn=1008,rn=1009,Pc=1010,Lc=1011,Xi=1012,No=1013,Xn=1014,mn=1015,Qi=1016,Fo=1017,Oo=1018,qi=1020,Dc=35902,Ic=1021,Uc=1022,Ge=1023,Yi=1026,Zi=1027,Nc=1028,Bo=1029,Fc=1030,zo=1031,ko=1033,Dr=33776,Ir=33777,Ur=33778,Nr=33779,$s=35840,js=35841,Qs=35842,to=35843,eo=36196,no=37492,io=37496,ro=37808,so=37809,oo=37810,ao=37811,co=37812,lo=37813,uo=37814,ho=37815,fo=37816,po=37817,mo=37818,go=37819,_o=37820,vo=37821,Fr=36492,xo=36494,Mo=36495,Oc=36283,So=36284,yo=36285,Eo=36286,ou=3200,au=3201,Bc=0,cu=1,pn="",we="srgb",Mi="srgb-linear",kr="linear",ne="srgb",jn=7680,pa=519,lu=512,uu=513,hu=514,zc=515,fu=516,du=517,pu=518,mu=519,ma=35044,ga="300 es",nn=2e3,Hr=2001;class Ti{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const r=n[t];if(r!==void 0){const s=r.indexOf(e);s!==-1&&r.splice(s,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const r=n.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,t);t.target=null}}}const Me=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let _a=1234567;const ki=Math.PI/180,Si=180/Math.PI;function Kn(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Me[i&255]+Me[i>>8&255]+Me[i>>16&255]+Me[i>>24&255]+"-"+Me[t&255]+Me[t>>8&255]+"-"+Me[t>>16&15|64]+Me[t>>24&255]+"-"+Me[e&63|128]+Me[e>>8&255]+"-"+Me[e>>16&255]+Me[e>>24&255]+Me[n&255]+Me[n>>8&255]+Me[n>>16&255]+Me[n>>24&255]).toLowerCase()}function Kt(i,t,e){return Math.max(t,Math.min(e,i))}function Ho(i,t){return(i%t+t)%t}function gu(i,t,e,n,r){return n+(i-t)*(r-n)/(e-t)}function _u(i,t,e){return i!==t?(e-i)/(t-i):0}function Hi(i,t,e){return(1-e)*i+e*t}function vu(i,t,e,n){return Hi(i,t,1-Math.exp(-e*n))}function xu(i,t=1){return t-Math.abs(Ho(i,t*2)-t)}function Mu(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function Su(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function yu(i,t){return i+Math.floor(Math.random()*(t-i+1))}function Eu(i,t){return i+Math.random()*(t-i)}function bu(i){return i*(.5-Math.random())}function Tu(i){i!==void 0&&(_a=i);let t=_a+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Au(i){return i*ki}function wu(i){return i*Si}function Ru(i){return(i&i-1)===0&&i!==0}function Cu(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Pu(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Lu(i,t,e,n,r){const s=Math.cos,o=Math.sin,a=s(e/2),l=o(e/2),c=s((t+n)/2),u=o((t+n)/2),h=s((t-n)/2),f=o((t-n)/2),d=s((n-t)/2),g=o((n-t)/2);switch(r){case"XYX":i.set(a*u,l*h,l*f,a*c);break;case"YZY":i.set(l*f,a*u,l*h,a*c);break;case"ZXZ":i.set(l*h,l*f,a*u,a*c);break;case"XZX":i.set(a*u,l*g,l*d,a*c);break;case"YXY":i.set(l*d,a*u,l*g,a*c);break;case"ZYZ":i.set(l*g,l*d,a*u,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function fi(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Te(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const kc={DEG2RAD:ki,RAD2DEG:Si,generateUUID:Kn,clamp:Kt,euclideanModulo:Ho,mapLinear:gu,inverseLerp:_u,lerp:Hi,damp:vu,pingpong:xu,smoothstep:Mu,smootherstep:Su,randInt:yu,randFloat:Eu,randFloatSpread:bu,seededRandom:Tu,degToRad:Au,radToDeg:wu,isPowerOfTwo:Ru,ceilPowerOfTwo:Cu,floorPowerOfTwo:Pu,setQuaternionFromProperEuler:Lu,normalize:Te,denormalize:fi};class lt{constructor(t=0,e=0){lt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6],this.y=r[1]*e+r[4]*n+r[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Kt(this.x,t.x,e.x),this.y=Kt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Kt(this.x,t,e),this.y=Kt(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Kt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Kt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),r=Math.sin(e),s=this.x-t.x,o=this.y-t.y;return this.x=s*n-o*r+t.x,this.y=s*r+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class tr{constructor(t=0,e=0,n=0,r=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=r}static slerpFlat(t,e,n,r,s,o,a){let l=n[r+0],c=n[r+1],u=n[r+2],h=n[r+3];const f=s[o+0],d=s[o+1],g=s[o+2],_=s[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=u,t[e+3]=h;return}if(a===1){t[e+0]=f,t[e+1]=d,t[e+2]=g,t[e+3]=_;return}if(h!==_||l!==f||c!==d||u!==g){let m=1-a;const p=l*f+c*d+u*g+h*_,M=p>=0?1:-1,x=1-p*p;if(x>Number.EPSILON){const A=Math.sqrt(x),w=Math.atan2(A,p*M);m=Math.sin(m*w)/A,a=Math.sin(a*w)/A}const v=a*M;if(l=l*m+f*v,c=c*m+d*v,u=u*m+g*v,h=h*m+_*v,m===1-a){const A=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=A,c*=A,u*=A,h*=A}}t[e]=l,t[e+1]=c,t[e+2]=u,t[e+3]=h}static multiplyQuaternionsFlat(t,e,n,r,s,o){const a=n[r],l=n[r+1],c=n[r+2],u=n[r+3],h=s[o],f=s[o+1],d=s[o+2],g=s[o+3];return t[e]=a*g+u*h+l*d-c*f,t[e+1]=l*g+u*f+c*h-a*d,t[e+2]=c*g+u*d+a*f-l*h,t[e+3]=u*g-a*h-l*f-c*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,r){return this._x=t,this._y=e,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,r=t._y,s=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),u=a(r/2),h=a(s/2),f=l(n/2),d=l(r/2),g=l(s/2);switch(o){case"XYZ":this._x=f*u*h+c*d*g,this._y=c*d*h-f*u*g,this._z=c*u*g+f*d*h,this._w=c*u*h-f*d*g;break;case"YXZ":this._x=f*u*h+c*d*g,this._y=c*d*h-f*u*g,this._z=c*u*g-f*d*h,this._w=c*u*h+f*d*g;break;case"ZXY":this._x=f*u*h-c*d*g,this._y=c*d*h+f*u*g,this._z=c*u*g+f*d*h,this._w=c*u*h-f*d*g;break;case"ZYX":this._x=f*u*h-c*d*g,this._y=c*d*h+f*u*g,this._z=c*u*g-f*d*h,this._w=c*u*h+f*d*g;break;case"YZX":this._x=f*u*h+c*d*g,this._y=c*d*h+f*u*g,this._z=c*u*g-f*d*h,this._w=c*u*h-f*d*g;break;case"XZY":this._x=f*u*h-c*d*g,this._y=c*d*h-f*u*g,this._z=c*u*g+f*d*h,this._w=c*u*h+f*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,r=Math.sin(n);return this._x=t.x*r,this._y=t.y*r,this._z=t.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],r=e[4],s=e[8],o=e[1],a=e[5],l=e[9],c=e[2],u=e[6],h=e[10],f=n+a+h;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(u-l)*d,this._y=(s-c)*d,this._z=(o-r)*d}else if(n>a&&n>h){const d=2*Math.sqrt(1+n-a-h);this._w=(u-l)/d,this._x=.25*d,this._y=(r+o)/d,this._z=(s+c)/d}else if(a>h){const d=2*Math.sqrt(1+a-n-h);this._w=(s-c)/d,this._x=(r+o)/d,this._y=.25*d,this._z=(l+u)/d}else{const d=2*Math.sqrt(1+h-n-a);this._w=(o-r)/d,this._x=(s+c)/d,this._y=(l+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Kt(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const r=Math.min(1,e/n);return this.slerp(t,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,r=t._y,s=t._z,o=t._w,a=e._x,l=e._y,c=e._z,u=e._w;return this._x=n*u+o*a+r*c-s*l,this._y=r*u+o*l+s*a-n*c,this._z=s*u+o*c+n*l-r*a,this._w=o*u-n*a-r*l-s*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,r=this._y,s=this._z,o=this._w;let a=o*t._w+n*t._x+r*t._y+s*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=r,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const d=1-e;return this._w=d*o+e*this._w,this._x=d*n+e*this._x,this._y=d*r+e*this._y,this._z=d*s+e*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),h=Math.sin((1-e)*u)/c,f=Math.sin(e*u)/c;return this._w=o*h+this._w*f,this._x=n*h+this._x*f,this._y=r*h+this._y*f,this._z=s*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(t),r*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class D{constructor(t=0,e=0,n=0){D.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(va.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(va.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6]*r,this.y=s[1]*e+s[4]*n+s[7]*r,this.z=s[2]*e+s[5]*n+s[8]*r,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,r=this.z,s=t.elements,o=1/(s[3]*e+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*e+s[4]*n+s[8]*r+s[12])*o,this.y=(s[1]*e+s[5]*n+s[9]*r+s[13])*o,this.z=(s[2]*e+s[6]*n+s[10]*r+s[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,r=this.z,s=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*r-a*n),u=2*(a*e-s*r),h=2*(s*n-o*e);return this.x=e+l*c+o*h-a*u,this.y=n+l*u+a*c-s*h,this.z=r+l*h+s*u-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*r,this.y=s[1]*e+s[5]*n+s[9]*r,this.z=s[2]*e+s[6]*n+s[10]*r,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Kt(this.x,t.x,e.x),this.y=Kt(this.y,t.y,e.y),this.z=Kt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Kt(this.x,t,e),this.y=Kt(this.y,t,e),this.z=Kt(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Kt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,r=t.y,s=t.z,o=e.x,a=e.y,l=e.z;return this.x=r*l-s*a,this.y=s*o-n*l,this.z=n*a-r*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return es.copy(this).projectOnVector(t),this.sub(es)}reflect(t){return this.sub(es.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Kt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,r=this.z-t.z;return e*e+n*n+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const r=Math.sin(e)*t;return this.x=r*Math.sin(n),this.y=Math.cos(e)*t,this.z=r*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),r=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=r,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const es=new D,va=new tr;class Yt{constructor(t,e,n,r,s,o,a,l,c){Yt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,r,s,o,a,l,c)}set(t,e,n,r,s,o,a,l,c){const u=this.elements;return u[0]=t,u[1]=r,u[2]=a,u[3]=e,u[4]=s,u[5]=l,u[6]=n,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,r=e.elements,s=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],u=n[4],h=n[7],f=n[2],d=n[5],g=n[8],_=r[0],m=r[3],p=r[6],M=r[1],x=r[4],v=r[7],A=r[2],w=r[5],b=r[8];return s[0]=o*_+a*M+l*A,s[3]=o*m+a*x+l*w,s[6]=o*p+a*v+l*b,s[1]=c*_+u*M+h*A,s[4]=c*m+u*x+h*w,s[7]=c*p+u*v+h*b,s[2]=f*_+d*M+g*A,s[5]=f*m+d*x+g*w,s[8]=f*p+d*v+g*b,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],r=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8];return e*o*u-e*a*c-n*s*u+n*a*l+r*s*c-r*o*l}invert(){const t=this.elements,e=t[0],n=t[1],r=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8],h=u*o-a*c,f=a*l-u*s,d=c*s-o*l,g=e*h+n*f+r*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=h*_,t[1]=(r*c-u*n)*_,t[2]=(a*n-r*o)*_,t[3]=f*_,t[4]=(u*e-r*l)*_,t[5]=(r*s-a*e)*_,t[6]=d*_,t[7]=(n*l-c*e)*_,t[8]=(o*e-n*s)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,r,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-r*c,r*l,-r*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(ns.makeScale(t,e)),this}rotate(t){return this.premultiply(ns.makeRotation(-t)),this}translate(t,e){return this.premultiply(ns.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let r=0;r<9;r++)if(e[r]!==n[r])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const ns=new Yt;function Hc(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Vr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Du(){const i=Vr("canvas");return i.style.display="block",i}const xa={};function mi(i){i in xa||(xa[i]=!0,console.warn(i))}function Iu(i,t,e){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:n()}}setTimeout(s,e)})}const Ma=new Yt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Sa=new Yt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Uu(){const i={enabled:!0,workingColorSpace:Mi,spaces:{},convert:function(r,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===ne&&(r.r=_n(r.r),r.g=_n(r.g),r.b=_n(r.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===ne&&(r.r=gi(r.r),r.g=gi(r.g),r.b=gi(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===pn?kr:this.spaces[r].transfer},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,o){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return mi("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return mi("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(r,s)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Mi]:{primaries:t,whitePoint:n,transfer:kr,toXYZ:Ma,fromXYZ:Sa,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:we},outputColorSpaceConfig:{drawingBufferColorSpace:we}},[we]:{primaries:t,whitePoint:n,transfer:ne,toXYZ:Ma,fromXYZ:Sa,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:we}}}),i}const Qt=Uu();function _n(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function gi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Qn;class Nu{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Qn===void 0&&(Qn=Vr("canvas")),Qn.width=t.width,Qn.height=t.height;const r=Qn.getContext("2d");t instanceof ImageData?r.putImageData(t,0,0):r.drawImage(t,0,0,t.width,t.height),n=Qn}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Vr("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const r=n.getImageData(0,0,t.width,t.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=_n(s[o]/255)*255;return n.putImageData(r,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(_n(e[n]/255)*255):e[n]=_n(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Fu=0;class Vo{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Fu++}),this.uuid=Kn(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(is(r[o].image)):s.push(is(r[o]))}else s=is(r);n.url=s}return e||(t.images[this.uuid]=n),n}}function is(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Nu.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Ou=0;const rs=new D;class ye extends Ti{constructor(t=ye.DEFAULT_IMAGE,e=ye.DEFAULT_MAPPING,n=Gn,r=Gn,s=$e,o=Wn,a=Ge,l=rn,c=ye.DEFAULT_ANISOTROPY,u=pn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Ou++}),this.uuid=Kn(),this.name="",this.source=new Vo(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new lt(0,0),this.repeat=new lt(1,1),this.center=new lt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Yt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(rs).x}get height(){return this.source.getSize(rs).y}get depth(){return this.source.getSize(rs).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const r=this[e];if(r===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Cc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Wi:t.x=t.x-Math.floor(t.x);break;case Gn:t.x=t.x<0?0:1;break;case Ks:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Wi:t.y=t.y-Math.floor(t.y);break;case Gn:t.y=t.y<0?0:1;break;case Ks:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}ye.DEFAULT_IMAGE=null;ye.DEFAULT_MAPPING=Cc;ye.DEFAULT_ANISOTROPY=1;class ie{constructor(t=0,e=0,n=0,r=1){ie.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=r}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,r){return this.x=t,this.y=e,this.z=n,this.w=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,r=this.z,s=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*r+o[12]*s,this.y=o[1]*e+o[5]*n+o[9]*r+o[13]*s,this.z=o[2]*e+o[6]*n+o[10]*r+o[14]*s,this.w=o[3]*e+o[7]*n+o[11]*r+o[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,r,s;const l=t.elements,c=l[0],u=l[4],h=l[8],f=l[1],d=l[5],g=l[9],_=l[2],m=l[6],p=l[10];if(Math.abs(u-f)<.01&&Math.abs(h-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+d+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const x=(c+1)/2,v=(d+1)/2,A=(p+1)/2,w=(u+f)/4,b=(h+_)/4,R=(g+m)/4;return x>v&&x>A?x<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(x),r=w/n,s=b/n):v>A?v<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(v),n=w/r,s=R/r):A<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(A),n=b/s,r=R/s),this.set(n,r,s,e),this}let M=Math.sqrt((m-g)*(m-g)+(h-_)*(h-_)+(f-u)*(f-u));return Math.abs(M)<.001&&(M=1),this.x=(m-g)/M,this.y=(h-_)/M,this.z=(f-u)/M,this.w=Math.acos((c+d+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Kt(this.x,t.x,e.x),this.y=Kt(this.y,t.y,e.y),this.z=Kt(this.z,t.z,e.z),this.w=Kt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Kt(this.x,t,e),this.y=Kt(this.y,t,e),this.z=Kt(this.z,t,e),this.w=Kt(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Kt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Bu extends Ti{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:$e,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new ie(0,0,t,e),this.scissorTest=!1,this.viewport=new ie(0,0,t,e);const r={width:t,height:e,depth:n.depth},s=new ye(r);this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(t={}){const e={minFilter:$e,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=t,this.textures[r].image.height=e,this.textures[r].image.depth=n,this.textures[r].isArrayTexture=this.textures[r].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const r=Object.assign({},t.textures[e].image);this.textures[e].source=new Vo(r)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class qn extends Bu{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Vc extends ye{constructor(t=null,e=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:r},this.magFilter=Be,this.minFilter=Be,this.wrapR=Gn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class zu extends ye{constructor(t=null,e=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:r},this.magFilter=Be,this.minFilter=Be,this.wrapR=Gn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class er{constructor(t=new D(1/0,1/0,1/0),e=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Ye.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Ye.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Ye.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const s=n.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Ye):Ye.fromBufferAttribute(s,o),Ye.applyMatrix4(t.matrixWorld),this.expandByPoint(Ye);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),or.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),or.copy(n.boundingBox)),or.applyMatrix4(t.matrixWorld),this.union(or)}const r=t.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Ye),Ye.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Ci),ar.subVectors(this.max,Ci),ti.subVectors(t.a,Ci),ei.subVectors(t.b,Ci),ni.subVectors(t.c,Ci),xn.subVectors(ei,ti),Mn.subVectors(ni,ei),Dn.subVectors(ti,ni);let e=[0,-xn.z,xn.y,0,-Mn.z,Mn.y,0,-Dn.z,Dn.y,xn.z,0,-xn.x,Mn.z,0,-Mn.x,Dn.z,0,-Dn.x,-xn.y,xn.x,0,-Mn.y,Mn.x,0,-Dn.y,Dn.x,0];return!ss(e,ti,ei,ni,ar)||(e=[1,0,0,0,1,0,0,0,1],!ss(e,ti,ei,ni,ar))?!1:(cr.crossVectors(xn,Mn),e=[cr.x,cr.y,cr.z],ss(e,ti,ei,ni,ar))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Ye).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Ye).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(cn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),cn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),cn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),cn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),cn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),cn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),cn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),cn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(cn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const cn=[new D,new D,new D,new D,new D,new D,new D,new D],Ye=new D,or=new er,ti=new D,ei=new D,ni=new D,xn=new D,Mn=new D,Dn=new D,Ci=new D,ar=new D,cr=new D,In=new D;function ss(i,t,e,n,r){for(let s=0,o=i.length-3;s<=o;s+=3){In.fromArray(i,s);const a=r.x*Math.abs(In.x)+r.y*Math.abs(In.y)+r.z*Math.abs(In.z),l=t.dot(In),c=e.dot(In),u=n.dot(In);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const ku=new er,Pi=new D,os=new D;class Yr{constructor(t=new D,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):ku.setFromPoints(t).getCenter(n);let r=0;for(let s=0,o=t.length;s<o;s++)r=Math.max(r,n.distanceToSquared(t[s]));return this.radius=Math.sqrt(r),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Pi.subVectors(t,this.center);const e=Pi.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),r=(n-this.radius)*.5;this.center.addScaledVector(Pi,r/n),this.radius+=r}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(os.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Pi.copy(t.center).add(os)),this.expandByPoint(Pi.copy(t.center).sub(os))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}const ln=new D,as=new D,lr=new D,Sn=new D,cs=new D,ur=new D,ls=new D;class Gc{constructor(t=new D,e=new D(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,ln)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=ln.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(ln.copy(this.origin).addScaledVector(this.direction,e),ln.distanceToSquared(t))}distanceSqToSegment(t,e,n,r){as.copy(t).add(e).multiplyScalar(.5),lr.copy(e).sub(t).normalize(),Sn.copy(this.origin).sub(as);const s=t.distanceTo(e)*.5,o=-this.direction.dot(lr),a=Sn.dot(this.direction),l=-Sn.dot(lr),c=Sn.lengthSq(),u=Math.abs(1-o*o);let h,f,d,g;if(u>0)if(h=o*l-a,f=o*a-l,g=s*u,h>=0)if(f>=-g)if(f<=g){const _=1/u;h*=_,f*=_,d=h*(h+o*f+2*a)+f*(o*h+f+2*l)+c}else f=s,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*l)+c;else f=-s,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*l)+c;else f<=-g?(h=Math.max(0,-(-o*s+a)),f=h>0?-s:Math.min(Math.max(-s,-l),s),d=-h*h+f*(f+2*l)+c):f<=g?(h=0,f=Math.min(Math.max(-s,-l),s),d=f*(f+2*l)+c):(h=Math.max(0,-(o*s+a)),f=h>0?s:Math.min(Math.max(-s,-l),s),d=-h*h+f*(f+2*l)+c);else f=o>0?-s:s,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(as).addScaledVector(lr,f),d}intersectSphere(t,e){ln.subVectors(t.center,this.origin);const n=ln.dot(this.direction),r=ln.dot(ln)-n*n,s=t.radius*t.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,r,s,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return c>=0?(n=(t.min.x-f.x)*c,r=(t.max.x-f.x)*c):(n=(t.max.x-f.x)*c,r=(t.min.x-f.x)*c),u>=0?(s=(t.min.y-f.y)*u,o=(t.max.y-f.y)*u):(s=(t.max.y-f.y)*u,o=(t.min.y-f.y)*u),n>o||s>r||((s>n||isNaN(n))&&(n=s),(o<r||isNaN(r))&&(r=o),h>=0?(a=(t.min.z-f.z)*h,l=(t.max.z-f.z)*h):(a=(t.max.z-f.z)*h,l=(t.min.z-f.z)*h),n>l||a>r)||((a>n||n!==n)&&(n=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(n>=0?n:r,e)}intersectsBox(t){return this.intersectBox(t,ln)!==null}intersectTriangle(t,e,n,r,s){cs.subVectors(e,t),ur.subVectors(n,t),ls.crossVectors(cs,ur);let o=this.direction.dot(ls),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Sn.subVectors(this.origin,t);const l=a*this.direction.dot(ur.crossVectors(Sn,ur));if(l<0)return null;const c=a*this.direction.dot(cs.cross(Sn));if(c<0||l+c>o)return null;const u=-a*Sn.dot(ls);return u<0?null:this.at(u/o,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ae{constructor(t,e,n,r,s,o,a,l,c,u,h,f,d,g,_,m){ae.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,r,s,o,a,l,c,u,h,f,d,g,_,m)}set(t,e,n,r,s,o,a,l,c,u,h,f,d,g,_,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=r,p[1]=s,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=u,p[10]=h,p[14]=f,p[3]=d,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ae().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,r=1/ii.setFromMatrixColumn(t,0).length(),s=1/ii.setFromMatrixColumn(t,1).length(),o=1/ii.setFromMatrixColumn(t,2).length();return e[0]=n[0]*r,e[1]=n[1]*r,e[2]=n[2]*r,e[3]=0,e[4]=n[4]*s,e[5]=n[5]*s,e[6]=n[6]*s,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,r=t.y,s=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),h=Math.sin(s);if(t.order==="XYZ"){const f=o*u,d=o*h,g=a*u,_=a*h;e[0]=l*u,e[4]=-l*h,e[8]=c,e[1]=d+g*c,e[5]=f-_*c,e[9]=-a*l,e[2]=_-f*c,e[6]=g+d*c,e[10]=o*l}else if(t.order==="YXZ"){const f=l*u,d=l*h,g=c*u,_=c*h;e[0]=f+_*a,e[4]=g*a-d,e[8]=o*c,e[1]=o*h,e[5]=o*u,e[9]=-a,e[2]=d*a-g,e[6]=_+f*a,e[10]=o*l}else if(t.order==="ZXY"){const f=l*u,d=l*h,g=c*u,_=c*h;e[0]=f-_*a,e[4]=-o*h,e[8]=g+d*a,e[1]=d+g*a,e[5]=o*u,e[9]=_-f*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const f=o*u,d=o*h,g=a*u,_=a*h;e[0]=l*u,e[4]=g*c-d,e[8]=f*c+_,e[1]=l*h,e[5]=_*c+f,e[9]=d*c-g,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const f=o*l,d=o*c,g=a*l,_=a*c;e[0]=l*u,e[4]=_-f*h,e[8]=g*h+d,e[1]=h,e[5]=o*u,e[9]=-a*u,e[2]=-c*u,e[6]=d*h+g,e[10]=f-_*h}else if(t.order==="XZY"){const f=o*l,d=o*c,g=a*l,_=a*c;e[0]=l*u,e[4]=-h,e[8]=c*u,e[1]=f*h+_,e[5]=o*u,e[9]=d*h-g,e[2]=g*h-d,e[6]=a*u,e[10]=_*h+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Hu,t,Vu)}lookAt(t,e,n){const r=this.elements;return Ne.subVectors(t,e),Ne.lengthSq()===0&&(Ne.z=1),Ne.normalize(),yn.crossVectors(n,Ne),yn.lengthSq()===0&&(Math.abs(n.z)===1?Ne.x+=1e-4:Ne.z+=1e-4,Ne.normalize(),yn.crossVectors(n,Ne)),yn.normalize(),hr.crossVectors(Ne,yn),r[0]=yn.x,r[4]=hr.x,r[8]=Ne.x,r[1]=yn.y,r[5]=hr.y,r[9]=Ne.y,r[2]=yn.z,r[6]=hr.z,r[10]=Ne.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,r=e.elements,s=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],u=n[1],h=n[5],f=n[9],d=n[13],g=n[2],_=n[6],m=n[10],p=n[14],M=n[3],x=n[7],v=n[11],A=n[15],w=r[0],b=r[4],R=r[8],y=r[12],E=r[1],P=r[5],z=r[9],V=r[13],U=r[2],k=r[6],H=r[10],J=r[14],G=r[3],X=r[7],K=r[11],j=r[15];return s[0]=o*w+a*E+l*U+c*G,s[4]=o*b+a*P+l*k+c*X,s[8]=o*R+a*z+l*H+c*K,s[12]=o*y+a*V+l*J+c*j,s[1]=u*w+h*E+f*U+d*G,s[5]=u*b+h*P+f*k+d*X,s[9]=u*R+h*z+f*H+d*K,s[13]=u*y+h*V+f*J+d*j,s[2]=g*w+_*E+m*U+p*G,s[6]=g*b+_*P+m*k+p*X,s[10]=g*R+_*z+m*H+p*K,s[14]=g*y+_*V+m*J+p*j,s[3]=M*w+x*E+v*U+A*G,s[7]=M*b+x*P+v*k+A*X,s[11]=M*R+x*z+v*H+A*K,s[15]=M*y+x*V+v*J+A*j,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],r=t[8],s=t[12],o=t[1],a=t[5],l=t[9],c=t[13],u=t[2],h=t[6],f=t[10],d=t[14],g=t[3],_=t[7],m=t[11],p=t[15];return g*(+s*l*h-r*c*h-s*a*f+n*c*f+r*a*d-n*l*d)+_*(+e*l*d-e*c*f+s*o*f-r*o*d+r*c*u-s*l*u)+m*(+e*c*h-e*a*d-s*o*h+n*o*d+s*a*u-n*c*u)+p*(-r*a*u-e*l*h+e*a*f+r*o*h-n*o*f+n*l*u)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const r=this.elements;return t.isVector3?(r[12]=t.x,r[13]=t.y,r[14]=t.z):(r[12]=t,r[13]=e,r[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],r=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8],h=t[9],f=t[10],d=t[11],g=t[12],_=t[13],m=t[14],p=t[15],M=h*m*c-_*f*c+_*l*d-a*m*d-h*l*p+a*f*p,x=g*f*c-u*m*c-g*l*d+o*m*d+u*l*p-o*f*p,v=u*_*c-g*h*c+g*a*d-o*_*d-u*a*p+o*h*p,A=g*h*l-u*_*l-g*a*f+o*_*f+u*a*m-o*h*m,w=e*M+n*x+r*v+s*A;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const b=1/w;return t[0]=M*b,t[1]=(_*f*s-h*m*s-_*r*d+n*m*d+h*r*p-n*f*p)*b,t[2]=(a*m*s-_*l*s+_*r*c-n*m*c-a*r*p+n*l*p)*b,t[3]=(h*l*s-a*f*s-h*r*c+n*f*c+a*r*d-n*l*d)*b,t[4]=x*b,t[5]=(u*m*s-g*f*s+g*r*d-e*m*d-u*r*p+e*f*p)*b,t[6]=(g*l*s-o*m*s-g*r*c+e*m*c+o*r*p-e*l*p)*b,t[7]=(o*f*s-u*l*s+u*r*c-e*f*c-o*r*d+e*l*d)*b,t[8]=v*b,t[9]=(g*h*s-u*_*s-g*n*d+e*_*d+u*n*p-e*h*p)*b,t[10]=(o*_*s-g*a*s+g*n*c-e*_*c-o*n*p+e*a*p)*b,t[11]=(u*a*s-o*h*s-u*n*c+e*h*c+o*n*d-e*a*d)*b,t[12]=A*b,t[13]=(u*_*r-g*h*r+g*n*f-e*_*f-u*n*m+e*h*m)*b,t[14]=(g*a*r-o*_*r-g*n*l+e*_*l+o*n*m-e*a*m)*b,t[15]=(o*h*r-u*a*r+u*n*l-e*h*l-o*n*f+e*a*f)*b,this}scale(t){const e=this.elements,n=t.x,r=t.y,s=t.z;return e[0]*=n,e[4]*=r,e[8]*=s,e[1]*=n,e[5]*=r,e[9]*=s,e[2]*=n,e[6]*=r,e[10]*=s,e[3]*=n,e[7]*=r,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],r=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,r))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),r=Math.sin(e),s=1-n,o=t.x,a=t.y,l=t.z,c=s*o,u=s*a;return this.set(c*o+n,c*a-r*l,c*l+r*a,0,c*a+r*l,u*a+n,u*l-r*o,0,c*l-r*a,u*l+r*o,s*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,r,s,o){return this.set(1,n,s,0,t,1,o,0,e,r,1,0,0,0,0,1),this}compose(t,e,n){const r=this.elements,s=e._x,o=e._y,a=e._z,l=e._w,c=s+s,u=o+o,h=a+a,f=s*c,d=s*u,g=s*h,_=o*u,m=o*h,p=a*h,M=l*c,x=l*u,v=l*h,A=n.x,w=n.y,b=n.z;return r[0]=(1-(_+p))*A,r[1]=(d+v)*A,r[2]=(g-x)*A,r[3]=0,r[4]=(d-v)*w,r[5]=(1-(f+p))*w,r[6]=(m+M)*w,r[7]=0,r[8]=(g+x)*b,r[9]=(m-M)*b,r[10]=(1-(f+_))*b,r[11]=0,r[12]=t.x,r[13]=t.y,r[14]=t.z,r[15]=1,this}decompose(t,e,n){const r=this.elements;let s=ii.set(r[0],r[1],r[2]).length();const o=ii.set(r[4],r[5],r[6]).length(),a=ii.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),t.x=r[12],t.y=r[13],t.z=r[14],Ze.copy(this);const c=1/s,u=1/o,h=1/a;return Ze.elements[0]*=c,Ze.elements[1]*=c,Ze.elements[2]*=c,Ze.elements[4]*=u,Ze.elements[5]*=u,Ze.elements[6]*=u,Ze.elements[8]*=h,Ze.elements[9]*=h,Ze.elements[10]*=h,e.setFromRotationMatrix(Ze),n.x=s,n.y=o,n.z=a,this}makePerspective(t,e,n,r,s,o,a=nn,l=!1){const c=this.elements,u=2*s/(e-t),h=2*s/(n-r),f=(e+t)/(e-t),d=(n+r)/(n-r);let g,_;if(l)g=s/(o-s),_=o*s/(o-s);else if(a===nn)g=-(o+s)/(o-s),_=-2*o*s/(o-s);else if(a===Hr)g=-o/(o-s),_=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=h,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,r,s,o,a=nn,l=!1){const c=this.elements,u=2/(e-t),h=2/(n-r),f=-(e+t)/(e-t),d=-(n+r)/(n-r);let g,_;if(l)g=1/(o-s),_=o/(o-s);else if(a===nn)g=-2/(o-s),_=-(o+s)/(o-s);else if(a===Hr)g=-1/(o-s),_=-s/(o-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=0,c[12]=f,c[1]=0,c[5]=h,c[9]=0,c[13]=d,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let r=0;r<16;r++)if(e[r]!==n[r])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const ii=new D,Ze=new ae,Hu=new D(0,0,0),Vu=new D(1,1,1),yn=new D,hr=new D,Ne=new D,ya=new ae,Ea=new tr;class sn{constructor(t=0,e=0,n=0,r=sn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=r}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,r=this._order){return this._x=t,this._y=e,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const r=t.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],u=r[9],h=r[2],f=r[6],d=r[10];switch(e){case"XYZ":this._y=Math.asin(Kt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Kt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(Kt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,d),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Kt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Kt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-Kt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return ya.makeRotationFromQuaternion(t),this.setFromRotationMatrix(ya,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Ea.setFromEuler(this),this.setFromQuaternion(Ea,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}sn.DEFAULT_ORDER="XYZ";class Wc{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Gu=0;const ba=new D,ri=new tr,un=new ae,fr=new D,Li=new D,Wu=new D,Xu=new tr,Ta=new D(1,0,0),Aa=new D(0,1,0),wa=new D(0,0,1),Ra={type:"added"},qu={type:"removed"},si={type:"childadded",child:null},us={type:"childremoved",child:null};class xe extends Ti{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Gu++}),this.uuid=Kn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=xe.DEFAULT_UP.clone();const t=new D,e=new sn,n=new tr,r=new D(1,1,1);function s(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new ae},normalMatrix:{value:new Yt}}),this.matrix=new ae,this.matrixWorld=new ae,this.matrixAutoUpdate=xe.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=xe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Wc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return ri.setFromAxisAngle(t,e),this.quaternion.multiply(ri),this}rotateOnWorldAxis(t,e){return ri.setFromAxisAngle(t,e),this.quaternion.premultiply(ri),this}rotateX(t){return this.rotateOnAxis(Ta,t)}rotateY(t){return this.rotateOnAxis(Aa,t)}rotateZ(t){return this.rotateOnAxis(wa,t)}translateOnAxis(t,e){return ba.copy(t).applyQuaternion(this.quaternion),this.position.add(ba.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Ta,t)}translateY(t){return this.translateOnAxis(Aa,t)}translateZ(t){return this.translateOnAxis(wa,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(un.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?fr.copy(t):fr.set(t,e,n);const r=this.parent;this.updateWorldMatrix(!0,!1),Li.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?un.lookAt(Li,fr,this.up):un.lookAt(fr,Li,this.up),this.quaternion.setFromRotationMatrix(un),r&&(un.extractRotation(r.matrixWorld),ri.setFromRotationMatrix(un),this.quaternion.premultiply(ri.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Ra),si.child=t,this.dispatchEvent(si),si.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(qu),us.child=t,this.dispatchEvent(us),us.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),un.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),un.multiply(t.parent.matrixWorld)),t.applyMatrix4(un),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Ra),si.child=t,this.dispatchEvent(si),si.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,r=this.children.length;n<r;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Li,t,Wu),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Li,Xu,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(a=>({...a})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(t),r.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];s(t.shapes,h)}else s(t.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(t.materials,this.material[l]));r.material=a}else r.material=s(t.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),u=o(t.images),h=o(t.shapes),f=o(t.skeletons),d=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=r,n;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const r=t.children[n];this.add(r.clone())}return this}}xe.DEFAULT_UP=new D(0,1,0);xe.DEFAULT_MATRIX_AUTO_UPDATE=!0;xe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Je=new D,hn=new D,hs=new D,fn=new D,oi=new D,ai=new D,Ca=new D,fs=new D,ds=new D,ps=new D,ms=new ie,gs=new ie,_s=new ie;class Ke{constructor(t=new D,e=new D,n=new D){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,r){r.subVectors(n,e),Je.subVectors(t,e),r.cross(Je);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(t,e,n,r,s){Je.subVectors(r,e),hn.subVectors(n,e),hs.subVectors(t,e);const o=Je.dot(Je),a=Je.dot(hn),l=Je.dot(hs),c=hn.dot(hn),u=hn.dot(hs),h=o*c-a*a;if(h===0)return s.set(0,0,0),null;const f=1/h,d=(c*l-a*u)*f,g=(o*u-a*l)*f;return s.set(1-d-g,g,d)}static containsPoint(t,e,n,r){return this.getBarycoord(t,e,n,r,fn)===null?!1:fn.x>=0&&fn.y>=0&&fn.x+fn.y<=1}static getInterpolation(t,e,n,r,s,o,a,l){return this.getBarycoord(t,e,n,r,fn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,fn.x),l.addScaledVector(o,fn.y),l.addScaledVector(a,fn.z),l)}static getInterpolatedAttribute(t,e,n,r,s,o){return ms.setScalar(0),gs.setScalar(0),_s.setScalar(0),ms.fromBufferAttribute(t,e),gs.fromBufferAttribute(t,n),_s.fromBufferAttribute(t,r),o.setScalar(0),o.addScaledVector(ms,s.x),o.addScaledVector(gs,s.y),o.addScaledVector(_s,s.z),o}static isFrontFacing(t,e,n,r){return Je.subVectors(n,e),hn.subVectors(t,e),Je.cross(hn).dot(r)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,r){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[r]),this}setFromAttributeAndIndices(t,e,n,r){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,r),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Je.subVectors(this.c,this.b),hn.subVectors(this.a,this.b),Je.cross(hn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Ke.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Ke.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,r,s){return Ke.getInterpolation(t,this.a,this.b,this.c,e,n,r,s)}containsPoint(t){return Ke.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Ke.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,r=this.b,s=this.c;let o,a;oi.subVectors(r,n),ai.subVectors(s,n),fs.subVectors(t,n);const l=oi.dot(fs),c=ai.dot(fs);if(l<=0&&c<=0)return e.copy(n);ds.subVectors(t,r);const u=oi.dot(ds),h=ai.dot(ds);if(u>=0&&h<=u)return e.copy(r);const f=l*h-u*c;if(f<=0&&l>=0&&u<=0)return o=l/(l-u),e.copy(n).addScaledVector(oi,o);ps.subVectors(t,s);const d=oi.dot(ps),g=ai.dot(ps);if(g>=0&&d<=g)return e.copy(s);const _=d*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(n).addScaledVector(ai,a);const m=u*g-d*h;if(m<=0&&h-u>=0&&d-g>=0)return Ca.subVectors(s,r),a=(h-u)/(h-u+(d-g)),e.copy(r).addScaledVector(Ca,a);const p=1/(m+_+f);return o=_*p,a=f*p,e.copy(n).addScaledVector(oi,o).addScaledVector(ai,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Xc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},En={h:0,s:0,l:0},dr={h:0,s:0,l:0};function vs(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Zt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const r=t;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=we){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Qt.colorSpaceToWorking(this,e),this}setRGB(t,e,n,r=Qt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Qt.colorSpaceToWorking(this,r),this}setHSL(t,e,n,r=Qt.workingColorSpace){if(t=Ho(t,1),e=Kt(e,0,1),n=Kt(n,0,1),e===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+e):n+e-n*e,o=2*n-s;this.r=vs(o,s,t+1/3),this.g=vs(o,s,t),this.b=vs(o,s,t-1/3)}return Qt.colorSpaceToWorking(this,r),this}setStyle(t,e=we){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(s,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=we){const n=Xc[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=_n(t.r),this.g=_n(t.g),this.b=_n(t.b),this}copyLinearToSRGB(t){return this.r=gi(t.r),this.g=gi(t.g),this.b=gi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=we){return Qt.workingToColorSpace(Se.copy(this),t),Math.round(Kt(Se.r*255,0,255))*65536+Math.round(Kt(Se.g*255,0,255))*256+Math.round(Kt(Se.b*255,0,255))}getHexString(t=we){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Qt.workingColorSpace){Qt.workingToColorSpace(Se.copy(this),e);const n=Se.r,r=Se.g,s=Se.b,o=Math.max(n,r,s),a=Math.min(n,r,s);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const h=o-a;switch(c=u<=.5?h/(o+a):h/(2-o-a),o){case n:l=(r-s)/h+(r<s?6:0);break;case r:l=(s-n)/h+2;break;case s:l=(n-r)/h+4;break}l/=6}return t.h=l,t.s=c,t.l=u,t}getRGB(t,e=Qt.workingColorSpace){return Qt.workingToColorSpace(Se.copy(this),e),t.r=Se.r,t.g=Se.g,t.b=Se.b,t}getStyle(t=we){Qt.workingToColorSpace(Se.copy(this),t);const e=Se.r,n=Se.g,r=Se.b;return t!==we?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(t,e,n){return this.getHSL(En),this.setHSL(En.h+t,En.s+e,En.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(En),t.getHSL(dr);const n=Hi(En.h,dr.h,e),r=Hi(En.s,dr.s,e),s=Hi(En.l,dr.l,e);return this.setHSL(n,r,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,r=this.b,s=t.elements;return this.r=s[0]*e+s[3]*n+s[6]*r,this.g=s[1]*e+s[4]*n+s[7]*r,this.b=s[2]*e+s[5]*n+s[8]*r,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Se=new Zt;Zt.NAMES=Xc;let Yu=0;class Ai extends Ti{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Yu++}),this.uuid=Kn(),this.name="",this.type="Material",this.blending=pi,this.side=Rn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ks,this.blendDst=Hs,this.blendEquation=Hn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Zt(0,0,0),this.blendAlpha=0,this.depthFunc=_i,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=pa,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=jn,this.stencilZFail=jn,this.stencilZPass=jn,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const r=this[e];if(r===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==pi&&(n.blending=this.blending),this.side!==Rn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ks&&(n.blendSrc=this.blendSrc),this.blendDst!==Hs&&(n.blendDst=this.blendDst),this.blendEquation!==Hn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==_i&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==pa&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==jn&&(n.stencilFail=this.stencilFail),this.stencilZFail!==jn&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==jn&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(e){const s=r(t.textures),o=r(t.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const r=e.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=e[s].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class Zr extends Ai{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Zt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new sn,this.combine=wc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const pe=new D,pr=new lt;let Zu=0;class We{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Zu++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=ma,this.updateRanges=[],this.gpuType=mn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[t+r]=e.array[n+r];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)pr.fromBufferAttribute(this,e),pr.applyMatrix3(t),this.setXY(e,pr.x,pr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)pe.fromBufferAttribute(this,e),pe.applyMatrix3(t),this.setXYZ(e,pe.x,pe.y,pe.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)pe.fromBufferAttribute(this,e),pe.applyMatrix4(t),this.setXYZ(e,pe.x,pe.y,pe.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)pe.fromBufferAttribute(this,e),pe.applyNormalMatrix(t),this.setXYZ(e,pe.x,pe.y,pe.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)pe.fromBufferAttribute(this,e),pe.transformDirection(t),this.setXYZ(e,pe.x,pe.y,pe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=fi(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Te(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=fi(e,this.array)),e}setX(t,e){return this.normalized&&(e=Te(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=fi(e,this.array)),e}setY(t,e){return this.normalized&&(e=Te(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=fi(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Te(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=fi(e,this.array)),e}setW(t,e){return this.normalized&&(e=Te(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Te(e,this.array),n=Te(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,r){return t*=this.itemSize,this.normalized&&(e=Te(e,this.array),n=Te(n,this.array),r=Te(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=r,this}setXYZW(t,e,n,r,s){return t*=this.itemSize,this.normalized&&(e=Te(e,this.array),n=Te(n,this.array),r=Te(r,this.array),s=Te(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=r,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==ma&&(t.usage=this.usage),t}}class qc extends We{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Yc extends We{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Vt extends We{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Ju=0;const He=new ae,xs=new xe,ci=new D,Fe=new er,Di=new er,ve=new D;class fe extends Ti{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Ju++}),this.uuid=Kn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Hc(t)?Yc:qc)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Yt().getNormalMatrix(t);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(t),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return He.makeRotationFromQuaternion(t),this.applyMatrix4(He),this}rotateX(t){return He.makeRotationX(t),this.applyMatrix4(He),this}rotateY(t){return He.makeRotationY(t),this.applyMatrix4(He),this}rotateZ(t){return He.makeRotationZ(t),this.applyMatrix4(He),this}translate(t,e,n){return He.makeTranslation(t,e,n),this.applyMatrix4(He),this}scale(t,e,n){return He.makeScale(t,e,n),this.applyMatrix4(He),this}lookAt(t){return xs.lookAt(t),xs.updateMatrix(),this.applyMatrix4(xs.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ci).negate(),this.translate(ci.x,ci.y,ci.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let r=0,s=t.length;r<s;r++){const o=t[r];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Vt(n,3))}else{const n=Math.min(t.length,e.count);for(let r=0;r<n;r++){const s=t[r];e.setXYZ(r,s.x,s.y,s.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new er);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,r=e.length;n<r;n++){const s=e[n];Fe.setFromBufferAttribute(s),this.morphTargetsRelative?(ve.addVectors(this.boundingBox.min,Fe.min),this.boundingBox.expandByPoint(ve),ve.addVectors(this.boundingBox.max,Fe.max),this.boundingBox.expandByPoint(ve)):(this.boundingBox.expandByPoint(Fe.min),this.boundingBox.expandByPoint(Fe.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Yr);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new D,1/0);return}if(t){const n=this.boundingSphere.center;if(Fe.setFromBufferAttribute(t),e)for(let s=0,o=e.length;s<o;s++){const a=e[s];Di.setFromBufferAttribute(a),this.morphTargetsRelative?(ve.addVectors(Fe.min,Di.min),Fe.expandByPoint(ve),ve.addVectors(Fe.max,Di.max),Fe.expandByPoint(ve)):(Fe.expandByPoint(Di.min),Fe.expandByPoint(Di.max))}Fe.getCenter(n);let r=0;for(let s=0,o=t.count;s<o;s++)ve.fromBufferAttribute(t,s),r=Math.max(r,n.distanceToSquared(ve));if(e)for(let s=0,o=e.length;s<o;s++){const a=e[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)ve.fromBufferAttribute(a,c),l&&(ci.fromBufferAttribute(t,c),ve.add(ci)),r=Math.max(r,n.distanceToSquared(ve))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,r=e.normal,s=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new We(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let R=0;R<n.count;R++)a[R]=new D,l[R]=new D;const c=new D,u=new D,h=new D,f=new lt,d=new lt,g=new lt,_=new D,m=new D;function p(R,y,E){c.fromBufferAttribute(n,R),u.fromBufferAttribute(n,y),h.fromBufferAttribute(n,E),f.fromBufferAttribute(s,R),d.fromBufferAttribute(s,y),g.fromBufferAttribute(s,E),u.sub(c),h.sub(c),d.sub(f),g.sub(f);const P=1/(d.x*g.y-g.x*d.y);isFinite(P)&&(_.copy(u).multiplyScalar(g.y).addScaledVector(h,-d.y).multiplyScalar(P),m.copy(h).multiplyScalar(d.x).addScaledVector(u,-g.x).multiplyScalar(P),a[R].add(_),a[y].add(_),a[E].add(_),l[R].add(m),l[y].add(m),l[E].add(m))}let M=this.groups;M.length===0&&(M=[{start:0,count:t.count}]);for(let R=0,y=M.length;R<y;++R){const E=M[R],P=E.start,z=E.count;for(let V=P,U=P+z;V<U;V+=3)p(t.getX(V+0),t.getX(V+1),t.getX(V+2))}const x=new D,v=new D,A=new D,w=new D;function b(R){A.fromBufferAttribute(r,R),w.copy(A);const y=a[R];x.copy(y),x.sub(A.multiplyScalar(A.dot(y))).normalize(),v.crossVectors(w,y);const P=v.dot(l[R])<0?-1:1;o.setXYZW(R,x.x,x.y,x.z,P)}for(let R=0,y=M.length;R<y;++R){const E=M[R],P=E.start,z=E.count;for(let V=P,U=P+z;V<U;V+=3)b(t.getX(V+0)),b(t.getX(V+1)),b(t.getX(V+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new We(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);const r=new D,s=new D,o=new D,a=new D,l=new D,c=new D,u=new D,h=new D;if(t)for(let f=0,d=t.count;f<d;f+=3){const g=t.getX(f+0),_=t.getX(f+1),m=t.getX(f+2);r.fromBufferAttribute(e,g),s.fromBufferAttribute(e,_),o.fromBufferAttribute(e,m),u.subVectors(o,s),h.subVectors(r,s),u.cross(h),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,m),a.add(u),l.add(u),c.add(u),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,d=e.count;f<d;f+=3)r.fromBufferAttribute(e,f+0),s.fromBufferAttribute(e,f+1),o.fromBufferAttribute(e,f+2),u.subVectors(o,s),h.subVectors(r,s),u.cross(h),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)ve.fromBufferAttribute(t,e),ve.normalize(),t.setXYZ(e,ve.x,ve.y,ve.z)}toNonIndexed(){function t(a,l){const c=a.array,u=a.itemSize,h=a.normalized,f=new c.constructor(l.length*u);let d=0,g=0;for(let _=0,m=l.length;_<m;_++){a.isInterleavedBufferAttribute?d=l[_]*a.data.stride+a.offset:d=l[_]*u;for(let p=0;p<u;p++)f[g++]=c[d++]}return new We(f,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new fe,n=this.index.array,r=this.attributes;for(const a in r){const l=r[a],c=t(l,n);e.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let u=0,h=c.length;u<h;u++){const f=c[u],d=t(f,n);l.push(d)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,f=c.length;h<f;h++){const d=c[h];u.push(d.toJSON(t.data))}u.length>0&&(r[l]=u,s=!0)}s&&(t.data.morphAttributes=r,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const r=t.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(e))}const s=t.morphAttributes;for(const c in s){const u=[],h=s[c];for(let f=0,d=h.length;f<d;f++)u.push(h[f].clone(e));this.morphAttributes[c]=u}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,u=o.length;c<u;c++){const h=o[c];this.addGroup(h.start,h.count,h.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Pa=new ae,Un=new Gc,mr=new Yr,La=new D,gr=new D,_r=new D,vr=new D,Ms=new D,xr=new D,Da=new D,Mr=new D;class je extends xe{constructor(t=new fe,e=new Zr){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const r=e[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(t,e){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(r,t);const a=this.morphTargetInfluences;if(s&&a){xr.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=a[l],h=s[l];u!==0&&(Ms.fromBufferAttribute(h,t),o?xr.addScaledVector(Ms,u):xr.addScaledVector(Ms.sub(e),u))}e.add(xr)}return e}raycast(t,e){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),mr.copy(n.boundingSphere),mr.applyMatrix4(s),Un.copy(t.ray).recast(t.near),!(mr.containsPoint(Un.origin)===!1&&(Un.intersectSphere(mr,La)===null||Un.origin.distanceToSquared(La)>(t.far-t.near)**2))&&(Pa.copy(s).invert(),Un.copy(t.ray).applyMatrix4(Pa),!(n.boundingBox!==null&&Un.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Un)))}_computeIntersections(t,e,n){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,h=s.attributes.normal,f=s.groups,d=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){const m=f[g],p=o[m.materialIndex],M=Math.max(m.start,d.start),x=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let v=M,A=x;v<A;v+=3){const w=a.getX(v),b=a.getX(v+1),R=a.getX(v+2);r=Sr(this,p,t,n,c,u,h,w,b,R),r&&(r.faceIndex=Math.floor(v/3),r.face.materialIndex=m.materialIndex,e.push(r))}}else{const g=Math.max(0,d.start),_=Math.min(a.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){const M=a.getX(m),x=a.getX(m+1),v=a.getX(m+2);r=Sr(this,o,t,n,c,u,h,M,x,v),r&&(r.faceIndex=Math.floor(m/3),e.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){const m=f[g],p=o[m.materialIndex],M=Math.max(m.start,d.start),x=Math.min(l.count,Math.min(m.start+m.count,d.start+d.count));for(let v=M,A=x;v<A;v+=3){const w=v,b=v+1,R=v+2;r=Sr(this,p,t,n,c,u,h,w,b,R),r&&(r.faceIndex=Math.floor(v/3),r.face.materialIndex=m.materialIndex,e.push(r))}}else{const g=Math.max(0,d.start),_=Math.min(l.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){const M=m,x=m+1,v=m+2;r=Sr(this,o,t,n,c,u,h,M,x,v),r&&(r.faceIndex=Math.floor(m/3),e.push(r))}}}}function Ku(i,t,e,n,r,s,o,a){let l;if(t.side===Re?l=n.intersectTriangle(o,s,r,!0,a):l=n.intersectTriangle(r,s,o,t.side===Rn,a),l===null)return null;Mr.copy(a),Mr.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(Mr);return c<e.near||c>e.far?null:{distance:c,point:Mr.clone(),object:i}}function Sr(i,t,e,n,r,s,o,a,l,c){i.getVertexPosition(a,gr),i.getVertexPosition(l,_r),i.getVertexPosition(c,vr);const u=Ku(i,t,e,n,gr,_r,vr,Da);if(u){const h=new D;Ke.getBarycoord(Da,gr,_r,vr,h),r&&(u.uv=Ke.getInterpolatedAttribute(r,a,l,c,h,new lt)),s&&(u.uv1=Ke.getInterpolatedAttribute(s,a,l,c,h,new lt)),o&&(u.normal=Ke.getInterpolatedAttribute(o,a,l,c,h,new D),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new D,materialIndex:0};Ke.getNormal(gr,_r,vr,f.normal),u.face=f,u.barycoord=h}return u}class Cn extends fe{constructor(t=1,e=1,n=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],u=[],h=[];let f=0,d=0;g("z","y","x",-1,-1,n,e,t,o,s,0),g("z","y","x",1,-1,n,e,-t,o,s,1),g("x","z","y",1,1,t,n,e,r,o,2),g("x","z","y",1,-1,t,n,-e,r,o,3),g("x","y","z",1,-1,t,e,n,r,s,4),g("x","y","z",-1,-1,t,e,-n,r,s,5),this.setIndex(l),this.setAttribute("position",new Vt(c,3)),this.setAttribute("normal",new Vt(u,3)),this.setAttribute("uv",new Vt(h,2));function g(_,m,p,M,x,v,A,w,b,R,y){const E=v/b,P=A/R,z=v/2,V=A/2,U=w/2,k=b+1,H=R+1;let J=0,G=0;const X=new D;for(let K=0;K<H;K++){const j=K*P-V;for(let ct=0;ct<k;ct++){const Et=ct*E-z;X[_]=Et*M,X[m]=j*x,X[p]=U,c.push(X.x,X.y,X.z),X[_]=0,X[m]=0,X[p]=w>0?1:-1,u.push(X.x,X.y,X.z),h.push(ct/b),h.push(1-K/R),J+=1}}for(let K=0;K<R;K++)for(let j=0;j<b;j++){const ct=f+j+k*K,Et=f+j+k*(K+1),xt=f+(j+1)+k*(K+1),B=f+(j+1)+k*K;l.push(ct,Et,B),l.push(Et,xt,B),G+=6}a.addGroup(d,G,y),d+=G,f+=J}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Cn(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function yi(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const r=i[e][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=r.clone():Array.isArray(r)?t[e][n]=r.slice():t[e][n]=r}}return t}function Ae(i){const t={};for(let e=0;e<i.length;e++){const n=yi(i[e]);for(const r in n)t[r]=n[r]}return t}function $u(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Zc(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Qt.workingColorSpace}const ju={clone:yi,merge:Ae};var Qu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,th=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Xe extends Ai{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Qu,this.fragmentShader=th,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=yi(t.uniforms),this.uniformsGroups=$u(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?e.uniforms[r]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[r]={type:"m4",value:o.toArray()}:e.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Jc extends xe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ae,this.projectionMatrix=new ae,this.projectionMatrixInverse=new ae,this.coordinateSystem=nn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const bn=new D,Ia=new lt,Ua=new lt;class Pe extends Jc{constructor(t=50,e=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Si*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(ki*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Si*2*Math.atan(Math.tan(ki*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){bn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(bn.x,bn.y).multiplyScalar(-t/bn.z),bn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(bn.x,bn.y).multiplyScalar(-t/bn.z)}getViewSize(t,e){return this.getViewBounds(t,Ia,Ua),e.subVectors(Ua,Ia)}setViewOffset(t,e,n,r,s,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(ki*.5*this.fov)/this.zoom,n=2*e,r=this.aspect*n,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,e-=o.offsetY*n/c,r*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(s+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const li=-90,ui=1;class eh extends xe{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Pe(li,ui,t,e);r.layers=this.layers,this.add(r);const s=new Pe(li,ui,t,e);s.layers=this.layers,this.add(s);const o=new Pe(li,ui,t,e);o.layers=this.layers,this.add(o);const a=new Pe(li,ui,t,e);a.layers=this.layers,this.add(a);const l=new Pe(li,ui,t,e);l.layers=this.layers,this.add(l);const c=new Pe(li,ui,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,r,s,o,a,l]=e;for(const c of e)this.remove(c);if(t===nn)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Hr)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,u]=this.children,h=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,r),t.render(e,s),t.setRenderTarget(n,1,r),t.render(e,o),t.setRenderTarget(n,2,r),t.render(e,a),t.setRenderTarget(n,3,r),t.render(e,l),t.setRenderTarget(n,4,r),t.render(e,c),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,r),t.render(e,u),t.setRenderTarget(h,f,d),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Kc extends ye{constructor(t=[],e=vi,n,r,s,o,a,l,c,u){super(t,e,n,r,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class nh extends qn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},r=[n,n,n,n,n,n];this.texture=new Kc(r),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Cn(5,5,5),s=new Xe({name:"CubemapFromEquirect",uniforms:yi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Re,blending:An});s.uniforms.tEquirect.value=e;const o=new je(r,s),a=e.minFilter;return e.minFilter===Wn&&(e.minFilter=$e),new eh(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,r=!0){const s=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,r);t.setRenderTarget(s)}}class Fi extends xe{constructor(){super(),this.isGroup=!0,this.type="Group"}}const ih={type:"move"};class Ss{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Fi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Fi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Fi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const _ of t.hand.values()){const m=e.getJointPose(_,n),p=this._getHandJoint(c,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],f=u.position.distanceTo(h.position),d=.02,g=.005;c.inputState.pinching&&f>d+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=d-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=e.getPose(t.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(ih)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Fi;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}class rh extends xe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new sn,this.environmentIntensity=1,this.environmentRotation=new sn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class sh extends ye{constructor(t=null,e=1,n=1,r,s,o,a,l,c=Be,u=Be,h,f){super(null,o,a,l,c,u,r,s,h,f),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const ys=new D,oh=new D,ah=new Yt;class zn{constructor(t=new D(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,r){return this.normal.set(t,e,n),this.constant=r,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const r=ys.subVectors(n,e).cross(oh.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(r,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(ys),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:e.copy(t.start).addScaledVector(n,s)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||ah.getNormalMatrix(t),r=this.coplanarPoint(ys).applyMatrix4(t),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Nn=new Yr,ch=new lt(.5,.5),yr=new D;class Go{constructor(t=new zn,e=new zn,n=new zn,r=new zn,s=new zn,o=new zn){this.planes=[t,e,n,r,s,o]}set(t,e,n,r,s,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=nn,n=!1){const r=this.planes,s=t.elements,o=s[0],a=s[1],l=s[2],c=s[3],u=s[4],h=s[5],f=s[6],d=s[7],g=s[8],_=s[9],m=s[10],p=s[11],M=s[12],x=s[13],v=s[14],A=s[15];if(r[0].setComponents(c-o,d-u,p-g,A-M).normalize(),r[1].setComponents(c+o,d+u,p+g,A+M).normalize(),r[2].setComponents(c+a,d+h,p+_,A+x).normalize(),r[3].setComponents(c-a,d-h,p-_,A-x).normalize(),n)r[4].setComponents(l,f,m,v).normalize(),r[5].setComponents(c-l,d-f,p-m,A-v).normalize();else if(r[4].setComponents(c-l,d-f,p-m,A-v).normalize(),e===nn)r[5].setComponents(c+l,d+f,p+m,A+v).normalize();else if(e===Hr)r[5].setComponents(l,f,m,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Nn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Nn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Nn)}intersectsSprite(t){Nn.center.set(0,0,0);const e=ch.distanceTo(t.center);return Nn.radius=.7071067811865476+e,Nn.applyMatrix4(t.matrixWorld),this.intersectsSphere(Nn)}intersectsSphere(t){const e=this.planes,n=t.center,r=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const r=e[n];if(yr.x=r.normal.x>0?t.max.x:t.min.x,yr.y=r.normal.y>0?t.max.y:t.min.y,yr.z=r.normal.z>0?t.max.z:t.min.z,r.distanceToPoint(yr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class lh extends Ai{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Zt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Na=new ae,bo=new Gc,Er=new Yr,br=new D;class uh extends xe{constructor(t=new fe,e=new lh){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,r=this.matrixWorld,s=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Er.copy(n.boundingSphere),Er.applyMatrix4(r),Er.radius+=s,t.ray.intersectsSphere(Er)===!1)return;Na.copy(r).invert(),bo.copy(t.ray).applyMatrix4(Na);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,h=n.attributes.position;if(c!==null){const f=Math.max(0,o.start),d=Math.min(c.count,o.start+o.count);for(let g=f,_=d;g<_;g++){const m=c.getX(g);br.fromBufferAttribute(h,m),Fa(br,m,l,r,t,e,this)}}else{const f=Math.max(0,o.start),d=Math.min(h.count,o.start+o.count);for(let g=f,_=d;g<_;g++)br.fromBufferAttribute(h,g),Fa(br,g,l,r,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const r=e[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function Fa(i,t,e,n,r,s,o){const a=bo.distanceSqToPoint(i);if(a<e){const l=new D;bo.closestPointToPoint(i,l),l.applyMatrix4(n);const c=r.ray.origin.distanceTo(l);if(c<r.near||c>r.far)return;s.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class hh extends ye{constructor(t,e,n,r,s,o,a,l,c){super(t,e,n,r,s,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class $c extends ye{constructor(t,e,n=Xn,r,s,o,a=Be,l=Be,c,u=Yi,h=1){if(u!==Yi&&u!==Zi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:t,height:e,depth:h};super(f,r,s,o,a,l,u,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Vo(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class Jr extends fe{constructor(t=1,e=1,n=1,r=32,s=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const u=[],h=[],f=[],d=[];let g=0;const _=[],m=n/2;let p=0;M(),o===!1&&(t>0&&x(!0),e>0&&x(!1)),this.setIndex(u),this.setAttribute("position",new Vt(h,3)),this.setAttribute("normal",new Vt(f,3)),this.setAttribute("uv",new Vt(d,2));function M(){const v=new D,A=new D;let w=0;const b=(e-t)/n;for(let R=0;R<=s;R++){const y=[],E=R/s,P=E*(e-t)+t;for(let z=0;z<=r;z++){const V=z/r,U=V*l+a,k=Math.sin(U),H=Math.cos(U);A.x=P*k,A.y=-E*n+m,A.z=P*H,h.push(A.x,A.y,A.z),v.set(k,b,H).normalize(),f.push(v.x,v.y,v.z),d.push(V,1-E),y.push(g++)}_.push(y)}for(let R=0;R<r;R++)for(let y=0;y<s;y++){const E=_[y][R],P=_[y+1][R],z=_[y+1][R+1],V=_[y][R+1];(t>0||y!==0)&&(u.push(E,P,V),w+=3),(e>0||y!==s-1)&&(u.push(P,z,V),w+=3)}c.addGroup(p,w,0),p+=w}function x(v){const A=g,w=new lt,b=new D;let R=0;const y=v===!0?t:e,E=v===!0?1:-1;for(let z=1;z<=r;z++)h.push(0,m*E,0),f.push(0,E,0),d.push(.5,.5),g++;const P=g;for(let z=0;z<=r;z++){const U=z/r*l+a,k=Math.cos(U),H=Math.sin(U);b.x=y*H,b.y=m*E,b.z=y*k,h.push(b.x,b.y,b.z),f.push(0,E,0),w.x=k*.5+.5,w.y=H*.5*E+.5,d.push(w.x,w.y),g++}for(let z=0;z<r;z++){const V=A+z,U=P+z;v===!0?u.push(U,U+1,V):u.push(U+1,U,V),R+=3}c.addGroup(p,R,v===!0?1:2),p+=R}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Jr(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Wo extends fe{constructor(t=[],e=[],n=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:r};const s=[],o=[];a(r),c(n),u(),this.setAttribute("position",new Vt(s,3)),this.setAttribute("normal",new Vt(s.slice(),3)),this.setAttribute("uv",new Vt(o,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function a(M){const x=new D,v=new D,A=new D;for(let w=0;w<e.length;w+=3)d(e[w+0],x),d(e[w+1],v),d(e[w+2],A),l(x,v,A,M)}function l(M,x,v,A){const w=A+1,b=[];for(let R=0;R<=w;R++){b[R]=[];const y=M.clone().lerp(v,R/w),E=x.clone().lerp(v,R/w),P=w-R;for(let z=0;z<=P;z++)z===0&&R===w?b[R][z]=y:b[R][z]=y.clone().lerp(E,z/P)}for(let R=0;R<w;R++)for(let y=0;y<2*(w-R)-1;y++){const E=Math.floor(y/2);y%2===0?(f(b[R][E+1]),f(b[R+1][E]),f(b[R][E])):(f(b[R][E+1]),f(b[R+1][E+1]),f(b[R+1][E]))}}function c(M){const x=new D;for(let v=0;v<s.length;v+=3)x.x=s[v+0],x.y=s[v+1],x.z=s[v+2],x.normalize().multiplyScalar(M),s[v+0]=x.x,s[v+1]=x.y,s[v+2]=x.z}function u(){const M=new D;for(let x=0;x<s.length;x+=3){M.x=s[x+0],M.y=s[x+1],M.z=s[x+2];const v=m(M)/2/Math.PI+.5,A=p(M)/Math.PI+.5;o.push(v,1-A)}g(),h()}function h(){for(let M=0;M<o.length;M+=6){const x=o[M+0],v=o[M+2],A=o[M+4],w=Math.max(x,v,A),b=Math.min(x,v,A);w>.9&&b<.1&&(x<.2&&(o[M+0]+=1),v<.2&&(o[M+2]+=1),A<.2&&(o[M+4]+=1))}}function f(M){s.push(M.x,M.y,M.z)}function d(M,x){const v=M*3;x.x=t[v+0],x.y=t[v+1],x.z=t[v+2]}function g(){const M=new D,x=new D,v=new D,A=new D,w=new lt,b=new lt,R=new lt;for(let y=0,E=0;y<s.length;y+=9,E+=6){M.set(s[y+0],s[y+1],s[y+2]),x.set(s[y+3],s[y+4],s[y+5]),v.set(s[y+6],s[y+7],s[y+8]),w.set(o[E+0],o[E+1]),b.set(o[E+2],o[E+3]),R.set(o[E+4],o[E+5]),A.copy(M).add(x).add(v).divideScalar(3);const P=m(A);_(w,E+0,M,P),_(b,E+2,x,P),_(R,E+4,v,P)}}function _(M,x,v,A){A<0&&M.x===1&&(o[x]=M.x-1),v.x===0&&v.z===0&&(o[x]=A/2/Math.PI+.5)}function m(M){return Math.atan2(M.z,-M.x)}function p(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Wo(t.vertices,t.indices,t.radius,t.details)}}class on{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,r=this.getPoint(0),s=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),s+=n.distanceTo(r),e.push(s),r=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){const n=this.getLengths();let r=0;const s=n.length;let o;e?o=e:o=t*n[s-1];let a=0,l=s-1,c;for(;a<=l;)if(r=Math.floor(a+(l-a)/2),c=n[r]-o,c<0)a=r+1;else if(c>0)l=r-1;else{l=r;break}if(r=l,n[r]===o)return r/(s-1);const u=n[r],f=n[r+1]-u,d=(o-u)/f;return(r+d)/(s-1)}getTangent(t,e){let r=t-1e-4,s=t+1e-4;r<0&&(r=0),s>1&&(s=1);const o=this.getPoint(r),a=this.getPoint(s),l=e||(o.isVector2?new lt:new D);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){const n=new D,r=[],s=[],o=[],a=new D,l=new ae;for(let d=0;d<=t;d++){const g=d/t;r[d]=this.getTangentAt(g,new D)}s[0]=new D,o[0]=new D;let c=Number.MAX_VALUE;const u=Math.abs(r[0].x),h=Math.abs(r[0].y),f=Math.abs(r[0].z);u<=c&&(c=u,n.set(1,0,0)),h<=c&&(c=h,n.set(0,1,0)),f<=c&&n.set(0,0,1),a.crossVectors(r[0],n).normalize(),s[0].crossVectors(r[0],a),o[0].crossVectors(r[0],s[0]);for(let d=1;d<=t;d++){if(s[d]=s[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(r[d-1],r[d]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(Kt(r[d-1].dot(r[d]),-1,1));s[d].applyMatrix4(l.makeRotationAxis(a,g))}o[d].crossVectors(r[d],s[d])}if(e===!0){let d=Math.acos(Kt(s[0].dot(s[t]),-1,1));d/=t,r[0].dot(a.crossVectors(s[0],s[t]))>0&&(d=-d);for(let g=1;g<=t;g++)s[g].applyMatrix4(l.makeRotationAxis(r[g],d*g)),o[g].crossVectors(r[g],s[g])}return{tangents:r,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Xo extends on{constructor(t=0,e=0,n=1,r=1,s=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(t,e=new lt){const n=e,r=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(o?s=0:s=r),this.aClockwise===!0&&!o&&(s===r?s=-r:s=s-r);const a=this.aStartAngle+t*s;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),f=l-this.aX,d=c-this.aY;l=f*u-d*h+this.aX,c=f*h+d*u+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class fh extends Xo{constructor(t,e,n,r,s,o){super(t,e,n,n,r,s,o),this.isArcCurve=!0,this.type="ArcCurve"}}function qo(){let i=0,t=0,e=0,n=0;function r(s,o,a,l){i=s,t=a,e=-3*s+3*o-2*a-l,n=2*s-2*o+a+l}return{initCatmullRom:function(s,o,a,l,c){r(o,a,c*(a-s),c*(l-o))},initNonuniformCatmullRom:function(s,o,a,l,c,u,h){let f=(o-s)/c-(a-s)/(c+u)+(a-o)/u,d=(a-o)/u-(l-o)/(u+h)+(l-a)/h;f*=u,d*=u,r(o,a,f,d)},calc:function(s){const o=s*s,a=o*s;return i+t*s+e*o+n*a}}}const Tr=new D,Es=new qo,bs=new qo,Ts=new qo;class jc extends on{constructor(t=[],e=!1,n="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=r}getPoint(t,e=new D){const n=e,r=this.points,s=r.length,o=(s-(this.closed?0:1))*t;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:l===0&&a===s-1&&(a=s-2,l=1);let c,u;this.closed||a>0?c=r[(a-1)%s]:(Tr.subVectors(r[0],r[1]).add(r[0]),c=Tr);const h=r[a%s],f=r[(a+1)%s];if(this.closed||a+2<s?u=r[(a+2)%s]:(Tr.subVectors(r[s-1],r[s-2]).add(r[s-1]),u=Tr),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(h),d),_=Math.pow(h.distanceToSquared(f),d),m=Math.pow(f.distanceToSquared(u),d);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),Es.initNonuniformCatmullRom(c.x,h.x,f.x,u.x,g,_,m),bs.initNonuniformCatmullRom(c.y,h.y,f.y,u.y,g,_,m),Ts.initNonuniformCatmullRom(c.z,h.z,f.z,u.z,g,_,m)}else this.curveType==="catmullrom"&&(Es.initCatmullRom(c.x,h.x,f.x,u.x,this.tension),bs.initCatmullRom(c.y,h.y,f.y,u.y,this.tension),Ts.initCatmullRom(c.z,h.z,f.z,u.z,this.tension));return n.set(Es.calc(l),bs.calc(l),Ts.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const r=t.points[e];this.points.push(r.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const r=this.points[e];t.points.push(r.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const r=t.points[e];this.points.push(new D().fromArray(r))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Oa(i,t,e,n,r){const s=(n-t)*.5,o=(r-e)*.5,a=i*i,l=i*a;return(2*e-2*n+s+o)*l+(-3*e+3*n-2*s-o)*a+s*i+e}function dh(i,t){const e=1-i;return e*e*t}function ph(i,t){return 2*(1-i)*i*t}function mh(i,t){return i*i*t}function Vi(i,t,e,n){return dh(i,t)+ph(i,e)+mh(i,n)}function gh(i,t){const e=1-i;return e*e*e*t}function _h(i,t){const e=1-i;return 3*e*e*i*t}function vh(i,t){return 3*(1-i)*i*i*t}function xh(i,t){return i*i*i*t}function Gi(i,t,e,n,r){return gh(i,t)+_h(i,e)+vh(i,n)+xh(i,r)}class Qc extends on{constructor(t=new lt,e=new lt,n=new lt,r=new lt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=r}getPoint(t,e=new lt){const n=e,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(Gi(t,r.x,s.x,o.x,a.x),Gi(t,r.y,s.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Mh extends on{constructor(t=new D,e=new D,n=new D,r=new D){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=r}getPoint(t,e=new D){const n=e,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(Gi(t,r.x,s.x,o.x,a.x),Gi(t,r.y,s.y,o.y,a.y),Gi(t,r.z,s.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class tl extends on{constructor(t=new lt,e=new lt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new lt){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new lt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Sh extends on{constructor(t=new D,e=new D){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new D){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new D){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class el extends on{constructor(t=new lt,e=new lt,n=new lt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new lt){const n=e,r=this.v0,s=this.v1,o=this.v2;return n.set(Vi(t,r.x,s.x,o.x),Vi(t,r.y,s.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class nl extends on{constructor(t=new D,e=new D,n=new D){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new D){const n=e,r=this.v0,s=this.v1,o=this.v2;return n.set(Vi(t,r.x,s.x,o.x),Vi(t,r.y,s.y,o.y),Vi(t,r.z,s.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class il extends on{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new lt){const n=e,r=this.points,s=(r.length-1)*t,o=Math.floor(s),a=s-o,l=r[o===0?o:o-1],c=r[o],u=r[o>r.length-2?r.length-1:o+1],h=r[o>r.length-3?r.length-1:o+2];return n.set(Oa(a,l.x,c.x,u.x,h.x),Oa(a,l.y,c.y,u.y,h.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const r=t.points[e];this.points.push(r.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const r=this.points[e];t.points.push(r.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const r=t.points[e];this.points.push(new lt().fromArray(r))}return this}}var Gr=Object.freeze({__proto__:null,ArcCurve:fh,CatmullRomCurve3:jc,CubicBezierCurve:Qc,CubicBezierCurve3:Mh,EllipseCurve:Xo,LineCurve:tl,LineCurve3:Sh,QuadraticBezierCurve:el,QuadraticBezierCurve3:nl,SplineCurve:il});class yh extends on{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Gr[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),r=this.getCurveLengths();let s=0;for(;s<r.length;){if(r[s]>=n){const o=r[s]-n,a=this.curves[s],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,e)}s++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,r=this.curves.length;n<r;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let r=0,s=this.curves;r<s.length;r++){const o=s[r],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,l=o.getPoints(a);for(let c=0;c<l.length;c++){const u=l[c];n&&n.equals(u)||(e.push(u),n=u)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const r=t.curves[e];this.curves.push(r.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const r=this.curves[e];t.curves.push(r.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const r=t.curves[e];this.curves.push(new Gr[r.type]().fromJSON(r))}return this}}class To extends yh{constructor(t){super(),this.type="Path",this.currentPoint=new lt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new tl(this.currentPoint.clone(),new lt(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,r){const s=new el(this.currentPoint.clone(),new lt(t,e),new lt(n,r));return this.curves.push(s),this.currentPoint.set(n,r),this}bezierCurveTo(t,e,n,r,s,o){const a=new Qc(this.currentPoint.clone(),new lt(t,e),new lt(n,r),new lt(s,o));return this.curves.push(a),this.currentPoint.set(s,o),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new il(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,r,s,o){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+a,e+l,n,r,s,o),this}absarc(t,e,n,r,s,o){return this.absellipse(t,e,n,n,r,s,o),this}ellipse(t,e,n,r,s,o,a,l){const c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(t+c,e+u,n,r,s,o,a,l),this}absellipse(t,e,n,r,s,o,a,l){const c=new Xo(t,e,n,r,s,o,a,l);if(this.curves.length>0){const h=c.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(c);const u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class Yo extends To{constructor(t){super(t),this.uuid=Kn(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,r=this.holes.length;n<r;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const r=t.holes[e];this.holes.push(r.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const r=this.holes[e];t.holes.push(r.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const r=t.holes[e];this.holes.push(new To().fromJSON(r))}return this}}function Eh(i,t,e=2){const n=t&&t.length,r=n?t[0]*e:i.length;let s=rl(i,0,r,e,!0);const o=[];if(!s||s.next===s.prev)return o;let a,l,c;if(n&&(s=Rh(i,t,s,e)),i.length>80*e){a=1/0,l=1/0;let u=-1/0,h=-1/0;for(let f=e;f<r;f+=e){const d=i[f],g=i[f+1];d<a&&(a=d),g<l&&(l=g),d>u&&(u=d),g>h&&(h=g)}c=Math.max(u-a,h-l),c=c!==0?32767/c:0}return Ji(s,o,e,a,l,c,0),o}function rl(i,t,e,n,r){let s;if(r===zh(i,t,e,n)>0)for(let o=t;o<e;o+=n)s=Ba(o/n|0,i[o],i[o+1],s);else for(let o=e-n;o>=t;o-=n)s=Ba(o/n|0,i[o],i[o+1],s);return s&&Ei(s,s.next)&&($i(s),s=s.next),s}function Yn(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(Ei(e,e.next)||he(e.prev,e,e.next)===0)){if($i(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Ji(i,t,e,n,r,s,o){if(!i)return;!o&&s&&Ih(i,n,r,s);let a=i;for(;i.prev!==i.next;){const l=i.prev,c=i.next;if(s?Th(i,n,r,s):bh(i)){t.push(l.i,i.i,c.i),$i(i),i=c.next,a=c.next;continue}if(i=c,i===a){o?o===1?(i=Ah(Yn(i),t),Ji(i,t,e,n,r,s,2)):o===2&&wh(i,t,e,n,r,s):Ji(Yn(i),t,e,n,r,s,1);break}}}function bh(i){const t=i.prev,e=i,n=i.next;if(he(t,e,n)>=0)return!1;const r=t.x,s=e.x,o=n.x,a=t.y,l=e.y,c=n.y,u=Math.min(r,s,o),h=Math.min(a,l,c),f=Math.max(r,s,o),d=Math.max(a,l,c);let g=n.next;for(;g!==t;){if(g.x>=u&&g.x<=f&&g.y>=h&&g.y<=d&&Oi(r,a,s,l,o,c,g.x,g.y)&&he(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function Th(i,t,e,n){const r=i.prev,s=i,o=i.next;if(he(r,s,o)>=0)return!1;const a=r.x,l=s.x,c=o.x,u=r.y,h=s.y,f=o.y,d=Math.min(a,l,c),g=Math.min(u,h,f),_=Math.max(a,l,c),m=Math.max(u,h,f),p=Ao(d,g,t,e,n),M=Ao(_,m,t,e,n);let x=i.prevZ,v=i.nextZ;for(;x&&x.z>=p&&v&&v.z<=M;){if(x.x>=d&&x.x<=_&&x.y>=g&&x.y<=m&&x!==r&&x!==o&&Oi(a,u,l,h,c,f,x.x,x.y)&&he(x.prev,x,x.next)>=0||(x=x.prevZ,v.x>=d&&v.x<=_&&v.y>=g&&v.y<=m&&v!==r&&v!==o&&Oi(a,u,l,h,c,f,v.x,v.y)&&he(v.prev,v,v.next)>=0))return!1;v=v.nextZ}for(;x&&x.z>=p;){if(x.x>=d&&x.x<=_&&x.y>=g&&x.y<=m&&x!==r&&x!==o&&Oi(a,u,l,h,c,f,x.x,x.y)&&he(x.prev,x,x.next)>=0)return!1;x=x.prevZ}for(;v&&v.z<=M;){if(v.x>=d&&v.x<=_&&v.y>=g&&v.y<=m&&v!==r&&v!==o&&Oi(a,u,l,h,c,f,v.x,v.y)&&he(v.prev,v,v.next)>=0)return!1;v=v.nextZ}return!0}function Ah(i,t){let e=i;do{const n=e.prev,r=e.next.next;!Ei(n,r)&&ol(n,e,e.next,r)&&Ki(n,r)&&Ki(r,n)&&(t.push(n.i,e.i,r.i),$i(e),$i(e.next),e=i=r),e=e.next}while(e!==i);return Yn(e)}function wh(i,t,e,n,r,s){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&Fh(o,a)){let l=al(o,a);o=Yn(o,o.next),l=Yn(l,l.next),Ji(o,t,e,n,r,s,0),Ji(l,t,e,n,r,s,0);return}a=a.next}o=o.next}while(o!==i)}function Rh(i,t,e,n){const r=[];for(let s=0,o=t.length;s<o;s++){const a=t[s]*n,l=s<o-1?t[s+1]*n:i.length,c=rl(i,a,l,n,!1);c===c.next&&(c.steiner=!0),r.push(Nh(c))}r.sort(Ch);for(let s=0;s<r.length;s++)e=Ph(r[s],e);return e}function Ch(i,t){let e=i.x-t.x;if(e===0&&(e=i.y-t.y,e===0)){const n=(i.next.y-i.y)/(i.next.x-i.x),r=(t.next.y-t.y)/(t.next.x-t.x);e=n-r}return e}function Ph(i,t){const e=Lh(i,t);if(!e)return t;const n=al(e,i);return Yn(n,n.next),Yn(e,e.next)}function Lh(i,t){let e=t;const n=i.x,r=i.y;let s=-1/0,o;if(Ei(i,e))return e;do{if(Ei(i,e.next))return e.next;if(r<=e.y&&r>=e.next.y&&e.next.y!==e.y){const h=e.x+(r-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(h<=n&&h>s&&(s=h,o=e.x<e.next.x?e:e.next,h===n))return o}e=e.next}while(e!==t);if(!o)return null;const a=o,l=o.x,c=o.y;let u=1/0;e=o;do{if(n>=e.x&&e.x>=l&&n!==e.x&&sl(r<c?n:s,r,l,c,r<c?s:n,r,e.x,e.y)){const h=Math.abs(r-e.y)/(n-e.x);Ki(e,i)&&(h<u||h===u&&(e.x>o.x||e.x===o.x&&Dh(o,e)))&&(o=e,u=h)}e=e.next}while(e!==a);return o}function Dh(i,t){return he(i.prev,i,t.prev)<0&&he(t.next,i,i.next)<0}function Ih(i,t,e,n){let r=i;do r.z===0&&(r.z=Ao(r.x,r.y,t,e,n)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==i);r.prevZ.nextZ=null,r.prevZ=null,Uh(r)}function Uh(i){let t,e=1;do{let n=i,r;i=null;let s=null;for(t=0;n;){t++;let o=n,a=0;for(let c=0;c<e&&(a++,o=o.nextZ,!!o);c++);let l=e;for(;a>0||l>0&&o;)a!==0&&(l===0||!o||n.z<=o.z)?(r=n,n=n.nextZ,a--):(r=o,o=o.nextZ,l--),s?s.nextZ=r:i=r,r.prevZ=s,s=r;n=o}s.nextZ=null,e*=2}while(t>1);return i}function Ao(i,t,e,n,r){return i=(i-e)*r|0,t=(t-n)*r|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function Nh(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function sl(i,t,e,n,r,s,o,a){return(r-o)*(t-a)>=(i-o)*(s-a)&&(i-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(s-a)>=(r-o)*(n-a)}function Oi(i,t,e,n,r,s,o,a){return!(i===o&&t===a)&&sl(i,t,e,n,r,s,o,a)}function Fh(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!Oh(i,t)&&(Ki(i,t)&&Ki(t,i)&&Bh(i,t)&&(he(i.prev,i,t.prev)||he(i,t.prev,t))||Ei(i,t)&&he(i.prev,i,i.next)>0&&he(t.prev,t,t.next)>0)}function he(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function Ei(i,t){return i.x===t.x&&i.y===t.y}function ol(i,t,e,n){const r=wr(he(i,t,e)),s=wr(he(i,t,n)),o=wr(he(e,n,i)),a=wr(he(e,n,t));return!!(r!==s&&o!==a||r===0&&Ar(i,e,t)||s===0&&Ar(i,n,t)||o===0&&Ar(e,i,n)||a===0&&Ar(e,t,n))}function Ar(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function wr(i){return i>0?1:i<0?-1:0}function Oh(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&ol(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function Ki(i,t){return he(i.prev,i,i.next)<0?he(i,t,i.next)>=0&&he(i,i.prev,t)>=0:he(i,t,i.prev)<0||he(i,i.next,t)<0}function Bh(i,t){let e=i,n=!1;const r=(i.x+t.x)/2,s=(i.y+t.y)/2;do e.y>s!=e.next.y>s&&e.next.y!==e.y&&r<(e.next.x-e.x)*(s-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function al(i,t){const e=wo(i.i,i.x,i.y),n=wo(t.i,t.x,t.y),r=i.next,s=t.prev;return i.next=t,t.prev=i,e.next=r,r.prev=e,n.next=e,e.prev=n,s.next=n,n.prev=s,n}function Ba(i,t,e,n){const r=wo(i,t,e);return n?(r.next=n.next,r.prev=n,n.next.prev=r,n.next=r):(r.prev=r,r.next=r),r}function $i(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function wo(i,t,e){return{i,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function zh(i,t,e,n){let r=0;for(let s=t,o=e-n;s<e;s+=n)r+=(i[o]-i[s])*(i[s+1]+i[o+1]),o=s;return r}class kh{static triangulate(t,e,n=2){return Eh(t,e,n)}}class gn{static area(t){const e=t.length;let n=0;for(let r=e-1,s=0;s<e;r=s++)n+=t[r].x*t[s].y-t[s].x*t[r].y;return n*.5}static isClockWise(t){return gn.area(t)<0}static triangulateShape(t,e){const n=[],r=[],s=[];za(t),ka(n,t);let o=t.length;e.forEach(za);for(let l=0;l<e.length;l++)r.push(o),o+=e[l].length,ka(n,e[l]);const a=kh.triangulate(n,r);for(let l=0;l<a.length;l+=3)s.push(a.slice(l,l+3));return s}}function za(i){const t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function ka(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}class Zo extends fe{constructor(t=new Yo([new lt(.5,.5),new lt(-.5,.5),new lt(-.5,-.5),new lt(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,r=[],s=[];for(let a=0,l=t.length;a<l;a++){const c=t[a];o(c)}this.setAttribute("position",new Vt(r,3)),this.setAttribute("uv",new Vt(s,2)),this.computeVertexNormals();function o(a){const l=[],c=e.curveSegments!==void 0?e.curveSegments:12,u=e.steps!==void 0?e.steps:1,h=e.depth!==void 0?e.depth:1;let f=e.bevelEnabled!==void 0?e.bevelEnabled:!0,d=e.bevelThickness!==void 0?e.bevelThickness:.2,g=e.bevelSize!==void 0?e.bevelSize:d-.1,_=e.bevelOffset!==void 0?e.bevelOffset:0,m=e.bevelSegments!==void 0?e.bevelSegments:3;const p=e.extrudePath,M=e.UVGenerator!==void 0?e.UVGenerator:Hh;let x,v=!1,A,w,b,R;p&&(x=p.getSpacedPoints(u),v=!0,f=!1,A=p.computeFrenetFrames(u,!1),w=new D,b=new D,R=new D),f||(m=0,d=0,g=0,_=0);const y=a.extractPoints(c);let E=y.shape;const P=y.holes;if(!gn.isClockWise(E)){E=E.reverse();for(let nt=0,$=P.length;nt<$;nt++){const ot=P[nt];gn.isClockWise(ot)&&(P[nt]=ot.reverse())}}function V(nt){const ot=10000000000000001e-36;let Q=nt[0];for(let mt=1;mt<=nt.length;mt++){const at=mt%nt.length,gt=nt[at],Wt=gt.x-Q.x,kt=gt.y-Q.y,C=Wt*Wt+kt*kt,S=Math.max(Math.abs(gt.x),Math.abs(gt.y),Math.abs(Q.x),Math.abs(Q.y)),O=ot*S*S;if(C<=O){nt.splice(at,1),mt--;continue}Q=gt}}V(E),P.forEach(V);const U=P.length,k=E;for(let nt=0;nt<U;nt++){const $=P[nt];E=E.concat($)}function H(nt,$,ot){return $||console.error("THREE.ExtrudeGeometry: vec does not exist"),nt.clone().addScaledVector($,ot)}const J=E.length;function G(nt,$,ot){let Q,mt,at;const gt=nt.x-$.x,Wt=nt.y-$.y,kt=ot.x-nt.x,C=ot.y-nt.y,S=gt*gt+Wt*Wt,O=gt*C-Wt*kt;if(Math.abs(O)>Number.EPSILON){const Y=Math.sqrt(S),st=Math.sqrt(kt*kt+C*C),Z=$.x-Wt/Y,Dt=$.y+gt/Y,pt=ot.x-C/st,Ct=ot.y+kt/st,Pt=((pt-Z)*C-(Ct-Dt)*kt)/(gt*C-Wt*kt);Q=Z+gt*Pt-nt.x,mt=Dt+Wt*Pt-nt.y;const ut=Q*Q+mt*mt;if(ut<=2)return new lt(Q,mt);at=Math.sqrt(ut/2)}else{let Y=!1;gt>Number.EPSILON?kt>Number.EPSILON&&(Y=!0):gt<-Number.EPSILON?kt<-Number.EPSILON&&(Y=!0):Math.sign(Wt)===Math.sign(C)&&(Y=!0),Y?(Q=-Wt,mt=gt,at=Math.sqrt(S)):(Q=gt,mt=Wt,at=Math.sqrt(S/2))}return new lt(Q/at,mt/at)}const X=[];for(let nt=0,$=k.length,ot=$-1,Q=nt+1;nt<$;nt++,ot++,Q++)ot===$&&(ot=0),Q===$&&(Q=0),X[nt]=G(k[nt],k[ot],k[Q]);const K=[];let j,ct=X.concat();for(let nt=0,$=U;nt<$;nt++){const ot=P[nt];j=[];for(let Q=0,mt=ot.length,at=mt-1,gt=Q+1;Q<mt;Q++,at++,gt++)at===mt&&(at=0),gt===mt&&(gt=0),j[Q]=G(ot[Q],ot[at],ot[gt]);K.push(j),ct=ct.concat(j)}let Et;if(m===0)Et=gn.triangulateShape(k,P);else{const nt=[],$=[];for(let ot=0;ot<m;ot++){const Q=ot/m,mt=d*Math.cos(Q*Math.PI/2),at=g*Math.sin(Q*Math.PI/2)+_;for(let gt=0,Wt=k.length;gt<Wt;gt++){const kt=H(k[gt],X[gt],at);Tt(kt.x,kt.y,-mt),Q===0&&nt.push(kt)}for(let gt=0,Wt=U;gt<Wt;gt++){const kt=P[gt];j=K[gt];const C=[];for(let S=0,O=kt.length;S<O;S++){const Y=H(kt[S],j[S],at);Tt(Y.x,Y.y,-mt),Q===0&&C.push(Y)}Q===0&&$.push(C)}}Et=gn.triangulateShape(nt,$)}const xt=Et.length,B=g+_;for(let nt=0;nt<J;nt++){const $=f?H(E[nt],ct[nt],B):E[nt];v?(b.copy(A.normals[0]).multiplyScalar($.x),w.copy(A.binormals[0]).multiplyScalar($.y),R.copy(x[0]).add(b).add(w),Tt(R.x,R.y,R.z)):Tt($.x,$.y,0)}for(let nt=1;nt<=u;nt++)for(let $=0;$<J;$++){const ot=f?H(E[$],ct[$],B):E[$];v?(b.copy(A.normals[nt]).multiplyScalar(ot.x),w.copy(A.binormals[nt]).multiplyScalar(ot.y),R.copy(x[nt]).add(b).add(w),Tt(R.x,R.y,R.z)):Tt(ot.x,ot.y,h/u*nt)}for(let nt=m-1;nt>=0;nt--){const $=nt/m,ot=d*Math.cos($*Math.PI/2),Q=g*Math.sin($*Math.PI/2)+_;for(let mt=0,at=k.length;mt<at;mt++){const gt=H(k[mt],X[mt],Q);Tt(gt.x,gt.y,h+ot)}for(let mt=0,at=P.length;mt<at;mt++){const gt=P[mt];j=K[mt];for(let Wt=0,kt=gt.length;Wt<kt;Wt++){const C=H(gt[Wt],j[Wt],Q);v?Tt(C.x,C.y+x[u-1].y,x[u-1].x+ot):Tt(C.x,C.y,h+ot)}}}it(),rt();function it(){const nt=r.length/3;if(f){let $=0,ot=J*$;for(let Q=0;Q<xt;Q++){const mt=Et[Q];Ut(mt[2]+ot,mt[1]+ot,mt[0]+ot)}$=u+m*2,ot=J*$;for(let Q=0;Q<xt;Q++){const mt=Et[Q];Ut(mt[0]+ot,mt[1]+ot,mt[2]+ot)}}else{for(let $=0;$<xt;$++){const ot=Et[$];Ut(ot[2],ot[1],ot[0])}for(let $=0;$<xt;$++){const ot=Et[$];Ut(ot[0]+J*u,ot[1]+J*u,ot[2]+J*u)}}n.addGroup(nt,r.length/3-nt,0)}function rt(){const nt=r.length/3;let $=0;bt(k,$),$+=k.length;for(let ot=0,Q=P.length;ot<Q;ot++){const mt=P[ot];bt(mt,$),$+=mt.length}n.addGroup(nt,r.length/3-nt,1)}function bt(nt,$){let ot=nt.length;for(;--ot>=0;){const Q=ot;let mt=ot-1;mt<0&&(mt=nt.length-1);for(let at=0,gt=u+m*2;at<gt;at++){const Wt=J*at,kt=J*(at+1),C=$+Q+Wt,S=$+mt+Wt,O=$+mt+kt,Y=$+Q+kt;ce(C,S,O,Y)}}}function Tt(nt,$,ot){l.push(nt),l.push($),l.push(ot)}function Ut(nt,$,ot){Gt(nt),Gt($),Gt(ot);const Q=r.length/3,mt=M.generateTopUV(n,r,Q-3,Q-2,Q-1);L(mt[0]),L(mt[1]),L(mt[2])}function ce(nt,$,ot,Q){Gt(nt),Gt($),Gt(Q),Gt($),Gt(ot),Gt(Q);const mt=r.length/3,at=M.generateSideWallUV(n,r,mt-6,mt-3,mt-2,mt-1);L(at[0]),L(at[1]),L(at[3]),L(at[1]),L(at[2]),L(at[3])}function Gt(nt){r.push(l[nt*3+0]),r.push(l[nt*3+1]),r.push(l[nt*3+2])}function L(nt){s.push(nt.x),s.push(nt.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return Vh(e,n,t)}static fromJSON(t,e){const n=[];for(let s=0,o=t.shapes.length;s<o;s++){const a=e[t.shapes[s]];n.push(a)}const r=t.options.extrudePath;return r!==void 0&&(t.options.extrudePath=new Gr[r.type]().fromJSON(r)),new Zo(n,t.options)}}const Hh={generateTopUV:function(i,t,e,n,r){const s=t[e*3],o=t[e*3+1],a=t[n*3],l=t[n*3+1],c=t[r*3],u=t[r*3+1];return[new lt(s,o),new lt(a,l),new lt(c,u)]},generateSideWallUV:function(i,t,e,n,r,s){const o=t[e*3],a=t[e*3+1],l=t[e*3+2],c=t[n*3],u=t[n*3+1],h=t[n*3+2],f=t[r*3],d=t[r*3+1],g=t[r*3+2],_=t[s*3],m=t[s*3+1],p=t[s*3+2];return Math.abs(a-u)<Math.abs(o-c)?[new lt(o,1-l),new lt(c,1-h),new lt(f,1-g),new lt(_,1-p)]:[new lt(a,1-l),new lt(u,1-h),new lt(d,1-g),new lt(m,1-p)]}};function Vh(i,t,e){if(e.shapes=[],Array.isArray(i))for(let n=0,r=i.length;n<r;n++){const s=i[n];e.shapes.push(s.uuid)}else e.shapes.push(i.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class Jo extends Wo{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,r=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(r,s,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Jo(t.radius,t.detail)}}class Ko extends fe{constructor(t=[new lt(0,-.5),new lt(.5,0),new lt(0,.5)],e=12,n=0,r=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:r},e=Math.floor(e),r=Kt(r,0,Math.PI*2);const s=[],o=[],a=[],l=[],c=[],u=1/e,h=new D,f=new lt,d=new D,g=new D,_=new D;let m=0,p=0;for(let M=0;M<=t.length-1;M++)switch(M){case 0:m=t[M+1].x-t[M].x,p=t[M+1].y-t[M].y,d.x=p*1,d.y=-m,d.z=p*0,_.copy(d),d.normalize(),l.push(d.x,d.y,d.z);break;case t.length-1:l.push(_.x,_.y,_.z);break;default:m=t[M+1].x-t[M].x,p=t[M+1].y-t[M].y,d.x=p*1,d.y=-m,d.z=p*0,g.copy(d),d.x+=_.x,d.y+=_.y,d.z+=_.z,d.normalize(),l.push(d.x,d.y,d.z),_.copy(g)}for(let M=0;M<=e;M++){const x=n+M*u*r,v=Math.sin(x),A=Math.cos(x);for(let w=0;w<=t.length-1;w++){h.x=t[w].x*v,h.y=t[w].y,h.z=t[w].x*A,o.push(h.x,h.y,h.z),f.x=M/e,f.y=w/(t.length-1),a.push(f.x,f.y);const b=l[3*w+0]*v,R=l[3*w+1],y=l[3*w+0]*A;c.push(b,R,y)}}for(let M=0;M<e;M++)for(let x=0;x<t.length-1;x++){const v=x+M*t.length,A=v,w=v+t.length,b=v+t.length+1,R=v+1;s.push(A,w,R),s.push(b,R,w)}this.setIndex(s),this.setAttribute("position",new Vt(o,3)),this.setAttribute("uv",new Vt(a,2)),this.setAttribute("normal",new Vt(c,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ko(t.points,t.segments,t.phiStart,t.phiLength)}}class Zn extends fe{constructor(t=1,e=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:r};const s=t/2,o=e/2,a=Math.floor(n),l=Math.floor(r),c=a+1,u=l+1,h=t/a,f=e/l,d=[],g=[],_=[],m=[];for(let p=0;p<u;p++){const M=p*f-o;for(let x=0;x<c;x++){const v=x*h-s;g.push(v,-M,0),_.push(0,0,1),m.push(x/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let M=0;M<a;M++){const x=M+c*p,v=M+c*(p+1),A=M+1+c*(p+1),w=M+1+c*p;d.push(x,v,w),d.push(v,A,w)}this.setIndex(d),this.setAttribute("position",new Vt(g,3)),this.setAttribute("normal",new Vt(_,3)),this.setAttribute("uv",new Vt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Zn(t.width,t.height,t.widthSegments,t.heightSegments)}}class $o extends fe{constructor(t=new Yo([new lt(0,.5),new lt(-.5,-.5),new lt(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};const n=[],r=[],s=[],o=[];let a=0,l=0;if(Array.isArray(t)===!1)c(t);else for(let u=0;u<t.length;u++)c(t[u]),this.addGroup(a,l,u),a+=l,l=0;this.setIndex(n),this.setAttribute("position",new Vt(r,3)),this.setAttribute("normal",new Vt(s,3)),this.setAttribute("uv",new Vt(o,2));function c(u){const h=r.length/3,f=u.extractPoints(e);let d=f.shape;const g=f.holes;gn.isClockWise(d)===!1&&(d=d.reverse());for(let m=0,p=g.length;m<p;m++){const M=g[m];gn.isClockWise(M)===!0&&(g[m]=M.reverse())}const _=gn.triangulateShape(d,g);for(let m=0,p=g.length;m<p;m++){const M=g[m];d=d.concat(M)}for(let m=0,p=d.length;m<p;m++){const M=d[m];r.push(M.x,M.y,0),s.push(0,0,1),o.push(M.x,M.y)}for(let m=0,p=_.length;m<p;m++){const M=_[m],x=M[0]+h,v=M[1]+h,A=M[2]+h;n.push(x,v,A),l+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes;return Gh(e,t)}static fromJSON(t,e){const n=[];for(let r=0,s=t.shapes.length;r<s;r++){const o=e[t.shapes[r]];n.push(o)}return new $o(n,t.curveSegments)}}function Gh(i,t){if(t.shapes=[],Array.isArray(i))for(let e=0,n=i.length;e<n;e++){const r=i[e];t.shapes.push(r.uuid)}else t.shapes.push(i.uuid);return t}class nr extends fe{constructor(t=1,e=32,n=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const u=[],h=new D,f=new D,d=[],g=[],_=[],m=[];for(let p=0;p<=n;p++){const M=[],x=p/n;let v=0;p===0&&o===0?v=.5/e:p===n&&l===Math.PI&&(v=-.5/e);for(let A=0;A<=e;A++){const w=A/e;h.x=-t*Math.cos(r+w*s)*Math.sin(o+x*a),h.y=t*Math.cos(o+x*a),h.z=t*Math.sin(r+w*s)*Math.sin(o+x*a),g.push(h.x,h.y,h.z),f.copy(h).normalize(),_.push(f.x,f.y,f.z),m.push(w+v,1-x),M.push(c++)}u.push(M)}for(let p=0;p<n;p++)for(let M=0;M<e;M++){const x=u[p][M+1],v=u[p][M],A=u[p+1][M],w=u[p+1][M+1];(p!==0||o>0)&&d.push(x,v,w),(p!==n-1||l<Math.PI)&&d.push(v,A,w)}this.setIndex(d),this.setAttribute("position",new Vt(g,3)),this.setAttribute("normal",new Vt(_,3)),this.setAttribute("uv",new Vt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new nr(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class jo extends fe{constructor(t=1,e=.4,n=12,r=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:r,arc:s},n=Math.floor(n),r=Math.floor(r);const o=[],a=[],l=[],c=[],u=new D,h=new D,f=new D;for(let d=0;d<=n;d++)for(let g=0;g<=r;g++){const _=g/r*s,m=d/n*Math.PI*2;h.x=(t+e*Math.cos(m))*Math.cos(_),h.y=(t+e*Math.cos(m))*Math.sin(_),h.z=e*Math.sin(m),a.push(h.x,h.y,h.z),u.x=t*Math.cos(_),u.y=t*Math.sin(_),f.subVectors(h,u).normalize(),l.push(f.x,f.y,f.z),c.push(g/r),c.push(d/n)}for(let d=1;d<=n;d++)for(let g=1;g<=r;g++){const _=(r+1)*d+g-1,m=(r+1)*(d-1)+g-1,p=(r+1)*(d-1)+g,M=(r+1)*d+g;o.push(_,m,M),o.push(m,p,M)}this.setIndex(o),this.setAttribute("position",new Vt(a,3)),this.setAttribute("normal",new Vt(l,3)),this.setAttribute("uv",new Vt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new jo(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class Qo extends fe{constructor(t=new nl(new D(-1,-1,0),new D(-1,1,0),new D(1,1,0)),e=64,n=1,r=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:r,closed:s};const o=t.computeFrenetFrames(e,s);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const a=new D,l=new D,c=new lt;let u=new D;const h=[],f=[],d=[],g=[];_(),this.setIndex(g),this.setAttribute("position",new Vt(h,3)),this.setAttribute("normal",new Vt(f,3)),this.setAttribute("uv",new Vt(d,2));function _(){for(let x=0;x<e;x++)m(x);m(s===!1?e:0),M(),p()}function m(x){u=t.getPointAt(x/e,u);const v=o.normals[x],A=o.binormals[x];for(let w=0;w<=r;w++){const b=w/r*Math.PI*2,R=Math.sin(b),y=-Math.cos(b);l.x=y*v.x+R*A.x,l.y=y*v.y+R*A.y,l.z=y*v.z+R*A.z,l.normalize(),f.push(l.x,l.y,l.z),a.x=u.x+n*l.x,a.y=u.y+n*l.y,a.z=u.z+n*l.z,h.push(a.x,a.y,a.z)}}function p(){for(let x=1;x<=e;x++)for(let v=1;v<=r;v++){const A=(r+1)*(x-1)+(v-1),w=(r+1)*x+(v-1),b=(r+1)*x+v,R=(r+1)*(x-1)+v;g.push(A,w,R),g.push(w,b,R)}}function M(){for(let x=0;x<=e;x++)for(let v=0;v<=r;v++)c.x=x/e,c.y=v/r,d.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new Qo(new Gr[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}class cl extends Ai{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Zt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Zt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Bc,this.normalScale=new lt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new sn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Wh extends Ai{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=ou,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Xh extends Ai{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Kr extends xe{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Zt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class qh extends Kr{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(xe.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Zt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const As=new ae,Ha=new D,Va=new D;class ll{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new lt(512,512),this.mapType=rn,this.map=null,this.mapPass=null,this.matrix=new ae,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Go,this._frameExtents=new lt(1,1),this._viewportCount=1,this._viewports=[new ie(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Ha.setFromMatrixPosition(t.matrixWorld),e.position.copy(Ha),Va.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Va),e.updateMatrixWorld(),As.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(As,e.coordinateSystem,e.reversedDepth),e.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(As)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class Yh extends ll{constructor(){super(new Pe(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(t){const e=this.camera,n=Si*2*t.angle*this.focus,r=this.mapSize.width/this.mapSize.height*this.aspect,s=t.distance||e.far;(n!==e.fov||r!==e.aspect||s!==e.far)&&(e.fov=n,e.aspect=r,e.far=s,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this}}class Zh extends Kr{constructor(t,e,n=0,r=Math.PI/3,s=0,o=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(xe.DEFAULT_UP),this.updateMatrix(),this.target=new xe,this.distance=n,this.angle=r,this.penumbra=s,this.decay=o,this.map=null,this.shadow=new Yh}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}const Ga=new ae,Ii=new D,ws=new D;class Jh extends ll{constructor(){super(new Pe(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new lt(4,2),this._viewportCount=6,this._viewports=[new ie(2,1,1,1),new ie(0,1,1,1),new ie(3,1,1,1),new ie(1,1,1,1),new ie(3,0,1,1),new ie(1,0,1,1)],this._cubeDirections=[new D(1,0,0),new D(-1,0,0),new D(0,0,1),new D(0,0,-1),new D(0,1,0),new D(0,-1,0)],this._cubeUps=[new D(0,1,0),new D(0,1,0),new D(0,1,0),new D(0,1,0),new D(0,0,1),new D(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,r=this.matrix,s=t.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),Ii.setFromMatrixPosition(t.matrixWorld),n.position.copy(Ii),ws.copy(n.position),ws.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(ws),n.updateMatrixWorld(),r.makeTranslation(-Ii.x,-Ii.y,-Ii.z),Ga.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ga,n.coordinateSystem,n.reversedDepth)}}class Kh extends Kr{constructor(t,e,n=0,r=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=r,this.shadow=new Jh}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class $h extends Jc{constructor(t=-1,e=1,n=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-t,o=n+t,a=r+e,l=r-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class jh extends Kr{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}class Qh extends Pe{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}function Wa(i,t,e,n){const r=tf(n);switch(e){case Ic:return i*t;case Nc:return i*t/r.components*r.byteLength;case Bo:return i*t/r.components*r.byteLength;case Fc:return i*t*2/r.components*r.byteLength;case zo:return i*t*2/r.components*r.byteLength;case Uc:return i*t*3/r.components*r.byteLength;case Ge:return i*t*4/r.components*r.byteLength;case ko:return i*t*4/r.components*r.byteLength;case Dr:case Ir:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Ur:case Nr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case js:case to:return Math.max(i,16)*Math.max(t,8)/4;case $s:case Qs:return Math.max(i,8)*Math.max(t,8)/2;case eo:case no:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case io:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ro:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case so:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case oo:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case ao:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case co:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case lo:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case uo:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case ho:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case fo:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case po:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case mo:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case go:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case _o:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case vo:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Fr:case xo:case Mo:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Oc:case So:return Math.ceil(i/4)*Math.ceil(t/4)*8;case yo:case Eo:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function tf(i){switch(i){case rn:case Pc:return{byteLength:1,components:1};case Xi:case Lc:case Qi:return{byteLength:2,components:1};case Fo:case Oo:return{byteLength:2,components:4};case Xn:case No:case mn:return{byteLength:4,components:1};case Dc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Uo}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Uo);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function ul(){let i=null,t=!1,e=null,n=null;function r(s,o){e(s,o),n=i.requestAnimationFrame(r)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(r),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){i=s}}}function ef(i){const t=new WeakMap;function e(a,l){const c=a.array,u=a.usage,h=c.byteLength,f=i.createBuffer();i.bindBuffer(l,f),i.bufferData(l,c,u),a.onUploadCallback();let d;if(c instanceof Float32Array)d=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)d=i.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=i.SHORT;else if(c instanceof Uint32Array)d=i.UNSIGNED_INT;else if(c instanceof Int32Array)d=i.INT;else if(c instanceof Int8Array)d=i.BYTE;else if(c instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:h}}function n(a,l,c){const u=l.array,h=l.updateRanges;if(i.bindBuffer(c,a),h.length===0)i.bufferSubData(c,0,u);else{h.sort((d,g)=>d.start-g.start);let f=0;for(let d=1;d<h.length;d++){const g=h[f],_=h[d];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++f,h[f]=_)}h.length=f+1;for(let d=0,g=h.length;d<g;d++){const _=h[d];i.bufferSubData(c,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(i.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=t.get(a);(!u||u.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:r,remove:s,update:o}}var nf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,rf=`#ifdef USE_ALPHAHASH
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
#endif`,sf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,of=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,af=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,cf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,lf=`#ifdef USE_AOMAP
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
#endif`,uf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,hf=`#ifdef USE_BATCHING
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
#endif`,ff=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,df=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,pf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,mf=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,gf=`#ifdef USE_IRIDESCENCE
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
#endif`,_f=`#ifdef USE_BUMPMAP
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
#endif`,vf=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,xf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Mf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Sf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,yf=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Ef=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,bf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Tf=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Af=`#define PI 3.141592653589793
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
} // validated`,wf=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Rf=`vec3 transformedNormal = objectNormal;
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
#endif`,Cf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Pf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Lf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Df=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,If="gl_FragColor = linearToOutputTexel( gl_FragColor );",Uf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Nf=`#ifdef USE_ENVMAP
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
#endif`,Ff=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Of=`#ifdef USE_ENVMAP
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
#endif`,Bf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,zf=`#ifdef USE_ENVMAP
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
#endif`,kf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Hf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Vf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Gf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Wf=`#ifdef USE_GRADIENTMAP
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
}`,Xf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,qf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Yf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Zf=`uniform bool receiveShadow;
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
#endif`,Jf=`#ifdef USE_ENVMAP
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
#endif`,Kf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,$f=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,jf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Qf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,td=`PhysicalMaterial material;
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
#endif`,ed=`struct PhysicalMaterial {
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
}`,nd=`
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
#endif`,id=`#if defined( RE_IndirectDiffuse )
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
#endif`,rd=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,sd=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,od=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ad=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,cd=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,ld=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,ud=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,hd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,fd=`#if defined( USE_POINTS_UV )
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
#endif`,dd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,pd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,md=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,gd=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,_d=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,vd=`#ifdef USE_MORPHTARGETS
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
#endif`,xd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Md=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Sd=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,yd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ed=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,bd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Td=`#ifdef USE_NORMALMAP
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
#endif`,Ad=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,wd=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Rd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Cd=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Pd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Ld=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Dd=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Id=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Ud=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Nd=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Fd=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Od=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Bd=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,zd=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,kd=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Hd=`float getShadowMask() {
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
}`,Vd=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Gd=`#ifdef USE_SKINNING
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
#endif`,Wd=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Xd=`#ifdef USE_SKINNING
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
#endif`,qd=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Yd=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Zd=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Jd=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Kd=`#ifdef USE_TRANSMISSION
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
#endif`,$d=`#ifdef USE_TRANSMISSION
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
#endif`,jd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Qd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,tp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ep=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const np=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,ip=`uniform sampler2D t2D;
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
}`,rp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,sp=`#ifdef ENVMAP_TYPE_CUBE
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
}`,op=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ap=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cp=`#include <common>
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
}`,lp=`#if DEPTH_PACKING == 3200
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
}`,up=`#define DISTANCE
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
}`,hp=`#define DISTANCE
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
}`,fp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,dp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,pp=`uniform float scale;
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
}`,mp=`uniform vec3 diffuse;
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
}`,gp=`#include <common>
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
}`,_p=`uniform vec3 diffuse;
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
}`,vp=`#define LAMBERT
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
}`,xp=`#define LAMBERT
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
}`,Mp=`#define MATCAP
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
}`,Sp=`#define MATCAP
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
}`,yp=`#define NORMAL
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
}`,Ep=`#define NORMAL
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
}`,bp=`#define PHONG
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
}`,Tp=`#define PHONG
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
}`,Ap=`#define STANDARD
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
}`,wp=`#define STANDARD
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
}`,Rp=`#define TOON
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
}`,Cp=`#define TOON
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
}`,Pp=`uniform float size;
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
}`,Lp=`uniform vec3 diffuse;
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
}`,Dp=`#include <common>
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
}`,Ip=`uniform vec3 color;
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
}`,Up=`uniform float rotation;
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
}`,Np=`uniform vec3 diffuse;
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
}`,Jt={alphahash_fragment:nf,alphahash_pars_fragment:rf,alphamap_fragment:sf,alphamap_pars_fragment:of,alphatest_fragment:af,alphatest_pars_fragment:cf,aomap_fragment:lf,aomap_pars_fragment:uf,batching_pars_vertex:hf,batching_vertex:ff,begin_vertex:df,beginnormal_vertex:pf,bsdfs:mf,iridescence_fragment:gf,bumpmap_pars_fragment:_f,clipping_planes_fragment:vf,clipping_planes_pars_fragment:xf,clipping_planes_pars_vertex:Mf,clipping_planes_vertex:Sf,color_fragment:yf,color_pars_fragment:Ef,color_pars_vertex:bf,color_vertex:Tf,common:Af,cube_uv_reflection_fragment:wf,defaultnormal_vertex:Rf,displacementmap_pars_vertex:Cf,displacementmap_vertex:Pf,emissivemap_fragment:Lf,emissivemap_pars_fragment:Df,colorspace_fragment:If,colorspace_pars_fragment:Uf,envmap_fragment:Nf,envmap_common_pars_fragment:Ff,envmap_pars_fragment:Of,envmap_pars_vertex:Bf,envmap_physical_pars_fragment:Jf,envmap_vertex:zf,fog_vertex:kf,fog_pars_vertex:Hf,fog_fragment:Vf,fog_pars_fragment:Gf,gradientmap_pars_fragment:Wf,lightmap_pars_fragment:Xf,lights_lambert_fragment:qf,lights_lambert_pars_fragment:Yf,lights_pars_begin:Zf,lights_toon_fragment:Kf,lights_toon_pars_fragment:$f,lights_phong_fragment:jf,lights_phong_pars_fragment:Qf,lights_physical_fragment:td,lights_physical_pars_fragment:ed,lights_fragment_begin:nd,lights_fragment_maps:id,lights_fragment_end:rd,logdepthbuf_fragment:sd,logdepthbuf_pars_fragment:od,logdepthbuf_pars_vertex:ad,logdepthbuf_vertex:cd,map_fragment:ld,map_pars_fragment:ud,map_particle_fragment:hd,map_particle_pars_fragment:fd,metalnessmap_fragment:dd,metalnessmap_pars_fragment:pd,morphinstance_vertex:md,morphcolor_vertex:gd,morphnormal_vertex:_d,morphtarget_pars_vertex:vd,morphtarget_vertex:xd,normal_fragment_begin:Md,normal_fragment_maps:Sd,normal_pars_fragment:yd,normal_pars_vertex:Ed,normal_vertex:bd,normalmap_pars_fragment:Td,clearcoat_normal_fragment_begin:Ad,clearcoat_normal_fragment_maps:wd,clearcoat_pars_fragment:Rd,iridescence_pars_fragment:Cd,opaque_fragment:Pd,packing:Ld,premultiplied_alpha_fragment:Dd,project_vertex:Id,dithering_fragment:Ud,dithering_pars_fragment:Nd,roughnessmap_fragment:Fd,roughnessmap_pars_fragment:Od,shadowmap_pars_fragment:Bd,shadowmap_pars_vertex:zd,shadowmap_vertex:kd,shadowmask_pars_fragment:Hd,skinbase_vertex:Vd,skinning_pars_vertex:Gd,skinning_vertex:Wd,skinnormal_vertex:Xd,specularmap_fragment:qd,specularmap_pars_fragment:Yd,tonemapping_fragment:Zd,tonemapping_pars_fragment:Jd,transmission_fragment:Kd,transmission_pars_fragment:$d,uv_pars_fragment:jd,uv_pars_vertex:Qd,uv_vertex:tp,worldpos_vertex:ep,background_vert:np,background_frag:ip,backgroundCube_vert:rp,backgroundCube_frag:sp,cube_vert:op,cube_frag:ap,depth_vert:cp,depth_frag:lp,distanceRGBA_vert:up,distanceRGBA_frag:hp,equirect_vert:fp,equirect_frag:dp,linedashed_vert:pp,linedashed_frag:mp,meshbasic_vert:gp,meshbasic_frag:_p,meshlambert_vert:vp,meshlambert_frag:xp,meshmatcap_vert:Mp,meshmatcap_frag:Sp,meshnormal_vert:yp,meshnormal_frag:Ep,meshphong_vert:bp,meshphong_frag:Tp,meshphysical_vert:Ap,meshphysical_frag:wp,meshtoon_vert:Rp,meshtoon_frag:Cp,points_vert:Pp,points_frag:Lp,shadow_vert:Dp,shadow_frag:Ip,sprite_vert:Up,sprite_frag:Np},vt={common:{diffuse:{value:new Zt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Yt},alphaMap:{value:null},alphaMapTransform:{value:new Yt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Yt}},envmap:{envMap:{value:null},envMapRotation:{value:new Yt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Yt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Yt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Yt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Yt},normalScale:{value:new lt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Yt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Yt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Yt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Yt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Zt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Zt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Yt},alphaTest:{value:0},uvTransform:{value:new Yt}},sprite:{diffuse:{value:new Zt(16777215)},opacity:{value:1},center:{value:new lt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Yt},alphaMap:{value:null},alphaMapTransform:{value:new Yt},alphaTest:{value:0}}},tn={basic:{uniforms:Ae([vt.common,vt.specularmap,vt.envmap,vt.aomap,vt.lightmap,vt.fog]),vertexShader:Jt.meshbasic_vert,fragmentShader:Jt.meshbasic_frag},lambert:{uniforms:Ae([vt.common,vt.specularmap,vt.envmap,vt.aomap,vt.lightmap,vt.emissivemap,vt.bumpmap,vt.normalmap,vt.displacementmap,vt.fog,vt.lights,{emissive:{value:new Zt(0)}}]),vertexShader:Jt.meshlambert_vert,fragmentShader:Jt.meshlambert_frag},phong:{uniforms:Ae([vt.common,vt.specularmap,vt.envmap,vt.aomap,vt.lightmap,vt.emissivemap,vt.bumpmap,vt.normalmap,vt.displacementmap,vt.fog,vt.lights,{emissive:{value:new Zt(0)},specular:{value:new Zt(1118481)},shininess:{value:30}}]),vertexShader:Jt.meshphong_vert,fragmentShader:Jt.meshphong_frag},standard:{uniforms:Ae([vt.common,vt.envmap,vt.aomap,vt.lightmap,vt.emissivemap,vt.bumpmap,vt.normalmap,vt.displacementmap,vt.roughnessmap,vt.metalnessmap,vt.fog,vt.lights,{emissive:{value:new Zt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Jt.meshphysical_vert,fragmentShader:Jt.meshphysical_frag},toon:{uniforms:Ae([vt.common,vt.aomap,vt.lightmap,vt.emissivemap,vt.bumpmap,vt.normalmap,vt.displacementmap,vt.gradientmap,vt.fog,vt.lights,{emissive:{value:new Zt(0)}}]),vertexShader:Jt.meshtoon_vert,fragmentShader:Jt.meshtoon_frag},matcap:{uniforms:Ae([vt.common,vt.bumpmap,vt.normalmap,vt.displacementmap,vt.fog,{matcap:{value:null}}]),vertexShader:Jt.meshmatcap_vert,fragmentShader:Jt.meshmatcap_frag},points:{uniforms:Ae([vt.points,vt.fog]),vertexShader:Jt.points_vert,fragmentShader:Jt.points_frag},dashed:{uniforms:Ae([vt.common,vt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Jt.linedashed_vert,fragmentShader:Jt.linedashed_frag},depth:{uniforms:Ae([vt.common,vt.displacementmap]),vertexShader:Jt.depth_vert,fragmentShader:Jt.depth_frag},normal:{uniforms:Ae([vt.common,vt.bumpmap,vt.normalmap,vt.displacementmap,{opacity:{value:1}}]),vertexShader:Jt.meshnormal_vert,fragmentShader:Jt.meshnormal_frag},sprite:{uniforms:Ae([vt.sprite,vt.fog]),vertexShader:Jt.sprite_vert,fragmentShader:Jt.sprite_frag},background:{uniforms:{uvTransform:{value:new Yt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Jt.background_vert,fragmentShader:Jt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Yt}},vertexShader:Jt.backgroundCube_vert,fragmentShader:Jt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Jt.cube_vert,fragmentShader:Jt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Jt.equirect_vert,fragmentShader:Jt.equirect_frag},distanceRGBA:{uniforms:Ae([vt.common,vt.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Jt.distanceRGBA_vert,fragmentShader:Jt.distanceRGBA_frag},shadow:{uniforms:Ae([vt.lights,vt.fog,{color:{value:new Zt(0)},opacity:{value:1}}]),vertexShader:Jt.shadow_vert,fragmentShader:Jt.shadow_frag}};tn.physical={uniforms:Ae([tn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Yt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Yt},clearcoatNormalScale:{value:new lt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Yt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Yt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Yt},sheen:{value:0},sheenColor:{value:new Zt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Yt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Yt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Yt},transmissionSamplerSize:{value:new lt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Yt},attenuationDistance:{value:0},attenuationColor:{value:new Zt(0)},specularColor:{value:new Zt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Yt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Yt},anisotropyVector:{value:new lt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Yt}}]),vertexShader:Jt.meshphysical_vert,fragmentShader:Jt.meshphysical_frag};const Rr={r:0,b:0,g:0},Fn=new sn,Fp=new ae;function Op(i,t,e,n,r,s,o){const a=new Zt(0);let l=s===!0?0:1,c,u,h=null,f=0,d=null;function g(x){let v=x.isScene===!0?x.background:null;return v&&v.isTexture&&(v=(x.backgroundBlurriness>0?e:t).get(v)),v}function _(x){let v=!1;const A=g(x);A===null?p(a,l):A&&A.isColor&&(p(A,1),v=!0);const w=i.xr.getEnvironmentBlendMode();w==="additive"?n.buffers.color.setClear(0,0,0,1,o):w==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(x,v){const A=g(v);A&&(A.isCubeTexture||A.mapping===qr)?(u===void 0&&(u=new je(new Cn(1,1,1),new Xe({name:"BackgroundCubeMaterial",uniforms:yi(tn.backgroundCube.uniforms),vertexShader:tn.backgroundCube.vertexShader,fragmentShader:tn.backgroundCube.fragmentShader,side:Re,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(w,b,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),Fn.copy(v.backgroundRotation),Fn.x*=-1,Fn.y*=-1,Fn.z*=-1,A.isCubeTexture&&A.isRenderTargetTexture===!1&&(Fn.y*=-1,Fn.z*=-1),u.material.uniforms.envMap.value=A,u.material.uniforms.flipEnvMap.value=A.isCubeTexture&&A.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Fp.makeRotationFromEuler(Fn)),u.material.toneMapped=Qt.getTransfer(A.colorSpace)!==ne,(h!==A||f!==A.version||d!==i.toneMapping)&&(u.material.needsUpdate=!0,h=A,f=A.version,d=i.toneMapping),u.layers.enableAll(),x.unshift(u,u.geometry,u.material,0,0,null)):A&&A.isTexture&&(c===void 0&&(c=new je(new Zn(2,2),new Xe({name:"BackgroundMaterial",uniforms:yi(tn.background.uniforms),vertexShader:tn.background.vertexShader,fragmentShader:tn.background.fragmentShader,side:Rn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=A,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.toneMapped=Qt.getTransfer(A.colorSpace)!==ne,A.matrixAutoUpdate===!0&&A.updateMatrix(),c.material.uniforms.uvTransform.value.copy(A.matrix),(h!==A||f!==A.version||d!==i.toneMapping)&&(c.material.needsUpdate=!0,h=A,f=A.version,d=i.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null))}function p(x,v){x.getRGB(Rr,Zc(i)),n.buffers.color.setClear(Rr.r,Rr.g,Rr.b,v,o)}function M(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(x,v=1){a.set(x),l=v,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(x){l=x,p(a,l)},render:_,addToRenderList:m,dispose:M}}function Bp(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=f(null);let s=r,o=!1;function a(E,P,z,V,U){let k=!1;const H=h(V,z,P);s!==H&&(s=H,c(s.object)),k=d(E,V,z,U),k&&g(E,V,z,U),U!==null&&t.update(U,i.ELEMENT_ARRAY_BUFFER),(k||o)&&(o=!1,v(E,P,z,V),U!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(U).buffer))}function l(){return i.createVertexArray()}function c(E){return i.bindVertexArray(E)}function u(E){return i.deleteVertexArray(E)}function h(E,P,z){const V=z.wireframe===!0;let U=n[E.id];U===void 0&&(U={},n[E.id]=U);let k=U[P.id];k===void 0&&(k={},U[P.id]=k);let H=k[V];return H===void 0&&(H=f(l()),k[V]=H),H}function f(E){const P=[],z=[],V=[];for(let U=0;U<e;U++)P[U]=0,z[U]=0,V[U]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:z,attributeDivisors:V,object:E,attributes:{},index:null}}function d(E,P,z,V){const U=s.attributes,k=P.attributes;let H=0;const J=z.getAttributes();for(const G in J)if(J[G].location>=0){const K=U[G];let j=k[G];if(j===void 0&&(G==="instanceMatrix"&&E.instanceMatrix&&(j=E.instanceMatrix),G==="instanceColor"&&E.instanceColor&&(j=E.instanceColor)),K===void 0||K.attribute!==j||j&&K.data!==j.data)return!0;H++}return s.attributesNum!==H||s.index!==V}function g(E,P,z,V){const U={},k=P.attributes;let H=0;const J=z.getAttributes();for(const G in J)if(J[G].location>=0){let K=k[G];K===void 0&&(G==="instanceMatrix"&&E.instanceMatrix&&(K=E.instanceMatrix),G==="instanceColor"&&E.instanceColor&&(K=E.instanceColor));const j={};j.attribute=K,K&&K.data&&(j.data=K.data),U[G]=j,H++}s.attributes=U,s.attributesNum=H,s.index=V}function _(){const E=s.newAttributes;for(let P=0,z=E.length;P<z;P++)E[P]=0}function m(E){p(E,0)}function p(E,P){const z=s.newAttributes,V=s.enabledAttributes,U=s.attributeDivisors;z[E]=1,V[E]===0&&(i.enableVertexAttribArray(E),V[E]=1),U[E]!==P&&(i.vertexAttribDivisor(E,P),U[E]=P)}function M(){const E=s.newAttributes,P=s.enabledAttributes;for(let z=0,V=P.length;z<V;z++)P[z]!==E[z]&&(i.disableVertexAttribArray(z),P[z]=0)}function x(E,P,z,V,U,k,H){H===!0?i.vertexAttribIPointer(E,P,z,U,k):i.vertexAttribPointer(E,P,z,V,U,k)}function v(E,P,z,V){_();const U=V.attributes,k=z.getAttributes(),H=P.defaultAttributeValues;for(const J in k){const G=k[J];if(G.location>=0){let X=U[J];if(X===void 0&&(J==="instanceMatrix"&&E.instanceMatrix&&(X=E.instanceMatrix),J==="instanceColor"&&E.instanceColor&&(X=E.instanceColor)),X!==void 0){const K=X.normalized,j=X.itemSize,ct=t.get(X);if(ct===void 0)continue;const Et=ct.buffer,xt=ct.type,B=ct.bytesPerElement,it=xt===i.INT||xt===i.UNSIGNED_INT||X.gpuType===No;if(X.isInterleavedBufferAttribute){const rt=X.data,bt=rt.stride,Tt=X.offset;if(rt.isInstancedInterleavedBuffer){for(let Ut=0;Ut<G.locationSize;Ut++)p(G.location+Ut,rt.meshPerAttribute);E.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=rt.meshPerAttribute*rt.count)}else for(let Ut=0;Ut<G.locationSize;Ut++)m(G.location+Ut);i.bindBuffer(i.ARRAY_BUFFER,Et);for(let Ut=0;Ut<G.locationSize;Ut++)x(G.location+Ut,j/G.locationSize,xt,K,bt*B,(Tt+j/G.locationSize*Ut)*B,it)}else{if(X.isInstancedBufferAttribute){for(let rt=0;rt<G.locationSize;rt++)p(G.location+rt,X.meshPerAttribute);E.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=X.meshPerAttribute*X.count)}else for(let rt=0;rt<G.locationSize;rt++)m(G.location+rt);i.bindBuffer(i.ARRAY_BUFFER,Et);for(let rt=0;rt<G.locationSize;rt++)x(G.location+rt,j/G.locationSize,xt,K,j*B,j/G.locationSize*rt*B,it)}}else if(H!==void 0){const K=H[J];if(K!==void 0)switch(K.length){case 2:i.vertexAttrib2fv(G.location,K);break;case 3:i.vertexAttrib3fv(G.location,K);break;case 4:i.vertexAttrib4fv(G.location,K);break;default:i.vertexAttrib1fv(G.location,K)}}}}M()}function A(){R();for(const E in n){const P=n[E];for(const z in P){const V=P[z];for(const U in V)u(V[U].object),delete V[U];delete P[z]}delete n[E]}}function w(E){if(n[E.id]===void 0)return;const P=n[E.id];for(const z in P){const V=P[z];for(const U in V)u(V[U].object),delete V[U];delete P[z]}delete n[E.id]}function b(E){for(const P in n){const z=n[P];if(z[E.id]===void 0)continue;const V=z[E.id];for(const U in V)u(V[U].object),delete V[U];delete z[E.id]}}function R(){y(),o=!0,s!==r&&(s=r,c(s.object))}function y(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:R,resetDefaultState:y,dispose:A,releaseStatesOfGeometry:w,releaseStatesOfProgram:b,initAttributes:_,enableAttribute:m,disableUnusedAttributes:M}}function zp(i,t,e){let n;function r(c){n=c}function s(c,u){i.drawArrays(n,c,u),e.update(u,n,1)}function o(c,u,h){h!==0&&(i.drawArraysInstanced(n,c,u,h),e.update(u,n,h))}function a(c,u,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,u,0,h);let d=0;for(let g=0;g<h;g++)d+=u[g];e.update(d,n,1)}function l(c,u,h,f){if(h===0)return;const d=t.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<c.length;g++)o(c[g],u[g],f[g]);else{d.multiDrawArraysInstancedWEBGL(n,c,0,u,0,f,0,h);let g=0;for(let _=0;_<h;_++)g+=u[_]*f[_];e.update(g,n,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function kp(i,t,e,n){let r;function s(){if(r!==void 0)return r;if(t.has("EXT_texture_filter_anisotropic")===!0){const b=t.get("EXT_texture_filter_anisotropic");r=i.getParameter(b.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(b){return!(b!==Ge&&n.convert(b)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(b){const R=b===Qi&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(b!==rn&&n.convert(b)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&b!==mn&&!R)}function l(b){if(b==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";b="mediump"}return b==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const h=e.logarithmicDepthBuffer===!0,f=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),M=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),x=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),A=g>0,w=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:h,reversedDepthBuffer:f,maxTextures:d,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:M,maxVaryings:x,maxFragmentUniforms:v,vertexTextures:A,maxSamples:w}}function Hp(i){const t=this;let e=null,n=0,r=!1,s=!1;const o=new zn,a=new Yt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const d=h.length!==0||f||n!==0||r;return r=f,n=h.length,d},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,f){e=u(h,f,0)},this.setState=function(h,f,d){const g=h.clippingPlanes,_=h.clipIntersection,m=h.clipShadows,p=i.get(h);if(!r||g===null||g.length===0||s&&!m)s?u(null):c();else{const M=s?0:n,x=M*4;let v=p.clippingState||null;l.value=v,v=u(g,f,x,d);for(let A=0;A!==x;++A)v[A]=e[A];p.clippingState=v,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function u(h,f,d,g){const _=h!==null?h.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const p=d+_*4,M=f.matrixWorldInverse;a.getNormalMatrix(M),(m===null||m.length<p)&&(m=new Float32Array(p));for(let x=0,v=d;x!==_;++x,v+=4)o.copy(h[x]).applyMatrix4(M,a),o.normal.toArray(m,v),m[v+3]=o.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}function Vp(i){let t=new WeakMap;function e(o,a){return a===zr?o.mapping=vi:a===Js&&(o.mapping=xi),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===zr||a===Js)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new nh(l.height);return c.fromEquirectangularTexture(i,o),t.set(o,c),o.addEventListener("dispose",r),e(c.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function s(){t=new WeakMap}return{get:n,dispose:s}}const di=4,Xa=[.125,.215,.35,.446,.526,.582],Vn=20,Rs=new $h,qa=new Zt;let Cs=null,Ps=0,Ls=0,Ds=!1;const kn=(1+Math.sqrt(5))/2,hi=1/kn,Ya=[new D(-kn,hi,0),new D(kn,hi,0),new D(-hi,0,kn),new D(hi,0,kn),new D(0,kn,-hi),new D(0,kn,hi),new D(-1,1,-1),new D(1,1,-1),new D(-1,1,1),new D(1,1,1)],Gp=new D;class Za{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,r=100,s={}){const{size:o=256,position:a=Gp}=s;Cs=this._renderer.getRenderTarget(),Ps=this._renderer.getActiveCubeFace(),Ls=this._renderer.getActiveMipmapLevel(),Ds=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,n,r,l,a),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=$a(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ka(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Cs,Ps,Ls),this._renderer.xr.enabled=Ds,t.scissorTest=!1,Cr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===vi||t.mapping===xi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Cs=this._renderer.getRenderTarget(),Ps=this._renderer.getActiveCubeFace(),Ls=this._renderer.getActiveMipmapLevel(),Ds=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:$e,minFilter:$e,generateMipmaps:!1,type:Qi,format:Ge,colorSpace:Mi,depthBuffer:!1},r=Ja(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ja(t,e,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Wp(s)),this._blurMaterial=Xp(s,t,e)}return r}_compileMaterial(t){const e=new je(this._lodPlanes[0],t);this._renderer.compile(e,Rs)}_sceneToCubeUV(t,e,n,r,s){const l=new Pe(90,1,e,n),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],h=this._renderer,f=h.autoClear,d=h.toneMapping;h.getClearColor(qa),h.toneMapping=wn,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(r),h.clearDepth(),h.setRenderTarget(null));const _=new Zr({name:"PMREM.Background",side:Re,depthWrite:!1,depthTest:!1}),m=new je(new Cn,_);let p=!1;const M=t.background;M?M.isColor&&(_.color.copy(M),t.background=null,p=!0):(_.color.copy(qa),p=!0);for(let x=0;x<6;x++){const v=x%3;v===0?(l.up.set(0,c[x],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[x],s.y,s.z)):v===1?(l.up.set(0,0,c[x]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[x],s.z)):(l.up.set(0,c[x],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[x]));const A=this._cubeSize;Cr(r,v*A,x>2?A:0,A,A),h.setRenderTarget(r),p&&h.render(m,l),h.render(t,l)}m.geometry.dispose(),m.material.dispose(),h.toneMapping=d,h.autoClear=f,t.background=M}_textureToCubeUV(t,e){const n=this._renderer,r=t.mapping===vi||t.mapping===xi;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=$a()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ka());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new je(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=t;const l=this._cubeSize;Cr(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,Rs)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=Ya[(r-s-1)%Ya.length];this._blur(t,s-1,s,o,a)}e.autoClear=n}_blur(t,e,n,r,s){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,r,"latitudinal",s),this._halfBlur(o,t,n,n,r,"longitudinal",s)}_halfBlur(t,e,n,r,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new je(this._lodPlanes[r],c),f=c.uniforms,d=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*d):2*Math.PI/(2*Vn-1),_=s/g,m=isFinite(s)?1+Math.floor(u*_):Vn;m>Vn&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Vn}`);const p=[];let M=0;for(let b=0;b<Vn;++b){const R=b/_,y=Math.exp(-R*R/2);p.push(y),b===0?M+=y:b<m&&(M+=2*y)}for(let b=0;b<p.length;b++)p[b]=p[b]/M;f.envMap.value=t.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:x}=this;f.dTheta.value=g,f.mipInt.value=x-n;const v=this._sizeLods[r],A=3*v*(r>x-di?r-x+di:0),w=4*(this._cubeSize-v);Cr(e,A,w,3*v,2*v),l.setRenderTarget(e),l.render(h,Rs)}}function Wp(i){const t=[],e=[],n=[];let r=i;const s=i-di+1+Xa.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);e.push(a);let l=1/a;o>i-di?l=Xa[o-i+di-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),u=-c,h=1+c,f=[u,u,h,u,h,h,u,u,h,h,u,h],d=6,g=6,_=3,m=2,p=1,M=new Float32Array(_*g*d),x=new Float32Array(m*g*d),v=new Float32Array(p*g*d);for(let w=0;w<d;w++){const b=w%3*2/3-1,R=w>2?0:-1,y=[b,R,0,b+2/3,R,0,b+2/3,R+1,0,b,R,0,b+2/3,R+1,0,b,R+1,0];M.set(y,_*g*w),x.set(f,m*g*w);const E=[w,w,w,w,w,w];v.set(E,p*g*w)}const A=new fe;A.setAttribute("position",new We(M,_)),A.setAttribute("uv",new We(x,m)),A.setAttribute("faceIndex",new We(v,p)),t.push(A),r>di&&r--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Ja(i,t,e){const n=new qn(i,t,e);return n.texture.mapping=qr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Cr(i,t,e,n,r){i.viewport.set(t,e,n,r),i.scissor.set(t,e,n,r)}function Xp(i,t,e){const n=new Float32Array(Vn),r=new D(0,1,0);return new Xe({name:"SphericalGaussianBlur",defines:{n:Vn,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:ta(),fragmentShader:`

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
		`,blending:An,depthTest:!1,depthWrite:!1})}function Ka(){return new Xe({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ta(),fragmentShader:`

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
		`,blending:An,depthTest:!1,depthWrite:!1})}function $a(){return new Xe({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ta(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:An,depthTest:!1,depthWrite:!1})}function ta(){return`

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
	`}function qp(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===zr||l===Js,u=l===vi||l===xi;if(c||u){let h=t.get(a);const f=h!==void 0?h.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return e===null&&(e=new Za(i)),h=c?e.fromEquirectangular(a,h):e.fromCubemap(a,h),h.texture.pmremVersion=a.pmremVersion,t.set(a,h),h.texture;if(h!==void 0)return h.texture;{const d=a.image;return c&&d&&d.height>0||u&&d&&r(d)?(e===null&&(e=new Za(i)),h=c?e.fromEquirectangular(a):e.fromCubemap(a),h.texture.pmremVersion=a.pmremVersion,t.set(a,h),a.addEventListener("dispose",s),h.texture):null}}}return a}function r(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function Yp(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return t[n]=r,r}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const r=e(n);return r===null&&mi("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function Zp(i,t,e,n){const r={},s=new WeakMap;function o(h){const f=h.target;f.index!==null&&t.remove(f.index);for(const g in f.attributes)t.remove(f.attributes[g]);f.removeEventListener("dispose",o),delete r[f.id];const d=s.get(f);d&&(t.remove(d),s.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function a(h,f){return r[f.id]===!0||(f.addEventListener("dispose",o),r[f.id]=!0,e.memory.geometries++),f}function l(h){const f=h.attributes;for(const d in f)t.update(f[d],i.ARRAY_BUFFER)}function c(h){const f=[],d=h.index,g=h.attributes.position;let _=0;if(d!==null){const M=d.array;_=d.version;for(let x=0,v=M.length;x<v;x+=3){const A=M[x+0],w=M[x+1],b=M[x+2];f.push(A,w,w,b,b,A)}}else if(g!==void 0){const M=g.array;_=g.version;for(let x=0,v=M.length/3-1;x<v;x+=3){const A=x+0,w=x+1,b=x+2;f.push(A,w,w,b,b,A)}}else return;const m=new(Hc(f)?Yc:qc)(f,1);m.version=_;const p=s.get(h);p&&t.remove(p),s.set(h,m)}function u(h){const f=s.get(h);if(f){const d=h.index;d!==null&&f.version<d.version&&c(h)}else c(h);return s.get(h)}return{get:a,update:l,getWireframeAttribute:u}}function Jp(i,t,e){let n;function r(f){n=f}let s,o;function a(f){s=f.type,o=f.bytesPerElement}function l(f,d){i.drawElements(n,d,s,f*o),e.update(d,n,1)}function c(f,d,g){g!==0&&(i.drawElementsInstanced(n,d,s,f*o,g),e.update(d,n,g))}function u(f,d,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,s,f,0,g);let m=0;for(let p=0;p<g;p++)m+=d[p];e.update(m,n,1)}function h(f,d,g,_){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<f.length;p++)c(f[p]/o,d[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(n,d,0,s,f,0,_,0,g);let p=0;for(let M=0;M<g;M++)p+=d[M]*_[M];e.update(p,n,1)}}this.setMode=r,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function Kp(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(s/3);break;case i.LINES:e.lines+=a*(s/2);break;case i.LINE_STRIP:e.lines+=a*(s-1);break;case i.LINE_LOOP:e.lines+=a*s;break;case i.POINTS:e.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:r,update:n}}function $p(i,t,e){const n=new WeakMap,r=new ie;function s(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=u!==void 0?u.length:0;let f=n.get(a);if(f===void 0||f.count!==h){let E=function(){R.dispose(),n.delete(a),a.removeEventListener("dispose",E)};var d=E;f!==void 0&&f.texture.dispose();const g=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],M=a.morphAttributes.normal||[],x=a.morphAttributes.color||[];let v=0;g===!0&&(v=1),_===!0&&(v=2),m===!0&&(v=3);let A=a.attributes.position.count*v,w=1;A>t.maxTextureSize&&(w=Math.ceil(A/t.maxTextureSize),A=t.maxTextureSize);const b=new Float32Array(A*w*4*h),R=new Vc(b,A,w,h);R.type=mn,R.needsUpdate=!0;const y=v*4;for(let P=0;P<h;P++){const z=p[P],V=M[P],U=x[P],k=A*w*4*P;for(let H=0;H<z.count;H++){const J=H*y;g===!0&&(r.fromBufferAttribute(z,H),b[k+J+0]=r.x,b[k+J+1]=r.y,b[k+J+2]=r.z,b[k+J+3]=0),_===!0&&(r.fromBufferAttribute(V,H),b[k+J+4]=r.x,b[k+J+5]=r.y,b[k+J+6]=r.z,b[k+J+7]=0),m===!0&&(r.fromBufferAttribute(U,H),b[k+J+8]=r.x,b[k+J+9]=r.y,b[k+J+10]=r.z,b[k+J+11]=U.itemSize===4?r.w:1)}}f={count:h,texture:R,size:new lt(A,w)},n.set(a,f),a.addEventListener("dispose",E)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const _=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(i,"morphTargetBaseInfluence",_),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",f.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:s}}function jp(i,t,e,n){let r=new WeakMap;function s(l){const c=n.render.frame,u=l.geometry,h=t.get(l,u);if(r.get(h)!==c&&(t.update(h),r.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==c&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;r.get(f)!==c&&(f.update(),r.set(f,c))}return h}function o(){r=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:s,dispose:o}}const hl=new ye,ja=new $c(1,1),fl=new Vc,dl=new zu,pl=new Kc,Qa=[],tc=[],ec=new Float32Array(16),nc=new Float32Array(9),ic=new Float32Array(4);function wi(i,t,e){const n=i[0];if(n<=0||n>0)return i;const r=t*e;let s=Qa[r];if(s===void 0&&(s=new Float32Array(r),Qa[r]=s),t!==0){n.toArray(s,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(s,a)}return s}function ge(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function _e(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function $r(i,t){let e=tc[t];e===void 0&&(e=new Int32Array(t),tc[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Qp(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function tm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ge(e,t))return;i.uniform2fv(this.addr,t),_e(e,t)}}function em(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(ge(e,t))return;i.uniform3fv(this.addr,t),_e(e,t)}}function nm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ge(e,t))return;i.uniform4fv(this.addr,t),_e(e,t)}}function im(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(ge(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),_e(e,t)}else{if(ge(e,n))return;ic.set(n),i.uniformMatrix2fv(this.addr,!1,ic),_e(e,n)}}function rm(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(ge(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),_e(e,t)}else{if(ge(e,n))return;nc.set(n),i.uniformMatrix3fv(this.addr,!1,nc),_e(e,n)}}function sm(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(ge(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),_e(e,t)}else{if(ge(e,n))return;ec.set(n),i.uniformMatrix4fv(this.addr,!1,ec),_e(e,n)}}function om(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function am(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ge(e,t))return;i.uniform2iv(this.addr,t),_e(e,t)}}function cm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ge(e,t))return;i.uniform3iv(this.addr,t),_e(e,t)}}function lm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ge(e,t))return;i.uniform4iv(this.addr,t),_e(e,t)}}function um(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function hm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ge(e,t))return;i.uniform2uiv(this.addr,t),_e(e,t)}}function fm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ge(e,t))return;i.uniform3uiv(this.addr,t),_e(e,t)}}function dm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ge(e,t))return;i.uniform4uiv(this.addr,t),_e(e,t)}}function pm(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_2D_SHADOW?(ja.compareFunction=zc,s=ja):s=hl,e.setTexture2D(t||s,r)}function mm(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTexture3D(t||dl,r)}function gm(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTextureCube(t||pl,r)}function _m(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTexture2DArray(t||fl,r)}function vm(i){switch(i){case 5126:return Qp;case 35664:return tm;case 35665:return em;case 35666:return nm;case 35674:return im;case 35675:return rm;case 35676:return sm;case 5124:case 35670:return om;case 35667:case 35671:return am;case 35668:case 35672:return cm;case 35669:case 35673:return lm;case 5125:return um;case 36294:return hm;case 36295:return fm;case 36296:return dm;case 35678:case 36198:case 36298:case 36306:case 35682:return pm;case 35679:case 36299:case 36307:return mm;case 35680:case 36300:case 36308:case 36293:return gm;case 36289:case 36303:case 36311:case 36292:return _m}}function xm(i,t){i.uniform1fv(this.addr,t)}function Mm(i,t){const e=wi(t,this.size,2);i.uniform2fv(this.addr,e)}function Sm(i,t){const e=wi(t,this.size,3);i.uniform3fv(this.addr,e)}function ym(i,t){const e=wi(t,this.size,4);i.uniform4fv(this.addr,e)}function Em(i,t){const e=wi(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function bm(i,t){const e=wi(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Tm(i,t){const e=wi(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Am(i,t){i.uniform1iv(this.addr,t)}function wm(i,t){i.uniform2iv(this.addr,t)}function Rm(i,t){i.uniform3iv(this.addr,t)}function Cm(i,t){i.uniform4iv(this.addr,t)}function Pm(i,t){i.uniform1uiv(this.addr,t)}function Lm(i,t){i.uniform2uiv(this.addr,t)}function Dm(i,t){i.uniform3uiv(this.addr,t)}function Im(i,t){i.uniform4uiv(this.addr,t)}function Um(i,t,e){const n=this.cache,r=t.length,s=$r(e,r);ge(n,s)||(i.uniform1iv(this.addr,s),_e(n,s));for(let o=0;o!==r;++o)e.setTexture2D(t[o]||hl,s[o])}function Nm(i,t,e){const n=this.cache,r=t.length,s=$r(e,r);ge(n,s)||(i.uniform1iv(this.addr,s),_e(n,s));for(let o=0;o!==r;++o)e.setTexture3D(t[o]||dl,s[o])}function Fm(i,t,e){const n=this.cache,r=t.length,s=$r(e,r);ge(n,s)||(i.uniform1iv(this.addr,s),_e(n,s));for(let o=0;o!==r;++o)e.setTextureCube(t[o]||pl,s[o])}function Om(i,t,e){const n=this.cache,r=t.length,s=$r(e,r);ge(n,s)||(i.uniform1iv(this.addr,s),_e(n,s));for(let o=0;o!==r;++o)e.setTexture2DArray(t[o]||fl,s[o])}function Bm(i){switch(i){case 5126:return xm;case 35664:return Mm;case 35665:return Sm;case 35666:return ym;case 35674:return Em;case 35675:return bm;case 35676:return Tm;case 5124:case 35670:return Am;case 35667:case 35671:return wm;case 35668:case 35672:return Rm;case 35669:case 35673:return Cm;case 5125:return Pm;case 36294:return Lm;case 36295:return Dm;case 36296:return Im;case 35678:case 36198:case 36298:case 36306:case 35682:return Um;case 35679:case 36299:case 36307:return Nm;case 35680:case 36300:case 36308:case 36293:return Fm;case 36289:case 36303:case 36311:case 36292:return Om}}class zm{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=vm(e.type)}}class km{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Bm(e.type)}}class Hm{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(t,e[a.id],n)}}}const Is=/(\w+)(\])?(\[|\.)?/g;function rc(i,t){i.seq.push(t),i.map[t.id]=t}function Vm(i,t,e){const n=i.name,r=n.length;for(Is.lastIndex=0;;){const s=Is.exec(n),o=Is.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){rc(e,c===void 0?new zm(a,i,t):new km(a,i,t));break}else{let h=e.map[a];h===void 0&&(h=new Hm(a),rc(e,h)),e=h}}}class Or{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){const s=t.getActiveUniform(e,r),o=t.getUniformLocation(e,s.name);Vm(s,o,this)}}setValue(t,e,n,r){const s=this.map[e];s!==void 0&&s.setValue(t,n,r)}setOptional(t,e,n){const r=e[n];r!==void 0&&this.setValue(t,n,r)}static upload(t,e,n,r){for(let s=0,o=e.length;s!==o;++s){const a=e[s],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,r)}}static seqWithValue(t,e){const n=[];for(let r=0,s=t.length;r!==s;++r){const o=t[r];o.id in e&&n.push(o)}return n}}function sc(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const Gm=37297;let Wm=0;function Xm(i,t){const e=i.split(`
`),n=[],r=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let o=r;o<s;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const oc=new Yt;function qm(i){Qt._getMatrix(oc,Qt.workingColorSpace,i);const t=`mat3( ${oc.elements.map(e=>e.toFixed(4))} )`;switch(Qt.getTransfer(i)){case kr:return[t,"LinearTransferOETF"];case ne:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function ac(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),s=(i.getShaderInfoLog(t)||"").trim();if(n&&s==="")return"";const o=/ERROR: 0:(\d+)/.exec(s);if(o){const a=parseInt(o[1]);return e.toUpperCase()+`

`+s+`

`+Xm(i.getShaderSource(t),a)}else return s}function Ym(i,t){const e=qm(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function Zm(i,t){let e;switch(t){case Ql:e="Linear";break;case tu:e="Reinhard";break;case eu:e="Cineon";break;case Rc:e="ACESFilmic";break;case iu:e="AgX";break;case ru:e="Neutral";break;case nu:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Pr=new D;function Jm(){Qt.getLuminanceCoefficients(Pr);const i=Pr.x.toFixed(4),t=Pr.y.toFixed(4),e=Pr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Km(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Bi).join(`
`)}function $m(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function jm(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(t,r),o=s.name;let a=1;s.type===i.FLOAT_MAT2&&(a=2),s.type===i.FLOAT_MAT3&&(a=3),s.type===i.FLOAT_MAT4&&(a=4),e[o]={type:s.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function Bi(i){return i!==""}function cc(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function lc(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Qm=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ro(i){return i.replace(Qm,e0)}const t0=new Map;function e0(i,t){let e=Jt[t];if(e===void 0){const n=t0.get(t);if(n!==void 0)e=Jt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Ro(e)}const n0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function uc(i){return i.replace(n0,i0)}function i0(i,t,e,n){let r="";for(let s=parseInt(t);s<parseInt(e);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function hc(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}function r0(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Ac?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===Dl?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===dn&&(t="SHADOWMAP_TYPE_VSM"),t}function s0(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case vi:case xi:t="ENVMAP_TYPE_CUBE";break;case qr:t="ENVMAP_TYPE_CUBE_UV";break}return t}function o0(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case xi:t="ENVMAP_MODE_REFRACTION";break}return t}function a0(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case wc:t="ENVMAP_BLENDING_MULTIPLY";break;case $l:t="ENVMAP_BLENDING_MIX";break;case jl:t="ENVMAP_BLENDING_ADD";break}return t}function c0(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function l0(i,t,e,n){const r=i.getContext(),s=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=r0(e),c=s0(e),u=o0(e),h=a0(e),f=c0(e),d=Km(e),g=$m(s),_=r.createProgram();let m,p,M=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Bi).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Bi).join(`
`),p.length>0&&(p+=`
`)):(m=[hc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reversedDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Bi).join(`
`),p=[hc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",e.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reversedDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==wn?"#define TONE_MAPPING":"",e.toneMapping!==wn?Jt.tonemapping_pars_fragment:"",e.toneMapping!==wn?Zm("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Jt.colorspace_pars_fragment,Ym("linearToOutputTexel",e.outputColorSpace),Jm(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Bi).join(`
`)),o=Ro(o),o=cc(o,e),o=lc(o,e),a=Ro(a),a=cc(a,e),a=lc(a,e),o=uc(o),a=uc(a),e.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===ga?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===ga?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const x=M+m+o,v=M+p+a,A=sc(r,r.VERTEX_SHADER,x),w=sc(r,r.FRAGMENT_SHADER,v);r.attachShader(_,A),r.attachShader(_,w),e.index0AttributeName!==void 0?r.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_);function b(P){if(i.debug.checkShaderErrors){const z=r.getProgramInfoLog(_)||"",V=r.getShaderInfoLog(A)||"",U=r.getShaderInfoLog(w)||"",k=z.trim(),H=V.trim(),J=U.trim();let G=!0,X=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if(G=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,_,A,w);else{const K=ac(r,A,"vertex"),j=ac(r,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+k+`
`+K+`
`+j)}else k!==""?console.warn("THREE.WebGLProgram: Program Info Log:",k):(H===""||J==="")&&(X=!1);X&&(P.diagnostics={runnable:G,programLog:k,vertexShader:{log:H,prefix:m},fragmentShader:{log:J,prefix:p}})}r.deleteShader(A),r.deleteShader(w),R=new Or(r,_),y=jm(r,_)}let R;this.getUniforms=function(){return R===void 0&&b(this),R};let y;this.getAttributes=function(){return y===void 0&&b(this),y};let E=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=r.getProgramParameter(_,Gm)),E},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Wm++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=A,this.fragmentShader=w,this}let u0=0;class h0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,r=this._getShaderStage(e),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new f0(t),e.set(t,n)),n}}class f0{constructor(t){this.id=u0++,this.code=t,this.usedTimes=0}}function d0(i,t,e,n,r,s,o){const a=new Wc,l=new h0,c=new Set,u=[],h=r.logarithmicDepthBuffer,f=r.vertexTextures;let d=r.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(y){return c.add(y),y===0?"uv":`uv${y}`}function m(y,E,P,z,V){const U=z.fog,k=V.geometry,H=y.isMeshStandardMaterial?z.environment:null,J=(y.isMeshStandardMaterial?e:t).get(y.envMap||H),G=J&&J.mapping===qr?J.image.height:null,X=g[y.type];y.precision!==null&&(d=r.getMaxPrecision(y.precision),d!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",d,"instead."));const K=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,j=K!==void 0?K.length:0;let ct=0;k.morphAttributes.position!==void 0&&(ct=1),k.morphAttributes.normal!==void 0&&(ct=2),k.morphAttributes.color!==void 0&&(ct=3);let Et,xt,B,it;if(X){const te=tn[X];Et=te.vertexShader,xt=te.fragmentShader}else Et=y.vertexShader,xt=y.fragmentShader,l.update(y),B=l.getVertexShaderID(y),it=l.getFragmentShaderID(y);const rt=i.getRenderTarget(),bt=i.state.buffers.depth.getReversed(),Tt=V.isInstancedMesh===!0,Ut=V.isBatchedMesh===!0,ce=!!y.map,Gt=!!y.matcap,L=!!J,nt=!!y.aoMap,$=!!y.lightMap,ot=!!y.bumpMap,Q=!!y.normalMap,mt=!!y.displacementMap,at=!!y.emissiveMap,gt=!!y.metalnessMap,Wt=!!y.roughnessMap,kt=y.anisotropy>0,C=y.clearcoat>0,S=y.dispersion>0,O=y.iridescence>0,Y=y.sheen>0,st=y.transmission>0,Z=kt&&!!y.anisotropyMap,Dt=C&&!!y.clearcoatMap,pt=C&&!!y.clearcoatNormalMap,Ct=C&&!!y.clearcoatRoughnessMap,Pt=O&&!!y.iridescenceMap,ut=O&&!!y.iridescenceThicknessMap,yt=Y&&!!y.sheenColorMap,Bt=Y&&!!y.sheenRoughnessMap,It=!!y.specularMap,Mt=!!y.specularColorMap,qt=!!y.specularIntensityMap,I=st&&!!y.transmissionMap,dt=st&&!!y.thicknessMap,_t=!!y.gradientMap,wt=!!y.alphaMap,ht=y.alphaTest>0,tt=!!y.alphaHash,Lt=!!y.extensions;let Xt=wn;y.toneMapped&&(rt===null||rt.isXRRenderTarget===!0)&&(Xt=i.toneMapping);const se={shaderID:X,shaderType:y.type,shaderName:y.name,vertexShader:Et,fragmentShader:xt,defines:y.defines,customVertexShaderID:B,customFragmentShaderID:it,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:d,batching:Ut,batchingColor:Ut&&V._colorsTexture!==null,instancing:Tt,instancingColor:Tt&&V.instanceColor!==null,instancingMorph:Tt&&V.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:rt===null?i.outputColorSpace:rt.isXRRenderTarget===!0?rt.texture.colorSpace:Mi,alphaToCoverage:!!y.alphaToCoverage,map:ce,matcap:Gt,envMap:L,envMapMode:L&&J.mapping,envMapCubeUVHeight:G,aoMap:nt,lightMap:$,bumpMap:ot,normalMap:Q,displacementMap:f&&mt,emissiveMap:at,normalMapObjectSpace:Q&&y.normalMapType===cu,normalMapTangentSpace:Q&&y.normalMapType===Bc,metalnessMap:gt,roughnessMap:Wt,anisotropy:kt,anisotropyMap:Z,clearcoat:C,clearcoatMap:Dt,clearcoatNormalMap:pt,clearcoatRoughnessMap:Ct,dispersion:S,iridescence:O,iridescenceMap:Pt,iridescenceThicknessMap:ut,sheen:Y,sheenColorMap:yt,sheenRoughnessMap:Bt,specularMap:It,specularColorMap:Mt,specularIntensityMap:qt,transmission:st,transmissionMap:I,thicknessMap:dt,gradientMap:_t,opaque:y.transparent===!1&&y.blending===pi&&y.alphaToCoverage===!1,alphaMap:wt,alphaTest:ht,alphaHash:tt,combine:y.combine,mapUv:ce&&_(y.map.channel),aoMapUv:nt&&_(y.aoMap.channel),lightMapUv:$&&_(y.lightMap.channel),bumpMapUv:ot&&_(y.bumpMap.channel),normalMapUv:Q&&_(y.normalMap.channel),displacementMapUv:mt&&_(y.displacementMap.channel),emissiveMapUv:at&&_(y.emissiveMap.channel),metalnessMapUv:gt&&_(y.metalnessMap.channel),roughnessMapUv:Wt&&_(y.roughnessMap.channel),anisotropyMapUv:Z&&_(y.anisotropyMap.channel),clearcoatMapUv:Dt&&_(y.clearcoatMap.channel),clearcoatNormalMapUv:pt&&_(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ct&&_(y.clearcoatRoughnessMap.channel),iridescenceMapUv:Pt&&_(y.iridescenceMap.channel),iridescenceThicknessMapUv:ut&&_(y.iridescenceThicknessMap.channel),sheenColorMapUv:yt&&_(y.sheenColorMap.channel),sheenRoughnessMapUv:Bt&&_(y.sheenRoughnessMap.channel),specularMapUv:It&&_(y.specularMap.channel),specularColorMapUv:Mt&&_(y.specularColorMap.channel),specularIntensityMapUv:qt&&_(y.specularIntensityMap.channel),transmissionMapUv:I&&_(y.transmissionMap.channel),thicknessMapUv:dt&&_(y.thicknessMap.channel),alphaMapUv:wt&&_(y.alphaMap.channel),vertexTangents:!!k.attributes.tangent&&(Q||kt),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,pointsUvs:V.isPoints===!0&&!!k.attributes.uv&&(ce||wt),fog:!!U,useFog:y.fog===!0,fogExp2:!!U&&U.isFogExp2,flatShading:y.flatShading===!0&&y.wireframe===!1,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:bt,skinning:V.isSkinnedMesh===!0,morphTargets:k.morphAttributes.position!==void 0,morphNormals:k.morphAttributes.normal!==void 0,morphColors:k.morphAttributes.color!==void 0,morphTargetsCount:j,morphTextureStride:ct,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:y.dithering,shadowMapEnabled:i.shadowMap.enabled&&P.length>0,shadowMapType:i.shadowMap.type,toneMapping:Xt,decodeVideoTexture:ce&&y.map.isVideoTexture===!0&&Qt.getTransfer(y.map.colorSpace)===ne,decodeVideoTextureEmissive:at&&y.emissiveMap.isVideoTexture===!0&&Qt.getTransfer(y.emissiveMap.colorSpace)===ne,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===Le,flipSided:y.side===Re,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:Lt&&y.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Lt&&y.extensions.multiDraw===!0||Ut)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return se.vertexUv1s=c.has(1),se.vertexUv2s=c.has(2),se.vertexUv3s=c.has(3),c.clear(),se}function p(y){const E=[];if(y.shaderID?E.push(y.shaderID):(E.push(y.customVertexShaderID),E.push(y.customFragmentShaderID)),y.defines!==void 0)for(const P in y.defines)E.push(P),E.push(y.defines[P]);return y.isRawShaderMaterial===!1&&(M(E,y),x(E,y),E.push(i.outputColorSpace)),E.push(y.customProgramCacheKey),E.join()}function M(y,E){y.push(E.precision),y.push(E.outputColorSpace),y.push(E.envMapMode),y.push(E.envMapCubeUVHeight),y.push(E.mapUv),y.push(E.alphaMapUv),y.push(E.lightMapUv),y.push(E.aoMapUv),y.push(E.bumpMapUv),y.push(E.normalMapUv),y.push(E.displacementMapUv),y.push(E.emissiveMapUv),y.push(E.metalnessMapUv),y.push(E.roughnessMapUv),y.push(E.anisotropyMapUv),y.push(E.clearcoatMapUv),y.push(E.clearcoatNormalMapUv),y.push(E.clearcoatRoughnessMapUv),y.push(E.iridescenceMapUv),y.push(E.iridescenceThicknessMapUv),y.push(E.sheenColorMapUv),y.push(E.sheenRoughnessMapUv),y.push(E.specularMapUv),y.push(E.specularColorMapUv),y.push(E.specularIntensityMapUv),y.push(E.transmissionMapUv),y.push(E.thicknessMapUv),y.push(E.combine),y.push(E.fogExp2),y.push(E.sizeAttenuation),y.push(E.morphTargetsCount),y.push(E.morphAttributeCount),y.push(E.numDirLights),y.push(E.numPointLights),y.push(E.numSpotLights),y.push(E.numSpotLightMaps),y.push(E.numHemiLights),y.push(E.numRectAreaLights),y.push(E.numDirLightShadows),y.push(E.numPointLightShadows),y.push(E.numSpotLightShadows),y.push(E.numSpotLightShadowsWithMaps),y.push(E.numLightProbes),y.push(E.shadowMapType),y.push(E.toneMapping),y.push(E.numClippingPlanes),y.push(E.numClipIntersection),y.push(E.depthPacking)}function x(y,E){a.disableAll(),E.supportsVertexTextures&&a.enable(0),E.instancing&&a.enable(1),E.instancingColor&&a.enable(2),E.instancingMorph&&a.enable(3),E.matcap&&a.enable(4),E.envMap&&a.enable(5),E.normalMapObjectSpace&&a.enable(6),E.normalMapTangentSpace&&a.enable(7),E.clearcoat&&a.enable(8),E.iridescence&&a.enable(9),E.alphaTest&&a.enable(10),E.vertexColors&&a.enable(11),E.vertexAlphas&&a.enable(12),E.vertexUv1s&&a.enable(13),E.vertexUv2s&&a.enable(14),E.vertexUv3s&&a.enable(15),E.vertexTangents&&a.enable(16),E.anisotropy&&a.enable(17),E.alphaHash&&a.enable(18),E.batching&&a.enable(19),E.dispersion&&a.enable(20),E.batchingColor&&a.enable(21),E.gradientMap&&a.enable(22),y.push(a.mask),a.disableAll(),E.fog&&a.enable(0),E.useFog&&a.enable(1),E.flatShading&&a.enable(2),E.logarithmicDepthBuffer&&a.enable(3),E.reversedDepthBuffer&&a.enable(4),E.skinning&&a.enable(5),E.morphTargets&&a.enable(6),E.morphNormals&&a.enable(7),E.morphColors&&a.enable(8),E.premultipliedAlpha&&a.enable(9),E.shadowMapEnabled&&a.enable(10),E.doubleSided&&a.enable(11),E.flipSided&&a.enable(12),E.useDepthPacking&&a.enable(13),E.dithering&&a.enable(14),E.transmission&&a.enable(15),E.sheen&&a.enable(16),E.opaque&&a.enable(17),E.pointsUvs&&a.enable(18),E.decodeVideoTexture&&a.enable(19),E.decodeVideoTextureEmissive&&a.enable(20),E.alphaToCoverage&&a.enable(21),y.push(a.mask)}function v(y){const E=g[y.type];let P;if(E){const z=tn[E];P=ju.clone(z.uniforms)}else P=y.uniforms;return P}function A(y,E){let P;for(let z=0,V=u.length;z<V;z++){const U=u[z];if(U.cacheKey===E){P=U,++P.usedTimes;break}}return P===void 0&&(P=new l0(i,E,y,s),u.push(P)),P}function w(y){if(--y.usedTimes===0){const E=u.indexOf(y);u[E]=u[u.length-1],u.pop(),y.destroy()}}function b(y){l.remove(y)}function R(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:v,acquireProgram:A,releaseProgram:w,releaseShaderCache:b,programs:u,dispose:R}}function p0(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function r(o,a,l){i.get(o)[a]=l}function s(){i=new WeakMap}return{has:t,get:e,remove:n,update:r,dispose:s}}function m0(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function fc(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function dc(){const i=[];let t=0;const e=[],n=[],r=[];function s(){t=0,e.length=0,n.length=0,r.length=0}function o(h,f,d,g,_,m){let p=i[t];return p===void 0?(p={id:h.id,object:h,geometry:f,material:d,groupOrder:g,renderOrder:h.renderOrder,z:_,group:m},i[t]=p):(p.id=h.id,p.object=h,p.geometry=f,p.material=d,p.groupOrder=g,p.renderOrder=h.renderOrder,p.z=_,p.group=m),t++,p}function a(h,f,d,g,_,m){const p=o(h,f,d,g,_,m);d.transmission>0?n.push(p):d.transparent===!0?r.push(p):e.push(p)}function l(h,f,d,g,_,m){const p=o(h,f,d,g,_,m);d.transmission>0?n.unshift(p):d.transparent===!0?r.unshift(p):e.unshift(p)}function c(h,f){e.length>1&&e.sort(h||m0),n.length>1&&n.sort(f||fc),r.length>1&&r.sort(f||fc)}function u(){for(let h=t,f=i.length;h<f;h++){const d=i[h];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:n,transparent:r,init:s,push:a,unshift:l,finish:u,sort:c}}function g0(){let i=new WeakMap;function t(n,r){const s=i.get(n);let o;return s===void 0?(o=new dc,i.set(n,[o])):r>=s.length?(o=new dc,s.push(o)):o=s[r],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function _0(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new D,color:new Zt};break;case"SpotLight":e={position:new D,direction:new D,color:new Zt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new D,color:new Zt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new D,skyColor:new Zt,groundColor:new Zt};break;case"RectAreaLight":e={color:new Zt,position:new D,halfWidth:new D,halfHeight:new D};break}return i[t.id]=e,e}}}function v0(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new lt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new lt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new lt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let x0=0;function M0(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function S0(i){const t=new _0,e=v0(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new D);const r=new D,s=new ae,o=new ae;function a(c){let u=0,h=0,f=0;for(let y=0;y<9;y++)n.probe[y].set(0,0,0);let d=0,g=0,_=0,m=0,p=0,M=0,x=0,v=0,A=0,w=0,b=0;c.sort(M0);for(let y=0,E=c.length;y<E;y++){const P=c[y],z=P.color,V=P.intensity,U=P.distance,k=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)u+=z.r*V,h+=z.g*V,f+=z.b*V;else if(P.isLightProbe){for(let H=0;H<9;H++)n.probe[H].addScaledVector(P.sh.coefficients[H],V);b++}else if(P.isDirectionalLight){const H=t.get(P);if(H.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const J=P.shadow,G=e.get(P);G.shadowIntensity=J.intensity,G.shadowBias=J.bias,G.shadowNormalBias=J.normalBias,G.shadowRadius=J.radius,G.shadowMapSize=J.mapSize,n.directionalShadow[d]=G,n.directionalShadowMap[d]=k,n.directionalShadowMatrix[d]=P.shadow.matrix,M++}n.directional[d]=H,d++}else if(P.isSpotLight){const H=t.get(P);H.position.setFromMatrixPosition(P.matrixWorld),H.color.copy(z).multiplyScalar(V),H.distance=U,H.coneCos=Math.cos(P.angle),H.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),H.decay=P.decay,n.spot[_]=H;const J=P.shadow;if(P.map&&(n.spotLightMap[A]=P.map,A++,J.updateMatrices(P),P.castShadow&&w++),n.spotLightMatrix[_]=J.matrix,P.castShadow){const G=e.get(P);G.shadowIntensity=J.intensity,G.shadowBias=J.bias,G.shadowNormalBias=J.normalBias,G.shadowRadius=J.radius,G.shadowMapSize=J.mapSize,n.spotShadow[_]=G,n.spotShadowMap[_]=k,v++}_++}else if(P.isRectAreaLight){const H=t.get(P);H.color.copy(z).multiplyScalar(V),H.halfWidth.set(P.width*.5,0,0),H.halfHeight.set(0,P.height*.5,0),n.rectArea[m]=H,m++}else if(P.isPointLight){const H=t.get(P);if(H.color.copy(P.color).multiplyScalar(P.intensity),H.distance=P.distance,H.decay=P.decay,P.castShadow){const J=P.shadow,G=e.get(P);G.shadowIntensity=J.intensity,G.shadowBias=J.bias,G.shadowNormalBias=J.normalBias,G.shadowRadius=J.radius,G.shadowMapSize=J.mapSize,G.shadowCameraNear=J.camera.near,G.shadowCameraFar=J.camera.far,n.pointShadow[g]=G,n.pointShadowMap[g]=k,n.pointShadowMatrix[g]=P.shadow.matrix,x++}n.point[g]=H,g++}else if(P.isHemisphereLight){const H=t.get(P);H.skyColor.copy(P.color).multiplyScalar(V),H.groundColor.copy(P.groundColor).multiplyScalar(V),n.hemi[p]=H,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=vt.LTC_FLOAT_1,n.rectAreaLTC2=vt.LTC_FLOAT_2):(n.rectAreaLTC1=vt.LTC_HALF_1,n.rectAreaLTC2=vt.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=f;const R=n.hash;(R.directionalLength!==d||R.pointLength!==g||R.spotLength!==_||R.rectAreaLength!==m||R.hemiLength!==p||R.numDirectionalShadows!==M||R.numPointShadows!==x||R.numSpotShadows!==v||R.numSpotMaps!==A||R.numLightProbes!==b)&&(n.directional.length=d,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.pointShadow.length=x,n.pointShadowMap.length=x,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=M,n.pointShadowMatrix.length=x,n.spotLightMatrix.length=v+A-w,n.spotLightMap.length=A,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=b,R.directionalLength=d,R.pointLength=g,R.spotLength=_,R.rectAreaLength=m,R.hemiLength=p,R.numDirectionalShadows=M,R.numPointShadows=x,R.numSpotShadows=v,R.numSpotMaps=A,R.numLightProbes=b,n.version=x0++)}function l(c,u){let h=0,f=0,d=0,g=0,_=0;const m=u.matrixWorldInverse;for(let p=0,M=c.length;p<M;p++){const x=c[p];if(x.isDirectionalLight){const v=n.directional[h];v.direction.setFromMatrixPosition(x.matrixWorld),r.setFromMatrixPosition(x.target.matrixWorld),v.direction.sub(r),v.direction.transformDirection(m),h++}else if(x.isSpotLight){const v=n.spot[d];v.position.setFromMatrixPosition(x.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(x.matrixWorld),r.setFromMatrixPosition(x.target.matrixWorld),v.direction.sub(r),v.direction.transformDirection(m),d++}else if(x.isRectAreaLight){const v=n.rectArea[g];v.position.setFromMatrixPosition(x.matrixWorld),v.position.applyMatrix4(m),o.identity(),s.copy(x.matrixWorld),s.premultiply(m),o.extractRotation(s),v.halfWidth.set(x.width*.5,0,0),v.halfHeight.set(0,x.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),g++}else if(x.isPointLight){const v=n.point[f];v.position.setFromMatrixPosition(x.matrixWorld),v.position.applyMatrix4(m),f++}else if(x.isHemisphereLight){const v=n.hemi[_];v.direction.setFromMatrixPosition(x.matrixWorld),v.direction.transformDirection(m),_++}}}return{setup:a,setupView:l,state:n}}function pc(i){const t=new S0(i),e=[],n=[];function r(u){c.camera=u,e.length=0,n.length=0}function s(u){e.push(u)}function o(u){n.push(u)}function a(){t.setup(e)}function l(u){t.setupView(e,u)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function y0(i){let t=new WeakMap;function e(r,s=0){const o=t.get(r);let a;return o===void 0?(a=new pc(i),t.set(r,[a])):s>=o.length?(a=new pc(i),o.push(a)):a=o[s],a}function n(){t=new WeakMap}return{get:e,dispose:n}}const E0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,b0=`uniform sampler2D shadow_pass;
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
}`;function T0(i,t,e){let n=new Go;const r=new lt,s=new lt,o=new ie,a=new Wh({depthPacking:au}),l=new Xh,c={},u=e.maxTextureSize,h={[Rn]:Re,[Re]:Rn,[Le]:Le},f=new Xe({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new lt},radius:{value:4}},vertexShader:E0,fragmentShader:b0}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const g=new fe;g.setAttribute("position",new We(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new je(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ac;let p=this.type;this.render=function(w,b,R){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;const y=i.getRenderTarget(),E=i.getActiveCubeFace(),P=i.getActiveMipmapLevel(),z=i.state;z.setBlending(An),z.buffers.depth.getReversed()?z.buffers.color.setClear(0,0,0,0):z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);const V=p!==dn&&this.type===dn,U=p===dn&&this.type!==dn;for(let k=0,H=w.length;k<H;k++){const J=w[k],G=J.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",J,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;r.copy(G.mapSize);const X=G.getFrameExtents();if(r.multiply(X),s.copy(G.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/X.x),r.x=s.x*X.x,G.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/X.y),r.y=s.y*X.y,G.mapSize.y=s.y)),G.map===null||V===!0||U===!0){const j=this.type!==dn?{minFilter:Be,magFilter:Be}:{};G.map!==null&&G.map.dispose(),G.map=new qn(r.x,r.y,j),G.map.texture.name=J.name+".shadowMap",G.camera.updateProjectionMatrix()}i.setRenderTarget(G.map),i.clear();const K=G.getViewportCount();for(let j=0;j<K;j++){const ct=G.getViewport(j);o.set(s.x*ct.x,s.y*ct.y,s.x*ct.z,s.y*ct.w),z.viewport(o),G.updateMatrices(J,j),n=G.getFrustum(),v(b,R,G.camera,J,this.type)}G.isPointLightShadow!==!0&&this.type===dn&&M(G,R),G.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(y,E,P)};function M(w,b){const R=t.update(_);f.defines.VSM_SAMPLES!==w.blurSamples&&(f.defines.VSM_SAMPLES=w.blurSamples,d.defines.VSM_SAMPLES=w.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new qn(r.x,r.y)),f.uniforms.shadow_pass.value=w.map.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(b,null,R,f,_,null),d.uniforms.shadow_pass.value=w.mapPass.texture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(b,null,R,d,_,null)}function x(w,b,R,y){let E=null;const P=R.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(P!==void 0)E=P;else if(E=R.isPointLight===!0?l:a,i.localClippingEnabled&&b.clipShadows===!0&&Array.isArray(b.clippingPlanes)&&b.clippingPlanes.length!==0||b.displacementMap&&b.displacementScale!==0||b.alphaMap&&b.alphaTest>0||b.map&&b.alphaTest>0||b.alphaToCoverage===!0){const z=E.uuid,V=b.uuid;let U=c[z];U===void 0&&(U={},c[z]=U);let k=U[V];k===void 0&&(k=E.clone(),U[V]=k,b.addEventListener("dispose",A)),E=k}if(E.visible=b.visible,E.wireframe=b.wireframe,y===dn?E.side=b.shadowSide!==null?b.shadowSide:b.side:E.side=b.shadowSide!==null?b.shadowSide:h[b.side],E.alphaMap=b.alphaMap,E.alphaTest=b.alphaToCoverage===!0?.5:b.alphaTest,E.map=b.map,E.clipShadows=b.clipShadows,E.clippingPlanes=b.clippingPlanes,E.clipIntersection=b.clipIntersection,E.displacementMap=b.displacementMap,E.displacementScale=b.displacementScale,E.displacementBias=b.displacementBias,E.wireframeLinewidth=b.wireframeLinewidth,E.linewidth=b.linewidth,R.isPointLight===!0&&E.isMeshDistanceMaterial===!0){const z=i.properties.get(E);z.light=R}return E}function v(w,b,R,y,E){if(w.visible===!1)return;if(w.layers.test(b.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&E===dn)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,w.matrixWorld);const V=t.update(w),U=w.material;if(Array.isArray(U)){const k=V.groups;for(let H=0,J=k.length;H<J;H++){const G=k[H],X=U[G.materialIndex];if(X&&X.visible){const K=x(w,X,y,E);w.onBeforeShadow(i,w,b,R,V,K,G),i.renderBufferDirect(R,null,V,K,w,G),w.onAfterShadow(i,w,b,R,V,K,G)}}}else if(U.visible){const k=x(w,U,y,E);w.onBeforeShadow(i,w,b,R,V,k,null),i.renderBufferDirect(R,null,V,k,w,null),w.onAfterShadow(i,w,b,R,V,k,null)}}const z=w.children;for(let V=0,U=z.length;V<U;V++)v(z[V],b,R,y,E)}function A(w){w.target.removeEventListener("dispose",A);for(const R in c){const y=c[R],E=w.target.uuid;E in y&&(y[E].dispose(),delete y[E])}}}const A0={[Vs]:Gs,[Ws]:Ys,[Xs]:Zs,[_i]:qs,[Gs]:Vs,[Ys]:Ws,[Zs]:Xs,[qs]:_i};function w0(i,t){function e(){let I=!1;const dt=new ie;let _t=null;const wt=new ie(0,0,0,0);return{setMask:function(ht){_t!==ht&&!I&&(i.colorMask(ht,ht,ht,ht),_t=ht)},setLocked:function(ht){I=ht},setClear:function(ht,tt,Lt,Xt,se){se===!0&&(ht*=Xt,tt*=Xt,Lt*=Xt),dt.set(ht,tt,Lt,Xt),wt.equals(dt)===!1&&(i.clearColor(ht,tt,Lt,Xt),wt.copy(dt))},reset:function(){I=!1,_t=null,wt.set(-1,0,0,0)}}}function n(){let I=!1,dt=!1,_t=null,wt=null,ht=null;return{setReversed:function(tt){if(dt!==tt){const Lt=t.get("EXT_clip_control");tt?Lt.clipControlEXT(Lt.LOWER_LEFT_EXT,Lt.ZERO_TO_ONE_EXT):Lt.clipControlEXT(Lt.LOWER_LEFT_EXT,Lt.NEGATIVE_ONE_TO_ONE_EXT),dt=tt;const Xt=ht;ht=null,this.setClear(Xt)}},getReversed:function(){return dt},setTest:function(tt){tt?rt(i.DEPTH_TEST):bt(i.DEPTH_TEST)},setMask:function(tt){_t!==tt&&!I&&(i.depthMask(tt),_t=tt)},setFunc:function(tt){if(dt&&(tt=A0[tt]),wt!==tt){switch(tt){case Vs:i.depthFunc(i.NEVER);break;case Gs:i.depthFunc(i.ALWAYS);break;case Ws:i.depthFunc(i.LESS);break;case _i:i.depthFunc(i.LEQUAL);break;case Xs:i.depthFunc(i.EQUAL);break;case qs:i.depthFunc(i.GEQUAL);break;case Ys:i.depthFunc(i.GREATER);break;case Zs:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}wt=tt}},setLocked:function(tt){I=tt},setClear:function(tt){ht!==tt&&(dt&&(tt=1-tt),i.clearDepth(tt),ht=tt)},reset:function(){I=!1,_t=null,wt=null,ht=null,dt=!1}}}function r(){let I=!1,dt=null,_t=null,wt=null,ht=null,tt=null,Lt=null,Xt=null,se=null;return{setTest:function(te){I||(te?rt(i.STENCIL_TEST):bt(i.STENCIL_TEST))},setMask:function(te){dt!==te&&!I&&(i.stencilMask(te),dt=te)},setFunc:function(te,an,Qe){(_t!==te||wt!==an||ht!==Qe)&&(i.stencilFunc(te,an,Qe),_t=te,wt=an,ht=Qe)},setOp:function(te,an,Qe){(tt!==te||Lt!==an||Xt!==Qe)&&(i.stencilOp(te,an,Qe),tt=te,Lt=an,Xt=Qe)},setLocked:function(te){I=te},setClear:function(te){se!==te&&(i.clearStencil(te),se=te)},reset:function(){I=!1,dt=null,_t=null,wt=null,ht=null,tt=null,Lt=null,Xt=null,se=null}}}const s=new e,o=new n,a=new r,l=new WeakMap,c=new WeakMap;let u={},h={},f=new WeakMap,d=[],g=null,_=!1,m=null,p=null,M=null,x=null,v=null,A=null,w=null,b=new Zt(0,0,0),R=0,y=!1,E=null,P=null,z=null,V=null,U=null;const k=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let H=!1,J=0;const G=i.getParameter(i.VERSION);G.indexOf("WebGL")!==-1?(J=parseFloat(/^WebGL (\d)/.exec(G)[1]),H=J>=1):G.indexOf("OpenGL ES")!==-1&&(J=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),H=J>=2);let X=null,K={};const j=i.getParameter(i.SCISSOR_BOX),ct=i.getParameter(i.VIEWPORT),Et=new ie().fromArray(j),xt=new ie().fromArray(ct);function B(I,dt,_t,wt){const ht=new Uint8Array(4),tt=i.createTexture();i.bindTexture(I,tt),i.texParameteri(I,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(I,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Lt=0;Lt<_t;Lt++)I===i.TEXTURE_3D||I===i.TEXTURE_2D_ARRAY?i.texImage3D(dt,0,i.RGBA,1,1,wt,0,i.RGBA,i.UNSIGNED_BYTE,ht):i.texImage2D(dt+Lt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ht);return tt}const it={};it[i.TEXTURE_2D]=B(i.TEXTURE_2D,i.TEXTURE_2D,1),it[i.TEXTURE_CUBE_MAP]=B(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),it[i.TEXTURE_2D_ARRAY]=B(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),it[i.TEXTURE_3D]=B(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),rt(i.DEPTH_TEST),o.setFunc(_i),ot(!1),Q(ha),rt(i.CULL_FACE),nt(An);function rt(I){u[I]!==!0&&(i.enable(I),u[I]=!0)}function bt(I){u[I]!==!1&&(i.disable(I),u[I]=!1)}function Tt(I,dt){return h[I]!==dt?(i.bindFramebuffer(I,dt),h[I]=dt,I===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=dt),I===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=dt),!0):!1}function Ut(I,dt){let _t=d,wt=!1;if(I){_t=f.get(dt),_t===void 0&&(_t=[],f.set(dt,_t));const ht=I.textures;if(_t.length!==ht.length||_t[0]!==i.COLOR_ATTACHMENT0){for(let tt=0,Lt=ht.length;tt<Lt;tt++)_t[tt]=i.COLOR_ATTACHMENT0+tt;_t.length=ht.length,wt=!0}}else _t[0]!==i.BACK&&(_t[0]=i.BACK,wt=!0);wt&&i.drawBuffers(_t)}function ce(I){return g!==I?(i.useProgram(I),g=I,!0):!1}const Gt={[Hn]:i.FUNC_ADD,[Ul]:i.FUNC_SUBTRACT,[Nl]:i.FUNC_REVERSE_SUBTRACT};Gt[Fl]=i.MIN,Gt[Ol]=i.MAX;const L={[Bl]:i.ZERO,[zl]:i.ONE,[kl]:i.SRC_COLOR,[ks]:i.SRC_ALPHA,[ql]:i.SRC_ALPHA_SATURATE,[Wl]:i.DST_COLOR,[Vl]:i.DST_ALPHA,[Hl]:i.ONE_MINUS_SRC_COLOR,[Hs]:i.ONE_MINUS_SRC_ALPHA,[Xl]:i.ONE_MINUS_DST_COLOR,[Gl]:i.ONE_MINUS_DST_ALPHA,[Yl]:i.CONSTANT_COLOR,[Zl]:i.ONE_MINUS_CONSTANT_COLOR,[Jl]:i.CONSTANT_ALPHA,[Kl]:i.ONE_MINUS_CONSTANT_ALPHA};function nt(I,dt,_t,wt,ht,tt,Lt,Xt,se,te){if(I===An){_===!0&&(bt(i.BLEND),_=!1);return}if(_===!1&&(rt(i.BLEND),_=!0),I!==Il){if(I!==m||te!==y){if((p!==Hn||v!==Hn)&&(i.blendEquation(i.FUNC_ADD),p=Hn,v=Hn),te)switch(I){case pi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case zs:i.blendFunc(i.ONE,i.ONE);break;case fa:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case da:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}else switch(I){case pi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case zs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case fa:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case da:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}M=null,x=null,A=null,w=null,b.set(0,0,0),R=0,m=I,y=te}return}ht=ht||dt,tt=tt||_t,Lt=Lt||wt,(dt!==p||ht!==v)&&(i.blendEquationSeparate(Gt[dt],Gt[ht]),p=dt,v=ht),(_t!==M||wt!==x||tt!==A||Lt!==w)&&(i.blendFuncSeparate(L[_t],L[wt],L[tt],L[Lt]),M=_t,x=wt,A=tt,w=Lt),(Xt.equals(b)===!1||se!==R)&&(i.blendColor(Xt.r,Xt.g,Xt.b,se),b.copy(Xt),R=se),m=I,y=!1}function $(I,dt){I.side===Le?bt(i.CULL_FACE):rt(i.CULL_FACE);let _t=I.side===Re;dt&&(_t=!_t),ot(_t),I.blending===pi&&I.transparent===!1?nt(An):nt(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),o.setFunc(I.depthFunc),o.setTest(I.depthTest),o.setMask(I.depthWrite),s.setMask(I.colorWrite);const wt=I.stencilWrite;a.setTest(wt),wt&&(a.setMask(I.stencilWriteMask),a.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),a.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),at(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?rt(i.SAMPLE_ALPHA_TO_COVERAGE):bt(i.SAMPLE_ALPHA_TO_COVERAGE)}function ot(I){E!==I&&(I?i.frontFace(i.CW):i.frontFace(i.CCW),E=I)}function Q(I){I!==Pl?(rt(i.CULL_FACE),I!==P&&(I===ha?i.cullFace(i.BACK):I===Ll?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):bt(i.CULL_FACE),P=I}function mt(I){I!==z&&(H&&i.lineWidth(I),z=I)}function at(I,dt,_t){I?(rt(i.POLYGON_OFFSET_FILL),(V!==dt||U!==_t)&&(i.polygonOffset(dt,_t),V=dt,U=_t)):bt(i.POLYGON_OFFSET_FILL)}function gt(I){I?rt(i.SCISSOR_TEST):bt(i.SCISSOR_TEST)}function Wt(I){I===void 0&&(I=i.TEXTURE0+k-1),X!==I&&(i.activeTexture(I),X=I)}function kt(I,dt,_t){_t===void 0&&(X===null?_t=i.TEXTURE0+k-1:_t=X);let wt=K[_t];wt===void 0&&(wt={type:void 0,texture:void 0},K[_t]=wt),(wt.type!==I||wt.texture!==dt)&&(X!==_t&&(i.activeTexture(_t),X=_t),i.bindTexture(I,dt||it[I]),wt.type=I,wt.texture=dt)}function C(){const I=K[X];I!==void 0&&I.type!==void 0&&(i.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function S(){try{i.compressedTexImage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function O(){try{i.compressedTexImage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Y(){try{i.texSubImage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function st(){try{i.texSubImage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Z(){try{i.compressedTexSubImage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Dt(){try{i.compressedTexSubImage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function pt(){try{i.texStorage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Ct(){try{i.texStorage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Pt(){try{i.texImage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ut(){try{i.texImage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function yt(I){Et.equals(I)===!1&&(i.scissor(I.x,I.y,I.z,I.w),Et.copy(I))}function Bt(I){xt.equals(I)===!1&&(i.viewport(I.x,I.y,I.z,I.w),xt.copy(I))}function It(I,dt){let _t=c.get(dt);_t===void 0&&(_t=new WeakMap,c.set(dt,_t));let wt=_t.get(I);wt===void 0&&(wt=i.getUniformBlockIndex(dt,I.name),_t.set(I,wt))}function Mt(I,dt){const wt=c.get(dt).get(I);l.get(dt)!==wt&&(i.uniformBlockBinding(dt,wt,I.__bindingPointIndex),l.set(dt,wt))}function qt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},X=null,K={},h={},f=new WeakMap,d=[],g=null,_=!1,m=null,p=null,M=null,x=null,v=null,A=null,w=null,b=new Zt(0,0,0),R=0,y=!1,E=null,P=null,z=null,V=null,U=null,Et.set(0,0,i.canvas.width,i.canvas.height),xt.set(0,0,i.canvas.width,i.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:rt,disable:bt,bindFramebuffer:Tt,drawBuffers:Ut,useProgram:ce,setBlending:nt,setMaterial:$,setFlipSided:ot,setCullFace:Q,setLineWidth:mt,setPolygonOffset:at,setScissorTest:gt,activeTexture:Wt,bindTexture:kt,unbindTexture:C,compressedTexImage2D:S,compressedTexImage3D:O,texImage2D:Pt,texImage3D:ut,updateUBOMapping:It,uniformBlockBinding:Mt,texStorage2D:pt,texStorage3D:Ct,texSubImage2D:Y,texSubImage3D:st,compressedTexSubImage2D:Z,compressedTexSubImage3D:Dt,scissor:yt,viewport:Bt,reset:qt}}function R0(i,t,e,n,r,s,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new lt,u=new WeakMap;let h;const f=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(C,S){return d?new OffscreenCanvas(C,S):Vr("canvas")}function _(C,S,O){let Y=1;const st=kt(C);if((st.width>O||st.height>O)&&(Y=O/Math.max(st.width,st.height)),Y<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const Z=Math.floor(Y*st.width),Dt=Math.floor(Y*st.height);h===void 0&&(h=g(Z,Dt));const pt=S?g(Z,Dt):h;return pt.width=Z,pt.height=Dt,pt.getContext("2d").drawImage(C,0,0,Z,Dt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+st.width+"x"+st.height+") to ("+Z+"x"+Dt+")."),pt}else return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+st.width+"x"+st.height+")."),C;return C}function m(C){return C.generateMipmaps}function p(C){i.generateMipmap(C)}function M(C){return C.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?i.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function x(C,S,O,Y,st=!1){if(C!==null){if(i[C]!==void 0)return i[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let Z=S;if(S===i.RED&&(O===i.FLOAT&&(Z=i.R32F),O===i.HALF_FLOAT&&(Z=i.R16F),O===i.UNSIGNED_BYTE&&(Z=i.R8)),S===i.RED_INTEGER&&(O===i.UNSIGNED_BYTE&&(Z=i.R8UI),O===i.UNSIGNED_SHORT&&(Z=i.R16UI),O===i.UNSIGNED_INT&&(Z=i.R32UI),O===i.BYTE&&(Z=i.R8I),O===i.SHORT&&(Z=i.R16I),O===i.INT&&(Z=i.R32I)),S===i.RG&&(O===i.FLOAT&&(Z=i.RG32F),O===i.HALF_FLOAT&&(Z=i.RG16F),O===i.UNSIGNED_BYTE&&(Z=i.RG8)),S===i.RG_INTEGER&&(O===i.UNSIGNED_BYTE&&(Z=i.RG8UI),O===i.UNSIGNED_SHORT&&(Z=i.RG16UI),O===i.UNSIGNED_INT&&(Z=i.RG32UI),O===i.BYTE&&(Z=i.RG8I),O===i.SHORT&&(Z=i.RG16I),O===i.INT&&(Z=i.RG32I)),S===i.RGB_INTEGER&&(O===i.UNSIGNED_BYTE&&(Z=i.RGB8UI),O===i.UNSIGNED_SHORT&&(Z=i.RGB16UI),O===i.UNSIGNED_INT&&(Z=i.RGB32UI),O===i.BYTE&&(Z=i.RGB8I),O===i.SHORT&&(Z=i.RGB16I),O===i.INT&&(Z=i.RGB32I)),S===i.RGBA_INTEGER&&(O===i.UNSIGNED_BYTE&&(Z=i.RGBA8UI),O===i.UNSIGNED_SHORT&&(Z=i.RGBA16UI),O===i.UNSIGNED_INT&&(Z=i.RGBA32UI),O===i.BYTE&&(Z=i.RGBA8I),O===i.SHORT&&(Z=i.RGBA16I),O===i.INT&&(Z=i.RGBA32I)),S===i.RGB&&O===i.UNSIGNED_INT_5_9_9_9_REV&&(Z=i.RGB9_E5),S===i.RGBA){const Dt=st?kr:Qt.getTransfer(Y);O===i.FLOAT&&(Z=i.RGBA32F),O===i.HALF_FLOAT&&(Z=i.RGBA16F),O===i.UNSIGNED_BYTE&&(Z=Dt===ne?i.SRGB8_ALPHA8:i.RGBA8),O===i.UNSIGNED_SHORT_4_4_4_4&&(Z=i.RGBA4),O===i.UNSIGNED_SHORT_5_5_5_1&&(Z=i.RGB5_A1)}return(Z===i.R16F||Z===i.R32F||Z===i.RG16F||Z===i.RG32F||Z===i.RGBA16F||Z===i.RGBA32F)&&t.get("EXT_color_buffer_float"),Z}function v(C,S){let O;return C?S===null||S===Xn||S===qi?O=i.DEPTH24_STENCIL8:S===mn?O=i.DEPTH32F_STENCIL8:S===Xi&&(O=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===Xn||S===qi?O=i.DEPTH_COMPONENT24:S===mn?O=i.DEPTH_COMPONENT32F:S===Xi&&(O=i.DEPTH_COMPONENT16),O}function A(C,S){return m(C)===!0||C.isFramebufferTexture&&C.minFilter!==Be&&C.minFilter!==$e?Math.log2(Math.max(S.width,S.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?S.mipmaps.length:1}function w(C){const S=C.target;S.removeEventListener("dispose",w),R(S),S.isVideoTexture&&u.delete(S)}function b(C){const S=C.target;S.removeEventListener("dispose",b),E(S)}function R(C){const S=n.get(C);if(S.__webglInit===void 0)return;const O=C.source,Y=f.get(O);if(Y){const st=Y[S.__cacheKey];st.usedTimes--,st.usedTimes===0&&y(C),Object.keys(Y).length===0&&f.delete(O)}n.remove(C)}function y(C){const S=n.get(C);i.deleteTexture(S.__webglTexture);const O=C.source,Y=f.get(O);delete Y[S.__cacheKey],o.memory.textures--}function E(C){const S=n.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),n.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(S.__webglFramebuffer[Y]))for(let st=0;st<S.__webglFramebuffer[Y].length;st++)i.deleteFramebuffer(S.__webglFramebuffer[Y][st]);else i.deleteFramebuffer(S.__webglFramebuffer[Y]);S.__webglDepthbuffer&&i.deleteRenderbuffer(S.__webglDepthbuffer[Y])}else{if(Array.isArray(S.__webglFramebuffer))for(let Y=0;Y<S.__webglFramebuffer.length;Y++)i.deleteFramebuffer(S.__webglFramebuffer[Y]);else i.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&i.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&i.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let Y=0;Y<S.__webglColorRenderbuffer.length;Y++)S.__webglColorRenderbuffer[Y]&&i.deleteRenderbuffer(S.__webglColorRenderbuffer[Y]);S.__webglDepthRenderbuffer&&i.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const O=C.textures;for(let Y=0,st=O.length;Y<st;Y++){const Z=n.get(O[Y]);Z.__webglTexture&&(i.deleteTexture(Z.__webglTexture),o.memory.textures--),n.remove(O[Y])}n.remove(C)}let P=0;function z(){P=0}function V(){const C=P;return C>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+r.maxTextures),P+=1,C}function U(C){const S=[];return S.push(C.wrapS),S.push(C.wrapT),S.push(C.wrapR||0),S.push(C.magFilter),S.push(C.minFilter),S.push(C.anisotropy),S.push(C.internalFormat),S.push(C.format),S.push(C.type),S.push(C.generateMipmaps),S.push(C.premultiplyAlpha),S.push(C.flipY),S.push(C.unpackAlignment),S.push(C.colorSpace),S.join()}function k(C,S){const O=n.get(C);if(C.isVideoTexture&&gt(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&O.__version!==C.version){const Y=C.image;if(Y===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{it(O,C,S);return}}else C.isExternalTexture&&(O.__webglTexture=C.sourceTexture?C.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,O.__webglTexture,i.TEXTURE0+S)}function H(C,S){const O=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&O.__version!==C.version){it(O,C,S);return}e.bindTexture(i.TEXTURE_2D_ARRAY,O.__webglTexture,i.TEXTURE0+S)}function J(C,S){const O=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&O.__version!==C.version){it(O,C,S);return}e.bindTexture(i.TEXTURE_3D,O.__webglTexture,i.TEXTURE0+S)}function G(C,S){const O=n.get(C);if(C.version>0&&O.__version!==C.version){rt(O,C,S);return}e.bindTexture(i.TEXTURE_CUBE_MAP,O.__webglTexture,i.TEXTURE0+S)}const X={[Wi]:i.REPEAT,[Gn]:i.CLAMP_TO_EDGE,[Ks]:i.MIRRORED_REPEAT},K={[Be]:i.NEAREST,[su]:i.NEAREST_MIPMAP_NEAREST,[sr]:i.NEAREST_MIPMAP_LINEAR,[$e]:i.LINEAR,[ts]:i.LINEAR_MIPMAP_NEAREST,[Wn]:i.LINEAR_MIPMAP_LINEAR},j={[lu]:i.NEVER,[mu]:i.ALWAYS,[uu]:i.LESS,[zc]:i.LEQUAL,[hu]:i.EQUAL,[pu]:i.GEQUAL,[fu]:i.GREATER,[du]:i.NOTEQUAL};function ct(C,S){if(S.type===mn&&t.has("OES_texture_float_linear")===!1&&(S.magFilter===$e||S.magFilter===ts||S.magFilter===sr||S.magFilter===Wn||S.minFilter===$e||S.minFilter===ts||S.minFilter===sr||S.minFilter===Wn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(C,i.TEXTURE_WRAP_S,X[S.wrapS]),i.texParameteri(C,i.TEXTURE_WRAP_T,X[S.wrapT]),(C===i.TEXTURE_3D||C===i.TEXTURE_2D_ARRAY)&&i.texParameteri(C,i.TEXTURE_WRAP_R,X[S.wrapR]),i.texParameteri(C,i.TEXTURE_MAG_FILTER,K[S.magFilter]),i.texParameteri(C,i.TEXTURE_MIN_FILTER,K[S.minFilter]),S.compareFunction&&(i.texParameteri(C,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(C,i.TEXTURE_COMPARE_FUNC,j[S.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===Be||S.minFilter!==sr&&S.minFilter!==Wn||S.type===mn&&t.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||n.get(S).__currentAnisotropy){const O=t.get("EXT_texture_filter_anisotropic");i.texParameterf(C,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,r.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy}}}function Et(C,S){let O=!1;C.__webglInit===void 0&&(C.__webglInit=!0,S.addEventListener("dispose",w));const Y=S.source;let st=f.get(Y);st===void 0&&(st={},f.set(Y,st));const Z=U(S);if(Z!==C.__cacheKey){st[Z]===void 0&&(st[Z]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,O=!0),st[Z].usedTimes++;const Dt=st[C.__cacheKey];Dt!==void 0&&(st[C.__cacheKey].usedTimes--,Dt.usedTimes===0&&y(S)),C.__cacheKey=Z,C.__webglTexture=st[Z].texture}return O}function xt(C,S,O){return Math.floor(Math.floor(C/O)/S)}function B(C,S,O,Y){const Z=C.updateRanges;if(Z.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,S.width,S.height,O,Y,S.data);else{Z.sort((ut,yt)=>ut.start-yt.start);let Dt=0;for(let ut=1;ut<Z.length;ut++){const yt=Z[Dt],Bt=Z[ut],It=yt.start+yt.count,Mt=xt(Bt.start,S.width,4),qt=xt(yt.start,S.width,4);Bt.start<=It+1&&Mt===qt&&xt(Bt.start+Bt.count-1,S.width,4)===Mt?yt.count=Math.max(yt.count,Bt.start+Bt.count-yt.start):(++Dt,Z[Dt]=Bt)}Z.length=Dt+1;const pt=i.getParameter(i.UNPACK_ROW_LENGTH),Ct=i.getParameter(i.UNPACK_SKIP_PIXELS),Pt=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,S.width);for(let ut=0,yt=Z.length;ut<yt;ut++){const Bt=Z[ut],It=Math.floor(Bt.start/4),Mt=Math.ceil(Bt.count/4),qt=It%S.width,I=Math.floor(It/S.width),dt=Mt,_t=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,qt),i.pixelStorei(i.UNPACK_SKIP_ROWS,I),e.texSubImage2D(i.TEXTURE_2D,0,qt,I,dt,_t,O,Y,S.data)}C.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,pt),i.pixelStorei(i.UNPACK_SKIP_PIXELS,Ct),i.pixelStorei(i.UNPACK_SKIP_ROWS,Pt)}}function it(C,S,O){let Y=i.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(Y=i.TEXTURE_2D_ARRAY),S.isData3DTexture&&(Y=i.TEXTURE_3D);const st=Et(C,S),Z=S.source;e.bindTexture(Y,C.__webglTexture,i.TEXTURE0+O);const Dt=n.get(Z);if(Z.version!==Dt.__version||st===!0){e.activeTexture(i.TEXTURE0+O);const pt=Qt.getPrimaries(Qt.workingColorSpace),Ct=S.colorSpace===pn?null:Qt.getPrimaries(S.colorSpace),Pt=S.colorSpace===pn||pt===Ct?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Pt);let ut=_(S.image,!1,r.maxTextureSize);ut=Wt(S,ut);const yt=s.convert(S.format,S.colorSpace),Bt=s.convert(S.type);let It=x(S.internalFormat,yt,Bt,S.colorSpace,S.isVideoTexture);ct(Y,S);let Mt;const qt=S.mipmaps,I=S.isVideoTexture!==!0,dt=Dt.__version===void 0||st===!0,_t=Z.dataReady,wt=A(S,ut);if(S.isDepthTexture)It=v(S.format===Zi,S.type),dt&&(I?e.texStorage2D(i.TEXTURE_2D,1,It,ut.width,ut.height):e.texImage2D(i.TEXTURE_2D,0,It,ut.width,ut.height,0,yt,Bt,null));else if(S.isDataTexture)if(qt.length>0){I&&dt&&e.texStorage2D(i.TEXTURE_2D,wt,It,qt[0].width,qt[0].height);for(let ht=0,tt=qt.length;ht<tt;ht++)Mt=qt[ht],I?_t&&e.texSubImage2D(i.TEXTURE_2D,ht,0,0,Mt.width,Mt.height,yt,Bt,Mt.data):e.texImage2D(i.TEXTURE_2D,ht,It,Mt.width,Mt.height,0,yt,Bt,Mt.data);S.generateMipmaps=!1}else I?(dt&&e.texStorage2D(i.TEXTURE_2D,wt,It,ut.width,ut.height),_t&&B(S,ut,yt,Bt)):e.texImage2D(i.TEXTURE_2D,0,It,ut.width,ut.height,0,yt,Bt,ut.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){I&&dt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,wt,It,qt[0].width,qt[0].height,ut.depth);for(let ht=0,tt=qt.length;ht<tt;ht++)if(Mt=qt[ht],S.format!==Ge)if(yt!==null)if(I){if(_t)if(S.layerUpdates.size>0){const Lt=Wa(Mt.width,Mt.height,S.format,S.type);for(const Xt of S.layerUpdates){const se=Mt.data.subarray(Xt*Lt/Mt.data.BYTES_PER_ELEMENT,(Xt+1)*Lt/Mt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ht,0,0,Xt,Mt.width,Mt.height,1,yt,se)}S.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ht,0,0,0,Mt.width,Mt.height,ut.depth,yt,Mt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ht,It,Mt.width,Mt.height,ut.depth,0,Mt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else I?_t&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,ht,0,0,0,Mt.width,Mt.height,ut.depth,yt,Bt,Mt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,ht,It,Mt.width,Mt.height,ut.depth,0,yt,Bt,Mt.data)}else{I&&dt&&e.texStorage2D(i.TEXTURE_2D,wt,It,qt[0].width,qt[0].height);for(let ht=0,tt=qt.length;ht<tt;ht++)Mt=qt[ht],S.format!==Ge?yt!==null?I?_t&&e.compressedTexSubImage2D(i.TEXTURE_2D,ht,0,0,Mt.width,Mt.height,yt,Mt.data):e.compressedTexImage2D(i.TEXTURE_2D,ht,It,Mt.width,Mt.height,0,Mt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):I?_t&&e.texSubImage2D(i.TEXTURE_2D,ht,0,0,Mt.width,Mt.height,yt,Bt,Mt.data):e.texImage2D(i.TEXTURE_2D,ht,It,Mt.width,Mt.height,0,yt,Bt,Mt.data)}else if(S.isDataArrayTexture)if(I){if(dt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,wt,It,ut.width,ut.height,ut.depth),_t)if(S.layerUpdates.size>0){const ht=Wa(ut.width,ut.height,S.format,S.type);for(const tt of S.layerUpdates){const Lt=ut.data.subarray(tt*ht/ut.data.BYTES_PER_ELEMENT,(tt+1)*ht/ut.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,tt,ut.width,ut.height,1,yt,Bt,Lt)}S.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ut.width,ut.height,ut.depth,yt,Bt,ut.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,It,ut.width,ut.height,ut.depth,0,yt,Bt,ut.data);else if(S.isData3DTexture)I?(dt&&e.texStorage3D(i.TEXTURE_3D,wt,It,ut.width,ut.height,ut.depth),_t&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ut.width,ut.height,ut.depth,yt,Bt,ut.data)):e.texImage3D(i.TEXTURE_3D,0,It,ut.width,ut.height,ut.depth,0,yt,Bt,ut.data);else if(S.isFramebufferTexture){if(dt)if(I)e.texStorage2D(i.TEXTURE_2D,wt,It,ut.width,ut.height);else{let ht=ut.width,tt=ut.height;for(let Lt=0;Lt<wt;Lt++)e.texImage2D(i.TEXTURE_2D,Lt,It,ht,tt,0,yt,Bt,null),ht>>=1,tt>>=1}}else if(qt.length>0){if(I&&dt){const ht=kt(qt[0]);e.texStorage2D(i.TEXTURE_2D,wt,It,ht.width,ht.height)}for(let ht=0,tt=qt.length;ht<tt;ht++)Mt=qt[ht],I?_t&&e.texSubImage2D(i.TEXTURE_2D,ht,0,0,yt,Bt,Mt):e.texImage2D(i.TEXTURE_2D,ht,It,yt,Bt,Mt);S.generateMipmaps=!1}else if(I){if(dt){const ht=kt(ut);e.texStorage2D(i.TEXTURE_2D,wt,It,ht.width,ht.height)}_t&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,yt,Bt,ut)}else e.texImage2D(i.TEXTURE_2D,0,It,yt,Bt,ut);m(S)&&p(Y),Dt.__version=Z.version,S.onUpdate&&S.onUpdate(S)}C.__version=S.version}function rt(C,S,O){if(S.image.length!==6)return;const Y=Et(C,S),st=S.source;e.bindTexture(i.TEXTURE_CUBE_MAP,C.__webglTexture,i.TEXTURE0+O);const Z=n.get(st);if(st.version!==Z.__version||Y===!0){e.activeTexture(i.TEXTURE0+O);const Dt=Qt.getPrimaries(Qt.workingColorSpace),pt=S.colorSpace===pn?null:Qt.getPrimaries(S.colorSpace),Ct=S.colorSpace===pn||Dt===pt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ct);const Pt=S.isCompressedTexture||S.image[0].isCompressedTexture,ut=S.image[0]&&S.image[0].isDataTexture,yt=[];for(let tt=0;tt<6;tt++)!Pt&&!ut?yt[tt]=_(S.image[tt],!0,r.maxCubemapSize):yt[tt]=ut?S.image[tt].image:S.image[tt],yt[tt]=Wt(S,yt[tt]);const Bt=yt[0],It=s.convert(S.format,S.colorSpace),Mt=s.convert(S.type),qt=x(S.internalFormat,It,Mt,S.colorSpace),I=S.isVideoTexture!==!0,dt=Z.__version===void 0||Y===!0,_t=st.dataReady;let wt=A(S,Bt);ct(i.TEXTURE_CUBE_MAP,S);let ht;if(Pt){I&&dt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,wt,qt,Bt.width,Bt.height);for(let tt=0;tt<6;tt++){ht=yt[tt].mipmaps;for(let Lt=0;Lt<ht.length;Lt++){const Xt=ht[Lt];S.format!==Ge?It!==null?I?_t&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Lt,0,0,Xt.width,Xt.height,It,Xt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Lt,qt,Xt.width,Xt.height,0,Xt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):I?_t&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Lt,0,0,Xt.width,Xt.height,It,Mt,Xt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Lt,qt,Xt.width,Xt.height,0,It,Mt,Xt.data)}}}else{if(ht=S.mipmaps,I&&dt){ht.length>0&&wt++;const tt=kt(yt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,wt,qt,tt.width,tt.height)}for(let tt=0;tt<6;tt++)if(ut){I?_t&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,0,0,yt[tt].width,yt[tt].height,It,Mt,yt[tt].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,qt,yt[tt].width,yt[tt].height,0,It,Mt,yt[tt].data);for(let Lt=0;Lt<ht.length;Lt++){const se=ht[Lt].image[tt].image;I?_t&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Lt+1,0,0,se.width,se.height,It,Mt,se.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Lt+1,qt,se.width,se.height,0,It,Mt,se.data)}}else{I?_t&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,0,0,It,Mt,yt[tt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,qt,It,Mt,yt[tt]);for(let Lt=0;Lt<ht.length;Lt++){const Xt=ht[Lt];I?_t&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Lt+1,0,0,It,Mt,Xt.image[tt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Lt+1,qt,It,Mt,Xt.image[tt])}}}m(S)&&p(i.TEXTURE_CUBE_MAP),Z.__version=st.version,S.onUpdate&&S.onUpdate(S)}C.__version=S.version}function bt(C,S,O,Y,st,Z){const Dt=s.convert(O.format,O.colorSpace),pt=s.convert(O.type),Ct=x(O.internalFormat,Dt,pt,O.colorSpace),Pt=n.get(S),ut=n.get(O);if(ut.__renderTarget=S,!Pt.__hasExternalTextures){const yt=Math.max(1,S.width>>Z),Bt=Math.max(1,S.height>>Z);st===i.TEXTURE_3D||st===i.TEXTURE_2D_ARRAY?e.texImage3D(st,Z,Ct,yt,Bt,S.depth,0,Dt,pt,null):e.texImage2D(st,Z,Ct,yt,Bt,0,Dt,pt,null)}e.bindFramebuffer(i.FRAMEBUFFER,C),at(S)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Y,st,ut.__webglTexture,0,mt(S)):(st===i.TEXTURE_2D||st>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&st<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Y,st,ut.__webglTexture,Z),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Tt(C,S,O){if(i.bindRenderbuffer(i.RENDERBUFFER,C),S.depthBuffer){const Y=S.depthTexture,st=Y&&Y.isDepthTexture?Y.type:null,Z=v(S.stencilBuffer,st),Dt=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,pt=mt(S);at(S)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,pt,Z,S.width,S.height):O?i.renderbufferStorageMultisample(i.RENDERBUFFER,pt,Z,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,Z,S.width,S.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Dt,i.RENDERBUFFER,C)}else{const Y=S.textures;for(let st=0;st<Y.length;st++){const Z=Y[st],Dt=s.convert(Z.format,Z.colorSpace),pt=s.convert(Z.type),Ct=x(Z.internalFormat,Dt,pt,Z.colorSpace),Pt=mt(S);O&&at(S)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Pt,Ct,S.width,S.height):at(S)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Pt,Ct,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,Ct,S.width,S.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ut(C,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,C),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Y=n.get(S.depthTexture);Y.__renderTarget=S,(!Y.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),k(S.depthTexture,0);const st=Y.__webglTexture,Z=mt(S);if(S.depthTexture.format===Yi)at(S)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,st,0,Z):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,st,0);else if(S.depthTexture.format===Zi)at(S)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,st,0,Z):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,st,0);else throw new Error("Unknown depthTexture format")}function ce(C){const S=n.get(C),O=C.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==C.depthTexture){const Y=C.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),Y){const st=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,Y.removeEventListener("dispose",st)};Y.addEventListener("dispose",st),S.__depthDisposeCallback=st}S.__boundDepthTexture=Y}if(C.depthTexture&&!S.__autoAllocateDepthBuffer){if(O)throw new Error("target.depthTexture not supported in Cube render targets");const Y=C.texture.mipmaps;Y&&Y.length>0?Ut(S.__webglFramebuffer[0],C):Ut(S.__webglFramebuffer,C)}else if(O){S.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(e.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer[Y]),S.__webglDepthbuffer[Y]===void 0)S.__webglDepthbuffer[Y]=i.createRenderbuffer(),Tt(S.__webglDepthbuffer[Y],C,!1);else{const st=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Z=S.__webglDepthbuffer[Y];i.bindRenderbuffer(i.RENDERBUFFER,Z),i.framebufferRenderbuffer(i.FRAMEBUFFER,st,i.RENDERBUFFER,Z)}}else{const Y=C.texture.mipmaps;if(Y&&Y.length>0?e.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=i.createRenderbuffer(),Tt(S.__webglDepthbuffer,C,!1);else{const st=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Z=S.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,Z),i.framebufferRenderbuffer(i.FRAMEBUFFER,st,i.RENDERBUFFER,Z)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Gt(C,S,O){const Y=n.get(C);S!==void 0&&bt(Y.__webglFramebuffer,C,C.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),O!==void 0&&ce(C)}function L(C){const S=C.texture,O=n.get(C),Y=n.get(S);C.addEventListener("dispose",b);const st=C.textures,Z=C.isWebGLCubeRenderTarget===!0,Dt=st.length>1;if(Dt||(Y.__webglTexture===void 0&&(Y.__webglTexture=i.createTexture()),Y.__version=S.version,o.memory.textures++),Z){O.__webglFramebuffer=[];for(let pt=0;pt<6;pt++)if(S.mipmaps&&S.mipmaps.length>0){O.__webglFramebuffer[pt]=[];for(let Ct=0;Ct<S.mipmaps.length;Ct++)O.__webglFramebuffer[pt][Ct]=i.createFramebuffer()}else O.__webglFramebuffer[pt]=i.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){O.__webglFramebuffer=[];for(let pt=0;pt<S.mipmaps.length;pt++)O.__webglFramebuffer[pt]=i.createFramebuffer()}else O.__webglFramebuffer=i.createFramebuffer();if(Dt)for(let pt=0,Ct=st.length;pt<Ct;pt++){const Pt=n.get(st[pt]);Pt.__webglTexture===void 0&&(Pt.__webglTexture=i.createTexture(),o.memory.textures++)}if(C.samples>0&&at(C)===!1){O.__webglMultisampledFramebuffer=i.createFramebuffer(),O.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let pt=0;pt<st.length;pt++){const Ct=st[pt];O.__webglColorRenderbuffer[pt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,O.__webglColorRenderbuffer[pt]);const Pt=s.convert(Ct.format,Ct.colorSpace),ut=s.convert(Ct.type),yt=x(Ct.internalFormat,Pt,ut,Ct.colorSpace,C.isXRRenderTarget===!0),Bt=mt(C);i.renderbufferStorageMultisample(i.RENDERBUFFER,Bt,yt,C.width,C.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+pt,i.RENDERBUFFER,O.__webglColorRenderbuffer[pt])}i.bindRenderbuffer(i.RENDERBUFFER,null),C.depthBuffer&&(O.__webglDepthRenderbuffer=i.createRenderbuffer(),Tt(O.__webglDepthRenderbuffer,C,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(Z){e.bindTexture(i.TEXTURE_CUBE_MAP,Y.__webglTexture),ct(i.TEXTURE_CUBE_MAP,S);for(let pt=0;pt<6;pt++)if(S.mipmaps&&S.mipmaps.length>0)for(let Ct=0;Ct<S.mipmaps.length;Ct++)bt(O.__webglFramebuffer[pt][Ct],C,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+pt,Ct);else bt(O.__webglFramebuffer[pt],C,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0);m(S)&&p(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Dt){for(let pt=0,Ct=st.length;pt<Ct;pt++){const Pt=st[pt],ut=n.get(Pt);let yt=i.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(yt=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(yt,ut.__webglTexture),ct(yt,Pt),bt(O.__webglFramebuffer,C,Pt,i.COLOR_ATTACHMENT0+pt,yt,0),m(Pt)&&p(yt)}e.unbindTexture()}else{let pt=i.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(pt=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(pt,Y.__webglTexture),ct(pt,S),S.mipmaps&&S.mipmaps.length>0)for(let Ct=0;Ct<S.mipmaps.length;Ct++)bt(O.__webglFramebuffer[Ct],C,S,i.COLOR_ATTACHMENT0,pt,Ct);else bt(O.__webglFramebuffer,C,S,i.COLOR_ATTACHMENT0,pt,0);m(S)&&p(pt),e.unbindTexture()}C.depthBuffer&&ce(C)}function nt(C){const S=C.textures;for(let O=0,Y=S.length;O<Y;O++){const st=S[O];if(m(st)){const Z=M(C),Dt=n.get(st).__webglTexture;e.bindTexture(Z,Dt),p(Z),e.unbindTexture()}}}const $=[],ot=[];function Q(C){if(C.samples>0){if(at(C)===!1){const S=C.textures,O=C.width,Y=C.height;let st=i.COLOR_BUFFER_BIT;const Z=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Dt=n.get(C),pt=S.length>1;if(pt)for(let Pt=0;Pt<S.length;Pt++)e.bindFramebuffer(i.FRAMEBUFFER,Dt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Pt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Dt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Pt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Dt.__webglMultisampledFramebuffer);const Ct=C.texture.mipmaps;Ct&&Ct.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Dt.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Dt.__webglFramebuffer);for(let Pt=0;Pt<S.length;Pt++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(st|=i.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(st|=i.STENCIL_BUFFER_BIT)),pt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Dt.__webglColorRenderbuffer[Pt]);const ut=n.get(S[Pt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ut,0)}i.blitFramebuffer(0,0,O,Y,0,0,O,Y,st,i.NEAREST),l===!0&&($.length=0,ot.length=0,$.push(i.COLOR_ATTACHMENT0+Pt),C.depthBuffer&&C.resolveDepthBuffer===!1&&($.push(Z),ot.push(Z),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,ot)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,$))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),pt)for(let Pt=0;Pt<S.length;Pt++){e.bindFramebuffer(i.FRAMEBUFFER,Dt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Pt,i.RENDERBUFFER,Dt.__webglColorRenderbuffer[Pt]);const ut=n.get(S[Pt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Dt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Pt,i.TEXTURE_2D,ut,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Dt.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&l){const S=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[S])}}}function mt(C){return Math.min(r.maxSamples,C.samples)}function at(C){const S=n.get(C);return C.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function gt(C){const S=o.render.frame;u.get(C)!==S&&(u.set(C,S),C.update())}function Wt(C,S){const O=C.colorSpace,Y=C.format,st=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||O!==Mi&&O!==pn&&(Qt.getTransfer(O)===ne?(Y!==Ge||st!==rn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",O)),S}function kt(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(c.width=C.naturalWidth||C.width,c.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(c.width=C.displayWidth,c.height=C.displayHeight):(c.width=C.width,c.height=C.height),c}this.allocateTextureUnit=V,this.resetTextureUnits=z,this.setTexture2D=k,this.setTexture2DArray=H,this.setTexture3D=J,this.setTextureCube=G,this.rebindTextures=Gt,this.setupRenderTarget=L,this.updateRenderTargetMipmap=nt,this.updateMultisampleRenderTarget=Q,this.setupDepthRenderbuffer=ce,this.setupFrameBufferTexture=bt,this.useMultisampledRTT=at}function C0(i,t){function e(n,r=pn){let s;const o=Qt.getTransfer(r);if(n===rn)return i.UNSIGNED_BYTE;if(n===Fo)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Oo)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Dc)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Pc)return i.BYTE;if(n===Lc)return i.SHORT;if(n===Xi)return i.UNSIGNED_SHORT;if(n===No)return i.INT;if(n===Xn)return i.UNSIGNED_INT;if(n===mn)return i.FLOAT;if(n===Qi)return i.HALF_FLOAT;if(n===Ic)return i.ALPHA;if(n===Uc)return i.RGB;if(n===Ge)return i.RGBA;if(n===Yi)return i.DEPTH_COMPONENT;if(n===Zi)return i.DEPTH_STENCIL;if(n===Nc)return i.RED;if(n===Bo)return i.RED_INTEGER;if(n===Fc)return i.RG;if(n===zo)return i.RG_INTEGER;if(n===ko)return i.RGBA_INTEGER;if(n===Dr||n===Ir||n===Ur||n===Nr)if(o===ne)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Dr)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ir)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ur)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Nr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Dr)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ir)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ur)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Nr)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===$s||n===js||n===Qs||n===to)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===$s)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===js)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Qs)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===to)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===eo||n===no||n===io)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(n===eo||n===no)return o===ne?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===io)return o===ne?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===ro||n===so||n===oo||n===ao||n===co||n===lo||n===uo||n===ho||n===fo||n===po||n===mo||n===go||n===_o||n===vo)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(n===ro)return o===ne?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===so)return o===ne?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===oo)return o===ne?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ao)return o===ne?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===co)return o===ne?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===lo)return o===ne?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===uo)return o===ne?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ho)return o===ne?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===fo)return o===ne?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===po)return o===ne?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===mo)return o===ne?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===go)return o===ne?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===_o)return o===ne?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===vo)return o===ne?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Fr||n===xo||n===Mo)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(n===Fr)return o===ne?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===xo)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Mo)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Oc||n===So||n===yo||n===Eo)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(n===Fr)return s.COMPRESSED_RED_RGTC1_EXT;if(n===So)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===yo)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Eo)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===qi?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}class ml extends ye{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}}const P0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,L0=`
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

}`;class D0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new ml(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Xe({vertexShader:P0,fragmentShader:L0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new je(new Zn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class I0 extends Ti{constructor(t,e){super();const n=this;let r=null,s=1,o=null,a="local-floor",l=1,c=null,u=null,h=null,f=null,d=null,g=null;const _=new D0,m={},p=e.getContextAttributes();let M=null,x=null;const v=[],A=[],w=new lt;let b=null;const R=new Pe;R.viewport=new ie;const y=new Pe;y.viewport=new ie;const E=[R,y],P=new Qh;let z=null,V=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(B){let it=v[B];return it===void 0&&(it=new Ss,v[B]=it),it.getTargetRaySpace()},this.getControllerGrip=function(B){let it=v[B];return it===void 0&&(it=new Ss,v[B]=it),it.getGripSpace()},this.getHand=function(B){let it=v[B];return it===void 0&&(it=new Ss,v[B]=it),it.getHandSpace()};function U(B){const it=A.indexOf(B.inputSource);if(it===-1)return;const rt=v[it];rt!==void 0&&(rt.update(B.inputSource,B.frame,c||o),rt.dispatchEvent({type:B.type,data:B.inputSource}))}function k(){r.removeEventListener("select",U),r.removeEventListener("selectstart",U),r.removeEventListener("selectend",U),r.removeEventListener("squeeze",U),r.removeEventListener("squeezestart",U),r.removeEventListener("squeezeend",U),r.removeEventListener("end",k),r.removeEventListener("inputsourceschange",H);for(let B=0;B<v.length;B++){const it=A[B];it!==null&&(A[B]=null,v[B].disconnect(it))}z=null,V=null,_.reset();for(const B in m)delete m[B];t.setRenderTarget(M),d=null,f=null,h=null,r=null,x=null,xt.stop(),n.isPresenting=!1,t.setPixelRatio(b),t.setSize(w.width,w.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(B){s=B,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(B){a=B,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(B){c=B},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return h},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(B){if(r=B,r!==null){if(M=t.getRenderTarget(),r.addEventListener("select",U),r.addEventListener("selectstart",U),r.addEventListener("selectend",U),r.addEventListener("squeeze",U),r.addEventListener("squeezestart",U),r.addEventListener("squeezeend",U),r.addEventListener("end",k),r.addEventListener("inputsourceschange",H),p.xrCompatible!==!0&&await e.makeXRCompatible(),b=t.getPixelRatio(),t.getSize(w),typeof XRWebGLBinding<"u"&&(h=new XRWebGLBinding(r,e)),h!==null&&"createProjectionLayer"in XRWebGLBinding.prototype){let rt=null,bt=null,Tt=null;p.depth&&(Tt=p.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,rt=p.stencil?Zi:Yi,bt=p.stencil?qi:Xn);const Ut={colorFormat:e.RGBA8,depthFormat:Tt,scaleFactor:s};f=h.createProjectionLayer(Ut),r.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),x=new qn(f.textureWidth,f.textureHeight,{format:Ge,type:rn,depthTexture:new $c(f.textureWidth,f.textureHeight,bt,void 0,void 0,void 0,void 0,void 0,void 0,rt),stencilBuffer:p.stencil,colorSpace:t.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const rt={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(r,e,rt),r.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),x=new qn(d.framebufferWidth,d.framebufferHeight,{format:Ge,type:rn,colorSpace:t.outputColorSpace,stencilBuffer:p.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),xt.setContext(r),xt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function H(B){for(let it=0;it<B.removed.length;it++){const rt=B.removed[it],bt=A.indexOf(rt);bt>=0&&(A[bt]=null,v[bt].disconnect(rt))}for(let it=0;it<B.added.length;it++){const rt=B.added[it];let bt=A.indexOf(rt);if(bt===-1){for(let Ut=0;Ut<v.length;Ut++)if(Ut>=A.length){A.push(rt),bt=Ut;break}else if(A[Ut]===null){A[Ut]=rt,bt=Ut;break}if(bt===-1)break}const Tt=v[bt];Tt&&Tt.connect(rt)}}const J=new D,G=new D;function X(B,it,rt){J.setFromMatrixPosition(it.matrixWorld),G.setFromMatrixPosition(rt.matrixWorld);const bt=J.distanceTo(G),Tt=it.projectionMatrix.elements,Ut=rt.projectionMatrix.elements,ce=Tt[14]/(Tt[10]-1),Gt=Tt[14]/(Tt[10]+1),L=(Tt[9]+1)/Tt[5],nt=(Tt[9]-1)/Tt[5],$=(Tt[8]-1)/Tt[0],ot=(Ut[8]+1)/Ut[0],Q=ce*$,mt=ce*ot,at=bt/(-$+ot),gt=at*-$;if(it.matrixWorld.decompose(B.position,B.quaternion,B.scale),B.translateX(gt),B.translateZ(at),B.matrixWorld.compose(B.position,B.quaternion,B.scale),B.matrixWorldInverse.copy(B.matrixWorld).invert(),Tt[10]===-1)B.projectionMatrix.copy(it.projectionMatrix),B.projectionMatrixInverse.copy(it.projectionMatrixInverse);else{const Wt=ce+at,kt=Gt+at,C=Q-gt,S=mt+(bt-gt),O=L*Gt/kt*Wt,Y=nt*Gt/kt*Wt;B.projectionMatrix.makePerspective(C,S,O,Y,Wt,kt),B.projectionMatrixInverse.copy(B.projectionMatrix).invert()}}function K(B,it){it===null?B.matrixWorld.copy(B.matrix):B.matrixWorld.multiplyMatrices(it.matrixWorld,B.matrix),B.matrixWorldInverse.copy(B.matrixWorld).invert()}this.updateCamera=function(B){if(r===null)return;let it=B.near,rt=B.far;_.texture!==null&&(_.depthNear>0&&(it=_.depthNear),_.depthFar>0&&(rt=_.depthFar)),P.near=y.near=R.near=it,P.far=y.far=R.far=rt,(z!==P.near||V!==P.far)&&(r.updateRenderState({depthNear:P.near,depthFar:P.far}),z=P.near,V=P.far),P.layers.mask=B.layers.mask|6,R.layers.mask=P.layers.mask&3,y.layers.mask=P.layers.mask&5;const bt=B.parent,Tt=P.cameras;K(P,bt);for(let Ut=0;Ut<Tt.length;Ut++)K(Tt[Ut],bt);Tt.length===2?X(P,R,y):P.projectionMatrix.copy(R.projectionMatrix),j(B,P,bt)};function j(B,it,rt){rt===null?B.matrix.copy(it.matrixWorld):(B.matrix.copy(rt.matrixWorld),B.matrix.invert(),B.matrix.multiply(it.matrixWorld)),B.matrix.decompose(B.position,B.quaternion,B.scale),B.updateMatrixWorld(!0),B.projectionMatrix.copy(it.projectionMatrix),B.projectionMatrixInverse.copy(it.projectionMatrixInverse),B.isPerspectiveCamera&&(B.fov=Si*2*Math.atan(1/B.projectionMatrix.elements[5]),B.zoom=1)}this.getCamera=function(){return P},this.getFoveation=function(){if(!(f===null&&d===null))return l},this.setFoveation=function(B){l=B,f!==null&&(f.fixedFoveation=B),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=B)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(P)},this.getCameraTexture=function(B){return m[B]};let ct=null;function Et(B,it){if(u=it.getViewerPose(c||o),g=it,u!==null){const rt=u.views;d!==null&&(t.setRenderTargetFramebuffer(x,d.framebuffer),t.setRenderTarget(x));let bt=!1;rt.length!==P.cameras.length&&(P.cameras.length=0,bt=!0);for(let Gt=0;Gt<rt.length;Gt++){const L=rt[Gt];let nt=null;if(d!==null)nt=d.getViewport(L);else{const ot=h.getViewSubImage(f,L);nt=ot.viewport,Gt===0&&(t.setRenderTargetTextures(x,ot.colorTexture,ot.depthStencilTexture),t.setRenderTarget(x))}let $=E[Gt];$===void 0&&($=new Pe,$.layers.enable(Gt),$.viewport=new ie,E[Gt]=$),$.matrix.fromArray(L.transform.matrix),$.matrix.decompose($.position,$.quaternion,$.scale),$.projectionMatrix.fromArray(L.projectionMatrix),$.projectionMatrixInverse.copy($.projectionMatrix).invert(),$.viewport.set(nt.x,nt.y,nt.width,nt.height),Gt===0&&(P.matrix.copy($.matrix),P.matrix.decompose(P.position,P.quaternion,P.scale)),bt===!0&&P.cameras.push($)}const Tt=r.enabledFeatures;if(Tt&&Tt.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&h){const Gt=h.getDepthInformation(rt[0]);Gt&&Gt.isValid&&Gt.texture&&_.init(Gt,r.renderState)}if(Tt&&Tt.includes("camera-access")&&(t.state.unbindTexture(),h))for(let Gt=0;Gt<rt.length;Gt++){const L=rt[Gt].camera;if(L){let nt=m[L];nt||(nt=new ml,m[L]=nt);const $=h.getCameraImage(L);nt.sourceTexture=$}}}for(let rt=0;rt<v.length;rt++){const bt=A[rt],Tt=v[rt];bt!==null&&Tt!==void 0&&Tt.update(bt,it,c||o)}ct&&ct(B,it),it.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:it}),g=null}const xt=new ul;xt.setAnimationLoop(Et),this.setAnimationLoop=function(B){ct=B},this.dispose=function(){}}}const On=new sn,U0=new ae;function N0(i,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Zc(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function r(m,p,M,x,v){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(m,p):p.isMeshToonMaterial?(s(m,p),h(m,p)):p.isMeshPhongMaterial?(s(m,p),u(m,p)):p.isMeshStandardMaterial?(s(m,p),f(m,p),p.isMeshPhysicalMaterial&&d(m,p,v)):p.isMeshMatcapMaterial?(s(m,p),g(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),_(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,M,x):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Re&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Re&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const M=t.get(p),x=M.envMap,v=M.envMapRotation;x&&(m.envMap.value=x,On.copy(v),On.x*=-1,On.y*=-1,On.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(On.y*=-1,On.z*=-1),m.envMapRotation.value.setFromMatrix4(U0.makeRotationFromEuler(On)),m.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,M,x){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*M,m.scale.value=x*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function h(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,M){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Re&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const M=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function F0(i,t,e,n){let r={},s={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(M,x){const v=x.program;n.uniformBlockBinding(M,v)}function c(M,x){let v=r[M.id];v===void 0&&(g(M),v=u(M),r[M.id]=v,M.addEventListener("dispose",m));const A=x.program;n.updateUBOMapping(M,A);const w=t.render.frame;s[M.id]!==w&&(f(M),s[M.id]=w)}function u(M){const x=h();M.__bindingPointIndex=x;const v=i.createBuffer(),A=M.__size,w=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,v),i.bufferData(i.UNIFORM_BUFFER,A,w),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,x,v),v}function h(){for(let M=0;M<a;M++)if(o.indexOf(M)===-1)return o.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(M){const x=r[M.id],v=M.uniforms,A=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,x);for(let w=0,b=v.length;w<b;w++){const R=Array.isArray(v[w])?v[w]:[v[w]];for(let y=0,E=R.length;y<E;y++){const P=R[y];if(d(P,w,y,A)===!0){const z=P.__offset,V=Array.isArray(P.value)?P.value:[P.value];let U=0;for(let k=0;k<V.length;k++){const H=V[k],J=_(H);typeof H=="number"||typeof H=="boolean"?(P.__data[0]=H,i.bufferSubData(i.UNIFORM_BUFFER,z+U,P.__data)):H.isMatrix3?(P.__data[0]=H.elements[0],P.__data[1]=H.elements[1],P.__data[2]=H.elements[2],P.__data[3]=0,P.__data[4]=H.elements[3],P.__data[5]=H.elements[4],P.__data[6]=H.elements[5],P.__data[7]=0,P.__data[8]=H.elements[6],P.__data[9]=H.elements[7],P.__data[10]=H.elements[8],P.__data[11]=0):(H.toArray(P.__data,U),U+=J.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,z,P.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(M,x,v,A){const w=M.value,b=x+"_"+v;if(A[b]===void 0)return typeof w=="number"||typeof w=="boolean"?A[b]=w:A[b]=w.clone(),!0;{const R=A[b];if(typeof w=="number"||typeof w=="boolean"){if(R!==w)return A[b]=w,!0}else if(R.equals(w)===!1)return R.copy(w),!0}return!1}function g(M){const x=M.uniforms;let v=0;const A=16;for(let b=0,R=x.length;b<R;b++){const y=Array.isArray(x[b])?x[b]:[x[b]];for(let E=0,P=y.length;E<P;E++){const z=y[E],V=Array.isArray(z.value)?z.value:[z.value];for(let U=0,k=V.length;U<k;U++){const H=V[U],J=_(H),G=v%A,X=G%J.boundary,K=G+X;v+=X,K!==0&&A-K<J.storage&&(v+=A-K),z.__data=new Float32Array(J.storage/Float32Array.BYTES_PER_ELEMENT),z.__offset=v,v+=J.storage}}}const w=v%A;return w>0&&(v+=A-w),M.__size=v,M.__cache={},this}function _(M){const x={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(x.boundary=4,x.storage=4):M.isVector2?(x.boundary=8,x.storage=8):M.isVector3||M.isColor?(x.boundary=16,x.storage=12):M.isVector4?(x.boundary=16,x.storage=16):M.isMatrix3?(x.boundary=48,x.storage=48):M.isMatrix4?(x.boundary=64,x.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),x}function m(M){const x=M.target;x.removeEventListener("dispose",m);const v=o.indexOf(x.__bindingPointIndex);o.splice(v,1),i.deleteBuffer(r[x.id]),delete r[x.id],delete s[x.id]}function p(){for(const M in r)i.deleteBuffer(r[M]);o=[],r={},s={}}return{bind:l,update:c,dispose:p}}class O0{constructor(t={}){const{canvas:e=Du(),context:n=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=o;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,p=null;const M=[],x=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=wn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const v=this;let A=!1;this._outputColorSpace=we;let w=0,b=0,R=null,y=-1,E=null;const P=new ie,z=new ie;let V=null;const U=new Zt(0);let k=0,H=e.width,J=e.height,G=1,X=null,K=null;const j=new ie(0,0,H,J),ct=new ie(0,0,H,J);let Et=!1;const xt=new Go;let B=!1,it=!1;const rt=new ae,bt=new D,Tt=new ie,Ut={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ce=!1;function Gt(){return R===null?G:1}let L=n;function nt(T,N){return e.getContext(T,N)}try{const T={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Uo}`),e.addEventListener("webglcontextlost",_t,!1),e.addEventListener("webglcontextrestored",wt,!1),e.addEventListener("webglcontextcreationerror",ht,!1),L===null){const N="webgl2";if(L=nt(N,T),L===null)throw nt(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let $,ot,Q,mt,at,gt,Wt,kt,C,S,O,Y,st,Z,Dt,pt,Ct,Pt,ut,yt,Bt,It,Mt,qt;function I(){$=new Yp(L),$.init(),It=new C0(L,$),ot=new kp(L,$,t,It),Q=new w0(L,$),ot.reversedDepthBuffer&&f&&Q.buffers.depth.setReversed(!0),mt=new Kp(L),at=new p0,gt=new R0(L,$,Q,at,ot,It,mt),Wt=new Vp(v),kt=new qp(v),C=new ef(L),Mt=new Bp(L,C),S=new Zp(L,C,mt,Mt),O=new jp(L,S,C,mt),ut=new $p(L,ot,gt),pt=new Hp(at),Y=new d0(v,Wt,kt,$,ot,Mt,pt),st=new N0(v,at),Z=new g0,Dt=new y0($),Pt=new Op(v,Wt,kt,Q,O,d,l),Ct=new T0(v,O,ot),qt=new F0(L,mt,ot,Q),yt=new zp(L,$,mt),Bt=new Jp(L,$,mt),mt.programs=Y.programs,v.capabilities=ot,v.extensions=$,v.properties=at,v.renderLists=Z,v.shadowMap=Ct,v.state=Q,v.info=mt}I();const dt=new I0(v,L);this.xr=dt,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const T=$.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=$.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(T){T!==void 0&&(G=T,this.setSize(H,J,!1))},this.getSize=function(T){return T.set(H,J)},this.setSize=function(T,N,W=!0){if(dt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}H=T,J=N,e.width=Math.floor(T*G),e.height=Math.floor(N*G),W===!0&&(e.style.width=T+"px",e.style.height=N+"px"),this.setViewport(0,0,T,N)},this.getDrawingBufferSize=function(T){return T.set(H*G,J*G).floor()},this.setDrawingBufferSize=function(T,N,W){H=T,J=N,G=W,e.width=Math.floor(T*W),e.height=Math.floor(N*W),this.setViewport(0,0,T,N)},this.getCurrentViewport=function(T){return T.copy(P)},this.getViewport=function(T){return T.copy(j)},this.setViewport=function(T,N,W,q){T.isVector4?j.set(T.x,T.y,T.z,T.w):j.set(T,N,W,q),Q.viewport(P.copy(j).multiplyScalar(G).round())},this.getScissor=function(T){return T.copy(ct)},this.setScissor=function(T,N,W,q){T.isVector4?ct.set(T.x,T.y,T.z,T.w):ct.set(T,N,W,q),Q.scissor(z.copy(ct).multiplyScalar(G).round())},this.getScissorTest=function(){return Et},this.setScissorTest=function(T){Q.setScissorTest(Et=T)},this.setOpaqueSort=function(T){X=T},this.setTransparentSort=function(T){K=T},this.getClearColor=function(T){return T.copy(Pt.getClearColor())},this.setClearColor=function(){Pt.setClearColor(...arguments)},this.getClearAlpha=function(){return Pt.getClearAlpha()},this.setClearAlpha=function(){Pt.setClearAlpha(...arguments)},this.clear=function(T=!0,N=!0,W=!0){let q=0;if(T){let F=!1;if(R!==null){const ft=R.texture.format;F=ft===ko||ft===zo||ft===Bo}if(F){const ft=R.texture.type,St=ft===rn||ft===Xn||ft===Xi||ft===qi||ft===Fo||ft===Oo,Rt=Pt.getClearColor(),At=Pt.getClearAlpha(),Ot=Rt.r,zt=Rt.g,Nt=Rt.b;St?(g[0]=Ot,g[1]=zt,g[2]=Nt,g[3]=At,L.clearBufferuiv(L.COLOR,0,g)):(_[0]=Ot,_[1]=zt,_[2]=Nt,_[3]=At,L.clearBufferiv(L.COLOR,0,_))}else q|=L.COLOR_BUFFER_BIT}N&&(q|=L.DEPTH_BUFFER_BIT),W&&(q|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),L.clear(q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",_t,!1),e.removeEventListener("webglcontextrestored",wt,!1),e.removeEventListener("webglcontextcreationerror",ht,!1),Pt.dispose(),Z.dispose(),Dt.dispose(),at.dispose(),Wt.dispose(),kt.dispose(),O.dispose(),Mt.dispose(),qt.dispose(),Y.dispose(),dt.dispose(),dt.removeEventListener("sessionstart",Qe),dt.removeEventListener("sessionend",sa),Pn.stop()};function _t(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),A=!0}function wt(){console.log("THREE.WebGLRenderer: Context Restored."),A=!1;const T=mt.autoReset,N=Ct.enabled,W=Ct.autoUpdate,q=Ct.needsUpdate,F=Ct.type;I(),mt.autoReset=T,Ct.enabled=N,Ct.autoUpdate=W,Ct.needsUpdate=q,Ct.type=F}function ht(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function tt(T){const N=T.target;N.removeEventListener("dispose",tt),Lt(N)}function Lt(T){Xt(T),at.remove(T)}function Xt(T){const N=at.get(T).programs;N!==void 0&&(N.forEach(function(W){Y.releaseProgram(W)}),T.isShaderMaterial&&Y.releaseShaderCache(T))}this.renderBufferDirect=function(T,N,W,q,F,ft){N===null&&(N=Ut);const St=F.isMesh&&F.matrixWorld.determinant()<0,Rt=bl(T,N,W,q,F);Q.setMaterial(q,St);let At=W.index,Ot=1;if(q.wireframe===!0){if(At=S.getWireframeAttribute(W),At===void 0)return;Ot=2}const zt=W.drawRange,Nt=W.attributes.position;let $t=zt.start*Ot,ee=(zt.start+zt.count)*Ot;ft!==null&&($t=Math.max($t,ft.start*Ot),ee=Math.min(ee,(ft.start+ft.count)*Ot)),At!==null?($t=Math.max($t,0),ee=Math.min(ee,At.count)):Nt!=null&&($t=Math.max($t,0),ee=Math.min(ee,Nt.count));const de=ee-$t;if(de<0||de===1/0)return;Mt.setup(F,q,Rt,W,At);let oe,re=yt;if(At!==null&&(oe=C.get(At),re=Bt,re.setIndex(oe)),F.isMesh)q.wireframe===!0?(Q.setLineWidth(q.wireframeLinewidth*Gt()),re.setMode(L.LINES)):re.setMode(L.TRIANGLES);else if(F.isLine){let Ft=q.linewidth;Ft===void 0&&(Ft=1),Q.setLineWidth(Ft*Gt()),F.isLineSegments?re.setMode(L.LINES):F.isLineLoop?re.setMode(L.LINE_LOOP):re.setMode(L.LINE_STRIP)}else F.isPoints?re.setMode(L.POINTS):F.isSprite&&re.setMode(L.TRIANGLES);if(F.isBatchedMesh)if(F._multiDrawInstances!==null)mi("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),re.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances);else if($.get("WEBGL_multi_draw"))re.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else{const Ft=F._multiDrawStarts,le=F._multiDrawCounts,jt=F._multiDrawCount,Ie=At?C.get(At).bytesPerElement:1,$n=at.get(q).currentProgram.getUniforms();for(let Ue=0;Ue<jt;Ue++)$n.setValue(L,"_gl_DrawID",Ue),re.render(Ft[Ue]/Ie,le[Ue])}else if(F.isInstancedMesh)re.renderInstances($t,de,F.count);else if(W.isInstancedBufferGeometry){const Ft=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,le=Math.min(W.instanceCount,Ft);re.renderInstances($t,de,le)}else re.render($t,de)};function se(T,N,W){T.transparent===!0&&T.side===Le&&T.forceSinglePass===!1?(T.side=Re,T.needsUpdate=!0,rr(T,N,W),T.side=Rn,T.needsUpdate=!0,rr(T,N,W),T.side=Le):rr(T,N,W)}this.compile=function(T,N,W=null){W===null&&(W=T),p=Dt.get(W),p.init(N),x.push(p),W.traverseVisible(function(F){F.isLight&&F.layers.test(N.layers)&&(p.pushLight(F),F.castShadow&&p.pushShadow(F))}),T!==W&&T.traverseVisible(function(F){F.isLight&&F.layers.test(N.layers)&&(p.pushLight(F),F.castShadow&&p.pushShadow(F))}),p.setupLights();const q=new Set;return T.traverse(function(F){if(!(F.isMesh||F.isPoints||F.isLine||F.isSprite))return;const ft=F.material;if(ft)if(Array.isArray(ft))for(let St=0;St<ft.length;St++){const Rt=ft[St];se(Rt,W,F),q.add(Rt)}else se(ft,W,F),q.add(ft)}),p=x.pop(),q},this.compileAsync=function(T,N,W=null){const q=this.compile(T,N,W);return new Promise(F=>{function ft(){if(q.forEach(function(St){at.get(St).currentProgram.isReady()&&q.delete(St)}),q.size===0){F(T);return}setTimeout(ft,10)}$.get("KHR_parallel_shader_compile")!==null?ft():setTimeout(ft,10)})};let te=null;function an(T){te&&te(T)}function Qe(){Pn.stop()}function sa(){Pn.start()}const Pn=new ul;Pn.setAnimationLoop(an),typeof self<"u"&&Pn.setContext(self),this.setAnimationLoop=function(T){te=T,dt.setAnimationLoop(T),T===null?Pn.stop():Pn.start()},dt.addEventListener("sessionstart",Qe),dt.addEventListener("sessionend",sa),this.render=function(T,N){if(N!==void 0&&N.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),dt.enabled===!0&&dt.isPresenting===!0&&(dt.cameraAutoUpdate===!0&&dt.updateCamera(N),N=dt.getCamera()),T.isScene===!0&&T.onBeforeRender(v,T,N,R),p=Dt.get(T,x.length),p.init(N),x.push(p),rt.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),xt.setFromProjectionMatrix(rt,nn,N.reversedDepth),it=this.localClippingEnabled,B=pt.init(this.clippingPlanes,it),m=Z.get(T,M.length),m.init(),M.push(m),dt.enabled===!0&&dt.isPresenting===!0){const ft=v.xr.getDepthSensingMesh();ft!==null&&jr(ft,N,-1/0,v.sortObjects)}jr(T,N,0,v.sortObjects),m.finish(),v.sortObjects===!0&&m.sort(X,K),ce=dt.enabled===!1||dt.isPresenting===!1||dt.hasDepthSensing()===!1,ce&&Pt.addToRenderList(m,T),this.info.render.frame++,B===!0&&pt.beginShadows();const W=p.state.shadowsArray;Ct.render(W,T,N),B===!0&&pt.endShadows(),this.info.autoReset===!0&&this.info.reset();const q=m.opaque,F=m.transmissive;if(p.setupLights(),N.isArrayCamera){const ft=N.cameras;if(F.length>0)for(let St=0,Rt=ft.length;St<Rt;St++){const At=ft[St];aa(q,F,T,At)}ce&&Pt.render(T);for(let St=0,Rt=ft.length;St<Rt;St++){const At=ft[St];oa(m,T,At,At.viewport)}}else F.length>0&&aa(q,F,T,N),ce&&Pt.render(T),oa(m,T,N);R!==null&&b===0&&(gt.updateMultisampleRenderTarget(R),gt.updateRenderTargetMipmap(R)),T.isScene===!0&&T.onAfterRender(v,T,N),Mt.resetDefaultState(),y=-1,E=null,x.pop(),x.length>0?(p=x[x.length-1],B===!0&&pt.setGlobalState(v.clippingPlanes,p.state.camera)):p=null,M.pop(),M.length>0?m=M[M.length-1]:m=null};function jr(T,N,W,q){if(T.visible===!1)return;if(T.layers.test(N.layers)){if(T.isGroup)W=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(N);else if(T.isLight)p.pushLight(T),T.castShadow&&p.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||xt.intersectsSprite(T)){q&&Tt.setFromMatrixPosition(T.matrixWorld).applyMatrix4(rt);const St=O.update(T),Rt=T.material;Rt.visible&&m.push(T,St,Rt,W,Tt.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||xt.intersectsObject(T))){const St=O.update(T),Rt=T.material;if(q&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Tt.copy(T.boundingSphere.center)):(St.boundingSphere===null&&St.computeBoundingSphere(),Tt.copy(St.boundingSphere.center)),Tt.applyMatrix4(T.matrixWorld).applyMatrix4(rt)),Array.isArray(Rt)){const At=St.groups;for(let Ot=0,zt=At.length;Ot<zt;Ot++){const Nt=At[Ot],$t=Rt[Nt.materialIndex];$t&&$t.visible&&m.push(T,St,$t,W,Tt.z,Nt)}}else Rt.visible&&m.push(T,St,Rt,W,Tt.z,null)}}const ft=T.children;for(let St=0,Rt=ft.length;St<Rt;St++)jr(ft[St],N,W,q)}function oa(T,N,W,q){const F=T.opaque,ft=T.transmissive,St=T.transparent;p.setupLightsView(W),B===!0&&pt.setGlobalState(v.clippingPlanes,W),q&&Q.viewport(P.copy(q)),F.length>0&&ir(F,N,W),ft.length>0&&ir(ft,N,W),St.length>0&&ir(St,N,W),Q.buffers.depth.setTest(!0),Q.buffers.depth.setMask(!0),Q.buffers.color.setMask(!0),Q.setPolygonOffset(!1)}function aa(T,N,W,q){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[q.id]===void 0&&(p.state.transmissionRenderTarget[q.id]=new qn(1,1,{generateMipmaps:!0,type:$.has("EXT_color_buffer_half_float")||$.has("EXT_color_buffer_float")?Qi:rn,minFilter:Wn,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Qt.workingColorSpace}));const ft=p.state.transmissionRenderTarget[q.id],St=q.viewport||P;ft.setSize(St.z*v.transmissionResolutionScale,St.w*v.transmissionResolutionScale);const Rt=v.getRenderTarget(),At=v.getActiveCubeFace(),Ot=v.getActiveMipmapLevel();v.setRenderTarget(ft),v.getClearColor(U),k=v.getClearAlpha(),k<1&&v.setClearColor(16777215,.5),v.clear(),ce&&Pt.render(W);const zt=v.toneMapping;v.toneMapping=wn;const Nt=q.viewport;if(q.viewport!==void 0&&(q.viewport=void 0),p.setupLightsView(q),B===!0&&pt.setGlobalState(v.clippingPlanes,q),ir(T,W,q),gt.updateMultisampleRenderTarget(ft),gt.updateRenderTargetMipmap(ft),$.has("WEBGL_multisampled_render_to_texture")===!1){let $t=!1;for(let ee=0,de=N.length;ee<de;ee++){const oe=N[ee],re=oe.object,Ft=oe.geometry,le=oe.material,jt=oe.group;if(le.side===Le&&re.layers.test(q.layers)){const Ie=le.side;le.side=Re,le.needsUpdate=!0,ca(re,W,q,Ft,le,jt),le.side=Ie,le.needsUpdate=!0,$t=!0}}$t===!0&&(gt.updateMultisampleRenderTarget(ft),gt.updateRenderTargetMipmap(ft))}v.setRenderTarget(Rt,At,Ot),v.setClearColor(U,k),Nt!==void 0&&(q.viewport=Nt),v.toneMapping=zt}function ir(T,N,W){const q=N.isScene===!0?N.overrideMaterial:null;for(let F=0,ft=T.length;F<ft;F++){const St=T[F],Rt=St.object,At=St.geometry,Ot=St.group;let zt=St.material;zt.allowOverride===!0&&q!==null&&(zt=q),Rt.layers.test(W.layers)&&ca(Rt,N,W,At,zt,Ot)}}function ca(T,N,W,q,F,ft){T.onBeforeRender(v,N,W,q,F,ft),T.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),F.onBeforeRender(v,N,W,q,T,ft),F.transparent===!0&&F.side===Le&&F.forceSinglePass===!1?(F.side=Re,F.needsUpdate=!0,v.renderBufferDirect(W,N,q,F,T,ft),F.side=Rn,F.needsUpdate=!0,v.renderBufferDirect(W,N,q,F,T,ft),F.side=Le):v.renderBufferDirect(W,N,q,F,T,ft),T.onAfterRender(v,N,W,q,F,ft)}function rr(T,N,W){N.isScene!==!0&&(N=Ut);const q=at.get(T),F=p.state.lights,ft=p.state.shadowsArray,St=F.state.version,Rt=Y.getParameters(T,F.state,ft,N,W),At=Y.getProgramCacheKey(Rt);let Ot=q.programs;q.environment=T.isMeshStandardMaterial?N.environment:null,q.fog=N.fog,q.envMap=(T.isMeshStandardMaterial?kt:Wt).get(T.envMap||q.environment),q.envMapRotation=q.environment!==null&&T.envMap===null?N.environmentRotation:T.envMapRotation,Ot===void 0&&(T.addEventListener("dispose",tt),Ot=new Map,q.programs=Ot);let zt=Ot.get(At);if(zt!==void 0){if(q.currentProgram===zt&&q.lightsStateVersion===St)return ua(T,Rt),zt}else Rt.uniforms=Y.getUniforms(T),T.onBeforeCompile(Rt,v),zt=Y.acquireProgram(Rt,At),Ot.set(At,zt),q.uniforms=Rt.uniforms;const Nt=q.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Nt.clippingPlanes=pt.uniform),ua(T,Rt),q.needsLights=Al(T),q.lightsStateVersion=St,q.needsLights&&(Nt.ambientLightColor.value=F.state.ambient,Nt.lightProbe.value=F.state.probe,Nt.directionalLights.value=F.state.directional,Nt.directionalLightShadows.value=F.state.directionalShadow,Nt.spotLights.value=F.state.spot,Nt.spotLightShadows.value=F.state.spotShadow,Nt.rectAreaLights.value=F.state.rectArea,Nt.ltc_1.value=F.state.rectAreaLTC1,Nt.ltc_2.value=F.state.rectAreaLTC2,Nt.pointLights.value=F.state.point,Nt.pointLightShadows.value=F.state.pointShadow,Nt.hemisphereLights.value=F.state.hemi,Nt.directionalShadowMap.value=F.state.directionalShadowMap,Nt.directionalShadowMatrix.value=F.state.directionalShadowMatrix,Nt.spotShadowMap.value=F.state.spotShadowMap,Nt.spotLightMatrix.value=F.state.spotLightMatrix,Nt.spotLightMap.value=F.state.spotLightMap,Nt.pointShadowMap.value=F.state.pointShadowMap,Nt.pointShadowMatrix.value=F.state.pointShadowMatrix),q.currentProgram=zt,q.uniformsList=null,zt}function la(T){if(T.uniformsList===null){const N=T.currentProgram.getUniforms();T.uniformsList=Or.seqWithValue(N.seq,T.uniforms)}return T.uniformsList}function ua(T,N){const W=at.get(T);W.outputColorSpace=N.outputColorSpace,W.batching=N.batching,W.batchingColor=N.batchingColor,W.instancing=N.instancing,W.instancingColor=N.instancingColor,W.instancingMorph=N.instancingMorph,W.skinning=N.skinning,W.morphTargets=N.morphTargets,W.morphNormals=N.morphNormals,W.morphColors=N.morphColors,W.morphTargetsCount=N.morphTargetsCount,W.numClippingPlanes=N.numClippingPlanes,W.numIntersection=N.numClipIntersection,W.vertexAlphas=N.vertexAlphas,W.vertexTangents=N.vertexTangents,W.toneMapping=N.toneMapping}function bl(T,N,W,q,F){N.isScene!==!0&&(N=Ut),gt.resetTextureUnits();const ft=N.fog,St=q.isMeshStandardMaterial?N.environment:null,Rt=R===null?v.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:Mi,At=(q.isMeshStandardMaterial?kt:Wt).get(q.envMap||St),Ot=q.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,zt=!!W.attributes.tangent&&(!!q.normalMap||q.anisotropy>0),Nt=!!W.morphAttributes.position,$t=!!W.morphAttributes.normal,ee=!!W.morphAttributes.color;let de=wn;q.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(de=v.toneMapping);const oe=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,re=oe!==void 0?oe.length:0,Ft=at.get(q),le=p.state.lights;if(B===!0&&(it===!0||T!==E)){const be=T===E&&q.id===y;pt.setState(q,T,be)}let jt=!1;q.version===Ft.__version?(Ft.needsLights&&Ft.lightsStateVersion!==le.state.version||Ft.outputColorSpace!==Rt||F.isBatchedMesh&&Ft.batching===!1||!F.isBatchedMesh&&Ft.batching===!0||F.isBatchedMesh&&Ft.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&Ft.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&Ft.instancing===!1||!F.isInstancedMesh&&Ft.instancing===!0||F.isSkinnedMesh&&Ft.skinning===!1||!F.isSkinnedMesh&&Ft.skinning===!0||F.isInstancedMesh&&Ft.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&Ft.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&Ft.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&Ft.instancingMorph===!1&&F.morphTexture!==null||Ft.envMap!==At||q.fog===!0&&Ft.fog!==ft||Ft.numClippingPlanes!==void 0&&(Ft.numClippingPlanes!==pt.numPlanes||Ft.numIntersection!==pt.numIntersection)||Ft.vertexAlphas!==Ot||Ft.vertexTangents!==zt||Ft.morphTargets!==Nt||Ft.morphNormals!==$t||Ft.morphColors!==ee||Ft.toneMapping!==de||Ft.morphTargetsCount!==re)&&(jt=!0):(jt=!0,Ft.__version=q.version);let Ie=Ft.currentProgram;jt===!0&&(Ie=rr(q,N,F));let $n=!1,Ue=!1,Ri=!1;const ue=Ie.getUniforms(),ze=Ft.uniforms;if(Q.useProgram(Ie.program)&&($n=!0,Ue=!0,Ri=!0),q.id!==y&&(y=q.id,Ue=!0),$n||E!==T){Q.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),ue.setValue(L,"projectionMatrix",T.projectionMatrix),ue.setValue(L,"viewMatrix",T.matrixWorldInverse);const Ce=ue.map.cameraPosition;Ce!==void 0&&Ce.setValue(L,bt.setFromMatrixPosition(T.matrixWorld)),ot.logarithmicDepthBuffer&&ue.setValue(L,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(q.isMeshPhongMaterial||q.isMeshToonMaterial||q.isMeshLambertMaterial||q.isMeshBasicMaterial||q.isMeshStandardMaterial||q.isShaderMaterial)&&ue.setValue(L,"isOrthographic",T.isOrthographicCamera===!0),E!==T&&(E=T,Ue=!0,Ri=!0)}if(F.isSkinnedMesh){ue.setOptional(L,F,"bindMatrix"),ue.setOptional(L,F,"bindMatrixInverse");const be=F.skeleton;be&&(be.boneTexture===null&&be.computeBoneTexture(),ue.setValue(L,"boneTexture",be.boneTexture,gt))}F.isBatchedMesh&&(ue.setOptional(L,F,"batchingTexture"),ue.setValue(L,"batchingTexture",F._matricesTexture,gt),ue.setOptional(L,F,"batchingIdTexture"),ue.setValue(L,"batchingIdTexture",F._indirectTexture,gt),ue.setOptional(L,F,"batchingColorTexture"),F._colorsTexture!==null&&ue.setValue(L,"batchingColorTexture",F._colorsTexture,gt));const ke=W.morphAttributes;if((ke.position!==void 0||ke.normal!==void 0||ke.color!==void 0)&&ut.update(F,W,Ie),(Ue||Ft.receiveShadow!==F.receiveShadow)&&(Ft.receiveShadow=F.receiveShadow,ue.setValue(L,"receiveShadow",F.receiveShadow)),q.isMeshGouraudMaterial&&q.envMap!==null&&(ze.envMap.value=At,ze.flipEnvMap.value=At.isCubeTexture&&At.isRenderTargetTexture===!1?-1:1),q.isMeshStandardMaterial&&q.envMap===null&&N.environment!==null&&(ze.envMapIntensity.value=N.environmentIntensity),Ue&&(ue.setValue(L,"toneMappingExposure",v.toneMappingExposure),Ft.needsLights&&Tl(ze,Ri),ft&&q.fog===!0&&st.refreshFogUniforms(ze,ft),st.refreshMaterialUniforms(ze,q,G,J,p.state.transmissionRenderTarget[T.id]),Or.upload(L,la(Ft),ze,gt)),q.isShaderMaterial&&q.uniformsNeedUpdate===!0&&(Or.upload(L,la(Ft),ze,gt),q.uniformsNeedUpdate=!1),q.isSpriteMaterial&&ue.setValue(L,"center",F.center),ue.setValue(L,"modelViewMatrix",F.modelViewMatrix),ue.setValue(L,"normalMatrix",F.normalMatrix),ue.setValue(L,"modelMatrix",F.matrixWorld),q.isShaderMaterial||q.isRawShaderMaterial){const be=q.uniformsGroups;for(let Ce=0,Qr=be.length;Ce<Qr;Ce++){const Ln=be[Ce];qt.update(Ln,Ie),qt.bind(Ln,Ie)}}return Ie}function Tl(T,N){T.ambientLightColor.needsUpdate=N,T.lightProbe.needsUpdate=N,T.directionalLights.needsUpdate=N,T.directionalLightShadows.needsUpdate=N,T.pointLights.needsUpdate=N,T.pointLightShadows.needsUpdate=N,T.spotLights.needsUpdate=N,T.spotLightShadows.needsUpdate=N,T.rectAreaLights.needsUpdate=N,T.hemisphereLights.needsUpdate=N}function Al(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return b},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(T,N,W){const q=at.get(T);q.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,q.__autoAllocateDepthBuffer===!1&&(q.__useRenderToTexture=!1),at.get(T.texture).__webglTexture=N,at.get(T.depthTexture).__webglTexture=q.__autoAllocateDepthBuffer?void 0:W,q.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,N){const W=at.get(T);W.__webglFramebuffer=N,W.__useDefaultFramebuffer=N===void 0};const wl=L.createFramebuffer();this.setRenderTarget=function(T,N=0,W=0){R=T,w=N,b=W;let q=!0,F=null,ft=!1,St=!1;if(T){const At=at.get(T);if(At.__useDefaultFramebuffer!==void 0)Q.bindFramebuffer(L.FRAMEBUFFER,null),q=!1;else if(At.__webglFramebuffer===void 0)gt.setupRenderTarget(T);else if(At.__hasExternalTextures)gt.rebindTextures(T,at.get(T.texture).__webglTexture,at.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const Nt=T.depthTexture;if(At.__boundDepthTexture!==Nt){if(Nt!==null&&at.has(Nt)&&(T.width!==Nt.image.width||T.height!==Nt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");gt.setupDepthRenderbuffer(T)}}const Ot=T.texture;(Ot.isData3DTexture||Ot.isDataArrayTexture||Ot.isCompressedArrayTexture)&&(St=!0);const zt=at.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(zt[N])?F=zt[N][W]:F=zt[N],ft=!0):T.samples>0&&gt.useMultisampledRTT(T)===!1?F=at.get(T).__webglMultisampledFramebuffer:Array.isArray(zt)?F=zt[W]:F=zt,P.copy(T.viewport),z.copy(T.scissor),V=T.scissorTest}else P.copy(j).multiplyScalar(G).floor(),z.copy(ct).multiplyScalar(G).floor(),V=Et;if(W!==0&&(F=wl),Q.bindFramebuffer(L.FRAMEBUFFER,F)&&q&&Q.drawBuffers(T,F),Q.viewport(P),Q.scissor(z),Q.setScissorTest(V),ft){const At=at.get(T.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+N,At.__webglTexture,W)}else if(St){const At=N;for(let Ot=0;Ot<T.textures.length;Ot++){const zt=at.get(T.textures[Ot]);L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0+Ot,zt.__webglTexture,W,At)}}else if(T!==null&&W!==0){const At=at.get(T.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,At.__webglTexture,W)}y=-1},this.readRenderTargetPixels=function(T,N,W,q,F,ft,St,Rt=0){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let At=at.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&St!==void 0&&(At=At[St]),At){Q.bindFramebuffer(L.FRAMEBUFFER,At);try{const Ot=T.textures[Rt],zt=Ot.format,Nt=Ot.type;if(!ot.textureFormatReadable(zt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ot.textureTypeReadable(Nt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=T.width-q&&W>=0&&W<=T.height-F&&(T.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+Rt),L.readPixels(N,W,q,F,It.convert(zt),It.convert(Nt),ft))}finally{const Ot=R!==null?at.get(R).__webglFramebuffer:null;Q.bindFramebuffer(L.FRAMEBUFFER,Ot)}}},this.readRenderTargetPixelsAsync=async function(T,N,W,q,F,ft,St,Rt=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let At=at.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&St!==void 0&&(At=At[St]),At)if(N>=0&&N<=T.width-q&&W>=0&&W<=T.height-F){Q.bindFramebuffer(L.FRAMEBUFFER,At);const Ot=T.textures[Rt],zt=Ot.format,Nt=Ot.type;if(!ot.textureFormatReadable(zt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ot.textureTypeReadable(Nt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const $t=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,$t),L.bufferData(L.PIXEL_PACK_BUFFER,ft.byteLength,L.STREAM_READ),T.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+Rt),L.readPixels(N,W,q,F,It.convert(zt),It.convert(Nt),0);const ee=R!==null?at.get(R).__webglFramebuffer:null;Q.bindFramebuffer(L.FRAMEBUFFER,ee);const de=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await Iu(L,de,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,$t),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,ft),L.deleteBuffer($t),L.deleteSync(de),ft}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,N=null,W=0){const q=Math.pow(2,-W),F=Math.floor(T.image.width*q),ft=Math.floor(T.image.height*q),St=N!==null?N.x:0,Rt=N!==null?N.y:0;gt.setTexture2D(T,0),L.copyTexSubImage2D(L.TEXTURE_2D,W,0,0,St,Rt,F,ft),Q.unbindTexture()};const Rl=L.createFramebuffer(),Cl=L.createFramebuffer();this.copyTextureToTexture=function(T,N,W=null,q=null,F=0,ft=null){ft===null&&(F!==0?(mi("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ft=F,F=0):ft=0);let St,Rt,At,Ot,zt,Nt,$t,ee,de;const oe=T.isCompressedTexture?T.mipmaps[ft]:T.image;if(W!==null)St=W.max.x-W.min.x,Rt=W.max.y-W.min.y,At=W.isBox3?W.max.z-W.min.z:1,Ot=W.min.x,zt=W.min.y,Nt=W.isBox3?W.min.z:0;else{const ke=Math.pow(2,-F);St=Math.floor(oe.width*ke),Rt=Math.floor(oe.height*ke),T.isDataArrayTexture?At=oe.depth:T.isData3DTexture?At=Math.floor(oe.depth*ke):At=1,Ot=0,zt=0,Nt=0}q!==null?($t=q.x,ee=q.y,de=q.z):($t=0,ee=0,de=0);const re=It.convert(N.format),Ft=It.convert(N.type);let le;N.isData3DTexture?(gt.setTexture3D(N,0),le=L.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(gt.setTexture2DArray(N,0),le=L.TEXTURE_2D_ARRAY):(gt.setTexture2D(N,0),le=L.TEXTURE_2D),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,N.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,N.unpackAlignment);const jt=L.getParameter(L.UNPACK_ROW_LENGTH),Ie=L.getParameter(L.UNPACK_IMAGE_HEIGHT),$n=L.getParameter(L.UNPACK_SKIP_PIXELS),Ue=L.getParameter(L.UNPACK_SKIP_ROWS),Ri=L.getParameter(L.UNPACK_SKIP_IMAGES);L.pixelStorei(L.UNPACK_ROW_LENGTH,oe.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,oe.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,Ot),L.pixelStorei(L.UNPACK_SKIP_ROWS,zt),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Nt);const ue=T.isDataArrayTexture||T.isData3DTexture,ze=N.isDataArrayTexture||N.isData3DTexture;if(T.isDepthTexture){const ke=at.get(T),be=at.get(N),Ce=at.get(ke.__renderTarget),Qr=at.get(be.__renderTarget);Q.bindFramebuffer(L.READ_FRAMEBUFFER,Ce.__webglFramebuffer),Q.bindFramebuffer(L.DRAW_FRAMEBUFFER,Qr.__webglFramebuffer);for(let Ln=0;Ln<At;Ln++)ue&&(L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,at.get(T).__webglTexture,F,Nt+Ln),L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,at.get(N).__webglTexture,ft,de+Ln)),L.blitFramebuffer(Ot,zt,St,Rt,$t,ee,St,Rt,L.DEPTH_BUFFER_BIT,L.NEAREST);Q.bindFramebuffer(L.READ_FRAMEBUFFER,null),Q.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else if(F!==0||T.isRenderTargetTexture||at.has(T)){const ke=at.get(T),be=at.get(N);Q.bindFramebuffer(L.READ_FRAMEBUFFER,Rl),Q.bindFramebuffer(L.DRAW_FRAMEBUFFER,Cl);for(let Ce=0;Ce<At;Ce++)ue?L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,ke.__webglTexture,F,Nt+Ce):L.framebufferTexture2D(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,ke.__webglTexture,F),ze?L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,be.__webglTexture,ft,de+Ce):L.framebufferTexture2D(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,be.__webglTexture,ft),F!==0?L.blitFramebuffer(Ot,zt,St,Rt,$t,ee,St,Rt,L.COLOR_BUFFER_BIT,L.NEAREST):ze?L.copyTexSubImage3D(le,ft,$t,ee,de+Ce,Ot,zt,St,Rt):L.copyTexSubImage2D(le,ft,$t,ee,Ot,zt,St,Rt);Q.bindFramebuffer(L.READ_FRAMEBUFFER,null),Q.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else ze?T.isDataTexture||T.isData3DTexture?L.texSubImage3D(le,ft,$t,ee,de,St,Rt,At,re,Ft,oe.data):N.isCompressedArrayTexture?L.compressedTexSubImage3D(le,ft,$t,ee,de,St,Rt,At,re,oe.data):L.texSubImage3D(le,ft,$t,ee,de,St,Rt,At,re,Ft,oe):T.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,ft,$t,ee,St,Rt,re,Ft,oe.data):T.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,ft,$t,ee,oe.width,oe.height,re,oe.data):L.texSubImage2D(L.TEXTURE_2D,ft,$t,ee,St,Rt,re,Ft,oe);L.pixelStorei(L.UNPACK_ROW_LENGTH,jt),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,Ie),L.pixelStorei(L.UNPACK_SKIP_PIXELS,$n),L.pixelStorei(L.UNPACK_SKIP_ROWS,Ue),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Ri),ft===0&&N.generateMipmaps&&L.generateMipmap(le),Q.unbindTexture()},this.copyTextureToTexture3D=function(T,N,W=null,q=null,F=0){return mi('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(T,N,W,q,F)},this.initRenderTarget=function(T){at.get(T).__webglFramebuffer===void 0&&gt.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?gt.setTextureCube(T,0):T.isData3DTexture?gt.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?gt.setTexture2DArray(T,0):gt.setTexture2D(T,0),Q.unbindTexture()},this.resetState=function(){w=0,b=0,R=null,Q.reset(),Mt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return nn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=Qt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Qt._getUnpackColorSpace()}}const Ht=Object.freeze({entrance:5.82,bulkheadA:-1.37,bulkheadB:-4.78,window:-8.33,livingHalf:3.04,workHalf:2.48,observationHalf:2.72,gateA:.16,gateB:-.18,gateHalf:1.09}),Tn=Object.freeze({x:.13,z:5.07,yaw:.075,pitch:-.035}),B0=.22,gl=[];function vn(i,t,e,n){gl.push({minX:i,maxX:t,minZ:e,maxZ:n})}function De(i,t,e,n){vn(i-e/2,i+e/2,t-n/2,t+n/2)}for(const[i,t,e]of[[Ht.entrance,Ht.bulkheadA,Ht.livingHalf],[Ht.bulkheadA,Ht.bulkheadB,Ht.workHalf],[Ht.bulkheadB,Ht.window,Ht.observationHalf]])vn(-4,-e,t,i),vn(e,4,t,i);for(const[i,t]of[[Ht.bulkheadA,Ht.gateA],[Ht.bulkheadB,Ht.gateB]])vn(-4,t-Ht.gateHalf,i-.23,i+.23),vn(t+Ht.gateHalf,4,i-.23,i+.23);vn(-4,4,Ht.entrance,7.5);vn(-1.07,1.07,Ht.entrance-.139,Ht.entrance);vn(-.21,.21,Ht.entrance-.31,Ht.entrance-.135);vn(-4,4,Ht.window-.02,Ht.window+.11);De(-2.22,Ht.window+.4,.33,.57);De(2.22,Ht.window+.4,.33,.57);De(-2.16,.91,1.47,2.43);De(-2.28,2.42,1.14,.55);De(-2.79,4.49,.48,1.17);De(2.18,2.01,1.15,2.33);De(2.22,3.58,.64,.6);De(1.18,1.94,.55,.83);De(2.56,-.48,.79,.78);De(1.7,-3.1,1.35,2.64);De(-2.18,-3.07,.54,2.46);De(-1.76,-4.07,.42,.43);De(-2.17,-6.25,.93,1.69);De(2.33,-6.73,.64,.75);function mc(i,t){for(const{minX:e,maxX:n,minZ:r,maxZ:s}of gl){const o=Math.max(e,Math.min(i,n)),a=Math.max(r,Math.min(t,s));if((i-o)**2+(t-a)**2<B0**2)return!0}return!1}function z0(i,t,e){const n=Math.max(1,Math.ceil(Math.hypot(t,e)/.07)),r=t/n,s=e/n;for(let o=0;o<n;o++)mc(i.x+r,i.z)||(i.x+=r),mc(i.x,i.z+s)||(i.z+=s)}function k0(i){return i>Ht.bulkheadA?"Crew quarters":i>Ht.bulkheadB?"Wet lab":"Observation bay"}const Ui=new D;function Ve(i,t,e,n,r,s){const o=2*Math.PI*r/4,a=Math.max(s-2*r,0),l=Math.PI/4;Ui.copy(t),Ui[n]=0,Ui.normalize();const c=.5*o/(o+a),u=1-Ui.angleTo(i)/l;return Math.sign(Ui[e])===1?u*c:a/(o+a)+c+c*(1-u)}class ea extends Cn{constructor(t=1,e=1,n=1,r=2,s=.1){const o=r*2+1;if(s=Math.min(t/2,e/2,n/2,s),super(1,1,1,o,o,o),this.type="RoundedBoxGeometry",this.parameters={width:t,height:e,depth:n,segments:r,radius:s},o===1)return;const a=this.toNonIndexed();this.index=null,this.attributes.position=a.attributes.position,this.attributes.normal=a.attributes.normal,this.attributes.uv=a.attributes.uv;const l=new D,c=new D,u=new D(t,e,n).divideScalar(2).subScalar(s),h=this.attributes.position.array,f=this.attributes.normal.array,d=this.attributes.uv.array,g=h.length/6,_=new D,m=.5/o;for(let p=0,M=0;p<h.length;p+=3,M+=2)switch(l.fromArray(h,p),c.copy(l),c.x-=Math.sign(c.x)*m,c.y-=Math.sign(c.y)*m,c.z-=Math.sign(c.z)*m,c.normalize(),h[p+0]=u.x*Math.sign(l.x)+c.x*s,h[p+1]=u.y*Math.sign(l.y)+c.y*s,h[p+2]=u.z*Math.sign(l.z)+c.z*s,f[p+0]=c.x,f[p+1]=c.y,f[p+2]=c.z,Math.floor(p/g)){case 0:_.set(1,0,0),d[M+0]=Ve(_,c,"z","y",s,n),d[M+1]=1-Ve(_,c,"y","z",s,e);break;case 1:_.set(-1,0,0),d[M+0]=1-Ve(_,c,"z","y",s,n),d[M+1]=1-Ve(_,c,"y","z",s,e);break;case 2:_.set(0,1,0),d[M+0]=1-Ve(_,c,"x","z",s,t),d[M+1]=Ve(_,c,"z","x",s,n);break;case 3:_.set(0,-1,0),d[M+0]=1-Ve(_,c,"x","z",s,t),d[M+1]=1-Ve(_,c,"z","x",s,n);break;case 4:_.set(0,0,1),d[M+0]=1-Ve(_,c,"x","y",s,t),d[M+1]=1-Ve(_,c,"y","x",s,e);break;case 5:_.set(0,0,-1),d[M+0]=Ve(_,c,"x","y",s,t),d[M+1]=1-Ve(_,c,"y","x",s,e);break}}static fromJSON(t){return new ea(t.width,t.height,t.depth,t.segments,t.radius)}}function H0(i,t=!1){const e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),r=new Set(Object.keys(i[0].morphAttributes)),s={},o={},a=i[0].morphTargetsRelative,l=new fe;let c=0;for(let u=0;u<i.length;++u){const h=i[u];let f=0;if(e!==(h.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const d in h.attributes){if(!n.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;s[d]===void 0&&(s[d]=[]),s[d].push(h.attributes[d]),f++}if(f!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(a!==h.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const d in h.morphAttributes){if(!r.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;o[d]===void 0&&(o[d]=[]),o[d].push(h.morphAttributes[d])}if(t){let d;if(e)d=h.index.count;else if(h.attributes.position!==void 0)d=h.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,d,u),c+=d}}if(e){let u=0;const h=[];for(let f=0;f<i.length;++f){const d=i[f].index;for(let g=0;g<d.count;++g)h.push(d.getX(g)+u);u+=i[f].attributes.position.count}l.setIndex(h)}for(const u in s){const h=gc(s[u]);if(!h)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;l.setAttribute(u,h)}for(const u in o){const h=o[u][0].length;if(h===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[u]=[];for(let f=0;f<h;++f){const d=[];for(let _=0;_<o[u].length;++_)d.push(o[u][_][f]);const g=gc(d);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;l.morphAttributes[u].push(g)}}return l}function gc(i){let t,e,n,r=-1,s=0;for(let c=0;c<i.length;++c){const u=i[c];if(t===void 0&&(t=u.array.constructor),t!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=u.itemSize),e!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=u.normalized),n!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(r===-1&&(r=u.gpuType),r!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;s+=u.count*e}const o=new t(s),a=new We(o,e,n);let l=0;for(let c=0;c<i.length;++c){const u=i[c];if(u.isInterleavedBufferAttribute){const h=l/e;for(let f=0,d=u.count;f<d;f++)for(let g=0;g<e;g++){const _=u.getComponent(f,g);a.setComponent(f+h,g,_)}}else o.set(u.array,l);l+=u.count*e}return r!==void 0&&(a.gpuType=r),a}const Jn=Math.PI*2,et=(i,t,e)=>new D(i,t,e);function Ee(i){return()=>{i=i+1831565813|0;let t=Math.imul(i^i>>>15,1|i);return t^=t+Math.imul(t^t>>>7,61|t),((t^t>>>14)>>>0)/4294967296}}function na(i,t=i){const e=document.createElement("canvas");return e.width=i,e.height=t,{canvas:e,ctx:e.getContext("2d")}}function Wr(i,t=!0){const e=new hh(i);return e.colorSpace=t?we:pn,e.anisotropy=4,e}function Ni(i){const{canvas:e,ctx:n}=na(256),r=Ee(652+i*119),s=n.createImageData(256,256);for(let l=0;l<256;l++)for(let c=0;c<256;c++){const u=(c+l*256)*4;let f=223+(3*Math.sin(c/31+l/29)+3*Math.cos(c/11-l/17))+(r()-.5)*25;if(i===1&&(f+=6*Math.cos(l*Math.PI/1.9)+(c%4===1?-24:3)+(l%5===0?-19:4)),i===2){const d=l+2.8*Math.sin(c/37)+1.6*Math.sin(c/91+l/13);f+=12*Math.sin(d*1.05)+7*Math.cos(d*2.8)+9*Math.sin(d/4)}if(i===3){const d=Math.hypot(c%10-5,l%10-5);f+=d>3?-11:17}i===4&&(f+=(c%8<4?-13:7)+(l%6<2?-11:5)+(r()-.5)*22),s.data[u]=s.data[u+1]=s.data[u+2]=f,s.data[u+3]=255}if(n.putImageData(s,0,0),i===0||i===2)for(let l=0;l<120;l++){const c=r()*256,u=r()*256;n.strokeStyle=r()>.45?"rgba(39,42,37,.13)":"rgba(255,253,231,.30)",n.lineWidth=.35+r()*.45,n.beginPath(),n.moveTo(c,u),n.lineTo(c+r()*(i===2?64:16),u+r()*1.6),n.stroke()}const o=Wr(e),a=Wr(e,!1);return o.wrapS=o.wrapT=Wi,a.wrapS=a.wrapT=Wi,{map:o,bumpMap:a}}function V0(){const{canvas:t,ctx:e}=na(2048),n=Wr(t),r=new cl({map:n,roughness:.83}),s=new Zr({map:n,toneMapped:!1});let o=4,a=4,l=0;function c(u,h,f){if(o+u+4>2048&&(a+=l+8,o=4,l=0),a+h+4>2048)throw new Error("Habitat graphics atlas is full.");const d=o,g=a;return o+=u+8,l=Math.max(l,h),e.save(),e.translate(d,g),e.beginPath(),e.rect(-3,-3,u+6,h+6),e.clip(),f(e,u,h),e.restore(),n.needsUpdate=!0,{u:(d+.5)/2048,v:1-(g+h-.5)/2048,w:(u-1)/2048,h:(h-1)/2048}}return{add:c,material:r,emissive:s}}function G0(i){const t=Ni(0),e=Ni(1),n=Ni(2),r=Ni(3),s=Ni(4),o=V0(),a=new Map,l={box:new Map,round:new Map,cylinder:new Map,sphere:new Map};let c=i;function u(X,K,j={}){const ct=new cl({color:K,roughness:.72,metalness:.06,...j});return ct.name=X,ct}function h(X,K,j,ct,Et,xt){return u(X,K,{...j,roughness:ct,metalness:Et,bumpScale:xt})}function f(X,K,j=1){return u(X,K,{emissive:K,emissiveIntensity:j,roughness:.49})}const d={ivory:h("salt-white enamel",13026222,t,.61,.12,.006),panel:h("gray-green powder coat",8953491,t,.68,.2,.009),darkPanel:h("jade lower steel",3825755,t,.62,.19,.009),bulk:h("deep enamel",2968391,t,.58,.25,.008),rib:h("welded shell rib",6190960,t,.59,.27,.008),lip:h("turned steel lip",9280400,t,.43,.43,.005),raw:h("machined stainless",9608861,t,.42,.55,.006),nickel:u("nickel fittings",10529957,{roughness:.33,metalness:.56}),black:u("black hardware",1383707,{roughness:.46,metalness:.28}),gasket:u("compressible neoprene",1317143,{roughness:.98,metalness:0}),weld:u("heat-tinted weld",5661787,{roughness:.67,metalness:.39}),patina:u("oxide streaks",5525305,{roughness:.95,metalness:0}),oxide:u("warm fastener patina",8873029,{roughness:.78,metalness:.26}),brass:u("brass and bronze",11109456,{roughness:.39,metalness:.45}),yellow:h("safety ochre",14853446,t,.66,.14,.004),red:h("oxide red enamel",10112572,t,.61,.19,.005),floorA:h("deck tread",4873559,r,.92,.12,.011),floorB:h("deck tread shade",5334368,r,.91,.12,.011),floorC:h("deck tread cool",3888470,r,.91,.12,.011),wood:h("oiled teak",11763018,n,.66,0,.008),woodPale:h("pale plywood",13478267,n,.61,0,.006),woodDark:h("dark teak end grain",7360826,n,.82,0,.01),tabletop:h("phenolic workbench",3689547,t,.64,.08,.008),olive:h("olive heavy canvas",7238747,e,.93,0,.014),orange:h("ginger upholstery",11759942,e,.95,0,.013),ochre:h("gold corduroy",13673319,s,.99,0,.014),cream:h("oat linen",13944998,e,.98,0,.011),seam:h("cream piping",10917495,e,.97,0,.007),teal:h("petrol wool",4812392,s,.99,0,.014),tealLight:h("muted sage wool",7575434,s,.99,0,.013),carpet:h("woven rug",10658950,s,.98,0,.012),rugRust:h("rust rug bands",9789504,s,.97,0,.011),paper:u("paper edges",14075041,{roughness:.96,metalness:0}),porcelain:u("glazed cream porcelain",14601131,{roughness:.36,metalness:.06}),ink:u("dried coffee and ink",3745567,{roughness:.45,metalness:0}),green:u("plant leaf",4876612,{roughness:.68,side:Le}),paleGreen:u("lighter plant leaf",8163921,{roughness:.72,side:Le}),clay:u("terra cotta",10970697,{roughness:.91,metalness:0}),sample:u("preserved ivory colony",11781288,{roughness:.8,metalness:0}),sampleRust:u("dried sponge",11627858,{roughness:.84,metalness:0}),glassEdge:u("polished acrylic edge",6790553,{roughness:.23,metalness:.18,emissive:3237727,emissiveIntensity:.29}),glassJar:u("sample glass",12182229,{transparent:!0,opacity:.15,depthWrite:!1,metalness:.38,roughness:.16}),fluid:u("sample preservative",6524793,{transparent:!0,opacity:.19,depthWrite:!1,roughness:.32}),lamp:f("warm frosted diffuser",16766878,1.75),daylight:f("task light diffuser",14349020,1.43),status:f("cyan light guide",8051408,1.35),amber:f("amber indicator",16755799,1.55),dimRed:f("red indicator",15300704,.9)};function g(X){if(!a.has(X)){const K=new Fi;K.name=X,a.set(X,K),i.add(K)}return c=a.get(X),c}function _(X){c=X}function m(X,K,j=0,ct=0,Et=0,xt=c){const B=new je(X,K);return B.position.set(j,ct,Et),xt.add(B),B}function p(X,K,j){return X.has(K)||X.set(K,j()),X.get(K)}function M(X,K,j,ct,Et,xt,B){const it=p(l.box,[ct,Et,xt].join(),()=>new Cn(ct,Et,xt));return m(it,B,X,K,j)}function x(X,K,j,ct,Et,xt,B,it,rt){const bt=Math.min(B,ct/2,Et/2,xt/2),Tt=rt??(bt<.021?1:2),Ut=p(l.round,[ct,Et,xt,bt,Tt].join(),()=>new ea(ct,Et,xt,Tt,bt));return m(Ut,it,X,K,j)}function v(X,K,j,ct,Et,xt,B,it=16,rt=!1){const bt=p(l.cylinder,[ct,Et,xt,it,rt].join(),()=>new Jr(ct,Et,xt,it,1,rt));return m(bt,B,X,K,j)}function A(X,K,j,ct,Et,xt,B,it=12){const rt=p(l.sphere,it,()=>new nr(1,it,8)),bt=m(rt,B,X,K,j);return bt.scale.set(ct,Et,xt),bt}function w(X,K,j,ct,Et=10,xt=j){const B=K.clone().sub(X),it=X.clone().lerp(K,.5),rt=v(it.x,it.y,it.z,xt,j,B.length(),ct,Et);return rt.quaternion.setFromUnitVectors(et(0,1,0),B.normalize()),rt}function b(X,K,j,ct,Et){const xt=K.clone().sub(X),B=X.clone().lerp(K,.5),it=M(B.x,B.y,B.z,j,xt.length(),ct,Et);return it.quaternion.setFromUnitVectors(et(0,1,0),xt.normalize()),it}function R(X,K,j,ct=20,Et=7){const xt=new jc(X);return m(new Qo(xt,ct,K,Et,!1),j)}function y(X,K,j,ct,Et,xt,B=28){return m(new jo(ct,Et,7,B),xt,X,K,j)}function E(X,K,j,ct,Et="front",xt=d.raw){const B=v(X,K,j,ct*.88,ct,ct*.45,xt,6);return Et==="front"&&(B.rotation.x=Math.PI/2),Et==="back"&&(B.rotation.x=-Math.PI/2),Et==="left"&&(B.rotation.z=Math.PI/2),Et==="right"&&(B.rotation.z=-Math.PI/2),B}function P(X,K,j,ct,Et,xt,B="front",it=!1){const rt=new Zn(ct,Et),bt=rt.getAttribute("uv");for(let Ut=0;Ut<bt.count;Ut++)bt.setXY(Ut,xt.u+bt.getX(Ut)*xt.w,xt.v+bt.getY(Ut)*xt.h);const Tt=m(rt,it?o.emissive:o.material,X,K,j);return B==="left"&&(Tt.rotation.y=-Math.PI/2),B==="right"&&(Tt.rotation.y=Math.PI/2),B==="back"&&(Tt.rotation.y=Math.PI),B==="top"&&(Tt.rotation.x=-Math.PI/2),Tt}const{canvas:z,ctx:V}=na(128),U=V.createRadialGradient(64,64,6,64,64,64);U.addColorStop(0,"rgba(6,13,11,.94)"),U.addColorStop(.47,"rgba(7,15,13,.62)"),U.addColorStop(1,"rgba(7,15,13,0)"),V.fillStyle=U,V.fillRect(0,0,128,128);const k=new Zr({map:Wr(z),transparent:!0,opacity:.76,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-1}),H=new Zn(1,1);function J(X,K,j,ct,Et=.011){const xt=m(H,k,X,Et,K);xt.rotation.x=-Math.PI/2,xt.scale.set(j,ct,1),xt.renderOrder=1}function G(){for(const X of a.values()){const K=new Map;for(const j of X.children)!j.isMesh||j.children.length||j.material.transparent||j.userData.separate||(K.has(j.material)||K.set(j.material,[]),K.get(j.material).push(j));for(const[j,ct]of K){if(ct.length<2)continue;const Et=ct.map(it=>{it.updateMatrix();const rt=it.geometry,bt=rt.index?rt.toNonIndexed():rt.clone();return bt.applyMatrix4(it.matrix),bt}),xt=H0(Et,!1);for(const it of Et)it.dispose();if(!xt)continue;X.remove(...ct);const B=new je(xt,j);B.geometry.computeBoundingSphere(),X.add(B)}}}return{scene:i,m:d,graphics:o,material:u,glow:f,group:g,use:_,mesh:m,box:M,round:x,cylinder:v,sphere:A,rod:w,beam:b,tube:R,torus:y,bolt:E,print:P,shade:J,finishMeshes:G}}function W0(i,t,e,n,r,s=8){const o=[];for(const[a,l,c]of[[1,1,0],[-1,1,Math.PI/2],[-1,-1,Math.PI],[1,-1,3*Math.PI/2]])for(let u=0;u<=s;u++){const h=c+u/s*Math.PI/2;o.push(new lt(i+a*(e/2-r)+Math.cos(h)*r,t+l*(n/2-r)+Math.sin(h)*r))}return o}function me(i,t,e,n,r,s){const o=new Yo(t);for(const l of e)o.holes.push(new To(l.slice().reverse()));const a=r>0?new Zo(o,{depth:r,bevelEnabled:!1,curveSegments:1}):new $o(o);return i.mesh(a,s,0,0,n-r)}function zi(i,t,e,n,r,s){const o=[],a=[];for(let c=0;c<t.length;c++){const u=(c+1)%t.length,h=t[c],f=t[u],d=e[c],g=e[u],_=c/t.length,m=(c+1)/t.length;o.push(h.x,h.y,n,f.x,f.y,n,d.x,d.y,r),o.push(d.x,d.y,r,f.x,f.y,n,g.x,g.y,r),a.push(_,0,m,0,_,1,_,1,m,0,m,1)}const l=new fe;return l.setAttribute("position",new Vt(o,3)),l.setAttribute("uv",new Vt(a,2)),l.computeVertexNormals(),i.mesh(l,s)}function qe(i,t,e,n="",r="cream"){const s=r==="dark",o=r==="amber";return i.graphics.add(384,124,(a,l,c)=>{a.fillStyle=s?"#263e3d":o?"#bd8644":"#c7c2a5",a.fillRect(-3,-3,l+6,c+6),a.strokeStyle=s?"#648580":"#665e48",a.lineWidth=2,a.strokeRect(5,5,l-10,c-10),a.fillStyle=s?"#90c5b5":"#3b4a42",a.fillRect(14,15,47,c-30),a.fillStyle=s?"#253d3a":"#dfcba7",a.textAlign="center",a.font="bold 19px Consolas, monospace",a.fillText(t,37,69,41),a.textAlign="left",a.fillStyle=s?"#e0e6d2":"#232c28",a.font="bold 32px sans-serif",a.fillText(e,76,n?58:74,l-90),n&&(a.font="16px Consolas, monospace",a.fillText(n,77,88,l-94))})}function X0(i){return i.graphics.add(288,48,(t,e,n)=>{t.fillStyle="#393b2f",t.fillRect(-3,-3,e+6,n+6),t.fillStyle="#aa7d3d";for(let s=-55;s<e+60;s+=44)t.beginPath(),t.moveTo(s,-4),t.lineTo(s+25,-4),t.lineTo(s-13,n+4),t.lineTo(s-38,n+4),t.fill();const r=Ee(411);for(let s=0;s<200;s++)t.fillStyle=r()<.5?"#222d2740":"#e2ce952e",t.fillRect(r()*e,r()*n,r()*3+.5,1)})}function _l(i,t=!1){const e=t?300:360,n=t?320:258;return i.graphics.add(e,n,(r,s,o)=>{const a=Ee(t?71:87);r.fillStyle="#d9c9a7",r.fillRect(-3,-3,s+6,o+6);const l=17,c=s-l*2,u=o-60;r.save(),r.beginPath(),r.rect(l,l,c,u),r.clip();const h=r.createLinearGradient(0,l,0,u+l);h.addColorStop(0,t?"#a7a087":"#c6b897"),h.addColorStop(.51,t?"#b9b99c":"#e3c9a6"),h.addColorStop(.52,t?"#53746f":"#688783"),h.addColorStop(1,"#293f3c"),r.fillStyle=h,r.fillRect(l,l,c,u),r.fillStyle=t?"#59635a":"#645c4d",r.beginPath(),r.moveTo(l,u*.52+l);for(let f=0;f<=16;f++){const d=l+f/16*c,g=Math.pow(Math.sin(f*.36+(t?.6:.04)),2)*(t?52:26);r.lineTo(d,u*.52+l-g-a()*5)}r.lineTo(s,u*.57+l),r.lineTo(l,u*.57+l),r.fill();for(let f=0;f<160;f++){const d=u*.56+l+a()*u*.45;r.fillStyle=a()<.6?"#bcc4a338":"#192d3055",r.fillRect(l+a()*c,d,2+a()*23,.5+a()*1.8)}t?(r.fillStyle="#c3b294",r.fillRect(s*.41,u*.37,10,43),r.fillRect(s*.404,u*.364,15,6),r.fillStyle="#614b36",r.fillRect(s*.407,u*.36-4,13,6)):(r.fillStyle="#2b3630",r.beginPath(),r.moveTo(s*.49,o*.57),r.lineTo(s*.67,o*.57),r.lineTo(s*.63,o*.61),r.lineTo(s*.54,o*.61),r.fill(),r.fillRect(s*.55,o*.53,s*.058,o*.04),r.fillRect(s*.58,o*.49,2,o*.057));for(let f=0;f<950;f++)r.fillStyle=a()>.46?"#3e3b2c20":"#efe2b119",r.fillRect(a()*s,a()*o,.8+a(),1);r.restore(),r.fillStyle="#4c4838",r.font="italic 17px Georgia, serif",r.fillText(t?"Cape Sable, before we went down":"With Aya off Meacham Point",19,o-19,s-38)})}function ia(i,t,e,n="#cbb885"){return i.graphics.add(272,240,(r,s,o)=>{r.fillStyle=n,r.fillRect(-3,-3,s+6,o+6),r.fillStyle="#32443a",r.font="bold 25px Georgia, serif",r.fillText(t,18,35,s-36),r.strokeStyle="#6d795866",r.beginPath(),r.moveTo(18,49),r.lineTo(s-18,49),r.stroke();for(const[a,l]of e.entries())r.font="italic 19px Georgia, serif",r.fillText(l,18,78+29*a,s-36),r.strokeStyle="#76775835",r.beginPath(),r.moveTo(18,85+29*a),r.lineTo(s-18,85+29*a),r.stroke()})}function q0(i,t,e,n,r,s){for(let o=0;o<14;o++){i.beginPath();for(let a=0;a<=110;a++){const l=a/110,c=(o+1)/15+Math.sin(l*5.8+o*.26)*.1+Math.cos(l*13.2-o*.7)*.039+Math.sin(l*21)*.014;a===0?i.moveTo(t+n*l,e+r*c):i.lineTo(t+n*l,e+r*c)}i.globalAlpha=o%s===0?.83:.37,i.stroke()}i.globalAlpha=1}function vl(i,t=!1){return i.graphics.add(t?544:405,t?323:450,(e,n,r)=>{const s=t?{bg:"#122928",ink:"#a3d7c1",contours:"#62a796",frame:"#3d6560",hot:"#dfb36a",faint:"#3c645f"}:{bg:"#c9bea0",ink:"#303f37",contours:"#4b6660",frame:"#6c7053",hot:"#a05939",faint:"#737f6263"};e.fillStyle=s.bg,e.fillRect(-3,-3,n+6,r+6),e.strokeStyle=s.frame,e.lineWidth=2,e.strokeRect(7,7,n-14,r-14),e.fillStyle=s.ink,e.font="bold 24px Consolas, monospace",e.fillText(t?"BENTHIC ARRAY / LIVE":"East Sable Shelf",19,36,n-38),e.font="12px Consolas, monospace",e.fillText(t?"SABLE SHELF / A7   ·   OPTICAL TRANSECT":"TRANSECT 04 / SHELF CONTOURS",20,55);const o=22,a=73,l=t?n*.64:n-44,c=r-120;e.save(),e.beginPath(),e.rect(o,a,l,c),e.clip(),e.strokeStyle=s.faint,e.lineWidth=1;for(let u=0;u<=12;u++)e.beginPath(),e.moveTo(o+l*u/12,a),e.lineTo(o+l*u/12,a+c),e.stroke(),e.beginPath(),e.moveTo(o,a+c*u/12),e.lineTo(o+l,a+c*u/12),e.stroke();e.strokeStyle=s.contours,q0(e,o,a,l,c,4),e.strokeStyle=s.hot,e.lineWidth=1.7,e.beginPath(),e.moveTo(o+l*.04,a+c*.72),e.lineTo(o+l*.45,a+c*.54),e.lineTo(o+l*.83,a+c*.37),e.stroke();for(const[u,h]of[[.19,.65],[.45,.54],[.67,.45],[.83,.37]])e.fillStyle=s.hot,e.fillRect(o+l*u-3,a+c*h-3,6,6);if(e.restore(),e.strokeStyle=s.frame,e.strokeRect(o,a,l,c),t){e.fillStyle=s.hot,e.font="bold 16px Consolas, monospace",e.fillText("DEPTH",395,93),e.fillStyle=s.ink,e.font="28px Consolas, monospace",e.fillText("218.6 m",395,124),e.font="13px Consolas, monospace",e.fillText("SAL 35.2 PSU",395,152),e.fillText("TEMP 05.8 °C",395,172),e.fillText("TURB 1.1 NTU",395,192),e.strokeStyle=s.contours,e.beginPath();for(let u=0;u<125;u++){const h=240+Math.sin(u*.24)*Math.sin(u*.11)*8+Math.cos(u)*2.5;u===0?e.moveTo(395,h):e.lineTo(395+u,h)}e.stroke()}e.fillStyle=s.ink,e.font="11px Consolas, monospace",e.fillText(t?"SYNCHRONIZED   /   PORT 3   /   STATION NEREID":"NEREID FIELD OFFICE   ·   SOUNDINGS IN METRES",21,r-21)})}function xl(i){return i.graphics.add(415,298,(t,e,n)=>{const r=t.createLinearGradient(0,0,e,0);r.addColorStop(0,"#cfbe98"),r.addColorStop(.47,"#d9caac"),r.addColorStop(.5,"#a4916c"),r.addColorStop(.53,"#ded1b4"),r.addColorStop(1,"#cabb99"),t.fillStyle=r,t.fillRect(-3,-3,e+6,n+6),t.font="bold 23px Georgia, serif",t.fillStyle="#384839",t.fillText("Dive log / 91",21,42),t.font="italic 17px Georgia, serif";for(const[s,o]of["06:20, low current","Recovered three tubes","from the basalt lip.","Compare polyps at","first light."].entries())t.fillText(o,21,83+s*31);for(let s=90;s<n-24;s+=31)t.strokeStyle="#67735d55",t.beginPath(),t.moveTo(18,s),t.lineTo(e/2-14,s),t.stroke();t.strokeStyle="#536044",t.lineWidth=2,t.beginPath(),t.moveTo(e*.74,n*.84),t.bezierCurveTo(e*.77,n*.59,e*.77,n*.39,e*.85,n*.16),t.moveTo(e*.76,n*.64),t.bezierCurveTo(e*.76,n*.52,e*.64,n*.51,e*.65,n*.22),t.moveTo(e*.79,n*.49),t.bezierCurveTo(e*.79,n*.36,e*.72,n*.33,e*.74,n*.14),t.moveTo(e*.79,n*.45),t.bezierCurveTo(e*.84,n*.41,e*.9,n*.42,e*.91,n*.29),t.stroke();for(const[s,o]of[[.85,.16],[.65,.22],[.74,.14],[.91,.29]])t.beginPath(),t.ellipse(e*s,n*o,4,7,.24,0,Math.PI*2),t.stroke();t.fillText("S-91 · distal tips",e*.61,n*.9)})}function Xr(i,t,e="#6b745b"){return i.graphics.add(170,224,(n,r,s)=>{n.fillStyle=e,n.fillRect(-3,-3,r+6,s+6),n.strokeStyle="#d7c28991",n.lineWidth=2,n.strokeRect(12,12,r-24,s-24),n.fillStyle="#ecd3a0",n.font="bold 20px Georgia, serif",n.textAlign="center";for(const[o,a]of t.split("|").entries())n.fillText(a,r/2,56+o*24,r-30);for(let o=0;o<4;o++)n.beginPath(),n.ellipse(r/2,s*.68,8+6*o,18+o*4,-o*.29,0,Math.PI*2),n.stroke()})}const _c=2.98;function ra(i,t,e,n){return[new lt(i,t),new lt(e,t),new lt(e,n),new lt(i,n)]}function en(i,t,e,n,r,s){return[[-t+r,e],[t-r,e],[t,e+r],[t,n-s],[t-s,n],[-t+s,n],[-t,n-s],[-t,e+r]].map(([o,a])=>new lt(o+i,a))}function Us(i,t,e,n,r,s="lamp",o=!1){const{round:a,box:l,bolt:c,m:u}=i;if(o){a(t,e,n,.246,.083,r,.03,u.bulk),a(t,e-.05,n,.133,.042,r-.105,.022,u[s]);for(const h of[-.23,.23])l(t,e-.078,n+r*h,.177,.022,.016,u.lip)}else{a(t,e,n,r,.083,.232,.03,u.bulk),a(t,e-.05,n,r-.092,.042,.133,.022,u[s]);for(const h of[-.28,.28])l(t+r*h,e-.078,n,.019,.022,.174,u.lip);for(const h of[-.5,.5])c(t+(r-.05)*h,e-.042,n,.016,"bottom",u.nickel)}}function Lr(i,t,e,n,r,s){const{m:o,round:a,box:l,bolt:c}=i,u=-r;a(t,e,n,.038,.322,s,.02,o.lip),l(t+u*.02,e,n,.01,.24,s-.072,o.gasket);for(let h=0;h<8;h++){const f=l(t+u*.036,e-.099+h*.028,n,.024,.019,s-.105,o.rib);f.rotation.z=r*.26}for(const h of[-1,1])for(const f of[-1,1])c(t+u*.027,e+h*.137,n+f*(s/2-.025),.013,r>0?"left":"right")}function Ns(i,t,e,n,r,s){const{m:o,group:a,box:l,round:c,bolt:u,rod:h,beam:f,print:d,shade:g}=i;a(t);const _=e-n,m=(e+n)/2,p=Math.ceil(_/1.24),M=_/p;l(0,-.107,m,2*r+.31,.2,_+.14,o.bulk),l(0,_c+.13,m,2*r+.34,.24,_+.1,o.bulk);for(const v of[-1,1])l(v*(r+.079),1.5,m,.161,3.15,_+.17,o.bulk);for(let v=0;v<p;v++){const A=n+(v+.5)*M;for(const b of[-1,1]){const R=b*(r-.009),y=s==="lab"||s==="obs"&&v!==p-1?o.panel:o.ivory;l(R,1.786,A,.065,1.59,M-.024,y),l(R,.533,A,.073,.873,M-.021,o.darkPanel),l(b*(r-.063),.967,A,.073,.05,M+.002,o.lip),l(b*(r-.043),.922,A,.036,.024,M+.004,o.bulk),c(b*(r-.047),.103,A,.091,.143,M-.009,.015,o.rib),h(et(b*(r-.132),.16,A-M/2),et(b*(r-.132),.16,A+M/2),.023,o.black,8);for(const P of[-1,1]){const z=A+P*(M/2-.062),V=b<0?"right":"left";for(const U of[.24,.874,1.055,2.505])u(b*(r-.047),U,z,.017,V,o.lip)}const E=l(b*(r-.153),2.746,A,.09,.52,M-.013,o.rib);E.rotation.z=b*.63,l(b*(r-.36),2.914,A,.06,.087,M+.001,o.lip)}for(let b=-2;b<=2;b++){const R=r*.4,y=b===0?o.floorB:(v+b+1)%3?o.floorA:o.floorC;l(b*R,-.028,A,R-.013,.059,M-.013,y)}const w=(r-.37)/2;for(const b of[-1.5,-.5,.5,1.5])l(w*b,2.98,A,w-.014,.079,M-.022,b===-.5||b===.5?o.ivory:o.panel);for(const b of[-1,1])l(b*(r-.28),-.007,A,.022,.018,M-.047,o.lip),l(b*(r-.43),2.884,A,.038,.049,M-.021,o.gasket)}for(const v of[n+.34,m,e-.28]){const A=ra(-r-.16,-.12,r+.16,_c+.12),w=[[-r+.105,-.042],[r-.105,-.042],[r-.105,2.515],[r-.407,2.925],[-r+.407,2.925],[-r+.105,2.515]].map(([b,R])=>new lt(b,R));me(i,A,[w],v+.074,.148,o.rib);for(const b of[-1,1]){l(b*(r-.088),.32,v,.061,.615,.205,o.bulk),l(b*(r-.106),1.65,v,.029,1.91,.052,o.lip);const R=et(b*(r-.102),2.494,v),y=et(b*(r-.426),2.891,v);f(R,y,.052,.194,o.lip);for(const E of[-.069,.069])for(const P of[.18,.43,1.47,2.38])u(b*(r-.131),P,v+E,.019,b>0?"left":"right")}}if(s==="living"){for(const v of[4.16,.5]){Us(i,.56,2.866,v,1.26);for(const A of[-2.25,2.25])c(A,2.878,v,.17,.056,.54,.022,o.bulk),l(A,2.841,v,.106,.022,.44,o.lamp)}Lr(i,-r+.057,2.305,-.7,-1,.84),Lr(i,r-.057,2.382,4.67,1,.94)}else if(s==="lab")Us(i,-.22,2.87,m,1.4,"daylight",!0),Lr(i,-r+.058,2.33,-3.13,-1,1.38);else{Us(i,-.7,2.87,-5.6,.78),Lr(i,r-.058,2.31,-6.46,1,.69);for(const v of[-1,1])c(v*(r-.15),.34,-7.42,.091,.108,.54,.026,o.black),c(v*(r-.21),.34,-7.42,.051,.059,.44,.017,o.lamp)}const x=Ee(100+p*37);for(let v=0;v<26;v++){const A=v%2===0?-1:1,w=n+.2+x()*(_-.4),b=.16+x()*.13,R=l(A*(r-.094),b,w,.006,.007+x()*.028,.011+x()*.049,v%4===0?o.oxide:o.bulk);R.rotation.x=(x()-.5)*.3}for(const v of[-1,1]){g(v*(r-.12),m,.64,_+.25),h(et(v*(r-.47),2.871,n+.075),et(v*(r-.47),2.871,e-.075),.023,o.lip),h(et(v*(r-.54),2.881,n+.077),et(v*(r-.54),2.881,e-.077),.017,o.black);for(let A=0;A<p;A++){const w=n+(A+.53)*M;l(v*(r-.505),2.878,w,.132,.065,.041,o.rib)}}}function vc(i,t,e,n,r,s,o){const{m:a,box:l,round:c,bolt:u,print:h,group:f}=i;f("Bulkhead "+r[0]);const d=en(e,Ht.gateHalf,.023,2.528,.044,.264),g=en(e,1.141,-.035,2.58,.032,.279),_=en(e,1.389,-.084,2.815,.111,.296),m=en(e,1.304,-.049,2.748,.087,.283),p=en(e,1.172,-.034,2.608,.043,.27);me(i,ra(-n-.14,-.13,n+.14,3.12),[g],t+.149,.298,a.bulk),me(i,_,[g],t+.215,.075,a.rib),me(i,_,[g],t-.139,.076,a.rib),me(i,m,[p],t+.232,.022,a.lip),me(i,m,[p],t-.208,.024,a.lip),me(i,p,[d],t+.226,.452,a.gasket);const M=en(e,Ht.gateHalf-.007,.027,2.521,.044,.264);zi(i,M,M,t+.201,t-.201,a.weld),l(e,.011,t,2.187,.024,.517,a.lip),h(e,.024,t,2.11,.209,o,"top");for(const x of[-1,1]){const v=e+x*1.235;for(const A of[.238,.58,1.105,1.633,2.14,2.387])u(v,A,t+.241,.027,"front",a.nickel),u(v,A,t-.239,.027,"back",a.nickel);for(const A of[.35,2.012])c(e+x*1.4,A,t+.156,.111,.274,.141,.028,a.bulk)}for(const x of[e-.81,e-.46,e+.46,e+.81])u(x,2.677,t+.24,.026,"front",a.nickel),u(x,2.677,t-.24,.026,"back",a.nickel);for(const[x,[v,A,w]]of[[1,r],[-1,s]]){const b=x>0?"front":"back",R=qe(i,v,A,w,"dark");c(e,2.74,t+x*.256,1.11,.197,.045,.02,a.black),h(e,2.74,t+x*.281,1.056,.173,R,b);const y=e+(x>0?.92:-.92);c(y,2.82,t+x*.19,.17,.043,.106,.012,a.gasket),l(y,2.821,t+x*.246,.108,.015,.008,a.status);for(const E of[-1,1]){if(Math.abs(n-1.4)<.25)continue;const P=e+E*(1.42+Math.min(.45,(n-1.44)/2));c(P,1.666,t+x*.156,.53,1.285,.062,.016,a.panel),l(P,.662,t+x*.153,.53,.7,.056,a.darkPanel)}}}function Y0(i){const{m:t,group:e,box:n,round:r,bolt:s,cylinder:o,torus:a,rod:l,print:c,tube:u}=i;e("Entrance seal");const h=Ht.entrance;n(0,1.5,h+.083,6.38,3.19,.183,t.bulk);const f=en(0,1.24,.07,2.744,.18,.302),d=en(0,1.093,.184,2.631,.148,.263);me(i,f,[d],h+.038,.131,t.lip),me(i,d,[],h-.027,.072,t.gasket);const g=en(0,1.048,.219,2.595,.142,.248);me(i,g,[],h-.067,.065,t.darkPanel);const _=en(0,.81,.408,2.398,.115,.21);me(i,_,[],h-.117,.025,t.panel);for(const A of[-1,1]){for(const b of[.44,.76,1.11,1.49,1.86,2.23])s(A*1.169,b,h-.099,.026,"back");for(const b of[.575,2.044])r(A*1.04,b,h-.137,.212,.269,.123,.027,t.bulk),o(A*1.126,b,h-.213,.052,.052,.337,t.raw,12);const w=A*1.615;n(w,1.774,h-.001,.442,1.89,.108,t.ivory),n(A*2.365,.48,h-.009,1.36,.832,.116,t.darkPanel)}const m=qe(i,"04","CREW BERTH","SEAL BEFORE EQUALIZING","dark");c(0,2.244,h-.145,.78,.251,m,"back");const p=1.211,M=h-.286,x=o(0,p,h-.19,.184,.192,.062,t.bulk,18);x.rotation.x=Math.PI/2,a(0,p,M,.192,.026,t.yellow,28);const v=o(0,p,M,.053,.048,.074,t.black,12);v.rotation.x=Math.PI/2;for(const A of[.45,2.54,4.64])l(et(0,p,M),et(Math.cos(A)*.195,p+Math.sin(A)*.195,M),.021,t.yellow);for(const A of[-2.58,2.57]){r(A,2.344,h-.097,.38,.573,.17,.031,t.rib),n(A-.094,2.433,h-.188,.078,.027,.012,t.status),n(A+.028,2.433,h-.188,.068,.027,.012,t.amber);for(let w=0;w<4;w++)n(A,2.324-w*.047,h-.189,.251,.016,.012,t.black);u([et(A,2.622,h-.123),et(A,2.79,h-.124),et(A*.81,2.857,h-.132),et(A*.65,2.884,h-.138)],.024,t.black,12)}}function Z0(i,t,e,n,r){const s=[...t,t[0]];let o=e*.5;for(let a=0;a<s.length-1;a++){const l=s[a],c=s[a+1],u=l.distanceTo(c);for(;o<=u;){const h=l.clone().lerp(c,o/u);r(h.x,h.y,n),o+=e}o-=u}}function J0(i,t){const{m:e,group:n,box:r,round:s,rod:o,beam:a,bolt:l,cylinder:c,print:u,shade:h}=i;n("Deep pressure port");const f=Ht.window,d=1.528,g=(k,H,J)=>W0(0,d,k,H,J,9),_=g(4.77,2.281,.543),m=g(5.13,2.483,.63),p=g(4.907,2.352,.607),M=g(4.545,2.056,.534),x=g(4.346,1.891,.492),v=g(4.192,1.771,.478),A=g(4.071,1.677,.455),w=g(4.07,1.676,.454),b=g(4.002,1.615,.435),R=g(3.995,1.608,.431);me(i,ra(-2.88,-.163,2.88,3.02),[_],f-.065,.673,e.darkPanel),me(i,m,[M],f+.197,.163,e.rib),me(i,m,[M],f+.037,.104,e.bulk),me(i,p,[M],f+.218,.028,e.lip),zi(i,M,x,f+.218,f-.123,e.raw),me(i,x,[v],f-.122,.082,e.weld),zi(i,v,v,f-.123,f-.374,e.lip),me(i,v,[A],f-.36,.101,e.gasket),zi(i,A,A,f-.361,f-.51,e.gasket),me(i,g(4.208,1.803,.482),[w],f-.505,.125,e.rib),me(i,w,[b],f-.476,.019,e.glassEdge),zi(i,b,R,f-.476,f-.573,e.glassEdge);const y=new Xe({transparent:!0,depthWrite:!1,uniforms:{},vertexShader:["varying vec3 vWorld;","void main() {","  vWorld = (modelMatrix * vec4(position, 1.0)).xyz;","  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);","}"].join(`
`),fragmentShader:["varying vec3 vWorld;","void main() {","  vec3 ray = normalize(cameraPosition - vWorld);","  float angle = 1.0 - clamp(ray.z, 0.0, 1.0);","  vec2 p = vec2(vWorld.x / 2.03, (vWorld.y - 1.528) / 0.84);","  float rim = smoothstep(0.67, 1.02, max(abs(p.x), abs(p.y)));","  float streak = sin(p.x * 26.0 + sin(p.y * 4.0) * 0.10) * sin(p.x * 8.0 + p.y * 2.0);","  float upperArc = (p.y - 0.88 + ray.y * 0.18 + p.x * 0.13) * 41.0;","  float lowerArc = (p.y + 0.86 + p.x * 0.075 - ray.y * 0.13) * 34.0;","  float ceiling = exp(-upperArc * upperArc);","  float sill = exp(-lowerArc * lowerArc);","  vec3 color = mix(vec3(0.060, 0.24, 0.23), vec3(0.50, 0.35, 0.17), ceiling * 0.65);","  float alpha = 0.025 + pow(angle, 1.9) * 0.24 + 0.098 * rim + 0.16 * ceiling + 0.085 * sill + 0.015 * streak;","  gl_FragColor = vec4(color, alpha);","  #include <colorspace_fragment>","}"].join(`
`)}),E=me(i,b,[],f-.484,0,y);E.renderOrder=6,E.name="Single pressure-rated glazing surface";const P=g(4.875,2.272,.584),z=Ee(1917);Z0(i,P,.273,f+.24,(k,H,J)=>{const G=c(k,H,J-.011,.056,.056,.024,e.bulk,14);G.rotation.x=Math.PI/2,l(k,H,J+.012,.043,"front",z()>.19?e.nickel:e.oxide),z()>.76&&r(k+.012,H-.043,J-.01,.012,.041+z()*.021,.005,e.patina)});for(const k of[-1,1]){const H=k*2.49;s(H,1.53,f+.03,.193,2.655,.249,.028,e.bulk),a(et(H,.22,f+.11),et(H,2.76,f+.185),.126,.126,e.rib);for(const ct of[.331,.866,1.56,2.247,2.709])s(H,ct,f+.183,.207,.186,.164,.038,e.rib),l(H,ct,f+.273,.043,"front",e.nickel);const J=k*1.53,G=s(J,2.769,f+.063,.189,.258,.348,.023,e.rib);G.rotation.x=.278,l(J,2.77,f+.271,.038,"front",e.nickel);const X=k*2.22,K=r(X,.303,f+.25,.185,.282,.64,e.bulk);K.rotation.x=.516,a(et(X,.06,f+.559),et(X,.616,f+.073),.104,.116,e.lip),s(X,.052,f+.49,.291,.082,.42,.027,e.rib);for(const ct of[-.077,.077])l(X+ct,.104,f+.606,.028,"up",e.raw);h(X,f+.414,.71,.88);const j=k*2.38;o(et(j,.953,f+.255),et(j,1.931,f+.255),.047,e.brass,14);for(const ct of[.983,1.9])o(et(j,ct,f+.14),et(j,ct,f+.258),.047,e.brass,12),s(j,ct,f+.15,.166,.115,.085,.018,e.bulk)}s(0,.359,f+.138,3.989,.136,.533,.03,e.bulk),s(0,.411,f+.152,3.938,.071,.506,.026,e.lip),u(0,.45,f+.315,2.7,.093,t,"top");const V=qe(i,"PV","VIEWPORT 04","CAST ACRYLIC  ·  760 mm COAMING","dark");s(0,.262,f+.357,.918,.172,.101,.019,e.black),u(0,.262,f+.411,.865,.143,V);const U=qe(i,"04","OBSERVATION","EAST SABLE SHELF  /  218 m","dark");s(0,2.849,f-.025,1.413,.175,.085,.019,e.black),u(0,2.851,f+.019,1.365,.144,U),s(0,.12,f+.211,1.691,.063,.042,.017,e.black),r(0,.118,f+.236,1.597,.018,.012,e.status)}function K0(i){const t=X0(i);Ns(i,"Living shell",Ht.entrance,Ht.bulkheadA,Ht.livingHalf,"living"),Ns(i,"Lab shell",Ht.bulkheadA,Ht.bulkheadB,Ht.workHalf,"lab"),Ns(i,"Observation shell",Ht.bulkheadB,Ht.window,Ht.observationHalf,"obs"),vc(i,Ht.bulkheadA,Ht.gateA,Ht.livingHalf,["02","WET LAB","SAMPLES / INSTRUMENTS"],["01","CREW QUARTERS","BERTH / GALLEY"],t),vc(i,Ht.bulkheadB,Ht.gateB,Ht.observationHalf,["03","OBSERVATION","EAST SABLE TRANSECT"],["02","WET LAB","RETURN TO CREW QUARTERS"],t),Y0(i),J0(i,t)}function Oe(i,t,e,n,r,s,o,a,l=0){const c=new nr(1,24,14),u=c.getAttribute("position"),h=(f,d)=>Math.sign(f)*Math.abs(f)**d;for(let f=0;f<u.count;f++){const d=h(u.getX(f),.43),g=h(u.getY(f),.7),_=h(u.getZ(f),.43),m=.008*Math.sin(_*21+d*8+l)*Math.abs(_)**2;u.setXYZ(f,d*r/2,g*s/2+m-.012*d*_,_*o/2)}return c.computeVertexNormals(),i.mesh(c,a,t,e,n)}function Ml(i,t,e,n,r,s,o,a,l=.007){const c=[];for(const[u,h,f]of[[1,1,0],[-1,1,Math.PI/2],[-1,-1,Math.PI],[1,-1,3*Math.PI/2]])for(let d=0;d<=4;d++){const g=f+d*Math.PI/8;c.push(et(t+u*(r/2-o)+Math.cos(g)*o,e,n+h*(s/2-o)+Math.sin(g)*o))}return c.push(c[0].clone()),i.tube(c,l,a,36,5)}function Sl(i,t,e,n,r,s,o,a,l,c=0){const u=(_,m)=>{const p=(Math.max(0,Math.abs(_*2-1)-.71)/.29)**1.7,M=Math.sin(_*29+m*1.27+c)*(.009+p*.018);return et(t+(_-.5)*r,e-p*(.143+Math.cos(m*11+_)*.025)+M,n+(m-.5)*s+Math.sin(_*24+c)*(.007+p*.016))};function h(_,m,p){const x=Math.max(2,Math.round((m-_)*22)),v=[],A=[],w=[];for(let R=0;R<=x;R++)for(let y=0;y<=34;y++){const E=_+R/x*(m-_),P=u(y/34,E);if(v.push(P.x,P.y,P.z),A.push(y/34,E),R<x&&y<34){const z=R*35+y;w.push(z,z+34+1,z+1,z+1,z+34+1,z+34+2)}}const b=new fe;b.setAttribute("position",new Vt(v,3)),b.setAttribute("uv",new Vt(A,2)),b.setIndex(w),b.computeVertexNormals(),i.mesh(b,p)}const f=o.clone();f.side=Le;const d=a.clone();d.side=Le;for(const[_,m,p]of[[0,.1,f],[.1,.16,d],[.16,.82,f],[.82,.87,d],[.87,.914,f],[.914,.944,d],[.944,1,f]])h(_,m,p);const g=Ee(4e3+c);for(let _=0;_<=34;_++){const m=u(_/34,.995),p=m.clone().add(et((g()-.5)*.009,-.017-g()*.023,.017+g()*.022));i.rod(m,p,.0025,_%3===0?l:o,4,.0018)}for(const _ of[0,1]){const m=[];for(let p=0;p<=8;p++)m.push(u(_,p/8));i.tube(m,.005,l,18,5)}}function yl(i,t,e,n,r,s=1,o=0){const{cylinder:a,torus:l,m:c}=i,u=.044*s,h=.087*s,f=18;a(t,e+.006,n,u*.89,u*.87,.012,r,f),a(t,e+h/2,n,u,u*.84,h,r,f,!0),a(t,e+h*.53,n,u*.91,u*.9,h*.061,c.ink,f);const d=l(t,e+h,n,u-.001,.0038*s,r,22);d.rotation.x=-Math.PI/2;const g=l(t+Math.cos(o)*u,e+h*.54,n-Math.sin(o)*u,.025*s,.0055*s,r,14);g.rotation.y=o}function ji(i,t,e,n,r,s,o,a,l){a==="front"||a==="back"?(i.round(t,e,n,r,s,.035,.009,l),i.print(t,e,n+(a==="front"?.019:-.019),r-.043,s-.042,o,a)):(i.round(t,e,n,.035,s,r,.009,l),i.print(t+(a==="right"?.019:-.019),e,n,r-.042,s-.042,o,a))}function Co(i,t,e,n,r,s,o,a,l,c=0){const{box:u,round:h,print:f,m:d}=i;u(t,e+s/2,n,r-.014,s,o-.013,d.paper).rotation.y=c,u(t,e+s+.004,n,r,.008,o,l).rotation.y=c,u(t,e+.003,n,r,.006,o,l).rotation.y=c;const g=t-Math.cos(c)*(r/2-.004),_=n+Math.sin(c)*(r/2-.004);h(g,e+s/2,_,.012,s+.006,o,.004,l).rotation.y=c,a&&f(t,e+s+.009,n,r-.009,o-.009,a,"top").rotateZ(c)}function $0(i,t,e,n,r,s){const o=[],a=[],l=e.clone().sub(t),c=et(0,1,0).cross(l).normalize(),u=l.clone().cross(c).normalize();for(let d=0;d<=9;d++){const g=d/9,_=t.clone().lerp(e,g).addScaledVector(u,Math.sin(g*Math.PI)*r),m=Math.sin(g*Math.PI)**.7*n*(1-.45*g);for(const p of[-1,0,1]){const M=_.clone().addScaledVector(c,p*m).addScaledVector(u,p===0?.014*Math.sin(g*Math.PI):0);o.push(...M),a.push((p+1)/2,g)}}const h=[];for(let d=0;d<9;d++){const g=d*3;h.push(g,g+3,g+1,g+1,g+3,g+4,g+1,g+4,g+2,g+2,g+4,g+5)}const f=new fe;f.setAttribute("position",new Vt(o,3)),f.setAttribute("uv",new Vt(a,2)),f.setIndex(h),f.computeVertexNormals(),i.mesh(f,s)}function j0(i,t,e,n){const{cylinder:r,torus:s,rod:o,m:a}=i;r(t,e+.008,n,.104,.089,.017,a.clay,18),r(t,e+.075,n,.098,.068,.131,a.clay,19),r(t,e+.14,n,.083,.085,.013,a.ink,18);const l=s(t,e+.142,n,.089,.01,a.clay,22);l.rotation.x=Math.PI/2;const c=Ee(727);for(let u=0;u<11;u++){const h=Jn*u/5.5+c()*.65,f=.2+c()*.233,d=.084+c()*.105,g=et(t+(c()-.5)*.056,e+.138,n+(c()-.5)*.052),_=g.clone().add(et(Math.cos(h)*d*.47,f*.52,Math.sin(h)*d*.47)),m=et(t+Math.cos(h)*d,e+f+.11,n+Math.sin(h)*d);o(g,_,.004,a.green,5,.003),$0(i,_,m,.032+c()*.027,.045+c()*.04,u%3===0?a.paleGreen:a.green)}}function xc(i,t,e,n,r,s,o){const{m:a,cylinder:l,round:c,beam:u,shade:h}=i;h(t,e,n*1.7,r*1.6,t<1.5?.031:.011),c(t,s,e,n,.047,r,.04,o),c(t,s-.033,e,n-.058,.029,r-.06,.016,a.woodDark);for(const f of[-1,1])for(const d of[-1,1]){const g=t+f*n*.34,_=e+d*r*.35;u(et(g+f*.04,.02,_+d*.031),et(g,s-.029,_),.039,.038,a.woodDark),l(g+f*.04,.013,_+d*.031,.025,.027,.013,a.black,8)}}function Q0(i){const{m:t,box:e,round:n,rod:r}=i,s=.03,o=1.89,a=3.06,l=2.5;n(s,.016,o,a,.019,l,.045,t.carpet);for(const c of[-1,1]){for(const[u,h,f]of[[.05,.034,t.teal],[.127,.079,t.teal],[.205,.026,t.cream],[.265,.083,t.rugRust],[.334,.023,t.teal]])e(s+c*(a/2-u),.026,o,h,.003,l-.075,f);for(let u=0;u<=69;u++){const h=s-a/2+.037+(a-.074)*u/69,f=.029+Math.sin(u*6.3)*.011+u%3*.003;r(et(h,.02,o+c*(l/2-.023)),et(h+Math.sin(u*4.2)*.009,.011,o+c*(l/2+f)),.0035,u%6===0?t.rugRust:t.seam,4)}}for(const c of[-1,1])for(let u=0;u<9;u++)e(s+c*(.19+u*.111),.027,o-.91,.052,.003,.057,u%2?t.teal:t.cream),e(s+c*(.19+u*.111),.027,o+.91,.052,.003,.057,u%2?t.teal:t.cream)}function tg(i){const{m:t,box:e,round:n,bolt:r,rod:s,torus:o,print:a,shade:l}=i,c=-2.16,u=.91;l(c,u,2.04,2.95),n(c,.235,u,1.407,.36,2.408,.041,t.bulk),n(c,.41,u,1.465,.098,2.429,.037,t.wood),n(c+.003,.496,u,1.413,.183,2.348,.078,t.cream,3),Ml(i,c+.004,.535,u,1.382,2.316,.087,t.seam,.0075);for(const x of[-.801,-.268,.266,.8])n(c+.717,.243,u+x,.03,.229,.499,.014,t.darkPanel),n(c+.739,.265,u+x,.027,.055,.158,.012,t.black),n(c+.762,.269,u+x,.028,.02,.079,.009,t.brass);n(c,.609,2.053,1.443,.493,.105,.048,t.wood);const h=n(c,.664,1.985,1.296,.29,.064,.028,t.olive);h.rotation.x=.04;for(const x of[-.353,.343]){const v=Oe(i,c+x,.651,1.648+x*.041,.603,.159,.418,t.cream,x*10);v.rotation.y=-.08+x*.22,v.rotation.x=-.102}Oe(i,c-.38,.705,1.389,.308,.207,.291,t.teal,8).rotation.y=-.45,Oe(i,c+.378,.681,1.324,.287,.095,.248,t.ochre,18).rotation.y=.331;for(let x=0;x<10;x++){const v=.53+x*.074,A=[];for(let w=0;w<=8;w++)A.push(et(c-.575+w*.144,.588+.006*Math.sin(w*.7),v+Math.sin(w+x)*.006));i.tube(A,.0025,t.seam,12,4)}Sl(i,c,.609,.233,1.476,1.064,t.teal,t.tealLight,t.seam);const f=Xr(i,"THE TIDE|BETWEEN US","#86624e");Co(i,c+.51,.608,.899,.134,.027,.197,f,t.red,.232);for(const x of[-.08,1.435]){const v=o(c+.721,.469,x,.049,.009,t.brass,17);v.rotation.y=Math.PI/2}const d=-2.28;l(d,2.42,1.42,.87),n(d,.338,2.42,1.093,.578,.529,.034,t.darkPanel),n(d,.65,2.42,1.124,.057,.547,.024,t.wood);for(const x of[.124,-.118])n(d+.55,.347,2.42+x,.029,.282,.211,.016,t.wood),n(d+.571,.422,2.42+x,.032,.025,.118,.012,t.brass);yl(i,-2.144,.681,2.497,t.porcelain,.91,.77);const g=Xr(i,"A FIELD|OF STARS","#4f625c");Co(i,-2.449,.681,2.344,.169,.039,.236,g,t.darkPanel,-.18);const _=ia(i,"Aya,",["Tea in the blue tin.","Call topside Sunday.","Tell me what the sky","looks like today."]);a(-2.987,1.2,2.48,.185,.163,_,"right").rotateZ(.1),r(-2.981,1.266,2.489,.012,"right",t.brass),n(-2.95,1.392,2.074,.11,.145,.126,.025,t.brass),s(et(-2.9,1.387,2.074),et(-2.682,1.385,2.074),.018,t.brass,9);const p=n(-2.64,1.385,2.074,.123,.095,.161,.034,t.bulk);p.rotation.z=-.17,n(-2.618,1.337,2.075,.101,.025,.131,.018,t.lamp);for(const[x,v]of[[-.16,.85],[.792,.95]])n(-2.761,2.147,x,.443,.485,v,.024,t.bulk),n(-2.518,2.151,x,.037,.424,v-.055,.017,t.wood),n(-2.492,2.06,x,.027,.03,.244,.01,t.brass);const M=_l(i);ji(i,-2.957,1.48,.39,.545,.377,M,"right",t.woodDark),n(-2.818,1.16,-.219,.366,.043,.73,.014,t.woodPale);for(let x=0;x<5;x++){const v=n(-2.872,1.283+x%2*.025,-.44+x*.066,.197,.2+x%2*.049,.059,.009,[t.teal,t.ochre,t.red,t.olive,t.wood][x]);v.rotation.x=(x-2)*.084,e(-2.768,1.37+x%2*.033,-.44+x*.064,.007,.017,.046,t.paper)}}function eg(i){const{m:t,box:e,round:n,cylinder:r,sphere:s,torus:o,print:a,shade:l}=i,c=2.18,u=2.01;l(c,u,1.69,2.79);for(const v of[-.437,.45])for(const A of[-.937,.932])n(c+v,.133,u+A,.087,.26,.091,.021,t.woodDark),r(c+v,.017,u+A,.055,.057,.026,t.black,12);n(c,.334,u,1.097,.285,2.301,.051,t.wood),n(c-.007,.437,u,1.061,.204,2.265,.055,t.orange),n(c+.447,.739,u,.252,.716,2.239,.064,t.wood),n(c+.341,.781,u,.269,.682,2.137,.097,t.orange);for(const[v,A]of[u-.475,u+.475].entries()){Oe(i,c-.103,.555,A,.827,.21,.921,t.orange,v*3),Ml(i,c-.106,.551,A,.768,.848,.122,t.woodDark,.006);const w=Oe(i,c+.331,.856,A,.265,.51,.909,t.orange,v*3+1);w.rotation.z=-.17;for(const b of[-.228,.23])s(c+.204,.891,A+b,.013,.024,.024,t.woodDark,8)}for(const v of[-1.07,1.07])n(c,.658,u+v,1.096,.104,.159,.034,t.wood),n(c+.041,.539,u+v,.993,.293,.11,.025,t.woodDark),n(c+.031,.66,u+v,.716,.112,.174,.048,t.orange);const h=Oe(i,2.409,.789,1.268,.315,.392,.397,t.ochre,11);h.rotation.x=-.244,h.rotation.z=-.35;const f=Oe(i,2.363,.741,2.687,.318,.354,.359,t.teal,19);f.rotation.x=.29,f.rotation.z=-.37,Sl(i,1.895,.648,2.86,.668,.417,t.cream,t.seam,t.cream,8),xc(i,2.22,3.58,.64,.6,.673,t.woodPale);const d=2.286,g=3.63;r(d,.72,g,.102,.116,.042,t.brass,22),r(d,.797,g,.021,.028,.149,t.brass,14),r(d,.931,g,.094,.176,.199,t.cream,24,!0);const _=o(d,.833,g,.174,.009,t.seam,28);_.rotation.x=Math.PI/2,r(d,.85,g,.145,.142,.019,t.lamp,22),s(d,1.036,g,.022,.022,.022,t.brass),e(2.049,.717,3.508,.106,.039,.182,t.woodDark).rotation.y=.16,e(2.049,.74,3.508,.087,.012,.162,t.paper).rotation.y=.16,xc(i,1.175,1.94,.55,.83,.428,t.wood),yl(i,1.236,.454,1.765,t.porcelain,1.04,-.64);const m=Xr(i,"THE|PELAGIC","#64704d");Co(i,1.15,.454,2.043,.196,.035,.242,m,t.olive,.186);const p=r(1.252,.456,1.777,.067,.067,.006,t.woodDark,24);p.position.y-=.002;const M=_l(i,!0),x=ia(i,"Sunday / day 91",["Seeds watered","Filters flushed","Bread at 18:00"],"#b0af8e");ji(i,2.954,1.641,1.73,.42,.449,M,"left",t.woodDark),ji(i,2.954,1.539,2.67,.33,.29,x,"left",t.wood),n(2.863,1.188,2.981,.289,.055,.439,.019,t.wood),j0(i,2.844,1.218,3.016),a(2.957,1.818,2.693,.307,.119,qe(i,"N","NEREID","HABITATION DIVISION"),"left")}function ng(i){const{m:t,round:e,box:n,cylinder:r,rod:s,sphere:o,tube:a,print:l,shade:c}=i,u=-2.79,h=4.49;c(u,h,.88,1.51),e(u,.383,h,.48,.066,1.171,.026,t.woodPale);for(const _ of[h-.491,h+.491])e(u,.18,_,.426,.336,.069,.023,t.bulk);e(u,.13,h,.436,.037,1.046,.012,t.rib);for(const _ of[4.25,4.515])e(u+.049,.168,_,.341,.076,.191,.026,t.black),e(u+.053,.222,_,.32,.09,.173,.043,t.olive),e(u-.04,.296,_,.141,.202,.162,.042,t.olive),e(u-.04,.402,_,.142,.017,.153,.008,t.black);n(-2.904,1.617,4.506,.083,.127,1.342,t.wood);for(let _=0;_<5;_++){const m=3.993+_*.258;s(et(-2.871,1.605,m),et(-2.786,1.581,m),.015,t.brass,9),o(-2.778,1.595,m,.031,.032,.03,t.brass,8)}const f=Oe(i,-2.755,1.192,4.292,.15,.671,.402,t.ochre,5);f.rotation.x=-.08;for(const _ of[-1,1]){const m=Oe(i,-2.727,1.188,4.292+_*.236,.151,.472,.166,t.ochre,_*7);m.rotation.x=_*-.28,e(-2.71,.978,4.292+_*.296,.149,.057,.153,.026,t.olive),e(-2.682,1.148,4.292+_*.118,.027,.147,.125,.012,t.orange)}a([et(-2.671,.894,4.302),et(-2.674,1.167,4.315),et(-2.678,1.449,4.305)],.007,t.woodDark,9,5);const d=Oe(i,-2.742,1.488,4.298,.122,.174,.267,t.orange,4);d.rotation.x=-.24;const g=qe(i,"04","CREW QUARTERS","PRIVATE BERTH / KEEP HATCH CLEAR","dark");ji(i,2.743,1.673,5.701,.605,.24,g,"back",t.woodDark),l(-2.985,1.928,4.495,.478,.152,qe(i,"A","ENTRY LOCK","SUIT RACK / DRY GEAR"),"right")}function ig(i){const{m:t,box:e,round:n,rod:r,tube:s,cylinder:o,print:a,shade:l}=i,c=2.56,u=-.48;l(c,u,1.09,1.07),n(c,.414,u,.773,.751,.765,.033,t.bulk),n(c,.835,u,.807,.075,.79,.027,t.woodPale);for(const[f,d]of[.284,.565,.72].entries())n(2.159,d,u,.032,f===0?.3:.14,.685,.014,t.wood),n(2.127,d+.032,u,.037,.024,.216,.011,t.brass);n(c+.065,.879,u+.113,.453,.017,.37,.035,t.raw),n(c+.065,.891,u+.112,.367,.01,.288,.039,t.gasket),o(c+.039,.898,u+.12,.044,.044,.01,t.rib,14),s([et(2.82,.879,-.348),et(2.82,1.066,-.348),et(2.78,1.151,-.348),et(2.7,1.143,-.348),et(2.653,1.08,-.348)],.021,t.raw,20,9),n(2.787,.909,-.436,.081,.073,.071,.017,t.raw),o(2.383,.956,-.754,.073,.098,.148,t.bulk,20),o(2.383,1.043,-.754,.077,.076,.022,t.brass,17),o(2.383,1.061,-.754,.021,.028,.033,t.black,13),r(et(2.42,.953,-.704),et(2.492,1.026,-.664),.025,t.bulk,12,.012);const h=qe(i,"T","EARL GREY","","cream");a(2.3,.974,-.75,.09,.041,h,"left"),n(2.803,1.408,-.36,.402,.047,.824,.023,t.wood);for(const[f,d]of[-.65,-.472,-.304].entries())o(2.805,1.498,d,.068,.068,.137,[t.red,t.porcelain,t.teal][f],16),o(2.805,1.576,d,.076,.076,.019,t.brass,16)}function rg(i){i.group("Living furniture"),Q0(i),tg(i),eg(i),ng(i),ig(i)}function sg(i){const{m:t,group:e,round:n,box:r,cylinder:s,rod:o,bolt:a,print:l,shade:c}=i;e("Observation furniture");const u=-2.17,h=-6.25;c(u,h,1.35,2.03),n(u,.252,h,.915,.388,1.693,.031,t.bulk),n(u,.435,h,.932,.056,1.695,.038,t.wood),Oe(i,u-.037,.513,h+.136,.79,.143,1.344,t.olive,3),n(u-.385,.681,h+.138,.096,.48,1.403,.029,t.wood),Oe(i,u-.302,.689,h+.139,.134,.342,1.251,t.teal,7),Oe(i,u-.173,.646,h-.303,.303,.289,.302,t.ochre,3).rotation.z=.27;for(const _ of[h-.435,h+.295])n(u+.465,.255,_,.027,.212,.616,.013,t.darkPanel),n(u+.485,.28,_,.031,.034,.171,.014,t.brass);ji(i,-2.64,1.54,-6.08,.539,.588,vl(i),"right",t.woodDark);const f=2.33,d=-6.73;c(f,d,.84,1.01),n(f,.477,d,.64,.9,.744,.041,t.darkPanel),n(f,.94,d,.652,.084,.756,.023,t.woodPale);for(const _ of[.275,.54,.707])n(2.005,_,d,.032,.133,.57,.014,t.bulk),n(1.986,_,d,.029,.019,.143,.008,t.brass);const g=xl(i);r(2.275,.991,-6.72,.315,.019,.41,t.woodDark).rotation.y=Math.PI/2,r(2.275,1.003,-6.72,.307,.013,.4,t.paper),l(2.275,1.011,-6.72,.4,.306,g,"top").rotateZ(Math.PI/2),o(et(2.132,1.018,-6.81),et(2.164,1.018,-6.654),.006,t.brass,7,.005),n(2.636,1.584,-7.191,.139,.416,.591,.038,t.bulk);for(const[_,m]of[-7.329,-7.063].entries()){const M=s(2.55,1.596,m,.104,.105,.031,t.raw,24);M.rotation.z=Math.PI/2;const x=i.graphics.add(148,148,(v,A,w)=>{v.fillStyle="#bcb798",v.fillRect(-3,-3,A+6,w+6),v.strokeStyle="#283c36",v.lineWidth=2,v.beginPath(),v.arc(74,74,71,0,Jn),v.stroke();for(let b=0;b<=12;b++){const R=(135+b*22.5)/180*Math.PI;v.beginPath(),v.moveTo(74+Math.cos(R)*63,74+Math.sin(R)*63),v.lineTo(74+Math.cos(R)*55,74+Math.sin(R)*55),v.stroke()}v.fillStyle="#334136",v.textAlign="center",v.font="bold 12px Consolas, monospace",v.fillText(_===0?"Δ P":"INT",74,108),v.strokeStyle="#a74731",v.lineWidth=4,v.beginPath(),v.moveTo(74,74),v.lineTo(_===0?91:55,29),v.stroke()});l(2.55-.018,1.596,m,.144,.144,x,"left"),a(2.55-.019,1.596,m,.012,"left",t.black)}l(2.562,1.443,-7.186,.32,.066,qe(i,"P","PRESSURE","INTERIOR / DIFFERENTIAL","dark"),"left")}function Po(i,t,e,n,r,s=1){const{m:o,round:a,box:l,cylinder:c,bolt:u}=i,h=r>0?"right":"left";a(t,e,n,.019,.169*s,.307*s,.012,o.bulk);const f=t+r*.016;l(f,e+.031*s,n+.068*s,.011,.041*s,.1*s,o.black);for(let g=0;g<4;g++)l(f+r*.007,e+.032*s,n+(.032+g*.019)*s,.006,.01*s,.008*s,g===1?o.amber:o.status);const d=c(f+r*.009,e-.007*s,n-.08*s,.033*s,.037*s,.021,o.black,12);d.rotation.z=-r*Math.PI/2,l(f+r*.018,e+.007*s,n-.08*s,.005,.012*s,.004*s,o.ivory);for(const g of[-1,1])for(const _ of[-1,1])u(f,e+.065*s*g,n+.128*s*_,.008*s,h,o.nickel)}function og(i,t,e,n){const{m:r,round:s,box:o,cylinder:a,rod:l,torus:c,tube:u,bolt:h,sphere:f,print:d}=i;s(t,e+.036,n,.518,.055,.361,.034,r.gasket),s(t,e+.075,n,.511,.082,.352,.036,r.ivory),s(t+.12,e+.147,n,.179,.125,.263,.03,r.panel),u([et(t+.16,e+.145,n),et(t+.196,e+.276,n),et(t+.192,e+.485,n),et(t+.131,e+.56,n),et(t+.031,e+.569,n)],.054,r.ivory,24,12),s(t-.042,e+.55,n,.239,.091,.235,.035,r.bulk),s(t-.105,e+.598,n,.178,.052,.179,.026,r.raw);for(const _ of[-.064,.065]){const m=et(t-.101,e+.596,n+_),p=et(t-.168,e+.682,n+_),M=et(t-.199,e+.724,n+_);l(m,p,.033,r.ivory,14,.03),l(p,M,.036,r.black,16);const x=M.clone().add(et(-.0019,.0027,0));l(M,x,.022,r.tealLight,16)}for(const _ of[-.156,.154]){const m=a(t+.196,e+.278,n+_,.06,.057,.049,r.black,16);m.rotation.x=Math.PI/2;const p=a(t+.196,e+.278,n+_*1.18,.033,.033,.016,r.raw,12);p.rotation.x=Math.PI/2,h(t+.196,e+.278,n+_*1.25,.016,_<0?"back":"front",r.black)}a(t-.089,e+.483,n,.083,.077,.045,r.raw,18);for(const[_,m]of[-.049,.038,-.006].entries()){const p=et(t-.085-(_===2?-.051:.009),e+.465,n+m),M=p.clone().add(et(_===2?.024:-.011,-.099+_*.011,(_-1)*.015)),x=M.clone().add(et(0,-.033,0));l(p,M,.022,r.black,12,.016),l(M,x,.0165,r.nickel,14),l(p.clone().lerp(M,.76),p.clone().lerp(M,.82),.022,[r.red,r.yellow,r.status][_],10)}s(t-.078,e+.274,n,.301,.028,.269,.014,r.black),s(t-.112,e+.295,n,.168,.009,.106,.005,r.raw);const g=s(t-.127,e+.303,n,.114,.01,.074,.007,r.glassJar);g.renderOrder=2;for(const _ of[-.047,.043])o(t-.073,e+.306,n+_,.105,.012,.013,r.nickel),h(t-.026,e+.316,n+_,.008,"up",r.raw);a(t-.108,e+.186,n,.049,.057,.148,r.bulk,15),a(t-.108,e+.245,n,.041,.048,.016,r.daylight,14),f(t-.161,e+.115,n+.099,.018,.005,.018,r.amber,10),d(t-.263,e+.077,n,.154,.034,qe(i,"M","MICROSCOPE","","dark"),"left"),u([et(t+.241,e+.065,n+.119),et(t+.365,e+.026,n+.116),et(t+.551,e+.027,n+.181),et(t+.614,e+.105,n+.246),et(2.357,e+.35,n+.32)],.0081,r.black,19)}function El(i,t,e,n,r){const{rod:s,sphere:o}=i,a=Ee(n);function l(c,u,h,f,d){const g=c.clone().addScaledVector(u,h*.55),_=c.clone().addScaledVector(u,h).add(et((a()-.5)*h*.28,h*.096,(a()-.5)*h*.37));if(s(c,g,f,r,6,f*.86),s(g,_,f*.86,r,6,f*.65),d<=0){o(_.x,_.y,_.z,f*1.77,f*2.35,f*1.65,r,8);return}for(let m=0;m<2;m++){const p=et((a()-.5)*.75+(m?.45:-.45),.19,(a()-.5)*.86);l(m?g:_,u.clone().multiplyScalar(.58).add(p).normalize(),h*(.52+a()*.13),f*.65,d-1)}}l(t,et(.05,1,.1).normalize(),.145*e,.011*e,3)}function Lo(i,t,e,n,r,s,o){const{m:a,cylinder:l,torus:c,sphere:u,rod:h,print:f}=i,d=.058*r,g=.236*r;l(t,e+.009,n,d*.968,d*.94,.018,a.raw,18),l(t,e+.065*r,n,d*.88,d*.87,.085*r,a.fluid,18).renderOrder=2;const _=c(t,e+.108*r,n,d*.89,.0018,a.tealLight,20);_.rotation.x=Math.PI/2,l(t,e+g*.524,n,d*.961,d*.958,g*.963,a.glassJar,24,!0).renderOrder=3,l(t,e+g,n,d*1.04,d*1.05,.037*r,s===2?a.bulk:a.nickel,20),l(t,e+g-.023*r,n,d*.997,d*.993,.011*r,a.gasket,19),l(t,e+.022*r,n,d*.956,d*.956,.008,a.lip,17);for(let m=0;m<10;m++){const p=m/10*Jn;h(et(t+d*1.031*Math.cos(p),e+g-.015*r,n+d*1.031*Math.sin(p)),et(t+d*1.031*Math.cos(p),e+g+.012*r,n+d*1.031*Math.sin(p)),.0026,a.rib,4)}if(s===0)El(i,et(t,e+.023,n),.65*r,49,a.sample);else if(s===1)for(const[m,p,M,x]of[[.011,.034,.006,.027],[-.02,.054,-.012,.022],[.011,.073,-.015,.018],[.021,.091,-.012,.012]])u(t+m*r,e+p*r,n+M*r,x*r,x*1.4*r,x*.85*r,a.sampleRust,8);else for(let m=0;m<4;m++){const p=m*2.25;h(et(t+Math.cos(p)*d*.38,e+.028,n+Math.sin(p)*d*.4),et(t+Math.cos(p)*d*.44,e+(.132+.02*m)*r,n+Math.sin(p)*d*.49),.0075*r,a.sample,8,.009*r)}o&&f(t-d*1.01,e+g*.29,n,d*1.21,.027*r,o,"left")}function Fs(i,t,e,n,r,s){const{round:o,box:a,bolt:l,m:c}=i;o(t,e,n,.038,s,r,.013,c.darkPanel),o(t-.029,e+s*.2,n,.029,.042,r*.4,.013,c.black),o(t-.048,e+s*.219,n,.028,.016,r*.36,.007,c.brass),a(t-.02,e-.02,n+r*.32,.006,.024,.059,c.paper);for(const u of[-1,1])l(t-.022,e-s*.3,n+u*r*.424,.008,"left",c.lip)}function ag(i){const{m:t,box:e,round:n,rod:r,tube:s,bolt:o,cylinder:a,torus:l,print:c,shade:u}=i,h=1.7,f=-3.1,d=.935;u(h,f,1.86,3.03);for(const b of[-1.892,-4.289]){n(1.118,.468,b,.104,.868,.132,.021,t.bulk),n(2.236,.468,b,.092,.867,.091,.017,t.bulk),n(1.675,.754,b,1.235,.099,.118,.018,t.bulk),n(1.139,.045,b,.168,.073,.187,.022,t.rib);for(const R of[-.05,.05])o(1.139+R,.087,b,.015,"up",t.nickel)}n(h,d-.1,f,1.31,.171,2.622,.034,t.bulk),n(h,d-.039,f,1.351,.078,2.639,.032,t.tabletop),n(1.036,d-.056,f,.03,.045,2.556,.014,t.lip),n(2.342,1.03,f,.069,.182,2.626,.02,t.darkPanel),n(1.633,.5,-2.251,1.055,.715,.601,.028,t.bulk);for(const[b,R]of[[.272,.192],[.496,.222],[.723,.204]])Fs(i,1.09,b,-2.251,.551,R);n(1.672,.551,-4.04,.974,.606,.479,.024,t.bulk),Fs(i,1.177,.415,-4.04,.44,.249),Fs(i,1.177,.686,-4.04,.44,.252),n(1.794,.208,-3.109,.722,.052,1.059,.022,t.darkPanel),n(2.382,1.447,-2.695,.118,.654,1.655,.02,t.rib),e(2.309,1.452,-2.696,.027,.59,1.592,t.bulk);for(let b=0;b<8;b++)e(2.285,1.203+b*.069,-2.697,.026,.012,1.559,t.rib);for(let b=0;b<7;b++){const R=-1.947-b*.242;for(const y of[1.22,1.7])o(2.268,y,R,.013,"left",t.nickel)}n(2.403,1.97,-3.091,.141,.114,2.421,.027,t.black),n(2.294,1.941,-2.814,.171,.083,1.389,.028,t.bulk),n(2.216,1.904,-2.813,.191,.034,1.29,.014,t.daylight);for(const b of[-1.99,-4.205])r(et(2.368,1.94,b),et(2.366,2.693,b),.021,t.gasket,9),n(2.354,2.387,b,.064,.076,.064,.017,t.rib);Po(i,2.271,1.272,-2.743,-1,1);const g=ia(i,"For next shift",["Bottle 91: hydroid","Bottle 92: sponge","Rack D: tube cores","Dry the objectives."]);e(2.258,1.541,-2.26,.032,.256,.246,t.woodDark).rotation.x=-.047,c(2.237,1.543,-2.26,.215,.204,g,"left").rotateZ(-.047),n(2.226,1.64,-2.267,.038,.034,.111,.008,t.raw),n(2.337,1.552,-3.995,.247,.511,.793,.032,t.bulk),n(2.198,1.546,-3.995,.046,.489,.767,.022,t.black),c(2.171,1.565,-3.995,.704,.403,vl(i,!0),"left",!0);for(const b of[-3.682,-4.285])o(2.169,1.333,b,.014,"left",t.raw);e(2.169,1.334,-3.754,.011,.012,.035,t.status),s([et(2.286,1.306,-4.081),et(2.293,1.221,-4.065),et(2.342,1.173,-4.17),et(2.384,1.209,-4.235)],.0075,t.gasket,18);const _=1.652,m=-4.083;n(_,d+.016,m,.207,.031,.516,.017,t.black);for(let b=0;b<4;b++)for(let R=0;R<14;R++)e(_+(b-1.5)*.039,d+.035,m+(R-6.5)*.0325,.026,.009,.025,b===0&&R%5===0?t.panel:t.rib);const p=xl(i);e(1.207,d+.01,-3.615,.28,.017,.42,t.woodDark),e(1.207,d+.024,-3.615,.267,.014,.404,t.paper),c(1.207,d+.032,-3.615,.404,.266,p,"top").rotateZ(Math.PI/2),r(et(1.333,d+.037,-3.764),et(1.288,d+.036,-3.592),.007,t.yellow,7,.006),og(i,1.611,d,-3.171);const M=1.361,x=-2.163;n(M,d+.023,x,.486,.041,.504,.027,t.raw),n(M,d+.048,x,.435,.013,.454,.02,t.bulk);for(const b of[-1,1])n(M+.226*b,d+.068,x,.021,.044,.484,.01,t.raw),n(M,d+.067,x+.238*b,.427,.04,.022,.009,t.raw);const v=qe(i,"S","SAMPLE 91","SABLE SHELF");Lo(i,M+.075,d+.058,-2.079,1.14,0,v),Lo(i,M+.067,d+.058,-2.266,.95,1,v),a(M-.114,d+.067,x+.019,.07,.067,.026,t.raw,23),a(M-.114,d+.086,x+.019,.06,.06,.01,t.ink,22),El(i,et(M-.111,d+.091,x+.023),.245,71,t.sample),r(et(M-.158,d+.061,-2.344),et(M-.103,d+.061,-2.248),.004,t.nickel),r(et(M-.148,d+.063,-2.342),et(M-.101,d+.063,-2.249),.004,t.nickel);const A=2.096,w=-2.209;n(A,d+.104,w,.272,.205,.434,.034,t.bulk),n(A,d+.208,w,.286,.045,.446,.023,t.darkPanel),n(A-.147,d+.134,w,.02,.055,.133,.011,t.amber),Po(i,A-.149,d+.103,w,-1,.69),e(2.102,d+.24,-2.2,.064,.015,.161,t.woodDark);for(const b of[-2.028,-2.389])e(1.95,d+.153,b,.025,.061,.038,t.raw),o(1.933,d+.154,b,.01,"left",t.black)}function cg(i){const{m:t,box:e,round:n,rod:r,bolt:s,cylinder:o,print:a,shade:l,tube:c}=i,u=-2.18,h=-3.07,f=2.46,d=f/2;l(u,h,.98,3),n(u-.093,1.27,h,.36,2.252,f,.021,t.bulk),e(u+.099,1.287,h,.043,2.176,f-.107,t.darkPanel);const g=[.317,.735,1.147,1.659,2.143];for(const M of g)n(u+.008,M,h,.539,.061,f,.016,t.rib),n(u+.278,M+.017,h,.034,.051,f-.037,.012,t.lip);for(const M of[-1,1]){n(u+.254,1.185,h+M*(d-.025),.062,2.318,.074,.015,t.bulk);for(const x of g)s(u+.292,x+.005,h+M*(d-.025),.016,"right",t.raw)}const _=qe(i,"D","COLD ARCHIVE","RETURN SAMPLES TO ASSIGNED SLOTS","dark");a(u+.298,2.152,h,.729,.085,_,"right");for(const[M,x]of[-4.003,-3.37,-2.746,-2.12].entries())for(const v of[.477,.909]){const A=[t.tabletop,t.olive,t.darkPanel,t.rib][M];n(u+.101,v,x,.336,.237,.526,.027,A),n(u+.101,v+.113,x,.354,.051,.544,.021,t.bulk),n(u+.279,v+.052,x,.034,.071,.191,.012,t.black),e(u+.299,v+.051,x,.01,.025,.132,t.raw),e(u+.278,v-.046,x-.152,.006,.03,.089,t.paper);for(const w of[-1,1])s(u+.282,v+.01,x+w*.183,.012,"right",t.raw)}for(const M of[1.296,1.817]){const x=M<1.6?t.ochre:t.bulk;for(const v of[-3.92,-3.59,-3.26])n(u+.135,M,v,.253,.237,.279,.019,x),n(u+.271,M+.014,v,.03,.119,.235,.015,t.bulk),n(u+.292,M+.035,v,.024,.027,.095,.01,t.raw)}for(let M=0;M<7;M++){const x=-2.96+M*.151;Lo(i,u+.111,1.179,x,.79+M%2*.11,M%3)}for(const M of[-2.91,-2.43])n(u+.114,1.834,M,.278,.289,.415,.02,t.bulk),n(u+.257,1.835,M,.026,.25,.367,.013,t.panel),Po(i,u+.278,1.833,M,1,.91);const m=Xr(i,"SABLE|TRANSECTS","#6b6852");n(u+.12,1.814,-2.007,.204,.248,.138,.013,t.woodDark),a(u+.225,1.818,-2.008,.12,.233,m,"right");const p=-4.07;n(-1.76,.293,p,.421,.572,.426,.045,t.darkPanel),n(-1.76,.594,p,.42,.074,.422,.027,t.rib),o(-1.758,.675,p,.099,.116,.115,t.black,15),o(-1.756,.733,p,.058,.065,.063,t.nickel,12),c([et(-1.761,.737,p),et(-1.857,.876,p),et(-2.012,.835,p+.058),et(-2.197,.892,p+.14)],.034,t.gasket,18)}function lg(i){i.group("Lab furniture"),ag(i),cg(i)}function bi(i,t,e,n=.1){const r=new Zt(t),s=new Zt(e),o=i.getAttribute("position"),a=new Float32Array(o.count*3),l=new Zt;for(let c=0;c<o.count;c++){const u=o.getX(c),h=o.getY(c),f=o.getZ(c),d=kc.clamp(.42+h*.066+Math.sin(u*3.97+f*2.21-h*6.97)*n+Math.sin(f*3.01+u*4.7)*n*.45,0,1);l.lerpColors(r,s,d),l.toArray(a,c*3)}return i.setAttribute("reefTint",new We(a,3)),i}function ug(){return new Xe({side:Le,vertexShader:["attribute vec3 reefTint;","varying vec3 vTint;","varying vec3 vPositionW;","varying vec3 vNormalW;","void main() {","  vec4 wp = modelMatrix * vec4(position, 1.0);","  vPositionW = wp.xyz;","  vNormalW = mat3(modelMatrix) * normal;","  vTint = reefTint;","  gl_Position = projectionMatrix * viewMatrix * wp;","}"].join(`
`),fragmentShader:["varying vec3 vTint;","varying vec3 vPositionW;","varying vec3 vNormalW;","void main() {","  vec3 n = normalize(vNormalW);","  if (!gl_FrontFacing) n = -n;","  vec3 p = vPositionW;","  float depth = length(vec3(p.x * 0.70, p.y * 0.58, p.z + 9.0));","  float visibility = exp(-max(0.0, depth - 2.0) * 0.079);","  float slope = 0.31 + 0.66 * max(0.0, dot(n, normalize(vec3(-0.32, 0.89, 0.29))));","  float scale = 0.91 + sin(p.x * 5.3 + p.z * 4.1 + p.y * 10.8) * 0.058 + sin(p.y * 16.9 + p.x * 13.3 - p.z * 5.9) * 0.03;","  float bands = 0.73 + 0.27 * cos(p.y * 3.6 + p.x * 1.84 + sin(p.z * 2.61) * 0.42);","  float trace = pow(max(0.0, sin(p.x * 1.91 + p.z * 3.33 + sin(p.x * 2.05 - p.z * 0.84) * 0.68)), 9.0);","  vec3 fog = vec3(0.006, 0.040, 0.048) + vec3(0.004, 0.019, 0.020) * smoothstep(-4.0, 5.0, p.y);","  vec3 rock = vTint * (slope * scale * bands) + vec3(0.001, 0.005, 0.006) + vec3(0.006, 0.023, 0.023) * trace * slope * 0.40;","  gl_FragColor = vec4(mix(fog, rock, visibility), 1.0);","  #include <colorspace_fragment>","}"].join(`
`)})}function hg(i){const t=new Xe({side:Re,vertexShader:["varying vec2 vSea;","void main() {","  vSea = (modelMatrix * vec4(position, 1.0)).xy;","  gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);","}"].join(`
`),fragmentShader:["varying vec2 vSea;","void main() {","  vec2 p = vSea;","  float up = smoothstep(-14.0, 18.0, p.y);","  float center = 1.0 - smoothstep(3.0, 44.0, abs(p.x - 8.0));","  float field = 0.65 + 0.27 * center;","  vec3 water = mix(vec3(0.003,0.015,0.022),vec3(0.008,0.074,0.083), up * field);","  float line = p.x + p.y * 0.67;","  float plume = (line - 5.0) * 0.082;","  float shaft = exp(-plume * plume) * 0.42;","  shaft += smoothstep(0.88, 1.0, sin(line * 0.38 + 0.34)) * (0.10 + 0.19 * center);","  shaft *= smoothstep(-7.0, 14.0, p.y);","  float cloud = cos(p.x * 0.36 + p.y * 0.17) * cos(p.y * 0.29 - p.x * 0.15);","  water += vec3(0.004,0.026,0.025) * shaft + vec3(0.0005,0.002,0.0025) * cloud;","  gl_FragColor = vec4(water, 1.0);","  #include <colorspace_fragment>","}"].join(`
`)}),e=i.mesh(new Cn(60,40,36),t,0,5,-27);e.name="Water boundary"}function Br(i,t){return-2.48-(-t-11)*.036+.28*Math.sin(i*.23+t*.36)+.145*Math.cos(i*.59-t*.42)+.06*Math.sin(i*1.12+t*1.41)+.48*Math.exp(-((i-5)**2+(t+14.6)**2)*.24)}function fg(i,t){const e=new Zn(53,36,65,44);e.rotateX(-Math.PI/2),e.translate(0,0,-27.2);const n=e.getAttribute("position");for(let r=0;r<n.count;r++)n.setY(r,Br(n.getX(r),n.getZ(r)));e.computeVertexNormals(),bi(e,2968904,5336160,.18),i.mesh(e,t)}function Os(i,t,e,n,r,s,o,a,l,c=!1,u=0){const h=Ee(l),f=new Jo(1,c?1:3),d=f.getAttribute("position"),g=h()*Jn,_=h()*16;for(let p=0;p<d.count;p++){const M=d.getX(p),x=d.getY(p),v=d.getZ(p),w=1+Math.sin((x+M*.16+v*.082)*36+_)*.028+Math.sin(M*7.6+v*4.7+_)*.074+Math.cos(x*8.7-v*4.8+_)*.071,b=x*w*o+(v-M)*.06*o,R=M*w*s+.11*o*x,y=v*w*a;d.setXYZ(p,R*Math.cos(g)-y*Math.sin(g)+e,b+n,R*Math.sin(g)+y*Math.cos(g)+r)}f.computeVertexNormals();const m=[[2309954,4614763],[2442817,4159348],[3555136,6321511],[3491928,5470585]];bi(f,...m[u%m.length],.26),i.mesh(f,t)}function dg(i,t){const e=Ee(44233),n=[[-3.3,-12.95,1.79,1.04,1.22,.29],[-2.4,-13.35,1.28,1.38,1.18,.59],[-.99,-14.5,2.09,.84,1.52,.21],[.52,-15.54,1.11,.83,.72,.09],[2.2,-16.1,1.99,1.59,1.82,.53],[3.58,-14.93,1.76,1.48,1.95,.69],[4.29,-13.66,1.37,1.14,.94,.25],[5.1,-15.54,2.09,2.12,1.38,.8],[6.7,-16.65,2.64,1.87,1.62,.48],[-5.16,-14.74,1.72,1.75,1.27,.79],[-6.71,-17.87,2.34,1.88,1.52,.56]];for(const[r,[s,o,a,l,c,u]]of n.entries())Os(i,t,s,Br(s,o)+u,o,a,l,c,2002+r*21,!1,r%4);for(let r=0;r<101;r++){const s=(e()-.5)*37,o=-17-e()*21,a=.73+.27*Math.cos(s*.7+o*.49),l=(.37+e()**1.65*2.3)*a,c=(.3+e()**1.51*2.54)*a,u=.42+e()*1.59,h=.24+e()*c*.63;Os(i,t,s,Br(s,o)+h,o,l,c,u,3408+r*12,r>26,r%4)}for(let r=0;r<63;r++){const s=(e()-.5)*21,o=-10.9-e()*9.1,a=.1+e()**2*.47;Os(i,t,s,Br(s,o)+.052,o,a*1.45,a*(.46+e()*.82),a,698+r*17,!0,r%4)}}function Mc(i,t,e,n,r,s,o,a){const l=n.clone().sub(e),c=new Jr(s,r,l.length(),7,1);bi(c,o,a,.16);const u=e.clone().lerp(n,.5);i.mesh(c,t,u.x,u.y,u.z).quaternion.setFromUnitVectors(et(0,1,0),l.normalize())}function pg(i,t,e,n,r,s=!1){const o=Ee(r),a=s?[5656148,9138532]:[3302235,5932918],l=(o()-.5)*.59,c=o()-.5;function u(h,f,d,g,_){const m=et((o()-.5)*.41,.13,(o()-.5)*.42),p=h.clone().addScaledVector(f,d*.5),M=p.clone().addScaledVector(f.clone().add(m).normalize(),d*.51);if(Mc(i,t,h,p,g,g*.91,...a),Mc(i,t,p,M,g*.96,g*.63,...a),_<1)return;const x=s&&_%2?3:2;for(let v=0;v<x;v++){const A=(v/(x-1)-.5)*(s?1.33:1.66),w=f.clone().multiplyScalar(.54);w.add(et(A+(o()-.5)*.3,.25+o()*.21,s?l*A:(o()-.5)*.97)),u(v%3===1?p:M,w.normalize(),d*(.48+o()*.25),g*(.62+o()*.06),_-1)}}u(e,et(c*.42,1,l*.31).normalize(),n*(s?.69:.58),n*(s?.034:.051),s?4:3)}function mg(i,t,e,n,r,s,o){const a=Ee(o),l=[[0,0],[.48,0],[.53,.15],[.65,.3],[.78,.56],[.9,.78],[1,.93],[.96,1],[.8,1.016],[.73,.951],[.62,.81],[.51,.61],[.4,.42],[.3,.29],[0,.3]].map(([f,d])=>new lt(f*r,d*n)),c=new Ko(l,15),u=c.getAttribute("position");for(let f=0;f<u.count;f++){const d=u.getX(f),g=u.getY(f),_=u.getZ(f),m=Math.atan2(_,d),p=.1*g/n*Math.sin(m*3+s)+.06*Math.cos(m*11+o);u.setXYZ(f,d*(1+p),g+Math.sin(m*5+a()*.2)*.024*n*(g/n)**3,_*(1+p))}c.computeVertexNormals(),bi(c,6251088,8553569,.25),i.mesh(c,t,e.x,e.y,e.z).rotation.set(.09+a()*.17,s,(a()-.5)*.48)}function gg(i,t,e,n,r){const s=Ee(r),o=5+Math.floor(s()*4),a=new Zt(2773055),l=new Zt(5012327);for(let c=0;c<o;c++){const u=c/o*Jn+s()*.62,h=.44+s()*1.12,f=n*(.56+s()*.58),d=.067+s()*.094,g=s()*Jn,_=e.z<-16?18:24,m=e.z<-16?4:6,p=[],M=[],x=[],v=[],A=new Zt;for(let b=0;b<=_;b++){const R=b/_,y=h*R**1.18+.19*Math.sin(R*9+g)*R,E=R*f,P=u+.8*Math.sin(R*6.3+g*.35),z=et(Math.cos(P+Math.PI/2),.31*Math.sin(R*6+c),Math.sin(P+Math.PI/2)),V=e.clone().add(et(Math.cos(u)*y+.2*R**2,E,Math.sin(u)*y)),U=Math.sin(R*Math.PI)**.67*(.67+.33*Math.sin(R*5+g)**2);for(let k=0;k<=m;k++){const H=k/m*2-1,J=Math.abs(H)**1.7*Math.sin(R*24+g+H*2)*.071*U,G=V.clone().addScaledVector(z,H*U*d).add(et(0,J,J*.56));if(p.push(G.x,G.y,G.z),M.push(R,k/m),A.lerpColors(a,l,.21+.37*H**2+.24*R+.11*Math.cos(R*35.3+H*3.1)),x.push(A.r,A.g,A.b),b<_&&k<m){const X=b*(m+1)+k;v.push(X,X+1,X+m+1,X+m+1,X+1,X+m+2)}}}const w=new fe;w.setAttribute("position",new Vt(p,3)),w.setAttribute("uv",new Vt(M,2)),w.setAttribute("reefTint",new Vt(x,3)),w.setIndex(v),w.computeVertexNormals(),i.mesh(w,t)}}function _g(i,t,e){const n=Ee(226);for(const[r,[s,o,a,l]]of[[-2.22,-1.32,-12.56,1.2],[-1.75,-1.44,-13.42,.92],[-3.47,-1.24,-13.2,1.4],[-.63,-1.7,-14,.81],[2.42,-1.01,-15.54,.85],[4.27,-.84,-15.07,1.38],[6.67,-.66,-15.98,1.66],[-3.74,-.5,-18.32,1.83],[.57,-1.07,-21.03,1.69],[-5.4,-1.39,-18.01,1.26],[5.94,-1.2,-20.26,1.51]].entries())pg(i,t,et(s,o,a),l,9431+r*7,r%3!==1);for(const[r,[s,o,a,l]]of[[-2.32,-1.16,-12.17,.68],[-1.54,-1.14,-13.24,.47],[-3.41,-1.08,-13.38,.59],[3.97,-.55,-14.38,.57],[5.23,-.81,-15.31,.78],[1.84,-1.32,-15.26,.56]].entries())for(let c=0;c<4;c++){const u=r+c*2.39,h=.11+n()*.07,f=Math.cos(u)*h*(c+1)*.45,d=Math.sin(u)*h*(c+1)*.55,g=l*(.65+n()*.43);mg(i,t,et(s+f,o-c*.038,a+d),g,h*(.74+l*.4),u,51+c+r*21),c%2===0&&e.push([s+f-.058,o-c*.038+g*.8,a+d+h*.72,8563606,.64+n()*.4])}for(const[r,[s,o,a,l]]of[[3.76,-1.42,-13.54,3.35],[5.13,-1.21,-14.09,4.65],[4.64,-1.7,-13.21,2.78],[6.45,-1.08,-16.87,3.56],[6.93,-1.52,-18.97,3.3],[-5.9,-1.31,-15.88,2.64],[-6.57,-1.49,-14.11,3.11],[-8.66,-1.36,-19.2,4.31],[1.08,-1.92,-20.17,1.8]].entries())gg(i,t,et(s,o,a),l,902+r*19);for(const[r,s,o]of[[-3.28,-.8,-12.17],[.78,-1.39,-14.9],[3.84,-.31,-14.95],[1.45,-1.24,-17.23],[-3.16,-.1,-18.88]])for(let a=0;a<8;a++)e.push([r+(n()-.5)*.63,s+(n()-.5)*.35,o+n()*.39,a%4?7576454:9349252,.24+n()*.79])}function vg(i,t,e,n,r,s,o){const a=new nr(1,12,8),l=a.getAttribute("position");for(let h=0;h<l.count;h++){const f=l.getX(h),d=l.getY(h),g=l.getZ(h);l.setXYZ(h,f*s*.38,d*s*(.175+f*.017),g*s*.104)}const c=[-.3,0,0,-.61,.185,.018,-.55,.007,0,-.3,0,0,-.55,.007,0,-.62,-.164,-.018,-.234,.08,0,-.135,.259,0,.147,.1,.006,-.151,.028,.088,-.324,-.104,.169,.142,-.031,.076].map(h=>h*s),u=new fe;u.setAttribute("position",new Vt(c,3)),u.setAttribute("uv",new Vt(Array(24).fill(0),2)),u.computeVertexNormals(),bi(a,5867654,11975579,.23),bi(u,4090985,7439237,.18);for(const h of[a,u])i.mesh(h,t,e,n,r).rotation.set(o*.25,o*.48+.31,o*.16)}function Sc(i,t,e,n,r,s,o,a){const l=i.group(e),c=Ee(a);for(let u=0;u<o;u++){const h=u/o-.5;vg(i,t,h*3.6+(c()-.5)*.44,Math.sin(u*1.16)*.43+h*.44,(c()-.5)*1.7,.31+c()*.29,(c()-.5)*.88)}return l.position.set(n,r,s),l}function xg(i,t){const e=[],n=[],r=[],s=Ee(999),o=new Zt;for(let u=0;u<174;u++){const h=(s()-.5)*24,f=-1.4+s()*6.4,d=-10.7-s()*22;t.push([h,f,d,u%3===0?9286819:6989726,.08+s()*.17])}for(const[u,h,f,d,g]of t)e.push(u,h,f),o.setHex(d),r.push(o.r,o.g,o.b),n.push(g,s()*Jn);const a=new fe;a.setAttribute("position",new Vt(e,3)),a.setAttribute("pointData",new Vt(n,2)),a.setAttribute("pointHue",new Vt(r,3));const l=new Xe({uniforms:{seaTime:{value:0}},transparent:!0,depthWrite:!1,blending:zs,vertexShader:["uniform float seaTime;","attribute vec2 pointData;","attribute vec3 pointHue;","varying vec4 vPoint;","void main() {","  float drift = 1.0 - step(0.23, pointData.x);","  vec3 p = position;","  p.x += sin(seaTime * 0.33 + pointData.y) * 0.095 * drift;","  p.y += cos(seaTime * 0.37 + pointData.y) * 0.055 * drift;","  vec4 mv = modelViewMatrix * vec4(p, 1.0);","  gl_Position = projectionMatrix * mv;","  gl_PointSize = clamp((13.0 + 20.0 * pointData.x) / max(1.0, -mv.z), 1.0, 4.1);","  vPoint = vec4(pointHue, (0.18 + pointData.x * 0.66) * (0.84 + sin(seaTime * 0.51 + pointData.y) * 0.16));","}"].join(`
`),fragmentShader:["varying vec4 vPoint;","void main() {","  vec2 p = gl_PointCoord * 2.0 - 1.0;","  float d = dot(p,p);","  gl_FragColor = vec4(vPoint.rgb, (1.0 - smoothstep(0.07,1.0,d)) * vPoint.a);","  #include <colorspace_fragment>","}"].join(`
`)}),c=new uh(a,l);return c.renderOrder=4,i.scene.add(c),c}function Mg(i){const t=ug(),e=[];i.group("Reef terrain"),hg(i),fg(i,t),dg(i,t),i.group("Reef colonies"),_g(i,t,e);const n=Sc(i,t,"Shelf fish",-.83,.317,-17.98,11,5813),r=Sc(i,t,"Outer fish",3.83,.02,-23.61,7,253),s=xg(i,e);return{update(o){n.position.x=-.83+Math.sin(o*.14)*1.05,n.position.y=.317+Math.sin(o*.19)*.095,n.rotation.y=Math.sin(o*.12)*.132,r.position.x=3.83+Math.cos(o*.16+1.9)*1.65,r.rotation.y=-.19+Math.cos(o*.18)*.15,s.material.uniforms.seaTime.value=o}}}function Sg(i){const n=new Uint8Array(32768),r=[{direction:new D(.19,.94,.28).normalize(),color:[158,121,78],falloff:14},{direction:new D(-.64,.69,.29).normalize(),color:[92,68,38],falloff:20},{direction:new D(.13,.07,-.99).normalize(),color:[53,109,106],falloff:7}],s=new D;for(let a=0;a<64;a++){const l=(a+.5)/64*Math.PI,c=-Math.cos(l);for(let u=0;u<128;u++){const h=(u+.5)/128*Math.PI*2,f=4*(a*128+u);s.set(-Math.cos(h)*Math.sin(l),c,Math.sin(h)*Math.sin(l));const d=Math.max(c,0)*19,g=[28+d,40+d,40+d];for(const _ of r){const m=Math.exp((s.dot(_.direction)-1)*_.falloff);for(let p=0;p<3;p++)g[p]+=m*_.color[p]}for(let _=0;_<3;_++)n[f+_]=Math.min(255,g[_]);n[f+3]=255}}const o=new sh(n,128,64,Ge);o.mapping=zr,o.colorSpace=we,o.magFilter=o.minFilter=$e,o.needsUpdate=!0;for(const a of["lip","raw","nickel","brass","porcelain","glassEdge"])i.m[a].envMap=o,i.m[a].envMapIntensity=a==="glassEdge"?.76:.57}function yg(i){i.add(new qh(15919307,8957093,1.12),new jh(12637130,.29));function t(n,r,s,o,a,l){const c=new Kh(n,r,s,2);c.position.set(o,a,l),i.add(c)}t(16765856,16.4,6.8,.66,2.62,3.68),t(16767666,15.7,6.5,-.46,2.67,.22),t(16759149,1.14,2.4,2.2,1.01,3.59),t(16762251,1.65,1.98,-2.48,1.26,2.06),t(13954273,11.3,5,-.29,2.64,-3.1),t(16767400,7.1,4.1,-.49,2.64,-5.85),t(8380379,9.8,6,0,1.81,-8.079);const e=new Zh(13697008,8.9,2.85,1.07,.69,2);e.position.set(2.11,1.875,-2.82),e.target.position.set(1.37,.9,-2.89),i.add(e,e.target)}function Eg(i){const t=G0(i);K0(t),rg(t),lg(t),sg(t);const e=Mg(t);return yg(i),Sg(t),t.finishMeshes(),e}const Do=document.querySelector("#habitat"),yc=document.querySelector("#entry"),Io=document.querySelector("#enter"),Ec=document.querySelector("#reset"),bg=document.querySelector("#location"),bc=document.querySelector("#drag-tip"),Tc=document.querySelector("#fatal"),Bs=matchMedia("(prefers-reduced-motion: reduce)"),Tg=new Set(["KeyW","KeyA","KeyS","KeyD","ArrowUp","ArrowLeft","ArrowDown","ArrowRight","ShiftLeft","ShiftRight"]);let Bn;try{Bn=new O0({antialias:!0,alpha:!1,powerPreference:"high-performance"}),Bn.outputColorSpace=we,Bn.toneMapping=Rc,Bn.toneMappingExposure=1.04,Do.append(Bn.domElement),Bn.domElement.setAttribute("aria-label","Walkable 3D interior"),Ag(Bn)}catch(i){console.error(i),Io.disabled=!0,Tc.hidden=!1,Tc.textContent="The 3D scene could not initialize. Try a WebGL 2 capable browser with hardware acceleration enabled."}function Ag(i){const t=i.domElement,e=new rh;e.background=new Zt(529687);const n=new Pe(64,1,.035,58);n.rotation.order="YXZ";const r=Eg(e),s=new Set,o={x:Tn.x,z:Tn.z},a={x:0,z:0};let l=Tn.yaw,c=Tn.pitch,u=!1,h=!1,f=!1,d=!1,g=null,_="",m=0,p=-1/0,M=!0,x=0,v=0,A=0;function w(){const U=Math.max(Do.clientWidth,1),k=Math.max(Do.clientHeight,1),J=Math.min(devicePixelRatio||1,1.45,Math.sqrt(209e4/(U*k)));i.setPixelRatio(J),i.setSize(U,k,!1),n.aspect=U/k,n.fov=U/k<1?74:64,n.updateProjectionMatrix(),M=!0}function b(){o.x=Tn.x,o.z=Tn.z,l=Tn.yaw,c=Tn.pitch,a.x=a.z=0,v=A=0,R(),M=!0}function R(){n.position.set(o.x,1.62+A,o.z),n.rotation.set(c,l,0,"YXZ");const U=k0(o.z);U!==_&&(_=U,bg.textContent=_)}function y(U){d=!1,f=!0,u=!0,h=U,yc.hidden=!0,bc.hidden=!U,document.body.classList.add("active")}function E(){d=!1,u=!1,h=!1,g=null,s.clear(),yc.hidden=!1,bc.hidden=!0,Ec.hidden=!f,Io.firstChild.nodeValue=f?"Resume exploring ":"Enter the berth ",document.body.classList.remove("active")}function P(){if(!d){if(typeof t.requestPointerLock!="function"){y(!0);return}d=!0;try{const U=t.requestPointerLock();U!=null&&U.catch&&U.catch(()=>{d&&y(!0)})}catch{y(!0)}}}function z(U,k){l-=U*.00215,c=kc.clamp(c-k*.00215,-1.46,1.46)}Io.addEventListener("click",P),Ec.addEventListener("click",b),document.addEventListener("pointerlockchange",()=>{document.pointerLockElement===t?y(!1):u&&!h&&E()}),document.addEventListener("pointerlockerror",()=>{d&&y(!0)}),document.addEventListener("mousemove",U=>{u&&!h&&z(U.movementX,U.movementY)}),t.addEventListener("pointerdown",U=>{!u||!h||U.button!==0||(g={x:U.clientX,y:U.clientY,id:U.pointerId},t.setPointerCapture(U.pointerId))}),t.addEventListener("pointermove",U=>{!g||U.pointerId!==g.id||(z(U.clientX-g.x,U.clientY-g.y),g.x=U.clientX,g.y=U.clientY)}),t.addEventListener("lostpointercapture",()=>{g=null}),window.addEventListener("keydown",U=>{u&&(U.code==="Escape"&&h&&E(),U.code==="KeyR"&&!U.repeat&&b(),Tg.has(U.code)&&(s.add(U.code),U.preventDefault()))}),window.addEventListener("keyup",U=>s.delete(U.code)),window.addEventListener("blur",()=>s.clear()),document.addEventListener("visibilitychange",()=>{document.hidden&&(s.clear(),h&&E())}),window.addEventListener("resize",w,{passive:!0});function V(U){const k=Number(s.has("KeyD")||s.has("ArrowRight"))-Number(s.has("KeyA")||s.has("ArrowLeft")),H=Number(s.has("KeyW")||s.has("ArrowUp"))-Number(s.has("KeyS")||s.has("ArrowDown")),G=(s.has("ShiftLeft")||s.has("ShiftRight")?2.45:1.64)/(Math.hypot(k,H)||1),X=k*Math.cos(l)-H*Math.sin(l),K=-k*Math.sin(l)-H*Math.cos(l),j=1-Math.exp(-19*U);a.x+=(X*G-a.x)*j,a.z+=(K*G-a.z)*j;const ct=o.x,Et=o.z;z0(o,a.x*U,a.z*U);const xt=Math.hypot(o.x-ct,o.z-Et);v+=xt*7.8;const B=Bs.matches?0:Math.min(xt/U*.0075,.012);A+=(Math.sin(v)*B-A)*j}w(),b(),i.setAnimationLoop(U=>{const k=m?Math.min((U-m)/1e3,.05):.016666666666666666;m=U,u&&k>0&&(V(k),R()),Bs.matches||(x+=k),(u||M||!Bs.matches&&U-p>=88)&&(r.update(x),i.render(e,n),p=U,M=!1)})}
